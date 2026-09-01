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
P2 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ = NOT_AUTHORIZED
P3-R1 THROUGH P3-R10 = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R11+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

The P3-R10 closure is an engineering evidence milestone only. It creates no public version, release, package, support, compatibility, benchmark-superiority, production-readiness, or brand authority.

## Canonical P3-R10 anchors

```text
P3_R9_RECONCILIATION = PR #284 / 748d562d2bcf74b49fda17e3888b70d462e875e6
P3_R9_RECONCILIATION_POST_MERGE_PROOF = #284 / 5493067005

P3_R10_AUTHORIZATION = PR #285 / 3b4d75133ca350ca147802fb53cc4716ab6ee2e0
P3_R10_AUTHORIZATION_QUALIFIED_HEAD = 1933f6f1b0e8eff674ad33505f7a7974f2e69c1f
P3_R10_AUTHORIZATION_BLOB = 639fe0915dbbd3266702008e6b7c83752146de01
P3_R10_AUTHORIZATION_POST_MERGE_PROOF = #285 / 5493260544

P3_R10_IMPLEMENTATION = PR #286 / e22019883dca10ac1ed66edff2d56d0fc2570961
P3_R10_QUALIFIED_HEAD = 1cfc0bd74d40278ad26184ad5d48675a788d97fb
P3_R10_MERGE_TREE = 2d300653b6afacf21e10c755aaeb0fe4070a8925
P3_R10_MERGE_VERIFICATION = verified / valid
P3_R10_SEMANTIC_REVIEW = CodeRabbit 5493664866 + Cubic 5493888569
P3_R10_POST_MERGE_GOVERNANCE = 33507788965 / SUCCESS
P3_R10_POST_MERGE_K2 = 33507788845 / SUCCESS
P3_R10_POST_MERGE_UBUNTU = 99855928420 / SUCCESS
P3_R10_POST_MERGE_WINDOWS = 99855928443 / SUCCESS
P3_R10_POST_MERGE_MACOS = 99855928534 / SUCCESS
P3_R10_POST_MERGE_K2_GATE = 99856236455 / SUCCESS
P3_R10_POST_MERGE_PROOF_COMMENT = #286 / 5494012666
P3_R10_RECONCILIATION_BOUNDARY_COMMENT = #286 / 5494032631
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R10 blobs:

```text
packages/kodac-runtime/bench/p3-r10/contracts.ts = 0ec5df5255604aea2b3f11a22ff4313b0b87d0ea
packages/kodac-runtime/bench/p3-r10/single-strategy-two-case-metric-alignment.ts = 74085c6094ef7de5b34f351ba79b92ae0a758756
packages/kodac-runtime/test/p3-r10-single-strategy-two-case-metric-alignment.test.ts = e701e76a2c5f6594389fd438b1e7ab8040347cf2
docs/planning/KODAC_P3_R10_SINGLE_STRATEGY_TWO_CASE_METRIC_ALIGNMENT_EVIDENCE_2026-09-01.md = e3d5a1e66593b1162c48dbae40ace7ccb2131fc3
```

Historical P3-R8 K2 run `33439529693` remains failed evidence and is not relabeled by later recovery.

## P3-R10 is not a release milestone

P3-R10 provides only a pure deterministic local alignment-evidence boundary:

```text
ONE EXACT CANONICAL P3-R9 TWO-MEMBER COMPOSITION
+ INDEPENDENT CANONICAL P3-R6 RECONSTRUCTION FOR MEMBER A
+ INDEPENDENT CANONICAL P3-R6 RECONSTRUCTION FOR MEMBER B
-> EXACT SEVEN-DIMENSION metricId / unit ALIGNMENT
-> PRESERVE MEMBER A/B OBSERVATIONS WITHOUT REDUCTION
-> ONE DETERMINISTIC ALIGNMENT EVIDENCE IDENTITY
```

Therefore:

```text
P3-R10 CLOSED_CANONICAL
!= P3 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL BENCHMARK TASK / PARTICIPANT EXECUTION
!= THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION
!= MULTI-CASE OBSERVATION / METRIC / SCORE AGGREGATION
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
!= P3-R11+ AUTHORIZED
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

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. Canonical P3-R10 post-merge proof `#286 / 5494012666` plus continuation boundary `#286 / 5494032631` permit the R10 documentation-only current-view reconciliation limited to:

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
P3-R11+ = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

NEW KODAC DEPENDENCIES = NOT_AUTHORIZED BY THIS FILE
CODE / DONOR IMPORT = NOT_AUTHORIZED BY THIS FILE
CONCRETE EXTERNAL REVIEWER / MODEL / PROVIDER ADAPTER = NOT_AUTHORIZED BY THIS FILE
PROVIDER NETWORK / SECRET HANDLING = NOT_AUTHORIZED BY THIS FILE
PROVIDER / MODEL / REVIEWER / EVALUATOR INVOCATION = NOT_AUTHORIZED BY THIS FILE
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS FILE
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED BY THIS FILE
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION = NOT_AUTHORIZED BY THIS FILE
MULTI-CASE OBSERVATION / METRIC / SCORE AGGREGATION = NOT_AUTHORIZED BY THIS FILE
MULTI-STRATEGY COMPARISON / RANKING / PROMOTION = NOT_AUTHORIZED BY THIS FILE
PERSISTENT REVIEW / PROOF / ROUTE / BENCHMARK / OUTCOME STORAGE = NOT_AUTHORIZED BY THIS FILE
TELEMETRY / UPLOAD = NOT_AUTHORIZED BY THIS FILE
TRAINING / LEARNING = NOT_AUTHORIZED BY THIS FILE
CROSS-REPOSITORY AGGREGATION / LEARNING = NOT_AUTHORIZED BY THIS FILE
AUTOMATIC STRATEGY PROMOTION / TRUST-POLICY MUTATION = NOT_AUTHORIZED BY THIS FILE
AUTOFIX EXECUTION = NOT_AUTHORIZED BY THIS FILE
RULESET CHANGE / BYPASS = NOT_AUTHORIZED BY THIS FILE
K2 EXECUTION-AUTHORITY EXPANSION = NOT_AUTHORIZED BY THIS FILE
DONE GATE / PROVEN_READY MODIFICATION = NOT_AUTHORIZED BY THIS FILE
```

## Next engineering boundary

Only after the R10 current-view reconciliation itself becomes canonical and post-merge proven may later bounded P3 definition/planning/authorization-candidate preparation be considered, if justified by a concrete canonical gap.

No `P3-R11` requirement is inferred from sequence alone. External precedent may inform a hypothesis, but benchmark-first governance requires reproducible evidence before a contested replacement, winner, or superiority claim can become canonical.

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
- P3-R10 authorization: `docs/planning/KODAC_P3_R10_SINGLE_STRATEGY_TWO_CASE_METRIC_ALIGNMENT_AUTHORIZATION_2026-09-01.md`
- P3-R10 evidence: `docs/planning/KODAC_P3_R10_SINGLE_STRATEGY_TWO_CASE_METRIC_ALIGNMENT_EVIDENCE_2026-09-01.md`
- P3-R10 post-merge proof: PR #286 / comment `5494012666`
- Reconciliation continuation boundary: PR #286 / comment `5494032631`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
