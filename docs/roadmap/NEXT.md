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
P2-R3 IMPLEMENTATION = NOT YET AUTHORIZED BY CANONICAL MAIN
P2-R4+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
WAIVER = NO
```

P2-R2 closure is bound by immutable later proof rather than rewriting its historical candidate-time evidence record:

```text
QUALIFIED_FINAL_HEAD = 46f455c21e294d92d2976d4398a26ffdf3f82c96
QUALIFIED_FINAL_TREE = d7957e6030a723efbdddc174651fe4da313ff84d
MERGE = PR #240 / 4a0b2c67dbd707c18395b0898752c111ca6b16a9
MERGE_PARENT_1 = f2b8d452e93ec207ebe04c9db7d47dc032df20de
MERGE_PARENT_2 = 46f455c21e294d92d2976d4398a26ffdf3f82c96
MERGE_VERIFICATION = verified / valid
POST_MERGE_GOVERNANCE = 33180522055 / SUCCESS
POST_MERGE_K2_RUNTIME = 33180522073 / SUCCESS
```

The canonical three P2-R2 blobs matched the qualified candidate, the post-merge governance jobs `provenance` and `legacy-tests` succeeded, the post-merge K2 classifier/Ubuntu/Windows/macOS/`k2-runtime-gate` jobs succeeded, and ruleset `20707483` remained active with no bypass.

P2-R2 closure does not create reducer/threshold/comparison/ranking authority and does not authorize provider/model/reviewer/evaluator invocation, external benchmark execution, product integration, persistence, telemetry, learning, release, or superiority claims.

---

# NOW — P2-R3 authorization candidate

The active repository unit on this branch is one documentation/governance gate:

```text
P2-R3 = EXPLICIT REDUCER POLICY + TASK-FAMILY SUMMARY SPINE
P2-R3 AUTHORIZATION = CANDIDATE UNTIL THIS EXACT UNIT IS CANONICAL
P2-R3 IMPLEMENTATION = NOT YET EFFECTIVE
P2-R4+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
```

The exact authorization unit is these five paths and no others:

```text
docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_AUTHORIZATION_2026-08-28.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
```

This unit may not implement P2-R3. The same exact five-path set governs candidate changed-file qualification and required individual pre-merge blob capture.

The candidate defines the later R3 implementation as a pure in-memory layer with this flow:

```text
VALIDATED P2-R2 REPORT
+ EXPLICIT VERSIONED TASK-FAMILY METRIC POLICY
-> STRICT POLICY / REPORT BINDING
-> EXPLICIT PER-METRIC REDUCER
-> DETERMINISTIC TASK-FAMILY SUMMARY
-> IMMUTABLE SUMMARY IDENTITY
```

Closed reducer vocabulary proposed for this slice:

```text
ARITHMETIC_MEAN
BOOLEAN_TRUE_RATE
```

Closed missingness policy vocabulary proposed for this slice:

```text
REQUIRE_COMPLETE
OBSERVED_ONLY_WITH_COVERAGE
```

Required boundaries include:

- no reducer inferred from numeric/boolean shape;
- task family, metric ID, unit, value kind, reducer, missingness policy, and minimum observed count are explicit evidence;
- incomplete evidence remains visible through expected/observed/missing/unavailable counts;
- missing/unavailable values are never converted to zero or false;
- zero observed values remain insufficient evidence rather than a numeric zero;
- task families remain separate;
- deterministic canonical identity is independent of caller object iteration order and environment noise;
- caller mutation after return does not mutate returned summary semantics;
- hostile/non-JSON structures fail closed before identity construction.

Explicit non-grants include:

- no directionality (`higher_is_better` / `lower_is_better`);
- no pass/fail threshold or target band;
- no system/strategy/model/provider/reviewer/configuration/report comparison;
- no weighted/blended score or cross-task normalization;
- no Pareto dominance or statistical significance claim;
- no ranking, leaderboard, `best`, `winner`, `superior`, or promotion semantic;
- no provider/model/reviewer/evaluator/tool/agent invocation;
- no network, secrets, subprocess/sandbox execution, persistence/file output, telemetry, learning, dependency, CLI/product, release, or ruleset authority.

Candidate authority:

- `docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_AUTHORIZATION_2026-08-28.md`

---

# THEN — only if the P2-R3 authorization becomes canonical

If and only if this exact authorization PR is qualified on one exact head, merged normally into protected `main`, and its required post-merge proof succeeds, the next eligible unit is exactly one P2-R3 implementation PR with this allowlist:

```text
packages/kodac-runtime/bench/p2-r3/**
packages/kodac-runtime/test/p2-r3-*.test.ts
docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_EVIDENCE_2026-08-28.md
```

No other path is implied.

The implementation may import the canonical P2-R1 and P2-R2 contracts and may use committed local fixtures/in-memory reports in tests. It may not change P2-R1 or P2-R2 bytes.

Successful P2-R3 does **not** authorize P2-R4. Comparison, directionality, thresholds, rankings, external execution, or competitive/public claims require a later separate exact canonical authorization.

---

# Durable dependency order

```text
K6 bounded closeout
-> P2 KodacBench
   -> P2-R1 [CLOSED_CANONICAL]
   -> P2-R2 [CLOSED_CANONICAL]
   -> P2-R3 [CURRENT AUTHORIZATION CANDIDATE]
   -> P2-R4+ [NOT AUTHORIZED]
-> P3 Context Engine v2
-> P4 Reviewer Intelligence v2
-> P5 Finding Verifier Fabric
-> P6 Security Validation
-> P7 Bounded Autofix
-> P8 Product / Distribution Hardening
```

General KodacBench evidence is required before broad claims about context, reviewer, verifier, security, autofix, or product superiority.

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
- work would expand K2, K5, Done Gate, `PROVEN_READY`, release, comparison, or merge authority by implication;
- merge would require force-push, rebase, destructive history rewriting, stale-head reuse, or silent waiver.

No roadmap sentence can override these stop rules.

---

# Navigation

- How to work: `AGENTS.md`
- Current action: `docs/roadmap/NEXT.md`
- Current engineering roadmap: `docs/roadmap/ROADMAP.md`
- Current milestone ledger: `docs/roadmap/MILESTONES.md`
- Engineering/public-version separation: `docs/roadmap/VERSION_PLAN.md`
- P2-R3 authorization candidate: `docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_AUTHORIZATION_2026-08-28.md`
- P2-R2 historical candidate evidence record: `docs/planning/KODAC_P2_R2_LOCAL_RUNNER_REPORT_EVIDENCE_2026-08-28.md`
- Durable ordered plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Research/gap rationale: `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`
