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
| P7-R5+ | **NOT_AUTHORIZED_BY_NUMBERING** | Fresh successor analysis only after reconciliation proof |
| P7 overall | **NOT_CLOSED** | P7-R4 closure is not overall closure |
| Patch application / autofix | **NOT_AUTHORIZED** | Applied evidence is not execution authority |
| Filesystem / Git write | **NOT_AUTHORIZED** | No application authority exists |
| Repository write authority | **NONE** | P7 data contracts cannot write repository state |
| K2 invocation / authority expansion | **NOT_AUTHORIZED / NONE** | Existing K2 boundary unchanged |
| Applied evidence only | **ESTABLISHED_BY_P7_R4_CONTRACT** | Contract state only; fixture receipts are not actual execution claims |
| Verification failed / verified | **NOT_ESTABLISHED** | Requires separately authorized verification evidence |
| Fixed / reverified / Done Gate | **NOT_ESTABLISHED** | Requires separately authorized lifecycle evidence |
| Scanner/analyzer execution | **NOT_AUTHORIZED** | P6-R1 remains pure/data-only |
| SARIF ingestion | **NOT_AUTHORIZED** | Separate future authority required |
| Secret/network/exploit access | **NOT_AUTHORIZED** | No side-effect authority created |
| New dependency/donor admission | **NONE** | Separate authority required |
| P8-P9 | **IMPLEMENTATION NOT_AUTHORIZED** | Planning direction only |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical P7 sequence

```text
#363 P7-R3 post-merge current-view reconciliation
  -> #363 comment 5553366154 fresh successor analysis / ANALYSIS_ONLY
  -> #364 P7-R4 applied-patch-evidence-binding authorization
  -> #365 P7-R4 applied-patch-evidence-binding implementation
  -> #365 comment 5553524060 current-view reconciliation analysis / ANALYSIS_ONLY
  -> #366 P7-R4 current-view reconciliation authorization
  -> CURRENT: exact five-current-view reconciliation candidate
```

Canonical anchors:

```text
#363 = 0713d1f17d65f6dd8be0408f017c053021b575f5 / proof 5553345846
#364 = 34d975eb752a634c7a6445161972ffb81671a731 / proof 5553391471
#365 = 6c10d898ea43fda9003de761badd07c5b113043d / proof 5553509882
#365 qualified head = f162f9531a33c61bde93f42d3c7307f2c6124e1e
#366 = 378005971f3cd9fe5ddc9efdc237e93c34d63fe3 / proof 5553556112
#366 qualified head = fd840fbc5b3d383218d2fbebff6695b1b93180d8
```

---

## Bounded P7-R4 semantics

P7-R4 is a pure/data-only immutable applied-patch evidence binding over exact valid P7-R1/R2/R3 lineage, exact inert patch text, and one supplied strictly validated successful existing `repo.apply_patch` receipt.

```text
VALID P7-R1 PROPOSAL
+ VALID MATCHING P7-R2 AUTHORIZATION
+ VALID MATCHING P7-R3 PRE-EXECUTION BINDING
+ EXACT PATCH TEXT
+ STRICTLY VALIDATED EXISTING SUCCESSFUL repo.apply_patch RECEIPT
+ RECEIPT POLICY == allow
+ RECEIPT DIGEST / PATHS / AFFECTED OPERATIONS == P7-R3 PROJECTION
+ VALID RECEIPT TIMESTAMPS / POST-STATE DIGEST
+ VALID OPTIONAL APPROVAL / CONFINEMENT EVIDENCE WHEN PRESENT
-> CONTENT-ADDRESSED DETACHED/FROZEN APPLIED EVIDENCE BINDING
```

Canonical implementation blobs:

```text
source = eb25540f83e4b7a817f190618f9daae5839130f2
schema = e1b11582559bd574d0159b68e95c1b258bd6e1c5
test = 391488f1e2ce24ccaa2646ddeb520af4e1c520da
```

P7-R4 test receipts are fixture contract data only and do not establish actual K2 remediation execution.

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

## Current authorized unit

Canonical #366 and proof `5553556112` authorize only this exact five-path documentation-only reconciliation candidate:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized. The candidate cannot claim its own closure before guarded merge and external post-merge proof.

After that proof, run fresh successor-authority analysis. Do not infer P7-R5, verification execution, VERIFIED/FIXED/REVERIFIED/Done Gate state, patch application, K2 invocation, autofix, P8/P9, product/release work, or project completion.
