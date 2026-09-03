import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import test from "node:test"

import { sha256Canonical } from "../bench/p2-r1/contract.ts"
import {
  P2_R6_CANONICAL_ADMISSION_BINDING,
  P2_R6_CANONICAL_ADMISSION_BINDING_IDENTITY,
  P2_R6_DEVELOPMENT_COMMIT,
  P2_R6_REALITY_CHECK_COMMIT,
  deriveP2R6AdmissionRecords,
  deriveP2R6ProofIdentity,
  validateP2R6AdmissionRecords,
  validateP2R6GitAncestryProof,
  type P2R6AdmissionDeclaration,
  type P2R6GitAncestryProof,
} from "../bench/p2-r6/admission.ts"

const EXPECTED_PROOF_IDENTITY =
  "sha256:1ecaa5bd2d25a7d3a9a9d57c9d5fbbf3c27c04d20a15157635de638e618c42f4"
const EXPECTED_CASE_IDENTITIES = [
  "sha256:f92122ad1270519f6108f5be8d6912355cf7166e286387b898e1e49688c65177",
  "sha256:220bd3c4812c20aeca996c2a15285298eae98ca5f02b04de55b3dd47c1b31527",
] as const
const EXPECTED_ADMISSION_IDENTITIES = [
  "sha256:f616ea62354c7a1a1f6c8aa30a3cc204de9ecf0bd9d0ad33049894467c05acb0",
  "sha256:7736ade45d208d156f32e2ae8a55244dd9722e04ab5b6c560209ae5f7ea5e3ab",
] as const

function loadProof(): P2R6GitAncestryProof {
  return JSON.parse(
    readFileSync(new URL("./fixtures/p2-r6/git-ancestry-proof.json", import.meta.url), "utf8"),
  ) as P2R6GitAncestryProof
}

function declaration(): P2R6AdmissionDeclaration {
  return {
    schema_version: "p2-r6-admission-declaration/v1",
    benchmark_id: "kodacbench.repository-history",
    benchmark_protocol_version: "v1",
    development: {
      corpus_id: "kodac.history.development",
      case_id: "kodac.history.development.ad1a6648",
      task_family: "repository-history",
      contamination_status: "unknown",
      overlap_status: "unknown",
    },
    reality_check: {
      corpus_id: "kodac.history.reality-check",
      case_id: "kodac.history.reality-check.4598031b",
      task_family: "repository-history",
      contamination_status: "unknown",
      overlap_status: "unknown",
    },
  }
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function proofPreimage(proof: P2R6GitAncestryProof): Omit<P2R6GitAncestryProof, "proof_identity"> {
  const { proof_identity: _ignored, ...preimage } = proof
  return preimage
}

function rebindProof(proof: P2R6GitAncestryProof): P2R6GitAncestryProof {
  proof.proof_identity = deriveP2R6ProofIdentity(proofPreimage(proof))
  return proof
}

function rawSha256(bytes: Buffer): string {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`
}

function gitCommitSha1(bytes: Buffer): string {
  return createHash("sha1")
    .update(Buffer.from(`commit ${bytes.length}\0`, "ascii"))
    .update(bytes)
    .digest("hex")
}

function foreignCommit(): { sha: string; base64: string; parents: string[] } {
  const raw = Buffer.from(
    [
      `tree ${"1".repeat(40)}`,
      `parent ${"2".repeat(40)}`,
      "author Foreign <foreign@example.com> 1 +0000",
      "committer Foreign <foreign@example.com> 1 +0000",
      "",
      "foreign but structurally valid commit",
    ].join("\n"),
    "utf8",
  )
  return {
    sha: gitCommitSha1(raw),
    base64: raw.toString("base64"),
    parents: ["2".repeat(40)],
  }
}

test("canonical binding and fixture bytes recompute exact immutable identities", () => {
  assert.equal(
    sha256Canonical(P2_R6_CANONICAL_ADMISSION_BINDING),
    P2_R6_CANONICAL_ADMISSION_BINDING_IDENTITY,
  )
  assert.equal(Object.isFrozen(P2_R6_CANONICAL_ADMISSION_BINDING), true)
  assert.equal(Object.isFrozen(P2_R6_CANONICAL_ADMISSION_BINDING.admitted_git_commits), true)

  const proof = loadProof()
  const expectedRawDigests = [
    "sha256:f8420121f479d643dbd25eb3483ca2ec6c38d1de73a186e4640e7e3ebdf2d5d5",
    "sha256:0b1aa165dce9304564d0aa34040362d205688ccc0034a80ad40f36c8f55a8d64",
  ]
  const expectedTrees = [
    "baa62bdefb1ae3c84ad7d27ebeae01b90fbf7cdb",
    "baa4625c20d77fae9f4dcbfb421644d856b019c3",
  ]
  for (const [index, entry] of proof.commit_chain.entries()) {
    const raw = Buffer.from(entry.raw_commit_content_base64, "base64")
    assert.equal(raw.toString("base64"), entry.raw_commit_content_base64)
    assert.equal(rawSha256(raw), expectedRawDigests[index])
    assert.equal(gitCommitSha1(raw), entry.commit_sha)
    const header = raw.subarray(0, raw.indexOf(Buffer.from("\n\n"))).toString("utf8")
    assert.equal(/^tree ([0-9a-f]{40})$/m.exec(header)?.[1], expectedTrees[index])
    assert.deepEqual(
      [...header.matchAll(/^parent ([0-9a-f]{40})$/gm)].map((match) => match[1]),
      entry.parent_commit_shas,
    )
  }
})

test("exact two-object ancestry proof is deterministic and yields later-in-time only", () => {
  const proof = loadProof()
  assert.equal(deriveP2R6ProofIdentity(proofPreimage(proof)), EXPECTED_PROOF_IDENTITY)
  assert.equal(proof.proof_identity, EXPECTED_PROOF_IDENTITY)
  assert.equal(deriveP2R6ProofIdentity(proofPreimage(proof)), deriveP2R6ProofIdentity(proofPreimage(proof)))

  const validated = validateP2R6GitAncestryProof(proof)
  assert.equal(validated.chronology_status, "later-in-time")
  assert.equal(validated.proof.commit_chain[0].commit_sha, P2_R6_DEVELOPMENT_COMMIT)
  assert.equal(validated.proof.commit_chain[1].commit_sha, P2_R6_REALITY_CHECK_COMMIT)
  assert.equal(
    validated.proof.commit_chain[1].parent_commit_shas.includes(P2_R6_DEVELOPMENT_COMMIT),
    true,
  )
})

test("object-key order is identity-neutral while commit-chain order is semantic", () => {
  const proof = loadProof()
  const preimage = proofPreimage(proof)
  const reordered = Object.fromEntries(Object.entries(preimage).reverse())
  assert.equal(deriveP2R6ProofIdentity(reordered), EXPECTED_PROOF_IDENTITY)

  const reversed = clone(proof)
  reversed.commit_chain.reverse()
  rebindProof(reversed)
  assert.notEqual(reversed.proof_identity, EXPECTED_PROOF_IDENTITY)
  assert.throws(() => validateP2R6GitAncestryProof(reversed), /development commit/)
})

test("alternate textual base64 representations fail before proof hashing", () => {
  const mutations = [
    (value: string) => `${value}\n`,
    (value: string) => value.replace("+", "-"),
    (value: string) => value.replace(/=+$/, ""),
    (value: string) => `${value}=`,
  ]
  for (const mutate of mutations) {
    const proof = loadProof()
    proof.commit_chain[0]!.raw_commit_content_base64 = mutate(
      proof.commit_chain[0]!.raw_commit_content_base64,
    )
    assert.throws(
      () => deriveP2R6ProofIdentity(proofPreimage(proof)),
      /standard padded RFC 4648 base64|round-trip/,
    )
  }
})

test("missing, malformed, mismatched, or caller-invented proof identity fails closed", () => {
  const malformed = loadProof() as unknown as Record<string, unknown>
  malformed.proof_identity = "not-a-sha"
  assert.throws(() => validateP2R6GitAncestryProof(malformed), /lowercase SHA-256 identity/)

  const mismatched = loadProof()
  mismatched.proof_identity = `sha256:${"0".repeat(64)}`
  assert.throws(() => validateP2R6GitAncestryProof(mismatched), /recomputed closed preimage/)

  const missing = loadProof() as unknown as Record<string, unknown>
  delete missing.proof_identity
  assert.throws(() => validateP2R6GitAncestryProof(missing), /keys are not canonical/)
})

test("semantic proof mutations change identity or fail the exact chain contract", () => {
  const parentMutation = loadProof()
  parentMutation.commit_chain[1]!.parent_commit_shas = ["3".repeat(40)]
  rebindProof(parentMutation)
  assert.notEqual(parentMutation.proof_identity, EXPECTED_PROOF_IDENTITY)
  assert.throws(() => validateP2R6GitAncestryProof(parentMutation), /parent_commit_shas/)

  const bindingMutation = loadProof() as unknown as Record<string, unknown>
  bindingMutation.canonical_admission_binding_identity = `sha256:${"4".repeat(64)}`
  assert.throws(
    () => deriveP2R6ProofIdentity(proofPreimage(bindingMutation as unknown as P2R6GitAncestryProof)),
    /canonical binding/,
  )
})

test("foreign structurally valid Git objects and caller labels cannot create membership", () => {
  const proof = loadProof()
  const foreign = foreignCommit()
  proof.commit_chain[0] = {
    commit_sha: foreign.sha,
    raw_commit_content_base64: foreign.base64,
    parent_commit_shas: foreign.parents,
  }
  rebindProof(proof)
  assert.throws(() => validateP2R6GitAncestryProof(proof), /development commit is not the canonical development anchor/)

  for (const [key, value] of [
    ["repository", "TheHalfMoon/Kodac"],
    ["pr_number", 316],
    ["timestamp", 1788463594],
    ["later_in_time", true],
  ] as const) {
    const labeled = proofPreimage(loadProof()) as unknown as Record<string, unknown>
    labeled[key] = value
    assert.throws(() => deriveP2R6ProofIdentity(labeled), /keys are not canonical/)
  }
})

test("reversed, extra, duplicate, missing, cyclic, and unrelated chains fail closed", () => {
  const reversed = loadProof()
  reversed.commit_chain.reverse()
  rebindProof(reversed)
  assert.throws(() => validateP2R6GitAncestryProof(reversed))

  const extra = proofPreimage(loadProof()) as unknown as Record<string, unknown>
  ;(extra.commit_chain as unknown[]).push(clone((extra.commit_chain as unknown[])[0]))
  assert.throws(() => deriveP2R6ProofIdentity(extra), /exactly two entries/)

  const duplicate = loadProof()
  duplicate.commit_chain[1] = clone(duplicate.commit_chain[0])
  rebindProof(duplicate)
  assert.throws(() => validateP2R6GitAncestryProof(duplicate), /reality-check commit/)

  const missing = proofPreimage(loadProof()) as unknown as Record<string, unknown>
  ;(missing.commit_chain as unknown[]).pop()
  assert.throws(() => deriveP2R6ProofIdentity(missing), /exactly two entries/)

  const cyclic = loadProof()
  cyclic.commit_chain[1]!.parent_commit_shas = [P2_R6_REALITY_CHECK_COMMIT]
  rebindProof(cyclic)
  assert.throws(() => validateP2R6GitAncestryProof(cyclic), /parent_commit_shas/)

  const unrelated = loadProof()
  unrelated.commit_chain[1]!.parent_commit_shas = ["5".repeat(40)]
  rebindProof(unrelated)
  assert.throws(() => validateP2R6GitAncestryProof(unrelated), /parent_commit_shas/)
})

test("derives exact role-bound source, corpus, chronology, and identity records", () => {
  const records = deriveP2R6AdmissionRecords(loadProof(), declaration())
  assert.equal(records.length, 2)
  assert.deepEqual(records.map((record) => record.corpus_role), ["development", "reality-check"])
  assert.deepEqual(records.map((record) => record.source_repository_commit), [
    P2_R6_DEVELOPMENT_COMMIT,
    P2_R6_REALITY_CHECK_COMMIT,
  ])
  assert.deepEqual(records.map((record) => record.source_tree_identity), [
    "baa62bdefb1ae3c84ad7d27ebeae01b90fbf7cdb",
    "baa4625c20d77fae9f4dcbfb421644d856b019c3",
  ])
  assert.deepEqual(records.map((record) => record.source_raw_content_sha256), [
    "sha256:f8420121f479d643dbd25eb3483ca2ec6c38d1de73a186e4640e7e3ebdf2d5d5",
    "sha256:0b1aa165dce9304564d0aa34040362d205688ccc0034a80ad40f36c8f55a8d64",
  ])
  assert.deepEqual(
    records.map((record) => record.corpus_digest),
    records.map((record) => record.source_raw_content_sha256),
  )
  assert.deepEqual(records.map((record) => record.chronology_status), ["later-in-time", "later-in-time"])
  assert.deepEqual(records.map((record) => record.chronology_proof_identity), [
    EXPECTED_PROOF_IDENTITY,
    EXPECTED_PROOF_IDENTITY,
  ])
  assert.deepEqual(records.map((record) => record.case_evidence_identity), EXPECTED_CASE_IDENTITIES)
  assert.deepEqual(records.map((record) => record.admission_identity), EXPECTED_ADMISSION_IDENTITIES)
})

test("serialized records must recompute both identities and match proof-bound derivation", () => {
  const proof = loadProof()
  const declared = declaration()
  const records = deriveP2R6AdmissionRecords(proof, declared)
  assert.deepEqual(validateP2R6AdmissionRecords(records, proof, declared), records)

  const staleCase = clone(records)
  staleCase[0]!.case_evidence_identity = `sha256:${"6".repeat(64)}`
  assert.throws(
    () => validateP2R6AdmissionRecords(staleCase, proof, declared),
    /case_evidence_identity does not match/,
  )

  const staleAdmission = clone(records)
  staleAdmission[0]!.admission_identity = `sha256:${"7".repeat(64)}`
  assert.throws(
    () => validateP2R6AdmissionRecords(staleAdmission, proof, declared),
    /admission_identity does not match/,
  )
})

test("caller-supplied source, digest, chronology, and role fields cannot override derivation", () => {
  const proof = loadProof()
  const declared = declaration()
  const records = deriveP2R6AdmissionRecords(proof, declared)
  for (const [field, value] of [
    ["source_repository_commit", P2_R6_REALITY_CHECK_COMMIT],
    ["source_tree_identity", "8".repeat(40)],
    ["source_raw_content_sha256", `sha256:${"8".repeat(64)}`],
    ["corpus_digest", `sha256:${"9".repeat(64)}`],
    ["chronology_proof_identity", `sha256:${"a".repeat(64)}`],
    ["corpus_role", "reality-check"],
  ] as const) {
    const mutated = clone(records) as unknown as Array<Record<string, unknown>>
    mutated[0]![field] = value
    assert.throws(() => validateP2R6AdmissionRecords(mutated, proof, declared))
  }
})

test("corpus and case identities cannot alias across semantic roles", () => {
  const sameCorpus = declaration()
  sameCorpus.reality_check.corpus_id = sameCorpus.development.corpus_id
  assert.throws(() => deriveP2R6AdmissionRecords(loadProof(), sameCorpus), /corpus identities must not alias/)

  const sameCase = declaration()
  sameCase.reality_check.case_id = sameCase.development.case_id
  assert.throws(() => deriveP2R6AdmissionRecords(loadProof(), sameCase), /case identities must not alias/)
})

test("unknown contamination and overlap remain literal and identity-bearing", () => {
  const baselineDeclaration = declaration()
  const baseline = deriveP2R6AdmissionRecords(loadProof(), baselineDeclaration)
  assert.equal(baseline[0].contamination_status, "unknown")
  assert.equal(baseline[0].overlap_status, "unknown")

  const changedDeclaration = declaration()
  changedDeclaration.development.contamination_status = "none-known"
  changedDeclaration.development.overlap_status = "none-known"
  const changed = deriveP2R6AdmissionRecords(loadProof(), changedDeclaration)
  assert.equal(changed[0].contamination_status, "none-known")
  assert.equal(changed[0].overlap_status, "none-known")
  assert.notEqual(changed[0].case_evidence_identity, baseline[0].case_evidence_identity)
  assert.notEqual(changed[0].admission_identity, baseline[0].admission_identity)
})

test("benchmark, protocol, corpus, case, task-family, and status semantics are identity-bearing", () => {
  const baseline = deriveP2R6AdmissionRecords(loadProof(), declaration())
  const mutations: Array<(value: P2R6AdmissionDeclaration) => void> = [
    (value) => { value.benchmark_id = "kodacbench.repository-history.alt" },
    (value) => { value.benchmark_protocol_version = "v2" },
    (value) => { value.development.corpus_id = "kodac.history.development.alt" },
    (value) => { value.development.case_id = "kodac.history.development.alt-case" },
    (value) => { value.development.task_family = "repository-history-alt" },
    (value) => { value.development.contamination_status = "known" },
    (value) => { value.development.overlap_status = "known" },
  ]
  for (const mutate of mutations) {
    const changedDeclaration = declaration()
    mutate(changedDeclaration)
    const changed = deriveP2R6AdmissionRecords(loadProof(), changedDeclaration)
    assert.notEqual(changed[0].case_evidence_identity, baseline[0].case_evidence_identity)
    assert.notEqual(changed[0].admission_identity, baseline[0].admission_identity)
  }
})

test("derived evidence is caller-mutation independent and deeply frozen", () => {
  const proof = loadProof()
  const declared = declaration()
  const records = deriveP2R6AdmissionRecords(proof, declared)
  proof.commit_chain[0]!.parent_commit_shas[0] = "f".repeat(40)
  declared.development.corpus_id = "mutated.after.derivation"

  assert.equal(records[0].source_repository_commit, P2_R6_DEVELOPMENT_COMMIT)
  assert.equal(records[0].corpus_id, "kodac.history.development")
  assert.equal(Object.isFrozen(records), true)
  assert.equal(Object.isFrozen(records[0]), true)
})

test("unknown keys and hostile non-JSON inputs fail without getter or proxy execution", () => {
  const unknown = declaration() as unknown as Record<string, unknown>
  unknown.ranking = "winner"
  assert.throws(() => deriveP2R6AdmissionRecords(loadProof(), unknown), /keys are not canonical/)

  const nonFinite = declaration() as unknown as Record<string, unknown>
  nonFinite.benchmark_id = Number.NaN
  assert.throws(() => deriveP2R6AdmissionRecords(loadProof(), nonFinite), /non-finite number/)

  const sparse = clone(loadProof()) as unknown as Record<string, unknown>
  const sparseChain = new Array(2)
  sparseChain[0] = loadProof().commit_chain[0]
  sparse.commit_chain = sparseChain
  assert.throws(() => validateP2R6GitAncestryProof(sparse), /present enumerable data property/)

  let getterInvoked = false
  const getterDeclaration = declaration() as unknown as Record<string, unknown>
  Object.defineProperty(getterDeclaration, "benchmark_id", {
    enumerable: true,
    get() {
      getterInvoked = true
      return "should-not-run"
    },
  })
  assert.throws(() => deriveP2R6AdmissionRecords(loadProof(), getterDeclaration), /enumerable data property/)
  assert.equal(getterInvoked, false)

  const proxy = new Proxy(declaration(), {})
  assert.throws(() => deriveP2R6AdmissionRecords(loadProof(), proxy), /Proxy/)

  const cycle = declaration() as unknown as Record<string, unknown>
  cycle.development = cycle
  assert.throws(() => deriveP2R6AdmissionRecords(loadProof(), cycle), /cycle/)
})

test("P2-R6 source has no hidden Git, filesystem, network, subprocess, or execution path", () => {
  const source = readFileSync(new URL("../bench/p2-r6/admission.ts", import.meta.url), "utf8")
  assert.doesNotMatch(
    source,
    /node:fs|node:child_process|\bfetch\s*\(|XMLHttpRequest|WebSocket|\.git(?:\b|\/)|readFile|writeFile|appendFile|createWriteStream/,
  )
  assert.doesNotMatch(source, /\b(?:spawn|spawnSync|execFile|execFileSync|execSync)\s*\(/)
  assert.doesNotMatch(source, /provider|model invocation|reviewer invocation|evaluator invocation|agent invocation/)
})

test("P2-R6 outputs contain no ranking, promotion, completion, or participant-execution grants", () => {
  const records = deriveP2R6AdmissionRecords(loadProof(), declaration())
  const forbidden = /score|ranking|rank|winner|best|superior|promotion|promote|completion|release|participant|provider|model|reviewer|evaluator|agent/
  for (const record of records) {
    assert.equal(Object.keys(record).some((key) => forbidden.test(key)), false)
  }
})
