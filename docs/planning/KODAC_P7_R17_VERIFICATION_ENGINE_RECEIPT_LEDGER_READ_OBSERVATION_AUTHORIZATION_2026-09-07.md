# Kodac P7-R17 — Verification-Engine Receipt-Ledger Read Observation Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY_UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-07  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = bf13945b45ca58c93bfb4e601282167c22874dba
P7_R16_RECEIPT_LEDGER_FILE_READ_EVIDENCE_BINDING_AUTHORIZATION = CLOSED_CANONICAL / PR #416 / proof 5562117957
P7_R16_RECEIPT_LEDGER_FILE_READ_EVIDENCE_BINDING_IMPLEMENTATION = CLOSED_CANONICAL / PR #417 / proof 5562275168
P7_R16_STATE = RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY
P7_R16_CURRENT_VIEW_RECONCILIATION_AUTHORIZATION = CLOSED_CANONICAL / PR #418 / proof 5562358271
P7_R16_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #419 / proof 5562430859
POST_R16_SUCCESSOR_ANALYSIS = PR #419 / comment 5562467805 / ANALYSIS_ONLY
P7_OVERALL = NOT_CLOSED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The descriptive `P7-R17` label grants no authority by numbering. This document is the only candidate authority record for the bounded unit below. No implementation authority exists until this exact authorization independently qualifies, merges guarded, and receives complete mandatory post-merge proof.

---

## 2. Live-code gap

At candidate start, the canonical runtime has three ledger-dependent verification checks:

```text
receiptsVerifier()
-> readReceiptLedger(context.receiptPath)

policyVerifier()
-> readReceiptLedger(context.receiptPath)

commandAggregateVerifier()
-> readReceiptLedger(context.receiptPath)
```

All three execute after the verification command verifiers. No engine-owned receipt append occurs between these three later checks, but each currently performs an independent filesystem read.

Canonical `readReceiptLedger(filePath)` uses:

```text
readPrivateUtf8File(filePath)
-> split(LF)
-> trim each line
-> drop blank lines
-> JSON.parse(line) as ExecutionReceipt
```

The exact raw UTF-8 text consumed by a read is not content-addressed in any verification event, and the verification engine does not bind a digest of `context.receiptPath` to the same session. `VerificationReport` contains session/timestamps/pass/checks only. `verification.started` and `verification.completed` do not identify the ledger bytes used by the receipt, policy, and command-aggregate checks.

Therefore canonical R16 cannot prove that a particular historical verification-engine invocation consumed the exact ledger bytes represented by later P7 evidence.

---

## 3. Exact bounded objective

A later implementation may establish only:

```text
STATE = VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY
```

Exact meaning:

> During one bounded `runVerificationEngine()` invocation, after requested verification-command receipts had been produced and before the ledger-dependent receipt/policy/command-aggregate checks completed, the engine obtained one receipt-ledger snapshot through the canonical local receipt-ledger reader, content-addressed the exact raw UTF-8 text supplied to parsing, reused that same parsed snapshot for all three ledger-dependent checks, and emitted one same-session observation event binding the supplied receipt-path digest, presence state, exact raw byte count/SHA-256 where present, and parsed receipt count.

This state is an engine-read observation only. It does not establish broader historical verification truth or any remediation lifecycle state.

---

## 4. Exact conditional implementation allowlist

Only after this authorization becomes `CLOSED_CANONICAL` may one later implementation candidate modify exactly:

```text
packages/kodac-runtime/src/evidence/ledger.ts
packages/kodac-runtime/src/protocol/event.ts
packages/kodac-runtime/src/verification/engine.ts
packages/kodac-runtime/test/verification-core.test.ts
```

No fifth path is authorized.

Baseline blobs at candidate start:

```text
packages/kodac-runtime/src/evidence/ledger.ts = fae20b375abba21e195903140336db4dc0490f17
packages/kodac-runtime/src/protocol/event.ts = cc627aa333b2ceb7f1e239a3379e612678e68ba0
packages/kodac-runtime/src/verification/engine.ts = 765d305f8575f3eb4085ef23a444b53fcb5c5fbc
packages/kodac-runtime/test/verification-core.test.ts = ce0ef8a9fba8974088fae8f4cbb245f951f89950
```

No P7-R1 through P7-R16 source/schema/test, `verification/types.ts`, Done Gate, verification planner, CLI, K2, ExecutionGateway, workspace filesystem, evidence store, workflow, dependency, lockfile, ADR, current-view, product, release, persistence, provider/model, ruleset, or historical evidence path may be modified by the implementation candidate.

---

## 5. Required implementation shape

### 5.1 Observed ledger reader

`packages/kodac-runtime/src/evidence/ledger.ts` may add one bounded observed-read surface while preserving the behavior of existing `readReceiptLedger(filePath)` callers.

The observed read must distinguish:

```text
MISSING_LEDGER
EXISTING_LEDGER
```

For an existing ledger it must bind, before any trimming or blank-line filtering:

```text
receiptLedgerPathSha256
receiptLedgerReadUtf8Bytes
receiptLedgerReadSha256
parsedReceiptCount
```

The digest is SHA-256 over the exact raw UTF-8 string returned by the existing private-file reader. Byte count is `Buffer.byteLength(raw, "utf8")` over that same raw string.

The raw path and raw ledger text must not appear in the observation object or emitted event payload.

For `ENOENT`, existing `readReceiptLedger()` semantics must remain an empty receipt set. The observed form must explicitly record absence rather than misrepresenting it as an existing empty file.

Existing parsing semantics remain unchanged in this unit:

```text
split(LF)
trim line
filter blank lines
JSON.parse each retained line
```

This unit does not tighten, relax, canonicalize, or otherwise redesign receipt parsing.

### 5.2 One observed snapshot per engine invocation

Within `runVerificationEngine()` the three ledger-dependent checks must consume one shared lazy observed-read result.

Required ordering:

```text
agent/workspace/change checks as currently ordered
verification command checks as currently ordered
first ledger-dependent check requests shared observed snapshot
-> exactly one observed ledger read for the three ledger-dependent checks
-> exactly one same-session observation event
receipt check uses shared parsed receipts
policy check uses same shared parsed receipts
command aggregate uses same shared parsed receipts
```

The implementation must not move ledger observation before verification command receipts have been produced.

The implementation must not perform a second observed read for these three checks within the same engine invocation.

### 5.3 Event surface

`packages/kodac-runtime/src/protocol/event.ts` may add exactly one new event type:

```text
verification.receipt_ledger.read
```

The event payload must be data-only and must contain no raw path or raw ledger text. The event must be emitted through the same `RuntimeSession` supplied to `runVerificationEngine()` so its canonical event envelope binds the existing `sessionId`, sequence, eventId, and emittedAt fields.

Candidate payload:

```text
receiptLedgerPathSha256: lowercase SHA-256
receiptLedgerPresent: boolean
receiptLedgerReadUtf8Bytes: non-negative safe integer
receiptLedgerReadSha256: lowercase SHA-256 | null
parsedReceiptCount: non-negative safe integer
```

For a missing ledger:

```text
receiptLedgerPresent = false
receiptLedgerReadUtf8Bytes = 0
receiptLedgerReadSha256 = null
parsedReceiptCount = 0
```

For an existing ledger, `receiptLedgerReadSha256` must be non-null and bind the exact raw text consumed before parser normalization.

### 5.4 VerificationReport remains unchanged

This unit must not modify `packages/kodac-runtime/src/verification/types.ts` and must not add fields to `VerificationReport`.

The canonical P7-R6 through P7-R16 report-binding lineage therefore remains byte-compatible and is not silently rewritten by R17.

---

## 6. Required behavioral preservation

The later implementation must preserve all existing runtime behavior except for the intentionally bounded single-snapshot consistency and observation event.

At minimum:

```text
readReceiptLedger(filePath) external return shape remains ExecutionReceipt[]
ENOENT remains [] for readReceiptLedger(filePath)
invalid retained JSON line still rejects
receipt parsing trim/blank filtering remains unchanged
verification command execution order remains unchanged
command receipt append behavior remains unchanged
receipt evidence pass/fail semantics remain unchanged for a stable ledger
policy evidence pass/fail semantics remain unchanged for a stable ledger
verification.commands aggregation semantics remain unchanged for a stable ledger
VerificationReport public shape remains unchanged
DoneGate public behavior remains unchanged for an unchanged stable successful fixture
CLI surface remains unchanged
```

No implementation may claim this behavioral-preservation requirement authorizes unrelated cleanup or refactoring.

---

## 7. Required focused/adversarial tests

The exact four-path implementation must prove at least:

```text
existing stable successful verification fixture still passes
DoneGate still returns PROVEN_READY for the existing successful fixture
exactly one verification.receipt_ledger.read event is emitted per successful engine invocation that reaches ledger-dependent checks
observation event sessionId equals the verification sessionId
observation event path digest equals SHA-256 of the supplied receiptPath string
observation raw UTF-8 byte count equals the exact pre-normalization ledger text byte count
observation raw SHA-256 equals the exact pre-normalization ledger text SHA-256
parsedReceiptCount equals the shared parsed snapshot length
raw path absent from event payload
raw ledger text absent from event payload
existing empty file is distinguished from missing file
ENOENT preserves current empty-receipt semantics and emits explicit missing observation if ledger-dependent checks are reached
invalid JSON behavior remains fail-closed
CRLF/whitespace/blank-line input observation hashes exact raw text before normalization while parsed semantics remain the existing normalized semantics
ledger mutation after evidence.receipts completion does not change evidence.policy or verification.commands results within the same engine invocation because all three use the same cached snapshot
ledger mutation before the first ledger-dependent read is observed normally
no second observed read occurs for the three ledger-dependent checks
existing verification report shape has no new field
existing event ordering remains deterministic except for the one new event at the bounded observation point
```

The adversarial mutation test should use a controlled `EventSink` side effect after the first ledger-dependent check completion rather than adding a production test seam.

Focused tests are necessary but not sufficient. Because this unit changes the verification runtime, exact-head full repository qualification and the full runtime matrix remain required.

---

## 8. Security and execution boundary

This unit instruments an existing verification-engine filesystem read. It does not authorize any new side-effect capability.

It must not add or invoke:

```text
new filesystem writes
new receipt-ledger append behavior
patch application or retry
K2 or ExecutionGateway capability expansion
verification command authority expansion
Done Gate authority expansion
network access
provider/model access
secret access
persistence/database/telemetry/upload/learning
new dependency or lockfile change
CLI/API/package-root/product integration
release/publication/deployment
ruleset mutation/bypass
```

The event observation must never expose the raw receipt path or raw receipt-ledger text.

---

## 9. Mandatory non-equivalences

```text
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != P7_R16_FILE_READ_IDENTITY
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != HISTORICAL_RECEIPT_LEDGER_COMPLETENESS_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != RECEIPT_LEDGER_ABSENCE_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != RECEIPT_LEDGER_APPEND_HISTORY_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != EXECUTION_RECEIPT_AUTHENTICITY_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != RECEIPT_SIGNATURE_OR_EXTERNAL_ATTESTATION_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != POLICY_DECISION_AUTHENTICITY_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != POLICY_RULE_OR_VERSION_IDENTITY_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != POLICY_AUTHORIZATION_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != HISTORICAL_WORKSPACE_OR_GIT_EXECUTION_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != FULL_VERIFICATION_ENGINE_HISTORICAL_EXECUTION_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != VERIFICATION_EXECUTION_AUTHORITY
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != K2_INVOCATION
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != K2_APPROVAL
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != VERIFIED
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != FIXED
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != REVERIFIED
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != DONE_GATE
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != PROVEN_READY
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != AUTOFIX
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY != PATCH_RETRY_AUTHORITY
P7_R17_CLOSED != SUCCESSOR_IMPLEMENTATION_AUTHORITY
P7_R17_CLOSED != P7_OVERALL_CLOSED
P7_R17_CLOSED != P8_P9_AUTHORITY
P7_R17_CLOSED != PROJECT_COMPLETION
```

All still-effective P7-R1 through P7-R16 non-grants remain in force. Omission from this document is not authorization, proof, waiver, supersession, or narrowing.

---

## 10. Preserved global authority boundaries

```text
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE AUTHORITY = UNCHANGED
P2 OVERALL = OPEN
P3 OVERALL = OPEN
P4 OVERALL = OPEN
P5 OVERALL = NOT_CLOSED
P6 OVERALL = NOT_CLOSED
P7 OVERALL = NOT_CLOSED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
AUTOMATIC_FRESHNESS_DEPENDENCY_INVALIDATION = NOT_AUTHORIZED
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
POST_R17_SUCCESSOR_IMPLEMENTATION = NOT_AUTHORIZED_BY_NUMBERING
PATCH_APPLICATION = NOT_AUTHORIZED
PATCH_RETRY = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_INVOCATION = NOT_AUTHORIZED
K2_APPROVAL_CREATION = NOT_AUTHORIZED
K2_AUTHORITY_EXPANSION = NONE
VERIFICATION_EXECUTION_AUTHORITY = UNCHANGED
VERIFICATION_COMMAND_AUTHORITY = UNCHANGED
VERIFICATION_REPORT_SCHEMA_CHANGE = NOT_AUTHORIZED
HISTORICAL_RECEIPT_LEDGER_COMPLETENESS_PROOF = NOT_ESTABLISHED
RECEIPT_LEDGER_ABSENCE_PROOF = NOT_ESTABLISHED
RECEIPT_LEDGER_APPEND_HISTORY_PROOF = NOT_ESTABLISHED
EXECUTION_RECEIPT_AUTHENTICITY = NOT_ESTABLISHED
POLICY_DECISION_AUTHENTICITY_PROOF = NOT_ESTABLISHED
POLICY_RULE_OR_VERSION_IDENTITY_PROOF = NOT_ESTABLISHED
POLICY_AUTHORIZATION_PROOF = NOT_ESTABLISHED
WORKSPACE_INTEGRITY_PROOF = NOT_ESTABLISHED
GIT_DIFF_OR_STATUS_SEMANTIC_PROOF = NOT_ESTABLISHED
FULL_VERIFICATION_ENGINE_HISTORICAL_EXECUTION_PROOF = NOT_ESTABLISHED
CAPABILITY_AUTHORIZATION_PROOF = NOT_ESTABLISHED
VERIFIED = NOT_ESTABLISHED
FIXED = NOT_ESTABLISHED
REVERIFIED = NOT_ESTABLISHED
DONE_GATE_PROVEN_READY = NOT_ESTABLISHED_BY_P7
DONE_GATE_INVOCATION_OR_MUTATION = NOT_AUTHORIZED_BY_THIS_UNIT
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
NEW_DEPENDENCY_DONOR_ADMISSION = NONE
PERSISTENCE_DATABASE_TELEMETRY_UPLOAD_LEARNING = NOT_AUTHORIZED
CLI_API_PACKAGE_ROOT_PRODUCT_INTEGRATION = NOT_AUTHORIZED
P8_P9_IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC_RELEASE_PACKAGE_PUBLICATION_DEPLOYMENT = NOT_AUTHORIZED
RULESET_CHANGE_BYPASS = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## 11. Qualification gate for this authorization

This documentation-only authorization candidate may merge only when one unchanged exact head proves:

```text
BASE == CURRENT_CANONICAL_MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
EXACT_PATH = docs/planning/KODAC_P7_R17_VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVATION_AUTHORIZATION_2026-09-07.md
REQUIRED_CI = TERMINAL_SUCCESS_OR_CANONICALLY_PROVEN_DOCS_ONLY_NON_APPLICABILITY
INTERNAL_SUBSTANTIVE_SEMANTIC_SECURITY_GOVERNANCE_REVIEW = CLEAN
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
RULESET_20707483 = ACTIVE / SATISFIED / NO_BYPASS
WAIVER = NO
```

Any head/base/blob movement invalidates prior qualification. Merge must use normal merge-commit semantics with the exact final qualified `expected_head_sha`.

---

## 12. Mandatory authorization post-merge proof

Implementation authority becomes active only after proof verifies:

```text
PR_CLOSED_MERGED
MERGE_COMMIT
ORDERED_PARENTS
MERGE_TREE
QUALIFIED_HEAD_TREE_EQUALITY
AUTHORIZATION_BLOB_EQUALITY
MERGE_SIGNATURE_VALID
POST_MERGE_REQUIRED_CHECKS OR TRUTHFUL_CANONICAL_NON_APPLICABILITY
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
RULESET_20707483 = ACTIVE / NO_BYPASS
WAIVER = NO
```

Only that proof may activate the exact four-path implementation allowlist.

---

## 13. Later implementation qualification gate

A later implementation may merge only when one unchanged exact head proves:

```text
EXACT_FOUR_AUTHORIZED_PATHS
NO_FIFTH_PATH
BEHIND_BY = 0
OBSERVED_READER_PRESERVES_EXISTING_PARSE_AND_ENOENT_BEHAVIOR
ENGINE_LEDGER_DEPENDENT_CHECKS_SHARE_ONE_LAZY_POST_COMMAND_SNAPSHOT
EXACTLY_ONE_SAME_SESSION_OBSERVATION_EVENT
RAW_PATH_NOT_EMITTED
RAW_LEDGER_TEXT_NOT_EMITTED
VERIFICATION_REPORT_SHAPE_UNCHANGED
FOCUSED_ADVERSARIAL_TESTS = PASS
FULL_REPOSITORY_TESTS = PASS
TYPECHECK = PASS
RUNTIME_MATRIX = TERMINAL_SUCCESS
INTERNAL_SUBSTANTIVE_SEMANTIC_SECURITY_GOVERNANCE_REVIEW = CLEAN
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
RULESET_20707483 = ACTIVE / SATISFIED / NO_BYPASS
WAIVER = NO
```

The implementation candidate cannot self-certify R17 closure. Guarded merge and complete mandatory post-merge proof remain required.

---

## 14. After later implementation closure

A future closed R17 would still establish only `VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY`.

Fresh analysis would then be required to determine the smallest independent P7 binding that can link the same-session R17 observation to canonical P7-R16/R15/report lineage without treating event prose or a supplied object as self-authenticating execution truth.

No historical ledger completeness, receipt/policy authenticity, workspace/Git historical semantics, full verification-engine historical execution, finding-specific regression completeness, negative/security rerun completeness, exact-head re-review, ProofGraph reconciliation, Done Gate proof, `VERIFIED`, `FIXED`, `REVERIFIED`, P7 overall closure, P8/P9 implementation, release, or project completion follows from this authorization or a future R17 implementation.
