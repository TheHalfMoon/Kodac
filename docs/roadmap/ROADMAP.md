# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation authority. Live GitHub, `AGENTS.md`, governing ADRs, and the exact canonical authorization record for the active unit always win.

## Canonical truth anchors

```text
K6 closeout merge  = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2-R1 auth merge   = PR #237 / 1cd2fc4de1eb5849cbe2519ae1699bc2acc56397
P2-R1 impl merge   = PR #238 / c499c8ac098cca9719eaad3cacadd2af7d1c0a1f
P2-R2 auth merge   = PR #239 / f2b8d452e93ec207ebe04c9db7d47dc032df20de
P2-R2 impl merge   = PR #240 / 4a0b2c67dbd707c18395b0898752c111ca6b16a9
P2-R3 auth merge   = PR #241 / d398983a457060dff0b700714d3eebbc4dce8e23
P2-R3 impl merge   = PR #242 / 20cb3d2e277513fc3cefa71fe9fda03f25fd418a
P2-R4 auth merge   = PR #243 / 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26
P2-R4 impl merge   = PR #244 / a97436df6008e37baf544345893b414d70b40c19
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
| P2-R5 | **NOT_AUTHORIZED** | Separate exact authorization required |
| P2-R6+ | **NOT_AUTHORIZED** | Separate exact authorization required |
| P3-P8 | **NOT_AUTHORIZED** | Later improvement stages require separate authority |

Engineering milestone state is separate from public release status.

## P2-R4 canonical closure

P2-R4 is closed for its exact pure in-memory controlled pairwise-comparison scope.

```text
AUTHORIZATION = PR #243 / 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26
QUALIFIED_HEAD = c0b1098dd45ec3b6a76ec2abf094813624a9ae56
QUALIFIED_TREE = 691279ea5f4e4bea5dcdaf189d0f378260399033
MERGE = PR #244 / a97436df6008e37baf544345893b414d70b40c19
MERGE_PARENT_1 = 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26
MERGE_PARENT_2 = c0b1098dd45ec3b6a76ec2abf094813624a9ae56
MERGE_VERIFICATION = verified / valid
POST_MERGE_GOVERNANCE = 33195761378 / SUCCESS
POST_MERGE_K2_RUNTIME = 33195761314 / ATTEMPT 2 / SUCCESS
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

Canonical R4 blobs:

```text
packages/kodac-runtime/bench/p2-r4/comparison.ts
  = 78c1417e51f1c36989ec7ec700a3424df3b58944
packages/kodac-runtime/test/p2-r4-comparison.test.ts
  = 844eba6eb456752925f914c732ccfccf2778b050
packages/kodac-runtime/test/p2-r4-key-order.test.ts
  = c15908c3dc4221f92347b97a93b9504fce65baf0
docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_EVIDENCE_2026-08-28.md
  = 9830a418b274f5d740c12236e87dd0981303f8c7
```

The first K2 post-merge attempt failed only the pre-existing Linux H4-R3G-B global-deadline timing assertion. P2-R4 tests passed in that attempt. No bytes changed and no waiver was used. Attempt 2 on the same merge SHA passed Ubuntu and `k2-runtime-gate`; macOS and Windows remained successful. Historical failure evidence is preserved.

R4 consumes two already-materialized R2/R3 evidence sets under one exact shared ADR-0010 evaluation context and an explicit per-metric direction policy. It revalidates/cross-binds both sides, requires exact benchmark/task topology, keeps task families separate, exposes finite raw `left - right` deltas only for comparable metrics, preserves insufficient-evidence coverage, and derives deterministic immutable identities.

R4 does **not** emit or authorize a winner/loser/better/worse verdict, threshold, target band, ranking, leaderboard, blended score, statistics, significance, promotion, provider/model execution, benchmark execution, persistence, telemetry, product integration, release, or public superiority claim.

## Next proposed P2 slice

After this reconciliation becomes canonical and post-merge proven, the next eligible work is **P2-R5 authorization-candidate preparation only**.

The narrow design target is a pure direction-aware relation over one already-materialized P2-R4 comparison. A later authorization may permit per-metric outcomes only:

```text
LEFT_FAVORED_BY_DIRECTION
RIGHT_FAVORED_BY_DIRECTION
EQUAL_RAW_VALUE
INSUFFICIENT_EVIDENCE
```

The relation must stay task-family-separated and metric-local. It may not become a global winner, score, ranking, threshold, tolerance band, statistical test, donor replacement, promotion, release decision, or public claim by composition.

P2-R5 implementation remains `NOT_AUTHORIZED` until a separate exact canonical authorization is qualified, merged, and post-merge proven.

## Ordered improvement program

```text
K6 bounded closeout
-> P2 KodacBench
   -> R1 contract + frozen fixture/manifest spine [CLOSED_CANONICAL]
   -> R2 local deterministic runner/report [CLOSED_CANONICAL]
   -> R3 explicit reducer/task-family summary [CLOSED_CANONICAL]
   -> R4 controlled pairwise raw comparison [CLOSED_CANONICAL]
   -> R5 direction-aware per-metric relation [AUTHORIZATION CANDIDATE PREPARATION ONLY]
   -> R6+ later benchmark slices [NOT_AUTHORIZED]
-> P3 Context Engine v2
-> P4 Reviewer Intelligence v2
-> P5 Finding Verifier Fabric
-> P6 Security Validation
-> P7 Bounded Autofix
-> P8 Product / Distribution Hardening
```

## Preserved authority boundaries

```text
INTELLIGENCE != AUTHORITY
BENCHMARK EVIDENCE != EXECUTION AUTHORITY
RAW DELTA != GLOBAL WINNER
PER-METRIC DIRECTIONAL RELATION != PRODUCT SUPERIORITY
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
P2-R5 IMPLEMENTATION = NOT AUTHORIZED
P2-R6+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT AUTHORIZED
PUBLIC RELEASE / SUPERIORITY CLAIM = NOT AUTHORIZED
RULESET CHANGE / BYPASS = NOT AUTHORIZED
```

Every later unit remains fail-closed until its separate authorization, exact-head qualification, guarded merge, and required post-merge proof succeed.
