# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, successor, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records always win.

## Canonical truth anchors

```text
K6 bounded closeout        = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout        = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3 bounded R1-R5 closeout  = PR #270 / 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
P3-R12 reconciliation     = PR #294 / ad0c3e1236c546c005c7f688f991ecbc9ed64fa5
P3-R13 implementation     = PR #296 / 931c750681494895da046f4ba9c8406d77fcfddf
P3-R13 reconciliation     = PR #297 / 42da1bcef8bdcb8cfe025355dba8df9021263672
P3-R14 authorization      = PR #298 / fbbbcf13bdb281f0fe4296045ec2e2fa7311acdb
P3-R14 implementation     = PR #299 / 6aa3e35418f95a2e198e3b8431297ab277eec6d3
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
R13: #295 authorization -> #296 implementation -> #297 reconciliation
R14: #298 authorization -> #299 implementation -> current-view reconciliation candidate
```

## Canonical P3-R14 proof

```text
P3_R13_CURRENT_VIEW_RECONCILIATION_PR = #297
P3_R13_CURRENT_VIEW_RECONCILIATION_MERGE = 42da1bcef8bdcb8cfe025355dba8df9021263672

P3_R14_AUTHORIZATION_PR = #298
P3_R14_AUTHORIZATION_BLOB = 5a5f6cd9e2f52bcadc1ee0af0882f3a744487290
P3_R14_AUTHORIZATION_MERGE = fbbbcf13bdb281f0fe4296045ec2e2fa7311acdb
P3_R14_AUTHORIZATION_POST_MERGE_PROOF = #298 / 5500736118

P3_R14_IMPLEMENTATION_PR = #299
P3_R14_QUALIFIED_HEAD = cbb5e1d8b11d15c35479856d8e79fd5dafb4ac9d
P3_R14_QUALIFIED_TREE = 59dc74a3700129a9f34b0453fd8bc6c75362f6ad
P3_R14_QUALIFICATION_PROOF = #299 / 5509427079
P3_R14_SEMANTIC_REVIEW = Cubic 5509354561 + CodeRabbit 3913967177
P3_R14_MERGE = 6aa3e35418f95a2e198e3b8431297ab277eec6d3
P3_R14_MERGE_TREE = 59dc74a3700129a9f34b0453fd8bc6c75362f6ad
P3_R14_MERGE_VERIFICATION = verified / valid
P3_R14_POST_MERGE_GOVERNANCE = 33629399450 / SUCCESS
P3_R14_POST_MERGE_PROVENANCE = 100244817246 / SUCCESS
P3_R14_POST_MERGE_LEGACY_TESTS = 100244817077 / SUCCESS
P3_R14_POST_MERGE_K2 = 33629399756 / SUCCESS
P3_R14_POST_MERGE_CLASSIFIER = 100244818046 / SUCCESS
P3_R14_POST_MERGE_WINDOWS = 100244850923 / SUCCESS
P3_R14_POST_MERGE_UBUNTU = 100244850933 / SUCCESS
P3_R14_POST_MERGE_MACOS = 100244851149 / SUCCESS
P3_R14_POST_MERGE_K2_GATE = 100245267248 / SUCCESS
P3_R14_POST_MERGE_PROOF = #299 / 5509458721
P3_R14_RECONCILIATION_BOUNDARY = #299 / 5509463764
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R14 blobs:

```text
packages/kodac-runtime/bench/p3-r14/contracts.ts = ef521e99559966cdd66f6c6c5215255aefc4b27b
packages/kodac-runtime/bench/p3-r14/strategy-reduction-pairwise-comparison.ts = 784cb3ccc884fca67411d87be19f30d3cca2cf9a
packages/kodac-runtime/test/p3-r14-strategy-reduction-pairwise-comparison.test.ts = 310ca4ebf1e245fbcfddfd664f66241a4e2f54ac
docs/planning/KODAC_P3_R14_STRATEGY_REDUCTION_PAIRWISE_COMPARISON_EVIDENCE_2026-09-02.md = e2c366e75c9d248f5a68135210ae475f7b4033f7
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
| P3-R1 through P3-R14 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms only |
| P3-R14 | **CLOSED_CANONICAL** | Controlled two-strategy, seven-dimension raw pairwise comparison evidence only |
| P3-R14 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / CANDIDATE** | Exactly five current-view files |
| P3 overall | **OPEN** | No favored verdict, aggregate score, ranking/promotion/default, real benchmark execution, or public quality claim established |
| P3-R15+ | **NOT_AUTHORIZED** | No later slice is implied by numbering |
| P4-P8 | **NOT_AUTHORIZED** | Ordered dependencies and separate authority required |

Engineering milestone state is separate from public release status.

## Bounded P3 R1-R14 result

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
R10 = deterministic seven-dimension metric/unit alignment evidence for the two R9 members, preserving both observations without arithmetic or directional semantics
R11 = deterministic binding of exactly seven explicit P2-R3-compatible reduction policies to the aligned pair, validating benchmark/protocol/value-kind continuity without executing reduction
R12 = deterministic application of those exact bound policies to the exact two trusted observations, emitting only per-dimension REDUCED or INSUFFICIENT_EVIDENCE reduction evidence
R13 = deterministic binding of exactly seven explicit HIGHER_IS_BETTER | LOWER_IS_BETTER directions to the exact reconstructed R12 semantics while preserving complete trusted R12 evidence
R14 = deterministic controlled comparison of exactly two independently reconstructed R13 records under identical corresponding plan/task/case/ground-truth controls, emitting only per-dimension COMPARABLE | INSUFFICIENT_EVIDENCE and raw unnormalized left-minus-right deltas when comparable
```

These remain evidence mechanisms, not repository decisions:

```text
RAW PAIRWISE DELTA != FAVORED SIDE
RAW PAIRWISE DELTA != BETTER / WORSE / TIE VERDICT
RAW PAIRWISE DELTA != STATISTICAL EVIDENCE
PER-DIMENSION PAIRWISE EVIDENCE != CROSS-DIMENSION AGGREGATE SCORE
EXACTLY-TWO-STRATEGY COMPARISON != MULTI-STRATEGY RANKING
COMPARISON EVIDENCE != PROMOTION / DEFAULT / WINNER
COMPARISON EVIDENCE != REAL BENCHMARK EXECUTION
P3 R1-R14 CLOSED != P3 OVERALL CLOSED
P3 R1-R14 CLOSED != P3-R15+ AUTHORITY
P3 R1-R14 CLOSED != P4 AUTHORITY
```

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1-R14 bounded mechanisms [CLOSED_CANONICAL]
   -> R14 current-view roadmap/status reconciliation [CURRENT DOCS-ONLY UNIT]
   -> fresh successor analysis [ONLY AFTER RECONCILIATION CLOSES]
   -> later bounded P3 definition / authorization-candidate work [ONLY IF A CONCRETE GAP IS PROVEN]
   -> P3-R15+ implementation [NOT_AUTHORIZED]
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

Only after the R14 current-view reconciliation becomes canonical and post-merge proven may another bounded P3 definition/planning/authorization candidate be considered.

No `P3-R15`, favored relation, better/worse verdict, aggregate score, ranking, promotion, default, statistics, statistical significance, confidence, p-value, effect-size policy, benchmark execution, P4-P8, or project-completion requirement is inferred from sequence alone. A later candidate requires a concrete canonical gap plus reproducible evidence compatible with all established invariants.

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
FAVORED / BETTER-WORSE / TIE = NOT_AUTHORIZED
CROSS-DIMENSION AGGREGATE SCORE = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
MULTI-STRATEGY RANKING / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER = NOT_AUTHORIZED
P3-R15+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```
