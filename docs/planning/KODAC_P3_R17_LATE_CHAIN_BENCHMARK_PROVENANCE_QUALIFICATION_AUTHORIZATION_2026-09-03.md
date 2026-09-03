# Kodac P3-R17 — Late-Chain Benchmark-Provenance Qualification Binding Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY**  
Date: 2026-09-03  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Deny-by-default status

This record proposes exactly one bounded future P3-R17 implementation gate. It is documentation/governance only while it remains a branch or pull-request candidate.

```text
P3-R1 THROUGH P3-R16 = CLOSED_CANONICAL
P3-R16 CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P3-R17 IMPLEMENTATION = NOT_AUTHORIZED WHILE THIS RECORD IS NON-CANONICAL
P3-R18+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

Effective P3-R17 implementation authority may exist only after this exact authorization record is qualified on one frozen exact head, merged normally into protected `main` with exact expected-head protection, and post-merge proven.

---

## 2. Canonical baseline

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 4bf4329cdfee3c599071d8eaca253bae8648b6d0
P3_R16_IMPLEMENTATION_PR = #307
P3_R16_IMPLEMENTATION_MERGE = 0fb9f47db144619c580c69052aa98d79c4f71dc6
P3_R16_IMPLEMENTATION_POST_MERGE_PROOF = #307 / 5517289297
P3_R16_CURRENT_VIEW_RECONCILIATION_PR = #308
P3_R16_CURRENT_VIEW_RECONCILIATION_MERGE = 4bf4329cdfee3c599071d8eaca253bae8648b6d0
P3_R16_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #308 / 5519926474
P3_R17_SUCCESSOR_ANALYSIS = #308 / 5525126768
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Live GitHub and more-specific canonical records override this snapshot if repository state moves before qualification.

---

## 3. Exact authorization-candidate scope

This authorization candidate may modify exactly one path:

```text
docs/planning/KODAC_P3_R17_LATE_CHAIN_BENCHMARK_PROVENANCE_QUALIFICATION_AUTHORIZATION_2026-09-03.md
```

No second path is authorized for this authorization unit.

This candidate may not modify runtime source, tests, predecessor authorization/evidence, current-view pages, workflows, dependencies, lockfiles, benchmark corpus/manifest/fixtures/results, provider/model configuration, persistence, product/release surfaces, or rulesets.

---

## 4. Observed canonical gap

Canonical P3-R16 reconstructs trusted P3-R15 late-chain directional-relation evidence and applies one explicit caller-owned seven-dimension relation-criteria declaration. It therefore provides deterministic metric-criterion evidence only:

```text
TRUSTED P3-R16 CRITERION-MATCH EVIDENCE
-> PER-DIMENSION SATISFIED | NOT_SATISFIED | INSUFFICIENT_EVIDENCE
-> ONE CLOSED R16 LOGICAL CRITERION-MATCH STATE
```

The durable P3 goal requires benchmark evidence that selective context improves or matches accepted quality without unacceptable dilution/regression. Canonical P3-R4 separately reconstructs literal benchmark provenance, and canonical P3-R5 defines caller-owned literal provenance-criterion semantics. Those provenance semantics remain in the earlier P3-R3/P3-R4/P3-R5 chain and do not prove that the independently reconstructed P3-R6 -> P3-R16 late-chain comparison is qualified by the same benchmark provenance substrate.

The predecessor R16 successor analysis explicitly deferred this boundary:

> P3-R4/R5 provenance semantics remain canonical but belong to an earlier evidence chain; a future composition/binding of late-chain R16 metric qualification with provenance evidence would require its own proof rather than being smuggled into R16.

The minimum unresolved evidence boundary is therefore:

```text
ONE TRUSTED P3-R16 LATE-CHAIN CRITERION-MATCH EVIDENCE RECORD
+ ONE TRUSTED CANONICALLY RECONSTRUCTED P3-R4 BENCHMARK-PROVENANCE RECORD
+ ONE EXPLICIT CALLER-OWNED LITERAL PROVENANCE-CRITERIA DECLARATION
+ EXACT CROSS-CHAIN BENCHMARK / POLICY-ORIENTATION / TWO-CASE IDENTITY BINDINGS
-> PER-PROVENANCE-CRITERION LITERAL MATCH EVIDENCE
-> ONE CLOSED COMBINED QUALIFICATION-EVIDENCE STATE
```

This gap is evidence-derived and is not inferred from sequence or numbering.

---

## 5. Why P3-R5 does not close this gap

Canonical P3-R5 already combines caller-owned metric criteria and literal provenance criteria, but it consumes canonical P3-R3/P3-R4 evidence from the earlier pairwise-metric chain.

Canonical P3-R14 through P3-R16 prove a different and later measurement lineage:

```text
P3-R6 measurement materialization
-> P3-R7 single-case report binding
-> P3-R8 strategy subject identity
-> P3-R9 exactly-two-case composition
-> P3-R10 metric alignment
-> P3-R11 reduction-policy binding
-> P3-R12 reduction evidence
-> P3-R13 direction binding
-> P3-R14 controlled pairwise comparison
-> P3-R15 directional relation evidence
-> P3-R16 caller-declared directional-relation criterion match
```

Using P3-R5 as though its metric qualification directly qualified R16 would bypass this late-chain lineage.

P3-R17 may reuse only:

- canonical P3-R4 reconstruction as the source of literal benchmark-provenance truth;
- canonical P3-R5 literal provenance-criterion membership/presence semantics; and
- canonical P3-R16 as the source of late-chain metric-criterion truth.

P3-R17 must not trust caller-serialized P3-R3, P3-R4, P3-R5, P3-R14, P3-R15, or P3-R16 outputs as substitutes for canonical reconstruction.

---

## 6. Planning, ADR, and research precedent

The durable master plan requires:

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
MEASURE BEFORE BROAD QUALITY CLAIMS
```

and states that P3 promotion eventually requires KodacBench evidence that selective context improves or matches accepted quality without unacceptable dilution/regression.

ADR-0010 requires reproducible benchmark identity, exact comparison configuration, contamination/leakage awareness, held-out or later-in-time evidence where possible, and independently visible task-family metrics rather than unsupported broad superiority claims.

The final gap review requires a frozen reproducible corpus plus later-in-time holdout/reality-check lane, explicit context metrics, no-gold cases, and context-dilution measurement.

Internal research references such as ContextBench, SWE-PRBench, and Agent Retrieval Bench support measuring context recall, precision, efficiency, no-gold behavior, budgeted evidence yield, and dilution independently. These sources are planning evidence only and create no external dependency, model, provider, statistical, or execution authority.

P3-R17 therefore binds already-trusted late-chain metric qualification to already-trusted literal benchmark provenance. It does not choose the criteria, decide promotion, or establish statistical sufficiency.

---

## 7. Exact future implementation allowlist

Only after this authorization becomes canonical and post-merge proven may one future P3-R17 implementation candidate modify exactly these four paths:

```text
packages/kodac-runtime/bench/p3-r17/contracts.ts
packages/kodac-runtime/bench/p3-r17/late-chain-benchmark-provenance-qualification.ts
packages/kodac-runtime/test/p3-r17-late-chain-benchmark-provenance-qualification.test.ts
docs/planning/KODAC_P3_R17_LATE_CHAIN_BENCHMARK_PROVENANCE_QUALIFICATION_EVIDENCE_2026-09-03.md
```

No fifth path is authorized.

In particular, P3-R17 may not modify P2/P3 predecessor implementations, benchmark corpora/manifests/fixtures/results, package metadata, lockfiles, workflows, export barrels, CLI/API/product surfaces, K2/K5/Done Gate semantics, provider/model configuration, persistence, release configuration, or rulesets.

---

## 8. Exact future public boundary

Only after this authorization becomes canonical and post-merge proven may one future implementation expose one pure deterministic builder semantically equivalent to:

```text
buildLateChainBenchmarkProvenanceQualificationEvidence(
  leftReconstructionValue: unknown,
  rightReconstructionValue: unknown,
  comparisonDeclarationValue: unknown,
  criterionDeclarationValue: unknown,
  provenanceReconstructionValue: unknown,
  qualificationDeclarationValue: unknown,
) -> LateChainBenchmarkProvenanceQualificationEvidence
```

The public runtime contract is **exactly six arguments**.

Mandatory call order:

```text
1. reject arguments.length !== 6 before invoking any predecessor or reading any caller root
2. pass arguments 1-4 directly and unchanged to canonical buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence(...)
3. perform no independent semantic read from arguments 1-4 before or after that R16 call
4. treat only the detached deeply frozen returned R16 record as trusted late-chain criterion-match truth
5. snapshot argument 5 through the repository canonical JSON boundary and validate its exact reconstruction-bundle keys
6. reconstruct canonical P3-R4 benchmark provenance from only that hardened bundle through buildContextPolicyBenchmarkProvenanceEvidence(...)
7. reconstruct the exact canonical P3-R3 identity/policy projection from that same hardened bundle solely for cross-chain identity/orientation binding, using canonical P2-R4/P3-R3 predecessors rather than any alternate relation or provenance semantics
8. validate exact R4 <-> R3 identity binding
9. validate exact R16 <-> R3 benchmark/protocol and left/right policy-orientation binding
10. validate exact R16 <-> R4 two-case caseId/r1ResultIdentity substrate binding
11. snapshot and validate argument 6 through the repository canonical JSON boundary
12. bind the caller declaration to the exact reconstructed R16 and R4 evidence identities
13. derive only literal provenance criterion results using the closed P3-R5-compatible rules below
14. derive one closed combined logical qualification-evidence state with the exact precedence below
15. preserve the complete trusted R16 and complete trusted R4 records as nested immutable predecessor evidence
16. preserve an explicit deterministic cross-chain binding projection sufficient to audit the policy orientation and two-case identity match
17. derive one deterministic self-reference-free P3-R17 evidence identity
18. return a detached deeply frozen P3-R17 evidence record
```

P3-R17 must not implement a competing R14/R15/R16 relation path or a competing P3-R4 provenance interpretation path.

---

## 9. Closed P3-R4 provenance reconstruction bundle

`provenanceReconstructionValue` must be one exact canonical object containing exactly these keys and no others:

```text
planRequest
leftPolicy
rightPolicy
leftR2Report
leftR3Summary
rightR2Report
rightR3Summary
sharedEvaluationContext
leftSubject
rightSubject
comparisonPolicy
p3R3Declaration
manifest
developmentFixture
holdoutFixture
provenanceDeclaration
```

The future implementation must pass those values to canonical `buildContextPolicyBenchmarkProvenanceEvidence(...)` in its canonical established order:

```text
planRequest
leftPolicy
rightPolicy
leftR2Report
leftR3Summary
rightR2Report
rightR3Summary
sharedEvaluationContext
leftSubject
rightSubject
comparisonPolicy
p3R3Declaration
manifest
developmentFixture
holdoutFixture
provenanceDeclaration
```

The same hardened bundle may be used to reconstruct the canonical P2-R4/P3-R3 identity projection required for cross-chain binding. It must not be used to derive an alternate metric verdict or alternate provenance verdict.

No serialized caller-provided P3-R3/P3-R4 evidence object is an authorized input.

---

## 10. Closed caller qualification declaration

The sixth untrusted argument contains exactly:

```text
version
kind
qualificationId
qualificationPolicyIdentity
criterionMatchEvidenceIdentity
provenanceEvidenceIdentity
provenanceCriteria
```

Required literals:

```text
version = p3-r17-late-chain-benchmark-provenance-qualification-declaration-v1
kind = qualify_late_chain_criteria_with_benchmark_provenance
```

### 10.1 `qualificationId`

`qualificationId` is one caller-owned stable identifier and must satisfy the repository stable-ID grammar and maximum 512 UTF-8-byte bound.

It must equal the exact `qualificationId` in the canonically reconstructed P3-R4 provenance declaration/evidence.

It is independent from the nested P3-R16 `criterionSetId`; equality between those two identifiers must not be inferred or required.

### 10.2 `qualificationPolicyIdentity`

`qualificationPolicyIdentity` must be exactly:

```text
sha256:<64 lowercase hex>
```

It identifies the caller-owned combined qualification declaration only. It is not repository policy authority.

### 10.3 Exact predecessor identity binding

The declaration must include:

```text
criterionMatchEvidenceIdentity
provenanceEvidenceIdentity
```

Both must be lowercase `sha256:<64 lowercase hex>` identities and must exactly equal the canonically reconstructed trusted P3-R16 and P3-R4 identities respectively.

A mismatch fails closed. The implementation must not silently replace a caller-declared expected predecessor identity.

---

## 11. Literal provenance criteria contract

`provenanceCriteria` contains exactly:

```text
requiredCorpusRoles
allowedChronologyStatuses
allowedContaminationStatuses
```

Each array must be non-empty, duplicate-free, already strictly ordered by the repository direct string comparator, and may contain only the closed values below. Sorting/repair after input is forbidden.

### 11.1 Required corpus roles

Allowed literals:

```text
development
holdout
```

`requiredCorpusRoles` is satisfied if and only if every declared role occurs at least once among the literal trusted P3-R4 `caseProvenance` records.

Role presence is not proof that a corpus is sufficient, unbiased, representative, statistically valid, or suitable for promotion.

### 11.2 Allowed chronology statuses

Allowed literals:

```text
chronology-unproven
later-in-time
not-later-in-time
```

The chronology criterion is satisfied if and only if every trusted P3-R4 case has a literal `chronologyStatus` contained in the caller-declared set.

Matching `later-in-time` does not establish sufficient holdout evidence or promotion readiness.

### 11.3 Allowed contamination statuses

Allowed literals:

```text
known
none-known
unknown
```

The contamination criterion is satisfied if and only if every trusted P3-R4 case has a literal `contaminationStatus` contained in the caller-declared set.

Required invariant:

```text
none-known MATCH != UNCONTAMINATED
none-known MATCH != CLEAN
none-known MATCH != SAFE
```

No derived contamination claim is authorized.

---

## 12. Mandatory cross-chain binding

The future builder must prove that the reconstructed P3-R4/P3-R3 provenance substrate belongs to the same exact comparison represented by trusted P3-R16.

### 12.1 Benchmark/protocol/task-family binding

Require exactly:

```text
trustedR16.benchmarkId == trustedR4.benchmarkId == trustedR3.benchmarkId
trustedR16.benchmarkProtocolVersion == trustedR4.benchmarkProtocolVersion == trustedR3.benchmarkProtocolVersion
trustedR4.taskFamily == trustedR3.taskFamily == context-selection
trustedR4.p3R3EvidenceIdentity == trustedR3.evidenceIdentity
```

Any mismatch fails closed.

### 12.2 Left/right policy-orientation binding

Canonical P3-R16 preserves trusted R14 -> R13 -> R12 member references for both compared strategy subjects. Each side's two late-chain member references carry the policy identity used by that strategy.

Require exactly:

```text
trusted left R16 member-A policyIdentity
  == trusted left R16 member-B policyIdentity
  == trustedR3.leftPolicyIdentity

trusted right R16 member-A policyIdentity
  == trusted right R16 member-B policyIdentity
  == trustedR3.rightPolicyIdentity

trustedR3.leftPolicyIdentity != trustedR3.rightPolicyIdentity
```

A left/right swap, mixed-policy two-case strategy, or unrelated policy pair fails closed.

### 12.3 Exactly-two-case provenance substrate binding

Canonical R14 requires the corresponding member-A/member-B case controls and `r1ResultIdentity` values to match across the two compared strategies. P3-R17 must additionally require trusted P3-R4 provenance to cover exactly that same two-case substrate.

Let the trusted late-chain member references define exactly two `(caseId, r1ResultIdentity)` tuples. Require:

```text
trustedR4.caseProvenance.length == 2
set(trustedR4.caseProvenance.map(caseId, r1ResultIdentity))
  == set(trusted late-chain member-A/member-B (caseId, r1ResultIdentity))
```

No missing case, extra case, duplicate case, case substitution, or `r1ResultIdentity` substitution is permitted.

This exact two-case binding is intentionally bounded. Three-or-more-case or arbitrary-N qualification is not authorized.

### 12.4 No label-only binding

Equal benchmark names or protocol strings alone are insufficient. The policy-orientation and two-case identity bindings above are mandatory so unrelated provenance evidence sharing a benchmark label cannot qualify a different R16 comparison.

---

## 13. Closed provenance criterion result

The output contains one provenance criterion result with exactly:

```text
requiredCorpusRoles
observedCorpusRoles
allowedChronologyStatuses
observedChronologyStatuses
allowedContaminationStatuses
observedContaminationStatuses
corpusRoleCriterionState
chronologyCriterionState
contaminationCriterionState
```

The three state fields use exactly:

```text
SATISFIED
NOT_SATISFIED
```

Observed arrays are duplicate-free direct-string-order projections of the unique literal values in trusted P3-R4 `caseProvenance`.

No derived terms such as `sufficient-holdout`, `unbiased`, `representative`, `uncontaminated`, `clean`, `safe`, or `statistically-valid` are permitted.

---

## 14. Closed combined qualification-evidence state

The P3-R17 root state may be exactly one of:

```text
ALL_DECLARED_QUALIFICATION_CRITERIA_SATISFIED
ONE_OR_MORE_DECLARED_QUALIFICATION_CRITERIA_NOT_SATISFIED
INSUFFICIENT_DIRECTIONAL_EVIDENCE
```

Precedence is exact and total:

1. If trusted P3-R16 `criterionMatchEvidenceState == INSUFFICIENT_DIRECTIONAL_EVIDENCE`, P3-R17 state is `INSUFFICIENT_DIRECTIONAL_EVIDENCE`, regardless of provenance criterion results.
2. Otherwise, if trusted P3-R16 state is `ONE_OR_MORE_DECLARED_RELATION_CRITERIA_NOT_SATISFIED`, or any literal provenance criterion state is `NOT_SATISFIED`, P3-R17 state is `ONE_OR_MORE_DECLARED_QUALIFICATION_CRITERIA_NOT_SATISFIED`.
3. Otherwise, trusted P3-R16 must be `ALL_DECLARED_RELATION_CRITERIA_SATISFIED` and every literal provenance criterion must be `SATISFIED`; only then is P3-R17 state `ALL_DECLARED_QUALIFICATION_CRITERIA_SATISFIED`.

Required interpretation:

```text
ALL_DECLARED_QUALIFICATION_CRITERIA_SATISFIED
= caller-declared late-chain metric criteria matched
  AND caller-declared literal provenance criteria matched
```

It does not mean global superiority, repository acceptance, sufficient benchmark evidence, statistical validity, promotion, winner/default, release readiness, Done Gate completion, or project completion.

---

## 15. Minimum future output contract

The future result must preserve at minimum these semantic fields:

```text
version
kind
qualificationEvidenceIdentity
qualificationId
qualificationPolicyIdentity
criterionMatchEvidenceIdentity
provenanceEvidenceIdentity
comparisonId
criterionSetId
criterionPolicyIdentity
leftStrategySubjectIdentity
rightStrategySubjectIdentity
benchmarkId
benchmarkProtocolVersion
qualificationDeclaration
criterionMatchEvidence
benchmarkProvenanceEvidence
crossChainBinding
provenanceCriterionResult
qualificationEvidenceState
```

Required output literals:

```text
version = p3-r17-late-chain-benchmark-provenance-qualification-evidence-v1
kind = late_chain_benchmark_provenance_qualification_evidence
```

`criterionMatchEvidence` must preserve the complete trusted P3-R16 record.

`benchmarkProvenanceEvidence` must preserve the complete trusted P3-R4 record.

`crossChainBinding` must be a deterministic immutable audit projection containing enough exact identities to prove at minimum:

```text
p3R3EvidenceIdentity
leftPolicyIdentity
rightPolicyIdentity
memberA.caseId
memberA.r1ResultIdentity
memberB.caseId
memberB.r1ResultIdentity
```

and the exact matching provenance case tuples. The implementation may choose an exact closed field spelling only within the authorized P3-R17 contracts file, but it may not weaken or omit any binding required by Section 12.

---

## 16. Determinism, hardening, and identity

The future implementation must:

- reject wrong arity before predecessor invocation or caller-root reads;
- delegate the first four roots directly to canonical P3-R16;
- snapshot/harden the fifth and sixth roots before independent semantic reuse;
- reject Proxy/accessor/symbol/non-enumerable/non-plain/sparse/extended-object drift at every P3-R17-owned closed object boundary;
- use complete own-key validation rather than enumerable-string-only validation for P3-R17-owned records;
- never invoke caller accessors while validating/freeze-checking an input;
- use the repository direct string comparator, not locale-sensitive collation;
- reject duplicate or unsorted caller set-like arrays rather than silently repairing them;
- derive `qualificationEvidenceIdentity` from the complete semantic output projection excluding only the identity field itself;
- bind the exact trusted R16 identity, trusted R4 identity, trusted R3 binding identity, caller declaration, cross-chain binding, provenance result, and root state into that identity;
- return output detached from caller mutation and deeply frozen; and
- perform no ambient side effect.

Identical canonical inputs must produce byte-identical canonical output and identical identity. Any semantically relevant predecessor identity, policy orientation, case identity, provenance value, caller criterion, or state change must change or fail the evidence identity as appropriate.

---

## 17. Required focused proof matrix

The future implementation test path must prove at minimum:

### Arity and predecessor delegation

- exactly six arguments accepted;
- every lower/higher arity rejected before predecessor invocation or caller reads;
- arguments 1-4 are delegated directly to canonical P3-R16;
- hostile predecessor roots fail through canonical predecessor semantics rather than P3-R17 reinterpretation.

### Reconstruction-bundle hardening

- fifth root exact 16-key contract;
- missing/extra/string/symbol/non-enumerable/accessor keys rejected;
- sparse/extended/non-plain nested P3-R17-owned structures rejected where applicable;
- no sorting/repair of hostile input.

### Trusted predecessor binding

- trusted R16 identity required;
- trusted R4 identity required;
- trusted R4 `p3R3EvidenceIdentity` equals independently reconstructed trusted P3-R3 identity from the same bundle;
- benchmark mismatch rejected;
- protocol mismatch rejected;
- task-family mismatch rejected;
- left/right policy swap rejected;
- mixed late-chain member policy identities rejected;
- unrelated same-label provenance policy pair rejected;
- missing provenance case rejected;
- extra provenance case rejected;
- duplicate provenance case rejected;
- caseId substitution rejected;
- r1ResultIdentity substitution rejected;
- exactly-two-case substrate required.

### Qualification declaration

- exact keys only;
- exact version/kind only;
- stable-ID grammar and 512 UTF-8-byte bound;
- lowercase SHA-256 qualification policy identity;
- exact trusted R16 expected identity binding;
- exact trusted R4 expected identity binding;
- criterionSetId remains independent from qualificationId.

### Literal provenance criteria

- every allowed closed value accepted in valid ordered subsets;
- empty subsets rejected;
- duplicates rejected;
- unsorted subsets rejected;
- unsupported literals rejected;
- corpus-role presence semantics exact;
- chronology all-cases membership semantics exact;
- contamination all-cases membership semantics exact;
- `none-known` never relabeled as clean/uncontaminated/safe;
- no statistical/sufficiency inference emitted.

### Root precedence

- R16 insufficiency dominates all provenance results;
- otherwise R16 not-satisfied produces combined not-satisfied;
- otherwise any provenance not-satisfied produces combined not-satisfied;
- only R16 all-satisfied plus all provenance-satisfied produces combined all-satisfied.

### Identity and immutability

- deterministic canonical identity;
- object insertion-order invariance where semantics are set/map-like;
- identity sensitivity to every semantic declaration/provenance/binding/state change;
- complete trusted R16 preservation;
- complete trusted R4 preservation;
- explicit cross-chain binding preservation;
- detached output;
- deep frozen output;
- self-reference-free identity projection.

### Non-grants

Tests must prove the implementation exposes no score, weight, threshold, significance, confidence, ranking, promotion, winner/default, execution, persistence, telemetry, learning, product/release, ruleset, P3-closeout, P4, or project-completion surface.

---

## 18. Exact non-grants

This authorization does not grant:

```text
CALLER-DECLARED CRITERIA = REPOSITORY POLICY
ALL_DECLARED_QUALIFICATION_CRITERIA_SATISFIED = GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR
ALL_DECLARED_QUALIFICATION_CRITERIA_SATISFIED = PROMOTION / RECOMMENDATION / WINNER / DEFAULT
LATER_IN_TIME MATCH = SUFFICIENT HOLDOUT
NONE_KNOWN MATCH = UNCONTAMINATED / CLEAN / SAFE
PROVENANCE CRITERIA MATCH = UNBIASED / REPRESENTATIVE / STATISTICALLY VALID
CROSS-DIMENSION NUMERIC AGGREGATE / SCORE = NOT_AUTHORIZED
WEIGHTING / MAJORITY / PARETO / DOMINANCE POLICY = NOT_AUTHORIZED
NUMERIC THRESHOLD / MARGIN / EPSILON / TOLERANCE = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
THREE-OR-MORE-CASE / ARBITRARY-N QUALIFICATION = NOT_AUTHORIZED
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED
MULTI-STRATEGY RANKING / LEADERBOARD = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE / RESULT MUTATION = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
CROSS-REPOSITORY AGGREGATION / LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
P3 OVERALL CLOSURE = NOT_ESTABLISHED
P3-R18+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## 19. Qualification requirements for this authorization candidate

This authorization candidate itself becomes canonical only if one frozen exact head proves all of:

```text
BASE = current canonical main
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = this authorization document only
GOVERNANCE provenance = SUCCESS
GOVERNANCE legacy-tests = SUCCESS
K2 runtime-change-classifier / k2-runtime-gate = SUCCESS WHEN WORKFLOW APPLIES, OR PROVEN NON-APPLICABLE BY PATH FILTER
INDEPENDENT SUBSTANTIVE EXTERNAL SEMANTIC REVIEW = 2 DISTINCT CHANNELS / 2 TERMINAL CLEAN
UNRESOLVED ACTIONABLE FINDINGS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET 20707483 = active / bypass_actors=[] / current_user_can_bypass=never
GUARDED NORMAL MERGE WITH EXACT expected_head_sha = REQUIRED
POST-MERGE MAIN / ORDERED PARENTS / TREE / BLOB / SIGNATURE / APPLICABLE CHECK PROOF = REQUIRED
WAIVER = NO
```

Machine CI cannot substitute for semantic review. Repeated attempts from the same provider do not count as distinct channels. Billing-blocked, skipped, status-only, stale-head, or identity-ambiguous responses do not count.

Any head movement invalidates all prior exact-head qualification evidence and requires fresh qualification from zero.

---

## 20. Closing procedure if this authorization is adopted

After guarded merge of this exact authorization record:

1. prove canonical `main` and exact ordered merge parents;
2. prove merge tree and authorization blob identity;
3. prove GitHub signature verification status;
4. prove applicable post-merge Governance/K2 state without inventing non-applicable jobs;
5. revalidate ruleset 20707483;
6. publish the immutable post-merge authorization-adoption proof in the authorization PR;
7. only then classify `P3-R17 IMPLEMENTATION AUTHORITY = EFFECTIVE FOR THE EXACT FOUR-PATH ALLOWLIST IN SECTION 7`;
8. only then may a separate P3-R17 implementation branch/PR begin.

No roadmap reconciliation is required between authorization adoption and its exact bounded implementation unless live canonical governance or repository state introduces a conflicting change. The implementation must still re-read live `main`, root `AGENTS.md`, `docs/roadmap/NEXT.md`, this authorization record, and all canonical predecessors before mutation.

---

## 21. Current decision while this record is non-canonical

```text
P3_R17_AUTHORIZATION_CANDIDATE = PRESENT
P3_R17_IMPLEMENTATION_AUTHORITY = NOT_EFFECTIVE
P3_R17_IMPLEMENTATION = NOT_STARTED
P3_R18_PLUS_IMPLEMENTATION = NOT_AUTHORIZED
P4_P8_IMPLEMENTATION = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The candidate is intentionally narrow: compose trusted late-chain R16 criterion evidence with trusted literal P3-R4 benchmark provenance and caller-owned P3-R5-compatible literal provenance criteria. Nothing broader is implied.