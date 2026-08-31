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
  compareP2R4,
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
import { buildContextPolicyPairwiseMetricEvidence } from "../bench/p3-r3/context-policy-evidence.ts"
import {
  P3_R4_PROVENANCE_DECLARATION_KIND,
  P3_R4_PROVENANCE_DECLARATION_VERSION,
} from "../bench/p3-r4/contracts.ts"
import { buildContextPolicyBenchmarkProvenanceEvidence } from "../bench/p3-r4/context-policy-provenance.ts"
import {
  P3_R5_ALLOWED_METRIC_RELATIONS,
  P3_R5_QUALIFICATION_DECLARATION_KIND,
  P3_R5_QUALIFICATION_DECLARATION_VERSION,
  P3_R5_QUALIFICATION_EVIDENCE_KIND,
  P3_R5_QUALIFICATION_EVIDENCE_VERSION,
  type P3R5QualificationDeclaration,
} from "../bench/p3-r5/contracts.ts"
import { buildDeclaredContextPolicyQualificationEvidence } from "../bench/p3-r5/context-policy-qualification.ts"
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
const QUALIFICATION_ID = "qualification:p3-r5-fixture"

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
    taskIdentity: "task:p3-r5-fixture",
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
  id: string,
  reverse = false,
): DeclaredContextSelectionPolicy {
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

function makeR1(roleFilter?: "development" | "holdout") {
  const developmentRaw = clone(load("development.json")) as Record<string, unknown>
  const holdoutRaw = clone(load("holdout.json")) as Record<string, unknown>
  let manifestRaw = clone(load("manifest.json")) as P2R1ManifestRecord[]
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
  if (roleFilter !== undefined) manifestRaw = manifestRaw.filter((entry) => entry.corpus_role === roleFilter)
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

function comparisonPolicy(
  left: P2R3Summary,
  right: P2R3Summary,
  shared: P2R4SharedEvaluationContext,
): P2R4ComparisonPolicy {
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

function p3Declaration(
  left: P2R3Summary,
  shared: P2R4SharedEvaluationContext,
  comparePolicy: P2R4ComparisonPolicy,
): P3R3EvidenceDeclaration {
  const metricIds = left.task_family_summaries[0]!.metrics.map((entry) => entry.metric_id)
  return {
    version: P3_R3_EVIDENCE_DECLARATION_VERSION,
    kind: P3_R3_EVIDENCE_DECLARATION_KIND,
    qualificationId: QUALIFICATION_ID,
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

function qualificationDeclaration(): P3R5QualificationDeclaration {
  return {
    version: P3_R5_QUALIFICATION_DECLARATION_VERSION,
    kind: P3_R5_QUALIFICATION_DECLARATION_KIND,
    qualificationId: QUALIFICATION_ID,
    qualificationPolicyIdentity: identity("qualification-policy"),
    metricCriteria: METRICS.map(([dimension, metricId]) => ({
      dimension,
      metricId,
      allowedRelations: [...P3_R5_ALLOWED_METRIC_RELATIONS],
    })),
    provenanceCriteria: {
      requiredCorpusRoles: ["development", "holdout"],
      allowedChronologyStatuses: ["later-in-time"],
      allowedContaminationStatuses: ["none-known", "unknown"],
    },
  }
}

interface FixtureOptions {
  readonly roleFilter?: "development" | "holdout"
  readonly leftOffset?: number
  readonly rightOffset?: number
  readonly reportMutation?: (left: P2R2Report, right: P2R2Report) => void
}

function makeFixture(options: FixtureOptions = {}) {
  const r1 = makeR1(options.roleFilter)
  let left = runP2R2Report(
    r1.manifestRaw,
    r1.developmentRaw,
    r1.holdoutRaw,
    observations(r1.manifestRaw, options.leftOffset ?? 100),
  )
  let right = runP2R2Report(
    r1.manifestRaw,
    r1.developmentRaw,
    r1.holdoutRaw,
    observations(r1.manifestRaw, options.rightOffset ?? 90),
  )
  if (options.reportMutation) {
    left = clone(left)
    right = clone(right)
    options.reportMutation(left, right)
    rebindReport(left)
    rebindReport(right)
  }
  const leftSummary = summarizeP2R3(left, summaryPolicy(left))
  const rightSummary = summarizeP2R3(right, summaryPolicy(right))
  const shared = context()
  const planRequest = request()
  const leftPolicy = policy(planRequest, "policy:p3-r5-left")
  const rightPolicy = policy(planRequest, "policy:p3-r5-right", true)
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
      qualificationId: QUALIFICATION_ID,
    },
    qualificationDeclaration: qualificationDeclaration(),
  }
}

type Fixture = ReturnType<typeof makeFixture>

function build(input: Fixture = makeFixture()) {
  return buildDeclaredContextPolicyQualificationEvidence(
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
    input.qualificationDeclaration,
  )
}

function trustedPredecessors(input: Fixture) {
  const comparison = compareP2R4(
    input.left,
    input.leftSummary,
    input.right,
    input.rightSummary,
    input.shared,
    input.leftSubject,
    input.rightSubject,
    input.comparePolicy,
  )
  const p3R3 = buildContextPolicyPairwiseMetricEvidence(
    input.planRequest,
    input.leftPolicy,
    input.rightPolicy,
    comparison,
    input.p3Declaration,
  )
  const p3R4 = buildContextPolicyBenchmarkProvenanceEvidence(
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
  return { p3R3, p3R4 }
}

function assertDeepFrozen(value: unknown, seen = new WeakSet<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return
  seen.add(value)
  assert.equal(Object.isFrozen(value), true)
  for (const nested of Object.values(value as Record<string, unknown>)) assertDeepFrozen(nested, seen)
}

function mutableDeclaration(input: Fixture): Record<string, unknown> {
  return clone(input.qualificationDeclaration) as unknown as Record<string, unknown>
}

const RESULT_KEYS = [
  "version", "kind", "qualificationEvidenceIdentity", "qualificationId",
  "qualificationPolicyIdentity", "p3R3EvidenceIdentity", "p3R4ProvenanceEvidenceIdentity",
  "benchmarkId", "benchmarkProtocolVersion", "taskFamily", "leftPolicyId", "leftPolicyIdentity",
  "rightPolicyId", "rightPolicyIdentity", "metricCriterionResults", "provenanceCriterionResults",
  "qualificationEvidenceState",
].sort()
const METRIC_RESULT_KEYS = ["dimension", "metricId", "observedRelation", "allowedRelations", "criterionState"].sort()
const PROVENANCE_RESULT_KEYS = [
  "requiredCorpusRoles", "observedCorpusRoles", "allowedChronologyStatuses", "observedChronologyStatuses",
  "allowedContaminationStatuses", "observedContaminationStatuses", "corpusRoleCriterionState",
  "chronologyCriterionState", "contaminationCriterionState",
].sort()

test("P3-R5 reconstructs exact P3-R3/P3-R4 evidence and emits only the closed qualification contract", () => {
  const input = makeFixture()
  const expected = trustedPredecessors(input)
  const result = build(input)
  assert.equal(result.version, P3_R5_QUALIFICATION_EVIDENCE_VERSION)
  assert.equal(result.kind, P3_R5_QUALIFICATION_EVIDENCE_KIND)
  assert.equal(result.qualificationId, QUALIFICATION_ID)
  assert.equal(result.p3R3EvidenceIdentity, expected.p3R3.evidenceIdentity)
  assert.equal(result.p3R4ProvenanceEvidenceIdentity, expected.p3R4.provenanceEvidenceIdentity)
  assert.equal(expected.p3R4.p3R3EvidenceIdentity, expected.p3R3.evidenceIdentity)
  assert.equal(result.benchmarkId, expected.p3R3.benchmarkId)
  assert.equal(result.benchmarkProtocolVersion, expected.p3R3.benchmarkProtocolVersion)
  assert.equal(result.taskFamily, "context-selection")
  assert.equal(result.leftPolicyId, expected.p3R3.leftPolicyId)
  assert.equal(result.leftPolicyIdentity, expected.p3R3.leftPolicyIdentity)
  assert.equal(result.rightPolicyId, expected.p3R3.rightPolicyId)
  assert.equal(result.rightPolicyIdentity, expected.p3R3.rightPolicyIdentity)
  assert.equal(result.metricCriterionResults.length, 7)
  assert.deepEqual(Object.keys(result).sort(), RESULT_KEYS)
  for (const metric of result.metricCriterionResults) assert.deepEqual(Object.keys(metric).sort(), METRIC_RESULT_KEYS)
  assert.deepEqual(Object.keys(result.provenanceCriterionResults).sort(), PROVENANCE_RESULT_KEYS)
  assert.equal(result.qualificationEvidenceState, "ALL_DECLARED_CRITERIA_SATISFIED")
})

test("P3-R5 identity is self-reference-free, deterministic, detached, deeply frozen, and object-order neutral", () => {
  const input = makeFixture()
  const result = build(input)
  const { qualificationEvidenceIdentity, ...projection } = result
  assert.equal(qualificationEvidenceIdentity, sha256Canonical(projection))
  assert.equal(build().qualificationEvidenceIdentity, qualificationEvidenceIdentity)
  const declaration = input.qualificationDeclaration
  const reordered = {
    provenanceCriteria: clone(declaration.provenanceCriteria),
    metricCriteria: clone(declaration.metricCriteria),
    qualificationPolicyIdentity: declaration.qualificationPolicyIdentity,
    qualificationId: declaration.qualificationId,
    kind: declaration.kind,
    version: declaration.version,
  } as P3R5QualificationDeclaration
  assert.equal(
    build({ ...input, qualificationDeclaration: reordered }).qualificationEvidenceIdentity,
    qualificationEvidenceIdentity,
  )
  const remembered = result.metricCriterionResults[0]!.metricId
  const mutable = mutableDeclaration(input)
  ;(mutable.metricCriteria as Array<Record<string, unknown>>)[0]!.metricId = "mutated-after-return"
  assert.equal(result.metricCriterionResults[0]!.metricId, remembered)
  assertDeepFrozen(result)
})

test("P3-R5 declaration constants and exact top-level shape are closed and reject serialized predecessor substitution", () => {
  assert.equal(P3_R5_QUALIFICATION_DECLARATION_VERSION, "p3-r5-declared-context-policy-qualification-declaration-v1")
  assert.equal(P3_R5_QUALIFICATION_DECLARATION_KIND, "build_declared_context_policy_qualification_evidence")
  assert.equal(P3_R5_QUALIFICATION_EVIDENCE_VERSION, "p3-r5-declared-context-policy-qualification-evidence-v1")
  assert.equal(P3_R5_QUALIFICATION_EVIDENCE_KIND, "declared_context_policy_qualification_evidence")
  assert.equal(buildDeclaredContextPolicyQualificationEvidence.length, 17)

  const input = makeFixture()
  const extra = mutableDeclaration(input)
  extra.p3R3Evidence = { evidenceIdentity: identity("caller-claimed-r3") }
  assert.throws(() => build({ ...input, qualificationDeclaration: extra as unknown as P3R5QualificationDeclaration }), /unknown field/)
  const extraR4 = mutableDeclaration(input)
  extraR4.p3R4Evidence = { provenanceEvidenceIdentity: identity("caller-claimed-r4") }
  assert.throws(() => build({ ...input, qualificationDeclaration: extraR4 as unknown as P3R5QualificationDeclaration }), /unknown field/)
  const missing = mutableDeclaration(input)
  delete missing.qualificationPolicyIdentity
  assert.throws(() => build({ ...input, qualificationDeclaration: missing as unknown as P3R5QualificationDeclaration }), /missing required field/)
  const future = mutableDeclaration(input)
  future.version = "future-version"
  assert.throws(() => build({ ...input, qualificationDeclaration: future as unknown as P3R5QualificationDeclaration }), /unsupported P3-R5 qualification declaration contract/)
})

test("P3-R5 binds one qualificationId across declaration, canonical P3-R3, and canonical P3-R4", () => {
  const input = makeFixture()
  const r5 = mutableDeclaration(input)
  r5.qualificationId = "qualification:different"
  assert.throws(() => build({ ...input, qualificationDeclaration: r5 as unknown as P3R5QualificationDeclaration }), /qualificationId must match/)

  const r4 = clone(input.provenanceDeclaration)
  r4.qualificationId = "qualification:different-r4"
  assert.throws(() => build({ ...input, provenanceDeclaration: r4 }), /qualificationId must match/)

  const r3 = clone(input.p3Declaration) as P3R3EvidenceDeclaration & { qualificationId: string }
  r3.qualificationId = "qualification:different-r3"
  assert.throws(() => build({ ...input, p3Declaration: r3 }), /qualificationId must match/)
})

test("P3-R5 qualificationPolicyIdentity and qualificationId use exact canonical grammars and bounds", () => {
  const input = makeFixture()
  for (const bad of ["a".repeat(64), `sha256:${"A".repeat(64)}`, "sha256:1234", " sha256:" + "a".repeat(64)]) {
    const declaration = mutableDeclaration(input)
    declaration.qualificationPolicyIdentity = bad
    assert.throws(() => build({ ...input, qualificationDeclaration: declaration as unknown as P3R5QualificationDeclaration }), /lowercase sha256 identity/)
  }
  for (const bad of [" bad ", "bad id", "a".repeat(513)]) {
    const declaration = mutableDeclaration(input)
    declaration.qualificationId = bad
    assert.throws(() => build({ ...input, qualificationDeclaration: declaration as unknown as P3R5QualificationDeclaration }), /canonical NUL-free string|stable-id alphabet|exceeds 512/)
  }
})

test("P3-R5 metric criteria are exactly the seven canonical dimensions with exact metric bindings", () => {
  const input = makeFixture()
  const tooShort = mutableDeclaration(input)
  ;(tooShort.metricCriteria as unknown[]).pop()
  assert.throws(() => build({ ...input, qualificationDeclaration: tooShort as unknown as P3R5QualificationDeclaration }), /must contain exactly 7 entries/)

  const tooLong = mutableDeclaration(input)
  ;(tooLong.metricCriteria as unknown[]).push(clone((tooLong.metricCriteria as unknown[])[0]))
  assert.throws(() => build({ ...input, qualificationDeclaration: tooLong as unknown as P3R5QualificationDeclaration }), /must contain exactly 7 entries/)

  const wrongDimension = mutableDeclaration(input)
  ;(wrongDimension.metricCriteria as Array<Record<string, unknown>>)[0]!.dimension = "precision-at-k"
  assert.throws(() => build({ ...input, qualificationDeclaration: wrongDimension as unknown as P3R5QualificationDeclaration }), /dimension must be recall-at-k/)

  const wrongMetric = mutableDeclaration(input)
  ;(wrongMetric.metricCriteria as Array<Record<string, unknown>>)[0]!.metricId = "b_precision_at_k"
  assert.throws(() => build({ ...input, qualificationDeclaration: wrongMetric as unknown as P3R5QualificationDeclaration }), /does not match canonical P3-R3 dimension binding/)

  const extraKey = mutableDeclaration(input)
  ;(extraKey.metricCriteria as Array<Record<string, unknown>>)[0]!.extra = true
  assert.throws(() => build({ ...input, qualificationDeclaration: extraKey as unknown as P3R5QualificationDeclaration }), /unknown field/)
})

test("P3-R5 allowedRelations is non-empty, strictly sorted, duplicate-free, and excludes insufficient evidence", () => {
  const input = makeFixture()
  const empty = mutableDeclaration(input)
  ;(empty.metricCriteria as Array<Record<string, unknown>>)[0]!.allowedRelations = []
  assert.throws(() => build({ ...input, qualificationDeclaration: empty as unknown as P3R5QualificationDeclaration }), /must be non-empty/)

  const unsorted = mutableDeclaration(input)
  ;(unsorted.metricCriteria as Array<Record<string, unknown>>)[0]!.allowedRelations = [
    "RIGHT_FAVORED_BY_DIRECTION", "LEFT_FAVORED_BY_DIRECTION",
  ]
  assert.throws(() => build({ ...input, qualificationDeclaration: unsorted as unknown as P3R5QualificationDeclaration }), /strictly sorted and duplicate-free/)

  const duplicate = mutableDeclaration(input)
  ;(duplicate.metricCriteria as Array<Record<string, unknown>>)[0]!.allowedRelations = [
    "LEFT_FAVORED_BY_DIRECTION", "LEFT_FAVORED_BY_DIRECTION",
  ]
  assert.throws(() => build({ ...input, qualificationDeclaration: duplicate as unknown as P3R5QualificationDeclaration }), /strictly sorted and duplicate-free/)

  for (const relation of ["INSUFFICIENT_EVIDENCE", "WINNER", "BETTER"]) {
    const invalid = mutableDeclaration(input)
    ;(invalid.metricCriteria as Array<Record<string, unknown>>)[0]!.allowedRelations = [relation]
    assert.throws(() => build({ ...input, qualificationDeclaration: invalid as unknown as P3R5QualificationDeclaration }), /unsupported/)
  }
})

test("P3-R5 copies canonical metric relations literally and applies only caller-declared membership", () => {
  const input = makeFixture()
  const trusted = trustedPredecessors(input).p3R3
  const result = build(input)
  for (const criterion of result.metricCriterionResults) {
    const canonical = trusted.metricRelations.find((metric) => metric.metric_id === criterion.metricId)!
    assert.equal(criterion.observedRelation, canonical.relation)
    assert.equal(criterion.criterionState, "SATISFIED")
  }

  const declaration = mutableDeclaration(input)
  ;(declaration.metricCriteria as Array<Record<string, unknown>>)[0]!.allowedRelations = ["EQUAL_RAW_VALUE"]
  const notSatisfied = build({ ...input, qualificationDeclaration: declaration as unknown as P3R5QualificationDeclaration })
  assert.equal(notSatisfied.metricCriterionResults[0]!.criterionState, "NOT_SATISFIED")
  assert.equal(notSatisfied.qualificationEvidenceState, "ONE_OR_MORE_DECLARED_CRITERIA_NOT_SATISFIED")
})

test("P3-R5 insufficient canonical metric evidence cannot satisfy a criterion and dominates mixed aggregate states", () => {
  const input = makeFixture({
    reportMutation(left) {
      const metric = left.task_family_sections[0]!.cases[0]!.metrics[0]!
      metric.measurement_status = "missing"
      metric.value = null
    },
  })
  const declaration = mutableDeclaration(input)
  ;(declaration.metricCriteria as Array<Record<string, unknown>>)[1]!.allowedRelations = ["EQUAL_RAW_VALUE"]
  const result = build({ ...input, qualificationDeclaration: declaration as unknown as P3R5QualificationDeclaration })
  assert.equal(result.metricCriterionResults[0]!.observedRelation, "INSUFFICIENT_EVIDENCE")
  assert.equal(result.metricCriterionResults[0]!.criterionState, "INSUFFICIENT_EVIDENCE")
  assert.equal(result.metricCriterionResults[1]!.criterionState, "NOT_SATISFIED")
  assert.equal(result.qualificationEvidenceState, "INSUFFICIENT_COMPARABLE_EVIDENCE")
})

test("P3-R5 provenance observations are literal duplicate-free lexical projections with a closed neutral state vocabulary", () => {
  const result = build()
  const provenance = result.provenanceCriterionResults
  assert.deepEqual(provenance.observedCorpusRoles, ["development", "holdout"])
  assert.deepEqual(provenance.observedChronologyStatuses, ["later-in-time"])
  assert.deepEqual(provenance.observedContaminationStatuses, ["none-known", "unknown"])
  assert.equal(provenance.corpusRoleCriterionState, "SATISFIED")
  assert.equal(provenance.chronologyCriterionState, "SATISFIED")
  assert.equal(provenance.contaminationCriterionState, "SATISFIED")
  for (const state of [
    provenance.corpusRoleCriterionState,
    provenance.chronologyCriterionState,
    provenance.contaminationCriterionState,
  ]) {
    assert.ok(state === "SATISFIED" || state === "NOT_SATISFIED")
    assert.notEqual(state, "INSUFFICIENT_EVIDENCE")
  }
})

test("P3-R5 corpus-role criterion is satisfied iff every required literal role occurs", () => {
  const onlyDevelopment = makeFixture({ roleFilter: "development" })
  const result = build(onlyDevelopment)
  assert.deepEqual(result.provenanceCriterionResults.observedCorpusRoles, ["development"])
  assert.equal(result.provenanceCriterionResults.corpusRoleCriterionState, "NOT_SATISFIED")
  assert.equal(result.qualificationEvidenceState, "ONE_OR_MORE_DECLARED_CRITERIA_NOT_SATISFIED")

  const declaration = mutableDeclaration(onlyDevelopment)
  ;(declaration.provenanceCriteria as Record<string, unknown>).requiredCorpusRoles = ["development"]
  const satisfied = build({ ...onlyDevelopment, qualificationDeclaration: declaration as unknown as P3R5QualificationDeclaration })
  assert.equal(satisfied.provenanceCriterionResults.corpusRoleCriterionState, "SATISFIED")
})

test("P3-R5 chronology criterion is literal all-cases membership and never holdout-sufficiency authority", () => {
  const input = makeFixture()
  const declaration = mutableDeclaration(input)
  ;(declaration.provenanceCriteria as Record<string, unknown>).allowedChronologyStatuses = ["chronology-unproven"]
  const result = build({ ...input, qualificationDeclaration: declaration as unknown as P3R5QualificationDeclaration })
  assert.deepEqual(result.provenanceCriterionResults.observedChronologyStatuses, ["later-in-time"])
  assert.equal(result.provenanceCriterionResults.chronologyCriterionState, "NOT_SATISFIED")
  assert.equal(JSON.stringify(result).includes("sufficient-holdout"), false)
  assert.equal(JSON.stringify(result).includes("unbiased"), false)
})

test("P3-R5 contamination criterion is literal all-cases membership and never contamination-free authority", () => {
  const input = makeFixture()
  const declaration = mutableDeclaration(input)
  ;(declaration.provenanceCriteria as Record<string, unknown>).allowedContaminationStatuses = ["none-known"]
  const result = build({ ...input, qualificationDeclaration: declaration as unknown as P3R5QualificationDeclaration })
  assert.deepEqual(result.provenanceCriterionResults.observedContaminationStatuses, ["none-known", "unknown"])
  assert.equal(result.provenanceCriterionResults.contaminationCriterionState, "NOT_SATISFIED")
  assert.equal(JSON.stringify(result).includes("uncontaminated"), false)
  assert.equal(JSON.stringify(result).includes("clean"), false)
})

test("P3-R5 provenance declaration sets are non-empty, strictly sorted, duplicate-free, and closed", () => {
  const input = makeFixture()
  const cases: Array<[string, unknown, RegExp]> = [
    ["requiredCorpusRoles", [], /must be non-empty/],
    ["requiredCorpusRoles", ["holdout", "development"], /strictly sorted/],
    ["requiredCorpusRoles", ["development", "development"], /strictly sorted/],
    ["requiredCorpusRoles", ["training"], /unsupported/],
    ["allowedChronologyStatuses", [], /must be non-empty/],
    ["allowedChronologyStatuses", ["not-later-in-time", "later-in-time"], /strictly sorted/],
    ["allowedChronologyStatuses", ["later-in-time", "later-in-time"], /strictly sorted/],
    ["allowedChronologyStatuses", ["sufficient-holdout"], /unsupported/],
    ["allowedContaminationStatuses", [], /must be non-empty/],
    ["allowedContaminationStatuses", ["unknown", "none-known"], /strictly sorted/],
    ["allowedContaminationStatuses", ["none-known", "none-known"], /strictly sorted/],
    ["allowedContaminationStatuses", ["uncontaminated"], /unsupported/],
  ]
  for (const [field, value, error] of cases) {
    const declaration = mutableDeclaration(input)
    ;(declaration.provenanceCriteria as Record<string, unknown>)[field] = value
    assert.throws(
      () => build({ ...input, qualificationDeclaration: declaration as unknown as P3R5QualificationDeclaration }),
      error,
    )
  }
  const extra = mutableDeclaration(input)
  ;(extra.provenanceCriteria as Record<string, unknown>).verdict = "pass"
  assert.throws(() => build({ ...input, qualificationDeclaration: extra as unknown as P3R5QualificationDeclaration }), /unknown field/)
})

test("P3-R5 aggregate states follow exact total precedence", () => {
  assert.equal(build().qualificationEvidenceState, "ALL_DECLARED_CRITERIA_SATISFIED")

  const input = makeFixture()
  const notSatisfiedDeclaration = mutableDeclaration(input)
  ;(notSatisfiedDeclaration.metricCriteria as Array<Record<string, unknown>>)[0]!.allowedRelations = ["EQUAL_RAW_VALUE"]
  assert.equal(
    build({ ...input, qualificationDeclaration: notSatisfiedDeclaration as unknown as P3R5QualificationDeclaration }).qualificationEvidenceState,
    "ONE_OR_MORE_DECLARED_CRITERIA_NOT_SATISFIED",
  )

  const insufficient = makeFixture({
    reportMutation(left) {
      const metric = left.task_family_sections[0]!.cases[0]!.metrics[0]!
      metric.measurement_status = "missing"
      metric.value = null
    },
  })
  assert.equal(build(insufficient).qualificationEvidenceState, "INSUFFICIENT_COMPARABLE_EVIDENCE")
})

test("P3-R5 evidence identity binds caller criteria and canonical predecessor evidence", () => {
  const input = makeFixture()
  const baseline = build(input)

  const changedPolicy = mutableDeclaration(input)
  changedPolicy.qualificationPolicyIdentity = identity("different-qualification-policy")
  assert.notEqual(
    build({ ...input, qualificationDeclaration: changedPolicy as unknown as P3R5QualificationDeclaration }).qualificationEvidenceIdentity,
    baseline.qualificationEvidenceIdentity,
  )

  const changedCriterion = mutableDeclaration(input)
  ;(changedCriterion.metricCriteria as Array<Record<string, unknown>>)[0]!.allowedRelations = ["LEFT_FAVORED_BY_DIRECTION"]
  assert.notEqual(
    build({ ...input, qualificationDeclaration: changedCriterion as unknown as P3R5QualificationDeclaration }).qualificationEvidenceIdentity,
    baseline.qualificationEvidenceIdentity,
  )

  const changedEvidence = makeFixture({ rightOffset: 80 })
  const changedResult = build(changedEvidence)
  assert.notEqual(changedResult.p3R3EvidenceIdentity, baseline.p3R3EvidenceIdentity)
  assert.notEqual(changedResult.p3R4ProvenanceEvidenceIdentity, baseline.p3R4ProvenanceEvidenceIdentity)
  assert.notEqual(changedResult.qualificationEvidenceIdentity, baseline.qualificationEvidenceIdentity)
})

test("P3-R5 rejects malformed canonical predecessor inputs rather than trusting caller shape", () => {
  const input = makeFixture()
  const staleLeft = clone(input.left)
  staleLeft.report_identity = identity("stale-left")
  assert.throws(() => build({ ...input, left: staleLeft }), /P2-R4 contract violation|report_identity/)

  const badP3 = clone(input.p3Declaration) as unknown as { dimensionMetricBindings: Array<{ metricId: string }> }
  badP3.dimensionMetricBindings[0]!.metricId = "unknown-metric"
  assert.throws(() => build({ ...input, p3Declaration: badP3 } as unknown as Fixture), /P3-R3 contract violation/)

  const badBenchmark = clone(input.p3Declaration) as P3R3EvidenceDeclaration & { benchmarkId: string }
  badBenchmark.benchmarkId = "different-benchmark"
  assert.throws(() => build({ ...input, p3Declaration: badBenchmark }), /P3-R3 contract violation/)

  const badProtocol = clone(input.p3Declaration) as P3R3EvidenceDeclaration & { benchmarkProtocolVersion: string }
  badProtocol.benchmarkProtocolVersion = "different-protocol"
  assert.throws(() => build({ ...input, p3Declaration: badProtocol }), /P3-R3 contract violation/)

  const badFamily = clone(input.p3Declaration) as unknown as Record<string, unknown>
  badFamily.taskFamily = "other-family"
  assert.throws(() => build({ ...input, p3Declaration: badFamily } as unknown as Fixture), /P3-R3 contract violation/)
})

test("P3-R5 snapshots hostile and non-JSON public inputs before semantic reuse", () => {
  const input = makeFixture()
  let invoked = false
  const accessor = mutableDeclaration(input)
  Object.defineProperty(accessor, "version", {
    enumerable: true,
    get() { invoked = true; return P3_R5_QUALIFICATION_DECLARATION_VERSION },
  })
  assert.throws(
    () => build({ ...input, qualificationDeclaration: accessor as unknown as P3R5QualificationDeclaration }),
    /not canonical JSON|P2-R1 contract violation/,
  )
  assert.equal(invoked, false)

  const proxy = new Proxy({}, { get: () => { throw new Error("must-not-run") } })
  assert.throws(
    () => build({ ...input, qualificationDeclaration: proxy as unknown as P3R5QualificationDeclaration }),
    /not canonical JSON|must not be a Proxy/,
  )

  const symbol = mutableDeclaration(input)
  Object.defineProperty(symbol, Symbol("hidden"), { value: true, enumerable: true })
  assert.throws(() => build({ ...input, qualificationDeclaration: symbol as unknown as P3R5QualificationDeclaration }), /symbol fields|not canonical JSON/)

  const nonEnumerable = mutableDeclaration(input)
  Object.defineProperty(nonEnumerable, "hidden", { value: true, enumerable: false })
  assert.throws(() => build({ ...input, qualificationDeclaration: nonEnumerable as unknown as P3R5QualificationDeclaration }), /enumerable data property|not canonical JSON/)

  const nonPlain = Object.assign(Object.create({ inherited: true }), mutableDeclaration(input))
  assert.throws(() => build({ ...input, qualificationDeclaration: nonPlain as P3R5QualificationDeclaration }), /plain object|not canonical JSON/)

  const sparse = mutableDeclaration(input)
  const sparseMetrics = new Array(7)
  sparseMetrics[0] = clone(input.qualificationDeclaration.metricCriteria[0])
  sparse.metricCriteria = sparseMetrics
  assert.throws(() => build({ ...input, qualificationDeclaration: sparse as unknown as P3R5QualificationDeclaration }), /present enumerable data property|not canonical JSON/)

  const extended = mutableDeclaration(input)
  const extendedMetrics = clone(input.qualificationDeclaration.metricCriteria) as unknown as Array<unknown> & { extra?: boolean }
  extendedMetrics.extra = true
  extended.metricCriteria = extendedMetrics
  assert.throws(() => build({ ...input, qualificationDeclaration: extended as unknown as P3R5QualificationDeclaration }), /canonical array index|not canonical JSON/)

  const nonJson = mutableDeclaration(input)
  nonJson.qualificationPolicyIdentity = 1n
  assert.throws(() => build({ ...input, qualificationDeclaration: nonJson as unknown as P3R5QualificationDeclaration }), /non-JSON value|not canonical JSON/)
})

test("P3-R5 set-like order is canonical by contract: valid lexical order is stable and unsorted order fails closed", () => {
  const input = makeFixture()
  const baseline = build(input)
  const copy = clone(input.qualificationDeclaration)
  assert.equal(build({ ...input, qualificationDeclaration: copy }).qualificationEvidenceIdentity, baseline.qualificationEvidenceIdentity)

  const unsorted = mutableDeclaration(input)
  ;(unsorted.provenanceCriteria as Record<string, unknown>).requiredCorpusRoles = ["holdout", "development"]
  assert.throws(() => build({ ...input, qualificationDeclaration: unsorted as unknown as P3R5QualificationDeclaration }), /strictly sorted/)
})

test("P3-R5 emits criterion-match evidence only and contains no recommendation, promotion, significance, or release authority", () => {
  const serialized = JSON.stringify(build())
  for (const forbidden of [
    "winner", "defaultPolicy", "promotion", "promote", "recommendation", "accepted-policy",
    "threshold", "p-value", "significance", "confidence-interval", "blended-score", "weighted-score",
    "sufficient-holdout", "unbiased", "uncontaminated", "production-ready", "public-quality",
    "done-gate", "release-authorized",
  ]) {
    assert.equal(serialized.toLowerCase().includes(forbidden.toLowerCase()), false)
  }
})

test("P3-R5 is a pure local evidence projection with no ambient execution surface in its public output", () => {
  const result = build()
  const serialized = JSON.stringify(result)
  for (const surface of [
    "provider", "modelInvocation", "network", "secret", "subprocess", "shell", "sandbox",
    "filesystem", "database", "telemetry", "analytics", "upload", "training", "fine-tuning",
    "externalTool", "agentLoop",
  ]) {
    assert.equal(serialized.toLowerCase().includes(surface.toLowerCase()), false)
  }
  assertDeepFrozen(result)
})
