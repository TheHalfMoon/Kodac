import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

import {
  validateP7ReceiptLedgerFileReadEvidenceBinding,
  type P7ReceiptLedgerFileReadEvidenceBinding,
  type P7ReceiptLedgerFileReadEvidenceBindingBuildInput,
} from "./p7-receipt-ledger-file-read-evidence-binding.ts"

export const P7_R18_VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BINDING_VERSION =
  "p7-r18-verification-engine-receipt-ledger-read-evidence-binding-v1" as const
export const P7_R18_VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_STATE =
  "VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY" as const
export const P7_R18_EVENT_PROTOCOL = "kodac.event" as const
export const P7_R18_EVENT_VERSION = 1 as const
export const P7_R18_EVENT_TYPE = "verification.receipt_ledger.read" as const

export interface P7VerificationEngineReceiptLedgerReadEvidenceBindingBuildInput {
  readonly sourceReceiptLedgerFileReadEvidenceBinding: P7ReceiptLedgerFileReadEvidenceBinding
  readonly sourceReceiptLedgerFileReadEvidenceBindingInput: P7ReceiptLedgerFileReadEvidenceBindingBuildInput
  readonly verificationReceiptLedgerReadEvent: unknown
}

export interface P7VerificationEngineReceiptLedgerReadEvidenceBinding {
  readonly version: typeof P7_R18_VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BINDING_VERSION
  readonly evidenceIdentity: string
  readonly state: typeof P7_R18_VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_STATE
  readonly sourceReceiptLedgerFileReadEvidenceIdentity: string
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
  readonly verificationReceiptLedgerReadEventIdentity: string
  readonly verificationReceiptLedgerReadEventProtocol: typeof P7_R18_EVENT_PROTOCOL
  readonly verificationReceiptLedgerReadEventVersion: typeof P7_R18_EVENT_VERSION
  readonly verificationReceiptLedgerReadEventId: string
  readonly verificationReceiptLedgerReadEventSequence: number
  readonly verificationReceiptLedgerReadEventEmittedAt: string
  readonly verificationReceiptLedgerReadEventType: typeof P7_R18_EVENT_TYPE
  readonly parsedReceiptCount: number
}

type UnknownRecord = Record<string, unknown>
type EvidenceCore = Omit<P7VerificationEngineReceiptLedgerReadEvidenceBinding, "evidenceIdentity">

type NormalizedReadEvent = Readonly<{
  protocol: typeof P7_R18_EVENT_PROTOCOL
  version: typeof P7_R18_EVENT_VERSION
  eventId: string
  sessionId: string
  sequence: number
  emittedAt: string
  type: typeof P7_R18_EVENT_TYPE
  payload: Readonly<{
    receiptLedgerPathSha256: string
    receiptLedgerPresent: true
    receiptLedgerReadUtf8Bytes: number
    receiptLedgerReadSha256: string
    parsedReceiptCount: number
  }>
}>

const SHA256 = /^[0-9a-f]{64}$/
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const CANONICAL_TIMESTAMP = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$/
const ARRAY_INDEX = /^(?:0|[1-9][0-9]*)$/

const BUILD_KEYS = [
  "sourceReceiptLedgerFileReadEvidenceBinding",
  "sourceReceiptLedgerFileReadEvidenceBindingInput",
  "verificationReceiptLedgerReadEvent",
] as const
const EVENT_KEYS = ["protocol", "version", "eventId", "sessionId", "sequence", "emittedAt", "type", "payload"] as const
const PAYLOAD_KEYS = [
  "receiptLedgerPathSha256",
  "receiptLedgerPresent",
  "receiptLedgerReadUtf8Bytes",
  "receiptLedgerReadSha256",
  "parsedReceiptCount",
] as const
const OUTPUT_KEYS = [
  "version",
  "evidenceIdentity",
  "state",
  "sourceReceiptLedgerFileReadEvidenceIdentity",
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
  "verificationReceiptLedgerReadEventIdentity",
  "verificationReceiptLedgerReadEventProtocol",
  "verificationReceiptLedgerReadEventVersion",
  "verificationReceiptLedgerReadEventId",
  "verificationReceiptLedgerReadEventSequence",
  "verificationReceiptLedgerReadEventEmittedAt",
  "verificationReceiptLedgerReadEventType",
  "parsedReceiptCount",
] as const

function fail(label: string, detail: string): never {
  throw new TypeError(`${label} ${detail}`)
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

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) fail(label, "must be a lowercase SHA-256 digest")
  return value
}

function uuidV4(value: unknown, label: string): string {
  if (typeof value !== "string" || !UUID_V4.test(value)) fail(label, "must be a canonical lowercase UUID v4")
  return value
}

function canonicalTimestamp(value: unknown, label: string): string {
  if (typeof value !== "string") fail(label, "must be a string")
  assertUnicodeScalars(value, label)
  if (!CANONICAL_TIMESTAMP.test(value)) fail(label, "must be a canonical UTC millisecond timestamp")
  const epoch = Date.parse(value)
  if (!Number.isFinite(epoch) || new Date(epoch).toISOString() !== value) {
    fail(label, "must be a valid canonical UTC millisecond timestamp")
  }
  return value
}

function positiveSafeInteger(value: unknown, label: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 1 || Object.is(value, -0)) {
    fail(label, "must be a safe integer >= 1")
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

function assertSafeJsonGraph(value: unknown, label: string): void {
  const seen = new Set<object>()
  let nodes = 0
  const visit = (current: unknown, path: string, depth: number): void => {
    nodes += 1
    if (nodes > 8_192) fail(label, "exceeds the maximum JSON node count")
    if (depth > 16) fail(label, "exceeds the maximum JSON depth")
    if (current === null || typeof current === "boolean") return
    if (typeof current === "string") {
      assertUnicodeScalars(current, path)
      return
    }
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
        if (key !== "length" && !ARRAY_INDEX.test(key)) fail(path, `contains unknown array field: ${key}`)
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

function normalizeReadEvent(
  value: unknown,
  source: P7ReceiptLedgerFileReadEvidenceBinding,
  verificationStartedAt: string,
  verificationCompletedAt: string,
): NormalizedReadEvent {
  assertSafeJsonGraph(value, "verificationReceiptLedgerReadEvent")
  const event = ownDataRecord(value, EVENT_KEYS, EVENT_KEYS, "verificationReceiptLedgerReadEvent")
  if (event.protocol !== P7_R18_EVENT_PROTOCOL) fail("verificationReceiptLedgerReadEvent.protocol", "must equal kodac.event")
  if (event.version !== P7_R18_EVENT_VERSION) fail("verificationReceiptLedgerReadEvent.version", "must equal 1")
  const eventId = uuidV4(event.eventId, "verificationReceiptLedgerReadEvent.eventId")
  if (typeof event.sessionId !== "string" || event.sessionId !== source.verificationSessionId) {
    fail("verificationReceiptLedgerReadEvent.sessionId", "must match the exact source verification session")
  }
  const sequence = positiveSafeInteger(event.sequence, "verificationReceiptLedgerReadEvent.sequence")
  const emittedAt = canonicalTimestamp(event.emittedAt, "verificationReceiptLedgerReadEvent.emittedAt")
  if (Date.parse(emittedAt) < Date.parse(verificationStartedAt)) {
    fail("verificationReceiptLedgerReadEvent.emittedAt", "must not be earlier than the exact verification start")
  }
  if (Date.parse(emittedAt) > Date.parse(verificationCompletedAt)) {
    fail("verificationReceiptLedgerReadEvent.emittedAt", "must not be later than the exact verification completion")
  }
  if (event.type !== P7_R18_EVENT_TYPE) {
    fail("verificationReceiptLedgerReadEvent.type", "must equal verification.receipt_ledger.read")
  }

  const payload = ownDataRecord(event.payload, PAYLOAD_KEYS, PAYLOAD_KEYS, "verificationReceiptLedgerReadEvent.payload")
  const receiptLedgerPathSha256 = sha256(
    payload.receiptLedgerPathSha256,
    "verificationReceiptLedgerReadEvent.payload.receiptLedgerPathSha256",
  )
  if (receiptLedgerPathSha256 !== source.receiptLedgerPathSha256) {
    fail("verificationReceiptLedgerReadEvent.payload.receiptLedgerPathSha256", "must match the exact P7-R16 path digest")
  }
  if (payload.receiptLedgerPresent !== true) {
    fail("verificationReceiptLedgerReadEvent.payload.receiptLedgerPresent", "must equal true for a P7-R16 binding")
  }
  const receiptLedgerReadUtf8Bytes = positiveSafeInteger(
    payload.receiptLedgerReadUtf8Bytes,
    "verificationReceiptLedgerReadEvent.payload.receiptLedgerReadUtf8Bytes",
  )
  if (receiptLedgerReadUtf8Bytes !== source.receiptLedgerReadUtf8Bytes) {
    fail("verificationReceiptLedgerReadEvent.payload.receiptLedgerReadUtf8Bytes", "must match the exact P7-R16 byte count")
  }
  const receiptLedgerReadSha256 = sha256(
    payload.receiptLedgerReadSha256,
    "verificationReceiptLedgerReadEvent.payload.receiptLedgerReadSha256",
  )
  if (receiptLedgerReadSha256 !== source.receiptLedgerReadSha256) {
    fail("verificationReceiptLedgerReadEvent.payload.receiptLedgerReadSha256", "must match the exact P7-R16 read digest")
  }
  const parsedReceiptCount = positiveSafeInteger(
    payload.parsedReceiptCount,
    "verificationReceiptLedgerReadEvent.payload.parsedReceiptCount",
  )
  if (parsedReceiptCount !== source.receiptCount) {
    fail("verificationReceiptLedgerReadEvent.payload.parsedReceiptCount", "must match the exact P7-R16 receipt count")
  }

  return deepFreeze({
    protocol: P7_R18_EVENT_PROTOCOL,
    version: P7_R18_EVENT_VERSION,
    eventId,
    sessionId: source.verificationSessionId,
    sequence,
    emittedAt,
    type: P7_R18_EVENT_TYPE,
    payload: deepFreeze({
      receiptLedgerPathSha256,
      receiptLedgerPresent: true as const,
      receiptLedgerReadUtf8Bytes,
      receiptLedgerReadSha256,
      parsedReceiptCount,
    }),
  })
}

async function normalizedBuildCore(value: unknown): Promise<EvidenceCore> {
  const input = ownDataRecord(
    value,
    BUILD_KEYS,
    BUILD_KEYS,
    "verification-engine receipt-ledger read evidence build input",
  )
  const sourceInput = input.sourceReceiptLedgerFileReadEvidenceBindingInput as P7ReceiptLedgerFileReadEvidenceBindingBuildInput
  const source = await validateP7ReceiptLedgerFileReadEvidenceBinding(
    input.sourceReceiptLedgerFileReadEvidenceBinding,
    sourceInput,
  )

  const sourceRecordSet =
    sourceInput.sourceReceiptLedgerSnapshotEvidenceBindingInput.sourceReceiptRecordSetEvidenceBinding
  const verificationStartedAt = canonicalTimestamp(sourceRecordSet.verificationStartedAt, "source.verificationStartedAt")
  const verificationCompletedAt = canonicalTimestamp(sourceRecordSet.verificationCompletedAt, "source.verificationCompletedAt")
  if (Date.parse(verificationCompletedAt) < Date.parse(verificationStartedAt)) {
    fail("source verification interval", "must not complete before it starts")
  }

  const event = normalizeReadEvent(
    input.verificationReceiptLedgerReadEvent,
    source,
    verificationStartedAt,
    verificationCompletedAt,
  )
  const verificationReceiptLedgerReadEventIdentity = hashText(canonicalJson(event))

  return deepFreeze({
    version: P7_R18_VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BINDING_VERSION,
    state: P7_R18_VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_STATE,
    sourceReceiptLedgerFileReadEvidenceIdentity: source.evidenceIdentity,
    sourceReceiptLedgerSnapshotEvidenceIdentity: source.sourceReceiptLedgerSnapshotEvidenceIdentity,
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
    receiptLedgerPathSha256: source.receiptLedgerPathSha256,
    receiptLedgerReadUtf8Bytes: source.receiptLedgerReadUtf8Bytes,
    receiptLedgerReadSha256: source.receiptLedgerReadSha256,
    receiptLedgerFileObservationIdentity: source.receiptLedgerFileObservationIdentity,
    receiptLedgerReadIdentity: source.receiptLedgerReadIdentity,
    verificationReceiptLedgerReadEventIdentity,
    verificationReceiptLedgerReadEventProtocol: event.protocol,
    verificationReceiptLedgerReadEventVersion: event.version,
    verificationReceiptLedgerReadEventId: event.eventId,
    verificationReceiptLedgerReadEventSequence: event.sequence,
    verificationReceiptLedgerReadEventEmittedAt: event.emittedAt,
    verificationReceiptLedgerReadEventType: event.type,
    parsedReceiptCount: event.payload.parsedReceiptCount,
  })
}

function evidenceIdentity(core: EvidenceCore): string {
  return hashText(canonicalJson(core))
}

export async function buildP7VerificationEngineReceiptLedgerReadEvidenceBinding(
  input: P7VerificationEngineReceiptLedgerReadEvidenceBindingBuildInput,
): Promise<P7VerificationEngineReceiptLedgerReadEvidenceBinding> {
  const core = await normalizedBuildCore(input)
  return deepFreeze({ ...core, evidenceIdentity: evidenceIdentity(core) })
}

export async function validateP7VerificationEngineReceiptLedgerReadEvidenceBinding(
  value: unknown,
  input: P7VerificationEngineReceiptLedgerReadEvidenceBindingBuildInput,
): Promise<P7VerificationEngineReceiptLedgerReadEvidenceBinding> {
  assertSafeJsonGraph(value, "verification-engine receipt-ledger read evidence binding")
  const record = ownDataRecord(
    value,
    OUTPUT_KEYS,
    OUTPUT_KEYS,
    "verification-engine receipt-ledger read evidence binding",
  )
  const claimedIdentity = sha256(
    record.evidenceIdentity,
    "verification-engine receipt-ledger read evidence binding.evidenceIdentity",
  )
  const expected = await buildP7VerificationEngineReceiptLedgerReadEvidenceBinding(input)
  if (claimedIdentity !== expected.evidenceIdentity) {
    fail("verification-engine receipt-ledger read evidence binding.evidenceIdentity", "does not match the canonical source/event-derived preimage")
  }
  if (canonicalJson(record) !== canonicalJson(expected)) {
    fail("verification-engine receipt-ledger read evidence binding", "does not match canonical source/event-derived semantics")
  }
  return expected
}
