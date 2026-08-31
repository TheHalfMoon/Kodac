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

The designation `P3-R7` is not inferred from numbering or merely from P3-R6 closure. It is justified by one concrete remaining canonical composition gap described below.

---

## 2. Exact canonical baseline

```text
CANONICAL_MAIN = ac002f5ef6bf9f338e1106b7b200dd5eb062e776
P3_R1_THROUGH_R5 = CLOSED_CANONICAL
P3_R6_CONTEXT_MEASUREMENT_OBSERVATION = CLOSED_CANONICAL
P3_R6_RECONCILIATION_PR = #273
P3_R6_RECONCILIATION_MERGE = ac002f5ef6bf9f338e1106b7b200dd5eb062e776
P3_OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P3_R7_PLUS_IMPLEMENTATION = NOT_AUTHORIZED BEFORE A MORE-SPECIFIC RECORD BECOMES CANONICAL
P4_P8_IMPLEMENTATION = NOT_AUTHORIZED
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical predecessor code remains read-only to this authorization candidate:

```text
packages/kodac-runtime/bench/p2-r2/runner.ts
  84849214b516fa465451146c9336ea5d825bdeeb
packages/kodac-runtime/bench/p3-r3/contracts.ts
  7383bca3962b054f8b3798f0e8c1a26ccd675c6a
packages/kodac-runtime/bench/p3-r6/contracts.ts
  6b12541182cc0c28072efcb3966e570d3cdeefbe
packages/kodac-runtime/bench/p3-r6/context-measurement-observation.ts
  f31bb7f1cc89ddc6a6eacf1be546c54f135cffca
```

Live GitHub truth, root `AGENTS.md`, `docs/roadmap/NEXT.md`, governing ADRs, canonical P2/P3 predecessor records, and this record after canonical adoption remain controlling.

---

## 3. Exact authorization-candidate path

This authorization candidate may change exactly one path:

```text
docs/planning/KODAC_P3_R7_CONTEXT_MEASUREMENT_REPORT_BINDING_AUTHORIZATION_2026-08-31.md
```

No second path is authorized for adoption of this record.

---

## 4. Concrete remaining gap

Canonical P3-R6 now provides one pure deterministic measurement boundary for one exact context-selection case:

```text
EXACT P3-R1 REQUEST PREIMAGE
+ EXACT CALLER-DECLARED P3-R2 POLICY
+ VALIDATED P2-R1 MANIFEST/CORPUS INPUTS
+ ONE CLOSED R6 MEASUREMENT DECLARATION
-> ONE CANONICAL P3-R6 MEASUREMENT EVIDENCE RECORD
-> EXACTLY SEVEN P2-R2-COMPATIBLE OBSERVATIONS
```

Canonical P2-R2 separately provides:

```text
VALIDATED P2-R1 MANIFEST/CORPUS INPUTS
+ CALLER-SUPPLIED P2-R2 OBSERVATION SET
-> DETERMINISTIC P2-R2 REPORT
```

Canonical P3-R3 then consumes a trusted P2-R4 comparison derived later in the P2 evidence chain. It does not consume P3-R6 evidence directly.

The current repository has no canonical P3 mechanism that:

1. reconstructs a complete set of P3-R6 case measurements from their original preimages;
2. proves that the case set belongs to one common declared context-selection policy identity;
3. proves closed, duplicate-free case coverage for one supplied context-selection benchmark manifest set;
4. concatenates only the canonical R6 observations from those reconstructed measurements;
5. runs canonical `runP2R2Report(...)` over that exact observation set; and
6. binds the resulting P2-R2 report identity back to the exact R6 measurement-evidence identities and observation-set identity.

Repository search on the canonical baseline finds `ContextPolicyMeasurementEvidence` only in the P3-R6 contract/implementation and its authorization surface; there is no downstream P3 consumer. `runP2R2Report(...)` remains a generic P2 boundary and does not bind a P2-R2 report to canonical R6 measurement evidence.

Therefore the next bounded gap is report binding/composition, not benchmark execution, policy promotion, or a new retrieval strategy.

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

The future implementation may not modify P2/P3 predecessor source or tests, manifests, corpora, fixtures, workflows, dependencies, lockfiles, provider/model configuration, persistence, telemetry, product surfaces, release surfaces, or rulesets.

---

## 6. Future public boundary

A future implementation may expose one pure deterministic function semantically equivalent to:

```text
buildContextPolicyMeasurementReportBinding(
  caseMeasurementPreimagesValue,
  manifestInput,
  developmentInput,
  holdoutInput,
  reportDeclarationValue,
) -> ContextPolicyMeasurementReportEvidence
```

The function must perform no ambient side effect.

`caseMeasurementPreimagesValue` is a caller-supplied closed array. Each entry contains only the original inputs required to reconstruct one canonical P3-R6 measurement:

```text
planRequestValue
policyValue
measurementDeclarationValue
```

The future implementation must not trust caller-serialized P3-R1 plans, P3-R2 applications, P3-R6 evidence, P2-R2 observations, or P2-R2 reports as substitutes for canonical reconstruction.

---

## 7. Mandatory deterministic procedure

The future implementation must:

1. harden/snapshot all public inputs before semantic reuse;
2. validate the supplied P2-R1 manifest/development/holdout set through canonical `validateManifestSet(...)` or through canonical `runP2R2Report(...)` as part of the closed procedure;
3. require a non-empty dense plain case-preimage array with a deterministic canonical order;
4. reconstruct every case by invoking canonical `buildContextPolicyMeasurementObservations(...)` using the same supplied manifest/development/holdout inputs;
5. require every reconstructed measurement to bind task family `context-selection`;
6. require all reconstructed measurements to share one exact canonical `policyIdentity`;
7. require every measurement to bind the same exact `r1ManifestSetDigest`;
8. require unique `caseId`, unique `measurementId`, and unique `measurementEvidenceIdentity` values;
9. require the case set to cover exactly every `context-selection` manifest case admitted by the future closed report declaration, with no unknown, duplicate, or omitted admitted case;
10. require each admitted case to bind exactly the seven canonical P3 dimensions and preserve its exact manifest metric IDs and units;
11. concatenate only the seven canonical observations emitted by each reconstructed R6 measurement;
12. reject duplicate `(case_id, metric_id)` observation slots;
13. call canonical `runP2R2Report(manifestInput, developmentInput, holdoutInput, observations)`;
14. require the returned report `r1_manifest_set_digest` to equal the common reconstructed R6 `r1ManifestSetDigest`;
15. require the returned report `observation_set_digest` to equal the canonical digest of the exact concatenated normalized R6 observation set;
16. retain the ordered R6 measurement-evidence identities, their deterministic set digest, the P2-R2 report identity, and the complete normalized report declaration;
17. derive one deterministic P3-R7 evidence identity from the complete normalized result projection, excluding only that identity field itself; and
18. return a detached deeply frozen result.

No repository-owned judgment, ranking, reduction, threshold, significance calculation, or promotion occurs in this procedure.

---

## 8. Closed report declaration

The future report declaration may contain exactly these semantic fields:

```text
version
kind
reportBindingId
taskFamily
admittedCaseIds
```

Required literals:

```text
version = p3-r7-context-measurement-report-binding-declaration-v1
kind = build_context_policy_measurement_report_binding
taskFamily = context-selection
```

`reportBindingId` is a caller-owned canonical identifier.

`admittedCaseIds` must be a non-empty strictly sorted duplicate-free array. Every admitted case must exist in the validated P2-R1 manifest set and must have task family `context-selection`. Every reconstructed R6 case must be admitted exactly once, and every admitted case must have exactly one reconstructed R6 measurement preimage.

This declaration does not create or mutate a benchmark manifest and does not define repository benchmark truth.

---

## 9. Required cross-case invariants

The future implementation must fail closed unless:

```text
ALL CASES SHARE ONE POLICY IDENTITY
ALL CASES SHARE ONE R1 MANIFEST-SET DIGEST
ALL CASES ARE CONTEXT-SELECTION CASES
ADMITTED CASE COVERAGE IS EXACT
CASE IDS ARE UNIQUE
MEASUREMENT IDS ARE UNIQUE
MEASUREMENT EVIDENCE IDENTITIES ARE UNIQUE
OBSERVATION SLOTS ARE UNIQUE
EVERY CASE CONTRIBUTES EXACTLY SEVEN R6 OBSERVATIONS
NO CALLER-SUPPLIED SERIALIZED R6/P2 RESULT IS TRUSTED
```

The same policy identity requirement is semantic, not merely a shared `policyId` label. Two policies with the same label but different canonical policy identity must fail closed.

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
benchmarkId
benchmarkProtocolVersion
r1ManifestSetDigest
measurementEvidenceIdentities
measurementEvidenceSetDigest
observationSetDigest
p2R2ReportIdentity
p2R2Report
```

The exact schema must be closed and reject unknown fields on public serialized declarations.

The nested P2-R2 report remains P2 evidence. P3-R7 only proves its derivation/binding to the reconstructed R6 measurement set; it does not reinterpret P2 metric values or statuses.

---

## 11. Edge-case discipline

The future implementation must test and fail closed for at least:

- empty/sparse/Proxy/accessor/symbol-bearing case arrays or declarations;
- unknown or extra declaration fields;
- duplicate or unsorted admitted case IDs;
- unknown/cross-task-family admitted cases;
- omitted admitted cases or extra reconstructed cases;
- duplicate case IDs or measurement IDs;
- mixed policy identities;
- mixed manifest-set digests;
- malformed or caller-forged serialized R6/P2 evidence attempts;
- any case that fails canonical R6 reconstruction;
- duplicate observation slots after composition;
- digest mismatch between R6 evidence, concatenated observations, and P2-R2 report;
- mutation attempts against returned evidence;
- input mutation after call entry affecting semantics; and
- any ambient filesystem/network/process/persistence side effect.

Positive tests must include multiple context-selection cases under one exact policy identity, unavailable R6 metrics where canonically valid, deterministic ordering under equivalent caller array ordering, and exact repeatability.

---

## 12. Explicit non-grants

This authorization does not grant:

```text
REAL BENCHMARK TASK EXECUTION
BENCHMARK PARTICIPANT EXECUTION
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
P3-R7 CONTEXT MEASUREMENT REPORT BINDING IMPLEMENTATION = AUTHORIZED
P3-R7 IMPLEMENTATION ALLOWLIST = EXACT FOUR PATHS IN SECTION 5
P3-R7 IMPLEMENTATION = NOT YET CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
P3-R8+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

No other authority is created by composition or by the `P3-R7` label.