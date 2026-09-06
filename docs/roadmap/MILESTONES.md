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
| P7-R1 through P7-R4 bounded data contracts | **CLOSED_CANONICAL** | Earlier canonical proof chain retained |
| P7-R5 verification-plan binding | **CLOSED_CANONICAL / VERIFICATION_PLAN_BOUND_ONLY** | #369 / proof `5553946597` |
| P7-R6 verification-report binding | **CLOSED_CANONICAL / VERIFICATION_REPORT_BOUND_ONLY** | #373 / proof `5554262587` |
| P7-R7 verification-failure disposition | **CLOSED_CANONICAL / VERIFICATION_FAILED_BOUNDED_ONLY** | #380 / proof `5555040304` |
| P7-R8 verification-command success evidence | **CLOSED_CANONICAL / VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND_ONLY** | #385 / proof `5555449960` |
| P7-R9 agent-completion evidence binding | **CLOSED_CANONICAL / AGENT_COMPLETION_EVIDENCE_BOUND_ONLY** | #389 / proof `5558925165` |
| P7-R10 workspace-reference evidence binding | **CLOSED_CANONICAL / WORKSPACE_REFERENCE_EVIDENCE_BOUND_ONLY** | #393 / proof `5559155207` |
| P7-R10 post-merge current-view reconciliation | **CLOSED_CANONICAL** | #395 / proof `5559289934` |
| P7-R11 git-change report evidence binding | **CLOSED_CANONICAL / GIT_CHANGE_REPORT_EVIDENCE_BOUND_ONLY** | #397 / proof `5559564647` |
| P7-R11 post-merge current-view reconciliation | **CLOSED_CANONICAL** | #399 / proof `5560084029` |
| P7-R12 receipt-report evidence binding | **CLOSED_CANONICAL / RECEIPT_REPORT_EVIDENCE_BOUND_ONLY** | #401 / proof `5560276716` |
| P7-R12 post-merge current-view reconciliation | **CLOSED_CANONICAL** | #403 / proof `5560512547` |
| Post-R12 successor analysis | **ANALYSIS_ONLY** | #403 comment `5560530226` |
| P7-R13 policy-report evidence-binding authorization | **CLOSED_CANONICAL** | #404 / proof `5560568777` |
| P7-R13 policy-report evidence-binding implementation | **CLOSED_CANONICAL / POLICY_REPORT_EVIDENCE_BOUND_ONLY** | #405 / proof `5560655007` |
| P7-R13 current-view drift analysis | **ANALYSIS_ONLY** | #405 comment `5560661273` |
| P7-R13 post-merge current-view reconciliation authorization | **CLOSED_CANONICAL** | #406 / proof `5560697815` |
| P7-R13 post-merge current-view reconciliation | **CLOSED_CANONICAL** | #407 / proof `5560768667` |
| Post-R13 successor analysis | **ANALYSIS_ONLY** | #407 comment `5560808910` |
| P7-R14 receipt-record-set evidence-binding authorization | **CLOSED_CANONICAL** | #408 / proof `5560926017` |
| P7-R14 receipt-record-set evidence-binding implementation | **CLOSED_CANONICAL / RECEIPT_RECORD_SET_EVIDENCE_BOUND** | #409 / proof `5561374059` |
| P7-R14 current-view drift analysis | **ANALYSIS_ONLY** | #409 comment `5561389069` |
| P7-R14 post-merge current-view reconciliation authorization | **CLOSED_CANONICAL** | #410 / proof `5561420176` |
| P7-R14 post-merge current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exact five-view candidate only |
| Post-R14 successor implementation | **NOT_AUTHORIZED_BY_NUMBERING** | No authority by sequence/composition |
| P7 overall | **NOT_CLOSED** | R14 bounded closure is not overall closure |
| P8-P9 | **IMPLEMENTATION NOT_AUTHORIZED** | Planning direction only |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Active R14 reconciliation milestone

Canonical PR #410 / proof `5561420176` authorizes exactly these five documentation paths and no sixth path:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

The candidate must remain `CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL` until guarded merge and mandatory post-merge proof. It grants no successor authority.

Canonical frontier:

```text
P7_R13_RECONCILIATION = #407 / proof 5560768667 / CLOSED_CANONICAL
POST_R13_SUCCESSOR_ANALYSIS = #407 / comment 5560808910 / ANALYSIS_ONLY
P7_R14_AUTHORIZATION = #408 / proof 5560926017 / CLOSED_CANONICAL
P7_R14_IMPLEMENTATION = #409 / proof 5561374059 / RECEIPT_RECORD_SET_EVIDENCE_BOUND
P7_R14_DRIFT_ANALYSIS = #409 / comment 5561389069 / ANALYSIS_ONLY
P7_R14_RECONCILIATION_AUTHORIZATION = #410 / proof 5561420176 / CLOSED_CANONICAL
P7_R14_RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
POST_R14_SUCCESSOR_IMPLEMENTATION = NOT_AUTHORIZED_BY_NUMBERING
P7_OVERALL = NOT_CLOSED
PROJECT_COMPLETION = NOT_ESTABLISHED
```

Canonical R14 identities:

```text
QUALIFIED_HEAD = 05bb097bb252598c7b4025005e0e0738d6516b57
QUALIFIED_HEAD_TREE = c8aeff96eb8c884dfc6e2c967c8f32a5d5ca6bd2
MERGE = beb4a82bce6959fc4adde5f3f0966baea43b3479
SOURCE_BLOB = b4749bd8f797d23eda789bd4aebb24deb1845aa4
SCHEMA_BLOB = 81815ec1a2eef67d574b86dc94020cb53f0e5ad4
TEST_BLOB = 435a5ba2f1691c9b20d46e9319842712d095a6bb
```

---

## Bounded evidence states

```text
APPLIED_EVIDENCE_ONLY = ESTABLISHED_BY_P7_R4_CONTRACT
VERIFICATION_PLAN_BOUND_ONLY = ESTABLISHED_BY_P7_R5_CONTRACT
VERIFICATION_REPORT_BOUND_ONLY = ESTABLISHED_BY_P7_R6_CONTRACT
VERIFICATION_FAILED = ESTABLISHED_BY_P7_R7_CONTRACT / BOUNDED_RECEIPT_BACKED_ONLY
VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND_ONLY = ESTABLISHED_BY_P7_R8_CONTRACT
AGENT_COMPLETION_EVIDENCE_BOUND_ONLY = ESTABLISHED_BY_P7_R9_CONTRACT
WORKSPACE_REFERENCE_EVIDENCE_BOUND_ONLY = ESTABLISHED_BY_P7_R10_CONTRACT
GIT_CHANGE_REPORT_EVIDENCE_BOUND_ONLY = ESTABLISHED_BY_P7_R11_CONTRACT
RECEIPT_REPORT_EVIDENCE_BOUND_ONLY = ESTABLISHED_BY_P7_R12_CONTRACT
POLICY_REPORT_EVIDENCE_BOUND_ONLY = ESTABLISHED_BY_P7_R13_CONTRACT
RECEIPT_RECORD_SET_EVIDENCE_BOUND = ESTABLISHED_BY_P7_R14_CONTRACT
VERIFIED = NOT_ESTABLISHED
FIXED = NOT_ESTABLISHED
REVERIFIED = NOT_ESTABLISHED
DONE_GATE_PROVEN_READY = NOT_ESTABLISHED
```

P7-R14 establishes only deterministic supplied-record-to-report-reference consistency. It does not independently prove historical ledger bytes/completeness, cryptographic receipt authenticity, policy authorization correctness, historical workspace/Git semantics, or verification-engine historical execution.

---

## Mandatory R14 non-equivalences

```text
RECEIPT_RECORD_SET_EVIDENCE_BOUND != HISTORICAL_LEDGER_READ_PROOF
RECEIPT_RECORD_SET_EVIDENCE_BOUND != RECEIPT_LEDGER_BYTES_OR_SNAPSHOT_PROOF
RECEIPT_RECORD_SET_EVIDENCE_BOUND != RECEIPT_LEDGER_COMPLETENESS_PROOF
RECEIPT_RECORD_SET_EVIDENCE_BOUND != EXECUTION_RECEIPT_AUTHENTICITY_PROOF
RECEIPT_RECORD_SET_EVIDENCE_BOUND != RECEIPT_SIGNATURE_OR_EXTERNAL_ATTESTATION_PROOF
RECEIPT_RECORD_SET_EVIDENCE_BOUND != POLICY_DECISION_AUTHENTICITY_PROOF
RECEIPT_RECORD_SET_EVIDENCE_BOUND != POLICY_RULE_OR_VERSION_IDENTITY_PROOF
RECEIPT_RECORD_SET_EVIDENCE_BOUND != POLICY_AUTHORIZATION_PROOF
RECEIPT_RECORD_SET_EVIDENCE_BOUND != EXECUTION_INTENT_PREIMAGE_PROOF_FOR_ARBITRARY_RECEIPTS
RECEIPT_RECORD_SET_EVIDENCE_BOUND != HISTORICAL_WORKSPACE_OR_GIT_SEMANTICS
RECEIPT_RECORD_SET_EVIDENCE_BOUND != VERIFICATION_ENGINE_HISTORICAL_EXECUTION_PROOF
RECEIPT_RECORD_SET_EVIDENCE_BOUND != VERIFICATION_EXECUTION_AUTHORITY
RECEIPT_RECORD_SET_EVIDENCE_BOUND != K2_INVOCATION
RECEIPT_RECORD_SET_EVIDENCE_BOUND != K2_APPROVAL
RECEIPT_RECORD_SET_EVIDENCE_BOUND != VERIFIED
RECEIPT_RECORD_SET_EVIDENCE_BOUND != FIXED
RECEIPT_RECORD_SET_EVIDENCE_BOUND != REVERIFIED
RECEIPT_RECORD_SET_EVIDENCE_BOUND != DONE_GATE
RECEIPT_RECORD_SET_EVIDENCE_BOUND != PROVEN_READY
RECEIPT_RECORD_SET_EVIDENCE_BOUND != AUTOFIX
RECEIPT_RECORD_SET_EVIDENCE_BOUND != PATCH_RETRY_AUTHORITY
P7_R14_CLOSED != SUCCESSOR_IMPLEMENTATION_AUTHORITY
P7_R14_CLOSED != P7_OVERALL_CLOSED
P7_R14_CLOSED != P8_AUTHORITY
P7_R14_CLOSED != PROJECT_COMPLETION
```

All still-effective canonical P7-R10 through P7-R13 predecessor non-grants remain in force. Omission from this condensed milestone view is not authorization, proof, waiver, supersession, or narrowing.

---

## Preserved global authority boundary

```text
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE AUTHORITY = UNCHANGED
PATCH_APPLICATION = NOT_AUTHORIZED
PATCH_RETRY = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_INVOCATION = NOT_AUTHORIZED
K2_APPROVAL_CREATION = NOT_AUTHORIZED
VERIFICATION_PLANNER_INVOCATION = NOT_AUTHORIZED
VERIFICATION_ENGINE_INVOCATION = NOT_AUTHORIZED
VERIFICATION_EXECUTION = NOT_AUTHORIZED
VERIFICATION_REPORT_CREATION = NOT_AUTHORIZED
HISTORICAL_LEDGER_READ_PROOF = NOT_ESTABLISHED
EXECUTION_RECEIPT_AUTHENTICITY = NOT_ESTABLISHED
RECEIPT_LEDGER_COMPLETENESS_PROOF = NOT_ESTABLISHED
POLICY_DECISION_AUTHENTICITY_PROOF = NOT_ESTABLISHED
POLICY_RULE_OR_VERSION_IDENTITY_PROOF = NOT_ESTABLISHED
POLICY_AUTHORIZATION_PROOF = NOT_ESTABLISHED
WORKSPACE_INTEGRITY_PROOF = NOT_ESTABLISHED
GIT_DIFF_OR_STATUS_SEMANTIC_PROOF = NOT_ESTABLISHED
VERIFICATION_ENGINE_HISTORICAL_EXECUTION_PROOF = NOT_ESTABLISHED
CAPABILITY_AUTHORIZATION_PROOF = NOT_ESTABLISHED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
NEW_DEPENDENCY_DONOR_ADMISSION = NONE
PERSISTENCE_DATABASE_TELEMETRY_UPLOAD_LEARNING = NOT_AUTHORIZED
CLI_API_PACKAGE_ROOT_PRODUCT_INTEGRATION = NOT_AUTHORIZED
P8_P9_IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC_RELEASE_PACKAGE_PUBLICATION_DEPLOYMENT = NOT_AUTHORIZED
RULESET_CHANGE_BYPASS = NOT_AUTHORIZED
POST-R14 SUCCESSOR IMPLEMENTATION = NOT_AUTHORIZED_BY_NUMBERING
P7 OVERALL = NOT_CLOSED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

Only after this five-view R14 reconciliation closes by guarded merge plus complete post-merge proof may fresh successor-authority analysis run from then-live truth.