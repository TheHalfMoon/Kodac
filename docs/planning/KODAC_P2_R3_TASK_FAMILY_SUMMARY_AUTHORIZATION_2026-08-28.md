# Kodac P2-R3 Explicit Reducer Policy and Task-Family Summary Authorization — 2026-08-28

## Status

```text
DOCUMENT TYPE: FOUNDER-AUTHORIZED IMPLEMENTATION GATE CANDIDATE
P2-R1 = CLOSED_CANONICAL
P2-R2 = CLOSED_CANONICAL
P2-R3 IMPLEMENTATION = AUTHORIZED ONLY AFTER THIS RECORD IS CANONICAL
P2-R4+ = NOT AUTHORIZED
GENERAL KODACBENCH = NOT CLOSED
PUBLIC SUPERIORITY CLAIMS = NOT AUTHORIZED
WAIVER = NO
```

This record is deny-by-default. It creates no effective P2-R3 implementation authority while it is only a branch or pull-request candidate. The implementation authority below becomes effective only after this exact five-path authorization unit is qualified on one frozen exact head, merged normally into protected `main`, and its required post-merge proof succeeds.

## Exact canonical baseline

This candidate is prepared from protected canonical `main`:

```text
4a0b2c67dbd707c18395b0898752c111ca6b16a9
```

That commit is the merge of PR #240 and closes P2-R2 for its exact bounded local runner/report scope after exact-head machine qualification, two distinct independent external semantic terminal-clean reviews, guarded merge, ordered-parent/tree/blob/signature proof, and successful post-merge governance and K2 runtime push runs.

P2-R2 immutable closure anchors are:

```text
P2_R2_AUTHORIZATION_MERGE = f2b8d452e93ec207ebe04c9db7d47dc032df20de
P2_R2_IMPLEMENTATION_PR = #240
P2_R2_QUALIFIED_HEAD = 46f455c21e294d92d2976d4398a26ffdf3f82c96
P2_R2_QUALIFIED_TREE = d7957e6030a723efbdddc174651fe4da313ff84d
P2_R2_MERGE = 4a0b2c67dbd707c18395b0898752c111ca6b16a9
P2_R2_MERGE_PARENT_1 = f2b8d452e93ec207ebe04c9db7d47dc032df20de
P2_R2_MERGE_PARENT_2 = 46f455c21e294d92d2976d4398a26ffdf3f82c96
P2_R2_MERGE_VERIFICATION = verified / valid
P2_R2_POST_MERGE_GOVERNANCE_RUN = 33180522055 / SUCCESS
P2_R2_POST_MERGE_K2_RUNTIME_RUN = 33180522073 / SUCCESS
```

The canonical P2-R2 blobs after merge are:

```text
packages/kodac-runtime/bench/p2-r2/runner.ts
  = 84849214b516fa465451146c9336ea5d825bdeeb
packages/kodac-runtime/test/p2-r2-runner.test.ts
  = c4485164f6970dfae3892f773f89c150988a611e
docs/planning/KODAC_P2_R2_LOCAL_RUNNER_REPORT_EVIDENCE_2026-08-28.md
  = 1fbbd2687295281f1303736068671f4bda760b22
```

The post-merge governance run completed `provenance` and `legacy-tests` successfully. The post-merge K2 runtime run completed the runtime-change classifier, Ubuntu, Windows, macOS, and `k2-runtime-gate` successfully. Ruleset `20707483` remained active with `bypass_actors=[]` and `current_user_can_bypass=never`.

The committed P2-R2 evidence record remains a historical candidate-time artifact by design. It does not recursively encode its future merge. Current P2-R2 closure is established by the immutable GitHub object/check proof above.

Governing records include:

- `AGENTS.md`;
- `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`;
- `docs/adr/ADR-0010-benchmark-first-donor-selection.md`;
- `docs/planning/KODAC_REVIEW_PROVIDER_NEUTRALITY_AND_EVIDENCE_QUORUM_AMENDMENT_2026-08-27.md`;
- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`;
- the canonical P2-R1 and P2-R2 authorization/evidence records plus their immutable post-merge proof.

If live protected `main`, repository governance, or a more-specific canonical authority conflicts with this candidate before merge, reconcile forward without force-push, rebase, destructive history rewrite, or silent waiver.

## Exact authorization-unit changed-file set

This authorization/gate PR may change exactly these five paths and no others:

```text
docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_AUTHORIZATION_2026-08-28.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
```

This unit is documentation/governance only. It may not implement P2-R3.

The exact five-path set above governs changed-file qualification and required individual candidate blob capture. Missing any one of the five candidate blobs makes authorization qualification incomplete.

## P2-R3 purpose

P2-R1 established identity-bound benchmark fixtures/manifests and metric declarations. P2-R2 established a deterministic local runner/report layer that records exact caller-materialized observations while deliberately refusing to infer reducers, thresholds, rankings, or winner semantics.

P2-R3 closes only the next missing semantic gap: an explicit, versioned reducer policy and deterministic task-family summary layer.

The intended flow is:

```text
VALIDATED P2-R2 REPORT
+ EXPLICIT VERSIONED TASK-FAMILY METRIC POLICY
-> STRICT POLICY / REPORT BINDING
-> EXPLICIT PER-METRIC REDUCER
-> DETERMINISTIC TASK-FAMILY SUMMARY
-> IMMUTABLE SUMMARY IDENTITY
```

P2-R3 is not a general benchmark executor, evaluator agent, comparison engine, leaderboard, promotion gate, or product claim system.

## Authorized implementation allowlist

After this authorization becomes canonical, exactly one P2-R3 implementation PR may modify only:

```text
packages/kodac-runtime/bench/p2-r3/**
packages/kodac-runtime/test/p2-r3-*.test.ts
docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_EVIDENCE_2026-08-28.md
```

P2-R3 may import and use the already-canonical P2-R1 contract and P2-R2 report contract. Tests may consume committed P2-R1 fixtures and in-memory P2-R2 reports. P2-R3 may not modify P2-R1 or P2-R2 bytes.

No package manifest, lockfile, workflow, CLI, product-runtime source, K2/K3/K4/K5/K6 source, adapter, provider, model, reviewer, evaluator, persistence, telemetry, release, or ruleset path is in the allowlist.

If a necessary change falls outside this allowlist, stop. A separate authorization is required.

## Required policy contract

P2-R3 must define an exact-key versioned in-memory policy contract. A policy entry must bind to one already-declared P2-R1/P2-R2 metric within exactly one task family.

Each metric policy must identify at least:

```text
schema_version
task_family
metric_id
unit
value_kind
reducer
missingness_policy
minimum_observed_count
```

Required semantics:

- `task_family`, `metric_id`, and `unit` must match the validated P2-R2 report evidence exactly;
- one metric may have at most one policy entry in one policy set;
- policy entries for unknown metrics or cross-task-family bindings fail closed;
- no reducer is inferred from numeric or boolean value shape;
- every summarized metric must have an explicit reducer entry;
- metrics without an explicit policy remain unsummarized rather than receiving a default;
- policy identity is evidence-bearing and must participate in summary identity;
- policy input must cross the hardened canonical JSON boundary before semantic reads;
- caller timestamps, absolute paths, object iteration order, locale, host state, wall-clock time, or process state must not affect policy or summary identity.

## Closed reducer vocabulary

P2-R3 may implement only this bounded reducer vocabulary:

```text
ARITHMETIC_MEAN
BOOLEAN_TRUE_RATE
```

`ARITHMETIC_MEAN`:

- applies only to finite numeric `observed` values;
- returns a finite numeric value in the same declared metric unit;
- never converts missing or unavailable values to zero;
- must preserve exact observed/expected/missing/unavailable counts beside the reduced value.

`BOOLEAN_TRUE_RATE`:

- applies only to boolean `observed` values;
- returns a finite ratio in the closed unit `ratio_0_1`;
- numerator and denominator must remain explicit in the summary evidence;
- missing or unavailable values are never treated as false.

Any other reducer, percentile, median, sum, weighted score, normalization, threshold, utility function, statistical test, confidence interval, cost-quality tradeoff, or domain-specific scoring function requires a later separate authorization.

## Missingness policy

P2-R3 may support only these explicit missingness policies:

```text
REQUIRE_COMPLETE
OBSERVED_ONLY_WITH_COVERAGE
```

`REQUIRE_COMPLETE` fails closed for a metric summary when any expected slot is not `observed`.

`OBSERVED_ONLY_WITH_COVERAGE` may reduce only the observed values if `minimum_observed_count` is satisfied, but the summary must retain expected, observed, missing, and unavailable counts so incomplete coverage cannot disappear behind the reduced value.

A zero observed count never produces a numeric/boolean reduced value. It remains an explicit insufficient-evidence state.

No imputation, zero-filling, success-filling, failure-filling, carry-forward, interpolation, weighting, or hidden exclusion is authorized.

## Required summary contract

P2-R3 must produce an immutable machine-readable summary with exact versioned semantics and deterministic canonical identity.

The summary must bind at least:

```text
schema_version
benchmark_id
benchmark_protocol_version
r2_report_identity
policy_identity
task_family_summaries
summary_identity
```

Each task-family summary must preserve independently, per metric:

```text
task_family
metric_id
input_unit
reducer
missingness_policy
expected_count
observed_count
missing_count
unavailable_count
reduced_value_or_insufficient_evidence
output_unit
```

Task families must remain separate arrays/sections. P2-R3 must not collapse task families into one universal product score.

The summary identity must be derived only from canonical evidence-bearing values. `summary_identity` itself must be excluded from its own identity input.

## No comparison, direction, threshold, or winner semantics

P2-R3 is a one-report summary layer. It is not authorized to compare two systems, strategies, models, providers, reviewers, configurations, commits, or reports.

P2-R3 must not define or infer:

- `higher_is_better` / `lower_is_better` direction;
- pass/fail or accept/reject thresholds;
- target bands;
- cross-metric utility functions;
- weighted/blended scores;
- cross-task-family normalization;
- Pareto dominance;
- statistical significance claims;
- rankings, leaderboards, `best`, `winner`, `superior`, or promotion semantics.

Those semantics require a later exact P2 authorization with ADR-0010 fair-comparison evidence bindings.

## Canonicalization and hostile-structure boundary

P2-R3 must use or preserve the hardened canonical JSON boundary established by P2-R1 and used by P2-R2.

Before policy or summary identity construction, fail closed on unsupported or hostile values including, where applicable:

- Proxies;
- accessors/getters;
- symbol properties;
- non-plain object prototypes;
- sparse, accessor, extended, or non-canonical arrays;
- cycles;
- `undefined`, functions, bigint, symbols, non-finite numbers, or other non-JSON values;
- unknown or missing exact contract fields.

A legitimate own JSON key such as `__proto__` must remain ordinary data and must not mutate an intermediate object's prototype.

P2-R3 should reuse small exported P2-R1/P2-R2 canonical primitives rather than duplicating hardened parsing logic mechanically.

## Determinism and mutation safety

Required identity invariant:

```text
same validated P2-R2 report
+ same canonical explicit P2-R3 policy
+ same P2-R3 schema semantics
-> same summary identity
```

Input order must not change policy or summary identity. The implementation must not derive identity from mutable caller references after validation. Caller mutation after return must not mutate returned summary semantics.

## Security and privacy invariants

Required P2-R3 authority values:

```text
UNAUTHORIZED WORKSPACE MUTATIONS BY P2-R3 LOGIC = 0
NETWORK / PROVIDER / MODEL / REVIEWER / EVALUATOR INVOCATIONS = 0
SUBPROCESS / TOOL / SANDBOX EXECUTION = 0
PERSISTENT DATABASE / FILE OUTPUT / TELEMETRY / UPLOAD / ANALYTICS EGRESS = 0
SECRET ACCESS = 0
NEW DEPENDENCIES = 0
DONOR CODE / DATA INTAKE = 0
P2-R1 BYTE MUTATIONS = 0
P2-R2 BYTE MUTATIONS = 0
```

P2-R3 runtime logic must remain pure/in-memory for this slice. K2 remains Kodac's trusted side-effect execution boundary and is not expanded.

## Explicit non-grants

This record does not authorize:

- P2-R4 or any later P2 slice;
- system/strategy/model/provider/reviewer/evaluator/configuration comparison;
- provider/model/reviewer/evaluator/tool/agent invocation;
- network access or secret handling;
- subprocess, compiler, test-runner, sandbox, or external benchmark execution by P2-R3 logic;
- external dataset or donor-source intake;
- new dependencies or package/lockfile changes;
- CLI/product integration;
- mutation of P2-R1/P2-R2 fixtures/contracts/implementation;
- persistent database, file output, telemetry, upload, analytics, training, fine-tuning, online learning, or cross-repository learning;
- strategy execution, automatic selection, promotion, trust mutation, or eligibility advancement;
- K2, K5, Done Gate, or `PROVEN_READY` authority expansion;
- unlisted reducers, imputation, thresholds, directionality, normalization, statistical testing, comparison, ranking, winner, or superiority semantics;
- public leaderboard or competitive benchmark execution;
- SOTA, production-readiness, security, support, compatibility, cost, or quality superiority claims;
- public release, package publication, public version declaration, or brand launch;
- ruleset mutation or bypass.

## Required P2-R3 tests

The implementation PR must include focused tests proving at least:

1. the P2-R2 report input is revalidated before summarization;
2. policy input order does not affect policy or summary identity;
3. repeated identical inputs produce identical summary identity;
4. summary identity changes when an evidence-bearing policy or observation changes;
5. unknown task families fail closed;
6. unknown metric IDs fail closed;
7. metric-unit mismatch fails closed;
8. duplicate metric policies fail closed;
9. reducer/value-kind mismatch fails closed;
10. non-finite values remain rejected;
11. `ARITHMETIC_MEAN` computes only over observed finite numeric values;
12. `BOOLEAN_TRUE_RATE` exposes numerator/denominator and never treats missing as false;
13. `REQUIRE_COMPLETE` refuses incomplete metric evidence;
14. `OBSERVED_ONLY_WITH_COVERAGE` retains exact coverage/missing/unavailable counts;
15. zero observed values remain insufficient evidence rather than zero;
16. task-family summaries remain separated;
17. no direction, threshold, blended score, ranking, winner, comparison, or promotion field is materialized;
18. caller input mutation after return does not mutate returned semantics;
19. hostile/non-JSON JavaScript structures fail closed before identity construction and do not execute hooks;
20. `__proto__` remains ordinary canonical data where generic JSON payloads are permitted;
21. timestamps/absolute paths/process state are not identity inputs;
22. existing repository tests and required CI remain green.

Tests must use committed local fixtures and in-memory safe values only. They must not require internet access.

## P2-R3 evidence record

The implementation PR must create:

`docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_EVIDENCE_2026-08-28.md`

The evidence record must bind at least:

- exact canonical P2-R3 authorization merge identity;
- implementation base and exact candidate head;
- exact changed-file allowlist realization;
- exact final blobs for all implementation/test/evidence paths;
- focused test commands and exact results;
- required CI run/check identities;
- semantic-review evidence required by live governance;
- active ruleset/no-bypass evidence;
- known limitations and preserved non-grants;
- guarded normal merge conditions;
- post-merge parents/tree/blob/signature/applicable-check proof required before P2-R3 may be called canonical/complete.

Candidate-time evidence must not claim a future merge result as fact.

## Authorization-unit qualification gate

This authorization candidate may merge only if all of the following hold on one frozen exact head:

- live protected `main` has not moved without explicit forward reconciliation;
- changed files are exactly the five named authorization-unit paths and no others;
- no runtime source, workflow, dependency, lockfile, benchmark implementation, fixture, schema, or product change is present;
- all required exact-head CI/check contexts succeed or are proven non-applicable from canonical workflow conditions;
- at least two distinct independent external semantic reviewer channels each give a substantive terminal-clean assessment on the exact final head under the provider-neutral review evidence contract;
- rate-limit, billing, skipped-review, outage, status-only, summary-only, self-review, stale-head, error, or duplicate-channel output does not count;
- unresolved material findings and actionable review threads = 0;
- exact final candidate head and tree are captured;
- each of the five changed paths has an individually captured final blob identity;
- PR is open, non-draft, mergeable, and not behind protected `main`;
- ruleset `20707483` remains active with `bypass_actors=[]`, `current_user_can_bypass=never`, required review-thread resolution, and strict required checks `provenance`, `legacy-tests`, and `k2-runtime-gate`;
- merge is a normal history-preserving merge guarded by exact `expected_head_sha` semantics;
- `WAIVER=NO`.

## Required post-merge proof

P2-R3 implementation authority becomes effective only after this authorization PR merges and all of the following are proven from live GitHub objects:

- protected `main` equals the returned authorization merge SHA;
- ordered merge parents are the then-canonical base followed by the exact qualified authorization head;
- merge tree matches the qualified candidate tree;
- all five canonical path blobs match the qualified candidate blobs;
- GitHub merge signature/verification is valid where emitted;
- ruleset/no-bypass state remains intact;
- applicable post-merge push checks succeed or non-applicability is proven from canonical workflow conditions.

Only after that proof may the one bounded P2-R3 implementation PR described above begin.

Even successful P2-R3 does not authorize P2-R4, comparison/ranking, external execution, public claims, or release.