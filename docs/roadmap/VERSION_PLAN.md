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
P3-R1 THROUGH P3-R15 = CLOSED_CANONICAL
P3-R15 = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R16+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

The P3-R15 closure is an engineering evidence milestone only. It creates no public version, release, package, support, compatibility, benchmark-superiority, production-readiness, or brand authority.

## Canonical P3-R15 anchors

```text
P3_R14_CURRENT_VIEW_RECONCILIATION = PR #300 / 1e244c64926e4035134d9b4e995acb2d6b82e722
P3_R14_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #300 / 5510196174
P3_R15_SUCCESSOR_ANALYSIS = #300 / 5510243321

P3_R15_AUTHORIZATION = PR #301 / 53c9bde577783aef672504f9a463be30bcc8c657
P3_R15_AUTHORIZATION_BLOB = 6761b811959599407caa8b3e01eccaab75aa43e9
P3_R15_AUTHORIZATION_POST_MERGE_PROOF = #301 / 5510832144

P3_R15_IMPLEMENTATION = PR #302 / ffc9fae7f3bbb309fa5318e8747e7969726d8a1e
P3_R15_QUALIFIED_HEAD = 697739cd2b21e0e3fe4bf4bfbd6f5bbc792c3619
P3_R15_QUALIFIED_TREE = af28fd6dd4e67c3a37fb18b330abfe07177b9fa2
P3_R15_MERGE_TREE = af28fd6dd4e67c3a37fb18b330abfe07177b9fa2
P3_R15_MERGE_VERIFICATION = verified / valid
P3_R15_SEMANTIC_REVIEW = CodeRabbit 5513591270 + Cubic 5513811826
P3_R15_PRE_MERGE_PROOF = #302 / 5513878167
P3_R15_POST_MERGE_GOVERNANCE = 33663201288 / SUCCESS
P3_R15_POST_MERGE_PROVENANCE = 100358488473 / SUCCESS
P3_R15_POST_MERGE_LEGACY_TESTS = 100358488206 / SUCCESS
P3_R15_POST_MERGE_K2 = 33663201228 / SUCCESS
P3_R15_POST_MERGE_CLASSIFIER = 100358488886 / SUCCESS
P3_R15_POST_MERGE_UBUNTU = 100358536296 / SUCCESS
P3_R15_POST_MERGE_WINDOWS = 100358536358 / SUCCESS
P3_R15_POST_MERGE_MACOS = 100358536432 / SUCCESS
P3_R15_POST_MERGE_K2_GATE = 100359003357 / SUCCESS
P3_R15_POST_MERGE_PROOF_COMMENT = #302 / 5513965094
P3_R15_RECONCILIATION_BOUNDARY_COMMENT = #302 / 5513990441
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R15 blobs:

```text
packages/kodac-runtime/bench/p3-r15/contracts.ts = 5e0c2496108f0d877efaae1924418afddfc72260
packages/kodac-runtime/bench/p3-r15/strategy-reduction-directional-relation.ts = e5da22fbc7c7f4aacee80bdf3fd319fcabe81072
packages/kodac-runtime/test/p3-r15-strategy-reduction-directional-relation.test.ts = 2eab58d51bd4081932f2be88cf7eb87afb9336d2
docs/planning/KODAC_P3_R15_DIRECTIONAL_PAIRWISE_RELATION_EVIDENCE_2026-09-02.md = 124f9adaadc677b155797e5ffdaf2a63bfcbc195
```

## P3-R15 is not a release milestone

P3-R15 provides only a pure deterministic per-dimension directional-relation evidence boundary:

```text
EXACTLY THE THREE CANONICAL P3-R14 CALLER ROOTS
-> CANONICAL R14 AS THE SOLE HOSTILE-INPUT / RECONSTRUCTION BOUNDARY
-> COMPLETE TRUSTED R14 PAIRWISE EVIDENCE PRESERVED
-> EXACT SEVEN CANONICAL DIMENSIONS PRESERVED
-> EVERY R14 DIMENSION FIELD COPIED UNCHANGED
-> ONE RELATION APPENDED PER DIMENSION:
   LEFT_FAVORED_BY_DIRECTION
   RIGHT_FAVORED_BY_DIRECTION
   EQUAL_RAW_VALUE
   INSUFFICIENT_EVIDENCE
-> DETERMINISTIC ORIENTATION-SENSITIVE IDENTITY
-> DETACHED / DEEPLY FROZEN OUTPUT
-> NO CROSS-DIMENSION AGGREGATE
-> NO GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR
-> NO STATISTICAL TIE / EQUIVALENCE
-> NO RANK / PROMOTION / WINNER / DEFAULT
```

Therefore:

```text
P3-R15 CLOSED_CANONICAL
!= P3 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL BENCHMARK TASK / PARTICIPANT EXECUTION
!= THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION
!= THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON
!= GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR VERDICT
!= CROSS-DIMENSION SUM / MEAN / WEIGHTED SCORE / MAJORITY / PARETO POLICY
!= STATISTICAL SIGNIFICANCE / CONFIDENCE / EQUIVALENCE
!= MULTI-STRATEGY RANKING / PROMOTION
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
!= P3-R16+ AUTHORIZED
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

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. Canonical P3-R15 post-merge proof `#302 / 5513965094`, the established canonical reconciliation procedure proven by PR #300, and continuation boundary `#302 / 5513990441` identify the R15 documentation-only current-view reconciliation limited to:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

It changes no runtime, historical authorization/evidence, workflow, dependency, donor code, provider/model, benchmark corpus, persistence, release, or ruleset surface. It is a candidate until exact-head qualification, two independent substantive semantic terminal-clean review channels, zero actionable findings/threads, guarded normal merge with exact expected head, and complete post-merge proof.

## Current implementation boundaries relevant to versioning

```text
K3-R7+ = NOT_AUTHORIZED
KRI-R5+ = NOT_AUTHORIZED
K4-R6+ = NOT_AUTHORIZED
K5-R6+ = NOT_AUTHORIZED
K6-R6+ = NOT_AUTHORIZED
P2-R6+ = NOT_AUTHORIZED
P3-R16+ = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

P3-R15 PER-DIMENSION DIRECTIONAL RELATION EVIDENCE = CLOSED_CANONICAL WITHIN ITS EXACT CONTRACT
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED BY THIS FILE
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED BY THIS FILE
GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR VERDICT = NOT_AUTHORIZED BY THIS FILE
CROSS-DIMENSION AGGREGATE SCORE / MAJORITY / PARETO POLICY = NOT_AUTHORIZED BY THIS FILE
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

Only after the R15 current-view reconciliation becomes canonical and post-merge proven may later bounded P3 definition/planning/authorization-candidate preparation be considered, and only if a concrete canonical gap is proven.

No `P3-R16`, aggregate, ranking, promotion, default, statistical policy, benchmark execution, P4-P8, public release, or project-completion authority is inferred from sequence or R15 closure.

Fresh successor analysis must re-read live `main`, the complete canonical P3-R1 through P3-R15 chain, governing ADRs, review/CI history, the durable improvement plan, and relevant precedent before identifying one falsifiable bounded candidate.

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
- P3-R15 authorization: `docs/planning/KODAC_P3_R15_DIRECTIONAL_PAIRWISE_RELATION_AUTHORIZATION_2026-09-02.md`
- P3-R15 evidence: `docs/planning/KODAC_P3_R15_DIRECTIONAL_PAIRWISE_RELATION_EVIDENCE_2026-09-02.md`
- P3-R15 pre-merge proof: PR #302 / comment `5513878167`
- P3-R15 post-merge proof: PR #302 / comment `5513965094`
- Reconciliation continuation boundary: PR #302 / comment `5513990441`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
