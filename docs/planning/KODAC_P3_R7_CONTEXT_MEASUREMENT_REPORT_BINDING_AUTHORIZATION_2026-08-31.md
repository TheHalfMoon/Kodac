# Kodac P3-R7 Context Measurement Report Binding Authorization — 2026-08-31

## 1. Authority status

```text
CLASS = AUTHORIZATION CANDIDATE / DOCUMENTATION ONLY
ACTIVE P3-R7 IMPLEMENTATION AUTHORITY = NONE UNTIL THIS EXACT RECORD BECOMES CANONICAL
REAL BENCHMARK TASK EXECUTION = NONE
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NONE
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NONE
DEPENDENCY ADMISSION = NONE
PERSISTENCE / TELEMETRY / LEARNING = NONE
PRODUCT / CLI / API / AGENT-LOOP INTEGRATION = NONE
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NONE
PUBLIC QUALITY / SUPERIORITY / RELEASE CLAIM = NONE
RULESET CHANGE / BYPASS = NONE
WAIVER = NO
```

This record proposes one bounded future P3-R7 mechanism. It is not effective implementation authority while it exists only on a branch or pull request. It becomes effective only after its own exact-head qualification, guarded normal merge, and complete post-merge adoption proof.

The designation `P3-R7` is not inferred from numbering or merely from P3-R6 closure. It is justified by one concrete remaining canonical composition gap: P3-R6 creates deterministic measurement evidence for one exact context-selection case, while P2-R2 independently creates a deterministic report from caller-supplied observations, and no canonical P3 boundary currently binds one reconstructed R6 evidence record to the exact P2-R2 report generated from those observations.

This candidate intentionally authorizes only a **single-case report-binding boundary**. Multi-case subject composition is not designed or authorized here.

---

## 2. Exact canonical baseline and sequencing proof

```text
CANONICAL_MAIN = ac002f5ef6bf9f338e1106b7b200dd5eb062e776

P3_R1_THROUGH_R5 = CLOSED_CANONICAL
P3_R6_CONTEXT_MEASUREMENT_OBSERVATION = CLOSED_CANONICAL

P3_R6_IMPLEMENTATION_PR = #272
P3_R6_IMPLEMENTATION_MERGE = c045ae50f42fcfeede37bbd3290b1d3a7cb5bb91

P3_R6_RECONCILIATION_PR = #273
P3_R6_RECONCILIATION_QUALIFIED_HEAD = 9ff1047f9e286787f2e6ab44ac462a2d918edb4b
P3_R6_RECONCILIATION_QUALIFIED_TREE = ff079b0cfbe1ab7640adc792fdbf476b3b7b63b7
P3_R6_RECONCILIATION_MERGE = ac002f5ef6bf9f338e1106b7b200dd5eb062e776
P3_R6_RECONCILIATION_MERGE_VERIFICATION = verified / valid
P3_R6_RECONCILIATION_POST_MERGE_GOVERNANCE = 33423715777 / SUCCESS
P3_R6_RECONCILIATION_POST_MERGE_PROVENANCE = 99592071291 / SUCCESS
P3_R6_RECONCILIATION_POST_MERGE_LEGACY_TESTS = 99592071581 / SUCCESS
P3_R6_RECONCILIATION_POST_MERGE_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
P3_R6_RECONCILIATION_POST_MERGE_PROOF_COMMENT = #273 / 5482689759

P3_OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P3_R7_PLUS_IMPLEMENTATION = NOT_AUTHORIZED BEFORE A MORE-SPECIFIC RECORD BECOMES CANONICAL
P4_P8_IMPLEMENTATION = NOT_AUTHORIZED
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R6 implementation blobs remain read-only to this candidate:

```text
packages/kodac-runtime/bench/p3-r6/contracts.ts
  6b12541182cc0c28072efcb3966e570d3cdeefbe
packages/kodac-runtime/bench/p3-r6/context-measurement-observation.ts
  f31bb7f1cc89ddc6a6eacf1be546c54f135cffca
packages/kodac-runtime/test/p3-r6-context-measurement-observation.test.ts
  0ef67ed8249a03f79bac6ccf132a8dade56a79d4
docs/planning/KODAC_P3_R6_CONTEXT_MEASUREMENT_OBSERVATION_EVIDENCE_2026-08-31.md
  c8c156947f17aef62625acb5ea93c6bc9c0018a8
```

Canonical predecessor code also remains read-only:

```text
packages/kodac-runtime/bench/p2-r2/runner.ts
  84849214b516fa465451146c9336ea5d825bdeeb
packages/kodac-runtime/bench/p3-r3/contracts.ts
  7383bca3962b054f8b3798f0e8c1a26ccd675c6a
```

`docs/roadmap/NEXT.md` explicitly states that live GitHub and exact canonical authorization/evidence records override that navigation page. Its `THEN` condition permits later bounded P3 definition/planning/authorization-candidate work only after the five-path P3-R6 reconciliation becomes canonical and post-merge proven. The exact #273 merge and post-merge proof above satisfy that condition. This record does not infer implementation authority from the stale `NOW` heading or from numbering; it relies on the exact canonical #273 adoption proof and remains only an authorization candidate until separately qualified and adopted.

Live GitHub truth, root `AGENTS.md`, `docs/roadmap/NEXT.md`, governing ADRs, canonical predecessor records, and this record after canonical adoption remain controlling.

---

## 3. Exact authorization-candidate path

This authorization candidate may change exactly one path:

```text
docs/planning/KODAC_P3_R7_CONTEXT_MEASUREMENT_REPORT_BINDING_AUTHORIZATION_2026-08-31.md
```

No second path is authorized for adoption of this record.

---

## 4. Concrete remaining gap

Canonical P3-R6 provides:

```text
EXACT P3-R1 REQUEST PREIMAGE
+ EXACT CALLER-DECLARED P3-R2 POLICY
+ VALIDATED P2-R1 MANIFEST / DEVELOPMENT / HOLDOUT INPUTS
+ ONE CLOSED R6 MEASUREMENT DECLARATION
-> ONE CANONICAL P3-R6 MEASUREMENT EVIDENCE RECORD
-> EXACTLY SEVEN P2-R2-COMPATIBLE OBSERVATIONS
```

Canonical P2-R2 independently provides:

```text
VALIDATED P2-R1 MANIFEST / DEVELOPMENT / HOLDOUT INPUTS
+ CALLER-SUPPLIED P2-R2 OBSERVATION SET
-> DETERMINISTIC P2-R2 REPORT
```

Repository search on canonical `main` finds no downstream P3 consumer of `ContextPolicyMeasurementEvidence`. Therefore the missing bounded bridge is not another measurement formula. It is one proof-preserving composition boundary that reconstructs one exact R6 evidence record from its original preimages, passes only its canonical observations into `runP2R2Report(...)`, proves that the P2-R2 report contains no semantic slots outside that R6 measurement, and binds both identities in one deterministic P3 evidence record.

This candidate does **not** attempt multi-case aggregation. That restriction is necessary because:

1. P2-R2 always materializes every validated manifest record and every declared metric slot, inserting `missing` slots when observations are absent;
2. a partial case subset, a mixed-task-family manifest, or extra manifest metrics would therefore create P2-R2 report semantics not represented by the R6 evidence record; and
3. canonical P3-R2 `policyIdentity` includes plan/repository/snapshot/content/task-bound fields, so it is not a case-invariant multi-case strategy identity.

No new cross-case strategy identity is invented by this authorization.

---

## 5. Exact future implementation allowlist

If and only if this authorization becomes canonical and post-merge proven, one future P3-R7 implementation candidate may modify exactly these four paths:

```text
packages/kodac-runtime/bench/p3-r7/contracts.ts
packages/kodac-runtime/bench/p3-r7/context-measurement-report-binding.ts
packages/kodac-runtime/test/p3-r7-context-measurement-report-binding.test.ts
docs/planning/KODAC_P3_R7_CONTEXT_MEASUREMENT_REPORT_BINDING_EVIDENCE_2026-08-31.md
```

No fifth path is authorized.

The future implementation may not modify P2/P3 predecessor source or tests, manifests, development/holdout corpora, fixtures, result files, workflows, dependencies, lockfiles, provider/model/evaluator configuration, persistence, telemetry, product surfaces, release surfaces, or rulesets.

---

## 6. Future public boundary

A future implementation may expose one pure deterministic function semantically equivalent to:

```text
buildContextPolicyMeasurementReportBinding(
  planRequestValue,
  policyValue,
  manifestInput,
  developmentInput,
  holdoutInput,
  measurementDeclarationValue,
  reportDeclarationValue,
) -> ContextPolicyMeasurementReportEvidence
```

The function must perform no ambient side effect.

Caller-serialized P3-R1 plans, P3-R2 applications, P3-R6 evidence, P2-R2 observations, or P2-R2 reports must never substitute for canonical reconstruction.

---

## 7. Closed single-case manifest boundary

Before producing P3-R7 evidence, the future implementation must fail closed unless the canonical validated P2-R1 manifest set satisfies **all** of these properties:

```text
TOTAL MANIFEST RECORD COUNT = 1
SOLE TASK FAMILY = context-selection
SOLE CASE ID = report declaration caseId
SOLE R1 RESULT IDENTITY = report declaration r1ResultIdentity
SOLE METRIC-DEFINITION COUNT = 7
```

The sole record's seven metric definitions must be an exact one-to-one set match for the reconstructed P3-R6 `measurementDeclaration.dimensionMetricBindings` after binding each R6 dimension to the exact manifest `metric_id` and `unit`. No eighth metric, omitted metric, duplicate metric, cross-task-family metric, unknown metric, or unit mismatch is allowed.

This restriction is deliberate. It ensures canonical `runP2R2Report(...)` cannot add an unbound case or an unbound `missing` metric slot to the report.

A future broader multi-case or mixed-family report boundary requires a separate explicit authorization and must first define a valid case-invariant subject/strategy identity and complete P2 report-coverage semantics. This record does not do so.

---

## 8. Closed report declaration

The future report declaration may contain exactly these semantic fields:

```text
version
kind
reportBindingId
taskFamily
caseId
r1ResultIdentity
```

Required literals:

```text
version = p3-r7-context-measurement-report-binding-declaration-v1
kind = build_context_policy_measurement_report_binding
taskFamily = context-selection
```

`reportBindingId` must be an explicit caller-owned canonical identifier.

`caseId` and `r1ResultIdentity` must match both the sole validated manifest record and the canonically reconstructed P3-R6 measurement evidence. Unknown fields, missing fields, unsupported literals, non-canonical identifiers, or mismatches fail closed.

The complete normalized declaration is retained in the result and bound into the P3-R7 evidence identity.

---

## 9. Mandatory deterministic procedure

The future implementation must:

1. harden/snapshot all public inputs before semantic reuse;
2. validate the supplied manifest/development/holdout inputs through canonical P2-R1 validation semantics;
3. enforce the exact single-case/single-family/seven-metric manifest boundary in Section 7;
4. normalize the closed report declaration in Section 8;
5. reconstruct one canonical P3-R6 measurement by invoking canonical `buildContextPolicyMeasurementObservations(...)` with the same manifest/development/holdout inputs;
6. require the reconstructed R6 task family, case ID, R1 result identity, and manifest-set digest to match the validated sole manifest record and report declaration;
7. require the reconstructed R6 evidence to contain exactly seven observations and exactly seven dimension bindings;
8. require a one-to-one match between the seven R6 observation `(metric_id, unit)` slots, the seven R6 dimension bindings, and the seven sole-record manifest metric definitions;
9. require every R6 observation status to be `observed` or `unavailable`; R6 may never contribute a synthetic `missing` observation;
10. call canonical `runP2R2Report(manifestInput, developmentInput, holdoutInput, r6Evidence.observations)`;
11. require the returned P2-R2 report to contain exactly one case, exactly one `context-selection` task-family section, exactly seven metric slots, and no metric with `measurement_status = missing`;
12. require every P2-R2 report metric slot to exactly match the corresponding reconstructed R6 observation by `case_id`, `r1_result_identity`, `task_family`, `metric_id`, `unit`, `measurement_status`, and `value`;
13. require the returned report `r1_manifest_set_digest` to equal reconstructed R6 `r1ManifestSetDigest`;
14. retain reconstructed R6 `observationSetDigest` as the source R6 observation-order identity;
15. retain returned P2-R2 `observation_set_digest` as the canonical P2-R2 normalized observation-set identity;
16. **not require those two observation digests to be equal**, because canonical R6 hashes its seven observations in canonical P3 dimension order while P2-R2 normalizes/sorts observations by its own report contract before deriving `observation_set_digest`;
17. retain the exact reconstructed R6 measurement evidence identity and exact generated P2-R2 report identity;
18. derive one deterministic P3-R7 evidence identity from the complete normalized result projection, excluding only `reportEvidenceIdentity` itself; and
19. return a detached deeply frozen result.

The future implementation must not reinterpret, reweight, rank, reduce, statistically evaluate, or promote any measurement.

---

## 10. Future result semantics

A future `ContextPolicyMeasurementReportEvidence` may contain only deterministic evidence/binding fields equivalent to:

```text
version
kind
reportEvidenceIdentity
reportDeclaration
reportBindingId
policyIdentity
applicationIdentity
measurementEvidenceIdentity
caseId
r1ResultIdentity
benchmarkId
benchmarkProtocolVersion
r1ManifestSetDigest
r6ObservationSetDigest
p2R2ObservationSetDigest
p2R2ReportIdentity
p2R2Report
```

Required result literals must be versioned and closed. Public serialized declarations reject unknown fields.

The nested P2-R2 report remains P2 evidence. P3-R7 proves only that this exact locally generated report is fully covered by one exact canonically reconstructed R6 measurement evidence record. It does not reinterpret P2 metric values or statuses.

`policyIdentity` remains the case-bound canonical P3-R2 identity reconstructed through R6. This record does not treat it as a multi-case strategy identity.

---

## 11. Edge-case discipline

The future implementation must fail closed for at least:

- Proxy/accessor/symbol-bearing/cyclic/non-canonical public inputs;
- unknown or extra report-declaration fields;
- unsupported version/kind/task-family literals;
- zero manifest records or more than one manifest record;
- any non-`context-selection` manifest record;
- report-declaration case or R1 result mismatch;
- fewer or more than seven manifest metric definitions;
- duplicate, unknown, omitted, cross-task-family, or unit-mismatched metric definitions/bindings;
- any canonical R6 reconstruction failure;
- R6 evidence with anything other than exactly seven observations;
- any R6-to-P2 slot mismatch;
- any generated P2-R2 report containing a `missing` metric slot;
- any P2 report case/family/metric count outside the closed boundary;
- R1 manifest-set digest mismatch;
- caller-forged serialized R6/P2 intermediate evidence attempts;
- mutation attempts against returned evidence;
- input mutation after call entry affecting semantics; and
- any ambient filesystem/network/process/persistence side effect.

Positive tests must include:

- a sole context-selection case whose seven metrics include both `observed` and canonically valid `unavailable` statuses;
- deterministic repeatability;
- proof that equivalent benign caller object-key ordering does not change normalized identity; and
- proof that R6 and P2-R2 observation digests are retained under their distinct canonical ordering semantics without false equality assumptions.

---

## 12. Explicit non-grants

This authorization does not grant:

```text
REAL BENCHMARK TASK EXECUTION
BENCHMARK PARTICIPANT EXECUTION
MULTI-CASE / MIXED-FAMILY / MULTI-POLICY REPORT COMPOSITION
CASE-INVARIANT STRATEGY / SUBJECT IDENTITY
BENCHMARK CORPUS / MANIFEST / FIXTURE CREATION OR MUTATION
REPOSITORY-OWNED GOLD TRUTH
MODEL / PROVIDER / REVIEWER / EVALUATOR / TOOL INVOCATION
NETWORK / SECRET / SUBPROCESS / SANDBOX EXPANSION
REPOSITORY CRAWLING OR NEW FILESYSTEM ACQUISITION
NEW DEPENDENCIES OR TOKENIZERS
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD
TRAINING / FINE-TUNING / ONLINE LEARNING
EMBEDDINGS / VECTOR DB / LEARNED RERANKING
P2 OR P3 PREDECESSOR MUTATION
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION
STATISTICAL SIGNIFICANCE / HOLDOUT-SUFFICIENCY / CONTAMINATION-FREE CLAIMS
N-WAY RANKING / LEADERBOARD / AGGREGATE QUALITY SCORE
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION
PUBLIC QUALITY / SUPERIORITY / RELEASE / PACKAGE CLAIM
P3 OVERALL CLOSURE
P3-R8+ IMPLEMENTATION
P4-P8 IMPLEMENTATION
RULESET CHANGE / BYPASS
```

`WAIVER=NO`.

---

## 13. Qualification gate for this authorization candidate

This authorization record itself must not merge until one frozen exact head proves all of:

- canonical `main` remains the exact base or the branch is non-destructively reconciled and fully requalified;
- `behind_by=0`;
- exactly one changed path, the authorization record named in Section 3;
- exact head, tree, and authorization blob identities captured;
- PR open, non-draft, and mergeable at final qualification;
- Governance `provenance` and `legacy-tests` terminal success on the exact head;
- K2 pull-request classifier and stable `k2-runtime-gate` terminal success, with docs-only runtime-matrix applicability represented honestly;
- at least two distinct independently operated external substantive semantic reviewer/model-system channels terminal-clean on the exact head and current relevant metadata;
- every previously reported material finding explicitly re-adjudicated as fixed or non-defect on the current exact head;
- zero unresolved material findings and zero unresolved actionable review threads;
- ruleset `20707483` active with `bypass_actors=[]` and `current_user_can_bypass=never`;
- guarded normal merge with the exact qualified expected head; and
- mandatory post-merge proof of canonical `main`, ordered parents, tree, authorization blob, GitHub signature, applicable checks, merged PR state, and ruleset/no-bypass state.

Any repository-byte, base, or current-relevant PR-metadata movement invalidates applicable exact-head/current-metadata qualification evidence.

No force-push, rebase, destructive history rewrite, stale evidence reuse, review waiver, governance bypass, or silent waiver.

---

## 14. Conditional effect after canonical adoption only

If and only if this exact authorization record qualifies, merges normally, and passes complete post-merge proof:

```text
P3-R7 SINGLE-CASE CONTEXT MEASUREMENT REPORT BINDING IMPLEMENTATION = AUTHORIZED
P3-R7 IMPLEMENTATION ALLOWLIST = EXACT FOUR PATHS IN SECTION 5
P3-R7 IMPLEMENTATION = NOT YET CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
MULTI-CASE / CASE-INVARIANT STRATEGY COMPOSITION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
P3-R8+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

No other authority is created by composition or by the `P3-R7` label.