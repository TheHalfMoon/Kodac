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
| K6-R4 | **CLOSED_CANONICAL** | Pure privacy-governed caller-managed in-process outcome memory only |
| K6-R5 | **CLOSED_CANONICAL** | Pure bounded strategy proposal/comparison and R5-specific qualification only |
| K6 bounded closeout | **NOT_AUTHORIZED** | Separate evidence/closeout authorization candidate is next |
| P2 KodacBench | **NOT_AUTHORIZED** | General measurement spine follows canonical K6 bounded closeout |
| P3-P8 | **NOT_AUTHORIZED** | Later improvement stages require dependencies and separate authority |

## Canonical reconciliation anchors

```text
K5 closeout       = PR #201 / 06a6e33ca78bc4d0bd68449292161e1e4dc96385
K6 planning       = PR #202 / 2f167794a375bc913c377746419acf3bcc5ee0ab
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

After this roadmap reconciliation is canonical and post-merge proven:

```text
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = CLOSED_CANONICAL
K6-R5 = CLOSED_CANONICAL
K6 BOUNDED CLOSEOUT = NOT_AUTHORIZED
```

R1-R5 preserve their exact bounded, caller-materialized, deterministic contracts. Their canonical completion does **not** authorize:

- provider/model/reviewer/evaluator/tool/agent invocation;
- route/fallback/retry execution;
- candidate eligibility by R5 or strategy execution;
- persistence, telemetry, training, or learning;
- automatic strategy promotion or trust-policy mutation;
- cross-repository aggregation;
- autofix;
- K2 side-effect authority expansion;
- K5 or Done Gate / `PROVEN_READY` authority transfer;
- general KodacBench or broad superiority claims.

Exact K6 authorization records include:

- `docs/planning/KODAC_K6_R1_MODEL_PROVIDER_ROUTE_ELIGIBILITY_AUTHORIZATION_2026-08-26.md`
- `docs/planning/KODAC_K6_R2_DETERMINISTIC_ROUTE_PLAN_AUTHORIZATION_2026-08-26.md`
- `docs/planning/KODAC_K6_R3_ROUTE_OUTCOME_LINKAGE_AUTHORIZATION_2026-08-26.md`
- `docs/planning/KODAC_K6_R4_PRIVACY_GOVERNED_OUTCOME_MEMORY_AUTHORIZATION_2026-08-26.md`
- `docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_REPLACEMENT_AUTHORIZATION_2026-08-27.md`
- `docs/planning/KODAC_K6_R5_BOUNDED_STRATEGY_PROPOSAL_AND_QUALIFICATION_AUTHORIZATION_2026-08-27.md`
- `docs/planning/KODAC_K6_R5_TRUSTED_QUALIFICATION_RULESET_OBSERVABILITY_REPAIR_AUTHORIZATION_2026-08-27.md`
- `docs/planning/KODAC_K6_R5_STAGE_B_SPLIT_PROOF_PIN_AMENDMENT_AUTHORIZATION_2026-08-27.md`

R5-specific qualification evidence remains distinct from general KodacBench:

```text
K6-R5 BOUNDED QUALIFICATION CORPUS != GENERAL KODACBENCH
```

## Next milestone unit

After this roadmap reconciliation is canonical and post-merge proven, the next eligible action is **K6 bounded closeout authorization-candidate preparation only**.

A separate closeout record must prove the bounded R1-R5 surface and preserve all non-grants. It must bind the exact canonical slice identities and post-merge evidence, retain material repair/anomaly history, prove that no execution/persistence/learning/promotion/trust-policy/completion authority emerged by composition, and carry its own exact scope, CI/review/ruleset/merge/post-merge gates.

K6 is not closed by this milestone ledger. P2 KodacBench remains fail-closed until the separate K6 bounded closeout record becomes canonical and post-merge proven.

## Ordered later milestones

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