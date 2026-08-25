import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

import {
  compareK5R1ScalarStrings,
  type K5R1EvidenceKind,
  type K5R1Revision,
} from "./contracts.ts"

export const K5_R2_SOURCE_LINK_VERSION = "kodac-k5-r2-source-link-v1" as const
export const K5_R2_EVIDENCE_LINKAGE_VERSION = "kodac-k5-r2-evidence-linkage-v1" as const
export const K5_R2_SOURCE_KINDS = Object.freeze(["VERIFICATION_REPORT", "EXECUTION_RECEIPT", "REPOSITORY_REVISION"] as const)
export const K5_R2_LINK_STATUSES = Object.freeze(["LINKED", "UNLINKED", "MISMATCH"] as const)
export const K5_R2_LINK_CODES = Object.freeze(["NO_SOURCE", "KIND_MISMATCH", "REVISION_MISMATCH", "REF_MISMATCH", "DIGEST_MISMATCH"] as const)
export const K5_R2_LIMITS = Object.freeze({
  maxSources: 4_096,
  maxEvidenceIdBytes: 128,
  maxSourceRefBytes: 1_024,
  maxRepositoryIdBytes: 512,
  maxSessionIdBytes: 256,
  maxCheckIds: 256,
  maxCheckIdBytes: 128,
  maxReceiptIdBytes: 128,
  maxCapabilityBytes: 256,
} as const)

export type K5R2SourceKind = typeof K5_R2_SOURCE_KINDS[number]
export type K5R2LinkStatus = typeof K5_R2_LINK_STATUSES[number]
export type K5R2LinkCode = typeof K5_R2_LINK_CODES[number]

export interface K5R2VerificationReportMetadata {
  readonly protocol: "kodac.verification"
  readonly reportVersion: 1
  readonly sessionId: string
  readonly passed: boolean
  readonly checkIds: readonly string[]
}
export interface K5R2ExecutionReceiptMetadata {
  readonly receiptId: string
  readonly capability: string
  readonly inputDigest: string
  readonly policyDecision: "allow" | "ask" | "deny"
  readonly resultStatus: "success" | "blocked" | "failure"
}
export interface K5R2RepositoryRevisionMetadata {
  readonly snapshotVersion: "k3-r2-snapshot-v1"
  readonly repositoryIdentity: string
  readonly contentIdentity: string
  readonly snapshotIdentity: string
  readonly observedGitHead: string
  readonly freshness: "current" | "stale"
  readonly completeness: "complete" | "partial" | "truncated"
  readonly omittedAtLeast: number
}
export type K5R2SourceMetadata = K5R2VerificationReportMetadata | K5R2ExecutionReceiptMetadata | K5R2RepositoryRevisionMetadata
export interface K5R2SourceLink {
  readonly version: typeof K5_R2_SOURCE_LINK_VERSION
  readonly sourceIdentity: string
  readonly evidenceId: string
  readonly sourceKind: K5R2SourceKind
  readonly canonicalBase: string
  readonly candidateHead: string
  readonly sourceRef: string
  readonly sourceDigest: string
  readonly metadata: K5R2SourceMetadata
}
export interface K5R2SourceLinkInput extends Omit<K5R2SourceLink, "version" | "sourceIdentity"> {}
export interface K5R2LinkResult {
  readonly evidenceId: string
  readonly evidenceKind: Extract<K5R1EvidenceKind, "VERIFICATION" | "EXECUTION_RECEIPT" | "REPOSITORY_STATE">
  readonly sourceKind: K5R2SourceKind | null
  readonly status: K5R2LinkStatus
  readonly codes: readonly K5R2LinkCode[]
  readonly sourceIdentity: string | null
}
export interface K5R2EvidenceLinkage {
  readonly version: typeof K5_R2_EVIDENCE_LINKAGE_VERSION
  readonly packageIdentity: string
  readonly revision: K5R1Revision
  readonly links: readonly K5R2LinkResult[]
  readonly outOfScopeEvidenceIds: readonly string[]
  readonly sourceIdentities: readonly string[]
  readonly linkageIdentity: string
}

type Rec = Record<string, unknown>
const SHA40 = /^[0-9a-f]{40}$/
const SHA256 = /^[0-9a-f]{64}$/
const GIT_OBJECT = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/
const SOURCE_KINDS = new Set<string>(K5_R2_SOURCE_KINDS)
const LINK_STATUSES = new Set<string>(K5_R2_LINK_STATUSES)
const LINK_CODES = new Set<string>(K5_R2_LINK_CODES)
const LINK_RANK = new Map<string, number>(K5_R2_LINK_CODES.map((v, i) => [v, i]))
const EVIDENCE_KINDS = new Set<string>(["VERIFICATION", "EXECUTION_RECEIPT", "REPOSITORY_STATE"])
const POLICIES = new Set<string>(["allow", "ask", "deny"])
const RESULTS = new Set<string>(["success", "blocked", "failure"])
const FRESHNESS = new Set<string>(["current", "stale"])
const COMPLETENESS = new Set<string>(["complete", "partial", "truncated"])

const SOURCE_KEYS = ["version", "sourceIdentity", "evidenceId", "sourceKind", "canonicalBase", "candidateHead", "sourceRef", "sourceDigest", "metadata"] as const
const SOURCE_INPUT_KEYS = ["evidenceId", "sourceKind", "canonicalBase", "candidateHead", "sourceRef", "sourceDigest", "metadata"] as const
const VERIFY_KEYS = ["protocol", "reportVersion", "sessionId", "passed", "checkIds"] as const
const RECEIPT_KEYS = ["receiptId", "capability", "inputDigest", "policyDecision", "resultStatus"] as const
const REPO_KEYS = ["snapshotVersion", "repositoryIdentity", "contentIdentity", "snapshotIdentity", "observedGitHead", "freshness", "completeness", "omittedAtLeast"] as const
const REVISION_KEYS = ["repositoryId", "canonicalBase", "candidateHead"] as const
const LINK_KEYS = ["evidenceId", "evidenceKind", "sourceKind", "status", "codes", "sourceIdentity"] as const
const LINKAGE_KEYS = ["version", "packageIdentity", "revision", "links", "outOfScopeEvidenceIds", "sourceIdentities", "linkageIdentity"] as const

function bad(label: string, detail: string): never { throw new TypeError(`${label} ${detail}`) }
function noProxy(value: unknown, label: string): void {
  if (typeof value === "object" && value !== null && utilTypes.isProxy(value)) bad(label, "must not be a Proxy")
}
function rec(value: unknown, keys: readonly string[], label: string): Rec {
  noProxy(value, label)
  if (value === null || typeof value !== "object" || Array.isArray(value)) bad(label, "must be a plain object")
  const proto = Object.getPrototypeOf(value)
  if (proto !== Object.prototype && proto !== null) bad(label, "must be a plain object")
  if (Object.getOwnPropertySymbols(value).length) bad(label, "must not contain symbol fields")
  const names = Object.getOwnPropertyNames(value)
  if (names.length !== keys.length) bad(label, "has an invalid key set")
  const allowed = new Set(keys)
  const out = Object.create(null) as Rec
  for (const key of names) {
    if (!allowed.has(key)) bad(label, `contains unknown field: ${key}`)
    const d = Object.getOwnPropertyDescriptor(value, key)
    if (!d || !("value" in d) || !d.enumerable) bad(`${label}.${key}`, "must be an enumerable data property")
    out[key] = d.value
  }
  for (const key of keys) if (!Object.hasOwn(out, key)) bad(label, `is missing required field: ${key}`)
  return out
}
function arr(value: unknown, label: string, min: number, max: number): readonly unknown[] {
  noProxy(value, label)
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) bad(label, "must be a plain array")
  if (Object.getOwnPropertySymbols(value).length) bad(label, "must not contain symbol fields")
  const ld = Object.getOwnPropertyDescriptor(value, "length")
  const n: unknown = ld && "value" in ld ? ld.value : undefined
  if (typeof n !== "number" || !Number.isSafeInteger(n) || n < min || n > max) bad(label, `must contain ${min} through ${max} entries`)
  const out: unknown[] = []
  for (let i = 0; i < n; i += 1) {
    const d = Object.getOwnPropertyDescriptor(value, String(i))
    if (!d) bad(label, "must be dense")
    if (!("value" in d) || !d.enumerable) bad(`${label}[${i}]`, "must be an enumerable data property")
    out.push(d.value)
  }
  if (Object.getOwnPropertyNames(value).length !== n + 1) bad(label, "contains unexpected array fields")
  return out
}
function scalars(value: string, label: string): void {
  for (let i = 0; i < value.length; i += 1) {
    const c = value.charCodeAt(i)
    if (c >= 0xd800 && c <= 0xdbff) {
      const d = value.charCodeAt(i + 1)
      if (!(d >= 0xdc00 && d <= 0xdfff)) bad(label, "must contain only valid Unicode scalar values")
      i += 1
    } else if (c >= 0xdc00 && c <= 0xdfff) bad(label, "must contain only valid Unicode scalar values")
  }
}
function text(value: unknown, label: string, max: number): string {
  if (typeof value !== "string" || !value.length || value.includes("\0")) bad(label, "must be a non-empty NUL-free string")
  scalars(value, label)
  if (Buffer.byteLength(value, "utf8") > max) bad(label, `exceeds ${max} UTF-8 bytes`)
  return value
}
function en<T extends string>(value: unknown, set: ReadonlySet<string>, label: string): T {
  if (typeof value !== "string" || !set.has(value)) bad(label, "is unsupported")
  return value as T
}
function fixed<T extends string | number>(value: unknown, expected: T, label: string): T {
  if (value !== expected) bad(label, `must equal ${expected}`)
  return expected
}
function sha40(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA40.test(value)) bad(label, "must be 40 lowercase hexadecimal characters")
  return value
}
function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) bad(label, "must be 64 lowercase hexadecimal characters")
  return value
}
function safe(value: unknown, label: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || Object.is(value, -0) || value < 0) bad(label, "must be a non-negative safe integer")
  return value
}
function bool(value: unknown, label: string): boolean {
  if (typeof value !== "boolean") bad(label, "must be a boolean")
  return value
}
function jcs(value: unknown): string {
  if (value === null) return "null"
  if (typeof value === "boolean") return value ? "true" : "false"
  if (typeof value === "string") { scalars(value, "canonical string"); return JSON.stringify(value) }
  if (typeof value === "number") {
    if (!Number.isSafeInteger(value) || Object.is(value, -0)) bad("canonical number", "must be a non-negative-zero safe integer")
    return JSON.stringify(value)
  }
  if (Array.isArray(value)) return `[${value.map(jcs).join(",")}]`
  if (typeof value !== "object" || value === null) bad("canonical value", "must be JSON data")
  const r = value as Rec
  return `{${Object.keys(r).sort().map((k) => `${JSON.stringify(k)}:${jcs(r[k])}`).join(",")}}`
}
function identity(value: unknown): string { return createHash("sha256").update(jcs(value), "utf8").digest("hex") }
function canonicalTexts(value: unknown, label: string, maxItems: number, maxBytes: number): readonly string[] {
  const items = arr(value, label, 0, maxItems).map((v, i) => text(v, `${label}[${i}]`, maxBytes))
  if (new Set(items).size !== items.length) bad(label, "must not contain duplicates")
  return Object.freeze(items.slice().sort(compareK5R1ScalarStrings))
}

function metadata(value: unknown, kind: K5R2SourceKind, label: string): K5R2SourceMetadata {
  if (kind === "VERIFICATION_REPORT") {
    const r = rec(value, VERIFY_KEYS, label)
    return Object.freeze({
      protocol: fixed(r.protocol, "kodac.verification", `${label}.protocol`),
      reportVersion: fixed(r.reportVersion, 1, `${label}.reportVersion`),
      sessionId: text(r.sessionId, `${label}.sessionId`, K5_R2_LIMITS.maxSessionIdBytes),
      passed: bool(r.passed, `${label}.passed`),
      checkIds: canonicalTexts(r.checkIds, `${label}.checkIds`, K5_R2_LIMITS.maxCheckIds, K5_R2_LIMITS.maxCheckIdBytes),
    })
  }
  if (kind === "EXECUTION_RECEIPT") {
    const r = rec(value, RECEIPT_KEYS, label)
    return Object.freeze({
      receiptId: text(r.receiptId, `${label}.receiptId`, K5_R2_LIMITS.maxReceiptIdBytes),
      capability: text(r.capability, `${label}.capability`, K5_R2_LIMITS.maxCapabilityBytes),
      inputDigest: sha256(r.inputDigest, `${label}.inputDigest`),
      policyDecision: en<K5R2ExecutionReceiptMetadata["policyDecision"]>(r.policyDecision, POLICIES, `${label}.policyDecision`),
      resultStatus: en<K5R2ExecutionReceiptMetadata["resultStatus"]>(r.resultStatus, RESULTS, `${label}.resultStatus`),
    })
  }
  const r = rec(value, REPO_KEYS, label)
  const observed = r.observedGitHead
  if (typeof observed !== "string" || !GIT_OBJECT.test(observed)) bad(`${label}.observedGitHead`, "must be a 40 or 64 character lowercase Git object id")
  return Object.freeze({
    snapshotVersion: fixed(r.snapshotVersion, "k3-r2-snapshot-v1", `${label}.snapshotVersion`),
    repositoryIdentity: sha256(r.repositoryIdentity, `${label}.repositoryIdentity`),
    contentIdentity: sha256(r.contentIdentity, `${label}.contentIdentity`),
    snapshotIdentity: sha256(r.snapshotIdentity, `${label}.snapshotIdentity`),
    observedGitHead: observed,
    freshness: en<K5R2RepositoryRevisionMetadata["freshness"]>(r.freshness, FRESHNESS, `${label}.freshness`),
    completeness: en<K5R2RepositoryRevisionMetadata["completeness"]>(r.completeness, COMPLETENESS, `${label}.completeness`),
    omittedAtLeast: safe(r.omittedAtLeast, `${label}.omittedAtLeast`),
  })
}
function sourceParts(value: unknown, keys: readonly string[], label: string) {
  const r = rec(value, keys, label)
  const sourceKind = en<K5R2SourceKind>(r.sourceKind, SOURCE_KINDS, `${label}.sourceKind`)
  return {
    r,
    evidenceId: text(r.evidenceId, `${label}.evidenceId`, K5_R2_LIMITS.maxEvidenceIdBytes),
    sourceKind,
    canonicalBase: sha40(r.canonicalBase, `${label}.canonicalBase`),
    candidateHead: sha40(r.candidateHead, `${label}.candidateHead`),
    sourceRef: text(r.sourceRef, `${label}.sourceRef`, K5_R2_LIMITS.maxSourceRefBytes),
    sourceDigest: sha256(r.sourceDigest, `${label}.sourceDigest`),
    metadata: metadata(r.metadata, sourceKind, `${label}.metadata`),
  }
}
function sourcePreimage(p: ReturnType<typeof sourceParts>) {
  return Object.freeze({
    version: K5_R2_SOURCE_LINK_VERSION,
    evidenceId: p.evidenceId,
    sourceKind: p.sourceKind,
    canonicalBase: p.canonicalBase,
    candidateHead: p.candidateHead,
    sourceRef: p.sourceRef,
    sourceDigest: p.sourceDigest,
    metadata: p.metadata,
  })
}
function frozenSource(p: ReturnType<typeof sourceParts>, sourceIdentity: string): K5R2SourceLink {
  return Object.freeze({ version: K5_R2_SOURCE_LINK_VERSION, sourceIdentity, evidenceId: p.evidenceId, sourceKind: p.sourceKind, canonicalBase: p.canonicalBase, candidateHead: p.candidateHead, sourceRef: p.sourceRef, sourceDigest: p.sourceDigest, metadata: p.metadata })
}
export function createK5R2SourceLink(input: K5R2SourceLinkInput): K5R2SourceLink {
  const p = sourceParts(input, SOURCE_INPUT_KEYS, "sourceLinkInput")
  return frozenSource(p, identity(sourcePreimage(p)))
}
function validateSource(value: unknown, label: string): K5R2SourceLink {
  const p = sourceParts(value, SOURCE_KEYS, label)
  fixed(p.r.version, K5_R2_SOURCE_LINK_VERSION, `${label}.version`)
  const claimed = sha256(p.r.sourceIdentity, `${label}.sourceIdentity`)
  const expected = identity(sourcePreimage(p))
  if (claimed !== expected) bad(`${label}.sourceIdentity`, "does not match canonical source content")
  return frozenSource(p, expected)
}
export function validateK5R2SourceLink(value: unknown): K5R2SourceLink { return validateSource(value, "sourceLink") }
export function normalizeK5R2SourceLinks(value: unknown): readonly K5R2SourceLink[] {
  const parsed = arr(value, "sourceLinks", 0, K5_R2_LIMITS.maxSources).map((v, i) => validateSource(v, `sourceLinks[${i}]`))
  const ids = parsed.map((v) => v.evidenceId)
  if (new Set(ids).size !== ids.length) bad("sourceLinks", "contains duplicate evidenceId values")
  return Object.freeze(parsed.slice().sort((a, b) => compareK5R1ScalarStrings(a.evidenceId, b.evidenceId)))
}

function revision(value: unknown, label: string): K5R1Revision {
  const r = rec(value, REVISION_KEYS, label)
  return Object.freeze({ repositoryId: text(r.repositoryId, `${label}.repositoryId`, K5_R2_LIMITS.maxRepositoryIdBytes), canonicalBase: sha40(r.canonicalBase, `${label}.canonicalBase`), candidateHead: sha40(r.candidateHead, `${label}.candidateHead`) })
}
function codes(value: unknown, label: string): readonly K5R2LinkCode[] {
  const parsed = arr(value, label, 0, K5_R2_LINK_CODES.length).map((v, i) => en<K5R2LinkCode>(v, LINK_CODES, `${label}[${i}]`))
  if (new Set(parsed).size !== parsed.length) bad(label, "must not contain duplicates")
  const sorted = parsed.slice().sort((a, b) => (LINK_RANK.get(a) as number) - (LINK_RANK.get(b) as number))
  if (parsed.some((v, i) => v !== sorted[i])) bad(label, "must be sorted by fixed code rank")
  return Object.freeze(parsed)
}
function link(value: unknown, label: string): K5R2LinkResult {
  const r = rec(value, LINK_KEYS, label)
  const evidenceId = text(r.evidenceId, `${label}.evidenceId`, K5_R2_LIMITS.maxEvidenceIdBytes)
  const evidenceKind = en<K5R2LinkResult["evidenceKind"]>(r.evidenceKind, EVIDENCE_KINDS, `${label}.evidenceKind`)
  const status = en<K5R2LinkStatus>(r.status, LINK_STATUSES, `${label}.status`)
  const cs = codes(r.codes, `${label}.codes`)
  const sourceKind = r.sourceKind === null ? null : en<K5R2SourceKind>(r.sourceKind, SOURCE_KINDS, `${label}.sourceKind`)
  const sourceIdentity = r.sourceIdentity === null ? null : sha256(r.sourceIdentity, `${label}.sourceIdentity`)
  if (status === "UNLINKED" && (sourceKind !== null || sourceIdentity !== null || cs.length !== 1 || cs[0] !== "NO_SOURCE")) bad(label, "UNLINKED requires null source fields and exactly NO_SOURCE")
  if (status === "LINKED" && (sourceKind === null || sourceIdentity === null || cs.length)) bad(label, "LINKED requires source fields and no codes")
  if (status === "MISMATCH" && (sourceKind === null || sourceIdentity === null || !cs.length || cs.includes("NO_SOURCE"))) bad(label, "MISMATCH requires source fields and mismatch codes")
  return Object.freeze({ evidenceId, evidenceKind, sourceKind, status, codes: cs, sourceIdentity })
}
function links(value: unknown): readonly K5R2LinkResult[] {
  const parsed = arr(value, "evidenceLinkage.links", 0, K5_R2_LIMITS.maxSources).map((v, i) => link(v, `evidenceLinkage.links[${i}]`))
  const ids = parsed.map((v) => v.evidenceId)
  if (new Set(ids).size !== ids.length) bad("evidenceLinkage.links", "contains duplicate evidenceId values")
  const sorted = parsed.slice().sort((a, b) => compareK5R1ScalarStrings(a.evidenceId, b.evidenceId))
  if (parsed.some((v, i) => v.evidenceId !== sorted[i]?.evidenceId)) bad("evidenceLinkage.links", "must be canonically sorted")
  return Object.freeze(parsed)
}
function canonicalStrings(value: unknown, label: string, shaOnly = false): readonly string[] {
  const parsed = arr(value, label, 0, K5_R2_LIMITS.maxSources).map((v, i) => shaOnly ? sha256(v, `${label}[${i}]`) : text(v, `${label}[${i}]`, K5_R2_LIMITS.maxEvidenceIdBytes))
  if (new Set(parsed).size !== parsed.length) bad(label, "must not contain duplicates")
  const sorted = parsed.slice().sort(compareK5R1ScalarStrings)
  if (parsed.some((v, i) => v !== sorted[i])) bad(label, "must be canonically sorted")
  return Object.freeze(parsed)
}
function linkagePreimage(packageIdentity: string, rev: K5R1Revision, ls: readonly K5R2LinkResult[], out: readonly string[], sources: readonly string[]) {
  return Object.freeze({ version: K5_R2_EVIDENCE_LINKAGE_VERSION, packageIdentity, revision: rev, links: ls, outOfScopeEvidenceIds: out, sourceIdentities: sources })
}
export function validateK5R2EvidenceLinkage(value: unknown): K5R2EvidenceLinkage {
  const r = rec(value, LINKAGE_KEYS, "evidenceLinkage")
  fixed(r.version, K5_R2_EVIDENCE_LINKAGE_VERSION, "evidenceLinkage.version")
  const packageIdentity = sha256(r.packageIdentity, "evidenceLinkage.packageIdentity")
  const rev = revision(r.revision, "evidenceLinkage.revision")
  const ls = links(r.links)
  const out = canonicalStrings(r.outOfScopeEvidenceIds, "evidenceLinkage.outOfScopeEvidenceIds")
  const sources = canonicalStrings(r.sourceIdentities, "evidenceLinkage.sourceIdentities", true)
  const claimed = sha256(r.linkageIdentity, "evidenceLinkage.linkageIdentity")
  const expected = identity(linkagePreimage(packageIdentity, rev, ls, out, sources))
  if (claimed !== expected) bad("evidenceLinkage.linkageIdentity", "does not match canonical linkage content")
  return Object.freeze({ version: K5_R2_EVIDENCE_LINKAGE_VERSION, packageIdentity, revision: rev, links: ls, outOfScopeEvidenceIds: out, sourceIdentities: sources, linkageIdentity: expected })
}
export function buildK5R2EvidenceLinkage(input: {
  readonly packageIdentity: string
  readonly revision: K5R1Revision
  readonly links: readonly K5R2LinkResult[]
  readonly outOfScopeEvidenceIds: readonly string[]
  readonly sourceIdentities: readonly string[]
}): K5R2EvidenceLinkage {
  const rev = Object.freeze({ repositoryId: input.revision.repositoryId, canonicalBase: input.revision.canonicalBase, candidateHead: input.revision.candidateHead })
  const ls = Object.freeze(input.links.map((v) => Object.freeze({ ...v, codes: Object.freeze([...v.codes]) })).sort((a, b) => compareK5R1ScalarStrings(a.evidenceId, b.evidenceId)))
  const out = Object.freeze([...input.outOfScopeEvidenceIds].sort(compareK5R1ScalarStrings))
  const sources = Object.freeze([...new Set(input.sourceIdentities)].sort(compareK5R1ScalarStrings))
  const packageIdentity = sha256(input.packageIdentity, "linkageInput.packageIdentity")
  const linkageIdentity = identity(linkagePreimage(packageIdentity, rev, ls, out, sources))
  return validateK5R2EvidenceLinkage({ version: K5_R2_EVIDENCE_LINKAGE_VERSION, packageIdentity, revision: rev, links: ls, outOfScopeEvidenceIds: out, sourceIdentities: sources, linkageIdentity })
}
