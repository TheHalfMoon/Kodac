import { Buffer } from "node:buffer"
import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

import { parsePatch } from "../edit/patch.ts"
import {
  P7_R1_IMMUTABLE_PATCH_PROPOSAL_VERSION,
  validateP7ImmutablePatchProposal,
  type P7ImmutablePatchProposal,
  type P7PatchOperation,
} from "./p7-immutable-patch-proposal.ts"
import {
  P7_R2_PATCH_APPLICATION_AUTHORIZATION_VERSION,
  validateP7PatchApplicationAuthorization,
  type P7PatchApplicationAuthorization,
} from "./p7-patch-application-authorization.ts"

export const P7_R3_PATCH_EXECUTION_INTENT_BINDING_VERSION = "p7-r3-patch-execution-intent-binding-v1" as const
export const P7_R3_PATCH_EXECUTION_CAPABILITY = "repo.apply_patch" as const
export const P7_R3_PATCH_EXECUTION_INTENT_BINDING_LIMITS = Object.freeze({
  maxPatchBytes: 1_048_576,
} as const)

export interface P7PatchExecutionOperation {
  readonly path: string
  readonly operation: P7PatchOperation
}

export interface P7PatchExecutionIntentBinding {
  readonly version: typeof P7_R3_PATCH_EXECUTION_INTENT_BINDING_VERSION
  readonly bindingIdentity: string
  readonly authorizationIdentity: string
  readonly authorizationVersion: typeof P7_R2_PATCH_APPLICATION_AUTHORIZATION_VERSION
  readonly proposalIdentity: string
  readonly proposalVersion: typeof P7_R1_IMMUTABLE_PATCH_PROPOSAL_VERSION
  readonly repositoryIdentity: string
  readonly canonicalBase: string
  readonly targetHead: string
  readonly patchArtifactDigest: string
  readonly capability: typeof P7_R3_PATCH_EXECUTION_CAPABILITY
  readonly inputDigest: string
  readonly paths: readonly string[]
  readonly operations: readonly P7PatchExecutionOperation[]
  readonly patchByteLength: number
}

export interface P7PatchExecutionIntentBindingBuildInput {
  readonly sourceProposal: P7ImmutablePatchProposal
  readonly sourceAuthorization: P7PatchApplicationAuthorization
  readonly patchText: string
}

type UnknownRecord = Record<string, unknown>
type BindingCore = Omit<P7PatchExecutionIntentBinding, "bindingIdentity">

const SHA256 = /^[0-9a-f]{64}$/
const BUILD_KEYS = ["sourceProposal", "sourceAuthorization", "patchText"] as const
const BINDING_KEYS = [
  "version",
  "bindingIdentity",
  "authorizationIdentity",
  "authorizationVersion",
  "proposalIdentity",
  "proposalVersion",
  "repositoryIdentity",
  "canonicalBase",
  "targetHead",
  "patchArtifactDigest",
  "capability",
  "inputDigest",
  "paths",
  "operations",
  "patchByteLength",
] as const
const OPERATION_KEYS = ["path", "operation"] as const

function fail(label: string, detail: string): never {
  throw new TypeError(`${label} ${detail}`)
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

function ownDataRecord(value: unknown, keys: readonly string[], label: string): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value) || nodeTypes.isProxy(value)) {
    fail(label, "must be a non-proxy plain object")
  }
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) fail(label, "must be a plain object")

  const ownKeys = Reflect.ownKeys(value)
  const allowed = new Set<string>(keys)
  const result: UnknownRecord = {}
  for (const key of ownKeys) {
    if (typeof key !== "string") fail(label, "must not contain symbol fields")
    if (!allowed.has(key)) fail(label, `contains unknown field: ${key}`)
    const descriptor = Object.getOwnPropertyDescriptor(value, key)
    if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
      fail(`${label}.${key}`, "must be an enumerable data property")
    }
    result[key] = descriptor.value
  }
  for (const key of keys) if (!Object.hasOwn(result, key)) fail(label, `is missing required field: ${key}`)
  return result
}

function arrayData(value: unknown, label: string): readonly unknown[] {
  if (!Array.isArray(value) || nodeTypes.isProxy(value)) fail(label, "must be a non-proxy array")
  if (Object.getPrototypeOf(value) !== Array.prototype) fail(label, "must use the ordinary Array prototype")
  const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length")
  if (lengthDescriptor === undefined || !("value" in lengthDescriptor) || !Number.isSafeInteger(lengthDescriptor.value)) {
    fail(label, "must expose an ordinary array length")
  }
  const length = lengthDescriptor.value as number
  const ownKeys = Reflect.ownKeys(value)
  const expected = new Set<string>(["length"])
  for (let index = 0; index < length; index += 1) expected.add(String(index))
  for (const key of ownKeys) {
    if (typeof key !== "string" || !expected.has(key)) {
      fail(label, "must not contain symbol, accessor, sparse, or extra array properties")
    }
  }
  if (ownKeys.length !== expected.size) fail(label, "must not contain sparse array slots")
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

function sha256Text(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
}

function requireSha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) fail(label, "must be 64 lowercase hexadecimal characters")
  return value
}

function patchText(value: unknown): { text: string; digest: string; byteLength: number } {
  if (typeof value !== "string" || value.length === 0) fail("binding.patchText", "must be a non-empty string")
  assertUnicodeScalars(value, "binding.patchText")
  const byteLength = Buffer.byteLength(value, "utf8")
  if (byteLength > P7_R3_PATCH_EXECUTION_INTENT_BINDING_LIMITS.maxPatchBytes) {
    fail("binding.patchText", `exceeds ${P7_R3_PATCH_EXECUTION_INTENT_BINDING_LIMITS.maxPatchBytes} UTF-8 bytes`)
  }
  return { text: value, digest: sha256Text(value), byteLength }
}

function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value)
    for (const child of Object.values(value as UnknownRecord)) deepFreeze(child)
  }
  return value
}

function bindingIdentity(value: BindingCore): string {
  return sha256Text(JSON.stringify(value))
}

function parsedOperations(text: string): readonly P7PatchExecutionOperation[] {
  let parsed: ReturnType<typeof parsePatch>
  try {
    parsed = parsePatch(text)
  } catch (error) {
    throw new TypeError("binding.patchText must be a valid canonical patch", { cause: error })
  }

  const operations = parsed.hunks.map((hunk, index): P7PatchExecutionOperation => {
    if (hunk.type === "update" && hunk.movePath !== undefined) {
      fail(`binding.patchText.hunks[${index}]`, "must not use move semantics")
    }
    const operation: P7PatchOperation = hunk.type === "add" ? "ADD" : hunk.type === "delete" ? "DELETE" : "MODIFY"
    return Object.freeze({ path: hunk.path, operation })
  })
  return Object.freeze(operations)
}

function coreFromSources(
  sourceProposal: P7ImmutablePatchProposal,
  sourceAuthorization: P7PatchApplicationAuthorization,
  rawPatchText: unknown,
): BindingCore {
  const proposal = validateP7ImmutablePatchProposal(sourceProposal)
  const authorization = validateP7PatchApplicationAuthorization(sourceAuthorization, proposal)
  const patch = patchText(rawPatchText)

  if (patch.digest !== authorization.patchArtifactDigest) {
    fail("binding.patchText", "SHA-256 digest does not match the validated P7-R2 patch artifact digest")
  }

  const parsed = parsedOperations(patch.text)
  const expectedOperations = proposal.changes.map((change) => Object.freeze({
    path: change.path,
    operation: change.operation,
  }))

  if (parsed.length !== expectedOperations.length) {
    fail("binding.patchText", "parsed operation count must exactly match the P7-R1 declared change count")
  }
  for (let index = 0; index < expectedOperations.length; index += 1) {
    const actual = parsed[index]!
    const expected = expectedOperations[index]!
    if (actual.path !== expected.path || actual.operation !== expected.operation) {
      fail(
        `binding.patchText.hunks[${index}]`,
        "path and operation must exactly match the canonical P7-R1 change projection in order",
      )
    }
  }

  const paths = Object.freeze([...authorization.writeAllowlist])
  const operations = Object.freeze(expectedOperations.map((operation) => Object.freeze({ ...operation })))

  return deepFreeze({
    version: P7_R3_PATCH_EXECUTION_INTENT_BINDING_VERSION,
    authorizationIdentity: authorization.authorizationIdentity,
    authorizationVersion: authorization.version,
    proposalIdentity: proposal.proposalIdentity,
    proposalVersion: proposal.version,
    repositoryIdentity: authorization.repositoryIdentity,
    canonicalBase: authorization.canonicalBase,
    targetHead: authorization.targetHead,
    patchArtifactDigest: authorization.patchArtifactDigest,
    capability: P7_R3_PATCH_EXECUTION_CAPABILITY,
    inputDigest: patch.digest,
    paths,
    operations,
    patchByteLength: patch.byteLength,
  })
}

function normalizedBuildCore(value: unknown): BindingCore {
  const input = ownDataRecord(value, BUILD_KEYS, "binding build input")
  return coreFromSources(
    input.sourceProposal as P7ImmutablePatchProposal,
    input.sourceAuthorization as P7PatchApplicationAuthorization,
    input.patchText,
  )
}

export function p7PatchExecutionIntentBindingIdentity(input: P7PatchExecutionIntentBindingBuildInput): string {
  return bindingIdentity(normalizedBuildCore(input))
}

export function buildP7PatchExecutionIntentBinding(
  input: P7PatchExecutionIntentBindingBuildInput,
): P7PatchExecutionIntentBinding {
  const core = normalizedBuildCore(input)
  return deepFreeze({ ...core, bindingIdentity: bindingIdentity(core) })
}

export function validateP7PatchExecutionIntentBinding(
  input: unknown,
  sourceProposal: P7ImmutablePatchProposal,
  sourceAuthorization: P7PatchApplicationAuthorization,
  exactPatchText: string,
): P7PatchExecutionIntentBinding {
  const value = ownDataRecord(input, BINDING_KEYS, "binding")
  const core = coreFromSources(sourceProposal, sourceAuthorization, exactPatchText)

  const scalarKeys = [
    "version",
    "authorizationIdentity",
    "authorizationVersion",
    "proposalIdentity",
    "proposalVersion",
    "repositoryIdentity",
    "canonicalBase",
    "targetHead",
    "patchArtifactDigest",
    "capability",
    "inputDigest",
    "patchByteLength",
  ] as const
  for (const key of scalarKeys) {
    if (value[key] !== core[key]) fail(`binding.${key}`, "does not match the canonical source-derived binding")
  }

  const paths = arrayData(value.paths, "binding.paths")
  if (paths.length !== core.paths.length) fail("binding.paths", "must exactly match the canonical write allowlist")
  for (let index = 0; index < core.paths.length; index += 1) {
    if (paths[index] !== core.paths[index]) fail("binding.paths", "must exactly match the canonical write allowlist")
  }

  const operationValues = arrayData(value.operations, "binding.operations")
  if (operationValues.length !== core.operations.length) {
    fail("binding.operations", "must exactly match the canonical P7-R1 change projection")
  }
  for (let index = 0; index < core.operations.length; index += 1) {
    const operation = ownDataRecord(operationValues[index], OPERATION_KEYS, `binding.operations[${index}]`)
    if (operation.path !== core.operations[index]!.path || operation.operation !== core.operations[index]!.operation) {
      fail("binding.operations", "must exactly match the canonical P7-R1 change projection")
    }
  }

  const expectedIdentity = bindingIdentity(core)
  if (requireSha256(value.bindingIdentity, "binding.bindingIdentity") !== expectedIdentity) {
    fail("binding.bindingIdentity", "does not match the canonical binding preimage")
  }

  return deepFreeze({ ...core, bindingIdentity: expectedIdentity })
}
