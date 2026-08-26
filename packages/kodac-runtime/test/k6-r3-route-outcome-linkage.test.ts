import assert from "node:assert/strict"
import test from "node:test"

import { K6_R1_ROUTE_REQUEST_VERSION, createK6R1RouteRequest } from "../src/evidence-router/contracts.ts"
import { evaluateK6R1ModelProviderRouteEligibility } from "../src/evidence-router/eligibility.ts"
import {
  K6_R2_ORDERING_BASIS,
  K6_R2_ROUTE_PLAN_REQUEST_VERSION,
  createK6R2RoutePlanRequest,
} from "../src/evidence-router/route-plan-contracts.ts"
import { materializeK6R2DeterministicRoutePlan } from "../src/evidence-router/route-plan.ts"
import {
  K6_R3_DONE_GATE_OUTCOME_VERSION,
  K6_R3_LIMITS,
  createK6R3RouteOutcomeLinkage,
  validateK6R3RouteOutcomeLinkage,
  validateK6R3RouteOutcomeLinkageEnvelope,
  type K6R3RouteOutcomeLinkageInput,
} from "../src/evidence-router/outcome-linkage-contracts.ts"
import { materializeK6R3RouteOutcomeLinkage } from "../src/evidence-router/outcome-linkage.ts"
import { createK5R2SourceLink, type K5R2SourceLink } from "../src/proof-review/linkage-contracts.ts"
import {
  K5_R4_PROOF_STATE_RECONCILIATION_VERSION,
  k5R4ReconciliationIdentity,
  type K5R4Cause,
  type K5R4EvidenceResult,
  type K5R4EvidenceState,
  type K5R4ProofStateReconciliation,
  type K5R4ProofStateReconciliationInput,
} from "../src/proof-review/reconciliation-contracts.ts"

const base = "1".repeat(40)
const head = "2".repeat(40)
const repositoryId = "TheHalfMoon/Kodac"

type Mutable<T> = T extends readonly (infer U)[]
  ? Mutable<U>[]
  : T extends object
    ? { -readonly [Key in keyof T]: Mutable<T[Key]> }
    : T

function clone<T>(value: T): Mutable<T> {
  return JSON.parse(JSON.stringify(value)) as Mutable<T>
}

function candidate(candidateId: string, pass = true) {
  return {
    candidateId,
    candidateKind: "MODEL_PROVIDER" as const,
    provider: `provider-${candidateId}`,
    model: `model-${candidateId}`,
    declaredCapabilities: ["model/generate", "repo/search"],
    maximumRiskClass: "HIGH" as const,
    supportedPrivacyClasses: ["PUBLIC", "REPOSITORY_PRIVATE", "SENSITIVE"] as const,
    qualification: {
      protocol: "kodac.provider-qualification" as const,
      version: 1 as const,
      provider: `provider-${candidateId}`,
      model: `model-${candidateId}`,
      workspaceDigest: "d".repeat(64),
      status: pass ? "PASS" as const : "FAIL" as const,
      reportDigest: candidateId.repeat(64),
    },
  }
}

function route(allIneligible = false) {
  const request = createK6R1RouteRequest({
    version: K6_R1_ROUTE_REQUEST_VERSION,
    repositoryId,
    canonicalBase: base,
    candidateHead: head,
    taskId: "k6-r3/vector",
    riskClass: "MEDIUM",
    privacyClass: "REPOSITORY_PRIVATE",
    requiredCapabilities: ["repo/search", "model/generate"],
    candidates: allIneligible ? [candidate("a", false)] : [candidate("b"), candidate("a")],
  })
  const eligibility = evaluateK6R1ModelProviderRouteEligibility(request)
  const routePlanRequest = createK6R2RoutePlanRequest({
    version: K6_R2_ROUTE_PLAN_REQUEST_VERSION,
    orderingBasis: K6_R2_ORDERING_BASIS,
    eligibilityResult: eligibility,
    orderedEligibleCandidateIds: allIneligible ? [] : ["a", "b"],
  })
  return { routePlanRequest, routePlan: materializeK6R2DeterministicRoutePlan(routePlanRequest) }
}

function receipt(
  index: number,
  resultStatus: "success" | "blocked" | "failure" = "success",
  receiptId = `receipt-${index}`,
): K5R2SourceLink {
  return createK5R2SourceLink({
    evidenceId: `e-receipt-${index}`,
    sourceKind: "EXECUTION_RECEIPT",
    canonicalBase: base,
    candidateHead: head,
    sourceRef: `receipt:${index}`,
    sourceDigest: index.toString(16).padStart(64, "a").slice(-64),
    metadata: {
      receiptId,
      capability: "repo.apply_patch",
      inputDigest: "f".repeat(64),
      policyDecision: "allow",
      resultStatus,
    },
  })
}

function verification(passed = true): K5R2SourceLink {
  return createK5R2SourceLink({
    evidenceId: "e-verify",
    sourceKind: "VERIFICATION_REPORT",
    canonicalBase: base,
    candidateHead: head,
    sourceRef: "verification:v1",
    sourceDigest: "e".repeat(64),
    metadata: {
      protocol: "kodac.verification",
      reportVersion: 1,
      sessionId: "session-k6-r3",
      passed,
      checkIds: ["agent.completed", "workspace.integrity"],
    },
  })
}

function stateFacts(state: K5R4EvidenceState): {
  r1Status: "SATISFIED" | "FAILED" | "CONTRADICTORY" | "STALE" | "INVALID"
  causes: readonly K5R4Cause[]
} {
  switch (state) {
    case "VALID": return { r1Status: "SATISFIED", causes: [] }
    case "INCOMPLETE": return { r1Status: "FAILED", causes: ["R1_EXPLICIT_FAILED"] }
    case "CONTRADICTORY": return { r1Status: "CONTRADICTORY", causes: ["R1_EXPLICIT_CONTRADICTORY"] }
    case "STALE": return { r1Status: "STALE", causes: ["R1_EXPLICIT_STALE"] }
    case "INVALID": return { r1Status: "INVALID", causes: ["R1_EXPLICIT_INVALID"] }
  }
}

function reconciliation(
  sources: readonly K5R2SourceLink[],
  state: K5R4EvidenceState = "VALID",
  repo = repositoryId,
): K5R4ProofStateReconciliation {
  const facts = stateFacts(state)
  const results: K5R4EvidenceResult[] = sources.map((source) => ({
    evidenceId: source.evidenceId,
    evidenceKind: source.sourceKind === "VERIFICATION_REPORT" ? "VERIFICATION" : "EXECUTION_RECEIPT",
    r1Status: facts.r1Status,
    linkageLayer: "K5_R2",
    linkStatus: "LINKED",
    sourceIdentity: source.sourceIdentity,
    state,
    causes: facts.causes,
  }))
  results.sort((left, right) => left.evidenceId < right.evidenceId ? -1 : left.evidenceId > right.evidenceId ? 1 : 0)
  const preimage = {
    version: K5_R4_PROOF_STATE_RECONCILIATION_VERSION,
    packageIdentity: "9".repeat(64),
    r2LinkageIdentity: "8".repeat(64),
    r3LinkageIdentity: "7".repeat(64),
    revision: { repositoryId: repo, canonicalBase: base, candidateHead: head },
    status: state,
    results,
    outOfScopeEvidenceIds: [],
  } satisfies K5R4ProofStateReconciliationInput
  return Object.freeze({ ...preimage, reconciliationIdentity: k5R4ReconciliationIdentity(preimage) })
}

function input(options: {
  observations?: readonly { planStepIndex: number; source: K5R2SourceLink }[]
  verificationSource?: K5R2SourceLink
  state?: K5R4EvidenceState
  doneStatus?: "PROVEN_READY" | "NOT_READY"
  repository?: string
} = {}): K6R3RouteOutcomeLinkageInput {
  const { routePlanRequest, routePlan } = route()
  const verificationSource = options.verificationSource ?? verification()
  const observations = options.observations ?? [{ planStepIndex: 0, source: receipt(0) }]
  const sources = [...observations.map((item) => item.source), verificationSource]
  const status = options.doneStatus ?? "NOT_READY"
  return {
    routePlanRequest,
    routePlan,
    executionObservations: observations.map((item) => ({
      planStepIndex: item.planStepIndex,
      executionReceiptSource: item.source,
    })),
    verificationSource,
    k5Reconciliation: reconciliation(sources, options.state ?? "VALID", options.repository ?? repositoryId),
    doneGateOutcome: {
      version: K6_R3_DONE_GATE_OUTCOME_VERSION,
      verificationSourceIdentity: verificationSource.sourceIdentity,
      status,
      reasons: status === "PROVEN_READY" ? [] : ["caller-materialized not ready"],
      evidence: [
        { kind: "receipt", ref: "receipt:0", digest: "a".repeat(64) },
        { kind: "workspace", ref: "workspace:proof" },
      ],
    },
  }
}

test("materializes exact predecessor projections without execution authority", () => {
  const source = input()
  const linkage = materializeK6R3RouteOutcomeLinkage(source)
  assert.equal(linkage.repositoryId, repositoryId)
  assert.equal(linkage.routePlanIdentity, source.routePlan.planIdentity)
  assert.equal(linkage.routePlanRequestIdentity, source.routePlanRequest.planRequestIdentity)
  assert.deepEqual(
    linkage.executionObservations.map((item) => [item.candidateId, item.role, item.executionResultStatus]),
    [["a", "PRIMARY", "success"]],
  )
  assert.equal(linkage.verificationPassed, true)
  assert.equal(linkage.k5Status, "VALID")
  assert.equal(linkage.doneGateStatus, "NOT_READY")
  assert.equal(validateK6R3RouteOutcomeLinkage(linkage, source).linkageIdentity, linkage.linkageIdentity)
  assert.equal(validateK6R3RouteOutcomeLinkageEnvelope({ input: source, linkage }).linkage.linkageIdentity, linkage.linkageIdentity)
  assert.equal(Object.hasOwn(linkage, "retry"), false)
  assert.equal(Object.hasOwn(linkage, "fallbackDecision"), false)
  assert.equal(Object.hasOwn(linkage, "provenReady"), false)
})

test("observation order is identity-significant and repeated steps do not imply retry", () => {
  const r0 = receipt(0)
  const r1 = receipt(1)
  const first = createK6R3RouteOutcomeLinkage(input({ observations: [
    { planStepIndex: 0, source: r0 },
    { planStepIndex: 0, source: r1 },
  ] }))
  const second = createK6R3RouteOutcomeLinkage(input({ observations: [
    { planStepIndex: 0, source: r1 },
    { planStepIndex: 0, source: r0 },
  ] }))
  assert.notEqual(first.linkageIdentity, second.linkageIdentity)
  assert.deepEqual(first.executionObservations.map((item) => item.receiptId), ["receipt-0", "receipt-1"])
  assert.deepEqual(first.executionObservations.map((item) => item.planStepIndex), [0, 0])
})

test("PRIMARY/FALLBACK and receipt statuses are preserved without policy inference", () => {
  const fallback = createK6R3RouteOutcomeLinkage(input({ observations: [{ planStepIndex: 1, source: receipt(0) }] }))
  assert.deepEqual([fallback.executionObservations[0]?.candidateId, fallback.executionObservations[0]?.role], ["b", "FALLBACK"])
  for (const status of ["success", "blocked", "failure"] as const) {
    const linkage = createK6R3RouteOutcomeLinkage(input({ observations: [{ planStepIndex: 0, source: receipt(0, status) }] }))
    assert.equal(linkage.executionObservations[0]?.executionResultStatus, status)
    assert.equal(Object.hasOwn(linkage.executionObservations[0] as object, "retryable"), false)
  }
})

test("K5 and Done Gate caller outcomes are preserved without reinterpretation", () => {
  for (const state of ["VALID", "INCOMPLETE", "CONTRADICTORY", "STALE", "INVALID"] as const) {
    assert.equal(createK6R3RouteOutcomeLinkage(input({ state })).k5Status, state)
  }
  assert.equal(createK6R3RouteOutcomeLinkage(input({ doneStatus: "PROVEN_READY" })).doneGateStatus, "PROVEN_READY")
  assert.equal(createK6R3RouteOutcomeLinkage(input({ doneStatus: "NOT_READY" })).doneGateStatus, "NOT_READY")
})

test("forged R2 identities and no-route plans fail closed", () => {
  const forgedRequest = clone(input())
  forgedRequest.routePlanRequest.planRequestIdentity = "0".repeat(64)
  assert.throws(() => createK6R3RouteOutcomeLinkage(forgedRequest), TypeError)

  const forgedPlan = clone(input())
  forgedPlan.routePlan.planIdentity = "0".repeat(64)
  assert.throws(() => createK6R3RouteOutcomeLinkage(forgedPlan), TypeError)

  const noRoute = route(true)
  const source = input()
  assert.throws(() => createK6R3RouteOutcomeLinkage({ ...source, ...noRoute }), TypeError)
})

test("revision, repository, membership, source identity, and receipt identity drift fail closed", () => {
  assert.throws(() => createK6R3RouteOutcomeLinkage(input({ repository: "other/repo" })), /repositoryId/)

  const revision = clone(input())
  revision.executionObservations[0]!.executionReceiptSource.candidateHead = "3".repeat(40)
  assert.throws(() => createK6R3RouteOutcomeLinkage(revision), TypeError)

  const missing = clone(input())
  missing.k5Reconciliation.results = missing.k5Reconciliation.results.filter((item) => item.evidenceKind !== "EXECUTION_RECEIPT")
  const preimage = { ...missing.k5Reconciliation }
  delete (preimage as Partial<typeof preimage>).reconciliationIdentity
  missing.k5Reconciliation.reconciliationIdentity = k5R4ReconciliationIdentity(preimage as K5R4ProofStateReconciliationInput)
  assert.throws(() => createK6R3RouteOutcomeLinkage(missing), TypeError)

  const sameSource = receipt(0)
  assert.throws(() => createK6R3RouteOutcomeLinkage(input({ observations: [
    { planStepIndex: 0, source: sameSource },
    { planStepIndex: 1, source: sameSource },
  ] })), TypeError)

  assert.throws(() => createK6R3RouteOutcomeLinkage(input({ observations: [
    { planStepIndex: 0, source: receipt(0, "success", "same") },
    { planStepIndex: 1, source: receipt(1, "failure", "same") },
  ] })), TypeError)
})

test("Done Gate binding, reason invariant, duplicate evidence, and linkage tampering fail closed", () => {
  const wrongSource = clone(input())
  wrongSource.doneGateOutcome.verificationSourceIdentity = "0".repeat(64)
  assert.throws(() => createK6R3RouteOutcomeLinkage(wrongSource), TypeError)

  const readyWithReason = clone(input({ doneStatus: "PROVEN_READY" }))
  readyWithReason.doneGateOutcome.reasons = ["not allowed"]
  assert.throws(() => createK6R3RouteOutcomeLinkage(readyWithReason), TypeError)

  const duplicate = clone(input())
  duplicate.doneGateOutcome.evidence.push(clone(duplicate.doneGateOutcome.evidence[0]!))
  assert.throws(() => createK6R3RouteOutcomeLinkage(duplicate), TypeError)

  const source = input()
  const forged = clone(createK6R3RouteOutcomeLinkage(source))
  forged.linkageIdentity = "0".repeat(64)
  assert.throws(() => validateK6R3RouteOutcomeLinkage(forged, source), TypeError)

  const projection = clone(createK6R3RouteOutcomeLinkage(source))
  projection.executionObservations[0]!.provider = "other-provider"
  assert.throws(() => validateK6R3RouteOutcomeLinkage(projection, source), TypeError)
})

test("R3-owned proxy, accessor, symbol, sparse-array, and non-plain inputs fail closed", () => {
  let traps = 0
  const proxy = new Proxy(input(), {
    get() { traps += 1; throw new Error("trap") },
    ownKeys() { traps += 1; throw new Error("trap") },
    getOwnPropertyDescriptor() { traps += 1; throw new Error("trap") },
  })
  assert.throws(() => createK6R3RouteOutcomeLinkage(proxy), /Proxy/)
  assert.equal(traps, 0)

  const accessor = input() as unknown as Record<string, unknown>
  let gets = 0
  Object.defineProperty(accessor, "doneGateOutcome", { enumerable: true, get() { gets += 1; return {} } })
  assert.throws(() => createK6R3RouteOutcomeLinkage(accessor), /data property/)
  assert.equal(gets, 0)

  const symbolic = input() as unknown as Record<PropertyKey, unknown>
  symbolic[Symbol("unexpected")] = true
  assert.throws(() => createK6R3RouteOutcomeLinkage(symbolic), /symbol/)

  const sparse = clone(input())
  sparse.executionObservations = new Array(2)
  sparse.executionObservations[1] = clone(input().executionObservations[0]!)
  assert.throws(() => createK6R3RouteOutcomeLinkage(sparse), /dense/)

  const nonPlain = clone(input())
  nonPlain.doneGateOutcome = new (class Outcome {
    version = K6_R3_DONE_GATE_OUTCOME_VERSION
    verificationSourceIdentity = nonPlain.verificationSource.sourceIdentity
    status = "NOT_READY" as const
    reasons = ["reason"]
    evidence: never[] = []
  })()
  assert.throws(() => createK6R3RouteOutcomeLinkage(nonPlain), /plain object/)
})

test("Unicode, NUL, resource bounds, and plan-step bounds fail closed", () => {
  const unicode = clone(input())
  unicode.doneGateOutcome.reasons = ["\ud800"]
  assert.throws(() => createK6R3RouteOutcomeLinkage(unicode), TypeError)

  const nul = clone(input())
  nul.doneGateOutcome.reasons = ["bad\0reason"]
  assert.throws(() => createK6R3RouteOutcomeLinkage(nul), TypeError)

  const over = clone(input())
  over.doneGateOutcome.reasons = Array.from({ length: K6_R3_LIMITS.maxDoneGateReasons + 1 }, () => "x")
  assert.throws(() => createK6R3RouteOutcomeLinkage(over), RangeError)

  const outOfRange = clone(input())
  outOfRange.executionObservations[0]!.planStepIndex = 99
  assert.throws(() => createK6R3RouteOutcomeLinkage(outOfRange), TypeError)
})

test("inputs remain unchanged, output is immutable, and canonical identities are deterministic", () => {
  const source = input({ observations: [
    { planStepIndex: 0, source: receipt(0) },
    { planStepIndex: 1, source: receipt(1) },
  ] })
  const before = JSON.stringify(source)
  const first = createK6R3RouteOutcomeLinkage(source)
  const second = createK6R3RouteOutcomeLinkage(clone(source))
  assert.equal(JSON.stringify(source), before)
  assert.equal(Object.isFrozen(first), true)
  assert.equal(Object.isFrozen(first.executionObservations), true)
  assert.equal(Object.isFrozen(first.executionObservations[0]), true)
  assert.equal(first.doneGateOutcomeIdentity, second.doneGateOutcomeIdentity)
  assert.equal(first.linkageIdentity, second.linkageIdentity)
})
