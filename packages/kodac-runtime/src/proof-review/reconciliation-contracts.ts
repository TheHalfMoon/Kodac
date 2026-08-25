import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

import {
  K5_R1_EVIDENCE_STATUSES,
  compareK5R1ScalarStrings,
  type K5R1EvidenceKind,
  type K5R1EvidenceStatus,
  type K5R1Revision,
} from "./contracts.ts"
import { K5_R2_LINK_STATUSES, type K5R2LinkStatus } from "./linkage-contracts.ts"
import { K5_R3_LINK_STATUSES, type K5R3LinkStatus } from "./review-adjudication-contracts.ts"

export const K5_R4_PROOF_STATE_RECONCILIATION_VERSION = "kodac-k5-r4-proof-state-reconciliation-v1" as const
export const K5_R4_EVIDENCE_STATES = Object.freeze(["VALID", "INCOMPLETE", "STALE", "CONTRADICTORY", "INVALID"] as const)
export const K5_R4_RECONCILIATION_STATUSES = Object.freeze(["NOT_APPLICABLE", ...K5_R4_EVIDENCE_STATES] as const)
export const K5_R4_LINKAGE_LAYERS = Object.freeze(["K5_R2", "K5_R3"] as const)
export const K5_R4_CAUSES = Object.freeze([
  "R1_EXPLICIT_INVALID",
  "R2_KIND_MISMATCH",
  "R2_REF_MISMATCH",
  "R2_DIGEST_MISMATCH",
  "R3_REF_MISMATCH",
  "R3_DIGEST_MISMATCH",
  "R1_EXPLICIT_STALE",
  "R2_REVISION_MISMATCH",
  "R3_REVISION_MISMATCH",
  "R1_EXPLICIT_CONTRADICTORY",
  "R1_EXPLICIT_FAILED",
  "R2_NO_SOURCE",
  "R3_NO_SOURCE",
] as const)
export const K5_R4_LIMITS = Object.freeze({
  maxResults: 4_096,
  maxOutOfScopeEvidenceIds: 4_096,
  maxCausesPerResult: 13,
  maxEvidenceIdBytes: 128,
  maxRepositoryIdBytes: 512,
  safeJsonMaxDepth: 32,
  safeJsonMaxNodes: 100_000,
  safeJsonMaxTotalStringChars: 4_000_000,
} as const)

export type K5R4EvidenceState = typeof K5_R4_EVIDENCE_STATES[number]
export type K5R4ReconciliationStatus = typeof K5_R4_RECONCILIATION_STATUSES[number]
export type K5R4LinkageLayer = typeof K5_R4_LINKAGE_LAYERS[number]
export type K5R4Cause = typeof K5_R4_CAUSES[number]
export type K5R4LinkStatus = K5R2LinkStatus | K5R3LinkStatus

export interface K5R4EvidenceResult {
  readonly evidenceId: string
  readonly evidenceKind: Extract<K5R1EvidenceKind, "VERIFICATION" | "EXECUTION_RECEIPT" | "REPOSITORY_STATE" | "REVIEW_ADJUDICATION">
  readonly r1Status: K5R1EvidenceStatus
  readonly linkageLayer: K5R4LinkageLayer
  readonly linkStatus: K5R4LinkStatus
  readonly sourceIdentity: string | null
  readonly state: K5R4EvidenceState
  readonly causes: readonly K5R4Cause[]
}

export interface K5R4ProofStateReconciliation {
  readonly version: typeof K5_R4_PROOF_STATE_RECONCILIATION_VERSION
  readonly packageIdentity: string
  readonly r2LinkageIdentity: string
  readonly r3LinkageIdentity: string
  readonly revision: K5R1Revision
  readonly status: K5R4ReconciliationStatus
  readonly results: readonly K5R4EvidenceResult[]
  readonly outOfScopeEvidenceIds: readonly string[]
  readonly reconciliationIdentity: string
}

export interface K5R4ProofStateReconciliationInput {
  readonly packageIdentity: string
  readonly r2LinkageIdentity: string
  readonly r3LinkageIdentity: string
  readonly revision: K5R1Revision
  readonly status: K5R4ReconciliationStatus
  readonly results: readonly K5R4EvidenceResult[]
  readonly outOfScopeEvidenceIds: readonly string[]
}

type Rec = Record<string, unknown>
type JsonFrame =
  | { readonly kind: "value"; readonly value: unknown; readonly label: string; readonly depth: number }
  | { readonly kind: "leave"; readonly value: object }

const SHA40 = /^[0-9a-f]{40}$/
const SHA256 = /^[0-9a-f]{64}$/
const EVIDENCE_STATUSES = new Set<string>(K5_R1_EVIDENCE_STATUSES)
const EVIDENCE_STATES = new Set<string>(K5_R4_EVIDENCE_STATES)
const RECONCILIATION_STATUSES = new Set<string>(K5_R4_RECONCILIATION_STATUSES)
const LINKAGE_LAYERS = new Set<string>(K5_R4_LINKAGE_LAYERS)
const LINK_STATUSES = new Set<string>([...K5_R2_LINK_STATUSES, ...K5_R3_LINK_STATUSES])
const CAUSES = new Set<string>(K5_R4_CAUSES)
const CAUSE_RANK = new Map<string, number>(K5_R4_CAUSES.map((cause, index) => [cause, index]))
const LINKED_EVIDENCE_KINDS = new Set<string>(["VERIFICATION", "EXECUTION_RECEIPT", "REPOSITORY_STATE", "REVIEW_ADJUDICATION"])

const RECORD_KEYS = [
  "version",
  "packageIdentity",
  "r2LinkageIdentity",
  "r3LinkageIdentity",
  "revision",
  "status",
  "results",
  "outOfScopeEvidenceIds",
  "reconciliationIdentity",
] as const
const REVISION_KEYS = ["repositoryId", "canonicalBase", "candidateHead"] as const
const RESULT_KEYS = [
  "evidenceId",
  "evidenceKind",
  "r1Status",
  "linkageLayer",
  "linkStatus",
  "sourceIdentity",
  "state",
  "causes",
] as const

function bad(label: string, detail: string): never {
  throw new TypeError(`${label} ${detail}`)
}

function validUnicodeScalars(value: string, label: string): void {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index)
    if (code >= 0xd800 && code <= 0xdbff) {
      if (index + 1 >= value.length) bad(label, "must contain only valid Unicode scalar values")
      const next = value.charCodeAt(index + 1)
      if (next < 0xdc00 || next > 0xdfff) bad(label, "must contain only valid Unicode scalar values")
      index += 1
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      bad(label, "must contain only valid Unicode scalar values")
    }
  }
}

function assertSafeJson(value: unknown, label: string): void {
  const ancestors = new WeakSet<object>()
  const stack: JsonFrame[] = [{ kind: "value", value, label, depth: 0 }]
  let nodes = 0
  let totalStringChars = 0

  while (stack.length !== 0) {
    const frame = stack.pop() as JsonFrame
    if (frame.kind === "leave") {
      ancestors.delete(frame.value)
      continue
    }
    nodes += 1
    if (nodes > K5_R4_LIMITS.safeJsonMaxNodes) bad(frame.label, `exceeds safe JSON node budget of ${K5_R4_LIMITS.safeJsonMaxNodes}`)
    if (frame.depth > K5_R4_LIMITS.safeJsonMaxDepth) bad(frame.label, `exceeds safe JSON nesting depth of ${K5_R4_LIMITS.safeJsonMaxDepth}`)

    const current = frame.value
    if (typeof current === "object" && current !== null) {
      if (utilTypes.isProxy(current)) bad(frame.label, "must not be a Proxy")
      if (ancestors.has(current)) bad(frame.label, "must not contain cycles")
      ancestors.add(current)
      stack.push({ kind: "leave", value: current })

      if (Array.isArray(current)) {
        if (Object.getPrototypeOf(current) !== Array.prototype) bad(frame.label, "must be a plain array")
        if (Object.getOwnPropertySymbols(current).length !== 0) bad(frame.label, "must not contain symbol fields")
        const lengthDescriptor = Object.getOwnPropertyDescriptor(current, "length")
        const length: unknown = lengthDescriptor !== undefined && "value" in lengthDescriptor ? lengthDescriptor.value : undefined
        if (typeof length !== "number" || !Number.isSafeInteger(length) || Object.is(length, -0) || length < 0) {
          bad(frame.label, "must have a safe array length")
        }
        if (length > K5_R4_LIMITS.safeJsonMaxNodes - nodes) bad(frame.label, `exceeds safe JSON node budget of ${K5_R4_LIMITS.safeJsonMaxNodes}`)
        const names = Object.getOwnPropertyNames(current)
        if (names.length !== length + 1) bad(frame.label, "contains unexpected array fields")
        for (let index = length - 1; index >= 0; index -= 1) {
          const descriptor = Object.getOwnPropertyDescriptor(current, String(index))
          if (descriptor === undefined) bad(frame.label, "must be dense")
          if (!("value" in descriptor) || !descriptor.enumerable) bad(`${frame.label}[${index}]`, "must be an enumerable data property")
          stack.push({ kind: "value", value: descriptor.value, label: `${frame.label}[${index}]`, depth: frame.depth + 1 })
        }
      } else {
        const prototype = Object.getPrototypeOf(current)
        if (prototype !== Object.prototype && prototype !== null) bad(frame.label, "must be a plain object")
        if (Object.getOwnPropertySymbols(current).length !== 0) bad(frame.label, "must not contain symbol fields")
        const names = Object.getOwnPropertyNames(current)
        if (names.length > K5_R4_LIMITS.safeJsonMaxNodes - nodes) bad(frame.label, `exceeds safe JSON node budget of ${K5_R4_LIMITS.safeJsonMaxNodes}`)
        for (let index = names.length - 1; index >= 0; index -= 1) {
          const name = names[index] as string
          validUnicodeScalars(name, `${frame.label} property name`)
          const descriptor = Object.getOwnPropertyDescriptor(current, name)
          if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) bad(`${frame.label}.${name}`, "must be an enumerable data property")
          stack.push({ kind: "value", value: descriptor.value, label: `${frame.label}.${name}`, depth: frame.depth + 1 })
        }
      }
      continue
    }

    if (typeof current === "string") {
      validUnicodeScalars(current, frame.label)
      totalStringChars += current.length
      if (totalStringChars > K5_R4_LIMITS.safeJsonMaxTotalStringChars) {
        bad(frame.label, `exceeds safe JSON string budget of ${K5_R4_LIMITS.safeJsonMaxTotalStringChars} characters`)
      }
      continue
    }
    if (typeof current === "number") {
      if (!Number.isSafeInteger(current) || Object.is(current, -0)) bad(frame.label, "must be a non-negative-zero safe integer")
      continue
    }
    if (current === null || typeof current === "boolean") continue
    bad(frame.label, "must contain only JSON data")
  }
}

function rec(value: unknown, keys: readonly string[], label: string): Rec {
  if (typeof value === "object" && value !== null && utilTypes.isProxy(value)) bad(label, "must not be a Proxy")
  if (value === null || typeof value !== "object" || Array.isArray(value)) bad(label, "must be a plain object")
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) bad(label, "must be a plain object")
  if (Object.getOwnPropertySymbols(value).length !== 0) bad(label, "must not contain symbol fields")
  const names = Object.getOwnPropertyNames(value)
  if (names.length !== keys.length) bad(label, "has an invalid key set")
  const allowed = new Set(keys)
  const out = Object.create(null) as Rec
  for (const name of names) {
    if (!allowed.has(name)) bad(label, `contains unknown field: ${name}`)
    const descriptor = Object.getOwnPropertyDescriptor(value, name)
    if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) bad(`${label}.${name}`, "must be an enumerable data property")
    out[name] = descriptor.value
  }
  for (const key of keys) if (!Object.hasOwn(out, key)) bad(label, `is missing required field: ${key}`)
  return out
}

function arr(value: unknown, label: string, min: number, max: number): readonly unknown[] {
  if (typeof value === "object" && value !== null && utilTypes.isProxy(value)) bad(label, "must not be a Proxy")
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) bad(label, "must be a plain array")
  if (Object.getOwnPropertySymbols(value).length !== 0) bad(label, "must not contain symbol fields")
  const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length")
  const length: unknown = lengthDescriptor !== undefined && "value" in lengthDescriptor ? lengthDescriptor.value : undefined
  if (typeof length !== "number" || !Number.isSafeInteger(length) || Object.is(length, -0) || length < min || length > max) {
    bad(label, `must contain ${min} through ${max} entries`)
  }
  const out: unknown[] = []
  for (let index = 0; index < length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index))
    if (descriptor === undefined) bad(label, "must be dense")
    if (!("value" in descriptor) || !descriptor.enumerable) bad(`${label}[${index}]`, "must be an enumerable data property")
    out.push(descriptor.value)
  }
  if (Object.getOwnPropertyNames(value).length !== length + 1) bad(label, "contains unexpected array fields")
  return out
}

function text(value: unknown, label: string, maxBytes: number): string {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) bad(label, "must be a non-empty NUL-free string")
  validUnicodeScalars(value, label)
  if (Buffer.byteLength(value, "utf8") > maxBytes) bad(label, `exceeds ${maxBytes} UTF-8 bytes`)
  return value
}

function fixed<T extends string>(value: unknown, expected: T, label: string): T {
  if (value !== expected) bad(label, `must equal ${expected}`)
  return expected
}

function en<T extends string>(value: unknown, allowed: ReadonlySet<string>, label: string): T {
  if (typeof value !== "string" || !allowed.has(value)) bad(label, "is unsupported")
  return value as T
}

function sha40(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA40.test(value)) bad(label, "must be 40 lowercase hexadecimal characters")
  return value
}

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) bad(label, "must be 64 lowercase hexadecimal characters")
  return value
}

function revision(value: unknown, label: string): K5R1Revision {
  const record = rec(value, REVISION_KEYS, label)
  return Object.freeze({
    repositoryId: text(record.repositoryId, `${label}.repositoryId`, K5_R4_LIMITS.maxRepositoryIdBytes),
    canonicalBase: sha40(record.canonicalBase, `${label}.canonicalBase`),
    candidateHead: sha40(record.candidateHead, `${label}.candidateHead`),
  })
}

function causeState(cause: K5R4Cause): K5R4EvidenceState {
  if (cause === "R1_EXPLICIT_INVALID" || cause === "R2_KIND_MISMATCH" || cause === "R2_REF_MISMATCH" || cause === "R2_DIGEST_MISMATCH" || cause === "R3_REF_MISMATCH" || cause === "R3_DIGEST_MISMATCH") return "INVALID"
  if (cause === "R1_EXPLICIT_STALE" || cause === "R2_REVISION_MISMATCH" || cause === "R3_REVISION_MISMATCH") return "STALE"
  if (cause === "R1_EXPLICIT_CONTRADICTORY") return "CONTRADICTORY"
  return "INCOMPLETE"
}

const STATE_RANK = new Map<K5R4EvidenceState, number>([
  ["VALID", 0], ["INCOMPLETE", 1], ["CONTRADICTORY", 2], ["STALE", 3], ["INVALID", 4],
])

export function k5R4StateFromCauses(causes: readonly K5R4Cause[]): K5R4EvidenceState {
  let state: K5R4EvidenceState = "VALID"
  for (const cause of causes) {
    const contribution = causeState(cause)
    if ((STATE_RANK.get(contribution) as number) > (STATE_RANK.get(state) as number)) state = contribution
  }
  return state
}

function r1Cause(status: K5R1EvidenceStatus): K5R4Cause | null {
  if (status === "INVALID") return "R1_EXPLICIT_INVALID"
  if (status === "STALE") return "R1_EXPLICIT_STALE"
  if (status === "CONTRADICTORY") return "R1_EXPLICIT_CONTRADICTORY"
  if (status === "FAILED") return "R1_EXPLICIT_FAILED"
  return null
}

function validateCauseSemantics(
  r1Status: K5R1EvidenceStatus,
  layer: K5R4LinkageLayer,
  linkStatus: K5R4LinkStatus,
  sourceIdentity: string | null,
  causes: readonly K5R4Cause[],
  label: string,
): void {
  const expectedR1 = r1Cause(r1Status)
  const r1Causes = causes.filter((cause) => cause.startsWith("R1_"))
  if (expectedR1 === null ? r1Causes.length !== 0 : r1Causes.length !== 1 || r1Causes[0] !== expectedR1) {
    bad(`${label}.causes`, "must encode the exact R1 evidence-status contribution")
  }
  const r2Causes = causes.filter((cause) => cause.startsWith("R2_"))
  const r3Causes = causes.filter((cause) => cause.startsWith("R3_"))
  const own = layer === "K5_R2" ? r2Causes : r3Causes
  const foreign = layer === "K5_R2" ? r3Causes : r2Causes
  if (foreign.length !== 0) bad(`${label}.causes`, "contains a cause from the wrong linkage layer")

  if (linkStatus === "LINKED") {
    if (sourceIdentity === null || own.length !== 0) bad(label, "LINKED requires source identity and no linkage cause")
  } else if (linkStatus === "UNLINKED") {
    const expected = layer === "K5_R2" ? "R2_NO_SOURCE" : "R3_NO_SOURCE"
    if (sourceIdentity !== null || own.length !== 1 || own[0] !== expected) bad(label, "UNLINKED requires null source identity and the exact NO_SOURCE cause")
  } else {
    if (sourceIdentity === null || own.length === 0) bad(label, "MISMATCH requires source identity and one or more mismatch causes")
    const allowed = layer === "K5_R2"
      ? new Set<K5R4Cause>(["R2_KIND_MISMATCH", "R2_REF_MISMATCH", "R2_DIGEST_MISMATCH", "R2_REVISION_MISMATCH"])
      : new Set<K5R4Cause>(["R3_REF_MISMATCH", "R3_DIGEST_MISMATCH", "R3_REVISION_MISMATCH"])
    if (own.some((cause) => !allowed.has(cause))) bad(`${label}.causes`, "contains an invalid mismatch cause")
  }
}

function causes(value: unknown, label: string): readonly K5R4Cause[] {
  const parsed = arr(value, label, 0, K5_R4_LIMITS.maxCausesPerResult).map((item, index) => en<K5R4Cause>(item, CAUSES, `${label}[${index}]`))
  if (new Set(parsed).size !== parsed.length) bad(label, "must not contain duplicates")
  const sorted = parsed.slice().sort((left, right) => (CAUSE_RANK.get(left) as number) - (CAUSE_RANK.get(right) as number))
  if (parsed.some((cause, index) => cause !== sorted[index])) bad(label, "must be in fixed canonical cause order")
  return Object.freeze(parsed)
}

function result(value: unknown, label: string): K5R4EvidenceResult {
  const record = rec(value, RESULT_KEYS, label)
  const evidenceId = text(record.evidenceId, `${label}.evidenceId`, K5_R4_LIMITS.maxEvidenceIdBytes)
  const evidenceKind = en<K5R4EvidenceResult["evidenceKind"]>(record.evidenceKind, LINKED_EVIDENCE_KINDS, `${label}.evidenceKind`)
  const r1Status = en<K5R1EvidenceStatus>(record.r1Status, EVIDENCE_STATUSES, `${label}.r1Status`)
  const linkageLayer = en<K5R4LinkageLayer>(record.linkageLayer, LINKAGE_LAYERS, `${label}.linkageLayer`)
  if (evidenceKind === "REVIEW_ADJUDICATION" ? linkageLayer !== "K5_R3" : linkageLayer !== "K5_R2") {
    bad(`${label}.linkageLayer`, "does not match evidenceKind")
  }
  const allowedStatuses = linkageLayer === "K5_R2" ? new Set<string>(K5_R2_LINK_STATUSES) : new Set<string>(K5_R3_LINK_STATUSES)
  const linkStatus = en<K5R4LinkStatus>(record.linkStatus, allowedStatuses, `${label}.linkStatus`)
  if (!LINK_STATUSES.has(linkStatus)) bad(`${label}.linkStatus`, "is unsupported")
  const sourceIdentity = record.sourceIdentity === null ? null : sha256(record.sourceIdentity, `${label}.sourceIdentity`)
  const parsedCauses = causes(record.causes, `${label}.causes`)
  validateCauseSemantics(r1Status, linkageLayer, linkStatus, sourceIdentity, parsedCauses, label)
  const state = en<K5R4EvidenceState>(record.state, EVIDENCE_STATES, `${label}.state`)
  const expectedState = k5R4StateFromCauses(parsedCauses)
  if (state !== expectedState) bad(`${label}.state`, "does not match the canonical worst contribution")
  return Object.freeze({ evidenceId, evidenceKind, r1Status, linkageLayer, linkStatus, sourceIdentity, state, causes: parsedCauses })
}

function results(value: unknown): readonly K5R4EvidenceResult[] {
  const parsed = arr(value, "proofStateReconciliation.results", 0, K5_R4_LIMITS.maxResults).map((item, index) => result(item, `proofStateReconciliation.results[${index}]`))
  const ids = parsed.map((item) => item.evidenceId)
  if (new Set(ids).size !== ids.length) bad("proofStateReconciliation.results", "contains duplicate evidenceId values")
  const sorted = parsed.slice().sort((left, right) => compareK5R1ScalarStrings(left.evidenceId, right.evidenceId))
  if (parsed.some((item, index) => item.evidenceId !== sorted[index]?.evidenceId)) bad("proofStateReconciliation.results", "must be canonically sorted")
  return Object.freeze(parsed)
}

function outOfScopeIds(value: unknown): readonly string[] {
  const parsed = arr(value, "proofStateReconciliation.outOfScopeEvidenceIds", 0, K5_R4_LIMITS.maxOutOfScopeEvidenceIds).map((item, index) => text(item, `proofStateReconciliation.outOfScopeEvidenceIds[${index}]`, K5_R4_LIMITS.maxEvidenceIdBytes))
  if (new Set(parsed).size !== parsed.length) bad("proofStateReconciliation.outOfScopeEvidenceIds", "must not contain duplicates")
  const sorted = parsed.slice().sort(compareK5R1ScalarStrings)
  if (parsed.some((item, index) => item !== sorted[index])) bad("proofStateReconciliation.outOfScopeEvidenceIds", "must be canonically sorted")
  return Object.freeze(parsed)
}

function aggregateStatus(parsedResults: readonly K5R4EvidenceResult[]): K5R4ReconciliationStatus {
  if (parsedResults.length === 0) return "NOT_APPLICABLE"
  let state: K5R4EvidenceState = "VALID"
  for (const item of parsedResults) {
    if ((STATE_RANK.get(item.state) as number) > (STATE_RANK.get(state) as number)) state = item.state
  }
  return state
}

function jcs(value: unknown): string {
  if (value === null) return "null"
  if (typeof value === "boolean") return value ? "true" : "false"
  if (typeof value === "string") { validUnicodeScalars(value, "canonical string"); return JSON.stringify(value) }
  if (typeof value === "number") {
    if (!Number.isSafeInteger(value) || Object.is(value, -0)) bad("canonical number", "must be a non-negative-zero safe integer")
    return JSON.stringify(value)
  }
  if (Array.isArray(value)) return `[${value.map(jcs).join(",")}]`
  if (typeof value !== "object" || value === null) bad("canonical value", "must be JSON data")
  const record = value as Rec
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${jcs(record[key])}`).join(",")}}`
}

export function k5R4ReconciliationIdentity(value: K5R4ProofStateReconciliationInput): string {
  return createHash("sha256").update(jcs(value), "utf8").digest("hex")
}

export function validateK5R4ProofStateReconciliation(value: unknown): K5R4ProofStateReconciliation {
  assertSafeJson(value, "proofStateReconciliation")
  const record = rec(value, RECORD_KEYS, "proofStateReconciliation")
  fixed(record.version, K5_R4_PROOF_STATE_RECONCILIATION_VERSION, "proofStateReconciliation.version")
  const packageIdentity = sha256(record.packageIdentity, "proofStateReconciliation.packageIdentity")
  const r2LinkageIdentity = sha256(record.r2LinkageIdentity, "proofStateReconciliation.r2LinkageIdentity")
  const r3LinkageIdentity = sha256(record.r3LinkageIdentity, "proofStateReconciliation.r3LinkageIdentity")
  const rev = revision(record.revision, "proofStateReconciliation.revision")
  const status = en<K5R4ReconciliationStatus>(record.status, RECONCILIATION_STATUSES, "proofStateReconciliation.status")
  const parsedResults = results(record.results)
  const out = outOfScopeIds(record.outOfScopeEvidenceIds)
  const resultIds = new Set(parsedResults.map((item) => item.evidenceId))
  if (out.some((id) => resultIds.has(id))) bad("proofStateReconciliation.outOfScopeEvidenceIds", "must be disjoint from results")
  const expectedStatus = aggregateStatus(parsedResults)
  if (status !== expectedStatus) bad("proofStateReconciliation.status", "does not match the canonical aggregate state")
  const claimedIdentity = sha256(record.reconciliationIdentity, "proofStateReconciliation.reconciliationIdentity")
  const normalized = Object.freeze({ packageIdentity, r2LinkageIdentity, r3LinkageIdentity, revision: rev, status, results: parsedResults, outOfScopeEvidenceIds: out })
  const expectedIdentity = k5R4ReconciliationIdentity(normalized)
  if (claimedIdentity !== expectedIdentity) bad("proofStateReconciliation.reconciliationIdentity", "does not match canonical reconciliation content")
  return Object.freeze({ version: K5_R4_PROOF_STATE_RECONCILIATION_VERSION, ...normalized, reconciliationIdentity: expectedIdentity })
}
