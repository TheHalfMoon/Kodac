# Kodac P3-R3 Context Policy Pairwise Metric Evidence Authorization — 2026-08-29

## Status

```text
DOCUMENT TYPE = FOUNDER-AUTHORIZED IMPLEMENTATION GATE CANDIDATE
P3-R1 DETERMINISTIC CONTEXT SELECTION PLAN FOUNDATION = CLOSED_CANONICAL
P3-R2 DECLARED CONTEXT SELECTION POLICY APPLICATION = CLOSED_CANONICAL
P3-R2 ROADMAP / STATUS RECONCILIATION = CLOSED_CANONICAL
P3-R3 IMPLEMENTATION = AUTHORIZED ONLY AFTER THIS EXACT RECORD IS CANONICAL AND POST-MERGE PROVEN
P3-R4+ = NOT_AUTHORIZED
P4-P8 = NOT_AUTHORIZED
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
PUBLIC QUALITY / WINNER / SUPERIORITY CLAIMS = NOT_AUTHORIZED
WAIVER = NO
```

This record is deny-by-default. While it is only a branch or pull-request candidate it creates no effective P3-R3 implementation authority.

P3-R3 in this record is a **pairwise metric-evidence binding mechanism**. It is not a benchmark runner, policy search system, ranking system, promotion gate, default selector, or quality claim.

---

## 1. Exact canonical baseline

Authorization-candidate creation is based on the exact protected canonical state:

```text
CANONICAL_MAIN = ecee96c1a0d4bf73c5d41b369edfa9950ae1ea0c
CANONICAL_TREE = 56984fb923c76d43dacd68cc814b54cf16d4f9a6
P3_R2_AUTHORIZATION_PR = #255
P3_R2_AUTHORIZATION_MERGE = 69f74cef1f9cc36ed8db123cc30b65e881aa147e
P3_R2_IMPLEMENTATION_PR = #256
P3_R2_QUALIFIED_HEAD = 3d43248546d34f3c46c6fb38d1a53cb4dea1006f
P3_R2_IMPLEMENTATION_MERGE = 458f62e85f4af2e13bfd78f5a6c3582d9330c911
P3_R2_RECONCILIATION_PR = #257
P3_R2_RECONCILIATION_QUALIFIED_HEAD = 17a045100e962530bb5c8a75af9beaccb7e3c915
P3_R2_RECONCILIATION_MERGE = ecee96c1a0d4bf73c5d41b369edfa9950ae1ea0c
P3_R2_RECONCILIATION_TREE = 56984fb923c76d43dacd68cc814b54cf16d4f9a6
P3_R2_RECONCILIATION_POST_MERGE_GOVERNANCE = 33250945257 / SUCCESS
P3_R2_RECONCILIATION_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
RULESET = 20707483 / Kodac canonical main protection v1 / active
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
WAIVER = NO
```

The P3-R2 reconciliation merge is GitHub-signed and valid. Its ordered parents are the prior canonical main followed by exact qualified PR #257 head; its merge tree equals the qualified candidate tree; and the five reconciled current-view blobs match the final qualified candidate.

Current canonical dependencies used read-only by the future R3 implementation include:

```text
P3-R2 contracts
  packages/kodac-runtime/src/context-selection-policy/contracts.ts
  blob = 1b5bf19868214fd202ede209d5976dfa9d17677d
P3-R2 implementation
  packages/kodac-runtime/src/context-selection-policy/context-selection-policy.ts
  blob = 9bb0a3ba619f10fedaedba6f9559bdc6dffbeaa7
P2-R1 canonicalization / SHA-256 primitives
  packages/kodac-runtime/bench/p2-r1/contract.ts
  blob = 573aaf45f285902c9acda19759d912f16e9ccd8e
P2-R4 pairwise comparison contract
  packages/kodac-runtime/bench/p2-r4/comparison.ts
  blob = 78c1417e51f1c36989ec7ec700a3424df3b58944
P2-R5 directional relation derivation
  packages/kodac-runtime/bench/p2-r5/relation.ts
  blob = e55e2ce138ab88132f0fddb79faa3ecac8db4e14
```

Governing sources are live GitHub truth, root `AGENTS.md`, current roadmap/status/version views, `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`, ADR-0010, the provider-neutral semantic-review quorum amendment, canonical P2 R1-R5 contracts/evidence, and canonical P3-R1/P3-R2 authorization/evidence/contracts.

If protected `main`, repository governance, or a more-specific canonical authority conflicts with this candidate before merge, this candidate is stale and must be reconciled forward. No rebase, force-push, destructive history rewriting, stale evidence reuse, bypass, or silent waiver is authorized.

---

## 2. Accepted review finding and forward repair

PR #258 initial head `170d5576d3ff9b9158743f5a06c411864e8e9cde` received a valid material CodeRabbit finding in issue comment `5462306569`.

The initial candidate incorrectly described canonical P3-R2 `policyIdentity` / `applicationIdentity` values as `sha256:<hex>` identities. Canonical P3-R2 actually derives those identities with `digest("hex")`, so they are bare lowercase 64-character hexadecimal strings.

This revision accepts that finding without waiver and closes the grammar explicitly:

```text
P3-R2 policyIdentity grammar      = ^[0-9a-f]{64}$
P3-R2 applicationIdentity grammar = ^[0-9a-f]{64}$
P2 lowercase SHA-256 identity grammar = ^sha256:[0-9a-f]{64}$
sha256Canonical(...) output grammar    = ^sha256:[0-9a-f]{64}$
```

Therefore:

- trusted P3-R2 `policyIdentity` and `applicationIdentity` values remain bare 64-hex exactly as canonical P3-R2 emits them;
- the derived P3-R3 subject ID embeds the bare P3-R2 application identity without adding a prefix to that embedded identity;
- `sha256Canonical(...)` remains the canonical P2/P3 helper that returns `sha256:<64 lowercase hex>`;
- P2 subject `system_version_commit_identity`, P2 comparison/relation identities, and other inherited P2 SHA-256 identities retain the `sha256:` prefix.

All CI/review evidence from head `170d5576d3ff9b9158743f5a06c411864e8e9cde` is stale after this forward repair and MUST NOT be reused for final qualification.

```text
VALID_FINDING = ACCEPTED
REPAIR = FORWARD_ONLY
STALE_PRIOR_HEAD_CI_REVIEW = YES
WAIVER = NO
```

---

## 3. Exact authorization-candidate path

This authorization candidate may change exactly one path:

```text
docs/planning/KODAC_P3_R3_CONTEXT_POLICY_PAIRWISE_METRIC_EVIDENCE_AUTHORIZATION_2026-08-29.md
```

No source, test, fixture, benchmark corpus, workflow, dependency, lockfile, roadmap, status, provider/model, persistence, telemetry, product, release, ruleset, or historical canonical record is in this candidate allowlist.

Any byte change after qualification invalidates all prior exact-head CI and semantic-review evidence and requires qualification from scratch.

---

## 4. Objective

Authorize, only after this exact record becomes canonical and post-merge proven, one pure deterministic P3-R3 mechanism that:

1. reconstructs one exact P3-R1 source plan twice through the already-canonical P3-R2 application boundary using two explicit caller-declared P3-R2 policies;
2. obtains two trusted P3-R2 application identities without accepting caller-claimed serialized P3-R2 application results;
3. accepts one complete caller-materialized P2-R4 comparison only as untrusted input;
4. revalidates and deterministically derives its P2-R5 directional metric relation set through canonical `deriveP2R5Relations(...)`;
5. binds the P2 comparison subjects to the two exact trusted P3-R2 policy applications;
6. requires one bounded `context-selection` task-family metric set covering the seven context-evidence dimensions named by the durable master plan;
7. preserves every per-metric P2-R5 relation without aggregation; and
8. emits one immutable deterministic metric-evidence record that reports only whether all seven required metric slots are comparable or whether one or more remain `INSUFFICIENT_EVIDENCE`.

The R3 state is structural metric-evidence status only. It is not a quality verdict and does not authorize any policy decision.

---

## 5. Closed trust boundary

P3-R3 MUST NOT accept any caller-claimed serialized P3-R2 application result or caller-claimed serialized P2-R5 relation set as derivation truth.

The only authorized derivation boundary is:

```text
UNTRUSTED COMPLETE P3-R1 ContextSelectionPlanRequest
+ UNTRUSTED LEFT P3-R2 DECLARED POLICY
+ UNTRUSTED RIGHT P3-R2 DECLARED POLICY
+ UNTRUSTED COMPLETE P2-R4 COMPARISON
+ UNTRUSTED EXACT-KEY P3-R3 EVIDENCE DECLARATION
-> canonical applyDeclaredContextSelectionPolicy(planRequest, leftPolicy)
-> TRUSTED LEFT P3-R2 APPLICATION
-> canonical applyDeclaredContextSelectionPolicy(planRequest, rightPolicy)
-> TRUSTED RIGHT P3-R2 APPLICATION
-> canonical deriveP2R5Relations(p2R4Comparison)
-> TRUSTED P2-R5 RELATION SET
-> STRICT CROSS-BINDING / DIMENSION COVERAGE VALIDATION
-> CLOSED IMMUTABLE P3-R3 METRIC-EVIDENCE RECORD
```

The future implementation is explicitly authorized to import and invoke, read-only:

```text
packages/kodac-runtime/src/context-selection-policy/context-selection-policy.ts
  applyDeclaredContextSelectionPolicy(...)

packages/kodac-runtime/bench/p2-r5/relation.ts
  deriveP2R5Relations(...)

packages/kodac-runtime/bench/p2-r1/contract.ts
  canonicalize(...)
  sha256Canonical(...)
```

It may import canonical P3-R2/P2-R5 types and constants read-only. It may not modify P3-R1, P3-R2, or P2 R1-R5 bytes.

No P3-R3 semantic decision may occur before both P3-R2 application calls and the P2-R5 derivation succeed.

---

## 6. Exact future public function boundary

The public R3 function must be semantically equivalent to:

```text
buildContextPolicyPairwiseMetricEvidence(
  planRequestValue: unknown,
  leftPolicyValue: unknown,
  rightPolicyValue: unknown,
  p2R4ComparisonValue: unknown,
  evidenceDeclarationValue: unknown,
) -> ContextPolicyPairwiseMetricEvidence
```

Mandatory procedure order:

1. invoke canonical P3-R2 `applyDeclaredContextSelectionPolicy(planRequestValue, leftPolicyValue)`;
2. invoke canonical P3-R2 `applyDeclaredContextSelectionPolicy(planRequestValue, rightPolicyValue)`;
3. validate trusted P3-R2 `policyIdentity` / `applicationIdentity` values using the canonical bare-lowercase-64-hex grammar;
4. require both trusted applications to bind the same `planIdentity`, `requestIdentity`, `candidateSetIdentity`, `repositoryIdentity`, `snapshotIdentity`, `contentIdentity`, and `taskIdentity`;
5. require distinct `policyIdentity` values;
6. require distinct `applicationIdentity` values;
7. invoke canonical P2-R5 `deriveP2R5Relations(p2R4ComparisonValue)`;
8. retain only the returned trusted P2-R5 relation set as pairwise metric-relation truth;
9. validate the exact-key P3-R3 evidence declaration;
10. derive the expected left and right benchmark subject bindings from the trusted P3-R2 applications and the canonical P3-R2 implementation merge identity;
11. require exact left/right P2 subject binding to those derived identities;
12. require declaration benchmark/protocol/evaluation-context/comparison-policy bindings to equal the trusted P2-R5 relation-set fields;
13. require exactly one P2-R5 task family named `context-selection`;
14. require exactly seven distinct metrics in that family and one exact mapping for each required context-evidence dimension;
15. preserve all seven trusted P2-R5 metric relation records exactly, in canonical P2-R5 metric order;
16. derive the closed metric-evidence state using only P2-R5 `status` values;
17. derive the exact evidence identity from the closed semantic projection excluding only the identity field itself; and
18. deep-freeze the entire output.

Failure of any step fails closed. No fallback, default mapping, inferred benchmark, inferred policy, automatic repair, or partial binding is authorized.

---

## 7. P3-R2 application-pair invariants and identity grammars

The two applications MUST come from the same complete `planRequestValue` and therefore MUST share exactly:

```text
planIdentity
requestIdentity
candidateSetIdentity
repositoryIdentity
snapshotIdentity
contentIdentity
taskIdentity
```

The implementation must assert those equalities after the two canonical P3-R2 calls rather than assuming them.

The trusted P3-R2 identities are exact canonical bare digests:

```text
policyIdentity      matches ^[0-9a-f]{64}$
applicationIdentity matches ^[0-9a-f]{64}$
```

The policies MUST have distinct `policyIdentity` values and the resulting applications MUST have distinct `applicationIdentity` values.

No requirement that one policy select more, less, earlier, later, or different candidates is authorized. Exact equality of one or more benchmark metric values remains valid evidence and is represented only through canonical P2-R5 `EQUAL_RAW_VALUE` relation semantics.

No P3-R3 helper may inspect candidate text, acquire repository files, execute K3, invoke a model/provider, or invent a relevance/quality score.

---

## 8. Closed P2 evidence boundary

The future implementation accepts exactly one complete P2-R4 comparison as untrusted input and MUST pass it to canonical `deriveP2R5Relations(...)`.

R3 MUST NOT:

- trust caller-provided `comparison_identity` without P2-R5 revalidation;
- trust caller-provided raw delta, metric status, direction, summary, subject, or relation claims without the canonical P2-R5 derivation path;
- accept a caller-provided P2-R5 relation set;
- duplicate or weaken P2-R4/P2-R5 validation when the canonical P2-R5 function can perform it;
- modify P2 R1-R5 contracts.

The trusted returned relation set must use exact canonical P2-R5 schema:

```text
p2-r5-directional-metric-relation-set/v1
```

Inherited P2 SHA-256 identities retain canonical grammar:

```text
^sha256:[0-9a-f]{64}$
```

R3 may preserve and cross-bind P2-R5 fields, but may not reinterpret `LEFT_FAVORED_BY_DIRECTION`, `RIGHT_FAVORED_BY_DIRECTION`, `EQUAL_RAW_VALUE`, or `INSUFFICIENT_EVIDENCE` as a global quality verdict.

---

## 9. Exact P3-R3 evidence declaration

The declaration is one exact-key plain JSON-compatible object containing exactly:

```text
version
kind
qualificationId
benchmarkId
benchmarkProtocolVersion
sharedEvaluationContextIdentity
comparisonPolicyIdentity
taskFamily
dimensionMetricBindings
```

Exact constants:

```text
version = p3-r3-context-policy-pairwise-metric-evidence-declaration-v1
kind = build_context_policy_pairwise_metric_evidence
taskFamily = context-selection
```

`qualificationId` is mandatory and must:

```text
be non-empty
contain no NUL
be <= 512 UTF-8 bytes
match ^[A-Za-z0-9][A-Za-z0-9._:/-]*$
```

The following declaration fields MUST equal the trusted P2-R5 relation set exactly:

```text
benchmarkId                     == relationSet.benchmark_id
benchmarkProtocolVersion        == relationSet.benchmark_protocol_version
sharedEvaluationContextIdentity == relationSet.shared_evaluation_context_identity
comparisonPolicyIdentity        == relationSet.comparison_policy_identity
```

The two identity fields above must match canonical P2 lowercase `sha256:` grammar.

---

## 10. Required context-evidence dimensions

`dimensionMetricBindings` is mandatory, dense, exact length seven, and must contain exactly one record for each dimension in this exact semantic order:

```text
1. recall-at-k
2. precision-at-k
3. file-f1
4. token-budgeted-evidence-yield
5. no-gold-abstention
6. explored-vs-utilized-context
7. context-dilution
```

Each binding record has exactly:

```text
dimension
metricId
```

No third field is authorized.

Each `metricId` must satisfy the same bounded stable-string grammar as `qualificationId` and all seven metric IDs must be distinct.

The trusted P2-R5 relation set MUST contain exactly one task-family record, exactly:

```text
task_family = context-selection
```

That task family MUST contain exactly seven metrics. Its seven `metric_id` values MUST equal the seven declared `metricId` values as a set. No unmapped or duplicate metric is authorized in this R3 slice.

R3 does not assign or alter metric direction. Each metric's `direction` remains exactly the direction already validated by P2-R4 and preserved by P2-R5. The dimension mapping is evidence labeling only; it is not a repository-owned weighting or preference policy.

This contract defines dimension coverage only. It does not define how any benchmark observation is generated, how gold labels are produced, how K is chosen, how a metric formula is implemented, or what value would be acceptable for promotion. Those remain outside this authorization.

---

## 11. Exact benchmark-subject binding

P3-R3 must derive subject identity from trusted P3-R2 application truth rather than accepting a caller-declared subject mapping.

For each side, derive the canonical subject ID exactly as:

```text
context-policy-application:<applicationIdentity>
```

where `<applicationIdentity>` is the trusted canonical P3-R2 bare lowercase 64-character hexadecimal application identity matching:

```text
^[0-9a-f]{64}$
```

No `sha256:` prefix is added inside this subject ID.

For each side, derive `system_version_commit_identity` as:

```text
sha256Canonical({
  version: "p3-r3-context-policy-benchmark-subject-v1",
  p3R2ImplementationMerge: "458f62e85f4af2e13bfd78f5a6c3582d9330c911",
  policyIdentity: <trusted bare-64-hex policyIdentity>,
  applicationIdentity: <trusted bare-64-hex applicationIdentity>
})
```

The result of `sha256Canonical(...)` MUST match:

```text
^sha256:[0-9a-f]{64}$
```

The trusted P2-R5 left and right subject descriptors MUST satisfy exactly:

```text
left_subject.subject_id == derived left subject ID
right_subject.subject_id == derived right subject ID
left_subject.system_version_commit_identity == derived left subject identity
right_subject.system_version_commit_identity == derived right subject identity
```

The P2 subject `raw_artifact_log_set_identity` remains canonical P2 evidence and is preserved unchanged. R3 does not fabricate, fetch, persist, or validate raw artifact bytes in this slice.

Left/right side order is semantic and must not be reordered based on metric values or relations.

---

## 12. Closed metric-evidence state

P3-R3 output `metricEvidenceState` is exactly one of:

```text
all-required-metrics-comparable
one-or-more-required-metrics-insufficient
```

Derivation is mandatory:

```text
if every one of the seven trusted P2-R5 metric records has status == COMPARABLE:
  metricEvidenceState = all-required-metrics-comparable
else:
  require at least one status == INSUFFICIENT_EVIDENCE
  metricEvidenceState = one-or-more-required-metrics-insufficient
```

No relation label participates in this state derivation.

R3 MUST NOT count favored metrics, compute a majority, aggregate deltas, normalize values, weight dimensions, rank subjects, calculate a score, infer a winner, or convert `all-required-metrics-comparable` into policy-acceptance authority.

`all-required-metrics-comparable` means only that all seven required metric slots contain comparable P2 evidence. It does not mean sufficient chronology/contamination evidence, statistically meaningful difference, acceptable quality, policy promotion, production readiness, or superiority.

---

## 13. Explicit chronology / contamination limitation

Canonical P2-R1 carries chronology and contamination facts, but P2-R4/P2-R5 do not retain those fields in their pairwise relation output.

P3-R3 MUST NOT reconstruct, infer, or fabricate chronology or contamination status from the R4/R5 evidence available to this slice.

Therefore this R3 metric-evidence record is **not** a complete policy-promotion qualification record. A later separately authorized decision/qualification slice would need to bind any required chronology, contamination, holdout, significance, acceptance, and promotion semantics explicitly.

This limitation is intentional and prevents R3 from overstating the evidence that its canonical inputs actually retain.

---

## 14. Closed P3-R3 output contract

The output is one exact-key deeply immutable plain object containing exactly:

```text
version
kind
evidenceIdentity
qualificationId
p3R2ImplementationMerge
planIdentity
requestIdentity
candidateSetIdentity
repositoryIdentity
snapshotIdentity
contentIdentity
taskIdentity
leftPolicyId
leftPolicyIdentity
leftApplicationIdentity
leftApplicationState
rightPolicyId
rightPolicyIdentity
rightApplicationIdentity
rightApplicationState
benchmarkId
benchmarkProtocolVersion
r4ComparisonIdentity
r5RelationSetIdentity
sharedEvaluationContextIdentity
comparisonPolicyIdentity
leftSubject
rightSubject
taskFamily
dimensionMetricBindings
metricRelations
metricEvidenceState
```

Exact constants:

```text
version = p3-r3-context-policy-pairwise-metric-evidence-v1
kind = context_policy_pairwise_metric_evidence
p3R2ImplementationMerge = 458f62e85f4af2e13bfd78f5a6c3582d9330c911
taskFamily = context-selection
```

`leftPolicyId`, `leftPolicyIdentity`, `leftApplicationIdentity`, and `leftApplicationState` are copied exactly from the trusted left P3-R2 application. The two identity values retain canonical bare-64-hex P3-R2 grammar.

`rightPolicyId`, `rightPolicyIdentity`, `rightApplicationIdentity`, and `rightApplicationState` are copied exactly from the trusted right P3-R2 application. The two identity values retain canonical bare-64-hex P3-R2 grammar.

Shared plan/request/repository/snapshot/content/task identities are copied only after exact equality across both trusted P3-R2 applications is proven.

P2 fields are copied only from the trusted canonical P2-R5 relation set:

```text
benchmarkId
benchmarkProtocolVersion
r4ComparisonIdentity
r5RelationSetIdentity
sharedEvaluationContextIdentity
comparisonPolicyIdentity
leftSubject
rightSubject
```

All inherited P2 SHA-256 identity fields retain canonical `sha256:<64 lowercase hex>` grammar.

`dimensionMetricBindings` is the normalized exact declaration array.

`metricRelations` is exactly the trusted P2-R5 `context-selection` metric array, preserving canonical P2-R5 order and every canonical metric evidence field without extension or rewriting.

No arbitrary metadata bag, extension object, score field, verdict field, decision field, recommendation field, promotion field, or implementation-defined semantic key is authorized.

---

## 15. Closed identity semantics

`evidenceIdentity` is the output of canonical P2-R1 `sha256Canonical(...)` over deterministic canonical sorted-key JSON of the exact normalized output semantic projection excluding only `evidenceIdentity` itself.

Therefore `evidenceIdentity` grammar is exactly:

```text
^sha256:[0-9a-f]{64}$
```

Identity semantics must preserve semantic array order for:

- `dimensionMetricBindings` in the exact seven-dimension order above; and
- `metricRelations` in canonical P2-R5 metric order.

Object property insertion order must not change output identity.

No timestamp, locale, random value, hostname, process environment, workspace path, network state, provider state, benchmark execution time, or external mutable state may contribute to the identity.

---

## 16. Hostile-input and canonicalization requirements

P3-R3 must remain fail-closed.

The complete P3-R1 request and both P3-R2 policy values are validated through canonical P3-R2 application calls. The complete P2-R4 comparison is validated through canonical P2-R5 derivation. R3 must not weaken or bypass those boundaries.

The R3 declaration and any R3-owned structure must reject at minimum:

- Proxy values;
- getters/setters/accessor properties;
- symbol keys;
- non-enumerable semantic fields;
- non-plain object prototypes where plain JSON objects are required;
- sparse or extended arrays;
- cycles;
- `undefined`, `bigint`, functions, symbols, and non-finite numbers;
- unknown or missing fields;
- unsupported versions/kinds;
- malformed/bounded-string violations;
- malformed P3-R2 bare-64-hex identities if an impossible trusted predecessor value is encountered;
- malformed inherited P2 lowercase `sha256:` identities;
- wrong task family;
- wrong dimension order;
- missing, duplicate, or unknown dimensions;
- duplicate metric IDs;
- a P2 task-family metric set that differs from the seven declared metric IDs;
- benchmark/protocol/context/policy identity mismatch;
- P2 subject binding mismatch;
- equal left/right policy identities;
- equal left/right application identities;
- cross-plan/repository/snapshot/content/task application mismatch;
- impossible R3 state/output invariant;
- caller mutation after return affecting output state.

`__proto__` may be ordinary canonical JSON data only where admitted by the inherited canonicalization boundary and must never cause prototype mutation.

Returned output and every nested object/array must be detached from caller-owned mutable objects and deeply frozen.

---

## 17. Explicitly forbidden semantics

P3-R3 may not materialize, infer, claim, or authorize any of the following:

```text
GLOBAL WINNER / LOSER
SYSTEM OR POLICY BETTER / WORSE / SUPERIOR / INFERIOR
REPOSITORY-OWNED DEFAULT POLICY
STRATEGY PROMOTION / ACCEPT / REJECT
N-WAY COMPARISON
RANKING / LEADERBOARD
TOP-K POLICY SELECTION
FAVORED-METRIC COUNT / MAJORITY VOTE
WEIGHTED / BLENDED / UNIVERSAL SCORE
CROSS-METRIC NORMALIZATION
CROSS-TASK NORMALIZATION
PERCENTAGE CHANGE
NORMALIZED UTILITY
PARETO DOMINANCE
THRESHOLD / TARGET BAND
TOLERANCE / EPSILON BAND
STATISTICAL SIGNIFICANCE
CONFIDENCE INTERVAL
BOOTSTRAP
HYPOTHESIS TEST
P-VALUE
EFFECT-SIZE ACCEPTANCE POLICY
CHRONOLOGY INFERENCE
CONTAMINATION INFERENCE
HOLDOUT SUFFICIENCY CLAIM
BENCHMARK CORPUS COMPLETION
GENERAL / PUBLIC KODACBENCH COMPLETION
DONOR REPLACEMENT DECISION
ROUTING / FALLBACK / RETRY DECISION
PRODUCT INTEGRATION DECISION
RELEASE DECISION
PUBLIC QUALITY / SUPERIORITY CLAIM
```

Per-metric `LEFT_FAVORED_BY_DIRECTION` / `RIGHT_FAVORED_BY_DIRECTION` values are preserved P2-R5 evidence only and may not be relabeled as any forbidden semantic above.

---

## 18. External authority non-grants

This authorization does not grant:

```text
REAL BENCHMARK TASK EXECUTION
BENCHMARK CORPUS / FIXTURE / MANIFEST MUTATION
GOLD-LABEL OR METRIC-FORMULA IMPLEMENTATION
PROVIDER / MODEL / REVIEWER / EVALUATOR / AGENT INVOCATION
NETWORK ACCESS
SECRET ACCESS
SUBPROCESS / SHELL / SANDBOX EXECUTION
REPOSITORY CRAWLING / NEW FILESYSTEM ACQUISITION
FILESYSTEM WRITE / BENCHMARK RESULT PERSISTENCE
DATABASE / CACHE / TELEMETRY / ANALYTICS / UPLOAD
TRAINING / FINE-TUNING / ONLINE LEARNING
CROSS-REPOSITORY AGGREGATION / LEARNING
EMBEDDINGS / VECTOR DATABASE / LEARNED RERANKER
NEW DEPENDENCIES
DONOR / EXTERNAL CODE INTAKE
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION
PACKAGE PUBLICATION
PUBLIC RELEASE / VERSION DECLARATION / BRAND LAUNCH
K2 EXECUTION-AUTHORITY EXPANSION
K5 PROOF-AUTHORITY EXPANSION
DONE GATE MODIFICATION
PROVEN_READY AUTHORITY TRANSFER
AUTOFIX EXECUTION
RULESET MUTATION / BYPASS
P2-R6+ IMPLEMENTATION
P3-R4+ IMPLEMENTATION
P4-P8 IMPLEMENTATION
```

P3-R3 is pure, deterministic, local, in-memory evidence transformation only.

---

## 19. Exact future implementation allowlist

If and only if this exact authorization record becomes canonical and post-merge proven, exactly one P3-R3 implementation PR becomes eligible within this exact four-path allowlist:

```text
packages/kodac-runtime/bench/p3-r3/contracts.ts
packages/kodac-runtime/bench/p3-r3/context-policy-evidence.ts
packages/kodac-runtime/test/p3-r3-context-policy-evidence.test.ts
docs/planning/KODAC_P3_R3_CONTEXT_POLICY_PAIRWISE_METRIC_EVIDENCE_2026-08-29.md
```

No fifth path is implied.

Read-only imports/calls from canonical P3-R2 and P2 R1/R4/R5 surfaces are authorized exactly as described above. P3-R1, P3-R2, and P2 R1-R5 bytes may not be modified.

No package manifest, lockfile, workflow, fixture, benchmark corpus, roadmap/status document, export barrel, CLI, product surface, dependency, provenance rule, release path, or ruleset path is authorized.

The implementation evidence record may describe candidate-time and exact-head qualification facts, but it may not fabricate future merge or post-merge facts.

---

## 20. Minimum focused test obligations

The future P3-R3 implementation must provide focused tests collectively proving at least:

1. canonical P3-R2 left application is invoked before R3-owned semantics;
2. canonical P3-R2 right application is invoked before R3-owned semantics;
3. malformed P3-R1 request fails through canonical P3-R2;
4. malformed left policy fails through canonical P3-R2;
5. malformed right policy fails through canonical P3-R2;
6. caller-claimed serialized P3-R2 applications are not accepted by the public boundary;
7. canonical P2-R5 derivation is used for the complete P2-R4 comparison;
8. malformed/tampered P2-R4 comparison fails through canonical P2-R5;
9. caller-claimed serialized P2-R5 relation set is not accepted;
10. trusted P3-R2 policy/application identity grammar is exactly bare lowercase 64-hex;
11. left/right plan/request/candidate-set/repository/snapshot/content/task binding equality is enforced;
12. equal policy identities fail closed;
13. equal application identities fail closed;
14. exact R3 declaration keys/version/kind/task-family are enforced;
15. qualification ID bounds/grammar are enforced;
16. benchmark ID and protocol binding are enforced;
17. shared-evaluation-context identity binding is enforced;
18. comparison-policy identity binding is enforced;
19. exact seven-dimension array order is enforced;
20. missing/unknown/duplicate dimension fails closed;
21. duplicate metric IDs fail closed;
22. exact one `context-selection` task family is enforced;
23. extra/missing P2 metrics relative to declared seven fail closed;
24. derived left subject ID uses the bare P3-R2 application identity and is enforced;
25. derived right subject ID uses the bare P3-R2 application identity and is enforced;
26. derived left `system_version_commit_identity` uses `sha256Canonical(...)` and is enforced;
27. derived right `system_version_commit_identity` uses `sha256Canonical(...)` and is enforced;
28. left/right raw artifact log set identities are preserved from P2 evidence;
29. all seven comparable statuses -> `all-required-metrics-comparable`;
30. any insufficient metric -> `one-or-more-required-metrics-insufficient`;
31. relation values do not influence metric-evidence-state derivation;
32. exact P2 metric relation evidence is preserved without rewriting;
33. no favored-count, score, rank, threshold, winner, decision, recommendation, or promotion field exists;
34. chronology/contamination is not inferred or materialized;
35. object insertion order does not alter evidence identity;
36. semantic dimension array order remains fixed and identity-bearing;
37. hostile Proxy/accessor/symbol/non-plain/sparse/extended declaration inputs fail closed;
38. invalid/non-JSON declaration values fail closed;
39. subject-binding identity derivation is deterministic and respects both identity grammars;
40. output identity projection is deterministic and self-reference-free;
41. returned output is deeply frozen and detached from caller mutation;
42. no repository/filesystem/network/provider/model/subprocess/persistence/telemetry side effect occurs;
43. no P2/P3 predecessor byte is modified;
44. canonical runtime typecheck/test suite remains green on all applicable K2 matrix platforms.

Tests may use in-memory synthetic canonical objects only. This authorization does not permit adding or mutating P2/P3 benchmark fixture/corpus files merely to test R3.

---

## 21. Exact-head implementation qualification requirements

A future implementation candidate is not merge-authorized until one frozen exact head proves all of:

```text
BASE = exact canonical authorization merge
BEHIND_BY = 0
CHANGED_PATHS = exactly four authorized P3-R3 paths
P3-R2 / P2 predecessor blobs = unchanged
GOVERNANCE = SUCCESS
K2 runtime-sensitive classifier = SUCCESS
Ubuntu runtime matrix = SUCCESS
Windows runtime matrix = SUCCESS
macOS runtime matrix = SUCCESS
k2-runtime-gate = SUCCESS
EXTERNAL_SEMANTIC_REVIEW_COUNT >= 2
EXTERNAL_SEMANTIC_REVIEW_CHANNELS_DISTINCT = YES
UNRESOLVED_ACTIONABLE_THREADS = 0
EXACT_HEAD / TREE / FOUR BLOBS = CAPTURED
RULESET 20707483 = active
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
WAIVER = NO
```

Any head movement invalidates prior machine/review evidence. Repair must be forward-only within the exact allowlist and the new head must be requalified from scratch.

A reviewer service error, billing notice, skipped review, summary-only response, stale review, duplicate provider channel, or status without substantive terminal assessment does not count toward the two-channel semantic quorum.

---

## 22. Authorization-candidate adoption gate

This one-document authorization candidate itself remains non-canonical until its exact final head proves:

1. base ref is exactly protected `main`;
2. live canonical main is `ecee96c1a0d4bf73c5d41b369edfa9950ae1ea0c`, or this record is reconciled forward to any newer canonical truth before qualification;
3. `behind_by=0`;
4. changed-file set is exactly the one authorization path in Section 3;
5. exact candidate head, tree, and authorization document blob are captured;
6. Governance required contexts are terminal success on the exact head;
7. K2 pull-request classifier and stable `k2-runtime-gate` are terminal success on the exact head, with runtime matrix honestly recorded as non-applicable/skipped for this docs-only candidate when classified that way;
8. at least two distinct independent external semantic reviewer channels each produce a substantive terminal-clean assessment of the exact final head;
9. zero unresolved actionable review threads and zero unresolved material findings remain;
10. PR is open, non-draft, mergeable, and exact-head current;
11. ruleset `20707483` is active with required status contexts and review-thread resolution;
12. `bypass_actors=[]` and current user cannot bypass;
13. guarded normal merge uses the exact qualified `expected_head_sha`;
14. post-merge canonical main equals the returned merge SHA;
15. ordered merge parents are pre-merge canonical main then exact qualified candidate head;
16. merge tree equals qualified candidate tree;
17. canonical authorization blob equals the qualified candidate blob;
18. GitHub merge signature is verified/valid;
19. applicable post-merge Governance succeeds;
20. absence of K2 push for the docs-only authorization is recorded as `NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER` when the canonical workflow path filter makes it non-applicable; and
21. `WAIVER=NO`.

Only after all adoption proof succeeds may repository state say:

```text
P3-R3 CONTEXT POLICY PAIRWISE METRIC EVIDENCE = AUTHORIZED / NOT YET CLOSED_CANONICAL
```

It may not say implemented, benchmarked, promoted, superior, or closed merely because this authorization becomes canonical.

---

## 23. Required implementation evidence record

The authorized implementation evidence path is exactly:

```text
docs/planning/KODAC_P3_R3_CONTEXT_POLICY_PAIRWISE_METRIC_EVIDENCE_2026-08-29.md
```

Before guarded implementation merge, the final evidence chain must bind at minimum:

- canonical authorization merge and authorization blob;
- implementation base, exact final head, final tree, and four final blobs;
- unchanged canonical P3-R2 and P2 R1/R4/R5 dependency blobs;
- focused R3 test obligations and canonical runtime test participation;
- exact-head Governance and K2 run/job results;
- Ubuntu/macOS/Windows runtime results where runtime-sensitive;
- exact-head two-channel external semantic-review quorum;
- zero unresolved actionable threads/material findings;
- ruleset/no-bypass snapshot;
- any forward-only repair history and stale-evidence invalidation;
- `WAIVER=NO`.

Future merge/post-merge facts must be captured externally after they exist; candidate-time evidence must not invent them recursively.

---

## 24. Post-implementation closure boundary

Even after a future P3-R3 implementation merge and post-merge proof, only the bounded pairwise metric-evidence binding mechanism may become `CLOSED_CANONICAL`.

A separate roadmap/status reconciliation remains required before advancing the canonical current-view frontier.

No P3-R4+ implementation, benchmark execution, corpus mutation, policy promotion/default decision, quality claim, provider/model execution, product integration, persistence, release, or ruleset authority is created by R3 closure.

---

## 25. Final non-grant summary

```text
P3-R3 AUTHORIZATION CANDIDATE != P3-R3 IMPLEMENTED
P3-R3 METRIC EVIDENCE != POLICY QUALIFICATION FOR PROMOTION
PER-METRIC FAVORED RELATION != WINNER
ALL REQUIRED METRICS COMPARABLE != BETTER POLICY
P2 PAIRWISE EVIDENCE != CHRONOLOGY / CONTAMINATION PROOF
BENCHMARK EVIDENCE != BENCHMARK EXECUTION AUTHORITY
P3-R3 CLOSED != P3 OVERALL CLOSED
P3-R3 CLOSED != P3-R4+ AUTHORIZED
P3-R3 CLOSED != REPOSITORY DEFAULT / PROMOTION
P3-R3 CLOSED != PUBLIC QUALITY CLAIM
P3-R3 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
WAIVER = NO
```
