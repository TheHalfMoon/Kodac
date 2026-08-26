# Kodac — NEXT

> **Start here before doing repository work.**

## Authority

This file is a navigation/status view only. It does not authorize implementation.

Before any mutation:

1. re-read live GitHub `main`, open PRs, exact heads, CI, reviews, threads and ruleset;
2. read root `AGENTS.md`;
3. read the exact canonical authorization record for the active unit;
4. execute only that unit and its allowlist.

If this page conflicts with live GitHub, an ADR, or an authorization record, the live/more authoritative source wins.

---

# Canonical state at plan adoption boundary

```text
CANONICAL_MAIN = 4ed9bed6fdb23643c722298adfba4ae8e72097b2
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = NOT_AUTHORIZED
K6-R5 = NOT_AUTHORIZED
WAIVER = NO
```

K6-R3 closed through PR #208 with guarded merge, exact parent/tree proof, valid GitHub merge signature, and successful post-merge governance and K2 runtime gates.

Always re-read live `main`; do not treat the SHA above as a future merge precondition.

---

# NOW

## P0 — Adopt the improvement plan, then reconcile roadmap truth

The durable plan is:

- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`

The detailed research/gap review is:

- `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`

After the plan is canonical, the next repository mutation is **roadmap truth reconciliation only**:

```text
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/roadmap/NEXT.md
```

Goal:

```text
K6-R1/R2/R3 shown as canonical/closed
K6-R4/R5 shown as not authorized unless a later canonical record says otherwise
historical authorization records left unchanged
engineering milestone status kept separate from public release status
```

Do not implement K6-R4 as part of roadmap reconciliation.

---

# NEXT

## P1 — K6-R4 authorization candidate

Only after roadmap truth is reconciled and a separate authorization record is created/adopted.

R4 topic:

```text
privacy-governed outcome records / memory
```

The R4 authorization must define before implementation:

- allowed and forbidden fields;
- privacy classification;
- repository/user isolation;
- local-first storage behavior;
- provenance;
- retention/deletion/expiry;
- conflict/supersession;
- telemetry/egress rules;
- cross-repository boundaries.

R4 does **not** automatically authorize strategy promotion, provider invocation, model training, telemetry, cross-repository learning, or new K2 authority.

---

# THEN

```text
K6-R4 authorization
-> K6-R4 bounded implementation / qualification / canonical closeout
-> K6-R5 authorization
-> K6-R5 bounded strategy proposal + R5-specific qualification corpus
-> K6 bounded closeout
-> KodacBench
-> Context Engine v2
-> Reviewer Intelligence v2
-> Finding Verifier Fabric
-> Security Validation
-> Bounded Autofix
-> Product / Distribution Hardening
```

Critical sequencing rule:

```text
K6-R5 BOUNDED QUALIFICATION CORPUS != GENERAL KODACBENCH
```

R5 may use only the minimum corpus/holdout explicitly authorized for R5. Full KodacBench comes after K6 closeout and is required before broad claims about context, review, verification, security or autofix quality.

---

# Improvement principles

```text
MORE CONTEXT != BETTER CONTEXT
AGENT CONSENSUS != TRUTH
REVIEW != PROOF
VERIFIER RESULT = EVIDENCE, NOT COMPLETION AUTHORITY
TESTS GREEN != COMPLETE CORRECTNESS
PATCH APPLIED != FIXED
SELF-IMPROVING != SELF-AUTHORIZING
```

Future direction:

- selective, task-aware context rather than context volume;
- reviewer + evidence-grounded critic rather than default large swarms;
- first-class verifier proposals for material findings;
- frozen benchmark + later-in-time reality-check lane;
- deterministic security evidence kept visible beside agentic reasoning;
- any autofix executed only through bounded K2 authority and re-proved afterward.

---

# RESEARCH LATER

Research-only until separately authorized:

- cross-model reviewer diversity;
- formal verification for high-risk invariants;
- cross-repository context;
- repository world models;
- learned high-level engineering policies;
- larger specialist multi-agent systems.

---

# Stop rules

Stop and report the exact blocker when:

- implementation authorization is absent;
- live `main` or exact head moved after qualification;
- required CI/review evidence is stale or failing;
- an unresolved material finding remains;
- the changed-file set exceeds the authorized allowlist;
- a new dependency/tool/provider/model is needed without admission;
- persistence/telemetry/learning is needed without privacy authority;
- work would expand K2, K5 or Done Gate authority by implication;
- merge would require force-push, rebase, destructive history rewriting or stale evidence reuse.

No roadmap sentence can override these rules.
