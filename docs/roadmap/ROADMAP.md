# Kodac Engineering Roadmap

## Authority

This document is the current Kodac engineering roadmap authority after K2 canonical closeout, canonical adoption of K3-R1 through K3-R5, authorization of the bounded K3-R6 snapshot relation-graph slice, and canonical adoption of the separately authorized bounded KRI-R1 through KRI-R4 slices. KRI-P0 remains the planning/contract-design authority from which those later, narrower implementation gates were separately authorized.

The pre-reconstitution roadmap at canonical base `11227cc8c58e00879e8b40e7ff7948bee396fef7` remains historical evidence and is superseded only as current product/roadmap authority.

Engineering milestones do not themselves authorize public release, package publication, brand launch, trademark claims, OSS intake, or implementation beyond an explicitly authorized gate.

## Canonical milestones

| Milestone | Theme | Status | Implementation authority |
| --- | --- | --- | --- |
| **K0/K1** | Architecture, governance, provenance, donor-selection foundation | **CLOSED** | Complete historical milestone |
| **K2** | Trusted Runtime Spine | **CLOSED** | Complete canonical milestone |
| **K3** | Evidence-Backed Repository Intelligence & Context Engine | **IN PROGRESS — K3-R1 THROUGH K3-R5 CANONICAL; K3-R6 AUTHORIZED / NOT YET CANONICAL; K3 NOT CLOSED** | **K3-R6 LIMITED TO THE EXACT SNAPSHOT RELATION-GRAPH AUTHORIZATION PLUS ITS REVIEW-HARDENING EXTENSION; K3-R7+ NOT AUTHORIZED** |
| **KRI-P0** | Reviewer Intelligence authorization & planning gate | **CANONICAL PLANNING AUTHORITY** | Planning/contract design only; no implementation authority from KRI-P0 alone |
| **KRI-R1 through KRI-R4** | Bounded Reviewer Intelligence evidence, contracts, provider-neutral execution, and qualification | **CANONICAL / COMPLETE FOR THEIR SEPARATELY AUTHORIZED SCOPES** | **KRI-R1 THROUGH KRI-R4 ONLY AS CANONICALLY ADOPTED; KRI-R5+ NOT AUTHORIZED** |
| **K4** | Ecosystem Compatibility & Capability Registry | **PROPOSED** | Not authorized |
| **K5** | Proof Review & Judge | **PROPOSED** | Not authorized |
| **K6** | Evidence Router & Outcome Learning | **PROPOSED** | Not authorized |
| **K7** | Kodac Bench & Distribution Hardening | **PROPOSED** | Not authorized |

## K0/K1 — Closed

Outcome:

- Kodac product and architecture constitution established;
- canonical protocol and trust boundaries established;
- provenance/license gates established;
- donor-selection discipline established;
- core ADR set accepted;
- governance foundation established.

## K2 — Closed

Outcome:

- trusted agent runtime spine;
- model/provider boundary;
- bounded agent execution;
- explicit write scope and policy;
- execution receipts and evidence;
- independent verification;
- Done Gate with `PROVEN_READY`;
- protected canonical integration and post-merge runtime proof.

## K3 — Current engineering milestone

```text
K3 — Evidence-Backed Repository Intelligence & Context Engine
STATUS: IN PROGRESS — K3-R1 THROUGH K3-R5 CANONICAL; K3-R6 AUTHORIZED; K3 NOT CLOSED
K3-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED SCOPE
K3-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED SCOPE
K3-R3: CANONICAL / COMPLETE FOR ITS AUTHORIZED SCOPE
K3-R4: CANONICAL / COMPLETE FOR ITS AUTHORIZED SCOPE
K3-R5: CANONICAL / COMPLETE FOR ITS AUTHORIZED SCOPE
K3-R6: IMPLEMENTATION PLUS NARROW REVIEW-HARDENING EXTENSION AUTHORIZED FOR THE EXACT BOUNDED SNAPSHOT RELATION-GRAPH SLICE / NOT YET CANONICAL
K3-R7+: NOT AUTHORIZED
```

Purpose:

Turn a repository and engineering task into a bounded, freshness-aware, evidence-backed representation of relevant files, symbols, definitions, references, dependencies, tests, architecture/specification context, and likely blast radius, then produce a bounded Context Bundle for model reasoning.

K3 preserves K2 execution authority. Repository intelligence can inform actions; it cannot authorize side effects.

Canonical contract direction now includes already-adopted work for:

- repository gold evidence and fixture truth;
- exact repository snapshot identity and freshness;
- bounded external-adapter benchmarking;
- bounded external ast-grep CLI structural-search adapter;
- bounded deterministic Context Engine / Context Bundle;
- evidence ordering, provenance, completeness, and identity semantics.

K3-R1 through K3-R5 are canonical only for their separately authorized scopes. K3-R6 is authorized only for a pure, immutable, in-memory relation graph bound to one exact current/complete K3-R2 snapshot, plus bounded impact and related-file queries over caller-materialized relation evidence. It is not canonical until a conforming implementation merges. K3 remains open, and K3-R7+ is not authorized.

The exact K3-R6 scope and implementation allowlist are defined in `docs/planning/KODAC_K3_R6_SNAPSHOT_RELATION_GRAPH_AUTHORIZATION_2026-08-24.md`.

The exact review-hardening extension admits only `node:util` `types.isProxy`, fail-closed structural validation, an ephemeral per-query adjacency index, and serialized graph-entity seed normalization. It is defined in `docs/planning/KODAC_K3_R6_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md`.

No permanent storage engine is selected by this roadmap. No vector or embedding infrastructure is selected.

## KRI-P0 through KRI-R4 — bounded Reviewer Intelligence

KRI-P0 is an independent cross-cutting planning gate, not K5 implementation.

KRI-P0 itself authorizes only planning and contract design. KRI-R1 through KRI-R4 were later authorized and canonically adopted through separate, bounded implementation gates:

- KRI-R1: deterministic offline test/evidence-only gold reviewer-evidence corpus;
- KRI-R2: deterministic finding/adjudication contracts and a bounded read-only runtime for materialized claims;
- KRI-R3: provider-neutral bounded reviewer execution through a caller-injected interface, with no concrete provider adapter;
- KRI-R4: pure/in-memory historical-claim-disposition qualification machinery whose default policy treats the four-case KRI-R1 corpus as insufficient evidence for broad qualification.

```text
KRI-P0: CANONICAL PLANNING AUTHORITY
KRI-R1 THROUGH KRI-R4: CANONICAL / COMPLETE FOR THEIR SEPARATELY AUTHORIZED SCOPES
KRI-R5+: NOT AUTHORIZED
K5 IMPLEMENTATION: NOT AUTHORIZED
```

Reviewer output remains a claim requiring adjudication, not completion truth. Qualification is bounded engineering evidence, not general reviewer trust, finding truth, default routing authority, or production readiness. K2 remains the sole trusted side-effect execution authority and the existing Done Gate remains the `PROVEN_READY` authority under accepted contracts.

The reconciliation basis and exact canonical merge identities are recorded in `docs/planning/KODAC_KRI_R1_R4_ROADMAP_TRUTH_RECONCILIATION_2026-08-24.md`.

## K4 — Proposed: Ecosystem Compatibility & Capability Registry

Proposed direction only:

- MCP compatibility behind Kodac adapters and trust boundaries;
- ACP compatibility behind Kodac-owned canonical contracts;
- Agent Skills compatibility and governance metadata;
- capability registry and normalized capability identities.

This roadmap entry is not implementation authorization and does not supersede ADR-0007.

## K5 — Proposed: Proof Review & Judge

Proposed direction only:

- evidence-backed review findings;
- verification linkage;
- proof-oriented review artifacts;
- independent completion judgment;
- stronger separation between model assertion and completion truth.

KRI-P0 and the bounded KRI-R1 through KRI-R4 slices may become future inputs or prerequisites, but they do not authorize K5.

## K6 — Proposed: Evidence Router & Outcome Learning

Proposed direction only:

- evidence-backed capability/model/evaluator routing;
- task/risk/context-aware routing decisions;
- privacy-governed outcome learning;
- measurable feedback from verified engineering outcomes.

## K7 — Proposed: Kodac Bench & Distribution Hardening

Proposed direction only:

- reproducible benchmark infrastructure;
- cross-system comparison evidence;
- product and packaging hardening;
- distribution/readiness gates;
- release evidence discipline.

K7 does not itself authorize distribution or public release.

## Roadmap rules

1. `Defined`, `authorized for planning`, `implementation authorized`, `implemented`, `canonical`, `closed`, and `released` are distinct states.
2. A roadmap entry never grants source-intake or implementation authority by implication.
3. K3-R1 through K3-R5 are canonical only for their already-authorized scopes; K3-R6 is implementation-authorized only for its exact bounded gate plus its narrow review-hardening extension and remains non-canonical until merge; K3-R7+ remains unauthorized.
4. KRI-P0 grants planning/contract-design authority only; KRI-R1 through KRI-R4 are canonical only for their separately authorized bounded scopes, while KRI-R5+ and K5 implementation remain unauthorized.
5. Storage engines, donors, models, protocols, and implementation tactics remain replaceable behind accepted Kodac boundaries unless separately ratified.
6. Superiority claims require reproducible benchmark evidence.
7. Public product versions and engineering milestones are separate governance tracks.

## Current boundary

```text
K0/K1: CLOSED
K2: CLOSED
K3: IN PROGRESS — K3-R1 THROUGH K3-R5 CANONICAL; K3 NOT CLOSED
K3-R6: EXACT BOUNDED SNAPSHOT RELATION-GRAPH IMPLEMENTATION PLUS REVIEW-HARDENING EXTENSION AUTHORIZED / NOT YET CANONICAL
K3-R7+: NOT AUTHORIZED

KRI-P0: CANONICAL PLANNING AUTHORITY
KRI-R1 THROUGH KRI-R4: CANONICAL FOR THEIR SEPARATELY AUTHORIZED BOUNDED SCOPES
KRI-R5+: NOT AUTHORIZED
K5: PROPOSED / NOT AUTHORIZED

CODE IMPORT: NOT AUTHORIZED
NEW KODAC DEPENDENCIES: NOT AUTHORIZED
EXTERNAL REVIEW SERVICE INTEGRATION: NOT AUTHORIZED
PERSISTENT REVIEW STORAGE / LEARNING: NOT AUTHORIZED
REPOSITORY WRITE / REVIEW / APPROVAL / MERGE AUTHORITY: NOT AUTHORIZED BY KRI-P0 OR KRI-R1 THROUGH KRI-R4

PERSISTENT STORAGE: NOT AUTHORIZED
VECTOR / EMBEDDING INFRASTRUCTURE: NOT AUTHORIZED
PUBLIC RELEASE: NOT AUTHORIZED
PACKAGE PUBLICATION: NOT AUTHORIZED
BRAND LAUNCH: NOT AUTHORIZED
KODAC NAME / TRADEMARK CLEARANCE: NOT ESTABLISHED
```

## KRI-P0 through KRI-R4 preserved non-grants

```text
KRI-R5+ IMPLEMENTATION: NOT AUTHORIZED
K5 IMPLEMENTATION: NOT AUTHORIZED
K3-R6 SCOPE EXPANSION BEYOND THE EXACT AUTHORIZATION AND REVIEW-HARDENING EXTENSION: NOT AUTHORIZED
K3-R7+: NOT AUTHORIZED

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
