import type { ContextSelectionPolicyApplicationState } from "../../src/context-selection-policy/contracts.ts"
import type { P2R4SubjectDescriptor } from "../p2-r4/comparison.ts"
import type { P2R5MetricRelation } from "../p2-r5/relation.ts"

export const P3_R3_EVIDENCE_DECLARATION_VERSION =
  "p3-r3-context-policy-pairwise-metric-evidence-declaration-v1" as const
export const P3_R3_EVIDENCE_DECLARATION_KIND =
  "build_context_policy_pairwise_metric_evidence" as const
export const P3_R3_METRIC_EVIDENCE_VERSION =
  "p3-r3-context-policy-pairwise-metric-evidence-v1" as const
export const P3_R3_METRIC_EVIDENCE_KIND =
  "context_policy_pairwise_metric_evidence" as const
export const P3_R3_P3_R2_IMPLEMENTATION_MERGE =
  "458f62e85f4af2e13bfd78f5a6c3582d9330c911" as const
export const P3_R3_TASK_FAMILY = "context-selection" as const

export const P3_R3_CONTEXT_EVIDENCE_DIMENSIONS = Object.freeze([
  "recall-at-k",
  "precision-at-k",
  "file-f1",
  "token-budgeted-evidence-yield",
  "no-gold-abstention",
  "explored-vs-utilized-context",
  "context-dilution",
] as const)

export const P3_R3_METRIC_EVIDENCE_STATES = Object.freeze([
  "all-required-metrics-comparable",
  "one-or-more-required-metrics-insufficient",
] as const)

export type P3R3ContextEvidenceDimension =
  (typeof P3_R3_CONTEXT_EVIDENCE_DIMENSIONS)[number]
export type P3R3MetricEvidenceState =
  (typeof P3_R3_METRIC_EVIDENCE_STATES)[number]

export interface P3R3DimensionMetricBinding {
  readonly dimension: P3R3ContextEvidenceDimension
  readonly metricId: string
}

export interface P3R3EvidenceDeclaration {
  readonly version: typeof P3_R3_EVIDENCE_DECLARATION_VERSION
  readonly kind: typeof P3_R3_EVIDENCE_DECLARATION_KIND
  readonly qualificationId: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
  readonly sharedEvaluationContextIdentity: string
  readonly comparisonPolicyIdentity: string
  readonly taskFamily: typeof P3_R3_TASK_FAMILY
  readonly dimensionMetricBindings: readonly P3R3DimensionMetricBinding[]
}

export interface ContextPolicyPairwiseMetricEvidence {
  readonly version: typeof P3_R3_METRIC_EVIDENCE_VERSION
  readonly kind: typeof P3_R3_METRIC_EVIDENCE_KIND
  readonly evidenceIdentity: string
  readonly qualificationId: string
  readonly p3R2ImplementationMerge: typeof P3_R3_P3_R2_IMPLEMENTATION_MERGE
  readonly planIdentity: string
  readonly requestIdentity: string
  readonly candidateSetIdentity: string
  readonly repositoryIdentity: string
  readonly snapshotIdentity: string
  readonly contentIdentity: string
  readonly taskIdentity: string
  readonly leftPolicyId: string
  readonly leftPolicyIdentity: string
  readonly leftApplicationIdentity: string
  readonly leftApplicationState: ContextSelectionPolicyApplicationState
  readonly rightPolicyId: string
  readonly rightPolicyIdentity: string
  readonly rightApplicationIdentity: string
  readonly rightApplicationState: ContextSelectionPolicyApplicationState
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
  readonly r4ComparisonIdentity: string
  readonly r5RelationSetIdentity: string
  readonly sharedEvaluationContextIdentity: string
  readonly comparisonPolicyIdentity: string
  readonly leftSubject: P2R4SubjectDescriptor
  readonly rightSubject: P2R4SubjectDescriptor
  readonly taskFamily: typeof P3_R3_TASK_FAMILY
  readonly dimensionMetricBindings: readonly P3R3DimensionMetricBinding[]
  readonly metricRelations: readonly P2R5MetricRelation[]
  readonly metricEvidenceState: P3R3MetricEvidenceState
}
