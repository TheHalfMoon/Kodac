import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

import {
  validateReceiptConfinementBinding,
  type ExecutionReceipt,
} from "../evidence/receipt.ts"
import {
  validateP7AppliedPatchEvidenceBinding,
} from "./p7-applied-patch-evidence-binding.ts"
import {
  P7_R6_VERIFICATION_REPORT_LIMITS,
} from "./p7-post-apply-verification-report-binding.ts"
import {
  validateP7PolicyReportEvidenceBinding,
  type P7PolicyReportEvidenceBinding,
  type P7PolicyReportEvidenceBindingBuildInput,
} from "./p7-policy-report-evidence-binding.ts"
import {
  validateP7ReceiptReportEvidenceBinding,
} from "./p7-receipt-report-evidence-binding.ts"
import {
  validateP7VerificationCommandSuccessEvidenceBinding,
  type P7VerificationCommandSuccessEvidenceBindingBuildInput,
} from "./p7-verification-command-success-evidence-binding.ts"

export const P7_R14_RECEIPT_RECORD_SET_EVIDENCE_BINDING_VERSION =
  "p7-r14-receipt-record-set-evidence-binding-v1" as const
export const P7_R14_RECEIPT_RECORD_SET_EVIDENCE_BOUND_STATE = "RECEIPT_RECORD_SET_EVIDENCE_BOUND" as const

export const P7_R14_RECEIPT_RECORD_SET_EVIDENCE_LIMITS = Object.freeze({
  maxReceipts: P7_R6_VERIFICATION_REPORT_LIMITS.maxEvidencePerCheck,
  maxPaths: P7_R6_VERIFICATION_REPORT_LIMITS.maxChangedPaths,
  maxPathCodePoints: P7_R6_VERIFICATION_REPORT_LIMITS.maxPathCodePoints,
  maxCapabilityCodePoints: 256,
  maxPolicyReasonCodePoints: 4_096,
  maxOutputBytes: 2_097_153,
  maxJsonNodes: 65_536,
  maxJsonDepth: 32,
} as const)

export interface P7ReceiptRecordMutationResultProjection {
  readonly kind: "mutation"
  readonly status: "success"
  readonly added: readonly string[]
  readonly modified: readonly string[]
  readonly deleted: readonly string[]
  readonly postStateDigest: string
}

export interface P7ReceiptRecordProcessResultProjection {
  readonly kind: "process"
  readonly status: "success"
  readonly outputDigest: string
  readonly outputBytes: number
  readonly exitCode: number
}

export interface P7ReceiptRecordProjection {
  readonly receiptRecordIdentity: string
  readonly receiptId: string
  readonly capability: string
  readonly inputDigest: string
  readonly paths: readonly string[]
  readonly policyDecision: "allow"
  readonly policyReason: string
  readonly approvalRecordIdentity: string | null
  readonly approvalEvidenceIdentity: string | null
  readonly confinementBindingIdentity: string | null
  readonly startedAt: string
  readonly completedAt: string
  readonly result: P7ReceiptRecordMutationResultProjection | P7ReceiptRecordProcessResultProjection
}

export interface P7ReceiptRecordSetEvidenceBindingBuildInput {
  readonly sourcePolicyReportEvidenceBinding: P7PolicyReportEvidenceBinding
  readonly sourcePolicyReportEvidenceBindingInput: P7PolicyReportEvidenceBindingBuildInput
  readonly receiptRecords: readonly unknown[]
}

export interface P7ReceiptRecordSetEvidenceBinding {
  readonly version: typeof P7_R14_RECEIPT_RECORD_SET_EVIDENCE_BINDING_VERSION
  readonly evidenceIdentity: string
  readonly state: typeof P7_R14_RECEIPT_RECORD_SET_EVIDENCE_BOUND_STATE
  readonly sourcePolicyReportEvidenceIdentity: string
  readonly sourceReceiptReportEvidenceIdentity: string
  readonly sourceGitChangeReportEvidenceIdentity: string
  readonly sourceWorkspaceReferenceEvidenceIdentity: string
  readonly sourceAgentCompletionEvidenceIdentity: string
  readonly sourceCommandSuccessEvidenceIdentity: string
  readonly sourceVerificationReportBindingIdentity: string
  readonly sourceAppliedEvidenceIdentity: string
  readonly proposalIdentity: string
  readonly authorizationIdentity: string
  readonly intentBindingIdentity: string
  readonly verificationPlanBindingIdentity: string
  readonly repositoryIdentity: string
  readonly canonicalBase: string
  readonly targetHead: string
  readonly postStateDigest: string
  readonly verificationPlanDigest: string
  readonly verificationReportIdentity: string
  readonly verificationSessionId: string
  readonly verificationStartedAt: string
  readonly verificationCompletedAt: string
  readonly receiptCount: number
  readonly receiptIds: readonly string[]
  readonly receiptRecordIdentities: readonly string[]
  readonly receiptRecordSetIdentity: string
  readonly receiptRecords: readonly P7ReceiptRecordProjection[]
}

type UnknownRecord = Record<string, unknown>
type EvidenceCore = Omit<P7ReceiptRecordSetEvidenceBinding, "evidenceIdentity">
type ProjectionCore = Omit<P7ReceiptRecordProjection, "receiptRecordIdentity">

type NormalizedApproval = Readonly<{
  version: "kodac-h4-r1-one-shot-approval-v1"
  requestIdentity: string
  requestInstanceId: string
  decisionEvidenceIdentity: string
  outcome: "allowed-once"
}>

type NormalizedReceipt = Readonly<{
  receiptId: string
  capability: string
  inputDigest: string
  paths: readonly string[]
  policy: Readonly<{ decision: "allow"; reason: string }>
  approval?: NormalizedApproval
  confinement?: ReturnType<typeof validateReceiptConfinementBinding>
  startedAt: string
  completedAt: string
  result:
    | Readonly<{
      status: "success"
      affected: Readonly<{ added: readonly string[]; modified: readonly string[]; deleted: readonly string[] }>
      postStateDigest: string
    }>
    | Readonly<{ status: "success"; outputDigest: string; outputBytes: number; exitCode: number }>
}>

const SHA256 = /^[0-9a-f]{64}$/
const GIT_OBJECT = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const CANONICAL_TIMESTAMP = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$/
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/u
const ARRAY_INDEX = /^(?:0|[1-9][0-9]*)$/
const APPROVAL_VERSION = "kodac-h4-r1-one-shot-approval-v1" as const

const BUILD_KEYS = ["sourcePolicyReportEvidenceBinding", "sourcePolicyReportEvidenceBindingInput", "receiptRecords"] as const
const RECEIPT_KEYS = [
  "receiptId", "capability", "inputDigest", "paths", "policy", "approval", "confinement", "startedAt", "completedAt", "result",
] as const
const RECEIPT_REQUIRED_KEYS = ["receiptId", "capability", "inputDigest", "paths", "policy", "startedAt", "completedAt", "result"] as const
const POLICY_KEYS = ["decision", "reason"] as const
const APPROVAL_KEYS = ["version", "requestIdentity", "requestInstanceId", "decisionEvidenceIdentity", "outcome"] as const
const AFFECTED_KEYS = ["added", "modified", "deleted"] as const
const MUTATION_RESULT_KEYS = ["status", "affected", "postStateDigest"] as const
const PROCESS_RESULT_KEYS = ["status", "outputDigest", "outputBytes", "exitCode"] as const
const OUTPUT_KEYS = [
  "version", "evidenceIdentity", "state", "sourcePolicyReportEvidenceIdentity", "sourceReceiptReportEvidenceIdentity",
  "sourceGitChangeReportEvidenceIdentity", "sourceWorkspaceReferenceEvidenceIdentity", "sourceAgentCompletionEvidenceIdentity",
  "sourceCommandSuccessEvidenceIdentity", "sourceVerificationReportBindingIdentity", "sourceAppliedEvidenceIdentity",
  "proposalIdentity", "authorizationIdentity", "intentBindingIdentity", "verificationPlanBindingIdentity", "repositoryIdentity",
  "canonicalBase", "targetHead", "postStateDigest", "verificationPlanDigest", "verificationReportIdentity",
  "verificationSessionId", "verificationStartedAt", "verificationCompletedAt", "receiptCount", "receiptIds",
  "receiptRecordIdentities", "receiptRecordSetIdentity", "receiptRecords",
] as const

function fail(label: string, detail: string): never {
  throw new TypeError(`${label} ${detail}`)
}

function hashText(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function codePointLength(value: string): number {
  let length = 0
  for (const _character of value) length += 1
  return length
}

function assertUnicodeScalars(value: string, label: string): void {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index)
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(index + 1)
      if (!(next >= 0xdc00 && next <= 0xdfff)) fail(label, "must contain only valid Unicode scalar values")
      index += 1
      continue
    }
    if (code >= 0xdc00 && code <= 0xdfff) fail(label, "must contain only valid Unicode scalar values")
  }
}

function text(
  value: unknown,
  label: string,
  maximum: number,
  options: { readonly allowEmpty?: boolean; readonly allowControls?: boolean } = {},
): string {
  if (typeof value !== "string") fail(label, "must be a string")
  assertUnicodeScalars(value, label)
  if (!options.allowEmpty && value.length === 0) fail(label, "must not be empty")
  if (!options.allowControls && CONTROL_CHARACTERS.test(value)) fail(label, "must not contain control characters")
  if (codePointLength(value) > maximum) fail(label, `must contain at most ${maximum} code points`)
  return value
}

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) fail(label, "must be a lowercase SHA-256 digest")
  return value
}

function gitObject(value: unknown, label: string): string {
  if (typeof value !== "string" || !GIT_OBJECT.test(value)) fail(label, "must be a lowercase 40- or 64-hex Git object identity")
  return value
}

function uuidV4(value: unknown, label: string): string {
  if (typeof value !== "string" || !UUID_V4.test(value)) fail(label, "must be a canonical lowercase UUID v4")
  return value
}

function canonicalTimestamp(value: unknown, label: string): string {
  if (typeof value !== "string" || !CANONICAL_TIMESTAMP.test(value)) fail(label, "must be a canonical UTC millisecond timestamp")
  const parsed = Date.parse(value)
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) fail(label, "must be a valid canonical UTC millisecond timestamp")
  return value
}

function safeInteger(value: unknown, label: string, minimum: number, maximum: number): number {
  if (
    typeof value !== "number" || !Number.isFinite(value) || !Number.isSafeInteger(value) || Object.is(value, -0) ||
    value < minimum || value > maximum
  ) {
    fail(label, `must be a safe integer from ${minimum} through ${maximum}`)
  }
  return value
}

function ownDataRecord(
  value: unknown,
  allowedKeys: readonly string[],
  requiredKeys: readonly string[],
  label: string,
): UnknownRecord {
  if (value === null || typeof value !== "object" || Array.isArray(value) || nodeTypes.isProxy(value)) {
    fail(label, "must be a non-Proxy plain object")
  }
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) fail(label, "must be a plain object")
  if (Object.getOwnPropertySymbols(value).length !== 0) fail(label, "must not contain symbol fields")
  const record = value as UnknownRecord
  const allowed = new Set(allowedKeys)
  for (const key of Object.getOwnPropertyNames(record)) {
    if (!allowed.has(key)) fail(label, `contains unknown field: ${key}`)
    const descriptor = Object.getOwnPropertyDescriptor(record, key)
    if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
      fail(`${label}.${key}`, "must be an enumerable data property")
    }
  }
  for (const key of requiredKeys) {
    if (!Object.prototype.hasOwnProperty.call(record, key)) fail(label, `is missing required field: ${key}`)
  }
  return record
}

function denseArray(value: unknown, label: string, maximum: number): readonly unknown[] {
  if (!Array.isArray(value) || nodeTypes.isProxy(value)) fail(label, "must be a non-Proxy array")
  if (Object.getPrototypeOf(value) !== Array.prototype) fail(label, "must use the standard Array prototype")
  if (value.length > maximum) fail(label, `must contain at most ${maximum} items`)
  if (Object.getOwnPropertySymbols(value).length !== 0) fail(label, "must not contain symbol fields")
  for (const key of Object.getOwnPropertyNames(value)) {
    if (key === "length") continue
    if (!ARRAY_INDEX.test(key)) fail(label, `contains unknown array field: ${key}`)
    const index = Number(key)
    if (!Number.isSafeInteger(index) || index < 0 || index >= value.length) fail(label, `contains invalid array index: ${key}`)
  }
  const output: unknown[] = []
  for (let index = 0; index < value.length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index))
    if (descriptor === undefined) fail(label, "must not be sparse")
    if (!("value" in descriptor) || descriptor.enumerable !== true) fail(`${label}[${index}]`, "must be an enumerable data property")
    output.push(descriptor.value)
  }
  return output
}

function assertSafeJsonGraph(value: unknown, label: string): void {
  const seen = new Set<object>()
  let nodes = 0
  const visit = (current: unknown, path: string, depth: number): void => {
    nodes += 1
    if (nodes > P7_R14_RECEIPT_RECORD_SET_EVIDENCE_LIMITS.maxJsonNodes) fail(label, "exceeds the maximum JSON node count")
    if (depth > P7_R14_RECEIPT_RECORD_SET_EVIDENCE_LIMITS.maxJsonDepth) fail(label, "exceeds the maximum JSON depth")
    if (current === null || typeof current === "boolean") return
    if (typeof current === "string") {
      assertUnicodeScalars(current, path)
      return
    }
    if (typeof current === "number") {
      if (!Number.isFinite(current) || !Number.isSafeInteger(current) || Object.is(current, -0)) fail(path, "must be a finite safe JSON integer")
      return
    }
    if (typeof current !== "object") fail(path, "must contain only JSON-compatible values")
    if (nodeTypes.isProxy(current)) fail(path, "must not contain Proxy values")
    if (seen.has(current)) fail(path, "must not contain aliases or cycles")
    seen.add(current)
    if (Array.isArray(current)) {
      const array = denseArray(current, path, P7_R14_RECEIPT_RECORD_SET_EVIDENCE_LIMITS.maxJsonNodes)
      for (let index = 0; index < array.length; index += 1) visit(array[index], `${path}[${index}]`, depth + 1)
      return
    }
    const prototype = Object.getPrototypeOf(current)
    if (prototype !== Object.prototype && prototype !== null) fail(path, "must be a plain object")
    if (Object.getOwnPropertySymbols(current).length !== 0) fail(path, "must not contain symbol fields")
    for (const key of Object.getOwnPropertyNames(current)) {
      const descriptor = Object.getOwnPropertyDescriptor(current, key)
      if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
        fail(`${path}.${key}`, "must be an enumerable data property")
      }
      visit(descriptor.value, `${path}.${key}`, depth + 1)
    }
  }
  visit(value, label, 0)
}

function canonicalize(value: unknown): unknown {
  if (value === null || typeof value !== "object") return value
  if (Array.isArray(value)) return value.map((item) => canonicalize(item))
  const record = value as UnknownRecord
  return Object.fromEntries(Object.keys(record).sort(compareStrings).map((key) => [key, canonicalize(record[key])]))
}

function canonicalJson(value: unknown): string {
  const encoded = JSON.stringify(canonicalize(value))
  if (encoded === undefined) fail("canonical value", "must be JSON serializable")
  return encoded
}

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value)
    for (const child of Object.values(value as UnknownRecord)) deepFreeze(child)
  }
  return value
}

function normalizedStringSet(value: unknown, label: string, maximum: number, maxCodePoints: number): readonly string[] {
  const raw = denseArray(value, label, maximum)
  const values = raw.map((entry, index) => text(entry, `${label}[${index}]`, maxCodePoints))
  if (new Set(values).size !== values.length) fail(label, "must not contain duplicate values")
  return Object.freeze([...values].sort(compareStrings))
}

function normalizeApproval(value: unknown): { readonly value: NormalizedApproval; readonly recordIdentity: string } | null {
  if (value === undefined) return null
  const record = ownDataRecord(value, APPROVAL_KEYS, APPROVAL_KEYS, "receipt.approval")
  if (record.version !== APPROVAL_VERSION) fail("receipt.approval.version", "is unsupported")
  const normalized = deepFreeze({
    version: APPROVAL_VERSION,
    requestIdentity: sha256(record.requestIdentity, "receipt.approval.requestIdentity"),
    requestInstanceId: uuidV4(record.requestInstanceId, "receipt.approval.requestInstanceId"),
    decisionEvidenceIdentity: sha256(record.decisionEvidenceIdentity, "receipt.approval.decisionEvidenceIdentity"),
    outcome: record.outcome === "allowed-once" ? "allowed-once" as const : fail("receipt.approval.outcome", "must equal allowed-once"),
  })
  return Object.freeze({ value: normalized, recordIdentity: hashText(canonicalJson(normalized)) })
}

function normalizePaths(value: unknown, label: string): readonly string[] {
  return normalizedStringSet(
    value,
    label,
    P7_R14_RECEIPT_RECORD_SET_EVIDENCE_LIMITS.maxPaths,
    P7_R14_RECEIPT_RECORD_SET_EVIDENCE_LIMITS.maxPathCodePoints,
  )
}

function normalizeAffected(value: unknown): Readonly<{ added: readonly string[]; modified: readonly string[]; deleted: readonly string[] }> {
  const record = ownDataRecord(value, AFFECTED_KEYS, AFFECTED_KEYS, "receipt.result.affected")
  const added = normalizePaths(record.added, "receipt.result.affected.added")
  const modified = normalizePaths(record.modified, "receipt.result.affected.modified")
  const deleted = normalizePaths(record.deleted, "receipt.result.affected.deleted")
  const all = [...added, ...modified, ...deleted]
  if (new Set(all).size !== all.length) fail("receipt.result.affected", "must not classify one path more than once")
  return deepFreeze({ added, modified, deleted })
}

function normalizeReceipt(value: unknown, index: number): NormalizedReceipt {
  const label = `receiptRecords[${index}]`
  const record = ownDataRecord(value, RECEIPT_KEYS, RECEIPT_REQUIRED_KEYS, label)
  const receiptId = uuidV4(record.receiptId, `${label}.receiptId`)
  const capability = text(record.capability, `${label}.capability`, P7_R14_RECEIPT_RECORD_SET_EVIDENCE_LIMITS.maxCapabilityCodePoints)
  const inputDigest = sha256(record.inputDigest, `${label}.inputDigest`)
  const paths = normalizePaths(record.paths, `${label}.paths`)
  const policy = ownDataRecord(record.policy, POLICY_KEYS, POLICY_KEYS, `${label}.policy`)
  if (policy.decision !== "allow") fail(`${label}.policy.decision`, "must equal allow")
  const policyReason = text(
    policy.reason,
    `${label}.policy.reason`,
    P7_R14_RECEIPT_RECORD_SET_EVIDENCE_LIMITS.maxPolicyReasonCodePoints,
    { allowEmpty: true, allowControls: true },
  )
  const startedAt = canonicalTimestamp(record.startedAt, `${label}.startedAt`)
  const completedAt = canonicalTimestamp(record.completedAt, `${label}.completedAt`)
  if (Date.parse(completedAt) < Date.parse(startedAt)) fail(`${label}.completedAt`, "must not precede startedAt")
  const approval = normalizeApproval(record.approval)
  const confinement = record.confinement === undefined ? undefined : validateReceiptConfinementBinding(record.confinement)
  if (confinement !== undefined && confinement.executionIntentIdentity !== inputDigest) {
    fail(`${label}.confinement.executionIntentIdentity`, "must match receipt inputDigest")
  }

  const rawResult = ownDataRecord(record.result, [...MUTATION_RESULT_KEYS, ...PROCESS_RESULT_KEYS], ["status"], `${label}.result`)
  if (rawResult.status !== "success") fail(`${label}.result.status`, "must equal success")
  const hasAffected = Object.prototype.hasOwnProperty.call(rawResult, "affected")
  const hasOutput = Object.prototype.hasOwnProperty.call(rawResult, "outputDigest") ||
    Object.prototype.hasOwnProperty.call(rawResult, "outputBytes") || Object.prototype.hasOwnProperty.call(rawResult, "exitCode")
  let result: NormalizedReceipt["result"]
  if (hasAffected) {
    const mutation = ownDataRecord(record.result, MUTATION_RESULT_KEYS, MUTATION_RESULT_KEYS, `${label}.result`)
    result = deepFreeze({
      status: "success" as const,
      affected: normalizeAffected(mutation.affected),
      postStateDigest: sha256(mutation.postStateDigest, `${label}.result.postStateDigest`),
    })
  } else if (hasOutput) {
    const process = ownDataRecord(record.result, PROCESS_RESULT_KEYS, PROCESS_RESULT_KEYS, `${label}.result`)
    result = deepFreeze({
      status: "success" as const,
      outputDigest: sha256(process.outputDigest, `${label}.result.outputDigest`),
      outputBytes: safeInteger(
        process.outputBytes,
        `${label}.result.outputBytes`,
        0,
        P7_R14_RECEIPT_RECORD_SET_EVIDENCE_LIMITS.maxOutputBytes,
      ),
      exitCode: safeInteger(process.exitCode, `${label}.result.exitCode`, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
    })
  } else {
    fail(`${label}.result`, "must be exactly one canonical success result variant")
  }

  return deepFreeze({
    receiptId,
    capability,
    inputDigest,
    paths,
    policy: Object.freeze({ decision: "allow" as const, reason: policyReason }),
    ...(approval === null ? {} : { approval: approval.value }),
    ...(confinement === undefined ? {} : { confinement }),
    startedAt,
    completedAt,
    result,
  })
}

function projectionFromReceipt(receipt: NormalizedReceipt): P7ReceiptRecordProjection {
  const approval = receipt.approval === undefined ? null : normalizeApproval(receipt.approval)!
  const result: P7ReceiptRecordMutationResultProjection | P7ReceiptRecordProcessResultProjection = "affected" in receipt.result
    ? deepFreeze({
      kind: "mutation" as const,
      status: "success" as const,
      added: receipt.result.affected.added,
      modified: receipt.result.affected.modified,
      deleted: receipt.result.affected.deleted,
      postStateDigest: receipt.result.postStateDigest,
    })
    : deepFreeze({
      kind: "process" as const,
      status: "success" as const,
      outputDigest: receipt.result.outputDigest,
      outputBytes: receipt.result.outputBytes,
      exitCode: receipt.result.exitCode,
    })
  const core: ProjectionCore = deepFreeze({
    receiptId: receipt.receiptId,
    capability: receipt.capability,
    inputDigest: receipt.inputDigest,
    paths: receipt.paths,
    policyDecision: "allow" as const,
    policyReason: receipt.policy.reason,
    approvalRecordIdentity: approval?.recordIdentity ?? null,
    approvalEvidenceIdentity: approval?.value.decisionEvidenceIdentity ?? null,
    confinementBindingIdentity: receipt.confinement?.bindingIdentity ?? null,
    startedAt: receipt.startedAt,
    completedAt: receipt.completedAt,
    result,
  })
  return deepFreeze({ ...core, receiptRecordIdentity: hashText(canonicalJson(core)) })
}

function toExecutionReceipt(receipt: NormalizedReceipt): ExecutionReceipt {
  const result = "affected" in receipt.result
    ? {
      status: "success" as const,
      affected: {
        added: [...receipt.result.affected.added],
        modified: [...receipt.result.affected.modified],
        deleted: [...receipt.result.affected.deleted],
      },
      postStateDigest: receipt.result.postStateDigest,
    }
    : {
      status: "success" as const,
      outputDigest: receipt.result.outputDigest,
      outputBytes: receipt.result.outputBytes,
      exitCode: receipt.result.exitCode,
    }
  return {
    receiptId: receipt.receiptId,
    capability: receipt.capability,
    inputDigest: receipt.inputDigest,
    paths: [...receipt.paths],
    policy: { decision: "allow", reason: receipt.policy.reason },
    ...(receipt.approval === undefined ? {} : { approval: { ...receipt.approval } }),
    ...(receipt.confinement === undefined ? {} : { confinement: receipt.confinement as ExecutionReceipt["confinement"] }),
    startedAt: receipt.startedAt,
    completedAt: receipt.completedAt,
    result,
  }
}

function equalStrings(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

function evidenceIdentity(core: EvidenceCore): string {
  return hashText(canonicalJson(core))
}

function normalizedBuildCore(value: unknown): EvidenceCore {
  const input = ownDataRecord(value, BUILD_KEYS, BUILD_KEYS, "receipt record set evidence build input")
  const sourceInput = input.sourcePolicyReportEvidenceBindingInput as P7PolicyReportEvidenceBindingBuildInput
  const source = validateP7PolicyReportEvidenceBinding(input.sourcePolicyReportEvidenceBinding, sourceInput)
  const r12 = validateP7ReceiptReportEvidenceBinding(
    sourceInput.sourceReceiptReportEvidenceBinding,
    sourceInput.sourceReceiptReportEvidenceBindingInput,
  )
  if (r12.evidenceIdentity !== source.sourceReceiptReportEvidenceIdentity) {
    fail("sourcePolicyReportEvidenceBinding.sourceReceiptReportEvidenceIdentity", "must match exact revalidated P7-R12 evidence")
  }

  assertSafeJsonGraph(input.receiptRecords, "receiptRecords")
  const rawRecords = denseArray(input.receiptRecords, "receiptRecords", P7_R14_RECEIPT_RECORD_SET_EVIDENCE_LIMITS.maxReceipts)
  if (rawRecords.length < 1) fail("receiptRecords", "must contain at least one receipt record")
  if (rawRecords.length !== source.policyReportReceiptCount || rawRecords.length !== r12.receiptReportCount) {
    fail("receiptRecords", "length must equal the exact P7-R13/P7-R12 receipt count")
  }
  const normalized = rawRecords.map((record, index) => normalizeReceipt(record, index))
  const ids = normalized.map((record) => record.receiptId)
  if (new Set(ids).size !== ids.length) fail("receiptRecords", "must not contain duplicate receipt IDs")
  normalized.sort((left, right) => compareStrings(left.receiptId, right.receiptId))
  const receiptIds = Object.freeze(normalized.map((record) => record.receiptId))
  if (!equalStrings(receiptIds, source.policyReportRefs) || !equalStrings(receiptIds, r12.receiptReportRefs)) {
    fail("receiptRecords", "receipt-id set must equal the exact P7-R13/P7-R12 receipt-reference set")
  }

  const r11Input = sourceInput.sourceReceiptReportEvidenceBindingInput.sourceGitChangeReportEvidenceBindingInput
  const r10Input = r11Input.sourceWorkspaceReferenceEvidenceBindingInput
  const r9Input = r10Input.sourceAgentCompletionEvidenceBindingInput
  const r8Input = r9Input.sourceCommandSuccessEvidenceBindingInput
  const r8 = validateP7VerificationCommandSuccessEvidenceBinding(r9Input.sourceCommandSuccessEvidenceBinding, r8Input)
  if (r8.evidenceIdentity !== source.sourceCommandSuccessEvidenceIdentity) {
    fail("sourcePolicyReportEvidenceBinding.sourceCommandSuccessEvidenceIdentity", "must match exact revalidated P7-R8 evidence")
  }
  const r6Input = r8Input.sourceVerificationReportBindingInput
  const r5Input = r6Input.sourceVerificationPlanBindingInput
  const r4Input = r5Input.sourceAppliedEvidenceInput
  const r4 = validateP7AppliedPatchEvidenceBinding(r5Input.sourceAppliedEvidence, r4Input)
  if (r4.appliedEvidenceIdentity !== source.appliedEvidenceIdentity) {
    fail("sourcePolicyReportEvidenceBinding.appliedEvidenceIdentity", "must match exact revalidated P7-R4 evidence")
  }

  const byId = new Map(normalized.map((record) => [record.receiptId, record]))
  const patchReceipt = byId.get(r4.executionReceiptId)
  if (patchReceipt === undefined) fail("receiptRecords", "is missing the exact P7-R4 repo.apply_patch receipt")
  if (patchReceipt.capability !== "repo.apply_patch" || !("affected" in patchReceipt.result)) {
    fail("receiptRecords", "exact P7-R4 receipt must be a repo.apply_patch mutation success")
  }
  validateP7AppliedPatchEvidenceBinding(
    r5Input.sourceAppliedEvidence,
    { ...r4Input, executionReceipt: toExecutionReceipt(patchReceipt) },
  )

  const commandReceiptsById = new Map(r8.commands.map((command) => [command.executionReceiptId, command]))
  for (const command of r8.commands) {
    if (!byId.has(command.executionReceiptId)) fail("receiptRecords", `is missing exact P7-R8 command receipt: ${command.commandId}`)
  }
  const anchoredR8Input: P7VerificationCommandSuccessEvidenceBindingBuildInput = {
    ...r8Input,
    commandExecutionEvidence: r8Input.commandExecutionEvidence.map((entry) => {
      const command = r8.commands.find((candidate) => candidate.commandId === entry.commandId)
      if (command === undefined) fail("source P7-R8 command evidence", `contains unknown command: ${entry.commandId}`)
      const supplied = byId.get(command.executionReceiptId)
      if (supplied === undefined) fail("receiptRecords", `is missing exact P7-R8 command receipt: ${entry.commandId}`)
      return {
        commandId: entry.commandId,
        executionIntentPreimage: entry.executionIntentPreimage,
        executionReceipt: toExecutionReceipt(supplied),
      }
    }),
  }
  validateP7VerificationCommandSuccessEvidenceBinding(r9Input.sourceCommandSuccessEvidenceBinding, anchoredR8Input)

  const projections = Object.freeze(normalized.map((record) => projectionFromReceipt(record)))
  const receiptRecordIdentities = Object.freeze(projections.map((record) => record.receiptRecordIdentity))
  const receiptRecordSetIdentity = hashText(canonicalJson(projections))
  if (commandReceiptsById.size !== r8.commandCount) fail("source P7-R8 command evidence", "must contain unique command receipt IDs")

  return deepFreeze({
    version: P7_R14_RECEIPT_RECORD_SET_EVIDENCE_BINDING_VERSION,
    state: P7_R14_RECEIPT_RECORD_SET_EVIDENCE_BOUND_STATE,
    sourcePolicyReportEvidenceIdentity: sha256(source.evidenceIdentity, "source.evidenceIdentity"),
    sourceReceiptReportEvidenceIdentity: sha256(source.sourceReceiptReportEvidenceIdentity, "source.sourceReceiptReportEvidenceIdentity"),
    sourceGitChangeReportEvidenceIdentity: sha256(source.sourceGitChangeReportEvidenceIdentity, "source.sourceGitChangeReportEvidenceIdentity"),
    sourceWorkspaceReferenceEvidenceIdentity: sha256(source.sourceWorkspaceReferenceEvidenceIdentity, "source.sourceWorkspaceReferenceEvidenceIdentity"),
    sourceAgentCompletionEvidenceIdentity: sha256(source.sourceAgentCompletionEvidenceIdentity, "source.sourceAgentCompletionEvidenceIdentity"),
    sourceCommandSuccessEvidenceIdentity: sha256(source.sourceCommandSuccessEvidenceIdentity, "source.sourceCommandSuccessEvidenceIdentity"),
    sourceVerificationReportBindingIdentity: sha256(source.sourceVerificationReportBindingIdentity, "source.sourceVerificationReportBindingIdentity"),
    sourceAppliedEvidenceIdentity: sha256(source.appliedEvidenceIdentity, "source.appliedEvidenceIdentity"),
    proposalIdentity: sha256(source.proposalIdentity, "source.proposalIdentity"),
    authorizationIdentity: sha256(source.authorizationIdentity, "source.authorizationIdentity"),
    intentBindingIdentity: sha256(source.intentBindingIdentity, "source.intentBindingIdentity"),
    verificationPlanBindingIdentity: sha256(source.verificationPlanBindingIdentity, "source.verificationPlanBindingIdentity"),
    repositoryIdentity: text(source.repositoryIdentity, "source.repositoryIdentity", 1_024),
    canonicalBase: gitObject(source.canonicalBase, "source.canonicalBase"),
    targetHead: gitObject(source.targetHead, "source.targetHead"),
    postStateDigest: sha256(source.postStateDigest, "source.postStateDigest"),
    verificationPlanDigest: sha256(source.verificationPlanDigest, "source.verificationPlanDigest"),
    verificationReportIdentity: sha256(source.verificationReportIdentity, "source.verificationReportIdentity"),
    verificationSessionId: text(source.verificationSessionId, "source.verificationSessionId", 256),
    verificationStartedAt: canonicalTimestamp(source.verificationStartedAt, "source.verificationStartedAt"),
    verificationCompletedAt: canonicalTimestamp(source.verificationCompletedAt, "source.verificationCompletedAt"),
    receiptCount: receiptIds.length,
    receiptIds,
    receiptRecordIdentities,
    receiptRecordSetIdentity,
    receiptRecords: projections,
  })
}

export function p7ReceiptRecordSetEvidenceBindingIdentity(input: P7ReceiptRecordSetEvidenceBindingBuildInput): string {
  return evidenceIdentity(normalizedBuildCore(input))
}

export function buildP7ReceiptRecordSetEvidenceBinding(
  input: P7ReceiptRecordSetEvidenceBindingBuildInput,
): P7ReceiptRecordSetEvidenceBinding {
  const core = normalizedBuildCore(input)
  return deepFreeze({ ...core, evidenceIdentity: evidenceIdentity(core) })
}

export function validateP7ReceiptRecordSetEvidenceBinding(
  value: unknown,
  input: P7ReceiptRecordSetEvidenceBindingBuildInput,
): P7ReceiptRecordSetEvidenceBinding {
  assertSafeJsonGraph(value, "receipt record set evidence binding")
  const record = ownDataRecord(value, OUTPUT_KEYS, OUTPUT_KEYS, "receipt record set evidence binding")
  const expected = buildP7ReceiptRecordSetEvidenceBinding(input)
  const claimedIdentity = sha256(record.evidenceIdentity, "receipt record set evidence binding.evidenceIdentity")
  if (claimedIdentity !== expected.evidenceIdentity) {
    fail("receipt record set evidence binding.evidenceIdentity", "does not match the canonical source-derived preimage")
  }
  const withoutIdentity: UnknownRecord = {}
  const expectedWithoutIdentity: UnknownRecord = {}
  for (const key of OUTPUT_KEYS) {
    if (key === "evidenceIdentity") continue
    withoutIdentity[key] = record[key]
    expectedWithoutIdentity[key] = expected[key]
  }
  if (canonicalJson(withoutIdentity) !== canonicalJson(expectedWithoutIdentity)) {
    fail("receipt record set evidence binding", "does not match canonical source-derived semantics")
  }
  return expected
}
