import assert from "node:assert/strict"
import test from "node:test"

import { canonicalize, sha256Canonical } from "../bench/p2-r1/contract.ts"
import {
  P2_R2_REPORT_SCHEMA,
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
  compareP2R4,
  type P2R4ComparisonPolicy,
  type P2R4SharedEvaluationContext,
  type P2R4SubjectDescriptor,
} from "../bench/p2-r4/comparison.ts"

function fakeSha(character: string): string {
  return `sha256:${character.repeat(64)}`
}

function report(values: readonly [number, number], observationDigest: string): P2R2Report {
  const taskFamilySections = [
    {
      task_family: "alpha",
      cases: [
        {
          case_id: "alpha-001",
          r1_result_identity: fakeSha("1"),
          metrics: [
            {
              metric_id: "score",
              unit: "points",
              measurement_status: "observed" as const,
              value: values[0],
            },
          ],
        },
        {
          case_id: "alpha-002",
          r1_result_identity: fakeSha("2"),
          metrics: [
            {
              metric_id: "score",
              unit: "points",
              measurement_status: "observed" as const,
              value: values[1],
            },
          ],
        },
      ],
    },
  ]
  const identityInput = {
    schema_version: P2_R2_REPORT_SCHEMA,
    benchmark_id: "p2-r4-key-order-benchmark",
    benchmark_protocol_version: "p2-r4-key-order-protocol/v1",
    r1_manifest_set_digest: fakeSha("a"),
    observation_set_digest: fakeSha(observationDigest),
    case_count: 2,
    observation_count: 2,
    missing_observation_count: 0,
    task_family_sections: taskFamilySections,
  }
  return {
    ...identityInput,
    report_identity: sha256Canonical(identityInput),
  }
}

function summaryPolicy(value: P2R2Report): P2R3PolicyDocument {
  return {
    schema_version: P2_R3_POLICY_SCHEMA,
    benchmark_id: value.benchmark_id,
    benchmark_protocol_version: value.benchmark_protocol_version,
    r2_report_identity: value.report_identity,
    metric_policies: [
      {
        schema_version: P2_R3_METRIC_POLICY_SCHEMA,
        task_family: "alpha",
        metric_id: "score",
        unit: "points",
        value_kind: "NUMBER",
        reducer: "ARITHMETIC_MEAN",
        missingness_policy: "REQUIRE_COMPLETE",
        minimum_observed_count: 2,
      },
    ],
  }
}

function sharedContext(): P2R4SharedEvaluationContext {
  return {
    schema_version: P2_R4_SHARED_EVALUATION_CONTEXT_SCHEMA,
    model_provider_version_identity: fakeSha("3"),
    configuration_identity: fakeSha("4"),
    repository_task_snapshot_identity: fakeSha("5"),
    hardware_execution_environment_identity: fakeSha("6"),
    network_assumptions_identity: fakeSha("7"),
    time_token_cost_budget_identity: fakeSha("8"),
    attempt_policy_identity: fakeSha("9"),
    allowed_tools_identity: fakeSha("b"),
    prompt_instruction_policy_identity: fakeSha("c"),
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

function policy(
  left: P2R3Summary,
  right: P2R3Summary,
  context: P2R4SharedEvaluationContext,
): P2R4ComparisonPolicy {
  const metric = left.task_family_summaries[0]?.metrics[0]
  if (metric === undefined) throw new Error("missing test metric")
  return {
    schema_version: P2_R4_POLICY_SCHEMA,
    benchmark_id: left.benchmark_id,
    benchmark_protocol_version: left.benchmark_protocol_version,
    left_summary_identity: left.summary_identity,
    right_summary_identity: right.summary_identity,
    shared_evaluation_context_identity: sha256Canonical(context),
    metric_directions: [
      {
        schema_version: P2_R4_METRIC_DIRECTION_SCHEMA,
        task_family: "alpha",
        metric_id: metric.metric_id,
        input_unit: metric.input_unit,
        output_unit: metric.output_unit,
        value_kind: metric.value_kind,
        reducer: metric.reducer,
        missingness_policy: metric.missingness_policy,
        minimum_observed_count: metric.minimum_observed_count,
        direction: "HIGHER_IS_BETTER",
      },
    ],
  }
}

function reverseObjectKeyOrder(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((entry) => reverseObjectKeyOrder(entry))
  }
  if (typeof value === "object" && value !== null) {
    const reordered: Record<string, unknown> = {}
    for (const [key, nested] of Object.entries(value).reverse()) {
      reordered[key] = reverseObjectKeyOrder(nested)
    }
    return reordered
  }
  return value
}

test("caller object-key insertion order does not change canonical comparison bytes or identity", () => {
  const leftReport = report([4, 6], "6")
  const rightReport = report([2, 4], "7")
  const leftSummary = summarizeP2R3(leftReport, summaryPolicy(leftReport))
  const rightSummary = summarizeP2R3(rightReport, summaryPolicy(rightReport))
  const context = sharedContext()
  const leftSubject = subject("left")
  const rightSubject = subject("right")
  const comparisonPolicy = policy(leftSummary, rightSummary, context)

  const canonical = compareP2R4(
    leftReport,
    leftSummary,
    rightReport,
    rightSummary,
    context,
    leftSubject,
    rightSubject,
    comparisonPolicy,
  )

  const reordered = compareP2R4(
    reverseObjectKeyOrder(leftReport),
    reverseObjectKeyOrder(leftSummary),
    reverseObjectKeyOrder(rightReport),
    reverseObjectKeyOrder(rightSummary),
    reverseObjectKeyOrder(context),
    reverseObjectKeyOrder(leftSubject),
    reverseObjectKeyOrder(rightSubject),
    reverseObjectKeyOrder(comparisonPolicy),
  )

  assert.equal(reordered.comparison_identity, canonical.comparison_identity)
  assert.equal(canonicalize(reordered), canonicalize(canonical))
})
