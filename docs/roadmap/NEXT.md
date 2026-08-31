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

P3-R1 THROUGH P3-R5 = CLOSED_CANONICAL
P3 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
P3-R6 CONTEXT MEASUREMENT OBSERVATION = CLOSED_CANONICAL
P3-R7 SINGLE-CASE CONTEXT MEASUREMENT REPORT BINDING = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R8+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

P3-R7 is one pure deterministic local binding boundary. It reconstructs one canonical P3-R6 measurement from original preimages, requires one exact `context-selection` P2-R1 manifest record with exactly seven metrics, generates one canonical P2-R2 report from only those reconstructed observations, proves complete one-case/seven-slot coverage, and binds the exact R6 measurement and P2-R2 report identities.

It does **not** execute a benchmark participant, create a case-invariant multi-case strategy identity, invoke a provider/model/evaluator, mutate benchmark corpora/manifests/fixtures, select a repository winner/default, authorize promotion, establish statistics/holdout sufficiency/contamination freedom, persist results, integrate product surfaces, publish a package/release, or close P3 overall.

---

# Canonical P3-R7 proof

```text
P3_R6_RECONCILIATION_PR = #273
P3_R6_RECONCILIATION_MERGE = ac002f5ef6bf9f338e1106b7b200dd5eb062e776

P3_R7_AUTHORIZATION_PR = #274
P3_R7_AUTHORIZATION_QUALIFIED_HEAD = ac8c6e7d76299faf04467b708dd9d4660723b194
P3_R7_AUTHORIZATION_QUALIFIED_TREE = 88f196c3721df32f184639adf785d82809c220c0
P3_R7_AUTHORIZATION_BLOB = d9ee5d793cca3465b03f909133eeebaf0b0fe197
P3_R7_AUTHORIZATION_MERGE = bbe7825579e388a3a9be7dd64b56f2406425d930
P3_R7_AUTHORIZATION_POST_MERGE_GOVERNANCE = 33427579642 / SUCCESS

P3_R7_IMPLEMENTATION_PR = #275
P3_R7_QUALIFIED_HEAD = 6d5ddae20f71767523c52378c468757749aa1520
P3_R7_QUALIFIED_TREE = 9481bab0ece031fa8fe7f77a2395247a10e5a463
P3_R7_IMPLEMENTATION_MERGE = e3933fdc9932b43b4864a0d608845acbc4ad7f08
MERGE_PARENT_1 = bbe7825579e388a3a9be7dd64b56f2406425d930
MERGE_PARENT_2 = 6d5ddae20f71767523c52378c468757749aa1520
MERGE_TREE = 9481bab0ece031fa8fe7f77a2395247a10e5a463
MERGE_VERIFICATION = verified / valid
PRE_MERGE_GOVERNANCE = 33428839717 / SUCCESS
PRE_MERGE_K2 = 33428839711 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
POST_MERGE_GOVERNANCE = 33430224046 / SUCCESS
POST_MERGE_K2 = 33430224234 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
SEMANTIC_REVIEW_QUORUM = CodeRabbit + Cubic / exact-head and current-metadata terminal clean
UNRESOLVED_ACTIONABLE_THREADS = 0
POST_MERGE_PROOF_COMMENT = #275 / 5483365785
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R7 implementation blobs:

```text
packages/kodac-runtime/bench/p3-r7/contracts.ts
  18357e81a3e135b7f407dd0dcc06646c4d079b19
packages/kodac-runtime/bench/p3-r7/context-measurement-report-binding.ts
  d4cc9ed3998a08315ed7adaa93f318a77d9076ec
packages/kodac-runtime/test/p3-r7-context-measurement-report-binding.test.ts
  3d156331133ba4bb67fd55b2ce28481b0cdff792
docs/planning/KODAC_P3_R7_CONTEXT_MEASUREMENT_REPORT_BINDING_EVIDENCE_2026-08-31.md
  ee6ce38b82a517de4b5d0c71ea46eeb8507736ea
```

---

# NOW — P3-R7 current-view reconciliation

Root `AGENTS.md` requires `POST-MERGE PROOF -> ROADMAP RECONCILIATION -> NEXT AUTHORIZED UNIT`.

This reconciliation is documentation/navigation only and is limited to the established five current-view paths:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path belongs to this reconciliation. Historical authorization/evidence records, runtime source/tests, workflows, dependencies, benchmark corpora, provider/model configuration, persistence, release configuration, and rulesets remain unchanged.

The reconciliation itself is not canonical merely because its candidate text says so. It requires one frozen exact head, `behind_by=0`, exact five-path containment, applicable Governance/K2 checks, at least two distinct independent substantive terminal-clean semantic review channels, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact expected head, and mandatory post-merge main/parents/tree/five-blobs/signature/check/ruleset proof.

---

# THEN — later P3 definition / planning / authorization-candidate work only

Only after this R7 current-view reconciliation becomes canonical and post-merge proven may another bounded P3 definition/planning/authorization candidate be considered, if a concrete remaining gap is justified by canonical sequencing.

No `P3-R8` requirement or implementation authority is inferred from numbering or from R7 closure.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
P3 OVERALL = OPEN
P3-R8+ IMPLEMENTATION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
MULTI-CASE / CASE-INVARIANT STRATEGY COMPOSITION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

Any future slice involving real benchmark execution/corpus mutation, multi-case strategy identity, holdout-sufficiency decisions, statistical acceptance/significance, repository-owned promotion, embeddings, learned reranking, provider/model execution, persistence, product integration, public claims, release/package publication, or K2/K5/Done Gate expansion requires its own explicit canonical authority and evidence boundary.

---

# Navigation

- Working rules: `AGENTS.md`
- Current action: `docs/roadmap/NEXT.md`
- P3-R7 authorization: `docs/planning/KODAC_P3_R7_CONTEXT_MEASUREMENT_REPORT_BINDING_AUTHORIZATION_2026-08-31.md`
- P3-R7 implementation evidence: `docs/planning/KODAC_P3_R7_CONTEXT_MEASUREMENT_REPORT_BINDING_EVIDENCE_2026-08-31.md`
- P3-R6 reconciliation proof: PR #273 / comment `5482689759`
- P3-R7 closeout proof: PR #275 / comment `5483365785`
- Durable plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
