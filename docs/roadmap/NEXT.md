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
P2-R5 = NOT AUTHORIZED
P2-R6+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
WAIVER = NO
```

P2-R4 closed canonically through:

```text
P2_R4_AUTHORIZATION = PR #243 / 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26
QUALIFIED_FINAL_HEAD = c0b1098dd45ec3b6a76ec2abf094813624a9ae56
QUALIFIED_FINAL_TREE = 691279ea5f4e4bea5dcdaf189d0f378260399033
IMPLEMENTATION_MERGE = PR #244 / a97436df6008e37baf544345893b414d70b40c19
MERGE_PARENT_1 = 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26
MERGE_PARENT_2 = c0b1098dd45ec3b6a76ec2abf094813624a9ae56
MERGE_VERIFICATION = verified / valid
POST_MERGE_GOVERNANCE = 33195761378 / SUCCESS
POST_MERGE_K2_RUNTIME = 33195761314 / ATTEMPT 2 / SUCCESS
RULESET = 20707483 / active / no bypass
```

The first post-merge K2 attempt exposed one unrelated Linux timing failure in the legacy H4-R3G-B deadline test. No repository bytes changed and no waiver was used. A single-job retry on the same merge SHA passed Ubuntu and the dependent `k2-runtime-gate`, while macOS and Windows remained successful. That failed first attempt remains historical evidence and is not relabeled as success.

Canonical P2-R4 implementation blobs:

```text
packages/kodac-runtime/bench/p2-r4/comparison.ts
  = 78c1417e51f1c36989ec7ec700a3424df3b58944
packages/kodac-runtime/test/p2-r4-comparison.test.ts
  = 844eba6eb456752925f914c732ccfccf2778b050
packages/kodac-runtime/test/p2-r4-key-order.test.ts
  = c15908c3dc4221f92347b97a93b9504fce65baf0
docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_EVIDENCE_2026-08-28.md
  = 9830a418b274f5d740c12236e87dd0981303f8c7
```

R4 established only controlled, task-family-separated, per-metric raw pairwise deltas under an exact shared evaluation context and explicit metric direction. It did not create winner, threshold, ranking, statistics, promotion, execution, product, release, or public superiority authority.

---

# NOW — roadmap reconciliation candidate

This branch is documentation/navigation reconciliation only.

```text
ACTIVE_UNIT = P2-R4 CANONICAL CLOSEOUT RECONCILIATION
IMPLEMENTATION_AUTHORITY = NONE
NEXT_IMPLEMENTATION_AUTHORITY = NONE
```

This reconciliation may update only current roadmap/status views. It may not implement P2-R5.

After and only after this reconciliation itself qualifies, merges normally, and passes required post-merge proof, the next eligible repository unit is **P2-R5 authorization-candidate preparation only**.

---

# THEN — P2-R5 authorization-candidate preparation

The next proposed narrow benchmark gap is a pure relation layer over an already-materialized, revalidated P2-R4 comparison.

The authorization candidate may consider only a per-task-family/per-metric relation derived from the already-explicit R4 direction and exact raw values:

```text
LEFT_FAVORED_BY_DIRECTION
RIGHT_FAVORED_BY_DIRECTION
EQUAL_RAW_VALUE
INSUFFICIENT_EVIDENCE
```

Any future R5 authorization must explicitly prove that this relation remains local to one metric and may not silently become a global winner, blended score, ranking, threshold, tolerance band, statistical claim, promotion decision, donor-selection decision, release decision, or public superiority claim.

P2-R5 implementation remains fail-closed until a separate exact authorization record becomes canonical and post-merge proven.

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
- Product authority status: `docs/product/STATUS.md`
- P2-R4 authorization: `docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_AUTHORIZATION_2026-08-28.md`
- P2-R4 historical implementation evidence: `docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_EVIDENCE_2026-08-28.md`
- Durable plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
