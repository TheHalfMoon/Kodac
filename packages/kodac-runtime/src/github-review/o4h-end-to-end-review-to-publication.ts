import { createHash } from "node:crypto"
import { types } from "node:util"

import {
  acquireO4bBoundedReadOnlyGithubContext,
  type O4bBoundedReadOnlyGithubContextResult,
} from "./o4b-bounded-read-only-github-context.ts"
import {
  buildO4cGithubReviewerContext,
  type O4cGithubReviewerContextResult,
} from "./o4c-github-context-to-reviewer-context.ts"
import {
  createO4dO4cReviewerExecutionAdmission,
  O4D_READY_DECISION,
  type O4dO4cReviewerExecutionAdmissionResult,
} from "./o4d-o4c-reviewer-execution-admission.ts"
import {
  O4eModelBackedReviewerProviderExecution,
  type O4eModelBackedReviewerProviderExecutionResult,
} from "./o4e-model-backed-reviewer-provider-execution.ts"
import {
  createO4fSafeGithubPublicationAdmission,
  O4F_READY_DECISION,
  type O4fSafeGithubPublicationAdmissionResult,
} from "./o4f-safe-github-publication-admission.ts"
import {
  publishO4gBoundedGithubReview,
  validateO4gBoundedGithubReviewPublicationResult,
  type O4gBoundedGithubReviewPublicationResult,
} from "./o4g-bounded-github-review-publication.ts"
import type { ModelProvider } from "../model/provider.ts"

export const O4H_END_TO_END_REVIEW_TO_PUBLICATION_VERSION = "kodac-o4h-end-to-end-review-to-publication-v1" as const
export const O4H_STATUSES = Object.freeze([
  "COMPLETED_PUBLISHED",
  "COMPLETED_ALREADY_PRESENT",
  "COMPLETED_RECOVERED_AFTER_UNCONFIRMED_POST",
  "BLOCKED_O4B_NOT_READY",
  "BLOCKED_O4C_NOT_READY",
  "BLOCKED_O4D_NOT_READY",
  "BLOCKED_O4E_NOT_COMPLETED",
  "BLOCKED_O4F_NOT_READY",
  "BLOCKED_HEAD_MISMATCH",
  "BLOCKED_DIFF_ANCHOR",
  "BLOCKED_EXISTING_PUBLICATION",
  "READ_FAILED",
  "POST_REJECTED",
  "AMBIGUOUS_POST_OUTCOME",
  "INVALID_GITHUB_RESPONSE",
] as const)
export const O4H_FAILURE_STAGES = Object.freeze(["O4B", "O4C", "O4D", "O4E", "O4F", "O4G"] as const)
export const O4H_FAILURE_CODES = Object.freeze([
  "O4B_NOT_READY",
  "O4C_NOT_READY",
  "O4D_NOT_READY",
  "O4E_NOT_COMPLETED",
  "O4F_NOT_READY",
  "O4G_BLOCKED_HEAD_MISMATCH",
  "O4G_BLOCKED_DIFF_ANCHOR",
  "O4G_BLOCKED_EXISTING_PUBLICATION",
  "O4G_READ_FAILED",
  "O4G_POST_REJECTED",
  "O4G_AMBIGUOUS_POST_OUTCOME",
  "O4G_INVALID_GITHUB_RESPONSE",
] as const)
export const O4H_CONTINUATION_DECISIONS = Object.freeze([
  "END_TO_END_COMPLETE",
  "STOP_AT_FAILED_STAGE",
] as const)
export const O4H_LIMITS = Object.freeze({
  maxTimeoutMs: 30_000,
  maxCredentialUtf8Bytes: 4_096,
  maxGeneralTextUtf8Bytes: 65_536,
  maxSupportingPaths: 64,
  maxPathUtf8Bytes: 1_024,
  maxClaims: 64,
})

export type O4hStatus = (typeof O4H_STATUSES)[number]
export type O4hFailureStage = (typeof O4H_FAILURE_STAGES)[number]
export type O4hFailureCode = (typeof O4H_FAILURE_CODES)[number]
export type O4hContinuationDecision = (typeof O4H_CONTINUATION_DECISIONS)[number]

export interface O4hEndToEndReviewToPublicationInput {
  readonly repositoryId: string
  readonly repositoryFullName: string
  readonly pullRequestNumber: number
  readonly pullRequestId: string
  readonly baseRepositoryId: string
  readonly headRepositoryId: string
  readonly headRepositoryFullName: string
  readonly expectedHeadSha: string
  readonly supportingPaths: readonly string[]
  readonly taskId: string
  readonly objective: string
  readonly policyIdentity: string
  readonly instructions: string
  readonly provider: ModelProvider
  readonly model: string
  readonly credentialPolicyIdentity: string
  readonly credential: string
}

export interface O4hEndToEndReviewToPublicationOptions {
  readonly fetchImpl?: typeof fetch
  readonly timeoutMs?: number
  readonly now?: () => string
  readonly maxClaims?: number
}

export interface O4hEndToEndReviewToPublicationResult {
  readonly version: typeof O4H_END_TO_END_REVIEW_TO_PUBLICATION_VERSION
  readonly compositionExecutionIdentity: string
  readonly status: O4hStatus
  readonly credentialPolicyIdentity: string
  readonly taskId: string
  readonly policyIdentity: string
  readonly repositoryId: string
  readonly repositoryFullName: string
  readonly pullRequestNumber: number
  readonly pullRequestId: string
  readonly reviewedHead: string
  readonly o4bReadContextEvidenceIdentity: string | null
  readonly o4cContextIdentity: string | null
  readonly o4dAdmissionIdentity: string | null
  readonly o4eExecutionIdentity: string | null
  readonly o4fAdmissionIdentity: string | null
  readonly terminalPublication: O4gBoundedGithubReviewPublicationResult | null
  readonly failureStage: O4hFailureStage | null
  readonly failureCode: O4hFailureCode | null
  readonly continuationDecision: O4hContinuationDecision
}

type UnknownRecord = Record<string, unknown>

const SHA1 = /^[0-9a-f]{40}$/
const SHA256 = /^[0-9a-f]{64}$/
const DECIMAL_ID = /^(?:[1-9][0-9]{0,19})$/
const REPOSITORY = /^[A-Za-z0-9_.-]{1,100}\/[A-Za-z0-9_.-]{1,100}$/
const STATUS = new Set<string>(O4H_STATUSES)
const STAGES = new Set<string>(O4H_FAILURE_STAGES)
const FAILURES = new Set<string>(O4H_FAILURE_CODES)
const DECISIONS = new Set<string>(O4H_CONTINUATION_DECISIONS)
const RESULT_KEYS = [
  "version", "compositionExecutionIdentity", "status", "credentialPolicyIdentity", "taskId", "policyIdentity",
  "repositoryId", "repositoryFullName", "pullRequestNumber", "pullRequestId", "reviewedHead",
  "o4bReadContextEvidenceIdentity", "o4cContextIdentity", "o4dAdmissionIdentity", "o4eExecutionIdentity",
  "o4fAdmissionIdentity", "terminalPublication", "failureStage", "failureCode", "continuationDecision",
] as const
const INPUT_KEYS = [
  "repositoryId", "repositoryFullName", "pullRequestNumber", "pullRequestId", "baseRepositoryId",
  "headRepositoryId", "headRepositoryFullName", "expectedHeadSha", "supportingPaths", "taskId", "objective",
  "policyIdentity", "instructions", "provider", "model", "credentialPolicyIdentity", "credential",
] as const
const OPTION_KEYS = ["fetchImpl", "timeoutMs", "now", "maxClaims"] as const

function fail(message: string): never { throw new TypeError(message) }
function hasOwn(value: object, key: PropertyKey): boolean { return Object.prototype.hasOwnProperty.call(value, key) }
function exactRecord(raw: unknown, keys: readonly string[], label: string): UnknownRecord {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw) || Object.getPrototypeOf(raw) !== Object.prototype) fail(`${label} must be a plain object`)
  const record = raw as UnknownRecord
  const actual = Object.keys(record).sort(), expected = [...keys].sort()
  if (actual.length !== expected.length || actual.some((key, i) => key !== expected[i])) fail(`${label} has unexpected or missing properties`)
  return record
}
function text(raw: unknown, label: string, maxBytes: number = O4H_LIMITS.maxGeneralTextUtf8Bytes): string {
  if (typeof raw !== "string" || Buffer.byteLength(raw, "utf8") > maxBytes || raw.includes("\0")) fail(`${label} must be bounded text`)
  return raw
}
function nonEmptyText(raw: unknown, label: string, maxBytes: number = O4H_LIMITS.maxGeneralTextUtf8Bytes): string { const value = text(raw, label, maxBytes); if (value.length === 0) fail(`${label} must not be empty`); return value }
function sha1(raw: unknown, label: string): string { const value = nonEmptyText(raw, label, 40); if (!SHA1.test(value)) fail(`${label} must be a lowercase git sha`); return value }
function sha256(raw: unknown, label: string): string { const value = nonEmptyText(raw, label, 64); if (!SHA256.test(value)) fail(`${label} must be a lowercase sha256`); return value }
function decimalId(raw: unknown, label: string): string { const value = nonEmptyText(raw, label, 20); if (!DECIMAL_ID.test(value)) fail(`${label} must be a decimal identifier`); return value }
function integer(raw: unknown, label: string, min: number, max: number): number { if (typeof raw !== "number" || !Number.isSafeInteger(raw) || raw < min || raw > max) fail(`${label} must be a bounded integer`); return raw }
function repository(raw: unknown, label: string): string { const value = nonEmptyText(raw, label, 201); if (!REPOSITORY.test(value)) fail(`${label} must be owner/name`); return value }
function repositoryPath(raw: unknown, label: string): string { const value = nonEmptyText(raw, label, O4H_LIMITS.maxPathUtf8Bytes); if (value.startsWith("/") || value.includes("\\") || value.split("/").some((x) => x === "" || x === "." || x === "..")) fail(`${label} must be a repository-relative path`); return value }
function credential(raw: unknown): string { const value = nonEmptyText(raw, "credential", O4H_LIMITS.maxCredentialUtf8Bytes); for (const ch of value) { const code = ch.codePointAt(0)!; if (code < 0x20 || code === 0x7f) fail("credential contains control characters") } return value }
function provider(raw: unknown): ModelProvider {
  if ((typeof raw !== "object" && typeof raw !== "function") || raw === null) fail("provider must implement ModelProvider")
  const record = raw as UnknownRecord
  if (typeof record.generate !== "function" || types.isProxy(record.generate)) fail("provider.generate must be a non-proxy function")
  nonEmptyText(record.name, "provider.name", 256)
  return raw as ModelProvider
}
function deepFreeze<T>(value: T, seen = new Set<object>()): T { if (typeof value !== "object" || value === null || seen.has(value as object)) return value; seen.add(value as object); Object.freeze(value); for (const child of Object.values(value as UnknownRecord)) deepFreeze(child, seen); return value }
function canonical(value: unknown): string {
  if (value === null) return "null"
  if (typeof value === "string" || typeof value === "boolean") return JSON.stringify(value)
  if (typeof value === "number") { if (!Number.isSafeInteger(value)) fail("canonical identity contains non-integer number"); return String(value) }
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`
  if (typeof value === "object") { const r = value as UnknownRecord; return `{${Object.keys(r).sort().map((k) => `${JSON.stringify(k)}:${canonical(r[k])}`).join(",")}}` }
  fail("canonical identity contains unsupported value")
}
function digest(domain: string, value: unknown): string { return createHash("sha256").update(`${domain}\0${canonical(value)}`, "utf8").digest("hex") }
function continuation(status: O4hStatus): O4hContinuationDecision { return status.startsWith("COMPLETED_") ? "END_TO_END_COMPLETE" : "STOP_AT_FAILED_STAGE" }

type NormalizedInput = Readonly<{
  repositoryId: string; repositoryFullName: string; pullRequestNumber: number; pullRequestId: string
  baseRepositoryId: string; headRepositoryId: string; headRepositoryFullName: string; expectedHeadSha: string
  supportingPaths: readonly string[]; taskId: string; objective: string; policyIdentity: string
  instructions: string; provider: ModelProvider; model: string
  credentialPolicyIdentity: string; credential: string
}>
type NormalizedOptions = Readonly<{ fetchImpl: typeof fetch; timeoutMs: number; now: (() => string) | undefined; maxClaims: number | undefined }>

function normalizeInput(raw: unknown): NormalizedInput {
  const r = exactRecord(raw, INPUT_KEYS, "input")
  const supporting = r.supportingPaths
  if (!Array.isArray(supporting) || supporting.length > O4H_LIMITS.maxSupportingPaths) fail("supportingPaths must be a bounded array")
  const supportingPaths = Object.freeze(supporting.map((p, i) => repositoryPath(p, `supportingPaths[${i}]`)))
  return deepFreeze({
    repositoryId: decimalId(r.repositoryId, "repositoryId"),
    repositoryFullName: repository(r.repositoryFullName, "repositoryFullName"),
    pullRequestNumber: integer(r.pullRequestNumber, "pullRequestNumber", 1, Number.MAX_SAFE_INTEGER),
    pullRequestId: decimalId(r.pullRequestId, "pullRequestId"),
    baseRepositoryId: decimalId(r.baseRepositoryId, "baseRepositoryId"),
    headRepositoryId: decimalId(r.headRepositoryId, "headRepositoryId"),
    headRepositoryFullName: repository(r.headRepositoryFullName, "headRepositoryFullName"),
    expectedHeadSha: sha1(r.expectedHeadSha, "expectedHeadSha"),
    supportingPaths,
    taskId: nonEmptyText(r.taskId, "taskId"),
    objective: nonEmptyText(r.objective, "objective"),
    policyIdentity: nonEmptyText(r.policyIdentity, "policyIdentity"),
    instructions: nonEmptyText(r.instructions, "instructions"),
    provider: provider(r.provider),
    model: nonEmptyText(r.model, "model", 256),
    credentialPolicyIdentity: sha256(r.credentialPolicyIdentity, "credentialPolicyIdentity"),
    credential: credential(r.credential),
  })
}
function normalizeOptions(raw: unknown): NormalizedOptions {
  if (raw === undefined) return { fetchImpl: fetch, timeoutMs: O4H_LIMITS.maxTimeoutMs, now: undefined, maxClaims: undefined }
  const r = exactRecord(raw, OPTION_KEYS.filter((key) => hasOwn(raw as object, key)), "options")
  const fetchImpl = r.fetchImpl === undefined ? fetch : r.fetchImpl
  if (typeof fetchImpl !== "function" || types.isProxy(fetchImpl)) fail("fetchImpl must be a non-proxy function")
  const timeoutMs = r.timeoutMs === undefined ? O4H_LIMITS.maxTimeoutMs : integer(r.timeoutMs, "timeoutMs", 1, O4H_LIMITS.maxTimeoutMs)
  const now = r.now === undefined ? undefined : r.now
  if (now !== undefined && typeof now !== "function") fail("now must be a function")
  const maxClaims = r.maxClaims === undefined ? undefined : integer(r.maxClaims, "maxClaims", 1, O4H_LIMITS.maxClaims)
  return { fetchImpl: fetchImpl as typeof fetch, timeoutMs, now: now as (() => string) | undefined, maxClaims }
}

function identityOf(result: unknown, field: string): string {
  const record = result as UnknownRecord
  return sha256(record[field], `stage.${field}`)
}

type StageEvidence = Readonly<{
  o4b: O4bBoundedReadOnlyGithubContextResult | null
  o4c: O4cGithubReviewerContextResult | null
  o4d: O4dO4cReviewerExecutionAdmissionResult | null
  o4e: O4eModelBackedReviewerProviderExecutionResult | null
  o4f: O4fSafeGithubPublicationAdmissionResult | null
}>

function terminalForO4g(terminal: O4gBoundedGithubReviewPublicationResult): { status: O4hStatus; failureCode: O4hFailureCode | null } {
  switch (terminal.status) {
    case "COMPLETED_CREATED": return { status: "COMPLETED_PUBLISHED", failureCode: null }
    case "COMPLETED_ALREADY_PRESENT": return { status: "COMPLETED_ALREADY_PRESENT", failureCode: null }
    case "COMPLETED_RECOVERED_AFTER_UNCONFIRMED_POST": return { status: "COMPLETED_RECOVERED_AFTER_UNCONFIRMED_POST", failureCode: null }
    case "BLOCKED_HEAD_MISMATCH": return { status: "BLOCKED_HEAD_MISMATCH", failureCode: "O4G_BLOCKED_HEAD_MISMATCH" }
    case "BLOCKED_DIFF_ANCHOR": return { status: "BLOCKED_DIFF_ANCHOR", failureCode: "O4G_BLOCKED_DIFF_ANCHOR" }
    case "BLOCKED_EXISTING_PUBLICATION": return { status: "BLOCKED_EXISTING_PUBLICATION", failureCode: "O4G_BLOCKED_EXISTING_PUBLICATION" }
    case "READ_FAILED": return { status: "READ_FAILED", failureCode: "O4G_READ_FAILED" }
    case "POST_REJECTED": return { status: "POST_REJECTED", failureCode: "O4G_POST_REJECTED" }
    case "AMBIGUOUS_POST_OUTCOME": return { status: "AMBIGUOUS_POST_OUTCOME", failureCode: "O4G_AMBIGUOUS_POST_OUTCOME" }
    case "INVALID_GITHUB_RESPONSE": return { status: "INVALID_GITHUB_RESPONSE", failureCode: "O4G_INVALID_GITHUB_RESPONSE" }
    default: return fail("unknown O4-G terminal status")
  }
}

function makeResult(
  input: NormalizedInput,
  status: O4hStatus,
  evidence: StageEvidence,
  terminal: O4gBoundedGithubReviewPublicationResult | null,
  failureStage: O4hFailureStage | null,
  failureCode: O4hFailureCode | null,
): O4hEndToEndReviewToPublicationResult {
  const completed = status.startsWith("COMPLETED_")
  if (completed && terminal === null) fail("internal completed result requires a terminal")
  if (completed && (failureStage !== null || failureCode !== null)) fail("internal completed result must not carry failure")
  if (!completed && terminal !== null && failureStage !== "O4G") fail("internal terminal/stage mismatch")
  if (!completed && terminal === null && failureStage === "O4G") fail("internal terminal/stage mismatch")
  const core = {
    version: O4H_END_TO_END_REVIEW_TO_PUBLICATION_VERSION,
    status,
    credentialPolicyIdentity: input.credentialPolicyIdentity,
    taskId: input.taskId,
    policyIdentity: input.policyIdentity,
    repositoryId: input.repositoryId,
    repositoryFullName: input.repositoryFullName,
    pullRequestNumber: input.pullRequestNumber,
    pullRequestId: input.pullRequestId,
    reviewedHead: input.expectedHeadSha,
    o4bReadContextEvidenceIdentity: evidence.o4b === null ? null : identityOf(evidence.o4b.readContextEvidence, "readContextEvidenceIdentity"),
    o4cContextIdentity: evidence.o4c === null ? null : identityOf(evidence.o4c, "contextIdentity"),
    o4dAdmissionIdentity: evidence.o4d === null ? null : identityOf(evidence.o4d, "admissionIdentity"),
    o4eExecutionIdentity: evidence.o4e === null ? null : identityOf(evidence.o4e, "executionIdentity"),
    o4fAdmissionIdentity: evidence.o4f === null ? null : identityOf(evidence.o4f, "publicationAdmissionIdentity"),
    terminalPublication: terminal,
    failureStage,
    failureCode,
    continuationDecision: continuation(status),
  }
  return deepFreeze({ ...core, compositionExecutionIdentity: digest("o4h-composition-execution-v1", core) })
}

function blocked(
  input: NormalizedInput,
  evidence: StageEvidence,
  status: O4hStatus,
  failureStage: O4hFailureStage,
  failureCode: O4hFailureCode,
): O4hEndToEndReviewToPublicationResult {
  return makeResult(input, status, evidence, null, failureStage, failureCode)
}

const EMPTY_EVIDENCE: StageEvidence = Object.freeze({ o4b: null, o4c: null, o4d: null, o4e: null, o4f: null })

export async function executeO4hEndToEndReviewToPublication(rawInput: unknown, rawOptions?: unknown): Promise<O4hEndToEndReviewToPublicationResult> {
  const input = normalizeInput(rawInput)
  const options = normalizeOptions(rawOptions)
  const fetchImpl = options.fetchImpl
  const timeoutMs = options.timeoutMs

  let o4b: O4bBoundedReadOnlyGithubContextResult
  try {
    o4b = await acquireO4bBoundedReadOnlyGithubContext(
      {
        expectedRepositoryId: input.repositoryId,
        expectedRepositoryFullName: input.repositoryFullName,
        pullRequestNumber: input.pullRequestNumber,
        expectedPullRequestId: input.pullRequestId,
        expectedBaseRepositoryId: input.baseRepositoryId,
        expectedHeadRepositoryId: input.headRepositoryId,
        expectedHeadRepositoryFullName: input.headRepositoryFullName,
        expectedHeadSha: input.expectedHeadSha,
        credentialPolicyIdentity: input.credentialPolicyIdentity,
        supportingPaths: [...input.supportingPaths],
        credential: input.credential,
      },
      { fetchImpl, ...(options.now === undefined ? {} : { now: options.now }), timeoutMs },
    )
  } catch { return blocked(input, EMPTY_EVIDENCE, "BLOCKED_O4B_NOT_READY", "O4B", "O4B_NOT_READY") }
  if (o4b.readContextEvidence.continuationDecision !== "READY_FOR_O4A_REVIEW") {
    return blocked(input, EMPTY_EVIDENCE, "BLOCKED_O4B_NOT_READY", "O4B", "O4B_NOT_READY")
  }
  const evidenceB: StageEvidence = Object.freeze({ ...EMPTY_EVIDENCE, o4b })

  let o4c: O4cGithubReviewerContextResult
  try {
    o4c = buildO4cGithubReviewerContext({ taskId: input.taskId, objective: input.objective, o4bContext: o4b })
  } catch { return blocked(input, evidenceB, "BLOCKED_O4C_NOT_READY", "O4C", "O4C_NOT_READY") }
  if (o4c.continuationDecision !== "READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_EXECUTION") {
    return blocked(input, evidenceB, "BLOCKED_O4C_NOT_READY", "O4C", "O4C_NOT_READY")
  }
  const evidenceC: StageEvidence = Object.freeze({ ...evidenceB, o4c })

  let o4d: O4dO4cReviewerExecutionAdmissionResult
  try {
    o4d = createO4dO4cReviewerExecutionAdmission({
      taskId: input.taskId,
      policyIdentity: input.policyIdentity,
      instructions: input.instructions,
      o4cContext: o4c,
    })
  } catch { return blocked(input, evidenceC, "BLOCKED_O4D_NOT_READY", "O4D", "O4D_NOT_READY") }
  if (o4d.continuationDecision !== O4D_READY_DECISION) {
    return blocked(input, evidenceC, "BLOCKED_O4D_NOT_READY", "O4D", "O4D_NOT_READY")
  }
  const evidenceD: StageEvidence = Object.freeze({ ...evidenceC, o4d })

  const verifiedHead = input.expectedHeadSha
  let o4e: O4eModelBackedReviewerProviderExecutionResult
  try {
    const executor = new O4eModelBackedReviewerProviderExecution({
      provider: input.provider,
      model: input.model,
      readCurrentHead: () => verifiedHead,
      ...(options.maxClaims === undefined ? {} : { maxClaims: options.maxClaims }),
      timeoutMs,
    })
    o4e = await executor.execute(o4d)
  } catch { return blocked(input, evidenceD, "BLOCKED_O4E_NOT_COMPLETED", "O4E", "O4E_NOT_COMPLETED") }
  if (o4e.status !== "COMPLETED") {
    return blocked(input, evidenceD, "BLOCKED_O4E_NOT_COMPLETED", "O4E", "O4E_NOT_COMPLETED")
  }
  const evidenceE: StageEvidence = Object.freeze({ ...evidenceD, o4e })

  let o4f: O4fSafeGithubPublicationAdmissionResult
  try {
    o4f = createO4fSafeGithubPublicationAdmission({ o4cContext: o4c, o4dAdmission: o4d, o4eExecution: o4e })
  } catch { return blocked(input, evidenceE, "BLOCKED_O4F_NOT_READY", "O4F", "O4F_NOT_READY") }
  if (o4f.status !== "READY" || o4f.continuationDecision !== O4F_READY_DECISION) {
    return blocked(input, evidenceE, "BLOCKED_O4F_NOT_READY", "O4F", "O4F_NOT_READY")
  }
  const evidenceF: StageEvidence = Object.freeze({ ...evidenceE, o4f })

  const terminal = await publishO4gBoundedGithubReview(
    { publicationAdmission: o4f, credentialPolicyIdentity: input.credentialPolicyIdentity, credential: input.credential },
    { fetchImpl, timeoutMs },
  )
  const mapped = terminalForO4g(terminal)
  const terminalStage: O4hFailureStage | null = mapped.failureCode === null ? null : "O4G"
  return makeResult(input, mapped.status, evidenceF, terminal, terminalStage, mapped.failureCode)
}

function normalizeStageIdentity(raw: unknown, label: string): string | null {
  if (raw === null) return null
  return sha256(raw, label)
}

export function validateO4hEndToEndReviewToPublicationResult(raw: unknown): O4hEndToEndReviewToPublicationResult {
  const r = exactRecord(raw, RESULT_KEYS, "result")
  if (r.version !== O4H_END_TO_END_REVIEW_TO_PUBLICATION_VERSION) fail("result version mismatch")
  const status = nonEmptyText(r.status, "result.status", 64) as O4hStatus
  if (!STATUS.has(status)) fail("result status unsupported")
  const continuationDecision = nonEmptyText(r.continuationDecision, "result.continuationDecision", 64) as O4hContinuationDecision
  if (!DECISIONS.has(continuationDecision) || continuationDecision !== continuation(status)) fail("result continuation mismatch")
  const failureStage = r.failureStage === null ? null : nonEmptyText(r.failureStage, "result.failureStage", 8) as O4hFailureStage
  if (failureStage !== null && !STAGES.has(failureStage)) fail("result failureStage unsupported")
  const failureCode = r.failureCode === null ? null : nonEmptyText(r.failureCode, "result.failureCode", 64) as O4hFailureCode
  if (failureCode !== null && !FAILURES.has(failureCode)) fail("result failureCode unsupported")
  const completed = status.startsWith("COMPLETED_")
  const terminal = r.terminalPublication === null ? null : validateO4gBoundedGithubReviewPublicationResult(r.terminalPublication)
  if (completed && terminal === null) fail("result completed without terminal")
  if (completed && (failureStage !== null || failureCode !== null)) fail("result completion/failure mismatch")
  if (!completed && terminal !== null && failureStage !== "O4G") fail("result terminal/stage mismatch")
  if (!completed && terminal === null && failureStage === "O4G") fail("result terminal/stage mismatch")
  if (terminal !== null) {
    const mapped = terminalForO4g(terminal)
    if (mapped.status !== status || mapped.failureCode !== failureCode) fail("result status/terminal mismatch")
  }
  const core = {
    version: O4H_END_TO_END_REVIEW_TO_PUBLICATION_VERSION,
    status,
    credentialPolicyIdentity: sha256(r.credentialPolicyIdentity, "result.credentialPolicyIdentity"),
    taskId: nonEmptyText(r.taskId, "result.taskId"),
    policyIdentity: nonEmptyText(r.policyIdentity, "result.policyIdentity"),
    repositoryId: decimalId(r.repositoryId, "result.repositoryId"),
    repositoryFullName: repository(r.repositoryFullName, "result.repositoryFullName"),
    pullRequestNumber: integer(r.pullRequestNumber, "result.pullRequestNumber", 1, Number.MAX_SAFE_INTEGER),
    pullRequestId: decimalId(r.pullRequestId, "result.pullRequestId"),
    reviewedHead: sha1(r.reviewedHead, "result.reviewedHead"),
    o4bReadContextEvidenceIdentity: normalizeStageIdentity(r.o4bReadContextEvidenceIdentity, "result.o4bReadContextEvidenceIdentity"),
    o4cContextIdentity: normalizeStageIdentity(r.o4cContextIdentity, "result.o4cContextIdentity"),
    o4dAdmissionIdentity: normalizeStageIdentity(r.o4dAdmissionIdentity, "result.o4dAdmissionIdentity"),
    o4eExecutionIdentity: normalizeStageIdentity(r.o4eExecutionIdentity, "result.o4eExecutionIdentity"),
    o4fAdmissionIdentity: normalizeStageIdentity(r.o4fAdmissionIdentity, "result.o4fAdmissionIdentity"),
    terminalPublication: terminal,
    failureStage,
    failureCode,
    continuationDecision,
  }
  if (completed) {
    for (const key of ["o4bReadContextEvidenceIdentity", "o4cContextIdentity", "o4dAdmissionIdentity", "o4eExecutionIdentity", "o4fAdmissionIdentity"] as const) {
      if (core[key] === null) fail("completed result requires all stage identities")
    }
  }
  const identity = sha256(r.compositionExecutionIdentity, "result.compositionExecutionIdentity")
  const expected = digest("o4h-composition-execution-v1", core)
  if (identity !== expected) fail("composition execution identity mismatch")
  return deepFreeze({ ...core, compositionExecutionIdentity: expected })
}
