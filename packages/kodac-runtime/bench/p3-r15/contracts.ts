import type {
  P3R14DimensionComparison,
  StrategyReductionPairwiseComparisonEvidence,
} from "../p3-r14/contracts.ts"

export const P3_R15_DIRECTIONAL_RELATION_EVIDENCE_VERSION =
  "p3-r15-strategy-reduction-directional-relation-evidence-v1" as const
export const P3_R15_DIRECTIONAL_RELATION_EVIDENCE_KIND =
  "strategy_reduction_directional_relation_evidence" as const

export type P3R15DirectionalRelation =
  | "LEFT_FAVORED_BY_DIRECTION"
  | "RIGHT_FAVORED_BY_DIRECTION"
  | "EQUAL_RAW_VALUE"
  | "INSUFFICIENT_EVIDENCE"

export interface P3R15DimensionRelation extends P3R14DimensionComparison {
  readonly relation: P3R15DirectionalRelation
}

export interface StrategyReductionDirectionalRelationEvidence {
  readonly version: typeof P3_R15_DIRECTIONAL_RELATION_EVIDENCE_VERSION
  readonly kind: typeof P3_R15_DIRECTIONAL_RELATION_EVIDENCE_KIND
  readonly directionalRelationEvidenceIdentity: string
  readonly pairwiseComparisonEvidenceIdentity: string
  readonly comparisonId: string
  readonly leftStrategySubjectIdentity: string
  readonly rightStrategySubjectIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
  readonly pairwiseComparisonEvidence: StrategyReductionPairwiseComparisonEvidence
  readonly dimensionRelations: readonly P3R15DimensionRelation[]
}
