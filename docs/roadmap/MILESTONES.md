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
| P3-R2 | **CLOSED_CANONICAL** | Deterministic caller-declared policy-application mechanism only |
| P3-R3 | **CLOSED_CANONICAL** | Pairwise seven-metric evidence binding and comparability state only |
| P3-R4 | **CLOSED_CANONICAL** | Deterministic literal benchmark-provenance evidence binding only |
| P3 overall | **OPEN** | No repository-owned default/promotion, benchmark execution, or quality-improvement claim established |
| P3-R5+ | **NOT_AUTHORIZED** | Separate exact canonical authorization required |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

## P3-R4 canonical anchors

```text
P3_R4_AUTHORIZATION_PR = #262
P3_R4_AUTHORIZATION_QUALIFIED_HEAD = d68d7b0e13c7099db4a3c9bb8c6b4283a916550a
P3_R4_AUTHORIZATION_QUALIFIED_TREE = fdfa7498641496ae82cf77d5ce3560b0327a129b
P3_R4_AUTHORIZATION_BLOB = d7827c154182b037f91f1addb8ca44f1798e02aa
P3_R4_AUTHORIZATION_MERGE = 954455a3dce6e1d0663501504265abd4194addce
P3_R4_IMPLEMENTATION_PR = #264
P3_R4_QUALIFIED_HEAD = 8faa95a3157ccfaf1cc8723e10f95b10880f35e5
P3_R4_QUALIFIED_TREE = 6bf4dc29f6061713a35a03a2b8d7b11c30fa5072
P3_R4_MERGE = ad63bab64512f8ac24c0f849b58b64ecf41a8709
P3_R4_POST_MERGE_GOVERNANCE = 33355453287 / SUCCESS
P3_R4_POST_MERGE_K2_RUNTIME = 33355453262 / SUCCESS
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R4 path blobs:

```text
contracts.ts = 90965256d7f8aeeef5f88698c6fe2d2c53433b85
context-policy-provenance.ts = 2ab4d6ac0c538da4678e1119f599b8dbfde07d8d
p3-r4-context-policy-provenance.test.ts = 52621ace5e3c880d443ec9169035f70ac29c2ba1
P3-R4 evidence = 3cea25de280aed867a65aafe7b72c6e619fba864
```

The implementation merge is signed and valid, its ordered parents are the canonical P3-R4 authorization merge followed by the exact qualified P3-R4 implementation head, its merge tree equals the qualified tree, and all four P3-R4 blobs match the qualified candidate.

Post-merge proof is complete on the exact merge SHA: Governance `provenance` + `legacy-tests` passed; K2 classifier, Ubuntu/macOS/Windows Typecheck + Test + Patch benchmark hook, and the stable `k2-runtime-gate` all passed; ruleset `20707483` remained active/no-bypass.

## P3-R4 exit meaning

P3-R4 closes only the deterministic benchmark-provenance evidence binding mechanism:

```text
TRUSTED P3-R3 EVIDENCE RECONSTRUCTION
+ TRUSTED P2-R4 COMPARISON RECONSTRUCTION
+ VALIDATED P2-R1 MANIFEST / DEVELOPMENT / HOLDOUT PROVENANCE
+ EXACT P2-R2 MANIFEST DIGEST REPRODUCTION
+ EXACT REPORT / CASE / METRIC TOPOLOGY CROSS-BINDING
-> LITERAL CHRONOLOGY / CONTAMINATION / CORPUS-ROLE EVIDENCE
-> CLOSED IMMUTABLE PROVENANCE EVIDENCE RECORD
```

It does not execute a benchmark, establish holdout sufficiency, prove contamination freedom, select or promote a repository-owned context strategy, or establish that any strategy is better.

```text
P3-R4 CLOSED != P3 OVERALL CLOSED
P3-R4 CLOSED != REPOSITORY DEFAULT / WINNER
P3-R4 CLOSED != BENCHMARK EXECUTION
P3-R4 CLOSED != HOLDOUT ACCEPTANCE / SIGNIFICANCE PROOF
P3-R4 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P3-R4 CLOSED != PROVIDER / MODEL EXECUTION
P3-R4 CLOSED != PRODUCT INTEGRATION
P3-R4 CLOSED != P3-R5+ AUTHORITY
```

## Current reconciliation milestone

The current docs-only candidate reconciles current roadmap/status/version views with the already-proven P3-R4 closure. It creates no runtime authority and must itself qualify, merge normally, and complete post-merge proof before these current-view bytes become canonical.

Exact current-view path set:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

## Next boundary after reconciliation

After and only after this reconciliation becomes canonical and post-merge proven, later P3 work is limited to definition/planning/authorization-candidate preparation until a separate exact canonical authorization becomes effective.

```text
P3-R5+ IMPLEMENTATION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
```

Any future slice that introduces holdout-sufficiency decisions, significance/acceptance semantics, promotion, embeddings, learned reranking, provider/model execution, persistence, product integration, public claims, or release/package publication requires its own exact authority boundary.

## Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / STRATEGY PROMOTION = NOT_AUTHORIZED
THRESHOLD / SIGNIFICANCE / UNIVERSAL QUALITY SCORE = NOT_AUTHORIZED
HOLDOUT SUFFICIENCY / CONTAMINATION-FREE CLAIM = NOT_AUTHORIZED BY R4 EVIDENCE
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R5+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Repository visibility is currently public, but engineering milestone closure remains separate from public versioning, package publication, production readiness, support, compatibility, benchmark claims, security claims, quality claims, and brand launch.
