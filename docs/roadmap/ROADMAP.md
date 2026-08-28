# Kodac Engineering Roadmap

## Authority

This file is a **current engineering roadmap view**. It records canonical milestone state and sequencing; it does not create implementation authority.

Before any repository mutation:

1. re-read live GitHub truth;
2. read root `AGENTS.md`;
3. read `docs/roadmap/NEXT.md`;
4. read the governing ADRs and the exact canonical authorization record for the active unit;
5. execute only that unit and its explicit allowlist.

If this file conflicts with live GitHub, an ADR, or an exact authorization/evidence record, the more authoritative source wins.

Historical authorization and evidence documents remain immutable historical records. Candidate wording inside those records is not rewritten merely because the candidate later became canonical.

## Canonical truth anchors

The current roadmap is reconciled from these already-canonical landings:

```text
K5 bounded closeout:
  PR #201
  merge = 06a6e33ca78bc4d0bd68449292161e1e4dc96385

K6 definition / planning authority:
  PR #202
  merge = 2f167794a375bc913c377746419acf3bcc5ee0ab

K6-R1 model-provider route eligibility:
  PR #204
  merge = 7bc163b9ec0d5d451950542f1feb15e444fbdc6c

K6-R2 deterministic route planning:
  PR #206
  merge = 90c00cfc01cb874c08b4f7bde1469ccb298b5648

K6-R3 route-outcome linkage:
  PR #208
  merge = 4ed9bed6fdb23643c722298adfba4ae8e72097b2

K6-R4 privacy-governed outcome memory:
  authorization root = PR #211 / 1e8c193ca0aeeb77b56ad1c75d9d7db0ca82b372
  final authorization amendment = PR #221 / 93c197cb6f88409dd406694fe4614ecf0fb6ba00
  implementation merge = PR #212 / 7af698feae73f46df06bf6084a7d0d0317d5560a

K6-R5 bounded strategy proposal and qualification:
  authorization = PR #224 / 31f5f9f3e05dd0feeda2b96b3221374c4bfe0032
  trusted Stage A = PR #225 / 76f8639a329d9f168fea9d71f78711d612075619
  ruleset repair authorization = PR #227 / 06f2dc2df5eb432107313932a16079edc4912a38
  trusted ruleset repair = PR #228 / 0c151b3db8ab1487c5fcf1553060b4743ede155d
  split-proof pin authorization = PR #232 / 2d4393fd08329507385fe06d90c3ddedff77bad9
  split-proof Unit B repair = PR #233 / 99aa00db6265b33ebffb2a7653e23a8db4b70c31
  implementation merge = PR #226 / 91d817741d1c55195d26ef8e8f5be98e04d1977d

Kodac intelligence improvement plan adoption:
  PR #209
  merge = 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

Always re-read live `main`; these identities are evidence anchors, not future merge preconditions.

## Current engineering milestone state

| Milestone / gate | Theme | Current canonical state | Authority boundary |
| --- | --- | --- | --- |
| **K0/K1** | Architecture, governance, provenance, donor-selection foundation | **CLOSED** | Historical completed milestone |
| **K2** | Trusted Runtime Spine | **CLOSED** | K2 remains the trusted side-effect execution boundary |
| **K3** | Evidence-Backed Repository Intelligence & Context Engine | **CLOSED for canonical K3-R1 through K3-R6 bounded scope** | K3-R7+ not required for closeout / not authorized |
| **KRI-P0** | Reviewer Intelligence planning | **CANONICAL PLANNING AUTHORITY** | Planning/contract design only |
| **KRI-R1 through KRI-R4** | Bounded Reviewer Intelligence | **CANONICAL / COMPLETE for separately authorized scopes** | KRI-R5+ not authorized |
| **K4** | Ecosystem Compatibility & Capability Registry | **CLOSED for canonical K4-R1 through K4-R5 bounded data-only scope** | K4-R6+ not required for closeout / not authorized |
| **K5** | Proof Review & Judge | **CLOSED for canonical K5-R1 through K5-R5 bounded proof-review scope** | K5-R6+ not required for closeout / not authorized; Done Gate unchanged |
| **K6** | Evidence Router & Outcome Learning | **IN PROGRESS: K6-R1/R2/R3/R4/R5 CLOSED_CANONICAL; bounded closeout NOT_AUTHORIZED** | R1-R5 are separately bounded; a separate K6 closeout evidence gate is next |
| **P2 KodacBench** | General measurement spine | **NOT_AUTHORIZED** | No broad quality/superiority claims before K6 closeout and accepted evidence |
| **P3-P8** | Context v2, Reviewer v2, Verifier, Security, Autofix, Product/Distribution | **NOT_AUTHORIZED** | Each stage requires dependency readiness and separate canonical authority |

Engineering milestone status is separate from public product release status.

## K5 — Closed bounded proof-review milestone

K5 is no longer a closeout candidate. Its bounded R1-R5 proof-review surface closed canonically through PR #201.

```text
K5 = CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K5-R1 THROUGH K5-R5 = CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K5-R6+ = NOT REQUIRED FOR K5 CLOSEOUT / NOT AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
```

K5 judgments and reconciliation remain proof evidence. They do not become `PROVEN_READY`, approval, mergeability, or completion authority.

Canonical K5 closeout evidence remains in:

- `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md`

The disclosed K5-R5 first-attempt Ubuntu anomaly and controlled same-SHA rerun remain part of that historical evidence; this roadmap does not rewrite them as an all-green first attempt.

## K6 — Evidence Router & Outcome Learning

K6 is defined and in progress. After this roadmap reconciliation is canonical and post-merge proven, the accepted bounded slice state is:

```text
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = CLOSED_CANONICAL
K6-R5 = CLOSED_CANONICAL
K6 BOUNDED CLOSEOUT = NOT_AUTHORIZED
```

### K6-R1 — canonical bounded eligibility

Pure caller-materialized deterministic model-provider route eligibility. It does not choose a winner, invoke a provider/model, execute a route, persist outcomes, learn, or change Done Gate/K2 authority.

Authorization record:

- `docs/planning/KODAC_K6_R1_MODEL_PROVIDER_ROUTE_ELIGIBILITY_AUTHORIZATION_2026-08-26.md`

### K6-R2 — canonical bounded route-plan materialization

Pure deterministic materialization of caller-ordered eligible candidates into one primary plus ordered fallbacks. It does not execute fallback, observe failure, score/rank candidates, invoke providers, persist outcomes, or learn.

Authorization record:

- `docs/planning/KODAC_K6_R2_DETERMINISTIC_ROUTE_PLAN_AUTHORIZATION_2026-08-26.md`

### K6-R3 — canonical bounded route-outcome linkage

Pure deterministic linkage of already-materialized route-plan, receipt/verification/K5 evidence, and caller-materialized Done Gate outcome facts. It does not execute, retry, evaluate, persist, score, or learn.

Authorization record:

- `docs/planning/KODAC_K6_R3_ROUTE_OUTCOME_LINKAGE_AUTHORIZATION_2026-08-26.md`

### K6-R4 — canonical privacy-governed bounded outcome memory

R4 is closed canonical for its pure deterministic caller-managed in-process outcome-record and memory lifecycle contract through PR #212.

Canonical authority chain:

- `docs/planning/KODAC_K6_R4_PRIVACY_GOVERNED_OUTCOME_MEMORY_AUTHORIZATION_2026-08-26.md`
- `docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_REPLACEMENT_AUTHORIZATION_2026-08-27.md`

R4 validates canonical R1/R3 lineage, retains minimized pseudonymous identities, enforces repository/owner/privacy isolation, and provides deterministic APPEND, SUPERSEDE, DELETE, EXPIRE and PURGE_TOMBSTONE value transitions. It does not authorize durable persistence, filesystem/database I/O, telemetry, network egress, provider/model/reviewer execution, training/learning, cross-repository aggregation, strategy promotion, K2 expansion, K5 expansion or Done Gate authority.

### K6-R5 — canonical bounded strategy proposal and qualification

R5 is closed canonical for its pure deterministic immutable strategy-value, caller-materialized evidence, structural-comparability and bounded comparison contract through PR #226.

Canonical authority and repair records include:

- `docs/planning/KODAC_K6_R5_BOUNDED_STRATEGY_PROPOSAL_AND_QUALIFICATION_AUTHORIZATION_2026-08-27.md`
- `docs/planning/KODAC_K6_R5_TRUSTED_QUALIFICATION_RULESET_OBSERVABILITY_REPAIR_AUTHORIZATION_2026-08-27.md`
- `docs/planning/KODAC_K6_R5_STAGE_B_SPLIT_PROOF_PIN_AMENDMENT_AUTHORIZATION_2026-08-27.md`

R5 compares only exact same-scope, same-candidate-set, same-corpus, same-ordered-trial-set evidence under deterministic safety/quality/resource rules. It does not grant candidate eligibility, execute either strategy, invoke providers/models/reviewers, collect evidence, persist or upload data, learn, auto-promote, mutate R2 ordering or trust policy, expand K2/K5/Done Gate authority, or support broad benchmark superiority claims.

```text
R5-SPECIFIC QUALIFICATION CORPUS != GENERAL KODACBENCH
CANDIDATE_DOMINATES != PROMOTED
STRATEGY COMPARISON != PROVEN_READY
```

### K6 bounded closeout — next authorization candidate only

A separate K6 closeout record is now the next eligible documentation/evidence direction. **K6 is not closed by this roadmap.** The closeout record must bind and prove the complete separately authorized R1-R5 surface while preserving all non-grants and recording material repair/anomaly history accurately.

The closeout gate may not create provider/model/reviewer execution, routing execution, persistence, telemetry, training/learning, cross-repository learning, automatic strategy promotion, trust-policy mutation, K2/K5/Done Gate expansion, KodacBench authority, dependencies, autofix, release, or ruleset mutation by implication.

## Ordered improvement program

The adopted durable sequence is now:

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

The durable sequence and gates are defined in:

- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`

Research rationale is in:

- `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`

The concise current-action front door is:

- `docs/roadmap/NEXT.md`

## Preserved authority boundaries

```text
K2 SIDE-EFFECT EXECUTION AUTHORITY = UNCHANGED
K5 PROOF EVIDENCE != DONE GATE COMPLETION AUTHORITY
REVIEWER / MODEL OUTPUT = CLAIM / EVIDENCE, NOT COMPLETION TRUTH
K6 ROUTING / OUTCOME EVIDENCE != EXECUTION AUTHORITY
K6-R4 CLOSED SCOPE != PERSISTENCE / LEARNING / PROMOTION AUTHORITY
K6-R5 CLOSED SCOPE != EXECUTION / ELIGIBILITY / PROMOTION / GENERAL BENCHMARK AUTHORITY
K6 BOUNDED CLOSEOUT = NOT_AUTHORIZED BY THIS ROADMAP
KODACBENCH IMPLEMENTATION = NOT_AUTHORIZED
NEW DEPENDENCIES = NOT_AUTHORIZED BY THIS ROADMAP
CODE / DONOR IMPORT = NOT_AUTHORIZED BY THIS ROADMAP
PROVIDER / MODEL / REVIEWER INVOCATION = NOT_AUTHORIZED BY THIS ROADMAP
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED BY THIS ROADMAP
AUTOFIX EXECUTION = NOT_AUTHORIZED BY THIS ROADMAP
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED BY THIS ROADMAP
```

## Roadmap rule

A roadmap sentence never substitutes for an exact authorization record. Every new implementation or closeout unit remains fail-closed until its separate canonical authorization, exact-head qualification, guarded merge, and required post-merge proof make that authority effective.