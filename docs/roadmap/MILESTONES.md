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
| P7-R6 successor analysis | **ANALYSIS_ONLY** | #371 comment `5554059103` |
| P7-R6 verification-report-binding authorization | **CLOSED_CANONICAL** | #372 / proof `5554084156` |
| P7-R6 verification-report binding | **CLOSED_CANONICAL / VERIFICATION_REPORT_BOUND_ONLY** | #373 / proof `5554262587` |
| P7-R5 serialized-preimage defect analysis | **ANALYSIS_ONLY** | #373 comment `5554227350` |
| P7-R5 serialized-preimage repair authorization | **CLOSED_CANONICAL** | #374 / proof `5554295213` |
| P7-R5 serialized-preimage repair | **CLOSED_CANONICAL** | #375 / proof `5554351748` |
| PR #376 | **CLOSED_UNMERGED_SUPERSEDED** | comment `5554361857` |
| Post-R6/post-repair current-view reconciliation authorization | **CLOSED_CANONICAL** | #377 / proof `5554415271` |
| Post-R6/post-repair current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| P7-R7+ | **NOT_AUTHORIZED_BY_NUMBERING** | No authority by sequence |
| P7 overall | **NOT_CLOSED** | R6 closure is not overall closure |
| Applied evidence only | **ESTABLISHED_BY_P7_R4_CONTRACT** | No patch application authority |
| Verification plan bound only | **ESTABLISHED_BY_P7_R5_CONTRACT** | No verification execution authority |
| Verification report bound only | **ESTABLISHED_BY_P7_R6_CONTRACT** | No verification execution or lifecycle authority |
| Patch application / remediation execution | **NOT_AUTHORIZED** | Current P7 contracts are data-only |
| Verification planner invocation | **NOT_AUTHORIZED** | Supplied data only |
| Verification execution / report creation | **NOT_AUTHORIZED** | No execution authority |
| Verification failed / verified | **NOT_ESTABLISHED** | No lifecycle evidence |
| Fixed / reverified / Done Gate | **NOT_ESTABLISHED** | No lifecycle-completion evidence |
| P8-P9 | **IMPLEMENTATION NOT_AUTHORIZED** | Planning direction only |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical P7 anchors

```text
P7_R4_RECONCILIATION = #367 / proof 5553600421
P7_R5_SUCCESSOR_ANALYSIS = #367 / comment 5553695694 / ANALYSIS_ONLY
P7_R5_AUTHORIZATION = #368 / proof 5553737255
P7_R5_IMPLEMENTATION = #369 / proof 5553946597 / VERIFICATION_PLAN_BOUND_ONLY
P7_R5_RECONCILIATION_ANALYSIS = #369 / comment 5553949322 / ANALYSIS_ONLY
P7_R5_RECONCILIATION_AUTHORIZATION = #370 / proof 5553973273
P7_R5_RECONCILIATION = #371 / proof 5554045522 / CLOSED_CANONICAL
P7_R6_SUCCESSOR_ANALYSIS = #371 / comment 5554059103 / ANALYSIS_ONLY
P7_R6_AUTHORIZATION = #372 / proof 5554084156
P7_R6_IMPLEMENTATION = #373 / proof 5554262587 / VERIFICATION_REPORT_BOUND_ONLY
P7_R5_SERIALIZED_PREIMAGE_DEFECT_ANALYSIS = #373 / comment 5554227350 / ANALYSIS_ONLY
P7_R5_SERIALIZED_PREIMAGE_REPAIR_AUTHORIZATION = #374 / proof 5554295213
P7_R5_SERIALIZED_PREIMAGE_REPAIR = #375 / proof 5554351748 / CLOSED_CANONICAL
PR_376 = CLOSED_UNMERGED_SUPERSEDED / comment 5554361857
POST_R6_POST_REPAIR_RECONCILIATION_AUTHORIZATION = #377 / proof 5554415271 / CLOSED_CANONICAL
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
```

---

## Bounded P7 semantics

P7-R4 remains a pure/data-only applied-evidence binding. P7-R5 remains a pure/data-only deterministic content-addressed verification-plan binding; the canonical serialized-preimage repair tightens validation consistency without changing the historical identity algorithm or rewriting historical records. P7-R6 is a pure/data-only deterministic content-addressed verification-report binding over one exact canonically revalidated P7-R5 predecessor and one supplied current report.

```text
APPLIED_EVIDENCE_BINDING != PATCH_APPLICATION
APPLIED_EVIDENCE_BINDING != VERIFICATION
VERIFICATION_PLAN_BOUND != VERIFICATION_PLANNER_EXECUTION
VERIFICATION_PLAN_BOUND != VERIFICATION_EXECUTION
VERIFICATION_REPORT_BOUND != VERIFICATION_ENGINE_INVOCATION
VERIFICATION_REPORT_BOUND != VERIFICATION_EXECUTION
VERIFICATION_REPORT_BOUND != VERIFICATION_FAILED
VERIFICATION_REPORT_BOUND != VERIFIED
VERIFICATION_REPORT_BOUND != FIXED
VERIFICATION_REPORT_BOUND != REVERIFIED
VERIFICATION_REPORT_BOUND != DONE_GATE
VERIFICATION_REPORT_BOUND != K2_INVOCATION
REPORT_PASSED != VERIFIED_REMEDIATION
```

No current P7 contract invokes K2, applies a patch, runs verification, creates new result evidence, or advances lifecycle state.

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
P7-R7+ = NOT_AUTHORIZED_BY_NUMBERING
PATCH_APPLICATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_INVOCATION = NOT_AUTHORIZED
K2_APPROVAL_CREATION = NOT_AUTHORIZED
K2_AUTHORITY_EXPANSION = NONE
VERIFICATION_PLANNER_INVOCATION = NOT_AUTHORIZED
VERIFICATION_EXECUTION = NOT_AUTHORIZED
VERIFICATION_REPORT_CREATION = NOT_AUTHORIZED
VERIFICATION_FAILED_VERIFIED = NOT_ESTABLISHED
FIXED_REVERIFIED_DONE_GATE = NOT_ESTABLISHED
DONE_GATE_INVOCATION_OR_MUTATION = NOT_AUTHORIZED
REVIEWER_CRITIC_VERIFIER_PROVIDER_MODEL_EXECUTION_EXPANSION = NOT_AUTHORIZED
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
KRI_K5_K2_AUTHORITY_MUTATION = NOT_AUTHORIZED
NEW_DEPENDENCY_DONOR_ADMISSION = NONE
PERSISTENCE_DATABASE_TELEMETRY_UPLOAD_LEARNING = NOT_AUTHORIZED
CLI_API_PACKAGE_ROOT_PRODUCT_INTEGRATION = NOT_AUTHORIZED
PUBLIC_RELEASE_PACKAGE_PUBLICATION_DEPLOYMENT = NOT_AUTHORIZED
PUBLIC_SUPERIORITY_BEST_IN_CLASS_CLAIM = NOT_AUTHORIZED
P8_P9_IMPLEMENTATION = NOT_AUTHORIZED
RULESET_CHANGE_BYPASS = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Current candidate gate

Canonical #377 / proof `5554415271` authorizes exactly the five current-view paths and no sixth path. This candidate cannot self-certify its own closure.

After guarded merge and complete post-merge proof, run fresh successor-authority analysis. Do not infer P7-R7+, verification execution, verified/fixed/reverified/Done Gate state, patch execution, K2 invocation, autofix, P8/P9, release, or project completion.
