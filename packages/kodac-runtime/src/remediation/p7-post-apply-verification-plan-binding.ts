import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

import {
  validateP7AppliedPatchEvidenceBinding,
  type P7AppliedPatchEvidenceBinding,
  type P7AppliedPatchEvidenceBindingBuildInput,
} from "./p7-applied-patch-evidence-binding.ts"

export const P7_R5_POST_APPLY_VERIFICATION_PLAN_BINDING_VERSION =
  "p7-r5-post-apply-verification-plan-binding-v1" as const
export const P7_R5_VERIFICATION_PLAN_BOUND_STATE = "VERIFICATION_PLAN_BOUND" as const
export const P7_R5_VERIFICATION_PLAN_PROTOCOL = "kodac.verification-plan" as const
export const P7_R5_VERIFICATION_PLAN_VERSION = 1 as const

export const P7_R5_VERIFICATION_PLAN_LIMITS = Object.freeze({
  maxChangedPaths: 64,
  maxSignals: 700,
  maxWarnings: 700,
  maxCommands: 8,
  maxCommandArgs: 64,
  maxPathCodePoints: 1_024,
  maxSignalCodePoints: 4_096,
  maxWarningCodePoints: 8_192,
  maxCommandIdCodePoints: 64,
  maxArgCodePoints: 4_096,
  maxWorkspaceCodePoints: 8_192,
  maxTimeoutMs: 120_000,
  maxOutputBytes: 1_048_576,
  maxJsonNodes: 8_192,
  maxJsonDepth: 16,
} as const)

export type P7VerificationRisk = "low" | "medium" | "high"
export type P7VerificationCategory = "syntax" | "types" | "lint" | "tests" | "custom"
export type P7VerificationExecutable = "node" | "python" | "cargo" | "go"

export interface P7VerificationBudget {
  readonly maxCommands: number
  readonly maxTotalTimeoutMs: number
}

export interface P7VerificationCommand {
  readonly id: string
  readonly category: P7VerificationCategory
  readonly executable: P7VerificationExecutable
  readonly args: readonly string[]
  readonly timeoutMs?: number
  readonly maxOutputBytes?: number
}

export interface P7VerificationPlanInput {
  readonly protocol: typeof P7_R5_VERIFICATION_PLAN_PROTOCOL
  readonly version: typeof P7_R5_VERIFICATION_PLAN_VERSION
  readonly generatedAt: string
  readonly workspace: string
  readonly risk: P7VerificationRisk
  readonly budget: P7VerificationBudget
  readonly signals: readonly string[]
  readonly changedPaths: readonly string[]
  readonly commands: readonly P7VerificationCommand[]
  readonly warnings: readonly string[]
  readonly planDigest: string
}

export interface P7VerificationPlanProjection {
  readonly protocol: typeof P7_R5_VERIFICATION_PLAN_PROTOCOL
  readonly version: typeof P7_R5_VERIFICATION_PLAN_VERSION
  readonly risk: P7VerificationRisk
  readonly budget: P7VerificationBudget
  readonly signals: readonly string[]
  readonly changedPaths: readonly string[]
  readonly commands: readonly P7VerificationCommand[]
  readonly warnings: readonly string[]
  readonly planDigest: string
}

export interface P7PostApplyVerificationPlanBinding {
  readonly version: typeof P7_R5_POST_APPLY_VERIFICATION_PLAN_BINDING_VERSION
  readonly bindingIdentity: string
  readonly state: typeof P7_R5_VERIFICATION_PLAN_BOUND_STATE
  readonly proposalIdentity: string
  readonly authorizationIdentity: string
  readonly intentBindingIdentity: string
  readonly appliedEvidenceIdentity: string
  readonly executionReceiptIdentity: string
  readonly executionReceiptId: string
  readonly repositoryIdentity: string
  readonly canonicalBase: string
  readonly targetHead: string
  readonly patchArtifactDigest: string
  readonly inputDigest: string
  readonly postStateDigest: string
  readonly verificationPlanDigest: string
  readonly verificationPlanGeneratedAt: string
  readonly verificationWorkspaceDigest: string
  readonly verificationPlan: P7VerificationPlanProjection
}

export interface P7PostApplyVerificationPlanBindingBuildInput {
  readonly sourceAppliedEvidence: P7AppliedPatchEvidenceBinding
  readonly sourceAppliedEvidenceInput: P7AppliedPatchEvidenceBindingBuildInput
  readonly verificationPlan: P7VerificationPlanInput
}

type UnknownRecord = Record<string, unknown>
type BindingCore = Omit<P7PostApplyVerificationPlanBinding, "bindingIdentity">
type NormalizedPlan = {
  readonly generatedAt: string
  readonly workspaceDigest: string
  readonly projection: P7VerificationPlanProjection
}

const SHA256 = /^[0-9a-f]{64}$/
const COMMAND_ID = /^[a-z0-9][a-z0-9._-]{0,63}$/i
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/u
const CATEGORIES = new Set<P7VerificationCategory>(["syntax", "types", "lint", "tests", "custom"])
const EXECUTABLES = new Set<P7VerificationExecutable>(["node", "python", "cargo", "go"])

const BUILD_KEYS = ["sourceAppliedEvidence", "sourceAppliedEvidenceInput", "verificationPlan"] as const
const OUTPUT_KEYS = [
  "version", "bindingIdentity", "state", "proposalIdentity", "authorizationIdentity", "intentBindingIdentity",
  "appliedEvidenceIdentity", "executionReceiptIdentity", "executionReceiptId", "repositoryIdentity",
  "canonicalBase", "targetHead", "patchArtifactDigest", "inputDigest", "postStateDigest",
  "verificationPlanDigest", "verificationPlanGeneratedAt", "verificationWorkspaceDigest", "verificationPlan",
] as const
const PLAN_KEYS = [
  "protocol", "version", "generatedAt", "workspace", "risk", "budget", "signals", "changedPaths",
  "commands", "warnings", "planDigest",
] as const
const BUDGET_KEYS = ["maxCommands", "maxTotalTimeoutMs"] as const
const COMMAND_KEYS = ["id", "category", "executable", "args", "timeoutMs", "maxOutputBytes"] as const

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

function boundedText(
  value: unknown,
  label: string,
  maximumCodePoints: number,
  options: { readonly allowEmpty?: boolean } = {},
): string {
  if (typeof value !== "string") fail(label, "must be a string")
  assertUnicodeScalars(value, label)
  if (!options.allowEmpty && value.length === 0) fail(label, "must not be empty")
  if (codePointLength(value) > maximumCodePoints) fail(label, `exceeds ${maximumCodePoints} Unicode code points`)
  if (CONTROL_CHARACTERS.test(value)) fail(label, "must not contain control characters")
  return value
}

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) fail(label, "must be 64 lowercase hexadecimal characters")
  return value
}

function canonicalTimestamp(value: unknown, label: string): string {
  if (typeof value !== "string") fail(label, "must be a canonical ISO-8601 UTC timestamp")
  const parsed = Date.parse(value)
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) {
    fail(label, "must be a canonical ISO-8601 UTC timestamp")
  }
  return value
}

function positiveInteger(value: unknown, label: string, maximum: number): number {
  if (!Number.isInteger(value) || (value as number) <= 0 || (value as number) > maximum) {
    fail(label, `must be a positive integer <= ${maximum}`)
  }
  return value as number
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
    if (nodes > P7_R5_VERIFICATION_PLAN_LIMITS.maxJsonNodes) fail(label, "exceeds the JSON node budget")
    if (current.depth > P7_R5_VERIFICATION_PLAN_LIMITS.maxJsonDepth) fail(label, "exceeds the JSON depth budget")

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
      const values = denseArray(item, current.label, P7_R5_VERIFICATION_PLAN_LIMITS.maxJsonNodes)
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

function classifyRisk(paths: readonly string[]): P7VerificationRisk {
  if (paths.length === 0) return "medium"
  const normalized = paths.map((path) => path.toLowerCase())
  const highRisk = normalized.some((path) =>
    path.startsWith(".github/workflows/") ||
    path.includes("security") ||
    path.includes("auth") ||
    /(^|\/)(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|bun\.lockb?|pyproject\.toml|cargo\.toml|go\.mod)$/.test(path),
  )
  if (highRisk) return "high"
  const docsOnly = normalized.every((path) =>
    path.startsWith("docs/") || /\.(md|mdx|rst|txt|adoc)$/.test(path),
  )
  return docsOnly ? "low" : "medium"
}

function budgetFor(risk: P7VerificationRisk): P7VerificationBudget {
  if (risk === "high") return Object.freeze({ maxCommands: 8, maxTotalTimeoutMs: 360_000 })
  if (risk === "low") return Object.freeze({ maxCommands: 4, maxTotalTimeoutMs: 120_000 })
  return Object.freeze({ maxCommands: 6, maxTotalTimeoutMs: 240_000 })
}

function normalizedStringArray(
  value: unknown,
  label: string,
  maximumItems: number,
  maximumCodePoints: number,
  options: { readonly sortedUnique?: boolean; readonly allowEmptyItems?: boolean } = {},
): readonly string[] {
  const values = denseArray(value, label, maximumItems).map((item, index) =>
    boundedText(item, `${label}[${index}]`, maximumCodePoints, { allowEmpty: options.allowEmptyItems }),
  )
  if (options.sortedUnique) {
    if (new Set(values).size !== values.length) fail(label, "must not contain duplicate entries")
    for (let index = 1; index < values.length; index += 1) {
      if (compareStrings(values[index - 1]!, values[index]!) >= 0) fail(label, "must be in canonical ascending order")
    }
  }
  return Object.freeze([...values])
}

function unsafeCommandArg(value: string): boolean {
  if (value.startsWith("/") || value.startsWith("\\") || /^[A-Za-z]:[\\/]/.test(value)) return true
  return (
    value === ".." ||
    value.startsWith("../") ||
    value.startsWith("..\\") ||
    value.includes("/../") ||
    value.includes("\\..\\")
  )
}

function normalizeCommand(value: unknown, index: number): P7VerificationCommand {
  const label = `verificationPlan.commands[${index}]`
  const record = ownDataRecord(value, COMMAND_KEYS, ["id", "category", "executable", "args"], label)
  const id = boundedText(record.id, `${label}.id`, P7_R5_VERIFICATION_PLAN_LIMITS.maxCommandIdCodePoints)
  if (!COMMAND_ID.test(id)) fail(`${label}.id`, "must match the canonical verification command id grammar")

  if (typeof record.category !== "string" || !CATEGORIES.has(record.category as P7VerificationCategory)) {
    fail(`${label}.category`, "is unsupported")
  }
  const category = record.category as P7VerificationCategory

  if (typeof record.executable !== "string" || !EXECUTABLES.has(record.executable as P7VerificationExecutable)) {
    fail(`${label}.executable`, "is outside the canonical no-shell executable catalog")
  }
  const executable = record.executable as P7VerificationExecutable

  const args = denseArray(record.args, `${label}.args`, P7_R5_VERIFICATION_PLAN_LIMITS.maxCommandArgs).map(
    (item, argIndex) => {
      const arg = boundedText(
        item,
        `${label}.args[${argIndex}]`,
        P7_R5_VERIFICATION_PLAN_LIMITS.maxArgCodePoints,
        { allowEmpty: true },
      )
      if (unsafeCommandArg(arg)) fail(`${label}.args[${argIndex}]`, "must remain workspace-relative")
      return arg
    },
  )

  const result: {
    id: string
    category: P7VerificationCategory
    executable: P7VerificationExecutable
    args: readonly string[]
    timeoutMs?: number
    maxOutputBytes?: number
  } = { id, category, executable, args: Object.freeze([...args]) }

  if (Object.hasOwn(record, "timeoutMs")) {
    result.timeoutMs = positiveInteger(record.timeoutMs, `${label}.timeoutMs`, P7_R5_VERIFICATION_PLAN_LIMITS.maxTimeoutMs)
  }
  if (Object.hasOwn(record, "maxOutputBytes")) {
    result.maxOutputBytes = positiveInteger(
      record.maxOutputBytes,
      `${label}.maxOutputBytes`,
      P7_R5_VERIFICATION_PLAN_LIMITS.maxOutputBytes,
    )
  }
  return Object.freeze(result)
}

function normalizeCommands(value: unknown, maximum: number): readonly P7VerificationCommand[] {
  const raw = denseArray(value, "verificationPlan.commands", maximum)
  if (raw.length < 1) fail("verificationPlan.commands", "must contain at least one command")
  const commands = raw.map((item, index) => normalizeCommand(item, index))
  const ids = commands.map((command) => command.id)
  if (new Set(ids).size !== ids.length) fail("verificationPlan.commands", "must not contain duplicate command ids")
  if (!commands.some((command) => command.category === "tests")) {
    fail("verificationPlan.commands", "must contain at least one tests-category command")
  }
  return Object.freeze(commands)
}

function validateExactChangedPaths(value: unknown, applied: P7AppliedPatchEvidenceBinding): readonly string[] {
  const paths = normalizedStringArray(
    value,
    "verificationPlan.changedPaths",
    P7_R5_VERIFICATION_PLAN_LIMITS.maxChangedPaths,
    P7_R5_VERIFICATION_PLAN_LIMITS.maxPathCodePoints,
    { sortedUnique: true },
  )
  if (paths.length !== applied.paths.length) fail("verificationPlan.changedPaths", "must exactly match P7-R4 applied paths")
  for (let index = 0; index < applied.paths.length; index += 1) {
    if (paths[index] !== applied.paths[index]) fail("verificationPlan.changedPaths", "must exactly match P7-R4 applied paths")
  }
  return paths
}

function normalizedPlan(value: unknown, applied: P7AppliedPatchEvidenceBinding): NormalizedPlan {
  assertSafeJsonGraph(value, "verificationPlan")
  const record = ownDataRecord(value, PLAN_KEYS, PLAN_KEYS, "verificationPlan")
  if (record.protocol !== P7_R5_VERIFICATION_PLAN_PROTOCOL) fail("verificationPlan.protocol", "is unsupported")
  if (record.version !== P7_R5_VERIFICATION_PLAN_VERSION) fail("verificationPlan.version", "is unsupported")

  const generatedAt = canonicalTimestamp(record.generatedAt, "verificationPlan.generatedAt")
  const workspace = boundedText(record.workspace, "verificationPlan.workspace", P7_R5_VERIFICATION_PLAN_LIMITS.maxWorkspaceCodePoints)

  if (record.risk !== "low" && record.risk !== "medium" && record.risk !== "high") fail("verificationPlan.risk", "is unsupported")
  const risk = record.risk as P7VerificationRisk
  const expectedRisk = classifyRisk(applied.paths)
  if (risk !== expectedRisk) fail("verificationPlan.risk", `must equal ${expectedRisk} for the exact applied paths`)

  const budgetRecord = ownDataRecord(record.budget, BUDGET_KEYS, BUDGET_KEYS, "verificationPlan.budget")
  const expectedBudget = budgetFor(risk)
  if (
    budgetRecord.maxCommands !== expectedBudget.maxCommands ||
    budgetRecord.maxTotalTimeoutMs !== expectedBudget.maxTotalTimeoutMs
  ) {
    fail("verificationPlan.budget", "must exactly match the canonical planner risk budget")
  }
  const budget = Object.freeze({ ...expectedBudget })

  const signals = normalizedStringArray(
    record.signals,
    "verificationPlan.signals",
    P7_R5_VERIFICATION_PLAN_LIMITS.maxSignals,
    P7_R5_VERIFICATION_PLAN_LIMITS.maxSignalCodePoints,
    { sortedUnique: true },
  )
  const changedPaths = validateExactChangedPaths(record.changedPaths, applied)
  const commands = normalizeCommands(
    record.commands,
    Math.min(expectedBudget.maxCommands, P7_R5_VERIFICATION_PLAN_LIMITS.maxCommands),
  )
  const warnings = normalizedStringArray(
    record.warnings,
    "verificationPlan.warnings",
    P7_R5_VERIFICATION_PLAN_LIMITS.maxWarnings,
    P7_R5_VERIFICATION_PLAN_LIMITS.maxWarningCodePoints,
  )

  const totalTimeout = commands.reduce((sum, command) => sum + (command.timeoutMs ?? 30_000), 0)
  if (totalTimeout > budget.maxTotalTimeoutMs) {
    const expectedWarning =
      `Planned command timeouts (${totalTimeout}ms) exceed the ${risk}-risk aggregate budget (${budget.maxTotalTimeoutMs}ms).`
    if (!warnings.includes(expectedWarning)) fail("verificationPlan.warnings", "must preserve the canonical aggregate-timeout warning")
  }

  const stable = { risk, budget, signals, changedPaths, commands, warnings }
  const expectedPlanDigest = hashText(JSON.stringify(stable))
  if (sha256(record.planDigest, "verificationPlan.planDigest") !== expectedPlanDigest) {
    fail("verificationPlan.planDigest", "does not match the canonical planner stable projection")
  }

  const projection: P7VerificationPlanProjection = Object.freeze({
    protocol: P7_R5_VERIFICATION_PLAN_PROTOCOL,
    version: P7_R5_VERIFICATION_PLAN_VERSION,
    ...stable,
    planDigest: expectedPlanDigest,
  })
  return Object.freeze({ generatedAt, workspaceDigest: hashText(workspace), projection })
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
  const input = ownDataRecord(value, BUILD_KEYS, BUILD_KEYS, "verification-plan binding build input")
  const sourceInput = input.sourceAppliedEvidenceInput as P7AppliedPatchEvidenceBindingBuildInput
  const applied = validateP7AppliedPatchEvidenceBinding(input.sourceAppliedEvidence, sourceInput)
  const plan = normalizedPlan(input.verificationPlan, applied)

  return deepFreeze({
    version: P7_R5_POST_APPLY_VERIFICATION_PLAN_BINDING_VERSION,
    state: P7_R5_VERIFICATION_PLAN_BOUND_STATE,
    proposalIdentity: applied.proposalIdentity,
    authorizationIdentity: applied.authorizationIdentity,
    intentBindingIdentity: applied.intentBindingIdentity,
    appliedEvidenceIdentity: applied.appliedEvidenceIdentity,
    executionReceiptIdentity: applied.executionReceiptIdentity,
    executionReceiptId: applied.executionReceiptId,
    repositoryIdentity: applied.repositoryIdentity,
    canonicalBase: applied.canonicalBase,
    targetHead: applied.targetHead,
    patchArtifactDigest: applied.patchArtifactDigest,
    inputDigest: applied.inputDigest,
    postStateDigest: applied.postStateDigest,
    verificationPlanDigest: plan.projection.planDigest,
    verificationPlanGeneratedAt: plan.generatedAt,
    verificationWorkspaceDigest: plan.workspaceDigest,
    verificationPlan: plan.projection,
  })
}

export function p7PostApplyVerificationPlanBindingIdentity(
  input: P7PostApplyVerificationPlanBindingBuildInput,
): string {
  return bindingIdentity(normalizedBuildCore(input))
}

export function buildP7PostApplyVerificationPlanBinding(
  input: P7PostApplyVerificationPlanBindingBuildInput,
): P7PostApplyVerificationPlanBinding {
  const core = normalizedBuildCore(input)
  return deepFreeze({ ...core, bindingIdentity: bindingIdentity(core) })
}

export function validateP7PostApplyVerificationPlanBinding(
  value: unknown,
  input: P7PostApplyVerificationPlanBindingBuildInput,
): P7PostApplyVerificationPlanBinding {
  assertSafeJsonGraph(value, "verification-plan binding")
  const record = ownDataRecord(value, OUTPUT_KEYS, OUTPUT_KEYS, "verification-plan binding")
  const expected = buildP7PostApplyVerificationPlanBinding(input)
  const claimedIdentity = sha256(record.bindingIdentity, "verification-plan binding.bindingIdentity")
  if (claimedIdentity !== expected.bindingIdentity) {
    fail("verification-plan binding.bindingIdentity", "does not match the canonical binding preimage")
  }

  const withoutIdentity: UnknownRecord = {}
  const expectedWithoutIdentity: UnknownRecord = {}
  for (const key of OUTPUT_KEYS) {
    if (key === "bindingIdentity") continue
    withoutIdentity[key] = record[key]
    expectedWithoutIdentity[key] = expected[key]
  }
  if (canonicalJson(withoutIdentity) !== canonicalJson(expectedWithoutIdentity)) {
    fail("verification-plan binding", "does not match canonical source-derived semantics")
  }
  return expected
}
