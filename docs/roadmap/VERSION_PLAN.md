# Kodac Version Plan

## Purpose

Kodac engineering milestones and public product versions are separate governance tracks.

This file records the **current version/release boundary**. It reports canonical or conditional-candidate engineering state; it does not authorize implementation, package publication, release, brand launch, provider/model access, persistence, learning, or side effects.

Always read live GitHub truth, root `AGENTS.md`, `docs/roadmap/NEXT.md`, and the exact active authorization before acting.

## Current engineering state on this candidate

```text
K0/K1 = CLOSED
K2 = CLOSED
K3 = CLOSED FOR CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
KRI-P0 = CANONICAL PLANNING AUTHORITY
KRI-R1 THROUGH KRI-R4 = CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K4 = CLOSED FOR CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K5 = CLOSED FOR CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = CLOSED_CANONICAL
K6-R5 = CLOSED_CANONICAL
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE IFF THIS CLOSEOUT MERGE GATE PASSES
K6-R6+ = NOT REQUIRED FOR THIS BOUNDED CLOSEOUT / NOT AUTHORIZED
P2 KODACBENCH IMPLEMENTATION = NOT_AUTHORIZED
P3-P8 IMPLEMENTATION = NOT_AUTHORIZED
```

K6 bounded-closeout authorization is canonical through PR #235 / `748706683a0102f1743c1797950272bbd41d8a3c`. The conditional K6 closure statement above is not canonical closure until the exact closeout merge and post-merge proof in `docs/planning/KODAC_K6_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md` pass.

## Engineering milestone status is not release status

The following implications are invalid:

```text
K6 CLOSED
!= PUBLIC RELEASE READY
!= PACKAGE PUBLISHABLE
!= PUBLIC VERSION DECLARED
!= PRODUCTION READY
!= SUPPORT SLA ESTABLISHED
!= COMPATIBILITY PROMISE ESTABLISHED
!= BRAND LAUNCH AUTHORIZED

K6-R1/R2/R3/R4/R5 CLOSED_CANONICAL
!= PROVIDER / MODEL / REVIEWER INVOCATION AUTHORIZED
!= ROUTE / FALLBACK / RETRY / STRATEGY EXECUTION AUTHORIZED
!= OUTCOME PERSISTENCE AUTHORIZED
!= TELEMETRY AUTHORIZED
!= LEARNING AUTHORIZED
!= AUTOMATIC PROMOTION AUTHORIZED
!= DONE GATE / PROVEN_READY AUTHORITY TRANSFER
!= GENERAL KODACBENCH COMPLETE
```

K6-R1 through K6-R5 retain only their exact bounded deterministic caller-materialized surfaces. R4 provides privacy-governed caller-managed in-process outcome-memory values, not durable storage or learning authority. R5 provides immutable bounded strategy comparison over exactly comparable caller-materialized evidence, not candidate eligibility, execution, promotion, trust-policy mutation, or general benchmark authority.

```text
R5 BOUNDED QUALIFICATION CORPUS != GENERAL KODACBENCH
SELF-IMPROVING != SELF-AUTHORIZING
```

## Public product versions

Public product versions may later use identifiers such as `0.x` or `1.x`, but no specific public version number is authorized by this document.

Current public-release authority remains:

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
P2 KODACBENCH IMPLEMENTATION = NOT_AUTHORIZED BY K6 CLOSEOUT
P3-P8 IMPLEMENTATION = NOT_AUTHORIZED

NEW KODAC DEPENDENCIES = NOT_AUTHORIZED BY THIS FILE
CODE / DONOR IMPORT = NOT_AUTHORIZED BY THIS FILE
CONCRETE EXTERNAL REVIEWER / MODEL / PROVIDER ADAPTER = NOT_AUTHORIZED BY THIS FILE
PROVIDER NETWORK / SECRET HANDLING = NOT_AUTHORIZED BY THIS FILE
PROVIDER / MODEL / REVIEWER / EVALUATOR INVOCATION = NOT_AUTHORIZED BY THIS FILE
ROUTE / FALLBACK / RETRY / STRATEGY EXECUTION = NOT_AUTHORIZED BY THIS FILE
PERSISTENT REVIEW / PROOF / ROUTE / OUTCOME STORAGE = NOT_AUTHORIZED BY THIS FILE
TELEMETRY / UPLOAD = NOT_AUTHORIZED BY THIS FILE
TRAINING / LEARNING = NOT_AUTHORIZED BY THIS FILE
CROSS-REPOSITORY AGGREGATION / LEARNING = NOT_AUTHORIZED BY THIS FILE
AUTOMATIC STRATEGY PROMOTION / TRUST-POLICY MUTATION = NOT_AUTHORIZED BY THIS FILE
AUTOFIX EXECUTION = NOT_AUTHORIZED BY THIS FILE
REPOSITORY WRITE / REVIEW / APPROVAL / MERGE AUTHORITY FROM KRI/K5/K6 = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED BY THIS FILE
K2 EXECUTION-AUTHORITY EXPANSION = NOT_AUTHORIZED BY THIS FILE
DONE GATE / PROVEN_READY MODIFICATION = NOT_AUTHORIZED BY THIS FILE
```

## Next engineering action

After and only after the exact K6 closeout candidate becomes canonical and its required post-merge proof succeeds, the next eligible unit is:

```text
P2 KODACBENCH AUTHORIZATION-CANDIDATE PREPARATION ONLY
P2 KODACBENCH IMPLEMENTATION = NOT_AUTHORIZED UNTIL A SEPARATE EXACT CANONICAL AUTHORIZATION BECOMES EFFECTIVE
```

That later planning/authorization step does not itself publish a benchmark, authorize broad superiority claims, or create public release/version authority.

## Future release-gate direction

A future public-release authorization should separately prove the applicable subsets of:

- supported product scope and user-facing surfaces;
- installation, upgrade, and rollback behavior;
- compatibility/versioning contract;
- security and trust posture;
- provenance/license completeness;
- required CI and supported platforms;
- packaging and distribution artifacts;
- benchmark/claim evidence;
- documentation and support expectations;
- brand/name/trademark status.

This is planning direction only, not an authorized release checklist or release decision.

## Navigation

- Current action: `docs/roadmap/NEXT.md`
- Engineering roadmap: `docs/roadmap/ROADMAP.md`
- Milestone ledger: `docs/roadmap/MILESTONES.md`
- K6 closeout evidence: `docs/planning/KODAC_K6_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`