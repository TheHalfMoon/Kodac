# Kodac Engineering Milestones

## Authority

This file is a current milestone ledger. It does not authorize implementation, execution, release, provider/model access, persistence, learning, dependencies, benchmark execution, public claims, or side effects. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records remain authoritative.

## Current milestone ledger

| Milestone / gate | Status | Current boundary |
| --- | --- | --- |
| K0/K1 | **CLOSED** | Architecture/governance foundation complete |
| K2 | **CLOSED** | Trusted Runtime Spine remains the side-effect execution boundary |
| K3 | **CLOSED for K3-R1 through K3-R6 bounded scope** | K3-R7+ not authorized |
| KRI-R1 through KRI-R4 | **CANONICAL / COMPLETE** | KRI-R5+ not authorized |
| K4 | **CLOSED for K4-R1 through K4-R5 bounded data-only scope** | K4-R6+ not authorized |
| K5 | **CLOSED for K5-R1 through K5-R5 bounded proof-review scope** | Done Gate unchanged |
| K6 bounded closeout | **CLOSED_CANONICAL** | PR #236 / `ed4fb16e8bbaf960812285671062c9b2abf597a8` |
| P2-R1 through P2-R5 | **CLOSED_CANONICAL** | Deterministic bounded measurement/evidence spine |
| P2 bounded R1-R5 engineering closeout | **CLOSED_CANONICAL** | PR #250 / `0e48553f00618706955b11db795643ee710fe04a` |
| P2 overall | **OPEN** | General/public KodacBench is not closed |
| P2-R6+ | **NOT_AUTHORIZED** | Separate authority required if broader semantics are justified |
| P3-R1 | **CLOSED_CANONICAL** | Deterministic context-selection-plan foundation only |
| P3-R2 | **CLOSED_CANONICAL** | Deterministic caller-declared policy-application mechanism only |
| P3-R3+ | **NOT_AUTHORIZED** | Separate exact canonical authorization required |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

## P3-R2 canonical anchors

```text
P3_R2_AUTHORIZATION_PR = #255
P3_R2_AUTHORIZATION_QUALIFIED_HEAD = 25136158d1a0fead0f086a9bb907faf75f663604
P3_R2_AUTHORIZATION_QUALIFIED_TREE = ed8826e2e4bfcf55d9dca1781c67b108656764bf
P3_R2_AUTHORIZATION_BLOB = cff65ced6162a4b871f9ee0958f74592887af99a
P3_R2_AUTHORIZATION_MERGE = 69f74cef1f9cc36ed8db123cc30b65e881aa147e
P3_R2_AUTHORIZATION_POST_MERGE_GOVERNANCE = 33247742550 / SUCCESS
P3_R2_IMPLEMENTATION_PR = #256
P3_R2_QUALIFIED_HEAD = 3d43248546d34f3c46c6fb38d1a53cb4dea1006f
P3_R2_QUALIFIED_TREE = 51a17d41f8c53ec6dbbd363afd628a9a37a821bb
P3_R2_MERGE = 458f62e85f4af2e13bfd78f5a6c3582d9330c911
P3_R2_POST_MERGE_GOVERNANCE = 33249447009 / SUCCESS
P3_R2_POST_MERGE_K2_RUNTIME = 33249447008 / SUCCESS AFTER SAME-MERGE UBUNTU RERUN
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

Canonical P3-R2 path blobs:

```text
contracts.ts = 1b5bf19868214fd202ede209d5976dfa9d17677d
context-selection-policy.ts = 9bb0a3ba619f10fedaedba6f9559bdc6dffbeaa7
p3-r2-context-selection-policy.test.ts = af6e7b91518fc841cb6c53ed7e0bc73b358d054f
P3-R2 evidence = dd457cd0e343b0454591c992385567d2b1c726bb
```

The implementation merge is signed and valid, its ordered parents are the pre-merge canonical main followed by the exact qualified P3-R2 head, its merge tree equals the qualified tree, and all four P3-R2 blobs match the qualified candidate.

Qualification retry history is part of the evidence, not hidden noise:

- pre-merge K2 `33248103061` had an unrelated pre-existing H4-R3G-B Ubuntu timing failure; same-head Ubuntu rerun succeeded and the stable gate succeeded;
- post-merge K2 `33249447008` had two unrelated pre-existing H4-R3G-D Ubuntu watchdog timing failures; same-merge Ubuntu rerun succeeded and the stable gate succeeded;
- no P3-R2 or H4 byte moved for these reruns and `WAIVER=NO`.

## P3-R2 exit meaning

P3-R2 closes only the deterministic declared-policy application mechanism:

```text
COMPLETE UNTRUSTED P3-R1 REQUEST
-> CANONICAL P3-R1 PLAN RECONSTRUCTION
-> EXACT CALLER-DECLARED POLICY VALIDATION
-> DECLARED LANE / GROUP / ITEM / BYTE CONSTRAINTS
-> DETERMINISTIC SELECTED + OMITTED PARTITION
-> CLOSED IMMUTABLE APPLICATION RESULT
```

It does not select or promote a repository-owned context strategy and it does not establish that any strategy is better.

```text
P3-R2 CLOSED != P3 OVERALL CLOSED
P3-R2 CLOSED != REPOSITORY DEFAULT / WINNER
P3-R2 CLOSED != BENCHMARK-BACKED IMPROVEMENT
P3-R2 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P3-R2 CLOSED != EMBEDDINGS / VECTOR DATABASE
P3-R2 CLOSED != PROVIDER / MODEL EXECUTION
P3-R2 CLOSED != PRODUCT INTEGRATION
P3-R2 CLOSED != P3-R3 AUTHORITY
```

## Current reconciliation milestone

The current docs-only candidate reconciles current roadmap/status/version views with the already-proven P3-R2 closure. It creates no runtime authority and must itself qualify, merge normally, and complete post-merge proof before these current-view bytes become canonical.

## Next boundary after reconciliation

After and only after this reconciliation becomes canonical and post-merge proven, the next eligible unit is:

```text
P3-R3 DEFINITION / PLANNING / AUTHORIZATION-CANDIDATE PREPARATION ONLY
P3-R3 IMPLEMENTATION = NOT_AUTHORIZED
```

The evidence-gated R3 planning direction is a bounded context-policy comparison/qualification contract under ADR-0010 and the P2 measurement spine. A future authorization candidate may define the exact evidence needed to compare policies, but this reconciliation does not execute benchmarks, choose a default/winner, or promote any strategy.

## Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / STRATEGY PROMOTION = NOT_AUTHORIZED
THRESHOLD / SIGNIFICANCE / UNIVERSAL QUALITY SCORE = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R3+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Engineering milestone closure remains separate from public versioning, package publication, production readiness, support, compatibility, benchmark claims, security claims, and brand launch.
