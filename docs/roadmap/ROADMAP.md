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
| **K6** | Evidence Router & Outcome Learning | **IN PROGRESS: K6-R1/R2/R3/R4 CLOSED_CANONICAL; K6-R5 NOT_AUTHORIZED** | Only already-canonical R1-R4 scopes exist; R5 requires separate authorization |
| **P2 KodacBench** | General measurement spine | **NOT_AUTHORIZED** | No broad quality/superiority claims before accepted evidence |
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

K6 is defined and in progress. The current accepted bounded surface is:

```text
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = CLOSED_CANONICAL
K6-R5 = NOT_AUTHORIZED
K6 BOUNDED CLOSEOUT = NOT YET ELIGIBLE
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

### K6-R5 — next authorization candidate only

R5 is the next bounded strategy proposal/qualification direction. **No K6-R5 implementation is authorized by this roadmap.** Any later R5 qualification must use only an explicitly authorized **R5-specific** corpus/holdout.

```text
R5-SPECIFIC QUALIFICATION CORPUS != GENERAL KODACBENCH
```

Its separate authorization must pin immutable candidate/incumbent identities, exact corpus identity/provenance and task-family guardrails; keep latency/compute/privacy/security visible independently; reject self-reported reward as truth; retain rollback identity; prohibit automatic promotion; and define the exact implementation/test/workflow/schema allowlist and adoption gate.

R5 may not invoke providers/models/reviewers, execute a strategy, mutate trust policy, learn online, persist or upload outcomes, self-promote, or use bounded evidence to support broad quality claims.

## Ordered improvement program

The adopted durable sequence is:

```text
P0 roadmap truth reconciliation
-> K6-R4 authorization + bounded implementation + qualification + canonical closeout
-> K6-R5 authorization + bounded strategy proposal/qualification + canonical closeout
-> K6 bounded closeout
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
K6-R5 IMPLEMENTATION = NOT_AUTHORIZED
KODACBENCH IMPLEMENTATION = NOT_AUTHORIZED
NEW DEPENDENCIES = NOT_AUTHORIZED BY THIS ROADMAP
CODE / DONOR IMPORT = NOT_AUTHORIZED BY THIS ROADMAP
PROVIDER / MODEL / REVIEWER INVOCATION = NOT_AUTHORIZED BY THIS ROADMAP
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED BY THIS ROADMAP
AUTOFIX EXECUTION = NOT_AUTHORIZED BY THIS ROADMAP
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED BY THIS ROADMAP
```

## Roadmap rule

A roadmap sentence never substitutes for an exact authorization record. Every new implementation unit remains fail-closed until its separate canonical authorization, exact-head qualification, guarded merge, and required post-merge proof make that authority effective.
