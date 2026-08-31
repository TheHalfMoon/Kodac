import {
  canonicalize,
  sha256Canonical,
  validateManifestSet,
  type P2R1ManifestRecord,
} from "../p2-r1/contract.ts"
import type { P2R2Report, P2R2ReportCase } from "../p2-r2/runner.ts"
import { compareP2R4 } from "../p2-r4/comparison.ts"
import { buildContextPolicyPairwiseMetricEvidence } from "../p3-r3/context-policy-evidence.ts"
import {
  P3_R4_P3_R3_IMPLEMENTATION_MERGE,
  P3_R4_PROVENANCE_DECLARATION_KIND,
  P3_R4_PROVENANCE_DECLARATION_VERSION,
  P3_R4_PROVENANCE_EVIDENCE_KIND,
  P3_R4_PROVENANCE_EVIDENCE_VERSION,
  P3_R4_TASK_FAMILY,
  type ContextPolicyBenchmarkProvenanceEvidence,
  type P3R4CaseProvenance,
  type P3R4ProvenanceDeclaration,
} from "./contracts.ts"

const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const MAX_STABLE_ID_BYTES = 512
const SHA256 = /^sha256:[0-9a-f]{64}$/
const DECLARATION_KEYS = ["version", "kind", "qualificationId"] as const

type UnknownRecord = Record<string, unknown>

function fail(message: string): never {
  throw new TypeError(`P3-R4 contract violation: ${message}`)
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
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(`${label} must be an object`)
  }
  return value as UnknownRecord
}

function exactKeys(value: UnknownRecord, expected: readonly string[], label: string): void {
  const expectedSet = new Set(expected)
  for (const key of Object.keys(value)) {
    if (!expectedSet.has(key)) fail(`${label} contains unknown field: ${key}`)
  }
  for (const key of expected) {
    if (!Object.hasOwn(value, key)) fail(`${label} is missing required field: ${key}`)
  }
}

function canonicalString(value: unknown, label: string): string {
  if (typeof value !== "string" || value.length === 0 || value.trim() !== value || value.includes("\0")) {
    fail(`${label} must be a non-empty canonical NUL-free string`)
  }
  return value
}

function sha256Identity(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) {
    fail(`${label} must be a lowercase sha256 identity`)
  }
  return value
}

function stableId(value: unknown, label: string): string {
  const result = canonicalString(value, label)
  if (Buffer.byteLength(result, "utf8") > MAX_STABLE_ID_BYTES) {
    fail(`${label} exceeds ${MAX_STABLE_ID_BYTES} UTF-8 bytes`)
  }
  if (!STABLE_ID.test(result)) fail(`${label} must use the stable-id alphabet`)
  return result
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function orderedManifest(records: readonly P2R1ManifestRecord[]): P2R1ManifestRecord[] {
  return [...records].sort(
    (left, right) =>
      compareStrings(left.task_family, right.task_family) ||
      compareStrings(left.case_id, right.case_id) ||
      compareStrings(left.result_identity, right.result_identity),
  )
}

function normalizeDeclaration(value: unknown): P3R4ProvenanceDeclaration {
  const declaration = record(value, "provenanceDeclaration")
  exactKeys(declaration, DECLARATION_KEYS, "provenanceDeclaration")
  if (
    declaration.version !== P3_R4_PROVENANCE_DECLARATION_VERSION ||
    declaration.kind !== P3_R4_PROVENANCE_DECLARATION_KIND
  ) {
    fail("unsupported P3-R4 provenance declaration contract")
  }
  return Object.freeze({
    version: P3_R4_PROVENANCE_DECLARATION_VERSION,
    kind: P3_R4_PROVENANCE_DECLARATION_KIND,
    qualificationId: stableId(declaration.qualificationId, "provenanceDeclaration.qualificationId"),
  })
}

function reportSection(report: P2R2Report, label: string) {
  const section = report.task_family_sections.find((entry) => entry.task_family === P3_R4_TASK_FAMILY)
  if (section === undefined) fail(`${label} is missing task_family=${P3_R4_TASK_FAMILY}`)
  return section
}

function uniqueCaseMap(cases: readonly P2R2ReportCase[], label: string): Map<string, P2R2ReportCase> {
  const result = new Map<string, P2R2ReportCase>()
  for (const reportCase of cases) {
    if (result.has(reportCase.case_id)) fail(`${label} contains duplicate case_id=${reportCase.case_id}`)
    result.set(reportCase.case_id, reportCase)
  }
  return result
}

function metricTopologyFromManifest(recordValue: P2R1ManifestRecord): Array<{ metric_id: string; unit: string }> {
  const ids = new Set<string>()
  const topology = recordValue.metric_definitions.map((metric) => {
    if (metric.task_family !== P3_R4_TASK_FAMILY) {
      fail(`manifest case_id=${recordValue.case_id} contains a cross-family metric definition`)
    }
    if (ids.has(metric.metric_id)) {
      fail(`manifest case_id=${recordValue.case_id} contains duplicate metric_id=${metric.metric_id}`)
    }
    ids.add(metric.metric_id)
    return { metric_id: metric.metric_id, unit: metric.unit }
  })
  return topology.sort((left, right) => compareStrings(left.metric_id, right.metric_id))
}

function metricTopologyFromReport(
  reportCase: P2R2ReportCase,
  label: string,
): Array<{ metric_id: string; unit: string }> {
  const ids = new Set<string>()
  const topology = reportCase.metrics.map((metric) => {
    if (ids.has(metric.metric_id)) fail(`${label} contains duplicate metric_id=${metric.metric_id}`)
    ids.add(metric.metric_id)
    return { metric_id: metric.metric_id, unit: metric.unit }
  })
  return topology.sort((left, right) => compareStrings(left.metric_id, right.metric_id))
}

function assertExactTopology(
  actual: readonly { metric_id: string; unit: string }[],
  expected: readonly { metric_id: string; unit: string }[],
  label: string,
): void {
  if (actual.length !== expected.length) fail(`${label} metric cardinality does not match P2-R1 manifest`)
  for (let index = 0; index < expected.length; index += 1) {
    const left = actual[index]!
    const right = expected[index]!
    if (left.metric_id !== right.metric_id || left.unit !== right.unit) {
      fail(`${label} metric topology does not match P2-R1 manifest at index ${index}`)
    }
  }
}

function cloneAnchor(anchor: P2R1ManifestRecord["development_freeze_anchor"]) {
  return { scheme: anchor.scheme, ordinal: anchor.ordinal }
}

function cloneSource(recordValue: P2R1ManifestRecord) {
  return {
    kind: recordValue.source_provenance.kind,
    path: recordValue.source_provenance.path,
  }
}

function caseProvenance(
  records: readonly P2R1ManifestRecord[],
  leftReport: P2R2Report,
  rightReport: P2R2Report,
): readonly P3R4CaseProvenance[] {
  const relevant = records.filter((entry) => entry.task_family === P3_R4_TASK_FAMILY)
  if (relevant.length === 0) fail(`validated P2-R1 manifest has no ${P3_R4_TASK_FAMILY} records`)

  const relevantIds = new Set<string>()
  for (const entry of relevant) {
    if (relevantIds.has(entry.case_id)) fail(`validated manifest has duplicate relevant case_id=${entry.case_id}`)
    relevantIds.add(entry.case_id)
  }

  const leftCases = uniqueCaseMap(reportSection(leftReport, "left P2-R2 report").cases, "left P2-R2 report")
  const rightCases = uniqueCaseMap(reportSection(rightReport, "right P2-R2 report").cases, "right P2-R2 report")
  if (leftCases.size !== relevant.length || rightCases.size !== relevant.length) {
    fail("P2-R2 relevant case cardinality does not match validated P2-R1 manifest")
  }

  const output = relevant.map((manifestRecord) => {
    const leftCase = leftCases.get(manifestRecord.case_id)
    const rightCase = rightCases.get(manifestRecord.case_id)
    if (leftCase === undefined || rightCase === undefined) {
      fail(`validated manifest case_id=${manifestRecord.case_id} is missing from one or both P2-R2 reports`)
    }
    if (
      leftCase.r1_result_identity !== manifestRecord.result_identity ||
      rightCase.r1_result_identity !== manifestRecord.result_identity
    ) {
      fail(`case_id=${manifestRecord.case_id} does not bind exact P2-R1 result identity on both sides`)
    }

    const expectedTopology = metricTopologyFromManifest(manifestRecord)
    assertExactTopology(
      metricTopologyFromReport(leftCase, `left P2-R2 case_id=${manifestRecord.case_id}`),
      expectedTopology,
      `left P2-R2 case_id=${manifestRecord.case_id}`,
    )
    assertExactTopology(
      metricTopologyFromReport(rightCase, `right P2-R2 case_id=${manifestRecord.case_id}`),
      expectedTopology,
      `right P2-R2 case_id=${manifestRecord.case_id}`,
    )

    return {
      caseId: manifestRecord.case_id,
      r1ResultIdentity: manifestRecord.result_identity,
      corpusRole: manifestRecord.corpus_role,
      corpusId: manifestRecord.corpus_id,
      corpusDigest: manifestRecord.corpus_digest,
      holdoutId: manifestRecord.holdout_id,
      holdoutDigest: manifestRecord.holdout_digest,
      chronologyScheme: manifestRecord.chronology_scheme,
      developmentFreezeAnchor: cloneAnchor(manifestRecord.development_freeze_anchor),
      holdoutChronologyAnchor: cloneAnchor(manifestRecord.holdout_chronology_anchor),
      chronologyStatus: manifestRecord.chronology_status,
      contaminationStatus: manifestRecord.contamination_status,
      sourceProvenance: cloneSource(manifestRecord),
    }
  })

  return output.sort(
    (left, right) =>
      compareStrings(left.caseId, right.caseId) ||
      compareStrings(left.r1ResultIdentity, right.r1ResultIdentity),
  )
}

function deepFreeze<T>(value: T, seen = new WeakSet<object>()): T {
  if (value === null || typeof value !== "object" || Object.isFrozen(value)) return value
  if (seen.has(value)) fail("normalized P3-R4 evidence must not be cyclic")
  seen.add(value)
  for (const nested of Object.values(value as UnknownRecord)) deepFreeze(nested, seen)
  seen.delete(value)
  Object.freeze(value)
  return value
}

export function buildContextPolicyBenchmarkProvenanceEvidence(
  planRequestValue: unknown,
  leftPolicyValue: unknown,
  rightPolicyValue: unknown,
  leftR2ReportValue: unknown,
  leftR3SummaryValue: unknown,
  rightR2ReportValue: unknown,
  rightR3SummaryValue: unknown,
  sharedEvaluationContextValue: unknown,
  leftSubjectValue: unknown,
  rightSubjectValue: unknown,
  comparisonPolicyValue: unknown,
  p3R3DeclarationValue: unknown,
  manifestValue: unknown,
  developmentFixtureValue: unknown,
  holdoutFixtureValue: unknown,
  provenanceDeclarationValue: unknown,
): ContextPolicyBenchmarkProvenanceEvidence {
  const planRequestSnapshot = snapshot<unknown>(planRequestValue, "planRequestValue")
  const leftPolicySnapshot = snapshot<unknown>(leftPolicyValue, "leftPolicyValue")
  const rightPolicySnapshot = snapshot<unknown>(rightPolicyValue, "rightPolicyValue")
  const leftR2ReportSnapshot = snapshot<P2R2Report>(leftR2ReportValue, "leftR2ReportValue")
  const leftR3SummarySnapshot = snapshot<unknown>(leftR3SummaryValue, "leftR3SummaryValue")
  const rightR2ReportSnapshot = snapshot<P2R2Report>(rightR2ReportValue, "rightR2ReportValue")
  const rightR3SummarySnapshot = snapshot<unknown>(rightR3SummaryValue, "rightR3SummaryValue")
  const sharedEvaluationContextSnapshot = snapshot<unknown>(sharedEvaluationContextValue, "sharedEvaluationContextValue")
  const leftSubjectSnapshot = snapshot<unknown>(leftSubjectValue, "leftSubjectValue")
  const rightSubjectSnapshot = snapshot<unknown>(rightSubjectValue, "rightSubjectValue")
  const comparisonPolicySnapshot = snapshot<unknown>(comparisonPolicyValue, "comparisonPolicyValue")
  const p3R3DeclarationSnapshot = snapshot<unknown>(p3R3DeclarationValue, "p3R3DeclarationValue")
  const manifestSnapshot = snapshot<unknown>(manifestValue, "manifestValue")
  const developmentFixtureSnapshot = snapshot<unknown>(developmentFixtureValue, "developmentFixtureValue")
  const holdoutFixtureSnapshot = snapshot<unknown>(holdoutFixtureValue, "holdoutFixtureValue")
  const provenanceDeclarationSnapshot = snapshot<unknown>(
    provenanceDeclarationValue,
    "provenanceDeclarationValue",
  )

  const trustedComparison = compareP2R4(
    leftR2ReportSnapshot,
    leftR3SummarySnapshot,
    rightR2ReportSnapshot,
    rightR3SummarySnapshot,
    sharedEvaluationContextSnapshot,
    leftSubjectSnapshot,
    rightSubjectSnapshot,
    comparisonPolicySnapshot,
  )

  const trustedP3R3 = buildContextPolicyPairwiseMetricEvidence(
    planRequestSnapshot,
    leftPolicySnapshot,
    rightPolicySnapshot,
    trustedComparison,
    p3R3DeclarationSnapshot,
  )

  const validatedManifest = validateManifestSet(
    manifestSnapshot,
    developmentFixtureSnapshot,
    holdoutFixtureSnapshot,
  )
  const r1ManifestSetDigest = sha256Canonical(orderedManifest(validatedManifest))
  sha256Identity(r1ManifestSetDigest, "r1ManifestSetDigest")

  if (
    leftR2ReportSnapshot.r1_manifest_set_digest !== r1ManifestSetDigest ||
    rightR2ReportSnapshot.r1_manifest_set_digest !== r1ManifestSetDigest
  ) {
    fail("validated P2-R1 manifest digest does not match both P2-R2 reports")
  }
  if (trustedComparison.left_r2_report_identity !== leftR2ReportSnapshot.report_identity) {
    fail("trusted P2-R4 left report identity does not match the hardened left P2-R2 report")
  }
  if (trustedComparison.right_r2_report_identity !== rightR2ReportSnapshot.report_identity) {
    fail("trusted P2-R4 right report identity does not match the hardened right P2-R2 report")
  }

  if (
    trustedP3R3.benchmarkId !== trustedComparison.benchmark_id ||
    trustedP3R3.benchmarkProtocolVersion !== trustedComparison.benchmark_protocol_version ||
    trustedP3R3.taskFamily !== P3_R4_TASK_FAMILY
  ) {
    fail("trusted P3-R3 benchmark/protocol/task-family binding is inconsistent")
  }
  for (const manifestRecord of validatedManifest.filter((entry) => entry.task_family === P3_R4_TASK_FAMILY)) {
    if (
      manifestRecord.benchmark_id !== trustedP3R3.benchmarkId ||
      manifestRecord.benchmark_protocol_version !== trustedP3R3.benchmarkProtocolVersion
    ) {
      fail(`manifest case_id=${manifestRecord.case_id} does not bind trusted P3-R3 benchmark/protocol`)
    }
  }

  const declaration = normalizeDeclaration(provenanceDeclarationSnapshot)
  const cases = caseProvenance(validatedManifest, leftR2ReportSnapshot, rightR2ReportSnapshot)

  sha256Identity(trustedP3R3.evidenceIdentity, "trusted P3-R3 evidenceIdentity")
  sha256Identity(leftR2ReportSnapshot.report_identity, "left P2-R2 report_identity")
  sha256Identity(rightR2ReportSnapshot.report_identity, "right P2-R2 report_identity")

  const projection = {
    version: P3_R4_PROVENANCE_EVIDENCE_VERSION,
    kind: P3_R4_PROVENANCE_EVIDENCE_KIND,
    qualificationId: declaration.qualificationId,
    p3R3ImplementationMerge: P3_R4_P3_R3_IMPLEMENTATION_MERGE,
    p3R3EvidenceIdentity: trustedP3R3.evidenceIdentity,
    benchmarkId: canonicalString(trustedP3R3.benchmarkId, "trusted P3-R3 benchmarkId"),
    benchmarkProtocolVersion: canonicalString(
      trustedP3R3.benchmarkProtocolVersion,
      "trusted P3-R3 benchmarkProtocolVersion",
    ),
    leftR2ReportIdentity: leftR2ReportSnapshot.report_identity,
    rightR2ReportIdentity: rightR2ReportSnapshot.report_identity,
    r1ManifestSetDigest,
    taskFamily: P3_R4_TASK_FAMILY,
    caseProvenance: cases,
  }

  const result: ContextPolicyBenchmarkProvenanceEvidence = {
    version: projection.version,
    kind: projection.kind,
    provenanceEvidenceIdentity: sha256Canonical(projection),
    qualificationId: projection.qualificationId,
    p3R3ImplementationMerge: projection.p3R3ImplementationMerge,
    p3R3EvidenceIdentity: projection.p3R3EvidenceIdentity,
    benchmarkId: projection.benchmarkId,
    benchmarkProtocolVersion: projection.benchmarkProtocolVersion,
    leftR2ReportIdentity: projection.leftR2ReportIdentity,
    rightR2ReportIdentity: projection.rightR2ReportIdentity,
    r1ManifestSetDigest: projection.r1ManifestSetDigest,
    taskFamily: projection.taskFamily,
    caseProvenance: projection.caseProvenance,
  }
  sha256Identity(result.provenanceEvidenceIdentity, "provenanceEvidenceIdentity")
  return deepFreeze(result)
}
