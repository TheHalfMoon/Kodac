# Kodac P7-R6 — Post-Apply Verification Report Binding Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 005333744df24318de405d999a4d0b1235b98011
CANONICAL_TREE_AT_CANDIDATE_START = 419e360a1fc92ea8cdbec6ecc338d6adb71ca399
P7_R5_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #371 / proof 5554045522
P7_R6_SUCCESSOR_ANALYSIS = PR #371 / comment 5554059103 / ANALYSIS_ONLY
P7_R5_STATE = VERIFICATION_PLAN_BOUND_ONLY
P7_OVERALL = NOT_CLOSED
WAIVER = NO
```

This record is documentation-only. While unmerged or not post-merge proven, it creates no runtime, verifier, K2, filesystem/Git, lifecycle, product, release, successor, or project-completion authority.

The `P7-R6` label is only a convenient identifier for this bounded candidate. Numbering itself grants nothing.

---

## 2. Why this is the minimum non-duplicative successor

Canonical P7 currently establishes:

```text
P7-R1 = immutable patch proposal
P7-R2 = pure/data-only authorization to apply one exact proposal
P7-R3 = pure/data-only exact patch / repo.apply_patch intent binding
P7-R4 = pure/data-only APPLIED evidence binding over one supplied successful existing repo.apply_patch receipt
P7-R5 = pure/data-only VERIFICATION_PLAN_BOUND binding over one exact supplied verification plan
```

Live verification code owns separate responsibilities:

```text
VerificationPlanner / VerificationPlan = verification discovery and planning
runVerificationEngine = verification execution through existing bounded execution authority
VerificationReport = verification check outcomes
DoneGate = separate completion-readiness authority
```

The current `VerificationReport` carries protocol/version/session/timestamps/passed/checks, but it carries no P7-R5 binding identity, applied-evidence identity, verification `planDigest`, changed-path identity, or P7 lineage identity.

The current CLI builds a `VerificationPlan`, passes only `plan.commands` into `runVerificationEngine(...)`, and later serializes the plan, report, and Done Gate result beside each other in `proof.json`. Mere co-location in one mutable JSON artifact is not a deterministic content-addressed P7 lineage relation.

K5-R2 already provides generic source linkage for `VERIFICATION_REPORT` metadata and revision/source digests. That mechanism remains authoritative for its own evidence-linkage scope. It does not canonically revalidate a P7-R5 binding, bind one exact verification report to one exact P7-R5 plan digest/applied lineage, or validate exact planned-command/report-check correspondence. P7-R6 must not duplicate or replace K5 evidence linkage.

Therefore the minimum independent missing mechanism is one pure/data-only binding from the exact P7-R5 lineage to one strictly validated supplied current `kodac.verification` report. It must not invoke the verification engine, create a Done Gate result, or promote report pass/fail into remediation lifecycle truth.

---

## 3. Conditional implementation allowlist

Only after this authorization candidate itself qualifies on one unchanged exact head, merges with the exact guarded expected-head precondition, and receives complete mandatory post-merge proof may one later implementation candidate modify exactly these three paths:

```text
packages/kodac-runtime/src/remediation/p7-post-apply-verification-report-binding.ts
schema/p7-post-apply-verification-report-binding.schema.json
packages/kodac-runtime/test/p7-r6-post-apply-verification-report-binding.test.ts
```

No fourth path is authorized.

The later implementation may import existing pure/data-validation contracts and types needed to revalidate P7-R5 and validate the published verification-report structure. It may not modify P7-R1/R2/R3/R4/R5 predecessors, verification planner/engine/types/Done Gate, K2, execution gateway, filesystem, receipt ledger, CLI, workflow, dependency, product, or release surfaces.

---

## 4. Required bounded semantics

The later implementation must remain pure/data-only, deterministic, content-addressed, detached from caller mutation, and deeply immutable.

Its minimum relation is:

```text
ONE VALID EXACT P7-R5 VERIFICATION_PLAN_BOUND RECORD
+ THE EXACT PREDECESSOR / BUILD INPUT REQUIRED TO REVALIDATE THAT R5 RECORD CANONICALLY
+ ONE STRICTLY VALIDATED SUPPLIED kodac.verification REPORT
+ REPORT.protocol == kodac.verification
+ REPORT.version == 1
+ REPORT.passed == EVERY REPORT CHECK STATUS IS pass
+ REPORT COMMAND CHECKS == EXACT P7-R5 PLANNED COMMAND ID/CATEGORY SET
+ REQUIRED CURRENT VERIFICATION BASE CHECKS ARE PRESENT EXACTLY ONCE
-> ONE DETERMINISTIC CONTENT-ADDRESSED POST-APPLY VERIFICATION-REPORT BINDING
```

The later implementation must use the canonical P7-R5 validator with the exact predecessor/build input needed by that validator. It must not trust only a caller-supplied R5 `bindingIdentity`, `verificationPlanDigest`, report digest, or TypeScript type assertion.

The output identity must bind, directly or through exact validated predecessor identity, at least:

```text
proposalIdentity
authorizationIdentity
intentBindingIdentity
appliedEvidenceIdentity
P7-R5 verification-plan bindingIdentity
repositoryIdentity
canonicalBase
targetHead
postStateDigest
verificationPlanDigest
exact changedPaths
report protocol/version
report sessionId
report startedAt/completedAt
report passed
normalized report checks/evidence
report digest / content identity
```

Exact output field names are implementation details within this bounded contract.

---

## 5. Verification-report validation requirements

The later implementation may not call `runVerificationEngine(...)` or `planVerification(...)`. It consumes a supplied report as data and validates it independently against the currently published report contract plus the exact R5-bound plan.

At minimum, it must fail closed on:

```text
wrong report protocol or version
empty, malformed, over-bound, or control-character session id
malformed or noncanonical timestamps
completedAt earlier than startedAt
empty or over-bound checks array
duplicate check ids
missing required current base checks
unknown or malformed command.<id> checks
missing planned command check
extra command check not present in the exact R5 plan
planned command/report category mismatch
invalid check status
report.passed inconsistent with check statuses
passing command check without receipt evidence
malformed evidence kind/ref/digest
unknown fields
Proxy objects
accessor properties
symbol fields
custom prototypes
sparse arrays
cyclic / aliased / non-JSON data
invalid Unicode scalar values
resource-bound overflow
caller-injected approval, execution-authority, Done Gate, fixed, reverified, completion, product, or release fields
```

The current required base check ids are:

```text
agent.completed
workspace.integrity
git.diff
evidence.receipts
evidence.policy
verification.commands
```

The later implementation may bind additional well-formed non-command checks if the supplied current report contains them, but it must not permit additional `command.*` identities outside the exact R5 plan.

The exact P7-R5 planned command relation is:

```text
for each P7-R5 verificationPlan.commands[i]
  expected report check id = command.<command.id>
  expected report check category = command.category
```

A report with `passed == true` must have every check `status == pass`. A report with any failed check must have `passed == false`. This structural consistency does not by itself establish that a command actually executed outside the evidence carried by the supplied report.

The binding must use explicit finite resource limits for arrays, strings, graph depth/nodes, check count, evidence count, and evidence text/digest fields. Limits may be conservative but must not expand existing verification or P7 authority.

---

## 6. Required state boundary

This bounded mechanism may establish only:

```text
STATE = VERIFICATION_REPORT_BOUND
```

Meaning:

> one exact canonically validated P7-R5 verification-plan lineage is cryptographically bound to one exact strictly validated supplied verification report.

Required non-equivalences:

```text
VERIFICATION_REPORT_BOUND != VERIFICATION_ENGINE_INVOCATION
VERIFICATION_REPORT_BOUND != VERIFICATION_EXECUTION_AUTHORIZATION
VERIFICATION_REPORT_BOUND != K2_INVOCATION
VERIFICATION_REPORT_BOUND != K2_APPROVAL
VERIFICATION_REPORT_BOUND != VERIFIED
VERIFICATION_REPORT_BOUND != VERIFICATION_FAILED
VERIFICATION_REPORT_BOUND != FIXED
VERIFICATION_REPORT_BOUND != REVERIFIED
VERIFICATION_REPORT_BOUND != DONE_GATE
VERIFICATION_REPORT_BOUND != AUTOFIX
REPORT.passed != VERIFIED_REMEDIATION
REPORT.passed != DONE_GATE
REPORT.passed != P7_OVERALL_CLOSED
P7_R6_CLOSED != P7_R7_PLUS_AUTHORITY
P7_R6_CLOSED != P7_OVERALL_CLOSED
P7_R6_CLOSED != P8_AUTHORITY
P7_R6_CLOSED != PROJECT_COMPLETION
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
VERIFICATION_ENGINE_INVOCATION = NOT_AUTHORIZED
VERIFICATION_EXECUTION_AUTHORITY = NOT_AUTHORIZED
VERIFICATION_REPORT_CREATION = NOT_AUTHORIZED
VERIFICATION_FAILED_VERIFIED = NOT_ESTABLISHED
FIXED_REVERIFIED_DONE_GATE = NOT_ESTABLISHED
DONE_GATE_INVOCATION_OR_MUTATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
P7_R7_PLUS = NOT_AUTHORIZED_BY_NUMBERING
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

The later source must not import or invoke `runVerificationEngine`, `planVerification`, `ExecutionGateway`, `DoneGate`, filesystem mutation, process execution, network access, receipt-ledger writes, provider/model calls, or any patch-application API.

---

## 8. Implementation quality requirements

The later exact three-path implementation must include tests covering at least:

```text
happy-path deterministic VERIFICATION_REPORT_BOUND construction and validation
canonical identity stability
exact P7-R1/R2/R3/R4/R5 lineage revalidation through canonical R5 validator
R5 binding identity / applied evidence / planDigest / post-state binding
report protocol/version validation
session id and canonical timestamp validation
startedAt/completedAt ordering
required base-check presence and uniqueness
exact planned command -> command.<id> report check correspondence
planned command/report category equality
missing / extra / duplicate command-check rejection
report.passed consistency
passing command check receipt-evidence requirement
malformed evidence rejection
unknown-field and lifecycle/authority injection rejection
Proxy / accessor / custom-prototype / sparse-array / cyclic/aliased hostile input rejection
invalid Unicode and resource-bound rejection
caller mutation isolation / deep immutability
output identity tampering rejection
schema/runtime boundary agreement
absence of planner invocation, verification execution, K2, Done Gate, filesystem, process, network, ledger-write, provider/model, or patch-application surfaces
```

Tests may construct report fixture data as contract-test evidence. They must not claim that verification, K2, a scanner, re-review, Done Gate, patch application, or any real command actually executed.

---

## 9. Qualification gate for this authorization candidate

Do not merge this authorization record unless one unchanged exact head proves:

```text
BASE == CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P7_R6_POST_APPLY_VERIFICATION_REPORT_BINDING_AUTHORIZATION_2026-09-05.md
REQUIRED_CI = TERMINAL_SUCCESS_OR_CANONICALLY_PROVEN_DOCS_ONLY_NON_APPLICABILITY
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

## 10. Mandatory post-merge proof

Post-merge proof must verify at minimum:

```text
MERGE_COMMIT
ORDERED_PARENTS
MERGE_TREE
QUALIFIED_HEAD_TREE_EQUALITY
AUTHORIZATION_BLOB_EQUALITY
MERGE_SIGNATURE_VALID
POST_MERGE_REQUIRED_CHECKS
PR_CLOSED_MERGED
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
RULESET_20707483 = ACTIVE / NO_BYPASS
```

If a workflow is canonically non-applicable to the docs-only merge and therefore does not run, the proof must state that explicitly rather than fabricate a run.

---

## 11. After this authorization becomes canonical

The only newly authorized implementation action is the exact three-path pure/data-only candidate listed above.

That later implementation must independently qualify on one unchanged exact head, merge guarded, and receive complete post-merge proof before this bounded P7-R6 mechanism can be called closed canonical.

Only after implementation closure and any required current-view reconciliation may fresh successor-authority analysis determine whether a separate verification-evidence / outcome-state binding is independently necessary and non-duplicative.

No verification execution, `VERIFICATION_FAILED`, `VERIFIED`, `FIXED`, `REVERIFIED`, Done Gate advancement, K2 invocation, P7-R7+, P8/P9 implementation, product/release work, autofix, or project completion follows from this record by numbering or composition.
