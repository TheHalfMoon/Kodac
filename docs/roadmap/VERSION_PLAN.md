# Kodac Version Plan

## Purpose

This file summarizes current version/program sequencing. It is not an authorization record. Live GitHub, root `AGENTS.md`, accepted ADRs, and exact canonical authorization/evidence records control implementation and merge authority.

---

## Current bounded program state

```text
K0 / K1 = CLOSED
K2 = CLOSED / TRUSTED SIDE-EFFECT EXECUTION BOUNDARY
K3 BOUNDED R1-R6 = CLOSED
KRI-R1 THROUGH KRI-R4 = CLOSED_CANONICAL
K4 BOUNDED R1-R5 = CLOSED_CANONICAL
K5 BOUNDED R1-R5 = CLOSED_CANONICAL
K6 BOUNDED CLOSEOUT = CLOSED_CANONICAL

P2-R1 THROUGH P2-R6 = CLOSED_CANONICAL
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED

P3 BOUNDED R1-R17 ENGINEERING SCOPE = CLOSED_CANONICAL
P3 OVERALL = OPEN

P4 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL
P4 OVERALL = OPEN

P5-R1 EVIDENCE PROVENANCE BINDING = CLOSED_CANONICAL
P5-R2 EVIDENCE RELATION EDGE = CLOSED_CANONICAL
P5 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL / #341 / proof 5551577054
P5 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL / #343 / proof 5551673149
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
AUTOMATIC FRESHNESS / DEPENDENCY INVALIDATION = NOT_AUTHORIZED
P5 OVERALL = NOT_CLOSED

P6-R1 AUTHORIZATION = CLOSED_CANONICAL / #344 / proof 5551754576
P6-R1 DETERMINISTIC SECURITY FINDING FOUNDATION = CLOSED_CANONICAL / #345 / proof 5551884329
P6-R1 POST-MERGE CURRENT-VIEW RECONCILIATION AUTHORIZATION = CLOSED_CANONICAL / #346 / proof 5551929413
P6-R1 POST-MERGE CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL / #347 / proof 5551961606
P6 BOUNDED R1 CLOSEOUT AUTHORIZATION = CLOSED_CANONICAL / #348 / proof 5551993370
P6 BOUNDED R1 ENGINEERING SCOPE = CURRENT_CLOSEOUT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P6 OVERALL = NOT_CLOSED

SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
P7-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Canonical P5-to-P6 sequence

```text
#332 P5-R1 authorization
  -> #333 P5-R1 implementation
  -> #334 P5-R1 reconciliation authorization
  -> #335 P5-R1 current-view reconciliation
  -> #336 P5-R2 authorization
  -> #337 P5-R2 implementation
  -> #338 P5-R2 reconciliation authorization
  -> #339 P5-R2 current-view reconciliation
  -> #340 P5 bounded R1-R2 closeout authorization
  -> #341 P5 bounded R1-R2 engineering closeout
  -> #342 P5 post-closeout current-view reconciliation authorization
  -> #343 P5 post-closeout current-view reconciliation
  -> #343 comment 5551702980 fresh successor analysis / ANALYSIS_ONLY
  -> #344 P6-R1 authorization
  -> #345 P6-R1 implementation
  -> #345 comment 5551909496 P6-R1 reconciliation analysis / ANALYSIS_ONLY
  -> #346 P6-R1 current-view reconciliation authorization
  -> #347 P6-R1 current-view reconciliation
  -> #347 comment 5551968892 fresh post-R1 successor analysis / ANALYSIS_ONLY
  -> #348 P6 bounded R1 closeout authorization
  -> CURRENT: six-path P6 bounded R1 closeout candidate
```

Canonical P6 anchors:

```text
#343 = 48a4d0944c620a8cca7f25ea7eb24e794be8768f / proof 5551673149
#344 = 208bfc370c8671bd9b5a71d659355aa08e40d65a / proof 5551754576
#345 = 0f907b6f6e12a15da753e836b124c586ee9fe285 / proof 5551884329
#345 final qualified head = 60bc2e3e157b8eacac145ef22fa7cdaae1428baa
#346 = acce1c1644250cc4afd2008175d41d41ca51de87 / proof 5551929413
#347 = fd2c53682dde47b795740cc706b28852397f3ec6 / proof 5551961606
#347 successor analysis = 5551968892 / ANALYSIS_ONLY
#348 = 82cb0e1b2c4739537a1355ec6e6fdd63759cbc5d / proof 5551993370
```

---

## Release-independent P6-R1 meaning

P6-R1 is one internal pure/data-only provider-neutral deterministic security finding contract over an exact validated P5-R1 provenance binding. It carries bounded normalized finding identity metadata only; it executes no scanner, accesses no secret/network, ingests no SARIF, and establishes no proof, truth, exploitability, clean-scan, Done Gate, product, or release claim.

Canonical implementation blobs:

```text
P6-R1 source = 453166c7f8c5e49f9b0f7cc2cd744c7ec54b38d0
P6-R1 schema = d7586b0d434cca713ea7d112d6d1b0407558cc50
P6-R1 test = fa489fafd8cb8ecfc3ff684fa08425b1ed48ab67
```

Required boundaries:

```text
DETERMINISTIC_SECURITY_FINDING != PROOF / TRUTH / ADJUDICATION
DETERMINISTIC_SECURITY_FINDING != EXPLOITABILITY_ESTABLISHED
DETERMINISTIC_SECURITY_FINDING != CLEAN_SCAN_OR SAFE_CLAIM
DETERMINISTIC_SECURITY_FINDING != REVIEWER_CLAIM
DETERMINISTIC_SECURITY_FINDING != VERIFIER_OR_SCANNER_EXECUTION
DETERMINISTIC_SECURITY_FINDING != SARIF_INGESTION
DETERMINISTIC_SECURITY_FINDING != SECRET_OR NETWORK_ACCESS
DETERMINISTIC_SECURITY_FINDING != K2_K5_DONE_GATE_AUTHORITY
P6 BOUNDED R1 CLOSED != P6-R2+ AUTHORITY
P6 BOUNDED R1 CLOSED != P6 OVERALL CLOSED
P6 BOUNDED R1 CLOSED != P7 AUTHORITY
```

---

## Current bounded-closeout candidate

Canonical #348 and post-merge proof `5551993370` authorize only:

```text
docs/planning/KODAC_P6_BOUNDED_R1_CANONICAL_CLOSEOUT_EVIDENCE_2026-09-05.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No seventh path. This candidate may aggregate already-proven P6-R1 lineage and bounded-closeout evidence but must not self-certify its own closeout. Only future external post-merge proof may establish aggregate bounded closure.

Until then:

```text
P6 BOUNDED R1 ENGINEERING SCOPE = CURRENT_CLOSEOUT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
```

---

## Future dependency map

The Trust and Verification v2 amendment remains planning direction only:

```text
P2 KodacBench 2.0
P3 Context Engine v2
P4 Reviewer Intelligence v2
P5 Proof and Verification Fabric
P6 Security, Supply-Chain, and Attack Validation
P7 Bounded Remediation
P8 Agent Trust Gateway and Developer Distribution
P9 Continuous Assurance
R Advanced Research
```

P6-R1 is one closed bounded mechanism. Even if the current six-path candidate later closes the bounded R1 engineering scope, that fact will not authorize the next P6 number or any execution/integration stage merely because it appears in the dependency map.

Fresh analysis `#347 / 5551968892` found no additional numbered P6 mechanism proven necessary before bounded closeout. Execution-coupled analyzer manifests/effective-policy receipts, broader provider artifact lifecycle, SARIF adapters, and exploit/attack validation remain future unauthorized surfaces.

---

## Preserved non-grants

```text
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE AUTHORITY = UNCHANGED
P2 OVERALL = OPEN
P3 OVERALL = OPEN
P4 OVERALL = OPEN
P5 OVERALL = NOT_CLOSED
P6 OVERALL = NOT_CLOSED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
AUTOMATIC FRESHNESS / DEPENDENCY INVALIDATION = NOT_AUTHORIZED
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
REVIEWER / CRITIC / VERIFIER / PROVIDER / MODEL EXECUTION EXPANSION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
KRI / K5 / K2 AUTHORITY MUTATION = NOT_AUTHORIZED
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
PUBLIC SUPERIORITY / BEST-IN-CLASS CLAIM = NOT_AUTHORIZED
P7-P9 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Version/release boundary

No version bump, package publication, release tag, deployment, public benchmark claim, or product availability change is authorized by this closeout candidate.

Only after the exact six-path P6 bounded R1 closeout is post-merge proven may fresh post-closeout current-view reconciliation analysis run. No P6-R2, scanner execution, SARIF, attack validation, dependency admission, P7, product, or release authority follows by composition.
