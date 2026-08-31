# Kodac P3-R6 Context Measurement Observation Authorization — 2026-08-31

## 1. Authority status

```text
CLASS = AUTHORIZATION CANDIDATE / DOCUMENTATION ONLY
ACTIVE P3-R6 IMPLEMENTATION AUTHORITY = NONE UNTIL THIS EXACT RECORD BECOMES CANONICAL
REAL BENCHMARK TASK EXECUTION = NONE
BENCHMARK CORPUS / MANIFEST MUTATION = NONE
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NONE
DEPENDENCY ADMISSION = NONE
PERSISTENCE / TELEMETRY / LEARNING = NONE
PRODUCT / CLI / API / AGENT-LOOP INTEGRATION = NONE
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NONE
PUBLIC QUALITY / SUPERIORITY / RELEASE CLAIM = NONE
RULESET CHANGE / BYPASS = NONE
WAIVER = NO
```

This record proposes one bounded future P3-R6 mechanism. It is not effective implementation authority while it exists only on a branch or pull request. It becomes effective only after its own exact-head qualification, guarded normal merge, and complete post-merge adoption proof.

The designation `P3-R6` is not inferred merely because P3-R1 through P3-R5 are closed. It is justified here by one concrete canonical gap: P3-R2 produces deterministic selected/omitted context, while P2-R2 accepts already-materialized observations and P3-R3 through P3-R5 consume trusted measurement/provenance evidence. No canonical P3 mechanism currently materializes the seven context-quality observations from one exact P3-R2 policy application plus explicit caller-supplied evaluation facts.

This candidate addresses only that missing local measurement boundary. It does not authorize benchmark participant execution or policy promotion.

---

## 2. Exact canonical baseline

This candidate is based on canonical `main` after the bounded P3 R1-R5 closeout:

```text
CANONICAL_MAIN = 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
CANONICAL_TREE = 411e3ad4a4ab66d1403bb716e7fffc8a8faa835f
P3_BOUNDED_R1_R5_CLOSEOUT_PR = #270
P3_BOUNDED_R1_R5_QUALIFIED_HEAD = aaea51a6cb1727b58278a3202cbd37030e02fd73
P3_BOUNDED_R1_R5_CLOSEOUT_MERGE = 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
P3_BOUNDED_R1_R5_CLOSEOUT_TREE = 411e3ad4a4ab66d1403bb716e7fffc8a8faa835f
P3_BOUNDED_R1_R5_MERGE_VERIFICATION = verified / valid
P3_BOUNDED_R1_R5_POST_MERGE_GOVERNANCE = 33411739688 / SUCCESS
P3_BOUNDED_R1_R5_POST_MERGE_PROVENANCE = 99552701998 / SUCCESS
P3_BOUNDED_R1_R5_POST_MERGE_LEGACY_TESTS = 99552702226 / SUCCESS
P3_BOUNDED_R1_R5_POST_MERGE_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
P3 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED BEFORE A MORE-SPECIFIC RECORD BECOMES CANONICAL
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical predecessor code remains read-only to this authorization candidate:

```text
packages/kodac-runtime/src/context-selection-plan/contracts.ts
  f8d4123a14cc52a8307c3294fd4302b819a91390
packages/kodac-runtime/src/context-selection-policy/contracts.ts
  1b5bf19868214fd202ede209d5976dfa9d17677d
packages/kodac-runtime/bench/p2-r2/runner.ts
  84849214b516fa465451146c9336ea5d825bdeeb
packages/kodac-runtime/bench/p3-r3/contracts.ts
  7383bca3962b054f8b3798f0e8c1a26ccd675c6a
packages/kodac-runtime/bench/p3-r4/contracts.ts
  90965256d7f8aeeef5f88698c6fe2d2c53433b85
packages/kodac-runtime/bench/p3-r5/contracts.ts
  5f9f33bf6a3a7e4378e443621b913e76b9ab0ad7
```

Live GitHub truth, root `AGENTS.md`, `docs/roadmap/NEXT.md`, accepted ADRs, the provider-neutral review-quorum amendment, canonical P2/P3 predecessor evidence, and this record after canonical adoption remain controlling.

---

## 3. Exact authorization-candidate path

This authorization candidate may change exactly one path:

```text
docs/planning/KODAC_P3_R6_CONTEXT_MEASUREMENT_OBSERVATION_AUTHORIZATION_2026-08-31.md
```

No second path is authorized for adoption of this record.

---

## 4. Why this boundary is the next justified P3 slice

Canonical P3-R1 through P3-R5 currently provide:

```text
P3-R1 = deterministic context-selection-plan foundation
P3-R2 = deterministic caller-declared policy application
P3-R3 = pairwise seven-dimension metric-evidence binding
P3-R4 = literal benchmark-provenance evidence binding
P3-R5 = caller-declared criterion-match evidence
```

The canonical seven P3 context evidence dimensions are:

```text
recall-at-k
precision-at-k
file-f1
token-budgeted-evidence-yield
no-gold-abstention
explored-vs-utilized-context
context-dilution
```

P2-R2 validates caller-supplied `P2R2Observation` records against a validated P2-R1 manifest set and emits deterministic reports. It does not derive those observations from a P3 policy application.

Therefore the missing bounded bridge is:

```text
EXACT P3-R1 REQUEST PREIMAGE
+ EXACT CALLER-DECLARED P3-R2 POLICY
+ VALIDATED P2-R1 CASE / METRIC BINDINGS
+ EXPLICIT CALLER-SUPPLIED GOLD / UTILIZATION FACTS
-> CANONICAL P3-R2 POLICY APPLICATION RECONSTRUCTION
-> PURE DETERMINISTIC SEVEN-DIMENSION MEASUREMENT
-> P2-R2-COMPATIBLE OBSERVATIONS
```

This is measurement materialization only. It is not task execution, evaluator/model execution, corpus generation, strategy discovery, ranking, statistical inference, or promotion.

---

## 5. Exact future implementation allowlist

If and only if this authorization becomes canonical and post-merge proven, one future P3-R6 implementation candidate may modify exactly these four paths:

```text
packages/kodac-runtime/bench/p3-r6/contracts.ts
packages/kodac-runtime/bench/p3-r6/context-measurement-observation.ts
packages/kodac-runtime/test/p3-r6-context-measurement-observation.test.ts
docs/planning/KODAC_P3_R6_CONTEXT_MEASUREMENT_OBSERVATION_EVIDENCE_2026-08-31.md
```

No fifth path is authorized.

In particular, the future P3-R6 implementation may not modify:

- P2 or P3 predecessor source/tests/evidence;
- benchmark manifests, development/holdout corpora, fixtures, or result files;
- package metadata or lockfiles;
- workflows or rulesets;
- provider/model/evaluator configuration;
- persistence, telemetry, database, upload, or learning surfaces;
- CLI/API/product/agent-loop surfaces; or
- release/package/public-claim surfaces.

---

## 6. Future public boundary

A future implementation may expose one pure deterministic function semantically equivalent to:

```text
buildContextPolicyMeasurementObservations(
  planRequestValue,
  policyValue,
  manifestInput,
  developmentInput,
  holdoutInput,
  measurementDeclarationValue,
) -> ContextPolicyMeasurementEvidence
```

The function must perform no ambient side effect.

Mandatory procedure order:

1. harden/snapshot all public inputs before semantic reuse;
2. reconstruct the canonical P3-R1 plan from the complete request preimage through the existing canonical builder;
3. reconstruct the canonical P3-R2 policy application through the existing canonical policy application function;
4. validate the supplied P2-R1 manifest/development/holdout set through canonical `validateManifestSet(...)`;
5. validate one exact caller measurement declaration against the reconstructed P3-R2 application and one exact `context-selection` manifest case;
6. derive all seven measurement outcomes only from the reconstructed application, validated manifest binding, and caller-supplied evaluation facts defined below;
7. emit exactly seven P2-R2-compatible observation records in canonical dimension order;
8. derive one deterministic measurement evidence identity from the complete normalized result projection, including the complete normalized measurement declaration, excluding only `measurementEvidenceIdentity` itself; and
9. return a detached deeply frozen result.

Caller-serialized P3-R1 plans, P3-R2 applications, P3-R3 evidence, or P3-R5 qualification records must never substitute for canonical reconstruction.

---

## 7. Closed measurement declaration

The future declaration may contain exactly these semantic fields:

```text
version
kind
measurementId
caseId
r1ResultIdentity
taskFamily
dimensionMetricBindings
goldCandidateIdentities
utilizedCandidateIdentities
```

The exact required declaration literals are:

```text
version = p3-r6-context-measurement-observation-declaration-v1
kind = build_context_policy_measurement_observations
taskFamily = context-selection
```

All other declaration `version`, `kind`, or `taskFamily` values fail closed. The literals follow the canonical P3-R3/P3-R5 pattern of versioned closed declarations with a builder-operation kind.

`measurementId` must be an explicit caller-owned canonical identifier. The declaration must bind exactly one validated P2-R1 manifest case and its exact `r1ResultIdentity`.

`dimensionMetricBindings` must contain exactly one binding for each of the seven canonical P3 context evidence dimensions. Each binding must identify one metric declared by that exact validated P2-R1 case and preserve its exact unit. Unknown, duplicate, omitted, cross-case, or cross-task-family bindings fail closed.

This authorization does not add or mutate a repository benchmark manifest. If the caller's supplied validated manifest does not declare all seven required context-selection metrics, measurement fails closed.

The future implementation must retain the complete normalized declaration after validation. The normalized declaration is semantic evidence input, not transient validation state, and must be bound into the result and its identity exactly as specified in Section 10.

---

## 8. Caller evaluation facts

### 8.1 Gold candidate identities

`goldCandidateIdentities` is a strictly sorted, duplicate-free array of canonical P3-R1 `candidateIdentity` values.

Every gold identity must exist in the reconstructed complete P3-R1 candidate set. A caller cannot introduce an unknown gold candidate.

The set means only:

> the caller declares these exact canonical candidates relevant for this exact measurement case.

It is not repository truth, model truth, benchmark promotion truth, or a public quality label.

An empty gold set is permitted and is the only condition under which the `no-gold-abstention` metric is applicable.

### 8.2 Utilized candidate identities

`utilizedCandidateIdentities` is a strictly sorted, duplicate-free array of canonical candidate identities and must be a subset of the reconstructed P3-R2 `selectedCandidates` identities.

It records only caller-observed utilization of already-selected context for this exact case. It does not invoke a model/evaluator or infer utilization from telemetry.

---

## 9. Exact seven measurement semantics

All numeric ratio values must be finite numbers in `[0, 1]`. No rounding, tolerance, epsilon, hidden weighting, aggregate score, significance calculation, confidence interval, or p-value is authorized.

Let:

```text
S = set of reconstructed P3-R2 selected candidate identities
G = caller-declared gold candidate identity set
U = caller-declared utilized candidate identity set
SP = unique subjectPath set induced by S
GP = unique subjectPath set induced by G
selected_bytes = sum of utf8Bytes across S
relevant_selected_bytes = sum of utf8Bytes across S intersect G
irrelevant_selected_bytes = selected_bytes - relevant_selected_bytes
```

The future implementation must use exact set membership over canonical identities and canonical subject paths.

### 9.1 `recall-at-k`

```text
if |G| == 0: measurement_status = unavailable, value = null
else:        value = |S intersect G| / |G|
```

### 9.2 `precision-at-k`

```text
if |G| == 0: measurement_status = unavailable, value = null
else if |S| == 0: value = 0
else:             value = |S intersect G| / |S|
```

### 9.3 `file-f1`

File precision/recall are derived from `SP` and `GP`.

```text
if |GP| == 0: measurement_status = unavailable, value = null
else if |SP| == 0: value = 0
else:
  file_precision = |SP intersect GP| / |SP|
  file_recall    = |SP intersect GP| / |GP|
  if file_precision + file_recall == 0: value = 0
  else: value = 2 * file_precision * file_recall / (file_precision + file_recall)
```

### 9.4 `token-budgeted-evidence-yield`

This bounded v1 metric uses canonical UTF-8 byte accounting already carried by P3-R1/P3-R2. The metric name is preserved from the canonical P3 dimension; this slice does not introduce an external tokenizer.

```text
if |G| == 0: measurement_status = unavailable, value = null
else if selected_bytes == 0: value = 0
else: value = relevant_selected_bytes / selected_bytes
```

No token-model dependency, tokenizer dependency, provider token count, or hidden byte-to-token conversion is authorized.

### 9.5 `no-gold-abstention`

```text
if |G| != 0: measurement_status = unavailable, value = null
else: measurement_status = observed, value = (|S| == 0)
```

This boolean measures only whether the policy selected no context when the caller declared no gold context for that case. It does not mean the repository should abstain globally.

### 9.6 `explored-vs-utilized-context`

```text
if |S| == 0: measurement_status = unavailable, value = null
else: value = |U| / |S|
```

Because `U` must be a subset of `S`, the ratio is bounded without clipping.

### 9.7 `context-dilution`

```text
if selected_bytes == 0: value = 0
else: value = irrelevant_selected_bytes / selected_bytes
```

This is selected-byte dilution relative only to the caller-declared gold set for the exact case. It is not a general quality judgment.

---

## 10. P2-R2 observation compatibility

The future implementation may emit exactly seven observation records compatible with canonical P2-R2 semantics:

```text
schema_version = p2-r2-observation/v1
case_id = validated exact manifest case
r1_result_identity = validated exact manifest result identity
task_family = context-selection
metric_id = exact declared binding for the dimension
unit = exact validated manifest metric unit
measurement_status = observed | unavailable
value = boolean | finite number | null according to the exact metric semantics above
```

`missing` is not produced by this P3-R6 v1 mechanism. If required evaluation facts are structurally absent or invalid, the function fails closed rather than silently converting malformed input to `missing`.

The future result must bind:

```text
version
kind
measurementEvidenceIdentity
measurementDeclaration
measurementId
applicationIdentity
policyIdentity
planIdentity
requestIdentity
candidateSetIdentity
repositoryIdentity
snapshotIdentity
contentIdentity
taskIdentity
caseId
r1ResultIdentity
r1ManifestSetDigest
observationSetDigest
observations
```

The exact required result literals are:

```text
version = p3-r6-context-measurement-observation-evidence-v1
kind = context_policy_measurement_observation_evidence
```

All other result `version` or `kind` values fail closed. These fields are part of the normalized result projection and therefore part of the `measurementEvidenceIdentity` preimage.

`measurementDeclaration` must be the complete normalized closed declaration from Section 7 exactly as validated, including `dimensionMetricBindings`, `goldCandidateIdentities`, and `utilizedCandidateIdentities`. The returned result therefore preserves the exact caller evaluation facts that determined the observations.

`measurementEvidenceIdentity` must be derived from the complete normalized result projection including `version`, `kind`, `measurementDeclaration`, and `observations`, excluding only the `measurementEvidenceIdentity` field itself. No identity preimage, projection, digest shortcut, or downstream P2-R2 report identity may omit the normalized declaration or substitute the observation set for those declaration facts. Distinct valid normalized declarations must remain identity-distinct even when they happen to produce identical observation values.

No report aggregation is performed by P3-R6. Canonical P2-R2 remains the report boundary if a caller later passes these observations to `runP2R2Report(...)`.

---

## 11. Determinism and hostile-input requirements

A future implementation must:

- reject non-plain, accessor-bearing, symbol-keyed, sparse, extended-prototype, cyclic, or otherwise non-canonical public structures before semantic reuse;
- snapshot/harden all inputs before repeated reads;
- reject declaration or result schema-version/kind values other than the exact literals defined in Sections 7 and 10;
- reject duplicate set members rather than silently deduplicate them;
- preserve canonical P3 dimension order in the emitted observation array;
- use repository canonical string ordering for set-like normalized inputs;
- derive identities through canonical serialization and lowercase `sha256:<64 hex>` identities;
- bind the complete normalized measurement declaration into the returned evidence projection and `measurementEvidenceIdentity` preimage, excluding only the identity field itself;
- reject NaN, infinities, negative byte counts, impossible subset relations, cross-snapshot identities, and manifest/application mismatches;
- return detached deeply frozen output; and
- perform no filesystem, network, subprocess, secret, provider, model, telemetry, persistence, clock, randomness, or environment access.

---

## 12. Explicit non-grants

Even after this authorization becomes canonical, it grants only the exact future four-path implementation described above.

```text
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED
MODEL / PROVIDER / REVIEWER / EVALUATOR INVOCATION = NOT_AUTHORIZED
REPOSITORY-OWNED GOLD LABELS = NOT_AUTHORIZED
REPOSITORY-OWNED CONTEXT POLICY DEFAULT = NOT_AUTHORIZED
REPOSITORY-OWNED WINNER / RANKING / PROMOTION = NOT_AUTHORIZED
N-WAY LEADERBOARD = NOT_AUTHORIZED
AGGREGATE / BLENDED SCORE = NOT_AUTHORIZED
HIDDEN WEIGHTS / THRESHOLDS / TOLERANCES = NOT_AUTHORIZED
STATISTICAL SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
HOLDOUT SUFFICIENCY / UNBIASEDNESS / CONTAMINATION-FREE CLAIM = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKING = NOT_AUTHORIZED
NEW DEPENDENCIES / TOKENIZER = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / UPLOAD / ANALYTICS = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

`P3-R6 measurement observation evidence` must never be relabeled as benchmark execution, winner evidence, promotion evidence, statistical acceptance, public KodacBench completion, or P3 overall closure.

---

## 13. Authorization-candidate qualification gate

This exact one-path authorization candidate may become canonical only if one frozen exact head proves:

- protected canonical `main` is still `9d75115f66f34ef8ee1e1a093705a5cba21f8f49`, or the branch is forward-reconciled non-destructively and fully requalified;
- `behind_by=0`;
- changed-file set is exactly this one authorization document;
- exact head/tree/document blob are captured;
- PR is open, non-draft, and mergeable;
- Governance `provenance` and `legacy-tests` are terminal success on the exact head;
- K2 pull-request classifier and stable `k2-runtime-gate` are terminal success, with the runtime matrix represented honestly as skipped/non-applicable for this docs-only diff when classified that way;
- at least two distinct independently operated external substantive semantic reviewer/model-system channels are terminal-clean on the exact head and current PR metadata;
- status-only, summary-only, billing-blocked, rate-limited, service-error, stale-head, invocation-only, self-review, or non-substantive output does not count;
- unresolved material findings = 0;
- unresolved actionable review threads = 0;
- ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never`;
- `WAIVER=NO`;
- guarded normal merge uses the exact expected head; and
- mandatory post-merge main/ordered-parent/tree/blob/signature/applicable-check/ruleset proof completes before implementation authority is declared effective.

Any repository-byte or base movement invalidates prior exact-head qualification evidence.

---

## 14. Conditional result after canonical adoption only

If and only if this exact authorization candidate qualifies, merges normally, and completes mandatory post-merge proof:

```text
P3-R6 CONTEXT MEASUREMENT OBSERVATION IMPLEMENTATION = AUTHORIZED
P3-R6 IMPLEMENTATION ALLOWLIST = EXACT FOUR PATHS IN SECTION 5
P3-R6 IMPLEMENTATION = NOT YET CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

A future P3-R6 implementation must then undergo its own exact-head CI, external semantic review quorum, guarded merge, mandatory post-merge proof, and separate roadmap/status reconciliation before any later P3 slice may be considered.