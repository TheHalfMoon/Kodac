# Kodac — NEXT

> **Start here before doing repository work.**

## Authority

This file is navigation/status only. It does not create implementation, execution, release, provider/model, persistence, learning, dependency, benchmark, or merge authority.

Before any mutation:

1. re-read live GitHub `main`, open PRs, exact heads, changed files, checks, reviews, threads, mergeability, and the active ruleset;
2. read root `AGENTS.md`;
3. read the governing ADRs and the exact canonical authorization/evidence record for the active unit;
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
P3-R3 CONTEXT POLICY PAIRWISE METRIC EVIDENCE = CLOSED_CANONICAL
P3-R4 CONTEXT POLICY BENCHMARK PROVENANCE EVIDENCE BINDING = CLOSED_CANONICAL
P3-R5 DECLARED CONTEXT POLICY QUALIFICATION EVIDENCE = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 = NOT_AUTHORIZED
WAIVER = NO
```

P3-R5 closes only the bounded caller-declared qualification-evidence mechanism. It determines whether exact caller-declared criteria match canonically reconstructed P3-R3 metric relations and literal P3-R4 provenance evidence.

It does **not** execute a benchmark, select a repository winner/default, authorize promotion, establish statistical significance, establish holdout sufficiency or unbiasedness, prove contamination freedom, invoke providers/models, integrate product/runtime surfaces, persist results, publish a package/release, or authorize P3-R6+.

---

# P3-R5 canonical proof anchors

Authorization:

```text
AUTHORIZATION_PR = #266
AUTHORIZATION_QUALIFIED_HEAD = 4826c57b909eeb3357eec59a6aa9641cbffb190f
AUTHORIZATION_QUALIFIED_TREE = 08f843206e981f338c278f08d9492a5d90f9d2c0
AUTHORIZATION_BLOB = 8e8fc94b2f260d055f413e2e595a5eea894877b6
AUTHORIZATION_MERGE = 41599d88d2b18f2714848452d20fc8ff00232f31
```

Implementation:

```text
IMPLEMENTATION_PR = #267
QUALIFIED_HEAD = 33847308b30327a5a290eee7f4c0382b3205a576
QUALIFIED_TREE = 37482be701004cc1e258a475c9c0c9f441657c78
MERGE = ae8a8d46f529a6782e39e3ae1787220cef603b8f
MERGE_PARENT_1 = 41599d88d2b18f2714848452d20fc8ff00232f31
MERGE_PARENT_2 = 33847308b30327a5a290eee7f4c0382b3205a576
MERGE_TREE = 37482be701004cc1e258a475c9c0c9f441657c78
MERGE_VERIFICATION = verified / valid
PRE_MERGE_GOVERNANCE = 33358638262 / SUCCESS
PRE_MERGE_K2_RUNTIME = 33358638231 / SUCCESS
POST_MERGE_GOVERNANCE = 33359263671 / SUCCESS
POST_MERGE_K2_RUNTIME = 33359263703 / SUCCESS AFTER IDENTICAL-MERGE-SHA RETRY
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
SEMANTIC_REVIEW_QUORUM = CodeRabbit + Codex / exact-head clean
UNRESOLVED_ACTIONABLE_THREADS = 0
WAIVER = NO
```

Canonical P3-R5 blobs:

```text
packages/kodac-runtime/bench/p3-r5/contracts.ts
  5f9f33bf6a3a7e4378e443621b913e76b9ab0ad7
packages/kodac-runtime/bench/p3-r5/context-policy-qualification.ts
  358e0c4713644e0275010d20961d6409040411ca
packages/kodac-runtime/test/p3-r5-context-policy-qualification.test.ts
  a331cf19adf7c89044f23ad3d423ffd07688ba92
docs/planning/KODAC_P3_R5_DECLARED_CONTEXT_POLICY_QUALIFICATION_EVIDENCE_2026-08-31.md
  4ff828e8ceec4c5e2b115568e256ef85bae3e208
```

Post-merge Governance proved `provenance` and `legacy-tests` success. The first post-merge Ubuntu K2 attempt hit one unchanged pre-existing H4-R3G-B timing assertion; the H4-R3G-B test blob remained byte-identical across the P3-R5 base and merge. An identical-merge-SHA failed-job retry then proved Ubuntu/macOS/Windows Typecheck + Test + Patch benchmark hook and the stable `k2-runtime-gate` success without repository mutation.

---

# NOW — P3-R5 closeout reconciliation candidate

The active repository unit is documentation-only reconciliation of current roadmap/status/version views with the already-proven P3-R5 canonical closure.

Exact reconciliation path set:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

```text
RUNTIME IMPLEMENTATION AUTHORITY = NONE
P3-R6+ IMPLEMENTATION AUTHORITY = NONE
P4-P8 IMPLEMENTATION AUTHORITY = NONE
REAL BENCHMARK EXECUTION AUTHORITY = NONE
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION AUTHORITY = NONE
```

This reconciliation must itself qualify and merge normally before these current-view bytes become canonical. It does not rewrite historical authorization/evidence records and does not create later-stage implementation authority.

---

# THEN — next P3 definition / planning / authorization-candidate work only

Only after this reconciliation becomes canonical and post-merge proven may the repository prepare the next bounded P3 definition/planning/authorization candidate, if justified by canonical sequencing and a separate exact authorization record.

```text
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
```

Any future slice that introduces holdout-sufficiency decisions, statistical acceptance/significance, policy promotion, embeddings, learned reranking, provider/model execution, persistence, product integration, public claims, or release/package publication requires its own explicit authority and evidence boundary.

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
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

---

# Navigation

- Working rules: `AGENTS.md`
- Current action: `docs/roadmap/NEXT.md`
- P3-R5 authorization: `docs/planning/KODAC_P3_R5_DECLARED_CONTEXT_POLICY_QUALIFICATION_AUTHORIZATION_2026-08-31.md`
- P3-R5 evidence: `docs/planning/KODAC_P3_R5_DECLARED_CONTEXT_POLICY_QUALIFICATION_EVIDENCE_2026-08-31.md`
- Engineering roadmap: `docs/roadmap/ROADMAP.md`
- Milestone ledger: `docs/roadmap/MILESTONES.md`
- Version/release boundary: `docs/roadmap/VERSION_PLAN.md`
- Product authority status: `docs/product/STATUS.md`
- Durable plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
