# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, successor, merge, or project-completion authority. Live GitHub, root `AGENTS.md`, accepted ADRs, and exact canonical authorization/evidence records always win.

---

## Canonical program state

| Program / gate | Current state | Boundary |
| --- | --- | --- |
| K0 / K1 | **CLOSED** | Foundation only |
| K2 | **CLOSED** | Trusted side-effect execution boundary unchanged |
| K3 bounded R1-R6 | **CLOSED** | No later K3 authority by numbering |
| KRI-R1 through KRI-R4 | **CLOSED_CANONICAL** | Reviewer-intelligence substrate |
| K4 bounded R1-R5 | **CLOSED_CANONICAL** | Bounded data-only scope |
| K5 bounded R1-R5 | **CLOSED_CANONICAL** | Proof-review substrate; Done Gate unchanged |
| K6 bounded closeout | **CLOSED_CANONICAL** | No later authority by composition |
| P2-R1 through P2-R6 | **CLOSED_CANONICAL** | Bounded KodacBench mechanisms |
| P2 overall | **OPEN** | General/public KodacBench not closed |
| P2-R7+ | **NOT_AUTHORIZED BY NUMBERING** | Fresh authority required |
| P3-R1 through P3-R17 | **CLOSED_CANONICAL individually** | Bounded context/evidence mechanisms |
| P3 bounded R1-R17 engineering scope | **CLOSED_CANONICAL** | Aggregate bounded engineering closeout |
| P3 post-closeout current-view reconciliation | **CLOSED_CANONICAL** | Current-view state reconciled |
| P3 overall | **OPEN** | No general promotion/default/superiority conclusion |
| P3-R18+ | **NOT_AUTHORIZED** | No authority by numbering |
| Trust and Verification Master Plan v2 amendment | **CLOSED_CANONICAL / PLANNING_DIRECTION_ONLY** | Dependency direction only |
| P4-R1 | **CLOSED_CANONICAL** | Reviewer Claim Evidence Envelope Foundation |
| P4-R2 | **CLOSED_CANONICAL** | Structured Critic Disposition |
| P4 bounded R1-R2 engineering scope | **CLOSED_CANONICAL** | PR #329 / proof `5547554548` |
| P4 post-closeout current-view reconciliation | **CLOSED_CANONICAL** | PR #331 / proof `5550826662` |
| P4 overall | **OPEN** | Bounded closeout is not overall closure |
| P4-R3+ | **NOT_AUTHORIZED** | Fresh authority required |
| P5-R1 Evidence Provenance Binding | **CLOSED_CANONICAL** | PR #333 / proof `5550968215` |
| P5-R1 post-merge current-view reconciliation | **CLOSED_CANONICAL** | PR #335 / proof `5551095617` |
| P5-R2 authorization | **CLOSED_CANONICAL** | PR #336 / proof `5551168295` |
| P5-R2 Evidence Relation Edge | **CLOSED_CANONICAL** | PR #337 / proof `5551261065` |
| P5-R2 reconciliation authorization | **CLOSED_CANONICAL** | PR #338 / proof `5551292787` |
| P5-R2 post-merge current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths; no self-certification |
| P5-R3+ | **NOT_AUTHORIZED** | No authority by numbering or composition |
| ProofGraph | **NOT_AUTHORIZED** | Planning direction is not implementation authority |
| P5 overall | **NOT_CLOSED** | R1/R2 closure is not overall closure |
| P6-P9 | **PLANNING DIRECTION ONLY / IMPLEMENTATION NOT_AUTHORIZED** | Separate future authority required |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical P5 lineage

```text
#332  P5-R1 Evidence Provenance Binding authorization
  merge 39a732aecee8ebd69c5f294d2aa135288edc6d97
  proof 5550880869

#333  P5-R1 Evidence Provenance Binding implementation
  initial failed head 35dd6b2434a3586f320f378dd5aa30428fcc3ed2
  final qualified head 7ccc8516938be0578d7648c4b7f07e89af86b306
  merge cef7a375e366795913879bed82f3d2bffe7647aa
  proof 5550968215

#334  P5-R1 post-merge current-view reconciliation authorization
  merge 3ef17af23c686b18aa0f383c681b72c672137d51
  proof 5550995814

#335  P5-R1 post-merge current-view reconciliation
  merge 64f468a8cee37e07d252e32cd97b1a229856b65b
  proof 5551095617

#335 comment 5551117643
  fresh successor analysis / ANALYSIS_ONLY

#336  P5-R2 Evidence Relation Edge authorization
  final head d62ef5a15d2ab5e9faa3782d557521a0830af699
  merge 5c4f4886c734c02f87d1aa611ef0751ab1d995d2
  proof 5551168295

#337  P5-R2 Evidence Relation Edge implementation
  qualified head 0b412e2eea8f392d77ef2b98d6eaa1eb8a4f530b
  merge b35b1703579efb77453ca7a24923ecbace9afaac
  proof 5551261065

#337 comment 5551265629
  post-R2 reconciliation analysis / ANALYSIS_ONLY

#338  P5-R2 post-merge current-view reconciliation authorization
  qualified head a990f42e58d6eb2d9601a1e85e873cdd21bea952
  merge de2735ffd7698e13f4adfb4a2c7ef98ee32177d3
  proof 5551292787
```

---

## P5-R1 — Evidence Provenance Binding

```text
existing evidence identity / ref / digest
+ exact repository base / candidate head / repository identity
+ producer id / version / configuration identity
+ policy / scope / input / environment identities
+ caller-supplied CURRENT | STALE + freshness basis identity
-> deterministic content-addressed detached/frozen provenance binding
```

Canonical blobs:

```text
packages/kodac-runtime/src/verification/p5-evidence-provenance.ts
  4c8d708070e950d2902308ca1977ce5267acec29
schema/p5-evidence-provenance.schema.json
  b7c1d2573a1dbe3b34c5a1e5dc0a5c2fceb1418e
packages/kodac-runtime/test/p5-r1-evidence-provenance.test.ts
  512ab506898d945aed8381352906c4e03bcbd487
```

P5-R1 does not validate source evidence, compute freshness, execute a verifier, create ProofGraph, mutate KRI/K5/K2 authority, or create product/release authority.

---

## P5-R2 — Evidence Relation Edge

```text
exact validated P5-R1 source binding
+ caller-supplied SUPPORTS | CONTRADICTS | SUPERSEDES
+ exact validated P5-R1 target binding
+ exact same repositoryId / canonicalBase / candidateHead
+ distinct source and target binding identities
-> deterministic content-addressed detached/frozen directed evidence-relation edge
```

Canonical blobs:

```text
packages/kodac-runtime/src/verification/p5-evidence-relation.ts
  d33fb119ee8cbeda6e7c8e445cad6cee4b242e86
schema/p5-evidence-relation.schema.json
  cb2574e1c656f7a5537985035ad43bb1637c51a7
packages/kodac-runtime/test/p5-r2-evidence-relation.test.ts
  1a78da0fbc65c2403134b42555311fe12d3f9355
```

Required non-equivalences:

```text
CALLER-SUPPLIED RELATION != TRUTH
RELATION EDGE != PROOF
RELATION EDGE != AUTHORITY
RELATION EDGE != ADJUDICATION
RELATION EDGE != VERIFICATION RESULT
RELATION EDGE != VERIFIER EXECUTION
RELATION EDGE != AUTOMATIC FRESHNESS
RELATION EDGE != PROOFGRAPH
RELATION EDGE != GRAPH STORAGE / TRAVERSAL / TRANSITIVE CLOSURE / INVERSE INFERENCE
```

---

## Material qualification history

P5-R1 preserves its forward-only TypeScript qualification repair.

P5-R2 preserves the exact-head CI event below rather than rewriting it as first-attempt success:

```text
FIRST_UBUNTU_ATTEMPT = FAILED_ONE_UNRELATED_PRE_EXISTING_H4_R3G_B_TEST
P5_R1_P5_R2_TESTS_ON_FIRST_UBUNTU_ATTEMPT = PASS
CANDIDATE_H4_PATH_CHANGES = NONE
SAME_EXACT_HEAD_UBUNTU_RERUN = SUCCESS
FINAL_K2_RUNTIME_GATE = SUCCESS
HEAD_MOVEMENT_DURING_RERUN = NONE
```

---

## Current reconciliation boundary

Canonical PR #338 authorizes exactly:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized. This five-path candidate may record already-proven truth only and must describe itself as `CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL` until guarded merge and post-merge proof exist.

---

## Ordered trust program

The Trust and Verification v2 amendment defines dependency direction, not authority:

```text
P2 KodacBench 2.0
-> P3 Context Engine v2
-> P4 Reviewer Intelligence v2
-> P5 Proof and Verification Fabric
   -> R1 Evidence Provenance Binding [CLOSED_CANONICAL]
   -> R2 Evidence Relation Edge [CLOSED_CANONICAL]
   -> post-R2 current-view reconciliation [CURRENT_CANDIDATE]
   -> R3+ [NOT_AUTHORIZED]
-> P6 Security, Supply-Chain, and Attack Validation [PLANNING DIRECTION ONLY]
-> P7 Bounded Remediation [PLANNING DIRECTION ONLY]
-> P8 Agent Trust Gateway and Developer Distribution [PLANNING DIRECTION ONLY]
-> P9 Continuous Assurance [PLANNING DIRECTION ONLY]
```

No later stage becomes authorized by appearing in this map.

---

## Preserved authority boundaries

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

After this reconciliation is post-merge proven, run fresh evidence-driven successor analysis. Do not infer P5-R3 by numbering or plan order.
