import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

import {
  compareK5R1ScalarStrings,
  type K5R1EvidenceKind,
  type K5R1Revision,
} from "./contracts.ts"

export const K5_R3_REVIEW_ADJUDICATION_SOURCE_VERSION = "kodac-k5-r3-review-adjudication-source-v1" as const
export const K5_R3_REVIEW_ADJUDICATION_LINKAGE_VERSION = "kodac-k5-r3-review-adjudication-linkage-v1" as const
export const K5_R3_SOURCE_KINDS = Object.freeze(["KRI_ADJUDICATION"] as const)
export const K5_R3_LINK_STATUSES = Object.freeze(["LINKED", "UNLINKED", "MISMATCH"] as const)
export const K5_R3_LINK_CODES = Object.freeze(["NO_SOURCE", "REVISION_MISMATCH", "REF_MISMATCH", "DIGEST_MISMATCH"] as const)
export const K5_R3_LIMITS = Object.freeze({
  maxSources: 4_096,
  maxEvidenceIdBytes: 128,
  maxSourceRefBytes: 1_024,
  maxRepositoryIdBytes: 512,
  maxKriShortChars: 128,
  maxKriTextChars: 4_096,
  maxKriPathChars: 1_024,
  maxKriRefs: 32,
  maxKriRefChars: 1_024,
  maxKriLine: 10_000_000,
} as const)

export type K5R3SourceKind = typeof K5_R3_SOURCE_KINDS[number]
export type K5R3LinkStatus = typeof K5_R3_LINK_STATUSES[number]
export type K5R3LinkCode = typeof K5_R3_LINK_CODES[number]

export interface K5R3KriReviewIdentity {
  readonly reviewRunId: string
  readonly reviewerId: string
  readonly reviewerVersion: string
  readonly policyIdentity: string
  readonly canonicalBase: string
  readonly reviewedHead: string
}

export interface K5R3KriAffectedRange {
  readonly startLine: number
  readonly endLine: number
}

export interface K5R3KriFindingRecord {
  readonly version: "kri-r2-finding-v1"
  readonly findingIdentity: string
  readonly claimKey: string
  readonly review: K5R3KriReviewIdentity
  readonly evaluatedHead: string
  readonly path: string
  readonly range?: K5R3KriAffectedRange
  readonly summary: string
  readonly contractClaim: string
  readonly category: string
  readonly severity: "blocker" | "critical" | "high" | "medium" | "low" | "info"
  readonly confidenceBps: number
  readonly evidenceRefs: readonly string[]
  readonly freshness: "CURRENT"
  readonly state: "NEW"
}

export interface K5R3KriAdjudicationRecord {
  readonly version: "kri-r2-adjudication-v1"
  readonly adjudicationIdentity: string
  readonly findingIdentity: string
  readonly previousAdjudicationIdentity: string | null
  readonly action: "CONFIRM" | "REJECT" | "MARK_DUPLICATE" | "MARK_FIXED" | "REVERIFY"
  readonly previousState: "NEW" | "CONFIRMED" | "FIXED"
  readonly resultingState: "CONFIRMED" | "REJECTED" | "DUPLICATE" | "FIXED" | "REVERIFIED"
  readonly adjudicatorId: string
  readonly evidenceRefs: readonly string[]
  readonly duplicateOf?: string
  readonly correctionRef?: string
  readonly reverificationRef?: string
}

export interface K5R3ReviewAdjudicationSource {
  readonly version: typeof K5_R3_REVIEW_ADJUDICATION_SOURCE_VERSION
  readonly sourceIdentity: string
  readonly evidenceId: string
  readonly sourceKind: K5R3SourceKind
  readonly canonicalBase: string
  readonly candidateHead: string
  readonly sourceRef: string
  readonly sourceDigest: string
  readonly finding: K5R3KriFindingRecord
  readonly adjudication: K5R3KriAdjudicationRecord
}

export interface K5R3ReviewAdjudicationSourceInput
  extends Omit<K5R3ReviewAdjudicationSource, "version" | "sourceIdentity"> {}

export interface K5R3ReviewAdjudicationLinkResult {
  readonly evidenceId: string
  readonly evidenceKind: Extract<K5R1EvidenceKind, "REVIEW_ADJUDICATION">
  readonly sourceKind: K5R3SourceKind | null
  readonly status: K5R3LinkStatus
  readonly codes: readonly K5R3LinkCode[]
  readonly sourceIdentity: string | null
}

export interface K5R3ReviewAdjudicationLinkage {
  readonly version: typeof K5_R3_REVIEW_ADJUDICATION_LINKAGE_VERSION
  readonly packageIdentity: string
  readonly revision: K5R1Revision
  readonly links: readonly K5R3ReviewAdjudicationLinkResult[]
  readonly outOfScopeEvidenceIds: readonly string[]
  readonly sourceIdentities: readonly string[]
  readonly linkageIdentity: string
}

type Rec = Record<string, unknown>
type SafeJsonFrame =
  | { readonly kind: "value"; readonly value: unknown; readonly label: string; readonly depth: number }
  | { readonly kind: "leave"; readonly value: object }

const SHA40 = /^[0-9a-f]{40}$/
const SHA256 = /^[0-9a-f]{64}$/
const SAFE_JSON_MAX_DEPTH = 32
const SAFE_JSON_MAX_NODES = 100_000
const SAFE_JSON_MAX_TOTAL_STRING_CHARS = 4_000_000
const KRI_SEVERITIES = new Set<string>(["blocker", "critical", "high", "medium", "low", "info"])
const KRI_ACTIONS = new Set<string>(["CONFIRM", "REJECT", "MARK_DUPLICATE", "MARK_FIXED", "REVERIFY"])
const KRI_PREVIOUS_STATES = new Set<string>(["NEW", "CONFIRMED", "FIXED"])
const LINK_STATUSES = new Set<string>(K5_R3_LINK_STATUSES)
const LINK_CODES = new Set<string>(K5_R3_LINK_CODES)
const LINK_RANK = new Map<string, number>(K5_R3_LINK_CODES.map((code, index) => [code, index]))

const SOURCE_KEYS = [
  "version",
  "sourceIdentity",
  "evidenceId",
  "sourceKind",
  "canonicalBase",
  "candidateHead",
  "sourceRef",
  "sourceDigest",
  "finding",
  "adjudication",
] as const
const SOURCE_INPUT_KEYS = [
  "evidenceId",
  "sourceKind",
  "canonicalBase",
  "candidateHead",
  "sourceRef",
  "sourceDigest",
  "finding",
  "adjudication",
] as const
const REVIEW_KEYS = ["reviewRunId", "reviewerId", "reviewerVersion", "policyIdentity", "canonicalBase", "reviewedHead"] as const
const RANGE_KEYS = ["startLine", "endLine"] as const
const FINDING_REQUIRED_KEYS = [
  "version",
  "findingIdentity",
  "claimKey",
  "review",
  "evaluatedHead",
  "path",
  "summary",
  "contractClaim",
  "category",
  "severity",
  "confidenceBps",
  "evidenceRefs",
  "freshness",
  "state",
] as const
const FINDING_OPTIONAL_KEYS = ["range"] as const
const ADJUDICATION_REQUIRED_KEYS = [
  "version",
  "adjudicationIdentity",
  "findingIdentity",
  "previousAdjudicationIdentity",
  "action",
  "previousState",
  "resultingState",
  "adjudicatorId",
  "evidenceRefs",
] as const
const ADJUDICATION_OPTIONAL_KEYS = ["duplicateOf", "correctionRef", "reverificationRef"] as const
const REVISION_KEYS = ["repositoryId", "canonicalBase", "candidateHead"] as const
const LINK_KEYS = ["evidenceId", "evidenceKind", "sourceKind", "status", "codes", "sourceIdentity"] as const
const LINKAGE_KEYS = ["version", "packageIdentity", "revision", "links", "outOfScopeEvidenceIds", "sourceIdentities", "linkageIdentity"] as const

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
  const stack: SafeJsonFrame[] = [{ kind: "value", value, label, depth: 0 }]
  let nodes = 0
  let totalStringChars = 0

  while (stack.length !== 0) {
    const frame = stack.pop() as SafeJsonFrame
    if (frame.kind === "leave") {
      ancestors.delete(frame.value)
      continue
    }

    nodes += 1
    if (nodes > SAFE_JSON_MAX_NODES) bad(frame.label, `exceeds safe JSON node budget of ${SAFE_JSON_MAX_NODES}`)
    if (frame.depth > SAFE_JSON_MAX_DEPTH) bad(frame.label, `exceeds safe JSON nesting depth of ${SAFE_JSON_MAX_DEPTH}`)

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
        if (lengthDescriptor === undefined || !("value" in lengthDescriptor) || typeof lengthDescriptor.value !== "number") {
          bad(frame.label, "must have an ordinary length")
        }
        const length = lengthDescriptor.value
        if (!Number.isSafeInteger(length) || length < 0) bad(frame.label, "must have a safe array length")
        if (length > SAFE_JSON_MAX_NODES - nodes) bad(frame.label, `exceeds safe JSON node budget of ${SAFE_JSON_MAX_NODES}`)
        const ownNames = Object.getOwnPropertyNames(current)
        if (ownNames.length !== length + 1) bad(frame.label, "contains unexpected array fields")
        for (let index = length - 1; index >= 0; index -= 1) {
          const descriptor = Object.getOwnPropertyDescriptor(current, String(index))
          if (descriptor === undefined) bad(frame.label, "must be dense")
          if (!("value" in descriptor) || !descriptor.enumerable) {
            bad(`${frame.label}[${index}]`, "must be an enumerable data property")
          }
          stack.push({ kind: "value", value: descriptor.value, label: `${frame.label}[${index}]`, depth: frame.depth + 1 })
        }
      } else {
        const prototype = Object.getPrototypeOf(current)
        if (prototype !== Object.prototype && prototype !== null) bad(frame.label, "must be a plain object")
        if (Object.getOwnPropertySymbols(current).length !== 0) bad(frame.label, "must not contain symbol fields")
        const names = Object.getOwnPropertyNames(current)
        if (names.length > SAFE_JSON_MAX_NODES - nodes) bad(frame.label, `exceeds safe JSON node budget of ${SAFE_JSON_MAX_NODES}`)
        for (let index = names.length - 1; index >= 0; index -= 1) {
          const name = names[index] as string
          if (name.length > K5_R3_LIMITS.maxKriTextChars) bad(frame.label, "contains an overlong property name")
          validUnicodeScalars(name, `${frame.label} property name`)
          const descriptor = Object.getOwnPropertyDescriptor(current, name)
          if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) {
            bad(`${frame.label}.${name}`, "must be an enumerable data property")
          }
          stack.push({ kind: "value", value: descriptor.value, label: `${frame.label}.${name}`, depth: frame.depth + 1 })
        }
      }
      continue
    }

    if (typeof current === "string") {
      if (current.length > K5_R3_LIMITS.maxKriTextChars) bad(frame.label, "exceeds safe JSON string length")
      totalStringChars += current.length
      if (totalStringChars > SAFE_JSON_MAX_TOTAL_STRING_CHARS) {
        bad(frame.label, `exceeds safe JSON string budget of ${SAFE_JSON_MAX_TOTAL_STRING_CHARS} characters`)
      }
      validUnicodeScalars(current, frame.label)
      continue
    }
    if (typeof current === "number") {
      if (!Number.isSafeInteger(current) || Object.is(current, -0)) {
        bad(frame.label, "must be a non-negative-zero safe integer")
      }
      continue
    }
    if (current === null || typeof current === "boolean") continue
    bad(frame.label, "must contain only JSON data")
  }
}

function rec(
  value: unknown,
  required: readonly string[],
  optional: readonly string[],
  label: string,
): Rec {
  if (typeof value === "object" && value !== null && utilTypes.isProxy(value)) bad(label, "must not be a Proxy")
  if (value === null || typeof value !== "object" || Array.isArray(value)) bad(label, "must be a plain object")
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) bad(label, "must be a plain object")
  const names = Object.getOwnPropertyNames(value)
  const allowed = new Set([...required, ...optional])
  for (const name of names) {
    if (!allowed.has(name)) bad(label, `contains unknown field: ${name}`)
    const descriptor = Object.getOwnPropertyDescriptor(value, name)
    if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) {
      bad(`${label}.${name}`, "must be an enumerable data property")
    }
  }
  for (const name of required) if (!names.includes(name)) bad(label, `is missing required field: ${name}`)
  const out = Object.create(null) as Rec
  for (const name of names) out[name] = (Object.getOwnPropertyDescriptor(value, name) as PropertyDescriptor & { value: unknown }).value
  return out
}

function arr(value: unknown, label: string, min: number, max: number): readonly unknown[] {
  if (typeof value === "object" && value !== null && utilTypes.isProxy(value)) bad(label, "must not be a Proxy")
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) bad(label, "must be a plain array")
  const length = value.length
  if (!Number.isSafeInteger(length) || length < min || length > max) bad(label, `must contain ${min} through ${max} entries`)
  const result: unknown[] = []
  for (let index = 0; index < length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index))
    if (descriptor === undefined) bad(label, "must be dense")
    if (!("value" in descriptor) || !descriptor.enumerable) bad(`${label}[${index}]`, "must be an enumerable data property")
    result.push(descriptor.value)
  }
  if (Object.getOwnPropertyNames(value).length !== length + 1) bad(label, "contains unexpected array fields")
  return result
}

function outerText(value: unknown, label: string, maxBytes: number): string {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) bad(label, "must be a non-empty NUL-free string")
  validUnicodeScalars(value, label)
  if (Buffer.byteLength(value, "utf8") > maxBytes) bad(label, `exceeds ${maxBytes} UTF-8 bytes`)
  return value
}

function kriText(value: unknown, label: string, maxChars: number): string {
  if (typeof value !== "string" || value.length === 0 || value.length > maxChars) {
    bad(label, `must be a non-empty string <= ${maxChars} historical JavaScript chars`)
  }
  validUnicodeScalars(value, label)
  return value
}

function fixed<T extends string>(value: unknown, expected: T, label: string): T {
  if (value !== expected) bad(label, `must equal ${expected}`)
  return expected
}

function enumString<T extends string>(value: unknown, allowed: ReadonlySet<string>, label: string): T {
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

function safeInteger(value: unknown, label: string, min: number, max: number): number {
  if (
    typeof value !== "number"
    || !Number.isSafeInteger(value)
    || Object.is(value, -0)
    || value < min
    || value > max
  ) bad(label, `must be a safe integer from ${min} through ${max}`)
  return value
}

function compareKriStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function kriEvidenceRefs(value: unknown, label: string): readonly string[] {
  const parsed = arr(value, label, 1, K5_R3_LIMITS.maxKriRefs).map((item, index) =>
    kriText(item, `${label}[${index}]`, K5_R3_LIMITS.maxKriRefChars)
  )
  if (new Set(parsed).size !== parsed.length) bad(label, "must not contain duplicate references")
  return Object.freeze(parsed.slice().sort(compareKriStrings))
}

function kriCanonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(kriCanonicalize)
  if (typeof value === "object" && value !== null) {
    const record = value as Rec
    const ordered: Rec = {}
    for (const key of Object.keys(record).sort(compareKriStrings)) ordered[key] = kriCanonicalize(record[key])
    return ordered
  }
  return value
}

function kriIdentity(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(kriCanonicalize(value)), "utf8").digest("hex")
}

function jcs(value: unknown): string {
  if (value === null) return "null"
  if (typeof value === "boolean") return value ? "true" : "false"
  if (typeof value === "string") {
    validUnicodeScalars(value, "canonical string")
    return JSON.stringify(value)
  }
  if (typeof value === "number") {
    if (!Number.isSafeInteger(value) || Object.is(value, -0)) bad("canonical number", "must be a non-negative-zero safe integer")
    return JSON.stringify(value)
  }
  if (Array.isArray(value)) return `[${value.map(jcs).join(",")}]`
  if (typeof value !== "object" || value === null) bad("canonical value", "must be JSON data")
  const record = value as Rec
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${jcs(record[key])}`).join(",")}}`
}

function k5Identity(value: unknown): string {
  return createHash("sha256").update(jcs(value), "utf8").digest("hex")
}

function kriReview(value: unknown, label: string): K5R3KriReviewIdentity {
  const record = rec(value, REVIEW_KEYS, [], label)
  return Object.freeze({
    reviewRunId: kriText(record.reviewRunId, `${label}.reviewRunId`, K5_R3_LIMITS.maxKriShortChars),
    reviewerId: kriText(record.reviewerId, `${label}.reviewerId`, K5_R3_LIMITS.maxKriShortChars),
    reviewerVersion: kriText(record.reviewerVersion, `${label}.reviewerVersion`, K5_R3_LIMITS.maxKriShortChars),
    policyIdentity: kriText(record.policyIdentity, `${label}.policyIdentity`, K5_R3_LIMITS.maxKriShortChars),
    canonicalBase: sha40(record.canonicalBase, `${label}.canonicalBase`),
    reviewedHead: sha40(record.reviewedHead, `${label}.reviewedHead`),
  })
}

function kriRange(value: unknown, label: string): K5R3KriAffectedRange {
  const record = rec(value, RANGE_KEYS, [], label)
  const startLine = safeInteger(record.startLine, `${label}.startLine`, 1, K5_R3_LIMITS.maxKriLine)
  const endLine = safeInteger(record.endLine, `${label}.endLine`, startLine, K5_R3_LIMITS.maxKriLine)
  return Object.freeze({ startLine, endLine })
}

function kriPath(value: unknown, label: string): string {
  const path = kriText(value, label, K5_R3_LIMITS.maxKriPathChars)
  if (path.startsWith("/") || path.includes("\\") || path.includes("\0")) bad(label, "must be repository-relative POSIX text")
  const segments = path.split("/")
  if (segments.some((segment) => segment.length === 0 || segment === "." || segment === "..")) {
    bad(label, "must not contain empty, dot, or parent segments")
  }
  return path
}

function kriFinding(value: unknown, label: string): K5R3KriFindingRecord {
  const record = rec(value, FINDING_REQUIRED_KEYS, FINDING_OPTIONAL_KEYS, label)
  fixed(record.version, "kri-r2-finding-v1", `${label}.version`)
  const claimedIdentity = sha256(record.findingIdentity, `${label}.findingIdentity`)
  const review = kriReview(record.review, `${label}.review`)
  const evaluatedHead = sha40(record.evaluatedHead, `${label}.evaluatedHead`)
  if (evaluatedHead !== review.reviewedHead) bad(label, "must be CURRENT on the exact reviewed head")
  fixed(record.freshness, "CURRENT", `${label}.freshness`)
  fixed(record.state, "NEW", `${label}.state`)
  const severity = enumString<K5R3KriFindingRecord["severity"]>(record.severity, KRI_SEVERITIES, `${label}.severity`)
  const evidenceRefs = kriEvidenceRefs(record.evidenceRefs, `${label}.evidenceRefs`)
  const historical = Object.freeze({
    version: "kri-r2-finding-v1" as const,
    claimKey: kriText(record.claimKey, `${label}.claimKey`, K5_R3_LIMITS.maxKriShortChars),
    review,
    path: kriPath(record.path, `${label}.path`),
    ...(record.range === undefined ? {} : { range: kriRange(record.range, `${label}.range`) }),
    summary: kriText(record.summary, `${label}.summary`, K5_R3_LIMITS.maxKriTextChars),
    contractClaim: kriText(record.contractClaim, `${label}.contractClaim`, K5_R3_LIMITS.maxKriTextChars),
    category: kriText(record.category, `${label}.category`, K5_R3_LIMITS.maxKriShortChars),
    severity,
    confidenceBps: safeInteger(record.confidenceBps, `${label}.confidenceBps`, 0, 10_000),
    evidenceRefs,
  })
  const expectedIdentity = kriIdentity(historical)
  if (claimedIdentity !== expectedIdentity) bad(`${label}.findingIdentity`, "does not match canonical KRI-R2 finding content")
  return Object.freeze({
    ...historical,
    findingIdentity: expectedIdentity,
    evaluatedHead,
    freshness: "CURRENT" as const,
    state: "NEW" as const,
  })
}

function kriNextState(
  previousState: K5R3KriAdjudicationRecord["previousState"],
  action: K5R3KriAdjudicationRecord["action"],
): K5R3KriAdjudicationRecord["resultingState"] {
  if (previousState === "NEW") {
    if (action === "CONFIRM") return "CONFIRMED"
    if (action === "REJECT") return "REJECTED"
    if (action === "MARK_DUPLICATE") return "DUPLICATE"
  }
  if (previousState === "CONFIRMED" && action === "MARK_FIXED") return "FIXED"
  if (previousState === "FIXED" && action === "REVERIFY") return "REVERIFIED"
  bad("adjudication", `has invalid finding transition: ${previousState} -> ${action}`)
}

function kriAdjudication(value: unknown, label: string): K5R3KriAdjudicationRecord {
  const record = rec(value, ADJUDICATION_REQUIRED_KEYS, ADJUDICATION_OPTIONAL_KEYS, label)
  fixed(record.version, "kri-r2-adjudication-v1", `${label}.version`)
  const claimedIdentity = sha256(record.adjudicationIdentity, `${label}.adjudicationIdentity`)
  const action = enumString<K5R3KriAdjudicationRecord["action"]>(record.action, KRI_ACTIONS, `${label}.action`)
  const previousState = enumString<K5R3KriAdjudicationRecord["previousState"]>(
    record.previousState,
    KRI_PREVIOUS_STATES,
    `${label}.previousState`,
  )
  const resultingState = kriNextState(previousState, action)
  if (record.resultingState !== resultingState) bad(`${label}.resultingState`, "does not match the canonical KRI-R2 transition")
  const previousAdjudicationIdentity = record.previousAdjudicationIdentity === null
    ? null
    : sha256(record.previousAdjudicationIdentity, `${label}.previousAdjudicationIdentity`)
  if (previousState === "NEW" && previousAdjudicationIdentity !== null) {
    bad(`${label}.previousAdjudicationIdentity`, "must be null for NEW")
  }
  if (previousState !== "NEW" && previousAdjudicationIdentity === null) {
    bad(`${label}.previousAdjudicationIdentity`, "must be a SHA-256 identity for non-NEW")
  }

  const optional: {
    duplicateOf?: string
    correctionRef?: string
    reverificationRef?: string
  } = {}
  if (record.duplicateOf !== undefined) optional.duplicateOf = sha256(record.duplicateOf, `${label}.duplicateOf`)
  if (record.correctionRef !== undefined) {
    optional.correctionRef = kriText(record.correctionRef, `${label}.correctionRef`, K5_R3_LIMITS.maxKriRefChars)
  }
  if (record.reverificationRef !== undefined) {
    optional.reverificationRef = kriText(record.reverificationRef, `${label}.reverificationRef`, K5_R3_LIMITS.maxKriRefChars)
  }

  if (action === "CONFIRM" || action === "REJECT") {
    if (optional.duplicateOf !== undefined || optional.correctionRef !== undefined || optional.reverificationRef !== undefined) {
      bad(label, `${action} does not allow action-specific fields`)
    }
  } else if (action === "MARK_DUPLICATE") {
    if (optional.duplicateOf === undefined || optional.correctionRef !== undefined || optional.reverificationRef !== undefined) {
      bad(label, "MARK_DUPLICATE requires only duplicateOf")
    }
  } else if (action === "MARK_FIXED") {
    if (optional.correctionRef === undefined || optional.duplicateOf !== undefined || optional.reverificationRef !== undefined) {
      bad(label, "MARK_FIXED requires only correctionRef")
    }
  } else if (
    optional.reverificationRef === undefined
    || optional.duplicateOf !== undefined
    || optional.correctionRef !== undefined
  ) {
    bad(label, "REVERIFY requires only reverificationRef")
  }

  const normalized = Object.freeze({
    version: "kri-r2-adjudication-v1" as const,
    findingIdentity: sha256(record.findingIdentity, `${label}.findingIdentity`),
    previousAdjudicationIdentity,
    action,
    previousState,
    resultingState,
    adjudicatorId: kriText(record.adjudicatorId, `${label}.adjudicatorId`, K5_R3_LIMITS.maxKriShortChars),
    evidenceRefs: kriEvidenceRefs(record.evidenceRefs, `${label}.evidenceRefs`),
    ...optional,
  })
  const expectedIdentity = kriIdentity(normalized)
  if (claimedIdentity !== expectedIdentity) {
    bad(`${label}.adjudicationIdentity`, "does not match canonical KRI-R2 adjudication content")
  }
  return Object.freeze({ ...normalized, adjudicationIdentity: expectedIdentity })
}

function sourceParts(value: unknown, keys: readonly string[], label: string) {
  assertSafeJson(value, label)
  const record = rec(value, keys, [], label)
  const finding = kriFinding(record.finding, `${label}.finding`)
  const adjudication = kriAdjudication(record.adjudication, `${label}.adjudication`)
  if (adjudication.findingIdentity !== finding.findingIdentity) {
    bad(`${label}.adjudication.findingIdentity`, "must equal the embedded finding identity")
  }
  const canonicalBase = sha40(record.canonicalBase, `${label}.canonicalBase`)
  const candidateHead = sha40(record.candidateHead, `${label}.candidateHead`)
  if (canonicalBase !== finding.review.canonicalBase) bad(`${label}.canonicalBase`, "must equal finding.review.canonicalBase")
  if (candidateHead !== finding.evaluatedHead || candidateHead !== finding.review.reviewedHead) {
    bad(`${label}.candidateHead`, "must equal the embedded exact reviewed head")
  }
  const sourceDigest = sha256(record.sourceDigest, `${label}.sourceDigest`)
  if (sourceDigest !== adjudication.adjudicationIdentity) {
    bad(`${label}.sourceDigest`, "must equal adjudication.adjudicationIdentity")
  }
  return {
    record,
    evidenceId: outerText(record.evidenceId, `${label}.evidenceId`, K5_R3_LIMITS.maxEvidenceIdBytes),
    sourceKind: fixed(record.sourceKind, "KRI_ADJUDICATION", `${label}.sourceKind`),
    canonicalBase,
    candidateHead,
    sourceRef: outerText(record.sourceRef, `${label}.sourceRef`, K5_R3_LIMITS.maxSourceRefBytes),
    sourceDigest,
    finding,
    adjudication,
  }
}

function sourcePreimage(parts: ReturnType<typeof sourceParts>) {
  return Object.freeze({
    version: K5_R3_REVIEW_ADJUDICATION_SOURCE_VERSION,
    evidenceId: parts.evidenceId,
    sourceKind: parts.sourceKind,
    canonicalBase: parts.canonicalBase,
    candidateHead: parts.candidateHead,
    sourceRef: parts.sourceRef,
    sourceDigest: parts.sourceDigest,
    finding: parts.finding,
    adjudication: parts.adjudication,
  })
}

function frozenSource(parts: ReturnType<typeof sourceParts>, sourceIdentity: string): K5R3ReviewAdjudicationSource {
  return Object.freeze({
    version: K5_R3_REVIEW_ADJUDICATION_SOURCE_VERSION,
    sourceIdentity,
    evidenceId: parts.evidenceId,
    sourceKind: parts.sourceKind,
    canonicalBase: parts.canonicalBase,
    candidateHead: parts.candidateHead,
    sourceRef: parts.sourceRef,
    sourceDigest: parts.sourceDigest,
    finding: parts.finding,
    adjudication: parts.adjudication,
  })
}

export function createK5R3ReviewAdjudicationSource(
  input: K5R3ReviewAdjudicationSourceInput,
): K5R3ReviewAdjudicationSource {
  const parts = sourceParts(input, SOURCE_INPUT_KEYS, "reviewAdjudicationSourceInput")
  return frozenSource(parts, k5Identity(sourcePreimage(parts)))
}

export function validateK5R3ReviewAdjudicationSource(value: unknown): K5R3ReviewAdjudicationSource {
  const parts = sourceParts(value, SOURCE_KEYS, "reviewAdjudicationSource")
  fixed(parts.record.version, K5_R3_REVIEW_ADJUDICATION_SOURCE_VERSION, "reviewAdjudicationSource.version")
  const claimedIdentity = sha256(parts.record.sourceIdentity, "reviewAdjudicationSource.sourceIdentity")
  const expectedIdentity = k5Identity(sourcePreimage(parts))
  if (claimedIdentity !== expectedIdentity) {
    bad("reviewAdjudicationSource.sourceIdentity", "does not match canonical source content")
  }
  return frozenSource(parts, expectedIdentity)
}

function revision(value: unknown, label: string): K5R1Revision {
  const record = rec(value, REVISION_KEYS, [], label)
  return Object.freeze({
    repositoryId: outerText(record.repositoryId, `${label}.repositoryId`, K5_R3_LIMITS.maxRepositoryIdBytes),
    canonicalBase: sha40(record.canonicalBase, `${label}.canonicalBase`),
    candidateHead: sha40(record.candidateHead, `${label}.candidateHead`),
  })
}

function linkCodes(value: unknown, label: string): readonly K5R3LinkCode[] {
  const parsed = arr(value, label, 0, K5_R3_LINK_CODES.length).map((item, index) =>
    enumString<K5R3LinkCode>(item, LINK_CODES, `${label}[${index}]`)
  )
  if (new Set(parsed).size !== parsed.length) bad(label, "must not contain duplicate codes")
  const sorted = parsed.slice().sort((left, right) =>
    (LINK_RANK.get(left) as number) - (LINK_RANK.get(right) as number)
  )
  if (parsed.some((code, index) => code !== sorted[index])) bad(label, "must be sorted by fixed code rank")
  return Object.freeze(parsed)
}

function link(value: unknown, label: string): K5R3ReviewAdjudicationLinkResult {
  const record = rec(value, LINK_KEYS, [], label)
  const evidenceId = outerText(record.evidenceId, `${label}.evidenceId`, K5_R3_LIMITS.maxEvidenceIdBytes)
  fixed(record.evidenceKind, "REVIEW_ADJUDICATION", `${label}.evidenceKind`)
  const status = enumString<K5R3LinkStatus>(record.status, LINK_STATUSES, `${label}.status`)
  const codes = linkCodes(record.codes, `${label}.codes`)
  const sourceKind = record.sourceKind === null
    ? null
    : fixed(record.sourceKind, "KRI_ADJUDICATION", `${label}.sourceKind`)
  const sourceIdentity = record.sourceIdentity === null
    ? null
    : sha256(record.sourceIdentity, `${label}.sourceIdentity`)

  if (
    status === "UNLINKED"
    && (sourceKind !== null || sourceIdentity !== null || codes.length !== 1 || codes[0] !== "NO_SOURCE")
  ) bad(label, "UNLINKED requires null source fields and exactly NO_SOURCE")
  if (
    status === "LINKED"
    && (sourceKind !== "KRI_ADJUDICATION" || sourceIdentity === null || codes.length !== 0)
  ) bad(label, "LINKED requires KRI_ADJUDICATION, source identity, and no codes")
  if (
    status === "MISMATCH"
    && (
      sourceKind !== "KRI_ADJUDICATION"
      || sourceIdentity === null
      || codes.length === 0
      || codes.includes("NO_SOURCE")
    )
  ) bad(label, "MISMATCH requires a source and one or more non-NO_SOURCE codes")

  return Object.freeze({
    evidenceId,
    evidenceKind: "REVIEW_ADJUDICATION" as const,
    sourceKind,
    status,
    codes,
    sourceIdentity,
  })
}

function links(value: unknown): readonly K5R3ReviewAdjudicationLinkResult[] {
  const parsed = arr(value, "reviewAdjudicationLinkage.links", 0, K5_R3_LIMITS.maxSources).map((item, index) =>
    link(item, `reviewAdjudicationLinkage.links[${index}]`)
  )
  const ids = parsed.map((item) => item.evidenceId)
  if (new Set(ids).size !== ids.length) bad("reviewAdjudicationLinkage.links", "contains duplicate evidenceId values")
  const sorted = parsed.slice().sort((left, right) => compareK5R1ScalarStrings(left.evidenceId, right.evidenceId))
  if (parsed.some((item, index) => item.evidenceId !== sorted[index]?.evidenceId)) {
    bad("reviewAdjudicationLinkage.links", "must be canonically sorted")
  }
  return Object.freeze(parsed)
}

function canonicalStrings(
  value: unknown,
  label: string,
  shaOnly = false,
): readonly string[] {
  const parsed = arr(value, label, 0, K5_R3_LIMITS.maxSources).map((item, index) =>
    shaOnly
      ? sha256(item, `${label}[${index}]`)
      : outerText(item, `${label}[${index}]`, K5_R3_LIMITS.maxEvidenceIdBytes)
  )
  if (new Set(parsed).size !== parsed.length) bad(label, "must not contain duplicates")
  const sorted = parsed.slice().sort(compareK5R1ScalarStrings)
  if (parsed.some((item, index) => item !== sorted[index])) bad(label, "must be canonically sorted")
  return Object.freeze(parsed)
}

function linkagePreimage(
  packageIdentity: string,
  rev: K5R1Revision,
  normalizedLinks: readonly K5R3ReviewAdjudicationLinkResult[],
  outOfScopeEvidenceIds: readonly string[],
  sourceIdentities: readonly string[],
) {
  return Object.freeze({
    version: K5_R3_REVIEW_ADJUDICATION_LINKAGE_VERSION,
    packageIdentity,
    revision: rev,
    links: normalizedLinks,
    outOfScopeEvidenceIds,
    sourceIdentities,
  })
}

export function validateK5R3ReviewAdjudicationLinkage(value: unknown): K5R3ReviewAdjudicationLinkage {
  assertSafeJson(value, "reviewAdjudicationLinkage")
  const record = rec(value, LINKAGE_KEYS, [], "reviewAdjudicationLinkage")
  fixed(record.version, K5_R3_REVIEW_ADJUDICATION_LINKAGE_VERSION, "reviewAdjudicationLinkage.version")
  const packageIdentity = sha256(record.packageIdentity, "reviewAdjudicationLinkage.packageIdentity")
  const rev = revision(record.revision, "reviewAdjudicationLinkage.revision")
  const normalizedLinks = links(record.links)
  const outOfScopeEvidenceIds = canonicalStrings(
    record.outOfScopeEvidenceIds,
    "reviewAdjudicationLinkage.outOfScopeEvidenceIds",
  )
  const sourceIdentities = canonicalStrings(
    record.sourceIdentities,
    "reviewAdjudicationLinkage.sourceIdentities",
    true,
  )

  const linkedIds = new Set(normalizedLinks.map((item) => item.evidenceId))
  if (outOfScopeEvidenceIds.some((id) => linkedIds.has(id))) {
    bad("reviewAdjudicationLinkage.outOfScopeEvidenceIds", "must be disjoint from links")
  }
  const usedSourceIdentities = [...new Set(
    normalizedLinks
      .map((item) => item.sourceIdentity)
      .filter((identity): identity is string => identity !== null),
  )].sort(compareK5R1ScalarStrings)
  if (
    usedSourceIdentities.length !== sourceIdentities.length
    || usedSourceIdentities.some((identity, index) => identity !== sourceIdentities[index])
  ) bad("reviewAdjudicationLinkage.sourceIdentities", "must equal the canonical set of linked source identities")

  const claimedIdentity = sha256(record.linkageIdentity, "reviewAdjudicationLinkage.linkageIdentity")
  const expectedIdentity = k5Identity(linkagePreimage(
    packageIdentity,
    rev,
    normalizedLinks,
    outOfScopeEvidenceIds,
    sourceIdentities,
  ))
  if (claimedIdentity !== expectedIdentity) {
    bad("reviewAdjudicationLinkage.linkageIdentity", "does not match canonical linkage content")
  }

  return Object.freeze({
    version: K5_R3_REVIEW_ADJUDICATION_LINKAGE_VERSION,
    packageIdentity,
    revision: rev,
    links: normalizedLinks,
    outOfScopeEvidenceIds,
    sourceIdentities,
    linkageIdentity: expectedIdentity,
  })
}
