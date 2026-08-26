import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

import {
  createK5R1ProofPackage,
  createK5R2SourceLink,
  createK5R3ReviewAdjudicationSource,
  judgeK5R1ProofPackage,
  linkK5R2Evidence,
  linkK5R3ReviewAdjudicationEvidence,
  reconcileK5R4ProofState,
  validateK5R1ProofPackage,
  validateK5R2EvidenceLinkage,
  validateK5R3ReviewAdjudicationLinkage,
  validateK5R4ProofStateReconciliation,
  type K5R1EvidenceStatus,
  type K5R1ProofPackageInput,
  type K5R2SourceLinkInput,
  type K5R3ReviewAdjudicationSourceInput,
} from "../src/index.ts"

type Rec = Record<string, unknown>

interface Fixture {
  readonly version: string
  readonly positive: {
    readonly packageInput: K5R1ProofPackageInput
    readonly r2Sources: readonly K5R2SourceLinkInput[]
    readonly r3Source: K5R3ReviewAdjudicationSourceInput
    readonly expected: {
      readonly packageIdentity: string
      readonly judgment: {
        readonly status: string
        readonly judgmentIdentity: string
        readonly requirementResults: readonly unknown[]
        readonly evidenceIds: readonly string[]
      }
      readonly r2: {
        readonly sourceIdentities: readonly string[]
        readonly linkageIdentity: string
        readonly links: readonly unknown[]
        readonly outOfScopeEvidenceIds: readonly string[]
      }
      readonly r3: {
        readonly sourceIdentities: readonly string[]
        readonly linkageIdentity: string
        readonly links: readonly unknown[]
        readonly outOfScopeEvidenceIds: readonly string[]
      }
      readonly r4: {
        readonly status: string
        readonly results: readonly unknown[]
        readonly outOfScopeEvidenceIds: readonly string[]
        readonly reconciliationIdentity: string
      }
    }
  }
  readonly negativeCases: readonly {
    readonly name: string
    readonly contract: string
    readonly linkage?: unknown
  }[]
}

const fixtureUrl = new URL("./fixtures/k5-r5/integrated-proof-review-qualification.json", import.meta.url)
const fixture = JSON.parse(readFileSync(fixtureUrl, "utf8")) as Fixture
const base = "0".repeat(40)
const head = "1".repeat(40)
const otherBase = "2".repeat(40)
const otherHead = "3".repeat(40)

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function record(value: unknown): Rec {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new TypeError("test fixture value must be an object")
  return value as Rec
}

function negativeCase(name: string): Fixture["negativeCases"][number] {
  const result = fixture.negativeCases.find((item) => item.name === name)
  if (result === undefined) throw new TypeError(`missing negative fixture: ${name}`)
  return result
}

function mutateEvidenceStatus(
  input: K5R1ProofPackageInput,
  evidenceId: string,
  status: K5R1EvidenceStatus,
): K5R1ProofPackageInput {
  const result = clone(input)
  const evidence = result.evidence.find((item) => item.evidenceId === evidenceId)
  if (evidence === undefined) throw new TypeError(`missing fixture evidence: ${evidenceId}`)
  record(evidence).status = status
  return result
}

function buildStack(
  packageInput = clone(fixture.positive.packageInput),
  r2SourceInputs = clone(fixture.positive.r2Sources),
  r3SourceInput = clone(fixture.positive.r3Source),
) {
  const proofPackage = createK5R1ProofPackage(packageInput)
  const judgment = judgeK5R1ProofPackage(proofPackage)
  const r2Sources = r2SourceInputs.map((input) => createK5R2SourceLink(input))
  const r2 = linkK5R2Evidence(proofPackage, r2Sources)
  const r3Source = createK5R3ReviewAdjudicationSource(r3SourceInput)
  const r3 = linkK5R3ReviewAdjudicationEvidence(proofPackage, [r3Source])
  const reconciliation = reconcileK5R4ProofState(proofPackage, r2, r3)
  return { proofPackage, judgment, r2Sources, r2, r3Source, r3, reconciliation }
}

function r3Variant(kind: "revision" | "ref" | "digest"): K5R3ReviewAdjudicationSourceInput {
  const source = clone(fixture.positive.r3Source)
  const sourceRecord = record(source)
  const finding = record(sourceRecord.finding)
  const review = record(finding.review)
  const adjudication = record(sourceRecord.adjudication)

  if (kind === "revision") {
    sourceRecord.canonicalBase = otherBase
    sourceRecord.candidateHead = otherHead
    review.canonicalBase = otherBase
    review.reviewedHead = otherHead
    finding.evaluatedHead = otherHead
    finding.findingIdentity = "965a1878715ba457f18f37188d336d53672a375bfc23fce560cbb852045f3655"
    adjudication.findingIdentity = finding.findingIdentity
    adjudication.adjudicationIdentity = "b4baab77159dfaffeaaac3d2dbe583288e7ff5aae7c70abac29898143439f91c"
    sourceRecord.sourceDigest = adjudication.adjudicationIdentity
  } else if (kind === "ref") {
    sourceRecord.sourceRef = "review:wrong"
  } else {
    adjudication.action = "REJECT"
    adjudication.resultingState = "REJECTED"
    adjudication.adjudicationIdentity = "8807bce9b2e81ae63d0f38db21ef6921861ef176aeb44c09683c65aadd8587af"
    sourceRecord.sourceDigest = adjudication.adjudicationIdentity
  }

  return source
}

function positiveR2For(proofPackage: ReturnType<typeof createK5R1ProofPackage>) {
  const sources = fixture.positive.r2Sources.map((input) => createK5R2SourceLink(clone(input)))
  return linkK5R2Evidence(proofPackage, sources)
}

function positiveR3For(proofPackage: ReturnType<typeof createK5R1ProofPackage>) {
  const source = createK5R3ReviewAdjudicationSource(clone(fixture.positive.r3Source))
  return linkK5R3ReviewAdjudicationEvidence(proofPackage, [source])
}

test("canonical fixture declares the exact bounded negative qualification corpus", () => {
  assert.equal(fixture.version, "kodac-k5-r5-integrated-proof-review-qualification-fixture-v1")
  const names = fixture.negativeCases.map((item) => item.name)
  assert.equal(new Set(names).size, names.length)
  assert.deepEqual(names, [
    "malformed-r1-before-linkage",
    "foreign-r2-package-identity",
    "foreign-r3-package-identity",
    "r2-revision-mismatch",
    "r3-revision-mismatch",
    "r2-missing-membership",
    "r2-duplicate-membership",
    "r2-orphaned-membership",
    "r2-wrong-complement",
    "r3-missing-membership",
    "r3-duplicate-membership",
    "r3-orphaned-membership",
    "r3-wrong-complement",
    "r2-fixed-cause-vocabulary",
    "r3-fixed-cause-vocabulary",
    "aggregate-precedence",
    "not-applicable",
    "out-of-scope-non-influence",
    "identity-tampering",
    "immutability",
  ])
  assert.equal(fixture.negativeCases.every((item) => item.contract.length > 0), true)
})

test("positive fixture composes canonical R1 through R4 with exact deterministic identities", () => {
  const packageInput = clone(fixture.positive.packageInput)
  const r2Inputs = clone(fixture.positive.r2Sources)
  const r3Input = clone(fixture.positive.r3Source)
  const before = clone({ packageInput, r2Inputs, r3Input })
  const stack = buildStack(packageInput, r2Inputs, r3Input)
  const expected = fixture.positive.expected

  assert.deepEqual({ packageInput, r2Inputs, r3Input }, before)
  assert.equal(stack.proofPackage.packageIdentity, expected.packageIdentity)
  assert.equal(stack.judgment.status, expected.judgment.status)
  assert.equal(stack.judgment.judgmentIdentity, expected.judgment.judgmentIdentity)
  assert.deepEqual(stack.judgment.requirementResults, expected.judgment.requirementResults)
  assert.deepEqual(stack.judgment.evidenceIds, expected.judgment.evidenceIds)

  assert.deepEqual(stack.r2Sources.map((source) => source.sourceIdentity), expected.r2.sourceIdentities)
  assert.equal(stack.r2.linkageIdentity, expected.r2.linkageIdentity)
  assert.deepEqual(stack.r2.links, expected.r2.links)
  assert.deepEqual(stack.r2.outOfScopeEvidenceIds, expected.r2.outOfScopeEvidenceIds)

  assert.deepEqual([stack.r3Source.sourceIdentity], expected.r3.sourceIdentities)
  assert.equal(stack.r3.linkageIdentity, expected.r3.linkageIdentity)
  assert.deepEqual(stack.r3.links, expected.r3.links)
  assert.deepEqual(stack.r3.outOfScopeEvidenceIds, expected.r3.outOfScopeEvidenceIds)

  assert.equal(stack.reconciliation.status, expected.r4.status)
  assert.deepEqual(stack.reconciliation.results, expected.r4.results)
  assert.deepEqual(stack.reconciliation.outOfScopeEvidenceIds, expected.r4.outOfScopeEvidenceIds)
  assert.equal(stack.reconciliation.reconciliationIdentity, expected.r4.reconciliationIdentity)
  assert.equal(JSON.stringify(stack).includes("PROVEN_READY"), false)
})

test("allowed set-order variation is byte-stable across the integrated stack", () => {
  const baseline = buildStack()
  const packageInput = clone(fixture.positive.packageInput)
  ;(packageInput.requirements as unknown as unknown[]).reverse()
  ;(packageInput.evidence as unknown as unknown[]).reverse()

  const r2Inputs = clone(fixture.positive.r2Sources)
  const r2Metadata = record(record(r2Inputs[0]).metadata)
  ;(r2Metadata.checkIds as unknown[]).reverse()

  const r3Input = clone(fixture.positive.r3Source)
  const finding = record(record(r3Input).finding)
  const adjudication = record(record(r3Input).adjudication)
  ;(finding.evidenceRefs as unknown[]).reverse()
  ;(adjudication.evidenceRefs as unknown[]).reverse()

  const reordered = buildStack(packageInput, r2Inputs, r3Input)
  assert.deepEqual(reordered.proofPackage, baseline.proofPackage)
  assert.deepEqual(reordered.judgment, baseline.judgment)
  assert.deepEqual(reordered.r2, baseline.r2)
  assert.deepEqual(reordered.r3, baseline.r3)
  assert.deepEqual(reordered.reconciliation, baseline.reconciliation)
})

test("all reachable R4 aggregate states and fixed R1 causes remain exact", () => {
  const cases: ReadonlyArray<readonly [K5R1EvidenceStatus, string, readonly string[]]> = [
    ["SATISFIED", "VALID", []],
    ["FAILED", "INCOMPLETE", ["R1_EXPLICIT_FAILED"]],
    ["CONTRADICTORY", "CONTRADICTORY", ["R1_EXPLICIT_CONTRADICTORY"]],
    ["STALE", "STALE", ["R1_EXPLICIT_STALE"]],
    ["INVALID", "INVALID", ["R1_EXPLICIT_INVALID"]],
  ]
  for (const [status, expectedState, expectedCauses] of cases) {
    const input = mutateEvidenceStatus(fixture.positive.packageInput, "e-verify", status)
    const result = buildStack(input).reconciliation
    const item = result.results.find((candidate) => candidate.evidenceId === "e-verify")
    assert.equal(item?.state, expectedState)
    assert.deepEqual(item?.causes, expectedCauses)
    assert.equal(result.status, expectedState)
  }

  const naInput = clone(fixture.positive.packageInput)
  const mutable = naInput as unknown as { requirements: Array<{ requirementId: string }>; evidence: Array<{ evidenceId: string }> }
  mutable.requirements = mutable.requirements.filter((item) => item.requirementId === "artifact" || item.requirementId === "custom")
  mutable.evidence = mutable.evidence.filter((item) => item.evidenceId === "e-artifact" || item.evidenceId === "e-custom")
  const proofPackage = createK5R1ProofPackage(naInput)
  const r2 = linkK5R2Evidence(proofPackage, [])
  const r3 = linkK5R3ReviewAdjudicationEvidence(proofPackage, [])
  const result = reconcileK5R4ProofState(proofPackage, r2, r3)
  assert.equal(result.status, "NOT_APPLICABLE")
  assert.deepEqual(result.results, [])
  assert.deepEqual(result.outOfScopeEvidenceIds, ["e-artifact", "e-custom"])
})

test("aggregate precedence remains INVALID > STALE > CONTRADICTORY > INCOMPLETE > VALID", () => {
  const pairs: ReadonlyArray<readonly [K5R1EvidenceStatus, K5R1EvidenceStatus, string]> = [
    ["SATISFIED", "FAILED", "INCOMPLETE"],
    ["FAILED", "CONTRADICTORY", "CONTRADICTORY"],
    ["CONTRADICTORY", "STALE", "STALE"],
    ["STALE", "INVALID", "INVALID"],
  ]
  for (const [verifyStatus, reviewStatus, expected] of pairs) {
    let input = mutateEvidenceStatus(fixture.positive.packageInput, "e-verify", verifyStatus)
    input = mutateEvidenceStatus(input, "e-review", reviewStatus)
    assert.equal(buildStack(input).reconciliation.status, expected)
  }
})

test("R2 link defects map only to the fixed canonical R4 causes", () => {
  const proofPackage = createK5R1ProofPackage(clone(fixture.positive.packageInput))
  const r3 = positiveR3For(proofPackage)
  const positive = clone(fixture.positive.r2Sources[0])
  const wrongKind: K5R2SourceLinkInput = {
    evidenceId: "e-verify",
    sourceKind: "EXECUTION_RECEIPT",
    canonicalBase: base,
    candidateHead: head,
    sourceRef: "verification:v1",
    sourceDigest: "a".repeat(64),
    metadata: {
      receiptId: "r5-wrong-kind",
      capability: "repo.read",
      inputDigest: "f".repeat(64),
      policyDecision: "deny",
      resultStatus: "blocked",
    },
  }
  const revision = clone(positive)
  record(revision).canonicalBase = otherBase
  record(revision).candidateHead = otherHead
  const ref = clone(positive)
  record(ref).sourceRef = "verification:wrong"
  const digest = clone(positive)
  record(digest).sourceDigest = "9".repeat(64)

  const cases: ReadonlyArray<readonly [readonly K5R2SourceLinkInput[], string, string]> = [
    [[], "R2_NO_SOURCE", "INCOMPLETE"],
    [[wrongKind], "R2_KIND_MISMATCH", "INVALID"],
    [[revision], "R2_REVISION_MISMATCH", "STALE"],
    [[ref], "R2_REF_MISMATCH", "INVALID"],
    [[digest], "R2_DIGEST_MISMATCH", "INVALID"],
  ]

  for (const [sourceInputs, expectedCause, expectedState] of cases) {
    const sources = sourceInputs.map((input) => createK5R2SourceLink(input))
    const r2 = linkK5R2Evidence(proofPackage, sources)
    const result = reconcileK5R4ProofState(proofPackage, r2, r3)
    const item = result.results.find((candidate) => candidate.evidenceId === "e-verify")
    assert.deepEqual(item?.causes, [expectedCause])
    assert.equal(item?.state, expectedState)
  }
})

test("R3 link defects map only to the fixed canonical R4 causes", () => {
  const noSourceProof = createK5R1ProofPackage(clone(fixture.positive.packageInput))
  const noSource = reconcileK5R4ProofState(
    noSourceProof,
    positiveR2For(noSourceProof),
    linkK5R3ReviewAdjudicationEvidence(noSourceProof, []),
  )
  assert.deepEqual(noSource.results.find((item) => item.evidenceId === "e-review")?.causes, ["R3_NO_SOURCE"])

  const revisionInput = clone(fixture.positive.packageInput)
  const reviewEvidence = revisionInput.evidence.find((item) => item.evidenceId === "e-review")
  if (reviewEvidence === undefined) throw new TypeError("missing review evidence")
  record(reviewEvidence).digest = "b4baab77159dfaffeaaac3d2dbe583288e7ff5aae7c70abac29898143439f91c"
  const revisionProof = createK5R1ProofPackage(revisionInput)
  const revisionR3 = linkK5R3ReviewAdjudicationEvidence(
    revisionProof,
    [createK5R3ReviewAdjudicationSource(r3Variant("revision"))],
  )
  const revisionResult = reconcileK5R4ProofState(revisionProof, positiveR2For(revisionProof), revisionR3)
  assert.deepEqual(revisionResult.results.find((item) => item.evidenceId === "e-review")?.causes, ["R3_REVISION_MISMATCH"])
  assert.equal(revisionResult.results.find((item) => item.evidenceId === "e-review")?.state, "STALE")

  const positiveProof = createK5R1ProofPackage(clone(fixture.positive.packageInput))
  for (const [variant, expectedCause] of [["ref", "R3_REF_MISMATCH"], ["digest", "R3_DIGEST_MISMATCH"]] as const) {
    const r3 = linkK5R3ReviewAdjudicationEvidence(
      positiveProof,
      [createK5R3ReviewAdjudicationSource(r3Variant(variant))],
    )
    const result = reconcileK5R4ProofState(positiveProof, positiveR2For(positiveProof), r3)
    const item = result.results.find((candidate) => candidate.evidenceId === "e-review")
    assert.deepEqual(item?.causes, [expectedCause])
    assert.equal(item?.state, "INVALID")
  }
})

test("ARTIFACT and CUSTOM remain explicit out-of-scope evidence with zero aggregate influence", () => {
  let input = mutateEvidenceStatus(fixture.positive.packageInput, "e-artifact", "INVALID")
  input = mutateEvidenceStatus(input, "e-custom", "CONTRADICTORY")
  const result = buildStack(input).reconciliation
  assert.equal(result.status, "VALID")
  assert.deepEqual(result.outOfScopeEvidenceIds, ["e-artifact", "e-custom"])
  assert.equal(result.results.some((item) => item.evidenceId === "e-artifact" || item.evidenceId === "e-custom"), false)
})

test("malformed R1 package fails before R2 or R3 linkage traversal", () => {
  const stack = buildStack()
  const invalidPackage = { ...stack.proofPackage, packageIdentity: "0".repeat(64) }
  let linkageTraps = 0
  const hostileLinkage = new Proxy({}, {
    ownKeys() { linkageTraps += 1; throw new Error("linkage trap") },
    getOwnPropertyDescriptor() { linkageTraps += 1; throw new Error("linkage trap") },
    getPrototypeOf() { linkageTraps += 1; throw new Error("linkage trap") },
  })
  assert.throws(
    () => reconcileK5R4ProofState(invalidPackage, hostileLinkage, hostileLinkage),
    /packageIdentity/,
  )
  assert.equal(linkageTraps, 0)
})

test("foreign package identities and structurally valid outer revision mismatches fail closed", () => {
  const stack = buildStack()
  const foreignInput = clone(fixture.positive.packageInput)
  record(foreignInput.subject).subjectId = "k5-r5-foreign"
  const foreignProof = createK5R1ProofPackage(foreignInput)
  const foreignR2 = positiveR2For(foreignProof)
  const foreignR3 = positiveR3For(foreignProof)

  assert.throws(
    () => reconcileK5R4ProofState(stack.proofPackage, foreignR2, stack.r3),
    /K5-R2 linkage packageIdentity/,
  )
  assert.throws(
    () => reconcileK5R4ProofState(stack.proofPackage, stack.r2, foreignR3),
    /K5-R3 linkage packageIdentity/,
  )

  const r2RevisionVector = negativeCase("r2-revision-mismatch").linkage
  if (r2RevisionVector === undefined) throw new TypeError("missing R2 revision mismatch linkage vector")
  const r2Revision = validateK5R2EvidenceLinkage(r2RevisionVector)
  assert.equal(r2Revision.packageIdentity, stack.proofPackage.packageIdentity)
  assert.notDeepEqual(r2Revision.revision, stack.proofPackage.revision)
  assert.throws(
    () => reconcileK5R4ProofState(stack.proofPackage, r2Revision, stack.r3),
    /K5-R2 linkage revision does not equal the K5-R1 package revision/,
  )

  const r3RevisionVector = negativeCase("r3-revision-mismatch").linkage
  if (r3RevisionVector === undefined) throw new TypeError("missing R3 revision mismatch linkage vector")
  const r3Revision = validateK5R3ReviewAdjudicationLinkage(r3RevisionVector)
  assert.equal(r3Revision.packageIdentity, stack.proofPackage.packageIdentity)
  assert.notDeepEqual(r3Revision.revision, stack.proofPackage.revision)
  assert.throws(
    () => reconcileK5R4ProofState(stack.proofPackage, stack.r2, r3Revision),
    /K5-R3 linkage revision does not equal the K5-R1 package revision/,
  )
})

test("R2 and R3 membership/complement tampering is rejected without reimplementing identities", () => {
  const stack = buildStack()

  const r2Missing = clone(stack.r2)
  ;(record(r2Missing).links as unknown[]).pop()
  assert.throws(() => validateK5R2EvidenceLinkage(r2Missing), /linkageIdentity/)

  const r2Duplicate = clone(stack.r2)
  const r2DuplicateLinks = record(r2Duplicate).links as unknown[]
  r2DuplicateLinks.push(clone(r2DuplicateLinks[0]))
  assert.throws(() => validateK5R2EvidenceLinkage(r2Duplicate), /duplicate evidenceId/)

  const r2Orphan = clone(stack.r2)
  record((record(r2Orphan).links as unknown[])[0]).evidenceId = "e-orphan"
  assert.throws(() => validateK5R2EvidenceLinkage(r2Orphan), /linkageIdentity/)

  const r2Complement = clone(stack.r2)
  ;(record(r2Complement).outOfScopeEvidenceIds as unknown[]).pop()
  assert.throws(() => validateK5R2EvidenceLinkage(r2Complement), /linkageIdentity/)

  const r3Missing = clone(stack.r3)
  ;(record(r3Missing).links as unknown[]).pop()
  assert.throws(() => validateK5R3ReviewAdjudicationLinkage(r3Missing), /sourceIdentities/)

  const r3Duplicate = clone(stack.r3)
  const r3DuplicateLinks = record(r3Duplicate).links as unknown[]
  r3DuplicateLinks.push(clone(r3DuplicateLinks[0]))
  assert.throws(() => validateK5R3ReviewAdjudicationLinkage(r3Duplicate), /duplicate evidenceId/)

  const r3Orphan = clone(stack.r3)
  record((record(r3Orphan).links as unknown[])[0]).evidenceId = "e-orphan"
  assert.throws(() => validateK5R3ReviewAdjudicationLinkage(r3Orphan), /linkageIdentity/)

  const r3Complement = clone(stack.r3)
  ;(record(r3Complement).outOfScopeEvidenceIds as unknown[]).pop()
  assert.throws(() => validateK5R3ReviewAdjudicationLinkage(r3Complement), /linkageIdentity/)
})

test("package, linkage, and reconciliation identity tampering is rejected by canonical validators", () => {
  const stack = buildStack()

  const proofPackage = clone(stack.proofPackage)
  record(proofPackage).packageIdentity = "0".repeat(64)
  assert.throws(() => validateK5R1ProofPackage(proofPackage), /packageIdentity/)

  const r2 = clone(stack.r2)
  record(r2).linkageIdentity = "0".repeat(64)
  assert.throws(() => validateK5R2EvidenceLinkage(r2), /linkageIdentity/)

  const r3 = clone(stack.r3)
  record(r3).linkageIdentity = "0".repeat(64)
  assert.throws(() => validateK5R3ReviewAdjudicationLinkage(r3), /linkageIdentity/)

  const reconciliation = clone(stack.reconciliation)
  record(reconciliation).reconciliationIdentity = "0".repeat(64)
  assert.throws(() => validateK5R4ProofStateReconciliation(reconciliation), /reconciliationIdentity/)
})

test("canonical outputs are deeply immutable and caller-alias independent", () => {
  const input = clone(fixture.positive.packageInput)
  const before = clone(input)
  const stack = buildStack(input)
  assert.deepEqual(input, before)

  assert.equal(Object.isFrozen(stack.proofPackage), true)
  assert.equal(Object.isFrozen(stack.proofPackage.evidence), true)
  assert.equal(Object.isFrozen(stack.judgment), true)
  assert.equal(Object.isFrozen(stack.r2), true)
  assert.equal(Object.isFrozen(stack.r2.links), true)
  assert.equal(Object.isFrozen(stack.r3), true)
  assert.equal(Object.isFrozen(stack.r3.links), true)
  assert.equal(Object.isFrozen(stack.reconciliation), true)
  assert.equal(Object.isFrozen(stack.reconciliation.results), true)
  assert.equal(Object.isFrozen(stack.reconciliation.results[0]?.causes), true)

  assert.throws(() => (stack.reconciliation.results as unknown as unknown[]).push({}), TypeError)
  assert.throws(() => { record(stack.reconciliation.revision).candidateHead = otherHead }, TypeError)

  record((input.evidence as unknown as unknown[])[0]).status = "INVALID"
  assert.equal(stack.proofPackage.evidence.find((item) => item.evidenceId === "e-artifact")?.status, "SATISFIED")
  assert.equal(stack.reconciliation.status, "VALID")
})