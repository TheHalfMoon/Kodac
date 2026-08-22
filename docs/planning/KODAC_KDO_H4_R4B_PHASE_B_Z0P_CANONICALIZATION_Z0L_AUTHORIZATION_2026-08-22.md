# KODAC KDO H4-R4B Phase-B — Z0P Canonicalization / Z0L Authorization

Date: 2026-08-22  
Status: **AUTHORIZATION CANDIDATE — DOCS ONLY — FAIL CLOSED**  
Repository: `TheHalfMoon/Kodac`

## 1. Purpose

Canonicalize the completed `Z0P=PUBLIC_PROVENANCE_CAPTURE` evidence produced under canonical PR #159, bind that evidence to exact KODAC and upstream zrok identities, and define a separately reviewable authorization boundary for `Z0L=LOCAL_ARTIFACT_VALIDATION`.

This document is a governance mutation only. It does **not** execute Z0L. Until PR #160 is independently reviewed on its exact final head and merged canonically, Z0L remains blocked.

```text
PROVIDER_SPEND_USD=0.00
PAID_FALLBACK=FORBIDDEN
PAYMENT_METHOD_ADDITION=FORBIDDEN
ZROK_ACCOUNT_MUTATION=NO
PUBLIC_ENDPOINT_CREATION=NO
REAL_SECRET_ACCESS=NO
GITHUB_APP_MUTATION=NO
WEBHOOK_ACTIVATION=NO
APP_SOURCE_MUTATION=NO
H4_COMPLETE=NO
```

## 2. Exact canonical baseline

```text
KODAC_CANONICAL_MAIN=8e366e4816efc7c1e056b3361c635bd8dd7d54a2
KODAC_CANONICAL_TREE=6b7c75796af0140b195e19c557f0dda29f52edd4
PR_159=MERGED_CANONICAL
PR_159_MERGE_COMMIT=8e366e4816efc7c1e056b3361c635bd8dd7d54a2

Z0P_AUTHORITY=PUBLIC_READ_ONLY_PROVENANCE_CAPTURE
Z0L_AUTHORITY_AT_BASE=NOT_AUTHORIZED
Z0A_AUTHORITY_AT_BASE=NOT_AUTHORIZED
Z0S_AUTHORITY_AT_BASE=NOT_AUTHORIZED
Z0R_AUTHORITY_AT_BASE=NOT_AUTHORIZED
Z0D_AUTHORITY_AT_BASE=NOT_AUTHORIZED
```

Canonical PR #159 authorized only Z0P read-only public provenance capture and explicitly kept all mutation-bearing stages separately gated.

## 3. Z0P executed evidence binding

The bounded local Z0P probe completed successfully without downloading or executing the zrok archive/binary and without account, endpoint, secret, GitHub App, webhook, or app-source mutation.

### 3.1 Evidence artifact digests

```text
Z0P_PROBE_PATH=/tmp/kodac-zrok-z0p.sh
Z0P_PROBE_SHA256=e76c72380687992a778aa7906eb64b342529f561622186ab0545cc9f31461089

Z0P_RESULT_PATH=/tmp/kodac-zrok-z0p-result.txt
Z0P_RESULT_SHA256=be13cd252926a8a0d32fb39e8b8882df89563e784d5d2106f6229f12ace3d88c

Z0P_REPORT_PATH=/tmp/KODAC_Z0P_UPSTREAM_PROVENANCE_CAPTURE_2026-08-22.md
Z0P_REPORT_SHA256=48ebe5df66e762f9bcad22d24118a83db14214aa9a333c336d4993fd6d6a927c
```

The paths above identify the local evidence capture context; the SHA-256 values are the binding authority carried into this governance slice.

### 3.2 Exact upstream release identity

```text
Z0P_UPSTREAM_REPOSITORY=openziti/zrok
Z0P_RELEASE_TAG=v2.0.4
Z0P_RELEASE_ID=324454840
Z0P_RELEASE_COMMIT=6ff920390e77bf04b8e64871a049400cc417d871
Z0P_RELEASE_VERIFICATION=VERIFIED
Z0P_RELEASE_VERIFICATION_REASON=valid
Z0P_RELEASE_API_ASSET_COUNT=9
Z0P_PLATFORM=windows
Z0P_ARCH=amd64
```

The earlier public-page observation of `Assets 11` is not used as execution authority. The exact GitHub release API response used by the successful probe reported 9 release assets and supplied the exact asset IDs, sizes, and digest below.

### 3.3 Exact Windows amd64 archive identity

```text
Z0P_RELEASE_ASSET_NAME=zrok_2.0.4_windows_amd64.tar.gz
Z0P_RELEASE_ASSET_ID=423489481
Z0P_RELEASE_ASSET_SIZE_BYTES=33087763
Z0P_RELEASE_ASSET_API_DIGEST=sha256:8e4062a159f65c3735d67d82de0f6a6f59555e9f98a786e80c1e6ab22d92d8c9
Z0P_RELEASE_ASSET_SHA256=8e4062a159f65c3735d67d82de0f6a6f59555e9f98a786e80c1e6ab22d92d8c9
```

The SHA-256 obtained from upstream `checksums.sha256.txt` matched the GitHub API asset digest exactly.

```text
GITHUB_ASSET_DIGEST_MATCH=PASS
UPSTREAM_CHECKSUM_MATCH=PASS
THIRD_PARTY_CHECKSUM_AUTHORITY_USED=NO
THIRD_PARTY_CHECKSUM_VALUE_USED=NO
```

### 3.4 Checksum and SBOM identities

```text
Z0P_RELEASE_CHECKSUM_FILE=checksums.sha256.txt
Z0P_RELEASE_CHECKSUM_ASSET_ID=423489482
Z0P_RELEASE_CHECKSUM_ASSET_SIZE_BYTES=771

Z0P_RELEASE_SBOM_ASSET=sbom-v2.0.4.spdx.json
Z0P_RELEASE_SBOM_ASSET_ID=423489459
Z0P_RELEASE_SBOM_ASSET_SIZE_BYTES=2301255
```

Z0P required only SBOM presence/identity capture; the SBOM body was not required to be downloaded by Z0P.

## 4. Z0P terminal reconciliation

```text
Z0P_UPSTREAM_RELEASE_IDENTITY=PASS
Z0P_FULL_RELEASE_COMMIT=PASS
Z0P_WINDOWS_AMD64_ASSET_IDENTITY=PASS
Z0P_UPSTREAM_SHA256=PASS
Z0P_SBOM_PRESENCE=PASS
Z0P_NO_BINARY_DOWNLOADED=PASS
Z0P_NO_EXECUTION=PASS
Z0P_NO_ACCOUNT_MUTATION=PASS
Z0P_NO_PUBLIC_ENDPOINT=PASS
Z0P_NO_REAL_SECRET_ACCESS=PASS
PROVIDER_SPEND_USD=0.00

Z0P=PASS
```

If PR #160 is merged canonically after exact-head qualification, the Z0P status becomes:

```text
Z0P=CLOSED_CANONICAL
```

## 5. Exact candidate binding and merge gate

The first CodeRabbit review of PR #160 completed on pre-repair head `6e376fbfc2e91e8ba59f0a17266987a4ca8caf6c` and produced material findings. That head is **not merge-qualified** and cannot authorize Z0L.

```text
AUTHORIZATION_PR=160
PRE_REPAIR_REVIEWED_HEAD=6e376fbfc2e91e8ba59f0a17266987a4ca8caf6c
PRE_REPAIR_REVIEWED_TREE=0538d3c85ce94200a4f4960fa7b8d548b0271a9c
PRE_REPAIR_DOCUMENT_BLOB_SHA=68c8ae07c7dfacab872e1f39a7967825739637f8
PRE_REPAIR_REVIEW_RESULT=MATERIAL_FINDINGS
PRE_REPAIR_AUTHORIZATION_VALID=NO
```

The final reviewed candidate identity is intentionally carried in PR #160 metadata rather than embedded as a self-referential commit hash inside the file whose bytes determine that hash. Before Ready or merge, the PR body must contain **concrete** values read from GitHub for the final head:

```text
Z0L_REVIEWED_PR=160
Z0L_REVIEWED_CANDIDATE_COMMIT=EXACT_40_HEX_REQUIRED_IN_PR_BODY
Z0L_REVIEWED_CANDIDATE_TREE=EXACT_40_HEX_REQUIRED_IN_PR_BODY
Z0L_REVIEWED_DOCUMENT_BLOB_SHA=EXACT_40_HEX_REQUIRED_IN_PR_BODY
Z0L_REVIEWED_DOCUMENT_SHA256=EXACT_64_HEX_REQUIRED_IN_PR_BODY
Z0L_REVIEW_RESULT=PASS_REQUIRED
Z0L_UNRESOLVED_MATERIAL_FINDINGS=0_REQUIRED
```

`Z0L_REVIEWED_DOCUMENT_SHA256` is the SHA-256 of the exact UTF-8 bytes of this file at `Z0L_REVIEWED_CANDIDATE_COMMIT`.

The merge operation must use the exact reviewed head SHA as its expected-head precondition. Immediately before merge, GitHub live state must prove:

```text
PR_NUMBER=160
PR_HEAD_EQUALS_Z0L_REVIEWED_CANDIDATE_COMMIT=YES
PR_HEAD_TREE_EQUALS_Z0L_REVIEWED_CANDIDATE_TREE=YES
DOCUMENT_BLOB_EQUALS_Z0L_REVIEWED_DOCUMENT_BLOB_SHA=YES
DOCUMENT_SHA256_EQUALS_Z0L_REVIEWED_DOCUMENT_SHA256=YES
EXACT_HEAD_REPOSITORY_GATES=PASS
INDEPENDENT_EXACT_HEAD_REVIEW=PASS
UNRESOLVED_MATERIAL_FINDINGS=0
```

After merge, Z0L becomes authorized only if the canonical merge commit has the exact reviewed head as a parent and the merged tree contains the exact reviewed document blob. The evidence report must bind:

```text
Z0L_CANONICAL_AUTHORIZATION_PR=160
Z0L_CANONICAL_AUTHORIZATION_MERGE_COMMIT=EXACT_POST_MERGE_VALUE
Z0L_CANONICAL_AUTHORIZATION_REVIEWED_HEAD=EXACT_PR_BODY_VALUE
Z0L_CANONICAL_AUTHORIZATION_TREE=EXACT_PR_BODY_VALUE
Z0L_CANONICAL_AUTHORIZATION_DOCUMENT_BLOB_SHA=EXACT_PR_BODY_VALUE
Z0L_CANONICAL_AUTHORIZATION_DOCUMENT_SHA256=EXACT_PR_BODY_VALUE
```

Any mismatch is terminal fail-closed and leaves `Z0L=NOT_AUTHORIZED`.

## 6. Z0L authorization boundary

Z0L remains **not executable while PR #160 is unmerged**.

If and only if the exact final candidate satisfies Section 5, is independently reviewed with no unresolved material findings, passes exact-head repository gates, and is merged canonically, Z0L becomes authorized to perform **local artifact validation only**.

```text
Z0L=AUTHORIZED_TO_EXECUTE_AFTER_CANONICAL_MERGE_ONLY
Z0A=NOT_AUTHORIZED
Z0S=NOT_AUTHORIZED
Z0R=NOT_AUTHORIZED
Z0D=NOT_AUTHORIZED
```

### 6.1 Exact permitted acquisition

Z0L may acquire exactly one upstream archive and no other zrok executable payload:

```text
Z0L_UPSTREAM_REPOSITORY=openziti/zrok
Z0L_RELEASE_TAG=v2.0.4
Z0L_RELEASE_COMMIT=6ff920390e77bf04b8e64871a049400cc417d871
Z0L_ASSET_NAME=zrok_2.0.4_windows_amd64.tar.gz
Z0L_ASSET_ID=423489481
Z0L_ASSET_SIZE_BYTES=33087763
Z0L_EXPECTED_SHA256=8e4062a159f65c3735d67d82de0f6a6f59555e9f98a786e80c1e6ab22d92d8c9
Z0L_ASSET_API_URL=https://api.github.com/repos/openziti/zrok/releases/assets/423489481
Z0L_ASSET_ACCEPT=application/octet-stream
TAG_BASED_BROWSER_DOWNLOAD_AS_AUTHORITY=FORBIDDEN
```

The acquisition request must use the immutable GitHub release-asset endpoint for asset ID `423489481` with `Accept: application/octet-stream`. A tag-based browser download URL may be used only as descriptive provenance and not as acquisition authority.

Immediately before acquisition, the executor must re-read upstream GitHub release metadata and fail closed if tag, full release commit, GitHub verification state, asset name, asset ID, asset size, upstream SHA-256, or API digest differs from the Z0P-bound values.

```text
FLOATING_LATEST_URL=FORBIDDEN
TAG_BASED_ASSET_URL_AS_AUTHORITY=FORBIDDEN
THIRD_PARTY_MIRROR_DOWNLOAD=FORBIDDEN
THIRD_PARTY_CHECKSUM_AUTHORITY=FORBIDDEN
UNPINNED_ASSET_DOWNLOAD=FORBIDDEN
```

### 6.2 Disposable evidence directory and partial-state controls

The evidence root and extraction directory must both be newly created, empty, disposable directories outside every repository worktree and outside `PATH`.

```text
EXISTING_EVIDENCE_DIRECTORY_REUSE=FORBIDDEN
EXISTING_EXTRACTION_DIRECTORY_REUSE=FORBIDDEN
PARTIAL_DOWNLOAD_REUSE=FORBIDDEN
RESUMED_DOWNLOAD=FORBIDDEN
OVERWRITE_EXISTING_ARCHIVE=FORBIDDEN
OVERWRITE_EXISTING_EXTRACTED_FILE=FORBIDDEN
FAILED_ATTEMPT_REUSE=FORBIDDEN
```

The archive must first be written to a unique temporary filename inside the evidence directory. Only after exact byte-size and SHA-256 verification may it be promoted to the evidence filename. Any failed or interrupted download is invalid evidence and may not be resumed or reused.

### 6.3 Archive confinement and extraction requirements

No archive member may be extracted until the complete archive header/member inventory has been inspected without executing zrok.

For every member, normalize separators and path components before policy evaluation. Fail closed on any member that is:

- an absolute POSIX path;
- a Windows drive-qualified path such as `C:\...` or `C:/...`;
- a UNC or device path such as `\\server\share`, `//server/share`, `\\?\...`, or `\\.\...`;
- empty, `.`-only, or contains any `..` traversal component after normalization;
- a symbolic link, hard link, junction, reparse-point-like member, FIFO, socket, device node, or any other non-regular special file;
- a duplicate normalized path, including a case-insensitive collision relevant to Windows;
- outside the freshly created extraction root after canonical path resolution;
- an executable/installer surface other than the expected `zrok2.exe` regular file;
- any file not explicitly admitted by the pre-extraction member allowlist.

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

The pre-extraction allowlist must be recorded in evidence and must permit only regular files expected from the exact upstream packaging surface. If the exact expected member set cannot be established without broadening trust, Z0L must stop before extraction.

Extraction must use a no-follow/safe extraction mechanism that does not materialize links, does not follow pre-existing filesystem links, refuses overwrite, and verifies after each created file that its canonical path remains beneath the fresh extraction root. A generic unrestricted `tar -xf` or equivalent is not authorized.

Required order:

```text
1. RECHECK_CANONICAL_Z0L_AUTHORIZATION_BINDING
2. RECHECK_UPSTREAM_EXACT_IDENTITY
3. CREATE_FRESH_EMPTY_DISPOSABLE_EVIDENCE_DIRECTORY
4. DOWNLOAD_EXACT_ASSET_ID_TO_UNIQUE_TEMP_FILE
5. RECORD_DOWNLOADED_SIZE_BYTES
6. COMPUTE_DOWNLOADED_ARCHIVE_SHA256
7. REQUIRE_EXACT_SIZE_AND_SHA256_MATCH
8. LIST_AND_PARSE_ALL_ARCHIVE_HEADERS_WITHOUT_EXECUTION
9. NORMALIZE_AND_VALIDATE_ALL_MEMBER_NAMES
10. REJECT_LINKS_SPECIAL_FILES_DRIVE_UNC_TRAVERSAL_AND_COLLISIONS
11. BUILD_AND_RECORD_EXACT_REGULAR_FILE_ALLOWLIST
12. REQUIRE_EXPECTED_ZROK2_EXE_REGULAR_FILE_COUNT_EQUALS_ONE
13. CREATE_FRESH_EMPTY_EXTRACTION_DIRECTORY
14. EXTRACT_WITH_NO_FOLLOW_SAFE_MODE_AND_NO_OVERWRITE
15. VERIFY_EACH_EXTRACTED_CANONICAL_PATH_REMAINS_UNDER_ROOT
16. RECORD_EXTRACTED_FILE_LIST
17. HASH_EXTRACTED_ZROK2_BINARY
18. RECORD_AUTHENTICODE_STATE_IF_AVAILABLE_WITHOUT_EXECUTING_ZROK
19. EMIT_REDACTED_Z0L_EVIDENCE_REPORT
20. STOP
```

Required controls:

```text
VERIFY_SHA256_BEFORE_EXTRACTION=YES
VERIFY_ARCHIVE_MEMBER_PATHS_BEFORE_EXTRACTION=YES
VERIFY_ARCHIVE_MEMBER_TYPES_BEFORE_EXTRACTION=YES
VERIFY_LINK_TARGETS_BY_REJECTING_ALL_LINK_MEMBERS=YES
EXTRACT_TO_DISPOSABLE_NON_PATH_DIRECTORY_ONLY=YES
EXTRACTION_NO_FOLLOW_SAFE_MODE=REQUIRED
EXTRACTION_NO_OVERWRITE=REQUIRED
SYSTEM_INSTALL=NO
USER_PATH_MUTATION=NO
REGISTRY_MUTATION=NO
WINDOWS_SERVICE_INSTALL=NO
AUTO_START=NO
ZROK_BINARY_EXECUTION=NO
ZROK_VERSION_COMMAND=NO
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
```

The extracted binary remains quarantined and **must not be executed**, including for `--version`, unless a later independently reviewed canonical authorization explicitly permits execution.

### 6.4 Z0L fail-closed conditions

Z0L must stop immediately if any of the following occurs:

```text
KODAC_CANONICAL_AUTHORIZATION_NOT_PRESENT
PR_160_REVIEWED_HEAD_BINDING_MISMATCH
PR_160_REVIEWED_TREE_BINDING_MISMATCH
PR_160_DOCUMENT_BLOB_BINDING_MISMATCH
PR_160_DOCUMENT_SHA256_BINDING_MISMATCH
UPSTREAM_RELEASE_TAG_CHANGED
UPSTREAM_RELEASE_COMMIT_CHANGED
UPSTREAM_RELEASE_VERIFICATION_NOT_VALID
ASSET_NAME_CHANGED
ASSET_ID_CHANGED
ASSET_SIZE_CHANGED
UPSTREAM_SHA256_CHANGED_OR_UNAVAILABLE
UPSTREAM_API_DIGEST_CHANGED_OR_MISMATCH
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

No failed Z0L attempt may broaden authority or fall back to another release, platform, mirror, package manager, installer, extraction mode, or paid path.

## 7. Required Z0L evidence output

A future Z0L execution report must bind at least:

```text
Z0L_CANONICAL_AUTHORIZATION_PR
Z0L_CANONICAL_AUTHORIZATION_MERGE_COMMIT
Z0L_CANONICAL_AUTHORIZATION_REVIEWED_HEAD
Z0L_CANONICAL_AUTHORIZATION_TREE
Z0L_CANONICAL_AUTHORIZATION_DOCUMENT_BLOB_SHA
Z0L_CANONICAL_AUTHORIZATION_DOCUMENT_SHA256
Z0L_RELEASE_TAG
Z0L_RELEASE_COMMIT
Z0L_ASSET_NAME
Z0L_ASSET_ID
Z0L_ASSET_API_URL
Z0L_EXPECTED_SIZE_BYTES
Z0L_DOWNLOADED_SIZE_BYTES
Z0L_EXPECTED_SHA256
Z0L_DOWNLOADED_ARCHIVE_SHA256
Z0L_SHA256_MATCH
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

The evidence report must contain no secrets and must not embed binary/archive payloads.

## 8. Explicitly blocked stages

Neither Z0P closure nor a future Z0L pass authorizes any later stage.

```text
Z0A=BLOCKED_SEPARATE_AUTHORIZATION_REQUIRED
Z0S=BLOCKED_SEPARATE_AUTHORIZATION_REQUIRED
Z0R=BLOCKED_SEPARATE_AUTHORIZATION_REQUIRED
Z0D=BLOCKED_SEPARATE_AUTHORIZATION_REQUIRED
H4_COMPLETE=NO
```

In particular, this slice does not authorize:

- zrok account signup, login, or environment enablement;
- reserved names or shares;
- public endpoints;
- payment methods or paid features;
- real GitHub App credentials or webhook secrets;
- GitHub App installation/configuration mutation;
- real webhook delivery;
- app source repository mutation;
- any claim that zrok is selected as the final KODAC ingress path;
- any claim that H4 is complete.

## 9. Candidate merge effect

Before merge:

```text
Z0P=PASS_EVIDENCE_COMPLETE_NOT_CANONICAL
Z0L=NOT_AUTHORIZED
```

Only after all Section 5 bindings are concrete in PR #160 metadata, independent exact-head review has passed on that exact final head with zero unresolved material findings, repository gates pass on the same head, and the canonical merge uses that exact expected head:

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

Any head movement after final review invalidates that review and every PR-body candidate binding for merge qualification. No force-push, rebase, or destructive history rewriting is authorized.
