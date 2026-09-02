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
P3-R1 THROUGH P3-R14 = CLOSED_CANONICAL
P3-R14 = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R15+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

The P3-R14 closure is an engineering evidence milestone only. It creates no public version, release, package, support, compatibility, benchmark-superiority, production-readiness, or brand authority.

## Canonical P3-R14 anchors

```text
P3_R13_CURRENT_VIEW_RECONCILIATION = PR #297 / 42da1bcef8bdcb8cfe025355dba8df9021263672

P3_R14_AUTHORIZATION = PR #298 / fbbbcf13bdb281f0fe4296045ec2e2fa7311acdb
P3_R14_AUTHORIZATION_BLOB = 5a5f6cd9e2f52bcadc1ee0af0882f3a744487290
P3_R14_AUTHORIZATION_POST_MERGE_PROOF = #298 / 5500736118

P3_R14_IMPLEMENTATION = PR #299 / 6aa3e35418f95a2e198e3b8431297ab277eec6d3
P3_R14_QUALIFIED_HEAD = cbb5e1d8b11d15c35479856d8e79fd5dafb4ac9d
P3_R14_QUALIFIED_TREE = 59dc74a3700129a9f34b0453fd8bc6c75362f6ad
P3_R14_MERGE_TREE = 59dc74a3700129a9f34b0453fd8bc6c75362f6ad
P3_R14_MERGE_VERIFICATION = verified / valid
P3_R14_SEMANTIC_REVIEW = Cubic 5509354561 + CodeRabbit 3913967177
P3_R14_QUALIFICATION_PROOF = #299 / 5509427079
P3_R14_POST_MERGE_GOVERNANCE = 33629399450 / SUCCESS
P3_R14_POST_MERGE_PROVENANCE = 100244817246 / SUCCESS
P3_R14_POST_MERGE_LEGACY_TESTS = 100244817077 / SUCCESS
P3_R14_POST_MERGE_K2 = 33629399756 / SUCCESS
P3_R14_POST_MERGE_CLASSIFIER = 100244818046 / SUCCESS
P3_R14_POST_MERGE_WINDOWS = 100244850923 / SUCCESS
P3_R14_POST_MERGE_UBUNTU = 100244850933 / SUCCESS
P3_R14_POST_MERGE_MACOS = 100244851149 / SUCCESS
P3_R14_POST_MERGE_K2_GATE = 100245267248 / SUCCESS
P3_R14_POST_MERGE_PROOF_COMMENT = #299 / 5509458721
P3_R14_RECONCILIATION_BOUNDARY_COMMENT = #299 / 5509463764
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R14 blobs:

```text
packages/kodac-runtime/bench/p3-r14/contracts.ts = ef521e99559966cdd66f6c6c5215255aefc4b27b
packages/kodac-runtime/bench/p3-r14/strategy-reduction-pairwise-comparison.ts = 784cb3ccc884fca67411d87be19f30d3cca2cf9a
packages/kodac-runtime/test/p3-r14-strategy-reduction-pairwise-comparison.test.ts = 310ca4ebf1e245fbcfddfd664f66241a4e2f54ac
docs/planning/KODAC_P3_R14_STRATEGY_REDUCTION_PAIRWISE_COMPARISON_EVIDENCE_2026-09-02.md = e2c366e75c9d248f5a68135210ae475f7b4033f7
```

## P3-R14 is not a release milestone

P3-R14 provides only a pure deterministic controlled pairwise comparison-evidence boundary:

```text
EXACTLY TWO DISTINCT INDEPENDENTLY RECONSTRUCTED CANONICAL P3-R13 RECORDS
+ EXACT SHARED CONTROLLED PLAN / TASK / CASE / MEASUREMENT-GROUND-TRUTH SEMANTICS
+ EXACT SEVEN CANONICAL REDUCTION / DIRECTION SEMANTICS
-> COMPARABLE | INSUFFICIENT_EVIDENCE ONLY
-> rawDeltaLeftMinusRight = leftReducedValue - rightReducedValue
   ONLY WHEN BOTH TRUSTED VALUES ARE FINITE REDUCED VALUES
-> COMPLETE TRUSTED R13 RECORDS PRESERVED
-> DETERMINISTIC ORIENTATION-SENSITIVE IDENTITY
-> DETACHED / DEEPLY FROZEN OUTPUT
-> NO DIRECTION NORMALIZATION
-> NO FAVORED / BETTER / WORSE / TIE VERDICT
-> NO CROSS-DIMENSION AGGREGATE
-> NO RANK / PROMOTION / WINNER / DEFAULT
```

Therefore:

```text
P3-R14 CLOSED_CANONICAL
!= P3 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL BENCHMARK TASK / PARTICIPANT EXECUTION
!= THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION
!= THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON
!= FAVORED / BETTER-WORSE / TIE VERDICT
!= CROSS-DIMENSION SUM / MEAN / WEIGHTED SCORE
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
!= P3-R15+ AUTHORIZED
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

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. Canonical P3-R14 post-merge proof `#299 / 5509458721` plus continuation boundary `#299 / 5509463764` identify the R14 documentation-only current-view reconciliation limited to:

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
P3-R15+ = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

P3-R14 CONTROLLED PER-DIMENSION PAIRWISE COMPARISON EVIDENCE = CLOSED_CANONICAL WITHIN ITS EXACT CONTRACT
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED BY THIS FILE
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED BY THIS FILE
FAVORED / BETTER-WORSE / TIE VERDICT = NOT_AUTHORIZED BY THIS FILE
CROSS-DIMENSION AGGREGATE SCORE = NOT_AUTHORIZED BY THIS FILE
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
```

## Next engineering boundary

Only after the R14 current-view reconciliation becomes canonical and post-merge proven may later bounded P3 definition/planning/authorization-candidate preparation be considered, and only if a concrete canonical gap is proven.

No `P3-R15`, favored relation, better/worse verdict, aggregation, ranking, promotion, default, benchmark execution, P4-P8, public release, or project-completion authority is inferred from sequence or R14 closure.

Fresh successor analysis must re-read live `main`, the complete canonical P3-R1 through P3-R14 chain, governing ADRs, review/CI history, the durable improvement plan, and relevant precedent before identifying one falsifiable bounded candidate.

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
- P3-R14 authorization: `docs/planning/KODAC_P3_R14_STRATEGY_REDUCTION_PAIRWISE_COMPARISON_AUTHORIZATION_2026-09-02.md`
- P3-R14 evidence: `docs/planning/KODAC_P3_R14_STRATEGY_REDUCTION_PAIRWISE_COMPARISON_EVIDENCE_2026-09-02.md`
- P3-R14 qualification proof: PR #299 / comment `5509427079`
- P3-R14 post-merge proof: PR #299 / comment `5509458721`
- Reconciliation continuation boundary: PR #299 / comment `5509463764`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
