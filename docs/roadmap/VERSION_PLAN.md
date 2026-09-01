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
P3-R1 THROUGH P3-R11 = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R12+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

The P3-R11 closure is an engineering evidence milestone only. It creates no public version, release, package, support, compatibility, benchmark-superiority, production-readiness, or brand authority.

## Canonical P3-R11 anchors

```text
P3_R10_RECONCILIATION = PR #287 / f9636474877c142dc8849094c1856f5b1a92cf6f
P3_R10_RECONCILIATION_POST_MERGE_PROOF = #287 / 5494419703

P3_R11_AUTHORIZATION = PR #288 / cb2362c4e0cdf651b949fe851575a123d77a9d32
P3_R11_AUTHORIZATION_QUALIFIED_HEAD = 75780d9af8df236a319f4624f5dc74c8b5ea353c
P3_R11_AUTHORIZATION_BLOB = 5bddd4deb1bcda9a5fe60a5b5df9c3ccbd4d019a
P3_R11_AUTHORIZATION_POST_MERGE_PROOF = #288 / 5494754462

P3_R11_IMPLEMENTATION = PR #289 / 0842ed7dac95bad879cc55d720ba5646ae021f24
P3_R11_QUALIFIED_HEAD = c9db09e80c27610b5f34afbcaee462bd2d9fb613
P3_R11_MERGE_TREE = 57725483a8517fc61710016849a524c0ac79fdba
P3_R11_MERGE_VERIFICATION = verified / valid
P3_R11_SEMANTIC_REVIEW = Cubic 5495078519 + CodeRabbit 5495098393
P3_R11_QUALIFICATION_PROOF = #289 / 5495132359
P3_R11_POST_MERGE_GOVERNANCE = 33516950190 / SUCCESS
P3_R11_POST_MERGE_PROVENANCE = 99886253718 / SUCCESS
P3_R11_POST_MERGE_LEGACY_TESTS = 99886254131 / SUCCESS
P3_R11_POST_MERGE_K2 = 33516950175 / SUCCESS
P3_R11_POST_MERGE_UBUNTU = 99886306919 / SUCCESS
P3_R11_POST_MERGE_WINDOWS = 99886306894 / SUCCESS
P3_R11_POST_MERGE_MACOS = 99886306868 / SUCCESS
P3_R11_POST_MERGE_K2_GATE = 99890072448 / SUCCESS
P3_R11_POST_MERGE_PROOF_COMMENT = #289 / 5495387091
P3_R11_RECONCILIATION_BOUNDARY_COMMENT = #289 / 5495390306
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R11 blobs:

```text
packages/kodac-runtime/bench/p3-r11/contracts.ts = 7e12f871095eaec6855f606aa1e360adcc48f8c7
packages/kodac-runtime/bench/p3-r11/single-strategy-two-case-reduction-policy-binding.ts = f2ecbefb9638aa6867a388b827d75dbdba6b1cc6
packages/kodac-runtime/test/p3-r11-single-strategy-two-case-reduction-policy-binding.test.ts = 91c0c459e8acab4a64f213e474394a27bdb0c676
docs/planning/KODAC_P3_R11_TWO_CASE_REDUCTION_POLICY_BINDING_EVIDENCE_2026-09-01.md = a47b31c44a1504dba0cac42f73d6dab5136ddfcb
```

Historical P3-R8 K2 run `33439529693` remains failed evidence and is not relabeled by later recovery.

## P3-R11 is not a release milestone

P3-R11 provides only a pure deterministic local reduction-policy binding boundary:

```text
ONE EXACT CANONICAL P3-R10 ALIGNED TWO-MEMBER PAIR
+ INDEPENDENT CANONICAL P3-R7 RECONSTRUCTION FOR MEMBER A/B
+ ONE EXPLICIT SEVEN-DIMENSION P2-R3-COMPATIBLE PAIR POLICY
-> SHARED BENCHMARK / PROTOCOL PROOF
-> EXACT metricId / unit POLICY BINDING
-> EXPLICIT NUMBER | BOOLEAN VALUE KIND
-> EXPLICIT ARITHMETIC_MEAN | BOOLEAN_TRUE_RATE FUTURE REDUCER
-> EXPLICIT REQUIRE_COMPLETE | OBSERVED_ONLY_WITH_COVERAGE POLICY
-> VALIDATE BOTH TRUSTED OBSERVATIONS
-> ONE DETERMINISTIC POLICY-BINDING EVIDENCE IDENTITY
-> NO REDUCER EXECUTION
```

Therefore:

```text
P3-R11 CLOSED_CANONICAL
!= P3 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL BENCHMARK TASK / PARTICIPANT EXECUTION
!= REDUCER EXECUTION / MEAN / TRUE-RATE
!= REDUCED / INSUFFICIENT_EVIDENCE SUMMARY RESULT
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
!= P3-R12+ AUTHORIZED
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

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. Canonical P3-R11 post-merge proof `#289 / 5495387091` plus continuation boundary `#289 / 5495390306` permit the R11 documentation-only current-view reconciliation limited to:

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
P3-R12+ = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

REDUCER EXECUTION / MEAN / TRUE-RATE = NOT_AUTHORIZED BY THIS FILE
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

Only after the R11 current-view reconciliation becomes canonical and post-merge proven may later bounded P3 definition/planning/authorization-candidate preparation be considered, if justified by a concrete canonical gap.

No `P3-R12` requirement is inferred from sequence alone. Internal canonical evidence may support investigating bounded two-case reduction evidence that reuses P2-R3 semantics, but that hypothesis creates no authority. Comparison/direction semantics remain separate.

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
- P3-R11 authorization: `docs/planning/KODAC_P3_R11_TWO_CASE_REDUCTION_POLICY_BINDING_AUTHORIZATION_2026-09-01.md`
- P3-R11 evidence: `docs/planning/KODAC_P3_R11_TWO_CASE_REDUCTION_POLICY_BINDING_EVIDENCE_2026-09-01.md`
- P3-R11 post-merge proof: PR #289 / comment `5495387091`
- Reconciliation continuation boundary: PR #289 / comment `5495390306`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
