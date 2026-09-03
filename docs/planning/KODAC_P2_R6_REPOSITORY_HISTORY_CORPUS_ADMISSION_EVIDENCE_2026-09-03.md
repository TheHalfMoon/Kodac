# Kodac P2-R6 — Repository-History Corpus Admission Implementation Evidence Candidate

Date: 2026-09-03

```text
DOCUMENT TYPE = P2-R6 IMPLEMENTATION EVIDENCE CANDIDATE
P2-R1 = CLOSED_CANONICAL
P2-R2 = CLOSED_CANONICAL
P2-R3 = CLOSED_CANONICAL
P2-R4 = CLOSED_CANONICAL
P2-R5 = CLOSED_CANONICAL
P2-R6 = AUTHORIZED / IMPLEMENTATION CANDIDATE / NOT CLOSED_CANONICAL
P2-R7+ = NOT AUTHORIZED BY NUMBERING
GENERAL KODACBENCH = OPEN
PUBLIC SUPERIORITY CLAIMS = NOT AUTHORIZED
WAIVER = NO
```

This record is candidate-time evidence only. It does not claim that the eventual final PR head has qualified, merged, or closed canonically. Adding this file changes the branch head after the implementation/test parent described below; therefore all final qualification checks and independent semantic reviews must run again on the exact evidence-bearing final head.

---

## 1. Canonical authorization

P2-R6 implementation authority became effective only after PR #316 qualified, merged normally, and passed the mandatory post-merge authorization proof.

```text
AUTHORIZATION_PR = #316
AUTHORIZATION_MERGE = dce5fece4ec71c58832960c5515a918d7d4c19d8
AUTHORIZATION_BLOB = cca43e7bb8ddaa76df737d647fe30914bac66815
CANONICAL_BINDING_IDENTITY = sha256:fdf839d5923765b0149edf33ad679e63039a55e04d5968674a3042985d4a268d
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The authorization permits exactly one bounded implementation PR using only:

```text
packages/kodac-runtime/bench/p2-r6/**
packages/kodac-runtime/test/p2-r6-*.test.ts
packages/kodac-runtime/test/fixtures/p2-r6/**
docs/planning/KODAC_P2_R6_REPOSITORY_HISTORY_CORPUS_ADMISSION_EVIDENCE_2026-09-03.md
```

P2-R1 through P2-R5 bytes remain immutable in this unit. No workflow, manifest, lockfile, dependency, provider/model adapter, persistence, release, roadmap/status view, schema surface outside this allowlist, or ruleset mutation is authorized.

---

## 2. Implementation/test parent

The trustworthy implementation/test parent before this evidence file was created is:

```text
IMPLEMENTATION_TEST_PARENT = 1fa66e9bf1ec7a3862abdcc28c4db83edc6507b8
IMPLEMENTATION_TEST_PARENT_TREE = 19d3d046e2563641662d3ed62c1a0428450c2863
BASE = dce5fece4ec71c58832960c5515a918d7d4c19d8
AHEAD_BY = 5
BEHIND_BY = 0
CHANGED_FILES = 3
```

Exact parent paths and blobs:

```text
packages/kodac-runtime/bench/p2-r6/admission.ts
  = 99ffb787de48c577d114d3e930e297fb0e557c93
packages/kodac-runtime/test/fixtures/p2-r6/git-ancestry-proof.json
  = a8fc44637885fe0deb9234c95b7a1b6c6eaf8107
packages/kodac-runtime/test/p2-r6-admission.test.ts
  = 2f3964fa9aa0baf08a17ecda2f1a961a1ea10815
```

The comparison against the authorization merge is `ahead_by=5`, `behind_by=0`, and contains only those three authorized paths.

---

## 3. Precursor machine evidence on the implementation/test parent

Governance run:

```text
RUN = 33806548462
HEAD = 1fa66e9bf1ec7a3862abdcc28c4db83edc6507b8
provenance = SUCCESS
legacy-tests = SUCCESS
```

K2 runtime run:

```text
RUN = 33806548344
HEAD = 1fa66e9bf1ec7a3862abdcc28c4db83edc6507b8
runtime-change-classifier = SUCCESS
runtime (ubuntu-latest) = SUCCESS
  Typecheck = SUCCESS
  Test = SUCCESS
  Patch benchmark hook = SUCCESS
runtime (macos-latest) = SUCCESS
  Typecheck = SUCCESS
  Test = SUCCESS
  Patch benchmark hook = SUCCESS
runtime (windows-latest) = SUCCESS
  Typecheck = SUCCESS
  Test = SUCCESS
  Patch benchmark hook = SUCCESS
k2-runtime-gate = SUCCESS
```

These are precursor machine proofs for the implementation/test parent. They are not reused as final exact-head qualification after this evidence file advances the branch.

---

## 4. Preserved historical failed WIP evidence

Two earlier WIP heads failed and remain explicit historical failure evidence.

### 4.1 Typecheck failure

```text
WIP_HEAD = 1bc8e529ffc6a3a9487b9d257963b947e8f3c90d
GOVERNANCE_RUN = 33805587103
provenance = SUCCESS
legacy-tests = SUCCESS
K2_RUN = 33805587097 / FAILURE
runtime-change-classifier = SUCCESS
runtime = FAILURE AT TYPECHECK
```

The failure exposed implementation-local TypeScript contract/type defects, including literal schema inference and readonly tuple/array incompatibilities in the focused tests. It was repaired forward in commit `f7f83d513c29eaeb4856007939e1d3054e74b3f1`. No force-push, rebase, waiver, or destructive history rewrite was used, and the failed run is not relabeled as success.

### 4.2 Test-expectation failure after typecheck repair

```text
WIP_HEAD = f7f83d513c29eaeb4856007939e1d3054e74b3f1
K2_RUN = 33806079440 / FAILURE
TYPECHECK = SUCCESS on observed runtime jobs
TEST = FAILURE on observed Ubuntu/macOS jobs
```

The implementation semantics exercised before the failures were passing; the two observed failures were test-boundary defects:

1. one assertion expected an obsolete wording for the canonical-development-anchor rejection;
2. one source-surface regex incorrectly treated `RegExp.exec(...)` as a subprocess invocation.

They were repaired forward only in the test file by commit `1fa66e9bf1ec7a3862abdcc28c4db83edc6507b8`. The implementation source semantics were not changed by that repair. The historical failed run remains failure evidence.

---

## 5. Immutable bounded admission binding

The implementation embeds exactly this canonical binding identity:

```text
sha256:fdf839d5923765b0149edf33ad679e63039a55e04d5968674a3042985d4a268d
```

It admits exactly two Git commit objects:

```text
ROLE = development
COMMIT = ad1a66483bd972b1a82a4d32dd833237c3c099e8
TREE = baa62bdefb1ae3c84ad7d27ebeae01b90fbf7cdb
RAW_COMMIT_CONTENT_SHA256 = sha256:f8420121f479d643dbd25eb3483ca2ec6c38d1de73a186e4640e7e3ebdf2d5d5

ROLE = reality-check
COMMIT = 4598031bef5bfc05219f528f81ed6c653024b476
TREE = baa4625c20d77fae9f4dcbfb421644d856b019c3
RAW_COMMIT_CONTENT_SHA256 = sha256:0b1aa165dce9304564d0aa34040362d205688ccc0034a80ad40f36c8f55a8d64
```

The accepted chronology is only the exact direct ancestry in which the reality-check commit has the development commit as its exact sole parsed parent. The implementation does not infer membership from repository labels, SHA strings alone, timestamps, PR numbers, booleans, caller labels, or external repository state.

---

## 6. Canonical proof fixture and identity

The committed fixture contains the exact caller-materialized raw Git commit-content bytes as standard padded RFC 4648 base64 and the exact ordered parent lists for the two admitted objects.

The focused tests independently prove for both fixture entries:

- base64 decode/re-encode equality;
- exact raw-content SHA-256 equality with the immutable binding;
- exact Git framed commit SHA-1 recomputation;
- exact parsed tree SHA-1;
- exact parsed ordered parent list.

The closed proof identity is:

```text
PROOF_IDENTITY = sha256:1ecaa5bd2d25a7d3a9a9d57c9d5fbbf3c27c04d20a15157635de638e618c42f4
CHRONOLOGY_STATUS = later-in-time
CHRONOLOGY_SCHEME = git-commit-ancestry-object-chain/v1
```

`proof_identity` is recomputed from the exact five-field self-reference-free preimage after exact base64 canonicalization. Object-key order is non-semantic because canonical sorted-key JSON is used; array order remains semantic. Missing, malformed, stale, caller-selected, or mismatched proof identities fail closed.

---

## 7. Git-object and chronology validation

For each proof entry the implementation:

1. validates exact standard padded RFC 4648 base64;
2. decodes the raw commit-content bytes;
3. recomputes and binds raw-content SHA-256;
4. reconstructs `commit <decimal-length>\0<raw-content>` and recomputes Git SHA-1;
5. parses exactly one canonical tree header;
6. parses every parent header in encounter order;
7. requires caller parent arrays to equal the parsed lists exactly;
8. requires SHA-1, tree SHA-1, and raw-content SHA-256 to match exactly one immutable binding entry;
9. requires exact development/reality role order and distinct commits;
10. requires the exact direct development-to-reality ancestry.

Foreign but structurally valid Git objects remain inadmissible. Reversed, extended, duplicate, missing, cyclic, unrelated, digest-mismatched, tree-mismatched, parent-mismatched, malformed, or unbound chains fail closed.

---

## 8. Admission declaration and derived records

The declaration accepts only:

```text
schema_version
benchmark_id
benchmark_protocol_version
development
reality_check
```

Each role declaration accepts only:

```text
corpus_id
case_id
task_family
contamination_status
overlap_status
```

The only status vocabularies are:

```text
contamination_status = none-known | known | unknown
overlap_status = none-known | known | unknown
```

`unknown` remains literal and never normalizes to `none-known`. Development and reality-check corpus identities cannot alias, and their case identities cannot alias.

The implementation derives exactly two records in canonical role order. Source repository, source commit, source tree, raw-content digest, corpus digest, chronology anchors, chronology result, and proof identity are derived from the validated immutable binding/proof rather than trusted from caller declarations.

For P2-R6 v1:

```text
corpus_digest == source_raw_content_sha256
```

because the complete admitted payload is the exact validated raw Git commit-content bytes for that record.

---

## 9. Closed record identities

For the focused canonical declaration used by the regression tests, the deterministic derived identities are:

```text
DEVELOPMENT_CASE_EVIDENCE_IDENTITY = sha256:f92122ad1270519f6108f5be8d6912355cf7166e286387b898e1e49688c65177
DEVELOPMENT_ADMISSION_IDENTITY = sha256:f616ea62354c7a1a1f6c8aa30a3cc204de9ecf0bd9d0ad33049894467c05acb0
REALITY_CASE_EVIDENCE_IDENTITY = sha256:220bd3c4812c20aeca996c2a15285298eae98ca5f02b04de55b3dd47c1b31527
REALITY_ADMISSION_IDENTITY = sha256:7736ade45d208d156f32e2ae8a55244dd9722e04ab5b6c560209ae5f7ea5e3ab
```

`case_evidence_identity` is derived from the exact closed case-evidence preimage. `admission_identity` is derived afterward from the complete record excluding only itself and including the recomputed case identity.

Serialized records presented for revalidation must have exact keys, recompute both identities, and equal the proof-bound derived record exactly. Caller attempts to override source, digest, role, chronology, or identity fields fail closed.

---

## 10. Determinism and hostile-input boundary

The implementation reuses the canonical P2-R1 canonical-JSON/SHA-256 boundary without changing P2-R1 bytes. It snapshots untrusted values before semantic field reads and fails closed for hostile/non-canonical structures including:

- unknown or missing keys;
- non-JSON values;
- non-finite numbers;
- sparse arrays;
- accessors/getters without executing the getter;
- proxies;
- cycles;
- malformed SHA-1/SHA-256 values;
- malformed or non-canonical base64;
- duplicate/aliased corpus or case identities;
- caller mutation after derivation.

Derived records are recursively frozen and detached from later caller mutation.

---

## 11. Pure/in-memory boundary and explicit non-grants

P2-R6 source uses only in-memory data plus the already-used Node cryptographic capability and P2-R1 canonicalization helpers. The focused test inspects the source surface to prevent hidden Git, `.git`, filesystem, network, or subprocess execution paths.

P2-R6 does not create or authorize:

- general remote-repository authentication;
- arbitrary Kodac-history intake;
- Git invocation or `.git` traversal;
- filesystem lookup or hidden working-tree state;
- GitHub/API/network access;
- subprocess or sandbox execution;
- provider/model/reviewer/evaluator/tool/agent invocation;
- benchmark task execution;
- signature-validity claims beyond explicitly supplied evidence elsewhere;
- contamination freedom from `unknown` or `none-known` labels;
- statistical independence, representativeness, holdout sufficiency, benchmark quality, or unbiasedness;
- ranking, winner, superiority, promotion, routing, or release decisions;
- persistence, telemetry, memory, or learning;
- dependency, manifest, lockfile, workflow, package, CLI, product, or public-claim expansion;
- ruleset mutation or bypass;
- P2-R7 or any later implementation authority merely by numbering.

`WAIVER=NO` remains in force.

---

## 12. Focused regression proof behaviors

The focused P2-R6 regression matrix proves, among other behaviors:

1. embedded canonical-binding identity recomputation;
2. fixture raw SHA-256 recomputation;
3. fixture framed Git SHA-1 recomputation;
4. exact tree and ordered-parent parsing;
5. deterministic exact proof identity;
6. exact two-object later-in-time chronology only;
7. object-key reordering is identity-neutral;
8. commit-chain order is identity-bearing;
9. alternate textual base64 representations fail;
10. missing/malformed/mismatched proof identities fail;
11. semantic proof mutations change identity or fail;
12. foreign structurally valid Git objects remain inadmissible;
13. repository labels, PR numbers, timestamps, and booleans cannot establish membership;
14. reversed/extra/duplicate/missing/cyclic/unrelated chains fail;
15. exact role-bound source and corpus derivation;
16. exact chronology proof binding on both records;
17. deterministic case-evidence identities;
18. deterministic admission identities;
19. serialized record identity recomputation and equality;
20. source/digest/chronology/role override rejection;
21. corpus/case alias rejection;
22. literal unknown contamination/overlap preservation;
23. contamination/overlap changes are identity-bearing;
24. benchmark/protocol/corpus/case/task-family semantics are identity-bearing;
25. deep freeze and caller-mutation independence;
26. unknown-key rejection;
27. non-finite-number rejection;
28. sparse-array rejection;
29. getter rejection without getter execution;
30. proxy rejection;
31. cycle rejection;
32. absence of hidden Git/filesystem/network/subprocess execution paths;
33. absence of ranking/promotion/completion/participant-execution output grants.

The full runtime test suite, typecheck, and patch benchmark hook pass on Ubuntu, macOS, and Windows at the implementation/test parent.

---

## 13. Final qualification still required

Because this evidence record itself advances the branch, P2-R6 remains `NOT CLOSED_CANONICAL` unless one frozen final exact head proves all of the following:

1. canonical `main` remains the expected base or the branch is forward-reconciled without rebase;
2. `behind_by=0`;
3. the diff contains exactly the four authorized P2-R6 paths and no rename/copy or unauthorized path;
4. exact final tree and all four final blobs are captured;
5. PR #317 is open, non-draft, and mergeable;
6. exact-final-head `provenance` and `legacy-tests` are SUCCESS;
7. exact-final-head K2 classifier, Ubuntu, macOS, Windows, and `k2-runtime-gate` are SUCCESS;
8. at least two distinct independent external substantive semantic reviewer channels are terminal-clean on the exact final head and current metadata;
9. no unresolved material finding or actionable review thread remains;
10. ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never`;
11. `WAIVER=NO`;
12. normal guarded merge uses the exact qualified `expected_head_sha` and preserves history;
13. post-merge proof verifies canonical `main`, ordered merge parents, exact merge tree, exact canonical blobs, merge verification state, all applicable post-merge checks, merged PR state, and unchanged no-bypass ruleset;
14. only after closure may a fresh canonical successor analysis determine whether any further unit is authorized.

Only after those conditions succeed may P2-R6 be called `CLOSED_CANONICAL`.
