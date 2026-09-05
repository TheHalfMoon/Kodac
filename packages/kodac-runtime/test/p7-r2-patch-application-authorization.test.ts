import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import test from "node:test"

import { ReviewerIntelligenceRuntime } from "../src/reviewer-intelligence/runtime.ts"
import {
  buildP7ImmutablePatchProposal,
  type P7ImmutablePatchProposal,
  type P7ImmutablePatchProposalInput,
} from "../src/remediation/p7-immutable-patch-proposal.ts"
import {
  P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS,
  P7_R2_PATCH_APPLICATION_AUTHORIZATION_VERSION,
  P7_R2_PATCH_APPLICATION_STATE,
  P7_R2_RISK_DISPOSITION,
  buildP7PatchApplicationAuthorization,
  p7PatchApplicationAuthorizationIdentity,
  validateP7PatchApplicationAuthorization,
  type P7PatchApplicationAuthorization,
  type P7PatchApplicationAuthorizationBuildInput,
} from "../src/remediation/p7-patch-application-authorization.ts"

type MutableRecord = Record<string, any>
type UnknownRecord = Record<string, any>

const BASE = "a".repeat(40)
const HEAD = "b".repeat(40)
const BLOB = "1".repeat(40)
const SHA_A = "1".repeat(64)
const SHA_B = "2".repeat(64)
const SHA_C = "3".repeat(64)

function claim(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    claimKey: "p7-r2-source-finding",
    review: {
      reviewRunId: "review-run-p7-r2",
      reviewerId: "provider:test",
      reviewerVersion: "v1",
      policyIdentity: "policy:p7-r2-test",
      canonicalBase: BASE,
      reviewedHead: HEAD,
    },
    path: "src/security/example.ts",
    range: { startLine: 10, endLine: 12 },
    summary: "A confirmed finding eligible for a bounded patch proposal.",
    contractClaim: "The candidate violates one bounded invariant.",
    category: "security-boundary",
    severity: "high",
    confidenceBps: 9000,
    evidenceRefs: ["evidence:finding"],
    ...overrides,
  }
}

function sourceProposal(overrides: Partial<P7ImmutablePatchProposalInput> = {}): P7ImmutablePatchProposal {
  const runtime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-r2-test-adjudicator" })
  const finding = runtime.createFinding(claim(), HEAD)
  const { adjudication } = runtime.applyAdjudication(
    finding,
    { action: "CONFIRM", evidenceRefs: ["evidence:confirmed"] },
    HEAD,
  )
  return buildP7ImmutablePatchProposal({
    repositoryIdentity: "github.com/TheHalfMoon/Kodac",
    canonicalBase: BASE,
    targetHead: HEAD,
    sourceFinding: finding,
    sourceAdjudication: adjudication,
    proposerIdentity: "kodac:p7-r2-test-proposer",
    patchArtifactDigest: SHA_A,
    changes: [
      { path: "src/a.ts", operation: "ADD", beforeBlobIdentity: null, afterContentDigest: SHA_B },
      { path: "src/b.ts", operation: "MODIFY", beforeBlobIdentity: BLOB, afterContentDigest: SHA_C },
    ],
    ...overrides,
  })
}

function fixtureInput(source = sourceProposal()): P7PatchApplicationAuthorizationBuildInput {
  return {
    sourceProposal: source,
    declaration: {
      authorizerIdentity: "kodac:bounded-remediation-authorizer",
      rationale: "The exact proposed write scope has been reviewed and its bounded risk is accepted for a future application attempt.",
      evidenceRefs: ["evidence:authorization", "evidence:risk-review"],
    },
  }
}

function mutableInput(): MutableRecord {
  return structuredClone(fixtureInput()) as unknown as MutableRecord
}

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
}

function expectedIdentity(value: P7PatchApplicationAuthorization): string {
  return sha256(JSON.stringify({
    version: value.version,
    state: value.state,
    proposalIdentity: value.proposalIdentity,
    proposalVersion: value.proposalVersion,
    repositoryIdentity: value.repositoryIdentity,
    canonicalBase: value.canonicalBase,
    targetHead: value.targetHead,
    patchArtifactDigest: value.patchArtifactDigest,
    authorizerIdentity: value.authorizerIdentity,
    riskDisposition: value.riskDisposition,
    rationale: value.rationale,
    evidenceRefs: value.evidenceRefs,
    writeAllowlist: value.writeAllowlist,
  }))
}

const schema = JSON.parse(
  readFileSync(new URL("../../../schema/p7-patch-application-authorization.schema.json", import.meta.url), "utf8"),
) as UnknownRecord
const sourceText = readFileSync(
  new URL("../src/remediation/p7-patch-application-authorization.ts", import.meta.url),
  "utf8",
)

test("P7-R2 builds and validates one deterministic AUTHORIZED_TO_APPLY record", () => {
  const source = sourceProposal()
  const input = fixtureInput(source)
  const built = buildP7PatchApplicationAuthorization(input)

  assert.equal(built.version, P7_R2_PATCH_APPLICATION_AUTHORIZATION_VERSION)
  assert.equal(built.state, P7_R2_PATCH_APPLICATION_STATE)
  assert.equal(built.riskDisposition, P7_R2_RISK_DISPOSITION)
  assert.equal(built.authorizationIdentity, expectedIdentity(built))
  assert.equal(p7PatchApplicationAuthorizationIdentity(input), built.authorizationIdentity)
  assert.deepEqual(validateP7PatchApplicationAuthorization(built, source), built)
})

test("P7-R2 identity is independent of caller object-key insertion order", () => {
  const input = fixtureInput()
  const reordered = {
    declaration: {
      evidenceRefs: input.declaration.evidenceRefs,
      rationale: input.declaration.rationale,
      authorizerIdentity: input.declaration.authorizerIdentity,
    },
    sourceProposal: input.sourceProposal,
  } as P7PatchApplicationAuthorizationBuildInput

  assert.equal(
    buildP7PatchApplicationAuthorization(reordered).authorizationIdentity,
    buildP7PatchApplicationAuthorization(input).authorizationIdentity,
  )
})

test("P7-R2 identity binds source proposal and authorization decision fields", () => {
  const baseline = buildP7PatchApplicationAuthorization(fixtureInput())
  const alternateSource = sourceProposal({ proposerIdentity: "kodac:alternate-proposer" })
  assert.notEqual(
    buildP7PatchApplicationAuthorization(fixtureInput(alternateSource)).authorizationIdentity,
    baseline.authorizationIdentity,
  )

  for (const mutate of [
    (input: MutableRecord) => { input.declaration.authorizerIdentity = "kodac:other-authorizer" },
    (input: MutableRecord) => { input.declaration.rationale = "A different bounded risk rationale." },
    (input: MutableRecord) => { input.declaration.evidenceRefs = ["evidence:authorization", "evidence:other"] },
  ]) {
    const input = mutableInput()
    mutate(input)
    assert.notEqual(
      buildP7PatchApplicationAuthorization(input as P7PatchApplicationAuthorizationBuildInput).authorizationIdentity,
      baseline.authorizationIdentity,
    )
  }
})

test("P7-R2 derives exact write allowlist from source proposal with no caller write-scope input", () => {
  const source = sourceProposal()
  const built = buildP7PatchApplicationAuthorization(fixtureInput(source))
  assert.deepEqual(built.writeAllowlist, source.changes.map((change) => change.path))

  const injected = mutableInput()
  injected.writeAllowlist = ["src/evil.ts"]
  assert.throws(
    () => buildP7PatchApplicationAuthorization(injected as P7PatchApplicationAuthorizationBuildInput),
    /unknown field: writeAllowlist/,
  )
})

test("P7-R2 validator rejects write-allowlist expansion, reduction, and reordering", () => {
  const source = sourceProposal()
  const built = buildP7PatchApplicationAuthorization(fixtureInput(source))

  for (const writeAllowlist of [
    [...built.writeAllowlist, "src/evil.ts"],
    [built.writeAllowlist[0]],
    [...built.writeAllowlist].reverse(),
  ]) {
    const tampered = structuredClone(built) as MutableRecord
    tampered.writeAllowlist = writeAllowlist
    assert.throws(
      () => validateP7PatchApplicationAuthorization(tampered, source),
      /writeAllowlist/,
    )
  }
})

test("P7-R2 reuses exact P7-R1 source validation and rejects source tampering or mismatch", () => {
  const source = sourceProposal()
  const built = buildP7PatchApplicationAuthorization(fixtureInput(source))

  const tamperedSource = structuredClone(source) as MutableRecord
  tamperedSource.patchArtifactDigest = SHA_B
  assert.throws(
    () => buildP7PatchApplicationAuthorization(fixtureInput(tamperedSource as P7ImmutablePatchProposal)),
    /proposalIdentity/,
  )

  const otherSource = sourceProposal({ proposerIdentity: "kodac:mismatched-proposer" })
  assert.throws(
    () => validateP7PatchApplicationAuthorization(built, otherSource),
    /proposalIdentity|source proposal/,
  )
})

test("P7-R2 evidence references are non-empty, unique, bounded, and canonically ordered", () => {
  for (const refs of [
    [],
    ["evidence:b", "evidence:a"],
    ["evidence:a", "evidence:a"],
  ]) {
    const input = mutableInput()
    input.declaration.evidenceRefs = refs
    assert.throws(
      () => buildP7PatchApplicationAuthorization(input as P7PatchApplicationAuthorizationBuildInput),
      /evidenceRefs|reference|canonical|duplicate/,
    )
  }

  const maxRefs = Array.from(
    { length: P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxEvidenceRefs },
    (_, index) => `evidence:${String(index).padStart(2, "0")}`,
  )
  const boundary = mutableInput()
  boundary.declaration.evidenceRefs = maxRefs
  assert.doesNotThrow(() => buildP7PatchApplicationAuthorization(boundary as P7PatchApplicationAuthorizationBuildInput))

  const overflow = mutableInput()
  overflow.declaration.evidenceRefs = [...maxRefs, "evidence:overflow"]
  assert.throws(
    () => buildP7PatchApplicationAuthorization(overflow as P7PatchApplicationAuthorizationBuildInput),
    /evidenceRefs/,
  )
})

test("P7-R2 enforces inert bounded authorizer and rationale text by Unicode code point", () => {
  const authorizerBoundary = mutableInput()
  authorizerBoundary.declaration.authorizerIdentity = "😀".repeat(
    P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxAuthorizerIdentityCodePoints,
  )
  assert.doesNotThrow(() => buildP7PatchApplicationAuthorization(authorizerBoundary as P7PatchApplicationAuthorizationBuildInput))

  const authorizerOverflow = mutableInput()
  authorizerOverflow.declaration.authorizerIdentity = "😀".repeat(
    P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxAuthorizerIdentityCodePoints + 1,
  )
  assert.throws(
    () => buildP7PatchApplicationAuthorization(authorizerOverflow as P7PatchApplicationAuthorizationBuildInput),
    /authorizerIdentity/,
  )

  const rationaleOverflow = mutableInput()
  rationaleOverflow.declaration.rationale = "x".repeat(
    P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxRationaleCodePoints + 1,
  )
  assert.throws(
    () => buildP7PatchApplicationAuthorization(rationaleOverflow as P7PatchApplicationAuthorizationBuildInput),
    /rationale/,
  )

  const control = mutableInput()
  control.declaration.rationale = "accepted\nwith hidden control"
  assert.throws(
    () => buildP7PatchApplicationAuthorization(control as P7PatchApplicationAuthorizationBuildInput),
    /rationale/,
  )
})

test("P7-R2 rejects unknown fields and injected lifecycle authority", () => {
  const unknownBuild = mutableInput()
  unknownBuild.executeNow = true
  assert.throws(
    () => buildP7PatchApplicationAuthorization(unknownBuild as P7PatchApplicationAuthorizationBuildInput),
    /unknown field: executeNow/,
  )

  const unknownDeclaration = mutableInput()
  unknownDeclaration.declaration.k2Authority = "allow"
  assert.throws(
    () => buildP7PatchApplicationAuthorization(unknownDeclaration as P7PatchApplicationAuthorizationBuildInput),
    /unknown field: k2Authority/,
  )

  const source = sourceProposal()
  const built = buildP7PatchApplicationAuthorization(fixtureInput(source))
  for (const [field, value] of [
    ["state", "APPLIED"],
    ["riskDisposition", "PROVEN_SAFE"],
    ["proposalVersion", "p7-r9"],
  ]) {
    const tampered = structuredClone(built) as MutableRecord
    tampered[field] = value
    assert.throws(() => validateP7PatchApplicationAuthorization(tampered, source), new RegExp(field))
  }
})

test("P7-R2 returns detached deeply immutable output", () => {
  const input = mutableInput()
  const built = buildP7PatchApplicationAuthorization(input as P7PatchApplicationAuthorizationBuildInput)
  const snapshot = structuredClone(built)

  input.declaration.authorizerIdentity = "mutated"
  input.declaration.rationale = "mutated"
  input.declaration.evidenceRefs[0] = "mutated"
  input.sourceProposal.changes[0].path = "mutated.ts"

  assert.deepEqual(built, snapshot)
  assert.ok(Object.isFrozen(built))
  assert.ok(Object.isFrozen(built.evidenceRefs))
  assert.ok(Object.isFrozen(built.writeAllowlist))
})

test("P7-R2 fails closed on accessors, proxies, custom prototypes, aliases, and non-JSON data", () => {
  const accessor = mutableInput()
  Object.defineProperty(accessor.declaration, "authorizerIdentity", {
    enumerable: true,
    get() { return "getter-authorizer" },
  })
  assert.throws(
    () => buildP7PatchApplicationAuthorization(accessor as P7PatchApplicationAuthorizationBuildInput),
    /data property|JSON data|descriptor/,
  )

  const proxy = mutableInput()
  proxy.declaration = new Proxy(proxy.declaration, {})
  assert.throws(
    () => buildP7PatchApplicationAuthorization(proxy as P7PatchApplicationAuthorizationBuildInput),
    /Proxy/,
  )

  const customPrototype = mutableInput()
  Object.setPrototypeOf(customPrototype.declaration, { injected: true })
  assert.throws(
    () => buildP7PatchApplicationAuthorization(customPrototype as P7PatchApplicationAuthorizationBuildInput),
    /plain object/,
  )

  const aliased = mutableInput()
  aliased.declaration.evidenceRefs = aliased.sourceProposal.sourceFinding.evidenceRefs
  assert.throws(
    () => buildP7PatchApplicationAuthorization(aliased as P7PatchApplicationAuthorizationBuildInput),
    /non-aliased/,
  )

  const nonJson = mutableInput()
  nonJson.declaration.rationale = 1n
  assert.throws(
    () => buildP7PatchApplicationAuthorization(nonJson as P7PatchApplicationAuthorizationBuildInput),
    /JSON data/,
  )
})

test("P7-R2 validator rejects output tampering across every source-bound scalar", () => {
  const source = sourceProposal()
  const built = buildP7PatchApplicationAuthorization(fixtureInput(source))
  const mutations: Array<[string, unknown]> = [
    ["proposalIdentity", "f".repeat(64)],
    ["repositoryIdentity", "github.com/TheHalfMoon/Other"],
    ["canonicalBase", "c".repeat(40)],
    ["targetHead", "d".repeat(40)],
    ["patchArtifactDigest", "e".repeat(64)],
  ]
  for (const [field, value] of mutations) {
    const tampered = structuredClone(built) as MutableRecord
    tampered[field] = value
    assert.throws(
      () => validateP7PatchApplicationAuthorization(tampered, source),
      new RegExp(field),
    )
  }
})

test("P7-R2 schema constants and bounds align with runtime contract", () => {
  assert.equal(schema.properties.version.const, P7_R2_PATCH_APPLICATION_AUTHORIZATION_VERSION)
  assert.equal(schema.properties.state.const, P7_R2_PATCH_APPLICATION_STATE)
  assert.equal(schema.properties.riskDisposition.const, P7_R2_RISK_DISPOSITION)
  assert.equal(schema.properties.evidenceRefs.minItems, 1)
  assert.equal(schema.properties.evidenceRefs.maxItems, P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxEvidenceRefs)
  assert.equal(schema.properties.writeAllowlist.maxItems, 64)
  assert.equal(schema.$defs.identityText.allOf[1].maxLength, P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxAuthorizerIdentityCodePoints)
  assert.equal(schema.$defs.rationaleText.allOf[1].maxLength, P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxRationaleCodePoints)
  assert.equal(schema.$defs.evidenceRef.allOf[1].maxLength, P7_R2_PATCH_APPLICATION_AUTHORIZATION_LIMITS.maxEvidenceRefCodePoints)
})

test("P7-R2 production source contains no execution or side-effect surface", () => {
  for (const forbidden of [
    "node:fs",
    "node:child_process",
    "ExecutionGateway",
    ".applyPatch(",
    "spawn(",
    "exec(",
    "fetch(",
    "writeFile",
    "appendFile",
  ]) {
    assert.equal(sourceText.includes(forbidden), false, forbidden)
  }
})
