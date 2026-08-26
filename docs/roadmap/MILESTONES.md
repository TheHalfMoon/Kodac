# Kodac Engineering Milestones

## Authority

This file is the concise **current engineering milestone ledger**. It reports canonical state; it does not authorize implementation, release, provider/model access, persistence, learning, dependencies, or side effects.

Execution authority comes only from the exact canonical authorization record for the active unit after live GitHub truth, root `AGENTS.md`, and `docs/roadmap/NEXT.md` have been read.

Historical authorization/evidence records remain unchanged historical evidence.

## Current canonical milestone ledger

| Milestone / gate | Status | Current boundary |
| --- | --- | --- |
| K0/K1 | **CLOSED** | Architecture, governance, provenance, donor-selection foundation complete |
| K2 | **CLOSED** | Trusted Runtime Spine; K2 remains trusted side-effect execution boundary |
| K3 | **CLOSED for canonical K3-R1 through K3-R6 bounded scope** | K3-R7+ not required / not authorized |
| KRI-P0 | **CANONICAL PLANNING AUTHORITY** | Planning/contract design only |
| KRI-R1 through KRI-R4 | **CANONICAL / COMPLETE for separately authorized scopes** | KRI-R5+ not authorized |
| K4 | **CLOSED for canonical K4-R1 through K4-R5 bounded data-only scope** | K4-R6+ not required / not authorized |
| K5 | **CLOSED for canonical K5-R1 through K5-R5 bounded proof-review scope** | K5-R6+ not required / not authorized; Done Gate unchanged |
| K6-R1 | **CLOSED_CANONICAL** | Pure model-provider route eligibility only |
| K6-R2 | **CLOSED_CANONICAL** | Pure deterministic route-plan materialization only |
| K6-R3 | **CLOSED_CANONICAL** | Pure deterministic route-outcome linkage only |
| K6-R4 | **NOT_AUTHORIZED** | Privacy-governed outcome-record / memory authorization candidate is next |
| K6-R5 | **NOT_AUTHORIZED** | Bounded strategy proposal/qualification remains later and separate |
| K6 bounded closeout | **NOT YET ELIGIBLE** | Requires separately completed R4 and R5 lifecycles |
| P2 KodacBench | **NOT_AUTHORIZED** | General measurement spine follows K6 bounded closeout |
| P3-P8 | **NOT_AUTHORIZED** | Later improvement stages require dependencies and separate authority |

## Canonical reconciliation anchors

```text
K5 closeout       = PR #201 / 06a6e33ca78bc4d0bd68449292161e1e4dc96385
K6 planning       = PR #202 / 2f167794a375bc913c377746419acf3bcc5ee0ab
K6-R1 merge       = PR #204 / 7bc163b9ec0d5d451950542f1feb15e444fbdc6c
K6-R2 merge       = PR #206 / 90c00cfc01cb874c08b4f7bde1469ccb298b5648
K6-R3 merge       = PR #208 / 4ed9bed6fdb23643c722298adfba4ae8e72097b2
Improvement plan  = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

These are evidence anchors, not future merge preconditions. Always re-read live `main`.

## K5 — CLOSED

```text
K5 = CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K5-R1 THROUGH K5-R5 = CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K5-R6+ = NOT REQUIRED FOR K5 CLOSEOUT / NOT AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
```

The former `IFF THIS CLOSEOUT MERGE GATE PASSES` language was candidate-time language and is no longer current roadmap truth after canonical PR #201 closeout.

Canonical closeout evidence:

- `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md`

K5 proof states remain evidence and never become completion authority.

## K6 — IN PROGRESS

```text
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = NOT_AUTHORIZED
K6-R5 = NOT_AUTHORIZED
```

R1-R3 preserve their exact bounded, caller-materialized, deterministic contracts. Their canonical completion does **not** authorize:

- provider/model/reviewer/evaluator/tool/agent invocation;
- route/fallback/retry execution;
- uncontrolled failure/retry classification;
- persistence, telemetry, training, or learning;
- strategy promotion;
- cross-repository aggregation;
- autofix;
- K2 side-effect authority expansion;
- Done Gate or `PROVEN_READY` authority transfer.

Exact K6 authorization records:

- `docs/planning/KODAC_K6_R1_MODEL_PROVIDER_ROUTE_ELIGIBILITY_AUTHORIZATION_2026-08-26.md`
- `docs/planning/KODAC_K6_R2_DETERMINISTIC_ROUTE_PLAN_AUTHORIZATION_2026-08-26.md`
- `docs/planning/KODAC_K6_R3_ROUTE_OUTCOME_LINKAGE_AUTHORIZATION_2026-08-26.md`

## Next milestone unit

After this P0 roadmap reconciliation is canonical and post-merge proven, the next eligible action is **K6-R4 authorization-candidate preparation only**.

Before any K6-R4 implementation, its separate authorization must define:

- allowed and forbidden fields;
- privacy classification and sensitive-data rules;
- repository/user isolation;
- local-first storage and persistence authority;
- provenance;
- retention, deletion, expiry, conflict and supersession;
- telemetry and network/egress rules;
- cross-repository boundaries;
- exact implementation allowlist;
- CI/review/merge/post-merge proof gates.

K6-R4 implementation remains fail-closed until that authorization itself becomes canonical and its required post-merge proof succeeds.

## Ordered later milestones

```text
K6-R4 authorization + bounded implementation + closeout
-> K6-R5 authorization + bounded qualification + closeout
-> K6 bounded closeout
-> P2 KodacBench
-> P3 Context Engine v2
-> P4 Reviewer Intelligence v2
-> P5 Finding Verifier Fabric
-> P6 Security Validation
-> P7 Bounded Autofix
-> P8 Product / Distribution Hardening
```

The durable program sequencing is controlled by:

- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`

The current execution front door is:

- `docs/roadmap/NEXT.md`

## Public-release separation

```text
ENGINEERING MILESTONE CLOSED
!= PACKAGE PUBLISHABLE
!= PUBLIC VERSION DECLARED
!= PRODUCTION-READINESS CLAIM
!= BRAND LAUNCH AUTHORIZED
```

No public release, package publication, version declaration, support promise, or brand launch is authorized by this milestone ledger.
