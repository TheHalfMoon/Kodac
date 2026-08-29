# Kodac Engineering Milestones

## Authority

This file is a current milestone ledger. It does not authorize implementation, execution, release, provider/model access, persistence, learning, dependencies, benchmark execution, public claims, or side effects. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization records remain authoritative.

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
| P2-R6+ | **NOT_AUTHORIZED** | No R6 is required by label; separate authority is required if broader semantics are justified |
| P3-R1 | **CLOSED_CANONICAL** | Deterministic context-selection-plan foundation only |
| P3-R2+ | **NOT_AUTHORIZED** | Separate exact canonical authorization required |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

## P3-R1 canonical anchors

```text
P3_R1_AUTHORIZATION_PR = #251
P3_R1_AUTHORIZATION_MERGE = 2b3ce25fe4b8e108840208cdf7a7018ba6262fd6
P3_R1_AUTHORIZATION_BLOB = efd4ff29ae6660b4e1d9a2c9e75d45537bfd3a35
P3_R1_IMPLEMENTATION_PR = #252
P3_R1_QUALIFIED_HEAD = feee83d214bb2ed47e25b730e8c6840538d57882
P3_R1_QUALIFIED_TREE = 027f0f3258e17cef6f0f8df8164853f206d42afb
P3_R1_MERGE = ba3caabef0b36649a1d556ff287237ca2a455ab2
P3_R1_POST_MERGE_GOVERNANCE = 33237323000 / SUCCESS
P3_R1_POST_MERGE_K2_RUNTIME = 33237323003 / SUCCESS
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

Canonical P3-R1 path blobs:

```text
contracts.ts = f8d4123a14cc52a8307c3294fd4302b819a91390
context-selection-plan.ts = 786cd93db7c511d92db66915322384d6b5956af4
p3-r1-context-selection-plan.test.ts = f3d6065c705ea63bc45ad969041a687f1054df5e
P3-R1 evidence = eaf4096bebe7b92b521c8dc4892a4d1844446f89
```

## P3-R1 exit meaning

P3-R1 closes only the deterministic plan-foundation slice:

```text
CALLER-MATERIALIZED EVIDENCE
-> EXACT VALIDATION / IDENTITY BINDING
-> DESCRIPTIVE EVIDENCE LANES
-> BUDGET FACTS / COMPLETENESS / ABSTENTION
-> DETERMINISTIC IMMUTABLE PLAN
```

It does not select or promote a repository-owned context strategy and it does not establish that any strategy is better.

```text
P3-R1 CLOSED != P3 OVERALL CLOSED
P3-R1 CLOSED != NEW QUALITY RANKING POLICY
P3-R1 CLOSED != BENCHMARK-BACKED IMPROVEMENT
P3-R1 CLOSED != EMBEDDINGS / VECTOR DATABASE
P3-R1 CLOSED != PROVIDER / MODEL EXECUTION
P3-R1 CLOSED != PRODUCT INTEGRATION
P3-R1 CLOSED != P3-R2 AUTHORITY
```

## Current reconciliation milestone

The current docs-only candidate reconciles current roadmap/status/version views with the already-proven P3-R1 closure. It creates no runtime authority and must itself qualify, merge normally, and complete post-merge proof before these current-view bytes are canonical.

## Next boundary after reconciliation

After and only after this reconciliation becomes canonical and post-merge proven, the next eligible unit is:

```text
P3-R2 DEFINITION / PLANNING / AUTHORIZATION-CANDIDATE PREPARATION ONLY
P3-R2 IMPLEMENTATION = NOT_AUTHORIZED
```

The conservative R2 design direction is a pure deterministic declared policy-application boundary over P3-R1 plans. It may later authorize deterministic policy validation/application under explicit budgets without selecting a winning policy or claiming quality improvement. Benchmark comparison and any repository-owned strategy choice remain later evidence-gated work.

## Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT_AUTHORIZED
DONOR REPLACEMENT / PROMOTION = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R2+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Engineering milestone closure remains separate from public versioning, package publication, production readiness, support, compatibility, benchmark claims, security claims, and brand launch.
