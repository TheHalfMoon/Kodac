import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

import {
  canonicalK6R1Json,
  validateK6R2RoutePlan,
  validateK6R2RoutePlanRequest,
  type K6R2RoutePlan,
  type K6R2RoutePlanRequest,
  type K6R2StepRole,
} from "./route-plan-contracts.ts"
import {
  validateK5R2SourceLink,
  type K5R2ExecutionReceiptMetadata,
  type K5R2SourceLink,
  type K5R2VerificationReportMetadata,
} from "../proof-review/linkage-contracts.ts"
import {
  K5_R4_RECONCILIATION_STATUSES,
  validateK5R4ProofStateReconciliation,
  type K5R4ProofStateReconciliation,
  type K5R4ReconciliationStatus,
} from "../proof-review/reconciliation-contracts.ts"
import type { VerificationEvidenceRef } from "../verification/types.ts"

export const K6_R3_ROUTE_OUTCOME_LINKAGE_VERSION = "kodac-k6-r3-route-outcome-linkage-v1" as const
export const K6_R3_DONE_GATE_OUTCOME_VERSION = "kodac-k6-r3-done-gate-outcome-v1" as const
export const K6_R3_DONE_GATE_STATUSES = Object.freeze(["PROVEN_READY", "NOT_READY"] as const)
export const K6_R3_EXECUTION_RESULT_STATUSES = Object.freeze(["success", "blocked", "failure"] as const)

export const K6_R3_LIMITS = Object.freeze({
  maxDepth: 32,
  maxNodes: 100_000,
  maxTotalStringChars: 4_000_000,
  maxExecutionObservations: 4_096,
  maxDoneGateReasons: 4_096,
  maxDoneGateEvidenceRefs: 16_384,
  maxReasonBytes: 4_096,
  maxEvidenceRefBytes: 4_096,
  maxRepositoryIdBytes: 512,
  maxTaskIdBytes: 256,
} as const)

export type K6R3DoneGateStatus = typeof K6_R3_DONE_GATE_STATUSES[number]
export type K6R3ExecutionResultStatus = typeof K6_R3_EXECUTION_RESULT_STATUSES[number]

export interface K6R3DoneGateEvidenceRef {
  readonly kind: VerificationEvidenceRef["kind"]
  readonly ref: string
  readonly digest?: string
}

export interface K6R3DoneGateOutcome {
  readonly version: typeof K6_R3_DONE_GATE_OUTCOME_VERSION
  readonly verificationSourceIdentity: string
  readonly status: K6R3DoneGateStatus
  readonly reasons: readonly string[]
  readonly evidence: readonly K6R3DoneGateEvidenceRef[]
}

export interface K6R3ExecutionObservationInput {
  readonly planStepIndex: number
  readonly executionReceiptSource: K5R2SourceLink
}

export interface K6R3RouteOutcomeLinkageInput {
  readonly routePlanRequest: K6R2RoutePlanRequest
  readonly routePlan: K6R2RoutePlan
  readonly executionObservations: readonly K6R3ExecutionObservationInput[]
  readonly verificationSource: K5R2SourceLink
  readonly k5Reconciliation: K5R4ProofStateReconciliation
  readonly doneGateOutcome: K6R3DoneGateOutcome
}

export interface K6R3LinkedExecutionObservation {
  readonly planStepIndex: number
  readonly candidateId: string
  readonly candidateKind: "MODEL_PROVIDER"
  readonly provider: string
  readonly model: string
  readonly role: K6R2StepRole
  readonly executionReceiptSourceIdentity: string
  readonly executionReceiptSourceDigest: string
  readonly executionReceiptEvidenceId: string
  readonly receiptId: string
  readonly executionResultStatus: K6R3ExecutionResultStatus
}

export interface K6R3RouteOutcomeLinkageIdentityInput {
  readonly version: typeof K6_R3_ROUTE_OUTCOME_LINKAGE_VERSION
  readonly routePlanRequestIdentity: string
  readonly routePlanIdentity: string
  readonly eligibilityResultIdentity: string
  readonly requestIdentity: string
  readonly repositoryId: string
  readonly canonicalBase: string
  readonly candidateHead: string
  readonly taskId: string
  readonly executionObservations: readonly K6R3LinkedExecutionObservation[]
  readonly verificationSourceIdentity: string
  readonly verificationSourceDigest: string
  readonly verificationEvidenceId: string
  readonly verificationPassed: boolean
  readonly k5PackageIdentity: string
  readonly k5ReconciliationIdentity: string
  readonly k5Status: K5R4ReconciliationStatus
  readonly doneGateOutcomeIdentity: string
  readonly doneGateStatus: K6R3DoneGateStatus
}

export interface K6R3RouteOutcomeLinkage extends K6R3RouteOutcomeLinkageIdentityInput {
  readonly linkageIdentity: string
}

export interface K6R3RouteOutcomeLinkageEnvelope {
  readonly input: K6R3RouteOutcomeLinkageInput
  readonly linkage: K6R3RouteOutcomeLinkage
}

type UnknownRecord = Record<string, unknown>
type SafeFrame =
  | { readonly kind: "value"; readonly value: unknown; readonly label: string; readonly depth: number }
  | { readonly kind: "leave"; readonly value: object }

interface ParseBudget {
  nodes: number
  stringChars: number
}

const SHA256 = /^[0-9a-f]{64}$/
const GIT_SHA = /^[0-9a-f]{40}$/
const DONE_GATE_STATUS_SET = new Set<string>(K6_R3_DONE_GATE_STATUSES)
const EXECUTION_RESULT_SET = new Set<string>(K6_R3_EXECUTION_RESULT_STATUSES)
const K5_STATUS_SET = new Set<string>(K5_R4_RECONCILIATION_STATUSES)
const EVIDENCE_KIND_SET = new Set<string>(["receipt", "artifact", "event", "workspace"])

const INPUT_KEYS = [
  "routePlanRequest",
  "routePlan",
  "executionObservations",
  "verificationSource",
  "k5Reconciliation",
  "doneGateOutcome",
] as const
const OBSERVATION_INPUT_KEYS = ["planStepIndex", "executionReceiptSource"] as const
const DONE_GATE_KEYS = ["version", "verificationSourceIdentity", "status", "reasons", "evidence"] as const
const EVIDENCE_KEYS = ["kind", "ref"] as const
const EVIDENCE_WITH_DIGEST_KEYS = ["kind", "ref", "digest"] as const
const LINKED_OBSERVATION_KEYS = [
  "planStepIndex",
  "candidateId",
  "candidateKind",
  "provider",
  "model",
  "role",
  "executionReceiptSourceIdentity",
  "executionReceiptSourceDigest",
  "executionReceiptEvidenceId",
  "receiptId",
  "executionResultStatus",
] as const
const LINKAGE_KEYS = [
  "version",
  "linkageIdentity",
  "routePlanRequestIdentity",
  "routePlanIdentity",
  "eligibilityResultIdentity",
  "requestIdentity",
  "repositoryId",
  "canonicalBase",
  "candidateHead",
  "taskId",
  "executionObservations",
  "verificationSourceIdentity",
  "verificationSourceDigest",
  "verificationEvidenceId",
  "verificationPassed",
  "k5PackageIdentity",
  "k5ReconciliationIdentity",
  "k5Status",
  "doneGateOutcomeIdentity",
  "doneGateStatus",
] as const
const ENVELOPE_KEYS = ["input", "linkage"] as const

function typeError(label: string, detail: string): never {
  throw new TypeError(`${label} ${detail}`)
}

function rangeError(label: string, detail: string): never {
  throw new RangeError(`${label} ${detail}`)
}

function assertNoProxy(value: unknown, label: string): void {
  if (typeof value === "object" && value !== null && utilTypes.isProxy(value)) {
    typeError(label, "must not be a Proxy")
  }
}

function budgetNode(budget: ParseBudget, label: string): void {
  budget.nodes += 1
  if (budget.nodes > K6_R3_LIMITS.maxNodes) rangeError(label, `exceeds node budget ${K6_R3_LIMITS.maxNodes}`)
}

function validUnicodeScalars(value: string, label: string): void {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index)
    if (code >= 0xd800 && code <= 0xdbff) {
      if (index + 1 >= value.length) typeError(label, "must contain only valid Unicode scalar values")
      const next = value.charCodeAt(index + 1)
      if (next < 0xdc00 || next > 0xdfff) typeError(label, "must contain only valid Unicode scalar values")
      index += 1
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      typeError(label, "must contain only valid Unicode scalar values")
    }
  }
}

function budgetString(value: string, label: string, budget: ParseBudget): void {
  validUnicodeScalars(value, label)
  budget.stringChars += value.length
  if (budget.stringChars > K6_R3_LIMITS.maxTotalStringChars) {
    rangeError(label, `exceeds total string-character budget ${K6_R3_LIMITS.maxTotalStringChars}`)
  }
}

function plainRecord(
  value: unknown,
  keys: readonly string[],
  label: string,
  depth: number,
  budget: ParseBudget,
): UnknownRecord {
  assertNoProxy(value, label)
  if (depth > K6_R3_LIMITS.maxDepth) rangeError(label, `exceeds depth ${K6_R3_LIMITS.maxDepth}`)
  if (value === null || typeof value !== "object" || Array.isArray(value)) typeError(label, "must be a plain object")
  budgetNode(budget, label)
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) typeError(label, "must be a plain object")
  if (Object.getOwnPropertySymbols(value).length !== 0) typeError(label, "must not contain symbol fields")
  const names = Object.getOwnPropertyNames(value)
  if (names.length !== keys.length) typeError(label, "has an invalid key set")
  const allowed = new Set(keys)
  const result = Object.create(null) as UnknownRecord
  for (const key of names) {
    if (!allowed.has(key)) typeError(label, `contains unknown field: ${key}`)
    const descriptor = Object.getOwnPropertyDescriptor(value, key)
    if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) {
      typeError(`${label}.${key}`, "must be an enumerable data property")
    }
    if (descriptor.value === undefined) typeError(`${label}.${key}`, "must not be undefined")
    result[key] = descriptor.value
  }
  for (const key of keys) if (!Object.hasOwn(result, key)) typeError(label, `is missing required field: ${key}`)
  return result
}

function denseArray(
  value: unknown,
  label: string,
  min: number,
  max: number,
  depth: number,
  budget: ParseBudget,
): readonly unknown[] {
  assertNoProxy(value, label)
  if (depth > K6_R3_LIMITS.maxDepth) rangeError(label, `exceeds depth ${K6_R3_LIMITS.maxDepth}`)
  if (!Array.isArray(value)) typeError(label, "must be an array")
  budgetNode(budget, label)
  if (Object.getPrototypeOf(value) !== Array.prototype) typeError(label, "must be a plain array")
  if (Object.getOwnPropertySymbols(value).length !== 0) typeError(label, "must not contain symbol fields")
  const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length")
  const length = lengthDescriptor !== undefined && "value" in lengthDescriptor ? lengthDescriptor.value : undefined
  if (typeof length !== "number" || !Number.isSafeInteger(length) || Object.is(length, -0) || length < min || length > max) {
    rangeError(label, `must contain ${min} through ${max} entries`)
  }
  const result: unknown[] = []
  for (let index = 0; index < length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index))
    if (descriptor === undefined) typeError(label, "must be dense")
    if (!("value" in descriptor) || !descriptor.enumerable) {
      typeError(`${label}[${index}]`, "must be an enumerable data property")
    }
    if (descriptor.value === undefined) typeError(`${label}[${index}]`, "must not be undefined")
    result.push(descriptor.value)
  }
  if (Object.getOwnPropertyNames(value).length !== length + 1) typeError(label, "contains unexpected array fields")
  return result
}

function boundedString(
  value: unknown,
  label: string,
  maxBytes: number,
  budget: ParseBudget,
  allowEmpty = false,
): string {
  if (typeof value !== "string" || (!allowEmpty && value.length === 0) || value.includes("\0")) {
    typeError(label, allowEmpty ? "must be a NUL-free string" : "must be a non-empty NUL-free string")
  }
  budgetString(value, label, budget)
  if (Buffer.byteLength(value, "utf8") > maxBytes) rangeError(label, `exceeds ${maxBytes} UTF-8 bytes`)
  return value
}

function sha256(value: unknown, label: string, budget?: ParseBudget): string {
  if (typeof value !== "string" || !SHA256.test(value)) typeError(label, "must be 64 lowercase hexadecimal characters")
  if (budget !== undefined) budgetString(value, label, budget)
  return value
}

function gitSha(value: unknown, label: string, budget?: ParseBudget): string {
  if (typeof value !== "string" || !GIT_SHA.test(value)) typeError(label, "must be 40 lowercase hexadecimal characters")
  if (budget !== undefined) budgetString(value, label, budget)
  return value
}

function exactString<T extends string>(value: unknown, expected: T, label: string): T {
  if (value !== expected) typeError(label, `must equal ${expected}`)
  return expected
}

function enumString<T extends string>(value: unknown, set: ReadonlySet<string>, label: string): T {
  if (typeof value !== "string" || !set.has(value)) typeError(label, "is unsupported")
  return value as T
}

function safeIndex(value: unknown, label: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || Object.is(value, -0) || value < 0) {
    typeError(label, "must be a non-negative safe integer")
  }
  return value
}

function bool(value: unknown, label: string): boolean {
  if (typeof value !== "boolean") typeError(label, "must be a boolean")
  return value
}

function digest(value: unknown): string {
  return createHash("sha256").update(canonicalK6R1Json(value), "utf8").digest("hex")
}

function assertSafeJson(value: unknown, label: string): void {
  const active = new WeakSet<object>()
  const stack: SafeFrame[] = [{ kind: "value", value, label, depth: 0 }]
  let nodes = 0
  let stringChars = 0

  while (stack.length !== 0) {
    const frame = stack.pop() as SafeFrame
    if (frame.kind === "leave") {
      active.delete(frame.value)
      continue
    }
    nodes += 1
    if (nodes > K6_R3_LIMITS.maxNodes) rangeError(frame.label, `exceeds node budget ${K6_R3_LIMITS.maxNodes}`)
    if (frame.depth > K6_R3_LIMITS.maxDepth) rangeError(frame.label, `exceeds depth ${K6_R3_LIMITS.maxDepth}`)
    const current = frame.value
    if (typeof current === "string") {
      validUnicodeScalars(current, frame.label)
      stringChars += current.length
      if (stringChars > K6_R3_LIMITS.maxTotalStringChars) {
        rangeError(frame.label, `exceeds total string-character budget ${K6_R3_LIMITS.maxTotalStringChars}`)
      }
      continue
    }
    if (current === null || typeof current === "boolean" || typeof current === "number") {
      if (typeof current === "number" && (!Number.isSafeInteger(current) || Object.is(current, -0))) {
        typeError(frame.label, "must be a non-negative-zero safe integer")
      }
      continue
    }
    if (typeof current !== "object") typeError(frame.label, "must contain only JSON data")
    assertNoProxy(current, frame.label)
    if (active.has(current)) typeError(frame.label, "must not contain cycles")
    active.add(current)
    stack.push({ kind: "leave", value: current })
    if (Array.isArray(current)) {
      if (Object.getPrototypeOf(current) !== Array.prototype) typeError(frame.label, "must be a plain array")
      if (Object.getOwnPropertySymbols(current).length !== 0) typeError(frame.label, "must not contain symbol fields")
      const lengthDescriptor = Object.getOwnPropertyDescriptor(current, "length")
      const length = lengthDescriptor !== undefined && "value" in lengthDescriptor ? lengthDescriptor.value : undefined
      if (typeof length !== "number" || !Number.isSafeInteger(length) || Object.is(length, -0) || length < 0) {
        typeError(frame.label, "must have a safe array length")
      }
      if (Object.getOwnPropertyNames(current).length !== length + 1) typeError(frame.label, "contains unexpected array fields")
      for (let index = length - 1; index >= 0; index -= 1) {
        const descriptor = Object.getOwnPropertyDescriptor(current, String(index))
        if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) {
          typeError(`${frame.label}[${index}]`, "must be an enumerable data property")
        }
        stack.push({ kind: "value", value: descriptor.value, label: `${frame.label}[${index}]`, depth: frame.depth + 1 })
      }
      continue
    }
    const prototype = Object.getPrototypeOf(current)
    if (prototype !== Object.prototype && prototype !== null) typeError(frame.label, "must be a plain object")
    if (Object.getOwnPropertySymbols(current).length !== 0) typeError(frame.label, "must not contain symbol fields")
    const names = Object.getOwnPropertyNames(current)
    for (let index = names.length - 1; index >= 0; index -= 1) {
      const key = names[index] as string
      const descriptor = Object.getOwnPropertyDescriptor(current, key)
      if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) {
        typeError(`${frame.label}.${key}`, "must be an enumerable data property")
      }
      stack.push({ kind: "value", value: descriptor.value, label: `${frame.label}.${key}`, depth: frame.depth + 1 })
    }
  }
}

function receiptMetadata(source: K5R2SourceLink, label: string): K5R2ExecutionReceiptMetadata {
  if (source.sourceKind !== "EXECUTION_RECEIPT") typeError(`${label}.sourceKind`, "must equal EXECUTION_RECEIPT")
  return source.metadata as K5R2ExecutionReceiptMetadata
}

function verificationMetadata(source: K5R2SourceLink, label: string): K5R2VerificationReportMetadata {
  if (source.sourceKind !== "VERIFICATION_REPORT") typeError(`${label}.sourceKind`, "must equal VERIFICATION_REPORT")
  return source.metadata as K5R2VerificationReportMetadata
}

function parseDoneGateEvidence(
  value: unknown,
  label: string,
  depth: number,
  budget: ParseBudget,
): K6R3DoneGateEvidenceRef {
  assertNoProxy(value, label)
  if (value === null || typeof value !== "object" || Array.isArray(value)) typeError(label, "must be a plain object")
  const names = Object.getOwnPropertyNames(value)
  const hasDigest = names.includes("digest")
  const record = plainRecord(value, hasDigest ? EVIDENCE_WITH_DIGEST_KEYS : EVIDENCE_KEYS, label, depth, budget)
  const kind = enumString<VerificationEvidenceRef["kind"]>(record.kind, EVIDENCE_KIND_SET, `${label}.kind`)
  const ref = boundedString(record.ref, `${label}.ref`, K6_R3_LIMITS.maxEvidenceRefBytes, budget)
  if (!hasDigest) return Object.freeze({ kind, ref })
  return Object.freeze({ kind, ref, digest: sha256(record.digest, `${label}.digest`, budget) })
}

function parseDoneGateOutcome(
  value: unknown,
  verificationSourceIdentity: string,
  budget: ParseBudget,
): K6R3DoneGateOutcome {
  const record = plainRecord(value, DONE_GATE_KEYS, "doneGateOutcome", 2, budget)
  const version = exactString(record.version, K6_R3_DONE_GATE_OUTCOME_VERSION, "doneGateOutcome.version")
  const sourceIdentity = sha256(record.verificationSourceIdentity, "doneGateOutcome.verificationSourceIdentity", budget)
  if (sourceIdentity !== verificationSourceIdentity) {
    typeError("doneGateOutcome.verificationSourceIdentity", "must match verificationSource.sourceIdentity")
  }
  const status = enumString<K6R3DoneGateStatus>(record.status, DONE_GATE_STATUS_SET, "doneGateOutcome.status")
  const reasons = denseArray(
    record.reasons,
    "doneGateOutcome.reasons",
    0,
    K6_R3_LIMITS.maxDoneGateReasons,
    3,
    budget,
  ).map((item, index) => boundedString(item, `doneGateOutcome.reasons[${index}]`, K6_R3_LIMITS.maxReasonBytes, budget, true))
  if (status === "PROVEN_READY" && reasons.length !== 0) typeError("doneGateOutcome.reasons", "must be empty for PROVEN_READY")
  if (status === "NOT_READY" && reasons.length === 0) typeError("doneGateOutcome.reasons", "must contain at least one reason for NOT_READY")
  const evidence = denseArray(
    record.evidence,
    "doneGateOutcome.evidence",
    0,
    K6_R3_LIMITS.maxDoneGateEvidenceRefs,
    3,
    budget,
  ).map((item, index) => parseDoneGateEvidence(item, `doneGateOutcome.evidence[${index}]`, 4, budget))
  const keys = evidence.map((item) => `${item.kind}:${item.ref}`)
  if (new Set(keys).size !== keys.length) typeError("doneGateOutcome.evidence", "must not contain duplicate kind:ref entries")
  return Object.freeze({ version, verificationSourceIdentity: sourceIdentity, status, reasons: Object.freeze(reasons), evidence: Object.freeze(evidence) })
}

function assertRevisionMatch(source: K5R2SourceLink, plan: K6R2RoutePlan, label: string): void {
  if (source.canonicalBase !== plan.canonicalBase) typeError(`${label}.canonicalBase`, "must match routePlan.canonicalBase")
  if (source.candidateHead !== plan.candidateHead) typeError(`${label}.candidateHead`, "must match routePlan.candidateHead")
}

function assertK5Membership(
  source: K5R2SourceLink,
  kind: "VERIFICATION" | "EXECUTION_RECEIPT",
  reconciliation: K5R4ProofStateReconciliation,
  label: string,
): void {
  const matches = reconciliation.results.filter((result) => result.evidenceId === source.evidenceId)
  if (matches.length !== 1) typeError(label, "must match exactly one K5-R4 result by evidenceId")
  const match = matches[0]
  if (match === undefined || match.evidenceKind !== kind || match.linkageLayer !== "K5_R2" || match.sourceIdentity === null) {
    typeError(label, "must match K5-R4 evidence kind, K5_R2 linkage layer, and non-null source identity")
  }
  if (match.sourceIdentity !== source.sourceIdentity) typeError(label, "sourceIdentity does not match repository-bound K5-R4 membership")
}

export function normalizeK6R3RouteOutcomeLinkageInput(value: unknown): K6R3RouteOutcomeLinkageInput {
  const budget: ParseBudget = { nodes: 0, stringChars: 0 }
  const record = plainRecord(value, INPUT_KEYS, "route outcome linkage input", 1, budget)

  const routePlanRequest = validateK6R2RoutePlanRequest(record.routePlanRequest)
  const routePlan = validateK6R2RoutePlan(record.routePlan, routePlanRequest)
  if (routePlan.status !== "ROUTABLE" || routePlan.steps.length === 0) {
    typeError("routePlan", "must be ROUTABLE with at least one step for K6-R3")
  }

  const seenSourceIdentities = new Set<string>()
  const seenReceiptIds = new Set<string>()
  const executionObservations = denseArray(
    record.executionObservations,
    "executionObservations",
    1,
    K6_R3_LIMITS.maxExecutionObservations,
    2,
    budget,
  ).map((item, index) => {
    const label = `executionObservations[${index}]`
    const observation = plainRecord(item, OBSERVATION_INPUT_KEYS, label, 3, budget)
    const planStepIndex = safeIndex(observation.planStepIndex, `${label}.planStepIndex`)
    if (planStepIndex >= routePlan.steps.length) typeError(`${label}.planStepIndex`, "must reference an existing routePlan step")
    const source = validateK5R2SourceLink(observation.executionReceiptSource)
    assertRevisionMatch(source, routePlan, `${label}.executionReceiptSource`)
    const metadata = receiptMetadata(source, `${label}.executionReceiptSource`)
    if (seenSourceIdentities.has(source.sourceIdentity)) typeError("executionObservations", "must not contain duplicate execution receipt source identities")
    if (seenReceiptIds.has(metadata.receiptId)) typeError("executionObservations", "must not contain duplicate receiptId values")
    seenSourceIdentities.add(source.sourceIdentity)
    seenReceiptIds.add(metadata.receiptId)
    return Object.freeze({ planStepIndex, executionReceiptSource: source })
  })

  const verificationSource = validateK5R2SourceLink(record.verificationSource)
  assertRevisionMatch(verificationSource, routePlan, "verificationSource")
  verificationMetadata(verificationSource, "verificationSource")

  const k5Reconciliation = validateK5R4ProofStateReconciliation(record.k5Reconciliation)
  if (k5Reconciliation.revision.repositoryId !== routePlan.repositoryId) {
    typeError("k5Reconciliation.revision.repositoryId", "must match routePlan.repositoryId")
  }
  if (k5Reconciliation.revision.canonicalBase !== routePlan.canonicalBase) {
    typeError("k5Reconciliation.revision.canonicalBase", "must match routePlan.canonicalBase")
  }
  if (k5Reconciliation.revision.candidateHead !== routePlan.candidateHead) {
    typeError("k5Reconciliation.revision.candidateHead", "must match routePlan.candidateHead")
  }
  if (k5Reconciliation.status === "NOT_APPLICABLE") typeError("k5Reconciliation.status", "cannot satisfy required K6-R3 source membership")

  assertK5Membership(verificationSource, "VERIFICATION", k5Reconciliation, "verificationSource K5 membership")
  for (let index = 0; index < executionObservations.length; index += 1) {
    const observation = executionObservations[index] as K6R3ExecutionObservationInput
    assertK5Membership(
      observation.executionReceiptSource,
      "EXECUTION_RECEIPT",
      k5Reconciliation,
      `executionObservations[${index}] K5 membership`,
    )
  }

  const doneGateOutcome = parseDoneGateOutcome(record.doneGateOutcome, verificationSource.sourceIdentity, budget)

  return Object.freeze({
    routePlanRequest,
    routePlan,
    executionObservations: Object.freeze(executionObservations),
    verificationSource,
    k5Reconciliation,
    doneGateOutcome,
  })
}

function linkedObservations(input: K6R3RouteOutcomeLinkageInput): readonly K6R3LinkedExecutionObservation[] {
  return Object.freeze(input.executionObservations.map((observation, index) => {
    const step = input.routePlan.steps[observation.planStepIndex]
    if (step === undefined) typeError(`executionObservations[${index}].planStepIndex`, "must reference an existing routePlan step")
    const source = observation.executionReceiptSource
    const metadata = receiptMetadata(source, `executionObservations[${index}].executionReceiptSource`)
    return Object.freeze({
      planStepIndex: observation.planStepIndex,
      candidateId: step.candidateId,
      candidateKind: step.candidateKind,
      provider: step.provider,
      model: step.model,
      role: step.role,
      executionReceiptSourceIdentity: source.sourceIdentity,
      executionReceiptSourceDigest: source.sourceDigest,
      executionReceiptEvidenceId: source.evidenceId,
      receiptId: metadata.receiptId,
      executionResultStatus: metadata.resultStatus,
    })
  }))
}

function linkageIdentityInput(input: K6R3RouteOutcomeLinkageInput): K6R3RouteOutcomeLinkageIdentityInput {
  const verification = verificationMetadata(input.verificationSource, "verificationSource")
  return Object.freeze({
    version: K6_R3_ROUTE_OUTCOME_LINKAGE_VERSION,
    routePlanRequestIdentity: input.routePlanRequest.planRequestIdentity,
    routePlanIdentity: input.routePlan.planIdentity,
    eligibilityResultIdentity: input.routePlan.eligibilityResultIdentity,
    requestIdentity: input.routePlan.requestIdentity,
    repositoryId: input.routePlan.repositoryId,
    canonicalBase: input.routePlan.canonicalBase,
    candidateHead: input.routePlan.candidateHead,
    taskId: input.routePlan.taskId,
    executionObservations: linkedObservations(input),
    verificationSourceIdentity: input.verificationSource.sourceIdentity,
    verificationSourceDigest: input.verificationSource.sourceDigest,
    verificationEvidenceId: input.verificationSource.evidenceId,
    verificationPassed: verification.passed,
    k5PackageIdentity: input.k5Reconciliation.packageIdentity,
    k5ReconciliationIdentity: input.k5Reconciliation.reconciliationIdentity,
    k5Status: input.k5Reconciliation.status,
    doneGateOutcomeIdentity: digest(input.doneGateOutcome),
    doneGateStatus: input.doneGateOutcome.status,
  })
}

export function createK6R3RouteOutcomeLinkage(value: unknown): K6R3RouteOutcomeLinkage {
  const input = normalizeK6R3RouteOutcomeLinkageInput(value)
  const identityInput = linkageIdentityInput(input)
  return Object.freeze({ ...identityInput, linkageIdentity: digest(identityInput) })
}

function parseLinkedObservation(
  value: unknown,
  label: string,
  depth: number,
  budget: ParseBudget,
): K6R3LinkedExecutionObservation {
  const record = plainRecord(value, LINKED_OBSERVATION_KEYS, label, depth, budget)
  return Object.freeze({
    planStepIndex: safeIndex(record.planStepIndex, `${label}.planStepIndex`),
    candidateId: boundedString(record.candidateId, `${label}.candidateId`, 256, budget),
    candidateKind: exactString(record.candidateKind, "MODEL_PROVIDER", `${label}.candidateKind`),
    provider: boundedString(record.provider, `${label}.provider`, 256, budget),
    model: boundedString(record.model, `${label}.model`, 512, budget),
    role: enumString<K6R2StepRole>(record.role, new Set<string>(["PRIMARY", "FALLBACK"]), `${label}.role`),
    executionReceiptSourceIdentity: sha256(record.executionReceiptSourceIdentity, `${label}.executionReceiptSourceIdentity`, budget),
    executionReceiptSourceDigest: sha256(record.executionReceiptSourceDigest, `${label}.executionReceiptSourceDigest`, budget),
    executionReceiptEvidenceId: boundedString(record.executionReceiptEvidenceId, `${label}.executionReceiptEvidenceId`, 128, budget),
    receiptId: boundedString(record.receiptId, `${label}.receiptId`, 128, budget),
    executionResultStatus: enumString<K6R3ExecutionResultStatus>(record.executionResultStatus, EXECUTION_RESULT_SET, `${label}.executionResultStatus`),
  })
}

function parseLinkage(value: unknown): K6R3RouteOutcomeLinkage {
  assertSafeJson(value, "route outcome linkage")
  const budget: ParseBudget = { nodes: 0, stringChars: 0 }
  const record = plainRecord(value, LINKAGE_KEYS, "route outcome linkage", 1, budget)
  const executionObservations = denseArray(
    record.executionObservations,
    "route outcome linkage.executionObservations",
    1,
    K6_R3_LIMITS.maxExecutionObservations,
    2,
    budget,
  ).map((item, index) => parseLinkedObservation(item, `route outcome linkage.executionObservations[${index}]`, 3, budget))
  const parsed = Object.freeze({
    version: exactString(record.version, K6_R3_ROUTE_OUTCOME_LINKAGE_VERSION, "route outcome linkage.version"),
    routePlanRequestIdentity: sha256(record.routePlanRequestIdentity, "route outcome linkage.routePlanRequestIdentity", budget),
    routePlanIdentity: sha256(record.routePlanIdentity, "route outcome linkage.routePlanIdentity", budget),
    eligibilityResultIdentity: sha256(record.eligibilityResultIdentity, "route outcome linkage.eligibilityResultIdentity", budget),
    requestIdentity: sha256(record.requestIdentity, "route outcome linkage.requestIdentity", budget),
    repositoryId: boundedString(record.repositoryId, "route outcome linkage.repositoryId", K6_R3_LIMITS.maxRepositoryIdBytes, budget),
    canonicalBase: gitSha(record.canonicalBase, "route outcome linkage.canonicalBase", budget),
    candidateHead: gitSha(record.candidateHead, "route outcome linkage.candidateHead", budget),
    taskId: boundedString(record.taskId, "route outcome linkage.taskId", K6_R3_LIMITS.maxTaskIdBytes, budget),
    executionObservations: Object.freeze(executionObservations),
    verificationSourceIdentity: sha256(record.verificationSourceIdentity, "route outcome linkage.verificationSourceIdentity", budget),
    verificationSourceDigest: sha256(record.verificationSourceDigest, "route outcome linkage.verificationSourceDigest", budget),
    verificationEvidenceId: boundedString(record.verificationEvidenceId, "route outcome linkage.verificationEvidenceId", 128, budget),
    verificationPassed: bool(record.verificationPassed, "route outcome linkage.verificationPassed"),
    k5PackageIdentity: sha256(record.k5PackageIdentity, "route outcome linkage.k5PackageIdentity", budget),
    k5ReconciliationIdentity: sha256(record.k5ReconciliationIdentity, "route outcome linkage.k5ReconciliationIdentity", budget),
    k5Status: enumString<K5R4ReconciliationStatus>(record.k5Status, K5_STATUS_SET, "route outcome linkage.k5Status"),
    doneGateOutcomeIdentity: sha256(record.doneGateOutcomeIdentity, "route outcome linkage.doneGateOutcomeIdentity", budget),
    doneGateStatus: enumString<K6R3DoneGateStatus>(record.doneGateStatus, DONE_GATE_STATUS_SET, "route outcome linkage.doneGateStatus"),
  }) satisfies K6R3RouteOutcomeLinkageIdentityInput
  const linkageIdentity = sha256(record.linkageIdentity, "route outcome linkage.linkageIdentity", budget)
  const expectedIdentity = digest(parsed)
  if (linkageIdentity !== expectedIdentity) typeError("route outcome linkage.linkageIdentity", "does not match deterministic recomputation")
  return Object.freeze({ ...parsed, linkageIdentity })
}

export function validateK6R3RouteOutcomeLinkage(value: unknown, inputValue: unknown): K6R3RouteOutcomeLinkage {
  const parsed = parseLinkage(value)
  const expected = createK6R3RouteOutcomeLinkage(inputValue)
  if (canonicalK6R1Json(parsed) !== canonicalK6R1Json(expected)) {
    typeError("route outcome linkage", "does not exactly project the validated K6-R3 input")
  }
  return parsed
}

export function validateK6R3RouteOutcomeLinkageEnvelope(value: unknown): K6R3RouteOutcomeLinkageEnvelope {
  const budget: ParseBudget = { nodes: 0, stringChars: 0 }
  const record = plainRecord(value, ENVELOPE_KEYS, "route outcome linkage envelope", 1, budget)
  const input = normalizeK6R3RouteOutcomeLinkageInput(record.input)
  const linkage = validateK6R3RouteOutcomeLinkage(record.linkage, input)
  return Object.freeze({ input, linkage })
}
