import { Buffer } from "node:buffer"
import { createHash } from "node:crypto"
import { constants, type BigIntStats } from "node:fs"
import { lstat, open } from "node:fs/promises"
import { TextDecoder, types as nodeTypes } from "node:util"

import {
  P7_R15_RECEIPT_LEDGER_SNAPSHOT_MAX_UTF8_BYTES,
  validateP7ReceiptLedgerSnapshotEvidenceBinding,
  type P7ReceiptLedgerSnapshotEvidenceBinding,
  type P7ReceiptLedgerSnapshotEvidenceBindingBuildInput,
} from "./p7-receipt-ledger-snapshot-evidence-binding.ts"

export const P7_R16_RECEIPT_LEDGER_FILE_READ_EVIDENCE_BINDING_VERSION =
  "p7-r16-receipt-ledger-file-read-evidence-binding-v1" as const
export const P7_R16_RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_STATE =
  "RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY" as const
export const P7_R16_RECEIPT_LEDGER_FILE_READ_MAX_UTF8_BYTES =
  P7_R15_RECEIPT_LEDGER_SNAPSHOT_MAX_UTF8_BYTES

export interface P7ReceiptLedgerFileReadEvidenceBindingBuildInput {
  readonly sourceReceiptLedgerSnapshotEvidenceBinding: P7ReceiptLedgerSnapshotEvidenceBinding
  readonly sourceReceiptLedgerSnapshotEvidenceBindingInput: P7ReceiptLedgerSnapshotEvidenceBindingBuildInput
  readonly receiptLedgerPath: string
}

export interface P7ReceiptLedgerFileReadEvidenceBinding {
  readonly version: typeof P7_R16_RECEIPT_LEDGER_FILE_READ_EVIDENCE_BINDING_VERSION
  readonly evidenceIdentity: string
  readonly state: typeof P7_R16_RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_STATE
  readonly sourceReceiptLedgerSnapshotEvidenceIdentity: string
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
  readonly receiptLedgerPathSha256: string
  readonly receiptLedgerReadUtf8Bytes: number
  readonly receiptLedgerReadSha256: string
  readonly receiptLedgerFileObservationIdentity: string
  readonly receiptLedgerReadIdentity: string
}

type UnknownRecord = Record<string, unknown>
type EvidenceCore = Omit<P7ReceiptLedgerFileReadEvidenceBinding, "evidenceIdentity">

interface StableFileObservation {
  readonly dev: string
  readonly ino: string
  readonly size: string
  readonly mode: string
  readonly uid: string
  readonly gid: string
  readonly nlink: string
  readonly mtimeNs: string
  readonly ctimeNs: string
}

interface ReadObservation {
  readonly utf8Text: string
  readonly utf8Bytes: number
  readonly sha256: string
  readonly fileObservationIdentity: string
}

const SHA256 = /^[0-9a-f]{64}$/
const BUILD_KEYS = [
  "sourceReceiptLedgerSnapshotEvidenceBinding",
  "sourceReceiptLedgerSnapshotEvidenceBindingInput",
  "receiptLedgerPath",
] as const
const OUTPUT_KEYS = [
  "version",
  "evidenceIdentity",
  "state",
  "sourceReceiptLedgerSnapshotEvidenceIdentity",
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
  "receiptLedgerPathSha256",
  "receiptLedgerReadUtf8Bytes",
  "receiptLedgerReadSha256",
  "receiptLedgerFileObservationIdentity",
  "receiptLedgerReadIdentity",
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

function hashBytes(value: Uint8Array): string {
  return createHash("sha256").update(value).digest("hex")
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

function stableObservation(stat: BigIntStats): StableFileObservation {
  return Object.freeze({
    dev: stat.dev.toString(10),
    ino: stat.ino.toString(10),
    size: stat.size.toString(10),
    mode: stat.mode.toString(10),
    uid: stat.uid.toString(10),
    gid: stat.gid.toString(10),
    nlink: stat.nlink.toString(10),
    mtimeNs: stat.mtimeNs.toString(10),
    ctimeNs: stat.ctimeNs.toString(10),
  })
}

function sameStableObservation(left: StableFileObservation, right: StableFileObservation): boolean {
  return canonicalJson(left) === canonicalJson(right)
}

function noFollowFlag(): number {
  const value = (constants as unknown as { O_NOFOLLOW?: unknown }).O_NOFOLLOW
  return typeof value === "number" ? value : 0
}

function validatePath(value: unknown): string {
  if (typeof value !== "string") fail("receiptLedgerPath", "must be a primitive string")
  if (value.length === 0) fail("receiptLedgerPath", "must not be empty")
  if (value.includes("\0")) fail("receiptLedgerPath", "must not contain NUL")
  return value
}

async function observeReceiptLedgerFile(receiptLedgerPath: string): Promise<ReadObservation> {
  const flags = constants.O_RDONLY | noFollowFlag()
  const handle = await open(receiptLedgerPath, flags)
  try {
    const initialStat = await handle.stat({ bigint: true })
    if (!initialStat.isFile()) fail("receiptLedgerPath", "must resolve to a regular file")
    if (initialStat.nlink !== 1n) fail("receiptLedgerPath", "must resolve to a single-link file")
    if (initialStat.size <= 0n) fail("receiptLedgerPath", "must not be empty")
    if (initialStat.size > BigInt(P7_R16_RECEIPT_LEDGER_FILE_READ_MAX_UTF8_BYTES)) {
      fail("receiptLedgerPath", `must contain at most ${P7_R16_RECEIPT_LEDGER_FILE_READ_MAX_UTF8_BYTES} bytes`)
    }

    const size = Number(initialStat.size)
    const bytes = Buffer.allocUnsafe(size)
    let offset = 0
    while (offset < size) {
      const { bytesRead } = await handle.read(bytes, offset, size - offset, offset)
      if (bytesRead <= 0) fail("receiptLedgerPath", "changed or ended before the initially observed size was read")
      offset += bytesRead
    }

    const growthProbe = Buffer.allocUnsafe(1)
    const growth = await handle.read(growthProbe, 0, 1, size)
    if (growth.bytesRead !== 0) fail("receiptLedgerPath", "grew beyond the initially observed size during read")

    const finalStat = await handle.stat({ bigint: true })
    const initialObservation = stableObservation(initialStat)
    const finalObservation = stableObservation(finalStat)
    if (!sameStableObservation(initialObservation, finalObservation)) {
      fail("receiptLedgerPath", "metadata changed during same-descriptor read")
    }

    const pathStat = await lstat(receiptLedgerPath, { bigint: true })
    if (pathStat.isSymbolicLink()) fail("receiptLedgerPath", "must not be a symbolic link")
    if (!pathStat.isFile()) fail("receiptLedgerPath", "must remain a regular file")
    if (pathStat.nlink !== 1n) fail("receiptLedgerPath", "must remain a single-link file")
    if (pathStat.dev !== initialStat.dev || pathStat.ino !== initialStat.ino) {
      fail("receiptLedgerPath", "path identity changed during read")
    }

    let utf8Text: string
    try {
      utf8Text = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes)
    } catch (error) {
      throw new TypeError("receiptLedgerPath must contain strict UTF-8", { cause: error })
    }

    return Object.freeze({
      utf8Text,
      utf8Bytes: bytes.byteLength,
      sha256: hashBytes(bytes),
      fileObservationIdentity: hashText(canonicalJson(initialObservation)),
    })
  } finally {
    await handle.close()
  }
}

async function normalizedBuildCore(value: unknown): Promise<EvidenceCore> {
  const input = ownDataRecord(value, BUILD_KEYS, BUILD_KEYS, "receipt ledger file-read evidence build input")
  const sourceInput = input.sourceReceiptLedgerSnapshotEvidenceBindingInput as P7ReceiptLedgerSnapshotEvidenceBindingBuildInput
  const source = validateP7ReceiptLedgerSnapshotEvidenceBinding(
    input.sourceReceiptLedgerSnapshotEvidenceBinding,
    sourceInput,
  )
  const receiptLedgerPath = validatePath(input.receiptLedgerPath)
  const observed = await observeReceiptLedgerFile(receiptLedgerPath)

  if (observed.utf8Bytes !== source.receiptLedgerSnapshotUtf8Bytes) {
    fail("receiptLedgerPath", "read byte count does not match the exact source P7-R15 snapshot")
  }
  if (observed.sha256 !== source.receiptLedgerSnapshotSha256) {
    fail("receiptLedgerPath", "read SHA-256 does not match the exact source P7-R15 snapshot")
  }

  const reboundInput: P7ReceiptLedgerSnapshotEvidenceBindingBuildInput = {
    ...sourceInput,
    receiptLedgerSnapshot: observed.utf8Text,
  }
  const rebound = validateP7ReceiptLedgerSnapshotEvidenceBinding(
    input.sourceReceiptLedgerSnapshotEvidenceBinding,
    reboundInput,
  )
  if (rebound.evidenceIdentity !== source.evidenceIdentity) {
    fail("receiptLedgerPath", "must revalidate to the exact source P7-R15 evidence identity")
  }

  const receiptLedgerPathSha256 = hashText(receiptLedgerPath)
  const receiptLedgerReadIdentity = hashText(canonicalJson({
    sourceReceiptLedgerSnapshotEvidenceIdentity: source.evidenceIdentity,
    receiptLedgerPathSha256,
    receiptLedgerReadUtf8Bytes: observed.utf8Bytes,
    receiptLedgerReadSha256: observed.sha256,
    receiptLedgerFileObservationIdentity: observed.fileObservationIdentity,
  }))

  return deepFreeze({
    version: P7_R16_RECEIPT_LEDGER_FILE_READ_EVIDENCE_BINDING_VERSION,
    state: P7_R16_RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_STATE,
    sourceReceiptLedgerSnapshotEvidenceIdentity: source.evidenceIdentity,
    sourceReceiptRecordSetEvidenceIdentity: source.sourceReceiptRecordSetEvidenceIdentity,
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
    receiptIds: Object.freeze([...source.receiptIds]),
    receiptLedgerPathSha256,
    receiptLedgerReadUtf8Bytes: observed.utf8Bytes,
    receiptLedgerReadSha256: observed.sha256,
    receiptLedgerFileObservationIdentity: observed.fileObservationIdentity,
    receiptLedgerReadIdentity,
  })
}

function evidenceIdentity(core: EvidenceCore): string {
  return hashText(canonicalJson(core))
}

export async function buildP7ReceiptLedgerFileReadEvidenceBinding(
  input: P7ReceiptLedgerFileReadEvidenceBindingBuildInput,
): Promise<P7ReceiptLedgerFileReadEvidenceBinding> {
  const core = await normalizedBuildCore(input)
  return deepFreeze({ ...core, evidenceIdentity: evidenceIdentity(core) })
}

export async function validateP7ReceiptLedgerFileReadEvidenceBinding(
  value: unknown,
  input: P7ReceiptLedgerFileReadEvidenceBindingBuildInput,
): Promise<P7ReceiptLedgerFileReadEvidenceBinding> {
  assertSafeJsonGraph(value, "receipt ledger file-read evidence binding")
  const record = ownDataRecord(value, OUTPUT_KEYS, OUTPUT_KEYS, "receipt ledger file-read evidence binding")
  const claimedIdentity = record.evidenceIdentity
  if (typeof claimedIdentity !== "string" || !SHA256.test(claimedIdentity)) {
    fail("receipt ledger file-read evidence binding.evidenceIdentity", "must be a lowercase SHA-256 digest")
  }
  const expected = await buildP7ReceiptLedgerFileReadEvidenceBinding(input)
  if (canonicalJson(record) !== canonicalJson(expected)) {
    fail("receipt ledger file-read evidence binding", "does not match canonical source/read-derived semantics")
  }
  return expected
}
