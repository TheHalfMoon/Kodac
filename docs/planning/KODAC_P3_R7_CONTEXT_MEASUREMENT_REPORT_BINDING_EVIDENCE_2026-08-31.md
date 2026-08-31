# Kodac P3-R7 Context Measurement Report Binding Evidence — 2026-08-31

## 1. Evidence status

```text
DOCUMENT TYPE = IMPLEMENTATION / QUALIFICATION EVIDENCE CANDIDATE
P3-R7 SINGLE-CASE CONTEXT MEASUREMENT REPORT BINDING = CANDIDATE / NOT YET CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
MULTI-CASE / MIXED-FAMILY / MULTI-POLICY REPORT COMPOSITION = NOT_AUTHORIZED
CASE-INVARIANT STRATEGY / SUBJECT IDENTITY = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
P3-R8+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

This record accompanies only the bounded P3-R7 single-case deterministic report-binding implementation authorized by the canonical P3-R7 authorization record. It is not benchmark execution, a benchmark result, a quality claim, a repository strategy identity, policy promotion, statistical acceptance, provider/model/evaluator execution, persistence, product integration, or release authority.

---

## 2. Canonical authority

The implementation candidate is based on exact canonical `main` after PR #274 adoption:

```text
AUTHORIZATION_PR = #274
AUTHORIZATION_QUALIFIED_HEAD = ac8c6e7d76299faf04467b708dd9d4660723b194
AUTHORIZATION_QUALIFIED_TREE = 88f196c3721df32f184639adf785d82809c220c0
AUTHORIZATION_BLOB = d9ee5d793cca3465b03f909133eeebaf0b0fe197
AUTHORIZATION_MERGE / IMPLEMENTATION_BASE = bbe7825579e388a3a9be7dd64b56f2406425d930
AUTHORIZATION_MERGE_TREE = 88f196c3721df32f184639adf785d82809c220c0
AUTHORIZATION_MERGE_PARENT_1 = ac002f5ef6bf9f338e1106b7b200dd5eb062e776
AUTHORIZATION_MERGE_PARENT_2 = ac8c6e7d76299faf04467b708dd9d4660723b194
AUTHORIZATION_MERGE_VERIFICATION = verified / valid
AUTHORIZATION_POST_MERGE_GOVERNANCE = 33427579642 / SUCCESS
AUTHORIZATION_POST_MERGE_PROVENANCE = 99604811400 / SUCCESS
AUTHORIZATION_POST_MERGE_LEGACY_TESTS = 99604811106 / SUCCESS
AUTHORIZATION_POST_MERGE_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The authorization permits exactly four implementation/evidence paths and no fifth path.

---

## 3. Exact authorized implementation scope

```text
packages/kodac-runtime/bench/p3-r7/contracts.ts
packages/kodac-runtime/bench/p3-r7/context-measurement-report-binding.ts
packages/kodac-runtime/test/p3-r7-context-measurement-report-binding.test.ts
docs/planning/KODAC_P3_R7_CONTEXT_MEASUREMENT_REPORT_BINDING_EVIDENCE_2026-08-31.md
```

No predecessor P2/P3 source/test, manifest, development/holdout corpus, fixture, result file, workflow, dependency, lockfile, provider/model/evaluator configuration, persistence surface, product surface, release surface, or ruleset path is authorized to change.

---

## 4. Implemented trust boundary

```text
UNTRUSTED COMPLETE P3-R1 REQUEST
+ UNTRUSTED DECLARED P3-R2 POLICY
+ UNTRUSTED P2-R1 MANIFEST / DEVELOPMENT / HOLDOUT INPUTS
+ UNTRUSTED CLOSED P3-R6 MEASUREMENT DECLARATION
+ UNTRUSTED CLOSED P3-R7 REPORT DECLARATION
-> canonical input hardening / snapshot
-> canonical P2-R1 manifest-set validation
-> exact one-record / context-selection / seven-metric boundary
-> canonical P3-R6 reconstruction from original preimages
-> exact R6 case / result / manifest / metric-slot binding
-> canonical P2-R2 report generation from only reconstructed R6 observations
-> exact one-section / one-case / seven-slot P2-R2 report coverage validation
-> exact per-slot R6-to-P2 status/value equality
-> distinct R6 and P2-R2 observation-set digest retention
-> deterministic report-binding evidence identity
-> detached deeply frozen evidence
```

Caller-claimed serialized P3-R1 plans, P3-R2 applications, P3-R6 evidence, P2-R2 observations, or P2-R2 reports are not accepted as derivation truth.

---

## 5. Closed declaration and result contracts

Report declaration literals are exactly:

```text
version = p3-r7-context-measurement-report-binding-declaration-v1
kind = build_context_policy_measurement_report_binding
taskFamily = context-selection
```

Report declaration fields are closed to:

```text
version
kind
reportBindingId
taskFamily
caseId
r1ResultIdentity
```

Result literals are exactly:

```text
version = p3-r7-context-measurement-report-binding-evidence-v1
kind = context_policy_measurement_report_binding_evidence
```

The result binds:

```text
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

`reportEvidenceIdentity` is `sha256Canonical(...)` over the complete normalized result projection excluding only `reportEvidenceIdentity` itself.

---

## 6. Single-case report coverage

The implementation fails closed unless the validated P2-R1 manifest contains exactly one record total and that record:

- uses task family `context-selection`;
- matches the report declaration case and R1 result identity;
- declares exactly seven metrics;
- has an exact one-to-one metric-id/unit match with the seven canonical R6 dimension bindings; and
- cannot introduce any eighth, omitted, duplicate, cross-family, unknown, or unit-mismatched slot.

The implementation reconstructs one canonical R6 measurement and requires exactly seven R6 observations. It then calls canonical `runP2R2Report(...)` with only those observations and requires the generated report to contain exactly one `context-selection` section, one case, seven metric slots, and no metric whose `measurement_status` is `missing`.

Each report metric is matched back to the reconstructed R6 observation through the surrounding case/task-family identity plus exact metric id, unit, status, and value.

Canonically valid `unavailable` measurements remain allowed. P2-R2's `missing_observation_count` is not treated as a no-missing assertion because canonical P2-R2 increments that aggregate for `unavailable` observations as well as absent slots. The P3-R7 boundary instead proves the absence of synthetic missing slots by inspecting every generated report metric status directly.

---

## 7. Distinct observation-set identities

P3-R6 and P2-R2 intentionally derive observation-set identities under different canonical order contracts:

```text
P3-R6 = canonical seven-dimension order
P2-R2 = canonical normalized/sorted report observation order
```

Therefore P3-R7 retains both:

```text
r6ObservationSetDigest
p2R2ObservationSetDigest
```

It does not require them to be equal and does not reinterpret either digest. The exact P2-R2 report identity and exact R6 measurement evidence identity are both retained in the P3-R7 evidence identity.

---

## 8. Case-bound policy identity

Canonical P3-R2 `policyIdentity` binds plan/repository/snapshot/content/task fields. P3-R7 therefore retains it only as the exact case-bound policy identity reconstructed through R6.

This implementation does not create, infer, or promote a case-invariant multi-case strategy/subject identity. Any broader multi-case or mixed-family composition remains outside this authorization.

---

## 9. Determinism and hostile-input boundaries

The implementation:

- snapshots every public input through canonical JSON validation before semantic reuse;
- rejects proxies, accessors, symbols, sparse arrays, cycles, non-finite numbers, and non-canonical structures through canonical predecessor validation;
- closes the P3-R7 declaration key set and literals;
- reconstructs R6 from source preimages rather than trusting serialized intermediate evidence;
- verifies exact one-case/seven-slot P2-R2 coverage;
- retains the two authorized observation-set identities without false equality assumptions;
- derives one declaration-bound deterministic report evidence identity;
- returns detached deeply frozen evidence; and
- performs no filesystem, network, subprocess, secret, provider, model, evaluator, telemetry, persistence, clock, randomness, or environment access.

---

## 10. Focused qualification coverage

The focused test file covers at minimum:

```text
- exact R6 measurement -> generated P2-R2 report binding
- exact measurement / application / policy / manifest identities
- one context-selection section / one case / seven report slots
- canonically valid unavailable metrics without synthetic missing slots
- distinct R6 and P2-R2 observation-set digest retention
- rejection of multi-case manifests
- rejection of extra manifest metrics
- rejection of non-context-selection sole manifests
- report declaration version / kind / task-family / exact-key closure
- report declaration case / R1 result binding
- deterministic repeated output
- declaration-sensitive evidence identity
- detached deeply frozen output
- caller mutation isolation
- benign object-key-order canonicalization
- hostile accessor / proxy / sparse / cyclic input rejection
- source-preimage R6 reconstruction rather than forged intermediate evidence
```

Full repository qualification remains required on one frozen exact candidate head. This document does not pre-declare CI or semantic review success.

---

## 11. Final exact-head qualification gate

Do not merge the implementation candidate until one frozen exact head proves all of the following:

- canonical `main` remains the exact implementation base or the branch is forward-reconciled non-destructively and fully requalified;
- `behind_by=0`;
- changed-file set is exactly the four authorized paths in Section 3;
- exact head/tree/four Git blobs are captured;
- Governance `provenance` and `legacy-tests` are terminal success on the exact head;
- K2 classifies this runtime-sensitive diff correctly and Ubuntu/macOS/Windows Typecheck/Test/Patch plus stable `k2-runtime-gate` are terminal success on the exact head;
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

## 12. Preserved non-grants

```text
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK PARTICIPANT EXECUTION = NOT_AUTHORIZED
MULTI-CASE / MIXED-FAMILY / MULTI-POLICY REPORT COMPOSITION = NOT_AUTHORIZED
CASE-INVARIANT STRATEGY / SUBJECT IDENTITY = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE CREATION OR MUTATION = NOT_AUTHORIZED
REPOSITORY-OWNED GOLD TRUTH = NOT_AUTHORIZED
MODEL / PROVIDER / REVIEWER / EVALUATOR / TOOL INVOCATION = NOT_AUTHORIZED
NETWORK / SECRET / SUBPROCESS / SANDBOX EXPANSION = NOT_AUTHORIZED
REPOSITORY CRAWLING / NEW FILESYSTEM ACQUISITION = NOT_AUTHORIZED
NEW DEPENDENCIES / TOKENIZERS = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKING = NOT_AUTHORIZED
P2 OR P3 PREDECESSOR MUTATION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION = NOT_AUTHORIZED
STATISTICAL SIGNIFICANCE / HOLDOUT-SUFFICIENCY / CONTAMINATION-FREE CLAIMS = NOT_AUTHORIZED
N-WAY RANKING / LEADERBOARD / AGGREGATE QUALITY SCORE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
PUBLIC QUALITY / SUPERIORITY / RELEASE / PACKAGE CLAIM = NOT_AUTHORIZED
P3 OVERALL CLOSURE = NOT_AUTHORIZED
P3-R8+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Only after an exact implementation candidate satisfies Section 11, merges normally, and completes mandatory post-merge proof may the bounded P3-R7 implementation itself be declared `CLOSED_CANONICAL`. P3 overall remains open.
