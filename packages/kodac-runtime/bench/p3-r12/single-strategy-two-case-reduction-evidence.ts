import { canonicalize, sha256Canonical } from "../p2-r1/contract.ts"
import type { P2R2Observation } from "../p2-r2/runner.ts"
import type { P2R3MetricSummaryStatus } from "../p2-r3/summary.ts"
import { P3_R6_DIMENSIONS } from "../p3-r6/contracts.ts"
import type { P3R11DimensionPolicyBinding } from "../p3-r11/contracts.ts"
import { buildSingleStrategyTwoCaseReductionPolicyBinding } from "../p3-r11/single-strategy-two-case-reduction-policy-binding.ts"
import { P3_R1_LIMITS } from "../../src/context-selection-plan/contracts.ts"
import {
  P3_R12_REDUCTION_DECLARATION_KIND,
  P3_R12_REDUCTION_DECLARATION_VERSION,
  P3_R12_REDUCTION_EVIDENCE_KIND,
  P3_R12_REDUCTION_EVIDENCE_VERSION,
  type P3R12DimensionReduction,
  type TwoCaseReductionDeclaration,
  type TwoCaseReductionEvidence,
} from "./contracts.ts"

type UnknownRecord = Record<string, unknown>

const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const SHA256 = /^sha256:[0-9a-f]{64}$/
const BARE_SHA256 = /^[0-9a-f]{64}$/
const REDUCTION_DECLARATION_KEYS = [
  "version",
  "kind",
  "reductionId",
  "policyBindingEvidenceIdentity",
  "strategySubjectIdentity",
  "benchmarkId",
  "benchmarkProtocolVersion",
] as const

function fail(message: string): never {
  throw new Error(`P3-R12 contract violation: ${message}`)
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

function normalizeReductionDeclaration(input: unknown): TwoCaseReductionDeclaration {
  const value = record(input, "reductionDeclaration")
  exactKeys(value, REDUCTION_DECLARATION_KEYS, "reductionDeclaration")
  if (
    value.version !== P3_R12_REDUCTION_DECLARATION_VERSION ||
    value.kind !== P3_R12_REDUCTION_DECLARATION_KIND
  ) {
    fail("unsupported reduction declaration contract")
  }
  return deepFreeze({
    version: P3_R12_REDUCTION_DECLARATION_VERSION,
    kind: P3_R12_REDUCTION_DECLARATION_KIND,
    reductionId: stableId(value.reductionId, "reductionDeclaration.reductionId"),
    policyBindingEvidenceIdentity: sha256(
      value.policyBindingEvidenceIdentity,
      "reductionDeclaration.policyBindingEvidenceIdentity",
    ),
    strategySubjectIdentity: bareSha256(
      value.strategySubjectIdentity,
      "reductionDeclaration.strategySubjectIdentity",
    ),
    benchmarkId: canonicalString(value.benchmarkId, "reductionDeclaration.benchmarkId"),
    benchmarkProtocolVersion: canonicalString(
      value.benchmarkProtocolVersion,
      "reductionDeclaration.benchmarkProtocolVersion",
    ),
  })
}

function arithmeticMean(values: readonly number[]): number {
  if (values.length === 0) fail("ARITHMETIC_MEAN cannot reduce zero observed values")
  let mean = 0
  for (const value of values) {
    const contribution = value / values.length
    mean += contribution
    if (!Number.isFinite(mean)) fail("ARITHMETIC_MEAN produced a non-finite result")
  }
  return mean
}

function observedValue(observation: P2R2Observation, label: string): number | boolean | undefined {
  if (observation.measurement_status === "unavailable") {
    if (observation.value !== null) fail(`${label}.value must be null when unavailable`)
    return undefined
  }
  if (observation.measurement_status !== "observed") {
    fail(`${label} is outside the canonical P3-R11 observed/unavailable state boundary`)
  }
  if (typeof observation.value === "number") {
    if (!Number.isFinite(observation.value)) fail(`${label}.value must be finite`)
    return observation.value
  }
  if (typeof observation.value === "boolean") return observation.value
  fail(`${label}.value must be a finite number or boolean when observed`)
}

function reduceDimension(binding: P3R11DimensionPolicyBinding): P3R12DimensionReduction {
  const memberAValue = observedValue(binding.memberAObservation, `memberA ${binding.dimension}`)
  const memberBValue = observedValue(binding.memberBObservation, `memberB ${binding.dimension}`)
  const observedValues = [memberAValue, memberBValue].filter(
    (value): value is number | boolean => value !== undefined,
  )
  const observedCount = observedValues.length
  const unavailableCount = 2 - observedCount
  if (observedCount + unavailableCount !== 2) fail(`${binding.dimension} coverage counts do not reconcile`)

  const sufficient =
    binding.missingnessPolicy === "REQUIRE_COMPLETE"
      ? observedCount === 2
      : observedCount >= binding.minimumObservedCount
  const status: P2R3MetricSummaryStatus = sufficient ? "REDUCED" : "INSUFFICIENT_EVIDENCE"

  if (binding.reducer === "ARITHMETIC_MEAN") {
    if (binding.valueKind !== "NUMBER") fail(`${binding.dimension} reducer/valueKind combination drifted`)
    const numericValues = observedValues.map((value) => {
      if (typeof value !== "number" || !Number.isFinite(value)) {
        fail(`${binding.dimension} observed value is not a finite number under NUMBER`)
      }
      return value
    })
    const reducedValue = status === "REDUCED" ? arithmeticMean(numericValues) : null
    return deepFreeze({
      dimension: binding.dimension,
      metricId: binding.metricId,
      inputUnit: binding.unit,
      outputUnit: binding.unit,
      valueKind: binding.valueKind,
      reducer: binding.reducer,
      missingnessPolicy: binding.missingnessPolicy,
      minimumObservedCount: binding.minimumObservedCount,
      expectedCount: 2 as const,
      observedCount,
      unavailableCount,
      status,
      reducedValue,
      trueCount: null,
      denominatorCount: null,
      memberAObservation: binding.memberAObservation,
      memberBObservation: binding.memberBObservation,
    })
  }

  if (binding.valueKind !== "BOOLEAN") fail(`${binding.dimension} reducer/valueKind combination drifted`)
  const booleanValues = observedValues.map((value) => {
    if (typeof value !== "boolean") fail(`${binding.dimension} observed value is not boolean under BOOLEAN`)
    return value
  })
  const trueCount = booleanValues.reduce((count, value) => count + (value ? 1 : 0), 0)
  const denominatorCount = observedCount
  const reducedValue = status === "REDUCED" ? trueCount / denominatorCount : null
  if (reducedValue !== null && !Number.isFinite(reducedValue)) {
    fail("BOOLEAN_TRUE_RATE produced a non-finite result")
  }
  return deepFreeze({
    dimension: binding.dimension,
    metricId: binding.metricId,
    inputUnit: binding.unit,
    outputUnit: "ratio_0_1",
    valueKind: binding.valueKind,
    reducer: binding.reducer,
    missingnessPolicy: binding.missingnessPolicy,
    minimumObservedCount: binding.minimumObservedCount,
    expectedCount: 2 as const,
    observedCount,
    unavailableCount,
    status,
    reducedValue,
    trueCount,
    denominatorCount,
    memberAObservation: binding.memberAObservation,
    memberBObservation: binding.memberBObservation,
  })
}

export function buildSingleStrategyTwoCaseReductionEvidence(
  strategyDeclarationValue: unknown,
  compositionDeclarationValue: unknown,
  alignmentDeclarationValue: unknown,
  policyDeclarationValue: unknown,
  reductionDeclarationValue: unknown,
  caseAInputsValue: unknown,
  caseBInputsValue: unknown,
): TwoCaseReductionEvidence {
  const strategyDeclaration = snapshot<unknown>(strategyDeclarationValue, "strategyDeclaration")
  const compositionDeclaration = snapshot<unknown>(compositionDeclarationValue, "compositionDeclaration")
  const alignmentDeclaration = snapshot<unknown>(alignmentDeclarationValue, "alignmentDeclaration")
  const policyDeclaration = snapshot<unknown>(policyDeclarationValue, "policyDeclaration")
  const reductionDeclaration = normalizeReductionDeclaration(
    snapshot<unknown>(reductionDeclarationValue, "reductionDeclaration"),
  )
  const caseAInputs = snapshot<unknown>(caseAInputsValue, "caseAInputs")
  const caseBInputs = snapshot<unknown>(caseBInputsValue, "caseBInputs")

  const policyBinding = buildSingleStrategyTwoCaseReductionPolicyBinding(
    strategyDeclaration,
    compositionDeclaration,
    alignmentDeclaration,
    policyDeclaration,
    caseAInputs,
    caseBInputs,
  )

  if (reductionDeclaration.policyBindingEvidenceIdentity !== policyBinding.policyBindingEvidenceIdentity) {
    fail("reductionDeclaration.policyBindingEvidenceIdentity does not match canonical P3-R11 evidence")
  }
  if (reductionDeclaration.strategySubjectIdentity !== policyBinding.strategySubjectIdentity) {
    fail("reductionDeclaration.strategySubjectIdentity does not match canonical P3-R11 evidence")
  }
  if (reductionDeclaration.benchmarkId !== policyBinding.benchmarkId) {
    fail("reductionDeclaration.benchmarkId does not match canonical P3-R11 evidence")
  }
  if (reductionDeclaration.benchmarkProtocolVersion !== policyBinding.benchmarkProtocolVersion) {
    fail("reductionDeclaration.benchmarkProtocolVersion does not match canonical P3-R11 evidence")
  }
  if (policyBinding.dimensionPolicyBindings.length !== P3_R6_DIMENSIONS.length) {
    fail("canonical P3-R11 evidence must contain exactly seven dimension policy bindings")
  }

  const dimensionReductions = P3_R6_DIMENSIONS.map((dimension, index) => {
    const binding = policyBinding.dimensionPolicyBindings[index]
    if (binding === undefined || binding.dimension !== dimension) {
      fail(`canonical P3-R11 dimension order drifted at ${dimension}`)
    }
    return reduceDimension(binding)
  })

  const projection = {
    version: P3_R12_REDUCTION_EVIDENCE_VERSION,
    kind: P3_R12_REDUCTION_EVIDENCE_KIND,
    reductionDeclaration,
    reductionId: reductionDeclaration.reductionId,
    policyBindingEvidenceIdentity: policyBinding.policyBindingEvidenceIdentity,
    strategySubjectIdentity: policyBinding.strategySubjectIdentity,
    benchmarkId: policyBinding.benchmarkId,
    benchmarkProtocolVersion: policyBinding.benchmarkProtocolVersion,
    memberAReference: policyBinding.memberAReference,
    memberBReference: policyBinding.memberBReference,
    dimensionReductions: deepFreeze(dimensionReductions),
  }
  const reductionEvidenceIdentity = sha256Canonical(projection)
  return deepFreeze({
    version: projection.version,
    kind: projection.kind,
    reductionEvidenceIdentity,
    reductionDeclaration: projection.reductionDeclaration,
    reductionId: projection.reductionId,
    policyBindingEvidenceIdentity: projection.policyBindingEvidenceIdentity,
    strategySubjectIdentity: projection.strategySubjectIdentity,
    benchmarkId: projection.benchmarkId,
    benchmarkProtocolVersion: projection.benchmarkProtocolVersion,
    memberAReference: projection.memberAReference,
    memberBReference: projection.memberBReference,
    dimensionReductions: projection.dimensionReductions,
  })
}
