# Kodac — NEXT

> **Start here before doing repository work.**

## Authority

This file is a navigation/status view only. It does not authorize implementation.

Before any mutation:

1. re-read live GitHub `main`, open PRs, exact heads, changed files, CI, reviews, threads, mergeability, and active ruleset;
2. read root `AGENTS.md`;
3. read the governing ADRs and the exact canonical authorization record for the active unit;
4. execute only that unit and its explicit allowlist.

If this page conflicts with live GitHub, an ADR, or an exact authorization/evidence record, the more authoritative source wins.

Candidate wording on a feature branch never creates canonical authority by itself.

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
K6-R6+ = NOT REQUIRED FOR THIS BOUNDED CLOSEOUT / NOT AUTHORIZED
P2 IMPLEMENTATION = NOT YET AUTHORIZED BY CANONICAL MAIN
WAIVER = NO
```

The exact K6 closeout evidence remains:

- `docs/planning/KODAC_K6_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-28.md`
- `docs/planning/KODAC_K6_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`

K6 closure did not create provider/model/reviewer/evaluator invocation, execution, persistence, learning, promotion, Done Gate, `PROVEN_READY`, release, or general KodacBench authority.

---

# NOW — P2-R1 authorization candidate

The active repository unit on this branch is one planning/governance gate:

```text
P2-R1 = BENCHMARK CONTRACT + FROZEN FIXTURE / MANIFEST SPINE
P2-R1 AUTHORIZATION = CANDIDATE UNTIL THIS EXACT UNIT IS CANONICAL
P2-R1 IMPLEMENTATION = NOT YET EFFECTIVE
P2-R2+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
```

The exact authorization unit is these five paths and no others:

```text
docs/planning/KODAC_P2_R1_BENCHMARK_CONTRACT_FIXTURE_MANIFEST_AUTHORIZATION_2026-08-28.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
```

That same exact five-path set governs candidate changed-file qualification and the required individual pre-merge blob capture. Missing any one of those five candidate blobs makes authorization qualification incomplete. This unit may not implement P2-R1.

The candidate defines the later P2-R1 implementation as a local deterministic contract/fixture slice with:

- frozen corpus and separately identified holdout material whose `later-in-time` classification requires proven strict ordering under the defined comparable chronology scheme;
- stable digests and canonical identities;
- task-family-separated metric declarations;
- explicit provenance and contamination status;
- fail-closed schema/identity/path validation;
- immutable evidence/report identity fields;
- no universal blended `best` score;
- no public superiority claim.

The candidate explicitly denies provider/model/reviewer/evaluator calls, network/secrets, dependencies, product-runtime changes, persistence, telemetry, training/learning, strategy execution/promotion, autofix, Done Gate expansion, ruleset bypass, and release authority.

---

# THEN — only if the P2-R1 authorization becomes canonical

If and only if this exact authorization PR is qualified on one exact head, merged normally into protected `main`, and its required post-merge proof succeeds, the next eligible unit is exactly one P2-R1 implementation PR with this allowlist:

```text
packages/kodac-runtime/bench/p2-r1/**
packages/kodac-runtime/test/p2-r1-*.test.ts
packages/kodac-runtime/test/fixtures/p2-r1/**
docs/planning/KODAC_P2_R1_BENCHMARK_CONTRACT_FIXTURE_MANIFEST_EVIDENCE_2026-08-28.md
```

No other path is implied.

The implementation must satisfy the exact tests/evidence/qualification conditions in the canonical authorization. P2-R1 becomes complete only after its own exact-head qualification, guarded normal merge, and post-merge proof.

Successful P2-R1 does **not** authorize P2-R2. The next P2 slice requires a separate canonical authorization record.

---

# Durable dependency order

```text
K6 bounded closeout
-> P2 KodacBench
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
- P2-R1 authorization candidate: `docs/planning/KODAC_P2_R1_BENCHMARK_CONTRACT_FIXTURE_MANIFEST_AUTHORIZATION_2026-08-28.md`
- K6 closeout evidence: `docs/planning/KODAC_K6_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`
- Durable ordered plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Research/gap rationale: `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`