import assert from "node:assert/strict"
import fs from "node:fs"
import test from "node:test"

import {
  K6_R1_ROUTE_REQUEST_VERSION,
  createK6R1RouteRequest,
  type K6R1PrivacyClass,
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
  createK6R3RouteOutcomeLinkage,
  type K6R3RouteOutcomeLinkageInput,
} from "../src/evidence-router/outcome-linkage-contracts.ts"
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
import {
  K6_R4_LIMITS,
  K6_R4_MEMORY_VERSION,
  K6_R4_OPERATION_VERSION,
  K6_R4_OUTCOME_RECORD_VERSION,
  K6_R4_TOMBSTONE_VERSION,
} from "../src/evidence-router/outcome-memory-contracts.ts"
import {
  applyK6R4OutcomeMemoryOperation,
  createK6R4EmptyOutcomeMemory,
  deriveK6R4CandidateIdentity,
  deriveK6R4RepositoryIdentity,
  deriveK6R4RevisionIdentity,
  deriveK6R4TaskIdentity,
  validateK6R4OutcomeMemory,
  validateK6R4OutcomeMemoryOperation,
} from "../src/evidence-router/outcome-memory.ts"

const base = "1".repeat(40)
const head = "2".repeat(40)
const defaultRepository = "TheHalfMoon/Kodac"
const owner = "a".repeat(64)

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
    provider: `provider-${candidateId}-raw-sentinel`,
    model: `model-${candidateId}-raw-sentinel`,
    declaredCapabilities: ["model/generate", "repo/search", "prompt/raw_sentinel", "secret/raw_sentinel"],
    maximumRiskClass: "HIGH" as const,
    supportedPrivacyClasses: ["PUBLIC", "REPOSITORY_PRIVATE", "SENSITIVE"] as const,
    qualification: {
      protocol: "kodac.provider-qualification" as const,
      version: 1 as const,
      provider: `provider-${candidateId}-raw-sentinel`,
      model: `model-${candidateId}-raw-sentinel`,
      workspaceDigest: "d".repeat(64),
      status: pass ? "PASS" as const : "FAIL" as const,
      reportDigest: candidateId.repeat(64),
    },
  }
}

function route(
  privacyClass: K6R1PrivacyClass = "REPOSITORY_PRIVATE",
  taskId = "k6-r4/raw-task-sentinel",
  repositoryId = defaultRepository,
) {
  const routeRequest = createK6R1RouteRequest({
    version: K6_R1_ROUTE_REQUEST_VERSION,
    repositoryId,
    canonicalBase: base,
    candidateHead: head,
    taskId,
    riskClass: "MEDIUM",
    privacyClass,
    requiredCapabilities: ["repo/search", "model/generate", "secret/raw_sentinel"],
    candidates: [candidate("b"), candidate("a")],
  })
  const eligibility = evaluateK6R1ModelProviderRouteEligibility(routeRequest)
  const routePlanRequest = createK6R2RoutePlanRequest({
    version: K6_R2_ROUTE_PLAN_REQUEST_VERSION,
    orderingBasis: K6_R2_ORDERING_BASIS,
    eligibilityResult: eligibility,
    orderedEligibleCandidateIds: ["a", "b"],
  })
  return {
    routeRequest,
    routePlanRequest,
    routePlan: materializeK6R2DeterministicRoutePlan(routePlanRequest),
  }
}

function receipt(index: number, resultStatus: "success" | "blocked" | "failure" = "success"): K5R2SourceLink {
  return createK5R2SourceLink({
    evidenceId: `e-receipt-${index}`,
    sourceKind: "EXECUTION_RECEIPT",
    canonicalBase: base,
    candidateHead: head,
    sourceRef: `stdout/raw-sentinel-${index}`,
    sourceDigest: index.toString(16).padStart(64, "a").slice(-64),
    metadata: {
      receiptId: `receipt-${index}`,
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
    sourceRef: "finding/raw-sentinel",
    sourceDigest: "e".repeat(64),
    metadata: {
      protocol: "kodac.verification",
      reportVersion: 1,
      sessionId: "session-k6-r4",
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
  state: K5R4EvidenceState,
  repositoryId: string,
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
    revision: { repositoryId, canonicalBase: base, candidateHead: head },
    status: state,
    results,
    outOfScopeEvidenceIds: [],
  } satisfies K5R4ProofStateReconciliationInput
  return Object.freeze({ ...preimage, reconciliationIdentity: k5R4ReconciliationIdentity(preimage) })
}

function bundle(options: {
  privacyClass?: K6R1PrivacyClass
  taskId?: string
  repositoryId?: string
  executionStatus?: "success" | "blocked" | "failure"
  k5State?: K5R4EvidenceState
  doneStatus?: "PROVEN_READY" | "NOT_READY"
} = {}) {
  const repositoryId = options.repositoryId ?? defaultRepository
  const routed = route(options.privacyClass, options.taskId, repositoryId)
  const execution = receipt(0, options.executionStatus)
  const verify = verification()
  const k5State = options.k5State ?? "VALID"
  const doneStatus = options.doneStatus ?? "NOT_READY"
  const input: K6R3RouteOutcomeLinkageInput = {
    routePlanRequest: routed.routePlanRequest,
    routePlan: routed.routePlan,
    executionObservations: [{ planStepIndex: 0, executionReceiptSource: execution }],
    verificationSource: verify,
    k5Reconciliation: reconciliation([execution, verify], k5State, repositoryId),
    doneGateOutcome: {
      version: K6_R3_DONE_GATE_OUTCOME_VERSION,
      verificationSourceIdentity: verify.sourceIdentity,
      status: doneStatus,
      reasons: doneStatus === "PROVEN_READY" ? [] : ["reason/raw-sentinel"],
      evidence: [{ kind: "workspace", ref: "diff/raw-sentinel" }],
    },
  }
  const linkage = createK6R3RouteOutcomeLinkage(input)
  return {
    routeRequest: routed.routeRequest,
    routeOutcomeLinkageEnvelope: Object.freeze({ input, linkage }),
  }
}

function emptyFor(source = bundle()) {
  return createK6R4EmptyOutcomeMemory({
    repositoryIdentity: deriveK6R4RepositoryIdentity(source.routeOutcomeLinkageEnvelope.linkage.repositoryId),
    ownerScopeId: owner,
    privacyClass: source.routeRequest.privacyClass,
  })
}

function append(memory = emptyFor(), source = bundle(), observedAtUnixMs = 100, expiresAtUnixMs = 200) {
  return applyK6R4OutcomeMemoryOperation(memory, {
    version: K6_R4_OPERATION_VERSION,
    kind: "APPEND",
    ownerScopeId: owner,
    observedAtUnixMs,
    expiresAtUnixMs,
    routeRequest: source.routeRequest,
    routeOutcomeLinkageEnvelope: source.routeOutcomeLinkageEnvelope,
  })
}

test("creates a deterministic deeply frozen empty memory", () => {
  const source = bundle()
  const first = emptyFor(source)
  const second = emptyFor(source)
  assert.equal(first.version, K6_R4_MEMORY_VERSION)
  assert.equal(first.memoryIdentity, second.memoryIdentity)
  assert.deepEqual(first.records, [])
  assert.deepEqual(first.tombstones, [])
  assert.ok(Object.isFrozen(first))
  assert.ok(Object.isFrozen(first.scope))
  assert.equal(validateK6R4OutcomeMemory(first).memoryIdentity, first.memoryIdentity)
})

test("derives domain-separated minimized identities deterministically", () => {
  assert.equal(deriveK6R4RepositoryIdentity(defaultRepository), deriveK6R4RepositoryIdentity(defaultRepository))
  assert.notEqual(deriveK6R4RepositoryIdentity(defaultRepository), deriveK6R4TaskIdentity(defaultRepository))
  assert.notEqual(
    deriveK6R4RevisionIdentity(defaultRepository, base, head),
    deriveK6R4RevisionIdentity(defaultRepository, base, "3".repeat(40)),
  )
  const projection = { candidateId: "a", candidateKind: "MODEL_PROVIDER", provider: "p", model: "m" }
  assert.equal(deriveK6R4CandidateIdentity(projection), deriveK6R4CandidateIdentity({ ...projection }))
  assert.throws(() => deriveK6R4CandidateIdentity({ ...projection, extra: "no" }), TypeError)
})

test("APPEND binds validated R1 privacy to R3 and emits only minimized immutable fields", () => {
  for (const privacyClass of ["PUBLIC", "REPOSITORY_PRIVATE", "SENSITIVE"] as const) {
    const source = bundle({ privacyClass })
    const memory = append(emptyFor(source), source)
    const record = memory.records[0]!
    assert.equal(record.version, K6_R4_OUTCOME_RECORD_VERSION)
    assert.equal(record.scope.privacyClass, privacyClass)
    assert.equal(record.scope.ownerScopeId, owner)
    assert.equal(record.source.routeOutcomeLinkageIdentity, source.routeOutcomeLinkageEnvelope.linkage.linkageIdentity)
    assert.equal(record.source.requestIdentity, source.routeRequest.requestIdentity)
    assert.ok(Object.isFrozen(memory))
    assert.ok(Object.isFrozen(record))
    assert.ok(Object.isFrozen(record.outcome.executionOutcomes))
  }
})

test("serialized R4 memory omits raw predecessor and sensitive sentinels", () => {
  const source = bundle({ taskId: "task/raw-sentinel", repositoryId: "repo/raw-sentinel" })
  const serialized = JSON.stringify(append(emptyFor(source), source))
  for (const forbidden of [
    "repo/raw-sentinel", "task/raw-sentinel", base, head,
    "provider-a-raw-sentinel", "model-a-raw-sentinel", "prompt/raw_sentinel",
    "secret/raw_sentinel", "stdout/raw-sentinel", "finding/raw-sentinel",
    "reason/raw-sentinel", "diff/raw-sentinel",
  ]) assert.equal(serialized.includes(forbidden), false, `retained forbidden sentinel: ${forbidden}`)
})

test("R1/R3 binding mismatch and forged predecessor identities fail closed", () => {
  const source = bundle({ privacyClass: "SENSITIVE" })
  const other = bundle({ privacyClass: "PUBLIC" })
  assert.throws(() => append(emptyFor(source), { ...source, routeRequest: other.routeRequest }), TypeError)
  const forged = clone(source.routeRequest)
  forged.requestIdentity = "0".repeat(64)
  assert.throws(() => validateK6R4OutcomeMemoryOperation({
    version: K6_R4_OPERATION_VERSION,
    kind: "APPEND",
    ownerScopeId: owner,
    observedAtUnixMs: 1,
    expiresAtUnixMs: 2,
    routeRequest: forged,
    routeOutcomeLinkageEnvelope: source.routeOutcomeLinkageEnvelope,
  }), TypeError)
})

test("scope isolation rejects cross-owner, cross-repository, and cross-privacy admission", () => {
  const source = bundle()
  const memory = emptyFor(source)
  assert.throws(() => applyK6R4OutcomeMemoryOperation(memory, {
    version: K6_R4_OPERATION_VERSION,
    kind: "APPEND",
    ownerScopeId: "b".repeat(64),
    observedAtUnixMs: 1,
    expiresAtUnixMs: 2,
    routeRequest: source.routeRequest,
    routeOutcomeLinkageEnvelope: source.routeOutcomeLinkageEnvelope,
  }), TypeError)
  assert.throws(() => append(memory, bundle({ repositoryId: "Other/Repo" })), TypeError)
  assert.throws(() => append(memory, bundle({ privacyClass: "SENSITIVE" })), TypeError)
})

test("APPEND is exactly idempotent but never last-write-wins for an active task", () => {
  const source = bundle()
  const once = append(emptyFor(source), source)
  const twice = append(once, source)
  assert.equal(twice.memoryIdentity, once.memoryIdentity)
  assert.equal(twice.records.length, 1)
  assert.throws(() => append(once, bundle({ executionStatus: "failure" })), /SUPERSEDE/)
})

test("SUPERSEDE atomically replaces the active task and emits a minimal anti-resurrection tombstone", () => {
  const originalSource = bundle({ executionStatus: "success" })
  const original = append(emptyFor(originalSource), originalSource, 100, 300)
  const target = original.records[0]!
  const replacementSource = bundle({ executionStatus: "failure" })
  const next = applyK6R4OutcomeMemoryOperation(original, {
    version: K6_R4_OPERATION_VERSION,
    kind: "SUPERSEDE",
    targetRecordIdentity: target.recordIdentity,
    ownerScopeId: owner,
    observedAtUnixMs: 150,
    expiresAtUnixMs: 400,
    tombstoneExpiresAtUnixMs: 500,
    routeRequest: replacementSource.routeRequest,
    routeOutcomeLinkageEnvelope: replacementSource.routeOutcomeLinkageEnvelope,
  })
  assert.equal(next.records.length, 1)
  assert.equal(next.tombstones.length, 1)
  assert.notEqual(next.records[0]!.recordIdentity, target.recordIdentity)
  assert.equal(next.records[0]!.lifecycle.supersedesRecordIdentity, target.recordIdentity)
  assert.equal(next.tombstones[0]!.version, K6_R4_TOMBSTONE_VERSION)
  assert.equal(next.tombstones[0]!.transition, "SUPERSEDED")
  assert.equal(next.tombstones[0]!.replacementRecordIdentity, next.records[0]!.recordIdentity)
  assert.equal(Object.hasOwn(next.tombstones[0]!, "outcome"), false)
})

test("SUPERSEDE rejects wrong task, early observation, and missing target", () => {
  const source = bundle()
  const memory = append(emptyFor(source), source, 100, 300)
  const target = memory.records[0]!
  const otherTask = bundle({ taskId: "other/task" })
  const operation = {
    version: K6_R4_OPERATION_VERSION,
    kind: "SUPERSEDE" as const,
    targetRecordIdentity: target.recordIdentity,
    ownerScopeId: owner,
    observedAtUnixMs: 150,
    expiresAtUnixMs: 400,
    tombstoneExpiresAtUnixMs: 500,
    routeRequest: otherTask.routeRequest,
    routeOutcomeLinkageEnvelope: otherTask.routeOutcomeLinkageEnvelope,
  }
  assert.throws(() => applyK6R4OutcomeMemoryOperation(memory, operation), TypeError)
  assert.throws(() => applyK6R4OutcomeMemoryOperation(memory, {
    ...operation,
    routeRequest: source.routeRequest,
    routeOutcomeLinkageEnvelope: source.routeOutcomeLinkageEnvelope,
    observedAtUnixMs: 99,
  }), TypeError)
  assert.throws(() => applyK6R4OutcomeMemoryOperation(memory, { ...operation, targetRecordIdentity: "0".repeat(64) }), TypeError)
})

test("DELETE removes payload, blocks exact replay, and PURGE removes hidden history only after expiry", () => {
  const source = bundle()
  const active = append(emptyFor(source), source, 100, 300)
  const target = active.records[0]!
  const deleted = applyK6R4OutcomeMemoryOperation(active, {
    version: K6_R4_OPERATION_VERSION,
    kind: "DELETE",
    targetRecordIdentity: target.recordIdentity,
    transitionAtUnixMs: 150,
    tombstoneExpiresAtUnixMs: 250,
  })
  assert.equal(deleted.records.length, 0)
  assert.equal(deleted.tombstones[0]!.transition, "DELETED")
  assert.equal(JSON.stringify(deleted).includes(target.outcome.k5ReconciliationIdentity), false)
  assert.throws(() => append(deleted, source, 100, 300), /tombstone/)
  assert.throws(() => applyK6R4OutcomeMemoryOperation(deleted, {
    version: K6_R4_OPERATION_VERSION,
    kind: "PURGE_TOMBSTONE",
    targetTombstoneIdentity: deleted.tombstones[0]!.tombstoneIdentity,
    transitionAtUnixMs: 249,
  }), TypeError)
  const purged = applyK6R4OutcomeMemoryOperation(deleted, {
    version: K6_R4_OPERATION_VERSION,
    kind: "PURGE_TOMBSTONE",
    targetTombstoneIdentity: deleted.tombstones[0]!.tombstoneIdentity,
    transitionAtUnixMs: 250,
  })
  assert.deepEqual(purged.tombstones, [])
  assert.equal(JSON.stringify(purged).includes(target.recordIdentity), false)
  assert.equal(append(purged, source, 100, 300).records.length, 1)
})

test("EXPIRE is caller-time driven and rejects early expiry", () => {
  const source = bundle()
  const active = append(emptyFor(source), source, 100, 200)
  const target = active.records[0]!
  const op = {
    version: K6_R4_OPERATION_VERSION,
    kind: "EXPIRE" as const,
    targetRecordIdentity: target.recordIdentity,
    transitionAtUnixMs: 199,
    tombstoneExpiresAtUnixMs: 300,
  }
  assert.throws(() => applyK6R4OutcomeMemoryOperation(active, op), TypeError)
  const expired = applyK6R4OutcomeMemoryOperation(active, { ...op, transitionAtUnixMs: 200 })
  assert.equal(expired.records.length, 0)
  assert.equal(expired.tombstones[0]!.transition, "EXPIRED")
})

test("validators reject forged identities, unknown fields, invalid ordering, and invalid timestamps", () => {
  const active = append()
  const forged = clone(active)
  forged.memoryIdentity = "0".repeat(64)
  assert.throws(() => validateK6R4OutcomeMemory(forged), TypeError)
  assert.throws(() => validateK6R4OutcomeMemory({ ...active, extra: true }), TypeError)
  assert.throws(() => validateK6R4OutcomeMemoryOperation({
    version: K6_R4_OPERATION_VERSION,
    kind: "DELETE",
    targetRecordIdentity: active.records[0]!.recordIdentity,
    transitionAtUnixMs: -0,
    tombstoneExpiresAtUnixMs: 200,
  }), TypeError)
})

test("hostile getters, proxies, symbols, custom prototypes, sparse arrays, cycles, and invalid Unicode fail without executing hooks", () => {
  const active = append()
  let getterRuns = 0
  const getter = clone(active) as Record<string, unknown>
  Object.defineProperty(getter, "memoryIdentity", { enumerable: true, get() { getterRuns += 1; return active.memoryIdentity } })
  assert.throws(() => validateK6R4OutcomeMemory(getter), TypeError)
  assert.equal(getterRuns, 0)
  assert.throws(() => validateK6R4OutcomeMemory(new Proxy(active, {})), TypeError)
  assert.throws(() => validateK6R4OutcomeMemory({ ...active, [Symbol("x")]: true }), TypeError)
  assert.throws(() => validateK6R4OutcomeMemory(Object.assign(Object.create({ inherited: true }), active)), TypeError)
  const sparse = clone(active)
  sparse.records = new Array(2)
  sparse.records[1] = clone(active.records[0]!)
  assert.throws(() => validateK6R4OutcomeMemory(sparse), TypeError)
  const cyclic = clone(active) as Record<string, unknown>
  cyclic.extra = cyclic
  assert.throws(() => validateK6R4OutcomeMemory(cyclic), TypeError)
  assert.throws(() => deriveK6R4CandidateIdentity({
    candidateId: "\ud800", candidateKind: "MODEL_PROVIDER", provider: "p", model: "m",
  }), TypeError)
  assert.throws(() => validateK6R4OutcomeMemory({ ["\ud800"]: null }), TypeError)
})

test("configured resource bounds distinguish boundary acceptance from over-bound RangeError", () => {
  const active = append()

  const atRecords = clone(active)
  atRecords.records = new Array(K6_R4_LIMITS.maxActiveRecords).fill(null)
  assert.throws(() => validateK6R4OutcomeMemory(atRecords), TypeError)
  const overRecords = clone(active)
  overRecords.records = new Array(K6_R4_LIMITS.maxActiveRecords + 1).fill(null)
  assert.throws(() => validateK6R4OutcomeMemory(overRecords), RangeError)

  const deleted = applyK6R4OutcomeMemoryOperation(active, {
    version: K6_R4_OPERATION_VERSION,
    kind: "DELETE",
    targetRecordIdentity: active.records[0]!.recordIdentity,
    transitionAtUnixMs: 150,
    tombstoneExpiresAtUnixMs: 250,
  })
  const atTombstones = clone(deleted)
  atTombstones.tombstones = new Array(K6_R4_LIMITS.maxTombstones).fill(null)
  assert.throws(() => validateK6R4OutcomeMemory(atTombstones), TypeError)
  const overTombstones = clone(deleted)
  overTombstones.tombstones = new Array(K6_R4_LIMITS.maxTombstones + 1).fill(null)
  assert.throws(() => validateK6R4OutcomeMemory(overTombstones), RangeError)

  const atOutcomes = clone(active)
  atOutcomes.records[0]!.outcome.executionOutcomes =
    new Array(K6_R4_LIMITS.maxExecutionOutcomesPerRecord).fill(null)
  assert.throws(() => validateK6R4OutcomeMemory(atOutcomes), TypeError)
  const overOutcomes = clone(active)
  overOutcomes.records[0]!.outcome.executionOutcomes =
    new Array(K6_R4_LIMITS.maxExecutionOutcomesPerRecord + 1).fill(null)
  assert.throws(() => validateK6R4OutcomeMemory(overOutcomes), RangeError)

  const atDepth: Record<string, unknown> = { x: null }
  let depthCursor = atDepth
  for (let index = 1; index < K6_R4_LIMITS.maxDepth - 1; index += 1) {
    const next: Record<string, unknown> = { x: null }
    depthCursor.x = next
    depthCursor = next
  }
  assert.throws(() => validateK6R4OutcomeMemory(atDepth), TypeError)
  const overDepth: Record<string, unknown> = { x: null }
  depthCursor = overDepth
  for (let index = 1; index < K6_R4_LIMITS.maxDepth; index += 1) {
    const next: Record<string, unknown> = { x: null }
    depthCursor.x = next
    depthCursor = next
  }
  assert.throws(() => validateK6R4OutcomeMemory(overDepth), RangeError)

  const atNodes = { x: new Array(K6_R4_LIMITS.maxNodes - 2).fill(null) }
  assert.throws(() => validateK6R4OutcomeMemory(atNodes), TypeError)
  const overNodes = { x: new Array(K6_R4_LIMITS.maxNodes - 1).fill(null) }
  assert.throws(() => validateK6R4OutcomeMemory(overNodes), RangeError)

  const atKey = "k".repeat(K6_R4_LIMITS.maxTotalStringChars)
  assert.throws(() => validateK6R4OutcomeMemory({ [atKey]: null }), TypeError)
  const overKey = "k".repeat(K6_R4_LIMITS.maxTotalStringChars + 1)
  assert.throws(() => validateK6R4OutcomeMemory({ [overKey]: null }), RangeError)

  const boundaryScope = createK6R4EmptyOutcomeMemory({
    repositoryIdentity: deriveK6R4RepositoryIdentity(defaultRepository),
    ownerScopeId: "f".repeat(K6_R4_LIMITS.maxOwnerScopeIdBytes),
    privacyClass: "PUBLIC",
  })
  assert.equal(boundaryScope.scope.ownerScopeId.length, K6_R4_LIMITS.maxOwnerScopeIdBytes)
  assert.throws(() => createK6R4EmptyOutcomeMemory({
    repositoryIdentity: deriveK6R4RepositoryIdentity(defaultRepository),
    ownerScopeId: "f".repeat(K6_R4_LIMITS.maxOwnerScopeIdBytes + 1),
    privacyClass: "PUBLIC",
  }), RangeError)

  assert.equal(validateK6R4OutcomeMemory(active).memoryIdentity.length, K6_R4_LIMITS.maxIdentityBytes)
  const overIdentity = clone(active)
  overIdentity.memoryIdentity = "f".repeat(K6_R4_LIMITS.maxIdentityBytes + 1)
  assert.throws(() => validateK6R4OutcomeMemory(overIdentity), RangeError)
  const malformedIdentity = clone(active)
  malformedIdentity.memoryIdentity = "g".repeat(K6_R4_LIMITS.maxIdentityBytes)
  assert.throws(() => validateK6R4OutcomeMemory(malformedIdentity), TypeError)
})

test("caller inputs are not mutated and ownerScopeId remains isolation data only", () => {
  const source = bundle()
  const memory = emptyFor(source)
  const operation = {
    version: K6_R4_OPERATION_VERSION,
    kind: "APPEND",
    ownerScopeId: owner,
    observedAtUnixMs: 10,
    expiresAtUnixMs: 20,
    routeRequest: source.routeRequest,
    routeOutcomeLinkageEnvelope: source.routeOutcomeLinkageEnvelope,
  }
  const beforeMemory = JSON.stringify(memory)
  const beforeOperation = JSON.stringify(operation)
  const next = applyK6R4OutcomeMemoryOperation(memory, operation)
  assert.equal(JSON.stringify(memory), beforeMemory)
  assert.equal(JSON.stringify(operation), beforeOperation)
  assert.equal(Object.hasOwn(next.scope, "authorized"), false)
  assert.equal(Object.hasOwn(next.scope, "capability"), false)
  assert.equal(Object.hasOwn(next.scope, "permission"), false)
})

test("schema declares pseudonymous isolation and exact runtime enums/bounds without claiming semantic proof", () => {
  const schema = JSON.parse(fs.readFileSync(new URL("../../../schema/k6-r4-privacy-governed-outcome-memory.schema.json", import.meta.url), "utf8")) as any
  assert.equal(schema.$id, "https://kodac.dev/schema/k6-r4-privacy-governed-outcome-memory.schema.json")
  assert.equal(schema.$ref, "#/$defs/outcomeMemory")
  assert.deepEqual(schema.$defs.scope.properties.privacyClass.enum, ["PUBLIC", "REPOSITORY_PRIVATE", "SENSITIVE"])
  assert.deepEqual(schema.$defs.outcome.properties.k5Status.enum, ["NOT_APPLICABLE", "VALID", "INCOMPLETE", "CONTRADICTORY", "STALE", "INVALID"])
  assert.deepEqual(schema.$defs.outcome.properties.doneGateStatus.enum, ["PROVEN_READY", "NOT_READY"])
  assert.deepEqual(schema.$defs.executionOutcome.properties.executionResultStatus.enum, ["success", "blocked", "failure"])
  assert.deepEqual(schema.$defs.executionOutcome.properties.role.enum, ["PRIMARY", "FALLBACK"])
  assert.deepEqual(schema.$defs.tombstone.properties.transition.enum, ["DELETED", "EXPIRED", "SUPERSEDED"])
  assert.equal(schema.$defs.outcomeMemory.properties.records.maxItems, K6_R4_LIMITS.maxActiveRecords)
  assert.equal(schema.$defs.outcomeMemory.properties.tombstones.maxItems, K6_R4_LIMITS.maxTombstones)
  assert.equal(schema.$defs.outcome.properties.executionOutcomes.maxItems, K6_R4_LIMITS.maxExecutionOutcomesPerRecord)
  assert.match(schema.$defs.ownerScopeId.description, /not authentication/)
  assert.match(schema.$comment, /does not prove/)
})

test("R4 production modules contain no side-effect authority", () => {
  const contracts = fs.readFileSync(new URL("../src/evidence-router/outcome-memory-contracts.ts", import.meta.url), "utf8")
  const runtime = fs.readFileSync(new URL("../src/evidence-router/outcome-memory.ts", import.meta.url), "utf8")
  assert.equal(/\bimport\b/.test(contracts), false)
  for (const forbidden of [
    "node:fs", "node:http", "node:https", "node:net", "node:tls", "node:child_process",
    "ExecutionGateway", "fetch(", "Date.now", "Math.random", "process.env",
  ]) assert.equal((contracts + runtime).includes(forbidden), false, `forbidden production primitive: ${forbidden}`)
})
