import type { P2R5Relation } from "../p2-r5/relation.ts"
import type { P3R3ContextEvidenceDimension } from "../p3-r3/contracts.ts"

export const P3_R5_QUALIFICATION_DECLARATION_VERSION =
  "p3-r5-declared-context-policy-qualification-declaration-v1" as const
export const P3_R5_QUALIFICATION_DECLARATION_KIND =
  "build_declared_context_policy_qualification_evidence" as const
export const P3_R5_QUALIFICATION_EVIDENCE_VERSION =
  "p3-r5-declared-context-policy-qualification-evidence-v1" as const
export const P3_R5_QUALIFICATION_EVIDENCE_KIND =
  "declared_context_policy_qualification_evidence" as const
export const P3_R5_TASK_FAMILY = "context-selection" as const

export const P3_R5_ALLOWED_METRIC_RELATIONS = Object.freeze([
  "EQUAL_RAW_VALUE",
  "LEFT_FAVORED_BY_DIRECTION",
  "RIGHT_FAVORED_BY_DIRECTION",
] as const)

export const P3_R5_METRIC_CRITERION_STATES = Object.freeze([
  "SATISFIED",
  "NOT_SATISFIED",
  "INSUFFICIENT_EVIDENCE",
] as const)

export const P3_R5_PROVENANCE_CRITERION_STATES = Object.freeze([
  "SATISFIED",
  "NOT_SATISFIED",
] as const)

export const P3_R5_QUALIFICATION_EVIDENCE_STATES = Object.freeze([
  "ALL_DECLARED_CRITERIA_SATISFIED",
  "ONE_OR_MORE_DECLARED_CRITERIA_NOT_SATISFIED",
  "INSUFFICIENT_COMPARABLE_EVIDENCE",
] as const)

export const P3_R5_CORPUS_ROLES = Object.freeze(["development", "holdout"] as const)
export const P3_R5_CHRONOLOGY_STATUSES = Object.freeze([
  "chronology-unproven",
  "later-in-time",
  "not-later-in-time",
] as const)
export const P3_R5_CONTAMINATION_STATUSES = Object.freeze([
  "known",
  "none-known",
  "unknown",
] as const)

export type P3R5AllowedMetricRelation = (typeof P3_R5_ALLOWED_METRIC_RELATIONS)[number]
export type P3R5MetricCriterionState = (typeof P3_R5_METRIC_CRITERION_STATES)[number]
export type P3R5ProvenanceCriterionState = (typeof P3_R5_PROVENANCE_CRITERION_STATES)[number]
export type P3R5QualificationEvidenceState = (typeof P3_R5_QUALIFICATION_EVIDENCE_STATES)[number]
export type P3R5CorpusRole = (typeof P3_R5_CORPUS_ROLES)[number]
export type P3R5ChronologyStatus = (typeof P3_R5_CHRONOLOGY_STATUSES)[number]
export type P3R5ContaminationStatus = (typeof P3_R5_CONTAMINATION_STATUSES)[number]

export interface P3R5MetricCriterion {
  readonly dimension: P3R3ContextEvidenceDimension
  readonly metricId: string
  readonly allowedRelations: readonly P3R5AllowedMetricRelation[]
}

export interface P3R5ProvenanceCriteria {
  readonly requiredCorpusRoles: readonly P3R5CorpusRole[]
  readonly allowedChronologyStatuses: readonly P3R5ChronologyStatus[]
  readonly allowedContaminationStatuses: readonly P3R5ContaminationStatus[]
}

export interface P3R5QualificationDeclaration {
  readonly version: typeof P3_R5_QUALIFICATION_DECLARATION_VERSION
  readonly kind: typeof P3_R5_QUALIFICATION_DECLARATION_KIND
  readonly qualificationId: string
  readonly qualificationPolicyIdentity: string
  readonly metricCriteria: readonly P3R5MetricCriterion[]
  readonly provenanceCriteria: P3R5ProvenanceCriteria
}

export interface P3R5MetricCriterionResult {
  readonly dimension: P3R3ContextEvidenceDimension
  readonly metricId: string
  readonly observedRelation: P2R5Relation
  readonly allowedRelations: readonly P3R5AllowedMetricRelation[]
  readonly criterionState: P3R5MetricCriterionState
}

export interface P3R5ProvenanceCriterionResult {
  readonly requiredCorpusRoles: readonly P3R5CorpusRole[]
  readonly observedCorpusRoles: readonly P3R5CorpusRole[]
  readonly allowedChronologyStatuses: readonly P3R5ChronologyStatus[]
  readonly observedChronologyStatuses: readonly P3R5ChronologyStatus[]
  readonly allowedContaminationStatuses: readonly P3R5ContaminationStatus[]
  readonly observedContaminationStatuses: readonly P3R5ContaminationStatus[]
  readonly corpusRoleCriterionState: P3R5ProvenanceCriterionState
  readonly chronologyCriterionState: P3R5ProvenanceCriterionState
  readonly contaminationCriterionState: P3R5ProvenanceCriterionState
}

export interface DeclaredContextPolicyQualificationEvidence {
  readonly version: typeof P3_R5_QUALIFICATION_EVIDENCE_VERSION
  readonly kind: typeof P3_R5_QUALIFICATION_EVIDENCE_KIND
  readonly qualificationEvidenceIdentity: string
  readonly qualificationId: string
  readonly qualificationPolicyIdentity: string
  readonly p3R3EvidenceIdentity: string
  readonly p3R4ProvenanceEvidenceIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
  readonly taskFamily: typeof P3_R5_TASK_FAMILY
  readonly leftPolicyId: string
  readonly leftPolicyIdentity: string
  readonly rightPolicyId: string
  readonly rightPolicyIdentity: string
  readonly metricCriterionResults: readonly P3R5MetricCriterionResult[]
  readonly provenanceCriterionResults: P3R5ProvenanceCriterionResult
  readonly qualificationEvidenceState: P3R5QualificationEvidenceState
}
