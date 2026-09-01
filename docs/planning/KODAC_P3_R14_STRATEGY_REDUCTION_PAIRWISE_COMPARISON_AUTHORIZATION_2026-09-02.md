# Kodac P3-R14 — Controlled Strategy Reduction Pairwise Comparison Authorization Candidate

Status: AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY
Date: 2026-09-02
Owner: Kodac founder
Waiver: NO

---

## 1. Purpose

This record proposes one bounded documentation/governance authorization for a future pure deterministic **pairwise raw comparison of exactly two independently reconstructed P3-R13 strategy reduction records**.

This is the minimum post-R13 semantic layer supported by current canonical evidence:

```text
LEFT ORIGINAL P3-R13 PREIMAGES
+ RIGHT ORIGINAL P3-R13 PREIMAGES
+ ONE EXACT PAIRWISE COMPARISON DECLARATION
-> SNAPSHOT ALL PUBLIC INPUTS BEFORE SEMANTIC USE
-> RECONSTRUCT TRUSTED LEFT P3-R13
-> RECONSTRUCT TRUSTED RIGHT P3-R13
-> REQUIRE TWO DISTINCT STRATEGY SUBJECTS
-> REQUIRE EXACT SAME BENCHMARK / PROTOCOL
-> REQUIRE EXACT SAME ORDERED CASE IDS / R1 RESULT IDENTITIES
-> REQUIRE EXACT SAME SEVEN DIMENSION METRIC / UNIT / VALUE-KIND / REDUCER / MISSINGNESS / MINIMUM-COUNT SEMANTICS
-> REQUIRE EXACT SAME EXPLICIT PER-DIMENSION DIRECTIONS
-> EMIT PER-DIMENSION COMPARABLE | INSUFFICIENT_EVIDENCE
-> EMIT FINITE RAW_DELTA_LEFT_MINUS_RIGHT ONLY WHEN COMPARABLE
-> PRESERVE BOTH COMPLETE TRUSTED P3-R13 RECORDS
-> EMIT ONE DETERMINISTIC IMMUTABLE PAIRWISE-COMPARISON EVIDENCE IDENTITY
-> NO FAVORED RELATION / BETTER-WORSE / GLOBAL SCORE / RANKING / PROMOTION
```

This document does **not** implement P3-R14. Effective implementation authority remains `NONE` unless and until this exact authorization record qualifies, merges normally into protected `main`, and completes mandatory post-merge proof.

---

## 2. Canonical baseline

Prepared only after canonical P3-R13 implementation and mandatory current-view reconciliation:

```text
CANONICAL_MAIN_AT_PREPARATION = 42da1bcef8bdcb8cfe025355dba8df9021263672
CANONICAL_MAIN_TREE = 1066766eb8a19e8e546bf58b548e9d044e280bdf

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

Canonical state remains:

```text
P3-R1 THROUGH P3-R13 = CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
PAIRWISE STRATEGY COMPARISON = NOT_AUTHORIZED WHILE THIS RECORD IS NON-CANONICAL
P3-R14+ IMPLEMENTATION = NOT_AUTHORIZED WHILE THIS RECORD IS NON-CANONICAL
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
```

This authorization candidate may change only this document. It does not change current-view pages while non-canonical.

---

## 3. Observed canonical gap

Canonical P3-R13 authorization explicitly decomposed a later pairwise layer into two independent steps:

```text
1. bind explicit direction semantics to each reduced dimension;
2. compare two distinct strategy reduction records.
```

P3-R13 deliberately authorized and implemented step 1 only.

Canonical P3-R13 now reconstructs one exact P3-R12 record, preserves its complete trusted two-case evidence, and binds exactly one explicit `HIGHER_IS_BETTER | LOWER_IS_BETTER` direction to each of the seven canonical dimensions.

P3-R13 deliberately contains no contract for:

```text
SECOND STRATEGY SUBJECT
LEFT / RIGHT PAIRWISE ROLE
CROSS-STRATEGY CASE-TOPOLOGY EQUALITY
CROSS-STRATEGY DIMENSION-SEMANTIC EQUALITY
COMPARABLE | INSUFFICIENT_EVIDENCE PAIRWISE STATUS
RAW_DELTA_LEFT_MINUS_RIGHT
FAVORED RELATION
BETTER / WORSE
CROSS-DIMENSION AGGREGATE
RANK / PROMOTION / WINNER / DEFAULT
```

Therefore the concrete post-R13 gap is not inferred from numbering: the later P3 evidence chain can produce one trusted direction-bound reduced strategy record at a time, but it cannot yet compare two such records while preserving the exact R9-R13 predecessor semantics.

---

## 4. Why canonical P3-R3 does not close this gap

Canonical P3-R3 is an earlier **pairwise metric-evidence binding mechanism**. It:

1. reconstructs two canonical P3-R2 policy applications;
2. accepts one complete caller-materialized P2-R4 comparison only as untrusted input;
3. derives trusted P2-R5 directional relations through canonical `deriveP2R5Relations(...)`;
4. binds those relations to the two exact P3-R2 policy applications; and
5. preserves seven metric-local relation records without global aggregation.

P3-R3 does **not** compare two independently reconstructed P3-R13 records produced through the later canonical chain:

```text
P3-R6 measurement materialization
-> P3-R7 single-case report binding
-> P3-R8 strategy-subject binding
-> P3-R9 exactly-two-case composition
-> P3-R10 metric alignment
-> P3-R11 reduction-policy binding
-> P3-R12 two-case reduction
-> P3-R13 explicit direction binding
```

Treating P3-R3 as a substitute for an R13-to-R13 comparison would bypass the later strategy subject, exactly-two-case composition, member references, reduction policy, reduction evidence, and R13 direction-binding identities.

P3-R14 must therefore derive its own truth from two independently reconstructed canonical P3-R13 records rather than importing P3-R3 or caller-claimed P2-R4/P2-R5 pairwise results.

---

## 5. Canonical internal precedent

### 5.1 P2-R4 is the minimum pairwise-comparison precedent

Canonical P2-R4 establishes controlled per-metric raw pairwise comparison under one exact shared evaluation context and explicit direction policy.

Its minimum reusable semantic precedent is:

```text
TWO CONTROLLED EVIDENCE SIDES
+ SAME BENCHMARK / CONTROLLED CONTEXT
+ EXPLICIT PER-METRIC DIRECTION
-> COMPARABLE | INSUFFICIENT_EVIDENCE
-> RAW_DELTA_LEFT_MINUS_RIGHT WHEN COMPARABLE
-> NO WINNER / BETTER-WORSE / RANKING / PROMOTION
```

P3-R14 may reuse the raw-delta and closed pairwise-status precedent only. It may not reuse P2-R4 identities, caller-provided P2-R4 comparison objects, task-family topology, or external shared-context object as derivation truth.

### 5.2 P2-R5 is downstream and intentionally excluded

Canonical P2-R5 derives only after a validated P2-R4 comparison:

```text
LEFT_FAVORED_BY_DIRECTION
RIGHT_FAVORED_BY_DIRECTION
EQUAL_RAW_VALUE
INSUFFICIENT_EVIDENCE
```

Those relation states interpret direction against two values. They are a distinct semantic layer beyond raw pairwise comparison.

P3-R14 must not import, derive, copy, alias, or emit P2-R5 favored-relation semantics.

### 5.3 P3-R13 reconstruction remains authoritative

A caller-claimed serialized `ReductionDirectionBindingEvidence` is untrusted and may not be accepted as derivation truth.

The future P3-R14 builder must reconstruct both left and right canonical P3-R13 records from original predecessor preimages by calling the canonical public P3-R13 builder twice.

P3-R13 source/tests/authorization/evidence remain read-only.

---

## 6. Supporting external precedent rechecked on 2026-09-02

External precedent is supporting evidence only and creates no Kodac authority.

### MLCommons / MLPerf

Current public sources:

- https://mlcommons.org/benchmarks/
- https://mlcommons.org/benchmarks/inference-datacenter/
- https://mlcommons.org/working-groups/benchmarks/inference/

Observed precedent:

- MLCommons states that benchmark design should enable fair comparison of competing systems and enforce reproducibility.
- MLPerf Closed division is intended for apples-to-apples comparison under the same reference-model constraints.
- benchmark/scenario metrics remain explicitly defined by benchmark rules rather than being silently blended into one universal score.

This supports P3-R14 requiring exact shared benchmark/case/metric semantics before pairwise arithmetic and retaining dimension-local results rather than inventing a repository-global winner.

---

## 7. Proposed future public API

Only after this exact authorization becomes canonical and post-merge proven may one later implementation expose exactly one public builder with this semantic argument order:

```text
buildStrategyReductionPairwiseComparisonEvidence(
  leftReconstructionValue,
  rightReconstructionValue,
  comparisonDeclarationValue,
)
```

Every public input is `unknown` at the trust boundary.

The exact flow is:

```text
UNTRUSTED LEFT RECONSTRUCTION BUNDLE
+ UNTRUSTED RIGHT RECONSTRUCTION BUNDLE
+ UNTRUSTED COMPARISON DECLARATION
-> CANONICAL-JSON SNAPSHOT ALL THREE ROOT INPUTS IN THAT ORDER BEFORE ANY SEMANTIC FIELD READ
-> NORMALIZE EXACT-KEY LEFT / RIGHT RECONSTRUCTION BUNDLES
-> NORMALIZE EXACT-KEY COMPARISON DECLARATION
-> RECONSTRUCT CANONICAL LEFT P3-R13
-> RECONSTRUCT CANONICAL RIGHT P3-R13
-> EXACT DISTINCT-SUBJECT / BENCHMARK / CASE / DIMENSION / DIRECTION CROSS-BINDING
-> DERIVE CLOSED PER-DIMENSION PAIRWISE STATUS
-> DERIVE FINITE RAW DELTA WHEN COMPARABLE
-> DETERMINISTIC IMMUTABLE P3-R14 EVIDENCE
```

No caller-claimed serialized P3-R12 or P3-R13 result is a public input to this builder.

---

## 8. Exact reconstruction-bundle contract

Each of `leftReconstructionValue` and `rightReconstructionValue` must normalize to one exact-key plain JSON-compatible object containing only:

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

These eight nested values are the exact predecessor inputs required by canonical P3-R13 `buildReductionDirectionBindingEvidence(...)` in its established semantic order:

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

Unknown or missing reconstruction-bundle keys fail closed.

The future P3-R14 implementation must pass only the detached canonical snapshot values from the normalized bundle to P3-R13. It must not read semantic fields from the original caller object after snapshotting.

No serialized R13 evidence field is permitted in a reconstruction bundle.

---

## 9. Exact comparison declaration contract

The future comparison declaration is an exact-key object containing only:

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

Validation rules:

- `comparisonId` uses the existing bounded canonical P3 stable-ID discipline;
- `leftDirectionBindingEvidenceIdentity` and `rightDirectionBindingEvidenceIdentity` must be canonical lowercase `sha256:<64 hex>` identities and exactly match the two reconstructed P3-R13 records;
- the two direction-binding evidence identities must be distinct;
- `leftStrategySubjectIdentity` and `rightStrategySubjectIdentity` must be canonical bare lowercase 64-hex P3 strategy-subject identities and exactly match the reconstructed sides;
- the two strategy-subject identities must be distinct;
- `benchmarkId` and `benchmarkProtocolVersion` must be non-empty canonical strings and exactly equal both reconstructed P3-R13 records;
- unknown or missing keys fail closed.

The declaration identifies the intended pair only. It does not supply metric directions, values, case alignment, pairwise status, raw delta, favored relation, or any quality verdict.

---

## 10. Exact controlled pair requirement

P3-R14 may compare only two trusted P3-R13 records that are demonstrably the same benchmark material under two distinct strategy subjects.

### 10.1 Root benchmark equality

Both reconstructed P3-R13 records must have exact equality for:

```text
benchmarkId
benchmarkProtocolVersion
```

### 10.2 Ordered two-case topology equality

The corresponding trusted R12 member references nested inside each R13 record must match exactly for:

```text
left.reductionEvidence.memberAReference.caseId
  == right.reductionEvidence.memberAReference.caseId

left.reductionEvidence.memberAReference.r1ResultIdentity
  == right.reductionEvidence.memberAReference.r1ResultIdentity

left.reductionEvidence.memberBReference.caseId
  == right.reductionEvidence.memberBReference.caseId

left.reductionEvidence.memberBReference.r1ResultIdentity
  == right.reductionEvidence.memberBReference.r1ResultIdentity
```

No automatic swapping, sorting, intersection, union, fuzzy alignment, or case-ID normalization is authorized.

If left A corresponds to right B rather than right A, the pair fails closed. Caller input must already present canonical corresponding order.

Strategy-local fields such as policy/application/report/measurement identities are expected to differ and are not forced equal.

### 10.3 Distinct strategy subjects

The two trusted root `strategySubjectIdentity` values must be distinct.

P3-R14 compares exactly two strategy subjects. Same-subject self-comparison is rejected even if other evidence bytes differ.

---

## 11. Exact seven-dimension semantic alignment

Both reconstructed P3-R13 `dimensionDirectionBindings` arrays must contain exactly seven entries in canonical `P3_R6_DIMENSIONS` order.

For every index `i`, left and right entries must match exactly on:

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

The corresponding trusted nested P3-R12 reductions must also match exactly on:

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

For each side independently, P3-R14 must require that its R13 direction binding remains cross-consistent with its own nested trusted R12 reduction semantics.

Any dimension order drift, metric substitution, unit drift, value-kind drift, reducer drift, missingness drift, minimum-count drift, expected-count drift, or direction disagreement fails closed.

P3-R14 must not choose one side's direction when the two R13 records disagree. Direction disagreement is an invalid controlled pair.

---

## 12. Closed pairwise status and raw-delta semantics

P3-R14 may produce only per-dimension pairwise comparison records.

Closed pairwise status vocabulary:

```text
COMPARABLE
INSUFFICIENT_EVIDENCE
```

A dimension is `COMPARABLE` only when both corresponding trusted P3-R12 dimension reductions have:

```text
status = REDUCED
reducedValue = finite number
```

For `COMPARABLE`, P3-R14 may expose exactly:

```text
leftReducedValue
rightReducedValue
rawDeltaLeftMinusRight
```

where:

```text
rawDeltaLeftMinusRight = leftReducedValue - rightReducedValue
```

The subtraction must produce a finite result or fail closed.

The raw delta is never direction-normalized. `HIGHER_IS_BETTER` or `LOWER_IS_BETTER` is preserved beside the comparison but is **not interpreted** into a favored/better/worse relation in this slice.

If either trusted side has `status = INSUFFICIENT_EVIDENCE`, the pairwise status is exactly:

```text
INSUFFICIENT_EVIDENCE
```

and the P3-R14 comparison numeric fields are all null:

```text
leftReducedValue = null
rightReducedValue = null
rawDeltaLeftMinusRight = null
```

The complete nested left/right P3-R13 records still preserve each side's exact reduction status, coverage, observations, counts, and any independently available reduced value. P3-R14 does not erase predecessor evidence merely because pairwise arithmetic is unavailable.

Equal reduced values produce:

```text
rawDeltaLeftMinusRight = 0
```

P3-R14 emits no tie label and no favored relation.

---

## 13. Exact per-dimension comparison record

Each output `dimensionComparisons` entry is an exact-key object containing only:

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

Field rules:

- `dimension` through `direction` come only from the exact trusted cross-bound R13/R12 semantics;
- `expectedCount` is exactly `2`;
- `leftStatus` and `rightStatus` exactly preserve the two trusted R12 reduction statuses;
- `comparisonStatus` is derived only by Section 12;
- numeric/null fields obey Section 12 exactly;
- no unknown output keys are authorized.

No field may encode favored side, winner, better/worse, score, rank, threshold, confidence, significance, promotion, or default selection.

---

## 14. Exact output contract

The future evidence record is an exact-key object containing only:

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

Exact field rules:

- `comparisonDeclaration` is the complete normalized exact-key declaration from Section 9;
- root ID/subject/benchmark/protocol fields exactly equal the declaration and the two reconstructed trusted P3-R13 records;
- `leftDirectionBindingEvidence` is the complete trusted left reconstructed P3-R13 result;
- `rightDirectionBindingEvidence` is the complete trusted right reconstructed P3-R13 result;
- `dimensionComparisons` contains exactly seven records in canonical `P3_R6_DIMENSIONS` order;
- no caller-provided serialized predecessor record survives as derivation truth;
- unknown or missing output keys are forbidden.

The complete trusted left/right predecessor payloads remain available only through the two root P3-R13 evidence fields; no second mutable or partially copied predecessor representation is authorized.

---

## 15. Identity rule

`comparisonEvidenceIdentity` is `sha256Canonical(...)` over the complete normalized output projection containing every Section 14 field except `comparisonEvidenceIdentity` itself.

Therefore the identity preimage includes:

- the complete normalized comparison declaration;
- comparison ID;
- both trusted P3-R13 identities and complete trusted P3-R13 evidence payloads;
- both distinct strategy-subject identities;
- benchmark/protocol bindings;
- all seven exact per-dimension comparison records and raw deltas/nulls.

Required consequences:

- semantically identical canonical inputs produce identical bytes and identity;
- swapping left and right is semantic and changes the identity;
- changing one predecessor direction, reduction value, case identity, or strategy subject changes or invalidates the record;
- object-property insertion order does not change identity;
- array order remains semantic and canonical;
- time, host paths, process IDs, environment variables, locale, random state, and other ambient data do not enter identity;
- the final identity is self-reference-free.

---

## 16. Immutability, detachment, and hostile-input boundary

The output must be detached from caller mutation and deeply frozen.

All three public root inputs must cross the hardened canonical JSON boundary in this exact order **before any semantic field read**:

```text
1. leftReconstructionValue
2. rightReconstructionValue
3. comparisonDeclarationValue
```

The future implementation must fail closed on unsupported hostile/non-canonical structures, including applicable cases of:

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
unsupported schema versions
```

No mutable alias to caller input may survive in the returned evidence.

---

## 17. Explicit semantic non-grants

Even after this authorization becomes canonical, the future P3-R14 implementation remains forbidden from adding:

```text
FAVORED RELATION = NOT_AUTHORIZED
LEFT_FAVORED_BY_DIRECTION / RIGHT_FAVORED_BY_DIRECTION = NOT_AUTHORIZED
BETTER / WORSE SYSTEM OR STRATEGY VERDICT = NOT_AUTHORIZED
TIE VERDICT = NOT_AUTHORIZED
THREE-OR-MORE-STRATEGY COMPARISON = NOT_AUTHORIZED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED
CROSS-DIMENSION AGGREGATE SCORE = NOT_AUTHORIZED
COUNT-OF-FAVORED-DIMENSIONS = NOT_AUTHORIZED
MAJORITY / VOTE = NOT_AUTHORIZED
WEIGHTED / BLENDED / NORMALIZED GLOBAL SCORE = NOT_AUTHORIZED
PERCENTAGE CHANGE / RATIO / NORMALIZED UTILITY = NOT_AUTHORIZED
THRESHOLD / TARGET / TOLERANCE / EPSILON POLICY = NOT_AUTHORIZED
PARETO / STATISTICAL / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE SEMANTICS = NOT_AUTHORIZED
MULTI-STRATEGY RANKING / LEADERBOARD = NOT_AUTHORIZED
PROMOTION / DEFAULT / WINNER = NOT_AUTHORIZED
REAL BENCHMARK TASK / PARTICIPANT EXECUTION = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
NETWORK / SECRET / SUBPROCESS / SANDBOX EXPANSION = NOT_AUTHORIZED
NEW DEPENDENCY / DONOR INTAKE = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / LEARNING = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
PUBLIC QUALITY / SUPERIORITY CLAIM = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
P3 OVERALL CLOSURE = NOT_AUTHORIZED
P3-R15+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Raw pairwise delta is not a favored relation, not a quality verdict, and not repository-owned promotion policy.

---

## 18. Canonical predecessor bytes remain read-only

A future P3-R14 implementation may import canonical predecessor types/functions but may not modify any P2-R1 through P2-R5 or P3-R1 through P3-R13 source, tests, authorization records, evidence records, or current-view reconciliation bytes.

In particular, these remain read-only:

```text
packages/kodac-runtime/bench/p2-r4/comparison.ts
packages/kodac-runtime/bench/p2-r5/relation.ts
packages/kodac-runtime/bench/p3-r12/contracts.ts
packages/kodac-runtime/bench/p3-r12/single-strategy-two-case-reduction-evidence.ts
packages/kodac-runtime/bench/p3-r13/contracts.ts
packages/kodac-runtime/bench/p3-r13/reduction-direction-binding.ts
packages/kodac-runtime/test/p3-r13-reduction-direction-binding.test.ts
docs/planning/KODAC_P3_R13_REDUCTION_DIRECTION_BINDING_AUTHORIZATION_2026-09-01.md
docs/planning/KODAC_P3_R13_REDUCTION_DIRECTION_BINDING_EVIDENCE_2026-09-01.md
```

No compatibility fix may be smuggled into predecessor paths under this authority.

---

## 19. Conditional future implementation allowlist

Only after this exact authorization record becomes canonical and completes mandatory post-merge proof may one later P3-R14 implementation candidate modify exactly:

```text
packages/kodac-runtime/bench/p3-r14/contracts.ts
packages/kodac-runtime/bench/p3-r14/strategy-reduction-pairwise-comparison.ts
packages/kodac-runtime/test/p3-r14-strategy-reduction-pairwise-comparison.test.ts
docs/planning/KODAC_P3_R14_STRATEGY_REDUCTION_PAIRWISE_COMPARISON_EVIDENCE_2026-09-02.md
```

No fifth path is implied.

If implementation discovers that any predecessor mutation, fifth path, new dependency, external provider/model, side-effect authority, favored-relation semantics, or aggregate/ranking semantics are required, stop. This authorization is insufficient and may not be widened by interpretation.

---

## 20. Required focused future tests

A future implementation is not qualified without direct tests proving at least:

1. a valid exact controlled pair reconstructs both canonical R13 records and produces deterministic evidence;
2. the public builder uses the exact three-argument order in Section 7;
3. all three public roots are canonically snapshotted in order before semantic field reads;
4. reconstruction bundles accept exactly the eight keys in Section 8;
5. missing or extra reconstruction-bundle keys fail closed;
6. caller-claimed serialized R13 evidence is not an accepted derivation input;
7. both R13 sides are independently reconstructed through canonical `buildReductionDirectionBindingEvidence(...)`;
8. same-subject self-comparison fails closed;
9. direction-binding evidence identity mismatch fails closed on either side;
10. strategy-subject identity mismatch fails closed on either side;
11. benchmark ID mismatch fails closed;
12. benchmark protocol mismatch fails closed;
13. member A case-ID mismatch fails closed;
14. member A R1-result-identity mismatch fails closed;
15. member B case-ID mismatch fails closed;
16. member B R1-result-identity mismatch fails closed;
17. swapped A/B correspondence fails closed rather than auto-aligning;
18. missing, extra, duplicate, or reordered dimensions fail closed;
19. metric ID drift fails closed;
20. input/output unit drift fails closed;
21. value-kind drift fails closed;
22. reducer drift fails closed;
23. missingness-policy drift fails closed;
24. minimum-observed-count drift fails closed;
25. expected-count drift fails closed;
26. direction disagreement fails closed;
27. two REDUCED finite numeric values produce `COMPARABLE` and exact finite `rawDeltaLeftMinusRight`;
28. positive, negative, and zero raw deltas are preserved exactly without favored/tie interpretation;
29. HIGHER_IS_BETTER does not change the raw-delta arithmetic sign;
30. LOWER_IS_BETTER does not change the raw-delta arithmetic sign;
31. left insufficient/right reduced produces `INSUFFICIENT_EVIDENCE` with comparison numeric fields null;
32. left reduced/right insufficient produces `INSUFFICIENT_EVIDENCE` with comparison numeric fields null;
33. both insufficient produce `INSUFFICIENT_EVIDENCE` with comparison numeric fields null;
34. complete nested left/right R13 evidence remains preserved under pairwise insufficient evidence;
35. non-finite subtraction fails closed;
36. comparison declaration unknown/missing keys fail closed;
37. unsupported declaration version/kind fail closed;
38. output uses exactly the root keys in Section 14;
39. every dimension comparison uses exactly the keys in Section 13;
40. no favored relation, better/worse, tie verdict, aggregate score, favored-count, rank, promotion, winner, or global score field/state is emitted;
41. swapping left/right changes semantic output and identity;
42. changing one comparable reduced value changes raw delta and evidence identity;
43. changing one direction changes or rejects the pair and changes identity when the pair remains semantically valid;
44. semantically equal objects with different property insertion order produce identical bytes/identity;
45. array order remains semantic and wrong canonical order is rejected;
46. hostile Proxy/accessor/symbol/sparse/non-plain/non-canonical structures fail closed at the public boundary;
47. caller mutation after return cannot alter trusted output;
48. output is deeply frozen;
49. final identity is self-reference-free and deterministic;
50. ambient time/path/process/environment/locale/random data does not enter identity;
51. no real benchmark/provider/model/evaluator/network/subprocess execution occurs;
52. implementation/test/evidence diff remains exactly the four authorized paths.

Review may require additional negative cases without widening semantics.

---

## 21. Authorization-candidate qualification gate

This document is not canonical authority merely because it exists in a branch or PR.

Before this authorization candidate may merge, one frozen exact head must prove:

```text
CANONICAL_MAIN = 42da1bcef8bdcb8cfe025355dba8df9021263672 OR non-destructively reconciled and fully requalified
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P3_R14_STRATEGY_REDUCTION_PAIRWISE_COMPARISON_AUTHORIZATION_2026-09-02.md
GOVERNANCE provenance = SUCCESS
GOVERNANCE legacy-tests = SUCCESS
K2 runtime-change-classifier = SUCCESS
K2 runtime matrix = SKIPPED / DOCS-ONLY NON-APPLICABLE
K2 stable gate = SUCCESS
INDEPENDENT EXTERNAL SUBSTANTIVE SEMANTIC REVIEW CHANNELS = 2 / 2 TERMINAL CLEAN
UNRESOLVED MATERIAL FINDINGS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET 20707483 = active
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
WAIVER = NO
```

Status-only, summary-only, invocation-only, billing-blocked, rate-limited, service-error, stale-head, same-provider duplicate, or self-review output does not satisfy semantic review quorum.

Any head movement invalidates prior exact-head CI/review evidence.

---

## 22. Merge discipline

If and only if the authorization candidate reaches the complete exact-head gate:

1. capture exact base/head/tree/document blob;
2. publish immutable exact-head qualification proof;
3. perform a fresh live race check;
4. merge normally with `merge_method=merge` and exact `expected_head_sha`;
5. use no squash, rebase, force-push, destructive history rewrite, bypass, or waiver;
6. prove canonical post-merge `main`, ordered parents, tree/blob identity, verified GitHub signature, applicable push checks, and active no-bypass ruleset;
7. publish immutable post-merge proof.

Only after step 7 may state become:

```text
P3_R14_STRATEGY_REDUCTION_PAIRWISE_COMPARISON_IMPLEMENTATION = AUTHORIZED
```

That state authorizes only the exact four-path implementation allowlist in Section 19. It does not mean P3-R14 is implemented or closed.

---

## 23. Future implementation qualification discipline

If this authorization becomes effective, the later implementation candidate must itself prove on one frozen exact head:

```text
EXACT FOUR-PATH ALLOWLIST
BEHIND_BY = 0
TYPECHECK = PASS
FOCUSED P3-R14 TESTS = PASS
FULL TESTS = PASS
PATCH BENCHMARK HOOK = PASS WHEN APPLICABLE
GOVERNANCE = SUCCESS
K2 CLASSIFIER + UBUNTU + WINDOWS + MACOS + STABLE GATE = SUCCESS
INDEPENDENT EXTERNAL SUBSTANTIVE SEMANTIC REVIEW CHANNELS = 2 / 2 TERMINAL CLEAN
UNRESOLVED MATERIAL FINDINGS / ACTIONABLE THREADS = 0
RULESET 20707483 = active / no bypass
GUARDED NORMAL MERGE = exact expected head
POST_MERGE PROOF = REQUIRED
WAIVER = NO
```

Any implementation head movement invalidates prior exact-head qualification evidence.

After implementation canonical closeout, current-view reconciliation is a separate mandatory unit before any later P3 definition/authorization candidate.

---

## 24. Current classification

While this record remains a branch/PR candidate:

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

The candidate may become effective only through the exact qualification, guarded normal merge, and post-merge proof sequence above.
