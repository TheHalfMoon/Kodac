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
P2-R2 = NOT YET AUTHORIZED BY CANONICAL MAIN
P2-R3+ = NOT AUTHORIZED
WAIVER = NO
```

P2-R1 evidence is layered:

- historical candidate-time evidence record: `docs/planning/KODAC_P2_R1_BENCHMARK_CONTRACT_FIXTURE_MANIFEST_EVIDENCE_2026-08-28.md`;
- qualified final head: `f3ab68cc74f391ae460b82a8697c7e319cb4ed3b`;
- qualified tree: `a01997cffe5848dd91ac12a6639134648bbe2f89`;
- canonical merge: PR #238 / `c499c8ac098cca9719eaad3cacadd2af7d1c0a1f`;
- post-merge governance run: `33173090203` / SUCCESS;
- post-merge K2 runtime run: `33173090251` / SUCCESS;
- merge verification: verified / valid;
- canonical six-path blobs and active no-bypass ruleset were re-proven after merge.

The evidence file intentionally retains candidate-time wording because its bytes were frozen before its own merge. It does not claim current incompletion; subsequent immutable GitHub object/check proof establishes `P2-R1 = CLOSED_CANONICAL`.

P2-R1 closure does not create provider/model/reviewer/evaluator invocation, external benchmark execution, aggregation/ranking, product integration, persistence, learning, release, or general superiority authority.

---

# NOW — P2-R2 authorization candidate

The active repository unit on this branch is one documentation/governance gate:

```text
P2-R2 = LOCAL DETERMINISTIC RUNNER + IMMUTABLE REPORT SPINE
P2-R2 AUTHORIZATION = CANDIDATE UNTIL THIS EXACT UNIT IS CANONICAL
P2-R2 IMPLEMENTATION = NOT YET EFFECTIVE
P2-R3+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
```

The exact authorization unit is these five paths and no others:

```text
docs/planning/KODAC_P2_R2_LOCAL_RUNNER_REPORT_AUTHORIZATION_2026-08-28.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
```

This unit may not implement P2-R2. The same exact five-path set governs candidate changed-file qualification and required individual pre-merge blob capture.

The candidate defines the later R2 implementation as a pure in-memory local layer with this flow:

```text
VALIDATED P2-R1 FIXTURE / MANIFEST VALUES
+ CALLER-MATERIALIZED CASE OBSERVATIONS
-> STRICT IDENTITY / METRIC BINDING
-> DETERMINISTIC ORDERING
-> TASK-FAMILY-SEPARATED REPORT
-> IMMUTABLE REPORT IDENTITY
```

Required boundaries include:

- no provider/model/reviewer/evaluator/tool/agent invocation;
- no network, secrets, subprocesses, sandbox execution, persistence/file output, telemetry, or new dependency;
- no modification of P2-R1 contract or fixture bytes;
- observations must bind exact R1 `case_id`, `result_identity`, task family, metric ID, and unit;
- duplicate, unknown, cross-family, unit-drift, identity-mismatch, hostile-structure, and non-finite values fail closed;
- input order does not affect canonical report identity;
- caller mutation after return does not mutate returned report semantics;
- missing observations remain explicit;
- no inferred reducer, mean, weighting, normalization, threshold, global ranking, universal score, `best`, `winner`, or superiority semantic.

Candidate authority:

- `docs/planning/KODAC_P2_R2_LOCAL_RUNNER_REPORT_AUTHORIZATION_2026-08-28.md`

---

# THEN — only if the P2-R2 authorization becomes canonical

If and only if this exact authorization PR is qualified on one exact head, merged normally into protected `main`, and its required post-merge proof succeeds, the next eligible unit is exactly one P2-R2 implementation PR with this allowlist:

```text
packages/kodac-runtime/bench/p2-r2/**
packages/kodac-runtime/test/p2-r2-*.test.ts
docs/planning/KODAC_P2_R2_LOCAL_RUNNER_REPORT_EVIDENCE_2026-08-28.md
```

No other path is implied.

The implementation may import the canonical P2-R1 contract and use committed P2-R1 fixtures in tests, but it may not change R1 bytes.

Successful P2-R2 does **not** authorize P2-R3. Any reducer/evaluator/external-execution/comparison slice requires a separate exact canonical authorization.

---

# Durable dependency order

```text
K6 bounded closeout
-> P2 KodacBench
   -> P2-R1 [CLOSED_CANONICAL]
   -> P2-R2 [CURRENT AUTHORIZATION CANDIDATE]
   -> P2-R3+ [NOT AUTHORIZED]
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
- work would expand K2, K5, Done Gate, `PROVEN_READY`, release, or merge authority by implication;
- merge would require force-push, rebase, destructive history rewriting, stale-head reuse, or silent waiver.

No roadmap sentence can override these stop rules.

---

# Navigation

- How to work: `AGENTS.md`
- Current action: `docs/roadmap/NEXT.md`
- Current engineering roadmap: `docs/roadmap/ROADMAP.md`
- Current milestone ledger: `docs/roadmap/MILESTONES.md`
- Engineering/public-version separation: `docs/roadmap/VERSION_PLAN.md`
- P2-R2 authorization candidate: `docs/planning/KODAC_P2_R2_LOCAL_RUNNER_REPORT_AUTHORIZATION_2026-08-28.md`
- P2-R1 historical candidate evidence record: `docs/planning/KODAC_P2_R1_BENCHMARK_CONTRACT_FIXTURE_MANIFEST_EVIDENCE_2026-08-28.md`
- Durable ordered plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Research/gap rationale: `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`
