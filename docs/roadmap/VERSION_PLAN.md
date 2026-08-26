# Kodac Version Plan

## Purpose

Kodac engineering milestones and public product versions are separate governance tracks.

This file records the **current version/release boundary**. It does not authorize implementation, package publication, release, brand launch, provider/model access, persistence, learning, or side effects.

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
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = NOT_AUTHORIZED
K6-R5 = NOT_AUTHORIZED
K6 BOUNDED CLOSEOUT = NOT YET ELIGIBLE
P2 KODACBENCH = NOT_AUTHORIZED
P3-P8 IMPLEMENTATION = NOT_AUTHORIZED
```

Canonical reconciliation anchors:

```text
K5 closeout       = PR #201 / 06a6e33ca78bc4d0bd68449292161e1e4dc96385
K6-R1 merge       = PR #204 / 7bc163b9ec0d5d451950542f1feb15e444fbdc6c
K6-R2 merge       = PR #206 / 90c00cfc01cb874c08b4f7bde1469ccb298b5648
K6-R3 merge       = PR #208 / 4ed9bed6fdb23643c722298adfba4ae8e72097b2
Improvement plan  = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

These identities are evidence anchors only. Future work must re-read live `main`.

## Engineering milestone status is not release status

The following implications are invalid:

```text
K5 CLOSED
!= PUBLIC RELEASE READY

K6-R1/R2/R3 CLOSED_CANONICAL
!= K6 CLOSED
!= ROUTE EXECUTION AUTHORIZED
!= OUTCOME PERSISTENCE AUTHORIZED
!= LEARNING AUTHORIZED
!= PRODUCTION ROUTING AUTHORIZED

ENGINEERING MILESTONE CLOSED
!= PACKAGE PUBLISHABLE
!= PUBLIC VERSION DECLARED
!= PRODUCTION READY
!= SUPPORT SLA ESTABLISHED
!= BRAND LAUNCH AUTHORIZED
```

K5 retains bounded proof-review semantics only. K5 does not receive Done Gate / `PROVEN_READY` authority.

K6-R1/R2/R3 retain only their exact bounded deterministic caller-materialized surfaces. They do not authorize provider/model/reviewer invocation, route execution, persistence, telemetry, training, learning, strategy promotion, autofix, K2 expansion, or Done Gate authority transfer.

## Public product versions

Public product versions may later use identifiers such as:

```text
0.x
1.x
```

No specific public version number is authorized by this document.

Current release authority is:

```text
PUBLIC RELEASE VERSION = NOT_AUTHORIZED
PACKAGE PUBLICATION = NOT_AUTHORIZED
RELEASE CHANNEL = NOT_AUTHORIZED
1.0 PROMISE = NOT_ESTABLISHED
SUPPORT / COMPATIBILITY PROMISE = NOT_ESTABLISHED
BRAND LAUNCH = NOT_AUTHORIZED
KODAC NAME / TRADEMARK CLEARANCE = NOT_ESTABLISHED
```

Version numbering, release channels, package publication, installation/upgrade promises, compatibility guarantees, support expectations, public benchmark claims, security claims, and brand decisions require separate evidence and explicit authority.

## Current implementation boundaries relevant to versioning

```text
K3-R7+ = NOT_AUTHORIZED
KRI-R5+ = NOT_AUTHORIZED
K4-R6+ = NOT_AUTHORIZED
K5-R6+ = NOT_AUTHORIZED
K6-R4 = NOT_AUTHORIZED
K6-R5 = NOT_AUTHORIZED
K6 BOUNDED CLOSEOUT = NOT YET ELIGIBLE
P2 KODACBENCH = NOT_AUTHORIZED
P3-P8 = NOT_AUTHORIZED

NEW KODAC DEPENDENCIES = NOT_AUTHORIZED BY THIS FILE
CODE / DONOR IMPORT = NOT_AUTHORIZED BY THIS FILE
CONCRETE EXTERNAL REVIEWER / MODEL / PROVIDER ADAPTER = NOT_AUTHORIZED BY THIS FILE
PROVIDER NETWORK / SECRET HANDLING = NOT_AUTHORIZED BY THIS FILE
PERSISTENT REVIEW / PROOF / ROUTE / OUTCOME STORAGE = NOT_AUTHORIZED BY THIS FILE
TELEMETRY = NOT_AUTHORIZED BY THIS FILE
TRAINING / LEARNING = NOT_AUTHORIZED BY THIS FILE
CROSS-REPOSITORY AGGREGATION / LEARNING = NOT_AUTHORIZED BY THIS FILE
AUTOFIX EXECUTION = NOT_AUTHORIZED BY THIS FILE
REPOSITORY WRITE / REVIEW / APPROVAL / MERGE AUTHORITY FROM KRI/K5/K6 = NOT_AUTHORIZED
RULESET CHANGE = NOT_AUTHORIZED BY THIS FILE
K2 EXECUTION-AUTHORITY EXPANSION = NOT_AUTHORIZED BY THIS FILE
DONE GATE MODIFICATION = NOT_AUTHORIZED BY THIS FILE
```

## Next engineering action

After the P0 roadmap reconciliation containing this file is canonical and post-merge proven, the next eligible unit is **K6-R4 authorization-candidate preparation only**.

That planning step does not itself create storage or persistence authority. K6-R4 implementation remains `NOT_AUTHORIZED` until a separate exact authorization becomes canonical and defines the privacy, data-minimization, retention/deletion, isolation, egress, persistence, implementation-allowlist, CI, review, merge, and post-merge gates.

## Future release-gate direction

A future public-release authorization should separately prove the applicable subsets of:

- supported product scope and user-facing surfaces;
- installation, upgrade and rollback behavior;
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

Current action:

- `docs/roadmap/NEXT.md`

Current engineering roadmap:

- `docs/roadmap/ROADMAP.md`

Current milestone ledger:

- `docs/roadmap/MILESTONES.md`

Durable improvement sequence:

- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
