import assert from "node:assert/strict"
import test from "node:test"

import { sha256Canonical } from "../bench/p2-r1/contract.ts"
import {
  P2_R4_COMPARISON_SCHEMA,
  P2_R4_SUBJECT_SCHEMA,
  type P2R4Comparison,
  type P2R4Direction,
  type P2R4MetricComparison,
} from "../bench/p2-r4/comparison.ts"
import {
  P3_R3_CONTEXT_EVIDENCE_DIMENSIONS,
  P3_R3_EVIDENCE_DECLARATION_KIND,
  P3_R3_EVIDENCE_DECLARATION_VERSION,
  P3_R3_METRIC_EVIDENCE_KIND,
  P3_R3_METRIC_EVIDENCE_VERSION,
  P3_R3_P3_R2_IMPLEMENTATION_MERGE,
  type P3R3EvidenceDeclaration,
} from "../bench/p3-r3/contracts.ts"
import { buildContextPolicyPairwiseMetricEvidence } from "../bench/p3-r3/context-policy-evidence.ts"
import type { P2R3MetricSummary } from "../bench/p2-r3/summary.ts"
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

const METRIC_BINDINGS = [
  ["recall-at-k", "a_recall_at_k"],
  ["precision-at-k", "b_precision_at_k"],
  ["file-f1", "c_file_f1"],
  ["token-budgeted-evidence-yield", "d_token_budgeted_evidence_yield"],
  ["no-gold-abstention", "e_no_gold_abstention"],
  ["explored-vs-utilized-context", "f_explored_vs_utilized_context"],
  ["context-dilution", "g_context_dilution"],
] as const

function identity(seed: string): string {
  return sha256Canonical({ seed })
}

function candidate(index: number): ContextSelectionCandidateInput {
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
  }
}

function request(): ContextSelectionPlanRequest {
  return {
    version: P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
    kind: P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
    taskIdentity: "task:p3-r3-fixture",
    repositoryIdentity: REPOSITORY_ID,
    snapshotIdentity: SNAPSHOT_ID,
    contentIdentity: CONTENT_ID,
    candidates: [candidate(1), candidate(2)],
    maxItems: 8,
    maxUtf8Bytes: 8_192,
    completeness: { state: "complete", reasons: [], omittedAtLeast: 0 },
  }
}

function policy(
  planRequest: ContextSelectionPlanRequest,
  policyId: string,
  overrides: Partial<DeclaredContextSelectionPolicy> = {},
): DeclaredContextSelectionPolicy {
  const plan = buildContextSelectionPlan(planRequest)
  return {
    version: P3_R2_DECLARED_POLICY_VERSION,
    kind: P3_R2_DECLARED_POLICY_KIND,
    policyId,
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

function numericSummary(metricId: string, value: number | null): P2R3MetricSummary {
  const reduced = value !== null
  return {
    metric_id: metricId,
    input_unit: "score",
    output_unit: "score",
    value_kind: "NUMBER",
    reducer: "ARITHMETIC_MEAN",
    missingness_policy: "REQUIRE_COMPLETE",
    minimum_observed_count: 1,
    expected_count: 1,
    observed_count: reduced ? 1 : 0,
    missing_count: reduced ? 0 : 1,
    unavailable_count: 0,
    status: reduced ? "REDUCED" : "INSUFFICIENT_EVIDENCE",
    reduced_value: value,
    true_count: null,
    denominator_count: null,
  }
}

function numericMetric(
  metricId: string,
  left: number | null,
  right: number | null,
  direction: P2R4Direction = "HIGHER_IS_BETTER",
): P2R4MetricComparison {
  const leftSummary = numericSummary(metricId, left)
  const rightSummary = numericSummary(metricId, right)
  const comparable = left !== null && right !== null
  return {
    metric_id: metricId,
    input_unit: "score",
    output_unit: "score",
    value_kind: "NUMBER",
    reducer: "ARITHMETIC_MEAN",
    missingness_policy: "REQUIRE_COMPLETE",
    minimum_observed_count: 1,
    expected_count: 1,
    direction,
    left_summary: leftSummary,
    right_summary: rightSummary,
    status: comparable ? "COMPARABLE" : "INSUFFICIENT_EVIDENCE",
    left_value: comparable ? left : null,
    right_value: comparable ? right : null,
    raw_delta_left_minus_right: comparable ? left - right : null,
  }
}

function systemIdentity(policyIdentity: string, applicationIdentity: string): string {
  return sha256Canonical({
    version: "p3-r3-context-policy-benchmark-subject-v1",
    p3R2ImplementationMerge: P3_R3_P3_R2_IMPLEMENTATION_MERGE,
    policyIdentity,
    applicationIdentity,
  })
}

function comparison(
  planRequest: ContextSelectionPlanRequest,
  leftPolicy: DeclaredContextSelectionPolicy,
  rightPolicy: DeclaredContextSelectionPolicy,
  insufficientMetricId: string | null = null,
): P2R4Comparison {
  const leftApplication = applyDeclaredContextSelectionPolicy(planRequest, leftPolicy)
  const rightApplication = applyDeclaredContextSelectionPolicy(planRequest, rightPolicy)
  const metrics = METRIC_BINDINGS.map(([, metricId], index) =>
    numericMetric(
      metricId,
      insufficientMetricId === metricId ? null : 10 + index,
      9 + index,
      metricId === "g_context_dilution" ? "LOWER_IS_BETTER" : "HIGHER_IS_BETTER",
    ),
  )
  const base: Omit<P2R4Comparison, "comparison_identity"> = {
    schema_version: P2_R4_COMPARISON_SCHEMA,
    benchmark_id: "kodacbench.p3-r3-fixture",
    benchmark_protocol_version: "v1",
    left_subject: {
      schema_version: P2_R4_SUBJECT_SCHEMA,
      subject_id: `context-policy-application:${leftApplication.applicationIdentity}`,
      system_version_commit_identity: systemIdentity(
        leftApplication.policyIdentity,
        leftApplication.applicationIdentity,
      ),
      raw_artifact_log_set_identity: identity("left-artifacts"),
    },
    right_subject: {
      schema_version: P2_R4_SUBJECT_SCHEMA,
      subject_id: `context-policy-application:${rightApplication.applicationIdentity}`,
      system_version_commit_identity: systemIdentity(
        rightApplication.policyIdentity,
        rightApplication.applicationIdentity,
      ),
      raw_artifact_log_set_identity: identity("right-artifacts"),
    },
    left_r2_report_identity: identity("left-r2"),
    right_r2_report_identity: identity("right-r2"),
    left_summary_identity: identity("left-r3"),
    right_summary_identity: identity("right-r3"),
    shared_evaluation_context_identity: identity("shared-context"),
    comparison_policy_identity: identity("comparison-policy"),
    task_family_comparisons: [{ task_family: "context-selection", metrics }],
  }
  return { ...base, comparison_identity: sha256Canonical(base) }
}

function declaration(input: P2R4Comparison): P3R3EvidenceDeclaration {
  return {
    version: P3_R3_EVIDENCE_DECLARATION_VERSION,
    kind: P3_R3_EVIDENCE_DECLARATION_KIND,
    qualificationId: "qualification:p3-r3-fixture",
    benchmarkId: input.benchmark_id,
    benchmarkProtocolVersion: input.benchmark_protocol_version,
    sharedEvaluationContextIdentity: input.shared_evaluation_context_identity,
    comparisonPolicyIdentity: input.comparison_policy_identity,
    taskFamily: "context-selection",
    dimensionMetricBindings: METRIC_BINDINGS.map(([dimension, metricId]) => ({ dimension, metricId })),
  }
}

function rebindComparisonIdentity(value: P2R4Comparison): void {
  const { comparison_identity: _ignored, ...base } = value
  value.comparison_identity = sha256Canonical(base)
}

function fixture(insufficientMetricId: string | null = null) {
  const planRequest = request()
  const leftPolicy = policy(planRequest, "policy:p3-r3-left")
  const rightPolicy = policy(planRequest, "policy:p3-r3-right", {
    lanePriority: [...P3_R1_EVIDENCE_LANES].reverse(),
  })
  const p2Comparison = comparison(planRequest, leftPolicy, rightPolicy, insufficientMetricId)
  return {
    planRequest,
    leftPolicy,
    rightPolicy,
    p2Comparison,
    evidenceDeclaration: declaration(p2Comparison),
  }
}

function build(insufficientMetricId: string | null = null) {
  const input = fixture(insufficientMetricId)
  return {
    input,
    result: buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      input.evidenceDeclaration,
    ),
  }
}

function assertDeepFrozen(value: unknown, seen = new WeakSet<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return
  seen.add(value)
  assert.equal(Object.isFrozen(value), true)
  for (const nested of Object.values(value as Record<string, unknown>)) assertDeepFrozen(nested, seen)
}

const RESULT_KEYS = [
  "benchmarkId",
  "benchmarkProtocolVersion",
  "candidateSetIdentity",
  "comparisonPolicyIdentity",
  "contentIdentity",
  "dimensionMetricBindings",
  "evidenceIdentity",
  "kind",
  "leftApplicationIdentity",
  "leftApplicationState",
  "leftPolicyId",
  "leftPolicyIdentity",
  "leftSubject",
  "metricEvidenceState",
  "metricRelations",
  "p3R2ImplementationMerge",
  "planIdentity",
  "qualificationId",
  "r4ComparisonIdentity",
  "r5RelationSetIdentity",
  "repositoryIdentity",
  "requestIdentity",
  "rightApplicationIdentity",
  "rightApplicationState",
  "rightPolicyId",
  "rightPolicyIdentity",
  "rightSubject",
  "sharedEvaluationContextIdentity",
  "snapshotIdentity",
  "taskFamily",
  "taskIdentity",
  "version",
].sort()

test("P3-R3 derives a closed all-comparable evidence record from canonical R2 and R5 truth", () => {
  const { input, result } = build()
  const left = applyDeclaredContextSelectionPolicy(input.planRequest, input.leftPolicy)
  const right = applyDeclaredContextSelectionPolicy(input.planRequest, input.rightPolicy)

  assert.equal(result.version, P3_R3_METRIC_EVIDENCE_VERSION)
  assert.equal(result.kind, P3_R3_METRIC_EVIDENCE_KIND)
  assert.equal(result.p3R2ImplementationMerge, P3_R3_P3_R2_IMPLEMENTATION_MERGE)
  assert.equal(result.leftPolicyIdentity, left.policyIdentity)
  assert.equal(result.leftApplicationIdentity, left.applicationIdentity)
  assert.equal(result.rightPolicyIdentity, right.policyIdentity)
  assert.equal(result.rightApplicationIdentity, right.applicationIdentity)
  assert.match(result.leftPolicyIdentity, /^[0-9a-f]{64}$/)
  assert.match(result.leftApplicationIdentity, /^[0-9a-f]{64}$/)
  assert.match(result.evidenceIdentity, /^sha256:[0-9a-f]{64}$/)
  assert.equal(result.metricEvidenceState, "all-required-metrics-comparable")
  assert.equal(result.metricRelations.length, 7)
  assert.deepEqual(result.dimensionMetricBindings, input.evidenceDeclaration.dimensionMetricBindings)
  assert.equal(result.leftSubject.subject_id, `context-policy-application:${left.applicationIdentity}`)
  assert.equal(result.rightSubject.subject_id, `context-policy-application:${right.applicationIdentity}`)
  assert.equal(result.leftSubject.system_version_commit_identity, systemIdentity(left.policyIdentity, left.applicationIdentity))
  assert.equal(result.rightSubject.system_version_commit_identity, systemIdentity(right.policyIdentity, right.applicationIdentity))
  assert.equal(result.leftSubject.raw_artifact_log_set_identity, input.p2Comparison.left_subject.raw_artifact_log_set_identity)
  assert.equal(result.rightSubject.raw_artifact_log_set_identity, input.p2Comparison.right_subject.raw_artifact_log_set_identity)
  assert.deepEqual(Object.keys(result).sort(), RESULT_KEYS)
})

test("P3-R3 derives evidenceIdentity over every exact output field except the identity itself", () => {
  const { result } = build()
  const { evidenceIdentity, ...projection } = result
  assert.equal(evidenceIdentity, sha256Canonical(projection))
})

test("P3-R3 preserves insufficient metric evidence without a winner or aggregate verdict", () => {
  const { result } = build("c_file_f1")
  assert.equal(result.metricEvidenceState, "one-or-more-required-metrics-insufficient")
  const metric = result.metricRelations.find((entry) => entry.metric_id === "c_file_f1")!
  assert.equal(metric.status, "INSUFFICIENT_EVIDENCE")
  assert.equal(metric.relation, "INSUFFICIENT_EVIDENCE")
  for (const forbidden of ["winner", "score", "rank", "threshold", "promotion", "defaultPolicy"] as const) {
    assert.equal(Object.hasOwn(result, forbidden), false)
  }
})

test("P3-R3 executes canonical R2 request validation before touching later evidence inputs", () => {
  const input = fixture()
  const badRequest = { ...input.planRequest, version: "future" }
  const hostileComparison = new Proxy({}, { get: () => { throw new Error("comparison touched") } })
  const hostileDeclaration = new Proxy({}, { get: () => { throw new Error("declaration touched") } })
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      badRequest,
      input.leftPolicy,
      input.rightPolicy,
      hostileComparison,
      hostileDeclaration,
    ),
    /unsupported P3-R1 context selection request contract/,
  )
})

test("P3-R3 fails malformed left and right policies through canonical R2 validation", () => {
  const input = fixture()
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      { ...input.leftPolicy, version: "future" },
      input.rightPolicy,
      input.p2Comparison,
      input.evidenceDeclaration,
    ),
    /unsupported P3-R2 declared policy contract/,
  )
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      { ...input.rightPolicy, kind: "future" },
      input.p2Comparison,
      input.evidenceDeclaration,
    ),
    /unsupported P3-R2 declared policy contract/,
  )
})

test("P3-R3 executes canonical P2-R5 validation before touching the R3 declaration", () => {
  const input = fixture()
  input.p2Comparison.comparison_identity = identity("tampered")
  const hostileDeclaration = new Proxy({}, { get: () => { throw new Error("declaration touched") } })
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      hostileDeclaration,
    ),
    /P2-R5 contract violation:.*comparison_identity/,
  )
})

test("P3-R3 requires distinct canonical R2 policies and applications", () => {
  const input = fixture()
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.leftPolicy,
      input.p2Comparison,
      input.evidenceDeclaration,
    ),
    /policyIdentity values must be distinct/,
  )
})

test("P3-R3 fails closed for left and right subject-id mismatches", () => {
  const leftInput = fixture()
  leftInput.p2Comparison.left_subject.subject_id = "context-policy-application:wrong"
  rebindComparisonIdentity(leftInput.p2Comparison)
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      leftInput.planRequest,
      leftInput.leftPolicy,
      leftInput.rightPolicy,
      leftInput.p2Comparison,
      leftInput.evidenceDeclaration,
    ),
    /left subject_id does not bind/,
  )

  const rightInput = fixture()
  rightInput.p2Comparison.right_subject.subject_id = "context-policy-application:wrong"
  rebindComparisonIdentity(rightInput.p2Comparison)
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      rightInput.planRequest,
      rightInput.leftPolicy,
      rightInput.rightPolicy,
      rightInput.p2Comparison,
      rightInput.evidenceDeclaration,
    ),
    /right subject_id does not bind/,
  )
})

test("P3-R3 fails closed for left and right system-version binding mismatches", () => {
  const leftInput = fixture()
  leftInput.p2Comparison.left_subject.system_version_commit_identity = identity("wrong-left-system")
  rebindComparisonIdentity(leftInput.p2Comparison)
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      leftInput.planRequest,
      leftInput.leftPolicy,
      leftInput.rightPolicy,
      leftInput.p2Comparison,
      leftInput.evidenceDeclaration,
    ),
    /left system_version_commit_identity does not bind/,
  )

  const rightInput = fixture()
  rightInput.p2Comparison.right_subject.system_version_commit_identity = identity("wrong-right-system")
  rebindComparisonIdentity(rightInput.p2Comparison)
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      rightInput.planRequest,
      rightInput.leftPolicy,
      rightInput.rightPolicy,
      rightInput.p2Comparison,
      rightInput.evidenceDeclaration,
    ),
    /right system_version_commit_identity does not bind/,
  )
})

test("P3-R3 validates exact declaration keys, constants, and every P2 declaration binding", () => {
  const input = fixture()
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      { ...input.evidenceDeclaration, winner: "left" },
    ),
    /unknown field: winner/,
  )
  const missing = { ...input.evidenceDeclaration } as Record<string, unknown>
  delete missing.qualificationId
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      missing,
    ),
    /missing required field: qualificationId/,
  )
  for (const [patch, expected] of [
    [{ benchmarkId: "other-benchmark" }, /benchmarkId does not match/],
    [{ benchmarkProtocolVersion: "v2" }, /benchmarkProtocolVersion does not match/],
    [{ sharedEvaluationContextIdentity: identity("other-context") }, /sharedEvaluationContextIdentity does not match/],
    [{ comparisonPolicyIdentity: identity("other-policy") }, /comparisonPolicyIdentity does not match/],
  ] as const) {
    assert.throws(
      () => buildContextPolicyPairwiseMetricEvidence(
        input.planRequest,
        input.leftPolicy,
        input.rightPolicy,
        input.p2Comparison,
        { ...input.evidenceDeclaration, ...patch },
      ),
      expected,
    )
  }
})

test("P3-R3 enforces bounded qualification and metric stable-id grammars", () => {
  const input = fixture()
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      { ...input.evidenceDeclaration, qualificationId: "bad id" },
    ),
    /stable-id alphabet/,
  )
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      { ...input.evidenceDeclaration, qualificationId: "x".repeat(513) },
    ),
    /512 UTF-8 bytes/,
  )
  const bindings = input.evidenceDeclaration.dimensionMetricBindings.map((binding) => ({ ...binding }))
  bindings[0]!.metricId = "bad id"
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      { ...input.evidenceDeclaration, dimensionMetricBindings: bindings },
    ),
    /stable-id alphabet/,
  )
})

test("P3-R3 requires the exact dense seven-dimension semantic order and closed dimension set", () => {
  const input = fixture()
  const reversed = [...input.evidenceDeclaration.dimensionMetricBindings].reverse()
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      { ...input.evidenceDeclaration, dimensionMetricBindings: reversed },
    ),
    /dimension must be recall-at-k/,
  )

  const short = input.evidenceDeclaration.dimensionMetricBindings.slice(0, 6)
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      { ...input.evidenceDeclaration, dimensionMetricBindings: short },
    ),
    /must contain exactly 7 entries/,
  )

  const unknown = input.evidenceDeclaration.dimensionMetricBindings.map((binding) => ({ ...binding })) as Array<{ dimension: string; metricId: string }>
  unknown[0]!.dimension = "unknown-dimension"
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      { ...input.evidenceDeclaration, dimensionMetricBindings: unknown },
    ),
    /dimension must be recall-at-k/,
  )

  const sparse: unknown[] = []
  sparse.length = 7
  sparse[0] = input.evidenceDeclaration.dimensionMetricBindings[0]
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      { ...input.evidenceDeclaration, dimensionMetricBindings: sparse },
    ),
    /must be dense/,
  )

  const extended = [...input.evidenceDeclaration.dimensionMetricBindings] as unknown[] & { extra?: boolean }
  extended.extra = true
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      { ...input.evidenceDeclaration, dimensionMetricBindings: extended },
    ),
    /unexpected array field: extra/,
  )
})

test("P3-R3 rejects duplicate declaration metric IDs", () => {
  const input = fixture()
  const bindings = input.evidenceDeclaration.dimensionMetricBindings.map((binding) => ({ ...binding }))
  bindings[1]!.metricId = bindings[0]!.metricId
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      { ...input.evidenceDeclaration, dimensionMetricBindings: bindings },
    ),
    /duplicate dimension metricId/,
  )
})

test("P3-R3 requires the declaration metric set to equal the trusted seven-metric P2 set", () => {
  const input = fixture()
  const bindings = input.evidenceDeclaration.dimensionMetricBindings.map((binding) => ({ ...binding }))
  bindings[6]!.metricId = "z_other_metric"
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      { ...input.evidenceDeclaration, dimensionMetricBindings: bindings },
    ),
    /not mapped by declaration|absent from trusted P2-R5 evidence/,
  )
})

test("P3-R3 rejects Proxy, accessor, symbol, and non-plain declaration structures", () => {
  const input = fixture()
  const proxy = new Proxy(input.evidenceDeclaration, {})
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      proxy,
    ),
    /non-Proxy plain object/,
  )

  const accessor = { ...input.evidenceDeclaration } as Record<string, unknown>
  Object.defineProperty(accessor, "qualificationId", { get: () => "qualification:bad", enumerable: true })
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      accessor,
    ),
    /must be a data property/,
  )

  const symbol = { ...input.evidenceDeclaration, [Symbol("hidden")]: true }
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      symbol,
    ),
    /symbol fields/,
  )

  const nonPlain = Object.assign(Object.create({ inherited: true }), input.evidenceDeclaration)
  assert.throws(
    () => buildContextPolicyPairwiseMetricEvidence(
      input.planRequest,
      input.leftPolicy,
      input.rightPolicy,
      input.p2Comparison,
      nonPlain,
    ),
    /plain object/,
  )
})

test("P3-R3 rejects invalid non-JSON declaration field values", () => {
  const input = fixture()
  for (const invalid of [undefined, 1n, () => "x", Symbol("x"), Number.NaN] as const) {
    assert.throws(
      () => buildContextPolicyPairwiseMetricEvidence(
        input.planRequest,
        input.leftPolicy,
        input.rightPolicy,
        input.p2Comparison,
        { ...input.evidenceDeclaration, qualificationId: invalid },
      ),
      /non-empty NUL-free string|stable-id alphabet/,
    )
  }
})

test("P3-R3 is deterministic across declaration object insertion order while array order stays semantic", () => {
  const input = fixture()
  const reordered = Object.fromEntries(Object.entries(input.evidenceDeclaration).reverse())
  const first = buildContextPolicyPairwiseMetricEvidence(
    input.planRequest,
    input.leftPolicy,
    input.rightPolicy,
    input.p2Comparison,
    input.evidenceDeclaration,
  )
  const second = buildContextPolicyPairwiseMetricEvidence(
    input.planRequest,
    input.leftPolicy,
    input.rightPolicy,
    input.p2Comparison,
    reordered,
  )
  assert.deepEqual(first, second)
  assert.equal(first.evidenceIdentity, second.evidenceIdentity)
})

test("P3-R3 preserves raw-artifact identities from trusted P2 evidence", () => {
  const input = fixture()
  const result = buildContextPolicyPairwiseMetricEvidence(
    input.planRequest,
    input.leftPolicy,
    input.rightPolicy,
    input.p2Comparison,
    input.evidenceDeclaration,
  )
  assert.equal(result.leftSubject.raw_artifact_log_set_identity, input.p2Comparison.left_subject.raw_artifact_log_set_identity)
  assert.equal(result.rightSubject.raw_artifact_log_set_identity, input.p2Comparison.right_subject.raw_artifact_log_set_identity)
})

test("P3-R3 metric-evidence state is independent of favored relation labels", () => {
  const input = fixture()
  const first = buildContextPolicyPairwiseMetricEvidence(
    input.planRequest,
    input.leftPolicy,
    input.rightPolicy,
    input.p2Comparison,
    input.evidenceDeclaration,
  )
  const firstRelation = first.metricRelations[0]!.relation

  input.p2Comparison.task_family_comparisons[0]!.metrics[0]!.direction = "LOWER_IS_BETTER"
  rebindComparisonIdentity(input.p2Comparison)
  const second = buildContextPolicyPairwiseMetricEvidence(
    input.planRequest,
    input.leftPolicy,
    input.rightPolicy,
    input.p2Comparison,
    input.evidenceDeclaration,
  )

  assert.notEqual(second.metricRelations[0]!.relation, firstRelation)
  assert.equal(first.metricEvidenceState, "all-required-metrics-comparable")
  assert.equal(second.metricEvidenceState, "all-required-metrics-comparable")
})

test("P3-R3 returns deeply frozen detached evidence and preserves canonical P2 relation order", () => {
  const input = fixture()
  const result = buildContextPolicyPairwiseMetricEvidence(
    input.planRequest,
    input.leftPolicy,
    input.rightPolicy,
    input.p2Comparison,
    input.evidenceDeclaration,
  )
  const leftRawArtifactIdentity = result.leftSubject.raw_artifact_log_set_identity
  const firstDimensionMetricId = result.dimensionMetricBindings[0]!.metricId
  const firstMetricLeftValue = result.metricRelations[0]!.left_value

  input.p2Comparison.left_subject.raw_artifact_log_set_identity = identity("caller-mutated-artifacts")
  input.p2Comparison.task_family_comparisons[0]!.metrics[0]!.left_value = 999
  const callerBindings = input.evidenceDeclaration.dimensionMetricBindings as Array<{ dimension: string; metricId: string }>
  callerBindings[0] = { ...callerBindings[0]!, metricId: "caller_mutated_metric" }

  assert.equal(result.leftSubject.raw_artifact_log_set_identity, leftRawArtifactIdentity)
  assert.equal(result.dimensionMetricBindings[0]!.metricId, firstDimensionMetricId)
  assert.equal(result.metricRelations[0]!.left_value, firstMetricLeftValue)
  assertDeepFrozen(result)
  assert.deepEqual(
    result.metricRelations.map((metric) => metric.metric_id),
    METRIC_BINDINGS.map(([, metricId]) => metricId),
  )
  assert.deepEqual(
    result.dimensionMetricBindings.map((binding) => binding.dimension),
    P3_R3_CONTEXT_EVIDENCE_DIMENSIONS,
  )
})
