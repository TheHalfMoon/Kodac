# Kodac Engineering Milestones

## Authority

This document records current engineering milestone status after canonical adoption of K3-R1 through K3-R5, authorization of the bounded K3-R6 snapshot relation-graph slice, KRI-P0 planning authority, and the separately authorized bounded KRI-R1 through KRI-R4 implementation slices. It does not authorize public release or implementation beyond an explicitly approved gate.

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

## K3 — IN PROGRESS / NOT CLOSED

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
K3-R6: IMPLEMENTATION AND NARROW REVIEW-HARDENING EXTENSION AUTHORIZED FOR THE EXACT BOUNDED SNAPSHOT RELATION-GRAPH SLICE / NOT YET CANONICAL
K3-R7+: NOT AUTHORIZED
K3: NOT CLOSED
```

Canonical K3 progress includes accepted evidence for repository gold fixtures, exact snapshot/freshness semantics, bounded external-adapter benchmarking, a bounded ast-grep CLI structural-search adapter, and a bounded deterministic Context Engine / Context Bundle.

K3 remains open. K3-R6 is now exactly scoped to deterministic snapshot-bound relation evidence, impact traversal, and related-file retrieval; it does not authorize parsers, source crawling, runtime tracing, persistence, models, or execution authority.

The exact K3-R6 scope and implementation allowlist are defined in `docs/planning/KODAC_K3_R6_SNAPSHOT_RELATION_GRAPH_AUTHORIZATION_2026-08-24.md`.

The exact review-hardening extension admits only `node:util` `types.isProxy`, fail-closed structural validation, an ephemeral per-query adjacency index, and serialized graph-entity seed normalization. It is defined in `docs/planning/KODAC_K3_R6_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md`.

### Remaining K3 closeout direction

A future K3 closeout remains a separate founder-reviewed gate. Applicable closure evidence may include:

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

The authorized K3-R6 slice is intended to supply bounded blast-radius/related-file evidence. Its implementation does not itself close K3; closeout remains a separate evidence gate after canonical implementation.

### K3 non-decisions

K3 does not select a permanent graph/index/storage backend by implication.

Vector/embedding infrastructure, expansion beyond the exact K3-R6 gate plus its narrow review-hardening extension, and K3-R7+ remain unauthorized.

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
| K4 | Ecosystem Compatibility & Capability Registry | PROPOSED / NOT AUTHORIZED |
| K5 | Proof Review & Judge | PROPOSED / NOT AUTHORIZED |
| K6 | Evidence Router & Outcome Learning | PROPOSED / NOT AUTHORIZED |
| K7 | Kodac Bench & Distribution Hardening | PROPOSED / NOT AUTHORIZED |

## Current gate

```text
K3: IN PROGRESS / NOT CLOSED
K3-R1 THROUGH K3-R5: CANONICAL FOR THEIR AUTHORIZED SCOPES
K3-R6: EXACT BOUNDED SNAPSHOT RELATION-GRAPH IMPLEMENTATION PLUS REVIEW-HARDENING EXTENSION AUTHORIZED / NOT YET CANONICAL
K3-R7+: NOT AUTHORIZED

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
