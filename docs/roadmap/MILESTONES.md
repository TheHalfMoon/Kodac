# Kodac Engineering Milestones

## Authority

This document records current engineering milestone status after canonical closeout of K0/K1, K2, K3-R1 through K3-R6, and the bounded K4-R1 through K4-R5 data-only ecosystem-compatibility surface, plus KRI-P0 planning authority and the separately authorized bounded KRI-R1 through KRI-R4 implementation slices. This document does not authorize public release or implementation beyond an explicitly approved gate.

K4 bounded closeout is canonical at merge `dcd3693826d9282b475d99c6b9e658b9695e63a8` after its required exact-head and post-merge proof.

K5-R1 through K5-R5 are canonical for their separately authorized bounded scopes. K5 bounded-closeout authorization is canonical at merge `f1457f8e7efd1e09e2d55e73fc0e4ea860bf8762`. The K5 `CLOSED` state in this candidate is conditional until the exact-head closeout gate, expected-head merge, and required post-merge ordered-parent/tree/blob/protected-main verification in `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md` all pass.

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

The exact K3-R6 scope is defined in `docs/planning/KODAC_K3_R6_SNAPSHOT_RELATION_GRAPH_AUTHORIZATION_2026-08-24.md`; the narrow review-hardening extension is defined in `docs/planning/KODAC_K3_R6_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md`; and canonical closeout evidence is recorded in `docs/planning/KODAC_K3_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-24.md`.

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
K4-R4: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY AGENT SKILL PACKAGE-EVIDENCE SCOPE
K4-R5: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY AGENT SKILL GOVERNANCE-CLAIM EVIDENCE SCOPE
K4-R6+: NOT REQUIRED FOR K4 CLOSEOUT / NOT AUTHORIZED
```

K4 is closed only for its accepted data-only surface. K4-R1 standard pins and normalization, K4-R2 MCP catalog evidence, K4-R3 pinned ACP method-catalog evidence, K4-R4 redacted Agent Skill package evidence, and K4-R5 caller-asserted governance-claim evidence do not grant transport, installation, activation, routing, trust, effect, or execution authority.

The bounded K4 closeout authorization is recorded in `docs/planning/KODAC_K4_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-25.md`; the complete ledger and preserved boundaries are recorded in `docs/planning/KODAC_K4_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-25.md`.

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

K2 remains the sole trusted side-effect execution authority. The reconciliation basis and exact canonical merge identities are recorded in `docs/planning/KODAC_KRI_R1_R4_ROADMAP_TRUTH_RECONCILIATION_2026-08-24.md`.

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

The canonical bounded slices are:

- **K5-R1:** strict caller-materialized proof-package contract plus deterministic package judgment. Its package-state vocabulary is `SUFFICIENT_PACKAGE`, `INSUFFICIENT_PACKAGE`, `CONTRADICTORY_PACKAGE`, `STALE_PACKAGE`, and `INVALID_PACKAGE`.
- **K5-R2:** deterministic linkage to caller-materialized verification reports, execution receipts, and repository-revision evidence.
- **K5-R3:** deterministic linkage to caller-materialized canonical KRI finding/adjudication evidence without transfer of KRI reviewer/adjudication authority.
- **K5-R4:** deterministic proof-state reconciliation using `VALID`, `INCOMPLETE`, `STALE`, `CONTRADICTORY`, `INVALID`, and `NOT_APPLICABLE`, with fixed cause vocabulary and precedence. `ARTIFACT` and `CUSTOM` remain outside linked-evidence authority.
- **K5-R5:** qualification-only integrated R1-R4 proof using inert canonical fixtures, deterministic identities, order/precedence checks, package/revision/membership binding, tamper rejection, hostile negatives, and immutability; no production source is added by R5.

No K5 state is `PROVEN_READY`. `SUFFICIENT_PACKAGE` and `VALID` are proof-review states only. The existing Done Gate retains `PROVEN_READY` / `NOT_READY` authority.

The R5 post-merge evidence truthfully records one first-attempt Ubuntu failure in an unchanged pre-existing H4-R3G-B timing-sensitive test, followed by exactly one controlled same-SHA/no-drift rerun that passed with the final `k2-runtime-gate`. `WAIVER: NONE`; the first failure remains disclosed.

The staged K5 definition/authorization chain begins at `docs/planning/KODAC_K5_DEFINITION_AND_R1_PROOF_PACKAGE_JUDGMENT_AUTHORIZATION_2026-08-25.md` and continues through the R2/R3/R4/R5 authorization records.

The bounded K5 closeout authorization is recorded in `docs/planning/KODAC_K5_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-26.md`.

The complete canonical K5 ledger, R5 anomaly disclosure, exit matrix, platform applicability, closure meaning, and non-grants are recorded in `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md`.

### K5 closeout meaning

If and only if the exact closeout merge and post-merge gate pass, K5 is closed for the accepted R1-R5 bounded proof-review surface. This does not authorize K5-R6+, KRI-R5+, K6, K7, Done Gate modification, proof-to-`PROVEN_READY` promotion, concrete reviewer/provider/model execution, network/secrets, repository write/review/approval/merge authority, persistence/learning/routing, new dependencies, donor source, or release work.

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

## Preserved non-grants

```text
KRI-R5+ IMPLEMENTATION: NOT AUTHORIZED
K5-R6+ IMPLEMENTATION: NOT AUTHORIZED
K6 / K7 IMPLEMENTATION: NOT AUTHORIZED BY THIS CLOSEOUT
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
