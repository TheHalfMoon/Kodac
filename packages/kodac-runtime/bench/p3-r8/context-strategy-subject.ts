import { createHash } from "node:crypto"

import { canonicalize } from "../p2-r1/contract.ts"
import {
  P3_R1_CONTEXT_SELECTION_PLAN_VERSION,
  P3_R1_EVIDENCE_LANES,
  P3_R1_LIMITS,
  type ContextEvidenceLane,
} from "../../src/context-selection-plan/contracts.ts"
import { buildContextSelectionPlan } from "../../src/context-selection-plan/context-selection-plan.ts"
import {
  P3_R2_DECLARED_POLICY_VERSION,
  P3_R2_POLICY_APPLICATION_VERSION,
} from "../../src/context-selection-policy/contracts.ts"
import { applyDeclaredContextSelectionPolicy } from "../../src/context-selection-policy/context-selection-policy.ts"
import {
  P3_R8_BINDING_DECLARATION_KIND,
  P3_R8_BINDING_DECLARATION_VERSION,
  P3_R8_BINDING_EVIDENCE_KIND,
  P3_R8_BINDING_EVIDENCE_VERSION,
  P3_R8_STRATEGY_DECLARATION_KIND,
  P3_R8_STRATEGY_DECLARATION_VERSION,
  P3_R8_STRATEGY_SUBJECT_KIND,
  P3_R8_STRATEGY_SUBJECT_VERSION,
  P3_R8_TASK_FAMILY,
  type ContextStrategyCaseBindingDeclaration,
  type ContextStrategyCaseBindingEvidence,
  type ContextStrategyDeclaration,
  type ContextStrategySubject,
} from "./contracts.ts"

type UnknownRecord = Record<string, unknown>

const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const SHA256 = /^[0-9a-f]{64}$/
const LANE_SET = new Set<string>(P3_R1_EVIDENCE_LANES)

const STRATEGY_DECLARATION_KEYS = [
  "version",
  "kind",
  "strategyId",
  "taskFamily",
  "planContractVersion",
  "policyContractVersion",
  "applicationContractVersion",
  "lanePriority",
  "maxSelectedItems",
  "maxSelectedUtf8Bytes",
  "maxPerGroupingKey",
] as const

const STRATEGY_SUBJECT_KEYS = [
  "version",
  "kind",
  "strategySubjectIdentity",
  "strategyDeclaration",
] as const

const BINDING_DECLARATION_KEYS = [
  "version",
  "kind",
  "bindingId",
  "strategySubjectIdentity",
] as const

function fail(message: string): never {
  throw new Error(`P3-R8 contract violation: ${message}`)
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

function stableId(value: unknown, label: string): string {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.trim() !== value ||
    value.includes("\0") ||
    Buffer.byteLength(value, "utf8") > P3_R1_LIMITS.maxStableIdBytes ||
    !STABLE_ID.test(value)
  ) {
    fail(`${label} must be a bounded canonical stable identifier`)
  }
  return value
}

function sha256Identity(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) {
    fail(`${label} must be a lowercase SHA-256 identity`)
  }
  return value
}

function positiveInteger(value: unknown, label: string, maximum: number): number {
  if (!Number.isSafeInteger(value) || (value as number) <= 0 || (value as number) > maximum) {
    fail(`${label} must be a positive safe integer <= ${maximum}`)
  }
  return value as number
}

function normalizeLanePriority(value: unknown): readonly ContextEvidenceLane[] {
  if (!Array.isArray(value) || value.length !== P3_R1_EVIDENCE_LANES.length) {
    fail(`strategyDeclaration.lanePriority must contain exactly ${P3_R1_EVIDENCE_LANES.length} lanes`)
  }
  const normalized = value.map((entry, index) => {
    if (typeof entry !== "string" || !LANE_SET.has(entry)) {
      fail(`strategyDeclaration.lanePriority[${index}] is unsupported`)
    }
    return entry as ContextEvidenceLane
  })
  if (new Set(normalized).size !== P3_R1_EVIDENCE_LANES.length) {
    fail("strategyDeclaration.lanePriority must be an exact duplicate-free lane permutation")
  }
  return Object.freeze(normalized)
}

function normalizeStrategyDeclaration(input: unknown): ContextStrategyDeclaration {
  const value = record(input, "strategyDeclaration")
  exactKeys(value, STRATEGY_DECLARATION_KEYS, "strategyDeclaration")
  if (
    value.version !== P3_R8_STRATEGY_DECLARATION_VERSION ||
    value.kind !== P3_R8_STRATEGY_DECLARATION_KIND
  ) {
    fail("unsupported strategy declaration contract")
  }
  if (value.taskFamily !== P3_R8_TASK_FAMILY) {
    fail("strategyDeclaration.taskFamily must be context-selection")
  }
  if (value.planContractVersion !== P3_R1_CONTEXT_SELECTION_PLAN_VERSION) {
    fail("strategyDeclaration.planContractVersion is unsupported")
  }
  if (value.policyContractVersion !== P3_R2_DECLARED_POLICY_VERSION) {
    fail("strategyDeclaration.policyContractVersion is unsupported")
  }
  if (value.applicationContractVersion !== P3_R2_POLICY_APPLICATION_VERSION) {
    fail("strategyDeclaration.applicationContractVersion is unsupported")
  }

  const strategyId = stableId(value.strategyId, "strategyDeclaration.strategyId")
  const lanePriority = normalizeLanePriority(value.lanePriority)
  const maxSelectedItems = positiveInteger(
    value.maxSelectedItems,
    "strategyDeclaration.maxSelectedItems",
    P3_R1_LIMITS.maxItems,
  )
  const maxSelectedUtf8Bytes = positiveInteger(
    value.maxSelectedUtf8Bytes,
    "strategyDeclaration.maxSelectedUtf8Bytes",
    P3_R1_LIMITS.maxUtf8Bytes,
  )
  const maxPerGroupingKey = positiveInteger(
    value.maxPerGroupingKey,
    "strategyDeclaration.maxPerGroupingKey",
    maxSelectedItems,
  )

  return Object.freeze({
    version: P3_R8_STRATEGY_DECLARATION_VERSION,
    kind: P3_R8_STRATEGY_DECLARATION_KIND,
    strategyId,
    taskFamily: P3_R8_TASK_FAMILY,
    planContractVersion: P3_R1_CONTEXT_SELECTION_PLAN_VERSION,
    policyContractVersion: P3_R2_DECLARED_POLICY_VERSION,
    applicationContractVersion: P3_R2_POLICY_APPLICATION_VERSION,
    lanePriority,
    maxSelectedItems,
    maxSelectedUtf8Bytes,
    maxPerGroupingKey,
  })
}

function hashCanonical(value: unknown): string {
  return createHash("sha256").update(canonicalize(value), "utf8").digest("hex")
}

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    for (const nested of Object.values(value as Record<string, unknown>)) {
      deepFreeze(nested)
    }
    Object.freeze(value)
  }
  return value
}

function sameStrings(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((entry, index) => entry === right[index])
}

export function buildContextStrategySubject(
  strategyDeclarationValue: unknown,
): ContextStrategySubject {
  const snapshotValue = snapshot<unknown>(strategyDeclarationValue, "strategyDeclaration")
  const strategyDeclaration = normalizeStrategyDeclaration(snapshotValue)
  const projection = {
    version: P3_R8_STRATEGY_SUBJECT_VERSION,
    kind: P3_R8_STRATEGY_SUBJECT_KIND,
    strategyDeclaration,
  }
  const strategySubjectIdentity = hashCanonical(projection)
  return deepFreeze({
    version: projection.version,
    kind: projection.kind,
    strategySubjectIdentity,
    strategyDeclaration: projection.strategyDeclaration,
  })
}

function normalizeStrategySubject(input: unknown): ContextStrategySubject {
  const value = record(input, "strategySubject")
  exactKeys(value, STRATEGY_SUBJECT_KEYS, "strategySubject")
  if (
    value.version !== P3_R8_STRATEGY_SUBJECT_VERSION ||
    value.kind !== P3_R8_STRATEGY_SUBJECT_KIND
  ) {
    fail("unsupported strategy subject contract")
  }
  const suppliedIdentity = sha256Identity(
    value.strategySubjectIdentity,
    "strategySubject.strategySubjectIdentity",
  )
  const rebuilt = buildContextStrategySubject(value.strategyDeclaration)
  if (suppliedIdentity !== rebuilt.strategySubjectIdentity) {
    fail("strategySubject.strategySubjectIdentity does not match canonical declaration")
  }
  return rebuilt
}

function normalizeBindingDeclaration(
  input: unknown,
  expectedStrategySubjectIdentity: string,
): ContextStrategyCaseBindingDeclaration {
  const value = record(input, "bindingDeclaration")
  exactKeys(value, BINDING_DECLARATION_KEYS, "bindingDeclaration")
  if (
    value.version !== P3_R8_BINDING_DECLARATION_VERSION ||
    value.kind !== P3_R8_BINDING_DECLARATION_KIND
  ) {
    fail("unsupported binding declaration contract")
  }
  const bindingId = stableId(value.bindingId, "bindingDeclaration.bindingId")
  const strategySubjectIdentity = sha256Identity(
    value.strategySubjectIdentity,
    "bindingDeclaration.strategySubjectIdentity",
  )
  if (strategySubjectIdentity !== expectedStrategySubjectIdentity) {
    fail("bindingDeclaration.strategySubjectIdentity does not match strategy subject")
  }
  return Object.freeze({
    version: P3_R8_BINDING_DECLARATION_VERSION,
    kind: P3_R8_BINDING_DECLARATION_KIND,
    bindingId,
    strategySubjectIdentity,
  })
}

export function bindContextStrategySubjectToDeclaredPolicy(
  planRequestValue: unknown,
  policyValue: unknown,
  strategySubjectValue: unknown,
  bindingDeclarationValue: unknown,
): ContextStrategyCaseBindingEvidence {
  const planRequest = snapshot<unknown>(planRequestValue, "planRequest")
  const policy = snapshot<unknown>(policyValue, "declaredPolicy")
  const strategySubjectInput = snapshot<unknown>(strategySubjectValue, "strategySubject")
  const bindingDeclarationInput = snapshot<unknown>(bindingDeclarationValue, "bindingDeclaration")

  const strategySubject = normalizeStrategySubject(strategySubjectInput)
  const bindingDeclaration = normalizeBindingDeclaration(
    bindingDeclarationInput,
    strategySubject.strategySubjectIdentity,
  )
  const strategyDeclaration = strategySubject.strategyDeclaration

  const plan = buildContextSelectionPlan(planRequest)
  if (plan.version !== strategyDeclaration.planContractVersion) {
    fail("rebuilt P3-R1 plan version does not match strategy declaration")
  }

  const application = applyDeclaredContextSelectionPolicy(planRequest, policy)
  const policyRecord = record(policy, "declaredPolicy")
  if (policyRecord.version !== strategyDeclaration.policyContractVersion) {
    fail("canonical P3-R2 policy version does not match strategy declaration")
  }
  if (application.version !== strategyDeclaration.applicationContractVersion) {
    fail("canonical P3-R2 application version does not match strategy declaration")
  }
  if (application.policyId !== strategyDeclaration.strategyId) {
    fail("canonical P3-R2 policyId does not match strategy declaration.strategyId")
  }
  if (!sameStrings(application.lanePriority, strategyDeclaration.lanePriority)) {
    fail("canonical P3-R2 lanePriority does not match strategy declaration")
  }
  if (
    application.maxSelectedItems !== strategyDeclaration.maxSelectedItems ||
    application.maxSelectedUtf8Bytes !== strategyDeclaration.maxSelectedUtf8Bytes ||
    application.maxPerGroupingKey !== strategyDeclaration.maxPerGroupingKey
  ) {
    fail("canonical P3-R2 policy caps do not match strategy declaration")
  }

  const projection = {
    version: P3_R8_BINDING_EVIDENCE_VERSION,
    kind: P3_R8_BINDING_EVIDENCE_KIND,
    bindingDeclaration,
    strategySubject,
    strategySubjectIdentity: strategySubject.strategySubjectIdentity,
    policyIdentity: application.policyIdentity,
    applicationIdentity: application.applicationIdentity,
    planIdentity: plan.planIdentity,
    requestIdentity: plan.requestIdentity,
    candidateSetIdentity: plan.candidateSetIdentity,
    repositoryIdentity: plan.repositoryIdentity,
    snapshotIdentity: plan.snapshotIdentity,
    contentIdentity: plan.contentIdentity,
    taskIdentity: plan.taskIdentity,
  }
  const bindingEvidenceIdentity = hashCanonical(projection)
  return deepFreeze({
    version: projection.version,
    kind: projection.kind,
    bindingEvidenceIdentity,
    bindingDeclaration: projection.bindingDeclaration,
    strategySubject: projection.strategySubject,
    strategySubjectIdentity: projection.strategySubjectIdentity,
    policyIdentity: projection.policyIdentity,
    applicationIdentity: projection.applicationIdentity,
    planIdentity: projection.planIdentity,
    requestIdentity: projection.requestIdentity,
    candidateSetIdentity: projection.candidateSetIdentity,
    repositoryIdentity: projection.repositoryIdentity,
    snapshotIdentity: projection.snapshotIdentity,
    contentIdentity: projection.contentIdentity,
    taskIdentity: projection.taskIdentity,
  })
}
