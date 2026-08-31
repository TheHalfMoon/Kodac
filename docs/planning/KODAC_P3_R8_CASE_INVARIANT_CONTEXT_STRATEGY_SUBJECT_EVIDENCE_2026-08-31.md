# Kodac P3-R8 Case-Invariant Context Strategy Subject Evidence — 2026-08-31

## 1. Evidence status

```text
DOCUMENT TYPE = IMPLEMENTATION / QUALIFICATION EVIDENCE CANDIDATE
P3-R8 CASE-INVARIANT CONTEXT STRATEGY SUBJECT = CANDIDATE / NOT YET CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
MULTI-CASE REPORT / OBSERVATION / SCORE AGGREGATION = NOT_AUTHORIZED
N-WAY STRATEGY COMPARISON / RANKING / PROMOTION = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
P3-R9+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

This record accompanies only the bounded P3-R8 pure deterministic strategy-subject and single-case binding implementation authorized by canonical PR #277. It is not benchmark execution, aggregation, comparison, ranking, promotion, a repository-owned default, provider/model/evaluator work, persistence, product integration, release authority, or P3 closure.

---

## 2. Canonical authority

The implementation candidate is based on exact canonical `main` after PR #277 adoption:

```text
AUTHORIZATION_PR = #277
AUTHORIZATION_QUALIFIED_HEAD = bce85fc8fb6388ff97c94823a2f1f41c542185a1
AUTHORIZATION_QUALIFIED_TREE = a8a30c2ba628ac74cb60669b2c9ae0c9311fc965
AUTHORIZATION_BLOB = 0aca958a000b195313d9c4f88c4d036bcda7c030
AUTHORIZATION_MERGE / IMPLEMENTATION_BASE = e6890265c11fa3adbd14671d09b2c04b76f78954
AUTHORIZATION_MERGE_TREE = a8a30c2ba628ac74cb60669b2c9ae0c9311fc965
AUTHORIZATION_MERGE_PARENT_1 = e1bbbf31cac4bdbb8c31dc7c3c3ff1fff3b760cb
AUTHORIZATION_MERGE_PARENT_2 = bce85fc8fb6388ff97c94823a2f1f41c542185a1
AUTHORIZATION_MERGE_VERIFICATION = verified / valid
AUTHORIZATION_POST_MERGE_GOVERNANCE = 33435126431 / SUCCESS
AUTHORIZATION_POST_MERGE_PROVENANCE = 99629536977 / SUCCESS
AUTHORIZATION_POST_MERGE_LEGACY_TESTS = 99629537239 / SUCCESS
AUTHORIZATION_POST_MERGE_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
AUTHORIZATION_POST_MERGE_PROOF_COMMENT = #277 / 5484007566
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The authorization permits exactly four implementation/evidence paths and no fifth path.

---

## 3. Exact authorized implementation scope

```text
packages/kodac-runtime/bench/p3-r8/contracts.ts
packages/kodac-runtime/bench/p3-r8/context-strategy-subject.ts
packages/kodac-runtime/test/p3-r8-context-strategy-subject.test.ts
docs/planning/KODAC_P3_R8_CASE_INVARIANT_CONTEXT_STRATEGY_SUBJECT_EVIDENCE_2026-08-31.md
```

No predecessor P2/P3 source/test, manifest, corpus, fixture, result, workflow, dependency, lockfile, provider/model/evaluator configuration, persistence surface, product surface, release surface, or ruleset path is authorized to change.

---

## 4. Implemented strategy subject boundary

```text
UNTRUSTED CLOSED STRATEGY DECLARATION
-> canonical hostile-input snapshot
-> exact declaration key/literal validation
-> exact task-family and P3-R1/P3-R2 contract-version binding
-> exact canonical lane permutation validation
-> exact bounded positive policy caps
-> canonical projection {version, kind, strategyDeclaration}
-> deterministic SHA-256 strategySubjectIdentity
-> detached deeply frozen ContextStrategySubject
```

The strategy declaration contains only configuration semantics:

```text
version
kind
strategyId
taskFamily
planContractVersion
policyContractVersion
applicationContractVersion
lanePriority
maxSelectedItems
maxSelectedUtf8Bytes
maxPerGroupingKey
```

No plan/request/candidate-set/repository/snapshot/content/task/case/R1/manifest/measurement/report/selected/omitted/provider/model/evaluator identity enters the strategy subject identity preimage.

Therefore two independently reconstructed cases using the same normalized strategy semantics produce the same `strategySubjectIdentity`. Any strategy-id, contract-version, lane-order, or cap change changes that subject identity.

This identity proves configuration equality only. It does not prove quality, benchmark success, superiority, eligibility, ranking, or promotion.

---

## 5. Implemented single-case binding boundary

```text
UNTRUSTED COMPLETE P3-R1 REQUEST
+ UNTRUSTED DECLARED P3-R2 POLICY
+ UNTRUSTED CANONICALIZABLE P3-R8 STRATEGY SUBJECT
+ UNTRUSTED CLOSED P3-R8 BINDING DECLARATION
-> snapshot every public input before semantic reuse
-> rebuild canonical P3-R8 strategy subject
-> require exact subject identity in binding declaration
-> rebuild canonical P3-R1 through buildContextSelectionPlan(...)
-> require exact P3-R1 plan contract version
-> rebuild canonical P3-R2 through applyDeclaredContextSelectionPolicy(...)
-> require exact P3-R2 policy and application contract versions
-> require policyId == strategyId
-> require exact lane permutation equality
-> require exact three-cap equality
-> retain exact case-bound P3-R1/P3-R2 identities as evidence only
-> deterministic bindingEvidenceIdentity over complete normalized result projection
-> detached deeply frozen ContextStrategyCaseBindingEvidence
```

Caller-serialized P3-R1 plans or P3-R2 applications are not accepted as derivation truth. Passing those records in place of the source preimages fails at canonical predecessor validation.

The implementation does not weaken any P3-R1 or P3-R2 validation rule. A predecessor validation failure remains a P3-R8 binding failure.

---

## 6. Closed contracts and identities

Strategy declaration literals:

```text
version = p3-r8-context-strategy-subject-declaration-v1
kind = define_context_strategy_subject
taskFamily = context-selection
planContractVersion = p3-r1-context-selection-plan-v1
policyContractVersion = p3-r2-declared-context-selection-policy-v1
applicationContractVersion = p3-r2-context-selection-policy-application-v1
```

Strategy subject literals:

```text
version = p3-r8-context-strategy-subject-v1
kind = context_strategy_subject
```

The subject identity preimage is exactly:

```text
{
  version,
  kind,
  strategyDeclaration
}
```

Binding declaration literals:

```text
version = p3-r8-context-strategy-case-binding-declaration-v1
kind = bind_context_strategy_subject_to_declared_policy
```

Binding result literals:

```text
version = p3-r8-context-strategy-case-binding-evidence-v1
kind = context_strategy_case_binding_evidence
```

The binding result retains exactly the normalized binding declaration, complete strategy subject, subject identity, canonical policy/application identities, and canonical plan/request/candidate-set/repository/snapshot/content/task identities. `bindingEvidenceIdentity` is SHA-256 over the complete normalized result projection excluding only that identity itself.

---

## 7. Case-invariance proof boundary

The focused tests construct two complete valid P3-R1 request preimages with different:

```text
planIdentity
requestIdentity
candidateSetIdentity
repositoryIdentity
snapshotIdentity
contentIdentity
taskIdentity
policyIdentity
applicationIdentity
```

Both are bound to one identical strategy declaration and therefore one identical `strategySubjectIdentity`.

The two binding evidence identities are required to differ. No observations, reports, scores, benchmark results, or case collections are combined by this test or by the implementation.

---

## 8. Hostile-input and immutability boundary

The implementation snapshots public inputs through the canonical P2-R1 JSON hardening path before semantic reuse. This rejects non-canonical structures including proxies, accessors, symbols, sparse arrays, cycles, non-finite/non-JSON values, and invalid object shapes before they can influence P3-R8 semantics.

P3-R8 then additionally enforces:

- exact declaration key sets;
- exact contract literals;
- bounded stable identifiers;
- exact duplicate-free canonical lane permutation;
- bounded positive safe-integer caps;
- exact subject-identity binding;
- canonical P3-R1/P3-R2 reconstruction;
- exact strategy-to-policy semantic equality; and
- detached deeply frozen results.

Focused tests mutate original caller-owned declaration data after construction and require returned records to remain unchanged and deeply frozen.

---

## 9. Ambient side-effect boundary

The P3-R8 module is pure local computation. It performs no filesystem reads/writes, network calls, subprocess execution, secret access, provider/model/evaluator calls, persistence, telemetry, upload, repository crawling, clock access, randomness, or environment-based decision making.

Focused tests execute the binding while ambient `fetch`, clock, randomness, and environment reads are configured to fail if used. K2 runtime qualification and patch-benchmark hooks remain the broader repository-owned execution proof boundary.

No new dependency or tokenizer is introduced.

---

## 10. Focused qualification coverage

The focused test file covers at minimum:

```text
- same normalized strategy semantics across two independently reconstructed valid cases
  -> same strategySubjectIdentity
- case-bound identity changes only
  -> strategySubjectIdentity unchanged
  -> bindingEvidenceIdentity changed
- deterministic repeatability
- benign object-key-order invariance
- strategyId semantic change -> different subject identity
- lane-order semantic change -> different subject identity
- each cap semantic change -> different subject identity
- exact canonical P3-R1/P3-R2 identity reconstruction
- P3-R2 policyId mismatch -> fail closed
- P3-R2 lane mismatch -> fail closed
- P3-R2 cap mismatch -> fail closed
- subject identity mismatch -> fail closed
- forged serialized P3-R1/P3-R2 intermediate attempts -> fail closed
- unknown fields and invalid literals/ids/lanes/caps -> fail closed
- Proxy/accessor/symbol/sparse/cyclic hostile inputs -> fail closed
- detached deeply frozen output
- caller mutation isolation
- no ambient fetch/clock/randomness/environment dependency
```

Full exact-head qualification is still required. This evidence candidate does not pre-declare focused tests, full runtime tests, typecheck, patch benchmark, CI, K2, or semantic review success.

---

## 11. Final exact-head qualification gate

Do not merge the implementation candidate until one frozen exact head proves all of the following:

- canonical `main` remains the exact implementation base or the branch is forward-reconciled non-destructively and fully requalified;
- `behind_by=0`;
- changed-file set is exactly the four authorized paths in Section 3;
- exact head/tree/four Git blobs are captured;
- focused P3-R8 test command is terminal success;
- full runtime test command is terminal success;
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

## 12. Preserved non-grants

```text
REAL BENCHMARK TASK / PARTICIPANT EXECUTION = NOT_AUTHORIZED
MULTI-CASE REPORT / OBSERVATION / SCORE AGGREGATION = NOT_AUTHORIZED
MIXED-FAMILY AGGREGATION = NOT_AUTHORIZED
N-WAY STRATEGY COMPARISON = NOT_AUTHORIZED
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
P3-R9+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Only after one exact implementation candidate satisfies Section 11, merges normally, and completes mandatory post-merge proof may the bounded P3-R8 implementation itself be declared `CLOSED_CANONICAL`. P3 overall remains open.
