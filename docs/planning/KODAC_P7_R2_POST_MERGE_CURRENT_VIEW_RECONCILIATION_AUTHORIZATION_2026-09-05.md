# Kodac P7-R2 — Post-Merge Current-View Reconciliation Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_RECONCILIATION_AUTHORITY UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 7bf6af800c0fa2b6413d3284a4f97db2b8683547
P7_R1_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #355 / proof 5552575380
P7_R2_PATCH_APPLICATION_AUTHORIZATION = CLOSED_CANONICAL / PR #356 / proof 5552630320
P7_R2_PATCH_APPLICATION_AUTHORIZATION_IMPLEMENTATION = CLOSED_CANONICAL / PR #357 / proof 5552730805
P7_R2_POST_MERGE_RECONCILIATION_ANALYSIS = PR #357 / comment 5552739213 / ANALYSIS_ONLY
P7_OVERALL = NOT_CLOSED
WAIVER = NO
```

This record is documentation-only and creates no current-view mutation authority while unmerged or unproven.

---

## 2. Proven current-view drift

Fresh inspection on canonical `main` found all five current views stale against already-proven P7 lineage. They still describe P7-R1 current-view reconciliation as a current candidate and still deny P7-R2 by numbering, although canonical external proof now establishes P7-R1 reconciliation closure, P7-R2 authorization closure, and P7-R2 implementation closure.

The exact stale paths are:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth current-view path is proven necessary for this reconciliation.

---

## 3. Conditional reconciliation allowlist

Only after this authorization candidate itself qualifies on one unchanged exact head, merges using the guarded expected-head precondition, and receives complete post-merge proof may one later reconciliation candidate modify exactly the five paths listed above.

No sixth path is authorized.

The later reconciliation may record only already-proven canonical facts, including:

```text
P7_R1_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / #355 / proof 5552575380
P7_R2_PATCH_APPLICATION_AUTHORIZATION = CLOSED_CANONICAL / #356 / proof 5552630320
P7_R2_PATCH_APPLICATION_AUTHORIZATION_IMPLEMENTATION = CLOSED_CANONICAL / #357 / proof 5552730805
P7_R2_STATE = AUTHORIZED_TO_APPLY / PURE_DATA_ONLY_DECISION_RECORD
```

The later reconciliation must keep its own status non-canonical until its guarded merge and external post-merge proof are complete.

---

## 4. Required preserved boundaries

The reconciliation must preserve these non-grants exactly in substance:

```text
P7_R1_PATCH_PROPOSAL = PURE_DATA_ONLY
P7_R2_AUTHORIZATION_RECORD = PURE_DATA_ONLY
AUTHORIZED_TO_APPLY != PATCH_APPLICATION
AUTHORIZED_TO_APPLY != K2_EXECUTION
AUTHORIZED_TO_APPLY != GENERIC_K2_ONE_SHOT_APPROVAL
PATCH_APPLICATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_AUTHORITY_EXPANSION = NONE
APPLIED_VERIFIED_FIXED_DONE = NOT_ESTABLISHED
P7_R3_PLUS = NOT_AUTHORIZED_BY_NUMBERING
P8_P9_IMPLEMENTATION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
SECRET_NETWORK_ACCESS = NOT_AUTHORIZED
DEPENDENCY_DONOR_ADMISSION = NONE
PERSISTENCE_DATABASE_TELEMETRY_UPLOAD_LEARNING = NOT_AUTHORIZED
CLI_API_PACKAGE_ROOT_PRODUCT_INTEGRATION = NOT_AUTHORIZED
PUBLIC_RELEASE_PACKAGE_PUBLICATION_DEPLOYMENT = NOT_AUTHORIZED
RULESET_CHANGE_BYPASS = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The reconciliation may not alter runtime, schema, tests, workflows, dependencies, lockfiles, accepted ADRs, historical authorization/evidence records, KRI/K5/K2 authority, benchmark data, provider/model configuration, release configuration, repository protection, or any other path.

---

## 5. P7-R2 meaning that current views may record

The five current views may summarize the already-proven P7-R2 mechanism as:

```text
ONE EXACT VALID P7-R1 PROPOSAL
+ EXACT SOURCE-BOUND REPOSITORY / CANONICAL BASE / TARGET HEAD
+ EXACT SOURCE-BOUND PATCH ARTIFACT DIGEST
+ FIXED AUTHORIZED_TO_APPLY STATE
+ FIXED ACCEPT_RISK DISPOSITION
+ BOUNDED AUTHORZER / RATIONALE / EVIDENCE REFERENCES
+ WRITE ALLOWLIST DERIVED EXACTLY FROM SOURCE PROPOSAL CHANGE PATHS
-> DETERMINISTIC CONTENT-ADDRESSED DETACHED/FROZEN AUTHORIZATION RECORD
```

Required non-equivalences:

```text
AUTHORIZED_TO_APPLY != PATCH_APPLICATION
AUTHORIZED_TO_APPLY != APPLIED_PATCH
AUTHORIZED_TO_APPLY != VERIFIED_REMEDIATION
AUTHORIZED_TO_APPLY != FIXED_FINDING
AUTHORIZED_TO_APPLY != DONE_GATE
WRITE_ALLOWLIST != EXECUTED_WRITE_SET
P7_R2_CLOSED != P7_R3_PLUS_AUTHORITY
P7_R2_CLOSED != P7_OVERALL_CLOSED
P7_R2_CLOSED != P8_AUTHORITY
P7_R2_CLOSED != PROJECT_COMPLETION
```

Canonical implementation blobs that the reconciliation may record but must not modify:

```text
packages/kodac-runtime/src/remediation/p7-patch-application-authorization.ts
  = a8740b04e650c3317b65584ecdac6c8a4b764d10
schema/p7-patch-application-authorization.schema.json
  = fec866d048a1d4fc93d712fbd676030bbd93d24f
packages/kodac-runtime/test/p7-r2-patch-application-authorization.test.ts
  = 6764094e259ef5b22d5899ab5104f969e9f27fd2
```

---

## 6. Qualification gate for this authorization candidate

Do not merge this record unless one unchanged exact head proves:

```text
BASE == CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P7_R2_POST_MERGE_CURRENT_VIEW_RECONCILIATION_AUTHORIZATION_2026-09-05.md
REQUIRED_CI = TERMINAL_SUCCESS_OR_CANONICALLY_PROVEN_NON_APPLICABLE
INTERNAL_SUBSTANTIVE_SEMANTIC_SECURITY_INSPECTION = CLEAN
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
RULESET_20707483 = active / bypass_actors=[] / current_user_can_bypass=never
MERGE = GUARDED_NORMAL_MERGE_USING_EXACT_EXPECTED_HEAD_SHA
POST_MERGE_PROOF = REQUIRED
WAIVER = NO
```

---

## 7. After this authorization becomes canonical

The only newly authorized action is one five-path documentation-only current-view reconciliation candidate.

After that reconciliation itself qualifies, merges guarded, and is post-merge proven, fresh successor-authority analysis may inspect canonical planning and live code to determine whether any additional bounded P7 mechanism is independently necessary and non-duplicative.

No P7-R3, patch execution, K2 invocation, autofix, P8/P9 implementation, product/release work, or project completion follows from this record by numbering or composition.
