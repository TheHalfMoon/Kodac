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
| P7-R1 through P7-R3 bounded data contracts | **CLOSED_CANONICAL** | Detailed proof anchors retained below |
| P7-R4 applied-patch-evidence binding authorization | **CLOSED_CANONICAL** | #364 / proof `5553391471` |
| P7-R4 applied-patch-evidence binding | **CLOSED_CANONICAL** | #365 / proof `5553509882` |
| P7-R4 current-view reconciliation authorization | **CLOSED_CANONICAL** | #366 / proof `5553556112` |
| P7-R4 post-merge current-view reconciliation | **CLOSED_CANONICAL** | #367 / proof `5553600421` |
| P7-R5 successor analysis | **ANALYSIS_ONLY** | #367 comment `5553695694` |
| P7-R5 verification-plan-binding authorization | **CLOSED_CANONICAL** | #368 / proof `5553737255` |
| P7-R5 verification-plan-binding implementation | **CLOSED_CANONICAL** | #369 / proof `5553946597` |
| P7-R5 state | **VERIFICATION_PLAN_BOUND_ONLY** | Planning binding is not verification execution |
| P7-R5 current-view reconciliation analysis | **ANALYSIS_ONLY** | #369 comment `5553949322` |
| P7-R5 current-view reconciliation authorization | **CLOSED_CANONICAL** | #370 / proof `5553973273` |
| P7-R5 post-merge current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| P7-R6+ | **NOT_AUTHORIZED_BY_NUMBERING** | No authority by sequence |
| P7 overall | **NOT_CLOSED** | R5 closure is not overall closure |
| Applied evidence only | **ESTABLISHED_BY_P7_R4_CONTRACT** | No patch application authority |
| Verification plan bound only | **ESTABLISHED_BY_P7_R5_CONTRACT** | No verification execution authority |
| Patch application / remediation execution | **NOT_AUTHORIZED** | R5 is data-only |
| Verification planner invocation | **NOT_AUTHORIZED** | Supplied plan only |
| Verification execution / report | **NOT_AUTHORIZED** | No execution authority |
| Verification failed / verified | **NOT_ESTABLISHED** | No result evidence |
| Fixed / reverified / Done Gate | **NOT_ESTABLISHED** | No lifecycle-completion evidence |
| P8-P9 | **IMPLEMENTATION NOT_AUTHORIZED** | Planning direction only |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical earlier P7 anchors retained

```text
P7_R1_AUTHORIZATION = #352 / proof 5552233040
P7_R1_IMPLEMENTATION = #353 / proof 5552429216
P7_R1_RECONCILIATION = #355 / proof 5552575380
P7_R2_AUTHORIZATION = #356 / proof 5552630320
P7_R2_IMPLEMENTATION = #357 / proof 5552730805
P7_R2_RECONCILIATION = #359 / proof 5552811852
P7_R3_AUTHORIZATION = #360 / proof 5552924883
P7_R3_IMPLEMENTATION = #361 / proof 5553018473
P7_R3_RECONCILIATION_AUTHORIZATION = #362 / proof 5553049120
P7_R3_RECONCILIATION = #363 / proof 5553345846
P7_R4_AUTHORIZATION = #364 / proof 5553391471
P7_R4_IMPLEMENTATION = #365 / proof 5553509882
P7_R4_RECONCILIATION_AUTHORIZATION = #366 / proof 5553556112
P7_R4_RECONCILIATION = #367 / proof 5553600421
```

---

## Canonical P7-R5 anchors

```text
P7_R5_SUCCESSOR_ANALYSIS
  PR = #367
  COMMENT = 5553695694
  CLASS = ANALYSIS_ONLY

P7_R5_AUTHORIZATION
  PR = #368
  PROOF = 5553737255
  STATE = CLOSED_CANONICAL

P7_R5_IMPLEMENTATION
  PR = #369
  QUALIFIED_HEAD = 65e69bf8177526bd161aefac29185a783f41bab6
  MERGE = b0ee0485e7b58d0583f86c16b34ebe5214467ae7
  PROOF = 5553946597
  STATE = CLOSED_CANONICAL / VERIFICATION_PLAN_BOUND_ONLY

P7_R5_RECONCILIATION_ANALYSIS
  PR = #369
  COMMENT = 5553949322
  CLASS = ANALYSIS_ONLY

P7_R5_RECONCILIATION_AUTHORIZATION
  PR = #370
  QUALIFIED_HEAD = 8712216b0a92cf206a447867caf61ebb23305eb1
  MERGE = eb9ac9e9a0108b61d044e592192603ee363acd1a
  PROOF = 5553973273
  STATE = CLOSED_CANONICAL

RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P7-R5 implementation identities:

```text
source = a243f4dcea8499404d64df7b848504e57ffb6697
schema = 04f596f6a3053effb436f65e85de9b1b376fea4d
test = ecd515a58f3cfd4abaa89001f80192c68e39b91b
```

---

## Bounded P7-R4 / P7-R5 semantics

P7-R4 remains a pure/data-only applied-evidence binding. P7-R5 adds one pure/data-only deterministic content-addressed post-apply verification-plan binding.

```text
APPLIED_EVIDENCE_BINDING != PATCH_APPLICATION
APPLIED_EVIDENCE_BINDING != VERIFICATION
VERIFICATION_PLAN_BOUND != VERIFICATION_PLANNER_EXECUTION
VERIFICATION_PLAN_BOUND != VERIFICATION_EXECUTION
VERIFICATION_PLAN_BOUND != VERIFICATION_REPORT
VERIFICATION_PLAN_BOUND != VERIFIED
VERIFICATION_PLAN_BOUND != FIXED
VERIFICATION_PLAN_BOUND != DONE_GATE
```

Neither contract invokes K2, applies a patch, runs verification, creates result evidence, or advances lifecycle state.

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
P7-R6+ = NOT_AUTHORIZED_BY_NUMBERING
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

Canonical #370 / proof `5553973273` authorizes exactly the five current-view paths and no sixth path. This candidate cannot self-certify its own closure.

After guarded merge and complete post-merge proof, run fresh successor-authority analysis. Do not infer P7-R6, verification execution, verified/fixed/reverified/Done Gate state, patch execution, K2 invocation, autofix, P8/P9, release, or project completion.
