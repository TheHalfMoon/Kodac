import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

import {
  validateP7PostApplyVerificationReportBinding,
  type P7VerificationReportEvidence,
} from "./p7-post-apply-verification-report-binding.ts"
import {
  validateP7GitChangeReportEvidenceBinding,
  type P7GitChangeReportEvidenceBinding,
  type P7GitChangeReportEvidenceBindingBuildInput,
} from "./p7-git-change-report-evidence-binding.ts"

export const P7_R12_RECEIPT_REPORT_EVIDENCE_BINDING_VERSION =
  "p7-r12-receipt-report-evidence-binding-v1" as const
export const P7_R12_RECEIPT_REPORT_EVIDENCE_BOUND_STATE = "RECEIPT_REPORT_EVIDENCE_BOUND" as const

export const P7_R12_RECEIPT_REPORT_EVIDENCE_LIMITS = Object.freeze({
  maxSummaryCodePoints: 4_096,
  maxEvidenceRefCodePoints: 1_024,
  maxSessionIdCodePoints: 256,
  maxReceiptCount: 256,
  maxJsonNodes: 32_768,
  maxJsonDepth: 32,
} as const)

export interface P7ReceiptReportEvidenceBindingBuildInput {
  readonly sourceGitChangeReportEvidenceBinding: P7GitChangeReportEvidenceBinding
  readonly sourceGitChangeReportEvidenceBindingInput: P7GitChangeReportEvidenceBindingBuildInput
}

export interface P7ReceiptReportEvidenceBinding {
  readonly version: typeof P7_R12_RECEIPT_REPORT_EVIDENCE_BINDING_VERSION
  readonly evidenceIdentity: string
  readonly state: typeof P7_R12_RECEIPT_REPORT_EVIDENCE_BOUND_STATE
  readonly sourceGitChangeReportEvidenceIdentity: string
  readonly sourceWorkspaceReferenceEvidenceIdentity: string
  readonly sourceAgentCompletionEvidenceIdentity: string
  readonly sourceCommandSuccessEvidenceIdentity: string
  readonly sourceVerificationReportBindingIdentity: string
  readonly proposalIdentity: string
  readonly authorizationIdentity: string
  readonly intentBindingIdentity: string
  readonly appliedEvidenceIdentity: string
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
  readonly receiptReportCheckSummary: string
  readonly receiptReportCount: number
  readonly receiptReportEvidence: readonly P7VerificationReportEvidence[]
  readonly receiptReportRefs: readonly string[]
}

type UnknownRecord = Record<string, unknown>
type EvidenceCore = Omit<P7ReceiptReportEvidenceBinding, "evidenceIdentity">

const SHA256 = /^[0-9a-f]{64}$/
const GIT_OBJECT = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/
const CANONICAL_TIMESTAMP = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$/
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/u
const ARRAY_INDEX = /^(?:0|[1-9][0-9]*)$/
const RECEIPT_REPORT_SUMMARY = /^([1-9][0-9]*) execution receipt\(s\) are successful and mutation post-state is attested\.$/

const BUILD_KEYS = ["sourceGitChangeReportEvidenceBinding", "sourceGitChangeReportEvidenceBindingInput"] as const
const RECEIPT_EVIDENCE_KEYS = ["kind", "ref"] as const
const OUTPUT_KEYS = [
  "version",
  "evidenceIdentity",
  "state",
  "sourceGitChangeReportEvidenceIdentity",
  "sourceWorkspaceReferenceEvidenceIdentity",
  "sourceAgentCompletionEvidenceIdentity",
  "sourceCommandSuccessEvidenceIdentity",
  "sourceVerificationReportBindingIdentity",
  "proposalIdentity",
  "authorizationIdentity",
  "intentBindingIdentity",
  "appliedEvidenceIdentity",
  "verificationPlanBindingIdentity",
  "repositoryIdentity",
  "canonicalBase",
  "targetHead",
  "postStateDigest",
  "verificationPlanDigest",
  "verificationReportIdentity",
  "verificationSessionId",
  "verificationStartedAt",
  "verificationCompletedAt",
  "receiptReportCheckSummary",
  "receiptReportCount",
  "receiptReportEvidence",
  "receiptReportRefs",
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

function unicodeText(value: unknown, label: string, maxCodePoints: number): string {
  if (typeof value !== "string") fail(label, "must be a string")
  if (value.length === 0) fail(label, "must not be empty")
  assertUnicodeScalars(value, label)
  if (CONTROL_CHARACTERS.test(value)) fail(label, "must not contain control characters")
  if (codePointLength(value) > maxCodePoints) fail(label, `must contain at most ${maxCodePoints} code points`)
  return value
}

function sha256(value: unknown, label: string): string {
  const text = unicodeText(value, label, 64)
  if (!SHA256.test(text)) fail(label, "must be a lowercase SHA-256 digest")
  return text
}

function gitObject(value: unknown, label: string): string {
  const text = unicodeText(value, label, 64)
  if (!GIT_OBJECT.test(text)) fail(label, "must be a lowercase 40- or 64-hex Git object identity")
  return text
}

function canonicalTimestamp(value: unknown, label: string): string {
  const text = unicodeText(value, label, 64)
  if (!CANONICAL_TIMESTAMP.test(text)) fail(label, "must be a canonical UTC millisecond timestamp")
  const epoch = Date.parse(text)
  if (!Number.isFinite(epoch) || new Date(epoch).toISOString() !== text) {
    fail(label, "must be a valid canonical UTC millisecond timestamp")
  }
  return text
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
  for (let index = 0; index < value.length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index))
    if (descriptor === undefined) fail(label, "must not be sparse")
    if (!("value" in descriptor) || descriptor.enumerable !== true) {
      fail(`${label}[${index}]`, "must be an enumerable data property")
    }
  }
  return value
}

function assertSafeJsonGraph(value: unknown, label: string): void {
  const seen = new Set<object>()
  let nodes = 0
  const visit = (current: unknown, path: string, depth: number): void => {
    nodes += 1
    if (nodes > P7_R12_RECEIPT_REPORT_EVIDENCE_LIMITS.maxJsonNodes) fail(label, "exceeds the maximum JSON node count")
    if (depth > P7_R12_RECEIPT_REPORT_EVIDENCE_LIMITS.maxJsonDepth) fail(label, "exceeds the maximum JSON depth")
    if (current === null || typeof current === "boolean" || typeof current === "string") {
      if (typeof current === "string") assertUnicodeScalars(current, path)
      return
    }
    if (typeof current === "number") {
      if (!Number.isFinite(current) || !Number.isSafeInteger(current) || Object.is(current, -0)) {
        fail(path, "must be a finite safe JSON integer other than negative zero")
      }
      return
    }
    if (typeof current !== "object") fail(path, "must be JSON-compatible data")
    if (nodeTypes.isProxy(current)) fail(path, "must not be a Proxy")
    if (seen.has(current)) fail(path, "must not contain aliases or cycles")
    seen.add(current)
    if (Array.isArray(current)) {
      const array = denseArray(current, path, P7_R12_RECEIPT_REPORT_EVIDENCE_LIMITS.maxJsonNodes)
      for (let index = 0; index < array.length; index += 1) {
        const descriptor = Object.getOwnPropertyDescriptor(array, String(index))
        if (descriptor === undefined || !("value" in descriptor)) fail(`${path}[${index}]`, "must be a data property")
        visit(descriptor.value, `${path}[${index}]`, depth + 1)
      }
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
  return Object.fromEntries(Object.keys(record).sort().map((key) => [key, canonicalize(record[key])]))
}

function canonicalJson(value: unknown): string {
  const serialized = JSON.stringify(canonicalize(value))
  if (serialized === undefined) fail("canonical value", "must be JSON serializable")
  return serialized
}

function deepFreeze<T>(value: T): T {
  if (value === null || typeof value !== "object" || Object.isFrozen(value)) return value
  for (const key of Object.keys(value as UnknownRecord)) deepFreeze((value as UnknownRecord)[key])
  return Object.freeze(value)
}

function parseReceiptReportSummary(value: unknown): { readonly summary: string; readonly count: number } {
  const summary = unicodeText(
    value,
    "evidence.receipts.summary",
    P7_R12_RECEIPT_REPORT_EVIDENCE_LIMITS.maxSummaryCodePoints,
  )
  const match = RECEIPT_REPORT_SUMMARY.exec(summary)
  if (match === null) fail("evidence.receipts.summary", "must match the exact canonical passing summary grammar")
  const count = Number(match[1])
  if (
    !Number.isSafeInteger(count) ||
    count < 1 ||
    count > P7_R12_RECEIPT_REPORT_EVIDENCE_LIMITS.maxReceiptCount
  ) {
    fail(
      "evidence.receipts.summary.count",
      `must be a safe integer from 1 through ${P7_R12_RECEIPT_REPORT_EVIDENCE_LIMITS.maxReceiptCount}`,
    )
  }
  return Object.freeze({ summary, count })
}

function normalizedReceiptEvidence(
  value: readonly P7VerificationReportEvidence[],
  expectedCount: number,
): readonly P7VerificationReportEvidence[] {
  const evidence = denseArray(
    value,
    "evidence.receipts.evidence",
    P7_R12_RECEIPT_REPORT_EVIDENCE_LIMITS.maxReceiptCount,
  )
  if (evidence.length !== expectedCount) {
    fail("evidence.receipts.evidence", "length must equal the receipt count declared by the canonical summary")
  }
  const normalized = evidence.map((candidate, index) => {
    const item = ownDataRecord(
      candidate,
      RECEIPT_EVIDENCE_KEYS,
      RECEIPT_EVIDENCE_KEYS,
      `evidence.receipts.evidence[${index}]`,
    )
    if (item.kind !== "receipt") fail(`evidence.receipts.evidence[${index}].kind`, "must equal receipt")
    const ref = unicodeText(
      item.ref,
      `evidence.receipts.evidence[${index}].ref`,
      P7_R12_RECEIPT_REPORT_EVIDENCE_LIMITS.maxEvidenceRefCodePoints,
    )
    return deepFreeze({ kind: "receipt" as const, ref })
  })
  const refs = normalized.map((item) => item.ref)
  if (new Set(refs).size !== refs.length) fail("evidence.receipts.evidence", "must contain unique receipt references")
  normalized.sort((left, right) => compareStrings(left.ref, right.ref))
  return Object.freeze(normalized)
}

function evidenceIdentity(core: EvidenceCore): string {
  return hashText(canonicalJson(core))
}

function normalizedBuildCore(value: unknown): EvidenceCore {
  const input = ownDataRecord(value, BUILD_KEYS, BUILD_KEYS, "receipt report evidence build input")
  const sourceInput = input.sourceGitChangeReportEvidenceBindingInput as P7GitChangeReportEvidenceBindingBuildInput
  const source = validateP7GitChangeReportEvidenceBinding(input.sourceGitChangeReportEvidenceBinding, sourceInput)

  const r10Input = sourceInput.sourceWorkspaceReferenceEvidenceBindingInput
  const r9Input = r10Input.sourceAgentCompletionEvidenceBindingInput
  const r8Input = r9Input.sourceCommandSuccessEvidenceBindingInput
  const r6 = validateP7PostApplyVerificationReportBinding(
    r8Input.sourceVerificationReportBinding,
    r8Input.sourceVerificationReportBindingInput,
  )
  if (r6.bindingIdentity !== source.sourceVerificationReportBindingIdentity) {
    fail("sourceGitChangeReportEvidenceBinding.sourceVerificationReportBindingIdentity", "must match the exact revalidated P7-R6 binding")
  }
  if (r6.verificationReportIdentity !== source.verificationReportIdentity) {
    fail("sourceGitChangeReportEvidenceBinding.verificationReportIdentity", "must match the exact revalidated P7-R6 report")
  }
  if (r6.verificationSessionId !== source.verificationSessionId) {
    fail("sourceGitChangeReportEvidenceBinding.verificationSessionId", "must match the exact revalidated P7-R6 verification session")
  }
  if (r6.verificationStartedAt !== source.verificationStartedAt || r6.verificationCompletedAt !== source.verificationCompletedAt) {
    fail("sourceGitChangeReportEvidenceBinding.verification interval", "must match the exact revalidated P7-R6 verification interval")
  }
  if (r6.verificationReportPassed !== true || r6.verificationReport.passed !== true) {
    fail("sourceVerificationReportBinding.verificationReportPassed", "must equal true")
  }

  const checks = r6.verificationReport.checks.filter((candidate) => candidate.id === "evidence.receipts")
  if (checks.length !== 1) {
    fail("sourceVerificationReportBinding.verificationReport", "must contain exactly one evidence.receipts check")
  }
  const check = checks[0]!
  if (check.category !== "receipts") fail("evidence.receipts.category", "must equal receipts")
  if (check.status !== "pass") fail("evidence.receipts.status", "must equal pass")
  const parsedSummary = parseReceiptReportSummary(check.summary)
  const checkEvidence = normalizedReceiptEvidence(check.evidence, parsedSummary.count)
  const receiptRefs = Object.freeze(checkEvidence.map((item) => item.ref))

  return deepFreeze({
    version: P7_R12_RECEIPT_REPORT_EVIDENCE_BINDING_VERSION,
    state: P7_R12_RECEIPT_REPORT_EVIDENCE_BOUND_STATE,
    sourceGitChangeReportEvidenceIdentity: sha256(source.evidenceIdentity, "source.evidenceIdentity"),
    sourceWorkspaceReferenceEvidenceIdentity: sha256(
      source.sourceWorkspaceReferenceEvidenceIdentity,
      "source.sourceWorkspaceReferenceEvidenceIdentity",
    ),
    sourceAgentCompletionEvidenceIdentity: sha256(
      source.sourceAgentCompletionEvidenceIdentity,
      "source.sourceAgentCompletionEvidenceIdentity",
    ),
    sourceCommandSuccessEvidenceIdentity: sha256(
      source.sourceCommandSuccessEvidenceIdentity,
      "source.sourceCommandSuccessEvidenceIdentity",
    ),
    sourceVerificationReportBindingIdentity: sha256(
      source.sourceVerificationReportBindingIdentity,
      "source.sourceVerificationReportBindingIdentity",
    ),
    proposalIdentity: sha256(source.proposalIdentity, "source.proposalIdentity"),
    authorizationIdentity: sha256(source.authorizationIdentity, "source.authorizationIdentity"),
    intentBindingIdentity: sha256(source.intentBindingIdentity, "source.intentBindingIdentity"),
    appliedEvidenceIdentity: sha256(source.appliedEvidenceIdentity, "source.appliedEvidenceIdentity"),
    verificationPlanBindingIdentity: sha256(source.verificationPlanBindingIdentity, "source.verificationPlanBindingIdentity"),
    repositoryIdentity: unicodeText(source.repositoryIdentity, "source.repositoryIdentity", 1_024),
    canonicalBase: gitObject(source.canonicalBase, "source.canonicalBase"),
    targetHead: gitObject(source.targetHead, "source.targetHead"),
    postStateDigest: sha256(source.postStateDigest, "source.postStateDigest"),
    verificationPlanDigest: sha256(source.verificationPlanDigest, "source.verificationPlanDigest"),
    verificationReportIdentity: sha256(source.verificationReportIdentity, "source.verificationReportIdentity"),
    verificationSessionId: unicodeText(
      source.verificationSessionId,
      "source.verificationSessionId",
      P7_R12_RECEIPT_REPORT_EVIDENCE_LIMITS.maxSessionIdCodePoints,
    ),
    verificationStartedAt: canonicalTimestamp(source.verificationStartedAt, "source.verificationStartedAt"),
    verificationCompletedAt: canonicalTimestamp(source.verificationCompletedAt, "source.verificationCompletedAt"),
    receiptReportCheckSummary: parsedSummary.summary,
    receiptReportCount: parsedSummary.count,
    receiptReportEvidence: checkEvidence,
    receiptReportRefs: receiptRefs,
  })
}

export function p7ReceiptReportEvidenceBindingIdentity(
  input: P7ReceiptReportEvidenceBindingBuildInput,
): string {
  return evidenceIdentity(normalizedBuildCore(input))
}

export function buildP7ReceiptReportEvidenceBinding(
  input: P7ReceiptReportEvidenceBindingBuildInput,
): P7ReceiptReportEvidenceBinding {
  const core = normalizedBuildCore(input)
  return deepFreeze({ ...core, evidenceIdentity: evidenceIdentity(core) })
}

export function validateP7ReceiptReportEvidenceBinding(
  value: unknown,
  input: P7ReceiptReportEvidenceBindingBuildInput,
): P7ReceiptReportEvidenceBinding {
  assertSafeJsonGraph(value, "receipt report evidence binding")
  const record = ownDataRecord(value, OUTPUT_KEYS, OUTPUT_KEYS, "receipt report evidence binding")
  const expected = buildP7ReceiptReportEvidenceBinding(input)
  const claimedIdentity = sha256(record.evidenceIdentity, "receipt report evidence binding.evidenceIdentity")
  if (claimedIdentity !== expected.evidenceIdentity) {
    fail("receipt report evidence binding.evidenceIdentity", "does not match the canonical source-derived preimage")
  }

  const withoutIdentity: UnknownRecord = {}
  const expectedWithoutIdentity: UnknownRecord = {}
  for (const key of OUTPUT_KEYS) {
    if (key === "evidenceIdentity") continue
    withoutIdentity[key] = record[key]
    expectedWithoutIdentity[key] = expected[key]
  }
  if (canonicalJson(withoutIdentity) !== canonicalJson(expectedWithoutIdentity)) {
    fail("receipt report evidence binding", "does not match canonical source-derived semantics")
  }
  return expected
}
