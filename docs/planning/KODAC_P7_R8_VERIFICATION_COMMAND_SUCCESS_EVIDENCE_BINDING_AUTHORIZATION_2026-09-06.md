# Kodac P7-R8 — Verification Command Success Evidence Binding Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-06  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 1e31760fdadb3d9249080bac7963223053a098bb
P7_R7_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #383 / proof 5555153084
P7_R8_SUCCESSOR_ANALYSIS = PR #383 / comment 5555171313 / ANALYSIS_ONLY
P7_R6_STATE = VERIFICATION_REPORT_BOUND_ONLY
P7_R7_STATE = VERIFICATION_FAILED / BOUNDED_RECEIPT_BACKED_ONLY
P7_R8_PLUS = NOT_AUTHORIZED_BY_NUMBERING
P7_OVERALL = NOT_CLOSED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The canonical Trust and Verification v2 plan names `VERIFICATION_FAILED` and `VERIFIED` as distinct future P7 lifecycle states, but explicitly remains planning-only and does not authorize this or any other P7 successor by numbering.

This authorization is documentation-only and creates no implementation authority until its own exact final head independently qualifies, merges guarded, and receives complete post-merge proof.

---

## 2. Why `VERIFIED` is not yet justified

Canonical P7-R6 requires the supplied verification report to contain every required base check and every exact planned command check, and it requires:

```text
verificationReport.passed == conjunction(all check statuses)
```

However R6 binds a supplied report. It does not independently revalidate the complete underlying event, workspace, ledger, or receipt objects referenced by every passing base check.

Canonical P7-R7 already demonstrates the correct evidence discipline: `VERIFICATION_FAILED` is not derived from the R6 boolean alone; one exact failed planned command becomes failure truth only after its complete K2 failure receipt and exact generic-gateway command-intent preimage are independently revalidated.

A symmetric direct promotion from `R6.passed == true` to `VERIFIED` would therefore overclaim. Even complete success receipts for every planned verification command do not independently prove:

```text
agent.completed evidence
workspace.integrity evidence
git.diff evidence completeness
evidence.receipts ledger completeness
evidence.policy ledger completeness
Done Gate / PROVEN_READY
finding-specific regression completeness
negative-case completeness
static/security re-run completeness
exact-head re-review completeness
ProofGraph reconciliation
```

The minimum non-overclaiming successor must close only the planned-command success-evidence gap.

---

## 3. Bounded future state

The later implementation may establish only:

```text
STATE = VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND
```

Exact meaning:

> One exact canonically revalidated passing P7-R6 report contains every exact P7-R5 planned verification-command check in passing state, and every exact planned command is independently bound to one complete matching K2 success receipt whose generic-gateway execution-intent preimage is independently reconstructed and validated.

This state means only that all exact planned verification commands have receipt-backed success evidence under the bounded current command-execution contract.

It does **not** establish `VERIFIED` remediation or complete verification-report evidence provenance.

---

## 4. Conditional future implementation allowlist

Only after this authorization becomes closed canonical may one later implementation candidate modify exactly:

```text
packages/kodac-runtime/src/remediation/p7-verification-command-success-evidence-binding.ts
schema/p7-verification-command-success-evidence-binding.schema.json
packages/kodac-runtime/test/p7-r8-verification-command-success-evidence-binding.test.ts
```

No fourth path is authorized.

No P7 predecessor source, R7 source/schema/test, verification planner/engine/type, Done Gate, K5, K2, ExecutionGateway, ledger, CLI, workflow, dependency, lockfile, ADR, current-view, product, release, persistence, provider/model, ruleset, or historical evidence path may be modified by the later implementation.

---

## 5. Required future build input

The future build input must contain exactly:

```text
sourceVerificationReportBinding
sourceVerificationReportBindingInput
commandExecutionEvidence
```

`commandExecutionEvidence` must be one dense bounded array containing exactly one entry for every exact P7-R5 planned command and no extra entry.

Each entry must contain exactly:

```text
commandId
executionIntentPreimage
executionReceipt
```

The canonical P7-R6 validator must be called with the exact predecessor/build input required to reconstruct the supplied R6 binding. The canonical P7-R5 validator must be reached through that predecessor validation rather than trusting duplicated caller claims.

---

## 6. Required global eligibility gate

All of these conditions are mandatory:

```text
validated R6 state == VERIFICATION_REPORT_BOUND
validated R6 verificationReportPassed == true
validated R6 verificationReport.passed == true
all validated R6 checks == pass
exact P7-R5 plan contains >= 1 command
exact P7-R5 plan contains >= 1 tests-category command
commandExecutionEvidence length == exact P7-R5 command count
commandExecutionEvidence command ids are unique
commandExecutionEvidence command-id set == exact P7-R5 command-id set
no missing planned command
no extra command
no duplicate command
all supplied executionReceipt.receiptId values are unique
```

Any missing condition fails closed.

`R6.passed == true` is necessary but not sufficient by itself.

---

## 7. Required per-command report linkage

For each exact P7-R5 planned command `command`:

```text
exactly one R6 check id == command.<command.id>
R6 command check category == exact command.category
R6 command check status == pass
R6 command check contains supplied executionReceipt.receiptId as evidence kind == receipt
```

The future contract should require the current engine-compatible bounded shape for the selected command check:

```text
at least one receipt evidence reference
no duplicate evidence reference
selected supplied receipt id referenced exactly once
```

A receipt referenced only by another command, aggregate check, or unrelated evidence object is insufficient.

---

## 8. Execution-intent preimage

The execution-intent preimage for each command must contain exactly:

```text
resolvedExecutable
args
allowedExitCodes
maxOutputBytes
timeoutMs
env
```

The digest serialization must reproduce the current generic `ExecutionGateway.runCommand(...)` key order exactly:

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

then SHA-256 over UTF-8 bytes.

Required exact command linkage:

```text
args == exact R5 command args
allowedExitCodes == [0]
timeoutMs == (R5 command timeoutMs ?? 30000)
maxOutputBytes == (R5 command maxOutputBytes ?? 524288)
```

The contract must validate historical environment evidence only and must not read live `process.env`.

Permitted environment keys are exactly:

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

All other listed keys are optional historical values. No unlisted environment key is allowed.

The semantic executable set is exactly:

```text
node
python
cargo
go
```

Current resolver compatibility remains:

```text
node   -> absolute path with portable basename node or node.exe
python -> python3 or python.exe
cargo  -> cargo or cargo.exe
go     -> go or go.exe
```

---

## 9. Complete K2 success-receipt boundary

Each supplied execution receipt must be validated as a hostile object graph and contain exactly the current eligible generic verification-command receipt surface:

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

`approval` and `confinement` must be absent for this current verification-command path.

Required semantics:

```text
receiptId = canonical UUID v4
capability == verification.command.<commandId>
inputDigest = lowercase SHA-256 and equals reconstructed intent digest
paths == exact empty dense array
policy.decision == allow
policy.reason = bounded valid-Unicode string
startedAt / completedAt = canonical timestamps
completedAt >= startedAt
receipt interval is contained by exact R6 report interval
result.status == success
result.exitCode == 0
result.outputDigest = lowercase SHA-256
result.outputBytes = bounded non-negative safe integer
```

A receipt with mutation-result fields (`affected`, `postStateDigest`), `blocked`, `failure`, nonzero exit code, approval, confinement, extra fields, unknown fields, invalid Unicode, invalid timestamp, invalid digest/UUID, unsafe number, proxy, custom prototype, accessor, symbol, sparse array, alias, cycle, or excessive resource shape must fail closed.

Every normalized receipt must receive a deterministic `executionReceiptIdentity` bound into the final evidence identity.

---

## 10. Deterministic output boundary

The future output must bind directly or through the exact validated predecessor identity at least:

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
verificationStartedAt
verificationCompletedAt
commandCount
testCommandCount
commands[]
  commandId
  commandCategory
  checkSummary
  checkEvidence
  executionReceiptIdentity
  executionReceiptId
  executionInputDigest
  executionResolvedExecutable
  executionEnvironmentDigest
  executionTimeoutMs
  executionMaxOutputBytes
  executionStartedAt
  executionCompletedAt
  executionOutputDigest
  executionOutputBytes
  executionExitCode
evidenceIdentity
```

Commands must be represented in one deterministic canonical order independent of caller array insertion order, preferably exact canonical P7-R5 plan order or an explicitly specified canonical command-id ordering. The implementation must choose one rule and test it.

Every semantic field must be identity-sensitive. Returned output must be detached from caller mutation and deeply immutable.

---

## 11. Explicit rejection cases

The later implementation must reject at least:

```text
R6 report passed == false
any failed R6 check
empty command plan
no tests-category command
missing command evidence entry
extra command evidence entry
duplicate command id
duplicate receipt id
command check missing
command check not pass
command category drift
selected receipt id absent from exact command check receipt evidence
receipt capability mismatch
receipt result failure or blocked
receipt result success with nonzero exit code
receipt mutation-result shape
receipt policy decision other than allow
receipt approval present
receipt confinement present
receipt paths non-empty
inputDigest mismatch
args drift
allowedExitCodes drift
timeout drift
maxOutputBytes drift
unknown or unsafe environment key
fixed verification environment value drift
resolved executable incompatible with R5 executable kind
receipt time outside R6 report interval
R6 / R5 predecessor tamper
caller-injected VERIFIED/FIXED/REVERIFIED/DoneGate/PROVEN_READY/completion fields
```

---

## 12. Required non-equivalences

```text
R6_PASSED_BOOLEAN != VERIFIED
R6_PASSED_BOOLEAN != VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND
ALL_COMMAND_CHECKS_PASS_WITHOUT_RECEIPT_REVALIDATION != VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND
ALL_PLANNED_COMMAND_SUCCESS_RECEIPTS != VERIFIED
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != COMPLETE_REPORT_EVIDENCE_PROOF
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != AGENT_COMPLETION_PROOF
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != WORKSPACE_INTEGRITY_PROOF
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != GIT_DIFF_SEMANTIC_PROOF
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != LEDGER_COMPLETENESS_PROOF
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != VERIFICATION_ENGINE_INVOCATION
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != VERIFICATION_EXECUTION_AUTHORITY
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != K2_INVOCATION
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != K2_APPROVAL
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != VERIFIED
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != FIXED
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != REVERIFIED
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != DONE_GATE
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != PROVEN_READY
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != AUTOFIX
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != PATCH_RETRY_AUTHORITY
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND != NEW_PATCH_PROPOSAL_AUTHORITY
P7_R8_CLOSED != P7_R9_PLUS_AUTHORITY
P7_R8_CLOSED != P7_OVERALL_CLOSED
P7_R8_CLOSED != P8_AUTHORITY
P7_R8_CLOSED != PROJECT_COMPLETION
```

---

## 13. Required adversarial qualification

The later implementation tests must cover at least:

```text
valid passing R6 + one exact success receipt/preimage per exact planned command -> deterministic state
caller evidence array order does not alter semantics or identity
passing R6 without complete command receipt evidence -> reject
failed R6 -> reject
missing/extra/duplicate command -> reject
duplicate receipt id -> reject
wrong command check/category/status -> reject
receipt not referenced by exact command check -> reject
receipt capability/command mismatch -> reject
result failure/blocked/nonzero success -> reject
mutation receipt shape -> reject
policy non-allow -> reject
approval/confinement presence -> reject
paths non-empty -> reject
inputDigest mismatch -> reject
args/limits/env/resolved-executable drift -> reject
receipt interval outside report -> reject
R6/R5/predecessor tamper -> reject
identity binds every semantic field
mutation-after-call cannot affect result
nested output deeply frozen
unknown/hostile object graph rejected
schema/runtime/test agreement
production source contains no planner/verification-engine/K2/DoneGate/filesystem/Git/process/network/provider/persistence execution surface
```

Focused tests and all repository-required CI must pass on one unchanged exact implementation head.

---

## 14. Qualification gate for this authorization

This authorization may merge only when one unchanged exact head proves:

```text
BASE == CURRENT_CANONICAL_MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
EXACT_PATH = docs/planning/KODAC_P7_R8_VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BINDING_AUTHORIZATION_2026-09-06.md
REQUIRED_CI = TERMINAL_SUCCESS_OR_CANONICALLY_PROVEN_DOCS_ONLY_NON_APPLICABILITY
INTERNAL_SUBSTANTIVE_SEMANTIC_SECURITY_GOVERNANCE_INSPECTION = CLEAN
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
RULESET_20707483 = ACTIVE / SATISFIED / NO_BYPASS
WAIVER = NO
```

Any head/base/blob movement invalidates prior qualification. Merge must use normal guarded PR merge with exact qualified `expected_head_sha`. No direct write to `main`, force push, rebase, stale evidence reuse, or ruleset bypass is authorized.

---

## 15. Mandatory post-merge proof

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

## 16. After implementation closure

After a later exact three-path implementation independently qualifies, merges guarded, and receives complete post-merge proof:

1. run fresh repository-truth analysis;
2. determine whether current views need separate reconciliation authorization;
3. determine the next evidence gap toward `VERIFIED` without inferring P7-R9+ by numbering;
4. do not treat command-success evidence as complete verification, finding closure, Done Gate, or product completion.

---

## 17. Explicit non-grants

```text
IMPLEMENTATION_BEFORE_AUTHORIZATION_POST_PROOF = NO
VERIFIED_STATE = NO
FIXED_STATE = NO
REVERIFIED_STATE = NO
PROVEN_READY = NO
DONE_GATE_INVOCATION_OR_MUTATION = NO
COMPLETE_REPORT_EVIDENCE_PROOF = NO
AGENT_COMPLETION_PROOF = NO
WORKSPACE_INTEGRITY_PROOF = NO
LEDGER_COMPLETENESS_PROOF = NO
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
WAIVER = NO
```
