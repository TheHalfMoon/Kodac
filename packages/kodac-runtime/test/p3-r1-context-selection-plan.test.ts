import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import test from "node:test"

import {
  P3_R1_CONTEXT_SELECTION_PLAN_VERSION,
  P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
  P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
  P3_R1_EVIDENCE_LANES,
  type ContextSelectionCandidateInput,
  type ContextSelectionPlanRequest,
} from "../src/context-selection-plan/contracts.ts"
import { buildContextSelectionPlan } from "../src/context-selection-plan/context-selection-plan.ts"
import {
  K3_R6_IMPACT_RELATION_KINDS,
  K3_R6_RELATION_QUERY_VERSION,
  K3_R6_RELATION_RESULT_VERSION,
  type RelationEntity,
  type RelationGraphQueryResult,
  type RelationQueryHit,
} from "../src/relation-graph/contracts.ts"

const REPOSITORY_ID = "a".repeat(64)
const SNAPSHOT_ID = "b".repeat(64)
const CONTENT_ID = "c".repeat(64)
const GRAPH_ID = "d".repeat(64)
const NODE_ID = "e".repeat(64)
const EDGE_ID = "f".repeat(64)
const SECOND_EDGE_ID = "0".repeat(64)
const ORDERING_EDGE_ID = `${"0".repeat(63)}1`
const SOURCE_ID = "1".repeat(64)

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function canonicalize(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map((item) => canonicalize(item)).join(",")}]`
  const record = value as Record<string, unknown>
  return `{${Object.keys(record).sort(compareStrings).map((key) => `${JSON.stringify(key)}:${canonicalize(record[key])}`).join(",")}}`
}

function sha256(value: unknown): string {
  return createHash("sha256").update(canonicalize(value), "utf8").digest("hex")
}

function candidate(overrides: Partial<ContextSelectionCandidateInput> = {}): ContextSelectionCandidateInput {
  return {
    candidateId: "candidate:src/math.ts",
    repositoryIdentity: REPOSITORY_ID,
    snapshotIdentity: SNAPSHOT_ID,
    contentIdentity: CONTENT_ID,
    lane: "explicit-target",
    sourceKind: "repository-evidence",
    sourceIdentity: SOURCE_ID,
    evidenceClass: "precise-static",
    subjectPath: "src/math.ts",
    utf8Bytes: 128,
    groupingKey: "file:src/math.ts",
    planReasons: ["explicit-target"],
    provenanceRefs: ["repo://fixture/src/math.ts"],
    ...overrides,
  }
}

function request(overrides: Partial<ContextSelectionPlanRequest> = {}): ContextSelectionPlanRequest {
  return {
    version: P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
    kind: P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
    taskIdentity: "task:p3-r1-fixture",
    repositoryIdentity: REPOSITORY_ID,
    snapshotIdentity: SNAPSHOT_ID,
    contentIdentity: CONTENT_ID,
    candidates: [candidate()],
    maxItems: 8,
    maxUtf8Bytes: 8_192,
    completeness: { state: "complete", reasons: [], omittedAtLeast: 0 },
    ...overrides,
  }
}

function relationResult(options: { incomplete?: boolean, depthTwo?: boolean } = {}): RelationGraphQueryResult {
  const relations = [...K3_R6_IMPACT_RELATION_KINDS]
  const maxDepth = 2
  const maxResults = 8
  const queryIdentity = sha256({
    version: K3_R6_RELATION_QUERY_VERSION,
    kind: "impact",
    graphIdentity: GRAPH_ID,
    repositoryIdentity: REPOSITORY_ID,
    snapshotIdentity: SNAPSHOT_ID,
    contentIdentity: CONTENT_ID,
    seedNodeIdentity: NODE_ID,
    relations,
    maxDepth,
    maxResults,
  })
  const edgeIdentities = options.depthTwo ? [EDGE_ID, SECOND_EDGE_ID] : [EDGE_ID]
  const depth = edgeIdentities.length
  const hit = {
    nodeIdentity: "2".repeat(64),
    entity: { kind: "file" as const, path: "src/consumer.ts", symbol: null, qualifiedName: null, sourceSpan: null },
    depth,
    chainIdentity: sha256({ version: K3_R6_RELATION_RESULT_VERSION, graphIdentity: GRAPH_ID, edgeIdentities }),
    edgeIdentities,
  }
  const completeness = options.incomplete
    ? { state: "incomplete" as const, reasons: ["result-budget" as const], omittedAtLeast: 1, excludedAmbiguousEdgeIdentities: [] }
    : { state: "complete" as const, reasons: [], omittedAtLeast: 0, excludedAmbiguousEdgeIdentities: [] }
  const base = {
    version: K3_R6_RELATION_RESULT_VERSION,
    queryIdentity,
    kind: "impact" as const,
    graphIdentity: GRAPH_ID,
    repositoryIdentity: REPOSITORY_ID,
    snapshotIdentity: SNAPSHOT_ID,
    contentIdentity: CONTENT_ID,
    seedNodeIdentity: NODE_ID,
    relations,
    maxDepth,
    maxResults,
    completeness,
    hits: [hit],
  }
  return { ...base, resultIdentity: sha256(base) }
}

function depthOneHit(nodeIdentity: string, entity: RelationEntity, edgeIdentity: string): RelationQueryHit {
  const edgeIdentities = [edgeIdentity]
  return {
    nodeIdentity,
    entity,
    depth: 1,
    chainIdentity: sha256({ version: K3_R6_RELATION_RESULT_VERSION, graphIdentity: GRAPH_ID, edgeIdentities }),
    edgeIdentities,
  }
}

function symbolOrderingRelationResult(mode: "qualified-name" | "source-span"): RelationGraphQueryResult {
  const { resultIdentity: _ignored, ...seed } = relationResult()
  const firstEntity: RelationEntity = mode === "qualified-name"
    ? { kind: "symbol", path: "src/shared.ts", symbol: "zeta", qualifiedName: "a.scope", sourceSpan: null }
    : {
      kind: "symbol", path: "src/shared.ts", symbol: "same", qualifiedName: "same.scope",
      sourceSpan: { path: "src/shared.ts", startLine: 1, startColumn: 1, endLine: 1, endColumn: 3 },
    }
  const secondEntity: RelationEntity = mode === "qualified-name"
    ? { kind: "symbol", path: "src/shared.ts", symbol: "alpha", qualifiedName: "z.scope", sourceSpan: null }
    : {
      kind: "symbol", path: "src/shared.ts", symbol: "same", qualifiedName: "same.scope",
      sourceSpan: { path: "src/shared.ts", startLine: 2, startColumn: 1, endLine: 2, endColumn: 3 },
    }
  const firstEdge = mode === "source-span" ? ORDERING_EDGE_ID : EDGE_ID
  const secondEdge = mode === "source-span" ? SECOND_EDGE_ID : ORDERING_EDGE_ID
  const hits = [
    depthOneHit("6".repeat(64), firstEntity, firstEdge),
    depthOneHit("7".repeat(64), secondEntity, secondEdge),
  ].sort((left, right) => (
    left.depth - right.depth
    || compareStrings(left.entity.path, right.entity.path)
    || compareStrings(canonicalize(left.entity), canonicalize(right.entity))
    || compareStrings(left.chainIdentity, right.chainIdentity)
  ))
  const base = { ...seed, hits }
  return { ...base, resultIdentity: sha256(base) }
}

function assertDeepFrozen(value: unknown, seen = new WeakSet<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return
  seen.add(value)
  assert.equal(Object.isFrozen(value), true)
  for (const nested of Object.values(value as Record<string, unknown>)) assertDeepFrozen(nested, seen)
}

test("P3-R1 derives deterministic semantic identities and ignores object insertion order", () => {
  const first = buildContextSelectionPlan(request())
  const original = request()
  const reversedCandidate = Object.fromEntries(Object.entries(original.candidates[0]).reverse())
  const reversedRequest = Object.fromEntries(Object.entries({ ...original, candidates: [reversedCandidate] }).reverse())
  const second = buildContextSelectionPlan(reversedRequest)
  assert.equal(first.requestIdentity, second.requestIdentity)
  assert.equal(first.candidateSetIdentity, second.candidateSetIdentity)
  assert.equal(first.planIdentity, second.planIdentity)
})

test("P3-R1 treats caller candidate array ordering as non-semantic", () => {
  const second = candidate({ candidateId: "candidate:tests/math.test.ts", subjectPath: "tests/math.test.ts", sourceIdentity: "3".repeat(64), lane: "structural-symbol" })
  const firstPlan = buildContextSelectionPlan(request({ candidates: [candidate(), second] }))
  const secondPlan = buildContextSelectionPlan(request({ candidates: [second, candidate()] }))
  assert.equal(firstPlan.candidateSetIdentity, secondPlan.candidateSetIdentity)
  assert.equal(firstPlan.requestIdentity, secondPlan.requestIdentity)
  assert.equal(firstPlan.planIdentity, secondPlan.planIdentity)
})

test("P3-R1 fails closed on repository, snapshot, and content identity mismatches", () => {
  for (const field of ["repositoryIdentity", "snapshotIdentity", "contentIdentity"] as const) {
    assert.throws(() => buildContextSelectionPlan(request({ candidates: [candidate({ [field]: "9".repeat(64) })] })), /binding does not match/)
  }
})

test("P3-R1 rejects malformed structural inputs before unsafe evaluation", () => {
  assert.throws(() => buildContextSelectionPlan({ ...request(), unknown: true }), /unknown field/)
  assert.throws(() => buildContextSelectionPlan({ ...request(), version: "future" }), /unsupported/)
  const missing = { ...request() } as Record<string, unknown>
  delete missing.taskIdentity
  assert.throws(() => buildContextSelectionPlan(missing), /missing required field/)

  const sparse: unknown[] = []
  sparse.length = 2
  sparse[0] = candidate()
  assert.throws(() => buildContextSelectionPlan({ ...request(), candidates: sparse }), /dense/)

  const symbolInput = request() as unknown as Record<PropertyKey, unknown>
  symbolInput[Symbol("hostile")] = true
  assert.throws(() => buildContextSelectionPlan(symbolInput), /symbol fields/)

  const accessor = { ...request() } as Record<string, unknown>
  Object.defineProperty(accessor, "taskIdentity", { enumerable: true, get: () => "task:hostile" })
  assert.throws(() => buildContextSelectionPlan(accessor), /data property/)

  assert.throws(() => buildContextSelectionPlan(new Proxy(request(), {})), /non-Proxy plain object/)
  assert.throws(() => buildContextSelectionPlan(Object.assign(Object.create({ inherited: true }), request())), /plain object/)

  const cyclicReason: unknown[] = []
  cyclicReason.push(cyclicReason)
  assert.throws(() => buildContextSelectionPlan(request({ candidates: [candidate({ planReasons: cyclicReason as string[] })] })), /non-empty NUL-free string/)
})

test("P3-R1 deduplicates identical candidate ids and rejects conflicting duplicates", () => {
  const duplicate = candidate()
  const plan = buildContextSelectionPlan(request({ candidates: [candidate(), duplicate] }))
  assert.equal(plan.candidates.length, 1)
  assert.throws(() => buildContextSelectionPlan(request({ candidates: [candidate(), candidate({ subjectPath: "src/other.ts" })] })), /conflicting duplicate candidateId/)
})

test("P3-R1 preserves all authorized evidence lanes without trust upgrading", () => {
  for (const [index, lane] of P3_R1_EVIDENCE_LANES.entries()) {
    const evidenceClass = index % 2 === 0 ? "heuristic-inference" as const : "precise-static" as const
    const plan = buildContextSelectionPlan(request({ candidates: [candidate({ candidateId: `candidate:lane-${index}`, lane, evidenceClass })] }))
    assert.equal(plan.candidates[0].lane, lane)
    assert.equal(plan.candidates[0].evidenceClass, evidenceClass)
  }
  assert.throws(() => buildContextSelectionPlan(request({ candidates: [candidate({ lane: "unknown" as never })] })), /unsupported/)
})

test("P3-R1 preserves deterministic grouping, reasons, provenance, and UTF-8 budget facts", () => {
  const plan = buildContextSelectionPlan(request({
    candidates: [candidate({ groupingKey: "group:math", planReasons: ["z-reason", "a-reason"], provenanceRefs: ["z://ref", "a://ref"], utf8Bytes: 512 })],
    maxItems: 1,
    maxUtf8Bytes: 512,
  }))
  assert.deepEqual(plan.candidates[0].planReasons, ["a-reason", "z-reason"])
  assert.deepEqual(plan.candidates[0].provenanceRefs, ["a://ref", "z://ref"])
  assert.equal(plan.candidates[0].groupingKey, "group:math")
  assert.deepEqual(plan.budget, { maxItems: 1, maxUtf8Bytes: 512, candidateCount: 1, candidateUtf8Bytes: 512, withinBudget: true })
})

test("P3-R1 reports budget excess without selecting, ranking, or dropping candidates", () => {
  const second = candidate({ candidateId: "candidate:second", sourceIdentity: "4".repeat(64), subjectPath: "src/second.ts", utf8Bytes: 200 })
  const plan = buildContextSelectionPlan(request({ candidates: [candidate({ utf8Bytes: 200 }), second], maxItems: 1, maxUtf8Bytes: 256 }))
  assert.equal(plan.state, "budget-exceeded")
  assert.equal(plan.budget.withinBudget, false)
  assert.equal(plan.candidates.length, 2)
  assert.equal(plan.completeness.state, "complete")
})

test("P3-R1 uses explicit insufficient-evidence abstention for zero admissible candidates", () => {
  const plan = buildContextSelectionPlan(request({ candidates: [] }))
  assert.equal(plan.state, "insufficient-evidence")
  assert.deepEqual(plan.abstention, { state: "insufficient-evidence", reason: "insufficient-evidence" })
  assert.equal(plan.candidates.length, 0)
})

test("P3-R1 validates supplied K3-R6 relation result bindings and identities without graph execution", () => {
  const relation = relationResult()
  const plan = buildContextSelectionPlan(request({
    relationResults: [relation],
    candidates: [candidate({
      candidateId: "candidate:relation-hit",
      lane: "relation-impact",
      sourceKind: "relation-query-hit",
      sourceIdentity: "5".repeat(64),
      subjectPath: "src/consumer.ts",
      relationResultIdentity: relation.resultIdentity,
    })],
  }))
  assert.equal(plan.relationEvidence.length, 1)
  assert.equal(plan.relationEvidence[0].resultIdentity, relation.resultIdentity)
  assert.equal(plan.candidates[0].relationResultIdentity, relation.resultIdentity)

  assert.throws(() => buildContextSelectionPlan(request({ relationResults: [{ ...relation, snapshotIdentity: "9".repeat(64) }], candidates: [] })), /binding does not match/)
  assert.throws(() => buildContextSelectionPlan(request({ relationResults: [{ ...relation, resultIdentity: "9".repeat(64) }], candidates: [] })), /resultIdentity mismatch/)
})

test("P3-R1 preserves semantic order for multi-edge K3-R6 evidence chains", () => {
  const relation = relationResult({ depthTwo: true })
  const plan = buildContextSelectionPlan(request({ relationResults: [relation], candidates: [] }))
  assert.equal(plan.relationEvidence[0].resultIdentity, relation.resultIdentity)

  const reversedEdges = [...relation.hits[0].edgeIdentities].reverse()
  const malformed = {
    ...relation,
    hits: [{ ...relation.hits[0], edgeIdentities: reversedEdges }],
  }
  assert.throws(() => buildContextSelectionPlan(request({ relationResults: [malformed], candidates: [] })), /chainIdentity mismatch/)
})

test("P3-R1 matches canonical K3-R6 same-path symbol ordering by qualified name", () => {
  const relation = symbolOrderingRelationResult("qualified-name")
  const plan = buildContextSelectionPlan(request({ relationResults: [relation], candidates: [] }))
  assert.equal(plan.relationEvidence[0].resultIdentity, relation.resultIdentity)
})

test("P3-R1 matches canonical K3-R6 same-path symbol ordering by source span", () => {
  const relation = symbolOrderingRelationResult("source-span")
  const plan = buildContextSelectionPlan(request({ relationResults: [relation], candidates: [] }))
  assert.equal(plan.relationEvidence[0].resultIdentity, relation.resultIdentity)
})

test("P3-R1 keeps incomplete relation evidence explicitly incomplete", () => {
  const relation = relationResult({ incomplete: true })
  const plan = buildContextSelectionPlan(request({ relationResults: [relation] }))
  assert.equal(plan.completeness.state, "incomplete")
  assert.deepEqual(plan.completeness.reasons, ["relation-evidence-incomplete"])
  assert.equal(plan.completeness.omittedAtLeast, 1)
  assert.equal(plan.relationEvidence[0].completeness.state, "incomplete")
})

test("P3-R1 enforces candidate relation bindings", () => {
  const relation = relationResult()
  assert.throws(() => buildContextSelectionPlan(request({ candidates: [candidate({ sourceKind: "relation-query-hit", lane: "relation-impact" })] })), /must reference a supplied validated relation result/)
  assert.throws(() => buildContextSelectionPlan(request({ relationResults: [relation], candidates: [candidate({ relationResultIdentity: relation.resultIdentity })] })), /only relation-query-hit candidates/)
})

test("P3-R1 returns deeply frozen canonical structures", () => {
  const plan = buildContextSelectionPlan(request({ relationResults: [relationResult()] }))
  assertDeepFrozen(plan)
})

test("P3-R1 foundation materializes no ranking weights, universal score, winner, or superiority verdict", () => {
  const serialized = JSON.stringify(buildContextSelectionPlan(request())).toLowerCase()
  for (const forbidden of ["rankingweight", "rankingscore", "universalscore", "winner", "superior", "bestcandidate"]) {
    assert.equal(serialized.includes(forbidden), false)
  }
  assert.equal(P3_R1_CONTEXT_SELECTION_PLAN_VERSION, "p3-r1-context-selection-plan-v1")
})
