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
  P3_R12_REDUCTION_EVIDENCE_KIND,
  P3_R12_REDUCTION_EVIDENCE_VERSION,
} from "../bench/p3-r12/contracts.ts"
import { buildSingleStrategyTwoCaseReductionEvidence } from "../bench/p3-r12/single-strategy-two-case-reduction-evidence.ts"
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

const STRATEGY_ID = "strategy:p3-r12-fixture"
const BENCHMARK_ID = "kodac-p3-r12-fixture"
const BENCHMARK_PROTOCOL_VERSION = "v1"

type MetricSchema = {
  readonly prefix?: string
  readonly unitOverrides?: Partial<Record<P3R6Dimension, string>>
}

type MeasurementOptions = {
  readonly noGold?: boolean
  readonly utilizedCount?: number
}

type CaseOptions = {
  readonly benchmarkId?: string
  readonly benchmarkProtocolVersion?: string
  readonly schema?: MetricSchema
  readonly measurement?: MeasurementOptions
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
    taskIdentity: `task:p3-r12-case-${seed}`,
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
    corpus_id: `p3-r12-development-${seed}`,
    corpus_role: "development",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 1 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r12-development-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [
      {
        case_id: `p3-r12-case-${seed}`,
        task_family: "context-selection",
        payload: { purpose: `reduction-evidence-${seed}` },
      },
    ],
  } as const
}

function holdout(seed: number) {
  return {
    schema_version: "p2-r1-fixture/v1",
    corpus_id: `p3-r12-holdout-${seed}`,
    corpus_role: "holdout",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 2 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r12-holdout-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [
      {
        case_id: `p3-r12-holdout-case-${seed}`,
        task_family: "context-selection",
        payload: { purpose: `holdout-${seed}` },
      },
    ],
  } as const
}

function manifestRecord(seed: number, options: CaseOptions = {}): P2R1ManifestRecord {
  const developmentValue = development(seed)
  const holdoutValue = holdout(seed)
  const fixtureCase = developmentValue.cases[0]
  const withoutIdentity = {
    schema_version: "p2-r1-manifest/v1",
    benchmark_id: options.benchmarkId ?? BENCHMARK_ID,
    benchmark_protocol_version: options.benchmarkProtocolVersion ?? BENCHMARK_PROTOCOL_VERSION,
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
    metric_definitions: metricDefinitions(options.schema).map((entry) => ({ ...entry })),
  }
  return { ...withoutIdentity, result_identity: deriveResultIdentity(withoutIdentity) }
}

function measurementDeclaration(
  planRequest: ContextSelectionPlanRequest,
  declaredPolicy: DeclaredContextSelectionPolicy,
  manifest: P2R1ManifestRecord,
  schema: MetricSchema = {},
  options: MeasurementOptions = {},
): ContextPolicyMeasurementDeclaration {
  const application = applyDeclaredContextSelectionPolicy(planRequest, declaredPolicy)
  const identities = application.selectedCandidates.map((entry) => entry.candidateIdentity).sort()
  const utilizedCount = Math.max(0, Math.min(options.utilizedCount ?? 1, identities.length))
  return {
    version: P3_R6_MEASUREMENT_DECLARATION_VERSION,
    kind: P3_R6_MEASUREMENT_DECLARATION_KIND,
    measurementId: `measurement:${manifest.case_id}`,
    caseId: manifest.case_id,
    r1ResultIdentity: manifest.result_identity,
    taskFamily: "context-selection",
    dimensionMetricBindings: P3_R6_DIMENSIONS.map((dimension) => ({
      dimension,
      metricId: metricId(dimension, schema),
      unit: metricUnit(dimension, schema),
    })),
    goldCandidateIdentities: options.noGold ? [] : identities.slice(0, 2),
    utilizedCandidateIdentities: identities.slice(0, utilizedCount),
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

function caseInputs(
  seed: number,
  strategy: ContextStrategyDeclaration,
  subjectIdentity: string,
  options: CaseOptions = {},
) {
  const planRequest = request(seed)
  const declaredPolicy = policy(planRequest, strategy)
  const manifest = manifestRecord(seed, options)
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
      options.schema,
      options.measurement,
    ),
    reportDeclaration: reportDeclaration(manifest),
    bindingDeclaration: {
      version: P3_R8_BINDING_DECLARATION_VERSION,
      kind: P3_R8_BINDING_DECLARATION_KIND,
      bindingId: `binding:p3-r12-case-${seed}`,
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

function scenario(options: {
  readonly caseA?: CaseOptions
  readonly caseB?: CaseOptions
} = {}) {
  const strategy = strategyDeclaration()
  const subject = buildContextStrategySubject(strategy)
  const caseA = caseInputs(1, strategy, subject.strategySubjectIdentity, options.caseA)
  const caseB = caseInputs(2, strategy, subject.strategySubjectIdentity, options.caseB)
  const manifestA = caseA.manifest[0]
  const manifestB = caseB.manifest[0]
  const compositionDeclaration = {
    version: P3_R9_COMPOSITION_DECLARATION_VERSION,
    kind: P3_R9_COMPOSITION_DECLARATION_KIND,
    compositionId: "composition:p3-r12-fixture",
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
    alignmentId: "alignment:p3-r12-fixture",
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
    policyBindingId: "policy-binding:p3-r12-fixture",
    alignmentEvidenceIdentity: alignment.alignmentEvidenceIdentity,
    strategySubjectIdentity: alignment.strategySubjectIdentity,
    benchmarkId: manifestA.benchmark_id,
    benchmarkProtocolVersion: manifestA.benchmark_protocol_version,
    dimensionPolicies: defaultDimensionPolicies(alignment),
  }
  const value = {
    strategy,
    caseA,
    caseB,
    compositionDeclaration,
    alignmentDeclaration,
    policyDeclaration,
    reductionDeclaration: {
      version: P3_R12_REDUCTION_DECLARATION_VERSION,
      kind: P3_R12_REDUCTION_DECLARATION_KIND,
      reductionId: "reduction:p3-r12-fixture",
      policyBindingEvidenceIdentity: "",
      strategySubjectIdentity: subject.strategySubjectIdentity,
      benchmarkId: manifestA.benchmark_id,
      benchmarkProtocolVersion: manifestA.benchmark_protocol_version,
    },
  }
  refreshReductionDeclaration(value)
  return value
}

function refreshReductionDeclaration(value: ReturnType<typeof scenario>): void {
  const binding = buildSingleStrategyTwoCaseReductionPolicyBinding(
    value.strategy,
    value.compositionDeclaration,
    value.alignmentDeclaration,
    value.policyDeclaration,
    value.caseA,
    value.caseB,
  )
  value.reductionDeclaration.policyBindingEvidenceIdentity = binding.policyBindingEvidenceIdentity
  value.reductionDeclaration.strategySubjectIdentity = binding.strategySubjectIdentity
  value.reductionDeclaration.benchmarkId = binding.benchmarkId
  value.reductionDeclaration.benchmarkProtocolVersion = binding.benchmarkProtocolVersion
}

function execute(value: ReturnType<typeof scenario>) {
  return buildSingleStrategyTwoCaseReductionEvidence(
    value.strategy,
    value.compositionDeclaration,
    value.alignmentDeclaration,
    value.policyDeclaration,
    value.reductionDeclaration,
    value.caseA,
    value.caseB,
  )
}

function run(options: Parameters<typeof scenario>[0] = {}) {
  return execute(scenario(options))
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

test("P3-R12 reduces exactly seven canonical dimensions independently", () => {
  const result = run()
  assert.equal(result.version, P3_R12_REDUCTION_EVIDENCE_VERSION)
  assert.equal(result.kind, P3_R12_REDUCTION_EVIDENCE_KIND)
  assert.match(result.reductionEvidenceIdentity, /^sha256:[0-9a-f]{64}$/)
  assert.equal(result.benchmarkId, BENCHMARK_ID)
  assert.equal(result.benchmarkProtocolVersion, BENCHMARK_PROTOCOL_VERSION)
  assert.equal(result.dimensionReductions.length, P3_R6_DIMENSIONS.length)
  assert.deepEqual(result.dimensionReductions.map((entry) => entry.dimension), P3_R6_DIMENSIONS)
  assert.notEqual(result.memberAReference.p2R2ReportIdentity, result.memberBReference.p2R2ReportIdentity)

  const forbidden = new Set([
    "missingCount",
    "missing_count",
    "aggregateScore",
    "aggregate_score",
    "score",
    "weight",
    "direction",
    "delta",
    "higherIsBetter",
    "lowerIsBetter",
    "better",
    "worse",
    "preferred",
    "rank",
    "winner",
    "promotion",
    "default",
    "threshold",
  ])
  const keys = collectKeys(result)
  for (const key of forbidden) assert.equal(keys.has(key), false, `forbidden output key: ${key}`)
})

test("P3-R12 arithmetic mean matches the exact two trusted numeric observations", () => {
  const result = run()
  const recall = result.dimensionReductions.find((entry) => entry.dimension === "recall-at-k")!
  assert.equal(recall.reducer, "ARITHMETIC_MEAN")
  assert.equal(recall.valueKind, "NUMBER")
  assert.equal(recall.expectedCount, 2)
  assert.equal(recall.observedCount, 2)
  assert.equal(recall.unavailableCount, 0)
  assert.equal(recall.status, "REDUCED")
  const left = recall.memberAObservation.value
  const right = recall.memberBObservation.value
  assert.equal(typeof left, "number")
  assert.equal(typeof right, "number")
  assert.equal(recall.reducedValue, (left as number) / 2 + (right as number) / 2)
  assert.equal(recall.outputUnit, recall.inputUnit)
  assert.equal(recall.trueCount, null)
  assert.equal(recall.denominatorCount, null)
})

test("P3-R12 preserves both-unavailable boolean coverage as insufficient evidence", () => {
  const result = run()
  const noGold = result.dimensionReductions.find((entry) => entry.dimension === "no-gold-abstention")!
  assert.equal(noGold.reducer, "BOOLEAN_TRUE_RATE")
  assert.equal(noGold.observedCount, 0)
  assert.equal(noGold.unavailableCount, 2)
  assert.equal(noGold.status, "INSUFFICIENT_EVIDENCE")
  assert.equal(noGold.reducedValue, null)
  assert.equal(noGold.trueCount, 0)
  assert.equal(noGold.denominatorCount, 0)
  assert.equal(noGold.outputUnit, "ratio_0_1")
})

test("P3-R12 observed-only coverage reduces one observed plus one unavailable boolean slot", () => {
  const result = run({
    caseA: { measurement: { noGold: true } },
  })
  const noGold = result.dimensionReductions.find((entry) => entry.dimension === "no-gold-abstention")!
  assert.equal(noGold.observedCount, 1)
  assert.equal(noGold.unavailableCount, 1)
  assert.equal(noGold.status, "REDUCED")
  assert.equal(noGold.denominatorCount, 1)
  const observed = noGold.memberAObservation.measurement_status === "observed"
    ? noGold.memberAObservation.value
    : noGold.memberBObservation.value
  assert.equal(typeof observed, "boolean")
  assert.equal(noGold.trueCount, observed ? 1 : 0)
  assert.equal(noGold.reducedValue, observed ? 1 : 0)
})

test("P3-R12 REQUIRE_COMPLETE refuses the same partial boolean evidence", () => {
  const value = scenario({ caseA: { measurement: { noGold: true } } })
  const noGoldIndex = P3_R6_DIMENSIONS.indexOf("no-gold-abstention")
  value.policyDeclaration.dimensionPolicies[noGoldIndex] = {
    ...value.policyDeclaration.dimensionPolicies[noGoldIndex]!,
    missingnessPolicy: "REQUIRE_COMPLETE",
    minimumObservedCount: 2,
  }
  refreshReductionDeclaration(value)
  const result = execute(value)
  const noGold = result.dimensionReductions[noGoldIndex]!
  assert.equal(noGold.observedCount, 1)
  assert.equal(noGold.unavailableCount, 1)
  assert.equal(noGold.status, "INSUFFICIENT_EVIDENCE")
  assert.equal(noGold.reducedValue, null)
  assert.equal(noGold.trueCount, typeof noGold.memberAObservation.value === "boolean" && noGold.memberAObservation.value ? 1 : 0)
  assert.equal(noGold.denominatorCount, 1)
})

test("P3-R12 boolean true-rate uses observed booleans only", () => {
  const result = run({
    caseA: { measurement: { noGold: true } },
    caseB: { measurement: { noGold: true } },
  })
  const noGold = result.dimensionReductions.find((entry) => entry.dimension === "no-gold-abstention")!
  assert.equal(noGold.observedCount, 2)
  assert.equal(noGold.unavailableCount, 0)
  assert.equal(noGold.status, "REDUCED")
  const values = [noGold.memberAObservation.value, noGold.memberBObservation.value]
  assert.equal(values.every((entry) => typeof entry === "boolean"), true)
  const expectedTrue = values.filter((entry) => entry === true).length
  assert.equal(noGold.trueCount, expectedTrue)
  assert.equal(noGold.denominatorCount, 2)
  assert.equal(noGold.reducedValue, expectedTrue / 2)
})

test("P3-R12 binds the declaration to freshly reconstructed R11 identity and subject", () => {
  const wrongIdentity = scenario()
  wrongIdentity.reductionDeclaration.policyBindingEvidenceIdentity = `sha256:${"0".repeat(64)}`
  assert.throws(() => execute(wrongIdentity), /policyBindingEvidenceIdentity does not match canonical P3-R11 evidence/)

  const wrongSubject = scenario()
  wrongSubject.reductionDeclaration.strategySubjectIdentity = "0".repeat(64)
  assert.throws(() => execute(wrongSubject), /strategySubjectIdentity does not match canonical P3-R11 evidence/)

  const wrongBenchmark = scenario()
  wrongBenchmark.reductionDeclaration.benchmarkId = "other-benchmark"
  assert.throws(() => execute(wrongBenchmark), /benchmarkId does not match canonical P3-R11 evidence/)
})

test("P3-R12 rejects unknown declaration fields and forged predecessor-shaped fields", () => {
  const value = scenario()
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionEvidence(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      value.policyDeclaration,
      { ...value.reductionDeclaration, score: 1 },
      value.caseA,
      value.caseB,
    ),
    /reductionDeclaration keys are not canonical/,
  )

  assert.throws(
    () => buildSingleStrategyTwoCaseReductionEvidence(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      value.policyDeclaration,
      value.reductionDeclaration,
      { ...value.caseA, policyBindingEvidence: { forged: true } },
      value.caseB,
    ),
    /P3-R11 contract violation: caseAInputs keys are not canonical/,
  )
})

test("P3-R12 fails closed when predecessor preimages drift after R11 identity binding", () => {
  const value = scenario()
  const mutableReportDeclaration = value.caseA.reportDeclaration as unknown as { reportBindingId: string }
  mutableReportDeclaration.reportBindingId = "report-binding:forged"
  assert.throws(() => execute(value), /compositionEvidenceIdentity does not match canonical R9 composition/)
})

test("P3-R12 is deterministic and canonical object-key order invariant", () => {
  const value = scenario()
  const first = execute(value)
  const second = execute(value)
  const d = value.reductionDeclaration
  const reordered = {
    benchmarkProtocolVersion: d.benchmarkProtocolVersion,
    benchmarkId: d.benchmarkId,
    strategySubjectIdentity: d.strategySubjectIdentity,
    policyBindingEvidenceIdentity: d.policyBindingEvidenceIdentity,
    reductionId: d.reductionId,
    kind: d.kind,
    version: d.version,
  }
  const third = buildSingleStrategyTwoCaseReductionEvidence(
    value.strategy,
    value.compositionDeclaration,
    value.alignmentDeclaration,
    value.policyDeclaration,
    reordered,
    value.caseA,
    value.caseB,
  )
  assert.deepEqual(first, second)
  assert.deepEqual(first, third)
})

test("P3-R12 evidence identity changes when legitimate reduction policy semantics change", () => {
  const firstValue = scenario()
  const first = execute(firstValue)
  const secondValue = scenario()
  secondValue.policyDeclaration.dimensionPolicies[0] = {
    ...secondValue.policyDeclaration.dimensionPolicies[0]!,
    missingnessPolicy: "REQUIRE_COMPLETE",
    minimumObservedCount: 2,
  }
  refreshReductionDeclaration(secondValue)
  const second = execute(secondValue)
  assert.notEqual(first.reductionEvidenceIdentity, second.reductionEvidenceIdentity)
})

test("P3-R12 returns detached deeply frozen evidence and isolates caller mutation", () => {
  const value = scenario()
  const result = execute(value)
  assertDeepFrozen(result)
  assert.notEqual(result.reductionDeclaration, value.reductionDeclaration)
  assert.notEqual(result.dimensionReductions[0]?.memberAObservation, value.caseA)

  value.reductionDeclaration.reductionId = "reduction:mutated"
  value.policyDeclaration.policyBindingId = "policy-binding:mutated"
  const mutableMeasurementDeclaration = value.caseA.measurementDeclaration as unknown as { measurementId: string }
  mutableMeasurementDeclaration.measurementId = "measurement:mutated"

  assert.equal(result.reductionId, "reduction:p3-r12-fixture")
  assert.equal(result.dimensionReductions[0]?.metricId, "metric:recall-at-k")
})

test("P3-R12 rejects hostile canonical-JSON structures before semantic reuse", () => {
  const value = scenario()
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionEvidence(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      value.policyDeclaration,
      new Proxy(value.reductionDeclaration, {}),
      value.caseA,
      value.caseB,
    ),
    /not canonical JSON/,
  )

  const accessor = { ...value.reductionDeclaration } as Record<string, unknown>
  Object.defineProperty(accessor, "reductionId", {
    enumerable: true,
    get: () => value.reductionDeclaration.reductionId,
  })
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionEvidence(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      value.policyDeclaration,
      accessor,
      value.caseA,
      value.caseB,
    ),
    /not canonical JSON/,
  )

  const cyclic = clone(value.reductionDeclaration) as Record<string, unknown>
  cyclic.self = cyclic
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionEvidence(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      value.policyDeclaration,
      cyclic,
      value.caseA,
      value.caseB,
    ),
    /not canonical JSON/,
  )

  const symbolBearing = { ...value.reductionDeclaration } as Record<PropertyKey, unknown>
  symbolBearing[Symbol("hidden")] = true
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionEvidence(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      value.policyDeclaration,
      symbolBearing,
      value.caseA,
      value.caseB,
    ),
    /not canonical JSON/,
  )
})

test("P3-R12 rejects malformed, missing, and unsupported reduction declarations", () => {
  const value = scenario()
  const { reductionId: _reductionId, ...missingReductionId } = value.reductionDeclaration
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionEvidence(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      value.policyDeclaration,
      missingReductionId,
      value.caseA,
      value.caseB,
    ),
    /reductionDeclaration keys are not canonical/,
  )
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionEvidence(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      value.policyDeclaration,
      { ...value.reductionDeclaration, reductionId: "bad id" },
      value.caseA,
      value.caseB,
    ),
    /reductionDeclaration.reductionId must be a bounded canonical stable identifier/,
  )
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionEvidence(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      value.policyDeclaration,
      { ...value.reductionDeclaration, version: "unsupported" },
      value.caseA,
      value.caseB,
    ),
    /unsupported reduction declaration contract/,
  )
})

test("P3-R12 does not require ambient network, clock, randomness, or environment state", () => {
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

test("P3-R12 does not require ambient filesystem or subprocess side effects", async () => {
  const fs = (await import("node:fs")).default
  const childProcess = (await import("node:child_process")).default
  const originalReadFileSync = fs.readFileSync
  const originalWriteFileSync = fs.writeFileSync
  const originalExecSync = childProcess.execSync
  const originalSpawnSync = childProcess.spawnSync
  const deny = () => { throw new Error("ambient side effect forbidden") }

  try {
    fs.readFileSync = deny as typeof fs.readFileSync
    fs.writeFileSync = deny as typeof fs.writeFileSync
    childProcess.execSync = deny as typeof childProcess.execSync
    childProcess.spawnSync = deny as typeof childProcess.spawnSync
    assert.doesNotThrow(() => run())
  } finally {
    fs.readFileSync = originalReadFileSync
    fs.writeFileSync = originalWriteFileSync
    childProcess.execSync = originalExecSync
    childProcess.spawnSync = originalSpawnSync
  }
})
