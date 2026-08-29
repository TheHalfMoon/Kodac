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
Improvement master plan   = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

P3-R2 exact implementation proof:

```text
QUALIFIED_HEAD = 3d43248546d34f3c46c6fb38d1a53cb4dea1006f
QUALIFIED_TREE = 51a17d41f8c53ec6dbbd363afd628a9a37a821bb
MERGE = 458f62e85f4af2e13bfd78f5a6c3582d9330c911
POST_MERGE_GOVERNANCE = 33249447009 / SUCCESS
POST_MERGE_K2_RUNTIME = 33249447008 / SUCCESS AFTER SAME-HEAD UBUNTU RERUN
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

The post-merge K2 history remains explicit: attempt 1 hit two unrelated pre-existing H4-R3G-D Ubuntu watchdog timing failures while all P3-R2 tests passed; attempt 2 reran Ubuntu on the identical merge SHA and succeeded, after which `k2-runtime-gate` succeeded. No P3-R2 or H4 byte changed and no waiver was used.

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
| P3-R3+ | **NOT_AUTHORIZED** | Separate exact canonical authorization required |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

Engineering milestone state is separate from public release status.

## P3-R1 and P3-R2 bounded result

P3-R1 established a pure deterministic plan over caller-materialized evidence with exact identity binding, six descriptive evidence lanes, preserved provenance/evidence class/grouping, explicit budget/completeness facts, abstention, validated supplied K3-R6 relation evidence, hostile-input rejection, and deep immutability.

P3-R2 adds only deterministic application of one explicit caller-declared policy to a P3-R1 plan reconstructed through the canonical P3-R1 builder. It provides:

- exact policy binding to plan/repository/snapshot/content/task identities;
- an exact caller-supplied permutation of the six lanes with no repository default;
- explicit narrowing item/byte/group limits that cannot expand P3-R1 budgets;
- deterministic lane order then `candidateIdentity` traversal;
- closed group/item/byte omission precedence and exact partitioning;
- preservation of source state, completeness, abstention, relation evidence, candidate provenance and evidence class;
- explicit `budget-exceeded` handling without erasing the source fact;
- closed result and identity projections;
- hostile-input fail-closed behavior and deep immutability.

Neither R1 nor R2 proves that any policy is better. Neither selects or promotes a repository-owned winning strategy.

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1 deterministic context selection plan foundation [CLOSED_CANONICAL]
   -> R1 roadmap/status reconciliation [CLOSED_CANONICAL]
   -> R2 declared context-selection policy application [CLOSED_CANONICAL]
   -> R2 roadmap/status reconciliation [CURRENT DOCS-ONLY CANDIDATE]
   -> R3 definition / planning / authorization-candidate preparation [NEXT ONLY AFTER RECONCILIATION]
   -> R3 implementation [NOT_AUTHORIZED]
   -> later P3 slices [NOT_AUTHORIZED]
-> P4 Reviewer Intelligence v2 [NOT_AUTHORIZED]
-> P5 Finding Verifier Fabric [NOT_AUTHORIZED]
-> P6 Security Validation [NOT_AUTHORIZED]
-> P7 Bounded Autofix [NOT_AUTHORIZED]
-> P8 Product / Distribution Hardening [NOT_AUTHORIZED]
```

## P3-R3 evidence-gated planning direction

After this reconciliation becomes canonical, the next eligible work is P3-R3 definition/planning and authorization-candidate preparation only.

The durable master plan requires P3 promotion to be evidence-backed, and ADR-0010 explicitly lists context selection as a component where contested choices should be benchmark-first. The smallest credible R3 planning direction is therefore a bounded comparison/qualification contract for context policies rather than immediate repository-owned policy promotion.

A future R3 authorization candidate may define exact benchmark/evidence inputs, policy identities, task-family scope, comparison dimensions, abstention/completeness handling, contamination safeguards, and what evidence is sufficient or insufficient for a later policy decision. It must keep measurement evidence separate from implementation/promotion authority.

This planning direction intentionally postpones:

- actual benchmark task execution unless separately and explicitly authorized;
- benchmark corpus mutation or a claim that general/public KodacBench is complete;
- repository-owned default/winner promotion;
- universal scores, hidden weights, significance thresholds, or broad superiority claims;
- embeddings/vector retrieval or learned/model reranking;
- provider/model execution;
- repository acquisition or new indexing;
- persistence/telemetry/learning;
- product/CLI/agent-loop integration.

## Preserved authority boundaries

```text
INTELLIGENCE != AUTHORITY
BENCHMARK EVIDENCE != EXECUTION OR PROMOTION AUTHORITY
MORE CONTEXT != BETTER CONTEXT
P3-R1 PLAN FOUNDATION != BETTER CONTEXT POLICY
P3-R2 DECLARED POLICY APPLICATION != WINNING CONTEXT POLICY
P3-R2 CLOSED != P3 OVERALL CLOSED
P3-R2 CLOSED != P3-R3 AUTHORIZED
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R3+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Every later unit remains fail-closed until its own exact authorization, qualification, guarded merge, and required post-merge proof succeed.
