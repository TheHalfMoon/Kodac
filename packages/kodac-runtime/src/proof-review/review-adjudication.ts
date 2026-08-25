import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

import {
  compareK5R1ScalarStrings,
  validateK5R1ProofPackage,
  type K5R1EvidenceRecord,
  type K5R1Revision,
} from "./contracts.ts"
import {
  K5_R3_LIMITS,
  K5_R3_REVIEW_ADJUDICATION_LINKAGE_VERSION,
  validateK5R3ReviewAdjudicationLinkage,
  validateK5R3ReviewAdjudicationSource,
  type K5R3LinkCode,
  type K5R3ReviewAdjudicationLinkResult,
  type K5R3ReviewAdjudicationLinkage,
  type K5R3ReviewAdjudicationSource,
} from "./review-adjudication-contracts.ts"

type Rec = Record<string, unknown>

function bad(label: string, detail: string): never {
  throw new TypeError(`${label} ${detail}`)
}

function sourceArray(value: unknown): readonly K5R3ReviewAdjudicationSource[] {
  if (typeof value === "object" && value !== null && utilTypes.isProxy(value)) bad("reviewAdjudicationSources", "must not be a Proxy")
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) {
    bad("reviewAdjudicationSources", "must be a plain array")
  }
  if (Object.getOwnPropertySymbols(value).length !== 0) bad("reviewAdjudicationSources", "must not contain symbol fields")
  const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length")
  if (lengthDescriptor === undefined || !("value" in lengthDescriptor)) {
    bad("reviewAdjudicationSources", "must have an ordinary length")
  }
  const lengthValue: unknown = lengthDescriptor.value
  if (
    typeof lengthValue !== "number"
    || !Number.isSafeInteger(lengthValue)
    || lengthValue < 0
    || lengthValue > K5_R3_LIMITS.maxSources
  ) bad("reviewAdjudicationSources", `must contain 0 through ${K5_R3_LIMITS.maxSources} entries`)
  const length = lengthValue
  const parsed: K5R3ReviewAdjudicationSource[] = []
  for (let index = 0; index < length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index))
    if (descriptor === undefined) bad("reviewAdjudicationSources", "must be dense")
    if (!("value" in descriptor) || !descriptor.enumerable) {
      bad(`reviewAdjudicationSources[${index}]`, "must be an enumerable data property")
    }
    parsed.push(validateK5R3ReviewAdjudicationSource(descriptor.value))
  }
  if (Object.getOwnPropertyNames(value).length !== length + 1) {
    bad("reviewAdjudicationSources", "contains unexpected array fields")
  }
  const evidenceIds = parsed.map((source) => source.evidenceId)
  if (new Set(evidenceIds).size !== evidenceIds.length) {
    bad("reviewAdjudicationSources", "contains duplicate evidenceId values")
  }
  return Object.freeze(parsed.slice().sort((left, right) =>
    compareK5R1ScalarStrings(left.evidenceId, right.evidenceId)
  ))
}

function validUnicodeScalars(value: string, label: string): void {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index)
    if (code >= 0xd800 && code <= 0xdbff) {
      if (index + 1 >= value.length) bad(label, "must contain only valid Unicode scalar values")
      const next = value.charCodeAt(index + 1)
      if (next < 0xdc00 || next > 0xdfff) bad(label, "must contain only valid Unicode scalar values")
      index += 1
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      bad(label, "must contain only valid Unicode scalar values")
    }
  }
}

function jcs(value: unknown): string {
  if (value === null) return "null"
  if (typeof value === "boolean") return value ? "true" : "false"
  if (typeof value === "string") {
    validUnicodeScalars(value, "canonical string")
    return JSON.stringify(value)
  }
  if (typeof value === "number") {
    if (!Number.isSafeInteger(value) || Object.is(value, -0)) bad("canonical number", "must be a non-negative-zero safe integer")
    return JSON.stringify(value)
  }
  if (Array.isArray(value)) return `[${value.map(jcs).join(",")}]`
  if (typeof value !== "object" || value === null) bad("canonical value", "must be JSON data")
  const record = value as Rec
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${jcs(record[key])}`).join(",")}}`
}

function identity(value: unknown): string {
  return createHash("sha256").update(jcs(value), "utf8").digest("hex")
}

function frozenRevision(revision: K5R1Revision): K5R1Revision {
  return Object.freeze({
    repositoryId: revision.repositoryId,
    canonicalBase: revision.canonicalBase,
    candidateHead: revision.candidateHead,
  })
}

function linkagePreimage(
  packageIdentity: string,
  revision: K5R1Revision,
  links: readonly K5R3ReviewAdjudicationLinkResult[],
  outOfScopeEvidenceIds: readonly string[],
  sourceIdentities: readonly string[],
) {
  return Object.freeze({
    version: K5_R3_REVIEW_ADJUDICATION_LINKAGE_VERSION,
    packageIdentity,
    revision,
    links,
    outOfScopeEvidenceIds,
    sourceIdentities,
  })
}

export function linkK5R3ReviewAdjudicationEvidence(
  proofPackageValue: unknown,
  sourceDescriptorsValue: unknown,
): K5R3ReviewAdjudicationLinkage {
  const proofPackage = validateK5R1ProofPackage(proofPackageValue)
  const sources = sourceArray(sourceDescriptorsValue)

  const evidenceById = new Map<string, K5R1EvidenceRecord>(
    proofPackage.evidence.map((evidence) => [evidence.evidenceId, evidence]),
  )
  const sourceByEvidenceId = new Map<string, K5R3ReviewAdjudicationSource>(
    sources.map((source) => [source.evidenceId, source]),
  )

  for (const source of sources) {
    const evidence = evidenceById.get(source.evidenceId)
    if (evidence === undefined) {
      throw new TypeError(`reviewAdjudicationSources references unknown evidenceId: ${source.evidenceId}`)
    }
    if (evidence.kind !== "REVIEW_ADJUDICATION") {
      throw new TypeError(`reviewAdjudicationSources targets out-of-scope R1 evidence kind: ${evidence.kind}`)
    }
  }

  const links: K5R3ReviewAdjudicationLinkResult[] = []
  const outOfScopeEvidenceIds: string[] = []

  for (const evidence of proofPackage.evidence) {
    if (evidence.kind !== "REVIEW_ADJUDICATION") {
      outOfScopeEvidenceIds.push(evidence.evidenceId)
      continue
    }

    const source = sourceByEvidenceId.get(evidence.evidenceId)
    if (source === undefined) {
      links.push(Object.freeze({
        evidenceId: evidence.evidenceId,
        evidenceKind: "REVIEW_ADJUDICATION" as const,
        sourceKind: null,
        status: "UNLINKED" as const,
        codes: Object.freeze(["NO_SOURCE"] as const),
        sourceIdentity: null,
      }))
      continue
    }

    const codes: K5R3LinkCode[] = []
    if (
      source.canonicalBase !== proofPackage.revision.canonicalBase
      || source.candidateHead !== proofPackage.revision.candidateHead
    ) codes.push("REVISION_MISMATCH")
    if (source.sourceRef !== evidence.ref) codes.push("REF_MISMATCH")
    if (source.sourceDigest !== evidence.digest) codes.push("DIGEST_MISMATCH")

    links.push(Object.freeze({
      evidenceId: evidence.evidenceId,
      evidenceKind: "REVIEW_ADJUDICATION" as const,
      sourceKind: "KRI_ADJUDICATION" as const,
      status: codes.length === 0 ? "LINKED" as const : "MISMATCH" as const,
      codes: Object.freeze(codes),
      sourceIdentity: source.sourceIdentity,
    }))
  }

  const normalizedLinks = Object.freeze(links.slice().sort((left, right) =>
    compareK5R1ScalarStrings(left.evidenceId, right.evidenceId)
  ))
  const normalizedOutOfScope = Object.freeze(outOfScopeEvidenceIds.slice().sort(compareK5R1ScalarStrings))
  const sourceIdentities = Object.freeze(
    [...new Set(sources.map((source) => source.sourceIdentity))].sort(compareK5R1ScalarStrings),
  )
  const revision = frozenRevision(proofPackage.revision)
  const linkageIdentity = identity(linkagePreimage(
    proofPackage.packageIdentity,
    revision,
    normalizedLinks,
    normalizedOutOfScope,
    sourceIdentities,
  ))

  return validateK5R3ReviewAdjudicationLinkage({
    version: K5_R3_REVIEW_ADJUDICATION_LINKAGE_VERSION,
    packageIdentity: proofPackage.packageIdentity,
    revision,
    links: normalizedLinks,
    outOfScopeEvidenceIds: normalizedOutOfScope,
    sourceIdentities,
    linkageIdentity,
  })
}
