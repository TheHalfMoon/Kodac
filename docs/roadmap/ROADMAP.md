# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records always win.

## Canonical truth anchors

```text
K6 bounded closeout       = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout       = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3 bounded R1-R5 closeout = PR #270 / 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
P3-R6 reconciliation     = PR #273 / ac002f5ef6bf9f338e1106b7b200dd5eb062e776
P3-R7 reconciliation     = PR #276 / e1bbbf31cac4bdbb8c31dc7c3c3ff1fff3b760cb
P3-R8 implementation     = PR #278 / 576ac5d2b317fb90d1f0c6079d78cd3d899ca62d
H4-R3G-B repair          = PR #280 / 89d294035923c3c8682e5a94360cb4e01d271a9c
P3-R8 reconciliation     = PR #281 / ff7a474f73b9efacab4eceafd210c67488987b64
P3-R9 authorization      = PR #282 / ba9553de3384e683a54469ac7aa05545d20c0c1b
P3-R9 implementation     = PR #283 / 8d89875cf71715945f81b05853adeddebcb60284
Improvement master plan  = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

Canonical P3 ledger:

```text
R1: #251 authorization -> #252 implementation -> #253 reconciliation
R2: #255 authorization -> #256 implementation -> #257 reconciliation
R3: #258 authorization -> #260 implementation -> #261 reconciliation
R4: #262 authorization -> #264 implementation -> #265 reconciliation
R5: #266 authorization -> #267 implementation -> #268 reconciliation
R1-R5 bounded closeout: #269 authorization -> #270 closeout
R6: #271 authorization -> #272 implementation -> #273 reconciliation
R7: #274 authorization -> #275 implementation -> #276 reconciliation
R8: #277 authorization -> #278 implementation -> #279/#280 H4 recovery -> #281 reconciliation
R9: #282 authorization -> #283 implementation -> current-view reconciliation pending
```

## P3-R9 canonical proof

```text
P3_R9_AUTHORIZATION_QUALIFIED_HEAD = 9013fcf596453bb49afb7727af138de4fd70381d
P3_R9_AUTHORIZATION_BLOB = e3b3912b17fb9585b7fc075f11afd6055c4b7224
P3_R9_AUTHORIZATION_MERGE = ba9553de3384e683a54469ac7aa05545d20c0c1b
P3_R9_AUTHORIZATION_POST_MERGE_PROOF = #282 / 5491794590

P3_R9_QUALIFIED_HEAD = 457d12f27ededa4b60cd39b2aa946e2692b3d2f7
P3_R9_MERGE = 8d89875cf71715945f81b05853adeddebcb60284
P3_R9_MERGE_TREE = adb808338c6ea1e802811728fdf2c6d3c6de373a
P3_R9_MERGE_VERIFICATION = verified / valid
P3_R9_SEMANTIC_REVIEW = Cubic 5492179655 + CodeRabbit 5492246477
P3_R9_POST_MERGE_GOVERNANCE = 33495225110 / SUCCESS
P3_R9_POST_MERGE_K2 = 33495225098 / SUCCESS
P3_R9_POST_MERGE_UBUNTU = 99815772777 / SUCCESS
P3_R9_POST_MERGE_MACOS = 99815772815 / SUCCESS
P3_R9_POST_MERGE_WINDOWS = 99815772844 / SUCCESS
P3_R9_POST_MERGE_K2_GATE = 99816093316 / SUCCESS
P3_R9_POST_MERGE_PROOF_COMMENT = #283 / 5492583969
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R9 implementation/evidence blobs:

```text
packages/kodac-runtime/bench/p3-r9/contracts.ts
  b7064806e681983b386ed59123578da1bea384e3
packages/kodac-runtime/bench/p3-r9/single-strategy-two-case-report-composition.ts
  fa4fd9af2938221ab8b463efa7de0e81cd81054a
packages/kodac-runtime/test/p3-r9-single-strategy-two-case-report-composition.test.ts
  cab8c74c82bf09b6f5c911e05c4a53756529e2bb
docs/planning/KODAC_P3_R9_SINGLE_STRATEGY_TWO_CASE_REPORT_COMPOSITION_EVIDENCE_2026-09-01.md
  08b828fa11455929596cb0e5247f32e885e73168
```

The historical P3-R8 K2 run `33439529693` remains failed evidence; later H4 recovery does not rewrite that history.

## Current milestone state

| Milestone / gate | Current state | Authority boundary |
| --- | --- | --- |
| K0/K1 | **CLOSED** | Historical completed foundation |
| K2 | **CLOSED** | Trusted side-effect execution boundary remains unchanged |
| K3 | **CLOSED for canonical K3-R1 through K3-R6 bounded scope** | K3-R7+ not authorized |
| KRI-R1 through KRI-R4 | **CANONICAL / COMPLETE** | KRI-R5+ not authorized |
| K4 | **CLOSED for canonical K4-R1 through K4-R5 bounded data-only scope** | K4-R6+ not authorized |
| K5 | **CLOSED for canonical K5-R1 through K5-R5 bounded proof-review scope** | Done Gate unchanged |
| K6 | **CLOSED_CANONICAL for bounded R1-R5 scope** | No later authority by composition |
| P2-R1 through P2-R5 | **CLOSED_CANONICAL** | Deterministic bounded measurement/evidence spine |
| P2 overall | **OPEN** | General/public KodacBench is not closed |
| P2-R6+ | **NOT_AUTHORIZED** | Separate justified authorization required |
| P3-R1 through P3-R9 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms only |
| P3-R9 | **CLOSED_CANONICAL** | Exactly-two-case identity-preserving report composition only |
| P3-R9 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / CANDIDATE** | Exactly five current-view files |
| P3 overall | **OPEN** | No repository default/promotion, real benchmark execution, aggregate scoring, or public quality claim established |
| P3-R10+ | **NOT_AUTHORIZED** | No later slice is implied by numbering |
| P4-P8 | **NOT_AUTHORIZED** | Ordered dependencies and separate authority required |

Engineering milestone state is separate from public release status.

## Bounded P3 R1-R9 result

```text
R1 = deterministic context-selection-plan foundation
R2 = deterministic caller-declared policy application
R3 = pairwise seven-metric evidence binding / comparability-only state
R4 = literal benchmark-provenance evidence binding
R5 = caller-declared criterion-match evidence
R6 = deterministic materialization of seven P2-R2-compatible observations from one reconstructed policy application plus explicit caller evaluation facts
R7 = deterministic binding of one reconstructed R6 measurement to one fully covered single-case P2-R2 report
R8 = deterministic case-invariant strategy-subject identity plus one exact single-case binding to canonical P3-R1/P3-R2 identities
R9 = deterministic ordered composition of exactly two independently reconstructed R7 reports under one exact R8 strategy subject, preserving predecessor identities without metric/score aggregation
```

These remain evidence mechanisms, not repository decisions:

```text
R9 CLOSED_CANONICAL != P3 OVERALL CLOSED
R9 CLOSED_CANONICAL != GENERAL / PUBLIC KODACBENCH COMPLETE
R9 CLOSED_CANONICAL != REAL BENCHMARK PARTICIPANT EXECUTION
R9 CLOSED_CANONICAL != THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION
R9 CLOSED_CANONICAL != MULTI-CASE OBSERVATION / METRIC / SCORE AGGREGATION
R9 CLOSED_CANONICAL != MULTI-STRATEGY COMPARISON / RANKING / PROMOTION
R9 CLOSED_CANONICAL != REPOSITORY DEFAULT / WINNER
R9 CLOSED_CANONICAL != STATISTICAL / HOLDOUT / CONTAMINATION QUALIFICATION
R9 CLOSED_CANONICAL != PROVIDER / MODEL EXECUTION
R9 CLOSED_CANONICAL != PRODUCT / RELEASE / PACKAGE READY
R9 CLOSED_CANONICAL != P3-R10+ AUTHORITY
R9 CLOSED_CANONICAL != P4 AUTHORITY
```

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1-R5 mechanisms [CLOSED_CANONICAL]
   -> bounded R1-R5 closeout [CLOSED_CANONICAL]
   -> R6 measurement observation [CLOSED_CANONICAL]
   -> R6 reconciliation [CLOSED_CANONICAL]
   -> R7 single-case report binding [CLOSED_CANONICAL]
   -> R7 reconciliation [CLOSED_CANONICAL]
   -> R8 case-invariant strategy subject + single-case binding [CLOSED_CANONICAL]
   -> H4-R3G-B test-harness recovery [CLOSED_CANONICAL]
   -> R8 reconciliation [CLOSED_CANONICAL]
   -> R9 exactly-two-case report composition [CLOSED_CANONICAL]
   -> R9 current-view roadmap/status reconciliation [CURRENT DOCS-ONLY UNIT]
   -> later bounded P3 definition / planning / authorization-candidate work [ONLY IF A CONCRETE GAP IS PROVEN]
   -> P3-R10+ implementation [NOT_AUTHORIZED]
-> P4 Reviewer Intelligence v2 [NOT_AUTHORIZED]
-> P5 Finding Verifier Fabric [NOT_AUTHORIZED]
-> P6 Security Validation [NOT_AUTHORIZED]
-> P7 Bounded Autofix [NOT_AUTHORIZED]
-> P8 Product / Distribution Hardening [NOT_AUTHORIZED]
```

## Current reconciliation scope

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path belongs to this current-view reconciliation. No runtime source/test, historical authorization/evidence, workflow, dependency, lockfile, benchmark corpus, provider/model, donor code, persistence, telemetry, package, release, or ruleset path may change.

The reconciliation remains a candidate until one frozen exact head proves exact five-path containment, `behind_by=0`, applicable Governance/K2 checks, two distinct independent substantive terminal-clean semantic review channels, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact expected head, and complete post-merge proof.

## Next P3 planning boundary

Only after the R9 current-view reconciliation itself becomes canonical and post-merge proven may another bounded P3 definition/planning/authorization candidate be considered.

No `P3-R10` requirement is inferred from sequence alone. A later candidate requires a concrete canonical gap plus reproducible evidence compatible with existing invariants. External precedent is supporting evidence only and cannot create Kodac requirements or authority.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

Explicitly postponed unless separately authorized:

- real benchmark task/participant execution or corpus/manifest mutation;
- three-or-more-case or unbounded composition;
- multi-case report/observation/metric/score aggregation;
- multi-strategy comparison, ranking, winner/default, or promotion;
- repository-owned gold truth;
- aggregate scoring, hidden weights, significance, acceptance thresholds, or effect-size policy;
- holdout-sufficiency, unbiasedness, or contamination-free conclusions;
- embeddings/vector retrieval or learned/model reranking;
- provider/model/reviewer/evaluator execution;
- repository acquisition or new indexing;
- persistence/telemetry/learning;
- product/CLI/API/agent-loop integration;
- K2/K5/Done Gate expansion;
- public release, package publication, brand launch, or superiority claims.

## Preserved authority boundaries

```text
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3 OVERALL = OPEN
P3-R10+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Repository visibility is public. Public repository visibility does not establish a public product release, package publication, benchmark completion, quality claim, production readiness, support commitment, compatibility promise, or brand launch.
