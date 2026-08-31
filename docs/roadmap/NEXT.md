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
P3 OVERALL = OPEN
P3-R5+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 = NOT_AUTHORIZED
WAIVER = NO
```

P3-R4 closure is bounded. It establishes only a pure deterministic mechanism that reconstructs trusted P2-R4 and P3-R3 evidence, validates canonical P2-R1 manifest/development/holdout provenance, reproduces the exact P2-R2 manifest digest ordering, cross-binds exact report/case/metric topology, and emits immutable literal benchmark-provenance evidence.

It does **not** execute a benchmark, prove a policy is better, establish holdout sufficiency, infer contamination-free status, choose a default/winner, authorize promotion, invoke providers/models, integrate product/runtime surfaces, persist results, publish a package/release, or authorize P3-R5+.

---

# P3-R4 canonical proof anchors

Authorization:

```text
AUTHORIZATION_PR = #262
AUTHORIZATION_QUALIFIED_HEAD = d68d7b0e13c7099db4a3c9bb8c6b4283a916550a
AUTHORIZATION_QUALIFIED_TREE = fdfa7498641496ae82cf77d5ce3560b0327a129b
AUTHORIZATION_BLOB = d7827c154182b037f91f1addb8ca44f1798e02aa
AUTHORIZATION_MERGE = 954455a3dce6e1d0663501504265abd4194addce
```

Implementation:

```text
IMPLEMENTATION_PR = #264
QUALIFIED_HEAD = 8faa95a3157ccfaf1cc8723e10f95b10880f35e5
QUALIFIED_TREE = 6bf4dc29f6061713a35a03a2b8d7b11c30fa5072
MERGE = ad63bab64512f8ac24c0f849b58b64ecf41a8709
MERGE_PARENT_1 = 954455a3dce6e1d0663501504265abd4194addce
MERGE_PARENT_2 = 8faa95a3157ccfaf1cc8723e10f95b10880f35e5
MERGE_TREE = 6bf4dc29f6061713a35a03a2b8d7b11c30fa5072
MERGE_VERIFICATION = verified / valid
PRE_MERGE_GOVERNANCE = 33354884568 / SUCCESS
PRE_MERGE_K2_RUNTIME = 33354884553 / SUCCESS
POST_MERGE_GOVERNANCE = 33355453287 / SUCCESS
POST_MERGE_K2_RUNTIME = 33355453262 / SUCCESS
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
SEMANTIC_REVIEW_QUORUM = CodeRabbit + Codex / exact-head clean
UNRESOLVED_ACTIONABLE_THREADS = 0
WAIVER = NO
```

Canonical P3-R4 blobs:

```text
packages/kodac-runtime/bench/p3-r4/contracts.ts
  90965256d7f8aeeef5f88698c6fe2d2c53433b85
packages/kodac-runtime/bench/p3-r4/context-policy-provenance.ts
  2ab4d6ac0c538da4678e1119f599b8dbfde07d8d
packages/kodac-runtime/test/p3-r4-context-policy-provenance.test.ts
  52621ace5e3c880d443ec9169035f70ac29c2ba1
docs/planning/KODAC_P3_R4_CONTEXT_POLICY_BENCHMARK_PROVENANCE_EVIDENCE_2026-08-30.md
  3cea25de280aed867a65aafe7b72c6e619fba864
```

Post-merge Governance proved both `provenance` and `legacy-tests` success. Post-merge K2 proved the runtime-change classifier, Ubuntu/macOS/Windows Typecheck + Test + Patch benchmark hook, and stable `k2-runtime-gate` success on the exact merge SHA.

---

# NOW — P3-R4 closeout reconciliation candidate

The active repository unit is documentation-only reconciliation of current roadmap/status/version views with the already-proven P3-R4 canonical closure.

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
P3-R5+ IMPLEMENTATION AUTHORITY = NONE
P4-P8 IMPLEMENTATION AUTHORITY = NONE
REAL BENCHMARK EXECUTION AUTHORITY = NONE
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION AUTHORITY = NONE
```

This reconciliation must itself qualify and merge normally before these current-view bytes become canonical. It does not rewrite historical authorization/evidence records and does not create later-stage implementation authority.

---

# THEN — next P3 definition / planning / authorization-candidate work only

Only after this reconciliation becomes canonical and post-merge proven may the repository prepare the next bounded P3 definition/planning/authorization candidate, if justified by canonical sequencing and a separate exact authorization record.

```text
P3-R5+ IMPLEMENTATION = NOT_AUTHORIZED
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
P3-R5+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

---

# Navigation

- Working rules: `AGENTS.md`
- Current action: `docs/roadmap/NEXT.md`
- P3-R4 authorization: `docs/planning/KODAC_P3_R4_CONTEXT_POLICY_BENCHMARK_PROVENANCE_AUTHORIZATION_2026-08-30.md`
- P3-R4 evidence: `docs/planning/KODAC_P3_R4_CONTEXT_POLICY_BENCHMARK_PROVENANCE_EVIDENCE_2026-08-30.md`
- Engineering roadmap: `docs/roadmap/ROADMAP.md`
- Milestone ledger: `docs/roadmap/MILESTONES.md`
- Version/release boundary: `docs/roadmap/VERSION_PLAN.md`
- Product authority status: `docs/product/STATUS.md`
- Durable plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
