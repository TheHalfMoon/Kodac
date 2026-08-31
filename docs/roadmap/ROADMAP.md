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
P3-R6 reconciliation      = PR #273 / ac002f5ef6bf9f338e1106b7b200dd5eb062e776
P3-R7 authorization       = PR #274 / bbe7825579e388a3a9be7dd64b56f2406425d930
P3-R7 implementation      = PR #275 / e3933fdc9932b43b4864a0d608845acbc4ad7f08
Improvement master plan   = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
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
R7: #274 authorization -> #275 implementation -> current-view reconciliation pending
```

## P3-R7 canonical proof

```text
AUTHORIZATION_QUALIFIED_HEAD = ac8c6e7d76299faf04467b708dd9d4660723b194
AUTHORIZATION_QUALIFIED_TREE = 88f196c3721df32f184639adf785d82809c220c0
AUTHORIZATION_BLOB = d9ee5d793cca3465b03f909133eeebaf0b0fe197
AUTHORIZATION_MERGE = bbe7825579e388a3a9be7dd64b56f2406425d930
AUTHORIZATION_POST_MERGE_GOVERNANCE = 33427579642 / SUCCESS

IMPLEMENTATION_QUALIFIED_HEAD = 6d5ddae20f71767523c52378c468757749aa1520
IMPLEMENTATION_QUALIFIED_TREE = 9481bab0ece031fa8fe7f77a2395247a10e5a463
IMPLEMENTATION_MERGE = e3933fdc9932b43b4864a0d608845acbc4ad7f08
MERGE_PARENT_1 = bbe7825579e388a3a9be7dd64b56f2406425d930
MERGE_PARENT_2 = 6d5ddae20f71767523c52378c468757749aa1520
MERGE_TREE = 9481bab0ece031fa8fe7f77a2395247a10e5a463
MERGE_VERIFICATION = verified / valid
PRE_MERGE_GOVERNANCE = 33428839717 / SUCCESS
PRE_MERGE_K2 = 33428839711 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
POST_MERGE_GOVERNANCE = 33430224046 / SUCCESS
POST_MERGE_K2 = 33430224234 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
SEMANTIC_REVIEW_QUORUM = CodeRabbit + Cubic / exact-head and current-metadata terminal clean
UNRESOLVED_ACTIONABLE_THREADS = 0
POST_MERGE_PROOF_COMMENT = #275 / 5483365785
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R7 implementation blobs:

```text
packages/kodac-runtime/bench/p3-r7/contracts.ts
  18357e81a3e135b7f407dd0dcc06646c4d079b19
packages/kodac-runtime/bench/p3-r7/context-measurement-report-binding.ts
  d4cc9ed3998a08315ed7adaa93f318a77d9076ec
packages/kodac-runtime/test/p3-r7-context-measurement-report-binding.test.ts
  3d156331133ba4bb67fd55b2ce28481b0cdff792
docs/planning/KODAC_P3_R7_CONTEXT_MEASUREMENT_REPORT_BINDING_EVIDENCE_2026-08-31.md
  ee6ce38b82a517de4b5d0c71ea46eeb8507736ea
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
| P2 overall | **OPEN** | General/public KodacBench is not closed |
| P2-R6+ | **NOT_AUTHORIZED** | Separate justified authorization required |
| P3-R1 through P3-R5 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms |
| P3-R6 | **CLOSED_CANONICAL** | Seven-dimension measurement/observation materializer |
| P3-R7 | **CLOSED_CANONICAL** | Single-case R6-to-P2-R2 report-binding evidence only |
| P3-R7 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / NOT YET CLOSED_CANONICAL** | Exactly five current-view files |
| P3 overall | **OPEN** | No repository default/promotion, real benchmark execution, or public quality claim established |
| P3-R8+ | **NOT_AUTHORIZED** | No later slice is implied by numbering |
| P4-P8 | **NOT_AUTHORIZED** | Ordered dependencies and separate authority required |

Engineering milestone state is separate from public release status.

## Bounded P3 R1-R7 result

```text
R1 = deterministic context-selection-plan foundation
R2 = deterministic caller-declared policy application
R3 = pairwise seven-metric evidence binding / comparability-only state
R4 = literal benchmark-provenance evidence binding
R5 = caller-declared criterion-match evidence
R6 = deterministic materialization of seven P2-R2-compatible observations from one reconstructed policy application plus explicit caller evaluation facts
R7 = deterministic binding of one reconstructed R6 measurement to one fully covered single-case P2-R2 report
```

These remain evidence mechanisms, not repository decisions:

```text
R7 CLOSED_CANONICAL != P3 OVERALL CLOSED
R7 CLOSED_CANONICAL != GENERAL / PUBLIC KODACBENCH COMPLETE
R7 CLOSED_CANONICAL != REAL BENCHMARK PARTICIPANT EXECUTION
R7 CLOSED_CANONICAL != MULTI-CASE STRATEGY IDENTITY
R7 CLOSED_CANONICAL != REPOSITORY DEFAULT / WINNER / PROMOTION
R7 CLOSED_CANONICAL != STATISTICAL / HOLDOUT / CONTAMINATION QUALIFICATION
R7 CLOSED_CANONICAL != PROVIDER / MODEL EXECUTION
R7 CLOSED_CANONICAL != PRODUCT / RELEASE / PACKAGE READY
R7 CLOSED_CANONICAL != P3-R8+ AUTHORITY
R7 CLOSED_CANONICAL != P4 AUTHORITY
```

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1-R5 mechanisms [CLOSED_CANONICAL]
   -> bounded R1-R5 closeout [CLOSED_CANONICAL]
   -> R6 measurement observation [CLOSED_CANONICAL]
   -> R6 current-view reconciliation [CLOSED_CANONICAL]
   -> R7 single-case report binding [CLOSED_CANONICAL]
   -> R7 current-view roadmap/status reconciliation [CURRENT DOCS-ONLY UNIT]
   -> later bounded P3 definition / planning / authorization-candidate work [ONLY IF JUSTIFIED AFTER RECONCILIATION]
   -> P3-R8+ implementation [NOT_AUTHORIZED]
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

Only after the R7 current-view reconciliation itself becomes canonical and post-merge proven may another bounded P3 definition/planning/authorization candidate be considered. No `P3-R8` requirement is inferred from sequence alone.

The durable P3 goal remains:

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

Explicitly postponed unless separately authorized:

- real benchmark task/participant execution or corpus/manifest mutation;
- multi-case/case-invariant strategy identity;
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
P3-R8+ IMPLEMENTATION = NOT_AUTHORIZED
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
