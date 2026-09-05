import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

import {
  validateP7PostApplyVerificationPlanBinding,
  type P7PostApplyVerificationPlanBindingBuildInput,
  type P7VerificationCategory,
  type P7VerificationCommand,
} from "./p7-post-apply-verification-plan-binding.ts"
import {
  validateP7PostApplyVerificationReportBinding,
  type P7PostApplyVerificationReportBinding,
  type P7PostApplyVerificationReportBindingBuildInput,
  type P7VerificationReportEvidence,
} from "./p7-post-apply-verification-report-binding.ts"

export const P7_R7_VERIFICATION_FAILURE_DISPOSITION_BINDING_VERSION =
  "p7-r7-verification-failure-disposition-binding-v1" as const
export const P7_R7_VERIFICATION_FAILED_STATE = "VERIFICATION_FAILED" as const

export const P7_R7_VERIFICATION_FAILURE_LIMITS = Object.freeze({
  maxExecutableCodePoints: 4_096,
  maxArgCodePoints: 4_096,
  maxArgs: 64,
  maxEnvironmentEntries: 13,
  maxEnvironmentValueCodePoints: 8_192,
  maxPolicyReasonCodePoints: 4_096,
  maxFailureErrorCodePoints: 8_192,
  maxSummaryCodePoints: 4_096,
  maxEvidence: 256,
  maxEvidenceRefCodePoints: 1_024,
  maxJsonNodes: 16_384,
  maxJsonDepth: 24,
} as const)

export interface P7VerificationExecutionIntentPreimage {
  readonly resolvedExecutable: string
  readonly args: readonly string[]
  readonly allowedExitCodes: readonly number[]
  readonly maxOutputBytes: number
  readonly timeoutMs: number
  readonly env: Readonly<Record<string, string>>
}

export interface P7VerificationFailureDispositionBindingBuildInput {
  readonly sourceVerificationReportBinding: P7PostApplyVerificationReportBinding
  readonly sourceVerificationReportBindingInput: P7PostApplyVerificationReportBindingBuildInput
  readonly failedCommandId: string
  readonly executionIntentPreimage: unknown
  readonly executionReceipt: unknown
}

export interface P7VerificationFailureDispositionBinding {
  readonly version: typeof P7_R7_VERIFICATION_FAILURE_DISPOSITION_BINDING_VERSION
  readonly dispositionIdentity: string
  readonly state: typeof P7_R7_VERIFICATION_FAILED_STATE
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
  readonly failedCommandId: string
  readonly failedCommandCategory: P7VerificationCategory
  readonly failedCheckSummary: string
  readonly failedCheckEvidence: readonly P7VerificationReportEvidence[]
  readonly executionReceiptIdentity: string
  readonly executionReceiptId: string
  readonly executionInputDigest: string
  readonly executionResolvedExecutable: string
  readonly executionEnvironmentDigest: string
  readonly executionTimeoutMs: number
  readonly executionMaxOutputBytes: number
  readonly executionStartedAt: string
  readonly executionCompletedAt: string
  readonly executionFailureError: string
}

type UnknownRecord = Record<string, unknown>
type DispositionCore = Omit<P7VerificationFailureDispositionBinding, "dispositionIdentity">

type NormalizedIntent = {
  readonly resolvedExecutable: string
  readonly args: readonly string[]
  readonly allowedExitCodes: readonly [0]
  readonly maxOutputBytes: number
  readonly timeoutMs: number
  readonly env: Readonly<Record<string, string>>
  readonly inputDigest: string
  readonly environmentDigest: string
}

type NormalizedReceipt = {
  readonly receiptId: string
  readonly capability: string
  readonly inputDigest: string
  readonly paths: readonly []
  readonly policy: Readonly<{ decision: "allow"; reason: string }>
  readonly startedAt: string
  readonly completedAt: string
  readonly result: Readonly<{ status: "failure"; error: string }>
}

const SHA256 = /^[0-9a-f]{64}$/
const GIT_SHA1 = /^[0-9a-f]{40}$/
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const CANONICAL_TIMESTAMP = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$/
const COMMAND_ID = /^[a-z0-9][a-z0-9._-]{0,63}$/i
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/u
const WINDOWS_ABSOLUTE = /^[A-Za-z]:[\\/]/

const BUILD_KEYS = [
  "sourceVerificationReportBinding",
  "sourceVerificationReportBindingInput",
  "failedCommandId",
  "executionIntentPreimage",
  "executionReceipt",
] as const
const INTENT_KEYS = ["resolvedExecutable", "args", "allowedExitCodes", "maxOutputBytes", "timeoutMs", "env"] as const
const RECEIPT_KEYS = ["receiptId", "capability", "inputDigest", "paths", "policy", "startedAt", "completedAt", "result"] as const
const POLICY_KEYS = ["decision", "reason"] as const
const RESULT_KEYS = ["status", "error"] as const
const OUTPUT_KEYS = [
  "version", "dispositionIdentity", "state", "sourceVerificationReportBindingIdentity", "proposalIdentity",
  "authorizationIdentity", "intentBindingIdentity", "appliedEvidenceIdentity", "verificationPlanBindingIdentity",
  "repositoryIdentity", "canonicalBase", "targetHead", "postStateDigest", "verificationPlanDigest",
  "verificationReportIdentity", "verificationSessionId", "failedCommandId", "failedCommandCategory",
  "failedCheckSummary", "failedCheckEvidence", "executionReceiptIdentity", "executionReceiptId",
  "executionInputDigest", "executionResolvedExecutable", "executionEnvironmentDigest", "executionTimeoutMs",
  "executionMaxOutputBytes", "executionStartedAt", "executionCompletedAt", "executionFailureError",
] as const
const EVIDENCE_KEYS = ["kind", "ref", "digest"] as const
const ENV_KEYS = Object.freeze([
  "NODE_ENV", "KODAC_VERIFICATION", "NO_COLOR", "PATH", "Path", "SYSTEMROOT", "SystemRoot",
  "HOME", "USERPROFILE", "TMP", "TEMP", "TMPDIR",
] as const)
const ENV_KEY_SET = new Set<string>(ENV_KEYS)
const FIXED_ENV = Object.freeze({ NODE_ENV: "test", KODAC_VERIFICATION: "1", NO_COLOR: "1" } as const)

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

function boundedUnicodeText(value: unknown, label: string, maxCodePoints: number): string {
  if (typeof value !== "string") fail(label, "must be a string")
  assertUnicodeScalars(value, label)
  if (codePointLength(value) < 1 || codePointLength(value) > maxCodePoints) {
    fail(label, `must contain between 1 and ${maxCodePoints} code points`)
  }
  return value
}

function boundedInertText(value: unknown, label: string, maxCodePoints: number): string {
  const text = boundedUnicodeText(value, label, maxCodePoints)
  if (CONTROL_CHARACTERS.test(text)) fail(label, "must not contain control characters")
  return text
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
  for (const key of requiredKeys) {
    if (!Object.hasOwn(result, key)) fail(label, `is missing required field: ${key}`)
  }
  return result
}

function denseArray(value: unknown, label: string, maxItems: number): readonly unknown[] {
  if (!Array.isArray(value) || nodeTypes.isProxy(value)) fail(label, "must be a non-proxy array")
  if (value.length > maxItems) fail(label, `must contain no more than ${maxItems} items`)
  const keys = Reflect.ownKeys(value)
  for (const key of keys) {
    if (typeof key === "symbol") fail(label, "must not contain symbol fields")
    if (key === "length") continue
    if (!/^(0|[1-9][0-9]*)$/.test(key)) fail(label, `contains non-index field: ${key}`)
    const index = Number(key)
    if (!Number.isSafeInteger(index) || index < 0 || index >= value.length) fail(label, "contains an invalid array index")
    const descriptor = Object.getOwnPropertyDescriptor(value, key)
    if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
      fail(`${label}[${key}]`, "must be an enumerable data property")
    }
  }
  for (let index = 0; index < value.length; index += 1) {
    if (!Object.hasOwn(value, index)) fail(label, "must not contain sparse entries")
  }
  return value
}

function assertSafeJsonGraph(value: unknown, label: string): void {
  const stack: { value: unknown; depth: number; label: string }[] = [{ value, depth: 0, label }]
  const seen = new Set<object>()
  let nodes = 0
  while (stack.length > 0) {
    const current = stack.pop()!
    nodes += 1
    if (nodes > P7_R7_VERIFICATION_FAILURE_LIMITS.maxJsonNodes) fail(label, "exceeds the JSON node budget")
    if (current.depth > P7_R7_VERIFICATION_FAILURE_LIMITS.maxJsonDepth) fail(label, "exceeds the JSON depth budget")
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
      const values = denseArray(item, current.label, P7_R7_VERIFICATION_FAILURE_LIMITS.maxJsonNodes)
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

function canonicalTimestamp(value: unknown, label: string): string {
  if (typeof value !== "string" || !CANONICAL_TIMESTAMP.test(value)) fail(label, "must be a canonical UTC timestamp")
  const parsed = Date.parse(value)
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) fail(label, "must be a valid canonical UTC timestamp")
  return value
}

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) fail(label, "must be a lowercase SHA-256 digest")
  return value
}

function gitSha1(value: unknown, label: string): string {
  if (typeof value !== "string" || !GIT_SHA1.test(value)) fail(label, "must be a lowercase 40-hex Git identity")
  return value
}

function uuidV4(value: unknown, label: string): string {
  if (typeof value !== "string" || !UUID_V4.test(value)) fail(label, "must be a canonical lowercase UUID v4")
  return value
}

function positiveInteger(value: unknown, label: string, max: number): number {
  if (!Number.isSafeInteger(value) || typeof value !== "number" || value <= 0 || value > max) {
    fail(label, `must be a positive safe integer no greater than ${max}`)
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

function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value)
    for (const child of Object.values(value as UnknownRecord)) deepFreeze(child)
  }
  return value
}

function portableSegments(value: string): readonly string[] {
  return value.replaceAll("\\", "/").split("/")
}

function compatibleExecutable(value: unknown, command: P7VerificationCommand): string {
  const executable = boundedInertText(value, "executionIntentPreimage.resolvedExecutable", P7_R7_VERIFICATION_FAILURE_LIMITS.maxExecutableCodePoints)
  const lower = executable.toLowerCase()
  if (command.executable === "node") {
    if (!executable.startsWith("/") && !WINDOWS_ABSOLUTE.test(executable)) {
      fail("executionIntentPreimage.resolvedExecutable", "must be an absolute node executable path")
    }
    const segments = portableSegments(executable)
    if (segments.some((segment) => segment === "." || segment === "..")) {
      fail("executionIntentPreimage.resolvedExecutable", "must not contain dot traversal segments")
    }
    const basename = segments.at(-1)?.toLowerCase()
    if (basename !== "node" && basename !== "node.exe") {
      fail("executionIntentPreimage.resolvedExecutable", "must resolve the node semantic executable")
    }
    return executable
  }
  const expected = command.executable === "python"
    ? new Set(["python3", "python.exe"])
    : command.executable === "cargo"
      ? new Set(["cargo", "cargo.exe"])
      : new Set(["go", "go.exe"])
  if (!expected.has(lower)) fail("executionIntentPreimage.resolvedExecutable", `must resolve the ${command.executable} semantic executable`)
  return executable
}

function canonicalEnvironment(value: unknown): Readonly<Record<string, string>> {
  const record = ownDataRecord(value, ENV_KEYS, ["NODE_ENV", "KODAC_VERIFICATION", "NO_COLOR"], "executionIntentPreimage.env")
  if (Object.keys(record).length > P7_R7_VERIFICATION_FAILURE_LIMITS.maxEnvironmentEntries) {
    fail("executionIntentPreimage.env", "exceeds the environment entry budget")
  }
  for (const key of Object.keys(record)) {
    if (!ENV_KEY_SET.has(key)) fail("executionIntentPreimage.env", `contains unsupported key: ${key}`)
  }
  for (const [key, expected] of Object.entries(FIXED_ENV)) {
    if (record[key] !== expected) fail(`executionIntentPreimage.env.${key}`, `must equal ${expected}`)
  }
  const normalized: Record<string, string> = {}
  for (const key of Object.keys(record).sort(compareStrings)) {
    normalized[key] = boundedUnicodeText(
      record[key],
      `executionIntentPreimage.env.${key}`,
      P7_R7_VERIFICATION_FAILURE_LIMITS.maxEnvironmentValueCodePoints,
    )
  }
  return Object.freeze(normalized)
}

function exactStringArray(value: unknown, label: string, expected: readonly string[]): readonly string[] {
  const values = denseArray(value, label, P7_R7_VERIFICATION_FAILURE_LIMITS.maxArgs)
  if (values.length !== expected.length) fail(label, "must exactly match the planned command args")
  const normalized = values.map((entry, index) => boundedUnicodeText(
    entry,
    `${label}[${index}]`,
    P7_R7_VERIFICATION_FAILURE_LIMITS.maxArgCodePoints,
  ))
  for (let index = 0; index < expected.length; index += 1) {
    if (normalized[index] !== expected[index]) fail(label, "must exactly match the planned command args")
  }
  return Object.freeze(normalized)
}

function normalizedIntent(value: unknown, command: P7VerificationCommand): NormalizedIntent {
  const record = ownDataRecord(value, INTENT_KEYS, INTENT_KEYS, "executionIntentPreimage")
  const resolvedExecutable = compatibleExecutable(record.resolvedExecutable, command)
  const args = exactStringArray(record.args, "executionIntentPreimage.args", command.args)
  const rawExitCodes = denseArray(record.allowedExitCodes, "executionIntentPreimage.allowedExitCodes", 1)
  if (rawExitCodes.length !== 1 || rawExitCodes[0] !== 0) {
    fail("executionIntentPreimage.allowedExitCodes", "must equal [0]")
  }
  const expectedTimeoutMs = command.timeoutMs ?? 30_000
  const expectedMaxOutputBytes = command.maxOutputBytes ?? 512 * 1024
  const timeoutMs = positiveInteger(record.timeoutMs, "executionIntentPreimage.timeoutMs", 120_000)
  const maxOutputBytes = positiveInteger(record.maxOutputBytes, "executionIntentPreimage.maxOutputBytes", 1_048_576)
  if (timeoutMs !== expectedTimeoutMs) fail("executionIntentPreimage.timeoutMs", "must match the exact verification-engine materialization")
  if (maxOutputBytes !== expectedMaxOutputBytes) fail("executionIntentPreimage.maxOutputBytes", "must match the exact verification-engine materialization")
  const env = canonicalEnvironment(record.env)
  const gatewayPreimage = {
    executable: resolvedExecutable,
    args: [...args],
    allowedExitCodes: [0],
    maxOutputBytes,
    timeoutMs,
    env,
  }
  return Object.freeze({
    resolvedExecutable,
    args,
    allowedExitCodes: Object.freeze([0]) as readonly [0],
    maxOutputBytes,
    timeoutMs,
    env,
    inputDigest: hashText(JSON.stringify(gatewayPreimage)),
    environmentDigest: hashText(canonicalJson(env)),
  })
}

function normalizedReceipt(value: unknown, failedCommandId: string, intent: NormalizedIntent): NormalizedReceipt {
  const record = ownDataRecord(value, RECEIPT_KEYS, RECEIPT_KEYS, "executionReceipt")
  const receiptId = uuidV4(record.receiptId, "executionReceipt.receiptId")
  const capability = boundedInertText(record.capability, "executionReceipt.capability", 256)
  if (capability !== `verification.command.${failedCommandId}`) {
    fail("executionReceipt.capability", "must match the exact failed planned verification command")
  }
  const inputDigest = sha256(record.inputDigest, "executionReceipt.inputDigest")
  if (inputDigest !== intent.inputDigest) fail("executionReceipt.inputDigest", "must match the reconstructed gateway command intent")
  const paths = denseArray(record.paths, "executionReceipt.paths", 0)
  if (paths.length !== 0) fail("executionReceipt.paths", "must equal []")
  const policy = ownDataRecord(record.policy, POLICY_KEYS, POLICY_KEYS, "executionReceipt.policy")
  if (policy.decision !== "allow") fail("executionReceipt.policy.decision", "must equal allow")
  const policyReason = boundedUnicodeText(
    policy.reason,
    "executionReceipt.policy.reason",
    P7_R7_VERIFICATION_FAILURE_LIMITS.maxPolicyReasonCodePoints,
  )
  const startedAt = canonicalTimestamp(record.startedAt, "executionReceipt.startedAt")
  const completedAt = canonicalTimestamp(record.completedAt, "executionReceipt.completedAt")
  if (Date.parse(completedAt) < Date.parse(startedAt)) fail("executionReceipt.completedAt", "must not precede startedAt")
  const result = ownDataRecord(record.result, RESULT_KEYS, RESULT_KEYS, "executionReceipt.result")
  if (result.status !== "failure") fail("executionReceipt.result.status", "must equal failure")
  const error = boundedUnicodeText(
    result.error,
    "executionReceipt.result.error",
    P7_R7_VERIFICATION_FAILURE_LIMITS.maxFailureErrorCodePoints,
  )
  return deepFreeze({
    receiptId,
    capability,
    inputDigest,
    paths: Object.freeze([]) as readonly [],
    policy: Object.freeze({ decision: "allow" as const, reason: policyReason }),
    startedAt,
    completedAt,
    result: Object.freeze({ status: "failure" as const, error }),
  })
}

function normalizedEvidence(value: readonly P7VerificationReportEvidence[]): readonly P7VerificationReportEvidence[] {
  if (value.length > P7_R7_VERIFICATION_FAILURE_LIMITS.maxEvidence) fail("failedCheckEvidence", "exceeds the evidence budget")
  const output = value.map((item, index) => {
    const record = ownDataRecord(item, EVIDENCE_KEYS, ["kind", "ref"], `failedCheckEvidence[${index}]`)
    const kind = boundedInertText(record.kind, `failedCheckEvidence[${index}].kind`, 32)
    if (kind !== "receipt" && kind !== "artifact" && kind !== "event" && kind !== "workspace") {
      fail(`failedCheckEvidence[${index}].kind`, "is unsupported")
    }
    const evidence: { kind: P7VerificationReportEvidence["kind"]; ref: string; digest?: string } = {
      kind,
      ref: boundedInertText(
        record.ref,
        `failedCheckEvidence[${index}].ref`,
        P7_R7_VERIFICATION_FAILURE_LIMITS.maxEvidenceRefCodePoints,
      ),
    }
    if (Object.hasOwn(record, "digest")) evidence.digest = sha256(record.digest, `failedCheckEvidence[${index}].digest`)
    return Object.freeze(evidence)
  })
  return Object.freeze(output)
}

function dispositionIdentity(core: DispositionCore): string {
  return hashText(canonicalJson(core))
}

function normalizedBuildCore(value: unknown): DispositionCore {
  assertSafeJsonGraph(value, "verification-failure disposition build input")
  const input = ownDataRecord(value, BUILD_KEYS, BUILD_KEYS, "verification-failure disposition build input")
  const sourceInput = input.sourceVerificationReportBindingInput as P7PostApplyVerificationReportBindingBuildInput
  const source = validateP7PostApplyVerificationReportBinding(input.sourceVerificationReportBinding, sourceInput)
  if (source.verificationReportPassed !== false || source.verificationReport.passed !== false) {
    fail("sourceVerificationReportBinding.verificationReportPassed", "must equal false")
  }

  const sourcePlan = validateP7PostApplyVerificationPlanBinding(
    sourceInput.sourceVerificationPlanBinding,
    sourceInput.sourceVerificationPlanBindingInput as P7PostApplyVerificationPlanBindingBuildInput,
  )
  const failedCommandId = boundedInertText(input.failedCommandId, "failedCommandId", 64)
  if (!COMMAND_ID.test(failedCommandId)) fail("failedCommandId", "must match the P7 command id grammar")
  const command = sourcePlan.verificationPlan.commands.find((candidate) => candidate.id === failedCommandId)
  if (!command) fail("failedCommandId", "must identify an exact command in the P7-R5 plan")
  const check = source.verificationReport.checks.find((candidate) => candidate.id === `command.${failedCommandId}`)
  if (!check) fail("sourceVerificationReportBinding.verificationReport", "is missing the selected planned command check")
  if (check.category !== command.category) fail("selected failed command check.category", "must match the exact P7-R5 command category")
  if (check.status !== "fail") fail("selected failed command check.status", "must equal fail")

  const intent = normalizedIntent(input.executionIntentPreimage, command)
  const receipt = normalizedReceipt(input.executionReceipt, failedCommandId, intent)
  if (!check.evidence.some((item) => item.kind === "receipt" && item.ref === receipt.receiptId)) {
    fail("selected failed command check.evidence", "must reference the exact supplied failure receipt id")
  }

  const failedCheckEvidence = normalizedEvidence(check.evidence)
  const receiptIdentity = hashText(canonicalJson(receipt))

  return deepFreeze({
    version: P7_R7_VERIFICATION_FAILURE_DISPOSITION_BINDING_VERSION,
    state: P7_R7_VERIFICATION_FAILED_STATE,
    sourceVerificationReportBindingIdentity: source.bindingIdentity,
    proposalIdentity: source.proposalIdentity,
    authorizationIdentity: source.authorizationIdentity,
    intentBindingIdentity: source.intentBindingIdentity,
    appliedEvidenceIdentity: source.appliedEvidenceIdentity,
    verificationPlanBindingIdentity: source.verificationPlanBindingIdentity,
    repositoryIdentity: boundedInertText(source.repositoryIdentity, "source.repositoryIdentity", 1_024),
    canonicalBase: gitSha1(source.canonicalBase, "source.canonicalBase"),
    targetHead: gitSha1(source.targetHead, "source.targetHead"),
    postStateDigest: sha256(source.postStateDigest, "source.postStateDigest"),
    verificationPlanDigest: sha256(source.verificationPlanDigest, "source.verificationPlanDigest"),
    verificationReportIdentity: sha256(source.verificationReportIdentity, "source.verificationReportIdentity"),
    verificationSessionId: boundedInertText(source.verificationSessionId, "source.verificationSessionId", 256),
    failedCommandId,
    failedCommandCategory: command.category,
    failedCheckSummary: boundedInertText(check.summary, "selected failed command check.summary", P7_R7_VERIFICATION_FAILURE_LIMITS.maxSummaryCodePoints),
    failedCheckEvidence,
    executionReceiptIdentity: receiptIdentity,
    executionReceiptId: receipt.receiptId,
    executionInputDigest: receipt.inputDigest,
    executionResolvedExecutable: intent.resolvedExecutable,
    executionEnvironmentDigest: intent.environmentDigest,
    executionTimeoutMs: intent.timeoutMs,
    executionMaxOutputBytes: intent.maxOutputBytes,
    executionStartedAt: receipt.startedAt,
    executionCompletedAt: receipt.completedAt,
    executionFailureError: receipt.result.error,
  })
}

export function p7VerificationFailureDispositionIdentity(
  input: P7VerificationFailureDispositionBindingBuildInput,
): string {
  return dispositionIdentity(normalizedBuildCore(input))
}

export function buildP7VerificationFailureDispositionBinding(
  input: P7VerificationFailureDispositionBindingBuildInput,
): P7VerificationFailureDispositionBinding {
  const core = normalizedBuildCore(input)
  return deepFreeze({ ...core, dispositionIdentity: dispositionIdentity(core) })
}

export function validateP7VerificationFailureDispositionBinding(
  value: unknown,
  input: P7VerificationFailureDispositionBindingBuildInput,
): P7VerificationFailureDispositionBinding {
  assertSafeJsonGraph(value, "verification-failure disposition")
  const record = ownDataRecord(value, OUTPUT_KEYS, OUTPUT_KEYS, "verification-failure disposition")
  const expected = buildP7VerificationFailureDispositionBinding(input)
  const claimedIdentity = sha256(record.dispositionIdentity, "verification-failure disposition.dispositionIdentity")
  if (claimedIdentity !== expected.dispositionIdentity) {
    fail("verification-failure disposition.dispositionIdentity", "does not match the canonical source-derived preimage")
  }
  const withoutIdentity: UnknownRecord = {}
  const expectedWithoutIdentity: UnknownRecord = {}
  for (const key of OUTPUT_KEYS) {
    if (key === "dispositionIdentity") continue
    withoutIdentity[key] = record[key]
    expectedWithoutIdentity[key] = expected[key]
  }
  if (canonicalJson(withoutIdentity) !== canonicalJson(expectedWithoutIdentity)) {
    fail("verification-failure disposition", "does not match canonical source-derived semantics")
  }
  return expected
}
