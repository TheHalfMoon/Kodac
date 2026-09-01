# Kodac P3-R9 Single-Strategy Two-Case Report Composition Authorization — 2026-09-01

## 1. Authority status

```text
CLASS = AUTHORIZATION CANDIDATE / DOCUMENTATION ONLY
ACTIVE P3-R9 IMPLEMENTATION AUTHORITY = NONE UNTIL THIS EXACT RECORD BECOMES CANONICAL
REAL BENCHMARK TASK / PARTICIPANT EXECUTION = NONE
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NONE
MULTI-CASE SCORE / METRIC / OBSERVATION REDUCTION = NONE
MULTI-STRATEGY COMPARISON / RANKING / PROMOTION = NONE
REPOSITORY-OWNED DEFAULT / WINNER = NONE
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NONE
DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / TELEMETRY / LEARNING = NONE
PRODUCT / CLI / API / AGENT-LOOP INTEGRATION = NONE
PUBLIC QUALITY / SUPERIORITY / RELEASE CLAIM = NONE
RULESET CHANGE / BYPASS = NONE
WAIVER = NO
```

This record proposes one bounded future P3-R9 mechanism. It is not implementation authority while it exists only on a branch or pull request. It becomes effective only after its own exact-head qualification, at least two distinct independent external substantive semantic review channels, guarded normal merge using the exact expected head, and complete post-merge adoption proof.

The designation `P3-R9` is not inferred from numbering. It is justified by one concrete composition gap left explicit by canonical P3-R7 and P3-R8:

```text
P3-R7 = one fully covered single-case P2-R2 report bound to one reconstructed P3-R6 measurement
P3-R8 = one case-invariant strategy subject plus one exact single-case P3-R1/P3-R2 binding
MISSING = one proof-preserving record showing that two independently reconstructed P3-R7 reports are attached to the same exact P3-R8 strategy subject without reducing, comparing, scoring, ranking, or promoting them
```

This candidate intentionally supports exactly **two** distinct cases. Two cases are the minimum sufficient evidence needed to prove cross-case composition semantics. Three-or-more-case collection, arbitrary N-case collection, score aggregation, strategy comparison, benchmark execution, ranking, and promotion remain separate future problems requiring separate canonical authority.

---

## 2. Exact canonical baseline and sequencing proof

```text
CANONICAL_MAIN = ff7a474f73b9efacab4eceafd210c67488987b64
CANONICAL_MAIN_TREE = 6b379b438af86fc7ed7c72fdf22b87f0f3ef8f7b

P3_R1_THROUGH_R8 = CLOSED_CANONICAL
P3_R8_IMPLEMENTATION_PR = #278
P3_R8_IMPLEMENTATION_MERGE = 576ac5d2b317fb90d1f0c6079d78cd3d899ca62d
P3_R8_H4_REPAIR_PR = #280
P3_R8_H4_REPAIR_MERGE = 89d294035923c3c8682e5a94360cb4e01d271a9c
P3_R8_CURRENT_VIEW_RECONCILIATION_PR = #281
P3_R8_CURRENT_VIEW_RECONCILIATION_QUALIFIED_HEAD = df72caa8962c93878f321a845083d2440ef40716
P3_R8_CURRENT_VIEW_RECONCILIATION_MERGE = ff7a474f73b9efacab4eceafd210c67488987b64
P3_R8_CURRENT_VIEW_RECONCILIATION_MERGE_VERIFICATION = verified / valid
P3_R8_CURRENT_VIEW_RECONCILIATION_SEMANTIC_REVIEW = CodeRabbit 5491167420 + Cubic 5491390653
P3_R8_CURRENT_VIEW_RECONCILIATION_POST_MERGE_GOVERNANCE = 33488985456 / SUCCESS
P3_R8_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROVENANCE = 99795704487 / SUCCESS
P3_R8_CURRENT_VIEW_RECONCILIATION_POST_MERGE_LEGACY_TESTS = 99795704237 / SUCCESS
P3_R8_CURRENT_VIEW_RECONCILIATION_POST_MERGE_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER

P3_OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P3_R9_IMPLEMENTATION = NOT_AUTHORIZED BEFORE THIS MORE-SPECIFIC RECORD BECOMES CANONICAL
P3_R10_PLUS_IMPLEMENTATION = NOT_AUTHORIZED
P4_P8_IMPLEMENTATION = NOT_AUTHORIZED
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical `AGENTS.md` requires:

```text
POST-MERGE PROOF
-> ROADMAP RECONCILIATION
-> NEXT AUTHORIZED UNIT
```

PR #281 and its recorded post-merge proof satisfy the R8 reconciliation boundary. Canonical `docs/roadmap/NEXT.md` then permits only evidence-driven definition/planning/authorization-candidate work after a concrete canonical gap is proven. This record is that candidate; it does not infer implementation authority from roadmap prose.

Governing benchmark discipline remains `docs/adr/ADR-0010-benchmark-first-donor-selection.md`. This record creates no benchmark result and grants no winner/default/promotion authority.

---

## 3. Exact authorization-candidate path

This authorization candidate may change exactly one path:

```text
docs/planning/KODAC_P3_R9_SINGLE_STRATEGY_TWO_CASE_REPORT_COMPOSITION_AUTHORIZATION_2026-09-01.md
```

No second path is authorized for adoption of this record.

---

## 4. Canonical predecessor semantics

Canonical P3-R7 exports one pure deterministic boundary:

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

Its result contains exact case/report identities including:

```text
policyIdentity
applicationIdentity
measurementEvidenceIdentity
caseId
r1ResultIdentity
p2R2ReportIdentity
reportEvidenceIdentity
```

Canonical P3-R8 exports two pure deterministic boundaries:

```text
buildContextStrategySubject(
  strategyDeclarationValue,
) -> ContextStrategySubject

bindContextStrategySubjectToDeclaredPolicy(
  planRequestValue,
  policyValue,
  strategySubjectValue,
  bindingDeclarationValue,
) -> ContextStrategyCaseBindingEvidence
```

P3-R8 binding evidence contains exact case-bound P3-R1/P3-R2 identities including:

```text
policyIdentity
applicationIdentity
planIdentity
requestIdentity
candidateSetIdentity
repositoryIdentity
snapshotIdentity
contentIdentity
taskIdentity
bindingEvidenceIdentity
```

It intentionally does **not** carry P3-R7 `caseId` or `r1ResultIdentity` fields. Therefore P3-R9 must never pretend those fields are present in P3-R8. The proof that one reconstructed P3-R7 report and one reconstructed P3-R8 binding describe the same policy application is the exact shared pair:

```text
R7.policyIdentity == R8.policyIdentity
R7.applicationIdentity == R8.applicationIdentity
```

The P3-R7 `caseId` and `r1ResultIdentity` remain P3-R7/P2 report-bound identities and are retained separately in each P3-R9 member.

---

## 5. Concrete remaining gap

Canonical P3-R7 proves:

```text
ONE EXACT CASE
+ ONE CANONICALLY RECONSTRUCTED P3-R6 MEASUREMENT
-> ONE FULLY COVERED P2-R2 REPORT
-> ONE P3-R7 REPORT EVIDENCE IDENTITY
```

Canonical P3-R8 proves:

```text
ONE CLOSED STRATEGY DECLARATION
-> ONE CASE-INVARIANT strategySubjectIdentity

ONE EXACT P3-R1 / P3-R2 CASE
+ THAT SUBJECT
-> ONE CASE-BOUND bindingEvidenceIdentity
```

R8 tests already prove that two valid cases can retain one `strategySubjectIdentity`. No canonical P3 record currently composes the corresponding independently reconstructed R7 report evidence with the R8 case-binding evidence under that one subject.

The minimum missing mechanism is:

```text
ONE STRATEGY DECLARATION
-> CANONICAL R8 SUBJECT

CASE A ORIGINAL PREIMAGES
-> CANONICAL R7(A)
-> CANONICAL R8_BINDING(A)
-> REQUIRE R7(A).policyIdentity/applicationIdentity == R8_BINDING(A).policyIdentity/applicationIdentity

CASE B ORIGINAL PREIMAGES
-> CANONICAL R7(B)
-> CANONICAL R8_BINDING(B)
-> REQUIRE R7(B).policyIdentity/applicationIdentity == R8_BINDING(B).policyIdentity/applicationIdentity

R8_BINDING(A).strategySubjectIdentity == R8_BINDING(B).strategySubjectIdentity
-> ONE DETERMINISTIC TWO-CASE COMPOSITION EVIDENCE RECORD
```

The composition proves only membership, identity continuity, two distinct R7 case boundaries, and complete single-case report coverage for each member. It must not calculate any total, mean, median, weighted score, threshold, pass/fail, preference, comparison, ranking, or promotion field.

---

## 6. Exact future implementation allowlist

If and only if this authorization becomes canonical and post-merge proven, one future P3-R9 implementation candidate may modify exactly these four paths:

```text
packages/kodac-runtime/bench/p3-r9/contracts.ts
packages/kodac-runtime/bench/p3-r9/single-strategy-two-case-report-composition.ts
packages/kodac-runtime/test/p3-r9-single-strategy-two-case-report-composition.test.ts
docs/planning/KODAC_P3_R9_SINGLE_STRATEGY_TWO_CASE_REPORT_COMPOSITION_EVIDENCE_2026-09-01.md
```

No fifth path is authorized.

Canonical P3-R1, P3-R2, P3-R6, P3-R7, and P3-R8 source/tests/evidence remain read-only. The future implementation may import their pure functions, constants, and types but may not modify them.

No manifest, development/holdout corpus, fixture, benchmark result file, workflow, dependency, lockfile, provider/model/evaluator configuration, persistence layer, product surface, release surface, or ruleset may change in this slice.

---

## 7. Closed composition declaration

A future untrusted composition declaration may contain exactly:

```text
version
kind
compositionId
strategySubjectIdentity
memberA
memberB
```

Required literals:

```text
version = p3-r9-single-strategy-two-case-report-composition-declaration-v1
kind = compose_single_strategy_two_case_reports
```

`compositionId` is a caller-owned stable identifier for this evidence record. It is not a benchmark ID, score ID, comparison ID, promotion ID, winner ID, or release ID.

Each member declaration may contain exactly:

```text
memberId
caseId
r1ResultIdentity
```

Both members must use canonical identifiers. `memberId` must differ across A/B. `caseId` must differ across A/B. `r1ResultIdentity` must differ across A/B. Repeating one case under two member IDs fails closed.

Unknown fields, missing fields, unsupported literals, duplicate members, non-canonical identifiers, or subject-identity mismatch fail closed.

---

## 8. Closed future case input bundle

Each future `case*Inputs` value may contain exactly the original inputs needed to reconstruct one P3-R7 report and one P3-R8 case binding:

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

The whitespace above is descriptive only; the eventual TypeScript contract must use the exact field name `development`.

No caller-serialized P3-R1 plan, P3-R2 application, P3-R6 evidence, P3-R7 evidence, P3-R8 subject, or P3-R8 binding evidence may be accepted as derivation truth inside the bundle.

The same top-level `strategyDeclarationValue` is used to canonically rebuild the strategy subject for both member bindings.

---

## 9. Future pure boundary

A future pure function may be semantically equivalent to:

```text
composeSingleStrategyTwoCaseReports(
  strategyDeclarationValue,
  compositionDeclarationValue,
  caseAInputs,
  caseBInputs,
) -> SingleStrategyTwoCaseReportCompositionEvidence
```

The function must perform no ambient side effect.

The strategy subject must be canonically rebuilt by invoking:

```text
buildContextStrategySubject(strategyDeclarationValue)
```

P3-R9 must not trust a caller-supplied serialized `ContextStrategySubject` as top-level subject derivation truth.

---

## 10. Mandatory deterministic procedure

The future implementation must:

1. harden/snapshot every public input before semantic reuse;
2. canonically rebuild the P3-R8 strategy subject from `strategyDeclarationValue`;
3. require the rebuilt subject identity to equal `compositionDeclaration.strategySubjectIdentity`;
4. normalize the closed two-member declaration and require exactly two distinct members;
5. independently reconstruct canonical P3-R7 report evidence for case A by invoking canonical `buildContextPolicyMeasurementReportBinding(...)` with A's original inputs;
6. independently reconstruct canonical P3-R8 case-binding evidence for case A by invoking canonical `bindContextStrategySubjectToDeclaredPolicy(...)` with A's original plan/policy inputs, the canonically rebuilt subject, and A's binding declaration;
7. require A's R7 `caseId` and `r1ResultIdentity` to equal A's declared member `caseId` and `r1ResultIdentity`;
8. require A's R7 `policyIdentity` to equal A's R8 binding `policyIdentity`;
9. require A's R7 `applicationIdentity` to equal A's R8 binding `applicationIdentity`;
10. repeat steps 5-9 independently for case B;
11. require A and B to have different `caseId`, different `r1ResultIdentity`, different P3-R7 `reportEvidenceIdentity`, and different P3-R8 `bindingEvidenceIdentity` values;
12. require both R8 case bindings to carry the exact rebuilt `strategySubjectIdentity` and the exact same normalized strategy declaration;
13. retain each member's exact P3-R7 report evidence identity, P2-R2 report identity, P3-R6 measurement evidence identity, P3-R8 binding evidence identity, P3-R2 policy/application identities, P3-R7 case ID, and P3-R7 R1 result identity without reinterpretation;
14. preserve the declaration member order as the caller-declared composition order; canonical identity must bind that order explicitly rather than silently sort cases;
15. derive one deterministic `compositionEvidenceIdentity` from the complete normalized result projection excluding only that identity itself; and
16. return a detached deeply frozen result.

The future implementation must not merge member observations, merge P2-R2 metric arrays, add numeric fields across members, average or normalize values, assign weights, compare members, compare strategies, evaluate thresholds, emit pass/fail, select a preferred case, or select/promote a strategy.

---

## 11. Future result semantics

A future `SingleStrategyTwoCaseReportCompositionEvidence` may contain only deterministic identity/binding fields equivalent to:

```text
version
kind
compositionEvidenceIdentity
compositionDeclaration
compositionId
strategySubject
strategySubjectIdentity
memberA
memberB
```

Required result literals:

```text
version = p3-r9-single-strategy-two-case-report-composition-evidence-v1
kind = single_strategy_two_case_report_composition_evidence
```

Each result member may contain only exact canonical references/records equivalent to:

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

Nested P3-R7/P3-R8 evidence remains canonical predecessor evidence. P3-R9 proves only that the two independently reconstructed member records are two distinct declared P3-R7 cases whose corresponding P3-R8 bindings belong to one exact strategy subject. It creates no aggregate quality semantics.

No result field named or semantically equivalent to any of these is permitted:

```text
score
total
average
mean
median
weight
threshold
rank
winner
preferred
pass
fail
accept
reject
promotion
default
```

---

## 12. Required invariants and tests

A future implementation must prove at least:

```text
TWO DISTINCT VALID R7 CASES
+ IDENTICAL NORMALIZED R8 STRATEGY SEMANTICS
-> SAME strategySubjectIdentity
-> DISTINCT reportEvidenceIdentity VALUES
-> DISTINCT bindingEvidenceIdentity VALUES
-> PER-MEMBER R7 policyIdentity/applicationIdentity MATCH R8 binding policyIdentity/applicationIdentity
-> ONE DETERMINISTIC compositionEvidenceIdentity

ANY MEMBER CASE / R1 RESULT / REPORT / BINDING CHANGE
-> compositionEvidenceIdentity CHANGES

ANY STRATEGY SEMANTIC CHANGE
-> strategySubjectIdentity CHANGES
-> compositionEvidenceIdentity CHANGES

DUPLICATED CASE MEMBERSHIP
-> FAIL CLOSED

R7 policyIdentity/applicationIdentity DO NOT MATCH CORRESPONDING R8 BINDING
-> FAIL CLOSED

ANY ATTEMPT TO SUPPLY FORGED SERIALIZED R7/R8 INTERMEDIATE TRUTH
-> FAIL CLOSED
```

Tests must include:

- two independently reconstructed valid `context-selection` cases using one exact strategy declaration;
- one member containing valid `observed` and `unavailable` R7 metrics without any P3-R9 reduction of those statuses;
- deterministic repeatability;
- explicit caller order binding: `A,B` and `B,A` produce different composition identities while retaining the same two canonical member identities;
- Proxy/accessor/symbol/cycle rejection;
- unknown/missing fields and invalid identifiers;
- duplicate member/case/R1-result rejection;
- R7/R8 `policyIdentity` mismatch rejection;
- R7/R8 `applicationIdentity` mismatch rejection;
- strategy subject identity mismatch rejection;
- forged serialized predecessor intermediate rejection;
- deep-freeze/detachment and input-mutation isolation; and
- absence of ambient filesystem/network/process/persistence side effects.

---

## 13. Explicit non-grants

This authorization does not grant:

```text
REAL BENCHMARK TASK / PARTICIPANT EXECUTION
BENCHMARK CORPUS / MANIFEST / FIXTURE CREATION OR MUTATION
THREE-OR-MORE-CASE / UNBOUNDED COLLECTION COMPOSITION
MULTI-CASE OBSERVATION / METRIC / SCORE AGGREGATION OR REDUCTION
MIXED-FAMILY AGGREGATION
MULTI-STRATEGY COMPOSITION
PAIRWISE OR N-WAY STRATEGY COMPARISON
LEADERBOARD / GLOBAL RANKING
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION
REPOSITORY-OWNED GOLD TRUTH
HIDDEN SCORE / WEIGHT / THRESHOLD / TOLERANCE
STATISTICAL SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY
HOLDOUT SUFFICIENCY / UNBIASEDNESS / CONTAMINATION-FREE CLAIM
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL INVOCATION
NETWORK / SECRET / SUBPROCESS / SANDBOX EXPANSION
REPOSITORY CRAWLING OR NEW FILESYSTEM ACQUISITION
CROSS-REPOSITORY DATA ACCESS OR AGGREGATION
NEW DEPENDENCIES / TOKENIZERS / DONOR INTAKE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD
TRAINING / FINE-TUNING / ONLINE LEARNING
EMBEDDINGS / VECTOR DB / LEARNED RERANKING
P2/P3 PREDECESSOR MUTATION
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION
PUBLIC QUALITY / SUPERIORITY / RELEASE / PACKAGE / BRAND CLAIM
P3 OVERALL CLOSURE
P3-R10+ IMPLEMENTATION
P4-P8 IMPLEMENTATION
RULESET CHANGE / BYPASS
WAIVER
```

The fact that two reports can be composed under one stable subject is not evidence that the strategy is good, better, benchmark-qualified, eligible for promotion, or suitable as a repository default.

---

## 14. Future implementation evidence requirements

A future implementation evidence record must bind at least:

```text
CANONICAL BASE MAIN / TREE
AUTHORIZATION PR / MERGE / BLOB / POST-MERGE PROOF
EXACT IMPLEMENTATION HEAD / TREE
EXACT FOUR ALLOWED PATHS / BLOBS
CANONICAL P3-R7 CONTRACT / IMPLEMENTATION / TEST / EVIDENCE BLOBS
CANONICAL P3-R8 CONTRACT / IMPLEMENTATION / TEST / EVIDENCE BLOBS
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

- canonical `main` is still the exact base or the branch is forward-reconciled and fully requalified;
- `behind_by=0`;
- exactly one changed path, the authorization record in Section 3;
- exact candidate head/tree/blob recorded in the PR body;
- Governance `provenance` and `legacy-tests` terminal success;
- K2 classifier + stable `k2-runtime-gate` terminal success with docs-only runtime applicability represented honestly;
- at least two distinct independent external substantive semantic channels terminal-clean on the exact head and current metadata;
- zero unresolved material findings and actionable review threads;
- ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never`;
- guarded normal merge using the exact expected head SHA; and
- mandatory post-merge main/ordered-parent/tree/blob/signature/applicable-check/ruleset proof before P3-R9 implementation becomes authorized.

No force-push, rebase, stale evidence reuse, reviewer-cardinality reduction, bypass, or silent waiver.

---

## 16. Post-adoption meaning

If this exact record becomes canonical and post-merge proven, then and only then:

```text
P3-R9 SINGLE-STRATEGY TWO-CASE REPORT COMPOSITION IMPLEMENTATION = AUTHORIZED
P3-R9 IMPLEMENTATION = NOT YET CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P3-R10+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

No implementation work may begin from this branch/PR candidate before canonical adoption proof.
