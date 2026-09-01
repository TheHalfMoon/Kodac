# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records always win.

## Canonical truth anchors

```text
K6 bounded closeout        = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout        = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3 bounded R1-R5 closeout  = PR #270 / 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
P3-R10 reconciliation     = PR #287 / f9636474877c142dc8849094c1856f5b1a92cf6f
P3-R11 implementation     = PR #289 / 0842ed7dac95bad879cc55d720ba5646ae021f24
P3-R11 reconciliation     = PR #290 / 7ae2f05114fd06eba5ce4c70efc0c743647c680a
P3-R12 authorization      = PR #291 / 0aad292ebf3e5f84804b5f731e888da43cb8e883
P3-R12 implementation     = PR #293 / 7d9de3e1ea544677eac93a455b9ab06a5ef35903
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
R12: #291 authorization -> #293 implementation -> current-view reconciliation pending
```

## Canonical P3-R12 proof

```text
P3_R11_CURRENT_VIEW_RECONCILIATION_PR = #290
P3_R11_CURRENT_VIEW_RECONCILIATION_MERGE = 7ae2f05114fd06eba5ce4c70efc0c743647c680a
P3_R11_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #290 / 5495642593

P3_R12_AUTHORIZATION_PR = #291
P3_R12_AUTHORIZATION_BLOB = 8efe833ba236c90af541d21ff3e7cbef5907f2c3
P3_R12_AUTHORIZATION_MERGE = 0aad292ebf3e5f84804b5f731e888da43cb8e883
P3_R12_AUTHORIZATION_POST_MERGE_PROOF = #291 / 5495894426

P3_R12_IMPLEMENTATION_PR = #293
P3_R12_QUALIFIED_HEAD = 1e3741573b3bfd20f5746c8bda91c98c7f06206b
P3_R12_QUALIFIED_TREE = 1d6302fb267d45a01f87538f171465a4a29256b2
P3_R12_QUALIFICATION_PROOF = #293 / 5497667401
P3_R12_SEMANTIC_REVIEW = Cubic 5497345413 + CodeRabbit 5497644250
P3_R12_MERGE = 7d9de3e1ea544677eac93a455b9ab06a5ef35903
P3_R12_MERGE_TREE = 1d6302fb267d45a01f87538f171465a4a29256b2
P3_R12_MERGE_VERIFICATION = verified / valid
P3_R12_POST_MERGE_GOVERNANCE = 33536789925 / SUCCESS
P3_R12_POST_MERGE_PROVENANCE = 99952949641 / SUCCESS
P3_R12_POST_MERGE_LEGACY_TESTS = 99952950405 / SUCCESS
P3_R12_POST_MERGE_K2 = 33536789922 / SUCCESS
P3_R12_POST_MERGE_CLASSIFIER = 99952950032 / SUCCESS
P3_R12_POST_MERGE_MACOS = 99952997213 / SUCCESS
P3_R12_POST_MERGE_WINDOWS = 99952997233 / SUCCESS
P3_R12_POST_MERGE_UBUNTU = 99952997357 / SUCCESS
P3_R12_POST_MERGE_K2_GATE = 99953315925 / SUCCESS
P3_R12_POST_MERGE_PROOF_COMMENT = #293 / 5497699790
P3_R12_RECONCILIATION_BOUNDARY_COMMENT = #293 / 5497702022
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R12 implementation/evidence blobs:

```text
packages/kodac-runtime/bench/p3-r12/contracts.ts = 7b828317da56394257d5dd4c0ab1ce047005f4a1
packages/kodac-runtime/bench/p3-r12/single-strategy-two-case-reduction-evidence.ts = da8f3c147959041326c523a3c7c7b806a6f4c47e
packages/kodac-runtime/test/p3-r12-single-strategy-two-case-reduction-evidence.test.ts = ac6ff742431413b28bd90e7e5988cf161e562044
docs/planning/KODAC_P3_R12_TWO_CASE_REDUCTION_EVIDENCE_2026-09-01.md = 2f1202beddefab6582d40570bc7f082e2cd45397
```

The historical P3-R8 K2 run `33439529693` remains failed evidence; later H4 recovery does not rewrite that history.

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
| P3-R1 through P3-R12 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms only |
| P3-R12 | **CLOSED_CANONICAL** | Exactly-two-case per-dimension reduction evidence only |
| P3-R12 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / CANDIDATE** | Exactly five current-view files |
| P3 overall | **OPEN** | No repository default/promotion, real benchmark execution, aggregate scoring, strategy comparison/ranking, or public quality claim established |
| P3-R13+ | **NOT_AUTHORIZED** | No later slice is implied by numbering |
| P4-P8 | **NOT_AUTHORIZED** | Ordered dependencies and separate authority required |

Engineering milestone state is separate from public release status.

## Bounded P3 R1-R12 result

```text
R1 = deterministic context-selection-plan foundation
R2 = deterministic caller-declared policy application
R3 = pairwise seven-metric evidence binding / comparability-only state
R4 = literal benchmark-provenance evidence binding
R5 = caller-declared criterion-match evidence
R6 = deterministic materialization of seven P2-R2-compatible observations from one reconstructed policy application plus explicit caller evaluation facts
R7 = deterministic binding of one reconstructed R6 measurement to one fully covered single-case P2-R2 report
R8 = deterministic case-invariant strategy-subject identity plus one exact single-case binding to canonical P3-R1/P3-R2 identities
R9 = deterministic ordered composition of exactly two independently reconstructed R7 reports under one exact R8 strategy subject
R10 = deterministic proof that the two canonical R9 members use the same metricId and unit for each canonical P3-R6 dimension while preserving both observations without reduction
R11 = deterministic binding of exactly seven explicit P2-R3-compatible reduction policies to that exact aligned pair, validating benchmark/protocol/value-kind continuity without executing a reducer
R12 = deterministic application of those exact bound policies to the exact two trusted observations, emitting only per-dimension REDUCED or INSUFFICIENT_EVIDENCE reduction evidence with no directional or strategy-comparison semantics
```

These remain evidence mechanisms, not repository decisions:

```text
R12 CLOSED_CANONICAL != P3 OVERALL CLOSED
R12 CLOSED_CANONICAL != GENERAL / PUBLIC KODACBENCH COMPLETE
R12 CLOSED_CANONICAL != REAL BENCHMARK PARTICIPANT EXECUTION
R12 CLOSED_CANONICAL != THREE-OR-MORE-CASE / UNBOUNDED REDUCTION
R12 CLOSED_CANONICAL != CROSS-DIMENSION AGGREGATE SCORE
R12 CLOSED_CANONICAL != DIRECTION / DELTA / BETTER-WORSE SEMANTICS
R12 CLOSED_CANONICAL != MULTI-STRATEGY COMPARISON / RANKING / PROMOTION
R12 CLOSED_CANONICAL != REPOSITORY DEFAULT / WINNER
R12 CLOSED_CANONICAL != PRODUCT / RELEASE / PACKAGE READY
R12 CLOSED_CANONICAL != P3-R13+ AUTHORITY
R12 CLOSED_CANONICAL != P4 AUTHORITY
```

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1-R12 bounded mechanisms [CLOSED_CANONICAL]
   -> R12 current-view roadmap/status reconciliation [CURRENT DOCS-ONLY UNIT]
   -> later bounded P3 definition / planning / authorization-candidate work [ONLY IF A CONCRETE GAP IS PROVEN]
   -> P3-R13+ implementation [NOT_AUTHORIZED]
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

Only after the R12 current-view reconciliation becomes canonical and post-merge proven may another bounded P3 definition/planning/authorization candidate be considered.

No `P3-R13` requirement is inferred from sequence alone. A later candidate requires a concrete canonical gap plus reproducible evidence compatible with existing invariants. P3-R12 deliberately stops before direction/delta/comparison/ranking/promotion, so a narrow directional/comparison-evidence hypothesis may be investigated later, but it is not authority.

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
P3-R13+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
THREE-OR-MORE-CASE / UNBOUNDED REDUCTION = NOT_AUTHORIZED
CROSS-DIMENSION AGGREGATE SCORE = NOT_AUTHORIZED
DIRECTION / DELTA / BETTER-WORSE = NOT_AUTHORIZED
MULTI-STRATEGY COMPARISON / RANKING / PROMOTION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```
