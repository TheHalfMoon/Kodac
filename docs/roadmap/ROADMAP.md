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
| P7-R1 post-merge current-view reconciliation | **CLOSED_CANONICAL** | PR #355 / proof `5552575380` |
| P7-R2 patch-application authorization | **CLOSED_CANONICAL** | PR #356 / proof `5552630320` |
| P7-R2 patch-application authorization implementation | **CLOSED_CANONICAL** | PR #357 / proof `5552730805` |
| P7-R2 current-view reconciliation authorization | **CLOSED_CANONICAL** | PR #358 / proof `5552762029` |
| P7-R2 post-merge current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| P7-R3+ | **NOT_AUTHORIZED_BY_NUMBERING** | Fresh successor analysis only after reconciliation proof |
| P7 overall | **NOT_CLOSED** | P7-R2 closure is not overall closure |
| Patch application / autofix | **NOT_AUTHORIZED** | Authorization data is not execution authority |
| Filesystem / Git write | **NOT_AUTHORIZED** | No application authority exists |
| Repository write authority | **NONE** | P7 data contracts cannot write repository state |
| K2 invocation / authority expansion | **NOT_AUTHORIZED / NONE** | Existing K2 boundary unchanged |
| Applied / verified / fixed / Done Gate | **NOT_ESTABLISHED** | Requires separately authorized execution/evidence |
| Scanner/analyzer execution | **NOT_AUTHORIZED** | P6-R1 remains pure/data-only |
| SARIF ingestion | **NOT_AUTHORIZED** | Separate future authority required |
| Secret/network/exploit access | **NOT_AUTHORIZED** | No side-effect authority created |
| New dependency/donor admission | **NONE** | Separate authority required |
| P8-P9 | **IMPLEMENTATION NOT_AUTHORIZED** | Planning direction only |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical P7 sequence

```text
#355 P7-R1 post-merge current-view reconciliation
  -> #355 comment 5552596379 fresh successor analysis / ANALYSIS_ONLY
  -> #356 P7-R2 patch-application authorization
  -> #357 P7-R2 patch-application authorization implementation
  -> #357 comment 5552739213 current-view reconciliation analysis / ANALYSIS_ONLY
  -> #358 P7-R2 current-view reconciliation authorization
  -> CURRENT: exact five-current-view reconciliation candidate
```

Canonical anchors:

```text
#355 = 8bf95e90e42a1c27193942b336a3bc744b7cd7d8 / proof 5552575380
#356 = 0bd5aa263df07057b99bdf408a4b0cdab2636063 / proof 5552630320
#357 = 7bf6af800c0fa2b6413d3284a4f97db2b8683547 / proof 5552730805
#357 qualified head = 39497ed25fac7ae7870b10c5b8f87eac73a6eb4d
#358 = 91f442a889ac825bca6a944830e64995be931da8 / proof 5552762029
#358 qualified head = 3cb314d513c2c41baad9f9d654e4961a3507d8bb
```

---

## Bounded P7-R2 semantics

P7-R2 is one pure/data-only immutable authorization decision over one exact valid P7-R1 proposal:

```text
VALID P7-R1 PROPOSAL
+ SOURCE-BOUND REPOSITORY / BASE / HEAD / PATCH DIGEST
+ FIXED AUTHORIZED_TO_APPLY STATE
+ FIXED ACCEPT_RISK DISPOSITION
+ BOUNDED AUTHORIZER / RATIONALE / EVIDENCE REFERENCES
+ WRITE ALLOWLIST EXACTLY DERIVED FROM SOURCE PROPOSAL CHANGE PATHS
-> CONTENT-ADDRESSED DETACHED/FROZEN AUTHORIZATION RECORD
```

Canonical implementation blobs:

```text
source = a8740b04e650c3317b65584ecdac6c8a4b764d10
schema = fec866d048a1d4fc93d712fbd676030bbd93d24f
test = 6764094e259ef5b22d5899ab5104f969e9f27fd2
```

Required non-equivalences:

```text
PATCH_PROPOSAL != AUTHORIZATION_TO_APPLY
AUTHORIZED_TO_APPLY != PATCH_APPLICATION
AUTHORIZED_TO_APPLY != K2_EXECUTION
AUTHORIZED_TO_APPLY != GENERIC_K2_ONE_SHOT_APPROVAL
AUTHORIZED_TO_APPLY != APPLIED_PATCH
AUTHORIZED_TO_APPLY != VERIFIED_REMEDIATION
AUTHORIZED_TO_APPLY != FIXED_FINDING
AUTHORIZED_TO_APPLY != DONE_GATE
WRITE_ALLOWLIST != EXECUTED_WRITE_SET
P7-R2 CLOSED != P7-R3+ AUTHORITY
P7-R2 CLOSED != P7 OVERALL CLOSED
P7-R2 CLOSED != P8 AUTHORITY
```

---

## Current reconciliation boundary

Canonical #358 and proof `5552762029` authorize exactly:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path. The candidate records already-proven P7-R1/P7-R2 truth and cannot certify its own future post-merge proof.

Until external proof exists:

```text
P7-R2 POST-MERGE CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
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
P7-R3+ = NOT_AUTHORIZED_BY_NUMBERING
PATCH_APPLICATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_INVOCATION = NOT_AUTHORIZED
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

Only after this reconciliation is post-merge proven may fresh successor-authority analysis run. Do not infer P7-R3, patch application, K2 execution, autofix, P8/P9, product/release work, or project completion by numbering or composition.
