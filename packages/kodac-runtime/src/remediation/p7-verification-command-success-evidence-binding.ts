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

export const P7_R8_VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BINDING_VERSION =
  "p7-r8-verification-command-success-evidence-binding-v1" as const
export const P7_R8_VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND_STATE =
  "VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND" as const

export const P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS = Object.freeze({
  maxCommands: 8,
  maxExecutableCodePoints: 4_096,
  maxArgCodePoints: 4_096,
  maxArgs: 64,
  maxEnvironmentEntries: 12,
  maxEnvironmentValueCodePoints: 8_192,
  maxPolicyReasonCodePoints: 4_096,
  maxSummaryCodePoints: 4_096,
  maxEvidence: 256,
  maxEvidenceRefCodePoints: 1_024,
  maxReceiptOutputBytes: 2_097_153,
  maxJsonNodes: 65_536,
  maxJsonDepth: 28,
} as const)

export interface P7VerificationCommandSuccessExecutionIntentPreimage {
  readonly resolvedExecutable: string
  readonly args: readonly string[]
  readonly allowedExitCodes: readonly number[]
  readonly maxOutputBytes: number
  readonly timeoutMs: number
  readonly env: Readonly<Record<string, string>>
}

export interface P7VerificationCommandSuccessEvidenceInput {
  readonly commandId: string
  readonly executionIntentPreimage: P7VerificationCommandSuccessExecutionIntentPreimage
  readonly executionReceipt: unknown
}

export interface P7VerificationCommandSuccessEvidenceBindingBuildInput {
  readonly sourceVerificationReportBinding: P7PostApplyVerificationReportBinding
  readonly sourceVerificationReportBindingInput: P7PostApplyVerificationReportBindingBuildInput
  readonly commandExecutionEvidence: readonly P7VerificationCommandSuccessEvidenceInput[]
}

export interface P7VerificationCommandSuccessEvidenceRecord {
  readonly commandId: string
  readonly commandCategory: P7VerificationCategory
  readonly checkSummary: string
  readonly checkEvidence: readonly P7VerificationReportEvidence[]
  readonly executionReceiptIdentity: string
  readonly executionReceiptId: string
  readonly executionInputDigest: string
  readonly executionResolvedExecutable: string
  readonly executionEnvironmentDigest: string
  readonly executionTimeoutMs: number
  readonly executionMaxOutputBytes: number
  readonly executionStartedAt: string
  readonly executionCompletedAt: string
  readonly executionOutputDigest: string
  readonly executionOutputBytes: number
  readonly executionExitCode: 0
}

export interface P7VerificationCommandSuccessEvidenceBinding {
  readonly version: typeof P7_R8_VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BINDING_VERSION
  readonly evidenceIdentity: string
  readonly state: typeof P7_R8_VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND_STATE
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
  readonly verificationStartedAt: string
  readonly verificationCompletedAt: string
  readonly commandCount: number
  readonly testCommandCount: number
  readonly commands: readonly P7VerificationCommandSuccessEvidenceRecord[]
}

type UnknownRecord = Record<string, unknown>
type EvidenceCore = Omit<P7VerificationCommandSuccessEvidenceBinding, "evidenceIdentity">

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
  readonly policy: Readonly<{ readonly decision: "allow"; readonly reason: string }>
  readonly startedAt: string
  readonly completedAt: string
  readonly result: Readonly<{
    readonly status: "success"
    readonly outputDigest: string
    readonly outputBytes: number
    readonly exitCode: 0
  }>
}

const SHA256 = /^[0-9a-f]{64}$/
const GIT_OBJECT = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const CANONICAL_TIMESTAMP = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$/
const COMMAND_ID = /^[a-z0-9][a-z0-9._-]{0,63}$/i
const WINDOWS_ABSOLUTE = /^[A-Za-z]:[\\/]/

const BUILD_KEYS = [
  "sourceVerificationReportBinding",
  "sourceVerificationReportBindingInput",
  "commandExecutionEvidence",
] as const
const COMMAND_EVIDENCE_KEYS = ["commandId", "executionIntentPreimage", "executionReceipt"] as const
const INTENT_KEYS = ["resolvedExecutable", "args", "allowedExitCodes", "maxOutputBytes", "timeoutMs", "env"] as const
const RECEIPT_KEYS = ["receiptId", "capability", "inputDigest", "paths", "policy", "startedAt", "completedAt", "result"] as const
const POLICY_KEYS = ["decision", "reason"] as const
const RESULT_KEYS = ["status", "outputDigest", "outputBytes", "exitCode"] as const
const EVIDENCE_ALLOWED_KEYS = ["kind", "ref", "digest"] as const
const EVIDENCE_REQUIRED_KEYS = ["kind", "ref"] as const
const OUTPUT_KEYS = [
  "version", "evidenceIdentity", "state", "sourceVerificationReportBindingIdentity", "proposalIdentity",
  "authorizationIdentity", "intentBindingIdentity", "appliedEvidenceIdentity", "verificationPlanBindingIdentity",
  "repositoryIdentity", "canonicalBase", "targetHead", "postStateDigest", "verificationPlanDigest",
  "verificationReportIdentity", "verificationSessionId", "verificationStartedAt", "verificationCompletedAt",
  "commandCount", "testCommandCount", "commands",
] as const

const ENV_KEYS = Object.freeze([
  "NODE_ENV", "KODAC_VERIFICATION", "NO_COLOR", "PATH", "Path", "SYSTEMROOT", "SystemRoot",
  "HOME", "USERPROFILE", "TMP", "TEMP", "TMPDIR",
] as const)
const FIXED_ENV = Object.freeze({ NODE_ENV: "test", KODAC_VERIFICATION: "1", NO_COLOR: "1" } as const)
const EVIDENCE_KINDS = new Set<string>(["receipt", "artifact", "event", "workspace"])

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

function unicodeText(
  value: unknown,
  label: string,
  maxCodePoints: number,
  options: { readonly allowEmpty?: boolean } = {},
): string {
  if (typeof value !== "string") fail(label, "must be a string")
  assertUnicodeScalars(value, label)
  if (!options.allowEmpty && value.length === 0) fail(label, "must not be empty")
  if (codePointLength(value) > maxCodePoints) fail(label, `exceeds ${maxCodePoints} Unicode code points`)
  return value
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
  if (Object.getPrototypeOf(value) !== Array.prototype) fail(label, "must use the ordinary Array prototype")
  const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length")
  if (
    lengthDescriptor === undefined ||
    !("value" in lengthDescriptor) ||
    typeof lengthDescriptor.value !== "number" ||
    !Number.isSafeInteger(lengthDescriptor.value) ||
    lengthDescriptor.value < 0 ||
    lengthDescriptor.value > maxItems
  ) {
    fail(label, `must expose an ordinary length from 0 through ${maxItems}`)
  }
  const length = lengthDescriptor.value
  const expected = new Set<string>(["length"])
  for (let index = 0; index < length; index += 1) expected.add(String(index))
  const keys = Reflect.ownKeys(value)
  if (keys.length !== expected.size) fail(label, "must not contain sparse or extra array properties")
  for (const key of keys) {
    if (typeof key !== "string" || !expected.has(key)) {
      fail(label, "must not contain symbol, sparse, or extra array properties")
    }
    if (key === "length") continue
    const descriptor = Object.getOwnPropertyDescriptor(value, key)
    if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
      fail(`${label}[${key}]`, "must be an enumerable data property")
    }
  }
  const result: unknown[] = []
  for (let index = 0; index < length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index))
    if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
      fail(`${label}[${index}]`, "must be a dense enumerable data property")
    }
    result.push(descriptor.value)
  }
  return result
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
    if (nodes > P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxJsonNodes) fail(label, "exceeds the JSON node budget")
    if (current.depth > P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxJsonDepth) fail(label, "exceeds the JSON depth budget")

    const item = current.value
    if (item === null || typeof item === "boolean") continue
    if (typeof item === "string") {
      assertUnicodeScalars(item, current.label)
      continue
    }
    if (typeof item === "number") {
      if (!Number.isSafeInteger(item) || !Number.isFinite(item) || Object.is(item, -0)) {
        fail(current.label, "must contain only finite safe integers other than negative zero")
      }
      continue
    }
    if (typeof item !== "object") fail(current.label, "must contain only JSON-compatible values")
    if (nodeTypes.isProxy(item)) fail(current.label, "must not contain Proxy objects")
    if (seen.has(item)) fail(current.label, "must not contain cycles or aliases")
    seen.add(item)

    if (Array.isArray(item)) {
      const values = denseArray(item, current.label, P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxJsonNodes)
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
  if (typeof value !== "string" || !CANONICAL_TIMESTAMP.test(value)) {
    fail(label, "must be a canonical ISO-8601 UTC timestamp")
  }
  const parsed = Date.parse(value)
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) {
    fail(label, "must be a valid canonical ISO-8601 UTC timestamp")
  }
  return value
}

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) fail(label, "must be 64 lowercase hexadecimal characters")
  return value
}

function gitObject(value: unknown, label: string): string {
  if (typeof value !== "string" || !GIT_OBJECT.test(value)) fail(label, "must be a full lowercase Git object id")
  return value
}

function uuidV4(value: unknown, label: string): string {
  if (typeof value !== "string" || !UUID_V4.test(value)) fail(label, "must be a canonical lowercase UUID v4")
  return value
}

function positiveInteger(value: unknown, label: string, max: number): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || Object.is(value, -0) || value <= 0 || value > max) {
    fail(label, `must be a positive safe integer no greater than ${max}`)
  }
  return value
}

function nonNegativeInteger(value: unknown, label: string, max: number): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || Object.is(value, -0) || value < 0 || value > max) {
    fail(label, `must be a non-negative safe integer no greater than ${max}`)
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

function processPlatformExecutable(kind: "python" | "cargo" | "go"): ReadonlySet<string> {
  if (kind === "python") return new Set<string>(["python3", "python.exe"])
  if (kind === "cargo") return new Set<string>(["cargo", "cargo.exe"])
  return new Set<string>(["go", "go.exe"])
}

function compatibleExecutable(value: unknown, command: P7VerificationCommand, label: string): string {
  const executable = unicodeText(
    value,
    label,
    P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxExecutableCodePoints,
  )
  if (command.executable === "node") {
    if (!executable.startsWith("/") && !WINDOWS_ABSOLUTE.test(executable)) {
      fail(label, "must be an absolute node executable path")
    }
    const segments = executable.replaceAll("\\", "/").split("/")
    if (segments.some((segment) => segment === "." || segment === "..")) {
      fail(label, "must not contain dot traversal segments")
    }
    const basename = segments.at(-1)?.toLowerCase()
    if (basename !== "node" && basename !== "node.exe") {
      fail(label, "must resolve the node semantic executable")
    }
    return executable
  }
  const expected = command.executable === "python"
    ? processPlatformExecutable("python")
    : command.executable === "cargo"
      ? processPlatformExecutable("cargo")
      : processPlatformExecutable("go")
  if (!expected.has(executable)) fail(label, `must be a current ${command.executable} resolver value`)
  return executable
}

function canonicalEnvironment(value: unknown, label: string): Readonly<Record<string, string>> {
  const record = ownDataRecord(value, ENV_KEYS, ["NODE_ENV", "KODAC_VERIFICATION", "NO_COLOR"], label)
  if (Object.keys(record).length > P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxEnvironmentEntries) {
    fail(label, "exceeds the environment entry budget")
  }
  for (const [key, expected] of Object.entries(FIXED_ENV)) {
    if (record[key] !== expected) fail(`${label}.${key}`, `must equal ${expected}`)
  }
  const normalized: Record<string, string> = {}
  for (const key of Object.keys(record).sort(compareStrings)) {
    normalized[key] = unicodeText(
      record[key],
      `${label}.${key}`,
      P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxEnvironmentValueCodePoints,
      { allowEmpty: true },
    )
  }
  return Object.freeze(normalized)
}

function exactStringArray(value: unknown, label: string, expected: readonly string[]): readonly string[] {
  const values = denseArray(value, label, P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxArgs)
  if (values.length !== expected.length) fail(label, "must exactly match the planned command args")
  const normalized = values.map((entry, index) => unicodeText(
    entry,
    `${label}[${index}]`,
    P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxArgCodePoints,
    { allowEmpty: true },
  ))
  for (let index = 0; index < expected.length; index += 1) {
    if (normalized[index] !== expected[index]) fail(label, "must exactly match the planned command args")
  }
  return Object.freeze(normalized)
}

function normalizedIntent(value: unknown, command: P7VerificationCommand, label: string): NormalizedIntent {
  const record = ownDataRecord(value, INTENT_KEYS, INTENT_KEYS, label)
  const resolvedExecutable = compatibleExecutable(record.resolvedExecutable, command, `${label}.resolvedExecutable`)
  const args = exactStringArray(record.args, `${label}.args`, command.args)
  const rawExitCodes = denseArray(record.allowedExitCodes, `${label}.allowedExitCodes`, 1)
  if (rawExitCodes.length !== 1 || rawExitCodes[0] !== 0) fail(`${label}.allowedExitCodes`, "must equal [0]")
  const expectedTimeoutMs = command.timeoutMs ?? 30_000
  const expectedMaxOutputBytes = command.maxOutputBytes ?? 512 * 1024
  const timeoutMs = positiveInteger(record.timeoutMs, `${label}.timeoutMs`, 120_000)
  const maxOutputBytes = positiveInteger(record.maxOutputBytes, `${label}.maxOutputBytes`, 1_048_576)
  if (timeoutMs !== expectedTimeoutMs) fail(`${label}.timeoutMs`, "must match the exact verification-engine materialization")
  if (maxOutputBytes !== expectedMaxOutputBytes) {
    fail(`${label}.maxOutputBytes`, "must match the exact verification-engine materialization")
  }
  const env = canonicalEnvironment(record.env, `${label}.env`)
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

function normalizedReceipt(
  value: unknown,
  commandId: string,
  intent: NormalizedIntent,
  label: string,
): NormalizedReceipt {
  const record = ownDataRecord(value, RECEIPT_KEYS, RECEIPT_KEYS, label)
  const receiptId = uuidV4(record.receiptId, `${label}.receiptId`)
  const capability = unicodeText(record.capability, `${label}.capability`, 256)
  if (capability !== `verification.command.${commandId}`) {
    fail(`${label}.capability`, "must match the exact planned verification command")
  }
  const inputDigest = sha256(record.inputDigest, `${label}.inputDigest`)
  if (inputDigest !== intent.inputDigest) fail(`${label}.inputDigest`, "must match the reconstructed gateway command intent")
  const paths = denseArray(record.paths, `${label}.paths`, 0)
  if (paths.length !== 0) fail(`${label}.paths`, "must equal []")
  const policy = ownDataRecord(record.policy, POLICY_KEYS, POLICY_KEYS, `${label}.policy`)
  if (policy.decision !== "allow") fail(`${label}.policy.decision`, "must equal allow")
  const policyReason = unicodeText(
    policy.reason,
    `${label}.policy.reason`,
    P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxPolicyReasonCodePoints,
    { allowEmpty: true },
  )
  const startedAt = canonicalTimestamp(record.startedAt, `${label}.startedAt`)
  const completedAt = canonicalTimestamp(record.completedAt, `${label}.completedAt`)
  if (Date.parse(completedAt) < Date.parse(startedAt)) fail(`${label}.completedAt`, "must not precede startedAt")
  const result = ownDataRecord(record.result, RESULT_KEYS, RESULT_KEYS, `${label}.result`)
  if (result.status !== "success") fail(`${label}.result.status`, "must equal success")
  const outputDigest = sha256(result.outputDigest, `${label}.result.outputDigest`)
  const outputBytes = nonNegativeInteger(
    result.outputBytes,
    `${label}.result.outputBytes`,
    P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxReceiptOutputBytes,
  )
  if (result.exitCode !== 0) fail(`${label}.result.exitCode`, "must equal 0")
  return deepFreeze({
    receiptId,
    capability,
    inputDigest,
    paths: Object.freeze([]) as readonly [],
    policy: Object.freeze({ decision: "allow" as const, reason: policyReason }),
    startedAt,
    completedAt,
    result: Object.freeze({ status: "success" as const, outputDigest, outputBytes, exitCode: 0 as const }),
  })
}

function normalizedEvidence(
  value: readonly P7VerificationReportEvidence[],
  label: string,
): readonly P7VerificationReportEvidence[] {
  if (value.length > P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxEvidence) fail(label, "exceeds the evidence budget")
  const output = value.map((item, index) => {
    const itemLabel = `${label}[${index}]`
    const record = ownDataRecord(item, EVIDENCE_ALLOWED_KEYS, EVIDENCE_REQUIRED_KEYS, itemLabel)
    if (typeof record.kind !== "string" || !EVIDENCE_KINDS.has(record.kind)) fail(`${itemLabel}.kind`, "is unsupported")
    const evidence: { kind: P7VerificationReportEvidence["kind"]; ref: string; digest?: string } = {
      kind: record.kind as P7VerificationReportEvidence["kind"],
      ref: unicodeText(record.ref, `${itemLabel}.ref`, P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxEvidenceRefCodePoints),
    }
    if (Object.hasOwn(record, "digest")) evidence.digest = sha256(record.digest, `${itemLabel}.digest`)
    return Object.freeze(evidence)
  })
  output.sort((left, right) =>
    compareStrings(left.kind, right.kind) ||
    compareStrings(left.ref, right.ref) ||
    compareStrings(left.digest ?? "", right.digest ?? ""),
  )
  const keys = output.map((item) => `${item.kind}\u0000${item.ref}\u0000${item.digest ?? ""}`)
  if (new Set(keys).size !== keys.length) fail(label, "must not contain duplicate evidence references")
  return Object.freeze(output)
}

function evidenceIdentity(core: EvidenceCore): string {
  return hashText(canonicalJson(core))
}

function normalizedBuildCore(value: unknown): EvidenceCore {
  assertSafeJsonGraph(value, "verification-command success evidence build input")
  const input = ownDataRecord(value, BUILD_KEYS, BUILD_KEYS, "verification-command success evidence build input")
  const sourceInput = input.sourceVerificationReportBindingInput as P7PostApplyVerificationReportBindingBuildInput
  const source = validateP7PostApplyVerificationReportBinding(input.sourceVerificationReportBinding, sourceInput)
  if (source.verificationReportPassed !== true || source.verificationReport.passed !== true) {
    fail("sourceVerificationReportBinding.verificationReportPassed", "must equal true")
  }
  if (source.verificationReport.checks.some((check) => check.status !== "pass")) {
    fail("sourceVerificationReportBinding.verificationReport.checks", "must all be pass")
  }

  const sourcePlan = validateP7PostApplyVerificationPlanBinding(
    sourceInput.sourceVerificationPlanBinding,
    sourceInput.sourceVerificationPlanBindingInput as P7PostApplyVerificationPlanBindingBuildInput,
  )
  if (sourcePlan.bindingIdentity !== source.verificationPlanBindingIdentity) {
    fail("sourceVerificationReportBinding.verificationPlanBindingIdentity", "must match the exact revalidated P7-R5 binding")
  }
  const commands = sourcePlan.verificationPlan.commands
  if (commands.length === 0) fail("sourceVerificationPlanBinding.verificationPlan.commands", "must contain at least one command")
  if (!commands.some((command) => command.category === "tests")) {
    fail("sourceVerificationPlanBinding.verificationPlan.commands", "must contain at least one tests-category command")
  }

  const rawEvidence = denseArray(
    input.commandExecutionEvidence,
    "commandExecutionEvidence",
    P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxCommands,
  )
  if (rawEvidence.length !== commands.length) {
    fail("commandExecutionEvidence", "must contain exactly one entry for every exact P7-R5 planned command")
  }

  const commandsById = new Map(commands.map((command) => [command.id, command]))
  const entries = new Map<string, { readonly record: UnknownRecord; readonly index: number }>()
  for (let index = 0; index < rawEvidence.length; index += 1) {
    const record = ownDataRecord(
      rawEvidence[index],
      COMMAND_EVIDENCE_KEYS,
      COMMAND_EVIDENCE_KEYS,
      `commandExecutionEvidence[${index}]`,
    )
    const commandId = unicodeText(record.commandId, `commandExecutionEvidence[${index}].commandId`, 64)
    if (!COMMAND_ID.test(commandId)) fail(`commandExecutionEvidence[${index}].commandId`, "must match the P7 command id grammar")
    if (entries.has(commandId)) fail("commandExecutionEvidence", `contains duplicate command id: ${commandId}`)
    if (!commandsById.has(commandId)) fail("commandExecutionEvidence", `contains command outside the exact P7-R5 plan: ${commandId}`)
    entries.set(commandId, { record, index })
  }
  for (const command of commands) {
    if (!entries.has(command.id)) fail("commandExecutionEvidence", `is missing exact planned command: ${command.id}`)
  }

  const receiptIds = new Set<string>()
  const normalizedCommands: P7VerificationCommandSuccessEvidenceRecord[] = []
  for (const command of commands) {
    const entry = entries.get(command.id)!
    const entryLabel = `commandExecutionEvidence[${entry.index}]`
    const checks = source.verificationReport.checks.filter((candidate) => candidate.id === `command.${command.id}`)
    if (checks.length !== 1) {
      fail("sourceVerificationReportBinding.verificationReport", `must contain exactly one check for command.${command.id}`)
    }
    const check = checks[0]!
    if (check.category !== command.category) fail(`command.${command.id}.category`, "must match the exact P7-R5 command category")
    if (check.status !== "pass") fail(`command.${command.id}.status`, "must equal pass")

    const intent = normalizedIntent(entry.record.executionIntentPreimage, command, `${entryLabel}.executionIntentPreimage`)
    const receipt = normalizedReceipt(entry.record.executionReceipt, command.id, intent, `${entryLabel}.executionReceipt`)
    if (receiptIds.has(receipt.receiptId)) fail("commandExecutionEvidence", `contains duplicate receipt id: ${receipt.receiptId}`)
    receiptIds.add(receipt.receiptId)

    const receiptRefs = check.evidence.filter((item) => item.kind === "receipt" && item.ref === receipt.receiptId)
    if (receiptRefs.length !== 1) {
      fail(`command.${command.id}.evidence`, "must reference the exact supplied success receipt id exactly once")
    }
    if (Date.parse(receipt.startedAt) < Date.parse(source.verificationStartedAt)) {
      fail(`${entryLabel}.executionReceipt.startedAt`, "must not precede the bound verification report")
    }
    if (Date.parse(receipt.completedAt) > Date.parse(source.verificationCompletedAt)) {
      fail(`${entryLabel}.executionReceipt.completedAt`, "must not exceed the bound verification report")
    }

    normalizedCommands.push(deepFreeze({
      commandId: command.id,
      commandCategory: command.category,
      checkSummary: unicodeText(
        check.summary,
        `command.${command.id}.summary`,
        P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxSummaryCodePoints,
      ),
      checkEvidence: normalizedEvidence(check.evidence, `command.${command.id}.evidence`),
      executionReceiptIdentity: hashText(canonicalJson(receipt)),
      executionReceiptId: receipt.receiptId,
      executionInputDigest: receipt.inputDigest,
      executionResolvedExecutable: intent.resolvedExecutable,
      executionEnvironmentDigest: intent.environmentDigest,
      executionTimeoutMs: intent.timeoutMs,
      executionMaxOutputBytes: intent.maxOutputBytes,
      executionStartedAt: receipt.startedAt,
      executionCompletedAt: receipt.completedAt,
      executionOutputDigest: receipt.result.outputDigest,
      executionOutputBytes: receipt.result.outputBytes,
      executionExitCode: receipt.result.exitCode,
    }))
  }

  return deepFreeze({
    version: P7_R8_VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BINDING_VERSION,
    state: P7_R8_VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND_STATE,
    sourceVerificationReportBindingIdentity: source.bindingIdentity,
    proposalIdentity: source.proposalIdentity,
    authorizationIdentity: source.authorizationIdentity,
    intentBindingIdentity: source.intentBindingIdentity,
    appliedEvidenceIdentity: source.appliedEvidenceIdentity,
    verificationPlanBindingIdentity: source.verificationPlanBindingIdentity,
    repositoryIdentity: unicodeText(source.repositoryIdentity, "source.repositoryIdentity", 1_024),
    canonicalBase: gitObject(source.canonicalBase, "source.canonicalBase"),
    targetHead: gitObject(source.targetHead, "source.targetHead"),
    postStateDigest: sha256(source.postStateDigest, "source.postStateDigest"),
    verificationPlanDigest: sha256(source.verificationPlanDigest, "source.verificationPlanDigest"),
    verificationReportIdentity: sha256(source.verificationReportIdentity, "source.verificationReportIdentity"),
    verificationSessionId: unicodeText(source.verificationSessionId, "source.verificationSessionId", 256),
    verificationStartedAt: canonicalTimestamp(source.verificationStartedAt, "source.verificationStartedAt"),
    verificationCompletedAt: canonicalTimestamp(source.verificationCompletedAt, "source.verificationCompletedAt"),
    commandCount: commands.length,
    testCommandCount: commands.filter((command) => command.category === "tests").length,
    commands: Object.freeze(normalizedCommands),
  })
}

export function p7VerificationCommandSuccessEvidenceBindingIdentity(
  input: P7VerificationCommandSuccessEvidenceBindingBuildInput,
): string {
  return evidenceIdentity(normalizedBuildCore(input))
}

export function buildP7VerificationCommandSuccessEvidenceBinding(
  input: P7VerificationCommandSuccessEvidenceBindingBuildInput,
): P7VerificationCommandSuccessEvidenceBinding {
  const core = normalizedBuildCore(input)
  return deepFreeze({ ...core, evidenceIdentity: evidenceIdentity(core) })
}

export function validateP7VerificationCommandSuccessEvidenceBinding(
  value: unknown,
  input: P7VerificationCommandSuccessEvidenceBindingBuildInput,
): P7VerificationCommandSuccessEvidenceBinding {
  assertSafeJsonGraph(value, "verification-command success evidence binding")
  const record = ownDataRecord(value, OUTPUT_KEYS, OUTPUT_KEYS, "verification-command success evidence binding")
  const expected = buildP7VerificationCommandSuccessEvidenceBinding(input)
  const claimedIdentity = sha256(record.evidenceIdentity, "verification-command success evidence binding.evidenceIdentity")
  if (claimedIdentity !== expected.evidenceIdentity) {
    fail("verification-command success evidence binding.evidenceIdentity", "does not match the canonical source-derived preimage")
  }

  const withoutIdentity: UnknownRecord = {}
  const expectedWithoutIdentity: UnknownRecord = {}
  for (const key of OUTPUT_KEYS) {
    if (key === "evidenceIdentity") continue
    withoutIdentity[key] = record[key]
    expectedWithoutIdentity[key] = expected[key]
  }
  if (canonicalJson(withoutIdentity) !== canonicalJson(expectedWithoutIdentity)) {
    fail("verification-command success evidence binding", "does not match canonical source-derived semantics")
  }
  return expected
}
