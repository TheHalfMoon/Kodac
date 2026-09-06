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
  buildP7GitChangeReportEvidenceBinding,
  type P7GitChangeReportEvidenceBindingBuildInput,
} from "../src/remediation/p7-git-change-report-evidence-binding.ts"
import {
  buildP7ReceiptReportEvidenceBinding,
  type P7ReceiptReportEvidenceBindingBuildInput,
} from "../src/remediation/p7-receipt-report-evidence-binding.ts"
import {
  P7_R13_POLICY_REPORT_EVIDENCE_BINDING_VERSION,
  P7_R13_POLICY_REPORT_EVIDENCE_BOUND_STATE,
  buildP7PolicyReportEvidenceBinding,
  p7PolicyReportEvidenceBindingIdentity,
  validateP7PolicyReportEvidenceBinding,
  type P7PolicyReportEvidenceBindingBuildInput,
} from "../src/remediation/p7-policy-report-evidence-binding.ts"

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
const GENERATED_AT = "2026-09-06T12:00:02.000Z"
const COMPLETED_EVENT_AT = "2026-09-06T12:00:02.500Z"
const REPORT_STARTED_AT = "2026-09-06T12:00:03.000Z"
const REPORT_COMPLETED_AT = "2026-09-06T12:00:04.000Z"
const TEST_STARTED_AT = "2026-09-06T12:00:03.100Z"
const TEST_COMPLETED_AT = "2026-09-06T12:00:03.400Z"
const TYPES_STARTED_AT = "2026-09-06T12:00:03.500Z"
const TYPES_COMPLETED_AT = "2026-09-06T12:00:03.900Z"
const WORKSPACE = "/workspace/kodac"
const SESSION_ID = "session-p7-r13"
const TEST_COMMAND_ID = "js-root-tests-123abc"
const TYPES_COMMAND_ID = "js-root-types-456def"
const GIT_SUMMARY = "Workspace changes are evidenced (diffBytes=12, statusBytes=3)."
const POLICY_SUMMARY = "Every persisted execution receipt was authorized by policy."
const RECEIPT_IDS = [
  APPLY_RECEIPT_ID,
  GIT_DIFF_RECEIPT_ID,
  GIT_STATUS_RECEIPT_ID,
  TEST_RECEIPT_ID,
  TYPES_RECEIPT_ID,
]
const RECEIPT_SUMMARY = `${RECEIPT_IDS.length} execution receipt(s) are successful and mutation post-state is attested.`

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
    claimKey: "p7-r13-source-finding",
    review: {
      reviewRunId: "review-run-p7-r13",
      reviewerId: "provider:test",
      reviewerVersion: "v1",
      policyIdentity: "policy:p7-r13-test",
      canonicalBase: BASE,
      reviewedHead: HEAD,
    },
    path: "src/example.ts",
    range: { startLine: 10, endLine: 12 },
    summary: "A confirmed finding eligible for bounded policy-report evidence binding.",
    contractClaim: "The candidate violates one bounded invariant.",
    category: "correctness",
    severity: "high",
    confidenceBps: 9000,
    evidenceRefs: ["evidence:finding"],
  }
}

function sourceProposal(): P7ImmutablePatchProposal {
  const runtime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-r13-test-adjudicator" })
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
    proposerIdentity: "kodac:p7-r13-test-proposer",
    patchArtifactDigest: sha256(PATCH),
    changes: CHANGES,
  })
}

function sourceAuthorization(source: P7ImmutablePatchProposal): P7PatchApplicationAuthorization {
  return buildP7PatchApplicationAuthorization({
    sourceProposal: source,
    declaration: {
      authorizerIdentity: "kodac:p7-r13-test-authorizer",
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
    startedAt: "2026-09-06T12:00:00.000Z",
    completedAt: "2026-09-06T12:00:01.000Z",
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
      summary: RECEIPT_SUMMARY,
      evidence: RECEIPT_IDS.map((ref) => ({ kind: "receipt", ref })),
    },
    {
      id: "evidence.policy",
      category: "policy",
      status: "pass",
      summary: POLICY_SUMMARY,
      evidence: RECEIPT_IDS.map((ref) => ({ kind: "receipt", ref })),
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

function r11Input(report?: MutableRecord): P7GitChangeReportEvidenceBindingBuildInput {
  const sourceWorkspaceReferenceEvidenceBindingInput = r10Input(report)
  return {
    sourceWorkspaceReferenceEvidenceBinding: buildP7WorkspaceReferenceEvidenceBinding(sourceWorkspaceReferenceEvidenceBindingInput),
    sourceWorkspaceReferenceEvidenceBindingInput,
  }
}

function r12Input(report?: MutableRecord): P7ReceiptReportEvidenceBindingBuildInput {
  const sourceGitChangeReportEvidenceBindingInput = r11Input(report)
  return {
    sourceGitChangeReportEvidenceBinding: buildP7GitChangeReportEvidenceBinding(sourceGitChangeReportEvidenceBindingInput),
    sourceGitChangeReportEvidenceBindingInput,
  }
}

function fixtureInput(report?: MutableRecord): P7PolicyReportEvidenceBindingBuildInput {
  const sourceReceiptReportEvidenceBindingInput = r12Input(report)
  return {
    sourceReceiptReportEvidenceBinding: buildP7ReceiptReportEvidenceBinding(sourceReceiptReportEvidenceBindingInput),
    sourceReceiptReportEvidenceBindingInput,
  }
}

function reportFrom(input: P7PolicyReportEvidenceBindingBuildInput): MutableRecord {
  return structuredClone(
    input.sourceReceiptReportEvidenceBindingInput.sourceGitChangeReportEvidenceBindingInput
      .sourceWorkspaceReferenceEvidenceBindingInput.sourceAgentCompletionEvidenceBindingInput
      .sourceCommandSuccessEvidenceBindingInput.sourceVerificationReportBindingInput.verificationReport,
  ) as MutableRecord
}

function rebuildWithReport(report: MutableRecord): P7PolicyReportEvidenceBindingBuildInput {
  return fixtureInput(report)
}

function policyCheck(report: MutableRecord): MutableRecord {
  return report.checks.find((candidate: MutableRecord) => candidate.id === "evidence.policy")
}

function receiptCheck(report: MutableRecord): MutableRecord {
  return report.checks.find((candidate: MutableRecord) => candidate.id === "evidence.receipts")
}

const schema = JSON.parse(
  readFileSync(new URL("../../../schema/p7-policy-report-evidence-binding.schema.json", import.meta.url), "utf8"),
) as UnknownRecord
const sourceText = readFileSync(
  new URL("../src/remediation/p7-policy-report-evidence-binding.ts", import.meta.url),
  "utf8",
)

function schemaRecord(value: unknown, path: string): UnknownRecord {
  assert.ok(value !== null && typeof value === "object" && !Array.isArray(value), `${path} must be a schema object`)
  return value as UnknownRecord
}

function schemaEqual(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right)
}

function validateAgainstSchema(schemaValue: unknown, value: unknown, path = "$root"): void {
  const node = schemaRecord(schemaValue, path)
  if (Object.hasOwn(node, "const")) assert.ok(schemaEqual(value, node.const), `${path} violates const`)

  if (node.type === "object") {
    assert.ok(value !== null && typeof value === "object" && !Array.isArray(value), `${path} must be object`)
    const record = value as UnknownRecord
    const properties = node.properties === undefined ? {} : schemaRecord(node.properties, `${path}.properties`)
    if (Array.isArray(node.required)) {
      for (const key of node.required) {
        assert.equal(typeof key, "string", `${path}.required entries must be strings`)
        assert.ok(Object.hasOwn(record, key), `${path} missing required field ${key}`)
      }
    }
    if (node.additionalProperties === false) {
      for (const key of Object.keys(record)) assert.ok(Object.hasOwn(properties, key), `${path} has additional property ${key}`)
    }
    for (const [key, childSchema] of Object.entries(properties)) {
      if (Object.hasOwn(record, key)) validateAgainstSchema(childSchema, record[key], `${path}.${key}`)
    }
    return
  }

  if (node.type === "string") {
    assert.equal(typeof value, "string", `${path} must be string`)
    const text = value as string
    const length = [...text].length
    if (typeof node.minLength === "number") assert.ok(length >= node.minLength, `${path} violates minLength`)
    if (typeof node.maxLength === "number") assert.ok(length <= node.maxLength, `${path} violates maxLength`)
    if (typeof node.pattern === "string") assert.match(text, new RegExp(node.pattern), `${path} violates pattern`)
    return
  }

  if (node.type === "integer") {
    assert.ok(typeof value === "number" && Number.isInteger(value), `${path} must be integer`)
    if (typeof node.minimum === "number") assert.ok(value >= node.minimum, `${path} violates minimum`)
    if (typeof node.maximum === "number") assert.ok(value <= node.maximum, `${path} violates maximum`)
    return
  }

  if (node.type === "array") {
    assert.ok(Array.isArray(value), `${path} must be array`)
    const array = value as unknown[]
    if (typeof node.minItems === "number") assert.ok(array.length >= node.minItems, `${path} violates minItems`)
    if (typeof node.maxItems === "number") assert.ok(array.length <= node.maxItems, `${path} violates maxItems`)
    if (node.uniqueItems === true) {
      const keys = array.map((item) => JSON.stringify(item))
      assert.equal(new Set(keys).size, keys.length, `${path} violates uniqueItems`)
    }
    if (node.items !== undefined) {
      for (let index = 0; index < array.length; index += 1) validateAgainstSchema(node.items, array[index], `${path}[${index}]`)
    }
    return
  }

  if (node.type !== undefined) assert.fail(`${path} uses unsupported schema type ${String(node.type)}`)
}

test("P7-R13 builds and validates one deterministic POLICY_REPORT_EVIDENCE_BOUND record", () => {
  const input = fixtureInput()
  const built = buildP7PolicyReportEvidenceBinding(input)
  assert.equal(built.version, P7_R13_POLICY_REPORT_EVIDENCE_BINDING_VERSION)
  assert.equal(built.state, P7_R13_POLICY_REPORT_EVIDENCE_BOUND_STATE)
  assert.equal(built.policyReportCheckSummary, POLICY_SUMMARY)
  assert.equal(built.policyReportReceiptCount, RECEIPT_IDS.length)
  assert.deepEqual(built.policyReportRefs, [...RECEIPT_IDS].sort())
  assert.deepEqual(built.policyReportEvidence, [...RECEIPT_IDS].sort().map((ref) => ({ kind: "receipt", ref })))
  assert.deepEqual(built.policyReportRefs, input.sourceReceiptReportEvidenceBinding.receiptReportRefs)
  assert.equal(built.sourceReceiptReportEvidenceIdentity, input.sourceReceiptReportEvidenceBinding.evidenceIdentity)
  assert.equal(built.evidenceIdentity, p7PolicyReportEvidenceBindingIdentity(input))
  assert.deepEqual(validateP7PolicyReportEvidenceBinding(built, input), built)
})

test("P7-R13 canonicalizes policy receipt ordering without changing identity", () => {
  const input = fixtureInput()
  const first = buildP7PolicyReportEvidenceBinding(input)
  const report = reportFrom(input)
  policyCheck(report).evidence.reverse()
  const second = buildP7PolicyReportEvidenceBinding(rebuildWithReport(report))
  assert.deepEqual(second.policyReportEvidence, first.policyReportEvidence)
  assert.deepEqual(second.policyReportRefs, first.policyReportRefs)
  assert.equal(second.verificationReportIdentity, first.verificationReportIdentity)
  assert.equal(second.evidenceIdentity, first.evidenceIdentity)
})

test("P7-R13 requires one exact passing evidence.policy check and exact summary", () => {
  const input = fixtureInput()
  const cases: Array<[(report: MutableRecord) => void, RegExp]> = [
    [(report) => { report.checks = report.checks.filter((check: MutableRecord) => check.id !== "evidence.policy") }, /evidence.policy|required base check/],
    [(report) => { report.checks.push(structuredClone(policyCheck(report))) }, /duplicate|exactly one|check id/],
    [(report) => { policyCheck(report).category = "custom" }, /policy|category|required base check/],
    [(report) => { policyCheck(report).status = "fail" }, /pass|passed|status|check/],
    [(report) => { policyCheck(report).summary = "Policy evidence valid." }, /exact canonical passing summary|summary/],
  ]
  for (const [mutate, expected] of cases) {
    const report = reportFrom(input)
    mutate(report)
    assert.throws(() => buildP7PolicyReportEvidenceBinding(rebuildWithReport(report)), expected)
  }
})

test("P7-R13 requires non-empty unique digest-free receipt evidence with bounded safe refs", () => {
  const input = fixtureInput()
  const cases: Array<[(check: MutableRecord) => void, RegExp]> = [
    [(check) => { check.evidence = [] }, /at least one|length|P7-R12/],
    [(check) => { check.evidence[0].kind = "artifact" }, /kind|receipt/],
    [(check) => { check.evidence[0].digest = "1".repeat(64) }, /unknown field|digest/],
    [(check) => { check.evidence[0].ref = check.evidence[1].ref }, /duplicate|unique|P7-R12/],
    [(check) => { check.evidence[0].ref = "" }, /empty|must not be empty/],
    [(check) => { check.evidence[0].ref = "receipt\u0000bad" }, /control/],
    [(check) => { check.evidence[0].ref = "\ud800" }, /Unicode scalar/],
    [(check) => { check.evidence[0].ref = "x".repeat(1_025) }, /1024|at most/],
  ]
  for (const [mutate, expected] of cases) {
    const report = reportFrom(input)
    mutate(policyCheck(report))
    assert.throws(() => buildP7PolicyReportEvidenceBinding(rebuildWithReport(report)), expected)
  }

  const oversized = reportFrom(input)
  policyCheck(oversized).evidence = Array.from({ length: 257 }, (_, index) => ({ kind: "receipt", ref: `receipt-${index}` }))
  assert.throws(() => buildP7PolicyReportEvidenceBinding(rebuildWithReport(oversized)), /256|at most/)
})

test("P7-R13 rejects policy/receipt report count or reference-set disagreement", () => {
  const input = fixtureInput()

  const missing = reportFrom(input)
  policyCheck(missing).evidence.pop()
  assert.throws(() => buildP7PolicyReportEvidenceBinding(rebuildWithReport(missing)), /length.*P7-R12|receipt report count/)

  const extra = reportFrom(input)
  policyCheck(extra).evidence.push({ kind: "receipt", ref: "723e4567-e89b-42d3-a456-426614174006" })
  assert.throws(() => buildP7PolicyReportEvidenceBinding(rebuildWithReport(extra)), /length.*P7-R12|receipt report count/)

  const changedPolicy = reportFrom(input)
  policyCheck(changedPolicy).evidence[0].ref = "723e4567-e89b-42d3-a456-426614174006"
  assert.throws(() => buildP7PolicyReportEvidenceBinding(rebuildWithReport(changedPolicy)), /must equal.*P7-R12|receipt report references/)

  const changedReceipt = reportFrom(input)
  receiptCheck(changedReceipt).evidence[0].ref = "723e4567-e89b-42d3-a456-426614174006"
  assert.throws(() => buildP7PolicyReportEvidenceBinding(rebuildWithReport(changedReceipt)), /must equal.*P7-R12|receipt report references/)
})

test("P7-R13 rejects hostile build graphs and predecessor tamper", () => {
  const input = fixtureInput()
  assert.throws(
    () => buildP7PolicyReportEvidenceBinding(new Proxy(input, {}) as P7PolicyReportEvidenceBindingBuildInput),
    /Proxy/,
  )

  const accessor = { ...input } as MutableRecord
  Object.defineProperty(accessor, "sourceReceiptReportEvidenceBinding", {
    get: () => input.sourceReceiptReportEvidenceBinding,
    enumerable: true,
  })
  assert.throws(() => buildP7PolicyReportEvidenceBinding(accessor as any), /enumerable data property/)

  const symbol = { ...input } as MutableRecord
  ;(symbol as any)[Symbol("hidden")] = true
  assert.throws(() => buildP7PolicyReportEvidenceBinding(symbol as any), /symbol fields/)

  const unknown = { ...input, verified: true } as any
  assert.throws(() => buildP7PolicyReportEvidenceBinding(unknown), /unknown field/)

  const forged = structuredClone(input.sourceReceiptReportEvidenceBinding) as MutableRecord
  forged.evidenceIdentity = "f".repeat(64)
  assert.throws(
    () => buildP7PolicyReportEvidenceBinding({ ...input, sourceReceiptReportEvidenceBinding: forged as any }),
    /evidenceIdentity|canonical source-derived/,
  )

  const proxyReport = reportFrom(input)
  policyCheck(proxyReport).evidence[0] = new Proxy(policyCheck(proxyReport).evidence[0], {})
  assert.throws(() => buildP7PolicyReportEvidenceBinding(rebuildWithReport(proxyReport)), /Proxy/)

  const sparseReport = reportFrom(input)
  delete policyCheck(sparseReport).evidence[1]
  assert.throws(() => buildP7PolicyReportEvidenceBinding(rebuildWithReport(sparseReport)), /sparse|array/)

  const aliasReport = reportFrom(input)
  policyCheck(aliasReport).evidence[1] = policyCheck(aliasReport).evidence[0]
  assert.throws(() => buildP7PolicyReportEvidenceBinding(rebuildWithReport(aliasReport)), /alias|duplicate|unique/)

  const cyclicReport = reportFrom(input)
  policyCheck(cyclicReport).evidence[0].cycle = cyclicReport
  assert.throws(() => buildP7PolicyReportEvidenceBinding(rebuildWithReport(cyclicReport)), /cycle|unknown field/)
})

test("P7-R13 output is detached, deeply immutable, and identity binds policy semantics", () => {
  const input = fixtureInput()
  const built = buildP7PolicyReportEvidenceBinding(input)
  const before = structuredClone(built)
  const report = input.sourceReceiptReportEvidenceBindingInput.sourceGitChangeReportEvidenceBindingInput
    .sourceWorkspaceReferenceEvidenceBindingInput.sourceAgentCompletionEvidenceBindingInput
    .sourceCommandSuccessEvidenceBindingInput.sourceVerificationReportBindingInput.verificationReport as MutableRecord
  policyCheck(report).evidence.reverse()
  assert.deepEqual(built, before)
  assert.ok(Object.isFrozen(built))
  assert.ok(Object.isFrozen(built.policyReportEvidence))
  assert.ok(Object.isFrozen(built.policyReportEvidence[0]))
  assert.ok(Object.isFrozen(built.policyReportRefs))

  const forged = structuredClone(built) as MutableRecord
  forged.policyReportCheckSummary = "Policy evidence valid."
  assert.throws(
    () => validateP7PolicyReportEvidenceBinding(forged, fixtureInput()),
    /canonical source-derived semantics|evidenceIdentity/,
  )

  const forgedCount = structuredClone(built) as MutableRecord
  forgedCount.policyReportReceiptCount -= 1
  assert.throws(
    () => validateP7PolicyReportEvidenceBinding(forgedCount, fixtureInput()),
    /canonical source-derived semantics|evidenceIdentity/,
  )
})

test("P7-R13 rejects nested R6/R12 lineage tamper instead of trusting projected fields", () => {
  const input = fixtureInput()
  const tampered = structuredClone(input) as MutableRecord
  tampered.sourceReceiptReportEvidenceBindingInput.sourceGitChangeReportEvidenceBindingInput
    .sourceWorkspaceReferenceEvidenceBindingInput.sourceAgentCompletionEvidenceBindingInput
    .sourceCommandSuccessEvidenceBindingInput.sourceVerificationReportBinding.verificationReportIdentity = "f".repeat(64)
  assert.throws(
    () => buildP7PolicyReportEvidenceBinding(tampered as P7PolicyReportEvidenceBindingBuildInput),
    /verificationReportIdentity|bindingIdentity|canonical/,
  )
})

test("P7-R13 schema accepts canonical output and rejects malformed output", () => {
  const built = buildP7PolicyReportEvidenceBinding(fixtureInput())
  assert.equal(schema.$id, "https://kodac.dev/schema/p7-policy-report-evidence-binding.schema.json")
  assert.equal(schema.additionalProperties, false)
  assert.equal(schema.properties.version.const, P7_R13_POLICY_REPORT_EVIDENCE_BINDING_VERSION)
  assert.equal(schema.properties.state.const, P7_R13_POLICY_REPORT_EVIDENCE_BOUND_STATE)
  assert.equal(schema.properties.policyReportCheckSummary.const, POLICY_SUMMARY)
  assert.equal(schema.properties.policyReportReceiptCount.minimum, 1)
  assert.equal(schema.properties.policyReportReceiptCount.maximum, 256)
  assert.equal(schema.properties.policyReportEvidence.minItems, 1)
  assert.equal(schema.properties.policyReportEvidence.maxItems, 256)
  assert.equal(schema.properties.policyReportEvidence.uniqueItems, true)
  assert.equal(schema.properties.policyReportEvidence.items.additionalProperties, false)
  assert.equal(schema.properties.policyReportEvidence.items.properties.kind.const, "receipt")
  assert.equal(Object.hasOwn(schema.properties.policyReportEvidence.items.properties, "digest"), false)
  assert.equal(schema.properties.policyReportRefs.minItems, 1)
  assert.equal(schema.properties.policyReportRefs.maxItems, 256)
  assert.equal(schema.properties.policyReportRefs.uniqueItems, true)

  assert.doesNotThrow(() => validateAgainstSchema(schema, built))

  const malformedCount = structuredClone(built) as MutableRecord
  malformedCount.policyReportReceiptCount = 0
  assert.throws(() => validateAgainstSchema(schema, malformedCount), /minimum/)

  const malformedDigest = structuredClone(built) as MutableRecord
  malformedDigest.policyReportEvidence[0].digest = "1".repeat(64)
  assert.throws(() => validateAgainstSchema(schema, malformedDigest), /additional property digest/)

  const malformedSummary = structuredClone(built) as MutableRecord
  malformedSummary.policyReportCheckSummary = "Policy evidence valid."
  assert.throws(() => validateAgainstSchema(schema, malformedSummary), /const/)

  const malformedMissing = structuredClone(built) as MutableRecord
  delete malformedMissing.policyReportRefs
  assert.throws(() => validateAgainstSchema(schema, malformedMissing), /missing required field policyReportRefs/)

  const malformedDuplicate = structuredClone(built) as MutableRecord
  malformedDuplicate.policyReportRefs[1] = malformedDuplicate.policyReportRefs[0]
  assert.throws(() => validateAgainstSchema(schema, malformedDuplicate), /uniqueItems/)

  const required = new Set(schema.required as string[])
  for (const field of [
    "evidenceIdentity",
    "sourceReceiptReportEvidenceIdentity",
    "sourceGitChangeReportEvidenceIdentity",
    "sourceWorkspaceReferenceEvidenceIdentity",
    "sourceAgentCompletionEvidenceIdentity",
    "sourceCommandSuccessEvidenceIdentity",
    "sourceVerificationReportBindingIdentity",
    "verificationReportIdentity",
    "verificationSessionId",
    "policyReportCheckSummary",
    "policyReportReceiptCount",
    "policyReportEvidence",
    "policyReportRefs",
  ]) assert.ok(required.has(field), `schema must require ${field}`)
})

test("P7-R13 production source has no prohibited execution, ledger, policy-object, or mutation surface", () => {
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
    "receiptPath",
    "process.env",
    "realpath(",
    "stat(",
    "fetch(",
    "applyPatch(",
    "gitDiff(",
    "gitStatus(",
    "DoneGate",
    "fixedPolicy(",
    "policy.decision",
  ]) {
    assert.equal(sourceText.includes(forbidden), false, `production source must not contain ${forbidden}`)
  }
})
