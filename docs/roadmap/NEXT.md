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
P2-R7+ = NOT_AUTHORIZED BY NUMBERING
GENERAL / PUBLIC KODACBENCH = NOT CLOSED

P3-R1 THROUGH P3-R17 = CLOSED_CANONICAL INDIVIDUALLY
P3 BOUNDED R1-R17 ENGINEERING SCOPE = CLOSED_CANONICAL
P3 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R18+ = NOT_AUTHORIZED

TRUST_AND_VERIFICATION_MASTER_PLAN_V2_AMENDMENT = CLOSED_CANONICAL / PLANNING_DIRECTION_ONLY
TRUST_V2_POST_ADOPTION_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL

P4-R1 = CLOSED_CANONICAL
P4-R2 = CLOSED_CANONICAL
P4 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL
P4 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P4 OVERALL = OPEN
P4-R3+ = NOT_AUTHORIZED

P5-R1 EVIDENCE PROVENANCE BINDING = CLOSED_CANONICAL
P5-R1 POST-MERGE CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P5-R2 AUTHORIZATION = CLOSED_CANONICAL
P5-R2 EVIDENCE RELATION EDGE = CLOSED_CANONICAL
P5-R2 POST-MERGE CURRENT-VIEW RECONCILIATION AUTHORIZATION = CLOSED_CANONICAL
P5-R2 POST-MERGE CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
P5 OVERALL = NOT_CLOSED

P6-P9 = PLANNING DIRECTION ONLY / IMPLEMENTATION NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Canonical P5 lineage

```text
P5_R1_AUTHORIZATION
  #332 / 39a732aecee8ebd69c5f294d2aa135288edc6d97 / proof 5550880869

P5_R1_IMPLEMENTATION
  #333 / cef7a375e366795913879bed82f3d2bffe7647aa / proof 5550968215
  qualified head = 7ccc8516938be0578d7648c4b7f07e89af86b306

P5_R1_POST_MERGE_CURRENT_VIEW_RECONCILIATION_AUTHORIZATION
  #334 / 3ef17af23c686b18aa0f383c681b72c672137d51 / proof 5550995814

P5_R1_POST_MERGE_CURRENT_VIEW_RECONCILIATION
  #335 / 64f468a8cee37e07d252e32cd97b1a229856b65b / proof 5551095617

P5_R2_AUTHORIZATION
  #336 / 5c4f4886c734c02f87d1aa611ef0751ab1d995d2 / proof 5551168295
  final authorization head = d62ef5a15d2ab5e9faa3782d557521a0830af699

P5_R2_IMPLEMENTATION
  #337 / b35b1703579efb77453ca7a24923ecbace9afaac / proof 5551261065
  qualified head = 0b412e2eea8f392d77ef2b98d6eaa1eb8a4f530b

P5_R2_POST_MERGE_RECONCILIATION_ANALYSIS
  #337 / comment 5551265629 / ANALYSIS_ONLY

P5_R2_POST_MERGE_CURRENT_VIEW_RECONCILIATION_AUTHORIZATION
  #338 / de2735ffd7698e13f4adfb4a2c7ef98ee32177d3 / proof 5551292787
```

---

## NOW — P5-R2 post-merge five-current-view reconciliation

Canonical PR #338 and proof `5551292787` authorize exactly these five current-view paths:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized.

This candidate may record already-proven P5-R1/P5-R2 canonical truth only. It does not modify runtime, schema, tests, workflows, dependencies, historical planning/evidence, KRI/K5/K2 authority, benchmark data, persistence, product implementation, release configuration, or rulesets.

This candidate must not self-certify its own closure. Until guarded merge and mandatory post-merge proof exist:

```text
P5_R2_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
```

---

## P5-R1 bounded meaning

P5-R1 is one deterministic provider-neutral provenance sidecar over already-existing evidence identity/ref/digest:

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
  = 4c8d708070e950d2902308ca1977ce5267acec29
schema/p5-evidence-provenance.schema.json
  = b7c1d2573a1dbe3b34c5a1e5dc0a5c2fceb1418e
packages/kodac-runtime/test/p5-r1-evidence-provenance.test.ts
  = 512ab506898d945aed8381352906c4e03bcbd487
```

P5-R1 does not validate source evidence, compute freshness, execute a verifier/provider/model/reviewer/critic, create ProofGraph, mutate KRI/K5/K2 authority, or create product/release authority.

---

## P5-R2 bounded meaning

P5-R2 adds one deterministic directed relation edge over two exact validated P5-R1 provenance bindings:

```text
exact validated P5-R1 source binding
+ caller-supplied SUPPORTS | CONTRADICTS | SUPERSEDES
+ exact validated P5-R1 target binding
+ exact same repositoryId / canonicalBase / candidateHead
+ distinct source / target binding identities
-> deterministic content-addressed detached/frozen directed evidence-relation edge
```

Canonical blobs:

```text
packages/kodac-runtime/src/verification/p5-evidence-relation.ts
  = d33fb119ee8cbeda6e7c8e445cad6cee4b242e86
schema/p5-evidence-relation.schema.json
  = cb2574e1c656f7a5537985035ad43bb1637c51a7
packages/kodac-runtime/test/p5-r2-evidence-relation.test.ts
  = 1a78da0fbc65c2403134b42555311fe12d3f9355
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
P5-R2 CLOSED != P5-R3+ AUTHORITY
P5-R2 CLOSED != P5 OVERALL CLOSED
```

---

## Material P5 qualification history

P5-R1 preserved a real forward-only TypeScript repair: initial implementation head `35dd6b2434a3586f320f378dd5aa30428fcc3ed2` failed exact-head qualification; final qualified head `7ccc8516938be0578d7648c4b7f07e89af86b306` passed after the authorized test repair.

P5-R2 exact-head CI preserved this real history:

```text
FIRST_UBUNTU_ATTEMPT = FAILED_ONE_UNRELATED_PRE_EXISTING_H4_R3G_B_TEST
P5_R1_P5_R2_TESTS_ON_FIRST_UBUNTU_ATTEMPT = PASS
CANDIDATE_H4_PATH_CHANGES = NONE
SAME_EXACT_HEAD_UBUNTU_RERUN = SUCCESS
FINAL_K2_RUNTIME_GATE = SUCCESS
HEAD_MOVEMENT_DURING_RERUN = NONE
```

The P5-R2 candidate head did not move during that rerun.

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

---

## THEN — fresh successor analysis only

Only after this five-path reconciliation qualifies, merges guarded, and passes mandatory post-merge proof may fresh repository evidence be analyzed for a successor. Do not infer P5-R3, ProofGraph, or any later stage by numbering or composition.

```text
POST_MERGE_PROOF != SUCCESSOR_AUTHORITY
PLANNING_DIRECTION != IMPLEMENTATION_AUTHORITY
DONE = EVIDENCE_BACKED_COMPLETION
WAIVER = NO
```

## Navigation

- Working rules: `AGENTS.md`
- P5-R1 authorization: `docs/planning/KODAC_P5_R1_EVIDENCE_PROVENANCE_BINDING_AUTHORIZATION_2026-09-05.md`
- P5-R1 reconciliation authorization: `docs/planning/KODAC_P5_R1_POST_MERGE_CURRENT_VIEW_RECONCILIATION_AUTHORIZATION_2026-09-05.md`
- P5-R2 authorization: `docs/planning/KODAC_P5_R2_EVIDENCE_RELATION_EDGE_AUTHORIZATION_2026-09-05.md`
- P5-R2 reconciliation authorization: `docs/planning/KODAC_P5_R2_POST_MERGE_CURRENT_VIEW_RECONCILIATION_AUTHORIZATION_2026-09-05.md`
- Trust v2 direction: `docs/planning/KODAC_TRUST_AND_VERIFICATION_MASTER_PLAN_V2_AMENDMENT_2026-09-02.md`
- Final gap review: `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`
