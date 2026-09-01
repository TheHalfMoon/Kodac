# Kodac P3-R11 Two-Case Reduction-Policy Binding Authorization — 2026-09-01

## Status

```text
DOCUMENT TYPE = FOUNDER-AUTHORIZED IMPLEMENTATION GATE CANDIDATE
P3-R1 THROUGH P3-R10 = CLOSED_CANONICAL
P3-R10 CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R11 IMPLEMENTATION = AUTHORIZED ONLY AFTER THIS RECORD IS CANONICAL AND POST-MERGE PROVEN
P3-R12+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
REAL BENCHMARK TASK / PARTICIPANT EXECUTION = NOT_AUTHORIZED
MULTI-CASE REDUCTION = NOT_AUTHORIZED BY THIS CANDIDATE PR
WAIVER = NO
```

This record is deny-by-default. While it is only a branch or pull-request candidate, it authorizes no implementation, benchmark execution, reducer execution, scoring, ranking, promotion, provider/model execution, persistence, product integration, release, dependency intake, ruleset mutation, or side effect.

The bounded P3-R11 implementation authority defined below becomes effective only after this exact authorization unit is qualified on one frozen exact head, merged normally into protected `main` with an exact expected-head precondition, and its mandatory post-merge proof succeeds.

The `P3-R11` designation is evidence-driven. It is not inferred merely because P3-R10 is closed.

---

## Exact canonical baseline

This authorization candidate is prepared from protected canonical `main`:

```text
CANONICAL_MAIN = f9636474877c142dc8849094c1856f5b1a92cf6f
CANONICAL_TREE = 3d188d96cbf942d1d115113da6036064baf72b6b
P3_R10_IMPLEMENTATION_PR = #286
P3_R10_IMPLEMENTATION_MERGE = e22019883dca10ac1ed66edff2d56d0fc2570961
P3_R10_POST_MERGE_PROOF = #286 / 5494012666
P3_R10_RECONCILIATION_PR = #287
P3_R10_RECONCILIATION_MERGE = f9636474877c142dc8849094c1856f5b1a92cf6f
P3_R10_RECONCILIATION_POST_MERGE_PROOF = #287 / 5494419703
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Governing records include:

- root `AGENTS.md`;
- `docs/roadmap/NEXT.md`;
- `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`;
- `docs/adr/ADR-0010-benchmark-first-donor-selection.md`;
- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`;
- canonical P2-R2 and P2-R3 authorization/evidence contracts;
- canonical P3-R6 through P3-R10 authorization/evidence contracts;
- immutable GitHub review, CI, merge, and post-merge proof for P3-R10 and its reconciliation.

If live protected `main`, repository governance, or a more-specific canonical record conflicts with this candidate before merge, reconcile forward non-destructively and fully requalify. Do not force-push, rebase shared history, reuse stale exact-head evidence, reduce reviewer cardinality, bypass rulesets, or silently waive a gate.

---

## Exact authorization-unit changed-file set

This authorization PR may change exactly one path and no second path:

```text
docs/planning/KODAC_P3_R11_TWO_CASE_REDUCTION_POLICY_BINDING_AUTHORIZATION_2026-09-01.md
```

This authorization unit is documentation/governance only. It may not implement P3-R11, modify roadmap/status views, alter workflows, mutate dependencies, change benchmark fixtures/corpora/manifests, or modify any P2/P3 runtime source or test.

The exact one-path set above governs candidate qualification. The final Git blob for this path must be captured on the frozen exact head before merge.

---

## Concrete observed canonical gap

Canonical P3-R10 proves a deliberately narrow property for exactly two canonical P3-R9 members under one exact P3-R8 strategy subject:

```text
for each canonical P3-R6 dimension:
  memberA.metricId == memberB.metricId
  memberA.unit == memberB.unit

and:
  preserve member A observation exactly
  preserve member B observation exactly
```

P3-R10 intentionally emits no reducer, value-kind declaration, missingness policy, minimum coverage policy, reduced value, direction, score, threshold, winner, or promotion semantics.

Canonical P2-R3 already defines the repository's bounded reducer-policy vocabulary and validation rules for one validated P2-R2 report:

```text
value_kind:
  NUMBER
  BOOLEAN

reducer:
  ARITHMETIC_MEAN
  BOOLEAN_TRUE_RATE

missingness_policy:
  REQUIRE_COMPLETE
  OBSERVED_ONLY_WITH_COVERAGE

minimum_observed_count:
  positive safe integer
```

Canonical P2-R3 also requires reducer/value-kind compatibility and forbids inferring reducer semantics from observed data shape.

However, the P2-R3 policy document is bound to exactly one P2-R2 report identity. It cannot be reused byte-for-byte as a policy document for a P3-R10 pair without falsely asserting a single-report identity that does not exist at the P3-R10 boundary.

The current canonical P3-R10 fixture further demonstrates that member A and member B may be independently reconstructed from distinct development/holdout corpus identities while still sharing the same benchmark identifier, benchmark protocol version, strategy subject, metric IDs, and metric units. Therefore P3-R11 must not invent a requirement that the two members use one identical corpus or one identical P2-R2 report identity.

The actual missing semantic layer is narrower:

```text
CANONICAL P3-R10 ALIGNED TWO-MEMBER EVIDENCE
+ EXPLICIT P3-SPECIFIC TWO-CASE REDUCTION-POLICY DECLARATION
-> PROVE SHARED BENCHMARK ID / PROTOCOL VERSION
-> BIND EACH OF THE SEVEN DIMENSIONS TO AN EXPLICIT P2-R3-COMPATIBLE POLICY
-> VALIDATE VALUE-KIND / REDUCER COMPATIBILITY AGAINST BOTH TRUSTED OBSERVATIONS
-> VALIDATE MISSINGNESS / MINIMUM-COVERAGE POLICY FOR EXACTLY TWO EXPECTED CASE SLOTS
-> EMIT IMMUTABLE POLICY-BINDING EVIDENCE
-> PERFORM NO REDUCTION
```

This is a prerequisite evidence layer only. It does not establish that any metric is reducible in a later slice, does not calculate a reduced value, and does not create directional or comparative meaning.

---

## Why this gap is distinct from already-canonical P2/P3 work

P3-R6 proves per-case seven-dimension observations and exact dimension-to-metric bindings.

P3-R7 binds each one-case P3-R6 measurement to one canonical one-case P2-R2 report and proves local benchmark/protocol/report continuity for that case.

P3-R8 establishes one case-invariant strategy subject and one exact case binding.

P3-R9 composes exactly two independently reconstructed P3-R7 reports under one exact P3-R8 strategy subject, without reduction.

P3-R10 proves cross-member `metricId` and `unit` alignment for exactly seven dimensions and preserves both observations without reduction.

P2-R3 defines explicit reducer policy and reduction semantics for one P2-R2 report, but its policy identity binds that one report identity.

Therefore none of the canonical predecessors currently proves this exact statement:

```text
ONE EXACT P3-R10 TWO-MEMBER ALIGNMENT
+ ONE EXPLICIT P3-SPECIFIC PAIR POLICY
-> SAME benchmarkId / benchmarkProtocolVersion ACROSS BOTH MEMBERS
-> EXACTLY ONE EXPLICIT POLICY FOR EACH OF SEVEN ALIGNED DIMENSIONS
-> POLICY VOCABULARY / COMPATIBILITY MATCHES CANONICAL P2-R3 SEMANTICS
-> BOTH TRUSTED OBSERVATIONS ARE VALID INPUT KINDS FOR THAT DECLARED POLICY
-> NO REDUCED VALUE IS MATERIALIZED
```

That is the bounded P3-R11 gap authorized by this record after canonicalization.

---

## P3-R11 purpose

P3-R11 may implement one pure deterministic in-memory evidence mechanism for exactly two canonical P3-R10 members.

Its purpose is to make any later two-case reduction semantically explicit before arithmetic occurs.

The intended flow is:

```text
UNTRUSTED STRATEGY DECLARATION
+ UNTRUSTED R9 COMPOSITION DECLARATION
+ UNTRUSTED R10 ALIGNMENT DECLARATION
+ UNTRUSTED R11 REDUCTION-POLICY DECLARATION
+ ORIGINAL CASE A PREIMAGES
+ ORIGINAL CASE B PREIMAGES
-> HARDEN / SNAPSHOT INPUTS THROUGH CANONICAL JSON
-> RECONSTRUCT CANONICAL R10 FROM ORIGINAL PREIMAGES
-> INDEPENDENTLY RECONSTRUCT CANONICAL R7 REPORT EVIDENCE FOR A AND B
-> BIND R7/R10 CASE, RESULT, POLICY, APPLICATION, METRIC, UNIT, AND OBSERVATION CONTINUITY
-> REQUIRE A.benchmarkId == B.benchmarkId
-> REQUIRE A.benchmarkProtocolVersion == B.benchmarkProtocolVersion
-> VALIDATE EXACTLY SEVEN EXPLICIT DIMENSION POLICIES
-> VALIDATE P2-R3-COMPATIBLE VALUE-KIND / REDUCER / MISSINGNESS / MINIMUM-COUNT RULES
-> VALIDATE BOTH TRUSTED OBSERVATIONS AGAINST THE DECLARED VALUE KIND
-> EMIT ONE DETERMINISTIC, DEEPLY FROZEN POLICY-BINDING EVIDENCE IDENTITY
```

No reduction step appears in this flow.

---

## Required declaration boundary

The future P3-R11 implementation must define one exact-key versioned pair-policy declaration. The exact TypeScript names may be finalized within the authorized implementation so long as they preserve this closed semantic contract.

The top-level declaration must carry only evidence needed to bind the policy to the canonical pair, including at minimum:

```text
version
kind
policyBindingId
alignmentEvidenceIdentity
strategySubjectIdentity
benchmarkId
benchmarkProtocolVersion
dimensionPolicies
```

The declaration must not accept a caller-serialized P3-R10 evidence object as derivation truth. `alignmentEvidenceIdentity` is a claim that must be checked against a freshly reconstructed canonical P3-R10 result from original predecessor preimages.

`strategySubjectIdentity` must equal the freshly reconstructed canonical P3-R10 strategy subject identity.

`benchmarkId` and `benchmarkProtocolVersion` must equal both independently reconstructed canonical P3-R7 member report values. A mismatch across members or between declaration and reconstructed truth fails closed.

The declaration must contain exactly seven dimension-policy entries in canonical P3-R6 dimension order.

Each dimension-policy entry must contain exactly the semantic fields required to make later reduction explicit:

```text
dimension
metricId
unit
valueKind
reducer
missingnessPolicy
minimumObservedCount
```

No direction, threshold, weight, score, rank, utility, normalization, confidence, significance, winner, or promotion field is authorized.

---

## Exact seven-dimension coverage

P3-R11 must cover exactly the canonical P3-R6 dimensions and no eighth dimension:

```text
recall-at-k
precision-at-k
file-f1
token-budgeted-evidence-yield
no-gold-abstention
explored-vs-utilized-context
context-dilution
```

For every dimension:

- `metricId` must equal the corresponding canonical P3-R10 aligned metric ID;
- `unit` must equal the corresponding canonical P3-R10 aligned metric unit;
- duplicate dimensions fail closed;
- duplicate `(metricId, unit)` policy slots fail closed where they would make dimension semantics ambiguous;
- missing dimensions fail closed;
- unknown dimensions fail closed;
- caller ordering must not permit semantic ambiguity; the normalized evidence must use canonical P3-R6 order.

Metric aliasing, unit conversion, coercion, intersection, union, dropping, imputation, and normalization remain unauthorized.

---

## Closed value-kind and reducer vocabulary

P3-R11 must reuse the canonical P2-R3 vocabulary rather than invent a competing reducer language:

```text
valueKind = NUMBER | BOOLEAN
reducer = ARITHMETIC_MEAN | BOOLEAN_TRUE_RATE
```

Compatibility is exact:

```text
ARITHMETIC_MEAN   -> NUMBER only
BOOLEAN_TRUE_RATE -> BOOLEAN only
```

P3-R11 must validate the two trusted P3-R10 observations for each dimension against the declared `valueKind`:

- an `observed` numeric value must be a finite JSON number when `valueKind=NUMBER`;
- an `observed` boolean value must be a JSON boolean when `valueKind=BOOLEAN`;
- an observed number under `BOOLEAN` fails closed;
- an observed boolean under `NUMBER` fails closed;
- `unavailable` with `null` remains valid evidence and must not be coerced into either value kind;
- any predecessor state outside the canonical P3-R6/R10 `observed | unavailable` boundary fails closed.

P3-R11 must not infer `valueKind` from the observations. It validates an explicit caller declaration against trusted evidence.

No actual arithmetic mean or boolean true-rate value may be calculated or emitted in P3-R11.

---

## Closed missingness and minimum-count semantics

P3-R11 must reuse the canonical P2-R3 missingness vocabulary:

```text
missingnessPolicy = REQUIRE_COMPLETE | OBSERVED_ONLY_WITH_COVERAGE
```

The P3-R11 pair has exactly two expected case slots for each aligned dimension. Therefore:

```text
EXPECTED_COUNT = 2
```

`minimumObservedCount` must be a positive safe integer and may be only `1` or `2` for this bounded pair.

Additional validation:

- `REQUIRE_COMPLETE` requires `minimumObservedCount = 2`;
- `OBSERVED_ONLY_WITH_COVERAGE` permits `minimumObservedCount = 1` or `2`;
- zero, negative, fractional, non-finite, unsafe, or greater-than-two counts fail closed.

P3-R11 may validate these policy constraints and preserve the two observation states. It must not emit a reduced/insufficient status, reduced value, true count, denominator, mean, rate, pass/fail state, or other reduction result. Those are later semantics requiring separate authority.

Unavailable observations remain visible. They are never silently treated as zero, false, failure, success, or absence from the pair.

---

## Required predecessor reconstruction and continuity

The implementation must treat all caller-supplied predecessor-shaped inputs as untrusted declarations/preimages.

It must reconstruct canonical predecessor truth from original preimages rather than accepting serialized intermediate evidence as authority.

At minimum:

1. reconstruct canonical P3-R10 using the exact canonical P3-R10 implementation;
2. independently reconstruct canonical P3-R7 report evidence for member A and member B from their original case inputs;
3. require the reconstructed R7 members to bind to the corresponding R10 member references by case ID, R1 result identity, policy identity, application identity, report evidence identity, measurement evidence identity, and trusted observation facts as applicable;
4. require exact benchmark ID equality across A/B;
5. require exact benchmark protocol version equality across A/B;
6. require the R11 declaration benchmark/protocol values to match reconstructed truth;
7. require exact R10 alignment identity and strategy-subject identity continuity;
8. reject forged caller-serialized R6/R7/R8/R9/R10/R11 evidence fields added to the closed input bundles.

The implementation must not claim that A/B have one shared P2-R2 report identity, one shared manifest-set digest, one shared development corpus identity, or one shared holdout identity unless those values are independently and exactly proven. Such equality is not part of this R11 contract.

---

## Required result contract

P3-R11 must emit one deeply immutable machine-readable evidence object with a deterministic canonical identity.

The result must contain only policy-binding evidence, including at minimum:

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

Each member reference must contain only identity/provenance values required to prove continuity to the canonical predecessors. It must not duplicate whole mutable caller inputs unnecessarily.

Each dimension policy binding must preserve enough information to inspect the declaration against the trusted aligned pair, including:

```text
dimension
metricId
unit
valueKind
reducer
missingnessPolicy
minimumObservedCount
memberAObservation
memberBObservation
```

The two nested observations must be the trusted canonical reconstructed observations already validated through R10 continuity. Their exact `measurement_status` and exact boolean/finite-number/null `value` must be preserved without reinterpretation.

The evidence identity must cover every normalized evidence-bearing field except itself. Benign caller object-key insertion order must not change the identity. Any legitimate semantic policy change must change the identity.

Returned evidence must be detached from caller-owned mutable objects and deeply frozen.

---

## Explicit no-reduction boundary

P3-R11 must emit no field representing or implying:

```text
reducedValue
mean
average
sum
total
rate
trueCount
denominatorCount
status = REDUCED
status = INSUFFICIENT_EVIDENCE
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

The presence of the word `reducer` in the policy binding records an explicit future reduction method; it does not authorize executing that reducer in P3-R11.

P3-R11 closure therefore means only:

```text
EXPLICIT PAIR REDUCTION POLICY IS CANONICALLY BOUND
```

It does not mean:

```text
PAIR HAS BEEN REDUCED
PAIR IS COMPARABLE TO ANOTHER STRATEGY
STRATEGY IS BETTER
STRATEGY IS ACCEPTED
STRATEGY IS DEFAULT
P3 IS COMPLETE
```

---

## Hostile-input and determinism boundary

The implementation must preserve the hardened canonical JSON discipline already used by P2/P3 predecessors.

Before semantic reuse, fail closed on unsupported or hostile structures including where applicable:

- Proxy objects;
- accessors/getters/setters;
- symbol properties;
- non-plain object prototypes;
- sparse, extended, accessor, or non-canonical arrays;
- cycles;
- `undefined`, functions, bigint, symbols, non-finite numbers, or other non-JSON values;
- unknown fields;
- missing fields;
- duplicate dimensions or duplicate semantic slots;
- malformed identities;
- unsupported enum values.

Same canonical predecessor preimages plus same canonical R11 declaration must produce the same policy-binding evidence identity.

Caller mutation after return must not alter the returned evidence.

No clock, randomness, locale, hostname, process state, environment variable, absolute path, or caller object iteration order may affect the semantic identity.

---

## Ambient side-effect boundary

P3-R11 runtime logic must be pure local in-memory computation.

Required authority values:

```text
FILESYSTEM READ / WRITE BY P3-R11 LOGIC = 0
NETWORK CALLS = 0
SUBPROCESS / TOOL / SANDBOX EXECUTION = 0
PROVIDER / MODEL / REVIEWER / EVALUATOR INVOCATION = 0
SECRET ACCESS = 0
PERSISTENCE / DATABASE / FILE OUTPUT = 0
TELEMETRY / UPLOAD / ANALYTICS EGRESS = 0
CLOCK / RANDOMNESS DEPENDENCY = 0
NEW DEPENDENCIES = 0
DONOR CODE / DATA INTAKE = 0
BENCHMARK PARTICIPANT EXECUTION = 0
BENCHMARK FIXTURE / CORPUS / MANIFEST MUTATION = 0
```

Existing test-runner and CI behavior remains ordinary repository tooling and does not grant P3-R11 product/runtime logic any new side-effect authority.

K2 remains the trusted side-effect execution boundary. This record does not expand K2.

---

## Future implementation allowlist — effective only after canonical authorization

Only after this authorization record becomes canonical and its mandatory post-merge proof succeeds, exactly one bounded P3-R11 implementation PR may modify only:

```text
packages/kodac-runtime/bench/p3-r11/contracts.ts
packages/kodac-runtime/bench/p3-r11/single-strategy-two-case-reduction-policy-binding.ts
packages/kodac-runtime/test/p3-r11-single-strategy-two-case-reduction-policy-binding.test.ts
docs/planning/KODAC_P3_R11_TWO_CASE_REDUCTION_POLICY_BINDING_EVIDENCE_2026-09-01.md
```

No fifth path is authorized.

The implementation may import and reuse canonical P2/P3 types/functions needed to reconstruct and validate predecessor truth. It may not modify predecessor source, tests, fixtures, manifests, workflows, package manifests, lockfiles, product surfaces, adapters, rulesets, or roadmap/status views.

If the implementation requires any change outside this exact allowlist, stop. A separate authorization is required.

---

## Required focused test obligations

The future implementation PR must prove at minimum:

1. one valid deterministic two-member R10-aligned pair can bind exactly seven explicit policies without performing reduction;
2. the result preserves canonical P3-R6 dimension order;
3. the result binds the exact reconstructed R10 alignment identity and R8 strategy subject identity;
4. both independently reconstructed R7 members share the declared benchmark ID;
5. benchmark-ID mismatch across members fails closed even if R9/R10 otherwise accept the pair;
6. both independently reconstructed R7 members share the declared benchmark protocol version;
7. benchmark-protocol mismatch across members fails closed even if R9/R10 otherwise accept the pair;
8. every policy metric ID matches the corresponding R10 aligned metric ID;
9. every policy unit matches the corresponding R10 aligned unit;
10. missing, duplicate, reordered-to-wrong-dimension, or unknown dimension policy entries fail closed;
11. `ARITHMETIC_MEAN + NUMBER` is accepted as a policy binding for numeric observed values without calculating a mean;
12. `BOOLEAN_TRUE_RATE + BOOLEAN` is accepted as a policy binding for boolean observed values without calculating a rate;
13. reducer/value-kind mismatch fails closed;
14. observed boolean under declared `NUMBER` fails closed;
15. observed number under declared `BOOLEAN` fails closed;
16. unavailable/null observations remain preserved and do not force inferred value-kind semantics;
17. `REQUIRE_COMPLETE` requires `minimumObservedCount=2`;
18. `OBSERVED_ONLY_WITH_COVERAGE` permits only `1` or `2`;
19. invalid minimum counts fail closed;
20. forged serialized predecessor evidence or unknown closed-bundle fields fail closed;
21. predecessor report/binding/policy/application/case/result drift fails closed through exact reconstruction;
22. repeated identical inputs produce identical policy-binding evidence identity;
23. benign property-insertion order does not change semantic identity;
24. a legitimate policy semantic change changes the evidence identity;
25. caller mutation after invocation does not mutate returned evidence;
26. returned evidence is detached and deeply frozen;
27. hostile Proxy/accessor/symbol/cycle/sparse/non-finite/non-JSON inputs fail closed before semantic reuse;
28. no filesystem/network/subprocess/provider/model/reviewer/evaluator/secret/persistence/telemetry/clock/randomness dependency exists in P3-R11 logic;
29. no result field materializes reduction, direction, score, threshold, ranking, winner, promotion, or default semantics;
30. focused tests, full runtime tests, typecheck, and patch benchmark hook remain terminal success on the exact candidate head.

Tests must use repository-authored synthetic in-memory evidence only. They must not execute a real benchmark participant or mutate canonical fixture/corpus/manifest truth.

---

## Implementation evidence record

The future implementation PR must create exactly:

```text
docs/planning/KODAC_P3_R11_TWO_CASE_REDUCTION_POLICY_BINDING_EVIDENCE_2026-09-01.md
```

The evidence record must bind at least:

- canonical authorization PR, qualified head, authorization blob, merge, and post-merge proof;
- implementation base and exact final candidate head/tree;
- exact four-path realization and four final Git blobs;
- focused-test command/result;
- full runtime test/typecheck/patch-benchmark result;
- Governance and K2 exact-head checks;
- two distinct external substantive semantic reviewer/model-system terminal-clean channels on the exact head/current metadata;
- zero unresolved actionable findings/threads;
- active ruleset/no-bypass state;
- explicit hostile-input and ambient-side-effect proof;
- preserved non-grants;
- exact guarded merge conditions;
- mandatory post-merge main/ordered-parent/tree/four-blobs/signature/applicable-check/ruleset proof.

Candidate-time evidence must not claim future merge/post-merge events as facts.

---

## Authorization candidate qualification gate

Do not merge this authorization candidate until one frozen exact head proves all of the following:

- canonical `main` remains the exact base `f9636474877c142dc8849094c1856f5b1a92cf6f` or the branch is forward-reconciled non-destructively and fully requalified;
- `behind_by=0`;
- changed-file set is exactly the one authorization path named above;
- exact candidate head, tree, and authorization blob are captured;
- no runtime source, test, workflow, dependency, lockfile, roadmap/status, benchmark fixture/corpus/manifest, product, release, provider/model, persistence, or ruleset path changed;
- Governance `provenance` and `legacy-tests` are terminal success on the exact head;
- K2 classifier/gate applicability is represented exactly as it occurred; for a docs-only one-path change the runtime matrix may be skipped only when canonical workflow conditions prove that outcome valid;
- at least two distinct independently operated external substantive semantic reviewer/model-system channels are terminal-clean on the exact final head and current PR metadata;
- status-only, summary-only, self-review, human-only, billing-blocked, rate-limited, service-error, invocation-only, stale-head, or duplicate-channel output does not count toward the semantic quorum;
- unresolved material findings = 0;
- unresolved actionable review threads = 0;
- PR is open, non-draft, mergeable, and not behind protected `main`;
- ruleset `20707483` remains active with `bypass_actors=[]`, `current_user_can_bypass=never`, required thread resolution, and required checks `provenance`, `legacy-tests`, and `k2-runtime-gate`;
- `WAIVER=NO`;
- merge is a normal history-preserving merge guarded by exact `expected_head_sha` semantics.

Any repository-byte or base movement invalidates earlier exact-head CI/review qualification evidence.

---

## Mandatory authorization post-merge proof

P3-R11 implementation authority becomes effective only after this authorization PR merges and live GitHub proves all of the following:

- protected canonical `main` equals the returned authorization merge SHA;
- ordered merge parent 1 equals the then-canonical base and ordered parent 2 equals the exact qualified authorization head;
- merge tree equals the qualified candidate tree;
- canonical authorization path blob equals the qualified candidate blob;
- GitHub merge signature/verification is valid where emitted;
- authorization PR is merged/closed with the expected merge SHA;
- applicable push-event Governance/K2 outcomes are represented exactly and any required applicable checks succeed;
- ruleset `20707483` remains active/no-bypass;
- no post-qualification finding invalidates the proof.

Only after that complete proof may the future four-path P3-R11 implementation begin.

---

## Preserved non-grants

This record does not authorize:

```text
REAL BENCHMARK TASK / PARTICIPANT EXECUTION
BENCHMARK FIXTURE / CORPUS / MANIFEST CREATION OR MUTATION
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION
ANY REDUCED VALUE IN THE AUTHORIZATION PR
ANY P3-R11 IMPLEMENTATION BEFORE THIS AUTHORIZATION IS CANONICAL
P3-R12+ IMPLEMENTATION
SUM / TOTAL / MEAN / AVERAGE EXECUTION
BOOLEAN TRUE-RATE EXECUTION
NORMALIZATION / WEIGHTING / THRESHOLDING
DIRECTION / HIGHER-IS-BETTER / LOWER-IS-BETTER
PAIRWISE BETTER/WORSE RELATION
MULTI-STRATEGY COMPARISON
LEADERBOARD / RANKING / PROMOTION
REPOSITORY-OWNED DEFAULT / WINNER
REPOSITORY-OWNED GOLD TRUTH
STATISTICAL SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY
HOLDOUT SUFFICIENCY / UNBIASEDNESS / CONTAMINATION-FREE CLAIM
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION
NETWORK / SECRET / SUBPROCESS / SANDBOX EXPANSION
NEW DEPENDENCIES / DONOR INTAKE
EMBEDDINGS / VECTOR DB / LEARNED RERANKING
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD
TRAINING / FINE-TUNING / ONLINE LEARNING
CROSS-REPOSITORY DATA ACCESS OR LEARNING
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION
PUBLIC QUALITY / SUPERIORITY / RELEASE / PACKAGE / BRAND CLAIM
P3 OVERALL CLOSURE
P4-P8 IMPLEMENTATION
RULESET CHANGE / BYPASS
WAIVER
```

Explicit policy binding is evidence, not authority to execute the bound reducer.

---

## Closure meaning

If this authorization later becomes canonical, it authorizes only the exact four-path P3-R11 implementation described above.

If that implementation later qualifies, merges, and receives complete post-merge proof, then and only then may bounded P3-R11 itself be called `CLOSED_CANONICAL`.

Even successful P3-R11 closure means only:

```text
EXACT TWO-CASE R10 ALIGNMENT
+ SHARED BENCHMARK / PROTOCOL PROOF
+ EXPLICIT P2-R3-COMPATIBLE PAIR REDUCTION POLICY BINDING
= CLOSED_CANONICAL FOR THAT BOUNDED EVIDENCE MECHANISM
```

It does not close P3 overall and does not authorize P3-R12 or any reduction implementation by implication.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
INTELLIGENCE != AUTHORITY
REVIEW != PROOF
WAIVER = NO
```
