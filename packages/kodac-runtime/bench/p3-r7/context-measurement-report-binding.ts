import {
  canonicalize,
  sha256Canonical,
  validateManifestSet,
  type P2R1ManifestRecord,
} from "../p2-r1/contract.ts"
import {
  runP2R2Report,
  type P2R2Observation,
  type P2R2Report,
  type P2R2ReportMetric,
} from "../p2-r2/runner.ts"
import {
  P3_R6_DIMENSIONS,
  P3_R6_TASK_FAMILY,
  type ContextPolicyMeasurementEvidence,
} from "../p3-r6/contracts.ts"
import { buildContextPolicyMeasurementObservations } from "../p3-r6/context-measurement-observation.ts"
import {
  P3_R7_REPORT_DECLARATION_KIND,
  P3_R7_REPORT_DECLARATION_VERSION,
  P3_R7_REPORT_EVIDENCE_KIND,
  P3_R7_REPORT_EVIDENCE_VERSION,
  P3_R7_TASK_FAMILY,
  type ContextPolicyMeasurementReportDeclaration,
  type ContextPolicyMeasurementReportEvidence,
} from "./contracts.ts"

type UnknownRecord = Record<string, unknown>

const DECLARATION_KEYS = [
  "version",
  "kind",
  "reportBindingId",
  "taskFamily",
  "caseId",
  "r1ResultIdentity",
] as const
const SHA256 = /^sha256:[0-9a-f]{64}$/
const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/

function fail(message: string): never {
  throw new Error(`P3-R7 contract violation: ${message}`)
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function snapshot<T>(value: unknown, label: string): T {
  try {
    return JSON.parse(canonicalize(value)) as T
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    fail(`${label} is not canonical JSON: ${detail}`)
  }
}

function record(value: unknown, label: string): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    fail(`${label} must be an object`)
  }
  return value as UnknownRecord
}

function exactKeys(value: UnknownRecord, keys: readonly string[], label: string): void {
  const actual = Object.keys(value).sort(compareStrings)
  const expected = [...keys].sort(compareStrings)
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    fail(`${label} keys are not canonical`)
  }
}

function canonicalString(value: unknown, label: string): string {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.trim() !== value ||
    value.includes("\0")
  ) {
    fail(`${label} must be a non-empty canonical string`)
  }
  return value
}

function stableId(value: unknown, label: string): string {
  const result = canonicalString(value, label)
  if (!STABLE_ID.test(result)) fail(`${label} must use the stable-id alphabet`)
  return result
}

function sha256(value: unknown, label: string): string {
  const result = canonicalString(value, label)
  if (!SHA256.test(result)) fail(`${label} must be a lowercase sha256 identity`)
  return result
}

function normalizeDeclaration(
  input: unknown,
  manifestRecord: P2R1ManifestRecord,
): ContextPolicyMeasurementReportDeclaration {
  const value = record(input, "reportDeclaration")
  exactKeys(value, DECLARATION_KEYS, "reportDeclaration")
  if (
    value.version !== P3_R7_REPORT_DECLARATION_VERSION ||
    value.kind !== P3_R7_REPORT_DECLARATION_KIND
  ) {
    fail("unsupported report declaration contract")
  }
  if (value.taskFamily !== P3_R7_TASK_FAMILY) {
    fail("reportDeclaration.taskFamily must be context-selection")
  }
  const reportBindingId = stableId(value.reportBindingId, "reportDeclaration.reportBindingId")
  const caseId = canonicalString(value.caseId, "reportDeclaration.caseId")
  const r1ResultIdentity = sha256(
    value.r1ResultIdentity,
    "reportDeclaration.r1ResultIdentity",
  )
  if (caseId !== manifestRecord.case_id) {
    fail("reportDeclaration.caseId does not match the sole manifest case")
  }
  if (r1ResultIdentity !== manifestRecord.result_identity) {
    fail("reportDeclaration.r1ResultIdentity does not match the sole manifest case")
  }
  return Object.freeze({
    version: P3_R7_REPORT_DECLARATION_VERSION,
    kind: P3_R7_REPORT_DECLARATION_KIND,
    reportBindingId,
    taskFamily: P3_R7_TASK_FAMILY,
    caseId,
    r1ResultIdentity,
  })
}

function slotKey(metricId: string, unit: string): string {
  return JSON.stringify([metricId, unit])
}

function validateSingleCaseManifest(
  manifest: readonly P2R1ManifestRecord[],
): P2R1ManifestRecord {
  if (manifest.length !== 1) {
    fail("validated manifest must contain exactly one record")
  }
  const manifestRecord = manifest[0]
  if (manifestRecord === undefined) fail("validated manifest record is unavailable")
  if (manifestRecord.task_family !== P3_R7_TASK_FAMILY) {
    fail("sole manifest record must use task family context-selection")
  }
  if (manifestRecord.metric_definitions.length !== P3_R6_DIMENSIONS.length) {
    fail(`sole manifest record must declare exactly ${P3_R6_DIMENSIONS.length} metrics`)
  }
  return manifestRecord
}

function validateMetricBoundary(
  manifestRecord: P2R1ManifestRecord,
  evidence: ContextPolicyMeasurementEvidence,
): void {
  const bindings = evidence.measurementDeclaration.dimensionMetricBindings
  if (bindings.length !== P3_R6_DIMENSIONS.length) {
    fail(`R6 evidence must contain exactly ${P3_R6_DIMENSIONS.length} dimension bindings`)
  }
  if (evidence.observations.length !== P3_R6_DIMENSIONS.length) {
    fail(`R6 evidence must contain exactly ${P3_R6_DIMENSIONS.length} observations`)
  }

  const manifestSlots = new Set(
    manifestRecord.metric_definitions.map((metric) => slotKey(metric.metric_id, metric.unit)),
  )
  const bindingSlots = new Set(
    bindings.map((binding) => slotKey(binding.metricId, binding.unit)),
  )
  const observationSlots = new Set(
    evidence.observations.map((observation) => slotKey(observation.metric_id, observation.unit)),
  )

  if (
    manifestSlots.size !== P3_R6_DIMENSIONS.length ||
    bindingSlots.size !== P3_R6_DIMENSIONS.length ||
    observationSlots.size !== P3_R6_DIMENSIONS.length
  ) {
    fail("manifest, R6 binding, and R6 observation metric slots must be duplicate-free")
  }

  for (const slot of manifestSlots) {
    if (!bindingSlots.has(slot) || !observationSlots.has(slot)) {
      fail("manifest metric slots do not exactly match R6 binding and observation slots")
    }
  }
  for (const observation of evidence.observations) {
    if (observation.measurement_status !== "observed" && observation.measurement_status !== "unavailable") {
      fail("R6 evidence may contain only observed or unavailable observations")
    }
  }
}

function observationsBySlot(
  observations: readonly P2R2Observation[],
): ReadonlyMap<string, P2R2Observation> {
  const result = new Map<string, P2R2Observation>()
  for (const observation of observations) {
    const key = slotKey(observation.metric_id, observation.unit)
    if (result.has(key)) fail("R6 observation slots must be unique")
    result.set(key, observation)
  }
  return result
}

function exactValue(left: boolean | number | null, right: boolean | number | null): boolean {
  return Object.is(left, right)
}

function validateReportCoverage(
  report: P2R2Report,
  manifestRecord: P2R1ManifestRecord,
  evidence: ContextPolicyMeasurementEvidence,
): void {
  if (report.benchmark_id !== manifestRecord.benchmark_id) {
    fail("P2-R2 report benchmark_id does not match the sole manifest record")
  }
  if (report.benchmark_protocol_version !== manifestRecord.benchmark_protocol_version) {
    fail("P2-R2 report benchmark_protocol_version does not match the sole manifest record")
  }
  if (report.r1_manifest_set_digest !== evidence.r1ManifestSetDigest) {
    fail("P2-R2 report manifest-set digest does not match R6 evidence")
  }
  if (report.case_count !== 1 || report.task_family_sections.length !== 1) {
    fail("P2-R2 report must contain exactly one case and one task-family section")
  }

  const section = report.task_family_sections[0]
  if (section === undefined || section.task_family !== P3_R7_TASK_FAMILY || section.cases.length !== 1) {
    fail("P2-R2 report must contain one context-selection section with one case")
  }
  const reportCase = section.cases[0]
  if (
    reportCase === undefined ||
    reportCase.case_id !== evidence.caseId ||
    reportCase.r1_result_identity !== evidence.r1ResultIdentity
  ) {
    fail("P2-R2 report case does not bind the reconstructed R6 case")
  }
  if (reportCase.metrics.length !== P3_R6_DIMENSIONS.length) {
    fail(`P2-R2 report case must contain exactly ${P3_R6_DIMENSIONS.length} metric slots`)
  }

  const source = observationsBySlot(evidence.observations)
  const seen = new Set<string>()
  for (const metric of reportCase.metrics) {
    validateReportMetric(metric, source, evidence)
    const key = slotKey(metric.metric_id, metric.unit)
    if (seen.has(key)) fail("P2-R2 report metric slots must be unique")
    seen.add(key)
  }
  if (seen.size !== source.size) {
    fail("P2-R2 report metrics do not exactly cover the reconstructed R6 observations")
  }
}

function validateReportMetric(
  metric: P2R2ReportMetric,
  source: ReadonlyMap<string, P2R2Observation>,
  evidence: ContextPolicyMeasurementEvidence,
): void {
  if (metric.measurement_status === "missing") {
    fail("P2-R2 report must not contain a synthetic missing metric slot")
  }
  const observation = source.get(slotKey(metric.metric_id, metric.unit))
  if (observation === undefined) {
    fail("P2-R2 report contains a metric slot not present in R6 evidence")
  }
  if (
    observation.case_id !== evidence.caseId ||
    observation.r1_result_identity !== evidence.r1ResultIdentity ||
    observation.task_family !== P3_R6_TASK_FAMILY ||
    observation.metric_id !== metric.metric_id ||
    observation.unit !== metric.unit ||
    observation.measurement_status !== metric.measurement_status ||
    !exactValue(observation.value, metric.value)
  ) {
    fail("P2-R2 report metric does not exactly match its reconstructed R6 observation")
  }
}

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    for (const nested of Object.values(value as UnknownRecord)) deepFreeze(nested)
    Object.freeze(value)
  }
  return value
}

export function buildContextPolicyMeasurementReportBinding(
  planRequestValue: unknown,
  policyValue: unknown,
  manifestInput: unknown,
  developmentInput: unknown,
  holdoutInput: unknown,
  measurementDeclarationValue: unknown,
  reportDeclarationValue: unknown,
): ContextPolicyMeasurementReportEvidence {
  const planRequest = snapshot<unknown>(planRequestValue, "plan request")
  const policy = snapshot<unknown>(policyValue, "policy")
  const manifestValue = snapshot<unknown>(manifestInput, "manifest")
  const development = snapshot<unknown>(developmentInput, "development corpus")
  const holdout = snapshot<unknown>(holdoutInput, "holdout corpus")
  const measurementDeclaration = snapshot<unknown>(
    measurementDeclarationValue,
    "measurement declaration",
  )
  const reportDeclarationInput = snapshot<unknown>(
    reportDeclarationValue,
    "report declaration",
  )

  const manifest = validateManifestSet(manifestValue, development, holdout)
  const manifestRecord = validateSingleCaseManifest(manifest)
  const reportDeclaration = normalizeDeclaration(reportDeclarationInput, manifestRecord)

  const r6Evidence = buildContextPolicyMeasurementObservations(
    planRequest,
    policy,
    manifestValue,
    development,
    holdout,
    measurementDeclaration,
  )

  if (r6Evidence.caseId !== manifestRecord.case_id || r6Evidence.caseId !== reportDeclaration.caseId) {
    fail("R6 evidence case does not match the sole manifest/report declaration")
  }
  if (
    r6Evidence.r1ResultIdentity !== manifestRecord.result_identity ||
    r6Evidence.r1ResultIdentity !== reportDeclaration.r1ResultIdentity
  ) {
    fail("R6 evidence result identity does not match the sole manifest/report declaration")
  }
  if (r6Evidence.measurementDeclaration.taskFamily !== P3_R7_TASK_FAMILY) {
    fail("R6 evidence task family must be context-selection")
  }
  if (r6Evidence.r1ManifestSetDigest !== sha256Canonical(manifest)) {
    fail("R6 evidence manifest-set digest does not match the validated sole manifest")
  }

  validateMetricBoundary(manifestRecord, r6Evidence)

  const report = runP2R2Report(
    manifestValue,
    development,
    holdout,
    r6Evidence.observations,
  )
  validateReportCoverage(report, manifestRecord, r6Evidence)

  const base = {
    version: P3_R7_REPORT_EVIDENCE_VERSION,
    kind: P3_R7_REPORT_EVIDENCE_KIND,
    reportDeclaration,
    reportBindingId: reportDeclaration.reportBindingId,
    policyIdentity: r6Evidence.policyIdentity,
    applicationIdentity: r6Evidence.applicationIdentity,
    measurementEvidenceIdentity: r6Evidence.measurementEvidenceIdentity,
    caseId: r6Evidence.caseId,
    r1ResultIdentity: r6Evidence.r1ResultIdentity,
    benchmarkId: report.benchmark_id,
    benchmarkProtocolVersion: report.benchmark_protocol_version,
    r1ManifestSetDigest: r6Evidence.r1ManifestSetDigest,
    r6ObservationSetDigest: r6Evidence.observationSetDigest,
    p2R2ObservationSetDigest: report.observation_set_digest,
    p2R2ReportIdentity: report.report_identity,
    p2R2Report: report,
  }
  const result: ContextPolicyMeasurementReportEvidence = {
    ...base,
    reportEvidenceIdentity: sha256Canonical(base),
  }
  return deepFreeze(result)
}
