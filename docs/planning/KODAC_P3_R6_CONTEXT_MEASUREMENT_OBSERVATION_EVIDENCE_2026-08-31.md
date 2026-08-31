# Kodac P3-R6 Context Measurement Observation Evidence — 2026-08-31

## 1. Evidence status

```text
DOCUMENT TYPE = IMPLEMENTATION / QUALIFICATION EVIDENCE CANDIDATE
P3-R6 CONTEXT MEASUREMENT OBSERVATION IMPLEMENTATION = CANDIDATE / NOT YET CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

This record accompanies only the bounded P3-R6 local deterministic measurement materializer authorized by the canonical P3-R6 authorization record. It is not benchmark execution, a benchmark result, a quality claim, a repository policy, statistical acceptance, provider/model execution, product integration, persistence, or release authority.

---

## 2. Canonical authority

The implementation branch was created from exact canonical `main` after PR #271 adoption:

```text
AUTHORIZATION_PR = #271
AUTHORIZATION_QUALIFIED_HEAD = 5412c1c8ac2629ae6d4d0c87981b3b5ce14116e0
AUTHORIZATION_QUALIFIED_TREE = bfde96cf637006e142e920b1dd3a132b11adab37
AUTHORIZATION_BLOB = 3eaf04d6e2ed558692ee1f08f0557ac6a3c4a8b1
AUTHORIZATION_MERGE / IMPLEMENTATION_BASE = 2441cf9b6006859a4bc05cfe196a033fe31b56c9
AUTHORIZATION_MERGE_TREE = bfde96cf637006e142e920b1dd3a132b11adab37
AUTHORIZATION_MERGE_PARENT_1 = 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
AUTHORIZATION_MERGE_PARENT_2 = 5412c1c8ac2629ae6d4d0c87981b3b5ce14116e0
AUTHORIZATION_MERGE_VERIFICATION = verified / valid
AUTHORIZATION_POST_MERGE_GOVERNANCE = 33416874486 / SUCCESS
AUTHORIZATION_POST_MERGE_PROVENANCE = 99569532722 / SUCCESS
AUTHORIZATION_POST_MERGE_LEGACY_TESTS = 99569532954 / SUCCESS
AUTHORIZATION_POST_MERGE_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The authorization permits exactly four implementation/evidence paths and no fifth path.

---

## 3. Exact authorized implementation scope

```text
packages/kodac-runtime/bench/p3-r6/contracts.ts
packages/kodac-runtime/bench/p3-r6/context-measurement-observation.ts
packages/kodac-runtime/test/p3-r6-context-measurement-observation.test.ts
docs/planning/KODAC_P3_R6_CONTEXT_MEASUREMENT_OBSERVATION_EVIDENCE_2026-08-31.md
```

No predecessor P2/P3 source, benchmark corpus/manifest/fixture, package metadata, lockfile, workflow, provider/model configuration, persistence surface, product surface, release surface, or ruleset path is authorized to change.

---

## 4. Implemented trust boundary

```text
UNTRUSTED COMPLETE P3-R1 REQUEST
+ UNTRUSTED DECLARED P3-R2 POLICY
+ UNTRUSTED P2-R1 MANIFEST / DEVELOPMENT / HOLDOUT INPUTS
+ UNTRUSTED CLOSED P3-R6 MEASUREMENT DECLARATION
-> canonical input hardening / snapshot
-> canonical P3-R1 reconstruction through P3-R2 application
-> canonical P2-R1 manifest-set validation
-> exact context-selection case / result / metric binding
-> exact gold / utilized candidate-set validation
-> deterministic seven-dimension measurement
-> exact seven P2-R2-compatible observations
-> deterministic declaration-bound measurement evidence identity
-> detached deeply frozen evidence
```

Caller-claimed serialized P3-R1 plans, P3-R2 applications, P3-R3 evidence, P3-R5 qualification records, benchmark reports, or downstream conclusions are not accepted as derivation truth.

---

## 5. Closed declaration and result contracts

Declaration literals are exactly:

```text
version = p3-r6-context-measurement-observation-declaration-v1
kind = build_context_policy_measurement_observations
taskFamily = context-selection
```

Declaration fields are closed to:

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

Result literals are exactly:

```text
version = p3-r6-context-measurement-observation-evidence-v1
kind = context_policy_measurement_observation_evidence
```

The result binds the complete normalized declaration and all seven observations. `measurementEvidenceIdentity` is `sha256Canonical(...)` over the complete normalized result projection excluding only `measurementEvidenceIdentity` itself. Therefore two valid declarations remain identity-distinct even if they produce equal observation values.

---

## 6. Exact seven measurement dimensions

Canonical observation order is:

```text
recall-at-k
precision-at-k
file-f1
token-budgeted-evidence-yield
no-gold-abstention
explored-vs-utilized-context
context-dilution
```

The implementation preserves the authorization semantics exactly:

- recall and precision use exact selected/gold candidate identity set intersections;
- file F1 uses unique canonical `subjectPath` sets;
- token-budgeted evidence yield uses canonical P3 UTF-8 byte accounting and introduces no tokenizer;
- no-gold abstention is available only for an empty caller gold set;
- explored-vs-utilized context requires utilized identities to be a subset of selected identities;
- context dilution is irrelevant selected UTF-8 bytes divided by selected UTF-8 bytes;
- unavailable measurements are explicit `null` values;
- `missing` is never emitted by P3-R6;
- no aggregate score, threshold, weighting, significance, confidence, ranking, winner, default, or promotion semantic is produced.

---

## 7. Determinism and hostile-input boundaries

The implementation:

- snapshots every public input through canonical JSON validation before semantic reuse;
- rejects non-canonical objects, arrays, accessors, proxies, symbols, sparse arrays, cycles, non-finite numbers, and schema drift through canonical predecessor validation;
- requires gold/utilized identities to be strictly sorted and duplicate-free;
- rejects unknown gold identities and utilized identities outside the reconstructed selected set;
- requires exactly one manifest-bound metric binding for every canonical P3-R6 dimension;
- preserves exact manifest metric units and task-family boundaries;
- derives manifest-set and observation-set digests through canonical serialization;
- returns detached deeply frozen evidence; and
- performs no filesystem, network, subprocess, secret, provider, model, evaluator, telemetry, persistence, clock, randomness, or environment access.

---

## 8. Focused qualification coverage

The focused test file covers at minimum:

```text
- exact seven-observation canonical order and P2-R2 compatibility
- authorized numeric / boolean measurement semantics
- empty-gold unavailable / no-gold behavior
- unknown / duplicate / unsorted gold identities
- utilized-subset enforcement
- declaration version / kind / task-family / exact-key closure
- exact seven dimension-to-manifest metric bindings
- metric-unit and unknown-metric rejection
- exact case / R1 result binding
- declaration-sensitive evidence identity
- deterministic repeated output
- caller-mutation detachment and deep freeze
- hostile accessor / proxy fail-closed behavior
- canonical P3-R1 / P3-R2 predecessor reconstruction
```

Full repository qualification remains required on one frozen exact candidate head. This document does not pre-declare CI or semantic review success.

---

## 9. Final exact-head qualification gate

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

## 10. Preserved non-grants

```text
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED
MODEL / PROVIDER / REVIEWER / EVALUATOR INVOCATION = NOT_AUTHORIZED
REPOSITORY-OWNED GOLD LABELS = NOT_AUTHORIZED
REPOSITORY-OWNED CONTEXT POLICY DEFAULT = NOT_AUTHORIZED
REPOSITORY-OWNED WINNER / RANKING / PROMOTION = NOT_AUTHORIZED
AGGREGATE / BLENDED SCORE = NOT_AUTHORIZED
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

Only after an exact implementation candidate satisfies Section 9, merges normally, and completes mandatory post-merge proof may the bounded P3-R6 implementation itself be declared `CLOSED_CANONICAL`. P3 overall remains open.