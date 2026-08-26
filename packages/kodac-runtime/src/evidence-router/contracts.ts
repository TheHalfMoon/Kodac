import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

export const K6_R1_ROUTE_REQUEST_VERSION = "kodac-k6-r1-route-request-v1" as const
export const K6_R1_ROUTE_RESULT_VERSION = "kodac-k6-r1-route-eligibility-result-v1" as const
export const K6_R1_PROVIDER_QUALIFICATION_PROTOCOL = "kodac.provider-qualification" as const
export const K6_R1_PROVIDER_QUALIFICATION_VERSION = 1 as const

export const K6_R1_CANDIDATE_KINDS = Object.freeze(["MODEL_PROVIDER"] as const)
export const K6_R1_RISK_CLASSES = Object.freeze(["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const)
export const K6_R1_PRIVACY_CLASSES = Object.freeze(["PUBLIC", "REPOSITORY_PRIVATE", "SENSITIVE"] as const)
export const K6_R1_QUALIFICATION_STATUSES = Object.freeze(["PASS", "FAIL", "PENDING"] as const)
export const K6_R1_ELIGIBILITY_STATUSES = Object.freeze(["ELIGIBLE", "INELIGIBLE"] as const)
export const K6_R1_INELIGIBILITY_REASONS = Object.freeze([
  "QUALIFICATION_IDENTITY_MISMATCH",
  "QUALIFICATION_NOT_PASS",
  "MISSING_REQUIRED_CAPABILITY",
  "RISK_CLASS_UNSUPPORTED",
  "PRIVACY_CLASS_UNSUPPORTED",
] as const)

export const K6_R1_LIMITS = Object.freeze({
  maxCanonicalDepth: 32,
  maxCanonicalNodes: 50_000,
  maxRepositoryIdBytes: 512,
  maxTaskIdBytes: 256,
  maxCandidateIdBytes: 256,
  maxProviderBytes: 256,
  maxModelBytes: 512,
  maxCapabilityBytes: 160,
  maxRequiredCapabilities: 32,
  maxCandidates: 128,
  maxDeclaredCapabilities: 64,
  maxPrivacyClasses: 3,
} as const)

export type K6R1CandidateKind = typeof K6_R1_CANDIDATE_KINDS[number]
export type K6R1RiskClass = typeof K6_R1_RISK_CLASSES[number]
export type K6R1PrivacyClass = typeof K6_R1_PRIVACY_CLASSES[number]
export type K6R1QualificationStatus = typeof K6_R1_QUALIFICATION_STATUSES[number]
export type K6R1EligibilityStatus = typeof K6_R1_ELIGIBILITY_STATUSES[number]
export type K6R1IneligibilityReason = typeof K6_R1_INELIGIBILITY_REASONS[number]

export interface K6R1ProviderQualificationProjection {
  readonly protocol: typeof K6_R1_PROVIDER_QUALIFICATION_PROTOCOL
  readonly version: typeof K6_R1_PROVIDER_QUALIFICATION_VERSION
  readonly provider: string
  readonly model: string
  readonly workspaceDigest: string
  readonly status: K6R1QualificationStatus
  readonly reportDigest: string
}

export interface K6R1ModelProviderCandidate {
  readonly candidateId: string
  readonly candidateKind: K6R1CandidateKind
  readonly provider: string
  readonly model: string
  readonly declaredCapabilities: readonly string[]
  readonly maximumRiskClass: K6R1RiskClass
  readonly supportedPrivacyClasses: readonly K6R1PrivacyClass[]
  readonly qualification: K6R1ProviderQualificationProjection
}

export interface K6R1RouteRequestIdentityInput {
  readonly version: typeof K6_R1_ROUTE_REQUEST_VERSION
  readonly repositoryId: string
  readonly canonicalBase: string
  readonly candidateHead: string
  readonly taskId: string
  readonly riskClass: K6R1RiskClass
  readonly privacyClass: K6R1PrivacyClass
  readonly requiredCapabilities: readonly string[]
  readonly candidates: readonly K6R1ModelProviderCandidate[]
}

export interface K6R1RouteRequest extends K6R1RouteRequestIdentityInput {
  readonly requestIdentity: string
}

export interface K6R1CandidateEligibilityResult {
  readonly candidateId: string
  readonly candidateKind: K6R1CandidateKind
  readonly provider: string
  readonly model: string
  readonly status: K6R1EligibilityStatus
  readonly reasons: readonly K6R1IneligibilityReason[]
  readonly missingCapabilities: readonly string[]
  readonly qualificationReportDigest: string
}

export interface K6R1RouteEligibilityResultIdentityInput {
  readonly version: typeof K6_R1_ROUTE_RESULT_VERSION
  readonly requestIdentity: string
  readonly repositoryId: string
  readonly canonicalBase: string
  readonly candidateHead: string
  readonly taskId: string
  readonly candidateResults: readonly K6R1CandidateEligibilityResult[]
}

export interface K6R1RouteEligibilityResult extends K6R1RouteEligibilityResultIdentityInput {
  readonly resultIdentity: string
}

type UnknownRecord = Record<string, unknown>

interface ValidationContext {
  readonly active: WeakSet<object>
  nodes: number
}

const GIT_SHA = /^[0-9a-f]{40}$/
const SHA256 = /^[0-9a-f]{64}$/
const CAPABILITY_ID = /^[a-z][a-z0-9_-]*(?:[./:][a-z][a-z0-9_-]*)+$/

const CANDIDATE_KIND_SET = new Set<string>(K6_R1_CANDIDATE_KINDS)
const RISK_CLASS_SET = new Set<string>(K6_R1_RISK_CLASSES)
const PRIVACY_CLASS_SET = new Set<string>(K6_R1_PRIVACY_CLASSES)
const QUALIFICATION_STATUS_SET = new Set<string>(K6_R1_QUALIFICATION_STATUSES)
const ELIGIBILITY_STATUS_SET = new Set<string>(K6_R1_ELIGIBILITY_STATUSES)
const REASON_SET = new Set<string>(K6_R1_INELIGIBILITY_REASONS)
const REASON_RANK = new Map<string, number>(K6_R1_INELIGIBILITY_REASONS.map((reason, index) => [reason, index]))
const PRIVACY_RANK = new Map<string, number>(K6_R1_PRIVACY_CLASSES.map((privacyClass, index) => [privacyClass, index]))

const REQUEST_IDENTITY_INPUT_KEYS = [
  "version",
  "repositoryId",
  "canonicalBase",
  "candidateHead",
  "taskId",
  "riskClass",
  "privacyClass",
  "requiredCapabilities",
  "candidates",
] as const
const REQUEST_KEYS = ["version", "requestIdentity", ...REQUEST_IDENTITY_INPUT_KEYS.slice(1)] as const
const CANDIDATE_KEYS = [
  "candidateId",
  "candidateKind",
  "provider",
  "model",
  "declaredCapabilities",
  "maximumRiskClass",
  "supportedPrivacyClasses",
  "qualification",
] as const
const QUALIFICATION_KEYS = [
  "protocol",
  "version",
  "provider",
  "model",
  "workspaceDigest",
  "status",
  "reportDigest",
] as const
const RESULT_IDENTITY_INPUT_KEYS = [
  "version",
  "requestIdentity",
  "repositoryId",
  "canonicalBase",
  "candidateHead",
  "taskId",
  "candidateResults",
] as const
const RESULT_KEYS = ["version", "resultIdentity", ...RESULT_IDENTITY_INPUT_KEYS.slice(1)] as const
const CANDIDATE_RESULT_KEYS = [
  "candidateId",
  "candidateKind",
  "provider",
  "model",
  "status",
  "reasons",
  "missingCapabilities",
  "qualificationReportDigest",
] as const

function typeError(label: string, detail: string): never {
  throw new TypeError(`${label} ${detail}`)
}

function rangeError(label: string, detail: string): never {
  throw new RangeError(`${label} ${detail}`)
}

function assertNoProxy(value: unknown, label: string): void {
  if (typeof value === "object" && value !== null && utilTypes.isProxy(value)) {
    typeError(label, "must not be a Proxy")
  }
}

function enterContainer(value: object, label: string, depth: number, context: ValidationContext): () => void {
  assertNoProxy(value, label)
  if (depth > K6_R1_LIMITS.maxCanonicalDepth) rangeError(label, `exceeds canonical depth ${K6_R1_LIMITS.maxCanonicalDepth}`)
  context.nodes += 1
  if (context.nodes > K6_R1_LIMITS.maxCanonicalNodes) {
    rangeError(label, `exceeds canonical node count ${K6_R1_LIMITS.maxCanonicalNodes}`)
  }
  if (context.active.has(value)) typeError(label, "must not be cyclic")
  context.active.add(value)
  return () => context.active.delete(value)
}

function plainRecord(
  value: unknown,
  keys: readonly string[],
  label: string,
  depth: number,
  context: ValidationContext,
): UnknownRecord {
  assertNoProxy(value, label)
  if (value === null || typeof value !== "object" || Array.isArray(value)) typeError(label, "must be a plain object")
  const release = enterContainer(value, label, depth, context)
  try {
    const prototype = Object.getPrototypeOf(value)
    if (prototype !== Object.prototype && prototype !== null) typeError(label, "must be a plain object")
    if (Object.getOwnPropertySymbols(value).length !== 0) typeError(label, "must not contain symbol fields")
    const actual = Object.getOwnPropertyNames(value)
    if (actual.length !== keys.length) typeError(label, "has an invalid key set")
    const allowed = new Set(keys)
    const result = Object.create(null) as UnknownRecord
    for (const key of actual) {
      if (!allowed.has(key)) typeError(label, `contains unknown field: ${key}`)
      const descriptor = Object.getOwnPropertyDescriptor(value, key)
      if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) {
        typeError(`${label}.${key}`, "must be an enumerable data property")
      }
      if (descriptor.value === undefined) typeError(`${label}.${key}`, "must not be undefined")
      result[key] = descriptor.value
    }
    for (const key of keys) {
      if (!Object.hasOwn(result, key)) typeError(label, `is missing required field: ${key}`)
    }
    return result
  } finally {
    release()
  }
}

function denseArray(
  value: unknown,
  label: string,
  min: number,
  max: number,
  depth: number,
  context: ValidationContext,
): readonly unknown[] {
  assertNoProxy(value, label)
  if (!Array.isArray(value)) typeError(label, "must be an array")
  const release = enterContainer(value, label, depth, context)
  try {
    if (Object.getPrototypeOf(value) !== Array.prototype) typeError(label, "must be a plain array")
    if (Object.getOwnPropertySymbols(value).length !== 0) typeError(label, "must not contain symbol fields")
    const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length")
    if (lengthDescriptor === undefined || !("value" in lengthDescriptor)) typeError(label, "must have a data length")
    const length = lengthDescriptor.value
    if (typeof length !== "number" || !Number.isSafeInteger(length) || Object.is(length, -0) || length < min || length > max) {
      rangeError(label, `must contain ${min} through ${max} entries`)
    }
    const result: unknown[] = []
    for (let index = 0; index < length; index += 1) {
      const descriptor = Object.getOwnPropertyDescriptor(value, String(index))
      if (descriptor === undefined) typeError(label, "must be dense")
      if (!("value" in descriptor) || !descriptor.enumerable) {
        typeError(`${label}[${index}]`, "must be an enumerable data property")
      }
      if (descriptor.value === undefined) typeError(`${label}[${index}]`, "must not be undefined")
      result.push(descriptor.value)
    }
    if (Object.getOwnPropertyNames(value).length !== length + 1) typeError(label, "contains unexpected array fields")
    return result
  } finally {
    release()
  }
}

function validUnicodeScalars(value: string, label: string): void {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index)
    if (code >= 0xd800 && code <= 0xdbff) {
      if (index + 1 >= value.length) typeError(label, "must contain only valid Unicode scalar values")
      const next = value.charCodeAt(index + 1)
      if (next < 0xdc00 || next > 0xdfff) typeError(label, "must contain only valid Unicode scalar values")
      index += 1
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      typeError(label, "must contain only valid Unicode scalar values")
    }
  }
}

function boundedString(value: unknown, label: string, maxBytes: number): string {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) {
    typeError(label, "must be a non-empty NUL-free string")
  }
  validUnicodeScalars(value, label)
  if (Buffer.byteLength(value, "utf8") > maxBytes) rangeError(label, `exceeds ${maxBytes} UTF-8 bytes`)
  return value
}

function exactString<T extends string>(value: unknown, expected: T, label: string): T {
  if (value !== expected) typeError(label, `must equal ${expected}`)
  return expected
}

function exactInteger<T extends number>(value: unknown, expected: T, label: string): T {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || Object.is(value, -0) || value !== expected) {
    typeError(label, `must equal ${expected}`)
  }
  return expected
}

function enumString<T extends string>(value: unknown, allowed: ReadonlySet<string>, label: string): T {
  if (typeof value !== "string" || !allowed.has(value)) typeError(label, "is unsupported")
  return value as T
}

function gitSha(value: unknown, label: string): string {
  if (typeof value !== "string" || !GIT_SHA.test(value)) typeError(label, "must be 40 lowercase hexadecimal characters")
  return value
}

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) typeError(label, "must be 64 lowercase hexadecimal characters")
  return value
}

function capability(value: unknown, label: string): string {
  const text = boundedString(value, label, K6_R1_LIMITS.maxCapabilityBytes)
  if (!CAPABILITY_ID.test(text)) typeError(label, "must match the H1 capability identifier grammar")
  return text
}

export function compareK6R1Utf16(left: string, right: string): number {
  const shared = Math.min(left.length, right.length)
  for (let index = 0; index < shared; index += 1) {
    const leftCode = left.charCodeAt(index)
    const rightCode = right.charCodeAt(index)
    if (leftCode !== rightCode) return leftCode < rightCode ? -1 : 1
  }
  return left.length < right.length ? -1 : left.length > right.length ? 1 : 0
}

function uniqueCapabilities(
  value: unknown,
  label: string,
  min: number,
  max: number,
  depth: number,
  context: ValidationContext,
): readonly string[] {
  const values = denseArray(value, label, min, max, depth, context)
  const parsed = values.map((item, index) => capability(item, `${label}[${index}]`))
  if (new Set(parsed).size !== parsed.length) typeError(label, "must not contain duplicates")
  return Object.freeze(parsed.slice().sort(compareK6R1Utf16))
}

function uniquePrivacyClasses(
  value: unknown,
  label: string,
  depth: number,
  context: ValidationContext,
): readonly K6R1PrivacyClass[] {
  const values = denseArray(value, label, 1, K6_R1_LIMITS.maxPrivacyClasses, depth, context)
  const parsed = values.map((item, index) => enumString<K6R1PrivacyClass>(item, PRIVACY_CLASS_SET, `${label}[${index}]`))
  if (new Set(parsed).size !== parsed.length) typeError(label, "must not contain duplicates")
  return Object.freeze(parsed.slice().sort((left, right) => (PRIVACY_RANK.get(left) as number) - (PRIVACY_RANK.get(right) as number)))
}

function parseQualification(
  value: unknown,
  label: string,
  depth: number,
  context: ValidationContext,
): K6R1ProviderQualificationProjection {
  const record = plainRecord(value, QUALIFICATION_KEYS, label, depth, context)
  return Object.freeze({
    protocol: exactString(record.protocol, K6_R1_PROVIDER_QUALIFICATION_PROTOCOL, `${label}.protocol`),
    version: exactInteger(record.version, K6_R1_PROVIDER_QUALIFICATION_VERSION, `${label}.version`),
    provider: boundedString(record.provider, `${label}.provider`, K6_R1_LIMITS.maxProviderBytes),
    model: boundedString(record.model, `${label}.model`, K6_R1_LIMITS.maxModelBytes),
    workspaceDigest: sha256(record.workspaceDigest, `${label}.workspaceDigest`),
    status: enumString<K6R1QualificationStatus>(record.status, QUALIFICATION_STATUS_SET, `${label}.status`),
    reportDigest: sha256(record.reportDigest, `${label}.reportDigest`),
  })
}

function parseCandidate(
  value: unknown,
  label: string,
  depth: number,
  context: ValidationContext,
): K6R1ModelProviderCandidate {
  const record = plainRecord(value, CANDIDATE_KEYS, label, depth, context)
  return Object.freeze({
    candidateId: boundedString(record.candidateId, `${label}.candidateId`, K6_R1_LIMITS.maxCandidateIdBytes),
    candidateKind: enumString<K6R1CandidateKind>(record.candidateKind, CANDIDATE_KIND_SET, `${label}.candidateKind`),
    provider: boundedString(record.provider, `${label}.provider`, K6_R1_LIMITS.maxProviderBytes),
    model: boundedString(record.model, `${label}.model`, K6_R1_LIMITS.maxModelBytes),
    declaredCapabilities: uniqueCapabilities(
      record.declaredCapabilities,
      `${label}.declaredCapabilities`,
      0,
      K6_R1_LIMITS.maxDeclaredCapabilities,
      depth + 1,
      context,
    ),
    maximumRiskClass: enumString<K6R1RiskClass>(record.maximumRiskClass, RISK_CLASS_SET, `${label}.maximumRiskClass`),
    supportedPrivacyClasses: uniquePrivacyClasses(record.supportedPrivacyClasses, `${label}.supportedPrivacyClasses`, depth + 1, context),
    qualification: parseQualification(record.qualification, `${label}.qualification`, depth + 1, context),
  })
}

function parseCandidates(
  value: unknown,
  label: string,
  depth: number,
  context: ValidationContext,
): readonly K6R1ModelProviderCandidate[] {
  const values = denseArray(value, label, 1, K6_R1_LIMITS.maxCandidates, depth, context)
  const parsed = values.map((item, index) => parseCandidate(item, `${label}[${index}]`, depth + 1, context))
  const ids = parsed.map((candidate) => candidate.candidateId)
  if (new Set(ids).size !== ids.length) typeError(label, "must contain unique candidateId values")
  return Object.freeze(parsed.slice().sort((left, right) => compareK6R1Utf16(left.candidateId, right.candidateId)))
}

function newValidationContext(): ValidationContext {
  return { active: new WeakSet<object>(), nodes: 0 }
}

function parseRequestIdentityInput(value: unknown, label = "route request"): K6R1RouteRequestIdentityInput {
  const context = newValidationContext()
  const record = plainRecord(value, REQUEST_IDENTITY_INPUT_KEYS, label, 1, context)
  return Object.freeze({
    version: exactString(record.version, K6_R1_ROUTE_REQUEST_VERSION, `${label}.version`),
    repositoryId: boundedString(record.repositoryId, `${label}.repositoryId`, K6_R1_LIMITS.maxRepositoryIdBytes),
    canonicalBase: gitSha(record.canonicalBase, `${label}.canonicalBase`),
    candidateHead: gitSha(record.candidateHead, `${label}.candidateHead`),
    taskId: boundedString(record.taskId, `${label}.taskId`, K6_R1_LIMITS.maxTaskIdBytes),
    riskClass: enumString<K6R1RiskClass>(record.riskClass, RISK_CLASS_SET, `${label}.riskClass`),
    privacyClass: enumString<K6R1PrivacyClass>(record.privacyClass, PRIVACY_CLASS_SET, `${label}.privacyClass`),
    requiredCapabilities: uniqueCapabilities(
      record.requiredCapabilities,
      `${label}.requiredCapabilities`,
      1,
      K6_R1_LIMITS.maxRequiredCapabilities,
      2,
      context,
    ),
    candidates: parseCandidates(record.candidates, `${label}.candidates`, 2, context),
  })
}

function parseReasons(
  value: unknown,
  label: string,
  depth: number,
  context: ValidationContext,
): readonly K6R1IneligibilityReason[] {
  const values = denseArray(value, label, 0, K6_R1_INELIGIBILITY_REASONS.length, depth, context)
  const parsed = values.map((item, index) => enumString<K6R1IneligibilityReason>(item, REASON_SET, `${label}[${index}]`))
  if (new Set(parsed).size !== parsed.length) typeError(label, "must not contain duplicates")
  const sorted = parsed.slice().sort((left, right) => (REASON_RANK.get(left) as number) - (REASON_RANK.get(right) as number))
  if (parsed.some((reason, index) => reason !== sorted[index])) typeError(label, "must use canonical reason ordering")
  return Object.freeze(parsed)
}

function parseCandidateResult(
  value: unknown,
  label: string,
  depth: number,
  context: ValidationContext,
): K6R1CandidateEligibilityResult {
  const record = plainRecord(value, CANDIDATE_RESULT_KEYS, label, depth, context)
  const status = enumString<K6R1EligibilityStatus>(record.status, ELIGIBILITY_STATUS_SET, `${label}.status`)
  const reasons = parseReasons(record.reasons, `${label}.reasons`, depth + 1, context)
  const missingCapabilities = uniqueCapabilities(
    record.missingCapabilities,
    `${label}.missingCapabilities`,
    0,
    K6_R1_LIMITS.maxRequiredCapabilities,
    depth + 1,
    context,
  )
  if (status === "ELIGIBLE" && reasons.length !== 0) typeError(label, "ELIGIBLE status requires an empty reason set")
  if (status === "INELIGIBLE" && reasons.length === 0) typeError(label, "INELIGIBLE status requires at least one reason")
  if (reasons.includes("MISSING_REQUIRED_CAPABILITY") !== (missingCapabilities.length > 0)) {
    typeError(label, "missingCapabilities must correspond exactly to MISSING_REQUIRED_CAPABILITY")
  }
  return Object.freeze({
    candidateId: boundedString(record.candidateId, `${label}.candidateId`, K6_R1_LIMITS.maxCandidateIdBytes),
    candidateKind: enumString<K6R1CandidateKind>(record.candidateKind, CANDIDATE_KIND_SET, `${label}.candidateKind`),
    provider: boundedString(record.provider, `${label}.provider`, K6_R1_LIMITS.maxProviderBytes),
    model: boundedString(record.model, `${label}.model`, K6_R1_LIMITS.maxModelBytes),
    status,
    reasons,
    missingCapabilities,
    qualificationReportDigest: sha256(record.qualificationReportDigest, `${label}.qualificationReportDigest`),
  })
}

function parseCandidateResults(
  value: unknown,
  label: string,
  depth: number,
  context: ValidationContext,
): readonly K6R1CandidateEligibilityResult[] {
  const values = denseArray(value, label, 1, K6_R1_LIMITS.maxCandidates, depth, context)
  const parsed = values.map((item, index) => parseCandidateResult(item, `${label}[${index}]`, depth + 1, context))
  const ids = parsed.map((candidate) => candidate.candidateId)
  if (new Set(ids).size !== ids.length) typeError(label, "must contain unique candidateId values")
  const sorted = parsed.slice().sort((left, right) => compareK6R1Utf16(left.candidateId, right.candidateId))
  if (parsed.some((candidate, index) => candidate.candidateId !== sorted[index]?.candidateId)) {
    typeError(label, "must use canonical candidateId ordering")
  }
  return Object.freeze(parsed)
}

function parseResultIdentityInput(value: unknown, label = "route eligibility result"): K6R1RouteEligibilityResultIdentityInput {
  const context = newValidationContext()
  const record = plainRecord(value, RESULT_IDENTITY_INPUT_KEYS, label, 1, context)
  return Object.freeze({
    version: exactString(record.version, K6_R1_ROUTE_RESULT_VERSION, `${label}.version`),
    requestIdentity: sha256(record.requestIdentity, `${label}.requestIdentity`),
    repositoryId: boundedString(record.repositoryId, `${label}.repositoryId`, K6_R1_LIMITS.maxRepositoryIdBytes),
    canonicalBase: gitSha(record.canonicalBase, `${label}.canonicalBase`),
    candidateHead: gitSha(record.candidateHead, `${label}.candidateHead`),
    taskId: boundedString(record.taskId, `${label}.taskId`, K6_R1_LIMITS.maxTaskIdBytes),
    candidateResults: parseCandidateResults(record.candidateResults, `${label}.candidateResults`, 2, context),
  })
}

function serializeString(value: string): string {
  validUnicodeScalars(value, "canonical string")
  let output = '"'
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index)
    if (code === 0x22) output += '\\"'
    else if (code === 0x5c) output += "\\\\"
    else if (code === 0x08) output += "\\b"
    else if (code === 0x09) output += "\\t"
    else if (code === 0x0a) output += "\\n"
    else if (code === 0x0c) output += "\\f"
    else if (code === 0x0d) output += "\\r"
    else if (code <= 0x1f) output += `\\u00${code.toString(16).padStart(2, "0")}`
    else {
      output += value[index]
      if (code >= 0xd800 && code <= 0xdbff) {
        index += 1
        output += value[index]
      }
    }
  }
  return `${output}"`
}

function serializeInteger(value: number): string {
  if (!Number.isSafeInteger(value) || Object.is(value, -0)) typeError("canonical number", "must be a non-negative-zero safe integer")
  return BigInt(value).toString(10)
}

function canonicalJsonInternal(value: unknown, depth: number, context: ValidationContext): string {
  if (value === null || typeof value !== "object") {
    context.nodes += 1
    if (context.nodes > K6_R1_LIMITS.maxCanonicalNodes) {
      rangeError("canonical value", `exceeds canonical node count ${K6_R1_LIMITS.maxCanonicalNodes}`)
    }
  }
  if (value === null) return "null"
  if (typeof value === "string") return serializeString(value)
  if (typeof value === "boolean") return value ? "true" : "false"
  if (typeof value === "number") return serializeInteger(value)
  if (typeof value !== "object") typeError("canonical value", "must be JSON data")
  assertNoProxy(value, "canonical value")
  const release = enterContainer(value, "canonical value", depth, context)
  try {
    if (Array.isArray(value)) {
      if (Object.getPrototypeOf(value) !== Array.prototype) typeError("canonical array", "must be a plain array")
      if (Object.getOwnPropertySymbols(value).length !== 0) typeError("canonical array", "must not contain symbol fields")
      const length = value.length
      const parts: string[] = []
      for (let index = 0; index < length; index += 1) {
        const descriptor = Object.getOwnPropertyDescriptor(value, String(index))
        if (descriptor === undefined) typeError("canonical array", "must be dense")
        if (!("value" in descriptor) || !descriptor.enumerable || descriptor.value === undefined) {
          typeError(`canonical array[${index}]`, "must be an enumerable defined data property")
        }
        parts.push(canonicalJsonInternal(descriptor.value, depth + 1, context))
      }
      if (Object.getOwnPropertyNames(value).length !== length + 1) typeError("canonical array", "contains unexpected fields")
      return `[${parts.join(",")}]`
    }
    const prototype = Object.getPrototypeOf(value)
    if (prototype !== Object.prototype && prototype !== null) typeError("canonical object", "must be a plain object")
    if (Object.getOwnPropertySymbols(value).length !== 0) typeError("canonical object", "must not contain symbol fields")
    const keys = Object.getOwnPropertyNames(value).sort(compareK6R1Utf16)
    const parts: string[] = []
    for (const key of keys) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key)
      if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable || descriptor.value === undefined) {
        typeError(`canonical object.${key}`, "must be an enumerable defined data property")
      }
      parts.push(`${serializeString(key)}:${canonicalJsonInternal(descriptor.value, depth + 1, context)}`)
    }
    return `{${parts.join(",")}}`
  } finally {
    release()
  }
}

export function canonicalK6R1Json(value: unknown): string {
  return canonicalJsonInternal(value, 1, newValidationContext())
}

function digest(value: unknown): string {
  return createHash("sha256").update(canonicalK6R1Json(value), "utf8").digest("hex")
}

export function k6R1RequestIdentity(value: unknown): string {
  return digest(parseRequestIdentityInput(value))
}

export function validateK6R1RouteRequest(value: unknown): K6R1RouteRequest {
  const context = newValidationContext()
  const record = plainRecord(value, REQUEST_KEYS, "route request", 1, context)
  const identityInput = parseRequestIdentityInput({
    version: record.version,
    repositoryId: record.repositoryId,
    canonicalBase: record.canonicalBase,
    candidateHead: record.candidateHead,
    taskId: record.taskId,
    riskClass: record.riskClass,
    privacyClass: record.privacyClass,
    requiredCapabilities: record.requiredCapabilities,
    candidates: record.candidates,
  })
  const requestIdentity = sha256(record.requestIdentity, "route request.requestIdentity")
  const expected = digest(identityInput)
  if (requestIdentity !== expected) typeError("route request.requestIdentity", "does not match deterministic recomputation")
  return Object.freeze({ requestIdentity, ...identityInput })
}

export function createK6R1RouteRequest(value: unknown): K6R1RouteRequest {
  const identityInput = parseRequestIdentityInput(value)
  return Object.freeze({ ...identityInput, requestIdentity: digest(identityInput) })
}

export function k6R1ResultIdentity(value: unknown): string {
  return digest(parseResultIdentityInput(value))
}

export function createK6R1RouteEligibilityResult(value: unknown): K6R1RouteEligibilityResult {
  const identityInput = parseResultIdentityInput(value)
  return Object.freeze({ ...identityInput, resultIdentity: digest(identityInput) })
}

export function validateK6R1RouteEligibilityResult(value: unknown): K6R1RouteEligibilityResult {
  const context = newValidationContext()
  const record = plainRecord(value, RESULT_KEYS, "route eligibility result", 1, context)
  const identityInput = parseResultIdentityInput({
    version: record.version,
    requestIdentity: record.requestIdentity,
    repositoryId: record.repositoryId,
    canonicalBase: record.canonicalBase,
    candidateHead: record.candidateHead,
    taskId: record.taskId,
    candidateResults: record.candidateResults,
  })
  const resultIdentity = sha256(record.resultIdentity, "route eligibility result.resultIdentity")
  const expected = digest(identityInput)
  if (resultIdentity !== expected) typeError("route eligibility result.resultIdentity", "does not match deterministic recomputation")
  return Object.freeze({ resultIdentity, ...identityInput })
}
