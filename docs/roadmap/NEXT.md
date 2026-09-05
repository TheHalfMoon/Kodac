# Kodac — NEXT

> **Start here before doing repository work.**

## Authority

This file is navigation/status only. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, successor, merge, or project-completion authority.

Before any mutation:

1. re-read live GitHub `main`, open PRs, exact heads, changed paths, checks, comments/reviews/threads, mergeability, and ruleset `20707483`;
2. read root `AGENTS.md`;
3. read this file;
4. read the exact canonical authorization/evidence record for the active unit;
5. execute only that unit and its explicit allowlist.

Live GitHub and exact canonical authorization/evidence records override this page.

---

## Current canonical truth

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
P2-R7+ = NOT_AUTHORIZED BY NUMBERING

P3-R1 THROUGH P3-R17 = CLOSED_CANONICAL INDIVIDUALLY
P3 BOUNDED R1-R17 ENGINEERING SCOPE = CLOSED_CANONICAL
P3 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R18+ = NOT_AUTHORIZED

TRUST_AND_VERIFICATION_MASTER_PLAN_V2_AMENDMENT = CLOSED_CANONICAL / PLANNING_DIRECTION_ONLY

P4-R1 = CLOSED_CANONICAL
P4-R2 = CLOSED_CANONICAL
P4 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL
P4 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P4 OVERALL = OPEN
P4-R3+ = NOT_AUTHORIZED

P5-R1 EVIDENCE PROVENANCE BINDING = CLOSED_CANONICAL
P5-R1 POST-MERGE CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P5-R2 EVIDENCE RELATION EDGE = CLOSED_CANONICAL
P5-R2 POST-MERGE CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL / PR #339 / proof 5551404984
P5 BOUNDED R1-R2 CLOSEOUT AUTHORIZATION = CLOSED_CANONICAL / PR #340 / proof 5551456429
P5 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL / PR #341 / proof 5551577054
P5 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION AUTHORIZATION = CLOSED_CANONICAL / PR #342 / proof 5551608905
P5 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
AUTOMATIC FRESHNESS / DEPENDENCY INVALIDATION = NOT_AUTHORIZED
P5 OVERALL = NOT_CLOSED

P6-P9 = PLANNING DIRECTION ONLY / IMPLEMENTATION NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## NOW — authorized P5 post-closeout five-current-view reconciliation

Canonical PR #342 and post-merge proof `5551608905` authorize exactly these five current-view paths:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized.

This candidate may record already-proven P5 R1-R2 closeout truth only. It does not modify runtime/schema/tests, historical authorization/evidence records, dependencies, workflows, KRI/K5/K2 authority, benchmark data, provider/model configuration, persistence, product surfaces, release configuration, or rulesets.

It must not self-certify its own reconciliation. Until guarded merge and mandatory post-merge proof exist:

```text
P5_POST_CLOSEOUT_CURRENT_VIEW_RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
```

---

## Canonical P5 lineage

```text
#332 P5-R1 authorization
  merge 39a732aecee8ebd69c5f294d2aa135288edc6d97 / proof 5550880869

#333 P5-R1 implementation
  initial failed head 35dd6b2434a3586f320f378dd5aa30428fcc3ed2
  final qualified head 7ccc8516938be0578d7648c4b7f07e89af86b306
  merge cef7a375e366795913879bed82f3d2bffe7647aa / proof 5550968215

#334 P5-R1 reconciliation authorization
  merge 3ef17af23c686b18aa0f383c681b72c672137d51 / proof 5550995814

#335 P5-R1 current-view reconciliation
  merge 64f468a8cee37e07d252e32cd97b1a229856b65b / proof 5551095617

#336 P5-R2 authorization
  merge 5c4f4886c734c02f87d1aa611ef0751ab1d995d2 / proof 5551168295

#337 P5-R2 implementation
  qualified head 0b412e2eea8f392d77ef2b98d6eaa1eb8a4f530b
  merge b35b1703579efb77453ca7a24923ecbace9afaac / proof 5551261065

#338 P5-R2 reconciliation authorization
  initial defective head cc518a31ba1f681c2281657ba13524112b31e1b3
  final qualified head a990f42e58d6eb2d9601a1e85e873cdd21bea952
  merge de2735ffd7698e13f4adfb4a2c7ef98ee32177d3 / proof 5551292787

#339 P5-R2 current-view reconciliation
  merge b5785beb24b0f939fc3d9c51b5292efbe5e0ee82 / proof 5551404984

#339 comment 5551419975
  fresh post-R2 successor analysis / ANALYSIS_ONLY

#340 bounded R1-R2 closeout authorization
  merge 8eb6dd521e4c5ecc1bd964576bffd4f1e7cfd4fb / proof 5551456429

#341 bounded R1-R2 engineering closeout
  merge 13ebbbbb3f1a3bb0a32c2873aa9ea6c67c1c8b9a / proof 5551577054

#341 comment 5551579509
  fresh post-closeout reconciliation analysis / ANALYSIS_ONLY

#342 post-closeout current-view reconciliation authorization
  merge 8c4f57ba9245e9911422e3e14864f4258897621a / proof 5551608905
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

---

## Bounded meaning and non-equivalences

```text
P5-R1 = provenance binding over already-existing evidence
P5-R2 = one caller-supplied SUPPORTS | CONTRADICTS | SUPERSEDES edge over two exact P5-R1 bindings

PROVENANCE BINDING != SOURCE EVIDENCE VALIDATION / PROOF / AUTHORITY
CALLER-SUPPLIED FRESHNESS != AUTOMATIC FRESHNESS DETERMINATION
CALLER-SUPPLIED RELATION != TRUTH
RELATION EDGE != PROOF / AUTHORITY / ADJUDICATION / VERIFICATION RESULT
RELATION EDGE != VERIFIER EXECUTION
RELATION EDGE != PROOFGRAPH / GRAPH STORAGE / TRAVERSAL / INFERENCE
```

Fresh post-R2 analysis found no justified non-duplicative P5-R3 mechanism before bounded closeout. Existing canonical predecessors already cover Verification Plan, Verifier Registry, Verification Result/Report, K5 proof linkage/reconciliation, and P4 verifier proposals/critic semantics.

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
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## THEN — mandatory proof and fresh successor analysis

Only after this five-path candidate qualifies, merges guarded, and passes complete post-merge proof may external evidence establish:

```text
P5_POST_CLOSEOUT_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL
```

Only then run fresh evidence-driven successor analysis. Do not infer P5-R3, ProofGraph, automatic freshness, P6, or later stages by numbering or composition.

## Navigation

- Working rules: `AGENTS.md`
- P5 closeout authorization: `docs/planning/KODAC_P5_BOUNDED_R1_R2_CLOSEOUT_AUTHORIZATION_2026-09-05.md`
- P5 closeout evidence: `docs/planning/KODAC_P5_BOUNDED_R1_R2_CANONICAL_CLOSEOUT_EVIDENCE_2026-09-05.md`
- Post-closeout reconciliation authorization: `docs/planning/KODAC_P5_R1_R2_POST_CLOSEOUT_CURRENT_VIEW_RECONCILIATION_AUTHORIZATION_2026-09-05.md`
- Trust v2 direction: `docs/planning/KODAC_TRUST_AND_VERIFICATION_MASTER_PLAN_V2_AMENDMENT_2026-09-02.md`
- Final gap review: `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`
