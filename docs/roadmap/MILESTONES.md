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
| P7-R1 current-view reconciliation authorization | **CLOSED_CANONICAL** | #354 / proof `5552462948` |
| P7-R1 post-merge current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| P7-R2+ | **NOT_AUTHORIZED_BY_NUMBERING** | No authority by sequence |
| P7 overall | **NOT_CLOSED** | P7-R1 closure is not overall closure |
| Patch application / remediation execution | **NOT_AUTHORIZED** | Proposal data only |
| Repository write authority | **NONE** | No P7-R1 side effects |
| K2 authority expansion | **NONE** | Existing K2 boundary unchanged |
| Scanner/analyzer execution | **NOT_AUTHORIZED** | Pure/data-only P6-R1 only |
| SARIF ingestion | **NOT_AUTHORIZED** | Separate future authority required |
| Secret/network/exploit access | **NOT_AUTHORIZED** | No side-effect authority |
| New dependency/donor admission | **NONE** | Separate future authority required |
| P8-P9 | **IMPLEMENTATION NOT_AUTHORIZED** | Planning direction only |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical P6/P7 anchors

```text
P6_BOUNDED_R1_CLOSEOUT
  PR = #349
  MERGE = 206741c67021864ffdaea1f57aa91bf7d1509a48
  PROOF = 5552035602
  STATE = CLOSED_CANONICAL

P6_POST_CLOSEOUT_CURRENT_VIEW_RECONCILIATION
  PR = #351
  MERGE = 076bd55d30a6d49409e1d4598ad81f1b643bef44
  PROOF = 5552175515
  STATE = CLOSED_CANONICAL

P7_SUCCESSOR_ANALYSIS
  PR = #351
  COMMENT = 5552199411
  CLASS = ANALYSIS_ONLY

P7_R1_AUTHORIZATION
  PR = #352
  MERGE = 96c0febcfa37b1bd98eded85b38867de84bb0d31
  PROOF = 5552233040
  STATE = CLOSED_CANONICAL

P7_R1_IMPLEMENTATION
  PR = #353
  QUALIFIED_HEAD = e1bb7d9d006ff96cdf276c79c4704001bffa74e3
  MERGE = ce48aa20845874e8b0d9e9e7b250f1499bc4664e
  PROOF = 5552429216
  STATE = CLOSED_CANONICAL

P7_R1_RECONCILIATION_ANALYSIS
  PR = #353
  COMMENT = 5552433653
  CLASS = ANALYSIS_ONLY

P7_R1_RECONCILIATION_AUTHORIZATION
  PR = #354
  QUALIFIED_HEAD = 143cbc44aa4ed1ba3c80ac471d3b43211dc85a63
  MERGE = 352eaa28879275e500026cf8d787bb25322b6ef2
  PROOF = 5552462948
  STATE = CLOSED_CANONICAL

RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

---

## Canonical P7-R1 implementation identities

```text
P7-R1 source = 1dbf53388e22e0c88c6d90fa07f3f7f02a0b36f7
P7-R1 schema = 3e9665d2e157ffb69d09f81324abc32c9ae2cb18
P7-R1 test = 5eeee7b8f9027e759366e697b7c1924e2739d84c
```

The current reconciliation may not modify those bytes.

---

## Bounded P7-R1 semantics

```text
P7-R1
= pure/data-only immutable patch proposal record
+ one current KRI-R2 finding
+ first CONFIRM adjudication for the same finding
+ exact canonicalBase and targetHead identities
+ immutable patch artifact SHA-256 identity
+ bounded unique canonically ordered declared change set
+ deterministic content addressing
+ detached/deeply immutable return value
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
P7-R1 CLOSED != PROJECT COMPLETION
```

---

## Current reconciliation gate

Canonical #354 and proof `5552462948` authorize exactly five paths:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path. This candidate may record already-proven P6/P7-R1 truth only and cannot certify its own future merge/post-merge proof.

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
P7-R1 POST-MERGE CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
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
P7-R2+ = NOT_AUTHORIZED_BY_NUMBERING
PATCH_APPLICATION = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
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

Only after this reconciliation is post-merge proven may fresh successor-authority analysis begin. No P7-R2, patch execution, K2 invocation, autofix, P8/P9, product/release work, or project completion follows by numbering or composition.
