import { canonicalize, sha256Canonical } from "../p2-r1/contract.ts"
import { buildContextPolicyMeasurementReportBinding } from "../p3-r7/context-measurement-report-binding.ts"
import {
  bindContextStrategySubjectToDeclaredPolicy,
  buildContextStrategySubject,
} from "../p3-r8/context-strategy-subject.ts"
import { P3_R1_LIMITS } from "../../src/context-selection-plan/contracts.ts"
import {
  P3_R9_COMPOSITION_DECLARATION_KIND,
  P3_R9_COMPOSITION_DECLARATION_VERSION,
  P3_R9_COMPOSITION_EVIDENCE_KIND,
  P3_R9_COMPOSITION_EVIDENCE_VERSION,
  type SingleStrategyTwoCaseReportCompositionDeclaration,
  type SingleStrategyTwoCaseReportCompositionEvidence,
  type SingleStrategyTwoCaseReportInputs,
  type SingleStrategyTwoCaseReportMemberDeclaration,
  type SingleStrategyTwoCaseReportMemberEvidence,
} from "./contracts.ts"
import type { ContextStrategySubject } from "../p3-r8/contracts.ts"

type UnknownRecord = Record<string, unknown>

const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const R1_RESULT_IDENTITY = /^sha256:[0-9a-f]{64}$/
const STRATEGY_SUBJECT_IDENTITY = /^[0-9a-f]{64}$/

const COMPOSITION_KEYS = [
  "version",
  "kind",
  "compositionId",
  "strategySubjectIdentity",
  "memberA",
  "memberB",
] as const
const MEMBER_KEYS = ["memberId", "caseId", "r1ResultIdentity"] as const
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
  throw new Error(`P3-R9 contract violation: ${message}`)
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
  if (
    Buffer.byteLength(result, "utf8") > P3_R1_LIMITS.maxStableIdBytes ||
    !STABLE_ID.test(result)
  ) {
    fail(`${label} must be a bounded canonical stable identifier`)
  }
  return result
}

function r1ResultIdentity(value: unknown, label: string): string {
  const result = canonicalString(value, label)
  if (!R1_RESULT_IDENTITY.test(result)) {
    fail(`${label} must be a lowercase sha256 identity`)
  }
  return result
}

function strategySubjectIdentity(value: unknown, label: string): string {
  const result = canonicalString(value, label)
  if (!STRATEGY_SUBJECT_IDENTITY.test(result)) {
    fail(`${label} must be a lowercase SHA-256 strategy-subject identity`)
  }
  return result
}

function normalizeMember(
  input: unknown,
  label: string,
): SingleStrategyTwoCaseReportMemberDeclaration {
  const value = record(input, label)
  exactKeys(value, MEMBER_KEYS, label)
  return Object.freeze({
    memberId: stableId(value.memberId, `${label}.memberId`),
    caseId: canonicalString(value.caseId, `${label}.caseId`),
    r1ResultIdentity: r1ResultIdentity(value.r1ResultIdentity, `${label}.r1ResultIdentity`),
  })
}

function normalizeCompositionDeclaration(
  input: unknown,
): SingleStrategyTwoCaseReportCompositionDeclaration {
  const value = record(input, "compositionDeclaration")
  exactKeys(value, COMPOSITION_KEYS, "compositionDeclaration")
  if (
    value.version !== P3_R9_COMPOSITION_DECLARATION_VERSION ||
    value.kind !== P3_R9_COMPOSITION_DECLARATION_KIND
  ) {
    fail("unsupported composition declaration contract")
  }
  const memberA = normalizeMember(value.memberA, "compositionDeclaration.memberA")
  const memberB = normalizeMember(value.memberB, "compositionDeclaration.memberB")
  if (memberA.memberId === memberB.memberId) fail("composition members must use distinct memberId values")
  if (memberA.caseId === memberB.caseId) fail("composition members must use distinct caseId values")
  if (memberA.r1ResultIdentity === memberB.r1ResultIdentity) {
    fail("composition members must use distinct r1ResultIdentity values")
  }
  return Object.freeze({
    version: P3_R9_COMPOSITION_DECLARATION_VERSION,
    kind: P3_R9_COMPOSITION_DECLARATION_KIND,
    compositionId: stableId(value.compositionId, "compositionDeclaration.compositionId"),
    strategySubjectIdentity: strategySubjectIdentity(
      value.strategySubjectIdentity,
      "compositionDeclaration.strategySubjectIdentity",
    ),
    memberA,
    memberB,
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

function composeMember(
  member: SingleStrategyTwoCaseReportMemberDeclaration,
  inputs: SingleStrategyTwoCaseReportInputs,
  strategySubject: ContextStrategySubject,
  label: string,
): SingleStrategyTwoCaseReportMemberEvidence {
  const reportEvidence = buildContextPolicyMeasurementReportBinding(
    inputs.planRequest,
    inputs.policy,
    inputs.manifest,
    inputs.development,
    inputs.holdout,
    inputs.measurementDeclaration,
    inputs.reportDeclaration,
  )
  const caseBindingEvidence = bindContextStrategySubjectToDeclaredPolicy(
    inputs.planRequest,
    inputs.policy,
    strategySubject,
    inputs.bindingDeclaration,
  )

  if (reportEvidence.caseId !== member.caseId) {
    fail(`${label} reconstructed R7 caseId does not match declared member`)
  }
  if (reportEvidence.r1ResultIdentity !== member.r1ResultIdentity) {
    fail(`${label} reconstructed R7 r1ResultIdentity does not match declared member`)
  }
  if (reportEvidence.policyIdentity !== caseBindingEvidence.policyIdentity) {
    fail(`${label} reconstructed R7/R8 policyIdentity values do not match`)
  }
  if (reportEvidence.applicationIdentity !== caseBindingEvidence.applicationIdentity) {
    fail(`${label} reconstructed R7/R8 applicationIdentity values do not match`)
  }
  if (caseBindingEvidence.strategySubjectIdentity !== strategySubject.strategySubjectIdentity) {
    fail(`${label} reconstructed R8 binding does not carry the canonical strategy subject`)
  }
  if (
    canonicalize(caseBindingEvidence.strategySubject.strategyDeclaration) !==
    canonicalize(strategySubject.strategyDeclaration)
  ) {
    fail(`${label} reconstructed R8 binding does not carry the canonical strategy declaration`)
  }

  return deepFreeze({
    memberId: member.memberId,
    caseId: reportEvidence.caseId,
    r1ResultIdentity: reportEvidence.r1ResultIdentity,
    reportEvidenceIdentity: reportEvidence.reportEvidenceIdentity,
    measurementEvidenceIdentity: reportEvidence.measurementEvidenceIdentity,
    p2R2ReportIdentity: reportEvidence.p2R2ReportIdentity,
    bindingEvidenceIdentity: caseBindingEvidence.bindingEvidenceIdentity,
    policyIdentity: reportEvidence.policyIdentity,
    applicationIdentity: reportEvidence.applicationIdentity,
    reportEvidence,
    caseBindingEvidence,
  })
}

export function composeSingleStrategyTwoCaseReports(
  strategyDeclarationValue: unknown,
  compositionDeclarationValue: unknown,
  caseAInputsValue: unknown,
  caseBInputsValue: unknown,
): SingleStrategyTwoCaseReportCompositionEvidence {
  const strategyDeclaration = snapshot<unknown>(strategyDeclarationValue, "strategyDeclaration")
  const compositionDeclarationInput = snapshot<unknown>(
    compositionDeclarationValue,
    "compositionDeclaration",
  )
  const caseAInput = snapshot<unknown>(caseAInputsValue, "caseAInputs")
  const caseBInput = snapshot<unknown>(caseBInputsValue, "caseBInputs")

  const strategySubject = buildContextStrategySubject(strategyDeclaration)
  const compositionDeclaration = normalizeCompositionDeclaration(compositionDeclarationInput)
  if (compositionDeclaration.strategySubjectIdentity !== strategySubject.strategySubjectIdentity) {
    fail("compositionDeclaration.strategySubjectIdentity does not match canonical strategy subject")
  }

  const caseAInputs = normalizeCaseInputs(caseAInput, "caseAInputs")
  const caseBInputs = normalizeCaseInputs(caseBInput, "caseBInputs")
  const memberA = composeMember(
    compositionDeclaration.memberA,
    caseAInputs,
    strategySubject,
    "memberA",
  )
  const memberB = composeMember(
    compositionDeclaration.memberB,
    caseBInputs,
    strategySubject,
    "memberB",
  )

  if (memberA.reportEvidenceIdentity === memberB.reportEvidenceIdentity) {
    fail("composition members must have distinct P3-R7 reportEvidenceIdentity values")
  }
  if (memberA.bindingEvidenceIdentity === memberB.bindingEvidenceIdentity) {
    fail("composition members must have distinct P3-R8 bindingEvidenceIdentity values")
  }

  const projection = {
    version: P3_R9_COMPOSITION_EVIDENCE_VERSION,
    kind: P3_R9_COMPOSITION_EVIDENCE_KIND,
    compositionDeclaration,
    compositionId: compositionDeclaration.compositionId,
    strategySubject,
    strategySubjectIdentity: strategySubject.strategySubjectIdentity,
    memberA,
    memberB,
  }
  const compositionEvidenceIdentity = sha256Canonical(projection)
  return deepFreeze({
    version: projection.version,
    kind: projection.kind,
    compositionEvidenceIdentity,
    compositionDeclaration: projection.compositionDeclaration,
    compositionId: projection.compositionId,
    strategySubject: projection.strategySubject,
    strategySubjectIdentity: projection.strategySubjectIdentity,
    memberA: projection.memberA,
    memberB: projection.memberB,
  })
}
