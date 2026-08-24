# Kodac Engineering Roadmap

## Authority

This document is the current Kodac engineering roadmap authority after K2 canonical closeout, canonical adoption and bounded closeout of K3-R1 through K3-R6, canonical adoption of the separately authorized bounded KRI-R1 through KRI-R4 slices, and definition of K4 with canonical K4-R1 data-only compatibility normalization, canonical K4-R2 caller-materialized MCP catalog evidence, canonical K4-R3 pinned ACP v2 method-catalog evidence, and canonical K4-R4 caller-materialized data-only Agent Skill package evidence. KRI-P0 remains the planning/contract-design authority from which those later, narrower implementation gates were separately authorized.

The pre-reconstitution roadmap at canonical base `11227cc8c58e00879e8b40e7ff7948bee396fef7` remains historical evidence and is superseded only as current product/roadmap authority.

Engineering milestones do not themselves authorize public release, package publication, brand launch, trademark claims, OSS intake, or implementation beyond an explicitly authorized gate.

## Canonical milestones

| Milestone | Theme | Status | Implementation authority |
| --- | --- | --- | --- |
| **K0/K1** | Architecture, governance, provenance, donor-selection foundation | **CLOSED** | Complete historical milestone |
| **K2** | Trusted Runtime Spine | **CLOSED** | Complete canonical milestone |
| **K3** | Evidence-Backed Repository Intelligence & Context Engine | **CLOSED — K3-R1 THROUGH K3-R6 CANONICAL FOR THEIR BOUNDED AUTHORIZED SCOPES** | Complete canonical milestone; K3-R7+ is not required for closeout and remains unauthorized |
| **KRI-P0** | Reviewer Intelligence authorization & planning gate | **CANONICAL PLANNING AUTHORITY** | Planning/contract design only; no implementation authority from KRI-P0 alone |
| **KRI-R1 through KRI-R4** | Bounded Reviewer Intelligence evidence, contracts, provider-neutral execution, and qualification | **CANONICAL / COMPLETE FOR THEIR SEPARATELY AUTHORIZED SCOPES** | **KRI-R1 THROUGH KRI-R4 ONLY AS CANONICALLY ADOPTED; KRI-R5+ NOT AUTHORIZED** |
| **K4** | Ecosystem Compatibility & Capability Registry | **DEFINED / IN PROGRESS — K4-R1/R2/R3/R4 CANONICAL** | K4-R1/R2/R3/R4 as canonically adopted for their exact bounded scopes; K4-R5+ not authorized |
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

## K3 — Closed

```text
K3 — Evidence-Backed Repository Intelligence & Context Engine
STATUS: CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
K3-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED SCOPE
K3-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED SCOPE
K3-R3: CANONICAL / COMPLETE FOR ITS AUTHORIZED SCOPE
K3-R4: CANONICAL / COMPLETE FOR ITS AUTHORIZED SCOPE
K3-R5: CANONICAL / COMPLETE FOR ITS AUTHORIZED SCOPE
K3-R6: CANONICAL / COMPLETE FOR ITS AUTHORIZED BOUNDED SNAPSHOT RELATION-GRAPH SCOPE
K3-R7+: NOT REQUIRED FOR K3 CLOSEOUT / NOT AUTHORIZED
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
- immutable snapshot-bound relation evidence;
- bounded deterministic impact and related-file queries;
- evidence ordering, provenance, completeness, and identity semantics.

K3-R1 through K3-R6 are canonical only for their separately authorized bounded scopes. K3-R6 is a pure, immutable, in-memory relation graph bound to one exact current/complete K3-R2 snapshot, plus bounded impact and related-file queries over caller-materialized relation evidence. K3 is closed on that accepted surface; K3-R7+ is neither required for closure nor authorized.

The exact K3-R6 scope and implementation allowlist are defined in `docs/planning/KODAC_K3_R6_SNAPSHOT_RELATION_GRAPH_AUTHORIZATION_2026-08-24.md`.

The exact review-hardening extension admits only `node:util` `types.isProxy`, fail-closed structural validation, an ephemeral per-query adjacency index, and serialized graph-entity seed normalization. It is defined in `docs/planning/KODAC_K3_R6_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md`.

The canonical ledger, exit-evidence matrix, platform applicability, closure meaning, and non-grants are recorded in `docs/planning/KODAC_K3_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-24.md`.

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

## K4 — Defined / in progress: Ecosystem Compatibility & Capability Registry

K4 preserves the ADR-0007 direction:

- MCP compatibility behind Kodac adapters and trust boundaries;
- ACP compatibility behind Kodac-owned canonical contracts;
- Agent Skills compatibility and governance metadata;
- capability registry and normalized capability identities.

The bounded K4 surface remains deliberately narrow:

```text
K4-R1: DATA-ONLY STANDARD PINS + EXTERNAL-CAPABILITY NORMALIZATION
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2: CALLER-MATERIALIZED DATA-ONLY MCP CATALOG EVIDENCE
K4-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY SCOPE
K4-R2 PREIMPLEMENTATION K4-R1 WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH SCOPE
K4-R2 CANONICAL-REGRESSION WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH PREREQUISITE SCOPE
K4-R3: CANONICAL / COMPLETE FOR ITS AUTHORIZED PINNED DATA-ONLY ACP V2 METHOD-CATALOG EVIDENCE SCOPE
K4-R4: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY AGENT SKILL PACKAGE EVIDENCE SCOPE
K4-R5+: NOT AUTHORIZED
```

K4-R1 canonically pins exact MCP, ACP, and Agent Skills specification revisions and implements immutable bindings from opaque external object names to the existing H1 semantic capability identifiers. It uses only explicit `UNRESOLVED`, `SINGLE`, or `COMPOSITE` dispositions and a pure in-memory registry bound to canonical H1 adapter descriptors.

K4-R1 does not authorize a protocol transport, MCP client/server, ACP agent/client, skill parser/installer/activation path, script or hook execution, network/filesystem/process/secret authority, executable registry, persistent marketplace, or K2 authority change. External discovery, portable `allowed-tools` metadata, normalization, and registry membership never grant execution permission.

The exact source pins, implementation allowlist, proofs, and non-grants are defined in `docs/planning/KODAC_K4_DEFINITION_AND_R1_COMPATIBILITY_NORMALIZATION_AUTHORIZATION_2026-08-24.md`.

The canonical implementation ledger, qualified identity, review evidence, proof matrix, and preserved boundaries are recorded in `docs/planning/KODAC_K4_R1_COMPATIBILITY_NORMALIZATION_CANONICAL_EVIDENCE_2026-08-24.md`.

K4-R2 may correlate already-materialized MCP `tools/list`, `resources/list`, or `prompts/list` page digests with one exact immutable K4-R1 binding snapshot and derive only `UNBOUND`, `CURRENT`, or `STALE` evidence. It cannot send or parse JSON-RPC, contact a server, traverse a cursor, assemble pages, cache, read a resource, retrieve a prompt, invoke a tool, interpret raw metadata, or grant authority.

The exact K4-R2 primary-source basis, caller-materialized contract, five-path implementation allowlist, required proofs, and preserved non-grants are defined in `docs/planning/KODAC_K4_R2_CALLER_MATERIALIZED_MCP_CATALOG_EVIDENCE_AUTHORIZATION_2026-08-24.md`.

The shared `src/index.ts` trigger inherited from the one-time K4-R1 implementation gate was canonically hardened before K4-R2 source began. `docs/planning/KODAC_K4_R2_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md` records the self-canonicalizing rule satisfied by PR #175 and the continuing K4-R1 canonical-regression gate while leaving the K4-R2 five-path implementation allowlist unchanged.

The exact K4-R2 implementation ledger, qualification, review, conditional canonical surface, evidence merge gate, and preserved boundaries are recorded in `docs/planning/KODAC_K4_R2_CALLER_MATERIALIZED_MCP_CATALOG_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md`.

K4-R3 may materialize only the exact pinned ACP v2 16-method inventory and correlate deterministic method metadata with one immutable K4-R1 binding snapshot. It cannot send or parse JSON-RPC, connect a client or agent, advertise or negotiate capabilities, authenticate, operate a session, prompt, request permission, access a filesystem or terminal, deliver updates, elicit data, process cancellation, interpret custom methods or `_meta`, or grant authority.

The exact K4-R3 primary-source basis, closed catalog contract, ordered one-path K4-R2 canonical-regression workflow prerequisite, five-path implementation allowlist, required proofs, and preserved non-grants are defined in `docs/planning/KODAC_K4_R3_PINNED_ACP_V2_METHOD_CATALOG_EVIDENCE_AUTHORIZATION_2026-08-24.md`.

The exact K4-R2 prerequisite-hardening identity, K4-R3 implementation ledger, qualification, review, canonical surface, evidence merge gate, and preserved boundaries are recorded in `docs/planning/KODAC_K4_R3_PINNED_ACP_V2_METHOD_CATALOG_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md`.

K4-R4 may validate only caller-materialized portable metadata plus redacted content/provenance identities, derive immutable package evidence, and correlate it with one exact K4-R1 `AGENT_SKILL` binding snapshot. It cannot discover or read a package, parse YAML or Markdown, emit raw untrusted text, resolve references or paths, install or activate a skill, interpret `allowed-tools`, qualify trust, or load or execute instructions, scripts, hooks, commands, assets, or binaries.

The exact K4-R4 primary-source basis, closed redacted evidence contract, five-path implementation allowlist, required proofs, and preserved non-grants are defined in `docs/planning/KODAC_K4_R4_CALLER_MATERIALIZED_AGENT_SKILL_PACKAGE_EVIDENCE_AUTHORIZATION_2026-08-24.md`.

The exact K4-R4 implementation ledger, qualified identity, review evidence, proof matrix, canonical surface, evidence merge gate, and preserved boundaries are recorded in `docs/planning/KODAC_K4_R4_CALLER_MATERIALIZED_AGENT_SKILL_PACKAGE_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md`.

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
3. K3-R1 through K3-R6 are canonical only for their already-authorized bounded scopes; K3 closure does not authorize K3-R7+ or expand any accepted K3 contract.
4. K4 is defined; K4-R1, K4-R2, K4-R3, and K4-R4 are canonical only for their exact bounded data-only scopes. K4-R5+ remains unauthorized, and no external standard name, declaration, method, metadata, digest, cache hint, capability advertisement, package evidence, `allowed-tools` declaration, or registry membership is executable authority.
5. KRI-P0 grants planning/contract-design authority only; KRI-R1 through KRI-R4 are canonical only for their separately authorized bounded scopes, while KRI-R5+ and K5 implementation remain unauthorized.
6. Storage engines, donors, models, protocols, and implementation tactics remain replaceable behind accepted Kodac boundaries unless separately ratified.
7. Superiority claims require reproducible benchmark evidence.
8. Public product versions and engineering milestones are separate governance tracks.

## Current boundary

```text
K0/K1: CLOSED
K2: CLOSED
K3: CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
K3-R1 THROUGH K3-R6: CANONICAL FOR THEIR AUTHORIZED SCOPES
K3-R7+: NOT REQUIRED FOR K3 CLOSEOUT / NOT AUTHORIZED

K4: DEFINED / IN PROGRESS
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY SCOPE
K4-R2 PREIMPLEMENTATION K4-R1 WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH SCOPE
K4-R2 CANONICAL-REGRESSION WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH PREREQUISITE SCOPE
K4-R3: CANONICAL / COMPLETE FOR ITS AUTHORIZED PINNED DATA-ONLY ACP V2 METHOD-CATALOG EVIDENCE SCOPE
K4-R4: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY AGENT SKILL PACKAGE EVIDENCE SCOPE
K4-R5+: NOT AUTHORIZED

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
K4-R1 SCOPE EXPANSION BEYOND THE DATA-ONLY NORMALIZATION AUTHORIZATION: NOT AUTHORIZED
K4-R2 SCOPE EXPANSION BEYOND THE CALLER-MATERIALIZED MCP CATALOG-EVIDENCE AUTHORIZATION: NOT AUTHORIZED
K4-R2 SOURCE PR BEFORE CANONICAL K4-R1 WORKFLOW HARDENING: NOT AUTHORIZED
K4-R3 SCOPE EXPANSION BEYOND THE PINNED ACP V2 METHOD-CATALOG AUTHORIZATION: NOT AUTHORIZED
K4-R3 SOURCE PR BEFORE CANONICAL K4-R2 WORKFLOW HARDENING: NOT AUTHORIZED
K4-R4 SCOPE EXPANSION BEYOND THE CALLER-MATERIALIZED AGENT SKILL PACKAGE-EVIDENCE AUTHORIZATION: NOT AUTHORIZED
K4-R5+: NOT AUTHORIZED

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
