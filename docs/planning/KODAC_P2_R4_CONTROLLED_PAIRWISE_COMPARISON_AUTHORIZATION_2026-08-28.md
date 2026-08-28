# Kodac P2-R4 Controlled Pairwise Comparison Authorization — 2026-08-28

## Status

```text
DOCUMENT TYPE: FOUNDER-AUTHORIZED IMPLEMENTATION GATE CANDIDATE
P2-R1 = CLOSED_CANONICAL
P2-R2 = CLOSED_CANONICAL
P2-R3 = CLOSED_CANONICAL
P2-R4 IMPLEMENTATION = AUTHORIZED ONLY AFTER THIS RECORD IS CANONICAL
P2-R5+ = NOT AUTHORIZED
GENERAL KODACBENCH = NOT CLOSED
PUBLIC SUPERIORITY CLAIMS = NOT AUTHORIZED
WAIVER = NO
```

This record is deny-by-default. It creates no effective P2-R4 implementation authority while it is only a branch or pull-request candidate. The bounded implementation authority below becomes effective only after this exact five-path authorization unit is qualified on one frozen exact head, merged normally into protected `main`, and its required post-merge proof succeeds.

## Exact canonical baseline

This candidate is prepared from protected canonical `main`:

```text
20cb3d2e277513fc3cefa71fe9fda03f25fd418a
```

That commit is the guarded normal merge of PR #242 and closes P2-R3 for its exact bounded explicit-reducer-policy and deterministic task-family-summary scope.

P2-R3 immutable closure anchors are:

```text
P2_R3_AUTHORIZATION_MERGE = d398983a457060dff0b700714d3eebbc4dce8e23
P2_R3_IMPLEMENTATION_PR = #242
P2_R3_QUALIFIED_HEAD = 6e1b6aa27591e997cbe164fd335e8bee08b11f1c
P2_R3_QUALIFIED_TREE = 3d040c6ae4b56573d55eb3b8dbecad3e79bdfdc3
P2_R3_MERGE = 20cb3d2e277513fc3cefa71fe9fda03f25fd418a
P2_R3_MERGE_PARENT_1 = d398983a457060dff0b700714d3eebbc4dce8e23
P2_R3_MERGE_PARENT_2 = 6e1b6aa27591e997cbe164fd335e8bee08b11f1c
P2_R3_MERGE_VERIFICATION = verified / valid
P2_R3_POST_MERGE_GOVERNANCE_RUN = 33188625032 / SUCCESS
P2_R3_POST_MERGE_K2_RUNTIME_RUN = 33188625005 / SUCCESS
RULESET = 20707483 / active / no bypass
```

The canonical P2-R3 blobs are:

```text
packages/kodac-runtime/bench/p2-r3/summary.ts
  = 1c0c79381ad89ca9051e0d37243a17f85ea19285
packages/kodac-runtime/test/p2-r3-summary.test.ts
  = 7abf8b25a90079928d441c376581357f69a9ec7d
docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_EVIDENCE_2026-08-28.md
  = 238ae10cd8c62aa40453574be720213d90c160d4
```

The post-merge governance run completed `provenance` and `legacy-tests` successfully. The post-merge K2 runtime run completed the runtime-change classifier, Ubuntu, Windows, macOS, and `k2-runtime-gate` successfully. Ruleset `20707483` remained active with `bypass_actors=[]` and `current_user_can_bypass=never`.

The committed P2-R3 evidence file remains a historical candidate-time artifact by design. It does not recursively encode its future merge. Current P2-R3 closure is established by the immutable GitHub object/check proof above.

Governing records include:

- `AGENTS.md`;
- `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`;
- `docs/adr/ADR-0010-benchmark-first-donor-selection.md`;
- `docs/planning/KODAC_REVIEW_PROVIDER_NEUTRALITY_AND_EVIDENCE_QUORUM_AMENDMENT_2026-08-27.md`;
- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`;
- the canonical P2-R1, P2-R2, and P2-R3 authorization/evidence records plus their immutable post-merge proof.

If live protected `main`, repository governance, or a more-specific canonical authority conflicts with this candidate before merge, reconcile forward without force-push, rebase, destructive history rewrite, or silent waiver.

## Exact authorization-unit changed-file set

This authorization/gate PR may change exactly these five paths and no others:

```text
docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_AUTHORIZATION_2026-08-28.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
```

This unit is documentation/governance only. It may not implement P2-R4.

The exact five-path set above governs changed-file qualification and required individual candidate blob capture. Missing any one of the five candidate blobs makes authorization qualification incomplete.

## P2-R4 purpose

P2-R1 established the frozen identity-bound benchmark corpus/manifest contract. P2-R2 established deterministic caller-materialized observation reports. P2-R3 established explicit reducer policy and deterministic task-family summaries while deliberately denying comparison, directionality, ranking, promotion, external execution, and public superiority claims.

P2-R4 closes only the next narrow semantic gap: a deterministic **controlled pairwise comparison** of two already-materialized local benchmark evidence sets under one explicit shared evaluation context and explicit per-metric direction policy.

The intended flow is:

```text
LEFT VALIDATED P2-R2 REPORT + LEFT VALIDATED P2-R3 SUMMARY
RIGHT VALIDATED P2-R2 REPORT + RIGHT VALIDATED P2-R3 SUMMARY
+ EXACT SHARED EVALUATION CONTEXT
+ EXPLICIT VERSIONED PER-METRIC DIRECTION POLICY
-> STRICT REPORT / SUMMARY CROSS-BINDING
-> SAME BENCHMARK / MANIFEST / CASE-TOPOLOGY PROOF
-> CONTROLLED-CONTEXT BINDING
-> DETERMINISTIC PER-METRIC RAW DELTAS
-> IMMUTABLE PAIRWISE COMPARISON IDENTITY
```

P2-R4 is not a benchmark executor, evaluator agent, statistical test engine, leaderboard, ranking engine, promotion gate, release gate, or product superiority-claim system.

## Authorized implementation allowlist

After this authorization becomes canonical, exactly one P2-R4 implementation PR may modify only:

```text
packages/kodac-runtime/bench/p2-r4/**
packages/kodac-runtime/test/p2-r4-*.test.ts
docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_EVIDENCE_2026-08-28.md
```

P2-R4 may import the already-canonical P2-R1 canonicalization/hash primitives, P2-R2 report schema/types, and P2-R3 summary schema/types/public summary function where useful. It may use committed local P2-R1 fixtures and in-memory P2-R2/R3 values in tests.

P2-R4 may not modify P2-R1, P2-R2, or P2-R3 bytes.

No package manifest, lockfile, workflow, CLI, product-runtime source, K2/K3/K4/K5/K6 source, adapter, provider, model, reviewer, evaluator, persistence, telemetry, release, or ruleset path is in the allowlist.

If a necessary change falls outside this allowlist, stop. A separate authorization is required.

## Untrusted-input and upstream revalidation boundary

P2-R4 must treat caller-supplied P2-R2 reports, P2-R3 summaries, shared evaluation context, and comparison policy as untrusted input even when TypeScript types are supplied.

Before semantic comparison, P2-R4 must:

1. cross the hardened P2-R1 canonical JSON boundary before semantic field reads;
2. require exact supported schema versions and exact-key structures;
3. revalidate both P2-R2 reports, including canonical ordering, identities, counts, measurement states, uniqueness, and finite numeric / boolean value rules;
4. revalidate both P2-R3 summaries, including exact task-family/metric ordering, count reconciliation, reducer/value-kind/missingness compatibility, reduced-value/status rules, and canonical summary identity;
5. require each summary `r2_report_identity` to equal its corresponding revalidated report `report_identity`;
6. reject stale, malformed, hostile, non-JSON, duplicate, cross-bound, or identity-mismatched evidence;
7. preserve upstream provenance rather than manufacturing evidence not present in the supplied contracts.

P2-R4 may duplicate the minimum validation logic needed to revalidate canonical P2-R2/R3 caller input if an upstream validator is intentionally not public. It may not weaken the upstream contract or change upstream bytes to make validation easier.

## Exact same-benchmark and same-task topology requirement

P2-R4 may compare only evidence that is demonstrably aligned to the same benchmark task material.

The two revalidated P2-R2 reports must have exact equality for:

```text
benchmark_id
benchmark_protocol_version
r1_manifest_set_digest
case_count
task-family set and ordering
case_id set and ordering within each task family
r1_result_identity for every case
metric_id set and ordering for every case
metric unit for every case/metric slot
```

`observation_set_digest`, `observation_count`, `missing_observation_count`, and `report_identity` may differ because the observed outcomes may differ.

Any task-family, case, R1-result identity, metric, unit, or manifest-set mismatch fails closed. P2-R4 does not align, impute, intersect, union, drop, rename, or normalize mismatched task material.

## Exact shared evaluation context

P2-R4 must require one exact-key, versioned, caller-supplied **shared evaluation context** that applies identically to both sides of the pair.

The context must contain identity-bearing references for the controlled dimensions required by ADR-0010:

```text
schema_version
model_provider_version_identity
configuration_identity
repository_task_snapshot_identity
hardware_execution_environment_identity
network_assumptions_identity
time_token_cost_budget_identity
attempt_policy_identity
allowed_tools_identity
prompt_instruction_policy_identity
scoring_method_identity
```

Every `*_identity` field must be a lowercase `sha256:` identity over a caller-maintained canonical descriptor for that dimension. A descriptor may canonically state `NOT_APPLICABLE`, but the field itself remains an identity so omission cannot masquerade as equality.

The shared context is one object, not separate left/right contexts. Therefore P2-R4 can only compare two subject revisions under the same declared model/provider, configuration, repository/task snapshot, hardware/execution environment, network assumptions, time/token/cost budget, attempt policy, allowed tools, prompt/instruction policy, and scoring method.

This narrow slice deliberately does **not** authorize comparisons where any controlled context dimension differs. Model-vs-model, provider-vs-provider, configuration-vs-configuration, prompt-policy-vs-prompt-policy, environment-vs-environment, or unequal-budget comparison requires a later separate authorization.

The implementation validates and binds these identities; it does not independently prove the truth of the external descriptors they name.

```text
CONTROLLED-CONTEXT IDENTITY BINDING != EXTERNAL PROVENANCE TRUTH
```

The `repository_task_snapshot_identity` must also be identity-bound into the comparison result. Exact equality of P2-R2 `r1_manifest_set_digest` and case topology remains independently required and cannot be replaced by this caller-supplied context digest.

## Exact subject descriptors

The pair must contain exactly two subject descriptors, `left` and `right`, each with exactly:

```text
schema_version
subject_id
system_version_commit_identity
raw_artifact_log_set_identity
```

`subject_id` is a canonical non-empty label used only for pair-local identification. Both identity fields must be lowercase `sha256:` identities.

`system_version_commit_identity` is the only controlled evaluation dimension intentionally allowed to differ between the two subjects in this slice. The two subject identities must be distinct. P2-R4 does not infer repository access, commit existence, model behavior, or execution truth from the digest alone.

`raw_artifact_log_set_identity` binds the caller's evidence set for each side and may differ by construction. P2-R4 does not read external logs, fetch artifacts, or execute them.

## Exact comparison-policy contract

P2-R4 must define one exact-key, versioned comparison-policy document with exactly:

```text
schema_version
benchmark_id
benchmark_protocol_version
left_summary_identity
right_summary_identity
shared_evaluation_context_identity
metric_directions
```

The policy must bind exactly to the two validated P2-R3 summaries and the derived identity of the validated shared evaluation context.

Each `metric_directions` entry must have exactly:

```text
schema_version
task_family
metric_id
input_unit
output_unit
value_kind
reducer
missingness_policy
minimum_observed_count
direction
```

Closed direction vocabulary:

```text
HIGHER_IS_BETTER
LOWER_IS_BETTER
```

Direction is explicit caller policy and is never inferred from metric name, unit, reducer, value distribution, benchmark family, or prior result.

For a metric to be pairwise comparable, the corresponding left/right P2-R3 metric summaries must match exactly on:

```text
task_family
metric_id
input_unit
output_unit
value_kind
reducer
missingness_policy
minimum_observed_count
expected_count
```

The policy entry must match those semantic fields exactly. Unknown metrics, duplicate entries, cross-task bindings, unit drift, reducer drift, missingness drift, minimum-count drift, or expected-count drift fail closed.

Metrics without an explicit direction policy remain uncompared rather than receiving an inferred default.

## Exact per-metric comparison semantics

P2-R4 may produce only per-task-family, per-metric pairwise comparison records. Task families remain separate. No cross-metric or cross-task aggregate is authorized.

Closed comparison status vocabulary:

```text
COMPARABLE
INSUFFICIENT_EVIDENCE
```

A metric is `COMPARABLE` only when both corresponding P2-R3 metric summaries have `status = REDUCED` and both reduced values are finite numbers.

For `COMPARABLE`, the result may expose exactly the bounded numeric relation:

```text
left_value
right_value
raw_delta_left_minus_right
```

where:

```text
raw_delta_left_minus_right = left_value - right_value
```

The subtraction must either produce a finite result or fail closed. No epsilon, tolerance, threshold, target band, clipping, normalization, percentage change, ratio, confidence interval, significance test, or domain-specific utility transformation is authorized.

The explicit `direction` is preserved beside the raw delta but P2-R4 must not materialize a `winner`, `loser`, `better`, `worse`, `advantage`, `dominates`, `pass`, `fail`, `promote`, or equivalent verdict field.

If either side is `INSUFFICIENT_EVIDENCE`, the pairwise metric status is `INSUFFICIENT_EVIDENCE` and all comparison numeric fields are null. P2-R4 must preserve both sides' exact expected/observed/missing/unavailable coverage and may not treat missing/unavailable evidence as zero, false, loss, tie, or failure.

Equal raw values are merely equal raw values. P2-R4 does not assign a tie verdict.

## Exact output contract

P2-R4 must produce a deeply immutable deterministic comparison object whose top-level identity binds every evidence-bearing field except its own identity.

The top-level object must include exact versioned fields for:

```text
schema_version
benchmark_id
benchmark_protocol_version
left_subject
right_subject
left_r2_report_identity
right_r2_report_identity
left_summary_identity
right_summary_identity
shared_evaluation_context_identity
comparison_policy_identity
task_family_comparisons
comparison_identity
```

Each task-family comparison contains only its exact `task_family` and deterministically sorted metric comparisons. Each metric comparison must preserve the explicit policy semantics, both sides' summary status/coverage/value evidence, closed pairwise status, and the bounded raw delta described above.

`comparison_identity` must be derived from every canonical evidence-bearing field except `comparison_identity` itself. Caller object iteration order, timestamps, absolute paths, locale, host state, wall-clock time, process state, and nondeterministic map/set ordering must not affect identity.

Returned objects must be recursively frozen and independent from caller mutation after return.

## No ranking, statistical, promotion, or public-claim semantics

P2-R4 authorizes exactly one pair at a time and exact per-metric raw deltas only.

It does not authorize:

- N-way comparison;
- ranking or leaderboard position;
- `best`, `winner`, `superior`, `beats`, `safer`, `cheaper`, or product-level claim;
- weighted/blended/universal score;
- cross-task normalization;
- threshold, target band, pass/fail, acceptance, release, or promotion decision;
- Pareto dominance;
- statistical significance, confidence interval, hypothesis test, bootstrap, uncertainty model, or multiple-comparison correction;
- aggregation of directional deltas into a system verdict;
- automatic donor replacement, strategy promotion, routing change, or `PROVEN_READY` decision.

ADR-0010's public-claim gate remains fully intact. A bounded P2-R4 comparison record is evidence, not a public superiority claim and not completion truth.

## No execution or side-effect authority

P2-R4 is pure, local, deterministic, and in-memory. It may only consume caller-supplied already-materialized evidence.

It does not authorize:

- provider/model/reviewer/evaluator/tool/agent invocation;
- benchmark task execution;
- network access or secret handling;
- subprocess, compiler, test-runner, sandbox, container, or external benchmark execution;
- filesystem output, database access, persistent storage, cache, telemetry, upload, or analytics egress;
- new dependencies or donor/source/data intake;
- CLI/product integration;
- K2/K5/Done Gate/`PROVEN_READY` authority expansion;
- training, fine-tuning, online learning, or cross-repository aggregation;
- release, package publication, public version, brand launch, or ruleset mutation/bypass.

## Hostile-structure and canonicalization boundary

P2-R4 must reuse the hardened P2-R1 canonical JSON boundary before semantic reads of caller-supplied reports, summaries, contexts, subjects, or policies.

Fail closed on unsupported or hostile values including, where applicable:

- Proxies;
- accessors/getters;
- symbol properties;
- non-plain object prototypes;
- sparse, accessor, extended, or non-canonical arrays;
- cycles;
- `undefined`, functions, bigint, symbols, non-finite numbers, or other non-JSON values;
- unknown or missing exact contract fields.

An own JSON key named `__proto__` must remain ordinary data and must not mutate an intermediate object's prototype.

## Required implementation tests

A later P2-R4 implementation must include focused tests proving at minimum:

1. canonical P2-R1 fixture -> P2-R2 report -> P2-R3 summary -> P2-R4 comparison interoperability;
2. exact revalidation of both R2 reports and both R3 summaries after the hostile-input boundary;
3. summary-to-report identity cross-binding;
4. benchmark/protocol/manifest equality;
5. exact task-family/case/R1-result/metric/unit topology equality;
6. rejection of topology mismatch, case mismatch, metric mismatch, unit mismatch, or manifest mismatch;
7. exact shared evaluation-context key/schema/identity behavior;
8. all controlled context dimensions identity-bound and deterministic;
9. exactly two distinct subject identities;
10. exact subject descriptor validation;
11. explicit `HIGHER_IS_BETTER` / `LOWER_IS_BETTER` policy only;
12. no inferred direction;
13. exact left/right metric-policy semantic equality requirements;
14. raw finite `left - right` delta behavior;
15. subtraction overflow/non-finite result fails closed;
16. dual-REDUCED requirement for `COMPARABLE`;
17. either-side insufficiency yields `INSUFFICIENT_EVIDENCE` and null comparison numbers;
18. exact preservation of both sides' coverage evidence;
19. task-family separation and deterministic metric ordering;
20. unspecifed metrics remain uncompared;
21. deterministic repeated identity under caller key-order variation;
22. identity changes when any evidence-bearing input changes;
23. deep immutability and caller-mutation independence;
24. hostile Proxy/accessor/sparse/non-JSON rejection;
25. `__proto__` no-pollution behavior;
26. timestamps/paths/locale/host/process noise excluded from identity;
27. negative-space proof for ranking/winner/superiority/threshold/statistical/promotion vocabulary;
28. negative-space proof for provider/model/evaluator execution, network, subprocess, persistence, telemetry, dependency, CLI/product, release, and ruleset authority.

Tests must not invoke real providers/models/reviewers/evaluators, network services, subprocesses, external benchmarks, or persistent stores.

## Exact implementation evidence record

The later implementation PR must include exactly one implementation evidence record:

```text
docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_EVIDENCE_2026-08-28.md
```

The evidence record must be candidate-time and self-reference-safe. It may bind its implementation/test parent and exact implementation/test blobs, but it must not claim its own future merge or `CLOSED_CANONICAL` status.

Final qualification must bind externally:

- exact final implementation PR head;
- exact final tree;
- exact implementation blob(s);
- exact test blob(s);
- exact evidence blob;
- exact-head required CI;
- two qualifying independent substantive semantic review channels;
- zero unresolved actionable review threads;
- exact changed-file allowlist;
- `behind_by=0` and mergeability;
- active no-bypass ruleset;
- guarded normal merge with exact `expected_head_sha`;
- post-merge main/parents/tree/blobs/signature/checks/ruleset proof.

## Authorization-candidate qualification gate

Do not merge this authorization unit unless one frozen exact final head proves all of the following:

1. canonical base ref is exactly `main` and live protected `main` still equals the baseline recorded by the final candidate, or the candidate has been forward-reconciled non-destructively and fully requalified;
2. changed files are exactly the five documentation paths authorized above, with no rename/copy and all five exact final blobs captured;
3. `behind_by=0` against protected `main`;
4. PR is open, non-draft, and mergeable;
5. required exact-head repository checks are terminal success, including trusted `provenance`, `legacy-tests`, and `k2-runtime-gate` where applicable;
6. at least two distinct independent external substantive semantic reviewer channels are terminal-clean on the exact final head under the provider-neutral quorum policy;
7. zero unresolved material findings and zero unresolved actionable review threads;
8. ruleset `20707483` is active with strict required contexts/thread resolution, `bypass_actors=[]`, and `current_user_can_bypass=never`;
9. `WAIVER=NO`;
10. normal history-preserving merge uses the exact qualified `expected_head_sha`;
11. post-merge proof establishes protected `main`, ordered parents, candidate/merge tree equality, all five document blobs, valid GitHub merge verification, applicable post-merge protected checks, and unchanged active/no-bypass ruleset state.

Any repository-byte change invalidates prior exact-head CI or semantic-review evidence. Any canonical-base movement requires non-destructive forward reconciliation and full requalification. No force-push, rebase, destructive history rewrite, stale-head reuse, silent waiver, or governance bypass is permitted.

## State after canonical adoption only

Only after every authorization-unit post-merge proof item succeeds may repository state be interpreted as:

```text
P2-R1 = CLOSED_CANONICAL
P2-R2 = CLOSED_CANONICAL
P2-R3 = CLOSED_CANONICAL
P2-R4 IMPLEMENTATION AUTHORITY = EFFECTIVE FOR THE EXACT ALLOWLIST IN THIS RECORD
P2-R5+ = NOT AUTHORIZED
GENERAL KODACBENCH = NOT CLOSED
PUBLIC SUPERIORITY CLAIMS = NOT AUTHORIZED
WAIVER = NO
```

Successful authorization does not make P2-R4 implemented, tested, merged, or complete. Successful later P2-R4 implementation does not silently authorize P2-R5, external execution, ranking, promotion, release, or public superiority claims.

## Preserved constitutional invariants

```text
DONE != MODEL ASSERTION
REVIEW != PROOF
TESTS GREEN != COMPLETE CORRECTNESS
BENCHMARK EVIDENCE != EXECUTION AUTHORITY
PAIRWISE DELTA != WINNER
DIRECTION POLICY != PROMOTION AUTHORITY
CONTROLLED-CONTEXT IDENTITY != EXTERNAL TRUTH
SELF-IMPROVING != SELF-AUTHORIZING
```
