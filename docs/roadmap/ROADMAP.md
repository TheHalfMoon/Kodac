# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records always win.

## Canonical truth anchors

```text
K6 bounded closeout       = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout       = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3-R1 implementation      = PR #252 / ba3caabef0b36649a1d556ff287237ca2a455ab2
P3-R2 implementation      = PR #256 / 458f62e85f4af2e13bfd78f5a6c3582d9330c911
P3-R3 implementation      = PR #260 / cd7c28b4f823e9570daf73448c5f3b9b9b540d2e
P3-R4 implementation      = PR #264 / ad63bab64512f8ac24c0f849b58b64ecf41a8709
P3-R4 reconciliation      = PR #265 / ff6682d0266b44dcc25c7d1100a7af9519ad26e6
P3-R5 authorization       = PR #266 / 41599d88d2b18f2714848452d20fc8ff00232f31
P3-R5 implementation      = PR #267 / ae8a8d46f529a6782e39e3ae1787220cef603b8f
Improvement master plan   = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

P3-R5 exact implementation proof:

```text
AUTHORIZATION_QUALIFIED_HEAD = 4826c57b909eeb3357eec59a6aa9641cbffb190f
AUTHORIZATION_QUALIFIED_TREE = 08f843206e981f338c278f08d9492a5d90f9d2c0
AUTHORIZATION_BLOB = 8e8fc94b2f260d055f413e2e595a5eea894877b6
AUTHORIZATION_MERGE = 41599d88d2b18f2714848452d20fc8ff00232f31
QUALIFIED_HEAD = 33847308b30327a5a290eee7f4c0382b3205a576
QUALIFIED_TREE = 37482be701004cc1e258a475c9c0c9f441657c78
MERGE = ae8a8d46f529a6782e39e3ae1787220cef603b8f
POST_MERGE_GOVERNANCE = 33359263671 / SUCCESS
POST_MERGE_K2_RUNTIME = 33359263703 / SUCCESS AFTER IDENTICAL-MERGE-SHA RETRY
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The P3-R5 merge is GitHub-signed and valid. Ordered parents are authorization merge `41599d88d2b18f2714848452d20fc8ff00232f31` followed by exact qualified implementation head `33847308b30327a5a290eee7f4c0382b3205a576`; the merge tree equals the qualified tree.

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
| P3 overall | **OPEN** | No repository-owned default, promotion, benchmark execution, or public quality claim established |
| P3-R6+ | **NOT_AUTHORIZED** | Separate exact canonical authorization required |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

Engineering milestone state is separate from public release status.

## P3-R5 bounded result

P3-R5 adds deterministic caller-declared qualification evidence on top of canonical P3-R3 and P3-R4 evidence. It:

- hardens all public inputs through the canonical JSON boundary before semantic reuse;
- reconstructs canonical P2-R4, P3-R3, and P3-R4 truth rather than trusting caller-serialized predecessor evidence;
- binds one qualification identity to the reconstructed benchmark/protocol/task-family/policy evidence;
- applies exactly seven caller-declared metric criteria to the seven canonical P3-R3 dimensions;
- permits only literal direction-aware relation membership and preserves `INSUFFICIENT_EVIDENCE` fail-closed;
- evaluates required corpus roles and allowed chronology/contamination statuses only as literal P3-R4 evidence;
- uses exact insufficient-first aggregate precedence;
- returns deterministic detached deeply frozen evidence;
- performs no repository/filesystem/network/provider/model/persistence side effect.

P3-R5 does not decide global superiority, repository default/promotion, statistical significance, holdout sufficiency, contamination freedom, release, or product integration.

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
   -> R5 roadmap/status reconciliation [CURRENT DOCS-ONLY CANDIDATE]
   -> next bounded P3 definition / planning / authorization-candidate work [ONLY AFTER RECONCILIATION]
   -> P3-R6+ implementation [NOT_AUTHORIZED]
-> P4 Reviewer Intelligence v2 [NOT_AUTHORIZED]
-> P5 Finding Verifier Fabric [NOT_AUTHORIZED]
-> P6 Security Validation [NOT_AUTHORIZED]
-> P7 Bounded Autofix [NOT_AUTHORIZED]
-> P8 Product / Distribution Hardening [NOT_AUTHORIZED]
```

## Next P3 planning boundary

After this reconciliation becomes canonical and post-merge proven, later P3 work remains definition/planning/authorization-candidate preparation only until a separate exact canonical authorization becomes effective.

The durable P3 goal remains minimum sufficient evidence rather than maximum context volume. A future bounded slice may define the next missing evidence or decision boundary, but planning text must not infer implementation, execution, promotion, release, or public-claim authority.

Explicitly postponed unless separately authorized:

- real benchmark task execution or corpus mutation;
- repository-owned default/winner/promotion;
- aggregate scoring, hidden weights, significance or acceptance thresholds;
- holdout-sufficiency or contamination-free conclusions not present as trusted literal facts;
- embeddings/vector retrieval or learned/model reranking;
- provider/model execution;
- repository acquisition or new indexing;
- persistence/telemetry/learning;
- product/CLI/agent-loop integration;
- public release, package publication, or superiority claims.

## Preserved authority boundaries

```text
INTELLIGENCE != AUTHORITY
BENCHMARK EVIDENCE != EXECUTION OR PROMOTION AUTHORITY
MORE CONTEXT != BETTER CONTEXT
P3-R1 PLAN FOUNDATION != BETTER CONTEXT POLICY
P3-R2 DECLARED POLICY APPLICATION != WINNING CONTEXT POLICY
P3-R3 PAIRWISE METRIC EVIDENCE != POLICY PROMOTION QUALIFICATION
P3-R4 BENCHMARK PROVENANCE EVIDENCE != HOLDOUT ACCEPTANCE OR POLICY PROMOTION
P3-R5 CALLER-DECLARED CRITERIA MATCH != REPOSITORY WINNER / DEFAULT / PROMOTION
CALLER POLICY != REPOSITORY POLICY
LATER-IN-TIME != SUFFICIENT HOLDOUT
NONE-KNOWN != PROVEN UNCONTAMINATED
COMPARABLE != STATISTICALLY SIGNIFICANT
P3-R5 CLOSED != P3 OVERALL CLOSED
P3-R5 CLOSED != P3-R6+ AUTHORIZED
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Repository visibility is currently public. Public repository visibility does not itself establish a public product release, package publication, benchmark completion, quality claim, production readiness, support commitment, or brand launch.

Every later unit remains fail-closed until its own exact authorization, qualification, guarded merge, and required post-merge proof succeed.
