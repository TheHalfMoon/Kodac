import type { P2R2Observation } from "../p2-r2/runner.ts"
import type {
  P2R3MetricSummaryStatus,
  P2R3MissingnessPolicy,
  P2R3Reducer,
  P2R3ValueKind,
} from "../p2-r3/summary.ts"
import type { P3R6Dimension } from "../p3-r6/contracts.ts"
import type { P3R11MemberReference } from "../p3-r11/contracts.ts"

export const P3_R12_REDUCTION_DECLARATION_VERSION =
  "p3-r12-two-case-reduction-declaration-v1" as const
export const P3_R12_REDUCTION_DECLARATION_KIND = "reduce_two_case_policy_binding" as const
export const P3_R12_REDUCTION_EVIDENCE_VERSION = "p3-r12-two-case-reduction-evidence-v1" as const
export const P3_R12_REDUCTION_EVIDENCE_KIND = "two_case_reduction_evidence" as const

export interface TwoCaseReductionDeclaration {
  readonly version: typeof P3_R12_REDUCTION_DECLARATION_VERSION
  readonly kind: typeof P3_R12_REDUCTION_DECLARATION_KIND
  readonly reductionId: string
  readonly policyBindingEvidenceIdentity: string
  readonly strategySubjectIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
}

export interface P3R12DimensionReduction {
  readonly dimension: P3R6Dimension
  readonly metricId: string
  readonly inputUnit: string
  readonly outputUnit: string
  readonly valueKind: P2R3ValueKind
  readonly reducer: P2R3Reducer
  readonly missingnessPolicy: P2R3MissingnessPolicy
  readonly minimumObservedCount: number
  readonly expectedCount: 2
  readonly observedCount: number
  readonly unavailableCount: number
  readonly status: P2R3MetricSummaryStatus
  readonly reducedValue: number | null
  readonly trueCount: number | null
  readonly denominatorCount: number | null
  readonly memberAObservation: P2R2Observation
  readonly memberBObservation: P2R2Observation
}

export interface TwoCaseReductionEvidence {
  readonly version: typeof P3_R12_REDUCTION_EVIDENCE_VERSION
  readonly kind: typeof P3_R12_REDUCTION_EVIDENCE_KIND
  readonly reductionEvidenceIdentity: string
  readonly reductionDeclaration: TwoCaseReductionDeclaration
  readonly reductionId: string
  readonly policyBindingEvidenceIdentity: string
  readonly strategySubjectIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
  readonly memberAReference: P3R11MemberReference
  readonly memberBReference: P3R11MemberReference
  readonly dimensionReductions: readonly P3R12DimensionReduction[]
}
