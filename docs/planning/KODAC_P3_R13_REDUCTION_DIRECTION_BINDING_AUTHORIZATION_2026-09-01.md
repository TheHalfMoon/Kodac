# Kodac P3-R13 — Bounded Reduction Direction Binding Authorization Candidate

Status: AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY
Date: 2026-09-01
Owner: Kodac founder
Waiver: NO

---

## 1. Purpose

This record proposes one bounded documentation/governance authorization for a future pure deterministic **caller-declared per-dimension direction binding** over one reconstructed canonical P3-R12 exactly-two-case reduction-evidence record.

This is the minimum post-R12 semantic layer supported by current canonical evidence:

```text
CANONICAL P3-R12 REDUCTION EVIDENCE
+ ONE EXPLICIT EXACT-SEVEN-DIMENSION DIRECTION DECLARATION
-> RECONSTRUCT TRUSTED R12 FROM ORIGINAL PREIMAGES
-> CROSS-BIND EACH DECLARED DIRECTION TO THE EXACT TRUSTED R12 DIMENSION SEMANTICS
-> PRESERVE THE COMPLETE TRUSTED R12 EVIDENCE
-> EMIT ONE DETERMINISTIC IMMUTABLE DIRECTION-BINDING EVIDENCE IDENTITY
-> NO DELTA / RELATION / PAIRWISE COMPARISON / RANKING / PROMOTION
```

This document does **not** implement P3-R13. Effective implementation authority remains `NONE` unless and until this exact authorization record qualifies, merges normally into protected `main`, and completes mandatory post-merge proof.

---

## 2. Canonical baseline

Prepared only after canonical P3-R12 implementation and mandatory current-view reconciliation:

```text
CANONICAL_MAIN_AT_PREPARATION = ad0c3e1236c546c005c7f688f991ecbc9ed64fa5
CANONICAL_MAIN_TREE = e7bfd072ea3a1a283d48189a48e1327a575966c7

P3_R12_AUTHORIZATION_PR = #291
P3_R12_AUTHORIZATION_BLOB = 8efe833ba236c90af541d21ff3e7cbef5907f2c3
P3_R12_AUTHORIZATION_MERGE = 0aad292ebf3e5f84804b5f731e888da43cb8e883
P3_R12_AUTHORIZATION_POST_MERGE_PROOF = #291 / 5495894426

P3_R12_IMPLEMENTATION_PR = #293
P3_R12_QUALIFIED_HEAD = 1e3741573b3bfd20f5746c8bda91c98c7f06206b
P3_R12_IMPLEMENTATION_MERGE = 7d9de3e1ea544677eac93a455b9ab06a5ef35903
P3_R12_POST_MERGE_PROOF = #293 / 5497699790
P3_R12_RECONCILIATION_BOUNDARY = #293 / 5497702022

P3_R12_CURRENT_VIEW_RECONCILIATION_PR = #294
P3_R12_CURRENT_VIEW_RECONCILIATION_QUALIFIED_HEAD = 15907c3f34282c3dbcbd822ce9c9c979610bb5cb
P3_R12_CURRENT_VIEW_RECONCILIATION_QUALIFICATION_PROOF = #294 / 5498333217
P3_R12_CURRENT_VIEW_RECONCILIATION_MERGE = ad0c3e1236c546c005c7f688f991ecbc9ed64fa5
P3_R12_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #294 / 5498358794

RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical state remains:

```text
P3-R1 THROUGH P3-R12 = CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P3-R13+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
```

This authorization candidate may change only this document. It does not change current-view pages while non-canonical.

---

## 3. Observed canonical gap

Canonical `P3R12DimensionReduction` already preserves, for each of exactly seven dimensions:

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
observedCount
unavailableCount
status = REDUCED | INSUFFICIENT_EVIDENCE
reducedValue
trueCount
denominatorCount
memberAObservation
memberBObservation
```

Canonical P3-R12 also preserves exact strategy, benchmark, protocol, R11 policy-binding, member references, and deterministic reduction-evidence identity.

P3-R12 deliberately contains no contract for:

```text
HIGHER_IS_BETTER
LOWER_IS_BETTER
raw delta
left/right comparison
favored relation
better/worse
cross-dimension aggregate
rank
promotion
winner/default
```

Canonical P3-R12 authorization explicitly records that reduction/aggregation and direction are separable semantic layers.

A later pairwise comparison would combine two independent steps:

1. bind explicit direction semantics to each reduced dimension;
2. compare two distinct strategy reduction records.

Kodac's durable P3 goal is `MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME`. Therefore this authorization covers step 1 only.

---

## 4. Canonical internal precedent

### 4.1 P2-R4 direction vocabulary

Canonical `packages/kodac-runtime/bench/p2-r4/comparison.ts` defines the closed vocabulary:

```text
HIGHER_IS_BETTER
LOWER_IS_BETTER
```

P2-R4 makes direction an explicit policy field rather than inferring it from metric names, units, values, reducers, or observed outcomes.

P3-R13 may reuse this **vocabulary and explicit-policy precedent only**. It may not reuse or claim P2-R4 pairwise-comparison identity or semantics.

### 4.2 P2-R5 is downstream and not imported

Canonical P2-R5 derives pairwise relations only after a validated P2-R4 comparison:

```text
LEFT_FAVORED_BY_DIRECTION
RIGHT_FAVORED_BY_DIRECTION
EQUAL_RAW_VALUE
INSUFFICIENT_EVIDENCE
```

Those states require two sides. P3-R13 must not import or emit them.

### 4.3 P3-R12 reconstruction remains authoritative

A caller-claimed serialized `TwoCaseReductionEvidence` is untrusted and may not be accepted as derivation truth.

The future P3-R13 builder must reconstruct canonical P3-R12 from original predecessor preimages by calling the canonical public P3-R12 builder. P3-R12 source/tests/authorization/evidence remain read-only.

---

## 5. Supporting external precedent rechecked on 2026-09-01

External precedent is supporting evidence only and creates no Kodac authority.

### EleutherAI lm-evaluation-harness

Current public sources:

- https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/new_task_guide.md
- https://github.com/EleutherAI/lm-evaluation-harness/blob/main/lm_eval/api/metrics.py

Observed precedent: metric configuration separates `aggregation` from `higher_is_better`; aggregation such as `mean` is independent from directional metadata.

### UK AISI Inspect

Current public sources:

- https://inspect.aisi.org.uk/scoring.html
- https://inspect.aisi.org.uk/metrics.html
- https://inspect.aisi.org.uk/reference/inspect_ai.scorer.html

Observed precedent: reduction is explicit and auditable; reducers such as `mean`, `median`, `mode`, and `collect` do not themselves create a later comparison verdict.

### Hugging Face Evaluate

Current public sources:

- https://huggingface.co/docs/evaluate/a_quick_tour
- https://huggingface.co/docs/evaluate/en/base_evaluator

Observed precedent: multiple metrics remain independently named outputs rather than requiring one global scalar.

These sources support separating reduction, direction metadata, comparison, and global aggregation into distinct layers.

---

## 6. Proposed future public API

Only after this exact authorization becomes canonical and post-merge proven may one later implementation expose exactly one public builder with this semantic argument order:

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

The exact flow is:

```text
UNTRUSTED PUBLIC INPUTS
-> CANONICAL-JSON SNAPSHOT / HOSTILE-STRUCTURE REJECTION
-> NORMALIZE THE P3-R13 DIRECTION DECLARATION
-> RECONSTRUCT CANONICAL P3-R12 FROM ORIGINAL PREIMAGES
-> EXACT DECLARATION / R12 CROSS-BINDING
-> DETERMINISTIC IMMUTABLE P3-R13 EVIDENCE
```

No caller-claimed serialized P3-R12 result is an input to this builder.

---

## 7. Exact direction declaration contract

The future declaration is an exact-key object containing **only**:

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

Validation rules:

- `directionBindingId` uses the existing bounded canonical P3 stable-ID discipline;
- `reductionEvidenceIdentity` must be `sha256:<64 lowercase hex>` and exactly match reconstructed P3-R12;
- `strategySubjectIdentity` must be bare `<64 lowercase hex>` and exactly match reconstructed P3-R12;
- `benchmarkId` and `benchmarkProtocolVersion` must be non-empty canonical strings and exactly match reconstructed P3-R12;
- unknown or missing top-level keys fail closed.

---

## 8. Exact seven-dimension direction entry contract

`dimensionDirections` contains exactly seven entries in canonical `P3_R6_DIMENSIONS` order.

Every entry is an exact-key object containing **only**:

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

For entry index `i`, these fields must exactly equal trusted reconstructed P3-R12 `dimensionReductions[i]`:

```text
dimension
metricId
inputUnit
outputUnit
valueKind
reducer
missingnessPolicy
minimumObservedCount
```

The only caller-selected field is:

```text
direction = HIGHER_IS_BETTER | LOWER_IS_BETTER
```

No missing dimension, extra dimension, duplicate dimension, reordered dimension, metric substitution, unit drift, value-kind drift, reducer drift, missingness drift, or minimum-coverage drift is permitted.

Direction must never be inferred from:

```text
metricId
dimension
inputUnit
outputUnit
valueKind
reducer
observed values
reduced value
historical values
external convention
```

A declared direction is evidence of the **declared policy binding only**. It does not prove universal correctness, repository-owned policy, benchmark optimality, or public-quality semantics.

---

## 9. Insufficient-evidence behavior

Direction metadata is independent from whether this particular R12 two-case record has enough observed evidence to reduce.

A direction may therefore be bound to a dimension whose trusted R12 status is `INSUFFICIENT_EVIDENCE`.

P3-R13 must preserve the complete trusted R12 status, value/nullability, observation, and coverage evidence exactly. It must not:

- convert `INSUFFICIENT_EVIDENCE` to `REDUCED`;
- invent a numeric or boolean value;
- infer a favored side;
- emit pass/fail;
- emit better/worse;
- suppress unavailable or coverage evidence.

---

## 10. Exact output contract

The future evidence record is an exact-key object containing **only**:

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

Exact field rules:

- `directionDeclaration` is the complete normalized exact-key declaration from Section 7;
- `directionBindingId` exactly equals `directionDeclaration.directionBindingId`;
- `reductionEvidenceIdentity` exactly equals trusted reconstructed P3-R12 `reductionEvidenceIdentity`;
- `strategySubjectIdentity`, `benchmarkId`, and `benchmarkProtocolVersion` exactly equal trusted reconstructed P3-R12;
- `reductionEvidence` is the complete trusted reconstructed canonical P3-R12 result, never a caller-provided serialized claim;
- `dimensionDirectionBindings` contains exactly seven entries in canonical `P3_R6_DIMENSIONS` order;
- unknown or missing output keys are forbidden by the implementation contract.

Every `dimensionDirectionBindings[i]` is an exact-key object containing **only**:

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

It is byte-for-field equivalent to normalized `directionDeclaration.dimensionDirections[i]` and is independently cross-checked against trusted `reductionEvidence.dimensionReductions[i]` for every non-direction field.

The complete trusted P3-R12 reduction payload remains available only through the root `reductionEvidence` field; no second mutable or partially copied reduction representation is authorized.

---

## 11. Identity rule

`directionBindingEvidenceIdentity` is `sha256Canonical(...)` over the complete normalized output projection containing every Section 10 field **except** `directionBindingEvidenceIdentity` itself.

Therefore the identity preimage includes:

- the complete normalized direction declaration;
- direction binding ID;
- trusted R12 identity and complete trusted R12 evidence;
- strategy/benchmark/protocol bindings;
- all seven exact dimension direction bindings.

Required consequences:

- semantically identical canonical inputs produce identical bytes and identity;
- changing any one direction changes the evidence identity;
- changing any trusted R12 semantic binding changes or rejects the record;
- object-property insertion order does not change identity;
- array order remains semantic and canonical;
- time, host paths, process IDs, environment variables, ambient state, and similar noise do not enter identity.

The final identity is self-reference-free.

---

## 12. Immutability and detachment

The output must be detached from caller mutation and deeply frozen.

No mutable alias to any caller input may survive in the returned evidence.

---

## 13. Explicit semantic non-grants

Even after this authorization becomes canonical, the future implementation remains forbidden from adding:

```text
RAW DELTA = NOT_AUTHORIZED
LEFT / RIGHT SUBJECT COMPARISON = NOT_AUTHORIZED
PAIRWISE STRATEGY COMPARISON = NOT_AUTHORIZED
FAVORED RELATION = NOT_AUTHORIZED
BETTER / WORSE SYSTEM OR STRATEGY VERDICT = NOT_AUTHORIZED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED
CROSS-DIMENSION AGGREGATE SCORE = NOT_AUTHORIZED
WEIGHTED / BLENDED / NORMALIZED GLOBAL SCORE = NOT_AUTHORIZED
THRESHOLD / TARGET / TOLERANCE / EPSILON POLICY = NOT_AUTHORIZED
PARETO / STATISTICAL / SIGNIFICANCE / CONFIDENCE SEMANTICS = NOT_AUTHORIZED
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
P3-R14+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Direction binding is not comparison, not a quality verdict, and not repository-owned promotion policy.

---

## 14. Canonical predecessor bytes remain read-only

A future P3-R13 implementation may import canonical predecessor types/functions but may not modify any P2-R1 through P2-R5 or P3-R1 through P3-R12 source, tests, authorization records, or evidence records.

In particular, these remain read-only:

```text
packages/kodac-runtime/bench/p2-r4/comparison.ts
packages/kodac-runtime/bench/p2-r5/relation.ts
packages/kodac-runtime/bench/p3-r12/contracts.ts
packages/kodac-runtime/bench/p3-r12/single-strategy-two-case-reduction-evidence.ts
packages/kodac-runtime/test/p3-r12-single-strategy-two-case-reduction-evidence.test.ts
docs/planning/KODAC_P3_R12_TWO_CASE_REDUCTION_EVIDENCE_AUTHORIZATION_2026-09-01.md
docs/planning/KODAC_P3_R12_TWO_CASE_REDUCTION_EVIDENCE_2026-09-01.md
```

No compatibility fix may be smuggled into predecessor paths under this authority.

---

## 15. Conditional future implementation allowlist

Only after this exact authorization record becomes canonical and completes mandatory post-merge proof may one later P3-R13 implementation candidate modify exactly:

```text
packages/kodac-runtime/bench/p3-r13/contracts.ts
packages/kodac-runtime/bench/p3-r13/reduction-direction-binding.ts
packages/kodac-runtime/test/p3-r13-reduction-direction-binding.test.ts
docs/planning/KODAC_P3_R13_REDUCTION_DIRECTION_BINDING_EVIDENCE_2026-09-01.md
```

No fifth path is implied.

If implementation discovers that any predecessor mutation, fifth path, new dependency, external provider/model, or additional side-effect authority is required, stop. This authorization is insufficient and may not be widened by interpretation.

---

## 16. Required focused future tests

A future implementation is not qualified without direct tests proving at least:

1. a valid exact-seven-dimension declaration reconstructs canonical R12 and produces deterministic evidence;
2. the public builder uses the exact argument order in Section 6;
3. both allowed direction literals are accepted only when explicitly declared;
4. unknown direction values fail closed;
5. missing, extra, duplicate, or reordered dimensions fail closed;
6. metric ID drift fails closed;
7. input/output unit drift fails closed;
8. value-kind drift fails closed;
9. reducer drift fails closed;
10. missingness-policy drift fails closed;
11. minimum-observed-count drift fails closed;
12. reduction-evidence identity mismatch fails closed;
13. strategy-subject identity mismatch fails closed;
14. benchmark ID mismatch fails closed;
15. benchmark protocol mismatch fails closed;
16. unknown or missing declaration keys fail closed;
17. caller-claimed serialized R12 evidence cannot substitute for reconstruction;
18. canonical R12 is reconstructed from original preimages;
19. `INSUFFICIENT_EVIDENCE` remains insufficient with exact value/nullability/coverage preservation;
20. output uses exactly the root keys in Section 10;
21. every output direction binding uses exactly the entry keys in Section 10;
22. output binding fields exactly equal declaration fields and trusted R12 semantics;
23. no delta, relation, better/worse, rank, promotion, winner, or global score field/state is emitted;
24. changing exactly one direction changes the evidence identity;
25. semantically equal objects with different property insertion order produce identical bytes/identity;
26. array order remains semantic and wrong canonical dimension order is rejected;
27. hostile Proxy/accessor/symbol/sparse/non-plain/non-canonical structures fail closed at the boundary;
28. caller mutation after return cannot alter trusted output;
29. output is deeply frozen;
30. final identity is self-reference-free and deterministic;
31. ambient time/path/process/environment data does not enter identity;
32. no real benchmark/provider/model/evaluator execution occurs;
33. implementation/test/evidence diff remains exactly the four authorized paths.

Review may require additional negative cases without widening semantics.

---

## 17. Authorization-candidate qualification gate

This document is not canonical authority merely because it exists in a branch or PR.

Before this authorization candidate may merge, one frozen exact head must prove:

```text
CANONICAL_MAIN = expected preparation base OR non-destructively reconciled and fully requalified
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P3_R13_REDUCTION_DIRECTION_BINDING_AUTHORIZATION_2026-09-01.md
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

## 18. Merge discipline

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
P3_R13_REDUCTION_DIRECTION_BINDING_IMPLEMENTATION = AUTHORIZED
```

That state authorizes only the exact four-path implementation allowlist in Section 15. It does not mean P3-R13 is implemented or closed.

---

## 19. Future implementation qualification discipline

If this authorization becomes effective, the later implementation candidate must itself prove on one frozen exact head:

```text
EXACT FOUR-PATH ALLOWLIST
BEHIND_BY = 0
TYPECHECK = PASS
FOCUSED P3-R13 TESTS = PASS
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

## 20. Falsifiability / rejection criteria

Reject or repair this candidate before canonical adoption if review shows that:

- direction can be inferred rather than explicitly declared;
- direction entries can drift from trusted R12 metric semantics;
- caller-claimed serialized R12 can bypass reconstruction;
- dimensions can be omitted, duplicated, added, or reordered;
- declaration or output schemas are not exact-key closed;
- identity omits direction-bearing or trusted R12 fields;
- insufficient evidence can become favorable/numeric comparison evidence;
- the layer requires pairwise comparison to be useful;
- it implicitly introduces a global score, rank, winner, or promotion;
- predecessor mutation or more than four implementation paths are required;
- a new dependency/provider/model/external execution path is required.

If any such condition is necessary, stop and prepare a new bounded authority rather than widening this one silently.

---

## 21. Candidate conclusion

The concrete post-R12 gap is smaller than pairwise comparison:

```text
P3-R12 REDUCTION = CANONICAL
EXPLICIT PER-DIMENSION DIRECTION BINDING = MISSING
PAIRWISE STRATEGY COMPARISON = LATER / NOT_AUTHORIZED
GLOBAL AGGREGATION / RANKING / PROMOTION = NOT_AUTHORIZED
```

The proposed P3-R13 boundary is one pure deterministic explicit direction-policy binding over one reconstructed canonical P3-R12 evidence record.

```text
P3_R13_AUTHORIZATION_CANDIDATE = PRESENT
P3_R13_IMPLEMENTATION_AUTHORITY = NONE_UNTIL_CANONICAL_POST_MERGE_PROOF
P3 OVERALL = OPEN
WAIVER = NO
```
