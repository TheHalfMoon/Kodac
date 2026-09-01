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
  P3_R11_POLICY_BINDING_EVIDENCE_KIND,
  P3_R11_POLICY_BINDING_EVIDENCE_VERSION,
  P3_R11_POLICY_DECLARATION_KIND,
  P3_R11_POLICY_DECLARATION_VERSION,
  type P3R11DimensionPolicy,
} from "../bench/p3-r11/contracts.ts"
import { buildSingleStrategyTwoCaseReductionPolicyBinding } from "../bench/p3-r11/single-strategy-two-case-reduction-policy-binding.ts"
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

const STRATEGY_ID = "strategy:p3-r11-fixture"
const BENCHMARK_ID = "kodac-p3-r11-fixture"
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
    taskIdentity: `task:p3-r11-case-${seed}`,
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
    corpus_id: `p3-r11-development-${seed}`,
    corpus_role: "development",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 1 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r11-development-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [
      {
        case_id: `p3-r11-case-${seed}`,
        task_family: "context-selection",
        payload: { purpose: `reduction-policy-binding-${seed}` },
      },
    ],
  } as const
}

function holdout(seed: number) {
  return {
    schema_version: "p2-r1-fixture/v1",
    corpus_id: `p3-r11-holdout-${seed}`,
    corpus_role: "holdout",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 2 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r11-holdout-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [
      {
        case_id: `p3-r11-holdout-case-${seed}`,
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
      bindingId: `binding:p3-r11-case-${seed}`,
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
  readonly strategy?: ContextStrategyDeclaration
  readonly caseA?: CaseOptions
  readonly caseB?: CaseOptions
  readonly declaredBenchmarkId?: string
  readonly declaredBenchmarkProtocolVersion?: string
} = {}) {
  const strategy = options.strategy ?? strategyDeclaration()
  const subject = buildContextStrategySubject(strategy)
  const caseA = caseInputs(1, strategy, subject.strategySubjectIdentity, options.caseA)
  const caseB = caseInputs(2, strategy, subject.strategySubjectIdentity, options.caseB)
  const manifestA = caseA.manifest[0]
  const manifestB = caseB.manifest[0]
  const compositionDeclaration = {
    version: P3_R9_COMPOSITION_DECLARATION_VERSION,
    kind: P3_R9_COMPOSITION_DECLARATION_KIND,
    compositionId: "composition:p3-r11-fixture",
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
    alignmentId: "alignment:p3-r11-fixture",
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
    policyBindingId: "policy-binding:p3-r11-fixture",
    alignmentEvidenceIdentity: alignment.alignmentEvidenceIdentity,
    strategySubjectIdentity: alignment.strategySubjectIdentity,
    benchmarkId: options.declaredBenchmarkId ?? manifestA.benchmark_id,
    benchmarkProtocolVersion:
      options.declaredBenchmarkProtocolVersion ?? manifestA.benchmark_protocol_version,
    dimensionPolicies: defaultDimensionPolicies(alignment),
  }
  return {
    strategy,
    subject,
    caseA,
    caseB,
    compositionDeclaration,
    composition,
    alignmentDeclaration,
    alignment,
    policyDeclaration,
  }
}

function execute(value: ReturnType<typeof scenario>) {
  return buildSingleStrategyTwoCaseReductionPolicyBinding(
    value.strategy,
    value.compositionDeclaration,
    value.alignmentDeclaration,
    value.policyDeclaration,
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

test("P3-R11 binds exactly seven explicit pair policies without reduction", () => {
  const result = run()
  assert.equal(result.version, P3_R11_POLICY_BINDING_EVIDENCE_VERSION)
  assert.equal(result.kind, P3_R11_POLICY_BINDING_EVIDENCE_KIND)
  assert.match(result.policyBindingEvidenceIdentity, /^sha256:[0-9a-f]{64}$/)
  assert.equal(result.benchmarkId, BENCHMARK_ID)
  assert.equal(result.benchmarkProtocolVersion, BENCHMARK_PROTOCOL_VERSION)
  assert.equal(result.dimensionPolicyBindings.length, P3_R6_DIMENSIONS.length)
  assert.deepEqual(result.dimensionPolicyBindings.map((entry) => entry.dimension), P3_R6_DIMENSIONS)
  assert.notEqual(result.memberAReference.reportEvidenceIdentity, result.memberBReference.reportEvidenceIdentity)
  assert.notEqual(result.memberAReference.p2R2ReportIdentity, result.memberBReference.p2R2ReportIdentity)

  for (const binding of result.dimensionPolicyBindings) {
    assert.equal(binding.metricId, `metric:${binding.dimension}`)
    assert.equal(binding.memberAObservation.metric_id, binding.metricId)
    assert.equal(binding.memberBObservation.metric_id, binding.metricId)
    assert.equal(binding.memberAObservation.unit, binding.unit)
    assert.equal(binding.memberBObservation.unit, binding.unit)
  }

  const forbidden = new Set([
    "reducedValue",
    "reduced_value",
    "mean",
    "average",
    "sum",
    "total",
    "rate",
    "trueCount",
    "true_count",
    "denominatorCount",
    "denominator_count",
    "normalizedValue",
    "weight",
    "score",
    "aggregateScore",
    "delta",
    "higherIsBetter",
    "lowerIsBetter",
    "better",
    "worse",
    "preferred",
    "rank",
    "winner",
    "threshold",
    "pass",
    "fail",
    "accept",
    "reject",
    "promotion",
    "default",
    "confidenceInterval",
    "pValue",
    "effectSize",
  ])
  const keys = collectKeys(result)
  for (const key of forbidden) assert.equal(keys.has(key), false, `forbidden output key: ${key}`)
})

test("P3-R11 accepts explicit numeric and boolean policies but calculates neither mean nor rate", () => {
  const value = scenario({
    caseA: { measurement: { noGold: true } },
    caseB: { measurement: { noGold: true } },
  })
  const result = execute(value)
  const recall = result.dimensionPolicyBindings.find((entry) => entry.dimension === "recall-at-k")!
  const noGold = result.dimensionPolicyBindings.find((entry) => entry.dimension === "no-gold-abstention")!
  assert.equal(recall.valueKind, "NUMBER")
  assert.equal(recall.reducer, "ARITHMETIC_MEAN")
  assert.equal(typeof recall.memberAObservation.value, "number")
  assert.equal(noGold.valueKind, "BOOLEAN")
  assert.equal(noGold.reducer, "BOOLEAN_TRUE_RATE")
  assert.equal(typeof noGold.memberAObservation.value, "boolean")
  assert.equal(typeof noGold.memberBObservation.value, "boolean")
})

test("P3-R11 rejects cross-member benchmark mismatch that canonical R10 accepts", () => {
  const value = scenario({ caseB: { benchmarkId: "other-benchmark" } })
  assert.doesNotThrow(() => buildSingleStrategyTwoCaseMetricAlignment(
    value.strategy,
    value.compositionDeclaration,
    value.alignmentDeclaration,
    value.caseA,
    value.caseB,
  ))
  assert.throws(() => execute(value), /R7 members do not share benchmarkId/)
})

test("P3-R11 rejects cross-member benchmark protocol mismatch that canonical R10 accepts", () => {
  const value = scenario({ caseB: { benchmarkProtocolVersion: "v2" } })
  assert.doesNotThrow(() => buildSingleStrategyTwoCaseMetricAlignment(
    value.strategy,
    value.compositionDeclaration,
    value.alignmentDeclaration,
    value.caseA,
    value.caseB,
  ))
  assert.throws(() => execute(value), /R7 members do not share benchmarkProtocolVersion/)
})

test("P3-R11 binds declared benchmark and protocol to reconstructed R7 truth", () => {
  const wrongBenchmark = scenario({ declaredBenchmarkId: "other-benchmark" })
  assert.throws(() => execute(wrongBenchmark), /policyDeclaration.benchmarkId does not match/)
  const wrongProtocol = scenario({ declaredBenchmarkProtocolVersion: "v2" })
  assert.throws(() => execute(wrongProtocol), /policyDeclaration.benchmarkProtocolVersion does not match/)
})

test("P3-R11 rejects policy metric and unit drift from canonical R10 alignment", () => {
  const metricDrift = scenario()
  metricDrift.policyDeclaration.dimensionPolicies[0] = {
    ...metricDrift.policyDeclaration.dimensionPolicies[0]!,
    metricId: "metric:forged",
  }
  assert.throws(() => execute(metricDrift), /policy metricId does not match canonical R10 alignment/)

  const unitDrift = scenario()
  unitDrift.policyDeclaration.dimensionPolicies[0] = {
    ...unitDrift.policyDeclaration.dimensionPolicies[0]!,
    unit: "percentage",
  }
  assert.throws(() => execute(unitDrift), /policy unit does not match canonical R10 alignment/)
})

test("P3-R11 rejects incompatible reducer/value-kind declarations", () => {
  const value = scenario()
  value.policyDeclaration.dimensionPolicies[0] = {
    ...value.policyDeclaration.dimensionPolicies[0]!,
    valueKind: "BOOLEAN",
    reducer: "ARITHMETIC_MEAN",
  }
  assert.throws(() => execute(value), /reducer\/valueKind combination is incompatible/)
})

test("P3-R11 validates observed numeric and boolean values against explicit value kind", () => {
  const numericAsBoolean = scenario()
  numericAsBoolean.policyDeclaration.dimensionPolicies[0] = {
    ...numericAsBoolean.policyDeclaration.dimensionPolicies[0]!,
    valueKind: "BOOLEAN",
    reducer: "BOOLEAN_TRUE_RATE",
  }
  assert.throws(() => execute(numericAsBoolean), /must contain a boolean observed value under BOOLEAN/)

  const booleanAsNumber = scenario({
    caseA: { measurement: { noGold: true } },
    caseB: { measurement: { noGold: true } },
  })
  const noGoldIndex = P3_R6_DIMENSIONS.indexOf("no-gold-abstention")
  booleanAsNumber.policyDeclaration.dimensionPolicies[noGoldIndex] = {
    ...booleanAsNumber.policyDeclaration.dimensionPolicies[noGoldIndex]!,
    valueKind: "NUMBER",
    reducer: "ARITHMETIC_MEAN",
  }
  assert.throws(() => execute(booleanAsNumber), /must contain a finite numeric observed value under NUMBER/)
})

test("P3-R11 preserves unavailable/null evidence without inferring value kind", () => {
  const result = run()
  const noGold = result.dimensionPolicyBindings.find((entry) => entry.dimension === "no-gold-abstention")!
  assert.equal(noGold.valueKind, "BOOLEAN")
  assert.equal(noGold.memberAObservation.measurement_status, "unavailable")
  assert.equal(noGold.memberAObservation.value, null)
  assert.equal(noGold.memberBObservation.measurement_status, "unavailable")
  assert.equal(noGold.memberBObservation.value, null)
})

test("P3-R11 enforces the bounded two-case missingness/minimum-count policy", () => {
  const requireCompleteBad = scenario()
  requireCompleteBad.policyDeclaration.dimensionPolicies[0] = {
    ...requireCompleteBad.policyDeclaration.dimensionPolicies[0]!,
    missingnessPolicy: "REQUIRE_COMPLETE",
    minimumObservedCount: 1,
  }
  assert.throws(() => execute(requireCompleteBad), /must equal 2 under REQUIRE_COMPLETE/)

  const requireCompleteGood = scenario()
  requireCompleteGood.policyDeclaration.dimensionPolicies[0] = {
    ...requireCompleteGood.policyDeclaration.dimensionPolicies[0]!,
    missingnessPolicy: "REQUIRE_COMPLETE",
    minimumObservedCount: 2,
  }
  assert.doesNotThrow(() => execute(requireCompleteGood))

  const tooLarge = scenario()
  tooLarge.policyDeclaration.dimensionPolicies[0] = {
    ...tooLarge.policyDeclaration.dimensionPolicies[0]!,
    minimumObservedCount: 3,
  }
  assert.throws(() => execute(tooLarge), /no greater than the two-case expected count/)
})

test("P3-R11 requires exact seven-dimension coverage in canonical order", () => {
  const missing = scenario()
  missing.policyDeclaration.dimensionPolicies.pop()
  assert.throws(() => execute(missing), /must contain exactly 7 entries/)

  const reordered = scenario()
  reordered.policyDeclaration.dimensionPolicies.reverse()
  assert.throws(() => execute(reordered), /\.dimension must be recall-at-k/)

  const duplicateSlot = scenario()
  duplicateSlot.policyDeclaration.dimensionPolicies[1] = {
    ...duplicateSlot.policyDeclaration.dimensionPolicies[1]!,
    metricId: duplicateSlot.policyDeclaration.dimensionPolicies[0]!.metricId,
    unit: duplicateSlot.policyDeclaration.dimensionPolicies[0]!.unit,
  }
  assert.throws(() => execute(duplicateSlot), /duplicate metric\/unit policy slot/)
})

test("P3-R11 rejects unknown declaration fields and forged predecessor-shaped fields", () => {
  const unknownTop = scenario()
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionPolicyBinding(
      unknownTop.strategy,
      unknownTop.compositionDeclaration,
      unknownTop.alignmentDeclaration,
      { ...unknownTop.policyDeclaration, score: 1 },
      unknownTop.caseA,
      unknownTop.caseB,
    ),
    /policyDeclaration keys are not canonical/,
  )

  const unknownPolicy = scenario()
  unknownPolicy.policyDeclaration.dimensionPolicies[0] = {
    ...unknownPolicy.policyDeclaration.dimensionPolicies[0]!,
    weight: 1,
  } as P3R11DimensionPolicy
  assert.throws(() => execute(unknownPolicy), /keys are not canonical/)

  const forgedPredecessor = scenario()
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionPolicyBinding(
      forgedPredecessor.strategy,
      forgedPredecessor.compositionDeclaration,
      forgedPredecessor.alignmentDeclaration,
      forgedPredecessor.policyDeclaration,
      { ...forgedPredecessor.caseA, reportEvidence: { forged: true } },
      forgedPredecessor.caseB,
    ),
    /caseAInputs keys are not canonical/,
  )
})

test("P3-R11 binds the exact reconstructed R10 alignment and strategy identities", () => {
  const wrongAlignment = scenario()
  wrongAlignment.policyDeclaration.alignmentEvidenceIdentity = `sha256:${"0".repeat(64)}`
  assert.throws(() => execute(wrongAlignment), /alignmentEvidenceIdentity does not match canonical R10 alignment/)

  const wrongStrategy = scenario()
  wrongStrategy.policyDeclaration.strategySubjectIdentity = "0".repeat(64)
  assert.throws(() => execute(wrongStrategy), /strategySubjectIdentity does not match canonical R10 strategy subject/)
})

test("P3-R11 fails closed when predecessor preimages drift after identity binding", () => {
  const value = scenario()
  const mutableReportDeclaration = value.caseA.reportDeclaration as unknown as { reportBindingId: string }
  mutableReportDeclaration.reportBindingId = "report-binding:forged"
  assert.throws(() => execute(value), /compositionEvidenceIdentity does not match canonical R9 composition/)
})

test("P3-R11 is deterministic and canonical object-key order invariant", () => {
  const value = scenario()
  const first = execute(value)
  const second = execute(value)
  const p = value.policyDeclaration
  const reordered = {
    dimensionPolicies: p.dimensionPolicies.map((entry) => ({
      minimumObservedCount: entry.minimumObservedCount,
      missingnessPolicy: entry.missingnessPolicy,
      reducer: entry.reducer,
      valueKind: entry.valueKind,
      unit: entry.unit,
      metricId: entry.metricId,
      dimension: entry.dimension,
    })),
    benchmarkProtocolVersion: p.benchmarkProtocolVersion,
    benchmarkId: p.benchmarkId,
    strategySubjectIdentity: p.strategySubjectIdentity,
    alignmentEvidenceIdentity: p.alignmentEvidenceIdentity,
    policyBindingId: p.policyBindingId,
    kind: p.kind,
    version: p.version,
  }
  const third = buildSingleStrategyTwoCaseReductionPolicyBinding(
    value.strategy,
    value.compositionDeclaration,
    value.alignmentDeclaration,
    reordered,
    value.caseA,
    value.caseB,
  )
  assert.deepEqual(first, second)
  assert.deepEqual(first, third)
})

test("P3-R11 evidence identity changes when legitimate policy semantics change", () => {
  const firstValue = scenario()
  const first = execute(firstValue)
  const secondValue = scenario()
  secondValue.policyDeclaration.dimensionPolicies[0] = {
    ...secondValue.policyDeclaration.dimensionPolicies[0]!,
    missingnessPolicy: "REQUIRE_COMPLETE",
    minimumObservedCount: 2,
  }
  const second = execute(secondValue)
  assert.notEqual(first.policyBindingEvidenceIdentity, second.policyBindingEvidenceIdentity)
})

test("P3-R11 returns detached deeply frozen evidence and isolates caller mutation", () => {
  const value = scenario()
  const result = execute(value)
  assertDeepFrozen(result)
  assert.notEqual(result.policyDeclaration, value.policyDeclaration)
  assert.notEqual(result.dimensionPolicyBindings[0], value.policyDeclaration.dimensionPolicies[0])

  value.policyDeclaration.policyBindingId = "policy-binding:mutated"
  value.policyDeclaration.dimensionPolicies[0] = {
    ...value.policyDeclaration.dimensionPolicies[0]!,
    metricId: "metric:mutated",
  }
  const mutableMeasurementDeclaration = value.caseA.measurementDeclaration as unknown as { measurementId: string }
  mutableMeasurementDeclaration.measurementId = "measurement:mutated"

  assert.equal(result.policyBindingId, "policy-binding:p3-r11-fixture")
  assert.equal(result.dimensionPolicyBindings[0]?.metricId, "metric:recall-at-k")
})

test("P3-R11 rejects hostile canonical-JSON structures before semantic reuse", () => {
  const value = scenario()
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionPolicyBinding(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      new Proxy(value.policyDeclaration, {}),
      value.caseA,
      value.caseB,
    ),
    /not canonical JSON/,
  )

  const accessor = { ...value.policyDeclaration } as Record<string, unknown>
  Object.defineProperty(accessor, "policyBindingId", {
    enumerable: true,
    get: () => value.policyDeclaration.policyBindingId,
  })
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionPolicyBinding(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      accessor,
      value.caseA,
      value.caseB,
    ),
    /not canonical JSON/,
  )

  const cyclic = clone(value.policyDeclaration) as Record<string, unknown>
  cyclic.self = cyclic
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionPolicyBinding(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      cyclic,
      value.caseA,
      value.caseB,
    ),
    /not canonical JSON/,
  )

  const sparse = clone(value.policyDeclaration)
  const sparsePolicies = new Array(7)
  sparsePolicies[0] = sparse.dimensionPolicies[0]
  sparse.dimensionPolicies = sparsePolicies as P3R11DimensionPolicy[]
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionPolicyBinding(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      sparse,
      value.caseA,
      value.caseB,
    ),
    /not canonical JSON/,
  )

  const nonFinite = clone(value.policyDeclaration)
  const mutableNonFinitePolicy = nonFinite.dimensionPolicies[0] as unknown as { minimumObservedCount: number }
  mutableNonFinitePolicy.minimumObservedCount = Number.POSITIVE_INFINITY
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionPolicyBinding(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      nonFinite,
      value.caseA,
      value.caseB,
    ),
    /not canonical JSON/,
  )
})

test("P3-R11 rejects malformed, missing, and unsupported policy declarations", () => {
  const value = scenario()
  const symbolBearing = { ...value.policyDeclaration } as Record<PropertyKey, unknown>
  symbolBearing[Symbol("hidden")] = true
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionPolicyBinding(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      symbolBearing,
      value.caseA,
      value.caseB,
    ),
    /not canonical JSON/,
  )

  const { policyBindingId: _policyBindingId, ...missingPolicyBindingId } = value.policyDeclaration
  assert.throws(
    () => buildSingleStrategyTwoCaseReductionPolicyBinding(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      missingPolicyBindingId,
      value.caseA,
      value.caseB,
    ),
    /policyDeclaration keys are not canonical/,
  )

  assert.throws(
    () => buildSingleStrategyTwoCaseReductionPolicyBinding(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      { ...value.policyDeclaration, policyBindingId: "bad id" },
      value.caseA,
      value.caseB,
    ),
    /policyDeclaration.policyBindingId must be a bounded canonical stable identifier/,
  )

  assert.throws(
    () => buildSingleStrategyTwoCaseReductionPolicyBinding(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      { ...value.policyDeclaration, version: "unsupported" },
      value.caseA,
      value.caseB,
    ),
    /unsupported policy declaration contract/,
  )
})

test("P3-R11 does not require ambient network, clock, randomness, or environment state", () => {
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

test("P3-R11 does not require ambient filesystem or subprocess side effects", async () => {
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
