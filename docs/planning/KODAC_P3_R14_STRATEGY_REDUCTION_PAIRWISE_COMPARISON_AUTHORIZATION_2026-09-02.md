# Kodac P3-R14 — Controlled Strategy Reduction Pairwise Comparison Authorization Candidate

Status: AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY
Date: 2026-09-02
Decision owner: Kodac founder
Waiver: NO

---

## 1. Deny-by-default status

This record proposes one bounded future P3-R14 implementation gate. It is not implementation authority while it remains only a branch or pull-request candidate.

```text
P3-R1 THROUGH P3-R13 = CLOSED_CANONICAL
P3-R13 CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P3-R14 IMPLEMENTATION = NOT_AUTHORIZED WHILE THIS RECORD IS NON-CANONICAL
P3-R15+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

Effective P3-R14 implementation authority may exist only after this exact authorization record is qualified on one frozen exact head, merged normally into protected `main` with exact expected-head protection, and post-merge proven.

---

## 2. Canonical baseline

This candidate is prepared after canonical P3-R13 implementation and mandatory current-view reconciliation:

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 42da1bcef8bdcb8cfe025355dba8df9021263672
CANONICAL_MAIN_TREE_AT_CANDIDATE_START = 1066766eb8a19e8e546bf58b548e9d044e280bdf

P3_R13_AUTHORIZATION_PR = #295
P3_R13_AUTHORIZATION_BLOB = bc6b039cab6dbc3a570cedafe2b8f226634aa767
P3_R13_AUTHORIZATION_MERGE = 2a67a91c6d5eef829872823f5fa6441f7a644d67
P3_R13_AUTHORIZATION_POST_MERGE_PROOF = #295 / 5498626758

P3_R13_IMPLEMENTATION_PR = #296
P3_R13_QUALIFIED_HEAD = 74d07c3ad64fb5b9d7a2dd17e357260a7120489b
P3_R13_QUALIFIED_TREE = db206d23e70cb1dda9daeda37922264ce2dfd5bf
P3_R13_IMPLEMENTATION_MERGE = 931c750681494895da046f4ba9c8406d77fcfddf
P3_R13_POST_MERGE_PROOF = #296 / 5499792485
P3_R13_RECONCILIATION_BOUNDARY = #296 / 5499834265

P3_R13_CURRENT_VIEW_RECONCILIATION_PR = #297
P3_R13_CURRENT_VIEW_RECONCILIATION_QUALIFIED_HEAD = e44567bcd6444ce0f1d70fbf4d93219fc6ecfa83
P3_R13_CURRENT_VIEW_RECONCILIATION_MERGE = 42da1bcef8bdcb8cfe025355dba8df9021263672
P3_R13_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #297 / 5499971677
P3_R13_SUCCESSOR_ANALYSIS = #297 / 5500514905

RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Live GitHub and more-specific canonical records override this snapshot if state moves before qualification.

---

## 3. Exact authorization-candidate scope

This authorization candidate may modify exactly one path:

```text
docs/planning/KODAC_P3_R14_STRATEGY_REDUCTION_PAIRWISE_COMPARISON_AUTHORIZATION_2026-09-02.md
```

No second path is authorized for this authorization unit.

This candidate may not modify runtime source, tests, predecessor authorization/evidence, current-view pages, workflows, dependencies, lockfiles, benchmark corpus/manifest/fixtures, provider/model configuration, persistence, product/release surfaces, or rulesets.

---

## 4. Observed canonical gap

Canonical P3-R13 authorization explicitly decomposed a later pairwise layer into two independent steps:

```text
1. bind explicit direction semantics to each reduced dimension;
2. compare two distinct strategy reduction records.
```

P3-R13 deliberately implemented step 1 only.

Canonical R13 can reconstruct one trusted P3-R12 two-case reduction record and bind one explicit `HIGHER_IS_BETTER | LOWER_IS_BETTER` direction to each of its seven dimensions. It does not provide a trusted boundary for two distinct R13 strategy subjects, cross-side controlled-input equality, or raw pairwise arithmetic.

Therefore the minimum concrete gap is:

```text
TWO INDEPENDENT TRUSTED P3-R13 RECORDS
+ PROOF THEY REPRESENT THE SAME CONTROLLED BENCHMARK / TASK / CASE / GROUND-TRUTH INPUTS
+ DISTINCT STRATEGY SUBJECTS
-> PER-DIMENSION RAW PAIRWISE COMPARISON ONLY
```

This gap is evidence-derived rather than authorized by sequence or numbering alone.

---

## 5. Why P3-R3 does not close this gap

Canonical P3-R3 is an earlier pairwise metric-evidence binding mechanism. It reconstructs two P3-R2 policy applications and consumes one caller-materialized P2-R4 comparison only through canonical P2-R5 relation derivation.

P3-R3 does not compare two independently reconstructed records from the later chain:

```text
P3-R6 measurement materialization
-> P3-R7 report binding
-> P3-R8 strategy subject
-> P3-R9 exactly-two-case composition
-> P3-R10 metric alignment
-> P3-R11 reduction-policy binding
-> P3-R12 two-case reduction
-> P3-R13 direction binding
```

Using P3-R3 as a substitute would bypass later R9-R13 identities and would not prove that two R13 reductions share the exact controlled plan/task/case/measurement-ground-truth inputs required for a valid raw comparison.

P3-R14 must therefore derive both sides independently through canonical R13 rather than accepting caller-claimed P2-R4, P2-R5, P3-R3, P3-R12, or P3-R13 outputs as pairwise truth.

---

## 6. Minimum canonical precedent

Canonical P2-R4 supplies only the narrow raw-comparison precedent:

```text
TWO CONTROLLED EVIDENCE SIDES
+ SAME COMPARISON SEMANTICS
-> COMPARABLE | INSUFFICIENT_EVIDENCE
-> RAW_DELTA_LEFT_MINUS_RIGHT WHEN COMPARABLE
-> NO WINNER / BETTER-WORSE / RANK / PROMOTION
```

Canonical P2-R5 is downstream and intentionally excluded. P3-R14 must not emit or alias:

```text
LEFT_FAVORED_BY_DIRECTION
RIGHT_FAVORED_BY_DIRECTION
EQUAL_RAW_VALUE
```

Direction is preserved but not interpreted into favored/better/worse semantics in this slice.

---

## 7. Accepted exact-head review findings and forward repair

Initial authorization candidate head:

```text
PRE_REPAIR_HEAD = eb9eddbed006a4844969b65f251e0f4681db72f9
PRE_REPAIR_TREE = 3fb0c58c95db3a31fe07b8a4d9fa717ee5ac6b29
PRE_REPAIR_DOCUMENT_BLOB = ae24e3f9c6920d5aee74f56e495456079cd6da9a
```

Two valid P1 findings were posted by the Codex connector on PR #298:

```text
3908562042 = require identical plan/task/snapshot inputs across the two strategies
3908562064 = require identical per-case measurement ground truth across the two strategies
```

Both are accepted. No waiver is used.

The initial candidate required equal benchmark/case/metric/reducer/direction semantics but did not explicitly require the two sides to share the same canonical P3-R1 plan request or the same R6 measurement ground-truth inputs. That could admit raw deltas between different repository snapshots/tasks/candidate sets or different gold sets.

This forward repair closes both defects through Sections 12 and 13 below.

All CI and semantic-review evidence from the pre-repair head is stale after this commit and must not be reused for qualification.

```text
VALID_FINDINGS = ACCEPTED
REPAIR = FORWARD_ONLY
STALE_PRE_REPAIR_CI_REVIEW = YES
WAIVER = NO
```

---

## 8. Proposed future public boundary

Only after this authorization becomes canonical and post-merge proven may one future implementation expose one public builder semantically equivalent to:

```text
buildStrategyReductionPairwiseComparisonEvidence(
  leftReconstructionValue: unknown,
  rightReconstructionValue: unknown,
  comparisonDeclarationValue: unknown,
) -> StrategyReductionPairwiseComparisonEvidence
```

All three public roots are untrusted.

The mandatory procedure order is:

```text
1. canonical-JSON snapshot leftReconstructionValue
2. canonical-JSON snapshot rightReconstructionValue
3. canonical-JSON snapshot comparisonDeclarationValue
4. normalize exact-key left reconstruction bundle
5. normalize exact-key right reconstruction bundle
6. normalize exact-key comparison declaration
7. reconstruct trusted left P3-R13 via canonical buildReductionDirectionBindingEvidence(...)
8. reconstruct trusted right P3-R13 via canonical buildReductionDirectionBindingEvidence(...)
9. only after both reconstructions succeed, validate cross-side controlled-input equality
10. validate declaration-to-trusted-record bindings
11. validate exact benchmark/case/dimension/direction equality
12. derive per-dimension pairwise status and raw delta
13. derive deterministic evidence identity
14. return detached deeply frozen evidence
```

No semantic field may be read from an original unsnapshotted caller root.

No cross-side comparison result may be derived before both canonical R13 reconstructions succeed.

---

## 9. Exact reconstruction-bundle contract

Each normalized reconstruction bundle contains exactly:

```text
strategyDeclaration
compositionDeclaration
alignmentDeclaration
policyDeclaration
reductionDeclaration
directionDeclaration
caseAInputs
caseBInputs
```

No ninth key is authorized.

Those eight values are passed from the detached canonical snapshot to canonical R13 in its exact established order:

```text
buildReductionDirectionBindingEvidence(
  strategyDeclaration,
  compositionDeclaration,
  alignmentDeclaration,
  policyDeclaration,
  reductionDeclaration,
  directionDeclaration,
  caseAInputs,
  caseBInputs,
)
```

P3-R14 must not accept serialized P3-R12 or P3-R13 evidence as a reconstruction input or derivation shortcut.

---

## 10. Exact comparison declaration

The comparison declaration contains exactly:

```text
version
kind
comparisonId
leftDirectionBindingEvidenceIdentity
rightDirectionBindingEvidenceIdentity
leftStrategySubjectIdentity
rightStrategySubjectIdentity
benchmarkId
benchmarkProtocolVersion
```

Exact literals:

```text
version = p3-r14-strategy-reduction-pairwise-comparison-declaration-v1
kind = compare_strategy_reduction_records
```

Rules:

- `comparisonId` follows the existing bounded canonical P3 stable-ID discipline;
- both direction-binding identities are lowercase `sha256:<64 hex>` and exactly match the two trusted R13 records;
- the two direction-binding identities are distinct;
- both strategy-subject identities are canonical bare lowercase 64-hex identities and exactly match the trusted R13 records;
- the two strategy-subject identities are distinct;
- benchmark ID and protocol version exactly match both trusted R13 records;
- unknown/missing keys fail closed.

The declaration does not supply plan identities, gold truth, metric values, pairwise status, raw delta, favored relation, or quality verdict.

---

## 11. Distinct strategy subjects

P3-R14 compares exactly two distinct strategy subjects.

The trusted root R13 `strategySubjectIdentity` values must be different, and both must equal the corresponding comparison-declaration identities.

Same-subject self-comparison fails closed even if other bytes differ.

No N-way or three-or-more-strategy comparison is authorized.

---

## 12. Cross-side canonical plan/task equality — mandatory repair

For each corresponding case independently, P3-R14 must require exact canonical equality of the **entire snapshotted P3-R1 plan request** before deriving any pairwise status or delta:

```text
canonicalize(left.caseAInputs.planRequest)
  == canonicalize(right.caseAInputs.planRequest)

canonicalize(left.caseBInputs.planRequest)
  == canonicalize(right.caseBInputs.planRequest)
```

This requirement is intentionally stronger than checking a subset of fields.

Because both sides are reconstructed through canonical P3-R1/P3-R2 boundaries, exact corresponding plan-request equality guarantees that the controlled task input is shared rather than silently allowing different:

```text
requestIdentity
planIdentity
candidateSetIdentity
repositoryIdentity
snapshotIdentity
contentIdentity
taskIdentity
candidate universe / candidate evidence inputs
request budgets / completeness inputs
```

The implementation should additionally assert, wherever the canonical reconstructed predecessor data exposes them during reconstruction, that corresponding trusted R6/P3-R2 plan/request/candidate/repository/snapshot/content/task identities agree. Those assertions are defense-in-depth; exact plan-request equality is the mandatory source-level cross-side control.

The following are strategy-dependent and may differ:

```text
strategy declaration / strategySubjectIdentity
P3-R2 policyIdentity
P3-R2 applicationIdentity
selected candidates
utilized candidates
measurement/report/reduction evidence identities derived from strategy-dependent outcomes
```

P3-R14 must not weaken exact plan-request equality into equality of only repository ID, only task ID, or only case ID.

---

## 13. Cross-side per-case measurement ground-truth equality — mandatory repair

For each corresponding case, P3-R14 must validate one exact shared-measurement-input projection from the two snapshotted `measurementDeclaration` values.

The projection contains exactly:

```text
version
kind
caseId
r1ResultIdentity
taskFamily
dimensionMetricBindings
goldCandidateIdentities
```

The implementation must require canonical equality of that complete projection:

```text
sharedMeasurementInputs(left.caseAInputs.measurementDeclaration)
  == sharedMeasurementInputs(right.caseAInputs.measurementDeclaration)

sharedMeasurementInputs(left.caseBInputs.measurementDeclaration)
  == sharedMeasurementInputs(right.caseBInputs.measurementDeclaration)
```

Therefore corresponding sides must use the exact same:

```text
measurement contract version/kind
case identity
R1 result identity
task family
seven dimension-to-metric/unit bindings
goldCandidateIdentities, including order and cardinality
```

`goldCandidateIdentities` is benchmark ground truth for the controlled comparison and may not differ between left and right.

The fields intentionally permitted to differ are:

```text
measurementId
utilizedCandidateIdentities
```

`measurementId` is a strategy-local evidence label. `utilizedCandidateIdentities` is an outcome of the strategy under evaluation and must remain free to differ.

No other measurement-declaration field exists in the canonical R6 contract. If that canonical contract later gains another input field, this authorization does not silently classify it as shared or strategy-dependent; a forward governance amendment is required before relying on the widened contract.

---

## 14. Exact benchmark and ordered case-topology equality

Both trusted R13 records must match exactly on:

```text
benchmarkId
benchmarkProtocolVersion
```

Their nested trusted R12 member references must correspond in fixed order:

```text
left.memberAReference.caseId == right.memberAReference.caseId
left.memberAReference.r1ResultIdentity == right.memberAReference.r1ResultIdentity
left.memberBReference.caseId == right.memberBReference.caseId
left.memberBReference.r1ResultIdentity == right.memberBReference.r1ResultIdentity
```

No automatic A/B swapping, sorting, fuzzy matching, intersection, union, or normalization is authorized.

The shared measurement projections in Section 13 must independently agree with these member case/R1 identities.

---

## 15. Exact seven-dimension semantic and direction equality

Both trusted R13 records must contain exactly seven `dimensionDirectionBindings` in canonical `P3_R6_DIMENSIONS` order.

At every index, left and right R13 direction bindings must match exactly on:

```text
dimension
metricId
inputUnit
outputUnit
valueKind
reducer
missingnessPolicy
minimumObservedCount
direction
```

The corresponding nested R12 reductions must match exactly on:

```text
dimension
metricId
inputUnit
outputUnit
valueKind
reducer
missingnessPolicy
minimumObservedCount
expectedCount = 2
```

Each side must remain internally cross-consistent between its R13 direction binding and nested R12 reduction semantics.

Any order drift, metric substitution, unit drift, value-kind drift, reducer drift, missingness drift, minimum-count drift, expected-count drift, or direction disagreement fails closed.

P3-R14 never chooses one side's direction when directions disagree.

---

## 16. Closed pairwise status and raw-delta semantics

The only P3-R14 pairwise status vocabulary is:

```text
COMPARABLE
INSUFFICIENT_EVIDENCE
```

A dimension is `COMPARABLE` iff both corresponding trusted R12 reductions have:

```text
status = REDUCED
reducedValue = finite number
```

Canonical R12 emits a numeric reduced value for both `ARITHMETIC_MEAN` and `BOOLEAN_TRUE_RATE` when sufficient, so this requirement covers both canonical numeric and boolean-source reduction families without inventing boolean subtraction.

For `COMPARABLE`:

```text
leftReducedValue = trusted left R12 reducedValue
rightReducedValue = trusted right R12 reducedValue
rawDeltaLeftMinusRight = leftReducedValue - rightReducedValue
```

The subtraction must be finite or fail closed.

Direction is preserved beside the record but does not normalize, flip, sign-adjust, score, or interpret the raw delta.

If either side is `INSUFFICIENT_EVIDENCE`:

```text
comparisonStatus = INSUFFICIENT_EVIDENCE
leftReducedValue = null
rightReducedValue = null
rawDeltaLeftMinusRight = null
```

The complete nested left/right R13 records still preserve each side's own status, coverage counts, observations, and any independently available predecessor data. Pairwise insufficiency does not erase predecessor evidence.

Equal reduced values yield raw delta `0`. No tie label is emitted.

---

## 17. Exact per-dimension comparison output

Each `dimensionComparisons` entry contains exactly:

```text
dimension
metricId
inputUnit
outputUnit
valueKind
reducer
missingnessPolicy
minimumObservedCount
expectedCount
direction
leftStatus
rightStatus
comparisonStatus
leftReducedValue
rightReducedValue
rawDeltaLeftMinusRight
```

Rules:

- semantic fields come only from exact trusted cross-bound R13/R12 evidence;
- `expectedCount` is exactly `2`;
- left/right statuses preserve trusted R12 statuses;
- pairwise status and numeric/null fields obey Section 16;
- no favored, winner, better/worse, tie, score, threshold, significance, ranking, promotion, or default field is authorized.

---

## 18. Exact top-level evidence output

The future evidence record contains exactly:

```text
version
kind
comparisonEvidenceIdentity
comparisonDeclaration
comparisonId
leftDirectionBindingEvidenceIdentity
rightDirectionBindingEvidenceIdentity
leftStrategySubjectIdentity
rightStrategySubjectIdentity
benchmarkId
benchmarkProtocolVersion
leftDirectionBindingEvidence
rightDirectionBindingEvidence
dimensionComparisons
```

Exact literals:

```text
version = p3-r14-strategy-reduction-pairwise-comparison-evidence-v1
kind = strategy_reduction_pairwise_comparison_evidence
```

`leftDirectionBindingEvidence` and `rightDirectionBindingEvidence` are the complete trusted canonical R13 results reconstructed in this call.

No caller-provided serialized predecessor record survives as derivation truth.

---

## 19. Deterministic identity

`comparisonEvidenceIdentity` is `sha256Canonical(...)` over every evidence-bearing output field in Section 18 except `comparisonEvidenceIdentity` itself.

The preimage therefore binds:

- complete normalized comparison declaration;
- pair orientation and distinct strategy subjects;
- both complete trusted R13 records;
- benchmark/protocol bindings;
- all seven per-dimension statuses and raw deltas/nulls.

Required consequences:

```text
same canonical semantic inputs -> same bytes / identity
left-right swap -> different semantic output / identity
one predecessor change -> changed or rejected output
property insertion order -> no effect
array order -> semantic and canonical
identity -> self-reference-free
ambient time/path/process/env/locale/random -> excluded
```

---

## 20. Hostile-input, detachment, and immutability boundary

The implementation must use the hardened canonical JSON boundary already established in P2/P3.

It must fail closed on applicable hostile/non-canonical structures including:

```text
Proxy
accessor / getter / setter
symbol keys
custom prototypes where plain JSON is required
sparse arrays
cycles
bigint
undefined
functions
symbols
non-finite numbers
unpaired Unicode surrogates
unknown fields
unsupported versions/kinds
```

All output objects/arrays are detached from caller mutation and deeply frozen.

No mutable caller alias may survive in evidence.

---

## 21. No-execution boundary

P3-R14 is a pure local deterministic evidence transformation.

It may not perform or trigger:

```text
real benchmark participant execution
provider/model/reviewer/evaluator invocation
network access
secret access
subprocess/shell execution
sandbox execution
filesystem output/persistence
database/cache/telemetry/analytics
training/fine-tuning/learning
```

Focused tests must directly trap applicable external execution channels rather than relying only on metadata labels.

---

## 22. Explicit semantic and authority non-grants

Even if this authorization becomes canonical, it does not authorize:

```text
LEFT_FAVORED_BY_DIRECTION / RIGHT_FAVORED_BY_DIRECTION
FAVORED RELATION OF ANY NAME
BETTER / WORSE / SUPERIOR / INFERIOR
TIE VERDICT
THREE-OR-MORE-STRATEGY COMPARISON
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION
CROSS-DIMENSION AGGREGATE SCORE
FAVORED-DIMENSION COUNT / MAJORITY / VOTE
WEIGHTED / BLENDED / NORMALIZED GLOBAL SCORE
PERCENTAGE CHANGE / RATIO / NORMALIZED UTILITY
THRESHOLD / TARGET / TOLERANCE / EPSILON POLICY
PARETO / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE SEMANTICS
RANKING / LEADERBOARD
PROMOTION / WINNER / DEFAULT
REAL BENCHMARK EXECUTION
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION
NETWORK / SECRET / SUBPROCESS / SANDBOX AUTHORITY EXPANSION
NEW DEPENDENCY / DONOR INTAKE
PERSISTENCE / DATABASE / TELEMETRY / LEARNING
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION
PUBLIC QUALITY / SUPERIORITY CLAIM
PUBLIC RELEASE / PACKAGE PUBLICATION
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION
P3 OVERALL CLOSURE
P3-R15+ IMPLEMENTATION
P4-P8 IMPLEMENTATION
RULESET CHANGE / BYPASS
WAIVER
```

Raw pairwise delta is not a favored relation and is not repository-owned quality policy.

---

## 23. Canonical predecessor bytes remain read-only

A future implementation may import canonical public predecessor functions/types/constants read-only but may not modify P2-R1 through P2-R5 or P3-R1 through P3-R13 bytes.

In particular, no predecessor compatibility patch may be smuggled into this authority.

If a predecessor mutation is required, stop and create a separate authorization.

---

## 24. Conditional future implementation allowlist

Only after this exact authorization becomes canonical and post-merge proven may one P3-R14 implementation candidate modify exactly these four paths:

```text
packages/kodac-runtime/bench/p3-r14/contracts.ts
packages/kodac-runtime/bench/p3-r14/strategy-reduction-pairwise-comparison.ts
packages/kodac-runtime/test/p3-r14-strategy-reduction-pairwise-comparison.test.ts
docs/planning/KODAC_P3_R14_STRATEGY_REDUCTION_PAIRWISE_COMPARISON_EVIDENCE_2026-09-02.md
```

No fifth path is authorized.

If implementation requires any other path, new dependency, predecessor mutation, favored relation, aggregate/ranking semantics, execution authority, or broader surface, this authorization is insufficient and work must stop.

---

## 25. Minimum future focused-test obligations

A future implementation must directly prove at least:

1. valid controlled pair reconstructs both canonical R13 sides independently;
2. public builder has exactly three untrusted root arguments in the authorized order;
3. all three root inputs cross canonical JSON before semantic reads;
4. each reconstruction bundle has exactly the eight authorized keys;
5. caller-serialized R12/R13 evidence is not accepted as derivation truth;
6. same-subject self-comparison fails closed;
7. declaration identity/subject/benchmark/protocol mismatch fails closed;
8. corresponding case A planRequest mismatch fails closed;
9. corresponding case B planRequest mismatch fails closed;
10. repository/snapshot/content/task/candidate-set drift induced through planRequest fails closed;
11. case A goldCandidateIdentities mismatch fails closed;
12. case B goldCandidateIdentities mismatch fails closed;
13. shared measurement version/kind/case/R1/task-family/bindings mismatch fails closed;
14. differing utilizedCandidateIdentities remain permitted when all shared controls match;
15. differing strategy-local measurementId remains permitted;
16. member A case-ID or R1-result mismatch fails closed;
17. member B case-ID or R1-result mismatch fails closed;
18. swapped A/B correspondence fails closed rather than auto-aligning;
19. missing/extra/duplicate/reordered dimensions fail closed;
20. metric/unit/value-kind/reducer/missingness/minimum-count/expected-count drift fails closed;
21. direction disagreement fails closed;
22. two finite REDUCED values yield `COMPARABLE` and exact `left - right` raw delta;
23. positive, negative, and zero deltas are preserved without interpretation;
24. HIGHER_IS_BETTER does not normalize the delta;
25. LOWER_IS_BETTER does not normalize the delta;
26. one-side or two-side insufficiency yields pairwise `INSUFFICIENT_EVIDENCE` and null comparison numerics;
27. pairwise insufficiency preserves complete nested R13 evidence;
28. non-finite subtraction fails closed;
29. declaration missing/extra keys or wrong version/kind fail closed;
30. exact top-level and per-dimension output key sets are enforced;
31. no favored/better-worse/tie/aggregate/rank/promotion field or enum exists;
32. left-right swap changes semantic output/identity;
33. semantic predecessor changes alter or invalidate identity;
34. property insertion order does not affect bytes/identity;
35. wrong array order remains semantic and fails where canonical order is required;
36. hostile Proxy/accessor/symbol/sparse/custom-prototype/non-JSON values fail closed;
37. caller mutation cannot alter returned evidence;
38. complete output is deeply frozen;
39. identity is deterministic and self-reference-free;
40. ambient time/path/process/environment/locale/random state does not enter identity;
41. forbidden network/subprocess execution channels are directly trapped and unused;
42. base-to-head implementation diff is exactly the four authorized paths.

Review may require additional negative tests without widening semantics.

---

## 26. Authorization-candidate qualification gate

This one-path authorization candidate may merge only when one frozen exact head proves:

```text
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P3_R14_STRATEGY_REDUCTION_PAIRWISE_COMPARISON_AUTHORIZATION_2026-09-02.md
GOVERNANCE provenance = SUCCESS
GOVERNANCE legacy-tests = SUCCESS
K2 runtime-change-classifier = SUCCESS
K2 runtime job = SKIPPED / DOCS-ONLY NON-APPLICABLE
K2 stable gate = SUCCESS
INDEPENDENT EXTERNAL SUBSTANTIVE SEMANTIC REVIEW CHANNELS = 2 / 2 TERMINAL CLEAN ON THE SAME EXACT HEAD
UNRESOLVED MATERIAL FINDINGS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET 20707483 = active
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
WAIVER = NO
```

Status-only, summary-only, billing/rate-limit/service-error, stale-head, same-provider duplicate, or self-review output does not count.

Any head movement invalidates all previous candidate CI/review evidence.

---

## 27. Guarded merge and post-merge proof

If and only if Section 26 is complete:

1. capture exact base/head/tree/document blob;
2. publish immutable exact-head qualification proof;
3. re-read live `main`, PR state/head, compare, threads, checks, and ruleset immediately before merge;
4. merge normally with exact `expected_head_sha`;
5. use no squash, rebase, force-push, bypass, or waiver;
6. prove canonical main equals the merge commit;
7. prove ordered parent 1 is the qualified base and parent 2 is the qualified head;
8. prove merge tree and authorization document blob equal the qualified candidate;
9. prove GitHub merge signature verified/valid;
10. prove PR merged/closed;
11. prove all applicable push-triggered checks and explain any path-filtered non-applicable workflow without relabeling it green;
12. reverify active no-bypass ruleset;
13. publish immutable post-merge proof.

Only after all steps may state become:

```text
P3_R14_STRATEGY_REDUCTION_PAIRWISE_COMPARISON_IMPLEMENTATION = AUTHORIZED
```

That authority is limited to Section 24. It does not mean R14 is implemented or closed.

---

## 28. Future implementation qualification

If authorization becomes effective, the later four-path implementation candidate must itself prove on one unchanged exact head:

```text
EXACT FOUR-PATH ALLOWLIST
BEHIND_BY = 0
TYPECHECK = SUCCESS
FOCUSED P3-R14 TESTS = SUCCESS
FULL TESTS = SUCCESS
PATCH BENCHMARK HOOK = SUCCESS WHEN APPLICABLE
GOVERNANCE = SUCCESS
K2 CLASSIFIER + UBUNTU + WINDOWS + MACOS + STABLE GATE = SUCCESS
INDEPENDENT EXTERNAL SUBSTANTIVE SEMANTIC REVIEW CHANNELS = 2 / 2 TERMINAL CLEAN
UNRESOLVED MATERIAL FINDINGS / ACTIONABLE THREADS = 0
RULESET 20707483 = active / no bypass
GUARDED NORMAL MERGE = exact expected head
POST_MERGE PROOF = REQUIRED
WAIVER = NO
```

Any implementation head movement invalidates prior implementation qualification evidence.

After implementation closeout, current-view reconciliation is a separate mandatory unit before any later P3 successor analysis.

---

## 29. Current classification

While this record is non-canonical:

```text
P3_R14_AUTHORIZATION = CANDIDATE / NOT_CANONICAL
P3_R14_IMPLEMENTATION_AUTHORITY = NONE
P3_R14_IMPLEMENTATION = NOT_AUTHORIZED
P3_R15_PLUS_IMPLEMENTATION = NOT_AUTHORIZED
P3_OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
FAVORED RELATION = NOT_AUTHORIZED
BETTER / WORSE = NOT_AUTHORIZED
CROSS_DIMENSION_AGGREGATE = NOT_AUTHORIZED
RANKING / PROMOTION / WINNER / DEFAULT = NOT_AUTHORIZED
REAL BENCHMARK EXECUTION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```
