# Kodac P5 — Bounded R1-R2 Engineering Closeout Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_CLOSEOUT_AUTHORITY UNTIL MERGED AND PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Deny-by-default state

This record authorizes only one future documentation/evidence closeout unit after this exact authorization record itself qualifies, merges normally into protected `main`, and passes mandatory post-merge proof.

```text
CANONICAL_MAIN_AT_CANDIDATE_START = b5785beb24b0f939fc3d9c51b5292efbe5e0ee82
CANONICAL_TREE_AT_CANDIDATE_START = 525e6382e1cea5b3786c6aa1811ffc3dc05b33d5
P5-R1 = CLOSED_CANONICAL
P5-R2 = CLOSED_CANONICAL
P5-R2 POST-MERGE CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P5 BOUNDED R1-R2 ENGINEERING SCOPE = NOT_YET_CLOSED
P5 BOUNDED R1-R2 ENGINEERING CLOSEOUT = AUTHORIZATION_CANDIDATE ONLY
P5 OVERALL = NOT_CLOSED
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
P6-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This record does not close P5 overall, authorize P5-R3+, create a ProofGraph, authorize automatic freshness/dependency invalidation, expand verifier execution, execute any reviewer/critic/verifier/provider/model, mutate KRI/K5/K2 authority, add dependencies, widen package/public surfaces, enable persistence/telemetry, authorize remediation, authorize release, or establish project completion.

---

## 2. Canonical baseline and procedural basis

```text
P5_R1_AUTHORIZATION = PR #332 / merge 39a732aecee8ebd69c5f294d2aa135288edc6d97 / proof 5550880869 / CLOSED_CANONICAL
P5_R1_IMPLEMENTATION = PR #333 / merge cef7a375e366795913879bed82f3d2bffe7647aa / proof 5550968215 / CLOSED_CANONICAL
P5_R1_QUALIFIED_HEAD = 7ccc8516938be0578d7648c4b7f07e89af86b306
P5_R1_POST_MERGE_RECONCILIATION_AUTHORIZATION = PR #334 / merge 3ef17af23c686b18aa0f383c681b72c672137d51 / proof 5550995814 / CLOSED_CANONICAL
P5_R1_POST_MERGE_CURRENT_VIEW_RECONCILIATION = PR #335 / merge 64f468a8cee37e07d252e32cd97b1a229856b65b / proof 5551095617 / CLOSED_CANONICAL
P5_R2_AUTHORIZATION = PR #336 / merge 5c4f4886c734c02f87d1aa611ef0751ab1d995d2 / proof 5551168295 / CLOSED_CANONICAL
P5_R2_AUTHORIZATION_FINAL_HEAD = d62ef5a15d2ab5e9faa3782d557521a0830af699
P5_R2_IMPLEMENTATION = PR #337 / merge b35b1703579efb77453ca7a24923ecbace9afaac / proof 5551261065 / CLOSED_CANONICAL
P5_R2_QUALIFIED_HEAD = 0b412e2eea8f392d77ef2b98d6eaa1eb8a4f530b
P5_R2_POST_MERGE_RECONCILIATION_AUTHORIZATION = PR #338 / merge de2735ffd7698e13f4adfb4a2c7ef98ee32177d3 / proof 5551292787 / CLOSED_CANONICAL
P5_R2_POST_MERGE_CURRENT_VIEW_RECONCILIATION = PR #339 / merge b5785beb24b0f939fc3d9c51b5292efbe5e0ee82 / proof 5551404984 / CLOSED_CANONICAL
P5_POST_R2_SUCCESSOR_ANALYSIS = PR #339 / comment 5551419975 / ANALYSIS_ONLY
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Root `AGENTS.md` requires live GitHub truth, exact active authority, bounded work, exact-head proof, guarded merge, post-merge proof, roadmap reconciliation, and only then the next authorized unit.

The fresh post-P5-R2 analysis rejected automatic P5-R3 sequencing. It found no concrete current P5 runtime/schema/test mechanism gap that is both non-duplicative and required before bounded engineering closeout.

---

## 3. Why bounded closeout is the minimum sufficient next unit

Canonical P5-R1 provides one deterministic provider-neutral provenance binding over already-existing evidence identity/ref/digest, exact repository revision, producer/configuration/policy/scope/input/environment identities, and caller-supplied `CURRENT | STALE` freshness plus basis identity.

Canonical P5-R2 provides one deterministic, pure/data-only directed evidence-relation edge over two exact validated P5-R1 bindings with the closed caller-supplied relation vocabulary:

```text
SUPPORTS
CONTRADICTS
SUPERSEDES
```

Fresh live-code inspection also proved that several names listed in the Trust and Verification v2 planning direction already have concrete canonical predecessors and therefore must not be reimplemented merely because the plan names them:

```text
Verification Plan
  packages/kodac-runtime/src/verification/planner.ts

Verifier Registry / Verification Result / Verification Report
  packages/kodac-runtime/src/verification/types.ts
  packages/kodac-runtime/src/verification/engine.ts

Proof package / exact source linkage / stale-contradictory-incomplete-invalid reconciliation
  packages/kodac-runtime/src/proof-review/contracts.ts
  packages/kodac-runtime/src/proof-review/linkage-contracts.ts
  packages/kodac-runtime/src/proof-review/reconciliation-contracts.ts

Reviewer claim / verifier proposal / critic / adjudication substrate
  packages/kodac-runtime/src/reviewer-intelligence/p4-claim-envelope.ts
  packages/kodac-runtime/src/reviewer-intelligence/p4-critic-disposition.ts
```

A full ProofGraph remains broader than the P5-R2 single-edge foundation because it would require aggregation/query/traversal/inference/storage semantics. A generic Evidence Freshness Graph would require dependency-aware invalidation semantics beyond P5-R1 caller-supplied freshness and beyond existing K5 stale reconciliation. Neither is proven as a minimum independent successor unit, and automatic freshness/dependency invalidation remains unauthorized.

The current gap is therefore only:

```text
P5-R1 AND P5-R2 INDIVIDUALLY CLOSED_CANONICAL
!=
P5 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED_CANONICAL
```

The applicable repository precedent is bounded P3/P4 convergence: when fresh evidence finds no additional numbered mechanism required, close the already-canonical bounded engineering lineage through a separately authorized evidence-only closeout rather than inventing authority by numbering.

---

## 4. Exact future closeout allowlist

Only after this authorization record becomes canonical and post-merge proven may one later closeout candidate modify exactly these six paths:

```text
docs/planning/KODAC_P5_BOUNDED_R1_R2_CANONICAL_CLOSEOUT_EVIDENCE_2026-09-05.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No seventh path is authorized.

The later closeout may not modify runtime source/tests, schemas, historical authorization/evidence records, workflows, dependencies/lockfiles, benchmark corpus/manifests/fixtures/results, provider/model/reviewer/verifier configuration, KRI/K5/K2 runtime or authority, persistence/telemetry/learning surfaces, CLI/API/product surfaces, release configuration, rulesets, or repository protection.

---

## 5. Conditional future result

Only after the later six-path closeout independently qualifies, merges normally with the exact qualified expected head, and passes complete post-merge proof may it establish:

```text
P5-R1 THROUGH P5-R2 INDIVIDUAL SLICES = CLOSED_CANONICAL
P5 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL
```

It must preserve simultaneously:

```text
P2 OVERALL = OPEN
P3 OVERALL = OPEN
P4 OVERALL = OPEN
P5 OVERALL = NOT_CLOSED
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
AUTOMATIC FRESHNESS / DEPENDENCY INVALIDATION = NOT_AUTHORIZED
P6-P9 IMPLEMENTATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REVIEWER / CRITIC / VERIFIER / PROVIDER / MODEL EXECUTION EXPANSION = NOT_AUTHORIZED
KRI / K5 / K2 AUTHORITY MUTATION = NOT_AUTHORIZED
SOURCE EVIDENCE VALIDATION = NOT_AUTHORIZED BY P5-R1/R2
RELATION EDGE != TRUTH / PROOF / AUTHORITY / ADJUDICATION
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

## 6. Required lineage evidence for the later closeout

The later closeout must independently re-read live GitHub and bind the complete canonical P5 R1-R2 lineage, including:

```text
P5-R1 authorization: #332
P5-R1 implementation: #333
P5-R1 post-merge reconciliation authorization: #334
P5-R1 current-view reconciliation: #335
P5-R2 authorization: #336
P5-R2 implementation: #337
P5-R2 post-merge reconciliation authorization: #338
P5-R2 current-view reconciliation: #339
post-P5-R2 successor analysis: #339 / comment 5551419975 / ANALYSIS_ONLY
```

It must bind actual canonical merge ancestry, qualified implementation heads/trees, implementation blob identities, exact allowlists, required CI, material forward-only repair history, post-merge proof anchors, active ruleset state, and any superseded/stale qualification evidence material to the lineage.

Material repair/evidence history that must remain explicit:

1. P5-R1 initial implementation head `35dd6b2434a3586f320f378dd5aa30428fcc3ed2` failed exact-head TypeScript qualification; the authorized test path was repaired forward-only and final qualified head `7ccc8516938be0578d7648c4b7f07e89af86b306` was requalified from scratch.
2. P5-R2 exact-head Ubuntu initially failed one unrelated pre-existing H4-R3G-B test while all P5-R1/P5-R2 tests passed; the same unchanged exact head was rerun successfully and final K2 gate passed without candidate head movement.
3. P5-R2 post-merge reconciliation authorization initially existed at `cc518a31ba1f681c2281657ba13524112b31e1b3` with a semantic self-certification defect. It was repaired forward-only to final qualified head `a990f42e58d6eb2d9601a1e85e873cdd21bea952`; all evidence tied to the earlier head is stale.

For the bounded implementation substrate, the later closeout must preserve at least these canonical implementation blobs exactly as observed on current `main`:

```text
packages/kodac-runtime/src/verification/p5-evidence-provenance.ts
  = 4c8d708070e950d2902308ca1977ce5267acec29
schema/p5-evidence-provenance.schema.json
  = b7c1d2573a1dbe3b34c5a1e5dc0a5c2fceb1418e
packages/kodac-runtime/test/p5-r1-evidence-provenance.test.ts
  = 512ab506898d945aed8381352906c4e03bcbd487

packages/kodac-runtime/src/verification/p5-evidence-relation.ts
  = d33fb119ee8cbeda6e7c8e445cad6cee4b242e86
schema/p5-evidence-relation.schema.json
  = cb2574e1c656f7a5537985035ad43bb1637c51a7
packages/kodac-runtime/test/p5-r2-evidence-relation.test.ts
  = 1a78da0fbc65c2403134b42555311fe12d3f9355
```

Live GitHub wins if any identity moves before later qualification.

---

## 7. Qualification gate for this authorization candidate

Do not merge this authorization record unless one unchanged exact head/current metadata proves:

```text
BASE == CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P5_BOUNDED_R1_R2_CLOSEOUT_AUTHORIZATION_2026-09-05.md
REQUIRED CI = TERMINAL SUCCESS OR CANONICALLY PROVEN NON_APPLICABLE
INTERNAL SUBSTANTIVE SEMANTIC INSPECTION = CLEAN
KNOWN UNRESOLVED MATERIAL / MINOR ACTIONABLE FINDINGS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
EXTERNAL_REVIEW = OPTIONAL_ADVISORY_EVIDENCE
RULESET 20707483 = active / bypass_actors=[] / current_user_can_bypass=never
MERGE = GUARDED NORMAL MERGE USING exact expected_head_sha
POST_MERGE_PROOF = main + ordered parents + tree + authorization blob + verified/valid signature + applicable push checks + merged PR state + ruleset
WAIVER = NO
```

Any byte/head/base/qualification-relevant movement invalidates exact-head qualification evidence.

---

## 8. Preserved non-equivalences

```text
P5 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED != P5 OVERALL CLOSED
P5 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED != P5-R3+ AUTHORITY
P5 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED != PROOFGRAPH AUTHORITY
P5 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED != AUTOMATIC FRESHNESS AUTHORITY
P5 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED != P6 AUTHORITY
P5 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED != REVIEWER / CRITIC / VERIFIER / PROVIDER / MODEL EXECUTION EXPANSION
P5 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED != PRODUCT OR RELEASE AUTHORITY
P5 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED != PROJECT COMPLETION
PLANNING DIRECTION != IMPLEMENTATION AUTHORITY
POST_MERGE PROOF != SUCCESSOR AUTHORITY
```

---

## 9. Authorization-candidate boundary

This one-path record is itself only a candidate. It becomes effective authority for the later six-path bounded closeout only after exact-head qualification, zero actionable findings/threads, guarded normal merge into protected `main`, and mandatory post-merge proof.

Until then:

```text
P5_BOUNDED_R1_R2_CLOSEOUT = NOT_AUTHORIZED
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
P6-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
