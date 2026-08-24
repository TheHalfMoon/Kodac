import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import test from "node:test"

import {
  K4_R3_ACP_DIRECTIONS,
  K4_R3_ACP_MESSAGE_KINDS,
  K4_R3_ACP_METHOD_CATALOG_EVIDENCE_VERSION,
  K4_R3_ACP_METHOD_DEFINITIONS,
  K4_R3_ACP_OBJECT_KINDS,
  K4_R3_ACP_STANDARD_EVIDENCE,
  K4_R3_ACP_STANDARD_PIN_IDENTITY,
  K4_R3_BINDING_STATES,
  materializeAcpMethodCatalogEvidence,
  validateAcpMethodCatalogEvidence,
  validateAcpMethodCatalogEvidenceInput,
  type AcpMethodCatalogEvidence,
  type AcpMethodCatalogEvidenceInput,
  type AcpMethodDefinition,
} from "../src/compatibility/acp-method-catalog.ts"
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

function adapter(extensionId = "kodac/acp-method-adapter"): ExtensionDescriptor {
  return createExtensionDescriptor({
    extensionId,
    extensionVersion: "1.0.0",
    provenance: {
      sourceType: "EXTERNAL_DECLARATION",
      sourceId: "kodac/k4-r3-test-adapter",
      sourceRevision: "1.0.0",
      license: "Apache-2.0",
      intakeMode: "DECLARATION",
    },
    capabilities: [
      { capabilityId: "compat/read", roles: ["PROVIDER"] },
      { capabilityId: "compat/write", roles: ["PROVIDER"] },
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
  overrides: Partial<AcpMethodCatalogEvidenceInput> = {},
): AcpMethodCatalogEvidenceInput {
  return {
    standardPinIdentity: K4_R3_ACP_STANDARD_PIN_IDENTITY,
    extensionId: descriptor.extensionId,
    descriptorIdentity: descriptor.descriptorIdentity,
    ...overrides,
  }
}

function methodMetadata(definition: AcpMethodDefinition): string {
  return identity({
    version: K4_R3_ACP_METHOD_CATALOG_EVIDENCE_VERSION,
    standardPinIdentity: K4_R3_ACP_STANDARD_PIN_IDENTITY,
    externalName: definition.externalName,
    objectKind: definition.objectKind,
    messageKind: definition.messageKind,
    direction: definition.direction,
  })
}

function definition(externalName: string): AcpMethodDefinition {
  const result = K4_R3_ACP_METHOD_DEFINITIONS.find((entry) => entry.externalName === externalName)
  assert.ok(result)
  return result
}

function bindingInput(
  descriptor: ExtensionDescriptor,
  externalName: string,
  overrides: Partial<ExternalCapabilityBindingInput> = {},
): ExternalCapabilityBindingInput {
  const method = definition(externalName)
  return {
    standardPinIdentity: K4_R3_ACP_STANDARD_PIN_IDENTITY,
    objectKind: method.objectKind,
    externalName,
    externalMetadataSha256: methodMetadata(method),
    extensionId: descriptor.extensionId,
    descriptorIdentity: descriptor.descriptorIdentity,
    disposition: "SINGLE",
    normalizedCapabilityIds: ["compat/read"],
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

test("K4-R3 pins the exact ACP v2 revision, evidence blobs, vocabularies, and 16-method inventory", () => {
  assert.equal(K4_R3_ACP_METHOD_CATALOG_EVIDENCE_VERSION, "k4-r3-acp-method-catalog-evidence-v1")
  assert.equal(K4_R3_ACP_STANDARD_PIN_IDENTITY, compatibilityStandardPin("ACP").standardPinIdentity)
  assert.deepEqual(K4_R3_ACP_OBJECT_KINDS, ["ACP_AGENT_METHOD", "ACP_CLIENT_METHOD", "ACP_NOTIFICATION"])
  assert.deepEqual(K4_R3_ACP_MESSAGE_KINDS, ["REQUEST", "NOTIFICATION"])
  assert.deepEqual(K4_R3_ACP_DIRECTIONS, ["CLIENT_TO_AGENT", "AGENT_TO_CLIENT", "BIDIRECTIONAL"])
  assert.deepEqual(K4_R3_BINDING_STATES, ["UNBOUND", "CURRENT", "STALE"])
  assert.deepEqual(K4_R3_ACP_STANDARD_EVIDENCE, {
    repository: "agentclientprotocol/agent-client-protocol",
    sourceCommit: "62c74ac119ec3296809496482440afca69926ce9",
    sourceTree: "130153620c8e8a7d2934b19bd3442566bee7a6ea",
    specificationRevision: "v2",
    standardPinIdentity: K4_R3_ACP_STANDARD_PIN_IDENTITY,
    sources: [
      { path: "docs/protocol/v2/overview.mdx", blob: "4d5e4012f9ccd6b9a3e8ad3e2d3dab55cdbe2b44" },
      { path: "LICENSE", blob: "1de02305f81f6dc087b6229a1d86a31774d2fa31" },
      { path: "schema/v2/meta.json", blob: "ad2cfd937a0722893fa577e4ff96df5c79cdc23c" },
      { path: "schema/v2/schema.json", blob: "021d16481f3d833eff017e5128b9fe8927d45b05" },
      { path: "docs/protocol/v2/initialization.mdx", blob: "b124fdfeed5292b98fa2cd16b22624c3bcd67680" },
      { path: "docs/protocol/v2/cancellation.mdx", blob: "00795cbfb29b1bf9407541ed817f2bca392fbb5f" },
      { path: "docs/protocol/v2/extensibility.mdx", blob: "370909fd5ce0d30503ce32451c943ae0aa3e2a9a" },
    ],
  })
  assert.deepEqual(K4_R3_ACP_METHOD_DEFINITIONS, [
    { externalName: "$/cancel_request", objectKind: "ACP_NOTIFICATION", messageKind: "NOTIFICATION", direction: "BIDIRECTIONAL" },
    { externalName: "auth/login", objectKind: "ACP_AGENT_METHOD", messageKind: "REQUEST", direction: "CLIENT_TO_AGENT" },
    { externalName: "auth/logout", objectKind: "ACP_AGENT_METHOD", messageKind: "REQUEST", direction: "CLIENT_TO_AGENT" },
    { externalName: "elicitation/complete", objectKind: "ACP_NOTIFICATION", messageKind: "NOTIFICATION", direction: "AGENT_TO_CLIENT" },
    { externalName: "elicitation/create", objectKind: "ACP_CLIENT_METHOD", messageKind: "REQUEST", direction: "AGENT_TO_CLIENT" },
    { externalName: "initialize", objectKind: "ACP_AGENT_METHOD", messageKind: "REQUEST", direction: "CLIENT_TO_AGENT" },
    { externalName: "session/cancel", objectKind: "ACP_NOTIFICATION", messageKind: "NOTIFICATION", direction: "CLIENT_TO_AGENT" },
    { externalName: "session/close", objectKind: "ACP_AGENT_METHOD", messageKind: "REQUEST", direction: "CLIENT_TO_AGENT" },
    { externalName: "session/delete", objectKind: "ACP_AGENT_METHOD", messageKind: "REQUEST", direction: "CLIENT_TO_AGENT" },
    { externalName: "session/list", objectKind: "ACP_AGENT_METHOD", messageKind: "REQUEST", direction: "CLIENT_TO_AGENT" },
    { externalName: "session/new", objectKind: "ACP_AGENT_METHOD", messageKind: "REQUEST", direction: "CLIENT_TO_AGENT" },
    { externalName: "session/prompt", objectKind: "ACP_AGENT_METHOD", messageKind: "REQUEST", direction: "CLIENT_TO_AGENT" },
    { externalName: "session/request_permission", objectKind: "ACP_CLIENT_METHOD", messageKind: "REQUEST", direction: "AGENT_TO_CLIENT" },
    { externalName: "session/resume", objectKind: "ACP_AGENT_METHOD", messageKind: "REQUEST", direction: "CLIENT_TO_AGENT" },
    { externalName: "session/set_config_option", objectKind: "ACP_AGENT_METHOD", messageKind: "REQUEST", direction: "CLIENT_TO_AGENT" },
    { externalName: "session/update", objectKind: "ACP_NOTIFICATION", messageKind: "NOTIFICATION", direction: "AGENT_TO_CLIENT" },
  ])
  assert.equal(K4_R3_ACP_METHOD_DEFINITIONS.length, 16)
  assert.deepEqual(
    K4_R3_ACP_METHOD_DEFINITIONS.map((entry) => entry.externalName),
    K4_R3_ACP_METHOD_DEFINITIONS.map((entry) => entry.externalName).sort(),
  )
  assertDeepFrozen(K4_R3_ACP_STANDARD_EVIDENCE)
  assertDeepFrozen(K4_R3_ACP_METHOD_DEFINITIONS)
})

test("K4-R3 materializes all fixed methods as immutable content-addressed UNBOUND evidence", () => {
  const descriptor = adapter()
  const catalog = materializeAcpMethodCatalogEvidence(input(descriptor), registryFor(descriptor))
  assert.equal(catalog.entries.length, 16)
  assert.equal(catalog.entries.every((entry) => entry.bindingState === "UNBOUND"), true)
  for (let index = 0; index < catalog.entries.length; index += 1) {
    const entry = catalog.entries[index]!
    const method = K4_R3_ACP_METHOD_DEFINITIONS[index]!
    assert.deepEqual(
      { externalName: entry.externalName, objectKind: entry.objectKind, messageKind: entry.messageKind, direction: entry.direction },
      method,
    )
    assert.equal(entry.externalMetadataSha256, methodMetadata(method))
    const { entryIdentity, ...entryBase } = entry
    assert.equal(entryIdentity, identity(entryBase))
  }
  const { catalogIdentity, ...catalogBase } = catalog
  assert.equal(catalogIdentity, identity(catalogBase))
  assert.deepEqual(validateAcpMethodCatalogEvidence(jsonCopy(catalog)), catalog)
  assertDeepFrozen(catalog)
})

test("K4-R3 derives CURRENT and STALE only from the exact binding tuple and method metadata", () => {
  const descriptor = adapter()
  const other = adapter("kodac/other-acp-adapter")
  const registry = registryFor(descriptor, other)
  registry.register(createExternalCapabilityBinding(bindingInput(descriptor, "initialize")))
  registry.register(createExternalCapabilityBinding(bindingInput(descriptor, "auth/login", {
    externalMetadataSha256: "a".repeat(64),
  })))
  registry.register(createExternalCapabilityBinding(bindingInput(descriptor, "session/request_permission", {
    disposition: "COMPOSITE",
    normalizedCapabilityIds: ["compat/read", "compat/write"],
  })))
  registry.register(createExternalCapabilityBinding(bindingInput(other, "session/update")))
  registry.register(createExternalCapabilityBinding(bindingInput(descriptor, "session/update", {
    objectKind: "ACP_AGENT_METHOD",
  })))

  const catalog = materializeAcpMethodCatalogEvidence(input(descriptor), registry)
  const initialize = catalog.entries.find((entry) => entry.externalName === "initialize")!
  const login = catalog.entries.find((entry) => entry.externalName === "auth/login")!
  const permission = catalog.entries.find((entry) => entry.externalName === "session/request_permission")!
  const update = catalog.entries.find((entry) => entry.externalName === "session/update")!
  assert.equal(initialize.bindingState, "CURRENT")
  assert.equal(login.bindingState, "STALE")
  assert.equal(permission.bindingState, "CURRENT")
  assert.equal(update.bindingState, "UNBOUND")
  if (initialize.bindingState === "CURRENT") {
    assert.equal(initialize.disposition, "SINGLE")
    assert.deepEqual(initialize.normalizedCapabilityIds, ["compat/read"])
  }
  if (permission.bindingState === "CURRENT") {
    assert.equal(permission.disposition, "COMPOSITE")
    assert.deepEqual(permission.normalizedCapabilityIds, ["compat/read", "compat/write"])
  }
  if (login.bindingState === "STALE") {
    assert.equal(Object.hasOwn(login, "disposition"), false)
    assert.equal(Object.hasOwn(login, "normalizedCapabilityIds"), false)
  }
  assert.equal(Object.hasOwn(update, "bindingIdentity"), false)
  assert.equal(Object.hasOwn(update, "disposition"), false)
  assert.equal(Object.hasOwn(update, "normalizedCapabilityIds"), false)
})

test("K4-R3 captures one snapshot without mutating registry state and prior evidence never refreshes", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  const before = registry.list()
  const first = materializeAcpMethodCatalogEvidence(input(descriptor), registry)
  assert.equal(registry.size, 0)
  assert.deepEqual(registry.list(), before)
  assert.equal(first.bindingSnapshotIdentity, before.snapshotIdentity)

  const receipt = registry.register(createExternalCapabilityBinding(bindingInput(descriptor, "initialize")))
  assert.equal(receipt.registrationSerial, 1)
  const second = materializeAcpMethodCatalogEvidence(input(descriptor), registry)
  assert.notEqual(second.bindingSnapshotIdentity, first.bindingSnapshotIdentity)
  assert.equal(first.entries.find((entry) => entry.externalName === "initialize")?.bindingState, "UNBOUND")
  assert.equal(second.entries.find((entry) => entry.externalName === "initialize")?.bindingState, "CURRENT")
  assert.equal(registry.size, 1)
})

test("K4-R3 caller input is closed and cannot define, alter, reorder, or extend the method catalog", () => {
  const descriptor = adapter()
  const valid = input(descriptor)
  assert.deepEqual(validateAcpMethodCatalogEvidenceInput(valid), valid)
  const prohibited: Record<string, unknown> = {
    externalName: "_custom/run",
    methods: [],
    schema: {},
    jsonrpc: "2.0",
    capabilities: {},
    authMethods: [],
    sessionId: "session",
    prompt: [],
    permission: {},
    update: {},
    elicitation: {},
    cancellationToken: "token",
    _meta: {},
    transport: {},
    externalMetadataSha256: "a".repeat(64),
  }
  for (const [key, value] of Object.entries(prohibited)) {
    assert.throws(() => validateAcpMethodCatalogEvidenceInput({ ...valid, [key]: value }))
  }
  assert.throws(() => validateAcpMethodCatalogEvidenceInput({ ...valid, standardPinIdentity: "a".repeat(64) }))
  assert.throws(() => validateAcpMethodCatalogEvidenceInput({ ...valid, extensionId: "invalid" }))
  assert.throws(() => validateAcpMethodCatalogEvidenceInput({ ...valid, descriptorIdentity: "A".repeat(64) }))
  const reordered = {
    descriptorIdentity: valid.descriptorIdentity,
    standardPinIdentity: valid.standardPinIdentity,
    extensionId: valid.extensionId,
  }
  assert.deepEqual(validateAcpMethodCatalogEvidenceInput(reordered), valid)
})

test("K4-R3 rejects direct and nested proxies without executing caller traps", () => {
  const descriptor = adapter()
  const valid = input(descriptor)
  let traps = 0
  assert.throws(() => validateAcpMethodCatalogEvidenceInput(hostileProxy(valid, () => { traps += 1 })))
  assert.equal(traps, 0)
  assert.throws(() => validateAcpMethodCatalogEvidenceInput({
    ...valid,
    unknown: hostileProxy({}, () => { traps += 1 }),
  }))
  assert.equal(traps, 0)
  assert.throws(() => materializeAcpMethodCatalogEvidence(
    valid,
    hostileProxy(registryFor(descriptor), () => { traps += 1 }),
  ))
  assert.equal(traps, 0)

  const catalog = materializeAcpMethodCatalogEvidence(valid, registryFor(descriptor))
  assert.throws(() => validateAcpMethodCatalogEvidence(hostileProxy(catalog, () => { traps += 1 })))
  assert.equal(traps, 0)
  const nested = jsonCopy(catalog) as unknown as Record<string, unknown>
  nested.sourceEvidence = hostileProxy({}, () => { traps += 1 })
  assert.throws(() => validateAcpMethodCatalogEvidence(nested))
  assert.equal(traps, 0)
})

test("K4-R3 fails closed on accessors, symbols, custom prototypes, cycles, and non-JSON values", () => {
  const descriptor = adapter()
  const valid = input(descriptor)
  let getterCalls = 0
  const accessor = { ...valid }
  Object.defineProperty(accessor, "extensionId", {
    enumerable: true,
    get() { getterCalls += 1; return valid.extensionId },
  })
  assert.throws(() => validateAcpMethodCatalogEvidenceInput(accessor))
  assert.equal(getterCalls, 0)

  const symbol = { ...valid, [Symbol("hidden")]: true }
  assert.throws(() => validateAcpMethodCatalogEvidenceInput(symbol))
  const custom = Object.assign(Object.create({ inherited: true }), valid)
  assert.throws(() => validateAcpMethodCatalogEvidenceInput(custom))
  assert.throws(() => validateAcpMethodCatalogEvidenceInput({ ...valid, unknown: () => undefined }))
  assert.throws(() => validateAcpMethodCatalogEvidenceInput({ ...valid, unknown: Number.NaN }))
  const cyclic: Record<string, unknown> = { ...valid }
  cyclic.unknown = cyclic
  assert.throws(() => validateAcpMethodCatalogEvidenceInput(cyclic))
})

test("K4-R3 validator rejects every identity-bearing field, inventory, source, state, and identity mutation", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  registry.register(createExternalCapabilityBinding(bindingInput(descriptor, "initialize")))
  registry.register(createExternalCapabilityBinding(bindingInput(descriptor, "auth/login", {
    externalMetadataSha256: "a".repeat(64),
  })))
  const catalog = materializeAcpMethodCatalogEvidence(input(descriptor), registry)

  const mutations: AcpMethodCatalogEvidence[] = []
  const changedVersion = jsonCopy(catalog) as unknown as Record<string, unknown>
  changedVersion.version = "other"
  mutations.push(changedVersion as unknown as AcpMethodCatalogEvidence)
  const changedSource = jsonCopy(catalog) as unknown as Record<string, unknown>
  ;((changedSource.sourceEvidence as Record<string, unknown>).sources as Array<Record<string, unknown>>)[0]!.blob = "a".repeat(40)
  mutations.push(changedSource as unknown as AcpMethodCatalogEvidence)
  for (const [field, replacement] of [
    ["externalName", "_custom/run"],
    ["objectKind", "ACP_NOTIFICATION"],
    ["messageKind", "NOTIFICATION"],
    ["direction", "AGENT_TO_CLIENT"],
    ["externalMetadataSha256", "b".repeat(64)],
    ["entryIdentity", "c".repeat(64)],
  ] as const) {
    const changed = jsonCopy(catalog) as unknown as { entries: Array<Record<string, unknown>> }
    changed.entries[1]![field] = replacement
    mutations.push(changed as unknown as AcpMethodCatalogEvidence)
  }
  const reordered = jsonCopy(catalog) as unknown as { entries: Array<unknown> }
  ;[reordered.entries[0], reordered.entries[1]] = [reordered.entries[1], reordered.entries[0]]
  mutations.push(reordered as unknown as AcpMethodCatalogEvidence)
  const missing = jsonCopy(catalog) as unknown as { entries: Array<unknown> }
  missing.entries.pop()
  mutations.push(missing as unknown as AcpMethodCatalogEvidence)
  const unboundLeak = jsonCopy(catalog) as unknown as { entries: Array<Record<string, unknown>> }
  unboundLeak.entries[0]!.normalizedCapabilityIds = ["compat/read"]
  mutations.push(unboundLeak as unknown as AcpMethodCatalogEvidence)
  const staleLeak = jsonCopy(catalog) as unknown as { entries: Array<Record<string, unknown>> }
  const stale = staleLeak.entries.find((entry) => entry.externalName === "auth/login")!
  stale.disposition = "SINGLE"
  mutations.push(staleLeak as unknown as AcpMethodCatalogEvidence)
  const falseCatalogIdentity = jsonCopy(catalog) as unknown as Record<string, unknown>
  falseCatalogIdentity.catalogIdentity = "d".repeat(64)
  mutations.push(falseCatalogIdentity as unknown as AcpMethodCatalogEvidence)

  for (const mutation of mutations) assert.throws(() => validateAcpMethodCatalogEvidence(mutation))
})

test("K4-R3 method metadata binds every authorized identity field", () => {
  const method = definition("initialize")
  const base = {
    version: K4_R3_ACP_METHOD_CATALOG_EVIDENCE_VERSION,
    standardPinIdentity: K4_R3_ACP_STANDARD_PIN_IDENTITY,
    externalName: method.externalName,
    objectKind: method.objectKind,
    messageKind: method.messageKind,
    direction: method.direction,
  }
  const baseDigest = identity(base)
  const mutations = [
    { ...base, version: `${base.version}-changed` },
    { ...base, standardPinIdentity: "a".repeat(64) },
    { ...base, externalName: "initialize/changed" },
    { ...base, objectKind: "ACP_CLIENT_METHOD" },
    { ...base, messageKind: "NOTIFICATION" },
    { ...base, direction: "AGENT_TO_CLIENT" },
  ]
  assert.equal(baseDigest, methodMetadata(method))
  for (const mutation of mutations) assert.notEqual(identity(mutation), baseDigest)
})

test("K4-R3 rejects registry shadowing and canonical snapshot-method modification", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  Object.defineProperty(registry, "list", { value: () => registry.list(), configurable: true })
  assert.throws(() => materializeAcpMethodCatalogEvidence(input(descriptor), registry))
  delete (registry as unknown as Record<string, unknown>).list

  const prototype = CompatibilityBindingRegistry.prototype
  const original = prototype.list
  Object.defineProperty(prototype, "list", { value: () => { throw new Error("modified list executed") }, configurable: true })
  try {
    assert.throws(() => materializeAcpMethodCatalogEvidence(input(descriptor), registry), /modified/)
  } finally {
    Object.defineProperty(prototype, "list", { value: original, configurable: true, writable: true })
  }
})

test("K4-R3 schema and shared export are present while the source remains data-only", () => {
  const schema = JSON.parse(source("../../../schema/k4-r3-acp-method-catalog-evidence.schema.json")) as Record<string, unknown>
  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema")
  assert.equal(schema.$id, "https://kodac.dev/schema/k4-r3-acp-method-catalog-evidence.schema.json")
  const index = source("../src/index.ts")
  assert.equal(index.split(/\r?\n/).filter((line) => line === 'export * from "./compatibility/acp-method-catalog.ts"').length, 1)
  const production = source("../src/compatibility/acp-method-catalog.ts")
  assert.deepEqual(
    [...production.matchAll(/\bfrom\s+["']([^"']+)["']/g)].map((match) => match[1]),
    ["node:crypto", "node:util", "./contracts.ts", "./registry.ts"],
  )
  assert.equal(/\bimport\s*\(/.test(production), false)
  assert.equal(/\.register\s*\(|\.dispose\s*\(/.test(production), false)
})
