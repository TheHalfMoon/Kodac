import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

import {
  K4_R1_LIMITS,
  compatibilityStandardPin,
  validateCompatibilityCapabilityId,
  validateCompatibilityExtensionId,
  validateCompatibilitySha256,
  validateExternalCapabilityName,
  validateNormalizationDisposition,
  type CompatibilityBindingSnapshot,
  type ExternalCapabilityBinding,
  type NormalizationDisposition,
} from "./contracts.ts"
import { CompatibilityBindingRegistry } from "./registry.ts"

export const K4_R2_MCP_CATALOG_EVIDENCE_VERSION = "k4-r2-mcp-catalog-evidence-v1" as const
export const K4_R2_MCP_STANDARD_PIN_IDENTITY = "b8432ed6198f8e25c5b1d0ef50bab01b06909a77f15f831ff64573a7d4fa312a" as const

export const K4_R2_MCP_OBJECT_KINDS = Object.freeze(["MCP_TOOL", "MCP_RESOURCE", "MCP_PROMPT"] as const)
export const K4_R2_BINDING_STATES = Object.freeze(["UNBOUND", "CURRENT", "STALE"] as const)
export const K4_R2_PAGE_SHAPES = Object.freeze(["SINGLE_PAGE_COMPLETE", "PAGINATED_PAGE"] as const)
export const K4_R2_CACHE_SCOPES = Object.freeze(["public", "private"] as const)

export const K4_R2_LIMITS = Object.freeze({
  maxDeclarations: 4_096,
  maxNormalizedCapabilities: K4_R1_LIMITS.maxNormalizedCapabilities,
  maxCanonicalDepth: K4_R1_LIMITS.maxCanonicalDepth,
  maxCanonicalNodes: K4_R1_LIMITS.maxCanonicalNodes,
} as const)

export const K4_R2_MCP_STANDARD_EVIDENCE = Object.freeze({
  repository: "modelcontextprotocol/modelcontextprotocol",
  sourceCommit: "57ac4a2ec742e0cb7622d899b0f5d3bcf769fd69",
  sourceTree: "164f5cb7a4a9b72a0b1c81aa0d9eeae5a21688e5",
  specificationRevision: "2026-07-28",
  standardPinIdentity: K4_R2_MCP_STANDARD_PIN_IDENTITY,
  sources: Object.freeze([
    Object.freeze({ path: "docs/specification/2026-07-28/index.mdx", blob: "452d78601b135b95bbe45287e756c0579534096b" }),
    Object.freeze({ path: "LICENSE", blob: "4a93985763241755401a10678395303de4e720ba" }),
    Object.freeze({ path: "docs/specification/2026-07-28/server/tools.mdx", blob: "449020f54a6582122607b4869129bec5f1035f37" }),
    Object.freeze({ path: "docs/specification/2026-07-28/server/resources.mdx", blob: "f49dd8e6be3fd8f13911788ae5f5d4c87d2c53cd" }),
    Object.freeze({ path: "docs/specification/2026-07-28/server/prompts.mdx", blob: "5a6574be3c16715aaafb1c7973025c1bc3669474" }),
    Object.freeze({ path: "docs/specification/2026-07-28/server/utilities/pagination.mdx", blob: "b9a840468fc10a8fb31301df9a510cca9d0d345f" }),
    Object.freeze({ path: "docs/specification/2026-07-28/server/utilities/caching.mdx", blob: "577c5ff54f46c2fc6bd29c10f6ddd07f81f180f0" }),
    Object.freeze({ path: "schema/2026-07-28/schema.ts", blob: "9b55feeb412bc3ae877f2eac10b5c01ba29a2eed" }),
    Object.freeze({ path: "schema/2026-07-28/schema.json", blob: "213c58f6d9a1c2ce6ad055afe90bbdb095a29ee8" }),
  ]),
} as const)

export type McpCatalogObjectKind = typeof K4_R2_MCP_OBJECT_KINDS[number]
export type McpCatalogBindingState = typeof K4_R2_BINDING_STATES[number]
export type McpCatalogPageShape = typeof K4_R2_PAGE_SHAPES[number]
export type McpCatalogCacheScope = typeof K4_R2_CACHE_SCOPES[number]

export interface McpCatalogDeclarationObservation {
  readonly externalName: string
  readonly externalMetadataSha256: string
}

export interface McpCatalogEvidenceInput {
  readonly standardPinIdentity: typeof K4_R2_MCP_STANDARD_PIN_IDENTITY
  readonly extensionId: string
  readonly descriptorIdentity: string
  readonly objectKind: McpCatalogObjectKind
  readonly requestCursorSha256: string | null
  readonly nextCursorSha256: string | null
  readonly ttlMs: number
  readonly cacheScope: McpCatalogCacheScope
  readonly responseMetadataSha256: string
  readonly declarations: readonly McpCatalogDeclarationObservation[]
}

interface McpCatalogEntryBase {
  readonly externalName: string
  readonly externalMetadataSha256: string
  readonly bindingState: McpCatalogBindingState
  readonly entryIdentity: string
}

export interface UnboundMcpCatalogEntry extends McpCatalogEntryBase {
  readonly bindingState: "UNBOUND"
}

export interface CurrentMcpCatalogEntry extends McpCatalogEntryBase {
  readonly bindingState: "CURRENT"
  readonly bindingIdentity: string
  readonly disposition: NormalizationDisposition
  readonly normalizedCapabilityIds: readonly string[]
}

export interface StaleMcpCatalogEntry extends McpCatalogEntryBase {
  readonly bindingState: "STALE"
  readonly bindingIdentity: string
}

export type McpCatalogEvidenceEntry = UnboundMcpCatalogEntry | CurrentMcpCatalogEntry | StaleMcpCatalogEntry

export interface McpCatalogEvidencePage {
  readonly version: typeof K4_R2_MCP_CATALOG_EVIDENCE_VERSION
  readonly standardPinIdentity: typeof K4_R2_MCP_STANDARD_PIN_IDENTITY
  readonly extensionId: string
  readonly descriptorIdentity: string
  readonly objectKind: McpCatalogObjectKind
  readonly requestCursorSha256: string | null
  readonly nextCursorSha256: string | null
  readonly ttlMs: number
  readonly cacheScope: McpCatalogCacheScope
  readonly responseMetadataSha256: string
  readonly pageShape: McpCatalogPageShape
  readonly bindingSnapshotIdentity: string
  readonly entries: readonly McpCatalogEvidenceEntry[]
  readonly pageIdentity: string
}

type UnknownRecord = Record<string, unknown>
type EntryWithoutIdentity = Omit<UnboundMcpCatalogEntry, "entryIdentity">
  | Omit<CurrentMcpCatalogEntry, "entryIdentity">
  | Omit<StaleMcpCatalogEntry, "entryIdentity">

const INPUT_KEYS = [
  "standardPinIdentity", "extensionId", "descriptorIdentity", "objectKind", "requestCursorSha256",
  "nextCursorSha256", "ttlMs", "cacheScope", "responseMetadataSha256", "declarations",
] as const
const DECLARATION_KEYS = ["externalName", "externalMetadataSha256"] as const
const PAGE_KEYS = [
  "version", "standardPinIdentity", "extensionId", "descriptorIdentity", "objectKind", "requestCursorSha256",
  "nextCursorSha256", "ttlMs", "cacheScope", "responseMetadataSha256", "pageShape",
  "bindingSnapshotIdentity", "entries", "pageIdentity",
] as const
const UNBOUND_ENTRY_KEYS = ["externalName", "externalMetadataSha256", "bindingState", "entryIdentity"] as const
const STALE_ENTRY_KEYS = [...UNBOUND_ENTRY_KEYS, "bindingIdentity"] as const
const CURRENT_ENTRY_KEYS = [...STALE_ENTRY_KEYS, "disposition", "normalizedCapabilityIds"] as const
const REGISTRY_PROTOTYPE = CompatibilityBindingRegistry.prototype
const CANONICAL_REGISTRY_LIST = REGISTRY_PROTOTYPE.list
const CANONICAL_REGISTRY_SNAPSHOT = Object.getOwnPropertyDescriptor(REGISTRY_PROTOTYPE, "snapshot")?.value

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function compareDeclarations(left: McpCatalogDeclarationObservation, right: McpCatalogDeclarationObservation): number {
  return compareStrings(left.externalName, right.externalName)
    || compareStrings(left.externalMetadataSha256, right.externalMetadataSha256)
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
  if (state.depth >= K4_R2_LIMITS.maxCanonicalDepth) throw new RangeError(`${label} exceeds the canonical depth bound`)
  state.nodes += 1
  if (state.nodes > K4_R2_LIMITS.maxCanonicalNodes) throw new RangeError(`${label} exceeds the canonical node bound`)
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
      if (length > K4_R2_LIMITS.maxDeclarations) {
        throw new RangeError(`${label} exceeds the pre-validation array bound`)
      }
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
    if (Reflect.ownKeys(value).length > K4_R2_LIMITS.maxCanonicalNodes) {
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
  return `{${Object.keys(record)
    .sort(compareStrings)
    .map((key) => `${JSON.stringify(key)}:${canonicalize(record[key])}`)
    .join(",")}}`
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

function enumValue<T extends string>(value: unknown, allowed: readonly T[], label: string): T {
  if (typeof value !== "string" || !allowed.includes(value as T)) throw new TypeError(`${label} is unsupported`)
  return value as T
}

function cursorDigest(value: unknown, label: string): string | null {
  return value === null ? null : validateCompatibilitySha256(value, label)
}

function nonNegativeSafeInteger(value: unknown, label: string): number {
  if (!Number.isSafeInteger(value) || (value as number) < 0) {
    throw new TypeError(`${label} must be a non-negative safe integer`)
  }
  return (value as number) === 0 ? 0 : value as number
}

function declarationFromRecord(record: UnknownRecord, label: string): McpCatalogDeclarationObservation {
  exactKeys(record, DECLARATION_KEYS, label)
  return Object.freeze({
    externalName: validateExternalCapabilityName(record.externalName, `${label}.externalName`),
    externalMetadataSha256: validateCompatibilitySha256(record.externalMetadataSha256, `${label}.externalMetadataSha256`),
  })
}

function validateMcpPin(value: unknown): typeof K4_R2_MCP_STANDARD_PIN_IDENTITY {
  const identity = validateCompatibilitySha256(value, "standardPinIdentity")
  if (identity !== K4_R2_MCP_STANDARD_PIN_IDENTITY || compatibilityStandardPin("MCP").standardPinIdentity !== identity) {
    throw new TypeError("standardPinIdentity must equal the canonical MCP standard pin")
  }
  return K4_R2_MCP_STANDARD_PIN_IDENTITY
}

export function validateMcpCatalogEvidenceInput(value: unknown): McpCatalogEvidenceInput {
  const record = asRecord(copyDataTree(value, "MCP catalog evidence input"), "MCP catalog evidence input")
  exactKeys(record, INPUT_KEYS, "MCP catalog evidence input")
  if (!Array.isArray(record.declarations) || record.declarations.length > K4_R2_LIMITS.maxDeclarations) {
    throw new RangeError(`declarations must contain zero through ${K4_R2_LIMITS.maxDeclarations} entries`)
  }
  const declarations = record.declarations.map((entry, index) => declarationFromRecord(
    asRecord(entry, `declarations[${index}]`),
    `declarations[${index}]`,
  )).sort(compareDeclarations)
  for (let index = 1; index < declarations.length; index += 1) {
    if (declarations[index - 1]?.externalName === declarations[index]?.externalName) {
      throw new TypeError(`declarations contains duplicate externalName: ${declarations[index]?.externalName}`)
    }
  }
  return Object.freeze({
    standardPinIdentity: validateMcpPin(record.standardPinIdentity),
    extensionId: validateCompatibilityExtensionId(record.extensionId, "extensionId"),
    descriptorIdentity: validateCompatibilitySha256(record.descriptorIdentity, "descriptorIdentity"),
    objectKind: enumValue(record.objectKind, K4_R2_MCP_OBJECT_KINDS, "objectKind"),
    requestCursorSha256: cursorDigest(record.requestCursorSha256, "requestCursorSha256"),
    nextCursorSha256: cursorDigest(record.nextCursorSha256, "nextCursorSha256"),
    ttlMs: nonNegativeSafeInteger(record.ttlMs, "ttlMs"),
    cacheScope: enumValue(record.cacheScope, K4_R2_CACHE_SCOPES, "cacheScope"),
    responseMetadataSha256: validateCompatibilitySha256(record.responseMetadataSha256, "responseMetadataSha256"),
    declarations: Object.freeze(declarations),
  })
}

function entryWithIdentity(base: EntryWithoutIdentity): McpCatalogEvidenceEntry {
  if (base.bindingState === "CURRENT") {
    const frozen = Object.freeze({ ...base, normalizedCapabilityIds: Object.freeze([...base.normalizedCapabilityIds]) })
    return Object.freeze({ ...frozen, entryIdentity: sha256(frozen) })
  }
  const frozen = Object.freeze({ ...base })
  return Object.freeze({ ...frozen, entryIdentity: sha256(frozen) })
}

function exactBinding(
  snapshot: CompatibilityBindingSnapshot,
  input: McpCatalogEvidenceInput,
  declaration: McpCatalogDeclarationObservation,
): ExternalCapabilityBinding | undefined {
  const matches = snapshot.bindings.filter((binding) => (
    binding.standardPinIdentity === input.standardPinIdentity
    && binding.objectKind === input.objectKind
    && binding.externalName === declaration.externalName
    && binding.extensionId === input.extensionId
    && binding.descriptorIdentity === input.descriptorIdentity
  ))
  if (matches.length > 1) throw new TypeError("binding snapshot contains a conflicting exact MCP tuple")
  return matches[0]
}

function derivedEntry(
  declaration: McpCatalogDeclarationObservation,
  binding: ExternalCapabilityBinding | undefined,
): McpCatalogEvidenceEntry {
  const common = {
    externalName: declaration.externalName,
    externalMetadataSha256: declaration.externalMetadataSha256,
  }
  if (binding === undefined) return entryWithIdentity({ ...common, bindingState: "UNBOUND" })
  if (binding.externalMetadataSha256 !== declaration.externalMetadataSha256) {
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

function pageShape(requestCursorSha256: string | null, nextCursorSha256: string | null): McpCatalogPageShape {
  return requestCursorSha256 === null && nextCursorSha256 === null ? "SINGLE_PAGE_COMPLETE" : "PAGINATED_PAGE"
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

export function materializeMcpCatalogEvidence(
  value: unknown,
  registry: CompatibilityBindingRegistry,
): McpCatalogEvidencePage {
  const input = validateMcpCatalogEvidenceInput(value)
  const snapshot = captureBindingSnapshot(registry)
  const entries = Object.freeze(input.declarations.map((declaration) => derivedEntry(
    declaration,
    exactBinding(snapshot, input, declaration),
  )))
  const base = Object.freeze({
    version: K4_R2_MCP_CATALOG_EVIDENCE_VERSION,
    standardPinIdentity: input.standardPinIdentity,
    extensionId: input.extensionId,
    descriptorIdentity: input.descriptorIdentity,
    objectKind: input.objectKind,
    requestCursorSha256: input.requestCursorSha256,
    nextCursorSha256: input.nextCursorSha256,
    ttlMs: input.ttlMs,
    cacheScope: input.cacheScope,
    responseMetadataSha256: input.responseMetadataSha256,
    pageShape: pageShape(input.requestCursorSha256, input.nextCursorSha256),
    bindingSnapshotIdentity: snapshot.snapshotIdentity,
    entries,
  })
  return Object.freeze({ ...base, pageIdentity: sha256(base) })
}

function validatedCapabilities(value: unknown): readonly string[] {
  if (!Array.isArray(value) || value.length > K4_R2_LIMITS.maxNormalizedCapabilities) {
    throw new RangeError(`normalizedCapabilityIds must contain zero through ${K4_R2_LIMITS.maxNormalizedCapabilities} entries`)
  }
  const result = value.map((entry, index) => validateCompatibilityCapabilityId(entry, `normalizedCapabilityIds[${index}]`))
  if (new Set(result).size !== result.length) throw new TypeError("normalizedCapabilityIds contains duplicates")
  const sorted = [...result].sort(compareStrings)
  if (canonicalize(result) !== canonicalize(sorted)) throw new TypeError("normalizedCapabilityIds must use canonical order")
  return Object.freeze(result)
}

function validateEntry(value: unknown, label: string): McpCatalogEvidenceEntry {
  const record = asRecord(copyDataTree(value, label), label)
  const bindingState = enumValue(record.bindingState, K4_R2_BINDING_STATES, `${label}.bindingState`)
  exactKeys(
    record,
    bindingState === "CURRENT" ? CURRENT_ENTRY_KEYS : bindingState === "STALE" ? STALE_ENTRY_KEYS : UNBOUND_ENTRY_KEYS,
    label,
  )
  const common = {
    externalName: validateExternalCapabilityName(record.externalName, `${label}.externalName`),
    externalMetadataSha256: validateCompatibilitySha256(record.externalMetadataSha256, `${label}.externalMetadataSha256`),
  }
  const claimedIdentity = validateCompatibilitySha256(record.entryIdentity, `${label}.entryIdentity`)
  let rebuilt: McpCatalogEvidenceEntry
  if (bindingState === "UNBOUND") {
    rebuilt = entryWithIdentity({ ...common, bindingState })
  } else if (bindingState === "STALE") {
    rebuilt = entryWithIdentity({
      ...common,
      bindingState,
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
      bindingState,
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

export function validateMcpCatalogEvidencePage(value: unknown): McpCatalogEvidencePage {
  const record = asRecord(copyDataTree(value, "MCP catalog evidence page"), "MCP catalog evidence page")
  exactKeys(record, PAGE_KEYS, "MCP catalog evidence page")
  if (record.version !== K4_R2_MCP_CATALOG_EVIDENCE_VERSION) throw new TypeError("unsupported MCP catalog evidence version")
  if (!Array.isArray(record.entries) || record.entries.length > K4_R2_LIMITS.maxDeclarations) {
    throw new RangeError(`entries must contain zero through ${K4_R2_LIMITS.maxDeclarations} entries`)
  }
  const entries = record.entries.map((entry, index) => validateEntry(entry, `entries[${index}]`))
  const names = entries.map((entry) => entry.externalName)
  if (new Set(names).size !== names.length) throw new TypeError("entries contains duplicate externalName values")
  const sortedEntries = [...entries].sort(compareDeclarations)
  if (canonicalize(entries) !== canonicalize(sortedEntries)) throw new TypeError("entries must use canonical declaration order")
  const requestCursorSha256 = cursorDigest(record.requestCursorSha256, "requestCursorSha256")
  const nextCursorSha256 = cursorDigest(record.nextCursorSha256, "nextCursorSha256")
  const derivedPageShape = pageShape(requestCursorSha256, nextCursorSha256)
  if (record.pageShape !== derivedPageShape) throw new TypeError("pageShape does not match the cursor digest state")
  const base = Object.freeze({
    version: K4_R2_MCP_CATALOG_EVIDENCE_VERSION,
    standardPinIdentity: validateMcpPin(record.standardPinIdentity),
    extensionId: validateCompatibilityExtensionId(record.extensionId, "extensionId"),
    descriptorIdentity: validateCompatibilitySha256(record.descriptorIdentity, "descriptorIdentity"),
    objectKind: enumValue(record.objectKind, K4_R2_MCP_OBJECT_KINDS, "objectKind"),
    requestCursorSha256,
    nextCursorSha256,
    ttlMs: nonNegativeSafeInteger(record.ttlMs, "ttlMs"),
    cacheScope: enumValue(record.cacheScope, K4_R2_CACHE_SCOPES, "cacheScope"),
    responseMetadataSha256: validateCompatibilitySha256(record.responseMetadataSha256, "responseMetadataSha256"),
    pageShape: derivedPageShape,
    bindingSnapshotIdentity: validateCompatibilitySha256(record.bindingSnapshotIdentity, "bindingSnapshotIdentity"),
    entries: Object.freeze(entries),
  })
  const claimedIdentity = validateCompatibilitySha256(record.pageIdentity, "pageIdentity")
  const rebuilt = Object.freeze({ ...base, pageIdentity: sha256(base) })
  if (claimedIdentity !== rebuilt.pageIdentity || canonicalize(record) !== canonicalize(rebuilt)) {
    throw new TypeError("MCP catalog evidence page derived fields mismatch")
  }
  return rebuilt
}
