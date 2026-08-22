# KODAC KDO H4-R4B Phase-B — Z0P Canonicalization / Z0L Authorization

Date: 2026-08-22  
Status: **AUTHORIZATION CANDIDATE — DOCS ONLY — FAIL CLOSED**  
Repository: `TheHalfMoon/Kodac`

## 1. Purpose

Canonicalize the completed `Z0P=PUBLIC_PROVENANCE_CAPTURE` evidence produced under canonical PR #159, bind that evidence to exact KODAC and upstream zrok identities, and define a separately reviewable authorization boundary for `Z0L=LOCAL_ARTIFACT_VALIDATION`.

This document is a governance mutation only. It does **not** execute Z0L. Until this document is merged canonically, Z0L remains blocked.

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

If this governance slice is merged canonically, the Z0P status becomes:

```text
Z0P=CLOSED_CANONICAL
```

## 5. Z0L authorization boundary

Z0L remains **not executable while this document is only a candidate PR**.

If and only if this exact governance candidate is independently reviewed, passes exact-head repository gates, and is merged canonically, Z0L becomes authorized to perform **local artifact validation only** under the constraints below.

```text
Z0L=AUTHORIZED_TO_EXECUTE_AFTER_CANONICAL_MERGE_ONLY
Z0A=NOT_AUTHORIZED
Z0S=NOT_AUTHORIZED
Z0R=NOT_AUTHORIZED
Z0D=NOT_AUTHORIZED
```

### 5.1 Exact permitted acquisition

Z0L may acquire exactly one upstream archive and no other zrok executable payload:

```text
Z0L_UPSTREAM_REPOSITORY=openziti/zrok
Z0L_RELEASE_TAG=v2.0.4
Z0L_RELEASE_COMMIT=6ff920390e77bf04b8e64871a049400cc417d871
Z0L_ASSET_NAME=zrok_2.0.4_windows_amd64.tar.gz
Z0L_ASSET_ID=423489481
Z0L_ASSET_SIZE_BYTES=33087763
Z0L_EXPECTED_SHA256=8e4062a159f65c3735d67d82de0f6a6f59555e9f98a786e80c1e6ab22d92d8c9
Z0L_ASSET_URL=https://github.com/openziti/zrok/releases/download/v2.0.4/zrok_2.0.4_windows_amd64.tar.gz
```

Immediately before acquisition, the executor must re-read upstream GitHub release metadata and fail closed if tag, commit, asset name, asset ID, size, or upstream SHA-256 differs from the Z0P-bound values.

```text
FLOATING_LATEST_URL=FORBIDDEN
THIRD_PARTY_MIRROR_DOWNLOAD=FORBIDDEN
THIRD_PARTY_CHECKSUM_AUTHORITY=FORBIDDEN
UNPINNED_ASSET_DOWNLOAD=FORBIDDEN
```

### 5.2 Quarantine and validation requirements

The archive must be acquired only into a disposable local evidence directory that is not on `PATH` and is not a repository worktree.

Required order:

```text
1. RECHECK_UPSTREAM_EXACT_IDENTITY
2. CREATE_DISPOSABLE_NON_PATH_EVIDENCE_DIRECTORY
3. DOWNLOAD_EXACT_BOUND_ARCHIVE_ONLY
4. RECORD_DOWNLOADED_SIZE_BYTES
5. COMPUTE_DOWNLOADED_ARCHIVE_SHA256
6. REQUIRE_SHA256_MATCH_BEFORE_EXTRACTION
7. LIST_ARCHIVE_MEMBERS_WITHOUT_EXECUTION
8. FAIL_ON_ABSOLUTE_PATH_OR_PATH_TRAVERSAL_MEMBER
9. EXTRACT_ONLY_TO_DISPOSABLE_NON_PATH_DIRECTORY
10. RECORD_EXTRACTED_FILE_LIST
11. HASH_EXTRACTED_ZROK2_BINARY
12. RECORD_AUTHENTICODE_STATE_IF_AVAILABLE_WITHOUT_EXECUTING_ZROK
13. EMIT_REDACTED_Z0L_EVIDENCE_REPORT
14. STOP
```

Required controls:

```text
VERIFY_SHA256_BEFORE_EXTRACTION=YES
VERIFY_ARCHIVE_MEMBER_PATHS_BEFORE_EXTRACTION=YES
EXTRACT_TO_DISPOSABLE_NON_PATH_DIRECTORY_ONLY=YES
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

### 5.3 Z0L fail-closed conditions

Z0L must stop immediately if any of the following occurs:

```text
KODAC_CANONICAL_AUTHORIZATION_NOT_PRESENT
UPSTREAM_RELEASE_TAG_CHANGED
UPSTREAM_RELEASE_COMMIT_CHANGED
UPSTREAM_RELEASE_VERIFICATION_NOT_VALID
ASSET_NAME_CHANGED
ASSET_ID_CHANGED
ASSET_SIZE_CHANGED
UPSTREAM_SHA256_CHANGED_OR_UNAVAILABLE
DOWNLOADED_SIZE_MISMATCH
DOWNLOADED_SHA256_MISMATCH
ARCHIVE_MEMBER_ABSOLUTE_PATH
ARCHIVE_MEMBER_PATH_TRAVERSAL
UNEXPECTED_EXECUTABLE_OR_INSTALLER_SURFACE
VALIDATION_REQUIRES_ZROK_EXECUTION
VALIDATION_REQUIRES_ACCOUNT_OR_SECRET
VALIDATION_REQUIRES_PAYMENT
```

No failed Z0L attempt may broaden authority or fall back to another release, platform, mirror, package manager, installer, or paid path.

## 6. Required Z0L evidence output

A future Z0L execution report must bind at least:

```text
Z0L_CANONICAL_AUTHORIZATION_COMMIT
Z0L_CANONICAL_AUTHORIZATION_TREE
Z0L_RELEASE_TAG
Z0L_RELEASE_COMMIT
Z0L_ASSET_NAME
Z0L_ASSET_ID
Z0L_EXPECTED_SIZE_BYTES
Z0L_DOWNLOADED_SIZE_BYTES
Z0L_EXPECTED_SHA256
Z0L_DOWNLOADED_ARCHIVE_SHA256
Z0L_SHA256_MATCH
Z0L_ARCHIVE_MEMBER_LIST_DIGEST
Z0L_ARCHIVE_PATH_TRAVERSAL_CHECK
Z0L_EXTRACTION_DIRECTORY_CLASS=DISPOSABLE_NON_PATH
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

## 7. Explicitly blocked stages

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

## 8. Candidate merge effect

Before merge:

```text
Z0P=PASS_EVIDENCE_COMPLETE_NOT_CANONICAL
Z0L=NOT_AUTHORIZED
```

Only after independent exact-head review, required repository gates, and canonical merge of this exact candidate:

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

Any head movement after review invalidates that review for merge qualification. No force-push, rebase, or destructive history rewriting is authorized.