# Kodac P3-R8 Case-Invariant Context Strategy Subject Authorization — 2026-08-31

## 1. Authority status

```text
CLASS = AUTHORIZATION CANDIDATE / DOCUMENTATION ONLY
ACTIVE P3-R8 IMPLEMENTATION AUTHORITY = NONE UNTIL THIS EXACT RECORD BECOMES CANONICAL
REAL BENCHMARK TASK EXECUTION = NONE
MULTI-CASE REPORT / OBSERVATION AGGREGATION = NONE
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

The designation `P3-R8` is not inferred from numbering. It is justified by one concrete composition gap left explicit by canonical P3-R7: a future broader multi-case report boundary must first have a valid case-invariant subject/strategy identity, while canonical P3-R2 `policyIdentity` is intentionally bound to one exact plan/repository/snapshot/content/task preimage.

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

Canonical `docs/roadmap/NEXT.md` permits another bounded P3 definition/planning/authorization candidate only after the R7 current-view reconciliation becomes canonical and post-merge proven. PR #276 satisfies that condition through the exact merge and proof above.

Canonical P3-R7 states that a future broader multi-case or mixed-family report boundary requires a separate explicit authorization and must first define a valid case-invariant subject/strategy identity and complete P2 report-coverage semantics. This candidate addresses only the first prerequisite. Complete multi-case report coverage remains a separate future problem with no authority here.

Governing benchmark discipline remains `docs/adr/ADR-0010-benchmark-first-donor-selection.md`. This candidate creates no benchmark result and grants no promotion authority.

---

## 3. Exact authorization-candidate path

This authorization candidate may change exactly one path:

```text
docs/planning/KODAC_P3_R8_CASE_INVARIANT_CONTEXT_STRATEGY_SUBJECT_AUTHORIZATION_2026-08-31.md
```

No second path is authorized for adoption of this record.

---

## 4. Concrete remaining gap

Canonical P3-R2 policy identity includes the normalized policy fields:

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

That identity is correct for one exact application case. It cannot serve as the stable subject identity required to prove that independently bound cases used identical strategy semantics because the plan/repository/snapshot/content/task bindings vary by case.

The minimum missing mechanism is therefore:

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

If and only if this authorization becomes canonical and post-merge proven, one future P3-R8 implementation candidate may modify exactly:

```text
packages/kodac-runtime/bench/p3-r8/contracts.ts
packages/kodac-runtime/bench/p3-r8/context-strategy-subject.ts
packages/kodac-runtime/test/p3-r8-context-strategy-subject.test.ts
docs/planning/KODAC_P3_R8_CASE_INVARIANT_CONTEXT_STRATEGY_SUBJECT_EVIDENCE_2026-08-31.md
```

No fifth path is authorized.

The implementation may import canonical P3-R1/P3-R2 constants, types, and pure functions read-only. It may not modify predecessor source/tests, P2/P3 manifests/corpora/fixtures/results, workflows, dependencies, lockfiles, provider/model/evaluator configuration, persistence, telemetry, product/release surfaces, or rulesets.

---

## 6. Closed strategy declaration

The future untrusted declaration may contain exactly:

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

`strategyId` is a caller-owned stable identifier reused unchanged for every case claimed to use the same subject. It is not a repository-selected default, winner, or promotion identifier.

`lanePriority` must be a dense exact duplicate-free permutation of canonical `P3_R1_EVIDENCE_LANES`.

The numeric policy caps must be positive safe integers within canonical P3-R1 absolute limits:

```text
1 <= maxSelectedItems <= P3_R1_LIMITS.maxItems
1 <= maxSelectedUtf8Bytes <= P3_R1_LIMITS.maxUtf8Bytes
1 <= maxPerGroupingKey <= maxSelectedItems
```

A later single-case binding can succeed only when canonical P3-R2 itself accepts those exact caps against that case's rebuilt P3-R1 plan budget. P3-R8 may not widen P3-R2 budget authority.

Unknown/missing fields, unsupported literals, invalid identifiers, invalid lanes/caps, Proxy/accessor/symbol-bearing/cyclic/non-canonical inputs fail closed.

---

## 7. Closed strategy subject projection

A future pure function may be semantically equivalent to:

```text
buildContextStrategySubject(
  strategyDeclarationValue,
) -> ContextStrategySubject
```

The canonical subject result may contain exactly:

```text
version
kind
strategySubjectIdentity
strategyDeclaration
```

Required result literals:

```text
version = p3-r8-context-strategy-subject-v1
kind = context_strategy_subject
```

The normalized `strategyDeclaration` is the complete declaration from Section 6. No duplicated top-level semantic copies are permitted.

`strategySubjectIdentity` must be SHA-256 over the complete canonical projection:

```text
{
  version,
  kind,
  strategyDeclaration
}
```

and therefore excludes only `strategySubjectIdentity` itself.

The result and nested declaration/arrays must be detached from caller-owned objects and deeply frozen.

---

## 8. Case-invariance boundary

Neither the normalized strategy declaration nor the subject identity preimage may contain:

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
manifest identity / digest
measurement identity / report identity
selected / omitted candidate identities
runtime result
provider / model / evaluator identity
```

Two valid strategy declarations with identical Section 6 semantics must produce the same `strategySubjectIdentity` even when later valid case bindings have different values for every excluded case-bound field.

Any change to `strategyId`, task family, any contract version, lane order, or any of the three caps must change `strategySubjectIdentity`.

This is semantic configuration identity only. It proves no quality, superiority, benchmark success, eligibility, or promotion.

---

## 9. Closed single-case binding declaration

The future untrusted binding declaration may contain exactly:

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

`bindingId` is a caller-owned stable identifier for one binding evidence record. It is not a benchmark case ID, result ID, comparison ID, or promotion ID.

Unknown fields, unsupported literals, invalid identifiers, or subject-identity mismatch fail closed.

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

The function must perform no ambient side effect and must not accept caller-serialized P3-R1 plans or P3-R2 applications as derivation truth.

Mandatory order:

1. harden/snapshot every public input before semantic reuse;
2. reconstruct/normalize the strategy subject through canonical P3-R8 subject semantics;
3. normalize the closed binding declaration and require its subject identity to equal the reconstructed subject;
4. reconstruct canonical P3-R1 by invoking `buildContextSelectionPlan(planRequestValue)`;
5. require rebuilt P3-R1 `version == strategyDeclaration.planContractVersion`;
6. reconstruct canonical P3-R2 by invoking `applyDeclaredContextSelectionPolicy(planRequestValue, policyValue)`;
7. require normalized P3-R2 policy `version == strategyDeclaration.policyContractVersion` and reconstructed application `version == strategyDeclaration.applicationContractVersion`;
8. require P3-R2 `policyId == strategyDeclaration.strategyId`;
9. require application `lanePriority`, `maxSelectedItems`, `maxSelectedUtf8Bytes`, and `maxPerGroupingKey` to exactly equal the strategy declaration;
10. retain the exact reconstructed `policyIdentity`, `applicationIdentity`, and case-bound plan/request/candidate-set/repository/snapshot/content/task identities as binding evidence only;
11. never incorporate those case-bound identities into `strategySubjectIdentity`;
12. derive one deterministic `bindingEvidenceIdentity` from the complete normalized binding result projection excluding only that identity; and
13. return detached deeply frozen output.

Any canonical P3-R1/P3-R2 validation failure remains a P3-R8 binding failure. P3-R8 may not reinterpret or relax predecessor validation.

---

## 11. Future binding result

A future binding result may contain exactly deterministic fields equivalent to:

```text
version
kind
bindingEvidenceIdentity
bindingDeclaration
strategySubject
strategySubjectIdentity
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

Required result literals:

```text
version = p3-r8-context-strategy-case-binding-evidence-v1
kind = context_strategy_case_binding_evidence
```

`strategySubject` must be the complete canonical P3-R8 subject record. The case-bound identities prove which exact P3-R1/P3-R2 application was bound; they do not specialize or mutate the subject identity.

`bindingEvidenceIdentity` must bind the complete normalized result projection, including `bindingDeclaration` and `strategySubject`, excluding only `bindingEvidenceIdentity` itself.

---

## 12. Required invariants and tests

The future implementation must prove at least:

```text
SAME NORMALIZED STRATEGY SEMANTICS ACROSS DISTINCT VALID CASES
-> SAME strategySubjectIdentity

ANY strategyId / contract-version / lane-order / cap CHANGE
-> DIFFERENT strategySubjectIdentity

CASE-BOUND IDENTITY CHANGE ONLY
-> strategySubjectIdentity UNCHANGED
-> bindingEvidenceIdentity CHANGED

P3-R2 policyId != strategyId
-> FAIL CLOSED

P3-R2 lanePriority OR ANY CAP != strategy declaration
-> FAIL CLOSED
```

Tests must include two independently reconstructed valid P3-R1/P3-R2 cases with different plan/request/repository/snapshot/content/task identities that bind to one identical strategy subject. The test must not combine their observations, reports, or scores.

Tests must also cover deterministic repeatability, benign object-key-order invariance, Proxy/accessor/symbol/cycle rejection, unknown fields, invalid literals/identifiers/lanes/caps, subject mismatch, forged serialized intermediate attempts, deep-freeze/detachment, input mutation after call entry, and absence of ambient filesystem/network/process/persistence side effects.

---

## 13. Explicit non-grants

This authorization does not grant:

```text
REAL BENCHMARK TASK / PARTICIPANT EXECUTION
MULTI-CASE REPORT / OBSERVATION / SCORE AGGREGATION
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

## 14. Future implementation evidence requirements

A future implementation evidence record must bind at least:

```text
CANONICAL BASE MAIN / TREE
AUTHORIZATION PR / MERGE / BLOB / POST-MERGE PROOF
EXACT IMPLEMENTATION HEAD / TREE
EXACT FOUR ALLOWED PATHS / BLOBS
CANONICAL P3-R1 CONTRACT / IMPLEMENTATION BLOBS
CANONICAL P3-R2 CONTRACT / IMPLEMENTATION BLOBS
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

Synthetic/local contract tests cannot establish benchmark quality, comparison, promotion, or P3 closure.

---

## 15. Authorization adoption gate

This documentation-only candidate must not merge until one frozen exact head proves:

1. current canonical `main` remains the exact baseline above or the branch is forward-reconciled and fully requalified;
2. `behind_by=0`;
3. exactly one changed path: this authorization record;
4. exact candidate head/tree/document blob captured in current PR metadata;
5. Governance `provenance` and `legacy-tests` terminal success;
6. K2 `runtime-change-classifier` and `k2-runtime-gate` terminal success, with runtime honestly represented as skipped/non-applicable for docs-only scope when observed;
7. at least two distinct independent external substantive semantic review channels terminal-clean on exact head/current metadata;
8. zero unresolved actionable material findings and review threads;
9. ruleset `20707483` active/no-bypass;
10. guarded normal merge with exact expected head; and
11. mandatory post-merge canonical main/ordered parents/tree/authorization blob/signature/applicable checks/PR state/ruleset proof before this record grants implementation authority.

Any repository-byte change invalidates prior exact-head CI/review evidence. Any material metadata change requires semantic requalification against current metadata before merge.

No force-push, rebase, stale evidence reuse, review waiver, bypass, or silent waiver. `WAIVER=NO`.

---

## 16. Adoption result if fully proven

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
