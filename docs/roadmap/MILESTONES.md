# Kodac Engineering Milestones

## Authority

This file is a current milestone ledger. It does not authorize implementation, release, provider/model access, persistence, learning, dependencies, comparison execution, or side effects. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization records remain authoritative.

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
| P2-R1 | **CLOSED_CANONICAL** | Contract + frozen fixture/manifest spine |
| P2-R2 | **CLOSED_CANONICAL** | Deterministic local report spine |
| P2-R3 | **CLOSED_CANONICAL** | Explicit reducers + task-family summaries |
| P2-R4 | **CLOSED_CANONICAL** | Controlled pairwise raw-delta comparison |
| P2-R5 | **NOT_AUTHORIZED** | Next eligible unit after this reconciliation is authorization-candidate preparation only |
| P2-R6+ | **NOT_AUTHORIZED** | Separate authority required |
| P3-P8 | **NOT_AUTHORIZED** | Later stages require dependencies and separate authority |

## Canonical P2 anchors

```text
P2-R1 authorization = PR #237 / 1cd2fc4de1eb5849cbe2519ae1699bc2acc56397
P2-R1 implementation = PR #238 / c499c8ac098cca9719eaad3cacadd2af7d1c0a1f
P2-R2 authorization = PR #239 / f2b8d452e93ec207ebe04c9db7d47dc032df20de
P2-R2 implementation = PR #240 / 4a0b2c67dbd707c18395b0898752c111ca6b16a9
P2-R3 authorization = PR #241 / d398983a457060dff0b700714d3eebbc4dce8e23
P2-R3 implementation = PR #242 / 20cb3d2e277513fc3cefa71fe9fda03f25fd418a
P2-R4 authorization = PR #243 / 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26
P2-R4 implementation = PR #244 / a97436df6008e37baf544345893b414d70b40c19
```

## P2-R4 — CLOSED_CANONICAL

```text
QUALIFIED_HEAD = c0b1098dd45ec3b6a76ec2abf094813624a9ae56
QUALIFIED_TREE = 691279ea5f4e4bea5dcdaf189d0f378260399033
MERGE = a97436df6008e37baf544345893b414d70b40c19
MERGE_PARENT_1 = 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26
MERGE_PARENT_2 = c0b1098dd45ec3b6a76ec2abf094813624a9ae56
MERGE_VERIFICATION = verified / valid
POST_MERGE_GOVERNANCE = 33195761378 / SUCCESS
POST_MERGE_K2_RUNTIME = 33195761314 / ATTEMPT 2 / SUCCESS
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

Canonical implementation blobs:

```text
comparison.ts = 78c1417e51f1c36989ec7ec700a3424df3b58944
p2-r4-comparison.test.ts = 844eba6eb456752925f914c732ccfccf2778b050
p2-r4-key-order.test.ts = c15908c3dc4221f92347b97a93b9504fce65baf0
R4 evidence = 9830a418b274f5d740c12236e87dd0981303f8c7
```

The first post-merge K2 attempt failed one pre-existing Linux H4-R3G-B timing assertion. P2-R4 tests passed. No repository bytes changed and no waiver was used. A same-SHA Ubuntu retry passed, and the dependent `k2-runtime-gate` passed in attempt 2; macOS and Windows remained successful.

R4 authorizes only exact controlled-context, per-metric raw pairwise comparison. It does not authorize global winner/loser semantics, thresholds, statistics, ranking, provider/model execution, benchmark execution, product integration, persistence, promotion, release, or public superiority claims.

## Next boundary

After this reconciliation is canonical and post-merge proven, the next eligible unit is **P2-R5 authorization-candidate preparation only**.

A future R5 authorization may define a pure metric-local relation over a validated R4 comparison, using only the explicit R4 direction and already-materialized exact values. The candidate must keep task families separate and must preserve at least these non-grants:

```text
NO GLOBAL WINNER / LOSER
NO N-WAY RANKING / LEADERBOARD
NO THRESHOLD / TOLERANCE BAND
NO WEIGHTED / BLENDED SCORE
NO STATISTICS / SIGNIFICANCE / CONFIDENCE INTERVAL
NO DONOR REPLACEMENT / PROMOTION DECISION
NO PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION
NO BENCHMARK TASK EXECUTION
NO PERSISTENCE / TELEMETRY / LEARNING
NO RELEASE / PUBLIC SUPERIORITY CLAIM
NO K2 / K5 / DONE GATE AUTHORITY EXPANSION
```

P2-R5 implementation remains `NOT_AUTHORIZED` until a separate exact authorization record becomes canonical and post-merge proven.

## Durable sequence

```text
K6 bounded closeout
-> P2 KodacBench
   -> R1 [CLOSED_CANONICAL]
   -> R2 [CLOSED_CANONICAL]
   -> R3 [CLOSED_CANONICAL]
   -> R4 [CLOSED_CANONICAL]
   -> R5 [AUTHORIZATION CANDIDATE PREPARATION ONLY]
   -> R6+ [NOT_AUTHORIZED]
-> P3 Context Engine v2
-> P4 Reviewer Intelligence v2
-> P5 Finding Verifier Fabric
-> P6 Security Validation
-> P7 Bounded Autofix
-> P8 Product / Distribution Hardening
```

Engineering milestone closure remains separate from package publication, public version declaration, production readiness, support promises, compatibility claims, product superiority, and brand launch.
