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
| P3-R3 | **CLOSED_CANONICAL** | Pairwise seven-metric evidence binding and comparability state only |
| P3-R4 | **CLOSED_CANONICAL** | Deterministic literal benchmark-provenance evidence binding only |
| P3-R5 | **CLOSED_CANONICAL** | Deterministic caller-declared criterion-match evidence only |
| P3 overall | **OPEN** | No repository-owned default/promotion, benchmark execution, or public quality claim established |
| P3-R6+ | **NOT_AUTHORIZED** | Separate exact canonical authorization required |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

## P3-R5 canonical anchors

```text
P3_R5_AUTHORIZATION_PR = #266
P3_R5_AUTHORIZATION_QUALIFIED_HEAD = 4826c57b909eeb3357eec59a6aa9641cbffb190f
P3_R5_AUTHORIZATION_QUALIFIED_TREE = 08f843206e981f338c278f08d9492a5d90f9d2c0
P3_R5_AUTHORIZATION_BLOB = 8e8fc94b2f260d055f413e2e595a5eea894877b6
P3_R5_AUTHORIZATION_MERGE = 41599d88d2b18f2714848452d20fc8ff00232f31
P3_R5_IMPLEMENTATION_PR = #267
P3_R5_QUALIFIED_HEAD = 33847308b30327a5a290eee7f4c0382b3205a576
P3_R5_QUALIFIED_TREE = 37482be701004cc1e258a475c9c0c9f441657c78
P3_R5_MERGE = ae8a8d46f529a6782e39e3ae1787220cef603b8f
P3_R5_POST_MERGE_GOVERNANCE = 33359263671 / SUCCESS
P3_R5_POST_MERGE_K2_RUNTIME = 33359263703 / SUCCESS AFTER IDENTICAL-MERGE-SHA RETRY
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R5 path blobs:

```text
contracts.ts = 5f9f33bf6a3a7e4378e443621b913e76b9ab0ad7
context-policy-qualification.ts = 358e0c4713644e0275010d20961d6409040411ca
p3-r5-context-policy-qualification.test.ts = a331cf19adf7c89044f23ad3d423ffd07688ba92
P3-R5 evidence = 4ff828e8ceec4c5e2b115568e256ef85bae3e208
```

The implementation merge is signed and valid, its ordered parents are the canonical P3-R5 authorization merge followed by the exact qualified P3-R5 implementation head, its merge tree equals the qualified tree, and all four P3-R5 blobs match the qualified candidate.

Post-merge proof is complete on the exact merge SHA. Governance `provenance` + `legacy-tests` passed. The initial Ubuntu K2 attempt hit one unchanged pre-existing H4-R3G-B timing assertion; that H4 test blob was byte-identical across the P3-R5 base and merge. An identical-merge-SHA failed-job retry then proved Ubuntu/macOS/Windows Typecheck + Test + Patch benchmark hook and stable `k2-runtime-gate` success. No repository bytes changed during the retry.

## P3-R5 exit meaning

P3-R5 closes only the deterministic caller-declared qualification-evidence mechanism:

```text
TRUSTED P2-R4 / P3-R3 / P3-R4 EVIDENCE RECONSTRUCTION
+ EXACT SEVEN-DIMENSION CALLER-DECLARED RELATION CRITERIA
+ LITERAL CORPUS-ROLE / CHRONOLOGY / CONTAMINATION CRITERIA
+ INSUFFICIENT-EVIDENCE-FIRST AGGREGATE PRECEDENCE
-> CALLER-DECLARED CRITERION-MATCH EVIDENCE
-> CLOSED IMMUTABLE QUALIFICATION EVIDENCE RECORD
```

It does not execute a benchmark, establish holdout sufficiency, prove contamination freedom, establish significance, select or promote a repository-owned context strategy, or establish that any strategy is better.

```text
P3-R5 CLOSED != P3 OVERALL CLOSED
P3-R5 CLOSED != REPOSITORY DEFAULT / WINNER / PROMOTION
P3-R5 CLOSED != BENCHMARK EXECUTION
P3-R5 CLOSED != HOLDOUT ACCEPTANCE / SIGNIFICANCE PROOF
P3-R5 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P3-R5 CLOSED != PROVIDER / MODEL EXECUTION
P3-R5 CLOSED != PRODUCT INTEGRATION
P3-R5 CLOSED != P3-R6+ AUTHORITY
```

## Current reconciliation milestone

The current docs-only candidate reconciles current roadmap/status/version views with the already-proven P3-R5 closure. It creates no runtime authority and must itself qualify, merge normally, and complete post-merge proof before these current-view bytes become canonical.

Exact current-view path set:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

## Next boundary after reconciliation

After and only after this reconciliation becomes canonical and post-merge proven, later P3 work is limited to definition/planning/authorization-candidate preparation until a separate exact canonical authorization becomes effective.

```text
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
```

Any future slice that introduces holdout-sufficiency decisions, significance/acceptance semantics, promotion, embeddings, learned reranking, provider/model execution, persistence, product integration, public claims, or release/package publication requires its own exact authority boundary.

## Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / STRATEGY PROMOTION = NOT_AUTHORIZED
THRESHOLD / SIGNIFICANCE / UNIVERSAL QUALITY SCORE = NOT_AUTHORIZED
HOLDOUT SUFFICIENCY / CONTAMINATION-FREE CLAIM = NOT_AUTHORIZED BY P3-R5
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Repository visibility is currently public, but engineering milestone closure remains separate from public versioning, package publication, production readiness, support, compatibility, benchmark claims, security claims, quality claims, and brand launch.
