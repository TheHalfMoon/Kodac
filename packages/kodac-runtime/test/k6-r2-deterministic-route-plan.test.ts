import assert from "node:assert/strict"
import test from "node:test"

import {
  K6_R1_ROUTE_REQUEST_VERSION,
  canonicalK6R1Json,
  createK6R1RouteRequest,
} from "../src/evidence-router/contracts.ts"
import { evaluateK6R1ModelProviderRouteEligibility } from "../src/evidence-router/eligibility.ts"
import {
  K6_R2_ORDERING_BASIS,
  K6_R2_ROUTE_PLAN_REQUEST_VERSION,
  createK6R2RoutePlanRequest,
  validateK6R2RoutePlan,
  validateK6R2RoutePlanRequest,
} from "../src/evidence-router/route-plan-contracts.ts"
import { materializeK6R2DeterministicRoutePlan } from "../src/evidence-router/route-plan.ts"

function candidate(candidateId: string, eligible = true): Record<string, unknown> {
  return {
    candidateId,
    candidateKind: "MODEL_PROVIDER",
    provider: `provider-${candidateId}`,
    model: `model-${candidateId}`,
    declaredCapabilities: ["model/generate", "repo/search"],
    maximumRiskClass: "HIGH",
    supportedPrivacyClasses: ["PUBLIC", "REPOSITORY_PRIVATE", "SENSITIVE"],
    qualification: {
      protocol: "kodac.provider-qualification",
      version: 1,
      provider: `provider-${candidateId}`,
      model: `model-${candidateId}`,
      workspaceDigest: "d".repeat(64),
      status: eligible ? "PASS" : "FAIL",
      reportDigest: candidateId.repeat(64),
    },
  }
}

function eligibilityResult(options: { allIneligible?: boolean } = {}) {
  const request = createK6R1RouteRequest({
    version: K6_R1_ROUTE_REQUEST_VERSION,
    repositoryId: "TheHalfMoon/Kodac",
    canonicalBase: "1".repeat(40),
    candidateHead: "2".repeat(40),
    taskId: "k6-r2/vector",
    riskClass: "MEDIUM",
    privacyClass: "REPOSITORY_PRIVATE",
    requiredCapabilities: ["repo/search", "model/generate"],
    candidates: options.allIneligible
      ? [candidate("a", false), candidate("b", false)]
      : [candidate("c", false), candidate("b"), candidate("a")],
  })
  return evaluateK6R1ModelProviderRouteEligibility(request)
}

function requestInput(order: readonly string[], result = eligibilityResult()): Record<string, unknown> {
  return {
    version: K6_R2_ROUTE_PLAN_REQUEST_VERSION,
    orderingBasis: K6_R2_ORDERING_BASIS,
    eligibilityResult: result,
    orderedEligibleCandidateIds: order,
  }
}

function deepJsonClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

test("materializes one primary and ordered fallbacks from caller order only", () => {
  const request = createK6R2RoutePlanRequest(requestInput(["b", "a"]))
  const plan = materializeK6R2DeterministicRoutePlan(request)

  assert.equal(plan.status, "ROUTABLE")
  assert.deepEqual(plan.steps.map((step) => step.candidateId), ["b", "a"])
  assert.deepEqual(plan.steps.map((step) => step.role), ["PRIMARY", "FALLBACK"])
  assert.equal(plan.steps[0]?.provider, "provider-b")
  assert.equal(plan.steps[0]?.model, "model-b")
  assert.equal(plan.steps[0]?.qualificationReportDigest, "b".repeat(64))
  assert.equal(plan.eligibilityResultIdentity, request.eligibilityResult.resultIdentity)
  assert.equal(plan.requestIdentity, request.eligibilityResult.requestIdentity)
  assert.equal(plan.repositoryId, request.eligibilityResult.repositoryId)
  assert.equal(plan.canonicalBase, request.eligibilityResult.canonicalBase)
  assert.equal(plan.candidateHead, request.eligibilityResult.candidateHead)
  assert.equal(plan.taskId, request.eligibilityResult.taskId)
  assert.equal(validateK6R2RoutePlan(plan, request).planIdentity, plan.planIdentity)
})

test("one eligible candidate produces exactly one PRIMARY step", () => {
  const result = eligibilityResult()
  const oneEligibleResult = {
    ...deepJsonClone(result),
    candidateResults: result.candidateResults.map((entry) => entry.candidateId === "b"
      ? { ...deepJsonClone(entry), status: "INELIGIBLE", reasons: ["QUALIFICATION_NOT_PASS"] }
      : deepJsonClone(entry)),
  }
  assert.throws(() => createK6R2RoutePlanRequest(requestInput(["a"], oneEligibleResult)), TypeError)

  const request = createK6R2RoutePlanRequest(requestInput(["a", "b"]))
  const plan = materializeK6R2DeterministicRoutePlan(request)
  assert.equal(plan.steps[0]?.role, "PRIMARY")
  assert.equal(plan.steps.filter((step) => step.role === "PRIMARY").length, 1)
})

test("zero eligible candidates require empty order and emit no request-only fields in the plan", () => {
  const result = eligibilityResult({ allIneligible: true })
  const request = createK6R2RoutePlanRequest(requestInput([], result))
  const plan = materializeK6R2DeterministicRoutePlan(request)

  assert.equal(plan.status, "NO_ELIGIBLE_CANDIDATE")
  assert.deepEqual(plan.steps, [])
  assert.equal(Object.hasOwn(plan, "orderedEligibleCandidateIds"), false)
  assert.throws(() => createK6R2RoutePlanRequest(requestInput(["a"], result)), TypeError)
})

test("caller order is an exact permutation of every and only ELIGIBLE candidate", () => {
  const result = eligibilityResult()
  assert.deepEqual(result.candidateResults.map((entry) => [entry.candidateId, entry.status]), [
    ["a", "ELIGIBLE"],
    ["b", "ELIGIBLE"],
    ["c", "INELIGIBLE"],
  ])

  assert.throws(() => createK6R2RoutePlanRequest(requestInput(["a"], result)), TypeError)
  assert.throws(() => createK6R2RoutePlanRequest(requestInput(["a", "a"], result)), TypeError)
  assert.throws(() => createK6R2RoutePlanRequest(requestInput(["a", "c"], result)), TypeError)
  assert.throws(() => createK6R2RoutePlanRequest(requestInput(["a", "unknown"], result)), TypeError)
  assert.doesNotThrow(() => createK6R2RoutePlanRequest(requestInput(["a", "b"], result)))
  assert.doesNotThrow(() => createK6R2RoutePlanRequest(requestInput(["b", "a"], result)))
})

test("caller reordering changes request and plan identities and primary/fallback roles", () => {
  const result = eligibilityResult()
  const firstRequest = createK6R2RoutePlanRequest(requestInput(["a", "b"], result))
  const secondRequest = createK6R2RoutePlanRequest(requestInput(["b", "a"], result))
  const firstPlan = materializeK6R2DeterministicRoutePlan(firstRequest)
  const secondPlan = materializeK6R2DeterministicRoutePlan(secondRequest)

  assert.notEqual(firstRequest.planRequestIdentity, secondRequest.planRequestIdentity)
  assert.notEqual(firstPlan.planIdentity, secondPlan.planIdentity)
  assert.deepEqual(firstPlan.steps.map((step) => [step.candidateId, step.role]), [["a", "PRIMARY"], ["b", "FALLBACK"]])
  assert.deepEqual(secondPlan.steps.map((step) => [step.candidateId, step.role]), [["b", "PRIMARY"], ["a", "FALLBACK"]])
})

test("identical caller input is byte-for-byte deterministic", () => {
  const result = eligibilityResult()
  const firstRequest = createK6R2RoutePlanRequest(requestInput(["b", "a"], result))
  const secondRequest = createK6R2RoutePlanRequest(deepJsonClone(requestInput(["b", "a"], result)))
  const firstPlan = materializeK6R2DeterministicRoutePlan(firstRequest)
  const secondPlan = materializeK6R2DeterministicRoutePlan(secondRequest)

  assert.equal(firstRequest.planRequestIdentity, secondRequest.planRequestIdentity)
  assert.equal(firstPlan.planIdentity, secondPlan.planIdentity)
  assert.equal(canonicalK6R1Json(firstRequest), canonicalK6R1Json(secondRequest))
  assert.equal(canonicalK6R1Json(firstPlan), canonicalK6R1Json(secondPlan))
})

test("forged R1 result, R2 request, and R2 plan identities fail closed", () => {
  const result = eligibilityResult()
  const forgedR1 = { ...deepJsonClone(result), resultIdentity: "0".repeat(64) }
  assert.throws(() => createK6R2RoutePlanRequest(requestInput(["a", "b"], forgedR1)), TypeError)

  const request = createK6R2RoutePlanRequest(requestInput(["a", "b"], result))
  const forgedRequest = { ...deepJsonClone(request), planRequestIdentity: "0".repeat(64) }
  assert.throws(() => validateK6R2RoutePlanRequest(forgedRequest), TypeError)

  const plan = materializeK6R2DeterministicRoutePlan(request)
  const forgedPlan = { ...deepJsonClone(plan), planIdentity: "0".repeat(64) }
  assert.throws(() => validateK6R2RoutePlan(forgedPlan, request), TypeError)
})

test("plan validation rejects projection, role, order, status, and extra-field drift", () => {
  const request = createK6R2RoutePlanRequest(requestInput(["a", "b"]))
  const plan = materializeK6R2DeterministicRoutePlan(request)

  const wrongProvider = deepJsonClone(plan)
  wrongProvider.steps[0] = { ...wrongProvider.steps[0]!, provider: "other" }
  assert.throws(() => validateK6R2RoutePlan(wrongProvider, request), TypeError)

  const wrongRole = deepJsonClone(plan)
  wrongRole.steps[0] = { ...wrongRole.steps[0]!, role: "FALLBACK" }
  assert.throws(() => validateK6R2RoutePlan(wrongRole, request), TypeError)

  const wrongOrder = deepJsonClone(plan)
  wrongOrder.steps = [wrongOrder.steps[1]!, wrongOrder.steps[0]!]
  assert.throws(() => validateK6R2RoutePlan(wrongOrder, request), TypeError)

  const wrongStatus = { ...deepJsonClone(plan), status: "NO_ELIGIBLE_CANDIDATE" }
  assert.throws(() => validateK6R2RoutePlan(wrongStatus, request), TypeError)

  const extra = { ...deepJsonClone(plan), orderedEligibleCandidateIds: ["a", "b"] }
  assert.throws(() => validateK6R2RoutePlan(extra, request), TypeError)
})

test("request validation rejects proxies without invoking proxy traps", () => {
  let traps = 0
  const target = requestInput(["a", "b"])
  const proxy = new Proxy(target, {
    get() {
      traps += 1
      throw new Error("proxy trap executed")
    },
    ownKeys() {
      traps += 1
      throw new Error("proxy trap executed")
    },
    getOwnPropertyDescriptor() {
      traps += 1
      throw new Error("proxy trap executed")
    },
  })
  assert.throws(() => createK6R2RoutePlanRequest(proxy), /must not be a Proxy/)
  assert.equal(traps, 0)

  const orderProxy = new Proxy(["a", "b"], {
    get() {
      traps += 1
      throw new Error("proxy trap executed")
    },
  })
  assert.throws(() => createK6R2RoutePlanRequest(requestInput(orderProxy)), /must not be a Proxy/)
  assert.equal(traps, 0)
})

test("accessors, symbols, sparse arrays, cycles, non-plain objects, and undefined fail closed", () => {
  const accessor = requestInput(["a", "b"])
  Object.defineProperty(accessor, "orderingBasis", { enumerable: true, get: () => K6_R2_ORDERING_BASIS })
  assert.throws(() => createK6R2RoutePlanRequest(accessor), TypeError)

  const symbol = requestInput(["a", "b"])
  Object.defineProperty(symbol, Symbol("hidden"), { enumerable: true, value: true })
  assert.throws(() => createK6R2RoutePlanRequest(symbol), TypeError)

  const sparse = new Array<string>(2)
  sparse[0] = "a"
  assert.throws(() => createK6R2RoutePlanRequest(requestInput(sparse)), TypeError)

  const cyclic = requestInput(["a", "b"])
  cyclic.eligibilityResult = cyclic
  assert.throws(() => createK6R2RoutePlanRequest(cyclic), TypeError)

  const nonPlain = requestInput(["a", "b"])
  Object.setPrototypeOf(nonPlain, { inherited: true })
  assert.throws(() => createK6R2RoutePlanRequest(nonPlain), TypeError)

  const missing = requestInput(["a", "b"])
  missing.orderingBasis = undefined
  assert.throws(() => createK6R2RoutePlanRequest(missing), TypeError)
})

test("invalid Unicode, NUL, UTF-8 byte overflow, and malformed versions fail closed", () => {
  const result = eligibilityResult()
  assert.throws(() => createK6R2RoutePlanRequest(requestInput(["a", "\ud800"], result)), TypeError)
  assert.throws(() => createK6R2RoutePlanRequest(requestInput(["a", "b\0"], result)), TypeError)
  assert.throws(() => createK6R2RoutePlanRequest(requestInput(["a", "é".repeat(129)], result)), RangeError)
  assert.throws(() => createK6R2RoutePlanRequest({ ...requestInput(["a", "b"], result), version: "latest" }), TypeError)
  assert.throws(() => createK6R2RoutePlanRequest({ ...requestInput(["a", "b"], result), orderingBasis: "INFERRED" }), TypeError)
})

test("inherited canonical profile rejects excessive depth and node count", () => {
  let deep: unknown = "leaf"
  for (let index = 0; index < 33; index += 1) deep = [deep]
  assert.throws(() => canonicalK6R1Json(deep), RangeError)
  assert.throws(() => canonicalK6R1Json(new Array(50_001).fill(null)), RangeError)
})

test("caller inputs are not mutated and returned request/plan structures are immutable", () => {
  const result = eligibilityResult()
  const input = requestInput(["b", "a"], deepJsonClone(result))
  const before = JSON.stringify(input)
  const request = createK6R2RoutePlanRequest(input)
  const plan = materializeK6R2DeterministicRoutePlan(request)

  assert.equal(JSON.stringify(input), before)
  assert.equal(Object.isFrozen(request), true)
  assert.equal(Object.isFrozen(request.orderedEligibleCandidateIds), true)
  assert.equal(Object.isFrozen(request.eligibilityResult), true)
  assert.equal(Object.isFrozen(plan), true)
  assert.equal(Object.isFrozen(plan.steps), true)
  assert.equal(Object.isFrozen(plan.steps[0]!), true)
})
