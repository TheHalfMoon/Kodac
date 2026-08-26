# Kodac Version Plan

## Purpose

Kodac engineering milestones and public product versions are separate governance tracks.

This document removes the obsolete Kernux observability version promises from current roadmap authority. The earlier content remains recoverable from repository history and the pre-reconstitution canonical base.

K4 bounded closeout is canonical at merge `dcd3693826d9282b475d99c6b9e658b9695e63a8` after its required exact-head and post-merge proof.

**K5 closeout-candidate rule:** K5-R1 through K5-R5 are already canonical for their separately authorized bounded scopes, and the bounded K5 closeout authorization is canonical at merge `f1457f8e7efd1e09e2d55e73fc0e4ea860bf8762`. Every K5 `CLOSED` statement in this candidate is conditional until the exact-head closeout gate, expected-head merge, and required post-merge ordered-parent/tree/blob/protected-main verification in `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md` all pass. Until then K5 remains defined/in progress; R1-R5 remain canonical.

## Engineering milestones

Engineering milestones describe architectural and technical progress:

```text
K0/K1 — architecture, governance, provenance, donor-selection foundation
K2    — trusted runtime spine
K3    — evidence-backed repository intelligence & context engine
KRI-P0 — Reviewer Intelligence planning / contract design authority
KRI-R1 through KRI-R4 — separately authorized bounded Reviewer Intelligence slices
K4    — ecosystem compatibility & capability registry; closed for canonical bounded R1-R5 data-only evidence surfaces
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
| K4-R1 | CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE |
| K4-R2 | CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY SCOPE |
| K4-R2 PREIMPLEMENTATION K4-R1 WORKFLOW HARDENING | CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH SCOPE |
| K4-R2 CANONICAL-REGRESSION WORKFLOW HARDENING | CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH PREREQUISITE SCOPE |
| K4-R3 | CANONICAL / COMPLETE FOR ITS AUTHORIZED PINNED DATA-ONLY ACP V2 METHOD-CATALOG EVIDENCE SCOPE |
| K4-R4 | CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY AGENT SKILL PACKAGE EVIDENCE SCOPE |
| K4-R5 | CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY AGENT SKILL GOVERNANCE-CLAIM EVIDENCE SCOPE |
| K4-R6+ | NOT REQUIRED FOR K4 CLOSEOUT / NOT AUTHORIZED |
| K5 | CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE IFF THIS CLOSEOUT MERGE GATE PASSES |
| K5-R1 through K5-R5 | CANONICAL / COMPLETE FOR THEIR SEPARATELY AUTHORIZED BOUNDED SCOPES |
| K5-R6+ | NOT REQUIRED FOR K5 CLOSEOUT / NOT AUTHORIZED |
| K6-K7 | PROPOSED / NOT AUTHORIZED |

Engineering milestone closure or implementation authorization does not itself establish a distributable product version.

KRI-P0 and KRI-R1 through KRI-R4 are not product-version grants. K5-R1 through K5-R5 and a bounded K5 closeout are likewise not product-version or release grants. K5 closeout does not authorize a concrete external reviewer adapter, persistence or learning, writes, approvals, merges, default production routing, or Done Gate completion authority.

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

K4-R1 through K4-R5 canonical for their separately authorized bounded data-only scopes
K4 closed for that accepted bounded data-only ecosystem-compatibility surface
!= K4-R6+ authorized
!= completion of every future executable direction in ADR-0007
!= MCP / ACP / Agent Skills execution authority
!= skill allowed-tools approved by Kodac
!= protocol transport, package installation, activation, routing, or effect grants

KRI-P0 canonical planning authority
KRI-R1 through KRI-R4 canonical for separately authorized bounded scopes
!= KRI-R5+ authorized
!= general reviewer trust or default routing authority
!= repository write authority
!= PR approval authority
!= merge authority
!= PROVEN_READY authority

K5-R1 through K5-R5 canonical for their separately authorized bounded proof-review scopes
K5 closed for that accepted surface only if this exact closeout merge/post-merge gate passes
!= K5-R6+ authorized
!= KRI finding/adjudication authority transferred to K5
!= Done Gate modified
!= PROVEN_READY authority transferred to K5
!= repository write, approval, or merge authority
!= provider/reviewer/model execution authority
!= persistent proof storage, learning, or routing
!= K6 / K7 implementation authority
!= product release authorization
```

The R5 post-merge record includes one disclosed first-attempt Ubuntu failure in unchanged pre-existing H4-R3G-B code and exactly one controlled same-SHA/no-drift successful rerun with final `k2-runtime-gate` success. `WAIVER: NONE`; this engineering evidence does not imply a release-quality or support-SLA claim.

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

## KRI-P0 through KRI-R4 and K5 preserved non-grants

```text
KRI-R5+ IMPLEMENTATION: NOT AUTHORIZED
K5-R6+ IMPLEMENTATION: NOT AUTHORIZED
K6 / K7 IMPLEMENTATION: NOT AUTHORIZED BY K5 CLOSEOUT
K3-R6 SCOPE EXPANSION BEYOND THE EXACT AUTHORIZATION AND REVIEW-HARDENING EXTENSION: NOT AUTHORIZED
K3-R7+: NOT AUTHORIZED
K4-R1 SCOPE EXPANSION BEYOND THE DATA-ONLY NORMALIZATION AUTHORIZATION: NOT AUTHORIZED
K4-R2 SCOPE EXPANSION BEYOND THE CALLER-MATERIALIZED MCP CATALOG-EVIDENCE AUTHORIZATION: NOT AUTHORIZED
K4-R2 SOURCE PR BEFORE CANONICAL K4-R1 WORKFLOW HARDENING: NOT AUTHORIZED
K4-R3 SCOPE EXPANSION BEYOND THE PINNED ACP V2 METHOD-CATALOG AUTHORIZATION: NOT AUTHORIZED
K4-R3 SOURCE PR BEFORE CANONICAL K4-R2 WORKFLOW HARDENING: NOT AUTHORIZED
K4-R4 SCOPE EXPANSION BEYOND THE CALLER-MATERIALIZED AGENT SKILL PACKAGE-EVIDENCE AUTHORIZATION: NOT AUTHORIZED
K4-R5 SCOPE EXPANSION BEYOND THE CALLER-MATERIALIZED AGENT SKILL GOVERNANCE-CLAIM EVIDENCE AUTHORIZATION: NOT AUTHORIZED
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

This documentation gate does not modify `code_import_authorized` and admits no external source.

The reconciliation basis and exact canonical merge identities are recorded in `docs/planning/KODAC_KRI_R1_R4_ROADMAP_TRUTH_RECONCILIATION_2026-08-24.md`.

The exact K3-R6 scope and implementation allowlist are defined in `docs/planning/KODAC_K3_R6_SNAPSHOT_RELATION_GRAPH_AUTHORIZATION_2026-08-24.md`.

The narrow `node:util` Proxy-rejection, structural-input, adjacency-index, and serialized-seed review-hardening extension is defined in `docs/planning/KODAC_K3_R6_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md`.

The bounded K3 closure evidence, canonical implementation ledger, and preserved non-grants are recorded in `docs/planning/KODAC_K3_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-24.md`.

The K4 definition, current official standard pins, exact K4-R1 implementation allowlist, and non-executable normalization boundaries are recorded in `docs/planning/KODAC_K4_DEFINITION_AND_R1_COMPATIBILITY_NORMALIZATION_AUTHORIZATION_2026-08-24.md`.

The exact K4-R1 implementation ledger, qualified identity, review evidence, proof matrix, canonical surface, and preserved non-grants are recorded in `docs/planning/KODAC_K4_R1_COMPATIBILITY_NORMALIZATION_CANONICAL_EVIDENCE_2026-08-24.md`.

The exact K4-R2 caller-materialized MCP catalog-evidence contract, primary-source basis, implementation allowlist, required proofs, and preserved non-grants are recorded in `docs/planning/KODAC_K4_R2_CALLER_MATERIALIZED_MCP_CATALOG_EVIDENCE_AUTHORIZATION_2026-08-24.md`.

The exact preimplementation shared-export CI-gate conflict, one-path K4-R1 canonical-regression hardening, self-canonicalizing merge proof, and unchanged K4-R2 five-path allowlist are recorded in `docs/planning/KODAC_K4_R2_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md`.

The exact K4-R2 implementation ledger, qualified identity, review evidence, proof matrix, canonical surface, and preserved non-grants are recorded in `docs/planning/KODAC_K4_R2_CALLER_MATERIALIZED_MCP_CATALOG_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md`.

The exact pinned ACP v2 primary-source basis, 16-method catalog contract, ordered one-path K4-R2 canonical-regression workflow prerequisite, five-path K4-R3 implementation allowlist, required proofs, and preserved non-grants are recorded in `docs/planning/KODAC_K4_R3_PINNED_ACP_V2_METHOD_CATALOG_EVIDENCE_AUTHORIZATION_2026-08-24.md`.

The exact K4-R2 prerequisite-hardening identity, K4-R3 implementation ledger, qualified identity, review evidence, proof matrix, canonical surface, and preserved non-grants are recorded in `docs/planning/KODAC_K4_R3_PINNED_ACP_V2_METHOD_CATALOG_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md`.

The exact K4-R4 caller-materialized portable metadata and redacted content/provenance evidence contract, Agent Skills primary-source basis, five-path implementation allowlist, required proofs, and preserved non-grants are recorded in `docs/planning/KODAC_K4_R4_CALLER_MATERIALIZED_AGENT_SKILL_PACKAGE_EVIDENCE_AUTHORIZATION_2026-08-24.md`.

The exact K4-R4 implementation ledger, qualified identity, review evidence, proof matrix, canonical surface, and preserved non-grants are recorded in `docs/planning/KODAC_K4_R4_CALLER_MATERIALIZED_AGENT_SKILL_PACKAGE_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md`.

The exact K4-R5 caller-materialized governance-claim evidence contract, K4-R4 dependency basis, five-path implementation allowlist, required proofs, and preserved non-grants are recorded in `docs/planning/KODAC_K4_R5_CALLER_MATERIALIZED_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_AUTHORIZATION_2026-08-24.md`.

The exact K4-R5 implementation ledger, qualified identity, review evidence, proof matrix, canonical surface, and preserved non-grants are recorded in `docs/planning/KODAC_K4_R5_CALLER_MATERIALIZED_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md`.

The bounded K4 closeout authorization is recorded in `docs/planning/KODAC_K4_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-25.md`.

The canonical K4 ledger, bounded exit-evidence matrix, closure meaning, platform applicability, and preserved non-grants are recorded in `docs/planning/KODAC_K4_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-25.md`.

The K5 milestone definition and staged R1-R5 authorization chain begin in `docs/planning/KODAC_K5_DEFINITION_AND_R1_PROOF_PACKAGE_JUDGMENT_AUTHORIZATION_2026-08-25.md`.

The bounded K5 closeout authorization is recorded in `docs/planning/KODAC_K5_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-26.md`.

The complete K5 ledger, exact R5 qualification identities, disclosed runtime anomaly, closeout matrix, closure meaning, and preserved release/authority boundaries are recorded in `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md`.
