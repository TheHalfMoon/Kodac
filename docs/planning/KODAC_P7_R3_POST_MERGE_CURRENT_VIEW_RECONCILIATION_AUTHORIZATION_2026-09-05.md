# Kodac P7-R3 — Post-Merge Current-View Reconciliation Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_RECONCILIATION_AUTHORITY UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 4f464286443d4298f78b5bcc873aa2c4203054b9
P7_R2_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #359 / proof 5552811852
P7_R3_PRE_EXECUTION_INTENT_BINDING_AUTHORIZATION = CLOSED_CANONICAL / PR #360 / proof 5552924883
P7_R3_PRE_EXECUTION_INTENT_BINDING_IMPLEMENTATION = CLOSED_CANONICAL / PR #361 / proof 5553018473
P7_R3_POST_MERGE_RECONCILIATION_ANALYSIS = PR #361 / comment 5553023397 / ANALYSIS_ONLY
P7_OVERALL = NOT_CLOSED
WAIVER = NO
```

This record is documentation-only. While unmerged or unproven it creates no current-view mutation, runtime, patch-application, K2, filesystem/Git, lifecycle, product, release, successor, or project-completion authority.

---

## 2. Proven current-view drift

Fresh inspection on canonical `main` found all five current views stale against already-proven P7 lineage. They still describe P7-R2 post-merge current-view reconciliation as a current candidate and still deny P7-R3 by numbering, although canonical external proof now establishes P7-R2 reconciliation closure, P7-R3 authorization closure, and P7-R3 pure/data-only implementation closure.

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
P7_R2_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / #359 / proof 5552811852
P7_R3_PRE_EXECUTION_INTENT_BINDING_AUTHORIZATION = CLOSED_CANONICAL / #360 / proof 5552924883
P7_R3_PRE_EXECUTION_INTENT_BINDING_IMPLEMENTATION = CLOSED_CANONICAL / #361 / proof 5553018473
P7_R3_BINDING = PURE_DATA_ONLY
```

The later reconciliation must keep its own status non-canonical until its guarded merge and external post-merge proof are complete.

---

## 4. Required preserved boundaries

The reconciliation must preserve these non-grants exactly in substance:

```text
P7_R1_PATCH_PROPOSAL = PURE_DATA_ONLY
P7_R2_AUTHORIZATION_RECORD = PURE_DATA_ONLY
P7_R3_PRE_EXECUTION_BINDING = PURE_DATA_ONLY
P7_R3_BINDING != PATCH_APPLICATION
P7_R3_BINDING != K2_EXECUTION
P7_R3_BINDING != GENERIC_K2_ONE_SHOT_APPROVAL
P7_R3_BINDING != APPLIED
P7_R3_BINDING != VERIFICATION_FAILED
P7_R3_BINDING != VERIFIED
P7_R3_BINDING != FIXED
P7_R3_BINDING != REVERIFIED
P7_R3_BINDING != DONE_GATE
P7_R3_BINDING != AUTOFIX
PATCH_APPLICATION = NOT_AUTHORIZED
K2_INVOCATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_AUTHORITY_EXPANSION = NONE
APPLIED_VERIFICATION_FAILED_VERIFIED = NOT_ESTABLISHED
FIXED_REVERIFIED_DONE_GATE = NOT_ESTABLISHED
P7_R4_PLUS = NOT_AUTHORIZED_BY_NUMBERING
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

The reconciliation may not alter runtime, schema, tests, workflows, dependencies, lockfiles, accepted ADRs, historical authorization/evidence records, KRI/K5/K2 authority, benchmark data, provider/model configuration, persistence, product implementation, release configuration, repository protection, or any other path.

---

## 5. P7-R3 meaning that current views may record

The five current views may summarize the already-proven P7-R3 mechanism as:

```text
ONE EXACT VALID P7-R1 PROPOSAL
+ ONE EXACT VALID MATCHING P7-R2 AUTHORIZATION
+ EXACT INERT PATCH TEXT <= 1_048_576 UTF-8 BYTES
+ SHA256(PATCH TEXT) == P7-R2 PATCH ARTIFACT DIGEST
+ CANONICAL PURE PATCH PARSE
+ NO MOVE SEMANTICS
+ EXACT PATH / OPERATION EQUALITY WITH P7-R1 CHANGE PROJECTION
-> DETERMINISTIC CONTENT-ADDRESSED DETACHED/FROZEN PRE-EXECUTION BINDING
```

Required derived projection:

```text
authorizationIdentity = validated P7-R2 authorization identity
proposalIdentity = validated P7-R1 proposal identity
repositoryIdentity = validated source repository identity
canonicalBase = validated source canonical base
targetHead = validated source target head
patchArtifactDigest = validated P7-R2 patch artifact digest
capability = repo.apply_patch
inputDigest = sha256(exact patch text)
paths = exact P7-R2 writeAllowlist
operations = exact P7-R1 path / operation projection
patchByteLength = exact UTF-8 byte length
```

Required non-equivalences:

```text
PRE_EXECUTION_BINDING != PATCH_APPLICATION
PRE_EXECUTION_BINDING != K2_EXECUTION
PRE_EXECUTION_BINDING != APPLIED
PRE_EXECUTION_BINDING != VERIFIED
PRE_EXECUTION_BINDING != FIXED
PRE_EXECUTION_BINDING != DONE_GATE
PATCH_DIGEST_MATCH != PATCH_SEMANTIC_CORRECTNESS
WRITE_ALLOWLIST_MATCH != EXECUTED_WRITE_SET
P7_R3_CLOSED != P7_R4_PLUS_AUTHORITY
P7_R3_CLOSED != P7_OVERALL_CLOSED
P7_R3_CLOSED != P8_AUTHORITY
P7_R3_CLOSED != PROJECT_COMPLETION
```

Canonical implementation blobs that the reconciliation may record but must not modify:

```text
packages/kodac-runtime/src/remediation/p7-patch-execution-intent-binding.ts
  = 53119aded3de7c945967248e5ec19196bf03e2c7
schema/p7-patch-execution-intent-binding.schema.json
  = 74852ac9141f28466c7a3902df7441b876bd919d
packages/kodac-runtime/test/p7-r3-patch-execution-intent-binding.test.ts
  = 011a7e53f10da80138ac8f4cc06a33c505c38fb0
```

---

## 6. Qualification gate for this authorization candidate

Do not merge this record unless one unchanged exact head proves:

```text
BASE == CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P7_R3_POST_MERGE_CURRENT_VIEW_RECONCILIATION_AUTHORIZATION_2026-09-05.md
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

Any byte/head/base/qualification-relevant movement invalidates exact-head qualification evidence.

---

## 7. After this authorization becomes canonical

The only newly authorized action is one five-path documentation-only current-view reconciliation candidate.

After that reconciliation itself qualifies, merges guarded, and is post-merge proven, fresh successor-authority analysis may inspect canonical planning and live code to determine whether any additional bounded P7 mechanism is independently necessary and non-duplicative.

No P7-R4, patch application, K2 invocation, autofix, lifecycle advancement, P8/P9 implementation, product/release work, or project completion follows from this record by numbering or composition.
