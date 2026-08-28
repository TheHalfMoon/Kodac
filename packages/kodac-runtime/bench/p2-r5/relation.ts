import { canonicalize, sha256Canonical } from "../p2-r1/contract.ts"
import {
  P2_R4_COMPARISON_SCHEMA,
  P2_R4_SUBJECT_SCHEMA,
  type P2R4Comparison,
  type P2R4Direction,
  type P2R4MetricComparison,
  type P2R4SubjectDescriptor,
} from "../p2-r4/comparison.ts"
import type {
  P2R3MetricSummary,
  P2R3MissingnessPolicy,
  P2R3Reducer,
  P2R3ValueKind,
} from "../p2-r3/summary.ts"

export const P2_R5_RELATION_SET_SCHEMA = "p2-r5-directional-metric-relation-set/v1"

export type P2R5Relation =
  | "LEFT_FAVORED_BY_DIRECTION"
  | "RIGHT_FAVORED_BY_DIRECTION"
  | "EQUAL_RAW_VALUE"
  | "INSUFFICIENT_EVIDENCE"

export interface P2R5MetricRelation {
  metric_id: string
  input_unit: string
  output_unit: string
  value_kind: P2R3ValueKind
  reducer: P2R3Reducer
  missingness_policy: P2R3MissingnessPolicy
  minimum_observed_count: number
  expected_count: number
  direction: P2R4Direction
  left_summary: P2R3MetricSummary
  right_summary: P2R3MetricSummary
  status: P2R4MetricComparison["status"]
  left_value: number | null
  right_value: number | null
  raw_delta_left_minus_right: number | null
  relation: P2R5Relation
}

export interface P2R5TaskFamilyRelation {
  task_family: string
  metrics: P2R5MetricRelation[]
}

export interface P2R5RelationSet {
  schema_version: string
  benchmark_id: string
  benchmark_protocol_version: string
  r4_comparison_identity: string
  left_subject: P2R4SubjectDescriptor
  right_subject: P2R4SubjectDescriptor
  shared_evaluation_context_identity: string
  comparison_policy_identity: string
  task_family_relations: P2R5TaskFamilyRelation[]
  relation_set_identity: string
}

const R4_COMPARISON_KEYS = [
  "schema_version",
  "benchmark_id",
  "benchmark_protocol_version",
  "left_subject",
  "right_subject",
  "left_r2_report_identity",
  "right_r2_report_identity",
  "left_summary_identity",
  "right_summary_identity",
  "shared_evaluation_context_identity",
  "comparison_policy_identity",
  "task_family_comparisons",
  "comparison_identity",
] as const
const SUBJECT_KEYS = [
  "schema_version",
  "subject_id",
  "system_version_commit_identity",
  "raw_artifact_log_set_identity",
] as const
const TASK_FAMILY_KEYS = ["task_family", "metrics"] as const
const R4_METRIC_KEYS = [
  "metric_id",
  "input_unit",
  "output_unit",
  "value_kind",
  "reducer",
  "missingness_policy",
  "minimum_observed_count",
  "expected_count",
  "direction",
  "left_summary",
  "right_summary",
  "status",
  "left_value",
  "right_value",
  "raw_delta_left_minus_right",
] as const
const SUMMARY_METRIC_KEYS = [
  "metric_id",
  "input_unit",
  "output_unit",
  "value_kind",
  "reducer",
  "missingness_policy",
  "minimum_observed_count",
  "expected_count",
  "observed_count",
  "missing_count",
  "unavailable_count",
  "status",
  "reduced_value",
  "true_count",
  "denominator_count",
] as const
const R5_RELATION_SET_KEYS = [
  "schema_version",
  "benchmark_id",
  "benchmark_protocol_version",
  "r4_comparison_identity",
  "left_subject",
  "right_subject",
  "shared_evaluation_context_identity",
  "comparison_policy_identity",
  "task_family_relations",
  "relation_set_identity",
] as const
const R5_METRIC_KEYS = [...R4_METRIC_KEYS, "relation"] as const

function fail(message: string): never {
  throw new Error(`P2-R5 contract violation: ${message}`)
}

function cloneCanonical<T>(value: unknown, label: string): T {
  try {
    return JSON.parse(canonicalize(value)) as T
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    fail(`${label} is not canonical JSON: ${detail}`)
  }
}

function assertRecord(value: unknown, label: string): asserts value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    fail(`${label} must be an object`)
  }
}

function assertExactKeys(
  value: Record<string, unknown>,
  expected: readonly string[],
  label: string,
): void {
  const actual = Object.keys(value).sort()
  const required = [...expected].sort()
  const unknown = actual.filter((key) => !required.includes(key))
  const missing = required.filter((key) => !actual.includes(key))
  if (unknown.length > 0 || missing.length > 0) {
    fail(`${label} keys are not canonical; unknown=[${unknown.join(",")}] missing=[${missing.join(",")}]`)
  }
}

function assertCanonicalString(value: unknown, label: string): asserts value is string {
  if (typeof value !== "string" || value.length === 0 || value.trim() !== value) {
    fail(`${label} must be a non-empty canonical string`)
  }
}

function assertSha256(value: unknown, label: string): asserts value is string {
  if (typeof value !== "string" || !/^sha256:[0-9a-f]{64}$/.test(value)) {
    fail(`${label} must be a lowercase sha256 identity`)
  }
}

function assertNonNegativeSafeInteger(value: unknown, label: string): asserts value is number {
  if (!Number.isSafeInteger(value) || (value as number) < 0) {
    fail(`${label} must be a non-negative safe integer`)
  }
}

function assertPositiveSafeInteger(value: unknown, label: string): asserts value is number {
  if (!Number.isSafeInteger(value) || (value as number) <= 0) {
    fail(`${label} must be a positive safe integer`)
  }
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function assertStrictlySorted(values: readonly string[], label: string): void {
  for (let index = 1; index < values.length; index += 1) {
    if (compareStrings(values[index - 1]!, values[index]!) >= 0) {
      fail(`${label} must be strictly sorted and duplicate-free`)
    }
  }
}

function validateSubject(input: unknown, label: string): P2R4SubjectDescriptor {
  assertRecord(input, label)
  assertExactKeys(input, SUBJECT_KEYS, label)
  if (input.schema_version !== P2_R4_SUBJECT_SCHEMA) fail(`${label}.schema_version is unsupported`)
  assertCanonicalString(input.subject_id, `${label}.subject_id`)
  assertSha256(input.system_version_commit_identity, `${label}.system_version_commit_identity`)
  assertSha256(input.raw_artifact_log_set_identity, `${label}.raw_artifact_log_set_identity`)
  return {
    schema_version: P2_R4_SUBJECT_SCHEMA,
    subject_id: input.subject_id,
    system_version_commit_identity: input.system_version_commit_identity,
    raw_artifact_log_set_identity: input.raw_artifact_log_set_identity,
  }
}

function validateSummaryMetric(input: unknown, label: string): P2R3MetricSummary {
  assertRecord(input, label)
  assertExactKeys(input, SUMMARY_METRIC_KEYS, label)
  assertCanonicalString(input.metric_id, `${label}.metric_id`)
  assertCanonicalString(input.input_unit, `${label}.input_unit`)
  assertCanonicalString(input.output_unit, `${label}.output_unit`)
  if (input.value_kind !== "NUMBER" && input.value_kind !== "BOOLEAN") {
    fail(`${label}.value_kind is unsupported`)
  }
  if (input.reducer !== "ARITHMETIC_MEAN" && input.reducer !== "BOOLEAN_TRUE_RATE") {
    fail(`${label}.reducer is unsupported`)
  }
  if (
    input.missingness_policy !== "REQUIRE_COMPLETE" &&
    input.missingness_policy !== "OBSERVED_ONLY_WITH_COVERAGE"
  ) {
    fail(`${label}.missingness_policy is unsupported`)
  }
  assertPositiveSafeInteger(input.minimum_observed_count, `${label}.minimum_observed_count`)
  assertPositiveSafeInteger(input.expected_count, `${label}.expected_count`)
  assertNonNegativeSafeInteger(input.observed_count, `${label}.observed_count`)
  assertNonNegativeSafeInteger(input.missing_count, `${label}.missing_count`)
  assertNonNegativeSafeInteger(input.unavailable_count, `${label}.unavailable_count`)
  if (
    (input.observed_count as number) +
      (input.missing_count as number) +
      (input.unavailable_count as number) !==
    input.expected_count
  ) {
    fail(`${label} coverage counts do not reconcile`)
  }
  if ((input.minimum_observed_count as number) > (input.expected_count as number)) {
    fail(`${label}.minimum_observed_count exceeds expected_count`)
  }
  if (
    input.missingness_policy === "REQUIRE_COMPLETE" &&
    input.minimum_observed_count !== input.expected_count
  ) {
    fail(`${label}.minimum_observed_count must equal expected_count under REQUIRE_COMPLETE`)
  }
  const sufficient =
    input.missingness_policy === "REQUIRE_COMPLETE"
      ? input.observed_count === input.expected_count
      : (input.observed_count as number) >= (input.minimum_observed_count as number)
  const expectedStatus = sufficient ? "REDUCED" : "INSUFFICIENT_EVIDENCE"
  if (input.status !== expectedStatus) fail(`${label}.status does not match coverage evidence`)

  if (input.reducer === "ARITHMETIC_MEAN") {
    if (input.value_kind !== "NUMBER") fail(`${label}.ARITHMETIC_MEAN requires NUMBER`)
    if (input.output_unit !== input.input_unit) fail(`${label}.ARITHMETIC_MEAN must preserve unit`)
    if (input.true_count !== null || input.denominator_count !== null) {
      fail(`${label}.ARITHMETIC_MEAN count evidence must be null`)
    }
  } else {
    if (input.value_kind !== "BOOLEAN") fail(`${label}.BOOLEAN_TRUE_RATE requires BOOLEAN`)
    if (input.output_unit !== "ratio_0_1") fail(`${label}.BOOLEAN_TRUE_RATE output unit must be ratio_0_1`)
    assertNonNegativeSafeInteger(input.true_count, `${label}.true_count`)
    assertNonNegativeSafeInteger(input.denominator_count, `${label}.denominator_count`)
    if (input.denominator_count !== input.observed_count) {
      fail(`${label}.denominator_count must equal observed_count`)
    }
    if ((input.true_count as number) > (input.denominator_count as number)) {
      fail(`${label}.true_count exceeds denominator_count`)
    }
  }

  if (input.status === "REDUCED") {
    if (typeof input.reduced_value !== "number" || !Number.isFinite(input.reduced_value)) {
      fail(`${label}.reduced_value must be finite for REDUCED evidence`)
    }
    if (input.reducer === "BOOLEAN_TRUE_RATE") {
      const expectedValue = (input.true_count as number) / (input.denominator_count as number)
      if (input.reduced_value !== expectedValue) {
        fail(`${label}.reduced_value does not match BOOLEAN_TRUE_RATE count evidence`)
      }
    }
  } else if (input.reduced_value !== null) {
    fail(`${label}.reduced_value must be null for INSUFFICIENT_EVIDENCE`)
  }

  return {
    metric_id: input.metric_id,
    input_unit: input.input_unit,
    output_unit: input.output_unit,
    value_kind: input.value_kind,
    reducer: input.reducer,
    missingness_policy: input.missingness_policy,
    minimum_observed_count: input.minimum_observed_count,
    expected_count: input.expected_count,
    observed_count: input.observed_count,
    missing_count: input.missing_count,
    unavailable_count: input.unavailable_count,
    status: input.status,
    reduced_value: input.reduced_value as number | null,
    true_count: input.true_count as number | null,
    denominator_count: input.denominator_count as number | null,
  }
}

function validateR4Metric(input: unknown, label: string): P2R4MetricComparison {
  assertRecord(input, label)
  assertExactKeys(input, R4_METRIC_KEYS, label)
  assertCanonicalString(input.metric_id, `${label}.metric_id`)
  assertCanonicalString(input.input_unit, `${label}.input_unit`)
  assertCanonicalString(input.output_unit, `${label}.output_unit`)
  if (input.value_kind !== "NUMBER" && input.value_kind !== "BOOLEAN") fail(`${label}.value_kind is unsupported`)
  if (input.reducer !== "ARITHMETIC_MEAN" && input.reducer !== "BOOLEAN_TRUE_RATE") fail(`${label}.reducer is unsupported`)
  if (
    input.missingness_policy !== "REQUIRE_COMPLETE" &&
    input.missingness_policy !== "OBSERVED_ONLY_WITH_COVERAGE"
  ) {
    fail(`${label}.missingness_policy is unsupported`)
  }
  assertPositiveSafeInteger(input.minimum_observed_count, `${label}.minimum_observed_count`)
  assertPositiveSafeInteger(input.expected_count, `${label}.expected_count`)
  if (input.direction !== "HIGHER_IS_BETTER" && input.direction !== "LOWER_IS_BETTER") {
    fail(`${label}.direction is unsupported`)
  }
  if (input.status !== "COMPARABLE" && input.status !== "INSUFFICIENT_EVIDENCE") {
    fail(`${label}.status is unsupported`)
  }

  const leftSummary = validateSummaryMetric(input.left_summary, `${label}.left_summary`)
  const rightSummary = validateSummaryMetric(input.right_summary, `${label}.right_summary`)
  const semanticKeys = [
    "metric_id",
    "input_unit",
    "output_unit",
    "value_kind",
    "reducer",
    "missingness_policy",
    "minimum_observed_count",
    "expected_count",
  ] as const
  for (const key of semanticKeys) {
    if (leftSummary[key] !== rightSummary[key]) fail(`${label} left/right summary semantics differ for ${key}`)
    if (input[key] !== leftSummary[key]) fail(`${label}.${key} does not match summary evidence`)
  }

  const expectedComparable = leftSummary.status === "REDUCED" && rightSummary.status === "REDUCED"
  if (input.status !== (expectedComparable ? "COMPARABLE" : "INSUFFICIENT_EVIDENCE")) {
    fail(`${label}.status does not match left/right summary evidence`)
  }

  if (!expectedComparable) {
    if (input.left_value !== null || input.right_value !== null || input.raw_delta_left_minus_right !== null) {
      fail(`${label} insufficient evidence requires null comparison values`)
    }
  } else {
    if (typeof input.left_value !== "number" || !Number.isFinite(input.left_value)) {
      fail(`${label}.left_value must be finite for COMPARABLE evidence`)
    }
    if (typeof input.right_value !== "number" || !Number.isFinite(input.right_value)) {
      fail(`${label}.right_value must be finite for COMPARABLE evidence`)
    }
    if (input.left_value !== leftSummary.reduced_value || input.right_value !== rightSummary.reduced_value) {
      fail(`${label} comparison values do not match summary evidence`)
    }
    const delta = input.left_value - input.right_value
    if (!Number.isFinite(delta)) fail(`${label}.raw_delta_left_minus_right would be non-finite`)
    if (input.raw_delta_left_minus_right !== delta) {
      fail(`${label}.raw_delta_left_minus_right does not match left_value - right_value`)
    }
  }

  return {
    metric_id: input.metric_id,
    input_unit: input.input_unit,
    output_unit: input.output_unit,
    value_kind: input.value_kind,
    reducer: input.reducer,
    missingness_policy: input.missingness_policy,
    minimum_observed_count: input.minimum_observed_count,
    expected_count: input.expected_count,
    direction: input.direction,
    left_summary: leftSummary,
    right_summary: rightSummary,
    status: input.status,
    left_value: input.left_value as number | null,
    right_value: input.right_value as number | null,
    raw_delta_left_minus_right: input.raw_delta_left_minus_right as number | null,
  }
}

function validateR4Comparison(input: unknown): P2R4Comparison {
  const value = cloneCanonical<unknown>(input, "P2-R4 comparison")
  assertRecord(value, "P2-R4 comparison")
  assertExactKeys(value, R4_COMPARISON_KEYS, "P2-R4 comparison")
  if (value.schema_version !== P2_R4_COMPARISON_SCHEMA) fail("P2-R4 comparison.schema_version is unsupported")
  assertCanonicalString(value.benchmark_id, "P2-R4 comparison.benchmark_id")
  assertCanonicalString(value.benchmark_protocol_version, "P2-R4 comparison.benchmark_protocol_version")
  for (const key of [
    "left_r2_report_identity",
    "right_r2_report_identity",
    "left_summary_identity",
    "right_summary_identity",
    "shared_evaluation_context_identity",
    "comparison_policy_identity",
    "comparison_identity",
  ] as const) {
    assertSha256(value[key], `P2-R4 comparison.${key}`)
  }
  const leftSubject = validateSubject(value.left_subject, "P2-R4 comparison.left_subject")
  const rightSubject = validateSubject(value.right_subject, "P2-R4 comparison.right_subject")
  if (leftSubject.subject_id === rightSubject.subject_id) fail("P2-R4 comparison subject_id values must be distinct")
  if (leftSubject.system_version_commit_identity === rightSubject.system_version_commit_identity) {
    fail("P2-R4 comparison system_version_commit_identity values must be distinct")
  }
  if (!Array.isArray(value.task_family_comparisons)) {
    fail("P2-R4 comparison.task_family_comparisons must be an array")
  }
  const taskFamilyComparisons = value.task_family_comparisons.map((entry, familyIndex) => {
    const label = `P2-R4 comparison.task_family_comparisons[${familyIndex}]`
    assertRecord(entry, label)
    assertExactKeys(entry, TASK_FAMILY_KEYS, label)
    assertCanonicalString(entry.task_family, `${label}.task_family`)
    if (!Array.isArray(entry.metrics) || entry.metrics.length === 0) fail(`${label}.metrics must be non-empty`)
    const metrics = entry.metrics.map((metric, metricIndex) =>
      validateR4Metric(metric, `${label}.metrics[${metricIndex}]`),
    )
    assertStrictlySorted(metrics.map((metric) => metric.metric_id), `${label}.metrics`)
    return { task_family: entry.task_family, metrics }
  })
  assertStrictlySorted(
    taskFamilyComparisons.map((entry) => entry.task_family),
    "P2-R4 comparison.task_family_comparisons",
  )

  const identityInput = {
    schema_version: P2_R4_COMPARISON_SCHEMA,
    benchmark_id: value.benchmark_id,
    benchmark_protocol_version: value.benchmark_protocol_version,
    left_subject: leftSubject,
    right_subject: rightSubject,
    left_r2_report_identity: value.left_r2_report_identity,
    right_r2_report_identity: value.right_r2_report_identity,
    left_summary_identity: value.left_summary_identity,
    right_summary_identity: value.right_summary_identity,
    shared_evaluation_context_identity: value.shared_evaluation_context_identity,
    comparison_policy_identity: value.comparison_policy_identity,
    task_family_comparisons: taskFamilyComparisons,
  }
  if (value.comparison_identity !== sha256Canonical(identityInput)) {
    fail("P2-R4 comparison.comparison_identity does not match canonical comparison evidence")
  }
  return { ...identityInput, comparison_identity: value.comparison_identity }
}

function deriveRelation(metric: P2R4MetricComparison): P2R5Relation {
  if (metric.status === "INSUFFICIENT_EVIDENCE") return "INSUFFICIENT_EVIDENCE"
  const left = metric.left_value as number
  const right = metric.right_value as number
  if (left === right) return "EQUAL_RAW_VALUE"
  if (metric.direction === "HIGHER_IS_BETTER") {
    return left > right ? "LEFT_FAVORED_BY_DIRECTION" : "RIGHT_FAVORED_BY_DIRECTION"
  }
  return left < right ? "LEFT_FAVORED_BY_DIRECTION" : "RIGHT_FAVORED_BY_DIRECTION"
}

function relationFromMetric(metric: P2R4MetricComparison): P2R5MetricRelation {
  return { ...metric, relation: deriveRelation(metric) }
}

function deepFreeze<T>(value: T): T {
  if (typeof value !== "object" || value === null || Object.isFrozen(value)) return value
  const record = value as unknown as Record<string, unknown>
  for (const key of Object.keys(record)) deepFreeze(record[key])
  Object.freeze(value)
  return value
}

function buildRelationSet(comparison: P2R4Comparison): P2R5RelationSet {
  const taskFamilyRelations = comparison.task_family_comparisons.map((family) => ({
    task_family: family.task_family,
    metrics: family.metrics.map(relationFromMetric),
  }))
  const identityInput = {
    schema_version: P2_R5_RELATION_SET_SCHEMA,
    benchmark_id: comparison.benchmark_id,
    benchmark_protocol_version: comparison.benchmark_protocol_version,
    r4_comparison_identity: comparison.comparison_identity,
    left_subject: comparison.left_subject,
    right_subject: comparison.right_subject,
    shared_evaluation_context_identity: comparison.shared_evaluation_context_identity,
    comparison_policy_identity: comparison.comparison_policy_identity,
    task_family_relations: taskFamilyRelations,
  }
  return {
    ...identityInput,
    relation_set_identity: sha256Canonical(identityInput),
  }
}

export function relateP2R5(comparisonInput: unknown): P2R5RelationSet {
  return deepFreeze(buildRelationSet(validateR4Comparison(comparisonInput)))
}

export function validateP2R5RelationSet(input: unknown): P2R5RelationSet {
  const value = cloneCanonical<unknown>(input, "P2-R5 relation set")
  assertRecord(value, "P2-R5 relation set")
  assertExactKeys(value, R5_RELATION_SET_KEYS, "P2-R5 relation set")
  if (value.schema_version !== P2_R5_RELATION_SET_SCHEMA) fail("P2-R5 relation set.schema_version is unsupported")
  assertCanonicalString(value.benchmark_id, "P2-R5 relation set.benchmark_id")
  assertCanonicalString(value.benchmark_protocol_version, "P2-R5 relation set.benchmark_protocol_version")
  assertSha256(value.r4_comparison_identity, "P2-R5 relation set.r4_comparison_identity")
  assertSha256(value.shared_evaluation_context_identity, "P2-R5 relation set.shared_evaluation_context_identity")
  assertSha256(value.comparison_policy_identity, "P2-R5 relation set.comparison_policy_identity")
  assertSha256(value.relation_set_identity, "P2-R5 relation set.relation_set_identity")
  const leftSubject = validateSubject(value.left_subject, "P2-R5 relation set.left_subject")
  const rightSubject = validateSubject(value.right_subject, "P2-R5 relation set.right_subject")
  if (leftSubject.subject_id === rightSubject.subject_id) fail("P2-R5 relation set subject_id values must be distinct")
  if (leftSubject.system_version_commit_identity === rightSubject.system_version_commit_identity) {
    fail("P2-R5 relation set system_version_commit_identity values must be distinct")
  }
  if (!Array.isArray(value.task_family_relations)) fail("P2-R5 relation set.task_family_relations must be an array")
  const taskFamilyRelations = value.task_family_relations.map((entry, familyIndex) => {
    const label = `P2-R5 relation set.task_family_relations[${familyIndex}]`
    assertRecord(entry, label)
    assertExactKeys(entry, TASK_FAMILY_KEYS, label)
    assertCanonicalString(entry.task_family, `${label}.task_family`)
    if (!Array.isArray(entry.metrics) || entry.metrics.length === 0) fail(`${label}.metrics must be non-empty`)
    const metrics = entry.metrics.map((metricInput, metricIndex) => {
      const metricLabel = `${label}.metrics[${metricIndex}]`
      assertRecord(metricInput, metricLabel)
      assertExactKeys(metricInput, R5_METRIC_KEYS, metricLabel)
      const r4Input: Record<string, unknown> = {}
      for (const key of R4_METRIC_KEYS) r4Input[key] = metricInput[key]
      const metric = validateR4Metric(r4Input, metricLabel)
      const expectedRelation = deriveRelation(metric)
      if (metricInput.relation !== expectedRelation) fail(`${metricLabel}.relation does not match metric evidence`)
      return { ...metric, relation: expectedRelation }
    })
    assertStrictlySorted(metrics.map((metric) => metric.metric_id), `${label}.metrics`)
    return { task_family: entry.task_family, metrics }
  })
  assertStrictlySorted(
    taskFamilyRelations.map((entry) => entry.task_family),
    "P2-R5 relation set.task_family_relations",
  )
  const identityInput = {
    schema_version: P2_R5_RELATION_SET_SCHEMA,
    benchmark_id: value.benchmark_id,
    benchmark_protocol_version: value.benchmark_protocol_version,
    r4_comparison_identity: value.r4_comparison_identity,
    left_subject: leftSubject,
    right_subject: rightSubject,
    shared_evaluation_context_identity: value.shared_evaluation_context_identity,
    comparison_policy_identity: value.comparison_policy_identity,
    task_family_relations: taskFamilyRelations,
  }
  if (value.relation_set_identity !== sha256Canonical(identityInput)) {
    fail("P2-R5 relation set.relation_set_identity does not match canonical relation evidence")
  }
  return deepFreeze({ ...identityInput, relation_set_identity: value.relation_set_identity })
}
