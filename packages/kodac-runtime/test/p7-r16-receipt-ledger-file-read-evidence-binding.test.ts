import assert from "node:assert/strict"
import { Buffer } from "node:buffer"
import { createHash } from "node:crypto"
import { link, mkdtemp, mkdir, open, rename, rm, symlink, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
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
  buildP7ReceiptLedgerSnapshotEvidenceBinding,
  type P7ReceiptLedgerSnapshotEvidenceBindingBuildInput,
} from "../src/remediation/p7-receipt-ledger-snapshot-evidence-binding.ts"
import {
  P7_R16_RECEIPT_LEDGER_FILE_READ_EVIDENCE_BINDING_VERSION,
  P7_R16_RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_STATE,
  P7_R16_RECEIPT_LEDGER_FILE_READ_MAX_UTF8_BYTES,
  buildP7ReceiptLedgerFileReadEvidenceBinding,
  validateP7ReceiptLedgerFileReadEvidenceBinding,
  type P7ReceiptLedgerFileReadEvidenceBindingBuildInput,
} from "../src/remediation/p7-receipt-ledger-file-read-evidence-binding.ts"

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
const SESSION_ID = "session-p7-r16"
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

function sha256(value: string | Uint8Array): string {
  return createHash("sha256").update(value).digest("hex")
}

function claim(): Record<string, unknown> {
  return {
    claimKey: "p7-r16-source-finding",
    review: {
      reviewRunId: "review-run-p7-r16",
      reviewerId: "provider:test",
      reviewerVersion: "v1",
      policyIdentity: "policy:p7-r16-test",
      canonicalBase: BASE,
      reviewedHead: HEAD,
    },
    path: "src/example.ts",
    range: { startLine: 10, endLine: 12 },
    summary: "A confirmed finding eligible for bounded receipt-ledger file-read evidence binding.",
    contractClaim: "The candidate violates one bounded invariant.",
    category: "correctness",
    severity: "high",
    confidenceBps: 9000,
    evidenceRefs: ["evidence:finding"],
  }
}

function sourceProposal(): P7ImmutablePatchProposal {
  const runtime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-r16-test-adjudicator" })
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
    proposerIdentity: "kodac:p7-r16-test-proposer",
    patchArtifactDigest: sha256(PATCH),
    changes: CHANGES,
  })
}

function sourceAuthorization(source: P7ImmutablePatchProposal): P7PatchApplicationAuthorization {
  return buildP7PatchApplicationAuthorization({
    sourceProposal: source,
    declaration: {
      authorizerIdentity: "kodac:p7-r16-test-authorizer",
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
    successReceipt(TEST_COMMAND_ID, TEST_RECEIPT_ID, testExecutionIntentPreimage, TEST_STARTED_AT, TEST_COMPLETED_AT, "tests passed"),
    successReceipt(TYPES_COMMAND_ID, TYPES_RECEIPT_ID, typesExecutionIntentPreimage, TYPES_STARTED_AT, TYPES_COMPLETED_AT, "types passed"),
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

function r15Input(records = canonicalReceiptRecords()): P7ReceiptLedgerSnapshotEvidenceBindingBuildInput {
  const sourceReceiptRecordSetEvidenceBindingInput = r14Input(records)
  return {
    sourceReceiptRecordSetEvidenceBinding: buildP7ReceiptRecordSetEvidenceBinding(sourceReceiptRecordSetEvidenceBindingInput),
    sourceReceiptRecordSetEvidenceBindingInput,
    receiptLedgerSnapshot: snapshotOf(records),
  }
}

async function fixtureInput(
  root: string,
  fileName = "receipts.jsonl",
  records = canonicalReceiptRecords(),
): Promise<P7ReceiptLedgerFileReadEvidenceBindingBuildInput> {
  const sourceReceiptLedgerSnapshotEvidenceBindingInput = r15Input(records)
  const receiptLedgerPath = join(root, fileName)
  await writeFile(receiptLedgerPath, sourceReceiptLedgerSnapshotEvidenceBindingInput.receiptLedgerSnapshot, "utf8")
  return {
    sourceReceiptLedgerSnapshotEvidenceBinding: buildP7ReceiptLedgerSnapshotEvidenceBinding(sourceReceiptLedgerSnapshotEvidenceBindingInput),
    sourceReceiptLedgerSnapshotEvidenceBindingInput,
    receiptLedgerPath,
  }
}

const schema = JSON.parse(
  readFileSync(new URL("../../../schema/p7-receipt-ledger-file-read-evidence-binding.schema.json", import.meta.url), "utf8"),
) as SchemaRecord
const sourceText = readFileSync(
  new URL("../src/remediation/p7-receipt-ledger-file-read-evidence-binding.ts", import.meta.url),
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

async function withTemp<T>(run: (root: string) => Promise<T>): Promise<T> {
  const root = await mkdtemp(join(tmpdir(), "kodac-p7-r16-"))
  try {
    return await run(root)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
}

async function fileHandlePrototype(path: string): Promise<MutableRecord> {
  const probe = await open(path, "r")
  try {
    return Object.getPrototypeOf(probe) as MutableRecord
  } finally {
    await probe.close()
  }
}

test("P7-R16 builds and validates one exact stable local ledger read", async () => {
  await withTemp(async (root) => {
    const input = await fixtureInput(root)
    const built = await buildP7ReceiptLedgerFileReadEvidenceBinding(input)
    const expectedSnapshot = input.sourceReceiptLedgerSnapshotEvidenceBindingInput.receiptLedgerSnapshot

    assert.equal(built.version, P7_R16_RECEIPT_LEDGER_FILE_READ_EVIDENCE_BINDING_VERSION)
    assert.equal(built.state, P7_R16_RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_STATE)
    assert.equal(built.sourceReceiptLedgerSnapshotEvidenceIdentity, input.sourceReceiptLedgerSnapshotEvidenceBinding.evidenceIdentity)
    assert.equal(built.receiptLedgerPathSha256, sha256(input.receiptLedgerPath))
    assert.equal(built.receiptLedgerReadUtf8Bytes, Buffer.byteLength(expectedSnapshot, "utf8"))
    assert.equal(built.receiptLedgerReadSha256, sha256(expectedSnapshot))
    assert.deepEqual(built.receiptIds, [...RECEIPT_IDS].sort())
    assert.equal(schemaAccepts(schema, built), true)
    assert.equal(Object.isFrozen(built), true)
    assert.equal(Object.isFrozen(built.receiptIds), true)
    assert.deepEqual(await validateP7ReceiptLedgerFileReadEvidenceBinding(built, input), built)
  })
})

test("P7-R16 is deterministic for an unchanged same path and makes path identity significant", async () => {
  await withTemp(async (root) => {
    const firstInput = await fixtureInput(root, "one.jsonl")
    const first = await buildP7ReceiptLedgerFileReadEvidenceBinding(firstInput)
    const repeated = await buildP7ReceiptLedgerFileReadEvidenceBinding(firstInput)
    assert.deepEqual(repeated, first)

    const secondInput = await fixtureInput(root, "two.jsonl")
    const second = await buildP7ReceiptLedgerFileReadEvidenceBinding(secondInput)
    assert.notEqual(second.receiptLedgerPathSha256, first.receiptLedgerPathSha256)
    assert.notEqual(second.receiptLedgerFileObservationIdentity, first.receiptLedgerFileObservationIdentity)
    assert.notEqual(second.receiptLedgerReadIdentity, first.receiptLedgerReadIdentity)
    assert.notEqual(second.evidenceIdentity, first.evidenceIdentity)
  })
})

test("P7-R16 rejects same-descriptor metadata drift after the exact read", async () => {
  await withTemp(async (root) => {
    const input = await fixtureInput(root)
    const prototype = await fileHandlePrototype(input.receiptLedgerPath)
    const originalRead = prototype.read as (...args: any[]) => Promise<any>
    let mutated = false
    prototype.read = async function (...args: any[]): Promise<any> {
      const result = await originalRead.apply(this, args)
      if (!mutated && args[3] === 0) {
        mutated = true
        const changedAt = new Date("2035-01-02T03:04:05.000Z")
        await (this as { utimes(atime: Date, mtime: Date): Promise<void> }).utimes(changedAt, changedAt)
      }
      return result
    }
    try {
      await assert.rejects(
        () => buildP7ReceiptLedgerFileReadEvidenceBinding(input),
        /metadata changed during same-descriptor read/,
      )
      assert.equal(mutated, true)
    } finally {
      prototype.read = originalRead
    }
  })
})

test("P7-R16 rejects post-read path identity replacement", { skip: process.platform === "win32" }, async () => {
  await withTemp(async (root) => {
    const input = await fixtureInput(root)
    const prototype = await fileHandlePrototype(input.receiptLedgerPath)
    const originalStat = prototype.stat as (...args: any[]) => Promise<any>
    let statCalls = 0
    let replaced = false
    prototype.stat = async function (...args: any[]): Promise<any> {
      const result = await originalStat.apply(this, args)
      statCalls += 1
      if (statCalls === 2) {
        await rename(input.receiptLedgerPath, join(root, "receipts-original.jsonl"))
        await writeFile(
          input.receiptLedgerPath,
          input.sourceReceiptLedgerSnapshotEvidenceBindingInput.receiptLedgerSnapshot,
          "utf8",
        )
        replaced = true
      }
      return result
    }
    try {
      await assert.rejects(
        () => buildP7ReceiptLedgerFileReadEvidenceBinding(input),
        /path identity changed during read/,
      )
      assert.equal(replaced, true)
    } finally {
      prototype.stat = originalStat
    }
  })
})

test("P7-R16 rejects content substitution and predecessor lineage mutation", async () => {
  await withTemp(async (root) => {
    const input = await fixtureInput(root)
    const built = await buildP7ReceiptLedgerFileReadEvidenceBinding(input)

    await writeFile(input.receiptLedgerPath, `${input.sourceReceiptLedgerSnapshotEvidenceBindingInput.receiptLedgerSnapshot} `, "utf8")
    await assert.rejects(() => validateP7ReceiptLedgerFileReadEvidenceBinding(built, input), /source P7-R15|snapshot|canonical/)

    await writeFile(input.receiptLedgerPath, input.sourceReceiptLedgerSnapshotEvidenceBindingInput.receiptLedgerSnapshot, "utf8")
    const mutated = structuredClone(input) as MutableRecord
    mutated.sourceReceiptLedgerSnapshotEvidenceBindingInput.sourceReceiptRecordSetEvidenceBindingInput.sourcePolicyReportEvidenceBindingInput
      .sourceReceiptReportEvidenceBindingInput.sourceGitChangeReportEvidenceBindingInput.sourceWorkspaceReferenceEvidenceBindingInput
      .sourceAgentCompletionEvidenceBindingInput.sourceCommandSuccessEvidenceBindingInput.sourceVerificationReportBindingInput
      .sourceVerificationPlanBindingInput.sourceAppliedEvidenceInput.sourceProposal.targetHead = "c".repeat(40)
    await assert.rejects(
      () => buildP7ReceiptLedgerFileReadEvidenceBinding(mutated as P7ReceiptLedgerFileReadEvidenceBindingBuildInput),
      /identity|targetHead|canonical|source|evaluatedHead|current head/,
    )
  })
})

test("P7-R16 rejects line-order drift unless the exact source R15 identity changes consistently", async () => {
  await withTemp(async (root) => {
    const original = await fixtureInput(root, "original.jsonl")
    const originalBuilt = await buildP7ReceiptLedgerFileReadEvidenceBinding(original)

    const reversedRecords = [...canonicalReceiptRecords()].reverse()
    const consistent = await fixtureInput(root, "reversed.jsonl", reversedRecords)
    const consistentBuilt = await buildP7ReceiptLedgerFileReadEvidenceBinding(consistent)

    assert.notEqual(
      consistent.sourceReceiptLedgerSnapshotEvidenceBinding.evidenceIdentity,
      original.sourceReceiptLedgerSnapshotEvidenceBinding.evidenceIdentity,
    )
    assert.notEqual(consistentBuilt.receiptLedgerReadSha256, originalBuilt.receiptLedgerReadSha256)
    assert.notEqual(consistentBuilt.receiptLedgerReadIdentity, originalBuilt.receiptLedgerReadIdentity)
    assert.notEqual(consistentBuilt.evidenceIdentity, originalBuilt.evidenceIdentity)

    await writeFile(
      original.receiptLedgerPath,
      consistent.sourceReceiptLedgerSnapshotEvidenceBindingInput.receiptLedgerSnapshot,
      "utf8",
    )
    await assert.rejects(
      () => buildP7ReceiptLedgerFileReadEvidenceBinding(original),
      /receipt ledger snapshot evidence binding|canonical source-derived semantics|source P7-R15|snapshot/,
    )
  })
})

test("P7-R16 rejects invalid path, missing, empty, oversized, non-regular, and malformed UTF-8 inputs", async () => {
  await withTemp(async (root) => {
    const base = await fixtureInput(root)
    await assert.rejects(
      () => buildP7ReceiptLedgerFileReadEvidenceBinding({ ...base, receiptLedgerPath: "" }),
      /must not be empty/,
    )
    await assert.rejects(
      () => buildP7ReceiptLedgerFileReadEvidenceBinding({ ...base, receiptLedgerPath: "bad\0path" }),
      /NUL/,
    )
    await assert.rejects(
      () => buildP7ReceiptLedgerFileReadEvidenceBinding({ ...base, receiptLedgerPath: join(root, "missing.jsonl") }),
    )

    const empty = join(root, "empty.jsonl")
    await writeFile(empty, "")
    await assert.rejects(
      () => buildP7ReceiptLedgerFileReadEvidenceBinding({ ...base, receiptLedgerPath: empty }),
      /must not be empty/,
    )

    const malformed = join(root, "malformed.jsonl")
    await writeFile(malformed, Buffer.from([0xc3, 0x28]))
    await assert.rejects(
      () => buildP7ReceiptLedgerFileReadEvidenceBinding({ ...base, receiptLedgerPath: malformed }),
      /strict UTF-8/,
    )

    const oversized = join(root, "oversized.jsonl")
    await writeFile(oversized, Buffer.alloc(P7_R16_RECEIPT_LEDGER_FILE_READ_MAX_UTF8_BYTES + 1, 0x61))
    await assert.rejects(
      () => buildP7ReceiptLedgerFileReadEvidenceBinding({ ...base, receiptLedgerPath: oversized }),
      /at most 16777216 bytes/,
    )

    const directory = join(root, "directory")
    await mkdir(directory)
    await assert.rejects(
      () => buildP7ReceiptLedgerFileReadEvidenceBinding({ ...base, receiptLedgerPath: directory }),
    )
  })
})

test("P7-R16 rejects hard-link and symlink ambiguity without mutating the ledger", async (t) => {
  await withTemp(async (root) => {
    const input = await fixtureInput(root)
    const snapshot = input.sourceReceiptLedgerSnapshotEvidenceBindingInput.receiptLedgerSnapshot

    const hardTarget = join(root, "hard-target.jsonl")
    const hardAlias = join(root, "hard-alias.jsonl")
    await writeFile(hardTarget, snapshot, "utf8")
    try {
      await link(hardTarget, hardAlias)
      await assert.rejects(
        () => buildP7ReceiptLedgerFileReadEvidenceBinding({ ...input, receiptLedgerPath: hardTarget }),
        /single-link/,
      )
    } catch (error) {
      const code = (error as { code?: string }).code
      if (code === "EPERM" || code === "EACCES" || code === "ENOTSUP") t.diagnostic(`hard-link fixture unavailable: ${code}`)
      else throw error
    }

    const symlinkTarget = join(root, "symlink-target.jsonl")
    const symlinkPath = join(root, "symlink.jsonl")
    await writeFile(symlinkTarget, snapshot, "utf8")
    try {
      await symlink(symlinkTarget, symlinkPath, "file")
      await assert.rejects(
        () => buildP7ReceiptLedgerFileReadEvidenceBinding({ ...input, receiptLedgerPath: symlinkPath }),
        /symbolic link|ELOOP|EINVAL|EPERM/,
      )
    } catch (error) {
      const code = (error as { code?: string }).code
      if (code === "EPERM" || code === "EACCES" || code === "ENOTSUP") t.diagnostic(`symlink fixture unavailable: ${code}`)
      else throw error
    }
  })
})

test("P7-R16 rejects snapshot grammar changes through exact canonical R15 revalidation", async () => {
  await withTemp(async (root) => {
    const input = await fixtureInput(root)
    const valid = input.sourceReceiptLedgerSnapshotEvidenceBindingInput.receiptLedgerSnapshot
    const firstNewline = valid.indexOf("\n")
    const firstLine = valid.slice(0, firstNewline)
    const nonCanonicalLine = firstLine.replace('"receiptId":', '"receiptId" :')
    const nonCanonical = `${nonCanonicalLine}${valid.slice(firstNewline)}`
    const variants: Array<[string, RegExp]> = [
      [valid.replace("\n", "\r\n"), /CR characters/],
      [valid.replace("\n", "\n\n"), /non-empty JSONL lines/],
      [valid.slice(0, -1), /exactly one LF/],
      [nonCanonical, /JSON\.stringify/],
    ]
    for (const [snapshot, expected] of variants) {
      await writeFile(input.receiptLedgerPath, snapshot, "utf8")
      await assert.rejects(
        () => buildP7ReceiptLedgerFileReadEvidenceBinding(input),
        expected,
      )
    }
  })
})

test("P7-R16 output validation is closed, hostile-value resistant, and leaks no raw read inputs", async () => {
  await withTemp(async (root) => {
    const input = await fixtureInput(root)
    const built = await buildP7ReceiptLedgerFileReadEvidenceBinding(input)
    const raw = built as unknown as MutableRecord

    assert.equal(Object.hasOwn(raw, "receiptLedgerPath"), false)
    assert.equal(Object.hasOwn(raw, "receiptLedgerSnapshot"), false)
    for (const key of ["dev", "ino", "size", "mode", "uid", "gid", "nlink", "mtimeNs", "ctimeNs"]) {
      assert.equal(Object.hasOwn(raw, key), false)
    }

    const extra = { ...built, unexpected: true }
    await assert.rejects(() => validateP7ReceiptLedgerFileReadEvidenceBinding(extra, input), /unknown field/)

    const mutatedObservation = { ...built, receiptLedgerFileObservationIdentity: "f".repeat(64) }
    await assert.rejects(
      () => validateP7ReceiptLedgerFileReadEvidenceBinding(mutatedObservation, input),
      /does not match canonical source\/read-derived semantics/,
    )

    const accessor = Object.create(null) as MutableRecord
    for (const [key, value] of Object.entries(built)) accessor[key] = value
    Object.defineProperty(accessor, "state", { enumerable: true, get: () => built.state })
    await assert.rejects(() => validateP7ReceiptLedgerFileReadEvidenceBinding(accessor, input), /data property/)

    const proxied = new Proxy({ ...built }, {})
    await assert.rejects(() => validateP7ReceiptLedgerFileReadEvidenceBinding(proxied, input), /Proxy/)

    const symbolic = { ...built } as MutableRecord
    Object.defineProperty(symbolic, Symbol("hidden"), { value: true, enumerable: true })
    await assert.rejects(() => validateP7ReceiptLedgerFileReadEvidenceBinding(symbolic, input), /symbol/)

    const customPrototype = Object.assign(Object.create({ injected: true }), built)
    await assert.rejects(() => validateP7ReceiptLedgerFileReadEvidenceBinding(customPrototype, input), /plain object/)

    const sparse = { ...built, receiptIds: new Array(built.receiptIds.length) } as MutableRecord
    sparse.receiptIds[0] = built.receiptIds[0]
    await assert.rejects(() => validateP7ReceiptLedgerFileReadEvidenceBinding(sparse, input), /sparse/)

    const aliased = { ...built, receiptIds: built.receiptIds } as MutableRecord
    aliased.self = aliased
    await assert.rejects(() => validateP7ReceiptLedgerFileReadEvidenceBinding(aliased, input), /unknown field|aliases|cycles/)

    assert.equal(schemaAccepts(schema, built), true)
    assert.equal(schemaAccepts(schema, extra), false)
    assert.equal(schemaAccepts(schema, mutatedObservation), true)
  })
})

test("P7-R16 source contains only the authorized read-only execution surface", () => {
  const imports = [...sourceText.matchAll(/\bfrom\s+["']([^"']+)["']/g)].map((match) => match[1])
  assert.deepEqual(imports, [
    "node:buffer",
    "node:crypto",
    "node:fs",
    "node:fs/promises",
    "node:util",
    "./p7-receipt-ledger-snapshot-evidence-binding.ts",
  ])
  assert.equal(/\bimport\s*\(/.test(sourceText), false)
  for (const forbidden of [
    "readReceiptLedger",
    "JsonlReceiptLedger",
    "ExecutionGateway",
    "runVerificationEngine",
    "DoneGate",
    "child_process",
    "node:net",
    "node:http",
    "node:https",
    "fetch(",
    "writeFile",
    "appendFile",
    "truncate",
    "chmod",
    "rename",
    "unlink",
    "mkdir",
  ]) {
    assert.equal(sourceText.includes(forbidden), false, `forbidden production surface: ${forbidden}`)
  }
})
