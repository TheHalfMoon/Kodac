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
P3 OVERALL = OPEN
P3-R5+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 = NOT_AUTHORIZED
WAIVER = NO
```

## Canonical P3-R4 anchors

```text
AUTHORIZATION_PR = #262
AUTHORIZATION_QUALIFIED_HEAD = d68d7b0e13c7099db4a3c9bb8c6b4283a916550a
AUTHORIZATION_QUALIFIED_TREE = fdfa7498641496ae82cf77d5ce3560b0327a129b
AUTHORIZATION_BLOB = d7827c154182b037f91f1addb8ca44f1798e02aa
AUTHORIZATION_MERGE = 954455a3dce6e1d0663501504265abd4194addce
IMPLEMENTATION_PR = #264
QUALIFIED_HEAD = 8faa95a3157ccfaf1cc8723e10f95b10880f35e5
QUALIFIED_TREE = 6bf4dc29f6061713a35a03a2b8d7b11c30fa5072
IMPLEMENTATION_MERGE = ad63bab64512f8ac24c0f849b58b64ecf41a8709
POST_MERGE_GOVERNANCE = 33355453287 / SUCCESS
POST_MERGE_K2_RUNTIME = 33355453262 / SUCCESS
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The merge is signed and valid, its ordered parents are the canonical P3-R4 authorization merge followed by the exact qualified implementation head, its merge tree equals the qualified tree, and all four P3-R4 path blobs match the qualified candidate.

Canonical P3-R4 blobs:

```text
contracts.ts = 90965256d7f8aeeef5f88698c6fe2d2c53433b85
context-policy-provenance.ts = 2ab4d6ac0c538da4678e1119f599b8dbfde07d8d
p3-r4-context-policy-provenance.test.ts = 52621ace5e3c880d443ec9169035f70ac29c2ba1
P3-R4 evidence = 3cea25de280aed867a65aafe7b72c6e619fba864
```

Post-merge Governance and the complete runtime-sensitive K2 matrix/gate passed on the exact merge SHA. The active ruleset remained no-bypass.

## Bounded P3-R4 meaning

P3-R4 reconstructs trusted P2-R4 and P3-R3 evidence, validates canonical P2-R1 manifest/development/holdout provenance, reproduces the exact P2-R2 manifest digest ordering, and binds report identities, case identities, R1 result identities, manifest digest, and both report metric ID/unit topologies to the same trusted provenance substrate.

It preserves chronology, contamination, corpus role, anchors, and source provenance as literal evidence only and returns a deterministic detached deeply frozen record.

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
P3-R5+ AUTHORITY
```

Literal provenance remains non-decisional:

```text
later-in-time != sufficient holdout
none-known != proven uncontaminated
holdout != unbiased
all-required-metrics-comparable != acceptable
favored relation != winner
```

## Current docs-only reconciliation

The current candidate updates current roadmap/status/version views to reflect already-proven P3-R4 closure. It is documentation only and creates no runtime or later-stage implementation authority.

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
P3-R5+ IMPLEMENTATION = NOT_AUTHORIZED
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
P3-R5+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / STRATEGY PROMOTION = NOT_AUTHORIZED
THRESHOLD / TOLERANCE / STATISTICS / SIGNIFICANCE = NOT_AUTHORIZED
HOLDOUT SUFFICIENCY / CONTAMINATION-FREE CLAIM = NOT_AUTHORIZED BY R4
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
