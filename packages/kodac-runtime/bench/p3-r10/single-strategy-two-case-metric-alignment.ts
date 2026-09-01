import { canonicalize, sha256Canonical } from "../p2-r1/contract.ts"
import type { P2R2Observation } from "../p2-r2/runner.ts"
import {
  P3_R6_DIMENSIONS,
  P3_R6_TASK_FAMILY,
  type ContextPolicyMeasurementEvidence,
  type P3R6Dimension,
  type P3R6DimensionMetricBinding,
} from "../p3-r6/contracts.ts"
import { buildContextPolicyMeasurementObservations } from "../p3-r6/context-measurement-observation.ts"
import {
  type SingleStrategyTwoCaseReportInputs,
  type SingleStrategyTwoCaseReportMemberEvidence,
} from "../p3-r9/contracts.ts"
import { composeSingleStrategyTwoCaseReports } from "../p3-r9/single-strategy-two-case-report-composition.ts"
import { P3_R1_LIMITS } from "../../src/context-selection-plan/contracts.ts"
import {
  P3_R10_ALIGNMENT_DECLARATION_KIND,
  P3_R10_ALIGNMENT_DECLARATION_VERSION,
  P3_R10_ALIGNMENT_EVIDENCE_KIND,
  P3_R10_ALIGNMENT_EVIDENCE_VERSION,
  type P3R10DimensionAlignment,
  type P3R10MemberReference,
  type SingleStrategyTwoCaseMetricAlignmentDeclaration,
  type SingleStrategyTwoCaseMetricAlignmentEvidence,
} from "./contracts.ts"

type UnknownRecord = Record<string, unknown>

const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const SHA256 = /^sha256:[0-9a-f]{64}$/
const BARE_SHA256 = /^[0-9a-f]{64}$/
const ALIGNMENT_KEYS = [
  "version",
  "kind",
  "alignmentId",
  "compositionEvidenceIdentity",
  "strategySubjectIdentity",
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

function fail(message: string): never {
  throw new Error(`P3-R10 contract violation: ${message}`)
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

function normalizeAlignmentDeclaration(input: unknown): SingleStrategyTwoCaseMetricAlignmentDeclaration {
  const value = record(input, "alignmentDeclaration")
  exactKeys(value, ALIGNMENT_KEYS, "alignmentDeclaration")
  if (
    value.version !== P3_R10_ALIGNMENT_DECLARATION_VERSION ||
    value.kind !== P3_R10_ALIGNMENT_DECLARATION_KIND
  ) {
    fail("unsupported alignment declaration contract")
  }
  return Object.freeze({
    version: P3_R10_ALIGNMENT_DECLARATION_VERSION,
    kind: P3_R10_ALIGNMENT_DECLARATION_KIND,
    alignmentId: stableId(value.alignmentId, "alignmentDeclaration.alignmentId"),
    compositionEvidenceIdentity: sha256(
      value.compositionEvidenceIdentity,
      "alignmentDeclaration.compositionEvidenceIdentity",
    ),
    strategySubjectIdentity: bareSha256(
      value.strategySubjectIdentity,
      "alignmentDeclaration.strategySubjectIdentity",
    ),
  })
}

function normalizeCaseInputs(input: unknown, label: string): SingleStrategyTwoCaseReportInputs {
  const value = record(input, label)
  exactKeys(value, CASE_INPUT_KEYS, label)
  return Object.freeze({
    planRequest: value.planRequest,
    policy: value.policy,
    manifest: value.manifest,
    development: value.development,
    holdout: value.holdout,
    measurementDeclaration: value.measurementDeclaration,
    reportDeclaration: value.reportDeclaration,
    bindingDeclaration: value.bindingDeclaration,
  })
}

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    for (const nested of Object.values(value as UnknownRecord)) deepFreeze(nested)
    Object.freeze(value)
  }
  return value
}

function reconstructR6(inputs: SingleStrategyTwoCaseReportInputs): ContextPolicyMeasurementEvidence {
  return buildContextPolicyMeasurementObservations(
    inputs.planRequest,
    inputs.policy,
    inputs.manifest,
    inputs.development,
    inputs.holdout,
    inputs.measurementDeclaration,
  )
}

function assertMemberContinuity(
  measurement: ContextPolicyMeasurementEvidence,
  member: SingleStrategyTwoCaseReportMemberEvidence,
  label: string,
): void {
  if (measurement.measurementEvidenceIdentity !== member.measurementEvidenceIdentity) {
    fail(`${label} reconstructed R6 measurementEvidenceIdentity does not match R9 member`)
  }
  if (measurement.policyIdentity !== member.policyIdentity) {
    fail(`${label} reconstructed R6 policyIdentity does not match R9 member`)
  }
  if (measurement.applicationIdentity !== member.applicationIdentity) {
    fail(`${label} reconstructed R6 applicationIdentity does not match R9 member`)
  }
  if (measurement.caseId !== member.caseId) {
    fail(`${label} reconstructed R6 caseId does not match R9 member`)
  }
  if (measurement.r1ResultIdentity !== member.r1ResultIdentity) {
    fail(`${label} reconstructed R6 r1ResultIdentity does not match R9 member`)
  }

  const reportEvidence = member.reportEvidence
  if (reportEvidence.reportEvidenceIdentity !== member.reportEvidenceIdentity) {
    fail(`${label} reconstructed R7 reportEvidenceIdentity does not match R9 member`)
  }
  if (reportEvidence.measurementEvidenceIdentity !== measurement.measurementEvidenceIdentity) {
    fail(`${label} reconstructed R7 measurementEvidenceIdentity does not match reconstructed R6`)
  }
  if (reportEvidence.policyIdentity !== measurement.policyIdentity) {
    fail(`${label} reconstructed R7 policyIdentity does not match reconstructed R6`)
  }
  if (reportEvidence.applicationIdentity !== measurement.applicationIdentity) {
    fail(`${label} reconstructed R7 applicationIdentity does not match reconstructed R6`)
  }
  if (reportEvidence.caseId !== measurement.caseId) {
    fail(`${label} reconstructed R7 caseId does not match reconstructed R6`)
  }
  if (reportEvidence.r1ResultIdentity !== measurement.r1ResultIdentity) {
    fail(`${label} reconstructed R7 r1ResultIdentity does not match reconstructed R6`)
  }

  const bindingEvidence = member.caseBindingEvidence
  if (bindingEvidence.bindingEvidenceIdentity !== member.bindingEvidenceIdentity) {
    fail(`${label} reconstructed R8 bindingEvidenceIdentity does not match R9 member`)
  }
  if (bindingEvidence.policyIdentity !== measurement.policyIdentity) {
    fail(`${label} reconstructed R8 policyIdentity does not match reconstructed R6`)
  }
  if (bindingEvidence.applicationIdentity !== measurement.applicationIdentity) {
    fail(`${label} reconstructed R8 applicationIdentity does not match reconstructed R6`)
  }
  if (measurement.measurementDeclaration.taskFamily !== P3_R6_TASK_FAMILY) {
    fail(`${label} reconstructed R6 taskFamily is not context-selection`)
  }
  if (
    measurement.measurementDeclaration.dimensionMetricBindings.length !== P3_R6_DIMENSIONS.length ||
    measurement.observations.length !== P3_R6_DIMENSIONS.length
  ) {
    fail(`${label} reconstructed R6 evidence does not contain exactly seven canonical dimensions`)
  }
}

function bindingFor(
  measurement: ContextPolicyMeasurementEvidence,
  dimension: P3R6Dimension,
  label: string,
): P3R6DimensionMetricBinding {
  const matches = measurement.measurementDeclaration.dimensionMetricBindings.filter(
    (entry) => entry.dimension === dimension,
  )
  if (matches.length !== 1) fail(`${label} must contain exactly one binding for ${dimension}`)
  return matches[0]!
}

function observationFor(
  measurement: ContextPolicyMeasurementEvidence,
  binding: P3R6DimensionMetricBinding,
  label: string,
): P2R2Observation {
  const matches = measurement.observations.filter((entry) => entry.metric_id === binding.metricId)
  if (matches.length !== 1) fail(`${label} must contain exactly one observation for ${binding.metricId}`)
  const observation = matches[0]!
  if (observation.case_id !== measurement.caseId) fail(`${label} observation case identity drifted`)
  if (observation.r1_result_identity !== measurement.r1ResultIdentity) {
    fail(`${label} observation R1 result identity drifted`)
  }
  if (observation.task_family !== P3_R6_TASK_FAMILY) fail(`${label} observation crosses task-family boundary`)
  if (observation.metric_id !== binding.metricId) fail(`${label} observation metric identity drifted`)
  if (observation.unit !== binding.unit) fail(`${label} observation unit drifted`)
  return observation
}

function memberReference(member: SingleStrategyTwoCaseReportMemberEvidence): P3R10MemberReference {
  return deepFreeze({
    memberId: member.memberId,
    caseId: member.caseId,
    r1ResultIdentity: member.r1ResultIdentity,
    reportEvidenceIdentity: member.reportEvidenceIdentity,
    measurementEvidenceIdentity: member.measurementEvidenceIdentity,
    bindingEvidenceIdentity: member.bindingEvidenceIdentity,
    policyIdentity: member.policyIdentity,
    applicationIdentity: member.applicationIdentity,
  })
}

export function buildSingleStrategyTwoCaseMetricAlignment(
  strategyDeclarationValue: unknown,
  compositionDeclarationValue: unknown,
  alignmentDeclarationValue: unknown,
  caseAInputsValue: unknown,
  caseBInputsValue: unknown,
): SingleStrategyTwoCaseMetricAlignmentEvidence {
  const strategyDeclaration = snapshot<unknown>(strategyDeclarationValue, "strategyDeclaration")
  const compositionDeclaration = snapshot<unknown>(
    compositionDeclarationValue,
    "compositionDeclaration",
  )
  const alignmentDeclarationInput = snapshot<unknown>(
    alignmentDeclarationValue,
    "alignmentDeclaration",
  )
  const caseAInput = snapshot<unknown>(caseAInputsValue, "caseAInputs")
  const caseBInput = snapshot<unknown>(caseBInputsValue, "caseBInputs")

  const composition = composeSingleStrategyTwoCaseReports(
    strategyDeclaration,
    compositionDeclaration,
    caseAInput,
    caseBInput,
  )
  const alignmentDeclaration = normalizeAlignmentDeclaration(alignmentDeclarationInput)
  if (alignmentDeclaration.compositionEvidenceIdentity !== composition.compositionEvidenceIdentity) {
    fail("alignmentDeclaration.compositionEvidenceIdentity does not match canonical R9 composition")
  }
  if (alignmentDeclaration.strategySubjectIdentity !== composition.strategySubjectIdentity) {
    fail("alignmentDeclaration.strategySubjectIdentity does not match canonical R9 strategy subject")
  }

  const caseAInputs = normalizeCaseInputs(caseAInput, "caseAInputs")
  const caseBInputs = normalizeCaseInputs(caseBInput, "caseBInputs")
  const measurementA = reconstructR6(caseAInputs)
  const measurementB = reconstructR6(caseBInputs)
  assertMemberContinuity(measurementA, composition.memberA, "memberA")
  assertMemberContinuity(measurementB, composition.memberB, "memberB")

  const dimensionAlignments: P3R10DimensionAlignment[] = P3_R6_DIMENSIONS.map((dimension) => {
    const bindingA = bindingFor(measurementA, dimension, "memberA R6 measurement")
    const bindingB = bindingFor(measurementB, dimension, "memberB R6 measurement")
    if (bindingA.metricId !== bindingB.metricId) {
      fail(`${dimension} metricId mismatch across R9 members`)
    }
    if (bindingA.unit !== bindingB.unit) {
      fail(`${dimension} unit mismatch across R9 members`)
    }
    const memberAObservation = observationFor(
      measurementA,
      bindingA,
      `memberA ${dimension}`,
    )
    const memberBObservation = observationFor(
      measurementB,
      bindingB,
      `memberB ${dimension}`,
    )
    return deepFreeze({
      dimension,
      metricId: bindingA.metricId,
      unit: bindingA.unit,
      memberAObservation,
      memberBObservation,
    })
  })

  const projection = {
    version: P3_R10_ALIGNMENT_EVIDENCE_VERSION,
    kind: P3_R10_ALIGNMENT_EVIDENCE_KIND,
    alignmentDeclaration,
    alignmentId: alignmentDeclaration.alignmentId,
    compositionEvidenceIdentity: composition.compositionEvidenceIdentity,
    strategySubjectIdentity: composition.strategySubjectIdentity,
    memberAReference: memberReference(composition.memberA),
    memberBReference: memberReference(composition.memberB),
    dimensionAlignments: deepFreeze(dimensionAlignments),
  }
  const alignmentEvidenceIdentity = sha256Canonical(projection)
  return deepFreeze({
    version: projection.version,
    kind: projection.kind,
    alignmentEvidenceIdentity,
    alignmentDeclaration: projection.alignmentDeclaration,
    alignmentId: projection.alignmentId,
    compositionEvidenceIdentity: projection.compositionEvidenceIdentity,
    strategySubjectIdentity: projection.strategySubjectIdentity,
    memberAReference: projection.memberAReference,
    memberBReference: projection.memberBReference,
    dimensionAlignments: projection.dimensionAlignments,
  })
}
