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

The source must be independently bound to immutable repository identities such as exact commit/tree/blob identities and, when applicable, PR/comment/review identifiers.

P2-R6 may reference existing immutable KRI-R1 evidence by exact identity, including the canonical current KRI-R1 corpus:

```text
PATH = packages/kodac-runtime/test/fixtures/kri-r1/corpus.json
BLOB = a308729f00f6c96894d66555127c3dd3ab592d32
CORPUS_IDENTITY = e3f87d5e008918043da4f10617aa479d0d5e4b9fcde42143bc691763f503c4d4
CASE_COUNT = 4
```

That input is immutable. P2-R6 must not rewrite it, expand its claimed semantics, or represent four KRI-R1 cases as sufficient reviewer qualification or general KodacBench coverage.

No external benchmark/dataset download, donor intake, web retrieval, API ingestion, or third-party corpus copy is authorized.

## 7. Chronology requirements

P2-R6 must use a deterministic chronology scheme grounded in immutable repository history rather than local wall-clock time.

A valid chronology anchor must be tied to a canonical Git/history identity whose ordering is objectively provable, for example an ancestor/descendant commit relation or another explicitly validated monotonic repository-history scheme.

A reality-check case or corpus may be called `later-in-time` only when its source chronology is strictly after the development freeze anchor under the same scheme.

```text
LATER COMMIT TIMESTAMP STRING != LATER-IN-TIME PROOF
PR NUMBER ORDER != GIT CHRONOLOGY PROOF
SEPARATE CORPUS != LATER-IN-TIME PROOF
DESCENDANT / VALIDATED MONOTONIC HISTORY MAY SUPPORT LATER-IN-TIME
CHRONOLOGY UNPROVEN = FAIL CLOSED FOR LATER-IN-TIME CLAIM
```

P2-R6 does not claim that a later-in-time repository artifact is statistically independent, representative, uncontaminated, or sufficient.

## 8. Provenance, overlap and contamination

The implementation must keep literal source provenance separate from stronger quality claims.

At minimum it must distinguish:

```text
contamination_status = none-known | known | unknown
overlap_status = none-known | known | unknown
chronology_status = later-in-time | not-later-in-time | chronology-unproven
```

Equivalent closed vocabularies are permitted if they preserve these distinctions exactly.

`unknown` must never be normalized to `none-known`. Literal repository provenance must never be relabeled as contamination freedom, unbiasedness, representativeness, holdout sufficiency, or statistical validity.

Development and reality-check case identities must not silently alias. Duplicate/conflicting source identities or case identities fail closed.

## 9. Determinism and hostile-input rules

The implementation must be pure/in-memory and deterministic. It may reuse canonical P2-R1 canonical JSON / SHA-256 helpers by import but must not mutate P2-R1.

It must fail closed on malformed or ambiguous inputs, including where applicable:

- unknown/missing keys;
- duplicate case/source identities;
- contradictory role/provenance/chronology declarations;
- invalid SHA/commit/blob identities;
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

For semantically identical canonical inputs, output bytes and `admission_identity` must be identical across repeated runs and supported operating systems.

## 10. Required initial fixture proof

The implementation may create only small P2-owned local fixtures needed to prove the admission contract. Fixtures may include exact immutable references to canonical repository-history evidence.

The initial proof must demonstrate at least:

1. one admitted development source;
2. one separately admitted reality-check source;
3. a proven chronology relation under one explicit repository-history scheme;
4. exact source Git/blob/record identity binding;
5. deterministic corpus/admission identity;
6. duplicate/alias rejection;
7. chronology-unproven rejection for a `later-in-time` claim;
8. `unknown` contamination/overlap preservation;
9. source mutation changes the admission identity or fails validation;
10. existing KRI-R1 bytes remain unchanged if referenced;
11. no participant/model/provider/evaluator/tool/agent execution occurs;
12. no global score, ranking, promotion, winner/default, statistics, or broad benchmark completion field is emitted.

These fixtures prove contract behavior and bounded repository-history admission only. They do not by themselves establish general/public KodacBench completeness.

## 11. Explicit non-grants

This authorization does not authorize:

- benchmark participant execution;
- provider/model/reviewer/evaluator/tool/agent invocation;
- network, secret, subprocess, sandbox, filesystem-output, or other side-effect execution by P2-R6 benchmark logic;
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

## 12. Required implementation evidence

The later implementation PR must create:

```text
docs/planning/KODAC_P2_R6_REPOSITORY_HISTORY_CORPUS_ADMISSION_EVIDENCE_2026-09-03.md
```

The evidence record must bind:

- this canonical authorization merge and post-merge proof;
- implementation base/head/tree;
- exact allowlist realization and final blobs;
- source corpus/artifact identities used by fixtures;
- exact deterministic test results;
- Governance and K2 qualification identities;
- at least two distinct independent substantive exact-head semantic review channels;
- zero unresolved actionable findings/threads;
- active ruleset/no-bypass proof;
- guarded expected-head merge conditions;
- post-merge parent/tree/blob/signature/applicable-check proof;
- limitations and all preserved non-grants.

Candidate-time evidence must not claim future canonical closure.

## 13. Authorization-candidate qualification gate

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

## 14. Guarded merge and post-merge proof

Merge must be a normal history-preserving guarded merge using the exact qualified `expected_head_sha`.

Before P2-R6 implementation authority becomes effective, mandatory post-merge proof must establish:

- protected `main` equals the returned merge SHA;
- ordered parents are pre-merge canonical main then exact qualified authorization head;
- merge tree equals the qualified tree;
- authorization blob on `main` equals the qualified blob;
- GitHub merge verification is `verified / valid`;
- applicable post-merge checks succeed, with K2 push non-applicability represented honestly when path filters exclude the docs-only merge;
- PR is merged;
- ruleset `20707483` remains active/no-bypass;
- `WAIVER=NO`.

Only after that proof may repository state be described as:

```text
P2-R6 REPOSITORY-HISTORY CORPUS ADMISSION IMPLEMENTATION = AUTHORIZED
```

## 15. Boundary after successful P2-R6 implementation

Successful P2-R6 implementation may establish only a canonical local repository-history corpus-admission/provenance/chronology mechanism.

It does not close P2 overall or authorize benchmark execution by composition.

After its implementation and any required current-view reconciliation are canonical, fresh successor analysis must determine whether the next minimum unit is additional corpus coverage, participant execution authorization, evaluator/result attestation, context-specific measurement, or another evidence gap.

No P2-R7 semantic slice is inferred by numbering alone.
