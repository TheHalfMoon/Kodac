import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import test from "node:test"

import {
  P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
  P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
  P3_R1_EVIDENCE_LANES,
  type ContextEvidenceLane,
  type ContextSelectionCandidateInput,
  type ContextSelectionPlanRequest,
} from "../src/context-selection-plan/contracts.ts"
import { buildContextSelectionPlan } from "../src/context-selection-plan/context-selection-plan.ts"
import {
  P3_R2_DECLARED_POLICY_KIND,
  P3_R2_DECLARED_POLICY_VERSION,
  P3_R2_POLICY_APPLICATION_KIND,
  P3_R2_POLICY_APPLICATION_VERSION,
  type DeclaredContextSelectionPolicy,
} from "../src/context-selection-policy/contracts.ts"
import { applyDeclaredContextSelectionPolicy } from "../src/context-selection-policy/context-selection-policy.ts"

const REPOSITORY_ID = "a".repeat(64)
const SNAPSHOT_ID = "b".repeat(64)
const CONTENT_ID = "c".repeat(64)

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function canonicalize(value: unknown): string {
  if (value === null) return "null"
  if (typeof value === "string" || typeof value === "boolean") return JSON.stringify(value)
  if (typeof value === "number") return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map((item) => canonicalize(item)).join(",")}]`
  const record = value as Record<string, unknown>
  return `{${Object.keys(record).sort(compareStrings).map((key) => `${JSON.stringify(key)}:${canonicalize(record[key])}`).join(",")}}`
}

function sha256(value: unknown): string {
  return createHash("sha256").update(canonicalize(value), "utf8").digest("hex")
}

function candidate(index: number, overrides: Partial<ContextSelectionCandidateInput> = {}): ContextSelectionCandidateInput {
  return {
    candidateId: `candidate:${index}`,
    repositoryIdentity: REPOSITORY_ID,
    snapshotIdentity: SNAPSHOT_ID,
    contentIdentity: CONTENT_ID,
    lane: "explicit-target",
    sourceKind: "repository-evidence",
    sourceIdentity: String((index % 9) + 1).repeat(64),
    evidenceClass: "precise-static",
    subjectPath: `src/file-${index}.ts`,
    utf8Bytes: 64,
    groupingKey: `file:src/file-${index}.ts`,
    planReasons: ["fixture"],
    provenanceRefs: [`repo://fixture/file-${index}.ts`],
    ...overrides,
  }
}

function request(overrides: Partial<ContextSelectionPlanRequest> = {}): ContextSelectionPlanRequest {
  return {
    version: P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
    kind: P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
    taskIdentity: "task:p3-r2-fixture",
    repositoryIdentity: REPOSITORY_ID,
    snapshotIdentity: SNAPSHOT_ID,
    contentIdentity: CONTENT_ID,
    candidates: [candidate(1)],
    maxItems: 8,
    maxUtf8Bytes: 8_192,
    completeness: { state: "complete", reasons: [], omittedAtLeast: 0 },
    ...overrides,
  }
}

function policy(
  planRequest: ContextSelectionPlanRequest,
  overrides: Partial<DeclaredContextSelectionPolicy> = {},
): DeclaredContextSelectionPolicy {
  const plan = buildContextSelectionPlan(planRequest)
  return {
    version: P3_R2_DECLARED_POLICY_VERSION,
    kind: P3_R2_DECLARED_POLICY_KIND,
    policyId: "policy:p3-r2-fixture",
    planIdentity: plan.planIdentity,
    repositoryIdentity: plan.repositoryIdentity,
    snapshotIdentity: plan.snapshotIdentity,
    contentIdentity: plan.contentIdentity,
    taskIdentity: plan.taskIdentity,
    lanePriority: [...P3_R1_EVIDENCE_LANES],
    maxSelectedItems: plan.budget.maxItems,
    maxSelectedUtf8Bytes: plan.budget.maxUtf8Bytes,
    maxPerGroupingKey: plan.budget.maxItems,
    ...overrides,
  }
}

function assertDeepFrozen(value: unknown, seen = new WeakSet<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return
  seen.add(value)
  assert.equal(Object.isFrozen(value), true)
  for (const nested of Object.values(value as Record<string, unknown>)) assertDeepFrozen(nested, seen)
}

const RESULT_KEYS = [
  "applicationIdentity",
  "candidateSetIdentity",
  "contentIdentity",
  "kind",
  "lanePriority",
  "maxPerGroupingKey",
  "maxSelectedItems",
  "maxSelectedUtf8Bytes",
  "omittedCandidates",
  "planIdentity",
  "policyId",
  "policyIdentity",
  "relationEvidence",
  "repositoryIdentity",
  "requestIdentity",
  "selectedCandidates",
  "snapshotIdentity",
  "sourceAbstention",
  "sourceCompleteness",
  "sourcePlanState",
  "state",
  "taskIdentity",
  "usedSelectedItems",
  "usedSelectedUtf8Bytes",
  "version",
].sort(compareStrings)

test("P3-R2 derives source truth through the canonical P3-R1 builder before policy semantics", () => {
  const badRequest = { ...request(), version: "future" }
  const hostilePolicy = new Proxy({}, { get: () => { throw new Error("policy evaluated") } })
  assert.throws(() => applyDeclaredContextSelectionPolicy(badRequest, hostilePolicy), /unsupported P3-R1 context selection request contract/)
})

test("P3-R2 applies a declared policy to ready-for-policy plans", () => {
  const planRequest = request()
  const result = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest))
  assert.equal(result.version, P3_R2_POLICY_APPLICATION_VERSION)
  assert.equal(result.kind, P3_R2_POLICY_APPLICATION_KIND)
  assert.equal(result.sourcePlanState, "ready-for-policy")
  assert.equal(result.state, "selected-all-candidates")
  assert.equal(result.selectedCandidates.length, 1)
  assert.equal(result.omittedCandidates.length, 0)
})

test("P3-R2 applies policy to budget-exceeded source plans and preserves the source state", () => {
  const planRequest = request({ candidates: [candidate(1), candidate(2)], maxItems: 1, maxUtf8Bytes: 8_192 })
  const sourcePlan = buildContextSelectionPlan(planRequest)
  assert.equal(sourcePlan.state, "budget-exceeded")
  const result = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest, { maxSelectedItems: 1, maxPerGroupingKey: 1 }))
  assert.equal(result.sourcePlanState, "budget-exceeded")
  assert.equal(result.selectedCandidates.length, 1)
  assert.equal(result.omittedCandidates.length, 1)
  assert.equal(result.omittedCandidates[0].reason, "item-budget")
  assert.equal(result.state, "selected-subset")
})

test("P3-R2 preserves insufficient-evidence abstention without candidate invention", () => {
  const planRequest = request({ candidates: [] })
  const sourcePlan = buildContextSelectionPlan(planRequest)
  assert.equal(sourcePlan.state, "insufficient-evidence")
  const result = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest))
  assert.equal(result.sourcePlanState, "insufficient-evidence")
  assert.equal(result.state, "insufficient-evidence")
  assert.deepEqual(result.selectedCandidates, [])
  assert.deepEqual(result.omittedCandidates, [])
  assert.deepEqual(result.sourceAbstention, sourcePlan.abstention)
})

test("P3-R2 requires exact policy keys and contract constants", () => {
  const planRequest = request()
  const valid = policy(planRequest)
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, unknown: true }), /unknown field/)
  const missing = { ...valid } as Record<string, unknown>
  delete missing.policyId
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, missing), /missing required field/)
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, version: "future" }), /unsupported P3-R2 declared policy contract/)
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, kind: "future" }), /unsupported P3-R2 declared policy contract/)
})

test("P3-R2 enforces bounded stable policy ids", () => {
  const planRequest = request()
  const valid = policy(planRequest)
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, policyId: "bad id" }), /stable-id alphabet/)
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, policyId: "x".repeat(513) }), /512 UTF-8 bytes/)
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, policyId: "bad\0id" }), /NUL-free/)
})

test("P3-R2 binds policy to the exact rebuilt plan and repository identities", () => {
  const planRequest = request()
  const valid = policy(planRequest)
  for (const field of ["planIdentity", "repositoryIdentity", "snapshotIdentity", "contentIdentity"] as const) {
    assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, [field]: "9".repeat(64) }), /does not match rebuilt plan/)
  }
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, taskIdentity: "task:other" }), /does not match rebuilt plan/)
})

test("P3-R2 requires one exact dense permutation of all six lanes and has no default", () => {
  const planRequest = request()
  const valid = policy(planRequest)
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, lanePriority: P3_R1_EVIDENCE_LANES.slice(0, 5) }), /exactly 6 lanes/)
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, lanePriority: [...P3_R1_EVIDENCE_LANES.slice(0, 5), P3_R1_EVIDENCE_LANES[0]] }), /exact lane permutation/)
  const missing = { ...valid } as Record<string, unknown>
  delete missing.lanePriority
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, missing), /missing required field/)

  const sparse: unknown[] = []
  sparse.length = 6
  sparse[0] = P3_R1_EVIDENCE_LANES[0]
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, lanePriority: sparse }), /dense/)
})

test("P3-R2 rejects declared limits that expand the rebuilt P3-R1 budgets", () => {
  const planRequest = request({ maxItems: 2, maxUtf8Bytes: 256 })
  const valid = policy(planRequest, { maxSelectedItems: 2, maxSelectedUtf8Bytes: 256, maxPerGroupingKey: 2 })
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, maxSelectedItems: 3 }), /positive integer <= 2/)
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, maxSelectedUtf8Bytes: 257 }), /positive integer <= 256/)
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, maxPerGroupingKey: 3 }), /positive integer <= 2/)
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, maxSelectedItems: 0 }), /positive integer/)
})

test("P3-R2 uses caller lane priority then candidate identity as the only traversal order", () => {
  const inputs = P3_R1_EVIDENCE_LANES.map((lane, index) => candidate(index + 1, { lane, groupingKey: `group:${lane}` }))
  const planRequest = request({ candidates: inputs, maxItems: 8 })
  const reversed = [...P3_R1_EVIDENCE_LANES].reverse() as ContextEvidenceLane[]
  const sourcePlan = buildContextSelectionPlan(planRequest)
  const result = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest, { lanePriority: reversed }))
  assert.deepEqual(result.selectedCandidates.map((item) => item.lane), reversed)
  assert.deepEqual(new Set(result.selectedCandidates.map((item) => item.candidateIdentity)), new Set(sourcePlan.candidates.map((item) => item.candidateIdentity)))
})

test("P3-R2 orders same-lane candidates by canonical candidate identity", () => {
  const planRequest = request({ candidates: [candidate(1), candidate(2), candidate(3)] })
  const sourcePlan = buildContextSelectionPlan(planRequest)
  const result = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest))
  assert.deepEqual(result.selectedCandidates.map((item) => item.candidateIdentity), [...sourcePlan.candidates].sort((a, b) => compareStrings(a.candidateIdentity, b.candidateIdentity)).map((item) => item.candidateIdentity))
})

test("P3-R2 group cap takes precedence over item and byte budgets", () => {
  const planRequest = request({
    candidates: [candidate(1, { groupingKey: "group:shared" }), candidate(2, { groupingKey: "group:shared" })],
    maxItems: 2,
    maxUtf8Bytes: 64,
  })
  const result = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest, { maxSelectedItems: 1, maxSelectedUtf8Bytes: 64, maxPerGroupingKey: 1 }))
  assert.equal(result.selectedCandidates.length, 1)
  assert.equal(result.omittedCandidates.length, 1)
  assert.equal(result.omittedCandidates[0].reason, "group-cap")
})

test("P3-R2 item budget takes precedence over byte budget", () => {
  const planRequest = request({ candidates: [candidate(1, { utf8Bytes: 64 }), candidate(2, { utf8Bytes: 64 })], maxItems: 2, maxUtf8Bytes: 64 })
  const result = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest, { maxSelectedItems: 1, maxSelectedUtf8Bytes: 64, maxPerGroupingKey: 1 }))
  assert.equal(result.omittedCandidates[0].reason, "item-budget")
})

test("P3-R2 continues traversal after a byte-budget omission so a later smaller lane can fit", () => {
  const planRequest = request({
    candidates: [
      candidate(1, { lane: "explicit-target", utf8Bytes: 100 }),
      candidate(2, { lane: "structural-symbol", utf8Bytes: 20 }),
    ],
    maxItems: 2,
    maxUtf8Bytes: 50,
  })
  const result = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest, { maxSelectedItems: 2, maxSelectedUtf8Bytes: 50, maxPerGroupingKey: 2 }))
  assert.equal(result.omittedCandidates.length, 1)
  assert.equal(result.omittedCandidates[0].candidate.lane, "explicit-target")
  assert.equal(result.omittedCandidates[0].reason, "byte-budget")
  assert.equal(result.selectedCandidates.length, 1)
  assert.equal(result.selectedCandidates[0].lane, "structural-symbol")
  assert.equal(result.usedSelectedUtf8Bytes, 20)
})

test("P3-R2 selected plus omitted candidates exactly partition every non-abstained source candidate", () => {
  const planRequest = request({ candidates: [candidate(1), candidate(2), candidate(3)], maxItems: 3 })
  const sourcePlan = buildContextSelectionPlan(planRequest)
  const result = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest, { maxSelectedItems: 2, maxPerGroupingKey: 2 }))
  const realized = [...result.selectedCandidates.map((item) => item.candidateIdentity), ...result.omittedCandidates.map((item) => item.candidate.candidateIdentity)]
  assert.equal(realized.length, sourcePlan.candidates.length)
  assert.equal(new Set(realized).size, sourcePlan.candidates.length)
  assert.deepEqual(new Set(realized), new Set(sourcePlan.candidates.map((item) => item.candidateIdentity)))
})

test("P3-R2 emits exact closed top-level and omission schemas", () => {
  const planRequest = request({ candidates: [candidate(1), candidate(2)], maxItems: 2 })
  const result = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest, { maxSelectedItems: 1, maxPerGroupingKey: 1 }))
  assert.deepEqual(Object.keys(result).sort(compareStrings), RESULT_KEYS)
  assert.deepEqual(Object.keys(result.omittedCandidates[0]).sort(compareStrings), ["candidate", "reason"])
  assert.deepEqual(Object.keys(result.selectedCandidates[0]).sort(compareStrings), Object.keys(buildContextSelectionPlan(planRequest).candidates.find((item) => item.candidateIdentity === result.selectedCandidates[0].candidateIdentity)!).sort(compareStrings))
})

test("P3-R2 preserves source completeness, abstention, and relation evidence exactly", () => {
  const planRequest = request({ completeness: { state: "incomplete", reasons: ["caller-omitted-evidence"], omittedAtLeast: 2 } })
  const sourcePlan = buildContextSelectionPlan(planRequest)
  const result = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest))
  assert.deepEqual(result.sourceCompleteness, sourcePlan.completeness)
  assert.deepEqual(result.sourceAbstention, sourcePlan.abstention)
  assert.deepEqual(result.relationEvidence, sourcePlan.relationEvidence)
})

test("P3-R2 derives the closed four-state result machine", () => {
  const allRequest = request({ candidates: [candidate(1), candidate(2)] })
  assert.equal(applyDeclaredContextSelectionPolicy(allRequest, policy(allRequest)).state, "selected-all-candidates")

  const subsetRequest = request({ candidates: [candidate(1), candidate(2)], maxItems: 2 })
  assert.equal(applyDeclaredContextSelectionPolicy(subsetRequest, policy(subsetRequest, { maxSelectedItems: 1, maxPerGroupingKey: 1 })).state, "selected-subset")

  const emptyRequest = request({ candidates: [candidate(1, { utf8Bytes: 100 })], maxUtf8Bytes: 50 })
  assert.equal(applyDeclaredContextSelectionPolicy(emptyRequest, policy(emptyRequest, { maxSelectedUtf8Bytes: 50 })).state, "budget-constrained-empty")

  const abstainRequest = request({ candidates: [] })
  assert.equal(applyDeclaredContextSelectionPolicy(abstainRequest, policy(abstainRequest)).state, "insufficient-evidence")
})

test("P3-R2 counters equal selected facts", () => {
  const planRequest = request({ candidates: [candidate(1, { utf8Bytes: 20 }), candidate(2, { utf8Bytes: 30 })] })
  const result = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest))
  assert.equal(result.usedSelectedItems, result.selectedCandidates.length)
  assert.equal(result.usedSelectedUtf8Bytes, 50)
})

test("P3-R2 policy identity uses exactly the normalized policy projection", () => {
  const planRequest = request()
  const declared = policy(planRequest)
  const result = applyDeclaredContextSelectionPolicy(planRequest, declared)
  assert.equal(result.policyIdentity, sha256({
    version: declared.version,
    kind: declared.kind,
    policyId: declared.policyId,
    planIdentity: declared.planIdentity,
    repositoryIdentity: declared.repositoryIdentity,
    snapshotIdentity: declared.snapshotIdentity,
    contentIdentity: declared.contentIdentity,
    taskIdentity: declared.taskIdentity,
    lanePriority: declared.lanePriority,
    maxSelectedItems: declared.maxSelectedItems,
    maxSelectedUtf8Bytes: declared.maxSelectedUtf8Bytes,
    maxPerGroupingKey: declared.maxPerGroupingKey,
  }))
})

test("P3-R2 application identity covers every authorized result field except itself", () => {
  const planRequest = request({ candidates: [candidate(1), candidate(2)], maxItems: 2 })
  const result = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest, { maxSelectedItems: 1, maxPerGroupingKey: 1 }))
  const projection = Object.fromEntries(Object.entries(result).filter(([key]) => key !== "applicationIdentity"))
  assert.equal(result.applicationIdentity, sha256(projection))
})

test("P3-R2 ignores irrelevant object insertion order but preserves semantic lane array order", () => {
  const planRequest = request({ candidates: [candidate(1), candidate(2, { lane: "structural-symbol" })] })
  const originalPolicy = policy(planRequest)
  const reversedObject = Object.fromEntries(Object.entries(originalPolicy).reverse())
  const first = applyDeclaredContextSelectionPolicy(planRequest, originalPolicy)
  const second = applyDeclaredContextSelectionPolicy(planRequest, reversedObject)
  assert.equal(first.policyIdentity, second.policyIdentity)
  assert.equal(first.applicationIdentity, second.applicationIdentity)

  const changedOrder = [...P3_R1_EVIDENCE_LANES]
  ;[changedOrder[0], changedOrder[1]] = [changedOrder[1], changedOrder[0]]
  const third = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest, { lanePriority: changedOrder }))
  assert.notEqual(first.policyIdentity, third.policyIdentity)
})

test("P3-R2 rejects hostile policy structures before unsafe semantic use", () => {
  const planRequest = request()
  const valid = policy(planRequest)
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, new Proxy(valid, {})), /non-Proxy plain object/)

  const accessor = { ...valid } as Record<string, unknown>
  Object.defineProperty(accessor, "policyId", { enumerable: true, get: () => "policy:hostile" })
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, accessor), /data property/)

  const symbolPolicy = { ...valid } as Record<PropertyKey, unknown>
  symbolPolicy[Symbol("hostile")] = true
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, symbolPolicy), /symbol fields/)

  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, Object.assign(Object.create({ inherited: true }), valid)), /plain object/)

  const extended = [...valid.lanePriority] as unknown[] & { extra?: boolean }
  extended.extra = true
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, lanePriority: extended }), /unexpected array field/)

  const nonEnumerable = { ...valid }
  Object.defineProperty(nonEnumerable, "hidden", { value: true, enumerable: false })
  assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, nonEnumerable), /must be enumerable/)
})

test("P3-R2 rejects non-finite, unsafe, and impossible numeric policy values", () => {
  const planRequest = request()
  const valid = policy(planRequest)
  for (const value of [NaN, Infinity, -Infinity, Number.MAX_SAFE_INTEGER + 1, -1, 1.5]) {
    assert.throws(() => applyDeclaredContextSelectionPolicy(planRequest, { ...valid, maxSelectedItems: value }), /positive integer/)
  }
})

test("P3-R2 returns deeply frozen immutable structures", () => {
  const planRequest = request({ candidates: [candidate(1), candidate(2)], maxItems: 2 })
  const result = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest, { maxSelectedItems: 1, maxPerGroupingKey: 1 }))
  assertDeepFrozen(result)
})

test("P3-R2 materializes no score, weight, threshold, winner, benchmark, or quality verdict", () => {
  const planRequest = request()
  const result = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest))
  const serialized = JSON.stringify(result).toLowerCase()
  for (const prohibited of ["qualityscore", "rankingscore", "weight", "threshold", "winner", "superior", "benchmarkresult"]) {
    assert.equal(serialized.includes(prohibited), false)
  }
})
