# Kodac Version Plan

## Purpose

Kodac engineering milestones and public product versions are separate governance tracks.

This file records the current engineering/version boundary. It does not authorize implementation, package publication, release, brand launch, provider/model access, persistence, learning, benchmark execution, or side effects.

Always read live GitHub truth, root `AGENTS.md`, `docs/roadmap/NEXT.md`, and the exact active authorization before acting.

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
P3-R1 THROUGH P3-R5 = CLOSED_CANONICAL
P3 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
P3-R6 CONTEXT MEASUREMENT OBSERVATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R7+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

The R6 closure is an engineering evidence milestone only. It creates no public version, release, package, support, compatibility, benchmark-superiority, production-readiness, or brand authority.

## Canonical P3-R6 anchors

```text
P3_R1_R5_CLOSEOUT = PR #270 / 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
P3_R6_AUTHORIZATION = PR #271 / 2441cf9b6006859a4bc05cfe196a033fe31b56c9
P3_R6_IMPLEMENTATION = PR #272 / c045ae50f42fcfeede37bbd3290b1d3a7cb5bb91
P3_R6_QUALIFIED_HEAD = 202cbf2b8082ddde52738e07373ba24322a5265c
P3_R6_QUALIFIED_TREE = 85d3cb932fc477525a05eed6a5ee1e4ffe43e4a1
MERGE_PARENT_1 = 2441cf9b6006859a4bc05cfe196a033fe31b56c9
MERGE_PARENT_2 = 202cbf2b8082ddde52738e07373ba24322a5265c
MERGE_TREE = 85d3cb932fc477525a05eed6a5ee1e4ffe43e4a1
MERGE_VERIFICATION = verified / valid
PRE_MERGE_GOVERNANCE = 33418354648 / SUCCESS
PRE_MERGE_K2 = 33418354658 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
POST_MERGE_GOVERNANCE = 33419477062 / SUCCESS
POST_MERGE_K2 = 33419477059 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
SEMANTIC_REVIEW_QUORUM = Cubic + CodeRabbit / exact-head and current-metadata terminal clean
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R6 blobs:

```text
packages/kodac-runtime/bench/p3-r6/contracts.ts = 6b12541182cc0c28072efcb3966e570d3cdeefbe
packages/kodac-runtime/bench/p3-r6/context-measurement-observation.ts = f31bb7f1cc89ddc6a6eacf1be546c54f135cffca
packages/kodac-runtime/test/p3-r6-context-measurement-observation.test.ts = 0ef67ed8249a03f79bac6ccf132a8dade56a79d4
docs/planning/KODAC_P3_R6_CONTEXT_MEASUREMENT_OBSERVATION_EVIDENCE_2026-08-31.md = c8c156947f17aef62625acb5ea93c6bc9c0018a8
```

## P3-R6 is not a release milestone

P3-R6 provides only a pure deterministic local bridge:

```text
EXACT P3-R1 REQUEST PREIMAGE
+ EXACT CALLER-DECLARED P3-R2 POLICY
+ VALIDATED P2-R1 CASE / METRIC BINDINGS
+ EXPLICIT CALLER GOLD / UTILIZATION FACTS
-> CANONICAL P3-R2 APPLICATION RECONSTRUCTION
-> SEVEN DETERMINISTIC CONTEXT MEASUREMENTS
-> SEVEN P2-R2-COMPATIBLE OBSERVATIONS
-> DECLARATION-BOUND MEASUREMENT EVIDENCE IDENTITY
```

Therefore:

```text
P3-R6 CLOSED_CANONICAL
!= P3 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL BENCHMARK TASK EXECUTION
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
!= P3-R7+ AUTHORIZED
!= P4 AUTHORIZED
```

## Repository visibility versus release authority

The GitHub repository is currently public. Repository visibility is an access setting, not a product/version authorization.

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

The R6 authorization requires a separate current-view reconciliation before any later P3 slice may be considered. This documentation-only unit is limited to:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

It changes no runtime, evidence-history, workflow, dependency, provider/model, benchmark corpus, persistence, release, or ruleset surface.

## Current implementation boundaries relevant to versioning

```text
K3-R7+ = NOT_AUTHORIZED
KRI-R5+ = NOT_AUTHORIZED
K4-R6+ = NOT_AUTHORIZED
K5-R6+ = NOT_AUTHORIZED
K6-R6+ = NOT_AUTHORIZED
P2-R6+ = NOT_AUTHORIZED
P3-R7+ = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

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
CROSS-REPOSITORY AGGREGATION / LEARNING = NOT_AUTHORIZED BY THIS FILE
AUTOMATIC STRATEGY PROMOTION / TRUST-POLICY MUTATION = NOT_AUTHORIZED BY THIS FILE
AUTOFIX EXECUTION = NOT_AUTHORIZED BY THIS FILE
RULESET CHANGE / BYPASS = NOT_AUTHORIZED BY THIS FILE
K2 EXECUTION-AUTHORITY EXPANSION = NOT_AUTHORIZED BY THIS FILE
DONE GATE / PROVEN_READY MODIFICATION = NOT_AUTHORIZED BY THIS FILE
```

## Next engineering boundary

Only after the R6 current-view reconciliation itself becomes canonical and post-merge proven may later bounded P3 definition/planning/authorization-candidate preparation be considered, if justified by a concrete canonical gap.

No `P3-R7` requirement is inferred from sequence alone.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

Any future slice involving real benchmark execution/corpus mutation, holdout-sufficiency decisions, statistical acceptance, repository-owned promotion, embeddings, learned reranking, provider/model execution, persistence, product integration, K2/K5/Done Gate changes, or release/public claims must define its exact evidence, trust, authority, allowlist, and non-grant boundary before implementation.

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
- P3-R6 authorization: `docs/planning/KODAC_P3_R6_CONTEXT_MEASUREMENT_OBSERVATION_AUTHORIZATION_2026-08-31.md`
- P3-R6 evidence: `docs/planning/KODAC_P3_R6_CONTEXT_MEASUREMENT_OBSERVATION_EVIDENCE_2026-08-31.md`
- P3 bounded R1-R5 closeout evidence: `docs/planning/KODAC_P3_BOUNDED_R1_R5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-31.md`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
