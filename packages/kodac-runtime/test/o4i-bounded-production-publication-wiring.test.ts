import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { existsSync, readFileSync } from "node:fs"
import test from "node:test"

import { acquireO4bBoundedReadOnlyGithubContext, type O4bBoundedReadOnlyGithubContextInput } from "../src/github-review/o4b-bounded-read-only-github-context.ts"
import { buildO4cGithubReviewerContext } from "../src/github-review/o4c-github-context-to-reviewer-context.ts"
import { createO4dO4cReviewerExecutionAdmission } from "../src/github-review/o4d-o4c-reviewer-execution-admission.ts"
import {
  O4I_BOUNDED_PRODUCTION_PUBLICATION_WIRING_VERSION,
  O4I_CONTINUATION_DECISIONS,
  O4I_FAILURE_CODES,
  O4I_STATUSES,
  runO4iBoundedProductionPublication,
  validateO4iBoundedProductionPublicationWiringResult,
  type O4iBoundedProductionPublicationWiringInput,
} from "../src/github-review/o4i-bounded-production-publication-wiring.ts"
import { validateO4hEndToEndReviewToPublicationResult } from "../src/github-review/o4h-end-to-end-review-to-publication.ts"
import type { ModelProvider, ModelProviderRequest, ModelProviderResponse } from "../src/model/provider.ts"

type Obj = Record<string, any>
type Call = { url: URL; method: string; headers: Headers; body: string | null; redirect: RequestRedirect | undefined }
const BASE = "a".repeat(40), HEAD = "b".repeat(40), ALT_HEAD = "d".repeat(40)
const REPO_ID = "1001", PR_ID = "2002", REPO = "TheHalfMoon/Kodac", PR = 42
const POLICY = "policy:v1", PRIMARY = "src/widget.ts", TASK = "review-pr-42", OBJECTIVE = "Review exact changed paths.", MODEL = "fixture-model-v1"
const CREDENTIAL_POLICY = "e".repeat(64), SECRET = "o4i-synthetic-secret-DO-NOT-LEAK"
const BYTES = new TextEncoder().encode("export const widget = 1\n")
const sha256 = (v: Uint8Array | string) => createHash("sha256").update(v).digest("hex")
const blobSha = (b: Uint8Array) => createHash("sha1").update(`blob ${b.byteLength}\0`, "utf8").update(b).digest("hex")
const fileBody = (path: string, b: Uint8Array) => ({ type: "file", encoding: "base64", path, sha: blobSha(b), size: b.byteLength, content: Buffer.from(b).toString("base64") })
const changed = (path = PRIMARY, status = "modified", b = BYTES, extra: Obj = {}) => ({ filename: path, status, sha: blobSha(b), ...extra })
const clone = <T>(v: T): T => structuredClone(v)
const TIMES = ["2026-09-12T00:00:00.000Z", "2026-09-12T00:00:01.000Z"]

function json(value: unknown, status = 200, url?: string): Response { const r = new Response(JSON.stringify(value), { status, headers: { "content-type": "application/json" } }); if (url !== undefined) Object.defineProperty(r, "url", { value: url }); return r }
function snap(head = HEAD): Obj { return { id: Number(PR_ID), number: PR, base: { ref: "main", sha: BASE, repo: { id: Number(REPO_ID), full_name: REPO } }, head: { ref: "feat", sha: head, repo: { id: Number(REPO_ID), full_name: REPO } } } }
function o4bInput(overrides: Obj = {}): O4bBoundedReadOnlyGithubContextInput {
  return {
    expectedRepositoryId: REPO_ID, expectedRepositoryFullName: REPO, pullRequestNumber: PR,
    expectedPullRequestId: PR_ID, expectedBaseRepositoryId: REPO_ID, expectedHeadRepositoryId: REPO_ID,
    expectedHeadRepositoryFullName: REPO, expectedHeadSha: HEAD, credentialPolicyIdentity: CREDENTIAL_POLICY,
    supportingPaths: [], credential: "fixture", ...overrides,
  }
}
async function harvest(rows: Obj[]): Promise<Map<string, string>> {
  const content: Record<string, Obj> = {}
  for (const row of rows) { const path = String(row.filename), b = path === PRIMARY ? BYTES : new TextEncoder().encode(`content:${path}\n`); content[path] = fileBody(path, b); row.sha = content[path].sha }
  let i = 0
  const fetchImpl = (async (raw: URL | RequestInfo) => {
    const u = new URL(raw instanceof URL ? raw.href : typeof raw === "string" ? raw : raw.url)
    if (/\/pulls\/\d+$/.test(u.pathname)) return json(snap())
    if (/\/pulls\/\d+\/files$/.test(u.pathname)) return json(Number(u.searchParams.get("page")) === 1 ? rows : [])
    if (u.pathname.includes("/contents/")) { const marker = "/contents/"; const path = u.pathname.slice(u.pathname.indexOf(marker) + marker.length).split("/").map(decodeURIComponent).join("/"); const body = content[path]; return json(body ?? { message: "Not Found" }, body ? 200 : 404) }
    return new Response(null, { status: 404 })
  }) as typeof fetch
  const o4b = await acquireO4bBoundedReadOnlyGithubContext(o4bInput(), { fetchImpl, now: () => TIMES[Math.min(i++, 1)]! })
  const o4c = buildO4cGithubReviewerContext({ taskId: TASK, objective: OBJECTIVE, o4bContext: o4b })
  const o4d = createO4dO4cReviewerExecutionAdmission({ taskId: TASK, policyIdentity: POLICY, instructions: "Find evidence-grounded material defects only.", o4cContext: o4c })
  const map = new Map<string, string>()
  for (const item of o4d.items as unknown as Obj[]) map.set(String(item.subjectPath), String(item.itemId))
  return map
}
const HARVEST_SINGLE = await harvest([changed()])
const claim = (map: Map<string, string>, path: string, line: number, key: string, summary = `Material defect in ${path}.`) => ({ claimKey: key, path, summary, contractClaim: "The changed code violates the contract.", category: "correctness", severity: "high", confidenceBps: 9000, range: { startLine: line, endLine: line }, evidenceItemIds: [map.get(path)!] })
const output = (claims: Obj[]): ModelProviderResponse => ({ assistant: JSON.stringify({ claims }), toolCalls: [], finishReason: "stop" })
class Provider implements ModelProvider {
  readonly name = "fixture-provider"
  readonly fn: (request: ModelProviderRequest) => ModelProviderResponse
  constructor(fn: (request: ModelProviderRequest) => ModelProviderResponse) { this.fn = fn }
  generate(request: ModelProviderRequest): Promise<ModelProviderResponse> { return Promise.resolve(this.fn(request)) }
}
const providerFor = (claims: Obj[]) => new Provider(() => output(claims))

function baseInput(overrides: Obj = {}): O4iBoundedProductionPublicationWiringInput {
  return {
    repositoryId: REPO_ID, repositoryFullName: REPO, pullRequestNumber: PR, pullRequestId: PR_ID,
    baseRepositoryId: REPO_ID, headRepositoryId: REPO_ID, headRepositoryFullName: REPO, expectedHeadSha: HEAD,
    supportingPaths: [], taskId: TASK, objective: OBJECTIVE, policyIdentity: POLICY,
    instructions: "Find evidence-grounded material defects only.",
    provider: providerFor([]), model: MODEL,
    credentialPolicyIdentity: CREDENTIAL_POLICY, credential: SECRET, ...overrides,
  } as O4iBoundedProductionPublicationWiringInput
}

interface ServerOptions {
  rows?: Obj[]
  prHeads?: string[]
  prOverrides?: Obj
  reviews?: Obj[]
  comments?: Obj[]
  postMode?: "normal" | "throw" | "throw-after-create"
  postStatus?: number
}
function server(options: ServerOptions = {}) {
  const calls: Call[] = [], reviews = [...(options.reviews ?? [])], comments = [...(options.comments ?? [])]
  const rows: Obj[] = (options.rows ?? [changed()]).map((r) => ({ patch: "@@ -1 +1 @@\n-old\n+new", ...r }))
  const content: Record<string, Obj> = {}
  for (const row of rows) { const path = String(row.filename), b = path === PRIMARY ? BYTES : new TextEncoder().encode(`content:${path}\n`); content[path] = fileBody(path, b); row.sha = content[path].sha }
  const heads = options.prHeads ?? [HEAD, HEAD, HEAD, HEAD, HEAD, HEAD]
  const postBodies: Obj[] = []; let prReads = 0
  let i = 0
  const now = () => TIMES[Math.min(i++, 1)]!
  const fetchImpl = (async (raw: URL | RequestInfo, init?: RequestInit) => {
    const u = new URL(raw instanceof URL ? raw.href : typeof raw === "string" ? raw : raw.url), method = String(init?.method ?? "GET").toUpperCase(), headers = new Headers(init?.headers), body = typeof init?.body === "string" ? init.body : null
    const call: Call = { url: u, method, headers, body, redirect: init?.redirect }; calls.push(call)
    if (method === "GET" && /\/pulls\/\d+$/.test(u.pathname)) return json({ ...snap(heads[Math.min(prReads++, heads.length - 1)]!) })
    if (method === "GET" && /\/pulls\/\d+\/files$/.test(u.pathname)) { const page = Number(u.searchParams.get("page")); return json(page === 1 ? rows : []) }
    if (method === "GET" && u.pathname.includes("/contents/")) { const marker = "/contents/"; const path = u.pathname.slice(u.pathname.indexOf(marker) + marker.length).split("/").map(decodeURIComponent).join("/"); const c = content[path]; return json(c ?? { message: "Not Found" }, c ? 200 : 404) }
    if (method === "GET" && /\/pulls\/\d+\/reviews$/.test(u.pathname)) { const page = Number(u.searchParams.get("page")); return json(page === 1 ? reviews : []) }
    if (method === "GET" && /\/pulls\/\d+\/comments$/.test(u.pathname)) { const page = Number(u.searchParams.get("page")); return json(page === 1 ? comments : []) }
    if (method === "POST" && /\/pulls\/\d+\/reviews$/.test(u.pathname)) {
      const parsed = JSON.parse(body ?? "{}") as Obj; postBodies.push(parsed)
      if (options.postStatus !== undefined && options.postStatus !== 200) return json({ message: SECRET }, options.postStatus)
      if (options.postMode === "throw") throw new Error(`transport ${SECRET}`)
      const review = { id: 700, node_id: "R_700", body: parsed.body, commit_id: parsed.commit_id, state: "COMMENTED" }
      const made = (parsed.comments as Obj[]).map((c, k) => ({ id: 800 + k, node_id: `RC_${800 + k}`, pull_request_review_id: 700, body: c.body, path: c.path, line: c.line, side: c.side, commit_id: parsed.commit_id }))
      if (options.postMode === "throw-after-create") { reviews.push(review); comments.push(...made); throw new Error(`transport ${SECRET}`) }
      reviews.push(review); comments.push(...made); return json(review, 200)
    }
    return json({ message: "not found" }, 404)
  }) as typeof fetch
  const outer = { calls, reviews, comments, postBodies, now }
  return { fetchImpl, calls, reviews, comments, postBodies, now }
}
const run = (input: O4iBoundedProductionPublicationWiringInput, s: ReturnType<typeof server>, opts: Obj = {}) =>
  runO4iBoundedProductionPublication(input, { fetchImpl: s.fetchImpl, timeoutMs: 1000, now: s.now, ...opts })
function deepFrozen(v: unknown, seen = new Set<object>()): void { if (typeof v !== "object" || v === null || seen.has(v)) return; seen.add(v); assert.equal(Object.isFrozen(v), true); for (const child of Object.values(v as Obj)) deepFrozen(child, seen) }
function postCalls(s: ReturnType<typeof server>): Call[] { return s.calls.filter((c) => c.method === "POST") }

function schemaRef(root: Obj, ref: string): Obj { return root.$defs[ref.slice("#/$defs/".length)] as Obj }
function typeMatches(t: string, v: unknown): boolean { if (t === "null") return v === null; if (t === "array") return Array.isArray(v); if (t === "object") return typeof v === "object" && v !== null && !Array.isArray(v); if (t === "integer") return typeof v === "number" && Number.isInteger(v); return typeof v === t }
function assertSchema(s: Obj, v: unknown, root: Obj, label = "$"): void { if (typeof s.$ref === "string") return assertSchema(schemaRef(root, s.$ref), v, root, label); if (has(s, "const")) assert.deepEqual(v, s.const, `${label} const`); if (Array.isArray(s.enum)) assert.ok(s.enum.some((x: unknown) => JSON.stringify(x) === JSON.stringify(v)), `${label} enum`); if (s.type !== undefined) { const ts = Array.isArray(s.type) ? s.type : [s.type]; assert.ok(ts.some((t: unknown) => typeof t === "string" && typeMatches(t, v)), `${label} type`) } if (typeof v === "string") { if (typeof s.minLength === "number") assert.ok(v.length >= s.minLength); if (typeof s.maxLength === "number") assert.ok(v.length <= s.maxLength); if (typeof s.pattern === "string") assert.match(v, new RegExp(s.pattern)) } if (typeof v === "number") { if (typeof s.minimum === "number") assert.ok(v >= s.minimum); if (typeof s.maximum === "number") assert.ok(v <= s.maximum) } if (Array.isArray(v) && s.items) v.forEach((x, i) => assertSchema(s.items as Obj, x, root, `${label}[${i}]`)); if (typeof v === "object" && v !== null && !Array.isArray(v)) { const r = v as Obj, props = (s.properties ?? {}) as Obj; if (Array.isArray(s.required)) for (const k of s.required) assert.ok(has(r, k), `${label}.${k} required`); if (s.additionalProperties === false) for (const k of Object.keys(r)) assert.ok(has(props, k), `${label}.${k} additional`); for (const [k, child] of Object.entries(props)) if (has(r, k)) assertSchema(child as Obj, r[k], root, `${label}.${k}`) } }
function has(o: object, k: PropertyKey): boolean { return Object.prototype.hasOwnProperty.call(o, k) }
const schema = JSON.parse(readFileSync(new URL("../../../schema/o4i-bounded-production-publication-wiring.schema.json", import.meta.url), "utf8")) as Obj

const ONE = [claim(HARVEST_SINGLE, PRIMARY, 1, "c1")]

const cases: Array<[string, () => void | Promise<void>]> = [
  ["malformed input fails before network", async () => { const s = server(); await assert.rejects(() => run({ ...baseInput(), taskId: "" }, s), /must not be empty/); assert.equal(s.calls.length, 0) }],
  ["input rejects unknown capability fields", async () => { const s = server(); await assert.rejects(() => runO4iBoundedProductionPublication({ ...baseInput(), token: "x" } as Obj, { fetchImpl: s.fetchImpl }), /unexpected or missing properties/); assert.equal(s.calls.length, 0) }],
  ["options reject unknown transport fields", async () => { const s = server(); await assert.rejects(() => runO4iBoundedProductionPublication(baseInput(), { fetchImpl: s.fetchImpl, baseUrl: "x" } as Obj), /unexpected or missing properties/); assert.equal(s.calls.length, 0) }],
  ["proxy fetch implementation is rejected before network", async () => { const fn = new Proxy(server().fetchImpl, {}); await assert.rejects(() => runO4iBoundedProductionPublication(baseInput(), { fetchImpl: fn }), /non-proxy/) }],
  ["READY zero-inline path publishes one COMMENT review through production wiring", async () => { const s = server(), r = await run(baseInput(), s); assert.equal(r.status, "COMPLETED_PUBLISHED"); assert.equal(r.continuationDecision, "PRODUCTION_PUBLICATION_COMPLETE"); assert.equal(postCalls(s).length, 1); assert.equal(s.postBodies[0]!.event, "COMMENT"); assert.deepEqual(s.postBodies[0]!.comments, []) }],
  ["omitted fetchImpl resolves to the production global fetch", async () => { const s = server(), previous = globalThis.fetch; (globalThis as Obj).fetch = s.fetchImpl; try { const r = await runO4iBoundedProductionPublication(baseInput(), { timeoutMs: 1000, now: s.now }); assert.equal(r.status, "COMPLETED_PUBLISHED"); assert.ok(s.calls.length > 0) } finally { (globalThis as Obj).fetch = previous } }],
  ["explicit fetchImpl is honored over the production default", async () => { const s = server(); let used = 0; const counting = (async (raw: URL | RequestInfo, init?: RequestInit) => { used += 1; return s.fetchImpl(raw, init) }) as typeof fetch; const r = await runO4iBoundedProductionPublication(baseInput(), { fetchImpl: counting, timeoutMs: 1000, now: s.now }); assert.equal(r.status, "COMPLETED_PUBLISHED"); assert.ok(used > 0) }],
  ["composition executes exactly once per wiring call", async () => { let n = 0; const p = new Provider(() => { n += 1; return output([]) }); const s = server(), r = await run({ ...baseInput(), provider: p }, s); assert.equal(r.status, "COMPLETED_PUBLISHED"); assert.equal(n, 1); assert.equal(postCalls(s).length, 1) }],
  ["wiring is deterministic across runs", async () => { const a = await run(baseInput(), server()); const b = await run(baseInput(), server()); assert.equal(a.wiringExecutionIdentity, b.wiringExecutionIdentity) }],
  ["terminal publication is embedded verbatim", async () => { const r = await run(baseInput(), server()); assert.ok(r.composedResult !== null); assert.deepEqual(validateO4hEndToEndReviewToPublicationResult(r.composedResult), r.composedResult) }],
  ["completed result mirrors live receipt identities", async () => { const r = await run(baseInput(), server()); const terminal = r.composedResult.terminalPublication!; assert.equal(r.reviewId, terminal.reviewId); assert.equal(r.reviewNodeId, terminal.reviewNodeId); assert.equal(r.reviewReceiptIdentity, terminal.reviewReceiptIdentity); assert.ok(typeof r.reviewId === "string" && r.reviewId.length > 0) }],
  ["credential is caller-injected on every request", async () => { const s = server(); await run(baseInput(), s); assert.ok(s.calls.length > 0); assert.ok(s.calls.every((c) => c.headers.get("authorization") === `Bearer ${SECRET}`)) }],
  ["credential never appears in serialization errors or identities", async () => { const r = await run(baseInput(), server()); const text = JSON.stringify(r); assert.equal(text.includes(SECRET), false); assert.equal(r.wiringExecutionIdentity.includes(SECRET), false) }],
  ["wrong pull-request identity blocks composition with no POST", async () => { const s = server(), r = await run({ ...baseInput(), pullRequestId: "9999" }, s); assert.equal(r.status, "BLOCKED_COMPOSITION_NOT_COMPLETED"); assert.equal(r.failureCode, "COMPOSITION_NOT_COMPLETED"); assert.equal(r.continuationDecision, "STOP_AT_COMPOSITION"); assert.equal(postCalls(s).length, 0); assert.equal(r.reviewId, null); assert.equal(r.reviewNodeId, null); assert.equal(r.reviewReceiptIdentity, null) }],
  ["moved head blocks composition with no POST", async () => { const s = server({ prHeads: [ALT_HEAD, ALT_HEAD, ALT_HEAD, ALT_HEAD, ALT_HEAD, ALT_HEAD] }), r = await run(baseInput(), s); assert.equal(r.status, "BLOCKED_COMPOSITION_NOT_COMPLETED"); assert.equal(r.composedResult.failureStage, "O4B"); assert.equal(postCalls(s).length, 0) }],
  ["O4G head movement propagates verbatim inside the wiring envelope", async () => { const s = server({ prHeads: [HEAD, HEAD, ALT_HEAD, ALT_HEAD, ALT_HEAD, ALT_HEAD] }), r = await run(baseInput(), s); assert.equal(r.status, "BLOCKED_COMPOSITION_NOT_COMPLETED"); assert.equal(r.composedResult.status, "BLOCKED_HEAD_MISMATCH"); assert.equal(postCalls(s).length, 0) }],
  ["exact prior publication is recovered without POST", async () => { const firstServer = server(); const first = await run(baseInput(), firstServer); assert.equal(first.status, "COMPLETED_PUBLISHED"); const s = server({ reviews: structuredClone(firstServer.reviews), comments: structuredClone(firstServer.comments) }); const again = await run(baseInput(), s); assert.equal(again.status, "COMPLETED_ALREADY_PRESENT"); assert.equal(again.continuationDecision, "PRODUCTION_PUBLICATION_COMPLETE"); assert.equal(postCalls(s).length, 0) }],
  ["transport exception after POST recovers read-only without second POST", async () => { const s = server({ postMode: "throw-after-create" }), r = await run(baseInput(), s); assert.equal(r.status, "COMPLETED_RECOVERED_AFTER_UNCONFIRMED_POST"); assert.equal(postCalls(s).length, 1) }],
  ["completed result is deeply frozen", async () => deepFrozen(await run(baseInput(), server()))],
  ["blocked result is deeply frozen", async () => deepFrozen(await run({ ...baseInput(), pullRequestId: "9999" }, server()))],
  ["standalone validator accepts canonical completed result", async () => { const r = await run(baseInput(), server()); assert.deepEqual(validateO4iBoundedProductionPublicationWiringResult(r), r) }],
  ["standalone validator accepts canonical blocked result", async () => { const r = await run({ ...baseInput(), pullRequestId: "9999" }, server()); assert.deepEqual(validateO4iBoundedProductionPublicationWiringResult(r), r) }],
  ["standalone validator rejects identity mutation", async () => { const r = clone(await run(baseInput(), server())) as Obj; r.wiringExecutionIdentity = "f".repeat(64); assert.throws(() => validateO4iBoundedProductionPublicationWiringResult(r), /wiring execution identity mismatch/) }],
  ["standalone validator rejects unknown fields", async () => { const r = clone(await run(baseInput(), server())) as Obj; r.extra = true; assert.throws(() => validateO4iBoundedProductionPublicationWiringResult(r), /unexpected or missing properties/) }],
  ["standalone validator rejects receipt mirror mismatch", async () => { const r = clone(await run(baseInput(), server())) as Obj; r.reviewId = "999999"; assert.throws(() => validateO4iBoundedProductionPublicationWiringResult(r), /receipt mirror mismatch/) }],
  ["standalone validator rejects blocked result carrying receipt", async () => { const r = clone(await run({ ...baseInput(), pullRequestId: "9999" }, server())) as Obj; r.reviewId = "1"; assert.throws(() => validateO4iBoundedProductionPublicationWiringResult(r), /blocked carries receipt/) }],
  ["schema constants and vocabularies match runtime", () => { assert.equal(schema.properties.version.const, O4I_BOUNDED_PRODUCTION_PUBLICATION_WIRING_VERSION); assert.deepEqual(schema.properties.status.enum, O4I_STATUSES); assert.deepEqual(schema.properties.continuationDecision.enum, O4I_CONTINUATION_DECISIONS); assert.deepEqual(schema.properties.failureCode.enum, [...O4I_FAILURE_CODES, null]) }],
  ["representative completed result validates against schema", async () => assertSchema(schema, await run(baseInput(), server()), schema)],
  ["representative blocked result validates against schema", async () => assertSchema(schema, await run({ ...baseInput(), pullRequestId: "9999" }, server()), schema)],
  ["static source scan forbids ambient or unrelated side-effect capabilities", () => { const src = readFileSync(new URL("../src/github-review/o4i-bounded-production-publication-wiring.ts", import.meta.url), "utf8"); for (const re of [/process\.env/, /GITHUB_TOKEN/, /GH_TOKEN/, /node:fs/, /node:child_process/, /from ["']child_process["']/, /keychain/i, /credential.helper/i, /glitchtip/i, /telemetry/i, /\.generate\s*\(/, /setInterval\s*\(/, /process\.exit\s*\(/, /\/issues\//, /\/labels(?:\/|`|")/, /\/merge(?:\/|`|")/, /event:\s*"APPROVE"/, /event:\s*"REQUEST_CHANGES"/]) assert.doesNotMatch(src, re); assert.match(src, /executeO4hEndToEndReviewToPublication/); assert.match(src, /validateO4hEndToEndReviewToPublicationResult/); assert.doesNotMatch(src, /from\s*"..\/model\/provider/) }],
  ["implementation surface contains exactly the three authorized artifacts", () => { for (const u of [new URL("../src/github-review/o4i-bounded-production-publication-wiring.ts", import.meta.url), new URL("o4i-bounded-production-publication-wiring.test.ts", import.meta.url), new URL("../../../schema/o4i-bounded-production-publication-wiring.schema.json", import.meta.url)]) assert.equal(existsSync(u), true) }],
  ["exact API origin only across the whole wiring call", async () => { const s = server(); await run(baseInput(), s); assert.ok(s.calls.length > 0); assert.ok(s.calls.every((c) => c.url.origin === "https://api.github.com")) }],
  ["timeout bounds are enforced", async () => { const s = server(); await assert.rejects(() => runO4iBoundedProductionPublication(baseInput(), { fetchImpl: s.fetchImpl, timeoutMs: 0 }), /bounded integer/) }],
]
for (const [name, fn] of cases) test(`O4-I: ${name}`, fn)
test("O4-I focused matrix contains at least 25 independently named cases", () => assert.ok(cases.length >= 25))
