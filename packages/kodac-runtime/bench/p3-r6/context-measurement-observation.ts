import { canonicalize, sha256Canonical, validateManifestSet, type P2R1ManifestRecord } from "../p2-r1/contract.ts"
import { P2_R2_OBSERVATION_SCHEMA, type P2R2Observation } from "../p2-r2/runner.ts"
import { applyDeclaredContextSelectionPolicy } from "../../src/context-selection-policy/context-selection-policy.ts"
import type { ContextSelectionCandidate } from "../../src/context-selection-plan/contracts.ts"
import {
  P3_R6_DIMENSIONS,
  P3_R6_MEASUREMENT_DECLARATION_KIND,
  P3_R6_MEASUREMENT_DECLARATION_VERSION,
  P3_R6_MEASUREMENT_EVIDENCE_KIND,
  P3_R6_MEASUREMENT_EVIDENCE_VERSION,
  P3_R6_TASK_FAMILY,
  type ContextPolicyMeasurementDeclaration,
  type ContextPolicyMeasurementEvidence,
  type P3R6Dimension,
  type P3R6DimensionMetricBinding,
} from "./contracts.ts"

type UnknownRecord = Record<string, unknown>

const DECLARATION_KEYS = [
  "version",
  "kind",
  "measurementId",
  "caseId",
  "r1ResultIdentity",
  "taskFamily",
  "dimensionMetricBindings",
  "goldCandidateIdentities",
  "utilizedCandidateIdentities",
] as const
const BINDING_KEYS = ["dimension", "metricId", "unit"] as const
const SHA256 = /^sha256:[0-9a-f]{64}$/
const BARE_SHA256 = /^[0-9a-f]{64}$/
const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const DIMENSION_SET = new Set<string>(P3_R6_DIMENSIONS)

function fail(message: string): never {
  throw new Error(`P3-R6 contract violation: ${message}`)
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
  if (typeof value !== "object" || value === null || Array.isArray(value)) fail(`${label} must be an object`)
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
  if (typeof value !== "string" || value.length === 0 || value.trim() !== value || value.includes("\0")) {
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

function candidateIdentity(value: unknown, label: string): string {
  const result = canonicalString(value, label)
  if (!BARE_SHA256.test(result)) fail(`${label} must be a canonical P3 candidate identity`)
  return result
}

function sortedUniqueIdentities(value: unknown, label: string): readonly string[] {
  if (!Array.isArray(value)) fail(`${label} must be an array`)
  const identities = value.map((entry, index) => candidateIdentity(entry, `${label}[${index}]`))
  for (let index = 1; index < identities.length; index += 1) {
    if (compareStrings(identities[index - 1], identities[index]) >= 0) {
      fail(`${label} must be strictly sorted and duplicate-free`)
    }
  }
  return Object.freeze(identities)
}

function orderedManifest(records: readonly P2R1ManifestRecord[]): P2R1ManifestRecord[] {
  return [...records].sort(
    (left, right) =>
      compareStrings(left.task_family, right.task_family) ||
      compareStrings(left.case_id, right.case_id) ||
      compareStrings(left.result_identity, right.result_identity),
  )
}

function normalizeBindings(value: unknown, manifestRecord: P2R1ManifestRecord): readonly P3R6DimensionMetricBinding[] {
  if (!Array.isArray(value) || value.length !== P3_R6_DIMENSIONS.length) {
    fail(`measurementDeclaration.dimensionMetricBindings must contain exactly ${P3_R6_DIMENSIONS.length} entries`)
  }
  const byDimension = new Map<P3R6Dimension, P3R6DimensionMetricBinding>()
  const metricIds = new Set<string>()
  for (let index = 0; index < value.length; index += 1) {
    const item = record(value[index], `measurementDeclaration.dimensionMetricBindings[${index}]`)
    exactKeys(item, BINDING_KEYS, `measurementDeclaration.dimensionMetricBindings[${index}]`)
    if (typeof item.dimension !== "string" || !DIMENSION_SET.has(item.dimension)) {
      fail(`measurementDeclaration.dimensionMetricBindings[${index}].dimension is unsupported`)
    }
    const dimension = item.dimension as P3R6Dimension
    if (byDimension.has(dimension)) fail(`duplicate dimension binding: ${dimension}`)
    const metricId = canonicalString(item.metricId, `measurementDeclaration.dimensionMetricBindings[${index}].metricId`)
    const unit = canonicalString(item.unit, `measurementDeclaration.dimensionMetricBindings[${index}].unit`)
    if (metricIds.has(metricId)) fail(`duplicate metric binding: ${metricId}`)
    metricIds.add(metricId)
    const metric = manifestRecord.metric_definitions.find((entry) => entry.metric_id === metricId)
    if (metric === undefined) fail(`metric binding ${metricId} is not declared by the exact manifest case`)
    if (metric.task_family !== P3_R6_TASK_FAMILY) fail(`metric binding ${metricId} crosses task-family boundary`)
    if (metric.unit !== unit) fail(`metric binding ${metricId} unit does not match the manifest`)
    byDimension.set(dimension, Object.freeze({ dimension, metricId, unit }))
  }
  const normalized = P3_R6_DIMENSIONS.map((dimension) => {
    const binding = byDimension.get(dimension)
    if (binding === undefined) fail(`missing dimension binding: ${dimension}`)
    return binding
  })
  return Object.freeze(normalized)
}

function normalizeDeclaration(
  input: unknown,
  manifestRecord: P2R1ManifestRecord,
  applicationCandidates: ReadonlyMap<string, ContextSelectionCandidate>,
  selectedIdentities: ReadonlySet<string>,
): ContextPolicyMeasurementDeclaration {
  const value = record(input, "measurementDeclaration")
  exactKeys(value, DECLARATION_KEYS, "measurementDeclaration")
  if (value.version !== P3_R6_MEASUREMENT_DECLARATION_VERSION || value.kind !== P3_R6_MEASUREMENT_DECLARATION_KIND) {
    fail("unsupported measurement declaration contract")
  }
  if (value.taskFamily !== P3_R6_TASK_FAMILY) fail("measurementDeclaration.taskFamily must be context-selection")
  const measurementId = stableId(value.measurementId, "measurementDeclaration.measurementId")
  const caseId = canonicalString(value.caseId, "measurementDeclaration.caseId")
  const r1ResultIdentity = sha256(value.r1ResultIdentity, "measurementDeclaration.r1ResultIdentity")
  if (caseId !== manifestRecord.case_id) fail("measurementDeclaration.caseId does not match the exact manifest case")
  if (r1ResultIdentity !== manifestRecord.result_identity) fail("measurementDeclaration.r1ResultIdentity does not match the exact manifest case")
  const bindings = normalizeBindings(value.dimensionMetricBindings, manifestRecord)
  const gold = sortedUniqueIdentities(value.goldCandidateIdentities, "measurementDeclaration.goldCandidateIdentities")
  const utilized = sortedUniqueIdentities(value.utilizedCandidateIdentities, "measurementDeclaration.utilizedCandidateIdentities")
  for (const identity of gold) if (!applicationCandidates.has(identity)) fail(`unknown gold candidate identity: ${identity}`)
  for (const identity of utilized) if (!selectedIdentities.has(identity)) fail(`utilized candidate is not selected: ${identity}`)
  return Object.freeze({
    version: P3_R6_MEASUREMENT_DECLARATION_VERSION,
    kind: P3_R6_MEASUREMENT_DECLARATION_KIND,
    measurementId,
    caseId,
    r1ResultIdentity,
    taskFamily: P3_R6_TASK_FAMILY,
    dimensionMetricBindings: bindings,
    goldCandidateIdentities: gold,
    utilizedCandidateIdentities: utilized,
  })
}

function observed(metric: P3R6DimensionMetricBinding, record: P2R1ManifestRecord, value: boolean | number): P2R2Observation {
  if (typeof value === "number" && (!Number.isFinite(value) || value < 0 || value > 1)) fail(`${metric.dimension} produced an invalid ratio`)
  return {
    schema_version: P2_R2_OBSERVATION_SCHEMA,
    case_id: record.case_id,
    r1_result_identity: record.result_identity,
    task_family: P3_R6_TASK_FAMILY,
    metric_id: metric.metricId,
    unit: metric.unit,
    measurement_status: "observed",
    value,
  }
}

function unavailable(metric: P3R6DimensionMetricBinding, record: P2R1ManifestRecord): P2R2Observation {
  return {
    schema_version: P2_R2_OBSERVATION_SCHEMA,
    case_id: record.case_id,
    r1_result_identity: record.result_identity,
    task_family: P3_R6_TASK_FAMILY,
    metric_id: metric.metricId,
    unit: metric.unit,
    measurement_status: "unavailable",
    value: null,
  }
}

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    for (const nested of Object.values(value as UnknownRecord)) deepFreeze(nested)
    Object.freeze(value)
  }
  return value
}

export function buildContextPolicyMeasurementObservations(
  planRequestValue: unknown,
  policyValue: unknown,
  manifestInput: unknown,
  developmentInput: unknown,
  holdoutInput: unknown,
  measurementDeclarationValue: unknown,
): ContextPolicyMeasurementEvidence {
  const planRequest = snapshot<unknown>(planRequestValue, "plan request")
  const policy = snapshot<unknown>(policyValue, "policy")
  const manifestValue = snapshot<unknown>(manifestInput, "manifest")
  const development = snapshot<unknown>(developmentInput, "development corpus")
  const holdout = snapshot<unknown>(holdoutInput, "holdout corpus")
  const declarationValue = snapshot<unknown>(measurementDeclarationValue, "measurement declaration")

  const application = applyDeclaredContextSelectionPolicy(planRequest, policy)
  const manifest = validateManifestSet(manifestValue, development, holdout)
  const orderedRecords = orderedManifest(manifest)
  const matchingCases = orderedRecords.filter((entry) => entry.task_family === P3_R6_TASK_FAMILY)
  const declarationRecord = record(declarationValue, "measurementDeclaration")
  const declaredCaseId = canonicalString(declarationRecord.caseId, "measurementDeclaration.caseId")
  const manifestRecord = matchingCases.find((entry) => entry.case_id === declaredCaseId)
  if (manifestRecord === undefined) fail("measurementDeclaration.caseId is not one exact context-selection manifest case")

  const allCandidates = new Map<string, ContextSelectionCandidate>()
  for (const candidate of application.selectedCandidates) allCandidates.set(candidate.candidateIdentity, candidate)
  for (const omitted of application.omittedCandidates) allCandidates.set(omitted.candidate.candidateIdentity, omitted.candidate)
  const selectedIdentities = new Set(application.selectedCandidates.map((candidate) => candidate.candidateIdentity))
  const declaration = normalizeDeclaration(declarationValue, manifestRecord, allCandidates, selectedIdentities)
  const gold = new Set(declaration.goldCandidateIdentities)
  const utilized = new Set(declaration.utilizedCandidateIdentities)
  const selected = application.selectedCandidates
  const selectedPaths = new Set(selected.map((candidate) => candidate.subjectPath))
  const goldPaths = new Set(declaration.goldCandidateIdentities.map((identity) => allCandidates.get(identity)!.subjectPath))
  const selectedGoldCount = selected.reduce((count, candidate) => count + (gold.has(candidate.candidateIdentity) ? 1 : 0), 0)
  const selectedBytes = selected.reduce((sum, candidate) => sum + candidate.utf8Bytes, 0)
  if (!Number.isSafeInteger(selectedBytes) || selectedBytes < 0) fail("selected byte total is invalid")
  const relevantSelectedBytes = selected.reduce((sum, candidate) => sum + (gold.has(candidate.candidateIdentity) ? candidate.utf8Bytes : 0), 0)
  const irrelevantSelectedBytes = selectedBytes - relevantSelectedBytes
  const sharedPathCount = [...selectedPaths].filter((path) => goldPaths.has(path)).length
  const binding = new Map(declaration.dimensionMetricBindings.map((entry) => [entry.dimension, entry] as const))
  const metric = (dimension: P3R6Dimension): P3R6DimensionMetricBinding => binding.get(dimension)!

  const observations: P2R2Observation[] = []
  observations.push(gold.size === 0 ? unavailable(metric("recall-at-k"), manifestRecord) : observed(metric("recall-at-k"), manifestRecord, selectedGoldCount / gold.size))
  observations.push(gold.size === 0 ? unavailable(metric("precision-at-k"), manifestRecord) : observed(metric("precision-at-k"), manifestRecord, selected.length === 0 ? 0 : selectedGoldCount / selected.length))
  if (goldPaths.size === 0) observations.push(unavailable(metric("file-f1"), manifestRecord))
  else if (selectedPaths.size === 0) observations.push(observed(metric("file-f1"), manifestRecord, 0))
  else {
    const precision = sharedPathCount / selectedPaths.size
    const recall = sharedPathCount / goldPaths.size
    observations.push(observed(metric("file-f1"), manifestRecord, precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall)))
  }
  observations.push(gold.size === 0 ? unavailable(metric("token-budgeted-evidence-yield"), manifestRecord) : observed(metric("token-budgeted-evidence-yield"), manifestRecord, selectedBytes === 0 ? 0 : relevantSelectedBytes / selectedBytes))
  observations.push(gold.size !== 0 ? unavailable(metric("no-gold-abstention"), manifestRecord) : observed(metric("no-gold-abstention"), manifestRecord, selected.length === 0))
  observations.push(selected.length === 0 ? unavailable(metric("explored-vs-utilized-context"), manifestRecord) : observed(metric("explored-vs-utilized-context"), manifestRecord, utilized.size / selected.length))
  observations.push(observed(metric("context-dilution"), manifestRecord, selectedBytes === 0 ? 0 : irrelevantSelectedBytes / selectedBytes))

  const frozenObservations = deepFreeze(observations)
  const base = {
    version: P3_R6_MEASUREMENT_EVIDENCE_VERSION,
    kind: P3_R6_MEASUREMENT_EVIDENCE_KIND,
    measurementDeclaration: declaration,
    measurementId: declaration.measurementId,
    applicationIdentity: application.applicationIdentity,
    policyIdentity: application.policyIdentity,
    planIdentity: application.planIdentity,
    requestIdentity: application.requestIdentity,
    candidateSetIdentity: application.candidateSetIdentity,
    repositoryIdentity: application.repositoryIdentity,
    snapshotIdentity: application.snapshotIdentity,
    contentIdentity: application.contentIdentity,
    taskIdentity: application.taskIdentity,
    caseId: manifestRecord.case_id,
    r1ResultIdentity: manifestRecord.result_identity,
    r1ManifestSetDigest: sha256Canonical(orderedRecords),
    observationSetDigest: sha256Canonical(frozenObservations),
    observations: frozenObservations,
  }
  const result: ContextPolicyMeasurementEvidence = {
    ...base,
    measurementEvidenceIdentity: sha256Canonical(base),
  }
  return deepFreeze(result)
}
