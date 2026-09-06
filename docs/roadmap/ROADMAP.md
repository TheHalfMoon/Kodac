# Kodac Engineering Roadmap

## Authority

This is a current engineering roadmap view only. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, successor, merge, or project-completion authority. Live GitHub, root `AGENTS.md`, accepted ADRs, and exact canonical authorization/evidence records control.

---

## Current program state

| Program / gate | State | Boundary |
| --- | --- | --- |
| K0 / K1 | **CLOSED** | Foundation |
| K2 | **CLOSED** | Trusted side-effect execution boundary unchanged |
| K3 bounded R1-R6 | **CLOSED** | No later K3 authority by numbering |
| KRI-R1 through KRI-R4 | **CLOSED_CANONICAL** | Reviewer-intelligence substrate |
| K4 bounded R1-R5 | **CLOSED_CANONICAL** | Bounded data-only scope |
| K5 bounded R1-R5 | **CLOSED_CANONICAL** | Proof-review substrate; Done Gate unchanged |
| K6 bounded closeout | **CLOSED_CANONICAL** | No later authority by composition |
| P2-R1 through P2-R6 | **CLOSED_CANONICAL** | Bounded benchmark mechanisms |
| P2 overall | **OPEN** | General/public KodacBench not closed |
| P3 bounded R1-R17 engineering scope | **CLOSED_CANONICAL** | Aggregate bounded scope only |
| P3 overall | **OPEN** | No overall closure |
| P4 bounded R1-R2 engineering scope | **CLOSED_CANONICAL** | Aggregate bounded scope only |
| P4 overall | **OPEN** | No overall closure |
| P5 bounded R1-R2 engineering scope | **CLOSED_CANONICAL** | #341 / proof `5551577054` |
| P5 post-closeout reconciliation | **CLOSED_CANONICAL** | #343 / proof `5551673149` |
| P5-R3+ | **NOT_AUTHORIZED** | No authority by numbering/composition |
| P5 overall | **NOT_CLOSED** | Bounded closure is not overall closure |
| P6 bounded R1 engineering scope | **CLOSED_CANONICAL** | #349 / proof `5552035602` |
| P6 post-closeout reconciliation | **CLOSED_CANONICAL** | #351 / proof `5552175515` |
| P6-R2+ | **NOT_AUTHORIZED_BY_NUMBERING** | No authority by sequence |
| P6 overall | **NOT_CLOSED** | Bounded closure is not overall closure |
| P7-R1 through P7-R4 bounded contracts | **CLOSED_CANONICAL** | Earlier canonical proof chain retained |
| P7-R5 verification-plan binding | **CLOSED_CANONICAL / VERIFICATION_PLAN_BOUND_ONLY** | #369 / proof `5553946597` |
| P7-R6 verification-report binding | **CLOSED_CANONICAL / VERIFICATION_REPORT_BOUND_ONLY** | #373 / proof `5554262587` |
| P7-R7 failure disposition | **CLOSED_CANONICAL / VERIFICATION_FAILED_BOUNDED_ONLY** | #380 / proof `5555040304` |
| P7-R8 command-success evidence | **CLOSED_CANONICAL / VERIFICATION_COMMAND_SUCCESS_EVIDENCE_BOUND_ONLY** | #385 / proof `5555449960` |
| P7-R9 agent-completion evidence | **CLOSED_CANONICAL / AGENT_COMPLETION_EVIDENCE_BOUND_ONLY** | #389 / proof `5558925165` |
| P7-R10 workspace-reference evidence | **CLOSED_CANONICAL / WORKSPACE_REFERENCE_EVIDENCE_BOUND_ONLY** | #393 / proof `5559155207` |
| P7-R11 git-change report evidence | **CLOSED_CANONICAL / GIT_CHANGE_REPORT_EVIDENCE_BOUND_ONLY** | #397 / proof `5559564647` |
| P7-R12 receipt-report evidence | **CLOSED_CANONICAL / RECEIPT_REPORT_EVIDENCE_BOUND_ONLY** | #401 / proof `5560276716` |
| P7-R13 policy-report evidence | **CLOSED_CANONICAL / POLICY_REPORT_EVIDENCE_BOUND_ONLY** | #405 / proof `5560655007` |
| P7-R14 receipt-record-set evidence | **CLOSED_CANONICAL / RECEIPT_RECORD_SET_EVIDENCE_BOUND** | #409 / proof `5561374059` |
| P7-R15 ledger-snapshot evidence | **CLOSED_CANONICAL / RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY** | #413 / proof `5561974214` |
| P7-R16 ledger file-read evidence | **CLOSED_CANONICAL / RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY** | #417 / proof `5562275168` |
| P7-R16 post-merge reconciliation | **CLOSED_CANONICAL** | #419 / proof `5562430859` |
| Post-R16 successor analysis | **ANALYSIS_ONLY** | #419 comment `5562467805` |
| P7-R17 engine ledger-read observation authorization | **CLOSED_CANONICAL** | #420 / proof `5562574802` |
| P7-R17 engine ledger-read observation implementation | **CLOSED_CANONICAL / VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY** | #421 / proof `5562661892` |
| P7-R17 current-view drift analysis | **ANALYSIS_ONLY** | #421 comment `5562669148` |
| P7-R17 reconciliation authorization | **CLOSED_CANONICAL** | #422 / proof `5562709592` |
| P7-R17 reconciliation | **CLOSED_CANONICAL** | #423 / proof `5562763610` |
| Post-R17 successor analysis | **ANALYSIS_ONLY** | #423 comment `5562787162` |
| P7-R18 engine ledger-read evidence-binding authorization | **CLOSED_CANONICAL** | #424 / proof `5562835182` |
| P7-R18 engine ledger-read evidence-binding implementation | **CLOSED_CANONICAL / VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY** | #425 / proof `5562984262` |
| P7-R18 current-view drift analysis | **ANALYSIS_ONLY** | #425 comment `5562991754` |
| P7-R18 reconciliation authorization | **CLOSED_CANONICAL** | #426 / proof `5563024476` |
| P7-R18 reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| Post-R18 successor implementation | **NOT_AUTHORIZED_BY_NUMBERING** | Fresh analysis only after reconciliation proof |
| P7 overall | **NOT_CLOSED** | R18 bounded closure is not overall closure |
| P8-P9 | **IMPLEMENTATION NOT_AUTHORIZED** | Planning direction only |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Exact active reconciliation allowlist

Canonical PR #426 / proof `5563024476` permits one documentation-only candidate over exactly:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized. The candidate may record already-proven facts only and cannot certify its own closure.

---

## Canonical P7 sequence at the current frontier

```text
#419 P7-R16 post-merge current-view reconciliation / proof 5562430859
#419 comment 5562467805 post-R16 successor analysis / ANALYSIS_ONLY
#420 P7-R17 verification-engine receipt-ledger read-observation authorization / proof 5562574802
#421 P7-R17 verification-engine receipt-ledger read-observation implementation / proof 5562661892
#421 comment 5562669148 P7-R17 current-view drift analysis / ANALYSIS_ONLY
#422 P7-R17 post-merge current-view reconciliation authorization / proof 5562709592
#423 P7-R17 post-merge current-view reconciliation / proof 5562763610
#423 comment 5562787162 post-R17 successor analysis / ANALYSIS_ONLY
#424 P7-R18 verification-engine receipt-ledger read-evidence-binding authorization / proof 5562835182
#425 P7-R18 verification-engine receipt-ledger read-evidence-binding implementation / proof 5562984262
#425 comment 5562991754 P7-R18 current-view drift analysis / ANALYSIS_ONLY
#426 P7-R18 post-merge current-view reconciliation authorization / proof 5563024476
CURRENT exact five-current-view R18 reconciliation candidate
```

Canonical R18 identities:

```text
P7-R18 qualified head = 174a0926c1ddff36b89428903b449c8b6d1f7833
P7-R18 qualified head tree = cf835e5efc10559ce3961075ac825d5bd5f45bdb
P7-R18 merge = 7c1b61a52fd5b0bdbaefa0095c5020d41a0b09a4
P7-R18 source blob = a8c2069eb977e32f7d8024fb20fd83e277fdc8c6
P7-R18 schema blob = e5d9c5121f8a0581b1e765747fdaab29bd203ecc
P7-R18 test blob = 1ecb5d5b8f2dc35472a04f9d9af9f3a0215f3de6
P7-R18 exact-head review = 5126954648 / CLEAN
P7-R18 pre-merge governance run = 34066638250
P7-R18 pre-merge runtime run = 34066638266
P7-R18 post-merge governance run = 34066805837
P7-R18 post-merge runtime run = 34066805811
```

---

## Bounded P7 meaning

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
RECEIPT_LEDGER_SNAPSHOT_EVIDENCE_BOUND_ONLY = ESTABLISHED_BY_P7_R15_CONTRACT
RECEIPT_LEDGER_FILE_READ_EVIDENCE_BOUND_ONLY = ESTABLISHED_BY_P7_R16_CONTRACT
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_OBSERVED_ONLY = ESTABLISHED_BY_P7_R17_CONTRACT
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY = ESTABLISHED_BY_P7_R18_CONTRACT
VERIFIED = NOT_ESTABLISHED
FIXED = NOT_ESTABLISHED
REVERIFIED = NOT_ESTABLISHED
DONE_GATE_PROVEN_READY = NOT_ESTABLISHED
```

P7-R18 establishes only one bounded event-to-canonical-read evidence binding: one structurally valid `verification.receipt_ledger.read` event inside the exact canonically revalidated verification-report interval is bound to the same verification session and exact receipt-ledger path digest, raw UTF-8 byte count, raw SHA-256, and parsed receipt count proven by canonical P7-R16/R15/R14/report lineage.

It does not authenticate the event producer, prove historical receipt-ledger file identity/completeness/absence/append history, authenticate execution receipts or policy decisions, prove the complete historical verification-engine trace, authorize verification execution, invoke K2 or Done Gate, or establish remediation lifecycle completion.

---

## Mandatory R18 non-equivalences

```text
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != EVENT_PRODUCER_AUTHENTICITY_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != HISTORICAL_RECEIPT_LEDGER_FILE_IDENTITY_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != HISTORICAL_RECEIPT_LEDGER_COMPLETENESS_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != RECEIPT_LEDGER_ABSENCE_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != RECEIPT_LEDGER_APPEND_HISTORY_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != EXECUTION_RECEIPT_AUTHENTICITY_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != POLICY_DECISION_AUTHENTICITY_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != POLICY_AUTHORIZATION_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != WORKSPACE_INTEGRITY_HISTORICAL_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != GIT_DIFF_OR_STATUS_HISTORICAL_SEMANTIC_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != FULL_VERIFICATION_ENGINE_HISTORICAL_EXECUTION_PROOF
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != VERIFICATION_EXECUTION_AUTHORITY
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != K2_INVOCATION
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != K2_APPROVAL
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != DONE_GATE_PROVEN_READY_BY_P7
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != VERIFIED
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != FIXED
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != REVERIFIED
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != AUTOFIX
VERIFICATION_ENGINE_RECEIPT_LEDGER_READ_EVIDENCE_BOUND_ONLY != PATCH_RETRY_AUTHORITY
P7_R18_CLOSED != SUCCESSOR_IMPLEMENTATION_AUTHORITY
P7_R18_CLOSED != P7_OVERALL_CLOSED
P7_R18_CLOSED != P8_P9_AUTHORITY
P7_R18_CLOSED != PROJECT_COMPLETION
```

All still-effective predecessor P7 non-grants remain in force, including the complete canonical R17 and R16 non-equivalences. Omission of a predecessor boundary from this condensed roadmap is not authorization, proof, waiver, supersession, or narrowing.

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
POST-R18 SUCCESSOR IMPLEMENTATION = NOT_AUTHORIZED_BY_NUMBERING
PATCH_APPLICATION = NOT_AUTHORIZED
PATCH_RETRY = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_INVOCATION = NOT_AUTHORIZED
K2_APPROVAL_CREATION = NOT_AUTHORIZED
K2_AUTHORITY_EXPANSION = NONE
VERIFICATION_PLANNER_INVOCATION = NOT_AUTHORIZED
VERIFICATION_ENGINE_INVOCATION = NOT_AUTHORIZED_BY_THIS_RECONCILIATION
VERIFICATION_EXECUTION = NOT_AUTHORIZED
VERIFICATION_REPORT_CREATION = NOT_AUTHORIZED
EVENT_PRODUCER_AUTHENTICITY_PROOF = NOT_ESTABLISHED
HISTORICAL_RECEIPT_LEDGER_FILE_IDENTITY_PROOF = NOT_ESTABLISHED
HISTORICAL_RECEIPT_LEDGER_COMPLETENESS_PROOF = NOT_ESTABLISHED
RECEIPT_LEDGER_ABSENCE_PROOF = NOT_ESTABLISHED
RECEIPT_LEDGER_APPEND_HISTORY_PROOF = NOT_ESTABLISHED
EXECUTION_RECEIPT_AUTHENTICITY = NOT_ESTABLISHED
POLICY_DECISION_AUTHENTICITY_PROOF = NOT_ESTABLISHED
POLICY_RULE_OR_VERSION_IDENTITY_PROOF = NOT_ESTABLISHED
POLICY_AUTHORIZATION_PROOF = NOT_ESTABLISHED
WORKSPACE_INTEGRITY_HISTORICAL_PROOF = NOT_ESTABLISHED
GIT_DIFF_OR_STATUS_HISTORICAL_SEMANTIC_PROOF = NOT_ESTABLISHED
FULL_VERIFICATION_ENGINE_HISTORICAL_EXECUTION_PROOF = NOT_ESTABLISHED
CAPABILITY_AUTHORIZATION_PROOF = NOT_ESTABLISHED
VERIFIED = NOT_ESTABLISHED
FIXED = NOT_ESTABLISHED
REVERIFIED = NOT_ESTABLISHED
DONE_GATE_PROVEN_READY = NOT_ESTABLISHED_BY_P7
DONE_GATE_INVOCATION_OR_MUTATION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
NEW_DEPENDENCY_DONOR_ADMISSION = NONE
PERSISTENCE_DATABASE_TELEMETRY_UPLOAD_LEARNING = NOT_AUTHORIZED
CLI_API_PACKAGE_ROOT_PRODUCT_INTEGRATION = NOT_AUTHORIZED
P8_P9_IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC_RELEASE_PACKAGE_PUBLICATION_DEPLOYMENT = NOT_AUTHORIZED
RULESET_CHANGE_BYPASS = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

Only after this exact five-view R18 reconciliation closes by guarded merge plus complete post-merge proof may fresh successor-authority analysis run from then-live truth. No successor implementation authority follows by numbering, composition, roadmap language, or founder permission.
