# Kodac — NEXT

> **Start here before doing repository work.**

## Authority

This file is a navigation/status view only. It does not authorize implementation.

Before any mutation:

1. re-read live GitHub `main`, open PRs, exact heads, changed files, CI, reviews, threads, mergeability and active ruleset;
2. read root `AGENTS.md`;
3. read the governing ADRs and the exact canonical authorization record for the active unit;
4. execute only that unit and its explicit allowlist.

If this page conflicts with live GitHub, an ADR, or an exact authorization/evidence record, the more authoritative source wins.

Text on a feature branch or PR is candidate text only. The action below is effective only when this P0 roadmap reconciliation is canonical on `main` and its required post-merge proof has succeeded.

---

# Current canonical truth

Re-read live `main` before acting. The current reconciliation is based on these canonical anchors:

```text
K5 closeout       = PR #201 / 06a6e33ca78bc4d0bd68449292161e1e4dc96385
K6-R1 merge       = PR #204 / 7bc163b9ec0d5d451950542f1feb15e444fbdc6c
K6-R2 merge       = PR #206 / 90c00cfc01cb874c08b4f7bde1469ccb298b5648
K6-R3 merge       = PR #208 / 4ed9bed6fdb23643c722298adfba4ae8e72097b2
Improvement plan  = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

Current bounded state:

```text
K5 = CLOSED FOR CANONICAL R1-R5 BOUNDED PROOF-REVIEW SCOPE
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = NOT_AUTHORIZED
K6-R5 = NOT_AUTHORIZED
WAIVER = NO
```

Engineering milestone state remains separate from public release state.

---

# NOW — K6-R4 authorization candidate

After this P0 reconciliation is canonical and post-merge proven, the next eligible repository unit is:

```text
K6-R4 AUTHORIZATION-CANDIDATE PREPARATION
TOPIC = PRIVACY-GOVERNED BOUNDED OUTCOME RECORDS / MEMORY
K6-R4 IMPLEMENTATION = NOT_AUTHORIZED
```

Do **not** implement K6-R4 source/runtime work merely because this roadmap names it next.

A separate R4 authorization must become canonical before implementation and must define at minimum:

- exact allowed fields;
- exact forbidden fields and prohibited raw/sensitive content;
- privacy classification and sensitive-data handling;
- repository/user isolation;
- local-first behavior;
- whether persistence is optional/required and its exact authority boundary;
- provenance identities;
- retention;
- deletion;
- expiry;
- conflict and supersession semantics;
- telemetry rules;
- network/egress rules;
- cross-repository boundaries;
- exact implementation allowlist;
- required tests and negative/adversarial cases;
- exact-head CI and review requirements;
- guarded merge requirements;
- post-merge proof requirements.

The R4 authorization must explicitly preserve:

```text
MODEL / PROVIDER / REVIEWER INVOCATION = NOT_AUTHORIZED
MODEL TRAINING = NOT_AUTHORIZED
TELEMETRY / UPLOAD = NOT_AUTHORIZED BY IMPLICATION
UNCONTROLLED PERSISTENCE = NOT_AUTHORIZED
CROSS-REPOSITORY LEARNING = NOT_AUTHORIZED
STRATEGY PROMOTION = NOT_AUTHORIZED
AUTOFIX = NOT_AUTHORIZED
EXTERNAL SERVICES = NOT_AUTHORIZED
K2 AUTHORITY EXPANSION = NOT_AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY CHANGE = NOT_AUTHORIZED
```

The authorization candidate may only grant a future implementation allowlist after that authorization itself has passed exact-head qualification, guarded merge, and required post-merge proof.

---

# THEN

The canonical dependency order remains:

```text
K6-R4 authorization
-> K6-R4 bounded implementation / qualification / canonical closeout
-> K6-R5 authorization
-> K6-R5 bounded strategy proposal + R5-specific qualification corpus
-> K6 bounded closeout
-> P2 KodacBench
-> P3 Context Engine v2
-> P4 Reviewer Intelligence v2
-> P5 Finding Verifier Fabric
-> P6 Security Validation
-> P7 Bounded Autofix
-> P8 Product / Distribution Hardening
```

Critical sequencing rule:

```text
K6-R5 BOUNDED QUALIFICATION CORPUS != GENERAL KODACBENCH
```

General KodacBench comes only after K6 bounded closeout and is required before broad claims about context, reviewer, verifier, security, autofix, or product superiority.

---

# Navigation

How to work:

- `AGENTS.md`

Current action:

- `docs/roadmap/NEXT.md`

Current engineering roadmap:

- `docs/roadmap/ROADMAP.md`

Current milestone ledger:

- `docs/roadmap/MILESTONES.md`

Engineering/public-version separation:

- `docs/roadmap/VERSION_PLAN.md`

Durable ordered plan:

- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`

Research and gap rationale:

- `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`

---

# Stop rules

Stop and report the exact blocker when:

- implementation authorization is absent;
- live `main` or exact head moved after qualification;
- required CI/review evidence is stale or failing;
- an unresolved material finding remains;
- the changed-file set exceeds the active allowlist;
- a new dependency/tool/provider/model is needed without admission;
- persistence/telemetry/learning is needed without exact privacy authority;
- work would expand K2, K5, K6, Done Gate, release, or merge authority by implication;
- merge would require force-push, rebase, destructive history rewriting, stale-head reuse, or silent waiver.

No roadmap sentence can override these stop rules.
