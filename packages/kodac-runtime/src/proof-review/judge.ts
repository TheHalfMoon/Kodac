import {
  K5_R1_PROOF_JUDGMENT_VERSION,
  K5_R1_REASON_CODES,
  compareK5R1ScalarStrings,
  k5R1EvidenceFingerprint,
  k5R1JudgmentIdentity,
  validateK5R1ProofJudgment,
  validateK5R1ProofPackage,
  type K5R1EvidenceRecord,
  type K5R1PackageStatus,
  type K5R1ProofJudgment,
  type K5R1ProofPackage,
  type K5R1Reason,
  type K5R1ReasonCode,
  type K5R1RequirementResult,
  type K5R1RequirementStatus,
} from "./contracts.ts"

const REASON_RANK = new Map<K5R1ReasonCode, number>(
  K5_R1_REASON_CODES.map((code, index) => [code, index]),
)

function sortedUnique(values: readonly string[]): readonly string[] {
  return Object.freeze([...new Set(values)].sort(compareK5R1ScalarStrings))
}

function claimingEvidence(
  proofPackage: K5R1ProofPackage,
  requirementId: string,
): readonly K5R1EvidenceRecord[] {
  return proofPackage.evidence.filter((evidence) => evidence.requirementIds.includes(requirementId))
}

function currentForPackage(proofPackage: K5R1ProofPackage, evidence: K5R1EvidenceRecord): boolean {
  return (
    evidence.canonicalBase === proofPackage.revision.canonicalBase &&
    evidence.candidateHead === proofPackage.revision.candidateHead
  )
}

interface RequirementAnalysis {
  result: K5R1RequirementResult
  reason: K5R1Reason | null
}

function analyzeRequirement(
  proofPackage: K5R1ProofPackage,
  requirement: K5R1ProofPackage["requirements"][number],
): RequirementAnalysis {
  const claiming = claimingEvidence(proofPackage, requirement.requirementId)
  const kindMismatch = claiming.filter((evidence) => evidence.kind !== requirement.kind)
  const explicitInvalid = claiming.filter((evidence) => evidence.status === "INVALID")

  const currentKindMatching = claiming.filter(
    (evidence) => evidence.kind === requirement.kind && currentForPackage(proofPackage, evidence),
  )
  const satisfied = currentKindMatching.filter((evidence) => evidence.status === "SATISFIED")
  const failed = currentKindMatching.filter((evidence) => evidence.status === "FAILED")
  const explicitContradictory = currentKindMatching.filter((evidence) => evidence.status === "CONTRADICTORY")
  const explicitStale = claiming.filter((evidence) => evidence.status === "STALE")
  const revisionMismatch = claiming.filter((evidence) => !currentForPackage(proofPackage, evidence))

  const satisfiedFingerprints = new Set(satisfied.map(k5R1EvidenceFingerprint))
  const satisfiedFingerprintCount = satisfiedFingerprints.size

  let status: K5R1RequirementStatus
  const codes: K5R1ReasonCode[] = []
  const supportingEvidenceIds: string[] = []

  if (explicitInvalid.length !== 0 || kindMismatch.length !== 0) {
    status = "INVALID"
    if (explicitInvalid.length !== 0) {
      codes.push("EXPLICIT_INVALID")
      supportingEvidenceIds.push(...explicitInvalid.map((evidence) => evidence.evidenceId))
    }
    if (kindMismatch.length !== 0) {
      codes.push("KIND_MISMATCH")
      supportingEvidenceIds.push(...kindMismatch.map((evidence) => evidence.evidenceId))
    }
  } else if (revisionMismatch.length !== 0 || explicitStale.length !== 0) {
    status = "STALE"
    if (revisionMismatch.length !== 0) {
      codes.push("REVISION_MISMATCH")
      supportingEvidenceIds.push(...revisionMismatch.map((evidence) => evidence.evidenceId))
    }
    if (explicitStale.length !== 0) {
      codes.push("EXPLICIT_STALE")
      supportingEvidenceIds.push(...explicitStale.map((evidence) => evidence.evidenceId))
    }
  } else {
    const byFingerprint = new Map<string, K5R1EvidenceRecord[]>()
    for (const evidence of currentKindMatching) {
      const fingerprint = k5R1EvidenceFingerprint(evidence)
      const group = byFingerprint.get(fingerprint)
      if (group === undefined) byFingerprint.set(fingerprint, [evidence])
      else group.push(evidence)
    }

    const fingerprintConflicts = [...byFingerprint.values()].filter(
      (group) => new Set(group.map((evidence) => evidence.status)).size > 1,
    )
    const hasSatisfiedFailedConflict = satisfied.length !== 0 && failed.length !== 0

    if (
      explicitContradictory.length !== 0 ||
      hasSatisfiedFailedConflict ||
      fingerprintConflicts.length !== 0
    ) {
      status = "CONTRADICTORY"
      if (explicitContradictory.length !== 0) {
        codes.push("EXPLICIT_CONTRADICTORY")
        supportingEvidenceIds.push(...explicitContradictory.map((evidence) => evidence.evidenceId))
      }
      if (hasSatisfiedFailedConflict) {
        codes.push("SATISFIED_FAILED_CONFLICT")
        supportingEvidenceIds.push(...satisfied.map((evidence) => evidence.evidenceId))
        supportingEvidenceIds.push(...failed.map((evidence) => evidence.evidenceId))
      }
      if (fingerprintConflicts.length !== 0) {
        codes.push("FINGERPRINT_STATUS_CONFLICT")
        for (const group of fingerprintConflicts) {
          supportingEvidenceIds.push(...group.map((evidence) => evidence.evidenceId))
        }
      }
    } else if (failed.length !== 0 || satisfiedFingerprintCount < requirement.minimumEvidence) {
      status = "INSUFFICIENT"
      if (failed.length !== 0) {
        codes.push("EXPLICIT_FAILED")
        supportingEvidenceIds.push(...failed.map((evidence) => evidence.evidenceId))
      }
      if (satisfiedFingerprintCount < requirement.minimumEvidence) {
        codes.push("BELOW_MINIMUM")
        supportingEvidenceIds.push(...satisfied.map((evidence) => evidence.evidenceId))
      }
    } else {
      status = "SATISFIED"
    }
  }

  const result = Object.freeze({
    requirementId: requirement.requirementId,
    kind: requirement.kind,
    minimumEvidence: requirement.minimumEvidence,
    satisfiedFingerprintCount,
    status,
  })

  if (status === "SATISFIED") return { result, reason: null }

  const reason = Object.freeze({
    requirementId: requirement.requirementId,
    status,
    codes: Object.freeze(codes.slice().sort(
      (left, right) => (REASON_RANK.get(left) as number) - (REASON_RANK.get(right) as number),
    )),
    evidenceIds: sortedUnique(supportingEvidenceIds),
  }) as K5R1Reason

  return { result, reason }
}

function packageStatus(results: readonly K5R1RequirementResult[]): K5R1PackageStatus {
  if (results.some((result) => result.status === "INVALID")) return "INVALID_PACKAGE"
  if (results.some((result) => result.status === "STALE")) return "STALE_PACKAGE"
  if (results.some((result) => result.status === "CONTRADICTORY")) return "CONTRADICTORY_PACKAGE"
  if (results.some((result) => result.status === "INSUFFICIENT")) return "INSUFFICIENT_PACKAGE"
  return "SUFFICIENT_PACKAGE"
}

export function judgeK5R1ProofPackage(value: unknown): K5R1ProofJudgment {
  const proofPackage = validateK5R1ProofPackage(value)
  const analyses = proofPackage.requirements.map((requirement) => analyzeRequirement(proofPackage, requirement))
  const requirementResults = Object.freeze(analyses.map((analysis) => analysis.result))
  const reasons = Object.freeze(
    analyses.flatMap((analysis) => analysis.reason === null ? [] : [analysis.reason]),
  )
  const evidenceIds = Object.freeze(proofPackage.evidence.map((evidence) => evidence.evidenceId))
  const base = Object.freeze({
    version: K5_R1_PROOF_JUDGMENT_VERSION,
    packageIdentity: proofPackage.packageIdentity,
    status: packageStatus(requirementResults),
    reasons,
    requirementResults,
    evidenceIds,
  })
  const judgment = Object.freeze({
    ...base,
    judgmentIdentity: k5R1JudgmentIdentity(base),
  })
  return validateK5R1ProofJudgment(judgment)
}
