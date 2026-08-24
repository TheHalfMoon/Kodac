import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import test from "node:test"

import {
  K4_R4_AGENT_SKILL_BINDING_STATES,
  K4_R4_AGENT_SKILL_LIMITS,
  K4_R4_AGENT_SKILL_OBJECT_KIND,
  K4_R4_AGENT_SKILL_PACKAGE_EVIDENCE_VERSION,
  K4_R4_AGENT_SKILLS_STANDARD_EVIDENCE,
  K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY,
  materializeAgentSkillPackageEvidence,
  validateAgentSkillPackageEvidence,
  validateAgentSkillPackageEvidenceInput,
  type AgentSkillPackageEvidence,
  type AgentSkillPackageEvidenceInput,
} from "../src/compatibility/agent-skill-package-evidence.ts"
import {
  compatibilityStandardPin,
  createExternalCapabilityBinding,
  type ExternalCapabilityBindingInput,
} from "../src/compatibility/contracts.ts"
import { CompatibilityBindingRegistry } from "../src/compatibility/registry.ts"
import { createExtensionDescriptor, type ExtensionDescriptor } from "../src/extensions/contracts.ts"
import { ExtensionDescriptorRegistry } from "../src/extensions/registry.ts"

const source = (relative: string) => readFileSync(new URL(relative, import.meta.url), "utf8")
const digest = (text: string) => createHash("sha256").update(text, "utf8").digest("hex")

function canonicalize(value: unknown): string {
  if (value === null || typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
    return JSON.stringify(value)
  }
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`
  const record = value as Record<string, unknown>
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(record[key])}`).join(",")}}`
}

function identity(value: unknown): string {
  return digest(canonicalize(value))
}

function jsonCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function adapter(extensionId = "kodac/agent-skill-adapter"): ExtensionDescriptor {
  return createExtensionDescriptor({
    extensionId,
    extensionVersion: "1.0.0",
    provenance: {
      sourceType: "EXTERNAL_DECLARATION",
      sourceId: "kodac/k4-r4-test-adapter",
      sourceRevision: "1.0.0",
      license: "Apache-2.0",
      intakeMode: "DECLARATION",
    },
    capabilities: [
      { capabilityId: "skills/read", roles: ["PROVIDER"] },
      { capabilityId: "skills/inspect", roles: ["PROVIDER"] },
    ],
  })
}

function registryFor(...descriptors: ExtensionDescriptor[]): CompatibilityBindingRegistry {
  const extensionRegistry = new ExtensionDescriptorRegistry()
  for (const descriptor of descriptors) extensionRegistry.register(descriptor)
  return new CompatibilityBindingRegistry(extensionRegistry)
}

function input(
  descriptor = adapter(),
  overrides: Partial<AgentSkillPackageEvidenceInput> = {},
): AgentSkillPackageEvidenceInput {
  return {
    standardPinIdentity: K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY,
    extensionId: descriptor.extensionId,
    descriptorIdentity: descriptor.descriptorIdentity,
    directoryName: "release-notes",
    name: "release-notes",
    description: "Prepare concise release notes from caller-selected changes.",
    license: "Apache-2.0",
    compatibility: "Requires caller-provided change evidence.",
    metadataEntries: [
      { key: "x-private-version", value: "1" },
      { key: "x-private-category", value: "documentation" },
    ],
    allowedToolsEvidence: { sha256: digest("Read Grep"), byteLength: Buffer.byteLength("Read Grep") },
    instructionBodyEvidence: { sha256: digest("# Instructions"), byteLength: Buffer.byteLength("# Instructions") },
    skillFileEvidence: { sha256: digest("skill file"), byteLength: Buffer.byteLength("skill file") },
    packageManifestEvidence: { sha256: digest("manifest"), fileCount: 3, totalByteLength: 4_096 },
    sourceProvenanceIdentity: digest("caller-provenance"),
    ...overrides,
  }
}

function bindingInput(
  descriptor: ExtensionDescriptor,
  externalMetadataSha256: string,
  overrides: Partial<ExternalCapabilityBindingInput> = {},
): ExternalCapabilityBindingInput {
  return {
    standardPinIdentity: K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY,
    objectKind: K4_R4_AGENT_SKILL_OBJECT_KIND,
    externalName: "release-notes",
    externalMetadataSha256,
    extensionId: descriptor.extensionId,
    descriptorIdentity: descriptor.descriptorIdentity,
    disposition: "SINGLE",
    normalizedCapabilityIds: ["skills/read"],
    ...overrides,
  }
}

function hostileProxy<T extends object>(value: T, onTrap: () => void): T {
  return new Proxy(value, {
    get() { onTrap(); throw new Error("proxy get trap executed") },
    ownKeys() { onTrap(); throw new Error("proxy ownKeys trap executed") },
    getOwnPropertyDescriptor() { onTrap(); throw new Error("proxy descriptor trap executed") },
    getPrototypeOf() { onTrap(); throw new Error("proxy prototype trap executed") },
  })
}

function assertDeepFrozen(value: unknown, seen = new Set<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return
  seen.add(value)
  assert.equal(Object.isFrozen(value), true)
  for (const nested of Object.values(value)) assertDeepFrozen(nested, seen)
}

test("K4-R4 pins the exact Agent Skills source evidence and bounded vocabulary", () => {
  assert.equal(K4_R4_AGENT_SKILL_PACKAGE_EVIDENCE_VERSION, "k4-r4-agent-skill-package-evidence-v1")
  assert.equal(K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY, compatibilityStandardPin("AGENT_SKILLS").standardPinIdentity)
  assert.equal(K4_R4_AGENT_SKILL_OBJECT_KIND, "AGENT_SKILL")
  assert.deepEqual(K4_R4_AGENT_SKILL_BINDING_STATES, ["UNBOUND", "CURRENT", "STALE"])
  assert.deepEqual(K4_R4_AGENT_SKILLS_STANDARD_EVIDENCE, {
    repository: "agentskills/agentskills",
    sourceCommit: "69ef37e9424c0a7ea9dd2293b559e43ec8176379",
    sourceTree: "65e11c9faad14a022055ce0ff3ebf99f2b55142f",
    specificationRevision: null,
    standardPinIdentity: K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY,
    sources: [
      { path: "docs/specification.mdx", blob: "d9a2db099d905da8b879a5c6f996728073985279" },
      { path: "LICENSE", blob: "a20f4476df158a57a68409015ea607c738856f57" },
      { path: "docs/LICENSE", blob: "4ea99c213c5c0c005ae4e80df8e52169d06896ec" },
      { path: "README.md", blob: "247e4a18e908d3bf27092f886f25c2515d84ecbc" },
    ],
  })
  assert.equal(K4_R4_AGENT_SKILL_LIMITS.maxMetadataEntries, 64)
  assert.equal(K4_R4_AGENT_SKILL_LIMITS.maxAllowedToolsBytes, 16_384)
  assertDeepFrozen(K4_R4_AGENT_SKILLS_STANDARD_EVIDENCE)
  assertDeepFrozen(K4_R4_AGENT_SKILL_LIMITS)
})

test("K4-R4 materializes immutable UNBOUND evidence and redacts every untrusted text field", () => {
  const descriptor = adapter()
  const raw = input(descriptor)
  const evidence = materializeAgentSkillPackageEvidence(raw, registryFor(descriptor))
  assert.equal(evidence.bindingState, "UNBOUND")
  assert.equal(evidence.objectKind, "AGENT_SKILL")
  assert.equal(evidence.directoryName, raw.directoryName)
  assert.equal(evidence.name, raw.name)
  assert.deepEqual(evidence.descriptionEvidence, {
    sha256: digest(raw.description),
    byteLength: Buffer.byteLength(raw.description),
  })
  assert.deepEqual(evidence.licenseEvidence, {
    sha256: digest(raw.license!),
    byteLength: Buffer.byteLength(raw.license!),
  })
  assert.deepEqual(evidence.compatibilityEvidence, {
    sha256: digest(raw.compatibility!),
    byteLength: Buffer.byteLength(raw.compatibility!),
  })
  const sortedMetadata = [...raw.metadataEntries].sort((left, right) => left.key.localeCompare(right.key))
  assert.deepEqual(evidence.metadataEvidence, {
    sha256: identity(sortedMetadata),
    entryCount: 2,
    totalByteLength: sortedMetadata.reduce(
      (total, entry) => total + Buffer.byteLength(entry.key) + Buffer.byteLength(entry.value),
      0,
    ),
  })
  const serialized = JSON.stringify(evidence)
  for (const secret of [
    raw.description, raw.license!, raw.compatibility!, "x-private-category", "x-private-version", "documentation",
    "Read Grep", "# Instructions",
  ]) {
    assert.equal(serialized.includes(secret), false)
  }
  assert.equal(Object.hasOwn(evidence, "allowedTools"), false)
  assert.equal(Object.hasOwn(evidence, "instructionBody"), false)
  const { evidenceIdentity, ...base } = evidence
  assert.equal(evidenceIdentity, identity(base))
  const reorderedMetadata = materializeAgentSkillPackageEvidence({
    ...raw,
    metadataEntries: [...raw.metadataEntries].reverse(),
  }, registryFor(descriptor))
  assert.deepEqual(reorderedMetadata, evidence)
  const reorderedKeys = {
    sourceProvenanceIdentity: raw.sourceProvenanceIdentity,
    packageManifestEvidence: raw.packageManifestEvidence,
    skillFileEvidence: raw.skillFileEvidence,
    instructionBodyEvidence: raw.instructionBodyEvidence,
    allowedToolsEvidence: raw.allowedToolsEvidence,
    metadataEntries: raw.metadataEntries,
    compatibility: raw.compatibility,
    license: raw.license,
    description: raw.description,
    name: raw.name,
    directoryName: raw.directoryName,
    descriptorIdentity: raw.descriptorIdentity,
    extensionId: raw.extensionId,
    standardPinIdentity: raw.standardPinIdentity,
  }
  assert.deepEqual(materializeAgentSkillPackageEvidence(reorderedKeys, registryFor(descriptor)), evidence)
  assert.deepEqual(validateAgentSkillPackageEvidence(jsonCopy(evidence)), evidence)
  assertDeepFrozen(evidence)
})

test("K4-R4 derives CURRENT and STALE only from the exact Agent Skill binding tuple", () => {
  const descriptor = adapter()
  const other = adapter("kodac/other-skill-adapter")
  const unbound = materializeAgentSkillPackageEvidence(input(descriptor), registryFor(descriptor))

  const currentRegistry = registryFor(descriptor, other)
  currentRegistry.register(createExternalCapabilityBinding(bindingInput(other, unbound.externalMetadataSha256)))
  currentRegistry.register(createExternalCapabilityBinding(bindingInput(descriptor, unbound.externalMetadataSha256, {
    disposition: "COMPOSITE",
    normalizedCapabilityIds: ["skills/inspect", "skills/read"],
  })))
  const current = materializeAgentSkillPackageEvidence(input(descriptor), currentRegistry)
  assert.equal(current.bindingState, "CURRENT")
  if (current.bindingState === "CURRENT") {
    assert.equal(current.disposition, "COMPOSITE")
    assert.deepEqual(current.normalizedCapabilityIds, ["skills/inspect", "skills/read"])
  }

  const staleRegistry = registryFor(descriptor)
  staleRegistry.register(createExternalCapabilityBinding(bindingInput(descriptor, "a".repeat(64))))
  const stale = materializeAgentSkillPackageEvidence(input(descriptor), staleRegistry)
  assert.equal(stale.bindingState, "STALE")
  assert.equal(Object.hasOwn(stale, "disposition"), false)
  assert.equal(Object.hasOwn(stale, "normalizedCapabilityIds"), false)

  const wrongNameRegistry = registryFor(descriptor)
  wrongNameRegistry.register(createExternalCapabilityBinding(bindingInput(descriptor, unbound.externalMetadataSha256, {
    externalName: "other-skill",
  })))
  assert.equal(materializeAgentSkillPackageEvidence(input(descriptor), wrongNameRegistry).bindingState, "UNBOUND")
})

test("K4-R4 captures one immutable registry snapshot without mutation or refresh", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  const before = registry.list()
  const first = materializeAgentSkillPackageEvidence(input(descriptor), registry)
  assert.deepEqual(registry.list(), before)
  assert.equal(first.bindingSnapshotIdentity, before.snapshotIdentity)

  registry.register(createExternalCapabilityBinding(bindingInput(descriptor, first.externalMetadataSha256)))
  const second = materializeAgentSkillPackageEvidence(input(descriptor), registry)
  assert.notEqual(second.bindingSnapshotIdentity, first.bindingSnapshotIdentity)
  assert.equal(first.bindingState, "UNBOUND")
  assert.equal(second.bindingState, "CURRENT")
  assert.equal(registry.size, 1)
})

test("K4-R4 input validation closes the shape, canonicalizes metadata, and enforces all bounds", () => {
  const descriptor = adapter()
  const valid = input(descriptor)
  const validated = validateAgentSkillPackageEvidenceInput(valid)
  assert.deepEqual(validated.metadataEntries.map((entry) => entry.key), ["x-private-category", "x-private-version"])
  assertDeepFrozen(validated)
  for (const [key, value] of [
    ["allowedTools", "Read"],
    ["instructionBody", "do work"],
    ["skillFile", "content"],
    ["packageFiles", []],
    ["frontmatter", {}],
    ["scripts", []],
    ["references", []],
    ["assets", []],
  ] as const) assert.throws(() => validateAgentSkillPackageEvidenceInput({ ...valid, [key]: value }))
  assert.throws(() => validateAgentSkillPackageEvidenceInput({ ...valid, name: "Release-Notes" }))
  assert.throws(() => validateAgentSkillPackageEvidenceInput({ ...valid, directoryName: "other-name" }))
  assert.throws(() => validateAgentSkillPackageEvidenceInput({ ...valid, description: "" }))
  assert.throws(() => validateAgentSkillPackageEvidenceInput({ ...valid, compatibility: "x".repeat(501) }))
  assert.throws(() => validateAgentSkillPackageEvidenceInput({ ...valid, metadataEntries: [
    { key: "duplicate", value: "a" },
    { key: "duplicate", value: "b" },
  ] }))
  assert.throws(() => validateAgentSkillPackageEvidenceInput({ ...valid, metadataEntries: Array.from(
    { length: 65 },
    (_, index) => ({ key: `key-${index}`, value: "" }),
  ) }))
  assert.throws(() => validateAgentSkillPackageEvidenceInput({
    ...valid,
    allowedToolsEvidence: { sha256: digest("x"), byteLength: 0 },
  }))
  assert.throws(() => validateAgentSkillPackageEvidenceInput({
    ...valid,
    packageManifestEvidence: { sha256: digest("x"), fileCount: 0, totalByteLength: 1 },
  }))
  assert.throws(() => validateAgentSkillPackageEvidenceInput({ ...valid, standardPinIdentity: "a".repeat(64) }))
  assert.throws(() => validateAgentSkillPackageEvidenceInput({ ...valid, sourceProvenanceIdentity: "A".repeat(64) }))
})

test("K4-R4 rejects direct and nested proxies without executing caller traps", () => {
  const descriptor = adapter()
  const valid = input(descriptor)
  let traps = 0
  assert.throws(() => validateAgentSkillPackageEvidenceInput(hostileProxy(valid, () => { traps += 1 })))
  assert.equal(traps, 0)
  assert.throws(() => validateAgentSkillPackageEvidenceInput({
    ...valid,
    metadataEntries: [hostileProxy({ key: "x", value: "y" }, () => { traps += 1 })],
  }))
  assert.equal(traps, 0)
  assert.throws(() => materializeAgentSkillPackageEvidence(
    valid,
    hostileProxy(registryFor(descriptor), () => { traps += 1 }),
  ))
  assert.equal(traps, 0)
  const evidence = materializeAgentSkillPackageEvidence(valid, registryFor(descriptor))
  assert.throws(() => validateAgentSkillPackageEvidence(hostileProxy(evidence, () => { traps += 1 })))
  assert.equal(traps, 0)
  const nested = jsonCopy(evidence) as unknown as Record<string, unknown>
  nested.descriptionEvidence = hostileProxy({}, () => { traps += 1 })
  assert.throws(() => validateAgentSkillPackageEvidence(nested))
  assert.equal(traps, 0)
})

test("K4-R4 fails closed on accessors, symbols, prototypes, sparse arrays, cycles, and non-JSON", () => {
  const valid = input()
  let getterCalls = 0
  const accessor = { ...valid }
  Object.defineProperty(accessor, "description", {
    enumerable: true,
    get() { getterCalls += 1; return valid.description },
  })
  assert.throws(() => validateAgentSkillPackageEvidenceInput(accessor))
  assert.equal(getterCalls, 0)
  assert.throws(() => validateAgentSkillPackageEvidenceInput({ ...valid, [Symbol("hidden")]: true }))
  assert.throws(() => validateAgentSkillPackageEvidenceInput(Object.assign(Object.create({ inherited: true }), valid)))
  const sparse = Array(1) as Array<{ key: string, value: string }>
  assert.throws(() => validateAgentSkillPackageEvidenceInput({ ...valid, metadataEntries: sparse }))
  const cyclic: Record<string, unknown> = { ...valid }
  cyclic.unknown = cyclic
  assert.throws(() => validateAgentSkillPackageEvidenceInput(cyclic))
  assert.throws(() => validateAgentSkillPackageEvidenceInput({ ...valid, unknown: () => undefined }))
  assert.throws(() => validateAgentSkillPackageEvidenceInput({ ...valid, unknown: Number.NaN }))
})

test("K4-R4 validator rejects source, digest, state, capability, redaction, and identity mutations", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  const first = materializeAgentSkillPackageEvidence(input(descriptor), registry)
  registry.register(createExternalCapabilityBinding(bindingInput(descriptor, first.externalMetadataSha256)))
  const evidence = materializeAgentSkillPackageEvidence(input(descriptor), registry)
  assert.equal(evidence.bindingState, "CURRENT")

  const mutations: AgentSkillPackageEvidence[] = []
  for (const [path, replacement] of [
    ["version", "other"],
    ["name", "other-skill"],
    ["directoryName", "other-skill"],
    ["externalMetadataSha256", "b".repeat(64)],
    ["bindingSnapshotIdentity", "c".repeat(64)],
    ["sourceProvenanceIdentity", "d".repeat(64)],
    ["evidenceIdentity", "e".repeat(64)],
  ] as const) {
    const changed = jsonCopy(evidence) as unknown as Record<string, unknown>
    changed[path] = replacement
    mutations.push(changed as unknown as AgentSkillPackageEvidence)
  }
  const sourceMutation = jsonCopy(evidence) as unknown as Record<string, unknown>
  ;(sourceMutation.sourceEvidence as Record<string, unknown>).sourceCommit = "0".repeat(40)
  mutations.push(sourceMutation as unknown as AgentSkillPackageEvidence)
  const digestMutation = jsonCopy(evidence) as unknown as Record<string, unknown>
  ;(digestMutation.descriptionEvidence as Record<string, unknown>).byteLength = 2
  mutations.push(digestMutation as unknown as AgentSkillPackageEvidence)
  const rawLeak = jsonCopy(evidence) as unknown as Record<string, unknown>
  rawLeak.description = "leak"
  mutations.push(rawLeak as unknown as AgentSkillPackageEvidence)
  const currentLeak = jsonCopy(evidence) as unknown as Record<string, unknown>
  currentLeak.allowedTools = "Read"
  mutations.push(currentLeak as unknown as AgentSkillPackageEvidence)
  const badCapabilities = jsonCopy(evidence) as unknown as Record<string, unknown>
  badCapabilities.normalizedCapabilityIds = ["skills/read", "skills/read"]
  mutations.push(badCapabilities as unknown as AgentSkillPackageEvidence)
  for (const mutation of mutations) assert.throws(() => validateAgentSkillPackageEvidence(mutation))
})

test("K4-R4 external metadata binds every redacted package and provenance fact", () => {
  const descriptor = adapter()
  const baseInput = input(descriptor)
  const base = materializeAgentSkillPackageEvidence(baseInput, registryFor(descriptor))
  const mutations: AgentSkillPackageEvidenceInput[] = [
    input(descriptor, { description: `${baseInput.description}!` }),
    input(descriptor, { license: null }),
    input(descriptor, { compatibility: null }),
    input(descriptor, { metadataEntries: [{ key: "x-private-category", value: "changed" }] }),
    input(descriptor, { allowedToolsEvidence: null }),
    input(descriptor, { instructionBodyEvidence: { ...baseInput.instructionBodyEvidence, byteLength: 99 } }),
    input(descriptor, { skillFileEvidence: { ...baseInput.skillFileEvidence, sha256: "a".repeat(64) } }),
    input(descriptor, { packageManifestEvidence: { ...baseInput.packageManifestEvidence, fileCount: 4 } }),
    input(descriptor, { sourceProvenanceIdentity: "b".repeat(64) }),
  ]
  for (const mutation of mutations) {
    const changed = materializeAgentSkillPackageEvidence(mutation, registryFor(descriptor))
    assert.notEqual(changed.externalMetadataSha256, base.externalMetadataSha256)
  }
})

test("K4-R4 rejects registry shadowing and canonical snapshot-method modification", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  Object.defineProperty(registry, "list", { value: () => registry.list(), configurable: true })
  assert.throws(() => materializeAgentSkillPackageEvidence(input(descriptor), registry))
  delete (registry as unknown as Record<string, unknown>).list

  const prototype = CompatibilityBindingRegistry.prototype
  const original = prototype.list
  Object.defineProperty(prototype, "list", { value: () => { throw new Error("modified list executed") }, configurable: true })
  try {
    assert.throws(() => materializeAgentSkillPackageEvidence(input(descriptor), registry), /modified/)
  } finally {
    Object.defineProperty(prototype, "list", { value: original, configurable: true, writable: true })
  }
})

test("K4-R4 schema and shared export are present while production remains data-only", () => {
  const schema = JSON.parse(source("../../../schema/k4-r4-agent-skill-package-evidence.schema.json")) as Record<string, unknown>
  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema")
  assert.equal(schema.$id, "https://kodac.dev/schema/k4-r4-agent-skill-package-evidence.schema.json")
  const index = source("../src/index.ts")
  assert.equal(
    index.split(/\r?\n/).filter((line) => line === 'export * from "./compatibility/agent-skill-package-evidence.ts"').length,
    1,
  )
  const production = source("../src/compatibility/agent-skill-package-evidence.ts")
  assert.deepEqual(
    [...production.matchAll(/\bfrom\s+["']([^"']+)["']/g)].map((match) => match[1]),
    ["node:crypto", "node:util", "./contracts.ts", "./registry.ts"],
  )
  assert.equal(/\bimport\s*\(/.test(production), false)
  assert.equal(/\.(?:register|dispose)\s*\(/.test(production), false)
  assert.equal(/\b(?:readFile|writeFile|fetch|process|Date|Math\.random)\b/.test(production), false)
})
