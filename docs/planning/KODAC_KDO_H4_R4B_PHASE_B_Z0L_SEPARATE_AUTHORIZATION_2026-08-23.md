# KODAC KDO H4-R4B Phase-B — Z0L Separate Authorization

Date: 2026-08-23  
Status: **AUTHORIZATION CANDIDATE — DOCS ONLY — FAIL CLOSED — Z0L NOT YET AUTHORIZED**  
Repository: `TheHalfMoon/Kodac`

## 1. Purpose and maximum intent

This document is the separate governance authorization candidate required after PR #160 and the canonical PR #161 post-merge governance repair.

It does **not** execute Z0L. Its maximum possible effect, and only after its own exact-head qualification, canonical merge, and complete post-merge proof, is to authorize a later separately initiated Z0L **local artifact validation** run.

Before that boundary is proven:

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

PR qualification, review, Ready state, merge, and post-merge proof are governance actions only. None may download, extract, execute, install, authenticate, expose an endpoint, access a secret, mutate infrastructure, or start Z0L.

## 2. Canonical predecessors and precedence

Authorization base at creation:

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
PR_160_TRUST_ROOT_AUTHORITY=NONE
PR_160_H4_CLOSURE_AUTHORITY=NONE
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

PR #161 controls interpretation of older PR #160 text wherever conflict exists. Therefore:

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

No PR #160 clause may be selectively read to grant Z0L authority. No PR-body bytes are authorization-bearing.

## 3. Current stage and atomic-gate boundary

Required predecessor state:

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

The server-side atomic gate remains mandatory before founder process-authority trust-root establishment. This bounded pre-establishment local-artifact proof is not itself trust-root establishment and does not establish, weaken, bypass, or satisfy the atomic gate.

```text
PHASE_B_ATOMIC_GATE_REQUIRED_BEFORE_TRUST_ROOT_ESTABLISHMENT=YES
PHASE_B_ATOMIC_GATE_REQUIRED_BEFORE_H4_TRUST_ROOT_AUTHORITY=YES
PHASE_B_ATOMIC_GATE_REQUIRED_FOR_THIS_DOCS_ONLY_AUTHORIZATION=NO
PHASE_B_ATOMIC_GATE_REQUIRED_FOR_BOUNDED_PRE_ESTABLISHMENT_Z0L_PROOF=NO
```

## 4. Exact Z0P-bound upstream identity

This candidate does not reacquire any upstream artifact. It binds already-canonical Z0P evidence and requires fresh public-upstream identity verification during any future authorized Z0L run.

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
TAG_BASED_ASSET_URL_AS_AUTHORITY=FORBIDDEN
THIRD_PARTY_MIRROR_DOWNLOAD=FORBIDDEN
THIRD_PARTY_CHECKSUM_AUTHORITY=FORBIDDEN
UNPINNED_ASSET_DOWNLOAD=FORBIDDEN
ALTERNATE_RELEASE_FALLBACK=FORBIDDEN
ALTERNATE_ARCHITECTURE_FALLBACK=FORBIDDEN
PACKAGE_MANAGER_ACQUISITION=FORBIDDEN
INSTALLER_ACQUISITION=FORBIDDEN
```

Any fresh upstream mismatch in tag, full release commit, GitHub verification state/reason, asset name, asset ID, expected size, SHA-256, or API digest terminates Z0L before any further action.

## 5. Authorization candidate identity and exact path scope

```text
Z0L_AUTHORIZATION_PR=162
Z0L_AUTHORIZATION_BASE=main
Z0L_AUTHORIZATION_BASE_SHA=7e07218d0d2ead5585b355a90ad82591f3152094
Z0L_AUTHORIZATION_CHANGED_FILE_COUNT=1_REQUIRED
Z0L_AUTHORIZATION_DOCS_ONLY=YES_REQUIRED
Z0L_AUTHORIZATION_CHANGED_PATH=docs/planning/KODAC_KDO_H4_R4B_PHASE_B_Z0L_SEPARATE_AUTHORIZATION_2026-08-23.md_REQUIRED
Z0L_AUTHORIZATION_CHANGED_PATH_SET_EQUALS_EXACT_SINGLE_PATH=PASS_REQUIRED
```

Any additional changed path, source-code change, workflow change, dependency change, credential surface, executable artifact, or external-infrastructure mutation is out of scope and fails closed.

Every candidate-head movement invalidates all earlier CI and review evidence for merge qualification. A repair commit made while the PR is already Ready does not need an artificial Draft/Ready toggle; it requires a fresh exact-head CI cycle and fresh post-repair exact-head independent review.

## 6. Independent-review authority model

The authorization-bearing independent-review record is the GitHub-authenticated `coderabbitai[bot]` issue-comment record on PR #162.

It must bind:

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

The exact-head commit status is a separate consistency gate only:

```text
Z0L_AUTH_CODERABBIT_STATUS_CONTEXT=CodeRabbit
Z0L_AUTH_CODERABBIT_STATUS_STATE=success_REQUIRED
Z0L_AUTH_CODERABBIT_STATUS_HEAD=EXACT_FINAL_CANDIDATE_HEAD_REQUIRED
Z0L_AUTH_CODERABBIT_STATUS_ROLE=CONSISTENCY_GATE_ONLY
```

A missing authoritative issue-comment record, missing exact-head success status, disagreement between record and status, wrong repository/PR scope, stale end SHA, edited/mismatched terminal record, or current unresolved material finding fails closed.

Every material finding from any current review source must be reconciled before merge, including material risk text outside inline review threads.

## 7. Exact-head qualification

Before merge, live GitHub truth must prove all of:

```text
Z0L_AUTH_PR_STATE=OPEN_REQUIRED
Z0L_AUTH_PR_DRAFT=NO_REQUIRED
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
CURRENT_UNRECONCILED_MATERIAL_REVIEW_RISKS=0_REQUIRED
Z0L_AUTH_PR_MERGEABLE=YES_REQUIRED
Z0L=NOT_AUTHORIZED_REQUIRED
```

Any head movement after final review requires a fresh exact-head CI and review cycle. No stale review may qualify a new head.

## 8. Merge contract and canonical post-merge proof

Only GitHub merge-commit semantics are permitted:

```text
Z0L_AUTH_MERGE_METHOD=merge_REQUIRED
SQUASH_MERGE=FORBIDDEN
REBASE_MERGE=FORBIDDEN
AUTO_MERGE=FORBIDDEN
Z0L_AUTH_MERGE_EXPECTED_HEAD_SHA=EXACT_INDEPENDENTLY_REVIEWED_HEAD_REQUIRED
```

Immediately before merge, canonical main, PR base/head, exact single-path scope, exact-head CI, authoritative review record, consistency status, mergeability, and current material-thread/risk state must all be re-read.

The merge call must enforce `expected_head_sha` equal to the exact independently reviewed head.

After GitHub returns a successful merge, no Z0L execution action may begin until a read-only post-merge proof establishes:

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

Only after every Section 8 post-merge proof passes may the state become:

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

Canonical authorization does not execute Z0L:

```text
Z0L_EXECUTION_STARTED=NO
Z0L_EVIDENCE=NOT_YET_PRODUCED
Z0L_PASS=NO
```

### 9.1 Live authorization lease

The canonical Z0L authorization is a **live lease**, not a one-time start check.

It expires immediately for any *subsequent* Z0L action if canonical main no longer equals the exact canonical Z0L authorization merge commit, or if any required review/topology/blob/thread binding no longer validates.

A future executor must revalidate this lease at every mandatory checkpoint in Section 10. No action from a later block may start after a failed checkpoint. Already-completed local validation work does not create continuing authority.

```text
AUTHORIZATION_LEASE_MODEL=LIVE_CHECKPOINTED
AUTHORIZATION_DRIFT_EFFECT=STOP_BEFORE_NEXT_ACTION
MAIN_DRIFT_REQUIRES_EXPLICIT_RECONCILIATION_OR_REAUTHORIZATION=YES
AUTOMATIC_CONTINUATION_AFTER_DRIFT=FORBIDDEN
```

## 10. Future authorized Z0L procedure

Only if Section 9 is canonically true at execution time may a later run perform exactly this sequence:

```text
1.  RECHECK_CANONICAL_Z0L_AUTHORIZATION_BINDING_INITIAL
2.  CREATE_FRESH_EMPTY_DISPOSABLE_EVIDENCE_DIRECTORY_WITH_OWNER_ONLY_ACCESS
3.  RECHECK_UPSTREAM_EXACT_IDENTITY_AT_DOWNLOAD_BOUNDARY
4.  RECHECK_CANONICAL_Z0L_AUTHORIZATION_BINDING_AT_DOWNLOAD_BOUNDARY
5.  DOWNLOAD_EXACT_ASSET_ID_TO_UNIQUE_TEMP_FILE
6.  RECORD_DOWNLOADED_SIZE_BYTES
7.  COMPUTE_DOWNLOADED_ARCHIVE_SHA256
8.  REQUIRE_EXACT_SIZE_AND_SHA256_MATCH
9.  PROMOTE_VERIFIED_TEMP_FILE_TO_EVIDENCE_ARCHIVE_WITH_NO_OVERWRITE
10. RECHECK_CANONICAL_Z0L_AUTHORIZATION_BINDING_POST_DOWNLOAD_PRE_INSPECTION
11. LIST_AND_PARSE_ALL_ARCHIVE_HEADERS_WITHOUT_EXECUTION
12. NORMALIZE_AND_VALIDATE_ALL_MEMBER_NAMES
13. REJECT_LINKS_SPECIAL_FILES_DRIVE_UNC_TRAVERSAL_AND_COLLISIONS
14. BUILD_AND_RECORD_EXACT_REGULAR_FILE_ALLOWLIST
15. REQUIRE_EXPECTED_ZROK2_EXE_REGULAR_FILE_COUNT_EQUALS_ONE
16. RECHECK_CANONICAL_Z0L_AUTHORIZATION_BINDING_PRE_EXTRACTION
17. CREATE_FRESH_EMPTY_EXTRACTION_DIRECTORY_WITH_OWNER_ONLY_ACCESS
18. EXTRACT_WITH_NO_FOLLOW_SAFE_MODE_AND_NO_OVERWRITE
19. VERIFY_EACH_EXTRACTED_CANONICAL_PATH_REMAINS_UNDER_ROOT
20. RECORD_EXTRACTED_FILE_LIST
21. RECHECK_CANONICAL_Z0L_AUTHORIZATION_BINDING_PRE_BINARY_HASH
22. HASH_EXTRACTED_ZROK2_BINARY
23. RECORD_AUTHENTICODE_STATE_IF_AVAILABLE_WITHOUT_EXECUTING_ZROK
24. RECHECK_CANONICAL_Z0L_AUTHORIZATION_BINDING_PRE_REPORT
25. EMIT_REDACTED_Z0L_EVIDENCE_REPORT
26. APPLY_TERMINAL_CUSTODY_POLICY
27. STOP
```

No step may be skipped, reordered, broadened, or substituted by a less restrictive mechanism.

### 10.1 Authorization lease checkpoints

Every `RECHECK_CANONICAL_Z0L_AUTHORIZATION_BINDING_*` checkpoint must re-read live GitHub state and require:

- canonical main equals the exact canonical Z0L authorization merge commit;
- PR #162 is merged with the expected exact reviewed head;
- reviewed head/tree/document blob/path-set bindings still match;
- merge parent count/order and merge-tree equality still match;
- authoritative CodeRabbit issue-comment record still binds the exact reviewed head and clean result;
- exact-head `CodeRabbit=success` consistency gate still agrees;
- current non-outdated unresolved material review threads remain zero;
- the canonical post-merge proof remains valid.

The initial checkpoint occurs before any acquisition-side filesystem or network action.

At the download boundary, after fresh upstream identity verification, the download-boundary authorization checkpoint must occur immediately before the immutable asset-ID request. No other network or filesystem action may intervene.

The post-download/pre-inspection, pre-extraction, pre-binary-hash, and pre-report checkpoints enforce authorization expiry throughout the local-validation run. If any checkpoint fails, no later action may start and Section 11 failure custody applies.

```text
INITIAL_AUTHORIZATION_RECHECK=REQUIRED
DOWNLOAD_BOUNDARY_AUTHORIZATION_RECHECK=REQUIRED
POST_DOWNLOAD_PRE_INSPECTION_AUTHORIZATION_RECHECK=REQUIRED
PRE_EXTRACTION_AUTHORIZATION_RECHECK=REQUIRED
PRE_BINARY_HASH_AUTHORIZATION_RECHECK=REQUIRED
PRE_REPORT_AUTHORIZATION_RECHECK=REQUIRED
```

### 10.2 Disposable roots, custody, and access control

The same founder-controlled local operator that initiates an authorized Z0L run is the artifact custodian for that run. Custody may not be delegated to an external service.

Both evidence and extraction roots must be newly created, empty, disposable, outside every repository worktree, and outside `PATH`.

They must be restricted to the executing local user/owner before any artifact byte is written. On a platform where the executor cannot establish and verify restrictive owner-only permissions/ACL semantics, Z0L must stop before download.

```text
Z0L_LOCAL_ARTIFACT_CUSTODIAN=EXECUTING_FOUNDER_CONTROLLED_LOCAL_OPERATOR
EVIDENCE_ROOT_ACCESS=OWNER_ONLY_REQUIRED
EXTRACTION_ROOT_ACCESS=OWNER_ONLY_REQUIRED
EXTERNAL_CUSTODY_DELEGATION=FORBIDDEN
EXISTING_EVIDENCE_DIRECTORY_REUSE=FORBIDDEN
EXISTING_EXTRACTION_DIRECTORY_REUSE=FORBIDDEN
PARTIAL_DOWNLOAD_REUSE=FORBIDDEN
RESUMED_DOWNLOAD=FORBIDDEN
OVERWRITE_EXISTING_ARCHIVE=FORBIDDEN
OVERWRITE_EXISTING_EXTRACTED_FILE=FORBIDDEN
FAILED_ATTEMPT_REUSE=FORBIDDEN
```

The archive must first be written to a unique temporary filename. It may be promoted to the evidence archive only after exact size and SHA-256 verification. Failed or interrupted downloads are invalid evidence and may not be resumed or reused.

### 10.3 Failure/interruption cleanup and quarantine

On any failure, interruption, authorization drift, or validation abort, the artifact custodian must stop all later Z0L actions, close local handles, and perform best-effort cleanup without executing zrok.

At minimum:

- remove any incomplete temporary download file when ordinary deletion is available;
- remove any partially created extraction tree when ordinary deletion is available;
- never reuse a failed-run archive, extraction tree, or residual file in another attempt;
- never relax permissions to enable cleanup;
- never invoke zrok to inspect, unlock, remove, or validate residual state.

If an ordinary deletion cannot complete, the residual state must remain quarantined outside `PATH` and repository worktrees with owner-only access. The executor must record a redacted residual manifest/digest and `RESIDUAL_QUARANTINED=YES`, then STOP. A residual quarantine is not evidence that can be reused.

This contract requires best-effort ordinary deletion; it does not claim cryptographic secure erasure of SSD or filesystem media.

```text
FAILED_RUN_TEMP_FILE_CLEANUP=REQUIRED_BEST_EFFORT
FAILED_RUN_EXTRACTION_TREE_CLEANUP=REQUIRED_BEST_EFFORT
FAILED_RUN_PERMISSION_RELAXATION=FORBIDDEN
FAILED_RUN_RESIDUAL_REUSE=FORBIDDEN
FAILED_RUN_DELETE_FAILURE_ACTION=QUARANTINE_OWNER_ONLY_AND_REPORT
CRYPTOGRAPHIC_SECURE_ERASE_CLAIM=NO
```

For a successful Z0L validation, verified archive and extracted binary may remain only as quarantined evidence under owner-only access, outside `PATH` and repository worktrees. They may not be installed, executed, reused for a later stage, or moved into an executable search path without separate canonical authorization.

```text
SUCCESS_RUN_ARTIFACT_STATE=QUARANTINED_EVIDENCE_ONLY
SUCCESS_RUN_ARTIFACT_REUSE_FOR_LATER_STAGE=FORBIDDEN_WITHOUT_SEPARATE_AUTHORIZATION
SUCCESS_RUN_PATH_EXPOSURE=FORBIDDEN
```

### 10.4 Archive confinement and extraction

No archive member may be extracted until the complete header/member inventory has been parsed without executing zrok.

Normalize separators and path components before policy evaluation. Reject every member that is:

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

Extraction must use a no-follow safe mechanism, refuse overwrite, never materialize or follow links, and verify each created file's canonical path remains under the fresh extraction root. Generic unrestricted `tar -xf` or equivalent is not authorized.

### 10.5 Allowed output and terminal STOP

The evidence report may contain hashes, sizes, normalized member names/digests, allowlist digest, extracted file-list digest, extracted binary SHA-256, Authenticode state if obtainable without executing zrok, authorization-checkpoint results, and custody/cleanup state.

It must contain no secrets and must not embed archive or binary payloads.

After report emission and terminal custody handling:

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

Any of the following stops the procedure before any later action:

```text
CANONICAL_Z0L_AUTHORIZATION_NOT_PRESENT
CANONICAL_MAIN_DRIFTED_FROM_Z0L_AUTHORIZATION_MERGE
AUTHORIZATION_LEASE_CHECKPOINT_FAILED
Z0L_AUTH_PR_REVIEWED_HEAD_BINDING_MISMATCH
Z0L_AUTH_PR_REVIEWED_TREE_BINDING_MISMATCH
Z0L_AUTH_DOCUMENT_BLOB_BINDING_MISMATCH
Z0L_AUTH_CHANGED_PATH_SET_MISMATCH
INDEPENDENT_REVIEW_RECORD_MISSING_OR_MISMATCHED
CODERABBIT_EXACT_HEAD_STATUS_NOT_SUCCESS
AUTHORITATIVE_REVIEW_RECORD_SCOPE_OR_END_SHA_MISMATCH
CURRENT_NON_OUTDATED_UNRESOLVED_MATERIAL_THREAD_PRESENT
CURRENT_UNRECONCILED_MATERIAL_REVIEW_RISK_PRESENT
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
DOWNLOADED_SIZE_MISMATCH
DOWNLOADED_SHA256_MISMATCH
EVIDENCE_ROOT_OWNER_ONLY_ACCESS_UNAVAILABLE
EXTRACTION_ROOT_OWNER_ONLY_ACCESS_UNAVAILABLE
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
FAILED_STATE_CLEANUP_AND_QUARANTINE_BOTH_UNAVAILABLE
RESIDUAL_STATE_PERMISSIONS_NOT_RESTRICTIVE
UNEXPECTED_EXECUTABLE_OR_INSTALLER_SURFACE
VALIDATION_REQUIRES_ZROK_EXECUTION
VALIDATION_REQUIRES_ACCOUNT_OR_SECRET
VALIDATION_REQUIRES_PAYMENT
```

No failure authorizes automatic retry, fallback, broader assets, another release or architecture, mirror, package manager, installer, execution, account action, secret access, endpoint creation, paid path, or a later Z0 stage.

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
Z0L_AUTHORIZATION_POST_DOWNLOAD_PRE_INSPECTION_RECHECK
Z0L_AUTHORIZATION_PRE_EXTRACTION_RECHECK
Z0L_AUTHORIZATION_PRE_BINARY_HASH_RECHECK
Z0L_AUTHORIZATION_PRE_REPORT_RECHECK

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

Z0L_LOCAL_ARTIFACT_CUSTODIAN=EXECUTING_FOUNDER_CONTROLLED_LOCAL_OPERATOR
Z0L_EVIDENCE_ROOT_ACCESS_CHECK=OWNER_ONLY_PASS
Z0L_EXTRACTION_ROOT_ACCESS_CHECK=OWNER_ONLY_PASS
Z0L_FAILED_RUN_TEMP_CLEANUP_STATE_IF_APPLICABLE
Z0L_FAILED_RUN_EXTRACTION_CLEANUP_STATE_IF_APPLICABLE
Z0L_RESIDUAL_QUARANTINED_IF_APPLICABLE
Z0L_RESIDUAL_MANIFEST_DIGEST_IF_APPLICABLE
Z0L_TERMINAL_ARTIFACT_CUSTODY_STATE

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
- account signup, login, or environment enablement;
- shares, reserved names, or public endpoints;
- payment methods or paid features;
- any real secret or credential access;
- GitHub App creation, registration, installation, configuration, or mutation;
- webhook activation or real webhook delivery;
- application source mutation;
- `Z0A`, `Z0S`, `Z0R`, or `Z0D`;
- founder process-authority trust-root establishment;
- H4 completion.

A canonical authorization merge means only: **a later Z0L local-artifact-validation run may be started under this exact live-checkpointed, fail-closed procedure while every authorization binding remains valid**.
