# Kodac Version Plan

## Purpose

Kodac engineering milestones and public product versions are separate governance tracks.

This document removes obsolete Kernux observability version promises from current roadmap authority. Earlier content remains recoverable from repository history and the pre-reconstitution canonical base.

K4 bounded closeout is canonical at merge `dcd3693826d9282b475d99c6b9e658b9695e63a8` after its required exact-head and post-merge proof.

K5-R1 through K5-R5 are canonical for their separately authorized bounded scopes. K5 bounded-closeout authorization is canonical at merge `f1457f8e7efd1e09e2d55e73fc0e4ea860bf8762`. Every `K5: CLOSED` statement in this closeout candidate remains conditional until the exact-head documentation gate, expected-head merge, and post-merge ordered-parent/tree/blob/protected-main verification in `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md` pass.

## Engineering milestones

Engineering milestones describe architectural and technical progress:

```text
K0/K1 — architecture, governance, provenance, donor-selection foundation
K2    — trusted runtime spine
K3    — evidence-backed repository intelligence & context engine
KRI-P0 — Reviewer Intelligence planning / contract design authority
KRI-R1 through KRI-R4 — separately authorized bounded Reviewer Intelligence slices
K4    — ecosystem compatibility & capability registry; closed for canonical bounded R1-R5 data-only evidence surface
K5    — Proof Review & Judge; canonical R1-R5 bounded surface, closeout candidate
K6+   — later milestones only when separately defined/authorized
```

Current state:

| Engineering milestone / gate | Status |
| --- | --- |
| K0/K1 | CLOSED |
| K2 | CLOSED |
| K3 | CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE |
| K3-R1 through K3-R6 | CANONICAL / COMPLETE FOR THEIR SEPARATELY AUTHORIZED BOUNDED SCOPES |
| K3-R7+ | NOT REQUIRED FOR K3 CLOSEOUT / NOT AUTHORIZED |
| KRI-P0 | CANONICAL PLANNING AUTHORITY |
| KRI-R1 through KRI-R4 | CANONICAL / COMPLETE FOR THEIR SEPARATELY AUTHORIZED BOUNDED SCOPES |
| KRI-R5+ | NOT AUTHORIZED |
| K4 | CLOSED FOR THE CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE |
| K4-R1 through K4-R5 | CANONICAL / COMPLETE FOR THEIR SEPARATELY AUTHORIZED BOUNDED DATA-ONLY SCOPES |
| K4-R6+ | NOT REQUIRED FOR K4 CLOSEOUT / NOT AUTHORIZED |
| K5 | CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE IFF THIS CLOSEOUT MERGE GATE PASSES |
| K5-R1 through K5-R5 | CANONICAL / COMPLETE FOR THEIR SEPARATELY AUTHORIZED BOUNDED SCOPES |
| K5-R6+ | NOT REQUIRED FOR K5 CLOSEOUT / NOT AUTHORIZED |
| K6-K7 | PROPOSED / NOT AUTHORIZED |

Engineering milestone closure or implementation authorization does not itself establish a distributable product version.

KRI-P0 and KRI-R1 through KRI-R4 are not product-version grants. K5-R1 through K5-R5 and a bounded K5 engineering closeout are likewise not product-version or release grants. K5 closeout does not authorize a concrete external reviewer adapter, provider execution, persistence or learning, writes, approvals, merges, default production routing, or Done Gate completion authority.

## Public product versions

Public product versions may later use version identifiers such as:

```text
0.x
1.x
```

No specific public version number is authorized by this document.

```text
PUBLIC RELEASE VERSION:
NOT AUTHORIZED

PACKAGE PUBLICATION:
NOT AUTHORIZED

1.0 PROMISE:
NOT ESTABLISHED
```

Version numbering, release channels, package publication, compatibility promises, support expectations, and public release criteria require separate founder decisions and applicable governance evidence.

## Separation of authority

The following statements are intentionally distinct:

```text
engineering milestone closed
!= package publishable
!= public version declared
!= production-readiness claim
!= brand launch authorized
```

Likewise:

```text
K3-R1 through K3-R6 canonical for their bounded authorized scopes
K3 closed for that accepted engineering surface
!= K3-R7+ authorized
!= complete semantic repository intelligence
!= a permanent graph/index/storage backend

K4-R1 through K4-R5 canonical for their separately authorized bounded data-only scopes
K4 closed for that accepted bounded data-only ecosystem-compatibility surface
!= K4-R6+ authorized
!= completion of every future executable direction in ADR-0007
!= MCP / ACP / Agent Skills execution authority
!= protocol transport, package installation, activation, routing, or effect grants

KRI-P0 canonical planning authority
KRI-R1 through KRI-R4 canonical for separately authorized bounded scopes
!= KRI-R5+ authorized
!= general reviewer trust or default routing authority
!= repository write authority
!= PR approval authority
!= merge authority
!= PROVEN_READY authority

K5-R1 through K5-R5 canonical for separately authorized bounded proof-review scopes
K5 closed for that accepted surface only if this exact closeout merge/post-merge gate passes
!= K5-R6+ authorized
!= KRI finding/adjudication authority transferred to K5
!= Done Gate modified
!= PROVEN_READY authority transferred to K5
!= repository write, review, approval, or merge authority
!= provider/reviewer/model execution authority
!= persistent proof storage or learning
!= K6 / K7 implementation authority
!= product release authorization
```

## K5 bounded closure and release separation

K5 closes, if this candidate passes, only the accepted engineering surface:

```text
R1 caller-materialized proof package + deterministic package judgment
R2 exact caller-materialized verification/receipt/revision linkage
R3 exact caller-materialized adjudicated KRI-evidence linkage
R4 deterministic proof-state reconciliation
R5 integrated qualification-only fixture/test/workflow evidence
```

The bounded R5 qualification record includes one disclosed first-attempt post-merge Ubuntu failure in unchanged pre-existing H4-R3G-B code and exactly one controlled same-SHA/no-drift successful rerun. `WAIVER: NONE`. This engineering evidence does not imply a release-quality, distribution-quality, or support-SLA claim.

No K5 state equals `PROVEN_READY`. `SUFFICIENT_PACKAGE`, `VALID`, and all other K5 states remain bounded proof-review states. Done Gate authority is unchanged.

## Release-gate direction

A future public-release decision should be evidence-gated and separately review at least the applicable subsets of:

- product scope and supported surfaces;
- compatibility/versioning contract;
- installation and upgrade behavior;
- security and trust posture;
- provenance/license completeness;
- required CI and platform support;
- packaging and distribution artifacts;
- benchmark/claim evidence;
- documentation and support expectations;
- brand/name/trademark status.

This list is planning direction only. It does not authorize release work or establish a release checklist as complete.

## Current authority boundary

```text
K3: CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
K3-R1 THROUGH K3-R6: CANONICAL FOR THEIR AUTHORIZED SCOPES
K3-R7+: NOT REQUIRED FOR K3 CLOSEOUT / NOT AUTHORIZED

K4: CLOSED FOR THE CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K4-R1 THROUGH K4-R5: CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K4-R6+: NOT REQUIRED FOR K4 CLOSEOUT / NOT AUTHORIZED

KRI-P0: CANONICAL PLANNING AUTHORITY
KRI-R1 THROUGH KRI-R4: CANONICAL FOR THEIR SEPARATELY AUTHORIZED BOUNDED SCOPES
KRI-R5+: NOT AUTHORIZED

K5: CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE IFF THIS CLOSEOUT MERGE GATE PASSES
K5-R1 THROUGH K5-R5: CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K5-R6+: NOT REQUIRED FOR K5 CLOSEOUT / NOT AUTHORIZED
DONE GATE MODIFICATION: NOT AUTHORIZED
PROVEN_READY AUTHORITY FROM K5: NOT AUTHORIZED

K6 / K7 IMPLEMENTATION:
NOT AUTHORIZED

CODE IMPORT:
NOT AUTHORIZED

NEW KODAC DEPENDENCIES:
NOT AUTHORIZED

EXTERNAL REVIEW SERVICE INTEGRATION:
NOT AUTHORIZED

PERSISTENT REVIEW / PROOF STORAGE OR LEARNING:
NOT AUTHORIZED

WRITE / REVIEW / APPROVAL / MERGE AUTHORITY FROM KRI OR K5:
NOT AUTHORIZED

PUBLIC RELEASE:
NOT AUTHORIZED

PACKAGE PUBLICATION:
NOT AUTHORIZED

BRAND LAUNCH:
NOT AUTHORIZED

KODAC NAME / TRADEMARK CLEARANCE:
NOT ESTABLISHED
```

## Preserved non-grants

```text
KRI-R5+ IMPLEMENTATION: NOT AUTHORIZED
K5-R6+ IMPLEMENTATION: NOT AUTHORIZED
K6 / K7 IMPLEMENTATION: NOT AUTHORIZED BY K5 CLOSEOUT
K3-R7+: NOT AUTHORIZED
K4-R6+: NOT AUTHORIZED
PROVEN_READY AUTHORITY FROM KRI OR K5: NOT AUTHORIZED
DONE GATE MODIFICATION BY THIS GATE: NOT AUTHORIZED

CUBIC SOURCE INTAKE: NOT AUTHORIZED
CODERABBIT SOURCE INTAKE: NOT AUTHORIZED
CUBIC INTEGRATION: NOT AUTHORIZED
CODERABBIT INTEGRATION: NOT AUTHORIZED
EXTERNAL REVIEW SERVICE INTEGRATION: NOT AUTHORIZED
CONCRETE EXTERNAL REVIEWER ADAPTER: NOT AUTHORIZED
PROVIDER NETWORK / SECRET HANDLING: NOT AUTHORIZED

NEW KODAC DEPENDENCIES: NOT AUTHORIZED
CODE IMPORT: NOT AUTHORIZED

PERSISTENT REVIEW / PROOF STORAGE: NOT AUTHORIZED
PERSISTENT REVIEW / PROOF LEARNING: NOT AUTHORIZED
VECTOR / EMBEDDING INFRASTRUCTURE: NOT AUTHORIZED

AUTOFIX EXECUTION: NOT AUTHORIZED
REPOSITORY WRITE AUTHORITY: NOT AUTHORIZED
GITHUB COMMENT / REVIEW WRITE AUTHORITY: NOT AUTHORIZED
PR APPROVAL AUTHORITY: NOT AUTHORIZED
MERGE AUTHORITY: NOT AUTHORIZED

RULESET CHANGE: NOT AUTHORIZED
K2 EXECUTION-AUTHORITY EXPANSION: NOT AUTHORIZED

PUBLIC RELEASE: NOT AUTHORIZED
PACKAGE PUBLICATION: NOT AUTHORIZED
BRAND LAUNCH: NOT AUTHORIZED
```

This documentation closeout does not modify `code_import_authorized` and admits no external source.

The reconciliation basis and exact canonical merge identities for KRI are recorded in `docs/planning/KODAC_KRI_R1_R4_ROADMAP_TRUTH_RECONCILIATION_2026-08-24.md`.

The bounded K3 closeout evidence is recorded in `docs/planning/KODAC_K3_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-24.md`.

The bounded K4 closeout authorization and canonical closeout evidence are recorded in `docs/planning/KODAC_K4_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-25.md` and `docs/planning/KODAC_K4_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-25.md`.

The K5 milestone definition and staged R1-R5 authorization chain begin in `docs/planning/KODAC_K5_DEFINITION_AND_R1_PROOF_PACKAGE_JUDGMENT_AUTHORIZATION_2026-08-25.md`.

The bounded K5 closeout authorization is recorded in `docs/planning/KODAC_K5_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-26.md`.

The complete K5 ledger, exact R5 qualification identities, disclosed runtime anomaly, closeout matrix, closure meaning, and preserved release/authority boundaries are recorded in `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md`.
