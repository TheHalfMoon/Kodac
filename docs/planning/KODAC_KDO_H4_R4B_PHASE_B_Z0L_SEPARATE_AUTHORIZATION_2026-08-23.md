# KODAC KDO H4-R4B Phase-B — Z0L Separate Authorization

Date: 2026-08-23  
Status: **AUTHORIZATION CANDIDATE — DOCS ONLY — FAIL CLOSED — Z0L NOT YET AUTHORIZED**  
Repository: `TheHalfMoon/Kodac`

## 1. Purpose and maximum intent

This document is the separate governance authorization candidate required after PR #160 and the canonical PR #161 post-merge contradiction repair.

Its purpose is **not** to execute Z0L. Its only possible post-merge effect is to authorize a later, separately initiated execution of the bounded Z0L **local artifact validation** procedure defined here.

Before this exact document is independently reviewed, canonically merged, and proven post-merge:

```text
Z0L=NOT_AUTHORIZED
Z0A=NOT_AUTHORIZED
Z0S=NOT_AUTHORIZED
Z0R=NOT_AUTHORIZED
Z0D=NOT_AUTHORIZED
ZROK_ARCHIVE_DOWNLOAD=NO
ZROK_BINARY_EXECUTION=NO
ZROK_VERSION_COMMAND=NO
ZROK_INSTALLATION=NO
SYSTEM_INSTALL=NO
USER_PATH_MUTATION=NO
REGISTRY_MUTATION=NO
WINDOWS_SERVICE_INSTALL=NO
AUTO_START=NO
ACCOUNT_SIGNUP=NO
ACCOUNT_LOGIN=NO
ENVIRONMENT_ENABLE=NO
NETWORK_SHARE=NO
PUBLIC_ENDPOINT=NO
PAYMENT_METHOD_ADDITION=NO
REAL_SECRET_ACCESS=NO
GITHUB_APP_MUTATION=NO
WEBHOOK_ACTIVATION=NO
APP_SOURCE_MUTATION=NO
FOUNDER_PROCESS_AUTHORITY_TRUST_ROOT_ESTABLISHMENT=NO
H4_COMPLETE=NO
PROVIDER_SPEND_USD=0.00
```

No PR qualification, review, Ready transition, merge, or post-merge proof step may itself perform any Z0L acquisition or execution action.

## 2. Canonical predecessors

At creation of this candidate, live canonical main is:

```text
AUTHORIZATION_BASE_MAIN=7e07218d0d2ead5585b355a90ad82591f3152094
AUTHORIZATION_BASE_TREE=34030f8df422ade4b2a634a1997a5cf954de46df
```

PR #160 canonical predecessor:

```text
PR_160_CANONICAL_MERGE=58dec3de7ad9ba61877e0319010ae76a3d36f00d
PR_160_REVIEWED_HEAD=781dface0c0fee001a2eaa6cce721b953ea6daa6
PR_160_REVIEWED_TREE=1f03f9133dd87443eb39d9d47b5f98c7f1308eb7
PR_160_PRIMARY_DOCUMENT_BLOB=f553ca9c8636a21ae227bec56d08aa20236f3db6
PR_160_ATTESTATION_RECONCILIATION_BLOB=19a530cad8eb078dee3b26aed3c3f62d62727b9d
PR_160_SECURITY_RECONCILIATION_BLOB=0481f036f2b67e7ddc2e1498610d8cab46a9ea38
PR_160_MAXIMUM_EFFECT=Z0P_CANONICAL_EVIDENCE_CLASSIFICATION_ONLY
PR_160_Z0L_AUTHORITY=NONE
```

PR #161 canonical contradiction-repair predecessor:

```text
PR_161_CANONICAL_MERGE=7e07218d0d2ead5585b355a90ad82591f3152094
PR_161_REVIEWED_HEAD=8b28e21d9639356b540ac8f80a75b3a544651058
PR_161_REVIEWED_TREE=34030f8df422ade4b2a634a1997a5cf954de46df
PR_161_DOCUMENT_BLOB=0ab821868248a87d74f1abf665ad8ae35f0d7760
PR_161_CODERABBIT_FINAL_RUN_ID=480147cc-6ae1-4dff-abcd-8940de28d55a
PR_161_CODERABBIT_FINAL_RESULT=NO_ACTIONABLE_COMMENTS
PR_161_CODERABBIT_EXACT_HEAD_STATUS=success
PR_161_POST_MERGE_CANONICALIZATION_PROOF=PASS
PR160_POST_MERGE_CONTRADICTION_REPAIR=CANONICAL
```

The PR #161 projection controls interpretation of the older PR #160 documents where they conflict. Therefore:

```text
PR_BODY_AUTHORIZATION_AUTHORITY=NO
PR_BODY_DIGEST_AUTHORIZATION_GATE=NOT_USED
PR_BODY_NORMALIZATION_AUTHORIZATION_GATE=NOT_USED
CODERABBIT_RELEASE_NOTES_AUTHORIZATION_EXCEPTION=NOT_USED
AUTHORITATIVE_REVIEW_RECORD_TYPE=GITHUB_ISSUE_COMMENT
AUTHORITATIVE_REVIEW_RECORD_AUTHOR_LOGIN=coderabbitai[bot]
AUTHORITATIVE_REVIEW_RECORD_AUTHOR_ID=136622811
CODERABBIT_COMMIT_STATUS_ROLE=CONSISTENCY_GATE_ONLY
```

No older PR #160 clause may be used to claim Z0L authority from PR #160 itself.

## 3. Current stage state and atomic-gate boundary

The prerequisite stage state is:

```text
Z0P_EVIDENCE=PASS
Z0P_CLOSED_CANONICAL=YES
Z0L=NOT_AUTHORIZED
Z0A=NOT_AUTHORIZED
Z0S=NOT_AUTHORIZED
Z0R=NOT_AUTHORIZED
Z0D=NOT_AUTHORIZED
PHASE_B_SERVER_SIDE_ATOMIC_GATE_AUTHORIZATION=CANONICAL
PHASE_B_SERVER_SIDE_ATOMIC_GATE=NOT_PROVEN
FOUNDER_PROCESS_AUTHORITY_TRUST_ROOT_ESTABLISHMENT=NO
H4_COMPLETE=NO
PROVIDER_SPEND_USD=0.00
```

The server-side atomic gate remains mandatory before founder process-authority trust-root establishment. It is **not** asserted here as a universal prerequisite for this separately authorized pre-establishment local-artifact proof. This document does not establish, weaken, bypass, or satisfy the trust-root atomic gate.

```text
PHASE_B_ATOMIC_GATE_REQUIRED_BEFORE_TRUST_ROOT_ESTABLISHMENT=YES
PHASE_B_ATOMIC_GATE_REQUIRED_BEFORE_H4_TRUST_ROOT_AUTHORITY=YES
PHASE_B_ATOMIC_GATE_REQUIRED_FOR_THIS_DOCS_ONLY_AUTHORIZATION=NO
PHASE_B_ATOMIC_GATE_REQUIRED_FOR_BOUNDED_PRE_ESTABLISHMENT_Z0L_PROOF=NO
```

## 4. Exact Z0P-bound upstream identity

This candidate does not reacquire or execute any upstream artifact. It binds the already-canonical Z0P evidence and requires a fresh public-upstream identity recheck at any future authorized Z0L execution boundary.

```text
Z0L_UPSTREAM_REPOSITORY=openziti/zrok
Z0L_RELEASE_TAG=v2.0.4
Z0L_RELEASE_COMMIT=6ff920390e77bf04b8e64871a049400cc417d871
Z0L_EXPECTED_RELEASE_VERIFICATION=VERIFIED
Z0L_EXPECTED_RELEASE_VERIFICATION_REASON=valid
Z0L_ASSET_NAME=zrok_2.0.4_windows_amd64.tar.gz
Z0L_ASSET_ID=423489481
Z0L_EXPECTED_SIZE_BYTES=33087763
Z0L_EXPECTED_SHA256=8e4062a159f65c3735d67d82de0f6a6f59555e9f98a786e80c1e6ab22d92d8c9
Z0L_EXPECTED_API_DIGEST=sha256:8e4062a159f65c3735d67d82de0f6a6f59555e9f98a786e80c1e6ab22d92d8c9
Z0L_ASSET_API_URL=https://api.github.com/repos/openziti/zrok/releases/assets/423489481
Z0L_ASSET_ACCEPT=application/octet-stream
TAG_BASED_BROWSER_DOWNLOAD_AS_AUTHORITY=FORBIDDEN
FLOATING_LATEST_URL=FORBIDDEN
THIRD_PARTY_MIRROR_DOWNLOAD=FORBIDDEN
THIRD_PARTY_CHECKSUM_AUTHORITY=FORBIDDEN
UNPINNED_ASSET_DOWNLOAD=FORBIDDEN
```

A future Z0L executor must fail closed if fresh upstream GitHub metadata differs from any pinned tag, full release commit, GitHub verification state/reason, asset name, asset ID, size, SHA-256, or API digest value above. No fallback release, mirror, package manager, installer, or alternate architecture is authorized.

## 5. Authorization candidate identity and path scope

This candidate must remain a single-file docs-only change from the exact canonical base in Section 2.

```text
Z0L_AUTHORIZATION_PR=162
Z0L_AUTHORIZATION_BASE=main
Z0L_AUTHORIZATION_BASE_SHA=7e07218d0d2ead5585b355a90ad82591f3152094
Z0L_AUTHORIZATION_CHANGED_FILE_COUNT=1_REQUIRED
Z0L_AUTHORIZATION_DOCS_ONLY=YES_REQUIRED
Z0L_AUTHORIZATION_CHANGED_PATH=docs/planning/KODAC_KDO_H4_R4B_PHASE_B_Z0L_SEPARATE_AUTHORIZATION_2026-08-23.md_REQUIRED
Z0L_AUTHORIZATION_CHANGED_PATH_SET_EQUALS_EXACT_SINGLE_PATH=PASS_REQUIRED
```

GitHub assigned this candidate PR `#162`; that identity is now part of the exact document binding. This edit creates a new head and invalidates every earlier review or status for merge qualification.

Any additional path, source-code change, workflow change, dependency change, credential surface, external-infrastructure mutation, or executable artifact is out of scope and fails closed.

## 6. Independent-review authority model

The authorization-bearing independent-review record for this candidate is the GitHub-authenticated `coderabbitai[bot]` issue-comment record on PR #162.

It must bind all of:

```text
Z0L_AUTH_REVIEW_PROVIDER=CodeRabbit
Z0L_AUTH_REVIEW_RECORD_TYPE=GITHUB_ISSUE_COMMENT
Z0L_AUTH_REVIEW_RECORD_AUTHOR_LOGIN=coderabbitai[bot]
Z0L_AUTH_REVIEW_RECORD_AUTHOR_ID=136622811
Z0L_AUTH_REVIEW_RECORD_REPOSITORY=TheHalfMoon/Kodac
Z0L_AUTH_REVIEW_RECORD_PR=162_REQUIRED
Z0L_AUTH_REVIEW_END_SHA=EXACT_FINAL_CANDIDATE_HEAD_REQUIRED
Z0L_AUTH_REVIEW_RUN_ID=EXACT_FINAL_RUN_ID_REQUIRED
Z0L_AUTH_REVIEW_RESULT=NO_ACTIONABLE_COMMENTS_REQUIRED
Z0L_AUTH_REVIEW_RECORD_AUTHOR_AUTHENTICATED_BY_GITHUB=YES_REQUIRED
Z0L_AUTH_REVIEWER_INDEPENDENT_FROM_PR_AUTHOR=YES_REQUIRED
```

The exact-head commit status is separately required only as a consistency gate:

```text
Z0L_AUTH_CODERABBIT_STATUS_CONTEXT=CodeRabbit
Z0L_AUTH_CODERABBIT_STATUS_STATE=success_REQUIRED
Z0L_AUTH_CODERABBIT_STATUS_HEAD=EXACT_FINAL_CANDIDATE_HEAD_REQUIRED
Z0L_AUTH_CODERABBIT_STATUS_ROLE=CONSISTENCY_GATE_ONLY
```

A missing authoritative issue-comment record, a missing exact-head success status, disagreement between them, wrong repository/PR scope, stale end SHA, edited/mismatched terminal record, or current unresolved material review finding fails closed.

PR-body bytes are advisory only. A PR-body change does not create, revoke, or repair authorization and is not a qualification input. Only GitHub-bound commit/tree/blob/path, CI, authenticated review evidence, thread state, merge topology, and canonical post-merge proof are authority inputs.

## 7. Two-phase Ready and exact-head qualification

### 7.1 Phase A — Draft-to-Ready preflight

Immediately before converting Draft to Ready, live GitHub truth must prove:

```text
Z0L_AUTH_PR_STATE=OPEN_REQUIRED
Z0L_AUTH_PR_DRAFT=YES_REQUIRED_BEFORE_READY_TRANSITION
Z0L_AUTH_PR_BASE=main_REQUIRED
Z0L_AUTH_PR_BASE_SHA=7e07218d0d2ead5585b355a90ad82591f3152094_REQUIRED
CANONICAL_MAIN=7e07218d0d2ead5585b355a90ad82591f3152094_REQUIRED
Z0L_AUTH_PR_HEAD=EXACT_CURRENT_CANDIDATE_HEAD_REQUIRED
Z0L_AUTH_PR_TREE=EXACT_CURRENT_CANDIDATE_TREE_REQUIRED
Z0L_AUTH_DOCUMENT_BLOB=EXACT_CURRENT_CANDIDATE_BLOB_REQUIRED
Z0L_AUTHORIZATION_CHANGED_PATH_SET_EQUALS_EXACT_SINGLE_PATH=PASS_REQUIRED
EXACT_HEAD_GOVERNANCE=PASS_REQUIRED
EXACT_HEAD_K2_RUNTIME=PASS_REQUIRED
Z0L_AUTH_PR_MERGEABLE=YES_REQUIRED
Z0L=NOT_AUTHORIZED_REQUIRED
```

Independent review is deliberately not a prerequisite for Draft-to-Ready because the configured reviewer may skip Draft PRs. Ready status itself grants no merge or Z0L authority.

Immediately after the Ready transition, re-read live GitHub truth and require `draft=false` before requesting the final review.

### 7.2 Phase B — final post-Ready review and merge qualification

After Ready and before merge, live GitHub truth must prove:

```text
Z0L_AUTH_PR_STATE=OPEN_REQUIRED
Z0L_AUTH_PR_DRAFT=NO_REQUIRED_AFTER_READY_AND_BEFORE_MERGE
Z0L_AUTH_PR_BASE=main_REQUIRED
Z0L_AUTH_PR_BASE_SHA=7e07218d0d2ead5585b355a90ad82591f3152094_REQUIRED
CANONICAL_MAIN=7e07218d0d2ead5585b355a90ad82591f3152094_REQUIRED
Z0L_AUTH_PR_HEAD=EXACT_INDEPENDENTLY_REVIEWED_HEAD_REQUIRED
Z0L_AUTH_PR_TREE=EXACT_INDEPENDENTLY_REVIEWED_TREE_REQUIRED
Z0L_AUTH_DOCUMENT_BLOB=EXACT_INDEPENDENTLY_REVIEWED_BLOB_REQUIRED
Z0L_AUTHORIZATION_CHANGED_PATH_SET_EQUALS_EXACT_SINGLE_PATH=PASS_REQUIRED
EXACT_HEAD_GOVERNANCE=PASS_REQUIRED
EXACT_HEAD_K2_RUNTIME=PASS_REQUIRED
INDEPENDENT_EXACT_HEAD_REVIEW=PASS_REQUIRED
Z0L_AUTH_CODERABBIT_STATUS_STATE=success_REQUIRED
CURRENT_NON_OUTDATED_UNRESOLVED_MATERIAL_THREADS_ON_AUTH_PR=0_REQUIRED
Z0L_AUTH_PR_MERGEABLE=YES_REQUIRED
Z0L=NOT_AUTHORIZED_REQUIRED
```

Every material finding from any current review source must be reconciled before merge. Any candidate-head movement after final review invalidates the review and requires a fresh exact-head CI and independent-review cycle.

## 8. Merge contract and mandatory post-merge proof

Only GitHub merge-commit semantics are permitted:

```text
Z0L_AUTH_MERGE_METHOD=merge_REQUIRED
SQUASH_MERGE=FORBIDDEN
REBASE_MERGE=FORBIDDEN
AUTO_MERGE=FORBIDDEN
Z0L_AUTH_MERGE_EXPECTED_HEAD_SHA=EXACT_INDEPENDENTLY_REVIEWED_HEAD_REQUIRED
```

The merge operation must use the connector/API head-SHA precondition corresponding to the exact independently reviewed candidate head. Immediately before the merge request, canonical main, base SHA, PR head, path set, CI, authoritative review record, consistency status, and material-thread state must be re-read and still satisfy Section 7.2.

After a successful merge, **no Z0L execution action may begin** until a canonical post-merge proof re-reads GitHub and proves:

```text
CANONICAL_MAIN_EQUALS_RETURNED_Z0L_AUTH_MERGE_COMMIT=PASS_REQUIRED
Z0L_AUTH_MERGE_PARENT_COUNT=2_REQUIRED
Z0L_AUTH_MERGE_PARENT_1=7e07218d0d2ead5585b355a90ad82591f3152094_REQUIRED
Z0L_AUTH_MERGE_PARENT_2=EXACT_INDEPENDENTLY_REVIEWED_HEAD_REQUIRED
Z0L_AUTH_MERGE_PARENT_ORDER_MATCH=PASS_REQUIRED
Z0L_AUTH_MERGE_TREE_EQUALS_REVIEWED_TREE=PASS_REQUIRED
Z0L_AUTH_MERGE_DOCUMENT_BLOB_EQUALS_REVIEWED_BLOB=PASS_REQUIRED
Z0L_AUTH_MERGE_CHANGED_PATH_SET_EQUALS_EXACT_SINGLE_PATH=PASS_REQUIRED
Z0L_AUTH_POST_MERGE_REVIEW_RECORD_STILL_MATCHES=PASS_REQUIRED
Z0L_AUTH_POST_MERGE_CODERABBIT_STATUS_STILL_SUCCESS=PASS_REQUIRED
Z0L_AUTH_POST_MERGE_CURRENT_NON_OUTDATED_UNRESOLVED_MATERIAL_THREADS=0_REQUIRED
Z0L_AUTH_POST_MERGE_CANONICALIZATION_PROOF=PASS_REQUIRED
```

Any failure leaves `Z0L=NOT_AUTHORIZED`.

## 9. Maximum canonical authorization effect

Only after every Section 8 post-merge proof passes may the canonical state become:

```text
Z0L_SEPARATE_AUTHORIZATION=CLOSED_CANONICAL
Z0L=AUTHORIZED_TO_EXECUTE_LOCAL_ARTIFACT_VALIDATION_ONLY
Z0A=NOT_AUTHORIZED
Z0S=NOT_AUTHORIZED
Z0R=NOT_AUTHORIZED
Z0D=NOT_AUTHORIZED
PHASE_B_SERVER_SIDE_ATOMIC_GATE=NOT_PROVEN
FOUNDER_PROCESS_AUTHORITY_TRUST_ROOT_ESTABLISHMENT=NO
H4_COMPLETE=NO
PROVIDER_SPEND_USD=0.00
```

This state authorizes a **later** bounded Z0L execution. It does not mean Z0L has executed or passed.

```text
Z0L_EXECUTION_STARTED=NO
Z0L_EVIDENCE=NOT_YET_PRODUCED
Z0L_PASS=NO
```

The authorization expires fail-closed for execution if canonical main no longer equals the canonical Z0L authorization merge commit. Any later main movement requires explicit reconciliation or reauthorization before requesting an archive byte.

## 10. Future authorized Z0L procedure

If and only if Section 9 is canonically true at execution time, the permitted procedure is exactly:

```text
1. RECHECK_CANONICAL_Z0L_AUTHORIZATION_BINDING_INITIAL
2. CREATE_FRESH_EMPTY_DISPOSABLE_EVIDENCE_DIRECTORY
3. RECHECK_UPSTREAM_EXACT_IDENTITY_AT_DOWNLOAD_BOUNDARY
4. RECHECK_CANONICAL_Z0L_AUTHORIZATION_BINDING_AT_DOWNLOAD_BOUNDARY
5. DOWNLOAD_EXACT_ASSET_ID_TO_UNIQUE_TEMP_FILE
6. RECORD_DOWNLOADED_SIZE_BYTES
7. COMPUTE_DOWNLOADED_ARCHIVE_SHA256
8. REQUIRE_EXACT_SIZE_AND_SHA256_MATCH
9. LIST_AND_PARSE_ALL_ARCHIVE_HEADERS_WITHOUT_EXECUTION
10. NORMALIZE_AND_VALIDATE_ALL_MEMBER_NAMES
11. REJECT_LINKS_SPECIAL_FILES_DRIVE_UNC_TRAVERSAL_AND_COLLISIONS
12. BUILD_AND_RECORD_EXACT_REGULAR_FILE_ALLOWLIST
13. REQUIRE_EXPECTED_ZROK2_EXE_REGULAR_FILE_COUNT_EQUALS_ONE
14. CREATE_FRESH_EMPTY_EXTRACTION_DIRECTORY
15. EXTRACT_WITH_NO_FOLLOW_SAFE_MODE_AND_NO_OVERWRITE
16. VERIFY_EACH_EXTRACTED_CANONICAL_PATH_REMAINS_UNDER_ROOT
17. RECORD_EXTRACTED_FILE_LIST
18. HASH_EXTRACTED_ZROK2_BINARY
19. RECORD_AUTHENTICODE_STATE_IF_AVAILABLE_WITHOUT_EXECUTING_ZROK
20. EMIT_REDACTED_Z0L_EVIDENCE_REPORT
21. STOP
```

### 10.1 Authorization rechecks

The initial recheck must occur before creating the evidence directory or making acquisition-side network requests. It must re-read canonical main and require it to equal the exact canonical Z0L authorization merge commit; re-read PR #162 and exact reviewed head/tree/document blob/path set; verify merge parents/order/tree/blob; verify the authoritative CodeRabbit issue-comment review record and exact-head `CodeRabbit=success` consistency status; require zero current non-outdated unresolved material threads; and require the canonical post-merge proof to remain PASS.

At the download boundary, after the fresh upstream identity recheck, the same complete authorization binding must be repeated. No action may occur between this repeated authorization recheck and the exact asset-ID request.

### 10.2 Disposable directories and partial state

Both evidence and extraction directories must be newly created, empty, disposable, outside repository worktrees, and outside `PATH`.

```text
EXISTING_EVIDENCE_DIRECTORY_REUSE=FORBIDDEN
EXISTING_EXTRACTION_DIRECTORY_REUSE=FORBIDDEN
PARTIAL_DOWNLOAD_REUSE=FORBIDDEN
RESUMED_DOWNLOAD=FORBIDDEN
OVERWRITE_EXISTING_ARCHIVE=FORBIDDEN
OVERWRITE_EXISTING_EXTRACTED_FILE=FORBIDDEN
FAILED_ATTEMPT_REUSE=FORBIDDEN
```

The archive must be downloaded first to a unique temporary filename. It may be promoted to its evidence filename only after exact size and SHA-256 verification. A failed or interrupted attempt is invalid and may not be resumed or reused.

### 10.3 Archive confinement

No member may be extracted until the entire archive header/member inventory is parsed without executing zrok.

Normalize separators and components first. Reject every member that is:

- an absolute POSIX path;
- Windows drive-qualified;
- UNC/device-qualified;
- empty, dot-only, or traversal-bearing after normalization;
- a symbolic link, hard link, junction, reparse-like member, FIFO, socket, device node, or other special/non-regular file;
- a duplicate normalized path;
- a Windows-relevant case-insensitive collision;
- outside the fresh extraction root after canonical resolution;
- an unexpected executable or installer surface other than exactly one `zrok2.exe` regular file;
- not admitted by the exact pre-extraction regular-file allowlist.

```text
SYMLINK_MEMBERS=FORBIDDEN
HARDLINK_MEMBERS=FORBIDDEN
SPECIAL_FILE_MEMBERS=FORBIDDEN
WINDOWS_DRIVE_PATHS=FORBIDDEN
UNC_DEVICE_PATHS=FORBIDDEN
DUPLICATE_NORMALIZED_PATHS=FORBIDDEN
CASE_INSENSITIVE_COLLISIONS=FORBIDDEN
UNEXPECTED_FILES=FORBIDDEN
EXPECTED_PRIMARY_BINARY_BASENAME=zrok2.exe
EXPECTED_PRIMARY_BINARY_TYPE=REGULAR_FILE
EXPECTED_PRIMARY_BINARY_COUNT=1
```

The allowlist must contain only regular files established from the exact upstream packaging surface. If the exact expected member set cannot be established without broadening trust, stop before extraction.

Extraction must use a no-follow safe mechanism, refuse overwrite, never materialize or follow links, and verify after each created file that its canonical path remains under the fresh extraction root. Generic unrestricted `tar -xf` or equivalent is not authorized.

### 10.4 Allowed output and terminal STOP

The evidence report may contain hashes, sizes, normalized member names/digests, extracted file-list digest, binary SHA-256, and Authenticode state if it can be recorded **without executing zrok**. It must contain no secrets and must not embed archive or binary payloads.

After the report is emitted:

```text
ZROK_BINARY_EXECUTION=NO
ZROK_VERSION_COMMAND=NO
ZROK_INSTALLATION=NO
SYSTEM_INSTALL=NO
USER_PATH_MUTATION=NO
REGISTRY_MUTATION=NO
WINDOWS_SERVICE_INSTALL=NO
AUTO_START=NO
ACCOUNT_SIGNUP=NO
ACCOUNT_LOGIN=NO
ENVIRONMENT_ENABLE=NO
NETWORK_SHARE=NO
PUBLIC_ENDPOINT=NO
PAYMENT_METHOD_ADDITION=NO
REAL_SECRET_ACCESS=NO
GITHUB_APP_MUTATION=NO
WEBHOOK_ACTIVATION=NO
APP_SOURCE_MUTATION=NO
FOUNDER_PROCESS_AUTHORITY_TRUST_ROOT_ESTABLISHMENT=NO
H4_COMPLETE=NO
PROVIDER_SPEND_USD=0.00
TERMINAL_ACTION=STOP
```

## 11. Fail-closed conditions

Any of the following stops the procedure before authority can expand:

```text
CANONICAL_Z0L_AUTHORIZATION_NOT_PRESENT
CANONICAL_MAIN_DRIFTED_FROM_Z0L_AUTHORIZATION_MERGE
Z0L_AUTH_PR_REVIEWED_HEAD_BINDING_MISMATCH
Z0L_AUTH_PR_REVIEWED_TREE_BINDING_MISMATCH
Z0L_AUTH_DOCUMENT_BLOB_BINDING_MISMATCH
Z0L_AUTH_CHANGED_PATH_SET_MISMATCH
INDEPENDENT_REVIEW_RECORD_MISSING_OR_MISMATCHED
CODERABBIT_EXACT_HEAD_STATUS_NOT_SUCCESS
AUTHORITATIVE_REVIEW_RECORD_SCOPE_OR_END_SHA_MISMATCH
CURRENT_NON_OUTDATED_UNRESOLVED_MATERIAL_THREAD_PRESENT
CANONICAL_MERGE_METHOD_NOT_MERGE
MERGE_HEAD_SHA_PRECONDITION_MISSING_OR_MISMATCHED
CANONICAL_MERGE_PARENT_MISMATCH
CANONICAL_MERGE_TREE_MISMATCH
CANONICAL_MERGE_DOCUMENT_BLOB_MISMATCH
CANONICAL_POST_MERGE_PROOF_NOT_PASS
UPSTREAM_RELEASE_TAG_CHANGED
UPSTREAM_RELEASE_COMMIT_CHANGED
UPSTREAM_RELEASE_VERIFICATION_NOT_VALID
ASSET_NAME_CHANGED
ASSET_ID_CHANGED
ASSET_SIZE_CHANGED
UPSTREAM_SHA256_CHANGED_OR_UNAVAILABLE
UPSTREAM_API_DIGEST_CHANGED_OR_MISMATCH
DOWNLOAD_BOUNDARY_RECHECK_NOT_IMMEDIATELY_PRECEDING_DOWNLOAD
CANONICAL_AUTHORIZATION_RECHECK_NOT_IMMEDIATELY_PRECEDING_DOWNLOAD
DOWNLOADED_SIZE_MISMATCH
DOWNLOADED_SHA256_MISMATCH
ARCHIVE_MEMBER_ABSOLUTE_PATH
ARCHIVE_MEMBER_WINDOWS_DRIVE_PATH
ARCHIVE_MEMBER_UNC_OR_DEVICE_PATH
ARCHIVE_MEMBER_PATH_TRAVERSAL
ARCHIVE_MEMBER_LINK
ARCHIVE_MEMBER_SPECIAL_FILE
ARCHIVE_MEMBER_DUPLICATE_NORMALIZED_PATH
ARCHIVE_MEMBER_CASE_INSENSITIVE_COLLISION
ARCHIVE_MEMBER_UNEXPECTED_FILE
EXPECTED_ZROK2_EXE_COUNT_NOT_ONE
SAFE_EXTRACTION_MODE_UNAVAILABLE
EXTRACTION_WOULD_OVERWRITE
EXTRACTED_PATH_ESCAPES_ROOT
PARTIAL_OR_FAILED_STATE_WOULD_BE_REUSED
UNEXPECTED_EXECUTABLE_OR_INSTALLER_SURFACE
VALIDATION_REQUIRES_ZROK_EXECUTION
VALIDATION_REQUIRES_ACCOUNT_OR_SECRET
VALIDATION_REQUIRES_PAYMENT
```

No failure authorizes a retry, fallback, broader asset set, alternate release, alternate architecture, mirror, package manager, installer, execution, account action, secret access, public endpoint, paid path, or later Z0 stage.

## 12. Required future Z0L evidence report

A future authorized execution report must bind at least:

```text
Z0L_AUTHORIZATION_PR=162
Z0L_AUTHORIZATION_CANONICAL_MERGE
Z0L_AUTHORIZATION_REVIEWED_HEAD
Z0L_AUTHORIZATION_REVIEWED_TREE
Z0L_AUTHORIZATION_DOCUMENT_BLOB
Z0L_AUTHORIZATION_MERGE_PARENT_1
Z0L_AUTHORIZATION_MERGE_PARENT_2
Z0L_AUTHORIZATION_MERGE_TREE
Z0L_AUTHORIZATION_CHANGED_PATH_SET_CHECK
Z0L_AUTHORIZATION_POST_MERGE_PROOF
Z0L_AUTHORIZATION_INITIAL_RECHECK
Z0L_AUTHORIZATION_DOWNLOAD_BOUNDARY_RECHECK
Z0L_AUTH_REVIEW_PROVIDER=CodeRabbit
Z0L_AUTH_REVIEW_RECORD_ID
Z0L_AUTH_REVIEW_RUN_ID
Z0L_AUTH_REVIEW_REPOSITORY=TheHalfMoon/Kodac
Z0L_AUTH_REVIEW_PR=162
Z0L_AUTH_REVIEW_END_SHA
Z0L_AUTH_REVIEW_RESULT
Z0L_AUTH_REVIEWER_IDENTITY=coderabbitai[bot]
Z0L_AUTH_CODERABBIT_STATUS_CONTEXT=CodeRabbit
Z0L_AUTH_CODERABBIT_STATUS_STATE=success
Z0L_AUTH_CURRENT_NON_OUTDATED_UNRESOLVED_MATERIAL_THREADS=0
Z0L_RELEASE_TAG
Z0L_RELEASE_COMMIT
Z0L_RELEASE_VERIFICATION_STATE
Z0L_RELEASE_VERIFICATION_REASON
Z0L_RELEASE_VERIFICATION_CHECK
Z0L_ASSET_NAME
Z0L_ASSET_ID
Z0L_ASSET_API_URL
Z0L_EXPECTED_SIZE_BYTES
Z0L_DOWNLOADED_SIZE_BYTES
Z0L_EXPECTED_SHA256
Z0L_DOWNLOADED_ARCHIVE_SHA256
Z0L_SHA256_MATCH
Z0L_UPSTREAM_API_DIGEST
Z0L_UPSTREAM_API_DIGEST_MATCH
Z0L_ARCHIVE_MEMBER_LIST_DIGEST
Z0L_ARCHIVE_MEMBER_ALLOWLIST_DIGEST
Z0L_ARCHIVE_PATH_CONFINEMENT_CHECK
Z0L_ARCHIVE_MEMBER_TYPE_CHECK
Z0L_ARCHIVE_LINK_MEMBER_CHECK
Z0L_ARCHIVE_COLLISION_CHECK
Z0L_EXTRACTION_DIRECTORY_CLASS=FRESH_DISPOSABLE_NON_PATH
Z0L_EXTRACTION_SAFE_MODE=PASS
Z0L_EXTRACTED_FILE_LIST_DIGEST
Z0L_EXTRACTED_BINARY_SHA256
Z0L_AUTHENTICODE_STATE_IF_AVAILABLE
Z0L_BINARY_EXECUTION=NO
Z0L_INSTALLATION=NO
Z0L_ACCOUNT_MUTATION=NO
Z0L_PUBLIC_ENDPOINT=NO
Z0L_REAL_SECRET_ACCESS=NO
PROVIDER_SPEND_USD=0.00
Z0L_TERMINAL_STATUS
```

## 13. Explicit non-effects

Even after a successful canonical authorization merge, this document does not authorize:

- execution of `zrok2.exe`, including `--version`;
- zrok installation or PATH/registry/service/autostart mutation;
- account signup/login/environment enablement;
- shares, reserved names, or public endpoints;
- payment methods or paid features;
- any real secret or credential access;
- GitHub App creation, registration, installation, configuration, or mutation;
- webhook activation or real webhook delivery;
- application source mutation;
- `Z0A`, `Z0S`, `Z0R`, or `Z0D`;
- founder process-authority trust-root establishment;
- H4 completion.

A canonical authorization merge means only: **a later Z0L local-artifact-validation execution may be started under the exact fail-closed procedure above while every authorization binding remains live and unchanged**.
