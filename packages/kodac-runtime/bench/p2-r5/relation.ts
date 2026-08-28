import { canonicalize, sha256Canonical } from "../p2-r1/contract.ts"
import {
  P2_R4_COMPARISON_SCHEMA,
  P2_R4_SUBJECT_SCHEMA,
  type P2R4Comparison,
  type P2R4ComparisonStatus,
  type P2R4Direction,
  type P2R4MetricComparison,
  type P2R4SubjectDescriptor,
} from "../p2-r4/comparison.ts"
import type {
  P2R3MetricSummary,
  P2R3MetricSummaryStatus,
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
  status: P2R4ComparisonStatus
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
const FAMILY_KEYS = ["task_family", "metrics"] as const
const METRIC_KEYS = [
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
const SUMMARY_KEYS = [
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

function fail(message: string): never {
  throw new Error(`P2-R5 contract violation: ${message}`)
}

function cloneCanonical(value: unknown, label: string): unknown {
  try {
    return JSON.parse(canonicalize(value)) as unknown
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    fail(`${label} is not canonical JSON: ${detail}`)
  }
}

function record(value: unknown, label: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    fail(`${label} must be an object`)
  }
  return value as Record<string, unknown>
}

function exactKeys(value: Record<string, unknown>, expected: readonly string[], label: string): void {
  const actual = Object.keys(value).sort()
  const required = [...expected].sort()
  const unknown = actual.filter((key) => !required.includes(key))
  const missing = required.filter((key) => !actual.includes(key))
  if (unknown.length > 0 || missing.length > 0) {
    fail(`${label} keys are not canonical; unknown=[${unknown.join(",")}] missing=[${missing.join(",")}]`)
  }
}

function canonicalString(value: unknown, label: string): string {
  if (typeof value !== "string" || value.length === 0 || value.trim() !== value) {
    fail(`${label} must be a non-empty canonical string`)
  }
  return value
}

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !/^sha256:[0-9a-f]{64}$/.test(value)) {
    fail(`${label} must be a lowercase sha256 identity`)
  }
  return value
}

function positiveInt(value: unknown, label: string): number {
  if (!Number.isSafeInteger(value) || (value as number) < 1) fail(`${label} must be a positive safe integer`)
  return value as number
}

function nonNegativeInt(value: unknown, label: string): number {
  if (!Number.isSafeInteger(value) || (value as number) < 0) fail(`${label} must be a non-negative safe integer`)
  return value as number
}

function valueKind(value: unknown, label: string): P2R3ValueKind {
  if (value !== "NUMBER" && value !== "BOOLEAN") fail(`${label} is unsupported`)
  return value
}

function reducer(value: unknown, label: string): P2R3Reducer {
  if (value !== "ARITHMETIC_MEAN" && value !== "BOOLEAN_TRUE_RATE") fail(`${label} is unsupported`)
  return value
}

function missingness(value: unknown, label: string): P2R3MissingnessPolicy {
  if (value !== "REQUIRE_COMPLETE" && value !== "OBSERVED_ONLY_WITH_COVERAGE") fail(`${label} is unsupported`)
  return value
}

function direction(value: unknown, label: string): P2R4Direction {
  if (value !== "HIGHER_IS_BETTER" && value !== "LOWER_IS_BETTER") fail(`${label} is unsupported`)
  return value
}

function comparisonStatus(value: unknown, label: string): P2R4ComparisonStatus {
  if (value !== "COMPARABLE" && value !== "INSUFFICIENT_EVIDENCE") fail(`${label} is unsupported`)
  return value
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function strictlySorted(values: readonly string[], label: string): void {
  for (let index = 1; index < values.length; index += 1) {
    if (compareStrings(values[index - 1]!, values[index]!) >= 0) {
      fail(`${label} must be strictly sorted and duplicate-free`)
    }
  }
}

function validateSubject(input: unknown, label: string): P2R4SubjectDescriptor {
  const value = record(input, label)
  exactKeys(value, SUBJECT_KEYS, label)
  if (value.schema_version !== P2_R4_SUBJECT_SCHEMA) fail(`${label}.schema_version is unsupported`)
  return {
    schema_version: P2_R4_SUBJECT_SCHEMA,
    subject_id: canonicalString(value.subject_id, `${label}.subject_id`),
    system_version_commit_identity: sha256(value.system_version_commit_identity, `${label}.system_version_commit_identity`),
    raw_artifact_log_set_identity: sha256(value.raw_artifact_log_set_identity, `${label}.raw_artifact_log_set_identity`),
  }
}

function validateSummary(input: unknown, label: string): P2R3MetricSummary {
  const value = record(input, label)
  exactKeys(value, SUMMARY_KEYS, label)

  const metricId = canonicalString(value.metric_id, `${label}.metric_id`)
  const inputUnit = canonicalString(value.input_unit, `${label}.input_unit`)
  const outputUnit = canonicalString(value.output_unit, `${label}.output_unit`)
  const kind = valueKind(value.value_kind, `${label}.value_kind`)
  const reduce = reducer(value.reducer, `${label}.reducer`)
  const missing = missingness(value.missingness_policy, `${label}.missingness_policy`)
  const minimum = positiveInt(value.minimum_observed_count, `${label}.minimum_observed_count`)
  const expected = positiveInt(value.expected_count, `${label}.expected_count`)
  const observed = nonNegativeInt(value.observed_count, `${label}.observed_count`)
  const missingCount = nonNegativeInt(value.missing_count, `${label}.missing_count`)
  const unavailableCount = nonNegativeInt(value.unavailable_count, `${label}.unavailable_count`)

  if (observed + missingCount + unavailableCount !== expected) fail(`${label} coverage counts do not reconcile`)
  if (minimum > expected) fail(`${label}.minimum_observed_count exceeds expected_count`)
  if (missing === "REQUIRE_COMPLETE" && minimum !== expected) {
    fail(`${label}.minimum_observed_count must equal expected_count under REQUIRE_COMPLETE`)
  }

  const sufficient = missing === "REQUIRE_COMPLETE" ? observed === expected : observed >= minimum
  const status: P2R3MetricSummaryStatus = sufficient ? "REDUCED" : "INSUFFICIENT_EVIDENCE"
  if (value.status !== status) fail(`${label}.status does not match coverage evidence`)

  let reducedValue: number | null
  let trueCount: number | null
  let denominatorCount: number | null
  if (reduce === "ARITHMETIC_MEAN") {
    if (kind !== "NUMBER") fail(`${label}.ARITHMETIC_MEAN requires NUMBER`)
    if (outputUnit !== inputUnit) fail(`${label}.ARITHMETIC_MEAN must preserve input unit`)
    if (value.true_count !== null || value.denominator_count !== null) fail(`${label}.ARITHMETIC_MEAN count evidence must be null`)
    trueCount = null
    denominatorCount = null
  } else {
    if (kind !== "BOOLEAN") fail(`${label}.BOOLEAN_TRUE_RATE requires BOOLEAN`)
    if (outputUnit !== "ratio_0_1") fail(`${label}.BOOLEAN_TRUE_RATE output unit must be ratio_0_1`)
    trueCount = nonNegativeInt(value.true_count, `${label}.true_count`)
    denominatorCount = nonNegativeInt(value.denominator_count, `${label}.denominator_count`)
    if (denominatorCount !== observed) fail(`${label}.denominator_count must equal observed_count`)
    if (trueCount > denominatorCount) fail(`${label}.true_count exceeds denominator_count`)
  }

  if (status === "REDUCED") {
    if (typeof value.reduced_value !== "number" || !Number.isFinite(value.reduced_value)) {
      fail(`${label}.reduced_value must be finite for REDUCED evidence`)
    }
    reducedValue = value.reduced_value
    if (reduce === "BOOLEAN_TRUE_RATE") {
      const expectedRate = (trueCount as number) / (denominatorCount as number)
      if (reducedValue !== expectedRate) fail(`${label}.reduced_value does not match BOOLEAN_TRUE_RATE count evidence`)
    }
  } else {
    if (value.reduced_value !== null) fail(`${label}.reduced_value must be null for INSUFFICIENT_EVIDENCE`)
    reducedValue = null
  }

  return {
    metric_id: metricId,
    input_unit: inputUnit,
    output_unit: outputUnit,
    value_kind: kind,
    reducer: reduce,
    missingness_policy: missing,
    minimum_observed_count: minimum,
    expected_count: expected,
    observed_count: observed,
    missing_count: missingCount,
    unavailable_count: unavailableCount,
    status,
    reduced_value: reducedValue,
    true_count: trueCount,
    denominator_count: denominatorCount,
  }
}

function validateMetric(input: unknown, label: string): P2R4MetricComparison {
  const value = record(input, label)
  exactKeys(value, METRIC_KEYS, label)

  const metricId = canonicalString(value.metric_id, `${label}.metric_id`)
  const inputUnit = canonicalString(value.input_unit, `${label}.input_unit`)
  const outputUnit = canonicalString(value.output_unit, `${label}.output_unit`)
  const kind = valueKind(value.value_kind, `${label}.value_kind`)
  const reduce = reducer(value.reducer, `${label}.reducer`)
  const missing = missingness(value.missingness_policy, `${label}.missingness_policy`)
  const minimum = positiveInt(value.minimum_observed_count, `${label}.minimum_observed_count`)
  const expected = positiveInt(value.expected_count, `${label}.expected_count`)
  const metricDirection = direction(value.direction, `${label}.direction`)
  const leftSummary = validateSummary(value.left_summary, `${label}.left_summary`)
  const rightSummary = validateSummary(value.right_summary, `${label}.right_summary`)

  for (const [key, expectedValue] of [
    ["metric_id", metricId],
    ["input_unit", inputUnit],
    ["output_unit", outputUnit],
    ["value_kind", kind],
    ["reducer", reduce],
    ["missingness_policy", missing],
    ["minimum_observed_count", minimum],
    ["expected_count", expected],
  ] as const) {
    if (leftSummary[key] !== expectedValue || rightSummary[key] !== expectedValue) {
      fail(`${label}.${key} does not match left/right summary evidence`)
    }
  }

  const expectedStatus: P2R4ComparisonStatus =
    leftSummary.status === "REDUCED" && rightSummary.status === "REDUCED"
      ? "COMPARABLE"
      : "INSUFFICIENT_EVIDENCE"
  const status = comparisonStatus(value.status, `${label}.status`)
  if (status !== expectedStatus) fail(`${label}.status does not match summary evidence`)

  let leftValue: number | null
  let rightValue: number | null
  let delta: number | null
  if (status === "INSUFFICIENT_EVIDENCE") {
    if (value.left_value !== null || value.right_value !== null || value.raw_delta_left_minus_right !== null) {
      fail(`${label} insufficient evidence requires null pairwise values`)
    }
    leftValue = null
    rightValue = null
    delta = null
  } else {
    if (typeof value.left_value !== "number" || !Number.isFinite(value.left_value)) fail(`${label}.left_value must be finite`)
    if (typeof value.right_value !== "number" || !Number.isFinite(value.right_value)) fail(`${label}.right_value must be finite`)
    leftValue = value.left_value
    rightValue = value.right_value
    if (leftValue !== leftSummary.reduced_value || rightValue !== rightSummary.reduced_value) {
      fail(`${label} pairwise values do not match summary evidence`)
    }
    delta = leftValue - rightValue
    if (!Number.isFinite(delta)) fail(`${label}.raw_delta_left_minus_right would be non-finite`)
    if (value.raw_delta_left_minus_right !== delta) fail(`${label}.raw_delta_left_minus_right does not match left_value - right_value`)
  }

  return {
    metric_id: metricId,
    input_unit: inputUnit,
    output_unit: outputUnit,
    value_kind: kind,
    reducer: reduce,
    missingness_policy: missing,
    minimum_observed_count: minimum,
    expected_count: expected,
    direction: metricDirection,
    left_summary: leftSummary,
    right_summary: rightSummary,
    status,
    left_value: leftValue,
    right_value: rightValue,
    raw_delta_left_minus_right: delta,
  }
}

function validateR4Comparison(input: unknown): P2R4Comparison {
  const cloned = cloneCanonical(input, "P2-R4 comparison")
  const value = record(cloned, "P2-R4 comparison")
  exactKeys(value, R4_COMPARISON_KEYS, "P2-R4 comparison")
  if (value.schema_version !== P2_R4_COMPARISON_SCHEMA) fail("P2-R4 comparison.schema_version is unsupported")

  const benchmarkId = canonicalString(value.benchmark_id, "P2-R4 comparison.benchmark_id")
  const protocolVersion = canonicalString(value.benchmark_protocol_version, "P2-R4 comparison.benchmark_protocol_version")
  const leftSubject = validateSubject(value.left_subject, "P2-R4 comparison.left_subject")
  const rightSubject = validateSubject(value.right_subject, "P2-R4 comparison.right_subject")
  if (leftSubject.subject_id === rightSubject.subject_id) fail("P2-R4 comparison subject_id values must be distinct")
  if (leftSubject.system_version_commit_identity === rightSubject.system_version_commit_identity) {
    fail("P2-R4 comparison system_version_commit_identity values must be distinct")
  }

  const leftR2 = sha256(value.left_r2_report_identity, "P2-R4 comparison.left_r2_report_identity")
  const rightR2 = sha256(value.right_r2_report_identity, "P2-R4 comparison.right_r2_report_identity")
  const leftSummary = sha256(value.left_summary_identity, "P2-R4 comparison.left_summary_identity")
  const rightSummary = sha256(value.right_summary_identity, "P2-R4 comparison.right_summary_identity")
  const contextIdentity = sha256(value.shared_evaluation_context_identity, "P2-R4 comparison.shared_evaluation_context_identity")
  const policyIdentity = sha256(value.comparison_policy_identity, "P2-R4 comparison.comparison_policy_identity")
  const comparisonIdentity = sha256(value.comparison_identity, "P2-R4 comparison.comparison_identity")

  if (!Array.isArray(value.task_family_comparisons)) fail("P2-R4 comparison.task_family_comparisons must be an array")
  const families = value.task_family_comparisons.map((entry, familyIndex) => {
    const label = `P2-R4 comparison.task_family_comparisons[${familyIndex}]`
    const family = record(entry, label)
    exactKeys(family, FAMILY_KEYS, label)
    const taskFamily = canonicalString(family.task_family, `${label}.task_family`)
    if (!Array.isArray(family.metrics) || family.metrics.length === 0) fail(`${label}.metrics must be non-empty`)
    const metrics = family.metrics.map((metric, metricIndex) => validateMetric(metric, `${label}.metrics[${metricIndex}]`))
    strictlySorted(metrics.map((metric) => metric.metric_id), `${label}.metrics`)
    return { task_family: taskFamily, metrics }
  })
  strictlySorted(families.map((family) => family.task_family), "P2-R4 comparison.task_family_comparisons")

  const identityInput: Omit<P2R4Comparison, "comparison_identity"> = {
    schema_version: P2_R4_COMPARISON_SCHEMA,
    benchmark_id: benchmarkId,
    benchmark_protocol_version: protocolVersion,
    left_subject: leftSubject,
    right_subject: rightSubject,
    left_r2_report_identity: leftR2,
    right_r2_report_identity: rightR2,
    left_summary_identity: leftSummary,
    right_summary_identity: rightSummary,
    shared_evaluation_context_identity: contextIdentity,
    comparison_policy_identity: policyIdentity,
    task_family_comparisons: families,
  }
  if (comparisonIdentity !== sha256Canonical(identityInput)) {
    fail("P2-R4 comparison.comparison_identity does not match canonical comparison evidence")
  }
  return { ...identityInput, comparison_identity: comparisonIdentity }
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

function relationMetric(metric: P2R4MetricComparison): P2R5MetricRelation {
  return { ...metric, relation: deriveRelation(metric) }
}

function deepFreeze<T>(value: T): T {
  if (typeof value !== "object" || value === null || Object.isFrozen(value)) return value
  for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child)
  Object.freeze(value)
  return value
}

export function deriveP2R5Relations(comparisonInput: unknown): P2R5RelationSet {
  const comparison = validateR4Comparison(comparisonInput)
  const taskFamilyRelations = comparison.task_family_comparisons.map((family) => ({
    task_family: family.task_family,
    metrics: family.metrics.map(relationMetric),
  }))
  const identityInput: Omit<P2R5RelationSet, "relation_set_identity"> = {
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
  return deepFreeze({ ...identityInput, relation_set_identity: sha256Canonical(identityInput) })
}
