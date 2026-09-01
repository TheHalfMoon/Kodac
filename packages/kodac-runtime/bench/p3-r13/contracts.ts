import type {
  P2R3MissingnessPolicy,
  P2R3Reducer,
  P2R3ValueKind,
} from "../p2-r3/summary.ts"
import type { P3R6Dimension } from "../p3-r6/contracts.ts"
import type { TwoCaseReductionEvidence } from "../p3-r12/contracts.ts"

export const P3_R13_DIRECTION_DECLARATION_VERSION =
  "p3-r13-reduction-direction-binding-declaration-v1" as const
export const P3_R13_DIRECTION_DECLARATION_KIND = "bind_reduction_directions" as const
export const P3_R13_DIRECTION_BINDING_EVIDENCE_VERSION =
  "p3-r13-reduction-direction-binding-evidence-v1" as const
export const P3_R13_DIRECTION_BINDING_EVIDENCE_KIND =
  "reduction_direction_binding_evidence" as const

export type P3R13Direction = "HIGHER_IS_BETTER" | "LOWER_IS_BETTER"

export interface P3R13DimensionDirectionBinding {
  readonly dimension: P3R6Dimension
  readonly metricId: string
  readonly inputUnit: string
  readonly outputUnit: string
  readonly valueKind: P2R3ValueKind
  readonly reducer: P2R3Reducer
  readonly missingnessPolicy: P2R3MissingnessPolicy
  readonly minimumObservedCount: number
  readonly direction: P3R13Direction
}

export interface ReductionDirectionBindingDeclaration {
  readonly version: typeof P3_R13_DIRECTION_DECLARATION_VERSION
  readonly kind: typeof P3_R13_DIRECTION_DECLARATION_KIND
  readonly directionBindingId: string
  readonly reductionEvidenceIdentity: string
  readonly strategySubjectIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
  readonly dimensionDirections: readonly P3R13DimensionDirectionBinding[]
}

export interface ReductionDirectionBindingEvidence {
  readonly version: typeof P3_R13_DIRECTION_BINDING_EVIDENCE_VERSION
  readonly kind: typeof P3_R13_DIRECTION_BINDING_EVIDENCE_KIND
  readonly directionBindingEvidenceIdentity: string
  readonly directionDeclaration: ReductionDirectionBindingDeclaration
  readonly directionBindingId: string
  readonly reductionEvidenceIdentity: string
  readonly strategySubjectIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
  readonly reductionEvidence: TwoCaseReductionEvidence
  readonly dimensionDirectionBindings: readonly P3R13DimensionDirectionBinding[]
}
