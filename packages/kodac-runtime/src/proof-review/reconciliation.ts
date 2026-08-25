import {
  compareK5R1ScalarStrings,
  validateK5R1ProofPackage,
  type K5R1EvidenceRecord,
  type K5R1EvidenceStatus,
  type K5R1Revision,
} from "./contracts.ts"
import {
  validateK5R2EvidenceLinkage,
  type K5R2LinkCode,
  type K5R2LinkResult,
} from "./linkage-contracts.ts"
import {
  validateK5R3ReviewAdjudicationLinkage,
  type K5R3LinkCode,
  type K5R3ReviewAdjudicationLinkResult,
} from "./review-adjudication-contracts.ts"
import {
  K5_R4_CAUSES,
  K5_R4_PROOF_STATE_RECONCILIATION_VERSION,
  k5R4ReconciliationIdentity,
  k5R4StateFromCauses,
  validateK5R4ProofStateReconciliation,
  type K5R4Cause,
  type K5R4EvidenceResult,
  type K5R4EvidenceState,
  type K5R4ProofStateReconciliation,
  type K5R4ProofStateReconciliationInput,
  type K5R4ReconciliationStatus,
} from "./reconciliation-contracts.ts"

const R2_KINDS = new Set<string>(["VERIFICATION", "EXECUTION_RECEIPT", "REPOSITORY_STATE"])
const R4_KINDS = new Set<string>(["VERIFICATION", "EXECUTION_RECEIPT", "REPOSITORY_STATE", "REVIEW_ADJUDICATION"])
const CAUSE_RANK = new Map<K5R4Cause, number>(K5_R4_CAUSES.map((cause, index) => [cause, index]))
const STATE_RANK = new Map<K5R4EvidenceState, number>([
  ["VALID", 0],
  ["INCOMPLETE", 1],
  ["CONTRADICTORY", 2],
  ["STALE", 3],
  ["INVALID", 4],
])

function sameRevision(left: K5R1Revision, right: K5R1Revision): boolean {
  return left.repositoryId === right.repositoryId
    && left.canonicalBase === right.canonicalBase
    && left.candidateHead === right.candidateHead
}

function exactStrings(actual: readonly string[], expected: readonly string[], label: string): void {
  if (actual.length !== expected.length || actual.some((value, index) => value !== expected[index])) {
    throw new TypeError(`${label} does not equal the canonical package membership`)
  }
}

function r1Cause(status: K5R1EvidenceStatus): K5R4Cause | null {
  if (status === "INVALID") return "R1_EXPLICIT_INVALID"
  if (status === "STALE") return "R1_EXPLICIT_STALE"
  if (status === "CONTRADICTORY") return "R1_EXPLICIT_CONTRADICTORY"
  if (status === "FAILED") return "R1_EXPLICIT_FAILED"
  return null
}

function r2Cause(code: K5R2LinkCode): K5R4Cause {
  if (code === "NO_SOURCE") return "R2_NO_SOURCE"
  if (code === "KIND_MISMATCH") return "R2_KIND_MISMATCH"
  if (code === "REVISION_MISMATCH") return "R2_REVISION_MISMATCH"
  if (code === "REF_MISMATCH") return "R2_REF_MISMATCH"
  return "R2_DIGEST_MISMATCH"
}

function r3Cause(code: K5R3LinkCode): K5R4Cause {
  if (code === "NO_SOURCE") return "R3_NO_SOURCE"
  if (code === "REVISION_MISMATCH") return "R3_REVISION_MISMATCH"
  if (code === "REF_MISMATCH") return "R3_REF_MISMATCH"
  return "R3_DIGEST_MISMATCH"
}

function canonicalCauses(values: readonly K5R4Cause[]): readonly K5R4Cause[] {
  return Object.freeze([...new Set(values)].sort((left, right) =>
    (CAUSE_RANK.get(left) as number) - (CAUSE_RANK.get(right) as number)
  ))
}

function resultForR2(evidence: K5R1EvidenceRecord, link: K5R2LinkResult): K5R4EvidenceResult {
  if (link.evidenceKind !== evidence.kind) {
    throw new TypeError(`K5-R2 linkage evidenceKind mismatch for evidenceId: ${evidence.evidenceId}`)
  }
  const values: K5R4Cause[] = []
  const evidenceCause = r1Cause(evidence.status)
  if (evidenceCause !== null) values.push(evidenceCause)
  for (const code of link.codes) values.push(r2Cause(code))
  const causes = canonicalCauses(values)
  return Object.freeze({
    evidenceId: evidence.evidenceId,
    evidenceKind: evidence.kind as K5R4EvidenceResult["evidenceKind"],
    r1Status: evidence.status,
    linkageLayer: "K5_R2" as const,
    linkStatus: link.status,
    sourceIdentity: link.sourceIdentity,
    state: k5R4StateFromCauses(causes),
    causes,
  })
}

function resultForR3(evidence: K5R1EvidenceRecord, link: K5R3ReviewAdjudicationLinkResult): K5R4EvidenceResult {
  if (link.evidenceKind !== evidence.kind) {
    throw new TypeError(`K5-R3 linkage evidenceKind mismatch for evidenceId: ${evidence.evidenceId}`)
  }
  const values: K5R4Cause[] = []
  const evidenceCause = r1Cause(evidence.status)
  if (evidenceCause !== null) values.push(evidenceCause)
  for (const code of link.codes) values.push(r3Cause(code))
  const causes = canonicalCauses(values)
  return Object.freeze({
    evidenceId: evidence.evidenceId,
    evidenceKind: "REVIEW_ADJUDICATION" as const,
    r1Status: evidence.status,
    linkageLayer: "K5_R3" as const,
    linkStatus: link.status,
    sourceIdentity: link.sourceIdentity,
    state: k5R4StateFromCauses(causes),
    causes,
  })
}

function aggregateStatus(results: readonly K5R4EvidenceResult[]): K5R4ReconciliationStatus {
  if (results.length === 0) return "NOT_APPLICABLE"
  let state: K5R4EvidenceState = "VALID"
  for (const result of results) {
    if ((STATE_RANK.get(result.state) as number) > (STATE_RANK.get(state) as number)) state = result.state
  }
  return state
}

export function reconcileK5R4ProofState(
  proofPackageValue: unknown,
  r2LinkageValue: unknown,
  r3LinkageValue: unknown,
): K5R4ProofStateReconciliation {
  const proofPackage = validateK5R1ProofPackage(proofPackageValue)
  const r2 = validateK5R2EvidenceLinkage(r2LinkageValue)
  const r3 = validateK5R3ReviewAdjudicationLinkage(r3LinkageValue)

  if (r2.packageIdentity !== proofPackage.packageIdentity) {
    throw new TypeError("K5-R2 linkage packageIdentity does not equal the K5-R1 package identity")
  }
  if (r3.packageIdentity !== proofPackage.packageIdentity) {
    throw new TypeError("K5-R3 linkage packageIdentity does not equal the K5-R1 package identity")
  }
  if (!sameRevision(r2.revision, proofPackage.revision)) {
    throw new TypeError("K5-R2 linkage revision does not equal the K5-R1 package revision")
  }
  if (!sameRevision(r3.revision, proofPackage.revision)) {
    throw new TypeError("K5-R3 linkage revision does not equal the K5-R1 package revision")
  }

  const allEvidenceIds = proofPackage.evidence.map((evidence) => evidence.evidenceId).sort(compareK5R1ScalarStrings)
  const expectedR2LinkIds = proofPackage.evidence
    .filter((evidence) => R2_KINDS.has(evidence.kind))
    .map((evidence) => evidence.evidenceId)
    .sort(compareK5R1ScalarStrings)
  const expectedR2OutOfScope = proofPackage.evidence
    .filter((evidence) => !R2_KINDS.has(evidence.kind))
    .map((evidence) => evidence.evidenceId)
    .sort(compareK5R1ScalarStrings)
  const expectedR3LinkIds = proofPackage.evidence
    .filter((evidence) => evidence.kind === "REVIEW_ADJUDICATION")
    .map((evidence) => evidence.evidenceId)
    .sort(compareK5R1ScalarStrings)
  const expectedR3OutOfScope = proofPackage.evidence
    .filter((evidence) => evidence.kind !== "REVIEW_ADJUDICATION")
    .map((evidence) => evidence.evidenceId)
    .sort(compareK5R1ScalarStrings)

  exactStrings(r2.links.map((link) => link.evidenceId), expectedR2LinkIds, "K5-R2 linkage links")
  exactStrings(r2.outOfScopeEvidenceIds, expectedR2OutOfScope, "K5-R2 linkage outOfScopeEvidenceIds")
  exactStrings(r3.links.map((link) => link.evidenceId), expectedR3LinkIds, "K5-R3 linkage links")
  exactStrings(r3.outOfScopeEvidenceIds, expectedR3OutOfScope, "K5-R3 linkage outOfScopeEvidenceIds")

  const r2ById = new Map(r2.links.map((link) => [link.evidenceId, link]))
  const r3ById = new Map(r3.links.map((link) => [link.evidenceId, link]))
  const results: K5R4EvidenceResult[] = []
  const outOfScopeEvidenceIds: string[] = []

  for (const evidence of proofPackage.evidence) {
    if (!R4_KINDS.has(evidence.kind)) {
      outOfScopeEvidenceIds.push(evidence.evidenceId)
      continue
    }
    if (R2_KINDS.has(evidence.kind)) {
      const link = r2ById.get(evidence.evidenceId)
      if (link === undefined) throw new TypeError(`K5-R2 linkage is missing evidenceId: ${evidence.evidenceId}`)
      results.push(resultForR2(evidence, link))
      continue
    }
    const link = r3ById.get(evidence.evidenceId)
    if (link === undefined) throw new TypeError(`K5-R3 linkage is missing evidenceId: ${evidence.evidenceId}`)
    results.push(resultForR3(evidence, link))
  }

  const normalizedResults = Object.freeze(results.slice().sort((left, right) =>
    compareK5R1ScalarStrings(left.evidenceId, right.evidenceId)
  ))
  const normalizedOutOfScope = Object.freeze(outOfScopeEvidenceIds.slice().sort(compareK5R1ScalarStrings))
  if (normalizedResults.length + normalizedOutOfScope.length !== allEvidenceIds.length) {
    throw new TypeError("K5-R4 reconciliation membership does not cover the K5-R1 package")
  }

  const preimage = Object.freeze({
    version: K5_R4_PROOF_STATE_RECONCILIATION_VERSION,
    packageIdentity: proofPackage.packageIdentity,
    r2LinkageIdentity: r2.linkageIdentity,
    r3LinkageIdentity: r3.linkageIdentity,
    revision: Object.freeze({
      repositoryId: proofPackage.revision.repositoryId,
      canonicalBase: proofPackage.revision.canonicalBase,
      candidateHead: proofPackage.revision.candidateHead,
    }),
    status: aggregateStatus(normalizedResults),
    results: normalizedResults,
    outOfScopeEvidenceIds: normalizedOutOfScope,
  }) satisfies K5R4ProofStateReconciliationInput

  return validateK5R4ProofStateReconciliation({
    ...preimage,
    reconciliationIdentity: k5R4ReconciliationIdentity(preimage),
  })
}
