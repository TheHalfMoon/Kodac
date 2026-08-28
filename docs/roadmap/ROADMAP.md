# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation authority. Live GitHub, `AGENTS.md`, governing ADRs, and the exact canonical authorization record for the active unit always win.

## Canonical truth anchors

```text
K6 closeout merge  = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2-R1 auth / impl  = PR #237 / 1cd2fc4de1eb5849cbe2519ae1699bc2acc56397 -> PR #238 / c499c8ac098cca9719eaad3cacadd2af7d1c0a1f
P2-R2 auth / impl  = PR #239 / f2b8d452e93ec207ebe04c9db7d47dc032df20de -> PR #240 / 4a0b2c67dbd707c18395b0898752c111ca6b16a9
P2-R3 auth / impl  = PR #241 / d398983a457060dff0b700714d3eebbc4dce8e23 -> PR #242 / 20cb3d2e277513fc3cefa71fe9fda03f25fd418a
P2-R4 auth / impl  = PR #243 / 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26 -> PR #244 / a97436df6008e37baf544345893b414d70b40c19
P2-R5 auth / impl  = PR #246 / f1f33a01a3d5c764ac59a292464322c3c7c7b3de -> PR #247 / 7e92fece64807c03981091cd825f2c5e848356ce
Improvement plan  = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
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
| K6 | **CLOSED_CANONICAL for bounded R1-R5 scope** | No execution/persistence/learning/promotion authority by composition |
| P2-R1 | **CLOSED_CANONICAL** | Contract + frozen fixture/manifest spine |
| P2-R2 | **CLOSED_CANONICAL** | Deterministic caller-observation report spine |
| P2-R3 | **CLOSED_CANONICAL** | Explicit reducer policy + task-family summaries |
| P2-R4 | **CLOSED_CANONICAL** | Controlled pairwise raw-delta comparison only |
| P2-R5 | **CLOSED_CANONICAL** | Metric-local direction-aware relation only |
| P2 overall | **OPEN** | Bounded R1-R5 closeout not yet canonical; general/public KodacBench not closed |
| P2-R6+ | **NOT_AUTHORIZED** | Only required if a later separately authorized broader benchmark semantic is needed |
| P3-P8 | **NOT_AUTHORIZED** | Later improvement stages require separate authority |

Engineering milestone state is separate from public release status.

## P2-R5 canonical closure

P2-R5 is closed for its exact pure in-memory metric-local directional-relation scope.

```text
AUTHORIZATION = PR #246 / f1f33a01a3d5c764ac59a292464322c3c7c7b3de
QUALIFIED_HEAD = 7e63cdfb689be15efea14bfe8b1862cccced73a2
QUALIFIED_TREE = 4242fbad9e25d3332460324ac5e8277838ff468c
MERGE = PR #247 / 7e92fece64807c03981091cd825f2c5e848356ce
MERGE_PARENT_1 = f1f33a01a3d5c764ac59a292464322c3c7c7b3de
MERGE_PARENT_2 = 7e63cdfb689be15efea14bfe8b1862cccced73a2
MERGE_VERIFICATION = verified / valid
POST_MERGE_GOVERNANCE = 33199492928 / SUCCESS
POST_MERGE_K2_RUNTIME = 33199492770 / SUCCESS
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

Canonical R5 blobs:

```text
packages/kodac-runtime/bench/p2-r5/relation.ts
  = e55e2ce138ab88132f0fddb79faa3ecac8db4e14
packages/kodac-runtime/test/p2-r5-relation.test.ts
  = ce9406bb3befca3222241e8f470bb90945d6aaf8
docs/planning/KODAC_P2_R5_DIRECTIONAL_METRIC_RELATION_EVIDENCE_2026-08-28.md
  = 8bb343916cece955bd1f78d284ccdf8e5d87ed0d
```

The implementation independently revalidates the serialized R4 comparison it consumes, preserves task-family separation and raw `left - right` evidence, and adds only the four authorized metric-local relations. Exact equality has no tolerance. Insufficient evidence cannot infer a side relation.

Historical WIP K2 run `33198255234` remains a failure at Typecheck on head `9169883db3239289f76886a75cb5563a8d65c099`; tests did not run there. The defect was repaired forward and final qualification/post-merge proof passed without waiver or history rewriting.

R5 does **not** create a global winner/loser verdict, ranking, leaderboard, threshold/tolerance, blended score, statistics, significance, promotion, provider/model execution, benchmark execution, persistence, telemetry, product integration, release, or public superiority claim.

## Next proposed P2 unit

After this reconciliation itself becomes canonical and post-merge proven, the next eligible work is **P2 bounded R1-R5 closeout authorization-candidate preparation only**.

That closeout candidate may prove only the exact bounded engineering spine already canonical through R1-R5. It must preserve:

```text
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL PROVIDER / MODEL BENCHMARK EXECUTION = NOT AUTHORIZED
GLOBAL SUPERIORITY / WINNER CLAIMS = NOT AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT AUTHORIZED
P3 IMPLEMENTATION = NOT AUTHORIZED
```

No R6 slice is implied. The R5 authorization says broader benchmark semantics, if actually needed, must become a new P2-R6+ authorization candidate rather than being absorbed into R5.

## Ordered improvement program

```text
K6 bounded closeout
-> P2 KodacBench bounded measurement spine
   -> R1 contract + frozen fixture/manifest spine [CLOSED_CANONICAL]
   -> R2 local deterministic runner/report [CLOSED_CANONICAL]
   -> R3 explicit reducer/task-family summary [CLOSED_CANONICAL]
   -> R4 controlled pairwise raw comparison [CLOSED_CANONICAL]
   -> R5 direction-aware per-metric relation [CLOSED_CANONICAL]
   -> bounded R1-R5 closeout [AUTHORIZATION CANDIDATE PREPARATION ONLY]
   -> R6+ only if separately justified and authorized [NOT_AUTHORIZED]
-> P3 Context Engine v2 [NOT_AUTHORIZED]
-> P4 Reviewer Intelligence v2 [NOT_AUTHORIZED]
-> P5 Finding Verifier Fabric [NOT_AUTHORIZED]
-> P6 Security Validation [NOT_AUTHORIZED]
-> P7 Bounded Autofix [NOT_AUTHORIZED]
-> P8 Product / Distribution Hardening [NOT_AUTHORIZED]
```

## Preserved authority boundaries

```text
INTELLIGENCE != AUTHORITY
BENCHMARK EVIDENCE != EXECUTION AUTHORITY
RAW DELTA != GLOBAL WINNER
PER-METRIC DIRECTIONAL RELATION != PRODUCT SUPERIORITY
BOUNDED P2 CLOSEOUT != PUBLIC / GENERAL BENCHMARK CLAIM
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
P2-R6+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT AUTHORIZED
PUBLIC RELEASE / SUPERIORITY CLAIM = NOT AUTHORIZED
RULESET CHANGE / BYPASS = NOT AUTHORIZED
```

Every later unit remains fail-closed until its separate authorization, exact-head qualification, guarded merge, and required post-merge proof succeed.
