# Kodac P4 — Bounded R1-R2 Engineering Closeout Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_CLOSEOUT_AUTHORITY UNTIL MERGED AND PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Deny-by-default state

This record authorizes only one future documentation/evidence closeout unit after this exact authorization record itself qualifies, merges normally into protected `main`, and passes mandatory post-merge proof.

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 2641eb7493b6b6747f3cb56fa69e853305d54692
CANONICAL_TREE_AT_CANDIDATE_START = 24a6eb9b49647c6908b55e4555a5f95e188fc0ab
P4-R1 = CLOSED_CANONICAL
P4-R2 = CLOSED_CANONICAL
P4 BOUNDED R1-R2 ENGINEERING SCOPE = NOT_YET_CLOSED
P4 BOUNDED R1-R2 ENGINEERING CLOSEOUT = AUTHORIZATION_CANDIDATE ONLY
P4 OVERALL = OPEN
P4-R3+ IMPLEMENTATION = NOT_AUTHORIZED
P5-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This record does not close P4 overall, authorize P4-R3+, authorize P5, execute any reviewer/critic/verifier/provider/model, mutate KRI adjudication, add dependencies, widen package/public surfaces, enable persistence/telemetry, authorize remediation, authorize release, or establish project completion.

---

## 2. Canonical baseline and procedural basis

```text
P4_R1_AUTHORIZATION = PR #323 / merge e59e2402333798e12f934f7b25c3cba5224bd651 / CLOSED_CANONICAL
P4_R1_IMPLEMENTATION = PR #324 / merge d166e5305e2b9a400e9240ee7064bdf3c65f54aa / CLOSED_CANONICAL
FOUNDER_EXTERNAL_REVIEW_POLICY = PR #325 / merge 94a62f8d794f7845dd2d999608fbb6fdd77ce7ab / CLOSED_CANONICAL
P4_R2_AUTHORIZATION = PR #326 / merge 9443d15c02c143e4c4acc64b79817476b912ba1e / proof 5547225344 / CLOSED_CANONICAL
P4_R2_IMPLEMENTATION = PR #327 / merge 2641eb7493b6b6747f3cb56fa69e853305d54692 / proof 5547377851 / CLOSED_CANONICAL
P4_POST_R2_SUCCESSOR_ANALYSIS = PR #327 / comment 5547425939 / ANALYSIS_ONLY
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Root `AGENTS.md` requires live GitHub truth, exact active authority, bounded work, exact-head proof, guarded merge, post-merge proof, roadmap reconciliation, and only then the next authorized unit.

The fresh post-P4-R2 analysis rejected automatic P4-R3 sequencing. It found no concrete current P4 runtime/schema/test mechanism gap requiring another numbered slice before bounded closeout.

---

## 3. Why bounded closeout is the minimum sufficient next unit

Canonical P4-R1 provides one pure/data-only reviewer-claim evidence envelope that binds an existing KRI finding to an explicit caller-supplied risk hypothesis, evidence references, bounded verifier proposals as proposals only, exact source/head/adjudication state, and `CRITIC_STATE = NOT_EVALUATED`.

Canonical P4-R2 provides one pure/data-only structured critic disposition contract with the closed evidence-grounded vocabulary:

```text
SUPPORTED
CONTRADICTED
UNVERIFIED_CONCERN
DUPLICATE_OR_SUPERSEDED
```

The canonical final gap review's `GAP-05 — Reviewer disagreement needs a concrete protocol` is therefore covered by the bounded P4-R2 mechanism. First-class verifier proposals already exist in canonical P4-R1. Actual verifier execution/results and broader proof-fabric mechanisms belong to the later P5 planning direction and remain unauthorized.

The current gap is therefore only:

```text
P4-R1 AND P4-R2 INDIVIDUALLY CLOSED_CANONICAL
!=
P4 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED_CANONICAL
```

The applicable canonical precedent is the P3 bounded closeout process: when fresh evidence finds no additional numbered mechanism required, close the already-canonical bounded engineering lineage through a separately authorized evidence-only closeout rather than inventing authority by numbering.

---

## 4. Exact future closeout allowlist

Only after this authorization record becomes canonical and post-merge proven may one later closeout candidate modify exactly these six paths:

```text
docs/planning/KODAC_P4_BOUNDED_R1_R2_CANONICAL_CLOSEOUT_EVIDENCE_2026-09-05.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No seventh path is authorized.

The later closeout may not modify runtime source/tests, schemas, historical authorization/evidence records, workflows, dependencies/lockfiles, benchmark corpus/manifests/fixtures/results, provider/model/reviewer configuration, KRI runtime/adjudication code, persistence/telemetry/learning surfaces, CLI/API/product surfaces, release configuration, rulesets, or repository protection.

---

## 5. Conditional future result

Only after the later six-path closeout independently qualifies, merges normally with the exact qualified expected head, and passes complete post-merge proof may it establish:

```text
P4-R1 THROUGH P4-R2 INDIVIDUAL SLICES = CLOSED_CANONICAL
P4 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL
```

It must preserve simultaneously:

```text
P4 OVERALL = OPEN
P4-R3+ IMPLEMENTATION = NOT_AUTHORIZED
P5-P9 IMPLEMENTATION = NOT_AUTHORIZED
REVIEWER / CRITIC / VERIFIER / PROVIDER / MODEL EXECUTION = NOT_AUTHORIZED
VERIFIER PROPOSAL != VERIFICATION RESULT
CRITIC DISPOSITION != KRI ADJUDICATION MUTATION
REVIEW AGREEMENT != PROOF
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## 6. Required lineage evidence for the later closeout

The later closeout must independently re-read live GitHub and prove at minimum:

```text
P4-R1 authorization: #323
P4-R1 implementation: #324
Founder external-review policy supersession: #325
P4-R2 authorization: #326
P4-R2 implementation: #327
```

It must bind actual canonical merge ancestry, qualified implementation heads/trees, implementation blob identities, exact allowlists, required CI, material forward-only repair history, post-merge proof anchors, active ruleset state, and any superseded/stale qualification evidence that is material to the lineage.

For the bounded implementation substrate, it must preserve at least these canonical implementation blobs exactly as observed on current `main`:

```text
packages/kodac-runtime/src/reviewer-intelligence/p4-claim-envelope.ts
  = e9a59acf25c05276dddf80e269be4ae03e5e6775
schema/p4-reviewer-claim-envelope.schema.json
  = 121b2b7b0286a4b7dea0e92bb2642218fbb1a50e
packages/kodac-runtime/test/p4-r1-reviewer-claim-envelope.test.ts
  = 93ff960800363e036c25948aa4fa19617540814d

packages/kodac-runtime/src/reviewer-intelligence/p4-critic-disposition.ts
  = 11b49b715fa5991deb6d2154d11c3cacbf310f92
schema/p4-critic-disposition.schema.json
  = 796bb3e5cd49994f2f7cfa477812ef5b0d291e99
packages/kodac-runtime/test/p4-r2-critic-disposition.test.ts
  = 7877e865b66a99763dab477938dc4e7b8b9d77a8
```

Live GitHub wins if any identity moves before later qualification.

---

## 7. Qualification gate for this authorization candidate

Do not merge this authorization record unless one unchanged exact head/current metadata proves:

```text
BASE == CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P4_BOUNDED_R1_R2_CLOSEOUT_AUTHORIZATION_2026-09-05.md
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
P4 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED != P4 OVERALL CLOSED
P4 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED != P4-R3+ AUTHORITY
P4 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED != P5 AUTHORITY
P4 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED != REVIEWER / CRITIC / VERIFIER EXECUTION AUTHORITY
P4 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED != PRODUCT OR RELEASE AUTHORITY
P4 BOUNDED R1-R2 ENGINEERING SCOPE CLOSED != PROJECT COMPLETION
VERIFIER PROPOSAL != VERIFICATION RESULT
CRITIC DISPOSITION != ADJUDICATION AUTHORITY
PLANNING DIRECTION != IMPLEMENTATION AUTHORITY
POST_MERGE PROOF != SUCCESSOR AUTHORITY
```

---

## 9. Authorization-candidate boundary

This one-path record is itself only a candidate. It becomes effective authority for the later six-path bounded closeout only after exact-head qualification, zero actionable findings/threads, guarded normal merge into protected `main`, and mandatory post-merge proof.

Until then:

```text
P4_BOUNDED_R1_R2_CLOSEOUT = NOT_AUTHORIZED
P4-R3+ IMPLEMENTATION = NOT_AUTHORIZED
P5-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
