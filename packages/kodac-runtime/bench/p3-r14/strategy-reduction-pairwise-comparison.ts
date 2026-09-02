import { canonicalize, sha256Canonical } from "../p2-r1/contract.ts"
import { P3_R6_DIMENSIONS } from "../p3-r6/contracts.ts"
import type { P3R12DimensionReduction } from "../p3-r12/contracts.ts"
import type {
  P3R13DimensionDirectionBinding,
  ReductionDirectionBindingEvidence,
} from "../p3-r13/contracts.ts"
import { buildReductionDirectionBindingEvidence } from "../p3-r13/reduction-direction-binding.ts"
import { P3_R1_LIMITS } from "../../src/context-selection-plan/contracts.ts"
import {
  P3_R14_COMPARISON_DECLARATION_KIND,
  P3_R14_COMPARISON_DECLARATION_VERSION,
  P3_R14_COMPARISON_EVIDENCE_KIND,
  P3_R14_COMPARISON_EVIDENCE_VERSION,
  type P3R14DimensionComparison,
  type P3R14ReconstructionBundle,
  type StrategyReductionPairwiseComparisonDeclaration,
  type StrategyReductionPairwiseComparisonEvidence,
} from "./contracts.ts"

type UnknownRecord = Record<string, unknown>

const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const SHA256 = /^sha256:[0-9a-f]{64}$/
const BARE_SHA256 = /^[0-9a-f]{64}$/

const RECONSTRUCTION_BUNDLE_KEYS = [
  "strategyDeclaration",
  "compositionDeclaration",
  "alignmentDeclaration",
  "policyDeclaration",
  "reductionDeclaration",
  "directionDeclaration",
  "caseAInputs",
  "caseBInputs",
] as const

const CASE_INPUT_KEYS = [
  "planRequest",
  "policy",
  "manifest",
  "development",
  "holdout",
  "measurementDeclaration",
  "reportDeclaration",
  "bindingDeclaration",
] as const

const MEASUREMENT_DECLARATION_KEYS = [
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

const COMPARISON_DECLARATION_KEYS = [
  "version",
  "kind",
  "comparisonId",
  "leftDirectionBindingEvidenceIdentity",
  "rightDirectionBindingEvidenceIdentity",
  "leftStrategySubjectIdentity",
  "rightStrategySubjectIdentity",
  "benchmarkId",
  "benchmarkProtocolVersion",
] as const

function fail(message: string): never {
  throw new Error(`P3-R14 contract violation: ${message}`)
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function assertUnicodeScalarStrings(value: unknown, label: string): void {
  if (typeof value === "string") {
    for (let index = 0; index < value.length; index += 1) {
      const codeUnit = value.charCodeAt(index)
      if (codeUnit >= 0xd800 && codeUnit <= 0xdbff) {
        const next = value.charCodeAt(index + 1)
        if (!(next >= 0xdc00 && next <= 0xdfff)) {
          fail(`${label} contains an unpaired UTF-16 high surrogate`)
        }
        index += 1
        continue
      }
      if (codeUnit >= 0xdc00 && codeUnit <= 0xdfff) {
        fail(`${label} contains an unpaired UTF-16 low surrogate`)
      }
    }
    return
  }

  if (Array.isArray(value)) {
    value.forEach((entry, index) => assertUnicodeScalarStrings(entry, `${label}[${index}]`))
    return
  }

  if (value !== null && typeof value === "object") {
    for (const [key, nested] of Object.entries(value as UnknownRecord)) {
      assertUnicodeScalarStrings(key, `${label} key`)
      assertUnicodeScalarStrings(nested, `${label}.${key}`)
    }
  }
}

function snapshot<T>(value: unknown, label: string): T {
  try {
    const detached = JSON.parse(canonicalize(value)) as T
    assertUnicodeScalarStrings(detached, label)
    return detached
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

function exactKeys(value: UnknownRecord, expected: readonly string[], label: string): void {
  const actual = Object.keys(value).sort(compareStrings)
  const required = [...expected].sort(compareStrings)
  if (actual.length !== required.length || actual.some((key, index) => key !== required[index])) {
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
  if (Buffer.byteLength(result, "utf8") > P3_R1_LIMITS.maxStableIdBytes || !STABLE_ID.test(result)) {
    fail(`${label} must be a bounded canonical stable identifier`)
  }
  return result
}

function sha256(value: unknown, label: string): string {
  const result = canonicalString(value, label)
  if (!SHA256.test(result)) fail(`${label} must be a lowercase sha256 identity`)
  return result
}

function bareSha256(value: unknown, label: string): string {
  const result = canonicalString(value, label)
  if (!BARE_SHA256.test(result)) fail(`${label} must be a lowercase SHA-256 identity`)
  return result
}

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    for (const nested of Object.values(value as UnknownRecord)) deepFreeze(nested)
    Object.freeze(value)
  }
  return value
}

function canonicalEqual(left: unknown, right: unknown): boolean {
  return canonicalize(left) === canonicalize(right)
}

function normalizeReconstructionBundle(input: unknown, label: string): P3R14ReconstructionBundle {
  const value = record(input, label)
  exactKeys(value, RECONSTRUCTION_BUNDLE_KEYS, label)
  return deepFreeze({
    strategyDeclaration: value.strategyDeclaration,
    compositionDeclaration: value.compositionDeclaration,
    alignmentDeclaration: value.alignmentDeclaration,
    policyDeclaration: value.policyDeclaration,
    reductionDeclaration: value.reductionDeclaration,
    directionDeclaration: value.directionDeclaration,
    caseAInputs: value.caseAInputs,
    caseBInputs: value.caseBInputs,
  })
}

function normalizeComparisonDeclaration(
  input: unknown,
): StrategyReductionPairwiseComparisonDeclaration {
  const value = record(input, "comparisonDeclaration")
  exactKeys(value, COMPARISON_DECLARATION_KEYS, "comparisonDeclaration")
  if (
    value.version !== P3_R14_COMPARISON_DECLARATION_VERSION ||
    value.kind !== P3_R14_COMPARISON_DECLARATION_KIND
  ) {
    fail("unsupported comparison declaration contract")
  }

  const leftDirectionBindingEvidenceIdentity = sha256(
    value.leftDirectionBindingEvidenceIdentity,
    "comparisonDeclaration.leftDirectionBindingEvidenceIdentity",
  )
  const rightDirectionBindingEvidenceIdentity = sha256(
    value.rightDirectionBindingEvidenceIdentity,
    "comparisonDeclaration.rightDirectionBindingEvidenceIdentity",
  )
  if (leftDirectionBindingEvidenceIdentity === rightDirectionBindingEvidenceIdentity) {
    fail("comparison declaration direction-binding evidence identities must be distinct")
  }

  const leftStrategySubjectIdentity = bareSha256(
    value.leftStrategySubjectIdentity,
    "comparisonDeclaration.leftStrategySubjectIdentity",
  )
  const rightStrategySubjectIdentity = bareSha256(
    value.rightStrategySubjectIdentity,
    "comparisonDeclaration.rightStrategySubjectIdentity",
  )
  if (leftStrategySubjectIdentity === rightStrategySubjectIdentity) {
    fail("comparison declaration strategy-subject identities must be distinct")
  }

  return deepFreeze({
    version: P3_R14_COMPARISON_DECLARATION_VERSION,
    kind: P3_R14_COMPARISON_DECLARATION_KIND,
    comparisonId: stableId(value.comparisonId, "comparisonDeclaration.comparisonId"),
    leftDirectionBindingEvidenceIdentity,
    rightDirectionBindingEvidenceIdentity,
    leftStrategySubjectIdentity,
    rightStrategySubjectIdentity,
    benchmarkId: canonicalString(value.benchmarkId, "comparisonDeclaration.benchmarkId"),
    benchmarkProtocolVersion: canonicalString(
      value.benchmarkProtocolVersion,
      "comparisonDeclaration.benchmarkProtocolVersion",
    ),
  })
}

function buildTrustedR13(bundle: P3R14ReconstructionBundle): ReductionDirectionBindingEvidence {
  return buildReductionDirectionBindingEvidence(
    bundle.strategyDeclaration,
    bundle.compositionDeclaration,
    bundle.alignmentDeclaration,
    bundle.policyDeclaration,
    bundle.reductionDeclaration,
    bundle.directionDeclaration,
    bundle.caseAInputs,
    bundle.caseBInputs,
  )
}

function caseInputs(bundle: P3R14ReconstructionBundle, member: "caseAInputs" | "caseBInputs", label: string): UnknownRecord {
  const value = record(bundle[member], label)
  exactKeys(value, CASE_INPUT_KEYS, label)
  return value
}

function sharedMeasurementProjection(value: unknown, label: string): UnknownRecord {
  const declaration = record(value, label)
  exactKeys(declaration, MEASUREMENT_DECLARATION_KEYS, label)
  return {
    version: declaration.version,
    kind: declaration.kind,
    caseId: declaration.caseId,
    r1ResultIdentity: declaration.r1ResultIdentity,
    taskFamily: declaration.taskFamily,
    dimensionMetricBindings: declaration.dimensionMetricBindings,
    goldCandidateIdentities: declaration.goldCandidateIdentities,
  }
}

function requireSharedCaseControls(
  leftBundle: P3R14ReconstructionBundle,
  rightBundle: P3R14ReconstructionBundle,
  member: "caseAInputs" | "caseBInputs",
): void {
  const left = caseInputs(leftBundle, member, `leftReconstruction.${member}`)
  const right = caseInputs(rightBundle, member, `rightReconstruction.${member}`)

  if (!canonicalEqual(left.planRequest, right.planRequest)) {
    fail(`${member}.planRequest must be identical across both strategies`)
  }

  const leftSharedMeasurement = sharedMeasurementProjection(
    left.measurementDeclaration,
    `leftReconstruction.${member}.measurementDeclaration`,
  )
  const rightSharedMeasurement = sharedMeasurementProjection(
    right.measurementDeclaration,
    `rightReconstruction.${member}.measurementDeclaration`,
  )
  if (!canonicalEqual(leftSharedMeasurement, rightSharedMeasurement)) {
    fail(`${member}.measurementDeclaration shared inputs must be identical across both strategies`)
  }
}

function requireDeclarationBindings(
  declaration: StrategyReductionPairwiseComparisonDeclaration,
  left: ReductionDirectionBindingEvidence,
  right: ReductionDirectionBindingEvidence,
): void {
  if (declaration.leftDirectionBindingEvidenceIdentity !== left.directionBindingEvidenceIdentity) {
    fail("comparisonDeclaration.leftDirectionBindingEvidenceIdentity does not match trusted left R13 evidence")
  }
  if (declaration.rightDirectionBindingEvidenceIdentity !== right.directionBindingEvidenceIdentity) {
    fail("comparisonDeclaration.rightDirectionBindingEvidenceIdentity does not match trusted right R13 evidence")
  }
  if (declaration.leftStrategySubjectIdentity !== left.strategySubjectIdentity) {
    fail("comparisonDeclaration.leftStrategySubjectIdentity does not match trusted left R13 evidence")
  }
  if (declaration.rightStrategySubjectIdentity !== right.strategySubjectIdentity) {
    fail("comparisonDeclaration.rightStrategySubjectIdentity does not match trusted right R13 evidence")
  }
  if (left.strategySubjectIdentity === right.strategySubjectIdentity) {
    fail("trusted strategy subjects must be distinct")
  }
  if (declaration.benchmarkId !== left.benchmarkId || declaration.benchmarkId !== right.benchmarkId) {
    fail("comparisonDeclaration.benchmarkId must match both trusted R13 records")
  }
  if (
    declaration.benchmarkProtocolVersion !== left.benchmarkProtocolVersion ||
    declaration.benchmarkProtocolVersion !== right.benchmarkProtocolVersion
  ) {
    fail("comparisonDeclaration.benchmarkProtocolVersion must match both trusted R13 records")
  }
}

function requireMemberTopology(
  left: ReductionDirectionBindingEvidence,
  right: ReductionDirectionBindingEvidence,
): void {
  const leftA = left.reductionEvidence.memberAReference
  const rightA = right.reductionEvidence.memberAReference
  const leftB = left.reductionEvidence.memberBReference
  const rightB = right.reductionEvidence.memberBReference

  if (leftA.caseId !== rightA.caseId) fail("member A caseId must match across both strategies")
  if (leftA.r1ResultIdentity !== rightA.r1ResultIdentity) {
    fail("member A r1ResultIdentity must match across both strategies")
  }
  if (leftB.caseId !== rightB.caseId) fail("member B caseId must match across both strategies")
  if (leftB.r1ResultIdentity !== rightB.r1ResultIdentity) {
    fail("member B r1ResultIdentity must match across both strategies")
  }
}

function requireDirectionSemantics(
  left: P3R13DimensionDirectionBinding,
  right: P3R13DimensionDirectionBinding,
  leftReduction: P3R12DimensionReduction,
  rightReduction: P3R12DimensionReduction,
  index: number,
): void {
  const label = `dimension[${index}]`
  const fields = [
    "dimension",
    "metricId",
    "inputUnit",
    "outputUnit",
    "valueKind",
    "reducer",
    "missingnessPolicy",
    "minimumObservedCount",
    "direction",
  ] as const
  for (const field of fields) {
    if (left[field] !== right[field]) fail(`${label}.${field} must match across both strategies`)
  }

  const reductionFields = [
    "dimension",
    "metricId",
    "inputUnit",
    "outputUnit",
    "valueKind",
    "reducer",
    "missingnessPolicy",
    "minimumObservedCount",
    "expectedCount",
  ] as const
  for (const field of reductionFields) {
    if (leftReduction[field] !== rightReduction[field]) {
      fail(`${label}.reduction.${field} must match across both strategies`)
    }
  }
  if (leftReduction.expectedCount !== 2 || rightReduction.expectedCount !== 2) {
    fail(`${label}.reduction.expectedCount must be exactly two`)
  }

  const bindingFields = [
    "dimension",
    "metricId",
    "inputUnit",
    "outputUnit",
    "valueKind",
    "reducer",
    "missingnessPolicy",
    "minimumObservedCount",
  ] as const
  for (const field of bindingFields) {
    if (left[field] !== leftReduction[field] || right[field] !== rightReduction[field]) {
      fail(`${label}.${field} must remain cross-bound to each side's trusted R12 reduction`)
    }
  }
}

function compareDimension(
  leftBinding: P3R13DimensionDirectionBinding,
  rightBinding: P3R13DimensionDirectionBinding,
  left: P3R12DimensionReduction,
  right: P3R12DimensionReduction,
  index: number,
): P3R14DimensionComparison {
  requireDirectionSemantics(leftBinding, rightBinding, left, right, index)

  if (left.status === "REDUCED" && right.status === "REDUCED") {
    if (
      typeof left.reducedValue !== "number" ||
      !Number.isFinite(left.reducedValue) ||
      typeof right.reducedValue !== "number" ||
      !Number.isFinite(right.reducedValue)
    ) {
      fail(`dimension[${index}] REDUCED values must be finite numbers`)
    }
    const rawDeltaLeftMinusRight = left.reducedValue - right.reducedValue
    if (!Number.isFinite(rawDeltaLeftMinusRight)) {
      fail(`dimension[${index}] raw delta must be finite`)
    }
    return deepFreeze({
      dimension: left.dimension,
      metricId: left.metricId,
      inputUnit: left.inputUnit,
      outputUnit: left.outputUnit,
      valueKind: left.valueKind,
      reducer: left.reducer,
      missingnessPolicy: left.missingnessPolicy,
      minimumObservedCount: left.minimumObservedCount,
      expectedCount: 2,
      direction: leftBinding.direction,
      leftStatus: left.status,
      rightStatus: right.status,
      comparisonStatus: "COMPARABLE",
      leftReducedValue: left.reducedValue,
      rightReducedValue: right.reducedValue,
      rawDeltaLeftMinusRight,
    })
  }

  return deepFreeze({
    dimension: left.dimension,
    metricId: left.metricId,
    inputUnit: left.inputUnit,
    outputUnit: left.outputUnit,
    valueKind: left.valueKind,
    reducer: left.reducer,
    missingnessPolicy: left.missingnessPolicy,
    minimumObservedCount: left.minimumObservedCount,
    expectedCount: 2,
    direction: leftBinding.direction,
    leftStatus: left.status,
    rightStatus: right.status,
    comparisonStatus: "INSUFFICIENT_EVIDENCE",
    leftReducedValue: null,
    rightReducedValue: null,
    rawDeltaLeftMinusRight: null,
  })
}

function buildDimensionComparisons(
  left: ReductionDirectionBindingEvidence,
  right: ReductionDirectionBindingEvidence,
): readonly P3R14DimensionComparison[] {
  if (
    left.dimensionDirectionBindings.length !== P3_R6_DIMENSIONS.length ||
    right.dimensionDirectionBindings.length !== P3_R6_DIMENSIONS.length ||
    left.reductionEvidence.dimensionReductions.length !== P3_R6_DIMENSIONS.length ||
    right.reductionEvidence.dimensionReductions.length !== P3_R6_DIMENSIONS.length
  ) {
    fail("both trusted R13 records must contain exactly seven canonical dimensions")
  }

  return deepFreeze(P3_R6_DIMENSIONS.map((dimension, index) => {
    const leftBinding = left.dimensionDirectionBindings[index]
    const rightBinding = right.dimensionDirectionBindings[index]
    const leftReduction = left.reductionEvidence.dimensionReductions[index]
    const rightReduction = right.reductionEvidence.dimensionReductions[index]
    if (
      leftBinding === undefined ||
      rightBinding === undefined ||
      leftReduction === undefined ||
      rightReduction === undefined ||
      leftBinding.dimension !== dimension ||
      rightBinding.dimension !== dimension ||
      leftReduction.dimension !== dimension ||
      rightReduction.dimension !== dimension
    ) {
      fail(`canonical dimension order drifted at ${dimension}`)
    }
    return compareDimension(leftBinding, rightBinding, leftReduction, rightReduction, index)
  }))
}

export function buildStrategyReductionPairwiseComparisonEvidence(
  leftReconstructionValue: unknown,
  rightReconstructionValue: unknown,
  comparisonDeclarationValue: unknown,
): StrategyReductionPairwiseComparisonEvidence {
  const leftRoot = snapshot<unknown>(leftReconstructionValue, "leftReconstruction")
  const rightRoot = snapshot<unknown>(rightReconstructionValue, "rightReconstruction")
  const declarationRoot = snapshot<unknown>(comparisonDeclarationValue, "comparisonDeclaration")

  const leftBundle = normalizeReconstructionBundle(leftRoot, "leftReconstruction")
  const rightBundle = normalizeReconstructionBundle(rightRoot, "rightReconstruction")
  const comparisonDeclaration = normalizeComparisonDeclaration(declarationRoot)

  const leftDirectionBindingEvidence = buildTrustedR13(leftBundle)
  const rightDirectionBindingEvidence = buildTrustedR13(rightBundle)

  requireSharedCaseControls(leftBundle, rightBundle, "caseAInputs")
  requireSharedCaseControls(leftBundle, rightBundle, "caseBInputs")
  requireDeclarationBindings(
    comparisonDeclaration,
    leftDirectionBindingEvidence,
    rightDirectionBindingEvidence,
  )
  requireMemberTopology(leftDirectionBindingEvidence, rightDirectionBindingEvidence)

  const dimensionComparisons = buildDimensionComparisons(
    leftDirectionBindingEvidence,
    rightDirectionBindingEvidence,
  )

  const projection = {
    version: P3_R14_COMPARISON_EVIDENCE_VERSION,
    kind: P3_R14_COMPARISON_EVIDENCE_KIND,
    comparisonDeclaration,
    comparisonId: comparisonDeclaration.comparisonId,
    leftDirectionBindingEvidenceIdentity:
      leftDirectionBindingEvidence.directionBindingEvidenceIdentity,
    rightDirectionBindingEvidenceIdentity:
      rightDirectionBindingEvidence.directionBindingEvidenceIdentity,
    leftStrategySubjectIdentity: leftDirectionBindingEvidence.strategySubjectIdentity,
    rightStrategySubjectIdentity: rightDirectionBindingEvidence.strategySubjectIdentity,
    benchmarkId: leftDirectionBindingEvidence.benchmarkId,
    benchmarkProtocolVersion: leftDirectionBindingEvidence.benchmarkProtocolVersion,
    leftDirectionBindingEvidence,
    rightDirectionBindingEvidence,
    dimensionComparisons,
  }
  const comparisonEvidenceIdentity = sha256Canonical(projection)

  return deepFreeze({
    version: projection.version,
    kind: projection.kind,
    comparisonEvidenceIdentity,
    comparisonDeclaration: projection.comparisonDeclaration,
    comparisonId: projection.comparisonId,
    leftDirectionBindingEvidenceIdentity: projection.leftDirectionBindingEvidenceIdentity,
    rightDirectionBindingEvidenceIdentity: projection.rightDirectionBindingEvidenceIdentity,
    leftStrategySubjectIdentity: projection.leftStrategySubjectIdentity,
    rightStrategySubjectIdentity: projection.rightStrategySubjectIdentity,
    benchmarkId: projection.benchmarkId,
    benchmarkProtocolVersion: projection.benchmarkProtocolVersion,
    leftDirectionBindingEvidence: projection.leftDirectionBindingEvidence,
    rightDirectionBindingEvidence: projection.rightDirectionBindingEvidence,
    dimensionComparisons: projection.dimensionComparisons,
  })
}
