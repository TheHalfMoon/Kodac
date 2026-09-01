# Kodac P3-R12 Two-Case Reduction Evidence — 2026-09-01

## 1. Status

```text
P3-R12 IMPLEMENTATION = CANDIDATE
P3-R12 CLOSED_CANONICAL = NO
P3 OVERALL = OPEN
P3-R13+ IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

This record documents one bounded implementation candidate only. It does not self-assert qualification, merge, post-merge proof, P3 closure, benchmark quality, direction, comparison, ranking, promotion, product, or release authority.

---

## 2. Canonical authority

The implementation is governed by the canonical authorization merged through PR #291.

```text
AUTHORIZATION_PR = #291
AUTHORIZATION_QUALIFIED_HEAD = fca41c598cf9c6998498648a086191929a45e660
AUTHORIZATION_QUALIFICATION_PROOF = #291 / 5495853451
AUTHORIZATION_MERGE = 0aad292ebf3e5f84804b5f731e888da43cb8e883
AUTHORIZATION_MERGE_TREE = f40298d139b0685b511ea1ffe0225aa7e23f5692
AUTHORIZATION_BLOB = 8efe833ba236c90af541d21ff3e7cbef5907f2c3
AUTHORIZATION_POST_MERGE_PROOF = #291 / 5495894426
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

The exact implementation allowlist is:

```text
packages/kodac-runtime/bench/p3-r12/contracts.ts
packages/kodac-runtime/bench/p3-r12/single-strategy-two-case-reduction-evidence.ts
packages/kodac-runtime/test/p3-r12-single-strategy-two-case-reduction-evidence.test.ts
docs/planning/KODAC_P3_R12_TWO_CASE_REDUCTION_EVIDENCE_2026-09-01.md
```

No fifth path is authorized.

---

## 3. Implemented boundary

The candidate implements this pure local flow:

```text
UNTRUSTED STRATEGY DECLARATION
+ UNTRUSTED P3-R9 COMPOSITION DECLARATION
+ UNTRUSTED P3-R10 ALIGNMENT DECLARATION
+ UNTRUSTED P3-R11 POLICY DECLARATION
+ UNTRUSTED P3-R12 REDUCTION DECLARATION
+ ORIGINAL CASE A PREIMAGES
+ ORIGINAL CASE B PREIMAGES
-> canonical-JSON snapshots of every public input
-> reconstruct canonical P3-R11 through its public builder
-> bind P3-R12 declaration to the freshly reconstructed R11 identity
-> require exact strategy / benchmark / protocol continuity
-> require exactly seven canonical P3-R6 dimensions in canonical order
-> consume only the two trusted R11 observations for each dimension
-> derive exact two-slot coverage
-> apply the already-canonical P2-R3 reducer / missingness semantics
-> preserve both source observations and member references
-> derive one deterministic P3-R12 reduction evidence identity
-> return detached deeply frozen evidence
```

The implementation does not accept a caller-serialized R11 evidence result as truth and does not forge a shared P2-R2 report identity.

---

## 4. Exact pair coverage semantics

Every dimension has exactly two source slots:

```text
expectedCount = 2
```

Canonical R11 source states are only:

```text
observed
unavailable
```

Therefore R12 derives:

```text
observedCount + unavailableCount = 2
```

R12 does not invent a `missingCount` field.

Coverage sufficiency is evaluated only after the missingness policy has been validated as one of the two canonical supported values:

```text
REQUIRE_COMPLETE:
  REDUCED iff observedCount == 2

OBSERVED_ONLY_WITH_COVERAGE:
  REDUCED iff observedCount >= minimumObservedCount

for either supported policy, when its coverage predicate is not met:
  INSUFFICIENT_EVIDENCE

any other missingness policy:
  CONTRACT_VIOLATION / FAIL_CLOSED
```

`INSUFFICIENT_EVIDENCE` is therefore a coverage result under an already-valid canonical policy. It is not a fallback for an unsupported or drifted missingness policy.

Unavailable evidence is never imputed, coerced, converted to zero, or included in a reducer denominator.

---

## 5. Numeric reduction semantics

For:

```text
valueKind = NUMBER
reducer = ARITHMETIC_MEAN
```

R12:

- accepts only finite observed numbers inherited from canonical R11;
- reduces only observed values when sufficiency is met;
- uses the same arithmetic-mean accumulation semantics as canonical P2-R3;
- preserves `outputUnit = inputUnit`;
- emits `reducedValue = null` when evidence is insufficient;
- emits `trueCount = null` and `denominatorCount = null`;
- fails closed on non-finite arithmetic.

No rounding, normalization, thresholding, direction, weighting, or scoring occurs.

---

## 6. Boolean reduction semantics

For:

```text
valueKind = BOOLEAN
reducer = BOOLEAN_TRUE_RATE
```

R12 derives:

```text
trueCount = number of observed true values
denominatorCount = observedCount
outputUnit = ratio_0_1
```

When sufficient:

```text
reducedValue = trueCount / denominatorCount
```

When insufficient:

```text
reducedValue = null
```

`trueCount` and `denominatorCount` still preserve the observed boolean evidence when insufficient, matching canonical P2-R3 semantics. Zero observed booleans therefore produce count evidence `0 / 0` with `reducedValue = null`; no division is attempted.

Reducer admission is strict and local to R12:

```text
NUMBER + ARITHMETIC_MEAN = supported
BOOLEAN + BOOLEAN_TRUE_RATE = supported
any other reducer = CONTRACT_VIOLATION / FAIL_CLOSED
any reducer / valueKind mismatch = CONTRACT_VIOLATION / FAIL_CLOSED
```

Unsupported or drifted reducer vocabulary is never translated into `INSUFFICIENT_EVIDENCE` and never falls through to another reducer branch.

---

## 7. Seven independent dimensions

R12 reduces exactly the canonical P3-R6 dimensions in canonical order:

```text
recall-at-k
precision-at-k
file-f1
token-budgeted-evidence-yield
no-gold-abstention
explored-vs-utilized-context
context-dilution
```

Every dimension remains independent. R12 does not compute a cross-dimension sum, mean, normalized score, weighted score, aggregate score, rank, or winner.

---

## 8. Output contract

The result contains only bounded reduction evidence:

```text
version
kind
reductionEvidenceIdentity
reductionDeclaration
reductionId
policyBindingEvidenceIdentity
strategySubjectIdentity
benchmarkId
benchmarkProtocolVersion
memberAReference
memberBReference
dimensionReductions
```

Each dimension reduction contains:

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
observedCount
unavailableCount
status
reducedValue
trueCount
denominatorCount
memberAObservation
memberBObservation
```

`missingCount` is intentionally absent because it is outside the canonical R11 state boundary.

---

## 9. Determinism and fail-closed behavior

The candidate:

- canonical-JSON snapshots every public input before semantic reuse;
- exact-key validates the R12 declaration;
- validates bounded stable identifiers and exact SHA-256 identity formats;
- reconstructs R11 from original preimages;
- rejects R11 identity, strategy, benchmark, or protocol mismatch;
- verifies canonical seven-dimension order;
- rejects source states outside `observed | unavailable`;
- rejects any missingness policy outside `REQUIRE_COMPLETE | OBSERVED_ONLY_WITH_COVERAGE`;
- rejects any reducer outside `ARITHMETIC_MEAN | BOOLEAN_TRUE_RATE` and any reducer / value-kind mismatch;
- derives identity over the complete semantic projection;
- returns detached deeply frozen evidence;
- requires no network, clock, randomness, environment, filesystem, or subprocess state.

Hostile proxy, accessor, symbol-bearing, cyclic, sparse, non-finite, unknown-field, missing-field, malformed-identity, and stale-predecessor inputs fail closed through the canonical snapshot and predecessor reconstruction boundaries.

---

## 10. Test coverage in this candidate

The focused R12 test suite covers:

1. exactly seven independent canonical dimensions;
2. no forbidden aggregate/direction/ranking fields;
3. exact arithmetic mean from the two trusted numeric observations;
4. both-unavailable boolean evidence -> insufficient evidence with preserved zero counts;
5. one-observed/one-unavailable boolean evidence under observed-only coverage;
6. the same partial evidence under `REQUIRE_COMPLETE` -> insufficient evidence;
7. two-observed boolean true-rate semantics;
8. fresh R11 identity / strategy / benchmark binding;
9. unknown R12 declaration fields;
10. forged predecessor-shaped fields;
11. predecessor preimage drift after identity binding;
12. deterministic object-key-order-invariant output;
13. semantic identity change under legitimate policy change;
14. deep freeze / caller-mutation isolation;
15. hostile canonical-JSON structures;
16. malformed / missing / unsupported reduction declarations;
17. no ambient network / clock / randomness / environment dependency;
18. no ambient filesystem / subprocess dependency.

The repository's existing P3-R11, P3-R10, P3-R9, P3-R8, P3-R7, P3-R6, and P2-R3 suites remain part of full CI qualification.

---

## 11. Explicit non-grants

This candidate does not authorize or implement:

```text
REAL BENCHMARK TASK EXECUTION = NO
THREE-OR-MORE-CASE REDUCTION = NO
UNBOUNDED REDUCTION = NO
CROSS-DIMENSION AGGREGATE SCORE = NO
DIRECTION = NO
HIGHER_IS_BETTER = NO
LOWER_IS_BETTER = NO
DELTA = NO
BETTER_WORSE = NO
PAIRWISE STRATEGY COMPARISON = NO
RANKING = NO
PROMOTION = NO
WINNER = NO
REPOSITORY DEFAULT = NO
PROVIDER EXECUTION = NO
MODEL EXECUTION = NO
EVALUATOR EXECUTION = NO
NETWORK = NO
PERSISTENCE = NO
LEARNING = NO
PRODUCT AUTHORITY = NO
RELEASE AUTHORITY = NO
RULESET MUTATION = NO
BYPASS = NO
P3 OVERALL CLOSURE = NO
P3-R13+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

---

## 12. Qualification still required

This record remains a candidate until one final frozen exact head proves all authorization-required gates:

```text
BASE = canonical authorization merge
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 4
TYPECHECK = PASS
FOCUSED R12 TESTS = PASS
FULL TEST SUITE = PASS
PATCH BENCHMARK HOOK = PASS
GOVERNANCE / PROVENANCE / LEGACY TESTS = PASS
K2 UBUNTU / WINDOWS / MACOS / STABLE GATE = PASS
INDEPENDENT SUBSTANTIVE EXACT-HEAD SEMANTIC CHANNELS = 2 / 2 TERMINAL CLEAN
UNRESOLVED ACTIONABLE THREADS = 0
RULESET 20707483 = active / no bypass
QUALIFICATION PROOF = immutable GitHub comment
MERGE = guarded normal merge / exact expected head
POST_MERGE PROOF = mandatory
WAIVER = NO
```

No current development SHA is declared qualified by this file. Final head/tree/blob IDs, CI job IDs, reviewer identities, merge SHA, signature, and post-merge proof must be recorded from live GitHub facts only after development stops.
