import assert from "node:assert/strict"
import test from "node:test"

import {
  deriveResultIdentity,
  sha256Canonical,
  type P2R1ManifestRecord,
} from "../bench/p2-r1/contract.ts"
import {
  P3_R6_DIMENSIONS,
  P3_R6_MEASUREMENT_DECLARATION_KIND,
  P3_R6_MEASUREMENT_DECLARATION_VERSION,
  type ContextPolicyMeasurementDeclaration,
} from "../bench/p3-r6/contracts.ts"
import {
  P3_R7_REPORT_DECLARATION_KIND,
  P3_R7_REPORT_DECLARATION_VERSION,
  type ContextPolicyMeasurementReportDeclaration,
} from "../bench/p3-r7/contracts.ts"
import {
  P3_R8_BINDING_DECLARATION_KIND,
  P3_R8_BINDING_DECLARATION_VERSION,
  P3_R8_STRATEGY_DECLARATION_KIND,
  P3_R8_STRATEGY_DECLARATION_VERSION,
  P3_R8_TASK_FAMILY,
  type ContextStrategyDeclaration,
} from "../bench/p3-r8/contracts.ts"
import { buildContextStrategySubject } from "../bench/p3-r8/context-strategy-subject.ts"
import {
  P3_R9_COMPOSITION_DECLARATION_KIND,
  P3_R9_COMPOSITION_DECLARATION_VERSION,
  P3_R9_COMPOSITION_EVIDENCE_KIND,
  P3_R9_COMPOSITION_EVIDENCE_VERSION,
} from "../bench/p3-r9/contracts.ts"
import { composeSingleStrategyTwoCaseReports } from "../bench/p3-r9/single-strategy-two-case-report-composition.ts"
import {
  P3_R1_CONTEXT_SELECTION_PLAN_VERSION,
  P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
  P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
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

const STRATEGY_ID = "strategy:p3-r9-fixture"
const METRICS = P3_R6_DIMENSIONS.map((dimension) => ({
  task_family: "context-selection",
  metric_id: `metric:${dimension}`,
  unit: dimension === "no-gold-abstention" ? "boolean" : "ratio",
}))

function hex(char: string): string {
  return char.repeat(64)
}

function strategyDeclaration(
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
    maxSelectedItems: 2,
    maxSelectedUtf8Bytes: 1_024,
    maxPerGroupingKey: 2,
    ...overrides,
  }
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
  const triplets = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["1", "2", "3"],
  ] as const
  const triplet = triplets[(seed - 1) % triplets.length] ?? triplets[0]
  const repositoryIdentity = hex(triplet[0])
  const snapshotIdentity = hex(triplet[1])
  const contentIdentity = hex(triplet[2])
  return {
    version: P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
    kind: P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
    taskIdentity: `task:p3-r9-case-${seed}`,
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

function policy(
  planRequest: ContextSelectionPlanRequest,
  strategy: ContextStrategyDeclaration,
): DeclaredContextSelectionPolicy {
  const plan = buildContextSelectionPlan(planRequest)
  return {
    version: P3_R2_DECLARED_POLICY_VERSION,
    kind: P3_R2_DECLARED_POLICY_KIND,
    policyId: strategy.strategyId,
    planIdentity: plan.planIdentity,
    repositoryIdentity: plan.repositoryIdentity,
    snapshotIdentity: plan.snapshotIdentity,
    contentIdentity: plan.contentIdentity,
    taskIdentity: plan.taskIdentity,
    lanePriority: [...strategy.lanePriority],
    maxSelectedItems: strategy.maxSelectedItems,
    maxSelectedUtf8Bytes: strategy.maxSelectedUtf8Bytes,
    maxPerGroupingKey: strategy.maxPerGroupingKey,
  }
}

function development(seed: number) {
  return {
    schema_version: "p2-r1-fixture/v1",
    corpus_id: `p3-r9-development-${seed}`,
    corpus_role: "development",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 1 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r9-development-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [
      {
        case_id: `p3-r9-case-${seed}`,
        task_family: "context-selection",
        payload: { purpose: `two-case-composition-${seed}` },
      },
    ],
  } as const
}

function holdout(seed: number) {
  return {
    schema_version: "p2-r1-fixture/v1",
    corpus_id: `p3-r9-holdout-${seed}`,
    corpus_role: "holdout",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 2 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r9-holdout-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [
      {
        case_id: `p3-r9-holdout-case-${seed}`,
        task_family: "context-selection",
        payload: { purpose: `holdout-${seed}` },
      },
    ],
  } as const
}

function manifestRecord(seed: number): P2R1ManifestRecord {
  const developmentValue = development(seed)
  const holdoutValue = holdout(seed)
  const fixtureCase = developmentValue.cases[0]
  const withoutIdentity = {
    schema_version: "p2-r1-manifest/v1",
    benchmark_id: "kodac-p3-r9-fixture",
    benchmark_protocol_version: "v1",
    corpus_id: developmentValue.corpus_id,
    corpus_digest: sha256Canonical(developmentValue),
    corpus_role: "development" as const,
    development_freeze_anchor: developmentValue.chronology_anchor,
    holdout_id: holdoutValue.corpus_id,
    holdout_digest: sha256Canonical(holdoutValue),
    holdout_chronology_anchor: holdoutValue.chronology_anchor,
    chronology_scheme: "fixture-sequence",
    chronology_status: "later-in-time" as const,
    task_family: "context-selection",
    case_id: fixtureCase.case_id,
    case_digest: sha256Canonical(fixtureCase),
    strategy_id: "not-applicable",
    strategy_version: "not-applicable",
    evaluator_id: "not-applicable",
    evaluator_version: "not-applicable",
    model_id: "not-applicable",
    model_version: "not-applicable",
    provider_id: "not-applicable",
    provider_version: "not-applicable",
    execution_environment_id: "not-applicable",
    source_provenance: developmentValue.source_provenance,
    contamination_status: "none-known" as const,
    metric_definitions: METRICS.map((entry) => ({ ...entry })),
  }
  return { ...withoutIdentity, result_identity: deriveResultIdentity(withoutIdentity) }
}

function measurementDeclaration(
  planRequest: ContextSelectionPlanRequest,
  declaredPolicy: DeclaredContextSelectionPolicy,
  manifest: P2R1ManifestRecord,
): ContextPolicyMeasurementDeclaration {
  const application = applyDeclaredContextSelectionPolicy(planRequest, declaredPolicy)
  const identities = application.selectedCandidates.map((entry) => entry.candidateIdentity).sort()
  return {
    version: P3_R6_MEASUREMENT_DECLARATION_VERSION,
    kind: P3_R6_MEASUREMENT_DECLARATION_KIND,
    measurementId: `measurement:${manifest.case_id}`,
    caseId: manifest.case_id,
    r1ResultIdentity: manifest.result_identity,
    taskFamily: "context-selection",
    dimensionMetricBindings: P3_R6_DIMENSIONS.map((dimension) => {
      const metric = manifest.metric_definitions.find(
        (entry) => entry.metric_id === `metric:${dimension}`,
      )
      if (metric === undefined) throw new Error(`metric missing: ${dimension}`)
      return { dimension, metricId: metric.metric_id, unit: metric.unit }
    }),
    goldCandidateIdentities: identities.slice(0, 2),
    utilizedCandidateIdentities: identities.slice(0, 1),
  }
}

function reportDeclaration(manifest: P2R1ManifestRecord): ContextPolicyMeasurementReportDeclaration {
  return {
    version: P3_R7_REPORT_DECLARATION_VERSION,
    kind: P3_R7_REPORT_DECLARATION_KIND,
    reportBindingId: `report-binding:${manifest.case_id}`,
    taskFamily: "context-selection",
    caseId: manifest.case_id,
    r1ResultIdentity: manifest.result_identity,
  }
}

function caseInputs(seed: number, strategy: ContextStrategyDeclaration, subjectIdentity: string) {
  const planRequest = request(seed)
  const declaredPolicy = policy(planRequest, strategy)
  const manifest = manifestRecord(seed)
  return {
    planRequest,
    policy: declaredPolicy,
    manifest: [manifest],
    development: development(seed),
    holdout: holdout(seed),
    measurementDeclaration: measurementDeclaration(planRequest, declaredPolicy, manifest),
    reportDeclaration: reportDeclaration(manifest),
    bindingDeclaration: {
      version: P3_R8_BINDING_DECLARATION_VERSION,
      kind: P3_R8_BINDING_DECLARATION_KIND,
      bindingId: `binding:p3-r9-case-${seed}`,
      strategySubjectIdentity: subjectIdentity,
    },
  }
}

function scenario(
  secondSeed = 2,
  strategy: ContextStrategyDeclaration = strategyDeclaration(),
) {
  const subject = buildContextStrategySubject(strategy)
  const caseA = caseInputs(1, strategy, subject.strategySubjectIdentity)
  const caseB = caseInputs(secondSeed, strategy, subject.strategySubjectIdentity)
  const manifestA = caseA.manifest[0]
  const manifestB = caseB.manifest[0]
  const compositionDeclaration = {
    version: P3_R9_COMPOSITION_DECLARATION_VERSION,
    kind: P3_R9_COMPOSITION_DECLARATION_KIND,
    compositionId: "composition:p3-r9-fixture",
    strategySubjectIdentity: subject.strategySubjectIdentity,
    memberA: {
      memberId: "member:a",
      caseId: manifestA.case_id,
      r1ResultIdentity: manifestA.result_identity,
    },
    memberB: {
      memberId: "member:b",
      caseId: manifestB.case_id,
      r1ResultIdentity: manifestB.result_identity,
    },
  }
  return { strategy, subject, caseA, caseB, compositionDeclaration }
}

function run(secondSeed = 2, strategy = strategyDeclaration()) {
  const value = scenario(secondSeed, strategy)
  return composeSingleStrategyTwoCaseReports(
    value.strategy,
    value.compositionDeclaration,
    value.caseA,
    value.caseB,
  )
}

function assertDeepFrozen(value: unknown, seen = new WeakSet<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return
  seen.add(value)
  assert.equal(Object.isFrozen(value), true)
  for (const nested of Object.values(value as Record<string, unknown>)) assertDeepFrozen(nested, seen)
}

test("P3-R9 composes exactly two independent R7 reports under one R8 strategy subject", () => {
  const result = run()
  assert.equal(result.version, P3_R9_COMPOSITION_EVIDENCE_VERSION)
  assert.equal(result.kind, P3_R9_COMPOSITION_EVIDENCE_KIND)
  assert.match(result.compositionEvidenceIdentity, /^sha256:[0-9a-f]{64}$/)
  assert.ok(!("strategySubjectIdentity" in result.memberA))
  assert.equal(result.memberA.caseBindingEvidence.strategySubjectIdentity, result.strategySubjectIdentity)
  assert.equal(result.memberB.caseBindingEvidence.strategySubjectIdentity, result.strategySubjectIdentity)
  assert.notEqual(result.memberA.caseId, result.memberB.caseId)
  assert.notEqual(result.memberA.r1ResultIdentity, result.memberB.r1ResultIdentity)
  assert.notEqual(result.memberA.reportEvidenceIdentity, result.memberB.reportEvidenceIdentity)
  assert.notEqual(result.memberA.bindingEvidenceIdentity, result.memberB.bindingEvidenceIdentity)
  assert.equal(result.memberA.policyIdentity, result.memberA.caseBindingEvidence.policyIdentity)
  assert.equal(result.memberA.applicationIdentity, result.memberA.caseBindingEvidence.applicationIdentity)
  assert.equal(result.memberB.policyIdentity, result.memberB.caseBindingEvidence.policyIdentity)
  assert.equal(result.memberB.applicationIdentity, result.memberB.caseBindingEvidence.applicationIdentity)

  const statuses = result.memberA.reportEvidence.p2R2Report.task_family_sections[0]?.cases[0]?.metrics
    .map((metric) => metric.measurement_status)
  assert.ok(statuses?.includes("observed"))
  assert.ok(statuses?.includes("unavailable"))

  assert.deepEqual(Object.keys(result).sort(), [
    "compositionDeclaration",
    "compositionEvidenceIdentity",
    "compositionId",
    "kind",
    "memberA",
    "memberB",
    "strategySubject",
    "strategySubjectIdentity",
    "version",
  ].sort())
  assert.ok(!("score" in result))
  assert.ok(!("total" in result))
  assert.ok(!("average" in result))
  assert.ok(!("rank" in result))
  assert.ok(!("winner" in result))
})

test("P3-R9 is deterministic and canonical-key-order invariant", () => {
  const value = scenario()
  const first = composeSingleStrategyTwoCaseReports(
    value.strategy,
    value.compositionDeclaration,
    value.caseA,
    value.caseB,
  )
  const second = composeSingleStrategyTwoCaseReports(
    value.strategy,
    value.compositionDeclaration,
    value.caseA,
    value.caseB,
  )
  const declaration = value.compositionDeclaration
  const reordered = {
    memberB: declaration.memberB,
    compositionId: declaration.compositionId,
    kind: declaration.kind,
    strategySubjectIdentity: declaration.strategySubjectIdentity,
    memberA: declaration.memberA,
    version: declaration.version,
  }
  const third = composeSingleStrategyTwoCaseReports(value.strategy, reordered, value.caseA, value.caseB)
  assert.deepEqual(first, second)
  assert.deepEqual(first, third)
})

test("P3-R9 composition identity changes when the second case changes", () => {
  const first = run(2)
  const second = run(3)
  assert.equal(first.strategySubjectIdentity, second.strategySubjectIdentity)
  assert.notEqual(first.memberB.caseId, second.memberB.caseId)
  assert.notEqual(first.memberB.r1ResultIdentity, second.memberB.r1ResultIdentity)
  assert.notEqual(first.memberB.reportEvidenceIdentity, second.memberB.reportEvidenceIdentity)
  assert.notEqual(first.memberB.bindingEvidenceIdentity, second.memberB.bindingEvidenceIdentity)
  assert.notEqual(first.compositionEvidenceIdentity, second.compositionEvidenceIdentity)
})

test("P3-R9 composition identity changes with strategy semantics", () => {
  const first = run()
  const changedStrategy = strategyDeclaration({ maxSelectedItems: 3, maxPerGroupingKey: 3 })
  const second = run(2, changedStrategy)
  assert.notEqual(first.strategySubjectIdentity, second.strategySubjectIdentity)
  assert.notEqual(first.compositionEvidenceIdentity, second.compositionEvidenceIdentity)
})

test("P3-R9 binds declared member order instead of silently sorting cases", () => {
  const value = scenario()
  const forward = composeSingleStrategyTwoCaseReports(
    value.strategy,
    value.compositionDeclaration,
    value.caseA,
    value.caseB,
  )
  const reversedDeclaration = {
    ...value.compositionDeclaration,
    memberA: value.compositionDeclaration.memberB,
    memberB: value.compositionDeclaration.memberA,
  }
  const reversed = composeSingleStrategyTwoCaseReports(
    value.strategy,
    reversedDeclaration,
    value.caseB,
    value.caseA,
  )
  assert.equal(reversed.memberA.caseId, forward.memberB.caseId)
  assert.equal(reversed.memberB.caseId, forward.memberA.caseId)
  assert.notEqual(reversed.compositionEvidenceIdentity, forward.compositionEvidenceIdentity)
})

test("P3-R9 rejects subject mismatch and duplicate case membership", () => {
  const value = scenario()
  assert.throws(
    () => composeSingleStrategyTwoCaseReports(
      value.strategy,
      { ...value.compositionDeclaration, strategySubjectIdentity: "0".repeat(64) },
      value.caseA,
      value.caseB,
    ),
    /strategySubjectIdentity does not match canonical strategy subject/,
  )
  assert.throws(
    () => composeSingleStrategyTwoCaseReports(
      value.strategy,
      {
        ...value.compositionDeclaration,
        memberB: {
          ...value.compositionDeclaration.memberB,
          caseId: value.compositionDeclaration.memberA.caseId,
        },
      },
      value.caseA,
      value.caseB,
    ),
    /distinct caseId/,
  )
  assert.throws(
    () => composeSingleStrategyTwoCaseReports(
      value.strategy,
      {
        ...value.compositionDeclaration,
        memberB: {
          ...value.compositionDeclaration.memberB,
          r1ResultIdentity: value.compositionDeclaration.memberA.r1ResultIdentity,
        },
      },
      value.caseA,
      value.caseB,
    ),
    /distinct r1ResultIdentity/,
  )
})

test("P3-R9 rejects declaration/member drift and forged serialized intermediates", () => {
  const value = scenario()
  assert.throws(
    () => composeSingleStrategyTwoCaseReports(
      value.strategy,
      {
        ...value.compositionDeclaration,
        memberA: { ...value.compositionDeclaration.memberA, caseId: "wrong-case" },
      },
      value.caseA,
      value.caseB,
    ),
    /R7 caseId does not match declared member/,
  )
  assert.throws(
    () => composeSingleStrategyTwoCaseReports(
      value.strategy,
      value.compositionDeclaration,
      { ...value.caseA, reportEvidence: { forged: true } },
      value.caseB,
    ),
    /caseAInputs keys are not canonical/,
  )
  assert.throws(
    () => composeSingleStrategyTwoCaseReports(
      value.strategy,
      value.compositionDeclaration,
      { ...value.caseA, caseBindingEvidence: { forged: true } },
      value.caseB,
    ),
    /caseAInputs keys are not canonical/,
  )
})

test("P3-R9 rejects hostile inputs before they can diverge R7 and R8 reconstruction", () => {
  const value = scenario()
  assert.throws(
    () => composeSingleStrategyTwoCaseReports(
      value.strategy,
      new Proxy(value.compositionDeclaration, {}),
      value.caseA,
      value.caseB,
    ),
    /not canonical JSON/,
  )

  const accessorCase = { ...value.caseA } as Record<string, unknown>
  Object.defineProperty(accessorCase, "policy", {
    enumerable: true,
    get: () => value.caseA.policy,
  })
  assert.throws(
    () => composeSingleStrategyTwoCaseReports(
      value.strategy,
      value.compositionDeclaration,
      accessorCase,
      value.caseB,
    ),
    /not canonical JSON/,
  )

  const cyclic = { ...value.caseA } as Record<string, unknown>
  cyclic.self = cyclic
  assert.throws(
    () => composeSingleStrategyTwoCaseReports(
      value.strategy,
      value.compositionDeclaration,
      cyclic,
      value.caseB,
    ),
    /not canonical JSON/,
  )
})

test("P3-R9 returns detached deeply frozen evidence", () => {
  const value = scenario()
  const result = composeSingleStrategyTwoCaseReports(
    value.strategy,
    value.compositionDeclaration,
    value.caseA,
    value.caseB,
  )
  assertDeepFrozen(result)
  assert.notEqual(result.compositionDeclaration, value.compositionDeclaration)
  assert.notEqual(result.memberA.reportEvidence, value.caseA.reportDeclaration)

  const mutableStrategy = value.strategy as unknown as {
    strategyId: string
    lanePriority: string[]
  }
  mutableStrategy.strategyId = "strategy:mutated"
  mutableStrategy.lanePriority.reverse()
  const mutableDeclaration = value.compositionDeclaration as unknown as {
    compositionId: string
    memberA: { memberId: string }
  }
  mutableDeclaration.compositionId = "composition:mutated"
  mutableDeclaration.memberA.memberId = "member:mutated"

  assert.equal(result.strategySubject.strategyDeclaration.strategyId, STRATEGY_ID)
  assert.equal(result.compositionId, "composition:p3-r9-fixture")
  assert.equal(result.memberA.memberId, "member:a")
})

test("P3-R9 does not require ambient fetch, clock, randomness, or environment state", () => {
  const originalFetch = globalThis.fetch
  const originalRandom = Math.random
  const originalNow = Date.now
  const originalEnv = process.env
  try {
    globalThis.fetch = (() => { throw new Error("network forbidden") }) as typeof fetch
    Math.random = () => { throw new Error("randomness forbidden") }
    Date.now = () => { throw new Error("clock forbidden") }
    process.env = new Proxy(originalEnv, { get() { throw new Error("environment forbidden") } })
    assert.doesNotThrow(() => run())
  } finally {
    globalThis.fetch = originalFetch
    Math.random = originalRandom
    Date.now = originalNow
    process.env = originalEnv
  }
})
