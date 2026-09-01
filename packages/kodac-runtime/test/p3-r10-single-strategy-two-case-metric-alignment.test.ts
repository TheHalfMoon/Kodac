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
  P3_R10_ALIGNMENT_EVIDENCE_KIND,
  P3_R10_ALIGNMENT_EVIDENCE_VERSION,
} from "../bench/p3-r10/contracts.ts"
import { buildSingleStrategyTwoCaseMetricAlignment } from "../bench/p3-r10/single-strategy-two-case-metric-alignment.ts"
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

const STRATEGY_ID = "strategy:p3-r10-fixture"

type MetricSchema = {
  readonly prefix?: string
  readonly unitOverrides?: Partial<Record<P3R6Dimension, string>>
}

type MeasurementOptions = {
  readonly noGold?: boolean
  readonly utilizedCount?: number
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
    taskIdentity: `task:p3-r10-case-${seed}`,
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
    corpus_id: `p3-r10-development-${seed}`,
    corpus_role: "development",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 1 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r10-development-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [
      {
        case_id: `p3-r10-case-${seed}`,
        task_family: "context-selection",
        payload: { purpose: `metric-alignment-${seed}` },
      },
    ],
  } as const
}

function holdout(seed: number) {
  return {
    schema_version: "p2-r1-fixture/v1",
    corpus_id: `p3-r10-holdout-${seed}`,
    corpus_role: "holdout",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 2 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: `packages/kodac-runtime/test/fixtures/p2-r1/p3-r10-holdout-${seed}.json`,
    },
    contamination_status: "none-known",
    cases: [
      {
        case_id: `p3-r10-holdout-case-${seed}`,
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
    benchmark_id: "kodac-p3-r10-fixture",
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
    metric_definitions: metricDefinitions(schema).map((entry) => ({ ...entry })),
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
  schema: MetricSchema = {},
  measurementOptions: MeasurementOptions = {},
) {
  const planRequest = request(seed)
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
      schema,
      measurementOptions,
    ),
    reportDeclaration: reportDeclaration(manifest),
    bindingDeclaration: {
      version: P3_R8_BINDING_DECLARATION_VERSION,
      kind: P3_R8_BINDING_DECLARATION_KIND,
      bindingId: `binding:p3-r10-case-${seed}`,
      strategySubjectIdentity: subjectIdentity,
    },
  }
}

function scenario(options: {
  readonly strategy?: ContextStrategyDeclaration
  readonly schemaA?: MetricSchema
  readonly schemaB?: MetricSchema
  readonly measurementA?: MeasurementOptions
  readonly measurementB?: MeasurementOptions
  readonly reverse?: boolean
} = {}) {
  const strategy = options.strategy ?? strategyDeclaration()
  const subject = buildContextStrategySubject(strategy)
  const originalA = caseInputs(
    1,
    strategy,
    subject.strategySubjectIdentity,
    options.schemaA,
    options.measurementA,
  )
  const originalB = caseInputs(
    2,
    strategy,
    subject.strategySubjectIdentity,
    options.schemaB,
    options.measurementB,
  )
  const first = options.reverse ? originalB : originalA
  const second = options.reverse ? originalA : originalB
  const manifestA = first.manifest[0]
  const manifestB = second.manifest[0]
  const compositionDeclaration = {
    version: P3_R9_COMPOSITION_DECLARATION_VERSION,
    kind: P3_R9_COMPOSITION_DECLARATION_KIND,
    compositionId: options.reverse ? "composition:p3-r10-reversed" : "composition:p3-r10-fixture",
    strategySubjectIdentity: subject.strategySubjectIdentity,
    memberA: {
      memberId: options.reverse ? "member:b" : "member:a",
      caseId: manifestA.case_id,
      r1ResultIdentity: manifestA.result_identity,
    },
    memberB: {
      memberId: options.reverse ? "member:a" : "member:b",
      caseId: manifestB.case_id,
      r1ResultIdentity: manifestB.result_identity,
    },
  }
  const composition = composeSingleStrategyTwoCaseReports(
    strategy,
    compositionDeclaration,
    first,
    second,
  )
  const alignmentDeclaration = {
    version: P3_R10_ALIGNMENT_DECLARATION_VERSION,
    kind: P3_R10_ALIGNMENT_DECLARATION_KIND,
    alignmentId: options.reverse ? "alignment:p3-r10-reversed" : "alignment:p3-r10-fixture",
    compositionEvidenceIdentity: composition.compositionEvidenceIdentity,
    strategySubjectIdentity: composition.strategySubjectIdentity,
  }
  return {
    strategy,
    subject,
    caseA: first,
    caseB: second,
    compositionDeclaration,
    composition,
    alignmentDeclaration,
  }
}

function run(options: Parameters<typeof scenario>[0] = {}) {
  const value = scenario(options)
  return buildSingleStrategyTwoCaseMetricAlignment(
    value.strategy,
    value.compositionDeclaration,
    value.alignmentDeclaration,
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

test("P3-R10 aligns exactly seven same-strategy cross-case metric schemas without reduction", () => {
  const result = run()
  assert.equal(result.version, P3_R10_ALIGNMENT_EVIDENCE_VERSION)
  assert.equal(result.kind, P3_R10_ALIGNMENT_EVIDENCE_KIND)
  assert.match(result.alignmentEvidenceIdentity, /^sha256:[0-9a-f]{64}$/)
  assert.equal(result.dimensionAlignments.length, P3_R6_DIMENSIONS.length)
  assert.deepEqual(result.dimensionAlignments.map((entry) => entry.dimension), P3_R6_DIMENSIONS)
  assert.equal(result.memberAReference.caseId, "p3-r10-case-1")
  assert.equal(result.memberBReference.caseId, "p3-r10-case-2")
  assert.notEqual(result.memberAReference.measurementEvidenceIdentity, result.memberBReference.measurementEvidenceIdentity)
  for (const alignment of result.dimensionAlignments) {
    assert.equal(alignment.metricId, `metric:${alignment.dimension}`)
    assert.equal(
      alignment.unit,
      alignment.dimension === "no-gold-abstention" ? "boolean" : "ratio",
    )
    assert.equal(alignment.memberAObservation.metric_id, alignment.metricId)
    assert.equal(alignment.memberBObservation.metric_id, alignment.metricId)
    assert.equal(alignment.memberAObservation.unit, alignment.unit)
    assert.equal(alignment.memberBObservation.unit, alignment.unit)
    assert.equal(alignment.memberAObservation.case_id, result.memberAReference.caseId)
    assert.equal(alignment.memberBObservation.case_id, result.memberBReference.caseId)
  }

  const forbidden = new Set([
    "sum",
    "total",
    "mean",
    "median",
    "average",
    "weight",
    "normalizedValue",
    "score",
    "aggregateScore",
    "threshold",
    "rank",
    "winner",
    "preferred",
    "better",
    "worse",
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

test("P3-R10 preserves numeric observed and unavailable/null observations exactly", () => {
  const result = run()
  const recall = result.dimensionAlignments.find((entry) => entry.dimension === "recall-at-k")!
  const noGold = result.dimensionAlignments.find((entry) => entry.dimension === "no-gold-abstention")!
  assert.equal(recall.memberAObservation.measurement_status, "observed")
  assert.equal(typeof recall.memberAObservation.value, "number")
  assert.equal(noGold.memberAObservation.measurement_status, "unavailable")
  assert.equal(noGold.memberAObservation.value, null)
})

test("P3-R10 preserves observed boolean values without reinterpretation", () => {
  const result = run({ measurementA: { noGold: true }, measurementB: { noGold: true } })
  const noGold = result.dimensionAlignments.find((entry) => entry.dimension === "no-gold-abstention")!
  assert.equal(noGold.memberAObservation.measurement_status, "observed")
  assert.equal(noGold.memberBObservation.measurement_status, "observed")
  assert.equal(typeof noGold.memberAObservation.value, "boolean")
  assert.equal(typeof noGold.memberBObservation.value, "boolean")
})

test("P3-R10 fails closed on cross-case metricId mismatch that R9 itself accepts", () => {
  const value = scenario({ schemaB: { prefix: "metric-b" } })
  assert.doesNotThrow(() => composeSingleStrategyTwoCaseReports(
    value.strategy,
    value.compositionDeclaration,
    value.caseA,
    value.caseB,
  ))
  assert.throws(
    () => buildSingleStrategyTwoCaseMetricAlignment(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      value.caseA,
      value.caseB,
    ),
    /metricId mismatch across R9 members/,
  )
})

test("P3-R10 fails closed on cross-case unit mismatch that R9 itself accepts", () => {
  const value = scenario({ schemaB: { unitOverrides: { "recall-at-k": "percentage" } } })
  assert.doesNotThrow(() => composeSingleStrategyTwoCaseReports(
    value.strategy,
    value.compositionDeclaration,
    value.caseA,
    value.caseB,
  ))
  assert.throws(
    () => buildSingleStrategyTwoCaseMetricAlignment(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      value.caseA,
      value.caseB,
    ),
    /recall-at-k unit mismatch across R9 members/,
  )
})

test("P3-R10 binds the exact canonical R9 composition and R8 strategy identities", () => {
  const value = scenario()
  assert.throws(
    () => buildSingleStrategyTwoCaseMetricAlignment(
      value.strategy,
      value.compositionDeclaration,
      { ...value.alignmentDeclaration, compositionEvidenceIdentity: `sha256:${"0".repeat(64)}` },
      value.caseA,
      value.caseB,
    ),
    /compositionEvidenceIdentity does not match canonical R9 composition/,
  )
  assert.throws(
    () => buildSingleStrategyTwoCaseMetricAlignment(
      value.strategy,
      value.compositionDeclaration,
      { ...value.alignmentDeclaration, strategySubjectIdentity: "0".repeat(64) },
      value.caseA,
      value.caseB,
    ),
    /strategySubjectIdentity does not match canonical R9 strategy subject/,
  )
})

test("P3-R10 rejects forged serialized predecessor evidence and unknown fields", () => {
  const value = scenario()
  assert.throws(
    () => buildSingleStrategyTwoCaseMetricAlignment(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      { ...value.caseA, measurementEvidence: { forged: true } },
      value.caseB,
    ),
    /caseAInputs keys are not canonical/,
  )
  assert.throws(
    () => buildSingleStrategyTwoCaseMetricAlignment(
      value.strategy,
      value.compositionDeclaration,
      { ...value.alignmentDeclaration, score: 1 },
      value.caseA,
      value.caseB,
    ),
    /alignmentDeclaration keys are not canonical/,
  )
})

test("P3-R10 is deterministic and canonical-key-order invariant", () => {
  const value = scenario()
  const first = buildSingleStrategyTwoCaseMetricAlignment(
    value.strategy,
    value.compositionDeclaration,
    value.alignmentDeclaration,
    value.caseA,
    value.caseB,
  )
  const second = buildSingleStrategyTwoCaseMetricAlignment(
    value.strategy,
    value.compositionDeclaration,
    value.alignmentDeclaration,
    value.caseA,
    value.caseB,
  )
  const reordered = {
    strategySubjectIdentity: value.alignmentDeclaration.strategySubjectIdentity,
    alignmentId: value.alignmentDeclaration.alignmentId,
    kind: value.alignmentDeclaration.kind,
    compositionEvidenceIdentity: value.alignmentDeclaration.compositionEvidenceIdentity,
    version: value.alignmentDeclaration.version,
  }
  const third = buildSingleStrategyTwoCaseMetricAlignment(
    value.strategy,
    value.compositionDeclaration,
    reordered,
    value.caseA,
    value.caseB,
  )
  assert.deepEqual(first, second)
  assert.deepEqual(first, third)
})

test("P3-R10 alignment identity changes when observation semantics change", () => {
  const first = run({ measurementB: { utilizedCount: 1 } })
  const second = run({ measurementB: { utilizedCount: 2 } })
  const firstDimension = first.dimensionAlignments.find(
    (entry) => entry.dimension === "explored-vs-utilized-context",
  )!
  const secondDimension = second.dimensionAlignments.find(
    (entry) => entry.dimension === "explored-vs-utilized-context",
  )!
  assert.notEqual(firstDimension.memberBObservation.value, secondDimension.memberBObservation.value)
  assert.notEqual(first.alignmentEvidenceIdentity, second.alignmentEvidenceIdentity)
})

test("P3-R10 preserves R9 member order in its alignment identity", () => {
  const forward = run()
  const reversed = run({ reverse: true })
  assert.equal(forward.memberAReference.caseId, reversed.memberBReference.caseId)
  assert.equal(forward.memberBReference.caseId, reversed.memberAReference.caseId)
  assert.notEqual(forward.compositionEvidenceIdentity, reversed.compositionEvidenceIdentity)
  assert.notEqual(forward.alignmentEvidenceIdentity, reversed.alignmentEvidenceIdentity)
})

test("P3-R10 rejects hostile canonical-JSON inputs before semantic reuse", () => {
  const value = scenario()
  assert.throws(
    () => buildSingleStrategyTwoCaseMetricAlignment(
      value.strategy,
      value.compositionDeclaration,
      new Proxy(value.alignmentDeclaration, {}),
      value.caseA,
      value.caseB,
    ),
    /not canonical JSON/,
  )

  const accessor = { ...value.alignmentDeclaration } as Record<string, unknown>
  Object.defineProperty(accessor, "alignmentId", {
    enumerable: true,
    get: () => value.alignmentDeclaration.alignmentId,
  })
  assert.throws(
    () => buildSingleStrategyTwoCaseMetricAlignment(
      value.strategy,
      value.compositionDeclaration,
      accessor,
      value.caseA,
      value.caseB,
    ),
    /not canonical JSON/,
  )

  const cyclic = { ...value.caseA } as Record<string, unknown>
  cyclic.self = cyclic
  assert.throws(
    () => buildSingleStrategyTwoCaseMetricAlignment(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      cyclic,
      value.caseB,
    ),
    /not canonical JSON/,
  )

  const sparseManifest = new Array(2)
  sparseManifest[1] = value.caseA.manifest[0]
  assert.throws(
    () => buildSingleStrategyTwoCaseMetricAlignment(
      value.strategy,
      value.compositionDeclaration,
      value.alignmentDeclaration,
      { ...value.caseA, manifest: sparseManifest },
      value.caseB,
    ),
    /not canonical JSON/,
  )

  assert.throws(
    () => buildSingleStrategyTwoCaseMetricAlignment(
      { ...value.strategy, maxSelectedItems: Number.POSITIVE_INFINITY },
      value.compositionDeclaration,
      value.alignmentDeclaration,
      value.caseA,
      value.caseB,
    ),
    /not canonical JSON/,
  )
})

test("P3-R10 rejects symbol-bearing, malformed, missing, and unsupported declarations", () => {
  const value = scenario()
  const symbolBearing = { ...value.alignmentDeclaration } as Record<PropertyKey, unknown>
  symbolBearing[Symbol("hidden")] = true
  assert.throws(
    () => buildSingleStrategyTwoCaseMetricAlignment(
      value.strategy,
      value.compositionDeclaration,
      symbolBearing,
      value.caseA,
      value.caseB,
    ),
    /not canonical JSON/,
  )

  const { alignmentId: _alignmentId, ...missingAlignmentId } = value.alignmentDeclaration
  assert.throws(
    () => buildSingleStrategyTwoCaseMetricAlignment(
      value.strategy,
      value.compositionDeclaration,
      missingAlignmentId,
      value.caseA,
      value.caseB,
    ),
    /alignmentDeclaration keys are not canonical/,
  )
  assert.throws(
    () => buildSingleStrategyTwoCaseMetricAlignment(
      value.strategy,
      value.compositionDeclaration,
      { ...value.alignmentDeclaration, alignmentId: "bad id" },
      value.caseA,
      value.caseB,
    ),
    /alignmentDeclaration.alignmentId must be a bounded canonical stable identifier/,
  )
  assert.throws(
    () => buildSingleStrategyTwoCaseMetricAlignment(
      value.strategy,
      value.compositionDeclaration,
      { ...value.alignmentDeclaration, version: "unsupported" },
      value.caseA,
      value.caseB,
    ),
    /unsupported alignment declaration contract/,
  )
})

test("P3-R10 returns detached deeply frozen evidence and isolates caller mutation", () => {
  const value = scenario()
  const result = buildSingleStrategyTwoCaseMetricAlignment(
    value.strategy,
    value.compositionDeclaration,
    value.alignmentDeclaration,
    value.caseA,
    value.caseB,
  )
  assertDeepFrozen(result)
  assert.notEqual(result.alignmentDeclaration, value.alignmentDeclaration)
  assert.notEqual(result.dimensionAlignments[0]?.memberAObservation, value.caseA.measurementDeclaration)

  const mutableAlignment = value.alignmentDeclaration as unknown as { alignmentId: string }
  mutableAlignment.alignmentId = "alignment:mutated"
  const mutableMeasurement = value.caseA.measurementDeclaration as unknown as {
    measurementId: string
    dimensionMetricBindings: Array<{ metricId: string }>
  }
  mutableMeasurement.measurementId = "measurement:mutated"
  mutableMeasurement.dimensionMetricBindings[0]!.metricId = "metric:mutated"

  assert.equal(result.alignmentId, "alignment:p3-r10-fixture")
  assert.equal(result.dimensionAlignments[0]?.metricId, "metric:recall-at-k")
})

test("P3-R10 does not require ambient network, clock, randomness, or environment state", () => {
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

test("P3-R10 does not require ambient filesystem or subprocess side effects", async () => {
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
