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
| P7-R7 verification-failure disposition implementation | **CLOSED_CANONICAL / VERIFICATION_FAILED_BOUNDED_ONLY** | #380 / proof `5555040304` |
| Durable review orchestration + skill trust plan amendment | **CLOSED_CANONICAL / PLANNING_ONLY** | #381 / proof `5555071864` |
| P7-R7 post-merge current-view reconciliation | **CLOSED_CANONICAL** | #383 / proof `5555153084` |
| P7-R8 verification-command success-evidence implementation | **CLOSED_CANONICAL / VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND_ONLY** | #385 / proof `5555449960` |
| P7-R8 post-merge current-view reconciliation | **CLOSED_CANONICAL** | #387 / proof `5555510161` |
| P7-R9 agent-completion evidence-binding implementation | **CLOSED_CANONICAL / AGENT_COMPLETION_EVIDENCE_BOUND_ONLY** | #389 / proof `5558925165` |
| P7-R9 post-merge current-view reconciliation | **CLOSED_CANONICAL** | #391 / proof `5559029920` |
| P7-R10 successor analysis | **ANALYSIS_ONLY** | #391 comment `5559072672` |
| P7-R10 workspace-reference evidence-binding authorization | **CLOSED_CANONICAL** | #392 / proof `5559094935` |
| P7-R10 workspace-reference evidence-binding implementation | **CLOSED_CANONICAL / WORKSPACE_REFERENCE_EVIDENCE_BOUND_ONLY** | #393 / proof `5559155207` |
| P7-R10 current-view drift analysis | **ANALYSIS_ONLY** | #393 comment `5559162759` |
| P7-R10 current-view reconciliation authorization | **CLOSED_CANONICAL** | #394 / proof `5559192294` |
| P7-R10 post-merge current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| Post-R10 successor implementation | **NOT_AUTHORIZED_BY_NUMBERING** | No authority by sequence/composition |
| P7 overall | **NOT_CLOSED** | R10 bounded closure is not overall closure |
| Applied evidence only | **ESTABLISHED_BY_P7_R4_CONTRACT** | No patch application authority |
| Verification plan bound only | **ESTABLISHED_BY_P7_R5_CONTRACT** | No verification execution authority |
| Verification report bound only | **ESTABLISHED_BY_P7_R6_CONTRACT** | No verification execution authority |
| Verification failed | **ESTABLISHED_BY_P7_R7_CONTRACT / BOUNDED_RECEIPT_BACKED_ONLY** | One exact failed planned command only |
| Verification command success evidence bound | **ESTABLISHED_BY_P7_R8_CONTRACT / BOUNDED_RECEIPT_BACKED_ONLY** | Still not `VERIFIED` |
| Agent completion evidence bound | **ESTABLISHED_BY_P7_R9_CONTRACT / BOUNDED_EVENT_EVIDENCE_ONLY** | Still not complete session history or `VERIFIED` |
| Workspace reference evidence bound | **ESTABLISHED_BY_P7_R10_CONTRACT / HISTORICAL_REFERENCE_LINKAGE_ONLY** | Still not workspace integrity or `VERIFIED` |
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
P7_R5_IMPLEMENTATION = #369 / proof 5553946597 / VERIFICATION_PLAN_BOUND_ONLY
P7_R5_RECONCILIATION = #371 / proof 5554045522 / CLOSED_CANONICAL
P7_R6_IMPLEMENTATION = #373 / proof 5554262587 / VERIFICATION_REPORT_BOUND_ONLY
P7_R5_SERIALIZED_PREIMAGE_REPAIR = #375 / proof 5554351748 / CLOSED_CANONICAL
P7_R6_POST_REPAIR_RECONCILIATION = #378 / proof 5554468185 / CLOSED_CANONICAL
P7_R7_IMPLEMENTATION = #380 / proof 5555040304 / VERIFICATION_FAILED_BOUNDED_ONLY
DURABLE_ORCHESTRATION_SKILL_TRUST_PLAN = #381 / proof 5555071864 / PLANNING_ONLY
P7_R7_RECONCILIATION = #383 / proof 5555153084 / CLOSED_CANONICAL
P7_R8_IMPLEMENTATION = #385 / proof 5555449960 / VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND_ONLY
P7_R8_RECONCILIATION = #387 / proof 5555510161 / CLOSED_CANONICAL
P7_R9_IMPLEMENTATION = #389 / proof 5558925165 / AGENT_COMPLETION_EVIDENCE_BOUND_ONLY
P7_R9_RECONCILIATION = #391 / proof 5559029920 / CLOSED_CANONICAL
P7_R10_SUCCESSOR_ANALYSIS = #391 / comment 5559072672 / ANALYSIS_ONLY
P7_R10_AUTHORIZATION = #392 / proof 5559094935 / CLOSED_CANONICAL
P7_R10_IMPLEMENTATION = #393 / proof 5559155207 / WORKSPACE_REFERENCE_EVIDENCE_BOUND_ONLY
P7_R10_RECONCILIATION_ANALYSIS = #393 / comment 5559162759 / ANALYSIS_ONLY
P7_R10_RECONCILIATION_AUTHORIZATION = #394 / proof 5559192294 / CLOSED_CANONICAL
CURRENT_RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical implementation identities:

```text
P7-R8 qualified head = 5dd1b87a2508fe99694d30d22f756449cf947df0
P7-R8 merge = 9edd998ccd56e491634adda44e632b91ab6decf4
P7-R8 source = dc150e9b3d4ea305445ca59de9ef483a92b9ef8d
P7-R8 schema = 7b256db53a02ef9d32a133994a8fb0c9582b6981
P7-R8 test = b25cb1094a75b2eba275c604005ed1facfc1c300
P7-R9 qualified head = e71e9dacb503afe32a8f85a4d2226d316544ee93
P7-R9 merge = 77337b141367f2e9c9f4dedac527c5574043deaf
P7-R9 source = bf53a3bdf6f24c5b721fc63d6c0bf32206ba27e2
P7-R9 schema = 07f77fffe5480b6bd6f115def04396a14df7cff3
P7-R9 test = 8b27d8345c278861a3356ca57cda67cb33095f3b
P7-R10 qualified head = 32cc75db854ef1f2e5bedf38d3a5fadac8ae4528
P7-R10 merge = 26a398caa67ef51f7df01bf0fb9459839a05f50d
P7-R10 source = 3bbdf9174e2b939ceed36afcd8fc4036e8356712
P7-R10 schema = f0895ce90986eb5d10e5228080557833e1ae8ca4
P7-R10 test = 415e051156e77cc43137a03c85fc73b4733deea0
```

---

## P7-R10 bounded meaning

P7-R10 binds only the supplied historical `workspace.integrity` report reference and its SHA-256 reference digest. It does not prove historical filesystem observations or current workspace truth.

```text
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
WORKSPACE_REFERENCE_EVIDENCE_BOUND != VERIFIED
WORKSPACE_REFERENCE_EVIDENCE_BOUND != DONE_GATE
P7_R10_CLOSED != SUCCESSOR_IMPLEMENTATION_AUTHORITY
P7_R10_CLOSED != PROJECT_COMPLETION
```

---

## Current reconciliation rule

Only the exact five current-view files authorized by PR #394 / proof `5559192294` may change in this reconciliation candidate. The candidate must remain `CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL` until guarded merge and complete post-merge proof.

Fresh successor-authority analysis is permitted only after that proof and must not infer implementation authority by numbering or composition.
