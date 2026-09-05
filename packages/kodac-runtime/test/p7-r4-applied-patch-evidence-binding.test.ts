import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import test from "node:test"

import type { ExecutionReceipt } from "../src/evidence/receipt.ts"
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
  buildP7PatchExecutionIntentBinding,
  type P7PatchExecutionIntentBinding,
} from "../src/remediation/p7-patch-execution-intent-binding.ts"
import {
  P7_R4_APPLIED_PATCH_EVIDENCE_BINDING_VERSION,
  P7_R4_APPLIED_PATCH_STATE,
  P7_R4_POLICY_DECISION,
  buildP7AppliedPatchEvidenceBinding,
  p7AppliedPatchEvidenceIdentity,
  validateP7AppliedPatchEvidenceBinding,
  type P7AppliedPatchEvidenceBinding,
  type P7AppliedPatchEvidenceBindingBuildInput,
} from "../src/remediation/p7-applied-patch-evidence-binding.ts"

type MutableRecord = Record<string, any>
type UnknownRecord = Record<string, any>

const BASE = "a".repeat(40)
const HEAD = "b".repeat(40)
const BLOB_A = "1".repeat(40)
const BLOB_B = "2".repeat(40)
const SHA_A = "1".repeat(64)
const SHA_B = "2".repeat(64)
const POST_STATE = "3".repeat(64)
const RECEIPT_ID = "123e4567-e89b-42d3-a456-426614174000"
const APPROVAL_INSTANCE_ID = "123e4567-e89b-42d3-b456-426614174001"
const STARTED_AT = "2026-09-05T12:00:00.000Z"
const COMPLETED_AT = "2026-09-05T12:00:01.000Z"

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
    claimKey: "p7-r4-source-finding",
    review: {
      reviewRunId: "review-run-p7-r4",
      reviewerId: "provider:test",
      reviewerVersion: "v1",
      policyIdentity: "policy:p7-r4-test",
      canonicalBase: BASE,
      reviewedHead: HEAD,
    },
    path: "src/security/example.ts",
    range: { startLine: 10, endLine: 12 },
    summary: "A confirmed finding eligible for bounded remediation evidence.",
    contractClaim: "The candidate violates one bounded invariant.",
    category: "security-boundary",
    severity: "high",
    confidenceBps: 9000,
    evidenceRefs: ["evidence:finding"],
    ...overrides,
  }
}

function sourceProposal(overrides: Partial<P7ImmutablePatchProposalInput> = {}): P7ImmutablePatchProposal {
  const runtime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-r4-test-adjudicator" })
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
    proposerIdentity: "kodac:p7-r4-test-proposer",
    patchArtifactDigest: sha256(PATCH),
    changes: CHANGES,
    ...overrides,
  })
}

function sourceAuthorization(source: P7ImmutablePatchProposal): P7PatchApplicationAuthorization {
  return buildP7PatchApplicationAuthorization({
    sourceProposal: source,
    declaration: {
      authorizerIdentity: "kodac:p7-r4-test-authorizer",
      rationale: "The exact proposal has bounded authorization for a future application attempt.",
      evidenceRefs: ["evidence:authorization", "evidence:risk-review"],
    },
  })
}

function sourceIntentBinding(
  source: P7ImmutablePatchProposal,
  authorization: P7PatchApplicationAuthorization,
): P7PatchExecutionIntentBinding {
  return buildP7PatchExecutionIntentBinding({
    sourceProposal: source,
    sourceAuthorization: authorization,
    patchText: PATCH,
  })
}

function receipt(overrides: Record<string, unknown> = {}): ExecutionReceipt {
  return {
    receiptId: RECEIPT_ID,
    capability: "repo.apply_patch",
    inputDigest: sha256(PATCH),
    paths: ["src/a.ts", "src/b.ts", "src/c.ts"],
    policy: { decision: "allow", reason: "explicit bounded test policy" },
    startedAt: STARTED_AT,
    completedAt: COMPLETED_AT,
    result: {
      status: "success",
      affected: {
        added: ["src/a.ts"],
        modified: ["src/b.ts"],
        deleted: ["src/c.ts"],
      },
      postStateDigest: POST_STATE,
    },
    ...overrides,
  } as ExecutionReceipt
}

function fixtureInput(receiptOverrides: Record<string, unknown> = {}): P7AppliedPatchEvidenceBindingBuildInput {
  const proposal = sourceProposal()
  const authorization = sourceAuthorization(proposal)
  return {
    sourceProposal: proposal,
    sourceAuthorization: authorization,
    sourceIntentBinding: sourceIntentBinding(proposal, authorization),
    exactPatchText: PATCH,
    executionReceipt: receipt(receiptOverrides),
  }
}

function expectedIdentity(value: P7AppliedPatchEvidenceBinding): string {
  return sha256(JSON.stringify({
    version: value.version,
    state: value.state,
    proposalIdentity: value.proposalIdentity,
    authorizationIdentity: value.authorizationIdentity,
    intentBindingIdentity: value.intentBindingIdentity,
    repositoryIdentity: value.repositoryIdentity,
    canonicalBase: value.canonicalBase,
    targetHead: value.targetHead,
    patchArtifactDigest: value.patchArtifactDigest,
    inputDigest: value.inputDigest,
    executionReceiptIdentity: value.executionReceiptIdentity,
    executionReceiptId: value.executionReceiptId,
    executionStartedAt: value.executionStartedAt,
    executionCompletedAt: value.executionCompletedAt,
    capability: value.capability,
    policyDecision: value.policyDecision,
    paths: value.paths,
    operations: value.operations,
    postStateDigest: value.postStateDigest,
    approvalEvidenceIdentity: value.approvalEvidenceIdentity,
    confinementBindingIdentity: value.confinementBindingIdentity,
  }))
}

const schema = JSON.parse(
  readFileSync(new URL("../../../schema/p7-applied-patch-evidence-binding.schema.json", import.meta.url), "utf8"),
) as UnknownRecord
const sourceText = readFileSync(
  new URL("../src/remediation/p7-applied-patch-evidence-binding.ts", import.meta.url),
  "utf8",
)

test("P7-R4 builds and validates one deterministic APPLIED evidence binding from fixture receipt data", () => {
  const input = fixtureInput()
  const built = buildP7AppliedPatchEvidenceBinding(input)

  assert.equal(built.version, P7_R4_APPLIED_PATCH_EVIDENCE_BINDING_VERSION)
  assert.equal(built.state, P7_R4_APPLIED_PATCH_STATE)
  assert.equal(built.capability, "repo.apply_patch")
  assert.equal(built.policyDecision, P7_R4_POLICY_DECISION)
  assert.equal(built.executionReceiptId, RECEIPT_ID)
  assert.equal(built.postStateDigest, POST_STATE)
  assert.equal(built.approvalEvidenceIdentity, null)
  assert.equal(built.confinementBindingIdentity, null)
  assert.deepEqual(built.paths, ["src/a.ts", "src/b.ts", "src/c.ts"])
  assert.deepEqual(built.operations, [
    { path: "src/a.ts", operation: "ADD" },
    { path: "src/b.ts", operation: "MODIFY" },
    { path: "src/c.ts", operation: "DELETE" },
  ])
  assert.equal(built.appliedEvidenceIdentity, expectedIdentity(built))
  assert.equal(p7AppliedPatchEvidenceIdentity(input), built.appliedEvidenceIdentity)
  assert.deepEqual(validateP7AppliedPatchEvidenceBinding(built, input), built)
})

test("P7-R4 identity is deterministic for the exact same source lineage and receipt evidence", () => {
  const input = fixtureInput()
  const first = buildP7AppliedPatchEvidenceBinding(input)
  const second = buildP7AppliedPatchEvidenceBinding(structuredClone(input))
  assert.equal(first.appliedEvidenceIdentity, second.appliedEvidenceIdentity)
  assert.equal(first.executionReceiptIdentity, second.executionReceiptIdentity)
})

test("P7-R4 binds exact P7-R1/R2/R3 lineage and exact patch text", () => {
  const input = fixtureInput()

  const otherProposal = sourceProposal({ proposerIdentity: "kodac:other-proposer" })
  const otherAuthorization = sourceAuthorization(otherProposal)
  const otherBinding = sourceIntentBinding(otherProposal, otherAuthorization)

  assert.throws(
    () => buildP7AppliedPatchEvidenceBinding({ ...input, sourceIntentBinding: otherBinding }),
    /proposalIdentity|source proposal|canonical source-derived binding/,
  )
  assert.throws(
    () => buildP7AppliedPatchEvidenceBinding({ ...input, exactPatchText: `${PATCH}\n` }),
    /digest|patchText|binding/,
  )
})

test("P7-R4 rejects execution receipt input-digest mismatch", () => {
  const input = fixtureInput({ inputDigest: "f".repeat(64) })
  assert.throws(() => buildP7AppliedPatchEvidenceBinding(input), /inputDigest/)
})

test("P7-R4 rejects receipt path expansion, reduction, and reordering", () => {
  for (const paths of [
    ["src/a.ts", "src/b.ts", "src/c.ts", "src/evil.ts"],
    ["src/a.ts", "src/b.ts"],
    ["src/b.ts", "src/a.ts", "src/c.ts"],
  ]) {
    const input = fixtureInput({ paths })
    assert.throws(() => buildP7AppliedPatchEvidenceBinding(input), /paths|canonical ascending/)
  }
})

test("P7-R4 normalizes affected sets and rejects operation mismatch", () => {
  const reordered = fixtureInput({
    result: {
      status: "success",
      affected: {
        added: ["src/a.ts"],
        modified: ["src/b.ts"],
        deleted: ["src/c.ts"],
      },
      postStateDigest: POST_STATE,
    },
  })
  assert.doesNotThrow(() => buildP7AppliedPatchEvidenceBinding(reordered))

  const mismatch = fixtureInput({
    result: {
      status: "success",
      affected: {
        added: ["src/a.ts", "src/b.ts"],
        modified: [],
        deleted: ["src/c.ts"],
      },
      postStateDigest: POST_STATE,
    },
  })
  assert.throws(() => buildP7AppliedPatchEvidenceBinding(mismatch), /affected|operations/)
})

test("P7-R4 rejects blocked, failed, non-allow, and malformed success receipts", () => {
  const blocked = fixtureInput({ result: { status: "blocked", reason: "denied" } })
  assert.throws(() => buildP7AppliedPatchEvidenceBinding(blocked), /result|status/)

  const failed = fixtureInput({ result: { status: "failure", error: "boom" } })
  assert.throws(() => buildP7AppliedPatchEvidenceBinding(failed), /result|status/)

  const nonAllow = fixtureInput({ policy: { decision: "ask", reason: "approval required" } })
  assert.throws(() => buildP7AppliedPatchEvidenceBinding(nonAllow), /policy.decision/)

  const malformedDigest = fixtureInput({
    result: {
      status: "success",
      affected: { added: ["src/a.ts"], modified: ["src/b.ts"], deleted: ["src/c.ts"] },
      postStateDigest: "not-a-digest",
    },
  })
  assert.throws(() => buildP7AppliedPatchEvidenceBinding(malformedDigest), /postStateDigest/)
})

test("P7-R4 validates optional one-shot approval evidence instead of trusting it", () => {
  const approval = {
    version: "kodac-h4-r1-one-shot-approval-v1",
    requestIdentity: "4".repeat(64),
    requestInstanceId: APPROVAL_INSTANCE_ID,
    decisionEvidenceIdentity: "5".repeat(64),
    outcome: "allowed-once",
  }
  const input = fixtureInput({ approval })
  const built = buildP7AppliedPatchEvidenceBinding(input)
  assert.equal(built.approvalEvidenceIdentity, "5".repeat(64))

  const bad = fixtureInput({ approval: { ...approval, outcome: "rejected" } })
  assert.throws(() => buildP7AppliedPatchEvidenceBinding(bad), /approval.outcome/)
})

test("P7-R4 rejects malformed confinement evidence rather than copying it", () => {
  const input = fixtureInput({ confinement: { bindingIdentity: "0".repeat(64) } })
  assert.throws(() => buildP7AppliedPatchEvidenceBinding(input), /confinement|binding/)
})

test("P7-R4 validates canonical receipt identity and timestamps", () => {
  assert.throws(() => buildP7AppliedPatchEvidenceBinding(fixtureInput({ receiptId: "not-a-uuid" })), /receiptId/)
  assert.throws(() => buildP7AppliedPatchEvidenceBinding(fixtureInput({ startedAt: "2026-09-05T12:00:00Z" })), /startedAt/)
  assert.throws(() => buildP7AppliedPatchEvidenceBinding(fixtureInput({ completedAt: "2026-09-05T11:59:59.000Z" })), /completedAt/)
})

test("P7-R4 rejects unknown receipt authority fields", () => {
  const input = fixtureInput()
  const hostile = structuredClone(input) as MutableRecord
  hostile.executionReceipt.executeNow = true
  assert.throws(
    () => buildP7AppliedPatchEvidenceBinding(hostile as P7AppliedPatchEvidenceBindingBuildInput),
    /unknown field: executeNow/,
  )
})

test("P7-R4 fails closed on hostile receipt containers", () => {
  const proxy = fixtureInput()
  proxy.executionReceipt = new Proxy(structuredClone(proxy.executionReceipt), {}) as ExecutionReceipt
  assert.throws(() => buildP7AppliedPatchEvidenceBinding(proxy), /non-proxy plain object/)

  const accessor = fixtureInput()
  const accessorReceipt = structuredClone(accessor.executionReceipt) as MutableRecord
  Object.defineProperty(accessorReceipt, "inputDigest", {
    enumerable: true,
    get() { return sha256(PATCH) },
  })
  accessor.executionReceipt = accessorReceipt as ExecutionReceipt
  assert.throws(() => buildP7AppliedPatchEvidenceBinding(accessor), /data property/)

  const custom = fixtureInput()
  const customReceipt = structuredClone(custom.executionReceipt) as MutableRecord
  Object.setPrototypeOf(customReceipt.policy, { injected: true })
  custom.executionReceipt = customReceipt as ExecutionReceipt
  assert.throws(() => buildP7AppliedPatchEvidenceBinding(custom), /plain object/)

  const sparse = fixtureInput()
  const sparseReceipt = structuredClone(sparse.executionReceipt) as MutableRecord
  sparseReceipt.paths = new Array(3)
  sparseReceipt.paths[0] = "src/a.ts"
  sparseReceipt.paths[2] = "src/c.ts"
  sparse.executionReceipt = sparseReceipt as ExecutionReceipt
  assert.throws(() => buildP7AppliedPatchEvidenceBinding(sparse), /sparse|paths/)
})

test("P7-R4 output is detached and deeply immutable", () => {
  const input = structuredClone(fixtureInput()) as MutableRecord
  const built = buildP7AppliedPatchEvidenceBinding(input as P7AppliedPatchEvidenceBindingBuildInput)
  const snapshot = structuredClone(built)

  input.executionReceipt.paths[0] = "mutated.ts"
  input.executionReceipt.result.affected.added[0] = "mutated.ts"
  input.sourceProposal.changes[0].path = "mutated.ts"

  assert.deepEqual(built, snapshot)
  assert.ok(Object.isFrozen(built))
  assert.ok(Object.isFrozen(built.paths))
  assert.ok(Object.isFrozen(built.operations))
  for (const operation of built.operations) assert.ok(Object.isFrozen(operation))
})

test("P7-R4 validator rejects output scalar, path, operation, and identity tampering", () => {
  const input = fixtureInput()
  const built = buildP7AppliedPatchEvidenceBinding(input)

  for (const [field, value] of [
    ["state", "VERIFIED"],
    ["proposalIdentity", "f".repeat(64)],
    ["authorizationIdentity", "e".repeat(64)],
    ["intentBindingIdentity", "d".repeat(64)],
    ["executionReceiptIdentity", "c".repeat(64)],
    ["postStateDigest", "b".repeat(64)],
    ["policyDecision", "ask"],
  ] as Array<[string, unknown]>) {
    const tampered = structuredClone(built) as MutableRecord
    tampered[field] = value
    assert.throws(() => validateP7AppliedPatchEvidenceBinding(tampered, input), new RegExp(field))
  }

  const paths = structuredClone(built) as MutableRecord
  paths.paths = [...built.paths].reverse()
  assert.throws(() => validateP7AppliedPatchEvidenceBinding(paths, input), /paths/)

  const operations = structuredClone(built) as MutableRecord
  operations.operations[0].operation = "DELETE"
  assert.throws(() => validateP7AppliedPatchEvidenceBinding(operations, input), /operations/)

  const identity = structuredClone(built) as MutableRecord
  identity.appliedEvidenceIdentity = "0".repeat(64)
  assert.throws(() => validateP7AppliedPatchEvidenceBinding(identity, input), /appliedEvidenceIdentity/)
})

test("P7-R4 schema agrees with runtime state and source has no execution surface", () => {
  assert.equal(schema.additionalProperties, false)
  assert.equal(schema.properties.version.const, P7_R4_APPLIED_PATCH_EVIDENCE_BINDING_VERSION)
  assert.equal(schema.properties.state.const, P7_R4_APPLIED_PATCH_STATE)
  assert.equal(schema.properties.capability.const, "repo.apply_patch")
  assert.equal(schema.properties.policyDecision.const, P7_R4_POLICY_DECISION)
  assert.equal(schema.properties.paths.maxItems, 64)
  for (const required of [
    "appliedEvidenceIdentity",
    "intentBindingIdentity",
    "executionReceiptIdentity",
    "operations",
    "postStateDigest",
  ]) {
    assert.ok(schema.required.includes(required))
  }

  for (const forbidden of [
    "ExecutionGateway",
    "applyHunks",
    "createApplyPatchTool",
    "JsonlReceiptLedger",
    "runVerificationEngine",
    "node:fs",
    "node:child_process",
    "node:net",
    "node:http",
    "node:https",
  ]) {
    assert.doesNotMatch(sourceText, new RegExp(forbidden))
  }
})
