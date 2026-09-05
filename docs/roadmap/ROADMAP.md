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
| P5 bounded R1-R2 engineering scope | **CLOSED_CANONICAL** | PR #341 / proof `5551577054` |
| P5 post-closeout current-view reconciliation | **CLOSED_CANONICAL** | PR #343 / proof `5551673149` |
| P5-R3+ | **NOT_AUTHORIZED** | No authority by numbering/composition |
| P5 overall | **NOT_CLOSED** | Bounded closure is not overall closure |
| P6-R1 Deterministic Security Finding Foundation | **CLOSED_CANONICAL** | PR #345 / proof `5551884329` |
| P6 bounded R1 engineering scope | **CLOSED_CANONICAL** | PR #349 / proof `5552035602` |
| P6 post-closeout current-view reconciliation | **CLOSED_CANONICAL** | PR #351 / proof `5552175515` |
| P6-R2+ | **NOT_AUTHORIZED_BY_NUMBERING** | No authority by sequence |
| P6 overall | **NOT_CLOSED** | Bounded R1 closure is not overall closure |
| P7-R1 authorization | **CLOSED_CANONICAL** | PR #352 / proof `5552233040` |
| P7-R1 Immutable Patch Proposal Foundation | **CLOSED_CANONICAL** | PR #353 / proof `5552429216` |
| P7-R1 current-view reconciliation authorization | **CLOSED_CANONICAL** | PR #354 / proof `5552462948` |
| P7-R1 post-merge current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| P7-R2+ | **NOT_AUTHORIZED_BY_NUMBERING** | Fresh successor analysis only after reconciliation proof |
| P7 overall | **NOT_CLOSED** | P7-R1 closure is not overall closure |
| Patch application / autofix | **NOT_AUTHORIZED** | Proposal data is not execution authority |
| Repository write authority | **NONE** | P7-R1 cannot write repository state |
| K2 authority expansion | **NONE** | Existing K2 boundary unchanged |
| Scanner/analyzer execution | **NOT_AUTHORIZED** | P6-R1 remains pure/data-only |
| SARIF ingestion | **NOT_AUTHORIZED** | Separate future authority required |
| Secret/network/exploit access | **NOT_AUTHORIZED** | No side-effect authority created |
| New dependency/donor admission | **NONE** | Separate authority required |
| P8-P9 | **IMPLEMENTATION NOT_AUTHORIZED** | Planning direction only |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical P6/P7 sequence

```text
#349 P6 bounded R1 engineering closeout
  -> #350 P6 post-closeout current-view reconciliation authorization
  -> #351 P6 post-closeout current-view reconciliation
  -> #351 comment 5552199411 fresh successor analysis / ANALYSIS_ONLY
  -> #352 P7-R1 immutable patch proposal authorization
  -> #353 P7-R1 immutable patch proposal implementation
  -> #353 comment 5552433653 current-view reconciliation analysis / ANALYSIS_ONLY
  -> #354 P7-R1 current-view reconciliation authorization
  -> CURRENT: exact five-current-view reconciliation candidate
```

Canonical anchors:

```text
#349 = 206741c67021864ffdaea1f57aa91bf7d1509a48 / proof 5552035602
#350 = 2f2596a6c316863abf6effca46d6e88fbdc314a8 / proof 5552132556
#351 = 076bd55d30a6d49409e1d4598ad81f1b643bef44 / proof 5552175515
#351 successor analysis = 5552199411 / ANALYSIS_ONLY
#352 = 96c0febcfa37b1bd98eded85b38867de84bb0d31 / proof 5552233040
#353 = ce48aa20845874e8b0d9e9e7b250f1499bc4664e / proof 5552429216
#353 qualified head = e1bb7d9d006ff96cdf276c79c4704001bffa74e3
#353 reconciliation analysis = 5552433653 / ANALYSIS_ONLY
#354 = 352eaa28879275e500026cf8d787bb25322b6ef2 / proof 5552462948
```

---

## Bounded P7-R1 semantics

P7-R1 is one pure/data-only immutable proposal contract:

```text
CURRENT KRI-R2 FINDING
+ FIRST CONFIRM ADJUDICATION
+ EXACT CANONICAL BASE / TARGET HEAD
+ IMMUTABLE PATCH ARTIFACT SHA-256 IDENTITY
+ BOUNDED UNIQUE CANONICALLY ORDERED DECLARED CHANGE SET
-> CONTENT-ADDRESSED DETACHED/FROZEN PROPOSED RECORD
```

Canonical implementation blobs:

```text
source = 1dbf53388e22e0c88c6d90fa07f3f7f02a0b36f7
schema = 3e9665d2e157ffb69d09f81324abc32c9ae2cb18
test = 5eeee7b8f9027e759366e697b7c1924e2739d84c
```

Required non-equivalences:

```text
PATCH_PROPOSAL != AUTHORIZATION_TO_APPLY
PATCH_PROPOSAL != APPLIED_PATCH
PATCH_PROPOSAL != VERIFIED_REMEDIATION
PATCH_PROPOSAL != FIXED_FINDING
PATCH_PROPOSAL != DONE_GATE
PATCH_ARTIFACT_DIGEST != PATCH_VALIDATION
DECLARED_CHANGE_SET != EXECUTED_WRITE_SET
P7-R1 CLOSED != P7-R2+ AUTHORITY
P7-R1 CLOSED != P7 OVERALL CLOSED
P7-R1 CLOSED != P8 AUTHORITY
```

---

## Current reconciliation boundary

Canonical #354 and proof `5552462948` authorize exactly:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path. The candidate records already-proven P6/P7-R1 truth and cannot certify its own future post-merge proof.

Until external proof exists:

```text
P7-R1 POST-MERGE CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
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
P7-R2+ = NOT_AUTHORIZED_BY_NUMBERING
PATCH_APPLICATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
PROVIDER_MODEL_EXECUTION_EXPANSION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
P8-P9 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

Only after this reconciliation is post-merge proven may fresh successor-authority analysis run. Do not infer P7-R2, patch application, K2 execution, autofix, P8/P9, product/release work, or project completion by numbering or composition.
