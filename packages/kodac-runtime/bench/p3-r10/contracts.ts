import type { P2R2Observation } from "../p2-r2/runner.ts"
import type { P3R6Dimension } from "../p3-r6/contracts.ts"

export const P3_R10_ALIGNMENT_DECLARATION_VERSION =
  "p3-r10-single-strategy-two-case-metric-alignment-declaration-v1" as const
export const P3_R10_ALIGNMENT_DECLARATION_KIND =
  "build_single_strategy_two_case_metric_alignment" as const
export const P3_R10_ALIGNMENT_EVIDENCE_VERSION =
  "p3-r10-single-strategy-two-case-metric-alignment-evidence-v1" as const
export const P3_R10_ALIGNMENT_EVIDENCE_KIND =
  "single_strategy_two_case_metric_alignment_evidence" as const

export interface SingleStrategyTwoCaseMetricAlignmentDeclaration {
  readonly version: typeof P3_R10_ALIGNMENT_DECLARATION_VERSION
  readonly kind: typeof P3_R10_ALIGNMENT_DECLARATION_KIND
  readonly alignmentId: string
  readonly compositionEvidenceIdentity: string
  readonly strategySubjectIdentity: string
}

export interface P3R10MemberReference {
  readonly memberId: string
  readonly caseId: string
  readonly r1ResultIdentity: string
  readonly reportEvidenceIdentity: string
  readonly measurementEvidenceIdentity: string
  readonly bindingEvidenceIdentity: string
  readonly policyIdentity: string
  readonly applicationIdentity: string
}

export interface P3R10DimensionAlignment {
  readonly dimension: P3R6Dimension
  readonly metricId: string
  readonly unit: string
  readonly memberAObservation: P2R2Observation
  readonly memberBObservation: P2R2Observation
}

export interface SingleStrategyTwoCaseMetricAlignmentEvidence {
  readonly version: typeof P3_R10_ALIGNMENT_EVIDENCE_VERSION
  readonly kind: typeof P3_R10_ALIGNMENT_EVIDENCE_KIND
  readonly alignmentEvidenceIdentity: string
  readonly alignmentDeclaration: SingleStrategyTwoCaseMetricAlignmentDeclaration
  readonly alignmentId: string
  readonly compositionEvidenceIdentity: string
  readonly strategySubjectIdentity: string
  readonly memberAReference: P3R10MemberReference
  readonly memberBReference: P3R10MemberReference
  readonly dimensionAlignments: readonly P3R10DimensionAlignment[]
}
