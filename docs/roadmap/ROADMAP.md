# Kodac Engineering Roadmap

## Authority

This file is a **current engineering roadmap view**. It reports canonical and conditional-candidate state; it does not create implementation authority.

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
K6-R4 final auth   = PR #221 / 93c197cb6f88409dd406694fe4614ecf0fb6ba00
K6-R4 merge        = PR #212 / 7af698feae73f46df06bf6084a7d0d0317d5560a
K6-R4 reconcile    = PR #222 / 1db9fef23df0961d76b1fdd1b0e558fba180cad8
K6-R5 auth         = PR #224 / 31f5f9f3e05dd0feeda2b96b3221374c4bfe0032
K6-R5 merge        = PR #226 / 91d817741d1c55195d26ef8e8f5be98e04d1977d
K6-R5 reconcile    = PR #234 / 74868b75d0e531fdff8255e3827c4ecbce7dc4ac
K6 closeout auth   = PR #235 / 748706683a0102f1743c1797950272bbd41d8a3c
K6 closeout merge  = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
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
| P2-R1 | KodacBench contract + fixture spine | **AUTHORIZATION CANDIDATE** | Effective implementation authority only after this exact gate becomes canonical |
| P2-R2+ | Later KodacBench slices | **NOT_AUTHORIZED** | Separate exact authority required |
| P3-P8 | Later improvement stages | **NOT_AUTHORIZED** | Each needs dependencies and separate canonical authority |

Engineering milestone status is separate from public product release status.

## K6 — bounded closeout is canonical

PR #236 merged the exact bounded closeout candidate at `ed4fb16e8bbaf960812285671062c9b2abf597a8`. Required ordered-parent/tree/blob/signature, applicable post-merge checks, and active ruleset/no-bypass proof were established.

```text
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = CLOSED_CANONICAL
K6-R5 = CLOSED_CANONICAL
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE
K6-R6+ = NOT REQUIRED FOR THIS BOUNDED CLOSEOUT / NOT AUTHORIZED
```

Exact evidence:

- `docs/planning/KODAC_K6_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-28.md`
- `docs/planning/KODAC_K6_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`

K6 still does not authorize provider/model invocation, route execution, durable persistence, telemetry, training, online/cross-repository learning, automatic promotion, K2/K5/Done Gate expansion, autofix, general KodacBench, dependencies, release, or superiority claims.

## P2 KodacBench

P2 is required before broad evidence-backed comparisons or superiority claims for later P3-P8 work. The adopted benchmark direction follows ADR-0010 and the intelligence improvement master plan:

- frozen, identity-bound corpus material;
- separate later-in-time holdout identity;
- task-family-separated metrics;
- provenance and contamination state;
- reproducible deterministic contract/report identities;
- exact benchmark/corpus/strategy/evaluator/model/provider identities where they actually apply;
- no universal blended `best` score or unsupported product-level superiority claim.

### P2-R1 — current authorization candidate

The first proposed P2 slice is intentionally smaller than a general benchmark runner:

```text
P2-R1 = BENCHMARK CONTRACT + FROZEN FIXTURE / MANIFEST SPINE
P2-R1 IMPLEMENTATION = AUTHORIZED ONLY AFTER ITS EXACT AUTHORIZATION RECORD BECOMES CANONICAL
P2-R2+ = NOT AUTHORIZED
```

Candidate authority:

- `docs/planning/KODAC_P2_R1_BENCHMARK_CONTRACT_FIXTURE_MANIFEST_AUTHORIZATION_2026-08-28.md`

If canonical, that record authorizes exactly one local/deterministic implementation PR limited to:

```text
packages/kodac-runtime/bench/p2-r1/**
packages/kodac-runtime/test/p2-r1-*.test.ts
packages/kodac-runtime/test/fixtures/p2-r1/**
docs/planning/KODAC_P2_R1_BENCHMARK_CONTRACT_FIXTURE_MANIFEST_EVIDENCE_2026-08-28.md
```

No runtime product source, workflow, dependency, lockfile, provider/model/reviewer/evaluator adapter, network/secret, persistent storage, telemetry, learning, promotion, or release path is included.

The authorization is not effective while this is only candidate text.

## Ordered improvement program

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

P2 itself remains sliced and evidence-gated; successful P2-R1 does not silently authorize P2-R2.

## Preserved authority boundaries

```text
K2 SIDE-EFFECT EXECUTION AUTHORITY = UNCHANGED
K5 PROOF EVIDENCE != DONE GATE COMPLETION AUTHORITY
REVIEWER / MODEL OUTPUT = CLAIM / EVIDENCE, NOT COMPLETION TRUTH
K6 ROUTING / OUTCOME / STRATEGY EVIDENCE != EXECUTION AUTHORITY
P2 BENCHMARK EVIDENCE != EXECUTION / PROMOTION / DONE GATE AUTHORITY
P2-R2+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
NEW DEPENDENCIES / CODE IMPORT = NOT AUTHORIZED
PROVIDER / MODEL / REVIEWER INVOCATION = NOT AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT AUTHORIZED
AUTOFIX EXECUTION = NOT AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE / BRAND LAUNCH = NOT AUTHORIZED
```

## Roadmap rule

A roadmap sentence never substitutes for an exact authorization record. Every new implementation or closeout unit remains fail-closed until its separate canonical authorization, exact-head qualification, guarded merge, and required post-merge proof make that authority effective.