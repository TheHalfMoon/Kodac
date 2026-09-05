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
| P6 overall | **NOT_CLOSED** | Bounded closure is not overall closure |
| P7-R1 through P7-R4 bounded data contracts | **CLOSED_CANONICAL** | Earlier proof chain retained in canonical history |
| P7-R5 verification-plan binding | **CLOSED_CANONICAL / VERIFICATION_PLAN_BOUND_ONLY** | #369 / proof `5553946597` |
| P7-R5 post-merge current-view reconciliation | **CLOSED_CANONICAL** | #371 / proof `5554045522` |
| P7-R6 verification-report binding | **CLOSED_CANONICAL / VERIFICATION_REPORT_BOUND_ONLY** | #373 / proof `5554262587` |
| P7-R5 serialized-preimage repair | **CLOSED_CANONICAL** | #375 / proof `5554351748` |
| P7-R6 post-repair current-view reconciliation | **CLOSED_CANONICAL** | #378 / proof `5554468185` |
| P7-R7 successor analysis | **ANALYSIS_ONLY** | #378 comment `5554700232` |
| P7-R7 verification-failure disposition authorization | **CLOSED_CANONICAL** | #379 / proof `5554794663` |
| P7-R7 verification-failure disposition implementation | **CLOSED_CANONICAL / VERIFICATION_FAILED_BOUNDED_ONLY** | #380 / proof `5555040304` |
| P7-R7 current-view reconciliation analysis | **ANALYSIS_ONLY** | #380 comment `5555091086` |
| Durable review orchestration + skill trust plan amendment | **CLOSED_CANONICAL / PLANNING_ONLY** | #381 / proof `5555071864` |
| P7-R7 current-view reconciliation authorization | **CLOSED_CANONICAL** | #382 / proof `5555110307` |
| P7-R7 post-merge current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| P7-R8+ | **NOT_AUTHORIZED_BY_NUMBERING** | No authority by sequence/composition |
| P7 overall | **NOT_CLOSED** | R7 bounded closure is not overall closure |
| Applied evidence only | **ESTABLISHED_BY_P7_R4_CONTRACT** | No patch application authority |
| Verification plan bound only | **ESTABLISHED_BY_P7_R5_CONTRACT** | No verification execution authority |
| Verification report bound only | **ESTABLISHED_BY_P7_R6_CONTRACT** | No verification execution authority |
| Verification failed | **ESTABLISHED_BY_P7_R7_CONTRACT / BOUNDED_RECEIPT_BACKED_ONLY** | One exact failed planned command only |
| Verified / fixed / reverified / Done Gate | **NOT_ESTABLISHED** | No lifecycle-completion evidence |
| Patch application / retry / remediation execution | **NOT_AUTHORIZED** | Current P7 contracts are evidence-only |
| Verification planner / engine invocation | **NOT_AUTHORIZED** | No execution authority |
| K2 invocation | **NOT_AUTHORIZED** | Existing K2 boundary unchanged |
| P8-P9 | **IMPLEMENTATION NOT_AUTHORIZED** | Planning direction only |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical P7 anchors

```text
P7_R4_RECONCILIATION = #367 / proof 5553600421
P7_R5_AUTHORIZATION = #368 / proof 5553737255
P7_R5_IMPLEMENTATION = #369 / proof 5553946597 / VERIFICATION_PLAN_BOUND_ONLY
P7_R5_RECONCILIATION = #371 / proof 5554045522 / CLOSED_CANONICAL
P7_R6_AUTHORIZATION = #372 / proof 5554084156
P7_R6_IMPLEMENTATION = #373 / proof 5554262587 / VERIFICATION_REPORT_BOUND_ONLY
P7_R5_SERIALIZED_PREIMAGE_REPAIR = #375 / proof 5554351748 / CLOSED_CANONICAL
P7_R6_POST_REPAIR_RECONCILIATION = #378 / proof 5554468185 / CLOSED_CANONICAL
P7_R7_SUCCESSOR_ANALYSIS = #378 / comment 5554700232 / ANALYSIS_ONLY
P7_R7_AUTHORIZATION = #379 / proof 5554794663 / CLOSED_CANONICAL
P7_R7_IMPLEMENTATION = #380 / proof 5555040304 / VERIFICATION_FAILED_BOUNDED_ONLY
P7_R7_RECONCILIATION_ANALYSIS = #380 / comment 5555091086 / ANALYSIS_ONLY
DURABLE_ORCHESTRATION_SKILL_TRUST_PLAN = #381 / proof 5555071864 / PLANNING_ONLY
P7_R7_RECONCILIATION_AUTHORIZATION = #382 / proof 5555110307 / CLOSED_CANONICAL
CURRENT_RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical implementation identities:

```text
P7-R5 source = 723edd547dddc75987fca96ea70e8ea176ee9a3b
P7-R5 schema = 04f596f6a3053effb436f65e85de9b1b376fea4d
P7-R5 test = a920f774e8e99b8b63e222cac03171a4c8c0f64b
P7-R6 source = 3ec02f33eec231e0f90a0a1da069c620db9b379c
P7-R6 schema = 304db4fa8287c28a35a1ce4a7f8c8a79a9888fe1
P7-R6 test = b3675abd40da8e16b2b48f7b2403915b91e1ca18
P7-R7 qualified head = 1eb46940cf5833f4edb58de4b0772fac3f8e93f6
P7-R7 merge = 531ac2c869bfba418238aeffbabe672d0ad27620
P7-R7 source = 71396d3d2890f797370b4185901c2ad079ad049d
P7-R7 schema = 6f3bd493861f42736cb60026293e3bd7be2d9eec
P7-R7 test = d00286b780e00808c6c683ef4bc9f223b3ce43e9
```

---

## Bounded P7 semantics

P7-R4 remains a pure/data-only applied-evidence binding. P7-R5 remains a pure/data-only deterministic content-addressed verification-plan binding. P7-R6 remains a pure/data-only deterministic content-addressed verification-report binding. P7-R7 remains a pure/data-only deterministic receipt-backed verification-failure disposition over exact canonically revalidated P7-R5/P7-R6 lineage, one exact failed planned command, and one complete exact matching K2 failure `ExecutionReceipt`.

```text
FAILED_R6_REPORT_BOOLEAN_ALONE != VERIFICATION_FAILED
BASE_CHECK_FAILURE_ALONE != VERIFICATION_FAILED
BARE_RECEIPT_REFERENCE != VERIFICATION_FAILED
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
P7_R7_CLOSED != P7_R8_PLUS_AUTHORITY
P7_R7_CLOSED != P7_OVERALL_CLOSED
P7_R7_CLOSED != P8_AUTHORITY
P7_R7_CLOSED != PROJECT_COMPLETION
```

P7-R7 invokes no verification planner/engine, ExecutionGateway, K2, Done Gate, filesystem, Git, process, network, provider/model, persistence, or patch-application surface.

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
P7-R8+ = NOT_AUTHORIZED_BY_NUMBERING
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
VERIFIED = NOT_ESTABLISHED
FIXED = NOT_ESTABLISHED
REVERIFIED = NOT_ESTABLISHED
DONE_GATE_PROVEN_READY = NOT_ESTABLISHED
DONE_GATE_INVOCATION_OR_MUTATION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
NEW_DEPENDENCY_DONOR_ADMISSION = NONE
PERSISTENCE_DATABASE_TELEMETRY_UPLOAD_LEARNING = NOT_AUTHORIZED
P8_P9_IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC_RELEASE_PACKAGE_PUBLICATION_DEPLOYMENT = NOT_AUTHORIZED
RULESET_CHANGE_BYPASS = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The canonical PR #381 amendment is planning direction only and creates no implementation authority.

---

## Current candidate gate

Canonical #382 / proof `5555110307` authorizes exactly the five current-view paths and no sixth path. This candidate cannot self-certify its own closure.

After guarded merge and complete post-merge proof, run fresh successor-authority analysis. Do not infer P7-R8+, `VERIFIED`, `FIXED`, `REVERIFIED`, Done Gate, verification execution, patch execution/retry, K2 invocation, autofix, P8/P9, release, or project completion.
