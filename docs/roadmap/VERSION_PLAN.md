# Kodac Version Plan

## Purpose

Kodac engineering milestones and public product versions are separate governance tracks.

This file records the current engineering/version boundary. It does not authorize implementation, package publication, release, brand launch, provider/model access, persistence, learning, benchmark execution, or side effects.

Always read live GitHub truth, root `AGENTS.md`, `docs/roadmap/NEXT.md`, and the exact active authorization before acting.

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
P3-R1 THROUGH P3-R7 = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R8+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

The R7 closure is an engineering evidence milestone only. It creates no public version, release, package, support, compatibility, benchmark-superiority, production-readiness, or brand authority.

## Canonical P3-R7 anchors

```text
P3_R6_RECONCILIATION = PR #273 / ac002f5ef6bf9f338e1106b7b200dd5eb062e776
P3_R7_AUTHORIZATION = PR #274 / bbe7825579e388a3a9be7dd64b56f2406425d930
P3_R7_IMPLEMENTATION = PR #275 / e3933fdc9932b43b4864a0d608845acbc4ad7f08
P3_R7_QUALIFIED_HEAD = 6d5ddae20f71767523c52378c468757749aa1520
P3_R7_QUALIFIED_TREE = 9481bab0ece031fa8fe7f77a2395247a10e5a463
MERGE_PARENT_1 = bbe7825579e388a3a9be7dd64b56f2406425d930
MERGE_PARENT_2 = 6d5ddae20f71767523c52378c468757749aa1520
MERGE_TREE = 9481bab0ece031fa8fe7f77a2395247a10e5a463
MERGE_VERIFICATION = verified / valid
PRE_MERGE_GOVERNANCE = 33428839717 / SUCCESS
PRE_MERGE_K2 = 33428839711 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
POST_MERGE_GOVERNANCE = 33430224046 / SUCCESS
POST_MERGE_K2 = 33430224234 / classifier + Ubuntu/macOS/Windows + stable gate SUCCESS
SEMANTIC_REVIEW_QUORUM = CodeRabbit + Cubic / exact-head and current-metadata terminal clean
POST_MERGE_PROOF_COMMENT = #275 / 5483365785
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R7 blobs:

```text
packages/kodac-runtime/bench/p3-r7/contracts.ts = 18357e81a3e135b7f407dd0dcc06646c4d079b19
packages/kodac-runtime/bench/p3-r7/context-measurement-report-binding.ts = d4cc9ed3998a08315ed7adaa93f318a77d9076ec
packages/kodac-runtime/test/p3-r7-context-measurement-report-binding.test.ts = 3d156331133ba4bb67fd55b2ce28481b0cdff792
docs/planning/KODAC_P3_R7_CONTEXT_MEASUREMENT_REPORT_BINDING_EVIDENCE_2026-08-31.md = ee6ce38b82a517de4b5d0c71ea46eeb8507736ea
```

## P3-R7 is not a release milestone

P3-R7 provides only a pure deterministic local bridge:

```text
EXACT P3-R1 REQUEST PREIMAGE
+ EXACT CALLER-DECLARED P3-R2 POLICY
+ ONE VALIDATED CONTEXT-SELECTION P2-R1 MANIFEST RECORD / SEVEN METRICS
+ EXACT P3-R6 MEASUREMENT DECLARATION
+ EXACT P3-R7 REPORT DECLARATION
-> CANONICAL P3-R6 MEASUREMENT RECONSTRUCTION
-> EXACTLY SEVEN R6 OBSERVATIONS
-> ONE CANONICAL P2-R2 SINGLE-CASE REPORT
-> FULL SEVEN-SLOT R6-TO-P2 REPORT COVERAGE
-> DISTINCT R6 / P2-R2 OBSERVATION DIGESTS
-> DECLARATION-BOUND REPORT EVIDENCE IDENTITY
```

Therefore:

```text
P3-R7 CLOSED_CANONICAL
!= P3 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL BENCHMARK TASK / PARTICIPANT EXECUTION
!= MULTI-CASE / CASE-INVARIANT STRATEGY IDENTITY
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
!= P3-R8+ AUTHORIZED
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

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. The R7 documentation-only current-view reconciliation is limited to:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

It changes no runtime, evidence-history, workflow, dependency, provider/model, benchmark corpus, persistence, release, or ruleset surface.

## Current implementation boundaries relevant to versioning

```text
K3-R7+ = NOT_AUTHORIZED
KRI-R5+ = NOT_AUTHORIZED
K4-R6+ = NOT_AUTHORIZED
K5-R6+ = NOT_AUTHORIZED
K6-R6+ = NOT_AUTHORIZED
P2-R6+ = NOT_AUTHORIZED
P3-R8+ = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

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
CROSS-REPOSITORY AGGREGATION / LEARNING = NOT_AUTHORIZED BY THIS FILE
AUTOMATIC STRATEGY PROMOTION / TRUST-POLICY MUTATION = NOT_AUTHORIZED BY THIS FILE
AUTOFIX EXECUTION = NOT_AUTHORIZED BY THIS FILE
RULESET CHANGE / BYPASS = NOT_AUTHORIZED BY THIS FILE
K2 EXECUTION-AUTHORITY EXPANSION = NOT_AUTHORIZED BY THIS FILE
DONE GATE / PROVEN_READY MODIFICATION = NOT_AUTHORIZED BY THIS FILE
```

## Next engineering boundary

Only after the R7 current-view reconciliation itself becomes canonical and post-merge proven may later bounded P3 definition/planning/authorization-candidate preparation be considered, if justified by a concrete canonical gap.

No `P3-R8` requirement is inferred from sequence alone.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

Any future slice involving real benchmark execution/corpus mutation, multi-case strategy identity, holdout-sufficiency decisions, statistical acceptance, repository-owned promotion, embeddings, learned reranking, provider/model execution, persistence, product integration, K2/K5/Done Gate changes, or release/public claims must define its exact evidence, trust, authority, allowlist, and non-grant boundary before implementation.

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
- P3-R7 authorization: `docs/planning/KODAC_P3_R7_CONTEXT_MEASUREMENT_REPORT_BINDING_AUTHORIZATION_2026-08-31.md`
- P3-R7 evidence: `docs/planning/KODAC_P3_R7_CONTEXT_MEASUREMENT_REPORT_BINDING_EVIDENCE_2026-08-31.md`
- P3-R7 closeout proof: PR #275 / comment `5483365785`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
