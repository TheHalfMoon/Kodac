import { createHash } from "node:crypto"
import { types } from "node:util"

import {
  validateO4cGithubReviewerContextResult,
  type O4cGithubReviewerContextResult,
} from "./o4c-github-context-to-reviewer-context.ts"
import {
  O4D_READY_DECISION,
  validateO4dO4cReviewerExecutionAdmissionResult,
  type O4dO4cReviewerExecutionAdmissionResult,
} from "./o4d-o4c-reviewer-execution-admission.ts"
import {
  validateO4eModelBackedReviewerProviderExecutionResult,
  type O4eModelBackedReviewerProviderExecutionResult,
  type O4eReviewerClaim,
} from "./o4e-model-backed-reviewer-provider-execution.ts"

export const O4F_SAFE_GITHUB_PUBLICATION_ADMISSION_VERSION = "kodac-o4f-safe-github-publication-admission-v1" as const
export const O4F_PUBLICATION_CLASSES = Object.freeze(["TOP_LEVEL_REVIEW_SUMMARY", "INLINE_FINDING_COMMENT"] as const)
export const O4F_STATUSES = Object.freeze([
  "READY",
  "BLOCK_PREDECESSOR_NOT_READY",
  "BLOCK_LINEAGE_OR_IDENTITY_MISMATCH",
  "BLOCK_PUBLICATION_BODY_BUDGET",
  "BLOCK_PUBLICATION_REQUEST_CONSTRUCTION",
] as const)
export const O4F_READY_DECISION = "READY_FOR_SEPARATELY_AUTHORIZED_GITHUB_PUBLICATION" as const
export const O4F_CONTINUATION_DECISIONS = Object.freeze([
  O4F_READY_DECISION,
  "BLOCK_PREDECESSOR_NOT_READY",
  "BLOCK_LINEAGE_OR_IDENTITY_MISMATCH",
  "BLOCK_PUBLICATION_BODY_BUDGET",
  "BLOCK_PUBLICATION_REQUEST_CONSTRUCTION",
] as const)
export const O4F_LIMITS = Object.freeze({
  maxPublicationRequests: 65,
  maxSummaryBodyUtf8Bytes: 65_536,
  maxInlineBodyUtf8Bytes: 16_384,
  maxPathUtf8Bytes: 1_024,
  maxClaimRenderingUtf8Bytes: 12_288,
  maxRepositoryFullNameUtf8Bytes: 201,
  maxTaskIdUtf8Bytes: 128,
  maxPolicyIdentityUtf8Bytes: 128,
  maxGraphDepth: 32,
  maxGraphNodes: 32_768,
})

export type O4fPublicationClass = (typeof O4F_PUBLICATION_CLASSES)[number]
export type O4fStatus = (typeof O4F_STATUSES)[number]
export type O4fContinuationDecision = (typeof O4F_CONTINUATION_DECISIONS)[number]

export interface O4fSafeGithubPublicationAdmissionInput {
  readonly o4cContext: O4cGithubReviewerContextResult
  readonly o4dAdmission: O4dO4cReviewerExecutionAdmissionResult
  readonly o4eExecution: O4eModelBackedReviewerProviderExecutionResult
}

export interface O4fPublicationRequest {
  readonly publicationRequestIdentity: string
  readonly publicationSlotIdentity: string
  readonly publicationClass: O4fPublicationClass
  readonly repositoryId: string
  readonly repositoryFullName: string
  readonly pullRequestNumber: number
  readonly reviewedHead: string
  readonly o4eExecutionIdentity: string
  readonly bodyText: string
  readonly bodyIdentity: string
  readonly bodyByteLength: number
  readonly claimIdentity: string | null
  readonly path: string | null
  readonly lineAnchor: number | null
  readonly sideHint: "RIGHT" | null
  readonly requiresDiffAnchorPreflight: boolean
}

export interface O4fSafeGithubPublicationAdmissionResult {
  readonly version: typeof O4F_SAFE_GITHUB_PUBLICATION_ADMISSION_VERSION
  readonly publicationAdmissionIdentity: string
  readonly status: O4fStatus
  readonly repositoryId: string
  readonly repositoryFullName: string
  readonly pullRequestNumber: number
  readonly pullRequestId: string
  readonly canonicalBase: string
  readonly reviewedHead: string
  readonly o4cContextIdentity: string
  readonly o4dAdmissionIdentity: string
  readonly o4eExecutionIdentity: string
  readonly taskId: string
  readonly policyIdentity: string
  readonly changedPathSetIdentity: string
  readonly publicationRequestCount: number
  readonly publicationRequests: readonly O4fPublicationRequest[]
  readonly continuationDecision: O4fContinuationDecision
}

type UnknownRecord = Record<string, unknown>
const SHA1 = /^[0-9a-f]{40}$/
const SHA256 = /^[0-9a-f]{64}$/
const DECIMAL_ID = /^(?:[1-9][0-9]{0,19})$/
const REPOSITORY = /^[A-Za-z0-9_.-]{1,100}\/[A-Za-z0-9_.-]{1,100}$/
const INPUT_KEYS = ["o4cContext", "o4dAdmission", "o4eExecution"] as const
export const O4F_PUBLICATION_REQUEST_KEYS = Object.freeze([
  "publicationRequestIdentity", "publicationSlotIdentity", "publicationClass", "repositoryId", "repositoryFullName",
  "pullRequestNumber", "reviewedHead", "o4eExecutionIdentity", "bodyText", "bodyIdentity", "bodyByteLength",
  "claimIdentity", "path", "lineAnchor", "sideHint", "requiresDiffAnchorPreflight",
] as const)
export const O4F_RESULT_KEYS = Object.freeze([
  "version", "publicationAdmissionIdentity", "status", "repositoryId", "repositoryFullName", "pullRequestNumber",
  "pullRequestId", "canonicalBase", "reviewedHead", "o4cContextIdentity", "o4dAdmissionIdentity", "o4eExecutionIdentity",
  "taskId", "policyIdentity", "changedPathSetIdentity", "publicationRequestCount", "publicationRequests", "continuationDecision",
] as const)
const STATUS = new Set<string>(O4F_STATUSES)
const CLASSES = new Set<string>(O4F_PUBLICATION_CLASSES)
const DECISIONS = new Set<string>(O4F_CONTINUATION_DECISIONS)

function fail(message: string): never { throw new Error(`O4-F publication admission blocked: ${message}`) }
function cmp(a: string, b: string): number { return a < b ? -1 : a > b ? 1 : 0 }
function compareUtf8(a: string, b: string): number { return Buffer.compare(Buffer.from(a, "utf8"), Buffer.from(b, "utf8")) }
function canonical(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`
  const record = value as UnknownRecord
  return `{${Object.keys(record).sort(cmp).map((key) => `${JSON.stringify(key)}:${canonical(record[key])}`).join(",")}}`
}
function digest(domain: string, value: unknown): string {
  return createHash("sha256").update(domain, "utf8").update("\0", "utf8").update(canonical(value), "utf8").digest("hex")
}
function bytesDigest(value: string): string { return createHash("sha256").update(value, "utf8").digest("hex") }
function deepFreeze<T>(value: T, seen = new WeakSet<object>()): T {
  if (typeof value !== "object" || value === null || seen.has(value as object)) return value
  seen.add(value as object)
  for (const child of Object.values(value as UnknownRecord)) deepFreeze(child, seen)
  return Object.freeze(value)
}
function assertSafeGraph(value: unknown, label: string): void {
  const seen = new WeakSet<object>(); let nodes = 0
  const visit = (item: unknown, depth: number, path: string): void => {
    if (typeof item !== "object" || item === null) return
    if (depth > O4F_LIMITS.maxGraphDepth) fail(`${label} exceeds graph depth at ${path}`)
    if (types.isProxy(item)) fail(`${label} contains a proxy at ${path}`)
    if (seen.has(item)) fail(`${label} contains a cyclic or aliased object graph at ${path}`)
    seen.add(item); nodes += 1; if (nodes > O4F_LIMITS.maxGraphNodes) fail(`${label} exceeds graph node bound`)
    const proto = Object.getPrototypeOf(item)
    if (Array.isArray(item)) {
      if (proto !== Array.prototype) fail(`${label} contains an unexpected array prototype at ${path}`)
      const descriptors = Object.getOwnPropertyDescriptors(item)
      const expected = new Set(["length", ...Array.from({ length: item.length }, (_u, i) => String(i))])
      for (const name of Object.keys(descriptors)) if (!expected.has(name)) fail(`${label} contains an unexpected array property at ${path}.${name}`)
      for (let i = 0; i < item.length; i += 1) {
        const d = descriptors[String(i)]; if (!d || !("value" in d) || d.get !== undefined || d.set !== undefined) fail(`${label} contains a sparse/accessor array at ${path}`)
        visit(d.value, depth + 1, `${path}[${i}]`)
      }
    } else {
      if (proto !== Object.prototype && proto !== null) fail(`${label} contains an unexpected object prototype at ${path}`)
      if (Object.getOwnPropertySymbols(item).length) fail(`${label} contains symbol keys at ${path}`)
      for (const [name, d] of Object.entries(Object.getOwnPropertyDescriptors(item))) {
        if (!("value" in d) || d.get !== undefined || d.set !== undefined) fail(`${label} contains an accessor at ${path}.${name}`)
        visit(d.value, depth + 1, `${path}.${name}`)
      }
    }
  }
  visit(value, 0, label)
}
function ownExactRecord(value: unknown, keys: readonly string[], label: string): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value) || types.isProxy(value)) fail(`${label} must be a non-proxy plain object`)
  const proto = Object.getPrototypeOf(value); if (proto !== Object.prototype && proto !== null) fail(`${label} must have a plain-object prototype`)
  if (Object.getOwnPropertySymbols(value).length) fail(`${label} must not contain symbol keys`)
  const descriptors = Object.getOwnPropertyDescriptors(value); const names = Object.keys(descriptors)
  if (names.length !== keys.length || keys.some((key) => !(key in descriptors))) fail(`${label} has unexpected or missing properties`)
  for (const name of names) {
    if (!keys.includes(name)) fail(`${label} has unexpected or missing properties`)
    const d = descriptors[name]!; if (!("value" in d) || d.get !== undefined || d.set !== undefined) fail(`${label}.${name} must be a data property`)
  }
  return value as UnknownRecord
}
function assertUnicodeScalars(value: string, label: string): void {
  for (let i = 0; i < value.length; i += 1) {
    const c = value.charCodeAt(i)
    if (c >= 0xd800 && c <= 0xdbff) { const n = value.charCodeAt(i + 1); if (!(n >= 0xdc00 && n <= 0xdfff)) fail(`${label} must contain only Unicode scalar values`); i += 1 }
    else if (c >= 0xdc00 && c <= 0xdfff) fail(`${label} must contain only Unicode scalar values`)
  }
}
function text(value: unknown, label: string, maxBytes: number, allowEmpty = false): string {
  if (typeof value !== "string" || (!allowEmpty && value.length === 0) || value.includes("\0")) fail(`${label} must be bounded NUL-free text`)
  assertUnicodeScalars(value, label); if (Buffer.byteLength(value, "utf8") > maxBytes) fail(`${label} exceeds UTF-8 byte bound`); return value
}
function sha1(value: unknown, label: string): string { const v = text(value, label, 40); if (!SHA1.test(v)) fail(`${label} must be lowercase 40-hex`); return v }
function sha256(value: unknown, label: string): string { const v = text(value, label, 64); if (!SHA256.test(v)) fail(`${label} must be lowercase SHA-256`); return v }
function decimalId(value: unknown, label: string): string { const v = text(value, label, 20); if (!DECIMAL_ID.test(v)) fail(`${label} must be a positive decimal id`); return v }
function repositoryName(value: unknown, label: string): string { const v = text(value, label, O4F_LIMITS.maxRepositoryFullNameUtf8Bytes); if (!REPOSITORY.test(v)) fail(`${label} must be owner/name`); return v }
function integer(value: unknown, label: string, min: number, max: number): number { if (typeof value !== "number" || !Number.isSafeInteger(value) || value < min || value > max) fail(`${label} must be a bounded safe integer`); return value }
function repositoryPath(value: unknown, label: string): string {
  const v = text(value, label, O4F_LIMITS.maxPathUtf8Bytes)
  if (v.startsWith("/") || v.includes("\\") || /^[A-Za-z]:\//.test(v) || v.split("/").some((part) => !part || part === "." || part === "..")) fail(`${label} must be a repository-relative POSIX path`)
  return v
}
function exactStrings(a: readonly string[], b: readonly string[]): boolean { return a.length === b.length && a.every((v, i) => v === b[i]) }
const MARKDOWN_INERT_ENTITIES: Readonly<Record<string, string>> = Object.freeze({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "@": "&#64;", "`": "&#96;", "\\": "&#92;",
  "[": "&#91;", "]": "&#93;", "(": "&#40;", ")": "&#41;", "*": "&#42;", "_": "&#95;",
  "#": "&#35;", "!": "&#33;", "|": "&#124;", "~": "&#126;",
})
function escaped(value: string): string { return Array.from(value, (char) => MARKDOWN_INERT_ENTITIES[char] ?? char).join("") }
function marker(slot: string): string { return `<!-- kodac-publication-slot:${slot} -->` }
function markerCount(body: string): number { return (body.match(/<!-- kodac-publication-slot:[0-9a-f]{64} -->/g) ?? []).length }

function claimIdentity(claim: O4eReviewerClaim): string {
  return digest("o4f-normalized-claim-identity", {
    claimKey: claim.claimKey, path: claim.path, range: claim.range ?? null, summary: claim.summary,
    contractClaim: claim.contractClaim, category: claim.category, severity: claim.severity,
    confidenceBps: claim.confidenceBps, evidenceItemIds: [...claim.evidenceItemIds],
  })
}
function slotIdentity(input: {
  publicationClass: O4fPublicationClass; repositoryId: string; pullRequestNumber: number; reviewedHead: string;
  o4eExecutionIdentity: string; claimIdentity: string | null; path: string | null; lineAnchor: number | null
}): string { return digest("o4f-publication-slot-identity", input) }
function requestIdentity(input: Omit<O4fPublicationRequest, "publicationRequestIdentity" | "bodyText" | "repositoryFullName">): string {
  return digest("o4f-publication-request-identity", input)
}
function continuationFor(status: O4fStatus): O4fContinuationDecision {
  if (status === "READY") return O4F_READY_DECISION
  return status
}
function resultIdentity(input: Omit<O4fSafeGithubPublicationAdmissionResult, "publicationAdmissionIdentity">): string {
  return digest("o4f-safe-github-publication-admission-identity", input)
}
function blockedResult(
  status: Exclude<O4fStatus, "READY">,
  c: O4cGithubReviewerContextResult,
  d: O4dO4cReviewerExecutionAdmissionResult,
  e: O4eModelBackedReviewerProviderExecutionResult,
): O4fSafeGithubPublicationAdmissionResult {
  const base: Omit<O4fSafeGithubPublicationAdmissionResult, "publicationAdmissionIdentity"> = {
    version: O4F_SAFE_GITHUB_PUBLICATION_ADMISSION_VERSION, status, repositoryId: c.repositoryId,
    repositoryFullName: c.repositoryFullName, pullRequestNumber: c.pullRequestNumber, pullRequestId: c.pullRequestId,
    canonicalBase: c.canonicalBase, reviewedHead: c.reviewedHead, o4cContextIdentity: c.contextIdentity,
    o4dAdmissionIdentity: d.admissionIdentity, o4eExecutionIdentity: e.executionIdentity, taskId: c.taskId,
    policyIdentity: d.policyIdentity, changedPathSetIdentity: c.changedPathSetIdentity, publicationRequestCount: 0,
    publicationRequests: Object.freeze([]), continuationDecision: continuationFor(status),
  }
  return deepFreeze({ ...base, publicationAdmissionIdentity: resultIdentity(base) })
}

function makeRequest(input: {
  publicationClass: O4fPublicationClass; c: O4cGithubReviewerContextResult; e: O4eModelBackedReviewerProviderExecutionResult;
  claimIdentity: string | null; path: string | null; lineAnchor: number | null; bodyWithoutMarker: string;
}): O4fPublicationRequest {
  const publicationSlotIdentity = slotIdentity({ publicationClass: input.publicationClass, repositoryId: input.c.repositoryId,
    pullRequestNumber: input.c.pullRequestNumber, reviewedHead: input.c.reviewedHead, o4eExecutionIdentity: input.e.executionIdentity,
    claimIdentity: input.claimIdentity, path: input.path, lineAnchor: input.lineAnchor })
  const bodyText = `${input.bodyWithoutMarker}\n\n${marker(publicationSlotIdentity)}`
  if (markerCount(bodyText) !== 1) fail("publication body marker accounting mismatch")
  const bodyByteLength = Buffer.byteLength(bodyText, "utf8")
  const bodyIdentity = bytesDigest(bodyText)
  const sideHint = input.publicationClass === "INLINE_FINDING_COMMENT" ? "RIGHT" as const : null
  const requiresDiffAnchorPreflight = input.publicationClass === "INLINE_FINDING_COMMENT"
  const identityInput = {
    publicationSlotIdentity, publicationClass: input.publicationClass, repositoryId: input.c.repositoryId,
    pullRequestNumber: input.c.pullRequestNumber, reviewedHead: input.c.reviewedHead, o4eExecutionIdentity: input.e.executionIdentity,
    bodyIdentity, bodyByteLength, claimIdentity: input.claimIdentity, path: input.path, lineAnchor: input.lineAnchor,
    sideHint, requiresDiffAnchorPreflight,
  }
  return deepFreeze({ ...identityInput, repositoryFullName: input.c.repositoryFullName, bodyText,
    publicationRequestIdentity: requestIdentity(identityInput) })
}
function renderSummary(c: O4cGithubReviewerContextResult, e: O4eModelBackedReviewerProviderExecutionResult, ids: readonly string[]): string {
  const lines = [
    "## Kodac review summary", "", `Reviewed head: \`${c.reviewedHead}\``, `Provider: ${escaped(e.providerName)}`,
    `Model: ${escaped(e.model)}`, `Accepted claims: ${e.acceptedClaimCount}`, "", "### Findings",
  ]
  if (e.claims.length === 0) lines.push("", "No material evidence-bound findings were accepted.")
  else for (let i = 0; i < e.claims.length; i += 1) {
    const claim = e.claims[i]!, id = ids[i]!
    const range = claim.range ? `:${claim.range.startLine}-${claim.range.endLine}` : ""
    lines.push("", `- **${escaped(claim.severity)}** \`${escaped(claim.path)}${range}\` — ${escaped(claim.summary)} (claim \`${id}\`)`)
  }
  return lines.join("\n")
}
function renderInline(claim: O4eReviewerClaim, id: string, lineAnchor: number): string {
  return [
    `**${escaped(claim.severity.toUpperCase())} · ${escaped(claim.category)}**`, "",
    `Summary: ${escaped(claim.summary)}`, "", `Contract claim: ${escaped(claim.contractClaim)}`, "",
    `Path: \`${escaped(claim.path)}\``, `Line anchor: ${lineAnchor}`, `Claim identity: \`${id}\``,
  ].join("\n")
}
function requestOrder(a: O4fPublicationRequest, b: O4fPublicationRequest): number {
  if (a.publicationClass !== b.publicationClass) return a.publicationClass === "TOP_LEVEL_REVIEW_SUMMARY" ? -1 : 1
  return compareUtf8(a.path ?? "", b.path ?? "") || (a.lineAnchor ?? 0) - (b.lineAnchor ?? 0) || cmp(a.claimIdentity ?? "", b.claimIdentity ?? "") || cmp(a.publicationRequestIdentity, b.publicationRequestIdentity)
}

export function createO4fSafeGithubPublicationAdmission(raw: unknown): O4fSafeGithubPublicationAdmissionResult {
  assertSafeGraph(raw, "input")
  const r = ownExactRecord(raw, INPUT_KEYS, "input")
  let c: O4cGithubReviewerContextResult, d: O4dO4cReviewerExecutionAdmissionResult, e: O4eModelBackedReviewerProviderExecutionResult
  try { c = validateO4cGithubReviewerContextResult(r.o4cContext) } catch (error) { fail(`invalid O4-C context: ${error instanceof Error ? error.message : "unknown validation failure"}`) }
  try { d = validateO4dO4cReviewerExecutionAdmissionResult(r.o4dAdmission) } catch (error) { fail(`invalid O4-D admission: ${error instanceof Error ? error.message : "unknown validation failure"}`) }
  try { e = validateO4eModelBackedReviewerProviderExecutionResult(r.o4eExecution) } catch (error) { fail(`invalid O4-E execution: ${error instanceof Error ? error.message : "unknown validation failure"}`) }

  const lineageMismatch = d.contextIdentity !== c.contextIdentity || d.taskId !== c.taskId || d.canonicalBase !== c.canonicalBase
    || d.reviewedHead !== c.reviewedHead || d.changedPathSetIdentity !== c.changedPathSetIdentity || !exactStrings(d.changedPaths, c.changedPaths)
    || e.admissionIdentity !== d.admissionIdentity || e.taskId !== d.taskId || e.policyIdentity !== d.policyIdentity
    || e.canonicalBase !== d.canonicalBase || e.reviewedHead !== d.reviewedHead || e.instructionsIdentity !== d.instructionsIdentity
  if (lineageMismatch) return blockedResult("BLOCK_LINEAGE_OR_IDENTITY_MISMATCH", c, d, e)
  if (c.continuationDecision !== "READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_EXECUTION" || d.continuationDecision !== O4D_READY_DECISION
    || e.status !== "COMPLETED" || e.failureCode !== null || e.evaluatedHead !== e.reviewedHead) return blockedResult("BLOCK_PREDECESSOR_NOT_READY", c, d, e)

  const itemById = new Map(d.items.map((item) => [item.itemId, item]))
  const ids = e.claims.map(claimIdentity)
  if (new Set(ids).size !== ids.length) return blockedResult("BLOCK_PUBLICATION_REQUEST_CONSTRUCTION", c, d, e)
  for (const claim of e.claims) {
    if (!d.changedPaths.includes(claim.path)) return blockedResult("BLOCK_PUBLICATION_REQUEST_CONSTRUCTION", c, d, e)
    const evidence = claim.evidenceItemIds.map((id) => itemById.get(id))
    if (evidence.some((item) => item === undefined) || !evidence.some((item) => item?.subjectPath === claim.path)) return blockedResult("BLOCK_PUBLICATION_REQUEST_CONSTRUCTION", c, d, e)
  }

  const summaryBase = renderSummary(c, e, ids)
  const summaryRequest = makeRequest({ publicationClass: "TOP_LEVEL_REVIEW_SUMMARY", c, e, claimIdentity: null, path: null, lineAnchor: null, bodyWithoutMarker: summaryBase })
  if (summaryRequest.bodyByteLength > O4F_LIMITS.maxSummaryBodyUtf8Bytes) return blockedResult("BLOCK_PUBLICATION_BODY_BUDGET", c, d, e)
  const requests: O4fPublicationRequest[] = [summaryRequest]
  for (let i = 0; i < e.claims.length; i += 1) {
    const claim = e.claims[i]!, id = ids[i]!
    if (!claim.range) continue
    const lineAnchor = claim.range.startLine
    const inlineBase = renderInline(claim, id, lineAnchor)
    if (Buffer.byteLength(inlineBase, "utf8") > O4F_LIMITS.maxClaimRenderingUtf8Bytes) return blockedResult("BLOCK_PUBLICATION_BODY_BUDGET", c, d, e)
    const inlineRequest = makeRequest({ publicationClass: "INLINE_FINDING_COMMENT", c, e, claimIdentity: id, path: claim.path, lineAnchor, bodyWithoutMarker: inlineBase })
    if (inlineRequest.bodyByteLength > O4F_LIMITS.maxInlineBodyUtf8Bytes) return blockedResult("BLOCK_PUBLICATION_BODY_BUDGET", c, d, e)
    requests.push(inlineRequest)
  }
  if (requests.length > O4F_LIMITS.maxPublicationRequests) return blockedResult("BLOCK_PUBLICATION_REQUEST_CONSTRUCTION", c, d, e)
  requests.sort(requestOrder)
  if (new Set(requests.map((x) => x.publicationSlotIdentity)).size !== requests.length || new Set(requests.map((x) => x.publicationRequestIdentity)).size !== requests.length) return blockedResult("BLOCK_PUBLICATION_REQUEST_CONSTRUCTION", c, d, e)
  const base: Omit<O4fSafeGithubPublicationAdmissionResult, "publicationAdmissionIdentity"> = {
    version: O4F_SAFE_GITHUB_PUBLICATION_ADMISSION_VERSION, status: "READY", repositoryId: c.repositoryId,
    repositoryFullName: c.repositoryFullName, pullRequestNumber: c.pullRequestNumber, pullRequestId: c.pullRequestId,
    canonicalBase: c.canonicalBase, reviewedHead: c.reviewedHead, o4cContextIdentity: c.contextIdentity,
    o4dAdmissionIdentity: d.admissionIdentity, o4eExecutionIdentity: e.executionIdentity, taskId: c.taskId,
    policyIdentity: d.policyIdentity, changedPathSetIdentity: c.changedPathSetIdentity, publicationRequestCount: requests.length,
    publicationRequests: Object.freeze(requests), continuationDecision: O4F_READY_DECISION,
  }
  return deepFreeze({ ...base, publicationAdmissionIdentity: resultIdentity(base) })
}

function normalizeRequest(raw: unknown, index: number): O4fPublicationRequest {
  const r = ownExactRecord(raw, O4F_PUBLICATION_REQUEST_KEYS, `result.publicationRequests[${index}]`)
  const publicationClass = text(r.publicationClass, "request.publicationClass", 32) as O4fPublicationClass
  if (!CLASSES.has(publicationClass)) fail("request publication class unsupported")
  const repositoryId = decimalId(r.repositoryId, "request.repositoryId")
  const repositoryFullName = repositoryName(r.repositoryFullName, "request.repositoryFullName")
  const pullRequestNumber = integer(r.pullRequestNumber, "request.pullRequestNumber", 1, Number.MAX_SAFE_INTEGER)
  const reviewedHead = sha1(r.reviewedHead, "request.reviewedHead")
  const o4eExecutionIdentity = sha256(r.o4eExecutionIdentity, "request.o4eExecutionIdentity")
  const claimId = r.claimIdentity === null ? null : sha256(r.claimIdentity, "request.claimIdentity")
  const path = r.path === null ? null : repositoryPath(r.path, "request.path")
  const lineAnchor = r.lineAnchor === null ? null : integer(r.lineAnchor, "request.lineAnchor", 1, 10_000_000)
  const sideHint = r.sideHint === null ? null : r.sideHint === "RIGHT" ? "RIGHT" as const : fail("request sideHint unsupported")
  if (typeof r.requiresDiffAnchorPreflight !== "boolean") fail("request requiresDiffAnchorPreflight must be boolean")
  const requiresDiffAnchorPreflight = r.requiresDiffAnchorPreflight
  if (publicationClass === "TOP_LEVEL_REVIEW_SUMMARY") {
    if (claimId !== null || path !== null || lineAnchor !== null || sideHint !== null || requiresDiffAnchorPreflight) fail("summary request anchor fields mismatch")
  } else if (claimId === null || path === null || lineAnchor === null || sideHint !== "RIGHT" || !requiresDiffAnchorPreflight) fail("inline request anchor fields mismatch")
  const publicationSlotIdentity = sha256(r.publicationSlotIdentity, "request.publicationSlotIdentity")
  const expectedSlot = slotIdentity({ publicationClass, repositoryId, pullRequestNumber, reviewedHead, o4eExecutionIdentity, claimIdentity: claimId, path, lineAnchor })
  if (publicationSlotIdentity !== expectedSlot) fail("request publication slot identity mismatch")
  const maxBody = publicationClass === "TOP_LEVEL_REVIEW_SUMMARY" ? O4F_LIMITS.maxSummaryBodyUtf8Bytes : O4F_LIMITS.maxInlineBodyUtf8Bytes
  const bodyText = text(r.bodyText, "request.bodyText", maxBody)
  if (markerCount(bodyText) !== 1 || !bodyText.includes(marker(publicationSlotIdentity))) fail("request body marker mismatch")
  const bodyByteLength = integer(r.bodyByteLength, "request.bodyByteLength", 1, maxBody)
  if (Buffer.byteLength(bodyText, "utf8") !== bodyByteLength) fail("request body byte accounting mismatch")
  const bodyIdentity = sha256(r.bodyIdentity, "request.bodyIdentity"); if (bodyIdentity !== bytesDigest(bodyText)) fail("request body identity mismatch")
  const identityInput = { publicationSlotIdentity, publicationClass, repositoryId, pullRequestNumber, reviewedHead, o4eExecutionIdentity, bodyIdentity, bodyByteLength, claimIdentity: claimId, path, lineAnchor, sideHint, requiresDiffAnchorPreflight }
  const publicationRequestIdentity = sha256(r.publicationRequestIdentity, "request.publicationRequestIdentity")
  if (publicationRequestIdentity !== requestIdentity(identityInput)) fail("request identity mismatch")
  return deepFreeze({ ...identityInput, repositoryFullName, bodyText, publicationRequestIdentity })
}

export function validateO4fSafeGithubPublicationAdmissionResult(raw: unknown): O4fSafeGithubPublicationAdmissionResult {
  assertSafeGraph(raw, "result")
  const r = ownExactRecord(raw, O4F_RESULT_KEYS, "result")
  if (r.version !== O4F_SAFE_GITHUB_PUBLICATION_ADMISSION_VERSION) fail("result version mismatch")
  const status = text(r.status, "result.status", 64) as O4fStatus; if (!STATUS.has(status)) fail("result status unsupported")
  const continuationDecision = text(r.continuationDecision, "result.continuationDecision", 80) as O4fContinuationDecision; if (!DECISIONS.has(continuationDecision)) fail("result continuation unsupported")
  if (continuationDecision !== continuationFor(status)) fail("result status/continuation mismatch")
  const repositoryId = decimalId(r.repositoryId, "result.repositoryId")
  const repositoryFullName = repositoryName(r.repositoryFullName, "result.repositoryFullName")
  const pullRequestNumber = integer(r.pullRequestNumber, "result.pullRequestNumber", 1, Number.MAX_SAFE_INTEGER)
  const pullRequestId = decimalId(r.pullRequestId, "result.pullRequestId")
  const canonicalBase = sha1(r.canonicalBase, "result.canonicalBase"), reviewedHead = sha1(r.reviewedHead, "result.reviewedHead")
  const o4cContextIdentity = sha256(r.o4cContextIdentity, "result.o4cContextIdentity"), o4dAdmissionIdentity = sha256(r.o4dAdmissionIdentity, "result.o4dAdmissionIdentity"), o4eExecutionIdentity = sha256(r.o4eExecutionIdentity, "result.o4eExecutionIdentity")
  const taskId = text(r.taskId, "result.taskId", O4F_LIMITS.maxTaskIdUtf8Bytes), policyIdentity = text(r.policyIdentity, "result.policyIdentity", O4F_LIMITS.maxPolicyIdentityUtf8Bytes)
  const changedPathSetIdentity = sha256(r.changedPathSetIdentity, "result.changedPathSetIdentity")
  if (!Array.isArray(r.publicationRequests) || r.publicationRequests.length > O4F_LIMITS.maxPublicationRequests) fail("result publicationRequests must be bounded")
  const publicationRequests = r.publicationRequests.map(normalizeRequest)
  const publicationRequestCount = integer(r.publicationRequestCount, "result.publicationRequestCount", 0, O4F_LIMITS.maxPublicationRequests)
  if (publicationRequestCount !== publicationRequests.length) fail("result publication request accounting mismatch")
  for (const request of publicationRequests) if (request.repositoryId !== repositoryId || request.repositoryFullName !== repositoryFullName || request.pullRequestNumber !== pullRequestNumber || request.reviewedHead !== reviewedHead || request.o4eExecutionIdentity !== o4eExecutionIdentity) fail("result request aggregate subject mismatch")
  if (canonical(publicationRequests) !== canonical([...publicationRequests].sort(requestOrder))) fail("result publication requests are not in canonical order")
  if (new Set(publicationRequests.map((x) => x.publicationSlotIdentity)).size !== publicationRequests.length || new Set(publicationRequests.map((x) => x.publicationRequestIdentity)).size !== publicationRequests.length) fail("result publication request identities must be unique")
  if (status === "READY") {
    if (publicationRequests.length < 1 || publicationRequests[0]!.publicationClass !== "TOP_LEVEL_REVIEW_SUMMARY" || publicationRequests.filter((x) => x.publicationClass === "TOP_LEVEL_REVIEW_SUMMARY").length !== 1) fail("READY result requires exactly one leading summary request")
  } else if (publicationRequests.length !== 0) fail("blocked result must expose zero publication requests")
  const base: Omit<O4fSafeGithubPublicationAdmissionResult, "publicationAdmissionIdentity"> = {
    version: O4F_SAFE_GITHUB_PUBLICATION_ADMISSION_VERSION, status, repositoryId, repositoryFullName, pullRequestNumber,
    pullRequestId, canonicalBase, reviewedHead, o4cContextIdentity, o4dAdmissionIdentity, o4eExecutionIdentity, taskId,
    policyIdentity, changedPathSetIdentity, publicationRequestCount, publicationRequests: Object.freeze(publicationRequests), continuationDecision,
  }
  const identity = sha256(r.publicationAdmissionIdentity, "result.publicationAdmissionIdentity"), expected = resultIdentity(base)
  if (identity !== expected) fail("result publication admission identity mismatch")
  return deepFreeze({ ...base, publicationAdmissionIdentity: expected })
}
