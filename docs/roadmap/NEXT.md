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

Text on a feature branch or PR is candidate text only. The action below is effective only when this roadmap reconciliation is canonical on `main` and its required post-merge proof has succeeded.

---

# Current canonical truth

Re-read live `main` before acting. The current reconciliation is based on these canonical anchors:

```text
K5 closeout       = PR #201 / 06a6e33ca78bc4d0bd68449292161e1e4dc96385
K6-R1 merge       = PR #204 / 7bc163b9ec0d5d451950542f1feb15e444fbdc6c
K6-R2 merge       = PR #206 / 90c00cfc01cb874c08b4f7bde1469ccb298b5648
K6-R3 merge       = PR #208 / 4ed9bed6fdb23643c722298adfba4ae8e72097b2
K6-R4 auth root   = PR #211 / 1e8c193ca0aeeb77b56ad1c75d9d7db0ca82b372
K6-R4 final auth  = PR #221 / 93c197cb6f88409dd406694fe4614ecf0fb6ba00
K6-R4 merge       = PR #212 / 7af698feae73f46df06bf6084a7d0d0317d5560a
K6-R5 auth        = PR #224 / 31f5f9f3e05dd0feeda2b96b3221374c4bfe0032
K6-R5 Stage A     = PR #225 / 76f8639a329d9f168fea9d71f78711d612075619
K6-R5 repair auth = PR #227 / 06f2dc2df5eb432107313932a16079edc4912a38
K6-R5 trust repair= PR #228 / 0c151b3db8ab1487c5fcf1553060b4743ede155d
K6-R5 pin auth    = PR #232 / 2d4393fd08329507385fe06d90c3ddedff77bad9
K6-R5 Unit B      = PR #233 / 99aa00db6265b33ebffb2a7653e23a8db4b70c31
K6-R5 merge       = PR #226 / 91d817741d1c55195d26ef8e8f5be98e04d1977d
Improvement plan  = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

Current bounded state after this reconciliation is canonical and post-merge proven:

```text
K5 = CLOSED FOR CANONICAL R1-R5 BOUNDED PROOF-REVIEW SCOPE
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = CLOSED_CANONICAL
K6-R5 = CLOSED_CANONICAL
K6 BOUNDED CLOSEOUT = NOT_AUTHORIZED
P2 KODACBENCH = NOT_AUTHORIZED
WAIVER = NO
```

Engineering milestone state remains separate from public release state.

---

# NOW — K6 bounded closeout authorization candidate

After this reconciliation is canonical and post-merge proven, the next eligible repository unit is:

```text
K6 BOUNDED CLOSEOUT AUTHORIZATION-CANDIDATE PREPARATION
TOPIC = SEPARATE EVIDENCE / CLOSEOUT GATE FOR CANONICAL K6-R1 THROUGH K6-R5
K6 BOUNDED CLOSEOUT = NOT_AUTHORIZED BY THIS ROADMAP
P2 KODACBENCH = NOT_AUTHORIZED
```

Do **not** mark K6 closed merely because R1-R5 are separately `CLOSED_CANONICAL`.

A separate closeout record must become canonical before `K6 = CLOSED` may be claimed and must at minimum:

- bind the exact canonical R1-R5 authorization, implementation and reconciliation identities;
- prove that each slice stayed within its separately authorized bounded contract and exact post-merge evidence;
- record any material repair/anomaly history instead of rewriting it as a clean first attempt;
- prove that R1-R5 together did not create provider/model/reviewer execution, routing execution, persistence, telemetry, training, cross-repository learning, automatic promotion, trust-policy mutation, K2/K5 expansion, or Done Gate authority;
- preserve the distinction between the bounded R5-specific qualification corpus and general KodacBench;
- prove active ruleset/no-bypass state, exact-head repository CI, semantic-review quorum, guarded normal merge, ordered parents/tree/blob identities and post-merge checks for the closeout candidate itself;
- keep public release, package publication, support, compatibility and brand claims separate and unauthorized.

The closeout candidate is documentation/evidence authority only unless a later exact canonical record says otherwise. It may not add source, runtime, schema, workflow, dependency, provider, model, persistence, telemetry, learning, autofix, release, or ruleset authority by implication.

---

# THEN

The canonical dependency order remains:

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

- implementation or closeout authority is absent;
- live `main` or exact head moved after qualification;
- required CI/review evidence is stale or failing;
- an unresolved material finding remains;
- the changed-file set exceeds the active allowlist;
- a new dependency/tool/provider/model is needed without admission;
- persistence/telemetry/learning is needed without exact privacy authority;
- work would expand K2, K5, K6, Done Gate, release, or merge authority by implication;
- merge would require force-push, rebase, destructive history rewriting, stale-head reuse, or silent waiver.

No roadmap sentence can override these stop rules.