# Product Document Authority Status

The pre-existing files in `docs/product/` are preserved **Kernux-era historical planning inputs**.

They remain in the repository for historical integrity and research context, but they are not current Kodac product authority and do not override accepted Kodac ADRs, current Kodac planning/closeout records, the README current architecture summary, or reconstituted `docs/roadmap/*`.

This status notice does not delete, rewrite, validate, or re-adopt those historical product documents. Future Kodac product-document reconstitution requires a separate founder-reviewed gate.

## Canonical closed milestones

K3, K4, K5, the bounded K6 R1-R5 milestone, P2-R1, and P2-R2 are canonically closed for their exact scopes.

```text
K3 = CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
K3-R7+ = NOT REQUIRED FOR K3 CLOSEOUT / NOT AUTHORIZED

K4 = CLOSED FOR THE CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K4-R6+ = NOT REQUIRED FOR K4 CLOSEOUT / NOT AUTHORIZED

K5 = CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K5-R6+ = NOT REQUIRED FOR K5 CLOSEOUT / NOT AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED

K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = CLOSED_CANONICAL
K6-R5 = CLOSED_CANONICAL
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE
K6-R6+ = NOT REQUIRED FOR THIS BOUNDED CLOSEOUT / NOT AUTHORIZED

P2-R1 = CLOSED_CANONICAL
P2-R2 = CLOSED_CANONICAL
P2-R3 = AUTHORIZATION CANDIDATE
P2-R4+ = NOT AUTHORIZED
P2 = OPEN
```

## Canonical P2 anchors

```text
P2-R1 authorization = PR #237 / 1cd2fc4de1eb5849cbe2519ae1699bc2acc56397
P2-R1 implementation = PR #238 / c499c8ac098cca9719eaad3cacadd2af7d1c0a1f
P2-R2 authorization = PR #239 / f2b8d452e93ec207ebe04c9db7d47dc032df20de
P2-R2 implementation = PR #240 / 4a0b2c67dbd707c18395b0898752c111ca6b16a9
```

P2-R1 closure established the deterministic canonical benchmark contract plus frozen development/holdout fixture and manifest spine. It did not authorize external execution, evaluator semantics, aggregation, ranking, product integration, persistence, telemetry, learning, release, or superiority claims.

P2-R2 closure established the pure in-memory caller-observation runner and immutable report spine. Its immutable proof binds:

```text
QUALIFIED_HEAD = 46f455c21e294d92d2976d4398a26ffdf3f82c96
QUALIFIED_TREE = d7957e6030a723efbdddc174651fe4da313ff84d
MERGE = 4a0b2c67dbd707c18395b0898752c111ca6b16a9
MERGE_PARENT_1 = f2b8d452e93ec207ebe04c9db7d47dc032df20de
MERGE_PARENT_2 = 46f455c21e294d92d2976d4398a26ffdf3f82c96
MERGE_VERIFICATION = verified / valid
POST_MERGE_GOVERNANCE = 33180522055 / SUCCESS
POST_MERGE_K2_RUNTIME = 33180522073 / SUCCESS
```

The three canonical P2-R2 blobs match the qualified candidate, and ruleset `20707483` remained active with no bypass. The committed P2-R2 evidence file intentionally remains a historical candidate-time artifact; the later immutable GitHub object/check proof above establishes `P2-R2 = CLOSED_CANONICAL`.

P2-R2 still does not authorize reducer policy, thresholds, comparison, ranking, external execution, provider/model/evaluator invocation, product integration, persistence, telemetry, learning, release, or superiority claims.

## P2-R3 authorization candidate

The next proposed bounded KodacBench slice is:

```text
P2-R3 = EXPLICIT REDUCER POLICY + TASK-FAMILY SUMMARY SPINE
P2-R3 IMPLEMENTATION = AUTHORIZED ONLY AFTER THE EXACT P2-R3 AUTHORIZATION RECORD IS CANONICAL
P2-R4+ = NOT AUTHORIZED
GENERAL KODACBENCH = NOT CLOSED
```

Candidate authority:

- `docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_AUTHORIZATION_2026-08-28.md`

The proposed R3 implementation consumes one validated P2-R2 report plus an explicit versioned per-metric policy and emits deterministic immutable summaries while preserving task-family separation and exact missing/unavailable coverage.

The authorized reducer vocabulary is intentionally narrow:

```text
ARITHMETIC_MEAN
BOOLEAN_TRUE_RATE
```

No reducer may be inferred merely from value type. `ARITHMETIC_MEAN` applies only to finite numeric observed values and preserves the declared input unit. `BOOLEAN_TRUE_RATE` applies only to boolean observed values and exposes numerator/denominator with output unit `ratio_0_1`. Missing/unavailable values are never converted to zero or false.

The only proposed missingness policies are `REQUIRE_COMPLETE` and `OBSERVED_ONLY_WITH_COVERAGE`; incomplete evidence must remain visible in expected/observed/missing/unavailable counts.

P2-R3 explicitly does **not** authorize directionality, pass/fail thresholds, comparison of systems/strategies/models/providers/configurations/reports, weighted or blended scores, cross-task normalization, Pareto dominance, statistical significance, rankings, leaderboards, `best`, `winner`, `superior`, promotion, or public claims.

The proposed slice remains pure/in-memory and denies provider/model/reviewer/evaluator/tool invocation, network/secrets, subprocess/sandbox execution, new dependencies, CLI/product integration, P2-R1/P2-R2 mutation, persistence/file output, telemetry, training/learning, strategy execution/promotion, Done Gate expansion, ruleset bypass, and release authority.

Candidate text does not itself grant implementation authority. Until the exact five-path authorization unit qualifies, merges normally into protected `main`, and passes required post-merge proof, P2-R3 implementation remains not yet effective.

## Preserved non-grants

```text
KRI-R5+ IMPLEMENTATION = NOT AUTHORIZED
K3-R7+ = NOT AUTHORIZED
K4-R6+ = NOT AUTHORIZED
K5-R6+ = NOT AUTHORIZED
K6-R6+ = NOT AUTHORIZED
P2-R4+ = NOT AUTHORIZED
P3-P8 IMPLEMENTATION = NOT AUTHORIZED

PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT AUTHORIZED
SYSTEM / STRATEGY / MODEL / PROVIDER / REPORT COMPARISON = NOT AUTHORIZED
ROUTE / FALLBACK / RETRY / STRATEGY EXECUTION = NOT AUTHORIZED
AUTOMATIC ROUTING ADVANCEMENT / STRATEGY PROMOTION = NOT AUTHORIZED
TRUST-POLICY MUTATION = NOT AUTHORIZED

PERSISTENT STORAGE / DATABASE / BENCHMARK FILE OUTPUT = NOT AUTHORIZED
TELEMETRY / UPLOAD / ANALYTICS EGRESS = NOT AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT AUTHORIZED
CROSS-REPOSITORY AGGREGATION / LEARNING = NOT AUTHORIZED

K2 EXECUTION-AUTHORITY EXPANSION = NOT AUTHORIZED
K5 PROOF-AUTHORITY EXPANSION = NOT AUTHORIZED
DONE GATE MODIFICATION = NOT AUTHORIZED
PROVEN_READY AUTHORITY TRANSFER = NOT AUTHORIZED
AUTOFIX EXECUTION = NOT AUTHORIZED

NEW KODAC DEPENDENCIES = NOT AUTHORIZED
CODE / DONOR / EXTERNAL DATA INTAKE = NOT AUTHORIZED
UNLISTED REDUCER / THRESHOLD / DIRECTION / RANKING = NOT AUTHORIZED
PUBLIC LEADERBOARD / GENERAL SUPERIORITY CLAIM = NOT AUTHORIZED
RULESET CHANGE / BYPASS = NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / PUBLIC VERSION / BRAND LAUNCH = NOT AUTHORIZED
```

## Next engineering boundary

If and only if the exact P2-R3 authorization candidate becomes canonical and its post-merge proof succeeds, the next eligible repository unit is the one bounded P2-R3 implementation PR described by that authorization.

Engineering milestone closure and benchmark infrastructure remain separate from public release, packaging, production-readiness, support, compatibility, and superiority claims.
