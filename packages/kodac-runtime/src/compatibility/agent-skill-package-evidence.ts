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

export const K4_R4_AGENT_SKILL_PACKAGE_EVIDENCE_VERSION = "k4-r4-agent-skill-package-evidence-v1" as const
export const K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY = "c82752ee60cfa019caaddda9d0230fbeb6f3b9051346135879bbc40563590819" as const
export const K4_R4_AGENT_SKILL_OBJECT_KIND = "AGENT_SKILL" as const
export const K4_R4_AGENT_SKILL_BINDING_STATES = Object.freeze(["UNBOUND", "CURRENT", "STALE"] as const)

export const K4_R4_AGENT_SKILLS_STANDARD_EVIDENCE = Object.freeze({
  repository: "agentskills/agentskills",
  sourceCommit: "69ef37e9424c0a7ea9dd2293b559e43ec8176379",
  sourceTree: "65e11c9faad14a022055ce0ff3ebf99f2b55142f",
  specificationRevision: null,
  standardPinIdentity: K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY,
  sources: Object.freeze([
    Object.freeze({ path: "docs/specification.mdx", blob: "d9a2db099d905da8b879a5c6f996728073985279" }),
    Object.freeze({ path: "LICENSE", blob: "a20f4476df158a57a68409015ea607c738856f57" }),
    Object.freeze({ path: "docs/LICENSE", blob: "4ea99c213c5c0c005ae4e80df8e52169d06896ec" }),
    Object.freeze({ path: "README.md", blob: "247e4a18e908d3bf27092f886f25c2515d84ecbc" }),
  ]),
} as const)

export const K4_R4_AGENT_SKILL_LIMITS = Object.freeze({
  maxNameCodePoints: 64,
  maxDescriptionCodePoints: 1_024,
  maxDescriptionBytes: 4_096,
  maxLicenseCodePoints: 1_024,
  maxLicenseBytes: 4_096,
  maxCompatibilityCodePoints: 500,
  maxCompatibilityBytes: 2_000,
  maxMetadataEntries: 64,
  maxMetadataKeyCodePoints: 128,
  maxMetadataKeyBytes: 512,
  maxMetadataValueCodePoints: 1_024,
  maxMetadataValueBytes: 4_096,
  maxMetadataTotalBytes: 65_536,
  maxAllowedToolsBytes: 16_384,
  maxPackageFiles: 65_536,
} as const)

export type AgentSkillBindingState = typeof K4_R4_AGENT_SKILL_BINDING_STATES[number]

export interface AgentSkillMetadataEntry {
  readonly key: string
  readonly value: string
}

export interface AgentSkillDigestEvidence {
  readonly sha256: string
  readonly byteLength: number
}

export interface AgentSkillPackageManifestEvidence {
  readonly sha256: string
  readonly fileCount: number
  readonly totalByteLength: number
}

export interface AgentSkillPackageEvidenceInput {
  readonly standardPinIdentity: typeof K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY
  readonly extensionId: string
  readonly descriptorIdentity: string
  readonly directoryName: string
  readonly name: string
  readonly description: string
  readonly license: string | null
  readonly compatibility: string | null
  readonly metadataEntries: readonly AgentSkillMetadataEntry[]
  readonly allowedToolsEvidence: AgentSkillDigestEvidence | null
  readonly instructionBodyEvidence: AgentSkillDigestEvidence
  readonly skillFileEvidence: AgentSkillDigestEvidence
  readonly packageManifestEvidence: AgentSkillPackageManifestEvidence
  readonly sourceProvenanceIdentity: string
}

export interface AgentSkillMetadataEvidence {
  readonly sha256: string
  readonly entryCount: number
  readonly totalByteLength: number
}

interface AgentSkillPackageEvidenceBase {
  readonly version: typeof K4_R4_AGENT_SKILL_PACKAGE_EVIDENCE_VERSION
  readonly standardPinIdentity: typeof K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY
  readonly sourceEvidence: typeof K4_R4_AGENT_SKILLS_STANDARD_EVIDENCE
  readonly objectKind: typeof K4_R4_AGENT_SKILL_OBJECT_KIND
  readonly extensionId: string
  readonly descriptorIdentity: string
  readonly bindingSnapshotIdentity: string
  readonly directoryName: string
  readonly name: string
  readonly descriptionEvidence: AgentSkillDigestEvidence
  readonly licenseEvidence: AgentSkillDigestEvidence | null
  readonly compatibilityEvidence: AgentSkillDigestEvidence | null
  readonly metadataEvidence: AgentSkillMetadataEvidence
  readonly allowedToolsEvidence: AgentSkillDigestEvidence | null
  readonly instructionBodyEvidence: AgentSkillDigestEvidence
  readonly skillFileEvidence: AgentSkillDigestEvidence
  readonly packageManifestEvidence: AgentSkillPackageManifestEvidence
  readonly sourceProvenanceIdentity: string
  readonly externalMetadataSha256: string
  readonly bindingState: AgentSkillBindingState
}

export interface UnboundAgentSkillPackageEvidence extends AgentSkillPackageEvidenceBase {
  readonly bindingState: "UNBOUND"
  readonly evidenceIdentity: string
}

export interface CurrentAgentSkillPackageEvidence extends AgentSkillPackageEvidenceBase {
  readonly bindingState: "CURRENT"
  readonly bindingIdentity: string
  readonly disposition: NormalizationDisposition
  readonly normalizedCapabilityIds: readonly string[]
  readonly evidenceIdentity: string
}

export interface StaleAgentSkillPackageEvidence extends AgentSkillPackageEvidenceBase {
  readonly bindingState: "STALE"
  readonly bindingIdentity: string
  readonly evidenceIdentity: string
}

export type AgentSkillPackageEvidence =
  | UnboundAgentSkillPackageEvidence
  | CurrentAgentSkillPackageEvidence
  | StaleAgentSkillPackageEvidence

type UnknownRecord = Record<string, unknown>
type EvidenceWithoutIdentity =
  | Omit<UnboundAgentSkillPackageEvidence, "evidenceIdentity">
  | Omit<CurrentAgentSkillPackageEvidence, "evidenceIdentity">
  | Omit<StaleAgentSkillPackageEvidence, "evidenceIdentity">

const INPUT_KEYS = [
  "standardPinIdentity", "extensionId", "descriptorIdentity", "directoryName", "name", "description",
  "license", "compatibility", "metadataEntries", "allowedToolsEvidence", "instructionBodyEvidence",
  "skillFileEvidence", "packageManifestEvidence", "sourceProvenanceIdentity",
] as const
const METADATA_ENTRY_KEYS = ["key", "value"] as const
const DIGEST_EVIDENCE_KEYS = ["sha256", "byteLength"] as const
const MANIFEST_EVIDENCE_KEYS = ["sha256", "fileCount", "totalByteLength"] as const
const METADATA_EVIDENCE_KEYS = ["sha256", "entryCount", "totalByteLength"] as const
const BASE_EVIDENCE_KEYS = [
  "version", "standardPinIdentity", "sourceEvidence", "objectKind", "extensionId", "descriptorIdentity",
  "bindingSnapshotIdentity", "directoryName", "name", "descriptionEvidence", "licenseEvidence",
  "compatibilityEvidence", "metadataEvidence", "allowedToolsEvidence", "instructionBodyEvidence",
  "skillFileEvidence", "packageManifestEvidence", "sourceProvenanceIdentity", "externalMetadataSha256",
  "bindingState", "evidenceIdentity",
] as const
const STALE_EVIDENCE_KEYS = [...BASE_EVIDENCE_KEYS, "bindingIdentity"] as const
const CURRENT_EVIDENCE_KEYS = [...STALE_EVIDENCE_KEYS, "disposition", "normalizedCapabilityIds"] as const
const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const REGISTRY_PROTOTYPE = CompatibilityBindingRegistry.prototype
const CANONICAL_REGISTRY_LIST = REGISTRY_PROTOTYPE.list
const CANONICAL_REGISTRY_SNAPSHOT = Object.getOwnPropertyDescriptor(REGISTRY_PROTOTYPE, "snapshot")?.value

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

function textSha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
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

function safeInteger(value: unknown, label: string, minimum: number, maximum = Number.MAX_SAFE_INTEGER): number {
  if (!Number.isSafeInteger(value) || (value as number) < minimum || (value as number) > maximum) {
    throw new RangeError(`${label} must be a safe integer from ${minimum} through ${maximum}`)
  }
  return value as number
}

function boundedText(
  value: unknown,
  label: string,
  minimumCodePoints: number,
  maximumCodePoints: number,
  maximumBytes: number,
): string {
  if (typeof value !== "string") throw new TypeError(`${label} must be a string`)
  if (value.length > maximumCodePoints * 2) throw new RangeError(`${label} exceeds its code-point bound`)
  if (value.includes("\0")) throw new TypeError(`${label} must not contain NUL`)
  const bytes = Buffer.byteLength(value, "utf8")
  let codePoints = 0
  for (const _codePoint of value) {
    codePoints += 1
    if (codePoints > maximumCodePoints) throw new RangeError(`${label} exceeds its code-point bound`)
  }
  if (codePoints < minimumCodePoints || codePoints > maximumCodePoints || bytes > maximumBytes) {
    throw new RangeError(`${label} exceeds its UTF-8 or code-point bound`)
  }
  return value
}

function skillName(value: unknown, label: string): string {
  const result = boundedText(
    value,
    label,
    1,
    K4_R4_AGENT_SKILL_LIMITS.maxNameCodePoints,
    K4_R4_AGENT_SKILL_LIMITS.maxNameCodePoints,
  )
  if (!SKILL_NAME.test(result)) throw new TypeError(`${label} must use the canonical Agent Skills name grammar`)
  return result
}

function validateAgentSkillsPin(value: unknown): typeof K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY {
  const identity = validateCompatibilitySha256(value, "standardPinIdentity")
  if (
    identity !== K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY
    || compatibilityStandardPin("AGENT_SKILLS").standardPinIdentity !== identity
  ) throw new TypeError("standardPinIdentity must equal the canonical Agent Skills standard pin")
  return K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY
}

function digestEvidence(
  value: unknown,
  label: string,
  minimumBytes: number,
  maximumBytes = Number.MAX_SAFE_INTEGER,
): AgentSkillDigestEvidence {
  const record = asRecord(value, label)
  exactKeys(record, DIGEST_EVIDENCE_KEYS, label)
  return Object.freeze({
    sha256: validateCompatibilitySha256(record.sha256, `${label}.sha256`),
    byteLength: safeInteger(record.byteLength, `${label}.byteLength`, minimumBytes, maximumBytes),
  })
}

function manifestEvidence(value: unknown, label: string): AgentSkillPackageManifestEvidence {
  const record = asRecord(value, label)
  exactKeys(record, MANIFEST_EVIDENCE_KEYS, label)
  return Object.freeze({
    sha256: validateCompatibilitySha256(record.sha256, `${label}.sha256`),
    fileCount: safeInteger(record.fileCount, `${label}.fileCount`, 1, K4_R4_AGENT_SKILL_LIMITS.maxPackageFiles),
    totalByteLength: safeInteger(record.totalByteLength, `${label}.totalByteLength`, 1),
  })
}

function metadataEntries(value: unknown): readonly AgentSkillMetadataEntry[] {
  if (!Array.isArray(value) || value.length > K4_R4_AGENT_SKILL_LIMITS.maxMetadataEntries) {
    throw new RangeError(`metadataEntries must contain zero through ${K4_R4_AGENT_SKILL_LIMITS.maxMetadataEntries} entries`)
  }
  let totalBytes = 0
  const entries = value.map((entry, index) => {
    const label = `metadataEntries[${index}]`
    const record = asRecord(entry, label)
    exactKeys(record, METADATA_ENTRY_KEYS, label)
    const key = boundedText(
      record.key,
      `${label}.key`,
      1,
      K4_R4_AGENT_SKILL_LIMITS.maxMetadataKeyCodePoints,
      K4_R4_AGENT_SKILL_LIMITS.maxMetadataKeyBytes,
    )
    const metadataValue = boundedText(
      record.value,
      `${label}.value`,
      0,
      K4_R4_AGENT_SKILL_LIMITS.maxMetadataValueCodePoints,
      K4_R4_AGENT_SKILL_LIMITS.maxMetadataValueBytes,
    )
    totalBytes += Buffer.byteLength(key, "utf8") + Buffer.byteLength(metadataValue, "utf8")
    return Object.freeze({ key, value: metadataValue })
  })
  if (totalBytes > K4_R4_AGENT_SKILL_LIMITS.maxMetadataTotalBytes) {
    throw new RangeError(`metadataEntries exceeds ${K4_R4_AGENT_SKILL_LIMITS.maxMetadataTotalBytes} UTF-8 bytes`)
  }
  if (new Set(entries.map((entry) => entry.key)).size !== entries.length) {
    throw new TypeError("metadataEntries contains duplicate keys")
  }
  entries.sort((left, right) => compareStrings(left.key, right.key) || compareStrings(left.value, right.value))
  return Object.freeze(entries)
}

function textEvidence(value: string): AgentSkillDigestEvidence {
  return Object.freeze({ sha256: textSha256(value), byteLength: Buffer.byteLength(value, "utf8") })
}

function derivedMetadataEvidence(entries: readonly AgentSkillMetadataEntry[]): AgentSkillMetadataEvidence {
  const totalByteLength = entries.reduce(
    (total, entry) => total + Buffer.byteLength(entry.key, "utf8") + Buffer.byteLength(entry.value, "utf8"),
    0,
  )
  return Object.freeze({ sha256: sha256(entries), entryCount: entries.length, totalByteLength })
}

export function validateAgentSkillPackageEvidenceInput(value: unknown): AgentSkillPackageEvidenceInput {
  const label = "Agent Skill package evidence input"
  const record = asRecord(copyDataTree(value, label), label)
  exactKeys(record, INPUT_KEYS, label)
  const directoryName = skillName(record.directoryName, "directoryName")
  const name = skillName(record.name, "name")
  if (directoryName !== name) throw new TypeError("directoryName must exactly equal name")
  const description = boundedText(
    record.description,
    "description",
    1,
    K4_R4_AGENT_SKILL_LIMITS.maxDescriptionCodePoints,
    K4_R4_AGENT_SKILL_LIMITS.maxDescriptionBytes,
  )
  const license = record.license === null
    ? null
    : boundedText(record.license, "license", 1, K4_R4_AGENT_SKILL_LIMITS.maxLicenseCodePoints, K4_R4_AGENT_SKILL_LIMITS.maxLicenseBytes)
  const compatibility = record.compatibility === null
    ? null
    : boundedText(
      record.compatibility,
      "compatibility",
      1,
      K4_R4_AGENT_SKILL_LIMITS.maxCompatibilityCodePoints,
      K4_R4_AGENT_SKILL_LIMITS.maxCompatibilityBytes,
    )
  return Object.freeze({
    standardPinIdentity: validateAgentSkillsPin(record.standardPinIdentity),
    extensionId: validateCompatibilityExtensionId(record.extensionId, "extensionId"),
    descriptorIdentity: validateCompatibilitySha256(record.descriptorIdentity, "descriptorIdentity"),
    directoryName,
    name,
    description,
    license,
    compatibility,
    metadataEntries: metadataEntries(record.metadataEntries),
    allowedToolsEvidence: record.allowedToolsEvidence === null
      ? null
      : digestEvidence(
        record.allowedToolsEvidence,
        "allowedToolsEvidence",
        1,
        K4_R4_AGENT_SKILL_LIMITS.maxAllowedToolsBytes,
      ),
    instructionBodyEvidence: digestEvidence(record.instructionBodyEvidence, "instructionBodyEvidence", 0),
    skillFileEvidence: digestEvidence(record.skillFileEvidence, "skillFileEvidence", 1),
    packageManifestEvidence: manifestEvidence(record.packageManifestEvidence, "packageManifestEvidence"),
    sourceProvenanceIdentity: validateCompatibilitySha256(record.sourceProvenanceIdentity, "sourceProvenanceIdentity"),
  })
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

function exactBinding(
  snapshot: CompatibilityBindingSnapshot,
  input: AgentSkillPackageEvidenceInput,
): ExternalCapabilityBinding | undefined {
  const matches = snapshot.bindings.filter((binding) => (
    binding.standardPinIdentity === input.standardPinIdentity
    && binding.objectKind === K4_R4_AGENT_SKILL_OBJECT_KIND
    && binding.externalName === input.name
    && binding.extensionId === input.extensionId
    && binding.descriptorIdentity === input.descriptorIdentity
  ))
  if (matches.length > 1) throw new TypeError("binding snapshot contains a conflicting exact Agent Skill tuple")
  return matches[0]
}

function externalMetadataRecord(
  input: AgentSkillPackageEvidenceInput,
  evidence: {
    descriptionEvidence: AgentSkillDigestEvidence
    licenseEvidence: AgentSkillDigestEvidence | null
    compatibilityEvidence: AgentSkillDigestEvidence | null
    metadataEvidence: AgentSkillMetadataEvidence
  },
): UnknownRecord {
  return {
    version: K4_R4_AGENT_SKILL_PACKAGE_EVIDENCE_VERSION,
    standardPinIdentity: input.standardPinIdentity,
    objectKind: K4_R4_AGENT_SKILL_OBJECT_KIND,
    directoryName: input.directoryName,
    name: input.name,
    descriptionEvidence: evidence.descriptionEvidence,
    licenseEvidence: evidence.licenseEvidence,
    compatibilityEvidence: evidence.compatibilityEvidence,
    metadataEvidence: evidence.metadataEvidence,
    allowedToolsEvidence: input.allowedToolsEvidence,
    instructionBodyEvidence: input.instructionBodyEvidence,
    skillFileEvidence: input.skillFileEvidence,
    packageManifestEvidence: input.packageManifestEvidence,
    sourceProvenanceIdentity: input.sourceProvenanceIdentity,
  }
}

function evidenceWithIdentity(base: EvidenceWithoutIdentity): AgentSkillPackageEvidence {
  if (base.bindingState === "CURRENT") {
    const frozen = Object.freeze({ ...base, normalizedCapabilityIds: Object.freeze([...base.normalizedCapabilityIds]) })
    return Object.freeze({ ...frozen, evidenceIdentity: sha256(frozen) })
  }
  const frozen = Object.freeze({ ...base })
  return Object.freeze({ ...frozen, evidenceIdentity: sha256(frozen) })
}

export function materializeAgentSkillPackageEvidence(
  value: unknown,
  registry: CompatibilityBindingRegistry,
): AgentSkillPackageEvidence {
  const input = validateAgentSkillPackageEvidenceInput(value)
  const snapshot = captureBindingSnapshot(registry)
  const descriptionEvidence = textEvidence(input.description)
  const licenseEvidence = input.license === null ? null : textEvidence(input.license)
  const compatibilityEvidence = input.compatibility === null ? null : textEvidence(input.compatibility)
  const metadataEvidence = derivedMetadataEvidence(input.metadataEntries)
  const externalMetadataSha256 = sha256(externalMetadataRecord(input, {
    descriptionEvidence,
    licenseEvidence,
    compatibilityEvidence,
    metadataEvidence,
  }))
  const common = Object.freeze({
    version: K4_R4_AGENT_SKILL_PACKAGE_EVIDENCE_VERSION,
    standardPinIdentity: input.standardPinIdentity,
    sourceEvidence: K4_R4_AGENT_SKILLS_STANDARD_EVIDENCE,
    objectKind: K4_R4_AGENT_SKILL_OBJECT_KIND,
    extensionId: input.extensionId,
    descriptorIdentity: input.descriptorIdentity,
    bindingSnapshotIdentity: snapshot.snapshotIdentity,
    directoryName: input.directoryName,
    name: input.name,
    descriptionEvidence,
    licenseEvidence,
    compatibilityEvidence,
    metadataEvidence,
    allowedToolsEvidence: input.allowedToolsEvidence,
    instructionBodyEvidence: input.instructionBodyEvidence,
    skillFileEvidence: input.skillFileEvidence,
    packageManifestEvidence: input.packageManifestEvidence,
    sourceProvenanceIdentity: input.sourceProvenanceIdentity,
    externalMetadataSha256,
  })
  const binding = exactBinding(snapshot, input)
  if (binding === undefined) return evidenceWithIdentity({ ...common, bindingState: "UNBOUND" })
  if (binding.externalMetadataSha256 !== externalMetadataSha256) {
    return evidenceWithIdentity({ ...common, bindingState: "STALE", bindingIdentity: binding.bindingIdentity })
  }
  return evidenceWithIdentity({
    ...common,
    bindingState: "CURRENT",
    bindingIdentity: binding.bindingIdentity,
    disposition: binding.disposition,
    normalizedCapabilityIds: binding.normalizedCapabilityIds,
  })
}

function metadataEvidence(value: unknown, label: string): AgentSkillMetadataEvidence {
  const record = asRecord(value, label)
  exactKeys(record, METADATA_EVIDENCE_KEYS, label)
  return Object.freeze({
    sha256: validateCompatibilitySha256(record.sha256, `${label}.sha256`),
    entryCount: safeInteger(record.entryCount, `${label}.entryCount`, 0, K4_R4_AGENT_SKILL_LIMITS.maxMetadataEntries),
    totalByteLength: safeInteger(
      record.totalByteLength,
      `${label}.totalByteLength`,
      0,
      K4_R4_AGENT_SKILL_LIMITS.maxMetadataTotalBytes,
    ),
  })
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

export function validateAgentSkillPackageEvidence(value: unknown): AgentSkillPackageEvidence {
  const label = "Agent Skill package evidence"
  const record = asRecord(copyDataTree(value, label), label)
  const bindingState = record.bindingState
  if (
    typeof bindingState !== "string"
    || !K4_R4_AGENT_SKILL_BINDING_STATES.includes(bindingState as AgentSkillBindingState)
  ) throw new TypeError("Agent Skill package evidence bindingState is unsupported")
  exactKeys(
    record,
    bindingState === "CURRENT" ? CURRENT_EVIDENCE_KEYS : bindingState === "STALE" ? STALE_EVIDENCE_KEYS : BASE_EVIDENCE_KEYS,
    label,
  )
  if (record.version !== K4_R4_AGENT_SKILL_PACKAGE_EVIDENCE_VERSION) {
    throw new TypeError("unsupported Agent Skill package evidence version")
  }
  if (canonicalize(record.sourceEvidence) !== canonicalize(K4_R4_AGENT_SKILLS_STANDARD_EVIDENCE)) {
    throw new TypeError("sourceEvidence must equal the exact pinned Agent Skills evidence")
  }
  if (record.objectKind !== K4_R4_AGENT_SKILL_OBJECT_KIND) {
    throw new TypeError("objectKind must equal AGENT_SKILL")
  }
  const directoryName = skillName(record.directoryName, "directoryName")
  const name = skillName(record.name, "name")
  if (directoryName !== name) throw new TypeError("directoryName must exactly equal name")
  const descriptionEvidence = digestEvidence(
    record.descriptionEvidence,
    "descriptionEvidence",
    1,
    K4_R4_AGENT_SKILL_LIMITS.maxDescriptionBytes,
  )
  const licenseEvidence = record.licenseEvidence === null
    ? null
    : digestEvidence(record.licenseEvidence, "licenseEvidence", 1, K4_R4_AGENT_SKILL_LIMITS.maxLicenseBytes)
  const compatibilityEvidence = record.compatibilityEvidence === null
    ? null
    : digestEvidence(
      record.compatibilityEvidence,
      "compatibilityEvidence",
      1,
      K4_R4_AGENT_SKILL_LIMITS.maxCompatibilityBytes,
    )
  const validatedMetadataEvidence = metadataEvidence(record.metadataEvidence, "metadataEvidence")
  const allowedToolsEvidence = record.allowedToolsEvidence === null
    ? null
    : digestEvidence(record.allowedToolsEvidence, "allowedToolsEvidence", 1, K4_R4_AGENT_SKILL_LIMITS.maxAllowedToolsBytes)
  const instructionBodyEvidence = digestEvidence(record.instructionBodyEvidence, "instructionBodyEvidence", 0)
  const skillFileEvidence = digestEvidence(record.skillFileEvidence, "skillFileEvidence", 1)
  const packageManifestEvidence = manifestEvidence(record.packageManifestEvidence, "packageManifestEvidence")
  const standardPinIdentity = validateAgentSkillsPin(record.standardPinIdentity)
  const sourceProvenanceIdentity = validateCompatibilitySha256(record.sourceProvenanceIdentity, "sourceProvenanceIdentity")
  const portable = {
    version: K4_R4_AGENT_SKILL_PACKAGE_EVIDENCE_VERSION,
    standardPinIdentity,
    objectKind: K4_R4_AGENT_SKILL_OBJECT_KIND,
    directoryName,
    name,
    descriptionEvidence,
    licenseEvidence,
    compatibilityEvidence,
    metadataEvidence: validatedMetadataEvidence,
    allowedToolsEvidence,
    instructionBodyEvidence,
    skillFileEvidence,
    packageManifestEvidence,
    sourceProvenanceIdentity,
  }
  const externalMetadataSha256 = validateCompatibilitySha256(record.externalMetadataSha256, "externalMetadataSha256")
  if (externalMetadataSha256 !== sha256(portable)) throw new TypeError("Agent Skill external metadata digest mismatch")
  const common = Object.freeze({
    version: K4_R4_AGENT_SKILL_PACKAGE_EVIDENCE_VERSION,
    standardPinIdentity,
    sourceEvidence: K4_R4_AGENT_SKILLS_STANDARD_EVIDENCE,
    objectKind: K4_R4_AGENT_SKILL_OBJECT_KIND,
    extensionId: validateCompatibilityExtensionId(record.extensionId, "extensionId"),
    descriptorIdentity: validateCompatibilitySha256(record.descriptorIdentity, "descriptorIdentity"),
    bindingSnapshotIdentity: validateCompatibilitySha256(record.bindingSnapshotIdentity, "bindingSnapshotIdentity"),
    directoryName,
    name,
    descriptionEvidence,
    licenseEvidence,
    compatibilityEvidence,
    metadataEvidence: validatedMetadataEvidence,
    allowedToolsEvidence,
    instructionBodyEvidence,
    skillFileEvidence,
    packageManifestEvidence,
    sourceProvenanceIdentity,
    externalMetadataSha256,
  })
  let rebuilt: AgentSkillPackageEvidence
  if (bindingState === "UNBOUND") {
    rebuilt = evidenceWithIdentity({ ...common, bindingState })
  } else if (bindingState === "STALE") {
    rebuilt = evidenceWithIdentity({
      ...common,
      bindingState: "STALE",
      bindingIdentity: validateCompatibilitySha256(record.bindingIdentity, "bindingIdentity"),
    })
  } else {
    const disposition = validateNormalizationDisposition(record.disposition)
    const normalizedCapabilityIds = validatedCapabilities(record.normalizedCapabilityIds)
    if (disposition === "UNRESOLVED" && normalizedCapabilityIds.length !== 0) {
      throw new TypeError("CURRENT UNRESOLVED evidence requires zero normalized capabilities")
    }
    if (disposition === "SINGLE" && normalizedCapabilityIds.length !== 1) {
      throw new TypeError("CURRENT SINGLE evidence requires exactly one normalized capability")
    }
    if (disposition === "COMPOSITE" && normalizedCapabilityIds.length < 2) {
      throw new TypeError("CURRENT COMPOSITE evidence requires at least two normalized capabilities")
    }
    rebuilt = evidenceWithIdentity({
      ...common,
      bindingState: "CURRENT",
      bindingIdentity: validateCompatibilitySha256(record.bindingIdentity, "bindingIdentity"),
      disposition,
      normalizedCapabilityIds,
    })
  }
  const claimedIdentity = validateCompatibilitySha256(record.evidenceIdentity, "evidenceIdentity")
  if (claimedIdentity !== rebuilt.evidenceIdentity || canonicalize(record) !== canonicalize(rebuilt)) {
    throw new TypeError("Agent Skill package evidence derived fields mismatch")
  }
  return rebuilt
}
