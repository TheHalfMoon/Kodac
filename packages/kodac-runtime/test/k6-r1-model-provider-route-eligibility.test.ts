import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import test from "node:test"
import {
  K6_R1_ROUTE_REQUEST_VERSION,
  canonicalK6R1Json,
  compareK6R1Utf16,
  createK6R1RouteRequest,
  validateK6R1RouteEligibilityResult,
  validateK6R1RouteRequest,
  type K6R1RouteRequestIdentityInput,
} from "../src/evidence-router/contracts.ts"
import { evaluateK6R1ModelProviderRouteEligibility } from "../src/evidence-router/eligibility.ts"

function candidate(candidateId: string, overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    candidateId,
    candidateKind: "MODEL_PROVIDER",
    provider: "provider",
    model: "model",
    declaredCapabilities: ["repo/search", "model/generate"],
    maximumRiskClass: "HIGH",
    supportedPrivacyClasses: ["SENSITIVE", "PUBLIC", "REPOSITORY_PRIVATE"],
    qualification: {
      protocol: "kodac.provider-qualification",
      version: 1,
      provider: "provider",
      model: "model",
      workspaceDigest: "a".repeat(64),
      status: "PASS",
      reportDigest: "b".repeat(64),
    },
    ...overrides,
  }
}

function requestInput(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    version: K6_R1_ROUTE_REQUEST_VERSION,
    repositoryId: "TheHalfMoon/Kodac",
    canonicalBase: "0".repeat(40),
    candidateHead: "1".repeat(40),
    taskId: "k6-r1/vector",
    riskClass: "MEDIUM",
    privacyClass: "REPOSITORY_PRIVATE",
    requiredCapabilities: ["repo/search", "model/generate"],
    candidates: [candidate("b"), candidate("a")],
    ...overrides,
  }
}

function deepJsonClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

test("creates and validates the exact deterministic request and result identity vectors", () => {
  const request = createK6R1RouteRequest(requestInput())
  assert.equal(request.requestIdentity, "37f0094ac8b2475307fc8cf168382e84abc8ba8586f5a3abb7ca5bff19809b96")
  assert.deepEqual(request.requiredCapabilities, ["model/generate", "repo/search"])
  assert.deepEqual(request.candidates.map((entry) => entry.candidateId), ["a", "b"])
  assert.deepEqual(request.candidates[0]?.supportedPrivacyClasses, ["PUBLIC", "REPOSITORY_PRIVATE", "SENSITIVE"])
  assert.equal(validateK6R1RouteRequest(request).requestIdentity, request.requestIdentity)
  const result = evaluateK6R1ModelProviderRouteEligibility(request)
  assert.equal(result.resultIdentity, "eccd3adf80495683428c532c5c0ae188b83cb6f9deb584450a2b0dcaf07c7661")
  assert.deepEqual(result.candidateResults.map((entry) => entry.status), ["ELIGIBLE", "ELIGIBLE"])
  assert.equal(validateK6R1RouteEligibilityResult(result).resultIdentity, result.resultIdentity)
})

test("pins canonical UTF-16 key ordering, escaping, literal Unicode, and exact preimage hash", () => {
  const strange = "x\"\\\b\t\n\f\r\u0001/\u2028\u2029😀"
  const preimage = canonicalK6R1Json({ "\uE000": 1, "😀": 2, A: 3, a: 4, strange })
  const expected = "{\"A\":3,\"a\":4,\"strange\":\"x\\\"\\\\\\b\\t\\n\\f\\r\\u0001/\u2028\u2029😀\",\"😀\":2,\"\uE000\":1}"
  assert.equal(preimage, expected)
  assert.equal(createHash("sha256").update(preimage, "utf8").digest("hex"), "3e9bedc1206b9660f4a2e3844c2be90f2bba9d9619087be1909cd280b0480f3e")
  assert.equal(compareK6R1Utf16("😀", "\uE000"), -1)
  assert.equal(compareK6R1Utf16("A", "a"), -1)
})

test("set permutations and candidate permutations preserve request and result identities", () => {
  const first = createK6R1RouteRequest(requestInput())
  const second = createK6R1RouteRequest(requestInput({
    requiredCapabilities: ["model/generate", "repo/search"],
    candidates: [
      candidate("a", { declaredCapabilities: ["model/generate", "repo/search"], supportedPrivacyClasses: ["REPOSITORY_PRIVATE", "PUBLIC", "SENSITIVE"] }),
      candidate("b", { declaredCapabilities: ["repo/search", "model/generate"], supportedPrivacyClasses: ["PUBLIC", "SENSITIVE", "REPOSITORY_PRIVATE"] }),
    ],
  }))
  assert.equal(second.requestIdentity, first.requestIdentity)
  assert.equal(evaluateK6R1ModelProviderRouteEligibility(second).resultIdentity, evaluateK6R1ModelProviderRouteEligibility(first).resultIdentity)
})

test("normalization-distinct Unicode spellings remain identity-distinct", () => {
  const precomposed = createK6R1RouteRequest(requestInput({ repositoryId: "é" }))
  const decomposed = createK6R1RouteRequest(requestInput({ repositoryId: "e\u0301" }))
  assert.notEqual(precomposed.requestIdentity, decomposed.requestIdentity)
})

test("candidateId changes identity but not eligibility predicates", () => {
  const first = createK6R1RouteRequest(requestInput({ candidates: [candidate("candidate-a")] }))
  const second = createK6R1RouteRequest(requestInput({ candidates: [candidate("candidate-b")] }))
  const firstResult = evaluateK6R1ModelProviderRouteEligibility(first)
  const secondResult = evaluateK6R1ModelProviderRouteEligibility(second)
  assert.notEqual(first.requestIdentity, second.requestIdentity)
  assert.equal(firstResult.candidateResults[0]?.status, secondResult.candidateResults[0]?.status)
  assert.deepEqual(firstResult.candidateResults[0]?.reasons, secondResult.candidateResults[0]?.reasons)
})

test("qualification FAIL and PENDING are valid inputs but always ineligible", () => {
  for (const status of ["FAIL", "PENDING"] as const) {
    const entry = candidate(status.toLowerCase(), { qualification: { ...candidate("x").qualification as object, status } })
    const result = evaluateK6R1ModelProviderRouteEligibility(createK6R1RouteRequest(requestInput({ candidates: [entry] })))
    assert.equal(result.candidateResults[0]?.status, "INELIGIBLE")
    assert.deepEqual(result.candidateResults[0]?.reasons, ["QUALIFICATION_NOT_PASS"])
  }
})

test("qualification provider and model mismatches are identity failures", () => {
  const entry = candidate("mismatch", { qualification: { ...candidate("x").qualification as object, provider: "different-provider", model: "different-model" } })
  const result = evaluateK6R1ModelProviderRouteEligibility(createK6R1RouteRequest(requestInput({ candidates: [entry] })))
  assert.deepEqual(result.candidateResults[0]?.reasons, ["QUALIFICATION_IDENTITY_MISMATCH"])
})

test("missing capabilities are complete, unique, canonical, and emitted once", () => {
  const request = createK6R1RouteRequest(requestInput({
    requiredCapabilities: ["tool/write", "repo/search", "model/generate"],
    candidates: [candidate("missing", { declaredCapabilities: ["model/generate"] })],
  }))
  const result = evaluateK6R1ModelProviderRouteEligibility(request)
  assert.deepEqual(result.candidateResults[0]?.reasons, ["MISSING_REQUIRED_CAPABILITY"])
  assert.deepEqual(result.candidateResults[0]?.missingCapabilities, ["repo/search", "tool/write"])
})

test("risk comparison uses only LOW < MEDIUM < HIGH < CRITICAL", () => {
  for (const [requestRisk, maximumRisk, expected] of [["LOW", "LOW", "ELIGIBLE"], ["MEDIUM", "HIGH", "ELIGIBLE"], ["HIGH", "MEDIUM", "INELIGIBLE"], ["CRITICAL", "HIGH", "INELIGIBLE"]] as const) {
    const request = createK6R1RouteRequest(requestInput({ riskClass: requestRisk, candidates: [candidate(`${requestRisk}-${maximumRisk}`, { maximumRiskClass: maximumRisk })] }))
    const result = evaluateK6R1ModelProviderRouteEligibility(request)
    assert.equal(result.candidateResults[0]?.status, expected)
    assert.equal(result.candidateResults[0]?.reasons.includes("RISK_CLASS_UNSUPPORTED"), expected === "INELIGIBLE")
  }
})

test("privacy is exact membership with no hierarchy or inheritance", () => {
  const request = createK6R1RouteRequest(requestInput({ privacyClass: "PUBLIC", candidates: [candidate("privacy", { supportedPrivacyClasses: ["SENSITIVE"] })] }))
  assert.deepEqual(evaluateK6R1ModelProviderRouteEligibility(request).candidateResults[0]?.reasons, ["PRIVACY_CLASS_UNSUPPORTED"])
})

test("simultaneous failures use exact cumulative reason order", () => {
  const entry = candidate("all-fail", {
    declaredCapabilities: [],
    maximumRiskClass: "LOW",
    supportedPrivacyClasses: ["PUBLIC"],
    qualification: { ...candidate("x").qualification as object, provider: "other-provider", status: "FAIL" },
  })
  const request = createK6R1RouteRequest(requestInput({ riskClass: "CRITICAL", privacyClass: "SENSITIVE", candidates: [entry] }))
  const result = evaluateK6R1ModelProviderRouteEligibility(request)
  assert.deepEqual(result.candidateResults[0]?.reasons, ["QUALIFICATION_IDENTITY_MISMATCH", "QUALIFICATION_NOT_PASS", "MISSING_REQUIRED_CAPABILITY", "RISK_CLASS_UNSUPPORTED", "PRIVACY_CLASS_UNSUPPORTED"])
  assert.deepEqual(result.candidateResults[0]?.missingCapabilities, ["model/generate", "repo/search"])
})

test("result is authority-bounded and contains no selection or execution semantics", () => {
  const text = JSON.stringify(evaluateK6R1ModelProviderRouteEligibility(createK6R1RouteRequest(requestInput())))
  for (const token of ["winner", "ranking", "score", "probability", "fallback", "execution", "PROVEN_READY", "toolCall", "prompt", "secret"]) assert.equal(text.includes(token), false, token)
})

test("zero and over-bound candidate sets fail closed", () => {
  assert.throws(() => createK6R1RouteRequest(requestInput({ candidates: [] })), RangeError)
  assert.throws(() => createK6R1RouteRequest(requestInput({ candidates: Array.from({ length: 129 }, (_, index) => candidate(`c-${index}`)) })), RangeError)
})

test("duplicate candidate IDs fail closed", () => {
  assert.throws(() => createK6R1RouteRequest(requestInput({ candidates: [candidate("same"), candidate("same")] })), TypeError)
})

test("zero and duplicate required capabilities fail closed", () => {
  assert.throws(() => createK6R1RouteRequest(requestInput({ requiredCapabilities: [] })), RangeError)
  assert.throws(() => createK6R1RouteRequest(requestInput({ requiredCapabilities: ["repo/search", "repo/search"] })), TypeError)
})

test("malformed and over-bound capability identifiers fail closed", () => {
  for (const capability of ["Repo/Search", "repo", "repo//search", "repo/search!"]) assert.throws(() => createK6R1RouteRequest(requestInput({ requiredCapabilities: [capability] })), TypeError)
  assert.throws(() => createK6R1RouteRequest(requestInput({ requiredCapabilities: [`a/${"b".repeat(159)}`] })), RangeError)
})

test("UTF-8 byte bounds are enforced", () => {
  assert.throws(() => createK6R1RouteRequest(requestInput({ repositoryId: "é".repeat(257) })), RangeError)
  assert.throws(() => createK6R1RouteRequest(requestInput({ taskId: "é".repeat(129) })), RangeError)
})

test("unknown fields fail closed at every contract layer", () => {
  assert.throws(() => createK6R1RouteRequest({ ...requestInput(), authority: "PROVEN_READY" }), TypeError)
  assert.throws(() => createK6R1RouteRequest(requestInput({ candidates: [{ ...candidate("extra"), extra: true }] })), TypeError)
  const badQualification = { ...(candidate("x").qualification as object), extra: true }
  assert.throws(() => createK6R1RouteRequest(requestInput({ candidates: [candidate("extra-q", { qualification: badQualification })] })), TypeError)
  const validResult = evaluateK6R1ModelProviderRouteEligibility(createK6R1RouteRequest(requestInput()))
  assert.throws(() => validateK6R1RouteEligibilityResult({ ...validResult, winner: "a" }), TypeError)
})

test("unsupported versions, candidate kinds, risk classes, and privacy classes fail closed", () => {
  assert.throws(() => createK6R1RouteRequest(requestInput({ version: "future" })), TypeError)
  assert.throws(() => createK6R1RouteRequest(requestInput({ riskClass: "EXTREME" })), TypeError)
  assert.throws(() => createK6R1RouteRequest(requestInput({ privacyClass: "PHI" })), TypeError)
  assert.throws(() => createK6R1RouteRequest(requestInput({ candidates: [candidate("tool", { candidateKind: "TOOL" })] })), TypeError)
})

test("malformed qualification protocol, version, and digests fail closed", () => {
  const baseQualification = candidate("x").qualification as Record<string, unknown>
  for (const qualification of [{ ...baseQualification, protocol: "other" }, { ...baseQualification, version: 2 }, { ...baseQualification, version: -0 }, { ...baseQualification, workspaceDigest: "A".repeat(64) }, { ...baseQualification, reportDigest: "b".repeat(63) }]) {
    assert.throws(() => createK6R1RouteRequest(requestInput({ candidates: [candidate("bad-q", { qualification })] })), TypeError)
  }
})

test("forged claimed request and result identities fail closed", () => {
  const request = createK6R1RouteRequest(requestInput())
  assert.throws(() => validateK6R1RouteRequest({ ...request, requestIdentity: "f".repeat(64) }), TypeError)
  const result = evaluateK6R1ModelProviderRouteEligibility(request)
  assert.throws(() => validateK6R1RouteEligibilityResult({ ...result, resultIdentity: "f".repeat(64) }), TypeError)
})

test("nested proxies fail closed before intentional proxy trap access", () => {
  let traps = 0
  const proxy = new Proxy(candidate("proxy").qualification as object, {
    getPrototypeOf() { traps += 1; throw new Error("trap") },
    ownKeys() { traps += 1; throw new Error("trap") },
    getOwnPropertyDescriptor() { traps += 1; throw new Error("trap") },
  })
  assert.throws(() => createK6R1RouteRequest(requestInput({ candidates: [candidate("proxy", { qualification: proxy })] })), /Proxy/)
  assert.equal(traps, 0)
})

test("accessors, symbol keys, sparse arrays, and non-plain prototypes fail closed", () => {
  const accessor = candidate("accessor")
  Object.defineProperty(accessor, "provider", { enumerable: true, get() { return "provider" } })
  assert.throws(() => createK6R1RouteRequest(requestInput({ candidates: [accessor] })), TypeError)
  const symbolCandidate = candidate("symbol")
  Object.defineProperty(symbolCandidate, Symbol("authority"), { enumerable: true, value: "PROVEN_READY" })
  assert.throws(() => createK6R1RouteRequest(requestInput({ candidates: [symbolCandidate] })), TypeError)
  assert.throws(() => createK6R1RouteRequest(requestInput({ requiredCapabilities: new Array(1) })), TypeError)
  const nonPlain = Object.assign(Object.create({ inherited: true }), candidate("prototype"))
  assert.throws(() => createK6R1RouteRequest(requestInput({ candidates: [nonPlain] })), TypeError)
})

test("invalid Unicode including unpaired surrogates fails closed", () => {
  assert.throws(() => createK6R1RouteRequest(requestInput({ taskId: "bad\ud800" })), TypeError)
  assert.throws(() => canonicalK6R1Json("bad\udc00"), TypeError)
})

test("cyclic canonical input fails closed", () => {
  const cyclic: Record<string, unknown> = {}
  cyclic.self = cyclic
  assert.throws(() => canonicalK6R1Json(cyclic), /cyclic/)
})

test("canonical depth and node-count exhaustion fail closed", () => {
  let deep: unknown = "leaf"
  for (let index = 0; index < 33; index += 1) deep = [deep]
  assert.throws(() => canonicalK6R1Json(deep), RangeError)
  assert.throws(() => canonicalK6R1Json(Array.from({ length: 50_001 }, () => null)), RangeError)
})

test("caller-owned inputs are never mutated", () => {
  const input = requestInput()
  const before = deepJsonClone(input)
  const request = createK6R1RouteRequest(input)
  evaluateK6R1ModelProviderRouteEligibility(request)
  assert.deepEqual(input, before)
})

test("candidate result ordering follows unsigned UTF-16 code units", () => {
  const request = createK6R1RouteRequest(requestInput({ candidates: [candidate("\uE000"), candidate("😀"), candidate("a"), candidate("A")] }))
  assert.deepEqual(request.candidates.map((entry) => entry.candidateId), ["A", "a", "😀", "\uE000"])
  const result = evaluateK6R1ModelProviderRouteEligibility(request)
  assert.deepEqual(result.candidateResults.map((entry) => entry.candidateId), ["A", "a", "😀", "\uE000"])
})

test("qualification version serializes exactly as decimal integer 1", () => {
  const request = createK6R1RouteRequest(requestInput({ candidates: [candidate("one")] }))
  const { requestIdentity: _ignored, ...preimage } = request
  const text = canonicalK6R1Json(preimage)
  assert.match(text, /\"version\":1/)
  assert.doesNotMatch(text, /1\.0|1e\+?0/i)
})

test("the public request input type remains the exact v1 structural contract", () => {
  const typed: K6R1RouteRequestIdentityInput = createK6R1RouteRequest(requestInput())
  assert.equal(typed.version, K6_R1_ROUTE_REQUEST_VERSION)
})
