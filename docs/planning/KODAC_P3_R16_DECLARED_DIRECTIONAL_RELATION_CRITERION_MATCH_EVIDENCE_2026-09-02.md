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
-> FAIL-CLOSED R15 ROOT / R14-BINDING / SEVEN-RELATION TOPOLOGY VALIDATION
-> EXACT RELATION-ENTRY KEY + CANONICAL DIMENSION-ORDER VALIDATION
-> EXACT COPY-PARITY AGAINST EACH NESTED TRUSTED R14 DIMENSION COMPARISON
-> CLOSED FOUR-LITERAL R15 RELATION-VOCABULARY VALIDATION
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

`INSUFFICIENT_EVIDENCE` is never accepted as an allowed satisfied relation. The canonical R15 result remains the sole observed directional-relation evidence used by criterion matching. R16 validates the predecessor record structurally and fail-closed: exact root bindings, exact seven-entry topology, canonical dimension order, exact copied-field parity to nested R14 comparison evidence, and the closed four-literal R15 relation vocabulary. R16 does **not** independently reinterpret raw values, raw deltas, direction, reduction status, or comparison status and does not re-derive an alternate relation.

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

## Independent-review repair incorporated

A fresh independent semantic review of an earlier exact-head candidate identified one actionable fail-closed defect: the earlier R16 root validator verified the R15 root identity/count/freeze state but did not independently validate each `dimensionRelations` entry or restrict `relation` to the closed canonical R15 vocabulary before criterion-state derivation.

The finding requested canonical dimension validation, required relation-entry structure, stable metric binding, and closed relation-literal validation. The implementation was repaired forward-only within the authorized implementation path. A subsequent self-audit detected that one intermediate repair had gone beyond this finding by re-deriving expected relations from R14 raw comparison semantics, conflicting with the authorization's prohibition on independent R16 reinterpretation. That overreach was removed before qualification.

The final repair now:

- requires the exact canonical R15 relation-entry key set;
- requires all seven entries and the nested R14 comparisons in canonical P3-R6 dimension order;
- cross-binds R15 root identities/subjects/benchmark fields to nested R14 evidence;
- requires every copied relation-entry field except `relation` to be canonically identical to its nested R14 dimension comparison;
- restricts `relation` to exactly `LEFT_FAVORED_BY_DIRECTION | RIGHT_FAVORED_BY_DIRECTION | EQUAL_RAW_VALUE | INSUFFICIENT_EVIDENCE`;
- does not derive or replace the trusted R15 relation from raw values, deltas, directions, or comparison status;
- still treats the returned canonical R15 record as the predecessor evidence and introduces no alternate comparison authority.

A focused regression test constructs an isolated R16 module instance whose canonical R15 dependency returns a deeply frozen, identity-rebound R15-shaped record and verifies fail-closed rejection for: an unsupported relation literal, canonical dimension-topology drift, and metric/copy-binding drift. The regression deliberately does not require rejection of a different canonical relation literal by semantic re-derivation. The test does not export a test-only production hook, modify the test runner, or add a fifth repository path.

This section records repair materialization only. The finding is not considered terminally reconciled until fresh independent exact-head review on the final unchanged candidate confirms it.

## Focused proof matrix materialization

The authorized focused test path materializes the source-level proof matrix required by the canonical authorization, using local deterministic synthetic fixtures and the real canonical late-chain reconstruction rather than caller-serialized R15 evidence:

```text
P3-R1
-> P3-R2
-> P3-R6
-> P3-R7
-> P3-R8
-> P3-R9
-> P3-R10
-> P3-R11
-> P3-R12
-> P3-R13
-> P3-R14
-> P3-R15
-> P3-R16
```

The focused test source covers at minimum:

- exact four-argument arity rejection before predecessor invocation or caller-root semantic reads;
- direct delegation of the first three roots to canonical R15 and complete trusted R15 preservation;
- canonical predecessor failure propagation and rejection of caller shortcut/R15 substitution;
- explicit fail-closed rejection of deeply frozen identity-rebound malformed R15 evidence for unsupported relation vocabulary, dimension topology drift, and metric/copy-binding drift;
- exact fourth-root canonical JSON hardening against accessors, symbols, sparse arrays, cycles, and non-canonical structures;
- exact declaration root/nested key sets;
- exact `criterionSetId` stable-ID grammar and 512 UTF-8-byte bound;
- exact lowercase SHA-256 `criterionPolicyIdentity` grammar;
- exact seven canonical dimensions, order, cardinality, and trusted `metricId` binding;
- accepted non-empty closed `allowedRelations` subsets;
- rejection of empty, duplicate, unsupported, `INSUFFICIENT_EVIDENCE`, and unsorted relation sets without repair;
- per-dimension `SATISFIED`, `NOT_SATISFIED`, and `INSUFFICIENT_EVIDENCE` semantics;
- insufficiency root precedence, then not-satisfied precedence, then all-satisfied only when all seven criteria satisfy;
- deterministic self-reference-free identity, insertion-order neutrality, and sensitivity to declaration and trusted R15 changes;
- detached deeply frozen output including declaration, trusted R15, results, arrays, and nested children;
- absence of aggregate score, weighting, majority, Pareto/dominance, statistics, ranking, promotion, execution, persistence, product, release, R17+, P4+, or project-completion surfaces.

This section records proof-matrix **materialization**, not runtime success. Exact-head TypeScript typecheck, focused/full tests, required GitHub CI, independent semantic review quorum, and all remaining merge gates must still succeed on one unchanged final head before qualification.

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
AUTHORIZATION-MANDATED FOCUSED PROOF MATRIX = COMPLETE AND PASSING
INDEPENDENT SUBSTANTIVE EXTERNAL SEMANTIC REVIEW = 2 / 2 TERMINAL CLEAN
UNRESOLVED ACTIONABLE FINDINGS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET 20707483 = active / bypass_actors=[] / current_user_can_bypass=never
GUARDED NORMAL MERGE WITH EXACT EXPECTED HEAD = REQUIRED
COMPLETE POST-MERGE PROOF = REQUIRED
WAIVER = NO
```

Any head movement invalidates prior exact-head qualification evidence.

## Frozen exact candidate identity

The final candidate identity for qualification is:

```text
HEAD = 030c7a63170be02db4eb4da94d605e9d6415c34b
TREE = a2f9ba070289ea39053988fde5c9af8f9bfac708
BASE = da59d2a46d4eff5c12a60f2057a57d3572ba0e5d
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 4
CONTRACTS_BLOB = ab5918caec73d2e6688d982c2774479b916e50b9
IMPLEMENTATION_BLOB = 6045a0f4fe6362bca3e600c8d78602083a10eb5c
TEST_BLOB = b23368559a395813702ebf0cc971aa2bf02a77ec
EVIDENCE_PRE_PIN_BLOB = 35cd060f35df22f643c8b4f08ca41cdaaa113384
```

The evidence blob above is the immediate pre-pin blob because this section necessarily changes the evidence file itself. The commit produced by this pinning edit becomes the only new exact head and must be re-captured before CI/review qualification; no pre-pin head is eligible for merge.

No CI PASS, external semantic-review quorum, zero-thread proof, merge eligibility, canonical closure, P3 overall closure, or project completion is claimed by this candidate before GitHub proves it on one unchanged exact final head.

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