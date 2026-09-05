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
P6 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL / #351 / proof 5552175515
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P6 OVERALL = NOT_CLOSED

P7-R1 AUTHORIZATION = CLOSED_CANONICAL / #352 / proof 5552233040
P7-R1 IMMUTABLE PATCH PROPOSAL FOUNDATION = CLOSED_CANONICAL / #353 / proof 5552429216
P7-R1 POST-MERGE CURRENT-VIEW RECONCILIATION AUTHORIZATION = CLOSED_CANONICAL / #354 / proof 5552462948
P7-R1 POST-MERGE CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
P7-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P7 OVERALL = NOT_CLOSED

PATCH_APPLICATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_AUTHORITY_EXPANSION = NONE
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
P8-P9 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Product-facing P5/P6/P7 meaning

P5 and P6 bounded closures remain internal trust/evidence/security mechanisms. They do not imply product availability, API stability, package publication, provider/model availability, scanner execution, proof completion, or release authority.

P7-R1 is also internal and bounded. It provides one pure/data-only immutable patch proposal contract over a current KRI-R2 finding and its first `CONFIRM` adjudication. It binds exact canonical-base/target-head identities, an immutable patch-artifact SHA-256 identity, and one bounded canonically ordered declared change set into a deterministic content-addressed detached/frozen `PROPOSED` record.

P7-R1 does **not** fetch, parse, trust, apply, or execute patch bytes; write repository state; invoke K2; mark a finding fixed; establish verified remediation or Done Gate; expose a product/API/CLI surface; or authorize release.

Canonical P7-R1 implementation blobs:

```text
P7-R1 source = 1dbf53388e22e0c88c6d90fa07f3f7f02a0b36f7
P7-R1 schema = 3e9665d2e157ffb69d09f81324abc32c9ae2cb18
P7-R1 test = 5eeee7b8f9027e759366e697b7c1924e2739d84c
```

Required non-equivalences:

```text
PATCH_PROPOSAL != AUTHORIZATION_TO_APPLY
PATCH_PROPOSAL != APPLIED_PATCH
PATCH_PROPOSAL != VERIFIED_REMEDIATION
PATCH_PROPOSAL != FIXED_FINDING
PATCH_PROPOSAL != DONE_GATE
PATCH_ARTIFACT_DIGEST != PATCH_VALIDATION
DECLARED_CHANGE_SET != EXECUTED_WRITE_SET
P7-R1 CLOSED != P7-R2+ AUTHORITY
P7-R1 CLOSED != P7 OVERALL CLOSED
P7-R1 CLOSED != P8 AUTHORITY
P7-R1 CLOSED != PROJECT COMPLETION
```

---

## Canonical P7 proof anchors

```text
#351 P6 post-closeout current-view reconciliation = CLOSED_CANONICAL / proof 5552175515
#352 P7-R1 authorization = CLOSED_CANONICAL / proof 5552233040
#353 P7-R1 immutable patch proposal implementation = ce48aa20845874e8b0d9e9e7b250f1499bc4664e / proof 5552429216
#353 post-merge reconciliation analysis = comment 5552433653 / ANALYSIS_ONLY
#354 P7-R1 post-merge current-view reconciliation authorization = 352eaa28879275e500026cf8d787bb25322b6ef2 / proof 5552462948
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
```

---

## Current authorized unit

Canonical #354 and proof `5552462948` authorize exactly this five-path documentation-only reconciliation candidate:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized.

The candidate records only already-proven canonical P6/P7-R1 facts and preserves every still-effective non-grant. It changes no runtime, schema, tests, workflows, dependencies, lockfiles, historical authorization/evidence records, KRI/K5/K2 authority, persistence, product implementation, release surface, or repository protection.

The candidate cannot claim its own reconciliation closure before guarded merge and external post-merge proof:

```text
P7-R1 POST-MERGE CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
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
P7 OVERALL = NOT_CLOSED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
AUTOMATIC FRESHNESS / DEPENDENCY INVALIDATION = NOT_AUTHORIZED
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P7-R2+ = NOT_AUTHORIZED_BY_NUMBERING
PATCH_APPLICATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_AUTHORITY_EXPANSION = NONE
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
REVIEWER / CRITIC / VERIFIER / PROVIDER / MODEL EXECUTION EXPANSION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
KRI / K5 / K2 AUTHORITY MUTATION = NOT_AUTHORIZED
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
PUBLIC SUPERIORITY / BEST-IN-CLASS CLAIM = NOT_AUTHORIZED
P8-P9 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Next product-status boundary

Complete exact-head qualification, guarded merge, and post-merge proof for this exact five-current-view reconciliation. Only then may fresh successor-authority analysis determine whether any additional bounded P7 mechanism is independently necessary and non-duplicative.

No P7-R2, patch application, K2 invocation, autofix, provider/model invocation, product integration, release, or project-completion authority follows by numbering or composition.