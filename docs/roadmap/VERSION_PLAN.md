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
P3-R1 THROUGH P3-R9 = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R10+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

The P3-R9 closure is an engineering evidence milestone only. It creates no public version, release, package, support, compatibility, benchmark-superiority, production-readiness, or brand authority.

## Canonical P3-R9 anchors

```text
P3_R8_RECONCILIATION = PR #281 / ff7a474f73b9efacab4eceafd210c67488987b64

P3_R9_AUTHORIZATION = PR #282 / ba9553de3384e683a54469ac7aa05545d20c0c1b
P3_R9_AUTHORIZATION_QUALIFIED_HEAD = 9013fcf596453bb49afb7727af138de4fd70381d
P3_R9_AUTHORIZATION_BLOB = e3b3912b17fb9585b7fc075f11afd6055c4b7224
P3_R9_AUTHORIZATION_POST_MERGE_PROOF = #282 / 5491794590

P3_R9_IMPLEMENTATION = PR #283 / 8d89875cf71715945f81b05853adeddebcb60284
P3_R9_QUALIFIED_HEAD = 457d12f27ededa4b60cd39b2aa946e2692b3d2f7
P3_R9_MERGE_TREE = adb808338c6ea1e802811728fdf2c6d3c6de373a
P3_R9_MERGE_VERIFICATION = verified / valid
P3_R9_SEMANTIC_REVIEW = Cubic 5492179655 + CodeRabbit 5492246477
P3_R9_POST_MERGE_GOVERNANCE = 33495225110 / SUCCESS
P3_R9_POST_MERGE_K2 = 33495225098 / SUCCESS
P3_R9_POST_MERGE_UBUNTU = 99815772777 / SUCCESS
P3_R9_POST_MERGE_MACOS = 99815772815 / SUCCESS
P3_R9_POST_MERGE_WINDOWS = 99815772844 / SUCCESS
P3_R9_POST_MERGE_K2_GATE = 99816093316 / SUCCESS
P3_R9_POST_MERGE_PROOF_COMMENT = #283 / 5492583969
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R9 blobs:

```text
packages/kodac-runtime/bench/p3-r9/contracts.ts = b7064806e681983b386ed59123578da1bea384e3
packages/kodac-runtime/bench/p3-r9/single-strategy-two-case-report-composition.ts = fa4fd9af2938221ab8b463efa7de0e81cd81054a
packages/kodac-runtime/test/p3-r9-single-strategy-two-case-report-composition.test.ts = cab8c74c82bf09b6f5c911e05c4a53756529e2bb
docs/planning/KODAC_P3_R9_SINGLE_STRATEGY_TWO_CASE_REPORT_COMPOSITION_EVIDENCE_2026-09-01.md = 08b828fa11455929596cb0e5247f32e885e73168
```

Historical P3-R8 K2 run `33439529693` remains failed evidence and is not relabeled by later recovery.

## P3-R9 is not a release milestone

P3-R9 provides only a pure deterministic local composition boundary:

```text
ONE EXACT CANONICAL P3-R8 STRATEGY SUBJECT
+ CANONICAL P3-R7 REPORT(A) / P3-R8 BINDING(A)
+ CANONICAL P3-R7 REPORT(B) / P3-R8 BINDING(B)
-> EXACT TWO-MEMBER ORDERED COMPOSITION
-> PRESERVE PREDECESSOR IDENTITIES
-> NO OBSERVATION / METRIC / SCORE REDUCTION
-> ONE DETERMINISTIC COMPOSITION EVIDENCE IDENTITY
```

Therefore:

```text
P3-R9 CLOSED_CANONICAL
!= P3 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL BENCHMARK TASK / PARTICIPANT EXECUTION
!= THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION
!= MULTI-CASE OBSERVATION / METRIC / SCORE AGGREGATION
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
!= P3-R10+ AUTHORIZED
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

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. Canonical P3-R9 post-merge proof `#283 / 5492583969` permits the R9 documentation-only current-view reconciliation limited to:

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
P3-R10+ = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

NEW KODAC DEPENDENCIES = NOT_AUTHORIZED BY THIS FILE
CODE / DONOR IMPORT = NOT_AUTHORIZED BY THIS FILE
CONCRETE EXTERNAL REVIEWER / MODEL / PROVIDER ADAPTER = NOT_AUTHORIZED BY THIS FILE
PROVIDER NETWORK / SECRET HANDLING = NOT_AUTHORIZED BY THIS FILE
PROVIDER / MODEL / REVIEWER / EVALUATOR INVOCATION = NOT_AUTHORIZED BY THIS FILE
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS FILE
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED BY THIS FILE
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION = NOT_AUTHORIZED BY THIS FILE
MULTI-CASE OBSERVATION / METRIC / SCORE AGGREGATION = NOT_AUTHORIZED BY THIS FILE
MULTI-STRATEGY COMPARISON / RANKING / PROMOTION = NOT_AUTHORIZED BY THIS FILE
PERSISTENT REVIEW / PROOF / ROUTE / BENCHMARK / OUTCOME STORAGE = NOT_AUTHORIZED BY THIS FILE
TELEMETRY / UPLOAD = NOT_AUTHORIZED BY THIS FILE
TRAINING / LEARNING = NOT_AUTHORIZED BY THIS FILE
CROSS-REPOSITORY AGGREGATION / LEARNING = NOT_AUTHORIZED BY THIS FILE
AUTOMATIC STRATEGY PROMOTION / TRUST-POLICY MUTATION = NOT_AUTHORIZED BY THIS FILE
AUTOFIX EXECUTION = NOT_AUTHORIZED BY THIS FILE
RULESET CHANGE / BYPASS = NOT_AUTHORIZED BY THIS FILE
K2 EXECUTION-AUTHORITY EXPANSION = NOT_AUTHORIZED BY THIS FILE
DONE GATE / PROVEN_READY MODIFICATION = NOT_AUTHORIZED BY THIS FILE
```

## Next engineering boundary

Only after the R9 current-view reconciliation itself becomes canonical and post-merge proven may later bounded P3 definition/planning/authorization-candidate preparation be considered, if justified by a concrete canonical gap.

No `P3-R10` requirement is inferred from sequence alone. External precedent may inform a hypothesis, but benchmark-first governance requires reproducible evidence before a contested replacement, winner, or superiority claim can become canonical.

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
- P3-R9 authorization: `docs/planning/KODAC_P3_R9_SINGLE_STRATEGY_TWO_CASE_REPORT_COMPOSITION_AUTHORIZATION_2026-09-01.md`
- P3-R9 evidence: `docs/planning/KODAC_P3_R9_SINGLE_STRATEGY_TWO_CASE_REPORT_COMPOSITION_EVIDENCE_2026-09-01.md`
- P3-R9 post-merge proof: PR #283 / comment `5492583969`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
