import { canonicalize, sha256Canonical } from "../p2-r1/contract.ts"
import { P3_R6_DIMENSIONS } from "../p3-r6/contracts.ts"
import type { P3R12DimensionReduction, TwoCaseReductionEvidence } from "../p3-r12/contracts.ts"
import { buildSingleStrategyTwoCaseReductionEvidence } from "../p3-r12/single-strategy-two-case-reduction-evidence.ts"
import { P3_R1_LIMITS } from "../../src/context-selection-plan/contracts.ts"
import {
  P3_R13_DIRECTION_BINDING_EVIDENCE_KIND,
  P3_R13_DIRECTION_BINDING_EVIDENCE_VERSION,
  P3_R13_DIRECTION_DECLARATION_KIND,
  P3_R13_DIRECTION_DECLARATION_VERSION,
  type P3R13DimensionDirectionBinding,
  type P3R13Direction,
  type ReductionDirectionBindingDeclaration,
  type ReductionDirectionBindingEvidence,
} from "./contracts.ts"

type UnknownRecord = Record<string, unknown>

type DirectionSyntaxEntry = {
  readonly dimension: unknown
  readonly metricId: unknown
  readonly inputUnit: unknown
  readonly outputUnit: unknown
  readonly valueKind: unknown
  readonly reducer: unknown
  readonly missingnessPolicy: unknown
  readonly minimumObservedCount: unknown
  readonly direction: P3R13Direction
}

type DirectionDeclarationSyntax = {
  readonly directionBindingId: string
  readonly reductionEvidenceIdentity: string
  readonly strategySubjectIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
  readonly dimensionDirections: readonly DirectionSyntaxEntry[]
}

const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const SHA256 = /^sha256:[0-9a-f]{64}$/
const BARE_SHA256 = /^[0-9a-f]{64}$/
const DIRECTION_DECLARATION_KEYS = [
  "version",
  "kind",
  "directionBindingId",
  "reductionEvidenceIdentity",
  "strategySubjectIdentity",
  "benchmarkId",
  "benchmarkProtocolVersion",
  "dimensionDirections",
] as const
const DIRECTION_ENTRY_KEYS = [
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

function fail(message: string): never {
  throw new Error(`P3-R13 contract violation: ${message}`)
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

function direction(value: unknown, label: string): P3R13Direction {
  if (value !== "HIGHER_IS_BETTER" && value !== "LOWER_IS_BETTER") {
    fail(`${label} must be HIGHER_IS_BETTER or LOWER_IS_BETTER`)
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

function normalizeDirectionDeclarationSyntax(input: unknown): DirectionDeclarationSyntax {
  const value = record(input, "directionDeclaration")
  exactKeys(value, DIRECTION_DECLARATION_KEYS, "directionDeclaration")
  if (
    value.version !== P3_R13_DIRECTION_DECLARATION_VERSION ||
    value.kind !== P3_R13_DIRECTION_DECLARATION_KIND
  ) {
    fail("unsupported direction declaration contract")
  }
  if (!Array.isArray(value.dimensionDirections) || value.dimensionDirections.length !== P3_R6_DIMENSIONS.length) {
    fail("directionDeclaration.dimensionDirections must contain exactly seven entries")
  }

  const dimensionDirections = value.dimensionDirections.map((entry, index) => {
    const label = `directionDeclaration.dimensionDirections[${index}]`
    const directionEntry = record(entry, label)
    exactKeys(directionEntry, DIRECTION_ENTRY_KEYS, label)
    const expectedDimension = P3_R6_DIMENSIONS[index]
    if (expectedDimension === undefined || directionEntry.dimension !== expectedDimension) {
      fail(`${label}.dimension must preserve canonical P3-R6 order`)
    }
    canonicalString(directionEntry.metricId, `${label}.metricId`)
    canonicalString(directionEntry.inputUnit, `${label}.inputUnit`)
    canonicalString(directionEntry.outputUnit, `${label}.outputUnit`)
    canonicalString(directionEntry.valueKind, `${label}.valueKind`)
    canonicalString(directionEntry.reducer, `${label}.reducer`)
    canonicalString(directionEntry.missingnessPolicy, `${label}.missingnessPolicy`)
    if (!Number.isSafeInteger(directionEntry.minimumObservedCount) || (directionEntry.minimumObservedCount as number) < 0) {
      fail(`${label}.minimumObservedCount must be a non-negative safe integer`)
    }
    return {
      dimension: directionEntry.dimension,
      metricId: directionEntry.metricId,
      inputUnit: directionEntry.inputUnit,
      outputUnit: directionEntry.outputUnit,
      valueKind: directionEntry.valueKind,
      reducer: directionEntry.reducer,
      missingnessPolicy: directionEntry.missingnessPolicy,
      minimumObservedCount: directionEntry.minimumObservedCount,
      direction: direction(directionEntry.direction, `${label}.direction`),
    }
  })

  return {
    directionBindingId: stableId(value.directionBindingId, "directionDeclaration.directionBindingId"),
    reductionEvidenceIdentity: sha256(
      value.reductionEvidenceIdentity,
      "directionDeclaration.reductionEvidenceIdentity",
    ),
    strategySubjectIdentity: bareSha256(
      value.strategySubjectIdentity,
      "directionDeclaration.strategySubjectIdentity",
    ),
    benchmarkId: canonicalString(value.benchmarkId, "directionDeclaration.benchmarkId"),
    benchmarkProtocolVersion: canonicalString(
      value.benchmarkProtocolVersion,
      "directionDeclaration.benchmarkProtocolVersion",
    ),
    dimensionDirections,
  }
}

function crossBindDimension(
  syntax: DirectionSyntaxEntry,
  trusted: P3R12DimensionReduction,
  index: number,
): P3R13DimensionDirectionBinding {
  const label = `directionDeclaration.dimensionDirections[${index}]`
  if (syntax.dimension !== trusted.dimension) fail(`${label}.dimension does not match canonical P3-R12 evidence`)
  if (syntax.metricId !== trusted.metricId) fail(`${label}.metricId does not match canonical P3-R12 evidence`)
  if (syntax.inputUnit !== trusted.inputUnit) fail(`${label}.inputUnit does not match canonical P3-R12 evidence`)
  if (syntax.outputUnit !== trusted.outputUnit) fail(`${label}.outputUnit does not match canonical P3-R12 evidence`)
  if (syntax.valueKind !== trusted.valueKind) fail(`${label}.valueKind does not match canonical P3-R12 evidence`)
  if (syntax.reducer !== trusted.reducer) fail(`${label}.reducer does not match canonical P3-R12 evidence`)
  if (syntax.missingnessPolicy !== trusted.missingnessPolicy) {
    fail(`${label}.missingnessPolicy does not match canonical P3-R12 evidence`)
  }
  if (syntax.minimumObservedCount !== trusted.minimumObservedCount) {
    fail(`${label}.minimumObservedCount does not match canonical P3-R12 evidence`)
  }
  return deepFreeze({
    dimension: trusted.dimension,
    metricId: trusted.metricId,
    inputUnit: trusted.inputUnit,
    outputUnit: trusted.outputUnit,
    valueKind: trusted.valueKind,
    reducer: trusted.reducer,
    missingnessPolicy: trusted.missingnessPolicy,
    minimumObservedCount: trusted.minimumObservedCount,
    direction: syntax.direction,
  })
}

function bindDirectionDeclaration(
  syntax: DirectionDeclarationSyntax,
  reductionEvidence: TwoCaseReductionEvidence,
): ReductionDirectionBindingDeclaration {
  if (syntax.reductionEvidenceIdentity !== reductionEvidence.reductionEvidenceIdentity) {
    fail("directionDeclaration.reductionEvidenceIdentity does not match canonical P3-R12 evidence")
  }
  if (syntax.strategySubjectIdentity !== reductionEvidence.strategySubjectIdentity) {
    fail("directionDeclaration.strategySubjectIdentity does not match canonical P3-R12 evidence")
  }
  if (syntax.benchmarkId !== reductionEvidence.benchmarkId) {
    fail("directionDeclaration.benchmarkId does not match canonical P3-R12 evidence")
  }
  if (syntax.benchmarkProtocolVersion !== reductionEvidence.benchmarkProtocolVersion) {
    fail("directionDeclaration.benchmarkProtocolVersion does not match canonical P3-R12 evidence")
  }
  if (reductionEvidence.dimensionReductions.length !== P3_R6_DIMENSIONS.length) {
    fail("canonical P3-R12 evidence must contain exactly seven dimension reductions")
  }

  const dimensionDirections = P3_R6_DIMENSIONS.map((dimensionName, index) => {
    const syntaxEntry = syntax.dimensionDirections[index]
    const trusted = reductionEvidence.dimensionReductions[index]
    if (syntaxEntry === undefined || trusted === undefined || trusted.dimension !== dimensionName) {
      fail(`canonical P3-R12 dimension order drifted at ${dimensionName}`)
    }
    return crossBindDimension(syntaxEntry, trusted, index)
  })

  return deepFreeze({
    version: P3_R13_DIRECTION_DECLARATION_VERSION,
    kind: P3_R13_DIRECTION_DECLARATION_KIND,
    directionBindingId: syntax.directionBindingId,
    reductionEvidenceIdentity: reductionEvidence.reductionEvidenceIdentity,
    strategySubjectIdentity: reductionEvidence.strategySubjectIdentity,
    benchmarkId: reductionEvidence.benchmarkId,
    benchmarkProtocolVersion: reductionEvidence.benchmarkProtocolVersion,
    dimensionDirections: deepFreeze(dimensionDirections),
  })
}

export function buildReductionDirectionBindingEvidence(
  strategyDeclarationValue: unknown,
  compositionDeclarationValue: unknown,
  alignmentDeclarationValue: unknown,
  policyDeclarationValue: unknown,
  reductionDeclarationValue: unknown,
  directionDeclarationValue: unknown,
  caseAInputsValue: unknown,
  caseBInputsValue: unknown,
): ReductionDirectionBindingEvidence {
  const strategyDeclaration = snapshot<unknown>(strategyDeclarationValue, "strategyDeclaration")
  const compositionDeclaration = snapshot<unknown>(compositionDeclarationValue, "compositionDeclaration")
  const alignmentDeclaration = snapshot<unknown>(alignmentDeclarationValue, "alignmentDeclaration")
  const policyDeclaration = snapshot<unknown>(policyDeclarationValue, "policyDeclaration")
  const reductionDeclaration = snapshot<unknown>(reductionDeclarationValue, "reductionDeclaration")
  const directionDeclarationSyntax = normalizeDirectionDeclarationSyntax(
    snapshot<unknown>(directionDeclarationValue, "directionDeclaration"),
  )
  const caseAInputs = snapshot<unknown>(caseAInputsValue, "caseAInputs")
  const caseBInputs = snapshot<unknown>(caseBInputsValue, "caseBInputs")

  const reductionEvidence = buildSingleStrategyTwoCaseReductionEvidence(
    strategyDeclaration,
    compositionDeclaration,
    alignmentDeclaration,
    policyDeclaration,
    reductionDeclaration,
    caseAInputs,
    caseBInputs,
  )
  const directionDeclaration = bindDirectionDeclaration(directionDeclarationSyntax, reductionEvidence)
  const dimensionDirectionBindings = deepFreeze(
    directionDeclaration.dimensionDirections.map((entry) => deepFreeze({ ...entry })),
  )

  const projection = {
    version: P3_R13_DIRECTION_BINDING_EVIDENCE_VERSION,
    kind: P3_R13_DIRECTION_BINDING_EVIDENCE_KIND,
    directionDeclaration,
    directionBindingId: directionDeclaration.directionBindingId,
    reductionEvidenceIdentity: reductionEvidence.reductionEvidenceIdentity,
    strategySubjectIdentity: reductionEvidence.strategySubjectIdentity,
    benchmarkId: reductionEvidence.benchmarkId,
    benchmarkProtocolVersion: reductionEvidence.benchmarkProtocolVersion,
    reductionEvidence,
    dimensionDirectionBindings,
  }
  const directionBindingEvidenceIdentity = sha256Canonical(projection)
  return deepFreeze({
    version: projection.version,
    kind: projection.kind,
    directionBindingEvidenceIdentity,
    directionDeclaration: projection.directionDeclaration,
    directionBindingId: projection.directionBindingId,
    reductionEvidenceIdentity: projection.reductionEvidenceIdentity,
    strategySubjectIdentity: projection.strategySubjectIdentity,
    benchmarkId: projection.benchmarkId,
    benchmarkProtocolVersion: projection.benchmarkProtocolVersion,
    reductionEvidence: projection.reductionEvidence,
    dimensionDirectionBindings: projection.dimensionDirectionBindings,
  })
}
