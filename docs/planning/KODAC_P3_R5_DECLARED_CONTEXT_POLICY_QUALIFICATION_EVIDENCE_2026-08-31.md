# KODAC P3-R5 Declared Context Policy Qualification Evidence — 2026-08-31

Status: `IMPLEMENTATION_CANDIDATE / FINAL_EXACT_HEAD_QUALIFICATION_REQUIRED`

`WAIVER=NO`

## 1. Authority

This record is governed by the canonical authorization:

`docs/planning/KODAC_P3_R5_DECLARED_CONTEXT_POLICY_QUALIFICATION_AUTHORIZATION_2026-08-31.md`

Canonical authorization merge:

`41599d88d2b18f2714848452d20fc8ff00232f31`

Canonical authorization blob:

`8e8fc94b2f260d055f413e2e595a5eea894877b6`

Implementation base:

`41599d88d2b18f2714848452d20fc8ff00232f31`

The implementation is limited to the exact four-path allowlist authorized by the canonical P3-R5 authorization. No fifth path is authorized or implied.

## 2. Candidate mechanism

The candidate implements one pure deterministic local in-memory P3-R5 mechanism that applies **caller-declared qualification criteria** to canonically reconstructed P3-R3 pairwise metric evidence and P3-R4 literal benchmark-provenance evidence.

The mechanism:

- snapshots all seventeen public inputs through the repository canonical JSON boundary before semantic reuse;
- reconstructs the trusted P2-R4 comparison with canonical `compareP2R4(...)`;
- reconstructs trusted P3-R3 pairwise metric evidence with canonical `buildContextPolicyPairwiseMetricEvidence(...)` rather than trusting caller-serialized P3-R3 evidence;
- reconstructs trusted P3-R4 provenance evidence with canonical `buildContextPolicyBenchmarkProvenanceEvidence(...)` rather than trusting caller-serialized P3-R4 evidence;
- binds one exact `qualificationId` across the caller declaration, reconstructed P3-R3 evidence, and reconstructed P3-R4 evidence;
- binds reconstructed P3-R4 `p3R3EvidenceIdentity` to the independently reconstructed P3-R3 evidence identity;
- binds benchmark ID, benchmark protocol version, task family, and left/right policy identities to canonical predecessor evidence;
- accepts exactly seven metric criteria corresponding one-for-one and in canonical order to the seven P3-R3 context evidence dimensions;
- permits each metric criterion to declare only a non-empty strictly sorted duplicate-free subset of `EQUAL_RAW_VALUE`, `LEFT_FAVORED_BY_DIRECTION`, and `RIGHT_FAVORED_BY_DIRECTION`;
- copies each observed metric relation literally from reconstructed P3-R3 evidence and emits `INSUFFICIENT_EVIDENCE` whenever canonical metric evidence is insufficient;
- applies caller-declared corpus-role, chronology-status, and contamination-status criteria only to literal reconstructed P3-R4 provenance values;
- keeps provenance criterion-state vocabulary closed to exactly `SATISFIED | NOT_SATISFIED`;
- derives aggregate state with exact total precedence: any insufficient metric evidence first, otherwise any not-satisfied metric/provenance criterion, otherwise all declared criteria satisfied;
- emits duplicate-free lexical-order literal provenance projections;
- derives a self-reference-free deterministic `qualificationEvidenceIdentity` over the complete normalized output projection;
- returns detached deeply frozen evidence; and
- exposes no benchmark execution, provider/model invocation, network, secrets, subprocess, filesystem mutation, persistence, telemetry, learning, promotion, default selection, statistical acceptance, release, or public-quality authority.

The candidate is evidence qualification only. It does not establish repository policy authority.

## 3. Exact authorized implementation path set

```text
packages/kodac-runtime/bench/p3-r5/contracts.ts
packages/kodac-runtime/bench/p3-r5/context-policy-qualification.ts
packages/kodac-runtime/test/p3-r5-context-policy-qualification.test.ts
docs/planning/KODAC_P3_R5_DECLARED_CONTEXT_POLICY_QUALIFICATION_EVIDENCE_2026-08-31.md
```

No fifth path is authorized.

## 4. Code/test-qualified predecessor head before this evidence-file commit

The exact code/test head immediately before adding this evidence path was:

`0dbdc2172c2a24f52620942652357a7ebdf5884b`

Its tree was:

`e5cbe858b36e632993e6037bbf826e985aa82ee3`

Its three authorized code/test blobs were:

```text
packages/kodac-runtime/bench/p3-r5/contracts.ts
5f9f33bf6a3a7e4378e443621b913e76b9ab0ad7

packages/kodac-runtime/bench/p3-r5/context-policy-qualification.ts
358e0c4713644e0275010d20961d6409040411ca

packages/kodac-runtime/test/p3-r5-context-policy-qualification.test.ts
a331cf19adf7c89044f23ad3d423ffd07688ba92
```

The final fourth blob, exact final head, and exact final tree cannot be embedded recursively in this file. They MUST be captured externally in PR/GitHub qualification evidence after this file is committed, and all final-head CI/review evidence MUST use that same exact final head.

## 5. Canonical predecessor-byte preservation

The candidate branch started at the exact canonical authorization merge and, before this evidence record, changed only the three authorized P3-R5 code/test paths. Adding this evidence record completes exactly the authorized four-path set.

No P2-R1/P2-R2/P2-R3/P2-R4/P2-R5 or P3-R1/P3-R2/P3-R3/P3-R4 implementation path is modified.

Canonical predecessor blobs used read-only remain:

```text
packages/kodac-runtime/bench/p3-r3/contracts.ts
7383bca3962b054f8b3798f0e8c1a26ccd675c6a

packages/kodac-runtime/bench/p3-r3/context-policy-evidence.ts
8c01bf5e4c41103ae491cea701f0b9b3fe9dffb1

packages/kodac-runtime/bench/p3-r4/contracts.ts
90965256d7f8aeeef5f88698c6fe2d2c53433b85

packages/kodac-runtime/bench/p3-r4/context-policy-provenance.ts
2ab4d6ac0c538da4678e1119f599b8dbfde07d8d

packages/kodac-runtime/test/p3-r4-context-policy-provenance.test.ts
52621ace5e3c880d443ec9169035f70ac29c2ba1

docs/planning/KODAC_P3_R4_CONTEXT_POLICY_BENCHMARK_PROVENANCE_EVIDENCE_2026-08-30.md
3cea25de280aed867a65aafe7b72c6e619fba864
```

Final qualification MUST re-confirm the exact four-path diff against the canonical authorization merge and therefore byte-preservation of all predecessor paths.

## 6. Contract closure

The implementation locks these versioned constants:

```text
p3-r5-declared-context-policy-qualification-declaration-v1
build_declared_context_policy_qualification_evidence
p3-r5-declared-context-policy-qualification-evidence-v1
declared_context_policy_qualification_evidence
```

The caller declaration contains exactly:

```text
version
kind
qualificationId
qualificationPolicyIdentity
metricCriteria
provenanceCriteria
```

Each metric criterion contains exactly:

```text
dimension
metricId
allowedRelations
```

The output contains exactly:

```text
version
kind
qualificationEvidenceIdentity
qualificationId
qualificationPolicyIdentity
p3R3EvidenceIdentity
p3R4ProvenanceEvidenceIdentity
benchmarkId
benchmarkProtocolVersion
taskFamily
leftPolicyId
leftPolicyIdentity
rightPolicyId
rightPolicyIdentity
metricCriterionResults
provenanceCriterionResults
qualificationEvidenceState
```

The aggregate state machine is exactly:

```text
1. ANY metric criterion = INSUFFICIENT_EVIDENCE
   -> INSUFFICIENT_COMPARABLE_EVIDENCE

2. OTHERWISE ANY comparable metric criterion or provenance criterion = NOT_SATISFIED
   -> ONE_OR_MORE_DECLARED_CRITERIA_NOT_SATISFIED

3. OTHERWISE
   -> ALL_DECLARED_CRITERIA_SATISFIED
```

No caller-declared criterion is converted into repository-owned promotion/default/winner authority.

## 7. Focused proof obligations

The focused suite at:

`packages/kodac-runtime/test/p3-r5-context-policy-qualification.test.ts`

covers the canonical Section 14 proof boundary, including:

- exact canonical P3-R3 reconstruction;
- exact canonical P3-R4 reconstruction;
- rejection of caller-serialized predecessor substitution;
- one qualification ID across declaration/P3-R3/P3-R4;
- exact P3-R4-to-P3-R3 evidence-identity binding;
- benchmark ID, protocol, task family, and left/right policy binding;
- exact declaration top-level keys and version/kind constants;
- lowercase `sha256:` qualification-policy identity grammar;
- exactly seven metric criteria;
- exact canonical dimension order and one-for-one metric binding;
- missing/extra/wrong/duplicate-equivalent metric criterion rejection through cardinality/order/binding closure;
- non-empty strictly sorted duplicate-free `allowedRelations`;
- rejection of unsupported relations and `INSUFFICIENT_EVIDENCE` as an allowed satisfied relation;
- literal observed relation projection from canonical P3-R3 evidence;
- `SATISFIED`, `NOT_SATISFIED`, and `INSUFFICIENT_EVIDENCE` metric-state behavior;
- proof that incomplete P3-R3 evidence cannot yield all-criteria-satisfied;
- non-empty strictly sorted duplicate-free required corpus-role criteria;
- exact development/holdout literal role behavior;
- non-empty strictly sorted duplicate-free chronology criteria and closed literal domain;
- exact all-cases chronology membership semantics;
- proof that `later-in-time` is not upgraded to sufficient or unbiased holdout evidence;
- non-empty strictly sorted duplicate-free contamination criteria and closed literal domain;
- exact all-cases contamination membership semantics;
- proof that `none-known` is not upgraded to proven uncontaminated or clean evidence;
- exact closed output, metric-result, and provenance-result key sets;
- aggregate all-satisfied only when every metric/provenance criterion is satisfied;
- aggregate insufficient precedence over mixed insufficient/not-satisfied inputs;
- aggregate not-satisfied when no metric is insufficient and any criterion does not match;
- evidence identity sensitivity to qualification-policy identity, caller criteria, P3-R3 identity, and P3-R4 identity;
- object insertion-order neutrality;
- strict contract handling of set-like declaration order;
- hostile Proxy/accessor/symbol/non-enumerable/non-plain/sparse/extended/non-JSON declaration rejection at the canonical JSON boundary;
- detached deeply frozen output;
- closed provenance-state vocabulary `SATISFIED | NOT_SATISFIED` only;
- exact corpus-role, chronology, and contamination derivation rules;
- duplicate-free lexical-order observed provenance sets;
- absence of winner/default/promotion/recommendation/statistical-significance/holdout-sufficiency/contamination-free/release semantics; and
- absence of ambient provider/model/network/secret/subprocess/filesystem/database/telemetry/learning/product execution surfaces in the evidence contract.

Tests use only in-memory synthetic objects plus existing already-committed read-only P2-R1 fixtures. No new benchmark corpus, manifest, real task execution, provider/model invocation, dependency, or donor code is introduced.

## 8. Code/test qualification before evidence-file commit

Exact pre-evidence head:

`0dbdc2172c2a24f52620942652357a7ebdf5884b`

Exact pre-evidence tree:

`e5cbe858b36e632993e6037bbf826e985aa82ee3`

Governance push run:

`33358394118`

Results:

```text
provenance        99384835400  SUCCESS
legacy-tests      99384835625  SUCCESS
```

K2 runtime-sensitive PR run:

`33358506045`

Results:

```text
runtime-change-classifier  99385153652  SUCCESS
runtime (windows-latest)   99385175550  SUCCESS
runtime (ubuntu-latest)    99385175556  SUCCESS
runtime (macos-latest)     99385175659  SUCCESS
k2-runtime-gate            99385318282  SUCCESS
```

Every runtime matrix job completed Typecheck, Test, and Patch benchmark hook successfully.

These results qualify the three-path code/test state immediately before this evidence-file commit. They are intentionally **STALE_FOR_FINAL_MERGE_QUALIFICATION** after this evidence-file commit moves the PR head. The resulting exact four-path final candidate head MUST be requalified from scratch.

## 9. Forward-only history and evidence invalidation

All implementation work is forward-only inside the authorized P3-R5 path set. No force push, rebase, destructive rewrite, workflow mutation, predecessor mutation, ruleset change, bypass, dependency addition, donor intake, provider/model execution, or waiver was used.

Initial bounded implementation sequence:

```text
71a874b57adea090499d274bf0c4cc677233439c  define P3-R5 qualification contracts
47baefd9b3b2ce9703a03eb413438d134bb17d76  implement declared qualification evidence
0dbdc2172c2a24f52620942652357a7ebdf5884b  add focused qualification proof suite
```

Any later repair MUST remain forward-only inside the four-path allowlist. Every head movement invalidates all prior exact-head CI and semantic-review evidence for final merge qualification.

## 10. Final exact-head qualification contract

After this evidence file is committed, the resulting final candidate head MUST remain frozen and prove all of the following before merge:

```text
BASE = 41599d88d2b18f2714848452d20fc8ff00232f31
BEHIND_BY = 0
CHANGED_PATHS = exactly the four authorized P3-R5 paths
P2/P3 PREDECESSOR BLOBS = unchanged
GOVERNANCE = SUCCESS
K2 runtime-sensitive classifier = SUCCESS
Ubuntu runtime matrix = SUCCESS
Windows runtime matrix = SUCCESS
macOS runtime matrix = SUCCESS
k2-runtime-gate = SUCCESS
EXTERNAL_SEMANTIC_REVIEW_COUNT >= 2
EXTERNAL_SEMANTIC_REVIEW_CHANNELS_DISTINCT = YES
UNRESOLVED_ACTIONABLE_THREADS = 0
EXACT_HEAD / TREE / FOUR BLOBS = CAPTURED
RULESET 20707483 = active
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
WAIVER = NO
```

Any candidate-head movement invalidates prior machine and semantic-review evidence. Repairs must be forward-only inside the four authorized paths and the new head must requalify from scratch.

Service errors, billing notices, skipped reviews, summaries without substantive assessment, stale reviews, same-provider duplicates, self-review, and human review do not count toward the required two-channel external semantic quorum.

## 11. Guarded merge and post-merge proof

A final qualified candidate may merge only through normal history-preserving merge with the exact qualified `expected_head_sha` after rechecking that canonical `main` has not moved and all qualification facts still hold.

Post-merge proof must establish:

1. canonical `main` equals the returned merge SHA;
2. ordered merge parent 1 is the pre-merge canonical `main`;
3. ordered merge parent 2 is the exact qualified candidate head;
4. merge tree equals the qualified candidate tree;
5. all four canonical P3-R5 blobs equal the qualified candidate blobs;
6. GitHub merge signature is verified/valid;
7. post-merge Governance succeeds;
8. post-merge K2 runtime-sensitive classifier, Ubuntu/macOS/Windows Typecheck + Test + Patch benchmark hook, and stable `k2-runtime-gate` all succeed on the merge SHA;
9. ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never`; and
10. `WAIVER=NO`.

Only after complete post-merge proof may the bounded P3-R5 mechanism be stated as `CLOSED_CANONICAL`.

## 12. Required post-implementation reconciliation

Even after P3-R5 becomes `CLOSED_CANONICAL`, a separate current-view roadmap/status reconciliation remains mandatory before any later P3 frontier may be considered.

P3-R5 closure itself does not authorize P3-R6+.

## 13. Explicit non-grants

```text
P3-R5 CRITERIA MATCH != WINNER
P3-R5 CRITERIA MATCH != DEFAULT
P3-R5 CRITERIA MATCH != PROMOTION
P3-R5 CRITERIA MATCH != PUBLIC QUALITY CLAIM
P3-R5 CRITERIA MATCH != DONE GATE
CALLER POLICY != REPOSITORY POLICY
DIRECTIONAL METRIC RELATION != GLOBAL SUPERIORITY
LATER-IN-TIME != SUFFICIENT HOLDOUT
NONE-KNOWN != PROVEN UNCONTAMINATED
HOLDOUT ROLE != UNBIASED EVIDENCE
COMPARABLE != STATISTICALLY SIGNIFICANT
QUALIFICATION EVIDENCE != BENCHMARK EXECUTION AUTHORITY
REAL BENCHMARK EXECUTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
NUMERIC / STATISTICAL ACCEPTANCE OR SIGNIFICANCE POLICY = NOT_AUTHORIZED
HOLDOUT SUFFICIENCY / UNBIASEDNESS CLAIM = NOT_AUTHORIZED
CONTAMINATION-FREE CLAIM = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR CODE = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PRODUCT / CLI / API / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
PUBLIC QUALITY / SUPERIORITY CLAIM = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```
