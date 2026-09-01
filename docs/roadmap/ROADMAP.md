# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records always win.

## Canonical truth anchors

```text
K6 bounded closeout       = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout       = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3 bounded R1-R5 closeout = PR #270 / 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
P3-R6 reconciliation     = PR #273 / ac002f5ef6bf9f338e1106b7b200dd5eb062e776
P3-R7 implementation     = PR #275 / e3933fdc9932b43b4864a0d608845acbc4ad7f08
P3-R7 reconciliation     = PR #276 / e1bbbf31cac4bdbb8c31dc7c3c3ff1fff3b760cb
P3-R8 authorization      = PR #277 / e6890265c11fa3adbd14671d09b2c04b76f78954
P3-R8 implementation     = PR #278 / 576ac5d2b317fb90d1f0c6079d78cd3d899ca62d
H4-R3G-B repair auth     = PR #279 / eabdef572a2c4823f4f7cd0fc4442d1c818fbff1
H4-R3G-B repair          = PR #280 / 89d294035923c3c8682e5a94360cb4e01d271a9c
Improvement master plan  = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

Canonical P3 ledger:

```text
R1: #251 authorization -> #252 implementation -> #253 reconciliation
R2: #255 authorization -> #256 implementation -> #257 reconciliation
R3: #258 authorization -> #260 implementation -> #261 reconciliation
R4: #262 authorization -> #264 implementation -> #265 reconciliation
R5: #266 authorization -> #267 implementation -> #268 reconciliation
R1-R5 bounded closeout: #269 authorization -> #270 closeout
R6: #271 authorization -> #272 implementation -> #273 reconciliation
R7: #274 authorization -> #275 implementation -> #276 reconciliation
R8: #277 authorization -> #278 implementation -> H4 repair #279/#280 -> current-view reconciliation pending
```

## P3-R8 canonical proof and recovery

```text
P3_R8_QUALIFIED_HEAD = 55bee850de7e38cba2c54c13000dd6f8447f7f4c
P3_R8_MERGE = 576ac5d2b317fb90d1f0c6079d78cd3d899ca62d
P3_R8_MERGE_VERIFICATION = verified / valid
P3_R8_POST_MERGE_GOVERNANCE = 33439529685 / SUCCESS
P3_R8_POST_MERGE_K2_ORIGINAL = 33439529693 / FAILURE / PERMANENTLY PRESERVED

H4_REPAIR_AUTHORIZATION_MERGE = eabdef572a2c4823f4f7cd0fc4442d1c818fbff1
H4_REPAIR_QUALIFIED_HEAD = e1c83b420700f4cbd5661886f900ad7ce16d3538
H4_REPAIR_QUALIFIED_TREE = 431f2dbb8d19c66bf6c0fafec6c18f31dde0e5bc
H4_REPAIR_MERGE = 89d294035923c3c8682e5a94360cb4e01d271a9c
H4_REPAIR_MERGE_VERIFICATION = verified / valid
H4_REPAIR_POST_MERGE_GOVERNANCE = 33484688495 / SUCCESS
H4_REPAIR_POST_MERGE_K2 = 33484688399 / SUCCESS
P3_R8_POST_MERGE_K2_RECOVERY_PROOF = SUCCESS_ON_CANONICAL_REPAIR_MERGE
POST_MERGE_RECOVERY_PROOF_COMMENT = #280 / 5490844809
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The original failed K2 run `33439529693` remains failed evidence. The later repair proves recovery without rewriting that history.

Canonical R8 implementation/evidence blobs at the repair merge:

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

## Current milestone state

| Milestone / gate | Current state | Authority boundary |
| --- | --- | --- |
| K0/K1 | **CLOSED** | Historical completed foundation |
| K2 | **CLOSED** | Trusted side-effect execution boundary remains unchanged |
| K3 | **CLOSED for canonical K3-R1 through K3-R6 bounded scope** | K3-R7+ not authorized |
| KRI-R1 through KRI-R4 | **CANONICAL / COMPLETE** | KRI-R5+ not authorized |
| K4 | **CLOSED for canonical K4-R1 through K4-R5 bounded data-only scope** | K4-R6+ not authorized |
| K5 | **CLOSED for canonical K5-R1 through K5-R5 bounded proof-review scope** | Done Gate unchanged |
| K6 | **CLOSED_CANONICAL for bounded R1-R5 scope** | No later authority by composition |
| P2-R1 through P2-R5 | **CLOSED_CANONICAL** | Deterministic bounded measurement/evidence spine |
| P2 overall | **OPEN** | General/public KodacBench is not closed |
| P2-R6+ | **NOT_AUTHORIZED** | Separate justified authorization required |
| P3-R1 through P3-R8 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms only |
| H4-R3G-B lifecycle test-harness repair | **CLOSED_CANONICAL** | Test-harness repair only; production semantics unchanged |
| P3-R8 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / CANDIDATE** | Exactly five current-view files |
| P3 overall | **OPEN** | No repository default/promotion, real benchmark execution, or public quality claim established |
| P3-R9+ | **NOT_AUTHORIZED** | No later slice is implied by numbering |
| P4-P8 | **NOT_AUTHORIZED** | Ordered dependencies and separate authority required |

Engineering milestone state is separate from public release status.

## Bounded P3 R1-R8 result

```text
R1 = deterministic context-selection-plan foundation
R2 = deterministic caller-declared policy application
R3 = pairwise seven-metric evidence binding / comparability-only state
R4 = literal benchmark-provenance evidence binding
R5 = caller-declared criterion-match evidence
R6 = deterministic materialization of seven P2-R2-compatible observations from one reconstructed policy application plus explicit caller evaluation facts
R7 = deterministic binding of one reconstructed R6 measurement to one fully covered single-case P2-R2 report
R8 = deterministic case-invariant strategy-subject identity plus one exact single-case binding to canonical P3-R1/P3-R2 identities
```

These remain evidence mechanisms, not repository decisions:

```text
R8 CLOSED_CANONICAL != P3 OVERALL CLOSED
R8 CLOSED_CANONICAL != GENERAL / PUBLIC KODACBENCH COMPLETE
R8 CLOSED_CANONICAL != REAL BENCHMARK PARTICIPANT EXECUTION
R8 CLOSED_CANONICAL != MULTI-CASE REPORT / SCORE AGGREGATION
R8 CLOSED_CANONICAL != N-WAY STRATEGY COMPARISON / RANKING
R8 CLOSED_CANONICAL != REPOSITORY DEFAULT / WINNER / PROMOTION
R8 CLOSED_CANONICAL != STATISTICAL / HOLDOUT / CONTAMINATION QUALIFICATION
R8 CLOSED_CANONICAL != PROVIDER / MODEL EXECUTION
R8 CLOSED_CANONICAL != PRODUCT / RELEASE / PACKAGE READY
R8 CLOSED_CANONICAL != P3-R9+ AUTHORITY
R8 CLOSED_CANONICAL != P4 AUTHORITY
```

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1-R5 mechanisms [CLOSED_CANONICAL]
   -> bounded R1-R5 closeout [CLOSED_CANONICAL]
   -> R6 measurement observation [CLOSED_CANONICAL]
   -> R6 current-view reconciliation [CLOSED_CANONICAL]
   -> R7 single-case report binding [CLOSED_CANONICAL]
   -> R7 current-view reconciliation [CLOSED_CANONICAL]
   -> R8 case-invariant strategy subject + single-case binding [CLOSED_CANONICAL]
   -> H4-R3G-B test-harness recovery [CLOSED_CANONICAL]
   -> R8 current-view roadmap/status reconciliation [CURRENT DOCS-ONLY UNIT]
   -> later bounded P3 definition / planning / authorization-candidate work [ONLY IF A CONCRETE GAP IS PROVEN]
   -> P3-R9+ implementation [NOT_AUTHORIZED]
-> P4 Reviewer Intelligence v2 [NOT_AUTHORIZED]
-> P5 Finding Verifier Fabric [NOT_AUTHORIZED]
-> P6 Security Validation [NOT_AUTHORIZED]
-> P7 Bounded Autofix [NOT_AUTHORIZED]
-> P8 Product / Distribution Hardening [NOT_AUTHORIZED]
```

## Current reconciliation scope

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path belongs to this current-view reconciliation. No runtime source/test, historical authorization/evidence, workflow, dependency, lockfile, benchmark corpus, provider/model, donor code, persistence, telemetry, package, release, or ruleset path may change.

## Next P3 planning boundary

Only after the R8 current-view reconciliation itself becomes canonical and post-merge proven may another bounded P3 definition/planning/authorization candidate be considered.

No `P3-R9` requirement is inferred from sequence alone. A later candidate requires a concrete canonical gap plus reproducible evidence compatible with existing invariants. Donor precedent is supporting evidence only and cannot create Kodac requirements or authority.

The durable P3 goal remains:

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

Explicitly postponed unless separately authorized:

- real benchmark task/participant execution or corpus/manifest mutation;
- multi-case report/observation/score aggregation;
- N-way strategy comparison, ranking, winner/default, or promotion;
- repository-owned gold truth;
- aggregate scoring, hidden weights, significance, acceptance thresholds, or effect-size policy;
- holdout-sufficiency, unbiasedness, or contamination-free conclusions;
- embeddings/vector retrieval or learned/model reranking;
- provider/model/reviewer/evaluator execution;
- repository acquisition or new indexing;
- persistence/telemetry/learning;
- product/CLI/API/agent-loop integration;
- K2/K5/Done Gate expansion;
- public release, package publication, brand launch, or superiority claims.

## Preserved authority boundaries

```text
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3 OVERALL = OPEN
P3-R9+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Repository visibility is currently public. Public repository visibility does not establish a public product release, package publication, benchmark completion, quality claim, production readiness, support commitment, compatibility promise, or brand launch.
