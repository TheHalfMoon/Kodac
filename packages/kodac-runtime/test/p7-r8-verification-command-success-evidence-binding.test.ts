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
  P7_R8_VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BINDING_VERSION,
  P7_R8_VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND_STATE,
  P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS,
  buildP7VerificationCommandSuccessEvidenceBinding,
  p7VerificationCommandSuccessEvidenceBindingIdentity,
  validateP7VerificationCommandSuccessEvidenceBinding,
  type P7VerificationCommandSuccessEvidenceBindingBuildInput,
  type P7VerificationCommandSuccessExecutionIntentPreimage,
} from "../src/remediation/p7-verification-command-success-evidence-binding.ts"

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
const TEST_RECEIPT_ID = "223e4567-e89b-42d3-a456-426614174001"
const TYPES_RECEIPT_ID = "323e4567-e89b-42d3-a456-426614174002"
const GENERATED_AT = "2026-09-05T12:00:02.000Z"
const REPORT_STARTED_AT = "2026-09-05T12:00:03.000Z"
const REPORT_COMPLETED_AT = "2026-09-05T12:00:04.000Z"
const TEST_STARTED_AT = "2026-09-05T12:00:03.100Z"
const TEST_COMPLETED_AT = "2026-09-05T12:00:03.400Z"
const TYPES_STARTED_AT = "2026-09-05T12:00:03.500Z"
const TYPES_COMPLETED_AT = "2026-09-05T12:00:03.900Z"
const WORKSPACE = "/workspace/kodac"
const TEST_COMMAND_ID = "js-root-tests-123abc"
const TYPES_COMMAND_ID = "js-root-types-456def"

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
    claimKey: "p7-r8-source-finding",
    review: {
      reviewRunId: "review-run-p7-r8",
      reviewerId: "provider:test",
      reviewerVersion: "v1",
      policyIdentity: "policy:p7-r8-test",
      canonicalBase: BASE,
      reviewedHead: HEAD,
    },
    path: "src/example.ts",
    range: { startLine: 10, endLine: 12 },
    summary: "A confirmed finding eligible for bounded remediation verification command evidence binding.",
    contractClaim: "The candidate violates one bounded invariant.",
    category: "correctness",
    severity: "high",
    confidenceBps: 9000,
    evidenceRefs: ["evidence:finding"],
  }
}

function sourceProposal(): P7ImmutablePatchProposal {
  const runtime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-r8-test-adjudicator" })
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
    proposerIdentity: "kodac:p7-r8-test-proposer",
    patchArtifactDigest: sha256(PATCH),
    changes: CHANGES,
  })
}

function sourceAuthorization(source: P7ImmutablePatchProposal): P7PatchApplicationAuthorization {
  return buildP7PatchApplicationAuthorization({
    sourceProposal: source,
    declaration: {
      authorizerIdentity: "kodac:p7-r8-test-authorizer",
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
        id: TEST_COMMAND_ID,
        category: "tests",
        executable: "node",
        args: ["scripts/run-tests.mjs"],
        timeoutMs: 120_000,
        maxOutputBytes: 1_048_576,
      },
      {
        id: TYPES_COMMAND_ID,
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

function verificationReport(plan: P7VerificationPlanInput): MutableRecord {
  const commandReceiptIds = new Map([
    [TEST_COMMAND_ID, TEST_RECEIPT_ID],
    [TYPES_COMMAND_ID, TYPES_RECEIPT_ID],
  ])
  const base = [
    { id: "agent.completed", category: "agent", status: "pass", summary: "Agent completed.", evidence: [{ kind: "event", ref: "session:p7-r8:agent.loop.completed" }] },
    { id: "workspace.integrity", category: "workspace", status: "pass", summary: "Workspace intact.", evidence: [{ kind: "workspace", ref: WORKSPACE, digest: sha256(WORKSPACE) }] },
    { id: "git.diff", category: "diff", status: "pass", summary: "Diff evidenced.", evidence: [{ kind: "receipt", ref: APPLY_RECEIPT_ID }] },
    { id: "evidence.receipts", category: "receipts", status: "pass", summary: "Receipts valid.", evidence: [{ kind: "receipt", ref: APPLY_RECEIPT_ID }, { kind: "receipt", ref: TEST_RECEIPT_ID }, { kind: "receipt", ref: TYPES_RECEIPT_ID }] },
    { id: "evidence.policy", category: "policy", status: "pass", summary: "Policy allowed.", evidence: [{ kind: "receipt", ref: APPLY_RECEIPT_ID }, { kind: "receipt", ref: TEST_RECEIPT_ID }, { kind: "receipt", ref: TYPES_RECEIPT_ID }] },
  ]
  const commands = plan.commands.map((command) => ({
    id: `command.${command.id}`,
    category: command.category,
    status: "pass",
    summary: `Command ${command.id} passed.`,
    evidence: [{ kind: "receipt", ref: commandReceiptIds.get(command.id)! }],
  }))
  return {
    protocol: "kodac.verification",
    version: 1,
    sessionId: "session-p7-r8",
    startedAt: REPORT_STARTED_AT,
    completedAt: REPORT_COMPLETED_AT,
    passed: true,
    checks: [
      ...base,
      ...commands,
      {
        id: "verification.commands",
        category: "tests",
        status: "pass",
        summary: "All verification commands passed.",
        evidence: commands.flatMap((command) => command.evidence.map((item) => ({ ...item }))),
      },
    ],
  }
}

function r6Input(report?: MutableRecord): P7PostApplyVerificationReportBindingBuildInput {
  const sourceVerificationPlanBindingInput = r5Input()
  return {
    sourceVerificationPlanBinding: buildP7PostApplyVerificationPlanBinding(sourceVerificationPlanBindingInput),
    sourceVerificationPlanBindingInput,
    verificationReport: report ?? verificationReport(sourceVerificationPlanBindingInput.verificationPlan),
  }
}

function canonicalEnvironment(env: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(env).sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0),
  )
}

function testIntent(): P7VerificationCommandSuccessExecutionIntentPreimage {
  return {
    resolvedExecutable: "/usr/local/bin/node",
    args: ["scripts/run-tests.mjs"],
    allowedExitCodes: [0],
    maxOutputBytes: 1_048_576,
    timeoutMs: 120_000,
    env: {
      TEMP: "",
      PATH: "/usr/local/bin:/usr/bin",
      NO_COLOR: "1",
      KODAC_VERIFICATION: "1",
      NODE_ENV: "test",
    },
  }
}

function typesIntent(): P7VerificationCommandSuccessExecutionIntentPreimage {
  return {
    resolvedExecutable: "/usr/local/bin/node",
    args: ["node_modules/typescript/bin/tsc", "-p", "tsconfig.json", "--noEmit"],
    allowedExitCodes: [0],
    maxOutputBytes: 1_048_576,
    timeoutMs: 60_000,
    env: {
      NODE_ENV: "test",
      KODAC_VERIFICATION: "1",
      NO_COLOR: "1",
      PATH: "/usr/local/bin:/usr/bin",
      TMPDIR: "/tmp",
    },
  }
}

function gatewayInputDigest(intent: P7VerificationCommandSuccessExecutionIntentPreimage): string {
  return sha256(JSON.stringify({
    executable: intent.resolvedExecutable,
    args: [...intent.args],
    allowedExitCodes: [0],
    maxOutputBytes: intent.maxOutputBytes,
    timeoutMs: intent.timeoutMs,
    env: canonicalEnvironment({ ...intent.env }),
  }))
}

function successReceipt(
  commandId: string,
  receiptId: string,
  intent: P7VerificationCommandSuccessExecutionIntentPreimage,
  startedAt: string,
  completedAt: string,
  output: string,
): MutableRecord {
  return {
    receiptId,
    capability: `verification.command.${commandId}`,
    inputDigest: gatewayInputDigest(intent),
    paths: [],
    policy: { decision: "allow", reason: "explicit --approve-verification authorization" },
    startedAt,
    completedAt,
    result: {
      status: "success",
      outputDigest: sha256(output),
      outputBytes: Buffer.byteLength(output, "utf8"),
      exitCode: 0,
    },
  }
}

function fixtureInput(): P7VerificationCommandSuccessEvidenceBindingBuildInput {
  const sourceVerificationReportBindingInput = r6Input()
  const testExecutionIntentPreimage = testIntent()
  const typesExecutionIntentPreimage = typesIntent()
  return {
    sourceVerificationReportBinding: buildP7PostApplyVerificationReportBinding(sourceVerificationReportBindingInput),
    sourceVerificationReportBindingInput,
    commandExecutionEvidence: [
      {
        commandId: TEST_COMMAND_ID,
        executionIntentPreimage: testExecutionIntentPreimage,
        executionReceipt: successReceipt(
          TEST_COMMAND_ID,
          TEST_RECEIPT_ID,
          testExecutionIntentPreimage,
          TEST_STARTED_AT,
          TEST_COMPLETED_AT,
          "tests passed\u0000",
        ),
      },
      {
        commandId: TYPES_COMMAND_ID,
        executionIntentPreimage: typesExecutionIntentPreimage,
        executionReceipt: successReceipt(
          TYPES_COMMAND_ID,
          TYPES_RECEIPT_ID,
          typesExecutionIntentPreimage,
          TYPES_STARTED_AT,
          TYPES_COMPLETED_AT,
          "types passed\u0000",
        ),
      },
    ],
  }
}

function rebuildR6(
  input: P7VerificationCommandSuccessEvidenceBindingBuildInput,
  report: MutableRecord,
): P7VerificationCommandSuccessEvidenceBindingBuildInput {
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

function mutableCommandEvidence(input: P7VerificationCommandSuccessEvidenceBindingBuildInput): MutableRecord[] {
  return structuredClone(input.commandExecutionEvidence) as unknown as MutableRecord[]
}

function withCommandEvidence(
  input: P7VerificationCommandSuccessEvidenceBindingBuildInput,
  commandExecutionEvidence: MutableRecord[],
): P7VerificationCommandSuccessEvidenceBindingBuildInput {
  return {
    ...input,
    commandExecutionEvidence:
      commandExecutionEvidence as unknown as P7VerificationCommandSuccessEvidenceBindingBuildInput["commandExecutionEvidence"],
  }
}

const schema = JSON.parse(
  readFileSync(new URL("../../../schema/p7-verification-command-success-evidence-binding.schema.json", import.meta.url), "utf8"),
) as UnknownRecord
const sourceText = readFileSync(
  new URL("../src/remediation/p7-verification-command-success-evidence-binding.ts", import.meta.url),
  "utf8",
)

test("P7-R8 builds and validates one deterministic command-success evidence record", () => {
  const input = fixtureInput()
  const built = buildP7VerificationCommandSuccessEvidenceBinding(input)
  assert.equal(built.version, P7_R8_VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BINDING_VERSION)
  assert.equal(built.state, P7_R8_VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND_STATE)
  assert.equal(built.sourceVerificationReportBindingIdentity, input.sourceVerificationReportBinding.bindingIdentity)
  assert.equal(built.commandCount, 2)
  assert.equal(built.testCommandCount, 1)
  assert.deepEqual(built.commands.map((command) => command.commandId), [TEST_COMMAND_ID, TYPES_COMMAND_ID])
  assert.equal(built.commands[0]!.executionReceiptId, TEST_RECEIPT_ID)
  assert.equal(built.commands[1]!.executionReceiptId, TYPES_RECEIPT_ID)
  assert.equal(built.commands[0]!.executionExitCode, 0)
  assert.equal(built.evidenceIdentity, p7VerificationCommandSuccessEvidenceBindingIdentity(input))
  assert.deepEqual(validateP7VerificationCommandSuccessEvidenceBinding(built, input), built)
})

test("P7-R8 canonicalizes caller evidence and environment insertion order to exact R5 plan order", () => {
  const input = fixtureInput()
  const first = buildP7VerificationCommandSuccessEvidenceBinding(input)
  const reordered = mutableCommandEvidence(input)
  reordered.reverse()
  for (const entry of reordered) {
    entry.executionIntentPreimage.env = Object.fromEntries(Object.entries(entry.executionIntentPreimage.env).reverse())
  }
  const second = buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, reordered))
  assert.equal(second.evidenceIdentity, first.evidenceIdentity)
  assert.deepEqual(second.commands, first.commands)
})

test("P7-R8 rejects failed R6 truth even when command evidence is supplied", () => {
  const input = fixtureInput()
  const report = structuredClone(input.sourceVerificationReportBindingInput.verificationReport) as unknown as MutableRecord
  report.checks.find((check: MutableRecord) => check.id === `command.${TEST_COMMAND_ID}`).status = "fail"
  report.passed = false
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding(rebuildR6(input, report)),
    /must equal true/,
  )
})

test("P7-R8 rejects missing, extra, duplicate command evidence and duplicate receipt ids", () => {
  const input = fixtureInput()
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding({ ...input, commandExecutionEvidence: [input.commandExecutionEvidence[0]!] }),
    /exactly one entry for every exact P7-R5 planned command/,
  )

  const extra = mutableCommandEvidence(input)
  extra.push({ ...structuredClone(extra[0]), commandId: "unplanned-command" })
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, extra)),
    /exactly one entry|outside the exact P7-R5 plan/,
  )

  const duplicateCommand = mutableCommandEvidence(input)
  duplicateCommand[1]!.commandId = TEST_COMMAND_ID
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, duplicateCommand)),
    /duplicate command id/,
  )

  const duplicateReceipt = mutableCommandEvidence(input)
  duplicateReceipt[1]!.executionReceipt.receiptId = TEST_RECEIPT_ID
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, duplicateReceipt)),
    /duplicate receipt id/,
  )
})

test("P7-R8 rejects command-check linkage drift while preserving a structurally passing R6 report", () => {
  const input = fixtureInput()
  const report = structuredClone(input.sourceVerificationReportBindingInput.verificationReport) as unknown as MutableRecord
  const check = report.checks.find((candidate: MutableRecord) => candidate.id === `command.${TEST_COMMAND_ID}`)
  check.evidence = [{ kind: "receipt", ref: "other-command-receipt" }]
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding(rebuildR6(input, report)),
    /must reference the exact supplied success receipt id exactly once/,
  )
})

test("P7-R8 rejects non-success receipt semantics and forbidden receipt authority fields", () => {
  const input = fixtureInput()
  const mutateReceipt = (mutate: (receipt: MutableRecord) => void, expected: RegExp): void => {
    const evidence = mutableCommandEvidence(input)
    mutate(evidence[0]!.executionReceipt)
    assert.throws(
      () => buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, evidence)),
      expected,
    )
  }

  mutateReceipt((receipt) => { receipt.result = { status: "failure", error: "failed" } }, /result.*missing|required|unknown|status/)
  mutateReceipt((receipt) => { receipt.result = { status: "blocked", reason: "blocked" } }, /result.*missing|required|unknown|status/)
  mutateReceipt((receipt) => { receipt.result.exitCode = 1 }, /exitCode/)
  mutateReceipt((receipt) => { receipt.result = { status: "success", affected: {}, postStateDigest: POST_STATE } }, /result.*unknown|missing required field/)
  mutateReceipt((receipt) => { receipt.policy.decision = "ask" }, /policy.decision/)
  mutateReceipt((receipt) => { receipt.approval = {} }, /unknown field/)
  mutateReceipt((receipt) => { receipt.confinement = {} }, /unknown field/)
  mutateReceipt((receipt) => { receipt.paths = ["src/a.ts"] }, /paths/)
})

test("P7-R8 independently reconstructs exact generic gateway command intent for every command", () => {
  const input = fixtureInput()
  const mutations: Array<[string, (entry: MutableRecord) => void, RegExp]> = [
    ["digest", (entry) => { entry.executionReceipt.inputDigest = "f".repeat(64) }, /inputDigest/],
    ["args", (entry) => { entry.executionIntentPreimage.args = ["scripts/other.mjs"] }, /args/],
    ["exit codes", (entry) => { entry.executionIntentPreimage.allowedExitCodes = [1] }, /allowedExitCodes/],
    ["timeout", (entry) => { entry.executionIntentPreimage.timeoutMs = 119_999 }, /timeoutMs/],
    ["output", (entry) => { entry.executionIntentPreimage.maxOutputBytes = 123 }, /maxOutputBytes/],
    ["unknown env", (entry) => { entry.executionIntentPreimage.env.DANGEROUS = "1" }, /unknown field/],
    ["fixed env", (entry) => { entry.executionIntentPreimage.env.NODE_ENV = "production" }, /NODE_ENV/],
    ["executable", (entry) => { entry.executionIntentPreimage.resolvedExecutable = "/usr/local/bin/python3" }, /node semantic executable/],
  ]
  for (const [_name, mutate, expected] of mutations) {
    const evidence = mutableCommandEvidence(input)
    mutate(evidence[0]!)
    assert.throws(
      () => buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, evidence)),
      expected,
    )
  }
})

test("P7-R8 rejects receipt intervals outside the bound report and invalid output byte bounds", () => {
  const input = fixtureInput()

  const early = mutableCommandEvidence(input)
  early[0]!.executionReceipt.startedAt = "2026-09-05T12:00:02.999Z"
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, early)),
    /must not precede the bound verification report/,
  )

  const late = mutableCommandEvidence(input)
  late[1]!.executionReceipt.completedAt = "2026-09-05T12:00:04.001Z"
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, late)),
    /must not exceed the bound verification report/,
  )

  for (const outputBytes of [-1, P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxReceiptOutputBytes + 1]) {
    const evidence = mutableCommandEvidence(input)
    evidence[0]!.executionReceipt.result.outputBytes = outputBytes
    assert.throws(
      () => buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, evidence)),
      /outputBytes/,
    )
  }
})

test("P7-R8 revalidates exact R6/R5 predecessor lineage and rejects tampering", () => {
  const input = fixtureInput()
  const forgedR6 = structuredClone(input.sourceVerificationReportBinding) as unknown as MutableRecord
  forgedR6.verificationReportIdentity = "f".repeat(64)
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding({ ...input, sourceVerificationReportBinding: forgedR6 as any }),
    /verificationReportIdentity|canonical source-derived|bindingIdentity/,
  )

  const sourceInput = structuredClone(input.sourceVerificationReportBindingInput) as unknown as MutableRecord
  sourceInput.sourceVerificationPlanBinding.verificationPlanDigest = "e".repeat(64)
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding({
      ...input,
      sourceVerificationReportBindingInput: sourceInput,
    } as P7VerificationCommandSuccessEvidenceBindingBuildInput),
    /verificationPlanDigest|canonical source-derived|bindingIdentity/,
  )
})

test("P7-R8 rejects hostile Proxy, accessor, symbol, sparse, aliased, and custom-prototype inputs", () => {
  const input = fixtureInput()

  const proxyEvidence = mutableCommandEvidence(input)
  proxyEvidence[0]!.executionReceipt = new Proxy(proxyEvidence[0]!.executionReceipt as object, {})
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, proxyEvidence)),
    /Proxy/,
  )

  const accessorEvidence = mutableCommandEvidence(input)
  Object.defineProperty(accessorEvidence[0]!.executionReceipt, "receiptId", { get: () => TEST_RECEIPT_ID, enumerable: true })
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, accessorEvidence)),
    /enumerable data property/,
  )

  const symbolEvidence = mutableCommandEvidence(input)
  ;(symbolEvidence[0]!.executionReceipt as MutableRecord)[Symbol("hidden") as any] = "x"
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, symbolEvidence)),
    /symbol fields/,
  )

  const sparseEvidence = mutableCommandEvidence(input)
  const sparse = new Array(2)
  sparse[0] = "scripts/run-tests.mjs"
  sparseEvidence[0]!.executionIntentPreimage.args = sparse
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, sparseEvidence)),
    /sparse/,
  )

  const aliasEvidence = mutableCommandEvidence(input)
  const shared: unknown[] = []
  aliasEvidence[0]!.executionIntentPreimage.allowedExitCodes = shared
  aliasEvidence[0]!.executionReceipt.paths = shared
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, aliasEvidence)),
    /aliases/,
  )

  const customEvidence = mutableCommandEvidence(input)
  Object.setPrototypeOf(customEvidence[0]!.executionReceipt, { marker: true })
  assert.throws(
    () => buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, customEvidence)),
    /plain object/,
  )
})

test("P7-R8 output is detached, deeply immutable, and validator rejects forged semantics", () => {
  const input = fixtureInput()
  const built = buildP7VerificationCommandSuccessEvidenceBinding(input)
  const before = structuredClone(built)
  ;(input.commandExecutionEvidence[0]!.executionIntentPreimage.env as unknown as MutableRecord).PATH = "/tampered"
  ;(input.commandExecutionEvidence[0]!.executionReceipt as MutableRecord).result.outputDigest = "f".repeat(64)
  assert.deepEqual(built, before)
  assert.ok(Object.isFrozen(built))
  assert.ok(Object.isFrozen(built.commands))
  for (const command of built.commands) {
    assert.ok(Object.isFrozen(command))
    assert.ok(Object.isFrozen(command.checkEvidence))
    for (const evidence of command.checkEvidence) assert.ok(Object.isFrozen(evidence))
  }

  const forged = structuredClone(built) as unknown as MutableRecord
  forged.commands[0].checkSummary = "forged"
  assert.throws(
    () => validateP7VerificationCommandSuccessEvidenceBinding(forged, fixtureInput()),
    /canonical source-derived semantics|evidenceIdentity/,
  )
})

test("P7-R8 identity binds command intent, receipt result, and R6 command-check semantics", () => {
  const input = fixtureInput()
  const first = buildP7VerificationCommandSuccessEvidenceBinding(input)

  const changedIntentEvidence = mutableCommandEvidence(input)
  changedIntentEvidence[0]!.executionIntentPreimage.env.PATH = "/different/bin"
  changedIntentEvidence[0]!.executionReceipt.inputDigest = gatewayInputDigest(
    changedIntentEvidence[0]!.executionIntentPreimage as P7VerificationCommandSuccessExecutionIntentPreimage,
  )
  const second = buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, changedIntentEvidence))
  assert.notEqual(second.commands[0]!.executionEnvironmentDigest, first.commands[0]!.executionEnvironmentDigest)
  assert.notEqual(second.commands[0]!.executionInputDigest, first.commands[0]!.executionInputDigest)
  assert.notEqual(second.evidenceIdentity, first.evidenceIdentity)

  const outputEvidence = mutableCommandEvidence(input)
  outputEvidence[0]!.executionReceipt.result.outputDigest = "f".repeat(64)
  const third = buildP7VerificationCommandSuccessEvidenceBinding(withCommandEvidence(input, outputEvidence))
  assert.notEqual(third.commands[0]!.executionReceiptIdentity, first.commands[0]!.executionReceiptIdentity)
  assert.notEqual(third.evidenceIdentity, first.evidenceIdentity)

  const report = structuredClone(input.sourceVerificationReportBindingInput.verificationReport) as unknown as MutableRecord
  report.checks.find((check: MutableRecord) => check.id === `command.${TEST_COMMAND_ID}`).summary = "Different passing command summary."
  const fourth = buildP7VerificationCommandSuccessEvidenceBinding(rebuildR6(input, report))
  assert.notEqual(fourth.verificationReportIdentity, first.verificationReportIdentity)
  assert.notEqual(fourth.evidenceIdentity, first.evidenceIdentity)
})

test("P7-R8 schema mirrors the runtime output boundary", () => {
  assert.equal(schema.$id, "https://kodac.dev/schema/p7-verification-command-success-evidence-binding.schema.json")
  assert.equal(schema.additionalProperties, false)
  assert.equal(schema.properties.version.const, P7_R8_VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BINDING_VERSION)
  assert.equal(schema.properties.state.const, P7_R8_VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND_STATE)
  const required = new Set(schema.required as string[])
  for (const field of [
    "evidenceIdentity",
    "sourceVerificationReportBindingIdentity",
    "verificationReportIdentity",
    "verificationStartedAt",
    "verificationCompletedAt",
    "commandCount",
    "testCommandCount",
    "commands",
  ]) {
    assert.ok(required.has(field), `schema must require ${field}`)
  }
  assert.equal(schema.properties.commands.minItems, 1)
  assert.equal(schema.properties.commands.maxItems, P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxCommands)
  assert.equal(schema.properties.commands.uniqueItems, true)
  const command = schema.properties.commands.items
  assert.equal(command.additionalProperties, false)
  assert.deepEqual(command.properties.commandCategory.enum, ["syntax", "types", "lint", "tests", "custom"])
  assert.equal(command.properties.executionTimeoutMs.maximum, 120_000)
  assert.equal(command.properties.executionMaxOutputBytes.maximum, 1_048_576)
  assert.equal(command.properties.executionOutputBytes.maximum, P7_R8_VERIFICATION_COMMAND_SUCCESS_LIMITS.maxReceiptOutputBytes)
  assert.equal(command.properties.executionExitCode.const, 0)
})

test("P7-R8 production source remains pure data-only and contains no side-effect authority", () => {
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
