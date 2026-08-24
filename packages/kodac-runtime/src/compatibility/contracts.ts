import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

export const K4_R1_COMPATIBILITY_VERSION = "k4-r1-compatibility-normalization-v1" as const
export const K4_R1_BINDING_SNAPSHOT_VERSION = "k4-r1-compatibility-binding-snapshot-v1" as const

export const K4_R1_STANDARD_IDS = Object.freeze(["MCP", "ACP", "AGENT_SKILLS"] as const)
export const K4_R1_EXTERNAL_OBJECT_KINDS = Object.freeze([
  "MCP_TOOL",
  "MCP_RESOURCE",
  "MCP_PROMPT",
  "ACP_AGENT_METHOD",
  "ACP_CLIENT_METHOD",
  "ACP_NOTIFICATION",
  "AGENT_SKILL",
] as const)
export const K4_R1_NORMALIZATION_DISPOSITIONS = Object.freeze(["UNRESOLVED", "SINGLE", "COMPOSITE"] as const)

export const K4_R1_LIMITS = Object.freeze({
  maxExternalNameCodePoints: 512,
  maxExternalNameBytes: 512,
  maxNormalizedCapabilities: 16,
  maxRegistryBindings: 4_096,
  maxLicenseEvidence: 4,
  maxCanonicalDepth: 32,
  maxCanonicalNodes: 50_000,
} as const)

export type CompatibilityStandardId = typeof K4_R1_STANDARD_IDS[number]
export type ExternalObjectKind = typeof K4_R1_EXTERNAL_OBJECT_KINDS[number]
export type NormalizationDisposition = typeof K4_R1_NORMALIZATION_DISPOSITIONS[number]

export interface CompatibilityLicenseEvidence {
  readonly path: string
  readonly blob: string
}

export interface CompatibilityStandardPin {
  readonly version: typeof K4_R1_COMPATIBILITY_VERSION
  readonly standard: CompatibilityStandardId
  readonly repository: string
  readonly sourceCommit: string
  readonly sourceTree: string
  readonly specificationRevision: string | null
  readonly specificationPath: string
  readonly specificationBlob: string
  readonly licenseEvidence: readonly CompatibilityLicenseEvidence[]
  readonly standardPinIdentity: string
}

export interface ExternalCapabilityBindingInput {
  readonly standardPinIdentity: string
  readonly objectKind: ExternalObjectKind
  readonly externalName: string
  readonly externalMetadataSha256: string
  readonly extensionId: string
  readonly descriptorIdentity: string
  readonly disposition: NormalizationDisposition
  readonly normalizedCapabilityIds: readonly string[]
}

export interface ExternalCapabilityBinding extends ExternalCapabilityBindingInput {
  readonly version: typeof K4_R1_COMPATIBILITY_VERSION
  readonly bindingIdentity: string
}

export interface CompatibilityBindingSnapshot {
  readonly version: typeof K4_R1_BINDING_SNAPSHOT_VERSION
  readonly bindings: readonly ExternalCapabilityBinding[]
  readonly snapshotIdentity: string
}

type UnknownRecord = Record<string, unknown>

const SHA1 = /^[0-9a-f]{40}$/
const SHA256 = /^[0-9a-f]{64}$/
const EXTENSION_ID = /^[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._-]*$/
const CAPABILITY_ID = /^[a-z][a-z0-9_-]*(?:[./:][a-z][a-z0-9_-]*)+$/
const STANDARD_SET = new Set<string>(K4_R1_STANDARD_IDS)
const OBJECT_KIND_SET = new Set<string>(K4_R1_EXTERNAL_OBJECT_KINDS)
const DISPOSITION_SET = new Set<string>(K4_R1_NORMALIZATION_DISPOSITIONS)
const OBJECT_STANDARD: Readonly<Record<ExternalObjectKind, CompatibilityStandardId>> = Object.freeze({
  MCP_TOOL: "MCP",
  MCP_RESOURCE: "MCP",
  MCP_PROMPT: "MCP",
  ACP_AGENT_METHOD: "ACP",
  ACP_CLIENT_METHOD: "ACP",
  ACP_NOTIFICATION: "ACP",
  AGENT_SKILL: "AGENT_SKILLS",
})

const PIN_KEYS = [
  "version", "standard", "repository", "sourceCommit", "sourceTree", "specificationRevision",
  "specificationPath", "specificationBlob", "licenseEvidence", "standardPinIdentity",
] as const
const LICENSE_KEYS = ["path", "blob"] as const
const BINDING_INPUT_KEYS = [
  "standardPinIdentity", "objectKind", "externalName", "externalMetadataSha256", "extensionId",
  "descriptorIdentity", "disposition", "normalizedCapabilityIds",
] as const
const BINDING_KEYS = ["version", ...BINDING_INPUT_KEYS, "bindingIdentity"] as const
const SNAPSHOT_KEYS = ["version", "bindings", "snapshotIdentity"] as const

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
      if (length > K4_R1_LIMITS.maxCanonicalNodes) {
        throw new RangeError(`${label} exceeds the pre-validation array bound`)
      }
      const descriptors = Object.getOwnPropertyDescriptors(value)
      const allowed = new Set(["length", ...Array.from({ length }, (_, index) => String(index))])
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

function dataTree(value: unknown, label: string): unknown {
  return copyDataTree(value, label)
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

function boundedString(value: unknown, label: string, maxBytes: number): string {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) {
    throw new TypeError(`${label} must be a non-empty NUL-free string`)
  }
  if (Buffer.byteLength(value, "utf8") > maxBytes) throw new RangeError(`${label} exceeds ${maxBytes} UTF-8 bytes`)
  return value
}

function gitSha1(value: unknown, label: string): string {
  const text = boundedString(value, label, 40)
  if (!SHA1.test(text)) throw new TypeError(`${label} must be a lowercase Git SHA-1`)
  return text
}

export function validateCompatibilitySha256(value: unknown, label = "identity"): string {
  const text = boundedString(value, label, 64)
  if (!SHA256.test(text)) throw new TypeError(`${label} must be a lowercase SHA-256 digest`)
  return text
}

export function validateCompatibilityExtensionId(value: unknown, label = "extensionId"): string {
  const text = boundedString(value, label, 160)
  if (!EXTENSION_ID.test(text)) throw new TypeError(`${label} must be a lowercase namespaced extension id`)
  return text
}

export function validateCompatibilityCapabilityId(value: unknown, label = "capabilityId"): string {
  const text = boundedString(value, label, 160)
  if (!CAPABILITY_ID.test(text)) throw new TypeError(`${label} must be a lowercase namespaced capability id`)
  return text
}

export function validateExternalCapabilityName(value: unknown, label = "externalName"): string {
  const text = boundedString(value, label, K4_R1_LIMITS.maxExternalNameBytes)
  if ([...text].length > K4_R1_LIMITS.maxExternalNameCodePoints) {
    throw new RangeError(`${label} exceeds ${K4_R1_LIMITS.maxExternalNameCodePoints} Unicode code points`)
  }
  return text
}

function enumValue<T extends string>(value: unknown, allowed: ReadonlySet<string>, label: string): T {
  if (typeof value !== "string" || !allowed.has(value)) throw new TypeError(`${label} is unsupported`)
  return value as T
}

function licenseEvidence(value: unknown, label: string): readonly CompatibilityLicenseEvidence[] {
  if (!Array.isArray(value) || value.length < 1 || value.length > K4_R1_LIMITS.maxLicenseEvidence) {
    throw new RangeError(`${label} must contain one through ${K4_R1_LIMITS.maxLicenseEvidence} entries`)
  }
  const entries = value.map((item, index) => {
    const record = asRecord(item, `${label}[${index}]`)
    exactKeys(record, LICENSE_KEYS, `${label}[${index}]`)
    return Object.freeze({
      path: boundedString(record.path, `${label}[${index}].path`, 512),
      blob: gitSha1(record.blob, `${label}[${index}].blob`),
    })
  }).sort((left, right) => compareStrings(left.path, right.path) || compareStrings(left.blob, right.blob))
  const keys = entries.map((entry) => `${entry.path}\0${entry.blob}`)
  if (new Set(keys).size !== keys.length) throw new TypeError(`${label} contains duplicate entries`)
  return Object.freeze(entries)
}

interface StandardPinInput {
  standard: CompatibilityStandardId
  repository: string
  sourceCommit: string
  sourceTree: string
  specificationRevision: string | null
  specificationPath: string
  specificationBlob: string
  licenseEvidence: readonly CompatibilityLicenseEvidence[]
}

function buildStandardPin(input: StandardPinInput): CompatibilityStandardPin {
  const base = Object.freeze({
    version: K4_R1_COMPATIBILITY_VERSION,
    standard: input.standard,
    repository: input.repository,
    sourceCommit: input.sourceCommit,
    sourceTree: input.sourceTree,
    specificationRevision: input.specificationRevision,
    specificationPath: input.specificationPath,
    specificationBlob: input.specificationBlob,
    licenseEvidence: Object.freeze(input.licenseEvidence.map((entry) => Object.freeze({ ...entry }))),
  })
  return Object.freeze({ ...base, standardPinIdentity: sha256(base) })
}

export const K4_R1_STANDARD_PINS: readonly CompatibilityStandardPin[] = Object.freeze([
  buildStandardPin({
    standard: "MCP",
    repository: "modelcontextprotocol/modelcontextprotocol",
    sourceCommit: "57ac4a2ec742e0cb7622d899b0f5d3bcf769fd69",
    sourceTree: "164f5cb7a4a9b72a0b1c81aa0d9eeae5a21688e5",
    specificationRevision: "2026-07-28",
    specificationPath: "docs/specification/2026-07-28/index.mdx",
    specificationBlob: "452d78601b135b95bbe45287e756c0579534096b",
    licenseEvidence: [{ path: "LICENSE", blob: "4a93985763241755401a10678395303de4e720ba" }],
  }),
  buildStandardPin({
    standard: "ACP",
    repository: "agentclientprotocol/agent-client-protocol",
    sourceCommit: "62c74ac119ec3296809496482440afca69926ce9",
    sourceTree: "130153620c8e8a7d2934b19bd3442566bee7a6ea",
    specificationRevision: "v2",
    specificationPath: "docs/protocol/v2/overview.mdx",
    specificationBlob: "4d5e4012f9ccd6b9a3e8ad3e2d3dab55cdbe2b44",
    licenseEvidence: [{ path: "LICENSE", blob: "1de02305f81f6dc087b6229a1d86a31774d2fa31" }],
  }),
  buildStandardPin({
    standard: "AGENT_SKILLS",
    repository: "agentskills/agentskills",
    sourceCommit: "69ef37e9424c0a7ea9dd2293b559e43ec8176379",
    sourceTree: "65e11c9faad14a022055ce0ff3ebf99f2b55142f",
    specificationRevision: null,
    specificationPath: "docs/specification.mdx",
    specificationBlob: "d9a2db099d905da8b879a5c6f996728073985279",
    licenseEvidence: [
      { path: "LICENSE", blob: "a20f4476df158a57a68409015ea607c738856f57" },
      { path: "README.md", blob: "247e4a18e908d3bf27092f886f25c2515d84ecbc" },
    ],
  }),
])

const PIN_BY_STANDARD = new Map<CompatibilityStandardId, CompatibilityStandardPin>(
  K4_R1_STANDARD_PINS.map((pin) => [pin.standard, pin]),
)
const PIN_BY_IDENTITY = new Map<string, CompatibilityStandardPin>(
  K4_R1_STANDARD_PINS.map((pin) => [pin.standardPinIdentity, pin]),
)

export function compatibilityStandardPin(value: unknown): CompatibilityStandardPin {
  const standard = enumValue<CompatibilityStandardId>(value, STANDARD_SET, "compatibility standard")
  const pin = PIN_BY_STANDARD.get(standard)
  if (pin === undefined) throw new TypeError("compatibility standard pin is unavailable")
  return pin
}

export function validateCompatibilityStandardPin(value: unknown): CompatibilityStandardPin {
  const record = asRecord(dataTree(value, "compatibility standard pin"), "compatibility standard pin")
  exactKeys(record, PIN_KEYS, "compatibility standard pin")
  if (record.version !== K4_R1_COMPATIBILITY_VERSION) throw new TypeError("unsupported compatibility standard-pin version")
  const standard = enumValue<CompatibilityStandardId>(record.standard, STANDARD_SET, "compatibility standard")
  const canonical = PIN_BY_STANDARD.get(standard)
  if (canonical === undefined) throw new TypeError("compatibility standard pin is unavailable")
  const claimedIdentity = validateCompatibilitySha256(record.standardPinIdentity, "standardPinIdentity")
  const revision = record.specificationRevision === null
    ? null
    : boundedString(record.specificationRevision, "specificationRevision", 96)
  const rebuilt = buildStandardPin({
    standard,
    repository: boundedString(record.repository, "repository", 256),
    sourceCommit: gitSha1(record.sourceCommit, "sourceCommit"),
    sourceTree: gitSha1(record.sourceTree, "sourceTree"),
    specificationRevision: revision,
    specificationPath: boundedString(record.specificationPath, "specificationPath", 512),
    specificationBlob: gitSha1(record.specificationBlob, "specificationBlob"),
    licenseEvidence: licenseEvidence(record.licenseEvidence, "licenseEvidence"),
  })
  if (
    claimedIdentity !== rebuilt.standardPinIdentity
    || canonicalize(record) !== canonicalize(rebuilt)
    || canonicalize(rebuilt) !== canonicalize(canonical)
  ) throw new TypeError("compatibility standard pin does not match the canonical exact revision")
  return canonical
}

export function compatibilityPinByIdentity(value: unknown): CompatibilityStandardPin {
  const identity = validateCompatibilitySha256(value, "standardPinIdentity")
  const pin = PIN_BY_IDENTITY.get(identity)
  if (pin === undefined) throw new TypeError("unknown compatibility standard-pin identity")
  return pin
}

export function validateExternalObjectKind(value: unknown): ExternalObjectKind {
  return enumValue<ExternalObjectKind>(value, OBJECT_KIND_SET, "external object kind")
}

export function validateNormalizationDisposition(value: unknown): NormalizationDisposition {
  return enumValue<NormalizationDisposition>(value, DISPOSITION_SET, "normalization disposition")
}

function normalizedCapabilities(value: unknown, disposition: NormalizationDisposition): readonly string[] {
  if (!Array.isArray(value) || value.length > K4_R1_LIMITS.maxNormalizedCapabilities) {
    throw new RangeError(`normalizedCapabilityIds exceeds ${K4_R1_LIMITS.maxNormalizedCapabilities} entries`)
  }
  const capabilities = value.map((entry, index) => validateCompatibilityCapabilityId(entry, `normalizedCapabilityIds[${index}]`))
  if (new Set(capabilities).size !== capabilities.length) throw new TypeError("normalizedCapabilityIds contains duplicates")
  capabilities.sort(compareStrings)
  if (disposition === "UNRESOLVED" && capabilities.length !== 0) {
    throw new TypeError("UNRESOLVED requires zero normalized capabilities")
  }
  if (disposition === "SINGLE" && capabilities.length !== 1) {
    throw new TypeError("SINGLE requires exactly one normalized capability")
  }
  if (disposition === "COMPOSITE" && (capabilities.length < 2 || capabilities.length > K4_R1_LIMITS.maxNormalizedCapabilities)) {
    throw new TypeError(`COMPOSITE requires two through ${K4_R1_LIMITS.maxNormalizedCapabilities} normalized capabilities`)
  }
  return Object.freeze(capabilities)
}

function bindingFromRecord(record: UnknownRecord): ExternalCapabilityBinding {
  const pin = compatibilityPinByIdentity(record.standardPinIdentity)
  const objectKind = validateExternalObjectKind(record.objectKind)
  if (OBJECT_STANDARD[objectKind] !== pin.standard) {
    throw new TypeError(`external object kind ${objectKind} does not belong to standard ${pin.standard}`)
  }
  const disposition = validateNormalizationDisposition(record.disposition)
  const base = Object.freeze({
    version: K4_R1_COMPATIBILITY_VERSION,
    standardPinIdentity: pin.standardPinIdentity,
    objectKind,
    externalName: validateExternalCapabilityName(record.externalName),
    externalMetadataSha256: validateCompatibilitySha256(record.externalMetadataSha256, "externalMetadataSha256"),
    extensionId: validateCompatibilityExtensionId(record.extensionId),
    descriptorIdentity: validateCompatibilitySha256(record.descriptorIdentity, "descriptorIdentity"),
    disposition,
    normalizedCapabilityIds: normalizedCapabilities(record.normalizedCapabilityIds, disposition),
  })
  return Object.freeze({ ...base, bindingIdentity: sha256(base) })
}

export function createExternalCapabilityBinding(input: ExternalCapabilityBindingInput): ExternalCapabilityBinding {
  const record = asRecord(dataTree(input, "external capability binding input"), "external capability binding input")
  exactKeys(record, BINDING_INPUT_KEYS, "external capability binding input")
  return bindingFromRecord(record)
}

export function validateExternalCapabilityBinding(value: unknown): ExternalCapabilityBinding {
  const record = asRecord(dataTree(value, "external capability binding"), "external capability binding")
  exactKeys(record, BINDING_KEYS, "external capability binding")
  if (record.version !== K4_R1_COMPATIBILITY_VERSION) throw new TypeError("unsupported external capability binding version")
  const claimedIdentity = validateCompatibilitySha256(record.bindingIdentity, "bindingIdentity")
  const rebuilt = bindingFromRecord(record)
  if (claimedIdentity !== rebuilt.bindingIdentity || canonicalize(record) !== canonicalize(rebuilt)) {
    throw new TypeError("external capability binding derived fields mismatch")
  }
  return rebuilt
}

function cloneBinding(binding: ExternalCapabilityBinding): ExternalCapabilityBinding {
  return Object.freeze({ ...binding, normalizedCapabilityIds: Object.freeze([...binding.normalizedCapabilityIds]) })
}

function compareCompatibilityBindings(left: ExternalCapabilityBinding, right: ExternalCapabilityBinding): number {
  const leftKey = [
    left.standardPinIdentity, left.objectKind, left.externalName, left.extensionId,
    left.descriptorIdentity, left.bindingIdentity,
  ]
  const rightKey = [
    right.standardPinIdentity, right.objectKind, right.externalName, right.extensionId,
    right.descriptorIdentity, right.bindingIdentity,
  ]
  for (let index = 0; index < leftKey.length; index += 1) {
    const comparison = compareStrings(leftKey[index] ?? "", rightKey[index] ?? "")
    if (comparison !== 0) return comparison
  }
  return 0
}

export function createCompatibilityBindingSnapshot(value: readonly ExternalCapabilityBinding[]): CompatibilityBindingSnapshot {
  const copied = dataTree(value, "compatibility binding snapshot input")
  if (!Array.isArray(copied) || copied.length > K4_R1_LIMITS.maxRegistryBindings) {
    throw new RangeError(`compatibility binding snapshot exceeds ${K4_R1_LIMITS.maxRegistryBindings} bindings`)
  }
  const bindings = copied.map((entry) => validateExternalCapabilityBinding(entry)).sort(compareCompatibilityBindings)
  const identities = bindings.map((binding) => binding.bindingIdentity)
  if (new Set(identities).size !== identities.length) throw new TypeError("compatibility binding snapshot contains duplicate bindings")
  const conflictKeys = bindings.map((binding) => [
    binding.standardPinIdentity,
    binding.objectKind,
    binding.externalName,
    binding.extensionId,
    binding.descriptorIdentity,
  ].join("\0"))
  if (new Set(conflictKeys).size !== conflictKeys.length) throw new TypeError("compatibility binding snapshot contains conflicting bindings")
  const base = Object.freeze({
    version: K4_R1_BINDING_SNAPSHOT_VERSION,
    bindings: Object.freeze(bindings.map(cloneBinding)),
  })
  return Object.freeze({ ...base, snapshotIdentity: sha256(base) })
}

export function validateCompatibilityBindingSnapshot(value: unknown): CompatibilityBindingSnapshot {
  const record = asRecord(dataTree(value, "compatibility binding snapshot"), "compatibility binding snapshot")
  exactKeys(record, SNAPSHOT_KEYS, "compatibility binding snapshot")
  if (record.version !== K4_R1_BINDING_SNAPSHOT_VERSION) throw new TypeError("unsupported compatibility binding snapshot version")
  const claimedIdentity = validateCompatibilitySha256(record.snapshotIdentity, "snapshotIdentity")
  if (!Array.isArray(record.bindings)) throw new TypeError("compatibility binding snapshot bindings must be an array")
  const rebuilt = createCompatibilityBindingSnapshot(record.bindings as ExternalCapabilityBinding[])
  if (claimedIdentity !== rebuilt.snapshotIdentity || canonicalize(record) !== canonicalize(rebuilt)) {
    throw new TypeError("compatibility binding snapshot derived fields mismatch")
  }
  return rebuilt
}
