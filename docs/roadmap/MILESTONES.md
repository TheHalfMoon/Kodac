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
| P7-R3 post-merge current-view reconciliation | **CLOSED_CANONICAL** | #363 / proof `5553345846` |
| P7-R4 applied-patch-evidence-binding authorization | **CLOSED_CANONICAL** | #364 / proof `5553391471` |
| P7-R4 applied-patch-evidence-binding implementation | **CLOSED_CANONICAL** | #365 / proof `5553509882` |
| P7-R4 current-view reconciliation authorization | **CLOSED_CANONICAL** | #366 / proof `5553556112` |
| P7-R4 post-merge current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| P7-R5+ | **NOT_AUTHORIZED_BY_NUMBERING** | No authority by sequence |
| P7 overall | **NOT_CLOSED** | P7-R4 closure is not overall closure |
| Patch application / remediation execution | **NOT_AUTHORIZED** | Applied evidence is data only |
| Filesystem / Git write | **NOT_AUTHORIZED** | No application authority exists |
| Repository write authority | **NONE** | No P7 side effects authorized |
| K2 invocation / authority expansion | **NOT_AUTHORIZED / NONE** | Existing K2 boundary unchanged |
| Applied evidence only | **ESTABLISHED_BY_P7_R4_CONTRACT** | No actual execution claim is created by fixture tests |
| Verification failed / verified | **NOT_ESTABLISHED** | No separately authorized verification evidence exists |
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
P7_R3_RECONCILIATION
  PR = #363
  MERGE = 0713d1f17d65f6dd8be0408f017c053021b575f5
  PROOF = 5553345846
  STATE = CLOSED_CANONICAL

P7_R4_SUCCESSOR_ANALYSIS
  PR = #363
  COMMENT = 5553366154
  CLASS = ANALYSIS_ONLY

P7_R4_AUTHORIZATION
  PR = #364
  MERGE = 34d975eb752a634c7a6445161972ffb81671a731
  PROOF = 5553391471
  STATE = CLOSED_CANONICAL

P7_R4_IMPLEMENTATION
  PR = #365
  QUALIFIED_HEAD = f162f9531a33c61bde93f42d3c7307f2c6124e1e
  MERGE = 6c10d898ea43fda9003de761badd07c5b113043d
  PROOF = 5553509882
  STATE = CLOSED_CANONICAL

P7_R4_RECONCILIATION_ANALYSIS
  PR = #365
  COMMENT = 5553524060
  CLASS = ANALYSIS_ONLY

P7_R4_RECONCILIATION_AUTHORIZATION
  PR = #366
  QUALIFIED_HEAD = fd840fbc5b3d383218d2fbebff6695b1b93180d8
  MERGE = 378005971f3cd9fe5ddc9efdc237e93c34d63fe3
  PROOF = 5553556112
  STATE = CLOSED_CANONICAL

RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

---

## Canonical P7-R4 implementation identities

```text
P7-R4 source = eb25540f83e4b7a817f190618f9daae5839130f2
P7-R4 schema = e1b11582559bd574d0159b68e95c1b258bd6e1c5
P7-R4 test = 391488f1e2ce24ccaa2646ddeb520af4e1c520da
```

The current reconciliation may not modify those bytes.

---

## Bounded P7-R4 semantics

```text
P7-R4
= pure/data-only immutable applied-patch evidence binding
+ one exact valid P7-R1 proposal
+ one exact valid matching P7-R2 authorization
+ one exact valid matching P7-R3 pre-execution binding
+ exact inert patch text
+ one supplied strictly validated successful existing repo.apply_patch receipt
+ exact receipt digest/path/affected-operation equality
+ allow policy
+ canonical receipt identity/timestamps/post-state digest
+ validated optional approval/confinement evidence when present
+ deterministic content-addressed identity
+ detached/deeply immutable output
```

It does not apply the patch, invoke K2, run verification, or advance beyond the contract state `APPLIED`.

P7-R4 tests use fixture receipts as contract-test data only and do not prove actual remediation execution.

Required non-equivalences:

```text
APPLIED_EVIDENCE_BINDING != PATCH_APPLICATION
APPLIED_EVIDENCE_BINDING != K2_EXECUTION
APPLIED_EVIDENCE_BINDING != K2_APPROVAL
APPLIED_EVIDENCE_BINDING != VERIFICATION
APPLIED_EVIDENCE_BINDING != VERIFICATION_FAILED
APPLIED_EVIDENCE_BINDING != VERIFIED
APPLIED_EVIDENCE_BINDING != FIXED
APPLIED_EVIDENCE_BINDING != REVERIFIED
APPLIED_EVIDENCE_BINDING != DONE_GATE
APPLIED_EVIDENCE_BINDING != AUTOFIX
SUCCESSFUL_EXECUTION_RECEIPT != COMPLETE_CORRECTNESS
POST_STATE_DIGEST != VERIFIED_REMEDIATION
P7-R4 CLOSED != P7-R5+ AUTHORITY
P7-R4 CLOSED != P7 OVERALL CLOSED
P7-R4 CLOSED != P8 AUTHORITY
P7-R4 CLOSED != PROJECT COMPLETION
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
P7-R5+ = NOT_AUTHORIZED_BY_NUMBERING
PATCH_APPLICATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_INVOCATION = NOT_AUTHORIZED
K2_APPROVAL_CREATION = NOT_AUTHORIZED
K2_AUTHORITY_EXPANSION = NONE
VERIFICATION_EXECUTION = NOT_AUTHORIZED
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

Canonical #366 / proof `5553556112` authorizes exactly the five current-view paths and no sixth path. This candidate cannot self-certify its own closure.

After guarded merge and complete post-merge proof, run fresh successor-authority analysis. Do not infer P7-R5, verification execution, VERIFIED/FIXED/REVERIFIED/Done Gate state, patch execution, K2 invocation, autofix, P8/P9, release, or project completion.
