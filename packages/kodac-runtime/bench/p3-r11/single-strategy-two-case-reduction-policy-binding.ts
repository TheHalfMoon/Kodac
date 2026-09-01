import { canonicalize, sha256Canonical } from "../p2-r1/contract.ts"
import type { P2R2Observation } from "../p2-r2/runner.ts"
import type {
  P2R3MissingnessPolicy,
  P2R3Reducer,
  P2R3ValueKind,
} from "../p2-r3/summary.ts"
import { P3_R6_DIMENSIONS, P3_R6_TASK_FAMILY } from "../p3-r6/contracts.ts"
import type { ContextPolicyMeasurementReportEvidence } from "../p3-r7/contracts.ts"
import { buildContextPolicyMeasurementReportBinding } from "../p3-r7/context-measurement-report-binding.ts"
import type { SingleStrategyTwoCaseReportInputs } from "../p3-r9/contracts.ts"
import type {
  P3R10DimensionAlignment,
  P3R10MemberReference,
  SingleStrategyTwoCaseMetricAlignmentEvidence,
} from "../p3-r10/contracts.ts"
import { buildSingleStrategyTwoCaseMetricAlignment } from "../p3-r10/single-strategy-two-case-metric-alignment.ts"
import { P3_R1_LIMITS } from "../../src/context-selection-plan/contracts.ts"
import {
  P3_R11_POLICY_BINDING_EVIDENCE_KIND,
  P3_R11_POLICY_BINDING_EVIDENCE_VERSION,
  P3_R11_POLICY_DECLARATION_KIND,
  P3_R11_POLICY_DECLARATION_VERSION,
  type P3R11DimensionPolicy,
  type P3R11DimensionPolicyBinding,
  type P3R11MemberReference,
  type TwoCaseReductionPolicyBindingEvidence,
  type TwoCaseReductionPolicyDeclaration,
} from "./contracts.ts"

type UnknownRecord = Record<string, unknown>

const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const SHA256 = /^sha256:[0-9a-f]{64}$/
const BARE_SHA256 = /^[0-9a-f]{64}$/

const POLICY_DECLARATION_KEYS = [
  "version",
  "kind",
  "policyBindingId",
  "alignmentEvidenceIdentity",
  "strategySubjectIdentity",
  "benchmarkId",
  "benchmarkProtocolVersion",
  "dimensionPolicies",
] as const
const DIMENSION_POLICY_KEYS = [
  "dimension",
  "metricId",
  "unit",
  "valueKind",
  "reducer",
  "missingnessPolicy",
  "minimumObservedCount",
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
  throw new Error(`P3-R11 contract violation: ${message}`)
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

function valueKind(value: unknown, label: string): P2R3ValueKind {
  if (value !== "NUMBER" && value !== "BOOLEAN") fail(`${label} is unsupported`)
  return value
}

function reducer(value: unknown, label: string): P2R3Reducer {
  if (value !== "ARITHMETIC_MEAN" && value !== "BOOLEAN_TRUE_RATE") fail(`${label} is unsupported`)
  return value
}

function missingnessPolicy(value: unknown, label: string): P2R3MissingnessPolicy {
  if (value !== "REQUIRE_COMPLETE" && value !== "OBSERVED_ONLY_WITH_COVERAGE") {
    fail(`${label} is unsupported`)
  }
  return value
}

function minimumObservedCount(value: unknown, policy: P2R3MissingnessPolicy, label: string): number {
  if (!Number.isSafeInteger(value) || (value as number) < 1 || (value as number) > 2) {
    fail(`${label} must be a positive safe integer no greater than the two-case expected count`)
  }
  const result = value as number
  if (policy === "REQUIRE_COMPLETE" && result !== 2) {
    fail(`${label} must equal 2 under REQUIRE_COMPLETE`)
  }
  return result
}

function normalizeDimensionPolicy(
  input: unknown,
  index: number,
): P3R11DimensionPolicy {
  const label = `policyDeclaration.dimensionPolicies[${index}]`
  const value = record(input, label)
  exactKeys(value, DIMENSION_POLICY_KEYS, label)
  const expectedDimension = P3_R6_DIMENSIONS[index]
  if (expectedDimension === undefined || value.dimension !== expectedDimension) {
    fail(`${label}.dimension must be ${String(expectedDimension)}`)
  }
  const normalizedValueKind = valueKind(value.valueKind, `${label}.valueKind`)
  const normalizedReducer = reducer(value.reducer, `${label}.reducer`)
  if (
    (normalizedReducer === "ARITHMETIC_MEAN" && normalizedValueKind !== "NUMBER") ||
    (normalizedReducer === "BOOLEAN_TRUE_RATE" && normalizedValueKind !== "BOOLEAN")
  ) {
    fail(`${label} reducer/valueKind combination is incompatible`)
  }
  const normalizedMissingness = missingnessPolicy(
    value.missingnessPolicy,
    `${label}.missingnessPolicy`,
  )
  return Object.freeze({
    dimension: expectedDimension,
    metricId: canonicalString(value.metricId, `${label}.metricId`),
    unit: canonicalString(value.unit, `${label}.unit`),
    valueKind: normalizedValueKind,
    reducer: normalizedReducer,
    missingnessPolicy: normalizedMissingness,
    minimumObservedCount: minimumObservedCount(
      value.minimumObservedCount,
      normalizedMissingness,
      `${label}.minimumObservedCount`,
    ),
  })
}

function normalizePolicyDeclaration(input: unknown): TwoCaseReductionPolicyDeclaration {
  const value = record(input, "policyDeclaration")
  exactKeys(value, POLICY_DECLARATION_KEYS, "policyDeclaration")
  if (
    value.version !== P3_R11_POLICY_DECLARATION_VERSION ||
    value.kind !== P3_R11_POLICY_DECLARATION_KIND
  ) {
    fail("unsupported policy declaration contract")
  }
  if (!Array.isArray(value.dimensionPolicies) || value.dimensionPolicies.length !== P3_R6_DIMENSIONS.length) {
    fail(`policyDeclaration.dimensionPolicies must contain exactly ${P3_R6_DIMENSIONS.length} entries`)
  }
  const dimensionPolicies = value.dimensionPolicies.map((entry, index) =>
    normalizeDimensionPolicy(entry, index),
  )
  const slots = new Set<string>()
  for (const policy of dimensionPolicies) {
    const slot = JSON.stringify([policy.metricId, policy.unit])
    if (slots.has(slot)) fail(`policyDeclaration contains duplicate metric/unit policy slot: ${policy.metricId}`)
    slots.add(slot)
  }
  return deepFreeze({
    version: P3_R11_POLICY_DECLARATION_VERSION,
    kind: P3_R11_POLICY_DECLARATION_KIND,
    policyBindingId: stableId(value.policyBindingId, "policyDeclaration.policyBindingId"),
    alignmentEvidenceIdentity: sha256(
      value.alignmentEvidenceIdentity,
      "policyDeclaration.alignmentEvidenceIdentity",
    ),
    strategySubjectIdentity: bareSha256(
      value.strategySubjectIdentity,
      "policyDeclaration.strategySubjectIdentity",
    ),
    benchmarkId: canonicalString(value.benchmarkId, "policyDeclaration.benchmarkId"),
    benchmarkProtocolVersion: canonicalString(
      value.benchmarkProtocolVersion,
      "policyDeclaration.benchmarkProtocolVersion",
    ),
    dimensionPolicies,
  })
}

function reconstructR7(inputs: SingleStrategyTwoCaseReportInputs): ContextPolicyMeasurementReportEvidence {
  return buildContextPolicyMeasurementReportBinding(
    inputs.planRequest,
    inputs.policy,
    inputs.manifest,
    inputs.development,
    inputs.holdout,
    inputs.measurementDeclaration,
    inputs.reportDeclaration,
  )
}

function assertR7ToR10Continuity(
  report: ContextPolicyMeasurementReportEvidence,
  member: P3R10MemberReference,
  label: string,
): void {
  if (report.reportEvidenceIdentity !== member.reportEvidenceIdentity) {
    fail(`${label} reconstructed R7 reportEvidenceIdentity does not match R10 member`)
  }
  if (report.measurementEvidenceIdentity !== member.measurementEvidenceIdentity) {
    fail(`${label} reconstructed R7 measurementEvidenceIdentity does not match R10 member`)
  }
  if (report.policyIdentity !== member.policyIdentity) {
    fail(`${label} reconstructed R7 policyIdentity does not match R10 member`)
  }
  if (report.applicationIdentity !== member.applicationIdentity) {
    fail(`${label} reconstructed R7 applicationIdentity does not match R10 member`)
  }
  if (report.caseId !== member.caseId) {
    fail(`${label} reconstructed R7 caseId does not match R10 member`)
  }
  if (report.r1ResultIdentity !== member.r1ResultIdentity) {
    fail(`${label} reconstructed R7 r1ResultIdentity does not match R10 member`)
  }
}

function assertObservationInR7(
  report: ContextPolicyMeasurementReportEvidence,
  observation: P2R2Observation,
  label: string,
): void {
  const section = report.p2R2Report.task_family_sections.find(
    (entry) => entry.task_family === P3_R6_TASK_FAMILY,
  )
  if (section === undefined) fail(`${label} R7 report is missing context-selection task family`)
  const reportCase = section.cases.find((entry) => entry.case_id === observation.case_id)
  if (reportCase === undefined) fail(`${label} R7 report is missing observation case`)
  if (reportCase.r1_result_identity !== observation.r1_result_identity) {
    fail(`${label} R7 report observation R1 result identity drifted`)
  }
  const metrics = reportCase.metrics.filter((entry) => entry.metric_id === observation.metric_id)
  if (metrics.length !== 1) fail(`${label} R7 report must contain exactly one matching metric`)
  const metric = metrics[0]!
  if (
    metric.unit !== observation.unit ||
    metric.measurement_status !== observation.measurement_status ||
    !Object.is(metric.value, observation.value)
  ) {
    fail(`${label} R7 report metric does not match trusted R10 observation`)
  }
}

function validateObservationKind(
  observation: P2R2Observation,
  expectedKind: P2R3ValueKind,
  label: string,
): void {
  if (observation.measurement_status !== "observed" && observation.measurement_status !== "unavailable") {
    fail(`${label} is outside the canonical P3-R6 observed/unavailable state boundary`)
  }
  if (observation.measurement_status === "unavailable") {
    if (observation.value !== null) fail(`${label}.value must be null when unavailable`)
    return
  }
  if (expectedKind === "NUMBER") {
    if (typeof observation.value !== "number" || !Number.isFinite(observation.value)) {
      fail(`${label} must contain a finite numeric observed value under NUMBER`)
    }
    return
  }
  if (typeof observation.value !== "boolean") {
    fail(`${label} must contain a boolean observed value under BOOLEAN`)
  }
}

function memberReference(
  member: P3R10MemberReference,
  report: ContextPolicyMeasurementReportEvidence,
): P3R11MemberReference {
  return deepFreeze({
    memberId: member.memberId,
    caseId: member.caseId,
    r1ResultIdentity: member.r1ResultIdentity,
    reportEvidenceIdentity: member.reportEvidenceIdentity,
    measurementEvidenceIdentity: member.measurementEvidenceIdentity,
    p2R2ReportIdentity: report.p2R2ReportIdentity,
    policyIdentity: member.policyIdentity,
    applicationIdentity: member.applicationIdentity,
    benchmarkId: report.benchmarkId,
    benchmarkProtocolVersion: report.benchmarkProtocolVersion,
  })
}

function bindDimensionPolicy(
  alignment: P3R10DimensionAlignment,
  policy: P3R11DimensionPolicy,
  reportA: ContextPolicyMeasurementReportEvidence,
  reportB: ContextPolicyMeasurementReportEvidence,
): P3R11DimensionPolicyBinding {
  if (policy.dimension !== alignment.dimension) {
    fail(`${alignment.dimension} policy dimension does not match canonical R10 alignment`)
  }
  if (policy.metricId !== alignment.metricId) {
    fail(`${alignment.dimension} policy metricId does not match canonical R10 alignment`)
  }
  if (policy.unit !== alignment.unit) {
    fail(`${alignment.dimension} policy unit does not match canonical R10 alignment`)
  }
  validateObservationKind(
    alignment.memberAObservation,
    policy.valueKind,
    `memberA ${alignment.dimension} observation`,
  )
  validateObservationKind(
    alignment.memberBObservation,
    policy.valueKind,
    `memberB ${alignment.dimension} observation`,
  )
  assertObservationInR7(reportA, alignment.memberAObservation, `memberA ${alignment.dimension}`)
  assertObservationInR7(reportB, alignment.memberBObservation, `memberB ${alignment.dimension}`)
  return deepFreeze({
    ...policy,
    memberAObservation: alignment.memberAObservation,
    memberBObservation: alignment.memberBObservation,
  })
}

export function buildSingleStrategyTwoCaseReductionPolicyBinding(
  strategyDeclarationValue: unknown,
  compositionDeclarationValue: unknown,
  alignmentDeclarationValue: unknown,
  policyDeclarationValue: unknown,
  caseAInputsValue: unknown,
  caseBInputsValue: unknown,
): TwoCaseReductionPolicyBindingEvidence {
  const strategyDeclaration = snapshot<unknown>(strategyDeclarationValue, "strategyDeclaration")
  const compositionDeclaration = snapshot<unknown>(
    compositionDeclarationValue,
    "compositionDeclaration",
  )
  const alignmentDeclaration = snapshot<unknown>(alignmentDeclarationValue, "alignmentDeclaration")
  const policyDeclarationInput = snapshot<unknown>(policyDeclarationValue, "policyDeclaration")
  const caseAInput = snapshot<unknown>(caseAInputsValue, "caseAInputs")
  const caseBInput = snapshot<unknown>(caseBInputsValue, "caseBInputs")

  const alignment: SingleStrategyTwoCaseMetricAlignmentEvidence =
    buildSingleStrategyTwoCaseMetricAlignment(
      strategyDeclaration,
      compositionDeclaration,
      alignmentDeclaration,
      caseAInput,
      caseBInput,
    )
  const policyDeclaration = normalizePolicyDeclaration(policyDeclarationInput)
  if (policyDeclaration.alignmentEvidenceIdentity !== alignment.alignmentEvidenceIdentity) {
    fail("policyDeclaration.alignmentEvidenceIdentity does not match canonical R10 alignment")
  }
  if (policyDeclaration.strategySubjectIdentity !== alignment.strategySubjectIdentity) {
    fail("policyDeclaration.strategySubjectIdentity does not match canonical R10 strategy subject")
  }

  const caseAInputs = normalizeCaseInputs(caseAInput, "caseAInputs")
  const caseBInputs = normalizeCaseInputs(caseBInput, "caseBInputs")
  const reportA = reconstructR7(caseAInputs)
  const reportB = reconstructR7(caseBInputs)
  assertR7ToR10Continuity(reportA, alignment.memberAReference, "memberA")
  assertR7ToR10Continuity(reportB, alignment.memberBReference, "memberB")

  if (reportA.benchmarkId !== reportB.benchmarkId) {
    fail("R7 members do not share benchmarkId")
  }
  if (reportA.benchmarkProtocolVersion !== reportB.benchmarkProtocolVersion) {
    fail("R7 members do not share benchmarkProtocolVersion")
  }
  if (policyDeclaration.benchmarkId !== reportA.benchmarkId) {
    fail("policyDeclaration.benchmarkId does not match reconstructed R7 members")
  }
  if (policyDeclaration.benchmarkProtocolVersion !== reportA.benchmarkProtocolVersion) {
    fail("policyDeclaration.benchmarkProtocolVersion does not match reconstructed R7 members")
  }

  if (
    alignment.dimensionAlignments.length !== P3_R6_DIMENSIONS.length ||
    policyDeclaration.dimensionPolicies.length !== P3_R6_DIMENSIONS.length
  ) {
    fail("canonical R10 alignment and R11 policy must each contain exactly seven dimensions")
  }

  const dimensionPolicyBindings = P3_R6_DIMENSIONS.map((dimension, index) => {
    const alignmentEntry = alignment.dimensionAlignments[index]
    const policy = policyDeclaration.dimensionPolicies[index]
    if (alignmentEntry === undefined || alignmentEntry.dimension !== dimension) {
      fail(`canonical R10 dimension order drifted at ${dimension}`)
    }
    if (policy === undefined || policy.dimension !== dimension) {
      fail(`R11 policy dimension order drifted at ${dimension}`)
    }
    return bindDimensionPolicy(alignmentEntry, policy, reportA, reportB)
  })

  const projection = {
    version: P3_R11_POLICY_BINDING_EVIDENCE_VERSION,
    kind: P3_R11_POLICY_BINDING_EVIDENCE_KIND,
    policyDeclaration,
    policyBindingId: policyDeclaration.policyBindingId,
    alignmentEvidenceIdentity: alignment.alignmentEvidenceIdentity,
    strategySubjectIdentity: alignment.strategySubjectIdentity,
    benchmarkId: reportA.benchmarkId,
    benchmarkProtocolVersion: reportA.benchmarkProtocolVersion,
    memberAReference: memberReference(alignment.memberAReference, reportA),
    memberBReference: memberReference(alignment.memberBReference, reportB),
    dimensionPolicyBindings: deepFreeze(dimensionPolicyBindings),
  }
  const policyBindingEvidenceIdentity = sha256Canonical(projection)
  return deepFreeze({
    version: projection.version,
    kind: projection.kind,
    policyBindingEvidenceIdentity,
    policyDeclaration: projection.policyDeclaration,
    policyBindingId: projection.policyBindingId,
    alignmentEvidenceIdentity: projection.alignmentEvidenceIdentity,
    strategySubjectIdentity: projection.strategySubjectIdentity,
    benchmarkId: projection.benchmarkId,
    benchmarkProtocolVersion: projection.benchmarkProtocolVersion,
    memberAReference: projection.memberAReference,
    memberBReference: projection.memberBReference,
    dimensionPolicyBindings: projection.dimensionPolicyBindings,
  })
}
