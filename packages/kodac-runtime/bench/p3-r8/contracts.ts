import {
  P3_R1_CONTEXT_SELECTION_PLAN_VERSION,
  type ContextEvidenceLane,
} from "../../src/context-selection-plan/contracts.ts"
import {
  P3_R2_DECLARED_POLICY_VERSION,
  P3_R2_POLICY_APPLICATION_VERSION,
} from "../../src/context-selection-policy/contracts.ts"

export const P3_R8_STRATEGY_DECLARATION_VERSION =
  "p3-r8-context-strategy-subject-declaration-v1" as const
export const P3_R8_STRATEGY_DECLARATION_KIND =
  "define_context_strategy_subject" as const
export const P3_R8_STRATEGY_SUBJECT_VERSION =
  "p3-r8-context-strategy-subject-v1" as const
export const P3_R8_STRATEGY_SUBJECT_KIND = "context_strategy_subject" as const
export const P3_R8_BINDING_DECLARATION_VERSION =
  "p3-r8-context-strategy-case-binding-declaration-v1" as const
export const P3_R8_BINDING_DECLARATION_KIND =
  "bind_context_strategy_subject_to_declared_policy" as const
export const P3_R8_BINDING_EVIDENCE_VERSION =
  "p3-r8-context-strategy-case-binding-evidence-v1" as const
export const P3_R8_BINDING_EVIDENCE_KIND =
  "context_strategy_case_binding_evidence" as const
export const P3_R8_TASK_FAMILY = "context-selection" as const

export interface ContextStrategyDeclaration {
  readonly version: typeof P3_R8_STRATEGY_DECLARATION_VERSION
  readonly kind: typeof P3_R8_STRATEGY_DECLARATION_KIND
  readonly strategyId: string
  readonly taskFamily: typeof P3_R8_TASK_FAMILY
  readonly planContractVersion: typeof P3_R1_CONTEXT_SELECTION_PLAN_VERSION
  readonly policyContractVersion: typeof P3_R2_DECLARED_POLICY_VERSION
  readonly applicationContractVersion: typeof P3_R2_POLICY_APPLICATION_VERSION
  readonly lanePriority: readonly ContextEvidenceLane[]
  readonly maxSelectedItems: number
  readonly maxSelectedUtf8Bytes: number
  readonly maxPerGroupingKey: number
}

export interface ContextStrategySubject {
  readonly version: typeof P3_R8_STRATEGY_SUBJECT_VERSION
  readonly kind: typeof P3_R8_STRATEGY_SUBJECT_KIND
  readonly strategySubjectIdentity: string
  readonly strategyDeclaration: ContextStrategyDeclaration
}

export interface ContextStrategyCaseBindingDeclaration {
  readonly version: typeof P3_R8_BINDING_DECLARATION_VERSION
  readonly kind: typeof P3_R8_BINDING_DECLARATION_KIND
  readonly bindingId: string
  readonly strategySubjectIdentity: string
}

export interface ContextStrategyCaseBindingEvidence {
  readonly version: typeof P3_R8_BINDING_EVIDENCE_VERSION
  readonly kind: typeof P3_R8_BINDING_EVIDENCE_KIND
  readonly bindingEvidenceIdentity: string
  readonly bindingDeclaration: ContextStrategyCaseBindingDeclaration
  readonly strategySubject: ContextStrategySubject
  readonly strategySubjectIdentity: string
  readonly policyIdentity: string
  readonly applicationIdentity: string
  readonly planIdentity: string
  readonly requestIdentity: string
  readonly candidateSetIdentity: string
  readonly repositoryIdentity: string
  readonly snapshotIdentity: string
  readonly contentIdentity: string
  readonly taskIdentity: string
}
