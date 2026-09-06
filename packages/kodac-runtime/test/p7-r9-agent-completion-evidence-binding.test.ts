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
  P7_R9_AGENT_COMPLETION_EVIDENCE_BINDING_VERSION,
  P7_R9_AGENT_COMPLETION_EVIDENCE_BOUND_STATE,
  P7_R9_AGENT_COMPLETION_EVENT_PROTOCOL,
  P7_R9_AGENT_COMPLETION_EVENT_TYPE,
  P7_R9_AGENT_COMPLETION_EVENT_VERSION,
  buildP7AgentCompletionEvidenceBinding,
  p7AgentCompletionEvidenceBindingIdentity,
  validateP7AgentCompletionEvidenceBinding,
  type P7AgentCompletionEvidenceBindingBuildInput,
} from "../src/remediation/p7-agent-completion-evidence-binding.ts"

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
const GENERATED_AT = "2026-09-05T12:00:02.000Z"
const COMPLETED_EVENT_AT = "2026-09-05T12:00:02.500Z"
const REPORT_STARTED_AT = "2026-09-05T12:00:03.000Z"
const REPORT_COMPLETED_AT = "2026-09-05T12:00:04.000Z"
const TEST_STARTED_AT = "2026-09-05T12:00:03.100Z"
const TEST_COMPLETED_AT = "2026-09-05T12:00:03.400Z"
const TYPES_STARTED_AT = "2026-09-05T12:00:03.500Z"
const TYPES_COMPLETED_AT = "2026-09-05T12:00:03.900Z"
const WORKSPACE = "/workspace/kodac"
const SESSION_ID = "session-p7-r9"
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
    claimKey: "p7-r9-source-finding",
    review: {
      reviewRunId: "review-run-p7-r9",
      reviewerId: "provider:test",
      reviewerVersion: "v1",
      policyIdentity: "policy:p7-r9-test",
      canonicalBase: BASE,
      reviewedHead: HEAD,
    },
    path: "src/example.ts",
    range: { startLine: 10, endLine: 12 },
    summary: "A confirmed finding eligible for bounded agent-completion evidence binding.",
    contractClaim: "The candidate violates one bounded invariant.",
    category: "correctness",
    severity: "high",
    confidenceBps: 9000,
    evidenceRefs: ["evidence:finding"],
  }
}

function sourceProposal(): P7ImmutablePatchProposal {
  const runtime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-r9-test-adjudicator" })
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
    proposerIdentity: "kodac:p7-r9-test-proposer",
    patchArtifactDigest: sha256(PATCH),
    changes: CHANGES,
  })
}

function sourceAuthorization(source: P7ImmutablePatchProposal): P7PatchApplicationAuthorization {
  return buildP7PatchApplicationAuthorization({
    sourceProposal: source,
    declaration: {
      authorizerIdentity: "kodac:p7-r9-test-authorizer",
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
        executionReceipt: successReceipt(TEST_COMMAND_ID, TEST_RECEIPT_ID, testExecutionIntentPreimage, TEST_STARTED_AT, TEST_COMPLETED_AT, "tests passed"),
      },
      {
        commandId: TYPES_COMMAND_ID,
        executionIntentPreimage: typesExecutionIntentPreimage,
        executionReceipt: successReceipt(TYPES_COMMAND_ID, TYPES_RECEIPT_ID, typesExecutionIntentPreimage, TYPES_STARTED_AT, TYPES_COMPLETED_AT, "types passed"),
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

function fixtureInput(): P7AgentCompletionEvidenceBindingBuildInput {
  const sourceCommandSuccessEvidenceBindingInput = r8Input()
  return {
    sourceCommandSuccessEvidenceBinding: buildP7VerificationCommandSuccessEvidenceBinding(sourceCommandSuccessEvidenceBindingInput),
    sourceCommandSuccessEvidenceBindingInput,
    agentCompletionEvent: completionEvent(),
  }
}

function mutableEvent(input: P7AgentCompletionEvidenceBindingBuildInput): MutableRecord {
  return structuredClone(input.agentCompletionEvent) as MutableRecord
}

function withEvent(input: P7AgentCompletionEvidenceBindingBuildInput, event: unknown): P7AgentCompletionEvidenceBindingBuildInput {
  return { ...input, agentCompletionEvent: event }
}

function rebuildWithReport(
  input: P7AgentCompletionEvidenceBindingBuildInput,
  report: MutableRecord,
): P7AgentCompletionEvidenceBindingBuildInput {
  const sourceInput = input.sourceCommandSuccessEvidenceBindingInput
  const rebuiltR8Input = r8Input(report)
  return {
    ...input,
    sourceCommandSuccessEvidenceBinding: buildP7VerificationCommandSuccessEvidenceBinding(rebuiltR8Input),
    sourceCommandSuccessEvidenceBindingInput: rebuiltR8Input,
    agentCompletionEvent: structuredClone(input.agentCompletionEvent),
  }
}

const schema = JSON.parse(
  readFileSync(new URL("../../../schema/p7-agent-completion-evidence-binding.schema.json", import.meta.url), "utf8"),
) as UnknownRecord
const sourceText = readFileSync(
  new URL("../src/remediation/p7-agent-completion-evidence-binding.ts", import.meta.url),
  "utf8",
)

test("P7-R9 builds and validates one deterministic AGENT_COMPLETION_EVIDENCE_BOUND record", () => {
  const input = fixtureInput()
  const built = buildP7AgentCompletionEvidenceBinding(input)
  assert.equal(built.version, P7_R9_AGENT_COMPLETION_EVIDENCE_BINDING_VERSION)
  assert.equal(built.state, P7_R9_AGENT_COMPLETION_EVIDENCE_BOUND_STATE)
  assert.equal(built.agentCompletionEventProtocol, P7_R9_AGENT_COMPLETION_EVENT_PROTOCOL)
  assert.equal(built.agentCompletionEventVersion, P7_R9_AGENT_COMPLETION_EVENT_VERSION)
  assert.equal(built.agentCompletionEventType, P7_R9_AGENT_COMPLETION_EVENT_TYPE)
  assert.equal(built.agentCompletionEventId, EVENT_ID)
  assert.equal(built.agentCompletionEventSequence, 17)
  assert.equal(built.agentCompletionEventEmittedAt, COMPLETED_EVENT_AT)
  assert.equal(built.agentCompletionReason, "completed")
  assert.deepEqual(built.agentCompletionBudget, { turnsUsed: 2, toolCallsUsed: 1, failuresUsed: 0, elapsedMs: 1_234 })
  assert.deepEqual(built.agentCompletionCheckEvidence, [{ kind: "event", ref: `session:${SESSION_ID}:agent.loop.completed` }])
  assert.equal(built.evidenceIdentity, p7AgentCompletionEvidenceBindingIdentity(input))
  assert.deepEqual(validateP7AgentCompletionEvidenceBinding(built, input), built)
})

test("P7-R9 event and final identities are deterministic and bind semantic event fields", () => {
  const input = fixtureInput()
  const first = buildP7AgentCompletionEvidenceBinding(input)
  const same = buildP7AgentCompletionEvidenceBinding(structuredClone(input))
  assert.equal(same.agentCompletionEventIdentity, first.agentCompletionEventIdentity)
  assert.equal(same.evidenceIdentity, first.evidenceIdentity)

  const changed = mutableEvent(input)
  changed.eventId = "523e4567-e89b-42d3-a456-426614174004"
  const second = buildP7AgentCompletionEvidenceBinding(withEvent(input, changed))
  assert.notEqual(second.agentCompletionEventIdentity, first.agentCompletionEventIdentity)
  assert.notEqual(second.evidenceIdentity, first.evidenceIdentity)

  const changedBudget = mutableEvent(input)
  changedBudget.payload.budget.elapsedMs += 1
  const third = buildP7AgentCompletionEvidenceBinding(withEvent(input, changedBudget))
  assert.notEqual(third.agentCompletionEventIdentity, first.agentCompletionEventIdentity)
  assert.notEqual(third.evidenceIdentity, first.evidenceIdentity)
})

test("P7-R9 rejects R8 predecessor tamper", () => {
  const input = fixtureInput()
  const forged = structuredClone(input.sourceCommandSuccessEvidenceBinding) as unknown as MutableRecord
  forged.evidenceIdentity = "f".repeat(64)
  assert.throws(
    () => buildP7AgentCompletionEvidenceBinding({ ...input, sourceCommandSuccessEvidenceBinding: forged as any }),
    /evidenceIdentity|canonical source-derived/,
  )
})

test("P7-R9 requires exact agent.completed report-check linkage", () => {
  const input = fixtureInput()
  const cases: Array<[string, (check: MutableRecord) => void, RegExp]> = [
    ["category", (check) => { check.category = "custom" }, /agent.completed|category|required base check/],
    ["status", (check) => { check.status = "fail" }, /pass|passed|check/],
    ["wrong ref", (check) => { check.evidence = [{ kind: "event", ref: "session:other:agent.loop.completed" }] }, /verification-session completion event reference/],
    ["wrong kind", (check) => { check.evidence = [{ kind: "artifact", ref: `session:${SESSION_ID}:agent.loop.completed` }] }, /kind|event/],
    ["digest", (check) => { check.evidence = [{ kind: "event", ref: `session:${SESSION_ID}:agent.loop.completed`, digest: "1".repeat(64) }] }, /unknown field|exactly one event/],
    ["extra", (check) => { check.evidence.push({ kind: "event", ref: "event:extra" }) }, /exactly one event evidence reference|at most 1/],
  ]

  for (const [_name, mutate, expected] of cases) {
    const report = structuredClone(input.sourceCommandSuccessEvidenceBindingInput.sourceVerificationReportBindingInput.verificationReport) as unknown as MutableRecord
    const check = report.checks.find((candidate: MutableRecord) => candidate.id === "agent.completed")
    mutate(check)
    assert.throws(() => buildP7AgentCompletionEvidenceBinding(rebuildWithReport(input, report)), expected)
  }
})

test("P7-R9 rejects missing or duplicate agent.completed checks", () => {
  const input = fixtureInput()
  const missing = structuredClone(input.sourceCommandSuccessEvidenceBindingInput.sourceVerificationReportBindingInput.verificationReport) as unknown as MutableRecord
  missing.checks = missing.checks.filter((check: MutableRecord) => check.id !== "agent.completed")
  assert.throws(() => buildP7AgentCompletionEvidenceBinding(rebuildWithReport(input, missing)), /agent.completed|required base check/)

  const duplicate = structuredClone(input.sourceCommandSuccessEvidenceBindingInput.sourceVerificationReportBindingInput.verificationReport) as unknown as MutableRecord
  const check = structuredClone(duplicate.checks.find((candidate: MutableRecord) => candidate.id === "agent.completed"))
  duplicate.checks.push(check)
  assert.throws(() => buildP7AgentCompletionEvidenceBinding(rebuildWithReport(input, duplicate)), /duplicate|exactly one|check id/)
})

test("P7-R9 rejects event protocol, identity, session, sequence, time, and type drift", () => {
  const input = fixtureInput()
  const mutations: Array<[(event: MutableRecord) => void, RegExp]> = [
    [(event) => { event.protocol = "other.event" }, /protocol/],
    [(event) => { event.version = 2 }, /version/],
    [(event) => { event.eventId = "not-a-uuid" }, /UUID v4/],
    [(event) => { event.sessionId = "other-session" }, /verification session id/],
    [(event) => { event.sequence = 0 }, /sequence/],
    [(event) => { event.sequence = Number.MAX_SAFE_INTEGER + 1 }, /sequence/],
    [(event) => { event.emittedAt = "2026-09-05T12:00:03.001Z" }, /not be later/],
    [(event) => { event.emittedAt = "+012026-09-05T12:00:02.500Z" }, /canonical UTC/],
    [(event) => { event.type = "agent.loop.stopped" }, /agent.loop.completed/],
  ]
  for (const [mutate, expected] of mutations) {
    const event = mutableEvent(input)
    mutate(event)
    assert.throws(() => buildP7AgentCompletionEvidenceBinding(withEvent(input, event)), expected)
  }
})

test("P7-R9 rejects payload and budget drift", () => {
  const input = fixtureInput()
  const mutations: Array<[(event: MutableRecord) => void, RegExp]> = [
    [(event) => { event.payload.reason = "stopped" }, /reason/],
    [(event) => { event.payload.extra = true }, /unknown field/],
    [(event) => { delete event.payload.budget }, /missing required field/],
    [(event) => { event.payload.budget.turnsUsed = 0 }, /turnsUsed/],
    [(event) => { event.payload.budget.toolCallsUsed = -1 }, /toolCallsUsed/],
    [(event) => { event.payload.budget.failuresUsed = 0.5 }, /failuresUsed/],
    [(event) => { event.payload.budget.elapsedMs = Number.MAX_SAFE_INTEGER + 1 }, /elapsedMs/],
    [(event) => { event.payload.budget.extra = 1 }, /unknown field/],
  ]
  for (const [mutate, expected] of mutations) {
    const event = mutableEvent(input)
    mutate(event)
    assert.throws(() => buildP7AgentCompletionEvidenceBinding(withEvent(input, event)), expected)
  }
})

test("P7-R9 rejects hostile Proxy, accessor, symbol, custom-prototype, cyclic, unknown, and invalid-Unicode event data", () => {
  const input = fixtureInput()

  assert.throws(
    () => buildP7AgentCompletionEvidenceBinding(withEvent(input, new Proxy(completionEvent(), {}))),
    /Proxy/,
  )

  const accessor = mutableEvent(input)
  Object.defineProperty(accessor, "eventId", { get: () => EVENT_ID, enumerable: true })
  assert.throws(() => buildP7AgentCompletionEvidenceBinding(withEvent(input, accessor)), /enumerable data property/)

  const symbol = mutableEvent(input)
  ;(symbol as any)[Symbol("hidden")] = "x"
  assert.throws(() => buildP7AgentCompletionEvidenceBinding(withEvent(input, symbol)), /symbol fields/)

  const custom = mutableEvent(input)
  Object.setPrototypeOf(custom.payload, { marker: true })
  assert.throws(() => buildP7AgentCompletionEvidenceBinding(withEvent(input, custom)), /plain object/)

  const cyclic = mutableEvent(input)
  cyclic.payload.budget.alias = cyclic.payload
  assert.throws(() => buildP7AgentCompletionEvidenceBinding(withEvent(input, cyclic)), /aliases or cycles|unknown field/)

  const unknown = mutableEvent(input)
  unknown.verified = true
  assert.throws(() => buildP7AgentCompletionEvidenceBinding(withEvent(input, unknown)), /unknown field/)

  const unicode = mutableEvent(input)
  unicode.payload.reason = "\ud800"
  assert.throws(() => buildP7AgentCompletionEvidenceBinding(withEvent(input, unicode)), /Unicode scalar/)
})

test("P7-R9 output is detached and deeply immutable, and validator rejects forged semantics", () => {
  const input = fixtureInput()
  const built = buildP7AgentCompletionEvidenceBinding(input)
  const before = structuredClone(built)
  const event = input.agentCompletionEvent as MutableRecord
  event.payload.budget.elapsedMs = 99_999
  assert.deepEqual(built, before)
  assert.ok(Object.isFrozen(built))
  assert.ok(Object.isFrozen(built.agentCompletionCheckEvidence))
  assert.ok(Object.isFrozen(built.agentCompletionCheckEvidence[0]))
  assert.ok(Object.isFrozen(built.agentCompletionBudget))

  const forged = structuredClone(built) as unknown as MutableRecord
  forged.agentCompletionBudget.elapsedMs += 1
  assert.throws(
    () => validateP7AgentCompletionEvidenceBinding(forged, fixtureInput()),
    /canonical source-derived semantics|evidenceIdentity/,
  )
})

test("P7-R9 identity binds the exact agent completion check summary", () => {
  const input = fixtureInput()
  const first = buildP7AgentCompletionEvidenceBinding(input)
  const report = structuredClone(input.sourceCommandSuccessEvidenceBindingInput.sourceVerificationReportBindingInput.verificationReport) as unknown as MutableRecord
  report.checks.find((check: MutableRecord) => check.id === "agent.completed").summary = "A different but still passing bounded completion summary."
  const secondInput = rebuildWithReport(input, report)
  const second = buildP7AgentCompletionEvidenceBinding(secondInput)
  assert.notEqual(second.verificationReportIdentity, first.verificationReportIdentity)
  assert.notEqual(second.agentCompletionCheckSummary, first.agentCompletionCheckSummary)
  assert.notEqual(second.evidenceIdentity, first.evidenceIdentity)
})

test("P7-R9 schema mirrors the runtime output boundary", () => {
  assert.equal(schema.$id, "https://kodac.dev/schema/p7-agent-completion-evidence-binding.schema.json")
  assert.equal(schema.additionalProperties, false)
  assert.equal(schema.properties.version.const, P7_R9_AGENT_COMPLETION_EVIDENCE_BINDING_VERSION)
  assert.equal(schema.properties.state.const, P7_R9_AGENT_COMPLETION_EVIDENCE_BOUND_STATE)
  assert.equal(schema.properties.agentCompletionEventProtocol.const, P7_R9_AGENT_COMPLETION_EVENT_PROTOCOL)
  assert.equal(schema.properties.agentCompletionEventVersion.const, P7_R9_AGENT_COMPLETION_EVENT_VERSION)
  assert.equal(schema.properties.agentCompletionEventType.const, P7_R9_AGENT_COMPLETION_EVENT_TYPE)
  assert.equal(schema.properties.agentCompletionReason.const, "completed")
  assert.equal(schema.properties.agentCompletionCheckEvidence.minItems, 1)
  assert.equal(schema.properties.agentCompletionCheckEvidence.maxItems, 1)
  assert.equal(schema.properties.agentCompletionBudget.additionalProperties, false)
  assert.equal(schema.properties.agentCompletionBudget.properties.turnsUsed.minimum, 1)

  const required = new Set(schema.required as string[])
  for (const field of [
    "evidenceIdentity",
    "sourceCommandSuccessEvidenceIdentity",
    "sourceVerificationReportBindingIdentity",
    "verificationSessionId",
    "agentCompletionCheckEvidence",
    "agentCompletionEventIdentity",
    "agentCompletionEventId",
    "agentCompletionEventSequence",
    "agentCompletionEventEmittedAt",
    "agentCompletionBudget",
  ]) assert.ok(required.has(field), `schema must require ${field}`)
})

test("P7-R9 production source has no prohibited execution surface", () => {
  for (const forbidden of [
    "RuntimeSession",
    "eventsSnapshot",
    ".emit(",
    "BoundedAgentLoop",
    "VerificationPlanner",
    "runVerificationEngine",
    "ExecutionGateway",
    "DoneGate",
    "node:fs",
    "node:child_process",
    "process.env",
    "fetch(",
  ]) {
    assert.equal(sourceText.includes(forbidden), false, `production source must not contain ${forbidden}`)
  }
})
