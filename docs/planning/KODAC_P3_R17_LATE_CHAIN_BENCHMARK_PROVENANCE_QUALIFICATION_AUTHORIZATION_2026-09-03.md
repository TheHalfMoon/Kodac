# Kodac P3-R17 — Late-Chain Benchmark-Provenance Substrate Qualification Authorization Candidate

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

## 2. Canonical baseline and review narrowing

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 4bf4329cdfee3c599071d8eaca253bae8648b6d0
P3_R16_IMPLEMENTATION_PR = #307
P3_R16_IMPLEMENTATION_MERGE = 0fb9f47db144619c580c69052aa98d79c4f71dc6
P3_R16_IMPLEMENTATION_POST_MERGE_PROOF = #307 / 5517289297
P3_R16_CURRENT_VIEW_RECONCILIATION_PR = #308
P3_R16_CURRENT_VIEW_RECONCILIATION_MERGE = 4bf4329cdfee3c599071d8eaca253bae8648b6d0
P3_R16_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #308 / 5519926474
P3_R17_SUCCESSOR_ANALYSIS = #308 / 5525126768
P3_R17_AUTHORIZATION_PREDECESSOR_HEAD_REVIEW_FINDING = #309 / 5525235321
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The predecessor authorization head overstated the binding as proving the same exact early-chain P3-R3 comparison context as the late-chain R16 comparison. CodeRabbit correctly identified that canonical R16 does not expose the complete P3-R3 `planIdentity`, `requestIdentity`, `candidateSetIdentity`, `repositoryIdentity`, `snapshotIdentity`, `contentIdentity`, `taskIdentity`, shared-evaluation-context identity, or comparison-policy identity needed for that stronger claim.

This revision chooses the bounded repair that requires no predecessor mutation:

```text
R17 CLAIM = SAME BENCHMARK/PROTOCOL + POLICY ORIENTATION + EXACT TWO-CASE R1 SUBSTRATE
R17 CLAIM != SAME EXACT P3-R3 PLAN / REQUEST / SHARED EVALUATION CONTEXT
R17 CLAIM != EARLY-CHAIN / LATE-CHAIN COMPARISON EQUIVALENCE
```

No predecessor is modified. Any future mechanism that needs exact early-chain/late-chain controlled-comparison equivalence requires separate evidence and separate canonical authority.

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

Canonical P3-R16 reconstructs trusted P3-R15 late-chain directional-relation evidence and applies one explicit caller-owned seven-dimension relation-criteria declaration. It provides deterministic late-chain metric-criterion evidence only:

```text
TRUSTED P3-R16 CRITERION-MATCH EVIDENCE
-> PER-DIMENSION SATISFIED | NOT_SATISFIED | INSUFFICIENT_EVIDENCE
-> ONE CLOSED R16 LOGICAL CRITERION-MATCH STATE
```

Canonical P3-R4 separately reconstructs literal benchmark provenance, and canonical P3-R5 defines caller-owned literal provenance-criterion semantics. Those provenance semantics belong to the earlier P3-R3/P3-R4/P3-R5 chain.

There is currently no canonical mechanism that answers the narrower, supportable question:

> For one trusted P3-R16 late-chain criterion result, do caller-declared literal provenance criteria match a trusted P3-R4 provenance record that shares the same benchmark/protocol, left/right policy orientation, and exact two-case `(caseId, r1ResultIdentity)` substrate?

The predecessor R16 successor analysis explicitly deferred provenance composition to a future proof rather than smuggling it into R16.

The minimum supportable boundary is therefore:

```text
ONE TRUSTED P3-R16 LATE-CHAIN CRITERION-MATCH RECORD
+ ONE TRUSTED P3-R4 BENCHMARK-PROVENANCE RECORD
+ ONE EXPLICIT CALLER-OWNED LITERAL PROVENANCE-CRITERIA DECLARATION
+ EXACT BENCHMARK / PROTOCOL / POLICY-ORIENTATION / TWO-CASE-R1 SUBSTRATE BINDING
-> PER-PROVENANCE-CRITERION LITERAL MATCH EVIDENCE
-> ONE CLOSED SUBSTRATE-QUALIFICATION STATE
```

This boundary intentionally does **not** prove that the P3-R4/P3-R3 record and P3-R16 record used the same complete plan/request/shared-evaluation/comparison-policy context.

---

## 5. Why P3-R5 does not close this gap

Canonical P3-R5 combines caller-owned metric criteria and literal provenance criteria, but it consumes canonical P3-R3/P3-R4 evidence from the earlier pairwise-metric chain.

Canonical P3-R14 through P3-R16 prove a later lineage:

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

Using P3-R5 as though its earlier metric qualification directly qualified R16 would bypass that late-chain lineage.

P3-R17 may reuse only:

- canonical P3-R4 as the source of literal benchmark-provenance truth;
- canonical P3-R5 literal provenance presence/membership semantics; and
- canonical P3-R16 as the source of late-chain metric-criterion truth.

P3-R17 must not trust caller-serialized P3-R3, P3-R4, P3-R5, P3-R14, P3-R15, or P3-R16 outputs as substitutes for canonical reconstruction.

---

## 6. Planning and ADR fit

The durable master plan requires:

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
MEASURE BEFORE BROAD QUALITY CLAIMS
```

and states that P3 promotion eventually requires KodacBench evidence that selective context improves or matches accepted quality without unacceptable dilution/regression.

ADR-0010 requires reproducible benchmark identity, contamination/leakage awareness, held-out or later-in-time evidence where possible, and independently visible task-family metrics before broad superiority claims.

The final gap review requires frozen/held-out provenance controls and context-dilution measurement. Internal research references including ContextBench, SWE-PRBench, and Agent Retrieval Bench remain planning evidence only.

P3-R17 is only one bounded substrate-association step toward that durable objective. It does not itself establish sufficient benchmark evidence or promotion authority.

---

## 7. Exact future implementation allowlist

Only after this authorization becomes canonical and post-merge proven may one future P3-R17 implementation candidate modify exactly these four paths:

```text
packages/kodac-runtime/bench/p3-r17/contracts.ts
packages/kodac-runtime/bench/p3-r17/late-chain-benchmark-provenance-substrate-qualification.ts
packages/kodac-runtime/test/p3-r17-late-chain-benchmark-provenance-substrate-qualification.test.ts
docs/planning/KODAC_P3_R17_LATE_CHAIN_BENCHMARK_PROVENANCE_SUBSTRATE_QUALIFICATION_EVIDENCE_2026-09-03.md
```

No fifth path is authorized.

No predecessor implementation, benchmark corpus/manifest/fixture/result, package metadata, lockfile, workflow, export barrel, CLI/API/product surface, K2/K5/Done Gate surface, provider/model configuration, persistence layer, release configuration, or ruleset path is authorized.

---

## 8. Exact future public boundary

Only after this authorization becomes canonical and post-merge proven may one future implementation expose one pure deterministic builder semantically equivalent to:

```text
buildLateChainBenchmarkProvenanceSubstrateQualificationEvidence(
  leftReconstructionValue: unknown,
  rightReconstructionValue: unknown,
  comparisonDeclarationValue: unknown,
  criterionDeclarationValue: unknown,
  provenanceReconstructionValue: unknown,
  qualificationDeclarationValue: unknown,
) -> LateChainBenchmarkProvenanceSubstrateQualificationEvidence
```

The public runtime contract is **exactly six arguments**.

Mandatory call order:

```text
1. reject arguments.length !== 6 before predecessor invocation or caller-root reads
2. pass arguments 1-4 directly and unchanged to canonical buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence(...)
3. perform no independent semantic read from arguments 1-4
4. treat only the returned detached deeply frozen P3-R16 record as trusted late-chain criterion truth
5. harden argument 5 and validate its exact P3-R4 reconstruction-bundle keys
6. reconstruct canonical P3-R4 benchmark provenance from only that hardened bundle
7. reconstruct canonical P3-R3 from that same hardened bundle only to obtain the trusted policy-orientation and P3-R3 identity projection needed to validate the P3-R4 linkage
8. require trustedR4.p3R3EvidenceIdentity == trustedR3.evidenceIdentity
9. bind benchmark/protocol equality across trusted R16/R4/R3
10. bind left/right P3-R3 policy identities to the corresponding trusted late-chain member policy identities
11. bind trusted P3-R4 case provenance to exactly the same two `(caseId, r1ResultIdentity)` tuples preserved by trusted late-chain member references
12. DO NOT infer or emit equality of P3-R3 plan/request/context identities with the late chain
13. harden and validate argument 6
14. bind the caller declaration to the exact trusted R16 and R4 evidence identities
15. derive only literal provenance criterion results using the closed P3-R5-compatible rules below
16. derive one closed substrate-qualification state with exact precedence
17. preserve complete trusted R16 and trusted R4 evidence plus an explicit bounded substrate-binding projection
18. derive one self-reference-free deterministic P3-R17 identity
19. return detached deeply frozen output
```

Canonical R3 reconstruction from the fifth bundle is an identity/orientation support operation only. It may not become an alternate metric-criterion path. Canonical R4 remains the only source of provenance truth. Canonical R16 remains the only source of late-chain metric-criterion truth.

---

## 9. Closed P3-R4 reconstruction bundle

`provenanceReconstructionValue` contains exactly these keys and no others:

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

The future implementation must pass those values to canonical `buildContextPolicyBenchmarkProvenanceEvidence(...)` in the canonical established order.

The same hardened values may be used with canonical P2-R4/P3-R3 predecessors solely to reproduce the trusted P3-R3 identity and left/right policy identities that P3-R4 already binds by `p3R3EvidenceIdentity`.

No serialized caller-provided P3-R3 or P3-R4 evidence object is an authorized input.

---

## 10. Closed caller qualification declaration

The sixth argument contains exactly:

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
version = p3-r17-late-chain-benchmark-provenance-substrate-qualification-declaration-v1
kind = qualify_late_chain_criteria_with_benchmark_provenance_substrate
```

`qualificationId` is a caller-owned stable identifier under the repository stable-ID grammar and maximum 512 UTF-8-byte bound. It must equal the exact `qualificationId` in trusted P3-R4 evidence. It is independent from P3-R16 `criterionSetId`.

`qualificationPolicyIdentity` must be exactly `sha256:<64 lowercase hex>` and identifies only the caller-owned substrate-qualification declaration.

`criterionMatchEvidenceIdentity` and `provenanceEvidenceIdentity` must each be exact lowercase SHA-256 identities and must equal the canonically reconstructed trusted P3-R16 and P3-R4 identities. Mismatch fails closed; silent repair is forbidden.

---

## 11. Literal provenance criteria

`provenanceCriteria` contains exactly:

```text
requiredCorpusRoles
allowedChronologyStatuses
allowedContaminationStatuses
```

Each array is non-empty, duplicate-free, already strictly ordered under the repository direct string comparator, and restricted to the closed values below. Input sorting/repair is forbidden.

### 11.1 Required corpus roles

```text
development
holdout
```

Satisfied iff every declared role occurs at least once in trusted P3-R4 `caseProvenance`.

### 11.2 Allowed chronology statuses

```text
chronology-unproven
later-in-time
not-later-in-time
```

Satisfied iff every trusted P3-R4 case has a literal chronology status contained in the caller-declared set.

### 11.3 Allowed contamination statuses

```text
known
none-known
unknown
```

Satisfied iff every trusted P3-R4 case has a literal contamination status contained in the caller-declared set.

Required non-equivalences:

```text
ROLE PRESENCE != SUFFICIENT / REPRESENTATIVE CORPUS
later-in-time MATCH != SUFFICIENT HOLDOUT
none-known MATCH != UNCONTAMINATED / CLEAN / SAFE
PROVENANCE CRITERIA MATCH != UNBIASED / STATISTICALLY VALID
```

---

## 12. Mandatory bounded substrate binding

P3-R17 must prove only the substrate properties below. It must not call them exact comparison equivalence.

### 12.1 Benchmark/protocol/task-family binding

Require:

```text
trustedR16.benchmarkId == trustedR4.benchmarkId == trustedR3.benchmarkId
trustedR16.benchmarkProtocolVersion == trustedR4.benchmarkProtocolVersion == trustedR3.benchmarkProtocolVersion
trustedR4.taskFamily == trustedR3.taskFamily == context-selection
trustedR4.p3R3EvidenceIdentity == trustedR3.evidenceIdentity
```

### 12.2 Left/right policy-orientation binding

Trusted P3-R16 preserves R14 -> R13 -> R12 member references for both strategy sides. Each side has two member policy identities.

Require:

```text
trusted left member-A policyIdentity
  == trusted left member-B policyIdentity
  == trustedR3.leftPolicyIdentity

trusted right member-A policyIdentity
  == trusted right member-B policyIdentity
  == trustedR3.rightPolicyIdentity

trustedR3.leftPolicyIdentity != trustedR3.rightPolicyIdentity
```

A side swap, mixed-policy two-case strategy, or unrelated policy pair fails closed.

### 12.3 Exactly-two-case R1 substrate binding

Let trusted late-chain member A/B references define exactly two `(caseId, r1ResultIdentity)` tuples. Require:

```text
trustedR4.caseProvenance.length == 2
set(trustedR4.caseProvenance.map(caseId, r1ResultIdentity))
  == set(trusted late-chain member-A/member-B (caseId, r1ResultIdentity))
```

Missing, extra, duplicate, substituted case, or substituted `r1ResultIdentity` fails closed.

### 12.4 Explicitly unbound context

The following P3-R3 identities are **not** proven equal to any late-chain identity by P3-R17 because canonical P3-R16 does not preserve a matching comparison-context projection:

```text
planIdentity
requestIdentity
candidateSetIdentity
repositoryIdentity
snapshotIdentity
contentIdentity
taskIdentity
sharedEvaluationContextIdentity
comparisonPolicyIdentity
```

Therefore:

```text
R17 SUBSTRATE BINDING != SAME EXACT P3-R3 COMPARISON
R17 SUBSTRATE BINDING != SAME PLAN / REQUEST / SHARED EVALUATION CONTEXT
R17 SUBSTRATE BINDING != EARLY-CHAIN / LATE-CHAIN COMPARISON EQUIVALENCE
```

A future requirement for those equalities needs a separately authorized evidence mechanism. P3-R17 must not infer them from matching benchmark labels, policies, cases, or R1 identities.

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

The three states are exactly:

```text
SATISFIED
NOT_SATISFIED
```

Observed arrays are duplicate-free direct-string-order projections of unique literal values in trusted P3-R4 `caseProvenance`.

No derived `sufficient-holdout`, `unbiased`, `representative`, `uncontaminated`, `clean`, `safe`, or `statistically-valid` term is permitted.

---

## 14. Closed substrate-qualification state

The P3-R17 root state is exactly one of:

```text
ALL_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_SATISFIED
ONE_OR_MORE_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_NOT_SATISFIED
INSUFFICIENT_DIRECTIONAL_EVIDENCE
```

Precedence:

1. trusted R16 `INSUFFICIENT_DIRECTIONAL_EVIDENCE` -> P3-R17 `INSUFFICIENT_DIRECTIONAL_EVIDENCE`;
2. otherwise trusted R16 `ONE_OR_MORE_DECLARED_RELATION_CRITERIA_NOT_SATISFIED`, or any provenance `NOT_SATISFIED` -> P3-R17 `ONE_OR_MORE_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_NOT_SATISFIED`;
3. only trusted R16 `ALL_DECLARED_RELATION_CRITERIA_SATISFIED` plus all provenance states `SATISFIED` -> P3-R17 `ALL_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_SATISFIED`.

Interpretation is strictly:

```text
CALLER R16 CRITERIA MATCHED
AND
CALLER LITERAL PROVENANCE CRITERIA MATCHED
ON A PROVEN SAME-BENCHMARK / SAME-POLICY-ORIENTATION / SAME-TWO-CASE-R1 SUBSTRATE
```

It is not proof of exact comparison equivalence, benchmark sufficiency, global superiority, repository acceptance, promotion, winner/default, release readiness, Done Gate completion, or project completion.

---

## 15. Minimum future output contract

The future result preserves at minimum:

```text
version
kind
substrateQualificationEvidenceIdentity
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
substrateBinding
provenanceCriterionResult
substrateQualificationEvidenceState
```

Required literals:

```text
version = p3-r17-late-chain-benchmark-provenance-substrate-qualification-evidence-v1
kind = late_chain_benchmark_provenance_substrate_qualification_evidence
```

The complete trusted P3-R16 record and complete trusted P3-R4 record must be preserved unchanged as nested evidence.

`substrateBinding` must be a closed deterministic audit projection containing exactly the supportable binding evidence, including at minimum:

```text
p3R3EvidenceIdentity
leftPolicyIdentity
rightPolicyIdentity
memberA.caseId
memberA.r1ResultIdentity
memberB.caseId
memberB.r1ResultIdentity
matching provenance case tuples
```

It must not contain a boolean or label claiming plan/request/context equivalence.

---

## 16. Determinism, hardening, and identity

The future implementation must:

- reject wrong arity before any predecessor invocation or caller-root read;
- delegate arguments 1-4 directly to canonical P3-R16;
- snapshot/harden arguments 5-6 before P3-R17-owned semantic reuse;
- reject Proxy/accessor/symbol/non-enumerable/non-plain/sparse/extended-object drift at P3-R17-owned closed boundaries;
- use complete own-key/descriptor validation rather than enumerable-string-only validation;
- avoid invoking caller accessors;
- use direct string comparison, not locale-sensitive collation;
- reject duplicate/unsorted caller set-like arrays rather than repair them;
- derive `substrateQualificationEvidenceIdentity` from the complete semantic output projection excluding only itself;
- bind trusted R16 identity, trusted R4 identity, trusted R3 identity projection, caller declaration, substrate binding, provenance result, and root state into that identity;
- return output detached from caller mutation and deeply frozen; and
- perform no ambient side effect.

P3-R17 must not include unproven plan/request/context-equality fields in the semantic identity as though they had been cross-chain validated. The trusted R4 identity may still change when its own canonical input context changes; that does not upgrade R17 to an exact-comparison equivalence proof.

---

## 17. Required focused proof matrix

The future implementation test path must prove at minimum:

### Arity and delegation

- exactly six arguments accepted;
- every wrong arity rejected before predecessor invocation/caller reads;
- arguments 1-4 delegated directly to canonical P3-R16;
- hostile predecessor roots fail through canonical predecessor semantics.

### Fifth/sixth root hardening

- exact 16-key provenance reconstruction bundle;
- exact qualification-declaration keys;
- missing/extra/string/symbol/non-enumerable/accessor key rejection;
- Proxy and non-plain/sparse/extended P3-R17-owned structure rejection;
- no sorting/repair.

### Trusted substrate binding

- trusted R16 identity required;
- trusted R4 identity required;
- trusted R4 P3-R3 identity equals trusted same-bundle P3-R3 reconstruction;
- benchmark mismatch rejected;
- protocol mismatch rejected;
- task-family mismatch rejected;
- left/right policy swap rejected;
- mixed member policy identities rejected;
- unrelated policy pair rejected;
- missing/extra/duplicate provenance case rejected;
- caseId substitution rejected;
- r1ResultIdentity substitution rejected;
- exactly two cases required.

### Explicit non-equivalence

Tests and output-shape assertions must prove P3-R17 does not expose or claim:

```text
sameExactComparison
samePlan
sameRequest
sameSharedEvaluationContext
earlyLateComparisonEquivalent
```

A valid trusted P3-R4 record may differ in P3-R3 plan/request/shared-evaluation/comparison-policy context while sharing the authorized benchmark/policy/two-case substrate. P3-R17 must not silently reject or relabel that difference as an equivalence result unless a future separately authorized mechanism provides the missing identity bridge.

### Caller declaration and literal provenance criteria

- stable-ID grammar/512-byte bound;
- lowercase SHA-256 policy identity;
- exact trusted R16/R4 expected identity binding;
- `qualificationId` independent from `criterionSetId`;
- all closed provenance values accepted only in valid non-empty strictly ordered duplicate-free sets;
- corpus presence semantics exact;
- chronology all-case membership exact;
- contamination all-case membership exact;
- `none-known` never relabeled clean/uncontaminated/safe;
- no sufficiency/statistical inference.

### Root precedence

- R16 insufficiency dominates;
- otherwise R16 not-satisfied produces substrate not-satisfied;
- otherwise any provenance not-satisfied produces substrate not-satisfied;
- only R16 all-satisfied + all provenance-satisfied produces substrate all-satisfied.

### Identity and immutability

- deterministic canonical identity;
- insertion-order invariance where semantics are set/map-like;
- sensitivity to every authorized semantic declaration/provenance/binding/state change;
- complete trusted R16 preservation;
- complete trusted R4 preservation;
- explicit bounded substrate binding preservation;
- detached/deep-frozen output;
- self-reference-free identity.

### Non-grants

No score, weight, threshold, statistics, comparison-equivalence claim, ranking, promotion, default/winner, execution, persistence, telemetry, learning, product/release, ruleset, P3-closeout, P4, or project-completion surface.

---

## 18. Exact non-grants

```text
R17 SUBSTRATE BINDING = SAME EXACT P3-R3 COMPARISON -> FALSE / NOT_ESTABLISHED
R17 SUBSTRATE BINDING = SAME PLAN / REQUEST / SHARED EVALUATION CONTEXT -> FALSE / NOT_ESTABLISHED
R17 SUBSTRATE BINDING = EARLY/LATE COMPARISON EQUIVALENCE -> FALSE / NOT_ESTABLISHED
CALLER CRITERIA = REPOSITORY POLICY -> FALSE
ALL_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_SATISFIED = GLOBAL SUPERIORITY -> FALSE
ALL_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_SATISFIED = PROMOTION / RECOMMENDATION / WINNER / DEFAULT -> FALSE
later-in-time MATCH = SUFFICIENT HOLDOUT -> FALSE
none-known MATCH = UNCONTAMINATED / CLEAN / SAFE -> FALSE
PROVENANCE CRITERIA MATCH = UNBIASED / REPRESENTATIVE / STATISTICALLY VALID -> FALSE
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

This authorization candidate becomes canonical only if one frozen exact head proves:

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

Machine CI cannot substitute for semantic review. Repeated attempts from one provider are one channel. Billing-blocked, skipped, status-only, stale-head, or identity-ambiguous responses do not count.

Any head movement invalidates every prior exact-head qualification artifact and requires qualification from zero.

---

## 20. Closing procedure if adopted

After guarded merge of this exact authorization record:

1. prove canonical `main` and exact ordered merge parents;
2. prove merge tree and authorization blob identity;
3. prove GitHub signature status;
4. prove applicable post-merge Governance/K2 state without inventing non-applicable jobs;
5. revalidate ruleset 20707483;
6. publish immutable post-merge authorization-adoption proof in the authorization PR;
7. only then classify P3-R17 implementation authority as effective for the exact four-path allowlist in Section 7;
8. only then may a separate P3-R17 implementation branch/PR begin.

The implementation must re-read live `main`, root `AGENTS.md`, `docs/roadmap/NEXT.md`, this authorization, and canonical predecessors before mutation.

---

## 21. Current decision while non-canonical

```text
P3_R17_AUTHORIZATION_CANDIDATE = PRESENT
P3_R17_IMPLEMENTATION_AUTHORITY = NOT_EFFECTIVE
P3_R17_IMPLEMENTATION = NOT_STARTED
P3_R18_PLUS_IMPLEMENTATION = NOT_AUTHORIZED
P4_P8_IMPLEMENTATION = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This revision is intentionally narrower than its predecessor head. It proves only benchmark/protocol, policy-orientation, and exact two-case-R1 provenance-substrate compatibility around trusted R16; it does not claim exact early-chain/late-chain comparison equivalence.