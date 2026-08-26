import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

import { canonicalK6R1Json } from "./contracts.ts"
import {
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

type Rec = Record<string, unknown>
interface Budget { nodes: number; stringChars: number }

const SHA256 = /^[0-9a-f]{64}$/
const GIT_SHA = /^[0-9a-f]{40}$/
const DONE_GATE_STATUSES = new Set<string>(K6_R3_DONE_GATE_STATUSES)
const EXECUTION_STATUSES = new Set<string>(K6_R3_EXECUTION_RESULT_STATUSES)
const K5_STATUSES = new Set<string>(K5_R4_RECONCILIATION_STATUSES)
const STEP_ROLES = new Set<string>(["PRIMARY", "FALLBACK"])
const EVIDENCE_KINDS = new Set<string>(["receipt", "artifact", "event", "workspace"])

const INPUT_KEYS = ["routePlanRequest", "routePlan", "executionObservations", "verificationSource", "k5Reconciliation", "doneGateOutcome"] as const
const OBS_KEYS = ["planStepIndex", "executionReceiptSource"] as const
const DONE_KEYS = ["version", "verificationSourceIdentity", "status", "reasons", "evidence"] as const
const EVIDENCE_KEYS = ["kind", "ref"] as const
const EVIDENCE_DIGEST_KEYS = ["kind", "ref", "digest"] as const
const LINKED_KEYS = [
  "planStepIndex", "candidateId", "candidateKind", "provider", "model", "role",
  "executionReceiptSourceIdentity", "executionReceiptSourceDigest", "executionReceiptEvidenceId",
  "receiptId", "executionResultStatus",
] as const
const LINKAGE_KEYS = [
  "version", "linkageIdentity", "routePlanRequestIdentity", "routePlanIdentity", "eligibilityResultIdentity",
  "requestIdentity", "repositoryId", "canonicalBase", "candidateHead", "taskId", "executionObservations",
  "verificationSourceIdentity", "verificationSourceDigest", "verificationEvidenceId", "verificationPassed",
  "k5PackageIdentity", "k5ReconciliationIdentity", "k5Status", "doneGateOutcomeIdentity", "doneGateStatus",
] as const
const ENVELOPE_KEYS = ["input", "linkage"] as const

function bad(label: string, detail: string): never { throw new TypeError(`${label} ${detail}`) }
function tooLarge(label: string, detail: string): never { throw new RangeError(`${label} ${detail}`) }
function noProxy(value: unknown, label: string): void {
  if (typeof value === "object" && value !== null && utilTypes.isProxy(value)) bad(label, "must not be a Proxy")
}
function scalars(value: string, label: string): void {
  for (let i = 0; i < value.length; i += 1) {
    const c = value.charCodeAt(i)
    if (c >= 0xd800 && c <= 0xdbff) {
      if (i + 1 >= value.length) bad(label, "must contain only valid Unicode scalar values")
      const d = value.charCodeAt(i + 1)
      if (d < 0xdc00 || d > 0xdfff) bad(label, "must contain only valid Unicode scalar values")
      i += 1
    } else if (c >= 0xdc00 && c <= 0xdfff) bad(label, "must contain only valid Unicode scalar values")
  }
}
function node(budget: Budget, label: string): void {
  budget.nodes += 1
  if (budget.nodes > K6_R3_LIMITS.maxNodes) tooLarge(label, `exceeds node budget ${K6_R3_LIMITS.maxNodes}`)
}
function text(value: unknown, label: string, maxBytes: number, budget: Budget, allowEmpty = false): string {
  if (typeof value !== "string" || (!allowEmpty && value.length === 0) || value.includes("\0")) {
    bad(label, allowEmpty ? "must be a NUL-free string" : "must be a non-empty NUL-free string")
  }
  scalars(value, label)
  budget.stringChars += value.length
  if (budget.stringChars > K6_R3_LIMITS.maxTotalStringChars) tooLarge(label, `exceeds string-character budget ${K6_R3_LIMITS.maxTotalStringChars}`)
  if (Buffer.byteLength(value, "utf8") > maxBytes) tooLarge(label, `exceeds ${maxBytes} UTF-8 bytes`)
  return value
}
function sha(value: unknown, label: string, budget?: Budget): string {
  if (typeof value !== "string" || !SHA256.test(value)) bad(label, "must be 64 lowercase hexadecimal characters")
  if (budget) text(value, label, 64, budget)
  return value
}
function gitSha(value: unknown, label: string, budget?: Budget): string {
  if (typeof value !== "string" || !GIT_SHA.test(value)) bad(label, "must be 40 lowercase hexadecimal characters")
  if (budget) text(value, label, 40, budget)
  return value
}
function exact<T extends string>(value: unknown, expected: T, label: string): T {
  if (value !== expected) bad(label, `must equal ${expected}`)
  return expected
}
function en<T extends string>(value: unknown, allowed: ReadonlySet<string>, label: string): T {
  if (typeof value !== "string" || !allowed.has(value)) bad(label, "is unsupported")
  return value as T
}
function bool(value: unknown, label: string): boolean {
  if (typeof value !== "boolean") bad(label, "must be a boolean")
  return value
}
function indexNumber(value: unknown, label: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || Object.is(value, -0) || value < 0) bad(label, "must be a non-negative safe integer")
  return value
}
function rec(value: unknown, keys: readonly string[], label: string, budget: Budget): Rec {
  noProxy(value, label)
  if (value === null || typeof value !== "object" || Array.isArray(value)) bad(label, "must be a plain object")
  node(budget, label)
  const proto = Object.getPrototypeOf(value)
  if (proto !== Object.prototype && proto !== null) bad(label, "must be a plain object")
  if (Object.getOwnPropertySymbols(value).length) bad(label, "must not contain symbol fields")
  const names = Object.getOwnPropertyNames(value)
  if (names.length !== keys.length) bad(label, "has an invalid key set")
  const allowed = new Set(keys)
  const out = Object.create(null) as Rec
  for (const key of names) {
    if (!allowed.has(key)) bad(label, `contains unknown field: ${key}`)
    const descriptor = Object.getOwnPropertyDescriptor(value, key)
    if (!descriptor || !("value" in descriptor) || !descriptor.enumerable) bad(`${label}.${key}`, "must be an enumerable data property")
    if (descriptor.value === undefined) bad(`${label}.${key}`, "must not be undefined")
    out[key] = descriptor.value
  }
  for (const key of keys) if (!Object.hasOwn(out, key)) bad(label, `is missing required field: ${key}`)
  return out
}
function arr(value: unknown, label: string, min: number, max: number, budget: Budget): readonly unknown[] {
  noProxy(value, label)
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) bad(label, "must be a plain array")
  node(budget, label)
  if (Object.getOwnPropertySymbols(value).length) bad(label, "must not contain symbol fields")
  const ld = Object.getOwnPropertyDescriptor(value, "length")
  const length: unknown = ld && "value" in ld ? ld.value : undefined
  if (typeof length !== "number" || !Number.isSafeInteger(length) || Object.is(length, -0) || length < min || length > max) {
    tooLarge(label, `must contain ${min} through ${max} entries`)
  }
  const out: unknown[] = []
  for (let i = 0; i < length; i += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(i))
    if (!descriptor) bad(label, "must be dense")
    if (!("value" in descriptor) || !descriptor.enumerable) bad(`${label}[${i}]`, "must be an enumerable data property")
    if (descriptor.value === undefined) bad(`${label}[${i}]`, "must not be undefined")
    out.push(descriptor.value)
  }
  if (Object.getOwnPropertyNames(value).length !== length + 1) bad(label, "contains unexpected array fields")
  return out
}
function digest(value: unknown): string {
  return createHash("sha256").update(canonicalK6R1Json(value), "utf8").digest("hex")
}
function receiptMetadata(source: K5R2SourceLink, label: string): K5R2ExecutionReceiptMetadata {
  if (source.sourceKind !== "EXECUTION_RECEIPT") bad(`${label}.sourceKind`, "must equal EXECUTION_RECEIPT")
  return source.metadata as K5R2ExecutionReceiptMetadata
}
function verificationMetadata(source: K5R2SourceLink, label: string): K5R2VerificationReportMetadata {
  if (source.sourceKind !== "VERIFICATION_REPORT") bad(`${label}.sourceKind`, "must equal VERIFICATION_REPORT")
  return source.metadata as K5R2VerificationReportMetadata
}
function revisionMatch(source: K5R2SourceLink, plan: K6R2RoutePlan, label: string): void {
  if (source.canonicalBase !== plan.canonicalBase) bad(`${label}.canonicalBase`, "must match routePlan.canonicalBase")
  if (source.candidateHead !== plan.candidateHead) bad(`${label}.candidateHead`, "must match routePlan.candidateHead")
}
function k5Member(source: K5R2SourceLink, kind: "VERIFICATION" | "EXECUTION_RECEIPT", reconciliation: K5R4ProofStateReconciliation, label: string): void {
  const matches = reconciliation.results.filter((result) => result.evidenceId === source.evidenceId)
  if (matches.length !== 1) bad(label, "must match exactly one K5-R4 result by evidenceId")
  const match = matches[0]
  if (!match || match.evidenceKind !== kind || match.linkageLayer !== "K5_R2" || match.linkStatus !== "LINKED" || match.sourceIdentity === null) {
    bad(label, "must match K5-R4 evidence kind, K5_R2 linkage layer, LINKED status, and non-null source identity")
  }
  if (match.sourceIdentity !== source.sourceIdentity) bad(label, "sourceIdentity does not match repository-bound K5-R4 membership")
}

function doneEvidence(value: unknown, label: string, budget: Budget): K6R3DoneGateEvidenceRef {
  noProxy(value, label)
  if (value === null || typeof value !== "object" || Array.isArray(value)) bad(label, "must be a plain object")
  const names = Object.getOwnPropertyNames(value)
  const hasDigest = names.includes("digest")
  const record = rec(value, hasDigest ? EVIDENCE_DIGEST_KEYS : EVIDENCE_KEYS, label, budget)
  const kind = en<VerificationEvidenceRef["kind"]>(record.kind, EVIDENCE_KINDS, `${label}.kind`)
  const ref = text(record.ref, `${label}.ref`, K6_R3_LIMITS.maxEvidenceRefBytes, budget)
  if (!hasDigest) return Object.freeze({ kind, ref })
  return Object.freeze({ kind, ref, digest: sha(record.digest, `${label}.digest`, budget) })
}
function doneOutcome(value: unknown, verificationIdentity: string, budget: Budget): K6R3DoneGateOutcome {
  const record = rec(value, DONE_KEYS, "doneGateOutcome", budget)
  const version = exact(record.version, K6_R3_DONE_GATE_OUTCOME_VERSION, "doneGateOutcome.version")
  const verificationSourceIdentity = sha(record.verificationSourceIdentity, "doneGateOutcome.verificationSourceIdentity", budget)
  if (verificationSourceIdentity !== verificationIdentity) bad("doneGateOutcome.verificationSourceIdentity", "must match verificationSource.sourceIdentity")
  const status = en<K6R3DoneGateStatus>(record.status, DONE_GATE_STATUSES, "doneGateOutcome.status")
  const reasons = arr(record.reasons, "doneGateOutcome.reasons", 0, K6_R3_LIMITS.maxDoneGateReasons, budget)
    .map((item, i) => text(item, `doneGateOutcome.reasons[${i}]`, K6_R3_LIMITS.maxReasonBytes, budget, true))
  if (status === "PROVEN_READY" && reasons.length !== 0) bad("doneGateOutcome.reasons", "must be empty for PROVEN_READY")
  if (status === "NOT_READY" && reasons.length === 0) bad("doneGateOutcome.reasons", "must contain at least one reason for NOT_READY")
  const evidence = arr(record.evidence, "doneGateOutcome.evidence", 0, K6_R3_LIMITS.maxDoneGateEvidenceRefs, budget)
    .map((item, i) => doneEvidence(item, `doneGateOutcome.evidence[${i}]`, budget))
  const unique = evidence.map((item) => `${item.kind}:${item.ref}`)
  if (new Set(unique).size !== unique.length) bad("doneGateOutcome.evidence", "must not contain duplicate kind:ref entries")
  return Object.freeze({ version, verificationSourceIdentity, status, reasons: Object.freeze(reasons), evidence: Object.freeze(evidence) })
}

export function normalizeK6R3RouteOutcomeLinkageInput(value: unknown): K6R3RouteOutcomeLinkageInput {
  const budget: Budget = { nodes: 0, stringChars: 0 }
  const root = rec(value, INPUT_KEYS, "route outcome linkage input", budget)
  const routePlanRequest = validateK6R2RoutePlanRequest(root.routePlanRequest)
  const routePlan = validateK6R2RoutePlan(root.routePlan, routePlanRequest)
  if (routePlan.status !== "ROUTABLE" || routePlan.steps.length === 0) bad("routePlan", "must be ROUTABLE with at least one step for K6-R3")

  const seenSourceIdentities = new Set<string>()
  const seenReceiptIds = new Set<string>()
  const executionObservations = arr(root.executionObservations, "executionObservations", 1, K6_R3_LIMITS.maxExecutionObservations, budget)
    .map((item, i) => {
      const label = `executionObservations[${i}]`
      const record = rec(item, OBS_KEYS, label, budget)
      const planStepIndex = indexNumber(record.planStepIndex, `${label}.planStepIndex`)
      if (planStepIndex >= routePlan.steps.length) bad(`${label}.planStepIndex`, "must reference an existing routePlan step")
      const executionReceiptSource = validateK5R2SourceLink(record.executionReceiptSource)
      revisionMatch(executionReceiptSource, routePlan, `${label}.executionReceiptSource`)
      const metadata = receiptMetadata(executionReceiptSource, `${label}.executionReceiptSource`)
      if (seenSourceIdentities.has(executionReceiptSource.sourceIdentity)) bad("executionObservations", "must not contain duplicate execution receipt source identities")
      if (seenReceiptIds.has(metadata.receiptId)) bad("executionObservations", "must not contain duplicate receiptId values")
      seenSourceIdentities.add(executionReceiptSource.sourceIdentity)
      seenReceiptIds.add(metadata.receiptId)
      return Object.freeze({ planStepIndex, executionReceiptSource })
    })

  const verificationSource = validateK5R2SourceLink(root.verificationSource)
  revisionMatch(verificationSource, routePlan, "verificationSource")
  verificationMetadata(verificationSource, "verificationSource")

  const k5Reconciliation = validateK5R4ProofStateReconciliation(root.k5Reconciliation)
  if (k5Reconciliation.revision.repositoryId !== routePlan.repositoryId) bad("k5Reconciliation.revision.repositoryId", "must match routePlan.repositoryId")
  if (k5Reconciliation.revision.canonicalBase !== routePlan.canonicalBase) bad("k5Reconciliation.revision.canonicalBase", "must match routePlan.canonicalBase")
  if (k5Reconciliation.revision.candidateHead !== routePlan.candidateHead) bad("k5Reconciliation.revision.candidateHead", "must match routePlan.candidateHead")
  if (k5Reconciliation.status === "NOT_APPLICABLE") bad("k5Reconciliation.status", "cannot satisfy required K6-R3 source membership")

  k5Member(verificationSource, "VERIFICATION", k5Reconciliation, "verificationSource K5 membership")
  executionObservations.forEach((observation, i) => k5Member(
    observation.executionReceiptSource,
    "EXECUTION_RECEIPT",
    k5Reconciliation,
    `executionObservations[${i}] K5 membership`,
  ))

  const parsedDoneOutcome = doneOutcome(root.doneGateOutcome, verificationSource.sourceIdentity, budget)
  return Object.freeze({
    routePlanRequest,
    routePlan,
    executionObservations: Object.freeze(executionObservations),
    verificationSource,
    k5Reconciliation,
    doneGateOutcome: parsedDoneOutcome,
  })
}

function linked(input: K6R3RouteOutcomeLinkageInput): readonly K6R3LinkedExecutionObservation[] {
  return Object.freeze(input.executionObservations.map((observation, i) => {
    const step = input.routePlan.steps[observation.planStepIndex]
    if (!step) bad(`executionObservations[${i}].planStepIndex`, "must reference an existing routePlan step")
    const source = observation.executionReceiptSource
    const metadata = receiptMetadata(source, `executionObservations[${i}].executionReceiptSource`)
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
function identityInput(input: K6R3RouteOutcomeLinkageInput): K6R3RouteOutcomeLinkageIdentityInput {
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
    executionObservations: linked(input),
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
  const preimage = identityInput(input)
  return Object.freeze({ ...preimage, linkageIdentity: digest(preimage) })
}

function parsedLinked(value: unknown, label: string, budget: Budget): K6R3LinkedExecutionObservation {
  const record = rec(value, LINKED_KEYS, label, budget)
  return Object.freeze({
    planStepIndex: indexNumber(record.planStepIndex, `${label}.planStepIndex`),
    candidateId: text(record.candidateId, `${label}.candidateId`, 256, budget),
    candidateKind: exact(record.candidateKind, "MODEL_PROVIDER", `${label}.candidateKind`),
    provider: text(record.provider, `${label}.provider`, 256, budget),
    model: text(record.model, `${label}.model`, 512, budget),
    role: en<K6R2StepRole>(record.role, STEP_ROLES, `${label}.role`),
    executionReceiptSourceIdentity: sha(record.executionReceiptSourceIdentity, `${label}.executionReceiptSourceIdentity`, budget),
    executionReceiptSourceDigest: sha(record.executionReceiptSourceDigest, `${label}.executionReceiptSourceDigest`, budget),
    executionReceiptEvidenceId: text(record.executionReceiptEvidenceId, `${label}.executionReceiptEvidenceId`, 128, budget),
    receiptId: text(record.receiptId, `${label}.receiptId`, 128, budget),
    executionResultStatus: en<K6R3ExecutionResultStatus>(record.executionResultStatus, EXECUTION_STATUSES, `${label}.executionResultStatus`),
  })
}
function parseLinkage(value: unknown): K6R3RouteOutcomeLinkage {
  const budget: Budget = { nodes: 0, stringChars: 0 }
  const record = rec(value, LINKAGE_KEYS, "route outcome linkage", budget)
  const executionObservations = arr(record.executionObservations, "route outcome linkage.executionObservations", 1, K6_R3_LIMITS.maxExecutionObservations, budget)
    .map((item, i) => parsedLinked(item, `route outcome linkage.executionObservations[${i}]`, budget))
  const preimage = Object.freeze({
    version: exact(record.version, K6_R3_ROUTE_OUTCOME_LINKAGE_VERSION, "route outcome linkage.version"),
    routePlanRequestIdentity: sha(record.routePlanRequestIdentity, "route outcome linkage.routePlanRequestIdentity", budget),
    routePlanIdentity: sha(record.routePlanIdentity, "route outcome linkage.routePlanIdentity", budget),
    eligibilityResultIdentity: sha(record.eligibilityResultIdentity, "route outcome linkage.eligibilityResultIdentity", budget),
    requestIdentity: sha(record.requestIdentity, "route outcome linkage.requestIdentity", budget),
    repositoryId: text(record.repositoryId, "route outcome linkage.repositoryId", K6_R3_LIMITS.maxRepositoryIdBytes, budget),
    canonicalBase: gitSha(record.canonicalBase, "route outcome linkage.canonicalBase", budget),
    candidateHead: gitSha(record.candidateHead, "route outcome linkage.candidateHead", budget),
    taskId: text(record.taskId, "route outcome linkage.taskId", K6_R3_LIMITS.maxTaskIdBytes, budget),
    executionObservations: Object.freeze(executionObservations),
    verificationSourceIdentity: sha(record.verificationSourceIdentity, "route outcome linkage.verificationSourceIdentity", budget),
    verificationSourceDigest: sha(record.verificationSourceDigest, "route outcome linkage.verificationSourceDigest", budget),
    verificationEvidenceId: text(record.verificationEvidenceId, "route outcome linkage.verificationEvidenceId", 128, budget),
    verificationPassed: bool(record.verificationPassed, "route outcome linkage.verificationPassed"),
    k5PackageIdentity: sha(record.k5PackageIdentity, "route outcome linkage.k5PackageIdentity", budget),
    k5ReconciliationIdentity: sha(record.k5ReconciliationIdentity, "route outcome linkage.k5ReconciliationIdentity", budget),
    k5Status: en<K5R4ReconciliationStatus>(record.k5Status, K5_STATUSES, "route outcome linkage.k5Status"),
    doneGateOutcomeIdentity: sha(record.doneGateOutcomeIdentity, "route outcome linkage.doneGateOutcomeIdentity", budget),
    doneGateStatus: en<K6R3DoneGateStatus>(record.doneGateStatus, DONE_GATE_STATUSES, "route outcome linkage.doneGateStatus"),
  }) satisfies K6R3RouteOutcomeLinkageIdentityInput
  const linkageIdentity = sha(record.linkageIdentity, "route outcome linkage.linkageIdentity", budget)
  if (linkageIdentity !== digest(preimage)) bad("route outcome linkage.linkageIdentity", "does not match deterministic recomputation")
  return Object.freeze({ ...preimage, linkageIdentity })
}

export function validateK6R3RouteOutcomeLinkage(value: unknown, inputValue: unknown): K6R3RouteOutcomeLinkage {
  const parsed = parseLinkage(value)
  const expected = createK6R3RouteOutcomeLinkage(inputValue)
  if (canonicalK6R1Json(parsed) !== canonicalK6R1Json(expected)) bad("route outcome linkage", "does not exactly project the validated K6-R3 input")
  return parsed
}

export function validateK6R3RouteOutcomeLinkageEnvelope(value: unknown): K6R3RouteOutcomeLinkageEnvelope {
  const budget: Budget = { nodes: 0, stringChars: 0 }
  const record = rec(value, ENVELOPE_KEYS, "route outcome linkage envelope", budget)
  const input = normalizeK6R3RouteOutcomeLinkageInput(record.input)
  const linkage = validateK6R3RouteOutcomeLinkage(record.linkage, input)
  return Object.freeze({ input, linkage })
}
