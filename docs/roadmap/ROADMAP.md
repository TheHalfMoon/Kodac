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
| P5-R1 Evidence Provenance Binding | **CLOSED_CANONICAL** | PR #333 / proof `5550968215` |
| P5-R2 Evidence Relation Edge | **CLOSED_CANONICAL** | PR #337 / proof `5551261065` |
| P5-R2 current-view reconciliation | **CLOSED_CANONICAL** | PR #339 / proof `5551404984` |
| P5 bounded R1-R2 closeout authorization | **CLOSED_CANONICAL** | PR #340 / proof `5551456429` |
| P5 bounded R1-R2 engineering scope | **CURRENT_CLOSEOUT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Six documentation/evidence paths only |
| P5-R3+ | **NOT_AUTHORIZED** | No authority by numbering/composition |
| ProofGraph | **NOT_AUTHORIZED** | Planning direction only |
| Automatic freshness / dependency invalidation | **NOT_AUTHORIZED** | Separate future authority required |
| P5 overall | **NOT_CLOSED** | Bounded R1-R2 candidate is not overall closure |
| P6-P9 | **PLANNING DIRECTION ONLY / IMPLEMENTATION NOT_AUTHORIZED** | Separate future authority required |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical P5 sequence

```text
#332 P5-R1 authorization
  -> #333 P5-R1 implementation
  -> #334 P5-R1 reconciliation authorization
  -> #335 P5-R1 current-view reconciliation
  -> #335 comment 5551117643 fresh successor analysis / ANALYSIS_ONLY
  -> #336 P5-R2 authorization
  -> #337 P5-R2 implementation
  -> #337 comment 5551265629 reconciliation analysis / ANALYSIS_ONLY
  -> #338 P5-R2 reconciliation authorization
  -> #339 P5-R2 current-view reconciliation
  -> #339 comment 5551419975 fresh post-R2 analysis / ANALYSIS_ONLY
  -> #340 bounded R1-R2 closeout authorization
  -> CURRENT: bounded R1-R2 six-path closeout candidate
```

Canonical merge/proof anchors:

```text
#332 = 39a732aecee8ebd69c5f294d2aa135288edc6d97 / proof 5550880869
#333 = cef7a375e366795913879bed82f3d2bffe7647aa / proof 5550968215
#334 = 3ef17af23c686b18aa0f383c681b72c672137d51 / proof 5550995814
#335 = 64f468a8cee37e07d252e32cd97b1a229856b65b / proof 5551095617
#336 = 5c4f4886c734c02f87d1aa611ef0751ab1d995d2 / proof 5551168295
#337 = b35b1703579efb77453ca7a24923ecbace9afaac / proof 5551261065
#338 = de2735ffd7698e13f4adfb4a2c7ef98ee32177d3 / proof 5551292787
#339 = b5785beb24b0f939fc3d9c51b5292efbe5e0ee82 / proof 5551404984
#340 = 8eb6dd521e4c5ecc1bd964576bffd4f1e7cfd4fb / proof 5551456429
```

---

## Bounded P5 semantics

P5-R1:

```text
existing evidence identity/ref/digest
+ exact repository revision and repository identity
+ producer/configuration/policy/scope/input/environment identities
+ caller-supplied CURRENT | STALE plus basis identity
-> deterministic content-addressed detached/frozen provenance binding
```

P5-R2:

```text
exact validated P5-R1 source binding
+ caller-supplied SUPPORTS | CONTRADICTS | SUPERSEDES
+ exact validated P5-R1 target binding
+ exact shared repositoryId / canonicalBase / candidateHead
+ distinct source/target binding identities
-> deterministic content-addressed detached/frozen directed evidence-relation edge
```

Canonical implementation blobs:

```text
packages/kodac-runtime/src/verification/p5-evidence-provenance.ts = 4c8d708070e950d2902308ca1977ce5267acec29
schema/p5-evidence-provenance.schema.json = b7c1d2573a1dbe3b34c5a1e5dc0a5c2fceb1418e
packages/kodac-runtime/test/p5-r1-evidence-provenance.test.ts = 512ab506898d945aed8381352906c4e03bcbd487

packages/kodac-runtime/src/verification/p5-evidence-relation.ts = d33fb119ee8cbeda6e7c8e445cad6cee4b242e86
schema/p5-evidence-relation.schema.json = cb2574e1c656f7a5537985035ad43bb1637c51a7
packages/kodac-runtime/test/p5-r2-evidence-relation.test.ts = 1a78da0fbc65c2403134b42555311fe12d3f9355
```

---

## Why there is no automatic P5-R3

Fresh post-R2 analysis found no additional narrow non-duplicative P5 mechanism required before bounded closeout. Canonical predecessors already exist for Verification Plan, Verifier Registry, Verification Result/Report, K5 proof linkage/reconciliation, and P4 verifier-proposal/critic semantics.

A full ProofGraph or dependency-aware Evidence Freshness Graph would introduce broader aggregation/invalidation semantics and remains outside current authority.

```text
P5-R3+ AUTHORITY BY NUMBERING = REJECTED
PROOFGRAPH = NOT_AUTHORIZED
AUTOMATIC FRESHNESS / DEPENDENCY INVALIDATION = NOT_AUTHORIZED
```

---

## Current closeout boundary

Canonical #340 authorizes exactly:

```text
docs/planning/KODAC_P5_BOUNDED_R1_R2_CANONICAL_CLOSEOUT_EVIDENCE_2026-09-05.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No seventh path. The candidate may aggregate already-proven P5 R1-R2 evidence only and cannot certify its own future post-merge proof.

Until external proof exists:

```text
P5_BOUNDED_R1_R2_ENGINEERING_SCOPE = CURRENT_CLOSEOUT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
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

After the closeout candidate is post-merge proven, fresh reconciliation analysis is required before any successor implementation analysis.
