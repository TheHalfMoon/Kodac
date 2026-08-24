import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

import {
  K4_R1_LIMITS,
  compatibilityStandardPin,
  validateCompatibilityCapabilityId,
  validateCompatibilityExtensionId,
  validateCompatibilitySha256,
  validateNormalizationDisposition,
  type CompatibilityBindingSnapshot,
  type ExternalCapabilityBinding,
  type NormalizationDisposition,
} from "./contracts.ts"
import { CompatibilityBindingRegistry } from "./registry.ts"

export const K4_R3_ACP_METHOD_CATALOG_EVIDENCE_VERSION = "k4-r3-acp-method-catalog-evidence-v1" as const
export const K4_R3_ACP_STANDARD_PIN_IDENTITY = "b75626aa97bed5c4208200c9b4469d5ebc0ca35cb2a9fa1b0a7341ec4dadfdec" as const

export const K4_R3_ACP_OBJECT_KINDS = Object.freeze([
  "ACP_AGENT_METHOD", "ACP_CLIENT_METHOD", "ACP_NOTIFICATION",
] as const)
export const K4_R3_ACP_MESSAGE_KINDS = Object.freeze(["REQUEST", "NOTIFICATION"] as const)
export const K4_R3_ACP_DIRECTIONS = Object.freeze([
  "CLIENT_TO_AGENT", "AGENT_TO_CLIENT", "BIDIRECTIONAL",
] as const)
export const K4_R3_BINDING_STATES = Object.freeze(["UNBOUND", "CURRENT", "STALE"] as const)

export const K4_R3_ACP_STANDARD_EVIDENCE = Object.freeze({
  repository: "agentclientprotocol/agent-client-protocol",
  sourceCommit: "62c74ac119ec3296809496482440afca69926ce9",
  sourceTree: "130153620c8e8a7d2934b19bd3442566bee7a6ea",
  specificationRevision: "v2",
  standardPinIdentity: K4_R3_ACP_STANDARD_PIN_IDENTITY,
  sources: Object.freeze([
    Object.freeze({ path: "docs/protocol/v2/overview.mdx", blob: "4d5e4012f9ccd6b9a3e8ad3e2d3dab55cdbe2b44" }),
    Object.freeze({ path: "LICENSE", blob: "1de02305f81f6dc087b6229a1d86a31774d2fa31" }),
    Object.freeze({ path: "schema/v2/meta.json", blob: "ad2cfd937a0722893fa577e4ff96df5c79cdc23c" }),
    Object.freeze({ path: "schema/v2/schema.json", blob: "021d16481f3d833eff017e5128b9fe8927d45b05" }),
    Object.freeze({ path: "docs/protocol/v2/initialization.mdx", blob: "b124fdfeed5292b98fa2cd16b22624c3bcd67680" }),
    Object.freeze({ path: "docs/protocol/v2/cancellation.mdx", blob: "00795cbfb29b1bf9407541ed817f2bca392fbb5f" }),
    Object.freeze({ path: "docs/protocol/v2/extensibility.mdx", blob: "370909fd5ce0d30503ce32451c943ae0aa3e2a9a" }),
  ]),
} as const)

export type AcpMethodObjectKind = typeof K4_R3_ACP_OBJECT_KINDS[number]
export type AcpMethodMessageKind = typeof K4_R3_ACP_MESSAGE_KINDS[number]
export type AcpMethodDirection = typeof K4_R3_ACP_DIRECTIONS[number]
export type AcpMethodBindingState = typeof K4_R3_BINDING_STATES[number]

export interface AcpMethodDefinition {
  readonly externalName: string
  readonly objectKind: AcpMethodObjectKind
  readonly messageKind: AcpMethodMessageKind
  readonly direction: AcpMethodDirection
}

function methodDefinition(
  externalName: string,
  objectKind: AcpMethodObjectKind,
  messageKind: AcpMethodMessageKind,
  direction: AcpMethodDirection,
): AcpMethodDefinition {
  return Object.freeze({ externalName, objectKind, messageKind, direction })
}

export const K4_R3_ACP_METHOD_DEFINITIONS: readonly AcpMethodDefinition[] = Object.freeze([
  methodDefinition("$/cancel_request", "ACP_NOTIFICATION", "NOTIFICATION", "BIDIRECTIONAL"),
  methodDefinition("auth/login", "ACP_AGENT_METHOD", "REQUEST", "CLIENT_TO_AGENT"),
  methodDefinition("auth/logout", "ACP_AGENT_METHOD", "REQUEST", "CLIENT_TO_AGENT"),
  methodDefinition("elicitation/complete", "ACP_NOTIFICATION", "NOTIFICATION", "AGENT_TO_CLIENT"),
  methodDefinition("elicitation/create", "ACP_CLIENT_METHOD", "REQUEST", "AGENT_TO_CLIENT"),
  methodDefinition("initialize", "ACP_AGENT_METHOD", "REQUEST", "CLIENT_TO_AGENT"),
  methodDefinition("session/cancel", "ACP_NOTIFICATION", "NOTIFICATION", "CLIENT_TO_AGENT"),
  methodDefinition("session/close", "ACP_AGENT_METHOD", "REQUEST", "CLIENT_TO_AGENT"),
  methodDefinition("session/delete", "ACP_AGENT_METHOD", "REQUEST", "CLIENT_TO_AGENT"),
  methodDefinition("session/list", "ACP_AGENT_METHOD", "REQUEST", "CLIENT_TO_AGENT"),
  methodDefinition("session/new", "ACP_AGENT_METHOD", "REQUEST", "CLIENT_TO_AGENT"),
  methodDefinition("session/prompt", "ACP_AGENT_METHOD", "REQUEST", "CLIENT_TO_AGENT"),
  methodDefinition("session/request_permission", "ACP_CLIENT_METHOD", "REQUEST", "AGENT_TO_CLIENT"),
  methodDefinition("session/resume", "ACP_AGENT_METHOD", "REQUEST", "CLIENT_TO_AGENT"),
  methodDefinition("session/set_config_option", "ACP_AGENT_METHOD", "REQUEST", "CLIENT_TO_AGENT"),
  methodDefinition("session/update", "ACP_NOTIFICATION", "NOTIFICATION", "AGENT_TO_CLIENT"),
])

export interface AcpMethodCatalogEvidenceInput {
  readonly standardPinIdentity: typeof K4_R3_ACP_STANDARD_PIN_IDENTITY
  readonly extensionId: string
  readonly descriptorIdentity: string
}

interface AcpMethodCatalogEntryBase extends AcpMethodDefinition {
  readonly externalMetadataSha256: string
  readonly bindingState: AcpMethodBindingState
  readonly entryIdentity: string
}

export interface UnboundAcpMethodCatalogEntry extends AcpMethodCatalogEntryBase {
  readonly bindingState: "UNBOUND"
}

export interface CurrentAcpMethodCatalogEntry extends AcpMethodCatalogEntryBase {
  readonly bindingState: "CURRENT"
  readonly bindingIdentity: string
  readonly disposition: NormalizationDisposition
  readonly normalizedCapabilityIds: readonly string[]
}

export interface StaleAcpMethodCatalogEntry extends AcpMethodCatalogEntryBase {
  readonly bindingState: "STALE"
  readonly bindingIdentity: string
}

export type AcpMethodCatalogEvidenceEntry =
  | UnboundAcpMethodCatalogEntry
  | CurrentAcpMethodCatalogEntry
  | StaleAcpMethodCatalogEntry

export interface AcpMethodCatalogEvidence {
  readonly version: typeof K4_R3_ACP_METHOD_CATALOG_EVIDENCE_VERSION
  readonly standardPinIdentity: typeof K4_R3_ACP_STANDARD_PIN_IDENTITY
  readonly sourceEvidence: typeof K4_R3_ACP_STANDARD_EVIDENCE
  readonly extensionId: string
  readonly descriptorIdentity: string
  readonly bindingSnapshotIdentity: string
  readonly entries: readonly AcpMethodCatalogEvidenceEntry[]
  readonly catalogIdentity: string
}

type UnknownRecord = Record<string, unknown>
type EntryWithoutIdentity =
  | Omit<UnboundAcpMethodCatalogEntry, "entryIdentity">
  | Omit<CurrentAcpMethodCatalogEntry, "entryIdentity">
  | Omit<StaleAcpMethodCatalogEntry, "entryIdentity">

const INPUT_KEYS = ["standardPinIdentity", "extensionId", "descriptorIdentity"] as const
const CATALOG_KEYS = [
  "version", "standardPinIdentity", "sourceEvidence", "extensionId", "descriptorIdentity",
  "bindingSnapshotIdentity", "entries", "catalogIdentity",
] as const
const UNBOUND_ENTRY_KEYS = [
  "externalName", "objectKind", "messageKind", "direction", "externalMetadataSha256",
  "bindingState", "entryIdentity",
] as const
const STALE_ENTRY_KEYS = [...UNBOUND_ENTRY_KEYS, "bindingIdentity"] as const
const CURRENT_ENTRY_KEYS = [...STALE_ENTRY_KEYS, "disposition", "normalizedCapabilityIds"] as const
const REGISTRY_PROTOTYPE = CompatibilityBindingRegistry.prototype
const CANONICAL_REGISTRY_LIST = REGISTRY_PROTOTYPE.list
const CANONICAL_REGISTRY_SNAPSHOT = Object.getOwnPropertyDescriptor(REGISTRY_PROTOTYPE, "snapshot")?.value
const DEFINITION_BY_NAME = new Map(K4_R3_ACP_METHOD_DEFINITIONS.map((entry) => [entry.externalName, entry]))

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function copyDataTree(
  value: unknown,
  label: string,
  state = { depth: 0, nodes: 0, ancestors: new WeakSet<object>() },
): unknown {
  if (value === null || typeof value === "string" || typeof value === "boolean") return value
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError(`${label} contains a non-finite number`)
    return value
  }
  if (typeof value !== "object") throw new TypeError(`${label} must contain only JSON data`)
  if (utilTypes.isProxy(value)) throw new TypeError(`${label} must not contain Proxy values`)
  if (state.depth >= K4_R1_LIMITS.maxCanonicalDepth) throw new RangeError(`${label} exceeds the canonical depth bound`)
  state.nodes += 1
  if (state.nodes > K4_R1_LIMITS.maxCanonicalNodes) throw new RangeError(`${label} exceeds the canonical node bound`)
  if (state.ancestors.has(value)) throw new TypeError(`${label} must not be cyclic`)
  state.ancestors.add(value)
  state.depth += 1
  try {
    if (Object.getOwnPropertySymbols(value).length !== 0) throw new TypeError(`${label} must not contain symbol fields`)
    if (Array.isArray(value)) {
      if (Object.getPrototypeOf(value) !== Array.prototype) throw new TypeError(`${label} must be a plain array`)
      const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length")
      if (lengthDescriptor === undefined || !("value" in lengthDescriptor) || !Number.isSafeInteger(lengthDescriptor.value) || lengthDescriptor.value < 0) {
        throw new TypeError(`${label}.length is invalid`)
      }
      const length = lengthDescriptor.value as number
      if (length > K4_R1_LIMITS.maxCanonicalNodes) throw new RangeError(`${label} exceeds the pre-validation array bound`)
      const descriptors = Object.getOwnPropertyDescriptors(value)
      const allowed = new Set<string>(["length"])
      for (let index = 0; index < length; index += 1) allowed.add(String(index))
      for (const [key, descriptor] of Object.entries(descriptors)) {
        if (!allowed.has(key)) throw new TypeError(`${label} contains unexpected array field: ${key}`)
        if (key !== "length" && (!("value" in descriptor) || !descriptor.enumerable)) {
          throw new TypeError(`${label}[${key}] must be an enumerable data property`)
        }
      }
      const result: unknown[] = []
      for (let index = 0; index < length; index += 1) {
        const descriptor = descriptors[String(index)]
        if (descriptor === undefined || !("value" in descriptor)) throw new TypeError(`${label} must be dense`)
        result.push(copyDataTree(descriptor.value, `${label}[${index}]`, state))
      }
      return result
    }
    const prototype = Object.getPrototypeOf(value)
    if (prototype !== Object.prototype && prototype !== null) throw new TypeError(`${label} must be a plain object`)
    if (Reflect.ownKeys(value).length > K4_R1_LIMITS.maxCanonicalNodes) {
      throw new RangeError(`${label} exceeds the pre-validation object-field bound`)
    }
    const descriptors = Object.getOwnPropertyDescriptors(value)
    const result = Object.create(null) as UnknownRecord
    for (const [key, descriptor] of Object.entries(descriptors)) {
      if (!("value" in descriptor) || !descriptor.enumerable) throw new TypeError(`${label}.${key} must be an enumerable data property`)
      result[key] = copyDataTree(descriptor.value, `${label}.${key}`, state)
    }
    return result
  } finally {
    state.depth -= 1
    state.ancestors.delete(value)
  }
}

function canonicalize(value: unknown): string {
  if (value === null || typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
    const serialized = JSON.stringify(value)
    if (serialized === undefined) throw new TypeError("canonical value is not JSON data")
    return serialized
  }
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`
  if (typeof value !== "object") throw new TypeError("canonical value is not JSON data")
  const record = value as UnknownRecord
  return `{${Object.keys(record).sort(compareStrings).map((key) => `${JSON.stringify(key)}:${canonicalize(record[key])}`).join(",")}}`
}

function sha256(value: unknown): string {
  return createHash("sha256").update(canonicalize(value), "utf8").digest("hex")
}

function asRecord(value: unknown, label: string): UnknownRecord {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new TypeError(`${label} must be an object`)
  return value as UnknownRecord
}

function exactKeys(record: UnknownRecord, allowed: readonly string[], label: string): void {
  const allowedSet = new Set(allowed)
  for (const key of Object.keys(record)) {
    if (!allowedSet.has(key)) throw new TypeError(`${label} contains unknown field: ${key}`)
  }
  for (const key of allowed) {
    if (!Object.hasOwn(record, key)) throw new TypeError(`${label} is missing required field: ${key}`)
  }
}

function validateAcpPin(value: unknown): typeof K4_R3_ACP_STANDARD_PIN_IDENTITY {
  const identity = validateCompatibilitySha256(value, "standardPinIdentity")
  if (identity !== K4_R3_ACP_STANDARD_PIN_IDENTITY || compatibilityStandardPin("ACP").standardPinIdentity !== identity) {
    throw new TypeError("standardPinIdentity must equal the canonical ACP standard pin")
  }
  return K4_R3_ACP_STANDARD_PIN_IDENTITY
}

export function validateAcpMethodCatalogEvidenceInput(value: unknown): AcpMethodCatalogEvidenceInput {
  const record = asRecord(copyDataTree(value, "ACP method catalog evidence input"), "ACP method catalog evidence input")
  exactKeys(record, INPUT_KEYS, "ACP method catalog evidence input")
  return Object.freeze({
    standardPinIdentity: validateAcpPin(record.standardPinIdentity),
    extensionId: validateCompatibilityExtensionId(record.extensionId, "extensionId"),
    descriptorIdentity: validateCompatibilitySha256(record.descriptorIdentity, "descriptorIdentity"),
  })
}

function methodMetadataSha256(definition: AcpMethodDefinition): string {
  return sha256({
    version: K4_R3_ACP_METHOD_CATALOG_EVIDENCE_VERSION,
    standardPinIdentity: K4_R3_ACP_STANDARD_PIN_IDENTITY,
    externalName: definition.externalName,
    objectKind: definition.objectKind,
    messageKind: definition.messageKind,
    direction: definition.direction,
  })
}

function entryWithIdentity(base: EntryWithoutIdentity): AcpMethodCatalogEvidenceEntry {
  if (base.bindingState === "CURRENT") {
    const frozen = Object.freeze({ ...base, normalizedCapabilityIds: Object.freeze([...base.normalizedCapabilityIds]) })
    return Object.freeze({ ...frozen, entryIdentity: sha256(frozen) })
  }
  const frozen = Object.freeze({ ...base })
  return Object.freeze({ ...frozen, entryIdentity: sha256(frozen) })
}

function captureBindingSnapshot(registry: CompatibilityBindingRegistry): CompatibilityBindingSnapshot {
  if (typeof registry !== "object" || registry === null || utilTypes.isProxy(registry)) {
    throw new TypeError("compatibility registry must be a canonical non-Proxy CompatibilityBindingRegistry")
  }
  if (Object.getPrototypeOf(registry) !== REGISTRY_PROTOTYPE) {
    throw new TypeError("compatibility registry must have the canonical CompatibilityBindingRegistry prototype")
  }
  if (Object.hasOwn(registry, "list") || Object.hasOwn(registry, "snapshot")) {
    throw new TypeError("compatibility registry must not shadow canonical snapshot methods")
  }
  if (
    REGISTRY_PROTOTYPE.list !== CANONICAL_REGISTRY_LIST
    || Object.getOwnPropertyDescriptor(REGISTRY_PROTOTYPE, "snapshot")?.value !== CANONICAL_REGISTRY_SNAPSHOT
  ) throw new TypeError("canonical compatibility registry snapshot methods were modified")
  return CANONICAL_REGISTRY_LIST.call(registry)
}

function exactBindingIndex(
  snapshot: CompatibilityBindingSnapshot,
  input: AcpMethodCatalogEvidenceInput,
): ReadonlyMap<string, ExternalCapabilityBinding> {
  const bindings = new Map<string, ExternalCapabilityBinding>()
  for (const binding of snapshot.bindings) {
    if (
      binding.standardPinIdentity !== input.standardPinIdentity
      || binding.extensionId !== input.extensionId
      || binding.descriptorIdentity !== input.descriptorIdentity
      || !K4_R3_ACP_OBJECT_KINDS.includes(binding.objectKind as AcpMethodObjectKind)
    ) continue
    const definition = DEFINITION_BY_NAME.get(binding.externalName)
    if (definition === undefined || definition.objectKind !== binding.objectKind) continue
    if (bindings.has(binding.externalName)) throw new TypeError("binding snapshot contains a conflicting exact ACP tuple")
    bindings.set(binding.externalName, binding)
  }
  return bindings
}

function derivedEntry(
  definition: AcpMethodDefinition,
  binding: ExternalCapabilityBinding | undefined,
): AcpMethodCatalogEvidenceEntry {
  const common = {
    ...definition,
    externalMetadataSha256: methodMetadataSha256(definition),
  }
  if (binding === undefined) return entryWithIdentity({ ...common, bindingState: "UNBOUND" })
  if (binding.externalMetadataSha256 !== common.externalMetadataSha256) {
    return entryWithIdentity({ ...common, bindingState: "STALE", bindingIdentity: binding.bindingIdentity })
  }
  return entryWithIdentity({
    ...common,
    bindingState: "CURRENT",
    bindingIdentity: binding.bindingIdentity,
    disposition: binding.disposition,
    normalizedCapabilityIds: binding.normalizedCapabilityIds,
  })
}

export function materializeAcpMethodCatalogEvidence(
  value: unknown,
  registry: CompatibilityBindingRegistry,
): AcpMethodCatalogEvidence {
  const input = validateAcpMethodCatalogEvidenceInput(value)
  const snapshot = captureBindingSnapshot(registry)
  const bindings = exactBindingIndex(snapshot, input)
  const entries = Object.freeze(K4_R3_ACP_METHOD_DEFINITIONS.map((definition) => derivedEntry(
    definition,
    bindings.get(definition.externalName),
  )))
  const base = Object.freeze({
    version: K4_R3_ACP_METHOD_CATALOG_EVIDENCE_VERSION,
    standardPinIdentity: input.standardPinIdentity,
    sourceEvidence: K4_R3_ACP_STANDARD_EVIDENCE,
    extensionId: input.extensionId,
    descriptorIdentity: input.descriptorIdentity,
    bindingSnapshotIdentity: snapshot.snapshotIdentity,
    entries,
  })
  return Object.freeze({ ...base, catalogIdentity: sha256(base) })
}

function validatedCapabilities(value: unknown): readonly string[] {
  if (!Array.isArray(value) || value.length > K4_R1_LIMITS.maxNormalizedCapabilities) {
    throw new RangeError(`normalizedCapabilityIds must contain zero through ${K4_R1_LIMITS.maxNormalizedCapabilities} entries`)
  }
  const result = value.map((entry, index) => validateCompatibilityCapabilityId(entry, `normalizedCapabilityIds[${index}]`))
  if (new Set(result).size !== result.length) throw new TypeError("normalizedCapabilityIds contains duplicates")
  const sorted = [...result].sort(compareStrings)
  if (canonicalize(result) !== canonicalize(sorted)) throw new TypeError("normalizedCapabilityIds must use canonical order")
  return Object.freeze(result)
}

function validateDefinitionFields(record: UnknownRecord, label: string): AcpMethodDefinition {
  if (typeof record.externalName !== "string") throw new TypeError(`${label}.externalName is unsupported`)
  const definition = DEFINITION_BY_NAME.get(record.externalName)
  if (
    definition === undefined
    || record.objectKind !== definition.objectKind
    || record.messageKind !== definition.messageKind
    || record.direction !== definition.direction
  ) throw new TypeError(`${label} is not an exact pinned ACP method definition`)
  return definition
}

function validateEntry(value: unknown, label: string): AcpMethodCatalogEvidenceEntry {
  const record = asRecord(value, label)
  const bindingState = record.bindingState
  if (typeof bindingState !== "string" || !K4_R3_BINDING_STATES.includes(bindingState as AcpMethodBindingState)) {
    throw new TypeError(`${label}.bindingState is unsupported`)
  }
  exactKeys(
    record,
    bindingState === "CURRENT" ? CURRENT_ENTRY_KEYS : bindingState === "STALE" ? STALE_ENTRY_KEYS : UNBOUND_ENTRY_KEYS,
    label,
  )
  const definition = validateDefinitionFields(record, label)
  const externalMetadataSha256 = validateCompatibilitySha256(record.externalMetadataSha256, `${label}.externalMetadataSha256`)
  if (externalMetadataSha256 !== methodMetadataSha256(definition)) throw new TypeError(`${label} method metadata digest mismatch`)
  const common = { ...definition, externalMetadataSha256 }
  const claimedIdentity = validateCompatibilitySha256(record.entryIdentity, `${label}.entryIdentity`)
  let rebuilt: AcpMethodCatalogEvidenceEntry
  if (bindingState === "UNBOUND") {
    rebuilt = entryWithIdentity({ ...common, bindingState })
  } else if (bindingState === "STALE") {
    rebuilt = entryWithIdentity({
      ...common,
      bindingState: "STALE",
      bindingIdentity: validateCompatibilitySha256(record.bindingIdentity, `${label}.bindingIdentity`),
    })
  } else {
    const disposition = validateNormalizationDisposition(record.disposition)
    const normalizedCapabilityIds = validatedCapabilities(record.normalizedCapabilityIds)
    if (disposition === "UNRESOLVED" && normalizedCapabilityIds.length !== 0) {
      throw new TypeError("CURRENT UNRESOLVED entry requires zero normalized capabilities")
    }
    if (disposition === "SINGLE" && normalizedCapabilityIds.length !== 1) {
      throw new TypeError("CURRENT SINGLE entry requires exactly one normalized capability")
    }
    if (disposition === "COMPOSITE" && normalizedCapabilityIds.length < 2) {
      throw new TypeError("CURRENT COMPOSITE entry requires at least two normalized capabilities")
    }
    rebuilt = entryWithIdentity({
      ...common,
      bindingState: "CURRENT",
      bindingIdentity: validateCompatibilitySha256(record.bindingIdentity, `${label}.bindingIdentity`),
      disposition,
      normalizedCapabilityIds,
    })
  }
  if (claimedIdentity !== rebuilt.entryIdentity || canonicalize(record) !== canonicalize(rebuilt)) {
    throw new TypeError(`${label} derived fields mismatch`)
  }
  return rebuilt
}

export function validateAcpMethodCatalogEvidence(value: unknown): AcpMethodCatalogEvidence {
  const record = asRecord(copyDataTree(value, "ACP method catalog evidence"), "ACP method catalog evidence")
  exactKeys(record, CATALOG_KEYS, "ACP method catalog evidence")
  if (record.version !== K4_R3_ACP_METHOD_CATALOG_EVIDENCE_VERSION) {
    throw new TypeError("unsupported ACP method catalog evidence version")
  }
  if (canonicalize(record.sourceEvidence) !== canonicalize(K4_R3_ACP_STANDARD_EVIDENCE)) {
    throw new TypeError("sourceEvidence must equal the exact pinned ACP evidence")
  }
  if (!Array.isArray(record.entries) || record.entries.length !== K4_R3_ACP_METHOD_DEFINITIONS.length) {
    throw new RangeError(`entries must contain exactly ${K4_R3_ACP_METHOD_DEFINITIONS.length} methods`)
  }
  const entries = record.entries.map((entry, index) => validateEntry(entry, `entries[${index}]`))
  for (let index = 0; index < K4_R3_ACP_METHOD_DEFINITIONS.length; index += 1) {
    if (entries[index]?.externalName !== K4_R3_ACP_METHOD_DEFINITIONS[index]?.externalName) {
      throw new TypeError("entries must contain the exact pinned methods in canonical order")
    }
  }
  const base = Object.freeze({
    version: K4_R3_ACP_METHOD_CATALOG_EVIDENCE_VERSION,
    standardPinIdentity: validateAcpPin(record.standardPinIdentity),
    sourceEvidence: K4_R3_ACP_STANDARD_EVIDENCE,
    extensionId: validateCompatibilityExtensionId(record.extensionId, "extensionId"),
    descriptorIdentity: validateCompatibilitySha256(record.descriptorIdentity, "descriptorIdentity"),
    bindingSnapshotIdentity: validateCompatibilitySha256(record.bindingSnapshotIdentity, "bindingSnapshotIdentity"),
    entries: Object.freeze(entries),
  })
  const claimedIdentity = validateCompatibilitySha256(record.catalogIdentity, "catalogIdentity")
  const rebuilt = Object.freeze({ ...base, catalogIdentity: sha256(base) })
  if (claimedIdentity !== rebuilt.catalogIdentity || canonicalize(record) !== canonicalize(rebuilt)) {
    throw new TypeError("ACP method catalog evidence derived fields mismatch")
  }
  return rebuilt
}
