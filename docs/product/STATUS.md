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
P6-R1 POST-MERGE CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL / #347 / proof 5551961606
P6 BOUNDED R1 CLOSEOUT AUTHORIZATION = CLOSED_CANONICAL / #348 / proof 5551993370
P6 BOUNDED R1 ENGINEERING SCOPE = CLOSED_CANONICAL / #349 / proof 5552035602
P6 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION AUTHORIZATION = CLOSED_CANONICAL / #350 / proof 5552132556
P6 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
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

## Canonical P6 proof anchors

```text
#344 P6-R1 authorization = 208bfc370c8671bd9b5a71d659355aa08e40d65a / proof 5551754576
#345 P6-R1 implementation = 0f907b6f6e12a15da753e836b124c586ee9fe285 / proof 5551884329
#345 final qualified P6-R1 head = 60bc2e3e157b8eacac145ef22fa7cdaae1428baa
#347 P6-R1 current-view reconciliation = fd2c53682dde47b795740cc706b28852397f3ec6 / proof 5551961606
#347 post-P6-R1 successor analysis = comment 5551968892 / ANALYSIS_ONLY
#348 P6 bounded R1 closeout authorization = 82cb0e1b2c4739537a1355ec6e6fdd63759cbc5d / proof 5551993370
#349 P6 bounded R1 engineering closeout = 206741c67021864ffdaea1f57aa91bf7d1509a48 / proof 5552035602
#349 post-closeout reconciliation analysis = comment 5552036750 / ANALYSIS_ONLY
#350 P6 post-closeout reconciliation authorization = 2f2596a6c316863abf6effca46d6e88fbdc314a8 / proof 5552132556
RULESET = 20707483 / active / no bypass
```

---

## Current authorized unit

Canonical #350 and proof `5552132556` authorize exactly this five-path documentation-only reconciliation candidate:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized.

The candidate records already-proven P6 bounded R1 closeout truth and preserves every still-effective non-grant. It changes no runtime, schema, test, dependency, workflow, historical authorization/evidence, KRI/K5/K2 authority, persistence, product implementation, or release surface.

The candidate cannot claim its own reconciliation closure before guarded merge and external post-merge proof:

```text
P6 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
```

---

## Why no product-facing P6-R2 is inferred

Fresh post-P6-R1 analysis `#347 / 5551968892` found no additional pure/data-only P6 mechanism proven both non-duplicative and necessary before bounded closeout. The later post-closeout reconciliation analysis `#349 / 5552036750` identified only current-view drift and created no successor authority.

Execution manifests and effective-policy receipts are coupled to real scanner/analyzer invocation and trusted K2 enforcement. Provider artifact lifecycle and SARIF adapters are broader future integration surfaces. Exploit/attack validation is a future side-effectful execution surface. None is currently authorized merely because planning names exist.

```text
P6_R2_PLUS = NOT_AUTHORIZED_BY_NUMBERING
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
SECRET_NETWORK_EXPLOIT_ACCESS = NOT_AUTHORIZED
```

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

Complete exact-head qualification, guarded merge, and post-merge proof for this exact five-current-view reconciliation. Only then may fresh successor-authority analysis determine whether any additional bounded P6 mechanism is justified or whether canonical P6 scope has converged as far as currently authorized planning permits.

No P6-R2, scanner execution, SARIF, provider/model invocation, secret/network access, exploit validation, dependency admission, P7, product, or release authority follows by numbering or composition.
