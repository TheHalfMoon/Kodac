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
| P6-R1 Deterministic Security Finding Foundation | **CLOSED_CANONICAL** | #345 / proof `5551884329` |
| P6 bounded R1 engineering scope | **CLOSED_CANONICAL** | #349 / proof `5552035602` |
| P6 post-closeout current-view reconciliation | **CLOSED_CANONICAL** | #351 / proof `5552175515` |
| P6-R2+ | **NOT_AUTHORIZED_BY_NUMBERING** | No authority by sequence |
| P6 overall | **NOT_CLOSED** | Bounded R1 closure is not overall closure |
| P7-R1 authorization | **CLOSED_CANONICAL** | #352 / proof `5552233040` |
| P7-R1 Immutable Patch Proposal Foundation | **CLOSED_CANONICAL** | #353 / proof `5552429216` |
| P7-R1 post-merge current-view reconciliation | **CLOSED_CANONICAL** | #355 / proof `5552575380` |
| P7-R2 patch-application authorization | **CLOSED_CANONICAL** | #356 / proof `5552630320` |
| P7-R2 patch-application authorization implementation | **CLOSED_CANONICAL** | #357 / proof `5552730805` |
| P7-R2 current-view reconciliation authorization | **CLOSED_CANONICAL** | #358 / proof `5552762029` |
| P7-R2 post-merge current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| P7-R3+ | **NOT_AUTHORIZED_BY_NUMBERING** | No authority by sequence |
| P7 overall | **NOT_CLOSED** | P7-R2 closure is not overall closure |
| Patch application / remediation execution | **NOT_AUTHORIZED** | Authorization record is data only |
| Filesystem / Git write | **NOT_AUTHORIZED** | No application authority exists |
| Repository write authority | **NONE** | No P7 side effects authorized |
| K2 invocation / authority expansion | **NOT_AUTHORIZED / NONE** | Existing K2 boundary unchanged |
| Applied / verified / fixed / Done Gate | **NOT_ESTABLISHED** | No execution evidence exists |
| Scanner/analyzer execution | **NOT_AUTHORIZED** | Pure/data-only P6-R1 only |
| SARIF ingestion | **NOT_AUTHORIZED** | Separate future authority required |
| Secret/network/exploit access | **NOT_AUTHORIZED** | No side-effect authority |
| New dependency/donor admission | **NONE** | Separate future authority required |
| P8-P9 | **IMPLEMENTATION NOT_AUTHORIZED** | Planning direction only |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical P7 anchors

```text
P7_R1_RECONCILIATION
  PR = #355
  MERGE = 8bf95e90e42a1c27193942b336a3bc744b7cd7d8
  PROOF = 5552575380
  STATE = CLOSED_CANONICAL

P7_R2_SUCCESSOR_ANALYSIS
  PR = #355
  COMMENT = 5552596379
  CLASS = ANALYSIS_ONLY

P7_R2_AUTHORIZATION
  PR = #356
  MERGE = 0bd5aa263df07057b99bdf408a4b0cdab2636063
  PROOF = 5552630320
  STATE = CLOSED_CANONICAL

P7_R2_IMPLEMENTATION
  PR = #357
  QUALIFIED_HEAD = 39497ed25fac7ae7870b10c5b8f87eac73a6eb4d
  MERGE = 7bf6af800c0fa2b6413d3284a4f97db2b8683547
  PROOF = 5552730805
  STATE = CLOSED_CANONICAL

P7_R2_RECONCILIATION_ANALYSIS
  PR = #357
  COMMENT = 5552739213
  CLASS = ANALYSIS_ONLY

P7_R2_RECONCILIATION_AUTHORIZATION
  PR = #358
  QUALIFIED_HEAD = 3cb314d513c2c41baad9f9d654e4961a3507d8bb
  MERGE = 91f442a889ac825bca6a944830e64995be931da8
  PROOF = 5552762029
  STATE = CLOSED_CANONICAL

RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

---

## Canonical P7-R2 implementation identities

```text
P7-R2 source = a8740b04e650c3317b65584ecdac6c8a4b764d10
P7-R2 schema = fec866d048a1d4fc93d712fbd676030bbd93d24f
P7-R2 test = 6764094e259ef5b22d5899ab5104f969e9f27fd2
```

The current reconciliation may not modify those bytes.

---

## Bounded P7-R2 semantics

```text
P7-R2
= pure/data-only immutable AUTHORIZED_TO_APPLY record
+ one exact valid P7-R1 source proposal
+ exact source-bound repository/canonicalBase/targetHead/patch digest
+ fixed ACCEPT_RISK disposition
+ bounded authorizer/rationale/evidence references
+ exact write allowlist derived only from source proposal change paths
+ deterministic content addressing
+ detached/deeply immutable return value
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
P7-R2 CLOSED != PROJECT COMPLETION
```

---

## Current reconciliation gate

Canonical #358 and proof `5552762029` authorize exactly five paths:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path. This candidate may record already-proven P7-R1/P7-R2 truth only and cannot certify its own future merge/post-merge proof.

It must prove on one frozen exact head:

```text
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 5
FIVE_BLOBS = FROZEN
REQUIRED_CI = TERMINAL_SUCCESS_OR_PROVEN_NON_APPLICABLE
INTERNAL_SUBSTANTIVE_SEMANTIC_SECURITY_INSPECTION = CLEAN
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
RULESET_20707483 = active / no bypass
GUARDED_NORMAL_MERGE_WITH_EXACT_EXPECTED_HEAD_SHA = REQUIRED
COMPLETE_POST_MERGE_PROOF = REQUIRED
WAIVER = NO
```

Until external proof exists:

```text
P7-R2 POST-MERGE CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
```

---

## Preserved non-grants

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
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P7-R3+ = NOT_AUTHORIZED_BY_NUMBERING
PATCH_APPLICATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
FILESYSTEM_GIT_WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_INVOCATION = NOT_AUTHORIZED
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
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

Only after this reconciliation is post-merge proven may fresh successor-authority analysis begin. No P7-R3, patch execution, K2 invocation, autofix, P8/P9, product/release work, or project completion follows by numbering or composition.
