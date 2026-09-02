# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, successor, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records always win.

## Canonical truth anchors

```text
K6 bounded closeout        = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout        = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3 bounded R1-R5 closeout  = PR #270 / 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
P3-R15 reconciliation      = PR #304 / f6270d62ffcd06cbf780e24d37173d0d575665fe
P3-R16 authorization       = PR #305 / da59d2a46d4eff5c12a60f2057a57d3572ba0e5d
P3-R16 implementation      = PR #307 / 0fb9f47db144619c580c69052aa98d79c4f71dc6
Improvement master plan    = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
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
R11: #288 authorization -> #289 implementation -> #290 reconciliation
R12: #291 authorization -> #293 implementation -> #294 reconciliation
R13: #295 authorization -> #296 implementation -> #297 reconciliation
R14: #298 authorization -> #299 implementation -> #300 reconciliation
R15: #301 authorization -> #302 implementation -> #304 reconciliation
R16: #305 authorization -> #307 implementation -> current-view reconciliation candidate
```

## Canonical P3-R16 proof

```text
P3_R15_CURRENT_VIEW_RECONCILIATION_PR = #304
P3_R15_CURRENT_VIEW_RECONCILIATION_MERGE = f6270d62ffcd06cbf780e24d37173d0d575665fe
P3_R15_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #304 / 5514505520
P3_R16_SUCCESSOR_ANALYSIS = #304 / 5514563852

P3_R16_AUTHORIZATION_PR = #305
P3_R16_AUTHORIZATION_BLOB = 3a931f3c1d733d5540954784d7fb414981c4a8b1
P3_R16_AUTHORIZATION_MERGE = da59d2a46d4eff5c12a60f2057a57d3572ba0e5d
P3_R16_AUTHORIZATION_POST_MERGE_PROOF = #305 / 5514986947

P3_R16_IMPLEMENTATION_PR = #307
P3_R16_QUALIFIED_HEAD = 390f0dd5b26445aa710e37573152e637230fe129
P3_R16_QUALIFIED_TREE = 33420ca4cb95721bb08903fb0e30ef4d0312c45c
P3_R16_SEMANTIC_REVIEW = CodeRabbit 5517148710 + Cubic 5517242418
P3_R16_UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
P3_R16_MERGE = 0fb9f47db144619c580c69052aa98d79c4f71dc6
P3_R16_MERGE_TREE = 33420ca4cb95721bb08903fb0e30ef4d0312c45c
P3_R16_MERGE_VERIFICATION = verified / valid
P3_R16_POST_MERGE_GOVERNANCE = 33690090072 / SUCCESS
P3_R16_POST_MERGE_PROVENANCE = 100446602052 / SUCCESS
P3_R16_POST_MERGE_LEGACY_TESTS = 100446601874 / SUCCESS
P3_R16_POST_MERGE_K2 = 33690090070 / SUCCESS
P3_R16_POST_MERGE_CLASSIFIER = 100446601906 / SUCCESS
P3_R16_POST_MERGE_UBUNTU = 100446638831 / SUCCESS
P3_R16_POST_MERGE_MACOS = 100446638872 / SUCCESS
P3_R16_POST_MERGE_WINDOWS = 100446638917 / SUCCESS
P3_R16_POST_MERGE_K2_GATE = 100447140433 / SUCCESS
P3_R16_POST_MERGE_PROOF = #307 / 5517289297
P3_R16_RECONCILIATION_BOUNDARY = #307 / 5517293280
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R16 blobs:

```text
packages/kodac-runtime/bench/p3-r16/contracts.ts = ab5918caec73d2e6688d982c2774479b916e50b9
packages/kodac-runtime/bench/p3-r16/declared-directional-relation-criterion-match.ts = 47e46dac9f16824d0368218cf1c0b64c2971628d
packages/kodac-runtime/test/p3-r16-declared-directional-relation-criterion-match.test.ts = edcff3f6192b7b8389b6dfabad2c15f3e878d1c6
docs/planning/KODAC_P3_R16_DECLARED_DIRECTIONAL_RELATION_CRITERION_MATCH_EVIDENCE_2026-09-02.md = 15ea09e6db3e0c0734979544bc0e71a621c3916a
```

Historical failures remain historical evidence; later recovery or closure does not erase or relabel them.

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
| P3-R1 through P3-R16 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms only |
| P3-R16 | **CLOSED_CANONICAL** | Caller-declared seven-dimension criterion-match evidence over trusted R15 only |
| P3-R16 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / CANDIDATE** | Exactly five current-view files |
| P3 overall | **OPEN** | No repository-owned aggregate score, ranking/promotion/default, statistical qualification, real benchmark execution, or public quality claim established |
| P3-R17+ | **NOT_AUTHORIZED** | No later slice is implied by numbering |
| P4-P8 | **NOT_AUTHORIZED** | Ordered dependencies and separate authority required |

Engineering milestone state is separate from public release status.

## Bounded P3 R1-R16 result

```text
R1  = deterministic context-selection-plan foundation
R2  = deterministic caller-declared policy application
R3  = pairwise seven-metric evidence binding and comparability-only state
R4  = literal benchmark-provenance evidence binding
R5  = caller-declared criterion-match evidence
R6  = deterministic seven-dimension measurement materialization from one reconstructed policy application plus explicit caller evaluation facts
R7  = deterministic single-case binding of reconstructed R6 measurement evidence to one generated P2-R2 report
R8  = deterministic case-invariant strategy-subject identity plus exact single-case binding to canonical P3-R1/P3-R2 identities
R9  = deterministic ordered composition of exactly two independently reconstructed R7 reports under one exact R8 strategy subject
R10 = deterministic seven-dimension metric/unit alignment evidence for the two R9 members without arithmetic or directional semantics
R11 = deterministic binding of exactly seven explicit P2-R3-compatible reduction policies to the aligned pair without reducer execution
R12 = deterministic application of those exact policies to the exact trusted observations, emitting per-dimension REDUCED or INSUFFICIENT_EVIDENCE
R13 = deterministic binding of exactly seven explicit HIGHER_IS_BETTER | LOWER_IS_BETTER directions while preserving complete trusted R12 evidence
R14 = deterministic controlled comparison of exactly two independently reconstructed R13 records under identical corresponding controls, emitting per-dimension COMPARABLE | INSUFFICIENT_EVIDENCE and raw unnormalized left-minus-right deltas when comparable
R15 = deterministic interpretation of each trusted R14 dimension under its already-bound direction into LEFT_FAVORED_BY_DIRECTION | RIGHT_FAVORED_BY_DIRECTION | EQUAL_RAW_VALUE | INSUFFICIENT_EVIDENCE while preserving complete trusted R14 evidence
R16 = deterministic membership of each trusted R15 relation against one explicit caller-owned ordered allowed-relations set, preserving complete trusted R15 evidence and deriving only per-dimension criterion states plus one closed logical root criteria state
```

These remain evidence mechanisms, not repository decisions:

```text
CALLER-DECLARED R16 CRITERIA != REPOSITORY POLICY
ALL_DECLARED_RELATION_CRITERIA_SATISFIED != GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR
ALL_DECLARED_RELATION_CRITERIA_SATISFIED != PROMOTION / RECOMMENDATION / WINNER / DEFAULT
PER-DIMENSION CRITERION MATCH != CROSS-DIMENSION NUMERIC AGGREGATE SCORE
R16 != STATISTICAL / PROVENANCE QUALIFICATION
R16 != REAL BENCHMARK EXECUTION
P3 R1-R16 CLOSED != P3 OVERALL CLOSED
P3 R1-R16 CLOSED != P3-R17+ AUTHORITY
P3 R1-R16 CLOSED != P4 AUTHORITY
```

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1-R16 bounded mechanisms [CLOSED_CANONICAL]
   -> R16 current-view roadmap/status reconciliation [CURRENT DOCS-ONLY UNIT]
   -> fresh successor analysis [ONLY AFTER RECONCILIATION CLOSES]
   -> later bounded P3 definition / authorization-candidate work [ONLY IF A CONCRETE GAP IS PROVEN]
   -> P3-R17+ implementation [NOT_AUTHORIZED]
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

No sixth path belongs to this current-view reconciliation. No runtime source/test, historical authorization/evidence, workflow, dependency, lockfile, benchmark corpus/fixture/manifest, donor code, provider/model, persistence, telemetry, release configuration, or ruleset path may change.

The reconciliation remains a candidate until one frozen exact head proves exact five-path containment, `behind_by=0`, applicable Governance/K2 checks, two distinct independent substantive terminal-clean semantic review channels, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact expected head, and complete post-merge proof.

## Next P3 planning boundary

Only after the R16 current-view reconciliation becomes canonical and post-merge proven may another bounded P3 definition/planning/authorization candidate be considered.

No `P3-R17`, cross-dimension aggregate, ranking, promotion, winner/default, statistical policy, benchmark execution, P4-P8, or project-completion requirement is inferred from sequence alone. A later candidate requires a concrete canonical gap plus reproducible evidence compatible with all established invariants.

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
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED
GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR VERDICT = NOT_AUTHORIZED
CROSS-DIMENSION AGGREGATE SCORE / WEIGHTING / MAJORITY / PARETO POLICY = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
MULTI-STRATEGY RANKING / LEADERBOARD / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER = NOT_AUTHORIZED
P3-R17+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
