# Kodac P6-R1 Post-Merge Current-View Reconciliation Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_RECONCILIATION_AUTHORITY UNTIL MERGED_AND_POST_PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Deny-by-default state

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 0f907b6f6e12a15da753e836b124c586ee9fe285
CANONICAL_TREE_AT_CANDIDATE_START = 4262a0f68d9dbd69dd2883ca17eecdd31af68c46
P6-R1 AUTHORIZATION = CLOSED_CANONICAL
P6-R1 DETERMINISTIC SECURITY FINDING FOUNDATION = CLOSED_CANONICAL
P6-R1 IMPLEMENTATION PR = #345
P6-R1 QUALIFIED_FINAL_HEAD = 60bc2e3e157b8eacac145ef22fa7cdaae1428baa
P6-R1 MERGE = 0f907b6f6e12a15da753e836b124c586ee9fe285
P6-R1 POST_MERGE_PROOF = #345 / comment 5551884329 / PASS
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P6 OVERALL = NOT_CLOSED
P7-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This record creates no reconciliation authority until this exact one-path candidate itself qualifies on one unchanged exact head, merges normally into protected `main` using the exact expected-head precondition, and passes mandatory post-merge proof.

This record does not authorize any P6 successor mechanism, scanner/analyzer execution, SARIF ingestion, provider/model invocation, secret access, network access, exploit execution, dependency/donor admission, persistence, telemetry, learning, remediation, product integration, release, ruleset change, or project completion.

---

## 2. Evidence-driven reconciliation gap

Fresh post-P6-R1 analysis is recorded at:

```text
PR #345 / comment 5551909496 / ANALYSIS_ONLY
AUTHORITY_CREATED = NO
```

Root `AGENTS.md` requires:

```text
POST-MERGE PROOF
-> ROADMAP RECONCILIATION
-> NEXT AUTHORIZED UNIT
```

Canonical P6-R1 proof is complete, but the five current navigation/status views still describe the older P5 post-closeout reconciliation candidate and still state P6-P9 implementation globally as not authorized. That is proven current-view truth drift, not evidence for P6-R2.

The minimum sufficient next unit is therefore one bounded five-path documentation reconciliation and no successor implementation.

---

## 3. Canonical anchors that the later reconciliation may record

```text
P6_R1_AUTHORIZATION
  PR = #344
  MERGE = 208bfc370c8671bd9b5a71d659355aa08e40d65a
  STATE = CLOSED_CANONICAL

P6_R1_IMPLEMENTATION
  PR = #345
  QUALIFIED_FINAL_HEAD = 60bc2e3e157b8eacac145ef22fa7cdaae1428baa
  MERGE = 0f907b6f6e12a15da753e836b124c586ee9fe285
  MERGE_TREE = 4262a0f68d9dbd69dd2883ca17eecdd31af68c46
  PROOF = 5551884329
  STATE = CLOSED_CANONICAL
```

Canonical P6-R1 implementation blobs:

```text
packages/kodac-runtime/src/security/p6-deterministic-security-finding.ts
  = 453166c7f8c5e49f9b0f7cc2cd744c7ec54b38d0
schema/p6-deterministic-security-finding.schema.json
  = d7586b0d434cca713ea7d112d6d1b0407558cc50
packages/kodac-runtime/test/p6-r1-deterministic-security-finding.test.ts
  = fa489fafd8cb8ecfc3ff684fa08425b1ed48ab67
```

Material qualification history that may be summarized without rewriting history:

```text
INITIAL_IMPLEMENTATION_HEAD = 4953d0f3a1fa2f639e494ef74aedc4fb5c83bdea
INITIAL_RESULT = REJECTED / EXACT-HEAD TYPECHECK FAILED
FINAL_QUALIFIED_HEAD = 60bc2e3e157b8eacac145ef22fa7cdaae1428baa
REPAIR = FORWARD_ONLY / AUTHORIZED_TEST_PATH_ONLY / NO_FORCE_PUSH / NO_REBASE
PREDECESSOR_HEAD_EVIDENCE = STALE
```

---

## 4. Exact future reconciliation allowlist

Only after this authorization record becomes canonical and post-merge proven may one later reconciliation candidate modify exactly these five paths:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized.

The reconciliation may not modify:

```text
AGENTS.md
docs/planning/**
docs/research/**
docs/adr/**
packages/**
schema/**
.github/**
package.json
any lockfile
any benchmark data/result
any product/runtime/release configuration outside the five exact current views
```

---

## 5. Required reconciliation semantics

The later five-path candidate may only make the minimum necessary current-view edits to record already-proven canonical truth.

It must record, where appropriate for each current view:

```text
P5 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL / PR #343 / proof 5551673149
P6-R1 AUTHORIZATION = CLOSED_CANONICAL / PR #344
P6-R1 DETERMINISTIC SECURITY FINDING FOUNDATION = CLOSED_CANONICAL / PR #345 / proof 5551884329
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P6 OVERALL = NOT_CLOSED
P7-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
```

It may describe P6-R1 only within its proven bounded meaning:

```text
PURE / DATA-ONLY PROVIDER-NEUTRAL DETERMINISTIC SECURITY FINDING CONTRACT
+ VALIDATED CANONICAL P5-R1 PROVENANCE BINDING
+ CLOSED SECURITY LANE / SEVERITY VOCABULARIES
+ INERT BOUNDED RULE AND LOGICAL LOCATION METADATA
+ SHA-256 NATIVE-RECORD DIGEST / FINGERPRINT IDENTITIES
+ BOUNDED UNIQUE CANONICALLY SORTED REFERENCE IDENTITIES
-> DETERMINISTIC CONTENT-ADDRESSED DETACHED/FROZEN FINDING RECORD
```

The reconciliation must preserve all unrelated canonical program truth and material repair history. It must not remove or weaken existing authority boundaries merely to shorten current views.

The reconciliation must not self-certify its own closure. Until guarded merge and external post-merge proof exist, it must state that the five-view reconciliation is a current candidate and not yet closed canonical.

After successful post-merge proof of the reconciliation, the next action may only be fresh evidence-driven P6 successor analysis. It must not name P6-R2 as authorized by sequence.

---

## 6. Required non-equivalences and preserved non-grants

The later reconciliation must preserve or add, where appropriate:

```text
DETERMINISTIC_SECURITY_FINDING != PROOF
DETERMINISTIC_SECURITY_FINDING != TRUTH
DETERMINISTIC_SECURITY_FINDING != ADJUDICATION
DETERMINISTIC_SECURITY_FINDING != EXPLOITABILITY_ESTABLISHED
DETERMINISTIC_SECURITY_FINDING != CLEAN_SCAN_OR_SAFE_CLAIM
DETERMINISTIC_SECURITY_FINDING != REVIEWER_CLAIM
DETERMINISTIC_SECURITY_FINDING != VERIFIER_EXECUTION
DETERMINISTIC_SECURITY_FINDING != SCANNER_ANALYZER_EXECUTION
DETERMINISTIC_SECURITY_FINDING != SARIF_INGESTION
DETERMINISTIC_SECURITY_FINDING != SECRET_ACCESS
DETERMINISTIC_SECURITY_FINDING != NETWORK_ACCESS
DETERMINISTIC_SECURITY_FINDING != K2_K5_DONE_GATE_AUTHORITY
P6-R1 CLOSED != P6-R2+ AUTHORITY
P6-R1 CLOSED != P6 OVERALL CLOSED
P6-R1 CLOSED != P7 AUTHORITY
P6-R1 CLOSED != PROJECT COMPLETION
```

Preserved deny-by-default boundaries:

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
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P6 OVERALL = NOT_CLOSED
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
DEPENDENCY_DONOR_ADMISSION = NONE
PERSISTENCE_DATABASE_TELEMETRY_UPLOAD_LEARNING = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
CLI_API_PACKAGE_ROOT_PRODUCT_INTEGRATION = NOT_AUTHORIZED
PUBLIC_RELEASE_PACKAGE_PUBLICATION_DEPLOYMENT = NOT_AUTHORIZED
P7_P9_IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## 7. Qualification gate for this authorization candidate

This one-path authorization candidate must not merge unless one unchanged exact head proves:

```text
BASE == CURRENT CANONICAL MAIN == 0f907b6f6e12a15da753e836b124c586ee9fe285
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P6_R1_POST_MERGE_CURRENT_VIEW_RECONCILIATION_AUTHORIZATION_2026-09-05.md
REQUIRED CI = TERMINAL SUCCESS OR CANONICALLY PROVEN NON_APPLICABLE
INTERNAL SUBSTANTIVE SEMANTIC INSPECTION = CLEAN
KNOWN ACTIONABLE DEFECTS = 0
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

## 8. Conditional result only

Only after this exact authorization candidate qualifies, merges normally, and passes mandatory post-merge proof may the repository state:

```text
P6_R1_POST_MERGE_CURRENT_VIEW_RECONCILIATION = AUTHORIZED
RECONCILIATION_PATHS = EXACTLY 5
```

Even then:

```text
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P6 OVERALL = NOT_CLOSED
P7-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
