# Kodac — NEXT

> **Start here before doing repository work.**

## Authority

This file is navigation/status only. It does not create implementation, execution, release, provider/model, persistence, learning, dependency, benchmark, or merge authority.

Before any mutation:

1. re-read live GitHub `main`, open PRs, exact heads, changed files, checks, reviews, threads, mergeability, and the active ruleset;
2. read root `AGENTS.md`;
3. read the governing ADRs and the exact canonical authorization for the active unit;
4. execute only that unit and its explicit allowlist.

Live GitHub and exact canonical authorization/evidence records override this page.

---

# Current canonical truth

```text
K6 BOUNDED R1-R5 = CLOSED_CANONICAL
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

P3-R2 closure is bounded. It establishes only a pure deterministic mechanism for applying one explicit caller-declared policy to a canonical P3-R1 plan reconstructed from the complete P3-R1 request. It does **not** establish a repository-owned default/winning policy, execute or complete a benchmark, prove context-quality improvement, promote a strategy, integrate with product/runtime surfaces, or authorize P3-R3+.

---

# P3-R2 canonical proof anchors

Authorization:

```text
AUTHORIZATION_PR = #255
AUTHORIZATION_QUALIFIED_HEAD = 25136158d1a0fead0f086a9bb907faf75f663604
AUTHORIZATION_QUALIFIED_TREE = ed8826e2e4bfcf55d9dca1781c67b108656764bf
AUTHORIZATION_BLOB = cff65ced6162a4b871f9ee0958f74592887af99a
AUTHORIZATION_MERGE = 69f74cef1f9cc36ed8db123cc30b65e881aa147e
AUTHORIZATION_POST_MERGE_GOVERNANCE = 33247742550 / SUCCESS
AUTHORIZATION_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
```

Implementation:

```text
IMPLEMENTATION_PR = #256
QUALIFIED_HEAD = 3d43248546d34f3c46c6fb38d1a53cb4dea1006f
QUALIFIED_TREE = 51a17d41f8c53ec6dbbd363afd628a9a37a821bb
MERGE = 458f62e85f4af2e13bfd78f5a6c3582d9330c911
MERGE_PARENT_1 = 69f74cef1f9cc36ed8db123cc30b65e881aa147e
MERGE_PARENT_2 = 3d43248546d34f3c46c6fb38d1a53cb4dea1006f
MERGE_TREE = 51a17d41f8c53ec6dbbd363afd628a9a37a821bb
MERGE_VERIFICATION = verified / valid
PRE_MERGE_GOVERNANCE = 33248103047 / SUCCESS
PRE_MERGE_K2_RUNTIME = 33248103061 / SUCCESS AFTER SAME-HEAD UBUNTU RERUN
POST_MERGE_GOVERNANCE = 33249447009 / SUCCESS
POST_MERGE_K2_RUNTIME = 33249447008 / SUCCESS AFTER SAME-HEAD UBUNTU RERUN
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

Canonical P3-R2 blobs:

```text
packages/kodac-runtime/src/context-selection-policy/contracts.ts
  1b5bf19868214fd202ede209d5976dfa9d17677d
packages/kodac-runtime/src/context-selection-policy/context-selection-policy.ts
  9bb0a3ba619f10fedaedba6f9559bdc6dffbeaa7
packages/kodac-runtime/test/p3-r2-context-selection-policy.test.ts
  af6e7b91518fc841cb6c53ed7e0bc73b358d054f
docs/planning/KODAC_P3_R2_DECLARED_CONTEXT_SELECTION_POLICY_EVIDENCE_2026-08-29.md
  dd457cd0e343b0454591c992385567d2b1c726bb
```

Qualification history is preserved rather than hidden:

- PR K2 run `33248103061` initially hit an unrelated pre-existing Ubuntu H4-R3G-B lifecycle timing failure; the same exact P3-R2 head reran Ubuntu successfully and the stable K2 gate then succeeded.
- Post-merge K2 run `33249447008` initially hit two unrelated pre-existing Ubuntu H4-R3G-D watchdog timing failures; the same exact merge SHA reran Ubuntu successfully and the stable K2 gate then succeeded.
- No P3-R2 byte moved for either rerun. No unrelated H4 path was modified. No waiver was used.

---

# NOW — P3-R2 closeout reconciliation candidate

The active repository unit is documentation-only reconciliation of current roadmap/status/version views with the already-proven P3-R2 canonical closure.

```text
RUNTIME IMPLEMENTATION AUTHORITY = NONE
P3-R3 IMPLEMENTATION AUTHORITY = NONE
P4-P8 IMPLEMENTATION AUTHORITY = NONE
```

This reconciliation must itself qualify and merge normally before these current-view bytes become canonical. It does not rewrite historical authorization/evidence records and does not create P3-R3 implementation authority.

---

# THEN — P3-R3 definition / planning / authorization-candidate preparation only

After and only after this reconciliation becomes canonical and post-merge proven, the next eligible repository unit is:

```text
P3-R3 DEFINITION / PLANNING / AUTHORIZATION-CANDIDATE PREPARATION ONLY
P3-R3 IMPLEMENTATION = NOT_AUTHORIZED UNTIL A SEPARATE EXACT CANONICAL AUTHORIZATION BECOMES EFFECTIVE
```

The evidence-driven planning direction is a bounded context-policy comparison / qualification contract under ADR-0010 and the existing P2 measurement spine. The purpose is to define what reproducible evidence would be required before any repository-owned context policy, default, promotion, or quality claim could be considered.

This direction is planning only. It does not authorize benchmark execution, benchmark corpus mutation, repository-owned policy selection, a winner/default strategy, thresholds/significance rules, provider/model execution, embeddings, learned reranking, persistence, telemetry, or product integration.

---

# Preserved non-grants

```text
NEW QUALITY / WINNER / SUPERIORITY CLAIM = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / PROMOTED CONTEXT POLICY = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
NETWORK / SECRETS / SUBPROCESS / SANDBOX EXPANSION = NOT_AUTHORIZED
REPOSITORY CRAWLING / NEW FILESYSTEM ACQUISITION = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
P3-R3+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

---

# Navigation

- Working rules: `AGENTS.md`
- Current action: `docs/roadmap/NEXT.md`
- P3-R2 authorization: `docs/planning/KODAC_P3_R2_DECLARED_CONTEXT_SELECTION_POLICY_AUTHORIZATION_2026-08-29.md`
- P3-R2 evidence: `docs/planning/KODAC_P3_R2_DECLARED_CONTEXT_SELECTION_POLICY_EVIDENCE_2026-08-29.md`
- Engineering roadmap: `docs/roadmap/ROADMAP.md`
- Milestone ledger: `docs/roadmap/MILESTONES.md`
- Version/release boundary: `docs/roadmap/VERSION_PLAN.md`
- Product authority status: `docs/product/STATUS.md`
- Durable plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
