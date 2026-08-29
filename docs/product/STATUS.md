# Product Document Authority Status

The pre-existing files in `docs/product/` remain preserved historical planning inputs. They do not override accepted Kodac ADRs, live GitHub truth, current roadmap views, or exact canonical authorization/evidence records.

## Canonical engineering state

```text
K3 = CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
K4 = CLOSED FOR THE CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K5 = CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE

P2-R1 = CLOSED_CANONICAL
P2-R2 = CLOSED_CANONICAL
P2-R3 = CLOSED_CANONICAL
P2-R4 = CLOSED_CANONICAL
P2-R5 = CLOSED_CANONICAL
P2 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ = NOT_AUTHORIZED

P3-R1 DETERMINISTIC CONTEXT SELECTION PLAN FOUNDATION = CLOSED_CANONICAL
P3-R2+ = NOT_AUTHORIZED
P4-P8 = NOT_AUTHORIZED
WAIVER = NO
```

## Canonical P3-R1 anchors

```text
AUTHORIZATION_PR = #251
AUTHORIZATION_MERGE = 2b3ce25fe4b8e108840208cdf7a7018ba6262fd6
AUTHORIZATION_BLOB = efd4ff29ae6660b4e1d9a2c9e75d45537bfd3a35
IMPLEMENTATION_PR = #252
QUALIFIED_HEAD = feee83d214bb2ed47e25b730e8c6840538d57882
QUALIFIED_TREE = 027f0f3258e17cef6f0f8df8164853f206d42afb
IMPLEMENTATION_MERGE = ba3caabef0b36649a1d556ff287237ca2a455ab2
POST_MERGE_GOVERNANCE = 33237323000 / SUCCESS
POST_MERGE_K2_RUNTIME = 33237323003 / SUCCESS
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

The merge is signed and valid, its ordered parents are the pre-merge canonical main followed by the exact qualified P3-R1 head, its merge tree equals the qualified tree, and all four P3-R1 path blobs match the qualified candidate.

## Bounded P3-R1 meaning

P3-R1 provides a deterministic, pure, in-memory context-selection-plan foundation over caller-materialized evidence. It establishes canonical identity binding, descriptive evidence lanes, provenance/reasons/grouping preservation, explicit budget facts, completeness/omitted-evidence semantics, abstention, validated supplied K3-R6 relation evidence, hostile-input fail-closed behavior, and deep immutability.

It does **not** establish:

```text
A BETTER CONTEXT STRATEGY
A REPOSITORY-OWNED RANKING / WEIGHTING POLICY
BENCHMARK-BACKED QUALITY IMPROVEMENT
GENERAL / PUBLIC KODACBENCH COMPLETION
EMBEDDING / VECTOR / LEARNED RETRIEVAL
PROVIDER / MODEL EXECUTION
REPOSITORY ACQUISITION OR NEW INDEXING
PERSISTENCE / TELEMETRY / LEARNING
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION
P3-R2+ AUTHORITY
```

## Current docs-only reconciliation

The current candidate updates current roadmap/status/version views to reflect already-proven P3-R1 closure. It is documentation only and creates no runtime or later-stage implementation authority.

These reconciled bytes become canonical only if this exact candidate qualifies, merges normally into protected `main`, and completes required post-merge proof.

## Next engineering boundary after reconciliation

After and only after this reconciliation becomes canonical and post-merge proven, the next eligible unit is **P3-R2 definition/planning and authorization-candidate preparation only**.

A later R2 authorization may define a pure deterministic declared selection-policy application boundary over canonical P3-R1 plans. Such a slice must remain policy-explicit and evidence-preserving; it must not silently choose or promote a winning strategy or claim quality improvement without benchmark evidence.

## Preserved non-grants

```text
KRI-R5+ IMPLEMENTATION = NOT_AUTHORIZED
K3-R7+ = NOT_AUTHORIZED
K4-R6+ = NOT_AUTHORIZED
K5-R6+ = NOT_AUTHORIZED
K6-R6+ = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R2+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT_AUTHORIZED
THRESHOLD / TOLERANCE / STATISTICS / SIGNIFICANCE = NOT_AUTHORIZED
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

Engineering milestone status is separate from public release, package publication, production readiness, support, compatibility, security claims, benchmark claims, and superiority claims.
