# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records always win.

## Canonical truth anchors

```text
K6 bounded closeout        = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout        = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3 bounded R1-R5 closeout  = PR #270 / 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
P3-R11 reconciliation     = PR #290 / 7ae2f05114fd06eba5ce4c70efc0c743647c680a
P3-R12 reconciliation     = PR #294 / ad0c3e1236c546c005c7f688f991ecbc9ed64fa5
P3-R13 authorization      = PR #295 / 2a67a91c6d5eef829872823f5fa6441f7a644d67
P3-R13 implementation     = PR #296 / 931c750681494895da046f4ba9c8406d77fcfddf
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
R7: #274 authorization -> #275 implementation -> #276 reconciliation
R8: #277 authorization -> #278 implementation -> #279/#280 H4 recovery -> #281 reconciliation
R9: #282 authorization -> #283 implementation -> #284 reconciliation
R10: #285 authorization -> #286 implementation -> #287 reconciliation
R11: #288 authorization -> #289 implementation -> #290 reconciliation
R12: #291 authorization -> #293 implementation -> #294 reconciliation
R13: #295 authorization -> #296 implementation -> current-view reconciliation candidate
```

## Canonical P3-R13 proof

```text
P3_R12_CURRENT_VIEW_RECONCILIATION_PR = #294
P3_R12_CURRENT_VIEW_RECONCILIATION_MERGE = ad0c3e1236c546c005c7f688f991ecbc9ed64fa5
P3_R12_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #294 / 5498358794

P3_R13_AUTHORIZATION_PR = #295
P3_R13_AUTHORIZATION_BLOB = bc6b039cab6dbc3a570cedafe2b8f226634aa767
P3_R13_AUTHORIZATION_MERGE = 2a67a91c6d5eef829872823f5fa6441f7a644d67
P3_R13_AUTHORIZATION_POST_MERGE_PROOF = #295 / 5498626758

P3_R13_IMPLEMENTATION_PR = #296
P3_R13_QUALIFIED_HEAD = 74d07c3ad64fb5b9d7a2dd17e357260a7120489b
P3_R13_QUALIFIED_TREE = db206d23e70cb1dda9daeda37922264ce2dfd5bf
P3_R13_QUALIFICATION_PROOF = #296 / 5499762716
P3_R13_SEMANTIC_REVIEW = CodeRabbit 5499263271 + Cubic 5499299358
P3_R13_MERGE = 931c750681494895da046f4ba9c8406d77fcfddf
P3_R13_MERGE_TREE = db206d23e70cb1dda9daeda37922264ce2dfd5bf
P3_R13_MERGE_VERIFICATION = verified / valid
P3_R13_POST_MERGE_GOVERNANCE = 33553663264 / SUCCESS
P3_R13_POST_MERGE_PROVENANCE = 100009119493 / SUCCESS
P3_R13_POST_MERGE_LEGACY_TESTS = 100009119739 / SUCCESS
P3_R13_POST_MERGE_K2 = 33553663263 / SUCCESS
P3_R13_POST_MERGE_CLASSIFIER = 100009119554 / SUCCESS
P3_R13_POST_MERGE_WINDOWS = 100009155408 / SUCCESS
P3_R13_POST_MERGE_UBUNTU = 100009155427 / SUCCESS
P3_R13_POST_MERGE_MACOS = 100009155455 / SUCCESS
P3_R13_POST_MERGE_K2_GATE = 100009519605 / SUCCESS
P3_R13_POST_MERGE_PROOF = #296 / 5499792485
P3_R13_RECONCILIATION_BOUNDARY = #296 / 5499834265
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R13 blobs:

```text
packages/kodac-runtime/bench/p3-r13/contracts.ts = d712d90c734ce946c7e91f15da074adfa63e338a
packages/kodac-runtime/bench/p3-r13/reduction-direction-binding.ts = 0b752c5e8d47056004a0ca0aaad15c871dd089c9
packages/kodac-runtime/test/p3-r13-reduction-direction-binding.test.ts = 2b49db209341e8fb3923fdb8319da7174bbb543a
docs/planning/KODAC_P3_R13_REDUCTION_DIRECTION_BINDING_EVIDENCE_2026-09-01.md = 5cd4b59b9c2cabe00806388358acb6be286c9883
```

The historical P3-R8 K2 failure remains historical evidence; later recovery does not rewrite it.

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
| P3-R1 through P3-R13 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms only |
| P3-R13 | **CLOSED_CANONICAL** | Explicit seven-dimension direction binding over reconstructed R12 only |
| P3-R13 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / CANDIDATE** | Exactly five current-view files |
| P3 overall | **OPEN** | No repository default/promotion, real benchmark execution, aggregate scoring, pairwise strategy comparison/ranking, or public quality claim established |
| Pairwise strategy comparison | **NOT_AUTHORIZED** | Requires separate evidence and authority |
| P3-R14+ | **NOT_AUTHORIZED** | No later slice is implied by numbering |
| P4-P8 | **NOT_AUTHORIZED** | Ordered dependencies and separate authority required |

Engineering milestone state is separate from public release status.

## Bounded P3 R1-R13 result

```text
R1  = deterministic context-selection-plan foundation
R2  = deterministic caller-declared policy application
R3  = pairwise seven-metric evidence binding / comparability-only state
R4  = literal benchmark-provenance evidence binding
R5  = caller-declared criterion-match evidence
R6  = deterministic materialization of seven P2-R2-compatible observations from one reconstructed policy application plus explicit caller evaluation facts
R7  = deterministic binding of one reconstructed R6 measurement to one fully covered single-case P2-R2 report
R8  = deterministic case-invariant strategy-subject identity plus one exact single-case binding to canonical P3-R1/P3-R2 identities
R9  = deterministic ordered composition of exactly two independently reconstructed R7 reports under one exact R8 strategy subject
R10 = deterministic proof that the two canonical R9 members use the same metricId and unit for each canonical P3-R6 dimension while preserving both observations without reduction
R11 = deterministic binding of exactly seven explicit P2-R3-compatible reduction policies to that exact aligned pair, validating benchmark/protocol/value-kind continuity without executing a reducer
R12 = deterministic application of those exact bound policies to the exact two trusted observations, emitting only per-dimension REDUCED or INSUFFICIENT_EVIDENCE reduction evidence
R13 = deterministic binding of one explicit HIGHER_IS_BETTER | LOWER_IS_BETTER declaration to each exact trusted R12 dimension while preserving the complete reconstructed R12 record
```

These remain evidence mechanisms, not repository decisions:

```text
R13 CLOSED_CANONICAL != P3 OVERALL CLOSED
R13 CLOSED_CANONICAL != GENERAL / PUBLIC KODACBENCH COMPLETE
R13 CLOSED_CANONICAL != RAW DELTA
R13 CLOSED_CANONICAL != PAIRWISE STRATEGY COMPARISON
R13 CLOSED_CANONICAL != FAVORED / BETTER / WORSE VERDICT
R13 CLOSED_CANONICAL != CROSS-DIMENSION AGGREGATE SCORE
R13 CLOSED_CANONICAL != MULTI-STRATEGY RANKING / PROMOTION
R13 CLOSED_CANONICAL != REPOSITORY DEFAULT / WINNER
R13 CLOSED_CANONICAL != REAL BENCHMARK EXECUTION
R13 CLOSED_CANONICAL != PRODUCT / RELEASE / PACKAGE READY
R13 CLOSED_CANONICAL != P3-R14+ AUTHORITY
R13 CLOSED_CANONICAL != P4 AUTHORITY
```

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1-R13 bounded mechanisms [CLOSED_CANONICAL]
   -> R13 current-view roadmap/status reconciliation [CURRENT DOCS-ONLY UNIT]
   -> later bounded P3 definition / planning / authorization-candidate work [ONLY IF A CONCRETE GAP IS PROVEN]
   -> pairwise strategy comparison / P3-R14+ implementation [NOT_AUTHORIZED]
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

No sixth path belongs to this current-view reconciliation. No runtime source/test, historical authorization/evidence, workflow, dependency, lockfile, benchmark corpus/fixture/manifest, product/release surface, provider/model, persistence, telemetry, or ruleset path may change.

The reconciliation remains a candidate until one frozen exact head proves exact five-path containment, `behind_by=0`, applicable Governance/K2 checks, two distinct independent substantive terminal-clean semantic review channels, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact expected head, and complete post-merge proof.

## Next P3 planning boundary

Only after the R13 current-view reconciliation becomes canonical and post-merge proven may another bounded P3 definition/planning/authorization candidate be considered.

No `P3-R14` or pairwise-strategy-comparison requirement is inferred from sequence alone. A later candidate requires a concrete canonical gap plus reproducible evidence compatible with existing invariants.

P3-R13 deliberately stops after direction binding. It does not compare two independent strategy reduction records. Whether a deterministic pairwise comparison evidence layer is the minimum next semantic gap is a hypothesis for later evidence-driven analysis only.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

## Preserved authority boundaries

```text
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3 OVERALL = OPEN
PAIRWISE STRATEGY COMPARISON = NOT_AUTHORIZED
P3-R14+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED
RAW DELTA / FAVORED / BETTER-WORSE = NOT_AUTHORIZED
CROSS-DIMENSION AGGREGATE SCORE = NOT_AUTHORIZED
MULTI-STRATEGY RANKING / PROMOTION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```
