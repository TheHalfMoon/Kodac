# Kodac P7-R10 — Workspace Reference Evidence Binding Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-06  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = a083043c0527240159c17333c40cc28f358d4bae
P7_R9_AGENT_COMPLETION_EVIDENCE_BINDING = CLOSED_CANONICAL / PR #389 / proof 5558925165
P7_R9_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #391 / proof 5559029920
POST_R9_SUCCESSOR_ANALYSIS = PR #391 / comment 5559072672 / ANALYSIS_ONLY
P7_R9_STATE = AGENT_COMPLETION_EVIDENCE_BOUND_ONLY
POST_R9_SUCCESSOR_IMPLEMENTATION = NOT_AUTHORIZED_BY_NUMBERING
P7_OVERALL = NOT_CLOSED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The `P7-R10` label is descriptive only. It creates no authority by numbering. Any later implementation authority exists only if this exact authorization candidate independently qualifies, merges guarded, and receives complete post-merge proof.

This candidate is documentation-only and creates no implementation authority before that proof.

---

## 2. Why `VERIFIED` is still not justified

The current Done Gate requires:

```text
agent.completed
workspace.integrity
git.diff
evidence.receipts
evidence.policy
verification.commands
```

Canonical P7-R8 independently binds the exact planned verification-command success receipts. Canonical P7-R9 independently binds the exact supplied canonical event evidence behind `agent.completed`.

The remaining independently unclosed base-evidence surfaces are:

```text
workspace.integrity
git.diff
evidence.receipts
evidence.policy
```

The current verification engine computes a passing `workspace.integrity` result from live `realpath/stat` observations and emits:

```text
kind = workspace
ref = realpath(workspace)
digest = sha256(realpath(workspace))
```

The persisted digest is a digest of the root-path string only. It is not a digest of filesystem contents or metadata and is not a historical filesystem-integrity attestation.

The smallest independently provable successor is therefore only the historical report reference/digest linkage already carried through the exact R6 report lineage.

---

## 3. Bounded future state

A later implementation may establish only:

```text
STATE = WORKSPACE_REFERENCE_EVIDENCE_BOUND
```

Exact meaning:

> One exact canonically revalidated P7-R9 predecessor reaches one exact passing P7-R6 `workspace.integrity` check with category `workspace` and exactly one workspace evidence item whose bounded historical `ref` is deterministically linked by `digest == sha256(ref)`.

This state establishes only the supplied historical workspace-reference evidence linkage.

It does **not** establish historical `realpath/stat` execution, root existence, `.git` existence, filesystem contents, metadata continuity, workspace cleanliness, Git state completeness, present workspace truth, `VERIFIED`, Done Gate, finding closure, or project completion.

---

## 4. Conditional future implementation allowlist

Only after this authorization becomes `CLOSED_CANONICAL` may one later implementation candidate modify exactly:

```text
packages/kodac-runtime/src/remediation/p7-workspace-reference-evidence-binding.ts
schema/p7-workspace-reference-evidence-binding.schema.json
packages/kodac-runtime/test/p7-r10-workspace-reference-evidence-binding.test.ts
```

No fourth path is authorized.

No predecessor source/schema/test, verification planner/engine/types, Done Gate, K5, K2, ExecutionGateway, filesystem adapter, Git adapter, receipt ledger, policy engine, CLI, workflow, dependency, lockfile, ADR, current-view, product, release, persistence, provider/model, ruleset, or historical evidence path may be modified by the later implementation.

---

## 5. Required future build input

The future build input must contain exactly:

```text
sourceAgentCompletionEvidenceBinding
sourceAgentCompletionEvidenceBindingInput
```

The canonical P7-R9 validator must be called with the exact predecessor/build input required to reconstruct the supplied R9 binding. Through that nested input, the implementation must canonically revalidate the exact R8 and R6 predecessors rather than trusting duplicated caller claims.

No live workspace path, filesystem handle, Git command result, receipt ledger, environment preimage, provider result, or caller-injected status field is authorized as an additional input.

---

## 6. Exact R6 workspace-check linkage

The exact canonically revalidated R6 report reachable through the R9 predecessor must satisfy:

```text
verificationReportPassed == true
verificationReport.passed == true
exactly one check id == workspace.integrity
check.category == workspace
check.status == pass
```

The selected check must contain exactly one evidence item:

```text
kind = workspace
ref = bounded non-empty Unicode scalar string without control characters
digest = present lowercase SHA-256
```

Required digest semantics:

```text
digest == sha256(ref UTF-8 bytes)
```

No path grammar beyond the exact historical bounded string is authorized. The current engine may produce platform-specific canonical real paths; this unit must not invent a POSIX-only, Windows-only, case-normalization, separator-normalization, symlink, drive-letter, or filesystem canonicality claim.

Any missing, duplicate, extra, wrong-kind, digest-absent, malformed-digest, or digest-mismatch evidence entry must fail closed.

---

## 7. Deterministic identity and output boundary

The future output must bind directly or through exact validated predecessor identities at least:

```text
version
state
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
workspaceCheckSummary
workspaceCheckEvidence
workspaceReference
workspaceReferenceDigest
evidenceIdentity
```

`workspaceCheckEvidence` must preserve the exact normalized single historical workspace evidence item. `workspaceReference` and `workspaceReferenceDigest` must be exact projections of that item.

The final `evidenceIdentity` must deterministically bind every semantic output field. Returned output must be detached from caller mutation and deeply immutable.

---

## 8. Hostile-input and resource boundary

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
unsafe integer where integers are accepted through predecessor validation
excessive object depth
excessive node count
```

Validation must remain bounded and comparable to existing P7 pure/data-only evidence contracts.

---

## 9. Required rejection cases

The later tests must reject at least:

```text
R9 predecessor tamper
R8 predecessor tamper
R6 predecessor tamper
R6 report passed == false
workspace.integrity check missing
workspace.integrity check duplicated
workspace.integrity category drift
workspace.integrity status != pass
workspace evidence missing
workspace evidence extra/duplicate
workspace evidence kind != workspace
workspace evidence ref empty
workspace evidence ref invalid Unicode
workspace evidence ref contains forbidden control character
workspace evidence digest absent
workspace evidence digest malformed
workspace evidence digest != sha256(ref)
caller-injected WORKSPACE_INTEGRITY_PROOF/VERIFIED/FIXED/REVERIFIED/DoneGate/PROVEN_READY/completion fields
unknown/hostile object graph
```

---

## 10. Required non-equivalences

```text
R6_WORKSPACE_INTEGRITY_PASS != WORKSPACE_REFERENCE_EVIDENCE_BOUND
WORKSPACE_REFERENCE_DIGEST_MATCH != WORKSPACE_INTEGRITY_PROOF
WORKSPACE_REFERENCE_EVIDENCE_BOUND != HISTORICAL_REALPATH_STAT_PROOF
WORKSPACE_REFERENCE_EVIDENCE_BOUND != ROOT_EXISTENCE_PROOF
WORKSPACE_REFERENCE_EVIDENCE_BOUND != GIT_METADATA_EXISTENCE_PROOF
WORKSPACE_REFERENCE_EVIDENCE_BOUND != FILESYSTEM_CONTENT_INTEGRITY_PROOF
WORKSPACE_REFERENCE_EVIDENCE_BOUND != WORKSPACE_SNAPSHOT_PROOF
WORKSPACE_REFERENCE_EVIDENCE_BOUND != WORKSPACE_CLEANLINESS_PROOF
WORKSPACE_REFERENCE_EVIDENCE_BOUND != GIT_DIFF_SEMANTIC_PROOF
WORKSPACE_REFERENCE_EVIDENCE_BOUND != RECEIPT_LEDGER_COMPLETENESS_PROOF
WORKSPACE_REFERENCE_EVIDENCE_BOUND != POLICY_LEDGER_COMPLETENESS_PROOF
WORKSPACE_REFERENCE_EVIDENCE_BOUND != VERIFICATION_ENGINE_INVOCATION
WORKSPACE_REFERENCE_EVIDENCE_BOUND != VERIFICATION_EXECUTION_AUTHORITY
WORKSPACE_REFERENCE_EVIDENCE_BOUND != K2_INVOCATION
WORKSPACE_REFERENCE_EVIDENCE_BOUND != K2_APPROVAL
WORKSPACE_REFERENCE_EVIDENCE_BOUND != VERIFIED
WORKSPACE_REFERENCE_EVIDENCE_BOUND != FIXED
WORKSPACE_REFERENCE_EVIDENCE_BOUND != REVERIFIED
WORKSPACE_REFERENCE_EVIDENCE_BOUND != DONE_GATE
WORKSPACE_REFERENCE_EVIDENCE_BOUND != PROVEN_READY
WORKSPACE_REFERENCE_EVIDENCE_BOUND != AUTOFIX
WORKSPACE_REFERENCE_EVIDENCE_BOUND != PATCH_RETRY_AUTHORITY
P7_R10_CLOSED != SUCCESSOR_IMPLEMENTATION_AUTHORITY
P7_R10_CLOSED != P7_OVERALL_CLOSED
P7_R10_CLOSED != P8_AUTHORITY
P7_R10_CLOSED != PROJECT_COMPLETION
```

---

## 11. Required execution-surface prohibition

Production source for this unit must contain no invocation surface for:

```text
realpath
stat
filesystem adapters
Git adapters or commands
RuntimeSession
BoundedAgentLoop
VerificationPlanner
runVerificationEngine
ExecutionGateway
receipt-ledger reads
policy-engine execution
K2
DoneGate
child process
network
provider/model
secret access
persistence/database/telemetry/upload/learning
patch application/retry/autofix
```

Imports of pure predecessor validators and pure type definitions are allowed only where required by the bounded data contract.

---

## 12. Why `git.diff` is deferred

The live verification `git.diff` check obtains both `git.diff` and `git.status` receipts through `ExecutionGateway.runReadOnlyCommand`.

The receipt input digest is derived from a serialized execution preimage containing:

```text
executable
args
allowedExitCodes
maxOutputBytes
timeoutMs
env
```

The verification read gateway supplies no bounded explicit environment override, so exact retrospective intent reconstruction would require the historical canonicalized process environment. That preimage is not presently bound by P7 and may contain environment-specific or sensitive values.

This authorization therefore grants no `git.diff` evidence binding, environment capture, environment disclosure, intent relaxation, receipt trust shortcut, or gateway change.

---

## 13. Why receipt/policy ledger completeness is deferred

The live `evidence.receipts` and `evidence.policy` checks inspect the whole receipt ledger. Existing P7 evidence independently binds particular receipts, but no canonical complete-ledger snapshot, manifest, count commitment, terminal ledger identity, or equivalent absence proof is currently established.

This authorization therefore grants no receipt-ledger or policy-ledger completeness claim and no ledger contract repair.

---

## 14. Required adversarial qualification

The later implementation tests must cover at least:

```text
valid R9 predecessor + exact R6 workspace reference evidence -> deterministic state
same semantic input -> same identity
workspace ref change with matching digest -> identity change
workspace ref change without matching digest -> reject
R9/R8/R6 tamper -> reject
wrong workspace check category/status/cardinality -> reject
wrong evidence kind/cardinality/digest -> reject
hostile object graph -> reject
mutation-after-call cannot affect result
nested output deeply frozen
schema/runtime/test boundary agreement
production source contains no prohibited execution surface
```

Focused tests plus all repository-required exact-head CI must pass on one unchanged implementation head.

---

## 15. Qualification gate for this authorization

This authorization may merge only when one unchanged exact head proves:

```text
BASE == CURRENT_CANONICAL_MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
EXACT_PATH = docs/planning/KODAC_P7_R10_WORKSPACE_REFERENCE_EVIDENCE_BINDING_AUTHORIZATION_2026-09-06.md
REQUIRED_CI = TERMINAL_SUCCESS_OR_CANONICALLY_PROVEN_DOCS_ONLY_NON_APPLICABILITY
INTERNAL_SUBSTANTIVE_SEMANTIC_SECURITY_GOVERNANCE_INSPECTION = CLEAN
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
RULESET_20707483 = ACTIVE / SATISFIED / NO_BYPASS
WAIVER = NO
```

Any head/base/blob movement invalidates prior qualification. Merge must use a normal guarded PR merge with the exact final qualified `expected_head_sha`.

---

## 16. Mandatory post-merge proof

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

## 17. After implementation closure

After a later exact three-path implementation independently qualifies, merges guarded, and receives complete post-merge proof:

1. run fresh repository-truth analysis;
2. determine whether current views need separate reconciliation authorization;
3. determine the next smallest independently provable remaining base-evidence gap toward `VERIFIED`;
4. do not infer any later P7 slice by numbering;
5. do not treat workspace-reference evidence as filesystem integrity, Git diff semantics, ledger completeness, Done Gate, finding closure, or project completion.

---

## 18. Explicit non-grants

```text
IMPLEMENTATION_BEFORE_AUTHORIZATION_POST_PROOF = NO
POST_R10_SUCCESSOR_IMPLEMENTATION = NO
WORKSPACE_INTEGRITY_PROOF = NO
HISTORICAL_REALPATH_STAT_PROOF = NO
FILESYSTEM_CONTENT_INTEGRITY_PROOF = NO
GIT_DIFF_SEMANTIC_PROOF = NO
RECEIPT_LEDGER_COMPLETENESS_PROOF = NO
POLICY_LEDGER_COMPLETENESS_PROOF = NO
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
ENVIRONMENT_CAPTURE_OR_DISCLOSURE = NO
NETWORK_ACCESS = NO
SECRET_ACCESS = NO
PROVIDER_MODEL_INVOCATION = NO
P8_P9_IMPLEMENTATION = NO
RELEASE_OR_PUBLICATION = NO
PROJECT_COMPLETION = NO
RULESET_BYPASS = NO
WAIVER = NO
```
