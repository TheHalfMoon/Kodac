# Kodac Version Plan

## Purpose

Kodac engineering milestones and public product versions are separate governance tracks.

This file records the current engineering/version boundary. It does not authorize implementation, package publication, release, brand launch, provider/model access, persistence, learning, benchmark execution, donor intake, successor work or side effects.

Always read live GitHub truth, root `AGENTS.md`, `docs/roadmap/NEXT.md`, governing ADRs and the exact active authorization before acting.

## Current engineering state

```text
K0/K1 = CLOSED
K2 = CLOSED
K3 = CLOSED FOR CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
KRI-R1 THROUGH KRI-R4 = CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K4 = CLOSED FOR CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K5 = CLOSED FOR CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K6 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
P2-R1 THROUGH P2-R6 = CLOSED_CANONICAL
P2-R6 = CLOSED_CANONICAL
P2-R6 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R7+ IMPLEMENTATION = NOT_AUTHORIZED BY NUMBERING
P3-R1 THROUGH P3-R17 = CLOSED_CANONICAL INDIVIDUALLY
P3 BOUNDED R1-R17 ENGINEERING SCOPE = CLOSED_CANONICAL
P3 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R18+ IMPLEMENTATION = NOT_AUTHORIZED
TRUST_AND_VERIFICATION_MASTER_PLAN_V2_AMENDMENT = CLOSED_CANONICAL / PLANNING_DIRECTION_ONLY
TRUST_V2_POST_ADOPTION_CURRENT_VIEW_RECONCILIATION_AUTHORIZATION = CLOSED_CANONICAL
TRUST_V2_POST_ADOPTION_CURRENT_VIEW_RECONCILIATION = CURRENT FIVE-PATH CANDIDATE / NOT CANONICAL UNTIL QUALIFIED + MERGED + POST-PROVEN
P4-P9 FUTURE PLANNING DEPENDENCY MAP = CANONICALLY ADOPTED PLANNING DIRECTION
P4-P9 IMPLEMENTATION AUTHORITY = NONE
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

## Canonical closeout, planning, and reconciliation anchors

```text
P3_R17_RECONCILIATION = PR #311 / b1ab1a16067e7d8a2bc720ccba475c6556d0525c / proof 5527606835
P3_R1_R17_CLOSEOUT_ANALYSIS = #311 / 5527641999
P3_R1_R17_CLOSEOUT_AUTHORIZATION = PR #312 / 7686adfd4cf5a21a2c658e6c211d9c0509b730c8 / proof 5528344277
P3_R1_R17_CLOSEOUT = PR #313 / 3772003d026488ab274883934d4a14a8e47a4185 / proof 5530355917
P3_POST_CLOSEOUT_RECONCILIATION_ANALYSIS = #313 / 5530383125
P3_POST_CLOSEOUT_RECONCILIATION_AUTHORIZATION = PR #314 / bbe5ef4f7046a5775519d62cf1e969e96cb05dee / proof 5530633976
P3_POST_CLOSEOUT_RECONCILIATION = PR #315 / 416067c72aa7702a48932ca86de2260a3c8ce973 / proof 5530804202
P2_R6_SUCCESSOR_ANALYSIS = #315 / 5530859993
P2_R6_AUTHORIZATION = PR #316 / dce5fece4ec71c58832960c5515a918d7d4c19d8 / proof 5531882213
P2_R6_IMPLEMENTATION = PR #317 / 815c7358086980dd47ef31e7014bbbeb60bc9df5 / proof 5532712515
P2_R6_POST_CLOSEOUT_RECONCILIATION_ANALYSIS = #317 / 5532731426
P2_R6_POST_CLOSEOUT_RECONCILIATION_AUTHORIZATION = PR #318 / 5a30f96948d0d3979842cb75c1fcbfec1b3176b4 / proof 5533032179
P2_R6_POST_CLOSEOUT_CURRENT_VIEW_RECONCILIATION = PR #319 / 2c5b8d747bdd0b8bceefb2261c8513bc16e1ec2d / proof 5538190559
TRUST_VERIFICATION_V2_AMENDMENT = PR #320 / f806a82e12302fe4925c022b5f9332e6f883541e / proof 5538367862 / CLOSED_CANONICAL / PLANNING_DIRECTION_ONLY
TRUST_VERIFICATION_V2_SUCCESSOR_ANALYSIS = PR #320 / 5538383110
TRUST_V2_POST_ADOPTION_RECONCILIATION_AUTHORIZATION = PR #321 / e7dcca4900962fc360fd04f4e12ca3274607193f / proof 5538855020
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The canonical P3 R1-R17 bounded closeout and its #315 current-view reconciliation change engineering/governance status only. They do not create a public version, package, release channel, production-readiness promise, support/compatibility promise, benchmark-superiority claim or brand authority.

The canonical P2-R6 result and #319 current-view reconciliation are likewise bounded engineering/evidence and status results. They do not close P2 overall or general/public KodacBench.

The canonical Trust and Verification Master Plan v2 amendment supplements the historical 2026-08-26 master plan and adopts a future P4-P9 planning dependency map. It is planning direction only and grants no implementation or version authority.

## Bounded engineering closeout is not a release milestone

The canonical results:

```text
P2-R1 THROUGH P2-R6 = CLOSED_CANONICAL
P2-R6 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 BOUNDED R1-R17 ENGINEERING SCOPE = CLOSED_CANONICAL
TRUST_AND_VERIFICATION_MASTER_PLAN_V2_AMENDMENT = CLOSED_CANONICAL / PLANNING_DIRECTION_ONLY
```

still mean:

```text
!= P2 OVERALL CLOSED
!= P3 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL BENCHMARK TASK / PARTICIPANT EXECUTION AUTHORIZED
!= SUFFICIENT / REPRESENTATIVE HOLDOUT
!= UNBIASED / UNCONTAMINATED / STATISTICALLY VALID
!= GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR VERDICT
!= CROSS-DIMENSION SUM / MEAN / WEIGHTED SCORE / MAJORITY / PARETO POLICY
!= STATISTICAL SIGNIFICANCE / CONFIDENCE / EQUIVALENCE
!= MULTI-STRATEGY RANKING / PROMOTION
!= REPOSITORY-OWNED DEFAULT / WINNER
!= REAL PROVIDER / MODEL EXECUTION
!= PRODUCT INTEGRATION COMPLETE
!= PUBLIC RELEASE READY
!= PACKAGE PUBLISHABLE
!= PUBLIC VERSION DECLARED
!= PRODUCTION READY
!= SUPPORT SLA ESTABLISHED
!= COMPATIBILITY PROMISE ESTABLISHED
!= BRAND LAUNCH AUTHORIZED
!= P2-R7+ AUTHORIZED BY NUMBERING
!= P3-R18+ AUTHORIZED
!= P4-P9 IMPLEMENTATION AUTHORIZED
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

Version numbering, release channels, package publication, installation/upgrade promises, compatibility guarantees, support expectations, security claims, benchmark claims, quality claims and brand decisions require separate evidence and explicit authority.

## Exact current reconciliation scope

Canonical PR #321 post-merge proof `5538855020` authorizes exactly:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path belongs to this unit. No runtime, workflow, dependency, donor, provider/model, benchmark corpus/result, persistence, release or ruleset path may change.

The reconciliation candidate is not canonical until one frozen exact head proves exact five-path containment, `behind_by=0`, frozen five-blob identity, applicable CI/canonical non-applicability, two independent substantive terminal-clean semantic review channels, zero actionable findings/threads, guarded normal merge with exact expected head and complete post-merge proof.

## Adopted future planning dependency map

The following map comes from the canonical Trust and Verification Master Plan v2 amendment and is navigation only:

```text
P2  KodacBench 2.0
P3  Context Engine v2
P4  Reviewer Intelligence v2
P5  Proof and Verification Fabric
P6  Security, Supply-Chain, and Attack Validation
P7  Bounded Remediation
P8  Agent Trust Gateway and Developer Distribution
P9  Continuous Assurance
R   Advanced Research
```

```text
P4-P9 FUTURE PLANNING DEPENDENCY MAP = CANONICALLY ADOPTED PLANNING DIRECTION
P4-P9 IMPLEMENTATION AUTHORITY = NONE
```

No stage, provider, dependency, runtime, side effect, release, or successor becomes authorized merely because it appears in this map.

## Current implementation boundaries relevant to versioning

```text
K3-R7+ = NOT_AUTHORIZED
KRI-R5+ = NOT_AUTHORIZED
K4-R6+ = NOT_AUTHORIZED
K5-R6+ = NOT_AUTHORIZED
K6-R6+ = NOT_AUTHORIZED
P2-R7+ = NOT_AUTHORIZED BY NUMBERING
P3-R18+ = NOT_AUTHORIZED
P4-P9 IMPLEMENTATION = NOT_AUTHORIZED

THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED
GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR VERDICT = NOT_AUTHORIZED
CROSS-DIMENSION AGGREGATE SCORE / WEIGHTING / MAJORITY / PARETO POLICY = NOT_AUTHORIZED
MULTI-STRATEGY RANKING / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
PRODUCT / BENCHMARK / RUNTIME PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT_AUTHORIZED
EXTERNAL GOVERNANCE REVIEW REQUIRED ONLY FOR QUALIFICATION EVIDENCE = AUTHORIZED; IT DOES NOT AUTHORIZE PRODUCT / BENCHMARK / RUNTIME INVOCATION
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE / RESULT MUTATION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
CLI / API / PRODUCT INTEGRATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
DONE GATE / PROVEN_READY MODIFICATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

## Next engineering boundary

Only after the current Trust v2 post-adoption five-current-view reconciliation becomes canonical and post-merge proven may fresh evidence-driven successor analysis consider another unit. Sequence alone creates no P2-R7, P3-R18, P4-P9 implementation, benchmark execution, provider/model invocation, remediation, product integration, release or project-completion authority.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
PLANNING DIRECTION != IMPLEMENTATION AUTHORITY
```

## Navigation

- Current action: `docs/roadmap/NEXT.md`
- P3 post-closeout reconciliation proof: PR #315 / comment `5530804202`
- P2-R6 successor analysis: PR #315 / comment `5530859993`
- P2-R6 authorization: `docs/planning/KODAC_P2_R6_REPOSITORY_HISTORY_CORPUS_ADMISSION_AUTHORIZATION_2026-09-03.md`
- P2-R6 implementation post-merge proof: PR #317 / comment `5532712515`
- P2-R6 post-closeout current-view reconciliation proof: PR #319 / comment `5538190559`
- Trust and Verification v2 amendment: `docs/planning/KODAC_TRUST_AND_VERIFICATION_MASTER_PLAN_V2_AMENDMENT_2026-09-02.md`
- Trust and Verification v2 amendment post-merge proof: PR #320 / comment `5538367862`
- Trust v2 current-view reconciliation authorization: `docs/planning/KODAC_TRUST_VERIFICATION_V2_POST_ADOPTION_CURRENT_VIEW_RECONCILIATION_AUTHORIZATION_2026-09-04.md`
- Trust v2 current-view reconciliation authorization post-merge proof: PR #321 / comment `5538855020`
- Durable improvement sequence: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Benchmark governance: `docs/adr/ADR-0010-benchmark-first-donor-selection.md`