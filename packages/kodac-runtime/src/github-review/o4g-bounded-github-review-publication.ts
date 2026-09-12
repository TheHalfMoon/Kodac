import { createHash } from "node:crypto"
import { types } from "node:util"

import {
  O4F_READY_DECISION,
  validateO4fSafeGithubPublicationAdmissionResult,
  type O4fPublicationRequest,
  type O4fSafeGithubPublicationAdmissionResult,
} from "./o4f-safe-github-publication-admission.ts"

export const O4G_BOUNDED_GITHUB_REVIEW_PUBLICATION_VERSION = "kodac-o4g-bounded-github-review-publication-v1" as const
export const O4G_STATUSES = Object.freeze([
  "COMPLETED_CREATED",
  "COMPLETED_ALREADY_PRESENT",
  "COMPLETED_RECOVERED_AFTER_UNCONFIRMED_POST",
  "BLOCKED_O4F_NOT_READY",
  "BLOCKED_HEAD_MISMATCH",
  "BLOCKED_DIFF_ANCHOR",
  "BLOCKED_EXISTING_PUBLICATION",
  "READ_FAILED",
  "POST_REJECTED",
  "AMBIGUOUS_POST_OUTCOME",
  "INVALID_GITHUB_RESPONSE",
] as const)
export const O4G_CONTINUATION_DECISIONS = Object.freeze([
  "PUBLICATION_COMPLETE",
  "STOP_NO_AUTOMATIC_POST_RETRY",
] as const)
export const O4G_FAILURE_CODES = Object.freeze([
  "O4F_NOT_READY",
  "LIVE_PR_IDENTITY_MISMATCH",
  "LIVE_HEAD_MISMATCH",
  "DIFF_ANCHOR_UNPROVEN",
  "EXISTING_PUBLICATION_PARTIAL",
  "EXISTING_PUBLICATION_DUPLICATE",
  "EXISTING_PUBLICATION_MISMATCH",
  "SCAN_BOUND_EXHAUSTED",
  "READ_TRANSPORT_FAILED",
  "READ_HTTP_REJECTED",
  "INVALID_RESPONSE",
  "POST_HTTP_REJECTED",
  "POST_OUTCOME_UNCONFIRMED",
  "READBACK_UNCONFIRMED",
] as const)
export const O4G_LIMITS = Object.freeze({
  maxReviewPages: 8,
  maxReviewCommentPages: 8,
  maxFilesPages: 8,
  itemsPerPage: 100,
  maxResponseUtf8Bytes: 2_097_152,
  maxAggregateReadBytes: 8_388_608,
  maxRequestBodyUtf8Bytes: 1_572_864,
  maxTimeoutMs: 30_000,
  maxCredentialUtf8Bytes: 4_096,
  maxGeneralTextUtf8Bytes: 65_536,
  maxPatchUtf8Bytes: 262_144,
  maxGraphDepth: 32,
  maxGraphNodes: 32_768,
  maxHttpRequests: 32,
})

export type O4gStatus = (typeof O4G_STATUSES)[number]
export type O4gContinuationDecision = (typeof O4G_CONTINUATION_DECISIONS)[number]
export type O4gFailureCode = (typeof O4G_FAILURE_CODES)[number]
export type O4gPublicationClass = "TOP_LEVEL_REVIEW_SUMMARY" | "INLINE_FINDING_COMMENT"
export type O4gGithubObjectKind = "PULL_REQUEST_REVIEW" | "PULL_REQUEST_REVIEW_COMMENT"

export interface O4gBoundedGithubReviewPublicationInput {
  readonly publicationAdmission: O4fSafeGithubPublicationAdmissionResult
  readonly credentialPolicyIdentity: string
  readonly credential: string
}

export interface O4gBoundedGithubReviewPublicationOptions {
  readonly fetchImpl?: typeof fetch
  readonly timeoutMs?: number
}

export interface O4gSlotReceipt {
  readonly slotReceiptIdentity: string
  readonly publicationSlotIdentity: string
  readonly publicationRequestIdentity: string
  readonly publicationClass: O4gPublicationClass
  readonly bodyIdentity: string
  readonly githubObjectKind: O4gGithubObjectKind
  readonly githubObjectId: string
  readonly githubNodeId: string
  readonly pullRequestReviewId: string
  readonly commitId: string
  readonly path: string | null
  readonly line: number | null
  readonly side: "RIGHT" | null
}

export interface O4gBoundedGithubReviewPublicationResult {
  readonly version: typeof O4G_BOUNDED_GITHUB_REVIEW_PUBLICATION_VERSION
  readonly publicationExecutionIdentity: string
  readonly status: O4gStatus
  readonly credentialPolicyIdentity: string
  readonly publicationAdmissionIdentity: string
  readonly repositoryId: string
  readonly repositoryFullName: string
  readonly pullRequestNumber: number
  readonly pullRequestId: string
  readonly reviewedHead: string
  readonly evaluatedHead: string | null
  readonly o4eExecutionIdentity: string
  readonly reviewId: string | null
  readonly reviewNodeId: string | null
  readonly reviewReceiptIdentity: string | null
  readonly slotReceipts: readonly O4gSlotReceipt[]
  readonly publicationRequestCount: number
  readonly failureCode: O4gFailureCode | null
  readonly continuationDecision: O4gContinuationDecision
}

type UnknownRecord = Record<string, unknown>
type NormalizedInput = Readonly<{
  publicationAdmission: O4fSafeGithubPublicationAdmissionResult
  credentialPolicyIdentity: string
  credential: string
}>
type NormalizedOptions = Readonly<{ fetchImpl: typeof fetch; timeoutMs: number }>
type HttpState = { requests: number; posts: number; readBytes: number }
type LivePullRequest = Readonly<{ id: string; number: number; repositoryId: string; repositoryFullName: string; headSha: string }>
type GithubReview = Readonly<{ id: string; nodeId: string; body: string; commitId: string; state: "COMMENTED" | "APPROVED" | "CHANGES_REQUESTED" | "DISMISSED" | "PENDING" }>
type GithubReviewComment = Readonly<{ id: string; nodeId: string; reviewId: string; body: string; commitId: string; path: string; line: number | null; side: "RIGHT" | "LEFT" | null }>
type GithubFile = Readonly<{ filename: string; patch: string | null }>
type ScanKind = "NONE_PRESENT" | "COMPLETE_EXACT_PUBLICATION_PRESENT" | "PARTIAL_PRESENT" | "DUPLICATE_SLOT_PRESENT" | "MARKER_OR_BODY_MISMATCH" | "SCAN_BOUND_EXHAUSTED" | "INVALID_GITHUB_RESPONSE"
type CompletePublication = Readonly<{ review: GithubReview; comments: readonly GithubReviewComment[]; slotReceipts: readonly O4gSlotReceipt[]; reviewReceiptIdentity: string }>
type ScanResult = Readonly<{ kind: ScanKind; complete: CompletePublication | null }>

const SHA1 = /^[0-9a-f]{40}$/
const SHA256 = /^[0-9a-f]{64}$/
const DECIMAL_ID = /^(?:[1-9][0-9]{0,19})$/
const REPOSITORY = /^[A-Za-z0-9_.-]{1,100}\/[A-Za-z0-9_.-]{1,100}$/
const STATUS = new Set<string>(O4G_STATUSES)
const DECISIONS = new Set<string>(O4G_CONTINUATION_DECISIONS)
const FAILURES = new Set<string>(O4G_FAILURE_CODES)
const RESULT_KEYS = [
  "version", "publicationExecutionIdentity", "status", "credentialPolicyIdentity", "publicationAdmissionIdentity",
  "repositoryId", "repositoryFullName", "pullRequestNumber", "pullRequestId", "reviewedHead", "evaluatedHead",
  "o4eExecutionIdentity", "reviewId", "reviewNodeId", "reviewReceiptIdentity", "slotReceipts",
  "publicationRequestCount", "failureCode", "continuationDecision",
] as const
const SLOT_KEYS = [
  "slotReceiptIdentity", "publicationSlotIdentity", "publicationRequestIdentity", "publicationClass", "bodyIdentity",
  "githubObjectKind", "githubObjectId", "githubNodeId", "pullRequestReviewId", "commitId", "path", "line", "side",
] as const
const INPUT_KEYS = ["publicationAdmission", "credentialPolicyIdentity", "credential"] as const
const OPTION_KEYS = ["fetchImpl", "timeoutMs"] as const

class O4gLocalError extends Error {
  readonly code: "READ_TRANSPORT" | "READ_HTTP" | "INVALID_RESPONSE" | "SCAN_BOUND" | "DIFF_ANCHOR"
  constructor(code: O4gLocalError["code"], message: string) { super(message); this.name = "O4gLocalError"; this.code = code }
}

function fail(message: string): never { throw new TypeError(message) }
function hasOwn(value: object, key: PropertyKey): boolean { return Object.prototype.hasOwnProperty.call(value, key) }
function exactRecord(raw: unknown, keys: readonly string[], label: string): UnknownRecord {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw) || Object.getPrototypeOf(raw) !== Object.prototype) fail(`${label} must be a plain object`)
  const record = raw as UnknownRecord
  const actual = Object.keys(record).sort(), expected = [...keys].sort()
  if (actual.length !== expected.length || actual.some((key, i) => key !== expected[i])) fail(`${label} has unexpected or missing properties`)
  return record
}
function text(raw: unknown, label: string, maxBytes: number = O4G_LIMITS.maxGeneralTextUtf8Bytes): string {
  if (typeof raw !== "string" || Buffer.byteLength(raw, "utf8") > maxBytes || raw.includes("\0")) fail(`${label} must be bounded text`)
  for (let i = 0; i < raw.length; i += 1) { const c = raw.charCodeAt(i); if (c >= 0xd800 && c <= 0xdbff) { const n = raw.charCodeAt(++i); if (!(n >= 0xdc00 && n <= 0xdfff)) fail(`${label} contains invalid Unicode`) } else if (c >= 0xdc00 && c <= 0xdfff) fail(`${label} contains invalid Unicode`) }
  return raw
}
function nonEmptyText(raw: unknown, label: string, maxBytes: number = O4G_LIMITS.maxGeneralTextUtf8Bytes): string { const value = text(raw, label, maxBytes); if (value.length === 0) fail(`${label} must not be empty`); return value }
function sha1(raw: unknown, label: string): string { const value = nonEmptyText(raw, label, 40); if (!SHA1.test(value)) fail(`${label} must be a lowercase git sha`); return value }
function sha256(raw: unknown, label: string): string { const value = nonEmptyText(raw, label, 64); if (!SHA256.test(value)) fail(`${label} must be a lowercase sha256`); return value }
function decimalId(raw: unknown, label: string): string { const value = nonEmptyText(raw, label, 20); if (!DECIMAL_ID.test(value)) fail(`${label} must be a decimal identifier`); return value }
function githubId(raw: unknown, label: string): string {
  if (typeof raw === "number") { if (!Number.isSafeInteger(raw) || raw < 1) fail(`${label} must be a safe positive integer`); return String(raw) }
  return decimalId(raw, label)
}
function integer(raw: unknown, label: string, min: number, max: number): number { if (typeof raw !== "number" || !Number.isSafeInteger(raw) || raw < min || raw > max) fail(`${label} must be a bounded integer`); return raw }
function repository(raw: unknown, label: string): string { const value = nonEmptyText(raw, label, 201); if (!REPOSITORY.test(value)) fail(`${label} must be owner/name`); return value }
function repositoryPath(raw: unknown, label: string): string { const value = nonEmptyText(raw, label, 1024); if (value.startsWith("/") || value.includes("\\") || value.split("/").some((x) => x === "" || x === "." || x === "..")) fail(`${label} must be a repository-relative path`); return value }
function credential(raw: unknown): string { const value = nonEmptyText(raw, "credential", O4G_LIMITS.maxCredentialUtf8Bytes); for (const ch of value) { const code = ch.codePointAt(0)!; if (code < 0x20 || code === 0x7f) fail("credential contains control characters") } return value }
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
function marker(slot: string): string { return `<!-- kodac-publication-slot:${slot} -->` }
function continuation(status: O4gStatus): O4gContinuationDecision { return status.startsWith("COMPLETED_") ? "PUBLICATION_COMPLETE" : "STOP_NO_AUTOMATIC_POST_RETRY" }

function normalizeInput(raw: unknown): NormalizedInput {
  const r = exactRecord(raw, INPUT_KEYS, "input")
  let publicationAdmission: O4fSafeGithubPublicationAdmissionResult
  try { publicationAdmission = validateO4fSafeGithubPublicationAdmissionResult(r.publicationAdmission) } catch { fail("publicationAdmission is not a valid O4-F result") }
  return deepFreeze({ publicationAdmission, credentialPolicyIdentity: sha256(r.credentialPolicyIdentity, "credentialPolicyIdentity"), credential: credential(r.credential) })
}
function normalizeOptions(raw: unknown): NormalizedOptions {
  if (raw === undefined) return { fetchImpl: fetch, timeoutMs: O4G_LIMITS.maxTimeoutMs }
  const r = exactRecord(raw, OPTION_KEYS.filter((key) => hasOwn(raw as object, key)), "options")
  const fetchImpl = r.fetchImpl === undefined ? fetch : r.fetchImpl
  if (typeof fetchImpl !== "function" || types.isProxy(fetchImpl)) fail("fetchImpl must be a non-proxy function")
  const timeoutMs = r.timeoutMs === undefined ? O4G_LIMITS.maxTimeoutMs : integer(r.timeoutMs, "timeoutMs", 1, O4G_LIMITS.maxTimeoutMs)
  return { fetchImpl: fetchImpl as typeof fetch, timeoutMs }
}

function assertSafeJson(value: unknown): void {
  let nodes = 0
  const seen = new Set<object>()
  const walk = (v: unknown, depth: number): void => {
    if (depth > O4G_LIMITS.maxGraphDepth || ++nodes > O4G_LIMITS.maxGraphNodes) throw new O4gLocalError("INVALID_RESPONSE", "GitHub response graph exceeds bounds")
    if (v === null || typeof v === "boolean") return
    if (typeof v === "number") { if (!Number.isSafeInteger(v)) throw new O4gLocalError("INVALID_RESPONSE", "GitHub response contains unsafe number"); return }
    if (typeof v === "string") { try { text(v, "GitHub response string") } catch { throw new O4gLocalError("INVALID_RESPONSE", "GitHub response contains invalid text") }; return }
    if (typeof v !== "object" || seen.has(v as object)) throw new O4gLocalError("INVALID_RESPONSE", "GitHub response graph is invalid")
    seen.add(v as object)
    if (Array.isArray(v)) { for (const child of v) walk(child, depth + 1); return }
    if (Object.getPrototypeOf(v) !== Object.prototype) throw new O4gLocalError("INVALID_RESPONSE", "GitHub response object is invalid")
    for (const [key, child] of Object.entries(v as UnknownRecord)) { if (key === "__proto__" || key === "prototype" || key === "constructor") throw new O4gLocalError("INVALID_RESPONSE", "GitHub response contains forbidden key"); walk(child, depth + 1) }
  }
  walk(value, 0)
}
function jsonContentType(value: string | null): boolean { if (!value) return false; const media = value.split(";", 1)[0]!.trim().toLowerCase(); return media === "application/json" || (media.startsWith("application/") && media.endsWith("+json")) }
async function raceWithAbort<T>(work: Promise<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) throw new O4gLocalError("READ_TRANSPORT", "request aborted")
  let onAbort: (() => void) | undefined
  const aborted = new Promise<never>((_resolve, reject) => { onAbort = () => reject(new O4gLocalError("READ_TRANSPORT", "request aborted")); signal.addEventListener("abort", onAbort, { once: true }); if (signal.aborted) onAbort() })
  try { return await Promise.race([work, aborted]) } finally { if (onAbort) signal.removeEventListener("abort", onAbort) }
}
async function readBoundedBody(response: Response, maximumBytes: number, state: HttpState, controller: AbortController): Promise<Uint8Array> {
  const reader = response.body?.getReader(); if (!reader) throw new O4gLocalError("INVALID_RESPONSE", "GitHub response body is missing")
  const chunks: Uint8Array[] = []; let total = 0
  try {
    while (true) { const next = await raceWithAbort(reader.read(), controller.signal); if (next.done) break; if (!next.value) continue; total += next.value.byteLength; state.readBytes += next.value.byteLength; if (total > maximumBytes || state.readBytes > O4G_LIMITS.maxAggregateReadBytes) { controller.abort(); void reader.cancel().catch(() => undefined); throw new O4gLocalError("INVALID_RESPONSE", "GitHub response byte bound exceeded") }; chunks.push(next.value) }
  } catch (error) { if (error instanceof O4gLocalError) throw error; throw new O4gLocalError("READ_TRANSPORT", "GitHub response read failed") }
  const output = new Uint8Array(total); let offset = 0; for (const chunk of chunks) { output.set(chunk, offset); offset += chunk.byteLength } return output
}
function encodedRepository(fullName: string): string { return fullName.split("/").map(encodeURIComponent).join("/") }
function baseUrl(a: O4fSafeGithubPublicationAdmissionResult): string { return `https://api.github.com/repos/${encodedRepository(a.repositoryFullName)}/pulls/${a.pullRequestNumber}` }
function prUrl(a: O4fSafeGithubPublicationAdmissionResult): URL { return new URL(baseUrl(a)) }
function pageUrl(a: O4fSafeGithubPublicationAdmissionResult, suffix: "files" | "reviews" | "comments", page: number): URL { const u = new URL(`${baseUrl(a)}/${suffix}`); u.searchParams.set("per_page", String(O4G_LIMITS.itemsPerPage)); u.searchParams.set("page", String(page)); return u }
function createReviewUrl(a: O4fSafeGithubPublicationAdmissionResult): URL { return new URL(`${baseUrl(a)}/reviews`) }
function assertAllowed(method: "GET" | "POST", url: URL, a: O4fSafeGithubPublicationAdmissionResult): void {
  if (url.protocol !== "https:" || url.hostname !== "api.github.com" || url.port !== "") throw new O4gLocalError("INVALID_RESPONSE", "GitHub request escaped the API origin")
  const root = `/repos/${encodedRepository(a.repositoryFullName)}/pulls/${a.pullRequestNumber}`
  const exact = method === "GET" && url.pathname === root && url.search === ""
  const paged = method === "GET" && [`${root}/files`, `${root}/reviews`, `${root}/comments`].includes(url.pathname) && url.searchParams.get("per_page") === String(O4G_LIMITS.itemsPerPage) && /^\d+$/.test(url.searchParams.get("page") ?? "") && [...url.searchParams.keys()].sort().join(",") === "page,per_page"
  const post = method === "POST" && url.pathname === `${root}/reviews` && url.search === ""
  if (!exact && !paged && !post) throw new O4gLocalError("INVALID_RESPONSE", "GitHub route or method is outside the allowlist")
}
function headers(input: NormalizedInput): Record<string, string> { return { Accept: "application/vnd.github+json", Authorization: `Bearer ${input.credential}`, "X-GitHub-Api-Version": "2026-03-10", "User-Agent": "Kodac-O4G/1" } }
type ActiveRequest = Readonly<{ response: Response; controller: AbortController; timer: ReturnType<typeof setTimeout> }>
async function beginRequest(url: URL, init: RequestInit, options: NormalizedOptions): Promise<ActiveRequest> {
  const controller = new AbortController(), timer = setTimeout(() => controller.abort(), options.timeoutMs)
  try {
    const response = await Promise.race([Promise.resolve(options.fetchImpl(url, { ...init, signal: controller.signal, redirect: "error" })), new Promise<Response>((_, reject) => controller.signal.addEventListener("abort", () => reject(new Error("timeout")), { once: true }))])
    return { response, controller, timer }
  } catch (error) { clearTimeout(timer); throw error }
}
function validateResponseUrl(response: Response, requested: URL): void { if (!response.url) return; let actual: URL; try { actual = new URL(response.url) } catch { throw new O4gLocalError("INVALID_RESPONSE", "GitHub response URL is invalid") }; if (actual.origin !== "https://api.github.com" || actual.href !== requested.href) throw new O4gLocalError("INVALID_RESPONSE", "GitHub response URL mismatch") }
async function getJson(url: URL, input: NormalizedInput, options: NormalizedOptions, state: HttpState): Promise<unknown> {
  assertAllowed("GET", url, input.publicationAdmission); if (++state.requests > O4G_LIMITS.maxHttpRequests) throw new O4gLocalError("SCAN_BOUND", "HTTP request budget exhausted")
  let active: ActiveRequest
  try { active = await beginRequest(url, { method: "GET", headers: headers(input) }, options) } catch { throw new O4gLocalError("READ_TRANSPORT", "GitHub read failed") }
  try {
    const { response, controller } = active
    validateResponseUrl(response, url)
    if (response.status < 200 || response.status >= 300) throw new O4gLocalError("READ_HTTP", "GitHub read was rejected")
    if (!jsonContentType(response.headers.get("content-type"))) throw new O4gLocalError("INVALID_RESPONSE", "GitHub response content type is invalid")
    const bytes = await readBoundedBody(response, O4G_LIMITS.maxResponseUtf8Bytes, state, controller)
    if (controller.signal.aborted) throw new O4gLocalError("READ_TRANSPORT", "GitHub read timed out")
    let body: string; try { body = new TextDecoder("utf-8", { fatal: true }).decode(bytes) } catch { throw new O4gLocalError("INVALID_RESPONSE", "GitHub response is not valid UTF-8") }
    let parsed: unknown; try { parsed = JSON.parse(body) } catch { throw new O4gLocalError("INVALID_RESPONSE", "GitHub response is malformed JSON") }; assertSafeJson(parsed); return parsed
  } finally { clearTimeout(active.timer) }
}

type PostOutcome = Readonly<{ kind: "CONFIRMED" | "REJECTED" | "UNCONFIRMED"; review: GithubReview | null }>
async function postReview(body: string, input: NormalizedInput, options: NormalizedOptions, state: HttpState): Promise<PostOutcome> {
  const url = createReviewUrl(input.publicationAdmission); assertAllowed("POST", url, input.publicationAdmission)
  if (state.posts !== 0) return { kind: "UNCONFIRMED", review: null }; state.posts += 1; state.requests += 1
  if (state.requests > O4G_LIMITS.maxHttpRequests) return { kind: "UNCONFIRMED", review: null }
  let active: ActiveRequest
  try { active = await beginRequest(url, { method: "POST", headers: { ...headers(input), "Content-Type": "application/json" }, body }, options) } catch { return { kind: "UNCONFIRMED", review: null } }
  try {
    const { response, controller } = active
    try { validateResponseUrl(response, url) } catch { return { kind: "UNCONFIRMED", review: null } }
    if (response.status < 200 || response.status >= 300) return { kind: "REJECTED", review: null }
    if (!jsonContentType(response.headers.get("content-type"))) return { kind: "UNCONFIRMED", review: null }
    try {
      const bytes = await readBoundedBody(response, O4G_LIMITS.maxResponseUtf8Bytes, state, controller)
      if (controller.signal.aborted) return { kind: "UNCONFIRMED", review: null }
      const raw = new TextDecoder("utf-8", { fatal: true }).decode(bytes), parsed = JSON.parse(raw); assertSafeJson(parsed)
      return { kind: "CONFIRMED", review: parseReview(parsed, "create review response") }
    } catch { return { kind: "UNCONFIRMED", review: null } }
  } finally { clearTimeout(active.timer) }
}

function providerRecord(raw: unknown, label: string): UnknownRecord { if (typeof raw !== "object" || raw === null || Array.isArray(raw)) throw new O4gLocalError("INVALID_RESPONSE", `${label} is invalid`); return raw as UnknownRecord }
function providerText(raw: unknown, label: string, max: number = O4G_LIMITS.maxGeneralTextUtf8Bytes): string { try { return text(raw, label, max) } catch { throw new O4gLocalError("INVALID_RESPONSE", `${label} is invalid`) } }
function providerInt(raw: unknown, label: string): number { try { return integer(raw, label, 1, Number.MAX_SAFE_INTEGER) } catch { throw new O4gLocalError("INVALID_RESPONSE", `${label} is invalid`) } }
function providerId(raw: unknown, label: string): string { try { return githubId(raw, label) } catch { throw new O4gLocalError("INVALID_RESPONSE", `${label} is invalid`) } }
function providerSha(raw: unknown, label: string): string { try { return sha1(raw, label) } catch { throw new O4gLocalError("INVALID_RESPONSE", `${label} is invalid`) } }
function parseReview(raw: unknown, label: string): GithubReview { const r = providerRecord(raw, label); const state = providerText(r.state, `${label}.state`, 32); if (!["COMMENTED", "APPROVED", "CHANGES_REQUESTED", "DISMISSED", "PENDING"].includes(state)) throw new O4gLocalError("INVALID_RESPONSE", `${label}.state is invalid`); return deepFreeze({ id: providerId(r.id, `${label}.id`), nodeId: nonEmptyProviderText(r.node_id, `${label}.node_id`, 512), body: r.body === null ? "" : providerText(r.body, `${label}.body`, 131_072), commitId: providerSha(r.commit_id, `${label}.commit_id`), state: state as GithubReview["state"] }) }
function nonEmptyProviderText(raw: unknown, label: string, max: number): string { const value = providerText(raw, label, max); if (!value) throw new O4gLocalError("INVALID_RESPONSE", `${label} is invalid`); return value }
function parseReviewComment(raw: unknown, label: string): GithubReviewComment { const r = providerRecord(raw, label); const side = r.side === null || r.side === undefined ? null : r.side === "RIGHT" || r.side === "LEFT" ? r.side : (() => { throw new O4gLocalError("INVALID_RESPONSE", `${label}.side is invalid`) })(); const line = r.line === null || r.line === undefined ? null : providerInt(r.line, `${label}.line`); return deepFreeze({ id: providerId(r.id, `${label}.id`), nodeId: nonEmptyProviderText(r.node_id, `${label}.node_id`, 512), reviewId: providerId(r.pull_request_review_id, `${label}.pull_request_review_id`), body: providerText(r.body, `${label}.body`, 131_072), commitId: providerSha(r.commit_id, `${label}.commit_id`), path: repositoryPath(providerText(r.path, `${label}.path`, 1024), `${label}.path`), line, side }) }
function parseLivePullRequest(raw: unknown): LivePullRequest {
  const r = providerRecord(raw, "pull request"), base = providerRecord(r.base, "pull request.base"), head = providerRecord(r.head, "pull request.head"), repo = providerRecord(base.repo, "pull request.base.repo")
  return deepFreeze({ id: providerId(r.id, "pull request.id"), number: providerInt(r.number, "pull request.number"), repositoryId: providerId(repo.id, "pull request.base.repo.id"), repositoryFullName: repository(providerText(repo.full_name, "pull request.base.repo.full_name", 201), "pull request.base.repo.full_name"), headSha: providerSha(head.sha, "pull request.head.sha") })
}
function parseFile(raw: unknown, label: string): GithubFile { const r = providerRecord(raw, label); const filename = repositoryPath(providerText(r.filename, `${label}.filename`, 1024), `${label}.filename`); const patch = r.patch === undefined || r.patch === null ? null : providerText(r.patch, `${label}.patch`, O4G_LIMITS.maxPatchUtf8Bytes); return deepFreeze({ filename, patch }) }

async function listReviews(input: NormalizedInput, options: NormalizedOptions, state: HttpState): Promise<readonly GithubReview[]> { return listPages("reviews", O4G_LIMITS.maxReviewPages, parseReview, input, options, state) }
async function listComments(input: NormalizedInput, options: NormalizedOptions, state: HttpState): Promise<readonly GithubReviewComment[]> { return listPages("comments", O4G_LIMITS.maxReviewCommentPages, parseReviewComment, input, options, state) }
async function listFiles(input: NormalizedInput, options: NormalizedOptions, state: HttpState): Promise<readonly GithubFile[]> { return listPages("files", O4G_LIMITS.maxFilesPages, parseFile, input, options, state) }
async function listPages<T>(suffix: "reviews" | "comments" | "files", maxPages: number, parse: (raw: unknown, label: string) => T, input: NormalizedInput, options: NormalizedOptions, state: HttpState): Promise<readonly T[]> {
  const output: T[] = []
  for (let page = 1; page <= maxPages; page += 1) {
    const raw = await getJson(pageUrl(input.publicationAdmission, suffix, page), input, options, state)
    if (!Array.isArray(raw) || raw.length > O4G_LIMITS.itemsPerPage) throw new O4gLocalError("INVALID_RESPONSE", `${suffix} response is invalid`)
    raw.forEach((item, i) => output.push(parse(item, `${suffix}[${(page - 1) * O4G_LIMITS.itemsPerPage + i}]`)))
    if (raw.length < O4G_LIMITS.itemsPerPage) return Object.freeze(output)
  }
  throw new O4gLocalError("SCAN_BOUND", `${suffix} scan bound exhausted`)
}

function slotReceipt(request: O4fPublicationRequest, object: GithubReview | GithubReviewComment, reviewId: string): O4gSlotReceipt {
  const inline = request.publicationClass === "INLINE_FINDING_COMMENT"
  const comment = inline ? object as GithubReviewComment : null
  if (inline && (comment!.line === null || comment!.side !== "RIGHT")) fail("inline receipt requires an exact RIGHT-side anchor")
  const core = {
    publicationSlotIdentity: request.publicationSlotIdentity,
    publicationRequestIdentity: request.publicationRequestIdentity,
    publicationClass: request.publicationClass,
    bodyIdentity: request.bodyIdentity,
    githubObjectKind: inline ? "PULL_REQUEST_REVIEW_COMMENT" as const : "PULL_REQUEST_REVIEW" as const,
    githubObjectId: object.id,
    githubNodeId: object.nodeId,
    pullRequestReviewId: reviewId,
    commitId: object.commitId,
    path: inline ? comment!.path : null,
    line: inline ? comment!.line! : null,
    side: inline ? "RIGHT" as const : null,
  }
  return deepFreeze({ ...core, slotReceiptIdentity: digest("o4g-slot-receipt-v1", core) })
}
function reviewReceiptIdentity(admission: O4fSafeGithubPublicationAdmissionResult, review: GithubReview, slots: readonly O4gSlotReceipt[]): string { return digest("o4g-review-receipt-v1", { publicationAdmissionIdentity: admission.publicationAdmissionIdentity, reviewId: review.id, reviewNodeId: review.nodeId, reviewState: review.state, commitId: review.commitId, slotReceiptIdentities: slots.map((x) => x.slotReceiptIdentity) }) }
function exactRequestMatch(request: O4fPublicationRequest, comment: GithubReviewComment, reviewId: string): boolean { return comment.body === request.bodyText && comment.path === request.path && comment.line === request.lineAnchor && comment.side === "RIGHT" && comment.reviewId === reviewId && comment.commitId === request.reviewedHead }
async function scanExisting(input: NormalizedInput, options: NormalizedOptions, state: HttpState): Promise<ScanResult> {
  let reviews: readonly GithubReview[], comments: readonly GithubReviewComment[]
  try { reviews = await listReviews(input, options, state); comments = await listComments(input, options, state) } catch (error) { if (error instanceof O4gLocalError && error.code === "SCAN_BOUND") return { kind: "SCAN_BOUND_EXHAUSTED", complete: null }; if (error instanceof O4gLocalError && error.code === "INVALID_RESPONSE") return { kind: "INVALID_GITHUB_RESPONSE", complete: null }; throw error }
  const admission = input.publicationAdmission, summary = admission.publicationRequests.find((x) => x.publicationClass === "TOP_LEVEL_REVIEW_SUMMARY")!
  const inline = admission.publicationRequests.filter((x) => x.publicationClass === "INLINE_FINDING_COMMENT")
  const summaryHits = reviews.filter((x) => x.body.includes(marker(summary.publicationSlotIdentity)))
  const inlineHits = inline.map((request) => comments.filter((x) => x.body.includes(marker(request.publicationSlotIdentity))))
  if (summaryHits.length > 1 || inlineHits.some((hits) => hits.length > 1)) return { kind: "DUPLICATE_SLOT_PRESENT", complete: null }
  const any = summaryHits.length + inlineHits.reduce((n, hits) => n + hits.length, 0)
  if (any === 0) return { kind: "NONE_PRESENT", complete: null }
  if (summaryHits.length !== 1 || inlineHits.some((hits) => hits.length !== 1)) return { kind: "PARTIAL_PRESENT", complete: null }
  const review = summaryHits[0]!
  if (review.body !== summary.bodyText || review.commitId !== admission.reviewedHead || review.state !== "COMMENTED") return { kind: "MARKER_OR_BODY_MISMATCH", complete: null }
  const matchedComments = inlineHits.map((hits) => hits[0]!)
  for (let i = 0; i < inline.length; i += 1) if (!exactRequestMatch(inline[i]!, matchedComments[i]!, review.id)) return { kind: "MARKER_OR_BODY_MISMATCH", complete: null }
  const slots = [slotReceipt(summary, review, review.id), ...inline.map((request, i) => slotReceipt(request, matchedComments[i]!, review.id))]
  return deepFreeze({ kind: "COMPLETE_EXACT_PUBLICATION_PRESENT", complete: { review, comments: Object.freeze(matchedComments), slotReceipts: Object.freeze(slots), reviewReceiptIdentity: reviewReceiptIdentity(admission, review, slots) } })
}

function parseHunks(patch: string, target: number): boolean {
  const lines = patch.split("\n")
  let oldLine = 0, newLine = 0, expectedOld = 0, expectedNew = 0, seenOld = 0, seenNew = 0
  let inHunk = false, targetRight = false
  const closeHunk = (): void => {
    if (!inHunk) return
    if (seenOld !== expectedOld || seenNew !== expectedNew) throw new O4gLocalError("DIFF_ANCHOR", "diff hunk line counts do not match its header")
  }
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]!
    if (line.startsWith("@@")) {
      closeHunk()
      const match = /^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@(?: .*)?$/.exec(line)
      if (!match) throw new O4gLocalError("DIFF_ANCHOR", "diff hunk is malformed")
      oldLine = Number(match[1]); newLine = Number(match[3])
      expectedOld = match[2] === undefined ? 1 : Number(match[2]); expectedNew = match[4] === undefined ? 1 : Number(match[4])
      if (![oldLine, newLine, expectedOld, expectedNew].every(Number.isSafeInteger)) throw new O4gLocalError("DIFF_ANCHOR", "diff hunk number is unsafe")
      seenOld = 0; seenNew = 0; inHunk = true
      continue
    }
    if (!inHunk) { if (line === "" && index === lines.length - 1) continue; throw new O4gLocalError("DIFF_ANCHOR", "diff patch is malformed") }
    if (line.startsWith("\\ No newline at end of file")) continue
    if (line.startsWith("+")) { if (newLine === target) targetRight = true; newLine += 1; seenNew += 1 }
    else if (line.startsWith("-")) { oldLine += 1; seenOld += 1 }
    else if (line.startsWith(" ")) { if (newLine === target) targetRight = true; oldLine += 1; newLine += 1; seenOld += 1; seenNew += 1 }
    else if (line === "" && index === lines.length - 1) continue
    else throw new O4gLocalError("DIFF_ANCHOR", "diff patch is malformed")
    if (seenOld > expectedOld || seenNew > expectedNew) throw new O4gLocalError("DIFF_ANCHOR", "diff hunk exceeds declared line counts")
  }
  if (!inHunk) throw new O4gLocalError("DIFF_ANCHOR", "diff patch has no hunks")
  closeHunk()
  return targetRight
}
async function proveAnchors(input: NormalizedInput, options: NormalizedOptions, state: HttpState): Promise<void> {
  const inline = input.publicationAdmission.publicationRequests.filter((x) => x.publicationClass === "INLINE_FINDING_COMMENT")
  if (inline.length === 0) return
  const files = await listFiles(input, options, state), byPath = new Map<string, GithubFile[]>()
  for (const file of files) { const list = byPath.get(file.filename) ?? []; list.push(file); byPath.set(file.filename, list) }
  for (const request of inline) { const matches = byPath.get(request.path!) ?? []; if (matches.length !== 1 || matches[0]!.patch === null || !parseHunks(matches[0]!.patch!, request.lineAnchor!)) throw new O4gLocalError("DIFF_ANCHOR", "inline diff anchor cannot be proven") }
}
async function readLivePr(input: NormalizedInput, options: NormalizedOptions, state: HttpState): Promise<LivePullRequest> { return parseLivePullRequest(await getJson(prUrl(input.publicationAdmission), input, options, state)) }
function liveSubjectMatches(live: LivePullRequest, admission: O4fSafeGithubPublicationAdmissionResult): boolean { return live.id === admission.pullRequestId && live.number === admission.pullRequestNumber && live.repositoryId === admission.repositoryId && live.repositoryFullName === admission.repositoryFullName }
function requestBody(admission: O4fSafeGithubPublicationAdmissionResult): string {
  const summary = admission.publicationRequests.find((x) => x.publicationClass === "TOP_LEVEL_REVIEW_SUMMARY")!
  const comments = admission.publicationRequests.filter((x) => x.publicationClass === "INLINE_FINDING_COMMENT").map((x) => ({ body: x.bodyText, path: x.path!, line: x.lineAnchor!, side: "RIGHT" as const }))
  const body = JSON.stringify({ commit_id: admission.reviewedHead, body: summary.bodyText, event: "COMMENT", comments })
  if (Buffer.byteLength(body, "utf8") > O4G_LIMITS.maxRequestBodyUtf8Bytes) fail("publication request body exceeds bound")
  return body
}

function resultCore(input: NormalizedInput, status: O4gStatus, evaluatedHead: string | null, failureCode: O4gFailureCode | null, complete: CompletePublication | null): Omit<O4gBoundedGithubReviewPublicationResult, "publicationExecutionIdentity"> {
  const a = input.publicationAdmission, completed = status.startsWith("COMPLETED_")
  if (completed !== (complete !== null)) fail("internal completion/result mismatch")
  return {
    version: O4G_BOUNDED_GITHUB_REVIEW_PUBLICATION_VERSION, status, credentialPolicyIdentity: input.credentialPolicyIdentity,
    publicationAdmissionIdentity: a.publicationAdmissionIdentity, repositoryId: a.repositoryId, repositoryFullName: a.repositoryFullName,
    pullRequestNumber: a.pullRequestNumber, pullRequestId: a.pullRequestId, reviewedHead: a.reviewedHead, evaluatedHead,
    o4eExecutionIdentity: a.o4eExecutionIdentity, reviewId: complete?.review.id ?? null, reviewNodeId: complete?.review.nodeId ?? null,
    reviewReceiptIdentity: complete?.reviewReceiptIdentity ?? null, slotReceipts: complete?.slotReceipts ?? Object.freeze([]),
    publicationRequestCount: a.publicationRequestCount, failureCode, continuationDecision: continuation(status),
  }
}
function makeResult(input: NormalizedInput, status: O4gStatus, evaluatedHead: string | null, failureCode: O4gFailureCode | null, complete: CompletePublication | null): O4gBoundedGithubReviewPublicationResult { const core = resultCore(input, status, evaluatedHead, failureCode, complete); return deepFreeze({ ...core, publicationExecutionIdentity: digest("o4g-publication-execution-v1", core) }) }
function scanFailure(input: NormalizedInput, scan: ScanResult): O4gBoundedGithubReviewPublicationResult {
  if (scan.kind === "SCAN_BOUND_EXHAUSTED") return makeResult(input, "BLOCKED_EXISTING_PUBLICATION", null, "SCAN_BOUND_EXHAUSTED", null)
  if (scan.kind === "INVALID_GITHUB_RESPONSE") return makeResult(input, "INVALID_GITHUB_RESPONSE", null, "INVALID_RESPONSE", null)
  if (scan.kind === "DUPLICATE_SLOT_PRESENT") return makeResult(input, "BLOCKED_EXISTING_PUBLICATION", null, "EXISTING_PUBLICATION_DUPLICATE", null)
  if (scan.kind === "MARKER_OR_BODY_MISMATCH") return makeResult(input, "BLOCKED_EXISTING_PUBLICATION", null, "EXISTING_PUBLICATION_MISMATCH", null)
  return makeResult(input, "BLOCKED_EXISTING_PUBLICATION", null, "EXISTING_PUBLICATION_PARTIAL", null)
}
function readFailure(input: NormalizedInput, error: unknown, evaluatedHead: string | null = null): O4gBoundedGithubReviewPublicationResult {
  if (error instanceof O4gLocalError && error.code === "INVALID_RESPONSE") return makeResult(input, "INVALID_GITHUB_RESPONSE", evaluatedHead, "INVALID_RESPONSE", null)
  if (error instanceof O4gLocalError && error.code === "SCAN_BOUND") return makeResult(input, "READ_FAILED", evaluatedHead, "SCAN_BOUND_EXHAUSTED", null)
  if (error instanceof O4gLocalError && error.code === "READ_HTTP") return makeResult(input, "READ_FAILED", evaluatedHead, "READ_HTTP_REJECTED", null)
  return makeResult(input, "READ_FAILED", evaluatedHead, "READ_TRANSPORT_FAILED", null)
}

export async function publishO4gBoundedGithubReview(rawInput: unknown, rawOptions?: unknown): Promise<O4gBoundedGithubReviewPublicationResult> {
  const input = normalizeInput(rawInput), options = normalizeOptions(rawOptions), state: HttpState = { requests: 0, posts: 0, readBytes: 0 }, admission = input.publicationAdmission
  if (admission.status !== "READY" || admission.continuationDecision !== O4F_READY_DECISION) return makeResult(input, "BLOCKED_O4F_NOT_READY", null, "O4F_NOT_READY", null)
  if (admission.publicationRequests.filter((x) => x.publicationClass === "TOP_LEVEL_REVIEW_SUMMARY").length !== 1) fail("READY O4-F admission must contain exactly one summary request")
  let scan: ScanResult
  try { scan = await scanExisting(input, options, state) } catch (error) { return readFailure(input, error) }
  if (scan.kind === "COMPLETE_EXACT_PUBLICATION_PRESENT") {
    let observed: LivePullRequest
    try { observed = await readLivePr(input, options, state) } catch (error) { return readFailure(input, error) }
    if (!liveSubjectMatches(observed, admission)) return makeResult(input, "INVALID_GITHUB_RESPONSE", observed.headSha, "LIVE_PR_IDENTITY_MISMATCH", null)
    return makeResult(input, "COMPLETED_ALREADY_PRESENT", observed.headSha, null, scan.complete)
  }
  if (scan.kind !== "NONE_PRESENT") return scanFailure(input, scan)
  let live: LivePullRequest
  try { live = await readLivePr(input, options, state) } catch (error) { return readFailure(input, error) }
  if (!liveSubjectMatches(live, admission)) return makeResult(input, "INVALID_GITHUB_RESPONSE", live.headSha, "LIVE_PR_IDENTITY_MISMATCH", null)
  if (live.headSha !== admission.reviewedHead) return makeResult(input, "BLOCKED_HEAD_MISMATCH", live.headSha, "LIVE_HEAD_MISMATCH", null)
  try { await proveAnchors(input, options, state) } catch (error) { if (error instanceof O4gLocalError && error.code === "DIFF_ANCHOR") return makeResult(input, "BLOCKED_DIFF_ANCHOR", live.headSha, "DIFF_ANCHOR_UNPROVEN", null); return readFailure(input, error, live.headSha) }
  const body = requestBody(admission)
  let finalLive: LivePullRequest
  try { finalLive = await readLivePr(input, options, state) } catch (error) { return readFailure(input, error, live.headSha) }
  if (!liveSubjectMatches(finalLive, admission)) return makeResult(input, "INVALID_GITHUB_RESPONSE", finalLive.headSha, "LIVE_PR_IDENTITY_MISMATCH", null)
  if (finalLive.headSha !== admission.reviewedHead) return makeResult(input, "BLOCKED_HEAD_MISMATCH", finalLive.headSha, "LIVE_HEAD_MISMATCH", null)
  const outcome = await postReview(body, input, options, state)
  let recovered: ScanResult
  try { recovered = await scanExisting(input, options, state) } catch { return makeResult(input, "AMBIGUOUS_POST_OUTCOME", finalLive.headSha, "POST_OUTCOME_UNCONFIRMED", null) }
  if (recovered.kind === "COMPLETE_EXACT_PUBLICATION_PRESENT") {
    const c = recovered.complete!
    const confirmed = outcome.kind === "CONFIRMED" && outcome.review !== null && outcome.review.id === c.review.id && outcome.review.nodeId === c.review.nodeId && outcome.review.commitId === admission.reviewedHead && outcome.review.state === "COMMENTED" && outcome.review.body === admission.publicationRequests[0]!.bodyText
    return makeResult(input, confirmed ? "COMPLETED_CREATED" : "COMPLETED_RECOVERED_AFTER_UNCONFIRMED_POST", admission.reviewedHead, null, c)
  }
  if (outcome.kind === "REJECTED") return makeResult(input, "POST_REJECTED", finalLive.headSha, "POST_HTTP_REJECTED", null)
  return makeResult(input, "AMBIGUOUS_POST_OUTCOME", finalLive.headSha, outcome.kind === "CONFIRMED" ? "READBACK_UNCONFIRMED" : "POST_OUTCOME_UNCONFIRMED", null)
}

function normalizeSlot(raw: unknown, index: number): O4gSlotReceipt {
  const r = exactRecord(raw, SLOT_KEYS, `result.slotReceipts[${index}]`)
  const publicationClass: O4gPublicationClass = r.publicationClass === "TOP_LEVEL_REVIEW_SUMMARY" || r.publicationClass === "INLINE_FINDING_COMMENT" ? r.publicationClass : fail("slot publicationClass unsupported")
  const githubObjectKind: O4gGithubObjectKind = r.githubObjectKind === "PULL_REQUEST_REVIEW" || r.githubObjectKind === "PULL_REQUEST_REVIEW_COMMENT" ? r.githubObjectKind : fail("slot githubObjectKind unsupported")
  const path = r.path === null ? null : repositoryPath(r.path, "slot.path"), line = r.line === null ? null : integer(r.line, "slot.line", 1, 10_000_000), side = r.side === null ? null : r.side === "RIGHT" ? "RIGHT" as const : fail("slot.side unsupported")
  if (publicationClass === "TOP_LEVEL_REVIEW_SUMMARY" && (githubObjectKind !== "PULL_REQUEST_REVIEW" || path !== null || line !== null || side !== null)) fail("summary slot shape mismatch")
  if (publicationClass === "INLINE_FINDING_COMMENT" && (githubObjectKind !== "PULL_REQUEST_REVIEW_COMMENT" || path === null || line === null || side !== "RIGHT")) fail("inline slot shape mismatch")
  const core = { publicationSlotIdentity: sha256(r.publicationSlotIdentity, "slot.publicationSlotIdentity"), publicationRequestIdentity: sha256(r.publicationRequestIdentity, "slot.publicationRequestIdentity"), publicationClass, bodyIdentity: sha256(r.bodyIdentity, "slot.bodyIdentity"), githubObjectKind, githubObjectId: decimalId(r.githubObjectId, "slot.githubObjectId"), githubNodeId: nonEmptyText(r.githubNodeId, "slot.githubNodeId", 512), pullRequestReviewId: decimalId(r.pullRequestReviewId, "slot.pullRequestReviewId"), commitId: sha1(r.commitId, "slot.commitId"), path, line, side }
  const identity = sha256(r.slotReceiptIdentity, "slot.slotReceiptIdentity"), expected = digest("o4g-slot-receipt-v1", core); if (identity !== expected) fail("slot receipt identity mismatch"); return deepFreeze({ ...core, slotReceiptIdentity: expected })
}

export function validateO4gBoundedGithubReviewPublicationResult(raw: unknown): O4gBoundedGithubReviewPublicationResult {
  const r = exactRecord(raw, RESULT_KEYS, "result")
  if (r.version !== O4G_BOUNDED_GITHUB_REVIEW_PUBLICATION_VERSION) fail("result version mismatch")
  const status = nonEmptyText(r.status, "result.status", 64) as O4gStatus; if (!STATUS.has(status)) fail("result status unsupported")
  const continuationDecision = nonEmptyText(r.continuationDecision, "result.continuationDecision", 64) as O4gContinuationDecision; if (!DECISIONS.has(continuationDecision) || continuationDecision !== continuation(status)) fail("result continuation mismatch")
  const failureCode = r.failureCode === null ? null : nonEmptyText(r.failureCode, "result.failureCode", 64) as O4gFailureCode; if (failureCode !== null && !FAILURES.has(failureCode)) fail("result failureCode unsupported")
  const evaluatedHead = r.evaluatedHead === null ? null : sha1(r.evaluatedHead, "result.evaluatedHead")
  if (!Array.isArray(r.slotReceipts) || r.slotReceipts.length > 65) fail("result slotReceipts must be bounded")
  const slots = r.slotReceipts.map(normalizeSlot)
  const reviewId = r.reviewId === null ? null : decimalId(r.reviewId, "result.reviewId"), reviewNodeId = r.reviewNodeId === null ? null : nonEmptyText(r.reviewNodeId, "result.reviewNodeId", 512), reviewReceipt = r.reviewReceiptIdentity === null ? null : sha256(r.reviewReceiptIdentity, "result.reviewReceiptIdentity")
  const core: Omit<O4gBoundedGithubReviewPublicationResult, "publicationExecutionIdentity"> = {
    version: O4G_BOUNDED_GITHUB_REVIEW_PUBLICATION_VERSION, status, credentialPolicyIdentity: sha256(r.credentialPolicyIdentity, "result.credentialPolicyIdentity"), publicationAdmissionIdentity: sha256(r.publicationAdmissionIdentity, "result.publicationAdmissionIdentity"), repositoryId: decimalId(r.repositoryId, "result.repositoryId"), repositoryFullName: repository(r.repositoryFullName, "result.repositoryFullName"), pullRequestNumber: integer(r.pullRequestNumber, "result.pullRequestNumber", 1, Number.MAX_SAFE_INTEGER), pullRequestId: decimalId(r.pullRequestId, "result.pullRequestId"), reviewedHead: sha1(r.reviewedHead, "result.reviewedHead"), evaluatedHead, o4eExecutionIdentity: sha256(r.o4eExecutionIdentity, "result.o4eExecutionIdentity"), reviewId, reviewNodeId, reviewReceiptIdentity: reviewReceipt, slotReceipts: Object.freeze(slots), publicationRequestCount: integer(r.publicationRequestCount, "result.publicationRequestCount", 0, 65), failureCode, continuationDecision,
  }
  const completed = status.startsWith("COMPLETED_")
  if (completed) { if (failureCode !== null || evaluatedHead === null || reviewId === null || reviewNodeId === null || reviewReceipt === null || slots.length !== core.publicationRequestCount || slots.length < 1 || slots[0]!.githubObjectKind !== "PULL_REQUEST_REVIEW" || slots.some((x) => x.pullRequestReviewId !== reviewId || x.commitId !== core.reviewedHead)) fail("completed result shape mismatch"); if (status !== "COMPLETED_ALREADY_PRESENT" && evaluatedHead !== core.reviewedHead) fail("newly-created completion requires exact evaluated head"); const expectedReceipt = digest("o4g-review-receipt-v1", { publicationAdmissionIdentity: core.publicationAdmissionIdentity, reviewId, reviewNodeId, reviewState: "COMMENTED", commitId: core.reviewedHead, slotReceiptIdentities: slots.map((x) => x.slotReceiptIdentity) }); if (reviewReceipt !== expectedReceipt) fail("review receipt identity mismatch") } else if (failureCode === null || reviewId !== null || reviewNodeId !== null || reviewReceipt !== null || slots.length !== 0) fail("non-completed result shape mismatch")
  const identity = sha256(r.publicationExecutionIdentity, "result.publicationExecutionIdentity"), expected = digest("o4g-publication-execution-v1", core); if (identity !== expected) fail("publication execution identity mismatch")
  return deepFreeze({ ...core, publicationExecutionIdentity: expected })
}
