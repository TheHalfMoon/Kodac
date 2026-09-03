# Kodac P2-R6 — Repository-History Corpus Admission and Chronology/Provenance Authorization Candidate

Date: 2026-09-03

## Status

```text
DOCUMENT TYPE = P2-R6 AUTHORIZATION CANDIDATE ONLY
CANONICAL_BASE = 416067c72aa7702a48932ca86de2260a3c8ce973
P2-R1 THROUGH P2-R5 = CLOSED_CANONICAL
P2 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6 IMPLEMENTATION = AUTHORIZED ONLY AFTER THIS EXACT RECORD QUALIFIES, MERGES NORMALLY, AND PASSES POST-MERGE PROOF
P2-R7+ IMPLEMENTATION = NOT_AUTHORIZED
P3 BOUNDED R1-R17 ENGINEERING SCOPE = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R18+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This record is deny-by-default. While it remains only a branch/PR candidate it creates no effective implementation authority.

## 1. Governing evidence

This authorization candidate is justified by the fresh successor analysis after canonical P3 post-closeout reconciliation:

```text
P3_POST_CLOSEOUT_RECONCILIATION_PROOF = #315 / 5530804202
SUCCESSOR_ANALYSIS = #315 / 5530859993
```

Governing repository records include:

- root `AGENTS.md`;
- `docs/roadmap/NEXT.md`;
- `docs/adr/ADR-0010-benchmark-first-donor-selection.md`;
- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`;
- `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`;
- `docs/planning/KODAC_P2_BOUNDED_R1_R5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`;
- `docs/planning/KODAC_P3_BOUNDED_R1_R17_CANONICAL_CLOSEOUT_EVIDENCE_2026-09-03.md`;
- canonical KRI-R1/KRI-R4 corpus and qualification evidence as immutable precedent/input only.

Live GitHub and any more-specific later canonical record override this candidate.

## 2. Observed gap and minimum unit

Canonical P2-R1 through P2-R5 provide a deterministic measurement/evidence spine but intentionally do not admit real/repository-history benchmark evidence for execution or general claims:

```text
P2-R1 = SYNTHETIC FROZEN FIXTURE / MANIFEST CONTRACT
P2-R2 = CALLER-MATERIALIZED OBSERVATION REPORT
P2-R3 = TASK-FAMILY REDUCTION / MISSINGNESS SUMMARY
P2-R4 = CONTROLLED PAIRWISE RAW COMPARISON
P2-R5 = PER-METRIC DIRECTIONAL RELATION
```

The accepted master plan requires a frozen reproducible corpus plus a versioned later-in-time holdout/reality-check lane, while P3 promotion requires KodacBench evidence for selective context quality/dilution. Direct benchmark participant execution is still explicitly unauthorized.

Therefore the minimum next unit is not participant execution. It is a local deterministic P2-owned admission boundary for immutable repository-history evidence.

```text
P2-R6 = REPOSITORY-HISTORY CORPUS ADMISSION + CHRONOLOGY / PROVENANCE BINDING
```

## 3. Authorization-unit changed-file set

This authorization PR may change exactly one path:

```text
docs/planning/KODAC_P2_R6_REPOSITORY_HISTORY_CORPUS_ADMISSION_AUTHORIZATION_2026-09-03.md
```

No second path is authorized in this authorization unit.

## 4. Future implementation allowlist

Only after this exact authorization becomes canonical and post-merge proven, exactly one bounded P2-R6 implementation PR may modify only:

```text
packages/kodac-runtime/bench/p2-r6/**
packages/kodac-runtime/test/p2-r6-*.test.ts
packages/kodac-runtime/test/fixtures/p2-r6/**
docs/planning/KODAC_P2_R6_REPOSITORY_HISTORY_CORPUS_ADMISSION_EVIDENCE_2026-09-03.md
```

No historical P2-R1 through P2-R5 source/test/evidence byte may change. No KRI-R1 corpus byte may change. No current roadmap/status view is part of the implementation allowlist. No workflow, package manifest, lockfile, dependency, schema outside the P2-R6 subtree, provider/model adapter, persistence, product, release, or ruleset path is authorized.

If implementation requires any additional path, stop and create separate canonical authority.

## 5. P2-R6 objective

Implement the smallest deterministic local contract that can admit immutable repository-owned historical benchmark evidence without executing any benchmark participant.

The implementation must establish a versioned admission record capable of binding at minimum:

```text
schema_version
benchmark_id
benchmark_protocol_version
admission_version
corpus_id
corpus_role
corpus_digest
source_repository
source_repository_commit
source_artifact_kind
source_artifact_id
source_blob_or_record_identity
case_id
task_family
case_evidence_identity
chronology_scheme
chronology_anchor
development_freeze_anchor
reality_check_anchor
chronology_status
chronology_proof_identity
contamination_status
overlap_status
admission_identity
```

Names may be refined inside the implementation only if semantics remain equivalent and within this bounded authority. No field may encode execution, ranking, promotion, release, or completion authority.

## 6. Admissible source class

P2-R6 may admit only evidence already owned by and canonical inside `TheHalfMoon/Kodac`.

Permitted initial source classes are:

```text
CANONICAL_GIT_OBJECT
CANONICAL_PR_REVIEW_FINDING_OR_ADJUDICATION
CANONICAL_REPOSITORY_FIXTURE_OR_EVIDENCE_RECORD
```

The source must be bound to immutable repository identities such as exact commit/tree/blob identities and, when applicable, PR/comment/review identifiers. P2-R6 may validate and bind caller-materialized canonical Git-object bytes as defined in Section 7; it must not silently treat a repository label, SHA string, timestamp, PR number, or caller boolean as proof of repository membership or chronology.

P2-R6 may reference existing immutable KRI-R1 evidence by exact identity, including the canonical current KRI-R1 corpus:

```text
PATH = packages/kodac-runtime/test/fixtures/kri-r1/corpus.json
BLOB = a308729f00f6c96894d66555127c3dd3ab592d32
CORPUS_IDENTITY = e3f87d5e008918043da4f10617aa479d0d5e4b9fcde42143bc691763f503c4d4
CASE_COUNT = 4
```

That input is immutable. P2-R6 must not rewrite it, expand its claimed semantics, or represent four KRI-R1 cases as sufficient reviewer qualification or general KodacBench coverage.

No external benchmark/dataset download, donor intake, web retrieval, API ingestion, or third-party corpus copy is authorized.

## 7. Closed chronology-proof boundary

P2-R6 must use a deterministic chronology scheme grounded in immutable repository history rather than local wall-clock time.

The initial and only chronology-proof scheme authorized by this record is:

```text
git-commit-ancestry-object-chain/v1
```

A later scheme requires separate canonical authority; it may not be invented inside the implementation PR.

### 7.1 Required proof object

The pure P2-R6 function must receive chronology evidence as an explicit caller-materialized closed proof object. The proof object must have a versioned schema equivalent to:

```text
schema_version = p2-r6-git-ancestry-proof/v1
source_repository = TheHalfMoon/Kodac
repository_object_format = sha1
development_anchor_commit = <40 lowercase hex>
reality_check_anchor_commit = <40 lowercase hex>
commit_chain = ordered non-empty array of commit proof entries
proof_identity = sha256:<64 lowercase hex>
```

Each commit proof entry must bind at minimum:

```text
commit_sha = <40 lowercase hex>
raw_commit_content_base64 = <canonical base64 of the exact Git commit object CONTENT bytes>
parent_commit_shas = ordered array of the exact parent IDs parsed from those content bytes
```

`raw_commit_content_base64` contains the exact Git **commit content bytes only**, excluding the Git object framing prefix. The validator must reconstruct the Git object framing itself as:

```text
"commit " + decimal_byte_length(raw_content) + NUL + raw_content
```

and recompute the SHA-1 object ID using the existing Node runtime crypto capability. The recomputed object ID must equal `commit_sha` for every entry. A caller-supplied SHA string without matching raw object bytes is not chronology proof.

Git SHA-1 object identity here is a structural repository-history fingerprint under the repository's current object format. It is not a cryptographic signature, account authentication, provider identity, remote repository attestation, or authority grant.

### 7.2 Parent extraction and chain validation

The validator must parse parent identities from the raw Git commit header bytes; it may not trust `parent_commit_shas` merely because the caller supplied them.

At minimum:

1. the raw object must have a valid Git commit header/body boundary;
2. the header must contain one canonical `tree <40-lowercase-hex>` line;
3. every `parent <40-lowercase-hex>` header must be parsed in encounter order;
4. any continuation line must be associated only with a preceding Git header field and must not be interpreted as a parent line;
5. parsed parent IDs must equal `parent_commit_shas` exactly and in order;
6. malformed, truncated, duplicate, conflicting, non-canonical, or ambiguous parent declarations fail closed;
7. the validator must not derive ancestry from author/committer dates, message text, PR numbers, branch names, or caller-provided booleans.

The ancestry chain must satisfy all of:

```text
commit_chain[0].commit_sha == development_anchor_commit
commit_chain[last].commit_sha == reality_check_anchor_commit
all commit_sha values are distinct
for every i > 0:
  commit_chain[i - 1].commit_sha is present in commit_chain[i].parent_commit_shas
```

The chain therefore represents one explicit directed parent path from the development anchor to the reality-check anchor. Merge commits are permitted only when the previous chain element is one of the exact parents parsed from that merge commit's raw object bytes.

Missing links, duplicate/cyclic identities, object-ID mismatches, wrong endpoints, a reversed edge, an unrelated commit, or a parent array that disagrees with parsed raw bytes must fail closed.

### 7.3 Chronology result

A reality-check case or corpus may be called `later-in-time` only when the exact closed proof object validates under `git-commit-ancestry-object-chain/v1` and the anchors are distinct.

```text
VALID DISTINCT DEVELOPMENT->REALITY ANCESTRY CHAIN = later-in-time
VALID SAME ANCHOR = not-later-in-time
ABSENT / INVALID / INCOMPLETE / CONFLICTING PROOF = chronology-unproven
LATER COMMIT TIMESTAMP STRING != LATER-IN-TIME PROOF
PR NUMBER ORDER != GIT CHRONOLOGY PROOF
SEPARATE CORPUS != LATER-IN-TIME PROOF
SHA STRING ALONE != ANCESTRY PROOF
CALLER BOOLEAN / LABEL != ANCESTRY PROOF
```

The implementation must not throw away a valid admission merely because chronology is unproven unless the caller explicitly asks to assert `later-in-time`; instead it must preserve `chronology-unproven` as evidence. Any attempt to claim `later-in-time` from an absent or invalid proof must fail closed.

### 7.4 No hidden repository access

P2-R6 logic must not obtain or verify chronology by invoking Git, reading `.git`, traversing the filesystem, spawning a subprocess, using GitHub/API/network access, or calling a provider/tool/agent. The only chronology evidence it may evaluate is the closed caller-materialized proof object above.

Small committed P2-R6 fixtures may contain exact base64 commit-content bytes copied from already-canonical Kodac Git objects solely to prove this contract. Such fixtures are immutable local test evidence and do not create external-data or runtime repository-access authority.

P2-R6 does not claim that a valid ancestry proof establishes repository-label authentication, statistical independence, representativeness, contamination freedom, sufficient holdout size, or benchmark quality.

```text
VALID GIT OBJECT CHAIN != REMOTE REPOSITORY AUTHENTICATION
VALID ANCESTRY != UNBIASEDNESS
VALID ANCESTRY != CONTAMINATION FREEDOM
VALID ANCESTRY != HOLDOUT SUFFICIENCY
```

## 8. Provenance, overlap and contamination

The implementation must keep literal source provenance separate from stronger quality claims.

At minimum it must distinguish:

```text
contamination_status = none-known | known | unknown
overlap_status = none-known | known | unknown
chronology_status = later-in-time | not-later-in-time | chronology-unproven
```

Equivalent closed vocabularies are permitted if they preserve these distinctions exactly.

`unknown` must never be normalized to `none-known`. Literal repository provenance or a valid Git-object ancestry proof must never be relabeled as contamination freedom, unbiasedness, representativeness, holdout sufficiency, or statistical validity.

Development and reality-check case identities must not silently alias. Duplicate/conflicting source identities or case identities fail closed.

## 9. Determinism and hostile-input rules

The implementation must be pure/in-memory and deterministic. It may reuse canonical P2-R1 canonical JSON / SHA-256 helpers by import and Node's already-used `node:crypto` capability but must not mutate P2-R1.

It must fail closed on malformed or ambiguous inputs, including where applicable:

- unknown/missing keys;
- duplicate case/source/commit identities;
- contradictory role/provenance/chronology declarations;
- invalid SHA-1/SHA-256/commit/blob identities;
- malformed/non-canonical base64;
- Git object byte-length/hash mismatch;
- malformed Git commit headers or parent extraction mismatch;
- incomplete/reversed/unrelated/cyclic ancestry chains;
- non-canonical strings;
- object-key reordering instability;
- non-JSON values;
- non-finite numbers;
- sparse/non-canonical arrays;
- accessors/getters;
- proxies;
- cycles;
- caller mutation after derivation;
- attempts to inject ranking/promotion/execution authority fields.

For semantically identical canonical inputs, output bytes, `chronology_proof_identity`, and `admission_identity` must be identical across repeated runs and supported operating systems.

## 10. Required initial fixture proof

The implementation may create only small P2-owned local fixtures needed to prove the admission contract. Fixtures may include exact immutable references to canonical repository-history evidence and the bounded raw Git commit-content bytes required by Section 7.

The initial proof must demonstrate at least:

1. one admitted development source;
2. one separately admitted reality-check source;
3. one valid distinct `development -> reality` Git commit ancestry object chain producing `later-in-time`;
4. exact recomputation of every Git commit object ID from fixture bytes;
5. exact parent extraction and chain-edge validation without Git/filesystem/subprocess/network access;
6. exact source Git/blob/record identity binding;
7. deterministic chronology-proof/corpus/admission identity;
8. duplicate/alias/cycle rejection;
9. object-hash mismatch and parent-array/raw-byte mismatch rejection;
10. absent/incomplete/unrelated/reversed proof remains `chronology-unproven` and cannot support a `later-in-time` assertion;
11. commit timestamps, PR numbers, labels, and caller booleans do not establish chronology;
12. `unknown` contamination/overlap preservation;
13. source mutation changes the admission identity or fails validation;
14. existing KRI-R1 bytes remain unchanged if referenced;
15. no participant/model/provider/evaluator/tool/agent execution occurs;
16. no global score, ranking, promotion, winner/default, statistics, or broad benchmark completion field is emitted.

These fixtures prove contract behavior and bounded repository-history admission only. They do not by themselves establish general/public KodacBench completeness.

## 11. Explicit non-grants

This authorization does not authorize:

- benchmark participant execution;
- provider/model/reviewer/evaluator/tool/agent invocation;
- Git invocation or `.git` reads by P2-R6 logic;
- network, secret, subprocess, sandbox, filesystem-output, or other side-effect execution by P2-R6 benchmark logic;
- remote repository authentication or remote provenance lookup;
- external benchmark/dataset ingestion;
- donor source/code/data intake;
- mutation of KRI-R1 or historical P2/P3 evidence;
- new dependencies, package/lockfile changes, or workflow changes;
- persistence, database storage, telemetry, analytics, upload, training, fine-tuning, online learning, or cross-repository learning;
- whole-review finding generation measurement;
- claims that KRI-R1's four cases are sufficient/general;
- holdout sufficiency, representativeness, unbiasedness, contamination freedom, or statistical validity;
- threshold/tolerance/significance/confidence/effect-size policy;
- cross-task-family blended score;
- N-way ranking, leaderboard, winner/default selection, strategy promotion, donor replacement, or public superiority claims;
- P2 overall closure or general/public KodacBench completion;
- P2-R7+ implementation;
- P3 overall closure or promotion;
- P3-R18+ implementation;
- P4-P8 implementation;
- K2/K5/Done Gate/`PROVEN_READY` authority expansion;
- public release, package publication, brand launch, production-readiness claim, or project-completion claim;
- ruleset mutation or bypass.

```text
WAIVER = NO
```

## 12. Material review repair history

The first candidate head:

```text
HEAD = ad1a66483bd972b1a82a4d32dd833237c3c099e8
TREE = baa62bdefb1ae3c84ad7d27ebeae01b90fbf7cdb
AUTHORIZATION_BLOB = fea3064bb7908cf0bdca95855176ea60ae6a75ba
```

was **not qualified**. CodeRabbit FINAL-METADATA review comment `5530930105` found one material defect: the candidate required an objectively provable repository-history chronology while simultaneously requiring a pure/no-Git/no-network contract, but did not define a closed proof object that the pure implementation could validate.

This revision repairs that defect forward by specifying `p2-r6-git-ancestry-proof/v1`, raw Git commit-content binding, local Git object-ID recomputation, exact parent extraction, directed chain validation, fail-closed chronology semantics, and an explicit ban on hidden Git/filesystem/subprocess/network resolution.

The earlier head/check/review evidence is historical only and must not be reused as final qualification evidence for this revised head.

## 13. Required implementation evidence

The later implementation PR must create:

```text
docs/planning/KODAC_P2_R6_REPOSITORY_HISTORY_CORPUS_ADMISSION_EVIDENCE_2026-09-03.md
```

The evidence record must bind:

- this canonical authorization merge and post-merge proof;
- implementation base/head/tree;
- exact allowlist realization and final blobs;
- source corpus/artifact identities used by fixtures;
- chronology proof schema/version and exact proof identities used by fixtures;
- exact deterministic test results;
- Governance and K2 qualification identities;
- at least two distinct independent substantive exact-head semantic review channels;
- zero unresolved actionable findings/threads;
- active ruleset/no-bypass proof;
- guarded expected-head merge conditions;
- post-merge parent/tree/blob/signature/applicable-check proof;
- limitations and all preserved non-grants.

Candidate-time evidence must not claim future canonical closure.

## 14. Authorization-candidate qualification gate

This one-path authorization candidate may merge only when one frozen exact head proves:

```text
PULL_REF == BRANCH_REF == EXACT_HEAD
BASE == CURRENT_CANONICAL_MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
AUTHORIZATION_BLOB = FROZEN EXACT IDENTITY
APPLICABLE REQUIRED CI = TERMINAL SUCCESS OR CANONICALLY PROVEN NON-APPLICABLE
INDEPENDENT SUBSTANTIVE SEMANTIC REVIEW = 2 / 2 TERMINAL CLEAN ON EXACT HEAD/CURRENT METADATA
UNRESOLVED MATERIAL/MINOR ACTIONABLE FINDINGS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET 20707483 = ACTIVE / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Any repository-byte, head, base, or current-relevant metadata movement invalidates prior qualification and requires fresh exact-head qualification.

## 15. Guarded merge and post-merge proof

Merge must be a normal history-preserving guarded merge using the exact qualified `expected_head_sha`.

Before P2-R6 implementation authority becomes effective, mandatory post-merge proof must establish:

- protected `main` equals the returned merge SHA;
- ordered parents are pre-merge canonical main then exact qualified authorization head;
- merge tree equals the qualified tree;
- authorization blob on `main` equals the qualified blob;
- GitHub merge verification is `verified / valid`;
- applicable post-merge checks succeed, with K2 push non-applicability represented honestly when path filters exclude the docs-only merge;
- PR is merged;
- ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never`;
- `WAIVER=NO`.

Only after that proof may repository state be described as:

```text
P2-R6 REPOSITORY-HISTORY CORPUS ADMISSION IMPLEMENTATION = AUTHORIZED
```

## 16. Boundary after successful P2-R6 implementation

Successful P2-R6 implementation may establish only a canonical local repository-history corpus-admission/provenance/chronology mechanism.

It does not close P2 overall or authorize benchmark execution by composition.

After its implementation and any required current-view reconciliation are canonical, fresh successor analysis must determine whether the next minimum unit is additional corpus coverage, participant execution authorization, evaluator/result attestation, context-specific measurement, or another evidence gap.

No P2-R7 semantic slice is inferred by numbering alone.
