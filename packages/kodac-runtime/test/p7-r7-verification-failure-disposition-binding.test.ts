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
  buildP7PostApplyVerificationPlanBinding,
  type P7PostApplyVerificationPlanBindingBuildInput,
  type P7VerificationPlanInput,
} from "../src/remediation/p7-post-apply-verification-plan-binding.ts"
import {
  buildP7PostApplyVerificationReportBinding,
  type P7PostApplyVerificationReportBindingBuildInput,
} from "../src/remediation/p7-post-apply-verification-report-binding.ts"
import {
  P7_R7_VERIFICATION_FAILED_STATE,
  P7_R7_VERIFICATION_FAILURE_DISPOSITION_BINDING_VERSION,
  buildP7VerificationFailureDispositionBinding,
  p7VerificationFailureDispositionIdentity,
  validateP7VerificationFailureDispositionBinding,
  type P7VerificationExecutionIntentPreimage,
  type P7VerificationFailureDispositionBindingBuildInput,
} from "../src/remediation/p7-verification-failure-disposition-binding.ts"

type MutableRecord = Record<string, any>
type UnknownRecord = Record<string, any>

const BASE = "a".repeat(40)
const HEAD = "b".repeat(40)
const BLOB_A = "1".repeat(40)
const BLOB_B = "2".repeat(40)
const SHA_A = "1".repeat(64)
const SHA_B = "2".repeat(64)
const POST_STATE = "3".repeat(64)
const APPLY_RECEIPT_ID = "123e4567-e89b-42d3-a456-426614174000"
const FAILURE_RECEIPT_ID = "223e4567-e89b-42d3-a456-426614174001"
const GENERATED_AT = "2026-09-05T12:00:02.000Z"
const REPORT_STARTED_AT = "2026-09-05T12:00:03.000Z"
const REPORT_COMPLETED_AT = "2026-09-05T12:00:04.000Z"
const FAILURE_STARTED_AT = "2026-09-05T12:00:03.100Z"
const FAILURE_COMPLETED_AT = "2026-09-05T12:00:03.900Z"
const WORKSPACE = "/workspace/kodac"
const FAILED_COMMAND_ID = "js-root-tests-123abc"
const OTHER_COMMAND_ID = "js-root-types-456def"

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
    claimKey: "p7-r7-source-finding",
    review: {
      reviewRunId: "review-run-p7-r7",
      reviewerId: "provider:test",
      reviewerVersion: "v1",
      policyIdentity: "policy:p7-r7-test",
      canonicalBase: BASE,
      reviewedHead: HEAD,
    },
    path: "src/example.ts",
    range: { startLine: 10, endLine: 12 },
    summary: "A confirmed finding eligible for bounded remediation verification evidence binding.",
    contractClaim: "The candidate violates one bounded invariant.",
    category: "correctness",
    severity: "high",
    confidenceBps: 9000,
    evidenceRefs: ["evidence:finding"],
  }
}

function sourceProposal(): P7ImmutablePatchProposal {
  const runtime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-r7-test-adjudicator" })
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
    proposerIdentity: "kodac:p7-r7-test-proposer",
    patchArtifactDigest: sha256(PATCH),
    changes: CHANGES,
  })
}

function sourceAuthorization(source: P7ImmutablePatchProposal): P7PatchApplicationAuthorization {
  return buildP7PatchApplicationAuthorization({
    sourceProposal: source,
    declaration: {
      authorizerIdentity: "kodac:p7-r7-test-authorizer",
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

function applicationReceipt(): ExecutionReceipt {
  return {
    receiptId: APPLY_RECEIPT_ID,
    capability: "repo.apply_patch",
    inputDigest: sha256(PATCH),
    paths: ["src/a.ts", "src/b.ts", "src/c.ts"],
    policy: { decision: "allow", reason: "explicit bounded test policy" },
    startedAt: "2026-09-05T12:00:00.000Z",
    completedAt: "2026-09-05T12:00:01.000Z",
    result: {
      status: "success",
      affected: { added: ["src/a.ts"], modified: ["src/b.ts"], deleted: ["src/c.ts"] },
      postStateDigest: POST_STATE,
    },
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
    executionReceipt: applicationReceipt(),
  }
}

function rebindPlanDigest(plan: MutableRecord): P7VerificationPlanInput {
  plan.planDigest = sha256(JSON.stringify({
    risk: plan.risk,
    budget: plan.budget,
    signals: plan.signals,
    changedPaths: plan.changedPaths,
    commands: plan.commands,
    warnings: plan.warnings,
  }))
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
        id: FAILED_COMMAND_ID,
        category: "tests",
        executable: "node",
        args: ["scripts/run-tests.mjs"],
      },
      {
        id: OTHER_COMMAND_ID,
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

function r5Input(): P7PostApplyVerificationPlanBindingBuildInput {
  const sourceAppliedEvidenceInput = appliedInput()
  return {
    sourceAppliedEvidence: buildP7AppliedPatchEvidenceBinding(sourceAppliedEvidenceInput),
    sourceAppliedEvidenceInput,
    verificationPlan: verificationPlan(),
  }
}

function failureReport(plan: P7VerificationPlanInput): MutableRecord {
  void plan
  return {
    protocol: "kodac.verification",
    version: 1,
    sessionId: "session-p7-r7",
    startedAt: REPORT_STARTED_AT,
    completedAt: REPORT_COMPLETED_AT,
    passed: false,
    checks: [
      {
        id: "agent.completed",
        category: "agent",
        status: "pass",
        summary: "Agent completed.",
        evidence: [{ kind: "event", ref: "session:p7-r7:agent.loop.completed" }],
      },
      {
        id: "workspace.integrity",
        category: "workspace",
        status: "pass",
        summary: "Workspace intact.",
        evidence: [{ kind: "workspace", ref: WORKSPACE, digest: sha256(WORKSPACE) }],
      },
      {
        id: "git.diff",
        category: "diff",
        status: "pass",
        summary: "Diff evidenced.",
        evidence: [{ kind: "receipt", ref: APPLY_RECEIPT_ID }],
      },
      {
        id: `command.${FAILED_COMMAND_ID}`,
        category: "tests",
        status: "fail",
        summary: "Verification command failed with a non-zero exit.",
        evidence: [{ kind: "receipt", ref: FAILURE_RECEIPT_ID }],
      },
      {
        id: `command.${OTHER_COMMAND_ID}`,
        category: "types",
        status: "pass",
        summary: "Type verification passed.",
        evidence: [{ kind: "receipt", ref: "verification-command-receipt-other" }],
      },
      {
        id: "evidence.receipts",
        category: "receipts",
        status: "fail",
        summary: "A verification command receipt recorded failure.",
        evidence: [{ kind: "receipt", ref: FAILURE_RECEIPT_ID }],
      },
      {
        id: "evidence.policy",
        category: "policy",
        status: "pass",
        summary: "All persisted receipt policies allowed execution.",
        evidence: [{ kind: "receipt", ref: FAILURE_RECEIPT_ID }],
      },
      {
        id: "verification.commands",
        category: "tests",
        status: "fail",
        summary: "At least one planned verification command failed.",
        evidence: [{ kind: "receipt", ref: FAILURE_RECEIPT_ID }],
      },
    ],
  }
}

function r6Input(report?: MutableRecord): P7PostApplyVerificationReportBindingBuildInput {
  const sourceVerificationPlanBindingInput = r5Input()
  return {
    sourceVerificationPlanBinding: buildP7PostApplyVerificationPlanBinding(sourceVerificationPlanBindingInput),
    sourceVerificationPlanBindingInput,
    verificationReport: report ?? failureReport(sourceVerificationPlanBindingInput.verificationPlan),
  }
}

function canonicalEnvironment(env: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(env).sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0),
  )
}

function verificationIntent(): P7VerificationExecutionIntentPreimage {
  return {
    resolvedExecutable: "/usr/local/bin/node",
    args: ["scripts/run-tests.mjs"],
    allowedExitCodes: [0],
    maxOutputBytes: 512 * 1024,
    timeoutMs: 30_000,
    env: {
      TEMP: "",
      PATH: "/usr/local/bin:/usr/bin",
      NO_COLOR: "1",
      KODAC_VERIFICATION: "1",
      NODE_ENV: "test",
    },
  }
}

function gatewayInputDigest(intent: P7VerificationExecutionIntentPreimage): string {
  return sha256(JSON.stringify({
    executable: intent.resolvedExecutable,
    args: [...intent.args],
    allowedExitCodes: [0],
    maxOutputBytes: intent.maxOutputBytes,
    timeoutMs: intent.timeoutMs,
    env: canonicalEnvironment({ ...intent.env }),
  }))
}

function failureReceipt(intent: P7VerificationExecutionIntentPreimage = verificationIntent()): MutableRecord {
  return {
    receiptId: FAILURE_RECEIPT_ID,
    capability: `verification.command.${FAILED_COMMAND_ID}`,
    inputDigest: gatewayInputDigest(intent),
    paths: [],
    policy: { decision: "allow", reason: "explicit --approve-verification authorization" },
    startedAt: FAILURE_STARTED_AT,
    completedAt: FAILURE_COMPLETED_AT,
    result: { status: "failure", error: "verification command exited with code 1" },
  }
}

function fixtureInput(): P7VerificationFailureDispositionBindingBuildInput {
  const sourceVerificationReportBindingInput = r6Input()
  const executionIntentPreimage = verificationIntent()
  return {
    sourceVerificationReportBinding: buildP7PostApplyVerificationReportBinding(sourceVerificationReportBindingInput),
    sourceVerificationReportBindingInput,
    failedCommandId: FAILED_COMMAND_ID,
    executionIntentPreimage,
    executionReceipt: failureReceipt(executionIntentPreimage),
  }
}

function rebuildR6(input: P7VerificationFailureDispositionBindingBuildInput, report: MutableRecord): P7VerificationFailureDispositionBindingBuildInput {
  const sourceVerificationReportBindingInput = {
    ...input.sourceVerificationReportBindingInput,
    verificationReport: report,
  }
  return {
    ...input,
    sourceVerificationReportBindingInput,
    sourceVerificationReportBinding: buildP7PostApplyVerificationReportBinding(sourceVerificationReportBindingInput),
  }
}

const schema = JSON.parse(
  readFileSync(new URL("../../../schema/p7-verification-failure-disposition-binding.schema.json", import.meta.url), "utf8"),
) as UnknownRecord
const sourceText = readFileSync(
  new URL("../src/remediation/p7-verification-failure-disposition-binding.ts", import.meta.url),
  "utf8",
)

test("P7-R7 builds and validates one deterministic receipt-backed VERIFICATION_FAILED record", () => {
  const input = fixtureInput()
  const built = buildP7VerificationFailureDispositionBinding(input)
  assert.equal(built.version, P7_R7_VERIFICATION_FAILURE_DISPOSITION_BINDING_VERSION)
  assert.equal(built.state, P7_R7_VERIFICATION_FAILED_STATE)
  assert.equal(built.sourceVerificationReportBindingIdentity, input.sourceVerificationReportBinding.bindingIdentity)
  assert.equal(built.failedCommandId, FAILED_COMMAND_ID)
  assert.equal(built.failedCommandCategory, "tests")
  assert.equal(built.executionReceiptId, FAILURE_RECEIPT_ID)
  assert.equal(built.executionInputDigest, gatewayInputDigest(input.executionIntentPreimage))
  assert.equal(built.executionTimeoutMs, 30_000)
  assert.equal(built.executionMaxOutputBytes, 512 * 1024)
  assert.equal(built.dispositionIdentity, p7VerificationFailureDispositionIdentity(input))
  assert.deepEqual(validateP7VerificationFailureDispositionBinding(built, input), built)
})

test("P7-R7 identity is stable across benign caller object and environment insertion order", () => {
  const input = fixtureInput()
  const first = buildP7VerificationFailureDispositionBinding(input)
  const intent = structuredClone(input.executionIntentPreimage) as MutableRecord
  intent.env = {
    NODE_ENV: "test",
    PATH: "/usr/local/bin:/usr/bin",
    KODAC_VERIFICATION: "1",
    TEMP: "",
    NO_COLOR: "1",
  }
  const reordered = {
    executionReceipt: structuredClone(input.executionReceipt),
    executionIntentPreimage: intent,
    failedCommandId: input.failedCommandId,
    sourceVerificationReportBindingInput: input.sourceVerificationReportBindingInput,
    sourceVerificationReportBinding: input.sourceVerificationReportBinding,
  } as P7VerificationFailureDispositionBindingBuildInput
  const second = buildP7VerificationFailureDispositionBinding(reordered)
  assert.equal(second.dispositionIdentity, first.dispositionIdentity)
  assert.equal(second.executionInputDigest, first.executionInputDigest)
  assert.equal(second.executionEnvironmentDigest, first.executionEnvironmentDigest)
})

test("P7-R7 rejects passing R6 and base-check-only failure", () => {
  const input = fixtureInput()
  const passing = structuredClone(input.sourceVerificationReportBindingInput.verificationReport) as MutableRecord
  for (const check of passing.checks) check.status = "pass"
  passing.passed = true
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding(rebuildR6(input, passing)),
    /must equal false/,
  )

  const baseOnly = structuredClone(input.sourceVerificationReportBindingInput.verificationReport) as MutableRecord
  for (const check of baseOnly.checks) check.status = "pass"
  baseOnly.checks.find((check: MutableRecord) => check.id === "workspace.integrity").status = "fail"
  baseOnly.passed = false
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding(rebuildR6(input, baseOnly)),
    /selected failed command check.status|must equal fail/,
  )
})

test("P7-R7 rejects report-only, bare-reference, and receipt-linkage mismatches", () => {
  const input = fixtureInput()
  const noReceipt = structuredClone(input.sourceVerificationReportBindingInput.verificationReport) as MutableRecord
  noReceipt.checks.find((check: MutableRecord) => check.id === `command.${FAILED_COMMAND_ID}`).evidence = []
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding(rebuildR6(input, noReceipt)),
    /must reference the exact supplied failure receipt id/,
  )

  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({ ...input, executionReceipt: { receiptId: FAILURE_RECEIPT_ID } }),
    /is missing required field/,
  )

  const wrongId = structuredClone(input.executionReceipt) as MutableRecord
  wrongId.receiptId = "323e4567-e89b-42d3-a456-426614174002"
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({ ...input, executionReceipt: wrongId }),
    /must reference the exact supplied failure receipt id/,
  )

  const wrongCapability = structuredClone(input.executionReceipt) as MutableRecord
  wrongCapability.capability = `verification.command.${OTHER_COMMAND_ID}`
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({ ...input, executionReceipt: wrongCapability }),
    /capability/,
  )
})

test("P7-R7 rejects non-failure outcomes, non-allow policy, and forbidden receipt authority fields", () => {
  const input = fixtureInput()
  for (const status of ["success", "blocked"]) {
    const receipt = structuredClone(input.executionReceipt) as MutableRecord
    receipt.result = { status, error: "not an eligible failure receipt" }
    assert.throws(
      () => buildP7VerificationFailureDispositionBinding({ ...input, executionReceipt: receipt }),
      /result.status/,
    )
  }

  const ask = structuredClone(input.executionReceipt) as MutableRecord
  ask.policy.decision = "ask"
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({ ...input, executionReceipt: ask }),
    /policy.decision/,
  )

  for (const field of ["approval", "confinement"]) {
    const receipt = structuredClone(input.executionReceipt) as MutableRecord
    receipt[field] = {}
    assert.throws(
      () => buildP7VerificationFailureDispositionBinding({ ...input, executionReceipt: receipt }),
      /contains unknown field/,
    )
  }
})

test("P7-R7 independently reconstructs the exact generic gateway command intent digest", () => {
  const input = fixtureInput()
  const badDigest = structuredClone(input.executionReceipt) as MutableRecord
  badDigest.inputDigest = "f".repeat(64)
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({ ...input, executionReceipt: badDigest }),
    /inputDigest/,
  )

  const mutations: Array<[string, (intent: MutableRecord) => void, RegExp]> = [
    ["args", (intent) => { intent.args = ["scripts/other.mjs"] }, /args/],
    ["exit codes", (intent) => { intent.allowedExitCodes = [1] }, /allowedExitCodes/],
    ["timeout", (intent) => { intent.timeoutMs = 30_001 }, /timeoutMs/],
    ["output", (intent) => { intent.maxOutputBytes = 123 }, /maxOutputBytes/],
    ["unknown env", (intent) => { intent.env.DANGEROUS = "1" }, /contains unknown field/],
    ["fixed env", (intent) => { intent.env.NODE_ENV = "production" }, /NODE_ENV/],
    ["executable", (intent) => { intent.resolvedExecutable = "/usr/local/bin/python3" }, /node semantic executable/],
  ]
  for (const [_name, mutate, expected] of mutations) {
    const intent = structuredClone(input.executionIntentPreimage) as MutableRecord
    mutate(intent)
    assert.throws(
      () => buildP7VerificationFailureDispositionBinding({ ...input, executionIntentPreimage: intent as P7VerificationExecutionIntentPreimage }),
      expected,
    )
  }
})

test("P7-R7 permits empty optional historical environment values but rejects custom Array prototypes", () => {
  const input = fixtureInput()
  const built = buildP7VerificationFailureDispositionBinding(input)
  assert.equal(built.executionInputDigest, gatewayInputDigest(input.executionIntentPreimage))

  class DerivedArray<T> extends Array<T> {}
  const intent = structuredClone(input.executionIntentPreimage) as MutableRecord
  intent.args = new DerivedArray<string>(...intent.args)
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({ ...input, executionIntentPreimage: intent as P7VerificationExecutionIntentPreimage }),
    /ordinary Array prototype/,
  )
})

test("P7-R7 revalidates exact R6/R5 predecessor lineage and rejects tampering", () => {
  const input = fixtureInput()
  const forgedR6 = structuredClone(input.sourceVerificationReportBinding) as MutableRecord
  forgedR6.verificationReportIdentity = "f".repeat(64)
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({ ...input, sourceVerificationReportBinding: forgedR6 as any }),
    /verificationReportIdentity|canonical source-derived|bindingIdentity/,
  )

  const sourceInput = structuredClone(input.sourceVerificationReportBindingInput) as MutableRecord
  sourceInput.sourceVerificationPlanBinding.verificationPlanDigest = "e".repeat(64)
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({
      ...input,
      sourceVerificationReportBindingInput: sourceInput,
    } as P7VerificationFailureDispositionBindingBuildInput),
    /verificationPlanDigest|canonical source-derived|bindingIdentity/,
  )
})

test("P7-R7 rejects hostile Proxy, accessor, symbol, sparse, aliased, and custom-prototype inputs", () => {
  const input = fixtureInput()

  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({
      ...input,
      executionReceipt: new Proxy(structuredClone(input.executionReceipt) as object, {}),
    }),
    /Proxy/,
  )

  const accessor = structuredClone(input.executionReceipt) as MutableRecord
  Object.defineProperty(accessor, "receiptId", { get: () => FAILURE_RECEIPT_ID, enumerable: true })
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({ ...input, executionReceipt: accessor }),
    /enumerable data property/,
  )

  const symbol = structuredClone(input.executionReceipt) as MutableRecord
  ;(symbol as any)[Symbol("hidden")] = "x"
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({ ...input, executionReceipt: symbol }),
    /symbol fields/,
  )

  const sparseIntent = structuredClone(input.executionIntentPreimage) as MutableRecord
  const sparse = new Array(2)
  sparse[0] = "scripts/run-tests.mjs"
  sparseIntent.args = sparse
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({ ...input, executionIntentPreimage: sparseIntent as P7VerificationExecutionIntentPreimage }),
    /sparse/,
  )

  const aliasIntent = structuredClone(input.executionIntentPreimage) as MutableRecord
  const shared: string[] = []
  aliasIntent.args = shared
  const aliasedReceipt = structuredClone(input.executionReceipt) as MutableRecord
  aliasedReceipt.paths = shared
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({
      ...input,
      executionIntentPreimage: aliasIntent as P7VerificationExecutionIntentPreimage,
      executionReceipt: aliasedReceipt,
    }),
    /aliases/,
  )

  const custom = structuredClone(input.executionReceipt) as MutableRecord
  Object.setPrototypeOf(custom, { marker: true })
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({ ...input, executionReceipt: custom }),
    /plain object/,
  )
})

test("P7-R7 output is detached, deeply immutable, and validates exact source-derived semantics", () => {
  const input = fixtureInput()
  const built = buildP7VerificationFailureDispositionBinding(input)
  const before = structuredClone(built)
  ;(input.executionIntentPreimage.env as MutableRecord).PATH = "/tampered"
  ;(input.executionReceipt as MutableRecord).result.error = "tampered after build"
  assert.deepEqual(built, before)
  assert.ok(Object.isFrozen(built))
  assert.ok(Object.isFrozen(built.failedCheckEvidence))
  for (const evidence of built.failedCheckEvidence) assert.ok(Object.isFrozen(evidence))

  const forged = structuredClone(built) as MutableRecord
  forged.failedCheckSummary = "forged"
  assert.throws(
    () => validateP7VerificationFailureDispositionBinding(forged, fixtureInput()),
    /canonical source-derived semantics|disposition/,
  )
})

test("P7-R7 identity binds execution evidence and source failure semantics", () => {
  const input = fixtureInput()
  const first = buildP7VerificationFailureDispositionBinding(input)

  const changedIntent = structuredClone(input.executionIntentPreimage) as MutableRecord
  changedIntent.env.PATH = "/different/bin"
  const changedReceipt = structuredClone(input.executionReceipt) as MutableRecord
  changedReceipt.inputDigest = gatewayInputDigest(changedIntent as P7VerificationExecutionIntentPreimage)
  const second = buildP7VerificationFailureDispositionBinding({
    ...input,
    executionIntentPreimage: changedIntent as P7VerificationExecutionIntentPreimage,
    executionReceipt: changedReceipt,
  })
  assert.notEqual(second.executionEnvironmentDigest, first.executionEnvironmentDigest)
  assert.notEqual(second.executionInputDigest, first.executionInputDigest)
  assert.notEqual(second.dispositionIdentity, first.dispositionIdentity)

  const errorReceipt = structuredClone(input.executionReceipt) as MutableRecord
  errorReceipt.result.error = "different failure evidence"
  const third = buildP7VerificationFailureDispositionBinding({ ...input, executionReceipt: errorReceipt })
  assert.notEqual(third.executionReceiptIdentity, first.executionReceiptIdentity)
  assert.notEqual(third.dispositionIdentity, first.dispositionIdentity)

  const report = structuredClone(input.sourceVerificationReportBindingInput.verificationReport) as MutableRecord
  report.checks.find((check: MutableRecord) => check.id === `command.${FAILED_COMMAND_ID}`).summary = "Different source failure summary."
  const fourth = buildP7VerificationFailureDispositionBinding(rebuildR6(input, report))
  assert.notEqual(fourth.verificationReportIdentity, first.verificationReportIdentity)
  assert.notEqual(fourth.dispositionIdentity, first.dispositionIdentity)
})

test("P7-R7 rejects failure receipts outside the exact bound report time interval", () => {
  const input = fixtureInput()
  const early = structuredClone(input.executionReceipt) as MutableRecord
  early.startedAt = "2026-09-05T12:00:02.999Z"
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({ ...input, executionReceipt: early }),
    /must not precede the bound verification report/,
  )

  const late = structuredClone(input.executionReceipt) as MutableRecord
  late.completedAt = "2026-09-05T12:00:04.001Z"
  assert.throws(
    () => buildP7VerificationFailureDispositionBinding({ ...input, executionReceipt: late }),
    /must not exceed the bound verification report/,
  )
})

test("P7-R7 schema mirrors the runtime output boundary", () => {
  assert.equal(schema.$id, "https://kodac.dev/schema/p7-verification-failure-disposition-binding.schema.json")
  assert.equal(schema.additionalProperties, false)
  assert.equal(schema.properties.version.const, P7_R7_VERIFICATION_FAILURE_DISPOSITION_BINDING_VERSION)
  assert.equal(schema.properties.state.const, P7_R7_VERIFICATION_FAILED_STATE)
  const required = new Set(schema.required as string[])
  for (const field of [
    "dispositionIdentity",
    "sourceVerificationReportBindingIdentity",
    "verificationReportIdentity",
    "failedCommandId",
    "failedCheckEvidence",
    "executionReceiptIdentity",
    "executionReceiptId",
    "executionInputDigest",
    "executionResolvedExecutable",
    "executionEnvironmentDigest",
    "executionFailureError",
  ]) {
    assert.ok(required.has(field), `schema must require ${field}`)
  }
  assert.deepEqual(schema.properties.failedCommandCategory.enum, ["syntax", "types", "lint", "tests", "custom"])
  assert.equal(schema.properties.failedCheckEvidence.minItems, 1)
  assert.equal(schema.properties.failedCheckEvidence.uniqueItems, true)
  assert.equal(schema.properties.executionTimeoutMs.maximum, 120_000)
  assert.equal(schema.properties.executionMaxOutputBytes.maximum, 1_048_576)
})

test("P7-R7 production source remains pure data-only and contains no side-effect authority", () => {
  assert.match(sourceText, /validateP7PostApplyVerificationReportBinding/)
  assert.match(sourceText, /validateP7PostApplyVerificationPlanBinding/)
  for (const forbidden of [
    "runVerificationEngine",
    "planVerification(",
    "ExecutionGateway",
    "DoneGate",
    "node:fs",
    "node:child_process",
    "node:net",
    "process.env",
    "repo.apply_patch",
    "fetch(",
    "axios",
  ]) {
    assert.equal(sourceText.includes(forbidden), false, `source must not contain ${forbidden}`)
  }
})
