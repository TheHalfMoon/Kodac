import { Buffer } from "node:buffer"
import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

import {
  P7_R14_RECEIPT_RECORD_SET_EVIDENCE_LIMITS,
  validateP7ReceiptRecordSetEvidenceBinding,
  type P7ReceiptRecordSetEvidenceBinding,
  type P7ReceiptRecordSetEvidenceBindingBuildInput,
} from "./p7-receipt-record-set-evidence-binding.ts"

export const P7_R15_RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BINDING_VERSION =
  "p7-r15-receipt-ledger-snapshot-evidence-binding-v1" as const
export const P7_R15_RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_STATE =
  "RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY" as const
export const P7_R15_RECEIPT_LEDGER_SNAPSHOT_MAX_UTF8_BYTES = 16_777_216 as const

export interface P7ReceiptLedgerSnapshotEvidenceBindingBuildInput {
  readonly sourceReceiptRecordSetEvidenceBinding: P7ReceiptRecordSetEvidenceBinding
  readonly sourceReceiptRecordSetEvidenceBindingInput: P7ReceiptRecordSetEvidenceBindingBuildInput
  readonly receiptLedgerSnapshot: string
}

export interface P7ReceiptLedgerSnapshotEvidenceBinding {
  readonly version: typeof P7_R15_RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BINDING_VERSION
  readonly evidenceIdentity: string
  readonly state: typeof P7_R15_RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_STATE
  readonly sourceReceiptRecordSetEvidenceIdentity: string
  readonly sourcePolicyReportEvidenceIdentity: string
  readonly sourceReceiptReportEvidenceIdentity: string
  readonly sourceCommandSuccessEvidenceIdentity: string
  readonly sourceAppliedEvidenceIdentity: string
  readonly repositoryIdentity: string
  readonly canonicalBase: string
  readonly targetHead: string
  readonly postStateDigest: string
  readonly verificationReportIdentity: string
  readonly verificationSessionId: string
  readonly receiptCount: number
  readonly receiptIds: readonly string[]
  readonly receiptLedgerLineCount: number
  readonly receiptLedgerOrder: readonly string[]
  readonly receiptLedgerSnapshotUtf8Bytes: number
  readonly receiptLedgerSnapshotSha256: string
  readonly receiptLedgerSnapshotIdentity: string
}

type UnknownRecord = Record<string, unknown>
type EvidenceCore = Omit<P7ReceiptLedgerSnapshotEvidenceBinding, "evidenceIdentity">

const SHA256 = /^[0-9a-f]{64}$/
const BUILD_KEYS = [
  "sourceReceiptRecordSetEvidenceBinding",
  "sourceReceiptRecordSetEvidenceBindingInput",
  "receiptLedgerSnapshot",
] as const
const OUTPUT_KEYS = [
  "version",
  "evidenceIdentity",
  "state",
  "sourceReceiptRecordSetEvidenceIdentity",
  "sourcePolicyReportEvidenceIdentity",
  "sourceReceiptReportEvidenceIdentity",
  "sourceCommandSuccessEvidenceIdentity",
  "sourceAppliedEvidenceIdentity",
  "repositoryIdentity",
  "canonicalBase",
  "targetHead",
  "postStateDigest",
  "verificationReportIdentity",
  "verificationSessionId",
  "receiptCount",
  "receiptIds",
  "receiptLedgerLineCount",
  "receiptLedgerOrder",
  "receiptLedgerSnapshotUtf8Bytes",
  "receiptLedgerSnapshotSha256",
  "receiptLedgerSnapshotIdentity",
] as const

function fail(label: string, detail: string): never {
  throw new TypeError(`${label} ${detail}`)
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function hashText(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
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

function assertSafeJsonGraph(value: unknown, label: string): void {
  const seen = new Set<object>()
  let nodes = 0
  const visit = (current: unknown, path: string, depth: number): void => {
    nodes += 1
    if (nodes > 8_192) fail(label, "exceeds the maximum JSON node count")
    if (depth > 16) fail(label, "exceeds the maximum JSON depth")
    if (current === null || typeof current === "boolean" || typeof current === "string") return
    if (typeof current === "number") {
      if (!Number.isFinite(current) || !Number.isSafeInteger(current) || Object.is(current, -0)) {
        fail(path, "must be a finite safe JSON integer")
      }
      return
    }
    if (typeof current !== "object") fail(path, "must contain only JSON-compatible values")
    if (nodeTypes.isProxy(current)) fail(path, "must not contain Proxy values")
    if (seen.has(current)) fail(path, "must not contain aliases or cycles")
    seen.add(current)
    if (Array.isArray(current)) {
      if (Object.getPrototypeOf(current) !== Array.prototype) fail(path, "must use the standard Array prototype")
      if (Object.getOwnPropertySymbols(current).length !== 0) fail(path, "must not contain symbol fields")
      for (let index = 0; index < current.length; index += 1) {
        const descriptor = Object.getOwnPropertyDescriptor(current, String(index))
        if (descriptor === undefined) fail(path, "must not be sparse")
        if (!("value" in descriptor) || descriptor.enumerable !== true) {
          fail(`${path}[${index}]`, "must be an enumerable data property")
        }
        visit(descriptor.value, `${path}[${index}]`, depth + 1)
      }
      for (const key of Object.getOwnPropertyNames(current)) {
        if (key !== "length" && !/^(?:0|[1-9][0-9]*)$/.test(key)) fail(path, `contains unknown array field: ${key}`)
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

function equalStrings(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

function parseSnapshot(value: unknown): {
  readonly text: string
  readonly utf8Bytes: number
  readonly sha256: string
  readonly records: readonly unknown[]
} {
  if (typeof value !== "string") fail("receiptLedgerSnapshot", "must be a primitive string")
  if (value.length === 0) fail("receiptLedgerSnapshot", "must not be empty")
  assertUnicodeScalars(value, "receiptLedgerSnapshot")
  const utf8Bytes = Buffer.byteLength(value, "utf8")
  if (utf8Bytes > P7_R15_RECEIPT_LEDGER_SNAPSHOT_MAX_UTF8_BYTES) {
    fail("receiptLedgerSnapshot", `must contain at most ${P7_R15_RECEIPT_LEDGER_SNAPSHOT_MAX_UTF8_BYTES} UTF-8 bytes`)
  }
  if (!value.endsWith("\n")) fail("receiptLedgerSnapshot", "must end with exactly one LF")
  if (value.endsWith("\n\n")) fail("receiptLedgerSnapshot", "must end with exactly one LF")
  if (value.includes("\r")) fail("receiptLedgerSnapshot", "must not contain CR characters")

  const lines = value.slice(0, -1).split("\n")
  if (lines.length < 1 || lines.some((line) => line.length === 0)) {
    fail("receiptLedgerSnapshot", "must contain only non-empty JSONL lines")
  }
  if (lines.length > P7_R14_RECEIPT_RECORD_SET_EVIDENCE_LIMITS.maxReceipts) {
    fail("receiptLedgerSnapshot", `must contain at most ${P7_R14_RECEIPT_RECORD_SET_EVIDENCE_LIMITS.maxReceipts} lines`)
  }

  const records = lines.map((line, index) => {
    let parsed: unknown
    try {
      parsed = JSON.parse(line) as unknown
    } catch (error) {
      throw new TypeError(`receiptLedgerSnapshot line ${index + 1} must contain valid JSON`, { cause: error })
    }
    if (JSON.stringify(parsed) !== line) {
      fail(`receiptLedgerSnapshot line ${index + 1}`, "must equal JSON.stringify(JSON.parse(line))")
    }
    return parsed
  })

  return Object.freeze({
    text: value,
    utf8Bytes,
    sha256: hashText(value),
    records: Object.freeze(records),
  })
}

function normalizedBuildCore(value: unknown): EvidenceCore {
  const input = ownDataRecord(value, BUILD_KEYS, BUILD_KEYS, "receipt ledger snapshot evidence build input")
  const sourceInput = input.sourceReceiptRecordSetEvidenceBindingInput as P7ReceiptRecordSetEvidenceBindingBuildInput
  const source = validateP7ReceiptRecordSetEvidenceBinding(input.sourceReceiptRecordSetEvidenceBinding, sourceInput)
  const snapshot = parseSnapshot(input.receiptLedgerSnapshot)

  const reboundInput: P7ReceiptRecordSetEvidenceBindingBuildInput = {
    ...sourceInput,
    receiptRecords: snapshot.records,
  }
  const rebound = validateP7ReceiptRecordSetEvidenceBinding(input.sourceReceiptRecordSetEvidenceBinding, reboundInput)
  if (rebound.evidenceIdentity !== source.evidenceIdentity) {
    fail("receiptLedgerSnapshot", "must revalidate to the exact source P7-R14 evidence identity")
  }
  if (snapshot.records.length !== source.receiptCount) {
    fail("receiptLedgerSnapshot", "line count must equal the exact source P7-R14 receipt count")
  }

  const receiptLedgerOrder = Object.freeze(snapshot.records.map((record, index) => {
    if (record === null || typeof record !== "object" || Array.isArray(record)) {
      fail(`receiptLedgerSnapshot line ${index + 1}`, "must contain a receipt record object")
    }
    const receiptId = (record as UnknownRecord).receiptId
    if (typeof receiptId !== "string") fail(`receiptLedgerSnapshot line ${index + 1}.receiptId`, "must be a string")
    return receiptId
  }))
  if (new Set(receiptLedgerOrder).size !== receiptLedgerOrder.length) {
    fail("receiptLedgerSnapshot", "must not contain duplicate receipt IDs")
  }
  const normalizedSnapshotIds = [...receiptLedgerOrder].sort(compareStrings)
  if (!equalStrings(normalizedSnapshotIds, source.receiptIds)) {
    fail("receiptLedgerSnapshot", "receipt-id set must equal the exact source P7-R14 receipt-id set")
  }

  const receiptIds = Object.freeze([...source.receiptIds])
  const receiptLedgerSnapshotIdentity = hashText(canonicalJson({
    sourceReceiptRecordSetEvidenceIdentity: source.evidenceIdentity,
    receiptLedgerSnapshotSha256: snapshot.sha256,
    receiptLedgerSnapshotUtf8Bytes: snapshot.utf8Bytes,
    receiptLedgerLineCount: snapshot.records.length,
    receiptLedgerOrder,
  }))

  return deepFreeze({
    version: P7_R15_RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BINDING_VERSION,
    state: P7_R15_RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_STATE,
    sourceReceiptRecordSetEvidenceIdentity: source.evidenceIdentity,
    sourcePolicyReportEvidenceIdentity: source.sourcePolicyReportEvidenceIdentity,
    sourceReceiptReportEvidenceIdentity: source.sourceReceiptReportEvidenceIdentity,
    sourceCommandSuccessEvidenceIdentity: source.sourceCommandSuccessEvidenceIdentity,
    sourceAppliedEvidenceIdentity: source.sourceAppliedEvidenceIdentity,
    repositoryIdentity: source.repositoryIdentity,
    canonicalBase: source.canonicalBase,
    targetHead: source.targetHead,
    postStateDigest: source.postStateDigest,
    verificationReportIdentity: source.verificationReportIdentity,
    verificationSessionId: source.verificationSessionId,
    receiptCount: source.receiptCount,
    receiptIds,
    receiptLedgerLineCount: snapshot.records.length,
    receiptLedgerOrder,
    receiptLedgerSnapshotUtf8Bytes: snapshot.utf8Bytes,
    receiptLedgerSnapshotSha256: snapshot.sha256,
    receiptLedgerSnapshotIdentity,
  })
}

function evidenceIdentity(core: EvidenceCore): string {
  return hashText(canonicalJson(core))
}

export function p7ReceiptLedgerSnapshotEvidenceBindingIdentity(
  input: P7ReceiptLedgerSnapshotEvidenceBindingBuildInput,
): string {
  return evidenceIdentity(normalizedBuildCore(input))
}

export function buildP7ReceiptLedgerSnapshotEvidenceBinding(
  input: P7ReceiptLedgerSnapshotEvidenceBindingBuildInput,
): P7ReceiptLedgerSnapshotEvidenceBinding {
  const core = normalizedBuildCore(input)
  return deepFreeze({ ...core, evidenceIdentity: evidenceIdentity(core) })
}

export function validateP7ReceiptLedgerSnapshotEvidenceBinding(
  value: unknown,
  input: P7ReceiptLedgerSnapshotEvidenceBindingBuildInput,
): P7ReceiptLedgerSnapshotEvidenceBinding {
  assertSafeJsonGraph(value, "receipt ledger snapshot evidence binding")
  const record = ownDataRecord(value, OUTPUT_KEYS, OUTPUT_KEYS, "receipt ledger snapshot evidence binding")
  const claimedIdentity = record.evidenceIdentity
  if (typeof claimedIdentity !== "string" || !SHA256.test(claimedIdentity)) {
    fail("receipt ledger snapshot evidence binding.evidenceIdentity", "must be a lowercase SHA-256 digest")
  }
  const expected = buildP7ReceiptLedgerSnapshotEvidenceBinding(input)
  if (canonicalJson(record) !== canonicalJson(expected)) {
    fail("receipt ledger snapshot evidence binding", "does not match canonical source-derived semantics")
  }
  return expected
}
