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

P2-R3 may import and use the already-canonical P2-R1 canonicalization/hash primitives and the P2-R2 report schema/types. Tests may consume committed P2-R1 fixtures and in-memory P2-R2 reports. P2-R3 may not modify P2-R1 or P2-R2 bytes.

No package manifest, lockfile, workflow, CLI, product-runtime source, K2/K3/K4/K5/K6 source, adapter, provider, model, reviewer, evaluator, persistence, telemetry, release, or ruleset path is in the allowlist.

If a necessary change falls outside this allowlist, stop. A separate authorization is required.

## Required P2-R2 report revalidation

P2-R3 must treat a caller-supplied P2-R2 report as untrusted input even when its TypeScript type is `P2R2Report`.

Before any policy binding or reduction, P2-R3 must:

1. cross the hardened P2-R1 canonical JSON boundary before semantic field reads;
2. require the exact P2-R2 report schema version and exact-key report/section/case/metric structure;
3. validate canonical non-empty identities/strings, lowercase SHA-256 digest fields, safe non-negative integer count fields, measurement-status vocabulary, finite observed numeric values, boolean observed values, and `null` for missing/unavailable values;
4. reject duplicate task-family sections, duplicate case identities, and duplicate case/metric slots;
5. recompute the P2-R2 report identity from all evidence-bearing report fields except `report_identity` and require exact equality;
6. recompute derived case/observation/missing counts from the materialized report structure and require exact equality with the report-level counts;
7. preserve the distinction between `missing` and `unavailable` at metric-slot level.

This validation must not claim that P2-R3 can reconstruct R1 manifests or the original observation-set digest from report bytes alone. P2-R3 verifies the self-contained R2 report contract and identity it receives; it does not manufacture missing upstream provenance.

## Exact policy-document contract

P2-R3 must define an exact-key versioned in-memory policy document with exactly these top-level caller-supplied fields:

```text
schema_version
benchmark_id
benchmark_protocol_version
r2_report_identity
metric_policies
```

The policy document must bind exactly to one validated P2-R2 report:

- `benchmark_id` must equal the report `benchmark_id`;
- `benchmark_protocol_version` must equal the report `benchmark_protocol_version`;
- `r2_report_identity` must equal the validated report `report_identity`;
- `metric_policies` must be a canonical array;
- input order of `metric_policies` is not identity-bearing after canonical deterministic sorting.

P2-R3 derives `policy_identity` from the canonical validated policy document; `policy_identity` is not caller-supplied and therefore cannot self-assert validity.

Each metric-policy entry must have exactly these keys:

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

Required binding semantics:

- `task_family`, `metric_id`, and `unit` must match metric slots present in the validated P2-R2 report exactly;
- one `(task_family, metric_id)` may have at most one policy entry in one policy set;
- policy entries for unknown metrics or cross-task-family bindings fail closed;
- every summarized metric must have an explicit policy entry;
- metrics without an explicit policy remain unsummarized rather than receiving a default;
- no reducer or `value_kind` is inferred from observed data shape;
- every observed slot selected by a policy must match the explicit `value_kind`; mixed or mismatched observed kinds fail closed;
- policy identity is evidence-bearing and must participate in summary identity;
- caller timestamps, absolute paths, object iteration order, locale, host state, wall-clock time, or process state must not affect policy or summary identity.

## Closed value-kind vocabulary

P2-R3 may implement only:

```text
NUMBER
BOOLEAN
```

`NUMBER` means every `observed` slot for that metric must contain a finite JSON number.

`BOOLEAN` means every `observed` slot for that metric must contain a JSON boolean.

P2-R1 metric definitions do not carry a value kind and P2-R2 permits either finite numbers or booleans at the generic observation layer. Therefore P2-R3 policy is the first layer that explicitly declares the expected value kind for reduction, and it must verify every observed slot rather than infer the declaration from data.

Any other value kind requires a later separate authorization.

## Closed reducer vocabulary

P2-R3 may implement only:

```text
ARITHMETIC_MEAN
BOOLEAN_TRUE_RATE
```

Reducer/value-kind compatibility is exact:

```text
ARITHMETIC_MEAN    -> NUMBER only
BOOLEAN_TRUE_RATE  -> BOOLEAN only
```

`ARITHMETIC_MEAN`:

- reduces only finite numeric `observed` values;
- returns a finite numeric value in the same declared input metric unit;
- never converts missing or unavailable values to zero;
- must either use a numerically safe finite computation or fail closed if a finite result cannot be produced;
- must preserve exact expected/observed/missing/unavailable counts beside the reduced value.

`BOOLEAN_TRUE_RATE`:

- reduces only boolean `observed` values;
- returns a finite ratio in the closed output unit `ratio_0_1`;
- exposes exact `true_count` and `denominator_count` evidence;
- never treats missing or unavailable values as false.

Any other reducer, percentile, median, sum, weighted score, normalization, threshold, utility function, statistical test, confidence interval, cost-quality tradeoff, or domain-specific scoring function requires a later separate authorization.

## Closed missingness policy and minimum count

P2-R3 may support only:

```text
REQUIRE_COMPLETE
OBSERVED_ONLY_WITH_COVERAGE
```

`minimum_observed_count` must always be a positive safe integer (`>= 1`). Zero, negative, fractional, unsafe-integer, non-numeric, or non-finite values fail closed.

After policy/report binding establishes a metric's `expected_count`:

- `minimum_observed_count > expected_count` fails closed as an impossible policy;
- under `REQUIRE_COMPLETE`, `minimum_observed_count` must equal `expected_count`;
- under `OBSERVED_ONLY_WITH_COVERAGE`, `minimum_observed_count` may be any positive safe integer from `1` through `expected_count` inclusive.

`REQUIRE_COMPLETE` semantics are per metric. If any expected slot for that metric is not `observed`, that metric emits the explicit `INSUFFICIENT_EVIDENCE` state with no reduced value; it does not silently drop the metric and does not abort otherwise-valid summaries for independent metrics.

`OBSERVED_ONLY_WITH_COVERAGE` may reduce only observed values when `observed_count >= minimum_observed_count`. Otherwise that metric emits `INSUFFICIENT_EVIDENCE`. In both states the summary retains exact expected, observed, missing, and unavailable counts so incomplete coverage cannot disappear behind the reduced value.

A zero observed count never produces a numeric reduced value or ratio. It remains `INSUFFICIENT_EVIDENCE`.

No imputation, zero-filling, success-filling, failure-filling, carry-forward, interpolation, weighting, or hidden exclusion is authorized.

## Exact summary contract

P2-R3 must produce a deeply immutable machine-readable summary with exact versioned semantics and deterministic canonical identity.

The top-level summary must have exactly these keys:

```text
schema_version
benchmark_id
benchmark_protocol_version
r2_report_identity
policy_identity
task_family_summaries
summary_identity
```

Each task-family summary must have exactly:

```text
task_family
metrics
```

Each metric summary must have exactly:

```text
metric_id
input_unit
output_unit
value_kind
reducer
missingness_policy
minimum_observed_count
expected_count
observed_count
missing_count
unavailable_count
status
reduced_value
true_count
denominator_count
```

Closed metric-summary status vocabulary:

```text
REDUCED
INSUFFICIENT_EVIDENCE
```

Representation rules:

- `REDUCED` requires a non-null finite `reduced_value`;
- `INSUFFICIENT_EVIDENCE` requires `reduced_value = null`;
- `ARITHMETIC_MEAN` preserves `output_unit = input_unit` and requires `true_count = null`, `denominator_count = null`;
- `BOOLEAN_TRUE_RATE` requires `output_unit = ratio_0_1`; on `REDUCED`, `true_count` and `denominator_count` are safe non-negative integers with `denominator_count = observed_count` and `0 <= true_count <= denominator_count`;
- for `BOOLEAN_TRUE_RATE` with `INSUFFICIENT_EVIDENCE`, `true_count` and `denominator_count` still expose the observed boolean evidence and therefore remain safe non-negative integers with `denominator_count = observed_count`;
- `expected_count = observed_count + missing_count + unavailable_count` exactly;
- all count fields are safe non-negative integers;
- task families and metric summaries are deterministically sorted by canonical strings before identity construction.

Task families must remain separate arrays/sections. P2-R3 must not collapse task families into one universal product score.

The summary identity must be derived from every canonical evidence-bearing summary field except `summary_identity` itself. `policy_identity` and `r2_report_identity` are mandatory identity inputs.

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

P2-R3 must reuse the hardened canonical JSON boundary established by P2-R1 before semantic reads of untrusted report or policy input.

Fail closed on unsupported or hostile values including, where applicable:

- Proxies;
- accessors/getters;
- symbol properties;
- non-plain object prototypes;
- sparse, accessor, extended, or non-canonical arrays;
- cycles;
- `undefined`, functions, bigint, symbols, non-finite numbers, or other non-JSON values;
- unknown or missing exact contract fields.

A legitimate own JSON key such as `__proto__` must remain ordinary data and must not mutate an intermediate object's prototype.

P2-R3 should reuse exported P2-R1 canonicalization/hash primitives rather than duplicating hostile-JavaScript traversal logic mechanically. Any R2 structural validator needed by R3 must live inside the authorized `p2-r3/**` implementation path and may not mutate R2 bytes.

## Determinism and mutation safety

Required identity invariant:

```text
same validated P2-R2 report
+ same canonical explicit P2-R3 policy
+ same P2-R3 schema semantics
-> same policy identity
-> same summary identity
```

Caller array/object insertion order must not change policy or summary identity after deterministic canonical sorting. The implementation must not derive identity from mutable caller references after validation. Caller mutation after return must not mutate returned policy or summary semantics.

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
- system/strategy/model/provider/reviewer/evaluator/configuration/report comparison;
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
- unlisted reducers/value kinds, imputation, thresholds, directionality, normalization, statistical testing, comparison, ranking, winner, or superiority semantics;
- public leaderboard or competitive benchmark execution;
- SOTA, production-readiness, security, support, compatibility, cost, or quality superiority claims;
- public release, package publication, public version declaration, or brand launch;
- ruleset mutation or bypass.

## Required P2-R3 tests

The implementation PR must include focused tests proving at least:

1. P2-R2 report input crosses hardened canonicalization before semantic reads;
2. exact R2 report structure, identity, and derived report counts are revalidated before summarization;
3. malformed/stale R2 `report_identity` fails closed;
4. policy input order does not affect policy or summary identity;
5. repeated identical inputs produce identical identities;
6. summary identity changes when evidence-bearing policy or report evidence changes;
7. unknown task families fail closed;
8. unknown metric IDs fail closed;
9. metric-unit mismatch fails closed;
10. duplicate metric policies fail closed;
11. unsupported `value_kind` fails closed;
12. reducer/value-kind mismatch fails closed;
13. mixed or mismatched observed value kinds fail closed;
14. `minimum_observed_count` rejects zero, negative, fractional, unsafe, non-finite, and greater-than-expected values;
15. `REQUIRE_COMPLETE` requires `minimum_observed_count = expected_count` and emits per-metric `INSUFFICIENT_EVIDENCE` on incomplete coverage;
16. `OBSERVED_ONLY_WITH_COVERAGE` reduces only when its explicit minimum count is met and always retains exact coverage;
17. non-finite numeric values and non-finite reducer results fail closed;
18. `ARITHMETIC_MEAN` computes only over observed finite numeric values and preserves unit;
19. `BOOLEAN_TRUE_RATE` exposes exact true/denominator counts and never treats missing as false;
20. zero observed values remain `INSUFFICIENT_EVIDENCE` rather than zero;
21. expected/observed/missing/unavailable counts reconcile exactly;
22. task-family summaries remain separated and deterministically ordered;
23. no direction, threshold, blended score, ranking, winner, comparison, or promotion field is materialized;
24. returned graph is deeply frozen and caller mutation after return cannot alter semantics;
25. hostile/non-JSON JavaScript structures fail closed before identity construction and do not execute hooks;
26. `__proto__` remains ordinary canonical data where generic JSON payloads are permitted;
27. timestamps/absolute paths/locale/process/host state are not identity inputs;
28. existing repository tests and required CI remain green.

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

1. live protected `main` still equals the exact canonical baseline unless this candidate is forward-reconciled;
2. PR base is `main` and candidate `behind_by = 0`;
3. changed files are exactly the five named authorization-unit paths and no others;
4. the candidate is documentation/governance only and introduces no implementation authority before canonical adoption;
5. applicable repository-required exact-head CI is terminal success;
6. at least two distinct independent external semantic reviewer channels each provide a substantive terminal-clean assessment bound to the exact final head under the canonical provider-neutral quorum policy;
7. skipped, rate-limited, billing-blocked, outage, stale, status-only, self-review, or duplicate-channel output is not counted;
8. zero unresolved material correctness, security, governance, authority, or scope finding remains;
9. zero unresolved actionable review threads remain;
10. PR is open, non-draft, mergeable, and unchanged from the qualified head;
11. exact final head, exact tree, and all five candidate document blobs are captured;
12. ruleset `20707483` remains active for `main` with required review-thread resolution and strict required checks;
13. `bypass_actors = []` and `current_user_can_bypass = never`;
14. normal history-preserving merge uses the exact qualified `expected_head_sha` and does not use force-push, rebase, or destructive history rewriting;
15. post-merge protected `main` equals the returned merge commit;
16. post-merge ordered parents bind the pre-merge canonical main first and the exact qualified candidate head second for a normal merge commit;
17. post-merge tree and all five canonical document blobs equal the qualified candidate;
18. GitHub merge verification is `verified / valid` when GitHub emits the signed merge commit;
19. applicable post-merge repository-required push checks are terminal success; an intentionally non-applicable path-filtered workflow must be proven non-applicable rather than described as green;
20. ruleset/no-bypass evidence is re-proven after merge;
21. `WAIVER = NO`.

Any repository-byte change invalidates prior exact-head CI, review, head/tree/blob, and merge qualification evidence. Requalify the new head from scratch.

## Post-merge authority boundary

Only after every authorization-unit post-merge proof item succeeds may the repository state be interpreted as:

```text
P2-R3 IMPLEMENTATION AUTHORITY = EFFECTIVE FOR THE EXACT ALLOWLIST IN THIS RECORD
P2-R4+ = NOT AUTHORIZED
GENERAL KODACBENCH = NOT CLOSED
PUBLIC SUPERIORITY CLAIMS = NOT AUTHORIZED
WAIVER = NO
```

Successful authorization does not make P2-R3 implemented, tested, merged, or complete. Successful later P2-R3 implementation does not silently authorize P2-R4.

## Preserved constitutional invariants

```text
DONE != MODEL ASSERTION
EVIDENCE BEFORE CLAIMS
BENCHMARK EVIDENCE != EXECUTION AUTHORITY
ONE-REPORT SUMMARY != COMPARISON
SUMMARY != DIRECTION / THRESHOLD / RANKING / WINNER
REVIEWER OUTPUT = CLAIM / EVIDENCE, NOT COMPLETION TRUTH
K2 REMAINS THE TRUSTED SIDE-EFFECT EXECUTION BOUNDARY
K5 PROOF EVIDENCE != DONE GATE COMPLETION AUTHORITY
ROADMAP TEXT != IMPLEMENTATION AUTHORITY
WAIVER = NO
```
