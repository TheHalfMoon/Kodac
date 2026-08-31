# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records always win.

## Canonical truth anchors

```text
K6 bounded closeout       = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout       = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3-R1 implementation      = PR #252 / ba3caabef0b36649a1d556ff287237ca2a455ab2
P3-R1 reconciliation      = PR #253 / f0b18b3d6be10818195e2aef9f3d4123a2b9d3a2
P3-R2 implementation      = PR #256 / 458f62e85f4af2e13bfd78f5a6c3582d9330c911
P3-R2 reconciliation      = PR #257 / ecee96c1a0d4bf73c5d41b369edfa9950ae1ea0c
P3-R3 implementation      = PR #260 / cd7c28b4f823e9570daf73448c5f3b9b9b540d2e
P3-R3 reconciliation      = PR #261 / 0d26a7b7225c4ccc48a52b137ca526684a37d974
P3-R4 implementation      = PR #264 / ad63bab64512f8ac24c0f849b58b64ecf41a8709
P3-R4 reconciliation      = PR #265 / ff6682d0266b44dcc25c7d1100a7af9519ad26e6
P3-R5 implementation      = PR #267 / ae8a8d46f529a6782e39e3ae1787220cef603b8f
P3-R5 reconciliation      = PR #268 / f5be14e44abe1d9d3c85f77c36c1af0fa557e2cc
P3 bounded closeout auth   = PR #269 / cce6b1aab6d5c2909728ad80133718cfd97b4897
Improvement master plan   = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

P3 bounded-closeout authorization proof:

```text
AUTHORIZATION_QUALIFIED_HEAD = 6e0d5c94aca116a6904bef458209fed931d870c3
AUTHORIZATION_QUALIFIED_TREE = 4b4fc143cecf5d754494aa1748135b7f4a2693c7
AUTHORIZATION_BLOB = f5894f1a8ec3af39e54f2997865f534e196e30e8
AUTHORIZATION_MERGE = cce6b1aab6d5c2909728ad80133718cfd97b4897
AUTHORIZATION_MERGE_PARENT_1 = f5be14e44abe1d9d3c85f77c36c1af0fa557e2cc
AUTHORIZATION_MERGE_PARENT_2 = 6e0d5c94aca116a6904bef458209fed931d870c3
AUTHORIZATION_MERGE_TREE = 4b4fc143cecf5d754494aa1748135b7f4a2693c7
AUTHORIZATION_VERIFICATION = verified / valid
PRE_MERGE_GOVERNANCE = 33360478597 / SUCCESS
PRE_MERGE_K2 = 33360478582 / classifier + stable gate SUCCESS / runtime SKIPPED AS DOCS-ONLY
POST_MERGE_GOVERNANCE = 33360736529 / SUCCESS
POST_MERGE_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
SEMANTIC_REVIEW_QUORUM = CodeRabbit + Codex / exact-head clean
UNRESOLVED_ACTIONABLE_THREADS = 0
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The authorization merge is GitHub-signed and valid. Its ordered parents are the pre-authorization canonical `main` followed by the exact qualified authorization head, its merge tree equals the qualified tree, and the authorization blob on canonical `main` equals the qualified candidate blob.

## Current milestone state

| Milestone / gate | Current state | Authority boundary |
| --- | --- | --- |
| K0/K1 | **CLOSED** | Historical completed foundation |
| K2 | **CLOSED** | Trusted side-effect execution boundary remains unchanged |
| K3 | **CLOSED for canonical K3-R1 through K3-R6 bounded scope** | K3-R7+ not authorized |
| KRI-R1 through KRI-R4 | **CANONICAL / COMPLETE** | KRI-R5+ not authorized |
| K4 | **CLOSED for canonical K4-R1 through K4-R5 bounded data-only scope** | K4-R6+ not authorized |
| K5 | **CLOSED for canonical K5-R1 through K5-R5 bounded proof-review scope** | Done Gate unchanged |
| K6 | **CLOSED_CANONICAL for bounded R1-R5 scope** | No execution/persistence/learning/promotion authority by composition |
| P2-R1 through P2-R5 | **CLOSED_CANONICAL** | Deterministic bounded measurement/evidence spine |
| P2 bounded R1-R5 closeout | **CLOSED_CANONICAL** | General/public KodacBench remains open |
| P2 overall | **OPEN** | General/public KodacBench is not closed |
| P2-R6+ | **NOT_AUTHORIZED** | Separate justified authorization required if broader semantics are later needed |
| P3-R1 | **CLOSED_CANONICAL** | Deterministic context-selection-plan foundation only |
| P3-R2 | **CLOSED_CANONICAL** | Caller-declared deterministic policy-application mechanism only |
| P3-R3 | **CLOSED_CANONICAL** | Pairwise seven-metric evidence binding and comparability state only |
| P3-R4 | **CLOSED_CANONICAL** | Literal benchmark-provenance evidence binding only |
| P3-R5 | **CLOSED_CANONICAL** | Caller-declared criterion-match evidence only |
| P3 bounded R1-R5 closeout | **CONDITIONAL ON THIS EXACT SIX-PATH CANDIDATE MERGE + POST-MERGE PROOF** | Exact authority is PR #269 / `cce6b1aab6d5c2909728ad80133718cfd97b4897` |
| P3 overall | **OPEN** | No repository-owned default/promotion, benchmark execution, or public quality claim established |
| P3-R6+ | **NOT_AUTHORIZED** | No R6 requirement or implementation authority is inferred from R1-R5 closure |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

Engineering milestone state is separate from public release status.

## Bounded P3 R1-R5 result

The five canonical slices form a deterministic evidence spine only:

```text
R1 = deterministic context-selection-plan foundation
R2 = deterministic caller-declared context-selection-policy application
R3 = pairwise seven-metric evidence binding and comparability-only state
R4 = literal benchmark-provenance evidence binding
R5 = caller-declared criterion-match evidence
```

The exact closeout evidence record binds canonical authorization/implementation/reconciliation ancestry, qualified heads/trees/blobs, applicable CI proof, material repair/failure/service history, and cross-slice non-grants:

`docs/planning/KODAC_P3_BOUNDED_R1_R5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-31.md`

Composition remains non-decisional:

```text
INTELLIGENCE != AUTHORITY
MORE CONTEXT != BETTER CONTEXT
DETERMINISTIC PLAN != BETTER CONTEXT STRATEGY
CALLER POLICY != REPOSITORY POLICY
PAIRWISE METRIC EVIDENCE != GLOBAL WINNER
LITERAL PROVENANCE != HOLDOUT SUFFICIENCY
LATER-IN-TIME != SUFFICIENT HOLDOUT
NONE-KNOWN != PROVEN UNCONTAMINATED
HOLDOUT ROLE != UNBIASED
COMPARABLE != STATISTICALLY SIGNIFICANT
FAVORED METRIC RELATION != GLOBAL SUPERIORITY
CALLER-DECLARED CRITERIA MATCH != REPOSITORY WINNER / DEFAULT / PROMOTION
P3 BOUNDED R1-R5 CLOSED != P3 OVERALL CLOSED
P3 BOUNDED R1-R5 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P3 BOUNDED R1-R5 CLOSED != REAL BENCHMARK TASK EXECUTION
P3 BOUNDED R1-R5 CLOSED != P3-R6+ AUTHORITY
P3 BOUNDED R1-R5 CLOSED != P4 AUTHORITY
```

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1 deterministic context selection plan foundation [CLOSED_CANONICAL]
   -> R1 roadmap/status reconciliation [CLOSED_CANONICAL]
   -> R2 declared context-selection policy application [CLOSED_CANONICAL]
   -> R2 roadmap/status reconciliation [CLOSED_CANONICAL]
   -> R3 pairwise metric-evidence binding [CLOSED_CANONICAL]
   -> R3 roadmap/status reconciliation [CLOSED_CANONICAL]
   -> R4 benchmark-provenance evidence binding [CLOSED_CANONICAL]
   -> R4 roadmap/status reconciliation [CLOSED_CANONICAL]
   -> R5 declared context-policy qualification evidence authorization [CLOSED_CANONICAL]
   -> R5 implementation [CLOSED_CANONICAL]
   -> R5 roadmap/status reconciliation [CLOSED_CANONICAL]
   -> bounded R1-R5 closeout authorization [CLOSED_CANONICAL]
   -> bounded R1-R5 closeout [CURRENT SIX-PATH DOCS/EVIDENCE CANDIDATE]
   -> next bounded P3 definition / planning / authorization-candidate work [ONLY AFTER SUCCESSFUL CLOSEOUT]
   -> P3-R6+ implementation [NOT_AUTHORIZED]
-> P4 Reviewer Intelligence v2 [NOT_AUTHORIZED]
-> P5 Finding Verifier Fabric [NOT_AUTHORIZED]
-> P6 Security Validation [NOT_AUTHORIZED]
-> P7 Bounded Autofix [NOT_AUTHORIZED]
-> P8 Product / Distribution Hardening [NOT_AUTHORIZED]
```

## Current exact closeout scope

```text
docs/planning/KODAC_P3_BOUNDED_R1_R5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-31.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/ROADMAP.md
docs/roadmap/VERSION_PLAN.md
docs/roadmap/NEXT.md
```

No seventh path is authorized. No runtime source/test, historical P3 authorization/evidence, workflow, dependency, lockfile, benchmark corpus, provider/model, persistence, telemetry, package, release, or ruleset path may change.

The closeout statement becomes canonical only after this exact candidate proves `behind_by=0`, exact six-path containment, exact head/tree/six blobs, required Governance and docs-only K2 PR gates, two distinct independent substantive exact-head semantic reviews, zero actionable findings/threads, active no-bypass ruleset, guarded merge with exact expected head, and mandatory post-merge main/parents/tree/six-blobs/signature/check/ruleset proof.

## Next P3 planning boundary

No P3-R6 requirement is inferred merely from completion of R1-R5. After successful canonical bounded closeout, later P3 work remains definition/planning/authorization-candidate preparation only until a separate exact canonical authorization becomes effective.

The durable P3 goal remains:

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

A future bounded slice may define the next missing measured-context, benchmark-execution, decision, or promotion boundary only if justified by canonical sequencing and separately authorized.

Explicitly postponed unless separately authorized:

- real benchmark task execution or corpus/manifest mutation;
- repository-owned default/winner/promotion;
- aggregate scoring, hidden weights, significance or acceptance thresholds;
- holdout-sufficiency, unbiasedness, or contamination-free conclusions;
- embeddings/vector retrieval or learned/model reranking;
- provider/model execution;
- repository acquisition or new indexing;
- persistence/telemetry/learning;
- product/CLI/API/agent-loop integration;
- public release, package publication, brand launch, or superiority claims.

## Preserved authority boundaries

```text
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3 OVERALL = OPEN
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Repository visibility is currently public. Public repository visibility does not itself establish a public product release, package publication, benchmark completion, quality claim, production readiness, support commitment, or brand launch.

Every later unit remains fail-closed until its own exact authorization, qualification, guarded merge, and required post-merge proof succeed.
