import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import test from "node:test"

import { ReviewerIntelligenceRuntime } from "../src/reviewer-intelligence/runtime.ts"
import {
  P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS,
  P7_R1_IMMUTABLE_PATCH_PROPOSAL_VERSION,
  P7_R1_PATCH_OPERATIONS,
  P7_R1_PATCH_PROPOSAL_STATE,
  buildP7ImmutablePatchProposal,
  p7ImmutablePatchProposalIdentity,
  validateP7ImmutablePatchProposal,
  type P7ImmutablePatchProposal,
  type P7ImmutablePatchProposalInput,
} from "../src/remediation/p7-immutable-patch-proposal.ts"

type MutableRecord = Record<string, any>
type UnknownRecord = Record<string, any>

const BASE = "a".repeat(40)
const HEAD = "b".repeat(40)
const NEXT = "c".repeat(40)
const BLOB_A = "1".repeat(40)
const BLOB_B = "2".repeat(40)
const SHA_A = "1".repeat(64)
const SHA_B = "2".repeat(64)
const SHA_C = "3".repeat(64)
const SHA_D = "4".repeat(64)

function claim(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    claimKey: "p7-source-finding",
    review: {
      reviewRunId: "review-run-p7",
      reviewerId: "provider:test",
      reviewerVersion: "v1",
      policyIdentity: "policy:p7-test",
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

function confirmedSource(overrides: Record<string, unknown> = {}) {
  const runtime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-test-adjudicator" })
  const finding = runtime.createFinding(claim(overrides), HEAD)
  const result = runtime.applyAdjudication(
    finding,
    { action: "CONFIRM", evidenceRefs: ["evidence:confirmed"] },
    HEAD,
  )
  return { finding, adjudication: result.adjudication }
}

function fixtureInput(): P7ImmutablePatchProposalInput {
  const { finding, adjudication } = confirmedSource()
  return {
    repositoryIdentity: "github.com/TheHalfMoon/Kodac",
    canonicalBase: BASE,
    targetHead: HEAD,
    sourceFinding: finding,
    sourceAdjudication: adjudication,
    proposerIdentity: "kodac:bounded-remediation-proposer",
    patchArtifactDigest: SHA_A,
    changes: [
      {
        path: "src/a.ts",
        operation: "ADD",
        beforeBlobIdentity: null,
        afterContentDigest: SHA_B,
      },
      {
        path: "src/b.ts",
        operation: "MODIFY",
        beforeBlobIdentity: BLOB_A,
        afterContentDigest: SHA_C,
      },
      {
        path: "src/c.ts",
        operation: "DELETE",
        beforeBlobIdentity: BLOB_B,
        afterContentDigest: null,
      },
    ],
  }
}

function mutableInput(): MutableRecord {
  return structuredClone(fixtureInput()) as unknown as MutableRecord
}

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
}

function expectedIdentity(proposal: P7ImmutablePatchProposal): string {
  const preimage = {
    version: proposal.version,
    state: proposal.state,
    repositoryIdentity: proposal.repositoryIdentity,
    canonicalBase: proposal.canonicalBase,
    targetHead: proposal.targetHead,
    sourceFinding: proposal.sourceFinding,
    sourceAdjudication: proposal.sourceAdjudication,
    proposerIdentity: proposal.proposerIdentity,
    patchArtifactDigest: proposal.patchArtifactDigest,
    changes: proposal.changes,
  }
  return sha256(JSON.stringify(preimage))
}

const schema = JSON.parse(
  readFileSync(new URL("../../../schema/p7-immutable-patch-proposal.schema.json", import.meta.url), "utf8"),
) as UnknownRecord
const sourceText = readFileSync(
  new URL("../src/remediation/p7-immutable-patch-proposal.ts", import.meta.url),
  "utf8",
)

test("P7-R1 builds and validates one immutable content-addressed PROPOSED record", () => {
  const input = fixtureInput()
  const built = buildP7ImmutablePatchProposal(input)

  assert.equal(built.version, P7_R1_IMMUTABLE_PATCH_PROPOSAL_VERSION)
  assert.equal(built.state, P7_R1_PATCH_PROPOSAL_STATE)
  assert.equal(built.proposalIdentity, expectedIdentity(built))
  assert.equal(p7ImmutablePatchProposalIdentity(input), built.proposalIdentity)
  assert.deepEqual(validateP7ImmutablePatchProposal(built), built)
})

test("P7-R1 identity is independent of caller object-key insertion order", () => {
  const input = fixtureInput()
  const reordered = {
    changes: input.changes,
    patchArtifactDigest: input.patchArtifactDigest,
    proposerIdentity: input.proposerIdentity,
    sourceAdjudication: input.sourceAdjudication,
    sourceFinding: input.sourceFinding,
    targetHead: input.targetHead,
    canonicalBase: input.canonicalBase,
    repositoryIdentity: input.repositoryIdentity,
  } as P7ImmutablePatchProposalInput

  assert.equal(
    buildP7ImmutablePatchProposal(reordered).proposalIdentity,
    buildP7ImmutablePatchProposal(input).proposalIdentity,
  )
})

test("P7-R1 proposal identity binds every authority-relevant field", () => {
  const baseline = buildP7ImmutablePatchProposal(fixtureInput())
  const mutations: Array<(input: MutableRecord) => void> = [
    (input) => { input.repositoryIdentity = "github.com/TheHalfMoon/Other" },
    (input) => { input.proposerIdentity = "kodac:other-proposer" },
    (input) => { input.patchArtifactDigest = SHA_D },
    (input) => { input.changes[0].afterContentDigest = SHA_D },
    (input) => { input.changes[1].beforeBlobIdentity = BLOB_B },
  ]

  for (const mutate of mutations) {
    const input = mutableInput()
    mutate(input)
    assert.notEqual(
      buildP7ImmutablePatchProposal(input as P7ImmutablePatchProposalInput).proposalIdentity,
      baseline.proposalIdentity,
    )
  }
})

test("P7-R1 rejects non-canonical change ordering and duplicate paths", () => {
  const reversed = mutableInput()
  reversed.changes.reverse()
  assert.throws(
    () => buildP7ImmutablePatchProposal(reversed as P7ImmutablePatchProposalInput),
    /canonical ascending path order/,
  )

  const duplicate = mutableInput()
  duplicate.changes[1].path = duplicate.changes[0].path
  assert.throws(
    () => buildP7ImmutablePatchProposal(duplicate as P7ImmutablePatchProposalInput),
    /duplicate paths/,
  )
})

test("P7-R1 rejects unsafe, ambiguous, and non-POSIX repository paths", () => {
  const unsafePaths = [
    "/etc/passwd",
    "C:/Windows/system.ini",
    "C:relative.txt",
    "src\\file.ts",
    "src//file.ts",
    ".",
    "..",
    "./src.ts",
    "../src.ts",
    "src/./file.ts",
    "src/../file.ts",
    "src/file.ts/..",
    "src/\nfile.ts",
    "\ud800",
  ]

  for (const path of unsafePaths) {
    const input = mutableInput()
    input.changes = [{
      path,
      operation: "ADD",
      beforeBlobIdentity: null,
      afterContentDigest: SHA_B,
    }]
    assert.throws(
      () => buildP7ImmutablePatchProposal(input as P7ImmutablePatchProposalInput),
      /path|Unicode|repository-relative|POSIX/,
      path,
    )
  }

  const boundary = mutableInput()
  boundary.changes = [{
    path: `${"a".repeat(1023)}😀`,
    operation: "ADD",
    beforeBlobIdentity: null,
    afterContentDigest: SHA_B,
  }]
  assert.doesNotThrow(() => buildP7ImmutablePatchProposal(boundary as P7ImmutablePatchProposalInput))

  const overflow = mutableInput()
  overflow.changes = [{
    path: `${"a".repeat(1024)}😀`,
    operation: "ADD",
    beforeBlobIdentity: null,
    afterContentDigest: SHA_B,
  }]
  assert.throws(() => buildP7ImmutablePatchProposal(overflow as P7ImmutablePatchProposalInput), /path/)
})

test("P7-R1 enforces operation-specific before/after identity semantics", () => {
  const invalidChanges = [
    { path: "src/a.ts", operation: "ADD", beforeBlobIdentity: BLOB_A, afterContentDigest: SHA_B },
    { path: "src/a.ts", operation: "ADD", beforeBlobIdentity: null, afterContentDigest: null },
    { path: "src/a.ts", operation: "MODIFY", beforeBlobIdentity: null, afterContentDigest: SHA_B },
    { path: "src/a.ts", operation: "MODIFY", beforeBlobIdentity: BLOB_A, afterContentDigest: null },
    { path: "src/a.ts", operation: "DELETE", beforeBlobIdentity: null, afterContentDigest: null },
    { path: "src/a.ts", operation: "DELETE", beforeBlobIdentity: BLOB_A, afterContentDigest: SHA_B },
  ]

  for (const change of invalidChanges) {
    const input = mutableInput()
    input.changes = [change]
    assert.throws(() => buildP7ImmutablePatchProposal(input as P7ImmutablePatchProposalInput))
  }
})

test("P7-R1 rejects malformed Git and SHA-256 identities", () => {
  for (const [field, value] of [
    ["canonicalBase", "A".repeat(40)],
    ["targetHead", "b".repeat(39)],
    ["patchArtifactDigest", "F".repeat(64)],
  ]) {
    const input = mutableInput()
    input[field] = value
    assert.throws(() => buildP7ImmutablePatchProposal(input as P7ImmutablePatchProposalInput), new RegExp(field))
  }

  const badBlob = mutableInput()
  badBlob.changes = [{ path: "src/a.ts", operation: "MODIFY", beforeBlobIdentity: "f".repeat(39), afterContentDigest: SHA_B }]
  assert.throws(() => buildP7ImmutablePatchProposal(badBlob as P7ImmutablePatchProposalInput), /beforeBlobIdentity/)

  const badDigest = mutableInput()
  badDigest.changes = [{ path: "src/a.ts", operation: "ADD", beforeBlobIdentity: null, afterContentDigest: "F".repeat(64) }]
  assert.throws(() => buildP7ImmutablePatchProposal(badDigest as P7ImmutablePatchProposalInput), /afterContentDigest/)
})

test("P7-R1 rejects unknown fields and injected lifecycle authority", () => {
  const unknown = mutableInput()
  unknown.authorizedToApply = true
  assert.throws(() => buildP7ImmutablePatchProposal(unknown as P7ImmutablePatchProposalInput), /unknown field: authorizedToApply/)

  const changeUnknown = mutableInput()
  changeUnknown.changes[0].writeAuthorization = "ALLOW"
  assert.throws(() => buildP7ImmutablePatchProposal(changeUnknown as P7ImmutablePatchProposalInput), /unknown field: writeAuthorization/)

  const built = structuredClone(buildP7ImmutablePatchProposal(fixtureInput())) as MutableRecord
  built.state = "APPLIED"
  assert.throws(() => validateP7ImmutablePatchProposal(built), /state/)
})

test("P7-R1 requires a current finding bound to the exact target head and canonical base", () => {
  const staleRuntime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-test-adjudicator" })
  const staleFinding = staleRuntime.createFinding(claim(), NEXT)
  const valid = mutableInput()
  valid.targetHead = NEXT
  valid.sourceFinding = staleFinding
  assert.throws(() => buildP7ImmutablePatchProposal(valid as P7ImmutablePatchProposalInput), /CURRENT/)

  const moved = mutableInput()
  moved.targetHead = NEXT
  assert.throws(() => buildP7ImmutablePatchProposal(moved as P7ImmutablePatchProposalInput), /caller-supplied current head/)

  const wrongBase = mutableInput()
  wrongBase.canonicalBase = NEXT
  assert.throws(() => buildP7ImmutablePatchProposal(wrongBase as P7ImmutablePatchProposalInput), /canonicalBase/)
})

test("P7-R1 requires the first CONFIRM adjudication for the same finding", () => {
  const other = confirmedSource({ claimKey: "other-finding" })
  const mismatch = mutableInput()
  mismatch.sourceAdjudication = other.adjudication
  assert.throws(() => buildP7ImmutablePatchProposal(mismatch as P7ImmutablePatchProposalInput), /must adjudicate sourceFinding/)

  const rejectRuntime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-test-adjudicator" })
  const rejectedFinding = rejectRuntime.createFinding(claim(), HEAD)
  const rejected = rejectRuntime.applyAdjudication(
    rejectedFinding,
    { action: "REJECT", evidenceRefs: ["evidence:reject"] },
    HEAD,
  )
  const rejectInput = mutableInput()
  rejectInput.sourceFinding = rejectedFinding
  rejectInput.sourceAdjudication = rejected.adjudication
  assert.throws(() => buildP7ImmutablePatchProposal(rejectInput as P7ImmutablePatchProposalInput), /first CONFIRM adjudication/)

  const fixedRuntime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-test-adjudicator" })
  const fixedFinding = fixedRuntime.createFinding(claim(), HEAD)
  fixedRuntime.applyAdjudication(fixedFinding, { action: "CONFIRM", evidenceRefs: ["evidence:confirm"] }, HEAD)
  const fixed = fixedRuntime.applyAdjudication(
    fixedFinding,
    { action: "MARK_FIXED", evidenceRefs: ["evidence:fix"], correctionRef: "commit:fix" },
    HEAD,
  )
  const fixedInput = mutableInput()
  fixedInput.sourceFinding = fixedFinding
  fixedInput.sourceAdjudication = fixed.adjudication
  assert.throws(() => buildP7ImmutablePatchProposal(fixedInput as P7ImmutablePatchProposalInput), /first CONFIRM adjudication/)
})

test("P7-R1 returns detached deeply immutable output", () => {
  const input = mutableInput()
  const built = buildP7ImmutablePatchProposal(input as P7ImmutablePatchProposalInput)
  const snapshot = structuredClone(built)

  input.repositoryIdentity = "mutated"
  input.sourceFinding.summary = "mutated"
  input.sourceAdjudication.evidenceRefs[0] = "mutated"
  input.changes[0].path = "mutated.ts"

  assert.deepEqual(built, snapshot)
  assert.ok(Object.isFrozen(built))
  assert.ok(Object.isFrozen(built.sourceFinding))
  assert.ok(Object.isFrozen(built.sourceFinding.review))
  assert.ok(Object.isFrozen(built.sourceFinding.evidenceRefs))
  assert.ok(Object.isFrozen(built.sourceAdjudication))
  assert.ok(Object.isFrozen(built.sourceAdjudication.evidenceRefs))
  assert.ok(Object.isFrozen(built.changes))
  assert.ok(Object.isFrozen(built.changes[0]))
})

test("P7-R1 fails closed on accessors, proxies, custom prototypes, aliases, and non-JSON data", () => {
  const accessor = mutableInput()
  Object.defineProperty(accessor, "repositoryIdentity", {
    enumerable: true,
    configurable: true,
    get: () => "github.com/TheHalfMoon/Kodac",
  })
  assert.throws(() => buildP7ImmutablePatchProposal(accessor as P7ImmutablePatchProposalInput), /data property/)

  const proxy = new Proxy(mutableInput(), {})
  assert.throws(() => buildP7ImmutablePatchProposal(proxy as P7ImmutablePatchProposalInput), /Proxy/)

  const customPrototype = mutableInput()
  Object.setPrototypeOf(customPrototype, { polluted: true })
  assert.throws(() => buildP7ImmutablePatchProposal(customPrototype as P7ImmutablePatchProposalInput), /plain object/)

  const aliased = mutableInput()
  aliased.sourceAdjudication.evidenceRefs = aliased.sourceFinding.evidenceRefs
  assert.throws(() => buildP7ImmutablePatchProposal(aliased as P7ImmutablePatchProposalInput), /non-aliased/)

  const nonFinite = mutableInput()
  nonFinite.sourceFinding.confidenceBps = Number.NaN
  assert.throws(() => buildP7ImmutablePatchProposal(nonFinite as P7ImmutablePatchProposalInput), /non-finite/)
})

test("P7-R1 enforces explicit string, change-count, and JSON-graph bounds", () => {
  for (const [field, value] of [
    ["repositoryIdentity", "x".repeat(P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxRepositoryIdentityCodePoints + 1)],
    ["proposerIdentity", "x".repeat(P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxProposerIdentityCodePoints + 1)],
  ]) {
    const input = mutableInput()
    input[field] = value
    assert.throws(() => buildP7ImmutablePatchProposal(input as P7ImmutablePatchProposalInput), new RegExp(field))
  }

  const tooMany = mutableInput()
  tooMany.changes = Array.from(
    { length: P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxChanges + 1 },
    (_, index) => ({
      path: `src/${String(index).padStart(3, "0")}.ts`,
      operation: "ADD",
      beforeBlobIdentity: null,
      afterContentDigest: SHA_B,
    }),
  )
  assert.throws(() => buildP7ImmutablePatchProposal(tooMany as P7ImmutablePatchProposalInput), /1\.\.64 entries/)

  const longGraphString = mutableInput()
  longGraphString.sourceFinding.summary = "x".repeat(P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxGraphStringCodePoints + 1)
  assert.throws(() => buildP7ImmutablePatchProposal(longGraphString as P7ImmutablePatchProposalInput), /4096 Unicode code points/)
})

test("P7-R1 validation detects tampering of state, identity, source evidence, and changes", () => {
  const built = buildP7ImmutablePatchProposal(fixtureInput())

  for (const mutate of [
    (value: MutableRecord) => { value.proposalIdentity = SHA_D },
    (value: MutableRecord) => { value.patchArtifactDigest = SHA_D },
    (value: MutableRecord) => { value.sourceFinding.summary = "tampered" },
    (value: MutableRecord) => { value.sourceAdjudication.adjudicatorId = "tampered" },
    (value: MutableRecord) => { value.changes[0].afterContentDigest = SHA_D },
  ]) {
    const value = structuredClone(built) as unknown as MutableRecord
    mutate(value)
    assert.throws(() => validateP7ImmutablePatchProposal(value))
  }
})

test("P7-R1 schema matches runtime constants, operation rules, KRI linkage, and path policy", () => {
  assert.equal(schema.$id, "https://kodac.dev/schema/p7-immutable-patch-proposal.schema.json")
  assert.equal(schema.properties.version.const, P7_R1_IMMUTABLE_PATCH_PROPOSAL_VERSION)
  assert.equal(schema.properties.state.const, P7_R1_PATCH_PROPOSAL_STATE)
  assert.equal(schema.properties.sourceFinding.$ref, "https://kodac.dev/schema/kri-finding.schema.json")
  assert.equal(schema.properties.sourceAdjudication.$ref, "https://kodac.dev/schema/kri-adjudication.schema.json")
  assert.equal(schema.properties.changes.maxItems, P7_R1_IMMUTABLE_PATCH_PROPOSAL_LIMITS.maxChanges)
  assert.deepEqual(schema.$defs.change.properties.operation.enum, [...P7_R1_PATCH_OPERATIONS])

  const pathPattern = new RegExp(schema.$defs.repositoryPath.allOf[2].pattern)
  assert.equal(pathPattern.test("src/file.ts"), true)
  assert.equal(pathPattern.test("C:/file.ts"), false)
  assert.equal(pathPattern.test("C:relative.ts"), false)
  assert.equal(pathPattern.test("../file.ts"), false)
  assert.equal(pathPattern.test("src\\file.ts"), false)
})

test("P7-R1 source remains pure data-only and imports no execution or I/O surface", () => {
  for (const forbidden of [
    "node:fs",
    "node:child_process",
    "node:http",
    "node:https",
    "node:net",
    "node:dgram",
    "node:worker_threads",
  ]) {
    assert.equal(sourceText.includes(forbidden), false, forbidden)
  }
  assert.equal(sourceText.includes("applyPatch"), false)
  assert.equal(sourceText.includes("exec("), false)
  assert.equal(sourceText.includes("spawn("), false)
})
