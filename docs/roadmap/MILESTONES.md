# Kodac Engineering Milestones

## Authority

This document records current engineering milestone status after canonical closeout of K0/K1, K2, K3-R1 through K3-R6, and the bounded K4-R1 through K4-R5 data-only ecosystem-compatibility surface, plus KRI-P0 planning authority and the separately authorized bounded KRI-R1 through KRI-R4 implementation slices. This document does not authorize public release or implementation beyond an explicitly approved gate.

K4 bounded closeout is canonical at merge `dcd3693826d9282b475d99c6b9e658b9695e63a8` after its required exact-head and post-merge proof.

**K5 closeout-candidate rule:** K5-R1 through K5-R5 are already canonical for their separately authorized bounded scopes, and the bounded K5 closeout authorization is canonical at merge `f1457f8e7efd1e09e2d55e73fc0e4ea860bf8762`. Every K5 `CLOSED` statement in this candidate is conditional until the exact-head closeout gate, expected-head merge, and required post-merge ordered-parent/tree/blob/protected-main verification in `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md` all pass. Until then K5 remains defined/in progress; R1-R5 remain canonical.

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

## K4 — CLOSED

Theme:

```text
Ecosystem Compatibility & Capability Registry
```

Current canonical state:

```text
K4: CLOSED FOR THE CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY SCOPE
K4-R2 PREIMPLEMENTATION K4-R1 WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH SCOPE
K4-R2 CANONICAL-REGRESSION WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH PREREQUISITE SCOPE
K4-R3: CANONICAL / COMPLETE FOR ITS AUTHORIZED PINNED DATA-ONLY ACP V2 METHOD-CATALOG EVIDENCE SCOPE
K4-R4: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY AGENT SKILL PACKAGE EVIDENCE SCOPE
K4-R5: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY AGENT SKILL GOVERNANCE-CLAIM EVIDENCE SCOPE
K4-R6+: NOT REQUIRED FOR K4 CLOSEOUT / NOT AUTHORIZED
```

K4-R1 is a non-executable foundation over the canonical H1 extension/capability descriptor registry. It pins exact MCP, ACP, and Agent Skills specification revisions and records deterministic `UNRESOLVED`, `SINGLE`, or `COMPOSITE` bindings from opaque external object names to existing H1 semantic capability identifiers.

K4-R1 grants no protocol transport, discovery, invocation, session behavior, skill parsing/installation/activation, script execution, network/filesystem/process/secret authority, persistence, external registry, policy change, or K2 authority. Normalization and registry membership are evidence only.

The exact primary-source pins, six-path implementation allowlist, required proofs, and preserved non-grants are defined in `docs/planning/KODAC_K4_DEFINITION_AND_R1_COMPATIBILITY_NORMALIZATION_AUTHORIZATION_2026-08-24.md`.

The canonical implementation ledger, qualified identity, review evidence, proof matrix, and preserved boundaries are recorded in `docs/planning/KODAC_K4_R1_COMPATIBILITY_NORMALIZATION_CANONICAL_EVIDENCE_2026-08-24.md`.

K4-R2 may correlate only already-materialized MCP tool/resource/prompt list-page digests with one exact K4-R1 binding snapshot. It adds no JSON-RPC, client/server, transport, discovery call, cursor traversal, caching, resource read, prompt retrieval, invocation, effect, or authority path. Its exact contract and five-path implementation allowlist are recorded in `docs/planning/KODAC_K4_R2_CALLER_MATERIALIZED_MCP_CATALOG_EVIDENCE_AUTHORIZATION_2026-08-24.md`.

Before K4-R2 source work, the inherited K4-R1 workflow was canonically hardened through the exact one-path, self-canonicalizing regression gate in `docs/planning/KODAC_K4_R2_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md`. PR #175 satisfied that gate and its post-merge proof independently of K4-R2 evidence. That canonical prerequisite preserves the K4-R1 artifacts and shared exports without expanding the K4-R2 five-path allowlist.

The exact K4-R2 implementation ledger, qualification, review, canonical surface, evidence merge gate, and preserved boundaries are recorded in `docs/planning/KODAC_K4_R2_CALLER_MATERIALIZED_MCP_CATALOG_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md`.

K4-R3 is limited to a fixed, pinned 16-method ACP v2 inventory, deterministic method metadata, and `UNBOUND`, `CURRENT`, or `STALE` correlation against one immutable K4-R1 snapshot. It adds no JSON-RPC, client/agent, transport, initialization, capability negotiation, authentication, session, prompt, permission, filesystem, terminal, update, elicitation, cancellation, custom-method, effect, or authority path. Its exact contract, ordered one-path K4-R2 workflow prerequisite, and five-path implementation allowlist are recorded in `docs/planning/KODAC_K4_R3_PINNED_ACP_V2_METHOD_CATALOG_EVIDENCE_AUTHORIZATION_2026-08-24.md`.

The exact K4-R2 prerequisite-hardening identity, K4-R3 implementation ledger, qualification, review, canonical surface, evidence merge gate, and preserved boundaries are recorded in `docs/planning/KODAC_K4_R3_PINNED_ACP_V2_METHOD_CATALOG_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md`.

K4-R4 is limited to validating caller-materialized portable metadata and redacted content/provenance identities, deriving immutable evidence, and correlating one exact `AGENT_SKILL` name and metadata identity against one immutable K4-R1 snapshot. It adds no package discovery/read, YAML/Markdown parsing, raw untrusted-text output, reference/path resolution, installation, activation, routing, trust qualification, `allowed-tools` interpretation, instruction loading, or script/hook/command/asset/binary execution. Its exact contract and five-path implementation allowlist are recorded in `docs/planning/KODAC_K4_R4_CALLER_MATERIALIZED_AGENT_SKILL_PACKAGE_EVIDENCE_AUTHORIZATION_2026-08-24.md`.

The exact K4-R4 implementation ledger, qualification, review, canonical surface, evidence merge gate, and preserved boundaries are recorded in `docs/planning/KODAC_K4_R4_CALLER_MATERIALIZED_AGENT_SKILL_PACKAGE_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md`.

K4-R5 is limited to binding bounded caller assertions about package version, requested semantic capabilities, bounded `requirementClaims` using only the fixed `requirementKind` vocabulary (`FILESYSTEM` / `NETWORK` / `PROCESS` / `SECRET`), compatibility requirements, and evaluation artifacts to one already-valid K4-R4 evidence identity. It emits fixed `claimStatus: CALLER_ASSERTED`, `trustStatus: UNASSESSED`, and `authorityState: NONE` states and cannot verify a claim, reproduce an evaluation, qualify trust, approve a capability, grant an effect, or install, activate, route, or execute a skill. Its exact contract and five-path implementation allowlist are recorded in `docs/planning/KODAC_K4_R5_CALLER_MATERIALIZED_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_AUTHORIZATION_2026-08-24.md`.

The exact K4-R5 implementation ledger, qualification, review, canonical surface, evidence merge gate, and preserved boundaries are recorded in `docs/planning/KODAC_K4_R5_CALLER_MATERIALIZED_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md`.

### K4 closeout evidence

The bounded closeout does not invent K4-R6. It closes the accepted R1-R5 data-only surface and preserves ADR-0007's broader executable MCP/ACP/Agent Skills direction as separately authorizable future work.

The closeout authorization is recorded in `docs/planning/KODAC_K4_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-25.md`.

The canonical ledger, bounded exit-evidence matrix, platform applicability, closure meaning, and preserved non-grants are recorded in `docs/planning/KODAC_K4_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-25.md`.

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

K2 remains the sole trusted side-effect execution authority. KRI does not gain K5 or Done Gate authority by data flow.

The reconciliation basis and exact canonical merge identities are recorded in `docs/planning/KODAC_KRI_R1_R4_ROADMAP_TRUTH_RECONCILIATION_2026-08-24.md`.

## K5 — CLOSEOUT CANDIDATE

Theme:

```text
Proof Review & Judge
```

Candidate state:

```text
K5: CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE IFF THIS CLOSEOUT MERGE GATE PASSES
K5-R1 THROUGH K5-R5: CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K5-R6+: NOT REQUIRED FOR K5 CLOSEOUT / NOT AUTHORIZED
DONE GATE PROVEN_READY AUTHORITY: UNCHANGED
```

K5-R1 is a pure, in-memory, caller-materialized proof-package contract with strict structural validation followed by deterministic judgment. Its judgment vocabulary remains bounded to package state:

```text
SUFFICIENT_PACKAGE
INSUFFICIENT_PACKAGE
CONTRADICTORY_PACKAGE
STALE_PACKAGE
INVALID_PACKAGE
```

K5-R2 deterministically links caller-materialized verification reports, execution receipts, and repository-revision evidence to the exact R1 package. K5-R3 deterministically links caller-materialized canonical KRI finding/adjudication evidence without reviewer/adjudication authority transfer. K5-R4 deterministically reconciles linked evidence with `VALID`, `INCOMPLETE`, `STALE`, `CONTRADICTORY`, `INVALID`, and `NOT_APPLICABLE`; `ARTIFACT` and `CUSTOM` remain outside R4 linked-evidence authority. K5-R5 is qualification-only integrated R1-R4 fixture/test/workflow evidence and adds no production source.

Those states do not mean `PROVEN_READY`, approval, mergeability, or completion truth. The existing Done Gate retains `PROVEN_READY` / `NOT_READY` authority under its accepted contracts.

The R5 post-merge record preserves one first-attempt Ubuntu failure in an unchanged pre-existing H4-R3G-B timing-sensitive test and exactly one controlled same-SHA/no-drift successful rerun with final `k2-runtime-gate` success. `WAIVER: NONE`; this closeout does not claim every first attempt was green.

The milestone definition and staged R1-R5 authority chain begin in `docs/planning/KODAC_K5_DEFINITION_AND_R1_PROOF_PACKAGE_JUDGMENT_AUTHORIZATION_2026-08-25.md`.

The bounded K5 closeout authorization is recorded in `docs/planning/KODAC_K5_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-26.md`.

The complete K5 ledger, exact R5 evidence, anomaly disclosure, bounded exit matrix, platform applicability, closure meaning, and preserved non-grants are recorded in `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md`.

## Proposed later milestones

The following remain roadmap directions only and have no implementation authority from this gate:

| Milestone | Proposed direction | Status |
| --- | --- | --- |
| K6 | Evidence Router & Outcome Learning | PROPOSED / NOT AUTHORIZED |
| K7 | Kodac Bench & Distribution Hardening | PROPOSED / NOT AUTHORIZED |

## Current gate

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

K6 / K7 IMPLEMENTATION: NOT AUTHORIZED
CODE IMPORT: NOT AUTHORIZED
NEW OSS / EXTERNAL REVIEW SERVICE INTAKE: NOT AUTHORIZED
NEW KODAC DEPENDENCIES: NOT AUTHORIZED
PERSISTENT REVIEW / PROOF STORAGE OR LEARNING: NOT AUTHORIZED
WRITE / REVIEW / APPROVAL / MERGE AUTHORITY: NOT AUTHORIZED BY KRI OR K5

PUBLIC RELEASE: NOT AUTHORIZED
PACKAGE PUBLICATION: NOT AUTHORIZED
BRAND LAUNCH: NOT AUTHORIZED
KODAC NAME / TRADEMARK CLEARANCE: NOT ESTABLISHED
```

## KRI-P0 through KRI-R4 and K5 preserved non-grants

```text
KRI-R5+ IMPLEMENTATION: NOT AUTHORIZED
K5-R6+ IMPLEMENTATION: NOT AUTHORIZED
K6 / K7 IMPLEMENTATION: NOT AUTHORIZED BY THIS CLOSEOUT
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
