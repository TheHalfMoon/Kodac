# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It reports canonical and conditional-candidate state; it does not create implementation authority.

Before any repository mutation:

1. re-read live GitHub truth;
2. read root `AGENTS.md`;
3. read `docs/roadmap/NEXT.md`;
4. read the governing ADRs and the exact canonical authorization record for the active unit;
5. execute only that unit and its explicit allowlist.

Historical authorization/evidence records remain historical evidence. Candidate wording never substitutes for exact qualification, merge, and post-merge proof.

## Canonical truth anchors

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

## Current engineering milestone state on this candidate

| Milestone / gate | Theme | Current state | Authority boundary |
| --- | --- | --- | --- |
| K0/K1 | Foundation | **CLOSED** | Historical completed milestone |
| K2 | Trusted Runtime Spine | **CLOSED** | K2 remains trusted side-effect execution boundary |
| K3 | Repository Intelligence & Context Engine | **CLOSED for canonical K3-R1 through K3-R6 bounded scope** | K3-R7+ not required / not authorized |
| KRI-R1 through KRI-R4 | Bounded Reviewer Intelligence | **CANONICAL / COMPLETE** | KRI-R5+ not authorized |
| K4 | Ecosystem Compatibility | **CLOSED for canonical K4-R1 through K4-R5 bounded data-only scope** | K4-R6+ not required / not authorized |
| K5 | Proof Review & Judge | **CLOSED for canonical K5-R1 through K5-R5 bounded scope** | Done Gate unchanged |
| K6 | Evidence Router & Outcome Learning | **CLOSED_CANONICAL for bounded R1-R5 scope** | No execution/persistence/learning/promotion authority by composition |
| P2-R1 | KodacBench contract + frozen fixture/manifest spine | **CLOSED_CANONICAL** | Local deterministic contract/data scope only |
| P2-R2 | Local runner + immutable report spine | **CLOSED_CANONICAL** | Pure in-memory observation/report scope only |
| P2-R3 | Explicit reducer policy + task-family summary spine | **AUTHORIZATION CANDIDATE** | Effective implementation authority only after this exact gate becomes canonical |
| P2-R4+ | Later KodacBench slices | **NOT_AUTHORIZED** | Comparison/ranking/external execution requires separate exact authority |
| P3-P8 | Later improvement stages | **NOT_AUTHORIZED** | Each needs dependencies and separate canonical authority |

Engineering milestone status is separate from public product release status.

## K6 — bounded closeout is canonical

K6-R1 through K6-R5 are closed-canonical for the bounded evidence/value scope. K6 remains evidence infrastructure rather than side-effect, persistence, learning, promotion, Done Gate, or release authority.

## P2 KodacBench

P2 is required before broad evidence-backed comparisons or superiority claims for later P3-P8 work. The benchmark direction follows ADR-0010 and the intelligence improvement master plan:

- frozen identity-bound corpus material;
- separately identified holdout material whose `later-in-time` classification requires proven strict ordering under a comparable chronology scheme;
- task-family-separated metrics;
- provenance and contamination state;
- reproducible deterministic contract/report/summary identities;
- exact strategy/evaluator/model/provider identities only where a later authorized slice actually invokes them;
- no universal blended `best` score or unsupported product-level superiority claim.

### P2-R1 — closed canonical

PR #238 merged P2-R1 at `c499c8ac098cca9719eaad3cacadd2af7d1c0a1f` after exact-head qualification and required post-merge proof.

P2-R1 established hardened canonical JSON identity semantics, frozen repository-authored synthetic development and holdout fixtures, chronology/provenance/contamination contracts, exact case/corpus/holdout/result identities, and task-family-separated metric declarations.

P2-R1 did not execute providers/models/evaluators and did not define aggregation/reducer policy.

### P2-R2 — closed canonical

PR #240 merged the qualified P2-R2 implementation to canonical `main` at:

```text
4a0b2c67dbd707c18395b0898752c111ca6b16a9
```

Closure proof binds:

```text
QUALIFIED_FINAL_HEAD = 46f455c21e294d92d2976d4398a26ffdf3f82c96
QUALIFIED_FINAL_TREE = d7957e6030a723efbdddc174651fe4da313ff84d
MERGE_PARENT_1 = f2b8d452e93ec207ebe04c9db7d47dc032df20de
MERGE_PARENT_2 = 46f455c21e294d92d2976d4398a26ffdf3f82c96
POST_MERGE_GOVERNANCE = 33180522055 / SUCCESS
POST_MERGE_K2_RUNTIME = 33180522073 / SUCCESS
MERGE_VERIFICATION = verified / valid
```

The three canonical P2-R2 blobs matched the qualified candidate after merge and ruleset `20707483` remained active with no bypass.

P2-R2 established a deterministic local runner/report layer over caller-materialized observations with strict R1 identity binding, explicit missing/unavailable state, task-family separation, completeness counts, and immutable report identity.

P2-R2 intentionally did not define reducers, directionality, thresholds, comparison, rankings, winner semantics, external execution, product integration, persistence, learning, or public claims.

### P2-R3 — current authorization candidate

The next proposed P2 slice closes only the reducer-policy gap left intentionally open by P2-R2:

```text
P2-R3 = EXPLICIT REDUCER POLICY + TASK-FAMILY SUMMARY SPINE
P2-R3 IMPLEMENTATION = AUTHORIZED ONLY AFTER ITS EXACT AUTHORIZATION RECORD BECOMES CANONICAL
P2-R4+ = NOT AUTHORIZED
```

Candidate authority:

- `docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_AUTHORIZATION_2026-08-28.md`

If canonical, that record authorizes exactly one pure in-memory implementation PR limited to:

```text
packages/kodac-runtime/bench/p2-r3/**
packages/kodac-runtime/test/p2-r3-*.test.ts
docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_EVIDENCE_2026-08-28.md
```

The R3 layer would consume a validated R2 report plus an explicit versioned per-metric policy. No reducer is inferred. The closed reducer vocabulary for this slice is:

```text
ARITHMETIC_MEAN
BOOLEAN_TRUE_RATE
```

The closed missingness vocabulary is:

```text
REQUIRE_COMPLETE
OBSERVED_ONLY_WITH_COVERAGE
```

`ARITHMETIC_MEAN` applies only to finite numeric observed values and preserves the input metric unit. `BOOLEAN_TRUE_RATE` applies only to boolean observed values and exposes numerator/denominator with output unit `ratio_0_1`. Missing/unavailable values never silently become zero or false. Incomplete evidence remains visible through exact expected/observed/missing/unavailable counts.

R3 keeps task families separate and may not infer or materialize directionality, thresholds, cross-metric utility, weighted/blended scores, cross-task normalization, comparison between reports/systems/strategies/models/providers/configurations, Pareto dominance, statistical significance, ranking, leaderboard, `best`, `winner`, `superior`, promotion, or public claims.

No provider/model/reviewer/evaluator/tool/network/subprocess/persistence/product integration is included.

## Ordered improvement program

```text
K6 bounded closeout
-> P2 KodacBench
   -> R1 contract + frozen fixture/manifest spine [CLOSED_CANONICAL]
   -> R2 local deterministic runner + immutable report spine [CLOSED_CANONICAL]
   -> R3 explicit reducer policy + task-family summary [AUTHORIZATION CANDIDATE]
   -> R4+ separate benchmark slices [NOT AUTHORIZED]
-> P3 Context Engine v2
-> P4 Reviewer Intelligence v2
-> P5 Finding Verifier Fabric
-> P6 Security Validation
-> P7 Bounded Autofix
-> P8 Product / Distribution Hardening
```

P2 itself remains sliced and evidence-gated. Successful R3 would not silently authorize R4.

## Preserved authority boundaries

```text
K2 SIDE-EFFECT EXECUTION AUTHORITY = UNCHANGED
K5 PROOF EVIDENCE != DONE GATE COMPLETION AUTHORITY
REVIEWER / MODEL OUTPUT = CLAIM / EVIDENCE, NOT COMPLETION TRUTH
K6 ROUTING / OUTCOME / STRATEGY EVIDENCE != EXECUTION AUTHORITY
P2 BENCHMARK EVIDENCE != EXECUTION / PROMOTION / DONE GATE AUTHORITY
P2-R4+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
NEW DEPENDENCIES / CODE IMPORT = NOT AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR INVOCATION = NOT AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT AUTHORIZED
SYSTEM / REPORT COMPARISON = NOT AUTHORIZED
THRESHOLD / DIRECTION / RANKING / WINNER = NOT AUTHORIZED
AUTOFIX EXECUTION = NOT AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE / BRAND LAUNCH = NOT AUTHORIZED
```

## Roadmap rule

A roadmap sentence never substitutes for an exact authorization record. Every new implementation or closeout unit remains fail-closed until its separate canonical authorization, exact-head qualification, guarded merge, and required post-merge proof make that authority effective.
