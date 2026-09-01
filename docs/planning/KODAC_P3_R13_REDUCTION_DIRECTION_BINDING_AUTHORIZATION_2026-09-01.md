# Kodac P3-R13 — Bounded Reduction Direction Binding Authorization Candidate

Status: AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY
Date: 2026-09-01
Owner: Kodac founder
Waiver: NO

---

## 1. Purpose

This record proposes one bounded documentation/governance authorization for a future pure deterministic **caller-declared per-dimension direction binding** over one canonical P3-R12 exactly-two-case reduction-evidence record.

This candidate exists because fresh canonical reread after P3-R12 current-view reconciliation identified one concrete gap:

```text
P3-R12 CANONICAL REDUCTION EVIDENCE
-> exactly seven independent REDUCED | INSUFFICIENT_EVIDENCE dimension results
-> explicit reducer / missingness / value-kind semantics
-> NO direction semantics
```

Canonical P2-R4 and current external evaluation practice both show that reduction/aggregation and direction are separable semantics. The minimum next P3 layer is therefore **not** pairwise strategy comparison, ranking, promotion, winner selection, or cross-dimension aggregation.

It is narrower:

```text
ONE TRUSTED CANONICAL P3-R12 REDUCTION EVIDENCE
+ ONE EXPLICIT EXACT-SEVEN-DIMENSION CALLER-DECLARED DIRECTION DOCUMENT
-> VALIDATE / CROSS-BIND EACH DIRECTION TO THE EXACT R12 DIMENSION SEMANTICS
-> PRESERVE THE COMPLETE TRUSTED R12 EVIDENCE
-> EMIT ONE DETERMINISTIC DIRECTION-BINDING EVIDENCE IDENTITY
-> PERFORM NO DELTA / RELATION / COMPARISON / RANKING / PROMOTION
```

This PR does not implement that mechanism. Effective implementation authority remains `NONE` unless and until this exact authorization record qualifies, merges normally into protected `main`, and completes mandatory post-merge proof.

---

## 2. Canonical baseline

This candidate is prepared only after P3-R12 implementation and its mandatory current-view reconciliation became canonically proven.

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

Canonical state at this baseline remains:

```text
P3-R1 THROUGH P3-R12 = CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P3-R13+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
```

This authorization candidate may change only this document. It does not change any current-view page while non-canonical.

---

## 3. Observed canonical gap

### 3.1 What P3-R12 already proves

Canonical P3-R12 reconstructs trusted P3-R11 evidence from original preimages, then materializes exactly seven independent two-slot reduction results under the already-bound P2-R3-compatible policy.

Each `P3R12DimensionReduction` already preserves:

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

The P3-R12 evidence also preserves exact strategy, benchmark, protocol, R11 policy-binding, member-reference, and deterministic reduction-evidence identities.

### 3.2 What P3-R12 deliberately does not prove

P3-R12 contains no field or contract for:

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

This absence is deliberate and canonical. P3-R12 authorization explicitly records that aggregation/reduction and direction are separate semantic layers.

### 3.3 Why a direction-binding layer is now the minimum missing semantic layer

A later pairwise comparison cannot be interpreted correctly without an explicit direction policy for each reduced metric. However, adding pairwise comparison now would combine two semantic steps:

1. bind direction meaning to each reduced dimension; and
2. compare two distinct strategy reduction records.

Kodac's durable P3 goal is `MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME`. The smaller falsifiable next layer is step 1 only.

Therefore this candidate does not authorize pairwise comparison.

---

## 4. Canonical internal precedent

### 4.1 P2-R4 direction vocabulary

Canonical `packages/kodac-runtime/bench/p2-r4/comparison.ts` defines the closed direction vocabulary:

```text
HIGHER_IS_BETTER
LOWER_IS_BETTER
```

P2-R4 also makes direction an explicit policy field rather than inferring it from metric names, values, units, or reducer choices.

P3-R13 may reuse this **direction vocabulary and explicit-policy precedent**. It may not reuse P2-R4 comparison identity or claim P2-R4 comparison semantics, because P2-R4 is bound to two P2-R3 summaries, two subjects, and one controlled shared evaluation context.

### 4.2 P2-R5 is intentionally too far downstream

Canonical P2-R5 derives only pairwise metric-local relations from a validated P2-R4 comparison:

```text
LEFT_FAVORED_BY_DIRECTION
RIGHT_FAVORED_BY_DIRECTION
EQUAL_RAW_VALUE
INSUFFICIENT_EVIDENCE
```

Those relations require two sides and a comparison. P3-R13 must not import or emit them.

### 4.3 P3-R12 reconstruction boundary remains authoritative

P3-R13 must not trust a caller-claimed serialized `TwoCaseReductionEvidence` as derivation truth.

The future implementation must cross the canonical JSON boundary for every public input and reconstruct canonical P3-R12 by calling the canonical public P3-R12 builder from the original predecessor preimages.

P3-R12 source, tests, authorization, and evidence remain read-only.

---

## 5. Fresh external precedent rechecked on 2026-09-01

External precedent is supporting evidence only. It does not create Kodac authority and cannot override canonical repository contracts.

### 5.1 EleutherAI lm-evaluation-harness

Current public documentation and source:

- https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/new_task_guide.md
- https://github.com/EleutherAI/lm-evaluation-harness/blob/main/lm_eval/api/metrics.py

Observed precedent:

- metric configuration exposes `aggregation` and `higher_is_better` as separate fields;
- supported metrics register aggregation such as `mean` independently from the directional `higher_is_better` value;
- direction therefore does not need to be inferred from the reducer.

This supports a dedicated explicit direction-binding boundary after reduction.

### 5.2 UK AISI Inspect

Current public documentation:

- https://inspect.aisi.org.uk/scoring.html
- https://inspect.aisi.org.uk/metrics.html
- https://inspect.aisi.org.uk/reference/inspect_ai.scorer.html

Observed precedent:

- scoring/reduction is explicit;
- reducers such as `mean`, `median`, `mode`, and `collect` are independent evaluation operations;
- `collect` exists specifically to preserve individual score values rather than silently collapsing them.

This continues to support auditable separation between reduction and later interpretation.

### 5.3 Hugging Face Evaluate

Current public documentation:

- https://huggingface.co/docs/evaluate/a_quick_tour
- https://huggingface.co/docs/evaluate/en/base_evaluator

Observed precedent:

- multiple metrics can be computed together while remaining independently named results;
- evaluating several metrics does not require collapsing them into one scalar quality score.

This supports keeping all seven P3 dimensions independent and forbids inventing a cross-dimension aggregate in P3-R13.

---

## 6. Proposed future P3-R13 contract

Only after this exact authorization becomes canonical and post-merge proven may one future implementation candidate build one pure deterministic local direction-binding evidence record.

### 6.1 Required future public inputs

The future builder must accept only the original canonical predecessor preimages needed to reconstruct P3-R12 plus one P3-R13 direction declaration:

```text
strategyDeclarationValue
compositionDeclarationValue
alignmentDeclarationValue
policyDeclarationValue
reductionDeclarationValue
directionDeclarationValue
caseAInputsValue
caseBInputsValue
```

The exact argument order may be fixed by the implementation, but the semantic rule is mandatory:

```text
UNTRUSTED INPUTS
-> CANONICAL-JSON SNAPSHOT / HOSTILE-STRUCTURE REJECTION
-> CANONICAL P3-R12 RECONSTRUCTION FROM ORIGINAL PREIMAGES
-> P3-R13 DECLARATION VALIDATION
-> EXACT CROSS-BINDING
-> DETERMINISTIC IMMUTABLE DIRECTION-BINDING EVIDENCE
```

No caller-claimed serialized P3-R12 evidence may substitute for reconstruction.

### 6.2 Closed direction declaration schema

The future declaration must be an exact-key document containing exactly:

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

Required exact literals:

```text
version = p3-r13-reduction-direction-binding-declaration-v1
kind = bind_reduction_directions
```

`directionBindingId` must be a bounded canonical stable identifier under the existing P3 stable-ID discipline.

Identity fields must exactly match the reconstructed canonical P3-R12 evidence:

```text
reductionEvidenceIdentity
strategySubjectIdentity
benchmarkId
benchmarkProtocolVersion
```

### 6.3 Exact seven-dimension closure

`dimensionDirections` must contain exactly seven entries in canonical `P3_R6_DIMENSIONS` order.

Each entry must contain exactly:

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

For each index, every semantic field except `direction` must exactly equal the corresponding trusted P3-R12 `dimensionReductions[index]` field.

No missing dimension, extra dimension, duplicate dimension, reordered dimension, metric substitution, unit drift, reducer drift, value-kind drift, missingness drift, or minimum-coverage drift is permitted.

### 6.4 Closed direction vocabulary

The only accepted values are:

```text
HIGHER_IS_BETTER
LOWER_IS_BETTER
```

Direction must be explicit caller-declared policy. It must never be inferred from:

```text
metricId
dimension name
inputUnit
outputUnit
valueKind
reducer
observed values
reduced value
historical values
external conventions
```

A declaration that chooses a direction is evidence of the declared policy binding only. P3-R13 does not establish that the direction is universally correct, repository-owned, benchmark-optimal, or suitable for public claims.

### 6.5 Insufficient-evidence behavior

A direction may be bound to a dimension whose canonical R12 status is `INSUFFICIENT_EVIDENCE`, because direction is policy metadata independent from whether this particular two-case record contains enough evidence to reduce.

P3-R13 must preserve the R12 status and nullability exactly. It must not:

- convert insufficient evidence to `REDUCED`;
- invent a value;
- infer a side as favored;
- assign pass/fail;
- assign better/worse;
- suppress the unavailable/coverage evidence.

### 6.6 Proposed output schema

The future evidence record must use exact literals:

```text
version = p3-r13-reduction-direction-binding-evidence-v1
kind = reduction_direction_binding_evidence
```

The output must preserve at minimum:

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

`reductionEvidence` must be the complete trusted reconstructed canonical P3-R12 result, not a caller-provided serialized claim.

`dimensionDirectionBindings` must contain exactly seven canonical-order entries. Each entry must preserve the complete trusted corresponding P3-R12 dimension reduction plus the explicit bound direction. The implementation may represent this as a closed object containing the semantic fields and/or a nested immutable trusted reduction, but it may not omit evidence needed to prove the binding.

The exact representation must be frozen in implementation contracts and tests before merge.

### 6.7 Identity rule

`directionBindingEvidenceIdentity` must be derived by canonical SHA-256 over every normalized output field except the identity field itself.

The identity preimage must include the full normalized declaration, complete trusted R12 evidence identity/bindings, and all seven explicit directions.

Consequences that must be tested:

- semantically identical canonical inputs produce identical bytes/identity;
- changing any one direction changes the evidence identity;
- changing any trusted R12 semantic binding changes/rejects the record;
- object-property insertion order does not change identity;
- array order remains semantic and canonical;
- timestamps, host paths, process IDs, ambient environment, and other non-contract noise do not enter identity.

### 6.8 Immutability and detachment

The future output must be detached from caller mutation and deeply frozen.

No mutable alias to caller input may survive in the returned record.

---

## 7. Explicit semantic non-grants

Even after this authorization becomes canonical, the future P3-R13 implementation remains forbidden from adding any of the following:

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

Direction binding is not comparison. Direction binding is not a quality verdict. Direction binding is not repository-owned promotion policy.

---

## 8. Canonical predecessor bytes remain read-only

A future P3-R13 implementation may import canonical predecessor types/functions but may not modify any P2-R1 through P2-R5 or P3-R1 through P3-R12 source, tests, authorization records, or evidence records.

In particular, these canonical files remain read-only:

```text
packages/kodac-runtime/bench/p2-r4/comparison.ts
packages/kodac-runtime/bench/p2-r5/relation.ts
packages/kodac-runtime/bench/p3-r12/contracts.ts
packages/kodac-runtime/bench/p3-r12/single-strategy-two-case-reduction-evidence.ts
packages/kodac-runtime/test/p3-r12-single-strategy-two-case-reduction-evidence.test.ts
docs/planning/KODAC_P3_R12_TWO_CASE_REDUCTION_EVIDENCE_AUTHORIZATION_2026-09-01.md
docs/planning/KODAC_P3_R12_TWO_CASE_REDUCTION_EVIDENCE_2026-09-01.md
```

No compatibility fix may be smuggled into a predecessor file under this authority.

---

## 9. Conditional future implementation allowlist

Only after this exact authorization record becomes canonical and completes mandatory post-merge proof may one later P3-R13 implementation candidate modify exactly these four paths:

```text
packages/kodac-runtime/bench/p3-r13/contracts.ts
packages/kodac-runtime/bench/p3-r13/reduction-direction-binding.ts
packages/kodac-runtime/test/p3-r13-reduction-direction-binding.test.ts
docs/planning/KODAC_P3_R13_REDUCTION_DIRECTION_BINDING_EVIDENCE_2026-09-01.md
```

No fifth path is implied.

If implementation discovers that a fifth path or predecessor mutation is genuinely required, stop. This authorization is insufficient and must not be stretched by interpretation.

---

## 10. Required focused future tests

A future implementation is not qualified without focused tests that directly prove at least:

1. one valid exact-seven-dimension direction declaration reconstructs canonical R12 and produces deterministic evidence;
2. both `HIGHER_IS_BETTER` and `LOWER_IS_BETTER` are accepted only as explicit literals;
3. unknown direction values fail closed;
4. missing, extra, duplicate, or reordered dimensions fail closed;
5. metric ID drift fails closed;
6. input/output unit drift fails closed;
7. value-kind drift fails closed;
8. reducer drift fails closed;
9. missingness-policy drift fails closed;
10. minimum-observed-count drift fails closed;
11. reduction-evidence identity mismatch fails closed;
12. strategy-subject identity mismatch fails closed;
13. benchmark ID mismatch fails closed;
14. benchmark protocol mismatch fails closed;
15. caller-claimed serialized R12 evidence is not accepted as derivation truth;
16. canonical R12 is reconstructed from original preimages;
17. `INSUFFICIENT_EVIDENCE` remains insufficient and preserves nullability/coverage;
18. direction binding never emits delta, relation, better/worse, rank, promotion, or winner state;
19. changing exactly one direction changes the evidence identity;
20. semantically equal objects with different property insertion order produce identical evidence bytes/identity;
21. array order remains semantic and wrong canonical dimension order is rejected;
22. hostile Proxy/accessor/symbol/sparse/non-plain/non-canonical structures fail closed at the boundary;
23. caller mutation after return cannot alter trusted output;
24. output is deeply frozen;
25. the final identity is self-reference-free and deterministic;
26. no ambient time/path/process/environment data enters the identity;
27. no real benchmark/provider/model/evaluator execution occurs;
28. the implementation/test/evidence diff remains exactly the four authorized paths.

Review may require additional negative cases without widening semantics.

---

## 11. Authorization-candidate qualification gate

This document is not canonical authority merely because it exists in a branch or PR.

Before this authorization candidate may merge, one frozen exact head must prove all of the following:

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

## 12. Merge discipline

If and only if the authorization candidate reaches the complete exact-head gate above:

1. capture exact base/head/tree/document blob;
2. publish immutable exact-head qualification proof;
3. perform one fresh live race check;
4. merge normally with `merge_method=merge` and exact `expected_head_sha`;
5. use no squash, rebase, force-push, destructive history rewrite, bypass, or waiver;
6. prove canonical post-merge `main`, ordered parents, tree/blob identity, verified GitHub signature, applicable push checks, and active no-bypass ruleset;
7. publish immutable post-merge proof.

Only after step 7 may state become:

```text
P3_R13_REDUCTION_DIRECTION_BINDING_IMPLEMENTATION = AUTHORIZED
```

That state would authorize only the exact four-path implementation allowlist in Section 9.

It would not mean P3-R13 is implemented or closed.

---

## 13. Future implementation qualification discipline

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

No predecessor-head qualification evidence may be reused after implementation head movement.

After implementation canonical closeout, current-view reconciliation remains a separate mandatory unit before any later bounded P3 definition/authorization candidate.

---

## 14. Falsifiability / rejection criteria

This candidate should be rejected or repaired before canonical adoption if review shows any of the following:

- direction can be inferred rather than explicitly declared;
- a direction entry can drift from the corresponding trusted R12 metric semantics;
- caller-claimed serialized R12 output can bypass reconstruction;
- a dimension can be omitted, duplicated, added, or reordered;
- the proposed identity omits direction-bearing fields;
- insufficient evidence can be converted into a favorable or numeric claim;
- the design requires pairwise comparison to be useful at this layer;
- the design implicitly introduces a global score, ranking, winner, or promotion;
- a predecessor file must be modified;
- more than four implementation paths are required;
- a new dependency/provider/model/external execution path is required.

If any such condition is necessary, this authorization is not sufficient. Stop and prepare a new bounded authority rather than widening this one silently.

---

## 15. Candidate conclusion

The post-R12 evidence gap is concrete and smaller than pairwise comparison:

```text
P3-R12 REDUCTION = CANONICAL
EXPLICIT PER-DIMENSION DIRECTION BINDING = MISSING
PAIRWISE STRATEGY COMPARISON = STILL LATER / NOT_AUTHORIZED
GLOBAL AGGREGATION / RANKING / PROMOTION = NOT_AUTHORIZED
```

The proposed P3-R13 boundary is therefore one pure deterministic explicit direction-policy binding over one reconstructed canonical P3-R12 evidence record.

This document grants no effective implementation authority while it is a candidate.

```text
P3_R13_AUTHORIZATION_CANDIDATE = PRESENT
P3_R13_IMPLEMENTATION_AUTHORITY = NONE_UNTIL_CANONICAL_POST_MERGE_PROOF
P3 OVERALL = OPEN
WAIVER = NO
```
