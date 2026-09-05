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
  P7_R6_POST_APPLY_VERIFICATION_REPORT_BINDING_VERSION,
  P7_R6_VERIFICATION_REPORT_BOUND_STATE,
  P7_R6_VERIFICATION_REPORT_PROTOCOL,
  P7_R6_VERIFICATION_REPORT_VERSION,
  buildP7PostApplyVerificationReportBinding,
  p7PostApplyVerificationReportBindingIdentity,
  validateP7PostApplyVerificationReportBinding,
  type P7PostApplyVerificationReportBindingBuildInput,
} from "../src/remediation/p7-post-apply-verification-report-binding.ts"

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
const REPORT_STARTED_AT = "2026-09-05T12:00:03.000Z"
const REPORT_COMPLETED_AT = "2026-09-05T12:00:04.000Z"
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
    claimKey: "p7-r6-source-finding",
    review: {
      reviewRunId: "review-run-p7-r6",
      reviewerId: "provider:test",
      reviewerVersion: "v1",
      policyIdentity: "policy:p7-r6-test",
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
  const runtime = new ReviewerIntelligenceRuntime({ adjudicatorId: "kodac:p7-r6-test-adjudicator" })
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
    proposerIdentity: "kodac:p7-r6-test-proposer",
    patchArtifactDigest: sha256(PATCH),
    changes: CHANGES,
  })
}

function sourceAuthorization(source: P7ImmutablePatchProposal): P7PatchApplicationAuthorization {
  return buildP7PatchApplicationAuthorization({
    sourceProposal: source,
    declaration: {
      authorizerIdentity: "kodac:p7-r6-test-authorizer",
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

function receipt(): ExecutionReceipt {
  return {
    receiptId: RECEIPT_ID,
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
    executionReceipt: receipt(),
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

function r5Input(): P7PostApplyVerificationPlanBindingBuildInput {
  const sourceAppliedEvidenceInput = appliedInput()
  return {
    sourceAppliedEvidence: buildP7AppliedPatchEvidenceBinding(sourceAppliedEvidenceInput),
    sourceAppliedEvidenceInput,
    verificationPlan: verificationPlan(),
  }
}

function verificationReport(plan: P7VerificationPlanInput): MutableRecord {
  const base = [
    { id: "agent.completed", category: "agent", status: "pass", summary: "Agent completed.", evidence: [{ kind: "event", ref: "session:test:agent.loop.completed" }] },
    { id: "workspace.integrity", category: "workspace", status: "pass", summary: "Workspace intact.", evidence: [{ kind: "workspace", ref: WORKSPACE, digest: sha256(WORKSPACE) }] },
    { id: "git.diff", category: "diff", status: "pass", summary: "Diff evidenced.", evidence: [{ kind: "receipt", ref: "receipt-git-diff" }] },
    { id: "evidence.receipts", category: "receipts", status: "pass", summary: "Receipts valid.", evidence: [{ kind: "receipt", ref: RECEIPT_ID }] },
    { id: "evidence.policy", category: "policy", status: "pass", summary: "Policy allowed.", evidence: [{ kind: "receipt", ref: RECEIPT_ID }] },
  ]
  const commands = plan.commands.map((command, index) => ({
    id: `command.${command.id}`,
    category: command.category,
    status: "pass",
    summary: `Command ${command.id} passed.`,
    evidence: [{ kind: "receipt", ref: `verification-command-receipt-${index}` }],
  }))
  return {
    protocol: "kodac.verification",
    version: 1,
    sessionId: "session-p7-r6",
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

function fixtureInput(): P7PostApplyVerificationReportBindingBuildInput {
  const sourceVerificationPlanBindingInput = r5Input()
  return {
    sourceVerificationPlanBinding: buildP7PostApplyVerificationPlanBinding(sourceVerificationPlanBindingInput),
    sourceVerificationPlanBindingInput,
    verificationReport: verificationReport(sourceVerificationPlanBindingInput.verificationPlan),
  }
}

const schema = JSON.parse(
  readFileSync(new URL("../../../schema/p7-post-apply-verification-report-binding.schema.json", import.meta.url), "utf8"),
) as UnknownRecord
const sourceText = readFileSync(
  new URL("../src/remediation/p7-post-apply-verification-report-binding.ts", import.meta.url),
  "utf8",
)

test("P7-R6 builds and validates one deterministic VERIFICATION_REPORT_BOUND record", () => {
  const input = fixtureInput()
  const built = buildP7PostApplyVerificationReportBinding(input)
  assert.equal(built.version, P7_R6_POST_APPLY_VERIFICATION_REPORT_BINDING_VERSION)
  assert.equal(built.state, P7_R6_VERIFICATION_REPORT_BOUND_STATE)
  assert.equal(built.verificationReport.protocol, P7_R6_VERIFICATION_REPORT_PROTOCOL)
  assert.equal(built.verificationReport.version, P7_R6_VERIFICATION_REPORT_VERSION)
  assert.equal(built.verificationPlanBindingIdentity, input.sourceVerificationPlanBinding.bindingIdentity)
  assert.equal(built.verificationPlanDigest, input.sourceVerificationPlanBinding.verificationPlanDigest)
  assert.equal(built.appliedEvidenceIdentity, input.sourceVerificationPlanBinding.appliedEvidenceIdentity)
  assert.equal(built.postStateDigest, POST_STATE)
  assert.equal(built.verificationReportPassed, true)
  assert.equal(built.bindingIdentity, p7PostApplyVerificationReportBindingIdentity(input))
  assert.deepEqual(validateP7PostApplyVerificationReportBinding(built, input), built)
})

test("P7-R6 canonicalizes benign report check and evidence order", () => {
  const input = fixtureInput()
  const first = buildP7PostApplyVerificationReportBinding(input)
  const report = structuredClone(input.verificationReport) as MutableRecord
  report.checks.reverse()
  for (const check of report.checks) check.evidence.reverse()
  const second = buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: report })
  assert.equal(second.bindingIdentity, first.bindingIdentity)
  assert.equal(second.verificationReportIdentity, first.verificationReportIdentity)
})

test("P7-R6 canonically revalidates the exact P7-R5 predecessor", () => {
  const input = fixtureInput()
  const forged = structuredClone(input.sourceVerificationPlanBinding) as MutableRecord
  forged.postStateDigest = "4".repeat(64)
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, sourceVerificationPlanBinding: forged as any }),
    /postStateDigest|canonical source-derived|bindingIdentity/,
  )

  const forgedPlan = structuredClone(input.sourceVerificationPlanBinding) as MutableRecord
  forgedPlan.verificationPlanDigest = "f".repeat(64)
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, sourceVerificationPlanBinding: forgedPlan as any }),
    /verificationPlanDigest|canonical source-derived|bindingIdentity/,
  )
})

test("P7-R6 validates protocol version session and canonical report timestamps", () => {
  const input = fixtureInput()
  const cases: Array<[string, (report: MutableRecord) => void, RegExp]> = [
    ["protocol", (report) => { report.protocol = "kodac.other" }, /protocol/],
    ["version", (report) => { report.version = 2 }, /version/],
    ["session", (report) => { report.sessionId = "bad\nvalue" }, /sessionId|control/],
    ["timestamp", (report) => { report.startedAt = "+010000-01-01T00:00:00.000Z" }, /canonical ISO-8601/],
    ["ordering", (report) => { report.completedAt = "2026-09-05T12:00:00.000Z" }, /precede/],
  ]
  for (const [_name, mutate, expected] of cases) {
    const report = structuredClone(input.verificationReport) as MutableRecord
    mutate(report)
    assert.throws(() => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: report }), expected)
  }
})

test("P7-R6 enforces required base checks and exact planned command correspondence", () => {
  const input = fixtureInput()

  const missingBase = structuredClone(input.verificationReport) as MutableRecord
  missingBase.checks = missingBase.checks.filter((check: MutableRecord) => check.id !== "workspace.integrity")
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: missingBase }),
    /missing required base check/,
  )

  const missingCommand = structuredClone(input.verificationReport) as MutableRecord
  missingCommand.checks = missingCommand.checks.filter((check: MutableRecord) => !check.id.startsWith("command.js-root-tests"))
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: missingCommand }),
    /missing planned command check/,
  )

  const extraCommand = structuredClone(input.verificationReport) as MutableRecord
  extraCommand.checks.push({ id: "command.unplanned", category: "tests", status: "pass", summary: "Unexpected.", evidence: [{ kind: "receipt", ref: "receipt-extra" }] })
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: extraCommand }),
    /outside the exact P7-R5 plan/,
  )

  const wrongCategory = structuredClone(input.verificationReport) as MutableRecord
  wrongCategory.checks.find((check: MutableRecord) => check.id === "command.js-root-types-456def").category = "tests"
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: wrongCategory }),
    /planned category/,
  )
})

test("P7-R6 rejects duplicate checks and passing planned commands without receipt evidence", () => {
  const input = fixtureInput()
  const duplicate = structuredClone(input.verificationReport) as MutableRecord
  duplicate.checks.push(structuredClone(duplicate.checks[0]))
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: duplicate }),
    /duplicate check ids/,
  )

  const noReceipt = structuredClone(input.verificationReport) as MutableRecord
  const command = noReceipt.checks.find((check: MutableRecord) => check.id === "command.js-root-tests-123abc")
  command.evidence = [{ kind: "artifact", ref: "artifact:test-output" }]
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: noReceipt }),
    /receipt evidence/,
  )
})

test("P7-R6 requires report.passed to equal all check outcomes", () => {
  const input = fixtureInput()
  const falsePositive = structuredClone(input.verificationReport) as MutableRecord
  falsePositive.checks[0].status = "fail"
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: falsePositive }),
    /passed/,
  )

  const consistentFailure = structuredClone(input.verificationReport) as MutableRecord
  consistentFailure.checks[0].status = "fail"
  consistentFailure.passed = false
  const built = buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: consistentFailure })
  assert.equal(built.verificationReportPassed, false)
  assert.equal(built.state, P7_R6_VERIFICATION_REPORT_BOUND_STATE)
})

test("P7-R6 rejects malformed evidence and authority injection", () => {
  const input = fixtureInput()
  const badDigest = structuredClone(input.verificationReport) as MutableRecord
  badDigest.checks[0].evidence[0].digest = "ABC"
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: badDigest }),
    /digest/,
  )

  const duplicateEvidence = structuredClone(input.verificationReport) as MutableRecord
  duplicateEvidence.checks[0].evidence.push(structuredClone(duplicateEvidence.checks[0].evidence[0]))
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: duplicateEvidence }),
    /duplicate evidence/,
  )

  const injected = structuredClone(input.verificationReport) as MutableRecord
  injected.verified = true
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: injected }),
    /unknown field: verified/,
  )
})

test("P7-R6 fails closed on hostile report containers and invalid Unicode", () => {
  const input = fixtureInput()
  const proxy = new Proxy(structuredClone(input.verificationReport) as MutableRecord, {})
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: proxy }),
    /Proxy|non-proxy/,
  )

  const accessor = structuredClone(input.verificationReport) as MutableRecord
  Object.defineProperty(accessor, "passed", { enumerable: true, get() { return true } })
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: accessor }),
    /data property/,
  )

  const custom = structuredClone(input.verificationReport) as MutableRecord
  Object.setPrototypeOf(custom.checks[0], { injected: true })
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: custom }),
    /plain object/,
  )

  const sparse = structuredClone(input.verificationReport) as MutableRecord
  sparse.checks = new Array(2)
  sparse.checks[0] = structuredClone((input.verificationReport as MutableRecord).checks[0])
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: sparse }),
    /sparse|array/,
  )

  const cyclic = structuredClone(input.verificationReport) as MutableRecord
  cyclic.checks[0].evidence.push(cyclic)
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: cyclic }),
    /cycles|aliases/,
  )

  const unicode = structuredClone(input.verificationReport) as MutableRecord
  unicode.checks[0].summary = "bad\ud800"
  assert.throws(
    () => buildP7PostApplyVerificationReportBinding({ ...input, verificationReport: unicode }),
    /Unicode/,
  )
})

test("P7-R6 output is detached deeply immutable and rejects output tampering", () => {
  const input = fixtureInput()
  const built = buildP7PostApplyVerificationReportBinding(input)
  assert.ok(Object.isFrozen(built))
  assert.ok(Object.isFrozen(built.changedPaths))
  assert.ok(Object.isFrozen(built.verificationReport))
  assert.ok(Object.isFrozen(built.verificationReport.checks))
  assert.ok(Object.isFrozen(built.verificationReport.checks[0]))
  assert.ok(Object.isFrozen(built.verificationReport.checks[0]!.evidence))

  const callerReport = input.verificationReport as MutableRecord
  callerReport.sessionId = "mutated-after-build"
  callerReport.checks[0].summary = "mutated"
  assert.equal(built.verificationSessionId, "session-p7-r6")
  assert.notEqual(built.verificationReport.checks[0]!.summary, "mutated")

  const freshInput = fixtureInput()
  const fresh = buildP7PostApplyVerificationReportBinding(freshInput)
  const tampered = structuredClone(fresh) as MutableRecord
  tampered.verificationReportPassed = false
  assert.throws(
    () => validateP7PostApplyVerificationReportBinding(tampered, freshInput),
    /canonical source-derived|bindingIdentity/,
  )
})

test("P7-R6 schema mirrors the bounded state while production remains pure data-only", () => {
  assert.equal(schema.additionalProperties, false)
  assert.equal(schema.properties.version.const, P7_R6_POST_APPLY_VERIFICATION_REPORT_BINDING_VERSION)
  assert.equal(schema.properties.state.const, P7_R6_VERIFICATION_REPORT_BOUND_STATE)
  assert.equal(schema.$defs.verificationReport.additionalProperties, false)
  assert.equal(schema.$defs.verificationReport.properties.protocol.const, P7_R6_VERIFICATION_REPORT_PROTOCOL)
  assert.equal(schema.$defs.verificationReport.properties.version.const, P7_R6_VERIFICATION_REPORT_VERSION)
  assert.deepEqual(schema.$defs.check.properties.status.enum, ["pass", "fail"])
  assert.deepEqual(schema.$defs.evidence.properties.kind.enum, ["receipt", "artifact", "event", "workspace"])

  assert.match(sourceText, /validateP7PostApplyVerificationPlanBinding/)
  for (const forbidden of [
    "runVerificationEngine",
    "planVerification(",
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
