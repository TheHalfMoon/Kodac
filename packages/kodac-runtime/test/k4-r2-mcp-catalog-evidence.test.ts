import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import test from "node:test"

import {
  K4_R2_BINDING_STATES,
  K4_R2_CACHE_SCOPES,
  K4_R2_LIMITS,
  K4_R2_MCP_CATALOG_EVIDENCE_VERSION,
  K4_R2_MCP_OBJECT_KINDS,
  K4_R2_MCP_STANDARD_EVIDENCE,
  K4_R2_MCP_STANDARD_PIN_IDENTITY,
  K4_R2_PAGE_SHAPES,
  materializeMcpCatalogEvidence,
  validateMcpCatalogEvidenceInput,
  validateMcpCatalogEvidencePage,
  type McpCatalogEvidenceInput,
  type McpCatalogEvidencePage,
} from "../src/compatibility/mcp-catalog.ts"
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

function adapter(extensionId = "kodac/mcp-catalog-adapter"): ExtensionDescriptor {
  return createExtensionDescriptor({
    extensionId,
    extensionVersion: "1.0.0",
    provenance: {
      sourceType: "EXTERNAL_DECLARATION",
      sourceId: "kodac/k4-r2-test-adapter",
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

function bindingInput(
  descriptor: ExtensionDescriptor,
  overrides: Partial<ExternalCapabilityBindingInput> = {},
): ExternalCapabilityBindingInput {
  return {
    standardPinIdentity: K4_R2_MCP_STANDARD_PIN_IDENTITY,
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

function input(
  descriptor = adapter(),
  overrides: Partial<McpCatalogEvidenceInput> = {},
): McpCatalogEvidenceInput {
  return {
    standardPinIdentity: K4_R2_MCP_STANDARD_PIN_IDENTITY,
    extensionId: descriptor.extensionId,
    descriptorIdentity: descriptor.descriptorIdentity,
    objectKind: "MCP_TOOL",
    requestCursorSha256: null,
    nextCursorSha256: null,
    ttlMs: 0,
    cacheScope: "private",
    responseMetadataSha256: "f".repeat(64),
    declarations: [],
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

test("K4-R2 pins the exact MCP revision and every authorized official evidence blob", () => {
  assert.equal(K4_R2_MCP_CATALOG_EVIDENCE_VERSION, "k4-r2-mcp-catalog-evidence-v1")
  assert.equal(K4_R2_MCP_STANDARD_PIN_IDENTITY, compatibilityStandardPin("MCP").standardPinIdentity)
  assert.deepEqual(K4_R2_MCP_STANDARD_EVIDENCE, {
    repository: "modelcontextprotocol/modelcontextprotocol",
    sourceCommit: "57ac4a2ec742e0cb7622d899b0f5d3bcf769fd69",
    sourceTree: "164f5cb7a4a9b72a0b1c81aa0d9eeae5a21688e5",
    specificationRevision: "2026-07-28",
    standardPinIdentity: "b8432ed6198f8e25c5b1d0ef50bab01b06909a77f15f831ff64573a7d4fa312a",
    sources: [
      { path: "docs/specification/2026-07-28/index.mdx", blob: "452d78601b135b95bbe45287e756c0579534096b" },
      { path: "LICENSE", blob: "4a93985763241755401a10678395303de4e720ba" },
      { path: "docs/specification/2026-07-28/server/tools.mdx", blob: "449020f54a6582122607b4869129bec5f1035f37" },
      { path: "docs/specification/2026-07-28/server/resources.mdx", blob: "f49dd8e6be3fd8f13911788ae5f5d4c87d2c53cd" },
      { path: "docs/specification/2026-07-28/server/prompts.mdx", blob: "5a6574be3c16715aaafb1c7973025c1bc3669474" },
      { path: "docs/specification/2026-07-28/server/utilities/pagination.mdx", blob: "b9a840468fc10a8fb31301df9a510cca9d0d345f" },
      { path: "docs/specification/2026-07-28/server/utilities/caching.mdx", blob: "577c5ff54f46c2fc6bd29c10f6ddd07f81f180f0" },
      { path: "schema/2026-07-28/schema.ts", blob: "9b55feeb412bc3ae877f2eac10b5c01ba29a2eed" },
      { path: "schema/2026-07-28/schema.json", blob: "213c58f6d9a1c2ce6ad055afe90bbdb095a29ee8" },
    ],
  })
  assert.equal(Object.isFrozen(K4_R2_MCP_STANDARD_EVIDENCE), true)
  assert.equal(Object.isFrozen(K4_R2_MCP_STANDARD_EVIDENCE.sources), true)
  assert.equal(Object.isFrozen(K4_R2_MCP_STANDARD_EVIDENCE.sources[0]), true)
})

test("closed vocabularies and canonical input normalization are exact", () => {
  assert.deepEqual(K4_R2_MCP_OBJECT_KINDS, ["MCP_TOOL", "MCP_RESOURCE", "MCP_PROMPT"])
  assert.deepEqual(K4_R2_BINDING_STATES, ["UNBOUND", "CURRENT", "STALE"])
  assert.deepEqual(K4_R2_PAGE_SHAPES, ["SINGLE_PAGE_COMPLETE", "PAGINATED_PAGE"])
  assert.deepEqual(K4_R2_CACHE_SCOPES, ["public", "private"])
  const descriptor = adapter()
  const validated = validateMcpCatalogEvidenceInput(input(descriptor, {
    declarations: [
      { externalName: "zeta", externalMetadataSha256: "b".repeat(64) },
      { externalName: "alpha", externalMetadataSha256: "c".repeat(64) },
    ],
  }))
  assert.deepEqual(validated.declarations.map((entry) => entry.externalName), ["alpha", "zeta"])
  assert.equal(Object.isFrozen(validated), true)
  assert.equal(Object.isFrozen(validated.declarations), true)
  assert.equal(Object.isFrozen(validated.declarations[0]), true)
  assert.throws(() => validateMcpCatalogEvidenceInput(input(descriptor, { objectKind: "MCP_SERVER" as never })), /unsupported/)
  assert.throws(() => validateMcpCatalogEvidenceInput(input(descriptor, { cacheScope: "shared" as never })), /unsupported/)
  assert.throws(() => validateMcpCatalogEvidenceInput(input(descriptor, {
    standardPinIdentity: "0".repeat(64) as typeof K4_R2_MCP_STANDARD_PIN_IDENTITY,
  })), /canonical MCP/)
})

test("empty caller-materialized pages are valid, immutable, and content-addressed", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  const page = materializeMcpCatalogEvidence(input(descriptor), registry)
  assert.equal(page.pageShape, "SINGLE_PAGE_COMPLETE")
  assert.deepEqual(page.entries, [])
  assert.equal(page.bindingSnapshotIdentity, registry.list().snapshotIdentity)
  const { pageIdentity: _ignored, ...preimage } = page
  assert.equal(page.pageIdentity, identity(preimage))
  assert.deepEqual(validateMcpCatalogEvidencePage(jsonCopy(page)), page)
  assert.equal(Object.isFrozen(page), true)
  assert.equal(Object.isFrozen(page.entries), true)
})

test("exact tuple and metadata correlation derives CURRENT STALE and UNBOUND without fallback fields", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  const current = createExternalCapabilityBinding(bindingInput(descriptor, {
    externalName: "repo.current",
    externalMetadataSha256: "a".repeat(64),
    disposition: "COMPOSITE",
    normalizedCapabilityIds: ["compat/write", "compat/read"],
  }))
  const stale = createExternalCapabilityBinding(bindingInput(descriptor, {
    externalName: "repo.stale",
    externalMetadataSha256: "b".repeat(64),
  }))
  registry.register(current)
  registry.register(stale)
  const page = materializeMcpCatalogEvidence(input(descriptor, {
    declarations: [
      { externalName: "repo.unbound", externalMetadataSha256: "d".repeat(64) },
      { externalName: "repo.stale", externalMetadataSha256: "c".repeat(64) },
      { externalName: "repo.current", externalMetadataSha256: "a".repeat(64) },
    ],
  }), registry)
  const [currentEntry, staleEntry, unboundEntry] = page.entries
  assert.equal(currentEntry?.bindingState, "CURRENT")
  if (currentEntry?.bindingState !== "CURRENT") assert.fail("expected CURRENT entry")
  assert.equal(currentEntry.bindingIdentity, current.bindingIdentity)
  assert.equal(currentEntry.disposition, "COMPOSITE")
  assert.deepEqual(currentEntry.normalizedCapabilityIds, ["compat/read", "compat/write"])
  assert.equal(staleEntry?.bindingState, "STALE")
  if (staleEntry?.bindingState !== "STALE") assert.fail("expected STALE entry")
  assert.equal(staleEntry.bindingIdentity, stale.bindingIdentity)
  assert.equal("disposition" in staleEntry, false)
  assert.equal("normalizedCapabilityIds" in staleEntry, false)
  assert.equal(unboundEntry?.bindingState, "UNBOUND")
  if (unboundEntry?.bindingState !== "UNBOUND") assert.fail("expected UNBOUND entry")
  assert.equal("bindingIdentity" in unboundEntry, false)
  assert.equal("disposition" in unboundEntry, false)
  assert.equal("normalizedCapabilityIds" in unboundEntry, false)
  for (const entry of page.entries) {
    const { entryIdentity: _entryIdentity, ...entryPreimage } = entry
    assert.equal(entry.entryIdentity, identity(entryPreimage))
    assert.equal(Object.isFrozen(entry), true)
  }
  assert.equal(Object.isFrozen(currentEntry.normalizedCapabilityIds), true)
})

test("object kind adapter descriptor and case are all exact correlation dimensions", () => {
  const primary = adapter("kodac/primary-adapter")
  const other = adapter("kodac/other-adapter")
  const registry = registryFor(primary, other)
  registry.register(createExternalCapabilityBinding(bindingInput(primary, { externalName: "Repo.Search" })))
  const declaration = [{ externalName: "Repo.Search", externalMetadataSha256: "a".repeat(64) }]
  assert.equal(materializeMcpCatalogEvidence(input(primary, { declarations: declaration }), registry).entries[0]?.bindingState, "CURRENT")
  assert.equal(materializeMcpCatalogEvidence(input(primary, { objectKind: "MCP_RESOURCE", declarations: declaration }), registry).entries[0]?.bindingState, "UNBOUND")
  assert.equal(materializeMcpCatalogEvidence(input(other, { declarations: declaration }), registry).entries[0]?.bindingState, "UNBOUND")
  assert.equal(materializeMcpCatalogEvidence(input(primary, {
    declarations: [{ externalName: "repo.search", externalMetadataSha256: "a".repeat(64) }],
  }), registry).entries[0]?.bindingState, "UNBOUND")
})

test("cursor digests preserve absent versus empty opaque cursor evidence and derive page shape exactly", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  const absent = materializeMcpCatalogEvidence(input(descriptor), registry)
  assert.equal(absent.pageShape, "SINGLE_PAGE_COMPLETE")
  const emptyCursorDigest = digest("")
  const incoming = materializeMcpCatalogEvidence(input(descriptor, { requestCursorSha256: emptyCursorDigest }), registry)
  const outgoing = materializeMcpCatalogEvidence(input(descriptor, { nextCursorSha256: emptyCursorDigest }), registry)
  const both = materializeMcpCatalogEvidence(input(descriptor, {
    requestCursorSha256: emptyCursorDigest,
    nextCursorSha256: emptyCursorDigest,
  }), registry)
  for (const page of [incoming, outgoing, both]) assert.equal(page.pageShape, "PAGINATED_PAGE")
  assert.notEqual(absent.pageIdentity, incoming.pageIdentity)
  assert.throws(() => validateMcpCatalogEvidenceInput(input(descriptor, { requestCursorSha256: "" })), /non-empty|SHA-256/)
  assert.throws(() => validateMcpCatalogEvidenceInput({ ...input(descriptor), requestCursor: "opaque" }), /unknown field/)
  assert.equal(JSON.stringify(incoming).includes("opaque"), false)
})

test("TTL and cache scope remain inert identity-bearing hints", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  const base = materializeMcpCatalogEvidence(input(descriptor), registry)
  const ttl = materializeMcpCatalogEvidence(input(descriptor, { ttlMs: Number.MAX_SAFE_INTEGER }), registry)
  const publicHint = materializeMcpCatalogEvidence(input(descriptor, { cacheScope: "public" }), registry)
  assert.equal(ttl.ttlMs, Number.MAX_SAFE_INTEGER)
  assert.equal(publicHint.cacheScope, "public")
  assert.notEqual(base.pageIdentity, ttl.pageIdentity)
  assert.notEqual(base.pageIdentity, publicHint.pageIdentity)
  assert.throws(() => validateMcpCatalogEvidenceInput(input(descriptor, { ttlMs: -1 })), /non-negative safe integer/)
  assert.throws(() => validateMcpCatalogEvidenceInput(input(descriptor, { ttlMs: 0.5 })), /non-negative safe integer/)
  assert.throws(() => validateMcpCatalogEvidenceInput(input(descriptor, { ttlMs: Number.MAX_SAFE_INTEGER + 1 })), /non-negative safe integer/)
})

test("declaration sets are order-independent but every identity-bearing field changes the page identity", () => {
  const descriptor = adapter()
  const other = adapter("kodac/other-adapter")
  const registry = registryFor(descriptor, other)
  const declarations = [
    { externalName: "zeta", externalMetadataSha256: "a".repeat(64) },
    { externalName: "alpha", externalMetadataSha256: "b".repeat(64) },
  ]
  const first = materializeMcpCatalogEvidence(input(descriptor, { declarations }), registry)
  const reordered = materializeMcpCatalogEvidence(input(descriptor, { declarations: [...declarations].reverse() }), registry)
  assert.equal(first.pageIdentity, reordered.pageIdentity)
  assert.deepEqual(first.entries.map((entry) => entry.externalName), ["alpha", "zeta"])
  const variants = [
    input(descriptor, { declarations, nextCursorSha256: "1".repeat(64) }),
    input(descriptor, { declarations, ttlMs: 1 }),
    input(descriptor, { declarations, cacheScope: "public" }),
    input(descriptor, { declarations, responseMetadataSha256: "e".repeat(64) }),
    input(descriptor, { declarations, objectKind: "MCP_PROMPT" }),
    input(other, { declarations }),
    input(descriptor, { declarations: [{ ...declarations[0]!, externalMetadataSha256: "c".repeat(64) }, declarations[1]!] }),
  ]
  for (const variant of variants) {
    assert.notEqual(materializeMcpCatalogEvidence(variant, registry).pageIdentity, first.pageIdentity)
  }
  const expandedSnapshot = registryFor(descriptor)
  expandedSnapshot.register(createExternalCapabilityBinding(bindingInput(descriptor, { externalName: "other" })))
  assert.notEqual(materializeMcpCatalogEvidence(input(descriptor, { declarations }), expandedSnapshot).pageIdentity, first.pageIdentity)
})

test("materialization captures one snapshot without mutating registry content serials or prior pages", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  const binding = createExternalCapabilityBinding(bindingInput(descriptor))
  const receipt = registry.register(binding)
  const before = registry.list()
  const page = materializeMcpCatalogEvidence(input(descriptor, {
    declarations: [{ externalName: binding.externalName, externalMetadataSha256: binding.externalMetadataSha256 }],
  }), registry)
  const serializedBefore = JSON.stringify(page)
  assert.equal(registry.size, 1)
  assert.deepEqual(registry.list(), before)
  const later = createExternalCapabilityBinding(bindingInput(descriptor, { externalName: "repo.later" }))
  const laterReceipt = registry.register(later)
  assert.equal(laterReceipt.registrationSerial, receipt.registrationSerial + 1)
  assert.equal(JSON.stringify(page), serializedBefore)
  assert.equal(registry.dispose(receipt), true)
  assert.equal(JSON.stringify(page), serializedBefore)
  assert.equal(page.entries[0]?.bindingState, "CURRENT")
  const production = source("../src/compatibility/mcp-catalog.ts")
  assert.equal((production.match(/CANONICAL_REGISTRY_LIST\.call\(registry\)/g) ?? []).length, 1)
  assert.ok(production.indexOf("validateMcpCatalogEvidenceInput(value)") < production.indexOf("captureBindingSnapshot(registry)"))
})

test("resource names remain opaque bounded strings and create no URI authority", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  const uri = "file:///../../outside?network=https://invalid.example"
  const page = materializeMcpCatalogEvidence(input(descriptor, {
    objectKind: "MCP_RESOURCE",
    declarations: [{ externalName: uri, externalMetadataSha256: "a".repeat(64) }],
  }), registry)
  assert.equal(page.entries[0]?.externalName, uri)
  assert.equal(page.entries[0]?.bindingState, "UNBOUND")
})

test("direct and nested proxies are rejected without executing caller traps", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  let traps = 0
  const onTrap = () => { traps += 1 }
  assert.throws(() => validateMcpCatalogEvidenceInput(hostileProxy(input(descriptor), onTrap)), /Proxy/)
  assert.equal(traps, 0)
  assert.throws(() => validateMcpCatalogEvidenceInput(input(descriptor, {
    declarations: [hostileProxy({ externalName: "repo.search", externalMetadataSha256: "a".repeat(64) }, onTrap)],
  })), /Proxy/)
  assert.equal(traps, 0)
  assert.throws(() => materializeMcpCatalogEvidence(input(descriptor), hostileProxy(registry, onTrap)), /Proxy/)
  assert.equal(traps, 0)
  const page = materializeMcpCatalogEvidence(input(descriptor, {
    declarations: [{ externalName: "repo.search", externalMetadataSha256: "a".repeat(64) }],
  }), registry)
  assert.throws(() => validateMcpCatalogEvidencePage(hostileProxy(page, onTrap)), /Proxy/)
  assert.equal(traps, 0)
  const nestedPage = { ...page, entries: [hostileProxy({ ...page.entries[0]! }, onTrap)] }
  assert.throws(() => validateMcpCatalogEvidencePage(nestedPage), /Proxy/)
  assert.equal(traps, 0)
})

test("accessors symbols custom prototypes sparse arrays cycles and non-JSON values fail closed", () => {
  const descriptor = adapter()
  let getterCalls = 0
  const accessor = { ...input(descriptor) } as Record<string, unknown>
  Object.defineProperty(accessor, "ttlMs", {
    enumerable: true,
    get() { getterCalls += 1; return 0 },
  })
  assert.throws(() => validateMcpCatalogEvidenceInput(accessor), /data property/)
  assert.equal(getterCalls, 0)
  const withSymbol = { ...input(descriptor), [Symbol("authority")]: true }
  assert.throws(() => validateMcpCatalogEvidenceInput(withSymbol), /symbol/)
  const custom = Object.assign(Object.create({ inherited: true }), input(descriptor))
  assert.throws(() => validateMcpCatalogEvidenceInput(custom), /plain object/)
  const sparse = input(descriptor) as unknown as Record<string, unknown>
  sparse.declarations = new Array(2)
  assert.throws(() => validateMcpCatalogEvidenceInput(sparse), /dense/)
  const cyclic = input(descriptor) as unknown as Record<string, unknown>
  cyclic.declarations = [cyclic]
  assert.throws(() => validateMcpCatalogEvidenceInput(cyclic), /cyclic/)
  for (const invalid of [undefined, 1n, () => undefined]) {
    assert.throws(() => validateMcpCatalogEvidenceInput({ ...input(descriptor), declarations: [invalid] as never }), /JSON data/)
  }
})

test("unknown fields malformed digests duplicate names and name bounds fail closed", () => {
  const descriptor = adapter()
  assert.throws(() => validateMcpCatalogEvidenceInput({ ...input(descriptor), transport: "stdio" }), /unknown field/)
  assert.throws(() => validateMcpCatalogEvidenceInput(input(descriptor, { responseMetadataSha256: "A".repeat(64) })), /lowercase SHA-256/)
  assert.throws(() => validateMcpCatalogEvidenceInput(input(descriptor, {
    declarations: [
      { externalName: "duplicate", externalMetadataSha256: "a".repeat(64) },
      { externalName: "duplicate", externalMetadataSha256: "b".repeat(64) },
    ],
  })), /duplicate externalName/)
  assert.doesNotThrow(() => validateMcpCatalogEvidenceInput(input(descriptor, {
    declarations: [
      { externalName: "Tool", externalMetadataSha256: "a".repeat(64) },
      { externalName: "tool", externalMetadataSha256: "b".repeat(64) },
    ],
  })))
  assert.doesNotThrow(() => validateMcpCatalogEvidenceInput(input(descriptor, {
    declarations: [{ externalName: "é".repeat(256), externalMetadataSha256: "a".repeat(64) }],
  })))
  assert.throws(() => validateMcpCatalogEvidenceInput(input(descriptor, {
    declarations: [{ externalName: "é".repeat(257), externalMetadataSha256: "a".repeat(64) }],
  })), /512 UTF-8 bytes/)
  assert.throws(() => validateMcpCatalogEvidenceInput(input(descriptor, {
    declarations: [{ externalName: "a".repeat(513), externalMetadataSha256: "a".repeat(64) }],
  })), /512 UTF-8 bytes/)
})

test("declaration array bounds fail before per-entry traversal and the exact maximum is admitted", () => {
  const descriptor = adapter()
  let getterCalls = 0
  const oversized = new Array(K4_R2_LIMITS.maxDeclarations + 1)
  Object.defineProperty(oversized, "0", {
    enumerable: true,
    get() { getterCalls += 1; return {} },
  })
  assert.throws(() => validateMcpCatalogEvidenceInput(input(descriptor, { declarations: oversized })), /pre-validation array bound/)
  assert.equal(getterCalls, 0)
  const maximum = Array.from({ length: K4_R2_LIMITS.maxDeclarations }, (_, index) => ({
    externalName: `tool-${String(index).padStart(4, "0")}`,
    externalMetadataSha256: digest(String(index)),
  }))
  const validated = validateMcpCatalogEvidenceInput(input(descriptor, { declarations: maximum }))
  assert.equal(validated.declarations.length, K4_R2_LIMITS.maxDeclarations)
})

test("canonical depth node and object-field bounds fail before identity construction", () => {
  const descriptor = adapter()
  let deep: Record<string, unknown> = { leaf: true }
  for (let index = 0; index <= K4_R2_LIMITS.maxCanonicalDepth; index += 1) deep = { next: deep }
  assert.throws(() => validateMcpCatalogEvidenceInput({ ...input(descriptor), unexpected: deep }), /depth bound/)

  const wide = Object.create(null) as Record<string, unknown>
  for (let index = 0; index <= K4_R2_LIMITS.maxCanonicalNodes; index += 1) wide[`field${index}`] = null
  assert.throws(() => validateMcpCatalogEvidenceInput({ ...input(descriptor), unexpected: wide }), /object-field bound/)
})

test("serialized page validation recomputes identities order shape and state-dependent fields", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  const current = createExternalCapabilityBinding(bindingInput(descriptor, { externalName: "alpha" }))
  const stale = createExternalCapabilityBinding(bindingInput(descriptor, {
    externalName: "beta",
    externalMetadataSha256: "b".repeat(64),
  }))
  registry.register(current)
  registry.register(stale)
  const page = materializeMcpCatalogEvidence(input(descriptor, {
    declarations: [
      { externalName: "gamma", externalMetadataSha256: "c".repeat(64) },
      { externalName: "beta", externalMetadataSha256: "d".repeat(64) },
      { externalName: "alpha", externalMetadataSha256: "a".repeat(64) },
    ],
  }), registry)
  assert.deepEqual(validateMcpCatalogEvidencePage(jsonCopy(page)), page)
  const wrongPageIdentity = { ...jsonCopy(page), pageIdentity: "0".repeat(64) }
  assert.throws(() => validateMcpCatalogEvidencePage(wrongPageIdentity), /derived fields mismatch/)
  const wrongShape = { ...jsonCopy(page), pageShape: "PAGINATED_PAGE" }
  assert.throws(() => validateMcpCatalogEvidencePage(wrongShape), /cursor digest state/)
  const reversed = { ...jsonCopy(page), entries: [...jsonCopy(page.entries)].reverse() }
  assert.throws(() => validateMcpCatalogEvidencePage(reversed), /canonical declaration order/)
  const currentWithWrongIdentity = jsonCopy(page) as unknown as { entries: Array<Record<string, unknown>> }
  currentWithWrongIdentity.entries[0] = { ...currentWithWrongIdentity.entries[0]!, entryIdentity: "0".repeat(64) }
  assert.throws(() => validateMcpCatalogEvidencePage(currentWithWrongIdentity), /derived fields mismatch/)
  const staleWithCapabilities = jsonCopy(page) as unknown as { entries: Array<Record<string, unknown>> }
  staleWithCapabilities.entries[1]!.normalizedCapabilityIds = ["compat/read"]
  assert.throws(() => validateMcpCatalogEvidencePage(staleWithCapabilities), /unknown field/)
  const unboundWithBinding = jsonCopy(page) as unknown as { entries: Array<Record<string, unknown>> }
  unboundWithBinding.entries[2]!.bindingIdentity = "0".repeat(64)
  assert.throws(() => validateMcpCatalogEvidencePage(unboundWithBinding), /unknown field/)
  assert.throws(() => validateMcpCatalogEvidencePage({ ...jsonCopy(page), unexpectedAuthority: true }), /unknown field/)
})

test("serialized CURRENT disposition cardinality and capability ordering stay fail closed", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  const binding = createExternalCapabilityBinding(bindingInput(descriptor, {
    disposition: "COMPOSITE",
    normalizedCapabilityIds: ["compat/read", "compat/write"],
  }))
  registry.register(binding)
  const page = materializeMcpCatalogEvidence(input(descriptor, {
    declarations: [{ externalName: binding.externalName, externalMetadataSha256: binding.externalMetadataSha256 }],
  }), registry)
  const wrongOrder = jsonCopy(page) as unknown as { entries: Array<Record<string, unknown>> }
  wrongOrder.entries[0]!.normalizedCapabilityIds = ["compat/write", "compat/read"]
  assert.throws(() => validateMcpCatalogEvidencePage(wrongOrder), /canonical order/)
  const wrongCardinality = jsonCopy(page) as unknown as { entries: Array<Record<string, unknown>> }
  wrongCardinality.entries[0]!.normalizedCapabilityIds = ["compat/read"]
  assert.throws(() => validateMcpCatalogEvidencePage(wrongCardinality), /at least two/)
})

test("canonical registry identity is required and caller method shadows never execute", () => {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  let calls = 0
  Object.defineProperty(registry, "list", {
    configurable: true,
    value() { calls += 1; return {} },
  })
  assert.throws(() => materializeMcpCatalogEvidence(input(descriptor), registry), /must not shadow/)
  assert.equal(calls, 0)
  delete (registry as unknown as Record<string, unknown>).list
  class DerivedRegistry extends CompatibilityBindingRegistry {}
  const extensionRegistry = new ExtensionDescriptorRegistry()
  extensionRegistry.register(descriptor)
  const derived = new DerivedRegistry(extensionRegistry)
  assert.throws(() => materializeMcpCatalogEvidence(input(descriptor), derived), /canonical CompatibilityBindingRegistry prototype/)
})

test("published schema mirrors runtime bounds vocabularies nullability and state unions", () => {
  const schema = JSON.parse(source("../../../schema/k4-r2-mcp-catalog-evidence.schema.json")) as Record<string, unknown>
  const oneOf = schema.oneOf as readonly Record<string, unknown>[]
  assert.deepEqual(oneOf.map((entry) => entry.$ref), ["#/$defs/input", "#/$defs/page"])
  const defs = schema.$defs as Record<string, Record<string, unknown>>
  assert.equal(defs.input?.additionalProperties, false)
  assert.equal(defs.page?.additionalProperties, false)
  assert.deepEqual((defs.objectKind as Record<string, unknown>).enum, K4_R2_MCP_OBJECT_KINDS)
  assert.deepEqual((defs.standardPinIdentity as Record<string, unknown>).const, K4_R2_MCP_STANDARD_PIN_IDENTITY)
  const inputProperties = defs.input?.properties as Record<string, Record<string, unknown>>
  assert.equal(inputProperties.declarations?.maxItems, 4096)
  assert.deepEqual(inputProperties.cacheScope?.enum, K4_R2_CACHE_SCOPES)
  const pageProperties = defs.page?.properties as Record<string, Record<string, unknown>>
  assert.equal(pageProperties.entries?.maxItems, 4096)
  assert.deepEqual(pageProperties.pageShape?.enum, K4_R2_PAGE_SHAPES)
  assert.equal((defs.currentEntry?.properties as Record<string, Record<string, unknown>>).normalizedCapabilityIds?.maxItems, 16)
  assert.deepEqual((defs.entry?.oneOf as readonly Record<string, unknown>[]).map((entry) => entry.$ref), [
    "#/$defs/unboundEntry", "#/$defs/currentEntry", "#/$defs/staleEntry",
  ])
})

test("K4-R2 production is pure and imports only deterministic K4-R1 support", () => {
  const production = source("../src/compatibility/mcp-catalog.ts")
  assert.deepEqual([...production.matchAll(/from "([^"]+)"/gm)].map((match) => match[1]), [
    "node:crypto",
    "node:util",
    "./contracts.ts",
    "./registry.ts",
  ])
  assert.doesNotMatch(production, /node:(?:fs|child_process|http|https|http2|net|tls|dgram|worker_threads|os)/)
  assert.doesNotMatch(production, /\b(?:fetch|require|eval|Function|ExecutionGateway|WorkspaceFileSystem|TrustKernel|DoneGate|process)\b/)
  assert.doesNotMatch(production, /\bimport\s*\(/)
  assert.doesNotMatch(production, /\b(?:Date|setTimeout|setInterval|performance|randomUUID|getRandomValues)\b/)
  assert.doesNotMatch(production, /JSON-RPC|tools\/call|resources\/read|prompts\/get|list_changed/)
})

test("package root exports the K4-R2 contract exactly once", () => {
  const index = source("../src/index.ts")
  assert.equal(index.split("\n").filter((line) => line === 'export * from "./compatibility/mcp-catalog.ts"').length, 1)
})
