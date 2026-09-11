import { createHash } from "node:crypto"
import { types } from "node:util"

import {
  createO4aReadEvidenceInput,
  createO4aRepositorySnapshotInput,
  type O4aReadEvidenceInput,
  type O4aRepositorySnapshotInput,
} from "./o4-read-only-review-product-lineage-evidence.ts"
import {
  O4B_BOUNDED_READ_ONLY_GITHUB_CONTEXT_VERSION,
  validateO4bReadContextEvidence,
  type O4bBoundedReadOnlyGithubContextResult,
  type O4bCanonicalContentRecord,
  type O4bTransientContentItem,
} from "./o4b-bounded-read-only-github-context.ts"

export const O4C_GITHUB_REVIEWER_CONTEXT_VERSION = "kodac-o4c-github-reviewer-context-v1" as const
export const O4C_SELECTION_STRATEGY = "kodac.o4c.exact-github-context-v1" as const
export const O4C_TRUST = "untrusted-repository-data" as const
export const O4C_CONTINUATION_DECISIONS = Object.freeze([
  "READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_EXECUTION",
  "BLOCK_O4B_NOT_READY",
  "BLOCK_O4B_LINEAGE_OR_IDENTITY_MISMATCH",
  "BLOCK_CHANGED_PATH_CONTEXT_INCOMPLETE",
  "BLOCK_REVIEWER_CONTEXT_BUDGET",
] as const)
export const O4C_LIMITS = Object.freeze({
  maxContextItems: 64,
  maxTotalContextUtf8Bytes: 65_536,
  maxContextItemUtf8Bytes: 65_536,
  maxPathUtf8Bytes: 1_024,
  maxObjectiveUtf8Bytes: 4_096,
  maxTaskIdUtf8Bytes: 128,
  maxProvenanceRefsPerItem: 32,
  maxProvenanceRefUtf8Bytes: 1_024,
  maxGraphDepth: 32,
  maxGraphNodes: 32_768,
})

export type O4cContinuationDecision = (typeof O4C_CONTINUATION_DECISIONS)[number]
export type O4cReadRole = "CHANGED_PATH" | "SUPPORTING_CONTEXT"
export type O4cContentRevisionKind = "HEAD" | "BASE_REMOVED"

export interface O4cGithubContextToReviewerContextInput {
  readonly taskId: string
  readonly objective: string
  readonly o4bContext: O4bBoundedReadOnlyGithubContextResult
}

export interface O4cReviewerContextItem {
  readonly itemId: string
  readonly subjectPath: string
  readonly readRole: O4cReadRole
  readonly changedFileStatus: O4bCanonicalContentRecord["changedFileStatus"]
  readonly previousPath: string | null
  readonly contentRepositoryId: string
  readonly contentRepositoryFullName: string
  readonly contentRevisionSha: string
  readonly contentRevisionKind: O4cContentRevisionKind
  readonly providerBlobSha: string | null
  readonly materializedByteLength: number
  readonly contentIdentity: string
  readonly contentRecordIdentity: string
  readonly readEvidenceIdentity: string
  readonly readContextEvidenceIdentity: string
  readonly snapshotEvidenceIdentity: string
  readonly text: string
  readonly contextUtf8Bytes: number
  readonly provenanceRefs: readonly string[]
  readonly trust: typeof O4C_TRUST
}

export interface O4cGithubReviewerContextResult {
  readonly version: typeof O4C_GITHUB_REVIEWER_CONTEXT_VERSION
  readonly contextIdentity: string
  readonly taskId: string
  readonly taskIdentity: string
  readonly objectiveIdentity: string
  readonly repositoryId: string
  readonly repositoryFullName: string
  readonly pullRequestNumber: number
  readonly pullRequestId: string
  readonly canonicalBase: string
  readonly reviewedHead: string
  readonly snapshotEvidenceIdentity: string
  readonly readContextEvidenceIdentity: string
  readonly changedPathSetIdentity: string
  readonly changedPaths: readonly string[]
  readonly items: readonly O4cReviewerContextItem[]
  readonly itemIdentities: readonly string[]
  readonly itemCount: number
  readonly totalUtf8Bytes: number
  readonly omittedSupportingPaths: readonly string[]
  readonly omittedSupportingPathCount: number
  readonly selectionStrategy: typeof O4C_SELECTION_STRATEGY
  readonly trust: typeof O4C_TRUST
  readonly continuationDecision: O4cContinuationDecision
}

type UnknownRecord = Record<string, unknown>
const SHA256 = /^[0-9a-f]{64}$/
const GIT_SHA1 = /^[0-9a-f]{40}$/
const DECIMAL_ID = /^(?:[1-9][0-9]{0,19})$/
const REPOSITORY = /^[A-Za-z0-9_.-]{1,100}\/[A-Za-z0-9_.-]{1,100}$/
const DECISIONS = new Set<string>(O4C_CONTINUATION_DECISIONS)
const CHANGED_STATUSES = new Set<string>(["added", "modified", "removed", "renamed", "copied", "changed", "unchanged"])
const INPUT_KEYS = ["taskId", "objective", "o4bContext"] as const
const O4B_RESULT_KEYS = ["snapshot", "changedPaths", "readEvidence", "contentItems", "readContextEvidence"] as const
const SNAPSHOT_KEYS = [
  "repositoryId", "repositoryFullName", "pullRequestNumber", "pullRequestId", "canonicalBase", "reviewedHead",
  "baseRepositoryId", "headRepositoryId", "headRepositoryFullName", "forkClassification", "baseRefIdentity",
  "headRefIdentity", "snapshotObservedAt", "snapshotEvidenceIdentity",
] as const
const READ_KEYS = [
  "path", "readRole", "contentIdentity", "byteLength", "sourceKind", "truncationState",
  "snapshotEvidenceIdentity", "reviewedHead", "readEvidenceIdentity",
] as const
const CONTENT_ITEM_KEYS = [
  "path", "readRole", "changedFileStatus", "previousPath", "contentRepositoryId", "contentRepositoryFullName",
  "contentRevisionSha", "contentRevisionKind", "providerBlobSha", "providerDeclaredSize", "materializedByteLength",
  "contentIdentity", "truncationState", "truncationReason", "readEvidenceIdentity", "contentRecordIdentity", "contentText",
] as const
export const O4C_REVIEWER_CONTEXT_ITEM_KEYS = Object.freeze([
  "itemId", "subjectPath", "readRole", "changedFileStatus", "previousPath", "contentRepositoryId",
  "contentRepositoryFullName", "contentRevisionSha", "contentRevisionKind", "providerBlobSha", "materializedByteLength",
  "contentIdentity", "contentRecordIdentity", "readEvidenceIdentity", "readContextEvidenceIdentity",
  "snapshotEvidenceIdentity", "text", "contextUtf8Bytes", "provenanceRefs", "trust",
] as const)
export const O4C_REVIEWER_CONTEXT_RESULT_KEYS = Object.freeze([
  "version", "contextIdentity", "taskId", "taskIdentity", "objectiveIdentity", "repositoryId", "repositoryFullName",
  "pullRequestNumber", "pullRequestId", "canonicalBase", "reviewedHead", "snapshotEvidenceIdentity",
  "readContextEvidenceIdentity", "changedPathSetIdentity", "changedPaths", "items", "itemIdentities", "itemCount",
  "totalUtf8Bytes", "omittedSupportingPaths", "omittedSupportingPathCount", "selectionStrategy", "trust",
  "continuationDecision",
] as const)

function fail(message: string): never { throw new Error(`O4-C reviewer context blocked: ${message}`) }
function compareStrings(a: string, b: string): number { return a < b ? -1 : a > b ? 1 : 0 }
function compareUtf8(a: string, b: string): number { return Buffer.compare(Buffer.from(a, "utf8"), Buffer.from(b, "utf8")) }
function sameStrings(a: readonly string[], b: readonly string[]): boolean { return a.length === b.length && a.every((v, i) => v === b[i]) }
function assertUnicodeScalars(value: string, label: string): void {
  for (let i = 0; i < value.length; i += 1) {
    const c = value.charCodeAt(i)
    if (c >= 0xd800 && c <= 0xdbff) {
      const n = value.charCodeAt(i + 1)
      if (!(n >= 0xdc00 && n <= 0xdfff)) fail(`${label} must contain only Unicode scalar values`)
      i += 1
    } else if (c >= 0xdc00 && c <= 0xdfff) fail(`${label} must contain only Unicode scalar values`)
  }
}
function boundedText(value: unknown, label: string, max: number, allowEmpty = false): string {
  if (typeof value !== "string" || (!allowEmpty && value.length === 0) || value.includes("\0")) fail(`${label} must be bounded NUL-free text`)
  assertUnicodeScalars(value, label)
  if (Buffer.byteLength(value, "utf8") > max) fail(`${label} exceeds its UTF-8 byte bound`)
  return value
}
function sha256Text(value: unknown, label: string): string {
  const text = boundedText(value, label, 64)
  if (!SHA256.test(text)) fail(`${label} must be a lowercase SHA-256 identity`)
  return text
}
function gitSha(value: unknown, label: string): string {
  const text = boundedText(value, label, 40)
  if (!GIT_SHA1.test(text)) fail(`${label} must be a lowercase 40-hex Git SHA-1`)
  return text
}
function decimalId(value: unknown, label: string): string {
  const text = boundedText(value, label, 20)
  if (!DECIMAL_ID.test(text)) fail(`${label} must be a positive decimal identifier`)
  return text
}
function repositoryName(value: unknown, label: string): string {
  const text = boundedText(value, label, 201)
  if (!REPOSITORY.test(text)) fail(`${label} must be an owner/repository name`)
  const [owner, repo] = text.split("/")
  if (owner === "." || owner === ".." || repo === "." || repo === "..") fail(`${label} must not contain URL dot segments`)
  return text
}
function pathText(value: unknown, label: string): string {
  const text = boundedText(value, label, O4C_LIMITS.maxPathUtf8Bytes)
  if (text.startsWith("/") || text.includes("\\") || /^[A-Za-z]:\//.test(text) || text.split("/").some((p) => !p || p === "." || p === "..")) fail(`${label} must be a repository-relative POSIX path`)
  return text
}
function integer(value: unknown, label: string, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < min || value > max) fail(`${label} must be a bounded safe integer`)
  return value
}
function ownExactRecord(value: unknown, keys: readonly string[], label: string): UnknownRecord {
  if (typeof value !== "object" || value === null || types.isProxy(value) || Array.isArray(value)) fail(`${label} must be a non-proxy plain object`)
  const proto = Object.getPrototypeOf(value)
  if (proto !== Object.prototype && proto !== null) fail(`${label} must use a plain-object prototype`)
  if (Object.getOwnPropertySymbols(value).length !== 0) fail(`${label} must not contain symbol properties`)
  const descriptors = Object.getOwnPropertyDescriptors(value)
  const actual = Object.keys(descriptors).sort(compareStrings)
  const expected = [...keys].sort(compareStrings)
  if (!sameStrings(actual, expected)) fail(`${label} contains unexpected or missing properties`)
  for (const key of keys) {
    const descriptor = descriptors[key]
    if (!descriptor || !("value" in descriptor) || !descriptor.enumerable || descriptor.value === undefined) fail(`${label}.${key} must be an enumerable defined data property`)
  }
  return value as UnknownRecord
}
function denseArray(value: unknown, label: string, max: number): readonly unknown[] {
  if (typeof value !== "object" || value === null || types.isProxy(value) || !Array.isArray(value)) fail(`${label} must be a non-proxy array`)
  if (Object.getPrototypeOf(value) !== Array.prototype || value.length > max || Object.getOwnPropertySymbols(value).length !== 0) fail(`${label} has an unsafe array shape`)
  const descriptors = Object.getOwnPropertyDescriptors(value)
  if (Reflect.ownKeys(value).length !== value.length + 1) fail(`${label} contains sparse or extra array properties`)
  for (let i = 0; i < value.length; i += 1) {
    const d = descriptors[String(i)]
    if (!d || !("value" in d) || !d.enumerable || d.value === undefined) fail(`${label}[${i}] must be an enumerable defined data property`)
  }
  return Array.from(value)
}
function assertSafeGraph(value: unknown, label: string): void {
  const stack: Array<{ value: unknown, label: string, depth: number }> = [{ value, label, depth: 0 }]
  const seen = new Set<object>()
  let nodes = 0
  while (stack.length) {
    const current = stack.pop()!
    nodes += 1
    if (nodes > O4C_LIMITS.maxGraphNodes || current.depth > O4C_LIMITS.maxGraphDepth) fail(`${label} exceeds safe graph bounds`)
    const item = current.value
    if (item === null || typeof item === "boolean") continue
    if (typeof item === "string") { assertUnicodeScalars(item, current.label); continue }
    if (typeof item === "number") { if (!Number.isFinite(item)) fail(`${current.label} contains a non-finite number`); continue }
    if (typeof item !== "object" || types.isProxy(item)) fail(`${current.label} must contain plain JSON-like data only`)
    if (seen.has(item)) fail(`${current.label} contains cyclic or aliased object references`)
    seen.add(item)
    const proto = Object.getPrototypeOf(item)
    if (Array.isArray(item)) {
      if (proto !== Array.prototype) fail(`${current.label} must use the built-in Array prototype`)
      denseArray(item, current.label, O4C_LIMITS.maxGraphNodes).forEach((child, i) => stack.push({ value: child, label: `${current.label}[${i}]`, depth: current.depth + 1 }))
    } else {
      if (proto !== Object.prototype && proto !== null) fail(`${current.label} must use a plain-object prototype`)
      if (Object.getOwnPropertySymbols(item).length !== 0) fail(`${current.label} must not contain symbol properties`)
      for (const [key, d] of Object.entries(Object.getOwnPropertyDescriptors(item))) {
        if (!("value" in d) || !d.enumerable || d.value === undefined) fail(`${current.label}.${key} must be an enumerable defined data property`)
        stack.push({ value: d.value, label: `${current.label}.${key}`, depth: current.depth + 1 })
      }
    }
  }
}
function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== "object") {
    const encoded = JSON.stringify(value)
    if (encoded === undefined) fail("canonical JSON contains non-JSON data")
    return encoded
  }
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`
  const r = value as UnknownRecord
  return `{${Object.keys(r).sort(compareStrings).map((k) => `${JSON.stringify(k)}:${canonicalJson(r[k])}`).join(",")}}`
}
function digest(kind: string, value: unknown): string {
  assertSafeGraph(value, `digest.${kind}`)
  return createHash("sha256").update(`${O4C_GITHUB_REVIEWER_CONTEXT_VERSION}:${kind}`, "utf8").update("\0", "utf8").update(canonicalJson(value), "utf8").digest("hex")
}
function bytesSha256(text: string): string { return createHash("sha256").update(Buffer.from(text, "utf8")).digest("hex") }
function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null) {
    if (!Object.isFrozen(value)) Object.freeze(value)
    for (const child of Object.values(value as UnknownRecord)) deepFreeze(child)
  }
  return value
}
function shallowEqualRecord(a: UnknownRecord, b: UnknownRecord, keys: readonly string[]): boolean { return keys.every((key) => canonicalJson(a[key]) === canonicalJson(b[key])) }

function normalizeSnapshot(raw: unknown): O4aRepositorySnapshotInput {
  const r = ownExactRecord(raw, SNAPSHOT_KEYS, "input.o4bContext.snapshot")
  const core: Omit<O4aRepositorySnapshotInput, "snapshotEvidenceIdentity"> = {
    repositoryId: decimalId(r.repositoryId, "snapshot.repositoryId"),
    repositoryFullName: repositoryName(r.repositoryFullName, "snapshot.repositoryFullName"),
    pullRequestNumber: integer(r.pullRequestNumber, "snapshot.pullRequestNumber", 1, Number.MAX_SAFE_INTEGER),
    pullRequestId: decimalId(r.pullRequestId, "snapshot.pullRequestId"),
    canonicalBase: gitSha(r.canonicalBase, "snapshot.canonicalBase"),
    reviewedHead: gitSha(r.reviewedHead, "snapshot.reviewedHead"),
    baseRepositoryId: decimalId(r.baseRepositoryId, "snapshot.baseRepositoryId"),
    headRepositoryId: decimalId(r.headRepositoryId, "snapshot.headRepositoryId"),
    headRepositoryFullName: repositoryName(r.headRepositoryFullName, "snapshot.headRepositoryFullName"),
    forkClassification: r.forkClassification === "SAME_REPOSITORY" || r.forkClassification === "FORK_REPOSITORY" ? r.forkClassification : fail("snapshot fork classification is unsupported"),
    baseRefIdentity: sha256Text(r.baseRefIdentity, "snapshot.baseRefIdentity"),
    headRefIdentity: sha256Text(r.headRefIdentity, "snapshot.headRefIdentity"),
    snapshotObservedAt: boundedText(r.snapshotObservedAt, "snapshot.snapshotObservedAt", 24),
  }
  const expected = createO4aRepositorySnapshotInput(core)
  if (sha256Text(r.snapshotEvidenceIdentity, "snapshot.snapshotEvidenceIdentity") !== expected.snapshotEvidenceIdentity) fail("snapshot evidence identity mismatch")
  return expected
}
function normalizeRead(raw: unknown, repositoryId: string, pullRequestNumber: number): O4aReadEvidenceInput {
  const r = ownExactRecord(raw, READ_KEYS, "input.o4bContext.readEvidence[]")
  const expected = createO4aReadEvidenceInput(repositoryId, pullRequestNumber, {
    path: pathText(r.path, "readEvidence.path"),
    readRole: r.readRole === "CHANGED_PATH" || r.readRole === "SUPPORTING_CONTEXT" ? r.readRole : fail("readEvidence.readRole is unsupported"),
    contentIdentity: sha256Text(r.contentIdentity, "readEvidence.contentIdentity"),
    byteLength: integer(r.byteLength, "readEvidence.byteLength", 0, 1_048_576),
    sourceKind: r.sourceKind as typeof import("./o4-read-only-review-product-lineage-evidence.ts").O4A_READ_SOURCE_KIND,
    truncationState: r.truncationState === "FULL" || r.truncationState === "TRUNCATED" ? r.truncationState : fail("readEvidence.truncationState is unsupported"),
    snapshotEvidenceIdentity: sha256Text(r.snapshotEvidenceIdentity, "readEvidence.snapshotEvidenceIdentity"),
    reviewedHead: gitSha(r.reviewedHead, "readEvidence.reviewedHead"),
  })
  if (sha256Text(r.readEvidenceIdentity, "readEvidence.readEvidenceIdentity") !== expected.readEvidenceIdentity) fail("read evidence identity mismatch")
  return expected
}
function rawContentRecord(item: UnknownRecord): UnknownRecord {
  const record: UnknownRecord = {}
  for (const key of CONTENT_ITEM_KEYS) if (key !== "contentText") record[key] = item[key]
  return record
}
function exactContentRecordMatch(raw: UnknownRecord, canonical: O4bCanonicalContentRecord): boolean {
  return canonicalJson(rawContentRecord(raw)) === canonicalJson(canonical)
}
function normalizeContentItem(raw: unknown, canonical: O4bCanonicalContentRecord, index: number): O4bTransientContentItem {
  const r = ownExactRecord(raw, CONTENT_ITEM_KEYS, `input.o4bContext.contentItems[${index}]`)
  if (!exactContentRecordMatch(r, canonical)) fail("transient content item disagrees with canonical O4-B content record")
  const text = r.contentText
  if (canonical.truncationState === "FULL") {
    if (typeof text !== "string") fail("FULL content item must expose contentText")
    assertUnicodeScalars(text, `contentItems[${index}].contentText`)
    if (Buffer.byteLength(text, "utf8") !== canonical.materializedByteLength || bytesSha256(text) !== canonical.contentIdentity) fail("FULL content item exact UTF-8 bytes do not match O4-B evidence")
  } else if (text !== null) fail("TRUNCATED content item must not expose reviewable text")
  return deepFreeze({ ...(canonical as O4bCanonicalContentRecord), contentText: text as string | null })
}

function contextIdentityPreimage(value: Omit<O4cGithubReviewerContextResult, "contextIdentity">): unknown {
  return {
    version: value.version,
    taskId: value.taskId,
    taskIdentity: value.taskIdentity,
    objectiveIdentity: value.objectiveIdentity,
    repositoryId: value.repositoryId,
    repositoryFullName: value.repositoryFullName,
    pullRequestNumber: value.pullRequestNumber,
    pullRequestId: value.pullRequestId,
    canonicalBase: value.canonicalBase,
    reviewedHead: value.reviewedHead,
    snapshotEvidenceIdentity: value.snapshotEvidenceIdentity,
    readContextEvidenceIdentity: value.readContextEvidenceIdentity,
    changedPathSetIdentity: value.changedPathSetIdentity,
    changedPaths: [...value.changedPaths],
    itemIdentities: [...value.itemIdentities],
    itemCount: value.itemCount,
    totalUtf8Bytes: value.totalUtf8Bytes,
    omittedSupportingPaths: [...value.omittedSupportingPaths],
    omittedSupportingPathCount: value.omittedSupportingPathCount,
    selectionStrategy: value.selectionStrategy,
    trust: value.trust,
    continuationDecision: value.continuationDecision,
  }
}

function baseResult(
  taskId: string,
  taskIdentity: string,
  objectiveIdentity: string,
  evidence: ReturnType<typeof validateO4bReadContextEvidence>,
  decision: O4cContinuationDecision,
  items: readonly O4cReviewerContextItem[],
  omittedSupportingPaths: readonly string[],
): O4cGithubReviewerContextResult {
  const itemIdentities = Object.freeze(items.map((item) => item.itemId))
  const totalUtf8Bytes = items.reduce((sum, item) => sum + item.contextUtf8Bytes, 0)
  const core: Omit<O4cGithubReviewerContextResult, "contextIdentity"> = {
    version: O4C_GITHUB_REVIEWER_CONTEXT_VERSION,
    taskId, taskIdentity, objectiveIdentity,
    repositoryId: evidence.repositoryId,
    repositoryFullName: evidence.repositoryFullName,
    pullRequestNumber: evidence.pullRequestNumber,
    pullRequestId: evidence.pullRequestId,
    canonicalBase: evidence.canonicalBase,
    reviewedHead: evidence.reviewedHead,
    snapshotEvidenceIdentity: evidence.snapshotEvidenceIdentity,
    readContextEvidenceIdentity: evidence.readContextEvidenceIdentity,
    changedPathSetIdentity: evidence.changedPathSetIdentity,
    changedPaths: Object.freeze([...evidence.changedPaths]),
    items: Object.freeze([...items]),
    itemIdentities,
    itemCount: items.length,
    totalUtf8Bytes,
    omittedSupportingPaths: Object.freeze([...omittedSupportingPaths]),
    omittedSupportingPathCount: omittedSupportingPaths.length,
    selectionStrategy: O4C_SELECTION_STRATEGY,
    trust: O4C_TRUST,
    continuationDecision: decision,
  }
  return deepFreeze({ ...core, contextIdentity: digest("github-reviewer-context-identity", contextIdentityPreimage(core)) })
}
function makeItem(item: O4bTransientContentItem, evidence: ReturnType<typeof validateO4bReadContextEvidence>): O4cReviewerContextItem {
  if (item.truncationState !== "FULL" || item.contentText === null) fail("only FULL O4-B content may become reviewer context")
  const text = item.contentText
  const contextUtf8Bytes = Buffer.byteLength(text, "utf8")
  if (contextUtf8Bytes !== item.materializedByteLength || bytesSha256(text) !== item.contentIdentity) fail("reviewer item byte binding mismatch")
  const provenanceRefs = [
    `o4b-content:${item.contentIdentity}`,
    `o4b-content-record:${item.contentRecordIdentity}`,
    `o4b-read-context:${evidence.readContextEvidenceIdentity}`,
    `o4b-read-evidence:${item.readEvidenceIdentity}`,
    `o4b-snapshot:${evidence.snapshotEvidenceIdentity}`,
  ].sort(compareStrings)
  const core = {
    subjectPath: item.path,
    readRole: item.readRole,
    changedFileStatus: item.changedFileStatus,
    previousPath: item.previousPath,
    contentRepositoryId: item.contentRepositoryId,
    contentRepositoryFullName: item.contentRepositoryFullName,
    contentRevisionSha: item.contentRevisionSha,
    contentRevisionKind: item.contentRevisionKind,
    providerBlobSha: item.providerBlobSha,
    materializedByteLength: item.materializedByteLength,
    contentIdentity: item.contentIdentity,
    contentRecordIdentity: item.contentRecordIdentity,
    readEvidenceIdentity: item.readEvidenceIdentity,
    readContextEvidenceIdentity: evidence.readContextEvidenceIdentity,
    snapshotEvidenceIdentity: evidence.snapshotEvidenceIdentity,
    text,
    contextUtf8Bytes,
    provenanceRefs: Object.freeze(provenanceRefs),
    trust: O4C_TRUST,
  }
  return deepFreeze({ ...core, itemId: digest("reviewer-context-item-identity", core) })
}

export function buildO4cGithubReviewerContext(raw: unknown): O4cGithubReviewerContextResult {
  assertSafeGraph(raw, "input")
  const input = ownExactRecord(raw, INPUT_KEYS, "input")
  const taskId = boundedText(input.taskId, "input.taskId", O4C_LIMITS.maxTaskIdUtf8Bytes)
  const objective = boundedText(input.objective, "input.objective", O4C_LIMITS.maxObjectiveUtf8Bytes)
  const taskIdentity = digest("task-identity", { taskId })
  const objectiveIdentity = digest("objective-identity", { objective })
  const o4b = ownExactRecord(input.o4bContext, O4B_RESULT_KEYS, "input.o4bContext")
  const evidence = validateO4bReadContextEvidence(o4b.readContextEvidence)
  if (evidence.version !== O4B_BOUNDED_READ_ONLY_GITHUB_CONTEXT_VERSION) fail("unexpected O4-B evidence version")

  const snapshot = normalizeSnapshot(o4b.snapshot)
  const outerChanged = denseArray(o4b.changedPaths, "input.o4bContext.changedPaths", 512).map((v, i) => pathText(v, `changedPaths[${i}]`))
  const reads = denseArray(o4b.readEvidence, "input.o4bContext.readEvidence", 640).map((v) => normalizeRead(v, evidence.repositoryId, evidence.pullRequestNumber))
  const rawItems = denseArray(o4b.contentItems, "input.o4bContext.contentItems", 640)

  const snapshotKeys: Array<keyof O4aRepositorySnapshotInput> = ["repositoryId", "repositoryFullName", "pullRequestNumber", "pullRequestId", "canonicalBase", "reviewedHead", "baseRepositoryId", "headRepositoryId", "headRepositoryFullName", "forkClassification", "snapshotEvidenceIdentity"]
  const snapshotMatches = snapshotKeys.every((key) => canonicalJson(snapshot[key]) === canonicalJson((evidence as unknown as UnknownRecord)[key]))
  const orderedReadIds = reads.map((r) => r.readEvidenceIdentity)
  const expectedOrderedReadIds = evidence.contentRecords.map((record) => record.readEvidenceIdentity)
  const contentByKey = new Map(evidence.contentRecords.map((record) => [`${record.path}\0${record.readRole}`, record]))
  const contentItems: O4bTransientContentItem[] = []
  for (let i = 0; i < rawItems.length; i += 1) {
    const rawItem = rawItems[i]
    if (typeof rawItem !== "object" || rawItem === null || Array.isArray(rawItem) || types.isProxy(rawItem)) fail(`contentItems[${i}] must be a plain object`)
    const rr = rawItem as UnknownRecord
    const path = typeof rr.path === "string" ? rr.path : ""
    const role = typeof rr.readRole === "string" ? rr.readRole : ""
    const canonical = contentByKey.get(`${path}\0${role}`)
    if (!canonical) fail("transient content item is absent from canonical O4-B content records")
    contentItems.push(normalizeContentItem(rawItem, canonical, i))
  }
  const outerLineageMatches = snapshotMatches
    && sameStrings(outerChanged, evidence.changedPaths)
    && sameStrings(orderedReadIds, expectedOrderedReadIds)
    && contentItems.length === evidence.contentRecords.length
    && sameStrings(contentItems.map((i) => i.contentRecordIdentity), evidence.contentRecords.map((record) => record.contentRecordIdentity))
  const supportingUniverse = evidence.contentRecords.filter((record) => record.readRole === "SUPPORTING_CONTEXT").map((record) => record.path).sort(compareUtf8)
  if (!outerLineageMatches) return baseResult(taskId, taskIdentity, objectiveIdentity, evidence, "BLOCK_O4B_LINEAGE_OR_IDENTITY_MISMATCH", [], supportingUniverse)
  if (evidence.continuationDecision !== "READY_FOR_O4A_REVIEW") return baseResult(taskId, taskIdentity, objectiveIdentity, evidence, "BLOCK_O4B_NOT_READY", [], supportingUniverse)

  const byPath = new Map(contentItems.map((item) => [item.path, item]))
  const changedItems: O4cReviewerContextItem[] = []
  for (const path of evidence.changedPaths) {
    const item = byPath.get(path)
    if (!item || item.readRole !== "CHANGED_PATH" || item.truncationState !== "FULL" || item.contentText === null) return baseResult(taskId, taskIdentity, objectiveIdentity, evidence, "BLOCK_CHANGED_PATH_CONTEXT_INCOMPLETE", [], supportingUniverse)
    changedItems.push(makeItem(item, evidence))
  }
  if (!sameStrings(changedItems.map((i) => i.subjectPath), evidence.changedPaths)) return baseResult(taskId, taskIdentity, objectiveIdentity, evidence, "BLOCK_O4B_LINEAGE_OR_IDENTITY_MISMATCH", [], supportingUniverse)
  const changedBytes = changedItems.reduce((sum, item) => sum + item.contextUtf8Bytes, 0)
  if (changedItems.length > O4C_LIMITS.maxContextItems || changedBytes > O4C_LIMITS.maxTotalContextUtf8Bytes || changedItems.some((i) => i.contextUtf8Bytes > O4C_LIMITS.maxContextItemUtf8Bytes)) {
    return baseResult(taskId, taskIdentity, objectiveIdentity, evidence, "BLOCK_REVIEWER_CONTEXT_BUDGET", [], supportingUniverse)
  }

  const selected = [...changedItems]
  let usedBytes = changedBytes
  const omitted: string[] = []
  const supports = contentItems.filter((i) => i.readRole === "SUPPORTING_CONTEXT").sort((a, b) => compareUtf8(a.path, b.path))
  for (const item of supports) {
    if (item.truncationState !== "FULL" || item.contentText === null) { omitted.push(item.path); continue }
    const candidate = makeItem(item, evidence)
    const fits = selected.length < O4C_LIMITS.maxContextItems
      && candidate.contextUtf8Bytes <= O4C_LIMITS.maxContextItemUtf8Bytes
      && usedBytes + candidate.contextUtf8Bytes <= O4C_LIMITS.maxTotalContextUtf8Bytes
    if (!fits) { omitted.push(item.path); continue }
    selected.push(candidate)
    usedBytes += candidate.contextUtf8Bytes
  }
  return baseResult(taskId, taskIdentity, objectiveIdentity, evidence, "READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_EXECUTION", selected, omitted)
}

function normalizeResultItem(raw: unknown, index: number): O4cReviewerContextItem {
  const r = ownExactRecord(raw, O4C_REVIEWER_CONTEXT_ITEM_KEYS, `result.items[${index}]`)
  const role: O4cReadRole = r.readRole === "CHANGED_PATH" || r.readRole === "SUPPORTING_CONTEXT" ? r.readRole : fail("result item readRole is unsupported")
  let changedFileStatus: O4bCanonicalContentRecord["changedFileStatus"] = null
  if (r.changedFileStatus !== null) {
    const status = boundedText(r.changedFileStatus, "result item changedFileStatus", 16)
    if (!CHANGED_STATUSES.has(status)) fail("result item changedFileStatus is unsupported")
    changedFileStatus = status as Exclude<O4bCanonicalContentRecord["changedFileStatus"], null>
  }
  if ((role === "CHANGED_PATH") !== (changedFileStatus !== null)) fail("result item changed status/read role mismatch")
  const previousPath = r.previousPath === null ? null : pathText(r.previousPath, "result item previousPath")
  if (changedFileStatus === "renamed") {
    if (previousPath === null || previousPath === r.subjectPath) fail("renamed result item requires a distinct previous path")
  } else if (previousPath !== null) fail("non-renamed result item must not carry previous-path authority")
  const revisionKind: O4cContentRevisionKind = r.contentRevisionKind === "HEAD" || r.contentRevisionKind === "BASE_REMOVED" ? r.contentRevisionKind : fail("result item revision kind is unsupported")
  if (role === "SUPPORTING_CONTEXT" && revisionKind !== "HEAD") fail("supporting result item must bind HEAD")
  if (role === "CHANGED_PATH" && revisionKind !== (changedFileStatus === "removed" ? "BASE_REMOVED" : "HEAD")) fail("changed result item revision kind/status mismatch")
  const text = boundedText(r.text, "result item text", O4C_LIMITS.maxContextItemUtf8Bytes, true)
  const contextUtf8Bytes = integer(r.contextUtf8Bytes, "result item contextUtf8Bytes", 0, O4C_LIMITS.maxContextItemUtf8Bytes)
  if (Buffer.byteLength(text, "utf8") !== contextUtf8Bytes) fail("result item UTF-8 byte accounting mismatch")
  const provenanceRefs = denseArray(r.provenanceRefs, "result item provenanceRefs", O4C_LIMITS.maxProvenanceRefsPerItem).map((v, i) => boundedText(v, `provenanceRefs[${i}]`, O4C_LIMITS.maxProvenanceRefUtf8Bytes))
  const sortedRefs = [...provenanceRefs].sort(compareStrings)
  if (!sameStrings(provenanceRefs, sortedRefs) || new Set(provenanceRefs).size !== provenanceRefs.length) fail("result item provenance refs must be canonical sorted unique")
  if (r.trust !== O4C_TRUST) fail("result item trust mismatch")
  const core = {
    subjectPath: pathText(r.subjectPath, "result item subjectPath"), role,
  }
  const normalizedCore = {
    subjectPath: core.subjectPath,
    readRole: role,
    changedFileStatus,
    previousPath,
    contentRepositoryId: decimalId(r.contentRepositoryId, "result item contentRepositoryId"),
    contentRepositoryFullName: repositoryName(r.contentRepositoryFullName, "result item contentRepositoryFullName"),
    contentRevisionSha: gitSha(r.contentRevisionSha, "result item contentRevisionSha"),
    contentRevisionKind: revisionKind,
    providerBlobSha: r.providerBlobSha === null ? null : gitSha(r.providerBlobSha, "result item providerBlobSha"),
    materializedByteLength: integer(r.materializedByteLength, "result item materializedByteLength", 0, O4C_LIMITS.maxContextItemUtf8Bytes),
    contentIdentity: sha256Text(r.contentIdentity, "result item contentIdentity"),
    contentRecordIdentity: sha256Text(r.contentRecordIdentity, "result item contentRecordIdentity"),
    readEvidenceIdentity: sha256Text(r.readEvidenceIdentity, "result item readEvidenceIdentity"),
    readContextEvidenceIdentity: sha256Text(r.readContextEvidenceIdentity, "result item readContextEvidenceIdentity"),
    snapshotEvidenceIdentity: sha256Text(r.snapshotEvidenceIdentity, "result item snapshotEvidenceIdentity"),
    text, contextUtf8Bytes, provenanceRefs: Object.freeze(provenanceRefs), trust: O4C_TRUST,
  }
  if (bytesSha256(text) !== normalizedCore.contentIdentity || normalizedCore.materializedByteLength !== contextUtf8Bytes) fail("result item exact-byte binding mismatch")
  const expectedRefs = [
    `o4b-content:${normalizedCore.contentIdentity}`,
    `o4b-content-record:${normalizedCore.contentRecordIdentity}`,
    `o4b-read-context:${normalizedCore.readContextEvidenceIdentity}`,
    `o4b-read-evidence:${normalizedCore.readEvidenceIdentity}`,
    `o4b-snapshot:${normalizedCore.snapshotEvidenceIdentity}`,
  ].sort(compareStrings)
  if (!sameStrings(provenanceRefs, expectedRefs)) fail("result item provenance refs do not exactly bind O4-B lineage")
  const expectedId = digest("reviewer-context-item-identity", normalizedCore)
  if (sha256Text(r.itemId, "result item itemId") !== expectedId) fail("result item identity mismatch")
  return deepFreeze({ ...normalizedCore, itemId: expectedId })
}

export function validateO4cGithubReviewerContextResult(raw: unknown): O4cGithubReviewerContextResult {
  assertSafeGraph(raw, "result")
  const r = ownExactRecord(raw, O4C_REVIEWER_CONTEXT_RESULT_KEYS, "result")
  if (r.version !== O4C_GITHUB_REVIEWER_CONTEXT_VERSION || r.selectionStrategy !== O4C_SELECTION_STRATEGY || r.trust !== O4C_TRUST) fail("result protocol constants mismatch")
  const taskId = boundedText(r.taskId, "result.taskId", O4C_LIMITS.maxTaskIdUtf8Bytes)
  const taskIdentity = sha256Text(r.taskIdentity, "result.taskIdentity")
  const objectiveIdentity = sha256Text(r.objectiveIdentity, "result.objectiveIdentity")
  if (taskIdentity !== digest("task-identity", { taskId })) fail("result task identity mismatch")
  const changedPaths = denseArray(r.changedPaths, "result.changedPaths", 512).map((v, i) => pathText(v, `result.changedPaths[${i}]`))
  if (!sameStrings(changedPaths, [...changedPaths].sort(compareUtf8)) || new Set(changedPaths).size !== changedPaths.length) fail("result changedPaths must be canonical sorted unique")
  const items = denseArray(r.items, "result.items", O4C_LIMITS.maxContextItems).map(normalizeResultItem)
  const itemIdentities = denseArray(r.itemIdentities, "result.itemIdentities", O4C_LIMITS.maxContextItems).map((v, i) => sha256Text(v, `result.itemIdentities[${i}]`))
  if (!sameStrings(itemIdentities, items.map((item) => item.itemId))) fail("result item identity sequence mismatch")
  if (integer(r.itemCount, "result.itemCount", 0, O4C_LIMITS.maxContextItems) !== items.length) fail("result item count mismatch")
  const totalUtf8Bytes = integer(r.totalUtf8Bytes, "result.totalUtf8Bytes", 0, O4C_LIMITS.maxTotalContextUtf8Bytes)
  if (totalUtf8Bytes !== items.reduce((sum, item) => sum + item.contextUtf8Bytes, 0)) fail("result total byte accounting mismatch")
  const omittedSupportingPaths = denseArray(r.omittedSupportingPaths, "result.omittedSupportingPaths", 640).map((v, i) => pathText(v, `result.omittedSupportingPaths[${i}]`))
  if (!sameStrings(omittedSupportingPaths, [...omittedSupportingPaths].sort(compareUtf8)) || new Set(omittedSupportingPaths).size !== omittedSupportingPaths.length) fail("result omitted supporting paths must be canonical sorted unique")
  if (integer(r.omittedSupportingPathCount, "result.omittedSupportingPathCount", 0, 640) !== omittedSupportingPaths.length) fail("result omitted supporting count mismatch")
  const decision = boundedText(r.continuationDecision, "result.continuationDecision", 64) as O4cContinuationDecision
  if (!DECISIONS.has(decision)) fail("result continuation decision is unsupported")
  const changedItemPaths = items.filter((item) => item.readRole === "CHANGED_PATH").map((item) => item.subjectPath)
  const supportingItemPaths = items.filter((item) => item.readRole === "SUPPORTING_CONTEXT").map((item) => item.subjectPath)
  if (new Set(items.map((item) => item.subjectPath)).size !== items.length) fail("result items contain duplicate subject paths")
  if (!sameStrings(supportingItemPaths, [...supportingItemPaths].sort(compareUtf8))) fail("result supporting items must be canonical path order")
  if (supportingItemPaths.some((path) => changedPaths.includes(path))) fail("result supporting item collides with changed-path universe")
  if (omittedSupportingPaths.some((path) => changedPaths.includes(path) || supportingItemPaths.includes(path))) fail("omitted supporting paths must be disjoint from changed and admitted paths")
  if (new Set(itemIdentities).size !== itemIdentities.length) fail("result item identities must be unique")
  if (decision === "READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_EXECUTION" && !sameStrings(changedItemPaths, changedPaths)) fail("READY result changed item sequence must exactly equal changedPaths")
  if (decision !== "READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_EXECUTION" && items.length !== 0) fail("blocked result must expose zero reviewer-ready items")
  const common = {
    version: O4C_GITHUB_REVIEWER_CONTEXT_VERSION,
    taskId, taskIdentity, objectiveIdentity,
    repositoryId: decimalId(r.repositoryId, "result.repositoryId"),
    repositoryFullName: repositoryName(r.repositoryFullName, "result.repositoryFullName"),
    pullRequestNumber: integer(r.pullRequestNumber, "result.pullRequestNumber", 1, Number.MAX_SAFE_INTEGER),
    pullRequestId: decimalId(r.pullRequestId, "result.pullRequestId"),
    canonicalBase: gitSha(r.canonicalBase, "result.canonicalBase"),
    reviewedHead: gitSha(r.reviewedHead, "result.reviewedHead"),
    snapshotEvidenceIdentity: sha256Text(r.snapshotEvidenceIdentity, "result.snapshotEvidenceIdentity"),
    readContextEvidenceIdentity: sha256Text(r.readContextEvidenceIdentity, "result.readContextEvidenceIdentity"),
    changedPathSetIdentity: sha256Text(r.changedPathSetIdentity, "result.changedPathSetIdentity"),
    changedPaths: Object.freeze(changedPaths),
    items: Object.freeze(items), itemIdentities: Object.freeze(itemIdentities), itemCount: items.length, totalUtf8Bytes,
    omittedSupportingPaths: Object.freeze(omittedSupportingPaths), omittedSupportingPathCount: omittedSupportingPaths.length,
    selectionStrategy: O4C_SELECTION_STRATEGY, trust: O4C_TRUST, continuationDecision: decision,
  }
  for (const item of items) {
    if (item.snapshotEvidenceIdentity !== common.snapshotEvidenceIdentity || item.readContextEvidenceIdentity !== common.readContextEvidenceIdentity) fail("result item aggregate provenance mismatch")
  }
  const expectedIdentity = digest("github-reviewer-context-identity", contextIdentityPreimage(common))
  if (sha256Text(r.contextIdentity, "result.contextIdentity") !== expectedIdentity) fail("result context identity mismatch")
  return deepFreeze({ ...common, contextIdentity: expectedIdentity })
}
