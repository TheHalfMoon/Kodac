# Kodac P3-R11 Two-Case Reduction-Policy Binding Evidence — 2026-09-01

## 1. Evidence status

```text
DOCUMENT TYPE = IMPLEMENTATION / QUALIFICATION EVIDENCE CANDIDATE
P3-R11 TWO-CASE REDUCTION-POLICY BINDING = CANDIDATE / NOT YET CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK / PARTICIPANT EXECUTION = NOT_AUTHORIZED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION = NOT_AUTHORIZED
MULTI-CASE REDUCTION = NOT_AUTHORIZED
MEAN / TRUE-RATE EXECUTION = NOT_AUTHORIZED
DIRECTION / DELTA / BETTER-WORSE SEMANTICS = NOT_AUTHORIZED
MULTI-STRATEGY COMPARISON / RANKING / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
P3-R12+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

This evidence candidate accompanies only the bounded pure deterministic P3-R11 implementation authorized by canonical PR #288. Candidate-time repository bytes do not and cannot self-assert future exact-head qualification, review, merge, or post-merge outcomes. Those facts must be established later from immutable live GitHub objects on the final exact head.

P3-R11 binds an explicit P2-R3-compatible reduction policy to exactly two canonical P3-R10-aligned observations for each of the seven canonical P3-R6 dimensions. It proves shared benchmark/protocol identity across the independently reconstructed P3-R7 members and validates policy vocabulary/value-kind compatibility without executing any reducer.

It does not calculate a mean, true rate, reduced value, score, delta, direction, threshold, rank, winner, promotion, or repository default.

---

## 2. Canonical authorization

```text
AUTHORIZATION_PR = #288
AUTHORIZATION_BASE = f9636474877c142dc8849094c1856f5b1a92cf6f
AUTHORIZATION_QUALIFIED_HEAD = 75780d9af8df236a319f4624f5dc74c8b5ea353c
AUTHORIZATION_QUALIFIED_TREE = d97188c2d54e2a3cc00947201e0bc19d343d24f5
AUTHORIZATION_BLOB = 5bddd4deb1bcda9a5fe60a5b5df9c3ccbd4d019a
AUTHORIZATION_QUALIFICATION_PROOF = #288 / 5494718490
AUTHORIZATION_SEMANTIC_REVIEW = CodeRabbit 5494665056 + Cubic 5494678303
AUTHORIZATION_MERGE / IMPLEMENTATION_BASE = cb2362c4e0cdf651b949fe851575a123d77a9d32
AUTHORIZATION_MERGE_TREE = d97188c2d54e2a3cc00947201e0bc19d343d24f5
AUTHORIZATION_MERGE_PARENT_1 = f9636474877c142dc8849094c1856f5b1a92cf6f
AUTHORIZATION_MERGE_PARENT_2 = 75780d9af8df236a319f4624f5dc74c8b5ea353c
AUTHORIZATION_MERGE_VERIFICATION = verified / valid
AUTHORIZATION_POST_MERGE_GOVERNANCE = 33513847911 / SUCCESS
AUTHORIZATION_POST_MERGE_PROVENANCE = 99875790750 / SUCCESS
AUTHORIZATION_POST_MERGE_LEGACY_TESTS = 99875791162 / SUCCESS
AUTHORIZATION_POST_MERGE_K2_PUSH = NOT_APPLICABLE_BY_CANONICAL_DOCS_ONLY_PUSH_PATH_FILTER
AUTHORIZATION_POST_MERGE_PROOF = #288 / 5494754462
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical authorization permits exactly four implementation/evidence paths and no fifth path:

```text
packages/kodac-runtime/bench/p3-r11/contracts.ts
packages/kodac-runtime/bench/p3-r11/single-strategy-two-case-reduction-policy-binding.ts
packages/kodac-runtime/test/p3-r11-single-strategy-two-case-reduction-policy-binding.test.ts
docs/planning/KODAC_P3_R11_TWO_CASE_REDUCTION_POLICY_BINDING_EVIDENCE_2026-09-01.md
```

All P2-R1 through P2-R5 and P3-R1 through P3-R10 predecessor source/tests/evidence remain read-only.

---

## 3. Implementation base and self-reference-safe candidate identity

```text
IMPLEMENTATION_BASE = cb2362c4e0cdf651b949fe851575a123d77a9d32
IMPLEMENTATION_BRANCH = feat/p3-r11-two-case-reduction-policy-binding
AUTHORIZED_CHANGED_PATHS = EXACTLY 4
FINAL_QUALIFIED_HEAD = NOT_SELF_ASSERTED_IN_CANDIDATE_TIME_BYTES
FINAL_QUALIFIED_TREE = NOT_SELF_ASSERTED_IN_CANDIDATE_TIME_BYTES
FINAL_FOUR_BLOBS = MUST_BE_CAPTURED_FROM_FINAL_EXACT_HEAD
FINAL_CI = MUST_BE_CAPTURED_FROM_FINAL_EXACT_HEAD
FINAL_SEMANTIC_REVIEW = MUST_BE_CAPTURED_FROM_FINAL_EXACT_HEAD
FINAL_MERGE = FUTURE_GITHUB_FACT / NOT_SELF_ASSERTED
POST_MERGE_PROOF = FUTURE_GITHUB_FACT / REQUIRED
```

The final exact-head qualification proof must capture the real head/tree/four blobs after every repair commit has stopped. This file intentionally does not freeze a transient development head as if it were the qualified final candidate.

---

## 4. Implemented boundary

The implementation is designed around this exact pure local flow:

```text
UNTRUSTED STRATEGY DECLARATION
+ UNTRUSTED P3-R9 COMPOSITION DECLARATION
+ UNTRUSTED P3-R10 ALIGNMENT DECLARATION
+ UNTRUSTED P3-R11 PAIR-POLICY DECLARATION
+ ORIGINAL CASE A PREIMAGES
+ ORIGINAL CASE B PREIMAGES
-> canonical-JSON snapshot / hostile-structure rejection
-> reconstruct canonical P3-R10 from original predecessor preimages
-> independently reconstruct canonical P3-R7(A)
-> independently reconstruct canonical P3-R7(B)
-> bind R7(A/B) identities back to exact R10 member references
-> require A.benchmarkId == B.benchmarkId
-> require A.benchmarkProtocolVersion == B.benchmarkProtocolVersion
-> require declaration benchmark/protocol == reconstructed shared values
-> require exactly seven canonical P3-R6 dimension policies
-> require exact metricId/unit match to each R10 alignment
-> require explicit P2-R3-compatible valueKind/reducer/missingness/minimumObservedCount
-> validate both trusted observations against explicit valueKind
-> preserve both trusted observations without reinterpretation
-> derive deterministic policyBindingEvidenceIdentity
-> return detached deeply frozen evidence
```

No reduction step exists in the implementation flow.

---

## 5. Exact policy semantics

The implementation reuses only the already-canonical P2-R3 semantic vocabulary:

```text
valueKind = NUMBER | BOOLEAN
reducer = ARITHMETIC_MEAN | BOOLEAN_TRUE_RATE
missingnessPolicy = REQUIRE_COMPLETE | OBSERVED_ONLY_WITH_COVERAGE
```

Reducer/value-kind compatibility is exact:

```text
ARITHMETIC_MEAN   -> NUMBER
BOOLEAN_TRUE_RATE -> BOOLEAN
```

P3-R11 has exactly two expected observation slots for every aligned dimension:

```text
EXPECTED_COUNT = 2
```

Therefore `minimumObservedCount` is limited to `1 | 2`; `REQUIRE_COMPLETE` requires `2`; `OBSERVED_ONLY_WITH_COVERAGE` permits `1` or `2`.

This implementation records the reducer as explicit future policy. It does not invoke the reducer and does not derive P2-R3 `REDUCED` or `INSUFFICIENT_EVIDENCE` summary states.

---

## 6. Exact seven-dimension boundary

The policy binds exactly these canonical P3-R6 dimensions in canonical order:

```text
recall-at-k
precision-at-k
file-f1
token-budgeted-evidence-yield
no-gold-abstention
explored-vs-utilized-context
context-dilution
```

Every dimension policy binds exactly:

```text
dimension
metricId
unit
valueKind
reducer
missingnessPolicy
minimumObservedCount
```

The normalized evidence additionally preserves the exact canonical member A/member B observation for that aligned slot.

Duplicate/missing/reordered dimensions, duplicate metric/unit policy slots, metric drift, unit drift, unsupported policy enum values, and invalid minimum counts fail closed.

---

## 7. Benchmark/protocol compatibility without invented corpus equality

P3-R11 independently reconstructs the canonical P3-R7 evidence for both members and requires exact equality of:

```text
benchmarkId
benchmarkProtocolVersion
```

It also requires the P3-R11 declaration to bind those exact reconstructed values.

It deliberately does **not** require equality of:

```text
p2R2ReportIdentity
r1ManifestSetDigest
development corpus identity
holdout corpus identity
```

unless a later separately authorized contract proves such equality is required. Canonical P3-R10 fixture precedent uses independently reconstructed case corpora while still forming a valid aligned pair; P3-R11 does not rewrite that predecessor boundary.

Each member reference preserves its own `p2R2ReportIdentity` and report/provenance identities so distinct case evidence cannot disappear behind the pair-policy binding.

---

## 8. Observation/value-kind validation

P3-R11 accepts only the canonical P3-R6/R10 observation state boundary:

```text
observed
unavailable
```

For `observed` values:

- `NUMBER` requires a finite JSON number;
- `BOOLEAN` requires a JSON boolean.

For `unavailable`:

- value must remain `null`;
- value kind is not inferred from the unavailable value;
- the caller's explicit policy remains evidence-bearing.

Numeric-as-BOOLEAN and boolean-as-NUMBER fail closed. Unavailable is never coerced to zero, false, failure, success, or a dropped observation.

The implementation additionally verifies every trusted R10 observation against its independently reconstructed R7/P2-R2 report slot: case, R1 identity, metric, unit, status, and exact value remain continuous.

---

## 9. Result contract and explicit no-reduction boundary

The result is intended to contain only:

```text
version
kind
policyBindingEvidenceIdentity
policyDeclaration
policyBindingId
alignmentEvidenceIdentity
strategySubjectIdentity
benchmarkId
benchmarkProtocolVersion
memberAReference
memberBReference
dimensionPolicyBindings
```

Member references preserve only identity/provenance fields needed for continuity, including independent P2-R2 report identities and shared benchmark/protocol values.

Each dimension policy binding contains the explicit policy fields plus the two exact trusted observations.

The implementation emits no field representing or implying:

```text
reducedValue
reduced_value
mean
average
sum
total
rate
trueCount
true_count
denominatorCount
denominator_count
REDUCED
INSUFFICIENT_EVIDENCE
normalizedValue
weight
score
aggregateScore
delta
higherIsBetter
lowerIsBetter
better
worse
preferred
rank
winner
threshold
pass
fail
accept
reject
promotion
default
confidenceInterval
pValue
effectSize
```

`reducer` is a declared policy field only. Its presence is not reducer execution authority.

---

## 10. Hostile-input, mutation, and determinism boundary

Every public input is snapshotted before semantic reuse through the inherited hardened canonical JSON boundary.

The focused implementation tests are required to cover rejection of hostile/non-canonical structures including:

- Proxy objects;
- accessors;
- symbol fields;
- cycles;
- sparse arrays;
- non-finite numbers;
- missing/unknown contract fields;
- unsupported declaration enum values.

Same canonical predecessor preimages plus the same canonical R11 declaration must produce the same `policyBindingEvidenceIdentity`. Benign object-key insertion order is not identity-bearing. A legitimate evidence-bearing policy semantic change must change identity.

Returned evidence is detached from caller-owned mutable references and deeply frozen.

---

## 11. Ambient side-effect boundary

P3-R11 is pure local computation and adds no side-effect authority.

The focused test surface must prove no dependency on ambient:

```text
network / fetch
clock
randomness
environment variables
filesystem reads/writes
subprocess execution
```

The implementation performs no provider/model/reviewer/evaluator/tool invocation, secret access, persistence, telemetry, upload, benchmark participant execution, corpus mutation, repository crawl, dependency intake, or product integration.

---

## 12. Focused qualification coverage

The authorized focused test file is designed to prove at minimum:

```text
- valid deterministic seven-dimension pair-policy binding
- explicit NUMBER + ARITHMETIC_MEAN policy binding without mean calculation
- explicit BOOLEAN + BOOLEAN_TRUE_RATE policy binding without rate calculation
- cross-member benchmark mismatch accepted by R10 but rejected by R11
- cross-member benchmark-protocol mismatch accepted by R10 but rejected by R11
- declaration benchmark/protocol mismatch rejection
- exact metricId/unit alignment-policy binding
- reducer/valueKind compatibility
- observed numeric/boolean value-kind validation
- unavailable/null preservation without inference
- REQUIRE_COMPLETE minimumObservedCount=2
- OBSERVED_ONLY_WITH_COVERAGE bounded minimum count
- exact seven dimensions / canonical order / duplicate-slot rejection
- unknown policy and forged predecessor-field rejection
- exact R10 alignment / strategy identity binding
- predecessor preimage drift rejection through reconstruction
- deterministic repeatability and benign object-key order invariance
- policy semantic change changes evidence identity
- deep freeze / detachment / caller-mutation isolation
- hostile Proxy/accessor/symbol/cycle/sparse/non-finite rejection
- no ambient network/clock/randomness/environment dependency
- no ambient filesystem/subprocess dependency
- no reduction/direction/score/rank/winner/promotion/default output fields
```

The test data is repository-authored synthetic in-memory evidence. It does not execute a real benchmark participant and does not create or mutate benchmark fixture/corpus/manifest truth.

The candidate-time existence of these tests is not a claim that they pass. Exact results must come from the final exact-head CI/runtime qualification.

---

## 13. Exact-head qualification gate

Do not merge the implementation candidate until one frozen exact head proves all of the following:

- canonical `main` remains exact implementation base `cb2362c4e0cdf651b949fe851575a123d77a9d32` or the branch is forward-reconciled non-destructively and fully requalified;
- `behind_by=0`;
- changed-file set is exactly the four canonical authorization paths and no fifth path;
- exact final head/tree/four Git blobs are captured;
- focused P3-R11 tests are terminal success;
- full runtime tests are terminal success;
- TypeScript typecheck is terminal success;
- patch benchmark hook is terminal success;
- Governance `provenance` and `legacy-tests` are terminal success on the exact head;
- K2 classifier, Ubuntu/macOS/Windows runtime matrix, and stable `k2-runtime-gate` are terminal success on the exact head;
- at least two distinct independently operated external substantive semantic reviewer/model-system channels are terminal-clean on the exact head/current metadata;
- status-only, summary-only, billing-blocked, rate-limited, service-error, stale-head, invocation-only, self-review, human-only, or non-substantive output does not count;
- unresolved material findings = 0;
- unresolved actionable review threads = 0;
- ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never`;
- `WAIVER=NO`;
- guarded normal merge uses the exact expected head; and
- mandatory post-merge canonical `main`, ordered parents, tree, four blobs, GitHub signature, applicable Governance/K2 checks, PR state, and ruleset proof completes before any `CLOSED_CANONICAL` claim.

Any repository-byte or base movement invalidates earlier exact-head CI/review qualification evidence.

---

## 14. Preserved non-grants

```text
REAL BENCHMARK TASK / PARTICIPANT EXECUTION = NOT_AUTHORIZED
BENCHMARK FIXTURE / CORPUS / MANIFEST CREATION OR MUTATION = NOT_AUTHORIZED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION = NOT_AUTHORIZED
MULTI-CASE REDUCTION = NOT_AUTHORIZED
SUM / TOTAL / MEAN / AVERAGE EXECUTION = NOT_AUTHORIZED
BOOLEAN TRUE-RATE EXECUTION = NOT_AUTHORIZED
NORMALIZATION / WEIGHTING / THRESHOLDING = NOT_AUTHORIZED
DIRECTION / HIGHER-IS-BETTER / LOWER-IS-BETTER = NOT_AUTHORIZED
PAIRWISE BETTER/WORSE RELATION = NOT_AUTHORIZED
MULTI-STRATEGY COMPARISON / RANKING / LEADERBOARD / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER = NOT_AUTHORIZED
REPOSITORY-OWNED GOLD TRUTH = NOT_AUTHORIZED
STATISTICAL SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
HOLDOUT SUFFICIENCY / UNBIASEDNESS / CONTAMINATION-FREE CLAIM = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
NETWORK / SECRET / SUBPROCESS / SANDBOX EXPANSION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKING = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
CROSS-REPOSITORY DATA ACCESS OR LEARNING = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
PUBLIC QUALITY / SUPERIORITY / RELEASE / PACKAGE / BRAND CLAIM = NOT_AUTHORIZED
P3 OVERALL CLOSURE = NOT_AUTHORIZED
P3-R12+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Only after one exact implementation candidate satisfies Section 13, merges normally with exact expected-head protection, and completes mandatory post-merge proof may bounded P3-R11 itself be declared `CLOSED_CANONICAL`. P3 overall remains open.