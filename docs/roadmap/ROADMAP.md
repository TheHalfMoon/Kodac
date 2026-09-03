# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, successor or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs and exact canonical authorization/evidence records always win.

## Canonical truth anchors

```text
K6 bounded closeout        = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout        = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3 bounded R1-R5 closeout  = PR #270 / 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
P3-R17 implementation      = PR #310 / 598808fb611721fd8163b79c36676eded457ba91
P3-R17 reconciliation      = PR #311 / b1ab1a16067e7d8a2bc720ccba475c6556d0525c
P3 R1-R17 closeout auth    = PR #312 / 7686adfd4cf5a21a2c658e6c211d9c0509b730c8
P3 R1-R17 closeout         = PR #313 / 3772003d026488ab274883934d4a14a8e47a4185 / proof 5530355917
P3 post-closeout recon auth= PR #314 / bbe5ef4f7046a5775519d62cf1e969e96cb05dee / proof 5530633976
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
R16: #305 authorization -> #307 implementation -> #308 reconciliation
R17: #309 authorization -> #310 implementation -> #311 reconciliation
R1-R17 bounded closeout: #312 authorization -> #313 closeout / CLOSED_CANONICAL
Post-closeout current-view reconciliation: #314 authorization -> CURRENT FIVE-PATH CANDIDATE
```

Closed-unmerged/superseded candidates are not authority. Material examples include #254, #259, #292 and #306. R8 H4 recovery #279/#280 remains recovery history, not a new R8 semantic slice.

## Current milestone state

| Milestone / gate | Current state | Authority boundary |
| --- | --- | --- |
| K0/K1 | **CLOSED** | Historical foundation |
| K2 | **CLOSED** | Trusted side-effect execution boundary remains unchanged |
| K3 | **CLOSED for canonical K3-R1 through K3-R6 bounded scope** | K3-R7+ not authorized |
| KRI-R1 through KRI-R4 | **CANONICAL / COMPLETE** | KRI-R5+ not authorized |
| K4 | **CLOSED for canonical K4-R1 through K4-R5 bounded data-only scope** | K4-R6+ not authorized |
| K5 | **CLOSED for canonical K5-R1 through K5-R5 bounded proof-review scope** | Done Gate unchanged |
| K6 bounded closeout | **CLOSED_CANONICAL** | No later authority by composition |
| P2-R1 through P2-R5 | **CLOSED_CANONICAL** | Deterministic bounded measurement/evidence spine |
| P2 overall | **OPEN** | General/public KodacBench is not closed |
| P2-R6+ | **NOT_AUTHORIZED** | Separate authority required |
| P3-R1 through P3-R17 | **CLOSED_CANONICAL individually** | Bounded deterministic context/evidence mechanisms only |
| P3 bounded R1-R17 engineering scope | **CLOSED_CANONICAL** | PR #313 / `3772003d026488ab274883934d4a14a8e47a4185` / proof `5530355917` |
| P3 post-closeout current-view reconciliation | **CURRENT FIVE-PATH CANDIDATE / NOT YET CANONICAL** | Authorized by PR #314 / proof `5530633976`; must separately qualify, merge and pass post-merge proof |
| P3 overall | **OPEN** | No repository-owned aggregate, ranking/promotion/default, statistical qualification, real benchmark execution or public quality claim established |
| P3-R18+ | **NOT_AUTHORIZED** | No later slice implied by numbering |
| P4-P8 | **NOT_AUTHORIZED** | Ordered dependencies and separate authority required |
| Project completion | **NOT_ESTABLISHED** | No project-completion proof exists |

Engineering milestone state is separate from public release status.

## Bounded P3 R1-R17 meaning

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
R11 = deterministic binding of exactly seven explicit P2-R3-compatible reduction policies without reducer execution
R12 = deterministic application of those policies to the exact trusted observations, emitting per-dimension REDUCED or INSUFFICIENT_EVIDENCE
R13 = deterministic binding of explicit HIGHER_IS_BETTER | LOWER_IS_BETTER per-dimension directions
R14 = deterministic controlled comparison of exactly two independently reconstructed R13 records, emitting COMPARABLE | INSUFFICIENT_EVIDENCE and raw unnormalized left-minus-right deltas only when comparable
R15 = deterministic closed-vocabulary direction-aware relation per trusted R14 dimension
R16 = deterministic match of trusted R15 relations against explicit caller-owned allowed-relation criteria
R17 = deterministic bounded qualification of trusted R16 criterion-match evidence against canonical R4 provenance on the same benchmark/protocol/task-family/policy/two-case substrate using caller-owned provenance criteria
```

These remain evidence mechanisms, not repository decisions:

```text
CALLER POLICY / CRITERIA != REPOSITORY POLICY
PAIRWISE / DIRECTIONAL EVIDENCE != GLOBAL SUPERIORITY
LITERAL PROVENANCE != HOLDOUT SUFFICIENCY / UNBIASEDNESS / CONTAMINATION FREEDOM
EXACTLY TWO CASES != GENERAL / UNBOUNDED COMPOSITION
R17 SUBSTRATE MATCH != SAME EXACT EARLY/LATE COMPARISON CONTEXT
P3 R1-R17 CLOSED != P3 OVERALL CLOSED
P3 R1-R17 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P3 R1-R17 CLOSED != P3-R18+ AUTHORITY
P3 R1-R17 CLOSED != P4 AUTHORITY
P3 R1-R17 CLOSED != PROJECT COMPLETION
```

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1-R17 bounded mechanisms [INDIVIDUALLY CLOSED_CANONICAL]
   -> bounded R1-R17 engineering closeout [CLOSED_CANONICAL / #313]
   -> post-closeout five-current-view reconciliation [CURRENT AUTHORIZED CANDIDATE]
   -> fresh successor analysis [ONLY AFTER RECONCILIATION IS CANONICAL + POST-MERGE PROVEN]
   -> P3-R18+ implementation [NOT_AUTHORIZED]
-> P4 Reviewer Intelligence v2 [NOT_AUTHORIZED]
-> P5 Finding Verifier Fabric [NOT_AUTHORIZED]
-> P6 Security Validation [NOT_AUTHORIZED]
-> P7 Bounded Autofix [NOT_AUTHORIZED]
-> P8 Product / Distribution Hardening [NOT_AUTHORIZED]
```

## Current reconciliation scope

Exactly five paths are authorized by canonical PR #314 post-merge proof `5530633976`:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path may change. The candidate must prove exact five-path containment, `behind_by=0`, frozen five-blob identity, applicable Governance/K2 checks or canonical non-applicability, two independent substantive terminal-clean semantic channels, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact expected head and complete post-merge proof.

The reconciliation changes only current views. It does not reopen or mutate the canonical #313 closeout evidence or any R1-R17 mechanism.

## Preserved authority boundaries

```text
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK / PARTICIPANT EXECUTION = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3 OVERALL = OPEN
P3-R18+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED
GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR VERDICT = NOT_AUTHORIZED
CROSS-DIMENSION AGGREGATE SCORE / WEIGHTING / MAJORITY / PARETO POLICY = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
MULTI-STRATEGY RANKING / LEADERBOARD / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER = NOT_AUTHORIZED
HOLDOUT SUFFICIENCY / UNBIASEDNESS / CONTAMINATION-FREE CLAIM = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

## Next boundary

Only after the current five-path reconciliation becomes canonical and post-merge proven may fresh evidence-driven successor analysis identify another unit. No successor is inferred from sequence alone.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```
