import {
  canonicalize,
  sha256Canonical,
  validateManifestSet,
  type P2R1ManifestRecord,
} from "../p2-r1/contract.ts"

export const P2_R2_OBSERVATION_SCHEMA = "p2-r2-observation/v1"
export const P2_R2_REPORT_SCHEMA = "p2-r2-report/v1"

export type P2R2MeasurementStatus = "observed" | "missing" | "unavailable"
export type P2R2MeasurementValue = boolean | number | null

export interface P2R2Observation {
  schema_version: string
  case_id: string
  r1_result_identity: string
  task_family: string
  metric_id: string
  unit: string
  measurement_status: P2R2MeasurementStatus
  value: P2R2MeasurementValue
}

export interface P2R2ReportMetric {
  metric_id: string
  unit: string
  measurement_status: P2R2MeasurementStatus
  value: P2R2MeasurementValue
}

export interface P2R2ReportCase {
  case_id: string
  r1_result_identity: string
  metrics: P2R2ReportMetric[]
}

export interface P2R2TaskFamilySection {
  task_family: string
  cases: P2R2ReportCase[]
}

export interface P2R2Report {
  schema_version: string
  benchmark_id: string
  benchmark_protocol_version: string
  r1_manifest_set_digest: string
  observation_set_digest: string
  case_count: number
  observation_count: number
  missing_observation_count: number
  task_family_sections: P2R2TaskFamilySection[]
  report_identity: string
}

const OBSERVATION_KEYS = [
  "schema_version",
  "case_id",
  "r1_result_identity",
  "task_family",
  "metric_id",
  "unit",
  "measurement_status",
  "value",
] as const

function fail(message: string): never {
  throw new Error(`P2-R2 contract violation: ${message}`)
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

function cloneCanonical<T>(value: unknown, label: string): T {
  try {
    return JSON.parse(canonicalize(value)) as T
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    fail(`${label} is not canonical JSON: ${detail}`)
  }
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function slotKey(caseId: string, metricId: string): string {
  return JSON.stringify([caseId, metricId])
}

function orderedManifest(records: readonly P2R1ManifestRecord[]): P2R1ManifestRecord[] {
  return [...records].sort(
    (left, right) =>
      compareStrings(left.task_family, right.task_family) ||
      compareStrings(left.case_id, right.case_id) ||
      compareStrings(left.result_identity, right.result_identity),
  )
}

function assertUniformBenchmark(records: readonly P2R1ManifestRecord[]): void {
  const first = records[0]
  if (first === undefined) {
    fail("validated R1 manifest set must not be empty")
  }
  for (const record of records) {
    if (record.benchmark_id !== first.benchmark_id) {
      fail("R1 manifest set contains multiple benchmark_id values")
    }
    if (record.benchmark_protocol_version !== first.benchmark_protocol_version) {
      fail("R1 manifest set contains multiple benchmark_protocol_version values")
    }
  }
}

function validateObservation(
  input: unknown,
  index: number,
  manifest: readonly P2R1ManifestRecord[],
): P2R2Observation {
  const label = `observations[${index}]`
  assertRecord(input, label)
  assertExactKeys(input, OBSERVATION_KEYS, label)

  if (input.schema_version !== P2_R2_OBSERVATION_SCHEMA) {
    fail(`${label}.schema_version is unsupported`)
  }
  assertCanonicalString(input.case_id, `${label}.case_id`)
  assertSha256(input.r1_result_identity, `${label}.r1_result_identity`)
  assertCanonicalString(input.task_family, `${label}.task_family`)
  assertCanonicalString(input.metric_id, `${label}.metric_id`)
  assertCanonicalString(input.unit, `${label}.unit`)

  if (
    input.measurement_status !== "observed" &&
    input.measurement_status !== "missing" &&
    input.measurement_status !== "unavailable"
  ) {
    fail(`${label}.measurement_status is unsupported`)
  }

  const record = manifest.find((entry) => entry.case_id === input.case_id)
  if (record === undefined) {
    fail(`${label}.case_id is not present in the validated R1 manifest set`)
  }
  if (input.r1_result_identity !== record.result_identity) {
    fail(`${label}.r1_result_identity does not match the canonical R1 result identity`)
  }
  if (input.task_family !== record.task_family) {
    fail(`${label}.task_family crosses the canonical R1 task-family boundary`)
  }
  const metric = record.metric_definitions.find((entry) => entry.metric_id === input.metric_id)
  if (metric === undefined) {
    fail(`${label}.metric_id is not declared by the canonical R1 manifest record`)
  }
  if (metric.task_family !== input.task_family) {
    fail(`${label}.metric_id crosses the canonical R1 task-family boundary`)
  }
  if (metric.unit !== input.unit) {
    fail(`${label}.unit does not match the canonical R1 metric unit`)
  }

  const value = input.value
  let canonicalValue: P2R2MeasurementValue
  if (input.measurement_status === "observed") {
    if (typeof value === "number") {
      if (!Number.isFinite(value)) {
        fail(`${label}.value must be finite when numeric`)
      }
      canonicalValue = value
    } else if (typeof value === "boolean") {
      canonicalValue = value
    } else {
      fail(`${label}.value must be a boolean or finite number when observed`)
    }
  } else {
    if (value !== null) {
      fail(`${label}.value must be null when measurement_status is ${input.measurement_status}`)
    }
    canonicalValue = null
  }

  return {
    schema_version: P2_R2_OBSERVATION_SCHEMA,
    case_id: input.case_id,
    r1_result_identity: input.r1_result_identity,
    task_family: input.task_family,
    metric_id: input.metric_id,
    unit: input.unit,
    measurement_status: input.measurement_status,
    value: canonicalValue,
  }
}

function validateObservationSet(
  input: unknown,
  manifest: readonly P2R1ManifestRecord[],
): P2R2Observation[] {
  const canonicalInput = cloneCanonical<unknown>(input, "observation set")
  if (!Array.isArray(canonicalInput)) {
    fail("observation set must be an array")
  }
  const observations = canonicalInput.map((entry, index) =>
    validateObservation(entry, index, manifest),
  )
  const identities = new Set<string>()
  for (const observation of observations) {
    const identity = slotKey(observation.case_id, observation.metric_id)
    if (identities.has(identity)) {
      fail(
        `duplicate observation for case_id=${observation.case_id} metric_id=${observation.metric_id}`,
      )
    }
    identities.add(identity)
  }
  return observations.sort(
    (left, right) =>
      compareStrings(left.task_family, right.task_family) ||
      compareStrings(left.case_id, right.case_id) ||
      compareStrings(left.metric_id, right.metric_id) ||
      compareStrings(left.unit, right.unit),
  )
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

export function runP2R2Report(
  manifestInput: unknown,
  developmentInput: unknown,
  holdoutInput: unknown,
  observationInput: unknown,
): P2R2Report {
  const manifest = validateManifestSet(manifestInput, developmentInput, holdoutInput)
  assertUniformBenchmark(manifest)
  const orderedRecords = orderedManifest(manifest)
  const observations = validateObservationSet(observationInput, orderedRecords)
  const observationsBySlot = new Map(
    observations.map((entry) => [slotKey(entry.case_id, entry.metric_id), entry] as const),
  )

  const taskFamilies = [...new Set(orderedRecords.map((entry) => entry.task_family))].sort(
    compareStrings,
  )
  let missingObservationCount = 0
  let observedObservationCount = 0

  const taskFamilySections: P2R2TaskFamilySection[] = taskFamilies.map((taskFamily) => ({
    task_family: taskFamily,
    cases: orderedRecords
      .filter((record) => record.task_family === taskFamily)
      .sort((left, right) => compareStrings(left.case_id, right.case_id))
      .map((record) => ({
        case_id: record.case_id,
        r1_result_identity: record.result_identity,
        metrics: [...record.metric_definitions]
          .sort((left, right) => compareStrings(left.metric_id, right.metric_id))
          .map((metric) => {
            const observation = observationsBySlot.get(slotKey(record.case_id, metric.metric_id))
            if (observation === undefined) {
              missingObservationCount += 1
              return {
                metric_id: metric.metric_id,
                unit: metric.unit,
                measurement_status: "missing" as const,
                value: null,
              }
            }
            if (observation.measurement_status === "observed") {
              observedObservationCount += 1
            } else {
              missingObservationCount += 1
            }
            return {
              metric_id: metric.metric_id,
              unit: metric.unit,
              measurement_status: observation.measurement_status,
              value: observation.value,
            }
          }),
      })),
  }))

  const first = orderedRecords[0]
  if (first === undefined) {
    fail("validated R1 manifest set must not be empty")
  }
  const reportIdentityInput = {
    schema_version: P2_R2_REPORT_SCHEMA,
    benchmark_id: first.benchmark_id,
    benchmark_protocol_version: first.benchmark_protocol_version,
    r1_manifest_set_digest: sha256Canonical(orderedRecords),
    observation_set_digest: sha256Canonical(observations),
    case_count: orderedRecords.length,
    observation_count: observedObservationCount,
    missing_observation_count: missingObservationCount,
    task_family_sections: taskFamilySections,
  }

  const report: P2R2Report = {
    ...reportIdentityInput,
    report_identity: sha256Canonical(reportIdentityInput),
  }
  return deepFreeze(report)
}
