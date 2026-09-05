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
P2-R7+ = NOT_AUTHORIZED BY NUMBERING
GENERAL / PUBLIC KODACBENCH = NOT CLOSED

P3-R1 THROUGH P3-R17 = CLOSED_CANONICAL INDIVIDUALLY
P3 BOUNDED R1-R17 ENGINEERING SCOPE = CLOSED_CANONICAL
P3 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R18+ = NOT_AUTHORIZED

P4-R1 = CLOSED_CANONICAL
P4-R2 = CLOSED_CANONICAL
P4 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL
P4 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P4 OVERALL = OPEN
P4-R3+ = NOT_AUTHORIZED

P5-R1 EVIDENCE PROVENANCE BINDING = CLOSED_CANONICAL
P5-R1 POST-MERGE CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P5-R2 EVIDENCE RELATION EDGE = CLOSED_CANONICAL
P5-R2 POST-MERGE CURRENT-VIEW RECONCILIATION AUTHORIZATION = CLOSED_CANONICAL / PR #338 / proof 5551292787
P5-R2 POST-MERGE CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
P5 OVERALL = NOT_CLOSED

P6-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Canonical P5 sequence

```text
#331 comment 5550850246
  fresh post-P4 successor analysis / ANALYSIS_ONLY

-> #332 P5-R1 Evidence Provenance Binding authorization
   merge 39a732aecee8ebd69c5f294d2aa135288edc6d97
   proof 5550880869

-> #333 P5-R1 Evidence Provenance Binding implementation
   initial failed head 35dd6b2434a3586f320f378dd5aa30428fcc3ed2
   final qualified head 7ccc8516938be0578d7648c4b7f07e89af86b306
   merge cef7a375e366795913879bed82f3d2bffe7647aa
   proof 5550968215

-> #334 P5-R1 post-merge reconciliation authorization
   merge 3ef17af23c686b18aa0f383c681b72c672137d51
   proof 5550995814

-> #335 P5-R1 post-merge current-view reconciliation
   merge 64f468a8cee37e07d252e32cd97b1a229856b65b
   proof 5551095617

-> #335 comment 5551117643
   fresh successor analysis / ANALYSIS_ONLY

-> #336 P5-R2 Evidence Relation Edge authorization
   final head d62ef5a15d2ab5e9faa3782d557521a0830af699
   merge 5c4f4886c734c02f87d1aa611ef0751ab1d995d2
   proof 5551168295

-> #337 P5-R2 Evidence Relation Edge implementation
   qualified head 0b412e2eea8f392d77ef2b98d6eaa1eb8a4f530b
   merge b35b1703579efb77453ca7a24923ecbace9afaac
   proof 5551261065

-> #337 comment 5551265629
   post-R2 reconciliation analysis / ANALYSIS_ONLY

-> #338 P5-R2 post-merge current-view reconciliation authorization
   qualified head a990f42e58d6eb2d9601a1e85e873cdd21bea952
   merge de2735ffd7698e13f4adfb4a2c7ef98ee32177d3
   proof 5551292787

-> CURRENT: P5-R2 five-current-view reconciliation candidate
```

No later unit advances by numbering.

---

## P5-R1 release-independent meaning

P5-R1 is an internal bounded deterministic provenance contract:

```text
existing evidence identity / ref / digest
-> exact repository base/head + repository identity
-> producer id/version/configuration identity
-> policy/scope/input/environment identities
-> caller-supplied CURRENT | STALE + freshness basis identity
-> deterministic content-addressed detached/frozen provenance binding
```

Canonical implementation blobs:

```text
packages/kodac-runtime/src/verification/p5-evidence-provenance.ts
  = 4c8d708070e950d2902308ca1977ce5267acec29
schema/p5-evidence-provenance.schema.json
  = b7c1d2573a1dbe3b34c5a1e5dc0a5c2fceb1418e
packages/kodac-runtime/test/p5-r1-evidence-provenance.test.ts
  = 512ab506898d945aed8381352906c4e03bcbd487
```

P5-R1 does not imply source-evidence validity, automatic freshness evaluation, proof completion, package publication, API stability, product readiness, verifier execution, or release authority.

---

## P5-R2 release-independent meaning

P5-R2 is an internal bounded deterministic evidence-relation contract:

```text
exact validated P5-R1 source binding
-> caller-supplied SUPPORTS | CONTRADICTS | SUPERSEDES
-> exact validated P5-R1 target binding
-> exact shared repositoryId / canonicalBase / candidateHead
-> distinct source / target binding identities
-> deterministic content-addressed detached/frozen directed relation edge
```

Canonical implementation blobs:

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
```

---

## Material qualification integrity

P5-R1 preserves its forward-only exact-head TypeScript repair history.

P5-R2 preserves this exact-head CI event:

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

## Current reconciliation

Canonical PR #338 authorizes exactly these five current views and no sixth path:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

The current candidate records already-proven P5-R1/P5-R2 truth. It does not create implementation authority and may not self-certify its own future closure.

It must still pass exact-head CI, internal substantive semantic inspection, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact `expected_head_sha`, and mandatory post-merge proof.

---

## Future dependency map

The canonical Trust and Verification v2 amendment preserves this planning direction:

```text
P2  KodacBench 2.0
P3  Context Engine v2
P4  Reviewer Intelligence v2
P5  Proof and Verification Fabric
P6  Security, Supply-Chain, and Attack Validation
P7  Bounded Remediation
P8  Agent Trust Gateway and Developer Distribution
P9  Continuous Assurance
R   Advanced Research
```

This map does not grant implementation authority. After the current P5-R2 reconciliation is post-merge proven, fresh repository evidence must determine any later minimum bounded unit. P5-R3 is not authorized by sequence.

---

## Founder review policy

Canonical PR #325 establishes:

```text
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
EXTERNAL_REVIEW = OPTIONAL_ADVISORY_EVIDENCE
EXTERNAL_REVIEW_AVAILABILITY != MERGE_AUTHORITY
DONE = EVIDENCE_BACKED_COMPLETION
```

All other gates remain effective.

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

## Version/release boundary

No version bump, package publication, release tag, deployment, public benchmark claim, or product availability change is authorized by this reconciliation. Version/release work requires separate canonical authority.
