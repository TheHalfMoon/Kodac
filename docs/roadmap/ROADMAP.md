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
P2-R3 auth merge   = PR #241 / d398983a457060dff0b700714d3eebbc4dce8e23
P2-R3 impl merge   = PR #242 / 20cb3d2e277513fc3cefa71fe9fda03f25fd418a
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
| P2-R3 | Explicit reducer policy + task-family summary spine | **CLOSED_CANONICAL** | Pure in-memory aggregation only; no comparison authority by composition |
| P2-R4 | Controlled pairwise comparison | **AUTHORIZATION CANDIDATE** | Pure in-memory controlled raw-delta comparison only if this gate becomes canonical |
| P2-R5+ | Later KodacBench slices | **NOT_AUTHORIZED** | Broader comparison, ranking, statistics, execution, promotion, or claims require separate exact authority |
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
- reproducible deterministic contract/report/summary/comparison identities;
- controlled fair-comparison dimensions where comparison is authorized;
- exact strategy/evaluator/model/provider identities only where a later authorized slice actually invokes them;
- no universal blended `best` score or unsupported product-level superiority claim.

### P2-R1 — closed canonical

PR #238 established hardened canonical JSON identity semantics, frozen repository-authored synthetic development and holdout fixtures, chronology/provenance/contamination contracts, exact case/corpus/holdout/result identities, and task-family-separated metric declarations.

P2-R1 did not execute providers/models/evaluators and did not define aggregation or comparison policy.

### P2-R2 — closed canonical

PR #240 established a deterministic local runner/report layer over caller-materialized observations with strict R1 identity binding, explicit missing/unavailable state, task-family separation, completeness counts, and immutable report identity.

P2-R2 intentionally did not define reducers, directionality, thresholds, comparison, rankings, winner semantics, external execution, product integration, persistence, learning, or public claims.

### P2-R3 — closed canonical

PR #242 merged the qualified P2-R3 implementation to canonical `main` at:

```text
20cb3d2e277513fc3cefa71fe9fda03f25fd418a
```

Closure proof binds:

```text
QUALIFIED_FINAL_HEAD = 6e1b6aa27591e997cbe164fd335e8bee08b11f1c
QUALIFIED_FINAL_TREE = 3d040c6ae4b56573d55eb3b8dbecad3e79bdfdc3
MERGE_PARENT_1 = d398983a457060dff0b700714d3eebbc4dce8e23
MERGE_PARENT_2 = 6e1b6aa27591e997cbe164fd335e8bee08b11f1c
POST_MERGE_GOVERNANCE = 33188625032 / SUCCESS
POST_MERGE_K2_RUNTIME = 33188625005 / SUCCESS
MERGE_VERIFICATION = verified / valid
RULESET = 20707483 / active / no bypass
```

The three canonical P2-R3 blobs matched the qualified candidate after merge.

P2-R3 consumes a validated P2-R2 report plus an explicit versioned per-metric policy. It implements only:

```text
VALUE KINDS: NUMBER / BOOLEAN
REDUCERS: ARITHMETIC_MEAN / BOOLEAN_TRUE_RATE
MISSINGNESS: REQUIRE_COMPLETE / OBSERVED_ONLY_WITH_COVERAGE
```

It preserves exact coverage, keeps task families separate, rejects hostile/non-canonical input, derives deterministic identities, and exposes no directionality, threshold, comparison, ranking, winner, promotion, external execution, product, persistence, release, or public claim semantics.

### P2-R4 — current authorization candidate

The next proposed P2 slice closes only one narrow comparison gap deliberately left open by R3:

```text
P2-R4 = CONTROLLED PAIRWISE COMPARISON OF ALREADY-MATERIALIZED R2/R3 EVIDENCE
P2-R4 IMPLEMENTATION = AUTHORIZED ONLY AFTER ITS EXACT AUTHORIZATION RECORD BECOMES CANONICAL
P2-R5+ = NOT AUTHORIZED
```

Candidate authority:

- `docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_AUTHORIZATION_2026-08-28.md`

If canonical, that record authorizes exactly one pure in-memory implementation PR limited to:

```text
packages/kodac-runtime/bench/p2-r4/**
packages/kodac-runtime/test/p2-r4-*.test.ts
docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_EVIDENCE_2026-08-28.md
```

The proposed R4 layer would consume two caller-materialized P2-R2 reports, their corresponding P2-R3 summaries, one exact shared controlled evaluation context, two bounded subject descriptors, and one explicit versioned per-metric direction policy.

Fair-comparison requirements are deliberately conservative:

1. both R2 reports and both R3 summaries are revalidated as untrusted input;
2. each R3 summary is cross-bound to its corresponding R2 report identity;
3. benchmark ID, protocol, R1 manifest set, task families, cases, R1 result identities, metrics, and units must match exactly;
4. the same identity-bearing model/provider, configuration, repository/task snapshot, environment, network assumptions, budget, attempt policy, allowed tools, prompt policy, and scoring method apply to both sides;
5. only system/version/commit subject identity may intentionally differ in this slice;
6. raw artifact/log-set identities may differ as evidence identities;
7. per-metric direction is explicit `HIGHER_IS_BETTER` or `LOWER_IS_BETTER` and is never inferred;
8. reducer/value-kind/unit/missingness/minimum-count/expected-count semantics must match before a metric can be compared;
9. only dual-`REDUCED` finite evidence produces a finite raw `left - right` delta;
10. insufficient evidence remains explicit with null comparison numbers and exact coverage retained.

R4 keeps task families separate and may not infer or materialize:

- winner/loser/better/worse/tie/superiority verdicts;
- thresholds, target bands, pass/fail, acceptance, or release decisions;
- weighted/blended scores or cross-task normalization;
- N-way comparison, ranking, or leaderboard position;
- Pareto dominance;
- statistical significance, confidence intervals, bootstrap, uncertainty models, or hypothesis tests;
- model/provider/configuration/prompt/environment/budget/tool comparisons;
- promotion or public claims.

No provider/model/reviewer/evaluator/tool invocation, benchmark execution, network, subprocess, persistence, telemetry, dependency, product integration, learning, release, or ruleset authority is included.

## Ordered improvement program

```text
K6 bounded closeout
-> P2 KodacBench
   -> R1 contract + frozen fixture/manifest spine [CLOSED_CANONICAL]
   -> R2 local deterministic runner + immutable report spine [CLOSED_CANONICAL]
   -> R3 explicit reducer policy + task-family summary [CLOSED_CANONICAL]
   -> R4 controlled pairwise comparison [AUTHORIZATION CANDIDATE]
   -> R5+ separate benchmark slices [NOT_AUTHORIZED]
-> P3 Context Engine v2
-> P4 Reviewer Intelligence v2
-> P5 Finding Verifier Fabric
-> P6 Security Validation
-> P7 Bounded Autofix
-> P8 Product / Distribution Hardening
```

P2 itself remains sliced and evidence-gated. Successful R4 would not silently authorize R5, ranking, statistics, external execution, promotion, product integration, or public claims.

## Preserved authority boundaries

```text
K2 SIDE-EFFECT EXECUTION AUTHORITY = UNCHANGED
K5 PROOF EVIDENCE != DONE GATE COMPLETION AUTHORITY
REVIEWER / MODEL OUTPUT = CLAIM / EVIDENCE, NOT COMPLETION TRUTH
K6 ROUTING / OUTCOME / STRATEGY EVIDENCE != EXECUTION AUTHORITY
P2 BENCHMARK EVIDENCE != EXECUTION / PROMOTION / DONE GATE AUTHORITY
PAIRWISE RAW DELTA != WINNER / SUPERIORITY CLAIM
CONTROLLED-CONTEXT IDENTITY != EXTERNAL PROVENANCE TRUTH
P2-R5+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
NEW DEPENDENCIES / CODE IMPORT = NOT AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR INVOCATION = NOT AUTHORIZED
BENCHMARK TASK EXECUTION = NOT AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT AUTHORIZED
N-WAY RANKING / WINNER / STATISTICS / PROMOTION = NOT AUTHORIZED
AUTOFIX EXECUTION = NOT AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE / BRAND LAUNCH = NOT AUTHORIZED
```

## Roadmap rule

A roadmap sentence never substitutes for an exact authorization record. Every new implementation or closeout unit remains fail-closed until its separate canonical authorization, exact-head qualification, guarded merge, and required post-merge proof make that authority effective.
