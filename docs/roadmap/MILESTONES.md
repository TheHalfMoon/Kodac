# Kodac Engineering Milestones

## Authority

This file is the concise **current engineering milestone ledger**. It reports canonical or conditional-candidate state; it does not itself authorize implementation, release, provider/model access, persistence, learning, dependencies, or side effects.

Execution authority comes only from the exact canonical authorization record for the active unit after live GitHub truth, root `AGENTS.md`, and `docs/roadmap/NEXT.md` have been read.

Historical authorization/evidence records remain historical evidence. Candidate wording is not canonical closure until its own merge and post-merge proof pass.

## Current milestone ledger on this candidate

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
| K6 bounded closeout | **CONDITIONAL CANDIDATE** | K6 closes only if this exact closeout head, merge, and post-merge gate pass |
| P2 KodacBench | **NOT_AUTHORIZED** | Authorization-candidate preparation becomes eligible only after canonical K6 closeout |
| P3-P8 | **NOT_AUTHORIZED** | Later stages require dependencies and separate authority |

## Canonical anchors

```text
K5 closeout       = PR #201 / 06a6e33ca78bc4d0bd68449292161e1e4dc96385
K6 planning       = PR #202 / 2f167794a375bc913c377746419acf3bcc5ee0ab
K6-R1 merge       = PR #204 / 7bc163b9ec0d5d451950542f1feb15e444fbdc6c
K6-R2 merge       = PR #206 / 90c00cfc01cb874c08b4f7bde1469ccb298b5648
K6-R3 merge       = PR #208 / 4ed9bed6fdb23643c722298adfba4ae8e72097b2
K6-R4 auth root   = PR #211 / 1e8c193ca0aeeb77b56ad1c75d9d7db0ca82b372
K6-R4 final auth  = PR #221 / 93c197cb6f88409dd406694fe4614ecf0fb6ba00
K6-R4 merge       = PR #212 / 7af698feae73f46df06bf6084a7d0d0317d5560a
K6-R4 reconcile   = PR #222 / 1db9fef23df0961d76b1fdd1b0e558fba180cad8
K6-R5 auth        = PR #224 / 31f5f9f3e05dd0feeda2b96b3221374c4bfe0032
K6-R5 Stage A     = PR #225 / 76f8639a329d9f168fea9d71f78711d612075619
K6-R5 repair auth = PR #227 / 06f2dc2df5eb432107313932a16079edc4912a38
K6-R5 trust repair= PR #228 / 0c151b3db8ab1487c5fcf1553060b4743ede155d
K6-R5 pin auth    = PR #232 / 2d4393fd08329507385fe06d90c3ddedff77bad9
K6-R5 Unit B      = PR #233 / 99aa00db6265b33ebffb2a7653e23a8db4b70c31
K6-R5 merge       = PR #226 / 91d817741d1c55195d26ef8e8f5be98e04d1977d
K6-R5 reconcile   = PR #234 / 74868b75d0e531fdff8255e3827c4ecbce7dc4ac
K6 closeout auth  = PR #235 / 748706683a0102f1743c1797950272bbd41d8a3c
Improvement plan  = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

These are evidence anchors, not future merge preconditions. Always re-read live protected `main`.

## K5 — CLOSED

```text
K5 = CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K5-R1 THROUGH K5-R5 = CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K5-R6+ = NOT REQUIRED FOR K5 CLOSEOUT / NOT AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
```

Canonical evidence: `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md`.

## K6 — conditional bounded closeout candidate

R1-R5 are already separately canonical. The bounded closeout authorization is canonical through PR #235. This candidate conditionally closes the milestone only if its exact merge gate and post-merge proof succeed.

```text
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = CLOSED_CANONICAL
K6-R5 = CLOSED_CANONICAL
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE IFF THIS CLOSEOUT MERGE GATE PASSES
K6-R6+ = NOT REQUIRED FOR THIS BOUNDED CLOSEOUT / NOT AUTHORIZED
```

The exact closeout evidence is:

- `docs/planning/KODAC_K6_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-28.md`
- `docs/planning/KODAC_K6_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`

R1-R5 preserve their exact bounded deterministic contracts. Composition does not authorize:

- provider/model/reviewer/evaluator/tool/agent invocation;
- route/fallback/retry/strategy execution;
- persistent storage, telemetry, upload, training, or learning;
- cross-repository aggregation or learning;
- automatic strategy promotion or trust-policy mutation;
- K2 side-effect authority expansion;
- K5 or Done Gate / `PROVEN_READY` authority transfer;
- autofix;
- general KodacBench or broad superiority claims.

```text
ELIGIBILITY EVIDENCE != EXECUTION AUTHORITY
ROUTE PLAN != ROUTE EXECUTION
OUTCOME LINKAGE != DONE GATE EVALUATION
OUTCOME MEMORY != DURABLE PERSISTENCE AUTHORITY
STRATEGY COMPARISON != PROMOTION
R5 DOMINANCE RESULT != PROVEN_READY
K6-R5 BOUNDED QUALIFICATION CORPUS != GENERAL KODACBENCH
SELF-IMPROVING != SELF-AUTHORIZING
```

Material fix-forward history remains part of K6 evidence: R1 canonicalization hardening; R3 qualification repairs; R4 trusted-machine, registration, protected-base, provider-neutrality and resource-budget repairs; R5 comparability, ruleset-observability, split-proof, hostile-input and import-closure repairs. PR #223 and PRs #229-#231 remain closed-unmerged non-authority history.

## Next milestone unit

After and only after this exact K6 closeout candidate becomes canonical and its post-merge proof succeeds, the next eligible repository unit is:

```text
P2 KODACBENCH AUTHORIZATION-CANDIDATE PREPARATION ONLY
P2 KODACBENCH IMPLEMENTATION = NOT AUTHORIZED
```

The durable sequence remains:

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

The durable program sequencing is controlled by `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`. The current execution front door is `docs/roadmap/NEXT.md`.

## Public-release separation

```text
ENGINEERING MILESTONE CLOSED
!= PACKAGE PUBLISHABLE
!= PUBLIC VERSION DECLARED
!= PRODUCTION-READINESS CLAIM
!= SUPPORT / COMPATIBILITY PROMISE
!= BRAND LAUNCH AUTHORIZED
```

No public release, package publication, version declaration, support promise, compatibility claim, or brand launch is authorized by this milestone ledger.