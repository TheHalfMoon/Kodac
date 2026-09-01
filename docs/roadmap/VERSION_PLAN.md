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
P3-R1 THROUGH P3-R8 = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R9+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

The R8 closure and H4-R3G-B test-harness recovery are engineering evidence milestones only. They create no public version, release, package, support, compatibility, benchmark-superiority, production-readiness, or brand authority.

## Canonical P3-R8 and recovery anchors

```text
P3_R7_RECONCILIATION = PR #276 / e1bbbf31cac4bdbb8c31dc7c3c3ff1fff3b760cb
P3_R8_AUTHORIZATION = PR #277 / e6890265c11fa3adbd14671d09b2c04b76f78954
P3_R8_IMPLEMENTATION = PR #278 / 576ac5d2b317fb90d1f0c6079d78cd3d899ca62d
P3_R8_QUALIFIED_HEAD = 55bee850de7e38cba2c54c13000dd6f8447f7f4c
P3_R8_MERGE_VERIFICATION = verified / valid
P3_R8_POST_MERGE_GOVERNANCE = 33439529685 / SUCCESS
P3_R8_POST_MERGE_K2_ORIGINAL = 33439529693 / FAILURE / PERMANENTLY PRESERVED

H4_REPAIR_AUTHORIZATION = PR #279 / eabdef572a2c4823f4f7cd0fc4442d1c818fbff1
H4_REPAIR = PR #280 / 89d294035923c3c8682e5a94360cb4e01d271a9c
H4_REPAIR_QUALIFIED_HEAD = e1c83b420700f4cbd5661886f900ad7ce16d3538
H4_REPAIR_QUALIFIED_TREE = 431f2dbb8d19c66bf6c0fafec6c18f31dde0e5bc
H4_REPAIR_MERGE_VERIFICATION = verified / valid
H4_REPAIR_POST_MERGE_GOVERNANCE = 33484688495 / SUCCESS
H4_REPAIR_POST_MERGE_K2 = 33484688399 / SUCCESS
P3_R8_POST_MERGE_K2_RECOVERY_PROOF = SUCCESS_ON_CANONICAL_REPAIR_MERGE
POST_MERGE_RECOVERY_PROOF_COMMENT = #280 / 5490844809
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R8 blobs preserved through the repair merge:

```text
packages/kodac-runtime/bench/p3-r8/contracts.ts = d5f8d18b9e1b61378283c489c355fdd293880349
packages/kodac-runtime/bench/p3-r8/context-strategy-subject.ts = f066b65fd44c7e6aac76b041a5336247c9f7dc2d
packages/kodac-runtime/test/p3-r8-context-strategy-subject.test.ts = 35fd7e59f7916fa1ba4ca6dd3077489dfa95c2e4
docs/planning/KODAC_P3_R8_CASE_INVARIANT_CONTEXT_STRATEGY_SUBJECT_EVIDENCE_2026-08-31.md = 65ea4dbeb8f976b6639e4cb61699741e226093b4
```

## P3-R8 is not a release milestone

P3-R8 provides only a pure deterministic local identity/binding boundary:

```text
ONE CLOSED STRATEGY DECLARATION
-> CANONICAL NORMALIZATION
-> CASE-INVARIANT STRATEGY SUBJECT IDENTITY

ONE COMPLETE P3-R1 REQUEST
+ ONE CALLER-DECLARED P3-R2 POLICY
+ ONE CANONICAL P3-R8 STRATEGY SUBJECT
+ ONE CLOSED BINDING DECLARATION
-> CANONICAL P3-R1 / P3-R2 RECONSTRUCTION
-> EXACT STRATEGY-TO-POLICY SEMANTIC MATCH
-> ONE CASE-BOUND BINDING EVIDENCE IDENTITY
```

Therefore:

```text
P3-R8 CLOSED_CANONICAL
!= P3 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL BENCHMARK TASK / PARTICIPANT EXECUTION
!= MULTI-CASE REPORT / SCORE AGGREGATION
!= N-WAY STRATEGY COMPARISON / RANKING / PROMOTION
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
!= P3-R9+ AUTHORIZED
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

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. The R8 documentation-only current-view reconciliation is limited to:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

It changes no runtime, historical evidence, workflow, dependency, donor code, provider/model, benchmark corpus, persistence, release, or ruleset surface. It is a candidate until exact-head qualification, independent review, guarded merge, and post-merge proof complete.

## Current implementation boundaries relevant to versioning

```text
K3-R7+ = NOT_AUTHORIZED
KRI-R5+ = NOT_AUTHORIZED
K4-R6+ = NOT_AUTHORIZED
K5-R6+ = NOT_AUTHORIZED
K6-R6+ = NOT_AUTHORIZED
P2-R6+ = NOT_AUTHORIZED
P3-R9+ = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

NEW KODAC DEPENDENCIES = NOT_AUTHORIZED BY THIS FILE
CODE / DONOR IMPORT = NOT_AUTHORIZED BY THIS FILE
CONCRETE EXTERNAL REVIEWER / MODEL / PROVIDER ADAPTER = NOT_AUTHORIZED BY THIS FILE
PROVIDER NETWORK / SECRET HANDLING = NOT_AUTHORIZED BY THIS FILE
PROVIDER / MODEL / REVIEWER / EVALUATOR INVOCATION = NOT_AUTHORIZED BY THIS FILE
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS FILE
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED BY THIS FILE
MULTI-CASE REPORT / SCORE AGGREGATION = NOT_AUTHORIZED BY THIS FILE
N-WAY STRATEGY COMPARISON / RANKING / PROMOTION = NOT_AUTHORIZED BY THIS FILE
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

Only after the R8 current-view reconciliation itself becomes canonical and post-merge proven may later bounded P3 definition/planning/authorization-candidate preparation be considered, if justified by a concrete canonical gap.

No `P3-R9` requirement is inferred from sequence alone. External donor behavior may inform a hypothesis, but benchmark-first governance requires reproducible evidence before a contested replacement, winner, or superiority claim can become canonical.

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
- P3-R8 authorization: `docs/planning/KODAC_P3_R8_CASE_INVARIANT_CONTEXT_STRATEGY_SUBJECT_AUTHORIZATION_2026-08-31.md`
- P3-R8 evidence: `docs/planning/KODAC_P3_R8_CASE_INVARIANT_CONTEXT_STRATEGY_SUBJECT_EVIDENCE_2026-08-31.md`
- H4 repair evidence: `docs/planning/KODAC_KDO_H4_R3G_B_GLOBAL_DEADLINE_LIFECYCLE_TEST_HARNESS_REPAIR_EVIDENCE_2026-09-01.md`
- P3-R8 recovery proof: PR #280 / comment `5490844809`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
