# Kodac P7-R7 — Verification-Failure Disposition Binding Authorization Candidate

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
P7_R6_STATE = VERIFICATION_REPORT_BOUND_ONLY
P7_R7_PLUS = NOT_AUTHORIZED_BY_NUMBERING
P7_OVERALL = NOT_CLOSED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This record is documentation-only. While unmerged or not post-merge proven, it creates no runtime, schema, test, lifecycle, verification-execution, K2, Done Gate, product, release, successor, or project-completion authority.

The `P7-R7` label is descriptive only. Numbering itself grants nothing.

---

## 2. Why this is the minimum non-duplicative successor

Canonical P7 currently establishes:

```text
P7-R1 = immutable patch proposal
P7-R2 = pure/data-only authorization to apply one exact proposal
P7-R3 = pure/data-only exact patch / repo.apply_patch intent binding
P7-R4 = pure/data-only APPLIED evidence binding over one supplied successful existing repo.apply_patch receipt
P7-R5 = pure/data-only VERIFICATION_PLAN_BOUND binding over one exact supplied verification plan
P7-R6 = pure/data-only VERIFICATION_REPORT_BOUND binding over one exact supplied verification report
```

Fresh live-code inspection proves:

```text
P7_REMEDIATION_PRODUCTION_CONTRACTS_END_AT_R6 = YES
P7_VERIFICATION_FAILED_PRODUCTION_STATE_CONTRACT = NOT_FOUND
P7_VERIFIED_PRODUCTION_STATE_CONTRACT = NOT_FOUND
K5_R2_GENERIC_VERIFICATION_REPORT_LINKAGE = EXISTS
K5_PROOF_PACKAGE_JUDGMENT = EXISTS
DONE_GATE_PROVEN_READY_AUTHORITY = EXISTS / SEPARATE
```

Canonical P7-R6 validates an exact `kodac.verification` report and enforces:

```text
verificationReport.passed == every verificationReport.check.status is pass
```

Canonical P7-R6 also explicitly preserves:

```text
VERIFICATION_REPORT_BOUND != VERIFICATION_FAILED
VERIFICATION_REPORT_BOUND != VERIFIED
REPORT.passed != VERIFIED_REMEDIATION
REPORT.passed != DONE_GATE
```

K5 canonical closeout separately preserves:

```text
SUFFICIENT_PACKAGE != PROVEN_READY
VALID_RECONCILIATION != PROVEN_READY
```

The existing Done Gate remains the accepted authority for `PROVEN_READY / NOT_READY`, and ADR-0001 requires evidence-backed completion rather than assertion-based completion truth.

Therefore the pass and fail branches are not symmetric for the next bounded P7 state transition:

- one exact canonically revalidated R6 binding with `verificationReportPassed == false` proves that the exact bound report contains at least one failed verification check and can conservatively support a pure/data-only `VERIFICATION_FAILED` disposition;
- one R6 binding with `verificationReportPassed == true` does **not** by itself establish `VERIFIED`, `FIXED`, `REVERIFIED`, `PROVEN_READY`, Done Gate success, or project completion.

The minimum non-duplicative successor is therefore **failure-only**: one immutable deterministic binding that records `VERIFICATION_FAILED` from an exact failed R6 lineage without executing anything and without creating a success-state promotion path.

---

## 3. Conditional future implementation allowlist

Only after this authorization candidate itself independently qualifies, merges through the guarded expected-head path, and receives complete post-merge proof may one later implementation candidate modify exactly:

```text
packages/kodac-runtime/src/remediation/p7-verification-failure-disposition-binding.ts
schema/p7-verification-failure-disposition-binding.schema.json
packages/kodac-runtime/test/p7-r7-verification-failure-disposition-binding.test.ts
```

No fourth path is authorized.

The later implementation may import existing pure validation/types needed to canonically revalidate P7-R6 and its predecessor build input. It may not modify P7-R1 through P7-R6 predecessors, verification planner/engine/types/Done Gate, K5, K2, ExecutionGateway, filesystem, receipt ledger, CLI, workflows, dependencies/lockfiles, accepted ADRs, current-view files, historical authorization/evidence, product, release, rulesets, provider/model configuration, persistence, telemetry, or any other path.

---

## 4. Required future contract semantics

The later contract must remain pure/data-only, deterministic, content-addressed, detached from caller mutation, and deeply immutable.

Its minimum relation is:

```text
ONE EXACT P7-R6 VERIFICATION_REPORT_BOUND RECORD
+ THE EXACT PREDECESSOR / BUILD INPUT REQUIRED TO REVALIDATE THAT R6 RECORD CANONICALLY
+ R6.verificationReportPassed == false
+ AT_LEAST_ONE R6.verificationReport.check.status == fail
-> ONE DETERMINISTIC CONTENT-ADDRESSED VERIFICATION_FAILED DISPOSITION BINDING
```

The later implementation must call the canonical P7-R6 validator with the exact predecessor/build input required by that validator. It must not trust only a caller-supplied R6 `bindingIdentity`, report digest, `verificationReportPassed`, TypeScript type assertion, or duplicated lineage fields.

The output must bind, directly or through the exact validated R6 identity, at least:

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
verificationStartedAt
verificationCompletedAt
exact failed check projections
```

The exact failed-check projection must be derived only from the validated R6 report. It must include enough data to preserve the identity and meaning of each failure, at minimum:

```text
check id
category
status = fail
summary
evidence projection already validated by R6
```

Failed-check ordering and nested evidence ordering must be deterministic. No caller may independently add, remove, rename, reorder semantically meaningful identity data, change a failed check to pass, or inject a failure absent from the validated R6 source.

The disposition identity must be deterministic SHA-256 content addressing over the canonical normalized non-identity preimage. The implementation must use one explicit serialization rule and test that identity is stable across benign caller object insertion order while still binding every semantic field.

---

## 5. Required failure-only gate

The future builder and validator must fail closed unless:

```text
validated R6 state == VERIFICATION_REPORT_BOUND
validated R6 verificationReportPassed == false
validated R6 verificationReport.passed == false
validated R6 report contains >= 1 failed check
failed-check projection exactly equals all and only failed checks in the validated R6 report
```

A passing R6 report is outside this contract and must be rejected.

Required explicit non-equivalence:

```text
R6_REPORT_PASSED_TRUE -> NOT_ACCEPTED_BY_THIS_CONTRACT
THIS_CONTRACT_HAS_NO_VERIFIED_OUTPUT
THIS_CONTRACT_HAS_NO_SUCCESS_DISPOSITION
```

No fallback, coercion, default, or caller flag may convert a passing report into `VERIFIED`, `VERIFICATION_FAILED`, or any other lifecycle state.

---

## 6. Required state boundary

This bounded mechanism may establish only:

```text
STATE = VERIFICATION_FAILED
```

Meaning:

> one exact canonically revalidated P7-R6 verification-report lineage contains at least one failed verification check, and that failure disposition is bound immutably to the exact P7 remediation lineage.

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

A failure disposition describes evidence state only. It does not authorize remediation retry, additional writes, re-planning, re-execution, new K2 use, verifier execution, or any follow-up action.

---

## 7. Required separation from K5 and Done Gate

The future P7-R7 contract must not duplicate or mutate K5 proof-review authority.

K5-R2 remains authoritative for its generic verification-report producer linkage. K5 package judgments and reconciliation remain authoritative for their own bounded proof-review states.

The future P7-R7 contract may reuse no K5 state as a shortcut to completion and must preserve:

```text
K5_SUFFICIENT_PACKAGE != PROVEN_READY
K5_VALID_RECONCILIATION != PROVEN_READY
K5_EVIDENCE != P7_EXECUTION_AUTHORITY
```

The future P7-R7 contract must not import, invoke, wrap, mutate, or replace `DoneGate`. It must not create or claim `PROVEN_READY` or `NOT_READY`.

Done Gate authority remains unchanged.

---

## 8. Required hostile-input and freshness semantics

The later implementation must fail closed on at least:

```text
invalid or tampered R6 binding
R6 binding identity mismatch
R6 predecessor/build-input mismatch
passing R6 report
R6 report.passed / verificationReportPassed inconsistency
zero failed checks
caller-added or caller-removed failed checks
failed-check identity/category/status/summary/evidence drift
unknown fields
Proxy objects
accessors
symbol fields
custom prototypes
sparse arrays
cycles
aliases where the canonical predecessor rejects them
non-JSON values
invalid Unicode scalar values
resource-bound overflow
malformed SHA/digest/timestamp values inherited from the canonical R6 validator
mutation-after-call influence
output dispositionIdentity mismatch
caller-injected VERIFIED / FIXED / REVERIFIED / DONE_GATE / PROVEN_READY / execution / retry / product / release / completion fields
```

The contract records only the source-bound revision already represented by R6. It does not prove that the repository, dependencies, environment, policy, threat intelligence, or any external state remains unchanged later.

---

## 9. Required adversarial qualification

The later implementation tests must cover at least:

```text
valid failed R6 lineage -> deterministic VERIFICATION_FAILED record
passing R6 lineage -> rejection
one failed base check -> exact projection
one failed planned command check -> exact projection
multiple failures -> canonical deterministic ordering
all and only source failures are bound
source R6 validator is reused rather than loosely reimplemented
source R6 tamper / bindingIdentity mismatch rejection
predecessor/build-input mismatch rejection
caller cannot inject or delete failures
caller cannot inject VERIFIED / completion / Done Gate claims
identity binds every semantic field
identity stable across benign caller object insertion order
mutation-after-call cannot change result
nested output deeply frozen
unknown field rejection
Proxy/accessor/custom-prototype/symbol/sparse/cycle/hostile graph rejection through canonical validation and local boundary checks
schema/runtime/test semantic agreement
explicit absence of filesystem / Git / process / K2 / verification-engine / Done Gate / network / provider / persistence execution surfaces
```

Focused tests and all repository-required CI must be terminal success on one unchanged exact head.

---

## 10. Qualification gate for this authorization candidate

Do not merge this authorization record unless one unchanged exact head proves:

```text
BASE == CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P7_R7_VERIFICATION_FAILURE_DISPOSITION_BINDING_AUTHORIZATION_2026-09-05.md
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

## 11. Mandatory post-merge proof

This authorization creates future three-path implementation authority only after post-merge proof verifies at minimum:

```text
MERGE_COMMIT
ORDERED_PARENTS
MERGE_TREE
QUALIFIED_HEAD_TREE_EQUALITY
AUTHORIZATION_BLOB_EQUALITY
MERGE_SIGNATURE_VALID
POST_MERGE_REQUIRED_CHECKS OR TRUTHFUL CANONICAL NON-APPLICABILITY
PR_CLOSED_MERGED
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
RULESET_20707483 = ACTIVE / NO_BYPASS
```

If a workflow is canonically non-applicable to the docs-only merge and therefore does not run, the proof must state that fact rather than fabricate a run.

Only after that proof may the exact three implementation paths in section 3 become authorized.

---

## 12. Explicit non-grants

This authorization candidate does not authorize:

```text
IMPLEMENTATION_BEFORE_AUTHORIZATION_POST_PROOF
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