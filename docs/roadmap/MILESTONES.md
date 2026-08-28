# Kodac Engineering Milestones

## Authority

This file is the concise current engineering milestone ledger. It reports canonical or conditional-candidate state; it does not itself authorize implementation, release, provider/model access, persistence, learning, dependencies, or side effects.

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
| K6 bounded closeout | **CLOSED_CANONICAL** | PR #236 / `ed4fb16e8bbaf960812285671062c9b2abf597a8` |
| P2-R1 | **CLOSED_CANONICAL** | Contract + frozen development/holdout fixture/manifest spine via PR #238 and external post-merge proof |
| P2-R2 | **AUTHORIZATION CANDIDATE** | Local deterministic caller-observation runner + immutable report spine |
| P2-R3+ | **NOT_AUTHORIZED** | Separate exact authority required |
| P3-P8 | **NOT_AUTHORIZED** | Later stages require dependencies and separate authority |

## Canonical anchors

```text
K5 closeout        = PR #201 / 06a6e33ca78bc4d0bd68449292161e1e4dc96385
K6 planning        = PR #202 / 2f167794a375bc913c377746419acf3bcc5ee0ab
K6-R1 merge        = PR #204 / 7bc163b9ec0d5d451950542f1feb15e444fbdc6c
K6-R2 merge        = PR #206 / 90c00cfc01cb874c08b4f7bde1469ccb298b5648
K6-R3 merge        = PR #208 / 4ed9bed6fdb23643c722298adfba4ae8e72097b2
K6-R4 merge        = PR #212 / 7af698feae73f46df06bf6084a7d0d0317d5560a
K6-R5 merge        = PR #226 / 91d817741d1c55195d26ef8e8f5be98e04d1977d
K6 closeout merge  = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2-R1 auth merge   = PR #237 / 1cd2fc4de1eb5849cbe2519ae1699bc2acc56397
P2-R1 impl merge   = PR #238 / c499c8ac098cca9719eaad3cacadd2af7d1c0a1f
Improvement plan   = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

Always re-read live protected `main`; these identities are evidence anchors, not future merge preconditions.

## P2-R1 — CLOSED_CANONICAL

P2-R1 is closed for its exact bounded scope after PR #238 merged the qualified implementation head and the required later GitHub post-merge proof succeeded.

```text
P2-R1 = BENCHMARK CONTRACT + FROZEN FIXTURE / MANIFEST SPINE
P2-R1 = CLOSED_CANONICAL
GENERAL KODACBENCH = OPEN
```

Evidence is intentionally layered rather than retroactively rewriting the historical candidate file:

- candidate-time implementation evidence record: `docs/planning/KODAC_P2_R1_BENCHMARK_CONTRACT_FIXTURE_MANIFEST_EVIDENCE_2026-08-28.md`;
- qualified exact head: `f3ab68cc74f391ae460b82a8697c7e319cb4ed3b`;
- qualified tree: `a01997cffe5848dd91ac12a6639134648bbe2f89`;
- canonical merge: PR #238 / `c499c8ac098cca9719eaad3cacadd2af7d1c0a1f`;
- post-merge governance run `33173090203` / SUCCESS;
- post-merge K2 runtime run `33173090251` / SUCCESS;
- merge verification: verified / valid;
- canonical six-path blob equality and active no-bypass ruleset were re-proven after merge.

The evidence record's candidate-time wording is historical by design: the record was frozen before the merge whose result it could not truthfully predict or recursively encode. Current closure truth comes from the subsequent immutable GitHub object/check proof above.

P2-R1 established deterministic canonical identities, frozen local development/holdout fixtures, chronology/provenance/contamination semantics, and task-family-separated metric declarations. It did not authorize external execution, evaluator semantics, aggregation, ranking, product integration, persistence, telemetry, or public claims.

## P2-R2 — authorization candidate

The next bounded KodacBench gate is:

```text
P2-R2 = LOCAL DETERMINISTIC RUNNER + IMMUTABLE REPORT SPINE
P2-R2 IMPLEMENTATION = AUTHORIZED ONLY AFTER THE EXACT P2-R2 AUTHORIZATION RECORD IS CANONICAL
P2-R3+ = NOT AUTHORIZED
P2 = OPEN
```

Candidate authority:

- `docs/planning/KODAC_P2_R2_LOCAL_RUNNER_REPORT_AUTHORIZATION_2026-08-28.md`

The proposed R2 slice accepts only caller-materialized in-memory observations, strictly binds them to validated P2-R1 case/result/metric identities, keeps task-family results separate, produces deterministic completeness metadata, and derives an immutable report identity.

Because P2-R1 does not define reducer/threshold policy, P2-R2 may not invent means, weighting, normalization, pass/fail thresholds, rankings, or universal `best`/`winner` semantics.

The proposed implementation remains pure/in-memory and denies provider/model/reviewer/evaluator/tool execution, network/secrets, subprocesses/sandboxes, new dependencies, product/CLI integration, P2-R1 mutation, persistence/file output, telemetry, learning, promotion, Done Gate expansion, release, and superiority claims.

Until this five-path authorization candidate qualifies, merges normally into protected `main`, and passes required post-merge proof, there is no effective P2-R2 implementation authority.

## Durable sequence

```text
K6 bounded closeout
-> P2 KodacBench
   -> R1 contract + frozen fixture/manifest spine [CLOSED_CANONICAL]
   -> R2 local deterministic runner + immutable report spine [AUTHORIZATION CANDIDATE]
   -> R3+ separately authorized later slices
-> P3 Context Engine v2
-> P4 Reviewer Intelligence v2
-> P5 Finding Verifier Fabric
-> P6 Security Validation
-> P7 Bounded Autofix
-> P8 Product / Distribution Hardening
```

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
