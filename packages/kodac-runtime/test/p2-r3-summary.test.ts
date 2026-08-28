import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

import {
  canonicalize,
  sha256Canonical,
  validateManifestSet,
  type P2R1ManifestRecord,
} from "../bench/p2-r1/contract.ts"
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
  P2_R3_SUMMARY_SCHEMA,
  summarizeP2R3,
  type P2R3MetricPolicy,
  type P2R3PolicyDocument,
} from "../bench/p2-r3/summary.ts"

type MetricSpec = {
  metric_id: string
  unit: string
  measurement_status: "observed" | "missing" | "unavailable"
  value: boolean | number | null
}
type CaseSpec = { case_id: string; metrics: MetricSpec[] }
type SectionSpec = { task_family: string; cases: CaseSpec[] }

function clone<T>(value: T): T {
  return structuredClone(value)
}

function fakeSha(character: string): string {
  return `sha256:${character.repeat(64)}`
}

function makeReport(sections: SectionSpec[]): P2R2Report {
  const taskFamilySections = sections.map((section) => ({
    task_family: section.task_family,
    cases: section.cases.map((entry, index) => ({
      case_id: entry.case_id,
      r1_result_identity: fakeSha(String((index + 1) % 10)),
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
    benchmark_id: "p2-r3-test-benchmark",
    benchmark_protocol_version: "p2-r3-test-protocol/v1",
    r1_manifest_set_digest: fakeSha("a"),
    observation_set_digest: fakeSha("b"),
    case_count: caseCount,
    observation_count: observationCount,
    missing_observation_count: missingObservationCount,
    task_family_sections: taskFamilySections,
  }
  return { ...identityInput, report_identity: sha256Canonical(identityInput) }
}

function defaultReport(): P2R2Report {
  return makeReport([
    {
      task_family: "alpha",
      cases: [
        {
          case_id: "alpha-001",
          metrics: [
            { metric_id: "score", unit: "points", measurement_status: "observed", value: 2 },
          ],
        },
        {
          case_id: "alpha-002",
          metrics: [
            { metric_id: "score", unit: "points", measurement_status: "observed", value: 4 },
          ],
        },
      ],
    },
    {
      task_family: "beta",
      cases: [
        {
          case_id: "beta-001",
          metrics: [
            {
              metric_id: "success",
              unit: "boolean",
              measurement_status: "observed",
              value: true,
            },
          ],
        },
        {
          case_id: "beta-002",
          metrics: [
            {
              metric_id: "success",
              unit: "boolean",
              measurement_status: "observed",
              value: false,
            },
          ],
        },
      ],
    },
  ])
}

function metricPolicy(
  taskFamily: string,
  metricId: string,
  unit: string,
  valueKind: "NUMBER" | "BOOLEAN",
  reducer: "ARITHMETIC_MEAN" | "BOOLEAN_TRUE_RATE",
  missingnessPolicy: "REQUIRE_COMPLETE" | "OBSERVED_ONLY_WITH_COVERAGE",
  minimumObservedCount: number,
): P2R3MetricPolicy {
  return {
    schema_version: P2_R3_METRIC_POLICY_SCHEMA,
    task_family: taskFamily,
    metric_id: metricId,
    unit,
    value_kind: valueKind,
    reducer,
    missingness_policy: missingnessPolicy,
    minimum_observed_count: minimumObservedCount,
  }
}

function policyFor(report: P2R2Report, entries?: P2R3MetricPolicy[]): P2R3PolicyDocument {
  return {
    schema_version: P2_R3_POLICY_SCHEMA,
    benchmark_id: report.benchmark_id,
    benchmark_protocol_version: report.benchmark_protocol_version,
    r2_report_identity: report.report_identity,
    metric_policies:
      entries ??
      [
        metricPolicy(
          "alpha",
          "score",
          "points",
          "NUMBER",
          "ARITHMETIC_MEAN",
          "REQUIRE_COMPLETE",
          2,
        ),
        metricPolicy(
          "beta",
          "success",
          "boolean",
          "BOOLEAN",
          "BOOLEAN_TRUE_RATE",
          "REQUIRE_COMPLETE",
          2,
        ),
      ],
  }
}

function metricSummary(
  report: P2R2Report,
  policy: P2R3PolicyDocument,
  family: string,
  metric: string,
) {
  const summary = summarizeP2R3(report, policy)
  const section = summary.task_family_summaries.find((entry) => entry.task_family === family)
  assert.ok(section)
  const found = section.metrics.find((entry) => entry.metric_id === metric)
  assert.ok(found)
  return found
}

function loadFixture(name: string): unknown {
  return JSON.parse(readFileSync(new URL(`./fixtures/p2-r1/${name}`, import.meta.url), "utf8"))
}

test("P2-R3 accepts the canonical P2-R2 report produced from committed P2-R1 fixtures", () => {
  const development = loadFixture("development.json")
  const holdout = loadFixture("holdout.json")
  const manifestRaw = loadFixture("manifest.json")
  const manifest = validateManifestSet(manifestRaw, development, holdout)
  const observations: P2R2Observation[] = manifest.flatMap(
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
  const report = runP2R2Report(manifestRaw, development, holdout, observations)
  const policies: P2R3MetricPolicy[] = report.task_family_sections.map((section) => {
    const firstCase = section.cases[0]
    const firstMetric = firstCase?.metrics[0]
    if (firstMetric === undefined) throw new Error("fixture report is missing a metric")
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
  const summary = summarizeP2R3(report, policyFor(report, policies))
  assert.equal(summary.task_family_summaries.length, 2)
  assert.equal(
    summary.task_family_summaries.every((section) => section.metrics[0]?.status === "REDUCED"),
    true,
  )
})

test("P2-R3 produces deterministic numeric and boolean task-family summaries", () => {
  const report = defaultReport()
  const summary = summarizeP2R3(report, policyFor(report))
  assert.equal(summary.schema_version, P2_R3_SUMMARY_SCHEMA)
  assert.deepEqual(
    summary.task_family_summaries.map((entry) => entry.task_family),
    ["alpha", "beta"],
  )
  assert.equal(summary.task_family_summaries[0].metrics[0].reduced_value, 3)
  assert.equal(summary.task_family_summaries[1].metrics[0].reduced_value, 0.5)
  assert.equal(summary.task_family_summaries[1].metrics[0].true_count, 1)
  assert.equal(summary.task_family_summaries[1].metrics[0].denominator_count, 2)
  assert.match(summary.policy_identity, /^sha256:[0-9a-f]{64}$/)
  assert.match(summary.summary_identity, /^sha256:[0-9a-f]{64}$/)
})

test("P2-R3 revalidates exact R2 report structure and derived counts", () => {
  const report = defaultReport()
  const changed = clone(report) as unknown as Record<string, unknown>
  changed.case_count = 99
  assert.throws(() => summarizeP2R3(changed, policyFor(report)), /case_count does not match/)
})

test("stale or malformed R2 report identity fails closed", () => {
  const report = defaultReport()
  const stale = clone(report)
  stale.report_identity = fakeSha("0")
  assert.throws(() => summarizeP2R3(stale, policyFor(stale)), /report_identity does not match/)
})

test("policy input order is not identity-bearing", () => {
  const report = defaultReport()
  const forward = policyFor(report)
  const reversed = policyFor(report, [...forward.metric_policies].reverse())
  const first = summarizeP2R3(report, forward)
  const second = summarizeP2R3(report, reversed)
  assert.equal(first.policy_identity, second.policy_identity)
  assert.equal(first.summary_identity, second.summary_identity)
  assert.equal(canonicalize(first), canonicalize(second))
})

test("repeated identical inputs produce identical summary bytes and identities", () => {
  const report = defaultReport()
  const policy = policyFor(report)
  const first = summarizeP2R3(report, policy)
  const second = summarizeP2R3(report, policy)
  assert.equal(first.summary_identity, second.summary_identity)
  assert.equal(canonicalize(first), canonicalize(second))
})

test("evidence-bearing report and policy changes change summary identity", () => {
  const report = defaultReport()
  const changedReport = defaultReport()
  changedReport.task_family_sections[0].cases[0].metrics[0].value = 8
  const changedIdentityInput = {
    schema_version: changedReport.schema_version,
    benchmark_id: changedReport.benchmark_id,
    benchmark_protocol_version: changedReport.benchmark_protocol_version,
    r1_manifest_set_digest: changedReport.r1_manifest_set_digest,
    observation_set_digest: fakeSha("c"),
    case_count: changedReport.case_count,
    observation_count: changedReport.observation_count,
    missing_observation_count: changedReport.missing_observation_count,
    task_family_sections: changedReport.task_family_sections,
  }
  changedReport.observation_set_digest = changedIdentityInput.observation_set_digest
  changedReport.report_identity = sha256Canonical(changedIdentityInput)
  const first = summarizeP2R3(report, policyFor(report))
  const second = summarizeP2R3(changedReport, policyFor(changedReport))
  assert.notEqual(first.summary_identity, second.summary_identity)

  const changedPolicy = policyFor(report)
  changedPolicy.metric_policies[0].missingness_policy = "OBSERVED_ONLY_WITH_COVERAGE"
  changedPolicy.metric_policies[0].minimum_observed_count = 1
  const third = summarizeP2R3(report, changedPolicy)
  assert.notEqual(first.policy_identity, third.policy_identity)
  assert.notEqual(first.summary_identity, third.summary_identity)
})

test("unknown task families fail closed", () => {
  const report = defaultReport()
  const policy = policyFor(report, [
    metricPolicy(
      "unknown",
      "score",
      "points",
      "NUMBER",
      "ARITHMETIC_MEAN",
      "REQUIRE_COMPLETE",
      1,
    ),
  ])
  assert.throws(() => summarizeP2R3(report, policy), /task_family is not present/)
})

test("unknown metric IDs fail closed", () => {
  const report = defaultReport()
  const policy = policyFor(report, [
    metricPolicy(
      "alpha",
      "unknown",
      "points",
      "NUMBER",
      "ARITHMETIC_MEAN",
      "REQUIRE_COMPLETE",
      1,
    ),
  ])
  assert.throws(() => summarizeP2R3(report, policy), /metric_id is not present/)
})

test("metric unit mismatch fails closed", () => {
  const report = defaultReport()
  const policy = policyFor(report, [
    metricPolicy(
      "alpha",
      "score",
      "ratio",
      "NUMBER",
      "ARITHMETIC_MEAN",
      "REQUIRE_COMPLETE",
      2,
    ),
  ])
  assert.throws(() => summarizeP2R3(report, policy), /unit does not match/)
})

test("duplicate metric policies fail closed", () => {
  const report = defaultReport()
  const entry = metricPolicy(
    "alpha",
    "score",
    "points",
    "NUMBER",
    "ARITHMETIC_MEAN",
    "REQUIRE_COMPLETE",
    2,
  )
  assert.throws(
    () => summarizeP2R3(report, policyFor(report, [entry, clone(entry)])),
    /duplicate P2-R3 metric policy/,
  )
})

test("unsupported value kinds and reducers fail closed", () => {
  const report = defaultReport()
  const badKind = metricPolicy(
    "alpha",
    "score",
    "points",
    "NUMBER",
    "ARITHMETIC_MEAN",
    "REQUIRE_COMPLETE",
    2,
  ) as unknown as Record<string, unknown>
  badKind.value_kind = "STRING"
  assert.throws(
    () =>
      summarizeP2R3(
        report,
        policyFor(report, [badKind as unknown as P2R3MetricPolicy]),
      ),
    /value_kind is unsupported/,
  )

  const badReducer = metricPolicy(
    "alpha",
    "score",
    "points",
    "NUMBER",
    "ARITHMETIC_MEAN",
    "REQUIRE_COMPLETE",
    2,
  ) as unknown as Record<string, unknown>
  badReducer.reducer = "MEDIAN"
  assert.throws(
    () =>
      summarizeP2R3(
        report,
        policyFor(report, [badReducer as unknown as P2R3MetricPolicy]),
      ),
    /reducer is unsupported/,
  )
})

test("reducer and value-kind mismatch fails closed", () => {
  const report = defaultReport()
  const policy = policyFor(report, [
    metricPolicy(
      "alpha",
      "score",
      "points",
      "BOOLEAN",
      "ARITHMETIC_MEAN",
      "REQUIRE_COMPLETE",
      2,
    ),
  ])
  assert.throws(() => summarizeP2R3(report, policy), /reducer is incompatible/)
})

test("mixed observed value kinds fail closed against explicit policy", () => {
  const report = makeReport([
    {
      task_family: "alpha",
      cases: [
        {
          case_id: "alpha-001",
          metrics: [
            { metric_id: "mixed", unit: "evidence", measurement_status: "observed", value: 1 },
          ],
        },
        {
          case_id: "alpha-002",
          metrics: [
            {
              metric_id: "mixed",
              unit: "evidence",
              measurement_status: "observed",
              value: true,
            },
          ],
        },
      ],
    },
  ])
  const policy = policyFor(report, [
    metricPolicy(
      "alpha",
      "mixed",
      "evidence",
      "NUMBER",
      "ARITHMETIC_MEAN",
      "REQUIRE_COMPLETE",
      2,
    ),
  ])
  assert.throws(() => summarizeP2R3(report, policy), /value_kind NUMBER does not match/)
})

test("minimum_observed_count rejects invalid numeric forms", () => {
  const report = defaultReport()
  for (const invalid of [
    0,
    -1,
    1.5,
    Number.MAX_SAFE_INTEGER + 1,
    Number.POSITIVE_INFINITY,
    Number.NaN,
  ]) {
    const entry = metricPolicy(
      "alpha",
      "score",
      "points",
      "NUMBER",
      "ARITHMETIC_MEAN",
      "REQUIRE_COMPLETE",
      2,
    ) as unknown as Record<string, unknown>
    entry.minimum_observed_count = invalid
    assert.throws(
      () =>
        summarizeP2R3(
          report,
          policyFor(report, [entry as unknown as P2R3MetricPolicy]),
        ),
      /contract violation/,
    )
  }
})

test("minimum_observed_count greater than expected count fails closed", () => {
  const report = defaultReport()
  const policy = policyFor(report, [
    metricPolicy(
      "alpha",
      "score",
      "points",
      "NUMBER",
      "ARITHMETIC_MEAN",
      "OBSERVED_ONLY_WITH_COVERAGE",
      3,
    ),
  ])
  assert.throws(() => summarizeP2R3(report, policy), /exceeds expected_count=2/)
})

test("REQUIRE_COMPLETE requires minimum_observed_count to equal expected_count", () => {
  const report = defaultReport()
  const policy = policyFor(report, [
    metricPolicy(
      "alpha",
      "score",
      "points",
      "NUMBER",
      "ARITHMETIC_MEAN",
      "REQUIRE_COMPLETE",
      1,
    ),
  ])
  assert.throws(() => summarizeP2R3(report, policy), /must equal expected_count/)
})

test("REQUIRE_COMPLETE emits per-metric insufficient evidence without aborting independent metrics", () => {
  const report = makeReport([
    {
      task_family: "alpha",
      cases: [
        {
          case_id: "alpha-001",
          metrics: [
            { metric_id: "score", unit: "points", measurement_status: "observed", value: 2 },
          ],
        },
        {
          case_id: "alpha-002",
          metrics: [
            { metric_id: "score", unit: "points", measurement_status: "missing", value: null },
          ],
        },
      ],
    },
    {
      task_family: "beta",
      cases: [
        {
          case_id: "beta-001",
          metrics: [
            {
              metric_id: "success",
              unit: "boolean",
              measurement_status: "observed",
              value: true,
            },
          ],
        },
        {
          case_id: "beta-002",
          metrics: [
            {
              metric_id: "success",
              unit: "boolean",
              measurement_status: "observed",
              value: false,
            },
          ],
        },
      ],
    },
  ])
  const policy = policyFor(report, [
    metricPolicy(
      "alpha",
      "score",
      "points",
      "NUMBER",
      "ARITHMETIC_MEAN",
      "REQUIRE_COMPLETE",
      2,
    ),
    metricPolicy(
      "beta",
      "success",
      "boolean",
      "BOOLEAN",
      "BOOLEAN_TRUE_RATE",
      "REQUIRE_COMPLETE",
      2,
    ),
  ])
  const summary = summarizeP2R3(report, policy)
  const alpha = summary.task_family_summaries[0].metrics[0]
  const beta = summary.task_family_summaries[1].metrics[0]
  assert.equal(alpha.status, "INSUFFICIENT_EVIDENCE")
  assert.equal(alpha.reduced_value, null)
  assert.equal(alpha.observed_count, 1)
  assert.equal(alpha.missing_count, 1)
  assert.equal(beta.status, "REDUCED")
  assert.equal(beta.reduced_value, 0.5)
})

test("OBSERVED_ONLY_WITH_COVERAGE reduces observed values only when the explicit minimum is met", () => {
  const report = makeReport([
    {
      task_family: "alpha",
      cases: [
        {
          case_id: "alpha-001",
          metrics: [
            { metric_id: "score", unit: "points", measurement_status: "observed", value: 2 },
          ],
        },
        {
          case_id: "alpha-002",
          metrics: [
            {
              metric_id: "score",
              unit: "points",
              measurement_status: "unavailable",
              value: null,
            },
          ],
        },
        {
          case_id: "alpha-003",
          metrics: [
            { metric_id: "score", unit: "points", measurement_status: "observed", value: 4 },
          ],
        },
      ],
    },
  ])
  const policy = policyFor(report, [
    metricPolicy(
      "alpha",
      "score",
      "points",
      "NUMBER",
      "ARITHMETIC_MEAN",
      "OBSERVED_ONLY_WITH_COVERAGE",
      2,
    ),
  ])
  const metric = metricSummary(report, policy, "alpha", "score")
  assert.equal(metric.status, "REDUCED")
  assert.equal(metric.reduced_value, 3)
  assert.equal(metric.expected_count, 3)
  assert.equal(metric.observed_count, 2)
  assert.equal(metric.unavailable_count, 1)
})

test("OBSERVED_ONLY_WITH_COVERAGE emits insufficient evidence below minimum", () => {
  const report = makeReport([
    {
      task_family: "alpha",
      cases: [
        {
          case_id: "alpha-001",
          metrics: [
            { metric_id: "score", unit: "points", measurement_status: "observed", value: 2 },
          ],
        },
        {
          case_id: "alpha-002",
          metrics: [
            { metric_id: "score", unit: "points", measurement_status: "missing", value: null },
          ],
        },
        {
          case_id: "alpha-003",
          metrics: [
            {
              metric_id: "score",
              unit: "points",
              measurement_status: "unavailable",
              value: null,
            },
          ],
        },
      ],
    },
  ])
  const policy = policyFor(report, [
    metricPolicy(
      "alpha",
      "score",
      "points",
      "NUMBER",
      "ARITHMETIC_MEAN",
      "OBSERVED_ONLY_WITH_COVERAGE",
      2,
    ),
  ])
  const metric = metricSummary(report, policy, "alpha", "score")
  assert.equal(metric.status, "INSUFFICIENT_EVIDENCE")
  assert.equal(metric.reduced_value, null)
  assert.equal(metric.missing_count, 1)
  assert.equal(metric.unavailable_count, 1)
})

test("zero observed values remain insufficient evidence rather than zero", () => {
  const report = makeReport([
    {
      task_family: "alpha",
      cases: [
        {
          case_id: "alpha-001",
          metrics: [
            { metric_id: "score", unit: "points", measurement_status: "missing", value: null },
          ],
        },
        {
          case_id: "alpha-002",
          metrics: [
            {
              metric_id: "score",
              unit: "points",
              measurement_status: "unavailable",
              value: null,
            },
          ],
        },
      ],
    },
  ])
  const policy = policyFor(report, [
    metricPolicy(
      "alpha",
      "score",
      "points",
      "NUMBER",
      "ARITHMETIC_MEAN",
      "OBSERVED_ONLY_WITH_COVERAGE",
      1,
    ),
  ])
  const metric = metricSummary(report, policy, "alpha", "score")
  assert.equal(metric.status, "INSUFFICIENT_EVIDENCE")
  assert.equal(metric.reduced_value, null)
  assert.equal(metric.observed_count, 0)
})

test("non-finite numeric report values fail before summary identity construction", () => {
  const report = defaultReport()
  const hostile = clone(report) as unknown as Record<string, any>
  hostile.task_family_sections[0].cases[0].metrics[0].value = Number.POSITIVE_INFINITY
  assert.throws(() => summarizeP2R3(hostile, policyFor(report)), /contract violation/)
})

test("arithmetic mean fails closed when finite inputs would accumulate to a non-finite reducer result", () => {
  const report = makeReport([
    {
      task_family: "alpha",
      cases: [
        {
          case_id: "alpha-001",
          metrics: [
            {
              metric_id: "score",
              unit: "points",
              measurement_status: "observed",
              value: Number.MAX_VALUE,
            },
          ],
        },
        {
          case_id: "alpha-002",
          metrics: [
            {
              metric_id: "score",
              unit: "points",
              measurement_status: "observed",
              value: Number.MAX_VALUE,
            },
          ],
        },
        {
          case_id: "alpha-003",
          metrics: [
            {
              metric_id: "score",
              unit: "points",
              measurement_status: "observed",
              value: Number.MAX_VALUE,
            },
          ],
        },
      ],
    },
  ])
  const policy = policyFor(report, [
    metricPolicy(
      "alpha",
      "score",
      "points",
      "NUMBER",
      "ARITHMETIC_MEAN",
      "REQUIRE_COMPLETE",
      3,
    ),
  ])
  assert.throws(
    () => summarizeP2R3(report, policy),
    /ARITHMETIC_MEAN produced a non-finite result/,
  )
})

test("arithmetic mean uses only observed finite numeric values and preserves the input unit", () => {
  const report = makeReport([
    {
      task_family: "alpha",
      cases: [
        {
          case_id: "alpha-001",
          metrics: [
            {
              metric_id: "score",
              unit: "milliseconds",
              measurement_status: "observed",
              value: 10,
            },
          ],
        },
        {
          case_id: "alpha-002",
          metrics: [
            {
              metric_id: "score",
              unit: "milliseconds",
              measurement_status: "missing",
              value: null,
            },
          ],
        },
        {
          case_id: "alpha-003",
          metrics: [
            {
              metric_id: "score",
              unit: "milliseconds",
              measurement_status: "observed",
              value: 20,
            },
          ],
        },
      ],
    },
  ])
  const policy = policyFor(report, [
    metricPolicy(
      "alpha",
      "score",
      "milliseconds",
      "NUMBER",
      "ARITHMETIC_MEAN",
      "OBSERVED_ONLY_WITH_COVERAGE",
      2,
    ),
  ])
  const metric = metricSummary(report, policy, "alpha", "score")
  assert.equal(metric.reduced_value, 15)
  assert.equal(metric.input_unit, "milliseconds")
  assert.equal(metric.output_unit, "milliseconds")
  assert.equal(metric.true_count, null)
  assert.equal(metric.denominator_count, null)
})

test("boolean true rate exposes exact counts and never treats missing or unavailable as false", () => {
  const report = makeReport([
    {
      task_family: "beta",
      cases: [
        {
          case_id: "beta-001",
          metrics: [
            {
              metric_id: "success",
              unit: "boolean",
              measurement_status: "observed",
              value: true,
            },
          ],
        },
        {
          case_id: "beta-002",
          metrics: [
            {
              metric_id: "success",
              unit: "boolean",
              measurement_status: "missing",
              value: null,
            },
          ],
        },
        {
          case_id: "beta-003",
          metrics: [
            {
              metric_id: "success",
              unit: "boolean",
              measurement_status: "observed",
              value: false,
            },
          ],
        },
        {
          case_id: "beta-004",
          metrics: [
            {
              metric_id: "success",
              unit: "boolean",
              measurement_status: "unavailable",
              value: null,
            },
          ],
        },
      ],
    },
  ])
  const policy = policyFor(report, [
    metricPolicy(
      "beta",
      "success",
      "boolean",
      "BOOLEAN",
      "BOOLEAN_TRUE_RATE",
      "OBSERVED_ONLY_WITH_COVERAGE",
      2,
    ),
  ])
  const metric = metricSummary(report, policy, "beta", "success")
  assert.equal(metric.reduced_value, 0.5)
  assert.equal(metric.output_unit, "ratio_0_1")
  assert.equal(metric.true_count, 1)
  assert.equal(metric.denominator_count, 2)
  assert.equal(metric.missing_count, 1)
  assert.equal(metric.unavailable_count, 1)
})

test("report-level expected observation counts must reconcile exactly", () => {
  const report = defaultReport()
  const tampered = clone(report)
  tampered.observation_count -= 1
  tampered.missing_observation_count += 1
  const identityInput = {
    schema_version: tampered.schema_version,
    benchmark_id: tampered.benchmark_id,
    benchmark_protocol_version: tampered.benchmark_protocol_version,
    r1_manifest_set_digest: tampered.r1_manifest_set_digest,
    observation_set_digest: tampered.observation_set_digest,
    case_count: tampered.case_count,
    observation_count: tampered.observation_count,
    missing_observation_count: tampered.missing_observation_count,
    task_family_sections: tampered.task_family_sections,
  }
  tampered.report_identity = sha256Canonical(identityInput)
  assert.throws(
    () => summarizeP2R3(tampered, policyFor(tampered)),
    /observation_count does not match/,
  )
})

test("task families and metrics remain separated and deterministically ordered", () => {
  const report = defaultReport()
  const policy = policyFor(report, [...policyFor(report).metric_policies].reverse())
  const summary = summarizeP2R3(report, policy)
  assert.deepEqual(
    summary.task_family_summaries.map((entry) => entry.task_family),
    ["alpha", "beta"],
  )
  assert.equal(summary.task_family_summaries.every((entry) => entry.metrics.length === 1), true)
})

test("summary materializes no direction, threshold, blended score, comparison, ranking, winner, or promotion field", () => {
  const report = defaultReport()
  const summary = summarizeP2R3(report, policyFor(report))
  assert.deepEqual(Object.keys(summary).sort(), [
    "benchmark_id",
    "benchmark_protocol_version",
    "policy_identity",
    "r2_report_identity",
    "schema_version",
    "summary_identity",
    "task_family_summaries",
  ])
  const serialized = canonicalize(summary)
  for (const forbidden of [
    "higher_is_better",
    "lower_is_better",
    "threshold",
    "overall_score",
    "blended_score",
    "universal_score",
    "comparison",
    "ranking",
    "leaderboard",
    "winner",
    "superior",
    "promotion",
  ]) {
    assert.equal(serialized.includes(`\"${forbidden}\"`), false)
  }
})

test("returned summary graph is deeply frozen and caller mutation cannot alter semantics", () => {
  const report = defaultReport()
  const policy = policyFor(report)
  const summary = summarizeP2R3(report, policy)
  const identity = summary.summary_identity
  report.task_family_sections[0].cases[0].metrics[0].value = 99
  policy.metric_policies[0].metric_id = "mutated"
  assert.equal(summary.summary_identity, identity)
  assert.equal(summary.task_family_summaries[0].metrics[0].reduced_value, 3)
  assert.equal(Object.isFrozen(summary), true)
  assert.equal(Object.isFrozen(summary.task_family_summaries), true)
  assert.equal(Object.isFrozen(summary.task_family_summaries[0]), true)
  assert.equal(Object.isFrozen(summary.task_family_summaries[0].metrics), true)
  assert.equal(Object.isFrozen(summary.task_family_summaries[0].metrics[0]), true)
})

test("hostile report accessors and proxies fail closed without executing hooks", () => {
  const report = defaultReport()
  const policy = policyFor(report)
  let getterInvoked = false
  const accessor = clone(report) as unknown as Record<string, unknown>
  Object.defineProperty(accessor, "benchmark_id", {
    enumerable: true,
    configurable: true,
    get() {
      getterInvoked = true
      return report.benchmark_id
    },
  })
  const proxy = new Proxy(clone(report) as unknown as Record<string, unknown>, {
    get() {
      throw new Error("proxy hook must not execute")
    },
  })
  assert.throws(() => summarizeP2R3(accessor, policy), /contract violation/)
  assert.throws(() => summarizeP2R3(proxy, policy), /contract violation/)
  assert.equal(getterInvoked, false)
})

test("hostile policy objects, arrays, and non-JSON values fail closed", () => {
  const report = defaultReport()
  const base = policyFor(report)
  let getterInvoked = false
  const accessor = clone(base) as unknown as Record<string, unknown>
  Object.defineProperty(accessor, "benchmark_id", {
    enumerable: true,
    configurable: true,
    get() {
      getterInvoked = true
      return report.benchmark_id
    },
  })
  const proxy = new Proxy(clone(base) as unknown as Record<string, unknown>, {
    get() {
      throw new Error("policy proxy hook must not execute")
    },
  })
  const sparse = clone(base) as unknown as Record<string, unknown>
  const sparsePolicies = new Array<unknown>(2)
  sparsePolicies[1] = base.metric_policies[0]
  sparse.metric_policies = sparsePolicies
  const bigint = clone(base) as unknown as Record<string, unknown>
  ;(bigint.metric_policies as Array<Record<string, unknown>>)[0].minimum_observed_count = 1n
  for (const candidate of [accessor, proxy, sparse, bigint]) {
    assert.throws(() => summarizeP2R3(report, candidate), /contract violation/)
  }
  assert.equal(getterInvoked, false)
})

test("__proto__ remains ordinary canonical data and cannot pollute prototypes", () => {
  const generic = Object.create(null) as Record<string, unknown>
  Object.defineProperty(generic, "__proto__", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { polluted: true },
  })
  const serialized = canonicalize(generic)
  assert.match(serialized, /"__proto__"/)
  assert.equal((Object.prototype as Record<string, unknown>).polluted, undefined)

  const report = defaultReport()
  const policy = clone(policyFor(report)) as unknown as Record<string, unknown>
  Object.defineProperty(policy, "__proto__", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { polluted: true },
  })
  assert.throws(() => summarizeP2R3(report, policy), /keys are not canonical/)
  assert.equal((Object.prototype as Record<string, unknown>).polluted, undefined)
})

test("timestamps, paths, locale, host, and process state are not summary identity inputs", () => {
  const report = defaultReport()
  const policy = policyFor(report)
  const before = summarizeP2R3(report, policy)
  const oldNoise = process.env.KODAC_P2_R3_IDENTITY_NOISE
  process.env.KODAC_P2_R3_IDENTITY_NOISE = "/tmp/host-specific/2026-08-28T15:00:00Z"
  try {
    const after = summarizeP2R3(report, policy)
    assert.equal(before.summary_identity, after.summary_identity)
  } finally {
    if (oldNoise === undefined) delete process.env.KODAC_P2_R3_IDENTITY_NOISE
    else process.env.KODAC_P2_R3_IDENTITY_NOISE = oldNoise
  }

  const withTimestamp = clone(policy) as unknown as Record<string, unknown>
  withTimestamp.timestamp = "2026-08-28T15:00:00Z"
  assert.throws(() => summarizeP2R3(report, withTimestamp), /keys are not canonical/)
})

test("exact schema and key contracts fail closed", () => {
  const report = defaultReport()
  const badReport = clone(report) as unknown as Record<string, unknown>
  badReport.schema_version = "p2-r2-report/v999"
  assert.throws(() => summarizeP2R3(badReport, policyFor(report)), /schema_version is unsupported/)

  const policy = clone(policyFor(report)) as unknown as Record<string, unknown>
  policy.extra = true
  assert.throws(() => summarizeP2R3(report, policy), /keys are not canonical/)
})

test("policy benchmark, protocol, and R2 report identity bindings are exact", () => {
  const report = defaultReport()
  const benchmark = policyFor(report)
  benchmark.benchmark_id = "other"
  assert.throws(() => summarizeP2R3(report, benchmark), /benchmark_id does not match/)

  const protocol = policyFor(report)
  protocol.benchmark_protocol_version = "other/v1"
  assert.throws(
    () => summarizeP2R3(report, protocol),
    /benchmark_protocol_version does not match/,
  )

  const identity = policyFor(report)
  identity.r2_report_identity = fakeSha("0")
  assert.throws(() => summarizeP2R3(report, identity), /r2_report_identity does not match/)
})

test("caller-reordered R2 arrays cannot self-assert a fresh non-canonical report identity", () => {
  const report = defaultReport()
  const reordered = clone(report)
  reordered.task_family_sections.reverse()
  const identityInput = {
    schema_version: reordered.schema_version,
    benchmark_id: reordered.benchmark_id,
    benchmark_protocol_version: reordered.benchmark_protocol_version,
    r1_manifest_set_digest: reordered.r1_manifest_set_digest,
    observation_set_digest: reordered.observation_set_digest,
    case_count: reordered.case_count,
    observation_count: reordered.observation_count,
    missing_observation_count: reordered.missing_observation_count,
    task_family_sections: reordered.task_family_sections,
  }
  reordered.report_identity = sha256Canonical(identityInput)
  assert.throws(() => summarizeP2R3(reordered, policyFor(reordered)), /strictly sorted/)
})

test("metrics without an explicit policy remain unsummarized", () => {
  const report = defaultReport()
  const policy = policyFor(report, [
    metricPolicy(
      "alpha",
      "score",
      "points",
      "NUMBER",
      "ARITHMETIC_MEAN",
      "REQUIRE_COMPLETE",
      2,
    ),
  ])
  const summary = summarizeP2R3(report, policy)
  assert.deepEqual(
    summary.task_family_summaries.map((entry) => entry.task_family),
    ["alpha"],
  )
  assert.equal(summary.task_family_summaries[0].metrics.length, 1)
})
