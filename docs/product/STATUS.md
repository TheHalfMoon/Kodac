# Product Document Authority Status

The pre-existing files in `docs/product/` remain preserved historical planning inputs. They do not override accepted Kodac ADRs, live GitHub truth, root `AGENTS.md`, current roadmap views, or exact canonical authorization/evidence records.

This file is a current status view only. It grants no implementation, execution, provider/model, persistence, dependency, product, release, merge, or project-completion authority.

---

## Current canonical status

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
P7-P9 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Product-facing P5/P6 meaning

P5-R1 and P5-R2 remain internal bounded trust/evidence mechanisms. Their canonical closure does not imply product availability, proof completion, API stability, package publication, provider/model availability, verifier execution, or release authority.

P6-R1 is also internal and bounded. It provides a pure/data-only deterministic security finding contract over a validated canonical P5-R1 provenance binding. It normalizes bounded finding identity metadata only.

P6-R1 does **not** execute a scanner/analyzer, ingest SARIF, access secrets, open network connections, execute exploits, establish truth or proof, claim a clean scan or safe repository, mutate K2/K5/Done Gate authority, expose a product/API/CLI surface, or authorize release.

Canonical P6-R1 implementation blobs:

```text
P6-R1 source = 453166c7f8c5e49f9b0f7cc2cd744c7ec54b38d0
P6-R1 schema = d7586b0d434cca713ea7d112d6d1b0407558cc50
P6-R1 test = fa489fafd8cb8ecfc3ff684fa08425b1ed48ab67
```

Required non-equivalences:

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
P6 BOUNDED R1 CLOSED != PROJECT COMPLETION
```

---

## Canonical P5/P6 proof anchors

```text
#341 P5 bounded R1-R2 closeout = 13ebbbbb3f1a3bb0a32c2873aa9ea6c67c1c8b9a / proof 5551577054
#342 P5 post-closeout reconciliation authorization = 8c4f57ba9245e9911422e3e14864f4258897621a / proof 5551608905
#343 P5 post-closeout reconciliation = 48a4d0944c620a8cca7f25ea7eb24e794be8768f / proof 5551673149
#343 fresh P6 successor analysis = comment 5551702980 / ANALYSIS_ONLY
#344 P6-R1 authorization = 208bfc370c8671bd9b5a71d659355aa08e40d65a / proof 5551754576
#345 P6-R1 implementation = 0f907b6f6e12a15da753e836b124c586ee9fe285 / proof 5551884329
#345 final qualified P6-R1 head = 60bc2e3e157b8eacac145ef22fa7cdaae1428baa
#345 P6-R1 reconciliation analysis = comment 5551909496 / ANALYSIS_ONLY
#346 P6-R1 reconciliation authorization = acce1c1644250cc4afd2008175d41d41ca51de87 / proof 5551929413
#347 P6-R1 current-view reconciliation = fd2c53682dde47b795740cc706b28852397f3ec6 / proof 5551961606
#347 post-P6-R1 successor analysis = comment 5551968892 / ANALYSIS_ONLY
#348 P6 bounded R1 closeout authorization = 82cb0e1b2c4739537a1355ec6e6fdd63759cbc5d / proof 5551993370
RULESET = 20707483 / active / no bypass
```

---

## Current authorized unit

Canonical #348 and proof `5551993370` authorize exactly this six-path documentation/evidence closeout candidate:

```text
docs/planning/KODAC_P6_BOUNDED_R1_CANONICAL_CLOSEOUT_EVIDENCE_2026-09-05.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No seventh path is authorized.

The candidate aggregates already-proven P6-R1 lineage and bounded-closeout evidence and preserves every still-effective non-grant. It changes no runtime, schema, test, dependency, workflow, historical authorization/evidence, KRI/K5/K2 authority, persistence, product implementation, or release surface.

The candidate cannot claim its own bounded closeout before guarded merge and external post-merge proof:

```text
P6 BOUNDED R1 ENGINEERING SCOPE = CURRENT_CLOSEOUT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
```

---

## Why no product-facing P6-R2 is inferred

Fresh post-P6-R1 analysis `#347 / 5551968892` found no additional pure/data-only P6 mechanism proven both non-duplicative and necessary before bounded closeout.

Execution manifests and effective-policy receipts are coupled to real scanner/analyzer invocation and trusted K2 enforcement. Provider artifact lifecycle and SARIF adapters are broader future integration surfaces. Exploit/attack validation is a future side-effectful execution surface. None is currently authorized merely because planning names exist.

```text
P6_R2_PLUS = NOT_AUTHORIZED_BY_NUMBERING
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
SECRET_NETWORK_EXPLOIT_ACCESS = NOT_AUTHORIZED
```

---

## Material evidence integrity

P6-R1 preserves its real forward-only TypeScript qualification repair from initial failed head `4953d0f3a1fa2f639e494ef74aedc4fb5c83bdea` to final qualified head `60bc2e3e157b8eacac145ef22fa7cdaae1428baa`. Pre-repair evidence is stale. The source/schema blobs remained unchanged; only the authorized test fixture typing was repaired before full requalification.

P5 material qualification history remains preserved by its canonical records and prior current-view evidence, including P5-R1's forward-only repair, the P5-R2 same-head Ubuntu rerun, #338's forward-only semantic repair, and #341's wording repair.

---

## Founder review policy

Canonical #325 establishes:

```text
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
EXTERNAL_REVIEW = OPTIONAL_ADVISORY_EVIDENCE
EXTERNAL_REVIEW_OUTAGE != REPOSITORY_BLOCKER
```

Known actionable findings remain binding. Internal substantive semantic/security inspection, exact-head CI, zero unresolved actionable threads, active ruleset/no-bypass proof, guarded merge, and post-merge proof remain mandatory.

---

## Product and release non-grants

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

## Next product-status boundary

Complete exact-head qualification, guarded merge, and post-merge proof for this exact six-path P6 bounded R1 closeout candidate. Only then may external evidence establish bounded R1 engineering closure and trigger fresh post-closeout current-view reconciliation analysis.

No P6-R2, scanner execution, SARIF, provider/model invocation, secret/network access, exploit validation, dependency admission, P7, product, or release authority follows by numbering or composition.
