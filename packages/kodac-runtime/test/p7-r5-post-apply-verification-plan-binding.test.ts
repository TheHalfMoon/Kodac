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
  buildP7AppliedPatchEvidenceBinding,
  type P7AppliedPatchEvidenceBindingBuildInput,
} from "../src/remediation/p7-applied-patch-evidence-binding.ts"
import {
  P7_R5_POST_APPLY_VERIFICATION_PLAN_BINDING_VERSION,
  P7_R5_VERIFICATION_PLAN_BOUND_STATE,
  P7_R5_VERIFICATION_PLAN_PROTOCOL,
  P7_R5_VERIFICATION_PLAN_VERSION,
  buildP7PostApplyVerificationPlanBinding,
  p7PostApplyVerificationPlanBindingIdentity,
  validateP7PostApplyVerificationPlanBinding,
  type P7PostApplyVerificationPlanBinding,
  type P7PostApplyVerificationPlanBindingBuildInput,
  type P7VerificationPlanInput,
} from "../src/remediation/p7-post-apply-verification-plan-binding.ts"

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
const GENERATED_AT = "2026-09-05T12:00:02.000Z"
const STARTED_AT = "2026-09-05T12:00:00.000Z"
const COMPLETED_AT = "2026-09-05T12:00:01.000Z"
const WORKSPACE = "/workspace/kodac"

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

function claim(): Record<string, unknown> {
  return {
    claimKey: "p7-r5-source-finding",
    review: {
      reviewRunId: "review-run-p7-r5",
      reviewerId: "provider:test",
      reviewerVersion: "v1",
      policyIdentity: "policy:p7-r5-test",
      canonicalBase: BASE,
      reviewedHead: HEAD,
    },
    path: "src/example.ts",
    range: { startLine: 10, endLine: 12 },
    summary: "A confirmed finding eligible for bounded remediation verification planning.",
    contractClaim: "The candidate violates one bounded invariant.",
    category: "correctness",
    severity: "high",
    confidenceBps: 9000,
    evidenceRefs: ["evidence:finding"],
  }
}

function sourceProposal(): P7ImmutablePatchProposal {
  const runtime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-r5-test-adjudicator" })
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
    proposerIdentity: "kodac:p7-r5-test-proposer",
    patchArtifactDigest: sha256(PATCH),
    changes: CHANGES,
  })
}

function sourceAuthorization(source: P7ImmutablePatchProposal): P7PatchApplicationAuthorization {
  return buildP7PatchApplicationAuthorization({
    sourceProposal: source,
    declaration: {
      authorizerIdentity: "kodac:p7-r5-test-authorizer",
      rationale: "The exact proposal has bounded authorization for one application lineage.",
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

function appliedInput(): P7AppliedPatchEvidenceBindingBuildInput {
  const proposal = sourceProposal()
  const authorization = sourceAuthorization(proposal)
  return {
    sourceProposal: proposal,
    sourceAuthorization: authorization,
    sourceIntentBinding: sourceIntentBinding(proposal, authorization),
    exactPatchText: PATCH,
    executionReceipt: receipt(),
  }
}

function rebindPlanDigest(plan: MutableRecord): P7VerificationPlanInput {
  const stable = {
    risk: plan.risk,
    budget: plan.budget,
    signals: plan.signals,
    changedPaths: plan.changedPaths,
    commands: plan.commands,
    warnings: plan.warnings,
  }
  plan.planDigest = sha256(JSON.stringify(stable))
  return plan as P7VerificationPlanInput
}

function verificationPlan(): P7VerificationPlanInput {
  return rebindPlanDigest({
    protocol: "kodac.verification-plan",
    version: 1,
    generatedAt: GENERATED_AT,
    workspace: WORKSPACE,
    risk: "medium",
    budget: { maxCommands: 6, maxTotalTimeoutMs: 240_000 },
    signals: ["package.json:javascript:npm"],
    changedPaths: ["src/a.ts", "src/b.ts", "src/c.ts"],
    commands: [
      {
        id: "js-root-tests-123abc",
        category: "tests",
        executable: "node",
        args: ["scripts/run-tests.mjs"],
        timeoutMs: 120_000,
        maxOutputBytes: 1_048_576,
      },
      {
        id: "js-root-types-456def",
        category: "types",
        executable: "node",
        args: ["node_modules/typescript/bin/tsc", "-p", "tsconfig.json", "--noEmit"],
        timeoutMs: 60_000,
        maxOutputBytes: 1_048_576,
      },
    ],
    warnings: [],
    planDigest: "0".repeat(64),
  })
}

function fixtureInput(): P7PostApplyVerificationPlanBindingBuildInput {
  const sourceAppliedEvidenceInput = appliedInput()
  return {
    sourceAppliedEvidence: buildP7AppliedPatchEvidenceBinding(sourceAppliedEvidenceInput),
    sourceAppliedEvidenceInput,
    verificationPlan: verificationPlan(),
  }
}

const schema = JSON.parse(
  readFileSync(new URL("../../../schema/p7-post-apply-verification-plan-binding.schema.json", import.meta.url), "utf8"),
) as UnknownRecord
const sourceText = readFileSync(
  new URL("../src/remediation/p7-post-apply-verification-plan-binding.ts", import.meta.url),
  "utf8",
)

test("P7-R5 builds and validates one deterministic VERIFICATION_PLAN_BOUND record", () => {
  const input = fixtureInput()
  const built = buildP7PostApplyVerificationPlanBinding(input)

  assert.equal(built.version, P7_R5_POST_APPLY_VERIFICATION_PLAN_BINDING_VERSION)
  assert.equal(built.state, P7_R5_VERIFICATION_PLAN_BOUND_STATE)
  assert.equal(built.verificationPlan.protocol, P7_R5_VERIFICATION_PLAN_PROTOCOL)
  assert.equal(built.verificationPlan.version, P7_R5_VERIFICATION_PLAN_VERSION)
  assert.equal(built.verificationPlanDigest, input.verificationPlan.planDigest)
  assert.equal(built.executionReceiptId, RECEIPT_ID)
  assert.equal(built.postStateDigest, POST_STATE)
  assert.deepEqual(built.verificationPlan.changedPaths, ["src/a.ts", "src/b.ts", "src/c.ts"])
  assert.equal(built.bindingIdentity, p7PostApplyVerificationPlanBindingIdentity(input))
  assert.deepEqual(validateP7PostApplyVerificationPlanBinding(built, input), built)
})

test("P7-R5 identity is deterministic and insensitive to benign caller key insertion order", () => {
  const input = fixtureInput()
  const first = buildP7PostApplyVerificationPlanBinding(input)
  const reorderedPlan = {
    planDigest: input.verificationPlan.planDigest,
    warnings: input.verificationPlan.warnings,
    commands: input.verificationPlan.commands,
    changedPaths: input.verificationPlan.changedPaths,
    signals: input.verificationPlan.signals,
    budget: input.verificationPlan.budget,
    risk: input.verificationPlan.risk,
    workspace: input.verificationPlan.workspace,
    generatedAt: input.verificationPlan.generatedAt,
    version: input.verificationPlan.version,
    protocol: input.verificationPlan.protocol,
  }
  const second = buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: reorderedPlan })
  assert.equal(first.bindingIdentity, second.bindingIdentity)
})

test("P7-R5 revalidates exact P7-R4 lineage instead of trusting a bare applied identity", () => {
  const input = fixtureInput()
  const forged = structuredClone(input.sourceAppliedEvidence) as MutableRecord
  forged.postStateDigest = "4".repeat(64)
  assert.throws(
    () => buildP7PostApplyVerificationPlanBinding({ ...input, sourceAppliedEvidence: forged as any }),
    /applied evidence\.postStateDigest|canonical source-derived/,
  )

  const driftedInput = structuredClone(input.sourceAppliedEvidenceInput) as MutableRecord
  driftedInput.executionReceipt.result.postStateDigest = "4".repeat(64)
  assert.throws(
    () => buildP7PostApplyVerificationPlanBinding({ ...input, sourceAppliedEvidenceInput: driftedInput as any }),
    /postStateDigest|canonical source-derived/,
  )
})

test("P7-R5 recomputes the exact current planner stable projection digest", () => {
  const input = fixtureInput()
  const tampered = structuredClone(input.verificationPlan) as MutableRecord
  tampered.planDigest = "f".repeat(64)
  assert.throws(
    () => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: tampered as P7VerificationPlanInput }),
    /planDigest/,
  )

  const semantic = structuredClone(input.verificationPlan) as MutableRecord
  semantic.warnings = ["bounded warning"]
  rebindPlanDigest(semantic)
  const changed = buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: semantic as P7VerificationPlanInput })
  assert.notEqual(changed.bindingIdentity, buildP7PostApplyVerificationPlanBinding(input).bindingIdentity)
})

test("P7-R5 requires exact applied changed paths with canonical ordering", () => {
  const input = fixtureInput()
  for (const changedPaths of [
    ["src/a.ts", "src/b.ts"],
    ["src/a.ts", "src/b.ts", "src/c.ts", "src/d.ts"],
    ["src/b.ts", "src/a.ts", "src/c.ts"],
  ]) {
    const plan = structuredClone(input.verificationPlan) as MutableRecord
    plan.changedPaths = changedPaths
    rebindPlanDigest(plan)
    assert.throws(
      () => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: plan as P7VerificationPlanInput }),
      /changedPaths/,
    )
  }
})

test("P7-R5 rederives risk and exact risk budget from applied paths", () => {
  const input = fixtureInput()
  const wrongRisk = structuredClone(input.verificationPlan) as MutableRecord
  wrongRisk.risk = "low"
  wrongRisk.budget = { maxCommands: 4, maxTotalTimeoutMs: 120_000 }
  rebindPlanDigest(wrongRisk)
  assert.throws(
    () => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: wrongRisk as P7VerificationPlanInput }),
    /risk/,
  )

  const wrongBudget = structuredClone(input.verificationPlan) as MutableRecord
  wrongBudget.budget = { maxCommands: 8, maxTotalTimeoutMs: 360_000 }
  rebindPlanDigest(wrongBudget)
  assert.throws(
    () => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: wrongBudget as P7VerificationPlanInput }),
    /budget/,
  )
})

test("P7-R5 closes command vocabulary, ids, paths, and tests-lane requirements", () => {
  const input = fixtureInput()

  const duplicate = structuredClone(input.verificationPlan) as MutableRecord
  duplicate.commands[1].id = duplicate.commands[0].id
  rebindPlanDigest(duplicate)
  assert.throws(() => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: duplicate }), /duplicate command ids/)

  const executable = structuredClone(input.verificationPlan) as MutableRecord
  executable.commands[0].executable = "bash"
  rebindPlanDigest(executable)
  assert.throws(() => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: executable }), /executable/)

  const traversal = structuredClone(input.verificationPlan) as MutableRecord
  traversal.commands[0].args = ["../outside.ts"]
  rebindPlanDigest(traversal)
  assert.throws(() => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: traversal }), /workspace-relative/)

  const noTests = structuredClone(input.verificationPlan) as MutableRecord
  noTests.commands = [{ id: "types-only", category: "types", executable: "node", args: ["tsc.js"] }]
  rebindPlanDigest(noTests)
  assert.throws(() => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: noTests }), /tests-category/)
})

test("P7-R5 rejects command numeric overflow and unknown authority fields", () => {
  const input = fixtureInput()

  const timeout = structuredClone(input.verificationPlan) as MutableRecord
  timeout.commands[0].timeoutMs = 120_001
  rebindPlanDigest(timeout)
  assert.throws(() => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: timeout }), /timeoutMs/)

  const commandUnknown = structuredClone(input.verificationPlan) as MutableRecord
  commandUnknown.commands[0].approved = true
  rebindPlanDigest(commandUnknown)
  assert.throws(() => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: commandUnknown }), /unknown field: approved/)

  const planUnknown = structuredClone(input.verificationPlan) as MutableRecord
  planUnknown.verified = true
  rebindPlanDigest(planUnknown)
  assert.throws(() => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: planUnknown }), /unknown field: verified/)
})

test("P7-R5 binds plan occurrence workspace and generatedAt without changing planner planDigest", () => {
  const input = fixtureInput()
  const original = buildP7PostApplyVerificationPlanBinding(input)

  const otherWorkspace = structuredClone(input.verificationPlan) as MutableRecord
  otherWorkspace.workspace = "/workspace/other"
  const workspaceBound = buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: otherWorkspace })
  assert.equal(workspaceBound.verificationPlanDigest, original.verificationPlanDigest)
  assert.notEqual(workspaceBound.verificationWorkspaceDigest, original.verificationWorkspaceDigest)
  assert.notEqual(workspaceBound.bindingIdentity, original.bindingIdentity)

  const otherTime = structuredClone(input.verificationPlan) as MutableRecord
  otherTime.generatedAt = "2026-09-05T12:00:03.000Z"
  const timeBound = buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: otherTime })
  assert.equal(timeBound.verificationPlanDigest, original.verificationPlanDigest)
  assert.notEqual(timeBound.bindingIdentity, original.bindingIdentity)
})

test("P7-R5 fails closed on hostile verification-plan containers", () => {
  const input = fixtureInput()

  const proxyInput = { ...input, verificationPlan: new Proxy(structuredClone(input.verificationPlan), {}) }
  assert.throws(() => buildP7PostApplyVerificationPlanBinding(proxyInput as any), /Proxy|non-proxy/)

  const accessor = structuredClone(input.verificationPlan) as MutableRecord
  Object.defineProperty(accessor, "risk", { enumerable: true, get() { return "medium" } })
  assert.throws(() => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: accessor }), /data property/)

  const custom = structuredClone(input.verificationPlan) as MutableRecord
  Object.setPrototypeOf(custom.budget, { injected: true })
  assert.throws(() => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: custom }), /plain object/)

  const sparse = structuredClone(input.verificationPlan) as MutableRecord
  sparse.commands = new Array(2)
  sparse.commands[0] = structuredClone(input.verificationPlan.commands[0])
  assert.throws(() => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: sparse }), /sparse|array/)
})

test("P7-R5 rejects invalid Unicode and aggregate-timeout warning substitution", () => {
  const input = fixtureInput()
  const unicode = structuredClone(input.verificationPlan) as MutableRecord
  unicode.signals = ["bad\ud800"]
  rebindPlanDigest(unicode)
  assert.throws(() => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: unicode }), /Unicode/)

  const timeout = structuredClone(input.verificationPlan) as MutableRecord
  timeout.commands = [
    { id: "test-a", category: "tests", executable: "node", args: ["a.js"], timeoutMs: 120_000 },
    { id: "test-b", category: "tests", executable: "node", args: ["b.js"], timeoutMs: 120_000 },
    { id: "test-c", category: "tests", executable: "node", args: ["c.js"], timeoutMs: 120_000 },
  ]
  timeout.warnings = []
  rebindPlanDigest(timeout)
  assert.throws(() => buildP7PostApplyVerificationPlanBinding({ ...input, verificationPlan: timeout }), /aggregate-timeout warning/)
})

test("P7-R5 output is detached deeply immutable and validation rejects tampering", () => {
  const input = fixtureInput()
  const built = buildP7PostApplyVerificationPlanBinding(input)
  assert.ok(Object.isFrozen(built))
  assert.ok(Object.isFrozen(built.verificationPlan))
  assert.ok(Object.isFrozen(built.verificationPlan.commands))
  assert.ok(Object.isFrozen(built.verificationPlan.commands[0]))
  assert.ok(Object.isFrozen(built.verificationPlan.commands[0]!.args))

  const callerPlan = input.verificationPlan as MutableRecord
  callerPlan.workspace = "/mutated/after-build"
  callerPlan.changedPaths[0] = "mutated.ts"
  assert.equal(built.verificationPlan.changedPaths[0], "src/a.ts")

  const freshInput = fixtureInput()
  const fresh = buildP7PostApplyVerificationPlanBinding(freshInput)
  const tampered = structuredClone(fresh) as MutableRecord
  tampered.verificationPlanDigest = "f".repeat(64)
  assert.throws(
    () => validateP7PostApplyVerificationPlanBinding(tampered, freshInput),
    /verificationPlanDigest|canonical source-derived|bindingIdentity/,
  )
})

test("P7-R5 schema mirrors the bounded state while production remains pure data-only", () => {
  assert.equal(schema.additionalProperties, false)
  assert.equal(schema.properties.version.const, P7_R5_POST_APPLY_VERIFICATION_PLAN_BINDING_VERSION)
  assert.equal(schema.properties.state.const, P7_R5_VERIFICATION_PLAN_BOUND_STATE)
  assert.equal(schema.$defs.verificationPlanProjection.additionalProperties, false)
  assert.deepEqual(schema.$defs.command.properties.category.enum, ["syntax", "types", "lint", "tests", "custom"])
  assert.deepEqual(schema.$defs.command.properties.executable.enum, ["node", "python", "cargo", "go"])

  assert.match(sourceText, /validateP7AppliedPatchEvidenceBinding/)
  for (const forbidden of [
    "planVerification(",
    "runVerificationEngine",
    "ExecutionGateway",
    "DoneGate",
    "node:fs",
    "node:child_process",
    "node:net",
    "node:http",
    "node:https",
    "fetch(",
  ]) {
    assert.equal(sourceText.includes(forbidden), false, `production source must not contain ${forbidden}`)
  }
})
