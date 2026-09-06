# Kodac P7-R13 — Policy Report Evidence Binding Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-06  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 338270258f7bdbb4b137a64f7d2395b3f2db4c63
P7_R12_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #403 / proof 5560512547
POST_R12_SUCCESSOR_ANALYSIS = PR #403 / comment 5560530226 / ANALYSIS_ONLY
ANALYSIS_RESULT = SMALLEST_INDEPENDENTLY_PROVABLE_SUCCESSOR_IDENTIFIED
PROPOSED_DESCRIPTIVE_LABEL = P7-R13
PROPOSED_STATE = POLICY_REPORT_EVIDENCE_BOUND
P7_OVERALL = NOT_CLOSED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This record is documentation-only. It grants no P7-R13 implementation authority until this exact candidate independently qualifies, merges guarded, and receives complete mandatory post-merge proof.

---

## 2. Exact later implementation allowlist

If and only if this authorization becomes `CLOSED_CANONICAL`, one later P7-R13 implementation candidate may modify exactly:

```text
packages/kodac-runtime/src/remediation/p7-policy-report-evidence-binding.ts
schema/p7-policy-report-evidence-binding.schema.json
packages/kodac-runtime/test/p7-r13-policy-report-evidence-binding.test.ts
```

No fourth path is authorized.

The implementation may add no dependency, workflow, lockfile, package-root export, CLI/API/product integration, persistence, telemetry, provider/model invocation, network access, K2 invocation, verification execution, patch application, release configuration, ruleset, or repository-protection change.

---

## 3. Exact implementation objective

The future implementation may add one pure/data-only deterministic contract whose state is exactly:

```text
POLICY_REPORT_EVIDENCE_BOUND
```

Exact meaning:

> One exact canonically revalidated P7-R12 predecessor reaches one exact passing P7-R6 `evidence.policy` check with category `policy`, the exact canonical passing summary `Every persisted execution receipt was authorized by policy.`, and one non-empty bounded set of unique digest-free `kind=receipt` report evidence references that is exactly equal, after deterministic normalization, to the receipt-reference set already bound by the exact P7-R12 predecessor.

The authorization wording in the summary is a historical report claim already committed by P7-R6. P7-R13 may bind that report claim and cross-check its report references against P7-R12; it may not reclassify either as independently reconstructed policy, receipt-ledger, or execution truth.

---

## 4. Required predecessor and lineage behavior

The future builder/validator must fail closed unless it canonically revalidates the exact supplied P7-R12 predecessor and all exact nested lineage required by the current P7 contracts.

The P7-R13 source may import only repository-local existing P7 validators/types needed to revalidate the predecessor and the reachable P7-R6 verification report.

The resulting record may bind only existing canonical lineage fields plus:

```text
version
evidenceIdentity
state
sourceReceiptReportEvidenceIdentity
sourceGitChangeReportEvidenceIdentity
sourceWorkspaceReferenceEvidenceIdentity
sourceAgentCompletionEvidenceIdentity
sourceCommandSuccessEvidenceIdentity
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
policyReportCheckSummary
policyReportReceiptCount
policyReportEvidence
policyReportRefs
```

No caller-supplied receipt records, policy decisions, policy objects, or ledger representations may enter the build input.

---

## 5. Mandatory `evidence.policy` semantics

The exact canonically revalidated P7-R6 report reachable through P7-R12 must satisfy all of:

```text
verificationReportPassed == true
verificationReport.passed == true
exactly one check.id == evidence.policy
check.category == policy
check.status == pass
check.summary == "Every persisted execution receipt was authorized by policy."
1 <= check.evidence.length <= 256
```

Every policy-report evidence item must satisfy:

```text
kind == receipt
ref = bounded canonical non-empty Unicode-scalar text
ref contains no control character
ref length <= existing P7-R6 evidence-ref bound
digest field is absent
```

All policy receipt refs must be unique. The implementation must deterministically canonicalize the policy evidence and exported refs rather than preserve attacker-controlled ordering.

The implementation must additionally prove from already-bound data:

```text
policyReportReceiptCount == sourceReceiptReportEvidenceBinding.receiptReportCount
policyReportRefs == sourceReceiptReportEvidenceBinding.receiptReportRefs
```

after deterministic normalization. This equality proves only report-projection consistency. It does not authenticate a receipt or a policy decision.

---

## 6. Input exclusions

The implementation build input must accept only the exact P7-R12 predecessor and exact nested input required to canonically revalidate it.

The following are explicitly forbidden as new P7-R13 inputs:

```text
raw receipt-ledger bytes
receipt-ledger file path
caller-supplied ExecutionReceipt records
policy objects
policy decision records
policy rule or version identities
execution intent preimages
capability mappings
process environments
mutation affected paths
mutation post-state observations
Git output
filesystem observations
live ledger reads
live verification report generation
K2 calls
network data
provider/model output
```

P7-R13 must remain pure/data-only.

---

## 7. Deterministic identity

The future record must be content-addressed from one strict canonical serialization of every semantic field except `evidenceIdentity` itself.

Required behavior:

```text
same semantic input -> same output identity
field insertion order -> no identity effect
policy evidence input order -> no identity effect
unknown fields -> reject
accessors / Proxy / symbol fields -> reject
cycles / aliases / sparse arrays -> reject where applicable
non-canonical timestamps / digests / Git identities -> reject
mutated predecessor lineage -> reject
mutated policy summary/evidence/reference set -> reject
policy/receipt reference-set inequality -> reject
```

The exact serialization grammar may follow existing P7 strict canonicalization patterns, but it must be implemented entirely inside the three-path allowlist and may not change predecessor contracts.

---

## 8. Required non-equivalences

The implementation, schema, tests, PR body, reviews, proofs, and later current views must preserve at least:

```text
POLICY_REPORT_EVIDENCE_BOUND != POLICY_AUTHORIZATION_PROOF
POLICY_REPORT_EVIDENCE_BOUND != POLICY_DECISION_AUTHENTICITY_PROOF
POLICY_REPORT_EVIDENCE_BOUND != POLICY_RULE_OR_VERSION_IDENTITY_PROOF
POLICY_REPORT_EVIDENCE_BOUND != POLICY_LEDGER_BYTES_OR_SNAPSHOT_PROOF
POLICY_REPORT_EVIDENCE_BOUND != POLICY_LEDGER_COMPLETENESS_PROOF
POLICY_REPORT_EVIDENCE_BOUND != EXECUTION_RECEIPT_AUTHENTICITY_PROOF
POLICY_REPORT_EVIDENCE_BOUND != RECEIPT_LEDGER_BYTES_OR_SNAPSHOT_PROOF
POLICY_REPORT_EVIDENCE_BOUND != RECEIPT_LEDGER_COMPLETENESS_PROOF
POLICY_REPORT_EVIDENCE_BOUND != EXECUTION_INTENT_PREIMAGE_PROOF
POLICY_REPORT_EVIDENCE_BOUND != CAPABILITY_AUTHORIZATION_PROOF
POLICY_REPORT_EVIDENCE_BOUND != MUTATION_POST_STATE_PROOF
POLICY_REPORT_EVIDENCE_BOUND != MUTATION_AFFECTED_PATH_SET_PROOF
POLICY_REPORT_EVIDENCE_BOUND != VERIFICATION_ENGINE_INVOCATION
POLICY_REPORT_EVIDENCE_BOUND != VERIFICATION_EXECUTION_AUTHORITY
POLICY_REPORT_EVIDENCE_BOUND != K2_INVOCATION
POLICY_REPORT_EVIDENCE_BOUND != K2_APPROVAL
POLICY_REPORT_EVIDENCE_BOUND != VERIFIED
POLICY_REPORT_EVIDENCE_BOUND != FIXED
POLICY_REPORT_EVIDENCE_BOUND != REVERIFIED
POLICY_REPORT_EVIDENCE_BOUND != DONE_GATE
POLICY_REPORT_EVIDENCE_BOUND != PROVEN_READY
POLICY_REPORT_EVIDENCE_BOUND != AUTOFIX
POLICY_REPORT_EVIDENCE_BOUND != PATCH_RETRY_AUTHORITY
P7_R13_CLOSED != SUCCESSOR_IMPLEMENTATION_AUTHORITY
P7_R13_CLOSED != P7_OVERALL_CLOSED
P7_R13_CLOSED != P8_AUTHORITY
P7_R13_CLOSED != PROJECT_COMPLETION
```

All still-effective predecessor P7-R10/P7-R11/P7-R12 non-grants remain in force. Omission from a condensed later view is not authorization, proof, waiver, supersession, or narrowing.

---

## 9. Required tests

The exact three-path implementation must include focused tests proving at least:

```text
canonical valid build
output validation round trip
same semantic input -> same identity
policy evidence ordering normalization
exact canonical policy summary
wrong check id
wrong category
wrong status
wrong summary text
empty policy evidence
oversized policy evidence
duplicate policy receipt refs
non-receipt evidence kind
policy evidence carrying digest
empty / control-character / oversized policy ref
policy receipt count equality with P7-R12
policy receipt ref-set equality with P7-R12
missing or extra policy ref versus P7-R12
unknown fields
accessor / Proxy / symbol rejection
sparse / aliased / cyclic graph rejection where applicable
mutated R12 predecessor identity
mutated nested R11/R10/R9/R8/R6 lineage
mutated report identity/session/timestamps
mutated output identity
schema acceptance for canonical output
schema rejection for malformed output
```

Focused tests are necessary but not sufficient; exact-head full repository qualification remains required.

---

## 10. Preserved authority boundaries

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
AUTOMATIC FRESHNESS / DEPENDENCY INVALIDATION = NOT_AUTHORIZED
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
POST_R13_SUCCESSOR_IMPLEMENTATION = NOT_AUTHORIZED_BY_NUMBERING
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
WORKSPACE_INTEGRITY_PROOF = NOT_ESTABLISHED
GIT_COMMAND_INTENT_OR_ENVIRONMENT_PROOF = NOT_ESTABLISHED
GIT_OUTPUT_CONTENT_OR_DIGEST_PROOF = NOT_ESTABLISHED
GIT_DIFF_OR_STATUS_SEMANTIC_PROOF = NOT_ESTABLISHED
CHANGED_PATH_SET_TRUTH = NOT_ESTABLISHED
WORKSPACE_CLEANLINESS_PROOF = NOT_ESTABLISHED
EXECUTION_RECEIPT_AUTHENTICITY = NOT_ESTABLISHED
RECEIPT_LEDGER_COMPLETENESS_PROOF = NOT_ESTABLISHED
POLICY_DECISION_AUTHENTICITY_PROOF = NOT_ESTABLISHED
POLICY_RULE_OR_VERSION_IDENTITY_PROOF = NOT_ESTABLISHED
POLICY_LEDGER_COMPLETENESS_PROOF = NOT_ESTABLISHED
POLICY_AUTHORIZATION_PROOF = NOT_ESTABLISHED
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

## 11. Qualification gate for this authorization

This documentation-only authorization candidate may merge only when one unchanged exact head proves:

```text
BASE == CURRENT_CANONICAL_MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
EXACT_PATH = docs/planning/KODAC_P7_R13_POLICY_REPORT_EVIDENCE_BINDING_AUTHORIZATION_2026-09-06.md
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

## 12. Mandatory authorization post-merge proof

P7-R13 implementation authority becomes active only after proof verifies:

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

## 13. P7-R13 implementation qualification and closure

The later three-path implementation candidate must independently prove on one unchanged exact head:

```text
EXACT AUTHORIZED THREE-PATH DIFF
FOCUSED P7-R13 TESTS = PASS
FULL TYPECHECK / TEST / REPOSITORY REGRESSION = PASS
REQUIRED GOVERNANCE / RUNTIME / PLATFORM CI = TERMINAL SUCCESS AS APPLICABLE
INTERNAL SUBSTANTIVE SEMANTIC / SECURITY / GOVERNANCE REVIEW = CLEAN
KNOWN ACTIONABLE DEFECTS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET_20707483 = ACTIVE / SATISFIED / NO_BYPASS
WAIVER = NO
```

Merge must use the exact final qualified expected head and normal merge-commit semantics. Closure requires a second mandatory post-merge proof binding exact source/schema/test blobs, ordered parents, merge tree, qualified-head tree equality, signature, applicable exact-main checks, threads, and ruleset state.

---

## 14. After P7-R13 closure

P7-R13 closure would establish only `POLICY_REPORT_EVIDENCE_BOUND` under the exact bounded semantics above.

It would not authorize any successor implementation by numbering. Fresh analysis from then-live repository truth would be required.

No `VERIFIED`, `FIXED`, `REVERIFIED`, Done Gate, policy authorization proof, policy decision authenticity, receipt authenticity, ledger completeness, verification execution, K2 invocation, P7 overall closure, P8/P9 implementation, release, or project completion follows from this authorization or a future bounded P7-R13 closure.