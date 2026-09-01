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
  P3_R13_DIRECTION_BINDING_EVIDENCE_KIND,
  P3_R13_DIRECTION_BINDING_EVIDENCE_VERSION,
  P3_R13_DIRECTION_DECLARATION_KIND,
  P3_R13_DIRECTION_DECLARATION_VERSION,
  type P3R13Direction,
} from "../bench/p3-r13/contracts.ts"
import { buildReductionDirectionBindingEvidence } from "../bench/p3-r13/reduction-direction-binding.ts"
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

const STRATEGY_ID = "strategy:p3-r13-fixture"
const BENCHMARK_ID = "kodac-p3-r13-fixture"
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
    taskIdentity: `task:p3-r13-case-${seed}`,
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
    corpus_id: `p3-r13-development-${seed}`,
    corpus_role: "development",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 1 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r13-development-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [
      {
        case_id: `p3-r13-case-${seed}`,
        task_family: "context-selection",
        payload: { purpose: `direction-binding-${seed}` },
      },
    ],
  } as const
}

function holdout(seed: number) {
  return {
    schema_version: "p2-r1-fixture/v1",
    corpus_id: `p3-r13-holdout-${seed}`,
    corpus_role: "holdout",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 2 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r13-holdout-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [
      {
        case_id: `p3-r13-holdout-case-${seed}`,
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
      bindingId: `binding:p3-r13-case-${seed}`,
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

function scenario(options: { readonly caseA?: CaseOptions; readonly caseB?: CaseOptions } = {}) {
  const strategy = strategyDeclaration()
  const subject = buildContextStrategySubject(strategy)
  const caseA = caseInputs(1, strategy, subject.strategySubjectIdentity, options.caseA)
  const caseB = caseInputs(2, strategy, subject.strategySubjectIdentity, options.caseB)
  const manifestA = caseA.manifest[0]
  const manifestB = caseB.manifest[0]
  const compositionDeclaration = {
    version: P3_R9_COMPOSITION_DECLARATION_VERSION,
    kind: P3_R9_COMPOSITION_DECLARATION_KIND,
    compositionId: "composition:p3-r13-fixture",
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
    alignmentId: "alignment:p3-r13-fixture",
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
    policyBindingId: "policy-binding:p3-r13-fixture",
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
      reductionId: "reduction:p3-r13-fixture",
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

function reconstructR12(value: ReturnType<typeof scenario>) {
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

function makeDirectionDeclaration(
  value: ReturnType<typeof scenario>,
  directionForIndex: (index: number) => P3R13Direction = (index) =>
    index % 2 === 0 ? "HIGHER_IS_BETTER" : "LOWER_IS_BETTER",
) {
  const reductionEvidence = reconstructR12(value)
  return {
    version: P3_R13_DIRECTION_DECLARATION_VERSION,
    kind: P3_R13_DIRECTION_DECLARATION_KIND,
    directionBindingId: "direction-binding:p3-r13-fixture",
    reductionEvidenceIdentity: reductionEvidence.reductionEvidenceIdentity,
    strategySubjectIdentity: reductionEvidence.strategySubjectIdentity,
    benchmarkId: reductionEvidence.benchmarkId,
    benchmarkProtocolVersion: reductionEvidence.benchmarkProtocolVersion,
    dimensionDirections: reductionEvidence.dimensionReductions.map((entry, index) => ({
      dimension: entry.dimension,
      metricId: entry.metricId,
      inputUnit: entry.inputUnit,
      outputUnit: entry.outputUnit,
      valueKind: entry.valueKind,
      reducer: entry.reducer,
      missingnessPolicy: entry.missingnessPolicy,
      minimumObservedCount: entry.minimumObservedCount,
      direction: directionForIndex(index),
    })),
  }
}

function execute(
  value: ReturnType<typeof scenario>,
  directionDeclaration: ReturnType<typeof makeDirectionDeclaration> = makeDirectionDeclaration(value),
) {
  return buildReductionDirectionBindingEvidence(
    value.strategy,
    value.compositionDeclaration,
    value.alignmentDeclaration,
    value.policyDeclaration,
    value.reductionDeclaration,
    directionDeclaration,
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

const OUTPUT_KEYS = [
  "version",
  "kind",
  "directionBindingEvidenceIdentity",
  "directionDeclaration",
  "directionBindingId",
  "reductionEvidenceIdentity",
  "strategySubjectIdentity",
  "benchmarkId",
  "benchmarkProtocolVersion",
  "reductionEvidence",
  "dimensionDirectionBindings",
].sort()

const ENTRY_KEYS = [
  "dimension",
  "metricId",
  "inputUnit",
  "outputUnit",
  "valueKind",
  "reducer",
  "missingnessPolicy",
  "minimumObservedCount",
  "direction",
].sort()

test("P3-R13 reconstructs canonical R12 and binds exactly seven explicit directions deterministically", () => {
  const value = scenario()
  const declaration = makeDirectionDeclaration(value)
  const expectedR12 = reconstructR12(value)
  const first = execute(value, declaration)
  const second = execute(value, clone(declaration))

  assert.equal(first.version, P3_R13_DIRECTION_BINDING_EVIDENCE_VERSION)
  assert.equal(first.kind, P3_R13_DIRECTION_BINDING_EVIDENCE_KIND)
  assert.match(first.directionBindingEvidenceIdentity, /^sha256:[0-9a-f]{64}$/)
  assert.equal(first.directionBindingEvidenceIdentity, second.directionBindingEvidenceIdentity)
  assert.deepEqual(first.reductionEvidence, expectedR12)
  assert.notEqual(first.reductionEvidence, expectedR12)
  assert.equal(first.reductionEvidenceIdentity, expectedR12.reductionEvidenceIdentity)
  assert.deepEqual(first.dimensionDirectionBindings.map((entry) => entry.dimension), P3_R6_DIMENSIONS)
  assert.equal(first.dimensionDirectionBindings.length, 7)
  assert.deepEqual(Object.keys(first).sort(), OUTPUT_KEYS)
  for (let index = 0; index < first.dimensionDirectionBindings.length; index += 1) {
    assert.deepEqual(Object.keys(first.dimensionDirectionBindings[index]!).sort(), ENTRY_KEYS)
    assert.deepEqual(first.dimensionDirectionBindings[index], first.directionDeclaration.dimensionDirections[index])
    assert.notEqual(first.dimensionDirectionBindings[index], first.directionDeclaration.dimensionDirections[index])
  }
})

test("P3-R13 public builder enforces the exact semantic argument order", () => {
  const value = scenario()
  const declaration = makeDirectionDeclaration(value)
  assert.throws(
    () => buildReductionDirectionBindingEvidence(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      value.policyDeclaration,
      declaration,
      value.reductionDeclaration,
      value.caseA,
      value.caseB,
    ),
    /P3-R12 contract violation|directionDeclaration keys are not canonical/,
  )
})

test("P3-R13 accepts only the two explicit direction literals and identity changes when one direction changes", () => {
  const value = scenario()
  const allHigher = makeDirectionDeclaration(value, () => "HIGHER_IS_BETTER")
  const allLower = makeDirectionDeclaration(value, () => "LOWER_IS_BETTER")
  const higherEvidence = execute(value, allHigher)
  const lowerEvidence = execute(value, allLower)
  assert.equal(higherEvidence.dimensionDirectionBindings.every((entry) => entry.direction === "HIGHER_IS_BETTER"), true)
  assert.equal(lowerEvidence.dimensionDirectionBindings.every((entry) => entry.direction === "LOWER_IS_BETTER"), true)
  assert.notEqual(higherEvidence.directionBindingEvidenceIdentity, lowerEvidence.directionBindingEvidenceIdentity)

  const oneChanged = clone(allHigher)
  oneChanged.dimensionDirections[0]!.direction = "LOWER_IS_BETTER"
  assert.notEqual(execute(value, oneChanged).directionBindingEvidenceIdentity, higherEvidence.directionBindingEvidenceIdentity)

  const invalid = clone(allHigher) as unknown as { dimensionDirections: Array<Record<string, unknown>> }
  invalid.dimensionDirections[0]!.direction = "AUTO_INFER"
  assert.throws(() => execute(value, invalid as never), /must be HIGHER_IS_BETTER or LOWER_IS_BETTER/)
})

test("P3-R13 fails closed on missing, extra, duplicate, or reordered canonical dimensions", () => {
  const value = scenario()
  const baseline = makeDirectionDeclaration(value)

  const missing = clone(baseline)
  missing.dimensionDirections.pop()
  assert.throws(() => execute(value, missing), /must contain exactly seven entries/)

  const extra = clone(baseline)
  extra.dimensionDirections.push(clone(extra.dimensionDirections[0]!))
  assert.throws(() => execute(value, extra), /must contain exactly seven entries/)

  const duplicate = clone(baseline)
  duplicate.dimensionDirections[1] = clone(duplicate.dimensionDirections[0]!)
  assert.throws(() => execute(value, duplicate), /must preserve canonical P3-R6 order/)

  const reordered = clone(baseline)
  ;[reordered.dimensionDirections[0], reordered.dimensionDirections[1]] = [
    reordered.dimensionDirections[1]!,
    reordered.dimensionDirections[0]!,
  ]
  assert.throws(() => execute(value, reordered), /must preserve canonical P3-R6 order/)
})

test("P3-R13 fails closed on every non-direction semantic drift from trusted R12", () => {
  const mutations: Array<[string, unknown]> = [
    ["metricId", "metric:forged"],
    ["inputUnit", "forged-input-unit"],
    ["outputUnit", "forged-output-unit"],
    ["valueKind", "BOOLEAN"],
    ["reducer", "BOOLEAN_TRUE_RATE"],
    ["missingnessPolicy", "REQUIRE_COMPLETE"],
    ["minimumObservedCount", 2],
  ]
  for (const [field, replacement] of mutations) {
    const value = scenario()
    const declaration = makeDirectionDeclaration(value) as unknown as {
      dimensionDirections: Array<Record<string, unknown>>
    }
    declaration.dimensionDirections[0]![field] = replacement
    assert.throws(
      () => execute(value, declaration as never),
      new RegExp(`${field} does not match canonical P3-R12 evidence`),
      field,
    )
  }
})

test("P3-R13 cross-binds R12 identity, strategy subject, benchmark, and protocol", () => {
  const cases: Array<[string, string]> = [
    ["reductionEvidenceIdentity", `sha256:${"0".repeat(64)}`],
    ["strategySubjectIdentity", "0".repeat(64)],
    ["benchmarkId", "other-benchmark"],
    ["benchmarkProtocolVersion", "v2"],
  ]
  for (const [field, replacement] of cases) {
    const value = scenario()
    const declaration = makeDirectionDeclaration(value) as unknown as Record<string, unknown>
    declaration[field] = replacement
    assert.throws(
      () => execute(value, declaration as never),
      new RegExp(`${field} does not match canonical P3-R12 evidence`),
      field,
    )
  }
})

test("P3-R13 enforces exact declaration keys, literals, and rejects serialized R12 substitution", () => {
  const value = scenario()
  const declaration = makeDirectionDeclaration(value)

  assert.throws(() => execute(value, { ...declaration, score: 1 } as never), /directionDeclaration keys are not canonical/)
  const { benchmarkId: _removed, ...missingKey } = declaration
  assert.throws(() => execute(value, missingKey as never), /directionDeclaration keys are not canonical/)
  assert.throws(() => execute(value, { ...declaration, version: "p3-r13-v2" } as never), /unsupported direction declaration contract/)
  assert.throws(() => execute(value, { ...declaration, kind: "compare_reductions" } as never), /unsupported direction declaration contract/)
  assert.throws(
    () => execute(value, { ...declaration, reductionEvidence: reconstructR12(value) } as never),
    /directionDeclaration keys are not canonical/,
  )
})

test("P3-R13 reconstructs R12 from original predecessor preimages and detects later preimage drift", () => {
  const value = scenario()
  const declaration = makeDirectionDeclaration(value)
  const mutableReport = value.caseA.reportDeclaration as unknown as { reportBindingId: string }
  mutableReport.reportBindingId = "report-binding:forged"
  assert.throws(
    () => execute(value, declaration),
    /P3-R9 contract violation|compositionEvidenceIdentity does not match canonical R9 composition/,
  )
})

test("P3-R13 preserves complete INSUFFICIENT_EVIDENCE state while binding direction", () => {
  const value = scenario()
  const declaration = makeDirectionDeclaration(value)
  const expectedR12 = reconstructR12(value)
  const result = execute(value, declaration)
  const index = P3_R6_DIMENSIONS.indexOf("no-gold-abstention")
  const expected = expectedR12.dimensionReductions[index]!
  const actual = result.reductionEvidence.dimensionReductions[index]!

  assert.equal(expected.status, "INSUFFICIENT_EVIDENCE")
  assert.deepEqual(actual, expected)
  assert.equal(actual.reducedValue, null)
  assert.equal(actual.observedCount, 0)
  assert.equal(actual.unavailableCount, 2)
  assert.equal(actual.trueCount, 0)
  assert.equal(actual.denominatorCount, 0)
  assert.equal(result.dimensionDirectionBindings[index]!.direction, declaration.dimensionDirections[index]!.direction)
})

test("P3-R13 emits no comparison, relation, ranking, promotion, or global-score semantics", () => {
  const result = execute(scenario())
  const forbidden = new Set([
    "delta",
    "rawDelta",
    "raw_delta",
    "leftValue",
    "rightValue",
    "leftSubject",
    "rightSubject",
    "relation",
    "favored",
    "better",
    "worse",
    "rank",
    "ranking",
    "leaderboard",
    "promotion",
    "winner",
    "default",
    "aggregateScore",
    "aggregate_score",
    "globalScore",
    "weight",
    "threshold",
    "target",
    "tolerance",
    "epsilon",
    "confidence",
    "significance",
  ])
  const keys = collectKeys(result)
  for (const key of forbidden) assert.equal(keys.has(key), false, `forbidden output key: ${key}`)
})

test("P3-R13 canonical identity is object-key-order invariant while array order remains semantic", () => {
  const value = scenario()
  const declaration = makeDirectionDeclaration(value)
  const baseline = execute(value, declaration)
  const reorderedEntries = declaration.dimensionDirections.map((entry) => ({
    direction: entry.direction,
    minimumObservedCount: entry.minimumObservedCount,
    missingnessPolicy: entry.missingnessPolicy,
    reducer: entry.reducer,
    valueKind: entry.valueKind,
    outputUnit: entry.outputUnit,
    inputUnit: entry.inputUnit,
    metricId: entry.metricId,
    dimension: entry.dimension,
  }))
  const reorderedRoot = {
    dimensionDirections: reorderedEntries,
    benchmarkProtocolVersion: declaration.benchmarkProtocolVersion,
    benchmarkId: declaration.benchmarkId,
    strategySubjectIdentity: declaration.strategySubjectIdentity,
    reductionEvidenceIdentity: declaration.reductionEvidenceIdentity,
    directionBindingId: declaration.directionBindingId,
    kind: declaration.kind,
    version: declaration.version,
  }
  assert.equal(execute(value, reorderedRoot).directionBindingEvidenceIdentity, baseline.directionBindingEvidenceIdentity)

  const wrongArrayOrder = clone(declaration)
  ;[wrongArrayOrder.dimensionDirections[0], wrongArrayOrder.dimensionDirections[1]] = [
    wrongArrayOrder.dimensionDirections[1]!,
    wrongArrayOrder.dimensionDirections[0]!,
  ]
  assert.throws(() => execute(value, wrongArrayOrder), /must preserve canonical P3-R6 order/)
})

test("P3-R13 rejects hostile Proxy, accessor, symbol, sparse, and non-plain structures at the boundary", () => {
  const value = scenario()
  const declaration = makeDirectionDeclaration(value)

  const proxied = new Proxy(clone(declaration), {})
  assert.throws(() => execute(value, proxied as never), /must not be a Proxy/)

  const accessor = clone(declaration) as unknown as Record<string, unknown>
  Object.defineProperty(accessor, "benchmarkId", { enumerable: true, configurable: true, get: () => BENCHMARK_ID })
  assert.throws(() => execute(value, accessor as never), /must be an enumerable data property/)

  const withSymbol = clone(declaration) as unknown as Record<PropertyKey, unknown>
  withSymbol[Symbol("forged")] = true
  assert.throws(() => execute(value, withSymbol as never), /must not contain symbol fields/)

  const sparse = clone(declaration) as unknown as { dimensionDirections: unknown[] }
  sparse.dimensionDirections = new Array(P3_R6_DIMENSIONS.length)
  sparse.dimensionDirections[0] = declaration.dimensionDirections[0]
  assert.throws(() => execute(value, sparse as never), /must be a present enumerable data property/)

  const nonPlain = Object.assign(Object.create({ inherited: true }), clone(declaration))
  assert.throws(() => execute(value, nonPlain as never), /must be a plain object/)
})

test("P3-R13 returns detached deeply frozen evidence immune to later caller mutation", () => {
  const value = scenario()
  const declaration = makeDirectionDeclaration(value)
  const result = execute(value, declaration)
  const before = JSON.stringify(result)

  declaration.directionBindingId = "direction-binding:mutated"
  declaration.dimensionDirections[0]!.direction = "LOWER_IS_BETTER"
  ;(value.caseA.reportDeclaration as unknown as { reportBindingId: string }).reportBindingId = "report-binding:mutated"

  assert.equal(JSON.stringify(result), before)
  assertDeepFrozen(result)
})

test("P3-R13 identity is self-reference-free and covers the complete normalized output projection", () => {
  const result = execute(scenario())
  const { directionBindingEvidenceIdentity, ...projection } = result
  assert.equal(directionBindingEvidenceIdentity, sha256Canonical(projection))
  assert.equal(JSON.stringify(projection).includes(directionBindingEvidenceIdentity), false)
})

test("P3-R13 deterministic identity ignores ambient environment and time noise", () => {
  const value = scenario()
  const declaration = makeDirectionDeclaration(value)
  const previous = process.env.KODAC_P3_R13_AMBIENT_NOISE
  try {
    process.env.KODAC_P3_R13_AMBIENT_NOISE = "first"
    const first = execute(value, declaration)
    process.env.KODAC_P3_R13_AMBIENT_NOISE = `second-${Date.now()}-${process.pid}`
    const second = execute(value, declaration)
    assert.equal(first.directionBindingEvidenceIdentity, second.directionBindingEvidenceIdentity)
  } finally {
    if (previous === undefined) delete process.env.KODAC_P3_R13_AMBIENT_NOISE
    else process.env.KODAC_P3_R13_AMBIENT_NOISE = previous
  }
})

test("P3-R13 performs no real benchmark, provider, model, evaluator, or network execution", async () => {
  const value = scenario()
  const manifests = [value.caseA.manifest[0], value.caseB.manifest[0]]
  for (const manifest of manifests) {
    assert.equal(manifest.provider_id, "not-applicable")
    assert.equal(manifest.provider_version, "not-applicable")
    assert.equal(manifest.model_id, "not-applicable")
    assert.equal(manifest.model_version, "not-applicable")
    assert.equal(manifest.evaluator_id, "not-applicable")
    assert.equal(manifest.evaluator_version, "not-applicable")
    assert.equal(manifest.execution_environment_id, "not-applicable")
  }
  assert.equal(buildReductionDirectionBindingEvidence.length, 8)

  const fetchDescriptor = Object.getOwnPropertyDescriptor(globalThis, "fetch")
  assert.notEqual(fetchDescriptor, undefined)
  let fetchCalls = 0
  Object.defineProperty(globalThis, "fetch", {
    configurable: true,
    writable: true,
    value: async () => {
      fetchCalls += 1
      throw new Error("P3-R13 attempted unexpected network execution")
    },
  })

  try {
    const result = execute(value)
    assert.equal(result.kind, P3_R13_DIRECTION_BINDING_EVIDENCE_KIND)
    assert.equal(fetchCalls, 0)
  } finally {
    Object.defineProperty(globalThis, "fetch", fetchDescriptor!)
  }
})

test("P3-R13 snapshots both case inputs before semantic direction normalization", () => {
  const value = scenario()
  const malformedDirection = clone(makeDirectionDeclaration(value)) as unknown as {
    dimensionDirections: Array<Record<string, unknown>>
  }
  malformedDirection.dimensionDirections[0]!.direction = "AUTO_INFER"

  const hostileCaseA = new Proxy(clone(value.caseA), {})
  assert.throws(
    () => buildReductionDirectionBindingEvidence(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      value.policyDeclaration,
      value.reductionDeclaration,
      malformedDirection,
      hostileCaseA,
      value.caseB,
    ),
    /caseAInputs is not canonical JSON:.*must not be a Proxy/,
  )

  const hostileCaseB = new Proxy(clone(value.caseB), {})
  assert.throws(
    () => buildReductionDirectionBindingEvidence(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      value.policyDeclaration,
      value.reductionDeclaration,
      malformedDirection,
      value.caseA,
      hostileCaseB,
    ),
    /caseBInputs is not canonical JSON:.*must not be a Proxy/,
  )
})

test("P3-R13 identity excludes instrumented process, working-path, time, and environment values", () => {
  const value = scenario()
  const declaration = makeDirectionDeclaration(value)
  const pidDescriptor = Object.getOwnPropertyDescriptor(process, "pid")
  const cwdDescriptor = Object.getOwnPropertyDescriptor(process, "cwd")
  const nowDescriptor = Object.getOwnPropertyDescriptor(Date, "now")
  assert.notEqual(pidDescriptor, undefined)
  assert.notEqual(cwdDescriptor, undefined)
  assert.notEqual(nowDescriptor, undefined)
  const previous = process.env.KODAC_P3_R13_AMBIENT_NOISE

  try {
    Object.defineProperty(process, "pid", { ...pidDescriptor!, value: 101_001 })
    Object.defineProperty(process, "cwd", { ...cwdDescriptor!, value: () => "/synthetic/p3-r13/a" })
    Object.defineProperty(Date, "now", { ...nowDescriptor!, value: () => 1_700_000_000_001 })
    process.env.KODAC_P3_R13_AMBIENT_NOISE = "ambient-a"
    const first = execute(value, declaration)

    Object.defineProperty(process, "pid", { ...pidDescriptor!, value: 202_002 })
    Object.defineProperty(process, "cwd", { ...cwdDescriptor!, value: () => "/synthetic/p3-r13/b" })
    Object.defineProperty(Date, "now", { ...nowDescriptor!, value: () => 1_800_000_000_002 })
    process.env.KODAC_P3_R13_AMBIENT_NOISE = "ambient-b"
    const second = execute(value, declaration)

    assert.equal(first.directionBindingEvidenceIdentity, second.directionBindingEvidenceIdentity)
  } finally {
    Object.defineProperty(process, "pid", pidDescriptor!)
    Object.defineProperty(process, "cwd", cwdDescriptor!)
    Object.defineProperty(Date, "now", nowDescriptor!)
    if (previous === undefined) delete process.env.KODAC_P3_R13_AMBIENT_NOISE
    else process.env.KODAC_P3_R13_AMBIENT_NOISE = previous
  }
})

test("P3-R13 directly traps forbidden network and subprocess execution channels", async () => {
  const value = scenario()
  const { createRequire, syncBuiltinESMExports } = await import("node:module")
  const require = createRequire(import.meta.url)
  const http = require("node:http") as Record<string, unknown>
  const https = require("node:https") as Record<string, unknown>
  const net = require("node:net") as Record<string, unknown>
  const childProcess = require("node:child_process") as Record<string, unknown>

  const targets: Array<{ module: Record<string, unknown>; key: string; label: string }> = [
    { module: http, key: "request", label: "http.request" },
    { module: http, key: "get", label: "http.get" },
    { module: https, key: "request", label: "https.request" },
    { module: https, key: "get", label: "https.get" },
    { module: net, key: "connect", label: "net.connect" },
    { module: net, key: "createConnection", label: "net.createConnection" },
    { module: childProcess, key: "spawn", label: "child_process.spawn" },
    { module: childProcess, key: "spawnSync", label: "child_process.spawnSync" },
    { module: childProcess, key: "exec", label: "child_process.exec" },
    { module: childProcess, key: "execSync", label: "child_process.execSync" },
    { module: childProcess, key: "execFile", label: "child_process.execFile" },
    { module: childProcess, key: "execFileSync", label: "child_process.execFileSync" },
    { module: childProcess, key: "fork", label: "child_process.fork" },
  ]
  const originals = targets.map((target) => ({
    ...target,
    descriptor: Object.getOwnPropertyDescriptor(target.module, target.key),
  }))
  for (const original of originals) assert.notEqual(original.descriptor, undefined, original.label)

  const counts = new Map(targets.map((target) => [target.label, 0]))
  const fetchDescriptor = Object.getOwnPropertyDescriptor(globalThis, "fetch")
  assert.notEqual(fetchDescriptor, undefined)
  let fetchCalls = 0
  const trap = (label: string) => (..._args: unknown[]) => {
    counts.set(label, (counts.get(label) ?? 0) + 1)
    throw new Error(`P3-R13 attempted forbidden execution through ${label}`)
  }

  try {
    for (const original of originals) {
      Object.defineProperty(original.module, original.key, {
        ...original.descriptor!,
        value: trap(original.label),
      })
    }
    syncBuiltinESMExports()
    Object.defineProperty(globalThis, "fetch", {
      ...fetchDescriptor!,
      value: async () => {
        fetchCalls += 1
        throw new Error("P3-R13 attempted forbidden execution through fetch")
      },
    })

    const result = execute(value)
    assert.equal(result.kind, P3_R13_DIRECTION_BINDING_EVIDENCE_KIND)
    assert.equal(fetchCalls, 0)
    for (const [label, count] of counts) assert.equal(count, 0, label)
  } finally {
    Object.defineProperty(globalThis, "fetch", fetchDescriptor!)
    for (const original of [...originals].reverse()) {
      Object.defineProperty(original.module, original.key, original.descriptor!)
    }
    syncBuiltinESMExports()
  }
})
