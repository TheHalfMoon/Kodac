import { createHash } from "node:crypto"
import { types } from "node:util"

import {
  executeO4hEndToEndReviewToPublication,
  validateO4hEndToEndReviewToPublicationResult,
  type O4hEndToEndReviewToPublicationInput,
  type O4hEndToEndReviewToPublicationResult,
} from "./o4h-end-to-end-review-to-publication.ts"

export const O4I_BOUNDED_PRODUCTION_PUBLICATION_WIRING_VERSION = "kodac-o4i-bounded-production-publication-wiring-v1" as const
export const O4I_STATUSES = Object.freeze([
  "COMPLETED_PUBLISHED",
  "COMPLETED_ALREADY_PRESENT",
  "COMPLETED_RECOVERED_AFTER_UNCONFIRMED_POST",
  "BLOCKED_COMPOSITION_NOT_COMPLETED",
] as const)
export const O4I_FAILURE_CODES = Object.freeze([
  "COMPOSITION_NOT_COMPLETED",
] as const)
export const O4I_CONTINUATION_DECISIONS = Object.freeze([
  "PRODUCTION_PUBLICATION_COMPLETE",
  "STOP_AT_COMPOSITION",
] as const)
export const O4I_LIMITS = Object.freeze({
  maxTimeoutMs: 30_000,
})

export type O4iStatus = (typeof O4I_STATUSES)[number]
export type O4iFailureCode = (typeof O4I_FAILURE_CODES)[number]
export type O4iContinuationDecision = (typeof O4I_CONTINUATION_DECISIONS)[number]

export interface O4iBoundedProductionPublicationWiringInput {
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
  readonly provider: O4hEndToEndReviewToPublicationInput["provider"]
  readonly model: string
  readonly credentialPolicyIdentity: string
  readonly credential: string
}

export interface O4iBoundedProductionPublicationWiringOptions {
  readonly fetchImpl?: typeof fetch
  readonly timeoutMs?: number
  readonly now?: () => string
  readonly maxClaims?: number
}

export interface O4iBoundedProductionPublicationWiringResult {
  readonly version: typeof O4I_BOUNDED_PRODUCTION_PUBLICATION_WIRING_VERSION
  readonly wiringExecutionIdentity: string
  readonly status: O4iStatus
  readonly credentialPolicyIdentity: string
  readonly composedResult: O4hEndToEndReviewToPublicationResult
  readonly reviewId: string | null
  readonly reviewNodeId: string | null
  readonly reviewReceiptIdentity: string | null
  readonly failureCode: O4iFailureCode | null
  readonly continuationDecision: O4iContinuationDecision
}

type UnknownRecord = Record<string, unknown>

const STATUS = new Set<string>(O4I_STATUSES)
const FAILURES = new Set<string>(O4I_FAILURE_CODES)
const DECISIONS = new Set<string>(O4I_CONTINUATION_DECISIONS)
const RESULT_KEYS = [
  "version", "wiringExecutionIdentity", "status", "credentialPolicyIdentity", "composedResult",
  "reviewId", "reviewNodeId", "reviewReceiptIdentity", "failureCode", "continuationDecision",
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
function integer(raw: unknown, label: string, min: number, max: number): number { if (typeof raw !== "number" || !Number.isSafeInteger(raw) || raw < min || raw > max) fail(`${label} must be a bounded integer`); return raw }
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
function sha256(raw: unknown, label: string): string {
  if (typeof raw !== "string" || raw.length !== 64 || !/^[0-9a-f]{64}$/.test(raw)) fail(`${label} must be a lowercase sha256`)
  return raw
}
function continuation(status: O4iStatus): O4iContinuationDecision { return status === "BLOCKED_COMPOSITION_NOT_COMPLETED" ? "STOP_AT_COMPOSITION" : "PRODUCTION_PUBLICATION_COMPLETE" }

function normalizeOptions(raw: unknown): { fetchImpl: typeof fetch; timeoutMs: number; now: (() => string) | undefined; maxClaims: number | undefined } {
  if (raw === undefined) return { fetchImpl: fetch, timeoutMs: O4I_LIMITS.maxTimeoutMs, now: undefined, maxClaims: undefined }
  const r = exactRecord(raw, OPTION_KEYS.filter((key) => hasOwn(raw as object, key)), "options")
  const fetchImpl = r.fetchImpl === undefined ? fetch : r.fetchImpl
  if (typeof fetchImpl !== "function" || types.isProxy(fetchImpl)) fail("fetchImpl must be a non-proxy function")
  const timeoutMs = r.timeoutMs === undefined ? O4I_LIMITS.maxTimeoutMs : integer(r.timeoutMs, "timeoutMs", 1, O4I_LIMITS.maxTimeoutMs)
  const now = r.now === undefined ? undefined : r.now
  if (now !== undefined && typeof now !== "function") fail("now must be a function")
  const maxClaims = r.maxClaims === undefined ? undefined : integer(r.maxClaims, "maxClaims", 1, 64)
  return { fetchImpl: fetchImpl as typeof fetch, timeoutMs, now: now as (() => string) | undefined, maxClaims }
}

function makeResult(composed: O4hEndToEndReviewToPublicationResult): O4iBoundedProductionPublicationWiringResult {
  const completed = composed.status === "COMPLETED_PUBLISHED" || composed.status === "COMPLETED_ALREADY_PRESENT" || composed.status === "COMPLETED_RECOVERED_AFTER_UNCONFIRMED_POST"
  const terminal = composed.terminalPublication
  if (completed && terminal === null) fail("internal completed composition requires a terminal")
  const status: O4iStatus = !completed ? "BLOCKED_COMPOSITION_NOT_COMPLETED"
    : composed.status === "COMPLETED_ALREADY_PRESENT" ? "COMPLETED_ALREADY_PRESENT"
    : composed.status === "COMPLETED_RECOVERED_AFTER_UNCONFIRMED_POST" ? "COMPLETED_RECOVERED_AFTER_UNCONFIRMED_POST"
    : "COMPLETED_PUBLISHED"
  const core = {
    version: O4I_BOUNDED_PRODUCTION_PUBLICATION_WIRING_VERSION,
    status,
    credentialPolicyIdentity: composed.credentialPolicyIdentity,
    composedResult: composed,
    reviewId: completed ? terminal!.reviewId : null,
    reviewNodeId: completed ? terminal!.reviewNodeId : null,
    reviewReceiptIdentity: completed ? terminal!.reviewReceiptIdentity : null,
    failureCode: completed ? null : ("COMPOSITION_NOT_COMPLETED" as O4iFailureCode | null),
    continuationDecision: continuation(status),
  }
  return deepFreeze({ ...core, wiringExecutionIdentity: digest("o4i-wiring-execution-v1", core) })
}

export async function runO4iBoundedProductionPublication(rawInput: unknown, rawOptions?: unknown): Promise<O4iBoundedProductionPublicationWiringResult> {
  exactRecord(rawInput, INPUT_KEYS, "input")
  const options = normalizeOptions(rawOptions)
  const composed = await executeO4hEndToEndReviewToPublication(
    rawInput as O4hEndToEndReviewToPublicationInput,
    { fetchImpl: options.fetchImpl, timeoutMs: options.timeoutMs, ...(options.now === undefined ? {} : { now: options.now }), ...(options.maxClaims === undefined ? {} : { maxClaims: options.maxClaims }) },
  )
  return makeResult(composed)
}

export function validateO4iBoundedProductionPublicationWiringResult(raw: unknown): O4iBoundedProductionPublicationWiringResult {
  const r = exactRecord(raw, RESULT_KEYS, "result")
  if (r.version !== O4I_BOUNDED_PRODUCTION_PUBLICATION_WIRING_VERSION) fail("result version mismatch")
  const status = r.status
  if (typeof status !== "string" || !STATUS.has(status)) fail("result status unsupported")
  const typedStatus = status as O4iStatus
  const continuationDecision = r.continuationDecision
  if (typeof continuationDecision !== "string" || !DECISIONS.has(continuationDecision) || (continuationDecision as O4iContinuationDecision) !== continuation(typedStatus)) fail("result continuation mismatch")
  const failureCode = (r.failureCode === null ? null : r.failureCode) as O4iFailureCode | null
  if (failureCode !== null && !FAILURES.has(failureCode)) fail("result failureCode unsupported")
  const completed = typedStatus !== "BLOCKED_COMPOSITION_NOT_COMPLETED"
  if (completed && failureCode !== null) fail("result completion/failure mismatch")
  if (!completed && failureCode !== "COMPOSITION_NOT_COMPLETED") fail("result completion/failure mismatch")
  const composed = validateO4hEndToEndReviewToPublicationResult(r.composedResult)
  const composedCompleted = composed.status === "COMPLETED_PUBLISHED" || composed.status === "COMPLETED_ALREADY_PRESENT" || composed.status === "COMPLETED_RECOVERED_AFTER_UNCONFIRMED_POST"
  if (completed !== composedCompleted) fail("result status/composed mismatch")
  const terminal = composed.terminalPublication
  if (completed && terminal === null) fail("result completed without terminal")
  const reviewId = (r.reviewId === null ? null : r.reviewId) as string | null
  const reviewNodeId = (r.reviewNodeId === null ? null : r.reviewNodeId) as string | null
  const reviewReceiptIdentity = (r.reviewReceiptIdentity === null ? null : r.reviewReceiptIdentity) as string | null
  if (completed) {
    if (typeof reviewId !== "string" || typeof reviewNodeId !== "string" || typeof reviewReceiptIdentity !== "string") fail("result completed without mirrored receipt")
    if (reviewId !== terminal!.reviewId || reviewNodeId !== terminal!.reviewNodeId || reviewReceiptIdentity !== terminal!.reviewReceiptIdentity) fail("result receipt mirror mismatch")
    if (typeof terminal!.reviewId !== "string" || terminal!.reviewId.length === 0) fail("result receipt mirror mismatch")
  } else {
    if (reviewId !== null || reviewNodeId !== null || reviewReceiptIdentity !== null) fail("result blocked carries receipt")
  }
  const core = {
    version: O4I_BOUNDED_PRODUCTION_PUBLICATION_WIRING_VERSION,
    status: typedStatus,
    credentialPolicyIdentity: sha256(r.credentialPolicyIdentity, "result.credentialPolicyIdentity"),
    composedResult: composed,
    reviewId,
    reviewNodeId,
    reviewReceiptIdentity,
    failureCode,
    continuationDecision: continuationDecision as O4iContinuationDecision,
  }
  const identity = sha256(r.wiringExecutionIdentity, "result.wiringExecutionIdentity")
  const expected = digest("o4i-wiring-execution-v1", core)
  if (identity !== expected) fail("wiring execution identity mismatch")
  return deepFreeze({ ...core, wiringExecutionIdentity: expected })
}
