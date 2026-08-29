# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and the exact canonical authorization for the active unit always win.

## Canonical truth anchors

```text
K6 bounded closeout       = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2-R1 authorization      = PR #237 / 1cd2fc4de1eb5849cbe2519ae1699bc2acc56397
P2-R1 implementation     = PR #238 / c499c8ac098cca9719eaad3cacadd2af7d1c0a1f
P2-R2 authorization      = PR #239 / f2b8d452e93ec207ebe04c9db7d47dc032df20de
P2-R2 implementation     = PR #240 / 4a0b2c67dbd707c18395b0898752c111ca6b16a9
P2-R3 authorization      = PR #241 / d398983a457060dff0b700714d3eebbc4dce8e23
P2-R3 implementation     = PR #242 / 20cb3d2e277513fc3cefa71fe9fda03f25fd418a
P2-R4 authorization      = PR #243 / 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26
P2-R4 implementation     = PR #244 / a97436df6008e37baf544345893b414d70b40c19
P2-R4 reconciliation     = PR #245 / 16c2e410fe3e62eb0c5bed6f0640dffd9c5e1f4f
P2-R5 authorization      = PR #246 / f1f33a01a3d5c764ac59a292464322c3c7c7b3de
P2-R5 implementation     = PR #247 / 7e92fece64807c03981091cd825f2c5e848356ce
P2-R5 reconciliation     = PR #248 / e911bd68988163d9b4cbfab9f7f2c99b6067c3fd
P2 closeout authorization = PR #249 / cb8315eb9e73f36586d37123fca5fe45c040da2b
Improvement plan         = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
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
| P2-R1 | **CLOSED_CANONICAL** | Contract + repository-authored synthetic fixture/manifest spine |
| P2-R2 | **CLOSED_CANONICAL** | Deterministic caller-observation report spine |
| P2-R3 | **CLOSED_CANONICAL** | Explicit reducers/missingness + task-family summaries |
| P2-R4 | **CLOSED_CANONICAL** | Controlled pairwise raw-delta comparison only |
| P2-R5 | **CLOSED_CANONICAL** | Metric-local direction-aware relation only |
| P2 bounded R1-R5 closeout | **CONDITIONAL CLOSEOUT CANDIDATE** | Closed only after exact six-path merge + post-merge proof |
| P2 overall | **OPEN** | General/public KodacBench is not closed |
| P2-R6+ | **NOT_AUTHORIZED** | Separate justified authorization required if broader semantics are later needed |
| P3 Context Engine v2 | **NOT_AUTHORIZED** | Definition/planning authorization candidate becomes next only after bounded P2 closeout |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require their ordered dependencies and separate authority |

Engineering milestone state is separate from public release status.

## P2 bounded closeout candidate

The canonical closeout authorization is PR #249 / `cb8315eb9e73f36586d37123fca5fe45c040da2b`. It authorizes exactly one documentation/evidence closeout candidate across six paths and grants no runtime implementation authority.

The candidate may establish only:

```text
P2 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
```

and only after exact-head qualification, guarded merge, and mandatory post-merge proof.

The bounded R1-R5 spine is:

```text
R1 contract + synthetic frozen fixture/manifest spine
-> R2 deterministic caller-observation report
-> R3 explicit reducer/missingness + task-family summary
-> R4 controlled per-metric raw comparison
-> R5 metric-local declared-direction relation
```

The closeout evidence preserves material fix-forward history rather than rewriting the program as clean-first-pass, including R1 strict-type/hostile-canonicalization repair, R4 authorization/key-order repairs and post-merge Linux timing retry, and the R5 WIP TypeScript failure.

## What bounded P2 closure does not mean

```text
P2 BOUNDED R1-R5 CLOSED
!= P2 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL PROVIDER / MODEL BENCHMARK EXECUTION
!= UNIVERSAL BENCHMARK CORPUS
!= GLOBAL WINNER / RANKING / SUPERIORITY
!= THRESHOLD / STATISTICAL CLAIM
!= DONOR REPLACEMENT / PROMOTION
!= PRODUCT / PACKAGE / RELEASE READY
!= P2-R6+ AUTHORITY
!= P3 IMPLEMENTATION AUTHORITY
```

The repository therefore remains fail-closed around broad comparison claims and real benchmark execution.

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine
   -> R1 [CLOSED_CANONICAL]
   -> R2 [CLOSED_CANONICAL]
   -> R3 [CLOSED_CANONICAL]
   -> R4 [CLOSED_CANONICAL]
   -> R5 [CLOSED_CANONICAL]
   -> bounded R1-R5 closeout [CURRENT CONDITIONAL CANDIDATE]
   -> R6+ [NOT_AUTHORIZED / NOT REQUIRED MERELY BY LABEL]
-> P3 Context Engine v2
   -> definition/planning/authorization candidate only after bounded P2 closeout
   -> implementation only after a separate exact canonical authorization
-> P4 Reviewer Intelligence v2
-> P5 Finding Verifier Fabric
-> P6 Security Validation
-> P7 Bounded Autofix
-> P8 Product / Distribution Hardening
```

## P3 next-stage direction — planning only

After and only after bounded P2 closeout becomes canonical, the next eligible work is P3 definition/planning and authorization-candidate preparation. The durable plan describes P3 as optimizing **minimum sufficient evidence**, not maximum context volume, using potential lexical/symbol, relation/dependency, tests, architecture/spec, and history evidence lanes with explicit budgets, reasons, dilution controls, and abstention.

That roadmap direction does not authorize P3 implementation. In particular, embeddings, providers/models, network/secret access, new dependencies, persistence, repository-local experience retrieval, cross-repository access, and product integration remain fail-closed until separately authorized.

## Preserved authority boundaries

```text
INTELLIGENCE != AUTHORITY
BENCHMARK EVIDENCE != EXECUTION AUTHORITY
TASK-FAMILY SUMMARY != GLOBAL SCORE
RAW DELTA != GLOBAL WINNER
PER-METRIC DIRECTIONAL RELATION != PRODUCT SUPERIORITY
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
P2-R6+ IMPLEMENTATION = NOT AUTHORIZED
P3-P8 IMPLEMENTATION = NOT AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT AUTHORIZED
PUBLIC RELEASE / SUPERIORITY CLAIM = NOT AUTHORIZED
RULESET CHANGE / BYPASS = NOT AUTHORIZED
```

Every later unit remains fail-closed until its own exact authorization, qualification, guarded merge, and required post-merge proof succeed.
