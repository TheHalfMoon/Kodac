import type {
  ContextPolicyBenchmarkProvenanceEvidence,
} from "../p3-r4/contracts.ts"
import type {
  P3R5ChronologyStatus,
  P3R5ContaminationStatus,
  P3R5CorpusRole,
  P3R5ProvenanceCriterionState,
} from "../p3-r5/contracts.ts"
import type {
  DeclaredStrategyDirectionalRelationCriterionMatchEvidence,
} from "../p3-r16/contracts.ts"

export const P3_R17_QUALIFICATION_DECLARATION_VERSION =
  "p3-r17-late-chain-benchmark-provenance-substrate-qualification-declaration-v1" as const
export const P3_R17_QUALIFICATION_DECLARATION_KIND =
  "qualify_late_chain_criteria_with_benchmark_provenance_substrate" as const
export const P3_R17_SUBSTRATE_QUALIFICATION_EVIDENCE_VERSION =
  "p3-r17-late-chain-benchmark-provenance-substrate-qualification-evidence-v1" as const
export const P3_R17_SUBSTRATE_QUALIFICATION_EVIDENCE_KIND =
  "late_chain_benchmark_provenance_substrate_qualification_evidence" as const
export const P3_R17_TASK_FAMILY = "context-selection" as const

export const P3_R17_SUBSTRATE_QUALIFICATION_EVIDENCE_STATES = Object.freeze([
  "ALL_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_SATISFIED",
  "ONE_OR_MORE_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_NOT_SATISFIED",
  "INSUFFICIENT_DIRECTIONAL_EVIDENCE",
] as const)

export type P3R17SubstrateQualificationEvidenceState =
  (typeof P3_R17_SUBSTRATE_QUALIFICATION_EVIDENCE_STATES)[number]

export interface P3R17ProvenanceCriteria {
  readonly requiredCorpusRoles: readonly P3R5CorpusRole[]
  readonly allowedChronologyStatuses: readonly P3R5ChronologyStatus[]
  readonly allowedContaminationStatuses: readonly P3R5ContaminationStatus[]
}

export interface P3R17QualificationDeclaration {
  readonly version: typeof P3_R17_QUALIFICATION_DECLARATION_VERSION
  readonly kind: typeof P3_R17_QUALIFICATION_DECLARATION_KIND
  readonly qualificationId: string
  readonly qualificationPolicyIdentity: string
  readonly criterionMatchEvidenceIdentity: string
  readonly provenanceEvidenceIdentity: string
  readonly provenanceCriteria: P3R17ProvenanceCriteria
}

export interface P3R17ProvenanceCriterionResult {
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

export interface P3R17CaseTuple {
  readonly caseId: string
  readonly r1ResultIdentity: string
}

export interface P3R17SubstrateBinding {
  readonly p3R3EvidenceIdentity: string
  readonly leftPolicyIdentity: string
  readonly rightPolicyIdentity: string
  readonly memberA: P3R17CaseTuple
  readonly memberB: P3R17CaseTuple
  readonly matchingProvenanceCaseTuples: readonly P3R17CaseTuple[]
}

export interface LateChainBenchmarkProvenanceSubstrateQualificationEvidence {
  readonly version: typeof P3_R17_SUBSTRATE_QUALIFICATION_EVIDENCE_VERSION
  readonly kind: typeof P3_R17_SUBSTRATE_QUALIFICATION_EVIDENCE_KIND
  readonly substrateQualificationEvidenceIdentity: string
  readonly qualificationId: string
  readonly qualificationPolicyIdentity: string
  readonly criterionMatchEvidenceIdentity: string
  readonly provenanceEvidenceIdentity: string
  readonly comparisonId: string
  readonly criterionSetId: string
  readonly criterionPolicyIdentity: string
  readonly leftStrategySubjectIdentity: string
  readonly rightStrategySubjectIdentity: string
  readonly benchmarkId: string
  readonly benchmarkProtocolVersion: string
  readonly qualificationDeclaration: P3R17QualificationDeclaration
  readonly criterionMatchEvidence: DeclaredStrategyDirectionalRelationCriterionMatchEvidence
  readonly benchmarkProvenanceEvidence: ContextPolicyBenchmarkProvenanceEvidence
  readonly substrateBinding: P3R17SubstrateBinding
  readonly provenanceCriterionResult: P3R17ProvenanceCriterionResult
  readonly substrateQualificationEvidenceState: P3R17SubstrateQualificationEvidenceState
}
