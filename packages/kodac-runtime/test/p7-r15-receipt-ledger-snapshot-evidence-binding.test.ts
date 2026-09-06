import assert from "node:assert/strict"
import { Buffer } from "node:buffer"
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
  buildP7PolicyReportEvidenceBinding,
  type P7PolicyReportEvidenceBindingBuildInput,
} from "../src/remediation/p7-policy-report-evidence-binding.ts"
import {
  buildP7ReceiptRecordSetEvidenceBinding,
  type P7ReceiptRecordSetEvidenceBindingBuildInput,
} from "../src/remediation/p7-receipt-record-set-evidence-binding.ts"
import {
  P7_R15_RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BINDING_VERSION,
  P7_R15_RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_STATE,
  P7_R15_RECEIPT_LEDGER_SNAPSHOT_MAX_UTF8_BYTES,
  buildP7ReceiptLedgerSnapshotEvidenceBinding,
  p7ReceiptLedgerSnapshotEvidenceBindingIdentity,
  validateP7ReceiptLedgerSnapshotEvidenceBinding,
  type P7ReceiptLedgerSnapshotEvidenceBindingBuildInput,
} from "../src/remediation/p7-receipt-ledger-snapshot-evidence-binding.ts"

type MutableRecord = Record<string, any>
type SchemaRecord = Record<string, any>

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
const SESSION_ID = "session-p7-r15"
const TEST_COMMAND_ID = "js-root-tests-123abc"
const TYPES_COMMAND_ID = "js-root-types-456def"
const GIT_SUMMARY = "Workspace changes are evidenced (diffBytes=12, statusBytes=3)."
const POLICY_SUMMARY = "Every persisted execution receipt was authorized by policy."
const RECEIPT_IDS = [APPLY_RECEIPT_ID, GIT_DIFF_RECEIPT_ID, GIT_STATUS_RECEIPT_ID, TEST_RECEIPT_ID, TYPES_RECEIPT_ID]
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
    claimKey: "p7-r15-source-finding",
    review: {
      reviewRunId: "review-run-p7-r15",
      reviewerId: "provider:test",
      reviewerVersion: "v1",
      policyIdentity: "policy:p7-r15-test",
      canonicalBase: BASE,
      reviewedHead: HEAD,
    },
    path: "src/example.ts",
    range: { startLine: 10, endLine: 12 },
    summary: "A confirmed finding eligible for bounded supplied receipt-ledger snapshot evidence binding.",
    contractClaim: "The candidate violates one bounded invariant.",
    category: "correctness",
    severity: "high",
    confidenceBps: 9000,
    evidenceRefs: ["evidence:finding"],
  }
}

function sourceProposal(): P7ImmutablePatchProposal {
  const runtime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-r15-test-adjudicator" })
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
    proposerIdentity: "kodac:p7-r15-test-proposer",
    patchArtifactDigest: sha256(PATCH),
    changes: CHANGES,
  })
}

function sourceAuthorization(source: P7ImmutablePatchProposal): P7PatchApplicationAuthorization {
  return buildP7PatchApplicationAuthorization({
    sourceProposal: source,
    declaration: {
      authorizerIdentity: "kodac:p7-r15-test-authorizer",
      rationale: "The exact proposal has bounded authorization for one application lineage.",
      evidenceRefs: ["evidence:authorization", "evidence:risk-review"],
    },
  })
}

function sourceIntentBinding(
  source: P7ImmutablePatchProposal,
  authorization: P7PatchApplicationAuthorization,
): P7PatchExecutionIntentBinding {
  return buildP7PatchExecutionIntentBinding({ sourceProposal: source, sourceAuthorization: authorization, patchText: PATCH })
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
  }
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
  const commandReceiptIds = new Map([[TEST_COMMAND_ID, TEST_RECEIPT_ID], [TYPES_COMMAND_ID, TYPES_RECEIPT_ID]])
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
      evidence: [{ kind: "receipt", ref: GIT_STATUS_RECEIPT_ID }, { kind: "receipt", ref: GIT_DIFF_RECEIPT_ID }],
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

function r6Input(): P7PostApplyVerificationReportBindingBuildInput {
  const sourceVerificationPlanBindingInput = r5Input()
  return {
    sourceVerificationPlanBinding: buildP7PostApplyVerificationPlanBinding(sourceVerificationPlanBindingInput),
    sourceVerificationPlanBindingInput,
    verificationReport: verificationReport(sourceVerificationPlanBindingInput.verificationPlan),
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

function r8Input(): P7VerificationCommandSuccessEvidenceBindingBuildInput {
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

function r9Input(): P7AgentCompletionEvidenceBindingBuildInput {
  const sourceCommandSuccessEvidenceBindingInput = r8Input()
  return {
    sourceCommandSuccessEvidenceBinding: buildP7VerificationCommandSuccessEvidenceBinding(sourceCommandSuccessEvidenceBindingInput),
    sourceCommandSuccessEvidenceBindingInput,
    agentCompletionEvent: {
      protocol: "kodac.event",
      version: 1,
      eventId: EVENT_ID,
      sessionId: SESSION_ID,
      sequence: 17,
      emittedAt: COMPLETED_EVENT_AT,
      type: "agent.loop.completed",
      payload: { reason: "completed", budget: { turnsUsed: 2, toolCallsUsed: 1, failuresUsed: 0, elapsedMs: 1_234 } },
    },
  }
}

function r10Input(): P7WorkspaceReferenceEvidenceBindingBuildInput {
  const sourceAgentCompletionEvidenceBindingInput = r9Input()
  return {
    sourceAgentCompletionEvidenceBinding: buildP7AgentCompletionEvidenceBinding(sourceAgentCompletionEvidenceBindingInput),
    sourceAgentCompletionEvidenceBindingInput,
  }
}

function r11Input(): P7GitChangeReportEvidenceBindingBuildInput {
  const sourceWorkspaceReferenceEvidenceBindingInput = r10Input()
  return {
    sourceWorkspaceReferenceEvidenceBinding: buildP7WorkspaceReferenceEvidenceBinding(sourceWorkspaceReferenceEvidenceBindingInput),
    sourceWorkspaceReferenceEvidenceBindingInput,
  }
}

function r12Input(): P7ReceiptReportEvidenceBindingBuildInput {
  const sourceGitChangeReportEvidenceBindingInput = r11Input()
  return {
    sourceGitChangeReportEvidenceBinding: buildP7GitChangeReportEvidenceBinding(sourceGitChangeReportEvidenceBindingInput),
    sourceGitChangeReportEvidenceBindingInput,
  }
}

function r13Input(): P7PolicyReportEvidenceBindingBuildInput {
  const sourceReceiptReportEvidenceBindingInput = r12Input()
  return {
    sourceReceiptReportEvidenceBinding: buildP7ReceiptReportEvidenceBinding(sourceReceiptReportEvidenceBindingInput),
    sourceReceiptReportEvidenceBindingInput,
  }
}

function genericProcessReceipt(receiptId: string, capability: string, seed: string): MutableRecord {
  const output = `${capability}:${seed}`
  return {
    receiptId,
    capability,
    inputDigest: sha256(`input:${seed}`),
    paths: [],
    policy: { decision: "allow", reason: "bounded verification read evidence" },
    startedAt: REPORT_STARTED_AT,
    completedAt: REPORT_COMPLETED_AT,
    result: {
      status: "success",
      outputDigest: sha256(output),
      outputBytes: Buffer.byteLength(output, "utf8"),
      exitCode: 0,
    },
  }
}

function canonicalReceiptRecords(): MutableRecord[] {
  const testExecutionIntentPreimage = testIntent()
  const typesExecutionIntentPreimage = typesIntent()
  return [
    structuredClone(applicationReceipt()) as MutableRecord,
    genericProcessReceipt(GIT_DIFF_RECEIPT_ID, "git.diff", "diff"),
    genericProcessReceipt(GIT_STATUS_RECEIPT_ID, "git.status", "status"),
    successReceipt(
      TEST_COMMAND_ID,
      TEST_RECEIPT_ID,
      testExecutionIntentPreimage,
      TEST_STARTED_AT,
      TEST_COMPLETED_AT,
      "tests passed",
    ),
    successReceipt(
      TYPES_COMMAND_ID,
      TYPES_RECEIPT_ID,
      typesExecutionIntentPreimage,
      TYPES_STARTED_AT,
      TYPES_COMPLETED_AT,
      "types passed",
    ),
  ]
}

function r14Input(records = canonicalReceiptRecords()): P7ReceiptRecordSetEvidenceBindingBuildInput {
  const sourcePolicyReportEvidenceBindingInput = r13Input()
  return {
    sourcePolicyReportEvidenceBinding: buildP7PolicyReportEvidenceBinding(sourcePolicyReportEvidenceBindingInput),
    sourcePolicyReportEvidenceBindingInput,
    receiptRecords: records,
  }
}

function snapshotOf(records: readonly unknown[]): string {
  return `${records.map((record) => JSON.stringify(record)).join("\n")}\n`
}

function fixtureInput(
  snapshotRecords = canonicalReceiptRecords(),
  sourceRecords = canonicalReceiptRecords(),
): P7ReceiptLedgerSnapshotEvidenceBindingBuildInput {
  const sourceReceiptRecordSetEvidenceBindingInput = r14Input(sourceRecords)
  return {
    sourceReceiptRecordSetEvidenceBinding: buildP7ReceiptRecordSetEvidenceBinding(sourceReceiptRecordSetEvidenceBindingInput),
    sourceReceiptRecordSetEvidenceBindingInput,
    receiptLedgerSnapshot: snapshotOf(snapshotRecords),
  }
}

function withSnapshot(
  input: P7ReceiptLedgerSnapshotEvidenceBindingBuildInput,
  receiptLedgerSnapshot: string,
): P7ReceiptLedgerSnapshotEvidenceBindingBuildInput {
  return { ...input, receiptLedgerSnapshot }
}

function replaceFirstLine(snapshot: string, replacement: string): string {
  const lines = snapshot.slice(0, -1).split("\n")
  lines[0] = replacement
  return `${lines.join("\n")}\n`
}

const schema = JSON.parse(
  readFileSync(new URL("../../../schema/p7-receipt-ledger-snapshot-evidence-binding.schema.json", import.meta.url), "utf8"),
) as SchemaRecord
const sourceText = readFileSync(
  new URL("../src/remediation/p7-receipt-ledger-snapshot-evidence-binding.ts", import.meta.url),
  "utf8",
)

function resolveRef(root: SchemaRecord, ref: string): SchemaRecord {
  assert.ok(ref.startsWith("#/$defs/"))
  return root.$defs[ref.slice("#/$defs/".length)] as SchemaRecord
}

function schemaAccepts(nodeValue: unknown, value: unknown, root = schema): boolean {
  const node = nodeValue as SchemaRecord
  if (node.$ref !== undefined) return schemaAccepts(resolveRef(root, node.$ref), value, root)
  if (Object.hasOwn(node, "const") && JSON.stringify(value) !== JSON.stringify(node.const)) return false
  if (node.type === "object") {
    if (value === null || typeof value !== "object" || Array.isArray(value)) return false
    const record = value as MutableRecord
    const properties = (node.properties ?? {}) as SchemaRecord
    if (Array.isArray(node.required) && node.required.some((key: string) => !Object.hasOwn(record, key))) return false
    if (node.additionalProperties === false && Object.keys(record).some((key) => !Object.hasOwn(properties, key))) return false
    return Object.entries(properties).every(([key, child]) => !Object.hasOwn(record, key) || schemaAccepts(child, record[key], root))
  }
  if (node.type === "string") {
    if (typeof value !== "string") return false
    const length = [...value].length
    if (typeof node.minLength === "number" && length < node.minLength) return false
    if (typeof node.maxLength === "number" && length > node.maxLength) return false
    if (typeof node.pattern === "string" && !(new RegExp(node.pattern).test(value))) return false
    return true
  }
  if (node.type === "integer") {
    if (typeof value !== "number" || !Number.isInteger(value)) return false
    if (typeof node.minimum === "number" && value < node.minimum) return false
    if (typeof node.maximum === "number" && value > node.maximum) return false
    return true
  }
  if (node.type === "array") {
    if (!Array.isArray(value)) return false
    if (typeof node.minItems === "number" && value.length < node.minItems) return false
    if (typeof node.maxItems === "number" && value.length > node.maxItems) return false
    if (node.uniqueItems === true && new Set(value.map((item) => JSON.stringify(item))).size !== value.length) return false
    return node.items === undefined || value.every((item) => schemaAccepts(node.items, item, root))
  }
  return true
}

test("P7-R15 builds, validates, commits exact snapshot representation, and matches schema", () => {
  const input = fixtureInput()
  const built = buildP7ReceiptLedgerSnapshotEvidenceBinding(input)
  const expectedOrder = canonicalReceiptRecords().map((record) => record.receiptId)

  assert.equal(built.version, P7_R15_RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BINDING_VERSION)
  assert.equal(built.state, P7_R15_RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_STATE)
  assert.equal(built.sourceReceiptRecordSetEvidenceIdentity, input.sourceReceiptRecordSetEvidenceBinding.evidenceIdentity)
  assert.equal(built.receiptCount, RECEIPT_IDS.length)
  assert.equal(built.receiptLedgerLineCount, RECEIPT_IDS.length)
  assert.deepEqual(built.receiptIds, [...RECEIPT_IDS].sort())
  assert.deepEqual(built.receiptLedgerOrder, expectedOrder)
  assert.equal(built.receiptLedgerSnapshotUtf8Bytes, Buffer.byteLength(input.receiptLedgerSnapshot, "utf8"))
  assert.equal(built.receiptLedgerSnapshotSha256, sha256(input.receiptLedgerSnapshot))
  assert.equal(built.evidenceIdentity, p7ReceiptLedgerSnapshotEvidenceBindingIdentity(input))
  assert.deepEqual(validateP7ReceiptLedgerSnapshotEvidenceBinding(built, input), built)
  assert.equal(schemaAccepts(schema, built), true)
  assert.equal(Object.isFrozen(built), true)
  assert.equal(Object.isFrozen(built.receiptIds), true)
  assert.equal(Object.isFrozen(built.receiptLedgerOrder), true)
})

test("P7-R15 preserves ledger line order while R14 semantic set identity remains order-independent", () => {
  const sourceRecords = canonicalReceiptRecords()
  const first = fixtureInput(sourceRecords, sourceRecords)
  const second = fixtureInput([...sourceRecords].reverse(), sourceRecords)
  const builtFirst = buildP7ReceiptLedgerSnapshotEvidenceBinding(first)
  const builtSecond = buildP7ReceiptLedgerSnapshotEvidenceBinding(second)

  assert.equal(builtFirst.sourceReceiptRecordSetEvidenceIdentity, builtSecond.sourceReceiptRecordSetEvidenceIdentity)
  assert.deepEqual(builtFirst.receiptIds, builtSecond.receiptIds)
  assert.deepEqual(builtSecond.receiptLedgerOrder, [...builtFirst.receiptLedgerOrder].reverse())
  assert.notEqual(builtFirst.receiptLedgerSnapshotSha256, builtSecond.receiptLedgerSnapshotSha256)
  assert.notEqual(builtFirst.receiptLedgerSnapshotIdentity, builtSecond.receiptLedgerSnapshotIdentity)
  assert.notEqual(builtFirst.evidenceIdentity, builtSecond.evidenceIdentity)
})

test("P7-R15 rejects malformed, ambiguous, or non-writer-compatible supplied snapshot grammar", () => {
  const base = fixtureInput()
  const valid = base.receiptLedgerSnapshot
  const firstLine = valid.slice(0, valid.indexOf("\n"))
  const duplicateKeyLine = `${firstLine.slice(0, -1)},"receiptId":"${APPLY_RECEIPT_ID}"}`
  const internalWhitespaceLine = firstLine.replace('"receiptId":', '"receiptId" :')

  const cases: Array<[string, RegExp]> = [
    ["", /must not be empty/],
    [valid.slice(0, -1), /exactly one LF/],
    [`${valid}\n`, /exactly one LF/],
    [valid.replace("\n", "\r\n"), /CR characters/],
    [valid.replace("\n", "\n\n"), /non-empty JSONL lines/],
    [` ${valid}`, /JSON\.stringify/],
    [valid.replace("\n", " \n"), /JSON\.stringify/],
    [replaceFirstLine(valid, "{"), /valid JSON/],
    [replaceFirstLine(valid, "1"), /receipt record|plain object/],
    [replaceFirstLine(valid, internalWhitespaceLine), /JSON\.stringify/],
    [replaceFirstLine(valid, duplicateKeyLine), /JSON\.stringify/],
  ]

  for (const [snapshot, expected] of cases) {
    assert.throws(() => buildP7ReceiptLedgerSnapshotEvidenceBinding(withSnapshot(base, snapshot)), expected)
  }
})

test("P7-R15 fails closed on set mismatch, substitution, Unicode hazards, and bounded resource excess", () => {
  const sourceRecords = canonicalReceiptRecords()
  const base = fixtureInput(sourceRecords, sourceRecords)

  assert.throws(
    () => buildP7ReceiptLedgerSnapshotEvidenceBinding(withSnapshot(base, snapshotOf(sourceRecords.slice(0, -1)))),
    /length|receipt count|canonical source-derived/,
  )

  const extra = [...sourceRecords, genericProcessReceipt("723e4567-e89b-42d3-a456-426614174006", "git.head", "extra")]
  assert.throws(
    () => buildP7ReceiptLedgerSnapshotEvidenceBinding(withSnapshot(base, snapshotOf(extra))),
    /length|receipt count|canonical source-derived/,
  )

  const duplicate = structuredClone(sourceRecords) as MutableRecord[]
  duplicate[1] = structuredClone(duplicate[0])
  assert.throws(
    () => buildP7ReceiptLedgerSnapshotEvidenceBinding(withSnapshot(base, snapshotOf(duplicate))),
    /duplicate|receipt-id set|canonical source-derived/,
  )

  const substituted = structuredClone(sourceRecords) as MutableRecord[]
  substituted[1]!.policy.reason = "substituted receipt semantics"
  assert.throws(
    () => buildP7ReceiptLedgerSnapshotEvidenceBinding(withSnapshot(base, snapshotOf(substituted))),
    /canonical source-derived|evidenceIdentity|semantics/,
  )

  const unsafeUnicode = structuredClone(sourceRecords) as MutableRecord[]
  unsafeUnicode[1]!.policy.reason = "\ud800"
  assert.throws(
    () => buildP7ReceiptLedgerSnapshotEvidenceBinding(withSnapshot(base, snapshotOf(unsafeUnicode))),
    /Unicode scalar/,
  )

  const oversized = `${"x".repeat(P7_R15_RECEIPT_LEDGER_SNAPSHOT_MAX_UTF8_BYTES)}\n`
  assert.throws(
    () => buildP7ReceiptLedgerSnapshotEvidenceBinding(withSnapshot(base, oversized)),
    /at most 16777216 UTF-8 bytes/,
  )

  const excessiveLines = "{}\n".repeat(257)
  assert.throws(
    () => buildP7ReceiptLedgerSnapshotEvidenceBinding(withSnapshot(base, excessiveLines)),
    /at most 256 lines/,
  )
})

test("P7-R15 independently revalidates source R14 identity and nested predecessor input", () => {
  const base = fixtureInput()

  const mutatedSource = structuredClone(base) as MutableRecord
  mutatedSource.sourceReceiptRecordSetEvidenceBinding.evidenceIdentity = "f".repeat(64)
  assert.throws(
    () => buildP7ReceiptLedgerSnapshotEvidenceBinding(mutatedSource as P7ReceiptLedgerSnapshotEvidenceBindingBuildInput),
    /evidenceIdentity|canonical source-derived/,
  )

  const mutatedInput = structuredClone(base) as MutableRecord
  mutatedInput.sourceReceiptRecordSetEvidenceBindingInput
    .sourcePolicyReportEvidenceBindingInput
    .sourceReceiptReportEvidenceBindingInput
    .sourceGitChangeReportEvidenceBindingInput
    .sourceWorkspaceReferenceEvidenceBindingInput
    .sourceAgentCompletionEvidenceBindingInput
    .sourceCommandSuccessEvidenceBindingInput
    .sourceVerificationReportBindingInput
    .sourceVerificationPlanBindingInput
    .sourceAppliedEvidenceInput
    .sourceProposal
    .targetHead = "c".repeat(40)
  assert.throws(
    () => buildP7ReceiptLedgerSnapshotEvidenceBinding(mutatedInput as P7ReceiptLedgerSnapshotEvidenceBindingBuildInput),
    /identity|targetHead|canonical|source|evaluatedHead|current head/,
  )
})

test("P7-R15 output validation rejects scalar tampering and hostile object graphs", () => {
  const input = fixtureInput()
  const built = buildP7ReceiptLedgerSnapshotEvidenceBinding(input)

  const tamperedDigest = structuredClone(built) as MutableRecord
  tamperedDigest.receiptLedgerSnapshotSha256 = "f".repeat(64)
  assert.throws(() => validateP7ReceiptLedgerSnapshotEvidenceBinding(tamperedDigest, input), /canonical source-derived semantics/)

  const tamperedOrder = structuredClone(built) as MutableRecord
  tamperedOrder.receiptLedgerOrder.reverse()
  assert.throws(() => validateP7ReceiptLedgerSnapshotEvidenceBinding(tamperedOrder, input), /canonical source-derived semantics/)

  const unknown = structuredClone(built) as MutableRecord
  unknown.unexpected = true
  assert.throws(() => validateP7ReceiptLedgerSnapshotEvidenceBinding(unknown, input), /unknown field/)
  assert.equal(schemaAccepts(schema, unknown), false)

  const accessor = structuredClone(built) as MutableRecord
  Object.defineProperty(accessor, "state", { enumerable: true, get: () => built.state })
  assert.throws(() => validateP7ReceiptLedgerSnapshotEvidenceBinding(accessor, input), /data property/)

  assert.throws(
    () => validateP7ReceiptLedgerSnapshotEvidenceBinding(new Proxy(structuredClone(built), {}), input),
    /Proxy/,
  )

  const symbol = structuredClone(built) as MutableRecord
  Object.defineProperty(symbol, Symbol("hidden"), { value: true, enumerable: true })
  assert.throws(() => validateP7ReceiptLedgerSnapshotEvidenceBinding(symbol, input), /symbol/)

  const customPrototype = structuredClone(built) as MutableRecord
  Object.setPrototypeOf(customPrototype, { inherited: true })
  assert.throws(() => validateP7ReceiptLedgerSnapshotEvidenceBinding(customPrototype, input), /plain object/)

  const sparse = structuredClone(built) as MutableRecord
  delete sparse.receiptLedgerOrder[0]
  assert.throws(() => validateP7ReceiptLedgerSnapshotEvidenceBinding(sparse, input), /sparse/)

  const alias = structuredClone(built) as MutableRecord
  alias.receiptLedgerOrder = alias.receiptIds
  assert.throws(() => validateP7ReceiptLedgerSnapshotEvidenceBinding(alias, input), /aliases or cycles/)

  const cycle = structuredClone(built) as MutableRecord
  cycle.self = cycle
  assert.throws(() => validateP7ReceiptLedgerSnapshotEvidenceBinding(cycle, input), /aliases or cycles/)
})

test("P7-R15 source remains pure data-only and excludes forbidden execution/ledger surfaces", () => {
  for (const forbidden of [
    "node:fs",
    "readReceiptLedger",
    "JsonlReceiptLedger",
    "ExecutionGateway",
    "runVerificationEngine",
    "child_process",
    "process.env",
    "fetch(",
    "repo.apply_patch",
  ]) {
    assert.equal(sourceText.includes(forbidden), false, `source must not contain forbidden surface: ${forbidden}`)
  }
})
