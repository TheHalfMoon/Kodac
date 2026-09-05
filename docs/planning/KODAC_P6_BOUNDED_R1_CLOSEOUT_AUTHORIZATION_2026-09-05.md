# Kodac P6 — Bounded R1 Engineering Closeout Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_CLOSEOUT_AUTHORITY UNTIL MERGED_AND_POST_PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Deny-by-default state

This record authorizes only one future documentation/evidence closeout unit after this exact authorization candidate itself qualifies on one unchanged exact head, merges normally into protected `main` using the exact expected-head precondition, and passes mandatory post-merge proof.

```text
CANONICAL_MAIN_AT_CANDIDATE_START = fd2c53682dde47b795740cc706b28852397f3ec6
CANONICAL_TREE_AT_CANDIDATE_START = 603123f2fa9d0ab156e76aa5d8a7b2cb9af3778a
P6-R1 AUTHORIZATION = CLOSED_CANONICAL
P6-R1 DETERMINISTIC SECURITY FINDING FOUNDATION = CLOSED_CANONICAL
P6-R1 POST-MERGE CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P6 BOUNDED R1 ENGINEERING SCOPE = NOT_YET_CLOSED
P6 BOUNDED R1 ENGINEERING CLOSEOUT = AUTHORIZATION_CANDIDATE_ONLY
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P6 OVERALL = NOT_CLOSED
P7-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This record does not close P6 overall, authorize P6-R2+, authorize scanner/analyzer execution, SARIF ingestion, provider/model invocation, secret access, network access, exploit/attack execution, dependency/donor admission, persistence, telemetry, learning, remediation, product/API/CLI integration, release, P7-P9, ruleset mutation/bypass, or project completion.

---

## 2. Canonical baseline and procedural basis

```text
P5_POST_CLOSEOUT_CURRENT_VIEW_RECONCILIATION
  PR = #343
  MERGE = 48a4d0944c620a8cca7f25ea7eb24e794be8768f
  PROOF = 5551673149
  STATE = CLOSED_CANONICAL

P6_R1_AUTHORIZATION
  PR = #344
  QUALIFIED_HEAD = 1cd3942b54a59876ee1ac94ae4de895e84f5a80a
  MERGE = 208bfc370c8671bd9b5a71d659355aa08e40d65a
  PROOF = 5551754576
  STATE = CLOSED_CANONICAL

P6_R1_IMPLEMENTATION
  PR = #345
  INITIAL_FAILED_HEAD = 4953d0f3a1fa2f639e494ef74aedc4fb5c83bdea
  FINAL_QUALIFIED_HEAD = 60bc2e3e157b8eacac145ef22fa7cdaae1428baa
  MERGE = 0f907b6f6e12a15da753e836b124c586ee9fe285
  PROOF = 5551884329
  STATE = CLOSED_CANONICAL

P6_R1_POST_MERGE_RECONCILIATION_ANALYSIS
  PR = #345
  COMMENT = 5551909496
  CLASS = ANALYSIS_ONLY
  AUTHORITY_CREATED = NO

P6_R1_POST_MERGE_RECONCILIATION_AUTHORIZATION
  PR = #346
  QUALIFIED_HEAD = 00b3103aedf5e824b949472bc09422eb3095785f
  MERGE = acce1c1644250cc4afd2008175d41d41ca51de87
  PROOF = 5551929413
  STATE = CLOSED_CANONICAL

P6_R1_POST_MERGE_CURRENT_VIEW_RECONCILIATION
  PR = #347
  QUALIFIED_HEAD = c0e4492bc088ac3554fd49da49c1125fcc9a539a
  MERGE = fd2c53682dde47b795740cc706b28852397f3ec6
  PROOF = 5551961606
  STATE = CLOSED_CANONICAL

P6_POST_R1_SUCCESSOR_ANALYSIS
  PR = #347
  COMMENT = 5551968892
  CLASS = ANALYSIS_ONLY
  AUTHORITY_CREATED = NO
  CONCLUSION = NO ADDITIONAL NUMBERED P6 MECHANISM PROVEN NECESSARY BEFORE BOUNDED CLOSEOUT

RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Root `AGENTS.md` requires live GitHub truth, exact active authority, bounded work, exact-head proof, guarded merge, post-merge proof, current-view reconciliation, and only then the next authorized unit.

The fresh post-P6-R1 successor analysis rejected automatic P6-R2 sequencing. It found no concrete current P6 runtime/schema/test mechanism gap that is both non-duplicative and required before bounded engineering closeout.

---

## 3. Why bounded closeout is the minimum sufficient next unit

Canonical P6-R1 now provides one deterministic, pure/data-only, provider-neutral security finding contract over validated canonical P5-R1 provenance with:

```text
ORIGIN = DETERMINISTIC_ANALYZER
SECURITY LANES =
  STATIC_ANALYSIS
  DEPENDENCY_ANALYSIS
  SECRET_DETECTION
  SUPPLY_CHAIN_PROVENANCE
  CI_WORKFLOW_INTEGRITY

CLOSED SEVERITY VOCABULARY
BOUNDED INERT RULE IDENTITY
BOUNDED INERT REPOSITORY-RELATIVE LOGICAL LOCATION
LOWERCASE SHA-256 PROVIDER-NATIVE RECORD DIGEST
LOWERCASE SHA-256 STABLE FINGERPRINT
BOUNDED UNIQUE CANONICALLY SORTED REFERENCE IDENTITIES
DETERMINISTIC CONTENT ADDRESSING
DETACHED / DEEPLY IMMUTABLE OUTPUT
```

Fresh code/planning reconciliation also proves that adjacent concerns already have owners or are execution-coupled future surfaces:

```text
P4 / KRI
  reviewer/agentic security claims and verifier proposals

P5-R1
  exact evidence provenance binding

P5-R2
  exact evidence relation edge

K5
  proof review / linkage / reconciliation

K2
  unique trusted side-effect execution boundary

AnalyzerExecutionManifest
  execution-coupled planning contract requiring invocation/exit/output/effective-policy evidence
  NOT proven necessary before scanner/analyzer execution authority exists

AnalyzerEffectivePolicyReceipt
  trusted-runner/effective filesystem-network-credential enforcement receipt
  NOT authorized and NOT a pure independent prerequisite to bounded P6-R1 closeout

ProviderArtifactType / validator lifecycle stage
  broader future Cyber/provider artifact lifecycle
  NOT proven as a minimum independent successor before closeout

SARIF/provider adapters
  future integration/execution-facing surfaces
  NOT authorized and NOT proven necessary before closeout

Exploit/attack validation
  future bounded execution surface
  NOT authorized
```

The current concrete gap is therefore only:

```text
P6-R1 INDIVIDUALLY CLOSED_CANONICAL
!=
P6 BOUNDED R1 ENGINEERING SCOPE CLOSED_CANONICAL
```

The applicable repository precedent is P3/P4/P5 bounded convergence: when fresh evidence finds no additional numbered mechanism required, close the already-canonical bounded engineering lineage through a separately authorized evidence-only closeout rather than inventing authority by numbering.

---

## 4. Exact future closeout allowlist

Only after this authorization record becomes canonical and post-merge proven may one later closeout candidate modify exactly these six paths:

```text
docs/planning/KODAC_P6_BOUNDED_R1_CANONICAL_CLOSEOUT_EVIDENCE_2026-09-05.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No seventh path is authorized.

The later closeout may not modify:

```text
AGENTS.md
any runtime source or test
any schema
any historical authorization/evidence record
.github/**
package.json
any lockfile
any benchmark corpus / manifest / fixture / result
any provider/model/reviewer/verifier configuration
KRI / K5 / K2 runtime or authority
persistence / telemetry / learning surfaces
CLI / API / package-root / product surfaces
release configuration
rulesets or repository protection
```

---

## 5. Conditional future result

Only after the later six-path closeout independently qualifies, merges normally with the exact qualified expected head, and passes complete post-merge proof may external evidence establish:

```text
P6-R1 INDIVIDUAL SLICE = CLOSED_CANONICAL
P6 BOUNDED R1 ENGINEERING SCOPE = CLOSED_CANONICAL
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
DEPENDENCY_DONOR_ADMISSION = NONE
PERSISTENCE_DATABASE_TELEMETRY_UPLOAD_LEARNING = NOT_AUTHORIZED
AUTOFIX_REMEDIATION_EXECUTION = NOT_AUTHORIZED
CLI_API_PACKAGE_ROOT_PRODUCT_INTEGRATION = NOT_AUTHORIZED
PUBLIC_RELEASE_PACKAGE_PUBLICATION_DEPLOYMENT = NOT_AUTHORIZED
P7_P9_IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## 6. Required lineage evidence for the later closeout

The later closeout must independently re-read live GitHub and bind the complete canonical P6-R1 lineage:

```text
P5 post-closeout current-view reconciliation: #343
P6-R1 authorization: #344
P6-R1 implementation: #345
P6-R1 reconciliation analysis: #345 / 5551909496 / ANALYSIS_ONLY
P6-R1 reconciliation authorization: #346
P6-R1 current-view reconciliation: #347
post-P6-R1 successor analysis: #347 / 5551968892 / ANALYSIS_ONLY
```

It must bind actual canonical merge ancestry, qualified heads/trees, implementation blob identities, exact allowlists, required CI, material forward-only repair history, post-merge proof anchors, active ruleset state, and any superseded/stale qualification evidence material to the lineage.

Material P6-R1 repair/evidence history that must remain explicit:

```text
INITIAL_IMPLEMENTATION_HEAD = 4953d0f3a1fa2f639e494ef74aedc4fb5c83bdea
INITIAL_RESULT = REJECTED / EXACT-HEAD TYPESCRIPT QUALIFICATION FAILED
DEFECT = TEST-ONLY READONLY-ARRAY MUTATION-FIXTURE TYPING
REPAIR = FORWARD_ONLY / AUTHORIZED TEST PATH ONLY
FINAL_QUALIFIED_HEAD = 60bc2e3e157b8eacac145ef22fa7cdaae1428baa
SOURCE_SCHEMA_BLOBS_MOVED_DURING_REPAIR = NO
PREDECESSOR_HEAD_EVIDENCE = STALE
```

The later closeout must preserve these canonical implementation blobs exactly as observed on current `main`:

```text
packages/kodac-runtime/src/security/p6-deterministic-security-finding.ts
  = 453166c7f8c5e49f9b0f7cc2cd744c7ec54b38d0
schema/p6-deterministic-security-finding.schema.json
  = d7586b0d434cca713ea7d112d6d1b0407558cc50
packages/kodac-runtime/test/p6-r1-deterministic-security-finding.test.ts
  = fa489fafd8cb8ecfc3ff684fa08425b1ed48ab67
```

Live GitHub wins if any identity moves before later qualification.

---

## 7. Required non-equivalences

```text
P6 BOUNDED R1 ENGINEERING SCOPE CLOSED != P6 OVERALL CLOSED
P6 BOUNDED R1 ENGINEERING SCOPE CLOSED != P6-R2+ AUTHORITY
P6 BOUNDED R1 ENGINEERING SCOPE CLOSED != SCANNER / ANALYZER EXECUTION AUTHORITY
P6 BOUNDED R1 ENGINEERING SCOPE CLOSED != SARIF INGESTION AUTHORITY
P6 BOUNDED R1 ENGINEERING SCOPE CLOSED != PROVIDER / MODEL EXECUTION AUTHORITY
P6 BOUNDED R1 ENGINEERING SCOPE CLOSED != SECRET / NETWORK / EXPLOIT AUTHORITY
P6 BOUNDED R1 ENGINEERING SCOPE CLOSED != DEPENDENCY / DONOR ADMISSION
P6 BOUNDED R1 ENGINEERING SCOPE CLOSED != P7 AUTHORITY
P6 BOUNDED R1 ENGINEERING SCOPE CLOSED != PRODUCT OR RELEASE AUTHORITY
P6 BOUNDED R1 ENGINEERING SCOPE CLOSED != PROJECT COMPLETION
DETERMINISTIC_SECURITY_FINDING != PROOF / TRUTH / ADJUDICATION
DETERMINISTIC_SECURITY_FINDING != CLEAN_SCAN_OR_SAFE_CLAIM
DETERMINISTIC_SECURITY_FINDING != EXPLOITABILITY_ESTABLISHED
PLANNING DIRECTION != IMPLEMENTATION AUTHORITY
POST_MERGE PROOF != SUCCESSOR AUTHORITY
```

---

## 8. Qualification gate for this authorization candidate

Do not merge this authorization record unless one unchanged exact head/current metadata proves:

```text
BASE == CURRENT CANONICAL MAIN == fd2c53682dde47b795740cc706b28852397f3ec6
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P6_BOUNDED_R1_CLOSEOUT_AUTHORIZATION_2026-09-05.md
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

Any byte/head/base/qualification-relevant movement invalidates exact-head qualification evidence.

---

## 9. Authorization-candidate boundary

This one-path record is itself only a candidate. It becomes effective authority for the later six-path bounded closeout only after exact-head qualification, zero actionable findings/threads, guarded normal merge into protected `main`, and mandatory post-merge proof.

Until then:

```text
P6_BOUNDED_R1_CLOSEOUT = NOT_AUTHORIZED
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P6 OVERALL = NOT_CLOSED
P7-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
