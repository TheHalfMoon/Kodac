# Kodac P3-R16 — Declared Directional-Relation Criterion-Match Evidence Candidate

Status: **IMPLEMENTATION_CANDIDATE / NOT_CANONICAL / NOT_QUALIFIED**  
Date: 2026-09-02  
Waiver: **NO**

## Canonical authority

```text
AUTHORIZATION_PR = #305
AUTHORIZATION_HEAD = da79d9c0d0753dc86db22aa2d75a2656fc7c5b4b
AUTHORIZATION_DOCUMENT_BLOB = 3a931f3c1d733d5540954784d7fb414981c4a8b1
AUTHORIZATION_MERGE / BASE = da59d2a46d4eff5c12a60f2057a57d3572ba0e5d
AUTHORIZATION_TREE = 3798c3faa57838590ecaad7ed9acb0c5f8eefa41
GITHUB_MERGE_SIGNATURE = verified / valid
WAIVER = NO
```

This implementation candidate derives authority only from the canonical P3-R16 authorization record. It creates no P3-R17+, P4-P8, product, release, benchmark-execution, ranking, promotion, statistical, persistence, or project-completion authority.

## Exact implementation allowlist

Only these four paths may differ from the canonical authorization merge:

```text
packages/kodac-runtime/bench/p3-r16/contracts.ts
packages/kodac-runtime/bench/p3-r16/declared-directional-relation-criterion-match.ts
packages/kodac-runtime/test/p3-r16-declared-directional-relation-criterion-match.test.ts
docs/planning/KODAC_P3_R16_DECLARED_DIRECTIONAL_RELATION_CRITERION_MATCH_EVIDENCE_2026-09-02.md
```

No fifth path is authorized.

## Implemented boundary

The implementation candidate exposes only:

```text
buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence(
  leftReconstructionValue,
  rightReconstructionValue,
  comparisonDeclarationValue,
  criterionDeclarationValue,
)
```

and follows this bounded sequence:

```text
EXACT FOUR-ARGUMENT ARITY GATE
-> DIRECT DELEGATION OF FIRST THREE ROOTS TO CANONICAL P3-R15
-> TRUST ONLY THE DETACHED DEEPLY FROZEN P3-R15 RESULT
-> CANONICAL-JSON SNAPSHOT OF THE FOURTH CALLER-OWNED DECLARATION
-> EXACT ROOT / NESTED KEY VALIDATION
-> EXACT criterionSetId STABLE-ID / 512 UTF-8 BYTE VALIDATION
-> EXACT LOWERCASE SHA-256 criterionPolicyIdentity VALIDATION
-> EXACT SEVEN CANONICAL DIMENSIONS + metricId BINDING
-> NON-EMPTY DUPLICATE-FREE CLOSED allowedRelations SUBSETS
-> DIRECT STRING-COMPARATOR ORDER VALIDATION WITHOUT SORTING REPAIR
-> PER-DIMENSION SATISFIED | NOT_SATISFIED | INSUFFICIENT_EVIDENCE
-> CLOSED ROOT PRECEDENCE
-> SELF-REFERENCE-FREE CANONICAL SHA-256 IDENTITY
-> DETACHED DEEPLY FROZEN OUTPUT
```

`INSUFFICIENT_EVIDENCE` is never accepted as an allowed satisfied relation. Trusted R15 relation evidence is the only observed relation input. No raw-value, raw-delta, direction, reduction-status, or comparison-status reinterpretation is performed by R16.

## Closed root logical state

```text
ANY INSUFFICIENT_EVIDENCE
-> INSUFFICIENT_DIRECTIONAL_EVIDENCE

ELSE ANY NOT_SATISFIED
-> ONE_OR_MORE_DECLARED_RELATION_CRITERIA_NOT_SATISFIED

ELSE
-> ALL_DECLARED_RELATION_CRITERIA_SATISFIED
```

This is caller-declared criterion-match evidence only. It is not a global better/worse verdict, score, majority, weighted result, Pareto/dominance decision, promotion, recommendation, winner, default, or repository policy.

## Current focused-test state

The first implementation head includes direct proof that wrong runtime arity rejects before any semantic read of hostile caller roots and locks the closed declaration/evidence literals. The broader authorization-mandated focused proof matrix remains required before qualification and must be expanded on the same four-path surface before this candidate can be classified merge-eligible.

No CI PASS, external semantic-review quorum, zero-thread proof, merge eligibility, or canonical closure is claimed by this document before GitHub proves it on an exact frozen implementation head.

## Qualification requirements still mandatory

Before merge, one unchanged exact implementation head must prove at minimum:

```text
BASE = current canonical main
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 4
GOVERNANCE = SUCCESS
K2 CLASSIFIER = SUCCESS
K2 UBUNTU TYPECHECK / TEST / PATCH-HOOK = SUCCESS
K2 MACOS TYPECHECK / TEST / PATCH-HOOK = SUCCESS
K2 WINDOWS TYPECHECK / TEST / PATCH-HOOK = SUCCESS
K2 STABLE GATE = SUCCESS
AUTHORIZATION-MANDATED FOCUSED PROOF MATRIX = COMPLETE
INDEPENDENT SUBSTANTIVE EXTERNAL SEMANTIC REVIEW = 2 / 2 TERMINAL CLEAN
UNRESOLVED ACTIONABLE FINDINGS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET 20707483 = active / bypass_actors=[] / current_user_can_bypass=never
GUARDED NORMAL MERGE WITH EXACT EXPECTED HEAD = REQUIRED
COMPLETE POST-MERGE PROOF = REQUIRED
WAIVER = NO
```

Any head movement invalidates prior exact-head qualification evidence.

## Preserved non-grants

```text
CALLER DECLARED CRITERIA != REPOSITORY POLICY
CROSS-DIMENSION NUMERIC AGGREGATE / SCORE = NOT_AUTHORIZED
WEIGHTING / MAJORITY / PARETO / DOMINANCE POLICY = NOT_AUTHORIZED
NUMERIC THRESHOLD / MARGIN / EPSILON / TOLERANCE = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
PROVENANCE / CHRONOLOGY / CONTAMINATION QUALIFICATION IN R16 = NOT_AUTHORIZED
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED
REAL BENCHMARK / PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PRODUCT / CLI / API / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE / SUPERIORITY CLAIM = NOT_AUTHORIZED
P3 OVERALL CLOSURE = NOT_ESTABLISHED
P3-R17+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
