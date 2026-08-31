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
| P3-R1 | **CLOSED_CANONICAL** | Deterministic context-selection-plan foundation only |
| P3-R2 | **CLOSED_CANONICAL** | Deterministic caller-declared policy application only |
| P3-R3 | **CLOSED_CANONICAL** | Pairwise seven-metric evidence / comparability only |
| P3-R4 | **CLOSED_CANONICAL** | Literal benchmark-provenance evidence binding only |
| P3-R5 | **CLOSED_CANONICAL** | Caller-declared criterion-match evidence only |
| P3 bounded R1-R5 engineering closeout | **CLOSED_CANONICAL** | PR #270 / `9d75115f66f34ef8ee1e1a093705a5cba21f8f49` |
| P3-R6 | **CLOSED_CANONICAL** | Pure deterministic seven-dimension measurement/observation materialization only |
| P3-R6 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / NOT YET CLOSED_CANONICAL** | Five current roadmap/status/version views only |
| P3 overall | **OPEN** | No repository policy/default/promotion, benchmark execution, or public quality claim established |
| P3-R7+ | **NOT_AUTHORIZED** | No later implementation authority is inferred from R6 closure |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

Engineering milestone state is separate from public release status.

## Canonical P3-R6 proof

```text
P3_R1_R5_CLOSEOUT_PR = #270
P3_R1_R5_CLOSEOUT_MERGE = 9d75115f66f34ef8ee1e1a093705a5cba21f8f49

P3_R6_AUTHORIZATION_PR = #271
P3_R6_AUTHORIZATION_QUALIFIED_HEAD = 5412c1c8ac2629ae6d4d0c87981b3b5ce14116e0
P3_R6_AUTHORIZATION_QUALIFIED_TREE = bfde96cf637006e142e920b1dd3a132b11adab37
P3_R6_AUTHORIZATION_BLOB = 3eaf04d6e2ed558692ee1f08f0557ac6a3c4a8b1
P3_R6_AUTHORIZATION_MERGE = 2441cf9b6006859a4bc05cfe196a033fe31b56c9
P3_R6_AUTHORIZATION_POST_MERGE_GOVERNANCE = 33416874486 / SUCCESS

P3_R6_IMPLEMENTATION_PR = #272
P3_R6_QUALIFIED_HEAD = 202cbf2b8082ddde52738e07373ba24322a5265c
P3_R6_QUALIFIED_TREE = 85d3cb932fc477525a05eed6a5ee1e4ffe43e4a1
P3_R6_IMPLEMENTATION_MERGE = c045ae50f42fcfeede37bbd3290b1d3a7cb5bb91
MERGE_PARENT_1 = 2441cf9b6006859a4bc05cfe196a033fe31b56c9
MERGE_PARENT_2 = 202cbf2b8082ddde52738e07373ba24322a5265c
MERGE_TREE = 85d3cb932fc477525a05eed6a5ee1e4ffe43e4a1
MERGE_VERIFICATION = verified / valid
PRE_MERGE_GOVERNANCE = 33418354648 / SUCCESS
PRE_MERGE_K2 = 33418354658 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
POST_MERGE_GOVERNANCE = 33419477062 / SUCCESS
POST_MERGE_K2 = 33419477059 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
SEMANTIC_REVIEW_QUORUM = Cubic + CodeRabbit / exact-head and current-metadata terminal clean
UNRESOLVED_ACTIONABLE_THREADS = 0
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R6 implementation blobs:

```text
packages/kodac-runtime/bench/p3-r6/contracts.ts
  6b12541182cc0c28072efcb3966e570d3cdeefbe
packages/kodac-runtime/bench/p3-r6/context-measurement-observation.ts
  f31bb7f1cc89ddc6a6eacf1be546c54f135cffca
packages/kodac-runtime/test/p3-r6-context-measurement-observation.test.ts
  0ef67ed8249a03f79bac6ccf132a8dade56a79d4
docs/planning/KODAC_P3_R6_CONTEXT_MEASUREMENT_OBSERVATION_EVIDENCE_2026-08-31.md
  c8c156947f17aef62625acb5ea93c6bc9c0018a8
```

## Canonical P3 ledger

```text
R1: #251 authorization -> #252 implementation -> #253 reconciliation
R2: #255 authorization -> #256 implementation -> #257 reconciliation
R3: #258 authorization -> #260 implementation -> #261 reconciliation
R4: #262 authorization -> #264 implementation -> #265 reconciliation
R5: #266 authorization -> #267 implementation -> #268 reconciliation
R1-R5 closeout: #269 authorization -> #270 closeout
R6: #271 authorization -> #272 implementation -> current-view reconciliation pending
```

The detailed heads, trees, blobs, check evidence, bounded meanings, forward repairs, service failures, retries, and superseded/non-authority history remain in the canonical planning/evidence records. Current-view reconciliation does not rewrite that history.

## Bounded P3 R1-R6 meaning

```text
R1 = deterministic context-selection-plan foundation
R2 = deterministic caller-declared policy application
R3 = pairwise seven-metric evidence binding / comparability-only state
R4 = literal benchmark-provenance evidence binding
R5 = caller-declared criterion-match evidence
R6 = deterministic seven-dimension measurement materialization from one canonical reconstructed R2 application plus explicit caller evaluation facts
```

These remain evidence-only boundaries:

```text
P3 R1-R6 CLOSED != P3 OVERALL CLOSED
P3 R1-R6 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P3 R1-R6 CLOSED != REAL BENCHMARK TASK EXECUTION
P3 R1-R6 CLOSED != REPOSITORY DEFAULT / WINNER / PROMOTION
P3 R1-R6 CLOSED != HOLDOUT SUFFICIENCY / CONTAMINATION FREEDOM
P3 R1-R6 CLOSED != STATISTICAL SIGNIFICANCE / ACCEPTANCE
P3 R1-R6 CLOSED != PROVIDER / MODEL EXECUTION
P3 R1-R6 CLOSED != PRODUCT / RELEASE / PACKAGE READY
P3 R1-R6 CLOSED != P3-R7+ AUTHORITY
P3 R1-R6 CLOSED != P4 AUTHORITY
```

## Current reconciliation qualification

The current-view reconciliation may change exactly:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path belongs to this unit. It becomes canonical only after one frozen exact head proves exact five-path containment, `behind_by=0`, applicable Governance/K2 checks, two distinct substantive external semantic review channels, zero actionable findings/threads, active no-bypass ruleset, guarded merge with exact expected head, and mandatory post-merge main/parents/tree/five-blobs/signature/check/ruleset proof.

## Next boundary after reconciliation

Only after the R6 current-view reconciliation itself becomes canonical and post-merge proven may later P3 definition/planning/authorization-candidate work be considered, if justified by a concrete canonical gap. No `P3-R7` requirement is inferred by sequence alone.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

## Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
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
P3-R7+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Repository visibility is currently public, but engineering milestone closure remains separate from public versioning, package publication, production readiness, support, compatibility, security claims, benchmark claims, quality claims, and brand launch.
