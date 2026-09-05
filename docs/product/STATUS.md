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

P6-R1 DETERMINISTIC SECURITY FINDING FOUNDATION = CLOSED_CANONICAL / #345 / proof 5551884329
P6 BOUNDED R1 ENGINEERING SCOPE = CLOSED_CANONICAL / #349 / proof 5552035602
P6 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL / #351 / proof 5552175515
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P6 OVERALL = NOT_CLOSED

P7-R1 AUTHORIZATION = CLOSED_CANONICAL / #352 / proof 5552233040
P7-R1 IMMUTABLE PATCH PROPOSAL FOUNDATION = CLOSED_CANONICAL / #353 / proof 5552429216
P7-R1 POST-MERGE CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL / #355 / proof 5552575380
P7-R2 PATCH-APPLICATION AUTHORIZATION = CLOSED_CANONICAL / #356 / proof 5552630320
P7-R2 PATCH-APPLICATION AUTHORIZATION IMPLEMENTATION = CLOSED_CANONICAL / #357 / proof 5552730805
P7-R2 POST-MERGE CURRENT-VIEW RECONCILIATION AUTHORIZATION = CLOSED_CANONICAL / #358 / proof 5552762029
P7-R2 POST-MERGE CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
P7-R3+ = NOT_AUTHORIZED_BY_NUMBERING
P7 OVERALL = NOT_CLOSED

PATCH_APPLICATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_INVOCATION = NOT_AUTHORIZED
K2_AUTHORITY_EXPANSION = NONE
APPLIED_VERIFIED_FIXED_DONE = NOT_ESTABLISHED
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

## Product-facing P7 meaning

P7-R1 and P7-R2 remain internal bounded trust/remediation data contracts. They do not imply product availability, API stability, package publication, patch execution, repository mutation, K2 invocation, verified remediation, finding closure, Done Gate, or release authority.

P7-R1 provides one pure/data-only immutable patch proposal contract over a current KRI-R2 finding and its first `CONFIRM` adjudication.

P7-R2 provides a separate pure/data-only immutable `AUTHORIZED_TO_APPLY` decision record over one exact valid P7-R1 proposal. It derives repository identity, canonical base, target head, patch-artifact digest, and the exact write allowlist from the validated P7-R1 source proposal; callers cannot independently expand or substitute that write scope.

Canonical P7-R2 implementation blobs:

```text
P7-R2 source = a8740b04e650c3317b65584ecdac6c8a4b764d10
P7-R2 schema = fec866d048a1d4fc93d712fbd676030bbd93d24f
P7-R2 test = 6764094e259ef5b22d5899ab5104f969e9f27fd2
```

Required non-equivalences:

```text
PATCH_PROPOSAL != AUTHORIZATION_TO_APPLY
AUTHORIZED_TO_APPLY != PATCH_APPLICATION
AUTHORIZED_TO_APPLY != K2_EXECUTION
AUTHORIZED_TO_APPLY != GENERIC_K2_ONE_SHOT_APPROVAL
AUTHORIZED_TO_APPLY != APPLIED_PATCH
AUTHORIZED_TO_APPLY != VERIFIED_REMEDIATION
AUTHORIZED_TO_APPLY != FIXED_FINDING
AUTHORIZED_TO_APPLY != DONE_GATE
WRITE_ALLOWLIST != EXECUTED_WRITE_SET
P7-R2 CLOSED != P7-R3+ AUTHORITY
P7-R2 CLOSED != P7 OVERALL CLOSED
P7-R2 CLOSED != P8 AUTHORITY
P7-R2 CLOSED != PROJECT COMPLETION
```

---

## Canonical P7 proof anchors

```text
#355 P7-R1 post-merge current-view reconciliation
  = 8bf95e90e42a1c27193942b336a3bc744b7cd7d8 / proof 5552575380

#355 successor analysis
  = comment 5552596379 / ANALYSIS_ONLY

#356 P7-R2 patch-application authorization
  = 0bd5aa263df07057b99bdf408a4b0cdab2636063 / proof 5552630320

#357 P7-R2 patch-application authorization implementation
  = 7bf6af800c0fa2b6413d3284a4f97db2b8683547 / proof 5552730805
  qualified head = 39497ed25fac7ae7870b10c5b8f87eac73a6eb4d

#357 post-R2 current-view reconciliation analysis
  = comment 5552739213 / ANALYSIS_ONLY

#358 P7-R2 post-merge current-view reconciliation authorization
  = 91f442a889ac825bca6a944830e64995be931da8 / proof 5552762029
  qualified head = 3cb314d513c2c41baad9f9d654e4961a3507d8bb

RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
```

---

## Current authorized unit

Canonical #358 and proof `5552762029` authorize exactly this five-path documentation-only reconciliation candidate:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized.

The candidate records only already-proven P7-R1/P7-R2 facts and preserves every still-effective non-grant. It changes no runtime, schema, tests, workflows, dependencies, lockfiles, historical authorization/evidence records, KRI/K5/K2 authority, persistence, product implementation, release surface, or repository protection.

The candidate cannot claim its own reconciliation closure before guarded merge and external post-merge proof:

```text
P7-R2 POST-MERGE CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
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
P7-R3+ = NOT_AUTHORIZED_BY_NUMBERING
PATCH_APPLICATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_INVOCATION = NOT_AUTHORIZED
K2_AUTHORITY_EXPANSION = NONE
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

No P7-R3, patch application, K2 invocation, autofix, provider/model invocation, product integration, release, or project-completion authority follows by numbering or composition.
