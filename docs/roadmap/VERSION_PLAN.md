# Kodac Version Plan

## Purpose

Kodac engineering milestones and public product versions are separate governance tracks.

This file records the **current version/release boundary**. It reports canonical engineering state; it does not authorize implementation, package publication, release, brand launch, provider/model access, persistence, learning, or side effects.

Always read live GitHub truth, root `AGENTS.md`, `docs/roadmap/NEXT.md`, and the exact active authorization before acting.

## Current engineering state

```text
K0/K1 = CLOSED
K2 = CLOSED
K3 = CLOSED FOR CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
KRI-P0 = CANONICAL PLANNING AUTHORITY
KRI-R1 THROUGH KRI-R4 = CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K4 = CLOSED FOR CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K5 = CLOSED FOR CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE

P2-R1 = CLOSED_CANONICAL
P2-R2 = CLOSED_CANONICAL
P2-R3 = CLOSED_CANONICAL
P2-R4 = CLOSED_CANONICAL
P2-R5 = CLOSED_CANONICAL
P2 BOUNDED R1-R5 CLOSEOUT = NOT YET CANONICAL
P2-R6+ = NOT_AUTHORIZED
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P3-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

P2-R5 canonical closure is anchored by PR #246 authorization merge `f1f33a01a3d5c764ac59a292464322c3c7c7b3de` and PR #247 implementation merge `7e92fece64807c03981091cd825f2c5e848356ce`, with qualified head `7e63cdfb689be15efea14bfe8b1862cccced73a2`, tree `4242fbad9e25d3332460324ac5e8277838ff468c`, verified/valid merge signature, post-merge Governance run `33199492928` SUCCESS, and post-merge K2 runtime run `33199492770` SUCCESS.

## Engineering milestone status is not release status

The following implications are invalid:

```text
P2-R1 THROUGH P2-R5 CLOSED_CANONICAL
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL PROVIDER / MODEL BENCHMARK EXECUTION AUTHORIZED
!= GLOBAL WINNER / SUPERIORITY CLAIM AUTHORIZED
!= PUBLIC RELEASE READY
!= PACKAGE PUBLISHABLE
!= PUBLIC VERSION DECLARED
!= PRODUCTION READY
!= SUPPORT SLA ESTABLISHED
!= COMPATIBILITY PROMISE ESTABLISHED
!= BRAND LAUNCH AUTHORIZED
```

The bounded P2 R1-R5 surface remains deterministic and caller-materialized. R4 provides controlled per-metric raw comparison under an exact shared context. R5 provides metric-local direction-aware relations only. Neither grants global aggregation, thresholds, statistics, execution, promotion, persistence, release, or public superiority authority.

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
P2-R6+ = NOT_AUTHORIZED
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
REPOSITORY WRITE / REVIEW / APPROVAL / MERGE AUTHORITY FROM KRI/K5/K6/P2 = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED BY THIS FILE
K2 EXECUTION-AUTHORITY EXPANSION = NOT_AUTHORIZED BY THIS FILE
DONE GATE / PROVEN_READY MODIFICATION = NOT_AUTHORIZED BY THIS FILE
```

## Next engineering action

After and only after this exact R5 closeout reconciliation becomes canonical and passes applicable post-merge proof, the next eligible unit is:

```text
P2 BOUNDED R1-R5 CLOSEOUT AUTHORIZATION-CANDIDATE PREPARATION ONLY
P2 CLOSEOUT = NOT CANONICAL YET
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3 IMPLEMENTATION = NOT_AUTHORIZED
```

A future bounded closeout may prove the already-canonical R1-R5 engineering surface only. It may not publish a benchmark, authorize provider/model execution, establish a universal benchmark corpus, claim product superiority, or create release/version authority.

If broader benchmark semantics are later required, they need a separately justified P2-R6+ authorization candidate. The label alone does not create a requirement or authority.

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
- Product authority status: `docs/product/STATUS.md`
- P2-R5 authorization: `docs/planning/KODAC_P2_R5_DIRECTIONAL_METRIC_RELATION_AUTHORIZATION_2026-08-28.md`
- P2-R5 implementation evidence: `docs/planning/KODAC_P2_R5_DIRECTIONAL_METRIC_RELATION_EVIDENCE_2026-08-28.md`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
