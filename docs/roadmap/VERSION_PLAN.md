# Kodac Version Plan

## Purpose

Kodac engineering milestones and public product versions are separate governance tracks.

This file records the current engineering/version boundary. It does not authorize implementation, package publication, release, brand launch, provider/model access, persistence, learning, benchmark execution, or side effects.

Always read live GitHub truth, root `AGENTS.md`, `docs/roadmap/NEXT.md`, and the exact active authorization before acting.

## Current engineering state on this closeout candidate

```text
K0/K1 = CLOSED
K2 = CLOSED
K3 = CLOSED FOR CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
KRI-R1 THROUGH KRI-R4 = CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K4 = CLOSED FOR CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K5 = CLOSED FOR CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE
P2-R1 = CLOSED_CANONICAL
P2-R2 = CLOSED_CANONICAL
P2-R3 = CLOSED_CANONICAL
P2-R4 = CLOSED_CANONICAL
P2-R5 = CLOSED_CANONICAL
P2 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL IFF THIS CLOSEOUT MERGE GATE PASSES
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ = NOT_AUTHORIZED
P3-P8 IMPLEMENTATION = NOT_AUTHORIZED
```

The P2 bounded-closeout authorization is canonical through PR #249 / `cb8315eb9e73f36586d37123fca5fe45c040da2b`. The conditional P2 closure statement above is not canonical closure until the exact six-path closeout candidate qualifies, merges, and completes mandatory post-merge proof.

## Engineering milestone status is not release status

The following implications are invalid:

```text
P2 BOUNDED R1-R5 CLOSED
!= P2 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL PROVIDER / MODEL BENCHMARK EXECUTION
!= PUBLIC RELEASE READY
!= PACKAGE PUBLISHABLE
!= PUBLIC VERSION DECLARED
!= PRODUCTION READY
!= SUPPORT SLA ESTABLISHED
!= COMPATIBILITY PROMISE ESTABLISHED
!= BRAND LAUNCH AUTHORIZED
```

The bounded R1-R5 surface is a deterministic local engineering measurement/evidence spine:

```text
R1 contract + repository-authored synthetic frozen fixture/manifest spine
R2 caller-observation validation/report
R3 explicit reducer/missingness + task-family summaries
R4 controlled per-metric raw comparison
R5 metric-local declared-direction relation
```

None of those slices invokes a real provider/model benchmark participant or creates general/public benchmark evidence by composition.

## Public product versions

No specific public version number is authorized by this document.

Current release authority remains:

```text
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

Version numbering, release channels, package publication, installation/upgrade promises, compatibility guarantees, support expectations, benchmark claims, security claims, and brand decisions require separate evidence and explicit authority.

## Current implementation boundaries relevant to versioning

```text
K3-R7+ = NOT_AUTHORIZED
KRI-R5+ = NOT_AUTHORIZED
K4-R6+ = NOT_AUTHORIZED
K5-R6+ = NOT_AUTHORIZED
K6-R6+ = NOT_AUTHORIZED
P2-R6+ = NOT_AUTHORIZED
P3-P8 IMPLEMENTATION = NOT_AUTHORIZED

NEW KODAC DEPENDENCIES = NOT_AUTHORIZED BY THIS FILE
CODE / DONOR IMPORT = NOT_AUTHORIZED BY THIS FILE
CONCRETE EXTERNAL REVIEWER / MODEL / PROVIDER ADAPTER = NOT_AUTHORIZED BY THIS FILE
PROVIDER NETWORK / SECRET HANDLING = NOT_AUTHORIZED BY THIS FILE
PROVIDER / MODEL / REVIEWER / EVALUATOR INVOCATION = NOT_AUTHORIZED BY THIS FILE
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS FILE
ROUTE / FALLBACK / RETRY / STRATEGY EXECUTION = NOT_AUTHORIZED BY THIS FILE
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

## Next engineering action after successful bounded P2 closeout

After and only after the exact closeout becomes canonical and its required post-merge proof succeeds, the next eligible unit is:

```text
P3 CONTEXT ENGINE V2 DEFINITION / PLANNING / AUTHORIZATION-CANDIDATE PREPARATION ONLY
P3 IMPLEMENTATION = NOT_AUTHORIZED UNTIL A SEPARATE EXACT CANONICAL AUTHORIZATION BECOMES EFFECTIVE
```

That planning step may define a future minimum-sufficient-evidence context contract, but does not authorize embeddings, providers/models, network/secrets, new dependencies, persistence, repository-local learning, cross-repository access, or product integration.

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
- P2 bounded-closeout authorization: `docs/planning/KODAC_P2_BOUNDED_R1_R5_CLOSEOUT_AUTHORIZATION_2026-08-28.md`
- P2 bounded-closeout candidate evidence: `docs/planning/KODAC_P2_BOUNDED_R1_R5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`
- Engineering roadmap: `docs/roadmap/ROADMAP.md`
- Milestone ledger: `docs/roadmap/MILESTONES.md`
- Product authority status: `docs/product/STATUS.md`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
