import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFile } from "node:fs/promises"
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
  relateP2R5,
  validateP2R5RelationSet,
} from "../bench/p2-r5/relation.ts"

const digest = (label: string): string => sha256Canonical({ label })

function summary(value: number | null, options: { insufficient?: boolean } = {}) {
  const insufficient = options.insufficient ?? false
  return {
    metric_id: "precision",
    input_unit: "ratio_0_1",
    output_unit: "ratio_0_1",
    value_kind: "NUMBER" as const,
    reducer: "ARITHMETIC_MEAN" as const,
    missingness_policy: "REQUIRE_COMPLETE" as const,
    minimum_observed_count: 2,
    expected_count: 2,
    observed_count: insufficient ? 1 : 2,
    missing_count: insufficient ? 1 : 0,
    unavailable_count: 0,
    status: insufficient ? ("INSUFFICIENT_EVIDENCE" as const) : ("REDUCED" as const),
    reduced_value: insufficient ? null : value,
    true_count: null,
    denominator_count: null,
  }
}

function metric(
  left: number,
  right: number,
  direction: P2R4Direction = "HIGHER_IS_BETTER",
  options: { leftInsufficient?: boolean; rightInsufficient?: boolean } = {},
): P2R4MetricComparison {
  const leftSummary = summary(left, { insufficient: options.leftInsufficient })
  const rightSummary = summary(right, { insufficient: options.rightInsufficient })
  const comparable = leftSummary.status === "REDUCED" && rightSummary.status === "REDUCED"
  return {
    metric_id: "precision",
    input_unit: "ratio_0_1",
    output_unit: "ratio_0_1",
    value_kind: "NUMBER",
    reducer: "ARITHMETIC_MEAN",
    missingness_policy: "REQUIRE_COMPLETE",
    minimum_observed_count: 2,
    expected_count: 2,
    direction,
    left_summary: leftSummary,
    right_summary: rightSummary,
    status: comparable ? "COMPARABLE" : "INSUFFICIENT_EVIDENCE",
    left_value: comparable ? left : null,
    right_value: comparable ? right : null,
    raw_delta_left_minus_right: comparable ? left - right : null,
  }
}

function comparison(
  left = 0.9,
  right = 0.8,
  direction: P2R4Direction = "HIGHER_IS_BETTER",
  options: { leftInsufficient?: boolean; rightInsufficient?: boolean } = {},
): P2R4Comparison {
  const identityInput = {
    schema_version: P2_R4_COMPARISON_SCHEMA,
    benchmark_id: "kodacbench-r5-test",
    benchmark_protocol_version: "v1",
    left_subject: {
      schema_version: P2_R4_SUBJECT_SCHEMA,
      subject_id: "left",
      system_version_commit_identity: digest("left-system"),
      raw_artifact_log_set_identity: digest("left-artifacts"),
    },
    right_subject: {
      schema_version: P2_R4_SUBJECT_SCHEMA,
      subject_id: "right",
      system_version_commit_identity: digest("right-system"),
      raw_artifact_log_set_identity: digest("right-artifacts"),
    },
    left_r2_report_identity: digest("left-r2"),
    right_r2_report_identity: digest("right-r2"),
    left_summary_identity: digest("left-r3"),
    right_summary_identity: digest("right-r3"),
    shared_evaluation_context_identity: digest("shared-context"),
    comparison_policy_identity: digest("comparison-policy"),
    task_family_comparisons: [
      {
        task_family: "review",
        metrics: [metric(left, right, direction, options)],
      },
    ],
  }
  return {
    ...identityInput,
    comparison_identity: sha256Canonical(identityInput),
  }
}

function recomputeComparison(value: P2R4Comparison): P2R4Comparison {
  const { comparison_identity: _ignored, ...identityInput } = value
  return { ...identityInput, comparison_identity: sha256Canonical(identityInput) }
}

function reverseObjectKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(reverseObjectKeys)
  if (typeof value !== "object" || value === null) return value
  const entries = Object.entries(value as Record<string, unknown>).reverse()
  return Object.fromEntries(entries.map(([key, entry]) => [key, reverseObjectKeys(entry)]))
}

function gitBlobSha(content: Buffer): string {
  const header = Buffer.from(`blob ${content.byteLength}\0`, "utf8")
  return createHash("sha1").update(header).update(content).digest("hex")
}

test("P2-R5 derives higher-is-better left and right relations", () => {
  assert.equal(relateP2R5(comparison(0.9, 0.8)).task_family_relations[0]!.metrics[0]!.relation, "LEFT_FAVORED_BY_DIRECTION")
  assert.equal(relateP2R5(comparison(0.7, 0.8)).task_family_relations[0]!.metrics[0]!.relation, "RIGHT_FAVORED_BY_DIRECTION")
})

test("P2-R5 derives lower-is-better left and right relations", () => {
  assert.equal(relateP2R5(comparison(10, 20, "LOWER_IS_BETTER")).task_family_relations[0]!.metrics[0]!.relation, "LEFT_FAVORED_BY_DIRECTION")
  assert.equal(relateP2R5(comparison(30, 20, "LOWER_IS_BETTER")).task_family_relations[0]!.metrics[0]!.relation, "RIGHT_FAVORED_BY_DIRECTION")
})

test("P2-R5 exact equality is EQUAL_RAW_VALUE without tolerance semantics", () => {
  const output = relateP2R5(comparison(0.5, 0.5))
  const relation = output.task_family_relations[0]!.metrics[0]!
  assert.equal(relation.relation, "EQUAL_RAW_VALUE")
  assert.equal(relation.raw_delta_left_minus_right, 0)
})

test("P2-R5 insufficient evidence never derives a favored side", () => {
  const output = relateP2R5(comparison(0.9, 0.1, "HIGHER_IS_BETTER", { rightInsufficient: true }))
  const relation = output.task_family_relations[0]!.metrics[0]!
  assert.equal(relation.status, "INSUFFICIENT_EVIDENCE")
  assert.equal(relation.relation, "INSUFFICIENT_EVIDENCE")
  assert.equal(relation.left_value, null)
  assert.equal(relation.right_value, null)
  assert.equal(relation.raw_delta_left_minus_right, null)
})

test("P2-R5 preserves raw left-minus-right orientation independently of direction", () => {
  const output = relateP2R5(comparison(10, 20, "LOWER_IS_BETTER"))
  const relation = output.task_family_relations[0]!.metrics[0]!
  assert.equal(relation.relation, "LEFT_FAVORED_BY_DIRECTION")
  assert.equal(relation.raw_delta_left_minus_right, -10)
})

test("R4 raw delta and comparison identity tampering fail closed", () => {
  const rawDeltaTamper = structuredClone(comparison())
  rawDeltaTamper.task_family_comparisons[0]!.metrics[0]!.raw_delta_left_minus_right = 999
  rawDeltaTamper.comparison_identity = sha256Canonical({ ...rawDeltaTamper, comparison_identity: undefined })
  assert.throws(() => relateP2R5(rawDeltaTamper), /raw_delta_left_minus_right/)

  const identityTamper = structuredClone(comparison())
  identityTamper.comparison_identity = digest("forged")
  assert.throws(() => relateP2R5(identityTamper), /comparison_identity/)
})

test("R4 status/value/nullability inconsistency fails closed", () => {
  const value = structuredClone(comparison())
  value.task_family_comparisons[0]!.metrics[0]!.status = "INSUFFICIENT_EVIDENCE"
  value.task_family_comparisons[0]!.metrics[0]!.left_value = null
  value.task_family_comparisons[0]!.metrics[0]!.right_value = null
  value.task_family_comparisons[0]!.metrics[0]!.raw_delta_left_minus_right = null
  const rebound = recomputeComparison(value)
  assert.throws(() => relateP2R5(rebound), /status does not match/)
})

test("malformed direction and summary semantic mismatch fail closed", () => {
  const directionTamper = structuredClone(comparison()) as any
  directionTamper.task_family_comparisons[0].metrics[0].direction = "SIDEWAYS"
  directionTamper.comparison_identity = sha256Canonical({ ...directionTamper, comparison_identity: undefined })
  assert.throws(() => relateP2R5(directionTamper), /direction is unsupported/)

  const summaryTamper = structuredClone(comparison())
  summaryTamper.task_family_comparisons[0]!.metrics[0]!.right_summary.input_unit = "milliseconds"
  const rebound = recomputeComparison(summaryTamper)
  assert.throws(() => relateP2R5(rebound), /summary semantics differ/)
})

test("non-finite comparable values and overflowing subtraction fail closed", () => {
  const nonFinite = structuredClone(comparison()) as any
  nonFinite.task_family_comparisons[0].metrics[0].left_value = Number.POSITIVE_INFINITY
  assert.throws(() => relateP2R5(nonFinite), /non-finite|canonical JSON/)

  const overflow = comparison(Number.MAX_VALUE, -Number.MAX_VALUE)
  assert.throws(() => relateP2R5(overflow), /raw_delta_left_minus_right would be non-finite|canonical JSON/)
})

test("non-canonical task-family and metric ordering fails closed", () => {
  const familyOrder = structuredClone(comparison())
  familyOrder.task_family_comparisons = [
    { task_family: "z-family", metrics: [metric(1, 0)] },
    { task_family: "a-family", metrics: [metric(1, 0)] },
  ]
  assert.throws(() => relateP2R5(recomputeComparison(familyOrder)), /strictly sorted/)

  const metricOrder = structuredClone(comparison())
  const second = structuredClone(metric(1, 0))
  second.metric_id = "accuracy"
  second.left_summary.metric_id = "accuracy"
  second.right_summary.metric_id = "accuracy"
  metricOrder.task_family_comparisons[0]!.metrics = [metric(1, 0), second]
  assert.throws(() => relateP2R5(recomputeComparison(metricOrder)), /strictly sorted/)
})

test("duplicate task-family and metric identities fail closed", () => {
  const families = structuredClone(comparison())
  families.task_family_comparisons.push(structuredClone(families.task_family_comparisons[0]!))
  assert.throws(() => relateP2R5(recomputeComparison(families)), /strictly sorted/)

  const metrics = structuredClone(comparison())
  metrics.task_family_comparisons[0]!.metrics.push(structuredClone(metrics.task_family_comparisons[0]!.metrics[0]!))
  assert.throws(() => relateP2R5(recomputeComparison(metrics)), /strictly sorted/)
})

test("unknown R4 top-level and metric fields fail closed", () => {
  const top = structuredClone(comparison()) as any
  top.winner = "left"
  assert.throws(() => relateP2R5(top), /keys are not canonical/)

  const nested = structuredClone(comparison()) as any
  nested.task_family_comparisons[0].metrics[0].threshold = 0.01
  assert.throws(() => relateP2R5(nested), /keys are not canonical/)
})

test("hostile Proxy and accessor input fails before caller hooks execute", () => {
  let proxyTrap = false
  const proxied = new Proxy(comparison(), {
    ownKeys() {
      proxyTrap = true
      throw new Error("proxy trap executed")
    },
  })
  assert.throws(() => relateP2R5(proxied), /Proxy|canonical JSON/)
  assert.equal(proxyTrap, false)

  let getterCalled = false
  const accessor = structuredClone(comparison()) as any
  Object.defineProperty(accessor, "winner", {
    enumerable: true,
    get() {
      getterCalled = true
      return "left"
    },
  })
  assert.throws(() => relateP2R5(accessor), /enumerable data property|canonical JSON/)
  assert.equal(getterCalled, false)
})

test("symbol, custom prototype, sparse array, cycle, and non-JSON forms fail closed", () => {
  const symbol = structuredClone(comparison()) as any
  symbol[Symbol("hidden")] = true
  assert.throws(() => relateP2R5(symbol), /symbol|canonical JSON/)

  const custom = Object.assign(Object.create({ inherited: true }), comparison())
  assert.throws(() => relateP2R5(custom), /plain object|canonical JSON/)

  const sparse = structuredClone(comparison())
  sparse.task_family_comparisons.length = 2
  assert.throws(() => relateP2R5(sparse), /present enumerable data property|canonical JSON/)

  const cyclic = structuredClone(comparison()) as any
  cyclic.cycle = cyclic
  assert.throws(() => relateP2R5(cyclic), /cycle|canonical JSON/)

  const bigint = structuredClone(comparison()) as any
  bigint.benchmark_id = 1n
  assert.throws(() => relateP2R5(bigint), /non-JSON|canonical JSON/)
})

test("__proto__ remains inert ordinary canonical data and cannot pollute prototypes", () => {
  const value = structuredClone(comparison()) as any
  const nested = value.task_family_comparisons[0].metrics[0].left_summary
  Object.defineProperty(nested, "__proto__", { enumerable: true, value: { polluted: true } })
  assert.throws(() => relateP2R5(value), /keys are not canonical/)
  assert.equal(({} as any).polluted, undefined)
})

test("caller object-key insertion order does not change canonical R5 bytes or identity", () => {
  const canonical = relateP2R5(comparison())
  const reordered = relateP2R5(reverseObjectKeys(comparison()))
  assert.equal(JSON.stringify(canonical), JSON.stringify(reordered))
  assert.equal(canonical.relation_set_identity, reordered.relation_set_identity)
})

test("repeated semantic input is byte-identical and evidence changes alter identity", () => {
  const first = relateP2R5(comparison())
  const second = relateP2R5(comparison())
  assert.equal(JSON.stringify(first), JSON.stringify(second))
  assert.equal(first.relation_set_identity, second.relation_set_identity)
  assert.notEqual(first.relation_set_identity, relateP2R5(comparison(0.91, 0.8)).relation_set_identity)
})

test("returned relation set is deeply frozen and caller mutation cannot alter it", () => {
  const input = comparison()
  const output = relateP2R5(input)
  input.left_subject.subject_id = "mutated"
  assert.equal(output.left_subject.subject_id, "left")
  assert.equal(Object.isFrozen(output), true)
  assert.equal(Object.isFrozen(output.task_family_relations), true)
  assert.equal(Object.isFrozen(output.task_family_relations[0]!.metrics[0]!.left_summary), true)
  assert.throws(() => {
    ;(output as any).benchmark_id = "mutated"
  }, TypeError)
})

test("serialized R5 validator accepts canonical output and rejects relation and identity tampering", () => {
  const output = relateP2R5(comparison())
  assert.deepEqual(validateP2R5RelationSet(output), output)

  const relationTamper = structuredClone(output) as any
  relationTamper.task_family_relations[0].metrics[0].relation = "RIGHT_FAVORED_BY_DIRECTION"
  relationTamper.relation_set_identity = sha256Canonical({ ...relationTamper, relation_set_identity: undefined })
  assert.throws(() => validateP2R5RelationSet(relationTamper), /relation does not match/)

  const identityTamper = structuredClone(output)
  identityTamper.relation_set_identity = digest("forged-r5")
  assert.throws(() => validateP2R5RelationSet(identityTamper), /relation_set_identity/)
})

test("R5 output contains no global decision, ranking, threshold, statistics, promotion, or release fields", () => {
  const output = relateP2R5(comparison()) as any
  assert.equal(output.schema_version, P2_R5_RELATION_SET_SCHEMA)
  const serialized = JSON.stringify(output).toLowerCase()
  for (const forbidden of [
    '"winner"',
    '"loser"',
    '"ranking"',
    '"leaderboard"',
    '"threshold"',
    '"tolerance"',
    '"p_value"',
    '"confidence_interval"',
    '"promotion"',
    '"release_decision"',
  ]) {
    assert.equal(serialized.includes(forbidden), false, forbidden)
  }
})

test("R5 production source has no ambient execution, persistence, network, provider, or telemetry authority", async () => {
  const source = await readFile(new URL("../bench/p2-r5/relation.ts", import.meta.url), "utf8")
  for (const forbidden of [
    "node:child_process",
    "node:fs",
    "node:http",
    "node:https",
    "node:net",
    "fetch(",
    "process.env",
    "provider",
    "telemetry",
  ]) {
    assert.equal(source.includes(forbidden), false, forbidden)
  }
})

test("canonical P2-R1 through P2-R4 predecessor blobs remain unchanged", async () => {
  const expected = new Map([
    ["../bench/p2-r1/contract.ts", "573aaf45f285902c9acda19759d912f16e9ccd8e"],
    ["../bench/p2-r2/runner.ts", "1c7d4f2c7b03911d73a1c8f3d1ee8496bb4dc6a4"],
    ["../bench/p2-r3/summary.ts", "1c0c79381ad89ca9051e0d37243a17f85ea19285"],
    ["../bench/p2-r4/comparison.ts", "78c1417e51f1c36989ec7ec700a3424df3b58944"],
  ])
  for (const [path, expectedBlob] of expected) {
    const content = await readFile(new URL(path, import.meta.url))
    assert.equal(gitBlobSha(content), expectedBlob, path)
  }
})
