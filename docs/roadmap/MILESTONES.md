# Kodac Engineering Milestones

## Authority

This file is a current milestone ledger. It does not authorize implementation, execution, release, provider/model access, persistence, learning, dependencies, comparison execution, public claims, or side effects. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization records remain authoritative.

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
| P2-R1 | **CLOSED_CANONICAL** | Deterministic contract + repository-authored synthetic fixture/manifest spine |
| P2-R2 | **CLOSED_CANONICAL** | Deterministic caller-observation report spine |
| P2-R3 | **CLOSED_CANONICAL** | Explicit reducers/missingness + task-family summaries |
| P2-R4 | **CLOSED_CANONICAL** | Controlled per-metric raw pairwise comparison |
| P2-R5 | **CLOSED_CANONICAL** | Metric-local declared-direction relation |
| P2 bounded R1-R5 engineering closeout | **CONDITIONAL CLOSEOUT CANDIDATE** | Becomes closed only after this exact closeout merge and mandatory post-merge proof |
| P2 overall | **OPEN** | General/public KodacBench is not closed |
| P2-R6+ | **NOT_AUTHORIZED** | No R6 is required by label; separate authority required if broader semantics are justified |
| P3 Context Engine v2 | **NOT_AUTHORIZED** | Definition/planning candidate only after bounded P2 closeout |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

## Canonical P2 anchors

```text
P2-R1 authorization  = PR #237 / 1cd2fc4de1eb5849cbe2519ae1699bc2acc56397
P2-R1 implementation = PR #238 / c499c8ac098cca9719eaad3cacadd2af7d1c0a1f
P2-R2 authorization  = PR #239 / f2b8d452e93ec207ebe04c9db7d47dc032df20de
P2-R2 implementation = PR #240 / 4a0b2c67dbd707c18395b0898752c111ca6b16a9
P2-R3 authorization  = PR #241 / d398983a457060dff0b700714d3eebbc4dce8e23
P2-R3 implementation = PR #242 / 20cb3d2e277513fc3cefa71fe9fda03f25fd418a
P2-R4 authorization  = PR #243 / 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26
P2-R4 implementation = PR #244 / a97436df6008e37baf544345893b414d70b40c19
P2-R4 reconciliation = PR #245 / 16c2e410fe3e62eb0c5bed6f0640dffd9c5e1f4f
P2-R5 authorization  = PR #246 / f1f33a01a3d5c764ac59a292464322c3c7c7b3de
P2-R5 implementation = PR #247 / 7e92fece64807c03981091cd825f2c5e848356ce
P2-R5 reconciliation = PR #248 / e911bd68988163d9b4cbfab9f7f2c99b6067c3fd
P2 bounded closeout authorization = PR #249 / cb8315eb9e73f36586d37123fca5fe45c040da2b
```

## Active P2 bounded closeout

PR #249 canonically authorizes one later documentation/evidence-only six-path closeout. The authority became effective only after its merge and post-merge proof; it grants no runtime implementation authority.

The active closeout candidate may establish only:

```text
P2 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
```

The closeout evidence must bind the actual R1-R5 authorization/implementation ancestry, exact qualified heads/trees/blobs/checks, repair history, no-authority-by-composition boundaries, and active no-bypass ruleset. It may not rewrite historical candidate-time evidence or failed heads as successes.

## Material history preserved by the closeout

At minimum the closeout preserves:

- R1 strict-TypeScript fix-forward history and the later hostile-canonicalization `__proto__`/non-JSON repair;
- R1 evidence-layering reconciliation separating candidate-time evidence from later post-merge closure proof;
- R4 authorization `expected_count` contradiction repair;
- R4 dedicated key-order determinism regression proof;
- R4 first post-merge K2 Linux timing failure and same-SHA successful retry, with no byte change and no waiver;
- R5 WIP TypeScript failure on `9169883db3239289f76886a75cb5563a8d65c099` before final forward repair and qualification.

## Bounded P2 exit meaning

```text
R1 = CONTRACT + SYNTHETIC FROZEN FIXTURE/MANIFEST SPINE
R2 = CALLER-OBSERVATION REPORT
R3 = TASK-FAMILY REDUCER/MISSINGNESS SUMMARY
R4 = CONTROLLED PER-METRIC RAW COMPARISON
R5 = METRIC-LOCAL DIRECTIONAL RELATION
```

Even if the closeout gate passes:

```text
P2 BOUNDED R1-R5 CLOSED != P2 OVERALL CLOSED
P2 BOUNDED R1-R5 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P2 BOUNDED R1-R5 CLOSED != REAL PROVIDER / MODEL BENCHMARK EXECUTION
P2 BOUNDED R1-R5 CLOSED != GLOBAL WINNER / RANKING / SUPERIORITY
P2 BOUNDED R1-R5 CLOSED != THRESHOLD / STATISTICAL CLAIM
P2 BOUNDED R1-R5 CLOSED != PROMOTION / DONOR REPLACEMENT
P2 BOUNDED R1-R5 CLOSED != RELEASE / PACKAGE PUBLICATION
P2 BOUNDED R1-R5 CLOSED != P2-R6+ AUTHORITY
P2 BOUNDED R1-R5 CLOSED != P3 IMPLEMENTATION AUTHORITY
```

## Next boundary after successful closeout

After and only after the exact bounded P2 closeout becomes canonical and post-merge proven, the next eligible unit is:

```text
P3 CONTEXT ENGINE V2 DEFINITION / PLANNING / AUTHORIZATION-CANDIDATE PREPARATION ONLY
P3 IMPLEMENTATION = NOT AUTHORIZED
```

No provider/model execution, embeddings, new dependency, network/secret access, persistence, repository-local learning, cross-repository retrieval, or product integration is implied by that planning step.

## Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT AUTHORIZED
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT AUTHORIZED
THRESHOLD / TOLERANCE / STATISTICS / SIGNIFICANCE = NOT AUTHORIZED
DONOR REPLACEMENT / PROMOTION = NOT AUTHORIZED
PERSISTENCE / DATABASE / BENCHMARK FILE OUTPUT = NOT AUTHORIZED
TELEMETRY / UPLOAD / ANALYTICS EGRESS = NOT AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT AUTHORIZED
P3-P8 IMPLEMENTATION = NOT AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT AUTHORIZED
RULESET CHANGE / BYPASS = NOT AUTHORIZED
WAIVER = NO
```

Engineering milestone closure remains separate from public versioning, package publication, production readiness, support, compatibility, benchmark claims, and brand launch.
