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
| P3-R1 through P3-R8 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms only |
| P3-R8 | **CLOSED_CANONICAL** | Case-invariant strategy-subject identity plus exact single-case binding |
| H4-R3G-B lifecycle harness repair | **CLOSED_CANONICAL** | Test-harness recovery only; production semantics unchanged |
| P3-R8 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / CANDIDATE** | Five current roadmap/status/version views only |
| P3 overall | **OPEN** | No repository policy/default/promotion, real benchmark execution, or public quality claim established |
| P3-R9+ | **NOT_AUTHORIZED** | No later implementation authority is inferred from R8 closure |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

Engineering milestone state is separate from public release status.

## Canonical P3-R8 and recovery proof

```text
P3_R7_RECONCILIATION_PR = #276
P3_R7_RECONCILIATION_MERGE = e1bbbf31cac4bdbb8c31dc7c3c3ff1fff3b760cb

P3_R8_AUTHORIZATION_PR = #277
P3_R8_AUTHORIZATION_MERGE = e6890265c11fa3adbd14671d09b2c04b76f78954
P3_R8_IMPLEMENTATION_PR = #278
P3_R8_QUALIFIED_HEAD = 55bee850de7e38cba2c54c13000dd6f8447f7f4c
P3_R8_IMPLEMENTATION_MERGE = 576ac5d2b317fb90d1f0c6079d78cd3d899ca62d
P3_R8_MERGE_VERIFICATION = verified / valid
P3_R8_POST_MERGE_GOVERNANCE = 33439529685 / SUCCESS
P3_R8_POST_MERGE_K2_ORIGINAL = 33439529693 / FAILURE / PERMANENTLY PRESERVED

H4_R3G_B_REPAIR_AUTHORIZATION_PR = #279
H4_R3G_B_REPAIR_AUTHORIZATION_MERGE = eabdef572a2c4823f4f7cd0fc4442d1c818fbff1
H4_R3G_B_REPAIR_PR = #280
H4_R3G_B_REPAIR_QUALIFIED_HEAD = e1c83b420700f4cbd5661886f900ad7ce16d3538
H4_R3G_B_REPAIR_QUALIFIED_TREE = 431f2dbb8d19c66bf6c0fafec6c18f31dde0e5bc
H4_R3G_B_REPAIR_MERGE = 89d294035923c3c8682e5a94360cb4e01d271a9c
H4_R3G_B_REPAIR_MERGE_VERIFICATION = verified / valid
H4_R3G_B_REPAIR_POST_MERGE_GOVERNANCE = 33484688495 / SUCCESS
H4_R3G_B_REPAIR_POST_MERGE_K2 = 33484688399 / SUCCESS
P3_R8_POST_MERGE_K2_RECOVERY_PROOF = SUCCESS_ON_CANONICAL_REPAIR_MERGE
P3_R8_UNRESOLVED_REVIEW_THREADS = 0
POST_MERGE_RECOVERY_PROOF_COMMENT = #280 / 5490844809
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R8 implementation/evidence blobs:

```text
packages/kodac-runtime/bench/p3-r8/contracts.ts
  d5f8d18b9e1b61378283c489c355fdd293880349
packages/kodac-runtime/bench/p3-r8/context-strategy-subject.ts
  f066b65fd44c7e6aac76b041a5336247c9f7dc2d
packages/kodac-runtime/test/p3-r8-context-strategy-subject.test.ts
  35fd7e59f7916fa1ba4ca6dd3077489dfa95c2e4
docs/planning/KODAC_P3_R8_CASE_INVARIANT_CONTEXT_STRATEGY_SUBJECT_EVIDENCE_2026-08-31.md
  65ea4dbeb8f976b6639e4cb61699741e226093b4
```

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
R8: #277 authorization -> #278 implementation -> #279/#280 H4 recovery -> current-view reconciliation pending
```

## Bounded P3 R1-R8 meaning

```text
R1 = deterministic context-selection-plan foundation
R2 = deterministic caller-declared policy application
R3 = pairwise seven-metric evidence binding / comparability-only state
R4 = literal benchmark-provenance evidence binding
R5 = caller-declared criterion-match evidence
R6 = deterministic seven-dimension measurement materialization from one reconstructed policy application plus explicit caller evaluation facts
R7 = deterministic single-case binding of reconstructed R6 measurement evidence to one generated P2-R2 report
R8 = deterministic case-invariant strategy-subject identity plus exact single-case binding to canonical P3-R1/P3-R2 identities
```

These remain evidence-only boundaries:

```text
P3 R1-R8 CLOSED != P3 OVERALL CLOSED
P3 R1-R8 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P3 R1-R8 CLOSED != REAL BENCHMARK TASK / PARTICIPANT EXECUTION
P3 R1-R8 CLOSED != MULTI-CASE REPORT / SCORE AGGREGATION
P3 R1-R8 CLOSED != N-WAY STRATEGY COMPARISON / RANKING / PROMOTION
P3 R1-R8 CLOSED != REPOSITORY DEFAULT / WINNER
P3 R1-R8 CLOSED != HOLDOUT SUFFICIENCY / CONTAMINATION FREEDOM
P3 R1-R8 CLOSED != STATISTICAL SIGNIFICANCE / ACCEPTANCE
P3 R1-R8 CLOSED != PROVIDER / MODEL EXECUTION
P3 R1-R8 CLOSED != PRODUCT / RELEASE / PACKAGE READY
P3 R1-R8 CLOSED != P3-R9+ AUTHORITY
P3 R1-R8 CLOSED != P4 AUTHORITY
```

## Current reconciliation qualification

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. The current-view reconciliation may change exactly:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path belongs to this unit. It becomes canonical only after one frozen exact head proves exact five-path containment, `behind_by=0`, applicable Governance/K2 checks, two distinct substantive external semantic review channels, zero actionable findings/threads, active no-bypass ruleset, guarded merge with exact expected head, and mandatory post-merge main/parents/tree/five-blobs/signature/check/ruleset proof.

## Next boundary after reconciliation

Only after the R8 current-view reconciliation itself becomes canonical and post-merge proven may later P3 definition/planning/authorization-candidate work be considered, if justified by a concrete canonical gap. No `P3-R9` requirement is inferred by sequence alone.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

## Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
MULTI-CASE REPORT / OBSERVATION / SCORE AGGREGATION = NOT_AUTHORIZED
N-WAY STRATEGY COMPARISON / RANKING / LEADERBOARD = NOT_AUTHORIZED
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
P3-R9+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```
