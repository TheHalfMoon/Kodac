import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import test from "node:test"

import {
  createK5R1ProofPackage,
  type K5R1ProofPackageInput,
} from "../src/proof-review/contracts.ts"
import {
  K5_R3_REVIEW_ADJUDICATION_LINKAGE_VERSION,
  K5_R3_REVIEW_ADJUDICATION_SOURCE_VERSION,
  createK5R3ReviewAdjudicationSource,
  validateK5R3ReviewAdjudicationLinkage,
  validateK5R3ReviewAdjudicationSource,
  type K5R3KriAdjudicationRecord,
  type K5R3KriFindingRecord,
  type K5R3ReviewAdjudicationSource,
} from "../src/proof-review/review-adjudication-contracts.ts"
import { linkK5R3ReviewAdjudicationEvidence } from "../src/proof-review/review-adjudication.ts"

const base = "0".repeat(40)
const head = "1".repeat(40)
const staleHead = "9".repeat(40)
const artifactDigest = "d".repeat(64)
type Rec = Record<string, unknown>

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function canonicalizeLegacy(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalizeLegacy)
  if (typeof value === "object" && value !== null) {
    const record = value as Rec
    const ordered: Rec = {}
    for (const key of Object.keys(record).sort(compareStrings)) ordered[key] = canonicalizeLegacy(record[key])
    return ordered
  }
  return value
}

function legacyIdentity(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(canonicalizeLegacy(value)), "utf8").digest("hex")
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function makeFinding(options: {
  canonicalBase?: string
  reviewedHead?: string
  evaluatedHead?: string
  claimKey?: string
  evidenceRefs?: string[]
} = {}): K5R3KriFindingRecord {
  const review = {
    reviewRunId: "review-run-1",
    reviewerId: "coderabbit",
    reviewerVersion: "2026-08-25",
    policyIdentity: "policy-kri-r2",
    canonicalBase: options.canonicalBase ?? base,
    reviewedHead: options.reviewedHead ?? head,
  }
  const historical = {
    version: "kri-r2-finding-v1" as const,
    claimKey: options.claimKey ?? "claim.review.adjudication",
    review,
    path: "packages/kodac-runtime/src/proof-review/review-adjudication.ts",
    range: { startLine: 1, endLine: 8 },
    summary: "Material review finding requiring adjudication.",
    contractClaim: "The reviewed change must preserve the bounded K5-R3 linkage contract.",
    category: "correctness",
    severity: "high" as const,
    confidenceBps: 9750,
    evidenceRefs: [...(options.evidenceRefs ?? ["review:terminal", "review:request"])].sort(compareStrings),
  }
  return {
    ...historical,
    findingIdentity: legacyIdentity(historical),
    evaluatedHead: options.evaluatedHead ?? head,
    freshness: "CURRENT",
    state: "NEW",
  }
}

function makeAdjudication(
  finding: K5R3KriFindingRecord,
  action: K5R3KriAdjudicationRecord["action"] = "CONFIRM",
): K5R3KriAdjudicationRecord {
  const common = {
    version: "kri-r2-adjudication-v1" as const,
    findingIdentity: finding.findingIdentity,
    adjudicatorId: "founder-adjudicator",
    evidenceRefs: ["adjudication:reason", "review:terminal"].sort(compareStrings),
  }
  let transition: Omit<K5R3KriAdjudicationRecord, "version" | "adjudicationIdentity" | "findingIdentity" | "adjudicatorId" | "evidenceRefs">
  switch (action) {
    case "CONFIRM":
      transition = { previousAdjudicationIdentity: null, action, previousState: "NEW", resultingState: "CONFIRMED" }
      break
    case "REJECT":
      transition = { previousAdjudicationIdentity: null, action, previousState: "NEW", resultingState: "REJECTED" }
      break
    case "MARK_DUPLICATE":
      transition = { previousAdjudicationIdentity: null, action, previousState: "NEW", resultingState: "DUPLICATE", duplicateOf: "2".repeat(64) }
      break
    case "MARK_FIXED":
      transition = { previousAdjudicationIdentity: "3".repeat(64), action, previousState: "CONFIRMED", resultingState: "FIXED", correctionRef: "commit:fix-1" }
      break
    case "REVERIFY":
      transition = { previousAdjudicationIdentity: "4".repeat(64), action, previousState: "FIXED", resultingState: "REVERIFIED", reverificationRef: "review:reverify-1" }
      break
  }
  const preimage = { ...common, ...transition }
  return { ...preimage, adjudicationIdentity: legacyIdentity(preimage) }
}

function source(options: {
  evidenceId?: string
  canonicalBase?: string
  candidateHead?: string
  sourceRef?: string
  action?: K5R3KriAdjudicationRecord["action"]
} = {}): K5R3ReviewAdjudicationSource {
  const canonicalBase = options.canonicalBase ?? base
  const candidateHead = options.candidateHead ?? head
  const finding = makeFinding({ canonicalBase, reviewedHead: candidateHead, evaluatedHead: candidateHead, claimKey: `claim.${options.evidenceId ?? "e-review"}` })
  const adjudication = makeAdjudication(finding, options.action ?? "CONFIRM")
  return createK5R3ReviewAdjudicationSource({
    evidenceId: options.evidenceId ?? "e-review",
    sourceKind: "KRI_ADJUDICATION",
    canonicalBase,
    candidateHead,
    sourceRef: options.sourceRef ?? "review:adjudication:1",
    sourceDigest: adjudication.adjudicationIdentity,
    finding,
    adjudication,
  })
}

function packageInput(
  sourceDigest: string,
  options: { sourceRef?: string; evidenceCandidateHead?: string; status?: "SATISFIED" | "FAILED" | "STALE" | "CONTRADICTORY" | "INVALID" } = {},
): K5R1ProofPackageInput {
  return {
    subject: { subjectId: "k5-r3", subjectKind: "CHANGESET" },
    revision: { repositoryId: "TheHalfMoon/Kodac", canonicalBase: base, candidateHead: head },
    requirements: [
      { requirementId: "artifact", kind: "ARTIFACT", minimumEvidence: 1 },
      { requirementId: "review", kind: "REVIEW_ADJUDICATION", minimumEvidence: 1 },
    ],
    evidence: [
      { evidenceId: "e-artifact", kind: "ARTIFACT", requirementIds: ["artifact"], canonicalBase: base, candidateHead: head, ref: "artifact:other", digest: artifactDigest, status: "SATISFIED" },
      { evidenceId: "e-review", kind: "REVIEW_ADJUDICATION", requirementIds: ["review"], canonicalBase: base, candidateHead: options.evidenceCandidateHead ?? head, ref: options.sourceRef ?? "review:adjudication:1", digest: sourceDigest, status: options.status ?? "SATISFIED" },
    ],
  }
}

test("links only REVIEW_ADJUDICATION against the validated package revision without transferring R1 status authority", () => {
  const descriptor = source()
  for (const status of ["SATISFIED", "FAILED", "STALE", "CONTRADICTORY", "INVALID"] as const) {
    const proofPackage = createK5R1ProofPackage(packageInput(descriptor.sourceDigest, { evidenceCandidateHead: staleHead, status }))
    const linkage = linkK5R3ReviewAdjudicationEvidence(proofPackage, [descriptor])
    assert.equal(linkage.version, K5_R3_REVIEW_ADJUDICATION_LINKAGE_VERSION)
    assert.equal(linkage.links[0]?.status, "LINKED")
    assert.deepEqual(linkage.links[0]?.codes, [])
    assert.equal(proofPackage.evidence.find((item) => item.evidenceId === "e-review")?.status, status)
    assert.deepEqual(linkage.outOfScopeEvidenceIds, ["e-artifact"])
    assert.equal(JSON.stringify(linkage).includes("PROVEN_READY"), false)
  }
})

test("source validation reproduces historical KRI identities but K5 source identity remains separately bound", () => {
  const finding = makeFinding()
  const adjudication = makeAdjudication(finding)
  const created = createK5R3ReviewAdjudicationSource({ evidenceId: "e-review", sourceKind: "KRI_ADJUDICATION", canonicalBase: base, candidateHead: head, sourceRef: "opaque:not/a/url/or/command", sourceDigest: adjudication.adjudicationIdentity, finding, adjudication })
  assert.equal(created.version, K5_R3_REVIEW_ADJUDICATION_SOURCE_VERSION)
  assert.equal(created.finding.findingIdentity, finding.findingIdentity)
  const adjudicationPreimage = clone(adjudication) as unknown as Rec
  delete adjudicationPreimage.adjudicationIdentity
  assert.equal(created.adjudication.adjudicationIdentity, legacyIdentity(adjudicationPreimage))
  assert.equal(created.sourceDigest, created.adjudication.adjudicationIdentity)
  assert.notEqual(created.sourceIdentity, created.sourceDigest)
  assert.throws(() => createK5R3ReviewAdjudicationSource({ evidenceId: "e-review", sourceKind: "KRI_ADJUDICATION", canonicalBase: "2".repeat(40), candidateHead: head, sourceRef: "opaque", sourceDigest: adjudication.adjudicationIdentity, finding, adjudication }), /canonicalBase/)
  assert.throws(() => createK5R3ReviewAdjudicationSource({ evidenceId: "e-review", sourceKind: "KRI_ADJUDICATION", canonicalBase: base, candidateHead: "2".repeat(40), sourceRef: "opaque", sourceDigest: adjudication.adjudicationIdentity, finding, adjudication }), /candidateHead/)
  assert.throws(() => createK5R3ReviewAdjudicationSource({ evidenceId: "e-review", sourceKind: "KRI_ADJUDICATION", canonicalBase: base, candidateHead: head, sourceRef: "opaque", sourceDigest: "f".repeat(64), finding, adjudication }), /sourceDigest/)
})

test("all canonical KRI-R2 adjudication transitions are independently accepted", () => {
  for (const action of ["CONFIRM", "REJECT", "MARK_DUPLICATE", "MARK_FIXED", "REVERIFY"] as const) {
    const descriptor = source({ action })
    assert.equal(validateK5R3ReviewAdjudicationSource(descriptor).adjudication.action, action)
  }
})

test("missing source is exactly UNLINKED plus NO_SOURCE and null source fields", () => {
  const descriptor = source()
  const linkage = linkK5R3ReviewAdjudicationEvidence(createK5R1ProofPackage(packageInput(descriptor.sourceDigest)), [])
  assert.deepEqual(linkage.links, [{ evidenceId: "e-review", evidenceKind: "REVIEW_ADJUDICATION", sourceKind: null, status: "UNLINKED", codes: ["NO_SOURCE"], sourceIdentity: null }])
})

test("revision/ref/digest mismatches are cumulative exactly once in fixed rank order and no KIND_MISMATCH exists", () => {
  const descriptor = source({ canonicalBase: "2".repeat(40), candidateHead: "3".repeat(40), sourceRef: "wrong:ref" })
  const proofPackage = createK5R1ProofPackage(packageInput("f".repeat(64)))
  const result = linkK5R3ReviewAdjudicationEvidence(proofPackage, [descriptor]).links[0]
  assert.equal(result?.status, "MISMATCH")
  assert.deepEqual(result?.codes, ["REVISION_MISMATCH", "REF_MISMATCH", "DIGEST_MISMATCH"])
  assert.equal((result?.codes as readonly string[]).includes("KIND_MISMATCH"), false)
})

test("orphan sources, out-of-scope targets, duplicate ids, wrong source kinds, and identity tampering fail structurally", () => {
  const descriptor = source()
  const proofPackage = createK5R1ProofPackage(packageInput(descriptor.sourceDigest))
  assert.throws(() => linkK5R3ReviewAdjudicationEvidence(proofPackage, [source({ evidenceId: "missing" })]), TypeError)
  const outOfScope = source({ evidenceId: "e-artifact" })
  assert.throws(() => linkK5R3ReviewAdjudicationEvidence(proofPackage, [outOfScope]), TypeError)
  assert.throws(() => linkK5R3ReviewAdjudicationEvidence(proofPackage, [descriptor, descriptor]), TypeError)
  assert.throws(() => validateK5R3ReviewAdjudicationSource({ ...descriptor, sourceKind: "VERIFICATION_REPORT" }), TypeError)
  assert.throws(() => validateK5R3ReviewAdjudicationSource({ ...descriptor, sourceIdentity: "0".repeat(64) }), TypeError)
  assert.throws(() => validateK5R3ReviewAdjudicationSource({ ...descriptor, sourceDigest: "0".repeat(64) }), TypeError)
})

test("tampered finding and adjudication historical identities fail closed", () => {
  const descriptor = clone(source())
  ;(descriptor.finding as unknown as Rec).summary = "tampered"
  assert.throws(() => validateK5R3ReviewAdjudicationSource(descriptor), /findingIdentity/)
  const second = clone(source())
  ;(second.adjudication as unknown as Rec).adjudicatorId = "other"
  assert.throws(() => validateK5R3ReviewAdjudicationSource(second), /adjudicationIdentity/)
})

test("the entire K5-R1 package is validated before any source inspection", () => {
  let sourceTraps = 0
  const invalidPackage = new Proxy({} as object, {
    ownKeys() { throw new Error("package trap") },
    getOwnPropertyDescriptor() { throw new Error("package trap") },
    getPrototypeOf() { throw new Error("package trap") },
  })
  const sources = new Proxy([] as unknown[], {
    ownKeys() { sourceTraps += 1; throw new Error("source trap") },
    getOwnPropertyDescriptor() { sourceTraps += 1; throw new Error("source trap") },
    getPrototypeOf() { sourceTraps += 1; throw new Error("source trap") },
  })
  assert.throws(() => linkK5R3ReviewAdjudicationEvidence(invalidPackage, sources), /Proxy/)
  assert.equal(sourceTraps, 0)
})

test("root and nested Proxies are rejected before traps execute", () => {
  let traps = 0
  const root = new Proxy(source() as object, {
    ownKeys() { traps += 1; throw new Error("trap") },
    getOwnPropertyDescriptor() { traps += 1; throw new Error("trap") },
    getPrototypeOf() { traps += 1; throw new Error("trap") },
  })
  assert.throws(() => validateK5R3ReviewAdjudicationSource(root), /Proxy/)
  assert.equal(traps, 0)
  const nested = clone(source())
  ;(nested.finding as unknown as Rec).review = new Proxy(nested.finding.review as object, {
    ownKeys() { traps += 1; throw new Error("trap") },
    getOwnPropertyDescriptor() { traps += 1; throw new Error("trap") },
    getPrototypeOf() { traps += 1; throw new Error("trap") },
  })
  assert.throws(() => validateK5R3ReviewAdjudicationSource(nested), /Proxy/)
  assert.equal(traps, 0)
})

test("hostile JSON representations, unknown fields/vocabulary, Unicode, and numeric edge cases fail closed", () => {
  const cases: Array<[string, () => void]> = []
  const accessor = clone(source()) as unknown as Rec
  Object.defineProperty(accessor, "sourceRef", { enumerable: true, get() { throw new Error("getter") } })
  cases.push(["accessor", () => validateK5R3ReviewAdjudicationSource(accessor)])
  cases.push(["symbol key", () => validateK5R3ReviewAdjudicationSource({ ...source(), [Symbol("x")]: true })])
  const sparse = clone(source())
  ;(sparse.finding as unknown as Rec).evidenceRefs = new Array(2)
  cases.push(["sparse array", () => validateK5R3ReviewAdjudicationSource(sparse)])
  const custom = Object.create({ inherited: true }) as Rec
  Object.assign(custom, source())
  cases.push(["custom prototype", () => validateK5R3ReviewAdjudicationSource(custom)])
  const cyclic = clone(source()) as unknown as Rec
  cyclic.cycle = cyclic
  cases.push(["cycle/unknown", () => validateK5R3ReviewAdjudicationSource(cyclic)])
  cases.push(["undefined", () => validateK5R3ReviewAdjudicationSource({ ...source(), sourceRef: undefined })])
  cases.push(["function", () => validateK5R3ReviewAdjudicationSource({ ...source(), sourceRef: () => "x" })])
  cases.push(["bigint", () => validateK5R3ReviewAdjudicationSource({ ...source(), sourceRef: 1n })])
  cases.push(["symbol primitive", () => validateK5R3ReviewAdjudicationSource({ ...source(), sourceRef: Symbol("x") })])
  cases.push(["unpaired Unicode", () => validateK5R3ReviewAdjudicationSource({ ...source(), sourceRef: "bad" + String.fromCharCode(0xd800) })])
  for (const number of [NaN, Infinity, -0, Number.MAX_SAFE_INTEGER + 1, 1.5]) {
    const candidate = clone(source())
    ;(candidate.finding as unknown as Rec).confidenceBps = number
    cases.push([`number ${String(number)}`, () => validateK5R3ReviewAdjudicationSource(candidate)])
  }
  cases.push(["unknown source field", () => validateK5R3ReviewAdjudicationSource({ ...source(), authority: "PROVEN_READY" })])
  const badSeverity = clone(source())
  ;(badSeverity.finding as unknown as Rec).severity = "urgent"
  cases.push(["unknown severity", () => validateK5R3ReviewAdjudicationSource(badSeverity)])
  for (const [name, run] of cases) assert.throws(run, TypeError, name)
})

test("returned source and linkage records are deeply immutable copies with no caller aliases", () => {
  const finding = clone(makeFinding())
  const adjudication = clone(makeAdjudication(finding))
  const created = createK5R3ReviewAdjudicationSource({ evidenceId: "e-review", sourceKind: "KRI_ADJUDICATION", canonicalBase: base, candidateHead: head, sourceRef: "review:adjudication:1", sourceDigest: adjudication.adjudicationIdentity, finding, adjudication })
  const originalSummary = created.finding.summary
  ;(finding as unknown as Rec).summary = "caller-mutated"
  ;(finding.evidenceRefs as string[]).push("caller:extra")
  ;(adjudication.evidenceRefs as string[]).push("caller:extra")
  assert.equal(created.finding.summary, originalSummary)
  assert.deepEqual(created.finding.evidenceRefs, ["review:request", "review:terminal"])
  assert.equal(Object.isFrozen(created), true)
  assert.equal(Object.isFrozen(created.finding), true)
  assert.equal(Object.isFrozen(created.finding.review), true)
  assert.equal(Object.isFrozen(created.finding.evidenceRefs), true)
  assert.equal(Object.isFrozen(created.adjudication), true)
  assert.equal(Object.isFrozen(created.adjudication.evidenceRefs), true)
  const linkage = linkK5R3ReviewAdjudicationEvidence(createK5R1ProofPackage(packageInput(created.sourceDigest)), [created])
  assert.equal(Object.isFrozen(linkage), true)
  assert.equal(Object.isFrozen(linkage.revision), true)
  assert.equal(Object.isFrozen(linkage.links), true)
  assert.equal(Object.isFrozen(linkage.links[0]), true)
  assert.equal(Object.isFrozen(linkage.links[0]?.codes), true)
  assert.equal(Object.isFrozen(linkage.outOfScopeEvidenceIds), true)
  assert.equal(Object.isFrozen(linkage.sourceIdentities), true)
})

test("source ordering and linkage identity are deterministic and linkage tampering is rejected", () => {
  const first = source({ evidenceId: "e-review-a" })
  const second = source({ evidenceId: "e-review-b" })
  const input: K5R1ProofPackageInput = {
    subject: { subjectId: "determinism", subjectKind: "CHANGESET" },
    revision: { repositoryId: "TheHalfMoon/Kodac", canonicalBase: base, candidateHead: head },
    requirements: [{ requirementId: "review", kind: "REVIEW_ADJUDICATION", minimumEvidence: 2 }],
    evidence: [
      { evidenceId: "e-review-b", kind: "REVIEW_ADJUDICATION", requirementIds: ["review"], canonicalBase: base, candidateHead: head, ref: second.sourceRef, digest: second.sourceDigest, status: "SATISFIED" },
      { evidenceId: "e-review-a", kind: "REVIEW_ADJUDICATION", requirementIds: ["review"], canonicalBase: base, candidateHead: head, ref: first.sourceRef, digest: first.sourceDigest, status: "FAILED" },
    ],
  }
  const proofPackage = createK5R1ProofPackage(input)
  const left = linkK5R3ReviewAdjudicationEvidence(proofPackage, [second, first])
  const right = linkK5R3ReviewAdjudicationEvidence(proofPackage, [first, second])
  assert.deepEqual(left, right)
  assert.deepEqual(left.links.map((item) => item.evidenceId), ["e-review-a", "e-review-b"])
  assert.equal(validateK5R3ReviewAdjudicationLinkage(left).linkageIdentity, left.linkageIdentity)
  assert.throws(() => validateK5R3ReviewAdjudicationLinkage({ ...left, linkageIdentity: "0".repeat(64) }), TypeError)
})
