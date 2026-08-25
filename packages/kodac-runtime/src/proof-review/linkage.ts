import {
  validateK5R1ProofPackage,
  type K5R1EvidenceKind,
  type K5R1EvidenceRecord,
} from "./contracts.ts"
import {
  buildK5R2EvidenceLinkage,
  normalizeK5R2SourceLinks,
  type K5R2EvidenceLinkage,
  type K5R2LinkCode,
  type K5R2LinkResult,
  type K5R2SourceKind,
} from "./linkage-contracts.ts"

const SOURCE_KIND_BY_EVIDENCE_KIND = Object.freeze({
  VERIFICATION: "VERIFICATION_REPORT",
  EXECUTION_RECEIPT: "EXECUTION_RECEIPT",
  REPOSITORY_STATE: "REPOSITORY_REVISION",
} as const satisfies Partial<Record<K5R1EvidenceKind, K5R2SourceKind>>)

function expectedSourceKind(kind: K5R1EvidenceKind): K5R2SourceKind | undefined {
  return SOURCE_KIND_BY_EVIDENCE_KIND[kind as keyof typeof SOURCE_KIND_BY_EVIDENCE_KIND]
}

function linkedEvidence(kind: K5R1EvidenceKind): kind is K5R2LinkResult["evidenceKind"] {
  return expectedSourceKind(kind) !== undefined
}

export function linkK5R2Evidence(proofPackageValue: unknown, sourceLinksValue: unknown): K5R2EvidenceLinkage {
  const proofPackage = validateK5R1ProofPackage(proofPackageValue)
  const sourceLinks = normalizeK5R2SourceLinks(sourceLinksValue)
  const evidenceById = new Map<string, K5R1EvidenceRecord>(proofPackage.evidence.map((evidence) => [evidence.evidenceId, evidence]))
  const sourceByEvidenceId = new Map(sourceLinks.map((source) => [source.evidenceId, source]))

  for (const source of sourceLinks) {
    const evidence = evidenceById.get(source.evidenceId)
    if (evidence === undefined) throw new TypeError(`sourceLinks references unknown evidenceId: ${source.evidenceId}`)
    if (!linkedEvidence(evidence.kind)) throw new TypeError(`sourceLinks targets out-of-scope R1 evidence kind: ${evidence.kind}`)
  }

  const links: K5R2LinkResult[] = []
  const outOfScopeEvidenceIds: string[] = []

  for (const evidence of proofPackage.evidence) {
    const expectedKind = expectedSourceKind(evidence.kind)
    if (expectedKind === undefined) {
      outOfScopeEvidenceIds.push(evidence.evidenceId)
      continue
    }

    const source = sourceByEvidenceId.get(evidence.evidenceId)
    if (source === undefined) {
      links.push(Object.freeze({
        evidenceId: evidence.evidenceId,
        evidenceKind: evidence.kind as K5R2LinkResult["evidenceKind"],
        sourceKind: null,
        status: "UNLINKED",
        codes: Object.freeze(["NO_SOURCE"] as const),
        sourceIdentity: null,
      }))
      continue
    }

    const codes: K5R2LinkCode[] = []
    if (source.sourceKind !== expectedKind) codes.push("KIND_MISMATCH")
    if (
      source.canonicalBase !== proofPackage.revision.canonicalBase
      || source.candidateHead !== proofPackage.revision.candidateHead
    ) codes.push("REVISION_MISMATCH")
    if (source.sourceRef !== evidence.ref) codes.push("REF_MISMATCH")
    if (source.sourceDigest !== evidence.digest) codes.push("DIGEST_MISMATCH")

    links.push(Object.freeze({
      evidenceId: evidence.evidenceId,
      evidenceKind: evidence.kind as K5R2LinkResult["evidenceKind"],
      sourceKind: source.sourceKind,
      status: codes.length === 0 ? "LINKED" : "MISMATCH",
      codes: Object.freeze(codes),
      sourceIdentity: source.sourceIdentity,
    }))
  }

  return buildK5R2EvidenceLinkage({
    packageIdentity: proofPackage.packageIdentity,
    revision: proofPackage.revision,
    links,
    outOfScopeEvidenceIds,
    sourceIdentities: sourceLinks.map((source) => source.sourceIdentity),
  })
}
