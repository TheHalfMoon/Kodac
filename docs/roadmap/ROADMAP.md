# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records always win.

## Canonical truth anchors

```text
K6 bounded closeout       = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout       = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3 bounded R1-R5 closeout = PR #270 / 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
P3-R9 implementation     = PR #283 / 8d89875cf71715945f81b05853adeddebcb60284
P3-R9 reconciliation     = PR #284 / 748d562d2bcf74b49fda17e3888b70d462e875e6
P3-R10 authorization     = PR #285 / 3b4d75133ca350ca147802fb53cc4716ab6ee2e0
P3-R10 implementation    = PR #286 / e22019883dca10ac1ed66edff2d56d0fc2570961
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
R9: #282 authorization -> #283 implementation -> #284 reconciliation
R10: #285 authorization -> #286 implementation -> current-view reconciliation pending
```

## P3-R10 canonical proof

```text
P3_R9_CURRENT_VIEW_RECONCILIATION_PR = #284
P3_R9_CURRENT_VIEW_RECONCILIATION_MERGE = 748d562d2bcf74b49fda17e3888b70d462e875e6
P3_R9_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #284 / 5493067005

P3_R10_AUTHORIZATION_PR = #285
P3_R10_AUTHORIZATION_QUALIFIED_HEAD = 1933f6f1b0e8eff674ad33505f7a7974f2e69c1f
P3_R10_AUTHORIZATION_BLOB = 639fe0915dbbd3266702008e6b7c83752146de01
P3_R10_AUTHORIZATION_MERGE = 3b4d75133ca350ca147802fb53cc4716ab6ee2e0
P3_R10_AUTHORIZATION_POST_MERGE_PROOF = #285 / 5493260544

P3_R10_QUALIFIED_HEAD = 1cfc0bd74d40278ad26184ad5d48675a788d97fb
P3_R10_MERGE = e22019883dca10ac1ed66edff2d56d0fc2570961
P3_R10_MERGE_TREE = 2d300653b6afacf21e10c755aaeb0fe4070a8925
P3_R10_MERGE_VERIFICATION = verified / valid
P3_R10_SEMANTIC_REVIEW = CodeRabbit 5493664866 + Cubic 5493888569
P3_R10_POST_MERGE_GOVERNANCE = 33507788965 / SUCCESS
P3_R10_POST_MERGE_K2 = 33507788845 / SUCCESS
P3_R10_POST_MERGE_UBUNTU = 99855928420 / SUCCESS
P3_R10_POST_MERGE_WINDOWS = 99855928443 / SUCCESS
P3_R10_POST_MERGE_MACOS = 99855928534 / SUCCESS
P3_R10_POST_MERGE_K2_GATE = 99856236455 / SUCCESS
P3_R10_POST_MERGE_PROOF_COMMENT = #286 / 5494012666
P3_R10_RECONCILIATION_BOUNDARY_COMMENT = #286 / 5494032631
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R10 implementation/evidence blobs:

```text
packages/kodac-runtime/bench/p3-r10/contracts.ts
  0ec5df5255604aea2b3f11a22ff4313b0b87d0ea
packages/kodac-runtime/bench/p3-r10/single-strategy-two-case-metric-alignment.ts
  74085c6094ef7de5b34f351ba79b92ae0a758756
packages/kodac-runtime/test/p3-r10-single-strategy-two-case-metric-alignment.test.ts
  e701e76a2c5f6594389fd438b1e7ab8040347cf2
docs/planning/KODAC_P3_R10_SINGLE_STRATEGY_TWO_CASE_METRIC_ALIGNMENT_EVIDENCE_2026-09-01.md
  e3d5a1e66593b1162c48dbae40ace7ccb2131fc3
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
| P3-R1 through P3-R10 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms only |
| P3-R10 | **CLOSED_CANONICAL** | Exactly-two-case seven-dimension metric/unit alignment evidence only |
| P3-R10 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / CANDIDATE** | Exactly five current-view files |
| P3 overall | **OPEN** | No repository default/promotion, real benchmark execution, aggregate scoring, or public quality claim established |
| P3-R11+ | **NOT_AUTHORIZED** | No later slice is implied by numbering |
| P4-P8 | **NOT_AUTHORIZED** | Ordered dependencies and separate authority required |

Engineering milestone state is separate from public release status.

## Bounded P3 R1-R10 result

```text
R1 = deterministic context-selection-plan foundation
R2 = deterministic caller-declared policy application
R3 = pairwise seven-metric evidence binding / comparability-only state
R4 = literal benchmark-provenance evidence binding
R5 = caller-declared criterion-match evidence
R6 = deterministic materialization of seven P2-R2-compatible observations from one reconstructed policy application plus explicit caller evaluation facts
R7 = deterministic binding of one reconstructed R6 measurement to one fully covered single-case P2-R2 report
R8 = deterministic case-invariant strategy-subject identity plus one exact single-case binding to canonical P3-R1/P3-R2 identities
R9 = deterministic ordered composition of exactly two independently reconstructed R7 reports under one exact R8 strategy subject
R10 = deterministic proof that the two canonical R9 members use the same metricId and unit for each canonical P3-R6 dimension while preserving both observations without reduction
```

These remain evidence mechanisms, not repository decisions:

```text
R10 CLOSED_CANONICAL != P3 OVERALL CLOSED
R10 CLOSED_CANONICAL != GENERAL / PUBLIC KODACBENCH COMPLETE
R10 CLOSED_CANONICAL != REAL BENCHMARK PARTICIPANT EXECUTION
R10 CLOSED_CANONICAL != THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION
R10 CLOSED_CANONICAL != MULTI-CASE OBSERVATION / METRIC / SCORE AGGREGATION
R10 CLOSED_CANONICAL != MULTI-STRATEGY COMPARISON / RANKING / PROMOTION
R10 CLOSED_CANONICAL != REPOSITORY DEFAULT / WINNER
R10 CLOSED_CANONICAL != STATISTICAL / HOLDOUT / CONTAMINATION QUALIFICATION
R10 CLOSED_CANONICAL != PROVIDER / MODEL EXECUTION
R10 CLOSED_CANONICAL != PRODUCT / RELEASE / PACKAGE READY
R10 CLOSED_CANONICAL != P3-R11+ AUTHORITY
R10 CLOSED_CANONICAL != P4 AUTHORITY
```

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1-R5 mechanisms [CLOSED_CANONICAL]
   -> bounded R1-R5 closeout [CLOSED_CANONICAL]
   -> R6 measurement observation [CLOSED_CANONICAL]
   -> R7 single-case report binding [CLOSED_CANONICAL]
   -> R8 case-invariant strategy subject + single-case binding [CLOSED_CANONICAL]
   -> H4-R3G-B test-harness recovery [CLOSED_CANONICAL]
   -> R9 exactly-two-case report composition [CLOSED_CANONICAL]
   -> R9 current-view reconciliation [CLOSED_CANONICAL]
   -> R10 exactly-two-case metric alignment evidence [CLOSED_CANONICAL]
   -> R10 current-view roadmap/status reconciliation [CURRENT DOCS-ONLY UNIT]
   -> later bounded P3 definition / planning / authorization-candidate work [ONLY IF A CONCRETE GAP IS PROVEN]
   -> P3-R11+ implementation [NOT_AUTHORIZED]
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

Only after the R10 current-view reconciliation itself becomes canonical and post-merge proven may another bounded P3 definition/planning/authorization candidate be considered.

No `P3-R11` requirement is inferred from sequence alone. A later candidate requires a concrete canonical gap plus reproducible evidence compatible with existing invariants. External precedent is supporting evidence only and cannot create Kodac requirements or authority.

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
P3-R11+ IMPLEMENTATION = NOT_AUTHORIZED
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
