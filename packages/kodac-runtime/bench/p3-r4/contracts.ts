import type {
  ChronologyAnchor,
  ContaminationStatus,
  CorpusRole,
  SourceProvenance,
} from "../p2-r1/contract.ts"

export const P3_R4_PROVENANCE_DECLARATION_VERSION =
  "p3-r4-context-policy-benchmark-provenance-declaration-v1" as const
export const P3_R4_PROVENANCE_DECLARATION_KIND =
  "build_context_policy_benchmark_provenance_evidence" as const
export const P3_R4_PROVENANCE_EVIDENCE_VERSION =
  "p3-r4-context-policy-benchmark-provenance-v1" as const
export const P3_R4_PROVENANCE_EVIDENCE_KIND =
  "context_policy_benchmark_provenance_evidence" as const
export const P3_R4_P3_R3_IMPLEMENTATION_MERGE =
  "cd7c28b4f823e9570daf73448c5f3b9b9b540d2e" as const
export const P3_R4_TASK_FAMILY = "context-selection" as const

export interface P3R4ProvenanceDeclaration {
  readonly version: typeof P3_R4_PROVENANCE_DECLARATION_VERSION
  readonly kind: typeof P3_R4_PROVENANCE_DECLARATION_KIND
  readonly qualificationId: string
}

export interface P3R4CaseProvenance {
  readonly caseId: string
  readonly r1ResultIdentity: string
  readonly corpusRole: CorpusRole
  readonly corpusId: string
  readonly corpusDigest: string
  readonly holdoutId: string
  readonly holdoutDigest: string
  readonly chronologyScheme: string
  readonly developmentFreezeAnchor: ChronologyAnchor
  readonly holdoutChronologyAnchor: ChronologyAnchor
  readonly chronologyStatus: "later-in-time" | "not-later-in-time" | "chronology-unproven"
  readonly contaminationStatus: ContaminationStatus
  readonly sourceProvenance: SourceProvenance
}

export interface ContextPolicyBenchmarkProvenanceEvidence {
  readonly version: typeof P3_R4_PROVENANCE_EVIDENCE_VERSION
  readonly kind: typeof P3_R4_PROVENANCE_EVIDENCE_KIND
  readonly provenanceEvidenceIdentity: string
  readonly qualificationId: string
  readonly p3R3ImplementationMerge: typeof P3_R4_P3_R3_IMPLEMENTATION_MERGE
  readonly p3R3EvidenceIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
  readonly leftR2ReportIdentity: string
  readonly rightR2ReportIdentity: string
  readonly r1ManifestSetDigest: string
  readonly taskFamily: typeof P3_R4_TASK_FAMILY
  readonly caseProvenance: readonly P3R4CaseProvenance[]
}
