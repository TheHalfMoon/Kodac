# Kodac Engineering Roadmap

## Authority

This document is the current Kodac engineering roadmap authority after K2 canonical closeout, canonical adoption and bounded closeout of K3-R1 through K3-R6, canonical adoption of the separately authorized bounded KRI-R1 through KRI-R4 slices, and bounded canonical closeout of K4-R1 through K4-R5 data-only ecosystem-compatibility evidence. KRI-P0 remains the planning/contract-design authority from which those later, narrower implementation gates were separately authorized.

K4 bounded closeout is canonical at merge `dcd3693826d9282b475d99c6b9e658b9695e63a8` after the required exact-head and post-merge proof.

K5-R1 through K5-R5 are canonical for their separately authorized bounded scopes. The bounded K5 closeout authorization is canonical at merge `f1457f8e7efd1e09e2d55e73fc0e4ea860bf8762`. Every K5 `CLOSED` statement introduced by this closeout candidate is conditional until the exact-head documentation gate, expected-head merge, and required post-merge ordered-parent/tree/blob/protected-main verification in `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md` all pass. Until then, K5 remains defined/in progress; R1-R5 remain canonical regardless. The roadmap defines no K5-R6 contract.

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
| **K4** | Ecosystem Compatibility & Capability Registry | **CLOSED — K4-R1 THROUGH K4-R5 CANONICAL FOR THEIR BOUNDED DATA-ONLY SCOPES** | Complete bounded data-only milestone; K4-R6+ is not required for this closeout and remains unauthorized |
| **K5** | Proof Review & Judge | **CLOSED FOR CANONICAL R1-R5 BOUNDED SCOPE IFF THIS CLOSEOUT MERGE GATE PASSES** | **K5-R1 THROUGH K5-R5 ONLY AS CANONICALLY ADOPTED; K5-R6+ NOT REQUIRED / NOT AUTHORIZED** |
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

K2 remains the sole trusted side-effect execution authority. Later evidence/review milestones may inform decisions but cannot create a second effect authority.

## K3 — Closed

```text
K3 — Evidence-Backed Repository Intelligence & Context Engine
STATUS: CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
K3-R1 THROUGH K3-R6: CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K3-R7+: NOT REQUIRED FOR K3 CLOSEOUT / NOT AUTHORIZED
```

Purpose: turn a repository and engineering task into a bounded, freshness-aware, evidence-backed representation of relevant files, symbols, definitions, references, dependencies, tests, architecture/specification context, and likely blast radius, then produce a bounded Context Bundle for model reasoning.

Canonical K3 work includes repository gold evidence, exact snapshot/freshness semantics, bounded external-adapter benchmarking, a bounded ast-grep CLI structural-search adapter, a deterministic Context Engine / Context Bundle, and immutable snapshot-bound relation evidence with bounded impact and related-file queries.

K3 preserves K2 execution authority. It does not select a permanent storage engine, vector/embedding infrastructure, model, source crawler, runtime tracer, or new execution authority.

The exact K3-R6 scope and implementation allowlist are defined in `docs/planning/KODAC_K3_R6_SNAPSHOT_RELATION_GRAPH_AUTHORIZATION_2026-08-24.md`. The narrow review-hardening extension is defined in `docs/planning/KODAC_K3_R6_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md`. The canonical ledger and closeout evidence are recorded in `docs/planning/KODAC_K3_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-24.md`.

## KRI-P0 through KRI-R4 — bounded Reviewer Intelligence

KRI-P0 is an independent cross-cutting planning gate, not K5 implementation. KRI-P0 itself authorizes only planning and contract design. KRI-R1 through KRI-R4 were later authorized and canonically adopted through separate bounded implementation gates:

- KRI-R1: deterministic offline test/evidence-only gold reviewer-evidence corpus;
- KRI-R2: deterministic finding/adjudication contracts and a bounded read-only runtime for materialized claims;
- KRI-R3: provider-neutral bounded reviewer execution through a caller-injected interface, with no concrete provider adapter;
- KRI-R4: pure/in-memory historical-claim-disposition qualification machinery.

```text
KRI-P0: CANONICAL PLANNING AUTHORITY
KRI-R1 THROUGH KRI-R4: CANONICAL / COMPLETE FOR THEIR SEPARATELY AUTHORIZED BOUNDED SCOPES
KRI-R5+: NOT AUTHORIZED
```

Reviewer output remains a claim requiring adjudication, not completion truth. Qualification is bounded engineering evidence, not general reviewer trust, finding truth, default routing authority, or production readiness. K2 remains the trusted side-effect authority and Done Gate remains the `PROVEN_READY` authority.

The reconciliation basis and exact canonical merge identities are recorded in `docs/planning/KODAC_KRI_R1_R4_ROADMAP_TRUTH_RECONCILIATION_2026-08-24.md`.

## K4 — Closed for the bounded data-only surface: Ecosystem Compatibility & Capability Registry

The accepted bounded K4 surface is deliberately data-only and closed:

```text
K4: CLOSED FOR THE CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K4-R1: DATA-ONLY STANDARD PINS + EXTERNAL-CAPABILITY NORMALIZATION — CANONICAL / COMPLETE
K4-R2: CALLER-MATERIALIZED DATA-ONLY MCP CATALOG EVIDENCE — CANONICAL / COMPLETE
K4-R2 PREIMPLEMENTATION K4-R1 WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH SCOPE
K4-R2 CANONICAL-REGRESSION WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH PREREQUISITE SCOPE
K4-R3: PINNED DATA-ONLY ACP V2 METHOD-CATALOG EVIDENCE — CANONICAL / COMPLETE
K4-R4: CALLER-MATERIALIZED DATA-ONLY AGENT SKILL PACKAGE EVIDENCE — CANONICAL / COMPLETE
K4-R5: CALLER-MATERIALIZED DATA-ONLY AGENT SKILL GOVERNANCE-CLAIM EVIDENCE — CANONICAL / COMPLETE
K4-R6+: NOT REQUIRED FOR K4 CLOSEOUT / NOT AUTHORIZED
```

K4-R1 pins exact MCP, ACP, and Agent Skills specification revisions and normalizes opaque external object names to existing H1 semantic capability identifiers using bounded evidence-only dispositions. K4-R2 records caller-materialized MCP catalog evidence. K4-R3 records the exact pinned ACP v2 method catalog. K4-R4 records caller-materialized redacted Agent Skill package evidence. K4-R5 records caller-asserted governance claims with trust `UNASSESSED` and authority `NONE`.

No K4 evidence grants MCP/ACP transport, discovery, invocation, Agent Skill installation/activation/routing, `allowed-tools` approval, trust qualification, policy/effect authority, persistence, or a second K2 execution path.

The bounded K4 closeout authorization is recorded in `docs/planning/KODAC_K4_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-25.md`. The canonical K4 ledger, exit matrix, limitations, and non-grants are recorded in `docs/planning/KODAC_K4_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-25.md`.

## K5 — Closeout candidate: Proof Review & Judge

K5 is the bounded proof-review layer between already-produced evidence and existing completion authority. It is not another generic reviewer, does not duplicate KRI adjudication, and does not duplicate Done Gate.

Candidate state:

```text
K5: CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE IFF THIS CLOSEOUT MERGE GATE PASSES
K5-R1 THROUGH K5-R5: CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K5-R6+: NOT REQUIRED FOR K5 CLOSEOUT / NOT AUTHORIZED
DONE GATE PROVEN_READY AUTHORITY: UNCHANGED
```

The canonical bounded milestone decomposition is:

```text
K5-R1 — proof-package contract + pure deterministic judgment core
K5-R2 — exact linkage to verification reports, execution receipts, and repository revision evidence
K5-R3 — bounded consumption of adjudicated KRI evidence without reviewer-authority transfer
K5-R4 — explicit stale / contradictory / incomplete / invalid proof handling across linked evidence classes
K5-R5 — bounded integrated proof-review qualification against canonical fixtures and negative cases
K5 CLOSEOUT — separate evidence and closeout gate
```

### K5-R1 — package contract and deterministic judgment

R1 consumes caller-materialized proof requirements and evidence bound to exact revision identity. It performs strict structural and identity validation before deterministic package judgment. Its state vocabulary is:

```text
SUFFICIENT_PACKAGE
INSUFFICIENT_PACKAGE
CONTRADICTORY_PACKAGE
STALE_PACKAGE
INVALID_PACKAGE
```

These are package-review states only and never mean `PROVEN_READY`, approval, mergeability, or completion truth.

### K5-R2 — exact producer-evidence linkage

R2 deterministically links caller-materialized verification reports, execution receipts, and repository revision evidence to the exact proof package. It does not fetch, execute, discover, or authorize those producers.

### K5-R3 — adjudicated review-evidence linkage

R3 deterministically links caller-materialized canonical KRI finding/adjudication evidence. It does not execute reviewers, create findings, adjudicate KRI claims, transfer reviewer authority, or establish reviewer truth.

### K5-R4 — explicit proof-state reconciliation

R4 reconciles R1 package evidence with exact R2/R3 linkage using the bounded state vocabulary:

```text
VALID
INCOMPLETE
STALE
CONTRADICTORY
INVALID
NOT_APPLICABLE
```

Its precedence and fixed causes are deterministic. `ARTIFACT` and `CUSTOM` remain outside linked-evidence authority and cannot influence the R4 aggregate state. `VALID` is not `PROVEN_READY`.

### K5-R5 — integrated qualification only

R5 adds no production source. It uses inert canonical fixtures and tests to qualify exact R1-R4 composition, deterministic identities, set-order stability, package/revision binding, linkage membership/complements, all aggregate states, cause mapping, tamper rejection, hostile negatives, and deep immutability.

The R5 post-merge record contains one disclosed first-attempt Ubuntu failure in an unchanged pre-existing H4-R3G-B timing-sensitive test. There was no code/tree drift. Exactly one controlled same-SHA rerun passed Ubuntu tests and the final `k2-runtime-gate`; `WAIVER: NONE`. This roadmap does not claim every first attempt was green.

### K5 canonical evidence and closeout

The K5 definition and R1 authorization begin in `docs/planning/KODAC_K5_DEFINITION_AND_R1_PROOF_PACKAGE_JUDGMENT_AUTHORIZATION_2026-08-25.md`. Separate canonical authorization/evidence gates then admitted R2, R3, R4, and qualification-only R5.

The bounded closeout authorization is canonical at `f1457f8e7efd1e09e2d55e73fc0e4ea860bf8762` and is recorded in `docs/planning/KODAC_K5_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-26.md`.

The complete PR #190–#200 ledger, exact R5 identities, anomaly disclosure, bounded exit matrix, closure meaning, platform applicability, and preserved non-grants are recorded in `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md`.

No K5-R6 is invented because the accepted roadmap already ends the implementation decomposition at R5 followed by this separate closeout gate.

## K6 — Proposed: Evidence Router & Outcome Learning

Proposed direction only:

- evidence-backed capability/model/evaluator routing;
- task/risk/context-aware routing decisions;
- privacy-governed outcome learning;
- measurable feedback from verified engineering outcomes.

K6 is **not authorized** by K5 closeout.

## K7 — Proposed: Kodac Bench & Distribution Hardening

Proposed direction only:

- reproducible benchmark infrastructure;
- cross-system comparison evidence;
- product and packaging hardening;
- distribution/readiness gates;
- release evidence discipline.

K7 is **not authorized** by K5 closeout and does not itself authorize distribution or public release.

## Roadmap rules

1. `Defined`, `authorized for planning`, `implementation authorized`, `implemented`, `canonical`, `closed`, and `released` are distinct states.
2. A roadmap entry never grants source-intake or implementation authority by implication.
3. K3-R1 through K3-R6 are canonical only for their already-authorized bounded scopes; K3 closure does not authorize K3-R7+ or expand any accepted K3 contract.
4. K4 is closed only for the bounded canonical K4-R1 through K4-R5 data-only surface. K4-R6+ remains unauthorized, and no external standard name, declaration, method, metadata, digest, capability advertisement, package evidence, governance claim, evaluation identity, `allowed-tools` declaration, or registry membership is executable authority.
5. KRI-P0 grants planning/contract-design authority only; KRI-R1 through KRI-R4 are canonical only for their separately authorized bounded scopes, while KRI-R5+ remains unauthorized.
6. K5-R1 through K5-R5 are canonical only for their separately authorized bounded proof-review scopes. K5 closure is conditional on this exact closeout gate. K5-R6+ is not required and remains unauthorized. No K5 state grants Done Gate `PROVEN_READY`, reviewer truth, policy authority, repository mutation, approval, or merge authority.
7. Storage engines, donors, models, protocols, and implementation tactics remain replaceable behind accepted Kodac boundaries unless separately ratified.
8. Superiority claims require reproducible benchmark evidence.
9. Public product versions and engineering milestones are separate governance tracks.

## Current boundary

```text
K0/K1: CLOSED
K2: CLOSED
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
NEW KODAC DEPENDENCIES: NOT AUTHORIZED
EXTERNAL REVIEW SERVICE INTEGRATION: NOT AUTHORIZED
PERSISTENT REVIEW / PROOF STORAGE OR LEARNING: NOT AUTHORIZED
REPOSITORY WRITE / REVIEW / APPROVAL / MERGE AUTHORITY: NOT AUTHORIZED BY KRI OR K5

PERSISTENT STORAGE: NOT AUTHORIZED
VECTOR / EMBEDDING INFRASTRUCTURE: NOT AUTHORIZED
PUBLIC RELEASE: NOT AUTHORIZED
PACKAGE PUBLICATION: NOT AUTHORIZED
BRAND LAUNCH: NOT AUTHORIZED
KODAC NAME / TRADEMARK CLEARANCE: NOT ESTABLISHED
```

## Preserved non-grants

```text
KRI-R5+ IMPLEMENTATION: NOT AUTHORIZED
K5-R6+ IMPLEMENTATION: NOT AUTHORIZED
K6 / K7 IMPLEMENTATION: NOT AUTHORIZED BY THIS CLOSEOUT
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
