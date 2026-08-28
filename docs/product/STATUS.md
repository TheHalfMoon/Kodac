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
P2-R5 = CLOSED_CANONICAL
P2 BOUNDED R1-R5 CLOSEOUT = NOT YET CANONICAL
P2-R6+ = NOT_AUTHORIZED
P2 = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P3-P8 = NOT_AUTHORIZED
WAIVER = NO
```

## P2-R5 canonical closure

```text
AUTHORIZATION = PR #246 / f1f33a01a3d5c764ac59a292464322c3c7c7b3de
QUALIFIED_HEAD = 7e63cdfb689be15efea14bfe8b1862cccced73a2
QUALIFIED_TREE = 4242fbad9e25d3332460324ac5e8277838ff468c
IMPLEMENTATION_MERGE = PR #247 / 7e92fece64807c03981091cd825f2c5e848356ce
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

Historical WIP K2 run `33198255234` on head `9169883db3239289f76886a75cb5563a8d65c099` remains a real Typecheck failure; tests did not run on that head. It was repaired forward and the final exact-head plus post-merge gates succeeded without waiver or history rewrite.

R5 validates caller-materialized serialized R4 evidence and emits only metric-local direction-aware relations. It does not create a global winner/loser, ranking, threshold/tolerance, statistics, donor replacement, promotion, provider/model execution, benchmark execution, persistence, telemetry, release, or public superiority authority.

## Next engineering boundary

This reconciliation is documentation/status only. If and only if it becomes canonical and post-merge proven, the next eligible unit is **P2 bounded R1-R5 closeout authorization-candidate preparation only**.

That closeout may prove only the deterministic engineering surface already canonical through R1-R5. It must preserve:

```text
P2 OVERALL / GENERAL KODACBENCH != PUBLIC BENCHMARK CLAIM
REAL PROVIDER / MODEL BENCHMARK EXECUTION = NOT AUTHORIZED
GLOBAL WINNER / RANKING / SUPERIORITY = NOT AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT AUTHORIZED
P3 IMPLEMENTATION = NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION = NOT AUTHORIZED
```

A later P2-R6+ unit is required only if broader benchmark semantics are actually justified and separately authorized. The existence of an R6 label grants nothing.

## Preserved non-grants

```text
KRI-R5+ IMPLEMENTATION = NOT AUTHORIZED
K3-R7+ = NOT AUTHORIZED
K4-R6+ = NOT AUTHORIZED
K5-R6+ = NOT AUTHORIZED
K6-R6+ = NOT AUTHORIZED
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
