import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

export const K5_R1_PROOF_PACKAGE_VERSION = "kodac-k5-r1-proof-package-v1" as const
export const K5_R1_PROOF_JUDGMENT_VERSION = "kodac-k5-r1-proof-judgment-v1" as const

export const K5_R1_SUBJECT_KINDS = Object.freeze(["TASK", "CHANGESET", "VERIFICATION"] as const)
export const K5_R1_EVIDENCE_KINDS = Object.freeze([
  "VERIFICATION",
  "EXECUTION_RECEIPT",
  "REPOSITORY_STATE",
  "REVIEW_ADJUDICATION",
  "ARTIFACT",
  "CUSTOM",
] as const)
export const K5_R1_EVIDENCE_STATUSES = Object.freeze([
  "SATISFIED",
  "FAILED",
  "STALE",
  "CONTRADICTORY",
  "INVALID",
] as const)
export const K5_R1_REQUIREMENT_STATUSES = Object.freeze([
  "INVALID",
  "STALE",
  "CONTRADICTORY",
  "INSUFFICIENT",
  "SATISFIED",
] as const)
export const K5_R1_PACKAGE_STATUSES = Object.freeze([
  "INVALID_PACKAGE",
  "STALE_PACKAGE",
  "CONTRADICTORY_PACKAGE",
  "INSUFFICIENT_PACKAGE",
  "SUFFICIENT_PACKAGE",
] as const)
export const K5_R1_REASON_CODES = Object.freeze([
  "EXPLICIT_INVALID",
  "KIND_MISMATCH",
  "REVISION_MISMATCH",
  "EXPLICIT_STALE",
  "EXPLICIT_CONTRADICTORY",
  "SATISFIED_FAILED_CONFLICT",
  "FINGERPRINT_STATUS_CONFLICT",
  "EXPLICIT_FAILED",
  "BELOW_MINIMUM",
] as const)

export const K5_R1_LIMITS = Object.freeze({
  maxRequirements: 128,
  maxEvidence: 4_096,
  maxRequirementRefsPerEvidence: 16,
  maxMinimumEvidence: 16,
  maxSubjectIdBytes: 256,
  maxRepositoryIdBytes: 512,
  maxRequirementIdBytes: 128,
  maxEvidenceIdBytes: 128,
  maxRefBytes: 1_024,
} as const)

export type K5R1SubjectKind = typeof K5_R1_SUBJECT_KINDS[number]
export type K5R1EvidenceKind = typeof K5_R1_EVIDENCE_KINDS[number]
export type K5R1EvidenceStatus = typeof K5_R1_EVIDENCE_STATUSES[number]
export type K5R1RequirementStatus = typeof K5_R1_REQUIREMENT_STATUSES[number]
export type K5R1PackageStatus = typeof K5_R1_PACKAGE_STATUSES[number]
export type K5R1ReasonCode = typeof K5_R1_REASON_CODES[number]

export interface K5R1ProofSubject {
  readonly subjectId: string
  readonly subjectKind: K5R1SubjectKind
}

export interface K5R1Revision {
  readonly repositoryId: string
  readonly canonicalBase: string
  readonly candidateHead: string
}

export interface K5R1ProofRequirement {
  readonly requirementId: string
  readonly kind: K5R1EvidenceKind
  readonly minimumEvidence: number
}

export interface K5R1EvidenceRecord {
  readonly evidenceId: string
  readonly kind: K5R1EvidenceKind
  readonly requirementIds: readonly string[]
  readonly canonicalBase: string
  readonly candidateHead: string
  readonly ref: string
  readonly digest: string
  readonly status: K5R1EvidenceStatus
}

export interface K5R1ProofPackage {
  readonly version: typeof K5_R1_PROOF_PACKAGE_VERSION
  readonly packageIdentity: string
  readonly subject: K5R1ProofSubject
  readonly revision: K5R1Revision
  readonly requirements: readonly K5R1ProofRequirement[]
  readonly evidence: readonly K5R1EvidenceRecord[]
}

export interface K5R1ProofPackageInput {
  readonly subject: K5R1ProofSubject
  readonly revision: K5R1Revision
  readonly requirements: readonly K5R1ProofRequirement[]
  readonly evidence: readonly K5R1EvidenceRecord[]
}

export interface K5R1RequirementResult {
  readonly requirementId: string
  readonly kind: K5R1EvidenceKind
  readonly minimumEvidence: number
  readonly satisfiedFingerprintCount: number
  readonly status: K5R1RequirementStatus
}

export interface K5R1Reason {
  readonly requirementId: string
  readonly status: Exclude<K5R1RequirementStatus, "SATISFIED">
  readonly codes: readonly K5R1ReasonCode[]
  readonly evidenceIds: readonly string[]
}

export interface K5R1ProofJudgment {
  readonly version: typeof K5_R1_PROOF_JUDGMENT_VERSION
  readonly packageIdentity: string
  readonly status: K5R1PackageStatus
  readonly reasons: readonly K5R1Reason[]
  readonly requirementResults: readonly K5R1RequirementResult[]
  readonly evidenceIds: readonly string[]
  readonly judgmentIdentity: string
}

type UnknownRecord = Record<string, unknown>

const GIT_SHA = /^[0-9a-f]{40}$/
const SHA256 = /^[0-9a-f]{64}$/
const SUBJECT_KIND_SET = new Set<string>(K5_R1_SUBJECT_KINDS)
const EVIDENCE_KIND_SET = new Set<string>(K5_R1_EVIDENCE_KINDS)
const EVIDENCE_STATUS_SET = new Set<string>(K5_R1_EVIDENCE_STATUSES)
const REQUIREMENT_STATUS_SET = new Set<string>(K5_R1_REQUIREMENT_STATUSES)
const PACKAGE_STATUS_SET = new Set<string>(K5_R1_PACKAGE_STATUSES)
const REASON_CODE_SET = new Set<string>(K5_R1_REASON_CODES)
const REASON_CODE_RANK = new Map<string, number>(K5_R1_REASON_CODES.map((code, index) => [code, index]))

const PACKAGE_KEYS = ["version", "packageIdentity", "subject", "revision", "requirements", "evidence"] as const
const SUBJECT_KEYS = ["subjectId", "subjectKind"] as const
const REVISION_KEYS = ["repositoryId", "canonicalBase", "candidateHead"] as const
const REQUIREMENT_KEYS = ["requirementId", "kind", "minimumEvidence"] as const
const EVIDENCE_KEYS = [
  "evidenceId",
  "kind",
  "requirementIds",
  "canonicalBase",
  "candidateHead",
  "ref",
  "digest",
  "status",
] as const
const JUDGMENT_KEYS = [
  "version",
  "packageIdentity",
  "status",
  "reasons",
  "requirementResults",
  "evidenceIds",
  "judgmentIdentity",
] as const
const REQUIREMENT_RESULT_KEYS = [
  "requirementId",
  "kind",
  "minimumEvidence",
  "satisfiedFingerprintCount",
  "status",
] as const
const REASON_KEYS = ["requirementId", "status", "codes", "evidenceIds"] as const

function invalid(label: string, detail: string): never {
  throw new TypeError(`${label} ${detail}`)
}

function assertNoProxy(value: unknown, label: string): void {
  if (typeof value === "object" && value !== null && utilTypes.isProxy(value)) {
    invalid(label, "must not be a Proxy")
  }
}

function plainRecord(value: unknown, keys: readonly string[], label: string): UnknownRecord {
  assertNoProxy(value, label)
  if (value === null || typeof value !== "object" || Array.isArray(value)) invalid(label, "must be a plain object")
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) invalid(label, "must be a plain object")
  if (Object.getOwnPropertySymbols(value).length !== 0) invalid(label, "must not contain symbol fields")
  const descriptors = Object.getOwnPropertyDescriptors(value)
  const actual = Object.keys(descriptors)
  if (actual.length !== keys.length) invalid(label, "has an invalid key set")
  const allowed = new Set(keys)
  for (const key of actual) {
    if (!allowed.has(key)) invalid(label, `contains unknown field: ${key}`)
    const descriptor = descriptors[key]
    if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) {
      invalid(`${label}.${key}`, "must be an enumerable data property")
    }
  }
  for (const key of keys) {
    if (!Object.hasOwn(descriptors, key)) invalid(label, `is missing required field: ${key}`)
  }
  const result = Object.create(null) as UnknownRecord
  for (const key of keys) result[key] = (descriptors[key] as PropertyDescriptor & { value: unknown }).value
  return result
}

function denseArray(value: unknown, label: string, min: number, max: number): readonly unknown[] {
  assertNoProxy(value, label)
  if (!Array.isArray(value)) invalid(label, "must be an array")
  if (Object.getPrototypeOf(value) !== Array.prototype) invalid(label, "must be a plain array")
  if (Object.getOwnPropertySymbols(value).length !== 0) invalid(label, "must not contain symbol fields")
  const descriptors = Object.getOwnPropertyDescriptors(value)
  const lengthDescriptor = descriptors.length
  if (
    lengthDescriptor === undefined ||
    !("value" in lengthDescriptor) ||
    !Number.isSafeInteger(lengthDescriptor.value) ||
    lengthDescriptor.value < min ||
    lengthDescriptor.value > max
  ) {
    invalid(label, `must contain ${min} through ${max} entries`)
  }
  const length = lengthDescriptor.value as number
  const expected = new Set(["length", ...Array.from({ length }, (_, index) => String(index))])
  for (const [key, descriptor] of Object.entries(descriptors)) {
    if (!expected.has(key)) invalid(label, `contains unexpected array field: ${key}`)
    if (key !== "length" && (!("value" in descriptor) || !descriptor.enumerable)) {
      invalid(`${label}[${key}]`, "must be an enumerable data property")
    }
  }
  const result: unknown[] = []
  for (let index = 0; index < length; index += 1) {
    const descriptor = descriptors[String(index)]
    if (descriptor === undefined || !("value" in descriptor)) invalid(label, "must be dense")
    result.push(descriptor.value)
  }
  return result
}

function validUnicodeScalars(value: string, label: string): void {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index)
    if (code >= 0xd800 && code <= 0xdbff) {
      if (index + 1 >= value.length) invalid(label, "must contain only valid Unicode scalar values")
      const next = value.charCodeAt(index + 1)
      if (next < 0xdc00 || next > 0xdfff) invalid(label, "must contain only valid Unicode scalar values")
      index += 1
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      invalid(label, "must contain only valid Unicode scalar values")
    }
  }
}

function boundedString(value: unknown, label: string, maxBytes: number): string {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) {
    invalid(label, "must be a non-empty NUL-free string")
  }
  validUnicodeScalars(value, label)
  if (Buffer.byteLength(value, "utf8") > maxBytes) invalid(label, `exceeds ${maxBytes} UTF-8 bytes`)
  return value
}

function fixedString(value: unknown, expected: string, label: string): typeof expected {
  if (value !== expected) invalid(label, `must equal ${expected}`)
  return expected
}

function enumString<T extends string>(value: unknown, allowed: ReadonlySet<string>, label: string): T {
  if (typeof value !== "string" || !allowed.has(value)) invalid(label, "is unsupported")
  return value as T
}

function gitSha(value: unknown, label: string): string {
  if (typeof value !== "string" || !GIT_SHA.test(value)) invalid(label, "must be 40 lowercase hexadecimal characters")
  return value
}

function sha256String(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) invalid(label, "must be 64 lowercase hexadecimal characters")
  return value
}

function safeInteger(value: unknown, label: string, min: number, max: number): number {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    Object.is(value, -0) ||
    value < min ||
    value > max
  ) {
    invalid(label, `must be a safe integer from ${min} through ${max}`)
  }
  return value
}

export function compareK5R1ScalarStrings(left: string, right: string): number {
  const leftIterator = left[Symbol.iterator]()
  const rightIterator = right[Symbol.iterator]()
  while (true) {
    const l = leftIterator.next()
    const r = rightIterator.next()
    if (l.done || r.done) {
      if (l.done && r.done) return 0
      return l.done ? -1 : 1
    }
    const leftCode = l.value.codePointAt(0) as number
    const rightCode = r.value.codePointAt(0) as number
    if (leftCode !== rightCode) return leftCode < rightCode ? -1 : 1
  }
}

function uniqueSortedStrings(values: readonly unknown[], label: string, maxBytes: number): readonly string[] {
  const parsed = values.map((value, index) => boundedString(value, `${label}[${index}]`, maxBytes))
  if (new Set(parsed).size !== parsed.length) invalid(label, "must not contain duplicates")
  return Object.freeze(parsed.slice().sort(compareK5R1ScalarStrings))
}

function jcsCompareKeys(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function jcs(value: unknown): string {
  if (value === null) return "null"
  if (typeof value === "boolean") return value ? "true" : "false"
  if (typeof value === "string") {
    validUnicodeScalars(value, "canonical string")
    return JSON.stringify(value)
  }
  if (typeof value === "number") {
    if (!Number.isSafeInteger(value) || Object.is(value, -0)) invalid("canonical number", "must be a non-negative-zero safe integer")
    return JSON.stringify(value)
  }
  if (Array.isArray(value)) return `[${value.map(jcs).join(",")}]`
  if (typeof value !== "object" || value === null) invalid("canonical value", "must be JSON data")
  const record = value as UnknownRecord
  return `{${Object.keys(record)
    .sort(jcsCompareKeys)
    .map((key) => `${JSON.stringify(key)}:${jcs(record[key])}`)
    .join(",")}}`
}

function digestIdentity(value: unknown): string {
  return createHash("sha256").update(jcs(value), "utf8").digest("hex")
}

function parseSubject(value: unknown, label: string): K5R1ProofSubject {
  const record = plainRecord(value, SUBJECT_KEYS, label)
  return Object.freeze({
    subjectId: boundedString(record.subjectId, `${label}.subjectId`, K5_R1_LIMITS.maxSubjectIdBytes),
    subjectKind: enumString<K5R1SubjectKind>(record.subjectKind, SUBJECT_KIND_SET, `${label}.subjectKind`),
  })
}

function parseRevision(value: unknown, label: string): K5R1Revision {
  const record = plainRecord(value, REVISION_KEYS, label)
  return Object.freeze({
    repositoryId: boundedString(record.repositoryId, `${label}.repositoryId`, K5_R1_LIMITS.maxRepositoryIdBytes),
    canonicalBase: gitSha(record.canonicalBase, `${label}.canonicalBase`),
    candidateHead: gitSha(record.candidateHead, `${label}.candidateHead`),
  })
}

function parseRequirements(value: unknown, label: string): readonly K5R1ProofRequirement[] {
  const values = denseArray(value, label, 1, K5_R1_LIMITS.maxRequirements)
  const parsed = values.map((item, index) => {
    const itemLabel = `${label}[${index}]`
    const record = plainRecord(item, REQUIREMENT_KEYS, itemLabel)
    return Object.freeze({
      requirementId: boundedString(record.requirementId, `${itemLabel}.requirementId`, K5_R1_LIMITS.maxRequirementIdBytes),
      kind: enumString<K5R1EvidenceKind>(record.kind, EVIDENCE_KIND_SET, `${itemLabel}.kind`),
      minimumEvidence: safeInteger(record.minimumEvidence, `${itemLabel}.minimumEvidence`, 1, K5_R1_LIMITS.maxMinimumEvidence),
    })
  })
  const ids = parsed.map((item) => item.requirementId)
  if (new Set(ids).size !== ids.length) invalid(label, "contains duplicate requirementId values")
  return Object.freeze(parsed.slice().sort((a, b) => compareK5R1ScalarStrings(a.requirementId, b.requirementId)))
}

function parseEvidence(
  value: unknown,
  label: string,
  requirementIds: ReadonlySet<string>,
): readonly K5R1EvidenceRecord[] {
  const values = denseArray(value, label, 0, K5_R1_LIMITS.maxEvidence)
  const parsed = values.map((item, index) => {
    const itemLabel = `${label}[${index}]`
    const record = plainRecord(item, EVIDENCE_KEYS, itemLabel)
    const requirementRefs = denseArray(
      record.requirementIds,
      `${itemLabel}.requirementIds`,
      1,
      K5_R1_LIMITS.maxRequirementRefsPerEvidence,
    )
    const normalizedRequirementIds = uniqueSortedStrings(
      requirementRefs,
      `${itemLabel}.requirementIds`,
      K5_R1_LIMITS.maxRequirementIdBytes,
    )
    for (const requirementId of normalizedRequirementIds) {
      if (!requirementIds.has(requirementId)) invalid(`${itemLabel}.requirementIds`, `references unknown requirement: ${requirementId}`)
    }
    return Object.freeze({
      evidenceId: boundedString(record.evidenceId, `${itemLabel}.evidenceId`, K5_R1_LIMITS.maxEvidenceIdBytes),
      kind: enumString<K5R1EvidenceKind>(record.kind, EVIDENCE_KIND_SET, `${itemLabel}.kind`),
      requirementIds: normalizedRequirementIds,
      canonicalBase: gitSha(record.canonicalBase, `${itemLabel}.canonicalBase`),
      candidateHead: gitSha(record.candidateHead, `${itemLabel}.candidateHead`),
      ref: boundedString(record.ref, `${itemLabel}.ref`, K5_R1_LIMITS.maxRefBytes),
      digest: sha256String(record.digest, `${itemLabel}.digest`),
      status: enumString<K5R1EvidenceStatus>(record.status, EVIDENCE_STATUS_SET, `${itemLabel}.status`),
    })
  })
  const ids = parsed.map((item) => item.evidenceId)
  if (new Set(ids).size !== ids.length) invalid(label, "contains duplicate evidenceId values")
  return Object.freeze(parsed.slice().sort((a, b) => compareK5R1ScalarStrings(a.evidenceId, b.evidenceId)))
}

function packagePreimage(
  subject: K5R1ProofSubject,
  revision: K5R1Revision,
  requirements: readonly K5R1ProofRequirement[],
  evidence: readonly K5R1EvidenceRecord[],
): Readonly<Record<string, unknown>> {
  return Object.freeze({
    version: K5_R1_PROOF_PACKAGE_VERSION,
    subject,
    revision,
    requirements,
    evidence,
  })
}

function normalizePackageParts(input: K5R1ProofPackageInput): {
  subject: K5R1ProofSubject
  revision: K5R1Revision
  requirements: readonly K5R1ProofRequirement[]
  evidence: readonly K5R1EvidenceRecord[]
} {
  const inputRecord = plainRecord(input, ["subject", "revision", "requirements", "evidence"], "proofPackageInput")
  const subject = parseSubject(inputRecord.subject, "proofPackageInput.subject")
  const revision = parseRevision(inputRecord.revision, "proofPackageInput.revision")
  const requirements = parseRequirements(inputRecord.requirements, "proofPackageInput.requirements")
  const requirementIds = new Set(requirements.map((item) => item.requirementId))
  const evidence = parseEvidence(inputRecord.evidence, "proofPackageInput.evidence", requirementIds)
  return { subject, revision, requirements, evidence }
}

export function createK5R1ProofPackage(input: K5R1ProofPackageInput): K5R1ProofPackage {
  const { subject, revision, requirements, evidence } = normalizePackageParts(input)
  const packageIdentity = digestIdentity(packagePreimage(subject, revision, requirements, evidence))
  return Object.freeze({
    version: K5_R1_PROOF_PACKAGE_VERSION,
    packageIdentity,
    subject,
    revision,
    requirements,
    evidence,
  })
}

export function validateK5R1ProofPackage(value: unknown): K5R1ProofPackage {
  const record = plainRecord(value, PACKAGE_KEYS, "proofPackage")
  fixedString(record.version, K5_R1_PROOF_PACKAGE_VERSION, "proofPackage.version")
  const claimedIdentity = sha256String(record.packageIdentity, "proofPackage.packageIdentity")
  const subject = parseSubject(record.subject, "proofPackage.subject")
  const revision = parseRevision(record.revision, "proofPackage.revision")
  const requirements = parseRequirements(record.requirements, "proofPackage.requirements")
  const requirementIds = new Set(requirements.map((item) => item.requirementId))
  const evidence = parseEvidence(record.evidence, "proofPackage.evidence", requirementIds)
  const expectedIdentity = digestIdentity(packagePreimage(subject, revision, requirements, evidence))
  if (claimedIdentity !== expectedIdentity) invalid("proofPackage.packageIdentity", "does not match canonical package content")
  return Object.freeze({
    version: K5_R1_PROOF_PACKAGE_VERSION,
    packageIdentity: expectedIdentity,
    subject,
    revision,
    requirements,
    evidence,
  })
}

export function k5R1EvidenceFingerprint(evidence: K5R1EvidenceRecord): string {
  return digestIdentity(Object.freeze({
    kind: evidence.kind,
    canonicalBase: evidence.canonicalBase,
    candidateHead: evidence.candidateHead,
    ref: evidence.ref,
    digest: evidence.digest,
  }))
}

function parseRequirementResults(value: unknown): readonly K5R1RequirementResult[] {
  const values = denseArray(value, "proofJudgment.requirementResults", 1, K5_R1_LIMITS.maxRequirements)
  const parsed = values.map((item, index) => {
    const label = `proofJudgment.requirementResults[${index}]`
    const record = plainRecord(item, REQUIREMENT_RESULT_KEYS, label)
    return Object.freeze({
      requirementId: boundedString(record.requirementId, `${label}.requirementId`, K5_R1_LIMITS.maxRequirementIdBytes),
      kind: enumString<K5R1EvidenceKind>(record.kind, EVIDENCE_KIND_SET, `${label}.kind`),
      minimumEvidence: safeInteger(record.minimumEvidence, `${label}.minimumEvidence`, 1, K5_R1_LIMITS.maxMinimumEvidence),
      satisfiedFingerprintCount: safeInteger(record.satisfiedFingerprintCount, `${label}.satisfiedFingerprintCount`, 0, K5_R1_LIMITS.maxEvidence),
      status: enumString<K5R1RequirementStatus>(record.status, REQUIREMENT_STATUS_SET, `${label}.status`),
    })
  })
  const ids = parsed.map((item) => item.requirementId)
  if (new Set(ids).size !== ids.length) invalid("proofJudgment.requirementResults", "contains duplicate requirementId values")
  const sorted = parsed.slice().sort((a, b) => compareK5R1ScalarStrings(a.requirementId, b.requirementId))
  if (parsed.some((item, index) => item.requirementId !== sorted[index]?.requirementId)) {
    invalid("proofJudgment.requirementResults", "must be canonically sorted")
  }
  return Object.freeze(parsed)
}

function parseReasons(
  value: unknown,
  requirementResults: readonly K5R1RequirementResult[],
): readonly K5R1Reason[] {
  const values = denseArray(value, "proofJudgment.reasons", 0, K5_R1_LIMITS.maxRequirements)
  const resultById = new Map(requirementResults.map((result) => [result.requirementId, result]))
  const parsed = values.map((item, index) => {
    const label = `proofJudgment.reasons[${index}]`
    const record = plainRecord(item, REASON_KEYS, label)
    const requirementId = boundedString(record.requirementId, `${label}.requirementId`, K5_R1_LIMITS.maxRequirementIdBytes)
    const result = resultById.get(requirementId)
    if (result === undefined) invalid(`${label}.requirementId`, "does not identify a requirement result")
    const status = enumString<K5R1RequirementStatus>(record.status, REQUIREMENT_STATUS_SET, `${label}.status`)
    if (status === "SATISFIED") invalid(`${label}.status`, "must not be SATISFIED")
    if (status !== result.status) invalid(`${label}.status`, "must equal the requirement result status")
    const codeValues = denseArray(record.codes, `${label}.codes`, 1, K5_R1_REASON_CODES.length)
    const codes = codeValues.map((code, codeIndex) =>
      enumString<K5R1ReasonCode>(code, REASON_CODE_SET, `${label}.codes[${codeIndex}]`)
    )
    if (new Set(codes).size !== codes.length) invalid(`${label}.codes`, "must not contain duplicates")
    const sortedCodes = codes.slice().sort((a, b) => (REASON_CODE_RANK.get(a) as number) - (REASON_CODE_RANK.get(b) as number))
    if (codes.some((code, codeIndex) => code !== sortedCodes[codeIndex])) invalid(`${label}.codes`, "must be in canonical rank order")
    const evidenceValues = denseArray(record.evidenceIds, `${label}.evidenceIds`, 0, K5_R1_LIMITS.maxEvidence)
    const evidenceIds = uniqueSortedStrings(evidenceValues, `${label}.evidenceIds`, K5_R1_LIMITS.maxEvidenceIdBytes)
    return Object.freeze({
      requirementId,
      status: status as Exclude<K5R1RequirementStatus, "SATISFIED">,
      codes: Object.freeze(codes),
      evidenceIds,
    })
  })
  const ids = parsed.map((reason) => reason.requirementId)
  if (new Set(ids).size !== ids.length) invalid("proofJudgment.reasons", "contains duplicate requirementId values")
  const sortedIds = ids.slice().sort(compareK5R1ScalarStrings)
  if (ids.some((id, index) => id !== sortedIds[index])) invalid("proofJudgment.reasons", "must be canonically sorted")
  for (const result of requirementResults) {
    const reason = parsed.find((candidate) => candidate.requirementId === result.requirementId)
    if (result.status === "SATISFIED" && reason !== undefined) invalid("proofJudgment.reasons", "must not include SATISFIED requirements")
    if (result.status !== "SATISFIED" && reason === undefined) invalid("proofJudgment.reasons", "must include every non-SATISFIED requirement")
  }
  return Object.freeze(parsed)
}

export function k5R1JudgmentIdentity(
  judgment: Omit<K5R1ProofJudgment, "judgmentIdentity">,
): string {
  return digestIdentity(judgment)
}

export function validateK5R1ProofJudgment(value: unknown): K5R1ProofJudgment {
  const record = plainRecord(value, JUDGMENT_KEYS, "proofJudgment")
  fixedString(record.version, K5_R1_PROOF_JUDGMENT_VERSION, "proofJudgment.version")
  const packageIdentity = sha256String(record.packageIdentity, "proofJudgment.packageIdentity")
  const status = enumString<K5R1PackageStatus>(record.status, PACKAGE_STATUS_SET, "proofJudgment.status")
  const requirementResults = parseRequirementResults(record.requirementResults)
  const reasons = parseReasons(record.reasons, requirementResults)
  const evidenceValues = denseArray(record.evidenceIds, "proofJudgment.evidenceIds", 0, K5_R1_LIMITS.maxEvidence)
  const evidenceIds = uniqueSortedStrings(evidenceValues, "proofJudgment.evidenceIds", K5_R1_LIMITS.maxEvidenceIdBytes)
  const claimedIdentity = sha256String(record.judgmentIdentity, "proofJudgment.judgmentIdentity")
  const base = Object.freeze({
    version: K5_R1_PROOF_JUDGMENT_VERSION,
    packageIdentity,
    status,
    reasons,
    requirementResults,
    evidenceIds,
  })
  const expectedIdentity = k5R1JudgmentIdentity(base)
  if (claimedIdentity !== expectedIdentity) invalid("proofJudgment.judgmentIdentity", "does not match canonical judgment content")
  return Object.freeze({ ...base, judgmentIdentity: expectedIdentity })
}
