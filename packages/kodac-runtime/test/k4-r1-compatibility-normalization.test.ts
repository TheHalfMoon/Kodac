import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import test from "node:test"

import {
  K4_R1_BINDING_SNAPSHOT_VERSION,
  K4_R1_COMPATIBILITY_VERSION,
  K4_R1_EXTERNAL_OBJECT_KINDS,
  K4_R1_LIMITS,
  K4_R1_NORMALIZATION_DISPOSITIONS,
  K4_R1_STANDARD_IDS,
  K4_R1_STANDARD_PINS,
  compatibilityStandardPin,
  createCompatibilityBindingSnapshot,
  createExternalCapabilityBinding,
  validateCompatibilityBindingSnapshot,
  validateCompatibilityStandardPin,
  validateExternalCapabilityBinding,
  type ExternalCapabilityBindingInput,
} from "../src/compatibility/contracts.ts"
import {
  K4_R1_REGISTRATION_VERSION,
  CompatibilityBindingRegistry,
  validateCompatibilityBindingRegistrationReceipt,
} from "../src/compatibility/registry.ts"
import { createExtensionDescriptor } from "../src/extensions/contracts.ts"
import { ExtensionDescriptorRegistry } from "../src/extensions/registry.ts"

const source = (relative: string) => readFileSync(new URL(relative, import.meta.url), "utf8")

function canonicalize(value: unknown): string {
  if (value === null || typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
    return JSON.stringify(value)
  }
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`
  const record = value as Record<string, unknown>
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(record[key])}`).join(",")}}`
}

function identity(value: unknown): string {
  return createHash("sha256").update(canonicalize(value), "utf8").digest("hex")
}

function adapter(extensionId = "kodac/compatibility-adapter", provider = true) {
  return createExtensionDescriptor({
    extensionId,
    extensionVersion: "1.0.0",
    provenance: {
      sourceType: "EXTERNAL_DECLARATION",
      sourceId: "kodac/k4-r1-test-adapter",
      sourceRevision: "1.0.0",
      license: "Apache-2.0",
      intakeMode: "DECLARATION",
    },
    capabilities: [
      { capabilityId: "compat/read", roles: provider ? ["PROVIDER"] : ["CONSUMER"] },
      { capabilityId: "compat/write", roles: ["PROVIDER"] },
    ],
  })
}

function bindingInput(overrides: Partial<ExternalCapabilityBindingInput> = {}): ExternalCapabilityBindingInput {
  const descriptor = adapter()
  return {
    standardPinIdentity: compatibilityStandardPin("MCP").standardPinIdentity,
    objectKind: "MCP_TOOL",
    externalName: "repo.search",
    externalMetadataSha256: "a".repeat(64),
    extensionId: descriptor.extensionId,
    descriptorIdentity: descriptor.descriptorIdentity,
    disposition: "SINGLE",
    normalizedCapabilityIds: ["compat/read"],
    ...overrides,
  }
}

function registeredPair(descriptor = adapter()): {
  extensionRegistry: ExtensionDescriptorRegistry
  registry: CompatibilityBindingRegistry
} {
  const extensionRegistry = new ExtensionDescriptorRegistry()
  extensionRegistry.register(descriptor)
  return { extensionRegistry, registry: new CompatibilityBindingRegistry(extensionRegistry) }
}

test("K4-R1 primary-standard pins preserve every exact official revision and license-evidence blob", () => {
  assert.equal(K4_R1_COMPATIBILITY_VERSION, "k4-r1-compatibility-normalization-v1")
  assert.deepEqual(K4_R1_STANDARD_IDS, ["MCP", "ACP", "AGENT_SKILLS"])
  assert.deepEqual(K4_R1_STANDARD_PINS.map((pin) => ({
    standard: pin.standard,
    repository: pin.repository,
    commit: pin.sourceCommit,
    tree: pin.sourceTree,
    revision: pin.specificationRevision,
    specification: [pin.specificationPath, pin.specificationBlob],
    licenses: pin.licenseEvidence.map((entry) => [entry.path, entry.blob]),
  })), [
    {
      standard: "MCP",
      repository: "modelcontextprotocol/modelcontextprotocol",
      commit: "57ac4a2ec742e0cb7622d899b0f5d3bcf769fd69",
      tree: "164f5cb7a4a9b72a0b1c81aa0d9eeae5a21688e5",
      revision: "2026-07-28",
      specification: ["docs/specification/2026-07-28/index.mdx", "452d78601b135b95bbe45287e756c0579534096b"],
      licenses: [["LICENSE", "4a93985763241755401a10678395303de4e720ba"]],
    },
    {
      standard: "ACP",
      repository: "agentclientprotocol/agent-client-protocol",
      commit: "62c74ac119ec3296809496482440afca69926ce9",
      tree: "130153620c8e8a7d2934b19bd3442566bee7a6ea",
      revision: "v2",
      specification: ["docs/protocol/v2/overview.mdx", "4d5e4012f9ccd6b9a3e8ad3e2d3dab55cdbe2b44"],
      licenses: [["LICENSE", "1de02305f81f6dc087b6229a1d86a31774d2fa31"]],
    },
    {
      standard: "AGENT_SKILLS",
      repository: "agentskills/agentskills",
      commit: "69ef37e9424c0a7ea9dd2293b559e43ec8176379",
      tree: "65e11c9faad14a022055ce0ff3ebf99f2b55142f",
      revision: null,
      specification: ["docs/specification.mdx", "d9a2db099d905da8b879a5c6f996728073985279"],
      licenses: [
        ["LICENSE", "a20f4476df158a57a68409015ea607c738856f57"],
        ["README.md", "247e4a18e908d3bf27092f886f25c2515d84ecbc"],
      ],
    },
  ])
  for (const pin of K4_R1_STANDARD_PINS) {
    const { standardPinIdentity: _ignored, ...preimage } = pin
    assert.equal(pin.standardPinIdentity, identity(preimage))
    assert.deepEqual(validateCompatibilityStandardPin(JSON.parse(JSON.stringify(pin))), pin)
    assert.equal(Object.isFrozen(pin), true)
    assert.equal(Object.isFrozen(pin.licenseEvidence), true)
  }
})

test("standard-pin validation rejects unknown standards, floating revisions, and any exact-pin tampering", () => {
  const pin = compatibilityStandardPin("MCP")
  assert.throws(() => compatibilityStandardPin("UNKNOWN"), /unsupported/)
  assert.throws(() => validateCompatibilityStandardPin({ ...pin, standard: "UNKNOWN" }), /unsupported/)
  assert.throws(() => validateCompatibilityStandardPin({ ...pin, sourceCommit: "0".repeat(40) }), /canonical exact revision/)
  assert.throws(() => validateCompatibilityStandardPin({ ...pin, sourceTree: "main" }), /Git SHA-1/)
  assert.throws(() => validateCompatibilityStandardPin({ ...pin, specificationBlob: "1".repeat(40) }), /canonical exact revision/)
  assert.throws(() => validateCompatibilityStandardPin({ ...pin, unexpected: true }), /unknown field/)
})

test("external vocabulary and normalization cardinality are closed and exact", () => {
  assert.deepEqual(K4_R1_EXTERNAL_OBJECT_KINDS, [
    "MCP_TOOL", "MCP_RESOURCE", "MCP_PROMPT", "ACP_AGENT_METHOD", "ACP_CLIENT_METHOD", "ACP_NOTIFICATION", "AGENT_SKILL",
  ])
  assert.deepEqual(K4_R1_NORMALIZATION_DISPOSITIONS, ["UNRESOLVED", "SINGLE", "COMPOSITE"])
  const unresolved = createExternalCapabilityBinding(bindingInput({ disposition: "UNRESOLVED", normalizedCapabilityIds: [] }))
  const single = createExternalCapabilityBinding(bindingInput())
  const composite = createExternalCapabilityBinding(bindingInput({
    disposition: "COMPOSITE",
    normalizedCapabilityIds: ["compat/write", "compat/read"],
  }))
  assert.deepEqual(unresolved.normalizedCapabilityIds, [])
  assert.deepEqual(single.normalizedCapabilityIds, ["compat/read"])
  assert.deepEqual(composite.normalizedCapabilityIds, ["compat/read", "compat/write"])
  assert.throws(() => createExternalCapabilityBinding(bindingInput({ disposition: "UNRESOLVED", normalizedCapabilityIds: ["compat/read"] })), /requires zero/)
  assert.throws(() => createExternalCapabilityBinding(bindingInput({ disposition: "SINGLE", normalizedCapabilityIds: [] })), /exactly one/)
  assert.throws(() => createExternalCapabilityBinding(bindingInput({ disposition: "COMPOSITE", normalizedCapabilityIds: ["compat/read"] })), /two through/)
  assert.throws(() => createExternalCapabilityBinding(bindingInput({ disposition: "MANY" as never })), /unsupported/)
  assert.throws(() => createExternalCapabilityBinding(bindingInput({
    disposition: "COMPOSITE",
    normalizedCapabilityIds: Array.from({ length: 17 }, (_, index) => `compat/cap${index}`),
  })), /exceeds 16/)
  assert.throws(() => createExternalCapabilityBinding(bindingInput({ normalizedCapabilityIds: ["compat/read", "compat/read"] })), /duplicates/)
  assert.throws(() => createExternalCapabilityBinding(bindingInput({ objectKind: "MCP_SERVER" as never })), /unsupported/)
  assert.throws(() => createExternalCapabilityBinding(bindingInput({ objectKind: "AGENT_SKILL" })), /does not belong/)
})

test("binding identities use canonical sorted set inputs and serialized identities are recomputed", () => {
  const first = createExternalCapabilityBinding(bindingInput({
    disposition: "COMPOSITE",
    normalizedCapabilityIds: ["compat/write", "compat/read"],
  }))
  const second = createExternalCapabilityBinding(bindingInput({
    disposition: "COMPOSITE",
    normalizedCapabilityIds: ["compat/read", "compat/write"],
  }))
  assert.equal(first.bindingIdentity, second.bindingIdentity)
  const { bindingIdentity: _ignored, ...preimage } = first
  assert.equal(first.bindingIdentity, identity(preimage))
  assert.deepEqual(validateExternalCapabilityBinding(JSON.parse(JSON.stringify(first))), first)
  assert.throws(() => validateExternalCapabilityBinding({ ...first, externalName: "repo.changed" }), /derived fields mismatch/)
  assert.throws(() => validateExternalCapabilityBinding({ ...first, bindingIdentity: "0".repeat(64) }), /derived fields mismatch/)
})

test("hostile objects, malformed digests, unknown fields, and external-name bounds fail closed", () => {
  assert.doesNotThrow(() => createExternalCapabilityBinding(bindingInput({ externalName: "é".repeat(256) })))
  assert.throws(() => createExternalCapabilityBinding(bindingInput({ externalName: "é".repeat(257) })), /512 UTF-8 bytes/)
  assert.throws(() => createExternalCapabilityBinding(bindingInput({ externalName: "a".repeat(513) })), /512 UTF-8 bytes/)
  assert.throws(() => createExternalCapabilityBinding(bindingInput({ externalName: "a\0b" })), /NUL-free/)
  assert.throws(() => createExternalCapabilityBinding(bindingInput({ externalMetadataSha256: "A".repeat(64) })), /lowercase SHA-256/)
  assert.throws(() => createExternalCapabilityBinding(bindingInput({ standardPinIdentity: "0".repeat(64) })), /unknown compatibility/)
  assert.throws(() => createExternalCapabilityBinding({ ...bindingInput(), unexpectedAuthority: true } as never), /unknown field/)
  assert.throws(() => createExternalCapabilityBinding(new Proxy(bindingInput(), {})), /Proxy/)

  let getterCalls = 0
  const withAccessor = { ...bindingInput() } as Record<string, unknown>
  Object.defineProperty(withAccessor, "externalName", {
    enumerable: true,
    get() {
      getterCalls += 1
      return "repo.search"
    },
  })
  assert.throws(() => createExternalCapabilityBinding(withAccessor as never), /data property/)
  assert.equal(getterCalls, 0)
})

test("Agent Skills allowed-tools evidence never implies a Kodac capability grant", () => {
  const skill = createExternalCapabilityBinding(bindingInput({
    standardPinIdentity: compatibilityStandardPin("AGENT_SKILLS").standardPinIdentity,
    objectKind: "AGENT_SKILL",
    externalName: "portable-skill-with-allowed-tools-metadata",
    externalMetadataSha256: "b".repeat(64),
    disposition: "UNRESOLVED",
    normalizedCapabilityIds: [],
  }))
  assert.equal(skill.disposition, "UNRESOLVED")
  assert.deepEqual(skill.normalizedCapabilityIds, [])
  assert.throws(() => createExternalCapabilityBinding(bindingInput({
    standardPinIdentity: compatibilityStandardPin("AGENT_SKILLS").standardPinIdentity,
    objectKind: "AGENT_SKILL",
    externalName: "allowed-tools:compat/read",
    disposition: "SINGLE",
    normalizedCapabilityIds: [],
  })), /exactly one/)
})

test("registration requires an exact live H1 adapter descriptor and explicit PROVIDER claims", () => {
  const descriptor = adapter()
  const absent = new CompatibilityBindingRegistry(new ExtensionDescriptorRegistry())
  const valid = createExternalCapabilityBinding(bindingInput())
  assert.throws(() => absent.register(valid), /not registered/)

  const { registry } = registeredPair(descriptor)
  assert.throws(() => registry.register({ ...valid, descriptorIdentity: "0".repeat(64), bindingIdentity: "0".repeat(64) }), /derived fields mismatch/)
  const receipt = registry.register(valid)
  assert.equal(receipt.version, K4_R1_REGISTRATION_VERSION)
  assert.equal(registry.size, 1)

  const consumerDescriptor = adapter("kodac/consumer-adapter", false)
  const consumerPair = registeredPair(consumerDescriptor)
  const consumerBinding = createExternalCapabilityBinding(bindingInput({
    extensionId: consumerDescriptor.extensionId,
    descriptorIdentity: consumerDescriptor.descriptorIdentity,
  }))
  assert.throws(() => consumerPair.registry.register(consumerBinding), /as PROVIDER/)
  assert.equal(consumerPair.registry.size, 0)
})

test("duplicate and conflicting registrations fail without consuming a serial or mutating state", () => {
  const { registry } = registeredPair()
  const first = createExternalCapabilityBinding(bindingInput())
  const firstReceipt = registry.register(first)
  assert.equal(firstReceipt.registrationSerial, 1)
  assert.throws(() => registry.register(first), /already registered/)
  const conflict = createExternalCapabilityBinding(bindingInput({
    disposition: "UNRESOLVED",
    normalizedCapabilityIds: [],
  }))
  assert.notEqual(conflict.bindingIdentity, first.bindingIdentity)
  assert.throws(() => registry.register(conflict), /conflicting/)
  assert.equal(registry.size, 1)

  const second = createExternalCapabilityBinding(bindingInput({ externalName: "repo.open" }))
  const secondReceipt = registry.register(second)
  assert.equal(secondReceipt.registrationSerial, 2)
})

test("snapshots and every discovery filter use the one canonical tuple order and immutable content identities", () => {
  const descriptor = adapter()
  const { registry } = registeredPair(descriptor)
  const entries = [
    createExternalCapabilityBinding(bindingInput({
      standardPinIdentity: compatibilityStandardPin("ACP").standardPinIdentity,
      objectKind: "ACP_AGENT_METHOD",
      externalName: "session/new",
    })),
    createExternalCapabilityBinding(bindingInput({ externalName: "repo.zeta" })),
    createExternalCapabilityBinding(bindingInput({ externalName: "repo.alpha" })),
    createExternalCapabilityBinding(bindingInput({
      externalName: "repo.unresolved",
      disposition: "UNRESOLVED",
      normalizedCapabilityIds: [],
    })),
  ]
  for (const entry of entries) registry.register(entry)
  const snapshot = registry.list()
  assert.equal(snapshot.version, K4_R1_BINDING_SNAPSHOT_VERSION)
  assert.deepEqual(snapshot.bindings.map((entry) => entry.externalName), ["session/new", "repo.alpha", "repo.unresolved", "repo.zeta"])
  const { snapshotIdentity: _ignored, ...preimage } = snapshot
  assert.equal(snapshot.snapshotIdentity, identity(preimage))
  assert.deepEqual(validateCompatibilityBindingSnapshot(JSON.parse(JSON.stringify(snapshot))), snapshot)
  assert.throws(() => createCompatibilityBindingSnapshot([snapshot.bindings[0]!, snapshot.bindings[0]!]), /duplicate bindings/)
  const conflicting = createExternalCapabilityBinding(bindingInput({
    externalName: "repo.alpha",
    disposition: "UNRESOLVED",
    normalizedCapabilityIds: [],
  }))
  assert.throws(() => createCompatibilityBindingSnapshot([snapshot.bindings[1]!, conflicting]), /conflicting bindings/)
  assert.equal(Object.isFrozen(snapshot), true)
  assert.equal(Object.isFrozen(snapshot.bindings), true)
  assert.equal(Object.isFrozen(snapshot.bindings[0]?.normalizedCapabilityIds), true)
  assert.deepEqual(registry.findByStandard("MCP").bindings.map((entry) => entry.externalName), ["repo.alpha", "repo.unresolved", "repo.zeta"])
  assert.deepEqual(registry.findByObjectKind("ACP_AGENT_METHOD").bindings.map((entry) => entry.externalName), ["session/new"])
  assert.deepEqual(registry.findByExternalName("repo.alpha").bindings.map((entry) => entry.externalName), ["repo.alpha"])
  assert.equal(registry.findByAdapter(descriptor.extensionId, descriptor.descriptorIdentity).bindings.length, 4)
  assert.equal(registry.findByCapability("compat/read").bindings.length, 3)
  assert.deepEqual(registry.findByDisposition("UNRESOLVED").bindings.map((entry) => entry.externalName), ["repo.unresolved"])
  const emptyA = createCompatibilityBindingSnapshot([])
  const emptyB = registry.findByExternalName("missing")
  assert.equal(emptyA.snapshotIdentity, emptyB.snapshotIdentity)
})

test("data-only registration receipts provide ownership-safe idempotent disposal", () => {
  const { registry } = registeredPair()
  const value = createExternalCapabilityBinding(bindingInput())
  const first = registry.register(value)
  assert.deepEqual(validateCompatibilityBindingRegistrationReceipt({ ...first }), first)
  assert.equal(registry.dispose(first), true)
  assert.equal(registry.dispose(first), false)
  const replacement = registry.register(value)
  assert.notEqual(first.registrationSerial, replacement.registrationSerial)
  assert.equal(registry.dispose(first), false)
  assert.equal(registry.has(value.bindingIdentity), true)
  assert.equal(registry.dispose({ ...replacement, descriptorIdentity: "0".repeat(64) }), false)
  assert.equal(registry.dispose(replacement), true)
})

test("the 4096-binding capacity fails before mutation or serial consumption", () => {
  const { registry } = registeredPair()
  for (let index = 0; index < K4_R1_LIMITS.maxRegistryBindings; index += 1) {
    registry.register(createExternalCapabilityBinding(bindingInput({ externalName: `tool-${String(index).padStart(4, "0")}` })))
  }
  assert.equal(registry.size, K4_R1_LIMITS.maxRegistryBindings)
  const overflow = createExternalCapabilityBinding(bindingInput({ externalName: "tool-overflow" }))
  assert.throws(() => registry.register(overflow), /limited to 4096/)
  assert.equal(registry.size, K4_R1_LIMITS.maxRegistryBindings)
  const first = registry.get(createExternalCapabilityBinding(bindingInput({ externalName: "tool-0000" })).bindingIdentity)
  assert.ok(first)
  const firstReceipt = {
    version: K4_R1_REGISTRATION_VERSION,
    bindingIdentity: first.bindingIdentity,
    extensionId: first.extensionId,
    descriptorIdentity: first.descriptorIdentity,
    registrationSerial: 1,
  } as const
  assert.equal(registry.dispose(firstReceipt), true)
  const admitted = registry.register(overflow)
  assert.equal(admitted.registrationSerial, K4_R1_LIMITS.maxRegistryBindings + 1)
})

test("published schema mirrors the closed vocabulary, disposition conditions, and bounds", () => {
  const schema = JSON.parse(source("../../../schema/k4-r1-compatibility-normalization.schema.json")) as Record<string, unknown>
  const oneOf = schema.oneOf as readonly Record<string, unknown>[]
  assert.deepEqual(oneOf.map((entry) => entry.$ref), [
    "#/$defs/standardPin",
    "#/$defs/externalCapabilityBinding",
    "#/$defs/bindingSnapshot",
    "#/$defs/registrationReceipt",
  ])
  const defs = schema.$defs as Record<string, Record<string, unknown>>
  const binding = defs.externalCapabilityBinding
  assert.equal(binding?.additionalProperties, false)
  const properties = binding?.properties as Record<string, Record<string, unknown>>
  assert.deepEqual(properties.objectKind?.enum, K4_R1_EXTERNAL_OBJECT_KINDS)
  assert.deepEqual(properties.disposition?.enum, K4_R1_NORMALIZATION_DISPOSITIONS)
  assert.equal(properties.externalName?.maxLength, 512)
  assert.equal(properties.normalizedCapabilityIds?.maxItems, 16)
  assert.deepEqual((defs.standardPinIdentity as Record<string, unknown>).enum, K4_R1_STANDARD_PINS.map((pin) => pin.standardPinIdentity))
  const snapshotProperties = defs.bindingSnapshot?.properties as Record<string, Record<string, unknown>>
  assert.equal(snapshotProperties.bindings?.maxItems, 4096)
  assert.equal((binding?.allOf as readonly unknown[]).length, 6)
})

test("K4-R1 production code is data-only and imports only its exact authorized deterministic surface", () => {
  const contracts = source("../src/compatibility/contracts.ts")
  const registry = source("../src/compatibility/registry.ts")
  assert.deepEqual([...contracts.matchAll(/^import .* from "([^"]+)"/gm)].map((match) => match[1]), ["node:crypto"])
  assert.deepEqual([...registry.matchAll(/from "([^"]+)"/gm)].map((match) => match[1]), [
    "../extensions/contracts.ts",
    "../extensions/registry.ts",
    "./contracts.ts",
  ])
  for (const text of [contracts, registry]) {
    assert.doesNotMatch(text, /node:(?:fs|child_process|http|https|net|tls|worker_threads)/)
    assert.doesNotMatch(text, /\b(?:fetch|eval|Function|ExecutionGateway|RuntimeTool|DoneGate|process)\b/)
    assert.doesNotMatch(text, /\bimport\s*\(/)
  }
})
