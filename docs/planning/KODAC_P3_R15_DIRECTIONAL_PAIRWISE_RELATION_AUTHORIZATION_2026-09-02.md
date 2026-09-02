# Kodac P3-R15 — Directional Pairwise Relation Evidence Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY**  
Date: 2026-09-02  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Deny-by-default status

This record proposes exactly one bounded future P3-R15 implementation gate. It is not implementation authority while it remains only a branch or pull-request candidate.

```text
P3-R1 THROUGH P3-R14 = CLOSED_CANONICAL
P3-R14 CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P3-R15 IMPLEMENTATION = NOT_AUTHORIZED WHILE THIS RECORD IS NON-CANONICAL
P3-R16+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

Effective P3-R15 implementation authority may exist only after this exact authorization record is qualified on one frozen exact head, merged normally into protected `main` with exact expected-head protection, and post-merge proven.

---

## 2. Canonical baseline

This candidate starts only after canonical P3-R14 implementation and mandatory current-view reconciliation:

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 1e244c64926e4035134d9b4e995acb2d6b82e722
CANONICAL_MAIN_TREE_AT_CANDIDATE_START = af08542589f8476a47cf6a83a65a6b6d70eba963

P3_R14_AUTHORIZATION_PR = #298
P3_R14_AUTHORIZATION_MERGE = fbbbcf13bdb281f0fe4296045ec2e2fa7311acdb
P3_R14_IMPLEMENTATION_PR = #299
P3_R14_QUALIFIED_HEAD = cbb5e1d8b11d15c35479856d8e79fd5dafb4ac9d
P3_R14_IMPLEMENTATION_MERGE = 6aa3e35418f95a2e198e3b8431297ab277eec6d3
P3_R14_POST_MERGE_PROOF = #299 / 5509458721
P3_R14_RECONCILIATION_BOUNDARY = #299 / 5509463764

P3_R14_CURRENT_VIEW_RECONCILIATION_PR = #300
P3_R14_CURRENT_VIEW_RECONCILIATION_QUALIFIED_HEAD = 2e12438e9c6ba28bbc60a25166d0d2e52f40409c
P3_R14_CURRENT_VIEW_RECONCILIATION_QUALIFIED_TREE = af08542589f8476a47cf6a83a65a6b6d70eba963
P3_R14_CURRENT_VIEW_RECONCILIATION_QUALIFICATION_PROOF = #300 / 5510131971
P3_R14_CURRENT_VIEW_RECONCILIATION_MERGE = 1e244c64926e4035134d9b4e995acb2d6b82e722
P3_R14_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #300 / 5510196174
P3_R15_SUCCESSOR_ANALYSIS = #300 / 5510243321

RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Live GitHub and more-specific canonical records override this snapshot if repository state moves before qualification.

---

## 3. Exact authorization-candidate scope

This authorization candidate may modify exactly one path:

```text
docs/planning/KODAC_P3_R15_DIRECTIONAL_PAIRWISE_RELATION_AUTHORIZATION_2026-09-02.md
```

No second path is authorized for this authorization unit.

This candidate may not modify runtime source, tests, predecessor authorization/evidence, current-view pages, workflows, dependencies, lockfiles, benchmark corpus/manifest/fixtures, provider/model configuration, persistence, product/release surfaces, or rulesets.

---

## 4. Observed canonical gap

Canonical P3-R14 reconstructs exactly two trusted P3-R13 records under exact shared controlled plan/task/case/measurement-ground-truth inputs. For each of the seven canonical dimensions it preserves trusted reduction semantics and trusted `HIGHER_IS_BETTER | LOWER_IS_BETTER` direction, then emits only:

```text
COMPARABLE
INSUFFICIENT_EVIDENCE
rawDeltaLeftMinusRight = leftReducedValue - rightReducedValue
```

R14 deliberately refuses to interpret direction into a favored relation.

Therefore the minimum remaining evidence gap is:

```text
ONE TRUSTED P3-R14 PAIRWISE EVIDENCE RECORD
+ ITS ALREADY-BOUND PER-DIMENSION DIRECTION
-> ONE DETERMINISTIC PER-DIMENSION DIRECTIONAL RELATION
```

This gap is evidence-derived. It is not inferred from sequence or numbering.

---

## 5. Canonical internal precedent

Canonical P2-R5 already defines the exact bounded downstream relation vocabulary after a validated P2-R4 comparison:

```text
LEFT_FAVORED_BY_DIRECTION
RIGHT_FAVORED_BY_DIRECTION
EQUAL_RAW_VALUE
INSUFFICIENT_EVIDENCE
```

Its deterministic relation semantics are:

```text
if comparison status == INSUFFICIENT_EVIDENCE:
  relation = INSUFFICIENT_EVIDENCE
else if left_value == right_value:
  relation = EQUAL_RAW_VALUE
else if direction == HIGHER_IS_BETTER:
  relation = LEFT_FAVORED_BY_DIRECTION when left_value > right_value
  relation = RIGHT_FAVORED_BY_DIRECTION otherwise
else if direction == LOWER_IS_BETTER:
  relation = LEFT_FAVORED_BY_DIRECTION when left_value < right_value
  relation = RIGHT_FAVORED_BY_DIRECTION otherwise
```

P2-R5 does not establish a task-family/global winner, cross-metric aggregate, ranking, promotion, default, statistical significance, or execution authority.

P3-R15 may reuse only these narrow relation semantics. It must not import broader P2 identities or bypass the later P3-R6 through P3-R14 chain.

---

## 6. External precedent relevant to scope

External research is planning evidence only and creates no authority or dependency admission.

Relevant current evidence includes:

- **ContextBench** — arXiv:2602.05892 — evaluates context recall, precision, and efficiency separately and reports important differences between explored and actually utilized context.
- **SWE-PRBench** — arXiv:2603.26130 — evaluates frozen context configurations and reports that adding richer context can reduce review quality through attention dilution rather than being monotonically better.
- **Agent Retrieval Bench** — arXiv:2607.24882 — isolates retrieval/context acquisition and includes natural no-gold cases rather than assuming every query requires a positive retrieval result.

These references support retaining visible per-dimension evidence and abstention. They do not justify a blended score, global winner, leaderboard, promotion, or superiority claim.

---

## 7. Proposed future public boundary

Only after this authorization becomes canonical and post-merge proven may one future implementation expose one public builder semantically equivalent to:

```text
buildStrategyReductionDirectionalRelationEvidence(
  leftReconstructionValue: unknown,
  rightReconstructionValue: unknown,
  comparisonDeclarationValue: unknown,
) -> StrategyReductionDirectionalRelationEvidence
```

The three public roots are the exact established P3-R14 inputs and are untrusted.

The mandatory procedure is:

```text
1. canonical-JSON snapshot all three public roots before semantic reads
2. call canonical P3-R14 buildStrategyReductionPairwiseComparisonEvidence(...) using only detached snapshots
3. treat the reconstructed P3-R14 output as the only trusted pairwise source
4. require exactly seven canonical dimensions in canonical order
5. derive exactly one closed-vocabulary relation per dimension from trusted R14 status, values, raw delta, and direction
6. derive deterministic R15 evidence identity
7. return detached deeply frozen evidence
```

P3-R15 must not accept serialized caller-supplied R14 evidence as truth or accept caller-supplied favored relations.

---

## 8. Exact output contract

The future R15 root contains exactly:

```text
schemaVersion
kind
r14PairwiseComparisonEvidenceIdentity
leftStrategySubjectIdentity
rightStrategySubjectIdentity
benchmarkId
benchmarkProtocolVersion
memberAReference
memberBReference
dimensionRelations
evidenceIdentity
```

Exact literals:

```text
schemaVersion = p3-r15-strategy-reduction-directional-relation-evidence/v1
kind = strategy_reduction_directional_relation_evidence
```

The root preserves the exact trusted R14 left/right orientation. No automatic side sorting, swapping, canonical winner ordering, or orientation normalization is authorized.

`dimensionRelations` contains exactly seven entries in canonical `P3_R6_DIMENSIONS` order.

Each entry contains exactly:

```text
dimension
metricId
inputUnit
outputUnit
valueKind
reducer
missingnessPolicy
minimumObservedCount
expectedCount
direction
status
leftReducedValue
rightReducedValue
rawDeltaLeftMinusRight
relation
```

No aggregate, weight, rank, score, confidence, p-value, effect size, promotion, or winner field is authorized.

---

## 9. Closed relation vocabulary

The only R15 relation values are:

```text
LEFT_FAVORED_BY_DIRECTION
RIGHT_FAVORED_BY_DIRECTION
EQUAL_RAW_VALUE
INSUFFICIENT_EVIDENCE
```

No aliases are authorized.

The relation is evidence about one metric dimension under one declared direction. The word `FAVORED` does not mean globally better, superior, winning, promotable, or default.

---

## 10. Exact derivation rules

For every trusted R14 dimension:

### Insufficient evidence

If trusted R14 status is `INSUFFICIENT_EVIDENCE`, R15 must require:

```text
leftReducedValue = null
rightReducedValue = null
rawDeltaLeftMinusRight = null
relation = INSUFFICIENT_EVIDENCE
```

No direction-based preference may be inferred from missing evidence.

### Equal raw value

If trusted R14 status is `COMPARABLE` and:

```text
leftReducedValue == rightReducedValue
```

then:

```text
rawDeltaLeftMinusRight == 0
relation = EQUAL_RAW_VALUE
```

`EQUAL_RAW_VALUE` is literal equality of the trusted reduced numbers only. It is not statistical equivalence, practical equivalence, confidence, or a tie under any tolerance.

### Higher is better

If trusted R14 status is `COMPARABLE`, values differ, and direction is `HIGHER_IS_BETTER`:

```text
leftReducedValue > rightReducedValue -> LEFT_FAVORED_BY_DIRECTION
leftReducedValue < rightReducedValue -> RIGHT_FAVORED_BY_DIRECTION
```

### Lower is better

If trusted R14 status is `COMPARABLE`, values differ, and direction is `LOWER_IS_BETTER`:

```text
leftReducedValue < rightReducedValue -> LEFT_FAVORED_BY_DIRECTION
leftReducedValue > rightReducedValue -> RIGHT_FAVORED_BY_DIRECTION
```

The relation may also be cross-checked against the sign of the trusted raw delta, but the trusted reduced values and trusted direction remain the semantic source.

No epsilon/tolerance rule is authorized.

---

## 11. Trusted-R14 preservation

P3-R15 must preserve and validate every R14 semantic field required for the output. It may not weaken R14's controls.

In particular, R15 inherits without modification:

```text
EXACTLY TWO DISTINCT STRATEGY SUBJECTS
EXACT SHARED CORRESPONDING P3-R1 PLAN REQUESTS
EXACT SHARED CORRESPONDING MEASUREMENT GROUND-TRUTH PROJECTIONS
EXACT BENCHMARK / PROTOCOL
EXACT ORDERED TWO-CASE TOPOLOGY
EXACT SEVEN-DIMENSION METRIC / UNIT / REDUCER / MISSINGNESS / DIRECTION SEMANTICS
COMPARABLE ONLY WHEN BOTH TRUSTED R12 REDUCTIONS ARE FINITE REDUCED VALUES
RAW DELTA = LEFT REDUCED VALUE - RIGHT REDUCED VALUE
```

Any failure in canonical R14 reconstruction fails R15 closed before relation derivation.

---

## 12. Deterministic identity and immutability

The future R15 evidence identity must be one lowercase `sha256:<64 hex>` over a canonical object containing all root fields except `evidenceIdentity` itself.

Requirements:

- deterministic canonical JSON identity;
- orientation-sensitive identity;
- exact dimension order preserved;
- relation values included in identity;
- no timestamp, filesystem path, runtime environment, object identity, or mutable process state in identity;
- returned root, member references, dimension relation array, and nested objects deeply frozen/detached.

Mutating caller inputs after invocation must not change returned evidence.

---

## 13. Fail-closed requirements

A future implementation must reject at minimum:

- any failure of canonical P3-R14 reconstruction;
- unknown/missing keys in any public input root as enforced by canonical R14;
- non-canonical or non-finite numeric evidence as enforced by canonical predecessors;
- dimension count other than seven;
- dimension order drift;
- direction outside `HIGHER_IS_BETTER | LOWER_IS_BETTER`;
- status outside `COMPARABLE | INSUFFICIENT_EVIDENCE`;
- inconsistent null/value/delta state;
- a nonzero trusted raw delta with equal trusted values;
- zero raw delta with unequal trusted values;
- any caller-supplied relation field used as truth;
- any attempt to compare three or more strategies;
- any attempt to aggregate across dimensions.

No best-effort repair, coercion, sorting, tolerance, default direction, or silent field dropping is authorized.

---

## 14. Exact future implementation allowlist

Only after this authorization record becomes canonical and post-merge proven, one future P3-R15 implementation unit is authorized to modify exactly these four paths:

```text
packages/kodac-runtime/bench/p3-r15/contracts.ts
packages/kodac-runtime/bench/p3-r15/strategy-reduction-directional-relation.ts
packages/kodac-runtime/test/p3-r15-strategy-reduction-directional-relation.test.ts
docs/planning/KODAC_P3_R15_DIRECTIONAL_PAIRWISE_RELATION_EVIDENCE_2026-09-02.md
```

No fifth path is authorized.

The implementation may import existing repository-local canonical P3/P2 contracts but may add no dependency, package, workflow, script, benchmark corpus/manifest/fixture, provider/model, persistence, product, release, or ruleset change.

---

## 15. Required future tests

The authorized future implementation test path must prove at minimum:

### Valid semantics

- higher-is-better left favored;
- higher-is-better right favored;
- lower-is-better left favored;
- lower-is-better right favored;
- exact equal raw value;
- insufficient evidence propagation;
- all seven canonical dimensions preserved in order;
- deterministic evidence identity;
- left/right orientation sensitivity;
- detached/deeply frozen result.

### Fail-closed behavior

- every relevant canonical R14 malformed-input and cross-control rejection remains enforced through reconstruction;
- no direct serialized-R14 shortcut;
- no caller-supplied relation acceptance;
- no third strategy input;
- no aggregate field or output;
- mutation after call does not affect output.

### Non-grant assertions

Tests and evidence must demonstrate the implementation contains no API or field for:

```text
global winner
better / worse / superior / inferior verdict
cross-dimension aggregate / mean / sum / weighting
majority
Pareto / dominance policy
ranking / leaderboard / promotion / default
statistics / significance / confidence / p-value / effect size
benchmark participant execution
provider / model / reviewer / evaluator execution
persistence / telemetry / learning
product / CLI / agent-loop integration
```

---

## 16. Qualification requirements for this authorization candidate

This docs-only authorization candidate may become canonical only when one frozen exact head proves:

```text
BASE = current canonical main
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P3_R15_DIRECTIONAL_PAIRWISE_RELATION_AUTHORIZATION_2026-09-02.md
GOVERNANCE / PROVENANCE / LEGACY TESTS = TERMINAL SUCCESS
K2 PULL-REQUEST CLASSIFIER / STABLE GATE = TERMINAL SUCCESS
RUNTIME MATRIX = SKIPPED AS DOCS-ONLY NON-APPLICABLE
INDEPENDENT SUBSTANTIVE SEMANTIC REVIEW CHANNELS = 2 / 2 TERMINAL CLEAN
UNRESOLVED ACTIONABLE FINDINGS / THREADS = 0
RULESET 20707483 = active / no bypass
WAIVER = NO
```

Any head movement invalidates all prior exact-head CI and semantic-review evidence.

---

## 17. Guarded merge and post-merge proof

Canonicalization requires:

1. re-read `main`, candidate head, changed paths, CI, reviews, threads, mergeability, and ruleset immediately before merge;
2. prove `main` still equals the qualified base and candidate head still equals the qualified head;
3. normal GitHub merge with exact expected-head precondition;
4. no force push, rebase, destructive rewrite, bypass, or waiver;
5. after merge, prove canonical `main`, ordered parents, tree, authorization-document blob, valid merge signature, applicable push checks, and active no-bypass ruleset;
6. publish immutable post-merge proof on the authorization PR.

Only that post-merge proof activates the exact four-path P3-R15 implementation authority in Section 14.

---

## 18. Preserved non-grants

This authorization does not grant:

```text
P3 OVERALL CLOSURE
P3-R16+ IMPLEMENTATION
P4-P8 IMPLEMENTATION
GENERAL / PUBLIC KODACBENCH COMPLETION
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON
GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR VERDICT
STATISTICAL TIE / EQUIVALENCE
CROSS-DIMENSION AGGREGATE SCORE
SUM / MEAN / WEIGHTED SCORE
MAJORITY POLICY
PARETO / DOMINANCE POLICY
MULTI-STRATEGY RANKING / LEADERBOARD / PROMOTION
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY
REAL BENCHMARK TASK EXECUTION
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION
NEW DEPENDENCIES / DONOR INTAKE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD
TRAINING / FINE-TUNING / ONLINE LEARNING
CROSS-REPOSITORY AGGREGATION / LEARNING
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION
AUTOFIX
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM / BRAND LAUNCH
RULESET CHANGE / BYPASS
WAIVER
PROJECT COMPLETION
```

A per-dimension `LEFT_FAVORED_BY_DIRECTION | RIGHT_FAVORED_BY_DIRECTION` relation is only literal directional metric evidence. It is not a global quality verdict.

---

## 19. Authorization result while candidate

Until this exact record is canonically merged and post-merge proven:

```text
P3_R15_AUTHORIZATION = CANDIDATE_ONLY
P3_R15_IMPLEMENTATION = NOT_AUTHORIZED
NEXT ACTION = EXACT-HEAD QUALIFICATION OF THIS ONE-FILE DOCS-ONLY AUTHORIZATION UNIT
WAIVER = NO
```
