# Kodac — NEXT

> **Start here before doing repository work.**

## Authority

This file is a navigation/status view only. It does not authorize implementation.

Before any mutation:

1. re-read live GitHub `main`, open PRs, exact heads, changed files, CI, reviews, threads, mergeability, and active ruleset;
2. read root `AGENTS.md`;
3. read the governing ADRs and the exact canonical authorization record for the active unit;
4. execute only that unit and its explicit allowlist.

If this page conflicts with live GitHub, an ADR, or an exact authorization/evidence record, the more authoritative source wins. Candidate wording on a feature branch never creates canonical authority by itself.

---

# Current canonical truth

```text
K5 = CLOSED FOR CANONICAL R1-R5 BOUNDED PROOF-REVIEW SCOPE
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = CLOSED_CANONICAL
K6-R5 = CLOSED_CANONICAL
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE
K6 CLOSEOUT MERGE = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8

P2-R1 AUTHORIZATION MERGE = PR #237 / 1cd2fc4de1eb5849cbe2519ae1699bc2acc56397
P2-R1 IMPLEMENTATION MERGE = PR #238 / c499c8ac098cca9719eaad3cacadd2af7d1c0a1f
P2-R1 = CLOSED_CANONICAL

P2-R2 AUTHORIZATION MERGE = PR #239 / f2b8d452e93ec207ebe04c9db7d47dc032df20de
P2-R2 IMPLEMENTATION MERGE = PR #240 / 4a0b2c67dbd707c18395b0898752c111ca6b16a9
P2-R2 = CLOSED_CANONICAL

P2-R3 AUTHORIZATION MERGE = PR #241 / d398983a457060dff0b700714d3eebbc4dce8e23
P2-R3 IMPLEMENTATION MERGE = PR #242 / 20cb3d2e277513fc3cefa71fe9fda03f25fd418a
P2-R3 = CLOSED_CANONICAL

P2-R4 IMPLEMENTATION = NOT YET AUTHORIZED BY CANONICAL MAIN
P2-R5+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
WAIVER = NO
```

P2-R3 closure is bound by immutable later proof rather than rewriting its historical candidate-time evidence record:

```text
QUALIFIED_FINAL_HEAD = 6e1b6aa27591e997cbe164fd335e8bee08b11f1c
QUALIFIED_FINAL_TREE = 3d040c6ae4b56573d55eb3b8dbecad3e79bdfdc3
MERGE = PR #242 / 20cb3d2e277513fc3cefa71fe9fda03f25fd418a
MERGE_PARENT_1 = d398983a457060dff0b700714d3eebbc4dce8e23
MERGE_PARENT_2 = 6e1b6aa27591e997cbe164fd335e8bee08b11f1c
MERGE_VERIFICATION = verified / valid
POST_MERGE_GOVERNANCE = 33188625032 / SUCCESS
POST_MERGE_K2_RUNTIME = 33188625005 / SUCCESS
RULESET = 20707483 / active / no bypass
```

The canonical three P2-R3 blobs match the qualified candidate. The post-merge governance jobs `provenance` and `legacy-tests` succeeded. The post-merge K2 classifier, Ubuntu, Windows, macOS, and `k2-runtime-gate` jobs succeeded.

P2-R3 closure does not create pairwise-comparison, ranking, threshold, statistics, execution, promotion, product, release, or public superiority authority.

---

# NOW — P2-R4 authorization candidate

The active repository unit on this branch is one documentation/governance gate:

```text
P2-R4 = CONTROLLED PAIRWISE COMPARISON OF ALREADY-MATERIALIZED R2/R3 EVIDENCE
P2-R4 AUTHORIZATION = CANDIDATE UNTIL THIS EXACT UNIT IS CANONICAL
P2-R4 IMPLEMENTATION = NOT YET EFFECTIVE
P2-R5+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
WAIVER = NO
```

The exact authorization unit is these five paths and no others:

```text
docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_AUTHORIZATION_2026-08-28.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
```

This unit may not implement P2-R4. The same exact five-path set governs candidate changed-file qualification and required individual pre-merge blob capture.

Candidate authority:

- `docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_AUTHORIZATION_2026-08-28.md`

The candidate defines the later R4 implementation as a pure in-memory layer with this flow:

```text
LEFT VALIDATED P2-R2 REPORT + LEFT VALIDATED P2-R3 SUMMARY
RIGHT VALIDATED P2-R2 REPORT + RIGHT VALIDATED P2-R3 SUMMARY
+ EXACT SHARED EVALUATION CONTEXT
+ EXPLICIT VERSIONED PER-METRIC DIRECTION POLICY
-> STRICT REPORT / SUMMARY CROSS-BINDING
-> SAME BENCHMARK / MANIFEST / CASE-TOPOLOGY PROOF
-> CONTROLLED-CONTEXT BINDING
-> DETERMINISTIC PER-METRIC RAW DELTAS
-> IMMUTABLE PAIRWISE COMPARISON IDENTITY
```

Required boundaries include:

- both R2 reports and both R3 summaries are untrusted caller input and must be revalidated;
- each R3 summary must cross-bind to its corresponding R2 report identity;
- benchmark ID, protocol, R1 manifest set, task families, case IDs, R1 result identities, metric IDs, and metric units must match exactly across both sides;
- no intersection, union, imputation, alignment, renaming, or dropping of mismatched task material;
- one exact shared ADR-0010 evaluation context applies to both sides;
- model/provider, configuration, repository/task snapshot, environment, network assumptions, budget, attempt policy, allowed tools, prompt policy, and scoring method therefore remain controlled and equal inside this slice;
- the only controlled evaluation dimension intentionally allowed to differ is the subject system/version/commit identity;
- raw artifact/log-set identities may differ because they identify each side's evidence;
- metric direction must be explicit `HIGHER_IS_BETTER` or `LOWER_IS_BETTER` and is never inferred;
- a metric is comparable only when both sides have finite `REDUCED` R3 evidence under matching reducer/value-kind/unit/missingness/count semantics;
- the only authorized numeric relation is finite raw `left_value - right_value`;
- exact left/right coverage remains visible;
- task families remain separate;
- deterministic canonical identity and deep immutability are required.

Explicit non-grants include:

- no winner, loser, better/worse, superiority, tie, pass/fail, accept/reject, or promotion verdict;
- no threshold or target band;
- no N-way comparison, ranking, leaderboard, or universal score;
- no weighted/blended score or cross-task normalization;
- no percentage-change or normalized utility inference;
- no Pareto dominance;
- no statistical significance, confidence interval, bootstrap, uncertainty model, or hypothesis test;
- no comparison where model/provider/configuration/prompt/environment/budget/tools differ;
- no provider/model/reviewer/evaluator/tool/agent invocation;
- no benchmark task execution;
- no network, secrets, subprocess/sandbox execution, persistence/file output, telemetry, learning, dependency, CLI/product, release, or ruleset authority;
- no public superiority claim.

---

# THEN — only if the P2-R4 authorization becomes canonical

If and only if this exact authorization PR is qualified on one exact head, merged normally into protected `main`, and its required post-merge proof succeeds, the next eligible unit is exactly one P2-R4 implementation PR with this allowlist:

```text
packages/kodac-runtime/bench/p2-r4/**
packages/kodac-runtime/test/p2-r4-*.test.ts
docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_EVIDENCE_2026-08-28.md
```

No other path is implied.

The implementation may import canonical P2-R1 canonicalization/hash primitives and canonical P2-R2/P2-R3 public schemas/types. It may use committed local fixtures and in-memory reports/summaries in tests. It may not change P2-R1, P2-R2, or P2-R3 bytes.

Successful P2-R4 does **not** authorize P2-R5. Broader model/provider/configuration comparison, N-way ranking, statistics, external execution, promotion, competitive/public claims, or product integration require later separate exact canonical authorization.

---

# Durable dependency order

```text
K6 bounded closeout
-> P2 KodacBench
   -> P2-R1 [CLOSED_CANONICAL]
   -> P2-R2 [CLOSED_CANONICAL]
   -> P2-R3 [CLOSED_CANONICAL]
   -> P2-R4 [CURRENT AUTHORIZATION CANDIDATE]
   -> P2-R5+ [NOT AUTHORIZED]
-> P3 Context Engine v2
-> P4 Reviewer Intelligence v2
-> P5 Finding Verifier Fabric
-> P6 Security Validation
-> P7 Bounded Autofix
-> P8 Product / Distribution Hardening
```

General KodacBench evidence remains required before broad claims about context, reviewer, verifier, security, autofix, or product superiority.

---

# Authorization-candidate qualification

Do not merge this documentation/governance gate until one frozen exact head proves:

1. exact five-path scope and all five final blobs;
2. `behind_by=0` against protected `main`;
3. open, non-draft, mergeable PR state;
4. required exact-head CI terminal success, including trusted `provenance`, `legacy-tests`, and `k2-runtime-gate` where applicable;
5. at least two distinct independent external substantive terminal-clean semantic reviewer channels under the provider-neutral quorum policy;
6. zero unresolved material findings and zero unresolved actionable review threads;
7. ruleset `20707483` active with required contexts/thread resolution, `bypass_actors=[]`, and `current_user_can_bypass=never`;
8. `WAIVER=NO`;
9. normal history-preserving guarded merge using the exact qualified `expected_head_sha`;
10. post-merge protected-main, ordered-parent, tree, blob, signature, applicable-check, and ruleset/no-bypass proof before implementation authority becomes effective.

Any repository-byte change invalidates prior exact-head qualification evidence. If canonical `main` moves, forward-reconcile non-destructively and requalify from scratch. No force-push, rebase, destructive history rewrite, stale-head reuse, or silent waiver.

---

# Preserved stop rules

Stop and report the exact blocker rather than inventing authority when:

- the next unit lacks a canonical authorization;
- live `main` or the exact head moved after qualification;
- required CI/review evidence is stale/failing;
- an unresolved material finding remains;
- the changed-file set exceeds the active allowlist;
- a new dependency/tool/provider/model is needed without admission;
- persistence/telemetry/learning is needed without exact authority;
- work would expand K2, K5, Done Gate, `PROVEN_READY`, release, comparison, promotion, or merge authority by implication;
- merge would require force-push, rebase, destructive history rewriting, stale-head reuse, or silent waiver.

No roadmap sentence can override these stop rules.

---

# Navigation

- How to work: `AGENTS.md`
- Current action: `docs/roadmap/NEXT.md`
- Current engineering roadmap: `docs/roadmap/ROADMAP.md`
- Current milestone ledger: `docs/roadmap/MILESTONES.md`
- Engineering/public-version separation: `docs/roadmap/VERSION_PLAN.md`
- P2-R4 authorization candidate: `docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_AUTHORIZATION_2026-08-28.md`
- P2-R3 historical candidate evidence record: `docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_EVIDENCE_2026-08-28.md`
- Durable ordered plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Research/gap rationale: `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`
