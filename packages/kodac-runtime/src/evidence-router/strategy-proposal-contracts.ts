export const K6_R5_STRATEGY_VERSION = "kodac-k6-r5-strategy-v1" as const
export const K6_R5_STRATEGY_EVIDENCE_VERSION = "kodac-k6-r5-strategy-evidence-v1" as const
export const K6_R5_QUALIFICATION_RESULT_VERSION = "kodac-k6-r5-qualification-result-v1" as const
export const K6_R5_QUALIFICATION_CORPUS_VERSION = "kodac-k6-r5-qualification-corpus-v1" as const
export const K6_R5_STRATEGY_KIND = "EXPLICIT_ELIGIBLE_CANDIDATE_ORDER" as const

export const K6_R5_PRIVACY_CLASSES = Object.freeze(["PUBLIC", "REPOSITORY_PRIVATE", "SENSITIVE"] as const)
export const K6_R5_QUALIFICATION_OUTCOMES = Object.freeze([
  "BOTH_INVALID",
  "CANDIDATE_INVALID",
  "INCUMBENT_INVALID",
  "CANDIDATE_DOMINATES",
  "INCUMBENT_DOMINATES",
  "TIE",
  "INCOMPARABLE",
] as const)

export const K6_R5_QUALIFICATION_CORPUS_ID = "6fa8c732fcec4f6bdfaae4c199f1b640363916246c2ea7d0a10e168d04b174a1" as const
export const K6_R5_FIXTURE_INCUMBENT_STRATEGY_ID = "bb947465960dafd5774d0bde679cfb96ec9dbba5e8f02cfe750e160227bf89cf" as const
export const K6_R5_FIXTURE_CANDIDATE_STRATEGY_ID = "b65be214400b10d1e3e633ad142f7f4fe6199d2a9b4a97ef465cbcbe61e3cf21" as const

export const K6_R5_LIMITS = Object.freeze({
  maxCanonicalDepth: 32,
  maxCanonicalNodes: 50_000,
  maxOrderedCandidateIdentities: 128,
  maxTrialCaseIdentities: 128,
} as const)

export type K6R5PrivacyClass = typeof K6_R5_PRIVACY_CLASSES[number]
export type K6R5QualificationOutcome = typeof K6_R5_QUALIFICATION_OUTCOMES[number]

export interface K6R5StrategyScope {
  readonly repositoryIdentity: string
  readonly revisionIdentity: string
  readonly ownerScopeId: string
  readonly privacyClass: K6R5PrivacyClass
  readonly taskFamilyIdentity: string
}

export interface K6R5StrategyIdentityInput {
  readonly version: typeof K6_R5_STRATEGY_VERSION
  readonly kind: typeof K6_R5_STRATEGY_KIND
  readonly scope: K6R5StrategyScope
  readonly orderedCandidateIdentities: readonly string[]
}

export interface K6R5Strategy extends K6R5StrategyIdentityInput {
  readonly strategyIdentity: string
}

export interface K6R5StrategyEvidenceIdentityInput {
  readonly version: typeof K6_R5_STRATEGY_EVIDENCE_VERSION
  readonly strategyIdentity: string
  readonly scope: K6R5StrategyScope
  readonly qualificationCorpusIdentity: string
  readonly trialSetIdentity: string
  readonly trialCaseIdentities: readonly string[]
  readonly trialCount: number
  readonly verifiedPassCount: number
  readonly k5ValidCount: number
  readonly doneReadyCount: number
  readonly latencyTotalMs: number
  readonly computeUnitsTotal: number
  readonly privacyViolationCount: number
  readonly securityViolationCount: number
  readonly verificationEvidenceIdentity: string
  readonly k5EvidenceIdentity: string
  readonly doneGateEvidenceIdentity: string
  readonly latencyEvidenceIdentity: string
  readonly computeEvidenceIdentity: string
  readonly privacyEvidenceIdentity: string
  readonly securityEvidenceIdentity: string
}

export interface K6R5StrategyEvidence extends K6R5StrategyEvidenceIdentityInput {
  readonly evidenceIdentity: string
}

export interface K6R5QualificationResultIdentityInput {
  readonly version: typeof K6_R5_QUALIFICATION_RESULT_VERSION
  readonly incumbentStrategyIdentity: string
  readonly candidateStrategyIdentity: string
  readonly incumbentEvidenceIdentity: string
  readonly candidateEvidenceIdentity: string
  readonly qualificationCorpusIdentity: string
  readonly trialSetIdentity: string
  readonly trialCount: number
  readonly outcome: K6R5QualificationOutcome
}

export interface K6R5QualificationResult extends K6R5QualificationResultIdentityInput {
  readonly resultIdentity: string
}
