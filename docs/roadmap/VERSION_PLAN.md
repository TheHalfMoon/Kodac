# Kodac Version Plan

## Purpose

This file summarizes current version/program sequencing. It is not an authorization record. Live GitHub, root `AGENTS.md`, accepted ADRs, and exact canonical authorization/evidence records control implementation and merge authority.

---

## Current bounded program state

```text
K0 / K1 = CLOSED
K2 = CLOSED / TRUSTED SIDE-EFFECT EXECUTION BOUNDARY
K3 BOUNDED R1-R6 = CLOSED
KRI-R1 THROUGH KRI-R4 = CLOSED_CANONICAL
K4 BOUNDED R1-R5 = CLOSED_CANONICAL
K5 BOUNDED R1-R5 = CLOSED_CANONICAL
K6 BOUNDED CLOSEOUT = CLOSED_CANONICAL

P2-R1 THROUGH P2-R6 = CLOSED_CANONICAL
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED

P3 BOUNDED R1-R17 ENGINEERING SCOPE = CLOSED_CANONICAL
P3 OVERALL = OPEN

P4 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL
P4 OVERALL = OPEN

P5-R1 EVIDENCE PROVENANCE BINDING = CLOSED_CANONICAL
P5-R2 EVIDENCE RELATION EDGE = CLOSED_CANONICAL
P5-R2 POST-MERGE CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL / #339 / proof 5551404984
P5 BOUNDED R1-R2 CLOSEOUT AUTHORIZATION = CLOSED_CANONICAL / #340 / proof 5551456429
P5 BOUNDED R1-R2 ENGINEERING SCOPE = CURRENT_CLOSEOUT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
AUTOMATIC FRESHNESS / DEPENDENCY INVALIDATION = NOT_AUTHORIZED
P5 OVERALL = NOT_CLOSED

P6-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

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
  -> #340 P5 bounded R1-R2 closeout authorization
  -> CURRENT: six-path bounded R1-R2 closeout candidate
```

Canonical anchors:

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

## Release-independent P5 meaning

P5-R1 is one deterministic provider-neutral provenance binding over already-existing evidence. P5-R2 is one deterministic caller-supplied `SUPPORTS | CONTRADICTS | SUPERSEDES` relation edge over two exact P5-R1 bindings at one exact repository revision.

Canonical implementation blobs:

```text
P5-R1 source = 4c8d708070e950d2902308ca1977ce5267acec29
P5-R1 schema = b7c1d2573a1dbe3b34c5a1e5dc0a5c2fceb1418e
P5-R1 test = 512ab506898d945aed8381352906c4e03bcbd487

P5-R2 source = d33fb119ee8cbeda6e7c8e445cad6cee4b242e86
P5-R2 schema = cb2574e1c656f7a5537985035ad43bb1637c51a7
P5-R2 test = 1a78da0fbc65c2403134b42555311fe12d3f9355
```

Required boundaries:

```text
PROVENANCE BINDING != SOURCE EVIDENCE VALIDATION / PROOF / AUTHORITY
CALLER-SUPPLIED FRESHNESS != AUTOMATIC FRESHNESS DETERMINATION
CALLER-SUPPLIED RELATION != TRUTH
RELATION EDGE != PROOF / AUTHORITY / ADJUDICATION / VERIFICATION RESULT
RELATION EDGE != VERIFIER EXECUTION
RELATION EDGE != PROOFGRAPH / GRAPH STORAGE / TRAVERSAL / INFERENCE
```

---

## Current closeout

Canonical #340 authorizes only:

```text
docs/planning/KODAC_P5_BOUNDED_R1_R2_CANONICAL_CLOSEOUT_EVIDENCE_2026-09-05.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No seventh path. This candidate may aggregate canonical R1-R2 lineage but must not self-certify its own closeout. Only future external post-merge proof may establish aggregate bounded closure.

---

## Future dependency map

The Trust and Verification v2 amendment remains planning direction only:

```text
P2 KodacBench 2.0
P3 Context Engine v2
P4 Reviewer Intelligence v2
P5 Proof and Verification Fabric
P6 Security, Supply-Chain, and Attack Validation
P7 Bounded Remediation
P8 Agent Trust Gateway and Developer Distribution
P9 Continuous Assurance
R Advanced Research
```

No later stage becomes authorized by appearing in this map.

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
PUBLIC SUPERIORITY / BEST-IN-CLASS CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Version/release boundary

No version bump, package publication, release tag, deployment, public benchmark claim, or product availability change is authorized by this closeout candidate.
