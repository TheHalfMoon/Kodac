# Kodac P2-R5 — Directional Metric Relation Authorization Candidate

Date: 2026-08-28
Decision owner: Kodac founder

```text
DOCUMENT TYPE = FOUNDER-AUTHORIZED IMPLEMENTATION GATE CANDIDATE
P2-R1 = CLOSED_CANONICAL
P2-R2 = CLOSED_CANONICAL
P2-R3 = CLOSED_CANONICAL
P2-R4 = CLOSED_CANONICAL
P2-R5 IMPLEMENTATION = AUTHORIZED ONLY AFTER THIS EXACT RECORD IS CANONICAL AND POST-MERGE PROVEN
P2-R6+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
GENERAL KODACBENCH = NOT CLOSED
PUBLIC SUPERIORITY CLAIMS = NOT AUTHORIZED
WAIVER = NO
```

This record is deny-by-default. Candidate text on a branch or pull request does not grant P2-R5 implementation authority. Authority becomes effective only after this exact authorization unit qualifies on one frozen exact head, merges normally into protected `main`, and the required post-merge proof succeeds.

---

## 1. Canonical predecessor truth

Canonical main at authorization-candidate creation:

```text
CANONICAL_MAIN = 16c2e410fe3e62eb0c5bed6f0640dffd9c5e1f4f
CANONICAL_TREE = ad447c01eb661713e148fabe0df153ac0c547dbc
P2_R4_AUTHORIZATION = PR #243 / 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26
P2_R4_QUALIFIED_HEAD = c0b1098dd45ec3b6a76ec2abf094813624a9ae56
P2_R4_QUALIFIED_TREE = 691279ea5f4e4bea5dcdaf189d0f378260399033
P2_R4_IMPLEMENTATION_MERGE = PR #244 / a97436df6008e37baf544345893b414d70b40c19
P2_R4_CLOSEOUT_RECONCILIATION = PR #245 / 16c2e410fe3e62eb0c5bed6f0640dffd9c5e1f4f
P2_R4_RECONCILIATION_PARENT_1 = a97436df6008e37baf544345893b414d70b40c19
P2_R4_RECONCILIATION_PARENT_2 = a7da834a6a9d4f60cd703704a139170224d5b4a0
P2_R4_RECONCILIATION_VERIFICATION = verified / valid
P2_R4_RECONCILIATION_POST_MERGE_GOVERNANCE = 33197106861 / SUCCESS
P2_R4_RECONCILIATION_K2_PUSH = NOT_APPLICABLE_BY_WORKFLOW_PUSH_PATH_FILTER
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

The R4 closeout reconciliation changed only current documentation/status views. The canonical reconciliation blobs are:

```text
docs/roadmap/NEXT.md
  = 15556a3b1f366059e045a219dc8f6611da18f09a
docs/roadmap/ROADMAP.md
  = b387012d7834c514d96da614bc79e20e8041a363
docs/roadmap/MILESTONES.md
  = 37e0c33eaecdc00b3b35ac14ad5a2e8800b3217c
docs/product/STATUS.md
  = c4a8b170fd052ecf3858c21b9088065d0813b92b
```

The K2 workflow push trigger is path-filtered to runtime/provenance/workflow surfaces. Because reconciliation PR #245 changed only documentation/status paths, no K2 push run was applicable. Its exact-head pull-request K2 gate had already succeeded before guarded merge. This record does not relabel a non-applicable push workflow as green.

Canonical P2-R4 implementation blobs remain:

```text
packages/kodac-runtime/bench/p2-r4/comparison.ts
  = 78c1417e51f1c36989ec7ec700a3424df3b58944
packages/kodac-runtime/test/p2-r4-comparison.test.ts
  = 844eba6eb456752925f914c732ccfccf2778b050
packages/kodac-runtime/test/p2-r4-key-order.test.ts
  = c15908c3dc4221f92347b97a93b9504fce65baf0
docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_EVIDENCE_2026-08-28.md
  = 9830a418b274f5d740c12236e87dd0981303f8c7
```

R4 established controlled, task-family-separated, per-metric raw pairwise comparison under one exact shared evaluation context and explicit direction policy. It intentionally did not emit winner/loser/better/worse semantics.

---

## 2. Authorization unit

This authorization candidate is exactly one documentation/governance path:

```text
docs/planning/KODAC_P2_R5_DIRECTIONAL_METRIC_RELATION_AUTHORIZATION_2026-08-28.md
```

This candidate may not implement P2-R5. It grants no source, test, fixture, schema, workflow, dependency, provider/model, persistence, execution, release, or ruleset mutation authority while non-canonical.

Any change to this candidate after qualification invalidates all prior exact-head CI/review evidence and requires qualification from scratch.

---

## 3. Purpose

P2-R5 closes one narrow semantic gap left intentionally open by P2-R4:

```text
VALIDATED P2-R4 COMPARISON
-> REVALIDATE EXACT R4 STRUCTURE / IDENTITY / METRIC EVIDENCE
-> INTERPRET EACH COMPARABLE METRIC USING ITS ALREADY-EXPLICIT R4 DIRECTION
-> MATERIALIZE ONE METRIC-LOCAL RELATION
-> PRESERVE TASK-FAMILY SEPARATION
-> DERIVE ONE IMMUTABLE DETERMINISTIC R5 RELATION-SET IDENTITY
```

P2-R5 does **not** decide which system is globally better. It does not aggregate across metrics or task families. It records only the direction-aware relation already implied by one exact metric's finite raw values and explicit R4 direction.

---

## 4. Required input boundary

The later implementation may accept exactly one caller-materialized P2-R4 comparison as untrusted input.

R4 currently exports `compareP2R4(...)` but does not export a standalone serialized-comparison validator. Therefore P2-R5 may duplicate only the minimum deterministic structural/identity validation required to independently validate a serialized P2-R4 comparison. This permission does not authorize changes to P2-R4, weakening of R4 checks, or general-purpose validator refactoring outside the R5 allowlist.

The R5 validator must fail closed unless the supplied R4 comparison proves all of the following:

- exact `P2_R4_COMPARISON_SCHEMA` version;
- exact closed top-level keys;
- exact closed subject keys and subject schema versions;
- lowercase `sha256:` grammar for every R4 identity field;
- distinct left/right subject IDs;
- distinct left/right system/version/commit identities;
- exact canonical task-family ordering;
- exact canonical metric ordering inside each task family;
- exact closed metric-comparison keys;
- closed direction vocabulary `HIGHER_IS_BETTER` / `LOWER_IS_BETTER`;
- closed status vocabulary `COMPARABLE` / `INSUFFICIENT_EVIDENCE`;
- exact R3 summary substructure required by the R4 metric comparison;
- exact matching left/right metric semantics for metric ID, input/output unit, value kind, reducer, missingness policy, minimum observed count, and expected count;
- exact R4 status/value/nullability invariants;
- finite numeric left/right values and finite raw delta for `COMPARABLE` metrics;
- null left/right/raw-delta values for `INSUFFICIENT_EVIDENCE` metrics where required by the canonical R4 contract;
- exact recomputation of `raw_delta_left_minus_right = left_value - right_value` for every comparable metric, including fail-closed rejection if subtraction is non-finite;
- exact recomputation of `comparison_identity` over the canonical R4 identity preimage;
- no unknown fields at any R5-inspected R4 layer;
- no non-canonical array ordering that can self-assert a recomputed identity.

R5 must treat caller-provided `comparison_identity`, metric status, values, raw delta, and direction as claims to be revalidated, not trusted authority.

---

## 5. R5 relation vocabulary

The only authorized relation vocabulary is:

```text
LEFT_FAVORED_BY_DIRECTION
RIGHT_FAVORED_BY_DIRECTION
EQUAL_RAW_VALUE
INSUFFICIENT_EVIDENCE
```

No aliases, severity levels, confidence labels, tie tolerance, pass/fail vocabulary, ranking labels, or product-level adjectives are authorized.

### 5.1 Insufficient evidence

If the validated R4 metric has:

```text
status = INSUFFICIENT_EVIDENCE
```

R5 must emit exactly:

```text
relation = INSUFFICIENT_EVIDENCE
```

It may not infer a side advantage from coverage counts, missingness shape, raw source counts, nulls, or any other field.

### 5.2 Exact equality

If the validated R4 metric is `COMPARABLE` and:

```text
left_value === right_value
```

R5 must emit exactly:

```text
relation = EQUAL_RAW_VALUE
```

There is no epsilon, tolerance, rounding band, practical-significance band, or approximate equality in this slice.

### 5.3 Higher is better

For a validated `COMPARABLE` metric with:

```text
direction = HIGHER_IS_BETTER
```

R5 may derive only:

```text
left_value > right_value -> LEFT_FAVORED_BY_DIRECTION
left_value < right_value -> RIGHT_FAVORED_BY_DIRECTION
left_value === right_value -> EQUAL_RAW_VALUE
```

### 5.4 Lower is better

For a validated `COMPARABLE` metric with:

```text
direction = LOWER_IS_BETTER
```

R5 may derive only:

```text
left_value < right_value -> LEFT_FAVORED_BY_DIRECTION
left_value > right_value -> RIGHT_FAVORED_BY_DIRECTION
left_value === right_value -> EQUAL_RAW_VALUE
```

The relation is descriptive benchmark evidence only. `FAVORED_BY_DIRECTION` does not mean winner, superior system, accepted donor, promoted strategy, production-ready system, or release recommendation.

---

## 6. Required R5 output contract

The later implementation must produce one deeply immutable deterministic relation set.

Top-level output keys must be exactly:

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
relation_set_identity
```

The R5 schema/version constant must be a new closed version such as:

```text
p2-r5-directional-metric-relation-set/v1
```

Each task-family record must contain exactly:

```text
task_family
metrics
```

Each metric relation must contain exactly the R4 semantic/evidence fields needed to make the relation inspectable without hidden inference:

```text
metric_id
input_unit
output_unit
value_kind
reducer
missingness_policy
minimum_observed_count
expected_count
direction
left_summary
right_summary
status
left_value
right_value
raw_delta_left_minus_right
relation
```

R5 must preserve the validated R4 left/right subject descriptors, exact comparison-policy identity, exact shared-evaluation-context identity, exact metric coverage summaries, and exact raw values/delta. It may not discard the evidence fields and expose only the relation label.

Task families and metrics remain deterministically ordered exactly as validated from R4.

`relation_set_identity` must be a lowercase `sha256:` identity over the exact canonical R5 output preimage excluding only `relation_set_identity` itself.

Repeated semantically identical validated input must produce byte-identical canonical output and the same identity. Caller object-key insertion order must not affect output bytes or identity.

Returned objects and all nested arrays/objects must be deeply frozen and independent of later caller mutation.

---

## 7. Hostile-input / canonicalization requirements

The later implementation must follow the hardened P2 canonical boundary rather than ordinary permissive JavaScript object traversal.

At minimum it must fail closed on:

- root or nested `Proxy` values before caller traps can become semantic authority;
- accessor/getter/setter properties before execution of those hooks;
- symbol keys;
- custom prototypes where plain JSON objects are required;
- sparse arrays;
- cycles;
- `bigint`, `undefined`, functions, symbols, non-finite numbers, and other non-JSON values;
- unpaired Unicode surrogates where canonical JSON rejects them;
- unexpected fields;
- unsupported schema versions;
- malformed identities;
- non-canonical task-family/metric order;
- duplicate task-family or metric identities;
- inconsistent R4 status/value/nullability combinations;
- recomputed-delta mismatch;
- recomputed R4 comparison-identity mismatch;
- recomputed R5 relation-set-identity mismatch when validating serialized R5 output.

`__proto__` must remain ordinary data where admitted by the canonical JSON layer and must never cause prototype pollution.

R5 must not use locale, clock, random state, process environment, hostname, absolute workspace paths, or other ambient state as semantic identity inputs.

---

## 8. Explicitly forbidden semantics

P2-R5 may not materialize, infer, claim, or authorize any of the following:

```text
GLOBAL WINNER / LOSER
SYSTEM BETTER / WORSE / SUPERIOR / INFERIOR
N-WAY COMPARISON
RANKING
LEADERBOARD POSITION
TOP-K SYSTEM SELECTION
WEIGHTED / BLENDED / UNIVERSAL SCORE
CROSS-TASK NORMALIZATION
PERCENTAGE CHANGE
NORMALIZED UTILITY
PARETO DOMINANCE
THRESHOLD
TARGET BAND
TOLERANCE / EPSILON BAND
PASS / FAIL
ACCEPT / REJECT
STATISTICAL SIGNIFICANCE
CONFIDENCE INTERVAL
BOOTSTRAP
HYPOTHESIS TEST
UNCERTAINTY MODEL
P-VALUE
EFFECT-SIZE POLICY
DONOR REPLACEMENT DECISION
STRATEGY PROMOTION
ROUTING / FALLBACK / RETRY DECISION
RELEASE DECISION
PUBLIC SUPERIORITY CLAIM
```

The implementation must not contain output field names, enums, or helper semantics that silently encode those concepts.

---

## 9. External authority non-grants

This authorization does not grant:

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / AGENT INVOCATION
BENCHMARK TASK EXECUTION
NETWORK ACCESS
SECRET ACCESS
SUBPROCESS / SHELL / SANDBOX EXECUTION
FILESYSTEM WRITE / BENCHMARK RESULT PERSISTENCE
DATABASE / CACHE / TELEMETRY / ANALYTICS
TRAINING / FINE-TUNING / ONLINE LEARNING
CROSS-REPOSITORY AGGREGATION / LEARNING
NEW DEPENDENCIES
DONOR / EXTERNAL CODE INTAKE
CLI / PRODUCT INTEGRATION
PACKAGE PUBLICATION
PUBLIC RELEASE / VERSION DECLARATION
K2 EXECUTION-AUTHORITY EXPANSION
K5 PROOF-AUTHORITY EXPANSION
DONE GATE MODIFICATION
PROVEN_READY AUTHORITY TRANSFER
AUTOFIX EXECUTION
RULESET MUTATION / BYPASS
P2-R6+ IMPLEMENTATION
P3-P8 IMPLEMENTATION
```

P2-R5 is pure, deterministic, local, in-memory evidence transformation only.

---

## 10. Future implementation allowlist

If and only if this exact authorization record becomes canonical and post-merge proven, exactly one P2-R5 implementation PR becomes eligible within this allowlist:

```text
packages/kodac-runtime/bench/p2-r5/**
packages/kodac-runtime/test/p2-r5-*.test.ts
docs/planning/KODAC_P2_R5_DIRECTIONAL_METRIC_RELATION_EVIDENCE_2026-08-28.md
```

No other path is implied.

The implementation may import canonical P2-R1 canonicalization/hash primitives and canonical public P2-R3/P2-R4 types/constants. Because P2-R4 does not expose a standalone serialized validator, R5 may locally duplicate only the minimum R4 validation logic required by Section 4.

P2-R1, P2-R2, P2-R3, and P2-R4 bytes may not be modified.

No package manifest, lockfile, workflow, schema outside the R5 directory, root export, CLI, product, dependency, provenance, ruleset, or release path is authorized.

---

## 11. Minimum focused test obligations

The future implementation must provide focused tests that collectively prove at least these cases:

1. canonical R4 `HIGHER_IS_BETTER` with left greater -> `LEFT_FAVORED_BY_DIRECTION`;
2. canonical R4 `HIGHER_IS_BETTER` with right greater -> `RIGHT_FAVORED_BY_DIRECTION`;
3. canonical R4 `LOWER_IS_BETTER` with left lower -> `LEFT_FAVORED_BY_DIRECTION`;
4. canonical R4 `LOWER_IS_BETTER` with right lower -> `RIGHT_FAVORED_BY_DIRECTION`;
5. exact comparable equality -> `EQUAL_RAW_VALUE`;
6. insufficient R4 metric -> `INSUFFICIENT_EVIDENCE`;
7. insufficient evidence never derives a side relation;
8. relation derivation preserves raw `left - right` orientation independently of direction;
9. R4 raw-delta tampering fails closed;
10. R4 comparison-identity tampering fails closed;
11. R4 status/value/nullability inconsistency fails closed;
12. malformed direction fails closed;
13. left/right summary semantic mismatch fails closed;
14. non-finite comparable values fail closed;
15. subtraction overflow/non-finite delta fails closed;
16. non-canonical task-family ordering fails closed;
17. non-canonical metric ordering fails closed;
18. duplicate task-family/metric identity fails closed;
19. unknown top-level R4 field fails closed;
20. unknown metric field fails closed;
21. hostile Proxy fails without executing traps;
22. hostile accessor fails without executing getter/setter hooks;
23. symbol/custom-prototype/sparse-array/cycle/non-JSON forms fail closed;
24. `__proto__` remains inert ordinary canonical data and cannot pollute prototypes;
25. caller object-key insertion order does not change R5 canonical bytes or identity;
26. repeated identical semantic input yields byte-identical R5 output and identity;
27. evidence-bearing R4 input changes change R5 identity;
28. caller mutation after return cannot mutate R5 output;
29. serialized R5 identity tampering fails closed if a serialized validator is exposed;
30. output contains no global winner/ranking/threshold/tolerance/statistics/promotion/release/public-claim field;
31. production R5 module exposes no network/process/filesystem-write/provider/model/persistence/telemetry authority;
32. P2-R1/R2/R3/R4 canonical predecessor blobs remain unchanged.

This is a coverage obligation, not a requirement for exactly 32 `test()` functions. One focused test may prove multiple obligations if the evidence is explicit and inspectable.

---

## 12. Evidence record requirements

The implementation PR must include:

```text
docs/planning/KODAC_P2_R5_DIRECTIONAL_METRIC_RELATION_EVIDENCE_2026-08-28.md
```

The evidence record may bind immutable facts known before its own commit, including canonical authorization merge, implementation parent head/tree, predecessor blobs, test counts/results, workflow runs, and authorization boundaries.

It must not falsely predict its own final commit SHA or blob before creation. Final exact-head qualification, external review quorum, guarded merge, and post-merge proof remain later GitHub-bound evidence outside the candidate-time evidence record unless they are appended only through a separately authorized reconciliation after closure.

---

## 13. Authorization-candidate qualification gate

Do not merge this authorization record until one frozen exact head proves all of the following:

1. protected `main` is the expected canonical base or the candidate has been forward-reconciled non-destructively;
2. `behind_by=0`;
3. changed-file scope is exactly this one authorization path;
4. the final authorization blob and candidate tree are captured exactly;
5. PR is open, non-draft, and mergeable;
6. exact-head required CI is terminal success, including trusted `provenance`, `legacy-tests`, and `k2-runtime-gate` where the repository requires them for the PR event;
7. at least two distinct independent external substantive semantic reviewer channels evaluate the exact frozen head and reach terminal-clean conclusions;
8. summary-only, billing-blocked, rate-limited, service-error, stale-head, self-review, and non-substantive outputs do not count toward quorum;
9. zero unresolved material correctness/security/governance/authority/scope findings remain;
10. zero unresolved actionable review threads remain;
11. ruleset `20707483` is active with required contexts/thread resolution, `bypass_actors=[]`, and `current_user_can_bypass=never`;
12. `WAIVER=NO`;
13. merge is a normal history-preserving guarded merge with exact `expected_head_sha`;
14. no force-push, rebase, destructive history rewrite, stale-head evidence reuse, or silent waiver occurs.

If canonical `main` moves before merge, forward-reconcile only and requalify from scratch on the new exact head.

---

## 14. Mandatory post-merge proof

P2-R5 implementation authority becomes effective only after the authorization merge proves:

- protected `main` equals the authorization merge SHA;
- ordered merge parents are pre-merge canonical `main` then the exact qualified candidate head;
- merge tree equals the qualified candidate tree;
- the authorization blob on canonical `main` equals the qualified candidate blob;
- GitHub merge signature is `verified / valid`;
- applicable post-merge Governance checks succeed;
- K2 push applicability is determined from the canonical workflow trigger and changed paths; a non-applicable workflow is recorded as non-applicable rather than relabeled green;
- ruleset `20707483` remains active with no bypass;
- PR is canonically merged.

Only then:

```text
P2-R5 IMPLEMENTATION AUTHORITY = EFFECTIVE FOR THE EXACT SECTION 10 ALLOWLIST
```

This does not mean P2-R5 is complete or closed. P2-R5 becomes `CLOSED_CANONICAL` only after its separately qualified implementation PR merges and passes its own mandatory post-merge proof.

---

## 15. Stop rules after authorization

Even after this authorization becomes canonical, stop rather than improvise if:

- implementation needs a path outside Section 10;
- implementation requires modifying P2-R1/R2/R3/R4 bytes;
- a standalone upstream validator/refactor outside the R5 directory becomes necessary;
- a new dependency/tool/provider/model is required;
- persistence, telemetry, network, subprocess, or benchmark execution becomes necessary;
- metric-local relation semantics prove insufficient and a threshold/tolerance/global aggregation/statistical policy would be required;
- any material review/security finding remains unresolved;
- exact-head CI/review evidence becomes stale;
- merge would require force-push, rebase, destructive rewrite, bypass, or stale evidence.

A future need for broader benchmark semantics must become a new P2-R6+ authorization candidate. It may not be absorbed into R5 by convenience.

---

## 16. Decision

Subject to exact qualification, guarded canonical merge, and mandatory post-merge proof, the founder authorizes one later bounded P2-R5 implementation unit that converts each independently validated P2-R4 metric comparison into a deterministic metric-local direction-aware relation while preserving all underlying evidence and all existing authority boundaries.

Nothing in this record authorizes a global comparison claim, ranking, threshold, statistics, promotion, execution, persistence, release, or public superiority statement.
