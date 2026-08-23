# KODAC KDO H4-R4B Phase-B — PR #160 Security Reconciliation

Date: 2026-08-23  
Status: **SECURITY RECONCILIATION — DOCS ONLY — FAIL CLOSED**  
Repository: `TheHalfMoon/Kodac`  
Pull request: `#160`

## 1. Purpose and precedence

This document is the later controlling governance text for PR #160 where either of the two earlier PR #160 documents conflicts with this reconciliation:

- `KODAC_KDO_H4_R4B_PHASE_B_Z0P_CANONICALIZATION_Z0L_AUTHORIZATION_2026-08-22.md`
- `KODAC_KDO_H4_R4B_PHASE_B_Z0L_REVIEW_ATTESTATION_RECONCILIATION_2026-08-23.md`

It resolves the three material findings from the full CodeRabbit review ending at head `7aad6df549a10d1321eb37cdda28748eb6c970fb` without broadening authority.

This reconciliation does **not** execute Z0L, download or execute zrok, mutate a zrok account/environment/share, create a public endpoint, add a payment method, access real secrets, mutate a GitHub App, activate a webhook, mutate app source, or establish H4 completion.

```text
PROVIDER_SPEND_USD=0.00
H4_COMPLETE=NO
```

If any earlier PR #160 clause can be read to authorize Ready, merge, Z0L execution, or a weaker review/body/atomicity rule contrary to this document, that earlier clause is superseded for PR #160 and must not be used as authority.

## 2. Z0P and Z0L state after this reconciliation

The completed read-only Z0P evidence remains valid evidence and remains bound to the exact digests and upstream identities already recorded by the primary PR #160 document.

This reconciliation **withdraws the proposed post-merge Z0L authorization** from PR #160. PR #160 is now a Z0P canonicalization candidate only; it does not itself authorize Z0L.

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

A later Z0L authorization requires a separate canonical authorization after the server-side atomic gate is proven or an independently reviewed equivalent atomic mechanism is proven.

## 3. Canonical server-side atomic-gate state

Canonical main at the time this reconciliation is authored is:

```text
CANONICAL_MAIN=8e366e4816efc7c1e056b3361c635bd8dd7d54a2
CANONICAL_TREE=6b7c75796af0140b195e19c557f0dda29f52edd4
```

Canonical main contains:

`docs/planning/KODAC_KDO_H4_R4B_PHASE_B_SERVER_SIDE_ATOMIC_GATE_AUTHORIZATION_2026-08-22.md`

That canonical document authorizes the server-side architecture and later separately qualified implementation/configuration slices, but explicitly does **not** prove the gate.

The controlling state for PR #160 is therefore:

```text
PHASE_B_SERVER_SIDE_ATOMIC_GATE_AUTHORIZATION=CANONICAL
PHASE_B_SERVER_SIDE_ATOMIC_GATE=NOT_PROVEN
```

The connected merge wrapper's `expected_head_sha` / REST merge `sha` head precondition protects the PR head identity only. It does not atomically bind canonical-base continuity, review-record state, review-thread state, or other mutable authorization inputs to merge.

Accordingly:

```text
EXPECTED_HEAD_SHA_ALONE_IS_ATOMIC_AUTHORIZATION=NO
CLIENT_SIDE_FINAL_RECHECK_PLUS_MERGE_IS_ATOMIC_AUTHORIZATION=NO
POST_MERGE_PROOF_IS_AUTHORIZATION=NO
POST_MERGE_PROOF_ROLE=DETECTION_ONLY
PR_160_MERGE_AUTHORITY=NOT_AUTHORIZED
READY=NO
MERGE=NO
```

No Ready or merge transition for PR #160 is authorized while `PHASE_B_SERVER_SIDE_ATOMIC_GATE=NOT_PROVEN` unless a separately canonical, independently reviewed equivalent compare-and-swap mechanism proves atomic binding for all merge-critical authorization inputs.

After such a mechanism becomes canonical-proven, PR #160 must still receive a fresh exact-head independent review under that proven mechanism before any Ready or merge decision. A historical clean review performed before atomic-gate proof is not merge authority.

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

## 6. Effect on the three Major findings at head 7aad6df5

### Finding A — unauthenticated release-notes exemption

Resolved by removing PR-body normalization and all PR-body bytes from the authorization model. There is no exempt block and therefore no delimiter-based authorization bypass.

### Finding B — authorization recheck not atomic with merge

Resolved fail closed, not by claiming a client-side substitute. The canonical server-side atomic gate remains `NOT_PROVEN`, so PR #160 has `READY=NO` and `MERGE=NO`. The post-merge proof remains detection only.

### Finding C — authoritative review record inconsistency

Resolved by making the GitHub-authenticated `coderabbitai[bot]` issue-comment record authoritative for reviewer/run/conclusion/scope/end-SHA evidence and making exact-head `CodeRabbit=success` a consistency gate only.

## 7. Future transition requirements

PR #160 may not move to Ready or merge merely because CI and a fresh CodeRabbit review pass. Those are necessary quality gates but not sufficient merge authorization while the atomic gate is unproven.

The earliest future state transition requires all of:

```text
PHASE_B_SERVER_SIDE_ATOMIC_GATE=PROVEN_CANONICAL
OR_EQUIVALENT_ATOMIC_AUTHORIZATION_MECHANISM=PROVEN_CANONICAL
PR_160_EXACT_HEAD_REVIEW=FRESH_PASS_AFTER_ATOMIC_PROOF
PR_160_EXACT_HEAD_CI=PASS
CURRENT_NON_OUTDATED_UNRESOLVED_MATERIAL_THREADS=0
CANONICAL_MAIN_CONTINUITY=PASS
READY_DECISION=SEPARATELY_REQUALIFIED
MERGE_DECISION=SEPARATELY_REQUALIFIED
```

Even after PR #160 is eventually merged under a proven atomic mechanism, its maximum authority is:

```text
Z0P=CLOSED_CANONICAL
Z0L=NOT_AUTHORIZED
Z0A=NOT_AUTHORIZED
Z0S=NOT_AUTHORIZED
Z0R=NOT_AUTHORIZED
Z0D=NOT_AUTHORIZED
H4_COMPLETE=NO
PROVIDER_SPEND_USD=0.00
```

A separate later canonical Z0L authorization must explicitly bind the then-current proven atomic gate and the exact Z0L scope before any archive acquisition or local artifact validation may occur.

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
PROVIDER_SPEND_USD=0.00
H4_COMPLETE=NO
```
