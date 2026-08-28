import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

import { canonicalize, sha256Canonical, validateManifestSet, type P2R1ManifestRecord } from "../bench/p2-r1/contract.ts"
import {
  P2_R2_OBSERVATION_SCHEMA,
  P2_R2_REPORT_SCHEMA,
  runP2R2Report,
  type P2R2Observation,
  type P2R2Report,
} from "../bench/p2-r2/runner.ts"
import {
  P2_R3_METRIC_POLICY_SCHEMA,
  P2_R3_POLICY_SCHEMA,
  summarizeP2R3,
  type P2R3MetricPolicy,
  type P2R3PolicyDocument,
  type P2R3Summary,
} from "../bench/p2-r3/summary.ts"
import {
  P2_R4_COMPARISON_SCHEMA,
  P2_R4_METRIC_DIRECTION_SCHEMA,
  P2_R4_POLICY_SCHEMA,
  P2_R4_SHARED_EVALUATION_CONTEXT_SCHEMA,
  P2_R4_SUBJECT_SCHEMA,
  compareP2R4,
  type P2R4ComparisonPolicy,
  type P2R4MetricDirection,
  type P2R4SharedEvaluationContext,
  type P2R4SubjectDescriptor,
} from "../bench/p2-r4/comparison.ts"

type MetricSpec = {
  metric_id: string
  unit: string
  measurement_status: "observed" | "missing" | "unavailable"
  value: boolean | number | null
}
type CaseSpec = { case_id: string; r1_result_identity?: string; metrics: MetricSpec[] }
type SectionSpec = { task_family: string; cases: CaseSpec[] }

function clone<T>(value: T): T {
  return structuredClone(value)
}

function fakeSha(character: string): string {
  return `sha256:${character.repeat(64)}`
}

function makeReport(sections: SectionSpec[], observationDigest = "b"): P2R2Report {
  let identityCounter = 1
  const taskFamilySections = sections.map((section) => ({
    task_family: section.task_family,
    cases: section.cases.map((entry) => ({
      case_id: entry.case_id,
      r1_result_identity: entry.r1_result_identity ?? fakeSha(String(identityCounter++ % 10)),
      metrics: entry.metrics.map((metric) => ({ ...metric })),
    })),
  }))
  let caseCount = 0
  let observationCount = 0
  let missingObservationCount = 0
  for (const section of taskFamilySections) {
    caseCount += section.cases.length
    for (const reportCase of section.cases) {
      for (const metric of reportCase.metrics) {
        if (metric.measurement_status === "observed") observationCount += 1
        else missingObservationCount += 1
      }
    }
  }
  const identityInput = {
    schema_version: P2_R2_REPORT_SCHEMA,
    benchmark_id: "p2-r4-test-benchmark",
    benchmark_protocol_version: "p2-r4-test-protocol/v1",
    r1_manifest_set_digest: fakeSha("a"),
    observation_set_digest: fakeSha(observationDigest),
    case_count: caseCount,
    observation_count: observationCount,
    missing_observation_count: missingObservationCount,
    task_family_sections: taskFamilySections,
  }
  return { ...identityInput, report_identity: sha256Canonical(identityInput) }
}

function defaultReports(): { left: P2R2Report; right: P2R2Report } {
  const left = makeReport(
    [
      {
        task_family: "alpha",
        cases: [
          { case_id: "alpha-001", metrics: [{ metric_id: "score", unit: "points", measurement_status: "observed", value: 4 }] },
          { case_id: "alpha-002", metrics: [{ metric_id: "score", unit: "points", measurement_status: "observed", value: 6 }] },
        ],
      },
      {
        task_family: "beta",
        cases: [
          { case_id: "beta-001", metrics: [{ metric_id: "success", unit: "boolean", measurement_status: "observed", value: true }] },
          { case_id: "beta-002", metrics: [{ metric_id: "success", unit: "boolean", measurement_status: "observed", value: false }] },
        ],
      },
    ],
    "b",
  )
  const right = clone(left)
  right.task_family_sections[0].cases[0].metrics[0].value = 2
  right.task_family_sections[0].cases[1].metrics[0].value = 4
  right.task_family_sections[1].cases[0].metrics[0].value = false
  right.observation_set_digest = fakeSha("c")
  rebindReportIdentity(right)
  return { left, right }
}

function rebindReportIdentity(report: P2R2Report): void {
  const identityInput = {
    schema_version: report.schema_version,
    benchmark_id: report.benchmark_id,
    benchmark_protocol_version: report.benchmark_protocol_version,
    r1_manifest_set_digest: report.r1_manifest_set_digest,
    observation_set_digest: report.observation_set_digest,
    case_count: report.case_count,
    observation_count: report.observation_count,
    missing_observation_count: report.missing_observation_count,
    task_family_sections: report.task_family_sections,
  }
  report.report_identity = sha256Canonical(identityInput)
}

function metricPolicy(
  taskFamily: string,
  metricId: string,
  unit: string,
  valueKind: "NUMBER" | "BOOLEAN",
  reducer: "ARITHMETIC_MEAN" | "BOOLEAN_TRUE_RATE",
  missingness: "REQUIRE_COMPLETE" | "OBSERVED_ONLY_WITH_COVERAGE" = "REQUIRE_COMPLETE",
  minimum = 2,
): P2R3MetricPolicy {
  return {
    schema_version: P2_R3_METRIC_POLICY_SCHEMA,
    task_family: taskFamily,
    metric_id: metricId,
    unit,
    value_kind: valueKind,
    reducer,
    missingness_policy: missingness,
    minimum_observed_count: minimum,
  }
}

function summaryPolicy(report: P2R2Report, policies?: P2R3MetricPolicy[]): P2R3PolicyDocument {
  return {
    schema_version: P2_R3_POLICY_SCHEMA,
    benchmark_id: report.benchmark_id,
    benchmark_protocol_version: report.benchmark_protocol_version,
    r2_report_identity: report.report_identity,
    metric_policies:
      policies ??
      [
        metricPolicy("alpha", "score", "points", "NUMBER", "ARITHMETIC_MEAN"),
        metricPolicy("beta", "success", "boolean", "BOOLEAN", "BOOLEAN_TRUE_RATE"),
      ],
  }
}

function context(): P2R4SharedEvaluationContext {
  return {
    schema_version: P2_R4_SHARED_EVALUATION_CONTEXT_SCHEMA,
    model_provider_version_identity: fakeSha("1"),
    configuration_identity: fakeSha("2"),
    repository_task_snapshot_identity: fakeSha("3"),
    hardware_execution_environment_identity: fakeSha("4"),
    network_assumptions_identity: fakeSha("5"),
    time_token_cost_budget_identity: fakeSha("6"),
    attempt_policy_identity: fakeSha("7"),
    allowed_tools_identity: fakeSha("8"),
    prompt_instruction_policy_identity: fakeSha("9"),
    scoring_method_identity: fakeSha("d"),
  }
}

function subject(id: "left" | "right"): P2R4SubjectDescriptor {
  return {
    schema_version: P2_R4_SUBJECT_SCHEMA,
    subject_id: id,
    system_version_commit_identity: fakeSha(id === "left" ? "e" : "f"),
    raw_artifact_log_set_identity: fakeSha(id === "left" ? "4" : "5"),
  }
}

function directionFrom(
  summary: P2R3Summary,
  taskFamily: string,
  metricId: string,
  direction: "HIGHER_IS_BETTER" | "LOWER_IS_BETTER",
): P2R4MetricDirection {
  const section = summary.task_family_summaries.find((entry) => entry.task_family === taskFamily)
  const metric = section?.metrics.find((entry) => entry.metric_id === metricId)
  if (metric === undefined) throw new Error("missing test metric")
  return {
    schema_version: P2_R4_METRIC_DIRECTION_SCHEMA,
    task_family: taskFamily,
    metric_id: metricId,
    input_unit: metric.input_unit,
    output_unit: metric.output_unit,
    value_kind: metric.value_kind,
    reducer: metric.reducer,
    missingness_policy: metric.missingness_policy,
    minimum_observed_count: metric.minimum_observed_count,
    direction,
  }
}

function comparisonPolicy(
  left: P2R3Summary,
  right: P2R3Summary,
  sharedContext: P2R4SharedEvaluationContext,
  directions?: P2R4MetricDirection[],
): P2R4ComparisonPolicy {
  return {
    schema_version: P2_R4_POLICY_SCHEMA,
    benchmark_id: left.benchmark_id,
    benchmark_protocol_version: left.benchmark_protocol_version,
    left_summary_identity: left.summary_identity,
    right_summary_identity: right.summary_identity,
    shared_evaluation_context_identity: sha256Canonical(sharedContext),
    metric_directions:
      directions ??
      [
        directionFrom(left, "alpha", "score", "HIGHER_IS_BETTER"),
        directionFrom(left, "beta", "success", "HIGHER_IS_BETTER"),
      ],
  }
}

function defaultInputs() {
  const reports = defaultReports()
  const leftSummary = summarizeP2R3(reports.left, summaryPolicy(reports.left))
  const rightSummary = summarizeP2R3(reports.right, summaryPolicy(reports.right))
  const sharedContext = context()
  return {
    ...reports,
    leftSummary,
    rightSummary,
    sharedContext,
    leftSubject: subject("left"),
    rightSubject: subject("right"),
    policy: comparisonPolicy(leftSummary, rightSummary, sharedContext),
  }
}

function compareDefaults(overrides: Partial<ReturnType<typeof defaultInputs>> = {}) {
  const values = { ...defaultInputs(), ...overrides }
  return compareP2R4(
    values.left,
    values.leftSummary,
    values.right,
    values.rightSummary,
    values.sharedContext,
    values.leftSubject,
    values.rightSubject,
    values.policy,
  )
}

function loadFixture(name: string): unknown {
  return JSON.parse(readFileSync(new URL(`./fixtures/p2-r1/${name}`, import.meta.url), "utf8"))
}

test("P2-R4 interoperates with canonical P2-R1 fixtures through R2 and R3", () => {
  const development = loadFixture("development.json")
  const holdout = loadFixture("holdout.json")
  const manifestRaw = loadFixture("manifest.json")
  const manifest = validateManifestSet(manifestRaw, development, holdout)
  const leftObservations: P2R2Observation[] = manifest.flatMap(
    (record: P2R1ManifestRecord, recordIndex: number) =>
      record.metric_definitions.map((metric) => ({
        schema_version: P2_R2_OBSERVATION_SCHEMA,
        case_id: record.case_id,
        r1_result_identity: record.result_identity,
        task_family: record.task_family,
        metric_id: metric.metric_id,
        unit: metric.unit,
        measurement_status: "observed" as const,
        value: recordIndex % 2 === 0,
      })),
  )
  const rightObservations = leftObservations.map((entry, index) => ({
    ...entry,
    value: index % 3 === 0,
  }))
  const left = runP2R2Report(manifestRaw, development, holdout, leftObservations)
  const right = runP2R2Report(manifestRaw, development, holdout, rightObservations)
  const policies: P2R3MetricPolicy[] = left.task_family_sections.map((section) => {
    const firstMetric = section.cases[0]?.metrics[0]
    if (firstMetric === undefined) throw new Error("fixture report is missing metric")
    const expected = section.cases.filter((entry) =>
      entry.metrics.some((metric) => metric.metric_id === firstMetric.metric_id),
    ).length
    return metricPolicy(
      section.task_family,
      firstMetric.metric_id,
      firstMetric.unit,
      "BOOLEAN",
      "BOOLEAN_TRUE_RATE",
      "REQUIRE_COMPLETE",
      expected,
    )
  })
  const leftSummary = summarizeP2R3(left, summaryPolicy(left, policies))
  const rightSummary = summarizeP2R3(right, summaryPolicy(right, policies))
  const sharedContext = context()
  const directions = leftSummary.task_family_summaries.flatMap((section) =>
    section.metrics.map((metric) =>
      directionFrom(leftSummary, section.task_family, metric.metric_id, "HIGHER_IS_BETTER"),
    ),
  )
  const result = compareP2R4(
    left,
    leftSummary,
    right,
    rightSummary,
    sharedContext,
    subject("left"),
    subject("right"),
    comparisonPolicy(leftSummary, rightSummary, sharedContext, directions),
  )
  assert.equal(result.schema_version, P2_R4_COMPARISON_SCHEMA)
  assert.equal(result.task_family_comparisons.length, 2)
})

test("P2-R4 produces deterministic per-family raw pairwise deltas", () => {
  const result = compareDefaults()
  assert.deepEqual(result.task_family_comparisons.map((entry) => entry.task_family), ["alpha", "beta"])
  assert.equal(result.task_family_comparisons[0].metrics[0].raw_delta_left_minus_right, 2)
  assert.equal(result.task_family_comparisons[1].metrics[0].raw_delta_left_minus_right, 0.5)
  assert.equal(result.task_family_comparisons[0].metrics[0].direction, "HIGHER_IS_BETTER")
})

test("both R2 reports are revalidated including exact identities and counts", () => {
  const values = defaultInputs()
  const stale = clone(values.right)
  stale.report_identity = fakeSha("0")
  assert.throws(
    () => compareP2R4(values.left, values.leftSummary, stale, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, values.policy),
    /report_identity does not match/,
  )
  const badCount = clone(values.left)
  badCount.observation_count = 0
  rebindReportIdentity(badCount)
  assert.throws(
    () => compareP2R4(badCount, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, values.policy),
    /observation_count does not match/,
  )
})

test("both R3 summaries are revalidated and cross-bound to their R2 reports", () => {
  const values = defaultInputs()
  const stale = clone(values.leftSummary)
  stale.summary_identity = fakeSha("0")
  assert.throws(
    () => compareP2R4(values.left, stale, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, values.policy),
    /summary_identity does not match/,
  )
  const crossBound = clone(values.rightSummary)
  crossBound.r2_report_identity = values.left.report_identity
  assert.throws(
    () => compareP2R4(values.left, values.leftSummary, values.right, crossBound, values.sharedContext, values.leftSubject, values.rightSubject, values.policy),
    /r2_report_identity does not match/,
  )
})

test("manifest, case, R1 identity, metric, and unit topology mismatches fail closed", () => {
  const values = defaultInputs()
  const mutations: Array<(report: P2R2Report) => void> = [
    (report) => { report.r1_manifest_set_digest = fakeSha("9") },
    (report) => { report.task_family_sections[0].cases[0].case_id = "alpha-000" },
    (report) => { report.task_family_sections[0].cases[0].r1_result_identity = fakeSha("9") },
    (report) => { report.task_family_sections[0].cases[0].metrics[0].metric_id = "other" },
    (report) => { report.task_family_sections[0].cases[0].metrics[0].unit = "other" },
  ]
  for (const mutate of mutations) {
    const right = clone(values.right)
    mutate(right)
    rebindReportIdentity(right)
    assert.throws(
      () => compareP2R4(values.left, values.leftSummary, right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, values.policy),
      /topology|strictly sorted/,
    )
  }
})

test("shared evaluation context is exact-key, versioned, and identity-bound", () => {
  const values = defaultInputs()
  const extra = clone(values.sharedContext) as unknown as Record<string, unknown>
  extra.extra = true
  assert.throws(
    () => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, extra, values.leftSubject, values.rightSubject, values.policy),
    /keys are not canonical/,
  )
  const bad = clone(values.sharedContext)
  bad.allowed_tools_identity = "not-a-digest"
  assert.throws(
    () => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, bad, values.leftSubject, values.rightSubject, values.policy),
    /lowercase sha256 identity/,
  )
  const changed = clone(values.sharedContext)
  changed.scoring_method_identity = fakeSha("0")
  assert.throws(
    () => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, changed, values.leftSubject, values.rightSubject, values.policy),
    /shared_evaluation_context_identity does not match/,
  )
})

test("subjects require exact keys and distinct subject and system/version identities", () => {
  const values = defaultInputs()
  const sameId = clone(values.rightSubject)
  sameId.subject_id = values.leftSubject.subject_id
  assert.throws(() => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, sameId, values.policy), /subject_id values must be distinct/)
  const sameSystem = clone(values.rightSubject)
  sameSystem.system_version_commit_identity = values.leftSubject.system_version_commit_identity
  assert.throws(() => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, sameSystem, values.policy), /system_version_commit_identity values must be distinct/)
})

test("direction policy is explicit and closed to higher/lower only", () => {
  const values = defaultInputs()
  const bad = clone(values.policy) as unknown as Record<string, any>
  bad.metric_directions[0].direction = "INFER"
  assert.throws(() => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, bad), /direction is unsupported/)
  const missing = clone(values.policy) as unknown as Record<string, any>
  delete missing.metric_directions[0].direction
  assert.throws(() => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, missing), /keys are not canonical/)
})

test("expected_count remains derived and caller-supplied expected_count is rejected", () => {
  const values = defaultInputs()
  const bad = clone(values.policy) as unknown as Record<string, any>
  bad.metric_directions[0].expected_count = 2
  assert.throws(() => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, bad), /keys are not canonical/)
})

test("direction entries must match validated reducer, units, kind, missingness, and minimum count", () => {
  const values = defaultInputs()
  for (const [key, changed] of [
    ["input_unit", "other"],
    ["output_unit", "other"],
    ["value_kind", "BOOLEAN"],
    ["reducer", "BOOLEAN_TRUE_RATE"],
    ["missingness_policy", "OBSERVED_ONLY_WITH_COVERAGE"],
    ["minimum_observed_count", 1],
  ] as const) {
    const bad = clone(values.policy) as unknown as Record<string, any>
    bad.metric_directions[0][key] = changed
    assert.throws(() => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, bad), /does not match validated summaries|incompatible/)
  }
})

test("duplicate and unknown metric direction entries fail closed", () => {
  const values = defaultInputs()
  const duplicate = clone(values.policy)
  duplicate.metric_directions.push(clone(duplicate.metric_directions[0]))
  assert.throws(() => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, duplicate), /duplicate direction policy/)
  const unknown = clone(values.policy)
  unknown.metric_directions[0].metric_id = "unknown"
  assert.throws(() => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, unknown), /not present in summary/)
})

test("policy direction input order is not identity-bearing", () => {
  const values = defaultInputs()
  const forward = compareDefaults()
  const reversedPolicy = comparisonPolicy(values.leftSummary, values.rightSummary, values.sharedContext, [...values.policy.metric_directions].reverse())
  const reversed = compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, reversedPolicy)
  assert.equal(forward.comparison_policy_identity, reversed.comparison_policy_identity)
  assert.equal(forward.comparison_identity, reversed.comparison_identity)
  assert.equal(canonicalize(forward), canonicalize(reversed))
})

test("metrics without explicit direction remain uncompared", () => {
  const values = defaultInputs()
  const policy = comparisonPolicy(values.leftSummary, values.rightSummary, values.sharedContext, [values.policy.metric_directions[0]])
  const result = compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, policy)
  assert.deepEqual(result.task_family_comparisons.map((entry) => entry.task_family), ["alpha"])
  assert.equal(result.task_family_comparisons[0].metrics.length, 1)
})

test("either-side insufficient evidence yields null pairwise numeric fields while preserving summaries", () => {
  const base = defaultReports()
  const left = clone(base.left)
  left.task_family_sections[0].cases[1].metrics[0].measurement_status = "missing"
  left.task_family_sections[0].cases[1].metrics[0].value = null
  left.observation_count -= 1
  left.missing_observation_count += 1
  left.observation_set_digest = fakeSha("7")
  rebindReportIdentity(left)
  const leftPolicy = summaryPolicy(left)
  const rightPolicy = summaryPolicy(base.right)
  const leftSummary = summarizeP2R3(left, leftPolicy)
  const rightSummary = summarizeP2R3(base.right, rightPolicy)
  const sharedContext = context()
  const policy = comparisonPolicy(leftSummary, rightSummary, sharedContext)
  const result = compareP2R4(left, leftSummary, base.right, rightSummary, sharedContext, subject("left"), subject("right"), policy)
  const metric = result.task_family_comparisons[0].metrics[0]
  assert.equal(metric.status, "INSUFFICIENT_EVIDENCE")
  assert.equal(metric.left_value, null)
  assert.equal(metric.right_value, null)
  assert.equal(metric.raw_delta_left_minus_right, null)
  assert.equal(metric.left_summary.missing_count, 1)
  assert.equal(metric.right_summary.reduced_value, 3)
})

test("finite side values whose subtraction overflows fail closed", () => {
  const left = makeReport([{ task_family: "alpha", cases: [{ case_id: "a1", metrics: [{ metric_id: "score", unit: "points", measurement_status: "observed", value: Number.MAX_VALUE }] }] }], "1")
  const right = clone(left)
  right.task_family_sections[0].cases[0].metrics[0].value = -Number.MAX_VALUE
  right.observation_set_digest = fakeSha("2")
  rebindReportIdentity(right)
  const policies = [metricPolicy("alpha", "score", "points", "NUMBER", "ARITHMETIC_MEAN", "REQUIRE_COMPLETE", 1)]
  const leftSummary = summarizeP2R3(left, summaryPolicy(left, policies))
  const rightSummary = summarizeP2R3(right, summaryPolicy(right, policies))
  const sharedContext = context()
  const policy = comparisonPolicy(leftSummary, rightSummary, sharedContext, [directionFrom(leftSummary, "alpha", "score", "HIGHER_IS_BETTER")])
  assert.throws(() => compareP2R4(left, leftSummary, right, rightSummary, sharedContext, subject("left"), subject("right"), policy), /pairwise subtraction produced a non-finite result/)
})

test("repeated identical evidence produces identical comparison bytes and identity", () => {
  const first = compareDefaults()
  const second = compareDefaults()
  assert.equal(first.comparison_identity, second.comparison_identity)
  assert.equal(canonicalize(first), canonicalize(second))
})

test("evidence-bearing context and subject changes alter comparison identity", () => {
  const values = defaultInputs()
  const first = compareDefaults()
  const changedContext = clone(values.sharedContext)
  changedContext.allowed_tools_identity = fakeSha("0")
  const contextPolicy = comparisonPolicy(values.leftSummary, values.rightSummary, changedContext)
  const second = compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, changedContext, values.leftSubject, values.rightSubject, contextPolicy)
  assert.notEqual(first.comparison_identity, second.comparison_identity)
  const changedSubject = clone(values.rightSubject)
  changedSubject.raw_artifact_log_set_identity = fakeSha("0")
  const third = compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, changedSubject, values.policy)
  assert.notEqual(first.comparison_identity, third.comparison_identity)
})

test("returned comparison is deeply frozen and caller mutation cannot alter it", () => {
  const values = defaultInputs()
  const result = compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, values.policy)
  const identity = result.comparison_identity
  values.left.task_family_sections[0].cases[0].metrics[0].value = 999
  values.policy.metric_directions[0].metric_id = "mutated"
  values.leftSubject.subject_id = "mutated"
  assert.equal(result.comparison_identity, identity)
  assert.equal(result.task_family_comparisons[0].metrics[0].raw_delta_left_minus_right, 2)
  assert.equal(Object.isFrozen(result), true)
  assert.equal(Object.isFrozen(result.task_family_comparisons), true)
  assert.equal(Object.isFrozen(result.task_family_comparisons[0].metrics[0].left_summary), true)
})

test("hostile accessors and proxies fail closed without executing hooks", () => {
  const values = defaultInputs()
  let getterInvoked = false
  const accessor = clone(values.sharedContext) as unknown as Record<string, unknown>
  Object.defineProperty(accessor, "configuration_identity", {
    enumerable: true,
    configurable: true,
    get() {
      getterInvoked = true
      return fakeSha("2")
    },
  })
  const proxy = new Proxy(clone(values.policy) as unknown as Record<string, unknown>, {
    get() {
      throw new Error("proxy hook must not execute")
    },
  })
  assert.throws(() => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, accessor, values.leftSubject, values.rightSubject, values.policy), /contract violation/)
  assert.throws(() => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, proxy), /contract violation/)
  assert.equal(getterInvoked, false)
})

test("sparse arrays, bigint, and non-JSON policy values fail closed", () => {
  const values = defaultInputs()
  const sparse = clone(values.policy) as unknown as Record<string, unknown>
  const directions = new Array<unknown>(2)
  directions[1] = values.policy.metric_directions[0]
  sparse.metric_directions = directions
  const bigint = clone(values.policy) as unknown as Record<string, any>
  bigint.metric_directions[0].minimum_observed_count = 1n
  for (const candidate of [sparse, bigint]) {
    assert.throws(() => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, candidate), /contract violation/)
  }
})

test("__proto__ remains ordinary canonical data and cannot pollute prototypes", () => {
  const values = defaultInputs()
  const policy = clone(values.policy) as unknown as Record<string, unknown>
  Object.defineProperty(policy, "__proto__", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { polluted: true },
  })
  assert.throws(() => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, policy), /keys are not canonical/)
  assert.equal((Object.prototype as Record<string, unknown>).polluted, undefined)
})

test("environment noise is not comparison identity input and timestamp fields are rejected", () => {
  const before = compareDefaults()
  const old = process.env.KODAC_P2_R4_IDENTITY_NOISE
  process.env.KODAC_P2_R4_IDENTITY_NOISE = "/tmp/host/2026-08-28T17:00:00Z"
  try {
    const after = compareDefaults()
    assert.equal(before.comparison_identity, after.comparison_identity)
  } finally {
    if (old === undefined) delete process.env.KODAC_P2_R4_IDENTITY_NOISE
    else process.env.KODAC_P2_R4_IDENTITY_NOISE = old
  }
  const values = defaultInputs()
  const contextWithTimestamp = clone(values.sharedContext) as unknown as Record<string, unknown>
  contextWithTimestamp.timestamp = "2026-08-28T17:00:00Z"
  assert.throws(() => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, contextWithTimestamp, values.leftSubject, values.rightSubject, values.policy), /keys are not canonical/)
})

test("comparison output has no winner, ranking, threshold, statistics, or promotion fields", () => {
  const result = compareDefaults()
  assert.deepEqual(Object.keys(result).sort(), [
    "benchmark_id",
    "benchmark_protocol_version",
    "comparison_identity",
    "comparison_policy_identity",
    "left_r2_report_identity",
    "left_subject",
    "left_summary_identity",
    "right_r2_report_identity",
    "right_subject",
    "right_summary_identity",
    "schema_version",
    "shared_evaluation_context_identity",
    "task_family_comparisons",
  ])
  const serialized = canonicalize(result).toLowerCase()
  for (const forbidden of [
    '"winner"', '"loser"', '"better"', '"worse"', '"superior"', '"ranking"', '"leaderboard"',
    '"threshold"', '"pass"', '"fail"', '"promotion"', '"pareto"', '"significance"', '"confidence_interval"',
  ]) {
    assert.equal(serialized.includes(forbidden), false)
  }
})

test("policy benchmark, protocol, summary identities, and context identity bind exactly", () => {
  const values = defaultInputs()
  for (const mutate of [
    (policy: P2R4ComparisonPolicy) => { policy.benchmark_id = "other" },
    (policy: P2R4ComparisonPolicy) => { policy.benchmark_protocol_version = "other/v1" },
    (policy: P2R4ComparisonPolicy) => { policy.left_summary_identity = fakeSha("0") },
    (policy: P2R4ComparisonPolicy) => { policy.right_summary_identity = fakeSha("0") },
    (policy: P2R4ComparisonPolicy) => { policy.shared_evaluation_context_identity = fakeSha("0") },
  ]) {
    const policy = clone(values.policy)
    mutate(policy)
    assert.throws(() => compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, policy), /does not match/)
  }
})

test("caller-reordered report and summary arrays cannot self-assert fresh identities", () => {
  const values = defaultInputs()
  const report = clone(values.left)
  report.task_family_sections.reverse()
  rebindReportIdentity(report)
  assert.throws(() => compareP2R4(report, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, values.policy), /strictly sorted/)

  const summary = clone(values.leftSummary)
  summary.task_family_summaries.reverse()
  const identityInput = {
    schema_version: summary.schema_version,
    benchmark_id: summary.benchmark_id,
    benchmark_protocol_version: summary.benchmark_protocol_version,
    r2_report_identity: summary.r2_report_identity,
    policy_identity: summary.policy_identity,
    task_family_summaries: summary.task_family_summaries,
  }
  summary.summary_identity = sha256Canonical(identityInput)
  assert.throws(() => compareP2R4(values.left, summary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, values.policy), /strictly sorted/)
})

test("raw delta direction is evidence only and never changes subtraction orientation", () => {
  const values = defaultInputs()
  const lowPolicy = comparisonPolicy(values.leftSummary, values.rightSummary, values.sharedContext, [
    directionFrom(values.leftSummary, "alpha", "score", "LOWER_IS_BETTER"),
  ])
  const result = compareP2R4(values.left, values.leftSummary, values.right, values.rightSummary, values.sharedContext, values.leftSubject, values.rightSubject, lowPolicy)
  const metric = result.task_family_comparisons[0].metrics[0]
  assert.equal(metric.direction, "LOWER_IS_BETTER")
  assert.equal(metric.raw_delta_left_minus_right, 2)
})
