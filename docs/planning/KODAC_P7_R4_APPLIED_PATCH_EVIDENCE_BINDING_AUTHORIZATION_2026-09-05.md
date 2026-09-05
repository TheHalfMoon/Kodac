# Kodac P7-R4 — Applied Patch Evidence Binding Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 0713d1f17d65f6dd8be0408f017c053021b575f5
P7_R3_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #363 / proof 5553345846
P7_R4_SUCCESSOR_ANALYSIS = PR #363 / comment 5553366154 / ANALYSIS_ONLY
P7_OVERALL = NOT_CLOSED
WAIVER = NO
```

This record is documentation-only. While unmerged or unproven it creates no runtime, patch-application, K2, filesystem/Git, verification, lifecycle, product, release, successor, or project-completion authority.

---

## 2. Why P7-R4 is the minimum non-duplicative successor

Canonical P7 currently separates:

```text
P7-R1 = PROPOSED immutable patch identity and exact canonical change projection
P7-R2 = AUTHORIZED_TO_APPLY pure/data-only decision bound to exact P7-R1
P7-R3 = pure/data-only pre-execution binding to exact inert patch bytes and repo.apply_patch intent
```

K2 already owns side-effect execution and existing `ExecutionGateway.applyPatch` already produces one `ExecutionReceipt` containing execution facts such as:

```text
capability
inputDigest
paths
policy decision
optional K2 approval/confinement evidence
result.status
affected.added / affected.modified / affected.deleted
postStateDigest
```

Existing verification code consumes execution receipts generically but does not bind a successful `repo.apply_patch` mutation receipt back to the exact P7 R1 -> R2 -> R3 lineage.

Therefore P7-R4 must **not** implement another executor, policy engine, approval mechanism, receipt ledger, patch parser, patch applier, verification runner, or K2 wrapper. The minimum missing mechanism is one pure/data-only evidence contract for an already-existing successful K2 patch receipt.

---

## 3. Conditional implementation allowlist

Only after this authorization candidate itself qualifies on one unchanged exact head, merges using the guarded expected-head precondition, and receives complete post-merge proof may one later P7-R4 implementation candidate modify exactly these three paths:

```text
packages/kodac-runtime/src/remediation/p7-applied-patch-evidence-binding.ts
schema/p7-applied-patch-evidence-binding.schema.json
packages/kodac-runtime/test/p7-r4-applied-patch-evidence-binding.test.ts
```

No fourth path is authorized.

The later implementation may import existing pure validation/data contracts as needed, including P7 R1/R2/R3 types and existing execution-receipt types/validators, but it may not modify those predecessor files or any K2, verification, receipt-ledger, workflow, dependency, product, or release surface.

---

## 4. Required bounded semantics

The P7-R4 implementation must remain pure/data-only and deterministic. Its purpose is to derive one immutable content-addressed `APPLIED` evidence binding from an exact validated predecessor chain plus one strictly validated successful existing patch-execution receipt.

Minimum required relation:

```text
VALID EXACT P7-R1 PROPOSAL
+ VALID MATCHING P7-R2 AUTHORIZATION
+ VALID MATCHING P7-R3 PRE-EXECUTION BINDING
+ ONE STRICTLY VALIDATED EXISTING EXECUTION RECEIPT
+ RECEIPT.capability == repo.apply_patch
+ RECEIPT.result.status == success
+ RECEIPT.policy.decision == allow
+ RECEIPT.inputDigest == P7-R3.inputDigest
+ RECEIPT.paths == P7-R3.paths
+ RECEIPT affected ADD/MODIFY/DELETE projection == P7-R3.operations
+ RECEIPT.postStateDigest = VALID LOWERCASE SHA-256
-> DETERMINISTIC CONTENT-ADDRESSED DETACHED/FROZEN APPLIED EVIDENCE BINDING
```

The later contract must preserve exact predecessor identities in its canonical identity preimage, including at least:

```text
proposalIdentity
authorizationIdentity
P7-R3 bindingIdentity
repositoryIdentity
canonicalBase
targetHead
patchArtifactDigest
inputDigest
```

It must also bind normalized execution evidence sufficient to distinguish one application fact from another, including at least:

```text
execution receipt identifier or deterministic receipt evidence identity
capability
policy decision
paths
affected operation projection
postStateDigest
```

Exact field naming is an implementation detail, but source lineage and execution-fact equality are mandatory.

---

## 5. Receipt validation requirements

P7-R4 may not trust a TypeScript type assertion or arbitrary caller object as execution truth.

The implementation must fail closed on hostile or malformed receipt input, including where applicable:

```text
Proxy objects
accessor properties
symbol fields
custom prototypes
sparse or extra array properties
unknown lifecycle/authority fields
invalid SHA-256 values
invalid or missing receipt identity
non-allow policy decisions
blocked/failure result states
missing or malformed affected sets
path expansion / reduction / substitution
operation mismatch
input-digest mismatch
invalid postStateDigest
```

The normalized receipt evidence projection must be detached from caller mutation and deeply immutable in the returned P7-R4 record.

Any optional current K2 receipt substructure that is accepted must be validated rather than blindly copied. The contract must not invent K2 approval, confinement, or receipt provenance that the supplied evidence does not actually contain.

---

## 6. Required state boundary

P7-R4 may establish only:

```text
STATE = APPLIED
```

This means only that a supplied, strictly validated successful K2 `repo.apply_patch` execution receipt matches the exact P7 R1/R2/R3 patch lineage and execution projection.

It does not establish semantic correctness, remediation verification, finding closure, or completion.

Required non-equivalences:

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

## 7. Side-effect and authority non-grants

This authorization candidate and the conditional implementation it may later authorize grant none of the following:

```text
PATCH_APPLICATION = NOT_AUTHORIZED
K2_INVOCATION = NOT_AUTHORIZED
K2_APPROVAL_CREATION = NOT_AUTHORIZED
K2_AUTHORITY_EXPANSION = NONE
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
VERIFICATION_EXECUTION = NOT_AUTHORIZED
VERIFICATION_FAILED_VERIFIED = NOT_ESTABLISHED
FIXED_REVERIFIED_DONE_GATE = NOT_ESTABLISHED
P7_R5_PLUS = NOT_AUTHORIZED_BY_NUMBERING
P8_P9_IMPLEMENTATION = NOT_AUTHORIZED
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
NEW_DEPENDENCY_DONOR_ADMISSION = NONE
PERSISTENCE_DATABASE_TELEMETRY_UPLOAD_LEARNING = NOT_AUTHORIZED
CLI_API_PACKAGE_ROOT_PRODUCT_INTEGRATION = NOT_AUTHORIZED
PUBLIC_RELEASE_PACKAGE_PUBLICATION_DEPLOYMENT = NOT_AUTHORIZED
RULESET_CHANGE_BYPASS = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

In particular:

```text
P7_R2_AUTHORIZED_TO_APPLY != K2_APPROVAL
P7_R3_PRE_EXECUTION_BINDING != K2_INVOCATION
P7_R4_APPLIED_EVIDENCE != AUTHORITY_TO_EXECUTE
```

---

## 8. Implementation quality requirements

The later three-path implementation must include tests that cover at least:

```text
happy-path deterministic APPLIED evidence construction and validation
canonical identity stability
exact R1/R2/R3 lineage binding
receipt inputDigest mismatch rejection
receipt path expansion/reduction/reordering rejection
receipt affected operation mismatch rejection
blocked/failure receipt rejection
non-allow policy rejection
postStateDigest validation
receipt scalar tampering rejection
output identity tampering rejection
unknown-field rejection
hostile Proxy/accessor/custom-prototype rejection
caller mutation isolation / deep immutability
schema/runtime boundary agreement
absence of K2 invocation, applyHunks, filesystem, process, network, ledger-write, or verification-execution surfaces
```

No test may simulate successful side effects and then claim actual runtime execution evidence. Fixture receipt data is contract-test data only.

---

## 9. Qualification gate for this authorization candidate

Do not merge this authorization record unless one unchanged exact head proves:

```text
BASE == CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P7_R4_APPLIED_PATCH_EVIDENCE_BINDING_AUTHORIZATION_2026-09-05.md
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

Any head/base/blob movement invalidates exact-head qualification evidence.

---

## 10. After this authorization becomes canonical

The only newly authorized implementation action is the exact three-path pure/data-only P7-R4 candidate listed above.

That later candidate must independently qualify, merge guarded, and receive complete post-merge proof before P7-R4 can be called closed canonical.

Only after P7-R4 closure and required current-view reconciliation may fresh successor-authority analysis determine whether a separately authorized verification-state mechanism is independently necessary and non-duplicative.

No P7-R5, verification execution, K2 invocation, autofix, finding closure, Done Gate, P8/P9 implementation, product/release work, or project completion follows from this record by numbering or composition.
