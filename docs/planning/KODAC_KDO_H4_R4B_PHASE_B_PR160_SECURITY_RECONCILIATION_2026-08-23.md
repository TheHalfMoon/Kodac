# KODAC KDO H4-R4B Phase-B — PR #160 Security Reconciliation

Date: 2026-08-23  
Status: **SECURITY RECONCILIATION — DOCS ONLY — FAIL CLOSED**  
Repository: `TheHalfMoon/Kodac`  
Pull request: `#160`

## 1. Purpose and precedence

This document is the later controlling governance text for PR #160 where either of the two earlier PR #160 documents conflicts with this reconciliation:

- `KODAC_KDO_H4_R4B_PHASE_B_Z0P_CANONICALIZATION_Z0L_AUTHORIZATION_2026-08-22.md`
- `KODAC_KDO_H4_R4B_PHASE_B_Z0L_REVIEW_ATTESTATION_RECONCILIATION_2026-08-23.md`

It resolves the material findings from the CodeRabbit review sequence and repairs one over-scoped dependency introduced during those repairs, without granting executable authority.

This reconciliation does **not** execute Z0L, download or execute zrok, mutate a zrok account/environment/share, create a public endpoint, add a payment method, access real secrets, mutate a GitHub App, activate a webhook, mutate app source, establish the founder process-authority trust root, or establish H4 completion.

```text
PROVIDER_SPEND_USD=0.00
FOUNDER_PROCESS_AUTHORITY_TRUST_ROOT_ESTABLISHMENT=NO
H4_COMPLETE=NO
```

If any earlier PR #160 clause can be read to authorize Z0L execution, trust-root establishment, H4 completion, or a weaker review/body/canonicalization rule contrary to this document, that earlier clause is superseded for PR #160 and must not be used as authority.

## 2. Z0P and Z0L state after this reconciliation

The completed read-only Z0P evidence remains valid evidence and remains bound to the exact digests and upstream identities already recorded by the primary PR #160 document.

This reconciliation **withdraws the proposed post-merge Z0L authorization** from PR #160. PR #160 is a Z0P canonicalization candidate only; it does not itself authorize Z0L.

```text
Z0P_EVIDENCE=PASS
Z0P_CLOSED_CANONICAL=NO
Z0L=NOT_AUTHORIZED
Z0A=NOT_AUTHORIZED
Z0S=NOT_AUTHORIZED
Z0R=NOT_AUTHORIZED
Z0D=NOT_AUTHORIZED
```

All primary-document sections describing the future mechanics of a possible Z0L local artifact validation remain design/evidence-planning material only. They are **not executable authority** under PR #160.

```text
PR_160_Z0L_EXECUTION_AUTHORITY=NONE
PR_160_Z0L_ACQUISITION_AUTHORITY=NONE
PR_160_Z0L_EXTRACTION_AUTHORITY=NONE
```

A later Z0L authorization remains a **separate exact-head authorization after Z0P is canonicalized**, exactly as required by the canonical zrok staged-proof authorization. PR #160 does not grant that later authorization.

## 3. Canonical server-side atomic-gate scope and dependency repair

Canonical main at the time this reconciliation is authored is:

```text
CANONICAL_MAIN=8e366e4816efc7c1e056b3361c635bd8dd7d54a2
CANONICAL_TREE=6b7c75796af0140b195e19c557f0dda29f52edd4
```

Canonical main contains:

`docs/planning/KODAC_KDO_H4_R4B_PHASE_B_SERVER_SIDE_ATOMIC_GATE_AUTHORIZATION_2026-08-22.md`

That canonical authorization states its purpose narrowly: it is the safe design predecessor required **before the founder process-authority trust root may be established**. It authorizes design and later implementation/configuration slices but does not itself prove the gate.

Therefore the current canonical state remains:

```text
PHASE_B_SERVER_SIDE_ATOMIC_GATE_AUTHORIZATION=CANONICAL
PHASE_B_SERVER_SIDE_ATOMIC_GATE=NOT_PROVEN
FOUNDER_PROCESS_AUTHORITY_TRUST_ROOT_ESTABLISHMENT=BLOCKED_ON_ATOMIC_GATE
```

The connected merge wrapper's `expected_head_sha` / REST merge `sha` head precondition protects PR-head identity only. It does not by itself atomically bind every mutable review or repository predicate to a merge. That fact remains unchanged:

```text
EXPECTED_HEAD_SHA_ALONE_IS_ATOMIC_AUTHORIZATION=NO
CLIENT_SIDE_FINAL_RECHECK_PLUS_MERGE_IS_ATOMIC_TRUST_ROOT_AUTHORIZATION=NO
```

However, the server-side atomic-gate authorization is **not a universal prerequisite for every non-establishment docs-only governance merge**. Applying `PHASE_B_SERVER_SIDE_ATOMIC_GATE=PROVEN` as a prerequisite to this Z0P-only canonicalization created an invalid dependency cycle:

1. the canonical zrok staged-proof authorization requires Z0P to be canonicalized before any separate Z0L authorization;
2. the canonical zero-cost ingress path keeps ingress selection and AG2 blocked while the staged ingress proof remains incomplete;
3. the repaired server-side architecture requires AG2 only after the exact installed GitHub App/check source can be observed;
4. the atomic gate cannot become proven before its App/protected-main/qualification chain is actually established and proven;
5. therefore requiring a proven atomic gate before merely canonicalizing Z0P would make a prerequisite of the later gate depend on the gate already being proven.

The repaired scope is:

```text
PHASE_B_ATOMIC_GATE_REQUIRED_BEFORE_TRUST_ROOT_ESTABLISHMENT=YES
PHASE_B_ATOMIC_GATE_REQUIRED_BEFORE_H4_TRUST_ROOT_AUTHORITY=YES
PHASE_B_ATOMIC_GATE_REQUIRED_FOR_PR160_Z0P_ONLY_CANONICALIZATION=NO
PHASE_B_ATOMIC_GATE_REQUIRED_FOR_SEPARATELY_AUTHORIZED_PRE_ESTABLISHMENT_INGRESS_PROOFS=NO

PR_160_MAXIMUM_EFFECT=Z0P_CANONICAL_EVIDENCE_CLASSIFICATION_ONLY
PR_160_Z0L_AUTHORITY=NONE
PR_160_TRUST_ROOT_AUTHORITY=NONE
PR_160_H4_CLOSURE_AUTHORITY=NONE
```

This scope correction does not weaken the trust-root theorem. Any future founder process-authority trust-root establishment candidate still requires the canonical server-side atomic gate to be proven first.

## 4. Independent-review authority model

For PR #160, the GitHub-authenticated `coderabbitai[bot]` issue-comment record is authoritative for reviewer identity, final review run, repository/PR scope, terminal conclusion, and exact review-range end SHA.

A qualifying record must be read from GitHub and prove:

```text
INDEPENDENT_REVIEW_PROVIDER=CodeRabbit
AUTHORITATIVE_REVIEW_RECORD_TYPE=GITHUB_ISSUE_COMMENT
AUTHORITATIVE_REVIEW_RECORD_AUTHOR_LOGIN=coderabbitai[bot]
AUTHORITATIVE_REVIEW_RECORD_AUTHOR_ID=136622811
AUTHORITATIVE_REVIEW_RECORD_REPOSITORY=TheHalfMoon/Kodac
AUTHORITATIVE_REVIEW_RECORD_PR=160
AUTHORITATIVE_REVIEW_RECORD_RUN_ID=EXACT_RUN_ID_REQUIRED
AUTHORITATIVE_REVIEW_RECORD_RANGE_END_SHA=EXACT_CURRENT_HEAD_REQUIRED
AUTHORITATIVE_REVIEW_RECORD_RESULT=NO_ACTIONABLE_COMMENTS_REQUIRED
AUTHORITATIVE_REVIEW_RECORD_ID=EXACT_GITHUB_COMMENT_ID_REQUIRED
AUTHORITATIVE_REVIEW_RECORD_UPDATED_AT=EXACT_TIMESTAMP_REQUIRED
```

The exact-head commit status is a separate consistency gate only:

```text
CODERABBIT_COMMIT_STATUS_CONTEXT=CodeRabbit
CODERABBIT_COMMIT_STATUS_STATE=success_REQUIRED_ON_EXACT_CURRENT_HEAD
CODERABBIT_COMMIT_STATUS_ROLE=CONSISTENCY_GATE_ONLY
```

The status context must never replace, override, or contradict the authoritative issue-comment record. A missing or non-success exact-head status fails qualification. Any disagreement between the status and the authoritative issue-comment record also fails qualification.

All current non-outdated material review threads must be resolved before the review may be classified clean:

```text
CURRENT_NON_OUTDATED_UNRESOLVED_MATERIAL_THREADS=0_REQUIRED
```

This Section supersedes every earlier PR #160 statement that made the commit status authorization-bearing review identity/run evidence or reduced the authenticated issue-comment record to audit context.

## 5. PR-body integrity model

The PR body is not authorization authority and is removed entirely from the authorization-critical evidence model.

```text
PR_BODY_AUTHORIZATION_AUTHORITY=NO
PR_BODY_DIGEST_AUTHORIZATION_GATE=NOT_USED
PR_BODY_NORMALIZATION_AUTHORIZATION_GATE=NOT_USED
CODERABBIT_RELEASE_NOTES_AUTHORIZATION_EXCEPTION=NOT_USED
```

No content between release-notes delimiters is trusted merely because the delimiters are present. No PR author or bot can gain authorization by adding, changing, deleting, or moving a PR-body release-notes block because **no PR-body bytes participate in authorization**.

The exact reviewed repository commit, tree, and governance-document blobs remain immutable candidate evidence. GitHub-authenticated review objects/statuses and current review-thread state remain external review evidence. The PR body may summarize those facts for human readability, but disagreement with GitHub-native evidence is resolved in favor of GitHub-native evidence and fail closed.

This Section supersedes all earlier PR #160 normalized-body digest, body-freeze, and release-notes-exemption rules.

## 6. Effect on the material findings and scope repair

### Finding A — unauthenticated release-notes exemption

Resolved by removing PR-body normalization and all PR-body bytes from the authorization model. There is no exempt block and therefore no delimiter-based authorization bypass.

### Finding B — authorization recheck not atomic with merge

The finding remains valid for **trust-root-authorizing establishment**. A client-side final recheck and `expected_head_sha` are not an atomic substitute for the canonical server-side trust-root gate.

For PR #160, the later scope correction is controlling: this PR grants no trust-root or Z0L execution authority. It may only canonicalize already-completed read-only Z0P evidence after the exact-head pre-merge qualification and mandatory post-merge canonicalization proof in Section 7 pass. The Phase-B atomic gate remains mandatory before trust-root establishment, not before this non-establishment evidence canonicalization.

### Finding C — authoritative review record inconsistency

Resolved by making the GitHub-authenticated `coderabbitai[bot]` issue-comment record authoritative for reviewer/run/conclusion/scope/end-SHA evidence and making exact-head `CodeRabbit=success` a consistency gate only.

### Finding D — Z0P canonicalization not gated on complete post-merge proof

Resolved by Section 7.1 below. `Z0P_CLOSED_CANONICAL=YES` is a post-merge classification and may be recorded only after the complete returned-merge/main, parent-order, tree-equality, governance-document-blob, exact-path-set, and final review/thread proof passes. A merge response or landed commit by itself is insufficient.

### Scope repair — circular dependency

Resolved by restoring the canonical atomic-gate scope. Z0P-only canonicalization and separately authorized pre-establishment ingress compatibility proofs are not trust-root establishment actions. They do not require the trust-root atomic gate to be proven first. They also do not waive that gate for the later establishment candidate.

## 7. PR #160 exact-head merge qualification

PR #160 may become eligible to leave Draft and merge **only as a Z0P-only canonicalization slice**. Green CI alone is insufficient, and a historical review from an earlier head is insufficient.

The Ready transition is two-phase. Immediately before converting the PR from Draft to Ready, live GitHub state must prove `PR_160_DRAFT=YES_REQUIRED_BEFORE_READY_TRANSITION` plus every non-draft-independent requirement below. Immediately after that transition, and again immediately before merge, live GitHub state must prove `PR_160_DRAFT=NO_REQUIRED` plus every requirement below.

```text
PR_160_STATE=OPEN_REQUIRED
PR_160_DRAFT=NO_REQUIRED_AFTER_READY_AND_BEFORE_MERGE
PR_160_BASE=main_REQUIRED
PR_160_BASE_SHA=8e366e4816efc7c1e056b3361c635bd8dd7d54a2_REQUIRED
CANONICAL_MAIN=8e366e4816efc7c1e056b3361c635bd8dd7d54a2_REQUIRED
PR_160_HEAD=EXACT_INDEPENDENTLY_REVIEWED_HEAD_REQUIRED
PR_160_TREE=EXACT_INDEPENDENTLY_REVIEWED_TREE_REQUIRED
PR_160_CHANGED_FILE_COUNT=3_REQUIRED
PR_160_DOCS_ONLY=YES_REQUIRED
PR_160_CHANGED_PATH_1=docs/planning/KODAC_KDO_H4_R4B_PHASE_B_Z0P_CANONICALIZATION_Z0L_AUTHORIZATION_2026-08-22.md_REQUIRED
PR_160_CHANGED_PATH_2=docs/planning/KODAC_KDO_H4_R4B_PHASE_B_Z0L_REVIEW_ATTESTATION_RECONCILIATION_2026-08-23.md_REQUIRED
PR_160_CHANGED_PATH_3=docs/planning/KODAC_KDO_H4_R4B_PHASE_B_PR160_SECURITY_RECONCILIATION_2026-08-23.md_REQUIRED
PR_160_CHANGED_PATH_SET_EQUALS_EXACT_THREE_PATH_SET=PASS_REQUIRED

EXACT_HEAD_GOVERNANCE=PASS_REQUIRED
EXACT_HEAD_K2_RUNTIME=PASS_REQUIRED
INDEPENDENT_EXACT_HEAD_REVIEW=PASS_REQUIRED
CODERABBIT_EXACT_HEAD_STATUS=success_REQUIRED
CURRENT_NON_OUTDATED_UNRESOLVED_MATERIAL_THREADS=0_REQUIRED
PR_160_MERGEABLE=YES_REQUIRED

PR_160_MAXIMUM_EFFECT=Z0P_CANONICAL_EVIDENCE_CLASSIFICATION_ONLY
Z0L=NOT_AUTHORIZED_REQUIRED
Z0A=NOT_AUTHORIZED_REQUIRED
Z0S=NOT_AUTHORIZED_REQUIRED
Z0R=NOT_AUTHORIZED_REQUIRED
Z0D=NOT_AUTHORIZED_REQUIRED
FOUNDER_PROCESS_AUTHORITY_TRUST_ROOT_ESTABLISHMENT=NO_REQUIRED
H4_COMPLETE=NO_REQUIRED
PROVIDER_SPEND_USD=0.00_REQUIRED
```

For avoidance of ambiguity, a Ready transition is not qualified merely because the PR is open: the post-transition read must explicitly observe `draft=false`. A merge is forbidden if the PR is still draft or if the exact changed-path set differs in any way from the three paths above.

Any head movement, base/main movement, material review finding, failed/non-terminal exact-head gate, changed-path-set mismatch, or scope broadening invalidates qualification and requires a fresh exact-head cycle.

The only permitted merge method for this candidate is a GitHub merge commit with an exact-head precondition:

```text
PR_160_MERGE_METHOD=merge_REQUIRED
MERGE_EXPECTED_HEAD_SHA=EXACT_INDEPENDENTLY_REVIEWED_HEAD_REQUIRED
SQUASH_MERGE=FORBIDDEN
REBASE_MERGE=FORBIDDEN
AUTO_MERGE=FORBIDDEN
```

The exact-head precondition is a head-movement fence for this Z0P-only merge. It is not represented as the Phase-B trust-root atomicity mechanism.

### 7.1 Mandatory post-merge canonicalization proof

Post-merge proof is **not** merge authorization and is **not** a substitute for the future trust-root atomic gate. It is mandatory before any landed PR #160 commit may be classified as canonical Z0P closure.

The exact independently reviewed candidate must bind, before merge, these immutable values from GitHub:

```text
PR_160_REVIEWED_HEAD=EXACT_40_HEX_REQUIRED
PR_160_REVIEWED_TREE=EXACT_40_HEX_REQUIRED
PR_160_REVIEWED_CHANGED_PATH_1=docs/planning/KODAC_KDO_H4_R4B_PHASE_B_Z0P_CANONICALIZATION_Z0L_AUTHORIZATION_2026-08-22.md_REQUIRED
PR_160_REVIEWED_CHANGED_PATH_2=docs/planning/KODAC_KDO_H4_R4B_PHASE_B_Z0L_REVIEW_ATTESTATION_RECONCILIATION_2026-08-23.md_REQUIRED
PR_160_REVIEWED_CHANGED_PATH_3=docs/planning/KODAC_KDO_H4_R4B_PHASE_B_PR160_SECURITY_RECONCILIATION_2026-08-23.md_REQUIRED
PR_160_REVIEWED_CHANGED_PATH_SET_EQUALS_EXACT_THREE_PATH_SET=PASS_REQUIRED
PR_160_PRIMARY_DOCUMENT_BLOB_SHA=EXACT_40_HEX_REQUIRED
PR_160_ATTESTATION_RECONCILIATION_BLOB_SHA=EXACT_40_HEX_REQUIRED
PR_160_SECURITY_RECONCILIATION_BLOB_SHA=EXACT_40_HEX_REQUIRED
PR_160_AUTHORITATIVE_REVIEW_RECORD_ID=EXACT_GITHUB_ID_REQUIRED
PR_160_AUTHORITATIVE_REVIEW_RUN_ID=EXACT_RUN_ID_REQUIRED
PR_160_AUTHORITATIVE_REVIEW_END_SHA=PR_160_REVIEWED_HEAD_REQUIRED
```

After a future qualified merge, read GitHub canonical truth again and require all of:

```text
PR_160_RETURNED_MERGE_COMMIT=EXACT_40_HEX_REQUIRED
CANONICAL_MAIN_OBSERVED=EXACT_40_HEX_REQUIRED
CANONICAL_MAIN_EQUALS_RETURNED_MERGE_COMMIT=PASS_REQUIRED

PR_160_MERGE_PARENT_COUNT=2_REQUIRED
PR_160_MERGE_PARENT_1=8e366e4816efc7c1e056b3361c635bd8dd7d54a2_REQUIRED
PR_160_MERGE_PARENT_2=PR_160_REVIEWED_HEAD_REQUIRED
PR_160_MERGE_PARENT_ORDER_MATCH=PASS_REQUIRED

PR_160_MERGE_TREE=EXACT_40_HEX_REQUIRED
PR_160_MERGE_TREE_EQUALS_REVIEWED_TREE=PASS_REQUIRED
PR_160_MERGE_CHANGED_PATH_SET_EQUALS_EXACT_THREE_PATH_SET=PASS_REQUIRED
PR_160_MERGE_CHANGED_PATH_SET_EQUALS_REVIEWED_CHANGED_PATH_SET=PASS_REQUIRED

PR_160_MERGE_PRIMARY_DOCUMENT_BLOB_EQUALS_REVIEWED_BLOB=PASS_REQUIRED
PR_160_MERGE_ATTESTATION_RECONCILIATION_BLOB_EQUALS_REVIEWED_BLOB=PASS_REQUIRED
PR_160_MERGE_SECURITY_RECONCILIATION_BLOB_EQUALS_REVIEWED_BLOB=PASS_REQUIRED

PR_160_POST_MERGE_AUTHORITATIVE_REVIEW_RECORD_STILL_MATCHES=PASS_REQUIRED
PR_160_POST_MERGE_CODERABBIT_EXACT_HEAD_STATUS_STILL_SUCCESS=PASS_REQUIRED
PR_160_POST_MERGE_CURRENT_NON_OUTDATED_UNRESOLVED_MATERIAL_THREADS=0_REQUIRED

PR_160_POST_MERGE_CANONICALIZATION_PROOF=PASS_REQUIRED
```

The three governance-document blob checks must read each path from the returned canonical merge commit and compare it with the corresponding blob SHA from the exact independently reviewed candidate. The changed-path checks must compare the canonical base-to-merge delta with both the approved three-path set and the exact reviewed base-to-head path set. Tree equality does not remove the requirement to record these explicit path-set and document-blob checks.

If **any** post-merge requirement above is missing or fails, the landed commit must not be classified as canonical Z0P closure:

```text
PR_160_POST_MERGE_CANONICALIZATION_PROOF=FAIL
Z0P_CLOSED_CANONICAL=NO
Z0L=NOT_AUTHORIZED
Z0A=NOT_AUTHORIZED
Z0S=NOT_AUTHORIZED
Z0R=NOT_AUTHORIZED
Z0D=NOT_AUTHORIZED
FOUNDER_PROCESS_AUTHORITY_TRUST_ROOT_ESTABLISHMENT=NO
H4_COMPLETE=NO
```

Only if every Section 7 pre-merge qualification requirement and every Section 7.1 post-merge proof passes may the maximum post-merge authority be recorded as:

```text
PR_160_POST_MERGE_CANONICALIZATION_PROOF=PASS
Z0P_CLOSED_CANONICAL=YES
Z0L=NOT_AUTHORIZED
Z0A=NOT_AUTHORIZED
Z0S=NOT_AUTHORIZED
Z0R=NOT_AUTHORIZED
Z0D=NOT_AUTHORIZED
FOUNDER_PROCESS_AUTHORITY_TRUST_ROOT_ESTABLISHMENT=NO
PHASE_B_SERVER_SIDE_ATOMIC_GATE=NOT_PROVEN
H4_COMPLETE=NO
PROVIDER_SPEND_USD=0.00
```

A separate later canonical Z0L authorization remains required after Z0P closure. That later Z0L authorization may authorize only its explicitly bounded local-artifact-validation scope; it does not establish the trust root or waive the server-side atomic-gate prerequisite for future trust-root establishment.

## 8. Prohibited actions remain unchanged

```text
FORCE_PUSH=NO
REBASE=NO
DESTRUCTIVE_HISTORY_REWRITE=NO
ZROK_ARCHIVE_DOWNLOAD=NO
ZROK_BINARY_EXECUTION=NO
ZROK_INSTALLATION=NO
ZROK_ACCOUNT_MUTATION=NO
PUBLIC_ENDPOINT=NO
PAYMENT_METHOD_ADDITION=NO
REAL_SECRET_ACCESS=NO
GITHUB_APP_MUTATION=NO
WEBHOOK_ACTIVATION=NO
APP_SOURCE_MUTATION=NO
FOUNDER_PROCESS_AUTHORITY_TRUST_ROOT_ESTABLISHMENT=NO
PROVIDER_SPEND_USD=0.00
H4_COMPLETE=NO
```