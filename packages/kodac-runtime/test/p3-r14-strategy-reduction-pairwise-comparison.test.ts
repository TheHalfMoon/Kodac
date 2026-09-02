import assert from "node:assert/strict"
import { createRequire } from "node:module"
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
  P3_R14_COMPARISON_EVIDENCE_KIND,
  P3_R14_COMPARISON_EVIDENCE_VERSION,
  type P3R14ReconstructionBundle,
} from "../bench/p3-r14/contracts.ts"
import { buildStrategyReductionPairwiseComparisonEvidence } from "../bench/p3-r14/strategy-reduction-pairwise-comparison.ts"
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

const BENCHMARK_ID = "kodac-p3-r14-fixture"
const BENCHMARK_PROTOCOL_VERSION = "v1"

type MetricSchema = {
  readonly prefix?: string
  readonly unitOverrides?: Partial<Record<P3R6Dimension, string>>
}

type RequestOptions = {
  readonly taskSuffix?: string
  readonly repositoryChar?: string
  readonly snapshotChar?: string
  readonly contentChar?: string
  readonly candidateCount?: number
}

type MeasurementOptions = {
  readonly noGold?: boolean
  readonly goldCount?: number
  readonly utilizedCount?: number
  readonly measurementSuffix?: string
}

type SideOptions = {
  readonly requestA?: RequestOptions
  readonly requestB?: RequestOptions
  readonly measurementA?: MeasurementOptions
  readonly measurementB?: MeasurementOptions
  readonly schema?: MetricSchema
  readonly minimumObservedCount?: number
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

function metricId(dimension: P3R6Dimension, schema: MetricSchema = {}): string {
  return `${schema.prefix ?? "metric"}:${dimension}`
}

function metricUnit(dimension: P3R6Dimension, schema: MetricSchema = {}): string {
  return schema.unitOverrides?.[dimension] ?? (dimension === "no-gold-abstention" ? "boolean" : "ratio")
}

function metricDefinitions(schema: MetricSchema = {}) {
  return P3_R6_DIMENSIONS.map((dimension) => ({
    task_family: "context-selection",
    metric_id: metricId(dimension, schema),
    unit: metricUnit(dimension, schema),
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

function request(seed: number, options: RequestOptions = {}): ContextSelectionPlanRequest {
  const triplets = [
    ["a", "b", "c"],
    ["d", "e", "f"],
  ] as const
  const triplet = triplets[(seed - 1) % triplets.length] ?? triplets[0]
  const repositoryIdentity = hex(options.repositoryChar ?? triplet[0])
  const snapshotIdentity = hex(options.snapshotChar ?? triplet[1])
  const contentIdentity = hex(options.contentChar ?? triplet[2])
  const candidateCount = options.candidateCount ?? 4
  return {
    version: P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
    kind: P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
    taskIdentity: `task:p3-r14-case-${seed}${options.taskSuffix ?? ""}`,
    repositoryIdentity,
    snapshotIdentity,
    contentIdentity,
    candidates: Array.from({ length: candidateCount }, (_, index) =>
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
    corpus_id: `p3-r14-development-${seed}`,
    corpus_role: "development",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 1 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r14-development-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [
      {
        case_id: `p3-r14-case-${seed}`,
        task_family: "context-selection",
        payload: { purpose: `pairwise-${seed}` },
      },
    ],
  } as const
}

function holdout(seed: number) {
  return {
    schema_version: "p2-r1-fixture/v1",
    corpus_id: `p3-r14-holdout-${seed}`,
    corpus_role: "holdout",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 2 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r14-holdout-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [
      {
        case_id: `p3-r14-holdout-case-${seed}`,
        task_family: "context-selection",
        payload: { purpose: `holdout-${seed}` },
      },
    ],
  } as const
}

function manifestRecord(seed: number, schema: MetricSchema = {}): P2R1ManifestRecord {
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
    metric_definitions: metricDefinitions(schema).map((entry) => ({ ...entry })),
  }
  return { ...withoutIdentity, result_identity: deriveResultIdentity(withoutIdentity) }
}

function measurementDeclaration(
  planRequest: ContextSelectionPlanRequest,
  declaredPolicy: DeclaredContextSelectionPolicy,
  manifest: P2R1ManifestRecord,
  strategyId: string,
  schema: MetricSchema = {},
  options: MeasurementOptions = {},
): ContextPolicyMeasurementDeclaration {
  const application = applyDeclaredContextSelectionPolicy(planRequest, declaredPolicy)
  const identities = application.selectedCandidates.map((entry) => entry.candidateIdentity).sort()
  const goldCount = Math.max(0, Math.min(options.goldCount ?? 2, identities.length))
  const utilizedCount = Math.max(0, Math.min(options.utilizedCount ?? 1, identities.length))
  return {
    version: P3_R6_MEASUREMENT_DECLARATION_VERSION,
    kind: P3_R6_MEASUREMENT_DECLARATION_KIND,
    measurementId: `measurement:${strategyId}:${manifest.case_id}${options.measurementSuffix ?? ""}`,
    caseId: manifest.case_id,
    r1ResultIdentity: manifest.result_identity,
    taskFamily: "context-selection",
    dimensionMetricBindings: P3_R6_DIMENSIONS.map((dimension) => ({
      dimension,
      metricId: metricId(dimension, schema),
      unit: metricUnit(dimension, schema),
    })),
    goldCandidateIdentities: options.noGold ? [] : identities.slice(0, goldCount),
    utilizedCandidateIdentities: identities.slice(0, utilizedCount),
  }
}

function reportDeclaration(manifest: P2R1ManifestRecord, strategyId: string): ContextPolicyMeasurementReportDeclaration {
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
  requestOptions: RequestOptions = {},
  measurementOptions: MeasurementOptions = {},
  schema: MetricSchema = {},
) {
  const planRequest = request(seed, requestOptions)
  const declaredPolicy = policy(planRequest, strategy)
  const manifest = manifestRecord(seed, schema)
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
      schema,
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
  minimumObservedCount = 1,
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
      minimumObservedCount,
    }
  })
}

function makeScenario(strategyId: string, options: SideOptions = {}): Scenario {
  const strategy = strategyDeclaration(strategyId)
  const subject = buildContextStrategySubject(strategy)
  const caseA = caseInputs(
    1,
    strategy,
    subject.strategySubjectIdentity,
    options.requestA,
    options.measurementA,
    options.schema,
  )
  const caseB = caseInputs(
    2,
    strategy,
    subject.strategySubjectIdentity,
    options.requestB,
    options.measurementB,
    options.schema,
  )
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
    dimensionPolicies: defaultDimensionPolicies(alignment, options.minimumObservedCount),
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
      direction: options.directionForIndex?.(index) ??
        (index % 2 === 0 ? "HIGHER_IS_BETTER" : "LOWER_IS_BETTER"),
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
  leftOptions: SideOptions = {},
  rightOptions: SideOptions = {
    measurementA: { utilizedCount: 2 },
    measurementB: { utilizedCount: 2 },
  },
) {
  const left = makeScenario("strategy:p3-r14-left", leftOptions)
  const right = makeScenario("strategy:p3-r14-right", rightOptions)
  const leftR13 = reconstructR13(left)
  const rightR13 = reconstructR13(right)
  const declaration = {
    version: P3_R14_COMPARISON_DECLARATION_VERSION,
    kind: P3_R14_COMPARISON_DECLARATION_KIND,
    comparisonId: "comparison:p3-r14-fixture",
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
  return buildStrategyReductionPairwiseComparisonEvidence(
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
    for (const item of value) collectKeys(item, output)
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

const OUTPUT_KEYS = [
  "version",
  "kind",
  "comparisonEvidenceIdentity",
  "comparisonDeclaration",
  "comparisonId",
  "leftDirectionBindingEvidenceIdentity",
  "rightDirectionBindingEvidenceIdentity",
  "leftStrategySubjectIdentity",
  "rightStrategySubjectIdentity",
  "benchmarkId",
  "benchmarkProtocolVersion",
  "leftDirectionBindingEvidence",
  "rightDirectionBindingEvidence",
  "dimensionComparisons",
].sort()

const DIMENSION_KEYS = [
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
].sort()

test("P3-R14 reconstructs both trusted R13 sides, compares seven dimensions, and is deterministic", () => {
  const pair = controlledPair()
  const first = execute(pair)
  const second = buildStrategyReductionPairwiseComparisonEvidence(
    clone(pair.left.bundle),
    clone(pair.right.bundle),
    clone(pair.declaration),
  )

  assert.equal(first.version, P3_R14_COMPARISON_EVIDENCE_VERSION)
  assert.equal(first.kind, P3_R14_COMPARISON_EVIDENCE_KIND)
  assert.match(first.comparisonEvidenceIdentity, /^sha256:[0-9a-f]{64}$/)
  assert.equal(first.comparisonEvidenceIdentity, second.comparisonEvidenceIdentity)
  assert.deepEqual(first.leftDirectionBindingEvidence, pair.leftR13)
  assert.deepEqual(first.rightDirectionBindingEvidence, pair.rightR13)
  assert.notEqual(first.leftDirectionBindingEvidence, pair.leftR13)
  assert.notEqual(first.rightDirectionBindingEvidence, pair.rightR13)
  assert.equal(first.dimensionComparisons.length, 7)
  assert.deepEqual(first.dimensionComparisons.map((entry) => entry.dimension), P3_R6_DIMENSIONS)
  assert.deepEqual(Object.keys(first).sort(), OUTPUT_KEYS)
  for (const entry of first.dimensionComparisons) assert.deepEqual(Object.keys(entry).sort(), DIMENSION_KEYS)
})

test("P3-R14 public builder requires exactly three roots in left-right-declaration order", () => {
  const pair = controlledPair()
  assert.equal(buildStrategyReductionPairwiseComparisonEvidence.length, 3)
  assert.throws(
    () => buildStrategyReductionPairwiseComparisonEvidence(
      pair.declaration,
      pair.right.bundle,
      pair.left.bundle,
    ),
    /P3-R14 contract violation/,
  )
})

test("P3-R14 accepts exactly eight reconstruction keys and never accepts caller R12/R13 records as truth", () => {
  const pair = controlledPair()
  const extra = clone(pair.left.bundle) as unknown as Record<string, unknown>
  extra.r13Evidence = pair.leftR13
  assert.throws(
    () => buildStrategyReductionPairwiseComparisonEvidence(extra, pair.right.bundle, pair.declaration),
    /leftReconstruction keys are not canonical/,
  )

  const missing = clone(pair.left.bundle) as unknown as Record<string, unknown>
  delete missing.reductionDeclaration
  assert.throws(
    () => buildStrategyReductionPairwiseComparisonEvidence(missing, pair.right.bundle, pair.declaration),
    /leftReconstruction keys are not canonical/,
  )
})

test("P3-R14 rejects same-subject self comparison and declaration identity or subject mismatches", () => {
  const pair = controlledPair()
  const sameSubject = controlledPair({}, {})
  sameSubject.right = sameSubject.left
  sameSubject.rightR13 = sameSubject.leftR13
  sameSubject.declaration.rightDirectionBindingEvidenceIdentity = sameSubject.leftR13.directionBindingEvidenceIdentity
  sameSubject.declaration.rightStrategySubjectIdentity = sameSubject.leftR13.strategySubjectIdentity
  assert.throws(() => execute(sameSubject), /must be distinct/)

  for (const field of [
    "leftDirectionBindingEvidenceIdentity",
    "rightDirectionBindingEvidenceIdentity",
  ] as const) {
    const mutated = controlledPair()
    mutated.declaration[field] = `sha256:${"0".repeat(64)}`
    assert.throws(() => execute(mutated), /does not match trusted/)
  }

  const subjectMismatch = controlledPair()
  subjectMismatch.declaration.leftStrategySubjectIdentity = "0".repeat(64)
  assert.throws(() => execute(subjectMismatch), /does not match trusted left R13 evidence/)
})

test("P3-R14 fails closed on corresponding planRequest drift for both cases and candidate/repository/snapshot/task inputs", () => {
  const variants: Array<[string, SideOptions]> = [
    ["case A task", { requestA: { taskSuffix: ":drift" } }],
    ["case B task", { requestB: { taskSuffix: ":drift" } }],
    ["repository", { requestA: { repositoryChar: "9" } }],
    ["snapshot", { requestA: { snapshotChar: "8" } }],
    ["content", { requestA: { contentChar: "7" } }],
    ["candidate set", { requestA: { candidateCount: 3 } }],
  ]
  for (const [label, rightOptions] of variants) {
    const pair = controlledPair({}, rightOptions)
    assert.throws(() => execute(pair), /planRequest must be identical across both strategies/, label)
  }
})

test("P3-R14 fails closed on gold-ground-truth and shared measurement drift while allowing strategy-local measurementId and utilized outcomes", () => {
  const goldA = controlledPair({}, {
    measurementA: { goldCount: 1, utilizedCount: 2 },
    measurementB: { utilizedCount: 2 },
  })
  assert.throws(() => execute(goldA), /measurementDeclaration shared inputs must be identical/)

  const goldB = controlledPair({}, {
    measurementA: { utilizedCount: 2 },
    measurementB: { goldCount: 1, utilizedCount: 2 },
  })
  assert.throws(() => execute(goldB), /measurementDeclaration shared inputs must be identical/)

  const allowed = controlledPair(
    {
      measurementA: { utilizedCount: 1, measurementSuffix: ":left" },
      measurementB: { utilizedCount: 1, measurementSuffix: ":left" },
    },
    {
      measurementA: { utilizedCount: 2, measurementSuffix: ":right" },
      measurementB: { utilizedCount: 2, measurementSuffix: ":right" },
    },
  )
  assert.doesNotThrow(() => execute(allowed))
})

test("P3-R14 fails closed on metric binding, unit, direction, dimension order, and declaration contract drift", () => {
  const metricDrift = controlledPair({}, { schema: { prefix: "other" } })
  assert.throws(() => execute(metricDrift), /shared inputs must be identical|must match across both strategies/)

  const unitDrift = controlledPair({}, {
    schema: { unitOverrides: { "recall-at-k": "other-unit" } },
  })
  assert.throws(() => execute(unitDrift), /shared inputs must be identical|must match across both strategies/)

  const directionDrift = controlledPair({}, { directionForIndex: () => "LOWER_IS_BETTER" })
  assert.throws(() => execute(directionDrift), /direction must match across both strategies/)

  const reorderedDirections = controlledPair()
  const directions = (reorderedDirections.right.bundle.directionDeclaration as { dimensionDirections: unknown[] }).dimensionDirections
  ;[directions[0], directions[1]] = [directions[1], directions[0]]
  assert.throws(() => execute(reorderedDirections), /canonical P3-R6 order/)

  const missingDeclaration = controlledPair()
  delete (missingDeclaration.declaration as Record<string, unknown>).benchmarkId
  assert.throws(() => execute(missingDeclaration), /comparisonDeclaration keys are not canonical/)

  const extraDeclaration = controlledPair()
  ;(extraDeclaration.declaration as Record<string, unknown>).favored = "left"
  assert.throws(() => execute(extraDeclaration), /comparisonDeclaration keys are not canonical/)

  const wrongVersion = controlledPair()
  ;(wrongVersion.declaration as Record<string, unknown>).version = "p3-r14-unsupported"
  assert.throws(() => execute(wrongVersion), /unsupported comparison declaration contract/)
})

test("P3-R14 computes exact unnormalized left-minus-right deltas, preserves zero, and swap reverses nonzero signs", () => {
  const pair = controlledPair(
    {
      measurementA: { utilizedCount: 1 },
      measurementB: { utilizedCount: 1 },
    },
    {
      measurementA: { utilizedCount: 2 },
      measurementB: { utilizedCount: 2 },
    },
  )
  const forward = execute(pair)
  for (let index = 0; index < forward.dimensionComparisons.length; index += 1) {
    const comparison = forward.dimensionComparisons[index]!
    const left = forward.leftDirectionBindingEvidence.reductionEvidence.dimensionReductions[index]!
    const right = forward.rightDirectionBindingEvidence.reductionEvidence.dimensionReductions[index]!
    if (comparison.comparisonStatus === "COMPARABLE") {
      assert.equal(comparison.rawDeltaLeftMinusRight, left.reducedValue! - right.reducedValue!)
    }
  }

  const nonzero = forward.dimensionComparisons.find(
    (entry) => entry.comparisonStatus === "COMPARABLE" && entry.rawDeltaLeftMinusRight !== 0,
  )
  assert.ok(nonzero, "fixture must expose at least one nonzero comparable delta")

  const reversedDeclaration = {
    ...pair.declaration,
    comparisonId: "comparison:p3-r14-reversed",
    leftDirectionBindingEvidenceIdentity: pair.rightR13.directionBindingEvidenceIdentity,
    rightDirectionBindingEvidenceIdentity: pair.leftR13.directionBindingEvidenceIdentity,
    leftStrategySubjectIdentity: pair.rightR13.strategySubjectIdentity,
    rightStrategySubjectIdentity: pair.leftR13.strategySubjectIdentity,
  }
  const reversed = buildStrategyReductionPairwiseComparisonEvidence(
    pair.right.bundle,
    pair.left.bundle,
    reversedDeclaration,
  )
  const reverseMatch = reversed.dimensionComparisons.find((entry) => entry.dimension === nonzero.dimension)!
  assert.equal(reverseMatch.rawDeltaLeftMinusRight, -nonzero.rawDeltaLeftMinusRight!)
  assert.notEqual(reversed.comparisonEvidenceIdentity, forward.comparisonEvidenceIdentity)

  const equalPair = controlledPair(
    { measurementA: { utilizedCount: 1 }, measurementB: { utilizedCount: 1 } },
    { measurementA: { utilizedCount: 1 }, measurementB: { utilizedCount: 1 } },
  )
  const equal = execute(equalPair)
  assert.equal(
    equal.dimensionComparisons
      .filter((entry) => entry.comparisonStatus === "COMPARABLE")
      .every((entry) => entry.rawDeltaLeftMinusRight === 0),
    true,
  )
})

test("P3-R14 direction metadata never normalizes or interprets raw deltas", () => {
  const higher = controlledPair(
    { directionForIndex: () => "HIGHER_IS_BETTER" },
    {
      measurementA: { utilizedCount: 2 },
      measurementB: { utilizedCount: 2 },
      directionForIndex: () => "HIGHER_IS_BETTER",
    },
  )
  const lower = controlledPair(
    { directionForIndex: () => "LOWER_IS_BETTER" },
    {
      measurementA: { utilizedCount: 2 },
      measurementB: { utilizedCount: 2 },
      directionForIndex: () => "LOWER_IS_BETTER",
    },
  )
  const higherEvidence = execute(higher)
  const lowerEvidence = execute(lower)
  assert.deepEqual(
    higherEvidence.dimensionComparisons.map((entry) => entry.rawDeltaLeftMinusRight),
    lowerEvidence.dimensionComparisons.map((entry) => entry.rawDeltaLeftMinusRight),
  )
})

test("P3-R14 propagates one-side and two-side insufficiency with null comparison numerics and complete nested R13 evidence", () => {
  const oneSide = controlledPair(
    {
      measurementA: { utilizedCount: 0 },
      measurementB: { utilizedCount: 0 },
    },
    {
      measurementA: { utilizedCount: 2 },
      measurementB: { utilizedCount: 2 },
    },
  )
  const oneSideEvidence = execute(oneSide)
  const insufficient = oneSideEvidence.dimensionComparisons.filter(
    (entry) => entry.comparisonStatus === "INSUFFICIENT_EVIDENCE",
  )
  assert.ok(insufficient.length > 0)
  for (const entry of insufficient) {
    assert.equal(entry.leftReducedValue, null)
    assert.equal(entry.rightReducedValue, null)
    assert.equal(entry.rawDeltaLeftMinusRight, null)
  }
  assert.deepEqual(oneSideEvidence.leftDirectionBindingEvidence, oneSide.leftR13)
  assert.deepEqual(oneSideEvidence.rightDirectionBindingEvidence, oneSide.rightR13)

  const twoSide = controlledPair(
    {
      measurementA: { utilizedCount: 0 },
      measurementB: { utilizedCount: 0 },
    },
    {
      measurementA: { utilizedCount: 0 },
      measurementB: { utilizedCount: 0 },
    },
  )
  assert.ok(execute(twoSide).dimensionComparisons.some(
    (entry) => entry.comparisonStatus === "INSUFFICIENT_EVIDENCE",
  ))
})

test("P3-R14 rejects swapped case correspondence and non-finite/non-JSON hostile roots", () => {
  const swapped = controlledPair()
  const bundle = clone(swapped.right.bundle) as unknown as Record<string, unknown>
  ;[bundle.caseAInputs, bundle.caseBInputs] = [bundle.caseBInputs, bundle.caseAInputs]
  assert.throws(
    () => buildStrategyReductionPairwiseComparisonEvidence(swapped.left.bundle, bundle, swapped.declaration),
    /contract violation/,
  )

  const hostileValues: Array<[string, () => unknown]> = [
    ["bigint", () => ({ ...controlledPair().left.bundle, extra: BigInt(1) })],
    ["undefined", () => ({ ...controlledPair().left.bundle, strategyDeclaration: undefined })],
    ["function", () => ({ ...controlledPair().left.bundle, strategyDeclaration: () => undefined })],
    ["non-finite", () => ({ ...controlledPair().left.bundle, strategyDeclaration: { value: Infinity } })],
    ["sparse-array", () => {
      const pair = controlledPair()
      const sparse = new Array(2)
      sparse[1] = pair.left.bundle.strategyDeclaration
      return { ...pair.left.bundle, strategyDeclaration: sparse }
    }],
    ["custom-prototype", () => {
      const pair = controlledPair()
      return Object.assign(Object.create({ inherited: true }), pair.left.bundle)
    }],
    ["symbol-key", () => {
      const pair = controlledPair()
      const value = { ...pair.left.bundle } as Record<PropertyKey, unknown>
      value[Symbol("forbidden")] = true
      return value
    }],
    ["accessor", () => {
      const pair = controlledPair()
      const value = { ...pair.left.bundle } as Record<string, unknown>
      Object.defineProperty(value, "strategyDeclaration", { enumerable: true, get: () => pair.left.strategy })
      return value
    }],
    ["proxy", () => new Proxy(controlledPair().left.bundle as object, {
      ownKeys() { throw new Error("proxy trap") },
    })],
    ["cycle", () => {
      const pair = controlledPair()
      const value = { ...pair.left.bundle } as Record<string, unknown>
      value.strategyDeclaration = value
      return value
    }],
  ]

  for (const [label, makeHostile] of hostileValues) {
    const pair = controlledPair()
    assert.throws(
      () => buildStrategyReductionPairwiseComparisonEvidence(makeHostile(), pair.right.bundle, pair.declaration),
      label,
    )
  }
})

test("P3-R14 rejects accessors before semantic reads at the hardened snapshot boundary", () => {
  const pair = controlledPair()
  const hostile = { ...pair.left.bundle } as unknown as Record<string, unknown>
  let getterCalls = 0
  Object.defineProperty(hostile, "strategyDeclaration", {
    enumerable: true,
    get: () => {
      getterCalls += 1
      return pair.left.strategy
    },
  })

  assert.throws(
    () => buildStrategyReductionPairwiseComparisonEvidence(hostile, pair.right.bundle, pair.declaration),
    /enumerable data property/,
  )
  assert.equal(getterCalls, 0)
})

test("P3-R14 rejects unpaired UTF-16 surrogates inside schema-valid nested strings at the snapshot boundary", () => {
  for (const [label, value, expected] of [
    ["high", "\ud800", /unpaired UTF-16 high surrogate/],
    ["low", "\udc00", /unpaired UTF-16 low surrogate/],
  ] as const) {
    const pair = controlledPair()
    const left = clone(pair.left.bundle) as unknown as Record<string, unknown>
    const caseAInputs = left.caseAInputs as Record<string, unknown>
    const planRequest = caseAInputs.planRequest as Record<string, unknown>
    planRequest.taskIdentity = value

    assert.throws(
      () => buildStrategyReductionPairwiseComparisonEvidence(left, pair.right.bundle, pair.declaration),
      expected,
      label,
    )
  }
})

test("P3-R14 outputs contain no favored, verdict, aggregate, ranking, promotion, or winner surface", () => {
  const keys = collectKeys(execute())
  for (const forbidden of [
    "favored",
    "favorite",
    "better",
    "worse",
    "superior",
    "inferior",
    "tie",
    "aggregate",
    "score",
    "rank",
    "ranking",
    "leaderboard",
    "promotion",
    "winner",
    "default",
    "threshold",
    "tolerance",
    "significance",
  ]) {
    assert.equal([...keys].some((key) => key.toLowerCase().includes(forbidden)), false, forbidden)
  }
})

test("P3-R14 canonicalization makes property insertion order irrelevant while array order remains semantic", () => {
  const pair = controlledPair()
  const normal = execute(pair)
  const reorderedLeft = reordered(clone(pair.left.bundle) as unknown as Record<string, unknown>)
  const reorderedRight = reordered(clone(pair.right.bundle) as unknown as Record<string, unknown>)
  const reorderedDeclaration = reordered(clone(pair.declaration) as Record<string, unknown>)
  const same = buildStrategyReductionPairwiseComparisonEvidence(
    reorderedLeft,
    reorderedRight,
    reorderedDeclaration,
  )
  assert.equal(same.comparisonEvidenceIdentity, normal.comparisonEvidenceIdentity)

  const wrongArrayOrder = controlledPair()
  const bindings = ((wrongArrayOrder.right.bundle.caseAInputs as Record<string, unknown>)
    .measurementDeclaration as { dimensionMetricBindings: unknown[] }).dimensionMetricBindings
  ;[bindings[0], bindings[1]] = [bindings[1], bindings[0]]
  assert.throws(() => execute(wrongArrayOrder), /contract violation/)
})

test("P3-R14 evidence is detached, deeply frozen, deterministic, and self-reference-free", () => {
  const pair = controlledPair()
  const output = execute(pair)
  const identity = output.comparisonEvidenceIdentity
  assertDeepFrozen(output)

  ;(pair.left.bundle.caseAInputs as Record<string, unknown>).planRequest = { mutated: true }
  ;(pair.declaration as Record<string, unknown>).comparisonId = "comparison:mutated"
  assert.equal(output.comparisonEvidenceIdentity, identity)
  assert.notDeepEqual(output.leftDirectionBindingEvidence, (pair.left.bundle.caseAInputs as Record<string, unknown>).planRequest)

  const withoutIdentity = { ...output } as Record<string, unknown>
  delete withoutIdentity.comparisonEvidenceIdentity
  assert.equal(sha256Canonical(withoutIdentity), output.comparisonEvidenceIdentity)
})

test("P3-R14 identity excludes ambient time, random, environment, locale, network, and subprocess execution", () => {
  const baselinePair = controlledPair()
  const baseline = execute(baselinePair)

  const originalNow = Date.now
  const originalRandom = Math.random
  const originalFetch = globalThis.fetch
  const originalLang = process.env.LANG
  const require = createRequire(import.meta.url)
  const childProcess = require("node:child_process") as Record<string, unknown>
  const trappedNames = ["exec", "execFile", "execFileSync", "execSync", "fork", "spawn", "spawnSync"]
  const originals = new Map<string, unknown>()

  try {
    Date.now = () => 1
    Math.random = () => 0.999999
    process.env.LANG = "zz_ZZ.UTF-8"
    globalThis.fetch = (async () => { throw new Error("network forbidden") }) as typeof fetch
    for (const name of trappedNames) {
      originals.set(name, childProcess[name])
      childProcess[name] = () => { throw new Error(`subprocess forbidden: ${name}`) }
    }

    const repeatedPair = controlledPair()
    const repeated = execute(repeatedPair)
    assert.equal(repeated.comparisonEvidenceIdentity, baseline.comparisonEvidenceIdentity)
  } finally {
    Date.now = originalNow
    Math.random = originalRandom
    process.env.LANG = originalLang
    globalThis.fetch = originalFetch
    for (const [name, value] of originals) childProcess[name] = value
  }
})
