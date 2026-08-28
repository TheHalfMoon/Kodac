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
| P2-R1 | **CLOSED_CANONICAL** | Contract + frozen development/holdout fixture/manifest spine |
| P2-R2 | **CLOSED_CANONICAL** | Local deterministic caller-observation runner + immutable report spine |
| P2-R3 | **AUTHORIZATION CANDIDATE** | Explicit per-metric reducer policy + deterministic task-family summaries only |
| P2-R4+ | **NOT_AUTHORIZED** | Comparison, ranking, external execution, or later slices require separate exact authority |
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
P2-R2 auth merge   = PR #239 / f2b8d452e93ec207ebe04c9db7d47dc032df20de
P2-R2 impl merge   = PR #240 / 4a0b2c67dbd707c18395b0898752c111ca6b16a9
Improvement plan   = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

Always re-read live protected `main`; these identities are evidence anchors, not future merge preconditions.

## P2-R1 — CLOSED_CANONICAL

P2-R1 established deterministic canonical identities, frozen local development/holdout fixtures, chronology/provenance/contamination semantics, and task-family-separated metric declarations. It did not authorize external execution, evaluator semantics, aggregation, ranking, product integration, persistence, telemetry, or public claims.

## P2-R2 — CLOSED_CANONICAL

P2-R2 closed for its exact bounded local runner/report scope through PR #240 after exact-head qualification, two distinct independent external semantic terminal-clean reviews, guarded merge, and required post-merge proof.

```text
QUALIFIED_HEAD = 46f455c21e294d92d2976d4398a26ffdf3f82c96
QUALIFIED_TREE = d7957e6030a723efbdddc174651fe4da313ff84d
MERGE = 4a0b2c67dbd707c18395b0898752c111ca6b16a9
POST_MERGE_GOVERNANCE = 33180522055 / SUCCESS
POST_MERGE_K2_RUNTIME = 33180522073 / SUCCESS
MERGE_VERIFICATION = verified / valid
```

The canonical three P2-R2 blobs matched the qualified candidate after merge, and ruleset `20707483` remained active with no bypass.

P2-R2 produces deterministic, immutable task-family-separated case/metric observation reports with explicit missing/unavailable state. It deliberately does not define reducer, threshold, direction, comparison, ranking, winner, external execution, product, persistence, learning, or release semantics.

## P2-R3 — authorization candidate

The next bounded KodacBench gate is:

```text
P2-R3 = EXPLICIT REDUCER POLICY + TASK-FAMILY SUMMARY SPINE
P2-R3 IMPLEMENTATION = AUTHORIZED ONLY AFTER THE EXACT P2-R3 AUTHORIZATION RECORD IS CANONICAL
P2-R4+ = NOT AUTHORIZED
P2 = OPEN
```

Candidate authority:

- `docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_AUTHORIZATION_2026-08-28.md`

If canonical, the record authorizes only a pure in-memory summary layer limited to explicit per-metric policy. The closed reducer vocabulary is `ARITHMETIC_MEAN` and `BOOLEAN_TRUE_RATE`; reducers are never inferred. Missingness must use `REQUIRE_COMPLETE` or `OBSERVED_ONLY_WITH_COVERAGE`, preserving expected/observed/missing/unavailable counts.

R3 must keep task families separate and may not define directionality, thresholds, weighted/blended scores, cross-task normalization, system/report comparison, Pareto dominance, statistical significance, ranking, leaderboard, `best`, `winner`, `superior`, promotion, or public claims.

The proposed implementation remains pure/in-memory and denies provider/model/reviewer/evaluator/tool execution, network/secrets, subprocesses/sandboxes, new dependencies, product/CLI integration, P2-R1/P2-R2 mutation, persistence/file output, telemetry, learning, promotion, Done Gate expansion, release, and ruleset bypass.

Until this exact five-path authorization candidate qualifies, merges normally into protected `main`, and passes required post-merge proof, there is no effective P2-R3 implementation authority.

## Durable sequence

```text
K6 bounded closeout
-> P2 KodacBench
   -> R1 contract + frozen fixture/manifest spine [CLOSED_CANONICAL]
   -> R2 local deterministic runner + immutable report spine [CLOSED_CANONICAL]
   -> R3 explicit reducer policy + task-family summary [AUTHORIZATION CANDIDATE]
   -> R4+ separately authorized later slices
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
