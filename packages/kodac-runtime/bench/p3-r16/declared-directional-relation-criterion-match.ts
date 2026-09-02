import { canonicalize, sha256Canonical } from "../p2-r1/contract.ts"
import { P3_R6_DIMENSIONS } from "../p3-r6/contracts.ts"
import {
  P3_R15_DIRECTIONAL_RELATION_EVIDENCE_KIND,
  P3_R15_DIRECTIONAL_RELATION_EVIDENCE_VERSION,
  type StrategyReductionDirectionalRelationEvidence,
} from "../p3-r15/contracts.ts"
import { buildStrategyReductionDirectionalRelationEvidence } from "../p3-r15/strategy-reduction-directional-relation.ts"
import {
  P3_R16_CRITERION_DECLARATION_KIND,
  P3_R16_CRITERION_DECLARATION_VERSION,
  P3_R16_CRITERION_MATCH_EVIDENCE_KIND,
  P3_R16_CRITERION_MATCH_EVIDENCE_VERSION,
  type DeclaredStrategyDirectionalRelationCriterionMatchEvidence,
  type P3R16AllowedRelation,
  type P3R16CriterionDeclaration,
  type P3R16CriterionMatchEvidenceState,
  type P3R16CriterionState,
  type P3R16DimensionCriterionResult,
} from "./contracts.ts"

const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const SHA256 = /^sha256:[0-9a-f]{64}$/
const MAX_STABLE_ID_BYTES = 512

const DECLARATION_KEYS = [
  "version",
  "kind",
  "criterionSetId",
  "criterionPolicyIdentity",
  "dimensionCriteria",
] as const
const DIMENSION_CRITERION_KEYS = ["dimension", "metricId", "allowedRelations"] as const
const R15_ROOT_KEYS = [
  "version",
  "kind",
  "directionalRelationEvidenceIdentity",
  "pairwiseComparisonEvidenceIdentity",
  "comparisonId",
  "leftStrategySubjectIdentity",
  "rightStrategySubjectIdentity",
  "benchmarkId",
  "benchmarkProtocolVersion",
  "pairwiseComparisonEvidence",
  "dimensionRelations",
] as const

type UnknownRecord = Record<string, unknown>

function fail(message: string): never {
  throw new TypeError(`P3-R16 contract violation: ${message}`)
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
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(`${label} must be an object`)
  }
  return value as UnknownRecord
}

function exactKeys(value: object, expected: readonly string[], label: string): void {
  const actual = Object.keys(value).sort(compareStrings)
  const required = [...expected].sort(compareStrings)
  if (actual.length !== required.length || actual.some((key, index) => key !== required[index])) {
    fail(`${label} keys drifted from the canonical contract`)
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

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    for (const nested of Object.values(value as UnknownRecord)) deepFreeze(nested)
    Object.freeze(value)
  }
  return value
}

function assertDeepFrozen(value: unknown, label: string, seen = new WeakSet<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return
  seen.add(value)
  if (!Object.isFrozen(value)) fail(`${label} must be deeply frozen by canonical P3-R15`)
  for (const nested of Object.values(value as UnknownRecord)) assertDeepFrozen(nested, label, seen)
}

function assertTrustedR15(value: StrategyReductionDirectionalRelationEvidence): void {
  exactKeys(value, R15_ROOT_KEYS, "P3-R15 evidence")
  if (
    value.version !== P3_R15_DIRECTIONAL_RELATION_EVIDENCE_VERSION ||
    value.kind !== P3_R15_DIRECTIONAL_RELATION_EVIDENCE_KIND
  ) {
    fail("canonical P3-R15 returned an unsupported evidence contract")
  }
  if (value.dimensionRelations.length !== P3_R6_DIMENSIONS.length) {
    fail("canonical P3-R15 dimension count drifted")
  }
  const { directionalRelationEvidenceIdentity, ...projection } = value
  if (directionalRelationEvidenceIdentity !== sha256Canonical(projection)) {
    fail("canonical P3-R15 evidence identity does not match its self-reference-free projection")
  }
  assertDeepFrozen(value, "P3-R15 evidence")
}

function normalizeAllowedRelations(value: unknown, label: string): readonly P3R16AllowedRelation[] {
  if (!Array.isArray(value) || value.length === 0) fail(`${label} must be a non-empty array`)
  const result = value.map((entry, index) => {
    if (
      entry !== "EQUAL_RAW_VALUE" &&
      entry !== "LEFT_FAVORED_BY_DIRECTION" &&
      entry !== "RIGHT_FAVORED_BY_DIRECTION"
    ) {
      fail(`${label}[${index}] is unsupported`)
    }
    return entry
  })
  for (let index = 1; index < result.length; index += 1) {
    if (compareStrings(result[index - 1]!, result[index]!) >= 0) {
      fail(`${label} must already be strictly ordered and duplicate-free`)
    }
  }
  return Object.freeze(result)
}

function normalizeDeclaration(
  value: unknown,
  trustedR15: StrategyReductionDirectionalRelationEvidence,
): P3R16CriterionDeclaration {
  const declaration = record(value, "criterionDeclaration")
  exactKeys(declaration, DECLARATION_KEYS, "criterionDeclaration")
  if (
    declaration.version !== P3_R16_CRITERION_DECLARATION_VERSION ||
    declaration.kind !== P3_R16_CRITERION_DECLARATION_KIND
  ) {
    fail("unsupported P3-R16 criterion declaration contract")
  }
  if (!Array.isArray(declaration.dimensionCriteria)) {
    fail("criterionDeclaration.dimensionCriteria must be an array")
  }
  if (declaration.dimensionCriteria.length !== P3_R6_DIMENSIONS.length) {
    fail(`criterionDeclaration.dimensionCriteria must contain exactly ${P3_R6_DIMENSIONS.length} entries`)
  }

  const dimensionCriteria = declaration.dimensionCriteria.map((entry, index) => {
    const label = `criterionDeclaration.dimensionCriteria[${index}]`
    const criterion = record(entry, label)
    exactKeys(criterion, DIMENSION_CRITERION_KEYS, label)
    const trusted = trustedR15.dimensionRelations[index]
    const expectedDimension = P3_R6_DIMENSIONS[index]
    if (!trusted || trusted.dimension !== expectedDimension || criterion.dimension !== expectedDimension) {
      fail(`${label}.dimension does not match trusted canonical P3-R15 order`)
    }
    const metricId = stableId(criterion.metricId, `${label}.metricId`)
    if (metricId !== trusted.metricId) {
      fail(`${label}.metricId does not match trusted P3-R15 evidence`)
    }
    return Object.freeze({
      dimension: expectedDimension,
      metricId,
      allowedRelations: normalizeAllowedRelations(criterion.allowedRelations, `${label}.allowedRelations`),
    })
  })

  return deepFreeze({
    version: P3_R16_CRITERION_DECLARATION_VERSION,
    kind: P3_R16_CRITERION_DECLARATION_KIND,
    criterionSetId: stableId(declaration.criterionSetId, "criterionDeclaration.criterionSetId"),
    criterionPolicyIdentity: sha256Identity(
      declaration.criterionPolicyIdentity,
      "criterionDeclaration.criterionPolicyIdentity",
    ),
    dimensionCriteria,
  })
}

function criterionState(
  observedRelation: StrategyReductionDirectionalRelationEvidence["dimensionRelations"][number]["relation"],
  allowedRelations: readonly P3R16AllowedRelation[],
): P3R16CriterionState {
  if (observedRelation === "INSUFFICIENT_EVIDENCE") return "INSUFFICIENT_EVIDENCE"
  return allowedRelations.includes(observedRelation) ? "SATISFIED" : "NOT_SATISFIED"
}

function rootState(results: readonly P3R16DimensionCriterionResult[]): P3R16CriterionMatchEvidenceState {
  if (results.some((result) => result.criterionState === "INSUFFICIENT_EVIDENCE")) {
    return "INSUFFICIENT_DIRECTIONAL_EVIDENCE"
  }
  if (results.some((result) => result.criterionState === "NOT_SATISFIED")) {
    return "ONE_OR_MORE_DECLARED_RELATION_CRITERIA_NOT_SATISFIED"
  }
  return "ALL_DECLARED_RELATION_CRITERIA_SATISFIED"
}

export function buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence(
  leftReconstructionValue: unknown,
  rightReconstructionValue: unknown,
  comparisonDeclarationValue: unknown,
  criterionDeclarationValue: unknown,
): DeclaredStrategyDirectionalRelationCriterionMatchEvidence {
  if (arguments.length !== 4) {
    fail("buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence requires exactly four arguments")
  }

  const directionalRelationEvidence = buildStrategyReductionDirectionalRelationEvidence(
    leftReconstructionValue,
    rightReconstructionValue,
    comparisonDeclarationValue,
  )
  assertTrustedR15(directionalRelationEvidence)

  const criterionSnapshot = snapshot<unknown>(criterionDeclarationValue, "criterionDeclaration")
  const criterionDeclaration = normalizeDeclaration(criterionSnapshot, directionalRelationEvidence)

  const dimensionCriterionResults = directionalRelationEvidence.dimensionRelations.map((relation, index) => {
    const criterion = criterionDeclaration.dimensionCriteria[index]!
    return Object.freeze({
      dimension: relation.dimension,
      metricId: relation.metricId,
      observedRelation: relation.relation,
      allowedRelations: criterion.allowedRelations,
      criterionState: criterionState(relation.relation, criterion.allowedRelations),
    })
  })
  const criterionMatchEvidenceState = rootState(dimensionCriterionResults)

  const projection = {
    version: P3_R16_CRITERION_MATCH_EVIDENCE_VERSION,
    kind: P3_R16_CRITERION_MATCH_EVIDENCE_KIND,
    criterionSetId: criterionDeclaration.criterionSetId,
    criterionPolicyIdentity: criterionDeclaration.criterionPolicyIdentity,
    directionalRelationEvidenceIdentity: directionalRelationEvidence.directionalRelationEvidenceIdentity,
    comparisonId: directionalRelationEvidence.comparisonId,
    leftStrategySubjectIdentity: directionalRelationEvidence.leftStrategySubjectIdentity,
    rightStrategySubjectIdentity: directionalRelationEvidence.rightStrategySubjectIdentity,
    benchmarkId: directionalRelationEvidence.benchmarkId,
    benchmarkProtocolVersion: directionalRelationEvidence.benchmarkProtocolVersion,
    criterionDeclaration,
    directionalRelationEvidence,
    dimensionCriterionResults,
    criterionMatchEvidenceState,
  }
  const criterionMatchEvidenceIdentity = sha256Canonical(projection)

  return deepFreeze({
    version: projection.version,
    kind: projection.kind,
    criterionMatchEvidenceIdentity,
    criterionSetId: projection.criterionSetId,
    criterionPolicyIdentity: projection.criterionPolicyIdentity,
    directionalRelationEvidenceIdentity: projection.directionalRelationEvidenceIdentity,
    comparisonId: projection.comparisonId,
    leftStrategySubjectIdentity: projection.leftStrategySubjectIdentity,
    rightStrategySubjectIdentity: projection.rightStrategySubjectIdentity,
    benchmarkId: projection.benchmarkId,
    benchmarkProtocolVersion: projection.benchmarkProtocolVersion,
    criterionDeclaration: projection.criterionDeclaration,
    directionalRelationEvidence: projection.directionalRelationEvidence,
    dimensionCriterionResults: projection.dimensionCriterionResults,
    criterionMatchEvidenceState: projection.criterionMatchEvidenceState,
  })
}
