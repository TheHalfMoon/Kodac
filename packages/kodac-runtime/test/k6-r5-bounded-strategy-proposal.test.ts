import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import fs from "node:fs"
import test from "node:test"

import {
  K6_R1_ROUTE_REQUEST_VERSION,
  canonicalK6R1Json,
  createK6R1RouteRequest,
} from "../src/evidence-router/contracts.ts"
import {
  K6_R5_FIXTURE_CANDIDATE_STRATEGY_ID,
  K6_R5_FIXTURE_INCUMBENT_STRATEGY_ID,
  K6_R5_LIMITS,
  K6_R5_PRIVACY_CLASSES,
  K6_R5_QUALIFICATION_CORPUS_ID,
  K6_R5_QUALIFICATION_CORPUS_VERSION,
  K6_R5_QUALIFICATION_OUTCOMES,
  K6_R5_QUALIFICATION_RESULT_VERSION,
  K6_R5_STRATEGY_EVIDENCE_VERSION,
  K6_R5_STRATEGY_KIND,
  K6_R5_STRATEGY_VERSION,
  type K6R5Strategy,
  type K6R5StrategyEvidence,
} from "../src/evidence-router/strategy-proposal-contracts.ts"
import {
  compareK6R5Strategies,
  createK6R5Strategy,
  createK6R5StrategyEvidence,
  deriveK6R5TaskFamilyIdentity,
  k6R5QualificationResultIdentity,
  k6R5StrategyEvidenceIdentity,
  k6R5StrategyIdentity,
  k6R5TrialSetIdentity,
  validateK6R5QualificationResult,
  validateK6R5Strategy,
  validateK6R5StrategyEvidence,
} from "../src/evidence-router/strategy-proposal.ts"

const A = "a".repeat(64)
const B = "b".repeat(64)
const C = "c".repeat(64)
const D = "d".repeat(64)
const E = "e".repeat(64)
const F = "f".repeat(64)
const ZERO = "0".repeat(64)
const ONE = "1".repeat(64)
const TWO = "2".repeat(64)
const THREE = "3".repeat(64)
const FOUR = "4".repeat(64)

const SCOPE = Object.freeze({
  repositoryIdentity: ONE,
  revisionIdentity: TWO,
  ownerScopeId: THREE,
  privacyClass: "REPOSITORY_PRIVATE" as const,
  taskFamilyIdentity: FOUR,
})

const TRIALS = Object.freeze(["5".repeat(64), "6".repeat(64), "7".repeat(64), "8".repeat(64)])

const FIXED_CORPUS = {
  candidateStrategy: {
    kind: K6_R5_STRATEGY_KIND,
    orderedCandidateIdentities: [B, A],
    scope: SCOPE,
    strategyIdentity: K6_R5_FIXTURE_CANDIDATE_STRATEGY_ID,
    version: K6_R5_STRATEGY_VERSION,
  },
  cases: [
    {
      candidate: { computeUnitsTotal: 40, doneReadyCount: 2, k5ValidCount: 3, latencyTotalMs: 400, privacyViolationCount: 0, securityViolationCount: 0, trialCount: 4, verifiedPassCount: 4 },
      caseId: "quality-dominance",
      expected: "CANDIDATE_DOMINATES",
      incumbent: { computeUnitsTotal: 40, doneReadyCount: 2, k5ValidCount: 3, latencyTotalMs: 400, privacyViolationCount: 0, securityViolationCount: 0, trialCount: 4, verifiedPassCount: 3 },
    },
    {
      candidate: { computeUnitsTotal: 36, doneReadyCount: 4, k5ValidCount: 4, latencyTotalMs: 360, privacyViolationCount: 0, securityViolationCount: 0, trialCount: 4, verifiedPassCount: 4 },
      caseId: "resource-dominance",
      expected: "CANDIDATE_DOMINATES",
      incumbent: { computeUnitsTotal: 40, doneReadyCount: 4, k5ValidCount: 4, latencyTotalMs: 400, privacyViolationCount: 0, securityViolationCount: 0, trialCount: 4, verifiedPassCount: 4 },
    },
    {
      candidate: { computeUnitsTotal: 39, doneReadyCount: 3, k5ValidCount: 3, latencyTotalMs: 390, privacyViolationCount: 0, securityViolationCount: 0, trialCount: 4, verifiedPassCount: 3 },
      caseId: "incumbent-dominance",
      expected: "INCUMBENT_DOMINATES",
      incumbent: { computeUnitsTotal: 38, doneReadyCount: 3, k5ValidCount: 4, latencyTotalMs: 380, privacyViolationCount: 0, securityViolationCount: 0, trialCount: 4, verifiedPassCount: 4 },
    },
    {
      candidate: { computeUnitsTotal: 38, doneReadyCount: 3, k5ValidCount: 3, latencyTotalMs: 380, privacyViolationCount: 0, securityViolationCount: 0, trialCount: 4, verifiedPassCount: 4 },
      caseId: "exact-tie",
      expected: "TIE",
      incumbent: { computeUnitsTotal: 38, doneReadyCount: 3, k5ValidCount: 3, latencyTotalMs: 380, privacyViolationCount: 0, securityViolationCount: 0, trialCount: 4, verifiedPassCount: 4 },
    },
    {
      candidate: { computeUnitsTotal: 40, doneReadyCount: 3, k5ValidCount: 3, latencyTotalMs: 400, privacyViolationCount: 0, securityViolationCount: 0, trialCount: 4, verifiedPassCount: 4 },
      caseId: "mixed-tradeoff",
      expected: "INCOMPARABLE",
      incumbent: { computeUnitsTotal: 36, doneReadyCount: 3, k5ValidCount: 3, latencyTotalMs: 360, privacyViolationCount: 0, securityViolationCount: 0, trialCount: 4, verifiedPassCount: 3 },
    },
    {
      candidate: { computeUnitsTotal: 35, doneReadyCount: 4, k5ValidCount: 4, latencyTotalMs: 350, privacyViolationCount: 1, securityViolationCount: 0, trialCount: 4, verifiedPassCount: 4 },
      caseId: "candidate-privacy-invalid",
      expected: "CANDIDATE_INVALID",
      incumbent: { computeUnitsTotal: 40, doneReadyCount: 4, k5ValidCount: 4, latencyTotalMs: 400, privacyViolationCount: 0, securityViolationCount: 0, trialCount: 4, verifiedPassCount: 4 },
    },
    {
      candidate: { computeUnitsTotal: 35, doneReadyCount: 4, k5ValidCount: 4, latencyTotalMs: 350, privacyViolationCount: 1, securityViolationCount: 0, trialCount: 4, verifiedPassCount: 4 },
      caseId: "both-invalid",
      expected: "BOTH_INVALID",
      incumbent: { computeUnitsTotal: 40, doneReadyCount: 4, k5ValidCount: 4, latencyTotalMs: 400, privacyViolationCount: 0, securityViolationCount: 1, trialCount: 4, verifiedPassCount: 4 },
    },
  ],
  incumbentStrategy: {
    kind: K6_R5_STRATEGY_KIND,
    orderedCandidateIdentities: [A, B],
    scope: SCOPE,
    strategyIdentity: K6_R5_FIXTURE_INCUMBENT_STRATEGY_ID,
    version: K6_R5_STRATEGY_VERSION,
  },
  version: K6_R5_QUALIFICATION_CORPUS_VERSION,
}

function strategy(order: readonly string[]): K6R5Strategy {
  return createK6R5Strategy({
    version: K6_R5_STRATEGY_VERSION,
    kind: K6_R5_STRATEGY_KIND,
    scope: SCOPE,
    orderedCandidateIdentities: [...order],
  })
}

const INCUMBENT = strategy([A, B])
const CANDIDATE = strategy([B, A])
const TRIAL_SET_IDENTITY = k6R5TrialSetIdentity(K6_R5_QUALIFICATION_CORPUS_ID, TRIALS)

function evidence(
  strategyValue: K6R5Strategy,
  metrics: Record<string, number>,
  overrides: Record<string, unknown> = {},
): K6R5StrategyEvidence {
  return createK6R5StrategyEvidence({
    version: K6_R5_STRATEGY_EVIDENCE_VERSION,
    strategyIdentity: strategyValue.strategyIdentity,
    scope: strategyValue.scope,
    qualificationCorpusIdentity: K6_R5_QUALIFICATION_CORPUS_ID,
    trialSetIdentity: TRIAL_SET_IDENTITY,
    trialCaseIdentities: [...TRIALS],
    trialCount: 4,
    verifiedPassCount: 4,
    k5ValidCount: 4,
    doneReadyCount: 4,
    latencyTotalMs: 400,
    computeUnitsTotal: 40,
    privacyViolationCount: 0,
    securityViolationCount: 0,
    verificationEvidenceIdentity: A,
    k5EvidenceIdentity: B,
    doneGateEvidenceIdentity: C,
    latencyEvidenceIdentity: D,
    computeEvidenceIdentity: E,
    privacyEvidenceIdentity: F,
    securityEvidenceIdentity: ZERO,
    ...metrics,
    ...overrides,
  })
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function routeCandidate(): Record<string, unknown> {
  return {
    candidateId: "candidate-a",
    candidateKind: "MODEL_PROVIDER",
    provider: "provider",
    model: "model",
    declaredCapabilities: ["repo/search", "model/generate"],
    maximumRiskClass: "HIGH",
    supportedPrivacyClasses: ["PUBLIC", "REPOSITORY_PRIVATE"],
    qualification: {
      protocol: "kodac.provider-qualification",
      version: 1,
      provider: "provider",
      model: "model",
      workspaceDigest: A,
      status: "PASS",
      reportDigest: B,
    },
  }
}

function routeRequestInput(requiredCapabilities = ["repo/search", "model/generate"]): Record<string, unknown> {
  return {
    version: K6_R1_ROUTE_REQUEST_VERSION,
    repositoryId: "TheHalfMoon/Kodac",
    canonicalBase: "0".repeat(40),
    candidateHead: "1".repeat(40),
    taskId: "r5/task-family",
    riskClass: "MEDIUM",
    privacyClass: "REPOSITORY_PRIVATE",
    requiredCapabilities,
    candidates: [routeCandidate()],
  }
}

test("closed vocabularies are exact and immutable", () => {
  assert.equal(K6_R5_STRATEGY_VERSION, "kodac-k6-r5-strategy-v1")
  assert.equal(K6_R5_STRATEGY_EVIDENCE_VERSION, "kodac-k6-r5-strategy-evidence-v1")
  assert.equal(K6_R5_QUALIFICATION_RESULT_VERSION, "kodac-k6-r5-qualification-result-v1")
  assert.equal(K6_R5_QUALIFICATION_CORPUS_VERSION, "kodac-k6-r5-qualification-corpus-v1")
  assert.equal(K6_R5_STRATEGY_KIND, "EXPLICIT_ELIGIBLE_CANDIDATE_ORDER")
  assert.deepEqual(K6_R5_PRIVACY_CLASSES, ["PUBLIC", "REPOSITORY_PRIVATE", "SENSITIVE"])
  assert.deepEqual(K6_R5_QUALIFICATION_OUTCOMES, [
    "BOTH_INVALID", "CANDIDATE_INVALID", "INCUMBENT_INVALID", "CANDIDATE_DOMINATES",
    "INCUMBENT_DOMINATES", "TIE", "INCOMPARABLE",
  ])
  assert.equal(Object.isFrozen(K6_R5_PRIVACY_CLASSES), true)
  assert.equal(Object.isFrozen(K6_R5_QUALIFICATION_OUTCOMES), true)
})

test("schema/runtime parity closes objects, vocabularies, limits, and non-zero trial counts", () => {
  const schema = JSON.parse(fs.readFileSync("schema/k6-r5-bounded-strategy-proposal.schema.json", "utf8"))
  const defs = schema.$defs
  assert.equal(schema.$ref, "#/$defs/qualificationResult")
  assert.deepEqual(defs.privacyClass.enum, [...K6_R5_PRIVACY_CLASSES])
  assert.deepEqual(defs.qualificationResult.properties.outcome.enum, [...K6_R5_QUALIFICATION_OUTCOMES])
  assert.equal(defs.strategy.properties.version.const, K6_R5_STRATEGY_VERSION)
  assert.equal(defs.strategyEvidence.properties.version.const, K6_R5_STRATEGY_EVIDENCE_VERSION)
  assert.equal(defs.qualificationResult.properties.version.const, K6_R5_QUALIFICATION_RESULT_VERSION)
  assert.equal(defs.strategy.properties.kind.const, K6_R5_STRATEGY_KIND)
  assert.equal(defs.strategy.properties.orderedCandidateIdentities.maxItems, K6_R5_LIMITS.maxOrderedCandidateIdentities)
  assert.equal(defs.strategyEvidence.properties.trialCaseIdentities.maxItems, K6_R5_LIMITS.maxTrialCaseIdentities)
  assert.equal(defs.positiveSafeInteger.minimum, 1)
  for (const value of Object.values(defs) as Array<Record<string, unknown>>) {
    if (value.type === "object") assert.equal(value.additionalProperties, false)
  }
})

test("fixture strategy identities recompute exactly", () => {
  assert.equal(INCUMBENT.strategyIdentity, K6_R5_FIXTURE_INCUMBENT_STRATEGY_ID)
  assert.equal(CANDIDATE.strategyIdentity, K6_R5_FIXTURE_CANDIDATE_STRATEGY_ID)
  assert.equal(k6R5StrategyIdentity({ version: K6_R5_STRATEGY_VERSION, kind: K6_R5_STRATEGY_KIND, scope: SCOPE, orderedCandidateIdentities: [A, B] }), INCUMBENT.strategyIdentity)
  assert.equal(validateK6R5Strategy(INCUMBENT).strategyIdentity, INCUMBENT.strategyIdentity)
})

test("fixed qualification corpus identity recomputes exactly", () => {
  const actual = createHash("sha256").update(canonicalK6R1Json(FIXED_CORPUS), "utf8").digest("hex")
  assert.equal(actual, K6_R5_QUALIFICATION_CORPUS_ID)
})

test("trial-set identity is deterministic, ordered, corpus-bound, and non-empty", () => {
  const expected = createHash("sha256").update(canonicalK6R1Json({
    kind: "K6_R5_TRIAL_SET",
    qualificationCorpusIdentity: K6_R5_QUALIFICATION_CORPUS_ID,
    trialCaseIdentities: TRIALS,
  }), "utf8").digest("hex")
  assert.equal(TRIAL_SET_IDENTITY, expected)
  assert.notEqual(k6R5TrialSetIdentity(K6_R5_QUALIFICATION_CORPUS_ID, [...TRIALS].reverse()), expected)
  assert.throws(() => k6R5TrialSetIdentity(K6_R5_QUALIFICATION_CORPUS_ID, []), RangeError)
})

test("task-family identity derives only from a fully validated R1 route request", () => {
  const request = createK6R1RouteRequest(routeRequestInput())
  const actual = deriveK6R5TaskFamilyIdentity(request)
  const expected = createHash("sha256").update(canonicalK6R1Json({
    kind: "K6_R5_TASK_FAMILY",
    riskClass: request.riskClass,
    privacyClass: request.privacyClass,
    requiredCapabilities: request.requiredCapabilities,
  }), "utf8").digest("hex")
  assert.equal(actual, expected)
  const reordered = createK6R1RouteRequest(routeRequestInput(["model/generate", "repo/search"]))
  assert.equal(deriveK6R5TaskFamilyIdentity(reordered), actual)
  assert.throws(() => deriveK6R5TaskFamilyIdentity({ ...request, requestIdentity: F }), TypeError)
})

test("strategy values are order-sensitive but candidate-set comparison requires exact set equality", () => {
  assert.notEqual(INCUMBENT.strategyIdentity, CANDIDATE.strategyIdentity)
  const incEvidence = evidence(INCUMBENT, {})
  const candEvidence = evidence(CANDIDATE, {})
  assert.equal(compareK6R5Strategies(INCUMBENT, CANDIDATE, incEvidence, candEvidence).outcome, "TIE")
  const missing = strategy([A])
  const missingEvidence = evidence(missing, {})
  assert.throws(() => compareK6R5Strategies(INCUMBENT, missing, incEvidence, missingEvidence), /candidate identity sets/)
  assert.throws(() => createK6R5Strategy({ version: K6_R5_STRATEGY_VERSION, kind: K6_R5_STRATEGY_KIND, scope: SCOPE, orderedCandidateIdentities: [A, A] }), TypeError)
})

test("R5 never upgrades opaque candidate identities to eligibility authority", () => {
  const value = strategy([A, B])
  assert.deepEqual(Object.keys(value), ["version", "strategyIdentity", "kind", "scope", "orderedCandidateIdentities"])
  const text = JSON.stringify(value)
  for (const token of ["eligibilityStatus", "provider", "model", "qualification", "approved", "PROVEN_READY"]) {
    assert.equal(text.includes(token), false, token)
  }
})

test("evidence identity is deterministic and validates exact strategy/scope/trial bindings", () => {
  const value = evidence(INCUMBENT, { verifiedPassCount: 3 })
  const input = { ...deepClone(value) } as Record<string, unknown>
  delete input.evidenceIdentity
  assert.equal(k6R5StrategyEvidenceIdentity(input), value.evidenceIdentity)
  assert.equal(validateK6R5StrategyEvidence(value).evidenceIdentity, value.evidenceIdentity)
  assert.throws(() => validateK6R5StrategyEvidence({ ...value, evidenceIdentity: F }), /deterministic recomputation/)
})

test("all seven fixed corpus cases produce exact precedence outcomes", () => {
  for (const entry of FIXED_CORPUS.cases) {
    const incumbentEvidence = evidence(INCUMBENT, entry.incumbent)
    const candidateEvidence = evidence(CANDIDATE, entry.candidate)
    assert.equal(compareK6R5Strategies(INCUMBENT, CANDIDATE, incumbentEvidence, candidateEvidence).outcome, entry.expected, entry.caseId)
  }
})

test("INCUMBENT_INVALID is covered separately and safety invalidation precedes quality", () => {
  const incumbentEvidence = evidence(INCUMBENT, { privacyViolationCount: 1, verifiedPassCount: 4, latencyTotalMs: 1, computeUnitsTotal: 1 })
  const candidateEvidence = evidence(CANDIDATE, { verifiedPassCount: 0, k5ValidCount: 0, doneReadyCount: 0, latencyTotalMs: 999, computeUnitsTotal: 999 })
  assert.equal(compareK6R5Strategies(INCUMBENT, CANDIDATE, incumbentEvidence, candidateEvidence).outcome, "INCUMBENT_INVALID")
})

test("dominance is closed Pareto comparison with exact tie and mixed tradeoff incomparable", () => {
  assert.equal(compareK6R5Strategies(
    INCUMBENT, CANDIDATE,
    evidence(INCUMBENT, { verifiedPassCount: 3, k5ValidCount: 3, doneReadyCount: 2, latencyTotalMs: 400, computeUnitsTotal: 40 }),
    evidence(CANDIDATE, { verifiedPassCount: 4, k5ValidCount: 3, doneReadyCount: 2, latencyTotalMs: 400, computeUnitsTotal: 40 }),
  ).outcome, "CANDIDATE_DOMINATES")
  assert.equal(compareK6R5Strategies(
    INCUMBENT, CANDIDATE,
    evidence(INCUMBENT, { verifiedPassCount: 4, k5ValidCount: 4, doneReadyCount: 4, latencyTotalMs: 400, computeUnitsTotal: 40 }),
    evidence(CANDIDATE, { verifiedPassCount: 4, k5ValidCount: 4, doneReadyCount: 4, latencyTotalMs: 360, computeUnitsTotal: 36 }),
  ).outcome, "CANDIDATE_DOMINATES")
  assert.equal(compareK6R5Strategies(INCUMBENT, CANDIDATE, evidence(INCUMBENT, {}), evidence(CANDIDATE, {})).outcome, "TIE")
  assert.equal(compareK6R5Strategies(
    INCUMBENT, CANDIDATE,
    evidence(INCUMBENT, { verifiedPassCount: 3, latencyTotalMs: 360, computeUnitsTotal: 36 }),
    evidence(CANDIDATE, { verifiedPassCount: 4, latencyTotalMs: 400, computeUnitsTotal: 40 }),
  ).outcome, "INCOMPARABLE")
})

test("corpus, ordered trial set, trial count, strategy and scope mismatches throw before producing results", () => {
  const inc = evidence(INCUMBENT, {})
  const can = evidence(CANDIDATE, {})
  const otherCorpus = "9".repeat(64)
  const otherTrials = [TRIALS[0] as string, TRIALS[1] as string, TRIALS[3] as string, TRIALS[2] as string]
  assert.throws(() => compareK6R5Strategies(INCUMBENT, CANDIDATE, inc, evidence(CANDIDATE, {}, {
    qualificationCorpusIdentity: otherCorpus,
    trialSetIdentity: k6R5TrialSetIdentity(otherCorpus, TRIALS),
  })), /qualification corpus/)
  assert.throws(() => compareK6R5Strategies(INCUMBENT, CANDIDATE, inc, evidence(CANDIDATE, {}, {
    trialCaseIdentities: otherTrials,
    trialSetIdentity: k6R5TrialSetIdentity(K6_R5_QUALIFICATION_CORPUS_ID, otherTrials),
  })), /trial-set|trial-case/)
  const mismatchedCount = { ...deepClone(can), trialCount: 3 } as Record<string, unknown>
  delete mismatchedCount.evidenceIdentity
  assert.throws(() => createK6R5StrategyEvidence(mismatchedCount), /trialCount/)
  assert.throws(() => compareK6R5Strategies(INCUMBENT, CANDIDATE, inc, { ...can, strategyIdentity: INCUMBENT.strategyIdentity }), TypeError)
  const otherScope = { ...SCOPE, revisionIdentity: F }
  const otherCandidate = createK6R5Strategy({ version: K6_R5_STRATEGY_VERSION, kind: K6_R5_STRATEGY_KIND, scope: otherScope, orderedCandidateIdentities: [B, A] })
  assert.throws(() => compareK6R5Strategies(INCUMBENT, otherCandidate, inc, evidence(otherCandidate, {})), /strategy scopes/)
})

test("result identity is deterministic and retains incumbent/candidate rollback evidence without promotion fields", () => {
  const incEvidence = evidence(INCUMBENT, { verifiedPassCount: 3 })
  const candEvidence = evidence(CANDIDATE, { verifiedPassCount: 4 })
  const result = compareK6R5Strategies(INCUMBENT, CANDIDATE, incEvidence, candEvidence)
  const input = { ...result } as Record<string, unknown>
  delete input.resultIdentity
  assert.equal(k6R5QualificationResultIdentity(input), result.resultIdentity)
  assert.equal(validateK6R5QualificationResult(result).resultIdentity, result.resultIdentity)
  assert.equal(result.incumbentStrategyIdentity, INCUMBENT.strategyIdentity)
  assert.equal(result.candidateStrategyIdentity, CANDIDATE.strategyIdentity)
  assert.equal(result.incumbentEvidenceIdentity, incEvidence.evidenceIdentity)
  assert.equal(result.candidateEvidenceIdentity, candEvidence.evidenceIdentity)
  assert.deepEqual(Object.keys(result), [
    "version", "resultIdentity", "incumbentStrategyIdentity", "candidateStrategyIdentity",
    "incumbentEvidenceIdentity", "candidateEvidenceIdentity", "qualificationCorpusIdentity",
    "trialSetIdentity", "trialCount", "outcome",
  ])
  for (const field of ["promote", "winnerForProduction", "approved", "DONE", "PROVEN_READY", "score", "reward"]) {
    assert.equal(Object.hasOwn(result, field), false)
  }
})

test("there is no weighted reward, random, clock, provider, persistence, network, or automatic-promotion path", () => {
  const contracts = fs.readFileSync("packages/kodac-runtime/src/evidence-router/strategy-proposal-contracts.ts", "utf8")
  const runtime = fs.readFileSync("packages/kodac-runtime/src/evidence-router/strategy-proposal.ts", "utf8")
  const combined = `${contracts}\n${runtime}`
  for (const pattern of [
    /weighted/i, /reward/i, /Math\.random/, /Date\.now/, /\bfetch\s*\(/, /node:http/, /node:https/,
    /node:fs/, /database/i, /telemetry/i, /automatic.?promotion/i, /winnerForProduction/i,
  ]) assert.equal(pattern.test(combined), false, String(pattern))
})

test("hostile Proxy, accessor, symbol, sparse, non-plain, cycle, undefined and extra fields fail closed", () => {
  let traps = 0
  const proxy = new Proxy(SCOPE as object, {
    getPrototypeOf() { traps += 1; throw new Error("trap") },
    ownKeys() { traps += 1; throw new Error("trap") },
    getOwnPropertyDescriptor() { traps += 1; throw new Error("trap") },
  })
  assert.throws(() => createK6R5Strategy({ version: K6_R5_STRATEGY_VERSION, kind: K6_R5_STRATEGY_KIND, scope: proxy, orderedCandidateIdentities: [A] }), /Proxy/)
  assert.equal(traps, 0)

  const accessor = { version: K6_R5_STRATEGY_VERSION, kind: K6_R5_STRATEGY_KIND, scope: SCOPE, orderedCandidateIdentities: [A] } as Record<string, unknown>
  Object.defineProperty(accessor, "kind", { enumerable: true, get() { return K6_R5_STRATEGY_KIND } })
  assert.throws(() => createK6R5Strategy(accessor), TypeError)

  const symbol = { version: K6_R5_STRATEGY_VERSION, kind: K6_R5_STRATEGY_KIND, scope: SCOPE, orderedCandidateIdentities: [A] }
  Object.defineProperty(symbol, Symbol("authority"), { enumerable: true, value: "PROVEN_READY" })
  assert.throws(() => createK6R5Strategy(symbol), TypeError)

  const sparse = new Array(2)
  sparse[0] = A
  assert.throws(() => createK6R5Strategy({ version: K6_R5_STRATEGY_VERSION, kind: K6_R5_STRATEGY_KIND, scope: SCOPE, orderedCandidateIdentities: sparse }), TypeError)

  const nonPlain = Object.create({ inherited: true }) as Record<string, unknown>
  Object.assign(nonPlain, { version: K6_R5_STRATEGY_VERSION, kind: K6_R5_STRATEGY_KIND, scope: SCOPE, orderedCandidateIdentities: [A] })
  assert.throws(() => createK6R5Strategy(nonPlain), TypeError)

  const cycle: Record<string, unknown> = { ...SCOPE }
  cycle.self = cycle
  assert.throws(() => createK6R5Strategy({ version: K6_R5_STRATEGY_VERSION, kind: K6_R5_STRATEGY_KIND, scope: cycle, orderedCandidateIdentities: [A] }), /cyclic/)
  assert.throws(() => createK6R5Strategy({ version: K6_R5_STRATEGY_VERSION, kind: K6_R5_STRATEGY_KIND, scope: { ...SCOPE, taskFamilyIdentity: undefined }, orderedCandidateIdentities: [A] }), TypeError)
  assert.throws(() => createK6R5Strategy({ version: K6_R5_STRATEGY_VERSION, kind: K6_R5_STRATEGY_KIND, scope: SCOPE, orderedCandidateIdentities: [A], authority: "PROVEN_READY" }), TypeError)
})

test("negative, -0, non-integer, unsafe and count-over-trial metrics fail closed", () => {
  for (const bad of [-1, -0, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => evidence(INCUMBENT, { latencyTotalMs: bad }), TypeError)
  }
  for (const field of ["verifiedPassCount", "k5ValidCount", "doneReadyCount", "privacyViolationCount", "securityViolationCount"] as const) {
    assert.throws(() => evidence(INCUMBENT, { [field]: 5 }), TypeError)
  }
  assert.throws(() => createK6R5StrategyEvidence({ ...evidence(INCUMBENT, {}), trialCount: 0, trialCaseIdentities: [] }), TypeError)
})

test("resource bounds enforce canonical depth/node and candidate/trial limits", () => {
  assert.equal(K6_R5_LIMITS.maxCanonicalDepth, 32)
  assert.equal(K6_R5_LIMITS.maxCanonicalNodes, 50_000)
  assert.equal(K6_R5_LIMITS.maxOrderedCandidateIdentities, 128)
  assert.equal(K6_R5_LIMITS.maxTrialCaseIdentities, 128)
  assert.throws(() => strategy(Array.from({ length: 129 }, (_, index) => index.toString(16).padStart(64, "0"))), RangeError)
  assert.throws(() => k6R5TrialSetIdentity(K6_R5_QUALIFICATION_CORPUS_ID, Array.from({ length: 129 }, (_, index) => index.toString(16).padStart(64, "0"))), RangeError)
  let nested: unknown = A
  for (let index = 0; index < 40; index += 1) nested = { nested }
  assert.throws(() => createK6R5Strategy({ version: K6_R5_STRATEGY_VERSION, kind: K6_R5_STRATEGY_KIND, scope: nested, orderedCandidateIdentities: [A] }), RangeError)
})

test("outputs are deeply immutable and detached from caller-owned arrays and objects", () => {
  const callerScope = { ...SCOPE }
  const callerOrder = [A, B]
  const value = createK6R5Strategy({ version: K6_R5_STRATEGY_VERSION, kind: K6_R5_STRATEGY_KIND, scope: callerScope, orderedCandidateIdentities: callerOrder })
  callerScope.repositoryIdentity = F
  callerOrder.reverse()
  assert.equal(value.scope.repositoryIdentity, ONE)
  assert.deepEqual(value.orderedCandidateIdentities, [A, B])
  assert.equal(Object.isFrozen(value), true)
  assert.equal(Object.isFrozen(value.scope), true)
  assert.equal(Object.isFrozen(value.orderedCandidateIdentities), true)

  const trials = [...TRIALS]
  const evidenceScope = { ...SCOPE }
  const ev = createK6R5StrategyEvidence({
    version: K6_R5_STRATEGY_EVIDENCE_VERSION,
    strategyIdentity: INCUMBENT.strategyIdentity,
    scope: evidenceScope,
    qualificationCorpusIdentity: K6_R5_QUALIFICATION_CORPUS_ID,
    trialSetIdentity: k6R5TrialSetIdentity(K6_R5_QUALIFICATION_CORPUS_ID, trials),
    trialCaseIdentities: trials,
    trialCount: trials.length,
    verifiedPassCount: 4,
    k5ValidCount: 4,
    doneReadyCount: 4,
    latencyTotalMs: 400,
    computeUnitsTotal: 40,
    privacyViolationCount: 0,
    securityViolationCount: 0,
    verificationEvidenceIdentity: A,
    k5EvidenceIdentity: B,
    doneGateEvidenceIdentity: C,
    latencyEvidenceIdentity: D,
    computeEvidenceIdentity: E,
    privacyEvidenceIdentity: F,
    securityEvidenceIdentity: ZERO,
  })
  trials.reverse()
  evidenceScope.revisionIdentity = F
  assert.deepEqual(ev.trialCaseIdentities, TRIALS)
  assert.equal(ev.scope.revisionIdentity, TWO)
  assert.equal(Object.isFrozen(ev), true)
  assert.equal(Object.isFrozen(ev.scope), true)
  assert.equal(Object.isFrozen(ev.trialCaseIdentities), true)
})
