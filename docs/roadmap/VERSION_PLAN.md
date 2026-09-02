# Kodac Version Plan

## Purpose

Kodac engineering milestones and public product versions are separate governance tracks.

This file records the current engineering/version boundary. It does not authorize implementation, package publication, release, brand launch, provider/model access, persistence, learning, benchmark execution, donor intake, successor work, or side effects.

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
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ = NOT_AUTHORIZED
P3-R1 THROUGH P3-R16 = CLOSED_CANONICAL
P3-R16 = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R17+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The P3-R16 closure is an engineering evidence milestone only. It creates no public version, release, package, support, compatibility, benchmark-superiority, production-readiness, or brand authority.

## Canonical P3-R16 anchors

```text
P3_R15_CURRENT_VIEW_RECONCILIATION = PR #304 / f6270d62ffcd06cbf780e24d37173d0d575665fe
P3_R15_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #304 / 5514505520
P3_R16_SUCCESSOR_ANALYSIS = #304 / 5514563852

P3_R16_AUTHORIZATION = PR #305 / da59d2a46d4eff5c12a60f2057a57d3572ba0e5d
P3_R16_AUTHORIZATION_BLOB = 3a931f3c1d733d5540954784d7fb414981c4a8b1
P3_R16_AUTHORIZATION_POST_MERGE_PROOF = #305 / 5514986947

P3_R16_IMPLEMENTATION = PR #307 / 0fb9f47db144619c580c69052aa98d79c4f71dc6
P3_R16_QUALIFIED_HEAD = 390f0dd5b26445aa710e37573152e637230fe129
P3_R16_QUALIFIED_TREE = 33420ca4cb95721bb08903fb0e30ef4d0312c45c
P3_R16_MERGE_TREE = 33420ca4cb95721bb08903fb0e30ef4d0312c45c
P3_R16_MERGE_VERIFICATION = verified / valid
P3_R16_SEMANTIC_REVIEW = CodeRabbit 5517148710 + Cubic 5517242418
P3_R16_UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
P3_R16_POST_MERGE_GOVERNANCE = 33690090072 / SUCCESS
P3_R16_POST_MERGE_PROVENANCE = 100446602052 / SUCCESS
P3_R16_POST_MERGE_LEGACY_TESTS = 100446601874 / SUCCESS
P3_R16_POST_MERGE_K2 = 33690090070 / SUCCESS
P3_R16_POST_MERGE_CLASSIFIER = 100446601906 / SUCCESS
P3_R16_POST_MERGE_UBUNTU = 100446638831 / SUCCESS
P3_R16_POST_MERGE_MACOS = 100446638872 / SUCCESS
P3_R16_POST_MERGE_WINDOWS = 100446638917 / SUCCESS
P3_R16_POST_MERGE_K2_GATE = 100447140433 / SUCCESS
P3_R16_POST_MERGE_PROOF_COMMENT = #307 / 5517289297
P3_R16_RECONCILIATION_BOUNDARY_COMMENT = #307 / 5517293280
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical R16 blobs:

```text
packages/kodac-runtime/bench/p3-r16/contracts.ts = ab5918caec73d2e6688d982c2774479b916e50b9
packages/kodac-runtime/bench/p3-r16/declared-directional-relation-criterion-match.ts = 47e46dac9f16824d0368218cf1c0b64c2971628d
packages/kodac-runtime/test/p3-r16-declared-directional-relation-criterion-match.test.ts = edcff3f6192b7b8389b6dfabad2c15f3e878d1c6
docs/planning/KODAC_P3_R16_DECLARED_DIRECTIONAL_RELATION_CRITERION_MATCH_EVIDENCE_2026-09-02.md = 15ea09e6db3e0c0734979544bc0e71a621c3916a
```

## P3-R16 is not a release milestone

P3-R16 provides only a pure deterministic caller-declared relation-criterion evidence boundary:

```text
EXACTLY THE THREE CANONICAL P3-R14 CALLER ROOTS
+ ONE SEPARATELY CANONICALIZED CALLER-OWNED R16 CRITERION DECLARATION
-> CANONICAL R15 AS THE SOLE TRUSTED DIRECTIONAL-RELATION EVIDENCE
-> COMPLETE TRUSTED R15 EVIDENCE PRESERVED
-> EXACT SEVEN CANONICAL DIMENSIONS PRESERVED
-> ALLOWED RELATIONS ARE EXPLICIT / CLOSED / NON-EMPTY / DUPLICATE-FREE / PRE-ORDERED
-> ONE CRITERION STATE PER DIMENSION:
   SATISFIED
   NOT_SATISFIED
   INSUFFICIENT_EVIDENCE
-> ONE CLOSED LOGICAL ROOT STATE WITH INSUFFICIENCY THEN NOT-SATISFIED PRECEDENCE
-> DETERMINISTIC SELF-REFERENCE-FREE IDENTITY
-> DETACHED / DEEPLY FROZEN OUTPUT
-> NO NUMERIC AGGREGATE / SCORE / WEIGHTING / MAJORITY / PARETO
-> NO GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR
-> NO RANK / PROMOTION / WINNER / DEFAULT
-> NO STATISTICAL OR PROVENANCE QUALIFICATION
```

Therefore:

```text
P3-R16 CLOSED_CANONICAL
!= P3 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL BENCHMARK TASK / PARTICIPANT EXECUTION
!= THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION
!= THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON
!= GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR VERDICT
!= CROSS-DIMENSION SUM / MEAN / WEIGHTED SCORE / MAJORITY / PARETO POLICY
!= STATISTICAL SIGNIFICANCE / CONFIDENCE / EQUIVALENCE
!= PROVENANCE / HOLDOUT / CONTAMINATION QUALIFICATION
!= MULTI-STRATEGY RANKING / PROMOTION
!= REPOSITORY-OWNED GOLD TRUTH
!= REPOSITORY-OWNED DEFAULT CONTEXT POLICY
!= WINNING / SUPERIOR CONTEXT STRATEGY PROVEN
!= REAL PROVIDER / MODEL EXECUTION
!= PRODUCT INTEGRATION COMPLETE
!= PUBLIC RELEASE READY
!= PACKAGE PUBLISHABLE
!= PUBLIC VERSION DECLARED
!= PRODUCTION READY
!= SUPPORT SLA ESTABLISHED
!= COMPATIBILITY PROMISE ESTABLISHED
!= BRAND LAUNCH AUTHORIZED
!= P3-R17+ AUTHORIZED
!= P4 AUTHORIZED
!= PROJECT COMPLETE
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

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. Canonical P3-R16 post-merge proof `#307 / 5517289297`, the established canonical reconciliation procedure proven by PR #304, and continuation boundary `#307 / 5517293280` identify the R16 documentation-only current-view reconciliation limited to:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

It changes no runtime, historical authorization/evidence, workflow, dependency, donor code, provider/model, benchmark corpus, persistence, release, or ruleset surface. It is a candidate until exact-head qualification, two independent substantive semantic terminal-clean review channels, zero actionable findings/threads, guarded normal merge with exact expected head, and complete post-merge proof.

## Current implementation boundaries relevant to versioning

```text
K3-R7+ = NOT_AUTHORIZED
KRI-R5+ = NOT_AUTHORIZED
K4-R6+ = NOT_AUTHORIZED
K5-R6+ = NOT_AUTHORIZED
K6-R6+ = NOT_AUTHORIZED
P2-R6+ = NOT_AUTHORIZED
P3-R17+ = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

P3-R16 CALLER-DECLARED DIRECTIONAL-RELATION CRITERION-MATCH EVIDENCE = CLOSED_CANONICAL WITHIN ITS EXACT CONTRACT
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED BY THIS FILE
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED BY THIS FILE
GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR VERDICT = NOT_AUTHORIZED BY THIS FILE
CROSS-DIMENSION AGGREGATE SCORE / WEIGHTING / MAJORITY / PARETO POLICY = NOT_AUTHORIZED BY THIS FILE
MULTI-STRATEGY RANKING / PROMOTION = NOT_AUTHORIZED BY THIS FILE
REPOSITORY-OWNED DEFAULT / WINNER = NOT_AUTHORIZED BY THIS FILE
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED BY THIS FILE
PROVENANCE / CHRONOLOGY / CONTAMINATION QUALIFICATION = NOT_AUTHORIZED BY THIS FILE
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
PROJECT COMPLETION = NOT_ESTABLISHED BY THIS FILE
```

## Next engineering boundary

Only after the R16 current-view reconciliation becomes canonical and post-merge proven may later bounded P3 definition/planning/authorization-candidate preparation be considered, and only if a concrete canonical gap is proven.

No `P3-R17`, aggregate, ranking, promotion, default, statistical policy, benchmark execution, P4-P8, public release, or project-completion authority is inferred from sequence or R16 closure.

Fresh successor analysis must re-read live `main`, the complete canonical P3-R1 through P3-R16 chain, governing ADRs, review/CI history, the durable improvement plan, and relevant precedent before identifying one falsifiable bounded candidate.

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
- P3-R16 authorization: `docs/planning/KODAC_P3_R16_DECLARED_DIRECTIONAL_RELATION_CRITERION_MATCH_AUTHORIZATION_2026-09-02.md`
- P3-R16 evidence: `docs/planning/KODAC_P3_R16_DECLARED_DIRECTIONAL_RELATION_CRITERION_MATCH_EVIDENCE_2026-09-02.md`
- P3-R16 authorization post-merge proof: PR #305 / comment `5514986947`
- P3-R16 implementation post-merge proof: PR #307 / comment `5517289297`
- Reconciliation continuation boundary: PR #307 / comment `5517293280`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`
