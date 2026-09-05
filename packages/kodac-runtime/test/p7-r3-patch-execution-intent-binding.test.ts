import assert from "node:assert/strict"
import { Buffer } from "node:buffer"
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
  buildP7PatchApplicationAuthorization,
  type P7PatchApplicationAuthorization,
} from "../src/remediation/p7-patch-application-authorization.ts"
import {
  P7_R3_PATCH_EXECUTION_CAPABILITY,
  P7_R3_PATCH_EXECUTION_INTENT_BINDING_LIMITS,
  P7_R3_PATCH_EXECUTION_INTENT_BINDING_VERSION,
  buildP7PatchExecutionIntentBinding,
  p7PatchExecutionIntentBindingIdentity,
  validateP7PatchExecutionIntentBinding,
  type P7PatchExecutionIntentBinding,
  type P7PatchExecutionIntentBindingBuildInput,
} from "../src/remediation/p7-patch-execution-intent-binding.ts"

type MutableRecord = Record<string, any>
type UnknownRecord = Record<string, any>

const BASE = "a".repeat(40)
const HEAD = "b".repeat(40)
const BLOB_A = "1".repeat(40)
const BLOB_B = "2".repeat(40)
const SHA_A = "1".repeat(64)
const SHA_B = "2".repeat(64)

const PATCH = [
  "*** Begin Patch",
  "*** Add File: src/a.ts",
  "+export const a = 1",
  "*** Update File: src/b.ts",
  "@@",
  "-old",
  "+new",
  "*** Delete File: src/c.ts",
  "*** End Patch",
].join("\n")

const CHANGES: P7ImmutablePatchProposalInput["changes"] = [
  { path: "src/a.ts", operation: "ADD", beforeBlobIdentity: null, afterContentDigest: SHA_A },
  { path: "src/b.ts", operation: "MODIFY", beforeBlobIdentity: BLOB_A, afterContentDigest: SHA_B },
  { path: "src/c.ts", operation: "DELETE", beforeBlobIdentity: BLOB_B, afterContentDigest: null },
]

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
}

function claim(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    claimKey: "p7-r3-source-finding",
    review: {
      reviewRunId: "review-run-p7-r3",
      reviewerId: "provider:test",
      reviewerVersion: "v1",
      policyIdentity: "policy:p7-r3-test",
      canonicalBase: BASE,
      reviewedHead: HEAD,
    },
    path: "src/security/example.ts",
    range: { startLine: 10, endLine: 12 },
    summary: "A confirmed finding eligible for bounded remediation.",
    contractClaim: "The candidate violates one bounded invariant.",
    category: "security-boundary",
    severity: "high",
    confidenceBps: 9000,
    evidenceRefs: ["evidence:finding"],
    ...overrides,
  }
}

function sourceProposalFor(
  patch: string,
  changes: P7ImmutablePatchProposalInput["changes"] = CHANGES,
  overrides: Partial<P7ImmutablePatchProposalInput> = {},
): P7ImmutablePatchProposal {
  const runtime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-r3-test-adjudicator" })
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
    proposerIdentity: "kodac:p7-r3-test-proposer",
    patchArtifactDigest: sha256(patch),
    changes,
    ...overrides,
  })
}

function sourceAuthorization(source: P7ImmutablePatchProposal): P7PatchApplicationAuthorization {
  return buildP7PatchApplicationAuthorization({
    sourceProposal: source,
    declaration: {
      authorizerIdentity: "kodac:bounded-remediation-authorizer",
      rationale: "The exact proposal is authorized for one future bounded application attempt.",
      evidenceRefs: ["evidence:authorization", "evidence:risk-review"],
    },
  })
}

function fixtureInput(patch = PATCH): P7PatchExecutionIntentBindingBuildInput {
  const sourceProposal = sourceProposalFor(patch)
  return {
    sourceProposal,
    sourceAuthorization: sourceAuthorization(sourceProposal),
    patchText: patch,
  }
}

function expectedIdentity(value: P7PatchExecutionIntentBinding): string {
  return sha256(JSON.stringify({
    version: value.version,
    authorizationIdentity: value.authorizationIdentity,
    authorizationVersion: value.authorizationVersion,
    proposalIdentity: value.proposalIdentity,
    proposalVersion: value.proposalVersion,
    repositoryIdentity: value.repositoryIdentity,
    canonicalBase: value.canonicalBase,
    targetHead: value.targetHead,
    patchArtifactDigest: value.patchArtifactDigest,
    capability: value.capability,
    inputDigest: value.inputDigest,
    paths: value.paths,
    operations: value.operations,
    patchByteLength: value.patchByteLength,
  }))
}

function addPatchWithBytes(targetBytes: number): string {
  const prefix = "*** Begin Patch\n*** Add File: src/large.txt\n+"
  const suffix = "\n*** End Patch"
  const fixed = Buffer.byteLength(prefix + suffix, "utf8")
  if (targetBytes <= fixed) throw new Error("target byte length is too small")
  return `${prefix}${"x".repeat(targetBytes - fixed)}${suffix}`
}

const schema = JSON.parse(
  readFileSync(new URL("../../../schema/p7-patch-execution-intent-binding.schema.json", import.meta.url), "utf8"),
) as UnknownRecord
const sourceText = readFileSync(
  new URL("../src/remediation/p7-patch-execution-intent-binding.ts", import.meta.url),
  "utf8",
)

test("P7-R3 builds and validates one deterministic pre-execution intent binding", () => {
  const input = fixtureInput()
  const built = buildP7PatchExecutionIntentBinding(input)

  assert.equal(built.version, P7_R3_PATCH_EXECUTION_INTENT_BINDING_VERSION)
  assert.equal(built.capability, P7_R3_PATCH_EXECUTION_CAPABILITY)
  assert.equal(built.inputDigest, sha256(PATCH))
  assert.equal(built.inputDigest, built.patchArtifactDigest)
  assert.equal(built.patchByteLength, Buffer.byteLength(PATCH, "utf8"))
  assert.deepEqual(built.paths, ["src/a.ts", "src/b.ts", "src/c.ts"])
  assert.deepEqual(built.operations, [
    { path: "src/a.ts", operation: "ADD" },
    { path: "src/b.ts", operation: "MODIFY" },
    { path: "src/c.ts", operation: "DELETE" },
  ])
  assert.equal(built.bindingIdentity, expectedIdentity(built))
  assert.equal(p7PatchExecutionIntentBindingIdentity(input), built.bindingIdentity)
  assert.deepEqual(
    validateP7PatchExecutionIntentBinding(
      built,
      input.sourceProposal,
      input.sourceAuthorization,
      input.patchText,
    ),
    built,
  )
})

test("P7-R3 identity is independent of caller build-input key insertion order", () => {
  const input = fixtureInput()
  const reordered = {
    patchText: input.patchText,
    sourceAuthorization: input.sourceAuthorization,
    sourceProposal: input.sourceProposal,
  } as P7PatchExecutionIntentBindingBuildInput

  assert.equal(
    buildP7PatchExecutionIntentBinding(reordered).bindingIdentity,
    buildP7PatchExecutionIntentBinding(input).bindingIdentity,
  )
})

test("P7-R3 binds exact R1/R2 lineage and rejects predecessor tampering or mismatch", () => {
  const input = fixtureInput()

  const tamperedProposal = structuredClone(input.sourceProposal) as MutableRecord
  tamperedProposal.patchArtifactDigest = "f".repeat(64)
  assert.throws(
    () => buildP7PatchExecutionIntentBinding({ ...input, sourceProposal: tamperedProposal as P7ImmutablePatchProposal }),
    /proposalIdentity/,
  )

  const tamperedAuthorization = structuredClone(input.sourceAuthorization) as MutableRecord
  tamperedAuthorization.authorizationIdentity = "f".repeat(64)
  assert.throws(
    () => buildP7PatchExecutionIntentBinding({
      ...input,
      sourceAuthorization: tamperedAuthorization as P7PatchApplicationAuthorization,
    }),
    /authorizationIdentity/,
  )

  const otherProposal = sourceProposalFor(PATCH, CHANGES, { proposerIdentity: "kodac:other-proposer" })
  const otherAuthorization = sourceAuthorization(otherProposal)
  assert.throws(
    () => buildP7PatchExecutionIntentBinding({
      sourceProposal: input.sourceProposal,
      sourceAuthorization: otherAuthorization,
      patchText: PATCH,
    }),
    /proposalIdentity|source proposal/,
  )
})

test("P7-R3 requires exact patch digest equality before parsing", () => {
  const input = fixtureInput()
  assert.throws(
    () => buildP7PatchExecutionIntentBinding({ ...input, patchText: `${PATCH}\n` }),
    /digest/,
  )
})

test("P7-R3 accepts the exact UTF-8 byte limit and rejects limit plus one", () => {
  const max = P7_R3_PATCH_EXECUTION_INTENT_BINDING_LIMITS.maxPatchBytes
  const atLimit = addPatchWithBytes(max)
  const changes: P7ImmutablePatchProposalInput["changes"] = [
    { path: "src/large.txt", operation: "ADD", beforeBlobIdentity: null, afterContentDigest: SHA_A },
  ]
  const proposal = sourceProposalFor(atLimit, changes)
  const authorization = sourceAuthorization(proposal)
  assert.equal(
    buildP7PatchExecutionIntentBinding({ sourceProposal: proposal, sourceAuthorization: authorization, patchText: atLimit }).patchByteLength,
    max,
  )

  const overflow = addPatchWithBytes(max + 1)
  const overflowProposal = sourceProposalFor(overflow, changes)
  const overflowAuthorization = sourceAuthorization(overflowProposal)
  assert.throws(
    () => buildP7PatchExecutionIntentBinding({
      sourceProposal: overflowProposal,
      sourceAuthorization: overflowAuthorization,
      patchText: overflow,
    }),
    /UTF-8 bytes/,
  )
})

test("P7-R3 rejects move semantics before any execution surface exists", () => {
  const patch = [
    "*** Begin Patch",
    "*** Update File: src/a.ts",
    "*** Move to: src/b.ts",
    "@@",
    "-old",
    "+new",
    "*** End Patch",
  ].join("\n")
  const changes: P7ImmutablePatchProposalInput["changes"] = [
    { path: "src/a.ts", operation: "MODIFY", beforeBlobIdentity: BLOB_A, afterContentDigest: SHA_A },
  ]
  const proposal = sourceProposalFor(patch, changes)
  const authorization = sourceAuthorization(proposal)
  assert.throws(
    () => buildP7PatchExecutionIntentBinding({ sourceProposal: proposal, sourceAuthorization: authorization, patchText: patch }),
    /move semantics/,
  )
})

test("P7-R3 rejects parsed operation mismatch against the P7-R1 declaration", () => {
  const patch = [
    "*** Begin Patch",
    "*** Delete File: src/a.ts",
    "*** End Patch",
  ].join("\n")
  const changes: P7ImmutablePatchProposalInput["changes"] = [
    { path: "src/a.ts", operation: "MODIFY", beforeBlobIdentity: BLOB_A, afterContentDigest: SHA_A },
  ]
  const proposal = sourceProposalFor(patch, changes)
  const authorization = sourceAuthorization(proposal)
  assert.throws(
    () => buildP7PatchExecutionIntentBinding({ sourceProposal: proposal, sourceAuthorization: authorization, patchText: patch }),
    /path and operation/,
  )
})

test("P7-R3 rejects reordered, missing, and duplicate parsed paths", () => {
  const cases: Array<{ patch: string; changes: P7ImmutablePatchProposalInput["changes"] }> = [
    {
      patch: [
        "*** Begin Patch",
        "*** Add File: src/b.ts",
        "+b",
        "*** Add File: src/a.ts",
        "+a",
        "*** End Patch",
      ].join("\n"),
      changes: [
        { path: "src/a.ts", operation: "ADD", beforeBlobIdentity: null, afterContentDigest: SHA_A },
        { path: "src/b.ts", operation: "ADD", beforeBlobIdentity: null, afterContentDigest: SHA_B },
      ],
    },
    {
      patch: ["*** Begin Patch", "*** Add File: src/a.ts", "+a", "*** End Patch"].join("\n"),
      changes: [
        { path: "src/a.ts", operation: "ADD", beforeBlobIdentity: null, afterContentDigest: SHA_A },
        { path: "src/b.ts", operation: "ADD", beforeBlobIdentity: null, afterContentDigest: SHA_B },
      ],
    },
    {
      patch: [
        "*** Begin Patch",
        "*** Add File: src/a.ts",
        "+a",
        "*** Add File: src/a.ts",
        "+again",
        "*** End Patch",
      ].join("\n"),
      changes: [
        { path: "src/a.ts", operation: "ADD", beforeBlobIdentity: null, afterContentDigest: SHA_A },
      ],
    },
  ]

  for (const entry of cases) {
    const proposal = sourceProposalFor(entry.patch, entry.changes)
    const authorization = sourceAuthorization(proposal)
    assert.throws(
      () => buildP7PatchExecutionIntentBinding({
        sourceProposal: proposal,
        sourceAuthorization: authorization,
        patchText: entry.patch,
      }),
      /operation count|path and operation/,
    )
  }
})

test("P7-R3 rejects malformed patch bytes and invalid Unicode scalar text", () => {
  const malformed = "not a patch"
  const malformedProposal = sourceProposalFor(malformed, [
    { path: "src/a.ts", operation: "ADD", beforeBlobIdentity: null, afterContentDigest: SHA_A },
  ])
  const malformedAuthorization = sourceAuthorization(malformedProposal)
  assert.throws(
    () => buildP7PatchExecutionIntentBinding({
      sourceProposal: malformedProposal,
      sourceAuthorization: malformedAuthorization,
      patchText: malformed,
    }),
    /valid canonical patch/,
  )

  const invalidUnicode = `${PATCH}\ud800`
  const invalidProposal = sourceProposalFor(invalidUnicode)
  const invalidAuthorization = sourceAuthorization(invalidProposal)
  assert.throws(
    () => buildP7PatchExecutionIntentBinding({
      sourceProposal: invalidProposal,
      sourceAuthorization: invalidAuthorization,
      patchText: invalidUnicode,
    }),
    /Unicode scalar/,
  )
})

test("P7-R3 build input rejects caller-supplied authority and execution fields", () => {
  const input = structuredClone(fixtureInput()) as MutableRecord
  input.capability = "repo.apply_patch"
  assert.throws(
    () => buildP7PatchExecutionIntentBinding(input as P7PatchExecutionIntentBindingBuildInput),
    /unknown field: capability/,
  )

  const execute = structuredClone(fixtureInput()) as MutableRecord
  execute.executeNow = true
  assert.throws(
    () => buildP7PatchExecutionIntentBinding(execute as P7PatchExecutionIntentBindingBuildInput),
    /unknown field: executeNow/,
  )
})

test("P7-R3 validator rejects scalar, path, operation, byte-length, and identity tampering", () => {
  const input = fixtureInput()
  const built = buildP7PatchExecutionIntentBinding(input)

  for (const [field, value] of [
    ["authorizationIdentity", "f".repeat(64)],
    ["proposalIdentity", "e".repeat(64)],
    ["repositoryIdentity", "github.com/TheHalfMoon/Other"],
    ["canonicalBase", "c".repeat(40)],
    ["targetHead", "d".repeat(40)],
    ["patchArtifactDigest", "c".repeat(64)],
    ["capability", "repo.write"],
    ["inputDigest", "d".repeat(64)],
    ["patchByteLength", built.patchByteLength + 1],
  ] as Array<[string, unknown]>) {
    const tampered = structuredClone(built) as MutableRecord
    tampered[field] = value
    assert.throws(
      () => validateP7PatchExecutionIntentBinding(
        tampered,
        input.sourceProposal,
        input.sourceAuthorization,
        input.patchText,
      ),
      new RegExp(field),
    )
  }

  const paths = structuredClone(built) as MutableRecord
  paths.paths = [...built.paths].reverse()
  assert.throws(
    () => validateP7PatchExecutionIntentBinding(paths, input.sourceProposal, input.sourceAuthorization, PATCH),
    /paths/,
  )

  const operations = structuredClone(built) as MutableRecord
  operations.operations[0].operation = "DELETE"
  assert.throws(
    () => validateP7PatchExecutionIntentBinding(operations, input.sourceProposal, input.sourceAuthorization, PATCH),
    /operations/,
  )

  const identity = structuredClone(built) as MutableRecord
  identity.bindingIdentity = "0".repeat(64)
  assert.throws(
    () => validateP7PatchExecutionIntentBinding(identity, input.sourceProposal, input.sourceAuthorization, PATCH),
    /bindingIdentity/,
  )
})

test("P7-R3 returns detached deeply immutable output", () => {
  const input = structuredClone(fixtureInput()) as MutableRecord
  const built = buildP7PatchExecutionIntentBinding(input as P7PatchExecutionIntentBindingBuildInput)
  const snapshot = structuredClone(built)

  input.patchText = "mutated"
  input.sourceAuthorization.writeAllowlist[0] = "mutated.ts"
  input.sourceProposal.changes[0].path = "mutated.ts"

  assert.deepEqual(built, snapshot)
  assert.ok(Object.isFrozen(built))
  assert.ok(Object.isFrozen(built.paths))
  assert.ok(Object.isFrozen(built.operations))
  for (const operation of built.operations) assert.ok(Object.isFrozen(operation))
})

test("P7-R3 fails closed on accessors, proxies, custom prototypes, aliases, and non-JSON predecessors", () => {
  const accessor = structuredClone(fixtureInput()) as MutableRecord
  Object.defineProperty(accessor, "patchText", {
    enumerable: true,
    get() { return PATCH },
  })
  assert.throws(
    () => buildP7PatchExecutionIntentBinding(accessor as P7PatchExecutionIntentBindingBuildInput),
    /data property/,
  )

  const proxy = new Proxy(structuredClone(fixtureInput()) as MutableRecord, {})
  assert.throws(
    () => buildP7PatchExecutionIntentBinding(proxy as P7PatchExecutionIntentBindingBuildInput),
    /non-proxy plain object/,
  )

  const customPrototype = structuredClone(fixtureInput()) as MutableRecord
  Object.setPrototypeOf(customPrototype, { injected: true })
  assert.throws(
    () => buildP7PatchExecutionIntentBinding(customPrototype as P7PatchExecutionIntentBindingBuildInput),
    /plain object/,
  )

  const aliased = structuredClone(fixtureInput()) as MutableRecord
  aliased.sourceProposal.sourceAdjudication.evidenceRefs = aliased.sourceProposal.sourceFinding.evidenceRefs
  assert.throws(
    () => buildP7PatchExecutionIntentBinding(aliased as P7PatchExecutionIntentBindingBuildInput),
    /non-aliased/,
  )

  const nonJson = structuredClone(fixtureInput()) as MutableRecord
  nonJson.sourceAuthorization.rationale = 1n
  assert.throws(
    () => buildP7PatchExecutionIntentBinding(nonJson as P7PatchExecutionIntentBindingBuildInput),
    /JSON data/,
  )
})

test("P7-R3 validator rejects hostile binding containers", () => {
  const input = fixtureInput()
  const built = buildP7PatchExecutionIntentBinding(input)

  const proxy = new Proxy(structuredClone(built) as MutableRecord, {})
  assert.throws(
    () => validateP7PatchExecutionIntentBinding(proxy, input.sourceProposal, input.sourceAuthorization, PATCH),
    /non-proxy plain object/,
  )

  const accessor = structuredClone(built) as MutableRecord
  Object.defineProperty(accessor, "paths", {
    enumerable: true,
    get() { return built.paths },
  })
  assert.throws(
    () => validateP7PatchExecutionIntentBinding(accessor, input.sourceProposal, input.sourceAuthorization, PATCH),
    /data property/,
  )

  const sparse = structuredClone(built) as MutableRecord
  sparse.paths = new Array(3)
  sparse.paths[0] = "src/a.ts"
  sparse.paths[2] = "src/c.ts"
  assert.throws(
    () => validateP7PatchExecutionIntentBinding(sparse, input.sourceProposal, input.sourceAuthorization, PATCH),
    /sparse|paths/,
  )
})

test("P7-R3 schema agrees with runtime boundary and source has no side-effect surface", () => {
  assert.equal(schema.additionalProperties, false)
  assert.equal(schema.properties.version.const, P7_R3_PATCH_EXECUTION_INTENT_BINDING_VERSION)
  assert.equal(schema.properties.capability.const, P7_R3_PATCH_EXECUTION_CAPABILITY)
  assert.equal(schema.properties.patchByteLength.maximum, P7_R3_PATCH_EXECUTION_INTENT_BINDING_LIMITS.maxPatchBytes)
  assert.equal(schema.properties.authorizationVersion.const, "p7-r2-patch-application-authorization-v1")
  assert.equal(schema.properties.proposalVersion.const, "p7-r1-immutable-patch-proposal-v1")
  for (const required of ["bindingIdentity", "authorizationIdentity", "paths", "operations", "patchByteLength"]) {
    assert.ok(schema.required.includes(required))
  }

  assert.match(sourceText, /parsePatch/)
  for (const forbidden of [
    "applyHunks",
    "ExecutionGateway",
    "createReceipt",
    "node:fs",
    "node:child_process",
    "node:net",
    "node:http",
    "node:https",
  ]) {
    assert.doesNotMatch(sourceText, new RegExp(forbidden))
  }
})
