import {
  K6_R1_INELIGIBILITY_REASONS,
  K6_R1_RISK_CLASSES,
  K6_R1_ROUTE_RESULT_VERSION,
  compareK6R1Utf16,
  createK6R1RouteEligibilityResult,
  validateK6R1RouteRequest,
  type K6R1CandidateEligibilityResult,
  type K6R1IneligibilityReason,
  type K6R1RouteEligibilityResult,
} from "./contracts.ts"

const RISK_RANK = new Map<string, number>(K6_R1_RISK_CLASSES.map((riskClass, index) => [riskClass, index]))
const REASON_RANK = new Map<string, number>(K6_R1_INELIGIBILITY_REASONS.map((reason, index) => [reason, index]))

export function evaluateK6R1ModelProviderRouteEligibility(value: unknown): K6R1RouteEligibilityResult {
  const request = validateK6R1RouteRequest(value)

  const candidateResults: K6R1CandidateEligibilityResult[] = request.candidates.map((candidate) => {
    const reasons: K6R1IneligibilityReason[] = []
    if (candidate.qualification.provider !== candidate.provider || candidate.qualification.model !== candidate.model) {
      reasons.push("QUALIFICATION_IDENTITY_MISMATCH")
    }
    if (candidate.qualification.status !== "PASS") reasons.push("QUALIFICATION_NOT_PASS")

    const declared = new Set(candidate.declaredCapabilities)
    const missingCapabilities = request.requiredCapabilities
      .filter((capability) => !declared.has(capability))
      .slice()
      .sort(compareK6R1Utf16)
    if (missingCapabilities.length > 0) reasons.push("MISSING_REQUIRED_CAPABILITY")

    if ((RISK_RANK.get(request.riskClass) as number) > (RISK_RANK.get(candidate.maximumRiskClass) as number)) {
      reasons.push("RISK_CLASS_UNSUPPORTED")
    }
    if (!candidate.supportedPrivacyClasses.includes(request.privacyClass)) reasons.push("PRIVACY_CLASS_UNSUPPORTED")

    reasons.sort((left, right) => (REASON_RANK.get(left) as number) - (REASON_RANK.get(right) as number))
    return Object.freeze({
      candidateId: candidate.candidateId,
      candidateKind: candidate.candidateKind,
      provider: candidate.provider,
      model: candidate.model,
      status: reasons.length === 0 ? "ELIGIBLE" as const : "INELIGIBLE" as const,
      reasons: Object.freeze(reasons),
      missingCapabilities: Object.freeze(missingCapabilities),
      qualificationReportDigest: candidate.qualification.reportDigest,
    })
  })

  candidateResults.sort((left, right) => compareK6R1Utf16(left.candidateId, right.candidateId))
  return createK6R1RouteEligibilityResult({
    version: K6_R1_ROUTE_RESULT_VERSION,
    requestIdentity: request.requestIdentity,
    repositoryId: request.repositoryId,
    canonicalBase: request.canonicalBase,
    candidateHead: request.candidateHead,
    taskId: request.taskId,
    candidateResults,
  })
}
