# Kodac Engineering Milestones

## Authority

This file is a current milestone ledger. It does not authorize implementation, execution, release, provider/model access, persistence, learning, dependencies, benchmark execution, donor intake, public claims, or side effects. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records remain authoritative.

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
| P2-R1 through P2-R5 | **CLOSED_CANONICAL** | Deterministic bounded measurement/evidence spine |
| P2 bounded R1-R5 engineering closeout | **CLOSED_CANONICAL** | PR #250 / `0e48553f00618706955b11db795643ee710fe04a` |
| P2 overall | **OPEN** | General/public KodacBench is not closed |
| P2-R6+ | **NOT_AUTHORIZED** | Separate authority required if broader semantics are justified |
| P3-R1 through P3-R9 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms only |
| P3-R9 | **CLOSED_CANONICAL** | Exactly two independent R7 reports composed under one exact R8 strategy subject; no aggregation |
| P3-R9 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / CANDIDATE** | Five current roadmap/status/version views only |
| P3 overall | **OPEN** | No repository policy/default/promotion, real benchmark execution, aggregate scoring, or public quality claim established |
| P3-R10+ | **NOT_AUTHORIZED** | No later implementation authority is inferred from R9 closure |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

Engineering milestone state is separate from public release status.

## Canonical P3-R9 proof

```text
P3_R8_CURRENT_VIEW_RECONCILIATION_PR = #281
P3_R8_CURRENT_VIEW_RECONCILIATION_MERGE = ff7a474f73b9efacab4eceafd210c67488987b64

P3_R9_AUTHORIZATION_PR = #282
P3_R9_AUTHORIZATION_QUALIFIED_HEAD = 9013fcf596453bb49afb7727af138de4fd70381d
P3_R9_AUTHORIZATION_BLOB = e3b3912b17fb9585b7fc075f11afd6055c4b7224
P3_R9_AUTHORIZATION_MERGE = ba9553de3384e683a54469ac7aa05545d20c0c1b
P3_R9_AUTHORIZATION_POST_MERGE_PROOF = #282 / 5491794590

P3_R9_IMPLEMENTATION_PR = #283
P3_R9_QUALIFIED_HEAD = 457d12f27ededa4b60cd39b2aa946e2692b3d2f7
P3_R9_IMPLEMENTATION_MERGE = 8d89875cf71715945f81b05853adeddebcb60284
P3_R9_MERGE_TREE = adb808338c6ea1e802811728fdf2c6d3c6de373a
P3_R9_MERGE_VERIFICATION = verified / valid
P3_R9_SEMANTIC_REVIEW = Cubic 5492179655 + CodeRabbit 5492246477
P3_R9_POST_MERGE_GOVERNANCE = 33495225110 / SUCCESS
P3_R9_POST_MERGE_K2 = 33495225098 / SUCCESS
P3_R9_POST_MERGE_UBUNTU = 99815772777 / SUCCESS
P3_R9_POST_MERGE_MACOS = 99815772815 / SUCCESS
P3_R9_POST_MERGE_WINDOWS = 99815772844 / SUCCESS
P3_R9_POST_MERGE_K2_GATE = 99816093316 / SUCCESS
P3_R9_UNRESOLVED_REVIEW_THREADS = 0
P3_R9_POST_MERGE_PROOF_COMMENT = #283 / 5492583969
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R9 implementation/evidence blobs:

```text
packages/kodac-runtime/bench/p3-r9/contracts.ts
  b7064806e681983b386ed59123578da1bea384e3
packages/kodac-runtime/bench/p3-r9/single-strategy-two-case-report-composition.ts
  fa4fd9af2938221ab8b463efa7de0e81cd81054a
packages/kodac-runtime/test/p3-r9-single-strategy-two-case-report-composition.test.ts
  cab8c74c82bf09b6f5c911e05c4a53756529e2bb
docs/planning/KODAC_P3_R9_SINGLE_STRATEGY_TWO_CASE_REPORT_COMPOSITION_EVIDENCE_2026-09-01.md
  08b828fa11455929596cb0e5247f32e885e73168
```

Historical P3-R8 K2 run `33439529693` remains failed evidence and is not relabeled by later H4 recovery.

## Canonical P3 ledger

```text
R1: #251 authorization -> #252 implementation -> #253 reconciliation
R2: #255 authorization -> #256 implementation -> #257 reconciliation
R3: #258 authorization -> #260 implementation -> #261 reconciliation
R4: #262 authorization -> #264 implementation -> #265 reconciliation
R5: #266 authorization -> #267 implementation -> #268 reconciliation
R1-R5 closeout: #269 authorization -> #270 closeout
R6: #271 authorization -> #272 implementation -> #273 reconciliation
R7: #274 authorization -> #275 implementation -> #276 reconciliation
R8: #277 authorization -> #278 implementation -> #279/#280 H4 recovery -> #281 reconciliation
R9: #282 authorization -> #283 implementation -> current-view reconciliation pending
```

## Bounded P3 R1-R9 meaning

```text
R1 = deterministic context-selection-plan foundation
R2 = deterministic caller-declared policy application
R3 = pairwise seven-metric evidence binding / comparability-only state
R4 = literal benchmark-provenance evidence binding
R5 = caller-declared criterion-match evidence
R6 = deterministic seven-dimension measurement materialization from one reconstructed policy application plus explicit caller evaluation facts
R7 = deterministic single-case binding of reconstructed R6 measurement evidence to one generated P2-R2 report
R8 = deterministic case-invariant strategy-subject identity plus exact single-case binding to canonical P3-R1/P3-R2 identities
R9 = deterministic ordered composition of exactly two independently reconstructed R7 reports under one exact R8 strategy subject, preserving identities without reducing observations, metrics, or scores
```

These remain evidence-only boundaries:

```text
P3 R1-R9 CLOSED != P3 OVERALL CLOSED
P3 R1-R9 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P3 R1-R9 CLOSED != REAL BENCHMARK TASK / PARTICIPANT EXECUTION
P3 R1-R9 CLOSED != THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION
P3 R1-R9 CLOSED != MULTI-CASE OBSERVATION / METRIC / SCORE AGGREGATION
P3 R1-R9 CLOSED != MULTI-STRATEGY COMPARISON / RANKING / PROMOTION
P3 R1-R9 CLOSED != REPOSITORY DEFAULT / WINNER
P3 R1-R9 CLOSED != HOLDOUT SUFFICIENCY / CONTAMINATION FREEDOM
P3 R1-R9 CLOSED != STATISTICAL SIGNIFICANCE / ACCEPTANCE
P3 R1-R9 CLOSED != PROVIDER / MODEL EXECUTION
P3 R1-R9 CLOSED != PRODUCT / RELEASE / PACKAGE READY
P3 R1-R9 CLOSED != P3-R10+ AUTHORITY
P3 R1-R9 CLOSED != P4 AUTHORITY
```

## Current reconciliation qualification

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. Canonical P3-R9 post-merge proof `#283 / 5492583969` permits this docs-only current-view reconciliation to change exactly:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path belongs to this unit. It becomes canonical only after one frozen exact head proves exact five-path containment, `behind_by=0`, applicable Governance/K2 checks, two distinct substantive external terminal-clean semantic review channels, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact expected head, and mandatory post-merge main/parents/tree/five-blobs/signature/check/ruleset proof.

## Next boundary after reconciliation

Only after the R9 current-view reconciliation itself becomes canonical and post-merge proven may later P3 definition/planning/authorization-candidate work be considered, if justified by a concrete canonical gap. No `P3-R10` requirement is inferred by sequence alone.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

## Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION = NOT_AUTHORIZED
MULTI-CASE REPORT / OBSERVATION / METRIC / SCORE AGGREGATION = NOT_AUTHORIZED
MULTI-STRATEGY COMPARISON / RANKING / LEADERBOARD / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION = NOT_AUTHORIZED
HIDDEN SCORE / WEIGHT / THRESHOLD / TOLERANCE = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
HOLDOUT SUFFICIENCY / UNBIASEDNESS / CONTAMINATION-FREE CLAIM = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R10+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```
