import assert from "node:assert/strict"
import test from "node:test"

import {
  deriveResultIdentity,
  sha256Canonical,
  type P2R1ManifestRecord,
} from "../bench/p2-r1/contract.ts"
import {
  P2_R2_OBSERVATION_SCHEMA,
  runP2R2Report,
  type P2R2Observation,
  type P2R2Report,
} from "../bench/p2-r2/runner.ts"
import {
  P2_R3_METRIC_POLICY_SCHEMA,
  P2_R3_POLICY_SCHEMA,
  summarizeP2R3,
  type P2R3PolicyDocument,
  type P2R3Summary,
} from "../bench/p2-r3/summary.ts"
import {
  P2_R4_METRIC_DIRECTION_SCHEMA,
  P2_R4_POLICY_SCHEMA,
  P2_R4_SHARED_EVALUATION_CONTEXT_SCHEMA,
  P2_R4_SUBJECT_SCHEMA,
  type P2R4ComparisonPolicy,
  type P2R4SharedEvaluationContext,
  type P2R4SubjectDescriptor,
} from "../bench/p2-r4/comparison.ts"
import {
  P3_R3_CONTEXT_EVIDENCE_DIMENSIONS,
  P3_R3_EVIDENCE_DECLARATION_KIND,
  P3_R3_EVIDENCE_DECLARATION_VERSION,
  P3_R3_P3_R2_IMPLEMENTATION_MERGE,
  type P3R3EvidenceDeclaration,
} from "../bench/p3-r3/contracts.ts"
import {
  P3_R4_PROVENANCE_DECLARATION_KIND,
  P3_R4_PROVENANCE_DECLARATION_VERSION,
} from "../bench/p3-r4/contracts.ts"
import { buildContextPolicyBenchmarkProvenanceEvidence } from "../bench/p3-r4/context-policy-provenance.ts"
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
  type P3R16AllowedRelation,
  type P3R16CriterionDeclaration,
} from "../bench/p3-r16/contracts.ts"
import { buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence } from "../bench/p3-r16/declared-directional-relation-criterion-match.ts"
import {
  P3_R17_QUALIFICATION_DECLARATION_KIND,
  P3_R17_QUALIFICATION_DECLARATION_VERSION,
  P3_R17_SUBSTRATE_QUALIFICATION_EVIDENCE_KIND,
  P3_R17_SUBSTRATE_QUALIFICATION_EVIDENCE_VERSION,
  type P3R17QualificationDeclaration,
} from "../bench/p3-r17/contracts.ts"
import { buildLateChainBenchmarkProvenanceSubstrateQualificationEvidence } from "../bench/p3-r17/late-chain-benchmark-provenance-substrate-qualification.ts"
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

const BENCHMARK_ID = "kodac-p3-r17-fixture"
const BENCHMARK_PROTOCOL_VERSION = "v1"
const CRITERION_POLICY_IDENTITY = `sha256:${"a".repeat(64)}`
const QUALIFICATION_POLICY_IDENTITY = `sha256:${"b".repeat(64)}`

type MeasurementOptions = {
  readonly utilizedCount?: number
  readonly noGold?: boolean
}

type LatePairOptions = {
  readonly leftA?: MeasurementOptions
  readonly leftB?: MeasurementOptions
  readonly rightA?: MeasurementOptions
  readonly rightB?: MeasurementOptions
  readonly mixedCasePolicy?: boolean
}

type Scenario = {
  readonly strategy: ContextStrategyDeclaration
  readonly caseA: Record<string, unknown>
  readonly caseB: Record<string, unknown>
  readonly bundle: P3R14ReconstructionBundle
}

type CorpusOptions = {
  readonly benchmarkId?: string
  readonly benchmarkProtocolVersion?: string
  readonly caseAId?: string
  readonly caseBId?: string
  readonly caseAPayloadTag?: string
  readonly includeA?: boolean
  readonly includeB?: boolean
  readonly includeExtra?: boolean
}

type ProvenanceOptions = CorpusOptions & {
  readonly swapPolicies?: boolean
  readonly unrelatedPolicies?: boolean
  readonly sharedSeed?: string
}

type Mutable<T> = T extends readonly (infer U)[]
  ? Mutable<U>[]
  : T extends object
    ? { -readonly [K in keyof T]: Mutable<T[K]> }
    : T

function clone<T>(value: T): Mutable<T> {
  return structuredClone(value) as Mutable<T>
}

function hex(char: string): string {
  return char.repeat(64)
}

function identity(seed: string): string {
  return sha256Canonical({ seed })
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

function candidate(index: number, repositoryIdentity: string, snapshotIdentity: string, contentIdentity: string): ContextSelectionCandidateInput {
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

function request(seed = "base"): ContextSelectionPlanRequest {
  const repositoryIdentity = seed === "base" ? hex("1") : hex("4")
  const snapshotIdentity = seed === "base" ? hex("2") : hex("5")
  const contentIdentity = seed === "base" ? hex("3") : hex("6")
  return {
    version: P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
    kind: P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
    taskIdentity: `task:p3-r17-${seed}`,
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

function policy(planRequest: ContextSelectionPlanRequest, strategy: ContextStrategyDeclaration): DeclaredContextSelectionPolicy {
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

function corpus(options: CorpusOptions = {}) {
  const caseAId = options.caseAId ?? "p3-r17-case-a"
  const caseBId = options.caseBId ?? "p3-r17-case-b"
  const development = {
    schema_version: "p2-r1-fixture/v1",
    corpus_id: "p3-r17-development",
    corpus_role: "development",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 1 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: "packages/kodac-runtime/test/fixtures/p2-r1/p3-r17-development.json",
    },
    contamination_status: "none-known",
    cases: [
      ...(options.includeA === false ? [] : [{
        case_id: caseAId,
        task_family: "context-selection",
        payload: { purpose: options.caseAPayloadTag ?? "p3-r17-a" },
      }]),
      ...(options.includeExtra ? [{
        case_id: "p3-r17-case-extra",
        task_family: "context-selection",
        payload: { purpose: "p3-r17-extra" },
      }] : []),
    ],
  } as const
  const holdout = {
    schema_version: "p2-r1-fixture/v1",
    corpus_id: "p3-r17-holdout",
    corpus_role: "holdout",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 2 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: "packages/kodac-runtime/test/fixtures/p2-r1/p3-r17-holdout.json",
    },
    contamination_status: "none-known",
    cases: options.includeB === false ? [] : [{
      case_id: caseBId,
      task_family: "context-selection",
      payload: { purpose: "p3-r17-b" },
    }],
  } as const
  return { development, holdout }
}

function manifestRecord(
  role: "development" | "holdout",
  docs: ReturnType<typeof corpus>,
  options: CorpusOptions = {},
  caseIdOverride?: string,
): P2R1ManifestRecord {
  const source = role === "development" ? docs.development : docs.holdout
  const caseId = caseIdOverride ?? (role === "development" ? options.caseAId ?? "p3-r17-case-a" : options.caseBId ?? "p3-r17-case-b")
  const fixtureCase = source.cases.find((entry) => entry.case_id === caseId)
  if (!fixtureCase) throw new Error(`missing fixture case ${caseId}`)
  const withoutIdentity = {
    schema_version: "p2-r1-manifest/v1",
    benchmark_id: options.benchmarkId ?? BENCHMARK_ID,
    benchmark_protocol_version: options.benchmarkProtocolVersion ?? BENCHMARK_PROTOCOL_VERSION,
    corpus_id: docs.development.corpus_id,
    corpus_digest: sha256Canonical(docs.development),
    corpus_role: role,
    development_freeze_anchor: docs.development.chronology_anchor,
    holdout_id: docs.holdout.corpus_id,
    holdout_digest: sha256Canonical(docs.holdout),
    holdout_chronology_anchor: docs.holdout.chronology_anchor,
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
    source_provenance: source.source_provenance,
    contamination_status: "none-known" as const,
    metric_definitions: metricDefinitions().map((entry) => ({ ...entry })),
  }
  return { ...withoutIdentity, result_identity: deriveResultIdentity(withoutIdentity) }
}

function baseRecords() {
  const docs = corpus()
  return {
    docs,
    a: manifestRecord("development", docs),
    b: manifestRecord("holdout", docs),
  }
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
  manifest: P2R1ManifestRecord,
  docs: ReturnType<typeof corpus>,
  planRequest: ContextSelectionPlanRequest,
  declaredPolicy: DeclaredContextSelectionPolicy,
  strategy: ContextStrategyDeclaration,
  subjectIdentity: string,
  measurementOptions: MeasurementOptions,
) {
  return {
    planRequest,
    policy: declaredPolicy,
    manifest: [manifest],
    development: docs.development,
    holdout: docs.holdout,
    measurementDeclaration: measurementDeclaration(planRequest, declaredPolicy, manifest, strategy.strategyId, measurementOptions),
    reportDeclaration: reportDeclaration(manifest, strategy.strategyId),
    bindingDeclaration: {
      version: P3_R8_BINDING_DECLARATION_VERSION,
      kind: P3_R8_BINDING_DECLARATION_KIND,
      bindingId: `binding:${strategy.strategyId}:${manifest.case_id}`,
      strategySubjectIdentity: subjectIdentity,
    },
  }
}

function defaultDimensionPolicies(alignment: ReturnType<typeof buildSingleStrategyTwoCaseMetricAlignment>): P3R11DimensionPolicy[] {
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

function makeScenario(
  strategyId: string,
  docs: ReturnType<typeof corpus>,
  records: { a: P2R1ManifestRecord; b: P2R1ManifestRecord },
  optionsA: MeasurementOptions,
  optionsB: MeasurementOptions,
  mixedCasePolicy = false,
): Scenario {
  const strategy = strategyDeclaration(strategyId)
  const subject = buildContextStrategySubject(strategy)
  const requestA = request("base")
  const requestB = mixedCasePolicy ? request("alternate") : requestA
  const policyA = policy(requestA, strategy)
  const policyB = policy(requestB, strategy)
  const caseA = caseInputs(records.a, docs, requestA, policyA, strategy, subject.strategySubjectIdentity, optionsA)
  const caseB = caseInputs(records.b, docs, requestB, policyB, strategy, subject.strategySubjectIdentity, optionsB)
  const compositionDeclaration = {
    version: P3_R9_COMPOSITION_DECLARATION_VERSION,
    kind: P3_R9_COMPOSITION_DECLARATION_KIND,
    compositionId: `composition:${strategyId}`,
    strategySubjectIdentity: subject.strategySubjectIdentity,
    memberA: { memberId: "member:a", caseId: records.a.case_id, r1ResultIdentity: records.a.result_identity },
    memberB: { memberId: "member:b", caseId: records.b.case_id, r1ResultIdentity: records.b.result_identity },
  }
  const composition = composeSingleStrategyTwoCaseReports(strategy, compositionDeclaration, caseA, caseB)
  const alignmentDeclaration = {
    version: P3_R10_ALIGNMENT_DECLARATION_VERSION,
    kind: P3_R10_ALIGNMENT_DECLARATION_KIND,
    alignmentId: `alignment:${strategyId}`,
    compositionEvidenceIdentity: composition.compositionEvidenceIdentity,
    strategySubjectIdentity: composition.strategySubjectIdentity,
  }
  const alignment = buildSingleStrategyTwoCaseMetricAlignment(strategy, compositionDeclaration, alignmentDeclaration, caseA, caseB)
  const policyDeclaration = {
    version: P3_R11_POLICY_DECLARATION_VERSION,
    kind: P3_R11_POLICY_DECLARATION_KIND,
    policyBindingId: `policy-binding:${strategyId}`,
    alignmentEvidenceIdentity: alignment.alignmentEvidenceIdentity,
    strategySubjectIdentity: alignment.strategySubjectIdentity,
    benchmarkId: records.a.benchmark_id,
    benchmarkProtocolVersion: records.a.benchmark_protocol_version,
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
    dimensionDirections: reduction.dimensionReductions.map((entry) => ({
      dimension: entry.dimension,
      metricId: entry.metricId,
      inputUnit: entry.inputUnit,
      outputUnit: entry.outputUnit,
      valueKind: entry.valueKind,
      reducer: entry.reducer,
      missingnessPolicy: entry.missingnessPolicy,
      minimumObservedCount: entry.minimumObservedCount,
      direction: "HIGHER_IS_BETTER" as const,
    })),
  }
  return {
    strategy,
    caseA,
    caseB,
    bundle: {
      strategyDeclaration: strategy,
      compositionDeclaration,
      alignmentDeclaration,
      policyDeclaration,
      reductionDeclaration,
      directionDeclaration,
      caseAInputs: caseA,
      caseBInputs: caseB,
    },
  }
}

function reconstructR13(scenario: Scenario) {
  const bundle = scenario.bundle as unknown as Record<string, unknown>
  return buildReductionDirectionBindingEvidence(
    bundle.strategyDeclaration,
    bundle.compositionDeclaration,
    bundle.alignmentDeclaration,
    bundle.policyDeclaration,
    bundle.reductionDeclaration,
    bundle.directionDeclaration,
    bundle.caseAInputs,
    bundle.caseBInputs,
  )
}

function latePair(options: LatePairOptions = {}) {
  const base = baseRecords()
  const left = makeScenario(
    "strategy:p3-r17-left",
    base.docs,
    base,
    options.leftA ?? { utilizedCount: 1 },
    options.leftB ?? { utilizedCount: 1, noGold: true },
    options.mixedCasePolicy,
  )
  const right = makeScenario(
    "strategy:p3-r17-right",
    base.docs,
    base,
    options.rightA ?? { utilizedCount: 2 },
    options.rightB ?? { utilizedCount: 2, noGold: true },
    options.mixedCasePolicy,
  )
  const leftR13 = reconstructR13(left)
  const rightR13 = reconstructR13(right)
  const declaration = {
    version: P3_R14_COMPARISON_DECLARATION_VERSION,
    kind: P3_R14_COMPARISON_DECLARATION_KIND,
    comparisonId: "comparison:p3-r17-fixture",
    leftDirectionBindingEvidenceIdentity: leftR13.directionBindingEvidenceIdentity,
    rightDirectionBindingEvidenceIdentity: rightR13.directionBindingEvidenceIdentity,
    leftStrategySubjectIdentity: leftR13.strategySubjectIdentity,
    rightStrategySubjectIdentity: rightR13.strategySubjectIdentity,
    benchmarkId: leftR13.benchmarkId,
    benchmarkProtocolVersion: leftR13.benchmarkProtocolVersion,
  }
  return { ...base, left, right, declaration }
}

function trustedR15(pair = latePair()) {
  return buildStrategyReductionDirectionalRelationEvidence(pair.left.bundle, pair.right.bundle, pair.declaration)
}

function relationCriteria(
  pair = latePair(),
  allowed: readonly P3R16AllowedRelation[] = [...P3_R16_ALLOWED_RELATIONS],
): P3R16CriterionDeclaration {
  const trusted = trustedR15(pair)
  return {
    version: P3_R16_CRITERION_DECLARATION_VERSION,
    kind: P3_R16_CRITERION_DECLARATION_KIND,
    criterionSetId: "criteria:p3-r17-fixture",
    criterionPolicyIdentity: CRITERION_POLICY_IDENTITY,
    dimensionCriteria: trusted.dimensionRelations.map((entry) => ({
      dimension: entry.dimension,
      metricId: entry.metricId,
      allowedRelations: [...allowed],
    })),
  }
}

function p2Observations(records: readonly P2R1ManifestRecord[], offset: number): P2R2Observation[] {
  return records.flatMap((record, recordIndex) => record.metric_definitions.map((metric, metricIndex) => ({
    schema_version: P2_R2_OBSERVATION_SCHEMA,
    case_id: record.case_id,
    r1_result_identity: record.result_identity,
    task_family: record.task_family,
    metric_id: metric.metric_id,
    unit: metric.unit,
    measurement_status: "observed" as const,
    value: metric.metric_id === metricId("no-gold-abstention")
      ? (recordIndex + offset) % 2 === 0
      : Math.min(1, 0.2 + offset * 0.05 + recordIndex * 0.1 + metricIndex * 0.01),
  })))
}

function summaryPolicy(report: P2R2Report): P2R3PolicyDocument {
  const firstCase = report.task_family_sections[0]!.cases[0]!
  return {
    schema_version: P2_R3_POLICY_SCHEMA,
    benchmark_id: report.benchmark_id,
    benchmark_protocol_version: report.benchmark_protocol_version,
    r2_report_identity: report.report_identity,
    metric_policies: firstCase.metrics.map((metric) => ({
      schema_version: P2_R3_METRIC_POLICY_SCHEMA,
      task_family: "context-selection",
      metric_id: metric.metric_id,
      unit: metric.unit,
      value_kind: metric.metric_id === metricId("no-gold-abstention") ? "BOOLEAN" as const : "NUMBER" as const,
      reducer: metric.metric_id === metricId("no-gold-abstention") ? "BOOLEAN_TRUE_RATE" as const : "ARITHMETIC_MEAN" as const,
      missingness_policy: "OBSERVED_ONLY_WITH_COVERAGE" as const,
      minimum_observed_count: 1,
    })),
  }
}

function sharedContext(seed = "base"): P2R4SharedEvaluationContext {
  return {
    schema_version: P2_R4_SHARED_EVALUATION_CONTEXT_SCHEMA,
    model_provider_version_identity: identity(`model-provider:${seed}`),
    configuration_identity: identity(`configuration:${seed}`),
    repository_task_snapshot_identity: identity(`repo-task:${seed}`),
    hardware_execution_environment_identity: identity(`environment:${seed}`),
    network_assumptions_identity: identity(`network:${seed}`),
    time_token_cost_budget_identity: identity(`budget:${seed}`),
    attempt_policy_identity: identity(`attempts:${seed}`),
    allowed_tools_identity: identity(`tools:${seed}`),
    prompt_instruction_policy_identity: identity(`prompt:${seed}`),
    scoring_method_identity: identity(`scoring:${seed}`),
  }
}

function systemIdentity(policyIdentity: string, applicationIdentity: string): string {
  return sha256Canonical({
    version: "p3-r3-context-policy-benchmark-subject-v1",
    p3R2ImplementationMerge: P3_R3_P3_R2_IMPLEMENTATION_MERGE,
    policyIdentity,
    applicationIdentity,
  })
}

function pairSubjects(
  planRequest: ContextSelectionPlanRequest,
  leftPolicy: DeclaredContextSelectionPolicy,
  rightPolicy: DeclaredContextSelectionPolicy,
): { left: P2R4SubjectDescriptor; right: P2R4SubjectDescriptor } {
  const left = applyDeclaredContextSelectionPolicy(planRequest, leftPolicy)
  const right = applyDeclaredContextSelectionPolicy(planRequest, rightPolicy)
  return {
    left: {
      schema_version: P2_R4_SUBJECT_SCHEMA,
      subject_id: `context-policy-application:${left.applicationIdentity}`,
      system_version_commit_identity: systemIdentity(left.policyIdentity, left.applicationIdentity),
      raw_artifact_log_set_identity: identity("left-artifacts"),
    },
    right: {
      schema_version: P2_R4_SUBJECT_SCHEMA,
      subject_id: `context-policy-application:${right.applicationIdentity}`,
      system_version_commit_identity: systemIdentity(right.policyIdentity, right.applicationIdentity),
      raw_artifact_log_set_identity: identity("right-artifacts"),
    },
  }
}

function comparisonPolicy(left: P2R3Summary, right: P2R3Summary, shared: P2R4SharedEvaluationContext): P2R4ComparisonPolicy {
  return {
    schema_version: P2_R4_POLICY_SCHEMA,
    benchmark_id: left.benchmark_id,
    benchmark_protocol_version: left.benchmark_protocol_version,
    left_summary_identity: left.summary_identity,
    right_summary_identity: right.summary_identity,
    shared_evaluation_context_identity: sha256Canonical(shared),
    metric_directions: left.task_family_summaries[0]!.metrics.map((metric) => ({
      schema_version: P2_R4_METRIC_DIRECTION_SCHEMA,
      task_family: "context-selection",
      metric_id: metric.metric_id,
      input_unit: metric.input_unit,
      output_unit: metric.output_unit,
      value_kind: metric.value_kind,
      reducer: metric.reducer,
      missingness_policy: metric.missingness_policy,
      minimum_observed_count: metric.minimum_observed_count,
      direction: metric.metric_id === metricId("context-dilution") ? "LOWER_IS_BETTER" as const : "HIGHER_IS_BETTER" as const,
    })),
  }
}

function p3Declaration(left: P2R3Summary, shared: P2R4SharedEvaluationContext, comparePolicy: P2R4ComparisonPolicy): P3R3EvidenceDeclaration {
  return {
    version: P3_R3_EVIDENCE_DECLARATION_VERSION,
    kind: P3_R3_EVIDENCE_DECLARATION_KIND,
    qualificationId: "qualification:p3-r17-fixture",
    benchmarkId: left.benchmark_id,
    benchmarkProtocolVersion: left.benchmark_protocol_version,
    sharedEvaluationContextIdentity: sha256Canonical(shared),
    comparisonPolicyIdentity: sha256Canonical(comparePolicy),
    taskFamily: "context-selection",
    dimensionMetricBindings: P3_R3_CONTEXT_EVIDENCE_DIMENSIONS.map((dimension) => ({
      dimension,
      metricId: metricId(dimension),
    })),
  }
}

function provenanceBundle(pair: ReturnType<typeof latePair>, options: ProvenanceOptions = {}) {
  const docs = corpus(options)
  const records: P2R1ManifestRecord[] = []
  if (options.includeA !== false) records.push(manifestRecord("development", docs, options))
  if (options.includeB !== false) records.push(manifestRecord("holdout", docs, options))
  if (options.includeExtra) records.push(manifestRecord("development", docs, options, "p3-r17-case-extra"))
  const leftReport = runP2R2Report(records, docs.development, docs.holdout, p2Observations(records, 1))
  const rightReport = runP2R2Report(records, docs.development, docs.holdout, p2Observations(records, 2))
  const leftSummary = summarizeP2R3(leftReport, summaryPolicy(leftReport))
  const rightSummary = summarizeP2R3(rightReport, summaryPolicy(rightReport))
  const shared = sharedContext(options.sharedSeed)
  const planRequest = request("base")
  const canonicalLeftPolicy = pair.left.caseA.policy as DeclaredContextSelectionPolicy
  const canonicalRightPolicy = pair.right.caseA.policy as DeclaredContextSelectionPolicy
  let leftPolicy = canonicalLeftPolicy
  let rightPolicy = canonicalRightPolicy
  if (options.swapPolicies) {
    leftPolicy = canonicalRightPolicy
    rightPolicy = canonicalLeftPolicy
  }
  if (options.unrelatedPolicies) {
    leftPolicy = policy(planRequest, strategyDeclaration("strategy:p3-r17-unrelated-left"))
    rightPolicy = policy(planRequest, strategyDeclaration("strategy:p3-r17-unrelated-right"))
  }
  const subjects = pairSubjects(planRequest, leftPolicy, rightPolicy)
  const compare = comparisonPolicy(leftSummary, rightSummary, shared)
  return {
    planRequest,
    leftPolicy,
    rightPolicy,
    leftR2Report: leftReport,
    leftR3Summary: leftSummary,
    rightR2Report: rightReport,
    rightR3Summary: rightSummary,
    sharedEvaluationContext: shared,
    leftSubject: subjects.left,
    rightSubject: subjects.right,
    comparisonPolicy: compare,
    p3R3Declaration: p3Declaration(leftSummary, shared, compare),
    manifest: records,
    developmentFixture: docs.development,
    holdoutFixture: docs.holdout,
    provenanceDeclaration: {
      version: P3_R4_PROVENANCE_DECLARATION_VERSION,
      kind: P3_R4_PROVENANCE_DECLARATION_KIND,
      qualificationId: "qualification:p3-r17-fixture",
    },
  }
}

function trustedR4(bundle: ReturnType<typeof provenanceBundle>) {
  return buildContextPolicyBenchmarkProvenanceEvidence(
    bundle.planRequest,
    bundle.leftPolicy,
    bundle.rightPolicy,
    bundle.leftR2Report,
    bundle.leftR3Summary,
    bundle.rightR2Report,
    bundle.rightR3Summary,
    bundle.sharedEvaluationContext,
    bundle.leftSubject,
    bundle.rightSubject,
    bundle.comparisonPolicy,
    bundle.p3R3Declaration,
    bundle.manifest,
    bundle.developmentFixture,
    bundle.holdoutFixture,
    bundle.provenanceDeclaration,
  )
}

function qualificationDeclaration(
  pair: ReturnType<typeof latePair>,
  criteria: P3R16CriterionDeclaration,
  bundle: ReturnType<typeof provenanceBundle>,
  overrides: Partial<P3R17QualificationDeclaration> = {},
): P3R17QualificationDeclaration {
  const r16 = buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence(
    pair.left.bundle,
    pair.right.bundle,
    pair.declaration,
    criteria,
  )
  const r4 = trustedR4(bundle)
  return {
    version: P3_R17_QUALIFICATION_DECLARATION_VERSION,
    kind: P3_R17_QUALIFICATION_DECLARATION_KIND,
    qualificationId: "qualification:p3-r17-fixture",
    qualificationPolicyIdentity: QUALIFICATION_POLICY_IDENTITY,
    criterionMatchEvidenceIdentity: r16.criterionMatchEvidenceIdentity,
    provenanceEvidenceIdentity: r4.provenanceEvidenceIdentity,
    provenanceCriteria: {
      requiredCorpusRoles: ["development", "holdout"],
      allowedChronologyStatuses: ["later-in-time"],
      allowedContaminationStatuses: ["none-known"],
    },
    ...overrides,
  }
}

function execute(
  pair = latePair(),
  criteria: P3R16CriterionDeclaration = relationCriteria(pair),
  bundle = provenanceBundle(pair),
  declaration: P3R17QualificationDeclaration = qualificationDeclaration(pair, criteria, bundle),
) {
  return buildLateChainBenchmarkProvenanceSubstrateQualificationEvidence(
    pair.left.bundle,
    pair.right.bundle,
    pair.declaration,
    criteria,
    bundle,
    declaration,
  )
}

function assertDeepFrozen(value: unknown, seen = new WeakSet<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return
  seen.add(value)
  assert.equal(Object.isFrozen(value), true)
  for (const nested of Object.values(value as Record<string, unknown>)) assertDeepFrozen(nested, seen)
}

const FORBIDDEN_EQUIVALENCE_FIELDS = new Set([
  "sameExactComparison",
  "samePlan",
  "sameRequest",
  "sameSharedEvaluationContext",
  "earlyLateComparisonEquivalent",
])

function allKeys(value: unknown, output = new Set<string>()): Set<string> {
  if (value === null || typeof value !== "object") return output
  for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
    output.add(key)
    allKeys(nested, output)
  }
  return output
}

test("P3-R17 emits the closed substrate qualification contract over trusted R16 and R4 evidence", () => {
  const output = execute()
  assert.equal(output.version, P3_R17_SUBSTRATE_QUALIFICATION_EVIDENCE_VERSION)
  assert.equal(output.kind, P3_R17_SUBSTRATE_QUALIFICATION_EVIDENCE_KIND)
  assert.equal(output.substrateQualificationEvidenceState, "ALL_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_SATISFIED")
  assert.equal(output.benchmarkId, BENCHMARK_ID)
  assert.equal(output.benchmarkProtocolVersion, BENCHMARK_PROTOCOL_VERSION)
  assert.equal(output.benchmarkProvenanceEvidence.caseProvenance.length, 2)
  assert.deepEqual(output.provenanceCriterionResult.observedCorpusRoles, ["development", "holdout"])
  assert.deepEqual(output.provenanceCriterionResult.observedChronologyStatuses, ["later-in-time"])
  assert.deepEqual(output.provenanceCriterionResult.observedContaminationStatuses, ["none-known"])
  assert.equal(output.substrateBinding.matchingProvenanceCaseTuples.length, 2)
  assert.equal(output.substrateQualificationEvidenceIdentity, sha256Canonical((({ substrateQualificationEvidenceIdentity: _ignored, ...rest }) => rest)(output)))
  assertDeepFrozen(output)
})

test("P3-R17 exposes no exact-comparison or plan/request/context equivalence field", () => {
  const keys = allKeys(execute())
  for (const forbidden of FORBIDDEN_EQUIVALENCE_FIELDS) assert.equal(keys.has(forbidden), false)
})

test("P3-R17 accepts a different canonical shared evaluation context without relabeling it as equivalence", () => {
  const pair = latePair()
  const criteria = relationCriteria(pair)
  const bundle = provenanceBundle(pair, { sharedSeed: "different-context" })
  const declaration = qualificationDeclaration(pair, criteria, bundle)
  const output = execute(pair, criteria, bundle, declaration)
  assert.equal(output.substrateQualificationEvidenceState, "ALL_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_SATISFIED")
  for (const forbidden of FORBIDDEN_EQUIVALENCE_FIELDS) assert.equal(allKeys(output).has(forbidden), false)
})

test("P3-R17 literal provenance criteria use exact P3-R5-compatible presence and membership semantics", () => {
  const pair = latePair()
  const criteria = relationCriteria(pair)
  const bundle = provenanceBundle(pair)
  const declaration = qualificationDeclaration(pair, criteria, bundle)
  const mismatch = clone(declaration)
  mismatch.provenanceCriteria = {
    requiredCorpusRoles: ["development", "holdout"],
    allowedChronologyStatuses: ["later-in-time"],
    allowedContaminationStatuses: ["known"],
  }
  const output = execute(pair, criteria, bundle, mismatch)
  assert.equal(output.provenanceCriterionResult.contaminationCriterionState, "NOT_SATISFIED")
  assert.equal(output.substrateQualificationEvidenceState, "ONE_OR_MORE_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_NOT_SATISFIED")
  assert.equal(JSON.stringify(output).includes("uncontaminated"), false)
  assert.equal(JSON.stringify(output).includes("clean"), false)
  assert.equal(JSON.stringify(output).includes("safe"), false)
})

test("P3-R17 root precedence preserves R16 not-satisfied before an otherwise satisfied provenance envelope", () => {
  const pair = latePair()
  const criteria = relationCriteria(pair, ["EQUAL_RAW_VALUE"])
  const bundle = provenanceBundle(pair)
  const declaration = qualificationDeclaration(pair, criteria, bundle)
  const output = execute(pair, criteria, bundle, declaration)
  assert.equal(output.criterionMatchEvidence.criterionMatchEvidenceState, "ONE_OR_MORE_DECLARED_RELATION_CRITERIA_NOT_SATISFIED")
  assert.equal(output.substrateQualificationEvidenceState, "ONE_OR_MORE_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_NOT_SATISFIED")
})

test("P3-R17 R16 insufficiency dominates provenance non-satisfaction", () => {
  const pair = latePair({
    leftA: { utilizedCount: 1, noGold: true },
    leftB: { utilizedCount: 1, noGold: true },
    rightA: { utilizedCount: 2, noGold: true },
    rightB: { utilizedCount: 2, noGold: true },
  })
  const criteria = relationCriteria(pair)
  const bundle = provenanceBundle(pair)
  const declaration = qualificationDeclaration(pair, criteria, bundle)
  const mismatch = clone(declaration)
  mismatch.provenanceCriteria = {
    requiredCorpusRoles: ["development", "holdout"],
    allowedChronologyStatuses: ["chronology-unproven"],
    allowedContaminationStatuses: ["known"],
  }
  const output = execute(pair, criteria, bundle, mismatch)
  assert.equal(output.criterionMatchEvidence.criterionMatchEvidenceState, "INSUFFICIENT_DIRECTIONAL_EVIDENCE")
  assert.equal(output.substrateQualificationEvidenceState, "INSUFFICIENT_DIRECTIONAL_EVIDENCE")
})

test("P3-R17 rejects policy-side swaps and unrelated policy pairs", () => {
  const pair = latePair()
  const criteria = relationCriteria(pair)
  for (const options of [{ swapPolicies: true }, { unrelatedPolicies: true }]) {
    const bundle = provenanceBundle(pair, options)
    const declaration = qualificationDeclaration(pair, criteria, bundle)
    assert.throws(
      () => execute(pair, criteria, bundle, declaration),
      /P3-R17 contract violation: trusted late-chain (left|right) member policy identities do not bind trusted P3-R3/,
    )
  }
})

test("P3-R17 rejects mixed member policy identities in an otherwise canonical late chain", () => {
  const pair = latePair({ mixedCasePolicy: true })
  const criteria = relationCriteria(pair)
  const bundle = provenanceBundle(pair)
  const declaration = qualificationDeclaration(pair, criteria, bundle)
  assert.throws(
    () => execute(pair, criteria, bundle, declaration),
    /P3-R17 contract violation: trusted late-chain left member policy identities do not bind trusted P3-R3 left policy orientation/,
  )
})

test("P3-R17 rejects benchmark and protocol substrate mismatches", () => {
  const pair = latePair()
  const criteria = relationCriteria(pair)
  for (const options of [
    { benchmarkId: "kodac-p3-r17-other-benchmark" },
    { benchmarkProtocolVersion: "v2" },
  ]) {
    const bundle = provenanceBundle(pair, options)
    const declaration = qualificationDeclaration(pair, criteria, bundle)
    assert.throws(
      () => execute(pair, criteria, bundle, declaration),
      /P3-R17 contract violation: trusted P3-R16\/P3-R4\/P3-R3 (benchmarkId|benchmarkProtocolVersion) values do not match/,
    )
  }
})

test("P3-R17 rejects substituted case IDs and substituted R1 result identities", () => {
  const pair = latePair()
  const criteria = relationCriteria(pair)
  for (const options of [
    { caseAId: "p3-r17-case-a-substituted" },
    { caseAPayloadTag: "changed-payload-same-case" },
  ]) {
    const bundle = provenanceBundle(pair, options)
    const declaration = qualificationDeclaration(pair, criteria, bundle)
    assert.throws(
      () => execute(pair, criteria, bundle, declaration),
      /P3-R17 contract violation: trusted P3-R4 case provenance does not match the exact late-chain two-case R1 substrate/,
    )
  }
})

test("P3-R17 requires exactly two provenance cases", () => {
  const pair = latePair()
  const criteria = relationCriteria(pair)
  for (const options of [{ includeB: false }, { includeExtra: true }]) {
    const bundle = provenanceBundle(pair, options)
    const declaration = qualificationDeclaration(pair, criteria, bundle)
    assert.throws(
      () => execute(pair, criteria, bundle, declaration),
      /P3-R17 contract violation: trusted P3-R4 caseProvenance must contain exactly two cases/,
    )
  }
})

test("P3-R17 binds the caller declaration to exact trusted R16 and R4 identities", () => {
  const pair = latePair()
  const criteria = relationCriteria(pair)
  const bundle = provenanceBundle(pair)
  const declaration = qualificationDeclaration(pair, criteria, bundle)
  for (const field of ["criterionMatchEvidenceIdentity", "provenanceEvidenceIdentity"] as const) {
    const changed = clone(declaration)
    changed[field] = `sha256:${"f".repeat(64)}`
    assert.throws(() => execute(pair, criteria, bundle, changed), new RegExp(`P3-R17 contract violation: qualificationDeclaration\\.${field} does not match trusted`))
  }
})

test("P3-R17 keeps qualificationId independent from the R16 criterionSetId", () => {
  const output = execute()
  assert.notEqual(output.qualificationId, output.criterionSetId)
  assert.equal(output.qualificationId, "qualification:p3-r17-fixture")
  assert.equal(output.criterionSetId, "criteria:p3-r17-fixture")
})

test("P3-R17 rejects unsorted, duplicate, empty, and unsupported caller provenance sets without repair", () => {
  const pair = latePair()
  const criteria = relationCriteria(pair)
  const bundle = provenanceBundle(pair)
  const declaration = qualificationDeclaration(pair, criteria, bundle)
  const badValues: unknown[] = [
    ["holdout", "development"],
    ["development", "development"],
    [],
    ["production"],
  ]
  for (const value of badValues) {
    const changed = clone(declaration) as unknown as Record<string, unknown>
    const provenance = changed.provenanceCriteria as Record<string, unknown>
    provenance.requiredCorpusRoles = value
    assert.throws(() => execute(pair, criteria, bundle, changed as never), /P3-R17 contract violation:/)
  }
})

test("P3-R17 enforces stable-ID and lowercase SHA-256 declaration identities", () => {
  const pair = latePair()
  const criteria = relationCriteria(pair)
  const bundle = provenanceBundle(pair)
  const declaration = qualificationDeclaration(pair, criteria, bundle)
  const badId = clone(declaration)
  badId.qualificationId = `q${"x".repeat(513)}`
  assert.throws(() => execute(pair, criteria, bundle, badId), /exceeds 512 UTF-8 bytes/)
  const badPolicy = clone(declaration)
  badPolicy.qualificationPolicyIdentity = `sha256:${"A".repeat(64)}`
  assert.throws(() => execute(pair, criteria, bundle, badPolicy), /must be a lowercase sha256 identity/)
})

test("P3-R17 requires exact fifth and sixth root keys", () => {
  const pair = latePair()
  const criteria = relationCriteria(pair)
  const bundle = provenanceBundle(pair)
  const declaration = qualificationDeclaration(pair, criteria, bundle)
  const extraBundle = { ...bundle, extra: true }
  assert.throws(() => execute(pair, criteria, extraBundle as never, declaration), /provenanceReconstruction keys drifted/)
  const missingDeclaration = clone(declaration) as unknown as Record<string, unknown>
  delete missingDeclaration.qualificationPolicyIdentity
  assert.throws(() => execute(pair, criteria, bundle, missingDeclaration as never), /qualificationDeclaration keys drifted/)
})

test("P3-R17 rejects Proxy, accessor, symbol, non-enumerable, non-plain, and sparse owned structures", () => {
  const pair = latePair()
  const criteria = relationCriteria(pair)
  const bundle = provenanceBundle(pair)
  const declaration = qualificationDeclaration(pair, criteria, bundle)

  const proxied = new Proxy(bundle, {})
  assert.throws(() => execute(pair, criteria, proxied as never, declaration), /must not contain Proxy values/)

  const accessor = clone(declaration) as unknown as Record<string, unknown>
  Object.defineProperty(accessor, "qualificationPolicyIdentity", {
    enumerable: true,
    get() { throw new Error("accessor must not run") },
  })
  assert.throws(() => execute(pair, criteria, bundle, accessor as never), /must be an enumerable own data property/)

  const symbolBundle = clone(bundle) as unknown as Record<PropertyKey, unknown>
  symbolBundle[Symbol("hidden")] = true
  assert.throws(() => execute(pair, criteria, symbolBundle as never, declaration), /must not contain symbol fields/)

  const hidden = clone(declaration) as unknown as Record<string, unknown>
  Object.defineProperty(hidden, "hidden", { value: true, enumerable: false })
  assert.throws(() => execute(pair, criteria, bundle, hidden as never), /must be an enumerable own data property|keys drifted/)

  const nonPlain = Object.assign(Object.create({ inherited: true }), clone(declaration))
  assert.throws(() => execute(pair, criteria, bundle, nonPlain), /must use a plain object/)

  const sparse = clone(declaration) as unknown as Record<string, unknown>
  const criteriaObject = sparse.provenanceCriteria as Record<string, unknown>
  const array = ["development", "holdout"] as unknown[]
  delete array[0]
  criteriaObject.requiredCorpusRoles = array
  assert.throws(() => execute(pair, criteria, bundle, sparse as never), /must be dense/)
})

test("P3-R17 rejects wrong arity before predecessor invocation or caller-root reads", () => {
  const throwingProxy = new Proxy({}, {
    get() { throw new Error("caller root read") },
    ownKeys() { throw new Error("caller root read") },
  })
  const call = buildLateChainBenchmarkProvenanceSubstrateQualificationEvidence as unknown as (...args: unknown[]) => unknown
  assert.throws(
    () => call(throwingProxy, throwingProxy, throwingProxy, throwingProxy, throwingProxy),
    /P3-R17 contract violation: buildLateChainBenchmarkProvenanceSubstrateQualificationEvidence requires exactly six arguments/,
  )
})

test("P3-R17 delegates roots 1-4 to canonical R16 before reading the fifth root", () => {
  const pair = latePair()
  const invalidCriterion = {}
  const throwingFifth = new Proxy({}, {
    get() { throw new Error("fifth root read too early") },
    ownKeys() { throw new Error("fifth root read too early") },
  })
  const declaration = {} as P3R17QualificationDeclaration
  assert.throws(
    () => buildLateChainBenchmarkProvenanceSubstrateQualificationEvidence(
      pair.left.bundle,
      pair.right.bundle,
      pair.declaration,
      invalidCriterion,
      throwingFifth,
      declaration,
    ),
    /P3-R16 contract violation:/,
  )
})

test("P3-R17 identity is deterministic, self-reference-free, and sensitive to authorized declaration semantics", () => {
  const pair = latePair()
  const criteria = relationCriteria(pair)
  const bundle = provenanceBundle(pair)
  const declaration = qualificationDeclaration(pair, criteria, bundle)
  const first = execute(pair, criteria, bundle, declaration)
  const second = execute(pair, criteria, clone(bundle), clone(declaration))
  assert.equal(first.substrateQualificationEvidenceIdentity, second.substrateQualificationEvidenceIdentity)

  const changed = clone(declaration)
  changed.qualificationPolicyIdentity = `sha256:${"c".repeat(64)}`
  const changedOutput = execute(pair, criteria, bundle, changed)
  assert.notEqual(first.substrateQualificationEvidenceIdentity, changedOutput.substrateQualificationEvidenceIdentity)

  const { substrateQualificationEvidenceIdentity: _ignored, ...projection } = first
  assert.equal(first.substrateQualificationEvidenceIdentity, sha256Canonical(projection))
})

test("P3-R17 output is detached from caller mutation and preserves complete trusted R16/R4 records", () => {
  const pair = latePair()
  const criteria = relationCriteria(pair)
  const bundle = provenanceBundle(pair)
  const declaration = clone(qualificationDeclaration(pair, criteria, bundle))
  const trusted16 = buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence(
    pair.left.bundle,
    pair.right.bundle,
    pair.declaration,
    criteria,
  )
  const trusted4 = trustedR4(bundle)
  const output = execute(pair, criteria, bundle, declaration)
  assert.deepEqual(output.criterionMatchEvidence, trusted16)
  assert.deepEqual(output.benchmarkProvenanceEvidence, trusted4)

  const before = JSON.stringify(output)
  ;(bundle.manifest as P2R1ManifestRecord[])[0]!.benchmark_id = "mutated-after-build"
  declaration.provenanceCriteria.allowedContaminationStatuses = ["known"]
  assert.equal(JSON.stringify(output), before)
  assertDeepFrozen(output)
})

test("P3-R17 semantic surface contains no score, weighting, statistics, ranking, promotion, release, or completion state", () => {
  const serialized = JSON.stringify(execute()).toLowerCase()
  for (const forbidden of [
    "score",
    "weight",
    "p-value",
    "confidence",
    "effect-size",
    "leaderboard",
    "promotion",
    "winner",
    "defaultstrategy",
    "release-ready",
    "project-complete",
  ]) {
    assert.equal(serialized.includes(forbidden), false, forbidden)
  }
})
