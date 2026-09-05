# Kodac P6 — R1 Post-Closeout Current-View Reconciliation Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_RECONCILIATION_AUTHORITY UNTIL MERGED AND PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Deny-by-default state

This record authorizes only one future documentation-only reconciliation of the five established current roadmap/product views after this exact one-path authorization itself qualifies on one unchanged exact head, merges normally into protected `main` using the exact expected-head precondition, and passes mandatory post-merge proof.

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 206741c67021864ffdaea1f57aa91bf7d1509a48
CANONICAL_TREE_AT_CANDIDATE_START = a8bc902e3bfc5036325ada848e33efa7e98f074c
P6-R1 INDIVIDUAL SLICE = CLOSED_CANONICAL
P6 BOUNDED R1 ENGINEERING SCOPE = CLOSED_CANONICAL
P6 BOUNDED R1 CLOSEOUT_PR = #349
P6 BOUNDED R1 CLOSEOUT_MERGE = 206741c67021864ffdaea1f57aa91bf7d1509a48
P6 BOUNDED R1 CLOSEOUT_POST_MERGE_PROOF = #349 / 5552035602
P6 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = AUTHORIZATION_CANDIDATE_ONLY
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P6 OVERALL = NOT_CLOSED
P7-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This record does not reopen or modify canonical P6-R1 implementation or closeout evidence. It does not close P6 overall, authorize P6-R2+, scanner/analyzer execution, SARIF ingestion, provider/model invocation, secret access, network access, exploit/attack execution, dependencies/donor intake, persistence/telemetry/learning, remediation, product/API/CLI integration, release, P7-P9, ruleset mutation/bypass, or project completion.

---

## 2. Procedural basis

Root `AGENTS.md` requires the dependency order:

```text
POST-MERGE PROOF
-> ROADMAP RECONCILIATION
-> NEXT AUTHORIZED UNIT
```

PR #349 deliberately merged the five current views in candidate-safe form so they would not claim aggregate bounded closure before the closeout itself qualified, merged, and passed mandatory post-merge proof. That external proof now exists as PR #349 comment `5552035602`.

Fresh post-closeout analysis is recorded at:

```text
PR #349 / comment 5552036750
CLASS = ANALYSIS_ONLY
AUTHORITY_CREATED = NO
CONCLUSION = EXACTLY ONE POST-CLOSEOUT FIVE-CURRENT-VIEW RECONCILIATION AUTHORIZATION CANDIDATE IS THE MINIMUM NEXT UNIT
```

The canonical P3/P4/P5 post-closeout processes are the direct procedural precedent: a one-path reconciliation authorization must become canonical before a separate five-path current-view reconciliation.

---

## 3. Exact future reconciliation allowlist

Only after this authorization record becomes canonical and post-merge proven may one later reconciliation candidate modify exactly:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized.

The later reconciliation may only:

1. replace candidate-time P6 bounded R1 closeout state with the externally proven canonical state;
2. bind exact PR #349 closeout merge/proof anchors needed for current navigation/status;
3. record the post-closeout reconciliation itself in candidate-safe form until its own external post-merge proof exists;
4. preserve P6 overall as not closed and every still-effective non-grant;
5. preserve the Founder review policy established through PR #325;
6. state that only fresh evidence-driven successor analysis may follow after the reconciliation itself qualifies, merges, and passes mandatory post-merge proof.

It may not modify:

```text
docs/planning/KODAC_P6_BOUNDED_R1_CANONICAL_CLOSEOUT_EVIDENCE_2026-09-05.md
packages/kodac-runtime/src/security/p6-deterministic-security-finding.ts
schema/p6-deterministic-security-finding.schema.json
packages/kodac-runtime/test/p6-r1-deterministic-security-finding.test.ts
```

or any other historical authorization/evidence record, runtime source/test, schema, workflow, dependency/lockfile, KRI/K5/K2 source or authority, benchmark corpus/manifest/result, provider/model/reviewer/verifier configuration, persistence/telemetry/learning surface, product implementation, release configuration, ruleset, or repository-protection path.

---

## 4. Required reconciled truth

The future five-path candidate may record these already externally proven facts unconditionally:

```text
P6-R1 INDIVIDUAL SLICE = CLOSED_CANONICAL
P6 BOUNDED R1 ENGINEERING SCOPE = CLOSED_CANONICAL
P6 BOUNDED R1 CLOSEOUT = PR #349 / 206741c67021864ffdaea1f57aa91bf7d1509a48 / proof 5552035602
```

For its own not-yet-observed reconciliation result, it must remain candidate-safe until external post-merge proof:

```text
P6 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
```

It must preserve simultaneously:

```text
P2 OVERALL = OPEN
P3 OVERALL = OPEN
P4 OVERALL = OPEN
P5 OVERALL = NOT_CLOSED
P6 OVERALL = NOT_CLOSED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
AUTOMATIC FRESHNESS / DEPENDENCY INVALIDATION = NOT_AUTHORIZED
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
P7-P9 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## 5. Qualification gate for this authorization candidate

Do not merge this one-path authorization unless one unchanged exact head/current metadata proves:

```text
BASE == CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P6_R1_POST_CLOSEOUT_CURRENT_VIEW_RECONCILIATION_AUTHORIZATION_2026-09-05.md
REQUIRED CI = TERMINAL SUCCESS OR CANONICALLY PROVEN NON_APPLICABLE
INTERNAL SUBSTANTIVE SEMANTIC SECURITY INSPECTION = CLEAN
KNOWN ACTIONABLE DEFECTS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
EXTERNAL_REVIEW = OPTIONAL_ADVISORY_EVIDENCE
RULESET 20707483 = active / bypass_actors=[] / current_user_can_bypass=never
MERGE = GUARDED NORMAL MERGE USING exact expected_head_sha
POST_MERGE_PROOF = main + ordered parents + tree + authorization blob + verified/valid signature + applicable push checks + merged PR state + ruleset
WAIVER = NO
```

Any byte/head/base/qualification-relevant movement invalidates exact-head evidence.

---

## 6. Non-equivalences

```text
P6 BOUNDED R1 ENGINEERING SCOPE CLOSED != P6 OVERALL CLOSED
CURRENT-VIEW RECONCILIATION != P6-R2+ AUTHORITY
CURRENT-VIEW RECONCILIATION != SCANNER / ANALYZER EXECUTION AUTHORITY
CURRENT-VIEW RECONCILIATION != SARIF INGESTION AUTHORITY
CURRENT-VIEW RECONCILIATION != PROVIDER / MODEL INVOCATION AUTHORITY
CURRENT-VIEW RECONCILIATION != SECRET / NETWORK / EXPLOIT AUTHORITY
CURRENT-VIEW RECONCILIATION != P7 AUTHORITY
CURRENT-VIEW RECONCILIATION != PRODUCT OR RELEASE AUTHORITY
CURRENT-VIEW RECONCILIATION != PROJECT COMPLETION
PLANNING DIRECTION != IMPLEMENTATION AUTHORITY
POST_MERGE PROOF != SUCCESSOR AUTHORITY
```

---

## 7. Candidate boundary

Until this one-path record itself qualifies, merges, and passes mandatory post-merge proof:

```text
P6_POST_CLOSEOUT_CURRENT_VIEW_RECONCILIATION = NOT_AUTHORIZED
DIRECT_FIVE_PATH_RECONCILIATION = NOT_AUTHORIZED
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P7-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
