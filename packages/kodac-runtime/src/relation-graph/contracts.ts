import type { RepositoryEvidenceClass, RepositorySnapshot } from "../repository/contracts.ts"

export const K3_R6_RELATION_GRAPH_VERSION = "k3-r6-relation-graph-v1" as const
export const K3_R6_RELATION_QUERY_VERSION = "k3-r6-relation-query-v1" as const
export const K3_R6_RELATION_RESULT_VERSION = "k3-r6-relation-result-v1" as const

export const K3_R6_RELATION_KINDS = Object.freeze([
  "contains",
  "imports",
  "exports",
  "defines",
  "references",
  "calls",
  "inherits",
  "implements",
  "instantiates",
] as const)

export const K3_R6_IMPACT_RELATION_KINDS = Object.freeze([
  "imports",
  "references",
  "calls",
  "inherits",
  "implements",
  "instantiates",
] as const)

export const K3_R6_ENTITY_KINDS = Object.freeze(["file", "symbol"] as const)
export const K3_R6_RESOLUTION_STATES = Object.freeze(["resolved", "ambiguous"] as const)
export const K3_R6_QUERY_KINDS = Object.freeze(["impact", "related_files"] as const)
export const K3_R6_COMPLETENESS_REASONS = Object.freeze([
  "ambiguous-edges-excluded",
  "depth-bound",
  "result-budget",
] as const)

export const K3_R6_EVIDENCE_CLASSES = Object.freeze([
  "precise-static",
  "parser-derived",
  "git-derived",
  "heuristic-inference",
  "model-hypothesis",
] as const satisfies readonly RepositoryEvidenceClass[])

export const K3_R6_LIMITS = Object.freeze({
  maxProducers: 64,
  maxNodes: 4_096,
  maxEdges: 16_384,
  maxProvenanceRefs: 64,
  maxProducerIdBytes: 256,
  maxPathBytes: 1_024,
  maxSymbolBytes: 256,
  maxQualifiedNameBytes: 1_024,
  maxProvenanceRefBytes: 1_024,
  maxQueryDepth: 16,
  maxQueryResults: 1_024,
  maxEvidenceChainEdges: 16,
} as const)

export type RelationKind = typeof K3_R6_RELATION_KINDS[number]
export type ImpactRelationKind = typeof K3_R6_IMPACT_RELATION_KINDS[number]
export type RelationEntityKind = typeof K3_R6_ENTITY_KINDS[number]
export type RelationResolutionState = typeof K3_R6_RESOLUTION_STATES[number]
export type RelationQueryKind = typeof K3_R6_QUERY_KINDS[number]
export type RelationCompletenessReason = typeof K3_R6_COMPLETENESS_REASONS[number]

export interface RelationSourceSpanInput {
  readonly path: string
  readonly startLine: number
  readonly startColumn: number
  readonly endLine: number
  readonly endColumn: number
}

export interface RelationSourceSpan extends RelationSourceSpanInput {}

export interface RelationEntityInput {
  readonly kind: RelationEntityKind
  readonly path: string
  readonly symbol?: string
  readonly qualifiedName?: string
  readonly sourceSpan?: RelationSourceSpanInput
}

export interface RelationEntity {
  readonly kind: RelationEntityKind
  readonly path: string
  readonly symbol: string | null
  readonly qualifiedName: string | null
  readonly sourceSpan: RelationSourceSpan | null
}

export interface RelationSnapshotBinding {
  readonly repositoryIdentity: string
  readonly snapshotIdentity: string
  readonly contentIdentity: string
}

export interface RelationProducerClaim extends RelationSnapshotBinding {
  readonly producerId: string
  readonly provenanceRefs: readonly string[]
}

export interface RelationNodeClaim extends RelationSnapshotBinding {
  readonly producerId: string
  readonly evidenceClass: RepositoryEvidenceClass
  readonly sourceEvidenceIdentity: string
  readonly provenanceRefs: readonly string[]
  readonly entity: RelationEntityInput
}

export interface RelationEdgeClaim extends RelationSnapshotBinding {
  readonly producerId: string
  readonly evidenceClass: RepositoryEvidenceClass
  readonly sourceEvidenceIdentity: string
  readonly provenanceRefs: readonly string[]
  readonly relation: RelationKind
  readonly resolution: RelationResolutionState
  readonly source: RelationEntityInput
  readonly target: RelationEntityInput
  readonly relationSite?: RelationSourceSpanInput
}

export interface RelationGraphInput {
  readonly snapshot: RepositorySnapshot
  readonly producers: readonly RelationProducerClaim[]
  readonly nodes: readonly RelationNodeClaim[]
  readonly edges: readonly RelationEdgeClaim[]
}

export interface RelationProducer extends RelationSnapshotBinding {
  readonly producerId: string
  readonly provenanceRefs: readonly string[]
}

export interface RelationNode {
  readonly nodeIdentity: string
  readonly producerId: string
  readonly evidenceClass: RepositoryEvidenceClass
  readonly sourceEvidenceIdentity: string
  readonly provenanceRefs: readonly string[]
  readonly entity: RelationEntity
}

export interface RelationEdge {
  readonly edgeIdentity: string
  readonly producerId: string
  readonly evidenceClass: RepositoryEvidenceClass
  readonly sourceEvidenceIdentity: string
  readonly provenanceRefs: readonly string[]
  readonly relation: RelationKind
  readonly resolution: RelationResolutionState
  readonly sourceNodeIdentity: string
  readonly targetNodeIdentity: string
  readonly relationSite: RelationSourceSpan | null
}

export interface RelationGraph {
  readonly version: typeof K3_R6_RELATION_GRAPH_VERSION
  readonly graphIdentity: string
  readonly producerSetIdentity: string
  readonly repositoryIdentity: string
  readonly snapshotIdentity: string
  readonly contentIdentity: string
  readonly gitHead: string
  readonly freshness: "current"
  readonly producers: readonly RelationProducer[]
  readonly nodes: readonly RelationNode[]
  readonly edges: readonly RelationEdge[]
}

export interface RelationGraphQueryInput extends RelationSnapshotBinding {
  readonly version: typeof K3_R6_RELATION_QUERY_VERSION
  readonly kind: RelationQueryKind
  readonly graphIdentity: string
  readonly seed: RelationEntityInput | RelationEntity
  readonly maxDepth: number
  readonly maxResults: number
}

export interface RelationQueryCompleteness {
  readonly state: "complete" | "incomplete"
  readonly reasons: readonly RelationCompletenessReason[]
  readonly omittedAtLeast: number
  readonly excludedAmbiguousEdgeIdentities: readonly string[]
}

export interface RelationQueryHit {
  readonly nodeIdentity: string
  readonly entity: RelationEntity
  readonly depth: number
  readonly chainIdentity: string
  readonly edgeIdentities: readonly string[]
}

export interface RelationGraphQueryResult {
  readonly version: typeof K3_R6_RELATION_RESULT_VERSION
  readonly resultIdentity: string
  readonly queryIdentity: string
  readonly kind: RelationQueryKind
  readonly graphIdentity: string
  readonly repositoryIdentity: string
  readonly snapshotIdentity: string
  readonly contentIdentity: string
  readonly seedNodeIdentity: string
  readonly relations: readonly RelationKind[]
  readonly maxDepth: number
  readonly maxResults: number
  readonly completeness: RelationQueryCompleteness
  readonly hits: readonly RelationQueryHit[]
}
