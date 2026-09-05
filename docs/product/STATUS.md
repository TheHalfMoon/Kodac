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
P5-R2 AUTHORIZATION = CLOSED_CANONICAL
P5-R2 EVIDENCE RELATION EDGE = CLOSED_CANONICAL
P5-R2 POST-MERGE CURRENT-VIEW RECONCILIATION AUTHORIZATION = CLOSED_CANONICAL / PR #338 / proof 5551292787
P5-R2 POST-MERGE CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
P5 OVERALL = NOT_CLOSED

P6-P9 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## P5 product-facing meaning

P5-R1 and P5-R2 are internal bounded trust/evidence mechanisms. Their canonical closure does not imply product availability, proof completion, API stability, package publication, provider/model availability, verifier execution, or release authority.

### P5-R1 — Evidence Provenance Binding

```text
existing evidence identity / ref / digest
+ exact repository base/head + repository identity
+ producer id/version/configuration identity
+ policy/scope/input/environment identities
+ caller-supplied CURRENT | STALE freshness + basis identity
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

### P5-R2 — Evidence Relation Edge

```text
exact validated P5-R1 source binding
+ caller-supplied SUPPORTS | CONTRADICTS | SUPERSEDES
+ exact validated P5-R1 target binding
+ exact shared repositoryId / canonicalBase / candidateHead
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

Neither P5-R1 nor P5-R2 executes a verifier/provider/model/reviewer/critic, validates source evidence, computes freshness, mutates KRI/K5/K2 authority, creates ProofGraph, or creates a public package/API/product surface.

Required non-equivalences:

```text
CALLER-SUPPLIED FRESHNESS != AUTOMATIC FRESHNESS DETERMINATION
CALLER-SUPPLIED RELATION != TRUTH
PROVENANCE BINDING != PROOF / AUTHORITY
RELATION EDGE != PROOF / AUTHORITY / ADJUDICATION / VERIFICATION RESULT
RELATION EDGE != VERIFIER EXECUTION
RELATION EDGE != PROOFGRAPH
RELATION EDGE != GRAPH STORAGE / TRAVERSAL / INFERENCE
```

---

## Canonical P5 proof anchors

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
```

---

## Material evidence integrity

P5-R1 preserves its real forward-only TypeScript qualification repair.

P5-R2 preserves this exact-head CI history:

```text
FIRST_UBUNTU_ATTEMPT = FAILED_ONE_UNRELATED_PRE_EXISTING_H4_R3G_B_TEST
P5_R1_P5_R2_TESTS_ON_FIRST_UBUNTU_ATTEMPT = PASS
CANDIDATE_H4_PATH_CHANGES = NONE
SAME_EXACT_HEAD_UBUNTU_RERUN = SUCCESS
FINAL_K2_RUNTIME_GATE = SUCCESS
HEAD_MOVEMENT_DURING_RERUN = NONE
```

The rerun remained on exact head `0b412e2eea8f392d77ef2b98d6eaa1eb8a4f530b`.

---

## Current authorized unit

Canonical PR #338 authorizes only this five-path documentation/current-view reconciliation:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized.

The current candidate records already-proven P5-R1/P5-R2 truth and preserves every still-effective non-grant. It changes no runtime, schema, test, dependency, workflow, KRI/K5/K2 authority, persistence, product implementation, or release surface.

The candidate cannot claim its own reconciliation closure before guarded merge and post-merge proof. Therefore its current status remains:

```text
P5_R2_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
```

---

## Founder review policy

Canonical PR #325 establishes:

```text
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
EXTERNAL_REVIEW = OPTIONAL_ADVISORY_EVIDENCE
EXTERNAL_REVIEW_OUTAGE != REPOSITORY_BLOCKER
```

Known actionable findings remain binding. Internal substantive semantic inspection, exact-head required CI, zero unresolved actionable threads, active ruleset/no-bypass proof, guarded merge, and post-merge proof remain mandatory.

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

## Next product-status boundary

Complete exact-head qualification, guarded merge, and post-merge proof for this P5-R2 five-view reconciliation. Only then may fresh canonical successor analysis identify another bounded unit. No P5-R3 or ProofGraph authority follows by numbering.
