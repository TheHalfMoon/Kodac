import assert from "node:assert/strict"
import test from "node:test"

import {
  createK5R1ProofPackage,
  type K5R1ProofPackageInput,
} from "../src/proof-review/contracts.ts"
import {
  K5_R2_EVIDENCE_LINKAGE_VERSION,
  K5_R2_SOURCE_LINK_VERSION,
  createK5R2SourceLink,
  validateK5R2EvidenceLinkage,
  validateK5R2SourceLink,
  type K5R2SourceLink,
} from "../src/proof-review/linkage-contracts.ts"
import { linkK5R2Evidence } from "../src/proof-review/linkage.ts"

const base = "0".repeat(40)
const head = "1".repeat(40)
const digestA = "a".repeat(64)
const digestB = "b".repeat(64)
const digestC = "c".repeat(64)
const digestD = "d".repeat(64)

function packageInput(): K5R1ProofPackageInput {
  return {
    subject: { subjectId: "k5-r2", subjectKind: "CHANGESET" },
    revision: { repositoryId: "TheHalfMoon/Kodac", canonicalBase: base, candidateHead: head },
    requirements: [
      { requirementId: "artifact", kind: "ARTIFACT", minimumEvidence: 1 },
      { requirementId: "receipt", kind: "EXECUTION_RECEIPT", minimumEvidence: 1 },
      { requirementId: "repo", kind: "REPOSITORY_STATE", minimumEvidence: 1 },
      { requirementId: "verify", kind: "VERIFICATION", minimumEvidence: 1 },
    ],
    evidence: [
      { evidenceId: "e-artifact", kind: "ARTIFACT", requirementIds: ["artifact"], canonicalBase: base, candidateHead: head, ref: "artifact:other", digest: digestD, status: "SATISFIED" },
      { evidenceId: "e-receipt", kind: "EXECUTION_RECEIPT", requirementIds: ["receipt"], canonicalBase: base, candidateHead: head, ref: "receipt:r1", digest: digestB, status: "FAILED" },
      { evidenceId: "e-repo", kind: "REPOSITORY_STATE", requirementIds: ["repo"], canonicalBase: base, candidateHead: head, ref: "snapshot:s1", digest: digestC, status: "STALE" },
      { evidenceId: "e-verify", kind: "VERIFICATION", requirementIds: ["verify"], canonicalBase: base, candidateHead: head, ref: "verification:v1", digest: digestA, status: "SATISFIED" },
    ],
  }
}

function verificationSource(overrides: Partial<Parameters<typeof createK5R2SourceLink>[0]> = {}): K5R2SourceLink {
  return createK5R2SourceLink({
    evidenceId: "e-verify",
    sourceKind: "VERIFICATION_REPORT",
    canonicalBase: base,
    candidateHead: head,
    sourceRef: "verification:v1",
    sourceDigest: digestA,
    metadata: { protocol: "kodac.verification", reportVersion: 1, sessionId: "session-1", passed: true, checkIds: ["workspace.integrity", "agent.completed"] },
    ...overrides,
  } as Parameters<typeof createK5R2SourceLink>[0])
}
function receiptSource(): K5R2SourceLink {
  return createK5R2SourceLink({ evidenceId: "e-receipt", sourceKind: "EXECUTION_RECEIPT", canonicalBase: base, candidateHead: head, sourceRef: "receipt:r1", sourceDigest: digestB, metadata: { receiptId: "r1", capability: "repo.apply_patch", inputDigest: "e".repeat(64), policyDecision: "allow", resultStatus: "success" } })
}
function repositorySource(): K5R2SourceLink {
  return createK5R2SourceLink({ evidenceId: "e-repo", sourceKind: "REPOSITORY_REVISION", canonicalBase: base, candidateHead: head, sourceRef: "snapshot:s1", sourceDigest: digestC, metadata: { snapshotVersion: "k3-r2-snapshot-v1", repositoryIdentity: "2".repeat(64), contentIdentity: "3".repeat(64), snapshotIdentity: "4".repeat(64), observedGitHead: head, freshness: "stale", completeness: "partial", omittedAtLeast: 1 } })
}
function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T }

test("links the three authorized evidence classes without transferring R1 or Done Gate authority", () => {
  const proofPackage = createK5R1ProofPackage(packageInput())
  const linkage = linkK5R2Evidence(proofPackage, [repositorySource(), verificationSource(), receiptSource()])
  assert.equal(linkage.version, K5_R2_EVIDENCE_LINKAGE_VERSION)
  assert.equal(linkage.packageIdentity, proofPackage.packageIdentity)
  assert.deepEqual(linkage.revision, proofPackage.revision)
  assert.deepEqual(linkage.links.map((item) => [item.evidenceId, item.status]), [["e-receipt", "LINKED"], ["e-repo", "LINKED"], ["e-verify", "LINKED"]])
  assert.deepEqual(linkage.outOfScopeEvidenceIds, ["e-artifact"])
  assert.equal(linkage.sourceIdentities.length, 3)
  assert.equal(JSON.stringify(linkage).includes("PROVEN_READY"), false)
  assert.equal(proofPackage.evidence.find((item) => item.evidenceId === "e-receipt")?.status, "FAILED")
  assert.equal(proofPackage.evidence.find((item) => item.evidenceId === "e-repo")?.status, "STALE")
})

test("missing descriptors produce only UNLINKED + NO_SOURCE and preserve out-of-scope evidence separately", () => {
  const linkage = linkK5R2Evidence(createK5R1ProofPackage(packageInput()), [])
  assert.deepEqual(linkage.links.map((item) => ({ evidenceId: item.evidenceId, status: item.status, codes: item.codes, sourceKind: item.sourceKind, sourceIdentity: item.sourceIdentity })), [
    { evidenceId: "e-receipt", status: "UNLINKED", codes: ["NO_SOURCE"], sourceKind: null, sourceIdentity: null },
    { evidenceId: "e-repo", status: "UNLINKED", codes: ["NO_SOURCE"], sourceKind: null, sourceIdentity: null },
    { evidenceId: "e-verify", status: "UNLINKED", codes: ["NO_SOURCE"], sourceKind: null, sourceIdentity: null },
  ])
  assert.deepEqual(linkage.outOfScopeEvidenceIds, ["e-artifact"])
})

test("multiple descriptor mismatches are cumulative and emitted in fixed rank order", () => {
  const mismatched = createK5R2SourceLink({ evidenceId: "e-verify", sourceKind: "EXECUTION_RECEIPT", canonicalBase: "2".repeat(40), candidateHead: "3".repeat(40), sourceRef: "wrong:ref", sourceDigest: "f".repeat(64), metadata: { receiptId: "wrong", capability: "repo.read", inputDigest: "e".repeat(64), policyDecision: "deny", resultStatus: "blocked" } })
  const result = linkK5R2Evidence(createK5R1ProofPackage(packageInput()), [mismatched]).links.find((item) => item.evidenceId === "e-verify")
  assert.equal(result?.status, "MISMATCH")
  assert.deepEqual(result?.codes, ["KIND_MISMATCH", "REVISION_MISMATCH", "REF_MISMATCH", "DIGEST_MISMATCH"])
  assert.equal(result?.sourceKind, "EXECUTION_RECEIPT")
  assert.equal(result?.sourceIdentity, mismatched.sourceIdentity)
})

test("orphan descriptors, out-of-scope targets, duplicate descriptor ids, and identity tampering fail structurally", () => {
  const proofPackage = createK5R1ProofPackage(packageInput())
  const orphan = createK5R2SourceLink({ evidenceId: "missing", sourceKind: "VERIFICATION_REPORT", canonicalBase: base, candidateHead: head, sourceRef: "verification:v1", sourceDigest: digestA, metadata: { protocol: "kodac.verification", reportVersion: 1, sessionId: "orphan", passed: true, checkIds: [] } })
  assert.throws(() => linkK5R2Evidence(proofPackage, [orphan]), TypeError)
  const outOfScope = createK5R2SourceLink({ evidenceId: "e-artifact", sourceKind: "VERIFICATION_REPORT", canonicalBase: base, candidateHead: head, sourceRef: "artifact:other", sourceDigest: digestD, metadata: { protocol: "kodac.verification", reportVersion: 1, sessionId: "s", passed: true, checkIds: [] } })
  assert.throws(() => linkK5R2Evidence(proofPackage, [outOfScope]), TypeError)
  const source = verificationSource()
  assert.throws(() => linkK5R2Evidence(proofPackage, [source, source]), TypeError)
  assert.throws(() => validateK5R2SourceLink({ ...source, sourceIdentity: "0".repeat(64) }), TypeError)
})

test("verification checkIds are a canonical duplicate-free set for source identity", () => {
  const first = verificationSource({ metadata: { protocol: "kodac.verification", reportVersion: 1, sessionId: "session-1", passed: true, checkIds: ["β", "a", "é"] } })
  const second = verificationSource({ metadata: { protocol: "kodac.verification", reportVersion: 1, sessionId: "session-1", passed: true, checkIds: ["é", "β", "a"] } })
  assert.equal(first.sourceIdentity, second.sourceIdentity)
  assert.deepEqual((first.metadata as { checkIds: readonly string[] }).checkIds, ["a", "é", "β"])
  assert.throws(() => verificationSource({ metadata: { protocol: "kodac.verification", reportVersion: 1, sessionId: "session-1", passed: true, checkIds: ["dup", "dup"] } }), TypeError)
})

test("identity-bearing source and linkage mutations change identities and tampering is rejected", () => {
  const source = verificationSource()
  assert.notEqual(source.sourceIdentity, verificationSource({ sourceRef: "verification:v2" }).sourceIdentity)
  const linkage = linkK5R2Evidence(createK5R1ProofPackage(packageInput()), [source])
  assert.equal(validateK5R2EvidenceLinkage(linkage).linkageIdentity, linkage.linkageIdentity)
  assert.throws(() => validateK5R2EvidenceLinkage({ ...linkage, linkageIdentity: "0".repeat(64) }), TypeError)
  const tampered = clone(linkage) as unknown as { links: Array<{ status: string }> } & Record<string, unknown>
  tampered.links[0].status = "LINKED"
  assert.throws(() => validateK5R2EvidenceLinkage(tampered), TypeError)
})

test("root package validation happens before source inspection", () => {
  let sourceTraps = 0
  const invalidPackage = new Proxy({} as object, { ownKeys() { throw new Error("package trap") }, getOwnPropertyDescriptor() { throw new Error("package trap") }, getPrototypeOf() { throw new Error("package trap") } })
  const sources = new Proxy([] as unknown[], { ownKeys() { sourceTraps += 1; throw new Error("source trap") }, getOwnPropertyDescriptor() { sourceTraps += 1; throw new Error("source trap") }, getPrototypeOf() { sourceTraps += 1; throw new Error("source trap") } })
  assert.throws(() => linkK5R2Evidence(invalidPackage, sources), /Proxy/)
  assert.equal(sourceTraps, 0)
})

test("root and nested source proxies are rejected before traps execute", () => {
  let traps = 0
  const proxy = new Proxy(verificationSource() as object, { ownKeys() { traps += 1; throw new Error("trap") }, getOwnPropertyDescriptor() { traps += 1; throw new Error("trap") }, getPrototypeOf() { traps += 1; throw new Error("trap") } })
  assert.throws(() => validateK5R2SourceLink(proxy), /Proxy/)
  assert.equal(traps, 0)
  const nested = new Proxy(["agent.completed"], { ownKeys() { traps += 1; throw new Error("trap") }, getOwnPropertyDescriptor() { traps += 1; throw new Error("trap") }, getPrototypeOf() { traps += 1; throw new Error("trap") } })
  assert.throws(() => createK5R2SourceLink({ evidenceId: "e-verify", sourceKind: "VERIFICATION_REPORT", canonicalBase: base, candidateHead: head, sourceRef: "verification:v1", sourceDigest: digestA, metadata: { protocol: "kodac.verification", reportVersion: 1, sessionId: "s", passed: true, checkIds: nested } }), /Proxy/)
  assert.equal(traps, 0)
})

test("accessors, symbols, sparse arrays, custom prototypes, invalid Unicode, and unsafe numbers fail closed", () => {
  const accessor = { ...verificationSource() } as unknown as Record<string, unknown>
  Object.defineProperty(accessor, "sourceRef", { enumerable: true, get() { throw new Error("getter") } })
  assert.throws(() => validateK5R2SourceLink(accessor), /data property/)
  assert.throws(() => validateK5R2SourceLink({ ...verificationSource(), [Symbol("x")]: true }), /symbol/)
  const sparse = new Array(1)
  const sparseSource = clone(verificationSource()) as unknown as Record<string, unknown>
  ;(sparseSource.metadata as Record<string, unknown>).checkIds = sparse
  assert.throws(() => validateK5R2SourceLink(sparseSource), /dense/)
  const custom = Object.create({ inherited: true }) as Record<string, unknown>
  Object.assign(custom, verificationSource())
  assert.throws(() => validateK5R2SourceLink(custom), /plain object/)
  assert.throws(() => verificationSource({ metadata: { protocol: "kodac.verification", reportVersion: 1, sessionId: "bad" + String.fromCharCode(0xd800), passed: true, checkIds: [] } }), /Unicode/)
  assert.throws(() => createK5R2SourceLink({ evidenceId: "e-repo", sourceKind: "REPOSITORY_REVISION", canonicalBase: base, candidateHead: head, sourceRef: "snapshot:s1", sourceDigest: digestC, metadata: { snapshotVersion: "k3-r2-snapshot-v1", repositoryIdentity: "2".repeat(64), contentIdentity: "3".repeat(64), snapshotIdentity: "4".repeat(64), observedGitHead: head, freshness: "current", completeness: "complete", omittedAtLeast: Number.MAX_SAFE_INTEGER + 1 } }), /safe integer/)
})

test("returned source and linkage records are deeply immutable copies", () => {
  const checkIds = ["b", "a"]
  const source = verificationSource({ metadata: { protocol: "kodac.verification", reportVersion: 1, sessionId: "session-1", passed: true, checkIds } })
  checkIds.push("later")
  assert.deepEqual((source.metadata as { checkIds: readonly string[] }).checkIds, ["a", "b"])
  assert.equal(Object.isFrozen(source), true)
  assert.equal(Object.isFrozen(source.metadata), true)
  assert.equal(Object.isFrozen((source.metadata as { checkIds: readonly string[] }).checkIds), true)
  const linkage = linkK5R2Evidence(createK5R1ProofPackage(packageInput()), [source])
  for (const value of [linkage, linkage.revision, linkage.links, linkage.links[0], linkage.links[0].codes, linkage.outOfScopeEvidenceIds, linkage.sourceIdentities]) assert.equal(Object.isFrozen(value), true)
})

test("closed versions, vocabularies, nullability, and exact key sets fail closed", () => {
  const source = clone(verificationSource()) as unknown as Record<string, unknown>
  source.version = "kodac-k5-r2-source-link-v2"
  assert.throws(() => validateK5R2SourceLink(source), TypeError)
  assert.equal(K5_R2_SOURCE_LINK_VERSION, "kodac-k5-r2-source-link-v1")
  const linkage = clone(linkK5R2Evidence(createK5R1ProofPackage(packageInput()), [])) as unknown as Record<string, unknown>
  linkage.version = "kodac-k5-r2-evidence-linkage-v2"
  assert.throws(() => validateK5R2EvidenceLinkage(linkage), TypeError)
  const valid = clone(linkK5R2Evidence(createK5R1ProofPackage(packageInput()), [verificationSource()]))
  ;(valid.links[0] as unknown as Record<string, unknown>).status = "PROVEN_READY"
  assert.throws(() => validateK5R2EvidenceLinkage(valid), TypeError)
})
