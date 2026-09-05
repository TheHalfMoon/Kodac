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
| P5-R1 Evidence Provenance Binding | **CLOSED_CANONICAL** | #333 / proof `5550968215` |
| P5-R1 current-view reconciliation | **CLOSED_CANONICAL** | #335 / proof `5551095617` |
| P5-R2 Evidence Relation Edge | **CLOSED_CANONICAL** | #337 / proof `5551261065` |
| P5-R2 current-view reconciliation | **CLOSED_CANONICAL** | #339 / proof `5551404984` |
| P5 bounded R1-R2 closeout authorization | **CLOSED_CANONICAL** | #340 / proof `5551456429` |
| P5 bounded R1-R2 engineering scope | **CLOSED_CANONICAL** | #341 / proof `5551577054` |
| P5 post-closeout reconciliation authorization | **CLOSED_CANONICAL** | #342 / proof `5551608905` |
| P5 post-closeout current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| P5-R3+ | **NOT_AUTHORIZED** | No authority by numbering/composition |
| ProofGraph | **NOT_AUTHORIZED** | Separate future authority required |
| Automatic freshness / dependency invalidation | **NOT_AUTHORIZED** | Separate future authority required |
| P5 overall | **NOT_CLOSED** | Bounded R1-R2 closure is not overall closure |
| P6-P9 | **PLANNING DIRECTION ONLY / IMPLEMENTATION NOT_AUTHORIZED** | Separate future authority required |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical P5 anchors

```text
P5_R1_AUTHORIZATION = #332 / 39a732aecee8ebd69c5f294d2aa135288edc6d97 / proof 5550880869
P5_R1_IMPLEMENTATION = #333 / cef7a375e366795913879bed82f3d2bffe7647aa / proof 5550968215
P5_R1_QUALIFIED_HEAD = 7ccc8516938be0578d7648c4b7f07e89af86b306
P5_R1_RECONCILIATION_AUTHORIZATION = #334 / 3ef17af23c686b18aa0f383c681b72c672137d51 / proof 5550995814
P5_R1_RECONCILIATION = #335 / 64f468a8cee37e07d252e32cd97b1a229856b65b / proof 5551095617
P5_POST_R1_SUCCESSOR_ANALYSIS = #335 / comment 5551117643 / ANALYSIS_ONLY
P5_R2_AUTHORIZATION = #336 / 5c4f4886c734c02f87d1aa611ef0751ab1d995d2 / proof 5551168295
P5_R2_IMPLEMENTATION = #337 / b35b1703579efb77453ca7a24923ecbace9afaac / proof 5551261065
P5_R2_QUALIFIED_HEAD = 0b412e2eea8f392d77ef2b98d6eaa1eb8a4f530b
P5_R2_RECONCILIATION_AUTHORIZATION = #338 / de2735ffd7698e13f4adfb4a2c7ef98ee32177d3 / proof 5551292787
P5_R2_RECONCILIATION = #339 / b5785beb24b0f939fc3d9c51b5292efbe5e0ee82 / proof 5551404984
P5_POST_R2_SUCCESSOR_ANALYSIS = #339 / comment 5551419975 / ANALYSIS_ONLY
P5_BOUNDED_R1_R2_CLOSEOUT_AUTHORIZATION = #340 / 8eb6dd521e4c5ecc1bd964576bffd4f1e7cfd4fb / proof 5551456429
P5_BOUNDED_R1_R2_CLOSEOUT = #341 / 13ebbbbb3f1a3bb0a32c2873aa9ea6c67c1c8b9a / proof 5551577054
P5_POST_CLOSEOUT_RECONCILIATION_ANALYSIS = #341 / comment 5551579509 / ANALYSIS_ONLY
P5_POST_CLOSEOUT_RECONCILIATION_AUTHORIZATION = #342 / 8c4f57ba9245e9911422e3e14864f4258897621a / proof 5551608905
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

---

## Canonical P5 implementation identities

```text
P5-R1 source = 4c8d708070e950d2902308ca1977ce5267acec29
P5-R1 schema = b7c1d2573a1dbe3b34c5a1e5dc0a5c2fceb1418e
P5-R1 test = 512ab506898d945aed8381352906c4e03bcbd487

P5-R2 source = d33fb119ee8cbeda6e7c8e445cad6cee4b242e86
P5-R2 schema = cb2574e1c656f7a5537985035ad43bb1637c51a7
P5-R2 test = 1a78da0fbc65c2403134b42555311fe12d3f9355
```

The current reconciliation may not modify those bytes.

---

## Bounded P5 semantics

```text
P5-R1
= deterministic provider-neutral provenance binding over already-existing evidence
+ exact repository revision and producer/configuration/policy/scope/input/environment identities
+ caller-supplied CURRENT | STALE freshness + basis identity

P5-R2
= deterministic directed evidence edge over two exact validated P5-R1 bindings
+ caller-supplied SUPPORTS | CONTRADICTS | SUPERSEDES
+ exact shared repositoryId / canonicalBase / candidateHead
+ distinct source/target binding identities
```

Required non-equivalences:

```text
PROVENANCE BINDING != SOURCE EVIDENCE VALIDATION / PROOF / AUTHORITY
CALLER-SUPPLIED FRESHNESS != AUTOMATIC FRESHNESS DETERMINATION
CALLER-SUPPLIED RELATION != TRUTH
RELATION EDGE != PROOF / AUTHORITY / ADJUDICATION / VERIFICATION RESULT
RELATION EDGE != VERIFIER EXECUTION
RELATION EDGE != PROOFGRAPH / GRAPH STORAGE / TRAVERSAL / INFERENCE
```

---

## Material qualification history

P5-R1 first failed exact-head TypeScript qualification at `35dd6b2434a3586f320f378dd5aa30428fcc3ed2`; the authorized test repair was forward-only and final head `7ccc8516938be0578d7648c4b7f07e89af86b306` was requalified from scratch.

P5-R2 preserved an unrelated pre-existing H4-R3G-B Ubuntu test failure on its first exact-head attempt. All P5 tests passed, the candidate head did not move, the same Ubuntu job rerun succeeded, and final K2 gate passed.

The #338 authorization candidate also required a forward-only semantic repair from `cc518a31ba1f681c2281657ba13524112b31e1b3` to `a990f42e58d6eb2d9601a1e85e873cdd21bea952` to prevent self-certification.

The #341 closeout evidence preserved its own forward-only wording repair before final qualification; pre-repair evidence is stale.

---

## Current reconciliation gate

Canonical #342 authorizes exactly five paths:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path. This candidate may record already-proven P5 bounded-closeout truth only and cannot certify its own future merge/post-merge proof.

It must still prove on one frozen exact head:

```text
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 5
FIVE BLOBS = FROZEN
REQUIRED CI = TERMINAL SUCCESS OR PROVEN NON_APPLICABLE
INTERNAL SUBSTANTIVE SEMANTIC INSPECTION = CLEAN
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
P5_POST_CLOSEOUT_CURRENT_VIEW_RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
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
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
AUTOMATIC FRESHNESS / DEPENDENCY INVALIDATION = NOT_AUTHORIZED
P6-P9 IMPLEMENTATION = NOT_AUTHORIZED
REVIEWER / CRITIC / VERIFIER / PROVIDER / MODEL EXECUTION EXPANSION = NOT_AUTHORIZED
KRI / K5 / K2 AUTHORITY MUTATION = NOT_AUTHORIZED
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
CLI / API / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

Only after this reconciliation itself is post-merge proven may fresh successor analysis begin. Do not infer P5-R3, ProofGraph, automatic freshness, P6, or later implementation by numbering or composition.
