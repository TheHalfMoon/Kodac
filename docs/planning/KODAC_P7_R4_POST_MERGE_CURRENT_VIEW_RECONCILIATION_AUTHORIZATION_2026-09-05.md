# Kodac P7-R4 — Post-Merge Current-View Reconciliation Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_RECONCILIATION_AUTHORITY UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 6c10d898ea43fda9003de761badd07c5b113043d
CANONICAL_TREE_AT_CANDIDATE_START = 1f25887ce387387ee517028ba8e85e2f4ed6caac
P7_R3_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #363 / proof 5553345846
P7_R4_AUTHORIZATION = CLOSED_CANONICAL / PR #364 / proof 5553391471
P7_R4_APPLIED_PATCH_EVIDENCE_BINDING = CLOSED_CANONICAL / PR #365 / proof 5553509882
P7_R4_CURRENT_VIEW_RECONCILIATION_ANALYSIS = PR #365 / comment 5553524060 / ANALYSIS_ONLY
P7_OVERALL = NOT_CLOSED
WAIVER = NO
```

This file is documentation-only. Until this exact authorization candidate qualifies, merges through the guarded expected-head path, and receives complete post-merge proof, it creates no authority to edit the five current views or any other repository path.

---

## 2. Verified drift requiring bounded reconciliation

Direct reads from exact canonical `main` prove these five current views are stale relative to already-established canonical evidence:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

They still describe the P7-R3 post-merge current-view reconciliation as a current candidate and P7-R4+ as unauthorized, while canonical proof now establishes:

```text
P7-R3 post-merge current-view reconciliation = CLOSED_CANONICAL / #363 / proof 5553345846
P7-R4 authorization = CLOSED_CANONICAL / #364 / proof 5553391471
P7-R4 implementation = CLOSED_CANONICAL / #365 / proof 5553509882
```

No runtime, schema, test, workflow, dependency, product, release, ruleset, or historical evidence repair is required by this drift.

---

## 3. Conditional future reconciliation allowlist

Only after this authorization candidate itself becomes closed canonical may one later reconciliation candidate modify exactly these five paths:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized.

The later candidate may only reconcile those views to already-proven canonical truth. It may not alter runtime, schemas, tests, workflows, dependencies, historical authorization/evidence records, branch/ruleset configuration, benchmark artifacts, provider/model configuration, persistence, product implementation, release configuration, or any other path.

---

## 4. Facts the later reconciliation may record

The later five-path candidate may record these already-established facts:

```text
P7_R3_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #363 / proof 5553345846
P7_R4_AUTHORIZATION = CLOSED_CANONICAL / PR #364 / proof 5553391471
P7_R4_APPLIED_PATCH_EVIDENCE_BINDING = CLOSED_CANONICAL / PR #365 / proof 5553509882
P7_R4_STATE_MEANING = APPLIED_EVIDENCE_ONLY
P7_R5_PLUS = NOT_AUTHORIZED_BY_NUMBERING
P7_OVERALL = NOT_CLOSED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

Canonical P7-R4 implementation blobs may be recorded as evidence:

```text
source = eb25540f83e4b7a817f190618f9daae5839130f2
schema = e1b11582559bd574d0159b68e95c1b258bd6e1c5
test = 391488f1e2ce24ccaa2646ddeb520af4e1c520da
```

The reconciliation must not transform `APPLIED_EVIDENCE_ONLY` into a claim that Kodac actually executed a remediation patch. The merged P7-R4 tests use fixture receipts as contract-test data only.

---

## 5. Required preserved non-grants

The later reconciliation must preserve every still-effective non-grant. At minimum it must preserve, without weakening:

```text
K2_SIDE_EFFECT_AUTHORITY = UNCHANGED
K5_DONE_GATE_AUTHORITY = UNCHANGED
P2_OVERALL = OPEN
P3_OVERALL = OPEN
P4_OVERALL = OPEN
P5_OVERALL = NOT_CLOSED
P6_OVERALL = NOT_CLOSED
P7_OVERALL = NOT_CLOSED
GENERAL_PUBLIC_KODACBENCH = NOT_CLOSED
P5_R3_PLUS = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
AUTOMATIC_FRESHNESS_DEPENDENCY_INVALIDATION = NOT_AUTHORIZED
P6_R2_PLUS = NOT_AUTHORIZED_BY_NUMBERING
P7_R5_PLUS = NOT_AUTHORIZED_BY_NUMBERING
PATCH_APPLICATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_INVOCATION = NOT_AUTHORIZED
K2_APPROVAL_CREATION = NOT_AUTHORIZED
K2_AUTHORITY_EXPANSION = NONE
VERIFICATION_EXECUTION = NOT_AUTHORIZED
VERIFICATION_FAILED_VERIFIED = NOT_ESTABLISHED
FIXED_REVERIFIED_DONE_GATE = NOT_ESTABLISHED
REVIEWER_CRITIC_VERIFIER_PROVIDER_MODEL_EXECUTION_EXPANSION = NOT_AUTHORIZED
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
KRI_K5_K2_AUTHORITY_MUTATION = NOT_AUTHORIZED
NEW_DEPENDENCY_DONOR_ADMISSION = NONE
PERSISTENCE_DATABASE_TELEMETRY_UPLOAD_LEARNING = NOT_AUTHORIZED
CLI_API_PACKAGE_ROOT_PRODUCT_INTEGRATION = NOT_AUTHORIZED
PUBLIC_RELEASE_PACKAGE_PUBLICATION_DEPLOYMENT = NOT_AUTHORIZED
PUBLIC_SUPERIORITY_BEST_IN_CLASS_CLAIM = NOT_AUTHORIZED
P8_P9_IMPLEMENTATION = NOT_AUTHORIZED
RULESET_CHANGE_BYPASS = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

No omission from this summary weakens a still-effective canonical non-grant present in the live current views or canonical governance.

---

## 6. Required P7-R4 semantic boundary

The later current-view reconciliation may describe P7-R4 only as a pure/data-only evidence contract over one supplied, strictly validated successful existing K2 `repo.apply_patch` receipt.

Required non-equivalences include:

```text
APPLIED_EVIDENCE_BINDING != PATCH_APPLICATION
APPLIED_EVIDENCE_BINDING != K2_EXECUTION
APPLIED_EVIDENCE_BINDING != K2_APPROVAL
APPLIED_EVIDENCE_BINDING != VERIFICATION
APPLIED_EVIDENCE_BINDING != VERIFICATION_FAILED
APPLIED_EVIDENCE_BINDING != VERIFIED
APPLIED_EVIDENCE_BINDING != FIXED
APPLIED_EVIDENCE_BINDING != REVERIFIED
APPLIED_EVIDENCE_BINDING != DONE_GATE
APPLIED_EVIDENCE_BINDING != AUTOFIX
SUCCESSFUL_EXECUTION_RECEIPT != COMPLETE_CORRECTNESS
POST_STATE_DIGEST != VERIFIED_REMEDIATION
P7_R4_CLOSED != P7_R5_PLUS_AUTHORITY
P7_R4_CLOSED != P7_OVERALL_CLOSED
P7_R4_CLOSED != P8_AUTHORITY
P7_R4_CLOSED != PROJECT_COMPLETION
```

---

## 7. Candidate self-certification prohibition

The later five-path reconciliation may not certify its own closure inside the candidate tree.

Before its own guarded merge and complete post-merge proof, it must represent itself as:

```text
P7_R4_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
```

Only external post-merge proof may establish that reconciliation as closed canonical.

---

## 8. Qualification and merge gate for this authorization

This authorization candidate may merge only when one unchanged exact head proves:

```text
BASE = CURRENT_CANONICAL_MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
EXACT_PATH = docs/planning/KODAC_P7_R4_POST_MERGE_CURRENT_VIEW_RECONCILIATION_AUTHORIZATION_2026-09-05.md
INTERNAL_SUBSTANTIVE_SEMANTIC_SECURITY_INSPECTION = CLEAN
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
REQUIRED_CI = TERMINAL_SUCCESS_OR_CANONICAL_DOCS_ONLY_NON_APPLICABILITY
RULESET_20707483 = ACTIVE / SATISFIED / NO_BYPASS
WAIVER = NO
```

Any head/base/blob movement invalidates prior qualification.

Merge must use a normal guarded PR merge with the exact qualified `expected_head_sha`. No direct write to `main`, force push, rebase, stale qualification reuse, or ruleset bypass is authorized.

---

## 9. Mandatory post-merge proof

This authorization creates future five-path reconciliation authority only after post-merge proof verifies at minimum:

```text
MERGE_COMMIT
ORDERED_PARENTS
MERGE_TREE
QUALIFIED_HEAD_TREE_EQUALITY
AUTHORIZATION_BLOB_EQUALITY
MERGE_SIGNATURE_VALID
POST_MERGE_REQUIRED_CHECKS
PR_CLOSED_MERGED
UNRESOLVED_REVIEW_THREADS = 0
RULESET_20707483 = ACTIVE / NO_BYPASS
```

If a workflow is canonically non-applicable to a docs-only merge and therefore does not run on push, the proof must say so rather than fabricate a run.

---

## 10. Explicit non-grants of this authorization

This authorization candidate does not authorize:

```text
P7_R5_IMPLEMENTATION
P7_R5_ANALYSIS_AS_IMPLEMENTATION_AUTHORITY
PATCH_APPLICATION
K2_INVOCATION
K2_APPROVAL_CREATION
VERIFICATION_EXECUTION
VERIFIED_STATE
FIXED_STATE
REVERIFIED_STATE
DONE_GATE_ADVANCEMENT
AUTOFIX
P8_P9_IMPLEMENTATION
PRODUCT_RELEASE_WORK
PROJECT_COMPLETION
```

After the later five-view reconciliation itself becomes closed canonical, a fresh successor-authority analysis must start from live repository truth. No successor follows from numbering.
