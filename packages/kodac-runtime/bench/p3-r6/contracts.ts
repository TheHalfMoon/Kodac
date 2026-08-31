import type { P2R2Observation } from "../p2-r2/runner.ts"

export const P3_R6_MEASUREMENT_DECLARATION_VERSION =
  "p3-r6-context-measurement-observation-declaration-v1" as const
export const P3_R6_MEASUREMENT_DECLARATION_KIND =
  "build_context_policy_measurement_observations" as const
export const P3_R6_MEASUREMENT_EVIDENCE_VERSION =
  "p3-r6-context-measurement-observation-evidence-v1" as const
export const P3_R6_MEASUREMENT_EVIDENCE_KIND =
  "context_policy_measurement_observation_evidence" as const
export const P3_R6_TASK_FAMILY = "context-selection" as const

export const P3_R6_DIMENSIONS = Object.freeze([
  "recall-at-k",
  "precision-at-k",
  "file-f1",
  "token-budgeted-evidence-yield",
  "no-gold-abstention",
  "explored-vs-utilized-context",
  "context-dilution",
] as const)

export type P3R6Dimension = (typeof P3_R6_DIMENSIONS)[number]

export interface P3R6DimensionMetricBinding {
  readonly dimension: P3R6Dimension
  readonly metricId: string
  readonly unit: string
}

export interface ContextPolicyMeasurementDeclaration {
  readonly version: typeof P3_R6_MEASUREMENT_DECLARATION_VERSION
  readonly kind: typeof P3_R6_MEASUREMENT_DECLARATION_KIND
  readonly measurementId: string
  readonly caseId: string
  readonly r1ResultIdentity: string
  readonly taskFamily: typeof P3_R6_TASK_FAMILY
  readonly dimensionMetricBindings: readonly P3R6DimensionMetricBinding[]
  readonly goldCandidateIdentities: readonly string[]
  readonly utilizedCandidateIdentities: readonly string[]
}

export interface ContextPolicyMeasurementEvidence {
  readonly version: typeof P3_R6_MEASUREMENT_EVIDENCE_VERSION
  readonly kind: typeof P3_R6_MEASUREMENT_EVIDENCE_KIND
  readonly measurementEvidenceIdentity: string
  readonly measurementDeclaration: ContextPolicyMeasurementDeclaration
  readonly measurementId: string
  readonly applicationIdentity: string
  readonly policyIdentity: string
  readonly planIdentity: string
  readonly requestIdentity: string
  readonly candidateSetIdentity: string
  readonly repositoryIdentity: string
  readonly snapshotIdentity: string
  readonly contentIdentity: string
  readonly taskIdentity: string
  readonly caseId: string
  readonly r1ResultIdentity: string
  readonly r1ManifestSetDigest: string
  readonly observationSetDigest: string
  readonly observations: readonly P2R2Observation[]
}
