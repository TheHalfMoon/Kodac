import assert from "node:assert/strict"
import test from "node:test"

import {
  deriveResultIdentity,
  sha256Canonical,
  type P2R1ManifestRecord,
} from "../bench/p2-r1/contract.ts"
import {
  P3_R6_DIMENSIONS,
  P3_R6_MEASUREMENT_DECLARATION_KIND,
  P3_R6_MEASUREMENT_DECLARATION_VERSION,
  P3_R6_MEASUREMENT_EVIDENCE_KIND,
  P3_R6_MEASUREMENT_EVIDENCE_VERSION,
  type ContextPolicyMeasurementDeclaration,
} from "../bench/p3-r6/contracts.ts"
import { buildContextPolicyMeasurementObservations } from "../bench/p3-r6/context-measurement-observation.ts"
import {
  P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
  P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
  P3_R1_EVIDENCE_LANES,
  type ContextSelectionCandidateInput,
  type ContextSelectionPlanRequest,
} from "../src/context-selection-plan/contracts.ts"
import { buildContextSelectionPlan } from "../src/context-selection-plan/context-selection-plan.ts"
import {
  P3_R2_DECLARED_POLICY_KIND,
  P3_R2_DECLARED_POLICY_VERSION,
  type DeclaredContextSelectionPolicy,
} from "../src/context-selection-policy/contracts.ts"
import { applyDeclaredContextSelectionPolicy } from "../src/context-selection-policy/context-selection-policy.ts"

const REPOSITORY_ID = "a".repeat(64)
const SNAPSHOT_ID = "b".repeat(64)
const CONTENT_ID = "c".repeat(64)
const METRICS = P3_R6_DIMENSIONS.map((dimension) => ({
  task_family: "context-selection",
  metric_id: `metric:${dimension}`,
  unit: dimension === "no-gold-abstention" ? "boolean" : "ratio",
}))

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
    utf8Bytes: 100,
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
    taskIdentity: "task:p3-r6-fixture",
    repositoryIdentity: REPOSITORY_ID,
    snapshotIdentity: SNAPSHOT_ID,
    contentIdentity: CONTENT_ID,
    candidates: [candidate(1), candidate(2), candidate(3)],
    maxItems: 8,
    maxUtf8Bytes: 8_192,
    completeness: { state: "complete", reasons: [], omittedAtLeast: 0 },
    ...overrides,
  }
}

function policy(planRequest: ContextSelectionPlanRequest, overrides: Partial<DeclaredContextSelectionPolicy> = {}): DeclaredContextSelectionPolicy {
  const plan = buildContextSelectionPlan(planRequest)
  return {
    version: P3_R2_DECLARED_POLICY_VERSION,
    kind: P3_R2_DECLARED_POLICY_KIND,
    policyId: "policy:p3-r6-fixture",
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

const development = {
  schema_version: "p2-r1-fixture/v1",
  corpus_id: "p3-r6-development",
  corpus_role: "development",
  chronology_scheme: "fixture-sequence",
  chronology_anchor: { scheme: "fixture-sequence", ordinal: 1 },
  source_provenance: {
    kind: "repository-authored-synthetic",
    path: "packages/kodac-runtime/test/fixtures/p2-r1/p3-r6-development.json",
  },
  contamination_status: "none-known",
  cases: [{ case_id: "p3-r6-case", task_family: "context-selection", payload: { purpose: "measurement" } }],
} as const

const holdout = {
  schema_version: "p2-r1-fixture/v1",
  corpus_id: "p3-r6-holdout",
  corpus_role: "holdout",
  chronology_scheme: "fixture-sequence",
  chronology_anchor: { scheme: "fixture-sequence", ordinal: 2 },
  source_provenance: {
    kind: "repository-authored-synthetic",
    path: "packages/kodac-runtime/test/fixtures/p2-r1/p3-r6-holdout.json",
  },
  contamination_status: "none-known",
  cases: [{ case_id: "p3-r6-holdout-case", task_family: "context-selection", payload: { purpose: "holdout" } }],
} as const

function manifestRecord(): P2R1ManifestRecord {
  const withoutIdentity = {
    schema_version: "p2-r1-manifest/v1",
    benchmark_id: "kodac-p3-r6-fixture",
    benchmark_protocol_version: "v1",
    corpus_id: development.corpus_id,
    corpus_digest: sha256Canonical(development),
    corpus_role: "development" as const,
    development_freeze_anchor: development.chronology_anchor,
    holdout_id: holdout.corpus_id,
    holdout_digest: sha256Canonical(holdout),
    holdout_chronology_anchor: holdout.chronology_anchor,
    chronology_scheme: "fixture-sequence",
    chronology_status: "later-in-time" as const,
    task_family: "context-selection",
    case_id: "p3-r6-case",
    case_digest: sha256Canonical(development.cases[0]),
    strategy_id: "not-applicable",
    strategy_version: "not-applicable",
    evaluator_id: "not-applicable",
    evaluator_version: "not-applicable",
    model_id: "not-applicable",
    model_version: "not-applicable",
    provider_id: "not-applicable",
    provider_version: "not-applicable",
    execution_environment_id: "not-applicable",
    source_provenance: development.source_provenance,
    contamination_status: "none-known" as const,
    metric_definitions: METRICS,
  }
  return { ...withoutIdentity, result_identity: deriveResultIdentity(withoutIdentity) }
}

function declaration(planRequest: ContextSelectionPlanRequest, overrides: Partial<ContextPolicyMeasurementDeclaration> = {}): ContextPolicyMeasurementDeclaration {
  const application = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest))
  const identities = application.selectedCandidates.map((entry) => entry.candidateIdentity).sort()
  const manifest = manifestRecord()
  return {
    version: P3_R6_MEASUREMENT_DECLARATION_VERSION,
    kind: P3_R6_MEASUREMENT_DECLARATION_KIND,
    measurementId: "measurement:p3-r6-fixture",
    caseId: manifest.case_id,
    r1ResultIdentity: manifest.result_identity,
    taskFamily: "context-selection",
    dimensionMetricBindings: P3_R6_DIMENSIONS.map((dimension) => {
      const metric = METRICS.find((entry) => entry.metric_id === `metric:${dimension}`)!
      return { dimension, metricId: metric.metric_id, unit: metric.unit }
    }),
    goldCandidateIdentities: identities.slice(0, 2),
    utilizedCandidateIdentities: identities.slice(0, 1),
    ...overrides,
  }
}

function run(
  planRequest: ContextSelectionPlanRequest = request(),
  declarationValue: unknown = declaration(planRequest),
  manifestValue: unknown = [manifestRecord()],
) {
  return buildContextPolicyMeasurementObservations(
    planRequest,
    policy(planRequest),
    manifestValue,
    development,
    holdout,
    declarationValue,
  )
}

function assertDeepFrozen(value: unknown, seen = new WeakSet<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return
  seen.add(value)
  assert.equal(Object.isFrozen(value), true)
  for (const nested of Object.values(value as Record<string, unknown>)) assertDeepFrozen(nested, seen)
}

test("P3-R6 emits exactly seven deterministic P2-R2-compatible observations in canonical dimension order", () => {
  const planRequest = request()
  const result = run(planRequest)
  assert.equal(result.version, P3_R6_MEASUREMENT_EVIDENCE_VERSION)
  assert.equal(result.kind, P3_R6_MEASUREMENT_EVIDENCE_KIND)
  assert.equal(result.observations.length, 7)
  assert.deepEqual(result.observations.map((entry) => entry.metric_id), P3_R6_DIMENSIONS.map((dimension) => `metric:${dimension}`))
  assert.ok(result.observations.every((entry) => entry.schema_version === "p2-r2-observation/v1"))
  assert.ok(result.observations.every((entry) => entry.measurement_status !== "missing"))
  assert.match(result.measurementEvidenceIdentity, /^sha256:[0-9a-f]{64}$/)
  assert.match(result.r1ManifestSetDigest, /^sha256:[0-9a-f]{64}$/)
  assert.match(result.observationSetDigest, /^sha256:[0-9a-f]{64}$/)
})

test("P3-R6 computes the authorized seven measurement semantics without aggregate policy claims", () => {
  const planRequest = request({
    candidates: [
      candidate(1, { subjectPath: "src/shared.ts", utf8Bytes: 100 }),
      candidate(2, { subjectPath: "src/shared.ts", utf8Bytes: 300 }),
      candidate(3, { subjectPath: "src/other.ts", utf8Bytes: 600 }),
    ],
  })
  const result = run(planRequest)
  const byId = new Map(result.observations.map((entry) => [entry.metric_id, entry]))
  assert.equal(byId.get("metric:recall-at-k")?.value, 1)
  assert.equal(byId.get("metric:precision-at-k")?.value, 2 / 3)
  assert.equal(byId.get("metric:file-f1")?.value, 2 / 3)
  assert.equal(byId.get("metric:token-budgeted-evidence-yield")?.value, 0.4)
  assert.equal(byId.get("metric:no-gold-abstention")?.measurement_status, "unavailable")
  assert.equal(byId.get("metric:explored-vs-utilized-context")?.value, 1 / 3)
  assert.equal(byId.get("metric:context-dilution")?.value, 0.6)
})

test("P3-R6 empty-gold semantics remain explicit and do not imply a repository policy", () => {
  const planRequest = request()
  const result = run(planRequest, declaration(planRequest, { goldCandidateIdentities: [] }))
  const byId = new Map(result.observations.map((entry) => [entry.metric_id, entry]))
  for (const id of ["recall-at-k", "precision-at-k", "file-f1", "token-budgeted-evidence-yield"] as const) {
    assert.equal(byId.get(`metric:${id}`)?.measurement_status, "unavailable")
    assert.equal(byId.get(`metric:${id}`)?.value, null)
  }
  assert.equal(byId.get("metric:no-gold-abstention")?.measurement_status, "observed")
  assert.equal(byId.get("metric:no-gold-abstention")?.value, false)
  assert.equal(byId.get("metric:context-dilution")?.value, 1)
})

test("P3-R6 rejects unknown, duplicate, unsorted, or impossible candidate facts", () => {
  const planRequest = request()
  const valid = declaration(planRequest)
  const unknown = "f".repeat(64)
  assert.throws(() => run(planRequest, { ...valid, goldCandidateIdentities: [unknown] }), /unknown gold candidate/)
  assert.throws(() => run(planRequest, { ...valid, goldCandidateIdentities: [valid.goldCandidateIdentities[0], valid.goldCandidateIdentities[0]] }), /strictly sorted/)
  assert.throws(() => run(planRequest, { ...valid, goldCandidateIdentities: [...valid.goldCandidateIdentities].reverse() }), /strictly sorted/)

  const constrainedPolicy = policy(planRequest, { maxSelectedItems: 1, maxPerGroupingKey: 1 })
  const application = applyDeclaredContextSelectionPolicy(planRequest, constrainedPolicy)
  const omitted = application.omittedCandidates[0]?.candidate.candidateIdentity
  assert.ok(omitted)
  assert.throws(
    () => buildContextPolicyMeasurementObservations(planRequest, constrainedPolicy, [manifestRecord()], development, holdout, { ...valid, utilizedCandidateIdentities: [omitted] }),
    /utilized candidate is not selected/,
  )
})

test("P3-R6 fails closed on declaration schema drift and non-canonical key sets", () => {
  const planRequest = request()
  const valid = declaration(planRequest)
  assert.throws(() => run(planRequest, { ...valid, version: "future" }), /unsupported measurement declaration contract/)
  assert.throws(() => run(planRequest, { ...valid, kind: "future" }), /unsupported measurement declaration contract/)
  assert.throws(() => run(planRequest, { ...valid, taskFamily: "other" }), /taskFamily must be context-selection/)
  assert.throws(() => run(planRequest, { ...valid, extra: true }), /keys are not canonical/)
  const missing = { ...valid } as Record<string, unknown>
  delete missing.measurementId
  assert.throws(() => run(planRequest, missing), /keys are not canonical/)
})

test("P3-R6 requires one exact manifest-bound metric for every canonical dimension", () => {
  const planRequest = request()
  const valid = declaration(planRequest)
  assert.throws(() => run(planRequest, { ...valid, dimensionMetricBindings: valid.dimensionMetricBindings.slice(0, 6) }), /exactly 7 entries/)
  const duplicate = [...valid.dimensionMetricBindings]
  duplicate[1] = duplicate[0]
  assert.throws(() => run(planRequest, { ...valid, dimensionMetricBindings: duplicate }), /duplicate dimension binding/)
  const badUnit = valid.dimensionMetricBindings.map((entry, index) => index === 0 ? { ...entry, unit: "wrong" } : entry)
  assert.throws(() => run(planRequest, { ...valid, dimensionMetricBindings: badUnit }), /unit does not match/)
  const badMetric = valid.dimensionMetricBindings.map((entry, index) => index === 0 ? { ...entry, metricId: "metric:unknown" } : entry)
  assert.throws(() => run(planRequest, { ...valid, dimensionMetricBindings: badMetric }), /not declared/)
})

test("P3-R6 binds the exact manifest case and result identity", () => {
  const planRequest = request()
  const valid = declaration(planRequest)
  assert.throws(() => run(planRequest, { ...valid, caseId: "other-case" }), /not one exact context-selection manifest case/)
  assert.throws(() => run(planRequest, { ...valid, r1ResultIdentity: `sha256:${"0".repeat(64)}` }), /does not match the exact manifest case/)
})

test("P3-R6 evidence identity binds the complete normalized declaration even when observations are equal", () => {
  const planRequest = request()
  const first = run(planRequest, declaration(planRequest, { measurementId: "measurement:first" }))
  const second = run(planRequest, declaration(planRequest, { measurementId: "measurement:second" }))
  assert.deepEqual(first.observations, second.observations)
  assert.equal(first.observationSetDigest, second.observationSetDigest)
  assert.notEqual(first.measurementEvidenceIdentity, second.measurementEvidenceIdentity)
})

test("P3-R6 snapshots caller inputs, returns detached deeply frozen evidence, and is deterministic", () => {
  const planRequest = request()
  const declarationValue = declaration(planRequest)
  const first = run(planRequest, declarationValue)
  const second = run(planRequest, declarationValue)
  assert.equal(first.measurementEvidenceIdentity, second.measurementEvidenceIdentity)
  assert.deepEqual(first, second)
  assertDeepFrozen(first)

  const mutable = structuredClone(declarationValue)
  const result = run(planRequest, mutable)
  mutable.measurementId = "measurement:mutated"
  mutable.goldCandidateIdentities.length = 0
  assert.equal(result.measurementId, "measurement:p3-r6-fixture")
  assert.notEqual(result.measurementDeclaration.goldCandidateIdentities.length, 0)
})

test("P3-R6 rejects hostile public structures before semantic reuse", () => {
  const planRequest = request()
  const valid = declaration(planRequest)
  let getterInvoked = false
  const accessor = { ...valid } as Record<string, unknown>
  Object.defineProperty(accessor, "measurementId", {
    enumerable: true,
    configurable: true,
    get() {
      getterInvoked = true
      return "measurement:hostile"
    },
  })
  const proxy = new Proxy(valid as unknown as Record<string, unknown>, {
    get() {
      throw new Error("proxy getter must not execute")
    },
  })
  assert.throws(() => run(planRequest, accessor), /not canonical JSON/)
  assert.throws(() => run(planRequest, proxy), /not canonical JSON/)
  assert.equal(getterInvoked, false)
})

test("P3-R6 reconstructs P3-R1/P3-R2 source truth rather than accepting claimed predecessor evidence", () => {
  const badRequest = { ...request(), version: "future" }
  assert.throws(
    () => buildContextPolicyMeasurementObservations(badRequest, {}, [manifestRecord()], development, holdout, {},),
    /unsupported P3-R1 context selection request contract/,
  )
})
