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
| P7-R3 post-merge current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| P7-R4+ | **NOT_AUTHORIZED_BY_NUMBERING** | Fresh successor analysis only after reconciliation proof |
| P7 overall | **NOT_CLOSED** | P7-R3 closure is not overall closure |
| Patch application / autofix | **NOT_AUTHORIZED** | Pre-execution binding is not execution authority |
| Filesystem / Git write | **NOT_AUTHORIZED** | No application authority exists |
| Repository write authority | **NONE** | P7 data contracts cannot write repository state |
| K2 invocation / authority expansion | **NOT_AUTHORIZED / NONE** | Existing K2 boundary unchanged |
| Applied / verification failed / verified | **NOT_ESTABLISHED** | Requires separately authorized execution/evidence |
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
#359 P7-R2 post-merge current-view reconciliation
  -> #359 comment 5552837458 fresh successor analysis / ANALYSIS_ONLY
  -> #360 P7-R3 pre-execution intent-binding authorization
  -> #361 P7-R3 pre-execution intent-binding implementation
  -> #361 comment 5553023397 current-view reconciliation analysis / ANALYSIS_ONLY
  -> #362 P7-R3 current-view reconciliation authorization
  -> CURRENT: exact five-current-view reconciliation candidate
```

Canonical anchors:

```text
#359 = d74cf1379316ee9d5b121fbb7b536772ec7cea00 / proof 5552811852
#360 = a2ddc989857294b92913a354a8a129ecf331f2ed / proof 5552924883
#360 qualified head = b896cf3538196dfe57231983bb8ee86b579027ea
#361 = 4f464286443d4298f78b5bcc873aa2c4203054b9 / proof 5553018473
#361 qualified head = c79b02be006697bd1dddfe326dfae26e4b3f5c10
#362 = 1acf7f8c920f59bf4187a8e4072c808b7479f51d / proof 5553049120
#362 qualified head = ef82a7f76380fe03e3f00a457d3a27812322eaa8
```

---

## Bounded P7-R3 semantics

P7-R3 is a pure/data-only immutable pre-execution binding over one exact valid P7-R1 proposal, one exact valid matching P7-R2 authorization, and exact inert patch text.

```text
VALID P7-R1 PROPOSAL
+ VALID MATCHING P7-R2 AUTHORIZATION
+ EXACT PATCH TEXT <= 1_048_576 UTF-8 BYTES
+ SHA256(PATCH TEXT) == P7-R2 PATCH ARTIFACT DIGEST
+ CANONICAL PURE PATCH PARSE
+ NO MOVE SEMANTICS
+ EXACT PATH / OPERATION MATCH
-> CONTENT-ADDRESSED DETACHED/FROZEN PRE-EXECUTION BINDING
```

Canonical implementation blobs:

```text
source = 53119aded3de7c945967248e5ec19196bf03e2c7
schema = 74852ac9141f28466c7a3902df7441b876bd919d
test = 011a7e53f10da80138ac8f4cc06a33c505c38fb0
```

Required non-equivalences:

```text
PRE_EXECUTION_BINDING != PATCH_APPLICATION
PRE_EXECUTION_BINDING != K2_EXECUTION
PRE_EXECUTION_BINDING != GENERIC_K2_ONE_SHOT_APPROVAL
PRE_EXECUTION_BINDING != APPLIED
PRE_EXECUTION_BINDING != VERIFIED
PRE_EXECUTION_BINDING != FIXED
PRE_EXECUTION_BINDING != REVERIFIED
PRE_EXECUTION_BINDING != DONE_GATE
PATCH_DIGEST_MATCH != PATCH_SEMANTIC_CORRECTNESS
WRITE_ALLOWLIST_MATCH != EXECUTED_WRITE_SET
P7-R3 CLOSED != P7-R4+ AUTHORITY
P7-R3 CLOSED != P7 OVERALL CLOSED
P7-R3 CLOSED != P8 AUTHORITY
P7-R3 CLOSED != PROJECT COMPLETION
```

---

## Current authorized unit

Canonical #362 and proof `5553049120` authorize only this exact five-path documentation-only reconciliation candidate:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized. The candidate cannot claim its own closure before guarded merge and external post-merge proof.

After that proof, run fresh successor-authority analysis. Do not infer P7-R4, patch application, K2 invocation, lifecycle advancement, P8/P9, product/release work, or project completion.
