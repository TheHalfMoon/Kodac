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
K4    — ecosystem compatibility & capability registry; canonical R1 plus exact R2 gate only as separately authorized
K5+   — later milestones only when separately defined/authorized
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
| K4 | DEFINED / IN PROGRESS / NOT CLOSED |
| K4-R1 | CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE |
| K4-R2 | EXACT CALLER-MATERIALIZED DATA-ONLY MCP CATALOG-EVIDENCE IMPLEMENTATION AUTHORIZED / NOT YET CANONICAL |
| K4-R2 PREIMPLEMENTATION K4-R1 WORKFLOW HARDENING | EXACT ONE-PATH IMPLEMENTATION AUTHORIZED / REQUIRED BEFORE K4-R2 SOURCE |
| K4-R3+ | NOT AUTHORIZED |
| K5-K7 | PROPOSED / NOT AUTHORIZED |

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
K3-R1 through K3-R6 canonical for their bounded authorized scopes
K3 closed for that accepted engineering surface
!= K3-R7+ authorized
!= complete semantic repository intelligence
!= a permanent graph/index/storage backend

K4 defined
K4-R1 canonical for its exact data-only normalization scope
K4-R2 exact caller-materialized data-only MCP catalog-evidence implementation authorized
K4-R2 exact preimplementation K4-R1 canonical-regression workflow hardening required before source
!= K4 closed
!= K4-R2 canonical
!= K4-R3+ authorized
!= MCP / ACP / Agent Skills execution authority
!= skill allowed-tools approved by Kodac

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
K3: CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
K3-R1 THROUGH K3-R6: CANONICAL FOR THEIR AUTHORIZED SCOPES
K3-R7+: NOT REQUIRED FOR K3 CLOSEOUT / NOT AUTHORIZED

K4: DEFINED / IN PROGRESS / NOT CLOSED
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2: EXACT CALLER-MATERIALIZED DATA-ONLY MCP CATALOG-EVIDENCE IMPLEMENTATION AUTHORIZED / NOT YET CANONICAL
K4-R2 PREIMPLEMENTATION K4-R1 WORKFLOW HARDENING: EXACT ONE-PATH IMPLEMENTATION AUTHORIZED / REQUIRED BEFORE K4-R2 SOURCE
K4-R3+: NOT AUTHORIZED

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
K3-R6 SCOPE EXPANSION BEYOND THE EXACT AUTHORIZATION AND REVIEW-HARDENING EXTENSION: NOT AUTHORIZED
K3-R7+: NOT AUTHORIZED
K4-R1 SCOPE EXPANSION BEYOND THE DATA-ONLY NORMALIZATION AUTHORIZATION: NOT AUTHORIZED
K4-R2 SCOPE EXPANSION BEYOND THE CALLER-MATERIALIZED MCP CATALOG-EVIDENCE AUTHORIZATION: NOT AUTHORIZED
K4-R2 SOURCE PR BEFORE CANONICAL K4-R1 WORKFLOW HARDENING: NOT AUTHORIZED
K4-R3+: NOT AUTHORIZED

CUBIC SOURCE INTAKE: NOT AUTHORIZED
CODERABBIT SOURCE INTAKE: NOT AUTHORIZED
CUBIC INTEGRATION: NOT AUTHORIZED
CODERABBIT INTEGRATION: NOT AUTHORIZED
EXTERNAL REVIEW SERVICE INTEGRATION: NOT AUTHORIZED
CONCRETE EXTERNAL REVIEWER ADAPTER: NOT AUTHORIZED
PROVIDER NETWORK / SECRET HANDLING: NOT AUTHORIZED

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

The exact K3-R6 scope and implementation allowlist are defined in `docs/planning/KODAC_K3_R6_SNAPSHOT_RELATION_GRAPH_AUTHORIZATION_2026-08-24.md`.

The narrow `node:util` Proxy-rejection, structural-input, adjacency-index, and serialized-seed review-hardening extension is defined in `docs/planning/KODAC_K3_R6_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md`.

The bounded K3 closure evidence, canonical implementation ledger, and preserved non-grants are recorded in `docs/planning/KODAC_K3_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-24.md`.

The K4 definition, current official standard pins, exact K4-R1 implementation allowlist, and non-executable normalization boundaries are recorded in `docs/planning/KODAC_K4_DEFINITION_AND_R1_COMPATIBILITY_NORMALIZATION_AUTHORIZATION_2026-08-24.md`.

The exact K4-R1 implementation ledger, qualified identity, review evidence, proof matrix, canonical surface, and preserved non-grants are recorded in `docs/planning/KODAC_K4_R1_COMPATIBILITY_NORMALIZATION_CANONICAL_EVIDENCE_2026-08-24.md`.

The exact K4-R2 caller-materialized MCP catalog-evidence contract, primary-source basis, implementation allowlist, required proofs, and preserved non-grants are recorded in `docs/planning/KODAC_K4_R2_CALLER_MATERIALIZED_MCP_CATALOG_EVIDENCE_AUTHORIZATION_2026-08-24.md`.

The exact preimplementation shared-export CI-gate conflict, one-path K4-R1 canonical-regression hardening, self-canonicalizing merge proof, and unchanged K4-R2 five-path allowlist are recorded in `docs/planning/KODAC_K4_R2_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md`.
