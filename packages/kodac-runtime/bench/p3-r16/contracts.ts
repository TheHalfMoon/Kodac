import type { P3R6Dimension } from "../p3-r6/contracts.ts"
import type {
  P3R15DirectionalRelation,
  StrategyReductionDirectionalRelationEvidence,
} from "../p3-r15/contracts.ts"

export const P3_R16_CRITERION_DECLARATION_VERSION =
  "p3-r16-declared-directional-relation-criterion-declaration-v1" as const
export const P3_R16_CRITERION_DECLARATION_KIND =
  "declare_strategy_directional_relation_criteria" as const
export const P3_R16_CRITERION_MATCH_EVIDENCE_VERSION =
  "p3-r16-declared-directional-relation-criterion-match-evidence-v1" as const
export const P3_R16_CRITERION_MATCH_EVIDENCE_KIND =
  "declared_strategy_directional_relation_criterion_match_evidence" as const

export const P3_R16_ALLOWED_RELATIONS = Object.freeze([
  "EQUAL_RAW_VALUE",
  "LEFT_FAVORED_BY_DIRECTION",
  "RIGHT_FAVORED_BY_DIRECTION",
] as const)

export const P3_R16_CRITERION_STATES = Object.freeze([
  "SATISFIED",
  "NOT_SATISFIED",
  "INSUFFICIENT_EVIDENCE",
] as const)

export const P3_R16_EVIDENCE_STATES = Object.freeze([
  "ALL_DECLARED_RELATION_CRITERIA_SATISFIED",
  "ONE_OR_MORE_DECLARED_RELATION_CRITERIA_NOT_SATISFIED",
  "INSUFFICIENT_DIRECTIONAL_EVIDENCE",
] as const)

export type P3R16AllowedRelation = (typeof P3_R16_ALLOWED_RELATIONS)[number]
export type P3R16CriterionState = (typeof P3_R16_CRITERION_STATES)[number]
export type P3R16CriterionMatchEvidenceState = (typeof P3_R16_EVIDENCE_STATES)[number]

export interface P3R16DimensionCriterion {
  readonly dimension: P3R6Dimension
  readonly metricId: string
  readonly allowedRelations: readonly P3R16AllowedRelation[]
}

export interface P3R16CriterionDeclaration {
  readonly version: typeof P3_R16_CRITERION_DECLARATION_VERSION
  readonly kind: typeof P3_R16_CRITERION_DECLARATION_KIND
  readonly criterionSetId: string
  readonly criterionPolicyIdentity: string
  readonly dimensionCriteria: readonly P3R16DimensionCriterion[]
}

export interface P3R16DimensionCriterionResult {
  readonly dimension: P3R6Dimension
  readonly metricId: string
  readonly observedRelation: P3R15DirectionalRelation
  readonly allowedRelations: readonly P3R16AllowedRelation[]
  readonly criterionState: P3R16CriterionState
}

export interface DeclaredStrategyDirectionalRelationCriterionMatchEvidence {
  readonly version: typeof P3_R16_CRITERION_MATCH_EVIDENCE_VERSION
  readonly kind: typeof P3_R16_CRITERION_MATCH_EVIDENCE_KIND
  readonly criterionMatchEvidenceIdentity: string
  readonly criterionSetId: string
  readonly criterionPolicyIdentity: string
  readonly directionalRelationEvidenceIdentity: string
  readonly comparisonId: string
  readonly leftStrategySubjectIdentity: string
  readonly rightStrategySubjectIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
  readonly criterionDeclaration: P3R16CriterionDeclaration
  readonly directionalRelationEvidence: StrategyReductionDirectionalRelationEvidence
  readonly dimensionCriterionResults: readonly P3R16DimensionCriterionResult[]
  readonly criterionMatchEvidenceState: P3R16CriterionMatchEvidenceState
}
