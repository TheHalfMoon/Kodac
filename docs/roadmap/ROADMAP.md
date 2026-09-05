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
| P3 overall | **OPEN** | No general promotion/default/superiority claim |
| P4 bounded R1-R2 engineering scope | **CLOSED_CANONICAL** | Aggregate bounded scope only |
| P4 overall | **OPEN** | No overall closure |
| P5 bounded R1-R2 engineering scope | **CLOSED_CANONICAL** | Bounded scope only |
| P5 post-closeout current-view reconciliation | **CLOSED_CANONICAL** | #343 / proof `5551673149` |
| P5-R3+ | **NOT_AUTHORIZED** | No authority by numbering/composition |
| P5 overall | **NOT_CLOSED** | Bounded closure is not overall closure |
| P6-R1 deterministic security finding foundation | **CLOSED_CANONICAL** | #345 / proof `5551884329` |
| P6 post-closeout current-view reconciliation | **CLOSED_CANONICAL** | #351 / proof `5552175515` |
| P6-R2+ | **NOT_AUTHORIZED_BY_NUMBERING** | No authority by sequence |
| P6 overall | **NOT_CLOSED** | Bounded closure is not overall closure |
| P7-R1 through P7-R3 bounded data contracts | **CLOSED_CANONICAL** | No side effects implied |
| P7-R4 applied-patch-evidence binding | **CLOSED_CANONICAL** | #365 / proof `5553509882` |
| P7-R4 post-merge current-view reconciliation | **CLOSED_CANONICAL** | #367 / proof `5553600421` |
| P7-R5 successor analysis | **ANALYSIS_ONLY** | #367 comment `5553695694` |
| P7-R5 verification-plan-binding authorization | **CLOSED_CANONICAL** | #368 / proof `5553737255` |
| P7-R5 verification-plan-binding implementation | **CLOSED_CANONICAL** | #369 / proof `5553946597`; `VERIFICATION_PLAN_BOUND_ONLY` |
| P7-R5 current-view reconciliation analysis | **ANALYSIS_ONLY** | #369 comment `5553949322` |
| P7-R5 current-view reconciliation authorization | **CLOSED_CANONICAL** | #370 / proof `5553973273` |
| P7-R5 post-merge current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| P7-R6+ | **NOT_AUTHORIZED_BY_NUMBERING** | Fresh successor analysis only after reconciliation proof |
| P7 overall | **NOT_CLOSED** | R5 closure is not overall closure |
| Patch application / autofix | **NOT_AUTHORIZED** | P7 contracts do not grant execution authority |
| Filesystem / Git write | **NOT_AUTHORIZED** | No application authority exists |
| Repository write authority | **NONE** | Current P7 scope is data-only/docs-only |
| K2 invocation / authority expansion | **NOT_AUTHORIZED / NONE** | Existing K2 boundary unchanged |
| Verification planner invocation | **NOT_AUTHORIZED** | R5 consumes supplied plan as data only |
| Verification execution/report | **NOT_AUTHORIZED** | No verifier execution authority exists |
| Verification failed / verified | **NOT_ESTABLISHED** | Requires separate evidence/authority |
| Fixed / reverified / Done Gate | **NOT_ESTABLISHED** | Requires separate lifecycle evidence |
| P8-P9 | **IMPLEMENTATION NOT_AUTHORIZED** | Planning direction only |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical P7 sequence

```text
#367 P7-R4 post-merge current-view reconciliation / proof 5553600421
  -> #367 comment 5553695694 P7-R5 successor analysis / ANALYSIS_ONLY
  -> #368 P7-R5 verification-plan-binding authorization / proof 5553737255
  -> #369 P7-R5 verification-plan-binding implementation / proof 5553946597
  -> #369 comment 5553949322 current-view reconciliation analysis / ANALYSIS_ONLY
  -> #370 P7-R5 current-view reconciliation authorization / proof 5553973273
  -> CURRENT: exact five-current-view reconciliation candidate
```

Canonical R5 anchors:

```text
qualified head = 65e69bf8177526bd161aefac29185a783f41bab6
merge = b0ee0485e7b58d0583f86c16b34ebe5214467ae7
source = a243f4dcea8499404d64df7b848504e57ffb6697
schema = 04f596f6a3053effb436f65e85de9b1b376fea4d
test = ecd515a58f3cfd4abaa89001f80192c68e39b91b
reconciliation authorization merge = eb9ac9e9a0108b61d044e592192603ee363acd1a
reconciliation authorization proof = 5553973273
```

---

## Bounded P7-R5 semantics

P7-R5 is a pure/data-only deterministic content-addressed post-apply verification-plan binding over one exact canonically revalidated P7-R4 applied-evidence lineage and one supplied strictly validated current verification plan.

```text
VALID EXACT P7-R4 APPLIED EVIDENCE
+ EXACT PREDECESSOR INPUT REQUIRED FOR CANONICAL R4 REVALIDATION
+ SUPPLIED STRICTLY VALIDATED kodac.verification-plan
+ RECOMPUTED CURRENT PLANNER STABLE-PROJECTION DIGEST
+ EXACT APPLIED CHANGED PATHS
+ AT LEAST ONE TESTS-CATEGORY COMMAND
-> CONTENT-ADDRESSED VERIFICATION_PLAN_BOUND RECORD
```

It does not invoke the planner, execute verification, create a verification report, establish `VERIFICATION_FAILED`/`VERIFIED`, invoke K2, apply a patch, advance Done Gate, or perform autofix.

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

## Current authorized unit

Canonical #370 / proof `5553973273` authorizes only the exact five current-view paths. No sixth path is authorized. This candidate cannot claim its own closure before guarded merge and external post-merge proof.

After that proof, run fresh successor-authority analysis. No P7-R6, verification execution, lifecycle advancement, patch execution, K2 invocation, P8/P9, release, or project completion follows by numbering or composition.
