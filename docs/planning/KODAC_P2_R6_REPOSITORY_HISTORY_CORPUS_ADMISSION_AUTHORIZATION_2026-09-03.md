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

This candidate is justified by the fresh successor analysis after canonical P3 post-closeout reconciliation:

```text
P3_POST_CLOSEOUT_RECONCILIATION_PROOF = #315 / 5530804202
SUCCESSOR_ANALYSIS = #315 / 5530859993
```

Governing repository records include root `AGENTS.md`, `docs/roadmap/NEXT.md`, ADR-0010, the intelligence master plan, final gap review, canonical P2 R1-R5 closeout evidence, canonical P3 R1-R17 closeout evidence, and KRI-R1/KRI-R4 evidence as precedent only.

Live GitHub and any more-specific later canonical record override this candidate.

## 2. Observed gap and minimum unit

Canonical P2-R1 through P2-R5 provide a deterministic measurement/evidence spine:

```text
P2-R1 = SYNTHETIC FROZEN FIXTURE / MANIFEST CONTRACT
P2-R2 = CALLER-MATERIALIZED OBSERVATION REPORT
P2-R3 = TASK-FAMILY REDUCTION / MISSINGNESS SUMMARY
P2-R4 = CONTROLLED PAIRWISE RAW COMPARISON
P2-R5 = PER-METRIC DIRECTIONAL RELATION
```

They intentionally do not establish repository-history corpus admission or benchmark participant execution. The accepted plan requires a frozen reproducible corpus plus a versioned later-in-time reality-check lane before broad quality claims. Direct participant execution remains unauthorized.

Therefore the minimum next unit is:

```text
P2-R6 = BOUNDED REPOSITORY-HISTORY GIT-OBJECT CORPUS ADMISSION + CHRONOLOGY / PROVENANCE BINDING
```

It is not P3-R18, P4, participant execution, a general corpus, or public KodacBench completion.

## 3. Authorization-unit changed-file set

This authorization PR may change exactly one path:

```text
docs/planning/KODAC_P2_R6_REPOSITORY_HISTORY_CORPUS_ADMISSION_AUTHORIZATION_2026-09-03.md
```

No second path is authorized.

## 4. Future implementation allowlist

Only after this exact authorization becomes canonical and post-merge proven, exactly one bounded P2-R6 implementation PR may modify only:

```text
packages/kodac-runtime/bench/p2-r6/**
packages/kodac-runtime/test/p2-r6-*.test.ts
packages/kodac-runtime/test/fixtures/p2-r6/**
docs/planning/KODAC_P2_R6_REPOSITORY_HISTORY_CORPUS_ADMISSION_EVIDENCE_2026-09-03.md
```

No historical P2-R1 through P2-R5 source/test/evidence byte may change. No KRI-R1 corpus byte may change. No current roadmap/status view, workflow, package manifest, lockfile, dependency, external schema, provider/model adapter, persistence, product, release, or ruleset path is authorized.

If implementation requires any additional path, stop and create separate canonical authority.

## 5. P2-R6 objective

Implement the smallest pure deterministic local contract that can admit a fixed, canonically authorized set of Kodac Git objects as bounded development/reality-check evidence without executing any benchmark participant.

The implementation must establish a versioned admission record capable of binding at minimum:

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

No field may encode execution, ranking, promotion, release, or completion authority.

## 6. Exact initial source class

The initial P2-R6 implementation may admit exactly one source class:

```text
CANONICAL_ADMISSION_BOUND_GIT_COMMIT_OBJECT
```

No PR-review finding, KRI corpus case, arbitrary repository fixture, external dataset, donor source, or caller-selected Git object is admitted by this slice.

KRI-R1 remains immutable precedent only. Its four cases are not imported, rewritten, relabeled, or represented as sufficient/general evidence by P2-R6.

## 7. Closed canonical-admission and chronology boundary

P2-R6 must not trust a caller-supplied repository label or Git SHA as evidence that an object belongs to Kodac. Repository membership for this bounded initial slice comes only from the exact canonical-admission binding defined below.

### 7.1 Canonical admission binding v1

The following object is a governance constant of this authorization, not caller input:

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

Using canonical sorted-key JSON serialization with no insignificant whitespace, the required binding identity is:

```text
CANONICAL_ADMISSION_BINDING_IDENTITY = sha256:fdf839d5923765b0149edf33ad679e63039a55e04d5968674a3042985d4a268d
```

The later implementation must embed this exact binding as immutable P2-R6-owned policy. It must not accept a caller replacement, extension, alternate repository label, additional commit, additional tree, or additional raw-content digest.

The two admitted commits are already present in the history of the PR #316 authorization branch. P2-R6 implementation authority becomes effective only after a normal history-preserving merge of a descendant final PR #316 head and mandatory post-merge proof. That proof must establish that the canonical merge's second parent descends from `4598031bef5bfc05219f528f81ed6c653024b476`, which itself has parent `ad1a66483bd972b1a82a4d32dd833237c3c099e8`. Only then may this canonical authorization bind those exact object identities as Kodac-owned admissible inputs.

This is a governance-bound local membership assertion for exactly these identities. It is not a general remote-repository authentication mechanism and does not authorize arbitrary Kodac-history intake.

### 7.2 Chronology proof scheme

The initial and only chronology-proof scheme is:

```text
git-commit-ancestry-object-chain/v1
```

A later scheme requires separate canonical authority.

The pure P2-R6 function must receive chronology evidence as an explicit caller-materialized proof object with a versioned schema equivalent to:

```text
schema_version = p2-r6-git-ancestry-proof/v1
canonical_admission_binding_identity = sha256:fdf839d5923765b0149edf33ad679e63039a55e04d5968674a3042985d4a268d
development_anchor_commit = ad1a66483bd972b1a82a4d32dd833237c3c099e8
reality_check_anchor_commit = 4598031bef5bfc05219f528f81ed6c653024b476
commit_chain = ordered array containing exactly those two commit proof entries
proof_identity = sha256:<64 lowercase hex>
```

Each commit proof entry must bind exactly:

```text
commit_sha
raw_commit_content_base64
parent_commit_shas
```

`raw_commit_content_base64` is canonical base64 of the exact Git commit **content bytes only**, excluding Git object framing.

### 7.3 Required object validation

For every commit proof entry, the implementation must:

1. reject malformed/non-canonical base64;
2. decode the exact raw content bytes;
3. compute SHA-256 of those raw content bytes and require an exact match to the corresponding `raw_commit_content_sha256` in the immutable admission binding;
4. reconstruct Git framing as `"commit " + decimal_byte_length(raw_content) + NUL + raw_content`;
5. recompute the SHA-1 Git object ID and require it to equal `commit_sha`;
6. parse exactly one canonical `tree <40-lowercase-hex>` header from the raw bytes and require it to equal the corresponding `tree_sha` in the immutable admission binding;
7. parse every `parent <40-lowercase-hex>` header in encounter order from the raw bytes;
8. require parsed parents to equal caller `parent_commit_shas` exactly and in order;
9. require `commit_sha`, parsed tree SHA, and raw-content SHA-256 all to match one and only one immutable admission-binding entry;
10. reject every object not present in that binding.

A caller cannot make an object admissible by setting `source_repository`, `commit_sha`, `tree_sha`, a boolean, a label, or a parent array. All three immutable identities—Git commit SHA-1, tree SHA-1, and raw-content SHA-256—must bind to the canonical admission set.

### 7.4 Commit-header and chain validation

The raw commit object must have an unambiguous Git header/body boundary. Continuation lines may only continue a preceding Git header field and may never become parent declarations. Malformed, truncated, duplicate, conflicting, non-canonical, or ambiguous tree/parent declarations fail closed.

The exact authorized chain is:

```text
commit_chain.length == 2
commit_chain[0].commit_sha == ad1a66483bd972b1a82a4d32dd833237c3c099e8
commit_chain[1].commit_sha == 4598031bef5bfc05219f528f81ed6c653024b476
commit_chain[0].commit_sha is present in the exact parsed parents of commit_chain[1]
all commit_sha values are distinct
```

No intermediate or alternate commit is authorized. An unrelated, reversed, duplicate, cyclic, missing, or extra chain element fails closed.

### 7.5 Chronology result

Only the exact fully validated two-object chain above may produce:

```text
chronology_status = later-in-time
```

Any absent, invalid, incomplete, conflicting, unbound, reversed, or extended proof yields `chronology-unproven`; it must never be silently upgraded. A caller request/assertion that such evidence is `later-in-time` must fail closed.

```text
COMMIT TIMESTAMP != CHRONOLOGY PROOF
PR NUMBER != CHRONOLOGY PROOF
SHA STRING ALONE != CHRONOLOGY PROOF
CALLER BOOLEAN / LABEL != CHRONOLOGY PROOF
VALID GIT OBJECT CHAIN WITHOUT ADMISSION BINDING != KODAC MEMBERSHIP
```

### 7.6 No hidden repository access

P2-R6 logic must not invoke Git, read `.git`, traverse the filesystem, spawn a subprocess, use GitHub/API/network access, or call a provider/tool/agent to establish membership or chronology. It evaluates only the immutable embedded admission binding plus caller-materialized proof bytes.

Small committed P2-R6 fixtures may contain exact base64 raw commit-content bytes for the two admitted identities solely to prove this bounded contract.

The binding and proof establish only literal, canonically authorized local object membership and one bounded ancestry relation. They do not establish remote authentication, signature validity, statistical independence, representativeness, contamination freedom, holdout sufficiency, or benchmark quality.

## 8. Provenance, overlap and contamination

The implementation must keep literal provenance separate from quality claims and distinguish at minimum:

```text
contamination_status = none-known | known | unknown
overlap_status = none-known | known | unknown
chronology_status = later-in-time | chronology-unproven
```

`unknown` must never normalize to `none-known`. Canonical admission or valid ancestry must never be relabeled as contamination freedom, unbiasedness, representativeness, holdout sufficiency, or statistical validity.

Development and reality-check case identities must not alias. Duplicate/conflicting source or case identities fail closed.

## 9. Determinism and hostile-input rules

The implementation must be pure/in-memory and deterministic. It may reuse canonical P2-R1 canonical JSON/SHA-256 helpers and Node's already-used `node:crypto` capability but must not mutate P2-R1.

It must fail closed on unknown/missing fields, caller attempts to alter the canonical-admission binding, duplicate identities, invalid SHA-1/SHA-256, malformed base64, Git object hash mismatch, raw-content digest mismatch, tree mismatch, parent mismatch, extra/unbound commit objects, incomplete/reversed/cyclic chains, non-canonical strings, non-JSON values, non-finite numbers, sparse arrays, accessors/getters, proxies, cycles, caller mutation after derivation, and injected ranking/promotion/execution authority fields.

For semantically identical canonical inputs, output bytes, binding/proof identities, and admission identity must be deterministic across repeated runs and supported operating systems.

## 10. Required initial fixture proof

The later implementation must demonstrate at least:

1. exact canonical-admission binding identity recomputation;
2. exact admission of only the two bound commits;
3. exact raw-content SHA-256 checks;
4. exact Git SHA-1 object-ID recomputation;
5. exact tree extraction and binding;
6. exact parent extraction from raw bytes;
7. the authorized direct development-to-reality edge producing `later-in-time`;
8. foreign but structurally valid Git objects rejected as unbound;
9. wrong tree/raw-content digest/object SHA rejected;
10. caller replacement/extension of the admission binding rejected;
11. reversed, extra, duplicate, cyclic, missing, or unrelated chain evidence rejected or preserved as `chronology-unproven` as applicable;
12. timestamps, PR numbers, repository labels, SHA strings, and booleans do not create membership/chronology;
13. `unknown` contamination/overlap remains distinct;
14. deterministic repeated output and object-key-order independence;
15. caller-mutation independence / deep freeze;
16. no participant/model/provider/reviewer/evaluator/tool/agent execution;
17. no global score, statistics, ranking, promotion, winner/default, broad benchmark completion, release, or completion output.

These fixtures prove only this bounded contract. They do not establish general/public KodacBench completeness.

## 11. Explicit non-grants

This authorization does not authorize:

- any benchmark participant execution;
- provider/model/reviewer/evaluator/tool/agent invocation;
- Git invocation, `.git` reads, filesystem lookup/output, network, secrets, subprocess, sandbox, remote repository lookup, or side effects by P2-R6 logic;
- any source outside the two-object canonical admission binding above;
- KRI-R1 import/mutation or historical P2/P3 mutation;
- external dataset/donor intake;
- new dependencies, package/lockfile/workflow changes;
- persistence, telemetry, analytics, upload, training, fine-tuning, online or cross-repository learning;
- whole-review finding generation measurement;
- holdout sufficiency, representativeness, unbiasedness, contamination freedom, or statistical validity;
- thresholds, tolerance, significance, confidence, effect-size policy;
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

## 12. Material review repair history

The authorization has preserved forward-only repair history.

### Initial candidate

```text
HEAD = ad1a66483bd972b1a82a4d32dd833237c3c099e8
TREE = baa62bdefb1ae3c84ad7d27ebeae01b90fbf7cdb
AUTHORIZATION_BLOB = fea3064bb7908cf0bdca95855176ea60ae6a75ba
```

CodeRabbit comment `5530930105` found a material defect: objective Git ancestry was required but no closed proof object was defined for the pure/no-Git/no-network implementation.

### First repair

```text
HEAD = 4598031bef5bfc05219f528f81ed6c653024b476
TREE = baa4625c20d77fae9f4dcbfb421644d856b019c3
AUTHORIZATION_BLOB = ab7448aaa6aa4c7a950491c9346527acac12ba74
```

This defined raw Git-object verification and a closed ancestry chain. CodeRabbit comment `5531013980` found a second material defect: object integrity + ancestry did not independently bind those objects to canonical Kodac membership.

### Current repair

This revision closes the second defect by narrowing the initial source class to exactly two Git commit objects and defining an immutable canonical-admission binding over exact commit SHA-1, tree SHA-1, and raw-content SHA-256 identities. The runtime contract cannot expand that set from caller input.

All CI/review evidence on predecessor heads is historical only and may not count toward final qualification.

## 13. Required implementation evidence

The later implementation PR must create:

```text
docs/planning/KODAC_P2_R6_REPOSITORY_HISTORY_CORPUS_ADMISSION_EVIDENCE_2026-09-03.md
```

It must bind this canonical authorization merge/proof; implementation base/head/tree; exact allowlist and blobs; binding/proof identities; exact fixture source identities; deterministic tests; Governance/K2 identities; two independent substantive exact-head semantic review channels; zero actionable findings/threads; active no-bypass ruleset; guarded merge; mandatory post-merge parent/tree/blob/signature/check proof; limitations and non-grants.

Candidate-time evidence must not claim future canonical closure.

## 14. Authorization qualification gate

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
INDEPENDENT SUBSTANTIVE SEMANTIC REVIEW = 2 / 2 TERMINAL CLEAN ON EXACT HEAD/CURRENT METADATA
UNRESOLVED MATERIAL/MINOR ACTIONABLE FINDINGS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET 20707483 = ACTIVE / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Any repository-byte, head, base, or current-relevant metadata movement invalidates prior qualification.

## 15. Guarded merge and mandatory post-merge proof

Merge must be a normal history-preserving merge using the exact qualified `expected_head_sha`.

Before P2-R6 implementation authority becomes effective, post-merge proof must establish:

- protected `main` equals the returned merge SHA;
- ordered merge parents are pre-merge canonical main then the exact qualified authorization head;
- merge tree equals the qualified tree;
- authorization blob on main equals the qualified blob;
- merge verification is `verified / valid`;
- the exact qualified second parent descends from `4598031bef5bfc05219f528f81ed6c653024b476`;
- `4598031bef5bfc05219f528f81ed6c653024b476` has `ad1a66483bd972b1a82a4d32dd833237c3c099e8` as its exact parent;
- applicable post-merge checks succeed, with non-applicability represented honestly;
- PR is merged;
- ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never`;
- `WAIVER=NO`.

Only after that proof may repository state be described as:

```text
P2-R6 REPOSITORY-HISTORY CORPUS ADMISSION IMPLEMENTATION = AUTHORIZED
```

## 16. Boundary after successful P2-R6 implementation

Successful P2-R6 implementation may establish only the fixed two-object local Git-history admission/provenance/chronology mechanism above. It does not close P2 overall or authorize participant execution by composition.

After implementation and any required reconciliation are canonical, fresh successor analysis must determine the next minimum unit. No P2-R7 semantic slice is inferred by numbering alone.
