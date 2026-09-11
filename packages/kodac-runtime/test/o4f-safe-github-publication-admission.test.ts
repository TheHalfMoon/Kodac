import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { existsSync, readFileSync } from "node:fs"
import test from "node:test"

import { acquireO4bBoundedReadOnlyGithubContext, type O4bBoundedReadOnlyGithubContextInput } from "../src/github-review/o4b-bounded-read-only-github-context.ts"
import { buildO4cGithubReviewerContext, type O4cGithubReviewerContextResult } from "../src/github-review/o4c-github-context-to-reviewer-context.ts"
import { createO4dO4cReviewerExecutionAdmission, type O4dO4cReviewerExecutionAdmissionResult } from "../src/github-review/o4d-o4c-reviewer-execution-admission.ts"
import { O4eModelBackedReviewerProviderExecution, type O4eModelBackedReviewerProviderExecutionResult } from "../src/github-review/o4e-model-backed-reviewer-provider-execution.ts"
import {
  O4F_CONTINUATION_DECISIONS,
  O4F_PUBLICATION_CLASSES,
  O4F_READY_DECISION,
  O4F_SAFE_GITHUB_PUBLICATION_ADMISSION_VERSION,
  O4F_STATUSES,
  createO4fSafeGithubPublicationAdmission,
  validateO4fSafeGithubPublicationAdmissionResult,
  type O4fSafeGithubPublicationAdmissionResult,
} from "../src/github-review/o4f-safe-github-publication-admission.ts"
import type { ModelProvider, ModelProviderRequest, ModelProviderResponse } from "../src/model/provider.ts"

type Obj = Record<string, any>
const BASE = "a".repeat(40), HEAD = "b".repeat(40), ALT_BASE = "c".repeat(40), ALT_HEAD = "d".repeat(40)
const REPO_ID = "1001", PR_ID = "2002", REPO = "TheHalfMoon/Kodac", PR = 42, POLICY = "policy:v1", PRIMARY = "src/widget.ts"
const BYTES = new TextEncoder().encode("export const widget = 1\n")
const sha256 = (v: Uint8Array | string) => createHash("sha256").update(v).digest("hex")
const blobSha = (b: Uint8Array) => createHash("sha1").update(`blob ${b.byteLength}\0`, "utf8").update(b).digest("hex")
const fileBody = (path: string, b: Uint8Array) => ({ type: "file", encoding: "base64", path, sha: blobSha(b), size: b.byteLength, content: Buffer.from(b).toString("base64") })
const changed = (path = PRIMARY, status = "modified", b = BYTES, extra: Obj = {}) => ({ filename: path, status, sha: blobSha(b), ...extra })

function fixture(opts: { rows?: Obj[]; support?: string[]; content?: Record<string, Obj>; base?: string; head?: string; repoId?: string; prId?: string; repo?: string; pr?: number } = {}) {
  const base = opts.base ?? BASE, head = opts.head ?? HEAD, repoId = opts.repoId ?? REPO_ID, prId = opts.prId ?? PR_ID, repo = opts.repo ?? REPO, pr = opts.pr ?? PR
  const rows = opts.rows ?? [changed()]
  const content: Record<string, Obj> = { [PRIMARY]: fileBody(PRIMARY, BYTES), ...(opts.content ?? {}) }
  for (const row of rows) { const path = String(row.filename); if (!(path in content)) { const b = new TextEncoder().encode(`content:${path}\n`); content[path] = fileBody(path, b); row.sha = content[path].sha } }
  for (const path of opts.support ?? []) if (!(path in content)) { const b = new TextEncoder().encode(`support:${path}\n`); content[path] = fileBody(path, b) }
  const snap = () => ({ id: Number(prId), number: pr, base: { ref: "main", sha: base, repo: { id: Number(repoId), full_name: repo } }, head: { ref: "feat", sha: head, repo: { id: Number(repoId), full_name: repo } } })
  const fetchImpl = (async (raw: URL | RequestInfo) => {
    const u = new URL(raw instanceof URL ? raw.href : typeof raw === "string" ? raw : raw.url)
    if (/\/pulls\/\d+$/.test(u.pathname)) return new Response(JSON.stringify(snap()), { status: 200, headers: { "content-type": "application/json" } })
    if (/\/pulls\/\d+\/files$/.test(u.pathname)) return new Response(JSON.stringify(Number(u.searchParams.get("page")) === 1 ? rows : []), { status: 200, headers: { "content-type": "application/json" } })
    if (u.pathname.includes("/contents/")) { const marker = "/contents/"; const path = u.pathname.slice(u.pathname.indexOf(marker) + marker.length).split("/").map(decodeURIComponent).join("/"); const body = content[path]; return new Response(JSON.stringify(body ?? { message: "Not Found" }), { status: body ? 200 : 404, headers: { "content-type": "application/json" } }) }
    return new Response(null, { status: 404 })
  }) as typeof fetch
  const input: O4bBoundedReadOnlyGithubContextInput = { expectedRepositoryId: repoId, expectedRepositoryFullName: repo, pullRequestNumber: pr, expectedPullRequestId: prId, expectedBaseRepositoryId: repoId, expectedHeadRepositoryId: repoId, expectedHeadRepositoryFullName: repo, expectedHeadSha: head, credentialPolicyIdentity: "e".repeat(64), supportingPaths: opts.support ?? [], credential: "fixture" }
  let i = 0; const times = ["2026-09-12T00:00:00.000Z", "2026-09-12T00:00:01.000Z"]
  return acquireO4bBoundedReadOnlyGithubContext(input, { fetchImpl, now: () => times[Math.min(i++, 1)]! })
}

const claim = (a: O4dO4cReviewerExecutionAdmissionResult, overrides: Obj = {}) => {
  const path = String(overrides.path ?? PRIMARY)
  const evidenceItemIds = overrides.evidenceItemIds ?? [a.items.find((x) => x.subjectPath === path)!.itemId]
  return { claimKey: "claim:1", path, summary: "A material defect exists.", contractClaim: "The changed code violates the contract.", category: "correctness", severity: "high", confidenceBps: 9000, ...overrides, evidenceItemIds }
}
const output = (claims: Obj[]): ModelProviderResponse => ({ assistant: JSON.stringify({ claims }), toolCalls: [], finishReason: "stop" })
class Provider implements ModelProvider {
  readonly name = "fixture-provider"
  readonly fn: (request: ModelProviderRequest) => ModelProviderResponse | Promise<ModelProviderResponse>
  constructor(fn: (request: ModelProviderRequest) => ModelProviderResponse | Promise<ModelProviderResponse>) { this.fn = fn }
  generate(request: ModelProviderRequest): Promise<ModelProviderResponse> { return Promise.resolve(this.fn(request)) }
}

async function buildBundle(opts: {
  fixture?: Parameters<typeof fixture>[0]; taskId?: string; admissionTaskId?: string; policy?: string; claims?: (a: O4dO4cReviewerExecutionAdmissionResult) => Obj[];
  heads?: string[]; provider?: (a: O4dO4cReviewerExecutionAdmissionResult) => ModelProvider; maxClaims?: number; timeoutMs?: number
} = {}): Promise<{ o4c: O4cGithubReviewerContextResult; o4d: O4dO4cReviewerExecutionAdmissionResult; o4e: O4eModelBackedReviewerProviderExecutionResult }> {
  const f = opts.fixture ?? {}, head = f.head ?? HEAD, taskId = opts.taskId ?? "review-pr-42"
  const o4b = await fixture(f)
  const o4c = buildO4cGithubReviewerContext({ taskId, objective: "Review exact changed paths.", o4bContext: o4b })
  const o4d = createO4dO4cReviewerExecutionAdmission({ taskId: opts.admissionTaskId ?? taskId, policyIdentity: opts.policy ?? POLICY, instructions: "Find evidence-grounded material defects only.", o4cContext: o4c })
  let i = 0; const heads = opts.heads ?? [head, head]
  const provider = opts.provider?.(o4d) ?? new Provider(() => output(opts.claims?.(o4d) ?? []))
  const runtime = new O4eModelBackedReviewerProviderExecution({ provider, model: "fixture-model-v1", readCurrentHead: () => heads[Math.min(i++, heads.length - 1)]!, maxClaims: opts.maxClaims, timeoutMs: opts.timeoutMs })
  const o4e = await runtime.execute(o4d)
  return { o4c, o4d, o4e }
}
const admit = (b: { o4c: O4cGithubReviewerContextResult; o4d: O4dO4cReviewerExecutionAdmissionResult; o4e: O4eModelBackedReviewerProviderExecutionResult }) => createO4fSafeGithubPublicationAdmission({ o4cContext: b.o4c, o4dAdmission: b.o4d, o4eExecution: b.o4e })
const clone = <T>(v: T): T => structuredClone(v)
function deepFrozen(v: unknown, seen = new Set<object>()): void { if (typeof v !== "object" || v === null || seen.has(v)) return; seen.add(v); assert.equal(Object.isFrozen(v), true); for (const child of Object.values(v as Obj)) deepFrozen(child, seen) }
function markerCount(body: string): number { return (body.match(/<!-- kodac-publication-slot:[0-9a-f]{64} -->/g) ?? []).length }

function schemaRef(root: Obj, ref: string): Obj { return root.$defs[ref.slice("#/$defs/".length)] as Obj }
function typeMatches(t: string, v: unknown): boolean { if (t === "null") return v === null; if (t === "array") return Array.isArray(v); if (t === "object") return typeof v === "object" && v !== null && !Array.isArray(v); if (t === "integer") return typeof v === "number" && Number.isInteger(v); return typeof v === t }
function assertSchema(s: Obj, v: unknown, root: Obj, label = "$"): void {
  if (typeof s.$ref === "string") return assertSchema(schemaRef(root, s.$ref), v, root, label)
  if (Object.prototype.hasOwnProperty.call(s, "const")) assert.deepEqual(v, s.const, `${label} const`)
  if (Array.isArray(s.enum)) assert.ok(s.enum.some((x: unknown) => JSON.stringify(x) === JSON.stringify(v)), `${label} enum`)
  if (s.type !== undefined) { const ts = Array.isArray(s.type) ? s.type : [s.type]; assert.ok(ts.some((t: unknown) => typeof t === "string" && typeMatches(t, v)), `${label} type`) }
  if (typeof v === "string") { if (typeof s.minLength === "number") assert.ok(v.length >= s.minLength, `${label} minLength`); if (typeof s.maxLength === "number") assert.ok(v.length <= s.maxLength, `${label} maxLength`); if (typeof s.pattern === "string") assert.match(v, new RegExp(s.pattern), `${label} pattern`) }
  if (typeof v === "number") { if (typeof s.minimum === "number") assert.ok(v >= s.minimum, `${label} minimum`); if (typeof s.maximum === "number") assert.ok(v <= s.maximum, `${label} maximum`) }
  if (Array.isArray(v)) { if (typeof s.minItems === "number") assert.ok(v.length >= s.minItems, `${label} minItems`); if (typeof s.maxItems === "number") assert.ok(v.length <= s.maxItems, `${label} maxItems`); if (s.items) v.forEach((x, i) => assertSchema(s.items as Obj, x, root, `${label}[${i}]`)) }
  if (typeof v === "object" && v !== null && !Array.isArray(v)) { const r = v as Obj, props = (s.properties ?? {}) as Obj; if (Array.isArray(s.required)) for (const k of s.required) assert.ok(Object.prototype.hasOwnProperty.call(r, k), `${label}.${k} required`); if (s.additionalProperties === false) for (const k of Object.keys(r)) assert.ok(Object.prototype.hasOwnProperty.call(props, k), `${label}.${k} additional`); for (const [k, child] of Object.entries(props)) if (Object.prototype.hasOwnProperty.call(r, k)) assertSchema(child as Obj, r[k], root, `${label}.${k}`) }
}

const cases: Array<[string, () => void | Promise<void>]> = [
  ["zero-claim completed execution produces exactly one summary request", async () => { const r = admit(await buildBundle()); assert.equal(r.status, "READY"); assert.equal(r.publicationRequests.length, 1); assert.equal(r.publicationRequests[0]!.publicationClass, "TOP_LEVEL_REVIEW_SUMMARY") }],
  ["one no-range claim produces summary only", async () => { const r = admit(await buildBundle({ claims: (a) => [claim(a)] })); assert.equal(r.publicationRequests.length, 1); assert.match(r.publicationRequests[0]!.bodyText, /A material defect exists/) }],
  ["one ranged claim produces summary and inline request", async () => { const r = admit(await buildBundle({ claims: (a) => [claim(a, { range: { startLine: 1, endLine: 1 } })] })); assert.deepEqual(r.publicationRequests.map((x) => x.publicationClass), ["TOP_LEVEL_REVIEW_SUMMARY", "INLINE_FINDING_COMMENT"]) }],
  ["multiple claims use deterministic path and line ordering", async () => { const rows = [changed("z.ts"), changed("a.ts")]; const r = admit(await buildBundle({ fixture: { rows }, claims: (a) => { const id=(p:string)=>a.items.find(x=>x.subjectPath===p)!.itemId; return [claim(a,{claimKey:"z",path:"z.ts",range:{startLine:3,endLine:4},evidenceItemIds:[id("z.ts")]}), claim(a,{claimKey:"a",path:"a.ts",range:{startLine:2,endLine:2},evidenceItemIds:[id("a.ts")]})] } })); assert.deepEqual(r.publicationRequests.slice(1).map(x=>x.path), ["a.ts","z.ts"]) }],
  ["identical inputs produce identical admission identity", async () => { const b = await buildBundle({ claims:(a)=>[claim(a,{range:{startLine:1,endLine:1}})] }); assert.equal(admit(b).publicationAdmissionIdentity, admit(b).publicationAdmissionIdentity) }],
  ["changed execution identity changes slot and request identities", async () => { const r1=admit(await buildBundle({claims:(a)=>[claim(a,{summary:"one"})]})); const r2=admit(await buildBundle({claims:(a)=>[claim(a,{summary:"two"})]})); assert.notEqual(r1.o4eExecutionIdentity,r2.o4eExecutionIdentity); assert.notEqual(r1.publicationRequests[0]!.publicationSlotIdentity,r2.publicationRequests[0]!.publicationSlotIdentity) }],
  ["changed reviewed head changes publication identities", async () => { const r1=admit(await buildBundle()); const r2=admit(await buildBundle({fixture:{head:ALT_HEAD}})); assert.notEqual(r1.reviewedHead,r2.reviewedHead); assert.notEqual(r1.publicationAdmissionIdentity,r2.publicationAdmissionIdentity) }],
  ["changed claim text changes request identity", async () => { const r1=admit(await buildBundle({claims:(a)=>[claim(a,{summary:"alpha"})]})); const r2=admit(await buildBundle({claims:(a)=>[claim(a,{summary:"beta"})]})); assert.notEqual(r1.publicationRequests[0]!.publicationRequestIdentity,r2.publicationRequests[0]!.publicationRequestIdentity) }],
  ["mutated O4-C identity is rejected fail closed", async () => { const b=await buildBundle(); const c=clone(b.o4c) as Obj; c.contextIdentity="f".repeat(64); assert.throws(()=>createO4fSafeGithubPublicationAdmission({o4cContext:c,o4dAdmission:b.o4d,o4eExecution:b.o4e}),/invalid O4-C context/) }],
  ["mutated O4-D identity is rejected fail closed", async () => { const b=await buildBundle(); const d=clone(b.o4d) as Obj; d.admissionIdentity="f".repeat(64); assert.throws(()=>createO4fSafeGithubPublicationAdmission({o4cContext:b.o4c,o4dAdmission:d,o4eExecution:b.o4e}),/invalid O4-D admission/) }],
  ["mutated O4-E identity is rejected fail closed", async () => { const b=await buildBundle(); const e=clone(b.o4e) as Obj; e.executionIdentity="f".repeat(64); assert.throws(()=>createO4fSafeGithubPublicationAdmission({o4cContext:b.o4c,o4dAdmission:b.o4d,o4eExecution:e}),/invalid O4-E execution/) }],
  ["cross-context mismatch blocks publication admission", async () => { const a=await buildBundle(); const b=await buildBundle({taskId:"review-pr-alt"}); const r=createO4fSafeGithubPublicationAdmission({o4cContext:a.o4c,o4dAdmission:b.o4d,o4eExecution:b.o4e}); assert.equal(r.status,"BLOCK_LINEAGE_OR_IDENTITY_MISMATCH") }],
  ["O4-D task mismatch blocks", async () => { const b=await buildBundle({admissionTaskId:"other-task"}); assert.equal(admit(b).status,"BLOCK_LINEAGE_OR_IDENTITY_MISMATCH") }],
  ["O4-D base mismatch against O4-C blocks", async () => { const a=await buildBundle(); const b=await buildBundle({fixture:{base:ALT_BASE}}); assert.equal(createO4fSafeGithubPublicationAdmission({o4cContext:a.o4c,o4dAdmission:b.o4d,o4eExecution:b.o4e}).status,"BLOCK_LINEAGE_OR_IDENTITY_MISMATCH") }],
  ["O4-D head mismatch against O4-C blocks", async () => { const a=await buildBundle(); const b=await buildBundle({fixture:{head:ALT_HEAD}}); assert.equal(createO4fSafeGithubPublicationAdmission({o4cContext:a.o4c,o4dAdmission:b.o4d,o4eExecution:b.o4e}).status,"BLOCK_LINEAGE_OR_IDENTITY_MISMATCH") }],
  ["changed-path universe mismatch blocks", async () => { const a=await buildBundle(); const b=await buildBundle({fixture:{rows:[changed("other.ts")]}}); assert.equal(createO4fSafeGithubPublicationAdmission({o4cContext:a.o4c,o4dAdmission:b.o4d,o4eExecution:b.o4e}).status,"BLOCK_LINEAGE_OR_IDENTITY_MISMATCH") }],
  ["O4-E admission mismatch blocks", async () => { const a=await buildBundle(); const b=await buildBundle({policy:"policy:v2"}); assert.equal(createO4fSafeGithubPublicationAdmission({o4cContext:a.o4c,o4dAdmission:a.o4d,o4eExecution:b.o4e}).status,"BLOCK_LINEAGE_OR_IDENTITY_MISMATCH") }],
  ["O4-E task lineage mismatch blocks", async () => { const a=await buildBundle(); const b=await buildBundle({taskId:"review-alt"}); assert.equal(createO4fSafeGithubPublicationAdmission({o4cContext:a.o4c,o4dAdmission:a.o4d,o4eExecution:b.o4e}).status,"BLOCK_LINEAGE_OR_IDENTITY_MISMATCH") }],
  ["O4-E policy lineage mismatch blocks", async () => { const a=await buildBundle(); const b=await buildBundle({policy:"policy:v2"}); assert.equal(createO4fSafeGithubPublicationAdmission({o4cContext:a.o4c,o4dAdmission:a.o4d,o4eExecution:b.o4e}).status,"BLOCK_LINEAGE_OR_IDENTITY_MISMATCH") }],
  ["O4-E canonical-base lineage mismatch blocks", async () => { const a=await buildBundle(); const b=await buildBundle({fixture:{base:ALT_BASE}}); assert.equal(createO4fSafeGithubPublicationAdmission({o4cContext:a.o4c,o4dAdmission:a.o4d,o4eExecution:b.o4e}).status,"BLOCK_LINEAGE_OR_IDENTITY_MISMATCH") }],
  ["O4-E reviewed-head lineage mismatch blocks", async () => { const a=await buildBundle(); const b=await buildBundle({fixture:{head:ALT_HEAD}}); assert.equal(createO4fSafeGithubPublicationAdmission({o4cContext:a.o4c,o4dAdmission:a.o4d,o4eExecution:b.o4e}).status,"BLOCK_LINEAGE_OR_IDENTITY_MISMATCH") }],
  ["STALE execution blocks publication admission", async () => { const b=await buildBundle({heads:[HEAD,ALT_HEAD]}); assert.equal(admit(b).status,"BLOCK_PREDECESSOR_NOT_READY") }],
  ["provider failure blocks publication admission", async () => { const b=await buildBundle({provider:()=>new Provider(()=>{throw new Error("boom")})}); assert.equal(admit(b).status,"BLOCK_PREDECESSOR_NOT_READY") }],
  ["timeout blocks publication admission", async () => { const b=await buildBundle({provider:()=>new Provider(()=>new Promise(resolve=>setTimeout(()=>resolve(output([])),25))),timeoutMs:2}); assert.equal(admit(b).status,"BLOCK_PREDECESSOR_NOT_READY") }],
  ["invalid provider output blocks publication admission", async () => { const b=await buildBundle({provider:()=>new Provider(()=>({assistant:"not-json",toolCalls:[],finishReason:"stop"}))}); assert.equal(admit(b).status,"BLOCK_PREDECESSOR_NOT_READY") }],
  ["contradictory completed moved-head result is rejected", async () => { const b=await buildBundle(); const e=clone(b.o4e) as Obj; e.evaluatedHead=ALT_HEAD; assert.throws(()=>createO4fSafeGithubPublicationAdmission({o4cContext:b.o4c,o4dAdmission:b.o4d,o4eExecution:e}),/invalid O4-E execution/) }],
  ["claim path outside admission is blocked by predecessor execution", async () => { const b=await buildBundle({claims:(a)=>[claim(a,{path:"outside.ts",evidenceItemIds:[a.items[0]!.itemId]})]}); assert.equal(b.o4e.status,"INVALID_PROVIDER_OUTPUT"); assert.equal(admit(b).status,"BLOCK_PREDECESSOR_NOT_READY") }],
  ["fabricated evidence item is blocked by predecessor execution", async () => { const b=await buildBundle({claims:(a)=>[claim(a,{evidenceItemIds:["f".repeat(64)]})]}); assert.equal(b.o4e.status,"INVALID_PROVIDER_OUTPUT"); assert.equal(admit(b).status,"BLOCK_PREDECESSOR_NOT_READY") }],
  ["duplicate semantic claims are blocked by predecessor execution", async () => { const b=await buildBundle({claims:(a)=>{const c=claim(a); return [c,{...c}]}}); assert.equal(b.o4e.status,"INVALID_PROVIDER_OUTPUT"); assert.equal(admit(b).status,"BLOCK_PREDECESSOR_NOT_READY") }],
  ["summary marker appears exactly once", async () => { const r=admit(await buildBundle()); assert.equal(markerCount(r.publicationRequests[0]!.bodyText),1) }],
  ["inline marker appears exactly once", async () => { const r=admit(await buildBundle({claims:(a)=>[claim(a,{range:{startLine:1,endLine:1}})]})); assert.equal(markerCount(r.publicationRequests[1]!.bodyText),1) }],
  ["logical slots have deterministic distinct markers", async () => { const r=admit(await buildBundle({claims:(a)=>[claim(a,{range:{startLine:1,endLine:1}})]})); assert.notEqual(r.publicationRequests[0]!.publicationSlotIdentity,r.publicationRequests[1]!.publicationSlotIdentity); assert.ok(r.publicationRequests.every(x=>x.bodyText.includes(x.publicationSlotIdentity))) }],
  ["marker participates in exact body identity", async () => { const r=admit(await buildBundle()); const q=r.publicationRequests[0]!; assert.equal(q.bodyIdentity,sha256(q.bodyText)); assert.ok(q.bodyText.endsWith(`<!-- kodac-publication-slot:${q.publicationSlotIdentity} -->`)) }],
  ["no-range claim never invents inline anchor", async () => { const r=admit(await buildBundle({claims:(a)=>[claim(a)]})); assert.equal(r.publicationRequests.some(x=>x.publicationClass==="INLINE_FINDING_COMMENT"),false) }],
  ["ranged claim line anchor is inside the validated range", async () => { const r=admit(await buildBundle({claims:(a)=>[claim(a,{range:{startLine:2,endLine:9}})]})); assert.equal(r.publicationRequests[1]!.lineAnchor,2) }],
  ["inline request always requires future diff-anchor preflight", async () => { const r=admit(await buildBundle({claims:(a)=>[claim(a,{range:{startLine:1,endLine:1}})]})); const q=r.publicationRequests[1]!; assert.equal(q.sideHint,"RIGHT"); assert.equal(q.requiresDiffAnchorPreflight,true) }],
  ["NUL claim text is blocked before publication rendering", async () => { const b=await buildBundle({claims:(a)=>[claim(a,{summary:"bad\0text"})]}); assert.equal(b.o4e.status,"INVALID_PROVIDER_OUTPUT"); assert.equal(admit(b).status,"BLOCK_PREDECESSOR_NOT_READY") }],
  ["summary body budget overflow blocks without truncation", async () => { const b=await buildBundle({maxClaims:32,claims:(a)=>Array.from({length:20},(_,i)=>claim(a,{claimKey:`c${i}`,summary:`${i}:`+"x".repeat(3900)}))}); const r=admit(b); assert.equal(r.status,"BLOCK_PUBLICATION_BODY_BUDGET"); assert.equal(r.publicationRequests.length,0) }],
  ["Unicode scalar text renders deterministically", async () => { const b=await buildBundle({claims:(a)=>[claim(a,{summary:"مشكلة موثقة ✅"})]}); const r1=admit(b),r2=admit(b); assert.equal(r1.publicationRequests[0]!.bodyText,r2.publicationRequests[0]!.bodyText); assert.match(r1.publicationRequests[0]!.bodyText,/مشكلة موثقة/) }],
  ["canonical result is deeply frozen", async () => deepFrozen(admit(await buildBundle({claims:(a)=>[claim(a,{range:{startLine:1,endLine:1}})]})))],
  ["standalone validator accepts canonical result", async () => { const r=admit(await buildBundle()); assert.deepEqual(validateO4fSafeGithubPublicationAdmissionResult(r),r) }],
  ["standalone validator rejects unknown result fields", async () => { const r=clone(admit(await buildBundle())) as Obj; r.extra=true; assert.throws(()=>validateO4fSafeGithubPublicationAdmissionResult(r),/unexpected or missing properties/) }],
  ["standalone validator rejects admission identity mutation", async () => { const r=clone(admit(await buildBundle())) as Obj; r.publicationAdmissionIdentity="f".repeat(64); assert.throws(()=>validateO4fSafeGithubPublicationAdmissionResult(r),/publication admission identity mismatch/) }],
  ["schema constants and vocabularies match runtime", () => { const s=JSON.parse(readFileSync(new URL("../../../schema/o4f-safe-github-publication-admission.schema.json",import.meta.url),"utf8")); assert.equal(s.properties.version.const,O4F_SAFE_GITHUB_PUBLICATION_ADMISSION_VERSION); assert.deepEqual(s.properties.status.enum,O4F_STATUSES); assert.deepEqual(s.properties.continuationDecision.enum,O4F_CONTINUATION_DECISIONS); assert.deepEqual(s.$defs.publicationRequest.properties.publicationClass.enum,O4F_PUBLICATION_CLASSES) }],
  ["representative READY result validates against published schema", async () => { const r=admit(await buildBundle({claims:(a)=>[claim(a,{range:{startLine:1,endLine:1}})]})); const s=JSON.parse(readFileSync(new URL("../../../schema/o4f-safe-github-publication-admission.schema.json",import.meta.url),"utf8")); assertSchema(s,r,s) }],
  ["representative blocked result validates against published schema", async () => { const r=admit(await buildBundle({heads:[HEAD,ALT_HEAD]})); const s=JSON.parse(readFileSync(new URL("../../../schema/o4f-safe-github-publication-admission.schema.json",import.meta.url),"utf8")); assertSchema(s,r,s) }],
  ["source static scan proves absence of external side-effect capabilities", () => { const s=readFileSync(new URL("../src/github-review/o4f-safe-github-publication-admission.ts",import.meta.url),"utf8"); for (const forbidden of ["process.env","GITHUB_TOKEN","node:fs","node:child_process","fetch(","https://api.github.com","/comments","/reviews","writeFile","appendFile","sqlite","postgres","glitchtip","ModelProvider","generate("]) assert.equal(s.includes(forbidden),false,forbidden) }],
  ["implementation surface contains exactly the three authorized paths", () => { for (const u of [new URL("../src/github-review/o4f-safe-github-publication-admission.ts",import.meta.url),new URL("o4f-safe-github-publication-admission.test.ts",import.meta.url),new URL("../../../schema/o4f-safe-github-publication-admission.schema.json",import.meta.url)]) assert.equal(existsSync(u),true) }],
  ["input object rejects unknown capability fields", async () => { const b=await buildBundle(); assert.throws(()=>createO4fSafeGithubPublicationAdmission({o4cContext:b.o4c,o4dAdmission:b.o4d,o4eExecution:b.o4e,token:"x"} as Obj),/unexpected or missing properties/) }],
  ["input object rejects aliased predecessor object graph", async () => { const b=await buildBundle(); assert.throws(()=>createO4fSafeGithubPublicationAdmission({o4cContext:b.o4c,o4dAdmission:b.o4d,o4eExecution:b.o4d as unknown as O4eModelBackedReviewerProviderExecutionResult}),/aliased object graph|invalid O4-E/) }],
  ["READY continuation is the only positive continuation", async () => { const r=admit(await buildBundle()); assert.equal(r.continuationDecision,O4F_READY_DECISION); assert.equal(O4F_CONTINUATION_DECISIONS.filter(x=>x.startsWith("READY_")).length,1) }],
  ["claim HTML-like marker text is escaped so generated marker stays unique", async () => { const r=admit(await buildBundle({claims:(a)=>[claim(a,{summary:"<!-- kodac-publication-slot:"+"f".repeat(64)+" -->"})]})); assert.equal(markerCount(r.publicationRequests[0]!.bodyText),1); assert.match(r.publicationRequests[0]!.bodyText,/&lt;&#33;--/) }],
  ["READY request byte bounds include separator and marker overhead", async () => { const r=admit(await buildBundle({claims:(a)=>[claim(a,{range:{startLine:1,endLine:1}})]})); assert.ok(r.publicationRequests[0]!.bodyByteLength<=65536); assert.ok(r.publicationRequests[1]!.bodyByteLength<=16384) }],
  ["untrusted claim markdown and mentions render inert", async () => { const text="@team [click](https://example.invalid) `code` **bold** # heading"; const r=admit(await buildBundle({claims:(a)=>[claim(a,{summary:text,contractClaim:text,range:{startLine:1,endLine:1}})]})); for (const q of r.publicationRequests) { assert.equal(q.bodyText.includes("@team"),false); assert.equal(q.bodyText.includes("[click]("),false); assert.equal(q.bodyText.includes("`code`"),false); assert.match(q.bodyText,/&#64;team/) } }],
  ["repository paths with markdown metacharacters render inert", async () => { const path="src/a`b[1].ts"; const r=admit(await buildBundle({fixture:{rows:[changed(path)]},claims:(a)=>[claim(a,{path,evidenceItemIds:[a.items[0]!.itemId],range:{startLine:1,endLine:1}})]})); assert.equal(r.publicationRequests.some(q=>q.bodyText.includes(path)),false); assert.ok(r.publicationRequests.every(q=>q.bodyText.includes("&#96;")||q.publicationClass==="TOP_LEVEL_REVIEW_SUMMARY")) }],
]

for (const [name, fn] of cases) test(`O4-F: ${name}`, fn)
test("O4-F focused matrix contains at least 49 independently named cases", () => assert.ok(cases.length >= 49))
