# Kodac P3-R8 Case-Invariant Context Strategy Subject Authorization — 2026-08-31

## 1. Authority status

```text
CLASS = AUTHORIZATION CANDIDATE / DOCUMENTATION ONLY
ACTIVE P3-R8 IMPLEMENTATION AUTHORITY = NONE UNTIL THIS EXACT RECORD BECOMES CANONICAL
REAL BENCHMARK TASK EXECUTION = NONE
MULTI-CASE REPORT AGGREGATION = NONE
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NONE
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NONE
DEPENDENCY ADMISSION = NONE
PERSISTENCE / TELEMETRY / LEARNING = NONE
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NONE
PRODUCT / CLI / API / AGENT-LOOP INTEGRATION = NONE
PUBLIC QUALITY / SUPERIORITY / RELEASE CLAIM = NONE
RULESET CHANGE / BYPASS = NONE
WAIVER = NO
```

This record proposes one bounded future P3 mechanism. It is not effective implementation authority while it exists only on a branch or pull request. It becomes effective only after its own exact-head qualification, guarded normal merge, and complete post-merge adoption proof.

The designation `P3-R8` is not inferred from numbering. It is justified by one concrete composition gap left explicit by canonical P3-R7: a future broader multi-case report boundary must first have a valid case-invariant subject/strategy identity, while canonical P3-R2 `policyIdentity` is deliberately case-bound through plan/repository/snapshot/content/task identities.

This candidate addresses only that identity gap and one single-case proof binding from the new subject identity to one canonically reconstructed P3-R2 application. It does **not** authorize multi-case aggregation, benchmark execution, comparison, ranking, promotion, or any repository-owned strategy decision.

---

## 2. Exact canonical baseline and sequencing proof

```text
CANONICAL_MAIN = e1bbbf31cac4bdbb8c31dc7c3c3ff1fff3b760cb

P3_R1_THROUGH_R7 = CLOSED_CANONICAL
P3_R7_IMPLEMENTATION_PR = #275
P3_R7_IMPLEMENTATION_MERGE = e3933fdc9932b43b4864a0d608845acbc4ad7f08
P3_R7_CURRENT_VIEW_RECONCILIATION_PR = #276
P3_R7_CURRENT_VIEW_RECONCILIATION_QUALIFIED_HEAD = 94808232398186d816e09aa7eac8b6e8fc1d955d
P3_R7_CURRENT_VIEW_RECONCILIATION_QUALIFIED_TREE = 59b8806e85f6031cabd90b5c9e2e908bd1e81a6b
P3_R7_CURRENT_VIEW_RECONCILIATION_MERGE = e1bbbf31cac4bdbb8c31dc7c3c3ff1fff3b760cb
P3_R7_CURRENT_VIEW_RECONCILIATION_POST_MERGE_GOVERNANCE = 33431849695 / SUCCESS
P3_R7_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROVENANCE = 99618828886 / SUCCESS
P3_R7_CURRENT_VIEW_RECONCILIATION_POST_MERGE_LEGACY_TESTS = 99618828598 / SUCCESS
P3_R7_CURRENT_VIEW_RECONCILIATION_POST_MERGE_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
P3_R7_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF_COMMENT = #276 / 5483779818

P3_OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P3_R8_PLUS_IMPLEMENTATION = NOT_AUTHORIZED BEFORE A MORE-SPECIFIC RECORD BECOMES CANONICAL
P4_P8_IMPLEMENTATION = NOT_AUTHORIZED
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical `docs/roadmap/NEXT.md` permits another bounded P3 definition/planning/authorization candidate only after the R7 current-view reconciliation becomes canonical and post-merge proven. PR #276 now satisfies that condition through the exact merge and proof above.

Canonical P3-R7 also states that a future broader multi-case or mixed-family report boundary requires a separate explicit authorization and must first define a valid case-invariant subject/strategy identity and complete P2 report-coverage semantics. This candidate addresses only the first prerequisite. Complete multi-case report coverage remains a separate future problem with no authority here.

Governing benchmark discipline remains `docs/adr/ADR-0010-benchmark-first-donor-selection.md`: configuration identities must be explicit and broad superiority/promotion claims require reproducible evidence. This candidate creates no such evidence and grants no promotion authority.

Live GitHub truth, root `AGENTS.md`, canonical `docs/roadmap/NEXT.md`, governing ADRs, canonical predecessor records, and this record after canonical adoption remain controlling.

---

## 3. Exact authorization-candidate path

This authorization candidate may change exactly one path:

```text
docs/planning/KODAC_P3_R8_CASE_INVARIANT_CONTEXT_STRATEGY_SUBJECT_AUTHORIZATION_2026-08-31.md
```

No second path is authorized for adoption of this record.

---

## 4. Concrete remaining gap

Canonical P3-R2 currently defines a caller-declared policy whose identity includes:

```text
policyId
planIdentity
repositoryIdentity
snapshotIdentity
contentIdentity
taskIdentity
lanePriority
maxSelectedItems
maxSelectedUtf8Bytes
maxPerGroupingKey
```

That identity is correct for one exact application case, but it cannot serve as the stable subject identity required to say that multiple independently bound cases used the same strategy semantics. In particular, `planIdentity`, `repositoryIdentity`, `snapshotIdentity`, `contentIdentity`, and `taskIdentity` vary with the case/revision/context preimage.

Canonical P3-R7 therefore intentionally stops at a single case and explicitly refuses to invent a cross-case strategy identity.

The smallest next mechanism is:

```text
ONE CLOSED CASE-INVARIANT STRATEGY DECLARATION
-> ONE DETERMINISTIC STRATEGY SUBJECT IDENTITY

ONE EXACT P3-R1 REQUEST PREIMAGE
+ ONE EXACT CALLER-DECLARED P3-R2 POLICY
+ ONE CANONICAL STRATEGY SUBJECT
-> ONE SINGLE-CASE STRATEGY-TO-POLICY BINDING EVIDENCE RECORD
```

No collection of case bindings is produced or accepted by this slice.

---

## 5. Exact future implementation allowlist

If and only if this authorization becomes canonical and post-merge proven, one future P3-R8 implementation candidate may modify exactly these four paths:

```text
packages/kodac-runtime/bench/p3-r8/contracts.ts
packages/kodac-runtime/bench/p3-r8/context-strategy-subject.ts
packages/kodac-runtime/test/p3-r8-context-strategy-subject.test.ts
docs/planning/KODAC_P3_R8_CASE_INVARIANT_CONTEXT_STRATEGY_SUBJECT_EVIDENCE_2026-08-31.md
```

No fifth path is authorized.

The future implementation may import canonical P3-R1/P3-R2 contracts and functions, but it may not modify predecessor source/tests, P2/P3 manifests or corpora, fixtures, result files, workflows, dependencies, lockfiles, provider/model/evaluator configuration, persistence, telemetry, product surfaces, release surfaces, or rulesets.

---

## 6. Closed strategy subject declaration

The future strategy declaration may contain exactly these semantic fields:

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

Required literals:

```text
version = p3-r8-context-strategy-subject-declaration-v1
kind = define_context_strategy_subject
taskFamily = context-selection
planContractVersion = p3-r1-context-selection-plan-v1
policyContractVersion = p3-r2-declared-context-selection-policy-v1
applicationContractVersion = p3-r2-context-selection-policy-application-v1
```

`strategyId` is a caller-owned stable identifier that must be reused unchanged for every case claimed to use the same subject. It is not a repository-selected default or winner.

`lanePriority` must be an exact duplicate-free permutation of canonical `P3_R1_EVIDENCE_LANES`.

The three numeric policy caps must be positive safe integers and must remain within canonical P3-R1 absolute limits:

```text
maxSelectedItems <= P3_R1_LIMITS.maxItems
maxSelectedUtf8Bytes <= P3_R1_LIMITS.maxUtf8Bytes
maxPerGroupingKey <= maxSelectedItems
```

Unknown fields, missing fields, unsupported literals, duplicate lanes, non-canonical identifiers, invalid integers, proxies, accessors, symbol-bearing values, cyclic values, or other non-canonical inputs fail closed.

---

## 7. Case-invariance boundary

The strategy subject identity must be derived only from the complete normalized declaration in Section 6.

The strategy declaration and `strategySubjectIdentity` must contain **none** of these case-bound fields:

```text
planIdentity
requestIdentity
candidateSetIdentity
repositoryIdentity
snapshotIdentity
contentIdentity
taskIdentity
caseId
r1ResultIdentity
manifest identity / manifest digest
measurement identity / report identity
selected candidate identities
omitted candidate identities
runtime result
provider/model/evaluator identity
```

This exclusion is semantic, not cosmetic. Two valid cases that share the exact Section 6 declaration must produce the same `strategySubjectIdentity` even when all of the excluded case-bound identities differ.

Conversely, any change to `strategyId`, contract versions, task family, lane order, or any of the three caps must change `strategySubjectIdentity`.

This record does not claim that a subject is good, optimal, supported by a benchmark, or eligible for promotion. It proves only semantic configuration identity.

---

## 8. Future strategy subject result

A future pure function may be semantically equivalent to:

```text
buildContextStrategySubject(
  strategyDeclarationValue,
) -> ContextStrategySubject
```

The normalized result may contain only fields equivalent to:

```text
version
kind
strategySubjectIdentity
strategyDeclaration
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

Required result literals must be closed and versioned.

`strategySubjectIdentity` must be SHA-256 over the complete normalized result projection excluding only `strategySubjectIdentity` itself. The returned declaration and arrays must be detached from caller-owned objects and deeply frozen.

---

## 9. Closed single-case binding declaration

The future single-case binding declaration may contain exactly:

```text
version
kind
bindingId
strategySubjectIdentity
```

Required literals:

```text
version = p3-r8-context-strategy-case-binding-declaration-v1
kind = bind_context_strategy_subject_to_declared_policy
```

`bindingId` is a caller-owned stable identifier for this one binding evidence record. It is not a benchmark case ID, result ID, promotion ID, or repository decision.

The declaration must bind the exact canonical strategy subject identity supplied to the function. Unknown fields or mismatches fail closed.

---

## 10. Future single-case binding function

A future pure function may be semantically equivalent to:

```text
bindContextStrategySubjectToDeclaredPolicy(
  planRequestValue,
  policyValue,
  strategySubjectValue,
  bindingDeclarationValue,
) -> ContextStrategyCaseBindingEvidence
```

The function must perform no ambient side effect.

It must reconstruct canonical P3-R1/P3-R2 state from original preimages rather than trusting caller-serialized plan or application results.

Caller-supplied serialized P3-R1 plans or P3-R2 applications must never substitute for canonical reconstruction.

---

## 11. Mandatory deterministic binding procedure

The future binding implementation must:

1. harden/snapshot every public input before semantic reuse;
2. normalize/reconstruct the strategy subject through canonical P3-R8 subject semantics;
3. normalize the closed binding declaration and require its `strategySubjectIdentity` to equal the reconstructed subject identity;
4. reconstruct the canonical P3-R1 plan from the complete request preimage using `buildContextSelectionPlan(...)`;
5. reconstruct the canonical P3-R2 application by invoking `applyDeclaredContextSelectionPolicy(planRequestValue, policyValue)`;
6. require P3-R2 policy/application contract versions to equal the versions bound by the strategy subject;
7. require the reconstructed P3-R2 `policyId` to equal the subject `strategyId`;
8. require the reconstructed policy/application `lanePriority` to exactly equal the subject lane permutation;
9. require `maxSelectedItems`, `maxSelectedUtf8Bytes`, and `maxPerGroupingKey` to exactly equal the subject values;
10. retain the exact reconstructed P3-R2 `policyIdentity`, `applicationIdentity`, and all case-bound plan/request/repository/snapshot/content/task identities as evidence fields only;
11. never incorporate those case-bound fields into `strategySubjectIdentity`;
12. derive one deterministic binding evidence identity from the complete normalized binding result projection excluding only its own identity; and
13. return detached deeply frozen output.

The function must not compare one case to another, accept an array of cases, produce an aggregate report, execute a benchmark participant, or infer promotion/quality.

---

## 12. Future binding result semantics

A future `ContextStrategyCaseBindingEvidence` may contain only deterministic fields equivalent to:

```text
version
kind
bindingEvidenceIdentity
bindingDeclaration
bindingId
strategySubject
strategySubjectIdentity
strategyId
policyIdentity
applicationIdentity
planIdentity
requestIdentity
candidateSetIdentity
repositoryIdentity
snapshotIdentity
contentIdentity
taskIdentity
```

The nested `strategySubject` is the complete canonical P3-R8 subject record.

The case-bound identities prove which exact P3-R1/P3-R2 application was bound. They do not mutate or specialize the case-invariant subject identity.

`bindingEvidenceIdentity` must bind the complete normalized subject plus the exact case-bound evidence projection and exclude only `bindingEvidenceIdentity` itself.

---

## 13. Required invariants

The future implementation must establish at least:

```text
SAME NORMALIZED STRATEGY DECLARATION ACROSS DISTINCT VALID CASES
-> SAME strategySubjectIdentity

ANY STRATEGY SEMANTICS CHANGE
-> DIFFERENT strategySubjectIdentity

CASE-BOUND IDENTITY CHANGE ONLY
-> strategySubjectIdentity UNCHANGED
-> bindingEvidenceIdentity CHANGED

P3-R2 policyId != strategyId
-> FAIL CLOSED

P3-R2 lanePriority OR ANY CAP != subject declaration
-> FAIL CLOSED
```

The tests must demonstrate two independently reconstructed cases with different plan/request/repository/snapshot/content/task identities that bind to one identical strategy subject without combining their observations or reports.

That test is an identity/binding proof only. It is not multi-case benchmark execution or aggregation.

---

## 14. Edge-case discipline

The future implementation must fail closed for at least:

- Proxy/accessor/symbol-bearing/cyclic/non-canonical public inputs;
- unknown or extra declaration fields;
- unsupported version/kind/task-family/contract-version literals;
- invalid or duplicate lane permutations;
- invalid, zero, negative, unsafe, or out-of-bound numeric caps;
- `maxPerGroupingKey > maxSelectedItems`;
- non-canonical `strategyId`, `bindingId`, or identity fields;
- binding declaration subject mismatch;
- any canonical P3-R1 reconstruction failure;
- any canonical P3-R2 reconstruction failure;
- P3-R2 `policyId` mismatch from subject `strategyId`;
- P3-R2 lane-order or cap mismatch;
- caller-forged serialized plan/application attempts;
- input mutation after call entry affecting semantics;
- mutation attempts against returned subject/binding evidence; and
- any ambient filesystem/network/process/persistence side effect.

Positive tests must include deterministic repeatability, benign caller object-key-order invariance, deep-freeze/detachment, subject identity stability across distinct valid case-bound preimages, and binding identity sensitivity to case-bound identity changes.

---

## 15. Explicit non-grants

This authorization does not grant:

```text
REAL BENCHMARK TASK / PARTICIPANT EXECUTION
MULTI-CASE REPORT OR OBSERVATION AGGREGATION
MIXED-FAMILY AGGREGATION
N-WAY STRATEGY COMPARISON
LEADERBOARD / GLOBAL RANKING
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION
BENCHMARK CORPUS / MANIFEST / FIXTURE CREATION OR MUTATION
REPOSITORY-OWNED GOLD TRUTH
STATISTICAL SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY
HOLDOUT SUFFICIENCY / UNBIASEDNESS / CONTAMINATION-FREE CLAIM
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL INVOCATION
NETWORK / SECRET / SUBPROCESS / SANDBOX EXPANSION
REPOSITORY CRAWLING OR NEW FILESYSTEM ACQUISITION
CROSS-REPOSITORY DATA ACCESS OR AGGREGATION
NEW DEPENDENCIES / TOKENIZERS
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD
TRAINING / FINE-TUNING / ONLINE LEARNING
EMBEDDINGS / VECTOR DB / LEARNED RERANKING
P2/P3 PREDECESSOR MUTATION
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION
PUBLIC QUALITY / SUPERIORITY / RELEASE / PACKAGE / BRAND CLAIM
P3 OVERALL CLOSURE
P3-R9+ IMPLEMENTATION
P4-P8 IMPLEMENTATION
RULESET CHANGE / BYPASS
WAIVER
```

The fact that one subject identity can be reused across independently supplied cases is not authority to access, execute, combine, compare, persist, or promote those cases.

---

## 16. Future implementation evidence requirements

A future implementation evidence record must bind at least:

```text
CANONICAL BASE MAIN / TREE
AUTHORIZATION PR / MERGE / BLOB / POST-MERGE PROOF
EXACT IMPLEMENTATION HEAD / TREE
EXACT FOUR ALLOWED PATHS / BLOBS
P3-R1 CONTRACT BLOB
P3-R2 CONTRACT + IMPLEMENTATION BLOBS
FOCUSED TEST COMMAND / RESULT
FULL RUNTIME TEST COMMAND / RESULT
TYPECHECK RESULT
PATCH BENCHMARK HOOK RESULT
GOVERNANCE RUN / JOB IDS
K2 RUN / CLASSIFIER / OS MATRIX / STABLE GATE IDS
SEMANTIC REVIEW QUORUM
UNRESOLVED ACTIONABLE THREAD COUNT
RULESET STATE
WAIVER = NO
```

No evidence record may claim real benchmark quality, comparison, promotion, or P3 closure from synthetic/local contract tests.

---

## 17. Authorization adoption gate

This documentation-only authorization candidate must not merge until one frozen exact head proves:

1. current canonical `main` remains the exact baseline above or the candidate is forward-reconciled and fully requalified;
2. `behind_by=0`;
3. exactly one changed path: this authorization record;
4. exact candidate head/tree/document blob captured;
5. Governance `provenance` and `legacy-tests` terminal success;
6. K2 `runtime-change-classifier` and `k2-runtime-gate` terminal success, with runtime matrix honestly represented as skipped/non-applicable for the docs-only PR if that is the observed state;
7. at least two distinct independent external substantive semantic review channels terminal-clean on the exact head and current PR metadata;
8. zero unresolved actionable material findings and review threads;
9. ruleset `20707483` remains active with no bypass actors and `current_user_can_bypass=never`;
10. guarded normal merge with the exact expected head; and
11. mandatory post-merge canonical `main`, ordered parents, tree, authorization blob, signature, applicable checks, PR state, and ruleset proof before this record grants any implementation authority.

Any repository-byte change invalidates prior exact-head CI/review evidence. Any material metadata change requires semantic requalification against the current metadata before merge.

No force-push, rebase, stale evidence reuse, review waiver, bypass, or silent waiver. `WAIVER=NO`.

---

## 18. Adoption result if fully proven

Only after this exact record is merged and completely post-merge proven may the following become true:

```text
P3-R8 CASE-INVARIANT CONTEXT STRATEGY SUBJECT IMPLEMENTATION = AUTHORIZED
IMPLEMENTATION ALLOWLIST = EXACTLY FOUR PATHS IN SECTION 5
REAL BENCHMARK EXECUTION = NOT_AUTHORIZED
MULTI-CASE AGGREGATION = NOT_AUTHORIZED
STRATEGY COMPARISON / PROMOTION = NOT_AUTHORIZED
P3 OVERALL = OPEN
P3-R9+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

Until then:

```text
P3-R8 IMPLEMENTATION = NOT_AUTHORIZED
```
