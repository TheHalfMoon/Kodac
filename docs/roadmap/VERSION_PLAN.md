# Kodac Version Plan

## Purpose

Kodac engineering milestones and public product versions are separate governance tracks.

This file records the current engineering/version boundary. It does not authorize implementation, package publication, release, brand launch, provider/model access, persistence, learning, benchmark execution, donor intake, or side effects.

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
P3-R1 THROUGH P3-R13 = CLOSED_CANONICAL
P3-R13 = CLOSED_CANONICAL
P3 OVERALL = OPEN
PAIRWISE STRATEGY COMPARISON = NOT_AUTHORIZED
P3-R14+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

The P3-R13 closure is an engineering evidence milestone only. It creates no public version, release, package, support, compatibility, benchmark-superiority, production-readiness, or brand authority.

## Canonical P3-R13 anchors

```text
P3_R12_RECONCILIATION = PR #294 / ad0c3e1236c546c005c7f688f991ecbc9ed64fa5
P3_R12_RECONCILIATION_POST_MERGE_PROOF = #294 / 5498358794

P3_R13_AUTHORIZATION = PR #295 / 2a67a91c6d5eef829872823f5fa6441f7a644d67
P3_R13_AUTHORIZATION_BLOB = bc6b039cab6dbc3a570cedafe2b8f226634aa767
P3_R13_AUTHORIZATION_POST_MERGE_PROOF = #295 / 5498626758

P3_R13_IMPLEMENTATION = PR #296 / 931c750681494895da046f4ba9c8406d77fcfddf
P3_R13_QUALIFIED_HEAD = 74d07c3ad64fb5b9d7a2dd17e357260a7120489b
P3_R13_QUALIFIED_TREE = db206d23e70cb1dda9daeda37922264ce2dfd5bf
P3_R13_MERGE_TREE = db206d23e70cb1dda9daeda37922264ce2dfd5bf
P3_R13_MERGE_VERIFICATION = verified / valid
P3_R13_SEMANTIC_REVIEW = CodeRabbit 5499263271 + Cubic 5499299358
P3_R13_QUALIFICATION_PROOF = #296 / 5499762716
P3_R13_POST_MERGE_GOVERNANCE = 33553663264 / SUCCESS
P3_R13_POST_MERGE_PROVENANCE = 100009119493 / SUCCESS
P3_R13_POST_MERGE_LEGACY_TESTS = 100009119739 / SUCCESS
P3_R13_POST_MERGE_K2 = 33553663263 / SUCCESS
P3_R13_POST_MERGE_CLASSIFIER = 100009119554 / SUCCESS
P3_R13_POST_MERGE_WINDOWS = 100009155408 / SUCCESS
P3_R13_POST_MERGE_UBUNTU = 100009155427 / SUCCESS
P3_R13_POST_MERGE_MACOS = 100009155455 / SUCCESS
P3_R13_POST_MERGE_K2_GATE = 100009519605 / SUCCESS
P3_R13_POST_MERGE_PROOF_COMMENT = #296 / 5499792485
P3_R13_RECONCILIATION_BOUNDARY_COMMENT = #296 / 5499834265
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R13 blobs:

```text
packages/kodac-runtime/bench/p3-r13/contracts.ts = d712d90c734ce946c7e91f15da074adfa63e338a
packages/kodac-runtime/bench/p3-r13/reduction-direction-binding.ts = 0b752c5e8d47056004a0ca0aaad15c871dd089c9
packages/kodac-runtime/test/p3-r13-reduction-direction-binding.test.ts = 2b49db209341e8fb3923fdb8319da7174bbb543a
docs/planning/KODAC_P3_R13_REDUCTION_DIRECTION_BINDING_EVIDENCE_2026-09-01.md = 5cd4b59b9c2cabe00806388358acb6be286c9883
```

## P3-R13 is not a release milestone

P3-R13 provides only a pure deterministic local direction-binding boundary:

```text
ONE FRESHLY RECONSTRUCTED CANONICAL P3-R12 REDUCTION RECORD
+ EXACTLY SEVEN CANONICAL DIMENSIONS
+ ONE EXPLICIT CALLER-DECLARED DIRECTION PER DIMENSION
-> HIGHER_IS_BETTER | LOWER_IS_BETTER ONLY
-> EXACT CROSS-BINDING TO TRUSTED R12 METRIC / UNIT / VALUE-KIND / REDUCER / MISSINGNESS / COVERAGE SEMANTICS
-> COMPLETE TRUSTED R12 PRESERVATION
-> ONE DETERMINISTIC DEEPLY FROZEN DIRECTION-BINDING EVIDENCE IDENTITY
-> NO RAW DELTA
-> NO PAIRWISE STRATEGY COMPARISON
-> NO FAVORED / BETTER / WORSE VERDICT
-> NO CROSS-DIMENSION AGGREGATE
-> NO RANK / PROMOTION / WINNER
```

Therefore:

```text
P3-R13 CLOSED_CANONICAL
!= P3 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL BENCHMARK TASK / PARTICIPANT EXECUTION
!= THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION
!= RAW DELTA
!= PAIRWISE STRATEGY COMPARISON
!= FAVORED / BETTER-WORSE
!= CROSS-DIMENSION SUM / MEAN / WEIGHTED SCORE
!= MULTI-STRATEGY COMPARISON / RANKING / PROMOTION
!= REPOSITORY-OWNED GOLD TRUTH
!= REPOSITORY-OWNED DEFAULT CONTEXT POLICY
!= WINNING / SUPERIOR CONTEXT STRATEGY PROVEN
!= HOLDOUT SUFFICIENCY / CONTAMINATION-FREE / SIGNIFICANCE QUALIFICATION
!= REAL PROVIDER / MODEL EXECUTION
!= PRODUCT INTEGRATION COMPLETE
!= PUBLIC RELEASE READY
!= PACKAGE PUBLISHABLE
!= PUBLIC VERSION DECLARED
!= PRODUCTION READY
!= SUPPORT SLA ESTABLISHED
!= COMPATIBILITY PROMISE ESTABLISHED
!= BRAND LAUNCH AUTHORIZED
!= P3-R14+ AUTHORIZED
!= P4 AUTHORIZED
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

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. Canonical P3-R13 post-merge proof `#296 / 5499792485` plus continuation boundary `#296 / 5499834265` identify the R13 documentation-only current-view reconciliation limited to:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

It changes no runtime, historical evidence, workflow, dependency, donor code, provider/model, benchmark corpus, persistence, release, or ruleset surface. It is a candidate until exact-head qualification, two independent substantive semantic terminal-clean review channels, guarded normal merge with exact expected head, and complete post-merge proof.

## Current implementation boundaries relevant to versioning

```text
K3-R7+ = NOT_AUTHORIZED
KRI-R5+ = NOT_AUTHORIZED
K4-R6+ = NOT_AUTHORIZED
K5-R6+ = NOT_AUTHORIZED
K6-R6+ = NOT_AUTHORIZED
P2-R6+ = NOT_AUTHORIZED
P3-R14+ = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

P3-R13 EXPLICIT PER-DIMENSION DIRECTION BINDING = CLOSED_CANONICAL WITHIN ITS EXACT CONTRACT
PAIRWISE STRATEGY COMPARISON = NOT_AUTHORIZED BY THIS FILE
RAW DELTA / FAVORED / BETTER-WORSE = NOT_AUTHORIZED BY THIS FILE
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED BY THIS FILE
CROSS-DIMENSION AGGREGATE SCORE = NOT_AUTHORIZED BY THIS FILE
MULTI-STRATEGY RANKING / PROMOTION = NOT_AUTHORIZED BY THIS FILE
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
```

## Next engineering boundary

Only after the R13 current-view reconciliation becomes canonical and post-merge proven may later bounded P3 definition/planning/authorization-candidate preparation be considered, if justified by a concrete canonical gap.

No `P3-R14` or pairwise-comparison requirement is inferred from sequence alone. P3-R13 deliberately stops at direction metadata bound to one reconstructed reduction record. Internal evidence may support investigating pairwise strategy comparison later, but that hypothesis creates no authority.

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
- P3-R13 authorization: `docs/planning/KODAC_P3_R13_REDUCTION_DIRECTION_BINDING_AUTHORIZATION_2026-09-01.md`
- P3-R13 evidence: `docs/planning/KODAC_P3_R13_REDUCTION_DIRECTION_BINDING_EVIDENCE_2026-09-01.md`
- P3-R13 post-merge proof: PR #296 / comment `5499792485`
- Reconciliation continuation boundary: PR #296 / comment `5499834265`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
