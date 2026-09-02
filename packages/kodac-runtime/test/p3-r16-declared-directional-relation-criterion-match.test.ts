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
  type P3R6Dimension,
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
} from "../bench/p3-r9/contracts.ts"
import { composeSingleStrategyTwoCaseReports } from "../bench/p3-r9/single-strategy-two-case-report-composition.ts"
import {
  P3_R10_ALIGNMENT_DECLARATION_KIND,
  P3_R10_ALIGNMENT_DECLARATION_VERSION,
} from "../bench/p3-r10/contracts.ts"
import { buildSingleStrategyTwoCaseMetricAlignment } from "../bench/p3-r10/single-strategy-two-case-metric-alignment.ts"
import {
  P3_R11_POLICY_DECLARATION_KIND,
  P3_R11_POLICY_DECLARATION_VERSION,
  type P3R11DimensionPolicy,
} from "../bench/p3-r11/contracts.ts"
import { buildSingleStrategyTwoCaseReductionPolicyBinding } from "../bench/p3-r11/single-strategy-two-case-reduction-policy-binding.ts"
import {
  P3_R12_REDUCTION_DECLARATION_KIND,
  P3_R12_REDUCTION_DECLARATION_VERSION,
} from "../bench/p3-r12/contracts.ts"
import { buildSingleStrategyTwoCaseReductionEvidence } from "../bench/p3-r12/single-strategy-two-case-reduction-evidence.ts"
import {
  P3_R13_DIRECTION_DECLARATION_KIND,
  P3_R13_DIRECTION_DECLARATION_VERSION,
  type P3R13Direction,
} from "../bench/p3-r13/contracts.ts"
import { buildReductionDirectionBindingEvidence } from "../bench/p3-r13/reduction-direction-binding.ts"
import {
  P3_R14_COMPARISON_DECLARATION_KIND,
  P3_R14_COMPARISON_DECLARATION_VERSION,
  type P3R14ReconstructionBundle,
} from "../bench/p3-r14/contracts.ts"
import { buildStrategyReductionDirectionalRelationEvidence } from "../bench/p3-r15/strategy-reduction-directional-relation.ts"
import {
  P3_R16_ALLOWED_RELATIONS,
  P3_R16_CRITERION_DECLARATION_KIND,
  P3_R16_CRITERION_DECLARATION_VERSION,
  P3_R16_CRITERION_MATCH_EVIDENCE_KIND,
  P3_R16_CRITERION_MATCH_EVIDENCE_VERSION,
  type P3R16AllowedRelation,
  type P3R16CriterionDeclaration,
} from "../bench/p3-r16/contracts.ts"
import { buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence } from "../bench/p3-r16/declared-directional-relation-criterion-match.ts"
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

const BENCHMARK_ID = "kodac-p3-r16-fixture"
const BENCHMARK_PROTOCOL_VERSION = "v1"
const POLICY_IDENTITY = `sha256:${"a".repeat(64)}`

type MeasurementOptions = {
  readonly utilizedCount?: number
  readonly noGold?: boolean
}

type ScenarioOptions = {
  readonly measurementA?: MeasurementOptions
  readonly measurementB?: MeasurementOptions
  readonly directionForIndex?: (index: number) => P3R13Direction
}

type Scenario = {
  readonly strategy: ContextStrategyDeclaration
  readonly compositionDeclaration: Record<string, unknown>
  readonly alignmentDeclaration: Record<string, unknown>
  readonly policyDeclaration: Record<string, unknown>
  readonly reductionDeclaration: Record<string, unknown>
  readonly directionDeclaration: Record<string, unknown>
  readonly caseA: Record<string, unknown>
  readonly caseB: Record<string, unknown>
  readonly bundle: P3R14ReconstructionBundle
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function hex(char: string): string {
  return char.repeat(64)
}

function metricId(dimension: P3R6Dimension): string {
  return `metric:${dimension}`
}

function metricUnit(dimension: P3R6Dimension): string {
  return dimension === "no-gold-abstention" ? "boolean" : "ratio"
}

function metricDefinitions() {
  return P3_R6_DIMENSIONS.map((dimension) => ({
    task_family: "context-selection",
    metric_id: metricId(dimension),
    unit: metricUnit(dimension),
  }))
}

function strategyDeclaration(strategyId: string): ContextStrategyDeclaration {
  return {
    version: P3_R8_STRATEGY_DECLARATION_VERSION,
    kind: P3_R8_STRATEGY_DECLARATION_KIND,
    strategyId,
    taskFamily: P3_R8_TASK_FAMILY,
    planContractVersion: P3_R1_CONTEXT_SELECTION_PLAN_VERSION,
    policyContractVersion: P3_R2_DECLARED_POLICY_VERSION,
    applicationContractVersion: P3_R2_POLICY_APPLICATION_VERSION,
    lanePriority: [...P3_R1_EVIDENCE_LANES],
    maxSelectedItems: 3,
    maxSelectedUtf8Bytes: 2_048,
    maxPerGroupingKey: 3,
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
    utf8Bytes: 100 + index,
    groupingKey: `file:src/file-${index}.ts`,
    planReasons: ["fixture"],
    provenanceRefs: [`repo://fixture/file-${index}.ts`],
  }
}

function request(seed: number): ContextSelectionPlanRequest {
  const triplets = [
    ["a", "b", "c"],
    ["d", "e", "f"],
  ] as const
  const triplet = triplets[(seed - 1) % triplets.length] ?? triplets[0]
  const repositoryIdentity = hex(triplet[0])
  const snapshotIdentity = hex(triplet[1])
  const contentIdentity = hex(triplet[2])
  return {
    version: P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
    kind: P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
    taskIdentity: `task:p3-r16-case-${seed}`,
    repositoryIdentity,
    snapshotIdentity,
    contentIdentity,
    candidates: Array.from({ length: 4 }, (_, index) =>
      candidate(index + 1, repositoryIdentity, snapshotIdentity, contentIdentity)),
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
    corpus_id: `p3-r16-development-${seed}`,
    corpus_role: "development",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 1 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r16-development-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [{
      case_id: `p3-r16-case-${seed}`,
      task_family: "context-selection",
      payload: { purpose: `criterion-match-${seed}` },
    }],
  } as const
}

function holdout(seed: number) {
  return {
    schema_version: "p2-r1-fixture/v1",
    corpus_id: `p3-r16-holdout-${seed}`,
    corpus_role: "holdout",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 2 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r16-holdout-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [{
      case_id: `p3-r16-holdout-case-${seed}`,
      task_family: "context-selection",
      payload: { purpose: `holdout-${seed}` },
    }],
  } as const
}

function manifestRecord(seed: number): P2R1ManifestRecord {
  const developmentValue = development(seed)
  const holdoutValue = holdout(seed)
  const fixtureCase = developmentValue.cases[0]
  const withoutIdentity = {
    schema_version: "p2-r1-manifest/v1",
    benchmark_id: BENCHMARK_ID,
    benchmark_protocol_version: BENCHMARK_PROTOCOL_VERSION,
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
    metric_definitions: metricDefinitions().map((entry) => ({ ...entry })),
  }
  return { ...withoutIdentity, result_identity: deriveResultIdentity(withoutIdentity) }
}

function measurementDeclaration(
  planRequest: ContextSelectionPlanRequest,
  declaredPolicy: DeclaredContextSelectionPolicy,
  manifest: P2R1ManifestRecord,
  strategyId: string,
  options: MeasurementOptions = {},
): ContextPolicyMeasurementDeclaration {
  const application = applyDeclaredContextSelectionPolicy(planRequest, declaredPolicy)
  const identities = application.selectedCandidates.map((entry) => entry.candidateIdentity).sort()
  const utilizedCount = Math.max(0, Math.min(options.utilizedCount ?? 1, identities.length))
  return {
    version: P3_R6_MEASUREMENT_DECLARATION_VERSION,
    kind: P3_R6_MEASUREMENT_DECLARATION_KIND,
    measurementId: `measurement:${strategyId}:${manifest.case_id}`,
    caseId: manifest.case_id,
    r1ResultIdentity: manifest.result_identity,
    taskFamily: "context-selection",
    dimensionMetricBindings: P3_R6_DIMENSIONS.map((dimension) => ({
      dimension,
      metricId: metricId(dimension),
      unit: metricUnit(dimension),
    })),
    goldCandidateIdentities: options.noGold ? [] : identities.slice(0, 2),
    utilizedCandidateIdentities: identities.slice(0, utilizedCount),
  }
}

function reportDeclaration(
  manifest: P2R1ManifestRecord,
  strategyId: string,
): ContextPolicyMeasurementReportDeclaration {
  return {
    version: P3_R7_REPORT_DECLARATION_VERSION,
    kind: P3_R7_REPORT_DECLARATION_KIND,
    reportBindingId: `report-binding:${strategyId}:${manifest.case_id}`,
    taskFamily: "context-selection",
    caseId: manifest.case_id,
    r1ResultIdentity: manifest.result_identity,
  }
}

function caseInputs(
  seed: number,
  strategy: ContextStrategyDeclaration,
  subjectIdentity: string,
  measurementOptions: MeasurementOptions = {},
) {
  const planRequest = request(seed)
  const declaredPolicy = policy(planRequest, strategy)
  const manifest = manifestRecord(seed)
  return {
    planRequest,
    policy: declaredPolicy,
    manifest: [manifest],
    development: development(seed),
    holdout: holdout(seed),
    measurementDeclaration: measurementDeclaration(
      planRequest,
      declaredPolicy,
      manifest,
      strategy.strategyId,
      measurementOptions,
    ),
    reportDeclaration: reportDeclaration(manifest, strategy.strategyId),
    bindingDeclaration: {
      version: P3_R8_BINDING_DECLARATION_VERSION,
      kind: P3_R8_BINDING_DECLARATION_KIND,
      bindingId: `binding:${strategy.strategyId}:case-${seed}`,
      strategySubjectIdentity: subjectIdentity,
    },
  }
}

function defaultDimensionPolicies(
  alignment: ReturnType<typeof buildSingleStrategyTwoCaseMetricAlignment>,
): P3R11DimensionPolicy[] {
  return alignment.dimensionAlignments.map((entry) => {
    const booleanMetric = entry.dimension === "no-gold-abstention"
    return {
      dimension: entry.dimension,
      metricId: entry.metricId,
      unit: entry.unit,
      valueKind: booleanMetric ? "BOOLEAN" : "NUMBER",
      reducer: booleanMetric ? "BOOLEAN_TRUE_RATE" : "ARITHMETIC_MEAN",
      missingnessPolicy: "OBSERVED_ONLY_WITH_COVERAGE",
      minimumObservedCount: 1,
    }
  })
}

function makeScenario(strategyId: string, options: ScenarioOptions = {}): Scenario {
  const strategy = strategyDeclaration(strategyId)
  const subject = buildContextStrategySubject(strategy)
  const caseA = caseInputs(1, strategy, subject.strategySubjectIdentity, options.measurementA)
  const caseB = caseInputs(2, strategy, subject.strategySubjectIdentity, options.measurementB)
  const manifestA = caseA.manifest[0]
  const manifestB = caseB.manifest[0]
  const compositionDeclaration = {
    version: P3_R9_COMPOSITION_DECLARATION_VERSION,
    kind: P3_R9_COMPOSITION_DECLARATION_KIND,
    compositionId: `composition:${strategyId}`,
    strategySubjectIdentity: subject.strategySubjectIdentity,
    memberA: { memberId: "member:a", caseId: manifestA.case_id, r1ResultIdentity: manifestA.result_identity },
    memberB: { memberId: "member:b", caseId: manifestB.case_id, r1ResultIdentity: manifestB.result_identity },
  }
  const composition = composeSingleStrategyTwoCaseReports(strategy, compositionDeclaration, caseA, caseB)
  const alignmentDeclaration = {
    version: P3_R10_ALIGNMENT_DECLARATION_VERSION,
    kind: P3_R10_ALIGNMENT_DECLARATION_KIND,
    alignmentId: `alignment:${strategyId}`,
    compositionEvidenceIdentity: composition.compositionEvidenceIdentity,
    strategySubjectIdentity: composition.strategySubjectIdentity,
  }
  const alignment = buildSingleStrategyTwoCaseMetricAlignment(
    strategy,
    compositionDeclaration,
    alignmentDeclaration,
    caseA,
    caseB,
  )
  const policyDeclaration = {
    version: P3_R11_POLICY_DECLARATION_VERSION,
    kind: P3_R11_POLICY_DECLARATION_KIND,
    policyBindingId: `policy-binding:${strategyId}`,
    alignmentEvidenceIdentity: alignment.alignmentEvidenceIdentity,
    strategySubjectIdentity: alignment.strategySubjectIdentity,
    benchmarkId: manifestA.benchmark_id,
    benchmarkProtocolVersion: manifestA.benchmark_protocol_version,
    dimensionPolicies: defaultDimensionPolicies(alignment),
  }
  const policyBinding = buildSingleStrategyTwoCaseReductionPolicyBinding(
    strategy,
    compositionDeclaration,
    alignmentDeclaration,
    policyDeclaration,
    caseA,
    caseB,
  )
  const reductionDeclaration = {
    version: P3_R12_REDUCTION_DECLARATION_VERSION,
    kind: P3_R12_REDUCTION_DECLARATION_KIND,
    reductionId: `reduction:${strategyId}`,
    policyBindingEvidenceIdentity: policyBinding.policyBindingEvidenceIdentity,
    strategySubjectIdentity: policyBinding.strategySubjectIdentity,
    benchmarkId: policyBinding.benchmarkId,
    benchmarkProtocolVersion: policyBinding.benchmarkProtocolVersion,
  }
  const reduction = buildSingleStrategyTwoCaseReductionEvidence(
    strategy,
    compositionDeclaration,
    alignmentDeclaration,
    policyDeclaration,
    reductionDeclaration,
    caseA,
    caseB,
  )
  const directionDeclaration = {
    version: P3_R13_DIRECTION_DECLARATION_VERSION,
    kind: P3_R13_DIRECTION_DECLARATION_KIND,
    directionBindingId: `direction-binding:${strategyId}`,
    reductionEvidenceIdentity: reduction.reductionEvidenceIdentity,
    strategySubjectIdentity: reduction.strategySubjectIdentity,
    benchmarkId: reduction.benchmarkId,
    benchmarkProtocolVersion: reduction.benchmarkProtocolVersion,
    dimensionDirections: reduction.dimensionReductions.map((entry, index) => ({
      dimension: entry.dimension,
      metricId: entry.metricId,
      inputUnit: entry.inputUnit,
      outputUnit: entry.outputUnit,
      valueKind: entry.valueKind,
      reducer: entry.reducer,
      missingnessPolicy: entry.missingnessPolicy,
      minimumObservedCount: entry.minimumObservedCount,
      direction: options.directionForIndex?.(index) ?? "HIGHER_IS_BETTER",
    })),
  }
  const bundle = {
    strategyDeclaration: strategy,
    compositionDeclaration,
    alignmentDeclaration,
    policyDeclaration,
    reductionDeclaration,
    directionDeclaration,
    caseAInputs: caseA,
    caseBInputs: caseB,
  }
  return {
    strategy,
    compositionDeclaration,
    alignmentDeclaration,
    policyDeclaration,
    reductionDeclaration,
    directionDeclaration,
    caseA,
    caseB,
    bundle,
  }
}

function reconstructR13(value: Scenario) {
  return buildReductionDirectionBindingEvidence(
    value.strategy,
    value.compositionDeclaration,
    value.alignmentDeclaration,
    value.policyDeclaration,
    value.reductionDeclaration,
    value.directionDeclaration,
    value.caseA,
    value.caseB,
  )
}

function controlledPair(
  leftOptions: ScenarioOptions = { measurementA: { utilizedCount: 1 }, measurementB: { utilizedCount: 1, noGold: true } },
  rightOptions: ScenarioOptions = { measurementA: { utilizedCount: 2 }, measurementB: { utilizedCount: 2, noGold: true } },
) {
  const left = makeScenario("strategy:p3-r16-left", leftOptions)
  const right = makeScenario("strategy:p3-r16-right", rightOptions)
  const leftR13 = reconstructR13(left)
  const rightR13 = reconstructR13(right)
  const declaration = {
    version: P3_R14_COMPARISON_DECLARATION_VERSION,
    kind: P3_R14_COMPARISON_DECLARATION_KIND,
    comparisonId: "comparison:p3-r16-fixture",
    leftDirectionBindingEvidenceIdentity: leftR13.directionBindingEvidenceIdentity,
    rightDirectionBindingEvidenceIdentity: rightR13.directionBindingEvidenceIdentity,
    leftStrategySubjectIdentity: leftR13.strategySubjectIdentity,
    rightStrategySubjectIdentity: rightR13.strategySubjectIdentity,
    benchmarkId: leftR13.benchmarkId,
    benchmarkProtocolVersion: leftR13.benchmarkProtocolVersion,
  }
  return { left, right, declaration }
}

function trustedR15(pair = controlledPair()) {
  return buildStrategyReductionDirectionalRelationEvidence(
    pair.left.bundle,
    pair.right.bundle,
    pair.declaration,
  )
}

function relationCriteria(
  pair = controlledPair(),
  allowed: readonly P3R16AllowedRelation[] = [...P3_R16_ALLOWED_RELATIONS],
): P3R16CriterionDeclaration {
  const trusted = trustedR15(pair)
  return {
    version: P3_R16_CRITERION_DECLARATION_VERSION,
    kind: P3_R16_CRITERION_DECLARATION_KIND,
    criterionSetId: "criteria:p3-r16-fixture",
    criterionPolicyIdentity: POLICY_IDENTITY,
    dimensionCriteria: trusted.dimensionRelations.map((entry) => ({
      dimension: entry.dimension,
      metricId: entry.metricId,
      allowedRelations: [...allowed],
    })),
  }
}

function execute(
  pair = controlledPair(),
  criterionDeclaration: unknown = relationCriteria(pair),
) {
  return buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence(
    pair.left.bundle,
    pair.right.bundle,
    pair.declaration,
    criterionDeclaration,
  )
}

function assertDeepFrozen(value: unknown, seen = new WeakSet<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return
  seen.add(value)
  assert.equal(Object.isFrozen(value), true)
  for (const nested of Object.values(value as Record<string, unknown>)) assertDeepFrozen(nested, seen)
}

function reordered<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(Object.entries(value).reverse()) as T
}

function rootAndCriterionKeys(output: ReturnType<typeof execute>): Set<string> {
  const keys = new Set(Object.keys(output))
  for (const key of Object.keys(output.criterionDeclaration)) keys.add(key)
  for (const entry of output.dimensionCriterionResults) {
    for (const key of Object.keys(entry)) keys.add(key)
  }
  return keys
}

const ROOT_KEYS = [
  "version",
  "kind",
  "criterionMatchEvidenceIdentity",
  "criterionSetId",
  "criterionPolicyIdentity",
  "directionalRelationEvidenceIdentity",
  "comparisonId",
  "leftStrategySubjectIdentity",
  "rightStrategySubjectIdentity",
  "benchmarkId",
  "benchmarkProtocolVersion",
  "criterionDeclaration",
  "directionalRelationEvidence",
  "dimensionCriterionResults",
  "criterionMatchEvidenceState",
].sort()

const RESULT_KEYS = [
  "dimension",
  "metricId",
  "observedRelation",
  "allowedRelations",
  "criterionState",
].sort()

const DECLARATION_KEYS = [
  "version",
  "kind",
  "criterionSetId",
  "criterionPolicyIdentity",
  "dimensionCriteria",
].sort()

test("P3-R16 exposes the closed declaration/evidence literals and exact public arity", () => {
  assert.equal(buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence.length, 4)
  assert.equal(P3_R16_CRITERION_DECLARATION_VERSION, "p3-r16-declared-directional-relation-criterion-declaration-v1")
  assert.equal(P3_R16_CRITERION_DECLARATION_KIND, "declare_strategy_directional_relation_criteria")
  assert.equal(P3_R16_CRITERION_MATCH_EVIDENCE_VERSION, "p3-r16-declared-directional-relation-criterion-match-evidence-v1")
  assert.equal(P3_R16_CRITERION_MATCH_EVIDENCE_KIND, "declared_strategy_directional_relation_criterion_match_evidence")
  assert.deepEqual(P3_R16_ALLOWED_RELATIONS, [
    "EQUAL_RAW_VALUE",
    "LEFT_FAVORED_BY_DIRECTION",
    "RIGHT_FAVORED_BY_DIRECTION",
  ])
  assert.ok(Object.isFrozen(P3_R16_ALLOWED_RELATIONS))
})

test("P3-R16 rejects wrong arity before predecessor invocation or caller-root semantic reads", () => {
  let getterCalls = 0
  const hostile = Object.defineProperty({}, "value", {
    enumerable: true,
    get() {
      getterCalls += 1
      throw new Error("caller root was read")
    },
  })
  const invoke = buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence as unknown as (...values: unknown[]) => unknown
  assert.throws(() => invoke(hostile, hostile, hostile), /requires exactly four arguments/)
  assert.equal(getterCalls, 0)
  assert.throws(() => invoke(hostile, hostile, hostile, hostile, hostile), /requires exactly four arguments/)
  assert.equal(getterCalls, 0)
})

test("P3-R16 delegates the first three roots to canonical R15 and preserves complete trusted R15 evidence", () => {
  const pair = controlledPair()
  const expected = trustedR15(pair)
  const output = execute(pair)
  assert.deepEqual(output.directionalRelationEvidence, expected)
  assert.equal(output.directionalRelationEvidenceIdentity, expected.directionalRelationEvidenceIdentity)
  assert.equal(output.comparisonId, expected.comparisonId)
  assert.equal(output.leftStrategySubjectIdentity, expected.leftStrategySubjectIdentity)
  assert.equal(output.rightStrategySubjectIdentity, expected.rightStrategySubjectIdentity)
  assert.equal(output.benchmarkId, expected.benchmarkId)
  assert.equal(output.benchmarkProtocolVersion, expected.benchmarkProtocolVersion)
  assert.deepEqual(Object.keys(output).sort(), ROOT_KEYS)
  assert.deepEqual(Object.keys(output.criterionDeclaration).sort(), DECLARATION_KEYS)
  assert.equal(output.dimensionCriterionResults.length, 7)
  for (const result of output.dimensionCriterionResults) assert.deepEqual(Object.keys(result).sort(), RESULT_KEYS)
})

test("P3-R16 propagates canonical predecessor failures and rejects caller shortcut injection", () => {
  const pair = controlledPair()
  const hostile = { ...pair.left.bundle } as Record<string, unknown>
  let getterCalls = 0
  Object.defineProperty(hostile, "strategyDeclaration", {
    enumerable: true,
    get: () => {
      getterCalls += 1
      return pair.left.strategy
    },
  })
  assert.throws(
    () => buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence(
      hostile,
      pair.right.bundle,
      pair.declaration,
      relationCriteria(pair),
    ),
    /P3-R14 contract violation/,
  )
  assert.equal(getterCalls, 0)

  const injected = clone(pair.left.bundle) as unknown as Record<string, unknown>
  injected.directionalRelationEvidence = trustedR15(pair)
  assert.throws(
    () => buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence(
      injected,
      pair.right.bundle,
      pair.declaration,
      relationCriteria(pair),
    ),
    /P3-R14 contract violation/,
  )
})

test("P3-R16 all-satisfied state requires all seven trusted observed relations to satisfy caller criteria", () => {
  const pair = controlledPair()
  const output = execute(pair, relationCriteria(pair, [...P3_R16_ALLOWED_RELATIONS]))
  assert.equal(output.criterionMatchEvidenceState, "ALL_DECLARED_RELATION_CRITERIA_SATISFIED")
  assert.deepEqual(output.dimensionCriterionResults.map((entry) => entry.criterionState), Array(7).fill("SATISFIED"))
  assert.deepEqual(output.dimensionCriterionResults.map((entry) => entry.dimension), P3_R6_DIMENSIONS)
})

test("P3-R16 not-satisfied state is derived from trusted R15 relation membership without score or majority logic", () => {
  const pair = controlledPair()
  const trusted = trustedR15(pair)
  const nonEqual = trusted.dimensionRelations.find((entry) => entry.relation !== "EQUAL_RAW_VALUE" && entry.relation !== "INSUFFICIENT_EVIDENCE")
  assert.ok(nonEqual, "fixture must expose at least one favored comparable relation")
  const output = execute(pair, relationCriteria(pair, ["EQUAL_RAW_VALUE"]))
  assert.equal(output.criterionMatchEvidenceState, "ONE_OR_MORE_DECLARED_RELATION_CRITERIA_NOT_SATISFIED")
  const result = output.dimensionCriterionResults.find((entry) => entry.dimension === nonEqual.dimension)
  assert.equal(result?.criterionState, "NOT_SATISFIED")
})

test("P3-R16 insufficiency has root precedence over not-satisfied results", () => {
  const pair = controlledPair(
    { measurementA: { utilizedCount: 0 }, measurementB: { utilizedCount: 0 } },
    { measurementA: { utilizedCount: 2 }, measurementB: { utilizedCount: 2 } },
  )
  const output = execute(pair, relationCriteria(pair, ["EQUAL_RAW_VALUE"]))
  assert.ok(output.dimensionCriterionResults.some((entry) => entry.criterionState === "INSUFFICIENT_EVIDENCE"))
  assert.equal(output.criterionMatchEvidenceState, "INSUFFICIENT_DIRECTIONAL_EVIDENCE")
})

test("P3-R16 validates exact declaration root/nested keys and canonical dimension plus metric bindings", () => {
  const pair = controlledPair()
  const base = relationCriteria(pair)
  assert.throws(() => execute(pair, { ...clone(base), extra: true }), /keys drifted/)

  const nestedExtra = clone(base) as unknown as Record<string, unknown>
  ;((nestedExtra.dimensionCriteria as unknown[])[0] as Record<string, unknown>).extra = true
  assert.throws(() => execute(pair, nestedExtra), /keys drifted/)

  const swapped = clone(base) as unknown as Record<string, unknown>
  const swappedCriteria = swapped.dimensionCriteria as unknown[]
  const firstCriterion = swappedCriteria[0]
  swappedCriteria[0] = swappedCriteria[1]
  swappedCriteria[1] = firstCriterion
  assert.throws(() => execute(pair, swapped), /dimension does not match/)

  const wrongMetric = clone(base)
  ;(wrongMetric.dimensionCriteria[0] as { metricId: string }).metricId = "metric:wrong"
  assert.throws(() => execute(pair, wrongMetric), /metricId does not match/)

  const tooShort = { ...clone(base), dimensionCriteria: clone(base.dimensionCriteria).slice(0, 6) }
  assert.throws(() => execute(pair, tooShort), /must contain exactly 7 entries/)
})

test("P3-R16 validates criterionSetId stable-id grammar and exact 512 UTF-8 byte bound", () => {
  const pair = controlledPair()
  const base = relationCriteria(pair)
  for (const invalid of ["", " padded", "padded ", "nul\0id", "bad id", "a".repeat(513)]) {
    assert.throws(() => execute(pair, { ...clone(base), criterionSetId: invalid }), /criterionSetId/)
  }
  const exact = execute(pair, { ...clone(base), criterionSetId: "a".repeat(512) })
  assert.equal(exact.criterionSetId.length, 512)
})

test("P3-R16 validates exact lowercase sha256 criterionPolicyIdentity", () => {
  const pair = controlledPair()
  const base = relationCriteria(pair)
  for (const invalid of ["sha256:abc", `SHA256:${"a".repeat(64)}`, `sha256:${"A".repeat(64)}`, "a".repeat(64)]) {
    assert.throws(() => execute(pair, { ...clone(base), criterionPolicyIdentity: invalid }), /criterionPolicyIdentity/)
  }
})

test("P3-R16 accepts closed non-empty ordered relation subsets and rejects empty, duplicate, unsupported, insufficient, or unsorted sets", () => {
  const pair = controlledPair()
  const base = relationCriteria(pair)
  for (const allowed of [
    [] as unknown[],
    ["EQUAL_RAW_VALUE", "EQUAL_RAW_VALUE"],
    ["UNSUPPORTED"],
    ["INSUFFICIENT_EVIDENCE"],
    ["RIGHT_FAVORED_BY_DIRECTION", "EQUAL_RAW_VALUE"],
  ]) {
    const mutated = clone(base) as unknown as Record<string, unknown>
    ;((mutated.dimensionCriteria as unknown[])[0] as Record<string, unknown>).allowedRelations = allowed
    assert.throws(() => execute(pair, mutated), /allowedRelations/)
  }
  for (const allowed of [
    ["EQUAL_RAW_VALUE"],
    ["LEFT_FAVORED_BY_DIRECTION"],
    ["RIGHT_FAVORED_BY_DIRECTION"],
    ["EQUAL_RAW_VALUE", "LEFT_FAVORED_BY_DIRECTION"],
    [...P3_R16_ALLOWED_RELATIONS],
  ] as readonly (readonly P3R16AllowedRelation[])[]) {
    const declaration = relationCriteria(pair, allowed)
    assert.doesNotThrow(() => execute(pair, declaration))
  }
})

test("P3-R16 hardens only the fourth root through canonical JSON and rejects accessors, symbols, sparse arrays, and cycles", () => {
  const pair = controlledPair()
  const base = clone(relationCriteria(pair)) as unknown as Record<string, unknown>

  const accessor = { ...base }
  Object.defineProperty(accessor, "criterionSetId", { enumerable: true, get: () => "criteria:bad" })
  assert.throws(() => execute(pair, accessor), /not canonical JSON/)

  const symbolValue = { ...base, [Symbol("bad")]: true }
  assert.throws(() => execute(pair, symbolValue), /not canonical JSON/)

  const sparse = clone(base) as unknown as Record<string, unknown>
  const sparseArray = (sparse.dimensionCriteria as unknown[]).slice()
  delete sparseArray[0]
  sparse.dimensionCriteria = sparseArray
  assert.throws(() => execute(pair, sparse), /not canonical JSON/)

  const cyclic = clone(base) as unknown as Record<string, unknown>
  cyclic.self = cyclic
  assert.throws(() => execute(pair, cyclic), /not canonical JSON/)
})

test("P3-R16 identity is deterministic, self-reference-free, insertion-order neutral, and sensitive to declaration and R15 changes", () => {
  const pair = controlledPair()
  const declaration = relationCriteria(pair)
  const normal = execute(pair, declaration)
  const reorderedDeclaration = reordered(clone(declaration) as unknown as Record<string, unknown>)
  reorderedDeclaration.dimensionCriteria = (reorderedDeclaration.dimensionCriteria as Record<string, unknown>[]).map((entry) => reordered(entry))
  const same = execute(pair, reorderedDeclaration)
  assert.equal(same.criterionMatchEvidenceIdentity, normal.criterionMatchEvidenceIdentity)

  const changedSet = execute(pair, { ...clone(declaration), criterionSetId: "criteria:p3-r16-fixture:changed" })
  assert.notEqual(changedSet.criterionMatchEvidenceIdentity, normal.criterionMatchEvidenceIdentity)
  const changedPolicy = execute(pair, { ...clone(declaration), criterionPolicyIdentity: `sha256:${"b".repeat(64)}` })
  assert.notEqual(changedPolicy.criterionMatchEvidenceIdentity, normal.criterionMatchEvidenceIdentity)

  const changedPair = controlledPair(
    { measurementA: { utilizedCount: 1 }, measurementB: { utilizedCount: 1 } },
    { measurementA: { utilizedCount: 3 }, measurementB: { utilizedCount: 3 } },
  )
  const changedR15 = execute(changedPair, relationCriteria(changedPair))
  assert.notEqual(changedR15.directionalRelationEvidenceIdentity, normal.directionalRelationEvidenceIdentity)
  assert.notEqual(changedR15.criterionMatchEvidenceIdentity, normal.criterionMatchEvidenceIdentity)

  const projection = { ...normal } as Record<string, unknown>
  delete projection.criterionMatchEvidenceIdentity
  assert.equal(sha256Canonical(projection), normal.criterionMatchEvidenceIdentity)
})

test("P3-R16 output is detached and deeply frozen including declaration, trusted R15, result arrays, and nested children", () => {
  const pair = controlledPair()
  const declaration = clone(relationCriteria(pair))
  const output = execute(pair, declaration)
  const identity = output.criterionMatchEvidenceIdentity
  assertDeepFrozen(output)
  ;(declaration as { criterionSetId: string }).criterionSetId = "criteria:mutated"
  ;(declaration.dimensionCriteria[0] as unknown as { allowedRelations: string[] }).allowedRelations.push("RIGHT_FAVORED_BY_DIRECTION")
  ;(pair.declaration as Record<string, unknown>).comparisonId = "comparison:mutated"
  assert.equal(output.criterionMatchEvidenceIdentity, identity)
  assert.equal(output.criterionSetId, "criteria:p3-r16-fixture")
})

test("P3-R16 adds no aggregate, weighting, majority, Pareto, statistics, promotion, execution, persistence, product, release, R17+, or completion surface", () => {
  const keys = rootAndCriterionKeys(execute())
  const compact = [...keys].map((key) => key.toLowerCase().replaceAll("_", ""))
  for (const forbidden of [
    "aggregate", "score", "weight", "majority", "pareto", "dominance", "rank", "leaderboard",
    "promotion", "winner", "default", "confidence", "pvalue", "significance", "effectsize",
    "execute", "telemetry", "persistence", "product", "release", "r17", "completion",
  ]) {
    assert.equal(compact.some((key) => key.includes(forbidden)), false, forbidden)
  }
})

test("P3-R16 rejects frozen identity-rebound malformed R15 vocabulary, topology, and own-property drift before criterion state derivation", async () => {
  const pair = controlledPair()
  const canonical = trustedR15(pair)
  const globalKey = "__kodacP3R16MalformedTrustedR15"
  const marker = "p3-r16-malformed-r15"

  function deepFreezeForTest(value: unknown, seen = new WeakSet<object>()): void {
    if (value === null || typeof value !== "object" || seen.has(value)) return
    seen.add(value)
    for (const key of Reflect.ownKeys(value)) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key)
      if (descriptor && "value" in descriptor) deepFreezeForTest(descriptor.value, seen)
    }
    Object.freeze(value)
  }

  function rebindIdentity(value: Record<string, unknown>): void {
    const projection = { ...value }
    delete projection.directionalRelationEvidenceIdentity
    value.directionalRelationEvidenceIdentity = sha256Canonical(projection)
  }

  function forged(mutate: (root: Record<string, unknown>, entry: Record<string, unknown>) => void): unknown {
    const value = clone(canonical) as unknown as Record<string, unknown>
    const dimensionRelations = value.dimensionRelations as Record<string, unknown>[]
    mutate(value, dimensionRelations[0]!)
    rebindIdentity(value)
    deepFreezeForTest(value)
    return value
  }

  function forgedOwnProperty(
    target: "root" | "relation",
    define: (value: Record<string | symbol, unknown>) => void,
  ): unknown {
    const value = clone(canonical) as unknown as Record<string, unknown>
    rebindIdentity(value)
    const dimensionRelations = value.dimensionRelations as Record<string, unknown>[]
    define((target === "root" ? value : dimensionRelations[0]!) as Record<string | symbol, unknown>)
    deepFreezeForTest(value)
    return value
  }

  const globalRecord = globalThis as unknown as Record<string, unknown>
  const moduleApi = await import("node:module")
  const hook = moduleApi.registerHooks({
    resolve(specifier, context, nextResolve) {
      if (
        specifier === "../p3-r15/strategy-reduction-directional-relation.ts" &&
        context.parentURL?.includes(`${marker}=`)
      ) {
        const source = `export function buildStrategyReductionDirectionalRelationEvidence() { return globalThis.${globalKey} }`
        return {
          url: `data:text/javascript,${encodeURIComponent(source)}`,
          shortCircuit: true,
        }
      }
      return nextResolve(specifier, context)
    },
  })

  try {
    const moduleUrl = new URL("../bench/p3-r16/declared-directional-relation-criterion-match.ts", import.meta.url)
    moduleUrl.searchParams.set(marker, "1")
    const isolated = await import(moduleUrl.href)
    const build = isolated.buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence
    const cases: Array<{ readonly value: unknown; readonly error: RegExp }> = [
      {
        value: forged((_root, entry) => { entry.relation = "UNSUPPORTED_RELATION" }),
        error: /canonical P3-R15 vocabulary/,
      },
      {
        value: forged((_root, entry) => { entry.dimension = "wrong-dimension" }),
        error: /canonical P3-R6 topology/,
      },
      {
        value: forged((_root, entry) => { entry.metricId = "metric:wrong" }),
        error: /trusted nested P3-R14 comparison/,
      },
      {
        value: forgedOwnProperty("root", (root) => {
          Object.defineProperty(root, Symbol("extra-root"), { value: true, enumerable: true })
        }),
        error: /keys drifted/,
      },
      {
        value: forgedOwnProperty("root", (root) => {
          Object.defineProperty(root, "hiddenRootExtra", { value: true, enumerable: false })
        }),
        error: /keys drifted/,
      },
      {
        value: forgedOwnProperty("relation", (entry) => {
          Object.defineProperty(entry, Symbol("extra-relation"), { value: true, enumerable: true })
        }),
        error: /keys drifted/,
      },
      {
        value: forgedOwnProperty("relation", (entry) => {
          Object.defineProperty(entry, "hiddenRelationExtra", { value: true, enumerable: false })
        }),
        error: /keys drifted/,
      },
      {
        value: forgedOwnProperty("root", (root) => {
          const comparisonId = root.comparisonId
          Object.defineProperty(root, "comparisonId", { enumerable: true, get: () => comparisonId })
        }),
        error: /enumerable own data property/,
      },
      {
        value: forgedOwnProperty("relation", (entry) => {
          const metric = entry.metricId
          Object.defineProperty(entry, "metricId", { enumerable: true, get: () => metric })
        }),
        error: /enumerable own data property/,
      },
    ]

    for (const malformed of cases) {
      globalRecord[globalKey] = malformed.value
      assert.throws(
        () => build(
          pair.left.bundle,
          pair.right.bundle,
          pair.declaration,
          relationCriteria(pair),
        ),
        malformed.error,
      )
    }
  } finally {
    hook.deregister()
    delete globalRecord[globalKey]
  }
})