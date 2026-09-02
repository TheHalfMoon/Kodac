# Kodac P3-R14 — Controlled Strategy Reduction Pairwise Comparison Evidence

Status: IMPLEMENTATION_CANDIDATE_EVIDENCE / NOT_CANONICAL_UNTIL_MERGED
Date: 2026-09-02
Waiver: NO

---

## 1. Canonical authority

This implementation candidate exists under the canonical P3-R14 authorization merged by PR #298.

```text
AUTHORIZATION_PR = #298
AUTHORIZATION_QUALIFIED_HEAD = f1050ace85f34a99a32cd4095aa8d71738bba876
AUTHORIZATION_DOCUMENT_BLOB = 5a5f6cd9e2f52bcadc1ee0af0882f3a744487290
AUTHORIZATION_MERGE / CANDIDATE_BASE = fbbbcf13bdb281f0fe4296045ec2e2fa7311acdb
AUTHORIZATION_POST_MERGE_PROOF = #298 / 5500736118
WAIVER = NO
```

The authorization grants exactly one bounded P3-R14 implementation over exactly four paths and does not grant P3-R15+, P4-P8, execution, favored-relation, aggregate/ranking, promotion/default, persistence/product/release, ruleset change, bypass, or waiver authority.

---

## 2. Exact implementation scope

The candidate is restricted to exactly these four paths:

```text
packages/kodac-runtime/bench/p3-r14/contracts.ts
packages/kodac-runtime/bench/p3-r14/strategy-reduction-pairwise-comparison.ts
packages/kodac-runtime/test/p3-r14-strategy-reduction-pairwise-comparison.test.ts
docs/planning/KODAC_P3_R14_STRATEGY_REDUCTION_PAIRWISE_COMPARISON_EVIDENCE_2026-09-02.md
```

No predecessor byte, workflow, dependency, lockfile, fixture corpus, persistence surface, product surface, release surface, or ruleset is modified by this candidate.

The exact qualified head/tree/blob identities and base-to-head four-path proof are intentionally not predeclared here. They must be frozen from live GitHub on the final unchanged PR head and published as immutable qualification evidence before merge.

---

## 3. Implemented semantic boundary

The public builder is:

```text
buildStrategyReductionPairwiseComparisonEvidence(
  leftReconstruction,
  rightReconstruction,
  comparisonDeclaration,
)
```

It accepts exactly three untrusted roots in that order.

Each reconstruction root contains exactly the eight canonical P3-R13 predecessor inputs:

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

Both sides are independently reconstructed through canonical `buildReductionDirectionBindingEvidence(...)`. Caller-provided serialized P3-R12 or P3-R13 evidence is not accepted as pairwise derivation truth.

The implementation then requires:

```text
DISTINCT TRUSTED STRATEGY SUBJECTS
+ EXACT BENCHMARK / PROTOCOL BINDING
+ EXACT ORDERED CASE A/B CASE-ID + R1-RESULT CORRESPONDENCE
+ EXACT CANONICAL PLAN REQUEST EQUALITY FOR CORRESPONDING CASES
+ EXACT SHARED MEASUREMENT INPUT EQUALITY FOR CORRESPONDING CASES
+ EXACT SEVEN-DIMENSION METRIC / UNIT / VALUE-KIND / REDUCER / MISSINGNESS / COUNT SEMANTICS
+ EXACT DIRECTION EQUALITY
-> PER-DIMENSION COMPARABLE | INSUFFICIENT_EVIDENCE
-> RAW LEFT-MINUS-RIGHT DELTA ONLY WHEN COMPARABLE
```

The shared measurement projection contains exactly:

```text
version
kind
caseId
r1ResultIdentity
taskFamily
dimensionMetricBindings
goldCandidateIdentities
```

Strategy-local `measurementId` and outcome-dependent `utilizedCandidateIdentities` may differ.

---

## 4. Pairwise arithmetic

For one dimension:

```text
COMPARABLE
iff
left.status == REDUCED
and right.status == REDUCED
and both reduced values are finite numbers
```

Then:

```text
rawDeltaLeftMinusRight = leftReducedValue - rightReducedValue
```

The explicit `HIGHER_IS_BETTER | LOWER_IS_BETTER` direction is preserved as evidence metadata only. It does not normalize, flip, score, classify, favor, rank, or interpret the raw delta.

If either side is not `REDUCED`, pairwise status is:

```text
INSUFFICIENT_EVIDENCE
```

and all pairwise numeric fields are `null`. Both complete nested trusted R13 records remain preserved.

---

## 5. Deterministic identity and immutability

`comparisonEvidenceIdentity` is `sha256Canonical(...)` over every evidence-bearing output field except itself.

The identity binds:

```text
normalized comparison declaration
pair orientation
both trusted R13 records
both strategy subjects
benchmark / protocol
all seven dimension comparisons
all statuses
all finite raw deltas or nulls
```

Expected properties:

```text
same semantic inputs -> same identity
left/right swap -> different identity
predecessor semantic change -> changed or rejected identity
property insertion order -> irrelevant
array order -> semantic
ambient time/path/process/environment/locale/random -> excluded
identity -> self-reference-free
```

All caller roots cross the canonical JSON boundary before semantic reads. Returned evidence is detached from caller aliases and deeply frozen.

---

## 6. Focused negative and positive coverage

The focused R14 test surface is designed to prove the authorization's semantic obligations, including:

- independent reconstruction of both R13 sides;
- exact three-root public builder arity/order;
- exact eight-key reconstruction bundles;
- rejection of caller-injected serialized predecessor truth;
- same-subject rejection;
- declaration identity/subject mismatch rejection;
- case A and case B plan-request mismatch rejection;
- repository/snapshot/content/task/candidate-set drift rejection;
- case A and case B gold-ground-truth mismatch rejection;
- shared measurement binding drift rejection;
- permitted strategy-local measurement IDs and utilized-candidate outcomes;
- dimension/metric/unit/reducer/missingness/count/direction drift rejection;
- canonical dimension-order rejection;
- exact raw `left - right` arithmetic;
- positive/negative/zero preservation through controlled orientation and equal-outcome cases;
- direction non-normalization;
- one-side/two-side insufficiency handling with null comparison numerics;
- preservation of complete nested R13 evidence;
- missing/extra/wrong declaration contract rejection;
- exact output key sets;
- absence of favored/better-worse/tie/aggregate/ranking/promotion/winner surfaces;
- orientation-sensitive identity;
- property-order invariance and array-order semantics;
- hostile/non-JSON root rejection;
- caller-mutation detachment;
- deep freeze;
- deterministic self-reference-free identity;
- ambient-state exclusion;
- trapped network/subprocess channels remaining unused.

Machine execution results are not claimed in this document before CI runs. The final exact-head machine evidence must come from GitHub Actions on the unchanged implementation PR head.

---

## 7. Explicit non-grants preserved

This implementation does not contain or authorize:

```text
LEFT_FAVORED_BY_DIRECTION / RIGHT_FAVORED_BY_DIRECTION
FAVORED RELATION OF ANY NAME
BETTER / WORSE / SUPERIOR / INFERIOR
TIE VERDICT
CROSS-DIMENSION AGGREGATE SCORE
FAVORED-DIMENSION COUNT / MAJORITY / VOTE
WEIGHTED / NORMALIZED GLOBAL SCORE
PERCENTAGE CHANGE / RATIO / NORMALIZED UTILITY
THRESHOLD / TARGET / TOLERANCE / EPSILON
PARETO / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE SEMANTICS
THREE-OR-MORE-STRATEGY COMPARISON
RANKING / LEADERBOARD / PROMOTION / WINNER / DEFAULT
REAL BENCHMARK / PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION
NETWORK / SECRET / SUBPROCESS / SANDBOX AUTHORITY
NEW DEPENDENCY / DONOR INTAKE
PERSISTENCE / DATABASE / CACHE / TELEMETRY / LEARNING
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION
PUBLIC QUALITY / SUPERIORITY CLAIM
PUBLIC RELEASE / PACKAGE PUBLICATION
P3 OVERALL CLOSURE
P3-R15+ IMPLEMENTATION
P4-P8 IMPLEMENTATION
RULESET CHANGE / BYPASS
WAIVER
```

---

## 8. Qualification state

This evidence file does not self-qualify the implementation.

The implementation remains non-canonical until one unchanged exact PR head proves all applicable machine checks, two independent substantive exact-head semantic review channels, zero unresolved actionable findings/threads, active no-bypass ruleset state, exact four-path scope, guarded expected-head normal merge, and post-merge proof.

```text
IMPLEMENTATION_CANDIDATE = YES
CANONICAL_IMPLEMENTATION = NO UNTIL GUARDED MERGE + POST_MERGE PROOF
WAIVER = NO
```
