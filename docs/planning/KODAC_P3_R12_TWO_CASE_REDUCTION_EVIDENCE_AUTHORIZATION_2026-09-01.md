# Kodac P3-R12 Two-Case Reduction Evidence Authorization — 2026-09-01

## Status

```text
DOCUMENT TYPE = FOUNDER-AUTHORIZED IMPLEMENTATION GATE CANDIDATE
P3-R1 THROUGH P3-R11 = CLOSED_CANONICAL
P3-R11 CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R12 IMPLEMENTATION = AUTHORIZED ONLY AFTER THIS RECORD IS CANONICAL AND POST-MERGE PROVEN
P3-R13+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
REAL BENCHMARK TASK / PARTICIPANT EXECUTION = NOT_AUTHORIZED
THREE-OR-MORE-CASE / UNBOUNDED REDUCTION = NOT_AUTHORIZED
DIRECTION / DELTA / COMPARISON / RANKING / PROMOTION = NOT_AUTHORIZED
WAIVER = NO
```

This record is deny-by-default. While it is only a branch or pull-request candidate, it authorizes no runtime implementation, reducer execution, benchmark participant execution, corpus or manifest mutation, direction/comparison semantics, provider/model execution, persistence, product integration, release, dependency intake, ruleset mutation, or side effect.

The bounded P3-R12 implementation authority defined below becomes effective only after this exact authorization unit is qualified on one frozen exact head, merged normally into protected `main` with an exact expected-head precondition, and its mandatory post-merge proof succeeds.

The `P3-R12` designation is evidence-driven. It is not inferred merely because P3-R11 is closed.

---

## Exact canonical baseline

This authorization candidate is prepared from protected canonical `main`:

```text
CANONICAL_MAIN = 7ae2f05114fd06eba5ce4c70efc0c743647c680a
CANONICAL_TREE = 8a8e4c5d27cc8ddce93687016a02b491366a97a1
P3_R11_IMPLEMENTATION_PR = #289
P3_R11_IMPLEMENTATION_MERGE = 0842ed7dac95bad879cc55d720ba5646ae021f24
P3_R11_IMPLEMENTATION_POST_MERGE_PROOF = #289 / 5495387091
P3_R11_RECONCILIATION_PR = #290
P3_R11_RECONCILIATION_MERGE = 7ae2f05114fd06eba5ce4c70efc0c743647c680a
P3_R11_RECONCILIATION_POST_MERGE_PROOF = #290 / 5495642593
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Governing records include:

- root `AGENTS.md`;
- `docs/roadmap/NEXT.md`;
- `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`;
- `docs/adr/ADR-0010-benchmark-first-donor-selection.md`;
- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`;
- canonical P2-R2, P2-R3, and P2-R4 contracts/tests/evidence;
- canonical P3-R6 through P3-R11 authorization/evidence contracts;
- immutable GitHub qualification, merge, post-merge, and reconciliation proof through P3-R11.

If live protected `main`, repository governance, or a more-specific canonical record conflicts with this candidate before merge, reconcile forward non-destructively and fully requalify. Do not force-push, rebase shared history, reuse stale exact-head evidence, reduce reviewer cardinality, bypass rulesets, or silently waive a gate.

---

## Exact authorization-unit changed-file set

This authorization PR may change exactly one path and no second path:

```text
docs/planning/KODAC_P3_R12_TWO_CASE_REDUCTION_EVIDENCE_AUTHORIZATION_2026-09-01.md
```

This authorization unit is documentation/governance only. It may not implement P3-R12, modify roadmap/status views, alter workflows, mutate dependencies, change benchmark fixtures/corpora/manifests, or modify any P2/P3 runtime source or test.

The exact one-path set above governs candidate qualification. The final Git blob for this path must be captured on the frozen exact head before merge.

---

## Observed canonical gap

Canonical P3-R11 now proves one exact pair-specific policy-binding layer for exactly two canonical P3-R10-aligned members. For every canonical P3-R6 dimension it binds:

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

The canonical P3-R11 evidence explicitly stops before reducer execution:

```text
EXPECTED_COUNT = 2
ARITHMETIC_MEAN = DECLARED POLICY ONLY
BOOLEAN_TRUE_RATE = DECLARED POLICY ONLY
REDUCED / INSUFFICIENT_EVIDENCE = NOT MATERIALIZED
```

Canonical P2-R3 already defines and implements the repository's bounded reduction semantics for metrics inside one validated P2-R2 report:

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

summary status:
  REDUCED
  INSUFFICIENT_EVIDENCE
```

P2-R3 also computes expected/observed/missing/unavailable coverage, arithmetic mean for numeric values, and boolean true rate over observed boolean values.

However, canonical P2-R3 policy identity is bound to exactly one `r2_report_identity`. Canonical P3-R11 deliberately preserves two independently reconstructed P2-R2 report identities, one per member. Creating a synthetic shared P2-R2 report merely to call P2-R3 would invent a report/provenance identity that canonical P3-R11 does not establish.

Therefore the missing layer is not a new reducer vocabulary and not a strategy comparison layer. It is narrower:

```text
ONE EXACT CANONICAL P3-R11 TWO-CASE POLICY BINDING
-> RECONSTRUCT THE TRUSTED R11 SOURCE FROM ORIGINAL PREIMAGES
-> APPLY THE ALREADY-BOUND P2-R3-COMPATIBLE REDUCTION SEMANTICS
-> PRODUCE EXACTLY SEVEN INDEPENDENT TWO-SLOT REDUCTION RESULTS
-> PRESERVE SOURCE OBSERVATIONS AND COVERAGE
-> EMIT ONE DETERMINISTIC REDUCTION-EVIDENCE IDENTITY
-> PERFORM NO DIRECTIONAL OR CROSS-STRATEGY COMPARISON
```

This is the bounded P3-R12 gap authorized by this record only after canonicalization.

---

## Why P2-R3 cannot simply be reused as the P3-R12 result

P2-R3 is canonical and remains read-only. Its semantics are authoritative precedent for the reducer vocabulary and coverage rules, but its document/result identities are scoped to one P2-R2 report.

P3-R11's pair can legitimately contain two distinct:

```text
p2R2ReportIdentity
reportEvidenceIdentity
measurementEvidenceIdentity
caseId
r1ResultIdentity
```

while still sharing the exact benchmark ID, benchmark protocol version, strategy subject, aligned metric IDs/units, and pair policy.

P3-R12 must therefore reuse P2-R3 **semantics**, not forge P2-R3 **identity**. It may import canonical P2-R3 types needed to keep the vocabulary aligned, but it must emit a P3-specific pair-reduction evidence identity bound to canonical P3-R11.

---

## Fresh external precedent reviewed on 2026-09-01

External precedent is supporting evidence only. It does not create Kodac authority or override canonical contracts.

### UK AISI Inspect

Sources:

- https://inspect.aisi.org.uk/scoring.html
- https://inspect.aisi.org.uk/metrics.html
- https://inspect.aisi.org.uk/reference/inspect_ai.scorer.html

Observed precedent:

- scoring produces per-sample values while metrics aggregate those values;
- reducers such as `mean` are explicit;
- missing-key handling is explicit through policies such as `error`, `skip`, or `zero` rather than silently inferred;
- a `collect` reducer exists specifically to preserve individual values instead of collapsing them.

This supports making reduction an explicit auditable layer and preserving source observations/coverage rather than hiding them.

### EleutherAI lm-evaluation-harness

Sources:

- https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/new_task_guide.md
- https://github.com/EleutherAI/lm-evaluation-harness/blob/main/lm_eval/api/metrics.py

Observed precedent:

- metric configuration separates `aggregation` from `higher_is_better`;
- common metrics register aggregation such as `mean` independently from directional metadata.

This is direct supporting evidence that aggregation/reduction and direction are separable semantic layers. P3-R12 therefore must not introduce `higherIsBetter`, `lowerIsBetter`, better/worse, comparison, ranking, or promotion semantics.

### Hugging Face Evaluate

Sources:

- https://huggingface.co/docs/evaluate/a_quick_tour
- https://huggingface.co/docs/evaluate/en/base_evaluator

Observed precedent:

- multiple metrics are computed and returned independently;
- combining metrics does not require collapsing them into one scalar score.

This supports preserving the seven canonical P3 dimensions as seven independent reduced results rather than inventing a cross-dimension aggregate score.

---

## P3-R12 purpose

P3-R12 may implement one pure deterministic in-memory reduction-evidence mechanism for exactly the two trusted observation slots already bound by canonical P3-R11.

Its intended flow is:

```text
UNTRUSTED P3-R12 REDUCTION DECLARATION
+ UNTRUSTED P3-R11 PAIR-POLICY DECLARATION
+ UNTRUSTED P3-R10 ALIGNMENT DECLARATION
+ UNTRUSTED P3-R9 COMPOSITION DECLARATION
+ UNTRUSTED P3-R8 STRATEGY DECLARATION
+ ORIGINAL CASE A PREIMAGES
+ ORIGINAL CASE B PREIMAGES
-> CANONICAL-JSON SNAPSHOT / HOSTILE-STRUCTURE REJECTION
-> RECONSTRUCT CANONICAL P3-R11 FROM ORIGINAL PREIMAGES
-> BIND THE R12 DECLARATION TO THAT EXACT R11 IDENTITY / STRATEGY / BENCHMARK / PROTOCOL
-> FOR EACH OF EXACTLY SEVEN CANONICAL DIMENSIONS:
   -> TAKE THE EXACT R11 POLICY AND TWO TRUSTED OBSERVATIONS
   -> COUNT EXPECTED / OBSERVED / UNAVAILABLE SLOTS
   -> APPLY THE EXPLICIT R11 MISSINGNESS / MINIMUM-COVERAGE POLICY
   -> IF SUFFICIENT, APPLY THE EXPLICIT R11 REDUCER
   -> IF INSUFFICIENT, EMIT NULL REDUCED VALUE
   -> PRESERVE SOURCE OBSERVATIONS AND POLICY FIELDS
-> EMIT ONE DETERMINISTIC DEEPLY FROZEN P3-R12 REDUCTION-EVIDENCE IDENTITY
```

No direction, delta, strategy comparison, scoring across dimensions, ranking, winner, default, promotion, statistical acceptance, or public quality claim appears in this flow.

---

## Required R12 declaration boundary

The future implementation must define one exact-key versioned reduction declaration. Exact TypeScript names may be finalized inside the authorized implementation so long as the closed semantic contract is preserved.

The declaration must contain only source-binding identity fields, including at minimum:

```text
version
kind
reductionId
policyBindingEvidenceIdentity
strategySubjectIdentity
benchmarkId
benchmarkProtocolVersion
```

The declaration must contain no reducer/value-kind/missingness override. Those semantics already belong to canonical P3-R11 and must be reconstructed from trusted predecessor inputs.

The declaration must contain no:

```text
direction
higherIsBetter
lowerIsBetter
target
threshold
weight
score
utility
normalization
confidence
rank
winner
promotion
default
```

`policyBindingEvidenceIdentity` is a claim that must be checked against a freshly reconstructed canonical P3-R11 result. The implementation must not accept a caller-serialized P3-R11 result as derivation truth.

---

## Required predecessor reconstruction and continuity

All predecessor-shaped inputs remain untrusted.

At minimum P3-R12 must:

1. snapshot every public input through the inherited canonical JSON boundary before semantic reuse;
2. reconstruct canonical P3-R11 using the exact canonical P3-R11 implementation and original predecessor preimages;
3. require the R12 declaration `policyBindingEvidenceIdentity` to equal the freshly reconstructed R11 identity;
4. require exact strategy-subject, benchmark-ID, and benchmark-protocol continuity;
5. preserve the two R11 member references without inventing one shared P2-R2 report identity;
6. use exactly the seven canonical R11 dimension-policy bindings in canonical P3-R6 order;
7. use each binding's exact trusted member A/member B observations as the only reduction inputs;
8. reject forged serialized R6/R7/R8/R9/R10/R11/R12 evidence fields added to the closed input bundles;
9. fail closed on any predecessor reconstruction or identity mismatch.

P3-R12 must not reconstruct a synthetic combined P2-R2 report and must not claim that member A/member B share one report identity, manifest-set digest, development-corpus identity, or holdout identity.

---

## Exact two-slot coverage boundary

For every canonical dimension:

```text
EXPECTED_COUNT = 2
```

Canonical P3-R11 accepts only the trusted P3-R6/R10 observation state boundary:

```text
observed
unavailable
```

Therefore P3-R12 pair reduction must derive:

```text
observedCount = number of observed member slots
unavailableCount = number of unavailable member slots
observedCount + unavailableCount = 2
```

P3-R12 must **not** invent a `missingCount` field for this pair-specific contract. P2-R3 supports a broader P2-R2 state vocabulary including `missing`, but canonical P3-R11 intentionally exposes only `observed | unavailable` trusted pair observations.

Any source state outside that canonical R11 boundary fails closed through predecessor reconstruction.

---

## Exact sufficiency semantics

P3-R12 must apply the already-bound canonical P3-R11 policy without override:

```text
REQUIRE_COMPLETE:
  status = REDUCED                  iff observedCount == 2
  status = INSUFFICIENT_EVIDENCE    otherwise

OBSERVED_ONLY_WITH_COVERAGE:
  status = REDUCED                  iff observedCount >= minimumObservedCount
  status = INSUFFICIENT_EVIDENCE    otherwise
```

Canonical P3-R11 already limits:

```text
minimumObservedCount = 1 | 2
REQUIRE_COMPLETE -> minimumObservedCount = 2
OBSERVED_ONLY_WITH_COVERAGE -> minimumObservedCount = 1 | 2
```

P3-R12 must not reinterpret unavailable as zero, false, failure, success, or an omitted expected slot.

---

## Exact numeric reduction semantics

For a binding with:

```text
valueKind = NUMBER
reducer = ARITHMETIC_MEAN
```

P3-R12 must:

- accept only the finite numeric observed values already validated by canonical R11;
- reduce only the observed values when status is `REDUCED`;
- compute the arithmetic mean with semantics equivalent to canonical P2-R3;
- preserve the input metric unit as the output unit;
- emit `reducedValue = null` when status is `INSUFFICIENT_EVIDENCE`;
- emit no boolean `trueCount` or `denominatorCount` values for a numeric reduction;
- fail closed if arithmetic would produce a non-finite result;
- perform no rounding, clamping, normalization, weighting, thresholding, or direction inference.

With `OBSERVED_ONLY_WITH_COVERAGE` and `minimumObservedCount=1`, one observed numeric value plus one unavailable value may produce a `REDUCED` result equal to the single observed value. This is the explicit policy semantics, not imputation.

---

## Exact boolean reduction semantics

For a binding with:

```text
valueKind = BOOLEAN
reducer = BOOLEAN_TRUE_RATE
```

P3-R12 must:

- count `true` only among observed boolean values;
- set `denominatorCount = observedCount`;
- preserve `trueCount` and `denominatorCount` as coverage evidence;
- emit output unit `ratio_0_1`;
- emit `reducedValue = trueCount / denominatorCount` only when status is `REDUCED`;
- emit `reducedValue = null` when status is `INSUFFICIENT_EVIDENCE`;
- never divide by zero when the result is insufficient;
- perform no thresholding, pass/fail conversion, direction inference, or comparison.

As in canonical P2-R3, boolean counts may remain visible even when the reduced value is insufficient, because those counts are evidence about observed coverage rather than a quality judgment.

---

## Exact seven-dimension boundary

P3-R12 must reduce exactly these seven canonical P3-R6 dimensions independently and in canonical order:

```text
recall-at-k
precision-at-k
file-f1
token-budgeted-evidence-yield
no-gold-abstention
explored-vs-utilized-context
context-dilution
```

P3-R12 may not compute or emit any cross-dimension:

```text
sum
total
mean
weightedMean
score
aggregateScore
utility
normalizedScore
composite
index
rank
```

Seven reduced metric results remain seven separate evidence dimensions.

---

## Required result contract

P3-R12 must emit one deterministic deeply immutable evidence object. Exact TypeScript names may be finalized inside the authorized implementation, but the semantic result must contain only fields required to prove source continuity and inspect the bounded reduction.

Top-level evidence must include at minimum:

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

Each dimension reduction must include at minimum:

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

Contract rules:

- `expectedCount` is always exactly `2`;
- `observedCount + unavailableCount == 2`;
- numeric reductions use `trueCount = null` and `denominatorCount = null`;
- boolean reductions preserve integer `trueCount` and `denominatorCount`;
- `reducedValue` is finite when non-null;
- source observations are the exact canonical R11 observations, not caller-rewritten copies;
- result ordering is canonical P3-R6 dimension order;
- the evidence identity covers every normalized evidence-bearing field except itself;
- benign caller object-key insertion order does not change identity;
- any legitimate source-policy, source-observation, or R12 source-binding declaration change changes identity;
- returned evidence is detached from caller-owned mutable inputs and deeply frozen.

---

## Explicit no-comparison boundary

P3-R12 must emit no field representing or implying:

```text
direction
higherIsBetter
lowerIsBetter
rawDelta
delta
leftValue
rightValue
better
worse
preferred
comparable
comparisonStatus
rank
winner
threshold
pass
fail
accept
reject
promotion
default
weight
aggregateScore
confidenceInterval
pValue
effectSize
```

Canonical P2-R4 demonstrates that direction and pairwise comparison are separate semantics layered on reduced summaries. P3-R12 does not import those semantics.

---

## Hostile-input, determinism, and side-effect boundary

Every public input must be snapshotted before semantic use through the inherited hardened canonical JSON boundary.

Focused tests must cover fail-closed rejection of hostile/non-canonical structures including applicable cases of:

- Proxy objects;
- accessors;
- symbol fields;
- cycles;
- sparse arrays;
- non-finite numeric values;
- malformed SHA-256 identities;
- missing or unknown exact-key contract fields;
- forged predecessor-shaped evidence fields.

The implementation must be pure local deterministic computation and must not depend on ambient:

```text
network / fetch
clock
randomness
environment variables
filesystem reads/writes
subprocess execution
```

No provider/model/reviewer/evaluator/tool invocation, secret access, persistence, telemetry, upload, benchmark participant execution, corpus mutation, repository crawl, dependency intake, or product integration is authorized.

---

## Required focused qualification coverage

The future authorized test file must prove at minimum:

```text
- valid deterministic seven-dimension two-case reduction evidence
- exact reconstruction and binding to canonical R11 identity
- exact strategy / benchmark / protocol continuity
- exact two-slot expected/observed/unavailable coverage
- no invented missingCount field
- NUMBER + ARITHMETIC_MEAN with two observed values
- NUMBER + ARITHMETIC_MEAN with one observed / one unavailable under coverage minimum 1
- numeric insufficient result under coverage minimum 2
- numeric insufficient result under REQUIRE_COMPLETE with an unavailable slot
- BOOLEAN + BOOLEAN_TRUE_RATE with two observed values
- boolean one-observed coverage result under minimum 1
- boolean insufficient result under minimum 2
- both-unavailable insufficient behavior without divide-by-zero
- exact numeric output unit preservation
- exact boolean output unit ratio_0_1
- reducedValue null when insufficient
- boolean trueCount / denominatorCount evidence semantics
- numeric trueCount / denominatorCount remain null
- exact seven dimensions / canonical order
- no cross-dimension aggregate score
- no direction / delta / comparison / ranking / promotion output
- forged R11 identity or predecessor drift fails closed
- caller-serialized predecessor evidence is not accepted as truth
- deterministic repeatability
- benign object-key insertion order invariance
- semantic source-policy or source-observation changes alter evidence identity
- deep freeze / detachment / caller-mutation isolation
- hostile Proxy/accessor/symbol/cycle/sparse/non-finite rejection
- no ambient network/clock/randomness/environment dependency
- no ambient filesystem/subprocess dependency
```

Test data remains repository-authored synthetic in-memory evidence. No real benchmark task or participant is executed.

---

## Future implementation allowlist — effective only after canonical authorization

Only after this authorization record becomes canonical and its mandatory post-merge proof succeeds, exactly one bounded P3-R12 implementation PR may modify only:

```text
packages/kodac-runtime/bench/p3-r12/contracts.ts
packages/kodac-runtime/bench/p3-r12/single-strategy-two-case-reduction-evidence.ts
packages/kodac-runtime/test/p3-r12-single-strategy-two-case-reduction-evidence.test.ts
docs/planning/KODAC_P3_R12_TWO_CASE_REDUCTION_EVIDENCE_2026-09-01.md
```

No fifth implementation path is authorized.

The implementation may import canonical predecessor types/functions needed to reconstruct and validate R11/P2-R3-compatible truth. It may not modify predecessor source/tests/evidence, roadmap/status views, workflows, dependencies, lockfiles, benchmark fixtures/corpora/manifests, product surfaces, provider/model configuration, persistence, release configuration, or rulesets.

If implementation requires any path outside this exact allowlist, stop. A separate authorization is required.

---

## Exact-head qualification gate for this authorization unit

Do not merge this authorization candidate until one frozen exact head proves all of the following:

- canonical `main` remains exact base `7ae2f05114fd06eba5ce4c70efc0c743647c680a` or the branch is forward-reconciled non-destructively and fully requalified;
- `behind_by=0`;
- changed-file set is exactly the one authorization path named above;
- exact candidate head, tree, and authorization blob are captured;
- no runtime source, test, workflow, dependency, lockfile, roadmap/status, benchmark fixture/corpus/manifest, product, release, provider/model, persistence, or ruleset path changed;
- Governance `provenance` and `legacy-tests` are terminal success on the exact head;
- K2 classifier/gate applicability is represented exactly as it occurred; a docs-only runtime matrix may be skipped only when canonical workflow conditions prove that outcome valid;
- at least two distinct independently operated external substantive semantic reviewer/model-system channels are terminal-clean on the exact final head and current PR metadata;
- status-only, summary-only, self-review, human-only, billing-blocked, rate-limited, service-error, invocation-only, stale-head, or duplicate-channel output does not count toward the semantic quorum;
- unresolved material findings = 0;
- unresolved actionable review threads = 0;
- ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never`;
- `WAIVER=NO`;
- guarded normal merge uses the exact expected head; and
- mandatory post-merge canonical `main`, ordered parents, tree, authorization blob, GitHub signature, applicable Governance/K2 checks, PR state, and ruleset proof completes before P3-R12 implementation authority becomes effective.

Any repository-byte or base movement invalidates earlier exact-head CI/review qualification evidence.

---

## Implementation qualification gate after authorization becomes canonical

A later P3-R12 implementation candidate may not merge until its frozen exact head proves:

- exact four-path allowlist and `behind_by=0`;
- focused P3-R12 tests terminal success;
- full runtime tests terminal success;
- TypeScript typecheck terminal success;
- patch benchmark hook terminal success;
- Governance provenance + legacy-tests terminal success;
- K2 classifier + Ubuntu/macOS/Windows runtime matrix + stable gate terminal success;
- two distinct independent substantive semantic channels terminal-clean on the exact head/current metadata;
- zero unresolved material findings/actionable threads;
- active no-bypass ruleset;
- immutable exact-head qualification proof;
- guarded normal merge with exact expected head; and
- mandatory post-merge main/ordered-parent/tree/four-blobs/signature/applicable-check/ruleset proof before any `P3_R12=CLOSED_CANONICAL` claim.

Candidate-time evidence must not claim future merge or post-merge facts.

---

## Preserved non-grants

```text
REAL BENCHMARK TASK / PARTICIPANT EXECUTION = NOT_AUTHORIZED
BENCHMARK FIXTURE / CORPUS / MANIFEST CREATION OR MUTATION = NOT_AUTHORIZED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED
CROSS-DIMENSION SUM / MEAN / WEIGHTED SCORE = NOT_AUTHORIZED
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
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3 OVERALL CLOSURE = NOT_AUTHORIZED
P3-R13+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

---

## Authorization decision

The evidence supports one next bounded mechanism and no broader grant:

```text
DECISION = AUTHORIZE A P3-R12 IMPLEMENTATION GATE CANDIDATE FOR EXACTLY-TWO-CASE REDUCTION EVIDENCE
RATIONALE = CANONICAL R11 BINDS THE POLICY BUT DELIBERATELY STOPS BEFORE REDUCTION; CANONICAL P2-R3 DEFINES THE REDUCER/COVERAGE SEMANTICS BUT CANNOT REPRESENT THE TWO-REPORT P3 PAIR WITHOUT FALSE IDENTITY; EXTERNAL EVALUATION PRECEDENT SUPPORTS EXPLICIT AGGREGATION AND SEPARATE DIRECTIONAL SEMANTICS
IMPLEMENTATION = NOT AUTHORIZED UNTIL THIS RECORD IS CANONICAL AND POST-MERGE PROVEN
WAIVER = NO
```

This authorization candidate does not claim that P3-R12 is sufficient to close P3 overall. It authorizes only the bounded reduction-evidence layer defined above after canonicalization.