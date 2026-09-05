# Kodac Engineering Milestones

## Authority

This file is a current milestone ledger only. It does not authorize implementation, execution, release, provider/model access, persistence, learning, dependencies, benchmark execution, donor intake, public claims, successor work, merge, or project completion. Live GitHub, root `AGENTS.md`, accepted ADRs, and exact canonical authorization/evidence records remain authoritative.

---

## Current milestone ledger

| Milestone / gate | Status | Current boundary |
| --- | --- | --- |
| K0 / K1 | **CLOSED** | Architecture/governance foundation |
| K2 | **CLOSED** | Trusted side-effect execution boundary |
| K3 bounded R1-R6 | **CLOSED** | No later authority by numbering |
| KRI-R1 through KRI-R4 | **CLOSED_CANONICAL** | Reviewer-intelligence substrate |
| K4 bounded R1-R5 | **CLOSED_CANONICAL** | Bounded data-only scope |
| K5 bounded R1-R5 | **CLOSED_CANONICAL** | Proof-review scope; Done Gate unchanged |
| K6 bounded closeout | **CLOSED_CANONICAL** | No later authority by composition |
| P2-R1 through P2-R6 | **CLOSED_CANONICAL** | Bounded benchmark/evidence mechanisms |
| P2 overall | **OPEN** | General/public KodacBench not closed |
| P3 bounded R1-R17 engineering scope | **CLOSED_CANONICAL** | Aggregate bounded closeout only |
| P3 overall | **OPEN** | No overall promotion/default/superiority claim |
| P4 bounded R1-R2 engineering scope | **CLOSED_CANONICAL** | Aggregate bounded closeout only |
| P4 overall | **OPEN** | No overall closure |
| P5 bounded R1-R2 engineering scope | **CLOSED_CANONICAL** | #341 / proof `5551577054` |
| P5 post-closeout current-view reconciliation | **CLOSED_CANONICAL** | #343 / proof `5551673149` |
| P5-R3+ | **NOT_AUTHORIZED** | No authority by numbering/composition |
| P5 overall | **NOT_CLOSED** | Bounded closure is not overall closure |
| P6-R1 deterministic security finding foundation | **CLOSED_CANONICAL** | #345 / proof `5551884329` |
| P6 bounded R1 engineering scope | **CLOSED_CANONICAL** | #349 / proof `5552035602` |
| P6 post-closeout current-view reconciliation | **CLOSED_CANONICAL** | #351 / proof `5552175515` |
| P6-R2+ | **NOT_AUTHORIZED_BY_NUMBERING** | No authority by sequence |
| P6 overall | **NOT_CLOSED** | Bounded R1 closure is not overall closure |
| P7-R1 authorization | **CLOSED_CANONICAL** | #352 / proof `5552233040` |
| P7-R1 immutable patch proposal foundation | **CLOSED_CANONICAL** | #353 / proof `5552429216` |
| P7-R1 post-merge current-view reconciliation | **CLOSED_CANONICAL** | #355 / proof `5552575380` |
| P7-R2 patch-application authorization | **CLOSED_CANONICAL** | #356 / proof `5552630320` |
| P7-R2 patch-application authorization implementation | **CLOSED_CANONICAL** | #357 / proof `5552730805` |
| P7-R2 post-merge current-view reconciliation | **CLOSED_CANONICAL** | #359 / proof `5552811852` |
| P7-R3 pre-execution intent-binding authorization | **CLOSED_CANONICAL** | #360 / proof `5552924883` |
| P7-R3 pre-execution intent-binding implementation | **CLOSED_CANONICAL** | #361 / proof `5553018473` |
| P7-R3 current-view reconciliation authorization | **CLOSED_CANONICAL** | #362 / proof `5553049120` |
| P7-R3 post-merge current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| P7-R4+ | **NOT_AUTHORIZED_BY_NUMBERING** | No authority by sequence |
| P7 overall | **NOT_CLOSED** | P7-R3 closure is not overall closure |
| Patch application / remediation execution | **NOT_AUTHORIZED** | Pre-execution binding is data only |
| Filesystem / Git write | **NOT_AUTHORIZED** | No application authority exists |
| Repository write authority | **NONE** | No P7 side effects authorized |
| K2 invocation / authority expansion | **NOT_AUTHORIZED / NONE** | Existing K2 boundary unchanged |
| Applied / verification failed / verified | **NOT_ESTABLISHED** | No authorized application evidence exists |
| Fixed / reverified / Done Gate | **NOT_ESTABLISHED** | No lifecycle-completion evidence exists |
| Scanner/analyzer execution | **NOT_AUTHORIZED** | Pure/data-only P6-R1 only |
| SARIF ingestion | **NOT_AUTHORIZED** | Separate future authority required |
| Secret/network/exploit access | **NOT_AUTHORIZED** | No side-effect authority |
| New dependency/donor admission | **NONE** | Separate future authority required |
| P8-P9 | **IMPLEMENTATION NOT_AUTHORIZED** | Planning direction only |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical P7 anchors

```text
P7_R2_RECONCILIATION
  PR = #359
  MERGE = d74cf1379316ee9d5b121fbb7b536772ec7cea00
  PROOF = 5552811852
  STATE = CLOSED_CANONICAL

P7_R3_SUCCESSOR_ANALYSIS
  PR = #359
  COMMENT = 5552837458
  CLASS = ANALYSIS_ONLY

P7_R3_AUTHORIZATION
  PR = #360
  QUALIFIED_HEAD = b896cf3538196dfe57231983bb8ee86b579027ea
  MERGE = a2ddc989857294b92913a354a8a129ecf331f2ed
  PROOF = 5552924883
  STATE = CLOSED_CANONICAL

P7_R3_IMPLEMENTATION
  PR = #361
  QUALIFIED_HEAD = c79b02be006697bd1dddfe326dfae26e4b3f5c10
  MERGE = 4f464286443d4298f78b5bcc873aa2c4203054b9
  PROOF = 5553018473
  STATE = CLOSED_CANONICAL

P7_R3_RECONCILIATION_ANALYSIS
  PR = #361
  COMMENT = 5553023397
  CLASS = ANALYSIS_ONLY

P7_R3_RECONCILIATION_AUTHORIZATION
  PR = #362
  QUALIFIED_HEAD = ef82a7f76380fe03e3f00a457d3a27812322eaa8
  MERGE = 1acf7f8c920f59bf4187a8e4072c808b7479f51d
  PROOF = 5553049120
  STATE = CLOSED_CANONICAL

RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

---

## Canonical P7-R3 implementation identities

```text
P7-R3 source = 53119aded3de7c945967248e5ec19196bf03e2c7
P7-R3 schema = 74852ac9141f28466c7a3902df7441b876bd919d
P7-R3 test = 011a7e53f10da80138ac8f4cc06a33c505c38fb0
```

The current reconciliation may not modify those bytes.

---

## Bounded P7-R3 semantics

```text
P7-R3
= pure/data-only immutable pre-execution binding
+ one exact valid P7-R1 proposal
+ one exact valid matching P7-R2 authorization
+ exact inert patch bytes within 1_048_576 UTF-8 bytes
+ exact SHA-256 patch-artifact equality
+ canonical pure patch parsing
+ no move semantics
+ exact path/operation equality
+ deterministic content-addressed identity
+ detached/deeply immutable output
```

It does not apply the patch or advance any lifecycle state.

Required non-equivalences:

```text
PRE_EXECUTION_BINDING != PATCH_APPLICATION
PRE_EXECUTION_BINDING != K2_EXECUTION
PRE_EXECUTION_BINDING != GENERIC_K2_ONE_SHOT_APPROVAL
PRE_EXECUTION_BINDING != APPLIED
PRE_EXECUTION_BINDING != VERIFICATION_FAILED
PRE_EXECUTION_BINDING != VERIFIED
PRE_EXECUTION_BINDING != FIXED
PRE_EXECUTION_BINDING != REVERIFIED
PRE_EXECUTION_BINDING != DONE_GATE
PRE_EXECUTION_BINDING != AUTOFIX
PATCH_DIGEST_MATCH != PATCH_SEMANTIC_CORRECTNESS
WRITE_ALLOWLIST_MATCH != EXECUTED_WRITE_SET
P7-R3 CLOSED != P7-R4+ AUTHORITY
P7-R3 CLOSED != P7 OVERALL CLOSED
P7-R3 CLOSED != P8 AUTHORITY
P7-R3 CLOSED != PROJECT COMPLETION
```

---

## Preserved authority boundaries

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
P7-R4+ = NOT_AUTHORIZED_BY_NUMBERING
PATCH_APPLICATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_INVOCATION = NOT_AUTHORIZED
K2_AUTHORITY_EXPANSION = NONE
REVIEWER / CRITIC / VERIFIER / PROVIDER / MODEL EXECUTION EXPANSION = NOT_AUTHORIZED
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
KRI / K5 / K2 AUTHORITY MUTATION = NOT_AUTHORIZED
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
PUBLIC SUPERIORITY / BEST-IN-CLASS CLAIM = NOT_AUTHORIZED
P8-P9 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Current candidate gate

Canonical #362 / proof `5553049120` authorizes exactly the five current-view paths and no sixth path. This candidate cannot self-certify its own closure.

After guarded merge and complete post-merge proof, run fresh successor-authority analysis. Do not infer P7-R4, patch execution, K2 invocation, lifecycle advancement, P8/P9, release, or project completion.
