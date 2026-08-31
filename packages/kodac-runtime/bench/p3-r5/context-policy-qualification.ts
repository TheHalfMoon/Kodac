import {
  canonicalize,
  sha256Canonical,
} from "../p2-r1/contract.ts"
import { compareP2R4 } from "../p2-r4/comparison.ts"
import type { P2R5MetricRelation, P2R5Relation } from "../p2-r5/relation.ts"
import {
  P3_R3_CONTEXT_EVIDENCE_DIMENSIONS,
  type ContextPolicyPairwiseMetricEvidence,
} from "../p3-r3/contracts.ts"
import { buildContextPolicyPairwiseMetricEvidence } from "../p3-r3/context-policy-evidence.ts"
import type {
  ContextPolicyBenchmarkProvenanceEvidence,
  P3R4CaseProvenance,
} from "../p3-r4/contracts.ts"
import { buildContextPolicyBenchmarkProvenanceEvidence } from "../p3-r4/context-policy-provenance.ts"
import {
  P3_R5_CHRONOLOGY_STATUSES,
  P3_R5_CONTAMINATION_STATUSES,
  P3_R5_CORPUS_ROLES,
  P3_R5_QUALIFICATION_DECLARATION_KIND,
  P3_R5_QUALIFICATION_DECLARATION_VERSION,
  P3_R5_QUALIFICATION_EVIDENCE_KIND,
  P3_R5_QUALIFICATION_EVIDENCE_VERSION,
  P3_R5_TASK_FAMILY,
  type DeclaredContextPolicyQualificationEvidence,
  type P3R5AllowedMetricRelation,
  type P3R5ChronologyStatus,
  type P3R5ContaminationStatus,
  type P3R5CorpusRole,
  type P3R5MetricCriterion,
  type P3R5MetricCriterionResult,
  type P3R5ProvenanceCriteria,
  type P3R5ProvenanceCriterionResult,
  type P3R5QualificationDeclaration,
  type P3R5QualificationEvidenceState,
} from "./contracts.ts"

const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const MAX_STABLE_ID_BYTES = 512
const SHA256 = /^sha256:[0-9a-f]{64}$/

type UnknownRecord = Record<string, unknown>

const DECLARATION_KEYS = [
  "version",
  "kind",
  "qualificationId",
  "qualificationPolicyIdentity",
  "metricCriteria",
  "provenanceCriteria",
] as const
const METRIC_CRITERION_KEYS = ["dimension", "metricId", "allowedRelations"] as const
const PROVENANCE_CRITERIA_KEYS = [
  "requiredCorpusRoles",
  "allowedChronologyStatuses",
  "allowedContaminationStatuses",
] as const

function fail(message: string): never {
  throw new TypeError(`P3-R5 contract violation: ${message}`)
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

function stableId(value: unknown, label: string): string {
  if (typeof value !== "string" || value.length === 0 || value.trim() !== value || value.includes("\0")) {
    fail(`${label} must be a non-empty canonical NUL-free string`)
  }
  if (Buffer.byteLength(value, "utf8") > MAX_STABLE_ID_BYTES) {
    fail(`${label} exceeds ${MAX_STABLE_ID_BYTES} UTF-8 bytes`)
  }
  if (!STABLE_ID.test(value)) fail(`${label} must use the stable-id alphabet`)
  return value
}

function sha256Identity(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) {
    fail(`${label} must be a lowercase sha256 identity`)
  }
  return value
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function denseArray(value: unknown, label: string): unknown[] {
  if (!Array.isArray(value)) fail(`${label} must be an array`)
  return value
}

function strictlySorted(values: readonly string[], label: string): void {
  for (let index = 1; index < values.length; index += 1) {
    if (compareStrings(values[index - 1]!, values[index]!) >= 0) {
      fail(`${label} must be strictly sorted and duplicate-free`)
    }
  }
}

function normalizeAllowedRelations(value: unknown, label: string): readonly P3R5AllowedMetricRelation[] {
  const values = denseArray(value, label)
  if (values.length === 0) fail(`${label} must be non-empty`)
  const result = values.map((entry, index) => {
    if (
      entry !== "EQUAL_RAW_VALUE" &&
      entry !== "LEFT_FAVORED_BY_DIRECTION" &&
      entry !== "RIGHT_FAVORED_BY_DIRECTION"
    ) {
      fail(`${label}[${index}] is unsupported`)
    }
    return entry
  })
  strictlySorted(result, label)
  return Object.freeze(result)
}

function normalizeCorpusRoles(value: unknown, label: string): readonly P3R5CorpusRole[] {
  const values = denseArray(value, label)
  if (values.length === 0) fail(`${label} must be non-empty`)
  const result = values.map((entry, index) => {
    if (entry !== "development" && entry !== "holdout") fail(`${label}[${index}] is unsupported`)
    return entry
  })
  strictlySorted(result, label)
  return Object.freeze(result)
}

function normalizeChronologyStatuses(value: unknown, label: string): readonly P3R5ChronologyStatus[] {
  const values = denseArray(value, label)
  if (values.length === 0) fail(`${label} must be non-empty`)
  const result = values.map((entry, index) => {
    if (
      entry !== "chronology-unproven" &&
      entry !== "later-in-time" &&
      entry !== "not-later-in-time"
    ) {
      fail(`${label}[${index}] is unsupported`)
    }
    return entry
  })
  strictlySorted(result, label)
  return Object.freeze(result)
}

function normalizeContaminationStatuses(value: unknown, label: string): readonly P3R5ContaminationStatus[] {
  const values = denseArray(value, label)
  if (values.length === 0) fail(`${label} must be non-empty`)
  const result = values.map((entry, index) => {
    if (entry !== "known" && entry !== "none-known" && entry !== "unknown") {
      fail(`${label}[${index}] is unsupported`)
    }
    return entry
  })
  strictlySorted(result, label)
  return Object.freeze(result)
}

function normalizeMetricCriteria(
  value: unknown,
  trustedP3R3: ContextPolicyPairwiseMetricEvidence,
): readonly P3R5MetricCriterion[] {
  const entries = denseArray(value, "qualificationDeclaration.metricCriteria")
  if (entries.length !== P3_R3_CONTEXT_EVIDENCE_DIMENSIONS.length) {
    fail(`qualificationDeclaration.metricCriteria must contain exactly ${P3_R3_CONTEXT_EVIDENCE_DIMENSIONS.length} entries`)
  }
  if (trustedP3R3.dimensionMetricBindings.length !== P3_R3_CONTEXT_EVIDENCE_DIMENSIONS.length) {
    fail("trusted P3-R3 dimension bindings are not canonically closed")
  }

  const metricIds = new Set<string>()
  const result = entries.map((entry, index) => {
    const label = `qualificationDeclaration.metricCriteria[${index}]`
    const criterion = record(entry, label)
    exactKeys(criterion, METRIC_CRITERION_KEYS, label)
    const expectedDimension = P3_R3_CONTEXT_EVIDENCE_DIMENSIONS[index]!
    const expectedBinding = trustedP3R3.dimensionMetricBindings[index]!
    if (criterion.dimension !== expectedDimension || expectedBinding.dimension !== expectedDimension) {
      fail(`${label}.dimension must be ${expectedDimension}`)
    }
    const metricId = stableId(criterion.metricId, `${label}.metricId`)
    if (metricId !== expectedBinding.metricId) {
      fail(`${label}.metricId does not match canonical P3-R3 dimension binding`)
    }
    if (metricIds.has(metricId)) fail(`duplicate qualification metricId: ${metricId}`)
    metricIds.add(metricId)
    return Object.freeze({
      dimension: expectedDimension,
      metricId,
      allowedRelations: normalizeAllowedRelations(criterion.allowedRelations, `${label}.allowedRelations`),
    })
  })
  return Object.freeze(result)
}

function normalizeProvenanceCriteria(value: unknown): P3R5ProvenanceCriteria {
  const criteria = record(value, "qualificationDeclaration.provenanceCriteria")
  exactKeys(criteria, PROVENANCE_CRITERIA_KEYS, "qualificationDeclaration.provenanceCriteria")
  return Object.freeze({
    requiredCorpusRoles: normalizeCorpusRoles(
      criteria.requiredCorpusRoles,
      "qualificationDeclaration.provenanceCriteria.requiredCorpusRoles",
    ),
    allowedChronologyStatuses: normalizeChronologyStatuses(
      criteria.allowedChronologyStatuses,
      "qualificationDeclaration.provenanceCriteria.allowedChronologyStatuses",
    ),
    allowedContaminationStatuses: normalizeContaminationStatuses(
      criteria.allowedContaminationStatuses,
      "qualificationDeclaration.provenanceCriteria.allowedContaminationStatuses",
    ),
  })
}

function normalizeDeclaration(
  value: unknown,
  trustedP3R3: ContextPolicyPairwiseMetricEvidence,
): P3R5QualificationDeclaration {
  const declaration = record(value, "qualificationDeclaration")
  exactKeys(declaration, DECLARATION_KEYS, "qualificationDeclaration")
  if (
    declaration.version !== P3_R5_QUALIFICATION_DECLARATION_VERSION ||
    declaration.kind !== P3_R5_QUALIFICATION_DECLARATION_KIND
  ) {
    fail("unsupported P3-R5 qualification declaration contract")
  }
  return Object.freeze({
    version: P3_R5_QUALIFICATION_DECLARATION_VERSION,
    kind: P3_R5_QUALIFICATION_DECLARATION_KIND,
    qualificationId: stableId(declaration.qualificationId, "qualificationDeclaration.qualificationId"),
    qualificationPolicyIdentity: sha256Identity(
      declaration.qualificationPolicyIdentity,
      "qualificationDeclaration.qualificationPolicyIdentity",
    ),
    metricCriteria: normalizeMetricCriteria(declaration.metricCriteria, trustedP3R3),
    provenanceCriteria: normalizeProvenanceCriteria(declaration.provenanceCriteria),
  })
}

function validatePredecessorBinding(
  trustedP3R3: ContextPolicyPairwiseMetricEvidence,
  trustedP3R4: ContextPolicyBenchmarkProvenanceEvidence,
  declaration: P3R5QualificationDeclaration,
): void {
  sha256Identity(trustedP3R3.evidenceIdentity, "trusted P3-R3 evidenceIdentity")
  sha256Identity(trustedP3R4.provenanceEvidenceIdentity, "trusted P3-R4 provenanceEvidenceIdentity")
  if (
    declaration.qualificationId !== trustedP3R3.qualificationId ||
    declaration.qualificationId !== trustedP3R4.qualificationId
  ) {
    fail("qualificationId must match declaration, canonical P3-R3 evidence, and canonical P3-R4 evidence")
  }
  if (trustedP3R4.p3R3EvidenceIdentity !== trustedP3R3.evidenceIdentity) {
    fail("canonical P3-R4 p3R3EvidenceIdentity does not match reconstructed P3-R3 evidence")
  }
  if (
    trustedP3R3.benchmarkId !== trustedP3R4.benchmarkId ||
    trustedP3R3.benchmarkProtocolVersion !== trustedP3R4.benchmarkProtocolVersion
  ) {
    fail("canonical P3-R3/P3-R4 benchmark or protocol identity mismatch")
  }
  if (trustedP3R3.taskFamily !== P3_R5_TASK_FAMILY || trustedP3R4.taskFamily !== P3_R5_TASK_FAMILY) {
    fail(`canonical P3-R3/P3-R4 task family must be ${P3_R5_TASK_FAMILY}`)
  }
  if (
    trustedP3R3.leftPolicyId === trustedP3R3.rightPolicyId ||
    trustedP3R3.leftPolicyIdentity === trustedP3R3.rightPolicyIdentity
  ) {
    fail("canonical P3-R3 left/right policy subjects must remain distinct")
  }
}

function metricById(trustedP3R3: ContextPolicyPairwiseMetricEvidence): Map<string, P2R5MetricRelation> {
  const result = new Map<string, P2R5MetricRelation>()
  for (const metric of trustedP3R3.metricRelations) {
    if (result.has(metric.metric_id)) fail(`canonical P3-R3 contains duplicate metric_id=${metric.metric_id}`)
    if ((metric.status === "INSUFFICIENT_EVIDENCE") !== (metric.relation === "INSUFFICIENT_EVIDENCE")) {
      fail(`canonical P3-R3 metric status/relation mismatch for metric_id=${metric.metric_id}`)
    }
    result.set(metric.metric_id, metric)
  }
  return result
}

function metricResults(
  trustedP3R3: ContextPolicyPairwiseMetricEvidence,
  criteria: readonly P3R5MetricCriterion[],
): readonly P3R5MetricCriterionResult[] {
  const byId = metricById(trustedP3R3)
  const results = criteria.map((criterion) => {
    const metric = byId.get(criterion.metricId)
    if (metric === undefined) fail(`canonical P3-R3 metric is missing: ${criterion.metricId}`)
    const observedRelation: P2R5Relation = metric.relation
    let criterionState: P3R5MetricCriterionResult["criterionState"]
    if (observedRelation === "INSUFFICIENT_EVIDENCE") {
      criterionState = "INSUFFICIENT_EVIDENCE"
    } else {
      criterionState = criterion.allowedRelations.includes(observedRelation)
        ? "SATISFIED"
        : "NOT_SATISFIED"
    }
    return Object.freeze({
      dimension: criterion.dimension,
      metricId: criterion.metricId,
      observedRelation,
      allowedRelations: criterion.allowedRelations,
      criterionState,
    })
  })
  const hasInsufficient = results.some((entry) => entry.criterionState === "INSUFFICIENT_EVIDENCE")
  if (
    (trustedP3R3.metricEvidenceState === "all-required-metrics-comparable" && hasInsufficient) ||
    (trustedP3R3.metricEvidenceState === "one-or-more-required-metrics-insufficient" && !hasInsufficient)
  ) {
    fail("canonical P3-R3 aggregate comparability state does not match metric relations")
  }
  return Object.freeze(results)
}

function observedCorpusRoles(cases: readonly P3R4CaseProvenance[]): readonly P3R5CorpusRole[] {
  const values = [...new Set(cases.map((entry) => entry.corpusRole))].sort(compareStrings)
  for (const value of values) {
    if (!P3_R5_CORPUS_ROLES.includes(value)) fail(`canonical P3-R4 corpus role is unsupported: ${value}`)
  }
  return Object.freeze(values)
}

function observedChronologyStatuses(cases: readonly P3R4CaseProvenance[]): readonly P3R5ChronologyStatus[] {
  const values = [...new Set(cases.map((entry) => entry.chronologyStatus))].sort(compareStrings)
  for (const value of values) {
    if (!P3_R5_CHRONOLOGY_STATUSES.includes(value)) {
      fail(`canonical P3-R4 chronology status is unsupported: ${value}`)
    }
  }
  return Object.freeze(values)
}

function observedContaminationStatuses(cases: readonly P3R4CaseProvenance[]): readonly P3R5ContaminationStatus[] {
  const values = [...new Set(cases.map((entry) => entry.contaminationStatus))].sort(compareStrings)
  for (const value of values) {
    if (!P3_R5_CONTAMINATION_STATUSES.includes(value)) {
      fail(`canonical P3-R4 contamination status is unsupported: ${value}`)
    }
  }
  return Object.freeze(values)
}

function provenanceResult(
  trustedP3R4: ContextPolicyBenchmarkProvenanceEvidence,
  criteria: P3R5ProvenanceCriteria,
): P3R5ProvenanceCriterionResult {
  const roles = observedCorpusRoles(trustedP3R4.caseProvenance)
  const chronology = observedChronologyStatuses(trustedP3R4.caseProvenance)
  const contamination = observedContaminationStatuses(trustedP3R4.caseProvenance)
  return Object.freeze({
    requiredCorpusRoles: criteria.requiredCorpusRoles,
    observedCorpusRoles: roles,
    allowedChronologyStatuses: criteria.allowedChronologyStatuses,
    observedChronologyStatuses: chronology,
    allowedContaminationStatuses: criteria.allowedContaminationStatuses,
    observedContaminationStatuses: contamination,
    corpusRoleCriterionState: criteria.requiredCorpusRoles.every((entry) => roles.includes(entry))
      ? "SATISFIED"
      : "NOT_SATISFIED",
    chronologyCriterionState: chronology.every((entry) => criteria.allowedChronologyStatuses.includes(entry))
      ? "SATISFIED"
      : "NOT_SATISFIED",
    contaminationCriterionState: contamination.every((entry) => criteria.allowedContaminationStatuses.includes(entry))
      ? "SATISFIED"
      : "NOT_SATISFIED",
  })
}

function qualificationState(
  metrics: readonly P3R5MetricCriterionResult[],
  provenance: P3R5ProvenanceCriterionResult,
): P3R5QualificationEvidenceState {
  if (metrics.some((entry) => entry.criterionState === "INSUFFICIENT_EVIDENCE")) {
    return "INSUFFICIENT_COMPARABLE_EVIDENCE"
  }
  if (
    metrics.some((entry) => entry.criterionState === "NOT_SATISFIED") ||
    provenance.corpusRoleCriterionState === "NOT_SATISFIED" ||
    provenance.chronologyCriterionState === "NOT_SATISFIED" ||
    provenance.contaminationCriterionState === "NOT_SATISFIED"
  ) {
    return "ONE_OR_MORE_DECLARED_CRITERIA_NOT_SATISFIED"
  }
  return "ALL_DECLARED_CRITERIA_SATISFIED"
}

function deepFreeze<T>(value: T, seen = new WeakSet<object>()): T {
  if (value === null || typeof value !== "object") return value
  if (seen.has(value)) fail("normalized P3-R5 evidence must not be cyclic")
  seen.add(value)
  for (const nested of Object.values(value as UnknownRecord)) deepFreeze(nested, seen)
  seen.delete(value)
  if (!Object.isFrozen(value)) Object.freeze(value)
  return value
}

export function buildDeclaredContextPolicyQualificationEvidence(
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
  p3R4ProvenanceDeclarationValue: unknown,
  qualificationDeclarationValue: unknown,
): DeclaredContextPolicyQualificationEvidence {
  const planRequestSnapshot = snapshot<unknown>(planRequestValue, "planRequestValue")
  const leftPolicySnapshot = snapshot<unknown>(leftPolicyValue, "leftPolicyValue")
  const rightPolicySnapshot = snapshot<unknown>(rightPolicyValue, "rightPolicyValue")
  const leftR2ReportSnapshot = snapshot<unknown>(leftR2ReportValue, "leftR2ReportValue")
  const leftR3SummarySnapshot = snapshot<unknown>(leftR3SummaryValue, "leftR3SummaryValue")
  const rightR2ReportSnapshot = snapshot<unknown>(rightR2ReportValue, "rightR2ReportValue")
  const rightR3SummarySnapshot = snapshot<unknown>(rightR3SummaryValue, "rightR3SummaryValue")
  const sharedEvaluationContextSnapshot = snapshot<unknown>(sharedEvaluationContextValue, "sharedEvaluationContextValue")
  const leftSubjectSnapshot = snapshot<unknown>(leftSubjectValue, "leftSubjectValue")
  const rightSubjectSnapshot = snapshot<unknown>(rightSubjectValue, "rightSubjectValue")
  const comparisonPolicySnapshot = snapshot<unknown>(comparisonPolicyValue, "comparisonPolicyValue")
  const p3R3DeclarationSnapshot = snapshot<unknown>(p3R3DeclarationValue, "p3R3DeclarationValue")
  const manifestSnapshot = snapshot<unknown>(manifestValue, "manifestValue")
  const developmentFixtureSnapshot = snapshot<unknown>(developmentFixtureValue, "developmentFixtureValue")
  const holdoutFixtureSnapshot = snapshot<unknown>(holdoutFixtureValue, "holdoutFixtureValue")
  const p3R4ProvenanceDeclarationSnapshot = snapshot<unknown>(
    p3R4ProvenanceDeclarationValue,
    "p3R4ProvenanceDeclarationValue",
  )
  const qualificationDeclarationSnapshot = snapshot<unknown>(
    qualificationDeclarationValue,
    "qualificationDeclarationValue",
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
  const trustedP3R4 = buildContextPolicyBenchmarkProvenanceEvidence(
    planRequestSnapshot,
    leftPolicySnapshot,
    rightPolicySnapshot,
    leftR2ReportSnapshot,
    leftR3SummarySnapshot,
    rightR2ReportSnapshot,
    rightR3SummarySnapshot,
    sharedEvaluationContextSnapshot,
    leftSubjectSnapshot,
    rightSubjectSnapshot,
    comparisonPolicySnapshot,
    p3R3DeclarationSnapshot,
    manifestSnapshot,
    developmentFixtureSnapshot,
    holdoutFixtureSnapshot,
    p3R4ProvenanceDeclarationSnapshot,
  )

  const declaration = normalizeDeclaration(qualificationDeclarationSnapshot, trustedP3R3)
  validatePredecessorBinding(trustedP3R3, trustedP3R4, declaration)
  const metrics = metricResults(trustedP3R3, declaration.metricCriteria)
  const provenance = provenanceResult(trustedP3R4, declaration.provenanceCriteria)
  const state = qualificationState(metrics, provenance)

  const projection = {
    version: P3_R5_QUALIFICATION_EVIDENCE_VERSION,
    kind: P3_R5_QUALIFICATION_EVIDENCE_KIND,
    qualificationId: declaration.qualificationId,
    qualificationPolicyIdentity: declaration.qualificationPolicyIdentity,
    p3R3EvidenceIdentity: trustedP3R3.evidenceIdentity,
    p3R4ProvenanceEvidenceIdentity: trustedP3R4.provenanceEvidenceIdentity,
    benchmarkId: trustedP3R3.benchmarkId,
    benchmarkProtocolVersion: trustedP3R3.benchmarkProtocolVersion,
    taskFamily: P3_R5_TASK_FAMILY,
    leftPolicyId: trustedP3R3.leftPolicyId,
    leftPolicyIdentity: trustedP3R3.leftPolicyIdentity,
    rightPolicyId: trustedP3R3.rightPolicyId,
    rightPolicyIdentity: trustedP3R3.rightPolicyIdentity,
    metricCriterionResults: metrics,
    provenanceCriterionResults: provenance,
    qualificationEvidenceState: state,
  }
  const result: DeclaredContextPolicyQualificationEvidence = {
    version: projection.version,
    kind: projection.kind,
    qualificationEvidenceIdentity: sha256Canonical(projection),
    qualificationId: projection.qualificationId,
    qualificationPolicyIdentity: projection.qualificationPolicyIdentity,
    p3R3EvidenceIdentity: projection.p3R3EvidenceIdentity,
    p3R4ProvenanceEvidenceIdentity: projection.p3R4ProvenanceEvidenceIdentity,
    benchmarkId: projection.benchmarkId,
    benchmarkProtocolVersion: projection.benchmarkProtocolVersion,
    taskFamily: projection.taskFamily,
    leftPolicyId: projection.leftPolicyId,
    leftPolicyIdentity: projection.leftPolicyIdentity,
    rightPolicyId: projection.rightPolicyId,
    rightPolicyIdentity: projection.rightPolicyIdentity,
    metricCriterionResults: projection.metricCriterionResults,
    provenanceCriterionResults: projection.provenanceCriterionResults,
    qualificationEvidenceState: projection.qualificationEvidenceState,
  }
  sha256Identity(result.qualificationEvidenceIdentity, "qualificationEvidenceIdentity")
  return deepFreeze(result)
}
