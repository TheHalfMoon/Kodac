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
| P3-R1 through P3-R12 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms only |
| P3-R12 | **CLOSED_CANONICAL** | Exactly-two-case per-dimension reduction evidence only |
| P3-R12 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / CANDIDATE** | Five current roadmap/status/version views only |
| P3 overall | **OPEN** | No repository policy/default/promotion, real benchmark execution, cross-dimension aggregate score, strategy comparison/ranking, or public quality claim established |
| P3-R13+ | **NOT_AUTHORIZED** | No later implementation authority is inferred from R12 closure |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

Engineering milestone state is separate from public release status.

## Canonical P3-R12 proof

```text
P3_R11_CURRENT_VIEW_RECONCILIATION_PR = #290
P3_R11_CURRENT_VIEW_RECONCILIATION_MERGE = 7ae2f05114fd06eba5ce4c70efc0c743647c680a
P3_R11_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #290 / 5495642593

P3_R12_AUTHORIZATION_PR = #291
P3_R12_AUTHORIZATION_BLOB = 8efe833ba236c90af541d21ff3e7cbef5907f2c3
P3_R12_AUTHORIZATION_MERGE = 0aad292ebf3e5f84804b5f731e888da43cb8e883
P3_R12_AUTHORIZATION_POST_MERGE_PROOF = #291 / 5495894426

P3_R12_IMPLEMENTATION_PR = #293
P3_R12_QUALIFIED_HEAD = 1e3741573b3bfd20f5746c8bda91c98c7f06206b
P3_R12_QUALIFIED_TREE = 1d6302fb267d45a01f87538f171465a4a29256b2
P3_R12_QUALIFICATION_PROOF = #293 / 5497667401
P3_R12_SEMANTIC_REVIEW = Cubic 5497345413 + CodeRabbit 5497644250
P3_R12_IMPLEMENTATION_MERGE = 7d9de3e1ea544677eac93a455b9ab06a5ef35903
P3_R12_MERGE_TREE = 1d6302fb267d45a01f87538f171465a4a29256b2
P3_R12_MERGE_VERIFICATION = verified / valid
P3_R12_POST_MERGE_GOVERNANCE = 33536789925 / SUCCESS
P3_R12_POST_MERGE_PROVENANCE = 99952949641 / SUCCESS
P3_R12_POST_MERGE_LEGACY_TESTS = 99952950405 / SUCCESS
P3_R12_POST_MERGE_K2 = 33536789922 / SUCCESS
P3_R12_POST_MERGE_CLASSIFIER = 99952950032 / SUCCESS
P3_R12_POST_MERGE_MACOS = 99952997213 / SUCCESS
P3_R12_POST_MERGE_WINDOWS = 99952997233 / SUCCESS
P3_R12_POST_MERGE_UBUNTU = 99952997357 / SUCCESS
P3_R12_POST_MERGE_K2_GATE = 99953315925 / SUCCESS
P3_R12_UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
P3_R12_POST_MERGE_PROOF_COMMENT = #293 / 5497699790
P3_R12_RECONCILIATION_BOUNDARY_COMMENT = #293 / 5497702022
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R12 implementation/evidence blobs:

```text
packages/kodac-runtime/bench/p3-r12/contracts.ts
  7b828317da56394257d5dd4c0ab1ce047005f4a1
packages/kodac-runtime/bench/p3-r12/single-strategy-two-case-reduction-evidence.ts
  da8f3c147959041326c523a3c7c7b806a6f4c47e
packages/kodac-runtime/test/p3-r12-single-strategy-two-case-reduction-evidence.test.ts
  ac6ff742431413b28bd90e7e5988cf161e562044
docs/planning/KODAC_P3_R12_TWO_CASE_REDUCTION_EVIDENCE_2026-09-01.md
  2f1202beddefab6582d40570bc7f082e2cd45397
```

Historical P3-R8 K2 run `33439529693` remains failed evidence and is not relabeled by later recovery.

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
R9: #282 authorization -> #283 implementation -> #284 reconciliation
R10: #285 authorization -> #286 implementation -> #287 reconciliation
R11: #288 authorization -> #289 implementation -> #290 reconciliation
R12: #291 authorization -> #293 implementation -> current-view reconciliation pending
```

## Bounded P3 R1-R12 meaning

```text
R1 = deterministic context-selection-plan foundation
R2 = deterministic caller-declared policy application
R3 = pairwise seven-metric evidence binding and comparability-only state
R4 = literal benchmark-provenance evidence binding
R5 = caller-declared criterion-match evidence
R6 = deterministic seven-dimension measurement materialization from one reconstructed policy application plus explicit caller evaluation facts
R7 = deterministic single-case binding of reconstructed R6 measurement evidence to one generated P2-R2 report
R8 = deterministic case-invariant strategy-subject identity plus exact single-case binding to canonical P3-R1/P3-R2 identities
R9 = deterministic ordered composition of exactly two independently reconstructed R7 reports under one exact R8 strategy subject
R10 = deterministic seven-dimension metric/unit alignment evidence for the two R9 members, preserving both observations without arithmetic or directional semantics
R11 = deterministic binding of exactly seven explicit P2-R3-compatible reduction policies to the aligned pair, validating benchmark/protocol/value-kind continuity without executing reduction
R12 = deterministic application of those exact bound policies to the exact two trusted observations, emitting only per-dimension REDUCED or INSUFFICIENT_EVIDENCE reduction evidence with no directional or strategy-comparison semantics
```

These remain evidence-only boundaries:

```text
P3 R1-R12 CLOSED != P3 OVERALL CLOSED
P3 R1-R12 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P3 R1-R12 CLOSED != REAL BENCHMARK TASK / PARTICIPANT EXECUTION
P3 R1-R12 CLOSED != THREE-OR-MORE-CASE / UNBOUNDED REDUCTION
P3 R1-R12 CLOSED != CROSS-DIMENSION AGGREGATE SCORE
P3 R1-R12 CLOSED != DIRECTION / DELTA / BETTER-WORSE SEMANTICS
P3 R1-R12 CLOSED != MULTI-STRATEGY COMPARISON / RANKING / PROMOTION
P3 R1-R12 CLOSED != REPOSITORY DEFAULT / WINNER
P3 R1-R12 CLOSED != P3-R13+ AUTHORITY
P3 R1-R12 CLOSED != P4 AUTHORITY
```

## Current reconciliation qualification

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. Canonical P3-R12 post-merge proof `#293 / 5497699790` and continuation boundary `#293 / 5497702022` permit this docs-only current-view reconciliation to change exactly:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path belongs to this unit. It becomes canonical only after one frozen exact head proves exact five-path containment, `behind_by=0`, applicable Governance/K2 checks, two distinct substantive external terminal-clean semantic review channels, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact expected head, and mandatory post-merge main/parents/tree/five-blobs/signature/check/ruleset proof.

## Next boundary after reconciliation

Only after the R12 current-view reconciliation becomes canonical and post-merge proven may later P3 definition/planning/authorization-candidate work be considered, if justified by a concrete canonical gap. No `P3-R13` requirement is inferred by sequence alone.

P3-R12 deliberately stops after deterministic per-dimension reduction evidence. A narrow future question about direction/delta/comparison evidence may be investigated against canonical P2-R4 semantics, but that hypothesis grants no implementation authority.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

## Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
THREE-OR-MORE-CASE / UNBOUNDED REDUCTION = NOT_AUTHORIZED
CROSS-DIMENSION AGGREGATE SCORE = NOT_AUTHORIZED
DIRECTION / DELTA / BETTER-WORSE = NOT_AUTHORIZED
MULTI-STRATEGY COMPARISON / RANKING / LEADERBOARD / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R13+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```
