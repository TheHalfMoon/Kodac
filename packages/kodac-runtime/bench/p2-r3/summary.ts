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

export const P2_R3_POLICY_SCHEMA = "p2-r3-policy/v1"
export const P2_R3_METRIC_POLICY_SCHEMA = "p2-r3-metric-policy/v1"
export const P2_R3_SUMMARY_SCHEMA = "p2-r3-summary/v1"

export type P2R3ValueKind = "NUMBER" | "BOOLEAN"
export type P2R3Reducer = "ARITHMETIC_MEAN" | "BOOLEAN_TRUE_RATE"
export type P2R3MissingnessPolicy = "REQUIRE_COMPLETE" | "OBSERVED_ONLY_WITH_COVERAGE"
export type P2R3MetricSummaryStatus = "REDUCED" | "INSUFFICIENT_EVIDENCE"

export interface P2R3MetricPolicy {
  schema_version: string
  task_family: string
  metric_id: string
  unit: string
  value_kind: P2R3ValueKind
  reducer: P2R3Reducer
  missingness_policy: P2R3MissingnessPolicy
  minimum_observed_count: number
}

export interface P2R3PolicyDocument {
  schema_version: string
  benchmark_id: string
  benchmark_protocol_version: string
  r2_report_identity: string
  metric_policies: P2R3MetricPolicy[]
}

export interface P2R3MetricSummary {
  metric_id: string
  input_unit: string
  output_unit: string
  value_kind: P2R3ValueKind
  reducer: P2R3Reducer
  missingness_policy: P2R3MissingnessPolicy
  minimum_observed_count: number
  expected_count: number
  observed_count: number
  missing_count: number
  unavailable_count: number
  status: P2R3MetricSummaryStatus
  reduced_value: number | null
  true_count: number | null
  denominator_count: number | null
}

export interface P2R3TaskFamilySummary {
  task_family: string
  metrics: P2R3MetricSummary[]
}

export interface P2R3Summary {
  schema_version: string
  benchmark_id: string
  benchmark_protocol_version: string
  r2_report_identity: string
  policy_identity: string
  task_family_summaries: P2R3TaskFamilySummary[]
  summary_identity: string
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
const SECTION_KEYS = ["task_family", "cases"] as const
const CASE_KEYS = ["case_id", "r1_result_identity", "metrics"] as const
const REPORT_METRIC_KEYS = ["metric_id", "unit", "measurement_status", "value"] as const
const POLICY_KEYS = [
  "schema_version",
  "benchmark_id",
  "benchmark_protocol_version",
  "r2_report_identity",
  "metric_policies",
] as const
const METRIC_POLICY_KEYS = [
  "schema_version",
  "task_family",
  "metric_id",
  "unit",
  "value_kind",
  "reducer",
  "missingness_policy",
  "minimum_observed_count",
] as const

interface BoundMetricSlot {
  task_family: string
  case_id: string
  metric: P2R2ReportMetric
}

interface ValidatedPolicySet {
  document: P2R3PolicyDocument
  policy_identity: string
}

function fail(message: string): never {
  throw new Error(`P2-R3 contract violation: ${message}`)
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
      if (!Number.isFinite(value)) {
        fail(`${label}.value must be finite when numeric`)
      }
      return { status, value }
    }
    if (typeof value === "boolean") {
      return { status, value }
    }
    fail(`${label}.value must be a boolean or finite number when observed`)
  }
  if (value !== null) {
    fail(`${label}.value must be null when measurement_status is ${status}`)
  }
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
  assertExactKeys(value, CASE_KEYS, label)
  assertCanonicalString(value.case_id, `${label}.case_id`)
  assertSha256(value.r1_result_identity, `${label}.r1_result_identity`)
  if (!Array.isArray(value.metrics) || value.metrics.length === 0) {
    fail(`${label}.metrics must be a non-empty array`)
  }
  const metrics = value.metrics.map((metric, index) =>
    validateReportMetric(metric, `${label}.metrics[${index}]`),
  )
  assertStrictlySorted(
    metrics.map((metric) => metric.metric_id),
    `${label}.metrics`,
  )
  return { case_id: value.case_id, r1_result_identity: value.r1_result_identity, metrics }
}

function validateTaskFamilySection(value: unknown, label: string): P2R2TaskFamilySection {
  assertRecord(value, label)
  assertExactKeys(value, SECTION_KEYS, label)
  assertCanonicalString(value.task_family, `${label}.task_family`)
  if (!Array.isArray(value.cases) || value.cases.length === 0) {
    fail(`${label}.cases must be a non-empty array`)
  }
  const cases = value.cases.map((entry, index) => validateReportCase(entry, `${label}.cases[${index}]`))
  assertStrictlySorted(
    cases.map((entry) => entry.case_id),
    `${label}.cases`,
  )
  return { task_family: value.task_family, cases }
}

function validateP2R2Report(input: unknown): P2R2Report {
  const value = cloneCanonical<unknown>(input, "P2-R2 report")
  assertRecord(value, "P2-R2 report")
  assertExactKeys(value, REPORT_KEYS, "P2-R2 report")
  if (value.schema_version !== P2_R2_REPORT_SCHEMA) {
    fail("P2-R2 report schema_version is unsupported")
  }
  assertCanonicalString(value.benchmark_id, "P2-R2 report.benchmark_id")
  assertCanonicalString(value.benchmark_protocol_version, "P2-R2 report.benchmark_protocol_version")
  assertSha256(value.r1_manifest_set_digest, "P2-R2 report.r1_manifest_set_digest")
  assertSha256(value.observation_set_digest, "P2-R2 report.observation_set_digest")
  assertNonNegativeSafeInteger(value.case_count, "P2-R2 report.case_count")
  assertNonNegativeSafeInteger(value.observation_count, "P2-R2 report.observation_count")
  assertNonNegativeSafeInteger(
    value.missing_observation_count,
    "P2-R2 report.missing_observation_count",
  )
  assertSha256(value.report_identity, "P2-R2 report.report_identity")
  if (!Array.isArray(value.task_family_sections) || value.task_family_sections.length === 0) {
    fail("P2-R2 report.task_family_sections must be a non-empty array")
  }

  const taskFamilySections = value.task_family_sections.map((section, index) =>
    validateTaskFamilySection(section, `P2-R2 report.task_family_sections[${index}]`),
  )
  assertStrictlySorted(
    taskFamilySections.map((section) => section.task_family),
    "P2-R2 report.task_family_sections",
  )

  const caseIdentities = new Set<string>()
  const slots = new Set<string>()
  let caseCount = 0
  let observedCount = 0
  let missingCount = 0
  for (const section of taskFamilySections) {
    for (const reportCase of section.cases) {
      caseCount += 1
      if (caseIdentities.has(reportCase.case_id)) {
        fail(`duplicate P2-R2 case identity: ${reportCase.case_id}`)
      }
      caseIdentities.add(reportCase.case_id)
      for (const metric of reportCase.metrics) {
        const key = JSON.stringify([section.task_family, reportCase.case_id, metric.metric_id])
        if (slots.has(key)) {
          fail(
            `duplicate P2-R2 case/metric slot: task_family=${section.task_family} case_id=${reportCase.case_id} metric_id=${metric.metric_id}`,
          )
        }
        slots.add(key)
        if (metric.measurement_status === "observed") {
          observedCount += 1
        } else {
          missingCount += 1
        }
      }
    }
  }

  if (value.case_count !== caseCount) {
    fail(`P2-R2 report.case_count does not match materialized cases: ${value.case_count} != ${caseCount}`)
  }
  if (value.observation_count !== observedCount) {
    fail(
      `P2-R2 report.observation_count does not match materialized observed slots: ${value.observation_count} != ${observedCount}`,
    )
  }
  if (value.missing_observation_count !== missingCount) {
    fail(
      `P2-R2 report.missing_observation_count does not match materialized non-observed slots: ${value.missing_observation_count} != ${missingCount}`,
    )
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
    task_family_sections: taskFamilySections,
  }
  const expectedIdentity = sha256Canonical(identityInput)
  if (value.report_identity !== expectedIdentity) {
    fail("P2-R2 report.report_identity does not match canonical report evidence")
  }

  return {
    ...identityInput,
    report_identity: value.report_identity,
  }
}

function collectSlots(report: P2R2Report, taskFamily: string, metricId: string): BoundMetricSlot[] {
  const section = report.task_family_sections.find((entry) => entry.task_family === taskFamily)
  if (section === undefined) {
    fail(`metric policy task_family is not present in the validated P2-R2 report: ${taskFamily}`)
  }
  const slots: BoundMetricSlot[] = []
  for (const reportCase of section.cases) {
    for (const metric of reportCase.metrics) {
      if (metric.metric_id === metricId) {
        slots.push({ task_family: taskFamily, case_id: reportCase.case_id, metric })
      }
    }
  }
  if (slots.length === 0) {
    fail(`metric policy metric_id is not present in task_family=${taskFamily}: ${metricId}`)
  }
  return slots
}

function validateMetricPolicy(
  value: unknown,
  index: number,
  report: P2R2Report,
): P2R3MetricPolicy {
  const label = `P2-R3 policy.metric_policies[${index}]`
  assertRecord(value, label)
  assertExactKeys(value, METRIC_POLICY_KEYS, label)
  if (value.schema_version !== P2_R3_METRIC_POLICY_SCHEMA) {
    fail(`${label}.schema_version is unsupported`)
  }
  assertCanonicalString(value.task_family, `${label}.task_family`)
  assertCanonicalString(value.metric_id, `${label}.metric_id`)
  assertCanonicalString(value.unit, `${label}.unit`)
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

  if (
    (value.reducer === "ARITHMETIC_MEAN" && value.value_kind !== "NUMBER") ||
    (value.reducer === "BOOLEAN_TRUE_RATE" && value.value_kind !== "BOOLEAN")
  ) {
    fail(`${label}.reducer is incompatible with value_kind`)
  }

  const slots = collectSlots(report, value.task_family, value.metric_id)
  const expectedCount = slots.length
  if (value.minimum_observed_count > expectedCount) {
    fail(`${label}.minimum_observed_count exceeds expected_count=${expectedCount}`)
  }
  if (
    value.missingness_policy === "REQUIRE_COMPLETE" &&
    value.minimum_observed_count !== expectedCount
  ) {
    fail(`${label}.minimum_observed_count must equal expected_count under REQUIRE_COMPLETE`)
  }

  for (const slot of slots) {
    if (slot.metric.unit !== value.unit) {
      fail(
        `${label}.unit does not match report slot unit for case_id=${slot.case_id}: ${value.unit} != ${slot.metric.unit}`,
      )
    }
    if (slot.metric.measurement_status !== "observed") {
      continue
    }
    if (value.value_kind === "NUMBER") {
      if (typeof slot.metric.value !== "number" || !Number.isFinite(slot.metric.value)) {
        fail(`${label}.value_kind NUMBER does not match an observed report slot`)
      }
    } else if (typeof slot.metric.value !== "boolean") {
      fail(`${label}.value_kind BOOLEAN does not match an observed report slot`)
    }
  }

  return {
    schema_version: P2_R3_METRIC_POLICY_SCHEMA,
    task_family: value.task_family,
    metric_id: value.metric_id,
    unit: value.unit,
    value_kind: value.value_kind,
    reducer: value.reducer,
    missingness_policy: value.missingness_policy,
    minimum_observed_count: value.minimum_observed_count,
  }
}

function validatePolicyDocument(input: unknown, report: P2R2Report): ValidatedPolicySet {
  const value = cloneCanonical<unknown>(input, "P2-R3 policy")
  assertRecord(value, "P2-R3 policy")
  assertExactKeys(value, POLICY_KEYS, "P2-R3 policy")
  if (value.schema_version !== P2_R3_POLICY_SCHEMA) {
    fail("P2-R3 policy.schema_version is unsupported")
  }
  assertCanonicalString(value.benchmark_id, "P2-R3 policy.benchmark_id")
  assertCanonicalString(
    value.benchmark_protocol_version,
    "P2-R3 policy.benchmark_protocol_version",
  )
  assertSha256(value.r2_report_identity, "P2-R3 policy.r2_report_identity")
  if (value.benchmark_id !== report.benchmark_id) {
    fail("P2-R3 policy.benchmark_id does not match the validated P2-R2 report")
  }
  if (value.benchmark_protocol_version !== report.benchmark_protocol_version) {
    fail("P2-R3 policy.benchmark_protocol_version does not match the validated P2-R2 report")
  }
  if (value.r2_report_identity !== report.report_identity) {
    fail("P2-R3 policy.r2_report_identity does not match the validated P2-R2 report")
  }
  if (!Array.isArray(value.metric_policies)) {
    fail("P2-R3 policy.metric_policies must be an array")
  }

  const policies = value.metric_policies.map((entry, index) =>
    validateMetricPolicy(entry, index, report),
  )
  const identities = new Set<string>()
  for (const policy of policies) {
    const identity = JSON.stringify([policy.task_family, policy.metric_id])
    if (identities.has(identity)) {
      fail(
        `duplicate P2-R3 metric policy for task_family=${policy.task_family} metric_id=${policy.metric_id}`,
      )
    }
    identities.add(identity)
  }
  policies.sort(
    (left, right) =>
      compareStrings(left.task_family, right.task_family) ||
      compareStrings(left.metric_id, right.metric_id) ||
      compareStrings(left.unit, right.unit),
  )

  const document: P2R3PolicyDocument = {
    schema_version: P2_R3_POLICY_SCHEMA,
    benchmark_id: value.benchmark_id,
    benchmark_protocol_version: value.benchmark_protocol_version,
    r2_report_identity: value.r2_report_identity,
    metric_policies: policies,
  }
  return { document, policy_identity: sha256Canonical(document) }
}

function arithmeticMean(values: readonly number[]): number {
  if (values.length === 0) {
    fail("ARITHMETIC_MEAN cannot reduce zero observed values")
  }
  let mean = 0
  for (const value of values) {
    const contribution = value / values.length
    mean += contribution
    if (!Number.isFinite(mean)) {
      fail("ARITHMETIC_MEAN produced a non-finite result")
    }
  }
  return mean
}

function summarizeMetric(report: P2R2Report, policy: P2R3MetricPolicy): P2R3MetricSummary {
  const slots = collectSlots(report, policy.task_family, policy.metric_id)
  let observedCount = 0
  let missingCount = 0
  let unavailableCount = 0
  const numericValues: number[] = []
  const booleanValues: boolean[] = []

  for (const slot of slots) {
    if (slot.metric.measurement_status === "missing") {
      missingCount += 1
      continue
    }
    if (slot.metric.measurement_status === "unavailable") {
      unavailableCount += 1
      continue
    }
    observedCount += 1
    if (policy.value_kind === "NUMBER") {
      if (typeof slot.metric.value !== "number" || !Number.isFinite(slot.metric.value)) {
        fail("validated NUMBER metric contained a non-numeric observed value")
      }
      numericValues.push(slot.metric.value)
    } else {
      if (typeof slot.metric.value !== "boolean") {
        fail("validated BOOLEAN metric contained a non-boolean observed value")
      }
      booleanValues.push(slot.metric.value)
    }
  }

  const expectedCount = slots.length
  if (expectedCount !== observedCount + missingCount + unavailableCount) {
    fail("metric coverage counts do not reconcile")
  }
  const sufficient =
    policy.missingness_policy === "REQUIRE_COMPLETE"
      ? observedCount === expectedCount
      : observedCount >= policy.minimum_observed_count
  const status: P2R3MetricSummaryStatus = sufficient ? "REDUCED" : "INSUFFICIENT_EVIDENCE"

  if (policy.reducer === "ARITHMETIC_MEAN") {
    const reducedValue = status === "REDUCED" ? arithmeticMean(numericValues) : null
    return {
      metric_id: policy.metric_id,
      input_unit: policy.unit,
      output_unit: policy.unit,
      value_kind: policy.value_kind,
      reducer: policy.reducer,
      missingness_policy: policy.missingness_policy,
      minimum_observed_count: policy.minimum_observed_count,
      expected_count: expectedCount,
      observed_count: observedCount,
      missing_count: missingCount,
      unavailable_count: unavailableCount,
      status,
      reduced_value: reducedValue,
      true_count: null,
      denominator_count: null,
    }
  }

  const trueCount = booleanValues.reduce((count, value) => count + (value ? 1 : 0), 0)
  const denominatorCount = observedCount
  const reducedValue = status === "REDUCED" ? trueCount / denominatorCount : null
  if (reducedValue !== null && !Number.isFinite(reducedValue)) {
    fail("BOOLEAN_TRUE_RATE produced a non-finite result")
  }
  return {
    metric_id: policy.metric_id,
    input_unit: policy.unit,
    output_unit: "ratio_0_1",
    value_kind: policy.value_kind,
    reducer: policy.reducer,
    missingness_policy: policy.missingness_policy,
    minimum_observed_count: policy.minimum_observed_count,
    expected_count: expectedCount,
    observed_count: observedCount,
    missing_count: missingCount,
    unavailable_count: unavailableCount,
    status,
    reduced_value: reducedValue,
    true_count: trueCount,
    denominator_count: denominatorCount,
  }
}

function deepFreeze<T>(value: T): T {
  if (typeof value !== "object" || value === null || Object.isFrozen(value)) {
    return value
  }
  const record = value as unknown as Record<string, unknown>
  for (const key of Object.keys(record)) {
    deepFreeze(record[key])
  }
  Object.freeze(value)
  return value
}

export function summarizeP2R3(reportInput: unknown, policyInput: unknown): P2R3Summary {
  const report = validateP2R2Report(reportInput)
  const policySet = validatePolicyDocument(policyInput, report)
  const families = new Map<string, P2R3MetricSummary[]>()
  for (const policy of policySet.document.metric_policies) {
    const metricSummary = summarizeMetric(report, policy)
    const metrics = families.get(policy.task_family)
    if (metrics === undefined) {
      families.set(policy.task_family, [metricSummary])
    } else {
      metrics.push(metricSummary)
    }
  }

  const taskFamilySummaries: P2R3TaskFamilySummary[] = [...families.entries()]
    .sort(([left], [right]) => compareStrings(left, right))
    .map(([taskFamily, metrics]) => ({
      task_family: taskFamily,
      metrics: [...metrics].sort((left, right) => compareStrings(left.metric_id, right.metric_id)),
    }))

  const identityInput = {
    schema_version: P2_R3_SUMMARY_SCHEMA,
    benchmark_id: report.benchmark_id,
    benchmark_protocol_version: report.benchmark_protocol_version,
    r2_report_identity: report.report_identity,
    policy_identity: policySet.policy_identity,
    task_family_summaries: taskFamilySummaries,
  }
  const summary: P2R3Summary = {
    ...identityInput,
    summary_identity: sha256Canonical(identityInput),
  }
  return deepFreeze(summary)
}
