import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

import {
  validateReceiptConfinementBinding,
  type ExecutionReceipt,
} from "../evidence/receipt.ts"
import {
  validateP7ImmutablePatchProposal,
  type P7ImmutablePatchProposal,
  type P7PatchOperation,
} from "./p7-immutable-patch-proposal.ts"
import {
  validateP7PatchApplicationAuthorization,
  type P7PatchApplicationAuthorization,
} from "./p7-patch-application-authorization.ts"
import {
  P7_R3_PATCH_EXECUTION_CAPABILITY,
  validateP7PatchExecutionIntentBinding,
  type P7PatchExecutionIntentBinding,
} from "./p7-patch-execution-intent-binding.ts"

export const P7_R4_APPLIED_PATCH_EVIDENCE_BINDING_VERSION = "p7-r4-applied-patch-evidence-binding-v1" as const
export const P7_R4_APPLIED_PATCH_STATE = "APPLIED" as const
export const P7_R4_POLICY_DECISION = "allow" as const

export const P7_R4_APPLIED_PATCH_EVIDENCE_LIMITS = Object.freeze({
  maxPolicyReasonCodePoints: 4_096,
  maxPaths: 64,
  maxPathCodePoints: 1_024,
} as const)

export interface P7AppliedPatchOperation {
  readonly path: string
  readonly operation: P7PatchOperation
}

export interface P7AppliedPatchEvidenceBinding {
  readonly version: typeof P7_R4_APPLIED_PATCH_EVIDENCE_BINDING_VERSION
  readonly appliedEvidenceIdentity: string
  readonly state: typeof P7_R4_APPLIED_PATCH_STATE
  readonly proposalIdentity: string
  readonly authorizationIdentity: string
  readonly intentBindingIdentity: string
  readonly repositoryIdentity: string
  readonly canonicalBase: string
  readonly targetHead: string
  readonly patchArtifactDigest: string
  readonly inputDigest: string
  readonly executionReceiptIdentity: string
  readonly executionReceiptId: string
  readonly executionStartedAt: string
  readonly executionCompletedAt: string
  readonly capability: typeof P7_R3_PATCH_EXECUTION_CAPABILITY
  readonly policyDecision: typeof P7_R4_POLICY_DECISION
  readonly paths: readonly string[]
  readonly operations: readonly P7AppliedPatchOperation[]
  readonly postStateDigest: string
  readonly approvalEvidenceIdentity: string | null
  readonly confinementBindingIdentity: string | null
}

export interface P7AppliedPatchEvidenceBindingBuildInput {
  readonly sourceProposal: P7ImmutablePatchProposal
  readonly sourceAuthorization: P7PatchApplicationAuthorization
  readonly sourceIntentBinding: P7PatchExecutionIntentBinding
  readonly exactPatchText: string
  readonly executionReceipt: ExecutionReceipt
}

type UnknownRecord = Record<string, unknown>
type AppliedCore = Omit<P7AppliedPatchEvidenceBinding, "appliedEvidenceIdentity">

type NormalizedReceiptEvidence = {
  readonly receiptId: string
  readonly capability: typeof P7_R3_PATCH_EXECUTION_CAPABILITY
  readonly inputDigest: string
  readonly paths: readonly string[]
  readonly policyDecision: typeof P7_R4_POLICY_DECISION
  readonly policyReason: string
  readonly approvalEvidenceIdentity: string | null
  readonly confinementBindingIdentity: string | null
  readonly startedAt: string
  readonly completedAt: string
  readonly operations: readonly P7AppliedPatchOperation[]
  readonly postStateDigest: string
}

const SHA256 = /^[0-9a-f]{64}$/
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/u
const APPROVAL_VERSION = "kodac-h4-r1-one-shot-approval-v1" as const

const BUILD_KEYS = ["sourceProposal", "sourceAuthorization", "sourceIntentBinding", "exactPatchText", "executionReceipt"] as const
const OUTPUT_KEYS = [
  "version", "appliedEvidenceIdentity", "state", "proposalIdentity", "authorizationIdentity",
  "intentBindingIdentity", "repositoryIdentity", "canonicalBase", "targetHead", "patchArtifactDigest",
  "inputDigest", "executionReceiptIdentity", "executionReceiptId", "executionStartedAt", "executionCompletedAt",
  "capability", "policyDecision", "paths", "operations", "postStateDigest", "approvalEvidenceIdentity",
  "confinementBindingIdentity",
] as const
const RECEIPT_ALLOWED_KEYS = [
  "receiptId", "capability", "inputDigest", "paths", "policy", "approval", "confinement", "startedAt",
  "completedAt", "result",
] as const
const RECEIPT_REQUIRED_KEYS = ["receiptId", "capability", "inputDigest", "paths", "policy", "startedAt", "completedAt", "result"] as const
const POLICY_KEYS = ["decision", "reason"] as const
const RESULT_KEYS = ["status", "affected", "postStateDigest"] as const
const AFFECTED_KEYS = ["added", "modified", "deleted"] as const
const APPROVAL_KEYS = ["version", "requestIdentity", "requestInstanceId", "decisionEvidenceIdentity", "outcome"] as const
const OPERATION_KEYS = ["path", "operation"] as const

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
      if (index + 1 >= value.length) fail(label, "must contain only valid Unicode scalar values")
      const next = value.charCodeAt(index + 1)
      if (next < 0xdc00 || next > 0xdfff) fail(label, "must contain only valid Unicode scalar values")
      index += 1
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      fail(label, "must contain only valid Unicode scalar values")
    }
  }
}

function ownDataRecord(
  value: unknown,
  allowedKeys: readonly string[],
  requiredKeys: readonly string[],
  label: string,
): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value) || nodeTypes.isProxy(value)) {
    fail(label, "must be a non-proxy plain object")
  }
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) fail(label, "must be a plain object")

  const allowed = new Set<string>(allowedKeys)
  const result: UnknownRecord = {}
  for (const key of Reflect.ownKeys(value)) {
    if (typeof key !== "string") fail(label, "must not contain symbol fields")
    if (!allowed.has(key)) fail(label, `contains unknown field: ${key}`)
    const descriptor = Object.getOwnPropertyDescriptor(value, key)
    if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
      fail(`${label}.${key}`, "must be an enumerable data property")
    }
    result[key] = descriptor.value
  }
  for (const key of requiredKeys) if (!Object.hasOwn(result, key)) fail(label, `is missing required field: ${key}`)
  return result
}

function arrayData(value: unknown, label: string): readonly unknown[] {
  if (!Array.isArray(value) || nodeTypes.isProxy(value)) fail(label, "must be a non-proxy array")
  if (Object.getPrototypeOf(value) !== Array.prototype) fail(label, "must use the ordinary Array prototype")
  const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length")
  if (lengthDescriptor === undefined || !("value" in lengthDescriptor) || !Number.isSafeInteger(lengthDescriptor.value)) {
    fail(label, "must expose an ordinary array length")
  }
  const length = lengthDescriptor.value as number
  if (length > P7_R4_APPLIED_PATCH_EVIDENCE_LIMITS.maxPaths) {
    fail(label, `exceeds ${P7_R4_APPLIED_PATCH_EVIDENCE_LIMITS.maxPaths} entries`)
  }

  const keys = Reflect.ownKeys(value)
  const expected = new Set<string>(["length"])
  for (let index = 0; index < length; index += 1) expected.add(String(index))
  for (const key of keys) {
    if (typeof key !== "string" || !expected.has(key)) {
      fail(label, "must not contain symbol, accessor, sparse, or extra array properties")
    }
  }
  if (keys.length !== expected.size) fail(label, "must not contain sparse array slots")

  const result: unknown[] = []
  for (let index = 0; index < length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index))
    if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
      fail(`${label}[${index}]`, "must be an enumerable data property")
    }
    result.push(descriptor.value)
  }
  return result
}

function boundedText(value: unknown, label: string, maxCodePoints: number): string {
  if (typeof value !== "string" || value.length === 0) fail(label, "must be a non-empty string")
  assertUnicodeScalars(value, label)
  if (codePointLength(value) > maxCodePoints) fail(label, `exceeds ${maxCodePoints} Unicode code points`)
  if (CONTROL_CHARACTERS.test(value) || !/\S/u.test(value)) fail(label, "must be inert non-blank text without control characters")
  return value
}

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) fail(label, "must be 64 lowercase hexadecimal characters")
  return value
}

function uuidV4(value: unknown, label: string): string {
  if (typeof value !== "string" || !UUID_V4.test(value)) fail(label, "must be a canonical lowercase UUID v4")
  return value
}

function isoTimestamp(value: unknown, label: string): string {
  if (typeof value !== "string") fail(label, "must be a canonical ISO-8601 UTC timestamp")
  const parsed = Date.parse(value)
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) {
    fail(label, "must be a canonical ISO-8601 UTC timestamp")
  }
  return value
}

function canonicalPaths(value: unknown, label: string): readonly string[] {
  const values = arrayData(value, label)
  if (values.length < 1) fail(label, "must contain at least one path")
  const paths = values.map((item, index) => boundedText(
    item,
    `${label}[${index}]`,
    P7_R4_APPLIED_PATCH_EVIDENCE_LIMITS.maxPathCodePoints,
  ))
  if (new Set(paths).size !== paths.length) fail(label, "must not contain duplicate paths")
  for (let index = 1; index < paths.length; index += 1) {
    if (compareStrings(paths[index - 1]!, paths[index]!) >= 0) fail(label, "must be in canonical ascending order")
  }
  return Object.freeze(paths)
}

function affectedPaths(value: unknown): {
  readonly added: readonly string[]
  readonly modified: readonly string[]
  readonly deleted: readonly string[]
} {
  const record = ownDataRecord(value, AFFECTED_KEYS, AFFECTED_KEYS, "executionReceipt.result.affected")
  const normalize = (entry: unknown, label: string): readonly string[] => {
    const paths = arrayData(entry, label).map((item, index) => boundedText(
      item,
      `${label}[${index}]`,
      P7_R4_APPLIED_PATCH_EVIDENCE_LIMITS.maxPathCodePoints,
    ))
    if (new Set(paths).size !== paths.length) fail(label, "must not contain duplicate paths")
    return Object.freeze([...paths].sort(compareStrings))
  }
  const added = normalize(record.added, "executionReceipt.result.affected.added")
  const modified = normalize(record.modified, "executionReceipt.result.affected.modified")
  const deleted = normalize(record.deleted, "executionReceipt.result.affected.deleted")
  const all = [...added, ...modified, ...deleted]
  if (new Set(all).size !== all.length) fail("executionReceipt.result.affected", "must not classify one path more than once")
  return Object.freeze({ added, modified, deleted })
}

function operationsFromAffected(value: ReturnType<typeof affectedPaths>): readonly P7AppliedPatchOperation[] {
  const operations: P7AppliedPatchOperation[] = [
    ...value.added.map((path) => ({ path, operation: "ADD" as const })),
    ...value.modified.map((path) => ({ path, operation: "MODIFY" as const })),
    ...value.deleted.map((path) => ({ path, operation: "DELETE" as const })),
  ]
  operations.sort((left, right) => compareStrings(left.path, right.path))
  return Object.freeze(operations.map((operation) => Object.freeze(operation)))
}

function approvalRequestIdentity(inputDigest: string, paths: readonly string[]): string {
  const intent = JSON.stringify({
    capability: P7_R3_PATCH_EXECUTION_CAPABILITY,
    paths,
    inputDigest,
  })
  return hashText(`${APPROVAL_VERSION}\n${intent}`)
}

function normalizedApproval(value: unknown, inputDigest: string, paths: readonly string[]): string | null {
  if (value === undefined) return null
  const record = ownDataRecord(value, APPROVAL_KEYS, APPROVAL_KEYS, "executionReceipt.approval")
  if (record.version !== APPROVAL_VERSION) fail("executionReceipt.approval.version", "is unsupported")
  const requestIdentity = sha256(record.requestIdentity, "executionReceipt.approval.requestIdentity")
  if (requestIdentity !== approvalRequestIdentity(inputDigest, paths)) {
    fail("executionReceipt.approval.requestIdentity", "must match the exact receipt execution intent")
  }
  uuidV4(record.requestInstanceId, "executionReceipt.approval.requestInstanceId")
  const evidenceIdentity = sha256(record.decisionEvidenceIdentity, "executionReceipt.approval.decisionEvidenceIdentity")
  if (record.outcome !== "allowed-once") fail("executionReceipt.approval.outcome", "must equal allowed-once")
  return evidenceIdentity
}

function normalizedConfinement(value: unknown, inputDigest: string): string | null {
  if (value === undefined) return null
  const binding = validateReceiptConfinementBinding(value)
  if (binding.executionIntentIdentity !== inputDigest) {
    fail("executionReceipt.confinement.executionIntentIdentity", "must match executionReceipt.inputDigest")
  }
  return binding.bindingIdentity
}

function normalizedReceipt(value: unknown): NormalizedReceiptEvidence {
  const receipt = ownDataRecord(value, RECEIPT_ALLOWED_KEYS, RECEIPT_REQUIRED_KEYS, "executionReceipt")
  const receiptId = uuidV4(receipt.receiptId, "executionReceipt.receiptId")
  if (receipt.capability !== P7_R3_PATCH_EXECUTION_CAPABILITY) {
    fail("executionReceipt.capability", `must equal ${P7_R3_PATCH_EXECUTION_CAPABILITY}`)
  }
  const inputDigest = sha256(receipt.inputDigest, "executionReceipt.inputDigest")
  const paths = canonicalPaths(receipt.paths, "executionReceipt.paths")

  const policy = ownDataRecord(receipt.policy, POLICY_KEYS, POLICY_KEYS, "executionReceipt.policy")
  if (policy.decision !== P7_R4_POLICY_DECISION) fail("executionReceipt.policy.decision", "must equal allow")
  const policyReason = boundedText(
    policy.reason,
    "executionReceipt.policy.reason",
    P7_R4_APPLIED_PATCH_EVIDENCE_LIMITS.maxPolicyReasonCodePoints,
  )

  const startedAt = isoTimestamp(receipt.startedAt, "executionReceipt.startedAt")
  const completedAt = isoTimestamp(receipt.completedAt, "executionReceipt.completedAt")
  if (Date.parse(completedAt) < Date.parse(startedAt)) fail("executionReceipt.completedAt", "must not precede startedAt")

  const result = ownDataRecord(receipt.result, RESULT_KEYS, RESULT_KEYS, "executionReceipt.result")
  if (result.status !== "success") fail("executionReceipt.result.status", "must equal success")
  const affected = affectedPaths(result.affected)
  const operations = operationsFromAffected(affected)
  if (operations.length < 1) fail("executionReceipt.result.affected", "must attest at least one affected path")
  const postStateDigest = sha256(result.postStateDigest, "executionReceipt.result.postStateDigest")

  return Object.freeze({
    receiptId,
    capability: P7_R3_PATCH_EXECUTION_CAPABILITY,
    inputDigest,
    paths,
    policyDecision: P7_R4_POLICY_DECISION,
    policyReason,
    approvalEvidenceIdentity: normalizedApproval(receipt.approval, inputDigest, paths),
    confinementBindingIdentity: normalizedConfinement(receipt.confinement, inputDigest),
    startedAt,
    completedAt,
    operations,
    postStateDigest,
  })
}

function receiptEvidenceIdentity(receipt: NormalizedReceiptEvidence): string {
  return hashText(JSON.stringify(receipt))
}

function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value)
    for (const child of Object.values(value as UnknownRecord)) deepFreeze(child)
  }
  return value
}

function appliedEvidenceIdentity(value: AppliedCore): string {
  return hashText(JSON.stringify(value))
}

function coreFromSources(input: P7AppliedPatchEvidenceBindingBuildInput): AppliedCore {
  const proposal = validateP7ImmutablePatchProposal(input.sourceProposal)
  const authorization = validateP7PatchApplicationAuthorization(input.sourceAuthorization, proposal)
  const intentBinding = validateP7PatchExecutionIntentBinding(
    input.sourceIntentBinding,
    proposal,
    authorization,
    input.exactPatchText,
  )
  const receipt = normalizedReceipt(input.executionReceipt)

  if (receipt.inputDigest !== intentBinding.inputDigest) {
    fail("executionReceipt.inputDigest", "must match the P7-R3 pre-execution inputDigest")
  }
  if (receipt.paths.length !== intentBinding.paths.length) fail("executionReceipt.paths", "must exactly match P7-R3 paths")
  for (let index = 0; index < intentBinding.paths.length; index += 1) {
    if (receipt.paths[index] !== intentBinding.paths[index]) fail("executionReceipt.paths", "must exactly match P7-R3 paths")
  }
  if (receipt.operations.length !== intentBinding.operations.length) {
    fail("executionReceipt.result.affected", "must exactly match P7-R3 operations")
  }
  for (let index = 0; index < intentBinding.operations.length; index += 1) {
    const actual = receipt.operations[index]!
    const expected = intentBinding.operations[index]!
    if (actual.path !== expected.path || actual.operation !== expected.operation) {
      fail("executionReceipt.result.affected", "must exactly match P7-R3 operations")
    }
  }

  const paths = Object.freeze([...intentBinding.paths])
  const operations = Object.freeze(intentBinding.operations.map((operation) => Object.freeze({
    path: operation.path,
    operation: operation.operation,
  })))

  return deepFreeze({
    version: P7_R4_APPLIED_PATCH_EVIDENCE_BINDING_VERSION,
    state: P7_R4_APPLIED_PATCH_STATE,
    proposalIdentity: proposal.proposalIdentity,
    authorizationIdentity: authorization.authorizationIdentity,
    intentBindingIdentity: intentBinding.bindingIdentity,
    repositoryIdentity: intentBinding.repositoryIdentity,
    canonicalBase: intentBinding.canonicalBase,
    targetHead: intentBinding.targetHead,
    patchArtifactDigest: intentBinding.patchArtifactDigest,
    inputDigest: intentBinding.inputDigest,
    executionReceiptIdentity: receiptEvidenceIdentity(receipt),
    executionReceiptId: receipt.receiptId,
    executionStartedAt: receipt.startedAt,
    executionCompletedAt: receipt.completedAt,
    capability: P7_R3_PATCH_EXECUTION_CAPABILITY,
    policyDecision: P7_R4_POLICY_DECISION,
    paths,
    operations,
    postStateDigest: receipt.postStateDigest,
    approvalEvidenceIdentity: receipt.approvalEvidenceIdentity,
    confinementBindingIdentity: receipt.confinementBindingIdentity,
  })
}

function normalizedBuildCore(value: unknown): AppliedCore {
  const input = ownDataRecord(value, BUILD_KEYS, BUILD_KEYS, "applied evidence build input")
  return coreFromSources({
    sourceProposal: input.sourceProposal as P7ImmutablePatchProposal,
    sourceAuthorization: input.sourceAuthorization as P7PatchApplicationAuthorization,
    sourceIntentBinding: input.sourceIntentBinding as P7PatchExecutionIntentBinding,
    exactPatchText: input.exactPatchText as string,
    executionReceipt: input.executionReceipt as ExecutionReceipt,
  })
}

export function p7AppliedPatchEvidenceIdentity(input: P7AppliedPatchEvidenceBindingBuildInput): string {
  return appliedEvidenceIdentity(normalizedBuildCore(input))
}

export function buildP7AppliedPatchEvidenceBinding(
  input: P7AppliedPatchEvidenceBindingBuildInput,
): P7AppliedPatchEvidenceBinding {
  const core = normalizedBuildCore(input)
  return deepFreeze({ ...core, appliedEvidenceIdentity: appliedEvidenceIdentity(core) })
}

export function validateP7AppliedPatchEvidenceBinding(
  value: unknown,
  input: P7AppliedPatchEvidenceBindingBuildInput,
): P7AppliedPatchEvidenceBinding {
  const record = ownDataRecord(value, OUTPUT_KEYS, OUTPUT_KEYS, "applied evidence")
  const core = normalizedBuildCore(input)

  const scalarKeys = [
    "version", "state", "proposalIdentity", "authorizationIdentity", "intentBindingIdentity", "repositoryIdentity",
    "canonicalBase", "targetHead", "patchArtifactDigest", "inputDigest", "executionReceiptIdentity", "executionReceiptId",
    "executionStartedAt", "executionCompletedAt", "capability", "policyDecision", "postStateDigest",
    "approvalEvidenceIdentity", "confinementBindingIdentity",
  ] as const
  for (const key of scalarKeys) {
    if (record[key] !== core[key]) fail(`applied evidence.${key}`, "does not match the canonical source-derived value")
  }

  const paths = arrayData(record.paths, "applied evidence.paths")
  if (paths.length !== core.paths.length) fail("applied evidence.paths", "must exactly match canonical paths")
  for (let index = 0; index < core.paths.length; index += 1) {
    if (paths[index] !== core.paths[index]) fail("applied evidence.paths", "must exactly match canonical paths")
  }

  const operations = arrayData(record.operations, "applied evidence.operations")
  if (operations.length !== core.operations.length) fail("applied evidence.operations", "must exactly match canonical operations")
  for (let index = 0; index < core.operations.length; index += 1) {
    const operation = ownDataRecord(operations[index], OPERATION_KEYS, OPERATION_KEYS, `applied evidence.operations[${index}]`)
    if (operation.path !== core.operations[index]!.path || operation.operation !== core.operations[index]!.operation) {
      fail("applied evidence.operations", "must exactly match canonical operations")
    }
  }

  const expectedIdentity = appliedEvidenceIdentity(core)
  if (sha256(record.appliedEvidenceIdentity, "applied evidence.appliedEvidenceIdentity") !== expectedIdentity) {
    fail("applied evidence.appliedEvidenceIdentity", "does not match the canonical applied-evidence preimage")
  }
  return deepFreeze({ ...core, appliedEvidenceIdentity: expectedIdentity })
}
