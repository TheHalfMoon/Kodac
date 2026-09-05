# Kodac P7-R7 — Receipt-Backed Verification-Failure Disposition Binding Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis and superseded candidate

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 3f89133d923e7aa716a3d7fedba71ccb6070caf0
CANONICAL_TREE_AT_CANDIDATE_START = d241e8120fa4bee2803c003365f2f1ae827329d4
P7_R6_POST_REPAIR_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #378 / proof 5554468185
P7_R7_SUCCESSOR_ANALYSIS = PR #378 / comment 5554700232 / ANALYSIS_ONLY
INITIAL_AUTHORIZATION_HEAD = ca237d0fcebf3e5e72e223b22bcc5909a7adef35 / NOT_QUALIFIED
INITIAL_HEAD_FINDING = PR #379 / comment 5554726827 / MATERIAL_EVIDENCE_OVERCLAIM
P7_R6_STATE = VERIFICATION_REPORT_BOUND_ONLY
P7_R7_PLUS = NOT_AUTHORIZED_BY_NUMBERING
P7_OVERALL = NOT_CLOSED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The initial head `ca237d0fcebf3e5e72e223b22bcc5909a7adef35` is permanently superseded and not qualified. It incorrectly allowed `VERIFICATION_FAILED` to be derived from a failed caller-supplied R6 report without authoritative command-execution failure evidence. No CI, review, or qualification from that head may be reused.

This authorization remains documentation-only and creates no implementation authority until its own exact final head independently qualifies, merges guarded, and receives complete post-merge proof.

---

## 2. Evidence boundary discovered by substantive review

Canonical P7-R6 proves one exact supplied verification report is structurally and semantically bound to the P7-R5 plan lineage. It explicitly preserves:

```text
VERIFICATION_REPORT_BOUND != VERIFICATION_FAILED
VERIFICATION_REPORT_BOUND != VERIFIED
REPORT.passed != VERIFIED_REMEDIATION
REPORT.passed != DONE_GATE
```

Live `runVerificationEngine(...)` proves why those distinctions matter:

- some failed checks are produced without any K2 execution receipt;
- a failed planned command carries receipt evidence only when `ExecutionGateway.runCommand(...)` produces an `ExecutionFailedError` receipt;
- R6 validates receipt evidence references but does not revalidate the referenced receipt object or ledger content;
- therefore a failed report boolean or bare receipt reference is insufficient for canonical `VERIFICATION_FAILED` lifecycle truth.

The future R7 contract may establish `VERIFICATION_FAILED` only from one exact **receipt-backed planned verification command failure** whose complete K2 execution receipt and exact command-intent preimage are independently revalidated against the R5/R6 lineage.

Base-check-only failure, report-only failure, and receipt-reference-only failure remain outside the contract.

---

## 3. Accepted repository pattern

P7-R4 already establishes the accepted evidence pattern for an existing K2 receipt:

```text
supplied existing K2 ExecutionReceipt
+ strict receipt normalization
+ exact capability / policy / outcome validation
+ exact inputDigest linkage to canonical predecessor intent
-> later pure/data-only P7 evidence state
```

R7 must follow the same trust shape rather than treating an R6 boolean as execution evidence.

For generic `ExecutionGateway.runCommand(...)`, the current command input digest is:

```text
sha256(JSON.stringify({
  executable,
  args,
  allowedExitCodes,
  maxOutputBytes,
  timeoutMs,
  env
}))
```

The gateway sorts environment keys before hashing.

For a command actually materialized by the current verification engine:

```text
capability = verification.command.<command.id>
paths = []
policy.decision = allow
approval = absent
confinement = absent
args = exact R5 command args
allowedExitCodes = [0]
timeoutMs = command.timeoutMs ?? 30000
maxOutputBytes = command.maxOutputBytes ?? 524288
env = sanitizedVerificationEnv()
```

A failed eligible command produces:

```text
ExecutionReceipt.result.status = failure
```

and the R6 failed `command.<id>` check references that receipt id as evidence kind `receipt`.

---

## 4. Conditional future implementation allowlist

Only after this authorization becomes closed canonical may one later implementation candidate modify exactly:

```text
packages/kodac-runtime/src/remediation/p7-verification-failure-disposition-binding.ts
schema/p7-verification-failure-disposition-binding.schema.json
packages/kodac-runtime/test/p7-r7-verification-failure-disposition-binding.test.ts
```

No fourth path is authorized.

No predecessor P7 source, verification planner/engine/type, Done Gate, K5, K2, ExecutionGateway, ledger, CLI, workflow, dependency, lockfile, ADR, current-view, product, release, persistence, provider/model, ruleset, or historical evidence path may be modified by the later implementation.

---

## 5. Required future build input

The later contract must take at minimum:

```text
sourceVerificationReportBinding
sourceVerificationReportBindingInput
failedCommandId
executionIntentPreimage
executionReceipt
```

The canonical P7-R6 validator must be called with the exact predecessor/build input required to reconstruct the R6 record. Duplicated caller claims about R6 identities, report status, plan contents, or lineage are not authoritative.

`failedCommandId` must identify exactly one command in the canonically revalidated R5-bound plan and exactly one R6 check `command.<failedCommandId>`.

---

## 6. Exact eligibility gate

All of these conditions are mandatory:

```text
validated R6 state == VERIFICATION_REPORT_BOUND
validated R6 verificationReportPassed == false
validated R6 verificationReport.passed == false
failedCommandId exists exactly once in validated R5 plan
R6 contains exactly one check id == command.<failedCommandId>
R6 failed-command check category == exact R5 command category
R6 failed-command check status == fail
R6 failed-command check evidence contains executionReceipt.receiptId as kind == receipt
executionReceipt.receiptId = canonical UUID v4
executionReceipt.capability == verification.command.<failedCommandId>
executionReceipt.paths == exact empty dense array
executionReceipt.policy.decision == allow
executionReceipt.approval == absent
executionReceipt.confinement == absent
executionReceipt.result.status == failure
executionReceipt.inputDigest == recomputed digest of exact executionIntentPreimage
executionIntentPreimage args == exact R5 plan args
executionIntentPreimage allowedExitCodes == [0]
executionIntentPreimage timeoutMs == (R5 command timeoutMs ?? 30000)
executionIntentPreimage maxOutputBytes == (R5 command maxOutputBytes ?? 524288)
executionIntentPreimage env == valid current verification sanitizer shape
executionIntentPreimage resolvedExecutable compatible with exact R5 semantic executable
```

Any missing condition fails closed.

A report with no receipt-backed failed planned command is not eligible even when `verificationReportPassed == false`.

---

## 7. Execution-intent preimage

The future `executionIntentPreimage` must contain exactly:

```text
resolvedExecutable
args
allowedExitCodes
maxOutputBytes
timeoutMs
env
```

The digest serialization must reproduce the current gateway key order exactly:

```text
JSON.stringify({
  executable: resolvedExecutable,
  args,
  allowedExitCodes,
  maxOutputBytes,
  timeoutMs,
  env: canonicalKeySortedEnvironment
})
```

then SHA-256 over the UTF-8 serialization.

The permitted environment keys are exactly:

```text
NODE_ENV
KODAC_VERIFICATION
NO_COLOR
PATH
Path
SYSTEMROOT
SystemRoot
HOME
USERPROFILE
TMP
TEMP
TMPDIR
```

Required fixed values:

```text
NODE_ENV = "test"
KODAC_VERIFICATION = "1"
NO_COLOR = "1"
```

Every other listed key is optional caller-materialized execution evidence. If present, its value must be a bounded valid-Unicode string. No unlisted environment key is allowed. The contract must not read live `process.env`; it validates supplied historical execution-intent evidence only.

The semantic executable set is exactly:

```text
node
python
cargo
go
```

Compatibility with the current verification resolver is bounded as follows:

```text
node   -> absolute path with portable basename node or node.exe
python -> python3 or python.exe
cargo  -> cargo or cargo.exe
go     -> go or go.exe
```

For `node`, the actual execution-outcome authority remains the K2 receipt; the path constraint prevents an unrelated semantic executable label but does not claim independent artifact trust beyond the receipt evidence.

---

## 8. Receipt normalization requirements

The future implementation must validate the complete supplied receipt at least as strictly as the shared P7-R4 receipt boundary where fields overlap.

Required exact receipt surface for this current generic verification-command path:

```text
receiptId
capability
inputDigest
paths
policy
startedAt
completedAt
result
```

`approval` and `confinement` are not part of the current eligible verification-command receipt and must be rejected if present.

Required semantics:

```text
receiptId = UUID v4
capability = verification.command.<failedCommandId>
inputDigest = lowercase SHA-256
paths = []
policy.decision = allow
policy.reason = bounded valid-Unicode string
startedAt / completedAt = canonical timestamps
completedAt >= startedAt
result = exact { status: "failure", error: <bounded string> }
```

Unknown fields, symbols, accessors, proxies, custom prototypes, sparse arrays, cycles, aliases, invalid Unicode, invalid timestamps/digests/UUIDs, non-JSON values, and resource-bound overflow must fail closed.

The normalized receipt must receive a deterministic `executionReceiptIdentity` that is bound into the final disposition identity.

---

## 9. Output and identity boundary

The future contract may establish only:

```text
STATE = VERIFICATION_FAILED
```

with this exact bounded meaning:

> One exact canonically revalidated P7-R6 lineage contains one exact failed planned verification-command check whose referenced complete K2 failure receipt has been independently revalidated against the exact R5 command and the exact gateway command-intent digest preimage.

The output identity must bind, directly or via the exact validated predecessor identity, at least:

```text
version
state
sourceVerificationReportBindingIdentity
proposalIdentity
authorizationIdentity
intentBindingIdentity
appliedEvidenceIdentity
verificationPlanBindingIdentity
repositoryIdentity
canonicalBase
targetHead
postStateDigest
verificationPlanDigest
verificationReportIdentity
verificationSessionId
failedCommandId
failedCommandCategory
failedCheckSummary
failedCheckEvidence
executionReceiptIdentity
executionReceiptId
executionInputDigest
executionStartedAt
executionCompletedAt
executionFailureError
dispositionIdentity
```

The implementation must use one explicit deterministic serialization rule for the non-identity preimage and test every semantic field for identity sensitivity. Returned output must be detached from caller mutation and deeply immutable.

---

## 10. Explicit rejection cases

The later implementation must reject at least:

```text
passing R6 report
base-check-only failed R6 report
failed planned command without receipt evidence
bare receipt ref without complete receipt
receiptId not referenced by selected failed command check
receiptId/capability mismatch
receipt for another command
receipt result success or blocked
receipt policy decision other than allow
receipt approval present
receipt confinement present
inputDigest mismatch
args drift
allowedExitCodes drift
timeout drift
maxOutputBytes drift
unsafe or unknown env key
fixed verification env value drift
resolved executable incompatible with R5 executable kind
R6 or predecessor/build-input tamper
caller-injected failed check not present in source
caller-injected VERIFIED/FIXED/REVERIFIED/Done Gate/PROVEN_READY/execution/retry/completion fields
```

---

## 11. Required non-equivalences and non-grants

```text
VERIFICATION_FAILED != VERIFICATION_ENGINE_INVOCATION
VERIFICATION_FAILED != VERIFICATION_EXECUTION_AUTHORITY
VERIFICATION_FAILED != K2_INVOCATION
VERIFICATION_FAILED != K2_APPROVAL
VERIFICATION_FAILED != VERIFIED
VERIFICATION_FAILED != FIXED
VERIFICATION_FAILED != REVERIFIED
VERIFICATION_FAILED != DONE_GATE
VERIFICATION_FAILED != PROVEN_READY
VERIFICATION_FAILED != AUTOFIX
VERIFICATION_FAILED != PATCH_RETRY_AUTHORITY
VERIFICATION_FAILED != NEW_PATCH_PROPOSAL_AUTHORITY
VERIFICATION_FAILED != P7_OVERALL_CLOSED
VERIFICATION_FAILED != P8_AUTHORITY
VERIFICATION_FAILED != PROJECT_COMPLETION
P7_R7_CLOSED != P7_R8_PLUS_AUTHORITY
P7_R7_CLOSED != VERIFIED_AUTHORITY
```

The failure disposition grants no follow-up action, side effect, retry, re-planning, re-execution, K2 use, patch proposal, autofix, verification engine invocation, Done Gate transition, product work, or release work.

K5-R2 remains authoritative for generic source linkage. K5 proof-package/judgment/reconciliation authority is unchanged. Done Gate remains the only accepted `PROVEN_READY / NOT_READY` authority.

---

## 12. Required adversarial qualification

The later implementation tests must cover at least:

```text
valid receipt-backed failed planned command -> deterministic VERIFICATION_FAILED
passing R6 -> reject
base-check-only failure -> reject
failed planned command without receipt -> reject
bare receipt ref -> reject
receiptId/capability/command mismatch -> reject
result success/blocked -> reject
policy non-allow -> reject
approval/confinement presence -> reject
inputDigest mismatch -> reject
args/limits/env/resolved-executable drift -> reject
R6/predecessor tamper -> reject
caller cannot inject source failures or lifecycle claims
identity binds every semantic field
identity stable across benign object insertion order where semantics are unchanged
mutation-after-call cannot affect result
nested output deeply frozen
unknown/hostile object graph rejected
schema/runtime/test agreement
production source contains no planner/verification-engine/K2/DoneGate/filesystem/Git/process/network/provider/persistence execution surface
```

Focused tests and all repository-required CI must pass on one unchanged exact implementation head.

---

## 13. Qualification gate for this authorization

This authorization may merge only when one unchanged exact head proves:

```text
BASE == CURRENT_CANONICAL_MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
EXACT_PATH = docs/planning/KODAC_P7_R7_VERIFICATION_FAILURE_DISPOSITION_BINDING_AUTHORIZATION_2026-09-05.md
SUPERSEDED_INITIAL_HEAD = ca237d0fcebf3e5e72e223b22bcc5909a7adef35 / NOT_QUALIFIED
REQUIRED_CI = TERMINAL_SUCCESS_OR_CANONICALLY_PROVEN_DOCS_ONLY_NON_APPLICABILITY
INTERNAL_SUBSTANTIVE_SEMANTIC_SECURITY_INSPECTION = CLEAN
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
RULESET_20707483 = ACTIVE / SATISFIED / NO_BYPASS
WAIVER = NO
```

Any head/base/blob movement invalidates prior qualification. Merge must use normal guarded PR merge with the exact qualified `expected_head_sha`. No direct write to `main`, force push, rebase, stale evidence reuse, or ruleset bypass is authorized.

---

## 14. Mandatory post-merge proof

The exact three-path implementation authority in section 4 becomes active only after post-merge proof verifies:

```text
PR_CLOSED_MERGED
MERGE_COMMIT
ORDERED_PARENTS
MERGE_TREE
QUALIFIED_HEAD_TREE_EQUALITY
AUTHORIZATION_BLOB_EQUALITY
MERGE_SIGNATURE_VALID
POST_MERGE_REQUIRED_CHECKS OR TRUTHFUL CANONICAL NON_APPLICABILITY
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
RULESET_20707483 = ACTIVE / NO_BYPASS
WAIVER = NO
```

---

## 15. Explicit non-grants

```text
IMPLEMENTATION_BEFORE_AUTHORIZATION_POST_PROOF = NO
VERIFICATION_FAILED_FROM_REPORT_BOOLEAN_ALONE = NO
VERIFICATION_FAILED_FROM_BASE_CHECK_FAILURE_ALONE = NO
PASS_TO_VERIFIED_PROMOTION = NO
VERIFIED_STATE = NO
FIXED_STATE = NO
REVERIFIED_STATE = NO
PROVEN_READY = NO
DONE_GATE_INVOCATION_OR_MUTATION = NO
VERIFICATION_PLANNER_INVOCATION = NO
VERIFICATION_ENGINE_INVOCATION = NO
VERIFICATION_EXECUTION = NO
VERIFICATION_REPORT_CREATION = NO
PATCH_APPLICATION = NO
PATCH_RETRY = NO
NEW_PATCH_PROPOSAL = NO
AUTOFIX = NO
K2_INVOCATION = NO
K2_APPROVAL_CREATION = NO
FILESYSTEM_OR_GIT_WRITE = NO
PROCESS_EXECUTION = NO
NETWORK_ACCESS = NO
SECRET_ACCESS = NO
PROVIDER_MODEL_INVOCATION = NO
K5_AUTHORITY_MUTATION = NO
P8_P9_IMPLEMENTATION = NO
PRODUCT_INTEGRATION = NO
PUBLIC_RELEASE_OR_PACKAGE_PUBLICATION = NO
PROJECT_COMPLETION = NOT_ESTABLISHED
RULESET_CHANGE_OR_BYPASS = NO
NEW_DEPENDENCY_OR_DONOR_ADMISSION = NO
PERSISTENCE_DATABASE_TELEMETRY_UPLOAD_LEARNING = NO
```

After a future R7 implementation itself becomes closed canonical, fresh repository-truth analysis is required before any current-view reconciliation or successor work. No successor follows from numbering or from the existence of a failed disposition.