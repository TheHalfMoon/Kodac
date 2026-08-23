# KODAC KDO H4-R4B Phase-B — PR #160 Post-Merge Contradiction Repair

Date: 2026-08-23  
Status: **REPAIR CANDIDATE — DOCS ONLY — FAIL CLOSED — NO Z0L EXECUTION AUTHORITY**  
Repository: `TheHalfMoon/Kodac`

## 1. Purpose

Repair the current canonical interpretation after three high-severity, non-outdated review findings were added to merged PR #160 after its canonical merge. The findings identify contradictory normative language that remains in the two earlier PR #160 governance documents even though the later canonical security reconciliation expressly supersedes that language.

This repair creates one deterministic post-merge governance projection. It does **not** execute Z0L, download or execute zrok, install zrok, create or mutate a zrok account/environment/share, create a public endpoint, add a payment method, access a real secret, mutate a GitHub App, activate a webhook, mutate app source, establish the founder process-authority trust root, or establish H4 completion.

```text
PROVIDER_SPEND_USD=0.00
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
H4_COMPLETE=NO
```

## 2. Exact canonical baseline

At creation of this repair candidate, live GitHub canonical truth is:

```text
CANONICAL_MAIN=58dec3de7ad9ba61877e0319010ae76a3d36f00d
CANONICAL_TREE=1f03f9133dd87443eb39d9d47b5f98c7f1308eb7
PR_160=MERGED_CANONICAL
PR_160_REVIEWED_HEAD=781dface0c0fee001a2eaa6cce721b953ea6daa6
PR_160_REVIEWED_TREE=1f03f9133dd87443eb39d9d47b5f98c7f1308eb7
PR_160_MERGE_COMMIT=58dec3de7ad9ba61877e0319010ae76a3d36f00d
PR_160_MERGE_PARENT_1=8e366e4816efc7c1e056b3361c635bd8dd7d54a2
PR_160_MERGE_PARENT_2=781dface0c0fee001a2eaa6cce721b953ea6daa6
PR_160_MERGE_TREE=1f03f9133dd87443eb39d9d47b5f98c7f1308eb7
PR_160_MERGE_VERIFICATION=valid
```

The three canonical PR #160 governance blobs remain:

```text
PR_160_PRIMARY_DOCUMENT_BLOB=f553ca9c8636a21ae227bec56d08aa20236f3db6
PR_160_ATTESTATION_RECONCILIATION_BLOB=19a530cad8eb078dee3b26aed3c3f62d62727b9d
PR_160_SECURITY_RECONCILIATION_BLOB=0481f036f2b67e7ddc2e1498610d8cab46a9ea38
```

The security reconciliation is the later controlling PR #160 text where either earlier document conflicts with it.

## 3. Current post-merge review drift

After PR #160 merged, three high-severity Qodo review threads became current, non-outdated, and unresolved:

```text
QODO_THREAD_1=PRRT_kwDOTVTeS86bcfxN
QODO_THREAD_1_FINDING=PR_BODY_GATE_CONTRADICTS_CONTROLLING_MODEL

QODO_THREAD_2=PRRT_kwDOTVTeS86bcfxR
QODO_THREAD_2_FINDING=OLDER_DOCUMENTS_STILL_EXPRESS_POST_MERGE_Z0L_AUTHORITY

QODO_THREAD_3=PRRT_kwDOTVTeS86bcfxT
QODO_THREAD_3_FINDING=COMMIT_STATUS_AUTHORITY_CONTRADICTS_CONTROLLING_RECONCILIATION
```

These findings do not grant authority and must not be ignored merely because PR #160 is already merged. Until this contradiction is canonically repaired and independently qualified, no later Z0L authorization may rely on the contradictory clauses.

```text
POST_MERGE_MATERIAL_GOVERNANCE_AMBIGUITY=OPEN
Z0L=NOT_AUTHORIZED
NEXT_Z0L_AUTHORIZATION_CANDIDATE=BLOCKED_ON_THIS_REPAIR
```

## 4. Single controlling projection for PR #160

This section makes explicit the only permitted current interpretation of the three PR #160 governance documents. It does not create new authority; it restates the later security reconciliation as a deterministic projection and marks the conflicting older clauses non-operative.

### 4.1 PR-body authority

For PR #160 and every later authorization that cites PR #160 as a predecessor:

```text
PR_BODY_AUTHORIZATION_AUTHORITY=NO
PR_BODY_DIGEST_AUTHORIZATION_GATE=NOT_USED
PR_BODY_NORMALIZATION_AUTHORIZATION_GATE=NOT_USED
CODERABBIT_RELEASE_NOTES_AUTHORIZATION_EXCEPTION=NOT_USED
PR_BODY_EDIT_AFTER_FINAL_REVIEW_AS_PR160_AUTHORIZATION_GATE=SUPERSEDED_NOT_USED
PR_BODY_NORMALIZED_DIGEST_MATCH_AS_PR160_AUTHORIZATION_GATE=SUPERSEDED_NOT_USED
```

Therefore the PR-body normalization and frozen-digest rules in the earlier attestation reconciliation are historical repair history only. They are not cumulative authorization requirements and may not be reintroduced through transitive references from the primary document.

### 4.2 Independent-review authority

For PR #160, the GitHub-authenticated `coderabbitai[bot]` issue-comment record is authoritative for reviewer identity, review run, repository/PR scope, terminal conclusion, and exact review-range end SHA.

```text
INDEPENDENT_REVIEW_PROVIDER=CodeRabbit
AUTHORITATIVE_REVIEW_RECORD_TYPE=GITHUB_ISSUE_COMMENT
AUTHORITATIVE_REVIEW_RECORD_AUTHOR_LOGIN=coderabbitai[bot]
AUTHORITATIVE_REVIEW_RECORD_AUTHOR_ID=136622811
AUTHORITATIVE_REVIEW_RECORD_REPOSITORY=TheHalfMoon/Kodac
AUTHORITATIVE_REVIEW_RECORD_PR=160
AUTHORITATIVE_REVIEW_RECORD_END_SHA=EXACT_REVIEWED_HEAD_REQUIRED
AUTHORITATIVE_REVIEW_RECORD_RESULT=NO_ACTIONABLE_COMMENTS_REQUIRED
AUTHORITATIVE_REVIEW_RECORD_RUN_ID=EXACT_RUN_ID_REQUIRED
```

The exact-head commit status remains mandatory only as a consistency gate:

```text
CODERABBIT_COMMIT_STATUS_CONTEXT=CodeRabbit
CODERABBIT_COMMIT_STATUS_STATE=success_REQUIRED_ON_EXACT_REVIEWED_HEAD
CODERABBIT_COMMIT_STATUS_ROLE=CONSISTENCY_GATE_ONLY
```

The following earlier primary-document concepts are non-operative for PR #160 and must not be required by any later consumer:

```text
COMMIT_STATUS_AS_AUTHORIZATION_BEARING_REVIEW_IDENTITY=SUPERSEDED
STATUS_PUBLISHER_IDENTITY_AS_REVIEW_AUTHORITY=SUPERSEDED
STATUS_PUBLISHER_AUTHENTICATION_AS_REVIEW_AUTHORITY=SUPERSEDED
STATUS_TIMESTAMP_AS_REVIEW_RUN_IDENTITY=SUPERSEDED
STATUS_TO_FINAL_RUN_BINDING_AS_REVIEW_AUTHORITY=SUPERSEDED
```

Any disagreement between the authenticated issue-comment record and the exact-head status fails closed.

### 4.3 Z0L authority

Every older PR #160 clause that says or implies that merging PR #160 authorizes Z0L is non-operative.

This includes, without limitation, older primary-document or attestation-reconciliation clauses equivalent to:

```text
Z0L=AUTHORIZED_TO_EXECUTE_LOCAL_ARTIFACT_VALIDATION_ONLY
```

when they derive that state from PR #160's merge or post-merge proof.

For PR #160 the controlling state is exactly:

```text
PR_160_MAXIMUM_EFFECT=Z0P_CANONICAL_EVIDENCE_CLASSIFICATION_ONLY
PR_160_Z0L_EXECUTION_AUTHORITY=NONE
PR_160_Z0L_ACQUISITION_AUTHORITY=NONE
PR_160_Z0L_EXTRACTION_AUTHORITY=NONE
PR_160_TRUST_ROOT_AUTHORITY=NONE
PR_160_H4_CLOSURE_AUTHORITY=NONE

Z0P_EVIDENCE=PASS
Z0P_CLOSED_CANONICAL=YES
Z0L=NOT_AUTHORIZED
Z0A=NOT_AUTHORIZED
Z0S=NOT_AUTHORIZED
Z0R=NOT_AUTHORIZED
Z0D=NOT_AUTHORIZED
```

The detailed Z0L acquisition, archive-confinement, safe-extraction, evidence, and fail-closed mechanics recorded by the earlier primary document remain design material that a **future separate exact-head Z0L authorization** may adopt. They are not executable authority from PR #160.

## 5. Atomic-gate scope remains unchanged

This repair must not recreate the circular dependency already removed by the PR #160 security reconciliation.

```text
PHASE_B_SERVER_SIDE_ATOMIC_GATE_AUTHORIZATION=CANONICAL
PHASE_B_SERVER_SIDE_ATOMIC_GATE=NOT_PROVEN
PHASE_B_ATOMIC_GATE_REQUIRED_BEFORE_TRUST_ROOT_ESTABLISHMENT=YES
PHASE_B_ATOMIC_GATE_REQUIRED_BEFORE_H4_TRUST_ROOT_AUTHORITY=YES
PHASE_B_ATOMIC_GATE_REQUIRED_FOR_THIS_DOCS_ONLY_REPAIR=NO
PHASE_B_ATOMIC_GATE_REQUIRED_FOR_SEPARATELY_AUTHORIZED_PRE_ESTABLISHMENT_INGRESS_PROOFS=NO
FOUNDER_PROCESS_AUTHORITY_TRUST_ROOT_ESTABLISHMENT=NO
```

The server-side atomic gate remains mandatory before founder process-authority trust-root establishment. It is not a universal prerequisite for a docs-only ambiguity repair or for a separately authorized pre-establishment local-artifact proof.

## 6. Future separate Z0L authorization predecessor contract

Only after this repair is independently reviewed on its exact head, merged canonically, and post-merge proven may a new Z0L authorization candidate be created or qualified.

That future Z0L authorization must be a separate governance candidate and must, at minimum:

```text
PREDECESSOR_PR160_CANONICAL_MERGE=58dec3de7ad9ba61877e0319010ae76a3d36f00d_REQUIRED
PREDECESSOR_PR160_SECURITY_RECONCILIATION_BLOB=0481f036f2b67e7ddc2e1498610d8cab46a9ea38_REQUIRED
PREDECESSOR_POST_MERGE_CONTRADICTION_REPAIR=CANONICAL_REQUIRED
Z0P_CLOSED_CANONICAL=YES_REQUIRED
Z0L_AUTHORIZATION_SCOPE=LOCAL_ARTIFACT_VALIDATION_ONLY
Z0A=NOT_AUTHORIZED_REQUIRED
Z0S=NOT_AUTHORIZED_REQUIRED
Z0R=NOT_AUTHORIZED_REQUIRED
Z0D=NOT_AUTHORIZED_REQUIRED
FOUNDER_PROCESS_AUTHORITY_TRUST_ROOT_ESTABLISHMENT=NO_REQUIRED
H4_COMPLETE=NO_REQUIRED
PROVIDER_SPEND_USD=0.00_REQUIRED
```

It must preserve the previously designed Z0L safety surface: exact canonical-authorization rechecks, fresh disposable directories, fresh upstream identity verification, immutable asset-ID acquisition only, exact size/SHA-256 verification, archive-header inspection without executing zrok, strict path/member/link/special-file/collision rejection, exact regular-file allowlisting, safe no-follow/no-overwrite extraction, containment verification, extracted-binary hashing, optional non-executing Authenticode-state recording, redacted evidence, and STOP.

The future authorization must not authorize zrok execution, `--version`, installation, PATH/registry/service/autostart mutation, account/environment/share/public-endpoint creation, payment, real-secret access, GitHub App mutation, webhook activation, app-source mutation, trust-root establishment, or H4 completion.

## 7. Qualification gate for this repair candidate

This repair candidate is docs-only and must change exactly one path:

```text
REPAIR_CHANGED_FILE_COUNT=1_REQUIRED
REPAIR_DOCS_ONLY=YES_REQUIRED
REPAIR_CHANGED_PATH=docs/planning/KODAC_KDO_H4_R4B_PHASE_B_PR160_POST_MERGE_CONTRADICTION_REPAIR_2026-08-23.md_REQUIRED
REPAIR_CHANGED_PATH_SET_EQUALS_EXACT_SINGLE_PATH=PASS_REQUIRED
```

The Ready transition is intentionally two-phase because the repository's CodeRabbit configuration may skip review while a PR remains Draft. Ready status itself carries no merge authority.

### 7.1 Phase A — Draft-to-Ready preflight

Immediately before converting Draft to Ready, live GitHub truth must prove:

```text
REPAIR_PR_STATE=OPEN_REQUIRED
REPAIR_PR_DRAFT=YES_REQUIRED_BEFORE_READY_TRANSITION
REPAIR_PR_BASE=main_REQUIRED
REPAIR_PR_BASE_SHA=58dec3de7ad9ba61877e0319010ae76a3d36f00d_REQUIRED
CANONICAL_MAIN=58dec3de7ad9ba61877e0319010ae76a3d36f00d_REQUIRED
REPAIR_PR_HEAD=EXACT_CURRENT_CANDIDATE_HEAD_REQUIRED
REPAIR_PR_TREE=EXACT_CURRENT_CANDIDATE_TREE_REQUIRED
REPAIR_DOCUMENT_BLOB=EXACT_CURRENT_CANDIDATE_BLOB_REQUIRED
REPAIR_CHANGED_PATH_SET_EQUALS_EXACT_SINGLE_PATH=PASS_REQUIRED
EXACT_HEAD_GOVERNANCE=PASS_REQUIRED
EXACT_HEAD_K2_RUNTIME=PASS_REQUIRED
REPAIR_PR_MERGEABLE=YES_REQUIRED
Z0L=NOT_AUTHORIZED_REQUIRED
```

Independent review is **not** a prerequisite for the Draft-to-Ready transition. Immediately after the transition, the PR must be re-read and must explicitly show `draft=false`; only then may the final independent-review cycle be requested.

### 7.2 Phase B — post-Ready exact-head review and merge qualification

After Ready and before merge, live GitHub truth must prove all of:

```text
REPAIR_PR_STATE=OPEN_REQUIRED
REPAIR_PR_DRAFT=NO_REQUIRED_AFTER_READY_AND_BEFORE_MERGE
REPAIR_PR_BASE=main_REQUIRED
REPAIR_PR_BASE_SHA=58dec3de7ad9ba61877e0319010ae76a3d36f00d_REQUIRED
CANONICAL_MAIN=58dec3de7ad9ba61877e0319010ae76a3d36f00d_REQUIRED
REPAIR_PR_HEAD=EXACT_INDEPENDENTLY_REVIEWED_HEAD_REQUIRED
REPAIR_PR_TREE=EXACT_INDEPENDENTLY_REVIEWED_TREE_REQUIRED
REPAIR_DOCUMENT_BLOB=EXACT_INDEPENDENTLY_REVIEWED_BLOB_REQUIRED
REPAIR_CHANGED_PATH_SET_EQUALS_EXACT_SINGLE_PATH=PASS_REQUIRED
EXACT_HEAD_GOVERNANCE=PASS_REQUIRED
EXACT_HEAD_K2_RUNTIME=PASS_REQUIRED
INDEPENDENT_EXACT_HEAD_REVIEW=PASS_REQUIRED
CODERABBIT_EXACT_HEAD_STATUS=success_REQUIRED
CURRENT_NON_OUTDATED_UNRESOLVED_MATERIAL_THREADS_ON_REPAIR_PR=0_REQUIRED
REPAIR_PR_MERGEABLE=YES_REQUIRED
Z0L=NOT_AUTHORIZED_REQUIRED
```

The independent review model for this repair is the same model selected by the PR #160 security reconciliation: GitHub-authenticated `coderabbitai[bot]` issue-comment evidence is authoritative for review identity/run/result/end-SHA, while exact-head `CodeRabbit=success` is a consistency gate only. PR-body bytes are not authorization authority.

Any head movement after the final review invalidates that review. Any head movement, main/base drift, path-set change, failed or non-terminal repository gate, material review finding, unresolved current material review thread, missing/mismatched authoritative review record, or status/review disagreement invalidates merge qualification and requires a fresh exact-head cycle. If a repair commit is needed after review, qualification returns to fail-closed state; no force-push, rebase, or destructive history rewriting is permitted.

## 8. Merge and mandatory post-merge proof

Only GitHub merge-commit semantics are permitted for this repair:

```text
REPAIR_MERGE_METHOD=merge_REQUIRED
SQUASH_MERGE=FORBIDDEN
REBASE_MERGE=FORBIDDEN
AUTO_MERGE=FORBIDDEN
MERGE_EXPECTED_HEAD_SHA=EXACT_INDEPENDENTLY_REVIEWED_HEAD_REQUIRED
```

After a qualified merge, read canonical GitHub truth again and require:

```text
CANONICAL_MAIN_EQUALS_RETURNED_REPAIR_MERGE_COMMIT=PASS_REQUIRED
REPAIR_MERGE_PARENT_COUNT=2_REQUIRED
REPAIR_MERGE_PARENT_1=58dec3de7ad9ba61877e0319010ae76a3d36f00d_REQUIRED
REPAIR_MERGE_PARENT_2=EXACT_INDEPENDENTLY_REVIEWED_HEAD_REQUIRED
REPAIR_MERGE_PARENT_ORDER_MATCH=PASS_REQUIRED
REPAIR_MERGE_TREE_EQUALS_REVIEWED_TREE=PASS_REQUIRED
REPAIR_MERGE_DOCUMENT_BLOB_EQUALS_REVIEWED_BLOB=PASS_REQUIRED
REPAIR_MERGE_CHANGED_PATH_SET_EQUALS_EXACT_SINGLE_PATH=PASS_REQUIRED
REPAIR_POST_MERGE_REVIEW_RECORD_STILL_MATCHES=PASS_REQUIRED
REPAIR_POST_MERGE_CODERABBIT_STATUS_STILL_SUCCESS=PASS_REQUIRED
REPAIR_POST_MERGE_CURRENT_NON_OUTDATED_UNRESOLVED_MATERIAL_THREADS=0_REQUIRED
REPAIR_POST_MERGE_CANONICALIZATION_PROOF=PASS_REQUIRED
```

If any post-merge requirement fails, this repair is not canonical and no separate Z0L authorization may proceed from it.

## 9. Maximum effect

The maximum effect of a fully qualified and canonically proven merge of this repair is:

```text
PR160_POST_MERGE_CONTRADICTION_REPAIR=CANONICAL
POST_MERGE_MATERIAL_GOVERNANCE_AMBIGUITY=CLOSED_BY_CANONICAL_PROJECTION
Z0P_EVIDENCE=PASS
Z0P_CLOSED_CANONICAL=YES
Z0L=NOT_AUTHORIZED
Z0A=NOT_AUTHORIZED
Z0S=NOT_AUTHORIZED
Z0R=NOT_AUTHORIZED
Z0D=NOT_AUTHORIZED
PHASE_B_SERVER_SIDE_ATOMIC_GATE=NOT_PROVEN
FOUNDER_PROCESS_AUTHORITY_TRUST_ROOT_ESTABLISHMENT=NO
H4_COMPLETE=NO
PROVIDER_SPEND_USD=0.00
```

A later separately reviewed and canonically merged Z0L authorization remains required before any zrok archive byte may be acquired. This repair itself performs no Z0L action.