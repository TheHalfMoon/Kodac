# Kodac P3-R16 — Declared Directional-Relation Criterion-Match Evidence Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY**  
Date: 2026-09-02  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Deny-by-default status

This record proposes exactly one bounded future P3-R16 implementation gate. It is documentation/governance only while it remains a branch or pull-request candidate.

```text
P3-R1 THROUGH P3-R15 = CLOSED_CANONICAL
P3-R15 CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P3-R16 IMPLEMENTATION = NOT_AUTHORIZED WHILE THIS RECORD IS NON-CANONICAL
P3-R17+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

Effective P3-R16 implementation authority may exist only after this exact authorization record is qualified on one frozen exact head, merged normally into protected `main` with exact expected-head protection, and post-merge proven.

---

## 2. Exact canonical baseline

```text
CANONICAL_MAIN_AT_CANDIDATE_START = f6270d62ffcd06cbf780e24d37173d0d575665fe
P3_R15_IMPLEMENTATION_PR = #302
P3_R15_IMPLEMENTATION_MERGE = ffc9fae7f3bbb309fa5318e8747e7969726d8a1e
P3_R15_POST_MERGE_PROOF = #302 / 5513965094

P3_R15_CURRENT_VIEW_RECONCILIATION_PR = #304
P3_R15_CURRENT_VIEW_RECONCILIATION_QUALIFIED_HEAD = 6ed8df62eeefdcf62e83abb88023d62337d78bdc
P3_R15_CURRENT_VIEW_RECONCILIATION_QUALIFIED_TREE = 470284f1891269ae6ad731c35ee3eaf4e52b1163
P3_R15_CURRENT_VIEW_RECONCILIATION_MERGE = f6270d62ffcd06cbf780e24d37173d0d575665fe
P3_R15_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #304 / 5514505520
P3_R16_SUCCESSOR_ANALYSIS = #304 / 5514563852

RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Live GitHub and more-specific canonical records override this snapshot if repository state moves before qualification.

---

## 3. Exact authorization-candidate scope

This authorization candidate may modify exactly one path:

```text
docs/planning/KODAC_P3_R16_DECLARED_DIRECTIONAL_RELATION_CRITERION_MATCH_AUTHORIZATION_2026-09-02.md
```

No second path is authorized for this authorization unit.

This candidate may not modify runtime source, tests, predecessor authorization/evidence, current-view pages, workflows, dependencies, lockfiles, benchmark corpus/manifest/fixtures, provider/model configuration, persistence, product/release surfaces, or rulesets.

---

## 4. Observed canonical gap

Canonical P3-R15 reconstructs the complete trusted late-chain strategy comparison and emits exactly one trusted relation per canonical dimension:

```text
LEFT_FAVORED_BY_DIRECTION
RIGHT_FAVORED_BY_DIRECTION
EQUAL_RAW_VALUE
INSUFFICIENT_EVIDENCE
```

The durable P3 goal requires evidence that selective context improves or matches accepted quality without unacceptable dilution/regression. R15 provides the actual measured directional relations, but the late P3 chain has no canonical mechanism that applies an explicit caller-declared relation-acceptance envelope to that trusted R15 evidence.

Therefore the minimum missing evidence boundary is:

```text
ONE TRUSTED P3-R15 DIRECTIONAL-RELATION EVIDENCE RECORD
+ ONE EXPLICIT CALLER-DECLARED SEVEN-DIMENSION RELATION-CRITERIA POLICY
-> PER-DIMENSION DECLARED-CRITERION MATCH EVIDENCE
-> ONE CLOSED LOGICAL CRITERIA STATE
```

This gap is evidence-derived and is not inferred from sequence or numbering.

---

## 5. Why canonical P3-R5 does not close this gap

Canonical P3-R5 is the internal precedent for caller-declared criterion matching. It accepts exactly seven metric criteria with explicit allowed-relation sets and distinguishes `SATISFIED`, `NOT_SATISFIED`, and `INSUFFICIENT_EVIDENCE` before deriving a closed criteria state.

However, P3-R5 consumes canonical P3-R3/P3-R4 evidence from the earlier bounded P3 chain. Canonical P3-R14 explicitly records that P3-R3 cannot substitute for the later chain because P3-R3 consumes caller-materialized P2 comparison evidence and does not prove the independently reconstructed:

```text
P3-R6 measurement materialization
-> P3-R7 report binding
-> P3-R8 strategy subject identity
-> P3-R9 exactly-two-case composition
-> P3-R10 metric alignment
-> P3-R11 reduction-policy binding
-> P3-R12 reduction evidence
-> P3-R13 direction binding
-> P3-R14 controlled pairwise comparison
-> P3-R15 directional relation evidence
```

Using P3-R5 as though it qualified R15 would bypass late-chain identities and controlled-input equality proofs.

P3-R16 may reuse only the narrow caller-declared relation-criterion semantics from R5. It must reconstruct trusted R15 and must not trust or substitute serialized P3-R3, P3-R5, P3-R14, or P3-R15 evidence supplied by the caller.

---

## 6. Internal planning and ADR precedent

The durable master plan requires:

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

and states that P3 promotion eventually requires benchmark evidence that selective context improves or matches accepted quality without unacceptable dilution/regression.

The final gap review requires task-family metrics rather than one blended score and identifies context dilution as a material risk. ADR-0010 requires reproducible evidence for contested component choices and keeps context recall, precision, file F1, token efficiency, and related dimensions independently visible.

P3-R16 therefore applies explicit caller-owned guardrail criteria to already-trusted R15 relations. It does not choose the guardrails for the caller and does not own promotion authority.

---

## 7. External precedent relevant to scope

External evidence is planning evidence only and creates no repository authority or dependency admission.

Relevant precedent includes:

- **ContextBench** — arXiv:2602.05892 — evaluates context recall, precision, and efficiency separately and reports substantial explored-versus-utilized context gaps.
- **SWE-PRBench** — arXiv:2603.26130 — reports attention dilution and degraded review quality as richer context is added under evaluated configurations.
- **Agent Retrieval Bench** — arXiv:2607.24882 — reports that no single retrieval family dominates across positive retrieval, recall, and budgeted context-yield measures.
- **Risk-aware product decisions in A/B tests with multiple metrics** — arXiv:2402.11609 — separates success and guardrail metric roles. P3-R16 does not import that paper's statistical testing machinery.
- **SmartChoices** — arXiv:2304.13033 — discusses explicit metric constraints as an interpretable alternative to fixing one scalarized tradeoff. P3-R16 imports no learned policy, optimizer, or scalarization mechanism.

These references support explicit per-dimension criteria rather than an assumed universal scalar score. They do not justify weighting, Pareto selection, ranking, promotion, or superiority claims.

---

## 8. Exact future public boundary

Only after this authorization becomes canonical and post-merge proven may one future implementation expose one pure deterministic builder semantically equivalent to:

```text
buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence(
  leftReconstructionValue: unknown,
  rightReconstructionValue: unknown,
  comparisonDeclarationValue: unknown,
  criterionDeclarationValue: unknown,
) -> DeclaredStrategyDirectionalRelationCriterionMatchEvidence
```

The public runtime contract is **exactly four arguments**.

Mandatory procedure:

```text
1. reject arguments.length !== 4 before invoking any predecessor or reading any caller root
2. pass the first three caller roots directly to canonical buildStrategyReductionDirectionalRelationEvidence(...)
3. perform no independent semantic read from those three roots before or after the R15 call
4. treat only the detached deeply frozen returned R15 evidence as trusted directional-relation truth
5. snapshot and validate the fourth criterion declaration through the repository canonical JSON boundary
6. require exactly seven declared dimension criteria in canonical P3_R6_DIMENSIONS order
7. require exact dimension + metricId binding to trusted R15 relation entries
8. validate each allowedRelations set under the closed rules below
9. derive one criterion state per dimension from trusted R15 relation + caller-declared allowedRelations only
10. derive one closed logical root criteria state with the exact total precedence below
11. preserve the complete trusted R15 evidence as one nested immutable predecessor record
12. derive one deterministic self-reference-free R16 evidence identity
13. return detached deeply frozen R16 evidence
```

R16 must not implement a competing R14/R15 reconstruction or relation derivation path.

---

## 9. Closed criterion declaration

The future untrusted declaration may contain exactly:

```text
version
kind
criterionSetId
criterionPolicyIdentity
dimensionCriteria
```

Required literals:

```text
version = p3-r16-declared-directional-relation-criterion-declaration-v1
kind = declare_strategy_directional_relation_criteria
```

`criterionSetId` is one caller-owned stable identifier. It is not a repository policy/default/winner identifier.

`criterionPolicyIdentity` must use the repository lowercase `sha256:<64 hex>` identity grammar and is caller-owned policy identity evidence. R16 must bind it literally and must not derive repository policy authority from it.

`dimensionCriteria` contains exactly seven entries in canonical P3-R6 dimension order.

Each dimension criterion contains exactly:

```text
dimension
metricId
allowedRelations
```

For each index:

```text
dimension == trusted R15 dimensionRelations[index].dimension
metricId == trusted R15 dimensionRelations[index].metricId
```

`allowedRelations` must be a non-empty, strictly lexically sorted, duplicate-free subset of exactly:

```text
EQUAL_RAW_VALUE
LEFT_FAVORED_BY_DIRECTION
RIGHT_FAVORED_BY_DIRECTION
```

`INSUFFICIENT_EVIDENCE` is never an allowed satisfied relation.

No wildcard, alias, default relation, threshold, epsilon, tolerance, weight, score, numeric target, margin, confidence, p-value, effect-size, or free-form expression is authorized.

---

## 10. Per-dimension criterion semantics

For every trusted R15 dimension relation and its corresponding validated caller criterion:

```text
if trusted relation == INSUFFICIENT_EVIDENCE:
  criterionState = INSUFFICIENT_EVIDENCE

else if trusted relation is in allowedRelations:
  criterionState = SATISFIED

else:
  criterionState = NOT_SATISFIED
```

The only per-dimension criterion states are:

```text
SATISFIED
NOT_SATISFIED
INSUFFICIENT_EVIDENCE
```

R16 must not reinterpret raw values, raw deltas, directions, reduction statuses, or comparison statuses independently. The trusted R15 relation is the sole observed relation input to membership evaluation.

---

## 11. Closed logical root state

The future R16 root may derive exactly one logical criteria state with this total precedence:

```text
1. ANY dimension criterionState == INSUFFICIENT_EVIDENCE
   -> INSUFFICIENT_DIRECTIONAL_EVIDENCE

2. OTHERWISE ANY dimension criterionState == NOT_SATISFIED
   -> ONE_OR_MORE_DECLARED_RELATION_CRITERIA_NOT_SATISFIED

3. OTHERWISE
   -> ALL_DECLARED_RELATION_CRITERIA_SATISFIED
```

This state is only a deterministic logical conjunction over one caller-owned declaration and one trusted R15 evidence record.

It is not a numeric aggregate, score, weighted result, majority, Pareto/dominance decision, statistical result, global better/worse verdict, promotion, recommendation, winner, default, release decision, or repository policy.

---

## 12. Exact future output contract

The future R16 root contains exactly:

```text
version
kind
criterionMatchEvidenceIdentity
criterionSetId
criterionPolicyIdentity
directionalRelationEvidenceIdentity
comparisonId
leftStrategySubjectIdentity
rightStrategySubjectIdentity
benchmarkId
benchmarkProtocolVersion
criterionDeclaration
directionalRelationEvidence
dimensionCriterionResults
criterionMatchEvidenceState
```

Required literals:

```text
version = p3-r16-declared-directional-relation-criterion-match-evidence-v1
kind = declared_strategy_directional_relation_criterion_match_evidence
```

Bindings:

```text
directionalRelationEvidenceIdentity
  == directionalRelationEvidence.directionalRelationEvidenceIdentity
comparisonId
  == directionalRelationEvidence.comparisonId
leftStrategySubjectIdentity
  == directionalRelationEvidence.leftStrategySubjectIdentity
rightStrategySubjectIdentity
  == directionalRelationEvidence.rightStrategySubjectIdentity
benchmarkId
  == directionalRelationEvidence.benchmarkId
benchmarkProtocolVersion
  == directionalRelationEvidence.benchmarkProtocolVersion
criterionSetId
  == criterionDeclaration.criterionSetId
criterionPolicyIdentity
  == criterionDeclaration.criterionPolicyIdentity
```

`directionalRelationEvidence` is the complete detached trusted output returned by canonical P3-R15.

`dimensionCriterionResults` contains exactly seven entries in canonical order. Each result contains exactly:

```text
dimension
metricId
observedRelation
allowedRelations
criterionState
```

The result's `dimension`, `metricId`, and `observedRelation` must equal the corresponding trusted R15 relation entry. `allowedRelations` must equal the validated normalized caller declaration entry. No other semantic projection is authorized.

---

## 13. Deterministic identity and immutability

`criterionMatchEvidenceIdentity` must be one lowercase `sha256:<64 hex>` over a canonical self-reference-free projection containing every R16 root field except `criterionMatchEvidenceIdentity` itself.

That projection includes the complete normalized criterion declaration, complete trusted nested R15 evidence, all seven criterion results, and the root logical state.

Requirements:

- deterministic canonical JSON identity using repository-local hashing discipline;
- exact R15 orientation preserved;
- exact dimension order preserved;
- caller criterion policy identity included;
- every allowedRelations set and derived state included;
- no timestamp, filesystem path, random value, process state, object identity, environment value, network result, or mutable ambient state in identity;
- returned root, declaration, nested R15 evidence, results, arrays, and nested children deeply frozen/detached.

Caller mutation after invocation must not change returned evidence.

---

## 14. Fail-closed requirements

A future implementation must reject or fail closed at minimum when:

- runtime argument count is not exactly four;
- canonical P3-R15 rejects any of the first three caller roots;
- the criterion declaration is not canonical JSON or contains accessors/proxies/symbols/non-enumerable/sparse/cyclic/non-plain structures prohibited by repository canonicalization;
- declaration root keys differ from the exact contract;
- declaration version/kind are unsupported;
- criterionSetId or criterionPolicyIdentity is invalid;
- dimensionCriteria cardinality is not exactly seven;
- dimension order differs from canonical P3_R6_DIMENSIONS;
- dimension/metricId differs from trusted R15 at any index;
- allowedRelations is empty, unsorted, duplicate-bearing, or contains an unsupported relation;
- `INSUFFICIENT_EVIDENCE` appears in allowedRelations;
- a caller attempts to inject observedRelation, criterionState, root criteria state, or serialized R15 evidence as truth;
- trusted R15 relation vocabulary or dimension topology is impossible/inconsistent;
- an implementation path attempts raw-value reinterpretation, weighting, scoring, majority voting, Pareto/dominance, numeric thresholding, statistics, or multi-strategy comparison.

No sorting repair, default relation, silent duplicate removal, tolerance, coercion, best-effort repair, predecessor-field renaming, or alternate reconstruction path is authorized.

---

## 15. Exact future implementation allowlist

If and only if this authorization record becomes canonical and post-merge proven, one future P3-R16 implementation candidate may modify exactly these four paths:

```text
packages/kodac-runtime/bench/p3-r16/contracts.ts
packages/kodac-runtime/bench/p3-r16/declared-directional-relation-criterion-match.ts
packages/kodac-runtime/test/p3-r16-declared-directional-relation-criterion-match.test.ts
docs/planning/KODAC_P3_R16_DECLARED_DIRECTIONAL_RELATION_CRITERION_MATCH_EVIDENCE_2026-09-02.md
```

No fifth path is authorized.

The implementation may import canonical predecessor constants/types/pure functions read-only. It may not modify any P2/P3 predecessor source/tests/evidence, roadmap/status files, workflows, dependencies, lockfiles, benchmark corpora/manifests/fixtures/results, provider/model configuration, persistence, product/release surfaces, or rulesets.

---

## 16. Focused proof obligations for the future implementation

A future implementation test suite must prove at minimum:

- exact four-argument public arity before predecessor invocation or caller-root semantic reads;
- direct delegation of the first three untrusted roots to canonical R15;
- no caller-supplied serialized R15 substitution;
- canonical-JSON hardening for the criterion declaration;
- exact declaration root and criterion key sets;
- exactly seven criteria in canonical dimension order;
- exact dimension + metricId binding to trusted R15;
- non-empty sorted duplicate-free allowedRelations;
- rejection of `INSUFFICIENT_EVIDENCE` as an allowed satisfied relation;
- literal observed relation projection from trusted R15;
- `SATISFIED`, `NOT_SATISFIED`, and `INSUFFICIENT_EVIDENCE` per-dimension behavior;
- root insufficiency precedence over mixed insufficient/not-satisfied states;
- root not-satisfied state when no dimension is insufficient and any criterion does not match;
- all-satisfied state only when every one of seven trusted relations satisfies its corresponding declaration;
- exact preservation of R15 orientation and complete trusted nested R15 evidence;
- criterion identity sensitivity to R15 identity, criterion policy identity, allowedRelations, observed relations, per-dimension states, and root state;
- object insertion-order neutrality;
- caller-mutation detachment and deep freeze;
- hostile accessor/proxy/symbol/non-canonical declaration rejection without semantic side effects;
- absence of raw-value reinterpretation, score/weight/majority/Pareto/dominance/statistics/threshold semantics;
- absence of provider/model/reviewer/evaluator/network/subprocess/filesystem-write/database/telemetry/learning/product/release execution surfaces.

Tests may use only in-memory synthetic inputs plus existing committed read-only fixtures unless a later more-specific authorization admits additional artifacts.

---

## 17. Explicit non-grants

```text
CALLER DECLARED CRITERIA != REPOSITORY POLICY
ALL_DECLARED_RELATION_CRITERIA_SATISFIED != GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR
ALL_DECLARED_RELATION_CRITERIA_SATISFIED != PROMOTION / RECOMMENDATION / WINNER / DEFAULT
EQUAL_RAW_VALUE != STATISTICAL OR PRACTICAL EQUIVALENCE
CROSS-DIMENSION NUMERIC AGGREGATE / SCORE = NOT_AUTHORIZED
WEIGHTING / MAJORITY / PARETO / DOMINANCE POLICY = NOT_AUTHORIZED
NUMERIC THRESHOLD / MARGIN / EPSILON / TOLERANCE = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED
PROVENANCE / CHRONOLOGY / CONTAMINATION QUALIFICATION IN R16 = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PRODUCT / CLI / API / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
P3 OVERALL CLOSURE = NOT_ESTABLISHED
P3-R17+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

R16 does not reuse P3-R5 provenance criteria. A future composition/binding of late-chain metric qualification with provenance evidence requires separate evidence and authority.

---

## 18. Authorization-candidate qualification contract

Before this authorization record may become canonical, one unchanged exact PR head must prove:

```text
BASE = current canonical main
BEHIND_BY = 0
CHANGED_PATHS = exactly this one authorization document
GOVERNANCE = SUCCESS
K2 applicable classifier/gate = SUCCESS when emitted by workflow path rules
INDEPENDENT SUBSTANTIVE EXTERNAL SEMANTIC REVIEW CHANNELS = 2 / 2 TERMINAL CLEAN
UNRESOLVED ACTIONABLE FINDINGS / THREADS = 0
EXACT HEAD / TREE / DOCUMENT BLOB = CAPTURED
RULESET 20707483 = active
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
WAIVER = NO
```

Any head movement invalidates prior exact-head CI and semantic-review evidence and requires requalification from zero.

Service errors, billing notices, skipped reviews, summaries without substantive assessment, stale predecessor-head conclusions, self-review, and duplicate conclusions from one provider do not count toward the two-channel semantic quorum.

---

## 19. Guarded merge and post-merge adoption proof

A qualified authorization candidate may merge only through a normal history-preserving merge with exact `expected_head_sha` after rechecking canonical `main`, exact head, checks, reviews, threads, mergeability, and ruleset state.

Post-merge proof must establish:

1. canonical `main` equals the returned merge SHA;
2. ordered parent 1 equals the pre-merge canonical main;
3. ordered parent 2 equals the exact qualified authorization head;
4. merge tree equals the qualified candidate tree;
5. the canonical authorization document blob equals the qualified document blob;
6. GitHub merge signature is verified/valid;
7. applicable post-merge governance succeeds;
8. any applicable post-merge K2 run is reported exactly; an absent docs-only K2 push run is not relabeled as success;
9. ruleset `20707483` remains active with no bypass; and
10. `WAIVER=NO`.

Only after complete post-merge proof may effective P3-R16 implementation authority exist.

---

## 20. Required post-implementation reconciliation

Even after a future P3-R16 implementation becomes `CLOSED_CANONICAL`, a separate current-view roadmap/status reconciliation remains mandatory before any later P3 frontier may be considered.

R16 closure itself does not authorize P3-R17+, P4, promotion, product integration, release, or project completion.
