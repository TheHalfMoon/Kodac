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

Text on this feature branch is candidate text only. The transition below becomes effective only after this exact K6 closeout candidate is merged and its required post-merge proof succeeds.

---

# Current canonical truth before this candidate merges

```text
K5 = CLOSED FOR CANONICAL R1-R5 BOUNDED PROOF-REVIEW SCOPE
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = CLOSED_CANONICAL
K6-R5 = CLOSED_CANONICAL
K6 BOUNDED CLOSEOUT AUTHORIZATION = CANONICAL VIA PR #235 / 748706683a0102f1743c1797950272bbd41d8a3c
K6 ITSELF = NOT CLOSED UNTIL THIS CLOSEOUT MERGE + POST-MERGE GATE PASSES
P2 KODACBENCH IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

Canonical anchors include:

```text
K6 planning       = PR #202 / 2f167794a375bc913c377746419acf3bcc5ee0ab
K6-R1 merge       = PR #204 / 7bc163b9ec0d5d451950542f1feb15e444fbdc6c
K6-R2 merge       = PR #206 / 90c00cfc01cb874c08b4f7bde1469ccb298b5648
K6-R3 merge       = PR #208 / 4ed9bed6fdb23643c722298adfba4ae8e72097b2
K6-R4 merge       = PR #212 / 7af698feae73f46df06bf6084a7d0d0317d5560a
K6-R4 reconcile   = PR #222 / 1db9fef23df0961d76b1fdd1b0e558fba180cad8
K6-R5 merge       = PR #226 / 91d817741d1c55195d26ef8e8f5be98e04d1977d
K6-R5 reconcile   = PR #234 / 74868b75d0e531fdff8255e3827c4ecbce7dc4ac
K6 closeout auth  = PR #235 / 748706683a0102f1743c1797950272bbd41d8a3c
```

The exact K6 closeout evidence and gate are in:

- `docs/planning/KODAC_K6_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-28.md`
- `docs/planning/KODAC_K6_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`

---

# NOW — exact K6 bounded closeout candidate

The active unit on this branch is exactly the six-document closeout candidate authorized by canonical PR #235.

```text
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE IFF THIS EXACT CLOSEOUT MERGE GATE PASSES
K6-R6+ = NOT REQUIRED FOR THIS BOUNDED CLOSEOUT / NOT AUTHORIZED
P2 KODACBENCH IMPLEMENTATION = NOT_AUTHORIZED BY THIS CLOSEOUT
K2 / K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
```

No seventh path is authorized for this closeout candidate.

The closeout must retain the exact live implementation identities, material repair/anomaly history, provider-neutral semantic-review quorum, active ruleset/no-bypass evidence, and authority-by-composition protections. It must not rewrite historical branch/base-pinned non-applicability as green CI.

Critical distinctions remain:

```text
ELIGIBILITY EVIDENCE != EXECUTION AUTHORITY
ROUTE PLAN != ROUTE EXECUTION
OUTCOME LINKAGE != DONE GATE EVALUATION
OUTCOME MEMORY != DURABLE PERSISTENCE AUTHORITY
STRATEGY COMPARISON != PROMOTION
R5 DOMINANCE RESULT != PROVEN_READY
R5 BOUNDED QUALIFICATION CORPUS != GENERAL KODACBENCH
SELF-IMPROVING != SELF-AUTHORIZING
```

---

# THEN — only after canonical K6 closeout proof

After and only after this closeout is canonically merged and post-merge proven, the next eligible repository unit is:

```text
P2 KODACBENCH AUTHORIZATION-CANDIDATE PREPARATION ONLY
P2 KODACBENCH IMPLEMENTATION = NOT_AUTHORIZED UNTIL ITS OWN SEPARATE EXACT CANONICAL AUTHORIZATION BECOMES EFFECTIVE
```

The P2 authorization candidate must be a separate planning/governance unit. It may define the exact benchmark contract, scope, datasets/fixtures, metrics, reproducibility requirements, security/privacy boundaries, implementation allowlist, qualification gates, review quorum, merge conditions, and preserved non-grants. It may not implement the benchmark merely because this front door names it next.

The durable dependency order remains:

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

General KodacBench is required before broad claims about context, reviewer, verifier, security, autofix, or product superiority.

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
- K6 closeout evidence: `docs/planning/KODAC_K6_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`
- Durable ordered plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Research/gap rationale: `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`