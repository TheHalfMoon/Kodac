import { canonicalize, sha256Canonical } from "../p2-r1/contract.ts"
import {
  P2_R2_REPORT_SCHEMA,
  type P2R2MeasurementStatus,
  type P2R2MeasurementValue,
  type P2R2Report,
  type P2R2ReportCase,
  type P2R2ReportMetric,
  type P2R2TaskFamilySection,
} from "../p2-r2/runner.ts"
import {
  P2_R3_SUMMARY_SCHEMA,
  type P2R3MetricSummary,
  type P2R3MetricSummaryStatus,
  type P2R3MissingnessPolicy,
  type P2R3Reducer,
  type P2R3Summary,
  type P2R3TaskFamilySummary,
  type P2R3ValueKind,
} from "../p2-r3/summary.ts"

export const P2_R4_SHARED_EVALUATION_CONTEXT_SCHEMA = "p2-r4-shared-evaluation-context/v1"
export const P2_R4_SUBJECT_SCHEMA = "p2-r4-subject/v1"
export const P2_R4_METRIC_DIRECTION_SCHEMA = "p2-r4-metric-direction/v1"
export const P2_R4_POLICY_SCHEMA = "p2-r4-comparison-policy/v1"
export const P2_R4_COMPARISON_SCHEMA = "p2-r4-comparison/v1"

export type P2R4Direction = "HIGHER_IS_BETTER" | "LOWER_IS_BETTER"
export type P2R4ComparisonStatus = "COMPARABLE" | "INSUFFICIENT_EVIDENCE"

export interface P2R4SharedEvaluationContext {
  schema_version: string
  model_provider_version_identity: string
  configuration_identity: string
  repository_task_snapshot_identity: string
  hardware_execution_environment_identity: string
  network_assumptions_identity: string
  time_token_cost_budget_identity: string
  attempt_policy_identity: string
  allowed_tools_identity: string
  prompt_instruction_policy_identity: string
  scoring_method_identity: string
}

export interface P2R4SubjectDescriptor {
  schema_version: string
  subject_id: string
  system_version_commit_identity: string
  raw_artifact_log_set_identity: string
}

export interface P2R4MetricDirection {
  schema_version: string
  task_family: string
  metric_id: string
  input_unit: string
  output_unit: string
  value_kind: P2R3ValueKind
  reducer: P2R3Reducer
  missingness_policy: P2R3MissingnessPolicy
  minimum_observed_count: number
  direction: P2R4Direction
}

export interface P2R4ComparisonPolicy {
  schema_version: string
  benchmark_id: string
  benchmark_protocol_version: string
  left_summary_identity: string
  right_summary_identity: string
  shared_evaluation_context_identity: string
  metric_directions: P2R4MetricDirection[]
}

export interface P2R4MetricComparison {
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
}

export interface P2R4TaskFamilyComparison {
  task_family: string
  metrics: P2R4MetricComparison[]
}

export interface P2R4Comparison {
  schema_version: string
  benchmark_id: string
  benchmark_protocol_version: string
  left_subject: P2R4SubjectDescriptor
  right_subject: P2R4SubjectDescriptor
  left_r2_report_identity: string
  right_r2_report_identity: string
  left_summary_identity: string
  right_summary_identity: string
  shared_evaluation_context_identity: string
  comparison_policy_identity: string
  task_family_comparisons: P2R4TaskFamilyComparison[]
  comparison_identity: string
}

const REPORT_KEYS = [
  "schema_version",
  "benchmark_id",
  "benchmark_protocol_version",
  "r1_manifest_set_digest",
  "observation_set_digest",
  "case_count",
  "observation_count",
  "missing_observation_count",
  "task_family_sections",
  "report_identity",
] as const
const REPORT_SECTION_KEYS = ["task_family", "cases"] as const
const REPORT_CASE_KEYS = ["case_id", "r1_result_identity", "metrics"] as const
const REPORT_METRIC_KEYS = ["metric_id", "unit", "measurement_status", "value"] as const
const SUMMARY_KEYS = [
  "schema_version",
  "benchmark_id",
  "benchmark_protocol_version",
  "r2_report_identity",
  "policy_identity",
  "task_family_summaries",
  "summary_identity",
] as const
const SUMMARY_SECTION_KEYS = ["task_family", "metrics"] as const
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
const CONTEXT_KEYS = [
  "schema_version",
  "model_provider_version_identity",
  "configuration_identity",
  "repository_task_snapshot_identity",
  "hardware_execution_environment_identity",
  "network_assumptions_identity",
  "time_token_cost_budget_identity",
  "attempt_policy_identity",
  "allowed_tools_identity",
  "prompt_instruction_policy_identity",
  "scoring_method_identity",
] as const
const SUBJECT_KEYS = [
  "schema_version",
  "subject_id",
  "system_version_commit_identity",
  "raw_artifact_log_set_identity",
] as const
const POLICY_KEYS = [
  "schema_version",
  "benchmark_id",
  "benchmark_protocol_version",
  "left_summary_identity",
  "right_summary_identity",
  "shared_evaluation_context_identity",
  "metric_directions",
] as const
const DIRECTION_KEYS = [
  "schema_version",
  "task_family",
  "metric_id",
  "input_unit",
  "output_unit",
  "value_kind",
  "reducer",
  "missingness_policy",
  "minimum_observed_count",
  "direction",
] as const

interface ValidatedContext {
  document: P2R4SharedEvaluationContext
  identity: string
}

interface ValidatedPolicy {
  document: P2R4ComparisonPolicy
  identity: string
}

function fail(message: string): never {
  throw new Error(`P2-R4 contract violation: ${message}`)
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
    fail(
      `${label} keys are not canonical; unknown=[${unknown.join(",")}] missing=[${missing.join(",")}]`,
    )
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
  if (!Number.isSafeInteger(value) || (value as number) < 1) {
    fail(`${label} must be a positive safe integer`)
  }
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function assertStrictlySorted(values: readonly string[], label: string): void {
  for (let index = 1; index < values.length; index += 1) {
    const previous = values[index - 1]
    const current = values[index]
    if (previous === undefined || current === undefined || compareStrings(previous, current) >= 0) {
      fail(`${label} must be strictly sorted by canonical string`)
    }
  }
}

function validateMeasurement(
  status: unknown,
  value: unknown,
  label: string,
): { status: P2R2MeasurementStatus; value: P2R2MeasurementValue } {
  if (status !== "observed" && status !== "missing" && status !== "unavailable") {
    fail(`${label}.measurement_status is unsupported`)
  }
  if (status === "observed") {
    if (typeof value === "number") {
      if (!Number.isFinite(value)) fail(`${label}.value must be finite when numeric`)
      return { status, value }
    }
    if (typeof value === "boolean") return { status, value }
    fail(`${label}.value must be a boolean or finite number when observed`)
  }
  if (value !== null) fail(`${label}.value must be null when measurement_status is ${status}`)
  return { status, value: null }
}

function validateReportMetric(value: unknown, label: string): P2R2ReportMetric {
  assertRecord(value, label)
  assertExactKeys(value, REPORT_METRIC_KEYS, label)
  assertCanonicalString(value.metric_id, `${label}.metric_id`)
  assertCanonicalString(value.unit, `${label}.unit`)
  const measurement = validateMeasurement(value.measurement_status, value.value, label)
  return {
    metric_id: value.metric_id,
    unit: value.unit,
    measurement_status: measurement.status,
    value: measurement.value,
  }
}

function validateReportCase(value: unknown, label: string): P2R2ReportCase {
  assertRecord(value, label)
  assertExactKeys(value, REPORT_CASE_KEYS, label)
  assertCanonicalString(value.case_id, `${label}.case_id`)
  assertSha256(value.r1_result_identity, `${label}.r1_result_identity`)
  if (!Array.isArray(value.metrics) || value.metrics.length === 0) {
    fail(`${label}.metrics must be a non-empty array`)
  }
  const metrics = value.metrics.map((entry, index) =>
    validateReportMetric(entry, `${label}.metrics[${index}]`),
  )
  assertStrictlySorted(
    metrics.map((metric) => metric.metric_id),
    `${label}.metrics`,
  )
  return { case_id: value.case_id, r1_result_identity: value.r1_result_identity, metrics }
}

function validateReportSection(value: unknown, label: string): P2R2TaskFamilySection {
  assertRecord(value, label)
  assertExactKeys(value, REPORT_SECTION_KEYS, label)
  assertCanonicalString(value.task_family, `${label}.task_family`)
  if (!Array.isArray(value.cases) || value.cases.length === 0) {
    fail(`${label}.cases must be a non-empty array`)
  }
  const cases = value.cases.map((entry, index) =>
    validateReportCase(entry, `${label}.cases[${index}]`),
  )
  assertStrictlySorted(
    cases.map((entry) => entry.case_id),
    `${label}.cases`,
  )
  return { task_family: value.task_family, cases }
}

function validateReport(input: unknown, label: string): P2R2Report {
  const value = cloneCanonical<unknown>(input, label)
  assertRecord(value, label)
  assertExactKeys(value, REPORT_KEYS, label)
  if (value.schema_version !== P2_R2_REPORT_SCHEMA) fail(`${label}.schema_version is unsupported`)
  assertCanonicalString(value.benchmark_id, `${label}.benchmark_id`)
  assertCanonicalString(value.benchmark_protocol_version, `${label}.benchmark_protocol_version`)
  assertSha256(value.r1_manifest_set_digest, `${label}.r1_manifest_set_digest`)
  assertSha256(value.observation_set_digest, `${label}.observation_set_digest`)
  assertNonNegativeSafeInteger(value.case_count, `${label}.case_count`)
  assertNonNegativeSafeInteger(value.observation_count, `${label}.observation_count`)
  assertNonNegativeSafeInteger(value.missing_observation_count, `${label}.missing_observation_count`)
  assertSha256(value.report_identity, `${label}.report_identity`)
  if (!Array.isArray(value.task_family_sections) || value.task_family_sections.length === 0) {
    fail(`${label}.task_family_sections must be a non-empty array`)
  }

  const sections = value.task_family_sections.map((entry, index) =>
    validateReportSection(entry, `${label}.task_family_sections[${index}]`),
  )
  assertStrictlySorted(
    sections.map((section) => section.task_family),
    `${label}.task_family_sections`,
  )

  const caseIds = new Set<string>()
  const slots = new Set<string>()
  let caseCount = 0
  let observedCount = 0
  let nonObservedCount = 0
  for (const section of sections) {
    for (const reportCase of section.cases) {
      caseCount += 1
      if (caseIds.has(reportCase.case_id)) fail(`${label} contains duplicate case_id=${reportCase.case_id}`)
      caseIds.add(reportCase.case_id)
      for (const metric of reportCase.metrics) {
        const key = JSON.stringify([section.task_family, reportCase.case_id, metric.metric_id])
        if (slots.has(key)) fail(`${label} contains duplicate case/metric slot ${key}`)
        slots.add(key)
        if (metric.measurement_status === "observed") observedCount += 1
        else nonObservedCount += 1
      }
    }
  }
  if (value.case_count !== caseCount) fail(`${label}.case_count does not match materialized cases`)
  if (value.observation_count !== observedCount) {
    fail(`${label}.observation_count does not match materialized observed slots`)
  }
  if (value.missing_observation_count !== nonObservedCount) {
    fail(`${label}.missing_observation_count does not match materialized non-observed slots`)
  }

  const identityInput = {
    schema_version: P2_R2_REPORT_SCHEMA,
    benchmark_id: value.benchmark_id,
    benchmark_protocol_version: value.benchmark_protocol_version,
    r1_manifest_set_digest: value.r1_manifest_set_digest,
    observation_set_digest: value.observation_set_digest,
    case_count: value.case_count,
    observation_count: value.observation_count,
    missing_observation_count: value.missing_observation_count,
    task_family_sections: sections,
  }
  if (value.report_identity !== sha256Canonical(identityInput)) {
    fail(`${label}.report_identity does not match canonical report evidence`)
  }
  return { ...identityInput, report_identity: value.report_identity }
}

function reportSlots(
  report: P2R2Report,
  taskFamily: string,
  metricId: string,
): P2R2ReportMetric[] {
  const section = report.task_family_sections.find((entry) => entry.task_family === taskFamily)
  if (section === undefined) fail(`summary task_family is not present in report: ${taskFamily}`)
  const slots = section.cases.flatMap((reportCase) =>
    reportCase.metrics.filter((metric) => metric.metric_id === metricId),
  )
  if (slots.length === 0) fail(`summary metric_id is not present in report: ${taskFamily}/${metricId}`)
  return slots
}

function arithmeticMean(values: readonly number[]): number {
  if (values.length === 0) fail("ARITHMETIC_MEAN cannot reduce zero observed values")
  let mean = 0
  for (const value of values) {
    mean += value / values.length
    if (!Number.isFinite(mean)) fail("ARITHMETIC_MEAN produced a non-finite result")
  }
  return mean
}

function validateSummaryMetric(
  value: unknown,
  label: string,
  report: P2R2Report,
  taskFamily: string,
): P2R3MetricSummary {
  assertRecord(value, label)
  assertExactKeys(value, SUMMARY_METRIC_KEYS, label)
  assertCanonicalString(value.metric_id, `${label}.metric_id`)
  assertCanonicalString(value.input_unit, `${label}.input_unit`)
  assertCanonicalString(value.output_unit, `${label}.output_unit`)
  if (value.value_kind !== "NUMBER" && value.value_kind !== "BOOLEAN") {
    fail(`${label}.value_kind is unsupported`)
  }
  if (value.reducer !== "ARITHMETIC_MEAN" && value.reducer !== "BOOLEAN_TRUE_RATE") {
    fail(`${label}.reducer is unsupported`)
  }
  if (
    value.missingness_policy !== "REQUIRE_COMPLETE" &&
    value.missingness_policy !== "OBSERVED_ONLY_WITH_COVERAGE"
  ) {
    fail(`${label}.missingness_policy is unsupported`)
  }
  assertPositiveSafeInteger(value.minimum_observed_count, `${label}.minimum_observed_count`)
  assertNonNegativeSafeInteger(value.expected_count, `${label}.expected_count`)
  assertNonNegativeSafeInteger(value.observed_count, `${label}.observed_count`)
  assertNonNegativeSafeInteger(value.missing_count, `${label}.missing_count`)
  assertNonNegativeSafeInteger(value.unavailable_count, `${label}.unavailable_count`)
  if (value.status !== "REDUCED" && value.status !== "INSUFFICIENT_EVIDENCE") {
    fail(`${label}.status is unsupported`)
  }
  if (value.reduced_value !== null && (typeof value.reduced_value !== "number" || !Number.isFinite(value.reduced_value))) {
    fail(`${label}.reduced_value must be null or finite number`)
  }
  if (value.true_count !== null) assertNonNegativeSafeInteger(value.true_count, `${label}.true_count`)
  if (value.denominator_count !== null) {
    assertNonNegativeSafeInteger(value.denominator_count, `${label}.denominator_count`)
  }

  const slots = reportSlots(report, taskFamily, value.metric_id)
  const expectedCount = slots.length
  let observedCount = 0
  let missingCount = 0
  let unavailableCount = 0
  const numericValues: number[] = []
  const booleanValues: boolean[] = []
  for (const slot of slots) {
    if (slot.unit !== value.input_unit) fail(`${label}.input_unit does not match report slot unit`)
    if (slot.measurement_status === "missing") {
      missingCount += 1
      continue
    }
    if (slot.measurement_status === "unavailable") {
      unavailableCount += 1
      continue
    }
    observedCount += 1
    if (value.value_kind === "NUMBER") {
      if (typeof slot.value !== "number" || !Number.isFinite(slot.value)) {
        fail(`${label}.value_kind NUMBER does not match observed report slot`)
      }
      numericValues.push(slot.value)
    } else {
      if (typeof slot.value !== "boolean") {
        fail(`${label}.value_kind BOOLEAN does not match observed report slot`)
      }
      booleanValues.push(slot.value)
    }
  }

  if (value.expected_count !== expectedCount) fail(`${label}.expected_count does not match report topology`)
  if (value.observed_count !== observedCount) fail(`${label}.observed_count does not match report evidence`)
  if (value.missing_count !== missingCount) fail(`${label}.missing_count does not match report evidence`)
  if (value.unavailable_count !== unavailableCount) {
    fail(`${label}.unavailable_count does not match report evidence`)
  }
  if (expectedCount !== observedCount + missingCount + unavailableCount) {
    fail(`${label} coverage counts do not reconcile`)
  }
  if (value.minimum_observed_count > expectedCount) {
    fail(`${label}.minimum_observed_count exceeds expected_count`)
  }
  if (
    value.missingness_policy === "REQUIRE_COMPLETE" &&
    value.minimum_observed_count !== expectedCount
  ) {
    fail(`${label}.minimum_observed_count must equal expected_count under REQUIRE_COMPLETE`)
  }
  if (
    (value.reducer === "ARITHMETIC_MEAN" && value.value_kind !== "NUMBER") ||
    (value.reducer === "BOOLEAN_TRUE_RATE" && value.value_kind !== "BOOLEAN")
  ) {
    fail(`${label}.reducer is incompatible with value_kind`)
  }

  const sufficient =
    value.missingness_policy === "REQUIRE_COMPLETE"
      ? observedCount === expectedCount
      : observedCount >= value.minimum_observed_count
  const expectedStatus: P2R3MetricSummaryStatus = sufficient ? "REDUCED" : "INSUFFICIENT_EVIDENCE"
  if (value.status !== expectedStatus) fail(`${label}.status does not match coverage policy`)

  if (value.reducer === "ARITHMETIC_MEAN") {
    if (value.output_unit !== value.input_unit) fail(`${label}.output_unit must preserve input unit`)
    if (value.true_count !== null || value.denominator_count !== null) {
      fail(`${label}.ARITHMETIC_MEAN count evidence must be null`)
    }
    const expectedValue = sufficient ? arithmeticMean(numericValues) : null
    if (value.reduced_value !== expectedValue) fail(`${label}.reduced_value does not match ARITHMETIC_MEAN`)
  } else {
    if (value.output_unit !== "ratio_0_1") fail(`${label}.output_unit must be ratio_0_1`)
    const trueCount = booleanValues.reduce((count, entry) => count + (entry ? 1 : 0), 0)
    if (value.true_count !== trueCount) fail(`${label}.true_count does not match observed boolean evidence`)
    if (value.denominator_count !== observedCount) {
      fail(`${label}.denominator_count does not match observed_count`)
    }
    const expectedValue = sufficient ? trueCount / observedCount : null
    if (value.reduced_value !== expectedValue) fail(`${label}.reduced_value does not match BOOLEAN_TRUE_RATE`)
  }

  return {
    metric_id: value.metric_id,
    input_unit: value.input_unit,
    output_unit: value.output_unit,
    value_kind: value.value_kind,
    reducer: value.reducer,
    missingness_policy: value.missingness_policy,
    minimum_observed_count: value.minimum_observed_count,
    expected_count: value.expected_count,
    observed_count: value.observed_count,
    missing_count: value.missing_count,
    unavailable_count: value.unavailable_count,
    status: value.status,
    reduced_value: value.reduced_value,
    true_count: value.true_count,
    denominator_count: value.denominator_count,
  }
}

function validateSummarySection(
  value: unknown,
  label: string,
  report: P2R2Report,
): P2R3TaskFamilySummary {
  assertRecord(value, label)
  assertExactKeys(value, SUMMARY_SECTION_KEYS, label)
  assertCanonicalString(value.task_family, `${label}.task_family`)
  const taskFamily = value.task_family as string
  if (!Array.isArray(value.metrics) || value.metrics.length === 0) {
    fail(`${label}.metrics must be a non-empty array`)
  }
  const metrics = value.metrics.map((entry, index) =>
    validateSummaryMetric(entry, `${label}.metrics[${index}]`, report, taskFamily),
  )
  assertStrictlySorted(
    metrics.map((metric) => metric.metric_id),
    `${label}.metrics`,
  )
  return { task_family: taskFamily, metrics }
}

function validateSummary(input: unknown, label: string, report: P2R2Report): P2R3Summary {
  const value = cloneCanonical<unknown>(input, label)
  assertRecord(value, label)
  assertExactKeys(value, SUMMARY_KEYS, label)
  if (value.schema_version !== P2_R3_SUMMARY_SCHEMA) fail(`${label}.schema_version is unsupported`)
  assertCanonicalString(value.benchmark_id, `${label}.benchmark_id`)
  assertCanonicalString(value.benchmark_protocol_version, `${label}.benchmark_protocol_version`)
  assertSha256(value.r2_report_identity, `${label}.r2_report_identity`)
  assertSha256(value.policy_identity, `${label}.policy_identity`)
  assertSha256(value.summary_identity, `${label}.summary_identity`)
  if (value.benchmark_id !== report.benchmark_id) fail(`${label}.benchmark_id does not match report`)
  if (value.benchmark_protocol_version !== report.benchmark_protocol_version) {
    fail(`${label}.benchmark_protocol_version does not match report`)
  }
  if (value.r2_report_identity !== report.report_identity) {
    fail(`${label}.r2_report_identity does not match report_identity`)
  }
  if (!Array.isArray(value.task_family_summaries)) {
    fail(`${label}.task_family_summaries must be an array`)
  }
  const sections = value.task_family_summaries.map((entry, index) =>
    validateSummarySection(entry, `${label}.task_family_summaries[${index}]`, report),
  )
  assertStrictlySorted(
    sections.map((section) => section.task_family),
    `${label}.task_family_summaries`,
  )
  const identityInput = {
    schema_version: P2_R3_SUMMARY_SCHEMA,
    benchmark_id: value.benchmark_id,
    benchmark_protocol_version: value.benchmark_protocol_version,
    r2_report_identity: value.r2_report_identity,
    policy_identity: value.policy_identity,
    task_family_summaries: sections,
  }
  if (value.summary_identity !== sha256Canonical(identityInput)) {
    fail(`${label}.summary_identity does not match canonical summary evidence`)
  }
  return { ...identityInput, summary_identity: value.summary_identity }
}

function assertSameTaskTopology(left: P2R2Report, right: P2R2Report): void {
  const leftTopology = {
    benchmark_id: left.benchmark_id,
    benchmark_protocol_version: left.benchmark_protocol_version,
    r1_manifest_set_digest: left.r1_manifest_set_digest,
    case_count: left.case_count,
    task_family_sections: left.task_family_sections.map((section) => ({
      task_family: section.task_family,
      cases: section.cases.map((reportCase) => ({
        case_id: reportCase.case_id,
        r1_result_identity: reportCase.r1_result_identity,
        metrics: reportCase.metrics.map((metric) => ({ metric_id: metric.metric_id, unit: metric.unit })),
      })),
    })),
  }
  const rightTopology = {
    benchmark_id: right.benchmark_id,
    benchmark_protocol_version: right.benchmark_protocol_version,
    r1_manifest_set_digest: right.r1_manifest_set_digest,
    case_count: right.case_count,
    task_family_sections: right.task_family_sections.map((section) => ({
      task_family: section.task_family,
      cases: section.cases.map((reportCase) => ({
        case_id: reportCase.case_id,
        r1_result_identity: reportCase.r1_result_identity,
        metrics: reportCase.metrics.map((metric) => ({ metric_id: metric.metric_id, unit: metric.unit })),
      })),
    })),
  }
  if (canonicalize(leftTopology) !== canonicalize(rightTopology)) {
    fail("left/right reports do not have identical benchmark/manifest/task topology")
  }
}

function validateContext(input: unknown): ValidatedContext {
  const value = cloneCanonical<unknown>(input, "shared evaluation context")
  assertRecord(value, "shared evaluation context")
  assertExactKeys(value, CONTEXT_KEYS, "shared evaluation context")
  if (value.schema_version !== P2_R4_SHARED_EVALUATION_CONTEXT_SCHEMA) {
    fail("shared evaluation context.schema_version is unsupported")
  }
  for (const key of CONTEXT_KEYS.slice(1)) {
    assertSha256(value[key], `shared evaluation context.${key}`)
  }
  const document: P2R4SharedEvaluationContext = {
    schema_version: P2_R4_SHARED_EVALUATION_CONTEXT_SCHEMA,
    model_provider_version_identity: value.model_provider_version_identity as string,
    configuration_identity: value.configuration_identity as string,
    repository_task_snapshot_identity: value.repository_task_snapshot_identity as string,
    hardware_execution_environment_identity: value.hardware_execution_environment_identity as string,
    network_assumptions_identity: value.network_assumptions_identity as string,
    time_token_cost_budget_identity: value.time_token_cost_budget_identity as string,
    attempt_policy_identity: value.attempt_policy_identity as string,
    allowed_tools_identity: value.allowed_tools_identity as string,
    prompt_instruction_policy_identity: value.prompt_instruction_policy_identity as string,
    scoring_method_identity: value.scoring_method_identity as string,
  }
  return { document, identity: sha256Canonical(document) }
}

function validateSubject(input: unknown, label: string): P2R4SubjectDescriptor {
  const value = cloneCanonical<unknown>(input, label)
  assertRecord(value, label)
  assertExactKeys(value, SUBJECT_KEYS, label)
  if (value.schema_version !== P2_R4_SUBJECT_SCHEMA) fail(`${label}.schema_version is unsupported`)
  assertCanonicalString(value.subject_id, `${label}.subject_id`)
  assertSha256(value.system_version_commit_identity, `${label}.system_version_commit_identity`)
  assertSha256(value.raw_artifact_log_set_identity, `${label}.raw_artifact_log_set_identity`)
  return {
    schema_version: P2_R4_SUBJECT_SCHEMA,
    subject_id: value.subject_id,
    system_version_commit_identity: value.system_version_commit_identity,
    raw_artifact_log_set_identity: value.raw_artifact_log_set_identity,
  }
}

function findSummaryMetric(
  summary: P2R3Summary,
  taskFamily: string,
  metricId: string,
): P2R3MetricSummary {
  const section = summary.task_family_summaries.find((entry) => entry.task_family === taskFamily)
  const metric = section?.metrics.find((entry) => entry.metric_id === metricId)
  if (metric === undefined) fail(`direction policy metric is not present in summary: ${taskFamily}/${metricId}`)
  return metric
}

function validateDirection(
  input: unknown,
  index: number,
  left: P2R3Summary,
  right: P2R3Summary,
): P2R4MetricDirection {
  const label = `comparison policy.metric_directions[${index}]`
  assertRecord(input, label)
  assertExactKeys(input, DIRECTION_KEYS, label)
  if (input.schema_version !== P2_R4_METRIC_DIRECTION_SCHEMA) {
    fail(`${label}.schema_version is unsupported`)
  }
  assertCanonicalString(input.task_family, `${label}.task_family`)
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
  if (input.direction !== "HIGHER_IS_BETTER" && input.direction !== "LOWER_IS_BETTER") {
    fail(`${label}.direction is unsupported`)
  }

  const leftMetric = findSummaryMetric(left, input.task_family, input.metric_id)
  const rightMetric = findSummaryMetric(right, input.task_family, input.metric_id)
  const semanticKeys = [
    "input_unit",
    "output_unit",
    "value_kind",
    "reducer",
    "missingness_policy",
    "minimum_observed_count",
    "expected_count",
  ] as const
  for (const key of semanticKeys) {
    if (leftMetric[key] !== rightMetric[key]) {
      fail(`${label} left/right summary semantics differ for ${key}`)
    }
  }
  const policyKeys = [
    "input_unit",
    "output_unit",
    "value_kind",
    "reducer",
    "missingness_policy",
    "minimum_observed_count",
  ] as const
  for (const key of policyKeys) {
    if (input[key] !== leftMetric[key]) fail(`${label}.${key} does not match validated summaries`)
  }

  return {
    schema_version: P2_R4_METRIC_DIRECTION_SCHEMA,
    task_family: input.task_family,
    metric_id: input.metric_id,
    input_unit: input.input_unit,
    output_unit: input.output_unit,
    value_kind: input.value_kind,
    reducer: input.reducer,
    missingness_policy: input.missingness_policy,
    minimum_observed_count: input.minimum_observed_count,
    direction: input.direction,
  }
}

function validatePolicy(
  input: unknown,
  left: P2R3Summary,
  right: P2R3Summary,
  context: ValidatedContext,
): ValidatedPolicy {
  const value = cloneCanonical<unknown>(input, "comparison policy")
  assertRecord(value, "comparison policy")
  assertExactKeys(value, POLICY_KEYS, "comparison policy")
  if (value.schema_version !== P2_R4_POLICY_SCHEMA) fail("comparison policy.schema_version is unsupported")
  assertCanonicalString(value.benchmark_id, "comparison policy.benchmark_id")
  assertCanonicalString(value.benchmark_protocol_version, "comparison policy.benchmark_protocol_version")
  assertSha256(value.left_summary_identity, "comparison policy.left_summary_identity")
  assertSha256(value.right_summary_identity, "comparison policy.right_summary_identity")
  assertSha256(value.shared_evaluation_context_identity, "comparison policy.shared_evaluation_context_identity")
  if (value.benchmark_id !== left.benchmark_id || value.benchmark_id !== right.benchmark_id) {
    fail("comparison policy.benchmark_id does not match validated summaries")
  }
  if (
    value.benchmark_protocol_version !== left.benchmark_protocol_version ||
    value.benchmark_protocol_version !== right.benchmark_protocol_version
  ) {
    fail("comparison policy.benchmark_protocol_version does not match validated summaries")
  }
  if (value.left_summary_identity !== left.summary_identity) {
    fail("comparison policy.left_summary_identity does not match validated left summary")
  }
  if (value.right_summary_identity !== right.summary_identity) {
    fail("comparison policy.right_summary_identity does not match validated right summary")
  }
  if (value.shared_evaluation_context_identity !== context.identity) {
    fail("comparison policy.shared_evaluation_context_identity does not match derived context identity")
  }
  if (!Array.isArray(value.metric_directions)) fail("comparison policy.metric_directions must be an array")
  const directions = value.metric_directions.map((entry, index) =>
    validateDirection(entry, index, left, right),
  )
  const seen = new Set<string>()
  for (const direction of directions) {
    const key = JSON.stringify([direction.task_family, direction.metric_id])
    if (seen.has(key)) fail(`duplicate direction policy for ${direction.task_family}/${direction.metric_id}`)
    seen.add(key)
  }
  directions.sort(
    (a, b) =>
      compareStrings(a.task_family, b.task_family) ||
      compareStrings(a.metric_id, b.metric_id) ||
      compareStrings(a.input_unit, b.input_unit) ||
      compareStrings(a.output_unit, b.output_unit),
  )
  const document: P2R4ComparisonPolicy = {
    schema_version: P2_R4_POLICY_SCHEMA,
    benchmark_id: value.benchmark_id,
    benchmark_protocol_version: value.benchmark_protocol_version,
    left_summary_identity: value.left_summary_identity,
    right_summary_identity: value.right_summary_identity,
    shared_evaluation_context_identity: value.shared_evaluation_context_identity,
    metric_directions: directions,
  }
  return { document, identity: sha256Canonical(document) }
}

function compareMetric(
  direction: P2R4MetricDirection,
  leftSummary: P2R3Summary,
  rightSummary: P2R3Summary,
): P2R4MetricComparison {
  const leftMetric = findSummaryMetric(leftSummary, direction.task_family, direction.metric_id)
  const rightMetric = findSummaryMetric(rightSummary, direction.task_family, direction.metric_id)
  const comparable = leftMetric.status === "REDUCED" && rightMetric.status === "REDUCED"
  const status: P2R4ComparisonStatus = comparable ? "COMPARABLE" : "INSUFFICIENT_EVIDENCE"
  let leftValue: number | null = null
  let rightValue: number | null = null
  let rawDelta: number | null = null
  if (comparable) {
    if (
      typeof leftMetric.reduced_value !== "number" ||
      !Number.isFinite(leftMetric.reduced_value) ||
      typeof rightMetric.reduced_value !== "number" ||
      !Number.isFinite(rightMetric.reduced_value)
    ) {
      fail("COMPARABLE metric requires finite reduced values on both sides")
    }
    leftValue = leftMetric.reduced_value
    rightValue = rightMetric.reduced_value
    rawDelta = leftValue - rightValue
    if (!Number.isFinite(rawDelta)) fail("pairwise subtraction produced a non-finite result")
  }
  return {
    metric_id: direction.metric_id,
    input_unit: direction.input_unit,
    output_unit: direction.output_unit,
    value_kind: direction.value_kind,
    reducer: direction.reducer,
    missingness_policy: direction.missingness_policy,
    minimum_observed_count: direction.minimum_observed_count,
    expected_count: leftMetric.expected_count,
    direction: direction.direction,
    left_summary: leftMetric,
    right_summary: rightMetric,
    status,
    left_value: leftValue,
    right_value: rightValue,
    raw_delta_left_minus_right: rawDelta,
  }
}

function deepFreeze<T>(value: T): T {
  if (typeof value !== "object" || value === null || Object.isFrozen(value)) return value
  const record = value as unknown as Record<string, unknown>
  for (const key of Object.keys(record)) deepFreeze(record[key])
  Object.freeze(value)
  return value
}

export function compareP2R4(
  leftReportInput: unknown,
  leftSummaryInput: unknown,
  rightReportInput: unknown,
  rightSummaryInput: unknown,
  sharedEvaluationContextInput: unknown,
  leftSubjectInput: unknown,
  rightSubjectInput: unknown,
  policyInput: unknown,
): P2R4Comparison {
  const leftReport = validateReport(leftReportInput, "left P2-R2 report")
  const rightReport = validateReport(rightReportInput, "right P2-R2 report")
  assertSameTaskTopology(leftReport, rightReport)
  const leftSummary = validateSummary(leftSummaryInput, "left P2-R3 summary", leftReport)
  const rightSummary = validateSummary(rightSummaryInput, "right P2-R3 summary", rightReport)
  const context = validateContext(sharedEvaluationContextInput)
  const leftSubject = validateSubject(leftSubjectInput, "left subject")
  const rightSubject = validateSubject(rightSubjectInput, "right subject")
  if (leftSubject.subject_id === rightSubject.subject_id) fail("left/right subject_id values must be distinct")
  if (leftSubject.system_version_commit_identity === rightSubject.system_version_commit_identity) {
    fail("left/right system_version_commit_identity values must be distinct")
  }
  const policy = validatePolicy(policyInput, leftSummary, rightSummary, context)

  const byFamily = new Map<string, P2R4MetricComparison[]>()
  for (const direction of policy.document.metric_directions) {
    const comparison = compareMetric(direction, leftSummary, rightSummary)
    const metrics = byFamily.get(direction.task_family)
    if (metrics === undefined) byFamily.set(direction.task_family, [comparison])
    else metrics.push(comparison)
  }
  const taskFamilyComparisons: P2R4TaskFamilyComparison[] = [...byFamily.entries()]
    .sort(([a], [b]) => compareStrings(a, b))
    .map(([taskFamily, metrics]) => ({
      task_family: taskFamily,
      metrics: [...metrics].sort((a, b) => compareStrings(a.metric_id, b.metric_id)),
    }))

  const identityInput = {
    schema_version: P2_R4_COMPARISON_SCHEMA,
    benchmark_id: leftReport.benchmark_id,
    benchmark_protocol_version: leftReport.benchmark_protocol_version,
    left_subject: leftSubject,
    right_subject: rightSubject,
    left_r2_report_identity: leftReport.report_identity,
    right_r2_report_identity: rightReport.report_identity,
    left_summary_identity: leftSummary.summary_identity,
    right_summary_identity: rightSummary.summary_identity,
    shared_evaluation_context_identity: context.identity,
    comparison_policy_identity: policy.identity,
    task_family_comparisons: taskFamilyComparisons,
  }
  const result: P2R4Comparison = {
    ...identityInput,
    comparison_identity: sha256Canonical(identityInput),
  }
  return deepFreeze(result)
}
