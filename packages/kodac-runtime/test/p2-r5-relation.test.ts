import assert from "node:assert/strict"
import test from "node:test"

import { sha256Canonical } from "../bench/p2-r1/contract.ts"
import {
  P2_R4_COMPARISON_SCHEMA,
  P2_R4_SUBJECT_SCHEMA,
  type P2R4Comparison,
  type P2R4Direction,
  type P2R4MetricComparison,
} from "../bench/p2-r4/comparison.ts"
import {
  P2_R5_RELATION_SET_SCHEMA,
  deriveP2R5Relations,
} from "../bench/p2-r5/relation.ts"
import type { P2R3MetricSummary } from "../bench/p2-r3/summary.ts"

function identity(seed: string): string {
  return sha256Canonical({ seed })
}

function numericSummary(metricId: string, unit: string, value: number | null): P2R3MetricSummary {
  const reduced = value !== null
  return {
    metric_id: metricId,
    input_unit: unit,
    output_unit: unit,
    value_kind: "NUMBER",
    reducer: "ARITHMETIC_MEAN",
    missingness_policy: "REQUIRE_COMPLETE",
    minimum_observed_count: 1,
    expected_count: 1,
    observed_count: reduced ? 1 : 0,
    missing_count: reduced ? 0 : 1,
    unavailable_count: 0,
    status: reduced ? "REDUCED" : "INSUFFICIENT_EVIDENCE",
    reduced_value: value,
    true_count: null,
    denominator_count: null,
  }
}

function numericMetric(
  metricId: string,
  direction: P2R4Direction,
  left: number | null,
  right: number | null,
  unit = "score",
): P2R4MetricComparison {
  const leftSummary = numericSummary(metricId, unit, left)
  const rightSummary = numericSummary(metricId, unit, right)
  const comparable = left !== null && right !== null
  return {
    metric_id: metricId,
    input_unit: unit,
    output_unit: unit,
    value_kind: "NUMBER",
    reducer: "ARITHMETIC_MEAN",
    missingness_policy: "REQUIRE_COMPLETE",
    minimum_observed_count: 1,
    expected_count: 1,
    direction,
    left_summary: leftSummary,
    right_summary: rightSummary,
    status: comparable ? "COMPARABLE" : "INSUFFICIENT_EVIDENCE",
    left_value: comparable ? left : null,
    right_value: comparable ? right : null,
    raw_delta_left_minus_right: comparable ? left - right : null,
  }
}

function booleanSummary(metricId: string, trueCount: number, denominator: number): P2R3MetricSummary {
  return {
    metric_id: metricId,
    input_unit: "boolean",
    output_unit: "ratio_0_1",
    value_kind: "BOOLEAN",
    reducer: "BOOLEAN_TRUE_RATE",
    missingness_policy: "REQUIRE_COMPLETE",
    minimum_observed_count: denominator,
    expected_count: denominator,
    observed_count: denominator,
    missing_count: 0,
    unavailable_count: 0,
    status: "REDUCED",
    reduced_value: trueCount / denominator,
    true_count: trueCount,
    denominator_count: denominator,
  }
}

function booleanMetric(
  metricId: string,
  direction: P2R4Direction,
  leftTrue: number,
  rightTrue: number,
  denominator = 4,
): P2R4MetricComparison {
  const leftSummary = booleanSummary(metricId, leftTrue, denominator)
  const rightSummary = booleanSummary(metricId, rightTrue, denominator)
  const left = leftSummary.reduced_value as number
  const right = rightSummary.reduced_value as number
  return {
    metric_id: metricId,
    input_unit: "boolean",
    output_unit: "ratio_0_1",
    value_kind: "BOOLEAN",
    reducer: "BOOLEAN_TRUE_RATE",
    missingness_policy: "REQUIRE_COMPLETE",
    minimum_observed_count: denominator,
    expected_count: denominator,
    direction,
    left_summary: leftSummary,
    right_summary: rightSummary,
    status: "COMPARABLE",
    left_value: left,
    right_value: right,
    raw_delta_left_minus_right: left - right,
  }
}

function comparisonFromFamilies(
  families: Array<{ task_family: string; metrics: P2R4MetricComparison[] }>,
): P2R4Comparison {
  const identityInput: Omit<P2R4Comparison, "comparison_identity"> = {
    schema_version: P2_R4_COMPARISON_SCHEMA,
    benchmark_id: "kodacbench.synthetic",
    benchmark_protocol_version: "v1",
    left_subject: {
      schema_version: P2_R4_SUBJECT_SCHEMA,
      subject_id: "left",
      system_version_commit_identity: identity("left-system"),
      raw_artifact_log_set_identity: identity("left-artifacts"),
    },
    right_subject: {
      schema_version: P2_R4_SUBJECT_SCHEMA,
      subject_id: "right",
      system_version_commit_identity: identity("right-system"),
      raw_artifact_log_set_identity: identity("right-artifacts"),
    },
    left_r2_report_identity: identity("left-r2"),
    right_r2_report_identity: identity("right-r2"),
    left_summary_identity: identity("left-r3"),
    right_summary_identity: identity("right-r3"),
    shared_evaluation_context_identity: identity("shared-context"),
    comparison_policy_identity: identity("r4-policy"),
    task_family_comparisons: families,
  }
  return { ...identityInput, comparison_identity: sha256Canonical(identityInput) }
}

function comparison(metrics: P2R4MetricComparison[]): P2R4Comparison {
  return comparisonFromFamilies([{ task_family: "family-a", metrics }])
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function rebindComparisonIdentity(value: P2R4Comparison): void {
  const { comparison_identity: _ignored, ...identityInput } = value
  value.comparison_identity = sha256Canonical(identityInput)
}

function metricRelations(result: ReturnType<typeof deriveP2R5Relations>) {
  return result.task_family_relations[0]!.metrics
}

test("derives the exact direction-aware relation vocabulary", () => {
  const input = comparison([
    numericMetric("a_equal", "HIGHER_IS_BETTER", 2, 2),
    numericMetric("b_higher_left", "HIGHER_IS_BETTER", 3, 2),
    numericMetric("c_higher_right", "HIGHER_IS_BETTER", 2, 3),
    numericMetric("d_lower_left", "LOWER_IS_BETTER", 2, 3),
    numericMetric("e_lower_right", "LOWER_IS_BETTER", 3, 2),
  ])
  assert.deepEqual(
    metricRelations(deriveP2R5Relations(input)).map((metric) => metric.relation),
    [
      "EQUAL_RAW_VALUE",
      "LEFT_FAVORED_BY_DIRECTION",
      "RIGHT_FAVORED_BY_DIRECTION",
      "LEFT_FAVORED_BY_DIRECTION",
      "RIGHT_FAVORED_BY_DIRECTION",
    ],
  )
})

test("preserves insufficient evidence without inferring a side", () => {
  const input = comparison([numericMetric("a_missing", "HIGHER_IS_BETTER", null, 3)])
  const metric = metricRelations(deriveP2R5Relations(input))[0]!
  assert.equal(metric.relation, "INSUFFICIENT_EVIDENCE")
  assert.equal(metric.status, "INSUFFICIENT_EVIDENCE")
  assert.equal(metric.left_value, null)
  assert.equal(metric.right_value, null)
  assert.equal(metric.raw_delta_left_minus_right, null)
  assert.equal(metric.left_summary.status, "INSUFFICIENT_EVIDENCE")
  assert.equal(metric.right_summary.status, "REDUCED")
})

test("keeps raw left-minus-right delta independent of direction", () => {
  const input = comparison([numericMetric("a_latency", "LOWER_IS_BETTER", 2, 5, "ms")])
  const metric = metricRelations(deriveP2R5Relations(input))[0]!
  assert.equal(metric.raw_delta_left_minus_right, -3)
  assert.equal(metric.relation, "LEFT_FAVORED_BY_DIRECTION")
})

test("validates BOOLEAN_TRUE_RATE evidence before relation derivation", () => {
  const input = comparison([booleanMetric("a_success", "HIGHER_IS_BETTER", 3, 1)])
  const metric = metricRelations(deriveP2R5Relations(input))[0]!
  assert.equal(metric.left_value, 0.75)
  assert.equal(metric.right_value, 0.25)
  assert.equal(metric.relation, "LEFT_FAVORED_BY_DIRECTION")
})

test("is deterministic and binds the canonical relation-set identity", () => {
  const input = comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)])
  const first = deriveP2R5Relations(input)
  const second = deriveP2R5Relations(input)
  assert.deepEqual(first, second)
  assert.equal(first.schema_version, P2_R5_RELATION_SET_SCHEMA)
  const { relation_set_identity: _identity, ...identityInput } = first
  assert.equal(first.relation_set_identity, sha256Canonical(identityInput))
})

test("relation-set identity changes when valid bound R4 evidence changes", () => {
  const first = deriveP2R5Relations(comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)]))
  const second = deriveP2R5Relations(comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 8, 5)]))
  assert.notEqual(first.r4_comparison_identity, second.r4_comparison_identity)
  assert.notEqual(first.relation_set_identity, second.relation_set_identity)
})

test("returns deeply frozen evidence independent of later caller mutation", () => {
  const input = comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)])
  const result = deriveP2R5Relations(input)
  input.task_family_comparisons[0]!.metrics[0]!.left_value = 999
  assert.equal(result.task_family_relations[0]!.metrics[0]!.left_value, 7)
  assert.equal(Object.isFrozen(result), true)
  assert.equal(Object.isFrozen(result.left_subject), true)
  assert.equal(Object.isFrozen(result.task_family_relations), true)
  assert.equal(Object.isFrozen(result.task_family_relations[0]!.metrics[0]!.left_summary), true)
})

test("accepts object-key reordering without making key order identity-bearing", () => {
  const input = comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)])
  const reordered = Object.fromEntries(Object.entries(input).reverse())
  const first = deriveP2R5Relations(input)
  const second = deriveP2R5Relations(reordered)
  assert.equal(first.relation_set_identity, second.relation_set_identity)
})

test("rejects a tampered comparison identity", () => {
  const input = comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)])
  input.comparison_identity = identity("tampered")
  assert.throws(() => deriveP2R5Relations(input), /comparison_identity/)
})

test("rejects a tampered raw delta even when comparison identity is rebound", () => {
  const input = comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)])
  input.task_family_comparisons[0]!.metrics[0]!.raw_delta_left_minus_right = 999
  rebindComparisonIdentity(input)
  assert.throws(() => deriveP2R5Relations(input), /raw_delta_left_minus_right/)
})

test("rejects pairwise values that diverge from nested summary evidence", () => {
  const input = comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)])
  input.task_family_comparisons[0]!.metrics[0]!.left_value = 8
  input.task_family_comparisons[0]!.metrics[0]!.raw_delta_left_minus_right = 3
  rebindComparisonIdentity(input)
  assert.throws(() => deriveP2R5Relations(input), /summary evidence/)
})

test("rejects invalid coverage status even when the outer identity is rebound", () => {
  const input = comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)])
  input.task_family_comparisons[0]!.metrics[0]!.left_summary.status = "INSUFFICIENT_EVIDENCE"
  input.task_family_comparisons[0]!.metrics[0]!.left_summary.reduced_value = null
  rebindComparisonIdentity(input)
  assert.throws(() => deriveP2R5Relations(input), /status does not match coverage evidence/)
})

test("rejects invalid direction values", () => {
  const input = comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)])
  ;(input.task_family_comparisons[0]!.metrics[0] as unknown as Record<string, unknown>).direction = "SIDEWAYS"
  rebindComparisonIdentity(input)
  assert.throws(() => deriveP2R5Relations(input), /direction is unsupported/)
})

test("rejects unknown and missing top-level fields", () => {
  const unknown = clone(comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)])) as unknown as Record<string, unknown>
  unknown.winner = "left"
  assert.throws(() => deriveP2R5Relations(unknown), /unknown=\[winner\]/)

  const missing = clone(comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)])) as unknown as Record<string, unknown>
  delete missing.comparison_policy_identity
  assert.throws(() => deriveP2R5Relations(missing), /missing=\[comparison_policy_identity\]/)
})

test("rejects unsorted and duplicate metric order", () => {
  const unsorted = comparison([
    numericMetric("b_score", "HIGHER_IS_BETTER", 7, 5),
    numericMetric("a_score", "HIGHER_IS_BETTER", 6, 5),
  ])
  rebindComparisonIdentity(unsorted)
  assert.throws(() => deriveP2R5Relations(unsorted), /strictly sorted/)

  const duplicate = comparison([
    numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5),
    numericMetric("a_score", "LOWER_IS_BETTER", 7, 5),
  ])
  rebindComparisonIdentity(duplicate)
  assert.throws(() => deriveP2R5Relations(duplicate), /strictly sorted/)
})

test("rejects unsorted and duplicate task-family order", () => {
  const metric = numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)
  const unsorted = comparisonFromFamilies([
    { task_family: "family-b", metrics: [metric] },
    { task_family: "family-a", metrics: [clone(metric)] },
  ])
  assert.throws(() => deriveP2R5Relations(unsorted), /strictly sorted/)

  const duplicate = comparisonFromFamilies([
    { task_family: "family-a", metrics: [metric] },
    { task_family: "family-a", metrics: [clone(metric)] },
  ])
  assert.throws(() => deriveP2R5Relations(duplicate), /strictly sorted/)
})

test("rejects same-subject and same-system-version comparisons", () => {
  const sameSubject = comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)])
  sameSubject.right_subject.subject_id = sameSubject.left_subject.subject_id
  rebindComparisonIdentity(sameSubject)
  assert.throws(() => deriveP2R5Relations(sameSubject), /subject_id values must be distinct/)

  const sameSystem = comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)])
  sameSystem.right_subject.system_version_commit_identity = sameSystem.left_subject.system_version_commit_identity
  rebindComparisonIdentity(sameSystem)
  assert.throws(() => deriveP2R5Relations(sameSystem), /system_version_commit_identity values must be distinct/)
})

test("fails closed on hostile Proxy, accessor, cyclic, sparse, bigint, and non-finite inputs", () => {
  const base = comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)])
  assert.throws(() => deriveP2R5Relations(new Proxy(base, {})), /Proxy/)

  let getterExecuted = false
  const accessor = clone(base) as unknown as Record<string, unknown>
  Object.defineProperty(accessor, "benchmark_id", {
    enumerable: true,
    get() {
      getterExecuted = true
      return "unexpected"
    },
  })
  assert.throws(() => deriveP2R5Relations(accessor), /enumerable data property/)
  assert.equal(getterExecuted, false)

  const cyclic = clone(base) as unknown as Record<string, unknown>
  cyclic.loop = cyclic
  assert.throws(() => deriveP2R5Relations(cyclic), /cycle/)

  const sparse = clone(base)
  sparse.task_family_comparisons = new Array(1)
  assert.throws(() => deriveP2R5Relations(sparse), /present enumerable data property/)

  const bigint = clone(base) as unknown as Record<string, unknown>
  bigint.benchmark_id = 1n
  assert.throws(() => deriveP2R5Relations(bigint), /non-JSON/)

  const nonFinite = clone(base)
  nonFinite.task_family_comparisons[0]!.metrics[0]!.left_value = Number.NaN
  assert.throws(() => deriveP2R5Relations(nonFinite), /non-finite/)
})

test("does not emit global winner, score, ranking, threshold, or promotion fields", () => {
  const result = deriveP2R5Relations(comparison([numericMetric("a_score", "HIGHER_IS_BETTER", 7, 5)]))
  const forbidden = [
    "winner",
    "loser",
    "overall_score",
    "blended_score",
    "rank",
    "ranking",
    "threshold",
    "tolerance",
    "promotion",
    "release_decision",
  ]
  for (const key of forbidden) {
    assert.equal(Object.hasOwn(result, key), false)
    assert.equal(Object.hasOwn(result.task_family_relations[0]!.metrics[0]!, key), false)
  }
})
