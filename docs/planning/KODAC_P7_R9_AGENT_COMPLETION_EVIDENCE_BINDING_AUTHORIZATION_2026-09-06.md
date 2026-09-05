# Kodac P7-R9 — Agent Completion Evidence Binding Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-06  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 25fda2aa63bcd6508ed21c5db9847478a49d9763
P7_R8_VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BINDING = CLOSED_CANONICAL / PR #385 / proof 5555449960
P7_R8_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #387 / proof 5555510161
P7_R9_SUCCESSOR_ANALYSIS = PR #387 / comment 5555523272 / ANALYSIS_ONLY
P7_R8_STATE = VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND_ONLY
P7_R9_PLUS = NOT_AUTHORIZED_BY_NUMBERING
P7_OVERALL = NOT_CLOSED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The `P7-R9` label is descriptive only. Authority, if any, comes only from this exact record after its own qualification, guarded merge, and post-merge proof.

This authorization candidate is documentation-only and creates no implementation authority before that proof.

---

## 2. Why `VERIFIED` is still not justified

The current Done Gate requires six checks:

```text
agent.completed
workspace.integrity
git.diff
evidence.receipts
evidence.policy
verification.commands
```

P7-R8 independently closes only the planned-command success-receipt evidence gap. It does not independently revalidate the remaining base-check evidence.

The current verification engine maps a caller-provided `agentCompleted` boolean to:

```text
id = agent.completed
category = agent
status = pass
evidence = [{ kind: event, ref: session:<sessionId>:agent.loop.completed }]
```

That report reference does not by itself revalidate the exact underlying canonical event object.

The repository has a canonical durable event protocol (`kodac.event` version 1), and the bounded agent loop emits `agent.loop.completed` on its normal completed terminal path with `reason = completed` and a budget snapshot.

The minimum non-overclaiming successor therefore closes only this event-evidence gap.

---

## 3. Bounded future state

A later implementation may establish only:

```text
STATE = AGENT_COMPLETION_EVIDENCE_BOUND
```

Exact meaning:

> One exact canonically revalidated P7-R8 predecessor contains a passing exact R6 `agent.completed` check, and that check is independently linked to one supplied hostile-input-validated canonical `kodac.event` v1 `agent.loop.completed` event from the same exact verification session, with normal-completion payload semantics and bounded completion-budget evidence.

This state establishes only the bounded supplied completion-event evidence linkage.

It does **not** establish complete session-event-log history, workspace integrity, Git diff completeness, receipt-ledger completeness, policy-ledger completeness, `VERIFIED`, finding closure, Done Gate, or project completion.

---

## 4. Conditional future implementation allowlist

Only after this authorization becomes `CLOSED_CANONICAL` may one later implementation candidate modify exactly:

```text
packages/kodac-runtime/src/remediation/p7-agent-completion-evidence-binding.ts
schema/p7-agent-completion-evidence-binding.schema.json
packages/kodac-runtime/test/p7-r9-agent-completion-evidence-binding.test.ts
```

No fourth path is authorized.

No predecessor source/schema/test, agent loop, session runtime, event protocol, verification planner/engine/types, Done Gate, K5, K2, ExecutionGateway, ledger, CLI, workflow, dependency, lockfile, ADR, current-view, product, release, persistence, provider/model, ruleset, or historical evidence path may be modified by the later implementation.

---

## 5. Required future build input

The future build input must contain exactly:

```text
sourceCommandSuccessEvidenceBinding
sourceCommandSuccessEvidenceBindingInput
agentCompletionEvent
```

The canonical P7-R8 validator must be called with the exact predecessor/build input required to reconstruct the supplied R8 binding. Through that validator, the exact R7/R6/R5/R4 predecessor lineage must be reached canonically rather than trusting duplicated caller claims.

`agentCompletionEvent` is supplied historical data only. The implementation must not query a live `RuntimeSession`, read an event file, emit an event, or invoke the agent loop.

---

## 6. Exact R6 report-check linkage

The canonically revalidated R6 report reachable through the R8 predecessor must satisfy:

```text
verificationReportPassed == true
verificationReport.passed == true
exactly one check id == agent.completed
check.category == agent
check.status == pass
check.evidence is a dense non-empty bounded array
exact semantic event ref == session:<verificationSessionId>:agent.loop.completed
```

For the current engine-compatible `agent.completed` surface, the selected check must contain exactly one evidence item:

```text
kind = event
ref = session:<verificationSessionId>:agent.loop.completed
digest = absent
```

Any missing, duplicate, extra, wrong-kind, wrong-session, wrong-ref, or digest-bearing evidence entry must fail closed.

---

## 7. Canonical completion-event boundary

The supplied event must be independently validated as a hostile object graph and contain exactly:

```text
protocol
a version field
eventId
sessionId
sequence
emittedAt
type
payload
```

The actual version property name is the canonical event protocol field `version`; no alias is authorized.

Required outer semantics:

```text
protocol == kodac.event
version == 1
eventId == canonical lowercase UUID v4
sessionId == exact R8 verificationSessionId
sequence == positive safe integer
emittedAt == canonical UTC millisecond timestamp
type == agent.loop.completed
emittedAt <= exact R8 verificationStartedAt
```

The event must not be treated as proof of all preceding session events. No event-chain or event-log completeness claim is authorized by this unit.

---

## 8. Exact normal-completion payload boundary

The `agent.loop.completed` payload must contain exactly:

```text
reason
budget
```

Required semantics:

```text
reason == completed
```

`budget` must contain exactly:

```text
turnsUsed
toolCallsUsed
failuresUsed
elapsedMs
```

Each budget value must be a non-negative safe integer. `turnsUsed` must be at least 1 for a completed bounded agent loop.

No caller-injected lifecycle, verification, Done Gate, authorization, model/provider, completion, or project-status field is permitted.

This contract validates the supplied terminal event shape only. It does not reconstruct all turns, tool calls, failures, or elapsed-time provenance from the complete event stream.

---

## 9. Deterministic identity and output boundary

The future output must bind directly or through exact validated predecessor identities at least:

```text
version
state
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
agentCompletionCheckSummary
agentCompletionCheckEvidence
agentCompletionEventIdentity
agentCompletionEventId
agentCompletionEventSequence
agentCompletionEventEmittedAt
agentCompletionReason
agentCompletionBudget
  turnsUsed
  toolCallsUsed
  failuresUsed
  elapsedMs
evidenceIdentity
```

`agentCompletionEventIdentity` must be deterministic SHA-256 over one explicitly documented canonical serialized normalized event preimage. The final `evidenceIdentity` must bind every semantic output field.

Returned output must be detached from caller mutation and deeply immutable.

---

## 10. Hostile-input and resource boundary

The future implementation must fail closed on at least:

```text
Proxy
accessor property
symbol property
custom prototype
sparse array
cyclic graph
aliased object graph where forbidden by the existing hostile-input discipline
unknown field
missing required field
invalid Unicode scalar sequence
oversized string
unsafe integer
excessive object depth
excessive node count
```

The implementation must use bounded validation comparable to the existing P7 hostile-input contracts and must not create an unbounded recursive or serialization surface.

---

## 11. Required rejection cases

The later tests must reject at least:

```text
R8 predecessor tamper
R6 predecessor tamper
R6 report passed == false
agent.completed check missing
agent.completed check duplicated
agent.completed category drift
agent.completed status != pass
agent.completed evidence missing
agent.completed evidence extra/duplicate
agent.completed evidence kind != event
agent.completed evidence ref wrong session
agent.completed evidence ref wrong type
agent.completed evidence digest present
event protocol drift
event version drift
eventId invalid UUID v4
event session mismatch
event sequence zero/negative/unsafe
event emittedAt invalid or after verification start
event type != agent.loop.completed
payload missing/extra field
payload reason != completed
budget missing/extra field
budget negative/unsafe/non-integer
turnsUsed == 0
caller-injected VERIFIED/FIXED/REVERIFIED/DoneGate/PROVEN_READY/completion fields
unknown/hostile object graph
```

---

## 12. Required non-equivalences

```text
R6_AGENT_COMPLETED_PASS != AGENT_COMPLETION_EVIDENCE_BOUND
AGENT_COMPLETION_EVENT_REFERENCE != AGENT_COMPLETION_EVIDENCE_BOUND
AGENT_COMPLETION_EVIDENCE_BOUND != COMPLETE_SESSION_EVENT_LOG_PROOF
AGENT_COMPLETION_EVIDENCE_BOUND != AGENT_TURN_HISTORY_RECONSTRUCTION
AGENT_COMPLETION_EVIDENCE_BOUND != WORKSPACE_INTEGRITY_PROOF
AGENT_COMPLETION_EVIDENCE_BOUND != GIT_DIFF_SEMANTIC_PROOF
AGENT_COMPLETION_EVIDENCE_BOUND != RECEIPT_LEDGER_COMPLETENESS_PROOF
AGENT_COMPLETION_EVIDENCE_BOUND != POLICY_LEDGER_COMPLETENESS_PROOF
AGENT_COMPLETION_EVIDENCE_BOUND != VERIFICATION_ENGINE_INVOCATION
AGENT_COMPLETION_EVIDENCE_BOUND != VERIFICATION_EXECUTION_AUTHORITY
AGENT_COMPLETION_EVIDENCE_BOUND != K2_INVOCATION
AGENT_COMPLETION_EVIDENCE_BOUND != K2_APPROVAL
AGENT_COMPLETION_EVIDENCE_BOUND != VERIFIED
AGENT_COMPLETION_EVIDENCE_BOUND != FIXED
AGENT_COMPLETION_EVIDENCE_BOUND != REVERIFIED
AGENT_COMPLETION_EVIDENCE_BOUND != DONE_GATE
AGENT_COMPLETION_EVIDENCE_BOUND != PROVEN_READY
AGENT_COMPLETION_EVIDENCE_BOUND != AUTOFIX
AGENT_COMPLETION_EVIDENCE_BOUND != PATCH_RETRY_AUTHORITY
P7_R9_CLOSED != P7_R10_PLUS_AUTHORITY
P7_R9_CLOSED != P7_OVERALL_CLOSED
P7_R9_CLOSED != P8_AUTHORITY
P7_R9_CLOSED != PROJECT_COMPLETION
```

---

## 13. Required execution-surface prohibition

Production source for this unit must contain no invocation surface for:

```text
RuntimeSession.emit
RuntimeSession.eventsSnapshot
BoundedAgentLoop
VerificationPlanner
runVerificationEngine
ExecutionGateway
K2
DoneGate
filesystem
Git
child process
network
provider/model
secret access
persistence/database/telemetry/upload/learning
patch application/retry/autofix
```

Imports of pure type definitions or pure predecessor validators are allowed only where needed by the bounded data contract.

---

## 14. Required adversarial qualification

The later implementation tests must cover at least:

```text
valid R8 predecessor + exact canonical completion event -> deterministic state
same semantic event/input -> same identities
any semantic event field change -> identity change or rejection as appropriate
R8/R6 tamper -> reject
wrong report-check linkage -> reject
wrong event session/type/time/payload -> reject
hostile object graph -> reject
mutation-after-call cannot affect result
nested output deeply frozen
schema/runtime/test boundary agreement
production source contains no prohibited execution surface
```

Focused tests plus all repository-required CI must pass on one unchanged exact implementation head.

---

## 15. Qualification gate for this authorization

This authorization may merge only when one unchanged exact head proves:

```text
BASE == CURRENT_CANONICAL_MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
EXACT_PATH = docs/planning/KODAC_P7_R9_AGENT_COMPLETION_EVIDENCE_BINDING_AUTHORIZATION_2026-09-06.md
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
4. do not infer P7-R10+ by numbering;
5. do not treat agent-completion evidence as workspace/Git/ledger completeness, Done Gate, finding closure, or product completion.

---

## 18. Explicit non-grants

```text
IMPLEMENTATION_BEFORE_AUTHORIZATION_POST_PROOF = NO
P7_R10_PLUS_IMPLEMENTATION = NO
VERIFIED_STATE = NO
FIXED_STATE = NO
REVERIFIED_STATE = NO
PROVEN_READY = NO
DONE_GATE_INVOCATION_OR_MUTATION = NO
COMPLETE_SESSION_EVENT_LOG_PROOF = NO
WORKSPACE_INTEGRITY_PROOF = NO
GIT_DIFF_SEMANTIC_PROOF = NO
RECEIPT_LEDGER_COMPLETENESS_PROOF = NO
POLICY_LEDGER_COMPLETENESS_PROOF = NO
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
