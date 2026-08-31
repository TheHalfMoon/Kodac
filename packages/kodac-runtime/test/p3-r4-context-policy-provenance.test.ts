import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

import {
  deriveResultIdentity,
  fixtureCaseDigest,
  sha256Canonical,
  validateFixtureDocument,
  type P2R1ManifestRecord,
} from "../bench/p2-r1/contract.ts"
import {
  P2_R2_OBSERVATION_SCHEMA,
  runP2R2Report,
  type P2R2Observation,
  type P2R2Report,
} from "../bench/p2-r2/runner.ts"
import {
  P2_R3_METRIC_POLICY_SCHEMA,
  P2_R3_POLICY_SCHEMA,
  summarizeP2R3,
  type P2R3PolicyDocument,
  type P2R3Summary,
} from "../bench/p2-r3/summary.ts"
import {
  P2_R4_METRIC_DIRECTION_SCHEMA,
  P2_R4_POLICY_SCHEMA,
  P2_R4_SHARED_EVALUATION_CONTEXT_SCHEMA,
  P2_R4_SUBJECT_SCHEMA,
  type P2R4ComparisonPolicy,
  type P2R4SharedEvaluationContext,
  type P2R4SubjectDescriptor,
} from "../bench/p2-r4/comparison.ts"
import {
  P3_R3_CONTEXT_EVIDENCE_DIMENSIONS,
  P3_R3_EVIDENCE_DECLARATION_KIND,
  P3_R3_EVIDENCE_DECLARATION_VERSION,
  P3_R3_P3_R2_IMPLEMENTATION_MERGE,
  type P3R3EvidenceDeclaration,
} from "../bench/p3-r3/contracts.ts"
import {
  P3_R4_P3_R3_IMPLEMENTATION_MERGE,
  P3_R4_PROVENANCE_DECLARATION_KIND,
  P3_R4_PROVENANCE_DECLARATION_VERSION,
  P3_R4_PROVENANCE_EVIDENCE_KIND,
  P3_R4_PROVENANCE_EVIDENCE_VERSION,
} from "../bench/p3-r4/contracts.ts"
import { buildContextPolicyBenchmarkProvenanceEvidence } from "../bench/p3-r4/context-policy-provenance.ts"
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

const METRICS = [
  ["recall-at-k", "a_recall_at_k"],
  ["precision-at-k", "b_precision_at_k"],
  ["file-f1", "c_file_f1"],
  ["token-budgeted-evidence-yield", "d_token_budgeted_evidence_yield"],
  ["no-gold-abstention", "e_no_gold_abstention"],
  ["explored-vs-utilized-context", "f_explored_vs_utilized_context"],
  ["context-dilution", "g_context_dilution"],
] as const
const REPOSITORY_ID = "a".repeat(64)
const SNAPSHOT_ID = "b".repeat(64)
const CONTENT_ID = "c".repeat(64)

function clone<T>(value: T): T { return structuredClone(value) }
function identity(seed: string): string { return sha256Canonical({ seed }) }
function load(name: string): unknown {
  return JSON.parse(readFileSync(new URL(`./fixtures/p2-r1/${name}`, import.meta.url), "utf8"))
}

function candidate(index: number): ContextSelectionCandidateInput {
  return {
    candidateId: `candidate:${index}`,
    repositoryIdentity: REPOSITORY_ID,
    snapshotIdentity: SNAPSHOT_ID,
    contentIdentity: CONTENT_ID,
    lane: "explicit-target",
    sourceKind: "repository-evidence",
    sourceIdentity: String(index + 1).repeat(64),
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
    taskIdentity: "task:p3-r4-fixture",
    repositoryIdentity: REPOSITORY_ID,
    snapshotIdentity: SNAPSHOT_ID,
    contentIdentity: CONTENT_ID,
    candidates: [candidate(1), candidate(2)],
    maxItems: 8,
    maxUtf8Bytes: 8_192,
    completeness: { state: "complete", reasons: [], omittedAtLeast: 0 },
  }
}

function policy(planRequest: ContextSelectionPlanRequest, id: string, reverse = false): DeclaredContextSelectionPolicy {
  const plan = buildContextSelectionPlan(planRequest)
  return {
    version: P3_R2_DECLARED_POLICY_VERSION,
    kind: P3_R2_DECLARED_POLICY_KIND,
    policyId: id,
    planIdentity: plan.planIdentity,
    repositoryIdentity: plan.repositoryIdentity,
    snapshotIdentity: plan.snapshotIdentity,
    contentIdentity: plan.contentIdentity,
    taskIdentity: plan.taskIdentity,
    lanePriority: reverse ? [...P3_R1_EVIDENCE_LANES].reverse() : [...P3_R1_EVIDENCE_LANES],
    maxSelectedItems: plan.budget.maxItems,
    maxSelectedUtf8Bytes: plan.budget.maxUtf8Bytes,
    maxPerGroupingKey: plan.budget.maxItems,
  }
}

function context(): P2R4SharedEvaluationContext {
  return {
    schema_version: P2_R4_SHARED_EVALUATION_CONTEXT_SCHEMA,
    model_provider_version_identity: identity("model-provider"),
    configuration_identity: identity("configuration"),
    repository_task_snapshot_identity: identity("repo-task"),
    hardware_execution_environment_identity: identity("environment"),
    network_assumptions_identity: identity("network"),
    time_token_cost_budget_identity: identity("budget"),
    attempt_policy_identity: identity("attempts"),
    allowed_tools_identity: identity("tools"),
    prompt_instruction_policy_identity: identity("prompt"),
    scoring_method_identity: identity("scoring"),
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

function pairSubjects(
  planRequest: ContextSelectionPlanRequest,
  leftPolicy: DeclaredContextSelectionPolicy,
  rightPolicy: DeclaredContextSelectionPolicy,
): { left: P2R4SubjectDescriptor; right: P2R4SubjectDescriptor } {
  const left = applyDeclaredContextSelectionPolicy(planRequest, leftPolicy)
  const right = applyDeclaredContextSelectionPolicy(planRequest, rightPolicy)
  return {
    left: {
      schema_version: P2_R4_SUBJECT_SCHEMA,
      subject_id: `context-policy-application:${left.applicationIdentity}`,
      system_version_commit_identity: systemIdentity(left.policyIdentity, left.applicationIdentity),
      raw_artifact_log_set_identity: identity("left-artifacts"),
    },
    right: {
      schema_version: P2_R4_SUBJECT_SCHEMA,
      subject_id: `context-policy-application:${right.applicationIdentity}`,
      system_version_commit_identity: systemIdentity(right.policyIdentity, right.applicationIdentity),
      raw_artifact_log_set_identity: identity("right-artifacts"),
    },
  }
}

function makeR1() {
  const developmentRaw = clone(load("development.json")) as Record<string, unknown>
  const holdoutRaw = clone(load("holdout.json")) as Record<string, unknown>
  const manifestRaw = clone(load("manifest.json")) as P2R1ManifestRecord[]
  for (const document of [developmentRaw, holdoutRaw]) {
    for (const fixtureCase of document.cases as Array<Record<string, unknown>>) {
      fixtureCase.task_family = "context-selection"
    }
  }
  const development = validateFixtureDocument(developmentRaw, "development")
  const holdout = validateFixtureDocument(holdoutRaw, "holdout")
  const developmentDigest = sha256Canonical(development)
  const holdoutDigest = sha256Canonical(holdout)
  for (const record of manifestRaw) {
    const source = record.corpus_role === "development" ? development : holdout
    const fixtureCase = source.cases.find((entry) => entry.case_id === record.case_id)!
    record.task_family = "context-selection"
    record.case_digest = fixtureCaseDigest(fixtureCase)
    record.corpus_id = development.corpus_id
    record.corpus_digest = developmentDigest
    record.holdout_id = holdout.corpus_id
    record.holdout_digest = holdoutDigest
    record.development_freeze_anchor = clone(development.chronology_anchor)
    record.holdout_chronology_anchor = clone(holdout.chronology_anchor)
    record.chronology_scheme = development.chronology_scheme
    record.source_provenance = clone(source.source_provenance)
    record.contamination_status = source.contamination_status
    record.metric_definitions = METRICS.map(([, metricId]) => ({
      task_family: "context-selection",
      metric_id: metricId,
      unit: "score",
    }))
    record.result_identity = deriveResultIdentity(record)
  }
  return { developmentRaw, holdoutRaw, manifestRaw }
}

function observations(manifest: readonly P2R1ManifestRecord[], offset: number): P2R2Observation[] {
  return manifest.flatMap((record, recordIndex) => record.metric_definitions.map((metric, metricIndex) => ({
    schema_version: P2_R2_OBSERVATION_SCHEMA,
    case_id: record.case_id,
    r1_result_identity: record.result_identity,
    task_family: record.task_family,
    metric_id: metric.metric_id,
    unit: metric.unit,
    measurement_status: "observed" as const,
    value: offset + recordIndex + metricIndex / 10,
  })))
}

function rebindReport(report: P2R2Report): void {
  let cases = 0
  let observed = 0
  let missing = 0
  for (const section of report.task_family_sections) {
    cases += section.cases.length
    for (const reportCase of section.cases) {
      for (const metric of reportCase.metrics) {
        if (metric.measurement_status === "observed") observed += 1
        else missing += 1
      }
    }
  }
  report.case_count = cases
  report.observation_count = observed
  report.missing_observation_count = missing
  const { report_identity: _ignored, ...projection } = report
  report.report_identity = sha256Canonical(projection)
}

function summaryPolicy(report: P2R2Report): P2R3PolicyDocument {
  const section = report.task_family_sections[0]!
  return {
    schema_version: P2_R3_POLICY_SCHEMA,
    benchmark_id: report.benchmark_id,
    benchmark_protocol_version: report.benchmark_protocol_version,
    r2_report_identity: report.report_identity,
    metric_policies: section.cases[0]!.metrics.map((metric) => ({
      schema_version: P2_R3_METRIC_POLICY_SCHEMA,
      task_family: "context-selection",
      metric_id: metric.metric_id,
      unit: metric.unit,
      value_kind: "NUMBER" as const,
      reducer: "ARITHMETIC_MEAN" as const,
      missingness_policy: "REQUIRE_COMPLETE" as const,
      minimum_observed_count: section.cases.length,
    })),
  }
}

function comparisonPolicy(left: P2R3Summary, right: P2R3Summary, shared: P2R4SharedEvaluationContext): P2R4ComparisonPolicy {
  const metrics = left.task_family_summaries[0]!.metrics
  return {
    schema_version: P2_R4_POLICY_SCHEMA,
    benchmark_id: left.benchmark_id,
    benchmark_protocol_version: left.benchmark_protocol_version,
    left_summary_identity: left.summary_identity,
    right_summary_identity: right.summary_identity,
    shared_evaluation_context_identity: sha256Canonical(shared),
    metric_directions: metrics.map((metric) => ({
      schema_version: P2_R4_METRIC_DIRECTION_SCHEMA,
      task_family: "context-selection",
      metric_id: metric.metric_id,
      input_unit: metric.input_unit,
      output_unit: metric.output_unit,
      value_kind: metric.value_kind,
      reducer: metric.reducer,
      missingness_policy: metric.missingness_policy,
      minimum_observed_count: metric.minimum_observed_count,
      direction: metric.metric_id === "g_context_dilution" ? "LOWER_IS_BETTER" : "HIGHER_IS_BETTER",
    })),
  }
}

function p3Declaration(left: P2R3Summary, shared: P2R4SharedEvaluationContext, comparePolicy: P2R4ComparisonPolicy): P3R3EvidenceDeclaration {
  const metricIds = left.task_family_summaries[0]!.metrics.map((entry) => entry.metric_id)
  return {
    version: P3_R3_EVIDENCE_DECLARATION_VERSION,
    kind: P3_R3_EVIDENCE_DECLARATION_KIND,
    qualificationId: "qualification:p3-r4-r3",
    benchmarkId: left.benchmark_id,
    benchmarkProtocolVersion: left.benchmark_protocol_version,
    sharedEvaluationContextIdentity: sha256Canonical(shared),
    comparisonPolicyIdentity: sha256Canonical(comparePolicy),
    taskFamily: "context-selection",
    dimensionMetricBindings: P3_R3_CONTEXT_EVIDENCE_DIMENSIONS.map((dimension, index) => ({
      dimension,
      metricId: metricIds[index]!,
    })),
  }
}

function makeFixture(reportMutation?: (left: P2R2Report, right: P2R2Report) => void) {
  const r1 = makeR1()
  let left = runP2R2Report(r1.manifestRaw, r1.developmentRaw, r1.holdoutRaw, observations(r1.manifestRaw, 100))
  let right = runP2R2Report(r1.manifestRaw, r1.developmentRaw, r1.holdoutRaw, observations(r1.manifestRaw, 90))
  if (reportMutation) {
    left = clone(left)
    right = clone(right)
    reportMutation(left, right)
    rebindReport(left)
    rebindReport(right)
  }
  const leftSummary = summarizeP2R3(left, summaryPolicy(left))
  const rightSummary = summarizeP2R3(right, summaryPolicy(right))
  const shared = context()
  const planRequest = request()
  const leftPolicy = policy(planRequest, "policy:p3-r4-left")
  const rightPolicy = policy(planRequest, "policy:p3-r4-right", true)
  const subjects = pairSubjects(planRequest, leftPolicy, rightPolicy)
  const comparePolicy = comparisonPolicy(leftSummary, rightSummary, shared)
  return {
    ...r1,
    planRequest,
    leftPolicy,
    rightPolicy,
    left,
    leftSummary,
    right,
    rightSummary,
    shared,
    leftSubject: subjects.left,
    rightSubject: subjects.right,
    comparePolicy,
    p3Declaration: p3Declaration(leftSummary, shared, comparePolicy),
    provenanceDeclaration: {
      version: P3_R4_PROVENANCE_DECLARATION_VERSION,
      kind: P3_R4_PROVENANCE_DECLARATION_KIND,
      qualificationId: "qualification:p3-r4-fixture",
    },
  }
}

type Fixture = ReturnType<typeof makeFixture>

function build(input: Fixture = makeFixture()) {
  return buildContextPolicyBenchmarkProvenanceEvidence(
    input.planRequest,
    input.leftPolicy,
    input.rightPolicy,
    input.left,
    input.leftSummary,
    input.right,
    input.rightSummary,
    input.shared,
    input.leftSubject,
    input.rightSubject,
    input.comparePolicy,
    input.p3Declaration,
    input.manifestRaw,
    input.developmentRaw,
    input.holdoutRaw,
    input.provenanceDeclaration,
  )
}

function assertDeepFrozen(value: unknown, seen = new WeakSet<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return
  seen.add(value)
  assert.equal(Object.isFrozen(value), true)
  for (const nested of Object.values(value as Record<string, unknown>)) assertDeepFrozen(nested, seen)
}

const RESULT_KEYS = ["version", "kind", "provenanceEvidenceIdentity", "qualificationId", "p3R3ImplementationMerge", "p3R3EvidenceIdentity", "benchmarkId", "benchmarkProtocolVersion", "leftR2ReportIdentity", "rightR2ReportIdentity", "r1ManifestSetDigest", "taskFamily", "caseProvenance"].sort()
const CASE_KEYS = ["caseId", "r1ResultIdentity", "corpusRole", "corpusId", "corpusDigest", "holdoutId", "holdoutDigest", "chronologyScheme", "developmentFreezeAnchor", "holdoutChronologyAnchor", "chronologyStatus", "contaminationStatus", "sourceProvenance"].sort()

test("P3-R4 binds trusted P3-R3 to exact literal P2-R1 provenance", () => {
  const input = makeFixture()
  const result = build(input)
  assert.equal(result.version, P3_R4_PROVENANCE_EVIDENCE_VERSION)
  assert.equal(result.kind, P3_R4_PROVENANCE_EVIDENCE_KIND)
  assert.equal(result.p3R3ImplementationMerge, P3_R4_P3_R3_IMPLEMENTATION_MERGE)
  assert.equal(result.taskFamily, "context-selection")
  assert.equal(result.leftR2ReportIdentity, input.left.report_identity)
  assert.equal(result.rightR2ReportIdentity, input.right.report_identity)
  assert.deepEqual(Object.keys(result).sort(), RESULT_KEYS)
  assert.equal(result.caseProvenance.length, 4)
  for (const entry of result.caseProvenance) {
    assert.deepEqual(Object.keys(entry).sort(), CASE_KEYS)
    assert.deepEqual(Object.keys(entry.developmentFreezeAnchor).sort(), ["ordinal", "scheme"])
    assert.deepEqual(Object.keys(entry.holdoutChronologyAnchor).sort(), ["ordinal", "scheme"])
    assert.deepEqual(Object.keys(entry.sourceProvenance).sort(), ["kind", "path"])
    assert.equal(entry.sourceProvenance.kind, "repository-authored-synthetic")
  }
  assert.deepEqual(result.caseProvenance.map((entry) => entry.caseId), [...result.caseProvenance.map((entry) => entry.caseId)].sort())
  assert.ok(result.caseProvenance.some((entry) => entry.corpusRole === "development" && entry.contaminationStatus === "none-known"))
  assert.ok(result.caseProvenance.some((entry) => entry.corpusRole === "holdout" && entry.contaminationStatus === "unknown"))
  assert.ok(result.caseProvenance.every((entry) => entry.chronologyStatus === "later-in-time"))
})

test("P3-R4 identity is self-reference-free, deterministic, detached, and deeply frozen", () => {
  const input = makeFixture()
  const result = build(input)
  const { provenanceEvidenceIdentity, ...projection } = result
  assert.equal(provenanceEvidenceIdentity, sha256Canonical(projection))
  assert.equal(build().provenanceEvidenceIdentity, provenanceEvidenceIdentity)
  const firstCase = result.caseProvenance[0]!.caseId
  input.manifestRaw[0]!.case_id = "mutated-after-return"
  input.provenanceDeclaration.qualificationId = "qualification:mutated-after-return"
  assert.equal(result.caseProvenance[0]!.caseId, firstCase)
  assert.equal(result.qualificationId, "qualification:p3-r4-fixture")
  assertDeepFrozen(result)
})

test("P3-R4 emits no decision, promotion, significance, or public-claim semantics", () => {
  const serialized = JSON.stringify(build())
  for (const forbidden of ["winner", "defaultPolicy", "promotion", "threshold", "significance", "verdict", "sufficient-holdout", "proven-uncontaminated", "acceptable-policy"]) {
    assert.equal(serialized.includes(forbidden), false)
  }
})

test("P3-R4 rejects a valid but different R1 manifest digest", () => {
  const input = makeFixture()
  for (const record of input.manifestRaw) {
    record.benchmark_id = "kodacbench-p3-r4-different"
    record.result_identity = deriveResultIdentity(record)
  }
  assert.throws(() => build(input), /manifest digest does not match both P2-R2 reports/)
})

test("P3-R4 rejects a self-consistent report pair that omits a relevant manifest case", () => {
  const input = makeFixture((left, right) => {
    left.task_family_sections[0]!.cases.pop()
    right.task_family_sections[0]!.cases.pop()
  })
  assert.throws(() => build(input), /case cardinality does not match validated P2-R1 manifest/)
})

test("P3-R4 independently binds complete report metric topology to manifest definitions", () => {
  const input = makeFixture((left, right) => {
    for (const report of [left, right]) {
      for (const reportCase of report.task_family_sections[0]!.cases) {
        reportCase.metrics[0]!.metric_id = "a_recall_at_k_changed"
      }
    }
  })
  assert.throws(() => build(input), /metric topology does not match P2-R1 manifest/)
})

test("P3-R4 declaration is exact-key, constant-bound, bounded, and hostile-input fail-closed", () => {
  const input = makeFixture()
  assert.throws(() => build({ ...input, provenanceDeclaration: { ...input.provenanceDeclaration, extra: true } } as Fixture), /unknown field/)
  assert.throws(() => build({ ...input, provenanceDeclaration: { ...input.provenanceDeclaration, qualificationId: " bad " } } as Fixture), /canonical NUL-free string|stable-id alphabet/)
  assert.throws(() => build({ ...input, provenanceDeclaration: { ...input.provenanceDeclaration, qualificationId: "a".repeat(513) } } as Fixture), /exceeds 512 UTF-8 bytes/)

  let invoked = false
  const accessor: Record<string, unknown> = {
    kind: P3_R4_PROVENANCE_DECLARATION_KIND,
    qualificationId: "qualification:hostile",
  }
  Object.defineProperty(accessor, "version", { enumerable: true, get() { invoked = true; return P3_R4_PROVENANCE_DECLARATION_VERSION } })
  assert.throws(() => build({ ...input, provenanceDeclaration: accessor } as Fixture), /P2-R1 contract violation|P3-R4 contract violation/)
  assert.equal(invoked, false)
  const proxy = new Proxy({}, { get: () => { throw new Error("must-not-run") } })
  assert.throws(() => build({ ...input, provenanceDeclaration: proxy } as Fixture), /P2-R1 contract violation|P3-R4 contract violation/)
})

test("P3-R4 rejects malformed predecessor evidence through canonical predecessor validators", () => {
  const input = makeFixture()
  const staleLeft = clone(input.left)
  staleLeft.report_identity = identity("stale-left")
  assert.throws(() => build({ ...input, left: staleLeft } as Fixture), /report_identity does not match/)

  const badManifest = clone(input.manifestRaw) as Array<P2R1ManifestRecord & { extra?: boolean }>
  badManifest[0]!.extra = true
  assert.throws(() => build({ ...input, manifestRaw: badManifest } as Fixture), /P2-R1 contract violation/)
})
