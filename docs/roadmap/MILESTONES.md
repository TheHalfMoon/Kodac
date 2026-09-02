# Kodac Engineering Milestones

## Authority

This file is a current milestone ledger. It does not authorize implementation, execution, release, provider/model access, persistence, learning, dependencies, benchmark execution, donor intake, public claims, successor work, or side effects. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records remain authoritative.

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
| P3-R1 through P3-R15 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms only |
| P3-R15 | **CLOSED_CANONICAL** | Per-dimension direction-aware relation evidence over trusted R14 only |
| P3-R15 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / CANDIDATE** | Five current roadmap/status/version views only |
| P3 overall | **OPEN** | No cross-dimension aggregate, ranking/promotion/default, statistical policy, real benchmark execution, or public quality claim established |
| P3-R16+ | **NOT_AUTHORIZED** | No later implementation authority is inferred from R15 closure |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

Engineering milestone state is separate from public release status.

## Canonical P3-R15 proof

```text
P3_R14_CURRENT_VIEW_RECONCILIATION_PR = #300
P3_R14_CURRENT_VIEW_RECONCILIATION_MERGE = 1e244c64926e4035134d9b4e995acb2d6b82e722
P3_R14_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #300 / 5510196174
P3_R15_SUCCESSOR_ANALYSIS = #300 / 5510243321

P3_R15_AUTHORIZATION_PR = #301
P3_R15_AUTHORIZATION_BLOB = 6761b811959599407caa8b3e01eccaab75aa43e9
P3_R15_AUTHORIZATION_MERGE = 53c9bde577783aef672504f9a463be30bcc8c657
P3_R15_AUTHORIZATION_POST_MERGE_PROOF = #301 / 5510832144

P3_R15_IMPLEMENTATION_PR = #302
P3_R15_QUALIFIED_HEAD = 697739cd2b21e0e3fe4bf4bfbd6f5bbc792c3619
P3_R15_QUALIFIED_TREE = af28fd6dd4e67c3a37fb18b330abfe07177b9fa2
P3_R15_PRE_MERGE_PROOF = #302 / 5513878167
P3_R15_SEMANTIC_REVIEW = CodeRabbit 5513591270 + Cubic 5513811826
P3_R15_UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
P3_R15_IMPLEMENTATION_MERGE = ffc9fae7f3bbb309fa5318e8747e7969726d8a1e
P3_R15_MERGE_TREE = af28fd6dd4e67c3a37fb18b330abfe07177b9fa2
P3_R15_MERGE_VERIFICATION = verified / valid
P3_R15_POST_MERGE_GOVERNANCE = 33663201288 / SUCCESS
P3_R15_POST_MERGE_PROVENANCE = 100358488473 / SUCCESS
P3_R15_POST_MERGE_LEGACY_TESTS = 100358488206 / SUCCESS
P3_R15_POST_MERGE_K2 = 33663201228 / SUCCESS
P3_R15_POST_MERGE_CLASSIFIER = 100358488886 / SUCCESS
P3_R15_POST_MERGE_UBUNTU = 100358536296 / SUCCESS
P3_R15_POST_MERGE_WINDOWS = 100358536358 / SUCCESS
P3_R15_POST_MERGE_MACOS = 100358536432 / SUCCESS
P3_R15_POST_MERGE_K2_GATE = 100359003357 / SUCCESS
P3_R15_POST_MERGE_PROOF_COMMENT = #302 / 5513965094
P3_R15_RECONCILIATION_BOUNDARY_COMMENT = #302 / 5513990441
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R15 implementation/evidence blobs:

```text
packages/kodac-runtime/bench/p3-r15/contracts.ts
  5e0c2496108f0d877efaae1924418afddfc72260
packages/kodac-runtime/bench/p3-r15/strategy-reduction-directional-relation.ts
  e5da22fbc7c7f4aacee80bdf3fd319fcabe81072
packages/kodac-runtime/test/p3-r15-strategy-reduction-directional-relation.test.ts
  2eab58d51bd4081932f2be88cf7eb87afb9336d2
docs/planning/KODAC_P3_R15_DIRECTIONAL_PAIRWISE_RELATION_EVIDENCE_2026-09-02.md
  124f9adaadc677b155797e5ffdaf2a63bfcbc195
```

Historical failures remain part of the historical record and are not relabeled by later recovery or closure.

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
R12: #291 authorization -> #293 implementation -> #294 reconciliation
R13: #295 authorization -> #296 implementation -> #297 reconciliation
R14: #298 authorization -> #299 implementation -> #300 reconciliation
R15: #301 authorization -> #302 implementation -> current-view reconciliation candidate
```

## Bounded P3 R1-R15 meaning

```text
R1  = deterministic context-selection-plan foundation
R2  = deterministic caller-declared policy application
R3  = pairwise seven-metric evidence binding and comparability-only state
R4  = literal benchmark-provenance evidence binding
R5  = caller-declared criterion-match evidence
R6  = deterministic seven-dimension measurement materialization from one reconstructed policy application plus explicit caller evaluation facts
R7  = deterministic single-case binding of reconstructed R6 measurement evidence to one generated P2-R2 report
R8  = deterministic case-invariant strategy-subject identity plus exact single-case binding to canonical P3-R1/P3-R2 identities
R9  = deterministic ordered composition of exactly two independently reconstructed R7 reports under one exact R8 strategy subject
R10 = deterministic seven-dimension metric/unit alignment evidence for the two R9 members without reduction
R11 = deterministic binding of exactly seven explicit P2-R3-compatible reduction policies to the aligned pair, with no reducer execution
R12 = deterministic application of the exact bound policies to the exact two trusted observations, emitting per-dimension REDUCED or INSUFFICIENT_EVIDENCE reduction evidence
R13 = deterministic binding of exactly seven explicit HIGHER_IS_BETTER | LOWER_IS_BETTER directions while preserving complete trusted R12 evidence
R14 = deterministic controlled per-dimension comparison of exactly two distinct trusted reconstructed R13 records under matching corresponding controls, emitting COMPARABLE | INSUFFICIENT_EVIDENCE and raw finite left-minus-right deltas when comparable
R15 = deterministic per-dimension directional relation over the complete trusted R14 result, preserving every R14 comparison field and appending exactly one closed-vocabulary directional relation
```

These compose only as evidence mechanisms:

```text
PER-DIMENSION LEFT/RIGHT_FAVORED_BY_DIRECTION != GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR
EQUAL_RAW_VALUE != STATISTICAL TIE / EQUIVALENCE
PER-DIMENSION RELATION EVIDENCE != CROSS-DIMENSION AGGREGATE SCORE
EXACTLY-TWO-STRATEGY RELATION EVIDENCE != MULTI-STRATEGY RANKING
RELATION EVIDENCE != PROMOTION / DEFAULT / WINNER
RELATION EVIDENCE != REAL BENCHMARK EXECUTION
P3 R1-R15 CLOSED != P3 OVERALL CLOSED
P3 R1-R15 CLOSED != P3-R16+ AUTHORITY
P3 R1-R15 CLOSED != P4 AUTHORITY
```

## Current reconciliation qualification

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. Canonical P3-R15 post-merge proof `#302 / 5513965094`, the established canonical reconciliation procedure proven by PR #300, and continuation boundary `#302 / 5513990441` identify this docs-only current-view reconciliation as exactly:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path belongs to this unit. It becomes canonical only after one frozen exact head proves exact five-path containment, `behind_by=0`, applicable Governance/K2 checks, two distinct substantive external terminal-clean semantic review channels, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact expected head, and mandatory post-merge main/parents/tree/five-blobs/signature/check/ruleset proof.

## Next boundary after reconciliation

Only after the R15 current-view reconciliation becomes canonical and post-merge proven may later P3 definition/planning/authorization-candidate work be considered, if justified by a concrete canonical gap.

No `P3-R16`, aggregate score, ranking, promotion, winner/default, statistical policy, benchmark execution, P4-P8, or project-completion requirement is inferred by sequence alone.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

## Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT_ESTABLISHED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED
GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR VERDICT = NOT_AUTHORIZED
CROSS-DIMENSION AGGREGATE SCORE / MAJORITY / PARETO POLICY = NOT_AUTHORIZED
MULTI-STRATEGY RANKING / LEADERBOARD / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R16+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
