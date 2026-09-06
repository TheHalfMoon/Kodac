# Kodac P7-R11 — Git Change Report Evidence Binding Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-06  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = c6805763be1b752ffea713b42a5e6acfbae94216
CANONICAL_MAIN_TREE_AT_CANDIDATE_START = 86b878e93f20cc69416b0042aa3382f775d00c1c
P7_R10_WORKSPACE_REFERENCE_EVIDENCE_BINDING = CLOSED_CANONICAL / PR #393 / proof 5559155207
P7_R10_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #395 / proof 5559289934
POST_R10_SUCCESSOR_ANALYSIS = PR #395 / comment 5559371295 / ANALYSIS_ONLY
P7_R10_STATE = WORKSPACE_REFERENCE_EVIDENCE_BOUND_ONLY
CURRENT_VERIFICATION_ENGINE_BLOB = 765d305f8575f3eb4085ef23a444b53fcb5c5fbc
P7_R6_SOURCE_BLOB = 3ec02f33eec231e0f90a0a1da069c620db9b379c
P7_R10_SOURCE_BLOB = 3bbdf9174e2b939ceed36afcd8fc4036e8356712
POST_R10_SUCCESSOR_IMPLEMENTATION = NOT_AUTHORIZED_BY_NUMBERING
P7_OVERALL = NOT_CLOSED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The `P7-R11` label is descriptive only. It creates no authority by numbering.

This candidate is documentation-only. It creates no source/schema/test implementation authority unless this exact authorization candidate independently qualifies, merges guarded, and receives complete mandatory post-merge proof.

---

## 2. Why direct `VERIFIED` or Git semantic proof is still not justified

The current Done Gate requires the base checks:

```text
agent.completed
workspace.integrity
git.diff
evidence.receipts
evidence.policy
verification.commands
```

Canonical P7-R8 independently binds the exact planned verification-command success-receipt evidence. Canonical P7-R9 independently binds the supplied canonical `agent.loop.completed` event evidence. Canonical P7-R10 independently binds only the historical `workspace.integrity` report reference/digest relation.

The current verification engine implements the `git.diff` base check by obtaining two read-only gateway results:

```text
gateway.gitDiff(...)
gateway.gitStatus(...)
```

On success it emits:

```text
id = git.diff
category = diff
status = pass
summary = Workspace changes are evidenced (diffBytes=<N>, statusBytes=<M>).
evidence = [receiptRef(git.diff receipt), receiptRef(git.status receipt)]
```

The check passes only when at least one of the observed stdout byte counts is nonzero.

However the underlying read-only receipt `inputDigest` is derived from the generic gateway preimage:

```text
executable
args
allowedExitCodes
maxOutputBytes
timeoutMs
env
```

The git-read calls do not supply the bounded sanitized verification environment used by planned command checks. They inherit the historical canonicalized process environment. That historical environment is not independently bound by the current P7 lineage and may contain environment-specific or sensitive values.

Therefore this authorization must not attempt retrospective command-intent reconstruction, environment capture, receipt-record reconstruction, Git output reconstruction, Git semantic proof, or `VERIFIED` promotion.

---

## 3. Why caller-supplied git receipts are prohibited

The exact P7-R6 report commits the `git.diff` check's receipt reference IDs, not complete immutable receipt records and not the missing environment preimages.

A caller could supply a structurally plausible receipt record carrying a report-referenced ID while changing fields that the report itself does not independently commit. Validating such caller-supplied fields would not create receipt authenticity.

Therefore the future R11 build input must contain **no caller-supplied execution receipts**.

This is stricter than a receipt-shape-only successor and preserves the P7 requirement that new state be derived from independently committed predecessor evidence rather than from duplicated caller claims.

---

## 4. Bounded future state

A later implementation may establish only:

```text
STATE = GIT_CHANGE_REPORT_EVIDENCE_BOUND
```

Exact meaning:

> One exact canonically revalidated P7-R10 predecessor reaches one exact passing P7-R6 `git.diff` check with category `diff`, one strict canonical passing summary carrying bounded non-negative `diffBytes` and `statusBytes` with at least one nonzero count, and exactly two unique digest-free `receipt` evidence references.

This state establishes only the shape and deterministic linkage of the supplied historical report evidence already committed by the exact P7-R6 lineage.

It does **not** authenticate either referenced receipt record, reconstruct either command intent, establish the historical process environment, reconstruct stdout/stderr, validate any output digest, prove Git command execution, prove Git diff/status semantics, prove workspace cleanliness, prove ledger completeness, or establish `VERIFIED`.

---

## 5. Conditional future implementation allowlist

Only after this authorization becomes `CLOSED_CANONICAL` may one later implementation candidate modify exactly:

```text
packages/kodac-runtime/src/remediation/p7-git-change-report-evidence-binding.ts
schema/p7-git-change-report-evidence-binding.schema.json
packages/kodac-runtime/test/p7-r11-git-change-report-evidence-binding.test.ts
```

No fourth path is authorized.

No predecessor source/schema/test, verification planner/engine/types, Done Gate, K5, K2, ExecutionGateway, filesystem adapter, Git adapter/tool, receipt type, receipt ledger, policy engine, CLI, workflow, dependency, lockfile, ADR, current-view, product, release, persistence, provider/model, ruleset, or historical evidence path may be modified by the later implementation.

---

## 6. Required future build input

The future build input must contain exactly:

```text
sourceWorkspaceReferenceEvidenceBinding
sourceWorkspaceReferenceEvidenceBindingInput
```

The canonical P7-R10 validator must be called with the exact predecessor/build input required to reconstruct the supplied R10 binding.

Through that nested input, the implementation must reach and canonically revalidate the exact R9, R8, R6, and earlier P7 predecessor chain rather than trusting duplicated caller claims.

No additional input is authorized.

Specifically prohibited inputs include:

```text
executionReceipt
receiptLedger
policyLedger
processEnv
environmentPreimage
gitDiffOutput
gitStatusOutput
stdout
stderr
workspacePath
filesystemHandle
Git command result
caller-injected status or completion fields
```

---

## 7. Exact R6 `git.diff` check eligibility

The exact canonically revalidated R6 report reachable through the R10 predecessor must satisfy:

```text
verificationReportPassed == true
verificationReport.passed == true
exactly one check.id == git.diff
check.category == diff
check.status == pass
```

The selected check must not be accepted merely because the report-level booleans are true.

Any missing, duplicate, wrong-category, or non-pass `git.diff` check must fail closed.

---

## 8. Exact canonical passing-summary contract

The selected check summary must match exactly this grammar:

```text
Workspace changes are evidenced (diffBytes=<DIFF>, statusBytes=<STATUS>).
```

Where each decimal count must:

```text
use canonical base-10 digits
be exactly "0" or a nonzero digit followed by zero or more digits
contain no sign
contain no leading zero when nonzero
parse to a finite non-negative safe integer
diffBytes <= 524288
statusBytes <= 262144
diffBytes + statusBytes > 0
```

These bounds mirror the current verification engine's explicit stdout budgets for the two git-read calls.

The counts remain historical report claims. The future contract must not state that it re-read Git output or independently recomputed either count.

Any summary wording drift, punctuation drift, whitespace drift, numeric grammar drift, unsafe integer, out-of-bound count, or zero/zero pass claim must fail closed.

---

## 9. Exact report-evidence reference contract

The selected `git.diff` check must contain exactly two evidence items.

Each item must contain exactly:

```text
kind
ref
```

Required semantics:

```text
kind == receipt
ref = bounded non-empty Unicode scalar string without control characters
digest field = ABSENT
receipt refs are distinct
```

No third evidence item is authorized. No duplicate ref is authorized. No digest-bearing receipt ref is authorized for this exact current engine-compatible check shape.

The future implementation may canonicalize the two refs by deterministic lexical ordering independent of caller/object insertion order inherited through predecessor data.

The future implementation must not label either receipt ref as `git.diff` or `git.status`: the normalized R6 report commits only two receipt references and does not independently bind which full receipt record belongs to which capability.

---

## 10. Deterministic output boundary

The future output must bind directly or through exact validated predecessor identities at least:

```text
version
state
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
gitChangeCheckSummary
gitDiffBytes
gitStatusBytes
gitChangeReceiptEvidence
gitChangeReceiptRefs
evidenceIdentity
```

`gitChangeReceiptEvidence` must preserve the exact normalized two-item report evidence set.

`gitChangeReceiptRefs` must be an exact deterministic projection of those two unique refs in canonical lexical order.

The final `evidenceIdentity` must deterministically bind every semantic output field. Returned output must be detached from caller mutation and deeply immutable.

---

## 11. Hostile-input and resource boundary

The future implementation must fail closed on at least:

```text
Proxy
accessor property
symbol property
custom prototype
sparse array
cyclic graph
aliased object graph where forbidden by existing P7 hostile-input discipline
unknown field
missing required field
invalid Unicode scalar sequence
control character in bounded text
oversized string
unsafe integer
negative zero
excessive object depth
excessive node count
```

Validation must remain bounded and comparable to existing P7 pure/data-only evidence contracts.

The implementation must reuse canonical predecessor validation rather than creating a weaker parallel trust path.

---

## 12. Required rejection cases

The later tests must reject at least:

```text
R10 predecessor tamper
R9 predecessor tamper
R8 predecessor tamper
R6 predecessor tamper
R6 report passed == false
git.diff check missing
git.diff check duplicated
git.diff category drift
git.diff status != pass
summary wording drift
summary whitespace or punctuation drift
diffBytes invalid decimal grammar
statusBytes invalid decimal grammar
negative count
leading-zero nonzero count
unsafe integer
diffBytes > 524288
statusBytes > 262144
diffBytes == 0 AND statusBytes == 0
evidence missing
evidence extra
evidence duplicate
evidence kind != receipt
evidence digest present
evidence ref empty
evidence ref invalid Unicode
evidence ref contains forbidden control character
receipt refs equal
caller-injected receipt record
caller-injected environment or command preimage
caller-injected Git output
caller-injected VERIFIED/FIXED/REVERIFIED/DoneGate/PROVEN_READY/completion fields
unknown/hostile object graph
```

---

## 13. Required non-equivalences

```text
R6_GIT_DIFF_PASS != GIT_CHANGE_REPORT_EVIDENCE_BOUND
GIT_CHANGE_REPORT_EVIDENCE_BOUND != GIT_DIFF_COMMAND_INTENT_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != GIT_STATUS_COMMAND_INTENT_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != HISTORICAL_PROCESS_ENVIRONMENT_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != EXECUTION_RECEIPT_AUTHENTICITY_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != RECEIPT_CAPABILITY_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != RECEIPT_INPUT_DIGEST_PREIMAGE_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != GIT_STDOUT_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != GIT_STDERR_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != GIT_OUTPUT_CONTENT_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != GIT_OUTPUT_DIGEST_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != GIT_DIFF_SEMANTIC_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != GIT_STATUS_SEMANTIC_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != CHANGED_PATH_SET_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != WORKSPACE_CLEANLINESS_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != RECEIPT_LEDGER_COMPLETENESS_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != POLICY_LEDGER_COMPLETENESS_PROOF
GIT_CHANGE_REPORT_EVIDENCE_BOUND != VERIFICATION_ENGINE_INVOCATION
GIT_CHANGE_REPORT_EVIDENCE_BOUND != VERIFICATION_EXECUTION_AUTHORITY
GIT_CHANGE_REPORT_EVIDENCE_BOUND != K2_INVOCATION
GIT_CHANGE_REPORT_EVIDENCE_BOUND != K2_APPROVAL
GIT_CHANGE_REPORT_EVIDENCE_BOUND != VERIFIED
GIT_CHANGE_REPORT_EVIDENCE_BOUND != FIXED
GIT_CHANGE_REPORT_EVIDENCE_BOUND != REVERIFIED
GIT_CHANGE_REPORT_EVIDENCE_BOUND != DONE_GATE
GIT_CHANGE_REPORT_EVIDENCE_BOUND != PROVEN_READY
GIT_CHANGE_REPORT_EVIDENCE_BOUND != AUTOFIX
GIT_CHANGE_REPORT_EVIDENCE_BOUND != PATCH_RETRY_AUTHORITY
P7_R11_CLOSED != SUCCESSOR_IMPLEMENTATION_AUTHORITY
P7_R11_CLOSED != P7_OVERALL_CLOSED
P7_R11_CLOSED != P8_AUTHORITY
P7_R11_CLOSED != PROJECT_COMPLETION
```

---

## 14. Required execution-surface prohibition

Production source for this unit must contain no invocation surface for:

```text
process.env
ExecutionReceipt input
receipt-ledger read
policy-ledger read
Git command or adapter
gitDiff
gitStatus
filesystem adapter
realpath
stat
RuntimeSession
BoundedAgentLoop
VerificationPlanner
runVerificationEngine
ExecutionGateway
K2
DoneGate
child process
network
provider/model
secret access
persistence/database/telemetry/upload/learning
patch application/retry/autofix
```

Imports of pure predecessor validators and pure verification-report evidence types are allowed only where required by this bounded data contract.

---

## 15. Why receipt and policy ledger completeness remain deferred

The live `evidence.receipts` and `evidence.policy` checks inspect the whole receipt ledger at verification time.

The current `JsonlReceiptLedger`/`readReceiptLedger` surface provides append/read behavior but no canonical complete-ledger snapshot identity, count commitment, terminal hash, manifest identity, or independently committed absence proof.

Existing P7 contracts independently bind selected receipts or report references, but they do not prove that no additional receipt existed in the historical ledger.

Therefore this authorization grants no receipt-ledger completeness, policy-ledger completeness, ledger instrumentation repair, or prospective verification rerun authority.

---

## 16. Required adversarial qualification

The later implementation tests must cover at least:

```text
valid R10 predecessor + exact passing canonical git.diff report shape -> deterministic state
same semantic input -> same identity
receipt-evidence source ordering does not alter canonical output/identity
one byte count change -> identity change
one receipt ref change -> identity change
R10/R9/R8/R6 tamper -> reject
wrong git.diff check category/status/cardinality -> reject
summary grammar/bounds/zero-zero drift -> reject
wrong evidence kind/cardinality/digest/ref uniqueness -> reject
hostile object graph -> reject
mutation-after-call cannot affect result
nested output deeply frozen
schema/runtime/test boundary agreement
production source contains no prohibited execution surface
```

Focused tests plus all repository-required exact-head CI must pass on one unchanged implementation head.

---

## 17. Qualification gate for this authorization

This authorization may merge only when one unchanged exact head proves:

```text
BASE == CURRENT_CANONICAL_MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
EXACT_PATH = docs/planning/KODAC_P7_R11_GIT_CHANGE_REPORT_EVIDENCE_BINDING_AUTHORIZATION_2026-09-06.md
REQUIRED_CI = TERMINAL_SUCCESS_OR_CANONICALLY_PROVEN_DOCS_ONLY_NON_APPLICABILITY
INTERNAL_SUBSTANTIVE_SEMANTIC_SECURITY_GOVERNANCE_INSPECTION = CLEAN
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
RULESET_20707483 = ACTIVE / SATISFIED / NO_BYPASS
WAIVER = NO
```

Any head/base/blob movement invalidates prior qualification.

Merge must use a normal guarded PR merge with the exact final qualified `expected_head_sha`. No direct write to `main`, force push, rebase, stale evidence reuse, or ruleset bypass is authorized.

---

## 18. Mandatory post-merge proof

The exact three-path implementation authority in section 5 becomes active only after post-merge proof verifies:

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

## 19. After implementation closure

After a later exact three-path R11 implementation independently qualifies, merges guarded, and receives complete post-merge proof:

1. run fresh repository-truth analysis;
2. determine whether current views require separate reconciliation authorization;
3. identify the next smallest independently provable remaining base-evidence gap;
4. prefer predecessor-committed report/set coherence over caller-supplied historical reconstruction;
5. if no independently committed historical evidence remains sufficient, fail closed rather than inventing retrospective proof;
6. do not infer any later P7 slice by numbering;
7. do not treat R11 as Git semantic proof, ledger completeness, Done Gate, finding closure, P7 overall closure, or project completion.

---

## 20. Explicit non-grants

```text
IMPLEMENTATION_BEFORE_AUTHORIZATION_POST_PROOF = NO
POST_R11_SUCCESSOR_IMPLEMENTATION = NO
CALLER_SUPPLIED_GIT_RECEIPT_RECORD = NO
HISTORICAL_PROCESS_ENVIRONMENT_CAPTURE = NO
ENVIRONMENT_DISCLOSURE = NO
GIT_COMMAND_INTENT_RECONSTRUCTION = NO
GIT_OUTPUT_RECONSTRUCTION = NO
GIT_DIFF_SEMANTIC_PROOF = NO
GIT_STATUS_SEMANTIC_PROOF = NO
RECEIPT_AUTHENTICITY_PROOF = NO
RECEIPT_LEDGER_COMPLETENESS_PROOF = NO
POLICY_LEDGER_COMPLETENESS_PROOF = NO
LEDGER_CONTRACT_REPAIR = NO
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
P8_P9_IMPLEMENTATION = NO
RELEASE_OR_PUBLICATION = NO
PROJECT_COMPLETION = NO
RULESET_BYPASS = NO
WAIVER = NO
```
