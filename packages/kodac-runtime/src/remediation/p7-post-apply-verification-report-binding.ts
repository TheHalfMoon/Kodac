import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

import {
  validateP7PostApplyVerificationPlanBinding,
  type P7PostApplyVerificationPlanBinding,
  type P7PostApplyVerificationPlanBindingBuildInput,
} from "./p7-post-apply-verification-plan-binding.ts"

export const P7_R6_POST_APPLY_VERIFICATION_REPORT_BINDING_VERSION =
  "p7-r6-post-apply-verification-report-binding-v1" as const
export const P7_R6_VERIFICATION_REPORT_BOUND_STATE = "VERIFICATION_REPORT_BOUND" as const
export const P7_R6_VERIFICATION_REPORT_PROTOCOL = "kodac.verification" as const
export const P7_R6_VERIFICATION_REPORT_VERSION = 1 as const

export const P7_R6_VERIFICATION_REPORT_LIMITS = Object.freeze({
  maxChecks: 512,
  maxEvidencePerCheck: 256,
  maxSessionIdCodePoints: 256,
  maxCheckIdCodePoints: 128,
  maxSummaryCodePoints: 4_096,
  maxEvidenceRefCodePoints: 1_024,
  maxChangedPaths: 64,
  maxPathCodePoints: 1_024,
  maxJsonNodes: 8_192,
  maxJsonDepth: 16,
} as const)

export type P7VerificationReportCategory =
  | "agent"
  | "workspace"
  | "diff"
  | "receipts"
  | "policy"
  | "syntax"
  | "types"
  | "lint"
  | "tests"
  | "custom"
export type P7VerificationReportStatus = "pass" | "fail"
export type P7VerificationEvidenceKind = "receipt" | "artifact" | "event" | "workspace"

export interface P7VerificationReportEvidence {
  readonly kind: P7VerificationEvidenceKind
  readonly ref: string
  readonly digest?: string
}

export interface P7VerificationReportCheck {
  readonly id: string
  readonly category: P7VerificationReportCategory
  readonly status: P7VerificationReportStatus
  readonly summary: string
  readonly evidence: readonly P7VerificationReportEvidence[]
}

export interface P7VerificationReportProjection {
  readonly protocol: typeof P7_R6_VERIFICATION_REPORT_PROTOCOL
  readonly version: typeof P7_R6_VERIFICATION_REPORT_VERSION
  readonly sessionId: string
  readonly startedAt: string
  readonly completedAt: string
  readonly passed: boolean
  readonly checks: readonly P7VerificationReportCheck[]
}

export interface P7PostApplyVerificationReportBinding {
  readonly version: typeof P7_R6_POST_APPLY_VERIFICATION_REPORT_BINDING_VERSION
  readonly bindingIdentity: string
  readonly state: typeof P7_R6_VERIFICATION_REPORT_BOUND_STATE
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
  readonly changedPaths: readonly string[]
  readonly verificationReportIdentity: string
  readonly verificationSessionId: string
  readonly verificationStartedAt: string
  readonly verificationCompletedAt: string
  readonly verificationReportPassed: boolean
  readonly verificationReport: P7VerificationReportProjection
}

export interface P7PostApplyVerificationReportBindingBuildInput {
  readonly sourceVerificationPlanBinding: P7PostApplyVerificationPlanBinding
  readonly sourceVerificationPlanBindingInput: P7PostApplyVerificationPlanBindingBuildInput
  readonly verificationReport: unknown
}

type UnknownRecord = Record<string, unknown>
type BindingCore = Omit<P7PostApplyVerificationReportBinding, "bindingIdentity">

const SHA256 = /^[0-9a-f]{64}$/
const CANONICAL_TIMESTAMP = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$/
const CHECK_ID = /^[a-z0-9][a-z0-9._-]{0,127}$/i
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/u
const CATEGORIES = new Set<P7VerificationReportCategory>([
  "agent", "workspace", "diff", "receipts", "policy", "syntax", "types", "lint", "tests", "custom",
])
const STATUSES = new Set<P7VerificationReportStatus>(["pass", "fail"])
const EVIDENCE_KINDS = new Set<P7VerificationEvidenceKind>(["receipt", "artifact", "event", "workspace"])
const REQUIRED_BASE_CHECKS = Object.freeze({
  "agent.completed": "agent",
  "workspace.integrity": "workspace",
  "git.diff": "diff",
  "evidence.receipts": "receipts",
  "evidence.policy": "policy",
  "verification.commands": "tests",
} as const)

const BUILD_KEYS = ["sourceVerificationPlanBinding", "sourceVerificationPlanBindingInput", "verificationReport"] as const
const OUTPUT_KEYS = [
  "version", "bindingIdentity", "state", "proposalIdentity", "authorizationIdentity", "intentBindingIdentity",
  "appliedEvidenceIdentity", "verificationPlanBindingIdentity", "repositoryIdentity", "canonicalBase", "targetHead",
  "postStateDigest", "verificationPlanDigest", "changedPaths", "verificationReportIdentity", "verificationSessionId",
  "verificationStartedAt", "verificationCompletedAt", "verificationReportPassed", "verificationReport",
] as const
const REPORT_KEYS = ["protocol", "version", "sessionId", "startedAt", "completedAt", "passed", "checks"] as const
const CHECK_KEYS = ["id", "category", "status", "summary", "evidence"] as const
const EVIDENCE_ALLOWED_KEYS = ["kind", "ref", "digest"] as const
const EVIDENCE_REQUIRED_KEYS = ["kind", "ref"] as const

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

function denseArray(value: unknown, label: string, maximum: number): readonly unknown[] {
  if (!Array.isArray(value) || nodeTypes.isProxy(value)) fail(label, "must be a non-proxy array")
  if (Object.getPrototypeOf(value) !== Array.prototype) fail(label, "must use the ordinary Array prototype")

  const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length")
  if (
    lengthDescriptor === undefined ||
    !("value" in lengthDescriptor) ||
    !Number.isSafeInteger(lengthDescriptor.value) ||
    (lengthDescriptor.value as number) > maximum
  ) {
    fail(label, `must expose an ordinary array length <= ${maximum}`)
  }
  const length = lengthDescriptor.value as number
  const expected = new Set<string>(["length"])
  for (let index = 0; index < length; index += 1) expected.add(String(index))
  const keys = Reflect.ownKeys(value)
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

function boundedText(value: unknown, label: string, maximumCodePoints: number): string {
  if (typeof value !== "string") fail(label, "must be a string")
  assertUnicodeScalars(value, label)
  if (value.length === 0) fail(label, "must not be empty")
  if (codePointLength(value) > maximumCodePoints) fail(label, `exceeds ${maximumCodePoints} Unicode code points`)
  if (CONTROL_CHARACTERS.test(value)) fail(label, "must not contain control characters")
  return value
}

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) fail(label, "must be 64 lowercase hexadecimal characters")
  return value
}

function canonicalTimestamp(value: unknown, label: string): string {
  if (typeof value !== "string" || !CANONICAL_TIMESTAMP.test(value)) {
    fail(label, "must be a canonical ISO-8601 UTC timestamp")
  }
  const parsed = Date.parse(value)
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) {
    fail(label, "must be a canonical ISO-8601 UTC timestamp")
  }
  return value
}

function assertSafeJsonGraph(value: unknown, label: string): void {
  const stack: Array<{ readonly value: unknown; readonly depth: number; readonly label: string }> = [
    { value, depth: 0, label },
  ]
  const seen = new Set<object>()
  let nodes = 0

  while (stack.length > 0) {
    const current = stack.pop()!
    nodes += 1
    if (nodes > P7_R6_VERIFICATION_REPORT_LIMITS.maxJsonNodes) fail(label, "exceeds the JSON node budget")
    if (current.depth > P7_R6_VERIFICATION_REPORT_LIMITS.maxJsonDepth) fail(label, "exceeds the JSON depth budget")

    const item = current.value
    if (item === null || typeof item === "boolean") continue
    if (typeof item === "string") {
      assertUnicodeScalars(item, current.label)
      continue
    }
    if (typeof item === "number") {
      if (!Number.isFinite(item) || !Number.isSafeInteger(item)) fail(current.label, "must contain only safe finite integers")
      continue
    }
    if (typeof item !== "object") fail(current.label, "must contain only JSON-compatible values")
    if (nodeTypes.isProxy(item)) fail(current.label, "must not contain Proxy objects")
    if (seen.has(item)) fail(current.label, "must not contain cycles or aliases")
    seen.add(item)

    if (Array.isArray(item)) {
      const values = denseArray(item, current.label, P7_R6_VERIFICATION_REPORT_LIMITS.maxJsonNodes)
      for (let index = values.length - 1; index >= 0; index -= 1) {
        stack.push({ value: values[index], depth: current.depth + 1, label: `${current.label}[${index}]` })
      }
      continue
    }

    const prototype = Object.getPrototypeOf(item)
    if (prototype !== Object.prototype && prototype !== null) fail(current.label, "must contain only plain objects")
    for (const key of Reflect.ownKeys(item)) {
      if (typeof key !== "string") fail(current.label, "must not contain symbol fields")
      assertUnicodeScalars(key, `${current.label} key`)
      const descriptor = Object.getOwnPropertyDescriptor(item, key)
      if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
        fail(`${current.label}.${key}`, "must be an enumerable data property")
      }
      stack.push({ value: descriptor.value, depth: current.depth + 1, label: `${current.label}.${key}` })
    }
  }
}

function normalizeEvidence(value: unknown, label: string): P7VerificationReportEvidence {
  const record = ownDataRecord(value, EVIDENCE_ALLOWED_KEYS, EVIDENCE_REQUIRED_KEYS, label)
  if (typeof record.kind !== "string" || !EVIDENCE_KINDS.has(record.kind as P7VerificationEvidenceKind)) {
    fail(`${label}.kind`, "is unsupported")
  }
  const normalized: { kind: P7VerificationEvidenceKind; ref: string; digest?: string } = {
    kind: record.kind as P7VerificationEvidenceKind,
    ref: boundedText(record.ref, `${label}.ref`, P7_R6_VERIFICATION_REPORT_LIMITS.maxEvidenceRefCodePoints),
  }
  if (Object.hasOwn(record, "digest")) normalized.digest = sha256(record.digest, `${label}.digest`)
  return Object.freeze(normalized)
}

function normalizeCheck(value: unknown, index: number): P7VerificationReportCheck {
  const label = `verificationReport.checks[${index}]`
  const record = ownDataRecord(value, CHECK_KEYS, CHECK_KEYS, label)
  const id = boundedText(record.id, `${label}.id`, P7_R6_VERIFICATION_REPORT_LIMITS.maxCheckIdCodePoints)
  if (!CHECK_ID.test(id)) fail(`${label}.id`, "must match the canonical verification check id grammar")
  if (typeof record.category !== "string" || !CATEGORIES.has(record.category as P7VerificationReportCategory)) {
    fail(`${label}.category`, "is unsupported")
  }
  if (typeof record.status !== "string" || !STATUSES.has(record.status as P7VerificationReportStatus)) {
    fail(`${label}.status`, "is unsupported")
  }
  const evidence = denseArray(
    record.evidence,
    `${label}.evidence`,
    P7_R6_VERIFICATION_REPORT_LIMITS.maxEvidencePerCheck,
  ).map((item, evidenceIndex) => normalizeEvidence(item, `${label}.evidence[${evidenceIndex}]`))

  const evidenceKeys = evidence.map((item) => `${item.kind}\u0000${item.ref}\u0000${item.digest ?? ""}`)
  if (new Set(evidenceKeys).size !== evidenceKeys.length) fail(`${label}.evidence`, "must not contain duplicate evidence references")
  const orderedEvidence = [...evidence].sort((left, right) =>
    compareStrings(left.kind, right.kind) || compareStrings(left.ref, right.ref) || compareStrings(left.digest ?? "", right.digest ?? ""),
  )

  return Object.freeze({
    id,
    category: record.category as P7VerificationReportCategory,
    status: record.status as P7VerificationReportStatus,
    summary: boundedText(record.summary, `${label}.summary`, P7_R6_VERIFICATION_REPORT_LIMITS.maxSummaryCodePoints),
    evidence: Object.freeze(orderedEvidence),
  })
}

function normalizeReport(
  value: unknown,
  source: P7PostApplyVerificationPlanBinding,
): P7VerificationReportProjection {
  assertSafeJsonGraph(value, "verificationReport")
  const record = ownDataRecord(value, REPORT_KEYS, REPORT_KEYS, "verificationReport")
  if (record.protocol !== P7_R6_VERIFICATION_REPORT_PROTOCOL) fail("verificationReport.protocol", "is unsupported")
  if (record.version !== P7_R6_VERIFICATION_REPORT_VERSION) fail("verificationReport.version", "is unsupported")

  const sessionId = boundedText(
    record.sessionId,
    "verificationReport.sessionId",
    P7_R6_VERIFICATION_REPORT_LIMITS.maxSessionIdCodePoints,
  )
  const startedAt = canonicalTimestamp(record.startedAt, "verificationReport.startedAt")
  const completedAt = canonicalTimestamp(record.completedAt, "verificationReport.completedAt")
  if (Date.parse(completedAt) < Date.parse(startedAt)) fail("verificationReport.completedAt", "must not precede startedAt")
  if (typeof record.passed !== "boolean") fail("verificationReport.passed", "must be a boolean")

  const rawChecks = denseArray(record.checks, "verificationReport.checks", P7_R6_VERIFICATION_REPORT_LIMITS.maxChecks)
  if (rawChecks.length === 0) fail("verificationReport.checks", "must contain at least one check")
  const checks = rawChecks.map((item, index) => normalizeCheck(item, index))
  const ids = checks.map((check) => check.id)
  if (new Set(ids).size !== ids.length) fail("verificationReport.checks", "must not contain duplicate check ids")

  for (const [id, category] of Object.entries(REQUIRED_BASE_CHECKS)) {
    const check = checks.find((candidate) => candidate.id === id)
    if (!check) fail("verificationReport.checks", `is missing required base check: ${id}`)
    if (check.category !== category) fail(`verificationReport check ${id}`, `must use category ${category}`)
  }

  const expectedCommands = new Map(source.verificationPlan.commands.map((command) => [`command.${command.id}`, command.category]))
  for (const [id, category] of expectedCommands) {
    const check = checks.find((candidate) => candidate.id === id)
    if (!check) fail("verificationReport.checks", `is missing planned command check: ${id}`)
    if (check.category !== category) fail(`verificationReport check ${id}`, `must use planned category ${category}`)
    if (check.status === "pass" && !check.evidence.some((item) => item.kind === "receipt")) {
      fail(`verificationReport check ${id}`, "passing planned command check must contain receipt evidence")
    }
  }
  for (const check of checks) {
    if (check.id.startsWith("command.") && !expectedCommands.has(check.id)) {
      fail("verificationReport.checks", `contains command check outside the exact P7-R5 plan: ${check.id}`)
    }
  }

  const everyPass = checks.every((check) => check.status === "pass")
  if (record.passed !== everyPass) fail("verificationReport.passed", "must equal the conjunction of all check statuses")

  const orderedChecks = [...checks].sort((left, right) => compareStrings(left.id, right.id))
  return Object.freeze({
    protocol: P7_R6_VERIFICATION_REPORT_PROTOCOL,
    version: P7_R6_VERIFICATION_REPORT_VERSION,
    sessionId,
    startedAt,
    completedAt,
    passed: record.passed,
    checks: Object.freeze(orderedChecks),
  })
}

function normalizeChangedPaths(value: readonly string[]): readonly string[] {
  if (value.length > P7_R6_VERIFICATION_REPORT_LIMITS.maxChangedPaths) fail("changedPaths", "exceeds the path budget")
  return Object.freeze(value.map((path, index) =>
    boundedText(path, `changedPaths[${index}]`, P7_R6_VERIFICATION_REPORT_LIMITS.maxPathCodePoints),
  ))
}

function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value)
    for (const child of Object.values(value as UnknownRecord)) deepFreeze(child)
  }
  return value
}

function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== "object") {
    const encoded = JSON.stringify(value)
    if (encoded === undefined) fail("canonical JSON", "contains a non-JSON value")
    return encoded
  }
  if (Array.isArray(value)) return `[${value.map((item) => canonicalJson(item)).join(",")}]`
  const record = value as UnknownRecord
  const keys = Object.keys(record).sort(compareStrings)
  return `{${keys.map((key) => `${JSON.stringify(key)}:${canonicalJson(record[key])}`).join(",")}}`
}

function bindingIdentity(core: BindingCore): string {
  return hashText(JSON.stringify(core))
}

function normalizedBuildCore(value: unknown): BindingCore {
  const input = ownDataRecord(value, BUILD_KEYS, BUILD_KEYS, "verification-report binding build input")
  const sourceInput = input.sourceVerificationPlanBindingInput as P7PostApplyVerificationPlanBindingBuildInput
  const source = validateP7PostApplyVerificationPlanBinding(input.sourceVerificationPlanBinding, sourceInput)
  const report = normalizeReport(input.verificationReport, source)
  const reportIdentity = hashText(JSON.stringify(report))

  return deepFreeze({
    version: P7_R6_POST_APPLY_VERIFICATION_REPORT_BINDING_VERSION,
    state: P7_R6_VERIFICATION_REPORT_BOUND_STATE,
    proposalIdentity: source.proposalIdentity,
    authorizationIdentity: source.authorizationIdentity,
    intentBindingIdentity: source.intentBindingIdentity,
    appliedEvidenceIdentity: source.appliedEvidenceIdentity,
    verificationPlanBindingIdentity: source.bindingIdentity,
    repositoryIdentity: source.repositoryIdentity,
    canonicalBase: source.canonicalBase,
    targetHead: source.targetHead,
    postStateDigest: source.postStateDigest,
    verificationPlanDigest: source.verificationPlanDigest,
    changedPaths: normalizeChangedPaths(source.verificationPlan.changedPaths),
    verificationReportIdentity: reportIdentity,
    verificationSessionId: report.sessionId,
    verificationStartedAt: report.startedAt,
    verificationCompletedAt: report.completedAt,
    verificationReportPassed: report.passed,
    verificationReport: report,
  })
}

export function p7PostApplyVerificationReportBindingIdentity(
  input: P7PostApplyVerificationReportBindingBuildInput,
): string {
  return bindingIdentity(normalizedBuildCore(input))
}

export function buildP7PostApplyVerificationReportBinding(
  input: P7PostApplyVerificationReportBindingBuildInput,
): P7PostApplyVerificationReportBinding {
  const core = normalizedBuildCore(input)
  return deepFreeze({ ...core, bindingIdentity: bindingIdentity(core) })
}

export function validateP7PostApplyVerificationReportBinding(
  value: unknown,
  input: P7PostApplyVerificationReportBindingBuildInput,
): P7PostApplyVerificationReportBinding {
  assertSafeJsonGraph(value, "verification-report binding")
  const record = ownDataRecord(value, OUTPUT_KEYS, OUTPUT_KEYS, "verification-report binding")
  const expected = buildP7PostApplyVerificationReportBinding(input)
  const claimedIdentity = sha256(record.bindingIdentity, "verification-report binding.bindingIdentity")
  if (claimedIdentity !== expected.bindingIdentity) {
    fail("verification-report binding.bindingIdentity", "does not match the canonical binding preimage")
  }

  const withoutIdentity: UnknownRecord = {}
  const expectedWithoutIdentity: UnknownRecord = {}
  for (const key of OUTPUT_KEYS) {
    if (key === "bindingIdentity") continue
    withoutIdentity[key] = record[key]
    expectedWithoutIdentity[key] = expected[key]
  }
  if (canonicalJson(withoutIdentity) !== canonicalJson(expectedWithoutIdentity)) {
    fail("verification-report binding", "does not match canonical source-derived semantics")
  }
  return expected
}
