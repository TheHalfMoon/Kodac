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

P3-R1 THROUGH P3-R14 = CLOSED_CANONICAL
P3-R14 = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R15+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

P3-R14 closure is limited to its exact pure deterministic controlled pairwise-comparison evidence boundary over exactly two distinct independently reconstructed canonical P3-R13 records. It requires corresponding controlled plan/task/case/measurement-ground-truth semantics to match, preserves the exact seven canonical reduction and direction semantics, and emits only `COMPARABLE | INSUFFICIENT_EVIDENCE` plus the raw finite `leftReducedValue - rightReducedValue` delta when both sides are finite `REDUCED` values.

Direction metadata is preserved but does not normalize or interpret that raw delta. R14 does not establish a favored side, better/worse relation, tie, aggregate score, ranking/promotion/winner/default, statistical significance, real benchmark execution, public benchmark completion, provider/model/reviewer/evaluator invocation, persistence, product integration, or release authority.

## Canonical P3-R14 authority and implementation

```text
P3_R13_CURRENT_VIEW_RECONCILIATION_PR = #297
P3_R13_CURRENT_VIEW_RECONCILIATION_MERGE = 42da1bcef8bdcb8cfe025355dba8df9021263672

P3_R14_AUTHORIZATION_PR = #298
P3_R14_AUTHORIZATION_BLOB = 5a5f6cd9e2f52bcadc1ee0af0882f3a744487290
P3_R14_AUTHORIZATION_MERGE = fbbbcf13bdb281f0fe4296045ec2e2fa7311acdb
P3_R14_AUTHORIZATION_POST_MERGE_PROOF = #298 / 5500736118

P3_R14_IMPLEMENTATION_PR = #299
P3_R14_QUALIFIED_HEAD = cbb5e1d8b11d15c35479856d8e79fd5dafb4ac9d
P3_R14_QUALIFIED_TREE = 59dc74a3700129a9f34b0453fd8bc6c75362f6ad
P3_R14_QUALIFICATION_PROOF = #299 / 5509427079
P3_R14_SEMANTIC_REVIEW = Cubic 5509354561 + CodeRabbit 3913967177
P3_R14_IMPLEMENTATION_MERGE = 6aa3e35418f95a2e198e3b8431297ab277eec6d3
P3_R14_MERGE_TREE = 59dc74a3700129a9f34b0453fd8bc6c75362f6ad
P3_R14_MERGE_VERIFICATION = verified / valid
P3_R14_POST_MERGE_GOVERNANCE = 33629399450 / SUCCESS
P3_R14_POST_MERGE_PROVENANCE = 100244817246 / SUCCESS
P3_R14_POST_MERGE_LEGACY_TESTS = 100244817077 / SUCCESS
P3_R14_POST_MERGE_K2 = 33629399756 / SUCCESS
P3_R14_POST_MERGE_CLASSIFIER = 100244818046 / SUCCESS
P3_R14_POST_MERGE_WINDOWS = 100244850923 / SUCCESS
P3_R14_POST_MERGE_UBUNTU = 100244850933 / SUCCESS
P3_R14_POST_MERGE_MACOS = 100244851149 / SUCCESS
P3_R14_POST_MERGE_K2_GATE = 100245267248 / SUCCESS
P3_R14_POST_MERGE_PROOF_COMMENT = #299 / 5509458721
P3_R14_RECONCILIATION_BOUNDARY_COMMENT = #299 / 5509463764
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R14 implementation/evidence blobs:

```text
packages/kodac-runtime/bench/p3-r14/contracts.ts
  ef521e99559966cdd66f6c6c5215255aefc4b27b
packages/kodac-runtime/bench/p3-r14/strategy-reduction-pairwise-comparison.ts
  784cb3ccc884fca67411d87be19f30d3cca2cf9a
packages/kodac-runtime/test/p3-r14-strategy-reduction-pairwise-comparison.test.ts
  310ca4ebf1e245fbcfddfd664f66241a4e2f54ac
docs/planning/KODAC_P3_R14_STRATEGY_REDUCTION_PAIRWISE_COMPARISON_EVIDENCE_2026-09-02.md
  e2c366e75c9d248f5a68135210ae475f7b4033f7
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
R14 = deterministic controlled per-dimension comparison of exactly two distinct trusted reconstructed R13 records, emitting only COMPARABLE or INSUFFICIENT_EVIDENCE and raw finite left-minus-right deltas when both reductions are finite REDUCED values
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
DIRECTION BINDING != FAVORED / BETTER / WORSE
RAW LEFT-MINUS-RIGHT DELTA != FAVORED / BETTER / WORSE / TIE
PAIRWISE COMPARISON EVIDENCE != CROSS-DIMENSION AGGREGATE SCORE
PAIRWISE COMPARISON EVIDENCE != MULTI-STRATEGY RANKING / PROMOTION
P3 R1-R14 CLOSED != P3 OVERALL CLOSED
P3 R1-R14 CLOSED != P3-R15+ AUTHORITY
P3 R1-R14 CLOSED != P4 AUTHORITY
```

## Current roadmap/status reconciliation

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof before the next authorized unit. Canonical P3-R14 post-merge proof `#299 / 5509458721` and continuation boundary `#299 / 5509463764` identify this R14 docs-only current-view reconciliation limited to exactly:

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

Only after the R14 current-view reconciliation becomes canonical and post-merge proven may later bounded P3 definition/planning/authorization-candidate preparation be considered, and only if one concrete remaining gap is justified by fresh canonical evidence.

No `P3-R15`, favored/better-worse/tie relation, cross-dimension aggregation, ranking/promotion/winner/default, benchmark execution, P4-P8, release, or project-completion requirement is inferred merely because R14 is closed.

Fresh successor analysis must re-read live `main`, the complete canonical P3-R1 through P3-R14 chain, governing ADRs, review/CI history, the durable improvement plan, and relevant precedent before proposing a falsifiable bounded candidate. If no uniquely supported gap exists, no successor should be invented.

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
P3-R15+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED

PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED
FAVORED / BETTER-WORSE / TIE = NOT_AUTHORIZED
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
