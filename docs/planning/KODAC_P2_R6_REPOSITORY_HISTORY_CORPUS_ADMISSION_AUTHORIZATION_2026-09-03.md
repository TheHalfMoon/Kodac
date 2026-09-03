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
P2-R6 IMPLEMENTATION = NOT_AUTHORIZED WHILE THIS RECORD IS NON-CANONICAL
P2-R7+ IMPLEMENTATION = NOT_AUTHORIZED
P3 BOUNDED R1-R17 ENGINEERING SCOPE = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R18+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
PR_316_QUALIFICATION = NOT_QUALIFIED
CURRENT_EXACT_HEAD_SEMANTIC_REVIEW_QUORUM = 0 / 2 AFTER THIS BYTE CHANGE
WAIVER = NO
```

This record is deny-by-default. It creates no effective implementation authority while it is only a branch/PR candidate. Historical reviews, predecessor-head CI, service errors, billing responses, summaries, unsubmitted analyses, and self-review do not count toward the final 2/2 exact-head semantic quorum.

## 1. Governing evidence

This candidate follows the fresh successor analysis after canonical P3 post-closeout reconciliation:

```text
P3_POST_CLOSEOUT_RECONCILIATION_PROOF = #315 / 5530804202
SUCCESSOR_ANALYSIS = #315 / 5530859993
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Governing records include root `AGENTS.md`, `docs/roadmap/NEXT.md`, ADR-0010, the intelligence improvement master plan, final gap review, canonical P2 R1-R5 closeout evidence, canonical P3 R1-R17 closeout evidence, and the provider-neutral review-quorum amendment. Live GitHub and any more-specific later canonical record override this candidate.

## 2. Observed gap and minimum unit

Canonical P2-R1 through P2-R5 provide a deterministic evidence spine:

```text
P2-R1 = SYNTHETIC FROZEN FIXTURE / MANIFEST CONTRACT
P2-R2 = CALLER-MATERIALIZED OBSERVATION REPORT
P2-R3 = TASK-FAMILY REDUCTION / MISSINGNESS SUMMARY
P2-R4 = CONTROLLED PAIRWISE RAW COMPARISON
P2-R5 = PER-METRIC DIRECTIONAL RELATION
```

They intentionally do not establish repository-history corpus admission or benchmark participant execution. The accepted plan requires a frozen reproducible corpus plus a versioned later-in-time reality-check lane before broad quality claims. Direct participant execution remains unauthorized.

The minimum next unit is therefore:

```text
P2-R6 = BOUNDED REPOSITORY-HISTORY GIT-OBJECT CORPUS ADMISSION + CHRONOLOGY / PROVENANCE BINDING
```

This is not P3-R18, P4, participant execution, a general corpus, or public KodacBench completion.

## 3. Authorization-unit scope

This authorization PR may change exactly one path:

```text
docs/planning/KODAC_P2_R6_REPOSITORY_HISTORY_CORPUS_ADMISSION_AUTHORIZATION_2026-09-03.md
```

No second path is authorized.

Only after this exact authorization record qualifies, merges normally, and passes mandatory post-merge proof may exactly one bounded P2-R6 implementation PR modify only:

```text
packages/kodac-runtime/bench/p2-r6/**
packages/kodac-runtime/test/p2-r6-*.test.ts
packages/kodac-runtime/test/fixtures/p2-r6/**
docs/planning/KODAC_P2_R6_REPOSITORY_HISTORY_CORPUS_ADMISSION_EVIDENCE_2026-09-03.md
```

No historical P2-R1 through P2-R5 source/test/evidence byte may change. No KRI-R1 corpus byte may change. No current roadmap/status view, workflow, package manifest, lockfile, dependency, external schema, provider/model adapter, persistence, product, release, or ruleset path is authorized. If implementation requires any additional path, stop and create separate canonical authority.

## 4. Exact initial source class

P2-R6 v1 may admit exactly one source class:

```text
CANONICAL_ADMISSION_BOUND_GIT_COMMIT_OBJECT
```

No PR-review finding, KRI corpus case, arbitrary repository fixture, external dataset, donor source, or caller-selected Git object is admitted. KRI-R1 remains immutable precedent only and is not imported or relabeled by this slice.

## 5. Canonical admission binding v1

P2-R6 must not trust a caller-supplied repository label or Git SHA as proof that an object belongs to Kodac. Membership for this bounded initial slice comes only from the immutable governance constant below.

```json
{
  "schema_version": "p2-r6-canonical-admission-binding/v1",
  "source_repository": "TheHalfMoon/Kodac",
  "repository_object_format": "sha1",
  "admitted_git_commits": [
    {
      "commit_sha": "ad1a66483bd972b1a82a4d32dd833237c3c099e8",
      "tree_sha": "baa62bdefb1ae3c84ad7d27ebeae01b90fbf7cdb",
      "raw_commit_content_sha256": "sha256:f8420121f479d643dbd25eb3483ca2ec6c38d1de73a186e4640e7e3ebdf2d5d5"
    },
    {
      "commit_sha": "4598031bef5bfc05219f528f81ed6c653024b476",
      "tree_sha": "baa4625c20d77fae9f4dcbfb421644d856b019c3",
      "raw_commit_content_sha256": "sha256:0b1aa165dce9304564d0aa34040362d205688ccc0034a80ad40f36c8f55a8d64"
    }
  ]
}
```

The binding identity uses canonical sorted-key compact UTF-8 JSON with arrays preserved in declared order and SHA-256 over those exact bytes:

```text
CANONICAL_ADMISSION_BINDING_IDENTITY = sha256:fdf839d5923765b0149edf33ad679e63039a55e04d5968674a3042985d4a268d
```

The implementation must embed this exact binding and identity. It must recompute the binding identity before accepting any proof and fail closed if the embedded object or computed identity differs. The caller cannot replace, extend, reorder, or weaken the binding.

The two admitted commits are historical commits in the PR #316 authorization branch. P2-R6 implementation authority becomes effective only after a normal history-preserving merge of a descendant final PR #316 head and mandatory post-merge proof establishing that the canonical merge second parent descends from `4598031bef5bfc05219f528f81ed6c653024b476`, and that `4598031bef5bfc05219f528f81ed6c653024b476` has parent `ad1a66483bd972b1a82a4d32dd833237c3c099e8`.

This is a governance-bound local membership assertion for exactly these two identities. It is not general remote-repository authentication and grants no arbitrary Kodac-history intake.

## 6. Closed chronology proof contract

The initial and only chronology scheme is:

```text
git-commit-ancestry-object-chain/v1
```

A later scheme requires separate canonical authority.

### 6.1 Exact proof schema

The caller-materialized proof root has exactly these keys and no others:

```text
schema_version
canonical_admission_binding_identity
development_anchor_commit
reality_check_anchor_commit
commit_chain
proof_identity
```

Required fixed values are:

```text
schema_version = p2-r6-git-ancestry-proof/v1
canonical_admission_binding_identity = sha256:fdf839d5923765b0149edf33ad679e63039a55e04d5968674a3042985d4a268d
development_anchor_commit = ad1a66483bd972b1a82a4d32dd833237c3c099e8
reality_check_anchor_commit = 4598031bef5bfc05219f528f81ed6c653024b476
commit_chain.length = 2
proof_identity = sha256:<64 lowercase hex>
```

Each `commit_chain` entry has exactly these keys and no others:

```text
commit_sha
raw_commit_content_base64
parent_commit_shas
```

The exact chain order is development commit first, reality-check commit second. `raw_commit_content_base64` is canonical base64 of the exact Git commit content bytes only, excluding Git object framing.

### 6.2 Exact `proof_identity` derivation

`proof_identity` is not trusted caller metadata. The implementation must derive and verify it.

Define `proof_identity_preimage` as an object containing exactly the following five root keys, excluding `proof_identity` itself:

```text
schema_version
canonical_admission_binding_identity
development_anchor_commit
reality_check_anchor_commit
commit_chain
```

Each `commit_chain` entry in the preimage contains exactly and only:

```text
commit_sha
raw_commit_content_base64
parent_commit_shas
```

Derivation is exactly:

```text
canonical_bytes = UTF8(
  canonicalize_sorted_keys_compact_json(proof_identity_preimage)
)
proof_identity = "sha256:" + lowercase_hex(SHA256(canonical_bytes))
```

Canonicalization rules:

1. object keys are lexicographically sorted at every object level;
2. array order is preserved exactly;
3. strings use JSON string escaping;
4. no insignificant whitespace, trailing newline, timestamp, host path, locale value, process state, or unordered iteration enters the bytes;
5. no unknown field may enter or be ignored by the preimage;
6. the implementation may reuse canonical P2-R1 canonical-JSON/SHA-256 helpers, but P2-R1 bytes remain immutable.

Validation order must require a syntactically valid lowercase SHA-256 `proof_identity`, construct the closed preimage from the validated exact-key proof structure, recompute the digest above, and require exact equality. Missing, malformed, mismatched, or self-referential proof identity fails closed.

Changing any semantic proof field—including either raw commit-content base64 string, either parent list, either anchor, binding identity, schema version, or chain order—must either fail the proof contract or change the recomputed `proof_identity`.

### 6.3 Git object validation

For every proof entry, the implementation must:

1. reject malformed or non-canonical base64;
2. decode the exact raw commit content bytes;
3. compute SHA-256 of those bytes and require exact equality with the corresponding immutable admission-binding `raw_commit_content_sha256`;
4. reconstruct Git framing as `"commit " + decimal_byte_length(raw_content) + NUL + raw_content`;
5. recompute SHA-1 of the framed bytes and require exact equality with `commit_sha`;
6. parse exactly one canonical `tree <40-lowercase-hex>` header and require exact equality with the corresponding immutable binding `tree_sha`;
7. parse every `parent <40-lowercase-hex>` header from the raw bytes in encounter order;
8. require the parsed parent list to equal caller `parent_commit_shas` exactly and in order;
9. require commit SHA-1, parsed tree SHA-1, and raw-content SHA-256 to match one and only one immutable binding entry;
10. reject every unbound object.

A caller cannot make an object admissible using a repository label, SHA string, tree string, boolean, parent list, timestamp, PR number, or message text.

### 6.4 Commit-header and chain validation

The raw commit object must have an unambiguous Git header/body boundary. Continuation lines may only continue a preceding Git header field and may never become parent declarations. Malformed, truncated, duplicate, conflicting, non-canonical, or ambiguous tree/parent declarations fail closed.

The only accepted chain is:

```text
commit_chain[0].commit_sha == ad1a66483bd972b1a82a4d32dd833237c3c099e8
commit_chain[1].commit_sha == 4598031bef5bfc05219f528f81ed6c653024b476
commit_chain[0].commit_sha is present in the exact parsed parents of commit_chain[1]
all commit_sha values are distinct
```

No intermediate, alternate, extra, duplicate, reversed, cyclic, unrelated, or missing chain element is authorized.

### 6.5 Chronology result

Only the exact fully validated, admission-bound, identity-verified two-object proof may produce:

```text
chronology_status = later-in-time
```

Absent, invalid, incomplete, conflicting, unbound, reversed, mismatched-identity, or extended proof yields `chronology-unproven`; a caller assertion of `later-in-time` from such evidence fails closed.

```text
COMMIT TIMESTAMP != CHRONOLOGY PROOF
PR NUMBER != CHRONOLOGY PROOF
SHA STRING ALONE != CHRONOLOGY PROOF
CALLER BOOLEAN / LABEL != CHRONOLOGY PROOF
VALID GIT OBJECT CHAIN WITHOUT CANONICAL ADMISSION BINDING != KODAC MEMBERSHIP
```

### 6.6 No hidden repository access

P2-R6 logic must not invoke Git, read `.git`, traverse the filesystem, spawn a subprocess, use GitHub/API/network access, or call a provider/tool/agent to establish membership or chronology. It evaluates only the immutable embedded binding plus caller-materialized proof bytes.

Small committed P2-R6 fixtures may contain exact base64 raw commit-content bytes for the two admitted identities solely to prove this bounded contract.

The binding/proof establish only literal canonically authorized local object membership and one bounded ancestry relation. They do not establish remote authentication, signature validity, statistical independence, representativeness, contamination freedom, holdout sufficiency, or benchmark quality.

## 7. Closed admission-record and provenance boundary

P2-R6 must derive admission records from the already validated proof plus a closed caller declaration. Source, corpus, case-evidence, and admission identities are never independently trusted caller fields.

### 7.1 Exact admission declaration

The caller declaration root has exactly these keys and no others:

```text
schema_version
benchmark_id
benchmark_protocol_version
development
reality_check
```

Required root schema version:

```text
schema_version = p2-r6-admission-declaration/v1
```

`development` and `reality_check` each have exactly these keys and no others:

```text
corpus_id
case_id
task_family
contamination_status
overlap_status
```

All identifier strings must be canonical non-empty bounded strings under the same hostile-input rules used elsewhere in P2. `development.corpus_id != reality_check.corpus_id` and `development.case_id != reality_check.case_id`. The two entries are semantic roles; callers cannot swap their underlying Git objects.

The only status vocabularies are:

```text
contamination_status = none-known | known | unknown
overlap_status = none-known | known | unknown
```

`unknown` must never normalize to `none-known`.

### 7.2 Exact admission-record schema and source derivation

The implementation must produce exactly two admission records in this order:

```text
records[0] = development
records[1] = reality-check
```

Each admission record has exactly these keys and no others:

```text
schema_version
benchmark_id
benchmark_protocol_version
admission_version
canonical_admission_binding_identity
corpus_id
corpus_role
corpus_digest
source_repository
source_repository_commit
source_tree_identity
source_raw_content_sha256
case_id
task_family
case_evidence_identity
chronology_scheme
development_freeze_anchor
reality_check_anchor
chronology_status
chronology_proof_identity
contamination_status
overlap_status
admission_identity
```

Required fixed literals are:

```text
schema_version = p2-r6-admission-record/v1
admission_version = p2-r6-repository-history-corpus-admission/v1
canonical_admission_binding_identity = sha256:fdf839d5923765b0149edf33ad679e63039a55e04d5968674a3042985d4a268d
source_repository = TheHalfMoon/Kodac
chronology_scheme = git-commit-ancestry-object-chain/v1
development_freeze_anchor = ad1a66483bd972b1a82a4d32dd833237c3c099e8
reality_check_anchor = 4598031bef5bfc05219f528f81ed6c653024b476
```

The development record is derived only from validated `commit_chain[0]` and immutable binding entry 0:

```text
corpus_role = development
source_repository_commit = ad1a66483bd972b1a82a4d32dd833237c3c099e8
source_tree_identity = baa62bdefb1ae3c84ad7d27ebeae01b90fbf7cdb
source_raw_content_sha256 = sha256:f8420121f479d643dbd25eb3483ca2ec6c38d1de73a186e4640e7e3ebdf2d5d5
```

The reality-check record is derived only from validated `commit_chain[1]` and immutable binding entry 1:

```text
corpus_role = reality-check
source_repository_commit = 4598031bef5bfc05219f528f81ed6c653024b476
source_tree_identity = baa4625c20d77fae9f4dcbfb421644d856b019c3
source_raw_content_sha256 = sha256:0b1aa165dce9304564d0aa34040362d205688ccc0034a80ad40f36c8f55a8d64
```

The implementation must re-use the already validated decoded raw commit content bytes for the selected record. In P2-R6 v1 those exact raw Git commit-content bytes are the complete admitted corpus payload for that record. Therefore:

```text
corpus_digest == source_raw_content_sha256
```

No tree contents, working-tree snapshot, PR text, commit message interpretation, external file, or hidden repository state enters `corpus_digest` in v1.

`benchmark_id` and `benchmark_protocol_version` are copied from the validated root declaration. `corpus_id`, `case_id`, `task_family`, `contamination_status`, and `overlap_status` are copied only from the declaration entry matching the fixed role. No source identity, role, chronology identity, or derived digest may be supplied by those declaration entries.

`chronology_proof_identity` must equal the validated recomputed `proof_identity`; it may not be independently caller-selected. `chronology_status` is derived only by Section 6.5. A valid exact proof yields `later-in-time`; an unproven chronology must remain `chronology-unproven` and cannot be upgraded by declaration text.

### 7.3 Exact `case_evidence_identity` derivation

`case_evidence_identity` is derived from a self-reference-free preimage containing exactly these keys and no others:

```text
schema_version
benchmark_id
benchmark_protocol_version
admission_version
canonical_admission_binding_identity
corpus_id
corpus_role
corpus_digest
source_repository
source_repository_commit
source_tree_identity
source_raw_content_sha256
case_id
task_family
chronology_scheme
development_freeze_anchor
reality_check_anchor
chronology_status
chronology_proof_identity
contamination_status
overlap_status
```

Its derivation is exactly:

```text
case_evidence_bytes = UTF8(
  canonicalize_sorted_keys_compact_json(case_evidence_preimage)
)
case_evidence_identity = "sha256:" + lowercase_hex(SHA256(case_evidence_bytes))
```

The implementation constructs this preimage from the derived admission fields. A missing, malformed, caller-selected, or mismatched serialized `case_evidence_identity` fails closed. Any semantic field mutation must change the recomputed identity or fail validation.

### 7.4 Exact `admission_identity` derivation

`admission_identity` is the identity of the complete admission record excluding only `admission_identity` itself. Its preimage contains exactly all admission-record keys listed in Section 7.2 except `admission_identity`, including the recomputed `case_evidence_identity`.

```text
admission_bytes = UTF8(
  canonicalize_sorted_keys_compact_json(admission_identity_preimage)
)
admission_identity = "sha256:" + lowercase_hex(SHA256(admission_bytes))
```

The implementation must derive it after all source/provenance/chronology fields and `case_evidence_identity` have been fixed. Any serialized record presented for revalidation must have exact keys, recompute both identities from scratch, and require exact equality. Missing, malformed, caller-invented, stale, mutually inconsistent, or self-referential identities fail closed.

The following equalities are mandatory and cannot be weakened by callers:

```text
source_repository_commit == validated proof commit_sha for the fixed role
source_tree_identity == immutable binding tree_sha for that commit
source_raw_content_sha256 == validated raw-content SHA-256 for that commit
corpus_digest == SHA-256 identity of the exact admitted raw commit-content bytes
chronology_proof_identity == recomputed proof_identity
case_evidence_identity == recomputed closed case-evidence digest
admission_identity == recomputed closed complete-record digest
```

### 7.5 Provenance interpretation boundary

Literal provenance remains separate from quality claims. Canonical admission or valid ancestry must never be relabeled as contamination freedom, unbiasedness, representativeness, holdout sufficiency, statistical validity, or superiority. Development and reality-check corpus/case identities must not alias.

## 8. Determinism and hostile-input rules

The implementation must be pure/in-memory and deterministic. It may reuse canonical P2-R1 canonical JSON/SHA-256 helpers and Node's already-used `node:crypto` capability but must not mutate P2-R1.

It must fail closed on, at minimum:

- unknown or missing keys;
- caller attempts to alter the canonical admission binding;
- malformed or mismatched `proof_identity`;
- caller-supplied or mismatched source/corpus/case/admission identity fields;
- role/source swapping;
- duplicate corpus or case identities;
- invalid SHA-1/SHA-256;
- malformed/non-canonical base64;
- Git object hash mismatch;
- raw-content digest mismatch;
- tree mismatch;
- parent mismatch;
- extra/unbound commit objects;
- incomplete/reversed/cyclic chains;
- non-canonical strings;
- non-JSON values;
- non-finite numbers;
- sparse arrays;
- accessors/getters;
- proxies;
- cycles;
- caller mutation after derivation;
- injected ranking/promotion/execution authority fields.

For identical canonical inputs, canonical proof bytes, `proof_identity`, admission-record bytes, `case_evidence_identity`, and `admission_identity` must be identical across repeated runs and supported operating systems.

## 9. Required implementation proof matrix

The later implementation must demonstrate at least:

1. exact canonical-admission binding identity recomputation;
2. exact admission of only the two bound commits;
3. exact raw-content SHA-256 checks;
4. exact Git SHA-1 object-ID recomputation;
5. exact tree extraction and binding;
6. exact parent extraction from raw bytes;
7. the exact development-to-reality edge producing `later-in-time`;
8. deterministic `proof_identity` derivation from the closed preimage;
9. repeated identical proofs produce identical `proof_identity`;
10. mismatched, missing, malformed, or caller-invented `proof_identity` fails closed;
11. semantic proof mutation changes the identity or fails validation;
12. foreign but structurally valid Git objects are rejected as unbound;
13. wrong tree/raw-content digest/object SHA is rejected;
14. caller replacement/extension/reordering of the admission binding is rejected;
15. reversed, extra, duplicate, cyclic, missing, or unrelated chains fail closed or remain `chronology-unproven` as specified;
16. timestamps, PR numbers, repository labels, SHA strings, and booleans cannot create membership/chronology;
17. exact role-to-source mapping for development and reality-check records;
18. swapped role/source combinations fail closed;
19. `source_repository_commit`, `source_tree_identity`, and `source_raw_content_sha256` exactly equal validated binding/proof identities;
20. `corpus_digest` exactly equals the digest of the admitted raw commit-content bytes and cannot be caller-selected;
21. deterministic `case_evidence_identity` recomputation from its closed preimage;
22. deterministic `admission_identity` recomputation from the complete closed record preimage;
23. mismatched/missing/malformed/caller-invented case or admission identities fail closed;
24. changing source, corpus, role, case, chronology, contamination, overlap, benchmark, or protocol semantics changes the corresponding identity or fails validation;
25. development/reality corpus and case identities cannot alias;
26. `unknown` contamination/overlap remains distinct;
27. object-key reordering is identity-neutral while array order remains semantic;
28. caller-mutation independence and deep freeze;
29. no participant/model/provider/reviewer/evaluator/tool/agent execution;
30. no global score, statistics, ranking, promotion, winner/default, broad benchmark completion, release, or project-completion output.

These proofs establish only the bounded P2-R6 contract, not general/public KodacBench completeness.

## 10. Explicit non-grants

This authorization does not authorize:

- benchmark participant execution;
- provider/model/reviewer/evaluator/tool/agent invocation;
- Git invocation, `.git` reads, filesystem lookup/output, network, secrets, subprocess, sandbox, remote repository lookup, or side effects by P2-R6 logic;
- any source outside the exact two-object canonical admission binding;
- KRI-R1 import/mutation or historical P2/P3 mutation;
- external dataset/donor intake;
- new dependencies, package/lockfile/workflow changes;
- persistence, telemetry, analytics, upload, training, fine-tuning, online or cross-repository learning;
- whole-review finding-generation measurement;
- holdout sufficiency, representativeness, unbiasedness, contamination freedom, statistical validity, significance, confidence, or effect-size policy;
- cross-task-family blended score;
- N-way comparison, ranking, leaderboard, winner/default, promotion, donor replacement, or public superiority claims;
- P2 overall closure, general/public KodacBench completion, P2-R7+ implementation;
- P3 overall closure/promotion, P3-R18+ implementation, P4-P8 implementation;
- K2/K5/Done Gate/`PROVEN_READY` expansion;
- public release, package publication, brand launch, production-readiness or project-completion claim;
- ruleset change or bypass.

```text
WAIVER = NO
```

## 11. Material review repair history

All repairs are forward-only inside this one authorized path. Every byte change invalidates predecessor-head CI/review qualification evidence.

### Initial candidate

```text
HEAD = ad1a66483bd972b1a82a4d32dd833237c3c099e8
TREE = baa62bdefb1ae3c84ad7d27ebeae01b90fbf7cdb
AUTHORIZATION_BLOB = fea3064bb7908cf0bdca95855176ea60ae6a75ba
```

CodeRabbit `5530930105`: material defect — objective Git ancestry was required but no closed pure proof object existed.

### First repair

```text
HEAD = 4598031bef5bfc05219f528f81ed6c653024b476
TREE = baa4625c20d77fae9f4dcbfb421644d856b019c3
AUTHORIZATION_BLOB = ab7448aaa6aa4c7a950491c9346527acac12ba74
```

CodeRabbit `5531013980`: material defect — Git object integrity + ancestry did not independently bind objects to canonical Kodac membership.

### Second repair

```text
HEAD = 8db46ef879d950296f925f6d399e72a78239404a
TREE = 4a50256b9e94d8183e0c2648ace36bfac41cc1a1
AUTHORIZATION_BLOB = f98a7d0841359f3c7d24e71e15dccc984a120d7c
```

This fixed membership using the immutable two-object binding. CodeRabbit review comment `3928074255` found a third material defect — `proof_identity` had no closed preimage/canonicalization/recomputation/equality rule. The same review confirmed the two predecessor material findings were closed.

### Third repair

```text
HEAD = a4165affb94b276659502c90d92f0bc91ed69207
TREE = 06d053db2477806bbb342a50715169415cbc48fd
AUTHORIZATION_BLOB = f8ac6d0ca67c9f381e64152e7898f071d4f3ae7e
```

This closed the proof-identity contract. Cubic comment `5531425875` found a fourth material defect — the admission record still lacked exact equality/derivation rules tying source, corpus, case-evidence, and admission identities to the validated proof and immutable binding.

### Current repair

This revision closes the fourth defect by defining the exact admission declaration and record key sets; fixed role-to-source mapping; mandatory source/tree/raw-content equality; `corpus_digest` as the exact admitted raw commit-content digest; and closed self-reference-free canonical SHA-256 derivations for both `case_evidence_identity` and `admission_identity`. Serialized records must recompute both identities and all source/provenance equalities from scratch.

No predecessor-head review or CI result qualifies this current revision. Semantic quorum remains reset to `0 / 2` until fresh independent substantive terminal-clean reviews are submitted on the exact current head and current metadata.

## 12. Required implementation evidence

The later implementation PR must create:

```text
docs/planning/KODAC_P2_R6_REPOSITORY_HISTORY_CORPUS_ADMISSION_EVIDENCE_2026-09-03.md
```

It must bind the canonical authorization merge/proof; implementation base/head/tree; exact allowlist and blobs; binding/proof/admission identities; fixture source identities; deterministic tests; Governance/K2 identities; two independent substantive exact-head/current-metadata semantic review channels; zero actionable findings/threads; active no-bypass ruleset; guarded merge; mandatory post-merge parent/tree/blob/signature/check proof; limitations and non-grants.

Candidate-time evidence must not claim future canonical closure.

## 13. Authorization qualification gate

This one-path candidate may merge only when one frozen exact head proves:

```text
PULL_REF == BRANCH_REF == EXACT_HEAD
BASE == CURRENT_CANONICAL_MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
AUTHORIZATION_BLOB = FROZEN EXACT IDENTITY
CURRENT_HEAD DESCENDS FROM 4598031bef5bfc05219f528f81ed6c653024b476
4598031bef5bfc05219f528f81ed6c653024b476 PARENT INCLUDES ad1a66483bd972b1a82a4d32dd833237c3c099e8
APPLICABLE REQUIRED CI = TERMINAL SUCCESS OR CANONICALLY PROVEN NON-APPLICABLE
INDEPENDENT SUBSTANTIVE SEMANTIC REVIEW = 2 / 2 TERMINAL CLEAN ON EXACT HEAD AND CURRENT METADATA
UNRESOLVED MATERIAL/MINOR ACTIONABLE FINDINGS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET 20707483 = ACTIVE / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Historical comments, summaries, service errors, billing/rate-limit responses, unsubmitted analyses, self-review, stale heads, or duplicate same-provider channels never count. Any repository-byte, head, base, or current-relevant metadata movement invalidates prior qualification.

## 14. Guarded merge and mandatory post-merge proof

Merge must be a normal history-preserving merge using the exact qualified `expected_head_sha`.

Before P2-R6 implementation authority becomes effective, post-merge proof must establish:

- protected `main` equals the returned merge SHA;
- ordered merge parents are pre-merge canonical main then exact qualified authorization head;
- merge tree equals the qualified tree;
- authorization blob on `main` equals the qualified blob;
- merge verification is `verified / valid`;
- exact qualified second parent descends from `4598031bef5bfc05219f528f81ed6c653024b476`;
- `4598031bef5bfc05219f528f81ed6c653024b476` has exact parent `ad1a66483bd972b1a82a4d32dd833237c3c099e8`;
- applicable post-merge checks succeed, with non-applicability represented honestly;
- PR #316 is merged;
- ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never`;
- `WAIVER=NO`.

Only after that proof may repository state be described as:

```text
P2-R6 REPOSITORY-HISTORY CORPUS ADMISSION IMPLEMENTATION = AUTHORIZED
```

## 15. Boundary after successful P2-R6 implementation

Successful P2-R6 implementation may establish only the fixed two-object local Git-history admission/provenance/chronology mechanism above. It does not close P2 overall or authorize participant execution by composition.

After implementation and any required reconciliation are canonical, fresh successor analysis must determine the next minimum unit. No P2-R7 semantic slice is inferred by numbering alone.
