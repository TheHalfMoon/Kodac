# Kodac Engineering Milestones

## Authority

This document records current engineering milestone status after canonical adoption and bounded closeout of K3-R1 through K3-R6, definition of K4, canonical adoption of its exact R1 data-only normalization gate and exact R2 caller-materialized MCP catalog-evidence gate, KRI-P0 planning authority, and the separately authorized bounded KRI-R1 through KRI-R4 implementation slices. It does not authorize public release or implementation beyond an explicitly approved gate.

## K0/K1 — CLOSED

Theme:

```text
Architecture, governance, provenance, donor-selection foundation
```

Status:

```text
CLOSED
```

Canonical outcome includes the accepted Kodac ADR foundation, provenance/license controls, donor-selection discipline, and governance architecture required for later runtime work.

## K2 — CLOSED

Theme:

```text
Trusted Runtime Spine
```

Status:

```text
CLOSED
```

Canonical outcome includes bounded agent execution, provider qualification, policy-gated side effects, exact write scope, receipts/evidence, independent verification, Done Gate proof, protected main integration, and post-merge K2 runtime verification.

## K3 — CLOSED

Theme:

```text
Evidence-Backed Repository Intelligence & Context Engine
```

Current canonical state:

```text
K3-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED SCOPE
K3-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED SCOPE
K3-R3: CANONICAL / COMPLETE FOR ITS AUTHORIZED SCOPE
K3-R4: CANONICAL / COMPLETE FOR ITS AUTHORIZED SCOPE
K3-R5: CANONICAL / COMPLETE FOR ITS AUTHORIZED SCOPE
K3-R6: CANONICAL / COMPLETE FOR ITS AUTHORIZED BOUNDED SNAPSHOT RELATION-GRAPH SCOPE
K3-R7+: NOT REQUIRED FOR K3 CLOSEOUT / NOT AUTHORIZED
K3: CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
```

Canonical K3 outcomes include repository gold fixtures, exact snapshot/freshness semantics, bounded external-adapter benchmarking, a bounded ast-grep CLI structural-search adapter, a bounded deterministic Context Engine / Context Bundle, and an immutable snapshot-bound relation graph with deterministic impact and related-file queries.

K3-R6 remains exactly scoped to deterministic snapshot-bound relation evidence, impact traversal, and related-file retrieval; it does not authorize parsers, source crawling, runtime tracing, persistence, models, or execution authority.

The exact K3-R6 scope and implementation allowlist are defined in `docs/planning/KODAC_K3_R6_SNAPSHOT_RELATION_GRAPH_AUTHORIZATION_2026-08-24.md`.

The exact review-hardening extension admits only `node:util` `types.isProxy`, fail-closed structural validation, an ephemeral per-query adjacency index, and serialized graph-entity seed normalization. It is defined in `docs/planning/KODAC_K3_R6_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md`.

### K3 closeout evidence

The dedicated closeout gate establishes:

- canonical repository-intelligence/query contracts for the final authorized K3 scope;
- freshness identity proof;
- bounded Context Bundle evidence;
- repository-intelligence benchmark evidence;
- relevant-file and structural-symbol evidence;
- related-test or blast-radius evidence where separately brought into scope;
- provenance and evidence-class distinctions;
- preserved K2 execution boundary;
- no second execution authority;
- applicable runtime/typecheck/test evidence;
- determined and satisfied platform requirements;
- dedicated K3 closeout evidence.

The accepted blast-radius path is the bounded K3-R6 `impact` query; no production `related_tests` claim is made. The canonical ledger, exact exit-evidence matrix, platform applicability, and preserved non-grants are recorded in `docs/planning/KODAC_K3_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-24.md`.

### K3 non-decisions

K3 does not select a permanent graph/index/storage backend by implication.

Vector/embedding infrastructure, expansion beyond the exact K3-R6 gate plus its narrow review-hardening extension, and K3-R7+ remain unauthorized.

## K4 — DEFINED / IN PROGRESS

Theme:

```text
Ecosystem Compatibility & Capability Registry
```

Current gate:

```text
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY MCP CATALOG-EVIDENCE SCOPE
K4-R2 PREIMPLEMENTATION K4-R1 WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH SCOPE
K4-R3+: NOT AUTHORIZED
K4: NOT CLOSED
```

K4-R1 is a non-executable foundation over the canonical H1 extension/capability descriptor registry. It may pin exact MCP, ACP, and Agent Skills specification revisions and record deterministic `UNRESOLVED`, `SINGLE`, or `COMPOSITE` bindings from opaque external object names to existing H1 semantic capability identifiers.

K4-R1 grants no protocol transport, discovery, invocation, session behavior, skill parsing/installation/activation, script execution, network/filesystem/process/secret authority, persistence, external registry, policy change, or K2 authority. Normalization and registry membership are evidence only.

The exact primary-source pins, six-path implementation allowlist, required proofs, and preserved non-grants are defined in `docs/planning/KODAC_K4_DEFINITION_AND_R1_COMPATIBILITY_NORMALIZATION_AUTHORIZATION_2026-08-24.md`.

The canonical implementation ledger, qualified identity, review evidence, proof matrix, and preserved boundaries are recorded in `docs/planning/KODAC_K4_R1_COMPATIBILITY_NORMALIZATION_CANONICAL_EVIDENCE_2026-08-24.md`.

K4-R2 may correlate only already-materialized MCP tool/resource/prompt list-page digests with one exact K4-R1 binding snapshot. It adds no JSON-RPC, client/server, transport, discovery call, cursor traversal, caching, resource read, prompt retrieval, invocation, effect, or authority path. Its exact contract and five-path implementation allowlist are recorded in `docs/planning/KODAC_K4_R2_CALLER_MATERIALIZED_MCP_CATALOG_EVIDENCE_AUTHORIZATION_2026-08-24.md`.

Before K4-R2 source work, the inherited K4-R1 workflow was canonically hardened through the exact one-path canonical-regression gate in `docs/planning/KODAC_K4_R2_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md`. That canonical prerequisite preserves the K4-R1 artifacts and shared exports without expanding the K4-R2 five-path allowlist.

The exact K4-R2 implementation ledger, qualification, review, canonical surface, and preserved boundaries are recorded in `docs/planning/KODAC_K4_R2_CALLER_MATERIALIZED_MCP_CATALOG_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md`.

## KRI-P0 THROUGH KRI-R4 — BOUNDED REVIEWER INTELLIGENCE

Theme:

```text
Kodac Reviewer Intelligence planning plus separately authorized bounded implementation
```

Status:

```text
KRI-P0: CANONICAL PLANNING AUTHORITY
KRI-R1 THROUGH KRI-R4: CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
KRI-R5+: NOT AUTHORIZED
```

The canonical bounded slices are:

- KRI-R1: deterministic offline test/evidence-only gold reviewer-evidence corpus;
- KRI-R2: deterministic finding/adjudication contracts and bounded read-only runtime;
- KRI-R3: provider-neutral bounded reviewer execution with a caller-injected provider interface;
- KRI-R4: pure/in-memory historical-claim-disposition qualification machinery.

These slices grant no concrete external adapter, network or secret handling, persistent review storage or learning, production reviewer routing, autofix, repository mutation, GitHub review/comment, approval, merge, K5, or `PROVEN_READY` authority. Qualification is not general reviewer trust, finding truth, default routing authority, or production readiness.

K2 remains the sole trusted side-effect execution authority. K5 remains proposed and not authorized.

The reconciliation basis and exact canonical merge identities are recorded in `docs/planning/KODAC_KRI_R1_R4_ROADMAP_TRUTH_RECONCILIATION_2026-08-24.md`.

## Proposed later milestones

The following remain roadmap directions only and have no implementation authority:

| Milestone | Proposed direction | Status |
| --- | --- | --- |
| K5 | Proof Review & Judge | PROPOSED / NOT AUTHORIZED |
| K6 | Evidence Router & Outcome Learning | PROPOSED / NOT AUTHORIZED |
| K7 | Kodac Bench & Distribution Hardening | PROPOSED / NOT AUTHORIZED |

## Current gate

```text
K3: CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
K3-R1 THROUGH K3-R6: CANONICAL FOR THEIR AUTHORIZED SCOPES
K3-R7+: NOT REQUIRED FOR K3 CLOSEOUT / NOT AUTHORIZED

K4: DEFINED / IN PROGRESS / NOT CLOSED
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY MCP CATALOG-EVIDENCE SCOPE
K4-R2 PREIMPLEMENTATION K4-R1 WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH SCOPE
K4-R3+: NOT AUTHORIZED

KRI-P0: CANONICAL PLANNING AUTHORITY
KRI-R1 THROUGH KRI-R4: CANONICAL FOR THEIR SEPARATELY AUTHORIZED BOUNDED SCOPES
KRI-R5+: NOT AUTHORIZED
K5 IMPLEMENTATION: NOT AUTHORIZED

CODE IMPORT: NOT AUTHORIZED
NEW OSS / EXTERNAL REVIEW SERVICE INTAKE: NOT AUTHORIZED
NEW KODAC DEPENDENCIES: NOT AUTHORIZED
PERSISTENT REVIEW STORAGE / LEARNING: NOT AUTHORIZED
WRITE / REVIEW / APPROVAL / MERGE AUTHORITY: NOT AUTHORIZED BY KRI-P0 OR KRI-R1 THROUGH KRI-R4

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
