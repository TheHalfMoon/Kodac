# Product Document Authority Status

The pre-existing files in `docs/product/` remain preserved historical planning inputs. They do not override accepted Kodac ADRs, live GitHub truth, current roadmap views, or exact canonical authorization/evidence records.

## Canonical engineering state

```text
K3 = CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
K4 = CLOSED FOR THE CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K5 = CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE

P2-R1 = CLOSED_CANONICAL
P2-R2 = CLOSED_CANONICAL
P2-R3 = CLOSED_CANONICAL
P2-R4 = CLOSED_CANONICAL
P2-R5 = NOT_AUTHORIZED
P2-R6+ = NOT_AUTHORIZED
P2 = OPEN
P3-P8 = NOT_AUTHORIZED
WAIVER = NO
```

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

## P2-R4 canonical closure

P2-R4 is `CLOSED_CANONICAL` for its exact pure in-memory controlled pairwise comparison scope.

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

The first K2 post-merge attempt exposed one unrelated Linux H4-R3G-B deadline timing failure. All P2-R4 tests passed in that attempt. No repository bytes changed and no waiver was used. A same-SHA Ubuntu retry passed and the dependent `k2-runtime-gate` passed in attempt 2; macOS and Windows remained successful.

R4 is limited to strict revalidation/cross-binding of two already-materialized R2/R3 evidence sets under one exact shared ADR-0010 evaluation context, explicit per-metric direction, task-family separation, finite raw `left - right` deltas for comparable metrics, explicit insufficient evidence, deterministic identities, and deep immutability.

R4 does not grant winner/loser/better/worse or product-superiority semantics, thresholds, ranking, statistics, promotion, provider/model execution, benchmark execution, persistence, telemetry, release, or public claims.

## Next engineering boundary

This reconciliation is documentation/status only. If and only if it becomes canonical and post-merge proven, the next eligible unit is **P2-R5 authorization-candidate preparation only**.

A future R5 gate may narrowly define a metric-local direction-aware relation over a validated P2-R4 comparison. Any such authorization must keep task families separate and preserve explicit negative space around global winners, N-way ranking, thresholds/tolerance, statistics, donor replacement, promotion, external execution, persistence, release, and public claims.

P2-R5 implementation remains `NOT_AUTHORIZED` until a separate exact authorization record is canonical and post-merge proven.

## Preserved non-grants

```text
KRI-R5+ IMPLEMENTATION = NOT AUTHORIZED
K3-R7+ = NOT AUTHORIZED
K4-R6+ = NOT AUTHORIZED
K5-R6+ = NOT AUTHORIZED
K6-R6+ = NOT AUTHORIZED
P2-R5 IMPLEMENTATION = NOT AUTHORIZED
P2-R6+ = NOT AUTHORIZED
P3-P8 IMPLEMENTATION = NOT AUTHORIZED

PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT AUTHORIZED
BENCHMARK TASK EXECUTION = NOT AUTHORIZED
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT AUTHORIZED
THRESHOLD / TOLERANCE / STATISTICS / SIGNIFICANCE = NOT AUTHORIZED
DONOR REPLACEMENT / PROMOTION = NOT AUTHORIZED
PERSISTENCE / DATABASE / BENCHMARK FILE OUTPUT = NOT AUTHORIZED
TELEMETRY / UPLOAD / ANALYTICS EGRESS = NOT AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT AUTHORIZED
RULESET CHANGE / BYPASS = NOT AUTHORIZED
```

Engineering milestone status is separate from public release, package publication, production-readiness, support, compatibility, and superiority claims.
