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
| P3 overall | **OPEN** | No repository-owned default/promotion or benchmark-backed quality improvement established |
| P3-R4+ | **NOT_AUTHORIZED** | Separate exact canonical authorization required |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

## P3-R3 canonical anchors

```text
P3_R3_AUTHORIZATION_PR = #258
P3_R3_AUTHORIZATION_QUALIFIED_HEAD = 9afe9a879319e22f6db53585115c6d47883ff066
P3_R3_AUTHORIZATION_QUALIFIED_TREE = 22c42cc939564a3569e7032a4fead57c60a7308f
P3_R3_AUTHORIZATION_BLOB = 34b86510c5b37998fd3bb94fdb507cf599d34288
P3_R3_AUTHORIZATION_MERGE = 70553fef18c992b1ec819720e051258372af75d8
P3_R3_IMPLEMENTATION_PR = #260
P3_R3_QUALIFIED_HEAD = 2071014a9e8761a84167e2fa7a44ba40b4df36da
P3_R3_QUALIFIED_TREE = 46c2c5ff7af396ffa1377d0c597b398547c5087c
P3_R3_MERGE = cd7c28b4f823e9570daf73448c5f3b9b9b540d2e
P3_R3_POST_MERGE_GOVERNANCE = 33302704761 / SUCCESS
P3_R3_POST_MERGE_K2_RUNTIME = 33302704758 / SUCCESS
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R3 path blobs:

```text
contracts.ts = 7383bca3962b054f8b3798f0e8c1a26ccd675c6a
context-policy-evidence.ts = 8c01bf5e4c41103ae491cea701f0b9b3fe9dffb1
p3-r3-context-policy-evidence.test.ts = 03f05fb4d0f7e6ca9c5f012a5b9874ff08b39cb9
P3-R3 evidence = accfab24f463a5559b43e0921a4ff70042e59d7d
```

The implementation merge is signed and valid, its ordered parents are the canonical P3-R3 authorization merge followed by the exact qualified P3-R3 implementation head, its merge tree equals the qualified tree, and all four P3-R3 blobs match the qualified candidate.

Qualification history is part of the evidence, not hidden noise:

- private-repository hosted-runner attempts failed before any repository step executed;
- after repository visibility changed to public, required Governance and K2 execution became available and ruleset `20707483` became readable;
- two pre-merge Ubuntu K2 attempts hit the unchanged pre-existing H4-R3G-B timing assertion; the identical P3-R3 head later passed Ubuntu and the stable gate without byte movement or waiver;
- post-merge Governance and K2 passed on the exact merge SHA on their first post-merge runs.

## P3-R3 exit meaning

P3-R3 closes only the deterministic pairwise metric-evidence binding mechanism:

```text
COMPLETE UNTRUSTED P3-R1 REQUEST
+ EXPLICIT LEFT P3-R2 POLICY
+ EXPLICIT RIGHT P3-R2 POLICY
+ COMPLETE UNTRUSTED P2-R4 COMPARISON
+ EXACT-KEY P3-R3 DECLARATION
-> TRUSTED P3-R2 APPLICATIONS
-> TRUSTED P2-R5 RELATIONS
-> EXACT SUBJECT / IDENTITY / SEVEN-METRIC CROSS-BINDING
-> COMPARABILITY-ONLY STATE
-> CLOSED IMMUTABLE EVIDENCE RECORD
```

It does not select or promote a repository-owned context strategy and it does not establish that any strategy is better.

```text
P3-R3 CLOSED != P3 OVERALL CLOSED
P3-R3 CLOSED != REPOSITORY DEFAULT / WINNER
P3-R3 CLOSED != BENCHMARK-BACKED IMPROVEMENT
P3-R3 CLOSED != CHRONOLOGY / CONTAMINATION / SIGNIFICANCE PROOF
P3-R3 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P3-R3 CLOSED != PROVIDER / MODEL EXECUTION
P3-R3 CLOSED != PRODUCT INTEGRATION
P3-R3 CLOSED != P3-R4+ AUTHORITY
```

## Current reconciliation milestone

The current docs-only candidate reconciles current roadmap/status/version views with the already-proven P3-R3 closure. It creates no runtime authority and must itself qualify, merge normally, and complete post-merge proof before these current-view bytes become canonical.

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
P3-R4+ IMPLEMENTATION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
```

Any future slice that binds chronology, contamination, holdout sufficiency, significance/acceptance, promotion, embeddings, learned reranking, provider/model execution, persistence, or product integration requires its own exact authority boundary.

## Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / STRATEGY PROMOTION = NOT_AUTHORIZED
THRESHOLD / SIGNIFICANCE / UNIVERSAL QUALITY SCORE = NOT_AUTHORIZED
CHRONOLOGY / CONTAMINATION / HOLDOUT CLAIM = NOT_AUTHORIZED BY R3 EVIDENCE
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R4+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Repository visibility is currently public, but engineering milestone closure remains separate from public versioning, package publication, production readiness, support, compatibility, benchmark claims, security claims, quality claims, and brand launch.
