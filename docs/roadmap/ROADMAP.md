# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and the exact canonical authorization for the active unit always win.

## Canonical truth anchors

```text
K6 bounded closeout       = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout       = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3-R1 implementation      = PR #252 / ba3caabef0b36649a1d556ff287237ca2a455ab2
P3-R1 reconciliation      = PR #253 / f0b18b3d6be10818195e2aef9f3d4123a2b9d3a2
P3-R2 authorization       = PR #255 / 69f74cef1f9cc36ed8db123cc30b65e881aa147e
P3-R2 implementation      = PR #256 / 458f62e85f4af2e13bfd78f5a6c3582d9330c911
P3-R2 reconciliation      = PR #257 / ecee96c1a0d4bf73c5d41b369edfa9950ae1ea0c
P3-R3 authorization       = PR #258 / 70553fef18c992b1ec819720e051258372af75d8
P3-R3 implementation      = PR #260 / cd7c28b4f823e9570daf73448c5f3b9b9b540d2e
Improvement master plan   = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

P3-R3 exact implementation proof:

```text
QUALIFIED_HEAD = 2071014a9e8761a84167e2fa7a44ba40b4df36da
QUALIFIED_TREE = 46c2c5ff7af396ffa1377d0c597b398547c5087c
MERGE = cd7c28b4f823e9570daf73448c5f3b9b9b540d2e
POST_MERGE_GOVERNANCE = 33302704761 / SUCCESS
POST_MERGE_K2_RUNTIME = 33302704758 / SUCCESS
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The merge is GitHub-signed and valid. Its ordered parents are authorization merge `70553fef18c992b1ec819720e051258372af75d8` followed by exact qualified implementation head `2071014a9e8761a84167e2fa7a44ba40b4df36da`; its merge tree equals the qualified tree.

Qualification history remains explicit: before repository visibility became public, hosted jobs failed before runner execution; after visibility changed, required Governance and K2 execution became available. Two pre-merge Ubuntu K2 attempts hit the unchanged pre-existing H4-R3G-B timing assertion and a controlled same-head retry passed without byte movement or waiver. Post-merge Governance and K2 passed on the exact merge SHA.

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
| P3 overall | **OPEN** | No repository-owned default, promotion, or benchmark-backed improvement established |
| P3-R4+ | **NOT_AUTHORIZED** | Separate exact canonical authorization required |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

Engineering milestone state is separate from public release status.

## P3-R1 through P3-R3 bounded result

P3-R1 established a pure deterministic context-selection plan over caller-materialized evidence with exact identity binding, descriptive evidence lanes, explicit budget/completeness facts, abstention, hostile-input rejection, and deep immutability.

P3-R2 added deterministic application of one explicit caller-declared policy to a canonical P3-R1 plan. It preserves source truth while applying exact caller lane ordering and bounded item/byte/group narrowing. It does not select a repository-owned default.

P3-R3 adds only deterministic pairwise metric-evidence binding between two trusted P3-R2 policy applications and one trusted P2-R5 relation set. It:

- reconstructs both P3-R2 applications through the canonical R2 boundary;
- derives P2-R5 relations from one complete untrusted P2-R4 comparison;
- cross-binds the trusted left/right subjects and system-version identities;
- requires exactly one `context-selection` task family and exactly seven declared/trusted metric IDs;
- preserves every trusted metric relation and raw-artifact identity without aggregation;
- derives only `all-required-metrics-comparable` or `one-or-more-required-metrics-insufficient` from metric status;
- rejects hostile declaration inputs and returns a detached deeply frozen output;
- performs no repository/filesystem/network/provider/model/persistence side effect.

R3 does not count favored metrics, rank policies, infer chronology/contamination, apply significance thresholds, choose a default, or authorize promotion.

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1 deterministic context selection plan foundation [CLOSED_CANONICAL]
   -> R1 roadmap/status reconciliation [CLOSED_CANONICAL]
   -> R2 declared context-selection policy application [CLOSED_CANONICAL]
   -> R2 roadmap/status reconciliation [CLOSED_CANONICAL]
   -> R3 pairwise metric-evidence binding authorization [CLOSED_CANONICAL]
   -> R3 implementation [CLOSED_CANONICAL]
   -> R3 roadmap/status reconciliation [CURRENT DOCS-ONLY CANDIDATE]
   -> next bounded P3 definition / planning / authorization-candidate work [ONLY AFTER RECONCILIATION]
   -> P3-R4+ implementation [NOT_AUTHORIZED]
-> P4 Reviewer Intelligence v2 [NOT_AUTHORIZED]
-> P5 Finding Verifier Fabric [NOT_AUTHORIZED]
-> P6 Security Validation [NOT_AUTHORIZED]
-> P7 Bounded Autofix [NOT_AUTHORIZED]
-> P8 Product / Distribution Hardening [NOT_AUTHORIZED]
```

## Next P3 planning boundary

After this reconciliation becomes canonical, later P3 work remains definition/planning/authorization-candidate preparation only until a separate exact canonical authorization becomes effective.

The durable P3 goal is minimum sufficient evidence, not maximum context volume. A future bounded slice may define evidence needed for chronology/contamination binding, holdout sufficiency, acceptance/significance semantics, or another narrowly justified missing qualification dimension. It must not infer implementation or execution authority from planning text.

Explicitly postponed unless separately authorized:

- real benchmark task execution or corpus mutation;
- repository-owned default/winner/promotion;
- aggregate scoring, hidden weights, significance or acceptance thresholds;
- chronology/contamination/holdout claims not present in trusted inputs;
- embeddings/vector retrieval or learned/model reranking;
- provider/model execution;
- repository acquisition or new indexing;
- persistence/telemetry/learning;
- product/CLI/agent-loop integration;
- public release or superiority claims.

## Preserved authority boundaries

```text
INTELLIGENCE != AUTHORITY
BENCHMARK EVIDENCE != EXECUTION OR PROMOTION AUTHORITY
MORE CONTEXT != BETTER CONTEXT
P3-R1 PLAN FOUNDATION != BETTER CONTEXT POLICY
P3-R2 DECLARED POLICY APPLICATION != WINNING CONTEXT POLICY
P3-R3 PAIRWISE METRIC EVIDENCE != POLICY PROMOTION QUALIFICATION
ALL REQUIRED METRICS COMPARABLE != BETTER POLICY
P3-R3 CLOSED != P3 OVERALL CLOSED
P3-R3 CLOSED != P3-R4+ AUTHORIZED
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R4+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Repository visibility is currently public. Public repository visibility does not itself establish a public product release, package publication, benchmark completion, quality claim, production readiness, support commitment, or brand launch.

Every later unit remains fail-closed until its own exact authorization, qualification, guarded merge, and required post-merge proof succeed.
