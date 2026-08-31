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

P3-R1 = CLOSED_CANONICAL
P3-R2 = CLOSED_CANONICAL
P3-R3 = CLOSED_CANONICAL
P3-R4 = CLOSED_CANONICAL
P3-R5 = CLOSED_CANONICAL
P3 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
P3-R6 CONTEXT MEASUREMENT OBSERVATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R7+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

P3-R6 is one pure deterministic local measurement-materialization boundary. It reconstructs one canonical P3-R2 policy application, validates one supplied P2-R1 manifest/corpus binding and one closed caller measurement declaration, derives the seven canonical P3 context measurements, and emits exactly seven P2-R2-compatible observations plus declaration-bound evidence identity.

It does **not** execute a benchmark participant, invoke a provider/model/evaluator, mutate a benchmark corpus or manifest, select a repository winner/default, authorize promotion, establish statistical significance, prove holdout sufficiency or contamination freedom, persist results, integrate product/runtime surfaces, publish a package/release, or close P3 overall.

---

# Canonical P3-R6 proof

```text
P3_R1_R5_CLOSEOUT_PR = #270
P3_R1_R5_CLOSEOUT_MERGE = 9d75115f66f34ef8ee1e1a093705a5cba21f8f49

P3_R6_AUTHORIZATION_PR = #271
P3_R6_AUTHORIZATION_QUALIFIED_HEAD = 5412c1c8ac2629ae6d4d0c87981b3b5ce14116e0
P3_R6_AUTHORIZATION_QUALIFIED_TREE = bfde96cf637006e142e920b1dd3a132b11adab37
P3_R6_AUTHORIZATION_BLOB = 3eaf04d6e2ed558692ee1f08f0557ac6a3c4a8b1
P3_R6_AUTHORIZATION_MERGE = 2441cf9b6006859a4bc05cfe196a033fe31b56c9
P3_R6_AUTHORIZATION_POST_MERGE_GOVERNANCE = 33416874486 / SUCCESS

P3_R6_IMPLEMENTATION_PR = #272
P3_R6_QUALIFIED_HEAD = 202cbf2b8082ddde52738e07373ba24322a5265c
P3_R6_QUALIFIED_TREE = 85d3cb932fc477525a05eed6a5ee1e4ffe43e4a1
P3_R6_IMPLEMENTATION_MERGE = c045ae50f42fcfeede37bbd3290b1d3a7cb5bb91
MERGE_PARENT_1 = 2441cf9b6006859a4bc05cfe196a033fe31b56c9
MERGE_PARENT_2 = 202cbf2b8082ddde52738e07373ba24322a5265c
MERGE_TREE = 85d3cb932fc477525a05eed6a5ee1e4ffe43e4a1
MERGE_VERIFICATION = verified / valid
PRE_MERGE_GOVERNANCE = 33418354648 / SUCCESS
PRE_MERGE_K2 = 33418354658 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
POST_MERGE_GOVERNANCE = 33419477062 / SUCCESS
POST_MERGE_K2 = 33419477059 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
SEMANTIC_REVIEW_QUORUM = Cubic + CodeRabbit / exact-head and current-metadata terminal clean
UNRESOLVED_ACTIONABLE_THREADS = 0
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R6 Git blobs at the qualified/merge tree:

```text
packages/kodac-runtime/bench/p3-r6/contracts.ts
  6b12541182cc0c28072efcb3966e570d3cdeefbe
packages/kodac-runtime/bench/p3-r6/context-measurement-observation.ts
  f31bb7f1cc89ddc6a6eacf1be546c54f135cffca
packages/kodac-runtime/test/p3-r6-context-measurement-observation.test.ts
  0ef67ed8249a03f79bac6ccf132a8dade56a79d4
docs/planning/KODAC_P3_R6_CONTEXT_MEASUREMENT_OBSERVATION_EVIDENCE_2026-08-31.md
  c8c156947f17aef62625acb5ea93c6bc9c0018a8
```

The detailed authorization and implementation evidence remain authoritative history:

- `docs/planning/KODAC_P3_R6_CONTEXT_MEASUREMENT_OBSERVATION_AUTHORIZATION_2026-08-31.md`
- `docs/planning/KODAC_P3_R6_CONTEXT_MEASUREMENT_OBSERVATION_EVIDENCE_2026-08-31.md`

---

# NOW — P3-R6 current-view reconciliation

The canonical P3-R6 authorization requires a separate roadmap/status reconciliation before any later P3 slice may be considered.

This reconciliation is documentation/navigation only and is limited to the established five current-view paths:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is part of this reconciliation. Historical authorization/evidence records, runtime source/tests, workflows, dependencies, benchmark corpora, provider/model configuration, persistence, release configuration, and rulesets remain unchanged.

The reconciliation itself is not canonical merely because its candidate text says so. It requires one frozen exact head, `behind_by=0`, exact five-path containment, applicable Governance/K2 checks, at least two distinct independent substantive terminal-clean semantic review channels, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact expected head, and mandatory post-merge main/parents/tree/five-blobs/signature/check/ruleset proof.

---

# THEN — later P3 definition / planning / authorization-candidate work only

Only after this current-view reconciliation becomes canonical and post-merge proven may another bounded P3 definition/planning/authorization candidate be considered, if a concrete remaining gap is justified by canonical sequencing.

No `P3-R7` requirement is inferred from numbering or from R6 closure.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
P3 OVERALL = OPEN
P3-R7+ IMPLEMENTATION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
```

Any future slice involving real benchmark execution/corpus mutation, holdout-sufficiency decisions, statistical acceptance/significance, repository-owned promotion, embeddings, learned reranking, provider/model execution, persistence, product integration, public claims, release/package publication, or K2/K5/Done Gate expansion requires its own explicit canonical authority and evidence boundary.

---

# Preserved non-grants

```text
NEW QUALITY / WINNER / SUPERIORITY CLAIM = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / PROMOTED CONTEXT POLICY = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED
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
P3-R7+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

---

# Navigation

- Working rules: `AGENTS.md`
- Current action: `docs/roadmap/NEXT.md`
- P3-R6 authorization: `docs/planning/KODAC_P3_R6_CONTEXT_MEASUREMENT_OBSERVATION_AUTHORIZATION_2026-08-31.md`
- P3-R6 implementation evidence: `docs/planning/KODAC_P3_R6_CONTEXT_MEASUREMENT_OBSERVATION_EVIDENCE_2026-08-31.md`
- P3 bounded R1-R5 closeout evidence: `docs/planning/KODAC_P3_BOUNDED_R1_R5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-31.md`
- Durable plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
