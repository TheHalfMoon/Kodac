# Kodac Engineering Milestones

## Authority

This file is a current milestone ledger. It does not authorize implementation, execution, release, provider/model access, persistence, learning, dependencies, benchmark execution, donor intake, public claims, successor work, merge, or project completion. Live GitHub, root `AGENTS.md`, accepted ADRs, and exact canonical authorization/evidence records remain authoritative.

---

## Current milestone ledger

| Milestone / gate | Status | Current boundary |
| --- | --- | --- |
| K0 / K1 | **CLOSED** | Architecture/governance foundation |
| K2 | **CLOSED** | Trusted side-effect execution boundary |
| K3 bounded R1-R6 | **CLOSED** | K3-R7+ not authorized by numbering |
| KRI-R1 through KRI-R4 | **CLOSED_CANONICAL** | Reviewer-intelligence substrate |
| K4 bounded R1-R5 | **CLOSED_CANONICAL** | Data-only bounded scope |
| K5 bounded R1-R5 | **CLOSED_CANONICAL** | Proof-review scope; Done Gate unchanged |
| K6 bounded closeout | **CLOSED_CANONICAL** | No later authority by composition |
| P2-R1 through P2-R6 | **CLOSED_CANONICAL** | Bounded benchmark/evidence mechanisms |
| P2 overall | **OPEN** | General/public KodacBench not closed |
| P2-R7+ | **NOT_AUTHORIZED BY NUMBERING** | Fresh authority required |
| P3-R1 through P3-R17 | **CLOSED_CANONICAL individually** | Bounded context/evidence mechanisms |
| P3 bounded R1-R17 engineering scope | **CLOSED_CANONICAL** | Aggregate bounded closeout |
| P3 post-closeout current-view reconciliation | **CLOSED_CANONICAL** | Reconciled current views |
| P3 overall | **OPEN** | No general promotion/default/superiority conclusion |
| P3-R18+ | **NOT_AUTHORIZED** | Fresh authority required |
| Trust and Verification Master Plan v2 amendment | **CLOSED_CANONICAL / PLANNING_DIRECTION_ONLY** | P4-P9 dependency direction only |
| P4-R1 | **CLOSED_CANONICAL** | Reviewer Claim Evidence Envelope |
| P4-R2 | **CLOSED_CANONICAL** | Structured Critic Disposition |
| P4 bounded R1-R2 engineering scope | **CLOSED_CANONICAL** | PR #329 / proof `5547554548` |
| P4 post-closeout current-view reconciliation | **CLOSED_CANONICAL** | PR #331 / proof `5550826662` |
| P4 overall | **OPEN** | Bounded closeout is not overall closure |
| P4-R3+ | **NOT_AUTHORIZED** | No authority by numbering |
| P5-R1 authorization | **CLOSED_CANONICAL** | PR #332 / proof `5550880869` |
| P5-R1 Evidence Provenance Binding | **CLOSED_CANONICAL** | PR #333 / proof `5550968215` |
| P5-R1 post-merge current-view reconciliation | **CLOSED_CANONICAL** | PR #335 / proof `5551095617` |
| P5-R2 authorization | **CLOSED_CANONICAL** | PR #336 / proof `5551168295` |
| P5-R2 Evidence Relation Edge | **CLOSED_CANONICAL** | PR #337 / proof `5551261065` |
| P5-R2 reconciliation authorization | **CLOSED_CANONICAL** | PR #338 / proof `5551292787` |
| P5-R2 post-merge current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| P5-R3+ | **NOT_AUTHORIZED** | No authority by numbering/composition |
| ProofGraph | **NOT_AUTHORIZED** | Planning direction only |
| P5 overall | **NOT_CLOSED** | R1/R2 closure is not overall closure |
| P6-P9 | **PLANNING DIRECTION ONLY / IMPLEMENTATION NOT_AUTHORIZED** | Separate authority required |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical P5 anchors

```text
P5_R1_AUTHORIZATION = #332 / 39a732aecee8ebd69c5f294d2aa135288edc6d97 / proof 5550880869
P5_R1_IMPLEMENTATION = #333 / cef7a375e366795913879bed82f3d2bffe7647aa / proof 5550968215
P5_R1_QUALIFIED_HEAD = 7ccc8516938be0578d7648c4b7f07e89af86b306
P5_R1_POST_MERGE_RECONCILIATION_AUTHORIZATION = #334 / 3ef17af23c686b18aa0f383c681b72c672137d51 / proof 5550995814
P5_R1_POST_MERGE_RECONCILIATION = #335 / 64f468a8cee37e07d252e32cd97b1a229856b65b / proof 5551095617
P5_POST_R1_SUCCESSOR_ANALYSIS = #335 / comment 5551117643 / ANALYSIS_ONLY
P5_R2_AUTHORIZATION = #336 / 5c4f4886c734c02f87d1aa611ef0751ab1d995d2 / proof 5551168295
P5_R2_IMPLEMENTATION = #337 / b35b1703579efb77453ca7a24923ecbace9afaac / proof 5551261065
P5_R2_QUALIFIED_HEAD = 0b412e2eea8f392d77ef2b98d6eaa1eb8a4f530b
P5_POST_R2_RECONCILIATION_ANALYSIS = #337 / comment 5551265629 / ANALYSIS_ONLY
P5_R2_POST_MERGE_RECONCILIATION_AUTHORIZATION = #338 / de2735ffd7698e13f4adfb4a2c7ef98ee32177d3 / proof 5551292787
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

---

## Canonical P5 implementation identities

P5-R1:

```text
packages/kodac-runtime/src/verification/p5-evidence-provenance.ts
  = 4c8d708070e950d2902308ca1977ce5267acec29
schema/p5-evidence-provenance.schema.json
  = b7c1d2573a1dbe3b34c5a1e5dc0a5c2fceb1418e
packages/kodac-runtime/test/p5-r1-evidence-provenance.test.ts
  = 512ab506898d945aed8381352906c4e03bcbd487
```

P5-R2:

```text
packages/kodac-runtime/src/verification/p5-evidence-relation.ts
  = d33fb119ee8cbeda6e7c8e445cad6cee4b242e86
schema/p5-evidence-relation.schema.json
  = cb2574e1c656f7a5537985035ad43bb1637c51a7
packages/kodac-runtime/test/p5-r2-evidence-relation.test.ts
  = 1a78da0fbc65c2403134b42555311fe12d3f9355
```

The current reconciliation may not modify those bytes.

---

## Bounded P5 meaning

```text
P5-R1
= deterministic provider-neutral provenance sidecar over already-existing evidence identity/ref/digest
+ exact repository base/head + repository identity
+ producer/configuration/policy/scope/input/environment identities
+ caller-supplied CURRENT | STALE freshness + basis identity
+ detached/frozen content-addressed result

P5-R2
= deterministic directed edge over two exact validated P5-R1 bindings
+ SUPPORTS | CONTRADICTS | SUPERSEDES supplied by caller
+ exact shared repositoryId / canonicalBase / candidateHead
+ distinct source / target binding identities
+ detached/frozen content-addressed result
```

Required non-equivalences:

```text
PROVENANCE BINDING != SOURCE EVIDENCE VALIDATION
PROVENANCE BINDING != PROOF
CALLER-SUPPLIED FRESHNESS != AUTOMATIC FRESHNESS DETERMINATION
CALLER-SUPPLIED RELATION != TRUTH
RELATION EDGE != PROOF / AUTHORITY / ADJUDICATION / VERIFICATION RESULT
RELATION EDGE != VERIFIER EXECUTION
RELATION EDGE != PROOFGRAPH
RELATION EDGE != GRAPH STORAGE / TRAVERSAL / INFERENCE
P5-R2 CLOSED != P5-R3+ AUTHORITY
P5-R2 CLOSED != P5 OVERALL CLOSED
```

---

## Material P5 qualification history

P5-R1 initial implementation head `35dd6b2434a3586f320f378dd5aa30428fcc3ed2` failed exact-head TypeScript qualification. The authorized forward-only test repair produced final qualified head `7ccc8516938be0578d7648c4b7f07e89af86b306`, after which the full required matrix passed.

P5-R2 preserves this exact-head CI event:

```text
FIRST_UBUNTU_ATTEMPT = FAILED_ONE_UNRELATED_PRE_EXISTING_H4_R3G_B_TEST
P5_R1_P5_R2_TESTS_ON_FIRST_UBUNTU_ATTEMPT = PASS
CANDIDATE_H4_PATH_CHANGES = NONE
SAME_EXACT_HEAD_UBUNTU_RERUN = SUCCESS
FINAL_K2_RUNTIME_GATE = SUCCESS
HEAD_MOVEMENT_DURING_RERUN = NONE
```

This history must not be rewritten as first-attempt success.

---

## Current reconciliation gate

Canonical PR #338 authorizes exactly five paths:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized. This candidate may record already-proven canonical truth only and cannot certify its own future merge/post-merge proof.

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
REAL BENCHMARK EXECUTION = NOT_AUTHORIZED
P2-R7+ = NOT_AUTHORIZED BY NUMBERING
P3-R18+ = NOT_AUTHORIZED
P4-R3+ = NOT_AUTHORIZED
P5-R3+ = NOT_AUTHORIZED
P6-P9 IMPLEMENTATION = NOT_AUTHORIZED
REVIEWER / CRITIC / VERIFIER / PROVIDER / MODEL EXECUTION = NOT_AUTHORIZED
KRI ADJUDICATION MUTATION = NOT_AUTHORIZED
SOURCE EVIDENCE VALIDATION = NOT_AUTHORIZED BY P5-R1/R2
AUTOMATIC FRESHNESS COMPUTATION = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
KRI / K5 / K2 AUTHORITY MUTATION = NOT_AUTHORIZED
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
PUBLIC SUPERIORITY / BEST-IN-CLASS CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Next boundary

After this five-current-view reconciliation itself is post-merge proven, run fresh evidence-driven successor analysis. Do not infer P5-R3, ProofGraph, or later implementation by numbering or planning order.
