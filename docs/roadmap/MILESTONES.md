# Kodac Engineering Milestones

## Authority

This file is a current milestone ledger. It does not authorize implementation, execution, release, provider/model access, persistence, learning, dependencies, benchmark execution, public claims, or side effects. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records remain authoritative.

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
| P3-R1 through P3-R5 | **CLOSED_CANONICAL** | Deterministic context/evidence mechanisms |
| P3 bounded R1-R5 engineering closeout | **CLOSED_CANONICAL** | PR #270 / `9d75115f66f34ef8ee1e1a093705a5cba21f8f49` |
| P3-R6 | **CLOSED_CANONICAL** | Pure deterministic seven-dimension measurement/observation materialization |
| P3-R6 current-view reconciliation | **CLOSED_CANONICAL** | PR #273 / `ac002f5ef6bf9f338e1106b7b200dd5eb062e776` |
| P3-R7 | **CLOSED_CANONICAL** | Pure deterministic single-case R6-to-P2-R2 report binding |
| P3-R7 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / NOT YET CLOSED_CANONICAL** | Five current roadmap/status/version views only |
| P3 overall | **OPEN** | No repository policy/default/promotion, real benchmark execution, or public quality claim established |
| P3-R8+ | **NOT_AUTHORIZED** | No later implementation authority is inferred from R7 closure |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

Engineering milestone state is separate from public release status.

## Canonical P3-R7 proof

```text
P3_R6_RECONCILIATION_PR = #273
P3_R6_RECONCILIATION_MERGE = ac002f5ef6bf9f338e1106b7b200dd5eb062e776

P3_R7_AUTHORIZATION_PR = #274
P3_R7_AUTHORIZATION_QUALIFIED_HEAD = ac8c6e7d76299faf04467b708dd9d4660723b194
P3_R7_AUTHORIZATION_QUALIFIED_TREE = 88f196c3721df32f184639adf785d82809c220c0
P3_R7_AUTHORIZATION_BLOB = d9ee5d793cca3465b03f909133eeebaf0b0fe197
P3_R7_AUTHORIZATION_MERGE = bbe7825579e388a3a9be7dd64b56f2406425d930
P3_R7_AUTHORIZATION_POST_MERGE_GOVERNANCE = 33427579642 / SUCCESS

P3_R7_IMPLEMENTATION_PR = #275
P3_R7_QUALIFIED_HEAD = 6d5ddae20f71767523c52378c468757749aa1520
P3_R7_QUALIFIED_TREE = 9481bab0ece031fa8fe7f77a2395247a10e5a463
P3_R7_IMPLEMENTATION_MERGE = e3933fdc9932b43b4864a0d608845acbc4ad7f08
MERGE_PARENT_1 = bbe7825579e388a3a9be7dd64b56f2406425d930
MERGE_PARENT_2 = 6d5ddae20f71767523c52378c468757749aa1520
MERGE_TREE = 9481bab0ece031fa8fe7f77a2395247a10e5a463
MERGE_VERIFICATION = verified / valid
PRE_MERGE_GOVERNANCE = 33428839717 / SUCCESS
PRE_MERGE_K2 = 33428839711 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
POST_MERGE_GOVERNANCE = 33430224046 / SUCCESS
POST_MERGE_K2 = 33430224234 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
SEMANTIC_REVIEW_QUORUM = CodeRabbit + Cubic / exact-head and current-metadata terminal clean
UNRESOLVED_ACTIONABLE_THREADS = 0
POST_MERGE_PROOF_COMMENT = #275 / 5483365785
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R7 implementation blobs:

```text
packages/kodac-runtime/bench/p3-r7/contracts.ts
  18357e81a3e135b7f407dd0dcc06646c4d079b19
packages/kodac-runtime/bench/p3-r7/context-measurement-report-binding.ts
  d4cc9ed3998a08315ed7adaa93f318a77d9076ec
packages/kodac-runtime/test/p3-r7-context-measurement-report-binding.test.ts
  3d156331133ba4bb67fd55b2ce28481b0cdff792
docs/planning/KODAC_P3_R7_CONTEXT_MEASUREMENT_REPORT_BINDING_EVIDENCE_2026-08-31.md
  ee6ce38b82a517de4b5d0c71ea46eeb8507736ea
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
R7: #274 authorization -> #275 implementation -> current-view reconciliation pending
```

## Bounded P3 R1-R7 meaning

```text
R1 = deterministic context-selection-plan foundation
R2 = deterministic caller-declared policy application
R3 = pairwise seven-metric evidence binding / comparability-only state
R4 = literal benchmark-provenance evidence binding
R5 = caller-declared criterion-match evidence
R6 = deterministic seven-dimension measurement materialization from one reconstructed policy application plus explicit caller evaluation facts
R7 = deterministic single-case binding of reconstructed R6 measurement evidence to one generated P2-R2 report
```

These remain evidence-only boundaries:

```text
P3 R1-R7 CLOSED != P3 OVERALL CLOSED
P3 R1-R7 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P3 R1-R7 CLOSED != REAL BENCHMARK TASK / PARTICIPANT EXECUTION
P3 R1-R7 CLOSED != MULTI-CASE / CASE-INVARIANT STRATEGY COMPOSITION
P3 R1-R7 CLOSED != REPOSITORY DEFAULT / WINNER / PROMOTION
P3 R1-R7 CLOSED != HOLDOUT SUFFICIENCY / CONTAMINATION FREEDOM
P3 R1-R7 CLOSED != STATISTICAL SIGNIFICANCE / ACCEPTANCE
P3 R1-R7 CLOSED != PROVIDER / MODEL EXECUTION
P3 R1-R7 CLOSED != PRODUCT / RELEASE / PACKAGE READY
P3 R1-R7 CLOSED != P3-R8+ AUTHORITY
P3 R1-R7 CLOSED != P4 AUTHORITY
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

Only after the R7 current-view reconciliation itself becomes canonical and post-merge proven may later P3 definition/planning/authorization-candidate work be considered, if justified by a concrete canonical gap. No `P3-R8` requirement is inferred by sequence alone.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

## Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
MULTI-CASE / CASE-INVARIANT STRATEGY IDENTITY = NOT_AUTHORIZED
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / STRATEGY PROMOTION = NOT_AUTHORIZED
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
P3-R8+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```
