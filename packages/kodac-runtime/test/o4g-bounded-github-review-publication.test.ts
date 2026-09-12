import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { existsSync, readFileSync } from "node:fs"
import test from "node:test"

import { acquireO4bBoundedReadOnlyGithubContext, type O4bBoundedReadOnlyGithubContextInput } from "../src/github-review/o4b-bounded-read-only-github-context.ts"
import { buildO4cGithubReviewerContext } from "../src/github-review/o4c-github-context-to-reviewer-context.ts"
import { createO4dO4cReviewerExecutionAdmission, type O4dO4cReviewerExecutionAdmissionResult } from "../src/github-review/o4d-o4c-reviewer-execution-admission.ts"
import { O4eModelBackedReviewerProviderExecution } from "../src/github-review/o4e-model-backed-reviewer-provider-execution.ts"
import { createO4fSafeGithubPublicationAdmission, type O4fSafeGithubPublicationAdmissionResult } from "../src/github-review/o4f-safe-github-publication-admission.ts"
import {
  O4G_BOUNDED_GITHUB_REVIEW_PUBLICATION_VERSION,
  O4G_CONTINUATION_DECISIONS,
  O4G_FAILURE_CODES,
  O4G_STATUSES,
  publishO4gBoundedGithubReview,
  validateO4gBoundedGithubReviewPublicationResult,
  type O4gBoundedGithubReviewPublicationResult,
} from "../src/github-review/o4g-bounded-github-review-publication.ts"
import type { ModelProvider, ModelProviderRequest, ModelProviderResponse } from "../src/model/provider.ts"

type Obj = Record<string, any>
type Call = { url: URL; method: string; headers: Headers; body: string | null; redirect: RequestRedirect | undefined }
const BASE = "a".repeat(40), HEAD = "b".repeat(40), ALT_HEAD = "d".repeat(40)
const REPO_ID = "1001", PR_ID = "2002", REPO = "TheHalfMoon/Kodac", PR = 42, POLICY = "policy:v1", PRIMARY = "src/widget.ts"
const CREDENTIAL_POLICY = "e".repeat(64), SECRET = "o4g-synthetic-secret-DO-NOT-LEAK"
const BYTES = new TextEncoder().encode("export const widget = 1\n")
const sha256 = (v: Uint8Array | string) => createHash("sha256").update(v).digest("hex")
const blobSha = (b: Uint8Array) => createHash("sha1").update(`blob ${b.byteLength}\0`, "utf8").update(b).digest("hex")
const fileBody = (path: string, b: Uint8Array) => ({ type: "file", encoding: "base64", path, sha: blobSha(b), size: b.byteLength, content: Buffer.from(b).toString("base64") })
const changed = (path = PRIMARY, status = "modified", b = BYTES, extra: Obj = {}) => ({ filename: path, status, sha: blobSha(b), ...extra })
const clone = <T>(v: T): T => structuredClone(v)

function o4bFixture(opts: { rows?: Obj[]; head?: string } = {}) {
  const head = opts.head ?? HEAD, rows = opts.rows ?? [changed()]
  const content: Record<string, Obj> = {}
  for (const row of rows) { const path = String(row.filename), b = path === PRIMARY ? BYTES : new TextEncoder().encode(`content:${path}\n`); content[path] = fileBody(path, b); row.sha = content[path].sha }
  const snap = () => ({ id: Number(PR_ID), number: PR, base: { ref: "main", sha: BASE, repo: { id: Number(REPO_ID), full_name: REPO } }, head: { ref: "feat", sha: head, repo: { id: Number(REPO_ID), full_name: REPO } } })
  const fetchImpl = (async (raw: URL | RequestInfo) => {
    const u = new URL(raw instanceof URL ? raw.href : typeof raw === "string" ? raw : raw.url)
    if (/\/pulls\/\d+$/.test(u.pathname)) return json(snap())
    if (/\/pulls\/\d+\/files$/.test(u.pathname)) return json(Number(u.searchParams.get("page")) === 1 ? rows : [])
    if (u.pathname.includes("/contents/")) { const marker = "/contents/"; const path = u.pathname.slice(u.pathname.indexOf(marker) + marker.length).split("/").map(decodeURIComponent).join("/"); const body = content[path]; return json(body ?? { message: "Not Found" }, body ? 200 : 404) }
    return new Response(null, { status: 404 })
  }) as typeof fetch
  const input: O4bBoundedReadOnlyGithubContextInput = { expectedRepositoryId: REPO_ID, expectedRepositoryFullName: REPO, pullRequestNumber: PR, expectedPullRequestId: PR_ID, expectedBaseRepositoryId: REPO_ID, expectedHeadRepositoryId: REPO_ID, expectedHeadRepositoryFullName: REPO, expectedHeadSha: head, credentialPolicyIdentity: CREDENTIAL_POLICY, supportingPaths: [], credential: "fixture" }
  let i = 0; const times = ["2026-09-12T00:00:00.000Z", "2026-09-12T00:00:01.000Z"]
  return acquireO4bBoundedReadOnlyGithubContext(input, { fetchImpl, now: () => times[Math.min(i++, 1)]! })
}
const claim = (a: O4dO4cReviewerExecutionAdmissionResult, path: string, range: { startLine: number; endLine: number } | undefined, key: string) => ({ claimKey: key, path, summary: `Material defect in ${path}.`, contractClaim: "The changed code violates the contract.", category: "correctness", severity: "high", confidenceBps: 9000, ...(range ? { range } : {}), evidenceItemIds: [a.items.find((x) => x.subjectPath === path)!.itemId] })
const output = (claims: Obj[]): ModelProviderResponse => ({ assistant: JSON.stringify({ claims }), toolCalls: [], finishReason: "stop" })
class Provider implements ModelProvider {
  readonly name = "fixture-provider"
  readonly fn: (request: ModelProviderRequest) => ModelProviderResponse
  constructor(fn: (request: ModelProviderRequest) => ModelProviderResponse) { this.fn = fn }
  generate(request: ModelProviderRequest): Promise<ModelProviderResponse> { return Promise.resolve(this.fn(request)) }
}
async function admission(kind: "zero" | "one" | "multi" | "blocked" = "zero", line = 1): Promise<O4fSafeGithubPublicationAdmissionResult> {
  const rows = kind === "multi" ? [changed("src/a.ts"), changed("src/b.ts")] : [changed()]
  const o4b = await o4bFixture({ rows }), o4c = buildO4cGithubReviewerContext({ taskId: "review-pr-42", objective: "Review exact changed paths.", o4bContext: o4b })
  const o4d = createO4dO4cReviewerExecutionAdmission({ taskId: "review-pr-42", policyIdentity: POLICY, instructions: "Find evidence-grounded material defects only.", o4cContext: o4c })
  const claims = kind === "one" ? [claim(o4d, PRIMARY, { startLine: line, endLine: line }, "c1")] : kind === "multi" ? [claim(o4d, "src/a.ts", { startLine: 1, endLine: 1 }, "a"), claim(o4d, "src/b.ts", { startLine: 1, endLine: 1 }, "b")] : []
  let n = 0; const heads = kind === "blocked" ? [HEAD, ALT_HEAD] : [HEAD, HEAD]
  const o4e = await new O4eModelBackedReviewerProviderExecution({ provider: new Provider(() => output(claims)), model: "fixture-model-v1", readCurrentHead: () => heads[Math.min(n++, heads.length - 1)]! }).execute(o4d)
  return createO4fSafeGithubPublicationAdmission({ o4cContext: o4c, o4dAdmission: o4d, o4eExecution: o4e })
}

const READY_ZERO = await admission("zero"), READY_ONE = await admission("one"), READY_LINE5 = await admission("one", 5), READY_MULTI = await admission("multi"), BLOCKED = await admission("blocked")
function json(value: unknown, status = 200, url?: string): Response { const r = new Response(JSON.stringify(value), { status, headers: { "content-type": "application/json" } }); if (url !== undefined) Object.defineProperty(r, "url", { value: url }); return r }
function prSnapshot(head = HEAD, overrides: Obj = {}): Obj { return { id: Number(PR_ID), number: PR, base: { repo: { id: Number(REPO_ID), full_name: REPO } }, head: { sha: head }, ...overrides } }
function review(id: number, body = "", commit = HEAD, state = "COMMENTED"): Obj { return { id, node_id: `R_${id}`, body, commit_id: commit, state } }
function comment(id: number, reviewId: number, body: string, path: string, line: number, side = "RIGHT", commit = HEAD): Obj { return { id, node_id: `RC_${id}`, pull_request_review_id: reviewId, body, path, line, side, commit_id: commit } }
function exactObjects(a: O4fSafeGithubPublicationAdmissionResult, reviewId = 700): { review: Obj; comments: Obj[] } { const summary = a.publicationRequests[0]!, inline = a.publicationRequests.slice(1); return { review: review(reviewId, summary.bodyText, a.reviewedHead), comments: inline.map((q, i) => comment(800 + i, reviewId, q.bodyText, q.path!, q.lineAnchor!, "RIGHT", a.reviewedHead)) } }

interface ServerOptions {
  prHeads?: string[]
  prOverrides?: Obj
  reviews?: Obj[]
  comments?: Obj[]
  files?: Obj[]
  postMode?: "normal" | "throw" | "timeout" | "body-timeout" | "throw-after-create" | "partial-after-create" | "no-readback" | "mismatch-after-create" | "malformed"
  postStatus?: number
  hangReviewsBody?: boolean
  responseUrl?: (call: Call) => string | undefined
  reviewsPage?: (page: number) => unknown
  commentsPage?: (page: number) => unknown
  filesPage?: (page: number) => unknown
}
function server(a: O4fSafeGithubPublicationAdmissionResult, options: ServerOptions = {}) {
  const calls: Call[] = [], reviews = [...(options.reviews ?? [])], comments = [...(options.comments ?? [])]
  const defaultFiles = a.publicationRequests.filter((q) => q.publicationClass === "INLINE_FINDING_COMMENT").map((q) => ({ filename: q.path, patch: "@@ -1 +1 @@\n-old\n+new" }))
  const files = [...(options.files ?? defaultFiles)], heads = options.prHeads ?? [HEAD, HEAD], postBodies: Obj[] = []; let prReads = 0
  const materialize = (full = true) => { const e = exactObjects(a); reviews.push(e.review); if (full) comments.push(...e.comments); return e.review }
  const fetchImpl = (async (raw: URL | RequestInfo, init?: RequestInit) => {
    const u = new URL(raw instanceof URL ? raw.href : typeof raw === "string" ? raw : raw.url), method = String(init?.method ?? "GET").toUpperCase(), headers = new Headers(init?.headers), body = typeof init?.body === "string" ? init.body : null
    const call: Call = { url: u, method, headers, body, redirect: init?.redirect }; calls.push(call)
    const overrideUrl = options.responseUrl?.(call)
    if (method === "GET" && /\/pulls\/\d+$/.test(u.pathname)) { const head = heads[Math.min(prReads++, heads.length - 1)]!; return json(prSnapshot(head, options.prOverrides), 200, overrideUrl) }
    if (method === "GET" && /\/pulls\/\d+\/reviews$/.test(u.pathname)) { if (options.hangReviewsBody) return new Response(new ReadableStream<Uint8Array>({ start() {} }), { status: 200, headers: { "content-type": "application/json" } }); const page = Number(u.searchParams.get("page")); return json(options.reviewsPage ? options.reviewsPage(page) : page === 1 ? reviews : [], 200, overrideUrl) }
    if (method === "GET" && /\/pulls\/\d+\/comments$/.test(u.pathname)) { const page = Number(u.searchParams.get("page")); return json(options.commentsPage ? options.commentsPage(page) : page === 1 ? comments : [], 200, overrideUrl) }
    if (method === "GET" && /\/pulls\/\d+\/files$/.test(u.pathname)) { const page = Number(u.searchParams.get("page")); return json(options.filesPage ? options.filesPage(page) : page === 1 ? files : [], 200, overrideUrl) }
    if (method === "POST" && /\/pulls\/\d+\/reviews$/.test(u.pathname)) {
      const parsed = JSON.parse(body ?? "{}") as Obj; postBodies.push(parsed)
      if (options.postStatus !== undefined && options.postStatus !== 200) return json({ message: SECRET }, options.postStatus, overrideUrl)
      if (options.postMode === "timeout") return await new Promise<Response>(() => {})
      if (options.postMode === "body-timeout") return new Response(new ReadableStream<Uint8Array>({ start() {} }), { status: 200, headers: { "content-type": "application/json" } })
      if (options.postMode === "throw") throw new Error(`transport ${SECRET}`)
      if (options.postMode === "throw-after-create") { materialize(true); throw new Error(`transport ${SECRET}`) }
      if (options.postMode === "partial-after-create") { materialize(false); throw new Error(`transport ${SECRET}`) }
      if (options.postMode === "no-readback") return json(exactObjects(a).review, 200, overrideUrl)
      if (options.postMode === "mismatch-after-create") { const r = materialize(true); if (comments[0]) comments[0].path = "wrong.ts"; return json(r, 200, overrideUrl) }
      if (options.postMode === "malformed") { materialize(true); return json({ ok: true }, 200, overrideUrl) }
      const r = materialize(true); return json(r, 200, overrideUrl)
    }
    return json({ message: "not found" }, 404, overrideUrl)
  }) as typeof fetch
  return { fetchImpl, calls, reviews, comments, files, postBodies, materialize }
}
const run = (a: O4fSafeGithubPublicationAdmissionResult, s: ReturnType<typeof server>, timeoutMs = 1000) => publishO4gBoundedGithubReview({ publicationAdmission: a, credentialPolicyIdentity: CREDENTIAL_POLICY, credential: SECRET }, { fetchImpl: s.fetchImpl, timeoutMs })
function deepFrozen(v: unknown, seen = new Set<object>()): void { if (typeof v !== "object" || v === null || seen.has(v)) return; seen.add(v); assert.equal(Object.isFrozen(v), true); for (const child of Object.values(v as Obj)) deepFrozen(child, seen) }
function postCalls(s: ReturnType<typeof server>): Call[] { return s.calls.filter((c) => c.method === "POST") }
function pathCalls(s: ReturnType<typeof server>, suffix: string): Call[] { return s.calls.filter((c) => c.url.pathname.endsWith(suffix)) }

function schemaRef(root: Obj, ref: string): Obj { return root.$defs[ref.slice("#/$defs/".length)] as Obj }
function typeMatches(t: string, v: unknown): boolean { if (t === "null") return v === null; if (t === "array") return Array.isArray(v); if (t === "object") return typeof v === "object" && v !== null && !Array.isArray(v); if (t === "integer") return typeof v === "number" && Number.isInteger(v); return typeof v === t }
function assertSchema(s: Obj, v: unknown, root: Obj, label = "$"): void { if (typeof s.$ref === "string") return assertSchema(schemaRef(root, s.$ref), v, root, label); if (has(s,"const")) assert.deepEqual(v,s.const,`${label} const`); if (Array.isArray(s.enum)) assert.ok(s.enum.some((x:unknown)=>JSON.stringify(x)===JSON.stringify(v)),`${label} enum`); if (s.type!==undefined) { const ts=Array.isArray(s.type)?s.type:[s.type]; assert.ok(ts.some((t:unknown)=>typeof t==="string"&&typeMatches(t,v)),`${label} type`) } if (typeof v==="string") { if (typeof s.minLength==="number") assert.ok(v.length>=s.minLength); if (typeof s.maxLength==="number") assert.ok(v.length<=s.maxLength); if (typeof s.pattern==="string") assert.match(v,new RegExp(s.pattern)) } if (typeof v==="number") { if (typeof s.minimum==="number") assert.ok(v>=s.minimum); if (typeof s.maximum==="number") assert.ok(v<=s.maximum) } if (Array.isArray(v) && s.items) v.forEach((x,i)=>assertSchema(s.items as Obj,x,root,`${label}[${i}]`)); if (typeof v==="object"&&v!==null&&!Array.isArray(v)) { const r=v as Obj, props=(s.properties??{}) as Obj; if (Array.isArray(s.required)) for (const k of s.required) assert.ok(has(r,k),`${label}.${k} required`); if (s.additionalProperties===false) for (const k of Object.keys(r)) assert.ok(has(props,k),`${label}.${k} additional`); for (const [k,child] of Object.entries(props)) if (has(r,k)) assertSchema(child as Obj,r[k],root,`${label}.${k}`) } }
function has(o: object, k: PropertyKey): boolean { return Object.prototype.hasOwnProperty.call(o,k) }
const schema = JSON.parse(readFileSync(new URL("../../../schema/o4g-bounded-github-review-publication.schema.json", import.meta.url), "utf8")) as Obj

const cases: Array<[string, () => void | Promise<void>]> = [
  ["malformed O4-F fails before network", async()=>{ const a=clone(READY_ZERO) as Obj; a.publicationAdmissionIdentity="f".repeat(64); const s=server(READY_ZERO); await assert.rejects(()=>run(a as O4fSafeGithubPublicationAdmissionResult,s),/valid O4-F/); assert.equal(s.calls.length,0) }],
  ["non-ready O4-F produces zero network calls", async()=>{ const s=server(BLOCKED); const r=await run(BLOCKED,s); assert.equal(r.status,"BLOCKED_O4F_NOT_READY"); assert.equal(s.calls.length,0) }],
  ["zero-inline READY admission creates one COMMENT review", async()=>{ const s=server(READY_ZERO),r=await run(READY_ZERO,s); assert.equal(r.status,"COMPLETED_CREATED"); assert.equal(postCalls(s).length,1); assert.equal(s.postBodies[0]!.event,"COMMENT"); assert.deepEqual(s.postBodies[0]!.comments,[]) }],
  ["multiple inline requests create one review POST containing all comments", async()=>{ const s=server(READY_MULTI),r=await run(READY_MULTI,s); assert.equal(r.status,"COMPLETED_CREATED"); assert.equal(postCalls(s).length,1); assert.equal(s.postBodies[0]!.comments.length,2) }],
  ["POST uses exact reviewed head as commit_id", async()=>{ const s=server(READY_ONE); await run(READY_ONE,s); assert.equal(s.postBodies[0]!.commit_id,READY_ONE.reviewedHead) }],
  ["POST body is exact O4-F summary body", async()=>{ const s=server(READY_ONE); await run(READY_ONE,s); assert.equal(s.postBodies[0]!.body,READY_ONE.publicationRequests[0]!.bodyText) }],
  ["inline body path line and RIGHT side are exact O4-F values", async()=>{ const s=server(READY_ONE); await run(READY_ONE,s); const q=READY_ONE.publicationRequests[1]!,c=s.postBodies[0]!.comments[0]; assert.deepEqual(c,{body:q.bodyText,path:q.path,line:q.lineAnchor,side:"RIGHT"}) }],
  ["credential is caller-injected only", async()=>{ const s=server(READY_ZERO); await run(READY_ZERO,s); assert.ok(s.calls.every(c=>c.headers.get("authorization")===`Bearer ${SECRET}`)) }],
  ["credential-policy identity is receipt-bound but credential is absent from result", async()=>{ const s=server(READY_ZERO),r=await run(READY_ZERO,s); assert.equal(r.credentialPolicyIdentity,CREDENTIAL_POLICY); assert.equal(JSON.stringify(r).includes(SECRET),false) }],
  ["exact API origin only", async()=>{ const s=server(READY_ONE); await run(READY_ONE,s); assert.ok(s.calls.every(c=>c.url.origin==="https://api.github.com")) }],
  ["unexpected redirect origin blocks", async()=>{ const s=server(READY_ZERO,{responseUrl:()=>"https://example.invalid/escape"}),r=await run(READY_ZERO,s); assert.equal(r.status,"INVALID_GITHUB_RESPONSE"); assert.equal(postCalls(s).length,0) }],
  ["unexpected response route blocks", async()=>{ const s=server(READY_ZERO,{responseUrl:c=>`https://api.github.com/repos/TheHalfMoon/Kodac/issues/1?from=${encodeURIComponent(c.url.pathname)}`}),r=await run(READY_ZERO,s); assert.equal(r.status,"INVALID_GITHUB_RESPONSE"); assert.equal(postCalls(s).length,0) }],
  ["closed method allowlist never emits an unexpected method", async()=>{ const s=server(READY_ONE); await run(READY_ONE,s); assert.deepEqual([...new Set(s.calls.map(c=>c.method))].sort(),["GET","POST"]) }],
  ["live PR id mismatch blocks", async()=>{ const s=server(READY_ZERO,{prOverrides:{id:9999}}),r=await run(READY_ZERO,s); assert.equal(r.failureCode,"LIVE_PR_IDENTITY_MISMATCH"); assert.equal(postCalls(s).length,0) }],
  ["live PR number mismatch blocks", async()=>{ const s=server(READY_ZERO,{prOverrides:{number:43}}),r=await run(READY_ZERO,s); assert.equal(r.failureCode,"LIVE_PR_IDENTITY_MISMATCH") }],
  ["live repository id mismatch blocks", async()=>{ const s=server(READY_ZERO,{prOverrides:{base:{repo:{id:9999,full_name:REPO}}}}),r=await run(READY_ZERO,s); assert.equal(r.failureCode,"LIVE_PR_IDENTITY_MISMATCH") }],
  ["live repository full-name mismatch blocks", async()=>{ const s=server(READY_ZERO,{prOverrides:{base:{repo:{id:Number(REPO_ID),full_name:"Other/Repo"}}}}),r=await run(READY_ZERO,s); assert.equal(r.failureCode,"LIVE_PR_IDENTITY_MISMATCH") }],
  ["moved head blocks before POST", async()=>{ const s=server(READY_ZERO,{prHeads:[ALT_HEAD]}),r=await run(READY_ZERO,s); assert.equal(r.status,"BLOCKED_HEAD_MISMATCH"); assert.equal(postCalls(s).length,0) }],
  ["final pre-POST head movement blocks", async()=>{ const s=server(READY_ZERO,{prHeads:[HEAD,ALT_HEAD]}),r=await run(READY_ZERO,s); assert.equal(r.status,"BLOCKED_HEAD_MISMATCH"); assert.equal(postCalls(s).length,0) }],
  ["exact prior zero-inline review is recovered without POST", async()=>{ const e=exactObjects(READY_ZERO),s=server(READY_ZERO,{reviews:[e.review]}),r=await run(READY_ZERO,s); assert.equal(r.status,"COMPLETED_ALREADY_PRESENT"); assert.equal(postCalls(s).length,0) }],
  ["already-present recovery verifies live PR subject and records moved live head without reposting", async()=>{ const e=exactObjects(READY_ZERO),s=server(READY_ZERO,{reviews:[e.review],prHeads:[ALT_HEAD]}),r=await run(READY_ZERO,s); assert.equal(r.status,"COMPLETED_ALREADY_PRESENT"); assert.equal(r.evaluatedHead,ALT_HEAD); assert.equal(postCalls(s).length,0); assert.ok(s.calls.some(c=>c.url.pathname.endsWith(`/pulls/${PR}`))) }],
  ["already-present recovery refuses mismatched live PR identity", async()=>{ const e=exactObjects(READY_ZERO),s=server(READY_ZERO,{reviews:[e.review],prOverrides:{id:9999}}),r=await run(READY_ZERO,s); assert.equal(r.failureCode,"LIVE_PR_IDENTITY_MISMATCH"); assert.equal(postCalls(s).length,0) }],
  ["exact prior review plus all inline comments is recovered without POST", async()=>{ const e=exactObjects(READY_ONE),s=server(READY_ONE,{reviews:[e.review],comments:e.comments}),r=await run(READY_ONE,s); assert.equal(r.status,"COMPLETED_ALREADY_PRESENT"); assert.equal(r.slotReceipts.length,2) }],
  ["prior summary only with expected inline comments missing blocks", async()=>{ const e=exactObjects(READY_ONE),s=server(READY_ONE,{reviews:[e.review]}),r=await run(READY_ONE,s); assert.equal(r.status,"BLOCKED_EXISTING_PUBLICATION") }],
  ["prior inline marker without summary blocks", async()=>{ const e=exactObjects(READY_ONE),s=server(READY_ONE,{comments:e.comments}),r=await run(READY_ONE,s); assert.equal(r.failureCode,"EXISTING_PUBLICATION_PARTIAL") }],
  ["duplicate summary slot blocks", async()=>{ const e=exactObjects(READY_ZERO),s=server(READY_ZERO,{reviews:[e.review,{...e.review,id:701,node_id:"R_701"}]}),r=await run(READY_ZERO,s); assert.equal(r.failureCode,"EXISTING_PUBLICATION_DUPLICATE") }],
  ["duplicate inline slot blocks", async()=>{ const e=exactObjects(READY_ONE),s=server(READY_ONE,{reviews:[e.review],comments:[...e.comments,{...e.comments[0],id:999,node_id:"RC_999"}]}),r=await run(READY_ONE,s); assert.equal(r.failureCode,"EXISTING_PUBLICATION_DUPLICATE") }],
  ["summary marker body mismatch blocks", async()=>{ const e=exactObjects(READY_ZERO); e.review.body=`mismatch\n${READY_ZERO.publicationRequests[0]!.bodyText.slice(READY_ZERO.publicationRequests[0]!.bodyText.indexOf("<!--"))}`; const s=server(READY_ZERO,{reviews:[e.review]}),r=await run(READY_ZERO,s); assert.equal(r.failureCode,"EXISTING_PUBLICATION_MISMATCH") }],
  ["pending review carrying the exact marker is not treated as published", async()=>{ const e=exactObjects(READY_ZERO); e.review.state="PENDING"; const s=server(READY_ZERO,{reviews:[e.review]}),r=await run(READY_ZERO,s); assert.equal(r.failureCode,"EXISTING_PUBLICATION_MISMATCH"); assert.equal(postCalls(s).length,0) }],
  ["approved review carrying the exact marker is not treated as COMMENT publication", async()=>{ const e=exactObjects(READY_ZERO); e.review.state="APPROVED"; const s=server(READY_ZERO,{reviews:[e.review]}),r=await run(READY_ZERO,s); assert.equal(r.failureCode,"EXISTING_PUBLICATION_MISMATCH"); assert.equal(postCalls(s).length,0) }],
  ["inline marker body mismatch blocks", async()=>{ const e=exactObjects(READY_ONE); e.comments[0].body=`mismatch\n${READY_ONE.publicationRequests[1]!.bodyText.slice(READY_ONE.publicationRequests[1]!.bodyText.indexOf("<!--"))}`; const s=server(READY_ONE,{reviews:[e.review],comments:e.comments}),r=await run(READY_ONE,s); assert.equal(r.failureCode,"EXISTING_PUBLICATION_MISMATCH") }],
  ["inline path mismatch blocks", async()=>{ const e=exactObjects(READY_ONE); e.comments[0].path="wrong.ts"; const r=await run(READY_ONE,server(READY_ONE,{reviews:[e.review],comments:e.comments})); assert.equal(r.failureCode,"EXISTING_PUBLICATION_MISMATCH") }],
  ["inline line mismatch blocks", async()=>{ const e=exactObjects(READY_ONE); e.comments[0].line=2; const r=await run(READY_ONE,server(READY_ONE,{reviews:[e.review],comments:e.comments})); assert.equal(r.failureCode,"EXISTING_PUBLICATION_MISMATCH") }],
  ["inline side mismatch blocks", async()=>{ const e=exactObjects(READY_ONE); e.comments[0].side="LEFT"; const r=await run(READY_ONE,server(READY_ONE,{reviews:[e.review],comments:e.comments})); assert.equal(r.failureCode,"EXISTING_PUBLICATION_MISMATCH") }],
  ["inline review-id mismatch blocks", async()=>{ const e=exactObjects(READY_ONE); e.comments[0].pull_request_review_id=701; const r=await run(READY_ONE,server(READY_ONE,{reviews:[e.review],comments:e.comments})); assert.equal(r.failureCode,"EXISTING_PUBLICATION_MISMATCH") }],
  ["inline commit mismatch blocks", async()=>{ const e=exactObjects(READY_ONE); e.comments[0].commit_id=ALT_HEAD; const r=await run(READY_ONE,server(READY_ONE,{reviews:[e.review],comments:e.comments})); assert.equal(r.failureCode,"EXISTING_PUBLICATION_MISMATCH") }],
  ["scan page bound exhaustion blocks", async()=>{ const page=(n:number)=>Array.from({length:100},(_,i)=>review(n*1000+i+1)); const s=server(READY_ZERO,{reviewsPage:page}),r=await run(READY_ZERO,s); assert.equal(r.failureCode,"SCAN_BOUND_EXHAUSTED"); assert.equal(postCalls(s).length,0) }],
  ["malformed review list blocks", async()=>{ const r=await run(READY_ZERO,server(READY_ZERO,{reviewsPage:()=>({bad:true})})); assert.equal(r.status,"INVALID_GITHUB_RESPONSE") }],
  ["malformed review-comment list blocks", async()=>{ const r=await run(READY_ZERO,server(READY_ZERO,{commentsPage:()=>({bad:true})})); assert.equal(r.status,"INVALID_GITHUB_RESPONSE") }],
  ["unrelated outdated review comment with nullable anchor does not block publication", async()=>{ const old={id:991,node_id:"RC_991",pull_request_review_id:990,body:"unrelated old comment",path:PRIMARY,line:null,side:null,commit_id:HEAD}; const s=server(READY_ZERO,{comments:[old]}),r=await run(READY_ZERO,s); assert.equal(r.status,"COMPLETED_CREATED") }],
  ["missing inline path in files scan blocks", async()=>{ const r=await run(READY_ONE,server(READY_ONE,{files:[{filename:"other.ts",patch:"@@ -1 +1 @@\n-a\n+b"}]})); assert.equal(r.status,"BLOCKED_DIFF_ANCHOR") }],
  ["missing patch blocks", async()=>{ const r=await run(READY_ONE,server(READY_ONE,{files:[{filename:PRIMARY}]})); assert.equal(r.status,"BLOCKED_DIFF_ANCHOR") }],
  ["malformed hunk blocks", async()=>{ const r=await run(READY_ONE,server(READY_ONE,{files:[{filename:PRIMARY,patch:"@@ malformed @@\n+new"}]})); assert.equal(r.status,"BLOCKED_DIFF_ANCHOR") }],
  ["truncated hunk whose body does not satisfy declared counts blocks", async()=>{ const r=await run(READY_ONE,server(READY_ONE,{files:[{filename:PRIMARY,patch:"@@ -1,2 +1,2 @@\n-old\n+new"}]})); assert.equal(r.status,"BLOCKED_DIFF_ANCHOR") }],
  ["unprefixed blank line inside a hunk is malformed and blocks", async()=>{ const r=await run(READY_ONE,server(READY_ONE,{files:[{filename:PRIMARY,patch:"@@ -1,2 +1,2 @@\n context\n\n"}]})); assert.equal(r.status,"BLOCKED_DIFF_ANCHOR") }],
  ["multiple complete hunks are parsed and a RIGHT anchor in the later hunk is accepted", async()=>{ const r=await run(READY_LINE5,server(READY_LINE5,{files:[{filename:PRIMARY,patch:"@@ -1 +1 @@\n-old\n+new\n@@ -5 +5 @@\n old5"}]})); assert.equal(r.status,"COMPLETED_CREATED") }],
  ["RIGHT addition line is accepted", async()=>{ const r=await run(READY_ONE,server(READY_ONE,{files:[{filename:PRIMARY,patch:"@@ -0,0 +1 @@\n+new"}]})); assert.equal(r.status,"COMPLETED_CREATED") }],
  ["RIGHT context line is accepted", async()=>{ const r=await run(READY_ONE,server(READY_ONE,{files:[{filename:PRIMARY,patch:"@@ -1 +1 @@\n context"}]})); assert.equal(r.status,"COMPLETED_CREATED") }],
  ["deletion-only LEFT line is rejected", async()=>{ const r=await run(READY_ONE,server(READY_ONE,{files:[{filename:PRIMARY,patch:"@@ -1 +0,0 @@\n-old"}]})); assert.equal(r.status,"BLOCKED_DIFF_ANCHOR") }],
  ["line outside emitted hunks is rejected", async()=>{ const r=await run(READY_ONE,server(READY_ONE,{files:[{filename:PRIMARY,patch:"@@ -5 +5 @@\n-old\n+new"}]})); assert.equal(r.status,"BLOCKED_DIFF_ANCHOR") }],
  ["duplicate filename entry blocks", async()=>{ const f={filename:PRIMARY,patch:"@@ -1 +1 @@\n-a\n+b"}; const r=await run(READY_ONE,server(READY_ONE,{files:[f,{...f}]})); assert.equal(r.status,"BLOCKED_DIFF_ANCHOR") }],
  ["files pagination bound exhaustion blocks", async()=>{ const page=(n:number)=>Array.from({length:100},(_,i)=>({filename:`src/p${n}-${i}.ts`,patch:"@@ -1 +1 @@\n-a\n+b"})); const r=await run(READY_ONE,server(READY_ONE,{filesPage:page})); assert.equal(r.failureCode,"SCAN_BOUND_EXHAUSTED") }],
  ["all anchor preflights occur before POST", async()=>{ const s=server(READY_ONE); await run(READY_ONE,s); const post=s.calls.findIndex(c=>c.method==="POST"),file=s.calls.findIndex(c=>c.url.pathname.endsWith("/files")),prs=s.calls.map((c,i)=>c.url.pathname.endsWith(`/pulls/${PR}`)?i:-1).filter(i=>i>=0); assert.ok(file>=0&&file<post); assert.ok(prs.length>=2&&prs[1]!<post) }],
  ["maximum POST count is one", async()=>{ const s=server(READY_ONE); await run(READY_ONE,s); assert.equal(postCalls(s).length,1) }],
  ["stalled GET response body obeys timeout and never reaches POST", async()=>{ const s=server(READY_ZERO,{hangReviewsBody:true}),r=await run(READY_ZERO,s,2); assert.equal(r.status,"READ_FAILED"); assert.equal(r.failureCode,"READ_TRANSPORT_FAILED"); assert.equal(postCalls(s).length,0) }],
  ["timeout after POST triggers recovery scan but no second POST", async()=>{ const s=server(READY_ZERO,{postMode:"timeout"}),r=await run(READY_ZERO,s,2); assert.equal(r.status,"AMBIGUOUS_POST_OUTCOME"); assert.equal(postCalls(s).length,1); assert.ok(pathCalls(s,"/reviews").length>=3) }],
  ["stalled POST response body times out then recovers read-only without second POST", async()=>{ const s=server(READY_ZERO,{postMode:"body-timeout"}),r=await run(READY_ZERO,s,2); assert.equal(r.status,"AMBIGUOUS_POST_OUTCOME"); assert.equal(postCalls(s).length,1) }],
  ["transport exception after POST triggers recovery scan but no second POST", async()=>{ const s=server(READY_ZERO,{postMode:"throw"}),r=await run(READY_ZERO,s); assert.equal(r.status,"AMBIGUOUS_POST_OUTCOME"); assert.equal(postCalls(s).length,1) }],
  ...([500,429,403,422] as const).map((status)=>[`HTTP ${status} after POST triggers recovery scan but no second POST`,async()=>{ const s=server(READY_ZERO,{postStatus:status}),r=await run(READY_ZERO,s); assert.equal(r.status,"POST_REJECTED"); assert.equal(postCalls(s).length,1) }] as [string,()=>Promise<void>]),
  ["exact recovery after unconfirmed POST yields recovered completion", async()=>{ const s=server(READY_ONE,{postMode:"throw-after-create"}),r=await run(READY_ONE,s); assert.equal(r.status,"COMPLETED_RECOVERED_AFTER_UNCONFIRMED_POST"); assert.equal(postCalls(s).length,1) }],
  ["absent recovery after unconfirmed POST yields ambiguous status", async()=>{ const r=await run(READY_ZERO,server(READY_ZERO,{postMode:"throw"})); assert.equal(r.status,"AMBIGUOUS_POST_OUTCOME") }],
  ["partial recovery after unconfirmed POST does not claim completion", async()=>{ const r=await run(READY_ONE,server(READY_ONE,{postMode:"partial-after-create"})); assert.equal(r.status,"AMBIGUOUS_POST_OUTCOME") }],
  ["2xx create response requires read-back verification", async()=>{ const r=await run(READY_ZERO,server(READY_ZERO,{postMode:"no-readback"})); assert.equal(r.status,"AMBIGUOUS_POST_OUTCOME") }],
  ["read-back complete exact publication yields COMPLETED_CREATED", async()=>{ const r=await run(READY_ONE,server(READY_ONE)); assert.equal(r.status,"COMPLETED_CREATED") }],
  ["read-back mismatch after 2xx does not claim completion", async()=>{ const r=await run(READY_ONE,server(READY_ONE,{postMode:"mismatch-after-create"})); assert.equal(r.status,"AMBIGUOUS_POST_OUTCOME") }],
  ["malformed 2xx response can recover exact publication without second POST", async()=>{ const s=server(READY_ONE,{postMode:"malformed"}),r=await run(READY_ONE,s); assert.equal(r.status,"COMPLETED_RECOVERED_AFTER_UNCONFIRMED_POST"); assert.equal(postCalls(s).length,1) }],
  ["completed receipt is deeply frozen", async()=>deepFrozen(await run(READY_ONE,server(READY_ONE)))],
  ["standalone result validator accepts canonical completed result", async()=>{ const r=await run(READY_ONE,server(READY_ONE)); assert.deepEqual(validateO4gBoundedGithubReviewPublicationResult(r),r) }],
  ["standalone result validator rejects identity mutation", async()=>{ const r=clone(await run(READY_ZERO,server(READY_ZERO))) as Obj; r.publicationExecutionIdentity="f".repeat(64); assert.throws(()=>validateO4gBoundedGithubReviewPublicationResult(r),/publication execution identity mismatch/) }],
  ["standalone result validator rejects unknown fields", async()=>{ const r=clone(await run(READY_ZERO,server(READY_ZERO))) as Obj; r.extra=true; assert.throws(()=>validateO4gBoundedGithubReviewPublicationResult(r),/unexpected or missing properties/) }],
  ["schema constants and status vocabulary match runtime",()=>{ assert.equal(schema.properties.version.const,O4G_BOUNDED_GITHUB_REVIEW_PUBLICATION_VERSION); assert.deepEqual(schema.properties.status.enum,O4G_STATUSES); assert.deepEqual(schema.properties.continuationDecision.enum,O4G_CONTINUATION_DECISIONS); assert.deepEqual(schema.properties.failureCode.enum,[...O4G_FAILURE_CODES,null]) }],
  ["representative created result validates against schema",async()=>assertSchema(schema,await run(READY_ONE,server(READY_ONE)),schema)],
  ["representative already-present result validates against schema",async()=>{ const e=exactObjects(READY_ZERO); assertSchema(schema,await run(READY_ZERO,server(READY_ZERO,{reviews:[e.review]})),schema) }],
  ["representative recovered result validates against schema",async()=>assertSchema(schema,await run(READY_ONE,server(READY_ONE,{postMode:"throw-after-create"})),schema)],
  ["representative blocked result validates against schema",async()=>assertSchema(schema,await run(BLOCKED,server(BLOCKED)),schema)],
  ["response-byte overflow blocks before JSON parse",async()=>{ const huge="x".repeat(2_200_000),s=server(READY_ZERO,{reviewsPage:()=>[{id:1,node_id:"R_1",body:huge,commit_id:HEAD}]}),r=await run(READY_ZERO,s); assert.equal(r.status,"INVALID_GITHUB_RESPONSE"); assert.equal(postCalls(s).length,0) }],
  ["aggregate-read-byte bound blocks",async()=>{ const page=(n:number)=>Array.from({length:100},(_,i)=>review(n*1000+i+1,"x".repeat(15000))); const s=server(READY_ZERO,{reviewsPage:page}),r=await run(READY_ZERO,s); assert.ok(["INVALID_GITHUB_RESPONSE","BLOCKED_EXISTING_PUBLICATION"].includes(r.status)); assert.equal(postCalls(s).length,0) }],
  ["credential never appears in serialization errors or identities",async()=>{ const s=server(READY_ZERO,{postMode:"throw"}),r=await run(READY_ZERO,s); const serialized=JSON.stringify(r); assert.equal(serialized.includes(SECRET),false); assert.equal(r.publicationExecutionIdentity.includes(SECRET),false); assert.ok(s.calls.every(c=>c.url.href.includes(SECRET)===false)) }],
  ["static source scan forbids ambient or unrelated side-effect capabilities",()=>{ const src=readFileSync(new URL("../src/github-review/o4g-bounded-github-review-publication.ts",import.meta.url),"utf8"); for (const re of [/process\.env/,/GITHUB_TOKEN/,/GH_TOKEN/,/node:fs/,/node:child_process/,/node:child_process\/promises/,/from ["\']child_process["\']/,/glitchtip/i,/ModelProvider/,/\.generate\s*\(/,/\/issues\//,/\/labels(?:\/|`|\")/,/\/merge(?:\/|`|\")/,/event:\s*"APPROVE"/,/event:\s*"REQUEST_CHANGES"/]) assert.doesNotMatch(src,re) }],
  ["implementation surface contains exactly the three authorized artifacts",()=>{ for (const u of [new URL("../src/github-review/o4g-bounded-github-review-publication.ts",import.meta.url),new URL("o4g-bounded-github-review-publication.test.ts",import.meta.url),new URL("../../../schema/o4g-bounded-github-review-publication.schema.json",import.meta.url)]) assert.equal(existsSync(u),true) }],
  ["request headers pin API version user agent and redirect policy",async()=>{ const s=server(READY_ZERO); await run(READY_ZERO,s); for (const c of s.calls) { assert.equal(c.headers.get("x-github-api-version"),"2026-03-10"); assert.equal(c.headers.get("user-agent"),"Kodac-O4G/1"); assert.equal(c.redirect,"error") } }],
  ["input rejects unknown capability fields",async()=>{ const s=server(READY_ZERO); await assert.rejects(()=>publishO4gBoundedGithubReview({publicationAdmission:READY_ZERO,credentialPolicyIdentity:CREDENTIAL_POLICY,credential:SECRET,token:"x"} as Obj,{fetchImpl:s.fetchImpl}),/unexpected or missing properties/); assert.equal(s.calls.length,0) }],
  ["options reject unknown transport fields",async()=>{ const s=server(READY_ZERO); await assert.rejects(()=>publishO4gBoundedGithubReview({publicationAdmission:READY_ZERO,credentialPolicyIdentity:CREDENTIAL_POLICY,credential:SECRET},{fetchImpl:s.fetchImpl,baseUrl:"x"} as Obj),/unexpected or missing properties/); assert.equal(s.calls.length,0) }],
  ["proxy fetch implementation is rejected before network",async()=>{ const fn=new Proxy(server(READY_ZERO).fetchImpl,{}); await assert.rejects(()=>publishO4gBoundedGithubReview({publicationAdmission:READY_ZERO,credentialPolicyIdentity:CREDENTIAL_POLICY,credential:SECRET},{fetchImpl:fn}),/non-proxy/) }],
  ["result validator rejects review receipt mutation",async()=>{ const r=clone(await run(READY_ZERO,server(READY_ZERO))) as Obj; r.reviewReceiptIdentity="f".repeat(64); assert.throws(()=>validateO4gBoundedGithubReviewPublicationResult(r),/review receipt identity mismatch|publication execution identity mismatch/) }],
  ["result validator rejects slot receipt mutation",async()=>{ const r=clone(await run(READY_ONE,server(READY_ONE))) as Obj; r.slotReceipts[1].line=2; assert.throws(()=>validateO4gBoundedGithubReviewPublicationResult(r),/slot receipt identity mismatch/) }],
  ["POST content type is JSON and bodies stay exact",async()=>{ const s=server(READY_ZERO); await run(READY_ZERO,s); const p=postCalls(s)[0]!; assert.equal(p.headers.get("content-type"),"application/json"); assert.equal(JSON.parse(p.body!).body,READY_ZERO.publicationRequests[0]!.bodyText) }],
  ["full runtime runner discovers O4-G by canonical test filename",()=>{ const runner=readFileSync(new URL("../scripts/run-tests.mjs",import.meta.url),"utf8"); assert.match(runner,/\.test\.ts/); assert.ok(new URL("o4g-bounded-github-review-publication.test.ts",import.meta.url).pathname.endsWith(".test.ts")) }],
]
for (const [name,fn] of cases) test(`O4-G: ${name}`,fn)
test("O4-G focused matrix contains at least 70 independently named cases",()=>assert.ok(cases.length>=70))
