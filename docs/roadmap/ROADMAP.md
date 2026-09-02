# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, successor, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records always win.

## Canonical truth anchors

```text
K6 bounded closeout        = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout        = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3 bounded R1-R5 closeout  = PR #270 / 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
P3-R14 reconciliation      = PR #300 / 1e244c64926e4035134d9b4e995acb2d6b82e722
P3-R15 authorization       = PR #301 / 53c9bde577783aef672504f9a463be30bcc8c657
P3-R15 implementation      = PR #302 / ffc9fae7f3bbb309fa5318e8747e7969726d8a1e
Improvement master plan    = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
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
R13: #295 authorization -> #296 implementation -> #297 reconciliation
R14: #298 authorization -> #299 implementation -> #300 reconciliation
R15: #301 authorization -> #302 implementation -> current-view reconciliation candidate
```

## Canonical P3-R15 proof

```text
P3_R14_CURRENT_VIEW_RECONCILIATION_PR = #300
P3_R14_CURRENT_VIEW_RECONCILIATION_MERGE = 1e244c64926e4035134d9b4e995acb2d6b82e722
P3_R14_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #300 / 5510196174
P3_R15_SUCCESSOR_ANALYSIS = #300 / 5510243321

P3_R15_AUTHORIZATION_PR = #301
P3_R15_AUTHORIZATION_BLOB = 6761b811959599407caa8b3e01eccaab75aa43e9
P3_R15_AUTHORIZATION_MERGE = 53c9bde577783aef672504f9a463be30bcc8c657
P3_R15_AUTHORIZATION_POST_MERGE_PROOF = #301 / 5510832144

P3_R15_IMPLEMENTATION_PR = #302
P3_R15_QUALIFIED_HEAD = 697739cd2b21e0e3fe4bf4bfbd6f5bbc792c3619
P3_R15_QUALIFIED_TREE = af28fd6dd4e67c3a37fb18b330abfe07177b9fa2
P3_R15_PRE_MERGE_PROOF = #302 / 5513878167
P3_R15_SEMANTIC_REVIEW = CodeRabbit 5513591270 + Cubic 5513811826
P3_R15_MERGE = ffc9fae7f3bbb309fa5318e8747e7969726d8a1e
P3_R15_MERGE_TREE = af28fd6dd4e67c3a37fb18b330abfe07177b9fa2
P3_R15_MERGE_VERIFICATION = verified / valid
P3_R15_POST_MERGE_GOVERNANCE = 33663201288 / SUCCESS
P3_R15_POST_MERGE_PROVENANCE = 100358488473 / SUCCESS
P3_R15_POST_MERGE_LEGACY_TESTS = 100358488206 / SUCCESS
P3_R15_POST_MERGE_K2 = 33663201228 / SUCCESS
P3_R15_POST_MERGE_CLASSIFIER = 100358488886 / SUCCESS
P3_R15_POST_MERGE_UBUNTU = 100358536296 / SUCCESS
P3_R15_POST_MERGE_WINDOWS = 100358536358 / SUCCESS
P3_R15_POST_MERGE_MACOS = 100358536432 / SUCCESS
P3_R15_POST_MERGE_K2_GATE = 100359003357 / SUCCESS
P3_R15_POST_MERGE_PROOF = #302 / 5513965094
P3_R15_RECONCILIATION_BOUNDARY = #302 / 5513990441
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R15 blobs:

```text
packages/kodac-runtime/bench/p3-r15/contracts.ts = 5e0c2496108f0d877efaae1924418afddfc72260
packages/kodac-runtime/bench/p3-r15/strategy-reduction-directional-relation.ts = e5da22fbc7c7f4aacee80bdf3fd319fcabe81072
packages/kodac-runtime/test/p3-r15-strategy-reduction-directional-relation.test.ts = 2eab58d51bd4081932f2be88cf7eb87afb9336d2
docs/planning/KODAC_P3_R15_DIRECTIONAL_PAIRWISE_RELATION_EVIDENCE_2026-09-02.md = 124f9adaadc677b155797e5ffdaf2a63bfcbc195
```

Historical failures remain historical evidence; later recovery or closure does not erase or relabel them.

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
| P3-R1 through P3-R15 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms only |
| P3-R15 | **CLOSED_CANONICAL** | Per-dimension direction-aware relation evidence over trusted R14 only |
| P3-R15 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / CANDIDATE** | Exactly five current-view files |
| P3 overall | **OPEN** | No aggregate score, ranking/promotion/default, real benchmark execution, statistical policy, or public quality claim established |
| P3-R16+ | **NOT_AUTHORIZED** | No later slice is implied by numbering |
| P4-P8 | **NOT_AUTHORIZED** | Ordered dependencies and separate authority required |

Engineering milestone state is separate from public release status.

## Bounded P3 R1-R15 result

```text
R1  = deterministic context-selection-plan foundation
R2  = deterministic caller-declared policy application
R3  = pairwise seven-metric evidence binding and comparability-only state
R4  = literal benchmark-provenance evidence binding
R5  = caller-declared criterion-match evidence
R6  = deterministic seven-dimension measurement materialization from one reconstructed policy application plus explicit caller evaluation facts
R7  = deterministic single-case binding of reconstructed R6 measurement evidence to one generated P2-R2 report
R8  = deterministic case-invariant strategy-subject identity plus exact single-case binding to canonical P3-R1/P3-R2 identities
R9  = deterministic ordered composition of exactly two independently reconstructed R7 reports under one exact R8 strategy subject
R10 = deterministic seven-dimension metric/unit alignment evidence for the two R9 members without arithmetic or directional semantics
R11 = deterministic binding of exactly seven explicit P2-R3-compatible reduction policies to the aligned pair without reducer execution
R12 = deterministic application of those exact policies to the exact trusted observations, emitting per-dimension REDUCED or INSUFFICIENT_EVIDENCE
R13 = deterministic binding of exactly seven explicit HIGHER_IS_BETTER | LOWER_IS_BETTER directions while preserving complete trusted R12 evidence
R14 = deterministic controlled comparison of exactly two independently reconstructed R13 records under identical corresponding controls, emitting per-dimension COMPARABLE | INSUFFICIENT_EVIDENCE and raw unnormalized left-minus-right deltas when comparable
R15 = deterministic interpretation of each trusted R14 dimension under its already-bound direction into LEFT_FAVORED_BY_DIRECTION | RIGHT_FAVORED_BY_DIRECTION | EQUAL_RAW_VALUE | INSUFFICIENT_EVIDENCE while preserving the complete trusted R14 evidence
```

These remain evidence mechanisms, not repository decisions:

```text
PER-DIMENSION FAVORED_BY_DIRECTION != GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR
EQUAL_RAW_VALUE != STATISTICAL TIE / EQUIVALENCE
PER-DIMENSION RELATION EVIDENCE != CROSS-DIMENSION AGGREGATE SCORE
EXACTLY-TWO-STRATEGY RELATION EVIDENCE != MULTI-STRATEGY RANKING
RELATION EVIDENCE != PROMOTION / DEFAULT / WINNER
RELATION EVIDENCE != REAL BENCHMARK EXECUTION
P3 R1-R15 CLOSED != P3 OVERALL CLOSED
P3 R1-R15 CLOSED != P3-R16+ AUTHORITY
P3 R1-R15 CLOSED != P4 AUTHORITY
```

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1-R15 bounded mechanisms [CLOSED_CANONICAL]
   -> R15 current-view roadmap/status reconciliation [CURRENT DOCS-ONLY UNIT]
   -> fresh successor analysis [ONLY AFTER RECONCILIATION CLOSES]
   -> later bounded P3 definition / authorization-candidate work [ONLY IF A CONCRETE GAP IS PROVEN]
   -> P3-R16+ implementation [NOT_AUTHORIZED]
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

No sixth path belongs to this current-view reconciliation. No runtime source/test, historical authorization/evidence, workflow, dependency, lockfile, benchmark corpus/fixture/manifest, donor code, provider/model, persistence, telemetry, release configuration, or ruleset path may change.

The reconciliation remains a candidate until one frozen exact head proves exact five-path containment, `behind_by=0`, applicable Governance/K2 checks, two distinct independent substantive terminal-clean semantic review channels, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact expected head, and complete post-merge proof.

## Next P3 planning boundary

Only after the R15 current-view reconciliation becomes canonical and post-merge proven may another bounded P3 definition/planning/authorization candidate be considered.

No `P3-R16`, cross-dimension aggregate, ranking, promotion, winner/default, statistical policy, benchmark execution, P4-P8, or project-completion requirement is inferred from sequence alone. A later candidate requires a concrete canonical gap plus reproducible evidence compatible with all established invariants.

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
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED
GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR VERDICT = NOT_AUTHORIZED
CROSS-DIMENSION AGGREGATE SCORE / MAJORITY / PARETO POLICY = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
MULTI-STRATEGY RANKING / LEADERBOARD / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER = NOT_AUTHORIZED
P3-R16+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
