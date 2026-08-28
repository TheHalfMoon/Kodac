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
| K4 | Ecosystem Compatibility | **CLOSED for canonical K4-R1 through K4-R5 bounded data-only scope** | K4-R6+ not authorized |
| K5 | Proof Review & Judge | **CLOSED for canonical K5-R1 through K5-R5 bounded scope** | Done Gate unchanged |
| K6 | Evidence Router & Outcome Learning | **CLOSED_CANONICAL for bounded R1-R5 scope** | No execution/persistence/learning/promotion authority by composition |
| P2-R1 | KodacBench contract + frozen fixture/manifest spine | **CLOSED_CANONICAL** | Local deterministic contract/data scope only; closure proven by post-merge GitHub objects/checks |
| P2-R2 | Local runner + immutable report spine | **AUTHORIZATION CANDIDATE** | Effective implementation authority only after this exact gate becomes canonical |
| P2-R3+ | Later KodacBench slices | **NOT_AUTHORIZED** | Separate exact authority required |
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
- reproducible deterministic contract/report identities;
- exact strategy/evaluator/model/provider identities where they actually apply;
- no universal blended `best` score or unsupported product-level superiority claim.

### P2-R1 — closed canonical

PR #238 merged P2-R1 at `c499c8ac098cca9719eaad3cacadd2af7d1c0a1f` after exact-head qualification and required post-merge proof.

The committed P2-R1 evidence file is deliberately a historical **candidate-time** artifact:

- `docs/planning/KODAC_P2_R1_BENCHMARK_CONTRACT_FIXTURE_MANIFEST_EVIDENCE_2026-08-28.md`

It was frozen before its own merge and therefore cannot truthfully contain that future merge result. P2-R1 closure is instead bound by the later immutable proof:

```text
QUALIFIED_FINAL_HEAD = f3ab68cc74f391ae460b82a8697c7e319cb4ed3b
QUALIFIED_FINAL_TREE = a01997cffe5848dd91ac12a6639134648bbe2f89
MERGE = PR #238 / c499c8ac098cca9719eaad3cacadd2af7d1c0a1f
POST_MERGE_GOVERNANCE = 33173090203 / SUCCESS
POST_MERGE_K2_RUNTIME = 33173090251 / SUCCESS
MERGE_VERIFICATION = verified / valid
```

The canonical six P2-R1 blobs matched the qualified candidate after merge, and ruleset `20707483` remained active with no bypass. Accordingly, candidate-time wording preserved in the historical evidence file is not a current incompletion claim and does not override the subsequent post-merge proof.

P2-R1 established:

- hardened canonical JSON identity semantics;
- frozen repository-authored synthetic development and holdout fixtures;
- chronology/provenance/contamination contracts;
- exact case/corpus/holdout/result identities;
- task-family-separated metric declarations;
- explicit `not-applicable` identities for uninvoked strategy/evaluator/model/provider/execution dimensions.

P2-R1 did not execute those participants and did not define aggregation/reducer policy.

### P2-R2 — current authorization candidate

The next proposed P2 slice is intentionally narrower than a general benchmark executor:

```text
P2-R2 = LOCAL DETERMINISTIC RUNNER + IMMUTABLE REPORT SPINE
P2-R2 IMPLEMENTATION = AUTHORIZED ONLY AFTER ITS EXACT AUTHORIZATION RECORD BECOMES CANONICAL
P2-R3+ = NOT AUTHORIZED
```

Candidate authority:

- `docs/planning/KODAC_P2_R2_LOCAL_RUNNER_REPORT_AUTHORIZATION_2026-08-28.md`

If canonical, that record authorizes exactly one pure in-memory implementation PR limited to:

```text
packages/kodac-runtime/bench/p2-r2/**
packages/kodac-runtime/test/p2-r2-*.test.ts
docs/planning/KODAC_P2_R2_LOCAL_RUNNER_REPORT_EVIDENCE_2026-08-28.md
```

The R2 runner would consume validated R1 values plus caller-materialized metric observations, bind each observation to exact R1 case/result/metric/unit identity, fail closed on malformed or hostile structures, deterministically order evidence, preserve explicit missing observations, produce completeness counts, and derive one immutable report identity.

R2 may not infer averages, reducers, weighting, normalization, thresholds, global rankings, universal scores, winner/superiority semantics, or external execution authority. No provider/model/reviewer/evaluator/tool/network/subprocess/persistence/product integration is included.

## Ordered improvement program

```text
K6 bounded closeout
-> P2 KodacBench
   -> R1 contract + frozen fixture/manifest spine [CLOSED_CANONICAL]
   -> R2 local deterministic runner + immutable report spine [AUTHORIZATION CANDIDATE]
   -> R3+ separate benchmark slices [NOT AUTHORIZED]
-> P3 Context Engine v2
-> P4 Reviewer Intelligence v2
-> P5 Finding Verifier Fabric
-> P6 Security Validation
-> P7 Bounded Autofix
-> P8 Product / Distribution Hardening
```

P2 itself remains sliced and evidence-gated. Successful R2 would not silently authorize R3.

## Preserved authority boundaries

```text
K2 SIDE-EFFECT EXECUTION AUTHORITY = UNCHANGED
K5 PROOF EVIDENCE != DONE GATE COMPLETION AUTHORITY
REVIEWER / MODEL OUTPUT = CLAIM / EVIDENCE, NOT COMPLETION TRUTH
K6 ROUTING / OUTCOME / STRATEGY EVIDENCE != EXECUTION AUTHORITY
P2 BENCHMARK EVIDENCE != EXECUTION / PROMOTION / DONE GATE AUTHORITY
P2-R3+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
NEW DEPENDENCIES / CODE IMPORT = NOT AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR INVOCATION = NOT AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT AUTHORIZED
AUTOFIX EXECUTION = NOT AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE / BRAND LAUNCH = NOT AUTHORIZED
```

## Roadmap rule

A roadmap sentence never substitutes for an exact authorization record. Every new implementation or closeout unit remains fail-closed until its separate canonical authorization, exact-head qualification, guarded merge, and required post-merge proof make that authority effective.
