# Kodac Version Plan

## Purpose

Kodac engineering milestones and public product versions are separate governance tracks.

This file records the current engineering/version boundary. It does not authorize implementation, package publication, release, brand launch, provider/model access, persistence, learning, benchmark execution, donor intake, successor work, or side effects.

Always read live GitHub truth, root `AGENTS.md`, `docs/roadmap/NEXT.md`, governing ADRs, and the exact active authorization before acting.

## Current engineering state

```text
K0/K1 = CLOSED
K2 = CLOSED
K3 = CLOSED FOR CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
KRI-R1 THROUGH KRI-R4 = CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K4 = CLOSED FOR CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K5 = CLOSED FOR CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K6 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
P2-R1 THROUGH P2-R5 = CLOSED_CANONICAL
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ = NOT_AUTHORIZED
P3-R1 THROUGH P3-R17 = CLOSED_CANONICAL
P3-R17 = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R18+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The P3-R17 closure is an engineering evidence milestone only. It creates no public version, release, package, support, compatibility, benchmark-superiority, production-readiness, or brand authority.

## Canonical P3-R17 anchors

```text
P3_R16_CURRENT_VIEW_RECONCILIATION = PR #308 / 4bf4329cdfee3c599071d8eaca253bae8648b6d0
P3_R16_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #308 / 5519926474
P3_R17_SUCCESSOR_ANALYSIS = #308 / 5525126768

P3_R17_AUTHORIZATION = PR #309 / a224a0ad7c7adbf9dd879e1c4ac1ddfaceed6a38
P3_R17_AUTHORIZATION_BLOB = a60fe49be7188789cc9bd1bfb1f1458d76ac58ea
P3_R17_AUTHORIZATION_POST_MERGE_PROOF = #309 / 5525500115

P3_R17_IMPLEMENTATION = PR #310 / 598808fb611721fd8163b79c36676eded457ba91
P3_R17_QUALIFIED_HEAD = d93204f2bbc619d39f29bb13eccc2e680cb8fbd1
P3_R17_QUALIFIED_TREE = 68e58b5aaab0cfd7fefebc2618d0aef47e351c99
P3_R17_MERGE_TREE = 68e58b5aaab0cfd7fefebc2618d0aef47e351c99
P3_R17_MERGE_VERIFICATION = verified / valid
P3_R17_SEMANTIC_REVIEW = CodeRabbit 5527057254 + Cubic 5527076985
P3_R17_UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
P3_R17_POST_MERGE_GOVERNANCE = 33765617586 / SUCCESS
P3_R17_POST_MERGE_K2 = 33765617553 / SUCCESS
P3_R17_POST_MERGE_PROOF_COMMENT = #310 / 5527154469
P3_R17_RECONCILIATION_BOUNDARY_COMMENT = #310 / 5527216910
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R17 blobs:

```text
packages/kodac-runtime/bench/p3-r17/contracts.ts = f425199ba3c1f097a7b1b12bea4c125c46592f95
packages/kodac-runtime/bench/p3-r17/late-chain-benchmark-provenance-substrate-qualification.ts = 150f4db6e438b3c35a06f2089c321f759073c207
packages/kodac-runtime/test/p3-r17-late-chain-benchmark-provenance-substrate-qualification.test.ts = 82139f2f12cf5a05f4e6b6f88a3ca5d8a22705f5
docs/planning/KODAC_P3_R17_LATE_CHAIN_BENCHMARK_PROVENANCE_SUBSTRATE_QUALIFICATION_EVIDENCE_2026-09-03.md = 14b5d7539043b67d037d3cbd4ec26da7a951f86d
```

## P3-R17 is not a release milestone

P3-R17 provides only a pure deterministic bounded substrate-qualification evidence boundary:

```text
EXACT SIX-ARGUMENT PUBLIC BUILDER
-> CANONICAL P3-R16 AS SOLE TRUSTED LATE-CHAIN RELATION-CRITERION TRUTH
-> CANONICAL P3-R4 AS SOLE TRUSTED BENCHMARK-PROVENANCE TRUTH
-> SAME-BUNDLE P3-R3 RECONSTRUCTION ONLY FOR IDENTITY / POLICY-ORIENTATION SUPPORT
-> BENCHMARK / PROTOCOL / CONTEXT-SELECTION TASK-FAMILY BINDING
-> LEFT / RIGHT POLICY-ORIENTATION BINDING
-> EXACTLY TWO DISTINCT (caseId, r1ResultIdentity) TUPLES
-> LITERAL CALLER-OWNED CORPUS-ROLE / CHRONOLOGY / CONTAMINATION CRITERIA
-> CLOSED ROOT STATE WITH R16 INSUFFICIENCY PRECEDENCE
-> DETERMINISTIC SELF-REFERENCE-FREE IDENTITY
-> DETACHED / DEEPLY FROZEN OUTPUT
-> NO EARLY/LATE EXACT-COMPARISON EQUIVALENCE CLAIM
-> NO NUMERIC AGGREGATE / SCORE / WEIGHTING / MAJORITY / PARETO
-> NO GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR
-> NO RANK / PROMOTION / WINNER / DEFAULT
-> NO STATISTICAL VALIDITY OR REAL BENCHMARK EXECUTION
```

Therefore:

```text
P3-R17 CLOSED_CANONICAL
!= P3 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= SAME EXACT P3-R3 PLAN / REQUEST / SHARED EVALUATION CONTEXT / COMPARISON POLICY AS THE LATE CHAIN
!= SUFFICIENT / REPRESENTATIVE HOLDOUT
!= UNBIASED / UNCONTAMINATED / STATISTICALLY VALID
!= REAL BENCHMARK TASK / PARTICIPANT EXECUTION
!= GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR VERDICT
!= CROSS-DIMENSION SUM / MEAN / WEIGHTED SCORE / MAJORITY / PARETO POLICY
!= STATISTICAL SIGNIFICANCE / CONFIDENCE / EQUIVALENCE
!= MULTI-STRATEGY RANKING / PROMOTION
!= REPOSITORY-OWNED DEFAULT / WINNER
!= REAL PROVIDER / MODEL EXECUTION
!= PRODUCT INTEGRATION COMPLETE
!= PUBLIC RELEASE READY
!= PACKAGE PUBLISHABLE
!= PUBLIC VERSION DECLARED
!= PRODUCTION READY
!= SUPPORT SLA ESTABLISHED
!= COMPATIBILITY PROMISE ESTABLISHED
!= BRAND LAUNCH AUTHORIZED
!= P3-R18+ AUTHORIZED
!= P4 AUTHORIZED
!= PROJECT COMPLETE
```

## Repository visibility versus release authority

```text
PUBLIC GITHUB REPOSITORY = YES
PUBLIC RELEASE VERSION = NOT_AUTHORIZED
PACKAGE PUBLICATION = NOT_AUTHORIZED
RELEASE CHANNEL = NOT_AUTHORIZED
1.0 PROMISE = NOT_ESTABLISHED
SUPPORT / COMPATIBILITY PROMISE = NOT_ESTABLISHED
PRODUCTION-READINESS CLAIM = NOT_AUTHORIZED
PUBLIC BENCHMARK / SUPERIORITY CLAIM = NOT_AUTHORIZED
BRAND LAUNCH = NOT_AUTHORIZED
KODAC NAME / TRADEMARK CLEARANCE = NOT_ESTABLISHED
```

Version numbering, release channels, package publication, installation/upgrade promises, compatibility guarantees, support expectations, benchmark claims, security claims, quality claims, and brand decisions require separate evidence and explicit authority.

## Current roadmap/status reconciliation

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. Canonical P3-R17 post-merge proof `#310 / 5527154469`, the established canonical reconciliation procedure proven by PR #308, and continuation boundary `#310 / 5527216910` identify the R17 documentation-only current-view reconciliation limited to:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

It changes no runtime, historical authorization/evidence, workflow, dependency, donor code, provider/model, benchmark corpus, persistence, release, or ruleset surface. It is a candidate until exact-head qualification or canonical non-applicability of checks, two independent substantive semantic terminal-clean review channels, zero actionable findings/threads, guarded normal merge with exact expected head, and complete post-merge proof.

## Current implementation boundaries relevant to versioning

```text
K3-R7+ = NOT_AUTHORIZED
KRI-R5+ = NOT_AUTHORIZED
K4-R6+ = NOT_AUTHORIZED
K5-R6+ = NOT_AUTHORIZED
K6-R6+ = NOT_AUTHORIZED
P2-R6+ = NOT_AUTHORIZED
P3-R18+ = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

P3-R17 LATE-CHAIN BENCHMARK-PROVENANCE SUBSTRATE QUALIFICATION EVIDENCE = CLOSED_CANONICAL WITHIN ITS EXACT CONTRACT
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED BY THIS FILE
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED BY THIS FILE
GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR VERDICT = NOT_AUTHORIZED BY THIS FILE
CROSS-DIMENSION AGGREGATE SCORE / WEIGHTING / MAJORITY / PARETO POLICY = NOT_AUTHORIZED BY THIS FILE
MULTI-STRATEGY RANKING / PROMOTION = NOT_AUTHORIZED BY THIS FILE
REPOSITORY-OWNED DEFAULT / WINNER = NOT_AUTHORIZED BY THIS FILE
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED BY THIS FILE
NEW KODAC DEPENDENCIES = NOT_AUTHORIZED BY THIS FILE
CODE / DONOR IMPORT = NOT_AUTHORIZED BY THIS FILE
CONCRETE EXTERNAL REVIEWER / MODEL / PROVIDER ADAPTER = NOT_AUTHORIZED BY THIS FILE
PROVIDER NETWORK / SECRET HANDLING = NOT_AUTHORIZED BY THIS FILE
PROVIDER / MODEL / REVIEWER / EVALUATOR INVOCATION = NOT_AUTHORIZED BY THIS FILE
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS FILE
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED BY THIS FILE
PERSISTENT REVIEW / PROOF / ROUTE / BENCHMARK / OUTCOME STORAGE = NOT_AUTHORIZED BY THIS FILE
TELEMETRY / UPLOAD = NOT_AUTHORIZED BY THIS FILE
TRAINING / LEARNING = NOT_AUTHORIZED BY THIS FILE
AUTOMATIC STRATEGY PROMOTION / TRUST-POLICY MUTATION = NOT_AUTHORIZED BY THIS FILE
AUTOFIX EXECUTION = NOT_AUTHORIZED BY THIS FILE
RULESET CHANGE / BYPASS = NOT_AUTHORIZED BY THIS FILE
K2 EXECUTION-AUTHORITY EXPANSION = NOT_AUTHORIZED BY THIS FILE
DONE GATE / PROVEN_READY MODIFICATION = NOT_AUTHORIZED BY THIS FILE
PROJECT COMPLETION = NOT_ESTABLISHED BY THIS FILE
```

## Next engineering boundary

Only after the R17 current-view reconciliation becomes canonical and post-merge proven may later bounded P3 definition/planning/authorization-candidate preparation or bounded P3 closeout work be considered, and only if a concrete canonical gap is proven.

No `P3-R18`, aggregate, ranking, promotion, default, statistical policy, benchmark execution, P4-P8, public release, or project-completion authority is inferred from sequence or R17 closure.

Fresh successor analysis must re-read live `main`, the complete canonical P3-R1 through P3-R17 chain, governing ADRs, review/CI history, the durable improvement plan, and relevant precedent before identifying one falsifiable bounded candidate.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

## Future release-gate direction

A future public-release authorization should separately prove applicable subsets of:

- supported product scope and user-facing surfaces;
- installation, upgrade, and rollback behavior;
- compatibility/versioning contract;
- security and trust posture;
- provenance/license completeness;
- required CI and supported platforms;
- packaging/distribution artifacts;
- benchmark/claim evidence;
- documentation/support expectations;
- brand/name/trademark status.

This is planning direction only, not an authorized release checklist or release decision.

## Navigation

- Current action: `docs/roadmap/NEXT.md`
- P3-R17 authorization: `docs/planning/KODAC_P3_R17_LATE_CHAIN_BENCHMARK_PROVENANCE_QUALIFICATION_AUTHORIZATION_2026-09-03.md`
- P3-R17 evidence: `docs/planning/KODAC_P3_R17_LATE_CHAIN_BENCHMARK_PROVENANCE_SUBSTRATE_QUALIFICATION_EVIDENCE_2026-09-03.md`
- P3-R17 authorization post-merge proof: PR #309 / comment `5525500115`
- P3-R17 implementation post-merge proof: PR #310 / comment `5527154469`
- Reconciliation continuation boundary: PR #310 / comment `5527216910`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
