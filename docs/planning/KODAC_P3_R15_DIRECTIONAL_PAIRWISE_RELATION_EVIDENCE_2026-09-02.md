# Kodac P3-R15 — Strategy Reduction Directional Relation Evidence

Status: IMPLEMENTATION_CANDIDATE_EVIDENCE / NOT_CANONICAL_UNTIL_MERGED
Date: 2026-09-02
Waiver: NO

---

## 1. Canonical authority

This implementation candidate exists only under the canonical P3-R15 authorization merged by PR #301.

```text
AUTHORIZATION_PR = #301
AUTHORIZATION_QUALIFIED_HEAD = 8669b22791fea80b1668db0ecfd3fd0720b4e585
AUTHORIZATION_DOCUMENT_BLOB = 6761b811959599407caa8b3e01eccaab75aa43e9
AUTHORIZATION_MERGE / CANDIDATE_BASE = 53c9bde577783aef672504f9a463be30bcc8c657
AUTHORIZATION_POST_MERGE_PROOF = #301 / 5510832144
WAIVER = NO
```

The authorization grants exactly one bounded P3-R15 implementation over exactly four paths. It does not grant P3 overall closure, R16+, P4-P8, three-or-more-strategy comparison, global better/worse, aggregation, ranking, promotion/default, statistical inference, execution, persistence/product/release integration, ruleset change, bypass, waiver, or project completion.

---

## 2. Exact implementation scope

The candidate is restricted to exactly these four paths:

```text
packages/kodac-runtime/bench/p3-r15/contracts.ts
packages/kodac-runtime/bench/p3-r15/strategy-reduction-directional-relation.ts
packages/kodac-runtime/test/p3-r15-strategy-reduction-directional-relation.test.ts
docs/planning/KODAC_P3_R15_DIRECTIONAL_PAIRWISE_RELATION_EVIDENCE_2026-09-02.md
```

No predecessor byte, workflow, dependency, lockfile, fixture corpus, product surface, persistence surface, release surface, or ruleset is modified by this candidate.

Exact qualified head/tree/blob identities are intentionally not predeclared here. They must be frozen from live GitHub on one unchanged final PR head and published as immutable qualification evidence before merge.

---

## 3. Implemented public boundary

The public builder is:

```text
buildStrategyReductionDirectionalRelationEvidence(
  leftReconstructionValue,
  rightReconstructionValue,
  comparisonDeclarationValue,
)
```

It requires exactly three runtime arguments before predecessor invocation or caller-root semantic reads.

The implementation does not define a competing normalization or reconstruction path. It passes the three untrusted caller roots directly to canonical P3-R14:

```text
buildStrategyReductionPairwiseComparisonEvidence(...)
```

Only the detached, deeply frozen canonical R14 result is treated as trusted pairwise evidence.

---

## 4. Trusted predecessor preservation

The returned R15 evidence nests the complete canonical R14 evidence object unchanged and preserves exact left/right orientation.

For each of the seven canonical dimensions, R15 copies every R14 dimension-comparison field unchanged:

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

R15 appends exactly one new field:

```text
relation
```

Defense-in-depth checks require canonical R14 root keys, version/kind, identity consistency, deep freeze, seven-dimension cardinality/order, expectedCount=2, supported direction/status vocabulary, finite comparable values, exact left-minus-right delta, and null numeric fields under insufficiency.

These checks operate only on trusted R14 output and never reinterpret caller roots independently.

---

## 5. Closed relation semantics

The only relation values are:

```text
LEFT_FAVORED_BY_DIRECTION
RIGHT_FAVORED_BY_DIRECTION
EQUAL_RAW_VALUE
INSUFFICIENT_EVIDENCE
```

Derivation is deterministic and per dimension only:

```text
INSUFFICIENT_EVIDENCE
  when trusted R14 comparisonStatus == INSUFFICIENT_EVIDENCE

EQUAL_RAW_VALUE
  when trusted comparable leftReducedValue === rightReducedValue

HIGHER_IS_BETTER
  left > right -> LEFT_FAVORED_BY_DIRECTION
  left < right -> RIGHT_FAVORED_BY_DIRECTION

LOWER_IS_BETTER
  left < right -> LEFT_FAVORED_BY_DIRECTION
  left > right -> RIGHT_FAVORED_BY_DIRECTION
```

No epsilon/tolerance, statistical tie/equivalence, confidence, significance, effect-size, weighted score, aggregate winner, or cross-dimension promotion policy exists in this implementation.

`FAVORED_BY_DIRECTION` is evidence about one already-bound metric direction. It is not a global better/worse/superiority verdict.

---

## 6. Deterministic identity and immutability

`directionalRelationEvidenceIdentity` is `sha256Canonical(...)` over every evidence-bearing R15 root field except itself.

The identity binds:

```text
canonical R14 pairwise evidence identity
comparison identity and orientation
left/right strategy subject identities
benchmark/protocol
complete nested R14 evidence
all seven copied dimension comparisons
all seven derived relations
```

Expected properties:

```text
same semantic inputs -> same identity
property insertion order -> irrelevant
left/right reversal -> changed identity
trusted predecessor semantic change -> changed or rejected identity
ambient time/random/environment/network/subprocess/filesystem-write authority -> excluded
identity -> self-reference-free
```

The returned root, nested R14 evidence, dimension relations, and nested children are deeply frozen and detached from caller aliases through the canonical predecessor boundary.

---

## 7. Focused coverage

The focused R15 test surface is designed to prove:

- exact three-argument public arity;
- direct delegation to canonical R14 hostile-input handling;
- accessor rejection before getter execution;
- unpaired-surrogate rejection through R14;
- rejection of caller shortcut/precomputed relation injection;
- complete trusted R14 nesting;
- exact root and relation key sets;
- exact seven-dimension canonical order;
- unchanged copying of all sixteen R14 dimension fields;
- HIGHER_IS_BETTER favored-direction derivation;
- LOWER_IS_BETTER favored-direction derivation;
- left/right reversal semantics and identity change;
- exact numeric equality only for EQUAL_RAW_VALUE;
- one-side insufficiency propagation;
- property-order invariance;
- deterministic self-reference-free identity;
- caller-mutation detachment and deep freeze;
- absence of new aggregate/ranking/promotion/winner/statistical/execution/persistence surfaces;
- ambient time/random/environment/network/subprocess/filesystem-write channels remaining unused.

Machine execution results are not claimed in this document before CI runs. Final exact-head evidence must come from GitHub Actions and any required focused execution on the unchanged implementation PR head.

---

## 8. Explicit non-grants preserved

This implementation does not contain or authorize:

```text
GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR
GLOBAL TIE / EQUIVALENCE VERDICT
CROSS-DIMENSION AGGREGATE SCORE
FAVORED-DIMENSION COUNT / MAJORITY / VOTE
WEIGHTED / NORMALIZED GLOBAL SCORE
PARETO / DOMINANCE POLICY
THRESHOLD / TARGET / TOLERANCE / EPSILON
STATISTICAL SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY
THREE-OR-MORE-STRATEGY COMPARISON
RANKING / LEADERBOARD / PROMOTION / WINNER / DEFAULT
REAL BENCHMARK / PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION
NETWORK / SUBPROCESS / FILESYSTEM-WRITE AUTHORITY
PERSISTENCE / TELEMETRY / LEARNING
PRODUCT / CLI / API INTEGRATION
PACKAGE / RELEASE / PUBLIC SUPERIORITY CLAIM
P3 OVERALL CLOSURE
P3-R16+ IMPLEMENTATION
P4-P8 IMPLEMENTATION
RULESET CHANGE / BYPASS / WAIVER
PROJECT COMPLETION
```

Predecessor metadata remains preserved when required by canonical R14 evidence; preservation of metadata is not execution authority.

---

## 9. Qualification boundary

This document is candidate evidence only. Canonical closure requires one unchanged exact head proving:

```text
EXACT FOUR-PATH ALLOWLIST
BEHIND_BY = 0
TYPECHECK SUCCESS
FOCUSED P3-R15 TESTS SUCCESS
FULL TESTS SUCCESS
GOVERNANCE SUCCESS
K2 CLASSIFIER + UBUNTU + WINDOWS + MACOS + STABLE GATE SUCCESS
TWO DISTINCT INDEPENDENT SUBSTANTIVE EXACT-HEAD SEMANTIC REVIEWS TERMINAL-CLEAN
ZERO UNRESOLVED MATERIAL FINDINGS
ZERO UNRESOLVED ACTIONABLE REVIEW THREADS
RULESET 20707483 ACTIVE / NO BYPASS
GUARDED NORMAL MERGE WITH EXPECTED HEAD
POST-MERGE OBJECT / BLOB / SIGNATURE / CHECK / RULESET PROOF
WAIVER = NO
```

Any head movement invalidates previous machine/review qualification evidence and requires requalification from zero.
