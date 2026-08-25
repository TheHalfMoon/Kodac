import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import test from "node:test"

import {
  createK5R1ProofPackage,
  type K5R1EvidenceStatus,
  type K5R1ProofPackage,
  type K5R1ProofPackageInput,
} from "../src/proof-review/contracts.ts"
import {
  createK5R2SourceLink,
  type K5R2EvidenceLinkage,
  type K5R2SourceLink,
} from "../src/proof-review/linkage-contracts.ts"
import { linkK5R2Evidence } from "../src/proof-review/linkage.ts"
import {
  K5_R3_REVIEW_ADJUDICATION_LINKAGE_VERSION,
  createK5R3ReviewAdjudicationSource,
  type K5R3KriAdjudicationRecord,
  type K5R3KriFindingRecord,
  type K5R3ReviewAdjudicationLinkage,
  type K5R3ReviewAdjudicationSource,
} from "../src/proof-review/review-adjudication-contracts.ts"
import { linkK5R3ReviewAdjudicationEvidence } from "../src/proof-review/review-adjudication.ts"
import {
  K5_R4_EVIDENCE_STATES,
  K5_R4_LIMITS,
  K5_R4_PROOF_STATE_RECONCILIATION_VERSION,
  k5R4ReconciliationIdentity,
  k5R4StateFromCauses,
  validateK5R4ProofStateReconciliation,
  type K5R4ProofStateReconciliation,
} from "../src/proof-review/reconciliation-contracts.ts"
import { reconcileK5R4ProofState } from "../src/proof-review/reconciliation.ts"

const base = "0".repeat(40)
const head = "1".repeat(40)
const otherBase = "2".repeat(40)
const otherHead = "3".repeat(40)
const digestVerify = "a".repeat(64)
const digestReceipt = "b".repeat(64)
const digestRepo = "c".repeat(64)
const digestArtifact = "d".repeat(64)
const digestCustom = "e".repeat(64)
type Rec = Record<string, unknown>
type Statuses = Partial<Record<"verify" | "receipt" | "repo" | "review" | "artifact" | "custom", K5R1EvidenceStatus>>

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize)
  if (typeof value === "object" && value !== null) {
    const source = value as Rec
    const ordered: Rec = {}
    for (const key of Object.keys(source).sort(compareStrings)) ordered[key] = canonicalize(source[key])
    return ordered
  }
  return value
}

function identity(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(canonicalize(value)), "utf8").digest("hex")
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function makeFinding(canonicalBase = base, reviewedHead = head): K5R3KriFindingRecord {
  const historical = {
    version: "kri-r2-finding-v1" as const,
    claimKey: "claim.k5-r4.review",
    review: {
      reviewRunId: "review-run-k5-r4",
      reviewerId: "coderabbit",
      reviewerVersion: "2026-08-25",
      policyIdentity: "policy-kri-r2",
      canonicalBase,
      reviewedHead,
    },
    path: "packages/kodac-runtime/src/proof-review/reconciliation.ts",
    range: { startLine: 1, endLine: 8 },
    summary: "Material review finding requiring bounded adjudication.",
    contractClaim: "K5-R4 must preserve predecessor proof authority.",
    category: "correctness",
    severity: "high" as const,
    confidenceBps: 9750,
    evidenceRefs: ["review:request", "review:terminal"],
  }
  return {
    ...historical,
    findingIdentity: identity(historical),
    evaluatedHead: reviewedHead,
    freshness: "CURRENT",
    state: "NEW",
  }
}

function makeAdjudication(finding: K5R3KriFindingRecord): K5R3KriAdjudicationRecord {
  const preimage = {
    version: "kri-r2-adjudication-v1" as const,
    findingIdentity: finding.findingIdentity,
    previousAdjudicationIdentity: null,
    action: "CONFIRM" as const,
    previousState: "NEW" as const,
    resultingState: "CONFIRMED" as const,
    adjudicatorId: "founder-adjudicator",
    evidenceRefs: ["adjudication:reason", "review:terminal"],
  }
  return { ...preimage, adjudicationIdentity: identity(preimage) }
}

function reviewSource(options: {
  canonicalBase?: string
  candidateHead?: string
  sourceRef?: string
} = {}): K5R3ReviewAdjudicationSource {
  const canonicalBase = options.canonicalBase ?? base
  const candidateHead = options.candidateHead ?? head
  const finding = makeFinding(canonicalBase, candidateHead)
  const adjudication = makeAdjudication(finding)
  return createK5R3ReviewAdjudicationSource({
    evidenceId: "e-review",
    sourceKind: "KRI_ADJUDICATION",
    canonicalBase,
    candidateHead,
    sourceRef: options.sourceRef ?? "review:adjudication:1",
    sourceDigest: adjudication.adjudicationIdentity,
    finding,
    adjudication,
  })
}

function packageInput(reviewDigest: string, statuses: Statuses = {}, reverse = false): K5R1ProofPackageInput {
  const requirements = [
    { requirementId: "artifact", kind: "ARTIFACT" as const, minimumEvidence: 1 },
    { requirementId: "custom", kind: "CUSTOM" as const, minimumEvidence: 1 },
    { requirementId: "receipt", kind: "EXECUTION_RECEIPT" as const, minimumEvidence: 1 },
    { requirementId: "repo", kind: "REPOSITORY_STATE" as const, minimumEvidence: 1 },
    { requirementId: "review", kind: "REVIEW_ADJUDICATION" as const, minimumEvidence: 1 },
    { requirementId: "verify", kind: "VERIFICATION" as const, minimumEvidence: 1 },
  ]
  const evidence = [
    { evidenceId: "e-artifact", kind: "ARTIFACT" as const, requirementIds: ["artifact"], canonicalBase: base, candidateHead: head, ref: "artifact:a1", digest: digestArtifact, status: statuses.artifact ?? "SATISFIED" },
    { evidenceId: "e-custom", kind: "CUSTOM" as const, requirementIds: ["custom"], canonicalBase: base, candidateHead: head, ref: "custom:c1", digest: digestCustom, status: statuses.custom ?? "SATISFIED" },
    { evidenceId: "e-receipt", kind: "EXECUTION_RECEIPT" as const, requirementIds: ["receipt"], canonicalBase: base, candidateHead: head, ref: "receipt:r1", digest: digestReceipt, status: statuses.receipt ?? "SATISFIED" },
    { evidenceId: "e-repo", kind: "REPOSITORY_STATE" as const, requirementIds: ["repo"], canonicalBase: base, candidateHead: head, ref: "snapshot:s1", digest: digestRepo, status: statuses.repo ?? "SATISFIED" },
    { evidenceId: "e-review", kind: "REVIEW_ADJUDICATION" as const, requirementIds: ["review"], canonicalBase: base, candidateHead: head, ref: "review:adjudication:1", digest: reviewDigest, status: statuses.review ?? "SATISFIED" },
    { evidenceId: "e-verify", kind: "VERIFICATION" as const, requirementIds: ["verify"], canonicalBase: base, candidateHead: head, ref: "verification:v1", digest: digestVerify, status: statuses.verify ?? "SATISFIED" },
  ]
  return {
    subject: { subjectId: "k5-r4", subjectKind: "CHANGESET" },
    revision: { repositoryId: "TheHalfMoon/Kodac", canonicalBase: base, candidateHead: head },
    requirements: reverse ? [...requirements].reverse() : requirements,
    evidence: reverse ? [...evidence].reverse() : evidence,
  }
}

function verificationSource(options: {
  canonicalBase?: string
  candidateHead?: string
  sourceRef?: string
  sourceDigest?: string
  wrongKind?: boolean
} = {}): K5R2SourceLink {
  if (options.wrongKind) {
    return createK5R2SourceLink({
      evidenceId: "e-verify",
      sourceKind: "EXECUTION_RECEIPT",
      canonicalBase: options.canonicalBase ?? base,
      candidateHead: options.candidateHead ?? head,
      sourceRef: options.sourceRef ?? "verification:v1",
      sourceDigest: options.sourceDigest ?? digestVerify,
      metadata: {
        receiptId: "wrong-kind",
        capability: "repo.read",
        inputDigest: "f".repeat(64),
        policyDecision: "deny",
        resultStatus: "blocked",
      },
    })
  }
  return createK5R2SourceLink({
    evidenceId: "e-verify",
    sourceKind: "VERIFICATION_REPORT",
    canonicalBase: options.canonicalBase ?? base,
    candidateHead: options.candidateHead ?? head,
    sourceRef: options.sourceRef ?? "verification:v1",
    sourceDigest: options.sourceDigest ?? digestVerify,
    metadata: {
      protocol: "kodac.verification",
      reportVersion: 1,
      sessionId: "session-k5-r4",
      passed: true,
      checkIds: ["agent.completed", "workspace.integrity"],
    },
  })
}

function receiptSource(): K5R2SourceLink {
  return createK5R2SourceLink({
    evidenceId: "e-receipt",
    sourceKind: "EXECUTION_RECEIPT",
    canonicalBase: base,
    candidateHead: head,
    sourceRef: "receipt:r1",
    sourceDigest: digestReceipt,
    metadata: {
      receiptId: "r1",
      capability: "repo.apply_patch",
      inputDigest: "f".repeat(64),
      policyDecision: "allow",
      resultStatus: "success",
    },
  })
}

function repositorySource(): K5R2SourceLink {
  return createK5R2SourceLink({
    evidenceId: "e-repo",
    sourceKind: "REPOSITORY_REVISION",
    canonicalBase: base,
    candidateHead: head,
    sourceRef: "snapshot:s1",
    sourceDigest: digestRepo,
    metadata: {
      snapshotVersion: "k3-r2-snapshot-v1",
      repositoryIdentity: "2".repeat(64),
      contentIdentity: "3".repeat(64),
      snapshotIdentity: "4".repeat(64),
      observedGitHead: head,
      freshness: "current",
      completeness: "complete",
      omittedAtLeast: 0,
    },
  })
}

function makePackage(statuses: Statuses = {}, reverse = false, descriptor = reviewSource()): K5R1ProofPackage {
  return createK5R1ProofPackage(packageInput(descriptor.sourceDigest, statuses, reverse))
}

function defaultR2(proofPackage: K5R1ProofPackage, verify = verificationSource()): K5R2EvidenceLinkage {
  return linkK5R2Evidence(proofPackage, [repositorySource(), verify, receiptSource()])
}

function defaultR3(proofPackage: K5R1ProofPackage, descriptor = reviewSource()): K5R3ReviewAdjudicationLinkage {
  return linkK5R3ReviewAdjudicationEvidence(proofPackage, [descriptor])
}

function reconcile(options: { statuses?: Statuses; verify?: K5R2SourceLink | null; review?: K5R3ReviewAdjudicationSource | null } = {}): K5R4ProofStateReconciliation {
  const descriptor = options.review === undefined ? reviewSource() : options.review
  const packageDescriptor = descriptor ?? reviewSource()
  const proofPackage = makePackage(options.statuses, false, packageDescriptor)
  const r2Sources = [repositorySource(), receiptSource()]
  if (options.verify === undefined) r2Sources.push(verificationSource())
  else if (options.verify !== null) r2Sources.push(options.verify)
  const r2 = linkK5R2Evidence(proofPackage, r2Sources)
  const r3 = linkK5R3ReviewAdjudicationEvidence(proofPackage, descriptor === null ? [] : [descriptor])
  return reconcileK5R4ProofState(proofPackage, r2, r3)
}

function reidentifyLinkage<T extends K5R2EvidenceLinkage | K5R3ReviewAdjudicationLinkage>(value: T): T {
  const candidate = clone(value) as unknown as Rec
  delete candidate.linkageIdentity
  return { ...(candidate as unknown as T), linkageIdentity: identity(candidate) }
}

test("reconciles all five non-empty states without transferring Done Gate authority", () => {
  const cases = [
    ["SATISFIED", "VALID"],
    ["FAILED", "INCOMPLETE"],
    ["STALE", "STALE"],
    ["CONTRADICTORY", "CONTRADICTORY"],
    ["INVALID", "INVALID"],
  ] as const
  for (const [r1Status, expected] of cases) {
    const result = reconcile({ statuses: { verify: r1Status } })
    assert.equal(result.results.find((item) => item.evidenceId === "e-verify")?.state, expected)
    assert.equal(result.status, expected)
    assert.equal(JSON.stringify(result).includes("PROVEN_READY"), false)
  }
})

test("STALE outranks CONTRADICTORY in both cause and aggregate precedence", () => {
  assert.deepEqual(K5_R4_EVIDENCE_STATES, ["VALID", "INCOMPLETE", "CONTRADICTORY", "STALE", "INVALID"])
  assert.equal(k5R4StateFromCauses(["R1_EXPLICIT_CONTRADICTORY", "R1_EXPLICIT_STALE"]), "STALE")
  const mixed = reconcile({ statuses: { verify: "STALE", review: "CONTRADICTORY" } })
  assert.equal(mixed.results.find((item) => item.evidenceId === "e-verify")?.state, "STALE")
  assert.equal(mixed.results.find((item) => item.evidenceId === "e-review")?.state, "CONTRADICTORY")
  assert.equal(mixed.status, "STALE")
})

test("NOT_APPLICABLE is emitted only when the package has no R4-linked evidence", () => {
  const input: K5R1ProofPackageInput = {
    subject: { subjectId: "k5-r4-na", subjectKind: "CHANGESET" },
    revision: { repositoryId: "TheHalfMoon/Kodac", canonicalBase: base, candidateHead: head },
    requirements: [
      { requirementId: "artifact", kind: "ARTIFACT", minimumEvidence: 1 },
      { requirementId: "custom", kind: "CUSTOM", minimumEvidence: 1 },
    ],
    evidence: [
      { evidenceId: "e-artifact", kind: "ARTIFACT", requirementIds: ["artifact"], canonicalBase: base, candidateHead: head, ref: "artifact:a", digest: digestArtifact, status: "INVALID" },
      { evidenceId: "e-custom", kind: "CUSTOM", requirementIds: ["custom"], canonicalBase: base, candidateHead: head, ref: "custom:c", digest: digestCustom, status: "STALE" },
    ],
  }
  const proofPackage = createK5R1ProofPackage(input)
  const r2 = linkK5R2Evidence(proofPackage, [])
  const r3 = linkK5R3ReviewAdjudicationEvidence(proofPackage, [])
  const result = reconcileK5R4ProofState(proofPackage, r2, r3)
  assert.equal(result.status, "NOT_APPLICABLE")
  assert.deepEqual(result.results, [])
  assert.deepEqual(result.outOfScopeEvidenceIds, ["e-artifact", "e-custom"])
})

test("maps every R2 link code to the fixed R4 cause vocabulary", () => {
  const cases = [
    [null, "R2_NO_SOURCE", "INCOMPLETE"],
    [verificationSource({ wrongKind: true }), "R2_KIND_MISMATCH", "INVALID"],
    [verificationSource({ canonicalBase: otherBase, candidateHead: otherHead }), "R2_REVISION_MISMATCH", "STALE"],
    [verificationSource({ sourceRef: "verification:wrong" }), "R2_REF_MISMATCH", "INVALID"],
    [verificationSource({ sourceDigest: "9".repeat(64) }), "R2_DIGEST_MISMATCH", "INVALID"],
  ] as const
  for (const [source, expectedCause, expectedState] of cases) {
    const result = reconcile({ verify: source })
    const item = result.results.find((candidate) => candidate.evidenceId === "e-verify")
    assert.equal(item?.causes.includes(expectedCause), true)
    assert.equal(item?.state, expectedState)
  }
})

test("maps every R3 link code and preserves mixed R2/R3 routing", () => {
  const cases = [
    [null, "R3_NO_SOURCE", "INCOMPLETE"],
    [reviewSource({ canonicalBase: otherBase, candidateHead: otherHead }), "R3_REVISION_MISMATCH", "STALE"],
    [reviewSource({ sourceRef: "review:wrong" }), "R3_REF_MISMATCH", "INVALID"],
  ] as const
  for (const [source, expectedCause, expectedState] of cases) {
    const result = reconcile({ review: source })
    const item = result.results.find((candidate) => candidate.evidenceId === "e-review")
    assert.equal(item?.causes.includes(expectedCause), true)
    assert.equal(item?.state, expectedState)
    assert.equal(item?.linkageLayer, "K5_R3")
    assert.equal(result.results.find((candidate) => candidate.evidenceId === "e-verify")?.linkageLayer, "K5_R2")
  }

  const descriptor = reviewSource()
  const proofPackage = createK5R1ProofPackage({
    ...packageInput("9".repeat(64)),
  })
  const r2 = defaultR2(proofPackage)
  const r3 = linkK5R3ReviewAdjudicationEvidence(proofPackage, [descriptor])
  const digestMismatch = reconcileK5R4ProofState(proofPackage, r2, r3)
  assert.deepEqual(digestMismatch.results.find((item) => item.evidenceId === "e-review")?.causes, ["R3_DIGEST_MISMATCH"])
})

test("causes are cumulative, duplicate-free, fixed-order, and worst-state precedence is exact", () => {
  const staleMissing = reconcile({ statuses: { verify: "STALE" }, verify: null })
  assert.deepEqual(staleMissing.results.find((item) => item.evidenceId === "e-verify")?.causes, ["R1_EXPLICIT_STALE", "R2_NO_SOURCE"])
  assert.equal(staleMissing.results.find((item) => item.evidenceId === "e-verify")?.state, "STALE")

  const contradictoryInvalid = reconcile({ statuses: { verify: "CONTRADICTORY" }, verify: verificationSource({ sourceRef: "wrong" }) })
  assert.deepEqual(contradictoryInvalid.results.find((item) => item.evidenceId === "e-verify")?.causes, ["R2_REF_MISMATCH", "R1_EXPLICIT_CONTRADICTORY"])
  assert.equal(contradictoryInvalid.results.find((item) => item.evidenceId === "e-verify")?.state, "INVALID")

  const failedMissing = reconcile({ statuses: { verify: "FAILED" }, verify: null })
  assert.deepEqual(failedMissing.results.find((item) => item.evidenceId === "e-verify")?.causes, ["R1_EXPLICIT_FAILED", "R2_NO_SOURCE"])
  assert.equal(failedMissing.results.find((item) => item.evidenceId === "e-verify")?.state, "INCOMPLETE")

  const cumulative = reconcile({
    statuses: { verify: "STALE" },
    verify: verificationSource({ canonicalBase: otherBase, candidateHead: otherHead, sourceRef: "wrong", sourceDigest: "9".repeat(64), wrongKind: true }),
  })
  assert.deepEqual(cumulative.results.find((item) => item.evidenceId === "e-verify")?.causes, [
    "R2_KIND_MISMATCH",
    "R2_REF_MISMATCH",
    "R2_DIGEST_MISMATCH",
    "R1_EXPLICIT_STALE",
    "R2_REVISION_MISMATCH",
  ])
  assert.equal(cumulative.status, "INVALID")
})

test("ARTIFACT and CUSTOM statuses are explicitly out of scope and cannot influence aggregate status", () => {
  const result = reconcile({ statuses: { artifact: "INVALID", custom: "CONTRADICTORY" } })
  assert.equal(result.status, "VALID")
  assert.deepEqual(result.outOfScopeEvidenceIds, ["e-artifact", "e-custom"])
  assert.equal(result.results.some((item) => item.evidenceId === "e-artifact" || item.evidenceId === "e-custom"), false)
})

test("package identity and each outer revision field are exact structural bindings", () => {
  const descriptor = reviewSource()
  const proofPackage = makePackage({}, false, descriptor)
  const r2 = defaultR2(proofPackage)
  const r3 = defaultR3(proofPackage, descriptor)

  const wrongPackageR2 = reidentifyLinkage({ ...clone(r2), packageIdentity: "9".repeat(64) } as K5R2EvidenceLinkage)
  assert.throws(() => reconcileK5R4ProofState(proofPackage, wrongPackageR2, r3), /packageIdentity/)
  const wrongPackageR3 = reidentifyLinkage({ ...clone(r3), packageIdentity: "8".repeat(64) } as K5R3ReviewAdjudicationLinkage)
  assert.throws(() => reconcileK5R4ProofState(proofPackage, r2, wrongPackageR3), /packageIdentity/)

  for (const field of ["repositoryId", "canonicalBase", "candidateHead"] as const) {
    const badR2 = clone(r2)
    ;(badR2.revision as unknown as Rec)[field] = field === "repositoryId" ? "other/repo" : otherHead
    assert.throws(() => reconcileK5R4ProofState(proofPackage, reidentifyLinkage(badR2), r3), /revision/)
    const badR3 = clone(r3)
    ;(badR3.revision as unknown as Rec)[field] = field === "repositoryId" ? "other/repo" : otherHead
    assert.throws(() => reconcileK5R4ProofState(proofPackage, r2, reidentifyLinkage(badR3)), /revision/)
  }
})

test("missing, orphaned, duplicate, substituted linkage membership and wrong complements fail structurally", () => {
  const descriptor = reviewSource()
  const proofPackage = makePackage({}, false, descriptor)
  const r2 = defaultR2(proofPackage)
  const r3 = defaultR3(proofPackage, descriptor)

  const missing = clone(r2)
  ;(missing.links as unknown as unknown[]).pop()
  assert.throws(() => reconcileK5R4ProofState(proofPackage, reidentifyLinkage(missing), r3), TypeError)

  const orphan = clone(r2)
  ;(orphan.links[0] as unknown as Rec).evidenceId = "e-orphan"
  assert.throws(() => reconcileK5R4ProofState(proofPackage, reidentifyLinkage(orphan), r3), TypeError)

  const duplicate = clone(r2)
  ;(duplicate.links as unknown as unknown[])[1] = clone(duplicate.links[0])
  assert.throws(() => reconcileK5R4ProofState(proofPackage, reidentifyLinkage(duplicate), r3), TypeError)

  const substituted = clone(r2)
  ;(substituted.links[0] as unknown as Rec).evidenceId = "e-artifact"
  assert.throws(() => reconcileK5R4ProofState(proofPackage, reidentifyLinkage(substituted), r3), TypeError)

  const wrongComplement = clone(r3)
  ;(wrongComplement.outOfScopeEvidenceIds as unknown as string[]).splice(0, 1)
  assert.throws(() => reconcileK5R4ProofState(proofPackage, r2, reidentifyLinkage(wrongComplement)), TypeError)
})

test("equivalent input ordering produces identical canonical output and identity", () => {
  const descriptor = reviewSource()
  const firstPackage = makePackage({}, false, descriptor)
  const secondPackage = makePackage({}, true, descriptor)
  assert.equal(firstPackage.packageIdentity, secondPackage.packageIdentity)
  const firstR2 = linkK5R2Evidence(firstPackage, [verificationSource(), receiptSource(), repositorySource()])
  const secondR2 = linkK5R2Evidence(secondPackage, [repositorySource(), receiptSource(), verificationSource()])
  const firstR3 = linkK5R3ReviewAdjudicationEvidence(firstPackage, [descriptor])
  const secondR3 = linkK5R3ReviewAdjudicationEvidence(secondPackage, [descriptor])
  const first = reconcileK5R4ProofState(firstPackage, firstR2, firstR3)
  const second = reconcileK5R4ProofState(secondPackage, secondR2, secondR3)
  assert.deepEqual(first, second)
  assert.equal(first.reconciliationIdentity, second.reconciliationIdentity)
})

test("reconciliation identity covers version and every normalized identity-bearing field", () => {
  const result = reconcile()
  assert.equal(result.version, K5_R4_PROOF_STATE_RECONCILIATION_VERSION)
  assert.equal(validateK5R4ProofStateReconciliation(result).reconciliationIdentity, result.reconciliationIdentity)
  assert.throws(() => validateK5R4ProofStateReconciliation({ ...result, reconciliationIdentity: "0".repeat(64) }), TypeError)
  const preimage = clone(result) as unknown as Rec
  delete preimage.reconciliationIdentity
  const original = k5R4ReconciliationIdentity(preimage as never)
  const withOtherVersion = { ...preimage, version: "kodac-k5-r4-proof-state-reconciliation-v2" }
  assert.notEqual(k5R4ReconciliationIdentity(withOtherVersion as never), original)
})

test("returned records are deeply immutable defensive copies with no caller aliases", () => {
  const result = reconcile()
  assert.equal(Object.isFrozen(result), true)
  assert.equal(Object.isFrozen(result.revision), true)
  assert.equal(Object.isFrozen(result.results), true)
  assert.equal(Object.isFrozen(result.results[0]), true)
  assert.equal(Object.isFrozen(result.results[0]?.causes), true)
  assert.equal(Object.isFrozen(result.outOfScopeEvidenceIds), true)
  assert.throws(() => (result.results as K5R4ProofStateReconciliation["results"] & unknown[]).push(result.results[0] as never), TypeError)
})

test("the entire R1 package is validated before R2 or R3 hostile linkage inspection", () => {
  let laterTraps = 0
  const invalidPackage = new Proxy({} as object, {
    ownKeys() { throw new Error("package trap") },
    getOwnPropertyDescriptor() { throw new Error("package trap") },
    getPrototypeOf() { throw new Error("package trap") },
  })
  const hostile = new Proxy({} as object, {
    ownKeys() { laterTraps += 1; throw new Error("later trap") },
    getOwnPropertyDescriptor() { laterTraps += 1; throw new Error("later trap") },
    getPrototypeOf() { laterTraps += 1; throw new Error("later trap") },
  })
  assert.throws(() => reconcileK5R4ProofState(invalidPackage, hostile, hostile), /Proxy/)
  assert.equal(laterTraps, 0)
})

test("serialized validator rejects root and nested Proxies before traps execute", () => {
  const result = reconcile()
  let traps = 0
  const root = new Proxy(result as unknown as object, {
    ownKeys() { traps += 1; throw new Error("trap") },
    getOwnPropertyDescriptor() { traps += 1; throw new Error("trap") },
    getPrototypeOf() { traps += 1; throw new Error("trap") },
  })
  assert.throws(() => validateK5R4ProofStateReconciliation(root), /Proxy/)
  assert.equal(traps, 0)

  const nested = clone(result) as unknown as Rec
  nested.revision = new Proxy(nested.revision as object, {
    ownKeys() { traps += 1; throw new Error("trap") },
    getOwnPropertyDescriptor() { traps += 1; throw new Error("trap") },
    getPrototypeOf() { traps += 1; throw new Error("trap") },
  })
  assert.throws(() => validateK5R4ProofStateReconciliation(nested), /Proxy/)
  assert.equal(traps, 0)
})

test("serialized validator fails closed on hostile JavaScript representations", () => {
  const result = reconcile()

  const accessor = clone(result) as unknown as Rec
  Object.defineProperty(accessor, "status", { enumerable: true, get() { throw new Error("getter") } })
  assert.throws(() => validateK5R4ProofStateReconciliation(accessor), /data property/)

  const symbolField = clone(result) as unknown as Rec
  ;(symbolField as Rec & { [key: symbol]: unknown })[Symbol("x")] = true
  assert.throws(() => validateK5R4ProofStateReconciliation(symbolField), /symbol/)

  const custom = Object.create({ inherited: true }) as Rec
  Object.assign(custom, clone(result))
  assert.throws(() => validateK5R4ProofStateReconciliation(custom), /plain object/)

  const sparse = clone(result) as unknown as Rec
  sparse.outOfScopeEvidenceIds = new Array(2)
  assert.throws(() => validateK5R4ProofStateReconciliation(sparse), /unexpected array fields|dense/)

  const cycle = clone(result) as unknown as Rec
  cycle.extra = cycle
  assert.throws(() => validateK5R4ProofStateReconciliation(cycle), /cycles/)

  for (const hostile of [undefined, () => 1, 1n, Symbol("primitive")]) {
    const candidate = clone(result) as unknown as Rec
    candidate.extra = hostile
    assert.throws(() => validateK5R4ProofStateReconciliation(candidate), /JSON data/)
  }

  for (const hostile of [NaN, Infinity, -Infinity, -0, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
    const candidate = clone(result) as unknown as Rec
    candidate.extra = hostile
    assert.throws(() => validateK5R4ProofStateReconciliation(candidate), /safe integer/)
  }

  const invalidUnicode = clone(result) as unknown as Rec
  invalidUnicode.extra = "bad" + String.fromCharCode(0xd800)
  assert.throws(() => validateK5R4ProofStateReconciliation(invalidUnicode), /Unicode/)
})

test("serialized validator enforces depth, node, and aggregate-string budgets iteratively", () => {
  const result = reconcile()
  const deep = clone(result) as unknown as Rec
  let nested: Rec = {}
  deep.extra = nested
  for (let index = 0; index < K5_R4_LIMITS.safeJsonMaxDepth + 2; index += 1) {
    const next: Rec = {}
    nested.next = next
    nested = next
  }
  assert.throws(() => validateK5R4ProofStateReconciliation(deep), /nesting depth/)

  const wide = clone(result) as unknown as Rec
  wide.extra = new Array(K5_R4_LIMITS.safeJsonMaxNodes + 1).fill(null)
  assert.throws(() => validateK5R4ProofStateReconciliation(wide), /node budget/)

  const strings = clone(result) as unknown as Rec
  strings.extra = "x".repeat(K5_R4_LIMITS.safeJsonMaxTotalStringChars + 1)
  assert.throws(() => validateK5R4ProofStateReconciliation(strings), /string budget/)
})

test("serialized validator rejects non-canonical ordering, vocabulary, cause order, and identity tampering", () => {
  const result = reconcile({ statuses: { verify: "CONTRADICTORY" }, verify: verificationSource({ sourceRef: "wrong" }) })

  const resultOrder = clone(result)
  ;(resultOrder.results as unknown as unknown[]).reverse()
  assert.throws(() => validateK5R4ProofStateReconciliation(resultOrder), /canonically sorted/)

  const unknownState = clone(result) as unknown as Rec
  ;((unknownState.results as Rec[])[0] as Rec).state = "PROVEN_READY"
  assert.throws(() => validateK5R4ProofStateReconciliation(unknownState), /unsupported/)

  const causeOrder = clone(result)
  const verify = (causeOrder.results as unknown as Array<{ evidenceId: string; causes: string[] }>).find((item) => item.evidenceId === "e-verify")
  if (verify === undefined) throw new Error("missing verification result")
  verify.causes.reverse()
  assert.throws(() => validateK5R4ProofStateReconciliation(causeOrder), /fixed canonical cause order/)

  const outOrder = clone(result)
  ;(outOrder.outOfScopeEvidenceIds as unknown as string[]).reverse()
  assert.throws(() => validateK5R4ProofStateReconciliation(outOrder), /canonically sorted/)

  assert.throws(() => validateK5R4ProofStateReconciliation({ ...result, status: "PROVEN_READY" }), /unsupported/)
  assert.throws(() => validateK5R4ProofStateReconciliation({ ...result, packageIdentity: "9".repeat(64) }), /reconciliationIdentity/)
})

test("R3 linkage version remains predecessor-owned and is not rewritten by R4", () => {
  const descriptor = reviewSource()
  const proofPackage = makePackage({}, false, descriptor)
  const r3 = defaultR3(proofPackage, descriptor)
  assert.equal(r3.version, K5_R3_REVIEW_ADJUDICATION_LINKAGE_VERSION)
  const result = reconcileK5R4ProofState(proofPackage, defaultR2(proofPackage), r3)
  assert.equal(result.r3LinkageIdentity, r3.linkageIdentity)
})
