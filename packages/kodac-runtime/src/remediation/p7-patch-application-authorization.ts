import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

import {
  P7_R1_IMMUTABLE_PATCH_PROPOSAL_VERSION,
  validateP7ImmutablePatchProposal,
  type P7ImmutablePatchProposal,
} from "./p7-immutable-patch-proposal.ts"

export const P7_R2_PATCH_APPLICATION_AUTHORIZATION_VERSION = "p7-r2-patch-application-authorization-v1" as const
export const P7_R2_PATCH_APPLICATION_STATE = "AUTHORIZED_TO_APPLY" as const
export const P7_R2_RISK_DISPOSITION = "ACCEPT_RISK" as const

export const P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS = Object.freeze({
  maxAuthorizerIdentityCodePoints: 256,
  maxRationaleCodePoints: 4_096,
  maxEvidenceRefs: 32,
  maxEvidenceRefCodePoints: 1_024,
  maxGraphDepth: 32,
  maxGraphContainers: 4_096,
  maxGraphArrayLength: 256,
  maxGraphObjectKeys: 128,
  maxGraphStringCodePoints: 4_096,
} as const)

export interface P7PatchApplicationAuthorizationDeclaration {
  readonly authorizerIdentity: string
  readonly rationale: string
  readonly evidenceRefs: readonly string[]
}

export interface P7PatchApplicationAuthorization {
  readonly version: typeof P7_R2_PATCH_APPLICATION_AUTHORIZATION_VERSION
  readonly authorizationIdentity: string
  readonly state: typeof P7_R2_PATCH_APPLICATION_STATE
  readonly proposalIdentity: string
  readonly proposalVersion: typeof P7_R1_IMMUTABLE_PATCH_PROPOSAL_VERSION
  readonly repositoryIdentity: string
  readonly canonicalBase: string
  readonly targetHead: string
  readonly patchArtifactDigest: string
  readonly authorizerIdentity: string
  readonly riskDisposition: typeof P7_R2_RISK_DISPOSITION
  readonly rationale: string
  readonly evidenceRefs: readonly string[]
  readonly writeAllowlist: readonly string[]
}

export interface P7PatchApplicationAuthorizationBuildInput {
  readonly sourceProposal: P7ImmutablePatchProposal
  readonly declaration: P7PatchApplicationAuthorizationDeclaration
}

type UnknownRecord = Record<string, unknown>
type AuthorizationCore = Omit<P7PatchApplicationAuthorization, "authorizationIdentity">

const SHA256 = /^[0-9a-f]{64}$/
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/u

const BUILD_KEYS = ["sourceProposal", "declaration"] as const
const DECLARATION_KEYS = ["authorizerIdentity", "rationale", "evidenceRefs"] as const
const AUTHORIZATION_KEYS = [
  "version",
  "authorizationIdentity",
  "state",
  "proposalIdentity",
  "proposalVersion",
  "repositoryIdentity",
  "canonicalBase",
  "targetHead",
  "patchArtifactDigest",
  "authorizerIdentity",
  "riskDisposition",
  "rationale",
  "evidenceRefs",
  "writeAllowlist",
] as const

function fail(label: string, detail: string): never {
  throw new TypeError(`${label} ${detail}`)
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

function ownKeys(value: object, label: string): (string | symbol)[] {
  try {
    return Reflect.ownKeys(value)
  } catch {
    return fail(label, "must expose a stable own-key set")
  }
}

function ownDescriptor(value: object, key: string | symbol, label: string): PropertyDescriptor {
  try {
    const descriptor = Object.getOwnPropertyDescriptor(value, key)
    if (descriptor === undefined) fail(label, "has an unstable property descriptor")
    return descriptor
  } catch {
    return fail(label, "must expose stable data-property descriptors")
  }
}

function prototypeOf(value: object, label: string): object | null {
  try {
    return Object.getPrototypeOf(value)
  } catch {
    return fail(label, "must expose a stable prototype")
  }
}

function assertJsonDataGraph(
  value: unknown,
  label: string,
  seen: WeakSet<object>,
  depth: number,
  budget: { containers: number },
): void {
  if (value === null || typeof value === "boolean") return

  if (typeof value === "string") {
    assertUnicodeScalars(value, label)
    if (codePointLength(value) > P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxGraphStringCodePoints) {
      fail(label, `exceeds ${P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxGraphStringCodePoints} Unicode code points`)
    }
    return
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) fail(label, "must not contain non-finite numbers")
    return
  }

  if (typeof value !== "object") fail(label, "must contain JSON data only")
  if (nodeTypes.isProxy(value)) fail(label, "must not contain Proxy objects")
  if (depth > P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxGraphDepth) {
    fail(label, `exceeds maximum object depth ${P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxGraphDepth}`)
  }
  if (seen.has(value)) fail(label, "must be an acyclic non-aliased JSON data graph")
  seen.add(value)
  budget.containers += 1
  if (budget.containers > P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxGraphContainers) {
    fail(label, `exceeds maximum container count ${P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxGraphContainers}`)
  }

  const prototype = prototypeOf(value, label)

  if (Array.isArray(value)) {
    if (prototype !== Array.prototype) fail(label, "must use the ordinary Array prototype")
    const lengthDescriptor = ownDescriptor(value, "length", `${label}.length`)
    if (!("value" in lengthDescriptor) || !Number.isSafeInteger(lengthDescriptor.value)) {
      fail(label, "must expose an ordinary array length")
    }
    const length = lengthDescriptor.value as number
    if (length > P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxGraphArrayLength) {
      fail(label, `exceeds maximum array length ${P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxGraphArrayLength}`)
    }
    const keys = ownKeys(value, label)
    const expected = new Set<string>(["length"])
    for (let index = 0; index < length; index += 1) expected.add(String(index))
    for (const key of keys) {
      if (typeof key !== "string" || !expected.has(key)) {
        fail(label, "must not contain symbol, accessor, sparse, or extra array properties")
      }
    }
    if (keys.length !== expected.size) fail(label, "must not contain sparse array slots")
    for (let index = 0; index < length; index += 1) {
      const descriptor = ownDescriptor(value, String(index), `${label}[${index}]`)
      if (!("value" in descriptor) || descriptor.enumerable !== true) {
        fail(`${label}[${index}]`, "must be an enumerable data property")
      }
      assertJsonDataGraph(descriptor.value, `${label}[${index}]`, seen, depth + 1, budget)
    }
    return
  }

  if (prototype !== Object.prototype && prototype !== null) fail(label, "must be a plain object")
  const keys = ownKeys(value, label)
  if (keys.length > P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxGraphObjectKeys) {
    fail(label, `exceeds maximum own-key count ${P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxGraphObjectKeys}`)
  }
  for (const key of keys) {
    if (typeof key !== "string") fail(label, "must not contain symbol properties")
    assertUnicodeScalars(key, `${label} property name`)
    const descriptor = ownDescriptor(value, key, `${label}.${key}`)
    if (!("value" in descriptor) || descriptor.enumerable !== true) {
      fail(`${label}.${key}`, "must be an enumerable data property")
    }
    assertJsonDataGraph(descriptor.value, `${label}.${key}`, seen, depth + 1, budget)
  }
}

function snapshotJsonData<T>(value: T, label: string): T {
  assertJsonDataGraph(value, label, new WeakSet<object>(), 0, { containers: 0 })
  try {
    return structuredClone(value)
  } catch {
    return fail(label, "must be structured-cloneable JSON data")
  }
}

function record(value: unknown, keys: readonly string[], label: string): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) fail(label, "must be a plain object")
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) fail(label, "must be a plain object")
  const allowed = new Set<string>(keys)
  const names = Object.keys(value)
  for (const name of names) if (!allowed.has(name)) fail(label, `contains unknown field: ${name}`)
  for (const name of keys) if (!Object.hasOwn(value, name)) fail(label, `is missing required field: ${name}`)
  return value as UnknownRecord
}

function boundedText(value: unknown, label: string, maxCodePoints: number): string {
  if (typeof value !== "string" || value.length === 0) fail(label, "must be a non-empty string")
  assertUnicodeScalars(value, label)
  if (codePointLength(value) > maxCodePoints) fail(label, `exceeds ${maxCodePoints} Unicode code points`)
  if (CONTROL_CHARACTERS.test(value) || !/\S/u.test(value)) {
    fail(label, "must be non-blank inert text without control characters")
  }
  return value
}

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) fail(label, "must be 64 lowercase hexadecimal characters")
  return value
}

function normalizeEvidenceRefs(value: unknown, label: string): readonly string[] {
  if (!Array.isArray(value)) fail(label, "must be an array")
  if (value.length < 1 || value.length > P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxEvidenceRefs) {
    fail(label, `must contain 1..${P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxEvidenceRefs} entries`)
  }
  const refs = value.map((item, index) => boundedText(
    item,
    `${label}[${index}]`,
    P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxEvidenceRefCodePoints,
  ))
  if (new Set(refs).size !== refs.length) fail(label, "must not contain duplicate references")
  for (let index = 1; index < refs.length; index += 1) {
    if (compareStrings(refs[index - 1]!, refs[index]!) >= 0) fail(label, "must be in canonical ascending order")
  }
  return Object.freeze(refs)
}

function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value)
    for (const child of Object.values(value as UnknownRecord)) deepFreeze(child)
  }
  return value
}

function authorizationIdentity(value: AuthorizationCore): string {
  return createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex")
}

function coreFromSource(
  sourceProposal: P7ImmutablePatchProposal,
  declaration: P7PatchApplicationAuthorizationDeclaration,
): AuthorizationCore {
  const source = validateP7ImmutablePatchProposal(sourceProposal)
  const authorizerIdentity = boundedText(
    declaration.authorizerIdentity,
    "authorization.authorizerIdentity",
    P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxAuthorizerIdentityCodePoints,
  )
  const rationale = boundedText(
    declaration.rationale,
    "authorization.rationale",
    P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxRationaleCodePoints,
  )
  const evidenceRefs = normalizeEvidenceRefs(declaration.evidenceRefs, "authorization.evidenceRefs")
  const writeAllowlist = Object.freeze(source.changes.map((change) => change.path))

  return deepFreeze({
    version: P7_R2_PATCH_APPLICATION_AUTHORIZATION_VERSION,
    state: P7_R2_PATCH_APPLICATION_STATE,
    proposalIdentity: source.proposalIdentity,
    proposalVersion: source.version,
    repositoryIdentity: source.repositoryIdentity,
    canonicalBase: source.canonicalBase,
    targetHead: source.targetHead,
    patchArtifactDigest: source.patchArtifactDigest,
    authorizerIdentity,
    riskDisposition: P7_R2_RISK_DISPOSITION,
    rationale,
    evidenceRefs,
    writeAllowlist,
  })
}

function normalizedBuildCore(value: unknown): AuthorizationCore {
  const safe = snapshotJsonData(value, "authorization build input")
  const input = record(safe, BUILD_KEYS, "authorization build input")
  const declaration = record(input.declaration, DECLARATION_KEYS, "authorization declaration")
  return coreFromSource(
    input.sourceProposal as P7ImmutablePatchProposal,
    {
      authorizerIdentity: declaration.authorizerIdentity as string,
      rationale: declaration.rationale as string,
      evidenceRefs: declaration.evidenceRefs as readonly string[],
    },
  )
}

export function p7PatchApplicationAuthorizationIdentity(input: P7PatchApplicationAuthorizationBuildInput): string {
  return authorizationIdentity(normalizedBuildCore(input))
}

export function buildP7PatchApplicationAuthorization(
  input: P7PatchApplicationAuthorizationBuildInput,
): P7PatchApplicationAuthorization {
  const core = normalizedBuildCore(input)
  return deepFreeze({ ...core, authorizationIdentity: authorizationIdentity(core) })
}

export function validateP7PatchApplicationAuthorization(
  input: unknown,
  sourceProposal: P7ImmutablePatchProposal,
): P7PatchApplicationAuthorization {
  const safe = snapshotJsonData({ authorization: input, sourceProposal }, "authorization validation input") as {
    authorization: unknown
    sourceProposal: P7ImmutablePatchProposal
  }
  const value = record(safe.authorization, AUTHORIZATION_KEYS, "authorization")
  if (value.version !== P7_R2_PATCH_APPLICATION_AUTHORIZATION_VERSION) fail("authorization.version", "is unsupported")
  if (value.state !== P7_R2_PATCH_APPLICATION_STATE) fail("authorization.state", "must equal AUTHORIZED_TO_APPLY")
  if (value.riskDisposition !== P7_R2_RISK_DISPOSITION) fail("authorization.riskDisposition", "must equal ACCEPT_RISK")

  const core = coreFromSource(safe.sourceProposal, {
    authorizerIdentity: value.authorizerIdentity as string,
    rationale: value.rationale as string,
    evidenceRefs: value.evidenceRefs as readonly string[],
  })

  const sourceBoundKeys = [
    "proposalIdentity",
    "proposalVersion",
    "repositoryIdentity",
    "canonicalBase",
    "targetHead",
    "patchArtifactDigest",
  ] as const
  for (const key of sourceBoundKeys) {
    if (value[key] !== core[key]) fail(`authorization.${key}`, "does not match the validated source proposal")
  }

  if (!Array.isArray(value.writeAllowlist)) fail("authorization.writeAllowlist", "must be an array")
  if (value.writeAllowlist.length !== core.writeAllowlist.length) {
    fail("authorization.writeAllowlist", "must exactly match source proposal change paths")
  }
  for (let index = 0; index < core.writeAllowlist.length; index += 1) {
    if (value.writeAllowlist[index] !== core.writeAllowlist[index]) {
      fail("authorization.writeAllowlist", "must exactly match source proposal change paths")
    }
  }

  const expectedIdentity = authorizationIdentity(core)
  if (sha256(value.authorizationIdentity, "authorization.authorizationIdentity") !== expectedIdentity) {
    fail("authorization.authorizationIdentity", "does not match the canonical authorization preimage")
  }

  return deepFreeze({ ...core, authorizationIdentity: expectedIdentity })
}
