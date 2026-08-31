import assert from "node:assert/strict"
import test from "node:test"

import {
  P3_R8_BINDING_DECLARATION_KIND,
  P3_R8_BINDING_DECLARATION_VERSION,
  P3_R8_STRATEGY_DECLARATION_KIND,
  P3_R8_STRATEGY_DECLARATION_VERSION,
  P3_R8_TASK_FAMILY,
  type ContextStrategyDeclaration,
} from "../bench/p3-r8/contracts.ts"
import {
  bindContextStrategySubjectToDeclaredPolicy,
  buildContextStrategySubject,
} from "../bench/p3-r8/context-strategy-subject.ts"
import {
  P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
  P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
  P3_R1_CONTEXT_SELECTION_PLAN_VERSION,
  P3_R1_EVIDENCE_LANES,
  type ContextSelectionCandidateInput,
  type ContextSelectionPlanRequest,
} from "../src/context-selection-plan/contracts.ts"
import { buildContextSelectionPlan } from "../src/context-selection-plan/context-selection-plan.ts"
import {
  P3_R2_DECLARED_POLICY_KIND,
  P3_R2_DECLARED_POLICY_VERSION,
  P3_R2_POLICY_APPLICATION_VERSION,
  type DeclaredContextSelectionPolicy,
} from "../src/context-selection-policy/contracts.ts"
import { applyDeclaredContextSelectionPolicy } from "../src/context-selection-policy/context-selection-policy.ts"

const STRATEGY_ID = "strategy:p3-r8-fixture"
const CAPS = Object.freeze({
  maxSelectedItems: 2,
  maxSelectedUtf8Bytes: 1_024,
  maxPerGroupingKey: 2,
})

function hex(char: string): string {
  return char.repeat(64)
}

function candidate(
  index: number,
  repositoryIdentity: string,
  snapshotIdentity: string,
  contentIdentity: string,
): ContextSelectionCandidateInput {
  return {
    candidateId: `candidate:${index}`,
    repositoryIdentity,
    snapshotIdentity,
    contentIdentity,
    lane: index % 2 === 0 ? "structural-symbol" : "explicit-target",
    sourceKind: "repository-evidence",
    sourceIdentity: String((index % 9) + 1).repeat(64),
    evidenceClass: "precise-static",
    subjectPath: `src/file-${index}.ts`,
    utf8Bytes: 100,
    groupingKey: `file:src/file-${index}.ts`,
    planReasons: ["fixture"],
    provenanceRefs: [`repo://fixture/file-${index}.ts`],
  }
}

function request(seed: number): ContextSelectionPlanRequest {
  const repositoryIdentity = hex(seed === 1 ? "a" : "d")
  const snapshotIdentity = hex(seed === 1 ? "b" : "e")
  const contentIdentity = hex(seed === 1 ? "c" : "f")
  return {
    version: P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
    kind: P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
    taskIdentity: `task:p3-r8-case-${seed}`,
    repositoryIdentity,
    snapshotIdentity,
    contentIdentity,
    candidates: [
      candidate(1, repositoryIdentity, snapshotIdentity, contentIdentity),
      candidate(2, repositoryIdentity, snapshotIdentity, contentIdentity),
      candidate(3, repositoryIdentity, snapshotIdentity, contentIdentity),
    ],
    maxItems: 8,
    maxUtf8Bytes: 8_192,
    completeness: { state: "complete", reasons: [], omittedAtLeast: 0 },
  }
}

function declaration(
  overrides: Partial<ContextStrategyDeclaration> = {},
): ContextStrategyDeclaration {
  return {
    version: P3_R8_STRATEGY_DECLARATION_VERSION,
    kind: P3_R8_STRATEGY_DECLARATION_KIND,
    strategyId: STRATEGY_ID,
    taskFamily: P3_R8_TASK_FAMILY,
    planContractVersion: P3_R1_CONTEXT_SELECTION_PLAN_VERSION,
    policyContractVersion: P3_R2_DECLARED_POLICY_VERSION,
    applicationContractVersion: P3_R2_POLICY_APPLICATION_VERSION,
    lanePriority: [...P3_R1_EVIDENCE_LANES],
    ...CAPS,
    ...overrides,
  }
}

function policy(
  planRequest: ContextSelectionPlanRequest,
  overrides: Partial<DeclaredContextSelectionPolicy> = {},
): DeclaredContextSelectionPolicy {
  const plan = buildContextSelectionPlan(planRequest)
  return {
    version: P3_R2_DECLARED_POLICY_VERSION,
    kind: P3_R2_DECLARED_POLICY_KIND,
    policyId: STRATEGY_ID,
    planIdentity: plan.planIdentity,
    repositoryIdentity: plan.repositoryIdentity,
    snapshotIdentity: plan.snapshotIdentity,
    contentIdentity: plan.contentIdentity,
    taskIdentity: plan.taskIdentity,
    lanePriority: [...P3_R1_EVIDENCE_LANES],
    ...CAPS,
    ...overrides,
  }
}

function bindingDeclaration(strategySubjectIdentity: string, bindingId = "binding:p3-r8-fixture") {
  return {
    version: P3_R8_BINDING_DECLARATION_VERSION,
    kind: P3_R8_BINDING_DECLARATION_KIND,
    bindingId,
    strategySubjectIdentity,
  }
}

function assertDeepFrozen(value: unknown, seen = new WeakSet<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return
  seen.add(value)
  assert.equal(Object.isFrozen(value), true)
  for (const nested of Object.values(value as Record<string, unknown>)) {
    assertDeepFrozen(nested, seen)
  }
}

test("P3-R8 keeps one strategy subject identity across independently bound cases", () => {
  const strategy = buildContextStrategySubject(declaration())
  const firstRequest = request(1)
  const secondRequest = request(2)

  const first = bindContextStrategySubjectToDeclaredPolicy(
    firstRequest,
    policy(firstRequest),
    strategy,
    bindingDeclaration(strategy.strategySubjectIdentity),
  )
  const second = bindContextStrategySubjectToDeclaredPolicy(
    secondRequest,
    policy(secondRequest),
    strategy,
    bindingDeclaration(strategy.strategySubjectIdentity),
  )

  assert.equal(first.strategySubjectIdentity, second.strategySubjectIdentity)
  assert.equal(first.strategySubjectIdentity, strategy.strategySubjectIdentity)
  assert.notEqual(first.planIdentity, second.planIdentity)
  assert.notEqual(first.requestIdentity, second.requestIdentity)
  assert.notEqual(first.candidateSetIdentity, second.candidateSetIdentity)
  assert.notEqual(first.repositoryIdentity, second.repositoryIdentity)
  assert.notEqual(first.snapshotIdentity, second.snapshotIdentity)
  assert.notEqual(first.contentIdentity, second.contentIdentity)
  assert.notEqual(first.taskIdentity, second.taskIdentity)
  assert.notEqual(first.policyIdentity, second.policyIdentity)
  assert.notEqual(first.applicationIdentity, second.applicationIdentity)
  assert.notEqual(first.bindingEvidenceIdentity, second.bindingEvidenceIdentity)
})

test("P3-R8 subject identity is deterministic and canonical-key-order invariant", () => {
  const input = declaration()
  const first = buildContextStrategySubject(input)
  const second = buildContextStrategySubject(input)
  const reordered = buildContextStrategySubject({
    maxPerGroupingKey: input.maxPerGroupingKey,
    lanePriority: input.lanePriority,
    applicationContractVersion: input.applicationContractVersion,
    maxSelectedUtf8Bytes: input.maxSelectedUtf8Bytes,
    version: input.version,
    strategyId: input.strategyId,
    maxSelectedItems: input.maxSelectedItems,
    policyContractVersion: input.policyContractVersion,
    taskFamily: input.taskFamily,
    kind: input.kind,
    planContractVersion: input.planContractVersion,
  })
  assert.deepEqual(first, second)
  assert.deepEqual(first, reordered)
})

test("P3-R8 subject identity changes for every strategy semantic", () => {
  const base = buildContextStrategySubject(declaration()).strategySubjectIdentity
  const variants: ContextStrategyDeclaration[] = [
    declaration({ strategyId: "strategy:p3-r8-other" }),
    declaration({ lanePriority: [...P3_R1_EVIDENCE_LANES].reverse() }),
    declaration({ maxSelectedItems: 3 }),
    declaration({ maxSelectedUtf8Bytes: 2_048 }),
    declaration({ maxPerGroupingKey: 1 }),
  ]
  for (const variant of variants) {
    assert.notEqual(buildContextStrategySubject(variant).strategySubjectIdentity, base)
  }
})

test("P3-R8 binding matches canonical P3-R1 and P3-R2 reconstruction", () => {
  const planRequest = request(1)
  const declaredPolicy = policy(planRequest)
  const strategy = buildContextStrategySubject(declaration())
  const result = bindContextStrategySubjectToDeclaredPolicy(
    planRequest,
    declaredPolicy,
    strategy,
    bindingDeclaration(strategy.strategySubjectIdentity),
  )
  const plan = buildContextSelectionPlan(planRequest)
  const application = applyDeclaredContextSelectionPolicy(planRequest, declaredPolicy)
  assert.equal(result.planIdentity, plan.planIdentity)
  assert.equal(result.requestIdentity, plan.requestIdentity)
  assert.equal(result.candidateSetIdentity, plan.candidateSetIdentity)
  assert.equal(result.policyIdentity, application.policyIdentity)
  assert.equal(result.applicationIdentity, application.applicationIdentity)
})

test("P3-R8 rejects policy id, lane, and cap mismatches", () => {
  const planRequest = request(1)
  const strategy = buildContextStrategySubject(declaration())
  const bind = (declaredPolicy: DeclaredContextSelectionPolicy) =>
    bindContextStrategySubjectToDeclaredPolicy(
      planRequest,
      declaredPolicy,
      strategy,
      bindingDeclaration(strategy.strategySubjectIdentity),
    )

  assert.throws(() => bind(policy(planRequest, { policyId: "strategy:other" })), /policyId/)
  assert.throws(
    () => bind(policy(planRequest, { lanePriority: [...P3_R1_EVIDENCE_LANES].reverse() })),
    /lanePriority/,
  )
  assert.throws(() => bind(policy(planRequest, { maxSelectedItems: 1, maxPerGroupingKey: 1 })), /policy caps/)
  assert.throws(() => bind(policy(planRequest, { maxSelectedUtf8Bytes: 512 })), /policy caps/)
})

test("P3-R8 rejects subject mismatch and forged serialized intermediates", () => {
  const planRequest = request(1)
  const strategy = buildContextStrategySubject(declaration())
  const forgedSubject = { ...strategy, strategySubjectIdentity: "0".repeat(64) }
  assert.throws(
    () => bindContextStrategySubjectToDeclaredPolicy(
      planRequest,
      policy(planRequest),
      forgedSubject,
      bindingDeclaration("0".repeat(64)),
    ),
    /does not match canonical declaration/,
  )

  const plan = buildContextSelectionPlan(planRequest)
  const application = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest))
  assert.throws(
    () => bindContextStrategySubjectToDeclaredPolicy(
      plan as unknown,
      policy(planRequest),
      strategy,
      bindingDeclaration(strategy.strategySubjectIdentity),
    ),
    /contract violation/,
  )
  assert.throws(
    () => bindContextStrategySubjectToDeclaredPolicy(
      planRequest,
      application as unknown,
      strategy,
      bindingDeclaration(strategy.strategySubjectIdentity),
    ),
    /contract violation/,
  )
})

test("P3-R8 rejects unknown fields and invalid declaration literals, ids, lanes, and caps", () => {
  const base = declaration() as unknown as Record<string, unknown>
  assert.throws(() => buildContextStrategySubject({ ...base, extra: true }), /keys are not canonical/)
  assert.throws(() => buildContextStrategySubject({ ...base, version: "future" }), /unsupported strategy declaration contract/)
  assert.throws(() => buildContextStrategySubject({ ...base, strategyId: "bad id" }), /stable identifier/)
  assert.throws(() => buildContextStrategySubject({ ...base, lanePriority: [...P3_R1_EVIDENCE_LANES.slice(0, -1), "unknown"] }), /unsupported/)
  assert.throws(() => buildContextStrategySubject({ ...base, lanePriority: Array(P3_R1_EVIDENCE_LANES.length).fill(P3_R1_EVIDENCE_LANES[0]) }), /duplicate-free/)
  assert.throws(() => buildContextStrategySubject({ ...base, maxSelectedItems: 0 }), /positive safe integer/)
  assert.throws(() => buildContextStrategySubject({ ...base, maxSelectedUtf8Bytes: Number.MAX_SAFE_INTEGER }), /positive safe integer/)
  assert.throws(() => buildContextStrategySubject({ ...base, maxPerGroupingKey: 3, maxSelectedItems: 2 }), /positive safe integer/)
})

test("P3-R8 rejects Proxy, accessor, symbol, sparse-array, and cyclic inputs", () => {
  assert.throws(() => buildContextStrategySubject(new Proxy(declaration(), {})), /not canonical JSON/)

  const accessor = declaration() as unknown as Record<string, unknown>
  Object.defineProperty(accessor, "strategyId", { enumerable: true, get: () => STRATEGY_ID })
  assert.throws(() => buildContextStrategySubject(accessor), /not canonical JSON/)

  const symbolBearing = declaration() as unknown as Record<PropertyKey, unknown>
  symbolBearing[Symbol("hidden")] = true
  assert.throws(() => buildContextStrategySubject(symbolBearing), /not canonical JSON/)

  const sparse = declaration() as unknown as Record<string, unknown>
  const sparseLanes = new Array(P3_R1_EVIDENCE_LANES.length)
  sparseLanes[0] = P3_R1_EVIDENCE_LANES[0]
  sparse.lanePriority = sparseLanes
  assert.throws(() => buildContextStrategySubject(sparse), /not canonical JSON/)

  const cyclic = declaration() as unknown as Record<string, unknown>
  cyclic.self = cyclic
  assert.throws(() => buildContextStrategySubject(cyclic), /not canonical JSON/)
})

test("P3-R8 returns detached deeply frozen subject and binding evidence", () => {
  const original = declaration()
  const strategy = buildContextStrategySubject(original)
  const planRequest = request(1)
  const result = bindContextStrategySubjectToDeclaredPolicy(
    planRequest,
    policy(planRequest),
    strategy,
    bindingDeclaration(strategy.strategySubjectIdentity),
  )

  assertDeepFrozen(strategy)
  assertDeepFrozen(result)
  assert.notEqual(strategy.strategyDeclaration, original)
  assert.notEqual(strategy.strategyDeclaration.lanePriority, original.lanePriority)

  const mutable = original as unknown as { strategyId: string; lanePriority: string[] }
  mutable.strategyId = "strategy:mutated"
  mutable.lanePriority.reverse()
  assert.equal(strategy.strategyDeclaration.strategyId, STRATEGY_ID)
  assert.deepEqual(strategy.strategyDeclaration.lanePriority, P3_R1_EVIDENCE_LANES)
})

test("P3-R8 does not require ambient fetch, clock, randomness, or environment state", () => {
  const originalFetch = globalThis.fetch
  const originalRandom = Math.random
  const originalNow = Date.now
  const originalEnv = process.env
  try {
    globalThis.fetch = (() => { throw new Error("network forbidden") }) as typeof fetch
    Math.random = () => { throw new Error("randomness forbidden") }
    Date.now = () => { throw new Error("clock forbidden") }
    process.env = new Proxy(originalEnv, { get() { throw new Error("environment forbidden") } })

    const planRequest = request(1)
    const strategy = buildContextStrategySubject(declaration())
    assert.doesNotThrow(() => bindContextStrategySubjectToDeclaredPolicy(
      planRequest,
      policy(planRequest),
      strategy,
      bindingDeclaration(strategy.strategySubjectIdentity),
    ))
  } finally {
    globalThis.fetch = originalFetch
    Math.random = originalRandom
    Date.now = originalNow
    process.env = originalEnv
  }
})
