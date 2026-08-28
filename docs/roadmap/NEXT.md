# Kodac — NEXT

> **Start here before doing repository work.**

## Authority

This file is navigation/status only. It does not authorize implementation.

Before any mutation:

1. re-read live GitHub `main`, open PRs, exact heads, changed files, CI, reviews, threads, mergeability, and active ruleset;
2. read root `AGENTS.md`;
3. read the governing ADRs and the exact canonical authorization record for the active unit;
4. execute only that unit and its explicit allowlist.

Live GitHub and exact canonical authorization records override this page.

---

# Current canonical truth

```text
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE
P2-R1 = CLOSED_CANONICAL
P2-R2 = CLOSED_CANONICAL
P2-R3 = CLOSED_CANONICAL
P2-R4 = CLOSED_CANONICAL
P2-R5 = CLOSED_CANONICAL
P2-R6+ = NOT AUTHORIZED
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P3-P8 = NOT AUTHORIZED
WAIVER = NO
```

P2-R5 closed canonically through:

```text
P2_R5_AUTHORIZATION = PR #246 / f1f33a01a3d5c764ac59a292464322c3c7c7b3de
P2_R5_QUALIFIED_FINAL_HEAD = 7e63cdfb689be15efea14bfe8b1862cccced73a2
P2_R5_QUALIFIED_FINAL_TREE = 4242fbad9e25d3332460324ac5e8277838ff468c
P2_R5_IMPLEMENTATION_MERGE = PR #247 / 7e92fece64807c03981091cd825f2c5e848356ce
MERGE_PARENT_1 = f1f33a01a3d5c764ac59a292464322c3c7c7b3de
MERGE_PARENT_2 = 7e63cdfb689be15efea14bfe8b1862cccced73a2
MERGE_VERIFICATION = verified / valid
POST_MERGE_GOVERNANCE = 33199492928 / SUCCESS
POST_MERGE_K2_RUNTIME = 33199492770 / SUCCESS
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

Canonical P2-R5 implementation blobs:

```text
packages/kodac-runtime/bench/p2-r5/relation.ts
  = e55e2ce138ab88132f0fddb79faa3ecac8db4e14
packages/kodac-runtime/test/p2-r5-relation.test.ts
  = ce9406bb3befca3222241e8f470bb90945d6aaf8
docs/planning/KODAC_P2_R5_DIRECTIONAL_METRIC_RELATION_EVIDENCE_2026-08-28.md
  = 8bb343916cece955bd1f78d284ccdf8e5d87ed0d
```

Historical WIP evidence remains preserved: head `9169883db3239289f76886a75cb5563a8d65c099` failed K2 run `33198255234` during Typecheck on the three runtime platforms. Tests did not run on that head. The defect was repaired forward without rebase, force-push, waiver, or history rewrite.

R5 established only a pure, task-family-separated, metric-local direction-aware relation over an independently revalidated serialized R4 comparison. It emits only:

```text
LEFT_FAVORED_BY_DIRECTION
RIGHT_FAVORED_BY_DIRECTION
EQUAL_RAW_VALUE
INSUFFICIENT_EVIDENCE
```

It did not create a global winner, ranking, threshold/tolerance, statistics, promotion, execution, persistence, product, release, or public superiority authority.

---

# NOW — P2-R5 canonical closeout reconciliation

This branch is current-state reconciliation only.

```text
ACTIVE_UNIT = P2-R5 CANONICAL CLOSEOUT RECONCILIATION
IMPLEMENTATION_AUTHORITY = NONE
P2-R6+ IMPLEMENTATION AUTHORITY = NONE
P3-P8 IMPLEMENTATION AUTHORITY = NONE
```

The reconciliation may update only current roadmap/status/version views. It may not implement another benchmark slice or close P2 overall by implication.

After and only after this exact reconciliation qualifies, merges normally into protected `main`, and passes applicable post-merge proof, the next eligible repository unit is **P2 bounded R1-R5 closeout authorization-candidate preparation only**.

---

# THEN — bounded P2 closeout authorization-candidate preparation

R1-R5 now form a coherent bounded measurement spine:

```text
R1 = contract + frozen fixture/manifest spine
R2 = deterministic caller-observation report spine
R3 = explicit reducer + task-family summaries
R4 = controlled pairwise raw comparison
R5 = metric-local direction-aware relation
```

A separate closeout candidate may prove only that exact bounded R1-R5 engineering surface and preserve its negative space. It must not claim that KodacBench has executed real provider/model benchmarks, that a universal benchmark corpus exists, that any system is globally superior, or that public benchmark/release authority exists.

No P2-R6 implementation is required or authorized merely because the label exists. If later work needs broader benchmark semantics beyond R5, the R5 authorization explicitly requires a new P2-R6+ authorization candidate.

P3 remains fail-closed until the bounded P2 closeout itself becomes canonical and a separate P3 authorization exists.

---

# Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL EXECUTION = NOT AUTHORIZED
BENCHMARK TASK EXECUTION = NOT AUTHORIZED
NETWORK / SECRETS / SUBPROCESS / SANDBOX EXECUTION = NOT AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT AUTHORIZED
THRESHOLDS / TOLERANCE BANDS / STATISTICS = NOT AUTHORIZED
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT AUTHORIZED
PROMOTION / DONOR REPLACEMENT DECISION = NOT AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE = NOT AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT AUTHORIZED
RULESET CHANGE / BYPASS = NOT AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT AUTHORIZED
P3-P8 IMPLEMENTATION = NOT AUTHORIZED
```

---

# Stop rules

Stop rather than invent authority when the next implementation lacks a canonical authorization, live state moves after qualification, required checks/reviews fail or become stale, a material finding remains unresolved, the changed-file set exceeds the active allowlist, a new dependency/provider/tool is required without admission, or work would expand execution/persistence/learning/release/completion authority by implication.

No force-push, rebase, destructive history rewriting, stale-head reuse, or silent waiver.

---

# Navigation

- How to work: `AGENTS.md`
- Current action: `docs/roadmap/NEXT.md`
- Engineering roadmap: `docs/roadmap/ROADMAP.md`
- Milestone ledger: `docs/roadmap/MILESTONES.md`
- Version/release boundary: `docs/roadmap/VERSION_PLAN.md`
- Product authority status: `docs/product/STATUS.md`
- P2-R5 authorization: `docs/planning/KODAC_P2_R5_DIRECTIONAL_METRIC_RELATION_AUTHORIZATION_2026-08-28.md`
- P2-R5 historical implementation evidence: `docs/planning/KODAC_P2_R5_DIRECTIONAL_METRIC_RELATION_EVIDENCE_2026-08-28.md`
- Durable plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
