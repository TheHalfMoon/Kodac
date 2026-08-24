# Kodac Version Plan

## Purpose

Kodac engineering milestones and public product versions are separate governance tracks.

This document removes the obsolete Kernux observability version promises from current roadmap authority. The earlier content remains recoverable from repository history and the pre-reconstitution canonical base.

## Engineering milestones

Engineering milestones describe architectural and technical progress:

```text
K0/K1 — architecture, governance, provenance, donor-selection foundation
K2    — trusted runtime spine
K3    — evidence-backed repository intelligence & context engine
KRI-P0 — Reviewer Intelligence planning / contract design authority
KRI-R1 through KRI-R4 — separately authorized bounded Reviewer Intelligence slices
K4+   — later milestones only when separately defined/authorized
```

Current state:

| Engineering milestone / gate | Status |
| --- | --- |
| K0/K1 | CLOSED |
| K2 | CLOSED |
| K3 | IN PROGRESS; K3-R1 THROUGH K3-R5 CANONICAL FOR THEIR AUTHORIZED SCOPES; K3 NOT CLOSED |
| K3-R6+ | NOT AUTHORIZED |
| KRI-P0 | CANONICAL PLANNING AUTHORITY |
| KRI-R1 through KRI-R4 | CANONICAL / COMPLETE FOR THEIR SEPARATELY AUTHORIZED BOUNDED SCOPES |
| KRI-R5+ | NOT AUTHORIZED |
| K4-K7 | PROPOSED / NOT AUTHORIZED |

Engineering milestone closure does not itself establish a distributable product version.

KRI-P0 and KRI-R1 through KRI-R4 are not product-version grants. The bounded implemented slices do not authorize KRI-R5+, K5, a concrete external reviewer adapter, persistent storage or learning, writes, approvals, merges, default production routing, or completion decisions.

## Public product versions

Public product versions may later use version identifiers such as:

```text
0.x
1.x
```

No specific public version number is authorized by this document.

In particular:

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
K3-R1 through K3-R5 canonical
!= K3 closed
!= K3-R6+ authorized

KRI-P0 canonical planning authority
KRI-R1 through KRI-R4 canonical for separately authorized bounded scopes
!= KRI-R5+ authorized
!= K5 implementation authorized
!= general reviewer trust or default routing authority
!= repository write authority
!= PR approval authority
!= merge authority
!= PROVEN_READY authority
```

## Release-gate direction

A future public-release decision should be evidence-gated and separately reviewed at least the applicable subsets of:

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
K3: IN PROGRESS / NOT CLOSED
K3-R1 THROUGH K3-R5: CANONICAL FOR THEIR AUTHORIZED SCOPES
K3-R6+: NOT AUTHORIZED

KRI-P0: CANONICAL PLANNING AUTHORITY
KRI-R1 THROUGH KRI-R4: CANONICAL FOR THEIR SEPARATELY AUTHORIZED BOUNDED SCOPES
KRI-R5+: NOT AUTHORIZED
K5 IMPLEMENTATION: NOT AUTHORIZED

CODE IMPORT:
NOT AUTHORIZED

NEW KODAC DEPENDENCIES:
NOT AUTHORIZED

EXTERNAL REVIEW SERVICE INTEGRATION:
NOT AUTHORIZED

WRITE / REVIEW / APPROVAL / MERGE AUTHORITY FROM KRI-P0 OR KRI-R1 THROUGH KRI-R4:
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

## KRI-P0 through KRI-R4 preserved non-grants

```text
KRI-R5+ IMPLEMENTATION: NOT AUTHORIZED
K5 IMPLEMENTATION: NOT AUTHORIZED
K3-R6+: NOT AUTHORIZED

CUBIC SOURCE INTAKE: NOT AUTHORIZED
CODERABBIT SOURCE INTAKE: NOT AUTHORIZED
CUBIC INTEGRATION: NOT AUTHORIZED
CODERABBIT INTEGRATION: NOT AUTHORIZED
EXTERNAL REVIEW SERVICE INTEGRATION: NOT AUTHORIZED

NEW KODAC DEPENDENCIES: NOT AUTHORIZED
CODE IMPORT: NOT AUTHORIZED

PERSISTENT REVIEW STORAGE: NOT AUTHORIZED
PERSISTENT REVIEW LEARNING: NOT AUTHORIZED
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

This documentation gate does not modify `code_import_authorized` and admits no external source.

The reconciliation basis and exact canonical merge identities are recorded in `docs/planning/KODAC_KRI_R1_R4_ROADMAP_TRUTH_RECONCILIATION_2026-08-24.md`.
