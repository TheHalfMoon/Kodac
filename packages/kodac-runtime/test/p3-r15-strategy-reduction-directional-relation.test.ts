import assert from "node:assert/strict"
import { createRequire, syncBuiltinESMExports } from "node:module"
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
import { buildStrategyReductionPairwiseComparisonEvidence } from "../bench/p3-r14/strategy-reduction-pairwise-comparison.ts"
import {
  P3_R15_DIRECTIONAL_RELATION_EVIDENCE_KIND,
  P3_R15_DIRECTIONAL_RELATION_EVIDENCE_VERSION,
} from "../bench/p3-r15/contracts.ts"
import { buildStrategyReductionDirectionalRelationEvidence } from "../bench/p3-r15/strategy-reduction-directional-relation.ts"
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

const BENCHMARK_ID = "kodac-p3-r15-fixture"
const BENCHMARK_PROTOCOL_VERSION = "v1"

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
    taskIdentity: `task:p3-r15-case-${seed}`,
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
    corpus_id: `p3-r15-development-${seed}`,
    corpus_role: "development",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 1 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r15-development-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [{
      case_id: `p3-r15-case-${seed}`,
      task_family: "context-selection",
      payload: { purpose: `directional-relation-${seed}` },
    }],
  } as const
}

function holdout(seed: number) {
  return {
    schema_version: "p2-r1-fixture/v1",
    corpus_id: `p3-r15-holdout-${seed}`,
    corpus_role: "holdout",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 2 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r15-holdout-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [{
      case_id: `p3-r15-holdout-case-${seed}`,
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
  const composition = composeSingleStrategyTwoCaseReports(
    strategy,
    compositionDeclaration,
    caseA,
    caseB,
  )
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
  leftOptions: ScenarioOptions = {
    measurementA: { utilizedCount: 1 },
    measurementB: { utilizedCount: 1 },
  },
  rightOptions: ScenarioOptions = {
    measurementA: { utilizedCount: 2 },
    measurementB: { utilizedCount: 2 },
  },
) {
  const left = makeScenario("strategy:p3-r15-left", leftOptions)
  const right = makeScenario("strategy:p3-r15-right", rightOptions)
  const leftR13 = reconstructR13(left)
  const rightR13 = reconstructR13(right)
  const declaration = {
    version: P3_R14_COMPARISON_DECLARATION_VERSION,
    kind: P3_R14_COMPARISON_DECLARATION_KIND,
    comparisonId: "comparison:p3-r15-fixture",
    leftDirectionBindingEvidenceIdentity: leftR13.directionBindingEvidenceIdentity,
    rightDirectionBindingEvidenceIdentity: rightR13.directionBindingEvidenceIdentity,
    leftStrategySubjectIdentity: leftR13.strategySubjectIdentity,
    rightStrategySubjectIdentity: rightR13.strategySubjectIdentity,
    benchmarkId: leftR13.benchmarkId,
    benchmarkProtocolVersion: leftR13.benchmarkProtocolVersion,
  }
  return { left, right, leftR13, rightR13, declaration }
}

function execute(value = controlledPair()) {
  return buildStrategyReductionDirectionalRelationEvidence(
    value.left.bundle,
    value.right.bundle,
    value.declaration,
  )
}

function assertDeepFrozen(value: unknown, seen = new WeakSet<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return
  seen.add(value)
  assert.equal(Object.isFrozen(value), true)
  for (const nested of Object.values(value as Record<string, unknown>)) assertDeepFrozen(nested, seen)
}

function collectKeys(value: unknown, output = new Set<string>()): Set<string> {
  if (value === null || typeof value !== "object") return output
  if (Array.isArray(value)) {
    for (const nested of value) collectKeys(nested, output)
    return output
  }
  for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
    output.add(key)
    collectKeys(nested, output)
  }
  return output
}

function reordered<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(Object.entries(value).reverse()) as T
}

const ROOT_KEYS = [
  "version",
  "kind",
  "directionalRelationEvidenceIdentity",
  "pairwiseComparisonEvidenceIdentity",
  "comparisonId",
  "leftStrategySubjectIdentity",
  "rightStrategySubjectIdentity",
  "benchmarkId",
  "benchmarkProtocolVersion",
  "pairwiseComparisonEvidence",
  "dimensionRelations",
].sort()

const RELATION_KEYS = [
  "dimension",
  "metricId",
  "inputUnit",
  "outputUnit",
  "valueKind",
  "reducer",
  "missingnessPolicy",
  "minimumObservedCount",
  "expectedCount",
  "direction",
  "leftStatus",
  "rightStatus",
  "comparisonStatus",
  "leftReducedValue",
  "rightReducedValue",
  "rawDeltaLeftMinusRight",
  "relation",
].sort()

test("P3-R15 preserves complete trusted R14 evidence and appends exactly one relation per canonical dimension", () => {
  const pair = controlledPair()
  const output = execute(pair)
  const expectedR14 = buildStrategyReductionPairwiseComparisonEvidence(
    clone(pair.left.bundle),
    clone(pair.right.bundle),
    clone(pair.declaration),
  )

  assert.equal(output.version, P3_R15_DIRECTIONAL_RELATION_EVIDENCE_VERSION)
  assert.equal(output.kind, P3_R15_DIRECTIONAL_RELATION_EVIDENCE_KIND)
  assert.match(output.directionalRelationEvidenceIdentity, /^sha256:[0-9a-f]{64}$/)
  assert.equal(output.pairwiseComparisonEvidenceIdentity, expectedR14.comparisonEvidenceIdentity)
  assert.deepEqual(output.pairwiseComparisonEvidence, expectedR14)
  assert.equal(output.dimensionRelations.length, 7)
  assert.deepEqual(output.dimensionRelations.map((entry) => entry.dimension), P3_R6_DIMENSIONS)
  assert.deepEqual(Object.keys(output).sort(), ROOT_KEYS)

  for (let index = 0; index < output.dimensionRelations.length; index += 1) {
    const relation = output.dimensionRelations[index]!
    const comparison = output.pairwiseComparisonEvidence.dimensionComparisons[index]!
    assert.deepEqual(Object.keys(relation).sort(), RELATION_KEYS)
    const { relation: _relation, ...copied } = relation
    assert.deepEqual(copied, comparison)
  }
})

test("P3-R15 public builder requires exactly three roots before predecessor reconstruction", () => {
  const pair = controlledPair()
  const builder = buildStrategyReductionDirectionalRelationEvidence as (...args: unknown[]) => unknown
  assert.equal(buildStrategyReductionDirectionalRelationEvidence.length, 3)
  assert.throws(
    () => builder(pair.left.bundle, pair.right.bundle),
    /requires exactly three arguments/,
  )
  assert.throws(
    () => builder(pair.left.bundle, pair.right.bundle, pair.declaration, null),
    /requires exactly three arguments/,
  )
})

test("P3-R15 derives directional favored relations from trusted values and direction without aggregation", () => {
  const higherPair = controlledPair()
  const higher = execute(higherPair)
  const comparableNonzero = higher.dimensionRelations.find(
    (entry) => entry.comparisonStatus === "COMPARABLE" && entry.leftReducedValue !== entry.rightReducedValue,
  )
  assert.ok(comparableNonzero, "fixture must expose at least one nonzero comparable dimension")
  assert.equal(comparableNonzero.direction, "HIGHER_IS_BETTER")
  assert.equal(
    comparableNonzero.relation,
    comparableNonzero.leftReducedValue! > comparableNonzero.rightReducedValue!
      ? "LEFT_FAVORED_BY_DIRECTION"
      : "RIGHT_FAVORED_BY_DIRECTION",
  )

  const reverseDeclaration = {
    ...higherPair.declaration,
    comparisonId: "comparison:p3-r15-reversed",
    leftDirectionBindingEvidenceIdentity: higherPair.rightR13.directionBindingEvidenceIdentity,
    rightDirectionBindingEvidenceIdentity: higherPair.leftR13.directionBindingEvidenceIdentity,
    leftStrategySubjectIdentity: higherPair.rightR13.strategySubjectIdentity,
    rightStrategySubjectIdentity: higherPair.leftR13.strategySubjectIdentity,
  }
  const reversed = buildStrategyReductionDirectionalRelationEvidence(
    higherPair.right.bundle,
    higherPair.left.bundle,
    reverseDeclaration,
  )
  const reversedMatch = reversed.dimensionRelations.find(
    (entry) => entry.dimension === comparableNonzero.dimension,
  )!
  assert.equal(
    reversedMatch.relation,
    comparableNonzero.relation === "LEFT_FAVORED_BY_DIRECTION"
      ? "RIGHT_FAVORED_BY_DIRECTION"
      : "LEFT_FAVORED_BY_DIRECTION",
  )
  assert.notEqual(reversed.directionalRelationEvidenceIdentity, higher.directionalRelationEvidenceIdentity)

  const lowerPair = controlledPair(
    {
      measurementA: { utilizedCount: 1 },
      measurementB: { utilizedCount: 1 },
      directionForIndex: () => "LOWER_IS_BETTER",
    },
    {
      measurementA: { utilizedCount: 2 },
      measurementB: { utilizedCount: 2 },
      directionForIndex: () => "LOWER_IS_BETTER",
    },
  )
  const lower = execute(lowerPair)
  const lowerMatch = lower.dimensionRelations.find(
    (entry) => entry.dimension === comparableNonzero.dimension,
  )!
  assert.equal(lowerMatch.direction, "LOWER_IS_BETTER")
  assert.ok(lowerMatch.leftReducedValue! < lowerMatch.rightReducedValue!)
  assert.equal(lowerMatch.relation, "LEFT_FAVORED_BY_DIRECTION")

  const lowerReverseDeclaration = {
    ...lowerPair.declaration,
    comparisonId: "comparison:p3-r15-lower-reversed",
    leftDirectionBindingEvidenceIdentity: lowerPair.rightR13.directionBindingEvidenceIdentity,
    rightDirectionBindingEvidenceIdentity: lowerPair.leftR13.directionBindingEvidenceIdentity,
    leftStrategySubjectIdentity: lowerPair.rightR13.strategySubjectIdentity,
    rightStrategySubjectIdentity: lowerPair.leftR13.strategySubjectIdentity,
  }
  const lowerReversed = buildStrategyReductionDirectionalRelationEvidence(
    lowerPair.right.bundle,
    lowerPair.left.bundle,
    lowerReverseDeclaration,
  )
  const lowerReversedMatch = lowerReversed.dimensionRelations.find(
    (entry) => entry.dimension === lowerMatch.dimension,
  )!
  assert.equal(lowerReversedMatch.direction, "LOWER_IS_BETTER")
  assert.ok(lowerReversedMatch.rightReducedValue! < lowerReversedMatch.leftReducedValue!)
  assert.equal(lowerReversedMatch.relation, "RIGHT_FAVORED_BY_DIRECTION")
})

test("P3-R15 uses exact numeric equality only for EQUAL_RAW_VALUE", () => {
  const equalPair = controlledPair(
    { measurementA: { utilizedCount: 1 }, measurementB: { utilizedCount: 1 } },
    { measurementA: { utilizedCount: 1 }, measurementB: { utilizedCount: 1 } },
  )
  const output = execute(equalPair)
  const comparable = output.dimensionRelations.filter((entry) => entry.comparisonStatus === "COMPARABLE")
  assert.ok(comparable.length > 0)
  for (const entry of comparable) {
    assert.equal(entry.leftReducedValue, entry.rightReducedValue)
    assert.equal(entry.rawDeltaLeftMinusRight, 0)
    assert.equal(entry.relation, "EQUAL_RAW_VALUE")
  }
})

test("P3-R15 propagates trusted insufficiency without reinterpretation", () => {
  const pair = controlledPair(
    { measurementA: { utilizedCount: 0 }, measurementB: { utilizedCount: 0 } },
    { measurementA: { utilizedCount: 2 }, measurementB: { utilizedCount: 2 } },
  )
  const output = execute(pair)
  const insufficient = output.dimensionRelations.filter(
    (entry) => entry.comparisonStatus === "INSUFFICIENT_EVIDENCE",
  )
  assert.ok(insufficient.length > 0)
  for (const entry of insufficient) {
    assert.equal(entry.relation, "INSUFFICIENT_EVIDENCE")
    assert.equal(entry.leftReducedValue, null)
    assert.equal(entry.rightReducedValue, null)
    assert.equal(entry.rawDeltaLeftMinusRight, null)
    assert.ok(
      entry.leftStatus === "INSUFFICIENT_EVIDENCE" ||
      entry.rightStatus === "INSUFFICIENT_EVIDENCE",
    )
  }
})

test("P3-R15 delegates hostile roots to canonical R14 before semantic reads and rejects shortcut injection", () => {
  const accessorPair = controlledPair()
  const hostile = { ...accessorPair.left.bundle } as Record<string, unknown>
  let getterCalls = 0
  Object.defineProperty(hostile, "strategyDeclaration", {
    enumerable: true,
    get: () => {
      getterCalls += 1
      return accessorPair.left.strategy
    },
  })
  assert.throws(
    () => buildStrategyReductionDirectionalRelationEvidence(
      hostile,
      accessorPair.right.bundle,
      accessorPair.declaration,
    ),
    /P3-R14 contract violation/,
  )
  assert.equal(getterCalls, 0)

  const injectedPair = controlledPair()
  const injected = clone(injectedPair.left.bundle) as unknown as Record<string, unknown>
  injected.pairwiseComparisonEvidence = { relation: "LEFT_FAVORED_BY_DIRECTION" }
  assert.throws(
    () => buildStrategyReductionDirectionalRelationEvidence(
      injected,
      injectedPair.right.bundle,
      injectedPair.declaration,
    ),
    /P3-R14 contract violation/,
  )

  const unicodePair = controlledPair()
  const unicode = clone(unicodePair.left.bundle) as unknown as Record<string, unknown>
  ;(unicode.strategyDeclaration as Record<string, unknown>).strategyId = "bad\ud800"
  assert.throws(
    () => buildStrategyReductionDirectionalRelationEvidence(
      unicode,
      unicodePair.right.bundle,
      unicodePair.declaration,
    ),
    /P3-R14 contract violation/,
  )
})

test("P3-R15 canonicalization preserves property-order invariance and orientation-sensitive identity", () => {
  const pair = controlledPair()
  const normal = execute(pair)
  const same = buildStrategyReductionDirectionalRelationEvidence(
    reordered(clone(pair.left.bundle) as unknown as Record<string, unknown>),
    reordered(clone(pair.right.bundle) as unknown as Record<string, unknown>),
    reordered(clone(pair.declaration) as Record<string, unknown>),
  )
  assert.equal(same.directionalRelationEvidenceIdentity, normal.directionalRelationEvidenceIdentity)
})

test("P3-R15 output is detached, deeply frozen, deterministic, and self-reference-free", () => {
  const pair = controlledPair()
  const output = execute(pair)
  const identity = output.directionalRelationEvidenceIdentity
  assertDeepFrozen(output)

  ;(pair.left.bundle.caseAInputs as Record<string, unknown>).planRequest = { mutated: true }
  ;(pair.declaration as Record<string, unknown>).comparisonId = "comparison:mutated"
  assert.equal(output.directionalRelationEvidenceIdentity, identity)

  const projection = { ...output } as Record<string, unknown>
  delete projection.directionalRelationEvidenceIdentity
  assert.equal(sha256Canonical(projection), identity)
})

test("P3-R15 exposes no global aggregate, ranking, promotion, winner, statistical, or execution surface", () => {
  const keys = collectKeys(execute())
  for (const forbidden of [
    "aggregate",
    "mean",
    "weight",
    "majority",
    "pareto",
    "dominance",
    "rank",
    "leaderboard",
    "promotion",
    "winner",
    "default",
    "confidence",
    "pvalue",
    "significance",
    "effectsize",
    "execute",
    "provider",
    "model",
    "telemetry",
    "persistence",
  ]) {
    assert.equal([...keys].some((key) => key.toLowerCase().replaceAll("_", "").includes(forbidden)), false, forbidden)
  }
})

test("P3-R15 identity excludes ambient time, randomness, environment, network, filesystem writes, and subprocess execution", () => {
  const baseline = execute()
  const originalNow = Date.now
  const originalRandom = Math.random
  const originalFetch = globalThis.fetch
  const originalNoise = process.env.KODAC_P3_R15_AMBIENT_NOISE
  const require = createRequire(import.meta.url)
  const childProcess = require("node:child_process") as Record<string, unknown>
  const fs = require("node:fs") as Record<string, unknown>
  const targets: Array<{ module: Record<string, unknown>; key: string; label: string }> = [
    { module: childProcess, key: "exec", label: "child_process.exec" },
    { module: childProcess, key: "execFile", label: "child_process.execFile" },
    { module: childProcess, key: "execFileSync", label: "child_process.execFileSync" },
    { module: childProcess, key: "execSync", label: "child_process.execSync" },
    { module: childProcess, key: "fork", label: "child_process.fork" },
    { module: childProcess, key: "spawn", label: "child_process.spawn" },
    { module: childProcess, key: "spawnSync", label: "child_process.spawnSync" },
    { module: fs, key: "writeFile", label: "fs.writeFile" },
    { module: fs, key: "writeFileSync", label: "fs.writeFileSync" },
    { module: fs, key: "appendFile", label: "fs.appendFile" },
    { module: fs, key: "appendFileSync", label: "fs.appendFileSync" },
    { module: fs, key: "createWriteStream", label: "fs.createWriteStream" },
  ]
  const originals = targets.map((target) => ({
    ...target,
    descriptor: Object.getOwnPropertyDescriptor(target.module, target.key),
  }))
  for (const original of originals) assert.notEqual(original.descriptor, undefined, original.label)
  const counts = new Map(targets.map((target) => [target.label, 0]))
  let fetchCalls = 0
  const fetchDescriptor = Object.getOwnPropertyDescriptor(globalThis, "fetch")

  try {
    Date.now = () => 1
    Math.random = () => 0.999999
    process.env.KODAC_P3_R15_AMBIENT_NOISE = "changed"
    for (const original of originals) {
      Object.defineProperty(original.module, original.key, {
        ...original.descriptor!,
        value: (..._args: unknown[]) => {
          counts.set(original.label, (counts.get(original.label) ?? 0) + 1)
          throw new Error(`P3-R15 attempted forbidden ambient authority: ${original.label}`)
        },
      })
    }
    syncBuiltinESMExports()
    if (fetchDescriptor !== undefined) {
      Object.defineProperty(globalThis, "fetch", {
        ...fetchDescriptor,
        value: async () => {
          fetchCalls += 1
          throw new Error("P3-R15 attempted forbidden network authority")
        },
      })
    }

    const repeated = execute()
    assert.equal(repeated.directionalRelationEvidenceIdentity, baseline.directionalRelationEvidenceIdentity)
    assert.equal(fetchCalls, 0)
    for (const [label, count] of counts) assert.equal(count, 0, label)
  } finally {
    Date.now = originalNow
    Math.random = originalRandom
    if (originalNoise === undefined) delete process.env.KODAC_P3_R15_AMBIENT_NOISE
    else process.env.KODAC_P3_R15_AMBIENT_NOISE = originalNoise
    if (fetchDescriptor !== undefined) Object.defineProperty(globalThis, "fetch", fetchDescriptor)
    for (const original of [...originals].reverse()) {
      Object.defineProperty(original.module, original.key, original.descriptor!)
    }
    syncBuiltinESMExports()
  }
})