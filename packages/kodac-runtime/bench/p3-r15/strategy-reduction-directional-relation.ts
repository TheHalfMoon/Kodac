import { sha256Canonical } from "../p2-r1/contract.ts"
import { P3_R6_DIMENSIONS } from "../p3-r6/contracts.ts"
import {
  P3_R14_COMPARISON_EVIDENCE_KIND,
  P3_R14_COMPARISON_EVIDENCE_VERSION,
  type P3R14DimensionComparison,
  type StrategyReductionPairwiseComparisonEvidence,
} from "../p3-r14/contracts.ts"
import { buildStrategyReductionPairwiseComparisonEvidence } from "../p3-r14/strategy-reduction-pairwise-comparison.ts"
import {
  P3_R15_DIRECTIONAL_RELATION_EVIDENCE_KIND,
  P3_R15_DIRECTIONAL_RELATION_EVIDENCE_VERSION,
  type P3R15DimensionRelation,
  type P3R15DirectionalRelation,
  type StrategyReductionDirectionalRelationEvidence,
} from "./contracts.ts"

const R14_ROOT_KEYS = [
  "version",
  "kind",
  "comparisonEvidenceIdentity",
  "comparisonDeclaration",
  "comparisonId",
  "leftDirectionBindingEvidenceIdentity",
  "rightDirectionBindingEvidenceIdentity",
  "leftStrategySubjectIdentity",
  "rightStrategySubjectIdentity",
  "benchmarkId",
  "benchmarkProtocolVersion",
  "leftDirectionBindingEvidence",
  "rightDirectionBindingEvidence",
  "dimensionComparisons",
] as const

const R14_DIMENSION_KEYS = [
  "dimension",
  "metricId",
  "inputUnit",
  "outputUnit",
  "valueKind",
  "reducer",
  "missingnessPolicy",
  "minimumObservedCount",
  "expectedCount",
  "direction",
  "leftStatus",
  "rightStatus",
  "comparisonStatus",
  "leftReducedValue",
  "rightReducedValue",
  "rawDeltaLeftMinusRight",
] as const

type UnknownRecord = Record<string, unknown>

function fail(message: string): never {
  throw new Error(`P3-R15 contract violation: ${message}`)
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function exactKeys(value: object, expected: readonly string[], label: string): void {
  const actual = Object.keys(value).sort(compareStrings)
  const required = [...expected].sort(compareStrings)
  if (actual.length !== required.length || actual.some((key, index) => key !== required[index])) {
    fail(`${label} keys drifted from the canonical predecessor contract`)
  }
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
  if (!Object.isFrozen(value)) fail(`${label} must be deeply frozen by canonical P3-R14`)
  for (const nested of Object.values(value as UnknownRecord)) assertDeepFrozen(nested, label, seen)
}

function assertTrustedR14Root(value: StrategyReductionPairwiseComparisonEvidence): void {
  exactKeys(value, R14_ROOT_KEYS, "P3-R14 evidence")
  if (
    value.version !== P3_R14_COMPARISON_EVIDENCE_VERSION ||
    value.kind !== P3_R14_COMPARISON_EVIDENCE_KIND
  ) {
    fail("canonical P3-R14 returned an unsupported evidence contract")
  }
  if (value.dimensionComparisons.length !== P3_R6_DIMENSIONS.length) {
    fail("canonical P3-R14 dimension count drifted")
  }

  const { comparisonEvidenceIdentity, ...projection } = value
  if (comparisonEvidenceIdentity !== sha256Canonical(projection)) {
    fail("canonical P3-R14 evidence identity does not match its self-reference-free projection")
  }
  assertDeepFrozen(value, "P3-R14 evidence")
}

function deriveRelation(
  comparison: P3R14DimensionComparison,
  index: number,
): P3R15DirectionalRelation {
  exactKeys(comparison, R14_DIMENSION_KEYS, `dimensionComparisons[${index}]`)

  const expectedDimension = P3_R6_DIMENSIONS[index]
  if (comparison.dimension !== expectedDimension) {
    fail(`canonical dimension order drifted at index ${index}`)
  }
  if (comparison.expectedCount !== 2) {
    fail(`dimensionComparisons[${index}].expectedCount must remain exactly two`)
  }
  if (comparison.direction !== "HIGHER_IS_BETTER" && comparison.direction !== "LOWER_IS_BETTER") {
    fail(`dimensionComparisons[${index}].direction is unsupported`)
  }
  if (
    comparison.leftStatus !== "REDUCED" &&
    comparison.leftStatus !== "INSUFFICIENT_EVIDENCE"
  ) {
    fail(`dimensionComparisons[${index}].leftStatus is unsupported`)
  }
  if (
    comparison.rightStatus !== "REDUCED" &&
    comparison.rightStatus !== "INSUFFICIENT_EVIDENCE"
  ) {
    fail(`dimensionComparisons[${index}].rightStatus is unsupported`)
  }

  if (comparison.comparisonStatus === "INSUFFICIENT_EVIDENCE") {
    if (
      comparison.leftStatus === "REDUCED" &&
      comparison.rightStatus === "REDUCED"
    ) {
      fail(`dimensionComparisons[${index}] insufficient status contradicts both REDUCED sides`)
    }
    if (
      comparison.leftReducedValue !== null ||
      comparison.rightReducedValue !== null ||
      comparison.rawDeltaLeftMinusRight !== null
    ) {
      fail(`dimensionComparisons[${index}] insufficient evidence requires null comparison numerics`)
    }
    return "INSUFFICIENT_EVIDENCE"
  }

  if (comparison.comparisonStatus !== "COMPARABLE") {
    fail(`dimensionComparisons[${index}].comparisonStatus is unsupported`)
  }
  if (comparison.leftStatus !== "REDUCED" || comparison.rightStatus !== "REDUCED") {
    fail(`dimensionComparisons[${index}] comparable evidence requires both sides REDUCED`)
  }

  const left = comparison.leftReducedValue
  const right = comparison.rightReducedValue
  const delta = comparison.rawDeltaLeftMinusRight
  if (
    typeof left !== "number" ||
    !Number.isFinite(left) ||
    typeof right !== "number" ||
    !Number.isFinite(right) ||
    typeof delta !== "number" ||
    !Number.isFinite(delta)
  ) {
    fail(`dimensionComparisons[${index}] comparable numerics must be finite numbers`)
  }

  const expectedDelta = left - right
  if (!Number.isFinite(expectedDelta) || delta !== expectedDelta) {
    fail(`dimensionComparisons[${index}].rawDeltaLeftMinusRight is inconsistent`)
  }

  if (left === right) {
    if (delta !== 0) fail(`dimensionComparisons[${index}] equal values require zero raw delta`)
    return "EQUAL_RAW_VALUE"
  }
  if (delta === 0) fail(`dimensionComparisons[${index}] unequal values cannot have zero raw delta`)

  if (comparison.direction === "HIGHER_IS_BETTER") {
    return left > right ? "LEFT_FAVORED_BY_DIRECTION" : "RIGHT_FAVORED_BY_DIRECTION"
  }
  return left < right ? "LEFT_FAVORED_BY_DIRECTION" : "RIGHT_FAVORED_BY_DIRECTION"
}

function relationEntry(
  comparison: P3R14DimensionComparison,
  index: number,
): P3R15DimensionRelation {
  const relation = deriveRelation(comparison, index)
  return deepFreeze({
    dimension: comparison.dimension,
    metricId: comparison.metricId,
    inputUnit: comparison.inputUnit,
    outputUnit: comparison.outputUnit,
    valueKind: comparison.valueKind,
    reducer: comparison.reducer,
    missingnessPolicy: comparison.missingnessPolicy,
    minimumObservedCount: comparison.minimumObservedCount,
    expectedCount: comparison.expectedCount,
    direction: comparison.direction,
    leftStatus: comparison.leftStatus,
    rightStatus: comparison.rightStatus,
    comparisonStatus: comparison.comparisonStatus,
    leftReducedValue: comparison.leftReducedValue,
    rightReducedValue: comparison.rightReducedValue,
    rawDeltaLeftMinusRight: comparison.rawDeltaLeftMinusRight,
    relation,
  })
}

export function buildStrategyReductionDirectionalRelationEvidence(
  leftReconstructionValue: unknown,
  rightReconstructionValue: unknown,
  comparisonDeclarationValue: unknown,
): StrategyReductionDirectionalRelationEvidence {
  if (arguments.length !== 3) {
    fail("buildStrategyReductionDirectionalRelationEvidence requires exactly three arguments")
  }

  const pairwiseComparisonEvidence = buildStrategyReductionPairwiseComparisonEvidence(
    leftReconstructionValue,
    rightReconstructionValue,
    comparisonDeclarationValue,
  )

  assertTrustedR14Root(pairwiseComparisonEvidence)
  const dimensionRelations = pairwiseComparisonEvidence.dimensionComparisons.map(relationEntry)

  const projection = {
    version: P3_R15_DIRECTIONAL_RELATION_EVIDENCE_VERSION,
    kind: P3_R15_DIRECTIONAL_RELATION_EVIDENCE_KIND,
    pairwiseComparisonEvidenceIdentity: pairwiseComparisonEvidence.comparisonEvidenceIdentity,
    comparisonId: pairwiseComparisonEvidence.comparisonId,
    leftStrategySubjectIdentity: pairwiseComparisonEvidence.leftStrategySubjectIdentity,
    rightStrategySubjectIdentity: pairwiseComparisonEvidence.rightStrategySubjectIdentity,
    benchmarkId: pairwiseComparisonEvidence.benchmarkId,
    benchmarkProtocolVersion: pairwiseComparisonEvidence.benchmarkProtocolVersion,
    pairwiseComparisonEvidence,
    dimensionRelations,
  }
  const directionalRelationEvidenceIdentity = sha256Canonical(projection)

  return deepFreeze({
    version: projection.version,
    kind: projection.kind,
    directionalRelationEvidenceIdentity,
    pairwiseComparisonEvidenceIdentity: projection.pairwiseComparisonEvidenceIdentity,
    comparisonId: projection.comparisonId,
    leftStrategySubjectIdentity: projection.leftStrategySubjectIdentity,
    rightStrategySubjectIdentity: projection.rightStrategySubjectIdentity,
    benchmarkId: projection.benchmarkId,
    benchmarkProtocolVersion: projection.benchmarkProtocolVersion,
    pairwiseComparisonEvidence: projection.pairwiseComparisonEvidence,
    dimensionRelations: projection.dimensionRelations,
  })
}
