# Kodac — NEXT

> **Start here before doing repository work.**

## Authority

This file is navigation/status only. It does not create implementation, execution, release, provider/model, persistence, learning, or merge authority.

Before any mutation:

1. re-read live GitHub `main`, open PRs, exact heads, changed files, checks, reviews, threads, mergeability, and the active ruleset;
2. read root `AGENTS.md`;
3. read the governing ADRs and the exact canonical authorization for the active unit;
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
P2 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL IFF THIS CLOSEOUT MERGE GATE PASSES
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
WAIVER = NO
```

The conditional P2 closeout statement above is **not** canonical closure merely because it appears in this candidate. It becomes effective only if the exact six-path closeout candidate qualifies, merges normally into protected `main`, and passes mandatory post-merge proof.

---

# NOW — bounded P2 R1-R5 closeout candidate

Canonical closeout authorization:

```text
AUTHORIZATION_PR = #249
AUTHORIZATION_MERGE = cb8315eb9e73f36586d37123fca5fe45c040da2b
AUTHORIZATION_CANDIDATE_HEAD = ffb97239d09388cb292ed4855af0366bd653a080
AUTHORIZATION_CANDIDATE_TREE = d389da562f11faebef8a468e13267b712671fd56
AUTHORIZATION_BLOB = d648caed2971f30799ec67b4be6b25a0ecb0df64
AUTHORIZATION_POST_MERGE_GOVERNANCE = 33234298601 / SUCCESS
AUTHORIZATION_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

Active unit:

```text
ACTIVE_UNIT = P2 BOUNDED R1-R5 CANONICAL CLOSEOUT CANDIDATE
RUNTIME_IMPLEMENTATION_AUTHORITY = NONE
P2-R6+ IMPLEMENTATION AUTHORITY = NONE
P3-P8 IMPLEMENTATION AUTHORITY = NONE
```

Exact authorized closeout paths:

```text
docs/planning/KODAC_P2_BOUNDED_R1_R5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/ROADMAP.md
docs/roadmap/VERSION_PLAN.md
docs/roadmap/NEXT.md
```

No seventh path is authorized.

The closeout evidence binds the canonical R1-R5 authorization/implementation chain, exact qualified heads/trees/blobs/checks, material fix-forward history, no-authority-by-composition rules, and the existing no-bypass ruleset. Historical R1-R5 authorization/evidence records remain immutable inputs and are not rewritten.

---

# Bounded closeout meaning

R1-R5 form only this deterministic engineering spine:

```text
R1 = contract + repository-authored synthetic frozen fixture/manifest spine
R2 = caller-observation validation + immutable deterministic report
R3 = explicit reducer/missingness policy + task-family summaries
R4 = controlled per-metric raw pairwise comparison
R5 = metric-local declared-direction relation
```

Even after successful bounded closeout:

```text
BOUNDED R1-R5 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
BOUNDED R1-R5 CLOSED != REAL PROVIDER / MODEL BENCHMARK EXECUTION
BOUNDED R1-R5 CLOSED != UNIVERSAL BENCHMARK CORPUS
BOUNDED R1-R5 CLOSED != GLOBAL WINNER / RANKING / SUPERIORITY
BOUNDED R1-R5 CLOSED != DONOR REPLACEMENT / PROMOTION
BOUNDED R1-R5 CLOSED != PRODUCT / PACKAGE / RELEASE READY
BOUNDED R1-R5 CLOSED != P2-R6+ AUTHORITY
BOUNDED R1-R5 CLOSED != P3 IMPLEMENTATION AUTHORITY
```

---

# THEN — P3 definition/planning authorization candidate only

After and only after the bounded P2 closeout itself becomes canonical and post-merge proven, the next eligible repository work is:

```text
P3 CONTEXT ENGINE V2 DEFINITION / PLANNING / AUTHORIZATION-CANDIDATE PREPARATION ONLY
P3 IMPLEMENTATION = NOT AUTHORIZED
```

P3 planning may define a later deny-by-default gate around minimum-sufficient-evidence context selection. It may not infer provider/model execution, embeddings, network/secret access, persistence, repository-local learning, new dependencies, product integration, or cross-repository access from roadmap prose.

---

# Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT AUTHORIZED
NETWORK / SECRETS / SUBPROCESS / SANDBOX EXECUTION = NOT AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT AUTHORIZED
CROSS-REPOSITORY AGGREGATION / LEARNING = NOT AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT AUTHORIZED
THRESHOLDS / TOLERANCE BANDS / STATISTICS = NOT AUTHORIZED
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT AUTHORIZED
DONOR REPLACEMENT / STRATEGY PROMOTION = NOT AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT AUTHORIZED
AUTOFIX = NOT AUTHORIZED BY P2 CLOSEOUT
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT AUTHORIZED
RULESET CHANGE / BYPASS = NOT AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT AUTHORIZED
P3-P8 IMPLEMENTATION = NOT AUTHORIZED
```

---

# Stop rules

Stop rather than invent authority if the closeout diff exceeds the six authorized paths, canonical `main` moves after qualification, required checks/reviews become stale or fail, a material finding remains unresolved, a new dependency/tool/provider/model would be required, or any later work would expand execution/persistence/learning/release/completion authority by implication.

No force-push, rebase, destructive history rewrite, stale-head reuse, or silent waiver.

---

# Navigation

- Working rules: `AGENTS.md`
- Current action: `docs/roadmap/NEXT.md`
- P2 closeout authorization: `docs/planning/KODAC_P2_BOUNDED_R1_R5_CLOSEOUT_AUTHORIZATION_2026-08-28.md`
- P2 closeout candidate evidence: `docs/planning/KODAC_P2_BOUNDED_R1_R5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`
- Engineering roadmap: `docs/roadmap/ROADMAP.md`
- Milestone ledger: `docs/roadmap/MILESTONES.md`
- Version/release boundary: `docs/roadmap/VERSION_PLAN.md`
- Product authority status: `docs/product/STATUS.md`
- Durable plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
