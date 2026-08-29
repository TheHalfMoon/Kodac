import type { RepositoryEvidenceClass } from "../repository/contracts.ts"
import type { RelationGraphQueryResult, RelationQueryKind } from "../relation-graph/contracts.ts"

export const P3_R1_CONTEXT_SELECTION_REQUEST_VERSION = "p3-r1-context-selection-request-v1" as const
export const P3_R1_CONTEXT_SELECTION_PLAN_VERSION = "p3-r1-context-selection-plan-v1" as const
export const P3_R1_CONTEXT_SELECTION_REQUEST_KIND = "build_context_selection_plan" as const
export const P3_R1_CONTEXT_SELECTION_PLAN_KIND = "context_selection_plan" as const

export const P3_R1_EVIDENCE_LANES = Object.freeze([
  "explicit-target",
  "structural-symbol",
  "relation-impact",
  "working-tree",
  "architecture-spec",
  "lexical-fallback",
] as const)

export const P3_R1_SOURCE_KINDS = Object.freeze([
  "repository-evidence",
  "context-bundle-item",
  "relation-query-hit",
  "caller-materialized",
] as const)

export const P3_R1_COMPLETENESS_REASONS = Object.freeze([
  "caller-materialization-incomplete",
  "caller-omitted-evidence",
  "relation-evidence-incomplete",
] as const)

export const P3_R1_PLAN_STATES = Object.freeze([
  "ready-for-policy",
  "insufficient-evidence",
  "budget-exceeded",
] as const)

export const P3_R1_LIMITS = Object.freeze({
  maxCandidates: 4_096,
  maxRelationResults: 64,
  maxPlanReasons: 64,
  maxProvenanceRefs: 64,
  maxTaskIdentityBytes: 256,
  maxStableIdBytes: 512,
  maxPathBytes: 1_024,
  maxPlanReasonBytes: 256,
  maxProvenanceRefBytes: 1_024,
  maxCandidateUtf8Bytes: 64 * 1_024,
  maxItems: 256,
  maxUtf8Bytes: 256 * 1_024,
  maxOmittedAtLeast: Number.MAX_SAFE_INTEGER - 10_000,
} as const)

export type ContextEvidenceLane = typeof P3_R1_EVIDENCE_LANES[number]
export type ContextCandidateSourceKind = typeof P3_R1_SOURCE_KINDS[number]
export type ContextSelectionCompletenessReason = typeof P3_R1_COMPLETENESS_REASONS[number]
export type ContextSelectionPlanState = typeof P3_R1_PLAN_STATES[number]

export interface ContextSelectionBinding {
  readonly repositoryIdentity: string
  readonly snapshotIdentity: string
  readonly contentIdentity: string
}

export interface ContextSelectionCompleteness {
  readonly state: "complete" | "incomplete"
  readonly reasons: readonly ContextSelectionCompletenessReason[]
  readonly omittedAtLeast: number
}

export interface ContextSelectionCandidateInput extends ContextSelectionBinding {
  readonly candidateId: string
  readonly lane: ContextEvidenceLane
  readonly sourceKind: ContextCandidateSourceKind
  readonly sourceIdentity: string
  readonly evidenceClass: RepositoryEvidenceClass
  readonly subjectPath: string
  readonly utf8Bytes: number
  readonly groupingKey: string
  readonly planReasons: readonly string[]
  readonly provenanceRefs: readonly string[]
  readonly relationResultIdentity?: string
}

export interface ContextSelectionCandidate extends ContextSelectionBinding {
  readonly candidateIdentity: string
  readonly candidateId: string
  readonly lane: ContextEvidenceLane
  readonly sourceKind: ContextCandidateSourceKind
  readonly sourceIdentity: string
  readonly evidenceClass: RepositoryEvidenceClass
  readonly subjectPath: string
  readonly utf8Bytes: number
  readonly groupingKey: string
  readonly planReasons: readonly string[]
  readonly provenanceRefs: readonly string[]
  readonly relationResultIdentity: string | null
}

export interface ContextSelectionPlanRequest extends ContextSelectionBinding {
  readonly version: typeof P3_R1_CONTEXT_SELECTION_REQUEST_VERSION
  readonly kind: typeof P3_R1_CONTEXT_SELECTION_REQUEST_KIND
  readonly taskIdentity: string
  readonly candidates: readonly ContextSelectionCandidateInput[]
  readonly relationResults?: readonly RelationGraphQueryResult[]
  readonly maxItems: number
  readonly maxUtf8Bytes: number
  readonly completeness: ContextSelectionCompleteness
}

export interface ContextSelectionRelationBinding {
  readonly resultIdentity: string
  readonly queryIdentity: string
  readonly graphIdentity: string
  readonly kind: RelationQueryKind
  readonly repositoryIdentity: string
  readonly snapshotIdentity: string
  readonly contentIdentity: string
  readonly completeness: ContextSelectionCompleteness
}

export interface ContextSelectionBudgetAssessment {
  readonly maxItems: number
  readonly maxUtf8Bytes: number
  readonly candidateCount: number
  readonly candidateUtf8Bytes: number
  readonly withinBudget: boolean
}

export interface ContextSelectionAbstention {
  readonly state: "not-abstained" | "insufficient-evidence"
  readonly reason: "insufficient-evidence" | null
}

export interface ContextSelectionPlan extends ContextSelectionBinding {
  readonly version: typeof P3_R1_CONTEXT_SELECTION_PLAN_VERSION
  readonly kind: typeof P3_R1_CONTEXT_SELECTION_PLAN_KIND
  readonly requestIdentity: string
  readonly candidateSetIdentity: string
  readonly planIdentity: string
  readonly taskIdentity: string
  readonly state: ContextSelectionPlanState
  readonly candidates: readonly ContextSelectionCandidate[]
  readonly relationEvidence: readonly ContextSelectionRelationBinding[]
  readonly budget: ContextSelectionBudgetAssessment
  readonly completeness: ContextSelectionCompleteness
  readonly abstention: ContextSelectionAbstention
}
