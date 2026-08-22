# KODAC KDO H4-R4B Phase-B — Z0L Review Attestation Reconciliation

Date: 2026-08-23  
Status: **AUTHORIZATION CANDIDATE — DOCS ONLY — FAIL CLOSED**  
Repository: `TheHalfMoon/Kodac`  
Authorization PR: `#160`

## 1. Purpose and narrow precedence

This document reconciles the independent-review attestation mechanics for PR #160 with the GitHub-native evidence actually emitted by CodeRabbit for a clean review. It does not execute Z0L, broaden Z0L, authorize any later stage, or weaken any acquisition, extraction, merge, post-merge, spend, credential, endpoint, or app-source boundary.

For PR #160 only, this document is the later controlling governance text **only for**:

1. Section 5.2 independent-review attestation mechanics in `KODAC_KDO_H4_R4B_PHASE_B_Z0P_CANONICALIZATION_Z0L_AUTHORIZATION_2026-08-22.md`; and
2. the rule that every PR-body edit after final review invalidates qualification.

All other requirements in the 2026-08-22 authorization document remain unchanged and cumulative. Any ambiguity is resolved fail closed.

```text
ATTESTATION_RECONCILIATION_SCOPE=PR_160_ONLY
PRIMARY_AUTHORIZATION_DOCUMENT_REMAINS_REQUIRED=YES
ACQUISITION_CONTRACT_CHANGED=NO
EXTRACTION_CONTRACT_CHANGED=NO
MERGE_METHOD_CHANGED=NO
POST_MERGE_PROOF_CHANGED=NO
Z0L_SCOPE_CHANGED=NO
Z0A_AUTHORITY=NOT_AUTHORIZED
Z0S_AUTHORITY=NOT_AUTHORIZED
Z0R_AUTHORITY=NOT_AUTHORIZED
Z0D_AUTHORITY=NOT_AUTHORIZED
H4_COMPLETE=NO
PROVIDER_SPEND_USD=0.00
```

## 2. Why reconciliation is required

The prior contract required the exact-head `CodeRabbit` commit-status object itself to expose an authenticated publisher identity, status timestamp, and direct final-run binding, and separately expected a CodeRabbit `PullRequestReview` object on the exact clean head.

Live qualification attempts demonstrated a mismatch between that contract and the GitHub-native records CodeRabbit emits for a clean review:

```text
DIAGNOSTIC_HEAD=04ddda9248f8aa216183793f3916cb92dfcf1d4d
DIAGNOSTIC_FULL_REVIEW_RUN=d11f6b55-74ad-4526-9b6f-2c19e509cdf3
DIAGNOSTIC_REVIEW_RANGE_START=451819122eab977bc274d05e7713a5b872c6445e
DIAGNOSTIC_REVIEW_RANGE_END=04ddda9248f8aa216183793f3916cb92dfcf1d4d
DIAGNOSTIC_RESULT=NO_ACTIONABLE_COMMENTS
DIAGNOSTIC_EXACT_HEAD_STATUS=success
DIAGNOSTIC_CLEAN_PULL_REQUEST_REVIEW_OBJECT=ABSENT_OBSERVED
DIAGNOSTIC_STATUS_PUBLISHER_FIELDS=NOT_OBSERVABLE_AS_REQUIRED
DIAGNOSTIC_AUTHORIZATION_CARRIED_FORWARD=NO
```

The diagnostic run above is not merge authority for any later head. It exists only to justify repairing the evidence model before a fresh exact-head review.

GitHub commit-status context alone remains insufficient identity evidence. The repair below therefore does **not** infer CodeRabbit identity from the string `CodeRabbit`. Instead, reviewer identity and run binding move to a GitHub-authenticated CodeRabbit bot issue-comment record whose author identity, comment ID, PR scope, exact review run, exact ending SHA, result, and mutation timestamp are all re-read live. The exact-head commit status remains an independent consistency gate.

## 3. Exact final candidate identity

After this reconciliation is committed, the final candidate must be rebound from GitHub. Both governance documents are part of the reviewed candidate and the exact reviewed tree must contain both exact blobs.

```text
Z0L_REVIEWED_PR=160
Z0L_REVIEWED_CANDIDATE_COMMIT=EXACT_40_HEX_REQUIRED
Z0L_REVIEWED_CANDIDATE_TREE=EXACT_40_HEX_REQUIRED
Z0L_REVIEWED_PRIMARY_DOCUMENT_BLOB_SHA=EXACT_40_HEX_REQUIRED
Z0L_REVIEWED_ATTESTATION_RECONCILIATION_BLOB_SHA=EXACT_40_HEX_REQUIRED
REVIEWED_GOVERNANCE_BLOB_SET_COMPLETE=YES_REQUIRED
```

Any head movement after final review invalidates qualification. Exact merge-tree equality to the reviewed candidate tree remains required, so neither governance file nor any other reviewed path may change at merge.

## 4. Replacement independent-review attestation model

A final review PASS requires **all** evidence below from one fresh CodeRabbit full-review cycle on the exact final candidate.

### 4.1 GitHub-authenticated CodeRabbit review record — authorization-bearing identity evidence

The authorization-bearing reviewer identity and final-run binding is the GitHub issue-comment record maintained by CodeRabbit on PR #160 that contains the terminal recent-review result for the exact final candidate.

The record must be read through GitHub and satisfy:

```text
INDEPENDENT_REVIEW_PROVIDER=CodeRabbit
INDEPENDENT_REVIEWER_LOGIN=coderabbitai[bot]
INDEPENDENT_REVIEWER_GITHUB_ID=136622811
INDEPENDENT_REVIEWER_INDEPENDENT_FROM_PR_AUTHOR=YES_REQUIRED
CODERABBIT_FINAL_REVIEW_RECORD_TYPE=GITHUB_ISSUE_COMMENT
CODERABBIT_FINAL_REVIEW_RECORD_ID=EXACT_GITHUB_COMMENT_ID_REQUIRED
CODERABBIT_FINAL_REVIEW_RECORD_AUTHOR_LOGIN=coderabbitai[bot]
CODERABBIT_FINAL_REVIEW_RECORD_AUTHOR_ID=136622811
CODERABBIT_FINAL_REVIEW_RECORD_AUTHOR_AUTHENTICATED_BY_GITHUB=YES_REQUIRED
CODERABBIT_FINAL_REVIEW_RECORD_PR=160
CODERABBIT_FINAL_REVIEW_RECORD_REPOSITORY=TheHalfMoon/Kodac
CODERABBIT_FINAL_REVIEW_RECORD_CREATED_AT=EXACT_TIMESTAMP_REQUIRED
CODERABBIT_FINAL_REVIEW_RECORD_UPDATED_AT=EXACT_TIMESTAMP_REQUIRED
CODERABBIT_FINAL_REVIEW_RUN_ID=EXACT_RUN_ID_REQUIRED
CODERABBIT_FINAL_REVIEW_RANGE_END_SHA=EXACT_CANDIDATE_SHA_REQUIRED
CODERABBIT_FINAL_REVIEW_RESULT=NO_ACTIONABLE_COMMENTS_REQUIRED
CODERABBIT_FINAL_REVIEW_RECORD_MUTATION_AFTER_QUALIFICATION=FORBIDDEN
```

The comment body must visibly bind the exact run ID and an exact review range whose end SHA equals `Z0L_REVIEWED_CANDIDATE_COMMIT`, and must state that no actionable comments were generated for that recent review. Repository and PR scope are supplied by the GitHub object containing the comment and must match `TheHalfMoon/Kodac` PR #160.

A comment from any other author, a different GitHub author ID, a different PR/repository, a run without the exact end SHA, a non-terminal or non-clean result, a missing field, or any later edit to the selected review record is terminal fail closed.

The selected comment ID and its `updated_at` timestamp must be frozen during qualification and re-read immediately before Ready and immediately before merge. If `updated_at` differs, qualification is invalidated and a new final review cycle is required.

### 4.2 Exact-head CodeRabbit commit status — independent consistency gate

The exact candidate must also expose:

```text
CODERABBIT_COMMIT_STATUS_CONTEXT=CodeRabbit
CODERABBIT_COMMIT_STATUS_STATE=success_REQUIRED_ON_EXACT_CANDIDATE_SHA
CODERABBIT_COMMIT_STATUS_ROLE=CONSISTENCY_GATE_NOT_IDENTITY_AUTHORITY
```

A missing, pending, error, failure, differently named, or differently scoped exact-head status fails closed.

The status context string is never used to infer publisher identity. Reviewer identity comes only from the GitHub-authenticated bot record in Section 4.1. This removes the prior impossible dependency on nullable/unobservable status-publisher fields without allowing a context-name match to authenticate CodeRabbit.

### 4.3 No clean-review `PullRequestReview` object requirement

A clean CodeRabbit run may complete without creating a distinct GitHub `PullRequestReview` object. Therefore:

```text
CODERABBIT_CLEAN_PULL_REQUEST_REVIEW_OBJECT=NOT_REQUIRED
CODERABBIT_GITHUB_AUTHENTICATED_REVIEW_RECORD=SECTION_4_1_COMMENT_REQUIRED
```

If CodeRabbit does create review threads or review submissions containing findings, they remain fully in scope. All current non-outdated unresolved material threads must still be zero.

```text
CURRENT_NON_OUTDATED_UNRESOLVED_MATERIAL_THREADS=0_REQUIRED
```

## 5. PR-body freeze reconciliation

The PR body is not authorization authority. CodeRabbit may automatically append or update a release-notes block after review. That bot-generated block must not create an impossible qualification loop.

Define the authorization-critical PR-body projection as the PR body with exactly one CodeRabbit-managed release-notes block removed when present:

```text
CODERABBIT_RELEASE_NOTES_START=<!-- This is an auto-generated comment: release notes by coderabbit.ai -->
CODERABBIT_RELEASE_NOTES_END=<!-- end of auto-generated comment: release notes by coderabbit.ai -->
PR_BODY_NORMALIZATION=REMOVE_EXACTLY_ONE_COMPLETE_CODERABBIT_RELEASE_NOTES_BLOCK_ONLY
PR_BODY_NORMALIZED_SHA256=EXACT_64_HEX_REQUIRED
```

Rules:

1. Freeze `PR_BODY_NORMALIZED_SHA256` immediately before the final full review.
2. Immediately before Ready and again immediately before merge, re-read the live PR body, remove only the exact complete CodeRabbit release-notes block above if present, hash the remaining UTF-8 body, and require exact equality with the frozen digest.
3. Any other body edit, malformed/multiple release-notes block, edit outside that block, or normalized-digest mismatch invalidates qualification.
4. A change only inside the one exact CodeRabbit-generated release-notes block does not invalidate qualification because that block is non-authoritative and excluded from the frozen projection.

```text
PR_BODY_AUTHORIZATION_AUTHORITY=NO
PR_BODY_NORMALIZED_DIGEST_MATCH=PASS_REQUIRED
NON_CODERABBIT_BODY_EDIT_AFTER_FINAL_REVIEW=INVALIDATES_MERGE_QUALIFICATION
CODERABBIT_RELEASE_NOTES_ONLY_EDIT_AFTER_FINAL_REVIEW=PERMITTED_NON_AUTHORITATIVE
```

## 6. Final review cycle requirements

The diagnostic run `d11f6b55-74ad-4526-9b6f-2c19e509cdf3` is superseded by this governance mutation. The reconciled candidate requires a fresh full review from the exact new head.

Final qualification requires all of:

```text
FINAL_REVIEW_MODE=CODERABBIT_FULL_REVIEW
FINAL_REVIEW_HEAD=EXACT_NEW_CANDIDATE_SHA_REQUIRED
FINAL_REVIEW_RUN_ID=EXACT_NEW_RUN_ID_REQUIRED
FINAL_REVIEW_RANGE_END_SHA=FINAL_REVIEW_HEAD_REQUIRED
FINAL_REVIEW_RESULT=NO_ACTIONABLE_COMMENTS_REQUIRED
FINAL_REVIEW_AUTHENTICATED_BOT_RECORD=PASS_REQUIRED
FINAL_REVIEW_BOT_RECORD_UNCHANGED=PASS_REQUIRED
FINAL_REVIEW_EXACT_HEAD_STATUS=success_REQUIRED
FINAL_REVIEW_UNRESOLVED_MATERIAL_THREADS=0_REQUIRED
PR_BODY_NORMALIZED_DIGEST_MATCH=PASS_REQUIRED
EXACT_HEAD_REPOSITORY_GATES=PASS_REQUIRED
CANONICAL_MAIN_UNCHANGED=8e366e4816efc7c1e056b3361c635bd8dd7d54a2_REQUIRED
```

No Ready or merge action is authorized until every field above and every unaffected requirement in the primary authorization document passes live.

## 7. Merge and post-merge boundaries remain unchanged

Only GitHub merge-commit semantics remain authorized. The merge request must enforce the exact reviewed head precondition through the connected wrapper's `expected_head_sha`, corresponding to the REST merge endpoint `sha` precondition. Main must remain on the exact canonical base immediately before merge.

Post-merge proof still requires exact parent order, exact merge-tree equality with the reviewed candidate tree, and both exact governance blobs in that tree. Failure of any post-merge check leaves Z0P not closed canonical and Z0L not authorized.

```text
MERGE_METHOD=merge
SQUASH_MERGE=FORBIDDEN
REBASE_MERGE=FORBIDDEN
AUTO_MERGE=FORBIDDEN
MERGE_HEAD_PRECONDITION=EXACT_REVIEWED_HEAD_REQUIRED
MERGE_PARENT_1=8e366e4816efc7c1e056b3361c635bd8dd7d54a2_REQUIRED
MERGE_PARENT_2=EXACT_REVIEWED_HEAD_REQUIRED
MERGE_TREE_EQUALS_REVIEWED_CANDIDATE_TREE=YES_REQUIRED
PRIMARY_DOCUMENT_BLOB_MATCH=PASS_REQUIRED
ATTESTATION_RECONCILIATION_BLOB_MATCH=PASS_REQUIRED
```

Only after the complete pre-merge and post-merge proof passes:

```text
Z0P=CLOSED_CANONICAL
Z0L=AUTHORIZED_TO_EXECUTE_LOCAL_ARTIFACT_VALIDATION_ONLY
Z0A=NOT_AUTHORIZED
Z0S=NOT_AUTHORIZED
Z0R=NOT_AUTHORIZED
Z0D=NOT_AUTHORIZED
H4_COMPLETE=NO
PROVIDER_SPEND_USD=0.00
```

PR qualification and canonical merge do not execute Z0L. No zrok archive/binary download, zrok execution, installation, account/environment/share/public-endpoint mutation, payment method, real-secret access, GitHub App mutation, webhook activation, or app-source mutation is authorized by this reconciliation candidate.