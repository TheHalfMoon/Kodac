# Kodac — NEXT

> **Start here before doing repository work.**

## Authority

This file is navigation/status only. It does not create implementation, execution, release, provider/model, persistence, learning, dependency, benchmark, or merge authority.

Before any mutation:

1. re-read live GitHub `main`, open PRs, exact heads, changed files, checks, reviews, threads, mergeability, and the active ruleset;
2. read root `AGENTS.md`;
3. read the governing ADRs and exact canonical authorization for the active unit;
4. execute only that unit and its explicit allowlist.

Live GitHub and exact canonical authorization records override this page.

---

# Current canonical truth

```text
K6 BOUNDED R1-R5 = CLOSED_CANONICAL
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

P3-R1 closure is bounded. It establishes only a deterministic, pure, caller-materialized context-selection-plan foundation. It does **not** establish a better context strategy, execute a benchmark, promote a strategy, integrate with product/runtime surfaces, or authorize P3-R2+.

---

# P3-R1 canonical proof anchors

Authorization:

```text
AUTHORIZATION_PR = #251
AUTHORIZATION_CANDIDATE_HEAD = e64e6228f1c74f8b56fab63623cfa2a953700f41
AUTHORIZATION_CANDIDATE_TREE = ad4a1355c971f80f89f2476eac8e0c4170ca8659
AUTHORIZATION_BLOB = efd4ff29ae6660b4e1d9a2c9e75d45537bfd3a35
AUTHORIZATION_MERGE = 2b3ce25fe4b8e108840208cdf7a7018ba6262fd6
AUTHORIZATION_POST_MERGE_GOVERNANCE = 33235675288 / SUCCESS
```

Implementation:

```text
IMPLEMENTATION_PR = #252
QUALIFIED_HEAD = feee83d214bb2ed47e25b730e8c6840538d57882
QUALIFIED_TREE = 027f0f3258e17cef6f0f8df8164853f206d42afb
MERGE = ba3caabef0b36649a1d556ff287237ca2a455ab2
MERGE_PARENT_1 = 2b3ce25fe4b8e108840208cdf7a7018ba6262fd6
MERGE_PARENT_2 = feee83d214bb2ed47e25b730e8c6840538d57882
MERGE_TREE = 027f0f3258e17cef6f0f8df8164853f206d42afb
MERGE_VERIFICATION = verified / valid
POST_MERGE_GOVERNANCE = 33237323000 / SUCCESS
POST_MERGE_K2_RUNTIME = 33237323003 / SUCCESS
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

Canonical P3-R1 blobs:

```text
packages/kodac-runtime/src/context-selection-plan/contracts.ts
  f8d4123a14cc52a8307c3294fd4302b819a91390
packages/kodac-runtime/src/context-selection-plan/context-selection-plan.ts
  786cd93db7c511d92db66915322384d6b5956af4
packages/kodac-runtime/test/p3-r1-context-selection-plan.test.ts
  f3d6065c705ea63bc45ad969041a687f1054df5e
docs/planning/KODAC_P3_R1_DETERMINISTIC_CONTEXT_SELECTION_PLAN_EVIDENCE_2026-08-29.md
  eaf4096bebe7b92b521c8dc4892a4d1844446f89
```

The implementation was repaired forward before final qualification. Earlier exact-head evidence was not reused after head movement.

---

# NOW — P3-R1 closeout reconciliation candidate

This branch/PR updates only the current roadmap/status views to reflect already-proven P3-R1 canonical closure.

```text
RUNTIME IMPLEMENTATION AUTHORITY = NONE
P3-R2 IMPLEMENTATION AUTHORITY = NONE
P4-P8 IMPLEMENTATION AUTHORITY = NONE
```

The reconciliation itself must qualify and merge normally before these current-view bytes become canonical. It does not modify historical authorization/evidence records and does not create implementation authority.

---

# THEN — P3-R2 authorization-candidate preparation only

After and only after this reconciliation becomes canonical and post-merge proven, the next eligible repository unit is:

```text
P3-R2 DEFINITION / PLANNING / AUTHORIZATION-CANDIDATE PREPARATION ONLY
P3-R2 IMPLEMENTATION = NOT_AUTHORIZED UNTIL A SEPARATE EXACT CANONICAL AUTHORIZATION BECOMES EFFECTIVE
```

A suitable bounded R2 design should build on P3-R1 rather than replacing it or K3. The conservative direction is a pure deterministic **declared selection-policy application** boundary: validate a caller-declared policy, apply it to a validated P3-R1 plan under explicit item/byte budgets, preserve evidence/provenance/completeness, and produce deterministic selected/omitted material without claiming that the policy is better.

Any actual repository-owned strategy choice, benchmark comparison, quality claim, embeddings, learned reranking, provider/model execution, repository acquisition, persistence, telemetry, or product integration requires later separate authority and evidence.

---

# Preserved non-grants

```text
NEW QUALITY / WINNER / SUPERIORITY CLAIM = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
REAL PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
NETWORK / SECRETS / SUBPROCESS / SANDBOX = NOT_AUTHORIZED
REPOSITORY CRAWLING / NEW FILESYSTEM ACQUISITION = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
STRATEGY PROMOTION / DONOR REPLACEMENT = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
P3-R2+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

---

# Navigation

- Working rules: `AGENTS.md`
- Current action: `docs/roadmap/NEXT.md`
- P3-R1 authorization: `docs/planning/KODAC_P3_R1_DETERMINISTIC_CONTEXT_SELECTION_PLAN_AUTHORIZATION_2026-08-29.md`
- P3-R1 evidence: `docs/planning/KODAC_P3_R1_DETERMINISTIC_CONTEXT_SELECTION_PLAN_EVIDENCE_2026-08-29.md`
- Engineering roadmap: `docs/roadmap/ROADMAP.md`
- Milestone ledger: `docs/roadmap/MILESTONES.md`
- Version/release boundary: `docs/roadmap/VERSION_PLAN.md`
- Product authority status: `docs/product/STATUS.md`
- Durable plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
