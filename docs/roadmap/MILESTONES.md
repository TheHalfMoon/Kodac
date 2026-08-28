# Kodac Engineering Milestones

## Authority

This file is the concise **current engineering milestone ledger**. It reports canonical or conditional-candidate state; it does not itself authorize implementation, release, provider/model access, persistence, learning, dependencies, or side effects.

Execution authority comes only from the exact canonical authorization record for the active unit after live GitHub truth, root `AGENTS.md`, and `docs/roadmap/NEXT.md` have been read.

Historical authorization/evidence records remain historical evidence. Candidate wording is not canonical authority until its own merge and post-merge proof pass.

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
| K6-R1 through K6-R5 | **CLOSED_CANONICAL individually** | Exact bounded data/evidence contracts only |
| K6 bounded closeout | **CLOSED_CANONICAL** | Closed via PR #236 / `ed4fb16e8bbaf960812285671062c9b2abf597a8` for R1-R5 bounded scope only |
| P2-R1 | **AUTHORIZATION CANDIDATE** | Contract + frozen fixture/manifest spine; implementation authority effective only after this candidate is canonical |
| P2-R2+ | **NOT_AUTHORIZED** | Separate exact authority required |
| P3-P8 | **NOT_AUTHORIZED** | Later stages require dependencies and separate authority |

## Canonical anchors

```text
K5 closeout       = PR #201 / 06a6e33ca78bc4d0bd68449292161e1e4dc96385
K6 planning       = PR #202 / 2f167794a375bc913c377746419acf3bcc5ee0ab
K6-R1 merge       = PR #204 / 7bc163b9ec0d5d451950542f1feb15e444fbdc6c
K6-R2 merge       = PR #206 / 90c00cfc01cb874c08b4f7bde1469ccb298b5648
K6-R3 merge       = PR #208 / 4ed9bed6fdb23643c722298adfba4ae8e72097b2
K6-R4 merge       = PR #212 / 7af698feae73f46df06bf6084a7d0d0317d5560a
K6-R4 reconcile   = PR #222 / 1db9fef23df0961d76b1fdd1b0e558fba180cad8
K6-R5 merge       = PR #226 / 91d817741d1c55195d26ef8e8f5be98e04d1977d
K6-R5 reconcile   = PR #234 / 74868b75d0e531fdff8255e3827c4ecbce7dc4ac
K6 closeout auth  = PR #235 / 748706683a0102f1743c1797950272bbd41d8a3c
K6 closeout merge = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
Improvement plan  = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

Always re-read live protected `main`; these identities are evidence anchors, not future merge preconditions.

## K6 — CLOSED_CANONICAL

K6-R1 through K6-R5 are separately closed-canonical, and the bounded milestone closeout is now canonically merged and post-merge proven.

```text
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = CLOSED_CANONICAL
K6-R5 = CLOSED_CANONICAL
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE
K6-R6+ = NOT REQUIRED FOR THIS BOUNDED CLOSEOUT / NOT AUTHORIZED
```

Canonical closeout evidence:

- `docs/planning/KODAC_K6_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-28.md`
- `docs/planning/KODAC_K6_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`

K6 remains evidence/value infrastructure, not a new side-effect, persistence, learning, promotion, proof-completion, or release authority.

## P2-R1 — authorization candidate

The next eligible unit after K6 closeout is a narrow KodacBench gate:

```text
P2-R1 = BENCHMARK CONTRACT + FROZEN FIXTURE / MANIFEST SPINE
P2-R1 IMPLEMENTATION = AUTHORIZED ONLY AFTER THE EXACT P2-R1 AUTHORIZATION RECORD IS CANONICAL
P2-R2+ = NOT AUTHORIZED
P2 = OPEN
```

Candidate authority:

- `docs/planning/KODAC_P2_R1_BENCHMARK_CONTRACT_FIXTURE_MANIFEST_AUTHORIZATION_2026-08-28.md`

The proposed R1 implementation is local/deterministic only and denies provider/model/reviewer/evaluator invocation, network/secrets, new dependencies, product-runtime changes, persistence/telemetry/learning, broad benchmark execution, universal blended scores, and public superiority claims.

Until this authorization candidate itself qualifies, merges normally into protected `main`, and passes required post-merge proof, there is no effective P2-R1 implementation authority.

## Durable sequence

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

P2-R1 does not collapse the remainder of P2 into one authorization. Every later slice requires its own canonical dependency and authority.

## Public-release separation

```text
ENGINEERING MILESTONE CLOSED
!= PACKAGE PUBLISHABLE
!= PUBLIC VERSION DECLARED
!= PRODUCTION-READINESS CLAIM
!= SUPPORT / COMPATIBILITY PROMISE
!= PRODUCT SUPERIORITY CLAIM
!= BRAND LAUNCH AUTHORIZED
```

No public release, package publication, version declaration, support promise, compatibility claim, superiority claim, or brand launch is authorized by this milestone ledger.