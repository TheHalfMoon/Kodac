# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records always win.

## Canonical truth anchors

```text
K6 bounded closeout       = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout       = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3 bounded R1-R5 closeout = PR #270 / 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
P3-R6 authorization       = PR #271 / 2441cf9b6006859a4bc05cfe196a033fe31b56c9
P3-R6 implementation      = PR #272 / c045ae50f42fcfeede37bbd3290b1d3a7cb5bb91
Improvement master plan   = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

The canonical P3 R1-R5 chain remains:

```text
R1: #251 authorization -> #252 implementation -> #253 reconciliation
R2: #255 authorization -> #256 implementation -> #257 reconciliation
R3: #258 authorization -> #260 implementation -> #261 reconciliation
R4: #262 authorization -> #264 implementation -> #265 reconciliation
R5: #266 authorization -> #267 implementation -> #268 reconciliation
R1-R5 bounded closeout: #269 authorization -> #270 closeout
R6: #271 authorization -> #272 implementation
```

## P3-R6 canonical proof

```text
AUTHORIZATION_QUALIFIED_HEAD = 5412c1c8ac2629ae6d4d0c87981b3b5ce14116e0
AUTHORIZATION_QUALIFIED_TREE = bfde96cf637006e142e920b1dd3a132b11adab37
AUTHORIZATION_BLOB = 3eaf04d6e2ed558692ee1f08f0557ac6a3c4a8b1
AUTHORIZATION_MERGE = 2441cf9b6006859a4bc05cfe196a033fe31b56c9
AUTHORIZATION_POST_MERGE_GOVERNANCE = 33416874486 / SUCCESS

IMPLEMENTATION_QUALIFIED_HEAD = 202cbf2b8082ddde52738e07373ba24322a5265c
IMPLEMENTATION_QUALIFIED_TREE = 85d3cb932fc477525a05eed6a5ee1e4ffe43e4a1
IMPLEMENTATION_MERGE = c045ae50f42fcfeede37bbd3290b1d3a7cb5bb91
MERGE_PARENT_1 = 2441cf9b6006859a4bc05cfe196a033fe31b56c9
MERGE_PARENT_2 = 202cbf2b8082ddde52738e07373ba24322a5265c
MERGE_TREE = 85d3cb932fc477525a05eed6a5ee1e4ffe43e4a1
MERGE_VERIFICATION = verified / valid
PRE_MERGE_GOVERNANCE = 33418354648 / SUCCESS
PRE_MERGE_K2 = 33418354658 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
POST_MERGE_GOVERNANCE = 33419477062 / SUCCESS
POST_MERGE_K2 = 33419477059 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
SEMANTIC_REVIEW_QUORUM = Cubic + CodeRabbit / exact-head and current-metadata terminal clean
UNRESOLVED_ACTIONABLE_THREADS = 0
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R6 implementation blobs:

```text
packages/kodac-runtime/bench/p3-r6/contracts.ts
  6b12541182cc0c28072efcb3966e570d3cdeefbe
packages/kodac-runtime/bench/p3-r6/context-measurement-observation.ts
  f31bb7f1cc89ddc6a6eacf1be546c54f135cffca
packages/kodac-runtime/test/p3-r6-context-measurement-observation.test.ts
  0ef67ed8249a03f79bac6ccf132a8dade56a79d4
docs/planning/KODAC_P3_R6_CONTEXT_MEASUREMENT_OBSERVATION_EVIDENCE_2026-08-31.md
  c8c156947f17aef62625acb5ea93c6bc9c0018a8
```

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
| P2 bounded R1-R5 closeout | **CLOSED_CANONICAL** | General/public KodacBench remains open |
| P2 overall | **OPEN** | General/public KodacBench is not closed |
| P2-R6+ | **NOT_AUTHORIZED** | Separate justified authorization required |
| P3-R1 through P3-R5 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms |
| P3 bounded R1-R5 closeout | **CLOSED_CANONICAL** | PR #270 / `9d75115f66f34ef8ee1e1a093705a5cba21f8f49` |
| P3-R6 | **CLOSED_CANONICAL** | Pure deterministic context-measurement observation materializer only |
| P3 overall | **OPEN** | No repository-owned default/promotion, benchmark execution, or public quality claim established |
| P3-R7+ | **NOT_AUTHORIZED** | No later slice is implied by numbering |
| P4-P8 | **NOT_AUTHORIZED** | Ordered dependencies and separate authority required |

Engineering milestone state is separate from public release status.

## Bounded P3 R1-R6 result

The canonical P3 units remain evidence mechanisms, not repository decisions:

```text
R1 = deterministic context-selection-plan foundation
R2 = deterministic caller-declared policy application
R3 = pairwise seven-metric evidence binding / comparability-only state
R4 = literal benchmark-provenance evidence binding
R5 = caller-declared criterion-match evidence
R6 = deterministic materialization of seven P2-R2-compatible observations from one exact reconstructed R2 application plus explicit caller evaluation facts
```

R6 preserves the same non-decisional boundary:

```text
MEASUREMENT MATERIALIZATION != BENCHMARK PARTICIPANT EXECUTION
CALLER GOLD / UTILIZATION FACTS != REPOSITORY TRUTH
SEVEN OBSERVATIONS != GLOBAL WINNER
P2-R2 COMPATIBILITY != GENERAL KODACBENCH COMPLETION
R6 CLOSED_CANONICAL != P3 OVERALL CLOSED
R6 CLOSED_CANONICAL != P3-R7+ AUTHORITY
R6 CLOSED_CANONICAL != P4 AUTHORITY
```

Detailed repair/failure/service history remains in the immutable authorization/evidence chain rather than being rewritten in this current view.

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1-R5 mechanisms [CLOSED_CANONICAL]
   -> bounded R1-R5 closeout [CLOSED_CANONICAL]
   -> R6 context measurement observation authorization [CLOSED_CANONICAL]
   -> R6 implementation [CLOSED_CANONICAL]
   -> R6 current-view roadmap/status reconciliation [CURRENT DOCS-ONLY UNIT]
   -> later bounded P3 definition / planning / authorization-candidate work [ONLY IF JUSTIFIED AFTER RECONCILIATION]
   -> P3-R7+ implementation [NOT_AUTHORIZED]
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

No sixth path belongs to this current-view reconciliation. No runtime source/test, historical authorization/evidence, workflow, dependency, lockfile, benchmark corpus, provider/model, persistence, telemetry, package, release, or ruleset path may change.

## Next P3 planning boundary

Only after the R6 current-view reconciliation itself becomes canonical and post-merge proven may another bounded P3 definition/planning/authorization candidate be considered. No `P3-R7` requirement is inferred from sequence alone.

The durable P3 goal remains:

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

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
- K2/K5/Done Gate expansion;
- public release, package publication, brand launch, or superiority claims.

## Preserved authority boundaries

```text
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3 OVERALL = OPEN
P3-R7+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Repository visibility is currently public. Public repository visibility does not establish a public product release, package publication, benchmark completion, quality claim, production readiness, support commitment, compatibility promise, or brand launch.
