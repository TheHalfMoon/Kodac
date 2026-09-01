# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records always win.

## Canonical truth anchors

```text
K6 bounded closeout       = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout       = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3 bounded R1-R5 closeout = PR #270 / 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
P3-R10 reconciliation    = PR #287 / f9636474877c142dc8849094c1856f5b1a92cf6f
P3-R11 authorization     = PR #288 / cb2362c4e0cdf651b949fe851575a123d77a9d32
P3-R11 implementation    = PR #289 / 0842ed7dac95bad879cc55d720ba5646ae021f24
Improvement master plan  = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

Canonical P3 ledger:

```text
R1: #251 authorization -> #252 implementation -> #253 reconciliation
R2: #255 authorization -> #256 implementation -> #257 reconciliation
R3: #258 authorization -> #260 implementation -> #261 reconciliation
R4: #262 authorization -> #264 implementation -> #265 reconciliation
R5: #266 authorization -> #267 implementation -> #268 reconciliation
R1-R5 bounded closeout: #269 authorization -> #270 closeout
R6: #271 authorization -> #272 implementation -> #273 reconciliation
R7: #274 authorization -> #275 implementation -> #276 reconciliation
R8: #277 authorization -> #278 implementation -> #279/#280 H4 recovery -> #281 reconciliation
R9: #282 authorization -> #283 implementation -> #284 reconciliation
R10: #285 authorization -> #286 implementation -> #287 reconciliation
R11: #288 authorization -> #289 implementation -> current-view reconciliation pending
```

## P3-R11 canonical proof

```text
P3_R10_CURRENT_VIEW_RECONCILIATION_PR = #287
P3_R10_CURRENT_VIEW_RECONCILIATION_MERGE = f9636474877c142dc8849094c1856f5b1a92cf6f
P3_R10_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #287 / 5494419703

P3_R11_AUTHORIZATION_PR = #288
P3_R11_AUTHORIZATION_QUALIFIED_HEAD = 75780d9af8df236a319f4624f5dc74c8b5ea353c
P3_R11_AUTHORIZATION_BLOB = 5bddd4deb1bcda9a5fe60a5b5df9c3ccbd4d019a
P3_R11_AUTHORIZATION_MERGE = cb2362c4e0cdf651b949fe851575a123d77a9d32
P3_R11_AUTHORIZATION_POST_MERGE_PROOF = #288 / 5494754462

P3_R11_QUALIFIED_HEAD = c9db09e80c27610b5f34afbcaee462bd2d9fb613
P3_R11_MERGE = 0842ed7dac95bad879cc55d720ba5646ae021f24
P3_R11_MERGE_TREE = 57725483a8517fc61710016849a524c0ac79fdba
P3_R11_MERGE_VERIFICATION = verified / valid
P3_R11_SEMANTIC_REVIEW = Cubic 5495078519 + CodeRabbit 5495098393
P3_R11_QUALIFICATION_PROOF = #289 / 5495132359
P3_R11_POST_MERGE_GOVERNANCE = 33516950190 / SUCCESS
P3_R11_POST_MERGE_PROVENANCE = 99886253718 / SUCCESS
P3_R11_POST_MERGE_LEGACY_TESTS = 99886254131 / SUCCESS
P3_R11_POST_MERGE_K2 = 33516950175 / SUCCESS
P3_R11_POST_MERGE_UBUNTU = 99886306919 / SUCCESS
P3_R11_POST_MERGE_WINDOWS = 99886306894 / SUCCESS
P3_R11_POST_MERGE_MACOS = 99886306868 / SUCCESS
P3_R11_POST_MERGE_K2_GATE = 99890072448 / SUCCESS
P3_R11_POST_MERGE_PROOF_COMMENT = #289 / 5495387091
P3_R11_RECONCILIATION_BOUNDARY_COMMENT = #289 / 5495390306
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R11 implementation/evidence blobs:

```text
packages/kodac-runtime/bench/p3-r11/contracts.ts = 7e12f871095eaec6855f606aa1e360adcc48f8c7
packages/kodac-runtime/bench/p3-r11/single-strategy-two-case-reduction-policy-binding.ts = f2ecbefb9638aa6867a388b827d75dbdba6b1cc6
packages/kodac-runtime/test/p3-r11-single-strategy-two-case-reduction-policy-binding.test.ts = 91c0c459e8acab4a64f213e474394a27bdb0c676
docs/planning/KODAC_P3_R11_TWO_CASE_REDUCTION_POLICY_BINDING_EVIDENCE_2026-09-01.md = a47b31c44a1504dba0cac42f73d6dab5136ddfcb
```

The historical P3-R8 K2 run `33439529693` remains failed evidence; later H4 recovery does not rewrite that history.

## Current milestone state

| Milestone / gate | Current state | Authority boundary |
| --- | --- | --- |
| K0/K1 | **CLOSED** | Historical completed foundation |
| K2 | **CLOSED** | Trusted side-effect execution boundary remains unchanged |
| K3 | **CLOSED for canonical K3-R1 through K3-R6 bounded scope** | K3-R7+ not authorized |
| KRI-R1 through KRI-R4 | **CANONICAL / COMPLETE** | KRI-R5+ not authorized |
| K4 | **CLOSED for canonical K4-R1 through K4-R5 bounded data-only scope** | K4-R6+ not authorized |
| K5 | **CLOSED for canonical K5-R1 through K5-R5 bounded proof-review scope** | Done Gate unchanged |
| K6 | **CLOSED_CANONICAL for bounded R1-R5 scope** | No later authority by composition |
| P2-R1 through P2-R5 | **CLOSED_CANONICAL** | Deterministic bounded measurement/evidence spine |
| P2 overall | **OPEN** | General/public KodacBench is not closed |
| P2-R6+ | **NOT_AUTHORIZED** | Separate justified authorization required |
| P3-R1 through P3-R11 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms only |
| P3-R11 | **CLOSED_CANONICAL** | Exactly-two-case reduction-policy binding evidence only; no reducer execution |
| P3-R11 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / CANDIDATE** | Exactly five current-view files |
| P3 overall | **OPEN** | No repository default/promotion, real benchmark execution, aggregate scoring, or public quality claim established |
| P3-R12+ | **NOT_AUTHORIZED** | No later slice is implied by numbering |
| P4-P8 | **NOT_AUTHORIZED** | Ordered dependencies and separate authority required |

Engineering milestone state is separate from public release status.

## Bounded P3 R1-R11 result

```text
R1 = deterministic context-selection-plan foundation
R2 = deterministic caller-declared policy application
R3 = pairwise seven-metric evidence binding / comparability-only state
R4 = literal benchmark-provenance evidence binding
R5 = caller-declared criterion-match evidence
R6 = deterministic materialization of seven P2-R2-compatible observations from one reconstructed policy application plus explicit caller evaluation facts
R7 = deterministic binding of one reconstructed R6 measurement to one fully covered single-case P2-R2 report
R8 = deterministic case-invariant strategy-subject identity plus one exact single-case binding to canonical P3-R1/P3-R2 identities
R9 = deterministic ordered composition of exactly two independently reconstructed R7 reports under one exact R8 strategy subject
R10 = deterministic proof that the two canonical R9 members use the same metricId and unit for each canonical P3-R6 dimension while preserving both observations without reduction
R11 = deterministic binding of exactly seven explicit P2-R3-compatible reduction policies to that exact aligned pair, validating benchmark/protocol/value-kind continuity without executing a reducer
```

These remain evidence mechanisms, not repository decisions:

```text
R11 CLOSED_CANONICAL != P3 OVERALL CLOSED
R11 CLOSED_CANONICAL != GENERAL / PUBLIC KODACBENCH COMPLETE
R11 CLOSED_CANONICAL != REAL BENCHMARK PARTICIPANT EXECUTION
R11 CLOSED_CANONICAL != REDUCER EXECUTION / MEAN / TRUE-RATE
R11 CLOSED_CANONICAL != REDUCED / INSUFFICIENT_EVIDENCE SUMMARY MATERIALIZATION
R11 CLOSED_CANONICAL != DIRECTION / DELTA / BETTER-WORSE SEMANTICS
R11 CLOSED_CANONICAL != MULTI-STRATEGY COMPARISON / RANKING / PROMOTION
R11 CLOSED_CANONICAL != REPOSITORY DEFAULT / WINNER
R11 CLOSED_CANONICAL != PRODUCT / RELEASE / PACKAGE READY
R11 CLOSED_CANONICAL != P3-R12+ AUTHORITY
R11 CLOSED_CANONICAL != P4 AUTHORITY
```

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1-R11 bounded mechanisms [CLOSED_CANONICAL]
   -> R11 current-view roadmap/status reconciliation [CURRENT DOCS-ONLY UNIT]
   -> later bounded P3 definition / planning / authorization-candidate work [ONLY IF A CONCRETE GAP IS PROVEN]
   -> P3-R12+ implementation [NOT_AUTHORIZED]
-> P4 Reviewer Intelligence v2 [NOT_AUTHORIZED]
-> P5 Finding Verifier Fabric [NOT_AUTHORIZED]
-> P6 Security Validation [NOT_AUTHORIZED]
-> P7 Bounded Autofix [NOT_AUTHORIZED]
-> P8 Product / Distribution Hardening [NOT_AUTHORIZED]
```

## Current reconciliation scope

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path belongs to this current-view reconciliation. No runtime source/test, historical authorization/evidence, workflow, dependency, lockfile, benchmark corpus/fixture/manifest, product/release surface, provider/model, persistence, telemetry, or ruleset path may change.

The reconciliation remains a candidate until one frozen exact head proves exact five-path containment, `behind_by=0`, applicable Governance/K2 checks, two distinct independent substantive terminal-clean semantic review channels, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact expected head, and complete post-merge proof.

## Next P3 planning boundary

Only after the R11 current-view reconciliation becomes canonical and post-merge proven may another bounded P3 definition/planning/authorization candidate be considered.

No `P3-R12` requirement is inferred from sequence alone. A later candidate requires a concrete canonical gap plus reproducible evidence compatible with existing invariants. Current internal evidence may support investigating bounded two-case reduction evidence using canonical P2-R3 semantics, but that is a hypothesis only. Direction/delta/comparison/ranking/promotion remain a separate later layer.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

## Preserved authority boundaries

```text
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3 OVERALL = OPEN
P3-R12+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
REDUCER EXECUTION = NOT_AUTHORIZED
DIRECTION / DELTA / BETTER-WORSE = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```
