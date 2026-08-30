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
P3 OVERALL = OPEN
P3-R4+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 = NOT_AUTHORIZED
WAIVER = NO
```

## Canonical P3-R3 anchors

```text
AUTHORIZATION_PR = #258
AUTHORIZATION_QUALIFIED_HEAD = 9afe9a879319e22f6db53585115c6d47883ff066
AUTHORIZATION_QUALIFIED_TREE = 22c42cc939564a3569e7032a4fead57c60a7308f
AUTHORIZATION_BLOB = 34b86510c5b37998fd3bb94fdb507cf599d34288
AUTHORIZATION_MERGE = 70553fef18c992b1ec819720e051258372af75d8
IMPLEMENTATION_PR = #260
QUALIFIED_HEAD = 2071014a9e8761a84167e2fa7a44ba40b4df36da
QUALIFIED_TREE = 46c2c5ff7af396ffa1377d0c597b398547c5087c
IMPLEMENTATION_MERGE = cd7c28b4f823e9570daf73448c5f3b9b9b540d2e
POST_MERGE_GOVERNANCE = 33302704761 / SUCCESS
POST_MERGE_K2_RUNTIME = 33302704758 / SUCCESS
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The merge is signed and valid, its ordered parents are the canonical authorization merge followed by the exact qualified implementation head, its merge tree equals the qualified tree, and all four P3-R3 path blobs match the qualified candidate.

Canonical P3-R3 blobs:

```text
contracts.ts = 7383bca3962b054f8b3798f0e8c1a26ccd675c6a
context-policy-evidence.ts = 8c01bf5e4c41103ae491cea701f0b9b3fe9dffb1
p3-r3-context-policy-evidence.test.ts = 03f05fb4d0f7e6ca9c5f012a5b9874ff08b39cb9
P3-R3 evidence = accfab24f463a5559b43e0921a4ff70042e59d7d
```

Qualification history is preserved exactly: pre-public hosted-runner attempts failed before repository execution; after the repository became public, required Governance and K2 jobs executed. Two pre-merge Ubuntu K2 attempts hit the unchanged pre-existing H4-R3G-B timing assertion before an identical-head retry passed; no P3-R3 or H4 byte moved and no waiver was used. Post-merge Governance and K2 passed on the exact merge SHA.

## Bounded P3-R3 meaning

P3-R3 reconstructs two canonical P3-R2 policy applications from one complete untrusted P3-R1 request and derives one trusted P2-R5 relation set from a complete untrusted P2-R4 comparison. It then establishes exact identity/subject binding, exact seven-dimension metric closure, preservation of trusted P2 relation/raw-artifact evidence, deterministic evidence identity, hostile-input rejection, caller detachment, and deep immutability.

It reports only whether all seven required metrics are comparable or whether one or more remain insufficient.

It does **not** establish:

```text
A BETTER CONTEXT STRATEGY
A REPOSITORY-OWNED DEFAULT / WINNING POLICY
BENCHMARK-BACKED QUALITY IMPROVEMENT
CHRONOLOGY / CONTAMINATION / HOLDOUT SUFFICIENCY
STATISTICAL SIGNIFICANCE / ACCEPTANCE
GENERAL / PUBLIC KODACBENCH COMPLETION
EMBEDDING / VECTOR / LEARNED RETRIEVAL
PROVIDER / MODEL EXECUTION
REPOSITORY ACQUISITION OR NEW INDEXING
PERSISTENCE / TELEMETRY / LEARNING
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION
P3-R4+ AUTHORITY
```

## Current docs-only reconciliation

The current candidate updates current roadmap/status/version views to reflect already-proven P3-R3 closure. It is documentation only and creates no runtime or later-stage implementation authority.

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

This reconciliation does not execute a benchmark, choose a winner/default, infer chronology/contamination/significance, or claim quality improvement.

```text
P3-R4+ IMPLEMENTATION = NOT_AUTHORIZED
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
P3-R4+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / STRATEGY PROMOTION = NOT_AUTHORIZED
THRESHOLD / TOLERANCE / STATISTICS / SIGNIFICANCE = NOT_AUTHORIZED
CHRONOLOGY / CONTAMINATION / HOLDOUT CLAIM = NOT_AUTHORIZED BY R3
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
