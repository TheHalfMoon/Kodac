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
import { buildContextPolicyMeasurementObservations } from "../bench/p3-r6/context-measurement-observation.ts"
import {
  P3_R7_REPORT_DECLARATION_KIND,
  P3_R7_REPORT_DECLARATION_VERSION,
  P3_R7_REPORT_EVIDENCE_KIND,
  P3_R7_REPORT_EVIDENCE_VERSION,
  type ContextPolicyMeasurementReportDeclaration,
} from "../bench/p3-r7/contracts.ts"
import { buildContextPolicyMeasurementReportBinding } from "../bench/p3-r7/context-measurement-report-binding.ts"
import {
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
  type DeclaredContextSelectionPolicy,
} from "../src/context-selection-policy/contracts.ts"
import { applyDeclaredContextSelectionPolicy } from "../src/context-selection-policy/context-selection-policy.ts"

const REPOSITORY_ID = "a".repeat(64)
const SNAPSHOT_ID = "b".repeat(64)
const CONTENT_ID = "c".repeat(64)
const METRICS = P3_R6_DIMENSIONS.map((dimension) => ({
  task_family: "context-selection",
  metric_id: `metric:${dimension}`,
  unit: dimension === "no-gold-abstention" ? "boolean" : "ratio",
}))

function candidate(
  index: number,
  overrides: Partial<ContextSelectionCandidateInput> = {},
): ContextSelectionCandidateInput {
  return {
    candidateId: `candidate:${index}`,
    repositoryIdentity: REPOSITORY_ID,
    snapshotIdentity: SNAPSHOT_ID,
    contentIdentity: CONTENT_ID,
    lane: "explicit-target",
    sourceKind: "repository-evidence",
    sourceIdentity: String((index % 9) + 1).repeat(64),
    evidenceClass: "precise-static",
    subjectPath: `src/file-${index}.ts`,
    utf8Bytes: 100,
    groupingKey: `file:src/file-${index}.ts`,
    planReasons: ["fixture"],
    provenanceRefs: [`repo://fixture/file-${index}.ts`],
    ...overrides,
  }
}

function request(
  overrides: Partial<ContextSelectionPlanRequest> = {},
): ContextSelectionPlanRequest {
  return {
    version: P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
    kind: P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
    taskIdentity: "task:p3-r7-fixture",
    repositoryIdentity: REPOSITORY_ID,
    snapshotIdentity: SNAPSHOT_ID,
    contentIdentity: CONTENT_ID,
    candidates: [candidate(1), candidate(2), candidate(3)],
    maxItems: 8,
    maxUtf8Bytes: 8_192,
    completeness: { state: "complete", reasons: [], omittedAtLeast: 0 },
    ...overrides,
  }
}

function policy(
  planRequest: ContextSelectionPlanRequest,
  overrides: Partial<DeclaredContextSelectionPolicy> = {},
): DeclaredContextSelectionPolicy {
  const plan = buildContextSelectionPlan(planRequest)
  return {
    version: P3_R2_DECLARED_POLICY_VERSION,
    kind: P3_R2_DECLARED_POLICY_KIND,
    policyId: "policy:p3-r7-fixture",
    planIdentity: plan.planIdentity,
    repositoryIdentity: plan.repositoryIdentity,
    snapshotIdentity: plan.snapshotIdentity,
    contentIdentity: plan.contentIdentity,
    taskIdentity: plan.taskIdentity,
    lanePriority: [...P3_R1_EVIDENCE_LANES],
    maxSelectedItems: plan.budget.maxItems,
    maxSelectedUtf8Bytes: plan.budget.maxUtf8Bytes,
    maxPerGroupingKey: plan.budget.maxItems,
    ...overrides,
  }
}

const development = {
  schema_version: "p2-r1-fixture/v1",
  corpus_id: "p3-r7-development",
  corpus_role: "development",
  chronology_scheme: "fixture-sequence",
  chronology_anchor: { scheme: "fixture-sequence", ordinal: 1 },
  source_provenance: {
    kind: "repository-authored-synthetic",
    path: "packages/kodac-runtime/test/fixtures/p2-r1/p3-r7-development.json",
  },
  contamination_status: "none-known",
  cases: [
    {
      case_id: "p3-r7-case",
      task_family: "context-selection",
      payload: { purpose: "report-binding" },
    },
  ],
} as const

const holdout = {
  schema_version: "p2-r1-fixture/v1",
  corpus_id: "p3-r7-holdout",
  corpus_role: "holdout",
  chronology_scheme: "fixture-sequence",
  chronology_anchor: { scheme: "fixture-sequence", ordinal: 2 },
  source_provenance: {
    kind: "repository-authored-synthetic",
    path: "packages/kodac-runtime/test/fixtures/p2-r1/p3-r7-holdout.json",
  },
  contamination_status: "none-known",
  cases: [
    {
      case_id: "p3-r7-holdout-case",
      task_family: "context-selection",
      payload: { purpose: "holdout" },
    },
  ],
} as const

interface DevelopmentFixtureInput {
  readonly schema_version: string
  readonly corpus_id: string
  readonly corpus_role: "development"
  readonly chronology_scheme: string
  readonly chronology_anchor: { readonly scheme: string; readonly ordinal: number }
  readonly source_provenance: {
    readonly kind: "repository-authored-synthetic"
    readonly path: string
  }
  readonly contamination_status: "none-known"
  readonly cases: readonly {
    readonly case_id: string
    readonly task_family: string
    readonly payload: Record<string, unknown>
  }[]
}

interface ManifestOptions {
  readonly developmentValue?: DevelopmentFixtureInput
  readonly caseId?: string
  readonly taskFamily?: string
  readonly metrics?: readonly { task_family: string; metric_id: string; unit: string }[]
}

function manifestRecord(options: ManifestOptions = {}): P2R1ManifestRecord {
  const developmentValue = options.developmentValue ?? development
  const caseId = options.caseId ?? "p3-r7-case"
  const taskFamily = options.taskFamily ?? "context-selection"
  const fixtureCase = developmentValue.cases.find((entry) => entry.case_id === caseId)
  if (fixtureCase === undefined) throw new Error(`fixture case missing: ${caseId}`)
  const metrics = (options.metrics ?? METRICS).map((entry) => ({ ...entry }))
  const withoutIdentity = {
    schema_version: "p2-r1-manifest/v1",
    benchmark_id: "kodac-p3-r7-fixture",
    benchmark_protocol_version: "v1",
    corpus_id: developmentValue.corpus_id,
    corpus_digest: sha256Canonical(developmentValue),
    corpus_role: "development" as const,
    development_freeze_anchor: developmentValue.chronology_anchor,
    holdout_id: holdout.corpus_id,
    holdout_digest: sha256Canonical(holdout),
    holdout_chronology_anchor: holdout.chronology_anchor,
    chronology_scheme: "fixture-sequence",
    chronology_status: "later-in-time" as const,
    task_family: taskFamily,
    case_id: caseId,
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
    metric_definitions: metrics,
  }
  return { ...withoutIdentity, result_identity: deriveResultIdentity(withoutIdentity) }
}

function multiDevelopment() {
  return {
    schema_version: "p2-r1-fixture/v1",
    corpus_id: "p3-r7-development-multi",
    corpus_role: "development",
    chronology_scheme: "fixture-sequence",
    chronology_anchor: { scheme: "fixture-sequence", ordinal: 1 },
    source_provenance: {
      kind: "repository-authored-synthetic",
      path: "packages/kodac-runtime/test/fixtures/p2-r1/p3-r7-development-multi.json",
    },
    contamination_status: "none-known",
    cases: [
      {
        case_id: "p3-r7-case",
        task_family: "context-selection",
        payload: { purpose: "report-binding" },
      },
      {
        case_id: "p3-r7-second-case",
        task_family: "context-selection",
        payload: { purpose: "second-case" },
      },
    ],
  } as const
}

function measurementDeclaration(
  planRequest: ContextSelectionPlanRequest,
  manifest: P2R1ManifestRecord = manifestRecord(),
  overrides: Partial<ContextPolicyMeasurementDeclaration> = {},
): ContextPolicyMeasurementDeclaration {
  const application = applyDeclaredContextSelectionPolicy(planRequest, policy(planRequest))
  const identities = application.selectedCandidates
    .map((entry) => entry.candidateIdentity)
    .sort()
  return {
    version: P3_R6_MEASUREMENT_DECLARATION_VERSION,
    kind: P3_R6_MEASUREMENT_DECLARATION_KIND,
    measurementId: "measurement:p3-r7-fixture",
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
    ...overrides,
  }
}

function reportDeclaration(
  manifest: P2R1ManifestRecord = manifestRecord(),
  overrides: Partial<ContextPolicyMeasurementReportDeclaration> = {},
): ContextPolicyMeasurementReportDeclaration {
  return {
    version: P3_R7_REPORT_DECLARATION_VERSION,
    kind: P3_R7_REPORT_DECLARATION_KIND,
    reportBindingId: "report-binding:p3-r7-fixture",
    taskFamily: "context-selection",
    caseId: manifest.case_id,
    r1ResultIdentity: manifest.result_identity,
    ...overrides,
  }
}

function run(options: {
  readonly planRequest?: ContextSelectionPlanRequest
  readonly manifestValue?: unknown
  readonly developmentValue?: unknown
  readonly holdoutValue?: unknown
  readonly measurementDeclarationValue?: unknown
  readonly reportDeclarationValue?: unknown
} = {}) {
  const planRequest = options.planRequest ?? request()
  const manifest = manifestRecord()
  return buildContextPolicyMeasurementReportBinding(
    planRequest,
    policy(planRequest),
    options.manifestValue ?? [manifest],
    options.developmentValue ?? development,
    options.holdoutValue ?? holdout,
    options.measurementDeclarationValue ?? measurementDeclaration(planRequest, manifest),
    options.reportDeclarationValue ?? reportDeclaration(manifest),
  )
}

function assertDeepFrozen(value: unknown, seen = new WeakSet<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return
  seen.add(value)
  assert.equal(Object.isFrozen(value), true)
  for (const nested of Object.values(value as Record<string, unknown>)) {
    assertDeepFrozen(nested, seen)
  }
}

test("P3-R7 binds one canonical R6 measurement to one fully covered P2-R2 report", () => {
  const planRequest = request()
  const manifest = manifestRecord()
  const measurement = measurementDeclaration(planRequest, manifest)
  const r6 = buildContextPolicyMeasurementObservations(
    planRequest,
    policy(planRequest),
    [manifest],
    development,
    holdout,
    measurement,
  )
  const result = buildContextPolicyMeasurementReportBinding(
    planRequest,
    policy(planRequest),
    [manifest],
    development,
    holdout,
    measurement,
    reportDeclaration(manifest),
  )

  assert.equal(result.version, P3_R7_REPORT_EVIDENCE_VERSION)
  assert.equal(result.kind, P3_R7_REPORT_EVIDENCE_KIND)
  assert.equal(result.measurementEvidenceIdentity, r6.measurementEvidenceIdentity)
  assert.equal(result.policyIdentity, r6.policyIdentity)
  assert.equal(result.applicationIdentity, r6.applicationIdentity)
  assert.equal(result.r1ManifestSetDigest, r6.r1ManifestSetDigest)
  assert.equal(result.r6ObservationSetDigest, r6.observationSetDigest)
  assert.equal(result.p2R2ReportIdentity, result.p2R2Report.report_identity)
  assert.equal(result.p2R2ObservationSetDigest, result.p2R2Report.observation_set_digest)
  assert.match(result.reportEvidenceIdentity, /^sha256:[0-9a-f]{64}$/)
})

test("P3-R7 preserves canonically valid unavailable metrics without synthetic missing slots", () => {
  const result = run()
  const section = result.p2R2Report.task_family_sections[0]
  assert.ok(section)
  assert.equal(section.task_family, "context-selection")
  assert.equal(section.cases.length, 1)
  const metrics = section.cases[0]?.metrics
  assert.ok(metrics)
  assert.equal(metrics.length, 7)
  assert.ok(metrics.some((metric) => metric.measurement_status === "unavailable"))
  assert.ok(metrics.every((metric) => metric.measurement_status !== "missing"))
  assert.ok(result.p2R2Report.missing_observation_count > 0)
})

test("P3-R7 retains distinct R6 and P2-R2 observation-set identities under their canonical orderings", () => {
  const result = run()
  assert.match(result.r6ObservationSetDigest, /^sha256:[0-9a-f]{64}$/)
  assert.match(result.p2R2ObservationSetDigest, /^sha256:[0-9a-f]{64}$/)
  assert.notEqual(result.r6ObservationSetDigest, result.p2R2ObservationSetDigest)
})

test("P3-R7 rejects multi-case manifests before report composition", () => {
  const developmentValue = multiDevelopment()
  const first = manifestRecord({
    developmentValue,
    caseId: "p3-r7-case",
  })
  const second = manifestRecord({
    developmentValue,
    caseId: "p3-r7-second-case",
  })
  const planRequest = request()
  assert.throws(
    () =>
      buildContextPolicyMeasurementReportBinding(
        planRequest,
        policy(planRequest),
        [first, second],
        developmentValue,
        holdout,
        measurementDeclaration(planRequest, first),
        reportDeclaration(first),
      ),
    /exactly one record/,
  )
})

test("P3-R7 rejects extra manifest metrics even when canonical R6 could bind its seven dimensions", () => {
  const metrics = [
    ...METRICS,
    {
      task_family: "context-selection",
      metric_id: "metric:extra",
      unit: "ratio",
    },
  ]
  const manifest = manifestRecord({ metrics })
  const planRequest = request()
  assert.throws(
    () =>
      buildContextPolicyMeasurementReportBinding(
        planRequest,
        policy(planRequest),
        [manifest],
        development,
        holdout,
        measurementDeclaration(planRequest),
        reportDeclaration(manifest),
      ),
    /exactly 7 metrics/,
  )
})

test("P3-R7 rejects any sole manifest outside context-selection", () => {
  const otherDevelopment = {
    ...development,
    corpus_id: "p3-r7-other-development",
    source_provenance: {
      ...development.source_provenance,
      path: "packages/kodac-runtime/test/fixtures/p2-r1/p3-r7-other-development.json",
    },
    cases: [
      {
        case_id: "p3-r7-other-case",
        task_family: "other-family",
        payload: { purpose: "other" },
      },
    ],
  } as const
  const otherMetrics = P3_R6_DIMENSIONS.map((dimension) => ({
    task_family: "other-family",
    metric_id: `metric:${dimension}`,
    unit: dimension === "no-gold-abstention" ? "boolean" : "ratio",
  }))
  const manifest = manifestRecord({
    developmentValue: otherDevelopment,
    caseId: "p3-r7-other-case",
    taskFamily: "other-family",
    metrics: otherMetrics,
  })
  const planRequest = request()
  assert.throws(
    () =>
      buildContextPolicyMeasurementReportBinding(
        planRequest,
        policy(planRequest),
        [manifest],
        otherDevelopment,
        holdout,
        {},
        {
          ...reportDeclaration(),
          caseId: manifest.case_id,
          r1ResultIdentity: manifest.result_identity,
        },
      ),
    /task family context-selection/,
  )
})

test("P3-R7 closes the report declaration schema and exact case/result binding", () => {
  const manifest = manifestRecord()
  const valid = reportDeclaration(manifest)
  assert.throws(
    () => run({ reportDeclarationValue: { ...valid, version: "future" } }),
    /unsupported report declaration contract/,
  )
  assert.throws(
    () => run({ reportDeclarationValue: { ...valid, kind: "future" } }),
    /unsupported report declaration contract/,
  )
  assert.throws(
    () => run({ reportDeclarationValue: { ...valid, taskFamily: "other" } }),
    /taskFamily must be context-selection/,
  )
  assert.throws(
    () => run({ reportDeclarationValue: { ...valid, caseId: "other-case" } }),
    /does not match the sole manifest case/,
  )
  assert.throws(
    () =>
      run({
        reportDeclarationValue: {
          ...valid,
          r1ResultIdentity: `sha256:${"0".repeat(64)}`,
        },
      }),
    /does not match the sole manifest case/,
  )
  assert.throws(
    () => run({ reportDeclarationValue: { ...valid, p3R6Evidence: {} } }),
    /keys are not canonical/,
  )
})

test("P3-R7 is deterministic, declaration-sensitive, detached, and deeply frozen", () => {
  const manifest = manifestRecord()
  const first = run()
  const second = run()
  assert.deepEqual(first, second)
  assert.equal(first.reportEvidenceIdentity, second.reportEvidenceIdentity)
  assertDeepFrozen(first)

  const alternate = run({
    reportDeclarationValue: reportDeclaration(manifest, {
      reportBindingId: "report-binding:p3-r7-alternate",
    }),
  })
  assert.equal(first.p2R2ReportIdentity, alternate.p2R2ReportIdentity)
  assert.notEqual(first.reportEvidenceIdentity, alternate.reportEvidenceIdentity)

  const mutable = structuredClone(reportDeclaration(manifest)) as unknown as {
    reportBindingId: string
    caseId: string
  }
  const result = run({ reportDeclarationValue: mutable })
  mutable.reportBindingId = "report-binding:mutated"
  mutable.caseId = "mutated-case"
  assert.equal(result.reportBindingId, "report-binding:p3-r7-fixture")
  assert.equal(result.caseId, "p3-r7-case")
})

test("P3-R7 canonicalizes benign object-key order before deriving evidence identity", () => {
  const manifest = manifestRecord()
  const canonical = reportDeclaration(manifest)
  const reordered = {
    r1ResultIdentity: canonical.r1ResultIdentity,
    caseId: canonical.caseId,
    taskFamily: canonical.taskFamily,
    reportBindingId: canonical.reportBindingId,
    kind: canonical.kind,
    version: canonical.version,
  }
  assert.equal(
    run({ reportDeclarationValue: canonical }).reportEvidenceIdentity,
    run({ reportDeclarationValue: reordered }).reportEvidenceIdentity,
  )
})

test("P3-R7 rejects hostile accessor, proxy, sparse, and cyclic public inputs before semantic reuse", () => {
  const manifest = manifestRecord()
  const valid = reportDeclaration(manifest)
  let getterInvoked = false
  const accessor = { ...valid } as Record<string, unknown>
  Object.defineProperty(accessor, "reportBindingId", {
    enumerable: true,
    configurable: true,
    get() {
      getterInvoked = true
      return "report-binding:hostile"
    },
  })
  const proxy = new Proxy(valid as unknown as Record<string, unknown>, {
    get() {
      throw new Error("proxy getter must not execute")
    },
  })
  const sparse = [manifest] as unknown[]
  sparse.length = 2
  const cyclic = { ...valid } as Record<string, unknown>
  cyclic.self = cyclic

  assert.throws(() => run({ reportDeclarationValue: accessor }), /not canonical JSON/)
  assert.throws(() => run({ reportDeclarationValue: proxy }), /not canonical JSON/)
  assert.throws(() => run({ manifestValue: sparse }), /not canonical JSON/)
  assert.throws(() => run({ reportDeclarationValue: cyclic }), /not canonical JSON/)
  assert.equal(getterInvoked, false)
})

test("P3-R7 reconstructs R6 from source preimages instead of accepting forged intermediate claims", () => {
  const planRequest = request()
  const manifest = manifestRecord()
  const forged = {
    ...reportDeclaration(manifest),
    measurementEvidenceIdentity: `sha256:${"f".repeat(64)}`,
  }
  assert.throws(
    () => run({ reportDeclarationValue: forged }),
    /keys are not canonical/,
  )
  assert.throws(
    () =>
      buildContextPolicyMeasurementReportBinding(
        { ...planRequest, version: "future" },
        {},
        [manifest],
        development,
        holdout,
        measurementDeclaration(planRequest, manifest),
        reportDeclaration(manifest),
      ),
    /unsupported P3-R1 context selection request contract/,
  )
})
