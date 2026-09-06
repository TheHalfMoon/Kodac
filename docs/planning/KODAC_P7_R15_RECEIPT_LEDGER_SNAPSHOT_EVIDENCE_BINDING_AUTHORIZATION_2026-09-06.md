# Kodac P7-R15 — Receipt Ledger Snapshot Evidence Binding Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY_UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-06  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = ce2a3003a6ba31e2c4ab293e0c0a0ac303940761
P7_R14_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #411 / proof 5561648434
POST_R14_SUCCESSOR_ANALYSIS = PR #411 / comment 5561670071 / ANALYSIS_ONLY
PROPOSED_DESCRIPTIVE_LABEL = P7-R15
PROPOSED_STATE = RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY
P7_OVERALL = NOT_CLOSED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The post-R14 successor analysis identified one minimum non-duplicative supplied-snapshot evidence gap after P7-R14 strictly bound the complete supplied receipt-record set to the exact P7-R13/P7-R12 reference set.

This record is documentation-only. It creates no source/schema/test implementation authority until this exact authorization candidate independently qualifies, merges guarded, and receives complete mandatory post-merge proof.

The `P7-R15` label is descriptive for this exact bounded candidate. No authority follows from numbering.

---

## 2. Why this is the minimum non-duplicative successor

Canonical P7-R14 already establishes deterministic supplied-record-to-report-reference consistency and strictly revalidates the complete supplied receipt-record set, including the exact P7-R4 mutation receipt and exact P7-R8 planned-command receipts.

The live receipt ledger still exposes a distinct lower-level representation gap:

```text
JsonlReceiptLedger.append(receipt)
-> appendPrivateUtf8File(filePath, JSON.stringify(receipt) + "\n")

readReceiptLedger(filePath)
-> readPrivateUtf8File(filePath)
-> split("\n")
-> trim each line
-> drop empty lines
-> JSON.parse(line) as ExecutionReceipt
```

The live ledger surface does not provide a canonical supplied-snapshot text identity, exact line-order commitment, exact line-count commitment, or deterministic identity for one supplied JSONL snapshot.

Earlier canonical analysis explicitly deferred historical ledger identity/completeness because `JsonlReceiptLedger` / `readReceiptLedger` provides append/read behavior but no canonical complete-ledger snapshot identity, count commitment, terminal hash, manifest identity, or independently committed absence proof.

The repository also has no independent historical read attestation or authenticated receipt-ledger anchor. Therefore the minimum successor must remain pure/data-only and must bind only one supplied snapshot as evidence input. It must not read the live ledger or promote supplied text to historical truth.

---

## 3. Exact future implementation allowlist

Only after this authorization becomes `CLOSED_CANONICAL` may one later implementation candidate modify exactly:

```text
packages/kodac-runtime/src/remediation/p7-receipt-ledger-snapshot-evidence-binding.ts
schema/p7-receipt-ledger-snapshot-evidence-binding.schema.json
packages/kodac-runtime/test/p7-r15-receipt-ledger-snapshot-evidence-binding.test.ts
```

No fourth path is authorized.

No predecessor P7 source/schema/test, receipt ledger/store/receipt implementation, verification planner/engine/type, K2, ExecutionGateway, Done Gate, K5, workflow, dependency, lockfile, ADR, current-view, product, release, persistence, provider/model, ruleset, or historical evidence path may be modified by the later implementation.

---

## 4. Bounded future state

The later implementation may establish only:

```text
STATE = RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY
```

Exact meaning:

> One exact canonically revalidated P7-R14 lineage is bound to one supplied bounded UTF-8 JSONL receipt-ledger snapshot whose exact supplied text and line order are content-addressed and whose non-empty parsed JSON record set, after exact P7-R14 revalidation, represents exactly the same receipt IDs, count, and strict receipt semantics as the canonical P7-R14 receipt-record set, with no supplied missing, duplicate, or extra record.

This establishes deterministic supplied-snapshot-to-R14-record-set consistency only.

It does not establish that the supplied snapshot was read historically from the live receipt ledger, that it contains the exact historical ledger bytes, that the historical ledger was complete, that omitted historical records did not exist, that any receipt is authentic, or that any policy decision was semantically authorized.

---

## 5. Exact future build input

The future build input must contain exactly:

```text
sourceReceiptRecordSetEvidenceBinding
sourceReceiptRecordSetEvidenceBindingInput
receiptLedgerSnapshot
```

The implementation must call the canonical P7-R14 validator with the exact supplied predecessor/build input. That validation must reconstruct the full canonical predecessor chain rather than trusting duplicated caller identity fields.

The reachable chain remains:

```text
R14 -> R13 -> R12 -> R11 -> R10 -> R9 -> R8 -> R6 -> R5 -> R4 -> R3 -> R2 -> R1
```

`receiptLedgerSnapshot` is evidence input only. It must remain a bounded primitive string; no path, file handle, URL, stream, callback, provider, process, or execution object is permitted.

---

## 6. Required snapshot grammar and resource bounds

The later implementation must define and enforce exactly this bounded snapshot grammar:

```text
receiptLedgerSnapshot is a primitive string
receiptLedgerSnapshot is non-empty
receiptLedgerSnapshot contains only valid Unicode scalar values
UTF-8 byte length <= 16_777_216 bytes
receiptLedgerSnapshot ends with exactly one LF
receiptLedgerSnapshot does not end with two or more LF characters
receiptLedgerSnapshot contains no CR characters
receiptLedgerSnapshot contains no empty lines
receiptLedgerSnapshot contains no line with leading or trailing JSON-external whitespace
line count >= 1
line count <= P7_R14_RECEIPT_RECORD_SET_EVIDENCE_LIMITS.maxReceipts
```

The fixed 16 MiB input ceiling is an explicit bound for this state. A valid P7-R14 record set whose serialized caller-supplied snapshot exceeds this bound is outside this bounded successor and must fail closed; this authorization does not promise universal snapshot support for every theoretically valid R14 record set.

Each non-empty line must be parsed independently with `JSON.parse`. Parse failure is fatal. After parsing, each exact line must satisfy:

```text
line === JSON.stringify(parsedLineValue)
```

This exact round-trip rule is compatible with the live canonical writer form `JSON.stringify(receipt) + LF` and rejects alternate JSON representations that the writer would not emit, including JSON-external whitespace, duplicate object keys that collapse during parsing, and equivalent non-canonical escape/number spellings. The implementation must not use a custom JSON parser, `readReceiptLedger()`, filesystem APIs, or any implicit line normalization.

The exact supplied snapshot string is identity-significant. Receipt line-order changes preserve semantic R14 set membership when the same records are present, but they must change the exact snapshot digest/evidence identity because this state binds the supplied snapshot text and order itself.

---

## 7. Required R14 anchoring

After parsing the exact supplied snapshot into an ordered array of unknown JSON values, the implementation must re-run the exact canonical P7-R14 validator using:

```text
value = sourceReceiptRecordSetEvidenceBinding
input = {
  ...sourceReceiptRecordSetEvidenceBindingInput,
  receiptRecords: parsedSnapshotRecords
}
```

The revalidated result must have the exact same canonical R14 evidence identity as the source P7-R14 predecessor.

The future implementation must additionally require:

```text
parsedSnapshotRecords.length == source R14 receiptCount
parsed receipt-id set == source R14 receiptIds
no duplicate receipt IDs
no missing receipt IDs
no extra receipt IDs
```

No local substitute for R14 generic receipt validation is authorized. The exact P7-R14 validator remains authoritative for receipt shape, hostile-input handling, P7-R4 anchoring, P7-R8 anchoring, policy/result predicates, timestamp rules, approval validation, confinement validation, and deterministic record-set semantics.

The snapshot line order is preserved as evidence but must not alter or override the canonical R14 sorted receipt-record-set semantics.

---

## 8. Deterministic identity requirements

The later implementation may emit one immutable content-addressed record containing only values independently supported by the exact predecessor chain and exact supplied snapshot.

A future record may include identities/fields such as:

```text
version
evidenceIdentity
state
sourceReceiptRecordSetEvidenceIdentity
sourcePolicyReportEvidenceIdentity
sourceReceiptReportEvidenceIdentity
sourceCommandSuccessEvidenceIdentity
sourceAppliedEvidenceIdentity
repositoryIdentity
canonicalBase
targetHead
postStateDigest
verificationReportIdentity
verificationSessionId
receiptCount
receiptIds
receiptLedgerLineCount
receiptLedgerOrder
receiptLedgerSnapshotUtf8Bytes
receiptLedgerSnapshotSha256
receiptLedgerSnapshotIdentity
```

The exact schema must remain bounded to this state. It must not include the raw snapshot text in output unless necessary for validation round-trip; if omitted, exact caller input remains part of the validator/build-input preimage. It must not imply historical origin, historical completeness, authenticity, policy provenance, execution, or lifecycle completion.

At minimum:

```text
receiptLedgerSnapshotSha256 = lowercase SHA-256 of exact supplied UTF-8 snapshot text
receiptLedgerLineCount = exact parsed non-empty line count
receiptLedgerOrder = exact ordered receipt-id sequence from supplied lines
receiptCount = exact canonical P7-R14 receiptCount
receiptIds = exact canonical P7-R14 normalized receipt-id set/order
```

The aggregate evidence identity must change when the exact snapshot text, snapshot digest, line order, or independently bound source identity changes.

---

## 9. Mandatory non-equivalences

```text
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != HISTORICAL_LEDGER_READ_PROOF
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != HISTORICAL_RECEIPT_LEDGER_BYTES_PROOF
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != RECEIPT_LEDGER_COMPLETENESS_PROOF
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != RECEIPT_LEDGER_ABSENCE_PROOF
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != RECEIPT_LEDGER_APPEND_HISTORY_PROOF
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != RECEIPT_LEDGER_FILE_IDENTITY_PROOF
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != EXECUTION_RECEIPT_AUTHENTICITY_PROOF
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != RECEIPT_SIGNATURE_OR_EXTERNAL_ATTESTATION_PROOF
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != POLICY_DECISION_AUTHENTICITY_PROOF
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != POLICY_RULE_OR_VERSION_IDENTITY_PROOF
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != POLICY_AUTHORIZATION_PROOF
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != EXECUTION_INTENT_PREIMAGE_PROOF_FOR_ARBITRARY_RECEIPTS
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != HISTORICAL_WORKSPACE_OR_GIT_SEMANTICS
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != VERIFICATION_ENGINE_HISTORICAL_EXECUTION_PROOF
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != VERIFICATION_EXECUTION_AUTHORITY
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != K2_INVOCATION
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != K2_APPROVAL
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != VERIFIED
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != FIXED
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != REVERIFIED
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != DONE_GATE
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != PROVEN_READY
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != AUTOFIX
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY != PATCH_RETRY_AUTHORITY
P7_R15_CLOSED != SUCCESSOR_IMPLEMENTATION_AUTHORITY
P7_R15_CLOSED != P7_OVERALL_CLOSED
P7_R15_CLOSED != P8_AUTHORITY
P7_R15_CLOSED != PROJECT_COMPLETION
```

All still-effective P7-R10/P7-R11/P7-R12/P7-R13/P7-R14 predecessor non-grants remain in force. Omission from any later condensed view is not authorization, proof, waiver, supersession, or narrowing.

---

## 10. Required focused/adversarial tests

The exact three-path implementation must include focused tests proving at least:

```text
canonical valid supplied JSONL snapshot
output validation round trip
same exact input -> same identity
exact snapshot text mutation -> identity mutation
receipt line-order mutation -> snapshot identity mutation while semantic R14 set remains valid
exact line order is preserved in output evidence
exact line count commitment
exact UTF-8 byte-count commitment
receipt count equality with R14
receipt-id set equality with R14
missing receipt line
extra receipt line
duplicate receipt ID
substituted receipt record
receipt semantic mutation rejected through exact R14 revalidation
mutated source R14 evidence identity
mutated nested R14 predecessor/build input lineage
empty snapshot
missing terminal LF
multiple terminal LF characters
CRLF / CR rejection
blank line rejection
leading JSON-external whitespace rejection
trailing JSON-external whitespace rejection
malformed JSON line
non-object JSON line
non-canonical per-line JSON serialization rejection
duplicate JSON object key rejection
oversized snapshot byte length
excessive line count
Unicode scalar validation
snapshot digest mutation
snapshot order mutation
unknown output fields
accessor / Proxy / symbol hostile output rejection
custom-prototype output rejection
sparse / aliased / cyclic hostile output rejection where applicable
schema acceptance for canonical output
schema rejection for malformed output
source remains pure/data-only and contains no forbidden ledger/filesystem/execution imports
```

Focused tests are necessary but not sufficient. Exact-head full repository qualification remains required.

---

## 11. Security and execution boundary

The future implementation must remain pure/data-only and deterministic.

It must not perform or invoke:

```text
filesystem read/write
readReceiptLedger
JsonlReceiptLedger
receipt-ledger read/write
Git/process/network execution
verification planner/engine execution
K2 / ExecutionGateway invocation
patch application or retry
policy-engine evaluation
provider/model invocation
secret access
persistence/database/telemetry/upload/learning
CLI/API/package-root/product integration
release/publication/deployment
ruleset mutation/bypass
```

The supplied snapshot is caller-provided evidence input only. Parsing it does not prove where it came from.

---

## 12. Preserved global authority boundaries

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
POST_R15_SUCCESSOR_IMPLEMENTATION = NOT_AUTHORIZED_BY_NUMBERING
PATCH_APPLICATION = NOT_AUTHORIZED
PATCH_RETRY = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_INVOCATION = NOT_AUTHORIZED
K2_APPROVAL_CREATION = NOT_AUTHORIZED
K2_AUTHORITY_EXPANSION = NONE
VERIFICATION_PLANNER_INVOCATION = NOT_AUTHORIZED
VERIFICATION_ENGINE_INVOCATION = NOT_AUTHORIZED
VERIFICATION_EXECUTION = NOT_AUTHORIZED
VERIFICATION_REPORT_CREATION = NOT_AUTHORIZED
HISTORICAL_LEDGER_READ_PROOF = NOT_ESTABLISHED
HISTORICAL_RECEIPT_LEDGER_BYTES_PROOF = NOT_ESTABLISHED
RECEIPT_LEDGER_COMPLETENESS_PROOF = NOT_ESTABLISHED
RECEIPT_LEDGER_ABSENCE_PROOF = NOT_ESTABLISHED
EXECUTION_RECEIPT_AUTHENTICITY = NOT_ESTABLISHED
POLICY_DECISION_AUTHENTICITY_PROOF = NOT_ESTABLISHED
POLICY_RULE_OR_VERSION_IDENTITY_PROOF = NOT_ESTABLISHED
POLICY_AUTHORIZATION_PROOF = NOT_ESTABLISHED
WORKSPACE_INTEGRITY_PROOF = NOT_ESTABLISHED
GIT_DIFF_OR_STATUS_SEMANTIC_PROOF = NOT_ESTABLISHED
VERIFICATION_ENGINE_HISTORICAL_EXECUTION_PROOF = NOT_ESTABLISHED
CAPABILITY_AUTHORIZATION_PROOF = NOT_ESTABLISHED
VERIFIED = NOT_ESTABLISHED
FIXED = NOT_ESTABLISHED
REVERIFIED = NOT_ESTABLISHED
DONE_GATE_PROVEN_READY = NOT_ESTABLISHED
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

## 13. Qualification gate for this authorization

This documentation-only authorization candidate may merge only when one unchanged exact head proves:

```text
BASE == CURRENT_CANONICAL_MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
EXACT_PATH = docs/planning/KODAC_P7_R15_RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BINDING_AUTHORIZATION_2026-09-06.md
REQUIRED_CI = TERMINAL_SUCCESS_OR_CANONICALLY_PROVEN_DOCS_ONLY_NON_APPLICABILITY
INTERNAL_SUBSTANTIVE_SEMANTIC_SECURITY_GOVERNANCE_INSPECTION = CLEAN
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
RULESET_20707483 = ACTIVE / SATISFIED / NO_BYPASS
WAIVER = NO
```

Any head/base/blob movement invalidates prior qualification. Merge must use normal merge-commit semantics and the exact final qualified `expected_head_sha`.

---

## 14. Mandatory authorization post-merge proof

P7-R15 implementation authority becomes active only after proof verifies:

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

Only that proof may activate the exact three-path implementation allowlist.

---

## 15. P7-R15 implementation qualification and closure

The later exact three-path implementation candidate must independently prove on one unchanged exact head:

```text
EXACT_AUTHORIZED_THREE_PATH_DIFF
FOCUSED_P7_R15_TESTS = PASS
FULL_TYPECHECK_TEST_REPOSITORY_REGRESSION = PASS
REQUIRED_GOVERNANCE_RUNTIME_PLATFORM_CI = TERMINAL_SUCCESS_AS_APPLICABLE
INTERNAL_SUBSTANTIVE_SEMANTIC_SECURITY_GOVERNANCE_REVIEW = CLEAN
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
RULESET_20707483 = ACTIVE / SATISFIED / NO_BYPASS
WAIVER = NO
```

Merge must use the exact final qualified expected head and normal merge-commit semantics. Closure requires a second mandatory post-merge proof binding exact source/schema/test blobs, ordered parents, merge tree, qualified-head tree equality, signature, applicable exact-main checks, threads, and ruleset state.

---

## 16. After a future P7-R15 closure

A later P7-R15 closure would establish only `RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY` under the exact bounded semantics above.

It would not authorize any successor implementation by numbering. Fresh analysis from then-live repository truth would be required.

No historical ledger read/completeness/absence proof, receipt authenticity, policy authenticity/authorization, historical workspace/Git semantics, verification-engine execution proof, `VERIFIED`, `FIXED`, `REVERIFIED`, Done Gate / `PROVEN_READY`, K2 invocation, P7 overall closure, P8/P9 implementation, release, or project completion follows from this authorization or a future bounded P7-R15 closure.
