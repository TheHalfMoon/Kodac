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
  buildP7PolicyReportEvidenceBinding,
  type P7PolicyReportEvidenceBindingBuildInput,
} from "../src/remediation/p7-policy-report-evidence-binding.ts"
import {
  P7_R14_RECEIPT_RECORD_SET_EVIDENCE_BINDING_VERSION,
  P7_R14_RECEIPT_RECORD_SET_EVIDENCE_BOUND_STATE,
  buildP7ReceiptRecordSetEvidenceBinding,
  p7ReceiptRecordSetEvidenceBindingIdentity,
  validateP7ReceiptRecordSetEvidenceBinding,
  type P7ReceiptRecordSetEvidenceBindingBuildInput,
} from "../src/remediation/p7-receipt-record-set-evidence-binding.ts"

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
const SESSION_ID = "session-p7-r14"
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
    claimKey: "p7-r14-source-finding",
    review: {
      reviewRunId: "review-run-p7-r14",
      reviewerId: "provider:test",
      reviewerVersion: "v1",
      policyIdentity: "policy:p7-r14-test",
      canonicalBase: BASE,
      reviewedHead: HEAD,
    },
    path: "src/example.ts",
    range: { startLine: 10, endLine: 12 },
    summary: "A confirmed finding eligible for bounded receipt-record evidence binding.",
    contractClaim: "The candidate violates one bounded invariant.",
    category: "correctness",
    severity: "high",
    confidenceBps: 9000,
    evidenceRefs: ["evidence:finding"],
  }
}

function sourceProposal(): P7ImmutablePatchProposal {
  const runtime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-r14-test-adjudicator" })
  const finding = runtime.createFinding(claim(), HEAD)
  const { adjudication } = runtime.applyAdjudication(finding, { action: "CONFIRM", evidenceRefs: ["evidence:confirmed"] }, HEAD)
  return buildP7ImmutablePatchProposal({
    repositoryIdentity: "github.com/TheHalfMoon/Kodac",
    canonicalBase: BASE,
    targetHead: HEAD,
    sourceFinding: finding,
    sourceAdjudication: adjudication,
    proposerIdentity: "kodac:p7-r14-test-proposer",
    patchArtifactDigest: sha256(PATCH),
    changes: CHANGES,
  })
}

function sourceAuthorization(source: P7ImmutablePatchProposal): P7PatchApplicationAuthorization {
  return buildP7PatchApplicationAuthorization({
    sourceProposal: source,
    declaration: {
      authorizerIdentity: "kodac:p7-r14-test-authorizer",
      rationale: "The exact proposal has bounded authorization for one application lineage.",
      evidenceRefs: ["evidence:authorization", "evidence:risk-review"],
    },
  })
}

function sourceIntentBinding(source: P7ImmutablePatchProposal, authorization: P7PatchApplicationAuthorization): P7PatchExecutionIntentBinding {
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
      { id: TEST_COMMAND_ID, category: "tests", executable: "node", args: ["scripts/run-tests.mjs"], timeoutMs: 120_000, maxOutputBytes: 1_048_576 },
      { id: TYPES_COMMAND_ID, category: "types", executable: "node", args: ["node_modules/typescript/bin/tsc", "-p", "tsconfig.json", "--noEmit"], timeoutMs: 60_000, maxOutputBytes: 1_048_576 },
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
    { id: "agent.completed", category: "agent", status: "pass", summary: "Bounded agent loop completed normally.", evidence: [{ kind: "event", ref: `session:${SESSION_ID}:agent.loop.completed` }] },
    { id: "workspace.integrity", category: "workspace", status: "pass", summary: "Workspace root and Git metadata are present.", evidence: [{ kind: "workspace", ref: WORKSPACE, digest: sha256(WORKSPACE) }] },
    { id: "git.diff", category: "diff", status: "pass", summary: GIT_SUMMARY, evidence: [{ kind: "receipt", ref: GIT_STATUS_RECEIPT_ID }, { kind: "receipt", ref: GIT_DIFF_RECEIPT_ID }] },
    { id: "evidence.receipts", category: "receipts", status: "pass", summary: RECEIPT_SUMMARY, evidence: RECEIPT_IDS.map((ref) => ({ kind: "receipt", ref })) },
    { id: "evidence.policy", category: "policy", status: "pass", summary: POLICY_SUMMARY, evidence: RECEIPT_IDS.map((ref) => ({ kind: "receipt", ref })) },
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
    checks: [...base, ...commands, {
      id: "verification.commands",
      category: "tests",
      status: "pass",
      summary: "All verification commands passed.",
      evidence: commands.flatMap((command) => command.evidence.map((item) => ({ ...item }))),
    }],
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

function successReceipt(commandId: string, receiptId: string, intent: P7VerificationCommandSuccessExecutionIntentPreimage, startedAt: string, completedAt: string, output: string): MutableRecord {
  return {
    receiptId,
    capability: `verification.command.${commandId}`,
    inputDigest: gatewayInputDigest(intent),
    paths: [],
    policy: { decision: "allow", reason: "explicit --approve-verification authorization" },
    startedAt,
    completedAt,
    result: { status: "success", outputDigest: sha256(output), outputBytes: Buffer.byteLength(output, "utf8"), exitCode: 0 },
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
      { commandId: TEST_COMMAND_ID, executionIntentPreimage: testExecutionIntentPreimage, executionReceipt: successReceipt(TEST_COMMAND_ID, TEST_RECEIPT_ID, testExecutionIntentPreimage, TEST_STARTED_AT, TEST_COMPLETED_AT, "tests passed") },
      { commandId: TYPES_COMMAND_ID, executionIntentPreimage: typesExecutionIntentPreimage, executionReceipt: successReceipt(TYPES_COMMAND_ID, TYPES_RECEIPT_ID, typesExecutionIntentPreimage, TYPES_STARTED_AT, TYPES_COMPLETED_AT, "types passed") },
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
  return { sourceAgentCompletionEvidenceBinding: buildP7AgentCompletionEvidenceBinding(sourceAgentCompletionEvidenceBindingInput), sourceAgentCompletionEvidenceBindingInput }
}

function r11Input(): P7GitChangeReportEvidenceBindingBuildInput {
  const sourceWorkspaceReferenceEvidenceBindingInput = r10Input()
  return { sourceWorkspaceReferenceEvidenceBinding: buildP7WorkspaceReferenceEvidenceBinding(sourceWorkspaceReferenceEvidenceBindingInput), sourceWorkspaceReferenceEvidenceBindingInput }
}

function r12Input(): P7ReceiptReportEvidenceBindingBuildInput {
  const sourceGitChangeReportEvidenceBindingInput = r11Input()
  return { sourceGitChangeReportEvidenceBinding: buildP7GitChangeReportEvidenceBinding(sourceGitChangeReportEvidenceBindingInput), sourceGitChangeReportEvidenceBindingInput }
}

function r13Input(): P7PolicyReportEvidenceBindingBuildInput {
  const sourceReceiptReportEvidenceBindingInput = r12Input()
  return { sourceReceiptReportEvidenceBinding: buildP7ReceiptReportEvidenceBinding(sourceReceiptReportEvidenceBindingInput), sourceReceiptReportEvidenceBindingInput }
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
    result: { status: "success", outputDigest: sha256(output), outputBytes: Buffer.byteLength(output, "utf8"), exitCode: 0 },
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

function fixtureInput(records = canonicalReceiptRecords()): P7ReceiptRecordSetEvidenceBindingBuildInput {
  const sourcePolicyReportEvidenceBindingInput = r13Input()
  return {
    sourcePolicyReportEvidenceBinding: buildP7PolicyReportEvidenceBinding(sourcePolicyReportEvidenceBindingInput),
    sourcePolicyReportEvidenceBindingInput,
    receiptRecords: records,
  }
}

function mutableRecords(input = fixtureInput()): MutableRecord[] {
  return structuredClone(input.receiptRecords) as MutableRecord[]
}

function findReceipt(records: MutableRecord[], id: string): MutableRecord {
  return records.find((record) => record.receiptId === id)!
}

function withRecords(records: MutableRecord[]): P7ReceiptRecordSetEvidenceBindingBuildInput {
  return fixtureInput(records)
}

function confinementFor(inputDigest: string): MutableRecord {
  const base = {
    version: "kodac-h4-r2c-confinement-receipt-v1",
    requestIdentity: "4".repeat(64),
    executionAttemptIdentity: "5".repeat(64),
    executionIntentIdentity: inputDigest,
    backendIdentity: "6".repeat(64),
    enforcementEvidenceIdentity: "7".repeat(64),
    durableRecordIdentity: "8".repeat(64),
    durableCommitAcknowledgmentIdentity: "9".repeat(64),
    launcherArtifactSha256: "a".repeat(64),
    claimSet: "kodac-linux-landlock-fs-v1",
    enforcement: "full",
  }
  return { ...base, bindingIdentity: sha256(JSON.stringify(base)) }
}

const schema = JSON.parse(readFileSync(new URL("../../../schema/p7-receipt-record-set-evidence-binding.schema.json", import.meta.url), "utf8")) as SchemaRecord
const sourceText = readFileSync(new URL("../src/remediation/p7-receipt-record-set-evidence-binding.ts", import.meta.url), "utf8")

function resolveRef(root: SchemaRecord, ref: string): SchemaRecord {
  assert.ok(ref.startsWith("#/$defs/"))
  return root.$defs[ref.slice("#/$defs/".length)] as SchemaRecord
}

function schemaAccepts(nodeValue: unknown, value: unknown, root = schema): boolean {
  const node = nodeValue as SchemaRecord
  if (node.$ref !== undefined) return schemaAccepts(resolveRef(root, node.$ref), value, root)
  if (node.anyOf !== undefined) return (node.anyOf as unknown[]).some((entry) => schemaAccepts(entry, value, root))
  if (node.oneOf !== undefined) return (node.oneOf as unknown[]).filter((entry) => schemaAccepts(entry, value, root)).length === 1
  if (Object.hasOwn(node, "const") && JSON.stringify(value) !== JSON.stringify(node.const)) return false
  if (node.type === "null") return value === null
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

test("P7-R14 builds, validates, canonicalizes ordering, and matches the bounded schema", () => {
  const input = fixtureInput()
  const built = buildP7ReceiptRecordSetEvidenceBinding(input)
  assert.equal(built.version, P7_R14_RECEIPT_RECORD_SET_EVIDENCE_BINDING_VERSION)
  assert.equal(built.state, P7_R14_RECEIPT_RECORD_SET_EVIDENCE_BOUND_STATE)
  assert.equal(built.receiptCount, RECEIPT_IDS.length)
  assert.deepEqual(built.receiptIds, [...RECEIPT_IDS].sort())
  assert.equal(built.sourcePolicyReportEvidenceIdentity, input.sourcePolicyReportEvidenceBinding.evidenceIdentity)
  assert.equal(built.evidenceIdentity, p7ReceiptRecordSetEvidenceBindingIdentity(input))
  assert.deepEqual(validateP7ReceiptRecordSetEvidenceBinding(built, input), built)
  assert.equal(schemaAccepts(schema, built), true)
  const malformed = { ...built, unexpected: true }
  assert.equal(schemaAccepts(schema, malformed), false)

  const reversed = fixtureInput([...canonicalReceiptRecords()].reverse())
  const second = buildP7ReceiptRecordSetEvidenceBinding(reversed)
  assert.equal(second.receiptRecordSetIdentity, built.receiptRecordSetIdentity)
  assert.equal(second.evidenceIdentity, built.evidenceIdentity)
  assert.deepEqual(second.receiptRecords, built.receiptRecords)
})

test("P7-R14 enforces exact R13/R12 receipt set, IDs, and generic passing predicates", () => {
  const cases: Array<[(records: MutableRecord[]) => void, RegExp]> = [
    [(records) => { records.pop() }, /length|receipt count/],
    [(records) => { records.push(genericProcessReceipt("723e4567-e89b-42d3-a456-426614174006", "git.head", "extra")) }, /length|receipt count/],
    [(records) => { records[1]!.receiptId = records[0]!.receiptId }, /duplicate|receipt-id set/],
    [(records) => { records[1]!.receiptId = "not-a-uuid" }, /UUID v4/],
    [(records) => { records[1]!.inputDigest = "x".repeat(64) }, /SHA-256/],
    [(records) => { records[1]!.result = { status: "failure", error: "no" } }, /success|unknown field/],
    [(records) => { records[1]!.policy.decision = "deny" }, /allow/],
    [(records) => { records[1]!.completedAt = "2026-09-06T12:00:02.000Z" }, /precede/],
  ]
  for (const [mutate, expected] of cases) {
    const records = canonicalReceiptRecords()
    mutate(records)
    assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(records)), expected)
  }
})

test("P7-R14 validates both success variants and anchors the exact P7-R4 mutation receipt", () => {
  const built = buildP7ReceiptRecordSetEvidenceBinding(fixtureInput())
  assert.equal(built.receiptRecords.find((record) => record.receiptId === APPLY_RECEIPT_ID)!.result.kind, "mutation")
  assert.equal(built.receiptRecords.find((record) => record.receiptId === GIT_DIFF_RECEIPT_ID)!.result.kind, "process")

  const malformed = canonicalReceiptRecords()
  findReceipt(malformed, APPLY_RECEIPT_ID).result.postStateDigest = "bad"
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(malformed)), /postStateDigest|SHA-256/)

  const substituted = canonicalReceiptRecords()
  findReceipt(substituted, APPLY_RECEIPT_ID).policy.reason = "different policy evidence"
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(substituted)), /applied evidence|executionReceiptIdentity|canonical source-derived/)

  const wrongCapability = canonicalReceiptRecords()
  findReceipt(wrongCapability, APPLY_RECEIPT_ID).capability = "repo.read"
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(wrongCapability)), /repo.apply_patch|P7-R4/)
})

test("P7-R14 anchors every exact P7-R8 command receipt and rejects substitution", () => {
  for (const id of [TEST_RECEIPT_ID, TYPES_RECEIPT_ID]) {
    const records = canonicalReceiptRecords()
    findReceipt(records, id).result.outputDigest = "f".repeat(64)
    assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(records)), /verification-command|evidenceIdentity|canonical source-derived/)
  }

  const missingCommand = canonicalReceiptRecords()
  findReceipt(missingCommand, TEST_RECEIPT_ID).receiptId = "723e4567-e89b-42d3-a456-426614174006"
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(missingCommand)), /receipt-id set|missing exact P7-R8/)
})

test("P7-R14 validates optional approval and confinement without creating authority", () => {
  const approvalRecords = canonicalReceiptRecords()
  const generic = findReceipt(approvalRecords, GIT_DIFF_RECEIPT_ID)
  generic.approval = {
    version: "kodac-h4-r1-one-shot-approval-v1",
    requestIdentity: "1".repeat(64),
    requestInstanceId: "823e4567-e89b-42d3-a456-426614174007",
    decisionEvidenceIdentity: "2".repeat(64),
    outcome: "allowed-once",
  }
  const approved = buildP7ReceiptRecordSetEvidenceBinding(withRecords(approvalRecords))
  const approvedProjection = approved.receiptRecords.find((record) => record.receiptId === GIT_DIFF_RECEIPT_ID)!
  assert.match(approvedProjection.approvalRecordIdentity!, /^[0-9a-f]{64}$/)
  assert.equal(approvedProjection.approvalEvidenceIdentity, "2".repeat(64))

  const badApproval = structuredClone(approvalRecords) as MutableRecord[]
  findReceipt(badApproval, GIT_DIFF_RECEIPT_ID).approval.outcome = "always"
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(badApproval)), /allowed-once/)

  const confinementRecords = canonicalReceiptRecords()
  const confined = findReceipt(confinementRecords, GIT_STATUS_RECEIPT_ID)
  confined.confinement = confinementFor(confined.inputDigest)
  const confinedBuilt = buildP7ReceiptRecordSetEvidenceBinding(withRecords(confinementRecords))
  assert.match(confinedBuilt.receiptRecords.find((record) => record.receiptId === GIT_STATUS_RECEIPT_ID)!.confinementBindingIdentity!, /^[0-9a-f]{64}$/)

  const mismatch = structuredClone(confinementRecords) as MutableRecord[]
  const mismatchReceipt = findReceipt(mismatch, GIT_STATUS_RECEIPT_ID)
  mismatchReceipt.confinement = confinementFor("f".repeat(64))
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(mismatch)), /executionIntentIdentity|inputDigest/)
})

test("P7-R14 fails closed on hostile receipt graphs and unknown structural data", () => {
  const unknown = canonicalReceiptRecords()
  findReceipt(unknown, GIT_DIFF_RECEIPT_ID).unknown = true
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(unknown)), /unknown field/)

  const accessor = canonicalReceiptRecords()
  Object.defineProperty(accessor[1]!, "capability", { get: () => "git.diff", enumerable: true })
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(accessor)), /data property/)

  const symbol = canonicalReceiptRecords()
  Object.defineProperty(symbol[1]!, Symbol("hostile"), { value: true, enumerable: true })
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(symbol)), /symbol/)

  const custom = canonicalReceiptRecords()
  Object.setPrototypeOf(custom[1]!, { hostile: true })
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(custom)), /plain object/)

  const proxy = canonicalReceiptRecords()
  proxy[1] = new Proxy(proxy[1]!, {})
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(proxy)), /Proxy/)

  const sparse = canonicalReceiptRecords()
  delete sparse[1]
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(sparse)), /sparse/)

  const cyclic = canonicalReceiptRecords()
  cyclic[1]!.self = cyclic[1]
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(cyclic)), /cycle|alias/)

  const aliased = canonicalReceiptRecords()
  aliased[1]!.policy = aliased[2]!.policy
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(withRecords(aliased)), /alias/)
})

test("P7-R14 binds normalized receipt mutations and rejects predecessor/output identity drift", () => {
  const input = fixtureInput()
  const built = buildP7ReceiptRecordSetEvidenceBinding(input)

  const changed = canonicalReceiptRecords()
  findReceipt(changed, GIT_DIFF_RECEIPT_ID).result.outputDigest = "e".repeat(64)
  const changedBuilt = buildP7ReceiptRecordSetEvidenceBinding(withRecords(changed))
  assert.notEqual(changedBuilt.receiptRecords.find((record) => record.receiptId === GIT_DIFF_RECEIPT_ID)!.receiptRecordIdentity,
    built.receiptRecords.find((record) => record.receiptId === GIT_DIFF_RECEIPT_ID)!.receiptRecordIdentity)
  assert.notEqual(changedBuilt.receiptRecordSetIdentity, built.receiptRecordSetIdentity)
  assert.notEqual(changedBuilt.evidenceIdentity, built.evidenceIdentity)

  const mutatedSource = structuredClone(input) as MutableRecord
  mutatedSource.sourcePolicyReportEvidenceBinding.evidenceIdentity = "f".repeat(64)
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(mutatedSource), /evidenceIdentity|canonical/)

  const mutatedNested = structuredClone(input) as MutableRecord
  mutatedNested.sourcePolicyReportEvidenceBindingInput.sourceReceiptReportEvidenceBindingInput
    .sourceGitChangeReportEvidenceBindingInput.sourceWorkspaceReferenceEvidenceBindingInput
    .sourceAgentCompletionEvidenceBindingInput.sourceCommandSuccessEvidenceBinding.evidenceIdentity = "e".repeat(64)
  assert.throws(() => buildP7ReceiptRecordSetEvidenceBinding(mutatedNested), /evidenceIdentity|canonical/)

  const badOutput = structuredClone(built) as MutableRecord
  badOutput.evidenceIdentity = "d".repeat(64)
  assert.throws(() => validateP7ReceiptRecordSetEvidenceBinding(badOutput, input), /evidenceIdentity/)
})

test("P7-R14 source remains pure/data-only and does not import forbidden execution surfaces", () => {
  for (const forbidden of [
    "node:fs",
    "readReceiptLedger",
    "JsonlReceiptLedger",
    "ExecutionGateway",
    "runVerificationEngine",
    "PolicyEngine",
    "child_process",
    "node:net",
    "node:http",
    "node:https",
  ]) {
    assert.equal(sourceText.includes(forbidden), false, `source must not contain forbidden execution surface: ${forbidden}`)
  }
})
