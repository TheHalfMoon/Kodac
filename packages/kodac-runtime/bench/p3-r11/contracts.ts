import type { P2R2Observation } from "../p2-r2/runner.ts"
import type {
  P2R3MissingnessPolicy,
  P2R3Reducer,
  P2R3ValueKind,
} from "../p2-r3/summary.ts"
import type { P3R6Dimension } from "../p3-r6/contracts.ts"

export const P3_R11_POLICY_DECLARATION_VERSION =
  "p3-r11-two-case-reduction-policy-binding-declaration-v1" as const
export const P3_R11_POLICY_DECLARATION_KIND =
  "bind_two_case_reduction_policy" as const
export const P3_R11_POLICY_BINDING_EVIDENCE_VERSION =
  "p3-r11-two-case-reduction-policy-binding-evidence-v1" as const
export const P3_R11_POLICY_BINDING_EVIDENCE_KIND =
  "two_case_reduction_policy_binding_evidence" as const

export interface P3R11DimensionPolicy {
  readonly dimension: P3R6Dimension
  readonly metricId: string
  readonly unit: string
  readonly valueKind: P2R3ValueKind
  readonly reducer: P2R3Reducer
  readonly missingnessPolicy: P2R3MissingnessPolicy
  readonly minimumObservedCount: number
}

export interface TwoCaseReductionPolicyDeclaration {
  readonly version: typeof P3_R11_POLICY_DECLARATION_VERSION
  readonly kind: typeof P3_R11_POLICY_DECLARATION_KIND
  readonly policyBindingId: string
  readonly alignmentEvidenceIdentity: string
  readonly strategySubjectIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
  readonly dimensionPolicies: readonly P3R11DimensionPolicy[]
}

export interface P3R11MemberReference {
  readonly memberId: string
  readonly caseId: string
  readonly r1ResultIdentity: string
  readonly reportEvidenceIdentity: string
  readonly measurementEvidenceIdentity: string
  readonly p2R2ReportIdentity: string
  readonly policyIdentity: string
  readonly applicationIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
}

export interface P3R11DimensionPolicyBinding extends P3R11DimensionPolicy {
  readonly memberAObservation: P2R2Observation
  readonly memberBObservation: P2R2Observation
}

export interface TwoCaseReductionPolicyBindingEvidence {
  readonly version: typeof P3_R11_POLICY_BINDING_EVIDENCE_VERSION
  readonly kind: typeof P3_R11_POLICY_BINDING_EVIDENCE_KIND
  readonly policyBindingEvidenceIdentity: string
  readonly policyDeclaration: TwoCaseReductionPolicyDeclaration
  readonly policyBindingId: string
  readonly alignmentEvidenceIdentity: string
  readonly strategySubjectIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
  readonly memberAReference: P3R11MemberReference
  readonly memberBReference: P3R11MemberReference
  readonly dimensionPolicyBindings: readonly P3R11DimensionPolicyBinding[]
}
