# Product Document Authority Status

The pre-existing files in `docs/product/` are preserved **Kernux-era historical planning inputs**.

They remain in the repository for historical integrity and research context, but they are not current Kodac product authority and do not override accepted Kodac ADRs, current Kodac planning/closeout records, the README current architecture summary, or reconstituted `docs/roadmap/*`.

This status notice does not delete, rewrite, validate, or re-adopt those historical product documents. Future Kodac product-document reconstitution requires a separate founder-reviewed gate.

## Canonical closed milestones

K3, K4, K5, the bounded K6 R1-R5 milestone, and P2-R1 through P2-R3 are canonically closed for their exact scopes.

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
P2-R3 = CLOSED_CANONICAL
P2-R4 = AUTHORIZATION CANDIDATE / IMPLEMENTATION NOT YET EFFECTIVE
P2-R5+ = NOT AUTHORIZED
P2 = OPEN
```

## Canonical P2 anchors

```text
P2-R1 authorization = PR #237 / 1cd2fc4de1eb5849cbe2519ae1699bc2acc56397
P2-R1 implementation = PR #238 / c499c8ac098cca9719eaad3cacadd2af7d1c0a1f
P2-R2 authorization = PR #239 / f2b8d452e93ec207ebe04c9db7d47dc032df20de
P2-R2 implementation = PR #240 / 4a0b2c67dbd707c18395b0898752c111ca6b16a9
P2-R3 authorization = PR #241 / d398983a457060dff0b700714d3eebbc4dce8e23
P2-R3 implementation = PR #242 / 20cb3d2e277513fc3cefa71fe9fda03f25fd418a
```

### P2-R3 canonical closure

P2-R3 is `CLOSED_CANONICAL` for its exact pure in-memory reducer-policy and task-family-summary scope.

```text
QUALIFIED_HEAD = 6e1b6aa27591e997cbe164fd335e8bee08b11f1c
QUALIFIED_TREE = 3d040c6ae4b56573d55eb3b8dbecad3e79bdfdc3
MERGE = 20cb3d2e277513fc3cefa71fe9fda03f25fd418a
MERGE_PARENT_1 = d398983a457060dff0b700714d3eebbc4dce8e23
MERGE_PARENT_2 = 6e1b6aa27591e997cbe164fd335e8bee08b11f1c
MERGE_VERIFICATION = verified / valid
POST_MERGE_GOVERNANCE = 33188625032 / SUCCESS
POST_MERGE_K2_RUNTIME = 33188625005 / SUCCESS
RULESET = 20707483 / active / no bypass
```

Canonical P2-R3 blobs:

```text
packages/kodac-runtime/bench/p2-r3/summary.ts
  = 1c0c79381ad89ca9051e0d37243a17f85ea19285
packages/kodac-runtime/test/p2-r3-summary.test.ts
  = 7abf8b25a90079928d441c376581357f69a9ec7d
docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_EVIDENCE_2026-08-28.md
  = 238ae10cd8c62aa40453574be720213d90c160d4
```

The committed P2-R3 evidence record intentionally remains a historical candidate-time artifact; immutable later GitHub object/check proof establishes canonical closure.

P2-R3 authorizes only explicit reducers (`ARITHMETIC_MEAN`, `BOOLEAN_TRUE_RATE`), explicit missingness (`REQUIRE_COMPLETE`, `OBSERVED_ONLY_WITH_COVERAGE`), task-family-separated summaries, and deterministic identities. It does not grant comparison, ranking, threshold, promotion, external execution, persistence, product, release, or superiority authority.

## P2-R4 authorization candidate

The next proposed bounded KodacBench slice is:

```text
P2-R4 = CONTROLLED PAIRWISE COMPARISON OF ALREADY-MATERIALIZED R2/R3 EVIDENCE
P2-R4 IMPLEMENTATION = AUTHORIZED ONLY AFTER THE EXACT P2-R4 AUTHORIZATION RECORD IS CANONICAL
P2-R5+ = NOT AUTHORIZED
GENERAL KODACBENCH = NOT CLOSED
PUBLIC SUPERIORITY CLAIMS = NOT AUTHORIZED
WAIVER = NO
```

Candidate authority:

- `docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_AUTHORIZATION_2026-08-28.md`

The proposed R4 slice is pure, local, deterministic, and in-memory. It may compare exactly two already-materialized benchmark evidence sets only after revalidating and cross-binding their P2-R2 reports and P2-R3 summaries.

The pair must prove exact benchmark/protocol/manifest/task topology equality and use one shared ADR-0010 evaluation context identity for both sides. The only controlled dimension intentionally allowed to differ in this slice is each subject's system/version/commit identity; raw artifact/log identities may differ because they identify each side's evidence.

Per-metric direction must be explicit and limited to:

```text
HIGHER_IS_BETTER
LOWER_IS_BETTER
```

R4 may materialize only per-task-family/per-metric left value, right value, and raw `left - right` delta when both sides have sufficient reduced evidence. It may not emit a winner, loser, better/worse verdict, ranking, leaderboard, blended score, threshold, significance claim, promotion decision, or public superiority claim.

The proposed slice grants no provider/model/reviewer/evaluator/tool execution, benchmark execution, network/secrets, subprocess/sandbox, dependency, CLI/product integration, P2-R1/R2/R3 mutation, persistence/file output, telemetry, training/learning, routing/promotion, Done Gate expansion, release, or ruleset authority.

Candidate text does not itself grant implementation authority. Until the exact five-path authorization unit qualifies on one frozen exact head, merges normally into protected `main`, and passes required post-merge proof, P2-R4 implementation remains not effective.

## Preserved non-grants

```text
KRI-R5+ IMPLEMENTATION = NOT AUTHORIZED
K3-R7+ = NOT AUTHORIZED
K4-R6+ = NOT AUTHORIZED
K5-R6+ = NOT AUTHORIZED
K6-R6+ = NOT AUTHORIZED
P2-R5+ = NOT AUTHORIZED
P3-P8 IMPLEMENTATION = NOT AUTHORIZED

PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT AUTHORIZED
BENCHMARK TASK EXECUTION = NOT AUTHORIZED
MODEL / PROVIDER / CONFIGURATION / PROMPT / ENVIRONMENT COMPARISON = NOT AUTHORIZED BY R4
N-WAY RANKING / LEADERBOARD / WINNER / SUPERIORITY = NOT AUTHORIZED
THRESHOLD / STATISTICAL SIGNIFICANCE / PROMOTION = NOT AUTHORIZED
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
PUBLIC LEADERBOARD / GENERAL SUPERIORITY CLAIM = NOT AUTHORIZED
RULESET CHANGE / BYPASS = NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / PUBLIC VERSION / BRAND LAUNCH = NOT AUTHORIZED
```

## Next engineering boundary

This exact branch is documentation/governance only. If and only if the P2-R4 authorization candidate becomes canonical and its post-merge proof succeeds, the next eligible repository unit is exactly one bounded P2-R4 implementation PR within the allowlist named by that authorization.

Engineering milestone closure and benchmark infrastructure remain separate from public release, packaging, production-readiness, support, compatibility, and superiority claims.
