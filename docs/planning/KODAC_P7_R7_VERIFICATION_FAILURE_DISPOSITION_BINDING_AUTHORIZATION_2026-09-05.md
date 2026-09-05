# Kodac P7-R7 — Receipt-Backed Verification-Failure Disposition Binding Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

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

This forward-only revision repairs the material finding on the initial authorization head. No CI, review, qualification, or merge evidence from `ca237d0fcebf3e5e72e223b22bcc5909a7adef35` may be reused for this revised candidate.

This record is documentation-only. While unmerged or not post-merge proven, it creates no runtime, schema, test, lifecycle, verification-execution, K2, Done Gate, product, release, successor, or project-completion authority.

The `P7-R7` label is descriptive only. Numbering itself grants nothing.

---

## 2. Material defect in the initial candidate

The initial candidate proposed deriving `VERIFICATION_FAILED` directly from:

```text
one canonically revalidated P7-R6 binding
+ verificationReportPassed == false
```

That is insufficient.

Canonical P7-R6 consumes a caller-supplied report as data. It proves report structure, exact R5 planned-command/check correspondence, deterministic report identity, and internal pass/fail consistency. It deliberately does **not** prove that every failed check represents an authoritative external execution outcome.

Fresh live inspection of `runVerificationEngine(...)` confirms:

- a failed planned command caused by `ExecutionFailedError` carries one K2 `ExecutionReceipt` reference;
- other failures, including some base-check failures and pre-execution failures, may have no execution receipt;
- P7-R6 validates receipt evidence as bounded references and does not revalidate referenced receipt objects or ledger contents;
- canonical R6 explicitly preserves `VERIFICATION_REPORT_BOUND != VERIFICATION_FAILED`.

Therefore:

```text
FAILED_REPORT_BOOLEAN_ALONE != VERIFICATION_FAILED_LIFECYCLE_TRUTH
FAILED_BASE_CHECK_WITHOUT_EXECUTION_RECEIPT != VERIFICATION_FAILED_LIFECYCLE_TRUTH_FOR_THIS_CONTRACT
CALLER_SUPPLIED_RECEIPT_REF_ALONE != AUTHORITATIVE_EXECUTION_FAILURE
```

This revision removes that overclaim.

---

## 3. Why the repaired successor is evidence-safe and non-duplicative

Canonical P7 currently establishes:

```text
P7-R1 = immutable patch proposal
P7-R2 = pure/data-only authorization to apply one exact proposal
P7-R3 = pure/data-only exact patch / repo.apply_patch intent binding
P7-R4 = pure/data-only APPLIED evidence binding over one supplied existing successful K2 repo.apply_patch receipt
P7-R5 = pure/data-only VERIFICATION_PLAN_BOUND binding over one exact supplied verification plan
P7-R6 = pure/data-only VERIFICATION_REPORT_BOUND binding over one exact supplied verification report
```

The existing K2 `ExecutionReceipt` remains the repository's execution-outcome evidence authority. P7-R4 already demonstrates the accepted pattern: consume an existing supplied receipt as data, strictly validate its bounded structure, and require its `inputDigest` plus capability/scope/outcome to match the exact canonical predecessor intent before deriving a later P7 evidence state.

For verification commands, the current `ExecutionGateway` computes the command intent digest from the exact serialized preimage:

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

where `env` is key-sorted by the gateway before hashing.

The current verification engine materializes one planned command using:

```text
capability = verification.command.<plan-command-id>
args = exact plan args
allowedExitCodes = [0]
timeoutMs = command.timeoutMs ?? 30000
maxOutputBytes = command.maxOutputBytes ?? 524288
env = sanitized verification environment
paths = []
```

and records `ExecutionReceipt.result.status = failure` when the actual bounded command execution fails through `ExecutionFailedError`.

Therefore one **full supplied K2 failure receipt**, whose exact intent preimage is independently reconstructed and bound to one exact R5 planned command and one exact R6 failed command check, is materially stronger evidence than a report boolean or receipt reference alone.

The repaired minimum successor is one pure/data-only receipt-backed failure disposition. It does not execute verification and does not create a generic verification-execution path.

---

## 4. Conditional future implementation allowlist

Only after this authorization candidate independently qualifies, merges guarded with the exact expected head, and receives complete post-merge proof may one later implementation candidate modify exactly:

```text
packages/kodac-runtime/src/remediation/p7-verification-failure-disposition-binding.ts
schema/p7-verification-failure-disposition-binding.schema.json
packages/kodac-runtime/test/p7-r7-verification-failure-disposition-binding.test.ts
```

No fourth path is authorized.

The later implementation may import existing pure validation/types required to revalidate P7-R6, P7-R5, `ExecutionReceipt`, and confinement evidence. It may not modify P7-R1 through P7-R6 predecessors, verification planner/engine/types/Done Gate, K5, K2, ExecutionGateway, filesystem, receipt ledger, CLI, workflows, dependencies/lockfiles, accepted ADRs, current-view files, historical authorization/evidence, product, release, rulesets, provider/model configuration, persistence, telemetry, or any other path.

---

## 5. Required future contract input

The later builder/validator must take, at minimum:

```text
sourceVerificationReportBinding
sourceVerificationReportBindingInput
failedCommandId
executionIntentPreimage
executionReceipt
```

`sourceVerificationReportBindingInput` must be the exact predecessor/build input required by the canonical P7-R6 validator. The later implementation must call that canonical validator rather than trusting duplicated source fields.

`failedCommandId` selects exactly one planned command failure from the canonically validated R6 report. The implementation must reject arbitrary caller-selected checks, base checks, extra command ids, passing command checks, and command ids absent from the exact R5-bound plan.

---

## 6. Required exact source relation

The later contract may produce a disposition only when all of the following are true:

```text
validated R6 state == VERIFICATION_REPORT_BOUND
validated R6 verificationReportPassed == false
validated R6 verificationReport.passed == false
failedCommandId exists exactly once in validated R5 plan
R6 contains exactly one check id == command.<failedCommandId>
that R6 check category == exact R5 planned command category
that R6 check status == fail
that R6 check evidence contains executionReceipt.receiptId as kind == receipt
executionReceipt capability == verification.command.<failedCommandId>
executionReceipt paths == []
executionReceipt policy.decision == allow
executionReceipt result.status == failure
executionReceipt inputDigest == digest(executionIntentPreimage)
executionIntentPreimage args == exact R5 plan args
executionIntentPreimage allowedExitCodes == [0]
executionIntentPreimage timeoutMs == exact engine materialization (plan timeoutMs ?? 30000)
executionIntentPreimage maxOutputBytes == exact engine materialization (plan maxOutputBytes ?? 524288)
executionIntentPreimage env satisfies the exact sanitized verification environment shape
executionIntentPreimage resolved executable is compatible with the exact R5 semantic executable
```

A failed report with no eligible receipt-backed planned command failure is outside this contract and must be rejected.

A base-check-only failure is outside this contract and must be rejected.

A receipt reference without the complete matching receipt is outside this contract and must be rejected.

---

## 7. Required execution-intent preimage validation

The future contract must recompute the exact gateway input digest and must not trust caller-supplied `executionReceipt.inputDigest` alone.

The execution-intent preimage must contain exactly:

```text
resolvedExecutable
args
allowedExitCodes
maxOutputBytes
timeoutMs
env
```

The serialized digest preimage must match the current gateway key order exactly:

```text
{
  executable: resolvedExecutable,
  args,
  allowedExitCodes,
  maxOutputBytes,
  timeoutMs,
  env
}
```

The implementation must canonicalize `env` by ascending key order before hashing, matching `ExecutionGateway`'s `canonicalEnvironment(...)` behavior.

The permitted verification environment keys are exactly the current bounded sanitizer surface:

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

Required fixed entries:

```text
NODE_ENV = test
KODAC_VERIFICATION = 1
NO_COLOR = 1
```

No other environment key is allowed. Optional inherited keys may be absent, but when present must be bounded valid Unicode strings. The environment is evidence-bound data only; the contract does not read `process.env`.

The resolved executable must be bounded and must remain compatible with the semantic executable in the exact R5 plan:

```text
node   -> an absolute executable path whose final portable basename is node or node.exe
python -> python3 or python.exe
a cargo -> INVALID TOKEN / MUST NOT EXIST
cargo  -> cargo or cargo.exe
go     -> go or go.exe
```

The literal line `a cargo -> INVALID TOKEN / MUST NOT EXIST` is a specification sentinel: the future implementation must define only the four actual semantic executables (`node`, `python`, `cargo`, `go`) and must not admit unknown executable kinds. The implementation specification/tests may omit this sentinel wording and simply enforce the exact four-value set.

For `node`, this contract does not claim that an arbitrary same-basename path is intrinsically trusted. Authority for the actual execution outcome remains the supplied K2 `ExecutionReceipt`; the path is bound only to reproduce the exact receipt intent digest and to remain compatible with the R5 `node` command semantics.

---

## 8. Required receipt validation

The future implementation must apply fail-closed receipt validation at least as strict as the relevant P7-R4 receipt boundary for shared fields.

At minimum:

```text
receiptId = canonical UUID v4
capability = verification.command.<failedCommandId>
inputDigest = lowercase SHA-256
paths = exact empty dense array
policy = exact plain object
policy.decision = allow
policy.reason = bounded inert string
approval = absent unless canonical gateway semantics make it possible and the exact approval binding can be independently validated
confinement = absent or strictly validated through existing validateReceiptConfinementBinding and bound to inputDigest
startedAt / completedAt = canonical bounded timestamps
completedAt >= startedAt
result = exact failure-result object
result.status = failure
result.error = bounded inert string
```

Unknown receipt/result/policy/approval/confinement fields, proxies, accessors, symbols, custom prototypes, sparse arrays, cycles, aliases, invalid Unicode, invalid timestamps/digests/UUIDs, and resource-bound overflow must fail closed.

The future contract must derive a deterministic `executionReceiptIdentity` from the complete normalized receipt evidence and bind it into the disposition identity.

---

## 9. Required disposition output

The future output may establish only:

```text
STATE = VERIFICATION_FAILED
```

with meaning restricted to:

> one exact canonically revalidated P7-R6 lineage contains one exact planned-command failed check that references one full supplied K2 execution receipt whose capability, failure outcome, exact command intent digest, and source relation are independently revalidated by this contract.

The output must bind at least:

```text
version
dispositionIdentity
state = VERIFICATION_FAILED
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
failedCheckEvidence projection
executionReceiptIdentity
executionReceiptId
executionInputDigest
executionStartedAt
executionCompletedAt
executionFailureError
```

Exact field names may differ, but no authority-relevant field may be omitted from the deterministic identity preimage.

Returned data must be detached and deeply immutable.

---

## 10. Explicit exclusions from the failure state

The future implementation must reject:

```text
passing R6 reports
base-check-only failed reports
failed planned-command checks with no receipt evidence
receipt reference without full matching receipt
receipt result.status != failure
receipt capability for any other command or capability
receipt inputDigest not reproduced by the exact execution-intent preimage
execution-intent args/limits not equal to exact R5/engine materialization
environment outside the sanitized verification key set
caller-added or caller-removed source failure evidence
caller-injected lifecycle/completion/execution authority fields
```

Required non-equivalences:

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

A failure disposition describes one receipt-proven failed verification command in the exact remediation lineage. It grants no follow-up action.

---

## 11. Separation from K5 and Done Gate

K5-R2 remains authoritative for generic source linkage. K5 package judgment/reconciliation remain authoritative for their bounded proof-review states. P7-R7 must not replace or mutate them.

Preserve:

```text
K5_SUFFICIENT_PACKAGE != PROVEN_READY
K5_VALID_RECONCILIATION != PROVEN_READY
K5_EVIDENCE != P7_EXECUTION_AUTHORITY
```

The future P7-R7 contract must not import, invoke, wrap, mutate, or replace `DoneGate`. It must not create or claim `PROVEN_READY` or `NOT_READY`.

Done Gate authority remains unchanged.

---

## 12. Required adversarial qualification

The later implementation tests must cover at least:

```text
valid failed planned command + exact failure receipt -> deterministic VERIFICATION_FAILED
passing R6 -> reject
base-check-only failed R6 -> reject
failed planned command without receipt ref -> reject
receipt ref without full receipt -> reject
receiptId mismatch -> reject
capability mismatch -> reject
failure receipt for different planned command -> reject
result success / blocked instead of failure -> reject
inputDigest mismatch -> reject
args drift -> reject
timeout/max-output drift -> reject
allowedExitCodes drift -> reject
unsafe/unknown environment key -> reject
fixed verification env value drift -> reject
resolved executable incompatible with R5 semantic executable -> reject
R6/source/predecessor tampering -> reject
caller cannot inject VERIFIED / FIXED / REVERIFIED / Done Gate / completion claims
identity binds every semantic field
identity deterministic across benign caller object insertion order
mutation-after-call cannot affect result
nested output deeply frozen
unknown fields rejected
Proxy/accessor/custom-prototype/symbol/sparse/cycle/hostile graphs rejected
schema/runtime/test semantic agreement
production source contains no verification-engine / planner / K2 / DoneGate / filesystem / Git / process / network / provider / persistence execution surface
```

Focused tests and all repository-required CI must be terminal success on one unchanged exact implementation head.

---

## 13. Qualification gate for this authorization candidate

Do not merge this authorization record unless one unchanged exact head proves:

```text
BASE == CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P7_R7_VERIFICATION_FAILURE_DISPOSITION_BINDING_AUTHORIZATION_2026-09-05.md
INITIAL_HEAD_ca237d0fcebf3e5e72e223b22bcc5909a7adef35 = NOT_QUALIFIED
REQUIRED_CI = TERMINAL_SUCCESS_OR_CANONICALLY_PROVEN_DOCS_ONLY_NON_APPLICABILITY
INTERNAL_SUBSTANTIVE_SEMANTIC_SECURITY_INSPECTION = CLEAN
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
RULESET_20707483 = ACTIVE / SATISFIED / NO_BYPASS
WAIVER = NO
```

Any head/base/blob movement invalidates prior qualification.

Merge must use a normal guarded PR merge with the exact qualified `expected_head_sha`. No direct write to `main`, force push, rebase, stale qualification reuse, or ruleset bypass is authorized.

---

## 14. Mandatory post-merge proof

This authorization creates future three-path implementation authority only after post-merge proof verifies at minimum:

```text
MERGE_COMMIT
ORDERED_PARENTS
MERGE_TREE
QUALIFIED_HEAD_TREE_EQUALITY
AUTHORIZATION_BLOB_EQUALITY
MERGE_SIGNATURE_VALID
POST_MERGE_REQUIRED_CHECKS OR TRUTHFUL CANONICAL NON_APPLICABILITY
PR_CLOSED_MERGED
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
RULESET_20707483 = ACTIVE / NO_BYPASS
```

Only after that proof may the exact three implementation paths in section 4 become authorized.

---

## 15. Explicit non-grants

This authorization candidate does not authorize:

```text
IMPLEMENTATION_BEFORE_AUTHORIZATION_POST_PROOF
VERIFICATION_FAILED_FROM_REPORT_BOOLEAN_ALONE
VERIFICATION_FAILED_FROM_BASE_CHECK_FAILURE_ALONE
PASS_TO_VERIFIED_PROMOTION
VERIFIED_STATE
FIXED_STATE
REVERIFIED_STATE
PROVEN_READY
DONE_GATE_INVOCATION_OR_MUTATION
VERIFICATION_PLANNER_INVOCATION
VERIFICATION_ENGINE_INVOCATION
VERIFICATION_EXECUTION
VERIFICATION_REPORT_CREATION
PATCH_APPLICATION
PATCH_RETRY
NEW_PATCH_PROPOSAL
AUTOFIX
K2_INVOCATION
K2_APPROVAL_CREATION
FILESYSTEM_OR_GIT_WRITE
PROCESS_EXECUTION
NETWORK_ACCESS
SECRET_ACCESS
PROVIDER_MODEL_INVOCATION
K5_AUTHORITY_MUTATION
P8_P9_IMPLEMENTATION
PRODUCT_INTEGRATION
PUBLIC_RELEASE_OR_PACKAGE_PUBLICATION
PROJECT_COMPLETION
RULESET_CHANGE_OR_BYPASS
NEW_DEPENDENCY_OR_DONOR_ADMISSION
PERSISTENCE_DATABASE_TELEMETRY_UPLOAD_LEARNING
```

After a future P7-R7 implementation itself becomes closed canonical, fresh repository-truth analysis is required before any current-view reconciliation or successor work. No successor follows from numbering or from the existence of a failed disposition.