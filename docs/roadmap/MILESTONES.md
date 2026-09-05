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
| P6-R1 authorization | **CLOSED_CANONICAL** | #344 / proof `5551754576` |
| P6-R1 Deterministic Security Finding Foundation | **CLOSED_CANONICAL** | #345 / proof `5551884329` |
| P6-R1 current-view reconciliation | **CLOSED_CANONICAL** | #347 / proof `5551961606` |
| P6 bounded R1 closeout authorization | **CLOSED_CANONICAL** | #348 / proof `5551993370` |
| P6 bounded R1 engineering scope | **CLOSED_CANONICAL** | #349 / proof `5552035602` |
| P6 post-closeout reconciliation authorization | **CLOSED_CANONICAL** | #350 / proof `5552132556` |
| P6 post-closeout current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| P6-R2+ | **NOT_AUTHORIZED_BY_NUMBERING** | No authority by sequence |
| P6 overall | **NOT_CLOSED** | Bounded R1 closure is not overall closure |
| Scanner/analyzer execution | **NOT_AUTHORIZED** | Pure/data-only P6-R1 only |
| SARIF ingestion | **NOT_AUTHORIZED** | Separate future authority required |
| Secret/network/exploit access | **NOT_AUTHORIZED** | No side-effect authority |
| New dependency/donor admission | **NONE** | Separate future authority required |
| P7-P9 | **IMPLEMENTATION NOT_AUTHORIZED** | Planning direction only |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical P6 anchors

```text
P6_R1_AUTHORIZATION
  PR = #344
  MERGE = 208bfc370c8671bd9b5a71d659355aa08e40d65a
  PROOF = 5551754576
  STATE = CLOSED_CANONICAL

P6_R1_IMPLEMENTATION
  PR = #345
  INITIAL_FAILED_HEAD = 4953d0f3a1fa2f639e494ef74aedc4fb5c83bdea
  FINAL_QUALIFIED_HEAD = 60bc2e3e157b8eacac145ef22fa7cdaae1428baa
  MERGE = 0f907b6f6e12a15da753e836b124c586ee9fe285
  PROOF = 5551884329
  STATE = CLOSED_CANONICAL

P6_R1_CURRENT_VIEW_RECONCILIATION
  PR = #347
  MERGE = fd2c53682dde47b795740cc706b28852397f3ec6
  PROOF = 5551961606
  STATE = CLOSED_CANONICAL

P6_POST_R1_SUCCESSOR_ANALYSIS
  PR = #347
  COMMENT = 5551968892
  CLASS = ANALYSIS_ONLY
  CONCLUSION = NO ADDITIONAL NUMBERED P6 MECHANISM PROVEN NECESSARY BEFORE BOUNDED CLOSEOUT

P6_BOUNDED_R1_CLOSEOUT_AUTHORIZATION
  PR = #348
  MERGE = 82cb0e1b2c4739537a1355ec6e6fdd63759cbc5d
  PROOF = 5551993370
  STATE = CLOSED_CANONICAL

P6_BOUNDED_R1_CLOSEOUT
  PR = #349
  QUALIFIED_HEAD = bb3de55c08289727034e9ed62d96863f336ee3f6
  MERGE = 206741c67021864ffdaea1f57aa91bf7d1509a48
  PROOF = 5552035602
  STATE = CLOSED_CANONICAL

P6_POST_CLOSEOUT_RECONCILIATION_ANALYSIS
  PR = #349
  COMMENT = 5552036750
  CLASS = ANALYSIS_ONLY

P6_POST_CLOSEOUT_RECONCILIATION_AUTHORIZATION
  PR = #350
  QUALIFIED_HEAD = 6c21903e9e66bb52db34c8b724e8e25ee2de08bc
  MERGE = 2f2596a6c316863abf6effca46d6e88fbdc314a8
  PROOF = 5552132556
  STATE = CLOSED_CANONICAL

RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

---

## Canonical P6-R1 implementation identities

```text
P6-R1 source = 453166c7f8c5e49f9b0f7cc2cd744c7ec54b38d0
P6-R1 schema = d7586b0d434cca713ea7d112d6d1b0407558cc50
P6-R1 test = fa489fafd8cb8ecfc3ff684fa08425b1ed48ab67
```

The current reconciliation may not modify those bytes.

---

## Bounded P6-R1 semantics

```text
P6-R1
= pure/data-only provider-neutral deterministic security finding record
+ exact validated canonical P5-R1 provenance binding
+ fixed DETERMINISTIC_ANALYZER origin
+ closed security lane and severity vocabularies
+ bounded inert rule/location/reference metadata
+ lowercase SHA-256 native digest and fingerprint identities
+ deterministic content addressing
+ detached/deeply immutable return value
```

Required non-equivalences:

```text
DETERMINISTIC_SECURITY_FINDING != PROOF / TRUTH / ADJUDICATION
DETERMINISTIC_SECURITY_FINDING != EXPLOITABILITY_ESTABLISHED
DETERMINISTIC_SECURITY_FINDING != CLEAN_SCAN_OR SAFE_CLAIM
DETERMINISTIC_SECURITY_FINDING != REVIEWER_CLAIM
DETERMINISTIC_SECURITY_FINDING != VERIFIER_EXECUTION
DETERMINISTIC_SECURITY_FINDING != SCANNER_ANALYZER_EXECUTION
DETERMINISTIC_SECURITY_FINDING != SARIF_INGESTION
DETERMINISTIC_SECURITY_FINDING != SECRET_ACCESS
DETERMINISTIC_SECURITY_FINDING != NETWORK_ACCESS
DETERMINISTIC_SECURITY_FINDING != K2_K5_DONE_GATE_AUTHORITY
P6 BOUNDED R1 CLOSED != P6-R2+ AUTHORITY
P6 BOUNDED R1 CLOSED != P6 OVERALL CLOSED
```

---

## Current reconciliation gate

Canonical #350 and proof `5552132556` authorize exactly five paths:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path. This candidate may record already-proven P6 bounded closeout truth only and cannot certify its own future merge/post-merge proof.

It must prove on one frozen exact head:

```text
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 5
FIVE BLOBS = FROZEN
REQUIRED CI = TERMINAL SUCCESS OR PROVEN NON_APPLICABLE
INTERNAL SUBSTANTIVE SEMANTIC SECURITY INSPECTION = CLEAN
KNOWN ACTIONABLE DEFECTS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
RULESET 20707483 = active / no bypass
GUARDED NORMAL MERGE WITH exact expected_head_sha = REQUIRED
COMPLETE POST_MERGE_PROOF = REQUIRED
WAIVER = NO
```

Until external proof exists:

```text
P6 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
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
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
AUTOMATIC FRESHNESS / DEPENDENCY INVALIDATION = NOT_AUTHORIZED
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
REVIEWER / CRITIC / VERIFIER / PROVIDER / MODEL EXECUTION EXPANSION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
KRI / K5 / K2 AUTHORITY MUTATION = NOT_AUTHORIZED
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
P7-P9 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

Only after this reconciliation is post-merge proven may fresh successor-authority analysis begin. No P6-R2, scanner execution, SARIF, attack validation, dependency admission, P7, or later implementation follows by numbering or composition.
