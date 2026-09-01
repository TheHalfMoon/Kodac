# Kodac P3-R9 Single-Strategy Two-Case Report Composition Evidence — 2026-09-01

## 1. Evidence status

```text
DOCUMENT TYPE = IMPLEMENTATION / QUALIFICATION EVIDENCE CANDIDATE
P3-R9 SINGLE-STRATEGY TWO-CASE REPORT COMPOSITION = CANDIDATE / NOT YET CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK / PARTICIPANT EXECUTION = NOT_AUTHORIZED
THREE-OR-MORE-CASE / UNBOUNDED COLLECTION COMPOSITION = NOT_AUTHORIZED
MULTI-CASE OBSERVATION / METRIC / SCORE AGGREGATION = NOT_AUTHORIZED
MULTI-STRATEGY COMPARISON / RANKING / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
P3-R10+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

This evidence candidate accompanies only the bounded P3-R9 pure deterministic composition implementation authorized by canonical PR #282. It proves identity-preserving composition of exactly two independently reconstructed P3-R7 single-case report records under one exact P3-R8 strategy subject. It does not combine metric values, derive scores, compare cases or strategies, rank, promote, execute a benchmark participant, invoke a provider/model/evaluator, persist state, or create product/release authority.

---

## 2. Canonical authority

```text
AUTHORIZATION_PR = #282
AUTHORIZATION_QUALIFIED_HEAD = 9013fcf596453bb49afb7727af138de4fd70381d
AUTHORIZATION_BLOB = e3b3912b17fb9585b7fc075f11afd6055c4b7224
AUTHORIZATION_MERGE / IMPLEMENTATION_BASE = ba9553de3384e683a54469ac7aa05545d20c0c1b
AUTHORIZATION_MERGE_TREE = 5721a366d0d60aacfe7d3e81279dcd54afaf6391
AUTHORIZATION_MERGE_PARENT_1 = ff7a474f73b9efacab4eceafd210c67488987b64
AUTHORIZATION_MERGE_PARENT_2 = 9013fcf596453bb49afb7727af138de4fd70381d
AUTHORIZATION_MERGE_VERIFICATION = verified / valid
AUTHORIZATION_POST_MERGE_GOVERNANCE = SUCCESS
AUTHORIZATION_POST_MERGE_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
AUTHORIZATION_POST_MERGE_PROOF_COMMENT = #282 / 5491794590
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical PR #282 permits exactly four implementation/evidence paths and no fifth path:

```text
packages/kodac-runtime/bench/p3-r9/contracts.ts
packages/kodac-runtime/bench/p3-r9/single-strategy-two-case-report-composition.ts
packages/kodac-runtime/test/p3-r9-single-strategy-two-case-report-composition.test.ts
docs/planning/KODAC_P3_R9_SINGLE_STRATEGY_TWO_CASE_REPORT_COMPOSITION_EVIDENCE_2026-09-01.md
```

All P3-R1, P3-R2, P3-R6, P3-R7, and P3-R8 predecessor source/tests/evidence remain read-only.

---

## 3. Implemented boundary

```text
UNTRUSTED CLOSED P3-R8 STRATEGY DECLARATION
+ UNTRUSTED CLOSED P3-R9 TWO-MEMBER COMPOSITION DECLARATION
+ CASE A ORIGINAL R7/R8 PREIMAGES
+ CASE B ORIGINAL R7/R8 PREIMAGES
-> snapshot every public input through canonical JSON hardening
-> rebuild one canonical P3-R8 strategy subject
-> require exact declared strategySubjectIdentity
-> validate exactly two ordered distinct member declarations
-> independently rebuild canonical P3-R7(A)
-> independently rebuild canonical P3-R8 binding(A)
-> require R7(A).policyIdentity/applicationIdentity == R8(A).policyIdentity/applicationIdentity
-> independently rebuild canonical P3-R7(B)
-> independently rebuild canonical P3-R8 binding(B)
-> require R7(B).policyIdentity/applicationIdentity == R8(B).policyIdentity/applicationIdentity
-> require distinct caseId / r1ResultIdentity / reportEvidenceIdentity / bindingEvidenceIdentity
-> require both bindings carry the exact rebuilt strategy subject and declaration
-> preserve caller-declared member order
-> derive one deterministic compositionEvidenceIdentity over the complete normalized result projection
-> return detached deeply frozen evidence
```

No caller-serialized P3-R7 report evidence, P3-R8 subject, or P3-R8 case-binding evidence is accepted as derivation truth. The closed case-input bundle accepts only original predecessor inputs:

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

Unknown fields fail closed.

---

## 4. Identity semantics

The implementation deliberately preserves the predecessor identity formats rather than conflating them:

```text
P2-R1 / P3-R7 r1ResultIdentity = sha256:<64 lowercase hex>
P3-R8 strategySubjectIdentity = <64 lowercase hex>
P3-R9 compositionEvidenceIdentity = sha256:<64 lowercase hex>
```

Each result member retains only exact predecessor references and records:

```text
memberId
caseId
r1ResultIdentity
reportEvidenceIdentity
measurementEvidenceIdentity
p2R2ReportIdentity
bindingEvidenceIdentity
policyIdentity
applicationIdentity
reportEvidence
caseBindingEvidence
```

The cross-predecessor proof for each member is exactly:

```text
R7.policyIdentity == R8.policyIdentity
R7.applicationIdentity == R8.applicationIdentity
```

P3-R9 does not pretend that P3-R8 carries P3-R7 `caseId` or `r1ResultIdentity` fields.

---

## 5. No aggregation semantics

The P3-R9 result has no top-level or member-level field representing a score, total, average, mean, median, weight, threshold, rank, winner, preferred value, pass/fail decision, accept/reject decision, promotion, or default.

Nested P3-R7/P2-R2 evidence is retained unchanged as predecessor evidence. P3-R9 never merges member metric arrays, adds numeric observations across members, averages values, assigns weights, evaluates thresholds, compares cases, compares strategies, or emits a preferred member/strategy.

Exactly two cases are supported. Three-or-more-case or arbitrary N-case collection remains unauthorized and unimplemented.

---

## 6. Order semantics

`memberA` and `memberB` are caller-declared composition positions. The implementation does not sort cases or member IDs before identity derivation.

Therefore:

```text
A,B -> one compositionEvidenceIdentity
B,A -> a different compositionEvidenceIdentity
```

when the two member records are reversed with their corresponding case inputs. This makes composition order explicit rather than silently canonicalizing away caller-declared structure.

---

## 7. Hostile-input and immutability boundary

All four public function inputs are canonically snapshotted before semantic reuse. The inherited P2-R1 canonicalization boundary rejects non-JSON and hostile structures including proxies, accessors, symbols, sparse arrays, cycles, and non-finite values.

P3-R9 additionally enforces:

- exact declaration and case-input key sets;
- exact declaration version/kind literals;
- bounded canonical stable IDs for composition/member IDs;
- canonical non-empty case IDs;
- exact R1 result identity syntax;
- exact strategy-subject identity syntax;
- two distinct member IDs, case IDs, and R1 result identities;
- exact declared-member binding to reconstructed R7 case/result identities;
- exact R7/R8 policy/application identity equality;
- exact rebuilt strategy-subject equality across both R8 bindings;
- distinct reconstructed R7 report identities and R8 binding identities; and
- detached deeply frozen output.

Attempts to inject caller-serialized `reportEvidence` or `caseBindingEvidence` into a case bundle fail at the closed input schema before predecessor reconstruction.

---

## 8. Ambient side-effect boundary

The P3-R9 module is pure local computation. It performs no filesystem reads/writes, network calls, subprocess execution, provider/model/evaluator calls, secret access, persistence, telemetry, upload, clock access, randomness, environment-based decision making, or benchmark participant execution.

Focused tests execute the composition while ambient `fetch`, clock, randomness, and environment reads are configured to throw if used.

No dependency, workflow, fixture, manifest, corpus, provider/model configuration, persistence surface, product surface, release surface, or ruleset is changed by this slice.

---

## 9. Focused qualification coverage

The focused test file proves at minimum:

```text
- two independently reconstructed valid P3-R7 cases under one exact P3-R8 strategy subject
- same strategySubjectIdentity across the two members
- distinct caseId / r1ResultIdentity / reportEvidenceIdentity / bindingEvidenceIdentity
- exact per-member R7/R8 policyIdentity and applicationIdentity equality
- retained observed and unavailable predecessor metric states without P3-R9 reduction
- deterministic repeatability
- benign object-key-order invariance
- second-case change -> compositionEvidenceIdentity change
- strategy semantic change -> strategySubjectIdentity and compositionEvidenceIdentity change
- member-order reversal -> compositionEvidenceIdentity change
- subject mismatch -> fail closed
- duplicate case or R1 membership -> fail closed
- declared case drift -> fail closed
- forged serialized R7/R8 intermediate fields -> fail closed
- Proxy/accessor/cyclic hostile inputs -> fail closed before divergent predecessor reuse
- detached deeply frozen result and caller mutation isolation
- no ambient fetch/clock/randomness/environment dependency
```

Full exact-head runtime qualification remains required. This record does not pre-declare focused tests, full runtime tests, typecheck, patch benchmark, Governance, K2 matrix, or semantic reviewer success.

---

## 10. Exact-head qualification gate

Do not merge the implementation candidate until one frozen exact head proves all of the following:

- canonical `main` remains the exact implementation base or the branch is forward-reconciled non-destructively and fully requalified;
- `behind_by=0`;
- changed-file set is exactly the four authorized paths in Section 2;
- exact head/tree/four Git blobs are captured;
- focused P3-R9 tests are terminal success;
- full runtime tests are terminal success;
- typecheck is terminal success;
- patch benchmark hook is terminal success;
- Governance `provenance` and `legacy-tests` are terminal success on the exact head;
- K2 classifier, Ubuntu/macOS/Windows runtime matrix, and stable `k2-runtime-gate` are terminal success on the exact head;
- at least two distinct independently operated external substantive semantic reviewer/model-system channels are terminal-clean on the exact head/current PR metadata;
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
THREE-OR-MORE-CASE / UNBOUNDED COLLECTION COMPOSITION = NOT_AUTHORIZED
MULTI-CASE OBSERVATION / METRIC / SCORE AGGREGATION = NOT_AUTHORIZED
MIXED-FAMILY AGGREGATION = NOT_AUTHORIZED
MULTI-STRATEGY COMPARISON = NOT_AUTHORIZED
LEADERBOARD / GLOBAL RANKING = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE CREATION OR MUTATION = NOT_AUTHORIZED
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
P3-R10+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Only after one exact implementation candidate satisfies Section 10, merges normally, and completes mandatory post-merge proof may bounded P3-R9 itself be declared `CLOSED_CANONICAL`. P3 overall remains open.
