import {
  K6_R2_ORDERING_BASIS,
  K6_R2_ROUTE_PLAN_VERSION,
  createK6R2RoutePlan,
  validateK6R2RoutePlanRequest,
  type K6R2RoutePlan,
  type K6R2RoutePlanStep,
} from "./route-plan-contracts.ts"

export function materializeK6R2DeterministicRoutePlan(value: unknown): K6R2RoutePlan {
  const request = validateK6R2RoutePlanRequest(value)
  const result = request.eligibilityResult
  const byId = new Map(result.candidateResults.map((candidate) => [candidate.candidateId, candidate] as const))

  const steps = request.orderedEligibleCandidateIds.map((candidateId, index) => {
    const candidate = byId.get(candidateId)
    if (candidate === undefined || candidate.status !== "ELIGIBLE") {
      throw new TypeError(`route plan request.orderedEligibleCandidateIds[${index}] must reference an ELIGIBLE candidate`)
    }
    return Object.freeze({
      candidateId: candidate.candidateId,
      candidateKind: candidate.candidateKind,
      provider: candidate.provider,
      model: candidate.model,
      role: index === 0 ? "PRIMARY" as const : "FALLBACK" as const,
      qualificationReportDigest: candidate.qualificationReportDigest,
    }) satisfies K6R2RoutePlanStep
  })

  return createK6R2RoutePlan({
    version: K6_R2_ROUTE_PLAN_VERSION,
    planRequestIdentity: request.planRequestIdentity,
    orderingBasis: K6_R2_ORDERING_BASIS,
    eligibilityResultIdentity: result.resultIdentity,
    requestIdentity: result.requestIdentity,
    repositoryId: result.repositoryId,
    canonicalBase: result.canonicalBase,
    candidateHead: result.candidateHead,
    taskId: result.taskId,
    status: steps.length === 0 ? "NO_ELIGIBLE_CANDIDATE" : "ROUTABLE",
    steps,
  }, request)
}
