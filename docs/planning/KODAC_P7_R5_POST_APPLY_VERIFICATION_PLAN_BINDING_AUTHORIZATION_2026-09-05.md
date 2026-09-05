# Kodac P7-R5 — Post-Apply Verification Plan Binding Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 942d1989a8b9ceb3504e3a3001ffa69e13f6fb16
P7_R4_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #367 / proof 5553600421
P7_R5_SUCCESSOR_ANALYSIS = PR #367 / comment 5553695694 / ANALYSIS_ONLY
P7_OVERALL = NOT_CLOSED
WAIVER = NO
```

This record is documentation-only. While unmerged or not post-merge proven, it creates no runtime, verification, planner, K2, filesystem/Git, lifecycle, product, release, successor, or project-completion authority.

The `P7-R5` label is only a convenient identifier for this bounded candidate. Numbering itself grants nothing.

---

## 2. Why this is the minimum non-duplicative successor

Canonical P7 currently establishes:

```text
P7-R1 = PROPOSED immutable patch identity and exact change projection
P7-R2 = AUTHORIZED_TO_APPLY pure/data-only authorization bound to R1
P7-R3 = pure/data-only binding to exact inert patch bytes and repo.apply_patch intent
P7-R4 = APPLIED_EVIDENCE_ONLY pure/data-only binding over one supplied successful existing repo.apply_patch receipt
```

The repository already contains a verification subsystem that owns separate responsibilities:

```text
VerificationPlanner / VerificationPlan = verification discovery and planning
runVerificationEngine = verification execution through existing bounded execution authority
VerificationReport = verification check outcomes
DoneGate = separate completion-readiness authority
```

Live code shows that the current `VerificationPlan.planDigest` is not bound to P7 proposal, authorization, pre-execution intent, applied-evidence identity, exact execution receipt, or post-state digest. `VerificationReport` also does not carry a verification-plan identity.

Therefore P7 must not jump directly from `APPLIED` evidence to `VERIFIED`, and it must not create another verifier executor, K2 wrapper, policy engine, receipt ledger, Done Gate, or CLI orchestration path. The minimum independent missing mechanism is one pure/data-only binding from the exact applied P7 lineage to one strictly validated supplied verification plan.

---

## 3. Conditional implementation allowlist

Only after this authorization candidate itself qualifies on one unchanged exact head, merges with the exact guarded expected-head precondition, and receives complete mandatory post-merge proof may one later implementation candidate modify exactly these three paths:

```text
packages/kodac-runtime/src/remediation/p7-post-apply-verification-plan-binding.ts
schema/p7-post-apply-verification-plan-binding.schema.json
packages/kodac-runtime/test/p7-r5-post-apply-verification-plan-binding.test.ts
```

No fourth path is authorized.

The later implementation may import existing pure/data-validation contracts and types needed to validate the P7-R4 predecessor and the verification-plan structure. It may not modify any P7-R1/R2/R3/R4 predecessor, verification planner/engine/types/Done Gate, K2, execution gateway, filesystem, receipt ledger, CLI, workflow, dependency, product, or release surface.

---

## 4. Required bounded semantics

The later implementation must remain pure/data-only, deterministic, content-addressed, detached from caller mutation, and deeply immutable.

Its minimum relation is:

```text
ONE VALID EXACT P7-R4 APPLIED EVIDENCE BINDING
+ THE EXACT PREDECESSOR INPUT REQUIRED TO REVALIDATE THAT R4 RECORD CANONICALLY
+ ONE STRICTLY VALIDATED SUPPLIED VerificationPlan
+ PLAN.protocol == kodac.verification-plan
+ PLAN.version == 1
+ PLAN.planDigest == RECOMPUTED CANONICAL DIGEST OF THE EXISTING PLANNER STABLE PROJECTION
+ PLAN.changedPaths == EXACT CANONICAL P7-R4 PATH SET / ORDER
+ PLAN CONTAINS AT LEAST ONE TESTS-CATEGORY COMMAND
-> ONE DETERMINISTIC CONTENT-ADDRESSED POST-APPLY VERIFICATION-PLAN BINDING
```

The later implementation must use the canonical P7-R4 validator with the exact predecessor/build input needed by that validator. It must not trust only a caller-supplied `appliedEvidenceIdentity`, must not reimplement R4 lineage semantics, and must not treat a TypeScript type assertion as proof.

The output identity must bind, directly or through exact validated predecessor identity, at least:

```text
proposalIdentity
authorizationIdentity
intentBindingIdentity
appliedEvidenceIdentity
executionReceiptId
postStateDigest
repositoryIdentity
canonicalBase
targetHead
verificationPlanDigest
exact changedPaths
normalized verification-plan projection
```

The normalized plan projection must preserve all authority-relevant verification-plan semantics needed to distinguish one plan from another, including risk, budget, signals, commands, warnings, and changed paths. `generatedAt` and absolute workspace text are existing planner observations and must not be permitted to silently redefine remediation lineage or execution authority.

Exact output field names are implementation details within this bounded contract.

---

## 5. Verification-plan validation requirements

The later implementation may not call `planVerification(...)`. It consumes a supplied plan as data and validates it independently against the currently published planner contract.

At minimum, it must fail closed on:

```text
wrong protocol or version
missing, malformed, uppercase, or stale planDigest
planDigest mismatch against a freshly recomputed canonical stable projection
changed-path expansion / reduction / substitution / reordering
paths outside the exact P7-R4 applied projection
duplicate command ids
unknown command categories
unknown executables
empty or malformed command ids
malformed or over-bound argument arrays
unsafe numeric timeout/output bounds
non-finite / negative / non-integer numeric fields
no tests-category command
duplicate / noncanonical signal or changed-path set entries where applicable
unknown fields
Proxy objects
accessor properties
symbol fields
custom prototypes
sparse arrays
cyclic / non-JSON data
invalid Unicode scalar values
caller-injected approval, execution, report, outcome, lifecycle, Done Gate, or completion fields
```

The binding must use explicit finite resource limits for arrays, strings, graph depth/nodes, command count, argument count, timeout values, and output-byte bounds. Limit values may be chosen conservatively within the existing planner's published ranges, but must not expand existing planner authority.

The existing planner's digest algorithm is currently:

```text
stable = {
  risk,
  budget,
  signals,
  changedPaths,
  commands,
  warnings,
}
planDigest = sha256(JSON.stringify(stable))
```

The later contract must reproduce this existing digest projection exactly for validation. It must not change `planner.ts` or silently define a different planner identity under the same protocol/version.

---

## 6. Required state boundary

This bounded mechanism may establish only a neutral planning state such as:

```text
STATE = VERIFICATION_PLAN_BOUND
```

The exact literal may be chosen in the implementation, but its meaning must remain only:

> one exact validated P7 applied-evidence lineage is cryptographically bound to one exact supplied verification plan.

Required non-equivalences:

```text
VERIFICATION_PLAN_BOUND != VERIFICATION_PLANNER_EXECUTION
VERIFICATION_PLAN_BOUND != VERIFICATION_EXECUTION
VERIFICATION_PLAN_BOUND != K2_INVOCATION
VERIFICATION_PLAN_BOUND != K2_APPROVAL
VERIFICATION_PLAN_BOUND != VERIFICATION_REPORT
VERIFICATION_PLAN_BOUND != VERIFICATION_FAILED
VERIFICATION_PLAN_BOUND != VERIFIED
VERIFICATION_PLAN_BOUND != FIXED
VERIFICATION_PLAN_BOUND != REVERIFIED
VERIFICATION_PLAN_BOUND != DONE_GATE
VERIFICATION_PLAN_BOUND != AUTOFIX
PLAN_DIGEST != VERIFICATION_RESULT
TESTS_PLANNED != TESTS_EXECUTED
TESTS_PLANNED != TESTS_PASSED
P7_R5_CLOSED != P7_R6_PLUS_AUTHORITY
P7_R5_CLOSED != P7_OVERALL_CLOSED
P7_R5_CLOSED != P8_AUTHORITY
P7_R5_CLOSED != PROJECT_COMPLETION
```

---

## 7. Side-effect and authority non-grants

This authorization candidate and the conditional implementation it may later authorize grant none of the following:

```text
PATCH_APPLICATION = NOT_AUTHORIZED
K2_INVOCATION = NOT_AUTHORIZED
K2_APPROVAL_CREATION = NOT_AUTHORIZED
K2_AUTHORITY_EXPANSION = NONE
VERIFICATION_PLANNER_INVOCATION = NOT_AUTHORIZED
VERIFICATION_EXECUTION = NOT_AUTHORIZED
VERIFICATION_REPORT_CREATION = NOT_AUTHORIZED
VERIFICATION_FAILED_VERIFIED = NOT_ESTABLISHED
FIXED_REVERIFIED_DONE_GATE = NOT_ESTABLISHED
DONE_GATE_INVOCATION_OR_MUTATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
P7_R6_PLUS = NOT_AUTHORIZED_BY_NUMBERING
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

The later source must not import or invoke `planVerification`, `runVerificationEngine`, `ExecutionGateway`, `DoneGate`, filesystem mutation, process execution, network access, receipt-ledger writes, provider/model calls, or any patch-application API.

---

## 8. Implementation quality requirements

The later three-path implementation must include tests covering at least:

```text
happy-path deterministic verification-plan binding construction and validation
canonical identity stability
exact R1/R2/R3/R4 lineage revalidation through the canonical R4 validator
R4 applied-evidence identity / receipt id / post-state binding
planDigest exact recomputation
planDigest tampering rejection
changed-path expansion / reduction / substitution / reordering rejection
command id duplicate rejection
unknown category / executable rejection
malformed args / timeout / output limits rejection
absence of a tests-category command rejection
unknown-field and lifecycle/authority injection rejection
Proxy / accessor / custom-prototype / sparse-array / cyclic hostile input rejection
invalid Unicode and resource-bound rejection
caller mutation isolation / deep immutability
output identity tampering rejection
schema/runtime boundary agreement
absence of planner invocation, verification execution, K2, Done Gate, filesystem, process, network, ledger-write, provider/model, or patch-application surfaces
```

Tests may construct verification-plan fixture data as contract-test evidence. They must not claim that a verifier, K2 action, test suite, scanner, re-review, K5 reconciliation, or Done Gate actually executed.

---

## 9. Qualification gate for this authorization candidate

Do not merge this authorization record unless one unchanged exact head proves:

```text
BASE == CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P7_R5_POST_APPLY_VERIFICATION_PLAN_BINDING_AUTHORIZATION_2026-09-05.md
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

The only newly authorized implementation action is the exact three-path pure/data-only candidate listed above.

That later implementation must independently qualify on one unchanged exact head, merge guarded, and receive complete post-merge proof before this bounded P7-R5 mechanism can be called closed canonical.

Only after implementation closure and required current-view reconciliation may fresh successor-authority analysis determine whether a separately authorized verification-execution request/result binding is independently necessary and non-duplicative.

No verification execution, `VERIFICATION_FAILED`, `VERIFIED`, K2 invocation, finding closure, KRI lifecycle mutation, K5/Done Gate advancement, P7-R6+, P8/P9 implementation, product/release work, autofix, or project completion follows from this record by numbering or composition.
