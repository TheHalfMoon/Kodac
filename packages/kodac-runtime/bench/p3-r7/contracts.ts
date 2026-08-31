import type { P2R2Report } from "../p2-r2/runner.ts"

export const P3_R7_REPORT_DECLARATION_VERSION =
  "p3-r7-context-measurement-report-binding-declaration-v1" as const
export const P3_R7_REPORT_DECLARATION_KIND =
  "build_context_policy_measurement_report_binding" as const
export const P3_R7_REPORT_EVIDENCE_VERSION =
  "p3-r7-context-measurement-report-binding-evidence-v1" as const
export const P3_R7_REPORT_EVIDENCE_KIND =
  "context_policy_measurement_report_binding_evidence" as const
export const P3_R7_TASK_FAMILY = "context-selection" as const

export interface ContextPolicyMeasurementReportDeclaration {
  readonly version: typeof P3_R7_REPORT_DECLARATION_VERSION
  readonly kind: typeof P3_R7_REPORT_DECLARATION_KIND
  readonly reportBindingId: string
  readonly taskFamily: typeof P3_R7_TASK_FAMILY
  readonly caseId: string
  readonly r1ResultIdentity: string
}

export interface ContextPolicyMeasurementReportEvidence {
  readonly version: typeof P3_R7_REPORT_EVIDENCE_VERSION
  readonly kind: typeof P3_R7_REPORT_EVIDENCE_KIND
  readonly reportEvidenceIdentity: string
  readonly reportDeclaration: ContextPolicyMeasurementReportDeclaration
  readonly reportBindingId: string
  readonly policyIdentity: string
  readonly applicationIdentity: string
  readonly measurementEvidenceIdentity: string
  readonly caseId: string
  readonly r1ResultIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
  readonly r1ManifestSetDigest: string
  readonly r6ObservationSetDigest: string
  readonly p2R2ObservationSetDigest: string
  readonly p2R2ReportIdentity: string
  readonly p2R2Report: P2R2Report
}
