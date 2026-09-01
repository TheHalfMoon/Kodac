# Kodac P3-R10 Single-Strategy Two-Case Metric Alignment Evidence — 2026-09-01

## 1. Evidence status

```text
DOCUMENT TYPE = IMPLEMENTATION / QUALIFICATION EVIDENCE CANDIDATE
P3-R10 SINGLE-STRATEGY TWO-CASE METRIC ALIGNMENT = CANDIDATE / NOT YET CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK / PARTICIPANT EXECUTION = NOT_AUTHORIZED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION = NOT_AUTHORIZED
MULTI-CASE METRIC / OBSERVATION REDUCTION = NOT_AUTHORIZED
SUM / TOTAL / MEAN / MEDIAN / AVERAGE = NOT_AUTHORIZED
NORMALIZATION / WEIGHTING / THRESHOLDING = NOT_AUTHORIZED
PAIRWISE BETTER/WORSE RELATION = NOT_AUTHORIZED
MULTI-STRATEGY COMPARISON / RANKING / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
P3-R11+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

This evidence candidate accompanies only the bounded P3-R10 pure deterministic metric-alignment implementation authorized by canonical PR #285. It proves that exactly two canonical P3-R9 members under one exact P3-R8 strategy subject use the same `metricId` and `unit` for each of the seven canonical P3-R6 context-quality dimensions before any later cross-case reduction could be meaningfully defined.

It does not add, average, total, normalize, weight, threshold, compare, score, rank, promote, execute a benchmark participant, invoke a provider/model/evaluator, persist state, create a product surface, or create release authority.

---

## 2. Canonical authority

```text
AUTHORIZATION_PR = #285
AUTHORIZATION_QUALIFIED_HEAD = 1933f6f1b0e8eff674ad33505f7a7974f2e69c1f
AUTHORIZATION_BLOB = 639fe0915dbbd3266702008e6b7c83752146de01
AUTHORIZATION_MERGE / IMPLEMENTATION_BASE = 3b4d75133ca350ca147802fb53cc4716ab6ee2e0
AUTHORIZATION_MERGE_TREE = c5ceacaba23e10e687c605a2d4ca317b3a2f19b5
AUTHORIZATION_MERGE_PARENT_1 = 748d562d2bcf74b49fda17e3888b70d462e875e6
AUTHORIZATION_MERGE_PARENT_2 = 1933f6f1b0e8eff674ad33505f7a7974f2e69c1f
AUTHORIZATION_MERGE_VERIFICATION = verified / valid
AUTHORIZATION_POST_MERGE_GOVERNANCE = 33502811775 / SUCCESS
AUTHORIZATION_POST_MERGE_PROVENANCE = 99839825053 / SUCCESS
AUTHORIZATION_POST_MERGE_LEGACY_TESTS = 99839825229 / SUCCESS
AUTHORIZATION_POST_MERGE_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
AUTHORIZATION_POST_MERGE_PROOF_COMMENT = #285 / 5493260544
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical PR #285 permits exactly four implementation/evidence paths and no fifth path:

```text
packages/kodac-runtime/bench/p3-r10/contracts.ts
packages/kodac-runtime/bench/p3-r10/single-strategy-two-case-metric-alignment.ts
packages/kodac-runtime/test/p3-r10-single-strategy-two-case-metric-alignment.test.ts
docs/planning/KODAC_P3_R10_SINGLE_STRATEGY_TWO_CASE_METRIC_ALIGNMENT_EVIDENCE_2026-09-01.md
```

All canonical P3-R1, P3-R2, P3-R6, P3-R7, P3-R8, and P3-R9 predecessor source/tests/evidence remain read-only.

---

## 3. Implemented boundary

```text
UNTRUSTED CLOSED P3-R8 STRATEGY DECLARATION
+ UNTRUSTED CLOSED P3-R9 TWO-MEMBER COMPOSITION DECLARATION
+ UNTRUSTED CLOSED P3-R10 ALIGNMENT DECLARATION
+ CASE A ORIGINAL R9/R6 PREIMAGES
+ CASE B ORIGINAL R9/R6 PREIMAGES
-> snapshot every public input through canonical JSON hardening
-> reconstruct canonical P3-R9 from original strategy/composition/case preimages
-> require exact declared compositionEvidenceIdentity
-> require exact declared strategySubjectIdentity
-> independently reconstruct canonical P3-R6(A)
-> independently reconstruct canonical P3-R6(B)
-> bind each reconstructed R6 measurement back to its exact R9 member
-> require exact policyIdentity/applicationIdentity/caseId/r1ResultIdentity continuity
-> resolve exactly seven canonical dimensions in canonical P3-R6 order
-> require exact metricId equality per dimension across A/B
-> require exact unit equality per dimension across A/B
-> preserve exact canonical A/B observation records without reinterpretation
-> derive one deterministic alignmentEvidenceIdentity over the complete normalized projection
-> return detached deeply frozen evidence
```

Each case-input bundle is closed to exactly:

```text
planRequest
policy
manifest
development
holdout
measurementDeclaration
reportDeclaration
bindingDeclaration
```

Caller-serialized P3-R1/P3-R2/P3-R6/P3-R7/P3-R8/P3-R9/P3-R10 intermediate evidence is not accepted as derivation truth. Unknown fields fail closed.

---

## 4. Result contract and identity semantics

The implementation preserves predecessor identity grammars:

```text
P3-R9 compositionEvidenceIdentity = sha256:<64 lowercase hex>
P3-R8 strategySubjectIdentity = <64 lowercase hex>
P3-R10 alignmentEvidenceIdentity = sha256:<64 lowercase hex>
```

The P3-R10 result contains only:

```text
version
kind
alignmentEvidenceIdentity
alignmentDeclaration
alignmentId
compositionEvidenceIdentity
strategySubjectIdentity
memberAReference
memberBReference
dimensionAlignments
```

Each member reference contains only:

```text
memberId
caseId
r1ResultIdentity
reportEvidenceIdentity
measurementEvidenceIdentity
bindingEvidenceIdentity
policyIdentity
applicationIdentity
```

Each of exactly seven dimension alignments contains only:

```text
dimension
metricId
unit
memberAObservation
memberBObservation
```

The two nested observation records are the trusted reconstructed P3-R6/P2-R2 observations for that aligned metric. Their `measurement_status` and boolean/finite-number/null `value` are preserved without reinterpretation.

R9 member order is inherited exactly. Reversing the R9 member order changes the R9 composition identity and therefore changes the P3-R10 alignment identity.

---

## 5. No reduction or directional semantics

The implementation emits no field representing:

```text
sum
total
mean
median
average
weight
normalizedValue
score
aggregateScore
threshold
rank
winner
preferred
better
worse
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

P3-R10 does not combine A/B values, coerce or convert units, alias metric IDs, infer relations, select a preferred case/strategy, or promote a repository default.

A cross-case `metricId` mismatch or `unit` mismatch fails closed.

---

## 6. Predecessor continuity proof

For each member the implementation independently rebuilds P3-R6 from the same original case preimages and requires:

```text
R6.measurementEvidenceIdentity == R9.member.measurementEvidenceIdentity
R6.policyIdentity == R9.member.policyIdentity
R6.applicationIdentity == R9.member.applicationIdentity
R6.caseId == R9.member.caseId
R6.r1ResultIdentity == R9.member.r1ResultIdentity
R6.measurementDeclaration.taskFamily == context-selection
```

Canonical P3-R6 already validates exactly seven dimensions, duplicate-free dimension bindings, duplicate-free metric bindings, exact manifest metric membership, task-family continuity, and exact unit equality to the manifest definition. P3-R10 then resolves one binding and one trusted observation per canonical dimension and requires the observation case/result/task-family/metric/unit facts to remain bound to that reconstructed R6 member.

---

## 7. Hostile-input and immutability boundary

Every public input is snapshotted before semantic reuse through the inherited canonical JSON boundary. The implementation therefore fails closed on hostile/non-canonical JSON structures before divergent predecessor reuse, including proxies, accessors, symbols, cycles, sparse arrays, and non-finite numbers.

P3-R10 additionally enforces:

- exact alignment-declaration key set;
- exact declaration version/kind literals;
- bounded stable `alignmentId`;
- exact composition and strategy identity syntax;
- exact closed case-input key sets;
- exact reconstructed R6/R9 continuity;
- exact seven-dimension metric-ID equality;
- exact seven-dimension unit equality; and
- detached deeply frozen output.

Caller mutation after invocation cannot mutate returned evidence or alter its identity.

---

## 8. Ambient side-effect boundary

The P3-R10 module is pure local computation. It performs no filesystem read/write, network call, subprocess execution, provider/model/evaluator invocation, secret access, persistence, telemetry, upload, clock access, randomness, environment-based decision, benchmark participant execution, repository crawl, or indexing.

Focused tests configure ambient fetch/clock/randomness/environment and filesystem/subprocess surfaces to throw and require the pure alignment function to continue succeeding.

No dependency, workflow, lockfile, fixture, manifest, corpus, provider/model configuration, persistence surface, product surface, release surface, or ruleset changes in this slice.

---

## 9. Focused qualification coverage

The focused test file proves at minimum:

```text
- canonical valid two-member metric alignment under one exact strategy subject
- exact seven canonical dimensions and canonical order
- same metricId per dimension across A/B
- same unit per dimension across A/B
- preserved observed numeric values
- preserved observed boolean values
- preserved unavailable/null observations
- metricId mismatch accepted by R9 but rejected by R10
- unit mismatch accepted by R9 but rejected by R10
- wrong compositionEvidenceIdentity -> fail closed
- wrong strategySubjectIdentity -> fail closed
- forged serialized predecessor evidence -> fail closed
- unknown alignment-declaration fields -> fail closed
- deterministic repeatability
- benign property-insertion-order invariance
- semantic observation change -> alignmentEvidenceIdentity change
- R9 member-order reversal -> alignmentEvidenceIdentity change
- Proxy/accessor/symbol/cycle/sparse/non-finite hostile input rejection
- missing/malformed/unsupported declaration rejection
- caller mutation isolation
- detached deeply frozen output
- no ambient network/clock/randomness/environment dependency
- no ambient filesystem/subprocess dependency
- no score/aggregate/rank/winner/threshold/promotion/default result fields
```

The implementation itself contains explicit R6-to-R9 measurement/policy/application/case/result continuity assertions on every successful path.

The focused proof uses repository-authored synthetic in-memory inputs only. It does not execute a real benchmark participant or create/mutate benchmark fixture/corpus truth.

Full exact-head runtime qualification remains required. This record does not pre-declare focused tests, full runtime tests, typecheck, patch benchmark, Governance, K2 matrix, or semantic reviewer success.

---

## 10. Exact-head qualification gate

Do not merge the implementation candidate until one frozen exact head proves all of the following:

- canonical `main` remains exact implementation base `3b4d75133ca350ca147802fb53cc4716ab6ee2e0` or the branch is forward-reconciled non-destructively and fully requalified;
- `behind_by=0`;
- changed-file set is exactly the four authorized paths in Section 2;
- exact head/tree/four Git blobs are captured;
- focused P3-R10 tests are terminal success;
- full runtime tests are terminal success;
- typecheck is terminal success;
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

## 11. Preserved non-grants

```text
REAL BENCHMARK TASK / PARTICIPANT EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE CREATION OR MUTATION = NOT_AUTHORIZED
THREE-OR-MORE-CASE / UNBOUNDED COLLECTION COMPOSITION = NOT_AUTHORIZED
MULTI-CASE OBSERVATION / METRIC / SCORE AGGREGATION = NOT_AUTHORIZED
SUM / TOTAL / MEAN / MEDIAN / AVERAGE = NOT_AUTHORIZED
NORMALIZATION / WEIGHTING / THRESHOLDING = NOT_AUTHORIZED
METRIC-ID ALIASING / UNIT CONVERSION / COERCION = NOT_AUTHORIZED
PAIRWISE BETTER/WORSE RELATION DERIVATION = NOT_AUTHORIZED
MIXED-FAMILY AGGREGATION = NOT_AUTHORIZED
MULTI-STRATEGY COMPARISON = NOT_AUTHORIZED
LEADERBOARD / GLOBAL RANKING = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED GOLD TRUTH = NOT_AUTHORIZED
STATISTICAL SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
HOLDOUT SUFFICIENCY / UNBIASEDNESS / CONTAMINATION-FREE CLAIM = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL INVOCATION = NOT_AUTHORIZED
NETWORK / SECRET / SUBPROCESS / SANDBOX EXPANSION = NOT_AUTHORIZED
REPOSITORY CRAWLING / NEW FILESYSTEM ACQUISITION = NOT_AUTHORIZED
CROSS-REPOSITORY DATA ACCESS OR AGGREGATION = NOT_AUTHORIZED
NEW DEPENDENCIES / TOKENIZERS = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKING = NOT_AUTHORIZED
P2/P3 PREDECESSOR MUTATION = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
PUBLIC QUALITY / SUPERIORITY / RELEASE / PACKAGE / BRAND CLAIM = NOT_AUTHORIZED
P3 OVERALL CLOSURE = NOT_AUTHORIZED
P3-R11+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Only after one exact implementation candidate satisfies Section 10, merges normally, and completes mandatory post-merge proof may bounded P3-R10 itself be declared `CLOSED_CANONICAL`. P3 overall remains open.