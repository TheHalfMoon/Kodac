import type {
  ContextEvidenceLane,
  ContextSelectionAbstention,
  ContextSelectionCandidate,
  ContextSelectionCompleteness,
  ContextSelectionPlanState,
  ContextSelectionRelationBinding,
} from "../context-selection-plan/contracts.ts"

export const P3_R2_DECLARED_POLICY_VERSION = "p3-r2-declared-context-selection-policy-v1" as const
export const P3_R2_DECLARED_POLICY_KIND = "apply_declared_context_selection_policy" as const
export const P3_R2_POLICY_APPLICATION_VERSION = "p3-r2-context-selection-policy-application-v1" as const
export const P3_R2_POLICY_APPLICATION_KIND = "context_selection_policy_application" as const

export const P3_R2_OMISSION_REASONS = Object.freeze([
  "group-cap",
  "item-budget",
  "byte-budget",
] as const)

export const P3_R2_APPLICATION_STATES = Object.freeze([
  "selected-all-candidates",
  "selected-subset",
  "budget-constrained-empty",
  "insufficient-evidence",
] as const)

export type ContextSelectionOmissionReason = typeof P3_R2_OMISSION_REASONS[number]
export type ContextSelectionPolicyApplicationState = typeof P3_R2_APPLICATION_STATES[number]

export interface DeclaredContextSelectionPolicy {
  readonly version: typeof P3_R2_DECLARED_POLICY_VERSION
  readonly kind: typeof P3_R2_DECLARED_POLICY_KIND
  readonly policyId: string
  readonly planIdentity: string
  readonly repositoryIdentity: string
  readonly snapshotIdentity: string
  readonly contentIdentity: string
  readonly taskIdentity: string
  readonly lanePriority: readonly ContextEvidenceLane[]
  readonly maxSelectedItems: number
  readonly maxSelectedUtf8Bytes: number
  readonly maxPerGroupingKey: number
}

export interface OmittedContextSelectionCandidate {
  readonly candidate: ContextSelectionCandidate
  readonly reason: ContextSelectionOmissionReason
}

export interface ContextSelectionPolicyApplication {
  readonly version: typeof P3_R2_POLICY_APPLICATION_VERSION
  readonly kind: typeof P3_R2_POLICY_APPLICATION_KIND
  readonly applicationIdentity: string
  readonly policyIdentity: string
  readonly policyId: string
  readonly planIdentity: string
  readonly requestIdentity: string
  readonly candidateSetIdentity: string
  readonly repositoryIdentity: string
  readonly snapshotIdentity: string
  readonly contentIdentity: string
  readonly taskIdentity: string
  readonly state: ContextSelectionPolicyApplicationState
  readonly lanePriority: readonly ContextEvidenceLane[]
  readonly maxSelectedItems: number
  readonly maxSelectedUtf8Bytes: number
  readonly maxPerGroupingKey: number
  readonly usedSelectedItems: number
  readonly usedSelectedUtf8Bytes: number
  readonly selectedCandidates: readonly ContextSelectionCandidate[]
  readonly omittedCandidates: readonly OmittedContextSelectionCandidate[]
  readonly sourcePlanState: ContextSelectionPlanState
  readonly sourceCompleteness: ContextSelectionCompleteness
  readonly sourceAbstention: ContextSelectionAbstention
  readonly relationEvidence: readonly ContextSelectionRelationBinding[]
}
