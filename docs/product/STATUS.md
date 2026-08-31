# Product Document Authority Status

The pre-existing files in `docs/product/` remain preserved historical planning inputs. They do not override accepted Kodac ADRs, live GitHub truth, current roadmap views, or exact canonical authorization/evidence records.

## Canonical engineering state

```text
K3 = CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
K4 = CLOSED FOR THE CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K5 = CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE

P2-R1 THROUGH P2-R5 = CLOSED_CANONICAL
P2 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ = NOT_AUTHORIZED

P3-R1 DETERMINISTIC CONTEXT SELECTION PLAN FOUNDATION = CLOSED_CANONICAL
P3-R2 DECLARED CONTEXT SELECTION POLICY APPLICATION = CLOSED_CANONICAL
P3-R3 CONTEXT POLICY PAIRWISE METRIC EVIDENCE = CLOSED_CANONICAL
P3-R4 CONTEXT POLICY BENCHMARK PROVENANCE EVIDENCE BINDING = CLOSED_CANONICAL
P3-R5 DECLARED CONTEXT POLICY QUALIFICATION EVIDENCE = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 = NOT_AUTHORIZED
WAIVER = NO
```

## Canonical P3-R5 anchors

```text
AUTHORIZATION_PR = #266
AUTHORIZATION_QUALIFIED_HEAD = 4826c57b909eeb3357eec59a6aa9641cbffb190f
AUTHORIZATION_QUALIFIED_TREE = 08f843206e981f338c278f08d9492a5d90f9d2c0
AUTHORIZATION_BLOB = 8e8fc94b2f260d055f413e2e595a5eea894877b6
AUTHORIZATION_MERGE = 41599d88d2b18f2714848452d20fc8ff00232f31
IMPLEMENTATION_PR = #267
QUALIFIED_HEAD = 33847308b30327a5a290eee7f4c0382b3205a576
QUALIFIED_TREE = 37482be701004cc1e258a475c9c0c9f441657c78
IMPLEMENTATION_MERGE = ae8a8d46f529a6782e39e3ae1787220cef603b8f
POST_MERGE_GOVERNANCE = 33359263671 / SUCCESS
POST_MERGE_K2_RUNTIME = 33359263703 / SUCCESS AFTER IDENTICAL-MERGE-SHA RETRY
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The merge is signed and valid, its ordered parents are the canonical P3-R5 authorization merge followed by the exact qualified implementation head, its merge tree equals the qualified tree, and all four P3-R5 path blobs match the qualified candidate.

Canonical P3-R5 blobs:

```text
contracts.ts = 5f9f33bf6a3a7e4378e443621b913e76b9ab0ad7
context-policy-qualification.ts = 358e0c4713644e0275010d20961d6409040411ca
p3-r5-context-policy-qualification.test.ts = a331cf19adf7c89044f23ad3d423ffd07688ba92
P3-R5 evidence = 4ff828e8ceec4c5e2b115568e256ef85bae3e208
```

Post-merge Governance passed. The first Ubuntu K2 attempt encountered one unchanged pre-existing H4-R3G-B timing assertion; that H4 test path was byte-identical across the P3-R5 base and merge. An identical-merge-SHA retry completed Ubuntu/macOS/Windows Typecheck + Test + Patch benchmark hook and stable `k2-runtime-gate` successfully without any repository mutation.

## Bounded P3-R5 meaning

P3-R5 reconstructs trusted P2-R4, P3-R3, and P3-R4 evidence and applies only exact caller-declared criteria to canonical metric relations and literal provenance facts.

It preserves insufficient evidence fail-closed, applies the fixed aggregate precedence, and returns deterministic detached deeply frozen criterion-match evidence.

It does **not** establish:

```text
A BETTER CONTEXT STRATEGY
A REPOSITORY-OWNED DEFAULT / WINNING POLICY
BENCHMARK-BACKED QUALITY IMPROVEMENT
HOLDOUT SUFFICIENCY
PROVEN CONTAMINATION FREEDOM
STATISTICAL SIGNIFICANCE / ACCEPTANCE
REAL BENCHMARK TASK EXECUTION
GENERAL / PUBLIC KODACBENCH COMPLETION
EMBEDDING / VECTOR / LEARNED RETRIEVAL
PROVIDER / MODEL EXECUTION
REPOSITORY ACQUISITION OR NEW INDEXING
PERSISTENCE / TELEMETRY / LEARNING
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION
P3-R6+ AUTHORITY
```

Criterion matching remains non-decisional:

```text
caller-declared match != repository winner/default/promotion
later-in-time != sufficient holdout
none-known != proven uncontaminated
holdout != unbiased
comparable != statistically significant
favored relation != global superiority
```

## Current docs-only reconciliation

The current candidate updates current roadmap/status/version views to reflect already-proven P3-R5 closure. It is documentation only and creates no runtime or later-stage implementation authority.

These reconciled bytes become canonical only if this exact candidate qualifies, merges normally into protected `main`, and completes required post-merge proof.

Exact current-view path set:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

## Next engineering boundary after reconciliation

After and only after this reconciliation becomes canonical and post-merge proven, later P3 work is limited to definition/planning and authorization-candidate preparation until a separate exact canonical authorization becomes effective.

This reconciliation does not execute a benchmark, choose a winner/default, establish holdout sufficiency, infer contamination freedom/significance, or claim quality improvement.

```text
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
```

## Repository visibility and product authority

The GitHub repository is currently public. This visibility fact does not by itself authorize a product release or any public quality claim.

```text
PUBLIC GITHUB REPOSITORY = YES
PUBLIC RELEASE VERSION = NOT_AUTHORIZED
PACKAGE PUBLICATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
PRODUCTION READINESS CLAIM = NOT_AUTHORIZED
PUBLIC BENCHMARK / SUPERIORITY CLAIM = NOT_AUTHORIZED
BRAND LAUNCH = NOT_AUTHORIZED
```

## Preserved non-grants

```text
KRI-R5+ IMPLEMENTATION = NOT_AUTHORIZED
K3-R7+ = NOT_AUTHORIZED
K4-R6+ = NOT_AUTHORIZED
K5-R6+ = NOT_AUTHORIZED
K6-R6+ = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / STRATEGY PROMOTION = NOT_AUTHORIZED
THRESHOLD / TOLERANCE / STATISTICS / SIGNIFICANCE = NOT_AUTHORIZED
HOLDOUT SUFFICIENCY / CONTAMINATION-FREE CLAIM = NOT_AUTHORIZED BY P3-R5
DONOR REPLACEMENT / PROMOTION = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
PERSISTENCE / DATABASE / BENCHMARK FILE OUTPUT = NOT_AUTHORIZED
TELEMETRY / UPLOAD / ANALYTICS EGRESS = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
CROSS-REPOSITORY AGGREGATION / LEARNING = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Engineering milestone status is separate from public release, package publication, production readiness, support, compatibility, security claims, benchmark claims, quality claims, and brand launch.
