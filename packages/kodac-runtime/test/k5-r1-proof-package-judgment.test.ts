import assert from "node:assert/strict"
import test from "node:test"

import {
  K5_R1_PROOF_JUDGMENT_VERSION,
  K5_R1_PROOF_PACKAGE_VERSION,
  createK5R1ProofPackage,
  k5R1EvidenceFingerprint,
  validateK5R1ProofJudgment,
  validateK5R1ProofPackage,
  type K5R1EvidenceRecord,
  type K5R1ProofPackageInput,
} from "../src/proof-review/contracts.ts"
import { judgeK5R1ProofPackage } from "../src/proof-review/judge.ts"

const base = "0".repeat(40)
const head = "1".repeat(40)
const digest = "a".repeat(64)

function packageInput(overrides: Partial<K5R1ProofPackageInput> = {}): K5R1ProofPackageInput {
  return {
    subject: { subjectId: "task-1", subjectKind: "TASK" },
    revision: { repositoryId: "TheHalfMoon/Kodac", canonicalBase: base, candidateHead: head },
    requirements: [{ requirementId: "r1", kind: "VERIFICATION", minimumEvidence: 1 }],
    evidence: [{
      evidenceId: "e1",
      kind: "VERIFICATION",
      requirementIds: ["r1"],
      canonicalBase: base,
      candidateHead: head,
      ref: "artifact:test",
      digest,
      status: "SATISFIED",
    }],
    ...overrides,
  }
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

test("normative overlapping-status vector matches all exact identities and cumulative reasons", () => {
  const proofPackage = createK5R1ProofPackage({
    subject: { subjectId: "overlap", subjectKind: "VERIFICATION" },
    revision: { repositoryId: "kodac/test", canonicalBase: base, candidateHead: head },
    requirements: [{ requirementId: "r1", kind: "VERIFICATION", minimumEvidence: 1 }],
    evidence: [
      {
        evidenceId: "e1",
        kind: "VERIFICATION",
        requirementIds: ["r1"],
        canonicalBase: base,
        candidateHead: head,
        ref: "artifact:test",
        digest,
        status: "SATISFIED",
      },
      {
        evidenceId: "e2",
        kind: "VERIFICATION",
        requirementIds: ["r1"],
        canonicalBase: base,
        candidateHead: head,
        ref: "artifact:test",
        digest,
        status: "FAILED",
      },
    ],
  })
  assert.equal(k5R1EvidenceFingerprint(proofPackage.evidence[0]), "58a93fed3381f2982f3b0cb5d334afe3a157d81b816c119fb7958273848e1342")
  assert.equal(proofPackage.packageIdentity, "10bc549943799a92365f9c2b8394f84e8804068f7f19192ec32a8387ce0d24b5")
  const judgment = judgeK5R1ProofPackage(proofPackage)
  assert.equal(judgment.version, K5_R1_PROOF_JUDGMENT_VERSION)
  assert.equal(judgment.status, "CONTRADICTORY_PACKAGE")
  assert.deepEqual(judgment.requirementResults, [{
    requirementId: "r1",
    kind: "VERIFICATION",
    minimumEvidence: 1,
    satisfiedFingerprintCount: 1,
    status: "CONTRADICTORY",
  }])
  assert.deepEqual(judgment.reasons, [{
    requirementId: "r1",
    status: "CONTRADICTORY",
    codes: ["SATISFIED_FAILED_CONFLICT", "FINGERPRINT_STATUS_CONFLICT"],
    evidenceIds: ["e1", "e2"],
  }])
  assert.deepEqual(judgment.evidenceIds, ["e1", "e2"])
  assert.equal(judgment.judgmentIdentity, "20d9ad8a2aaf868823358ce9eb36b558daf1df8f03dd41c1acdc244618c07492")
})

test("zero evidence over a non-empty requirement is insufficient, never vacuously sufficient", () => {
  const proofPackage = createK5R1ProofPackage(packageInput({ evidence: [] }))
  const judgment = judgeK5R1ProofPackage(proofPackage)
  assert.equal(judgment.status, "INSUFFICIENT_PACKAGE")
  assert.deepEqual(judgment.reasons, [{
    requirementId: "r1",
    status: "INSUFFICIENT",
    codes: ["BELOW_MINIMUM"],
    evidenceIds: [],
  }])
})

test("duplicate fingerprints never manufacture threshold weight through caller-chosen evidence ids", () => {
  const first = packageInput().evidence[0]
  const proofPackage = createK5R1ProofPackage(packageInput({
    requirements: [{ requirementId: "r1", kind: "VERIFICATION", minimumEvidence: 2 }],
    evidence: [
      first,
      { ...first, evidenceId: "e2" },
      { ...first, evidenceId: "e3", requirementIds: ["r1"] },
    ],
  }))
  const judgment = judgeK5R1ProofPackage(proofPackage)
  assert.equal(judgment.status, "INSUFFICIENT_PACKAGE")
  assert.equal(judgment.requirementResults[0]?.satisfiedFingerprintCount, 1)
  assert.deepEqual(judgment.reasons[0]?.evidenceIds, ["e1", "e2", "e3"])
})

test("explicit INVALID and kind mismatch are semantic INVALID_PACKAGE causes with deterministic precedence", () => {
  const invalidRecord = { ...packageInput().evidence[0], status: "INVALID" as const }
  const kindMismatch = {
    ...packageInput().evidence[0],
    evidenceId: "e2",
    kind: "ARTIFACT" as const,
    status: "SATISFIED" as const,
  }
  const judgment = judgeK5R1ProofPackage(createK5R1ProofPackage(packageInput({
    evidence: [invalidRecord, kindMismatch],
  })))
  assert.equal(judgment.status, "INVALID_PACKAGE")
  assert.deepEqual(judgment.reasons[0]?.codes, ["EXPLICIT_INVALID", "KIND_MISMATCH"])
  assert.deepEqual(judgment.reasons[0]?.evidenceIds, ["e1", "e2"])
})

test("revision mismatch is STALE even when caller labels evidence SATISFIED", () => {
  const stale = { ...packageInput().evidence[0], candidateHead: "2".repeat(40), status: "SATISFIED" as const }
  const judgment = judgeK5R1ProofPackage(createK5R1ProofPackage(packageInput({ evidence: [stale] })))
  assert.equal(judgment.status, "STALE_PACKAGE")
  assert.deepEqual(judgment.reasons[0]?.codes, ["REVISION_MISMATCH"])
  assert.equal(judgment.requirementResults[0]?.satisfiedFingerprintCount, 0)
})

test("failed evidence cannot count toward minimumEvidence and reports both applicable insufficiency causes", () => {
  const failed = { ...packageInput().evidence[0], status: "FAILED" as const }
  const judgment = judgeK5R1ProofPackage(createK5R1ProofPackage(packageInput({ evidence: [failed] })))
  assert.equal(judgment.status, "INSUFFICIENT_PACKAGE")
  assert.deepEqual(judgment.reasons[0]?.codes, ["EXPLICIT_FAILED", "BELOW_MINIMUM"])
  assert.equal(judgment.requirementResults[0]?.satisfiedFingerprintCount, 0)
})

test("package precedence is the worst per-requirement status and never aliases Done Gate vocabulary", () => {
  const one = packageInput().evidence[0]
  const proofPackage = createK5R1ProofPackage(packageInput({
    requirements: [
      { requirementId: "r1", kind: "VERIFICATION", minimumEvidence: 1 },
      { requirementId: "r2", kind: "ARTIFACT", minimumEvidence: 1 },
    ],
    evidence: [
      one,
      {
        ...one,
        evidenceId: "e2",
        kind: "ARTIFACT",
        requirementIds: ["r2"],
        candidateHead: "2".repeat(40),
      },
    ],
  }))
  const judgment = judgeK5R1ProofPackage(proofPackage)
  assert.equal(judgment.status, "STALE_PACKAGE")
  assert.deepEqual(judgment.requirementResults.map((result) => result.status), ["SATISFIED", "STALE"])
  assert.equal(JSON.stringify(judgment).includes("PROVEN_READY"), false)
})

test("canonical set ordering makes equivalent package construction order-independent", () => {
  const e1 = packageInput().evidence[0]
  const e2 = {
    ...e1,
    evidenceId: "é",
    requirementIds: ["β", "r1"],
  }
  const requirements = [
    { requirementId: "β", kind: "VERIFICATION" as const, minimumEvidence: 1 },
    { requirementId: "r1", kind: "VERIFICATION" as const, minimumEvidence: 1 },
  ]
  const first = createK5R1ProofPackage(packageInput({
    requirements,
    evidence: [e2, e1],
  }))
  const second = createK5R1ProofPackage(packageInput({
    requirements: requirements.slice().reverse(),
    evidence: [{ ...e2, requirementIds: ["r1", "β"] }, e1].reverse(),
  }))
  assert.equal(first.packageIdentity, second.packageIdentity)
  assert.deepEqual(first.requirements.map((item) => item.requirementId), ["r1", "β"])
  assert.deepEqual(first.evidence.map((item) => item.evidenceId), ["e1", "é"])
  assert.deepEqual(first.evidence[1]?.requirementIds, ["r1", "β"])
})

test("fingerprints use JCS escaping and Unicode bytes without delimiter concatenation or normalization", () => {
  const evidence: K5R1EvidenceRecord = {
    evidenceId: "unicode",
    kind: "ARTIFACT",
    requirementIds: ["r1"],
    canonicalBase: "2".repeat(40),
    candidateHead: "3".repeat(40),
    ref: "x:\"\\|é💡",
    digest: "b".repeat(64),
    status: "SATISFIED",
  }
  assert.equal(k5R1EvidenceFingerprint(evidence), "13d087792ff89506b1f8f4cfd4b2e9a85c6edf30124ee1acfabf8c5a024094f8")
  assert.notEqual(
    k5R1EvidenceFingerprint({ ...evidence, ref: "x:\"\\|e\u0301💡" }),
    k5R1EvidenceFingerprint({ ...evidence, ref: "x:\"\\|é💡" }),
  )
})

test("malformed structure, duplicate sets, grammar errors, and identity tampering throw TypeError before judgment", () => {
  assert.throws(() => createK5R1ProofPackage(packageInput({ requirements: [] })), TypeError)
  assert.throws(() => createK5R1ProofPackage(packageInput({
    requirements: [
      { requirementId: "r1", kind: "VERIFICATION", minimumEvidence: 1 },
      { requirementId: "r1", kind: "VERIFICATION", minimumEvidence: 1 },
    ],
  })), TypeError)
  assert.throws(() => createK5R1ProofPackage(packageInput({
    evidence: [{ ...packageInput().evidence[0], requirementIds: ["r1", "r1"] }],
  })), TypeError)
  assert.throws(() => createK5R1ProofPackage(packageInput({
    revision: { repositoryId: "repo", canonicalBase: "A".repeat(40), candidateHead: head },
  })), TypeError)
  const valid = createK5R1ProofPackage(packageInput())
  assert.throws(() => validateK5R1ProofPackage({ ...valid, packageIdentity: "0".repeat(64) }), TypeError)
  assert.throws(() => judgeK5R1ProofPackage({ ...valid, unexpected: true }), TypeError)
})

test("root and nested proxies are rejected before traps execute", () => {
  let traps = 0
  const proxy = new Proxy(packageInput() as object, {
    get() { traps += 1; throw new Error("trap") },
    ownKeys() { traps += 1; throw new Error("trap") },
    getOwnPropertyDescriptor() { traps += 1; throw new Error("trap") },
    getPrototypeOf() { traps += 1; throw new Error("trap") },
  })
  assert.throws(() => createK5R1ProofPackage(proxy as K5R1ProofPackageInput), /Proxy/)
  assert.equal(traps, 0)

  const nestedArray = new Proxy(["r1"], {
    get() { traps += 1; throw new Error("trap") },
    ownKeys() { traps += 1; throw new Error("trap") },
    getOwnPropertyDescriptor() { traps += 1; throw new Error("trap") },
    getPrototypeOf() { traps += 1; throw new Error("trap") },
  })
  assert.throws(() => createK5R1ProofPackage(packageInput({
    evidence: [{ ...packageInput().evidence[0], requirementIds: nestedArray }],
  })), /Proxy/)
  assert.equal(traps, 0)
})

test("accessors, symbols, sparse arrays, unsupported values, unsafe numbers, and unpaired surrogates fail closed", () => {
  let getterCalls = 0
  const subject = { subjectId: "task-1", subjectKind: "TASK" } as Record<string, unknown>
  Object.defineProperty(subject, "subjectId", {
    enumerable: true,
    get() { getterCalls += 1; return "task-1" },
  })
  assert.throws(() => createK5R1ProofPackage(packageInput({ subject: subject as never })), /data property/)
  assert.equal(getterCalls, 0)

  const symbolSubject = { subjectId: "task-1", subjectKind: "TASK", [Symbol("x")]: true }
  assert.throws(() => createK5R1ProofPackage(packageInput({ subject: symbolSubject as never })), /symbol/)

  const sparse = new Array(2)
  sparse[0] = packageInput().evidence[0]
  assert.throws(() => createK5R1ProofPackage(packageInput({ evidence: sparse })), /dense/)

  assert.throws(() => createK5R1ProofPackage(packageInput({
    requirements: [{ requirementId: "r1", kind: "VERIFICATION", minimumEvidence: Number.MAX_SAFE_INTEGER + 1 }],
  })), /safe integer/)
  assert.throws(() => createK5R1ProofPackage(packageInput({
    subject: { subjectId: "\ud800", subjectKind: "TASK" },
  })), /Unicode scalar/)
  assert.throws(() => createK5R1ProofPackage({ ...packageInput(), evidence: undefined as never }), TypeError)
})

test("string bounds are UTF-8 byte bounds and NUL is rejected", () => {
  assert.doesNotThrow(() => createK5R1ProofPackage(packageInput({
    subject: { subjectId: "é".repeat(128), subjectKind: "TASK" },
  })))
  assert.throws(() => createK5R1ProofPackage(packageInput({
    subject: { subjectId: "é".repeat(129), subjectKind: "TASK" },
  })), /256 UTF-8 bytes/)
  assert.throws(() => createK5R1ProofPackage(packageInput({
    subject: { subjectId: "a\0b", subjectKind: "TASK" },
  })), /NUL-free/)
})

test("returned packages and judgments are immutable copies unaffected by later caller mutation", () => {
  const input = packageInput()
  const proofPackage = createK5R1ProofPackage(input)
  const judgment = judgeK5R1ProofPackage(proofPackage)
  ;(input.subject as unknown as { subjectId: string }).subjectId = "changed"
  ;(input.evidence as unknown as K5R1EvidenceRecord[])[0] = { ...input.evidence[0], evidenceId: "changed" }
  assert.equal(proofPackage.subject.subjectId, "task-1")
  assert.equal(proofPackage.evidence[0]?.evidenceId, "e1")
  assert.equal(Object.isFrozen(proofPackage), true)
  assert.equal(Object.isFrozen(proofPackage.evidence), true)
  assert.equal(Object.isFrozen(proofPackage.evidence[0]), true)
  assert.equal(Object.isFrozen(proofPackage.evidence[0]?.requirementIds), true)
  assert.equal(Object.isFrozen(judgment), true)
  assert.equal(Object.isFrozen(judgment.requirementResults), true)
  assert.equal(Object.isFrozen(judgment.reasons), true)
  assert.equal(Object.isFrozen(judgment.evidenceIds), true)
})

test("judgment validation rejects unknown vocabulary, noncanonical ordering, and identity mutation", () => {
  const judgment = judgeK5R1ProofPackage(createK5R1ProofPackage(packageInput()))
  assert.equal(validateK5R1ProofJudgment(clone(judgment)).judgmentIdentity, judgment.judgmentIdentity)
  assert.throws(() => validateK5R1ProofJudgment({ ...clone(judgment), status: "PROVEN_READY" }), TypeError)
  assert.throws(() => validateK5R1ProofJudgment({ ...clone(judgment), judgmentIdentity: "0".repeat(64) }), TypeError)

  const insufficient = judgeK5R1ProofPackage(createK5R1ProofPackage(packageInput({ evidence: [] })))
  const withUnknownCode = clone(insufficient) as any
  withUnknownCode.reasons[0].codes = ["UNKNOWN"]
  assert.throws(() => validateK5R1ProofJudgment(withUnknownCode), TypeError)
})


test("same-fingerprint status compatibility is equality-only with higher precedence suppressing contradiction reasons", () => {
  const statuses = ["SATISFIED", "FAILED", "STALE", "CONTRADICTORY", "INVALID"] as const
  for (const left of statuses) {
    for (const right of statuses) {
      const template = packageInput().evidence[0]
      const proofPackage = createK5R1ProofPackage(packageInput({
        evidence: [
          { ...template, evidenceId: "e1", status: left },
          { ...template, evidenceId: "e2", status: right },
        ],
      }))
      const judgment = judgeK5R1ProofPackage(proofPackage)
      const codes = judgment.reasons[0]?.codes ?? []
      if (left === right) {
        assert.equal(codes.includes("FINGERPRINT_STATUS_CONFLICT"), false, `${left}/${right}`)
      } else if (left === "INVALID" || right === "INVALID") {
        assert.equal(judgment.status, "INVALID_PACKAGE", `${left}/${right}`)
        assert.equal(codes.includes("FINGERPRINT_STATUS_CONFLICT"), false, `${left}/${right}`)
      } else if (left === "STALE" || right === "STALE") {
        assert.equal(judgment.status, "STALE_PACKAGE", `${left}/${right}`)
        assert.equal(codes.includes("FINGERPRINT_STATUS_CONFLICT"), false, `${left}/${right}`)
      } else {
        assert.equal(judgment.status, "CONTRADICTORY_PACKAGE", `${left}/${right}`)
        assert.equal(codes.includes("FINGERPRINT_STATUS_CONFLICT"), true, `${left}/${right}`)
      }
    }
  }
})

test("package and judgment versions are closed and exact", () => {
  const proofPackage = createK5R1ProofPackage(packageInput())
  assert.equal(proofPackage.version, K5_R1_PROOF_PACKAGE_VERSION)
  assert.throws(() => validateK5R1ProofPackage({ ...proofPackage, version: "v2" }), TypeError)
  const judgment = judgeK5R1ProofPackage(proofPackage)
  assert.equal(judgment.version, K5_R1_PROOF_JUDGMENT_VERSION)
  assert.throws(() => validateK5R1ProofJudgment({ ...judgment, version: "v2" }), TypeError)
})
