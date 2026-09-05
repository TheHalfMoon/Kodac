# Product Document Authority Status

The pre-existing files in `docs/product/` remain preserved historical planning inputs. They do not override accepted Kodac ADRs, live GitHub truth, root `AGENTS.md`, current roadmap views, or exact canonical authorization/evidence records.

This file is a current status view only. It grants no implementation, execution, provider/model, persistence, dependency, product, release, merge, or project-completion authority.

---

## Current canonical status

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
PUBLIC RELEASE / PACKAGE PUBLICATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Product-facing P5 meaning

P5-R1 and P5-R2 are internal bounded trust/evidence mechanisms. Their canonical closure does not imply product availability, proof completion, API stability, package publication, provider/model availability, verifier execution, or release authority.

P5-R1 provides a deterministic provenance binding over already-existing evidence and exact repository/producer/configuration/policy/scope/input/environment identities, with caller-supplied `CURRENT | STALE` freshness plus basis identity.

P5-R2 provides a deterministic directed edge between two exact validated P5-R1 bindings using caller-supplied `SUPPORTS | CONTRADICTS | SUPERSEDES`, with exact shared repository revision and distinct source/target binding identities.

Canonical implementation blobs:

```text
P5-R1 source = 4c8d708070e950d2902308ca1977ce5267acec29
P5-R1 schema = b7c1d2573a1dbe3b34c5a1e5dc0a5c2fceb1418e
P5-R1 test = 512ab506898d945aed8381352906c4e03bcbd487

P5-R2 source = d33fb119ee8cbeda6e7c8e445cad6cee4b242e86
P5-R2 schema = cb2574e1c656f7a5537985035ad43bb1637c51a7
P5-R2 test = 1a78da0fbc65c2403134b42555311fe12d3f9355
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

## Canonical P5 proof anchors

```text
#332 P5-R1 authorization = 39a732aecee8ebd69c5f294d2aa135288edc6d97 / proof 5550880869
#333 P5-R1 implementation = cef7a375e366795913879bed82f3d2bffe7647aa / proof 5550968215
#334 P5-R1 reconciliation authorization = 3ef17af23c686b18aa0f383c681b72c672137d51 / proof 5550995814
#335 P5-R1 reconciliation = 64f468a8cee37e07d252e32cd97b1a229856b65b / proof 5551095617
#336 P5-R2 authorization = 5c4f4886c734c02f87d1aa611ef0751ab1d995d2 / proof 5551168295
#337 P5-R2 implementation = b35b1703579efb77453ca7a24923ecbace9afaac / proof 5551261065
#338 P5-R2 reconciliation authorization = de2735ffd7698e13f4adfb4a2c7ef98ee32177d3 / proof 5551292787
#339 P5-R2 reconciliation = b5785beb24b0f939fc3d9c51b5292efbe5e0ee82 / proof 5551404984
#339 fresh post-R2 analysis = comment 5551419975 / ANALYSIS_ONLY
#340 bounded R1-R2 closeout authorization = 8eb6dd521e4c5ecc1bd964576bffd4f1e7cfd4fb / proof 5551456429
RULESET = 20707483 / active / no bypass
```

---

## Current authorized unit

Canonical #340 authorizes exactly this six-path documentation/evidence closeout:

```text
docs/planning/KODAC_P5_BOUNDED_R1_R2_CANONICAL_CLOSEOUT_EVIDENCE_2026-09-05.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No seventh path is authorized.

The candidate may aggregate already-proven P5 R1-R2 evidence only and must preserve every still-effective non-grant. It changes no runtime, schema, test, dependency, workflow, KRI/K5/K2 authority, persistence, product implementation, or release surface.

The candidate cannot claim its own aggregate closure before guarded merge and external post-merge proof:

```text
P5_BOUNDED_R1_R2_ENGINEERING_SCOPE = CURRENT_CLOSEOUT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
```

---

## Material evidence integrity

P5-R1 preserves its real forward-only TypeScript qualification repair from initial failed head `35dd6b2434a3586f320f378dd5aa30428fcc3ed2` to final qualified head `7ccc8516938be0578d7648c4b7f07e89af86b306`.

P5-R2 preserves its same-head Ubuntu rerun after one unrelated pre-existing H4-R3G-B failure; all P5 tests passed and the candidate head never moved.

The #338 authorization preserves its own forward-only semantic repair from `cc518a31ba1f681c2281657ba13524112b31e1b3` to `a990f42e58d6eb2d9601a1e85e873cdd21bea952` to prevent premature self-certification.

The current closeout evidence ledger also preserves a forward-only wording repair on its branch; pre-repair head evidence is stale.

---

## Founder review policy

Canonical #325 establishes:

```text
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
EXTERNAL_REVIEW = OPTIONAL_ADVISORY_EVIDENCE
EXTERNAL_REVIEW_OUTAGE != REPOSITORY_BLOCKER
```

Known actionable findings remain binding. Internal substantive semantic inspection, exact-head CI, zero unresolved actionable threads, active ruleset/no-bypass proof, guarded merge, and post-merge proof remain mandatory.

---

## Product and release non-grants

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
PUBLIC SUPERIORITY / BEST-IN-CLASS CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Next product-status boundary

Complete exact-head qualification, guarded merge, and post-merge proof for the six-path P5 bounded R1-R2 closeout candidate. Only then may fresh post-closeout reconciliation analysis begin. No P5-R3, ProofGraph, P6, product, or release authority follows by composition.
