# Kodac P3-R13 Reduction Direction Binding Evidence — 2026-09-01

## 1. Status

```text
P3-R13 IMPLEMENTATION = CANDIDATE
P3-R13 CLOSED_CANONICAL = NO
PAIRWISE STRATEGY COMPARISON = NOT_AUTHORIZED
P3 OVERALL = OPEN
P3-R14+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

This record documents one bounded implementation candidate only. It does not self-assert exact-head qualification, merge, post-merge proof, pairwise comparison, ranking, promotion, P3 closure, product integration, release authority, or public quality claims.

---

## 2. Canonical authority

The implementation is governed by the P3-R13 authorization canonically merged through PR #295 and its mandatory post-merge proof.

```text
AUTHORIZATION_PR = #295
AUTHORIZATION_QUALIFIED_HEAD = 5eb7414edcc43c1c8e15fe0ca6f81b430fee8b03
AUTHORIZATION_MERGE = 2a67a91c6d5eef829872823f5fa6441f7a644d67
AUTHORIZATION_MERGE_TREE = a52622fb1b67103d0a163fe4d44ca8a901e2343e
AUTHORIZATION_BLOB = bc6b039cab6dbc3a570cedafe2b8f226634aa767
AUTHORIZATION_POST_MERGE_PROOF = #295 / 5498626758
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The exact implementation allowlist is:

```text
packages/kodac-runtime/bench/p3-r13/contracts.ts
packages/kodac-runtime/bench/p3-r13/reduction-direction-binding.ts
packages/kodac-runtime/test/p3-r13-reduction-direction-binding.test.ts
docs/planning/KODAC_P3_R13_REDUCTION_DIRECTION_BINDING_EVIDENCE_2026-09-01.md
```

No fifth path is authorized. P2-R1 through P2-R5 and P3-R1 through P3-R12 predecessor bytes remain read-only.

---

## 3. Implemented boundary

The candidate implements exactly one pure local direction-policy binding layer:

```text
UNTRUSTED STRATEGY DECLARATION
+ UNTRUSTED P3-R9 COMPOSITION DECLARATION
+ UNTRUSTED P3-R10 ALIGNMENT DECLARATION
+ UNTRUSTED P3-R11 POLICY DECLARATION
+ UNTRUSTED P3-R12 REDUCTION DECLARATION
+ UNTRUSTED P3-R13 DIRECTION DECLARATION
+ ORIGINAL CASE A PREIMAGES
+ ORIGINAL CASE B PREIMAGES
-> canonical-JSON snapshot every public input
-> normalize the exact P3-R13 declaration grammar
-> reconstruct canonical P3-R12 from original predecessor preimages
-> cross-bind the declaration to the freshly reconstructed R12 identity and semantics
-> preserve exactly seven canonical P3 dimensions in canonical order
-> bind only explicit HIGHER_IS_BETTER | LOWER_IS_BETTER metadata
-> preserve the complete trusted R12 evidence unchanged
-> derive one self-reference-free deterministic canonical SHA-256 evidence identity
-> return detached deeply frozen evidence
```

The public builder is exactly:

```text
buildReductionDirectionBindingEvidence(
  strategyDeclarationValue,
  compositionDeclarationValue,
  alignmentDeclarationValue,
  policyDeclarationValue,
  reductionDeclarationValue,
  directionDeclarationValue,
  caseAInputsValue,
  caseBInputsValue,
)
```

Every public input is `unknown` at the trust boundary.

No caller-claimed serialized P3-R12 evidence object is accepted as derivation truth or as a public builder input.

---

## 4. Exact declaration contract

The direction declaration is exact-key closed:

```text
version
kind
directionBindingId
reductionEvidenceIdentity
strategySubjectIdentity
benchmarkId
benchmarkProtocolVersion
dimensionDirections
```

Exact literals:

```text
version = p3-r13-reduction-direction-binding-declaration-v1
kind = bind_reduction_directions
```

The root declaration must cross-bind exactly to the freshly reconstructed P3-R12 record:

```text
reductionEvidenceIdentity
strategySubjectIdentity
benchmarkId
benchmarkProtocolVersion
```

`directionBindingId` follows the existing bounded canonical P3 stable-ID discipline.

Unknown or missing keys fail closed.

---

## 5. Exact seven-dimension direction contract

`dimensionDirections` contains exactly seven entries in canonical `P3_R6_DIMENSIONS` order.

Every entry is exact-key closed:

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

For every index, all fields except `direction` must exactly equal the corresponding trusted reconstructed P3-R12 dimension reduction.

The only caller-selected semantic field is:

```text
direction = HIGHER_IS_BETTER | LOWER_IS_BETTER
```

Direction is never inferred from metric ID, dimension name, units, value kind, reducer, observed values, reduced values, historical values, or external convention.

A missing, extra, duplicated, reordered, substituted, or drifted dimension entry fails closed.

---

## 6. R12 reconstruction and trust boundary

The candidate calls the canonical public P3-R12 builder with canonical-JSON snapshots of the original predecessor preimages.

Therefore:

```text
CALLER SERIALIZED R12 CLAIM != DERIVATION TRUTH
ORIGINAL PREIMAGES -> CANONICAL R12 BUILDER -> TRUSTED R12
```

The implementation then binds the P3-R13 declaration to that reconstructed record. A later mutation or semantic drift in predecessor preimages cannot be hidden by reusing an earlier caller-supplied R12 serialization.

All predecessor source/tests/authorization/evidence files remain unchanged.

---

## 7. Insufficient-evidence preservation

Direction metadata is independent from whether a particular two-case reduction has sufficient observed evidence.

A direction may be explicitly bound to a trusted dimension whose canonical R12 status is:

```text
INSUFFICIENT_EVIDENCE
```

P3-R13 preserves the complete R12 dimension reduction through the root `reductionEvidence` field, including:

```text
status
reducedValue
trueCount
denominatorCount
expectedCount
observedCount
unavailableCount
memberAObservation
memberBObservation
```

The candidate does not convert insufficient evidence to reduced evidence, invent a value, infer a favored side, emit pass/fail, emit better/worse, or suppress coverage/unavailable evidence.

---

## 8. Exact output contract

The result root is exact-key closed:

```text
version
kind
directionBindingEvidenceIdentity
directionDeclaration
directionBindingId
reductionEvidenceIdentity
strategySubjectIdentity
benchmarkId
benchmarkProtocolVersion
reductionEvidence
dimensionDirectionBindings
```

Exact literals:

```text
version = p3-r13-reduction-direction-binding-evidence-v1
kind = reduction_direction_binding_evidence
```

The output preserves:

- the complete normalized exact-key direction declaration;
- the complete trusted reconstructed canonical P3-R12 result through `reductionEvidence`;
- exactly seven direction bindings in canonical dimension order;
- exact strategy/benchmark/protocol continuity.

Every `dimensionDirectionBindings[i]` is exact-key closed and byte-for-field equivalent to `directionDeclaration.dimensionDirections[i]`. Its non-direction fields are constructed from the trusted P3-R12 reduction semantics after exact cross-binding.

No second partial or mutable reduction representation is introduced.

---

## 9. Deterministic identity

`directionBindingEvidenceIdentity` is `sha256Canonical(...)` over every normalized output field except the identity itself.

The preimage therefore includes:

```text
directionDeclaration
directionBindingId
reductionEvidenceIdentity
strategySubjectIdentity
benchmarkId
benchmarkProtocolVersion
complete reductionEvidence
all seven dimensionDirectionBindings
```

Required properties:

- identical canonical semantic inputs produce identical identity;
- changing one explicit direction changes identity;
- property insertion order does not change identity;
- array order remains semantic;
- the identity is self-reference-free;
- ambient time, process ID, paths, environment variables, and similar noise do not enter identity.

---

## 10. Canonical-JSON hostile-structure rejection

Every public input is snapshotted through the existing canonical P2-R1 JSON boundary before semantic use.

That boundary rejects, among other non-canonical structures:

```text
Proxy objects
accessor properties
symbol fields
sparse arrays
non-canonical array properties
non-plain object prototypes
cycles
non-finite numbers
non-JSON values
```

P3-R13 adds no alternate parsing path that bypasses this boundary.

---

## 11. Immutability and detachment

The final output is detached from caller-owned mutable input objects and deeply frozen.

The implementation materializes fresh direction-binding objects from trusted reconstructed R12 semantics. Caller mutation after return cannot alter the evidence record or its identity-bearing contents.

---

## 12. Focused proof matrix

The focused P3-R13 test file directly covers the authorization obligations, including:

1. valid exact-seven-dimension reconstruction and deterministic evidence;
2. exact public builder argument order;
3. acceptance of both explicit direction literals;
4. rejection of unknown direction literals;
5. missing / extra / duplicate / reordered dimension rejection;
6. metric ID drift rejection;
7. input-unit drift rejection;
8. output-unit drift rejection;
9. value-kind drift rejection;
10. reducer drift rejection;
11. missingness-policy drift rejection;
12. minimum-observed-count drift rejection;
13. reconstructed R12 identity mismatch rejection;
14. strategy-subject mismatch rejection;
15. benchmark ID mismatch rejection;
16. benchmark protocol mismatch rejection;
17. unknown / missing declaration key rejection;
18. caller-serialized R12 substitution rejection;
19. reconstruction from original predecessor preimages and drift detection;
20. complete `INSUFFICIENT_EVIDENCE` preservation;
21. exact output root-key closure;
22. exact direction-binding entry-key closure;
23. declaration / output / trusted-R12 field equivalence;
24. absence of delta / relation / better-worse / ranking / promotion / winner / global-score semantics;
25. one-direction identity sensitivity;
26. object-property insertion-order invariance;
27. semantic array-order enforcement;
28. hostile Proxy/accessor/symbol/sparse/non-plain input rejection;
29. caller-mutation detachment;
30. deep-freeze proof;
31. self-reference-free canonical identity recomputation;
32. ambient environment/time/process noise exclusion;
33. exact four-path diff qualification as a repository-level gate.

Repository CI and exact-head review evidence remain separate qualification evidence and must not be inferred from this document.

---

## 13. Explicit non-grants

The candidate does not implement or authorize:

```text
RAW DELTA
LEFT / RIGHT SUBJECT COMPARISON
PAIRWISE STRATEGY COMPARISON
FAVORED RELATION
BETTER / WORSE VERDICT
THREE-OR-MORE-CASE OR UNBOUNDED COMPOSITION / REDUCTION
CROSS-DIMENSION AGGREGATE SCORE
WEIGHTED / BLENDED / NORMALIZED GLOBAL SCORE
THRESHOLD / TARGET / TOLERANCE / EPSILON SEMANTICS
PARETO / STATISTICAL / SIGNIFICANCE / CONFIDENCE SEMANTICS
RANKING / LEADERBOARD
PROMOTION / DEFAULT / WINNER
REAL BENCHMARK TASK / PARTICIPANT EXECUTION
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION
NETWORK / SECRET / SUBPROCESS / SANDBOX EXPANSION
NEW DEPENDENCY / DONOR INTAKE
PERSISTENCE / DATABASE / TELEMETRY / LEARNING
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION
PUBLIC QUALITY / SUPERIORITY CLAIMS
PUBLIC RELEASE / PACKAGE PUBLICATION
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION
P3 OVERALL CLOSURE
P3-R14+ IMPLEMENTATION
P4-P8 IMPLEMENTATION
RULESET CHANGE / BYPASS
WAIVER
```

Direction binding is metadata-bound evidence. It is not comparison, quality judgment, ranking, or repository-owned promotion policy.

---

## 14. Qualification contract

This candidate becomes eligible for canonical merge only if one frozen exact head proves all required gates:

```text
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 4
CHANGED_PATHS = EXACT AUTHORIZED FOUR-PATH ALLOWLIST
TYPECHECK = PASS
FOCUSED P3-R13 TESTS = PASS
FULL TESTS = PASS
PATCH BENCHMARK HOOK = PASS WHEN APPLICABLE
GOVERNANCE = SUCCESS
K2 RUNTIME-CHANGE CLASSIFIER = SUCCESS
K2 UBUNTU = SUCCESS
K2 MACOS = SUCCESS
K2 WINDOWS = SUCCESS
K2 STABLE GATE = SUCCESS
INDEPENDENT EXTERNAL SUBSTANTIVE SEMANTIC REVIEW CHANNELS = 2 / 2 TERMINAL CLEAN
UNRESOLVED MATERIAL FINDINGS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET 20707483 = active / no bypass
GUARDED NORMAL MERGE = exact expected head
POST_MERGE PROOF = REQUIRED
WAIVER = NO
```

Any head movement invalidates exact-head CI/review qualification evidence. Qualification and post-merge proof must be published immutably on the implementation PR rather than retroactively written into this frozen candidate record.

---

## 15. Conclusion

The candidate implements only the minimum semantic layer canonically authorized after P3-R12:

```text
CANONICAL P3-R12 REDUCTION EVIDENCE
+ EXPLICIT EXACT-SEVEN-DIMENSION CALLER DIRECTION DECLARATION
-> EXACT DIRECTION BINDING
-> DETERMINISTIC IMMUTABLE DIRECTION-BINDING EVIDENCE
```

It preserves the separation:

```text
REDUCTION != DIRECTION BINDING
DIRECTION BINDING != PAIRWISE COMPARISON
PAIRWISE COMPARISON != GLOBAL AGGREGATION
GLOBAL AGGREGATION != RANKING / PROMOTION
```

```text
P3-R13 IMPLEMENTATION = CANDIDATE
P3-R13 CLOSED_CANONICAL = NO
P3 OVERALL = OPEN
WAIVER = NO
```
