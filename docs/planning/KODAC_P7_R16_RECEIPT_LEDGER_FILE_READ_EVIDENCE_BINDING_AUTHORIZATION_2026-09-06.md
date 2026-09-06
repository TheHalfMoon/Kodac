# Kodac P7-R16 — Receipt Ledger File-Read Evidence Binding Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY_UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-06  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = b568935a7653108dbe5906b35c256dda45a43532
P7_R15_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #415 / proof 5562065929
POST_R15_SUCCESSOR_ANALYSIS = PR #415 / comment 5562089582 / ANALYSIS_ONLY
PROPOSED_DESCRIPTIVE_LABEL = P7-R16
PROPOSED_STATE = RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY
P7_OVERALL = NOT_CLOSED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The post-R15 successor analysis identified one minimum non-duplicative read-evidence gap after P7-R15 bound one exact caller-supplied JSONL snapshot to the complete canonical P7-R14 receipt-record-set lineage.

This record is documentation-only. It creates no source/schema/test implementation authority until this exact authorization candidate independently qualifies, merges guarded, and receives complete mandatory post-merge proof.

The `P7-R16` label is descriptive for this exact bounded candidate. No authority follows from numbering.

---

## 2. Why this is the minimum non-duplicative successor

Canonical P7-R15 establishes exact supplied-snapshot identity, UTF-8 byte count, SHA-256, line count, line order, and exact R14 semantic revalidation. It explicitly does not establish that the supplied snapshot came from a local receipt-ledger file read.

Live canonical code currently provides:

```text
JsonlReceiptLedger.append(receipt)
-> appendPrivateUtf8File(filePath, JSON.stringify(receipt) + LF)

readReceiptLedger(filePath)
-> readPrivateUtf8File(filePath)
-> split(LF)
-> trim each line
-> drop empty lines
-> JSON.parse(line) as ExecutionReceipt
```

`readPrivateUtf8File()` provides useful file-safety checks, but `readReceiptLedger()` returns normalized parsed records rather than exact read bytes and does not emit a deterministic read-evidence identity. The verification engine invokes that reader for receipt/policy/command checks, but those reads themselves are not independently receipt-backed or content-addressed as a ledger-read event.

A caller-supplied read-attestation object would add no independent evidence beyond P7-R15. Therefore the minimum useful successor must perform one bounded file read itself and bind the exact observed bytes to the already-canonical P7-R15 snapshot identity.

This is still strictly smaller than historical verification-engine execution proof, historical completeness/absence, append-history proof, receipt authenticity, or policy authenticity.

---

## 3. Exact future implementation allowlist

Only after this authorization becomes `CLOSED_CANONICAL` may one later implementation candidate modify exactly:

```text
packages/kodac-runtime/src/remediation/p7-receipt-ledger-file-read-evidence-binding.ts
schema/p7-receipt-ledger-file-read-evidence-binding.schema.json
packages/kodac-runtime/test/p7-r16-receipt-ledger-file-read-evidence-binding.test.ts
```

No fourth path is authorized.

No predecessor P7 source/schema/test, `packages/kodac-runtime/src/evidence/ledger.ts`, `packages/kodac-runtime/src/evidence/store.ts`, receipt implementation, verification planner/engine/type, K2, ExecutionGateway, Done Gate, K5, workflow, dependency, lockfile, ADR, current-view, product, release, persistence, provider/model, ruleset, or historical evidence path may be modified by the later implementation.

---

## 4. Bounded future state

The later implementation may establish only:

```text
STATE = RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY
```

Exact meaning:

> During one invocation of the authorized reader, one caller-selected local receipt-ledger path was opened read-only without following a final symlink where the platform supports `O_NOFOLLOW`, observed as one regular single-link file, read from the same open file descriptor under the fixed 16 MiB ceiling, and re-observed without relevant same-file metadata drift; the exact bytes decoded as strict UTF-8 and exactly revalidated to the same canonical P7-R15 snapshot evidence identity. The resulting immutable record content-addresses the source R15 identity, a digest of the supplied path string, stable file-observation metadata, exact read byte count, and exact read SHA-256.

This is one bounded current local file-read evidence binding only.

It does not establish that the file was the exact historical ledger consumed by a prior verification-engine invocation, historical completeness, absence of omitted historical records, append history, receipt authenticity, policy authenticity/authorization, or lifecycle completion.

---

## 5. Exact future build input

The future build input must contain exactly:

```text
sourceReceiptLedgerSnapshotEvidenceBinding
sourceReceiptLedgerSnapshotEvidenceBindingInput
receiptLedgerPath
```

`sourceReceiptLedgerSnapshotEvidenceBinding` and its exact build input must be revalidated by the canonical P7-R15 validator. The full predecessor chain remains reachable through that exact source input.

`receiptLedgerPath` is an execution input used only for the bounded local read. It must be a primitive non-empty string and must not contain NUL. It must not be emitted as raw output; only a deterministic SHA-256 commitment to the exact supplied path string may appear in the evidence record.

No URL, stream, file handle, callback, provider, process, policy object, K2 object, or execution gateway object is permitted in the build input.

---

## 6. Mandatory bounded read mechanics

The later implementation must perform the read itself and fail closed unless all of the following hold:

```text
receiptLedgerPath is a primitive non-empty string
receiptLedgerPath contains no NUL
open read-only
use O_NOFOLLOW for the final path component on platforms where Node exposes a non-zero O_NOFOLLOW flag
opened target is a regular file
opened target has exactly one filesystem link
initial file size is a safe positive integer
initial file size <= 16_777_216 bytes
same open descriptor is used for initial stat, byte read, and final stat
read exactly the initially observed file size
zero/early EOF before the advertised size is fatal
no bytes beyond the initially observed size are silently accepted
initial and final stable metadata are exactly equal
post-read lstat path remains a non-symlink regular file
post-read lstat dev/ino identity equals the open descriptor identity
exact bytes decode as strict UTF-8 with fatal decoding
exact decoded text is revalidated through canonical P7-R15
revalidated P7-R15 evidence identity equals the exact source P7-R15 evidence identity
```

The implementation must not call `readReceiptLedger()` because that function trims/drops lines and cannot preserve exact R15 snapshot bytes.

The implementation must not rewrite, normalize, repair, truncate, append, chmod, create directories, or otherwise mutate the observed ledger path.

---

## 7. Stable file observation

The initial and final same-descriptor stat observations must compare the relevant stable fields available through Node `FileHandle.stat({ bigint: true })`:

```text
dev
ino
size
mode
uid
gid
nlink
mtimeNs
ctimeNs
```

Each value must be normalized to a base-10 primitive string before deterministic hashing. The canonical metadata preimage must use exact fixed field names and ordering.

The implementation may derive:

```text
receiptLedgerFileObservationIdentity = SHA-256(canonical JSON of normalized stable metadata)
```

The raw dev/ino/uid/gid/timestamps need not be emitted in the final evidence object. The observation identity is sufficient for this bounded state and avoids unnecessary exposure of local metadata.

The final path `lstat()` is a race-detection check only. It does not turn a pathname into a durable external identity and does not prove anything about earlier historical path targets.

---

## 8. Exact byte and UTF-8 semantics

The reader must allocate/read only within the fixed ceiling and must hash the exact bytes returned from the same open descriptor.

At minimum:

```text
receiptLedgerReadUtf8Bytes = exact number of bytes read
receiptLedgerReadSha256 = lowercase SHA-256 of exact bytes read
receiptLedgerPathSha256 = lowercase SHA-256 of exact UTF-8 encoding of receiptLedgerPath
```

UTF-8 decoding must be strict/fatal. Replacement-character decoding of malformed byte sequences is forbidden.

After strict decoding, the implementation must re-run the exact canonical P7-R15 validator using:

```text
value = sourceReceiptLedgerSnapshotEvidenceBinding
input = {
  ...sourceReceiptLedgerSnapshotEvidenceBindingInput,
  receiptLedgerSnapshot: exactDecodedReadText
}
```

The resulting R15 evidence identity must equal the exact supplied source R15 evidence identity. This requirement makes P7-R15 authoritative for snapshot grammar, exact canonical writer-compatible JSONL semantics, R14 record-set equality, receipt semantics, line count/order, and the full predecessor chain.

No local duplicate receipt/snapshot validator is authorized.

---

## 9. Deterministic output requirements

The later implementation may emit one immutable content-addressed record containing only values supported by the exact read and predecessor chain.

A future record may include exactly bounded fields such as:

```text
version
evidenceIdentity
state
sourceReceiptLedgerSnapshotEvidenceIdentity
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
receiptLedgerPathSha256
receiptLedgerReadUtf8Bytes
receiptLedgerReadSha256
receiptLedgerFileObservationIdentity
receiptLedgerReadIdentity
```

The exact schema must remain closed. The raw receipt-ledger path, raw snapshot text, raw filesystem metadata, file descriptor, timestamps generated by this reader, random identifiers, host identity, process identity, environment variables, secrets, and provider/model values must not appear in output.

At minimum:

```text
receiptLedgerReadIdentity = deterministic SHA-256 over:
  sourceReceiptLedgerSnapshotEvidenceIdentity
  receiptLedgerPathSha256
  receiptLedgerReadUtf8Bytes
  receiptLedgerReadSha256
  receiptLedgerFileObservationIdentity
```

The aggregate `evidenceIdentity` must change when any independently bound source/read identity changes.

---

## 10. Mandatory non-equivalences

```text
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != HISTORICAL_VERIFICATION_ENGINE_LEDGER_READ_PROOF
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != HISTORICAL_RECEIPT_LEDGER_COMPLETENESS_PROOF
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != RECEIPT_LEDGER_ABSENCE_PROOF
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != RECEIPT_LEDGER_APPEND_HISTORY_PROOF
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != RECEIPT_AUTHENTICITY_PROOF
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != RECEIPT_SIGNATURE_OR_EXTERNAL_ATTESTATION_PROOF
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != POLICY_DECISION_AUTHENTICITY_PROOF
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != POLICY_RULE_OR_VERSION_IDENTITY_PROOF
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != POLICY_AUTHORIZATION_PROOF
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != HISTORICAL_WORKSPACE_OR_GIT_SEMANTICS
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != VERIFICATION_ENGINE_HISTORICAL_EXECUTION_PROOF
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != VERIFICATION_EXECUTION_AUTHORITY
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != K2_INVOCATION
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != K2_APPROVAL
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != VERIFIED
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != FIXED
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != REVERIFIED
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != DONE_GATE
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != PROVEN_READY
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != AUTOFIX
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY != PATCH_RETRY_AUTHORITY
P7_R16_CLOSED != SUCCESSOR_IMPLEMENTATION_AUTHORITY
P7_R16_CLOSED != P7_OVERALL_CLOSED
P7_R16_CLOSED != P8_AUTHORITY
P7_R16_CLOSED != PROJECT_COMPLETION
```

All still-effective P7-R10 through P7-R15 predecessor non-grants remain in force. Omission from any later condensed view is not authorization, proof, waiver, supersession, or narrowing.

---

## 11. Required focused/adversarial tests

The exact three-path implementation must include focused tests proving at least:

```text
canonical stable local ledger file read
output validation round trip
same exact file/source/path -> same deterministic evidence identity while file metadata is unchanged
exact read bytes equal canonical R15 snapshot bytes
read byte count equals source R15 snapshot UTF-8 byte count
read SHA-256 equals source R15 snapshot SHA-256
path string mutation changes path/read evidence identity
source R15 identity mutation rejected
nested R15 predecessor/build input mutation rejected
file contents differing from R15 snapshot rejected
missing file rejected
empty file rejected
oversized file rejected
final symlink rejected where supported
non-regular file rejected
multi-link file rejected where hard links are supported
same-descriptor metadata mutation/drift rejected with a deterministic injected seam or controlled fixture where direct race reproduction is unreliable
post-read path identity mismatch rejected with a deterministic injected seam or controlled fixture where direct race reproduction is unreliable
strict malformed UTF-8 rejection
CRLF / malformed snapshot rejected through exact R15 revalidation
blank-line / non-canonical JSONL rejected through exact R15 revalidation
line-order/content mutation rejected unless exact source R15 identity also changes consistently
unknown output fields rejected
accessor / Proxy / symbol hostile output rejected
custom-prototype output rejected
sparse / aliased / cyclic hostile output rejected where applicable
schema accepts canonical output
schema rejects malformed output
raw path is absent from output
raw snapshot text is absent from output
raw filesystem metadata is absent from output
source imports no receipt-ledger writer, K2, ExecutionGateway, verification engine, process, network, provider/model, persistence, release, or ruleset surface
```

A deterministic test seam may be used only to force metadata/path-race rejection branches. It must not permit production callers to bypass actual filesystem observation or inject trusted read bytes/metadata into the production success path.

Focused tests are necessary but not sufficient. Exact-head full repository qualification and runtime matrix qualification remain required because this source performs filesystem reads.

---

## 12. Security and execution boundary

This bounded successor is read-only but is no longer pure/data-only because it performs one local filesystem read.

It must not perform or invoke:

```text
filesystem write/chmod/truncate/append/create/delete/rename
receipt-ledger append/write
readReceiptLedger normalization
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

The only authorized execution surface is the bounded read-only observation of the exact caller-supplied `receiptLedgerPath` within the new P7-R16 source.

---

## 13. Preserved global authority boundaries

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
POST_R16_SUCCESSOR_IMPLEMENTATION = NOT_AUTHORIZED_BY_NUMBERING
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
HISTORICAL_VERIFICATION_ENGINE_LEDGER_READ_PROOF = NOT_ESTABLISHED
HISTORICAL_RECEIPT_LEDGER_COMPLETENESS_PROOF = NOT_ESTABLISHED
RECEIPT_LEDGER_ABSENCE_PROOF = NOT_ESTABLISHED
RECEIPT_LEDGER_APPEND_HISTORY_PROOF = NOT_ESTABLISHED
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
DONE_GATE_INVOCATION_OR_MUTATION = NOT_AUTHORIZED
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

## 14. Qualification gate for this authorization

This documentation-only authorization candidate may merge only when one unchanged exact head proves:

```text
BASE == CURRENT_CANONICAL_MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
EXACT_PATH = docs/planning/KODAC_P7_R16_RECEIPT_LEDGER_FILE_READ_EVIDENCE_BINDING_AUTHORIZATION_2026-09-06.md
REQUIRED_CI = TERMINAL_SUCCESS_OR_CANONICALLY_PROVEN_DOCS_ONLY_NON_APPLICABILITY
INTERNAL_SUBSTANTIVE_SEMANTIC_SECURITY_GOVERNANCE_INSPECTION = CLEAN
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
RULESET_20707483 = ACTIVE / SATISFIED / NO_BYPASS
WAIVER = NO
```

Any head/base/blob movement invalidates prior qualification. Merge must use normal merge-commit semantics and the exact final qualified `expected_head_sha`.

---

## 15. Mandatory authorization post-merge proof

Implementation authority becomes active only after proof verifies:

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

## 16. Later implementation qualification and closure

The later exact three-path candidate must independently prove on one unchanged exact head:

```text
EXACT THREE AUTHORIZED PATHS
NO FOURTH PATH
BOUNDED LOCAL READ IS THE ONLY EXECUTION SURFACE
CANONICAL P7-R15 REVALIDATION IS AUTHORITATIVE
NO RAW PATH/SNAPSHOT/METADATA LEAK IN OUTPUT
FOCUSED / ADVERSARIAL TESTS = PASS
TYPECHECK = PASS
FULL RUNTIME REGRESSION = PASS
REQUIRED CI / PLATFORM MATRIX = TERMINAL SUCCESS
INTERNAL SUBSTANTIVE SEMANTIC / SECURITY / GOVERNANCE REVIEW = CLEAN
KNOWN ACTIONABLE DEFECTS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET_20707483 = ACTIVE / SATISFIED / NO_BYPASS
WAIVER = NO
```

The candidate cannot self-certify closure. Merge requires the exact final qualified expected head and normal merge-commit semantics. Closure requires a second mandatory post-merge proof binding exact blobs, ordered parents, merge tree, qualified-head tree equality, signature, applicable exact-main checks, threads, and ruleset state.

---

## 17. After later implementation closure

A future bounded implementation of this exact unit still would not establish historical verification-engine ledger consumption, completeness/absence/append history, receipt authenticity, policy authenticity/authorization, historical workspace/Git semantics, verification-engine historical execution, `VERIFIED`, `FIXED`, `REVERIFIED`, Done Gate, P7 overall closure, P8/P9 implementation, release, or project completion.

Post-implementation current-view reconciliation and fresh successor-authority analysis would still require their own exact authorization/qualification/merge/post-proof sequence.
