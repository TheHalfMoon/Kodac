# Kodac Engineering Roadmap

## Authority

This file is a **current engineering roadmap view**. It reports canonical and conditional-candidate state; it does not create implementation authority.

Before any repository mutation:

1. re-read live GitHub truth;
2. read root `AGENTS.md`;
3. read `docs/roadmap/NEXT.md`;
4. read the governing ADRs and the exact canonical authorization record for the active unit;
5. execute only that unit and its explicit allowlist.

Historical authorization/evidence records remain historical evidence. Candidate wording never substitutes for its exact qualification, merge, and post-merge proof.

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
K6-R5 repair auth  = PR #227 / 06f2dc2df5eb432107313932a16079edc4912a38
K6-R5 pin auth     = PR #232 / 2d4393fd08329507385fe06d90c3ddedff77bad9
K6-R5 Unit B       = PR #233 / 99aa00db6265b33ebffb2a7653e23a8db4b70c31
K6-R5 merge        = PR #226 / 91d817741d1c55195d26ef8e8f5be98e04d1977d
K6-R5 reconcile    = PR #234 / 74868b75d0e531fdff8255e3827c4ecbce7dc4ac
K6 closeout auth   = PR #235 / 748706683a0102f1743c1797950272bbd41d8a3c
Improvement plan   = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

Always re-read live protected `main`; these identities are evidence anchors, not future merge preconditions.

## Current engineering milestone state on this candidate

| Milestone / gate | Theme | Current state | Authority boundary |
| --- | --- | --- | --- |
| K0/K1 | Foundation | **CLOSED** | Historical completed milestone |
| K2 | Trusted Runtime Spine | **CLOSED** | K2 remains trusted side-effect execution boundary |
| K3 | Repository Intelligence & Context Engine | **CLOSED for canonical K3-R1 through K3-R6 bounded scope** | K3-R7+ not required / not authorized |
| KRI-P0 | Reviewer Intelligence planning | **CANONICAL PLANNING AUTHORITY** | Planning only |
| KRI-R1 through KRI-R4 | Bounded Reviewer Intelligence | **CANONICAL / COMPLETE** | KRI-R5+ not authorized |
| K4 | Ecosystem Compatibility | **CLOSED for canonical K4-R1 through K4-R5 bounded data-only scope** | K4-R6+ not authorized |
| K5 | Proof Review & Judge | **CLOSED for canonical K5-R1 through K5-R5 bounded scope** | Done Gate unchanged |
| K6-R1 through K6-R5 | Evidence Router & Outcome Learning slices | **CLOSED_CANONICAL individually** | Exact bounded data/evidence contracts only |
| K6 bounded closeout | Engineering milestone closeout | **CONDITIONAL CANDIDATE** | Closes only after exact merge/post-merge proof |
| P2 KodacBench | General measurement spine | **NOT_AUTHORIZED** | Authorization-candidate preparation only after canonical K6 closeout |
| P3-P8 | Later improvement stages | **NOT_AUTHORIZED** | Each needs dependencies and separate canonical authority |

Engineering milestone status is separate from public product release status.

## K6 — bounded closeout candidate

K6-R1 through K6-R5 are separately closed-canonical. The bounded closeout authorization became canonical through PR #235. This roadmap candidate therefore expresses only the conditional milestone result:

```text
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = CLOSED_CANONICAL
K6-R5 = CLOSED_CANONICAL
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE IFF THIS CLOSEOUT MERGE GATE PASSES
K6-R6+ = NOT REQUIRED FOR THIS BOUNDED CLOSEOUT / NOT AUTHORIZED
```

The exact evidence and conditions are in:

- `docs/planning/KODAC_K6_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-28.md`
- `docs/planning/KODAC_K6_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`

### Bounded R1-R5 contract

K6 remains an evidence/value layer, not a new effect or completion authority:

```text
R1 = deterministic caller-materialized model/provider eligibility
R2 = deterministic caller-explicit route-plan materialization
R3 = deterministic caller-materialized route/outcome evidence linkage
R4 = privacy-governed caller-managed in-process outcome-memory lifecycle
R5 = deterministic immutable strategy proposal/comparison over one bounded R5-specific qualification population
```

Composition preserves these distinctions:

```text
ELIGIBILITY EVIDENCE != EXECUTION AUTHORITY
ELIGIBLE != SELECTED
ROUTE PLAN != ROUTE EXECUTION
OUTCOME LINKAGE != DONE GATE EVALUATION
OUTCOME MEMORY != DURABLE PERSISTENCE AUTHORITY
STRATEGY PROPOSAL != STRATEGY EXECUTION
STRATEGY COMPARISON != PROMOTION
CANDIDATE_DOMINATES != PROVEN_READY
R5-SPECIFIC QUALIFICATION CORPUS != GENERAL KODACBENCH
SELF-IMPROVING != SELF-AUTHORIZING
```

The canonical closeout evidence retains material fix-forward history rather than presenting K6 as a clean first attempt. PR #223 and PRs #229-#231 remain closed-unmerged non-authority history.

### Preserved K6 non-grants

Neither the separately canonical slices nor this closeout candidate authorize:

- provider/model/reviewer/evaluator/tool/agent invocation;
- route/fallback/retry/strategy execution;
- automatic routing advancement or strategy promotion;
- durable persistence, telemetry, upload, training, online learning, or cross-repository learning;
- trust-policy mutation;
- K2 side-effect authority expansion;
- K5 proof-authority expansion;
- Done Gate modification or `PROVEN_READY` transfer;
- repository-write/review/approval/merge authority from K6;
- autofix;
- new dependencies, donor source intake, provider adapters, network/secrets;
- general KodacBench implementation or public superiority claims;
- ruleset mutation/bypass;
- public release, package publication, support promise, compatibility promise, or brand launch.

## Ordered improvement program

The adopted durable sequence remains:

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

After and only after this K6 closeout candidate is canonical and post-merge proven, the next eligible action is **P2 KodacBench authorization-candidate preparation only**. That later authorization candidate still does not implement KodacBench unless and until its own separate canonical authority becomes effective.

The durable sequence is controlled by `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`. Research rationale remains in `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`.

## Preserved authority boundaries

```text
K2 SIDE-EFFECT EXECUTION AUTHORITY = UNCHANGED
K5 PROOF EVIDENCE != DONE GATE COMPLETION AUTHORITY
REVIEWER / MODEL OUTPUT = CLAIM / EVIDENCE, NOT COMPLETION TRUTH
K6 ROUTING / OUTCOME / STRATEGY EVIDENCE != EXECUTION AUTHORITY
K6-R4 CLOSED SCOPE != DURABLE PERSISTENCE / LEARNING / PROMOTION AUTHORITY
K6-R5 CLOSED SCOPE != EXECUTION / ELIGIBILITY / PROMOTION / GENERAL BENCHMARK AUTHORITY
P2 KODACBENCH IMPLEMENTATION = NOT AUTHORIZED BY K6 CLOSEOUT
NEW DEPENDENCIES / CODE IMPORT = NOT AUTHORIZED BY THIS ROADMAP
PROVIDER / MODEL / REVIEWER INVOCATION = NOT AUTHORIZED BY THIS ROADMAP
PERSISTENCE / TELEMETRY / LEARNING = NOT AUTHORIZED BY THIS ROADMAP
AUTOFIX EXECUTION = NOT AUTHORIZED BY THIS ROADMAP
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT AUTHORIZED BY THIS ROADMAP
```

## Roadmap rule

A roadmap sentence never substitutes for an exact authorization record. Every new implementation or closeout unit remains fail-closed until its separate canonical authorization, exact-head qualification, guarded merge, and required post-merge proof make that authority effective.