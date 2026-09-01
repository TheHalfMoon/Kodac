import type {
  P2R3MetricSummaryStatus,
  P2R3MissingnessPolicy,
  P2R3Reducer,
  P2R3ValueKind,
} from "../p2-r3/summary.ts"
import type { P3R6Dimension } from "../p3-r6/contracts.ts"
import type {
  P3R13Direction,
  ReductionDirectionBindingEvidence,
} from "../p3-r13/contracts.ts"

export const P3_R14_COMPARISON_DECLARATION_VERSION =
  "p3-r14-strategy-reduction-pairwise-comparison-declaration-v1" as const
export const P3_R14_COMPARISON_DECLARATION_KIND =
  "compare_strategy_reduction_records" as const
export const P3_R14_COMPARISON_EVIDENCE_VERSION =
  "p3-r14-strategy-reduction-pairwise-comparison-evidence-v1" as const
export const P3_R14_COMPARISON_EVIDENCE_KIND =
  "strategy_reduction_pairwise_comparison_evidence" as const

export type P3R14PairwiseStatus = "COMPARABLE" | "INSUFFICIENT_EVIDENCE"

export interface P3R14ReconstructionBundle {
  readonly strategyDeclaration: unknown
  readonly compositionDeclaration: unknown
  readonly alignmentDeclaration: unknown
  readonly policyDeclaration: unknown
  readonly reductionDeclaration: unknown
  readonly directionDeclaration: unknown
  readonly caseAInputs: unknown
  readonly caseBInputs: unknown
}

export interface StrategyReductionPairwiseComparisonDeclaration {
  readonly version: typeof P3_R14_COMPARISON_DECLARATION_VERSION
  readonly kind: typeof P3_R14_COMPARISON_DECLARATION_KIND
  readonly comparisonId: string
  readonly leftDirectionBindingEvidenceIdentity: string
  readonly rightDirectionBindingEvidenceIdentity: string
  readonly leftStrategySubjectIdentity: string
  readonly rightStrategySubjectIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
}

export interface P3R14DimensionComparison {
  readonly dimension: P3R6Dimension
  readonly metricId: string
  readonly inputUnit: string
  readonly outputUnit: string
  readonly valueKind: P2R3ValueKind
  readonly reducer: P2R3Reducer
  readonly missingnessPolicy: P2R3MissingnessPolicy
  readonly minimumObservedCount: number
  readonly expectedCount: 2
  readonly direction: P3R13Direction
  readonly leftStatus: P2R3MetricSummaryStatus
  readonly rightStatus: P2R3MetricSummaryStatus
  readonly comparisonStatus: P3R14PairwiseStatus
  readonly leftReducedValue: number | null
  readonly rightReducedValue: number | null
  readonly rawDeltaLeftMinusRight: number | null
}

export interface StrategyReductionPairwiseComparisonEvidence {
  readonly version: typeof P3_R14_COMPARISON_EVIDENCE_VERSION
  readonly kind: typeof P3_R14_COMPARISON_EVIDENCE_KIND
  readonly comparisonEvidenceIdentity: string
  readonly comparisonDeclaration: StrategyReductionPairwiseComparisonDeclaration
  readonly comparisonId: string
  readonly leftDirectionBindingEvidenceIdentity: string
  readonly rightDirectionBindingEvidenceIdentity: string
  readonly leftStrategySubjectIdentity: string
  readonly rightStrategySubjectIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
  readonly leftDirectionBindingEvidence: ReductionDirectionBindingEvidence
  readonly rightDirectionBindingEvidence: ReductionDirectionBindingEvidence
  readonly dimensionComparisons: readonly P3R14DimensionComparison[]
}
