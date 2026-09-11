import { createHash } from "node:crypto"
import { types } from "node:util"

import {
  O4C_GITHUB_REVIEWER_CONTEXT_VERSION,
  O4C_SELECTION_STRATEGY,
  O4C_TRUST,
  validateO4cGithubReviewerContextResult,
  type O4cGithubReviewerContextResult,
  type O4cReviewerContextItem,
} from "./o4c-github-context-to-reviewer-context.ts"

export const O4D_REVIEWER_EXECUTION_ADMISSION_VERSION = "kodac-o4d-o4c-reviewer-execution-admission-v1" as const
export const O4D_READY_DECISION = "READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_PROVIDER_EXECUTION" as const
export const O4D_CONTINUATION_DECISIONS = Object.freeze([
  O4D_READY_DECISION,
  "BLOCK_O4C_NOT_READY",
  "BLOCK_O4C_LINEAGE_OR_IDENTITY_MISMATCH",
  "BLOCK_TASK_ID_MISMATCH",
  "BLOCK_EXECUTION_ADMISSION_INPUT",
] as const)
export const O4D_LIMITS = Object.freeze({
  maxContextItems: 64,
  maxTotalContextUtf8Bytes: 65_536,
  maxContextItemUtf8Bytes: 65_536,
  maxPathUtf8Bytes: 1_024,
  maxTaskIdUtf8Bytes: 128,
  maxPolicyIdentityUtf8Bytes: 128,
  maxInstructionsUtf8Bytes: 8_192,
  maxProvenanceRefsPerItem: 32,
  maxProvenanceRefUtf8Bytes: 1_024,
  maxGraphDepth: 32,
  maxGraphNodes: 32_768,
})

export type O4dContinuationDecision = (typeof O4D_CONTINUATION_DECISIONS)[number]

export interface O4dO4cReviewerExecutionAdmissionInput {
  readonly taskId: string
  readonly policyIdentity: string
  readonly instructions: string
  readonly o4cContext: O4cGithubReviewerContextResult
}

export interface O4dExecutionReadyContextItem {
  readonly itemId: string
  readonly subjectPath: string
  readonly readRole: O4cReviewerContextItem["readRole"]
  readonly changedFileStatus: O4cReviewerContextItem["changedFileStatus"]
  readonly previousPath: string | null
  readonly contentRevisionSha: string
  readonly contentRevisionKind: O4cReviewerContextItem["contentRevisionKind"]
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

export interface O4dO4cReviewerExecutionAdmissionResult {
  readonly version: typeof O4D_REVIEWER_EXECUTION_ADMISSION_VERSION
  readonly admissionIdentity: string
  readonly taskId: string
  readonly policyIdentity: string
  readonly canonicalBase: string
  readonly reviewedHead: string
  readonly instructions: string
  readonly instructionsIdentity: string
  readonly contextProtocol: typeof O4C_GITHUB_REVIEWER_CONTEXT_VERSION
  readonly contextIdentity: string
  readonly contextSelectionStrategy: typeof O4C_SELECTION_STRATEGY
  readonly changedPathSetIdentity: string
  readonly changedPaths: readonly string[]
  readonly items: readonly O4dExecutionReadyContextItem[]
  readonly itemIdentities: readonly string[]
  readonly itemCount: number
  readonly totalUtf8Bytes: number
  readonly omittedSupportingPaths: readonly string[]
  readonly omittedSupportingPathCount: number
  readonly trust: typeof O4C_TRUST
  readonly continuationDecision: O4dContinuationDecision
}

type UnknownRecord = Record<string, unknown>
const SHA1 = /^[0-9a-f]{40}$/
const SHA256 = /^[0-9a-f]{64}$/
const DECISIONS = new Set<string>(O4D_CONTINUATION_DECISIONS)
const CHANGED_STATUSES = new Set<string>(["added", "modified", "removed", "renamed", "copied", "changed", "unchanged"])
const INPUT_KEYS = ["taskId", "policyIdentity", "instructions", "o4cContext"] as const
export const O4D_EXECUTION_READY_ITEM_KEYS = Object.freeze([
  "itemId", "subjectPath", "readRole", "changedFileStatus", "previousPath", "contentRevisionSha", "contentRevisionKind",
  "contentIdentity", "contentRecordIdentity", "readEvidenceIdentity", "readContextEvidenceIdentity", "snapshotEvidenceIdentity",
  "text", "contextUtf8Bytes", "provenanceRefs", "trust",
] as const)
export const O4D_ADMISSION_RESULT_KEYS = Object.freeze([
  "version", "admissionIdentity", "taskId", "policyIdentity", "canonicalBase", "reviewedHead", "instructions",
  "instructionsIdentity", "contextProtocol", "contextIdentity", "contextSelectionStrategy", "changedPathSetIdentity",
  "changedPaths", "items", "itemIdentities", "itemCount", "totalUtf8Bytes", "omittedSupportingPaths",
  "omittedSupportingPathCount", "trust", "continuationDecision",
] as const)

function fail(message: string): never { throw new Error(`O4-D execution admission blocked: ${message}`) }
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
function instructionsDigest(value: string): string { return createHash("sha256").update(value, "utf8").digest("hex") }
function bytesDigest(value: string): string { return createHash("sha256").update(value, "utf8").digest("hex") }
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
function text(value: unknown, label: string, maxBytes: number, allowEmpty = false): string {
  if (typeof value !== "string" || (!allowEmpty && value.length === 0) || value.includes("\0")) fail(`${label} must be bounded NUL-free text`)
  assertUnicodeScalars(value, label)
  if (Buffer.byteLength(value, "utf8") > maxBytes) fail(`${label} exceeds its UTF-8 byte bound`)
  return value
}
function sha1(value: unknown, label: string): string { const v=text(value,label,40); if(!SHA1.test(v)) fail(`${label} must be lowercase 40-hex`); return v }
function sha256(value: unknown, label: string): string { const v=text(value,label,64); if(!SHA256.test(v)) fail(`${label} must be lowercase SHA-256`); return v }
function integer(value: unknown, label: string, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < min || value > max) fail(`${label} must be an integer in range`)
  return value
}
function pathText(value: unknown, label: string): string {
  const v=text(value,label,O4D_LIMITS.maxPathUtf8Bytes)
  if(v.startsWith("/")||v.includes("\\")||/^[A-Za-z]:\//.test(v)||v.split("/").some((s)=>!s||s==="."||s==="..")) fail(`${label} must be a repository-relative POSIX path`)
  return v
}
function ownExactRecord(value: unknown, keys: readonly string[], label: string): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value) || types.isProxy(value)) fail(`${label} must be a non-proxy plain object`)
  const proto=Object.getPrototypeOf(value); if(proto!==Object.prototype&&proto!==null) fail(`${label} must have a plain-object prototype`)
  if(Object.getOwnPropertySymbols(value).length) fail(`${label} must not contain symbol keys`)
  const descriptors=Object.getOwnPropertyDescriptors(value)
  const names=Object.keys(descriptors)
  if(names.length!==keys.length||keys.some((key)=>!(key in descriptors))) fail(`${label} has unexpected or missing properties`)
  for(const name of names) {
    if(!keys.includes(name)) fail(`${label} has unexpected or missing properties`)
    const d=descriptors[name]!
    if(!("value" in d)||d.get!==undefined||d.set!==undefined) fail(`${label}.${name} must be a data property`)
  }
  return value as UnknownRecord
}
function assertSafeGraph(value: unknown, label: string): void {
  const seen=new WeakSet<object>(); let nodes=0
  const visit=(item: unknown, depth: number, path: string): void => {
    if(typeof item!=="object"||item===null) return
    if(depth>O4D_LIMITS.maxGraphDepth) fail(`${label} exceeds graph depth at ${path}`)
    if(types.isProxy(item)) fail(`${label} contains a proxy at ${path}`)
    if(seen.has(item)) fail(`${label} contains a cyclic or aliased object graph at ${path}`)
    seen.add(item); nodes+=1; if(nodes>O4D_LIMITS.maxGraphNodes) fail(`${label} exceeds graph node bound`)
    const proto=Object.getPrototypeOf(item)
    if(Array.isArray(item)) { if(proto!==Array.prototype) fail(`${label} contains an unexpected array prototype at ${path}`) }
    else if(proto!==Object.prototype&&proto!==null) fail(`${label} contains an unexpected object prototype at ${path}`)
    if(Object.getOwnPropertySymbols(item).length) fail(`${label} contains symbol keys at ${path}`)
    const descriptors=Object.getOwnPropertyDescriptors(item)
    if(Array.isArray(item)) {
      const expectedNames = new Set(["length", ...Array.from({length:item.length}, (_unused, index) => String(index))])
      for (const name of Object.keys(descriptors)) if (!expectedNames.has(name)) fail(`${label} contains an unexpected array property at ${path}.${name}`)
      for(let i=0;i<item.length;i+=1) {
        const d=descriptors[String(i)]; if(!d||!("value" in d)||d.get!==undefined||d.set!==undefined) fail(`${label} contains a sparse/accessor array at ${path}`)
        visit(d.value,depth+1,`${path}[${i}]`)
      }
    } else for(const [key,d] of Object.entries(descriptors)) {
      if(!("value" in d)||d.get!==undefined||d.set!==undefined) fail(`${label} contains an accessor at ${path}.${key}`)
      visit(d.value,depth+1,`${path}.${key}`)
    }
  }
  visit(value,0,"$")
}
function deepFreeze<T>(value: T): T {
  if(typeof value==="object"&&value!==null&&!Object.isFrozen(value)) {
    Object.freeze(value)
    for(const child of Object.values(value as UnknownRecord)) deepFreeze(child)
  }
  return value
}
function stringArray(value: unknown, label: string, maxItems: number, itemMaxBytes: number, pathValues=false): string[] {
  if(!Array.isArray(value)||value.length>maxItems) fail(`${label} has invalid item count`)
  const out=value.map((v,i)=>pathValues?pathText(v,`${label}[${i}]`):text(v,`${label}[${i}]`,itemMaxBytes))
  if(new Set(out).size!==out.length) fail(`${label} contains duplicates`)
  return out
}
function exactStrings(a: readonly string[], b: readonly string[], label: string): void {
  if(a.length!==b.length||a.some((v,i)=>v!==b[i])) fail(`${label} mismatch`)
}

function copyItem(item: O4cReviewerContextItem): O4dExecutionReadyContextItem {
  return deepFreeze({
    itemId:item.itemId, subjectPath:item.subjectPath, readRole:item.readRole, changedFileStatus:item.changedFileStatus,
    previousPath:item.previousPath, contentRevisionSha:item.contentRevisionSha, contentRevisionKind:item.contentRevisionKind,
    contentIdentity:item.contentIdentity, contentRecordIdentity:item.contentRecordIdentity, readEvidenceIdentity:item.readEvidenceIdentity,
    readContextEvidenceIdentity:item.readContextEvidenceIdentity, snapshotEvidenceIdentity:item.snapshotEvidenceIdentity,
    text:item.text, contextUtf8Bytes:item.contextUtf8Bytes, provenanceRefs:Object.freeze([...item.provenanceRefs]), trust:O4C_TRUST,
  })
}
function identityPreimage(result: Omit<O4dO4cReviewerExecutionAdmissionResult,"admissionIdentity">): unknown {
  return result
}
function resultFrom(
  input: {taskId:string,policyIdentity:string,instructions:string,instructionsIdentity:string},
  context: O4cGithubReviewerContextResult,
  decision: O4dContinuationDecision,
  exposeItems: boolean,
): O4dO4cReviewerExecutionAdmissionResult {
  const items=exposeItems?context.items.map(copyItem):[]
  const itemIdentities=items.map((item)=>item.itemId)
  const result: Omit<O4dO4cReviewerExecutionAdmissionResult,"admissionIdentity">={
    version:O4D_REVIEWER_EXECUTION_ADMISSION_VERSION,
    taskId:input.taskId, policyIdentity:input.policyIdentity, canonicalBase:context.canonicalBase, reviewedHead:context.reviewedHead,
    instructions:input.instructions, instructionsIdentity:input.instructionsIdentity,
    contextProtocol:O4C_GITHUB_REVIEWER_CONTEXT_VERSION, contextIdentity:context.contextIdentity,
    contextSelectionStrategy:O4C_SELECTION_STRATEGY, changedPathSetIdentity:context.changedPathSetIdentity,
    changedPaths:Object.freeze([...context.changedPaths]), items:Object.freeze(items), itemIdentities:Object.freeze(itemIdentities),
    itemCount:items.length, totalUtf8Bytes:items.reduce((n,item)=>n+item.contextUtf8Bytes,0),
    omittedSupportingPaths:Object.freeze([...context.omittedSupportingPaths]), omittedSupportingPathCount:context.omittedSupportingPathCount,
    trust:O4C_TRUST, continuationDecision:decision,
  }
  const admissionIdentity=digest("o4d-reviewer-execution-admission-identity",identityPreimage(result))
  return deepFreeze({...result,admissionIdentity})
}

export function createO4dO4cReviewerExecutionAdmission(raw: unknown): O4dO4cReviewerExecutionAdmissionResult {
  assertSafeGraph(raw,"input")
  const r=ownExactRecord(raw,INPUT_KEYS,"input")
  const taskId=text(r.taskId,"taskId",O4D_LIMITS.maxTaskIdUtf8Bytes)
  const policyIdentity=text(r.policyIdentity,"policyIdentity",O4D_LIMITS.maxPolicyIdentityUtf8Bytes)
  const instructions=text(r.instructions,"instructions",O4D_LIMITS.maxInstructionsUtf8Bytes)
  const instructionsIdentity=instructionsDigest(instructions)
  let context: O4cGithubReviewerContextResult
  try { context=validateO4cGithubReviewerContextResult(r.o4cContext) }
  catch(error) { fail(`invalid O4-C context: ${error instanceof Error?error.message:"unknown validation failure"}`) }
  const common={taskId,policyIdentity,instructions,instructionsIdentity}
  if(context.continuationDecision!=="READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_EXECUTION") return resultFrom(common,context,"BLOCK_O4C_NOT_READY",false)
  if(taskId!==context.taskId) return resultFrom(common,context,"BLOCK_TASK_ID_MISMATCH",false)
  return resultFrom(common,context,O4D_READY_DECISION,true)
}

function normalizeResultItem(raw: unknown, index: number): O4dExecutionReadyContextItem {
  const r=ownExactRecord(raw,O4D_EXECUTION_READY_ITEM_KEYS,`result.items[${index}]`)
  const readRole=r.readRole==="CHANGED_PATH"||r.readRole==="SUPPORTING_CONTEXT"?r.readRole:fail("result item readRole unsupported")
  const subjectPath=pathText(r.subjectPath,"result item subjectPath")
  let changedFileStatus: O4cReviewerContextItem["changedFileStatus"] = null
  if (r.changedFileStatus !== null) {
    const value=text(r.changedFileStatus,"result item changedFileStatus",16)
    if (!CHANGED_STATUSES.has(value)) fail("result item changedFileStatus unsupported")
    changedFileStatus=value as Exclude<O4cReviewerContextItem["changedFileStatus"], null>
  }
  if ((readRole === "CHANGED_PATH") !== (changedFileStatus !== null)) fail("result item changed status/read role mismatch")
  const previousPath=r.previousPath===null?null:pathText(r.previousPath,"result item previousPath")
  if (changedFileStatus === "renamed") {
    if (previousPath === null || previousPath === subjectPath) fail("renamed result item requires a distinct previous path")
  } else if (previousPath !== null) fail("non-renamed result item must not carry previous-path authority")
  const contentRevisionKind=r.contentRevisionKind==="HEAD"||r.contentRevisionKind==="BASE_REMOVED"?r.contentRevisionKind:fail("result item revision kind unsupported")
  if (readRole === "SUPPORTING_CONTEXT" && contentRevisionKind !== "HEAD") fail("supporting result item must bind HEAD")
  if (readRole === "CHANGED_PATH" && contentRevisionKind !== (changedFileStatus === "removed" ? "BASE_REMOVED" : "HEAD")) fail("changed result item revision kind/status mismatch")
  const body=text(r.text,"result item text",O4D_LIMITS.maxContextItemUtf8Bytes,true)
  const contextUtf8Bytes=integer(r.contextUtf8Bytes,"result item contextUtf8Bytes",0,O4D_LIMITS.maxContextItemUtf8Bytes)
  if(Buffer.byteLength(body,"utf8")!==contextUtf8Bytes) fail("result item byte accounting mismatch")
  const contentIdentity=sha256(r.contentIdentity,"result item contentIdentity")
  if(bytesDigest(body)!==contentIdentity) fail("result item exact-byte content identity mismatch")
  const contentRecordIdentity=sha256(r.contentRecordIdentity,"result item contentRecordIdentity")
  const readEvidenceIdentity=sha256(r.readEvidenceIdentity,"result item readEvidenceIdentity")
  const readContextEvidenceIdentity=sha256(r.readContextEvidenceIdentity,"result item readContextEvidenceIdentity")
  const snapshotEvidenceIdentity=sha256(r.snapshotEvidenceIdentity,"result item snapshotEvidenceIdentity")
  const refs=stringArray(r.provenanceRefs,"result item provenanceRefs",O4D_LIMITS.maxProvenanceRefsPerItem,O4D_LIMITS.maxProvenanceRefUtf8Bytes)
  const sorted=[...refs].sort(cmp); exactStrings(refs,sorted,"result item provenance order")
  const expectedRefs=[
    `o4b-content:${contentIdentity}`,
    `o4b-content-record:${contentRecordIdentity}`,
    `o4b-read-context:${readContextEvidenceIdentity}`,
    `o4b-read-evidence:${readEvidenceIdentity}`,
    `o4b-snapshot:${snapshotEvidenceIdentity}`,
  ].sort(cmp)
  exactStrings(refs,expectedRefs,"result item predecessor provenance")
  if(r.trust!==O4C_TRUST) fail("result item trust mismatch")
  return deepFreeze({
    itemId:sha256(r.itemId,"result item itemId"), subjectPath, readRole,
    changedFileStatus, previousPath, contentRevisionSha:sha1(r.contentRevisionSha,"result item contentRevisionSha"), contentRevisionKind,
    contentIdentity, contentRecordIdentity, readEvidenceIdentity, readContextEvidenceIdentity,
    snapshotEvidenceIdentity, text:body, contextUtf8Bytes, provenanceRefs:Object.freeze(refs), trust:O4C_TRUST,
  })
}

export function validateO4dO4cReviewerExecutionAdmissionResult(raw: unknown): O4dO4cReviewerExecutionAdmissionResult {
  assertSafeGraph(raw,"result")
  const r=ownExactRecord(raw,O4D_ADMISSION_RESULT_KEYS,"result")
  if(r.version!==O4D_REVIEWER_EXECUTION_ADMISSION_VERSION||r.contextProtocol!==O4C_GITHUB_REVIEWER_CONTEXT_VERSION||r.contextSelectionStrategy!==O4C_SELECTION_STRATEGY||r.trust!==O4C_TRUST) fail("result protocol constants mismatch")
  const decision=text(r.continuationDecision,"result continuationDecision",64) as O4dContinuationDecision
  if(!DECISIONS.has(decision)) fail("result continuation decision unsupported")
  const taskId=text(r.taskId,"result taskId",O4D_LIMITS.maxTaskIdUtf8Bytes)
  const policyIdentity=text(r.policyIdentity,"result policyIdentity",O4D_LIMITS.maxPolicyIdentityUtf8Bytes)
  const instructions=text(r.instructions,"result instructions",O4D_LIMITS.maxInstructionsUtf8Bytes)
  const instructionsIdentity=sha256(r.instructionsIdentity,"result instructionsIdentity")
  if(instructionsIdentity!==instructionsDigest(instructions)) fail("result instructions identity mismatch")
  const canonicalBase=sha1(r.canonicalBase,"result canonicalBase")
  const reviewedHead=sha1(r.reviewedHead,"result reviewedHead")
  const changedPaths=stringArray(r.changedPaths,"result changedPaths",512,O4D_LIMITS.maxPathUtf8Bytes,true)
  exactStrings(changedPaths,[...changedPaths].sort(compareUtf8),"result changedPaths canonical order")
  const items=Array.isArray(r.items)?r.items.map(normalizeResultItem):fail("result items must be an array")
  if(items.length>O4D_LIMITS.maxContextItems) fail("result items exceed bound")
  const itemIdentities=stringArray(r.itemIdentities,"result itemIdentities",O4D_LIMITS.maxContextItems,64).map((v,i)=>sha256(v,`result itemIdentities[${i}]`))
  exactStrings(itemIdentities,items.map((item)=>item.itemId),"result item identity sequence")
  const itemCount=integer(r.itemCount,"result itemCount",0,O4D_LIMITS.maxContextItems)
  const totalUtf8Bytes=integer(r.totalUtf8Bytes,"result totalUtf8Bytes",0,O4D_LIMITS.maxTotalContextUtf8Bytes)
  if(itemCount!==items.length||totalUtf8Bytes!==items.reduce((n,item)=>n+item.contextUtf8Bytes,0)) fail("result item accounting mismatch")
  const omittedSupportingPaths=stringArray(r.omittedSupportingPaths,"result omittedSupportingPaths",640,O4D_LIMITS.maxPathUtf8Bytes,true)
  exactStrings(omittedSupportingPaths,[...omittedSupportingPaths].sort(compareUtf8),"result omitted supporting canonical order")
  const omittedSupportingPathCount=integer(r.omittedSupportingPathCount,"result omittedSupportingPathCount",0,640)
  if(omittedSupportingPathCount!==omittedSupportingPaths.length) fail("result omitted supporting accounting mismatch")

  const changedItemPaths=items.filter((item)=>item.readRole==="CHANGED_PATH").map((item)=>item.subjectPath)
  const supportingItemPaths=items.filter((item)=>item.readRole==="SUPPORTING_CONTEXT").map((item)=>item.subjectPath)
  if(new Set(items.map((item)=>item.subjectPath)).size!==items.length) fail("result items contain duplicate subject paths")
  exactStrings(supportingItemPaths,[...supportingItemPaths].sort(compareUtf8),"result supporting item canonical order")
  if(supportingItemPaths.some((path)=>changedPaths.includes(path))) fail("result supporting item collides with changed-path universe")
  if(omittedSupportingPaths.some((path)=>changedPaths.includes(path)||supportingItemPaths.includes(path))) fail("result omitted supporting paths must be disjoint")
  for (const item of items) {
    const expectedRevision=item.contentRevisionKind==="HEAD"?reviewedHead:canonicalBase
    if(item.contentRevisionSha!==expectedRevision) fail("result item revision SHA does not match admitted base/head lineage")
  }
  if(items.length>0) {
    const readContextIdentity=items[0]!.readContextEvidenceIdentity
    const snapshotIdentity=items[0]!.snapshotEvidenceIdentity
    if(items.some((item)=>item.readContextEvidenceIdentity!==readContextIdentity||item.snapshotEvidenceIdentity!==snapshotIdentity)) fail("result item aggregate predecessor provenance mismatch")
  }
  if(decision===O4D_READY_DECISION) {
    exactStrings(changedItemPaths,changedPaths,"READY changed-path sequence")
  } else if(items.length!==0||itemIdentities.length!==0||itemCount!==0||totalUtf8Bytes!==0) fail("blocked result must expose zero execution-ready items")

  const result: Omit<O4dO4cReviewerExecutionAdmissionResult,"admissionIdentity">={
    version:O4D_REVIEWER_EXECUTION_ADMISSION_VERSION, taskId, policyIdentity, canonicalBase, reviewedHead,
    instructions,instructionsIdentity,contextProtocol:O4C_GITHUB_REVIEWER_CONTEXT_VERSION,
    contextIdentity:sha256(r.contextIdentity,"result contextIdentity"),contextSelectionStrategy:O4C_SELECTION_STRATEGY,
    changedPathSetIdentity:sha256(r.changedPathSetIdentity,"result changedPathSetIdentity"),changedPaths:Object.freeze(changedPaths),
    items:Object.freeze(items),itemIdentities:Object.freeze(itemIdentities),itemCount,totalUtf8Bytes,
    omittedSupportingPaths:Object.freeze(omittedSupportingPaths),omittedSupportingPathCount,trust:O4C_TRUST,continuationDecision:decision,
  }
  const expected=digest("o4d-reviewer-execution-admission-identity",identityPreimage(result))
  if(sha256(r.admissionIdentity,"result admissionIdentity")!==expected) fail("result admission identity mismatch")
  return deepFreeze({...result,admissionIdentity:expected})
}
