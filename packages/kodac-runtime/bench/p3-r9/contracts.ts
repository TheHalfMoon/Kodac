import type { ContextPolicyMeasurementReportEvidence } from "../p3-r7/contracts.ts"
import type {
  ContextStrategyCaseBindingEvidence,
  ContextStrategyDeclaration,
  ContextStrategySubject,
} from "../p3-r8/contracts.ts"

export const P3_R9_COMPOSITION_DECLARATION_VERSION =
  "p3-r9-single-strategy-two-case-report-composition-declaration-v1" as const
export const P3_R9_COMPOSITION_DECLARATION_KIND =
  "compose_single_strategy_two_case_reports" as const
export const P3_R9_COMPOSITION_EVIDENCE_VERSION =
  "p3-r9-single-strategy-two-case-report-composition-evidence-v1" as const
export const P3_R9_COMPOSITION_EVIDENCE_KIND =
  "single_strategy_two_case_report_composition_evidence" as const

export interface SingleStrategyTwoCaseReportMemberDeclaration {
  readonly memberId: string
  readonly caseId: string
  readonly r1ResultIdentity: string
}

export interface SingleStrategyTwoCaseReportCompositionDeclaration {
  readonly version: typeof P3_R9_COMPOSITION_DECLARATION_VERSION
  readonly kind: typeof P3_R9_COMPOSITION_DECLARATION_KIND
  readonly compositionId: string
  readonly strategySubjectIdentity: string
  readonly memberA: SingleStrategyTwoCaseReportMemberDeclaration
  readonly memberB: SingleStrategyTwoCaseReportMemberDeclaration
}

export interface SingleStrategyTwoCaseReportInputs {
  readonly planRequest: unknown
  readonly policy: unknown
  readonly manifest: unknown
  readonly development: unknown
  readonly holdout: unknown
  readonly measurementDeclaration: unknown
  readonly reportDeclaration: unknown
  readonly bindingDeclaration: unknown
}

export interface SingleStrategyTwoCaseReportMemberEvidence {
  readonly memberId: string
  readonly caseId: string
  readonly r1ResultIdentity: string
  readonly reportEvidenceIdentity: string
  readonly measurementEvidenceIdentity: string
  readonly p2R2ReportIdentity: string
  readonly bindingEvidenceIdentity: string
  readonly policyIdentity: string
  readonly applicationIdentity: string
  readonly reportEvidence: ContextPolicyMeasurementReportEvidence
  readonly caseBindingEvidence: ContextStrategyCaseBindingEvidence
}

export interface SingleStrategyTwoCaseReportCompositionEvidence {
  readonly version: typeof P3_R9_COMPOSITION_EVIDENCE_VERSION
  readonly kind: typeof P3_R9_COMPOSITION_EVIDENCE_KIND
  readonly compositionEvidenceIdentity: string
  readonly compositionDeclaration: SingleStrategyTwoCaseReportCompositionDeclaration
  readonly compositionId: string
  readonly strategySubject: ContextStrategySubject
  readonly strategySubjectIdentity: string
  readonly memberA: SingleStrategyTwoCaseReportMemberEvidence
  readonly memberB: SingleStrategyTwoCaseReportMemberEvidence
}

export type { ContextStrategyDeclaration }
