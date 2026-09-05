import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

import type { AdjudicationRecord, FindingRecord } from "../reviewer-intelligence/contracts.ts"
import { ReviewerIntelligenceRuntime } from "../reviewer-intelligence/runtime.ts"

export const P7_R1_IMMUTABLE_PATCH_PROPOSAL_VERSION = "p7-r1-immutable-patch-proposal-v1" as const
export const P7_R1_PATCH_PROPOSAL_STATE = "PROPOSED" as const
export const P7_R1_PATCH_OPERATIONS = Object.freeze(["ADD", "MODIFY", "DELETE"] as const)

export const P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS = Object.freeze({
  maxRepositoryIdentityCodePoints: 256,
  maxProposerIdentityCodePoints: 256,
  maxPathCodePoints: 1_024,
  maxChanges: 64,
  maxGraphDepth: 32,
  maxGraphContainers: 4_096,
  maxGraphArrayLength: 256,
  maxGraphObjectKeys: 128,
  maxGraphStringCodePoints: 4_096,
} as const)

export type P7PatchOperation = (typeof P7_R1_PATCH_OPERATIONS)[number]

export interface P7PatchChange {
  readonly path: string
  readonly operation: P7PatchOperation
  readonly beforeBlobIdentity: string | null
  readonly afterContentDigest: string | null
}

export interface P7ImmutablePatchProposal {
  readonly version: typeof P7_R1_IMMUTABLE_PATCH_PROPOSAL_VERSION
  readonly proposalIdentity: string
  readonly state: typeof P7_R1_PATCH_PROPOSAL_STATE
  readonly repositoryIdentity: string
  readonly canonicalBase: string
  readonly targetHead: string
  readonly sourceFinding: FindingRecord
  readonly sourceAdjudication: AdjudicationRecord
  readonly proposerIdentity: string
  readonly patchArtifactDigest: string
  readonly changes: readonly P7PatchChange[]
}

export type P7ImmutablePatchProposalInput = Omit<
  P7ImmutablePatchProposal,
  "version" | "proposalIdentity" | "state"
>

type UnknownRecord = Record<string, unknown>

type ProposalCore = Omit<P7ImmutablePatchProposal, "proposalIdentity">

const SHA1 = /^[0-9a-f]{40}$/
const SHA256 = /^[0-9a-f]{64}$/
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/u
const WINDOWS_DRIVE_PREFIX = /^[A-Za-z]:/
const OPERATIONS = new Set<string>(P7_R1_PATCH_OPERATIONS)

const INPUT_KEYS = [
  "repositoryIdentity",
  "canonicalBase",
  "targetHead",
  "sourceFinding",
  "sourceAdjudication",
  "proposerIdentity",
  "patchArtifactDigest",
  "changes",
] as const
const PROPOSAL_KEYS = ["version", "proposalIdentity", "state", ...INPUT_KEYS] as const
const CHANGE_KEYS = ["path", "operation", "beforeBlobIdentity", "afterContentDigest"] as const

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
    if (codePointLength(value) > P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxGraphStringCodePoints) {
      fail(
        label,
        `exceeds ${P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxGraphStringCodePoints} Unicode code points`,
      )
    }
    return
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) fail(label, "must not contain non-finite numbers")
    return
  }

  if (typeof value !== "object") fail(label, "must contain JSON data only")
  if (nodeTypes.isProxy(value)) fail(label, "must not contain Proxy objects")
  if (depth > P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxGraphDepth) {
    fail(label, `exceeds maximum object depth ${P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxGraphDepth}`)
  }
  if (seen.has(value)) fail(label, "must be an acyclic non-aliased JSON data graph")
  seen.add(value)
  budget.containers += 1
  if (budget.containers > P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxGraphContainers) {
    fail(
      label,
      `exceeds maximum container count ${P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxGraphContainers}`,
    )
  }

  const prototype = prototypeOf(value, label)

  if (Array.isArray(value)) {
    if (prototype !== Array.prototype) fail(label, "must use the ordinary Array prototype")
    const lengthDescriptor = ownDescriptor(value, "length", `${label}.length`)
    if (!("value" in lengthDescriptor) || !Number.isSafeInteger(lengthDescriptor.value)) {
      fail(label, "must expose an ordinary array length")
    }
    const length = lengthDescriptor.value as number
    if (length > P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxGraphArrayLength) {
      fail(label, `exceeds maximum array length ${P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxGraphArrayLength}`)
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
  if (keys.length > P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxGraphObjectKeys) {
    fail(label, `exceeds maximum own-key count ${P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxGraphObjectKeys}`)
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

function record(
  value: unknown,
  allowedKeys: readonly string[],
  requiredKeys: readonly string[],
  label: string,
): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) fail(label, "must be a plain object")
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) fail(label, "must be a plain object")
  const allowed = new Set<string>(allowedKeys)
  const names = Object.keys(value)
  for (const name of names) if (!allowed.has(name)) fail(label, `contains unknown field: ${name}`)
  for (const name of requiredKeys) if (!Object.hasOwn(value, name)) fail(label, `is missing required field: ${name}`)
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

function gitCommit(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA1.test(value)) fail(label, "must be 40 lowercase hexadecimal characters")
  return value
}

function gitBlob(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA1.test(value)) fail(label, "must be 40 lowercase hexadecimal characters")
  return value
}

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) fail(label, "must be 64 lowercase hexadecimal characters")
  return value
}

function repositoryPath(value: unknown, label: string): string {
  const path = boundedText(value, label, P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxPathCodePoints)
  if (path.startsWith("/") || WINDOWS_DRIVE_PREFIX.test(path)) fail(label, "must be repository-relative")
  if (path.includes("\\")) fail(label, "must use POSIX separators")
  const segments = path.split("/")
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    fail(label, "must not contain empty, dot, or dot-dot path segments")
  }
  return path
}

function patchOperation(value: unknown, label: string): P7PatchOperation {
  if (typeof value !== "string" || !OPERATIONS.has(value)) fail(label, "is unsupported")
  return value as P7PatchOperation
}

function normalizeChange(value: unknown, label: string): P7PatchChange {
  const input = record(value, CHANGE_KEYS, CHANGE_KEYS, label)
  const path = repositoryPath(input.path, `${label}.path`)
  const operation = patchOperation(input.operation, `${label}.operation`)

  let beforeBlobIdentity: string | null
  let afterContentDigest: string | null

  switch (operation) {
    case "ADD":
      if (input.beforeBlobIdentity !== null) fail(`${label}.beforeBlobIdentity`, "must be null for ADD")
      beforeBlobIdentity = null
      afterContentDigest = sha256(input.afterContentDigest, `${label}.afterContentDigest`)
      break
    case "MODIFY":
      beforeBlobIdentity = gitBlob(input.beforeBlobIdentity, `${label}.beforeBlobIdentity`)
      afterContentDigest = sha256(input.afterContentDigest, `${label}.afterContentDigest`)
      break
    case "DELETE":
      beforeBlobIdentity = gitBlob(input.beforeBlobIdentity, `${label}.beforeBlobIdentity`)
      if (input.afterContentDigest !== null) fail(`${label}.afterContentDigest`, "must be null for DELETE")
      afterContentDigest = null
      break
  }

  return Object.freeze({ path, operation, beforeBlobIdentity, afterContentDigest })
}

function normalizeChanges(value: unknown, label: string): readonly P7PatchChange[] {
  if (!Array.isArray(value)) fail(label, "must be an array")
  if (value.length < 1 || value.length > P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxChanges) {
    fail(label, `must contain 1..${P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxChanges} entries`)
  }
  const changes = value.map((item, index) => normalizeChange(item, `${label}[${index}]`))
  const paths = changes.map((change) => change.path)
  if (new Set(paths).size !== paths.length) fail(label, "must not contain duplicate paths")
  for (let index = 1; index < paths.length; index += 1) {
    if (compareStrings(paths[index - 1]!, paths[index]!) >= 0) {
      fail(label, "must be in canonical ascending path order")
    }
  }
  return Object.freeze(changes)
}

function canonicalText(value: ProposalCore): string {
  return JSON.stringify(value)
}

function proposalIdentity(value: ProposalCore): string {
  return createHash("sha256").update(canonicalText(value), "utf8").digest("hex")
}

function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value)
    for (const child of Object.values(value as UnknownRecord)) deepFreeze(child)
  }
  return value
}

function normalizeCore(value: unknown): ProposalCore {
  const safe = snapshotJsonData(value, "proposal")
  const input = record(safe, INPUT_KEYS, INPUT_KEYS, "proposal")

  const repositoryIdentity = boundedText(
    input.repositoryIdentity,
    "proposal.repositoryIdentity",
    P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxRepositoryIdentityCodePoints,
  )
  const canonicalBase = gitCommit(input.canonicalBase, "proposal.canonicalBase")
  const targetHead = gitCommit(input.targetHead, "proposal.targetHead")
  const proposerIdentity = boundedText(
    input.proposerIdentity,
    "proposal.proposerIdentity",
    P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxProposerIdentityCodePoints,
  )
  const patchArtifactDigest = sha256(input.patchArtifactDigest, "proposal.patchArtifactDigest")

  const validator = new ReviewerIntelligenceRuntime({ adjudicatorId: "p7-r1-immutable-patch-proposal-validator" })
  const sourceFinding = validator.validateFindingRecord(input.sourceFinding, targetHead)
  const sourceAdjudication = validator.validateAdjudicationRecord(input.sourceAdjudication)

  if (sourceFinding.freshness !== "CURRENT" || sourceFinding.state !== "NEW") {
    fail("proposal.sourceFinding", "must be a CURRENT KRI-R2 finding in initial NEW state")
  }
  if (sourceFinding.evaluatedHead !== targetHead || sourceFinding.review.reviewedHead !== targetHead) {
    fail("proposal.sourceFinding", "must bind the exact targetHead")
  }
  if (sourceFinding.review.canonicalBase !== canonicalBase) {
    fail("proposal.sourceFinding", "must bind the exact canonicalBase")
  }
  if (sourceAdjudication.findingIdentity !== sourceFinding.findingIdentity) {
    fail("proposal.sourceAdjudication", "must adjudicate sourceFinding")
  }
  if (
    sourceAdjudication.action !== "CONFIRM" ||
    sourceAdjudication.previousState !== "NEW" ||
    sourceAdjudication.resultingState !== "CONFIRMED" ||
    sourceAdjudication.previousAdjudicationIdentity !== null
  ) {
    fail("proposal.sourceAdjudication", "must be the first CONFIRM adjudication from NEW to CONFIRMED")
  }

  const changes = normalizeChanges(input.changes, "proposal.changes")

  return deepFreeze({
    version: P7_R1_IMMUTABLE_PATCH_PROPOSAL_VERSION,
    state: P7_R1_PATCH_PROPOSAL_STATE,
    repositoryIdentity,
    canonicalBase,
    targetHead,
    sourceFinding,
    sourceAdjudication,
    proposerIdentity,
    patchArtifactDigest,
    changes,
  })
}

export function p7ImmutablePatchProposalIdentity(input: P7ImmutablePatchProposalInput): string {
  return proposalIdentity(normalizeCore(input))
}

export function buildP7ImmutablePatchProposal(input: P7ImmutablePatchProposalInput): P7ImmutablePatchProposal {
  const core = normalizeCore(input)
  return deepFreeze({
    ...core,
    proposalIdentity: proposalIdentity(core),
  })
}

export function validateP7ImmutablePatchProposal(input: unknown): P7ImmutablePatchProposal {
  const safe = snapshotJsonData(input, "proposal")
  const value = record(safe, PROPOSAL_KEYS, PROPOSAL_KEYS, "proposal")
  if (value.version !== P7_R1_IMMUTABLE_PATCH_PROPOSAL_VERSION) fail("proposal.version", "is unsupported")
  if (value.state !== P7_R1_PATCH_PROPOSAL_STATE) fail("proposal.state", "must equal PROPOSED")

  const core = normalizeCore({
    repositoryIdentity: value.repositoryIdentity,
    canonicalBase: value.canonicalBase,
    targetHead: value.targetHead,
    sourceFinding: value.sourceFinding,
    sourceAdjudication: value.sourceAdjudication,
    proposerIdentity: value.proposerIdentity,
    patchArtifactDigest: value.patchArtifactDigest,
    changes: value.changes,
  })
  const expectedIdentity = proposalIdentity(core)
  if (sha256(value.proposalIdentity, "proposal.proposalIdentity") !== expectedIdentity) {
    fail("proposal.proposalIdentity", "does not match the canonical proposal preimage")
  }

  return deepFreeze({ ...core, proposalIdentity: expectedIdentity })
}
