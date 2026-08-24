# Product Document Authority Status

The pre-existing files in `docs/product/` are preserved **Kernux-era historical planning inputs**.

They remain in the repository for historical integrity and research context, but they are not current Kodac product authority and do not override:

- accepted Kodac ADRs;
- current Kodac planning and closeout records;
- the README current architecture summary;
- reconstituted `docs/roadmap/*`.

This status notice does not delete, rewrite, validate, or re-adopt those historical product documents.

Future Kodac product-document reconstitution requires a separate founder-reviewed gate.

Current authority boundaries are reconciled to canonical closeout of the bounded K3-R1 through K3-R6 engineering milestone, the bounded KRI-R1 through KRI-R4 states, canonical K4-R1 compatibility normalization, canonical K4-R2 caller-materialized MCP catalog evidence and its K4-R3 prerequisite workflow hardening, and canonical K4-R3 pinned data-only ACP v2 method-catalog evidence:

```text
K3: CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
K3-R1 THROUGH K3-R6: CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K3-R7+: NOT REQUIRED FOR K3 CLOSEOUT / NOT AUTHORIZED

K4: DEFINED / IN PROGRESS / NOT CLOSED
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY SCOPE
K4-R2 PREIMPLEMENTATION K4-R1 WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH SCOPE
K4-R2 CANONICAL-REGRESSION WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH PREREQUISITE SCOPE
K4-R3: CANONICAL / COMPLETE FOR ITS AUTHORIZED PINNED DATA-ONLY ACP V2 METHOD-CATALOG EVIDENCE SCOPE
K4-R4+: NOT AUTHORIZED

KRI-P0: CANONICAL PLANNING AUTHORITY
KRI-R1 THROUGH KRI-R4: CANONICAL FOR THEIR SEPARATELY AUTHORIZED BOUNDED SCOPES
KRI-R5+: NOT AUTHORIZED
K5 IMPLEMENTATION: NOT AUTHORIZED
PROVEN_READY AUTHORITY FROM KRI-P0 OR KRI-R1 THROUGH KRI-R4: NOT AUTHORIZED

CODE IMPORT: NOT AUTHORIZED
NEW KODAC DEPENDENCIES: NOT AUTHORIZED
EXTERNAL REVIEW SERVICE INTEGRATION: NOT AUTHORIZED
REPOSITORY WRITE / GITHUB REVIEW / APPROVAL / MERGE AUTHORITY FROM KRI-P0 OR KRI-R1 THROUGH KRI-R4: NOT AUTHORIZED

PUBLIC RELEASE: NOT AUTHORIZED
PACKAGE PUBLICATION: NOT AUTHORIZED
BRAND LAUNCH: NOT AUTHORIZED
KODAC NAME / TRADEMARK CLEARANCE: NOT ESTABLISHED
```

Later engineering milestones remain:

```text
K4: DEFINED / IN PROGRESS / NOT CLOSED
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY SCOPE
K4-R2 PREIMPLEMENTATION K4-R1 WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH SCOPE
K4-R2 CANONICAL-REGRESSION WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH PREREQUISITE SCOPE
K4-R3: CANONICAL / COMPLETE FOR ITS AUTHORIZED PINNED DATA-ONLY ACP V2 METHOD-CATALOG EVIDENCE SCOPE
K4-R4+: NOT AUTHORIZED
K5: PROPOSED / NOT AUTHORIZED
K6: PROPOSED / NOT AUTHORIZED
K7: PROPOSED / NOT AUTHORIZED
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
K4-R4+: NOT AUTHORIZED
PROVEN_READY AUTHORITY FROM KRI-P0 OR KRI-R1 THROUGH KRI-R4: NOT AUTHORIZED

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

The bounded KRI slices are a deterministic offline gold corpus (R1), finding/adjudication contracts plus a read-only runtime (R2), provider-neutral execution with a caller-injected interface (R3), and pure/in-memory historical-claim-disposition qualification (R4). They do not establish general reviewer trust, finding truth, default routing authority, or production readiness.

The reconciliation basis and exact canonical merge identities are recorded in `docs/planning/KODAC_KRI_R1_R4_ROADMAP_TRUTH_RECONCILIATION_2026-08-24.md`.

The exact K3-R6 scope and implementation allowlist are defined in `docs/planning/KODAC_K3_R6_SNAPSHOT_RELATION_GRAPH_AUTHORIZATION_2026-08-24.md`.

The narrow `node:util` Proxy-rejection, structural-input, adjacency-index, and serialized-seed review-hardening extension is defined in `docs/planning/KODAC_K3_R6_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md`.

The bounded K3 closure evidence, canonical implementation ledger, platform applicability, and preserved non-grants are recorded in `docs/planning/KODAC_K3_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-24.md`.

The K4 definition, official primary-standard pins, exact K4-R1 implementation allowlist, and non-executable compatibility boundaries are recorded in `docs/planning/KODAC_K4_DEFINITION_AND_R1_COMPATIBILITY_NORMALIZATION_AUTHORIZATION_2026-08-24.md`.

The exact K4-R1 implementation ledger, qualified identity, review evidence, proof matrix, canonical surface, and preserved non-grants are recorded in `docs/planning/KODAC_K4_R1_COMPATIBILITY_NORMALIZATION_CANONICAL_EVIDENCE_2026-08-24.md`.

The exact K4-R2 caller-materialized MCP catalog-evidence contract, primary-source basis, implementation allowlist, required proofs, and non-grants are recorded in `docs/planning/KODAC_K4_R2_CALLER_MATERIALIZED_MCP_CATALOG_EVIDENCE_AUTHORIZATION_2026-08-24.md`.

The inherited shared-export CI-gate conflict, exact one-path K4-R1 canonical-regression workflow hardening, self-canonicalizing merge proof, and unchanged K4-R2 five-path allowlist are recorded in `docs/planning/KODAC_K4_R2_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md`.

The exact K4-R2 implementation ledger, qualified identity, review evidence, proof matrix, conditional canonical surface, required evidence merge gate, and preserved non-grants are recorded in `docs/planning/KODAC_K4_R2_CALLER_MATERIALIZED_MCP_CATALOG_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md`.

The exact pinned ACP v2 primary-source basis, 16-method catalog contract, ordered one-path K4-R2 workflow prerequisite, five-path K4-R3 implementation allowlist, required proofs, and preserved non-grants are recorded in `docs/planning/KODAC_K4_R3_PINNED_ACP_V2_METHOD_CATALOG_EVIDENCE_AUTHORIZATION_2026-08-24.md`.

The exact K4-R2 prerequisite-hardening identity, K4-R3 implementation ledger, qualified identity, review evidence, proof matrix, canonical surface, required evidence merge gate, and preserved non-grants are recorded in `docs/planning/KODAC_K4_R3_PINNED_ACP_V2_METHOD_CATALOG_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md`.
