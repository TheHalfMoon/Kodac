# Product Document Authority Status

The pre-existing files in `docs/product/` remain preserved historical planning inputs. They do not override accepted Kodac ADRs, live GitHub truth, root `AGENTS.md`, current roadmap views, or exact canonical authorization/evidence records.

## Canonical engineering state

```text
K3 = CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
K4 = CLOSED FOR THE CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K5 = CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K6 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL

P2-R1 THROUGH P2-R5 = CLOSED_CANONICAL
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ = NOT_AUTHORIZED

P3-R1 THROUGH P3-R13 = CLOSED_CANONICAL
P3-R13 = CLOSED_CANONICAL
P3 OVERALL = OPEN
PAIRWISE STRATEGY COMPARISON = NOT_AUTHORIZED
P3-R14+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

P3-R13 closure is limited to its exact pure deterministic explicit per-dimension direction-binding boundary. It reconstructs canonical P3-R12 from original predecessor preimages, requires exactly seven caller-declared `HIGHER_IS_BETTER | LOWER_IS_BETTER` directions cross-bound to trusted R12 semantics, preserves the complete R12 evidence record, and emits deterministic deeply frozen direction-binding evidence.

It does not establish a raw delta, favored side, better/worse relation, pairwise strategy comparison, cross-dimension aggregate, ranking/promotion/winner, real benchmark execution, public benchmark completion, provider/model/reviewer/evaluator invocation, persistence, product integration, or release authority.

## Canonical P3-R13 authority and implementation

```text
P3_R12_CURRENT_VIEW_RECONCILIATION_PR = #294
P3_R12_CURRENT_VIEW_RECONCILIATION_MERGE = ad0c3e1236c546c005c7f688f991ecbc9ed64fa5
P3_R12_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #294 / 5498358794

P3_R13_AUTHORIZATION_PR = #295
P3_R13_AUTHORIZATION_BLOB = bc6b039cab6dbc3a570cedafe2b8f226634aa767
P3_R13_AUTHORIZATION_MERGE = 2a67a91c6d5eef829872823f5fa6441f7a644d67
P3_R13_AUTHORIZATION_POST_MERGE_PROOF = #295 / 5498626758

P3_R13_IMPLEMENTATION_PR = #296
P3_R13_QUALIFIED_HEAD = 74d07c3ad64fb5b9d7a2dd17e357260a7120489b
P3_R13_QUALIFIED_TREE = db206d23e70cb1dda9daeda37922264ce2dfd5bf
P3_R13_QUALIFICATION_PROOF = #296 / 5499762716
P3_R13_SEMANTIC_REVIEW = CodeRabbit 5499263271 + Cubic 5499299358
P3_R13_IMPLEMENTATION_MERGE = 931c750681494895da046f4ba9c8406d77fcfddf
P3_R13_MERGE_TREE = db206d23e70cb1dda9daeda37922264ce2dfd5bf
P3_R13_MERGE_VERIFICATION = verified / valid
P3_R13_POST_MERGE_GOVERNANCE = 33553663264 / SUCCESS
P3_R13_POST_MERGE_PROVENANCE = 100009119493 / SUCCESS
P3_R13_POST_MERGE_LEGACY_TESTS = 100009119739 / SUCCESS
P3_R13_POST_MERGE_K2 = 33553663263 / SUCCESS
P3_R13_POST_MERGE_CLASSIFIER = 100009119554 / SUCCESS
P3_R13_POST_MERGE_WINDOWS = 100009155408 / SUCCESS
P3_R13_POST_MERGE_UBUNTU = 100009155427 / SUCCESS
P3_R13_POST_MERGE_MACOS = 100009155455 / SUCCESS
P3_R13_POST_MERGE_K2_GATE = 100009519605 / SUCCESS
P3_R13_POST_MERGE_PROOF_COMMENT = #296 / 5499792485
P3_R13_RECONCILIATION_BOUNDARY_COMMENT = #296 / 5499834265
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R13 implementation/evidence blobs:

```text
packages/kodac-runtime/bench/p3-r13/contracts.ts
  d712d90c734ce946c7e91f15da074adfa63e338a
packages/kodac-runtime/bench/p3-r13/reduction-direction-binding.ts
  0b752c5e8d47056004a0ca0aaad15c871dd089c9
packages/kodac-runtime/test/p3-r13-reduction-direction-binding.test.ts
  2b49db209341e8fb3923fdb8319da7174bbb543a
docs/planning/KODAC_P3_R13_REDUCTION_DIRECTION_BINDING_EVIDENCE_2026-09-01.md
  5cd4b59b9c2cabe00806388358acb6be286c9883
```

Historical failures remain part of the historical record and are never erased or relabeled by later canonical recovery.

## Canonical P3 bounded meaning

```text
R1  = deterministic context-selection-plan foundation
R2  = deterministic caller-declared policy application
R3  = pairwise seven-metric evidence binding and comparability-only state
R4  = literal benchmark-provenance evidence binding
R5  = caller-declared criterion-match evidence
R6  = deterministic seven-dimension measurement materialization from one reconstructed policy application plus explicit caller evaluation facts
R7  = deterministic binding of one reconstructed R6 measurement to one fully covered single-case P2-R2 report
R8  = deterministic case-invariant strategy-subject identity plus exact single-case binding to canonical P3-R1/P3-R2 identities
R9  = deterministic ordered composition of exactly two independently reconstructed R7 reports under one exact R8 strategy subject
R10 = deterministic proof that those two R9 members use identical metricId/unit schemas across all seven canonical P3-R6 dimensions while preserving both observations without reduction
R11 = deterministic binding of exactly seven explicit P2-R3-compatible reduction policies to that exact aligned pair, with no reducer execution
R12 = deterministic application of the exact bound policies to the exact two trusted observations, emitting only per-dimension REDUCED or INSUFFICIENT_EVIDENCE reduction evidence
R13 = deterministic binding of exactly seven explicit HIGHER_IS_BETTER | LOWER_IS_BETTER direction values to the exact reconstructed R12 semantics while preserving the complete trusted R12 evidence
```

These compose only as evidence mechanisms:

```text
DETERMINISTIC PLAN != BETTER CONTEXT STRATEGY
CALLER POLICY != REPOSITORY POLICY
PAIRWISE METRIC EVIDENCE != GLOBAL WINNER
LITERAL PROVENANCE != HOLDOUT SUFFICIENCY
CALLER-DECLARED CRITERIA MATCH != REPOSITORY WINNER / DEFAULT / PROMOTION
CALLER GOLD / UTILIZATION FACTS != REPOSITORY TRUTH
MEASUREMENT MATERIALIZATION != BENCHMARK PARTICIPANT EXECUTION
SINGLE-CASE REPORT BINDING != MULTI-CASE SCORE AGGREGATION
CASE-INVARIANT STRATEGY SUBJECT != REPOSITORY WINNER / DEFAULT / PROMOTION
EXACTLY-TWO-CASE COMPOSITION != ARBITRARY-N COLLECTION
METRIC ALIGNMENT EVIDENCE != REDUCTION
REDUCTION-POLICY BINDING != REDUCER EXECUTION
PER-DIMENSION REDUCTION EVIDENCE != CROSS-DIMENSION AGGREGATE SCORE
DIRECTION BINDING != RAW DELTA
DIRECTION BINDING != PAIRWISE STRATEGY COMPARISON
DIRECTION BINDING != FAVORED / BETTER / WORSE VERDICT
P3 R1-R13 CLOSED != P3 OVERALL CLOSED
P3 R1-R13 CLOSED != P3-R14+ AUTHORITY
P3 R1-R13 CLOSED != P4 AUTHORITY
```

## Current roadmap/status reconciliation

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof before the next authorized unit. Canonical P3-R13 post-merge proof `#296 / 5499792485` and continuation boundary `#296 / 5499834265` identify this R13 docs-only current-view reconciliation limited to exactly:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path belongs to this unit. It does not modify runtime source/tests, historical authorization/evidence, workflows, dependencies, benchmark corpora/manifests/fixtures, donor code, provider/model configuration, persistence, release configuration, or rulesets.

The current-view reconciliation itself becomes canonical only after one frozen exact head proves exact five-path containment, `behind_by=0`, applicable CI, two independent substantive semantic terminal-clean review channels, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact expected head, and complete post-merge proof.

## Next engineering boundary after reconciliation

Only after the R13 current-view reconciliation becomes canonical and post-merge proven may later bounded P3 definition/planning/authorization-candidate preparation be considered, if a concrete remaining gap is justified by canonical evidence.

No `P3-R14` or pairwise strategy comparison requirement is inferred merely because R13 is closed. P3-R13 deliberately stops at explicit direction metadata for one reconstructed reduction record. A bounded pairwise-comparison-evidence hypothesis may be investigated later against canonical P2-R4/P2-R5 semantics, but it grants nothing.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

## Repository visibility and product authority

```text
PUBLIC GITHUB REPOSITORY = YES
PUBLIC RELEASE VERSION = NOT_AUTHORIZED
PACKAGE PUBLICATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
PRODUCTION READINESS CLAIM = NOT_AUTHORIZED
PUBLIC BENCHMARK / SUPERIORITY CLAIM = NOT_AUTHORIZED
BRAND LAUNCH = NOT_AUTHORIZED
```

## Preserved non-grants

```text
KRI-R5+ IMPLEMENTATION = NOT_AUTHORIZED
K3-R7+ = NOT_AUTHORIZED
K4-R6+ = NOT_AUTHORIZED
K5-R6+ = NOT_AUTHORIZED
K6-R6+ = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R14+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED
RAW DELTA / FAVORED / BETTER-WORSE = NOT_AUTHORIZED
PAIRWISE STRATEGY COMPARISON = NOT_AUTHORIZED
CROSS-DIMENSION AGGREGATE SCORE = NOT_AUTHORIZED
MULTI-STRATEGY COMPARISON / RANKING / LEADERBOARD / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
DONOR REPLACEMENT / PROMOTION = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
PERSISTENCE / DATABASE / BENCHMARK FILE OUTPUT = NOT_AUTHORIZED
TELEMETRY / UPLOAD / ANALYTICS EGRESS = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
CROSS-REPOSITORY AGGREGATION / LEARNING = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Engineering milestone status remains separate from public release, package publication, production readiness, support, compatibility, security claims, benchmark claims, quality claims, and brand launch.
