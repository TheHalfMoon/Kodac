# Kodac P2-R5 — Directional Metric Relation Implementation Evidence Candidate

Date: 2026-08-28

```text
DOCUMENT TYPE = P2-R5 IMPLEMENTATION EVIDENCE CANDIDATE
P2-R1 = CLOSED_CANONICAL
P2-R2 = CLOSED_CANONICAL
P2-R3 = CLOSED_CANONICAL
P2-R4 = CLOSED_CANONICAL
P2-R5 = AUTHORIZED / IMPLEMENTATION CANDIDATE / NOT CLOSED_CANONICAL
P2-R6+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
GENERAL KODACBENCH = OPEN
PUBLIC SUPERIORITY CLAIMS = NOT AUTHORIZED
WAIVER = NO
```

This record is candidate-time evidence only. It does not claim that the eventual final PR head has qualified, merged, or closed canonically. Adding this file changes the branch head after the implementation/test parent described below; therefore all final qualification checks and semantic reviews must run again on the exact evidence-bearing final head.

---

## 1. Canonical authorization

P2-R5 implementation authority became effective only after the exact authorization record qualified, merged normally, and passed its applicable post-merge proof.

```text
AUTHORIZATION_PR = #246
AUTHORIZATION_CANDIDATE_HEAD = 9796d6e383040460b0b5e6e7179667847f44eddb
AUTHORIZATION_CANDIDATE_TREE = 72da430dad9b2b859e63d6e5e5ab4fb3a3b5229b
AUTHORIZATION_MERGE = f1f33a01a3d5c764ac59a292464322c3c7c7b3de
AUTHORIZATION_MERGE_PARENT_1 = 16c2e410fe3e62eb0c5bed6f0640dffd9c5e1f4f
AUTHORIZATION_MERGE_PARENT_2 = 9796d6e383040460b0b5e6e7179667847f44eddb
AUTHORIZATION_MERGE_TREE = 72da430dad9b2b859e63d6e5e5ab4fb3a3b5229b
AUTHORIZATION_MERGE_VERIFICATION = verified / valid
AUTHORIZATION_BLOB = da50eae12ac8331fe2c650633dc3ece1f987f56f
AUTHORIZATION_POST_MERGE_GOVERNANCE = 33197842194 / SUCCESS
AUTHORIZATION_K2_PUSH = NOT_APPLICABLE_BY_WORKFLOW_PUSH_PATH_FILTER
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The authorization permits one bounded implementation PR using only:

```text
packages/kodac-runtime/bench/p2-r5/**
packages/kodac-runtime/test/p2-r5-*.test.ts
docs/planning/KODAC_P2_R5_DIRECTIONAL_METRIC_RELATION_EVIDENCE_2026-08-28.md
```

P2-R1/R2/R3/R4 bytes remain immutable in this unit.

---

## 2. Implementation/test parent

The trustworthy implementation/test parent before this evidence file was created is:

```text
IMPLEMENTATION_TEST_PARENT = 4c82f80364387df45032bf80e573f50fe1f9e169
IMPLEMENTATION_TEST_PARENT_TREE = a99c64dc666c9e90648233f94333e0f69d147ab7
BASE = f1f33a01a3d5c764ac59a292464322c3c7c7b3de
AHEAD_BY = 4
BEHIND_BY = 0
CHANGED_FILES = 2
```

Exact parent paths and blobs:

```text
packages/kodac-runtime/bench/p2-r5/relation.ts
  = e55e2ce138ab88132f0fddb79faa3ecac8db4e14
packages/kodac-runtime/test/p2-r5-relation.test.ts
  = ce9406bb3befca3222241e8f470bb90945d6aaf8
```

No R1/R2/R3/R4 source/test/evidence byte, workflow, schema, manifest, lockfile, dependency, root export, CLI, product, release, provider/model configuration, persistence, telemetry, or ruleset path changed at this parent.

---

## 3. Machine evidence on the implementation/test parent

Governance run:

```text
RUN = 33198962206
HEAD = 4c82f80364387df45032bf80e573f50fe1f9e169
legacy-tests = SUCCESS
provenance = SUCCESS
```

K2 runtime run:

```text
RUN = 33198962162
HEAD = 4c82f80364387df45032bf80e573f50fe1f9e169
runtime-change-classifier = SUCCESS
runtime (ubuntu-latest) = SUCCESS
  Typecheck = SUCCESS
  Test = SUCCESS
  Patch benchmark hook = SUCCESS
runtime (macos-latest) = SUCCESS
  Typecheck = SUCCESS
  Test = SUCCESS
  Patch benchmark hook = SUCCESS
runtime (windows-latest) = SUCCESS
  Typecheck = SUCCESS
  Test = SUCCESS
  Patch benchmark hook = SUCCESS
k2-runtime-gate = SUCCESS
```

These are precursor machine proofs for the implementation/test parent. They are not reused as final exact-head qualification after this evidence file changes the branch head.

---

## 4. Preserved historical failed WIP evidence

An earlier WIP head was not qualified and remains historical failure evidence:

```text
WIP_HEAD = 9169883db3239289f76886a75cb5563a8d65c099
K2_RUN = 33198255234 / FAILURE
runtime-change-classifier = SUCCESS
runtime ubuntu/macos/windows = FAILURE AT TYPECHECK
k2-runtime-gate = FAILURE
```

The failure was an implementation-local TypeScript narrowing defect. Tests did not run on that head. It was repaired forward without force-push, rebase, waiver, or destructive history rewriting. The failed run is not relabeled as success.

---

## 5. Implemented contract

The implementation exposes one pure in-memory derivation boundary:

```text
deriveP2R5Relations(comparisonInput: unknown) -> P2R5RelationSet
```

It accepts one caller-materialized P2-R4 comparison as untrusted serialized evidence. Before semantic reads, it crosses the canonical JSON boundary inherited from P2-R1, which fails closed for non-JSON values, non-finite numbers, proxies, accessors/non-data properties, cycles, sparse/non-canonical arrays, and related hostile structures.

The implementation independently revalidates the R4 evidence it consumes, including:

- exact top-level comparison keys and `p2-r4-comparison/v1` schema;
- canonical benchmark/protocol strings;
- exact left/right subject descriptor keys and schema;
- lowercase SHA-256 identities;
- distinct `subject_id` values;
- distinct `system_version_commit_identity` values;
- exact task-family and metric key sets;
- strictly sorted, duplicate-free task families and metrics;
- metric semantic fields: units, value kind, reducer, missingness policy, minimum count, expected count, and direction;
- nested R3 summary key sets, coverage arithmetic, missingness sufficiency status, reducer/value-kind compatibility, unit behavior, nullability, and BOOLEAN_TRUE_RATE count arithmetic;
- exact semantic agreement between both nested summaries and the R4 metric envelope;
- R4 `COMPARABLE` versus `INSUFFICIENT_EVIDENCE` derivation;
- finite comparable left/right values;
- exact binding of comparable values to nested reduced values;
- exact finite `raw_delta_left_minus_right = left_value - right_value` recomputation;
- null pairwise values/delta under insufficient evidence;
- full canonical R4 `comparison_identity` recomputation.

No caller-supplied comparison identity, status, direction, value, delta, summary coverage, or semantic field is trusted merely because it is present.

---

## 6. Directional relation semantics

The only emitted relation vocabulary is:

```text
LEFT_FAVORED_BY_DIRECTION
RIGHT_FAVORED_BY_DIRECTION
EQUAL_RAW_VALUE
INSUFFICIENT_EVIDENCE
```

For `COMPARABLE` metrics:

```text
left_value === right_value
  -> EQUAL_RAW_VALUE

HIGHER_IS_BETTER and left_value > right_value
  -> LEFT_FAVORED_BY_DIRECTION
HIGHER_IS_BETTER and left_value < right_value
  -> RIGHT_FAVORED_BY_DIRECTION

LOWER_IS_BETTER and left_value < right_value
  -> LEFT_FAVORED_BY_DIRECTION
LOWER_IS_BETTER and left_value > right_value
  -> RIGHT_FAVORED_BY_DIRECTION
```

For `INSUFFICIENT_EVIDENCE` metrics:

```text
relation = INSUFFICIENT_EVIDENCE
```

Equality is exact raw numeric equality only. There is no epsilon, tolerance, threshold, target band, rounding rule, practical-significance rule, normalized utility, or percentage interpretation.

Direction changes only the local relation interpretation. The R4 raw delta remains exactly left minus right and is never reoriented.

---

## 7. Output and identity

R5 preserves task-family separation and all metric-local R4 evidence. Each metric relation carries the original validated semantic fields, direction, nested left/right summaries, status, values, and raw delta plus the derived relation.

The relation-set identity binds:

```text
schema_version
benchmark_id
benchmark_protocol_version
r4_comparison_identity
left_subject
right_subject
shared_evaluation_context_identity
comparison_policy_identity
task_family_relations
```

`relation_set_identity` is derived with canonical SHA-256 and is excluded from its own preimage. The returned result is recursively frozen and detached from later caller mutation.

---

## 8. Focused proof behaviors

The focused R5 tests on the implementation/test parent prove, among other behaviors:

1. exact four-value relation vocabulary;
2. higher-is-better left favored;
3. higher-is-better right favored;
4. lower-is-better left favored;
5. lower-is-better right favored;
6. exact raw equality;
7. insufficient evidence never infers a side;
8. pairwise null preservation for insufficient evidence;
9. left-minus-right delta orientation remains direction-independent;
10. BOOLEAN_TRUE_RATE evidence validation;
11. deterministic repeated output;
12. canonical relation-set identity recomputation;
13. valid evidence changes alter identities;
14. deep freeze;
15. caller-mutation independence;
16. object-key reordering is non-identity-bearing;
17. tampered R4 comparison identity rejection;
18. tampered raw delta rejection even after outer identity rebinding;
19. pairwise/nested-summary mismatch rejection;
20. invalid coverage/status rejection;
21. invalid direction rejection;
22. unknown top-level field rejection;
23. missing top-level field rejection;
24. unsorted metric rejection;
25. duplicate metric rejection;
26. unsorted task-family rejection;
27. duplicate task-family rejection;
28. same subject-id rejection;
29. same system-version identity rejection;
30. Proxy rejection;
31. accessor rejection without getter execution;
32. cyclic input rejection;
33. sparse-array rejection;
34. bigint/non-JSON rejection;
35. non-finite numeric rejection;
36. absence of global winner/score/ranking/threshold/tolerance/promotion output fields.

The full runtime test suite and patch benchmark hook also pass on all three required operating systems at the parent head.

---

## 9. Explicit non-grants

This implementation does not create or authorize:

- a global winner, loser, better/worse system verdict, or superiority claim;
- N-way ranking or leaderboard;
- weighted, blended, normalized, composite, or universal score;
- threshold, target, tolerance, epsilon, or practical-significance band;
- ratio/percentage improvement semantics beyond pre-existing metric units;
- Pareto analysis;
- statistics, significance testing, confidence intervals, bootstrap, or hypothesis tests;
- donor replacement or strategy promotion;
- routing, fallback, retry, or execution decisions;
- provider/model/reviewer/evaluator/agent invocation;
- benchmark task execution;
- network, secret, subprocess, sandbox, or side-effect authority;
- persistence, telemetry, memory, or learning;
- new dependencies or donor intake;
- root export, CLI, product, package, release, or public-claim integration;
- K2, K5, Done Gate, or `PROVEN_READY` expansion;
- ruleset mutation or bypass;
- P2-R6+ or P3-P8 implementation authority.

`WAIVER=NO` remains in force.

---

## 10. Final qualification still required

Because this evidence record itself advances the branch, P2-R5 remains `NOT CLOSED_CANONICAL` unless one frozen final exact head proves all of the following:

1. canonical `main` is still the expected authorization merge or the branch is forward-reconciled without rebase;
2. `behind_by=0`;
3. the diff contains exactly the three authorized paths and no rename/copy;
4. exact final blobs are captured for implementation, tests, and this evidence record;
5. PR is open, non-draft, and mergeable;
6. exact-final-head `provenance` and `legacy-tests` are SUCCESS;
7. exact-final-head K2 classifier, Ubuntu, macOS, Windows, and `k2-runtime-gate` are SUCCESS;
8. at least two distinct independent external substantive semantic reviewer channels are terminal-clean on the exact final head;
9. no unresolved material finding or actionable review thread remains;
10. ruleset `20707483` remains active with no bypass actor and `current_user_can_bypass=never`;
11. `WAIVER=NO`;
12. normal guarded merge uses the exact qualified `expected_head_sha`;
13. post-merge proof verifies canonical main, ordered parents, merge tree, exact canonical blobs, verified/valid merge signature, all applicable post-merge checks, and unchanged no-bypass ruleset.

Only after those conditions succeed may P2-R5 be called `CLOSED_CANONICAL`.
