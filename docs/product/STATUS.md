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
P3-R3+ = NOT_AUTHORIZED
P4-P8 = NOT_AUTHORIZED
WAIVER = NO
```

## Canonical P3-R2 anchors

```text
AUTHORIZATION_PR = #255
AUTHORIZATION_QUALIFIED_HEAD = 25136158d1a0fead0f086a9bb907faf75f663604
AUTHORIZATION_QUALIFIED_TREE = ed8826e2e4bfcf55d9dca1781c67b108656764bf
AUTHORIZATION_BLOB = cff65ced6162a4b871f9ee0958f74592887af99a
AUTHORIZATION_MERGE = 69f74cef1f9cc36ed8db123cc30b65e881aa147e
AUTHORIZATION_POST_MERGE_GOVERNANCE = 33247742550 / SUCCESS
IMPLEMENTATION_PR = #256
QUALIFIED_HEAD = 3d43248546d34f3c46c6fb38d1a53cb4dea1006f
QUALIFIED_TREE = 51a17d41f8c53ec6dbbd363afd628a9a37a821bb
IMPLEMENTATION_MERGE = 458f62e85f4af2e13bfd78f5a6c3582d9330c911
POST_MERGE_GOVERNANCE = 33249447009 / SUCCESS
POST_MERGE_K2_RUNTIME = 33249447008 / SUCCESS AFTER SAME-HEAD UBUNTU RERUN
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

The merge is signed and valid, its ordered parents are the pre-merge canonical main followed by the exact qualified P3-R2 head, its merge tree equals the qualified tree, and all four P3-R2 path blobs match the qualified candidate.

Canonical P3-R2 blobs:

```text
contracts.ts = 1b5bf19868214fd202ede209d5976dfa9d17677d
context-selection-policy.ts = 9bb0a3ba619f10fedaedba6f9559bdc6dffbeaa7
p3-r2-context-selection-policy.test.ts = af6e7b91518fc841cb6c53ed7e0bc73b358d054f
P3-R2 evidence = dd457cd0e343b0454591c992385567d2b1c726bb
```

Qualification history is preserved exactly: the pre-merge K2 run had one unrelated H4-R3G-B Ubuntu timing failure before a successful same-head rerun; the post-merge K2 run had two unrelated H4-R3G-D Ubuntu watchdog timing failures before a successful same-merge rerun. All P3-R2 focused tests passed in the inspected post-merge failed attempt, no P3-R2 or H4 byte moved for either rerun, and no waiver was used.

## Bounded P3-R2 meaning

P3-R2 reconstructs canonical P3-R1 plan truth from the complete untrusted P3-R1 request and then applies one exact caller-declared policy. It establishes deterministic policy binding, exact caller lane ordering, explicit bounded item/byte/group constraints, deterministic selected/omitted partitioning, preservation of source state/evidence/provenance/completeness/abstention/relation bindings, closed identities/schemas, hostile-input rejection, and deep immutability.

It does **not** establish:

```text
A BETTER CONTEXT STRATEGY
A REPOSITORY-OWNED DEFAULT / WINNING POLICY
BENCHMARK-BACKED QUALITY IMPROVEMENT
GENERAL / PUBLIC KODACBENCH COMPLETION
EMBEDDING / VECTOR / LEARNED RETRIEVAL
PROVIDER / MODEL EXECUTION
REPOSITORY ACQUISITION OR NEW INDEXING
PERSISTENCE / TELEMETRY / LEARNING
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION
P3-R3+ AUTHORITY
```

## Current docs-only reconciliation

The current candidate updates current roadmap/status/version views to reflect already-proven P3-R2 closure. It is documentation only and creates no runtime or later-stage implementation authority.

These reconciled bytes become canonical only if this exact candidate qualifies, merges normally into protected `main`, and completes required post-merge proof.

## Next engineering boundary after reconciliation

After and only after this reconciliation becomes canonical and post-merge proven, the next eligible unit is **P3-R3 definition/planning and authorization-candidate preparation only**.

The evidence-gated direction is a bounded context-policy comparison/qualification contract under ADR-0010 and the P2 measurement spine. A future authorization may define exact reproducible evidence required before any repository-owned policy choice or promotion can be considered. This reconciliation does not execute a benchmark, choose a winner/default, or claim quality improvement.

## Preserved non-grants

```text
KRI-R5+ IMPLEMENTATION = NOT_AUTHORIZED
K3-R7+ = NOT_AUTHORIZED
K4-R6+ = NOT_AUTHORIZED
K5-R6+ = NOT_AUTHORIZED
K6-R6+ = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R3+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / STRATEGY PROMOTION = NOT_AUTHORIZED
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
