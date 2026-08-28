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
| P2-R5 | **CLOSED_CANONICAL** | Metric-local direction-aware relation |
| P2 bounded R1-R5 closeout | **NOT YET CANONICAL** | Next eligible unit after this reconciliation is closeout authorization-candidate preparation only |
| P2-R6+ | **NOT_AUTHORIZED** | Separate authority only if broader benchmark semantics are later justified |
| P3-P8 | **NOT_AUTHORIZED** | Later stages require separate authority |

## Canonical P2 anchors

```text
P2-R1 authorization / implementation = PR #237 / 1cd2fc4de1eb5849cbe2519ae1699bc2acc56397 -> PR #238 / c499c8ac098cca9719eaad3cacadd2af7d1c0a1f
P2-R2 authorization / implementation = PR #239 / f2b8d452e93ec207ebe04c9db7d47dc032df20de -> PR #240 / 4a0b2c67dbd707c18395b0898752c111ca6b16a9
P2-R3 authorization / implementation = PR #241 / d398983a457060dff0b700714d3eebbc4dce8e23 -> PR #242 / 20cb3d2e277513fc3cefa71fe9fda03f25fd418a
P2-R4 authorization / implementation = PR #243 / 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26 -> PR #244 / a97436df6008e37baf544345893b414d70b40c19
P2-R5 authorization / implementation = PR #246 / f1f33a01a3d5c764ac59a292464322c3c7c7b3de -> PR #247 / 7e92fece64807c03981091cd825f2c5e848356ce
```

## P2-R5 — CLOSED_CANONICAL

```text
QUALIFIED_HEAD = 7e63cdfb689be15efea14bfe8b1862cccced73a2
QUALIFIED_TREE = 4242fbad9e25d3332460324ac5e8277838ff468c
MERGE = 7e92fece64807c03981091cd825f2c5e848356ce
MERGE_PARENT_1 = f1f33a01a3d5c764ac59a292464322c3c7c7b3de
MERGE_PARENT_2 = 7e63cdfb689be15efea14bfe8b1862cccced73a2
MERGE_VERIFICATION = verified / valid
POST_MERGE_GOVERNANCE = 33199492928 / SUCCESS
POST_MERGE_K2_RUNTIME = 33199492770 / SUCCESS
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

Canonical implementation blobs:

```text
relation.ts = e55e2ce138ab88132f0fddb79faa3ecac8db4e14
p2-r5-relation.test.ts = ce9406bb3befca3222241e8f470bb90945d6aaf8
R5 evidence = 8bb343916cece955bd1f78d284ccdf8e5d87ed0d
```

Historical WIP K2 run `33198255234` on head `9169883db3239289f76886a75cb5563a8d65c099` remains a Typecheck failure. Tests did not run there. The defect was repaired forward; final qualification and post-merge proof passed without waiver, force-push, rebase, or destructive history rewrite.

R5 is limited to exact revalidation of caller-materialized serialized R4 comparison evidence followed by the four metric-local directional relations. It does not authorize a global winner, ranking, threshold/tolerance, statistics, donor replacement, promotion, provider/model execution, benchmark execution, persistence, telemetry, product integration, release, or public superiority claim.

## Next boundary

After this reconciliation becomes canonical and post-merge proven, the next eligible unit is **P2 bounded R1-R5 closeout authorization-candidate preparation only**.

A future bounded closeout may establish only that the already-canonical R1-R5 engineering spine is closed for its exact deterministic in-memory scope. It may not establish:

```text
GENERAL / PUBLIC KODACBENCH COMPLETE
REAL PROVIDER / MODEL BENCHMARK EXECUTION
GLOBAL WINNER / RANKING / SUPERIORITY
P2-R6+ AUTHORITY
P3 IMPLEMENTATION AUTHORITY
PUBLIC RELEASE / PACKAGE PUBLICATION
```

The existence of the label `P2-R6+` does not itself require or authorize another slice. The canonical R5 authorization requires a separate R6+ authorization only if broader benchmark semantics are actually needed.

## Durable sequence

```text
K6 bounded closeout
-> P2 KodacBench bounded measurement spine
   -> R1 [CLOSED_CANONICAL]
   -> R2 [CLOSED_CANONICAL]
   -> R3 [CLOSED_CANONICAL]
   -> R4 [CLOSED_CANONICAL]
   -> R5 [CLOSED_CANONICAL]
   -> bounded R1-R5 closeout [AUTHORIZATION CANDIDATE PREPARATION ONLY]
   -> R6+ [NOT_AUTHORIZED / ONLY IF LATER JUSTIFIED]
-> P3 Context Engine v2 [NOT_AUTHORIZED]
-> P4 Reviewer Intelligence v2 [NOT_AUTHORIZED]
-> P5 Finding Verifier Fabric [NOT_AUTHORIZED]
-> P6 Security Validation [NOT_AUTHORIZED]
-> P7 Bounded Autofix [NOT_AUTHORIZED]
-> P8 Product / Distribution Hardening [NOT_AUTHORIZED]
```

Engineering milestone closure remains separate from package publication, public version declaration, production readiness, support promises, compatibility claims, product superiority, and brand launch.
