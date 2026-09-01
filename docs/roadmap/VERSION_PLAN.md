# Kodac Version Plan

## Purpose

Kodac engineering milestones and public product versions are separate governance tracks.

This file records the current engineering/version boundary. It does not authorize implementation, package publication, release, brand launch, provider/model access, persistence, learning, benchmark execution, donor intake, or side effects.

Always read live GitHub truth, root `AGENTS.md`, `docs/roadmap/NEXT.md`, governing ADRs, and the exact active authorization before acting.

## Current engineering state

```text
K0/K1 = CLOSED
K2 = CLOSED
K3 = CLOSED FOR CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
KRI-R1 THROUGH KRI-R4 = CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K4 = CLOSED FOR CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K5 = CLOSED FOR CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K6 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
P2-R1 THROUGH P2-R5 = CLOSED_CANONICAL
P2 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ = NOT_AUTHORIZED
P3-R1 THROUGH P3-R12 = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R13+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

The P3-R12 closure is an engineering evidence milestone only. It creates no public version, release, package, support, compatibility, benchmark-superiority, production-readiness, or brand authority.

## Canonical P3-R12 anchors

```text
P3_R11_RECONCILIATION = PR #290 / 7ae2f05114fd06eba5ce4c70efc0c743647c680a
P3_R11_RECONCILIATION_POST_MERGE_PROOF = #290 / 5495642593

P3_R12_AUTHORIZATION = PR #291 / 0aad292ebf3e5f84804b5f731e888da43cb8e883
P3_R12_AUTHORIZATION_BLOB = 8efe833ba236c90af541d21ff3e7cbef5907f2c3
P3_R12_AUTHORIZATION_POST_MERGE_PROOF = #291 / 5495894426

P3_R12_IMPLEMENTATION = PR #293 / 7d9de3e1ea544677eac93a455b9ab06a5ef35903
P3_R12_QUALIFIED_HEAD = 1e3741573b3bfd20f5746c8bda91c98c7f06206b
P3_R12_QUALIFIED_TREE = 1d6302fb267d45a01f87538f171465a4a29256b2
P3_R12_MERGE_TREE = 1d6302fb267d45a01f87538f171465a4a29256b2
P3_R12_MERGE_VERIFICATION = verified / valid
P3_R12_SEMANTIC_REVIEW = Cubic 5497345413 + CodeRabbit 5497644250
P3_R12_QUALIFICATION_PROOF = #293 / 5497667401
P3_R12_POST_MERGE_GOVERNANCE = 33536789925 / SUCCESS
P3_R12_POST_MERGE_PROVENANCE = 99952949641 / SUCCESS
P3_R12_POST_MERGE_LEGACY_TESTS = 99952950405 / SUCCESS
P3_R12_POST_MERGE_K2 = 33536789922 / SUCCESS
P3_R12_POST_MERGE_CLASSIFIER = 99952950032 / SUCCESS
P3_R12_POST_MERGE_MACOS = 99952997213 / SUCCESS
P3_R12_POST_MERGE_WINDOWS = 99952997233 / SUCCESS
P3_R12_POST_MERGE_UBUNTU = 99952997357 / SUCCESS
P3_R12_POST_MERGE_K2_GATE = 99953315925 / SUCCESS
P3_R12_POST_MERGE_PROOF_COMMENT = #293 / 5497699790
P3_R12_RECONCILIATION_BOUNDARY_COMMENT = #293 / 5497702022
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R12 blobs:

```text
packages/kodac-runtime/bench/p3-r12/contracts.ts = 7b828317da56394257d5dd4c0ab1ce047005f4a1
packages/kodac-runtime/bench/p3-r12/single-strategy-two-case-reduction-evidence.ts = da8f3c147959041326c523a3c7c7b806a6f4c47e
packages/kodac-runtime/test/p3-r12-single-strategy-two-case-reduction-evidence.test.ts = ac6ff742431413b28bd90e7e5988cf161e562044
docs/planning/KODAC_P3_R12_TWO_CASE_REDUCTION_EVIDENCE_2026-09-01.md = 2f1202beddefab6582d40570bc7f082e2cd45397
```

Historical P3-R8 K2 run `33439529693` remains failed evidence and is not relabeled by later recovery.

## P3-R12 is not a release milestone

P3-R12 provides only a pure deterministic local exactly-two-case reduction-evidence boundary:

```text
ONE EXACT CANONICAL P3-R11 POLICY-BOUND ALIGNED PAIR
+ EXACTLY TWO TRUSTED OBSERVATIONS PER CANONICAL DIMENSION
+ ONE EXPLICIT P2-R3-COMPATIBLE MISSINGNESS POLICY
+ ONE EXPLICIT P2-R3-COMPATIBLE REDUCER
-> EXACT PER-DIMENSION COVERAGE / OBSERVED COUNTS
-> REDUCED OR INSUFFICIENT_EVIDENCE
-> NUMBER ARITHMETIC_MEAN OR BOOLEAN_TRUE_RATE WHEN SUFFICIENT
-> EXACT UNITS AND BOOLEAN TRUE / DENOMINATOR COUNTS
-> ONE DETERMINISTIC DEEPLY FROZEN REDUCTION-EVIDENCE IDENTITY
-> NO DIRECTION / DELTA / HIGHER-LOWER MEANING
-> NO CROSS-DIMENSION AGGREGATE
-> NO STRATEGY COMPARISON / RANK / PROMOTION / WINNER
```

Therefore:

```text
P3-R12 CLOSED_CANONICAL
!= P3 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL BENCHMARK TASK / PARTICIPANT EXECUTION
!= THREE-OR-MORE-CASE / UNBOUNDED REDUCTION
!= CROSS-DIMENSION SUM / MEAN / WEIGHTED SCORE
!= DIRECTION / DELTA / BETTER-WORSE
!= MULTI-STRATEGY COMPARISON / RANKING / PROMOTION
!= REPOSITORY-OWNED GOLD TRUTH
!= REPOSITORY-OWNED DEFAULT CONTEXT POLICY
!= WINNING / SUPERIOR CONTEXT STRATEGY PROVEN
!= HOLDOUT SUFFICIENCY / CONTAMINATION-FREE / SIGNIFICANCE QUALIFICATION
!= REAL PROVIDER / MODEL EXECUTION
!= PRODUCT INTEGRATION COMPLETE
!= PUBLIC RELEASE READY
!= PACKAGE PUBLISHABLE
!= PUBLIC VERSION DECLARED
!= PRODUCTION READY
!= SUPPORT SLA ESTABLISHED
!= COMPATIBILITY PROMISE ESTABLISHED
!= BRAND LAUNCH AUTHORIZED
!= P3-R13+ AUTHORIZED
!= P4 AUTHORIZED
```

## Repository visibility versus release authority

```text
PUBLIC GITHUB REPOSITORY = YES
PUBLIC RELEASE VERSION = NOT_AUTHORIZED
PACKAGE PUBLICATION = NOT_AUTHORIZED
RELEASE CHANNEL = NOT_AUTHORIZED
1.0 PROMISE = NOT_ESTABLISHED
SUPPORT / COMPATIBILITY PROMISE = NOT_ESTABLISHED
PRODUCTION-READINESS CLAIM = NOT_AUTHORIZED
PUBLIC BENCHMARK / SUPERIORITY CLAIM = NOT_AUTHORIZED
BRAND LAUNCH = NOT_AUTHORIZED
KODAC NAME / TRADEMARK CLEARANCE = NOT_ESTABLISHED
```

Version numbering, release channels, package publication, installation/upgrade promises, compatibility guarantees, support expectations, benchmark claims, security claims, quality claims, and brand decisions require separate evidence and explicit authority.

## Current roadmap/status reconciliation

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. Canonical P3-R12 post-merge proof `#293 / 5497699790` plus continuation boundary `#293 / 5497702022` permit the R12 documentation-only current-view reconciliation limited to:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

It changes no runtime, historical evidence, workflow, dependency, donor code, provider/model, benchmark corpus, persistence, release, or ruleset surface. It is a candidate until exact-head qualification, two independent substantive semantic terminal-clean review channels, guarded normal merge with exact expected head, and complete post-merge proof.

## Current implementation boundaries relevant to versioning

```text
K3-R7+ = NOT_AUTHORIZED
KRI-R5+ = NOT_AUTHORIZED
K4-R6+ = NOT_AUTHORIZED
K5-R6+ = NOT_AUTHORIZED
K6-R6+ = NOT_AUTHORIZED
P2-R6+ = NOT_AUTHORIZED
P3-R13+ = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

P3-R12 PER-DIMENSION EXACTLY-TWO-CASE REDUCTION = CLOSED_CANONICAL WITHIN ITS EXACT CONTRACT
THREE-OR-MORE-CASE / UNBOUNDED REDUCTION = NOT_AUTHORIZED BY THIS FILE
CROSS-DIMENSION AGGREGATE SCORE = NOT_AUTHORIZED BY THIS FILE
DIRECTION / DELTA / BETTER-WORSE = NOT_AUTHORIZED BY THIS FILE
MULTI-STRATEGY COMPARISON / RANKING / PROMOTION = NOT_AUTHORIZED BY THIS FILE
NEW KODAC DEPENDENCIES = NOT_AUTHORIZED BY THIS FILE
CODE / DONOR IMPORT = NOT_AUTHORIZED BY THIS FILE
CONCRETE EXTERNAL REVIEWER / MODEL / PROVIDER ADAPTER = NOT_AUTHORIZED BY THIS FILE
PROVIDER NETWORK / SECRET HANDLING = NOT_AUTHORIZED BY THIS FILE
PROVIDER / MODEL / REVIEWER / EVALUATOR INVOCATION = NOT_AUTHORIZED BY THIS FILE
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS FILE
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED BY THIS FILE
PERSISTENT REVIEW / PROOF / ROUTE / BENCHMARK / OUTCOME STORAGE = NOT_AUTHORIZED BY THIS FILE
TELEMETRY / UPLOAD = NOT_AUTHORIZED BY THIS FILE
TRAINING / LEARNING = NOT_AUTHORIZED BY THIS FILE
AUTOMATIC STRATEGY PROMOTION / TRUST-POLICY MUTATION = NOT_AUTHORIZED BY THIS FILE
AUTOFIX EXECUTION = NOT_AUTHORIZED BY THIS FILE
RULESET CHANGE / BYPASS = NOT_AUTHORIZED BY THIS FILE
K2 EXECUTION-AUTHORITY EXPANSION = NOT_AUTHORIZED BY THIS FILE
DONE GATE / PROVEN_READY MODIFICATION = NOT_AUTHORIZED BY THIS FILE
```

## Next engineering boundary

Only after the R12 current-view reconciliation becomes canonical and post-merge proven may later bounded P3 definition/planning/authorization-candidate preparation be considered, if justified by a concrete canonical gap.

No `P3-R13` requirement is inferred from sequence alone. P3-R12 deliberately stops before directional/comparison semantics. Internal evidence may support investigating a bounded direction/comparison evidence layer compatible with canonical P2-R4 semantics, but that hypothesis creates no authority.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

## Future release-gate direction

A future public-release authorization should separately prove applicable subsets of:

- supported product scope and user-facing surfaces;
- installation, upgrade, and rollback behavior;
- compatibility/versioning contract;
- security and trust posture;
- provenance/license completeness;
- required CI and supported platforms;
- packaging/distribution artifacts;
- benchmark/claim evidence;
- documentation/support expectations;
- brand/name/trademark status.

This is planning direction only, not an authorized release checklist or release decision.

## Navigation

- Current action: `docs/roadmap/NEXT.md`
- P3-R12 authorization: `docs/planning/KODAC_P3_R12_TWO_CASE_REDUCTION_EVIDENCE_AUTHORIZATION_2026-09-01.md`
- P3-R12 evidence: `docs/planning/KODAC_P3_R12_TWO_CASE_REDUCTION_EVIDENCE_2026-09-01.md`
- P3-R12 post-merge proof: PR #293 / comment `5497699790`
- Reconciliation continuation boundary: PR #293 / comment `5497702022`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
