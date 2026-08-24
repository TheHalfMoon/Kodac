import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import test from "node:test"

import {
  K4_R5_AGENT_SKILL_ASSERTED_OUTCOMES,
  K4_R5_AGENT_SKILL_GOVERNANCE_AUTHORITY_STATE,
  K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_VERSION,
  K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_STATUS,
  K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS,
  K4_R5_AGENT_SKILL_GOVERNANCE_TRUST_STATUS,
  K4_R5_AGENT_SKILL_REQUIREMENT_KINDS,
  materializeAgentSkillGovernanceClaimEvidence,
  validateAgentSkillGovernanceClaimEvidence,
  validateAgentSkillGovernanceClaimEvidenceInput,
  type AgentSkillGovernanceClaimEvidence,
  type AgentSkillGovernanceClaimEvidenceInput,
} from "../src/compatibility/agent-skill-governance-claim-evidence.ts"
import {
  K4_R4_AGENT_SKILL_OBJECT_KIND,
  K4_R4_AGENT_SKILL_PACKAGE_EVIDENCE_VERSION,
  K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY,
  materializeAgentSkillPackageEvidence,
  type AgentSkillPackageEvidence,
  type AgentSkillPackageEvidenceInput,
} from "../src/compatibility/agent-skill-package-evidence.ts"
import {
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
      sourceId: "kodac/k4-r5-test-adapter",
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

function packageInput(
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
    metadataEntries: [{ key: "x-private-category", value: "documentation" }],
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

function packageEvidence(
  state: AgentSkillPackageEvidence["bindingState"] = "CURRENT",
): { evidence: AgentSkillPackageEvidence, registry: CompatibilityBindingRegistry } {
  const descriptor = adapter()
  const registry = registryFor(descriptor)
  const unbound = materializeAgentSkillPackageEvidence(packageInput(descriptor), registry)
  if (state === "CURRENT") {
    registry.register(createExternalCapabilityBinding(bindingInput(descriptor, unbound.externalMetadataSha256, {
      disposition: "COMPOSITE",
      normalizedCapabilityIds: ["skills/inspect", "skills/read"],
    })))
  } else if (state === "STALE") {
    registry.register(createExternalCapabilityBinding(bindingInput(descriptor, "a".repeat(64))))
  }
  return { evidence: materializeAgentSkillPackageEvidence(packageInput(descriptor), registry), registry }
}

function governanceInput(
  evidence = packageEvidence().evidence,
  overrides: Partial<AgentSkillGovernanceClaimEvidenceInput> = {},
): AgentSkillGovernanceClaimEvidenceInput {
  return {
    version: K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_VERSION,
    packageEvidence: evidence,
    packageVersionEvidence: { sha256: digest("1.2.3"), byteLength: 5 },
    governanceRevisionIdentity: digest("governance-revision-7"),
    requestedCapabilityClaims: [
      { capabilityId: "skills/write" },
      { capabilityId: "skills/read" },
    ],
    requirementClaims: [
      { requirementKind: "SECRET", evidenceSha256: digest("secret requirement"), evidenceByteLength: 18 },
      { requirementKind: "FILESYSTEM", evidenceSha256: digest("filesystem requirement"), evidenceByteLength: 22 },
      { requirementKind: "NETWORK", evidenceSha256: digest("network requirement"), evidenceByteLength: 19 },
    ],
    compatibilityClaimEvidence: { sha256: digest("compatibility claim"), byteLength: 19 },
    evaluationClaims: [
      {
        evaluatorIdentity: digest("evaluator-z"),
        artifactIdentity: digest("artifact-a"),
        artifactByteLength: 42,
        assertedOutcome: "PASS",
      },
      {
        evaluatorIdentity: digest("evaluator-a"),
        artifactIdentity: digest("artifact-z"),
        artifactByteLength: 84,
        assertedOutcome: "INCONCLUSIVE",
      },
    ],
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

test("K4-R5 fixes the claim, trust, authority, requirement, outcome, and bound vocabularies", () => {
  assert.equal(K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_VERSION, "k4-r5-agent-skill-governance-claim-evidence-v1")
  assert.equal(K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_STATUS, "CALLER_ASSERTED")
  assert.equal(K4_R5_AGENT_SKILL_GOVERNANCE_TRUST_STATUS, "UNASSESSED")
  assert.equal(K4_R5_AGENT_SKILL_GOVERNANCE_AUTHORITY_STATE, "NONE")
  assert.deepEqual(K4_R5_AGENT_SKILL_REQUIREMENT_KINDS, ["FILESYSTEM", "NETWORK", "PROCESS", "SECRET"])
  assert.deepEqual(K4_R5_AGENT_SKILL_ASSERTED_OUTCOMES, ["PASS", "FAIL", "INCONCLUSIVE"])
  assert.deepEqual(K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS, {
    maxRequestedCapabilityClaims: 16,
    maxRequirementClaims: 4,
    maxEvaluationClaims: 32,
    maxEvidenceByteLength: 16 * 1024 * 1024,
    maxPackageVersionEvidenceByteLength: 4_096,
    maxCompatibilityClaimEvidenceByteLength: 65_536,
  })
  assertDeepFrozen(K4_R5_AGENT_SKILL_REQUIREMENT_KINDS)
  assertDeepFrozen(K4_R5_AGENT_SKILL_ASSERTED_OUTCOMES)
  assertDeepFrozen(K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS)
})

test("K4-R5 selects exact redacted K4-R4 lineage and emits caller assertions with no authority", () => {
  const packageRecord = packageEvidence("CURRENT").evidence
  const raw = governanceInput(packageRecord)
  const evidence = materializeAgentSkillGovernanceClaimEvidence(raw)
  assert.equal(evidence.packageEvidenceIdentity, packageRecord.evidenceIdentity)
  assert.equal(evidence.packageEvidenceVersion, K4_R4_AGENT_SKILL_PACKAGE_EVIDENCE_VERSION)
  assert.equal(evidence.standardPinIdentity, K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY)
  assert.equal(evidence.objectKind, "AGENT_SKILL")
  for (const key of [
    "extensionId", "descriptorIdentity", "bindingSnapshotIdentity", "bindingState", "directoryName", "name",
    "externalMetadataSha256", "sourceProvenanceIdentity", "packageManifestEvidence", "licenseEvidence",
    "compatibilityEvidence",
  ] as const) assert.deepEqual(evidence[key], packageRecord[key])
  assert.equal(evidence.trustStatus, "UNASSESSED")
  assert.equal(evidence.authorityState, "NONE")
  for (const claim of [
    ...evidence.requestedCapabilityClaims,
    ...evidence.requirementClaims,
    ...evidence.evaluationClaims,
    evidence.compatibilityClaimEvidence!,
  ]) assert.equal(claim.claimStatus, "CALLER_ASSERTED")
  const serialized = JSON.stringify(evidence)
  for (const forbidden of [
    "packageEvidence", "descriptionEvidence", "metadataEvidence", "allowedToolsEvidence", "instructionBodyEvidence",
    "skillFileEvidence", "sourceEvidence", "normalizedCapabilityIds", "disposition", "Read Grep", "# Instructions",
    "Requires caller-provided change evidence.",
  ]) assert.equal(serialized.includes(`\"${forbidden}\"`), false)
  const { governanceEvidenceIdentity, ...base } = evidence
  assert.equal(governanceEvidenceIdentity, identity(base))
  assert.deepEqual(validateAgentSkillGovernanceClaimEvidence(jsonCopy(evidence), packageRecord), evidence)
  assertDeepFrozen(evidence)
})

test("K4-R5 preserves UNBOUND, CURRENT, and STALE only as lineage without fallback or qualification", () => {
  for (const state of ["UNBOUND", "CURRENT", "STALE"] as const) {
    const record = packageEvidence(state).evidence
    const evidence = materializeAgentSkillGovernanceClaimEvidence(governanceInput(record, {
      requestedCapabilityClaims: [{ capabilityId: "unrelated/capability" }],
    }))
    assert.equal(evidence.bindingState, state)
    assert.equal(evidence.packageEvidenceIdentity, record.evidenceIdentity)
    assert.equal(evidence.requestedCapabilityClaims[0].capabilityId, "unrelated/capability")
    assert.equal(evidence.requestedCapabilityClaims[0].claimStatus, "CALLER_ASSERTED")
    assert.equal(evidence.trustStatus, "UNASSESSED")
    assert.equal(evidence.authorityState, "NONE")
    assert.equal(Object.hasOwn(evidence, "normalizedCapabilityIds"), false)
    assert.equal(Object.hasOwn(evidence, "fallback"), false)
    assert.equal(Object.hasOwn(evidence, "qualified"), false)
  }
})

test("K4-R5 rejects duplicates before canonical sorting and is stable under key and set order", () => {
  const raw = governanceInput()
  const evidence = materializeAgentSkillGovernanceClaimEvidence(raw)
  assert.deepEqual(evidence.requestedCapabilityClaims.map((claim) => claim.capabilityId), ["skills/read", "skills/write"])
  assert.deepEqual(evidence.requirementClaims.map((claim) => claim.requirementKind), ["FILESYSTEM", "NETWORK", "SECRET"])
  assert.deepEqual(evidence.evaluationClaims.map((claim) => claim.evaluatorIdentity), [
    digest("evaluator-a"),
    digest("evaluator-z"),
  ])
  const reordered = materializeAgentSkillGovernanceClaimEvidence({
    evaluationClaims: [...raw.evaluationClaims].reverse(),
    compatibilityClaimEvidence: raw.compatibilityClaimEvidence,
    requirementClaims: [...raw.requirementClaims].reverse(),
    requestedCapabilityClaims: [...raw.requestedCapabilityClaims].reverse(),
    governanceRevisionIdentity: raw.governanceRevisionIdentity,
    packageVersionEvidence: raw.packageVersionEvidence,
    packageEvidence: raw.packageEvidence,
    version: raw.version,
  })
  assert.deepEqual(reordered, evidence)
  assert.throws(() => materializeAgentSkillGovernanceClaimEvidence(governanceInput(undefined, {
    requestedCapabilityClaims: [{ capabilityId: "skills/read" }, { capabilityId: "skills/read" }],
  })), /duplicate capabilityId/)
  assert.throws(() => materializeAgentSkillGovernanceClaimEvidence(governanceInput(undefined, {
    requirementClaims: [
      { requirementKind: "NETWORK", evidenceSha256: digest("one"), evidenceByteLength: 1 },
      { requirementKind: "NETWORK", evidenceSha256: digest("two"), evidenceByteLength: 2 },
    ],
  })), /duplicate requirementKind/)
  assert.throws(() => materializeAgentSkillGovernanceClaimEvidence(governanceInput(undefined, {
    evaluationClaims: [
      { evaluatorIdentity: digest("e"), artifactIdentity: digest("a"), artifactByteLength: 1, assertedOutcome: "PASS" },
      { evaluatorIdentity: digest("e"), artifactIdentity: digest("a"), artifactByteLength: 2, assertedOutcome: "FAIL" },
    ],
  })), /duplicate evaluatorIdentity\/artifactIdentity/)
})

test("K4-R5 closes caller shape, forbids output-state injection, and enforces all collection bounds", () => {
  const raw = governanceInput()
  assertDeepFrozen(validateAgentSkillGovernanceClaimEvidenceInput(raw))
  for (const [field, value] of [
    ["claimStatus", "CALLER_ASSERTED"],
    ["trustStatus", "UNASSESSED"],
    ["authorityState", "NONE"],
    ["policyResult", "ALLOW"],
    ["approval", true],
    ["denial", false],
    ["score", 1],
    ["route", "runtime"],
    ["executionDisposition", "EXECUTE"],
    ["versionText", "1.2.3"],
    ["url", "https://example.invalid"],
    ["credentials", "secret"],
  ] as const) assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({ ...raw, [field]: value }))
  assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({ ...raw, requestedCapabilityClaims: Array.from(
    { length: 17 },
    (_, index) => ({ capabilityId: `skills/capability-${index}` }),
  ) }))
  assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({ ...raw, requirementClaims: Array.from(
    { length: 5 },
    (_, index) => ({ requirementKind: "FILESYSTEM", evidenceSha256: digest(`r-${index}`), evidenceByteLength: 1 }),
  ) }))
  assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({ ...raw, evaluationClaims: Array.from(
    { length: 33 },
    (_, index) => ({
      evaluatorIdentity: digest(`e-${index}`),
      artifactIdentity: digest(`a-${index}`),
      artifactByteLength: 1,
      assertedOutcome: "PASS",
    }),
  ) }))
  assert.deepEqual(materializeAgentSkillGovernanceClaimEvidence(governanceInput(undefined, {
    requestedCapabilityClaims: [], requirementClaims: [], compatibilityClaimEvidence: null, evaluationClaims: [],
  })).evaluationClaims, [])
})

test("K4-R5 enforces digest grammar and every byte-length boundary", () => {
  const raw = governanceInput()
  for (const packageVersionEvidence of [
    { sha256: "A".repeat(64), byteLength: 1 },
    { sha256: digest("v"), byteLength: 0 },
    { sha256: digest("v"), byteLength: 4_097 },
    { sha256: digest("v"), byteLength: 1.5 },
  ]) assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({ ...raw, packageVersionEvidence }))
  assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({ ...raw, governanceRevisionIdentity: "a".repeat(63) }))
  for (const byteLength of [0, 65_537]) assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({
    ...raw,
    compatibilityClaimEvidence: { sha256: digest("compatibility"), byteLength },
  }))
  for (const byteLength of [0, K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS.maxEvidenceByteLength + 1]) {
    assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({
      ...raw,
      requirementClaims: [{ requirementKind: "PROCESS", evidenceSha256: digest("requirement"), evidenceByteLength: byteLength }],
    }))
    assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({
      ...raw,
      evaluationClaims: [{
        evaluatorIdentity: digest("evaluator"), artifactIdentity: digest("artifact"), artifactByteLength: byteLength,
        assertedOutcome: "FAIL",
      }],
    }))
  }
  assert.doesNotThrow(() => validateAgentSkillGovernanceClaimEvidenceInput({
    ...raw,
    packageVersionEvidence: { sha256: digest("v"), byteLength: 4_096 },
    compatibilityClaimEvidence: { sha256: digest("compatibility"), byteLength: 65_536 },
    requirementClaims: [{
      requirementKind: "PROCESS", evidenceSha256: digest("requirement"),
      evidenceByteLength: K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS.maxEvidenceByteLength,
    }],
    evaluationClaims: [{
      evaluatorIdentity: digest("evaluator"), artifactIdentity: digest("artifact"),
      artifactByteLength: K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS.maxEvidenceByteLength, assertedOutcome: "FAIL",
    }],
  }))
})

test("K4-R5 validator detects selected lineage, claim, order, length, status, and identity mutations", () => {
  const packageRecord = packageEvidence().evidence
  const evidence = materializeAgentSkillGovernanceClaimEvidence(governanceInput(packageRecord))
  const mutations: Array<(record: Record<string, unknown>) => void> = [
    (record) => { record.version = "other" },
    (record) => { record.packageEvidenceIdentity = "a".repeat(64) },
    (record) => { record.packageEvidenceVersion = "other" },
    (record) => { record.standardPinIdentity = "b".repeat(64) },
    (record) => { record.objectKind = "OTHER" },
    (record) => { record.extensionId = "kodac/other-adapter" },
    (record) => { record.descriptorIdentity = "c".repeat(64) },
    (record) => { record.bindingSnapshotIdentity = "d".repeat(64) },
    (record) => { record.bindingState = "STALE" },
    (record) => { record.directoryName = "other-skill" },
    (record) => { record.name = "other-skill" },
    (record) => { record.externalMetadataSha256 = "e".repeat(64) },
    (record) => { record.sourceProvenanceIdentity = "f".repeat(64) },
    (record) => { (record.packageManifestEvidence as Record<string, unknown>).fileCount = 4 },
    (record) => { (record.licenseEvidence as Record<string, unknown>).byteLength = 1 },
    (record) => { (record.compatibilityEvidence as Record<string, unknown>).sha256 = "a".repeat(64) },
    (record) => { (record.packageVersionEvidence as Record<string, unknown>).byteLength = 4 },
    (record) => { record.governanceRevisionIdentity = "b".repeat(64) },
    (record) => { ((record.requestedCapabilityClaims as unknown[])[0] as Record<string, unknown>).capabilityId = "skills/other" },
    (record) => { (record.requestedCapabilityClaims as unknown[]).reverse() },
    (record) => { ((record.requirementClaims as unknown[])[0] as Record<string, unknown>).evidenceByteLength = 1 },
    (record) => { ((record.requirementClaims as unknown[])[0] as Record<string, unknown>).claimStatus = "VERIFIED" },
    (record) => { ((record.compatibilityClaimEvidence as Record<string, unknown>)).byteLength = 1 },
    (record) => { ((record.evaluationClaims as unknown[])[0] as Record<string, unknown>).assertedOutcome = "FAIL" },
    (record) => { ((record.evaluationClaims as unknown[])[0] as Record<string, unknown>).artifactByteLength = 1 },
    (record) => { (record.evaluationClaims as unknown[]).reverse() },
    (record) => { record.trustStatus = "TRUSTED" },
    (record) => { record.authorityState = "GRANTED" },
    (record) => { record.governanceEvidenceIdentity = "0".repeat(64) },
  ]
  for (const mutate of mutations) {
    const changed = jsonCopy(evidence) as unknown as Record<string, unknown>
    mutate(changed)
    assert.throws(() => validateAgentSkillGovernanceClaimEvidence(changed, packageRecord))
  }
  const differentPackage = packageEvidence("UNBOUND").evidence
  assert.throws(() => validateAgentSkillGovernanceClaimEvidence(evidence, differentPackage), /derived fields mismatch/)
  assert.throws(() => validateAgentSkillGovernanceClaimEvidence(evidence, { ...packageRecord, evidenceIdentity: "0".repeat(64) }))
})

test("K4-R5 rejects direct and nested proxies without executing caller traps", () => {
  const raw = governanceInput()
  let traps = 0
  assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput(hostileProxy(raw, () => { traps += 1 })))
  assert.equal(traps, 0)
  assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({
    ...raw,
    requirementClaims: [hostileProxy({
      requirementKind: "NETWORK", evidenceSha256: digest("network"), evidenceByteLength: 7,
    }, () => { traps += 1 })],
  }))
  assert.equal(traps, 0)
  assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({
    ...raw,
    packageEvidence: hostileProxy(raw.packageEvidence, () => { traps += 1 }),
  }))
  assert.equal(traps, 0)
  const evidence = materializeAgentSkillGovernanceClaimEvidence(raw)
  assert.throws(() => validateAgentSkillGovernanceClaimEvidence(
    hostileProxy(evidence, () => { traps += 1 }),
    raw.packageEvidence,
  ))
  assert.equal(traps, 0)
  const nested = jsonCopy(evidence) as unknown as Record<string, unknown>
  nested.packageVersionEvidence = hostileProxy({}, () => { traps += 1 })
  assert.throws(() => validateAgentSkillGovernanceClaimEvidence(nested, raw.packageEvidence))
  assert.equal(traps, 0)
})

test("K4-R5 fails closed on accessors, symbols, prototypes, sparse arrays, cycles, and non-JSON", () => {
  const raw = governanceInput()
  let getterCalls = 0
  const accessor = { ...raw }
  Object.defineProperty(accessor, "governanceRevisionIdentity", {
    enumerable: true,
    get() { getterCalls += 1; return raw.governanceRevisionIdentity },
  })
  assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput(accessor))
  assert.equal(getterCalls, 0)
  assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({ ...raw, [Symbol("hidden")]: true }))
  assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput(Object.assign(Object.create({ inherited: true }), raw)))
  const sparse = Array(1) as Array<{ capabilityId: string }>
  assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({ ...raw, requestedCapabilityClaims: sparse }))
  const cyclic: Record<string, unknown> = { ...raw }
  cyclic.unknown = cyclic
  assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput(cyclic))
  assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({ ...raw, unknown: () => undefined }))
  assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({ ...raw, unknown: Number.NaN }))
  assert.throws(() => validateAgentSkillGovernanceClaimEvidenceInput({
    ...raw,
    requestedCapabilityClaims: [{ capabilityId: "Skills/Read" }],
  }))
})

test("K4-R5 output is deeply immutable and independent of later caller or registry mutation", () => {
  const { evidence: packageRecord, registry } = packageEvidence("UNBOUND")
  const raw = jsonCopy(governanceInput(packageRecord))
  const evidence = materializeAgentSkillGovernanceClaimEvidence(raw)
  const before = JSON.stringify(evidence)
  ;(raw.requestedCapabilityClaims as unknown as Array<{ capabilityId: string }>)[0] = { capabilityId: "skills/changed" }
  ;(raw.packageVersionEvidence as { sha256: string, byteLength: number }).byteLength = 1
  ;(raw.packageEvidence as unknown as Record<string, unknown>).name = "changed"
  const descriptor = adapter()
  registry.register(createExternalCapabilityBinding(bindingInput(descriptor, packageRecord.externalMetadataSha256)))
  assert.equal(JSON.stringify(evidence), before)
  assert.equal(evidence.bindingState, "UNBOUND")
  assertDeepFrozen(evidence)
  assert.throws(() => {
    ;(evidence.requestedCapabilityClaims as unknown as Array<{ capabilityId: string }>)[0].capabilityId = "skills/changed"
  })
})

test("K4-R5 schema and shared export are present while production remains pure and data-only", () => {
  const schema = JSON.parse(source("../../../schema/k4-r5-agent-skill-governance-claim-evidence.schema.json")) as Record<string, unknown>
  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema")
  assert.equal(schema.$id, "https://kodac.dev/schema/k4-r5-agent-skill-governance-claim-evidence.schema.json")
  assert.equal(Array.isArray(schema.oneOf), true)
  const index = source("../src/index.ts")
  assert.equal(
    index.split(/\r?\n/).filter((line) => line === 'export * from "./compatibility/agent-skill-governance-claim-evidence.ts"').length,
    1,
  )
  const production = source("../src/compatibility/agent-skill-governance-claim-evidence.ts")
  assert.deepEqual(
    [...production.matchAll(/\bfrom\s+["']([^"']+)["']/g)].map((match) => match[1]),
    ["node:crypto", "node:util", "./agent-skill-package-evidence.ts", "./contracts.ts"],
  )
  assert.equal(/\bimport\s*\(/.test(production), false)
  assert.equal(/\b(?:readFile|writeFile|fetch|process|Date|Math\.random|setTimeout|setInterval|eval|Function|Worker|register|dispose)\b/.test(production), false)
  assert.equal(/\b(?:ExecutionGateway|TrustKernel|receipt|policy|approve|activate|install|route|execute|benchmark)\b/i.test(production), false)
})
