import assert from "node:assert/strict"
import test from "node:test"

import {
  K6_R1_ROUTE_REQUEST_VERSION,
  createK6R1RouteRequest,
} from "../src/evidence-router/contracts.ts"
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
import {
  createK5R2SourceLink,
  type K5R2SourceLink,
} from "../src/proof-review/linkage-contracts.ts"
import {
  K5_R4_PROOF_STATE_RECONCILIATION_VERSION,
  k5R4ReconciliationIdentity,
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

function candidate(candidateId: string) {
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
      status: "PASS" as const,
      reportDigest: candidateId.repeat(64),
    },
  }
}

function route() {
  const request = createK6R1RouteRequest({
    version: K6_R1_ROUTE_REQUEST_VERSION,
    repositoryId,
    canonicalBase: base,
    candidateHead: head,
    taskId: "k6-r3/vector",
    riskClass: "MEDIUM",
    privacyClass: "REPOSITORY_PRIVATE",
    requiredCapabilities: ["repo/search", "model/generate"],
    candidates: [candidate("b"), candidate("a")],
  })
  const eligibility = evaluateK6R1ModelProviderRouteEligibility(request)
  const routePlanRequest = createK6R2RoutePlanRequest({
    version: K6_R2_ROUTE_PLAN_REQUEST_VERSION,
    orderingBasis: K6_R2_ORDERING_BASIS,
    eligibilityResult: eligibility,
    orderedEligibleCandidateIds: ["a", "b"],
  })
  return { routePlanRequest, routePlan: materializeK6R2DeterministicRoutePlan(routePlanRequest) }
}

function receipt(index: number, resultStatus: "success" | "blocked" | "failure" = "success", receiptId = `receipt-${index}`): K5R2SourceLink {
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

function stateFacts(state: K5R4EvidenceState): { r1Status: "SATISFIED" | "FAILED" | "CONTRADICTORY" | "STALE" | "INVALID"; causes: readonly string[] } {
  switch (state) {
    case "VALID": return { r1Status: "SATISFIED", causes: [] }
    case "INCOMPLETE": return { r1Status: "FAILED", causes: ["R1_EXPLICIT_FAILED"] }
    case "CONTRADICTORY": return { r1Status: "CONTRADICTORY", causes: ["R1_EXPLICIT_CONTRADICTORY"] }
    case "STALE": return { r1Status: "STALE", causes: ["R1_EXPLICIT_STALE"] }
    case "INVALID": return { r1Status: "INVALID", causes: ["R1_EXPLICIT_INVALID"] }
  }
}

function reconciliation(sources: readonly K5R2SourceLink[], state: K5R4EvidenceState = "VALID", repo = repositoryId): K5R4ProofStateReconciliation {
  const facts = stateFacts(state)
  const results = sources.map((source) => ({
    evidenceId: source.evidenceId,
    evidenceKind: source.sourceKind === "VERIFICATION_REPORT" ? "VERIFICATION" as const : "EXECUTION_RECEIPT" as const,
    r1Status: facts.r1Status,
    linkageLayer: "K5_R2" as const,
    linkStatus: "LINKED" as const,
    sourceIdentity: source.sourceIdentity,
    state,
    causes: facts.causes,
  })).sort((left, right) => left.evidenceId < right.evidenceId ? -1 : left.evidenceId > right.evidenceId ? 1 : 0)
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
    executionObservations: observations.map((item) => ({ planStepIndex: item.planStepIndex, executionReceiptSource: item.source })),
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
  assert.equal(linkage.executionObservations[0]?.candidateId, "a")
  assert.equal(linkage.executionObservations[0]?.role, "PRIMARY")
  assert.equal(linkage.executionObservations[0]?.executionResultStatus, "success")
  assert.equal(linkage.verificationPassed, true)
  assert.equal(linkage.k5Status, "VALID")
  assert.equal(linkage.doneGateStatus, "NOT_READY")
  assert.equal(validateK6R3RouteOutcomeLinkage(linkage, source).linkageIdentity, linkage.linkageIdentity)
  assert.equal(validateK6R3RouteOutcomeLinkageEnvelope({ input: source, linkage }).linkage.linkageIdentity, linkage.linkageIdentity)
  assert.equal(Object.hasOwn(linkage, "retry"), false)
  assert.equal(Object.hasOwn(linkage, "fallbackDecision"), false)
  assert.equal(Object.hasOwn(linkage, "provenReady"), false)
})

test("observation order is identity-significant and repeated plan steps remain observations only", () => {
  const r0 = receipt(0)
  const r1 = receipt(1)
  const first = input({ observations: [{ planStepIndex: 0, source: r0 }, { planStepIndex: 0, source: r1 }] })
  const second = input({ observations: [{ planStepIndex: 0, source: r1 }, { planStepIndex: 0, source: r0 }] })
  const a = createK6R3RouteOutcomeLinkage(first)
  const b = createK6R3RouteOutcomeLinkage(second)
  assert.notEqual(a.linkageIdentity, b.linkageIdentity)
  assert.deepEqual(a.executionObservations.map((item) => item.receiptId), ["receipt-0", "receipt-1"])
  assert.deepEqual(b.executionObservations.map((item) => item.receiptId), ["receipt-1", "receipt-0"])
  assert.deepEqual(a.executionObservations.map((item) => item.planStepIndex), [0, 0])
})

test("PRIMARY and FALLBACK plan projections are preserved without automatic fallback semantics", () => {
  const source = input({ observations: [{ planStepIndex: 1, source: receipt(0) }] })
  const linkage = createK6R3RouteOutcomeLinkage(source)
  assert.equal(linkage.executionObservations[0]?.candidateId, "b")
  assert.equal(linkage.executionObservations[0]?.role, "FALLBACK")
})

test("execution receipt success, blocked, and failure are preserved without classification", () => {
  for (const status of ["success", "blocked", "failure"] as const) {
    const source = input({ observations: [{ planStepIndex: 0, source: receipt(0, status) }] })
    const linkage = createK6R3RouteOutcomeLinkage(source)
    assert.equal(linkage.executionObservations[0]?.executionResultStatus, status)
    assert.equal(Object.hasOwn(linkage.executionObservations[0] as object, "retryable"), false)
  }
})

test("all five K5 aggregate states are preserved without reinterpretation", () => {
  for (const state of ["VALID", "INCOMPLETE", "CONTRADICTORY", "STALE", "INVALID"] as const) {
    assert.equal(createK6R3RouteOutcomeLinkage(input({ state })).k5Status, state)
  }
})

test("Done Gate PROVEN_READY and NOT_READY are caller snapshots only", () => {
  assert.equal(createK6R3RouteOutcomeLinkage(input({ doneStatus: "PROVEN_READY" })).doneGateStatus, "PROVEN_READY")
  assert.equal(createK6R3RouteOutcomeLinkage(input({ doneStatus: "NOT_READY" })).doneGateStatus, "NOT_READY")
})

test("forged R2 request and plan identities fail closed", () => {
  const forgedRequest = clone(input())
  forgedRequest.routePlanRequest.planRequestIdentity = "0".repeat(64)
  assert.throws(() => createK6R3RouteOutcomeLinkage(forgedRequest), TypeError)

  const forgedPlan = clone(input())
  forgedPlan.routePlan.planIdentity = "0".repeat(64)
  assert.throws(() => createK6R3RouteOutcomeLinkage(forgedPlan), TypeError)
})

test("NO_ELIGIBLE_CANDIDATE is structurally inapplicable", () => {
  const routeRequest = createK6R1RouteRequest({
    version: K6_R1_ROUTE_REQUEST_VERSION,
    repositoryId,
    canonicalBase: base,
    candidateHead: head,
    taskId: "k6-r3/no-route",
    riskClass: "MEDIUM",
    privacyClass: "REPOSITORY_PRIVATE",
    requiredCapabilities: ["repo/search"],
    candidates: [{ ...candidate("a"), qualification: { ...candidate("a").qualification, status: "FAIL" as const } }],
  })
  const eligibility = evaluateK6R1ModelProviderRouteEligibility(routeRequest)
  const routePlanRequest = createK6R2RoutePlanRequest({
    version: K6_R2_ROUTE_PLAN_REQUEST_VERSION,
    orderingBasis: K6_R2_ORDERING_BASIS,
    eligibilityResult: eligibility,
    orderedEligibleCandidateIds: [],
  })
  const routePlan = materializeK6R2DeterministicRoutePlan(routePlanRequest)
  const source = input()
  assert.throws(() => createK6R3RouteOutcomeLinkage({ ...source, routePlanRequest, routePlan }), TypeError)
})

test("revision and repository mismatches fail closed", () => {
  const wrongRepository = input({ repository: "other/repo" })
  assert.throws(() => createK6R3RouteOutcomeLinkage(wrongRepository), /repositoryId/)

  const source = clone(input())
  source.executionObservations[0]!.executionReceiptSource.candidateHead = "3".repeat(40)
  assert.throws(() => createK6R3RouteOutcomeLinkage(source), TypeError)
})

test("missing or substituted K5 membership fails closed", () => {
  const source = clone(input())
  source.k5Reconciliation.results = source.k5Reconciliation.results.filter((item) => item.evidenceKind !== "EXECUTION_RECEIPT")
  const preimage = { ...source.k5Reconciliation }
  delete (preimage as Partial<typeof preimage>).reconciliationIdentity
  source.k5Reconciliation.reconciliationIdentity = k5R4ReconciliationIdentity(preimage as K5R4ProofStateReconciliationInput)
  assert.throws(() => createK6R3RouteOutcomeLinkage(source), TypeError)
})

test("duplicate source identities and receipt ids fail closed", () => {
  const sameSource = receipt(0)
  assert.throws(() => createK6R3RouteOutcomeLinkage(input({ observations: [
    { planStepIndex: 0, source: sameSource },
    { planStepIndex: 1, source: sameSource },
  ] })), TypeError)

  const sameReceiptIdA = receipt(0, "success", "same")
  const sameReceiptIdB = receipt(1, "failure", "same")
  assert.throws(() => createK6R3RouteOutcomeLinkage(input({ observations: [
    { planStepIndex: 0, source: sameReceiptIdA },
    { planStepIndex: 1, source: sameReceiptIdB },
  ] })), TypeError)
})

test("Done Gate source binding, reason invariant, and duplicate evidence fail closed", () => {
  const wrongSource = clone(input())
  wrongSource.doneGateOutcome.verificationSourceIdentity = "0".repeat(64)
  assert.throws(() => createK6R3RouteOutcomeLinkage(wrongSource), TypeError)

  const readyWithReason = clone(input({ doneStatus: "PROVEN_READY" }))
  readyWithReason.doneGateOutcome.reasons = ["not allowed"]
  assert.throws(() => createK6R3RouteOutcomeLinkage(readyWithReason), TypeError)

  const duplicate = clone(input())
  duplicate.doneGateOutcome.evidence.push(clone(duplicate.doneGateOutcome.evidence[0]!))
  assert.throws(() => createK6R3RouteOutcomeLinkage(duplicate), TypeError)
})

test("tampered linkage identity and projections fail closed", () => {
  const source = input()
  const linkage = clone(createK6R3RouteOutcomeLinkage(source))
  linkage.linkageIdentity = "0".repeat(64)
  assert.throws(() => validateK6R3RouteOutcomeLinkage(linkage, source), TypeError)

  const projected = clone(createK6R3RouteOutcomeLinkage(source))
  projected.executionObservations[0]!.provider = "other-provider"
  assert.throws(() => validateK6R3RouteOutcomeLinkage(projected, source), TypeError)
})

test("R3-owned hostile object shapes fail closed without invoking accessors or proxy traps", () => {
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

test("invalid Unicode, NUL, bounds, and out-of-range indexes fail closed", () => {
  const unicode = clone(input())
  unicode.doneGateOutcome.reasons = ["\ud800"]
  assert.throws(() => createK6R3RouteOutcomeLinkage(unicode), TypeError)

  const nul = clone(input())
  nul.doneGateOutcome.reasons = ["bad\0reason"]
  assert.throws(() => createK6R3RouteOutcomeLinkage(nul), TypeError)

  const over = clone(input())
  over.doneGateOutcome.reasons = Array.from({ length: K6_R3_LIMITS.maxDoneGateReasons + 1 }, () => "x")
  assert.throws(() => createK6R3RouteOutcomeLinkage(over), RangeError)

  const index = clone(input())
  index.executionObservations[0]!.planStepIndex = 99
  assert.throws(() => createK6R3RouteOutcomeLinkage(index), TypeError)
})

test("caller input is not mutated and returned structures are immutable", () => {
  const source = input({ observations: [{ planStepIndex: 0, source: receipt(0) }, { planStepIndex: 1, source: receipt(1) }] })
  const before = JSON.stringify(source)
  const linkage = createK6R3RouteOutcomeLinkage(source)
  assert.equal(JSON.stringify(source), before)
  assert.equal(Object.isFrozen(linkage), true)
  assert.equal(Object.isFrozen(linkage.executionObservations), true)
  assert.equal(Object.isFrozen(linkage.executionObservations[0]), true)
  assert.equal(Object.isFrozen(source.routePlan), true)
})

test("semantically identical canonical inputs produce byte-identical identities", () => {
  const first = input()
  const second = clone(first)
  const a = createK6R3RouteOutcomeLinkage(first)
  const b = createK6R3RouteOutcomeLinkage(second)
  assert.equal(a.doneGateOutcomeIdentity, b.doneGateOutcomeIdentity)
  assert.equal(a.linkageIdentity, b.linkageIdentity)
})
