# Kodac P3-R17 — Late-Chain Benchmark-Provenance Substrate Qualification Evidence Candidate

Status: **IMPLEMENTATION_CANDIDATE / NOT_CANONICAL / NOT_QUALIFIED**  
Date: 2026-09-03  
Waiver: **NO**

## Canonical authority

```text
AUTHORIZATION_PR = #309
AUTHORIZATION_QUALIFIED_HEAD = 2e463a05b17ff4e6b0bd71079b38dd754c2796b3
AUTHORIZATION_QUALIFIED_TREE = d1a24aea29a1e9c7542c0706f4803cee4a93a24e
AUTHORIZATION_DOCUMENT_BLOB = a60fe49be7188789cc9bd1bfb1f1458d76ac58ea
AUTHORIZATION_MERGE / BASE = a224a0ad7c7adbf9dd879e1c4ac1ddfaceed6a38
AUTHORIZATION_POST_MERGE_PROOF = #309 / 5525500115
GITHUB_MERGE_SIGNATURE = verified / valid
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

This implementation candidate derives authority only from the canonical P3-R17 authorization record. It creates no P3-R18+, P4-P8, benchmark-execution, statistical, ranking, promotion, product, release, persistence, learning, ruleset, or project-completion authority.

## Exact implementation allowlist

Only these four paths may differ from the canonical authorization merge:

```text
packages/kodac-runtime/bench/p3-r17/contracts.ts
packages/kodac-runtime/bench/p3-r17/late-chain-benchmark-provenance-substrate-qualification.ts
packages/kodac-runtime/test/p3-r17-late-chain-benchmark-provenance-substrate-qualification.test.ts
docs/planning/KODAC_P3_R17_LATE_CHAIN_BENCHMARK_PROVENANCE_SUBSTRATE_QUALIFICATION_EVIDENCE_2026-09-03.md
```

No fifth path is authorized.

## Implemented public boundary

The implementation candidate exposes only one pure deterministic builder:

```text
buildLateChainBenchmarkProvenanceSubstrateQualificationEvidence(
  leftReconstructionValue,
  rightReconstructionValue,
  comparisonDeclarationValue,
  criterionDeclarationValue,
  provenanceReconstructionValue,
  qualificationDeclarationValue,
)
```

The public arity is exactly six.

The implemented trust sequence is bounded to:

```text
EXACT SIX-ARGUMENT ARITY GATE
-> DIRECT DELEGATION OF ARGUMENTS 1-4 TO CANONICAL P3-R16
-> TRUST ONLY THE CANONICAL DETACHED / DEEPLY FROZEN R16 RESULT AS LATE-CHAIN CRITERION TRUTH
-> HARDEN ARGUMENT 5 AS AN EXACT 16-KEY CANONICAL JSON RECONSTRUCTION BUNDLE
-> RECONSTRUCT CANONICAL P3-R4 FROM THE HARDENED BUNDLE
-> RECONSTRUCT CANONICAL P3-R3 FROM THE SAME BUNDLE ONLY FOR R4 IDENTITY / POLICY-ORIENTATION SUPPORT
-> REQUIRE R4.p3R3EvidenceIdentity == R3.evidenceIdentity
-> BIND BENCHMARK + PROTOCOL ACROSS R16 / R4 / R3
-> BIND LEFT / RIGHT R3 POLICY IDENTITIES TO THE CORRESPONDING LATE-CHAIN MEMBER POLICY IDENTITIES
-> BIND R4 TO EXACTLY THE SAME TWO DISTINCT (caseId, r1ResultIdentity) TUPLES PRESERVED BY BOTH LATE-CHAIN STRATEGY SIDES
-> HARDEN ARGUMENT 6 AS THE EXACT CALLER QUALIFICATION DECLARATION
-> BIND CALLER DECLARATION TO EXACT TRUSTED R16 / R4 IDENTITIES
-> APPLY ONLY LITERAL P3-R5-COMPATIBLE PROVENANCE PRESENCE / MEMBERSHIP SEMANTICS
-> DERIVE THE CLOSED R17 ROOT STATE WITH R16 INSUFFICIENCY PRECEDENCE
-> PRESERVE COMPLETE TRUSTED R16 + R4 EVIDENCE AND A BOUNDED SUBSTRATE-BINDING AUDIT PROJECTION
-> DERIVE SELF-REFERENCE-FREE CANONICAL SHA-256 IDENTITY
-> RETURN DETACHED DEEPLY FROZEN OUTPUT
```

Arguments 1-4 are not independently interpreted by R17. Canonical R16 remains the only source of late-chain metric-criterion truth. Canonical R4 remains the only source of provenance truth. Canonical R3 reconstruction is only identity/orientation support for the R4 binding.

## Explicit bounded cross-chain claim

The implementation can establish only:

```text
same benchmarkId
same benchmarkProtocolVersion
same left/right policy orientation
same exact two-case (caseId, r1ResultIdentity) substrate
literal caller provenance criteria match
```

It does not emit or establish:

```text
sameExactComparison
samePlan
sameRequest
sameSharedEvaluationContext
earlyLateComparisonEquivalent
```

A canonical R4/R3 reconstruction may use a different plan/request/shared-evaluation/comparison-policy context while sharing the authorized benchmark, policy orientation, and exact two-case R1 substrate. R17 does not silently reject or relabel that difference as comparison equivalence.

## Closed caller declaration and provenance semantics

The sixth argument is restricted to exactly:

```text
version
kind
qualificationId
qualificationPolicyIdentity
criterionMatchEvidenceIdentity
provenanceEvidenceIdentity
provenanceCriteria
```

with required literals:

```text
version = p3-r17-late-chain-benchmark-provenance-substrate-qualification-declaration-v1
kind = qualify_late_chain_criteria_with_benchmark_provenance_substrate
```

`qualificationId` uses the repository stable-ID grammar, is limited to 512 UTF-8 bytes, must equal trusted R4 `qualificationId`, and remains independent from R16 `criterionSetId`.

The three caller provenance sets are non-empty, duplicate-free, already strictly ordered by direct string comparator, and restricted to their canonical closed vocabularies. The implementation never sorts or repairs caller declarations.

Literal criterion meaning remains exactly:

```text
requiredCorpusRoles:
  every caller-declared role occurs in trusted R4 caseProvenance

allowedChronologyStatuses:
  every trusted R4 case chronology status is a member of the caller-declared allowed set

allowedContaminationStatuses:
  every trusted R4 case contamination status is a member of the caller-declared allowed set
```

Required non-equivalences are preserved:

```text
ROLE PRESENCE != SUFFICIENT / REPRESENTATIVE CORPUS
later-in-time MATCH != SUFFICIENT HOLDOUT
none-known MATCH != UNCONTAMINATED / CLEAN / SAFE
PROVENANCE CRITERIA MATCH != UNBIASED / STATISTICALLY VALID
```

## Closed root state

```text
R16 INSUFFICIENT_DIRECTIONAL_EVIDENCE
-> INSUFFICIENT_DIRECTIONAL_EVIDENCE

ELSE R16 ONE_OR_MORE_DECLARED_RELATION_CRITERIA_NOT_SATISFIED
OR ANY PROVENANCE NOT_SATISFIED
-> ONE_OR_MORE_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_NOT_SATISFIED

ELSE R16 ALL_DECLARED_RELATION_CRITERIA_SATISFIED
AND ALL PROVENANCE SATISFIED
-> ALL_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_SATISFIED
```

This state is caller-declared criterion-match evidence on the bounded proven substrate. It is not a score, statistical decision, global superiority verdict, promotion, recommendation, winner/default, release decision, Done Gate, P3 closeout, P4 authority, or project-completion proof.

## Hardening and deterministic identity materialization

The implementation source materializes P3-R17-owned hardening for:

- Proxy rejection;
- symbol-key rejection;
- non-enumerable own-property rejection;
- accessor rejection without invoking caller accessors;
- non-plain object rejection;
- sparse-array rejection;
- extended-array/object rejection;
- cycle rejection;
- finite JSON-number enforcement;
- exact own-key validation;
- direct string ordering;
- duplicate/unsorted set rejection without repair.

The output identity is derived from the complete semantic output projection excluding only `substrateQualificationEvidenceIdentity` itself. The result preserves complete trusted R16 and R4 evidence, the caller declaration, bounded substrate binding, provenance result, and final state, then returns a detached deeply frozen object.

## Focused proof matrix materialization

The authorized focused test path constructs canonical synthetic predecessor inputs rather than mutating trusted evidence outputs to force a match. It materializes both the late-chain R16 lineage and the P3-R3/P3-R4 provenance reconstruction needed for the authorized substrate binding.

The focused test source covers the required categories, including:

- exact six-argument success;
- wrong-arity rejection before predecessor/caller-root reads;
- direct roots 1-4 delegation precedence to canonical R16;
- exact fifth/sixth root shapes;
- Proxy/accessor/symbol/non-enumerable/non-plain/sparse rejection;
- no caller sorting/repair;
- trusted R16 and R4 identity binding;
- R4/R3 identity binding;
- benchmark/protocol mismatch rejection;
- left/right policy swap and unrelated policy-pair rejection;
- mixed member policy identity rejection;
- caseId and R1-result substitution rejection;
- exact two-case provenance cardinality;
- explicit absence of comparison/plan/request/context equivalence fields;
- valid different canonical shared-evaluation context without false equivalence relabeling;
- stable-ID and lowercase SHA-256 declaration identity rules;
- qualificationId independence from R16 criterionSetId;
- literal corpus-role / chronology / contamination semantics;
- `none-known` non-relabeling;
- R16 insufficiency precedence;
- R16 not-satisfied precedence;
- provenance not-satisfied precedence;
- all-satisfied success state;
- deterministic self-reference-free identity;
- semantic identity sensitivity;
- complete trusted R16 and R4 preservation;
- detached/deep-frozen output;
- absence of score, weighting, statistics, ranking, promotion, release, and completion surfaces.

This section records source-level proof-matrix **materialization only**. It does not claim TypeScript compilation, focused/full test success, GitHub CI success, semantic-review quorum, merge eligibility, or canonical closure. Those facts require exact-head evidence from GitHub on one unchanged final head.

## Qualification requirements still mandatory

Before merge, one unchanged exact implementation head must prove at minimum:

```text
BASE = current canonical main
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 4
GOVERNANCE provenance = SUCCESS
GOVERNANCE legacy-tests = SUCCESS
K2 runtime-change-classifier / k2-runtime-gate = SUCCESS WHEN APPLICABLE
K2 PLATFORM TYPECHECK / TEST / PATCH-HOOK MATRIX = SUCCESS WHEN APPLICABLE
AUTHORIZATION-MANDATED FOCUSED PROOF MATRIX = COMPLETE AND PASSING
INDEPENDENT SUBSTANTIVE EXTERNAL SEMANTIC REVIEW = 2 DISTINCT CHANNELS / 2 TERMINAL CLEAN
UNRESOLVED ACTIONABLE FINDINGS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET 20707483 = active / bypass_actors=[] / current_user_can_bypass=never
GUARDED NORMAL MERGE WITH EXACT expected_head_sha = REQUIRED
COMPLETE POST-MERGE MAIN / PARENTS / TREE / FOUR-BLOB / SIGNATURE / APPLICABLE-CHECK PROOF = REQUIRED
WAIVER = NO
```

Any head movement invalidates all prior exact-head CI/review qualification evidence and requires qualification from zero.

No CI PASS, external semantic-review quorum, zero-thread proof, merge eligibility, canonical closure, P3 overall closure, successor authority, or project completion is claimed by this candidate before GitHub proves it.

## Preserved non-grants

```text
R17 SUBSTRATE BINDING = SAME EXACT P3-R3 COMPARISON -> FALSE / NOT_ESTABLISHED
R17 SUBSTRATE BINDING = SAME PLAN / REQUEST / SHARED EVALUATION CONTEXT -> FALSE / NOT_ESTABLISHED
R17 SUBSTRATE BINDING = EARLY/LATE COMPARISON EQUIVALENCE -> FALSE / NOT_ESTABLISHED
CALLER CRITERIA = REPOSITORY POLICY -> FALSE
ALL_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_SATISFIED = GLOBAL SUPERIORITY -> FALSE
ALL_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_SATISFIED = PROMOTION / RECOMMENDATION / WINNER / DEFAULT -> FALSE
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
