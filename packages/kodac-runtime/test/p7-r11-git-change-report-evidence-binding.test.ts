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
  buildP7VerificationCommandSuccessEvidenceBinding,
  type P7VerificationCommandSuccessEvidenceBindingBuildInput,
  type P7VerificationCommandSuccessExecutionIntentPreimage,
} from "../src/remediation/p7-verification-command-success-evidence-binding.ts"
import {
  buildP7AgentCompletionEvidenceBinding,
  type P7AgentCompletionEvidenceBindingBuildInput,
} from "../src/remediation/p7-agent-completion-evidence-binding.ts"
import {
  buildP7WorkspaceReferenceEvidenceBinding,
  type P7WorkspaceReferenceEvidenceBindingBuildInput,
} from "../src/remediation/p7-workspace-reference-evidence-binding.ts"
import {
  P7_R11_GIT_CHANGE_REPORT_EVIDENCE_BINDING_VERSION,
  P7_R11_GIT_CHANGE_REPORT_EVIDENCE_BOUND_STATE,
  buildP7GitChangeReportEvidenceBinding,
  p7GitChangeReportEvidenceBindingIdentity,
  validateP7GitChangeReportEvidenceBinding,
  type P7GitChangeReportEvidenceBindingBuildInput,
} from "../src/remediation/p7-git-change-report-evidence-binding.ts"

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
const EVENT_ID = "423e4567-e89b-42d3-a456-426614174003"
const GIT_DIFF_RECEIPT_ID = "523e4567-e89b-42d3-a456-426614174004"
const GIT_STATUS_RECEIPT_ID = "623e4567-e89b-42d3-a456-426614174005"
const GENERATED_AT = "2026-09-05T12:00:02.000Z"
const COMPLETED_EVENT_AT = "2026-09-05T12:00:02.500Z"
const REPORT_STARTED_AT = "2026-09-05T12:00:03.000Z"
const REPORT_COMPLETED_AT = "2026-09-05T12:00:04.000Z"
const TEST_STARTED_AT = "2026-09-05T12:00:03.100Z"
const TEST_COMPLETED_AT = "2026-09-05T12:00:03.400Z"
const TYPES_STARTED_AT = "2026-09-05T12:00:03.500Z"
const TYPES_COMPLETED_AT = "2026-09-05T12:00:03.900Z"
const WORKSPACE = "/workspace/kodac"
const SESSION_ID = "session-p7-r11"
const TEST_COMMAND_ID = "js-root-tests-123abc"
const TYPES_COMMAND_ID = "js-root-types-456def"
const GIT_SUMMARY = "Workspace changes are evidenced (diffBytes=12, statusBytes=3)."

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
    claimKey: "p7-r11-source-finding",
    review: {
      reviewRunId: "review-run-p7-r11",
      reviewerId: "provider:test",
      reviewerVersion: "v1",
      policyIdentity: "policy:p7-r11-test",
      canonicalBase: BASE,
      reviewedHead: HEAD,
    },
    path: "src/example.ts",
    range: { startLine: 10, endLine: 12 },
    summary: "A confirmed finding eligible for bounded git-change report evidence binding.",
    contractClaim: "The candidate violates one bounded invariant.",
    category: "correctness",
    severity: "high",
    confidenceBps: 9000,
    evidenceRefs: ["evidence:finding"],
  }
}

function sourceProposal(): P7ImmutablePatchProposal {
  const runtime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-r11-test-adjudicator" })
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
    proposerIdentity: "kodac:p7-r11-test-proposer",
    patchArtifactDigest: sha256(PATCH),
    changes: CHANGES,
  })
}

function sourceAuthorization(source: P7ImmutablePatchProposal): P7PatchApplicationAuthorization {
  return buildP7PatchApplicationAuthorization({
    sourceProposal: source,
    declaration: {
      authorizerIdentity: "kodac:p7-r11-test-authorizer",
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
    {
      id: "agent.completed",
      category: "agent",
      status: "pass",
      summary: "Bounded agent loop completed normally.",
      evidence: [{ kind: "event", ref: `session:${SESSION_ID}:agent.loop.completed` }],
    },
    {
      id: "workspace.integrity",
      category: "workspace",
      status: "pass",
      summary: "Workspace root and Git metadata are present.",
      evidence: [{ kind: "workspace", ref: WORKSPACE, digest: sha256(WORKSPACE) }],
    },
    {
      id: "git.diff",
      category: "diff",
      status: "pass",
      summary: GIT_SUMMARY,
      evidence: [
        { kind: "receipt", ref: GIT_STATUS_RECEIPT_ID },
        { kind: "receipt", ref: GIT_DIFF_RECEIPT_ID },
      ],
    },
    {
      id: "evidence.receipts",
      category: "receipts",
      status: "pass",
      summary: "Receipts valid.",
      evidence: [
        { kind: "receipt", ref: APPLY_RECEIPT_ID },
        { kind: "receipt", ref: GIT_DIFF_RECEIPT_ID },
        { kind: "receipt", ref: GIT_STATUS_RECEIPT_ID },
        { kind: "receipt", ref: TEST_RECEIPT_ID },
        { kind: "receipt", ref: TYPES_RECEIPT_ID },
      ],
    },
    {
      id: "evidence.policy",
      category: "policy",
      status: "pass",
      summary: "Policy allowed.",
      evidence: [
        { kind: "receipt", ref: APPLY_RECEIPT_ID },
        { kind: "receipt", ref: GIT_DIFF_RECEIPT_ID },
        { kind: "receipt", ref: GIT_STATUS_RECEIPT_ID },
        { kind: "receipt", ref: TEST_RECEIPT_ID },
        { kind: "receipt", ref: TYPES_RECEIPT_ID },
      ],
    },
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
    sessionId: SESSION_ID,
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
  return Object.fromEntries(Object.entries(env).sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0))
}

function testIntent(): P7VerificationCommandSuccessExecutionIntentPreimage {
  return {
    resolvedExecutable: "/usr/local/bin/node",
    args: ["scripts/run-tests.mjs"],
    allowedExitCodes: [0],
    maxOutputBytes: 1_048_576,
    timeoutMs: 120_000,
    env: { NODE_ENV: "test", KODAC_VERIFICATION: "1", NO_COLOR: "1", PATH: "/usr/local/bin:/usr/bin", TEMP: "" },
  }
}

function typesIntent(): P7VerificationCommandSuccessExecutionIntentPreimage {
  return {
    resolvedExecutable: "/usr/local/bin/node",
    args: ["node_modules/typescript/bin/tsc", "-p", "tsconfig.json", "--noEmit"],
    allowedExitCodes: [0],
    maxOutputBytes: 1_048_576,
    timeoutMs: 60_000,
    env: { NODE_ENV: "test", KODAC_VERIFICATION: "1", NO_COLOR: "1", PATH: "/usr/local/bin:/usr/bin", TMPDIR: "/tmp" },
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

function r8Input(report?: MutableRecord): P7VerificationCommandSuccessEvidenceBindingBuildInput {
  const sourceVerificationReportBindingInput = r6Input(report)
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
          "tests passed",
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
          "types passed",
        ),
      },
    ],
  }
}

function completionEvent(): MutableRecord {
  return {
    protocol: "kodac.event",
    version: 1,
    eventId: EVENT_ID,
    sessionId: SESSION_ID,
    sequence: 17,
    emittedAt: COMPLETED_EVENT_AT,
    type: "agent.loop.completed",
    payload: {
      reason: "completed",
      budget: { turnsUsed: 2, toolCallsUsed: 1, failuresUsed: 0, elapsedMs: 1_234 },
    },
  }
}

function r9Input(report?: MutableRecord): P7AgentCompletionEvidenceBindingBuildInput {
  const sourceCommandSuccessEvidenceBindingInput = r8Input(report)
  return {
    sourceCommandSuccessEvidenceBinding: buildP7VerificationCommandSuccessEvidenceBinding(sourceCommandSuccessEvidenceBindingInput),
    sourceCommandSuccessEvidenceBindingInput,
    agentCompletionEvent: completionEvent(),
  }
}

function r10Input(report?: MutableRecord): P7WorkspaceReferenceEvidenceBindingBuildInput {
  const sourceAgentCompletionEvidenceBindingInput = r9Input(report)
  return {
    sourceAgentCompletionEvidenceBinding: buildP7AgentCompletionEvidenceBinding(sourceAgentCompletionEvidenceBindingInput),
    sourceAgentCompletionEvidenceBindingInput,
  }
}

function fixtureInput(report?: MutableRecord): P7GitChangeReportEvidenceBindingBuildInput {
  const sourceWorkspaceReferenceEvidenceBindingInput = r10Input(report)
  return {
    sourceWorkspaceReferenceEvidenceBinding: buildP7WorkspaceReferenceEvidenceBinding(sourceWorkspaceReferenceEvidenceBindingInput),
    sourceWorkspaceReferenceEvidenceBindingInput,
  }
}

function reportFrom(input: P7GitChangeReportEvidenceBindingBuildInput): MutableRecord {
  return structuredClone(
    input.sourceWorkspaceReferenceEvidenceBindingInput.sourceAgentCompletionEvidenceBindingInput
      .sourceCommandSuccessEvidenceBindingInput.sourceVerificationReportBindingInput.verificationReport,
  ) as MutableRecord
}

function rebuildWithReport(report: MutableRecord): P7GitChangeReportEvidenceBindingBuildInput {
  return fixtureInput(report)
}

function gitCheck(report: MutableRecord): MutableRecord {
  return report.checks.find((candidate: MutableRecord) => candidate.id === "git.diff")
}

const schema = JSON.parse(
  readFileSync(new URL("../../../schema/p7-git-change-report-evidence-binding.schema.json", import.meta.url), "utf8"),
) as UnknownRecord
const sourceText = readFileSync(
  new URL("../src/remediation/p7-git-change-report-evidence-binding.ts", import.meta.url),
  "utf8",
)

test("P7-R11 builds and validates one deterministic GIT_CHANGE_REPORT_EVIDENCE_BOUND record", () => {
  const input = fixtureInput()
  const built = buildP7GitChangeReportEvidenceBinding(input)
  assert.equal(built.version, P7_R11_GIT_CHANGE_REPORT_EVIDENCE_BINDING_VERSION)
  assert.equal(built.state, P7_R11_GIT_CHANGE_REPORT_EVIDENCE_BOUND_STATE)
  assert.equal(built.gitChangeCheckSummary, GIT_SUMMARY)
  assert.equal(built.gitDiffBytes, 12)
  assert.equal(built.gitStatusBytes, 3)
  assert.deepEqual(built.gitChangeReceiptRefs, [GIT_DIFF_RECEIPT_ID, GIT_STATUS_RECEIPT_ID].sort())
  assert.deepEqual(
    built.gitChangeReceiptEvidence,
    [GIT_DIFF_RECEIPT_ID, GIT_STATUS_RECEIPT_ID].sort().map((ref) => ({ kind: "receipt", ref })),
  )
  assert.equal(built.evidenceIdentity, p7GitChangeReportEvidenceBindingIdentity(input))
  assert.deepEqual(validateP7GitChangeReportEvidenceBinding(built, input), built)
})

test("P7-R11 canonicalizes receipt-reference ordering", () => {
  const input = fixtureInput()
  const first = buildP7GitChangeReportEvidenceBinding(input)
  const report = reportFrom(input)
  gitCheck(report).evidence.reverse()
  const second = buildP7GitChangeReportEvidenceBinding(rebuildWithReport(report))
  assert.deepEqual(second.gitChangeReceiptEvidence, first.gitChangeReceiptEvidence)
  assert.deepEqual(second.gitChangeReceiptRefs, first.gitChangeReceiptRefs)
  assert.equal(second.verificationReportIdentity, first.verificationReportIdentity)
  assert.equal(second.evidenceIdentity, first.evidenceIdentity)
})

test("P7-R11 identity binds summary byte counts and receipt refs", () => {
  const input = fixtureInput()
  const first = buildP7GitChangeReportEvidenceBinding(input)

  const countReport = reportFrom(input)
  gitCheck(countReport).summary = "Workspace changes are evidenced (diffBytes=13, statusBytes=3)."
  const countChanged = buildP7GitChangeReportEvidenceBinding(rebuildWithReport(countReport))
  assert.equal(countChanged.gitDiffBytes, 13)
  assert.notEqual(countChanged.verificationReportIdentity, first.verificationReportIdentity)
  assert.notEqual(countChanged.evidenceIdentity, first.evidenceIdentity)

  const refReport = reportFrom(input)
  gitCheck(refReport).evidence[0].ref = "723e4567-e89b-42d3-a456-426614174006"
  const refChanged = buildP7GitChangeReportEvidenceBinding(rebuildWithReport(refReport))
  assert.notEqual(refChanged.verificationReportIdentity, first.verificationReportIdentity)
  assert.notEqual(refChanged.evidenceIdentity, first.evidenceIdentity)
})

test("P7-R11 rejects P7-R10 predecessor tamper", () => {
  const input = fixtureInput()
  const forged = structuredClone(input.sourceWorkspaceReferenceEvidenceBinding) as MutableRecord
  forged.evidenceIdentity = "f".repeat(64)
  assert.throws(
    () => buildP7GitChangeReportEvidenceBinding({ ...input, sourceWorkspaceReferenceEvidenceBinding: forged as any }),
    /evidenceIdentity|canonical source-derived/,
  )
})

test("P7-R11 requires one exact passing git.diff check", () => {
  const input = fixtureInput()

  const missing = reportFrom(input)
  missing.checks = missing.checks.filter((check: MutableRecord) => check.id !== "git.diff")
  assert.throws(() => buildP7GitChangeReportEvidenceBinding(rebuildWithReport(missing)), /git.diff|required base check/)

  const duplicate = reportFrom(input)
  duplicate.checks.push(structuredClone(gitCheck(duplicate)))
  assert.throws(() => buildP7GitChangeReportEvidenceBinding(rebuildWithReport(duplicate)), /duplicate|exactly one|check id/)

  const category = reportFrom(input)
  gitCheck(category).category = "custom"
  assert.throws(() => buildP7GitChangeReportEvidenceBinding(rebuildWithReport(category)), /git.diff|category|required base check/)

  const status = reportFrom(input)
  gitCheck(status).status = "fail"
  assert.throws(() => buildP7GitChangeReportEvidenceBinding(rebuildWithReport(status)), /pass|passed|check/)
})

test("P7-R11 rejects noncanonical, unsafe, out-of-bound, and zero-zero summaries", () => {
  const input = fixtureInput()
  const cases: Array<[string, RegExp]> = [
    ["Diff evidenced.", /canonical passing summary grammar/],
    ["Workspace changes are evidenced (diffBytes=01, statusBytes=3).", /canonical passing summary grammar/],
    ["Workspace changes are evidenced (diffBytes=-1, statusBytes=3).", /canonical passing summary grammar/],
    ["Workspace changes are evidenced (diffBytes=524289, statusBytes=0).", /524288|safe integer/],
    ["Workspace changes are evidenced (diffBytes=0, statusBytes=262145).", /262144|safe integer/],
    ["Workspace changes are evidenced (diffBytes=0, statusBytes=0).", /non-empty git observation/],
    [`Workspace changes are evidenced (diffBytes=${"9".repeat(400)}, statusBytes=1).`, /safe integer|524288/],
  ]
  for (const [summary, expected] of cases) {
    const report = reportFrom(input)
    gitCheck(report).summary = summary
    assert.throws(() => buildP7GitChangeReportEvidenceBinding(rebuildWithReport(report)), expected)
  }
})

test("P7-R11 rejects wrong git-change evidence shape", () => {
  const input = fixtureInput()
  const cases: Array<[(check: MutableRecord) => void, RegExp]> = [
    [(check) => { check.evidence = [{ kind: "receipt", ref: GIT_DIFF_RECEIPT_ID }] }, /exactly two|receipt evidence/],
    [(check) => { check.evidence.push({ kind: "receipt", ref: "723e4567-e89b-42d3-a456-426614174006" }) }, /exactly two|at most 2/],
    [(check) => { check.evidence[0].kind = "artifact" }, /kind|receipt/],
    [(check) => { check.evidence[0].digest = "1".repeat(64) }, /unknown field|digest/],
    [(check) => { check.evidence[0].ref = check.evidence[1].ref }, /duplicate|distinct/],
    [(check) => { check.evidence[0].ref = "" }, /empty|must not be empty/],
    [(check) => { check.evidence[0].ref = "receipt\u0000bad" }, /control/],
    [(check) => { check.evidence[0].ref = "\ud800" }, /Unicode scalar/],
    [(check) => { check.evidence[0].ref = "x".repeat(1_025) }, /1024|at most/],
  ]
  for (const [mutate, expected] of cases) {
    const report = reportFrom(input)
    mutate(gitCheck(report))
    assert.throws(() => buildP7GitChangeReportEvidenceBinding(rebuildWithReport(report)), expected)
  }
})

test("P7-R11 rejects hostile build and nested report object graphs", () => {
  const input = fixtureInput()
  assert.throws(
    () => buildP7GitChangeReportEvidenceBinding(new Proxy(input, {}) as P7GitChangeReportEvidenceBindingBuildInput),
    /Proxy/,
  )

  const accessor = { ...input } as MutableRecord
  Object.defineProperty(accessor, "sourceWorkspaceReferenceEvidenceBinding", {
    get: () => input.sourceWorkspaceReferenceEvidenceBinding,
    enumerable: true,
  })
  assert.throws(() => buildP7GitChangeReportEvidenceBinding(accessor as any), /enumerable data property/)

  const symbol = { ...input } as MutableRecord
  ;(symbol as any)[Symbol("hidden")] = true
  assert.throws(() => buildP7GitChangeReportEvidenceBinding(symbol as any), /symbol fields/)

  const custom = { ...input } as MutableRecord
  Object.setPrototypeOf(custom, { marker: true })
  assert.throws(() => buildP7GitChangeReportEvidenceBinding(custom as any), /plain object/)

  const unknown = { ...input, verified: true } as any
  assert.throws(() => buildP7GitChangeReportEvidenceBinding(unknown), /unknown field/)

  const report = reportFrom(input)
  gitCheck(report).evidence[0] = new Proxy(gitCheck(report).evidence[0], {})
  assert.throws(() => buildP7GitChangeReportEvidenceBinding(rebuildWithReport(report)), /Proxy/)
})

test("P7-R11 output is detached and deeply immutable, and validator rejects forged semantics", () => {
  const input = fixtureInput()
  const built = buildP7GitChangeReportEvidenceBinding(input)
  const before = structuredClone(built)
  const report = input.sourceWorkspaceReferenceEvidenceBindingInput.sourceAgentCompletionEvidenceBindingInput
    .sourceCommandSuccessEvidenceBindingInput.sourceVerificationReportBindingInput.verificationReport as MutableRecord
  gitCheck(report).summary = "Workspace changes are evidenced (diffBytes=99, statusBytes=1)."
  gitCheck(report).evidence[0].ref = "823e4567-e89b-42d3-a456-426614174007"
  assert.deepEqual(built, before)
  assert.ok(Object.isFrozen(built))
  assert.ok(Object.isFrozen(built.gitChangeReceiptEvidence))
  assert.ok(Object.isFrozen(built.gitChangeReceiptEvidence[0]))
  assert.ok(Object.isFrozen(built.gitChangeReceiptRefs))

  const forged = structuredClone(built) as MutableRecord
  forged.gitDiffBytes = 99
  assert.throws(
    () => validateP7GitChangeReportEvidenceBinding(forged, fixtureInput()),
    /canonical source-derived semantics|evidenceIdentity/,
  )
})

test("P7-R11 rejects report-level predecessor tamper instead of trusting projected fields", () => {
  const input = fixtureInput()
  const tamperedR6 = structuredClone(
    input.sourceWorkspaceReferenceEvidenceBindingInput.sourceAgentCompletionEvidenceBindingInput
      .sourceCommandSuccessEvidenceBindingInput.sourceVerificationReportBinding,
  ) as MutableRecord
  tamperedR6.verificationReportIdentity = "f".repeat(64)
  const tampered = structuredClone(input) as MutableRecord
  tampered.sourceWorkspaceReferenceEvidenceBindingInput.sourceAgentCompletionEvidenceBindingInput
    .sourceCommandSuccessEvidenceBindingInput.sourceVerificationReportBinding = tamperedR6
  assert.throws(() => buildP7GitChangeReportEvidenceBinding(tampered), /verificationReportIdentity|bindingIdentity|canonical/)
})

test("P7-R11 schema mirrors the runtime output boundary", () => {
  assert.equal(schema.$id, "https://kodac.dev/schema/p7-git-change-report-evidence-binding.schema.json")
  assert.equal(schema.additionalProperties, false)
  assert.equal(schema.properties.version.const, P7_R11_GIT_CHANGE_REPORT_EVIDENCE_BINDING_VERSION)
  assert.equal(schema.properties.state.const, P7_R11_GIT_CHANGE_REPORT_EVIDENCE_BOUND_STATE)
  assert.equal(schema.properties.gitDiffBytes.minimum, 0)
  assert.equal(schema.properties.gitDiffBytes.maximum, 524_288)
  assert.equal(schema.properties.gitStatusBytes.minimum, 0)
  assert.equal(schema.properties.gitStatusBytes.maximum, 262_144)
  assert.equal(schema.properties.gitChangeReceiptEvidence.minItems, 2)
  assert.equal(schema.properties.gitChangeReceiptEvidence.maxItems, 2)
  assert.equal(schema.properties.gitChangeReceiptEvidence.uniqueItems, true)
  assert.equal(schema.properties.gitChangeReceiptEvidence.items.additionalProperties, false)
  assert.equal(schema.properties.gitChangeReceiptEvidence.items.properties.kind.const, "receipt")
  assert.equal(Object.hasOwn(schema.properties.gitChangeReceiptEvidence.items.properties, "digest"), false)
  assert.equal(schema.properties.gitChangeReceiptRefs.minItems, 2)
  assert.equal(schema.properties.gitChangeReceiptRefs.maxItems, 2)
  assert.equal(schema.properties.gitChangeReceiptRefs.uniqueItems, true)
  assert.equal(Array.isArray(schema.anyOf), true)
  assert.equal(schema.anyOf.length, 2)

  const required = new Set(schema.required as string[])
  for (const field of [
    "evidenceIdentity",
    "sourceWorkspaceReferenceEvidenceIdentity",
    "sourceAgentCompletionEvidenceIdentity",
    "sourceCommandSuccessEvidenceIdentity",
    "sourceVerificationReportBindingIdentity",
    "verificationReportIdentity",
    "verificationSessionId",
    "gitChangeCheckSummary",
    "gitDiffBytes",
    "gitStatusBytes",
    "gitChangeReceiptEvidence",
    "gitChangeReceiptRefs",
  ]) assert.ok(required.has(field), `schema must require ${field}`)
})

test("P7-R11 production source has no prohibited execution or retrospective evidence surface", () => {
  for (const forbidden of [
    "node:fs",
    "node:path",
    "node:child_process",
    "ExecutionReceipt",
    "ExecutionGateway",
    "runVerificationEngine",
    "VerificationPlanner",
    "RuntimeSession",
    "BoundedAgentLoop",
    "readReceiptLedger",
    "JsonlReceiptLedger",
    "process.env",
    "realpath(",
    "stat(",
    "fetch(",
    "applyPatch(",
    "gitDiff(",
    "gitStatus(",
    "DoneGate",
  ]) {
    assert.equal(sourceText.includes(forbidden), false, `production source must not contain ${forbidden}`)
  }
})
