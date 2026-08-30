# Kodac P3-R4 Context Policy Benchmark Provenance Authorization — 2026-08-30

## 1. Status

```text
DOCUMENT TYPE = FOUNDER-AUTHORIZED AUTHORIZATION-CANDIDATE PREPARATION
EFFECTIVE IMPLEMENTATION AUTHORITY WHILE NON-CANONICAL = NONE
P3-R1 = CLOSED_CANONICAL
P3-R2 = CLOSED_CANONICAL
P3-R3 = CLOSED_CANONICAL
P3-R3 ROADMAP/STATUS RECONCILIATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R4 IMPLEMENTATION = NOT_AUTHORIZED UNTIL THIS EXACT RECORD IS CANONICAL AND POST-MERGE PROVEN
P3-R5+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

This record is deny-by-default. It prepares one bounded future P3-R4 implementation authorization only. It does not implement P3-R4 and does not create effective implementation authority while it exists only on a branch or pull request.

The authority defined below becomes effective only if this exact authorization candidate qualifies on one frozen exact head, merges normally into protected `main` with the required expected-head guard, and completes mandatory post-merge proof.

---

## 2. Exact canonical baseline

This authorization candidate is prepared from canonical protected `main`:

```text
CANONICAL_MAIN = 0d26a7b7225c4ccc48a52b137ca526684a37d974
CANONICAL_TREE = e3bc89d9b536ee6dc9060a8b68e80eaeac2bb09f
```

That commit is the guarded normal merge of PR #261, the P3-R3 current-view reconciliation.

P3-R3 implementation closure anchors are:

```text
P3_R3_AUTHORIZATION_PR = #258
P3_R3_AUTHORIZATION_MERGE = 70553fef18c992b1ec819720e051258372af75d8
P3_R3_IMPLEMENTATION_PR = #260
P3_R3_QUALIFIED_HEAD = 2071014a9e8761a84167e2fa7a44ba40b4df36da
P3_R3_QUALIFIED_TREE = 46c2c5ff7af396ffa1377d0c597b398547c5087c
P3_R3_IMPLEMENTATION_MERGE = cd7c28b4f823e9570daf73448c5f3b9b9b540d2e
P3_R3_POST_MERGE_GOVERNANCE = 33302704761 / SUCCESS
P3_R3_POST_MERGE_K2 = 33302704758 / SUCCESS
```

P3-R3 reconciliation closure anchors are:

```text
P3_R3_RECONCILIATION_PR = #261
P3_R3_RECONCILIATION_QUALIFIED_HEAD = 05abf5a55137d07e657cd5d6b679377ed17e67c2
P3_R3_RECONCILIATION_QUALIFIED_TREE = e3bc89d9b536ee6dc9060a8b68e80eaeac2bb09f
P3_R3_RECONCILIATION_MERGE = 0d26a7b7225c4ccc48a52b137ca526684a37d974
P3_R3_RECONCILIATION_POST_MERGE_GOVERNANCE = 33306298763 / SUCCESS
P3_R3_RECONCILIATION_POST_MERGE_K2 = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Repository visibility is currently public. Public GitHub visibility is an access fact only and does not establish package publication, public release, benchmark completion, production readiness, or quality/superiority authority.

Governing records include:

- `AGENTS.md`;
- `docs/adr/ADR-0010-benchmark-first-donor-selection.md`;
- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`;
- canonical P2-R1 through P2-R5 authorization/evidence records;
- canonical P3-R1 through P3-R3 authorization/evidence records and immutable post-merge proof.

Live GitHub and any more-specific canonical authority override this candidate if they change before qualification.

---

## 3. Exact authorization-candidate changed-file set

This authorization PR may change exactly one path:

```text
docs/planning/KODAC_P3_R4_CONTEXT_POLICY_BENCHMARK_PROVENANCE_AUTHORIZATION_2026-08-30.md
```

No second path is authorized for this authorization candidate.

This unit is documentation/governance only. It may not modify runtime source, tests, fixtures, benchmark corpora, workflows, package manifests, lockfiles, provider/model configuration, persistence, telemetry, product surfaces, release files, historical authorization/evidence records, or rulesets.

---

## 4. Why P3-R4 is the next bounded gap

P3-R3 closes only deterministic pairwise seven-metric evidence binding and a comparability-only state. It intentionally cannot prove chronology, contamination, or holdout provenance because those facts exist in canonical P2-R1 evidence but are not retained in P2-R4/P2-R5 pairwise outputs.

Canonical P2-R1 already defines and validates evidence including:

```text
corpus_role = development | holdout
chronology_status = later-in-time | not-later-in-time | chronology-unproven
contamination_status = none-known | known | unknown
development_freeze_anchor
holdout_chronology_anchor
chronology_scheme
source_provenance
corpus_id / corpus_digest
holdout_id / holdout_digest
case_id / case_digest
result_identity
```

ADR-0010 requires leakage/contamination awareness and time-based or held-out evidence where possible before benchmark-backed selection or superiority claims.

The smallest safe next slice is therefore not a policy decision and not a promotion gate. It is a pure deterministic **benchmark provenance evidence binding** that reconnects one trusted P3-R3 evidence record to the exact canonical P2-R1 manifest evidence underlying the same P2-R2/P2-R4 comparison topology.

P3-R4 must preserve source facts without converting them into acceptance, superiority, significance, winner, default, or promotion semantics.

---

## 5. Authorized future trust boundary

If and only if this authorization becomes canonical and post-merge proven, one future P3-R4 implementation may implement the following closed trust boundary:

```text
UNTRUSTED COMPLETE P3-R1 REQUEST
+ UNTRUSTED LEFT P3-R2 POLICY
+ UNTRUSTED RIGHT P3-R2 POLICY
+ UNTRUSTED LEFT P2-R2 REPORT
+ UNTRUSTED LEFT P2-R3 SUMMARY
+ UNTRUSTED RIGHT P2-R2 REPORT
+ UNTRUSTED RIGHT P2-R3 SUMMARY
+ UNTRUSTED P2-R4 SHARED EVALUATION CONTEXT
+ UNTRUSTED LEFT P2-R4 SUBJECT
+ UNTRUSTED RIGHT P2-R4 SUBJECT
+ UNTRUSTED P2-R4 COMPARISON POLICY
+ UNTRUSTED P3-R3 DECLARATION
+ UNTRUSTED P2-R1 MANIFEST SET
+ UNTRUSTED P2-R1 DEVELOPMENT FIXTURE
+ UNTRUSTED P2-R1 HOLDOUT FIXTURE
+ UNTRUSTED EXACT-KEY P3-R4 DECLARATION

-> hardened canonical snapshots before semantic reads
-> canonical compareP2R4(...) reconstruction and full R2/R3/context/subject/policy revalidation
-> canonical P3-R3 reconstruction over the resulting trusted P2-R4 comparison
-> canonical validateManifestSet(...) reconstruction of trusted P2-R1 provenance evidence
-> exact R1 manifest-set digest binding to both validated P2-R2 reports
-> exact report identity binding to the trusted P2-R4 comparison
-> exact context-selection case/r1_result_identity binding to validated P2-R1 manifest records
-> exact benchmark/protocol/task-family binding to trusted P3-R3 evidence
-> immutable P3-R4 benchmark-provenance evidence record
```

No caller-claimed serialized P3-R3 output, P2-R4 comparison, P2-R5 relation set, or P2-R1 provenance summary may be accepted as derivation truth.

The implementation must reconstruct trusted predecessor state through canonical public boundaries rather than trusting caller labels.

---

## 6. Canonical predecessor boundaries that must be reused

P3-R4 must reuse canonical predecessor logic without weakening it:

- `compareP2R4(...)` for complete P2-R2/P2-R3/shared-context/subject/policy reconstruction and cross-binding;
- canonical P3-R3 builder for exact pairwise metric-evidence reconstruction;
- `validateManifestSet(...)` for P2-R1 manifest/development/holdout validation;
- `canonicalize(...)` / `sha256Canonical(...)` for hardened canonical snapshots and identities where required.

P3-R4 may not modify P2-R1 through P2-R5 or P3-R1 through P3-R3 bytes.

Any raw caller value needed after predecessor validation must first be captured through the hardened canonical JSON boundary so successful predecessor validation and later semantic reads refer to the same immutable semantic snapshot.

```text
SUCCESSFUL PREDECESSOR VALIDATION != AUTHORITY TO READ A DIFFERENT MUTATED CALLER VALUE
```

---

## 7. Exact manifest/report cross-binding requirements

The future P3-R4 implementation must prove that the P2-R1 provenance evidence is the provenance evidence underlying the same comparison used to derive P3-R3.

At minimum:

1. canonical P2-R4 reconstruction validates both P2-R2 reports and proves the same benchmark, benchmark protocol, `r1_manifest_set_digest`, case topology, per-case `r1_result_identity`, task families, metrics, and units across left/right reports;
2. canonical P2-R1 `validateManifestSet(...)` validates the supplied manifest set against the supplied development and holdout fixture documents;
3. the deterministic digest of the canonical ordered validated P2-R1 manifest records must equal the exact `r1_manifest_set_digest` carried by both validated P2-R2 reports;
4. the trusted P2-R4 comparison `left_r2_report_identity` and `right_r2_report_identity` must equal the two validated report identities from the canonical snapshots;
5. every `context-selection` P2-R2 case must have exactly one corresponding validated P2-R1 manifest record with equal `case_id` and `result_identity`;
6. no extra or missing `context-selection` manifest/report case may be silently ignored;
7. benchmark ID and protocol must equal the trusted P3-R3 benchmark ID and protocol;
8. task family is exactly `context-selection`;
9. case ordering is deterministic and identity-bearing;
10. duplicate, cross-bound, stale, malformed, or identity-mismatched provenance evidence fails closed.

P3-R4 must not infer provenance from subject labels, policy names, relation labels, metric direction, repository paths, timestamps, or caller narrative.

---

## 8. Exact provenance facts that may be preserved

For each exactly bound `context-selection` case, P3-R4 may preserve only canonical P2-R1 facts required to prove benchmark provenance, including:

```text
caseId
r1ResultIdentity
corpusRole
corpusId
corpusDigest
holdoutId
holdoutDigest
chronologyScheme
developmentFreezeAnchor
holdoutChronologyAnchor
chronologyStatus
contaminationStatus
sourceProvenance
```

The implementation may additionally bind the canonical P3-R3 evidence identity, P2-R2 report identities, P2-R1 manifest-set digest, benchmark ID/protocol, and the exact P3-R4 declaration identity fields required by the closed output contract.

It must not copy arbitrary metadata bags or implementation-defined extension fields.

P3-R4 may preserve P2-R1 `strategy_id`, `strategy_version`, evaluator/model/provider/environment fields only if a later exact review proves they are necessary for the closed provenance identity and cannot be confused with a P3 policy winner or provider/model execution claim. They are not required by this authorization and must otherwise remain excluded.

---

## 9. No semantic promotion from chronology or contamination labels

P3-R4 is evidence binding, not decision policy.

Exact P2-R1 values retain their literal meanings:

```text
later-in-time = chronology relation recorded by canonical P2-R1
not-later-in-time = chronology relation recorded by canonical P2-R1
chronology-unproven = chronology relation not proven by canonical P2-R1
none-known = no known contamination recorded by canonical P2-R1
known = known contamination recorded by canonical P2-R1
unknown = contamination status unknown in canonical P2-R1
```

P3-R4 must not reinterpret:

```text
none-known AS proven-uncontaminated
later-in-time AS sufficient holdout
holdout AS unbiased
all-required-metrics-comparable AS acceptable
any favored metric AS policy winner
```

No single case-level or aggregate `PASS`, `FAIL`, `ACCEPT`, `REJECT`, `READY`, `PROMOTE`, `DEFAULT`, `WINNER`, `SUPERIOR`, or equivalent decision vocabulary is authorized.

If required provenance cross-binding cannot be established, the implementation must fail closed rather than emit an incomplete qualification object.

---

## 10. Closed future output contract

The future P3-R4 output must be one exact-key deeply immutable plain object. The minimum closed semantic surface is:

```text
version
kind
provenanceEvidenceIdentity
qualificationId
p3R3ImplementationMerge
p3R3EvidenceIdentity
benchmarkId
benchmarkProtocolVersion
leftR2ReportIdentity
rightR2ReportIdentity
r1ManifestSetDigest
taskFamily
caseProvenance
```

Exact constants:

```text
version = p3-r4-context-policy-benchmark-provenance-v1
kind = context_policy_benchmark_provenance_evidence
p3R3ImplementationMerge = cd7c28b4f823e9570daf73448c5f3b9b9b540d2e
taskFamily = context-selection
```

`caseProvenance` is a deterministic exact array of the case-level facts authorized in Section 8. Its ordering must be explicitly closed by the implementation contract and must be stable across caller object insertion order.

The output must contain no arbitrary metadata bag, extension object, score, verdict, recommendation, threshold, significance, winner, default, promotion, release, or product decision field.

---

## 11. Identity semantics

`provenanceEvidenceIdentity` must be derived with canonical `sha256Canonical(...)` over the exact normalized output semantic projection excluding only `provenanceEvidenceIdentity` itself.

Identity grammar is:

```text
^sha256:[0-9a-f]{64}$
```

The identity must include every evidence-bearing field, including ordered `caseProvenance` facts, P3-R3 evidence identity, report identities, manifest-set digest, benchmark/protocol, qualification ID, and fixed implementation-merge anchor.

No timestamp, locale, wall-clock value, random value, hostname, workspace path, GitHub API state, provider state, network state, or other external mutable state may contribute to the identity.

---

## 12. Hostile-input and canonicalization requirements

P3-R4 remains fail-closed.

Before semantic use, every P3-R4-owned untrusted structure must reject or safely canonicalize according to existing hardened repository semantics. The future implementation must reject at minimum:

- Proxy values;
- getters/setters/accessor properties;
- symbol keys;
- non-enumerable semantic fields;
- non-plain object prototypes where plain JSON objects are required;
- sparse or extended arrays;
- cycles;
- `undefined`, functions, symbols, bigint, and non-finite numbers;
- unknown or missing fields;
- unsupported versions/kinds;
- malformed strings or identity grammars;
- duplicate cases;
- duplicate or missing provenance bindings;
- manifest-set digest mismatch;
- report identity mismatch;
- benchmark/protocol mismatch;
- task-family mismatch;
- P3-R3 evidence mismatch;
- caller mutation capable of changing returned output.

Returned output and every nested object/array must be detached from caller-owned mutable objects and deeply frozen.

---

## 13. Explicitly forbidden semantics

P3-R4 may not materialize, infer, claim, or authorize:

```text
POLICY WINNER / LOSER
BETTER / WORSE / SUPERIOR / INFERIOR
REPOSITORY-OWNED DEFAULT POLICY
STRATEGY PROMOTION / ACCEPT / REJECT
RANKING / LEADERBOARD / TOP-K
FAVORED-METRIC COUNT / MAJORITY
WEIGHTED / BLENDED / UNIVERSAL SCORE
CROSS-METRIC NORMALIZATION
THRESHOLD / TARGET / TOLERANCE / EPSILON
STATISTICAL SIGNIFICANCE
CONFIDENCE INTERVAL
BOOTSTRAP
HYPOTHESIS TEST
P-VALUE
EFFECT-SIZE ACCEPTANCE POLICY
HOLDOUT SUFFICIENCY DECISION
CONTAMINATION-FREE CLAIM
CHRONOLOGY SUFFICIENCY DECISION
BENCHMARK CORPUS COMPLETION
GENERAL / PUBLIC KODACBENCH COMPLETION
DONOR REPLACEMENT
ROUTING / FALLBACK / RETRY DECISION
PRODUCT INTEGRATION DECISION
RELEASE DECISION
PUBLIC QUALITY / SUPERIORITY CLAIM
```

P3-R4 preserves provenance facts only.

---

## 14. External authority non-grants

This authorization candidate does not grant:

```text
REAL BENCHMARK TASK EXECUTION
BENCHMARK CORPUS / FIXTURE / MANIFEST MUTATION
NEW GOLD LABELS OR METRIC FORMULAS
PROVIDER / MODEL / REVIEWER / EVALUATOR / AGENT INVOCATION
NETWORK ACCESS
SECRET ACCESS
SUBPROCESS / SHELL / SANDBOX EXECUTION
REPOSITORY CRAWLING / NEW FILESYSTEM ACQUISITION
FILESYSTEM RESULT PERSISTENCE
DATABASE / CACHE / TELEMETRY / ANALYTICS / UPLOAD
TRAINING / FINE-TUNING / ONLINE LEARNING
CROSS-REPOSITORY AGGREGATION / LEARNING
EMBEDDINGS / VECTOR DATABASE / LEARNED RERANKER
NEW DEPENDENCIES
DONOR / EXTERNAL CODE INTAKE
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION
PACKAGE PUBLICATION
PUBLIC RELEASE / VERSION DECLARATION / BRAND LAUNCH
K2 EXECUTION-AUTHORITY EXPANSION
K5 / DONE GATE / PROVEN_READY AUTHORITY CHANGE
AUTOFIX EXECUTION
RULESET MUTATION / BYPASS
P2-R6+ IMPLEMENTATION
P3-R5+ IMPLEMENTATION
P4-P8 IMPLEMENTATION
```

P3-R4, if later implemented, is pure, deterministic, local, in-memory evidence transformation only.

---

## 15. Exact future implementation allowlist

If and only if this authorization record becomes canonical and post-merge proven, exactly one future P3-R4 implementation PR becomes eligible within this exact four-path allowlist:

```text
packages/kodac-runtime/bench/p3-r4/contracts.ts
packages/kodac-runtime/bench/p3-r4/context-policy-provenance.ts
packages/kodac-runtime/test/p3-r4-context-policy-provenance.test.ts
docs/planning/KODAC_P3_R4_CONTEXT_POLICY_BENCHMARK_PROVENANCE_EVIDENCE_2026-08-30.md
```

No fifth path is implied.

Read-only imports/calls from canonical P2-R1/P2-R2/P2-R3/P2-R4 and P3-R1/P3-R2/P3-R3 surfaces are authorized only as described by this record. P2-R1 through P2-R5 and P3-R1 through P3-R3 bytes may not be modified.

No fixture, corpus, manifest, package manifest, lockfile, workflow, export barrel, CLI, product surface, dependency, persistence, telemetry, release, or ruleset path is authorized.

If implementation cannot satisfy the contract without a fifth path or predecessor mutation, stop and create a separate authorization candidate. Do not expand scope by implication.

---

## 16. Minimum focused test obligations

The future P3-R4 implementation must provide focused tests collectively proving at least:

1. canonical P2-R4 reconstruction is invoked before R4-owned provenance semantics;
2. canonical P3-R3 reconstruction is used and caller-claimed serialized P3-R3 evidence is not trusted;
3. canonical P2-R1 `validateManifestSet(...)` is used for manifest/development/holdout evidence;
4. malformed P2-R2/R3/R4 predecessor input fails through canonical predecessor validation;
5. malformed P3-R1/P3-R2/P3-R3 predecessor input fails through canonical predecessor validation;
6. malformed P2-R1 manifest/development/holdout input fails through canonical P2-R1 validation;
7. both validated P2-R2 reports carry the same R1 manifest-set digest;
8. validated manifest-set digest must equal that report digest;
9. left/right report identities bind exactly to the trusted P2-R4 comparison;
10. every `context-selection` report case binds exactly to one validated P2-R1 manifest record by `case_id` and `r1_result_identity`;
11. missing manifest case fails closed;
12. extra relevant manifest case fails closed;
13. duplicate case fails closed;
14. benchmark ID mismatch fails closed;
15. benchmark protocol mismatch fails closed;
16. wrong task family fails closed;
17. development and holdout roles remain explicit;
18. chronology status is copied exactly without reinterpretation;
19. contamination status is copied exactly without reinterpretation;
20. `none-known` is not relabeled as proven uncontaminated;
21. `later-in-time` is not relabeled as sufficient holdout;
22. P3-R3 comparability state is not converted into acceptance or promotion;
23. no winner/default/promotion/score/threshold/significance/verdict field exists;
24. case ordering is deterministic and identity-bearing;
25. object insertion order does not alter output identity;
26. output identity is deterministic and self-reference-free;
27. hostile Proxy/accessor/symbol/non-enumerable/non-plain/sparse/extended R4 declaration inputs fail closed;
28. invalid/non-JSON R4 declaration inputs fail closed;
29. returned output is detached from caller mutation and deeply frozen;
30. no repository/filesystem/network/provider/model/subprocess/persistence/telemetry side effect occurs;
31. no P2/P3 predecessor byte is modified;
32. canonical runtime typecheck/test participation remains green on every applicable K2 matrix platform.

Tests may use only in-memory synthetic canonical objects and already-committed fixtures through read-only use. This authorization does not permit creating or mutating benchmark fixture/corpus/manifest data merely to test P3-R4.

---

## 17. Exact-head future implementation qualification requirements

A future P3-R4 implementation candidate is not merge-authorized until one frozen exact head proves all of:

```text
BASE = exact canonical P3-R4 authorization merge
BEHIND_BY = 0
CHANGED_PATHS = exactly four authorized P3-R4 paths
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

Any head movement invalidates prior machine/review evidence. Repairs must be forward-only within the exact four-path allowlist, and the new exact head must be requalified from scratch.

Reviewer service errors, billing notices, skipped reviews, summaries without substantive semantic assessment, stale reviews, same-provider duplicates, self-review, and human review do not count toward the required two-channel external semantic quorum.

---

## 18. Authorization-candidate adoption gate

This authorization candidate remains non-authority until its exact final head proves:

1. base ref is protected `main`;
2. canonical main remains `0d26a7b7225c4ccc48a52b137ca526684a37d974`, or the record is reconciled forward to newer canonical truth before qualification;
3. `behind_by=0`;
4. changed-file set is exactly the one authorization path in Section 3;
5. exact candidate head, tree, and authorization-document blob are captured;
6. Governance `provenance` and `legacy-tests` are terminal success on the exact head;
7. K2 classifier and stable `k2-runtime-gate` are terminal success on the exact head, with runtime matrix represented honestly as skipped/non-applicable when the docs-only classifier makes it non-applicable;
8. at least two distinct independently operated external semantic reviewer/model-system channels each produce substantive terminal-clean assessments of the exact final head;
9. zero unresolved material findings and zero actionable review threads remain;
10. PR is open, non-draft, mergeable, and exact-head current;
11. ruleset `20707483` is active with required status contexts and review-thread resolution;
12. `bypass_actors=[]` and current user cannot bypass;
13. guarded normal history-preserving merge uses the exact qualified `expected_head_sha`;
14. post-merge canonical main equals the returned merge SHA;
15. ordered merge parents are pre-merge canonical main then exact qualified candidate head;
16. merge tree equals qualified candidate tree;
17. canonical authorization blob equals the qualified candidate blob;
18. GitHub merge signature is verified/valid;
19. applicable post-merge Governance succeeds;
20. absence of K2 push for this docs-only authorization is recorded as `NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER` when the workflow path filter makes it non-applicable;
21. ruleset remains active/no-bypass post-merge; and
22. `WAIVER=NO`.

Only after all adoption proof succeeds may repository state say:

```text
P3-R4 CONTEXT POLICY BENCHMARK PROVENANCE BINDING = AUTHORIZED / NOT YET CLOSED_CANONICAL
```

It may not say implemented, benchmarked, qualified for promotion, superior, default, winner, or closed merely because this authorization becomes canonical.

---

## 19. Required future implementation evidence record

The authorized future implementation evidence path is exactly:

```text
docs/planning/KODAC_P3_R4_CONTEXT_POLICY_BENCHMARK_PROVENANCE_EVIDENCE_2026-08-30.md
```

Before guarded implementation merge, the final evidence chain must bind at minimum:

- canonical P3-R4 authorization merge and authorization blob;
- implementation base, exact final head, final tree, and four final blobs;
- unchanged canonical P2/P3 predecessor blobs;
- focused R4 proof obligations;
- exact-head Governance and K2 run/job results;
- applicable Ubuntu/macOS/Windows runtime results;
- exact-head two-channel external semantic-review quorum;
- zero unresolved actionable threads/material findings;
- active ruleset/no-bypass snapshot;
- any forward-only repair history and stale-evidence invalidation;
- `WAIVER=NO`.

Candidate-time evidence must not fabricate future merge/post-merge facts recursively.

---

## 20. Post-implementation closure boundary

Even after a future P3-R4 implementation merge and complete post-merge proof, only the bounded benchmark-provenance evidence-binding mechanism may become `CLOSED_CANONICAL`.

A separate current-view roadmap/status reconciliation remains required before advancing the canonical P3 frontier.

P3-R4 closure alone does not authorize:

```text
P3-R5+ IMPLEMENTATION
HOLDOUT ACCEPTANCE POLICY
STATISTICAL ACCEPTANCE / SIGNIFICANCE
POLICY WINNER / DEFAULT / PROMOTION
REAL BENCHMARK EXECUTION
PROVIDER / MODEL EXECUTION
PRODUCT INTEGRATION
PERSISTENCE / TELEMETRY / LEARNING
PUBLIC QUALITY / SUPERIORITY CLAIM
PUBLIC RELEASE / PACKAGE PUBLICATION
P4-P8 IMPLEMENTATION
```

---

## 21. Final non-grant summary

```text
P3-R4 AUTHORIZATION CANDIDATE != P3-R4 IMPLEMENTED
P3-R4 PROVENANCE EVIDENCE != POLICY ACCEPTANCE
P3-R4 PROVENANCE EVIDENCE != POLICY PROMOTION
LATER-IN-TIME != SUFFICIENT HOLDOUT
NONE-KNOWN CONTAMINATION != PROVEN UNCONTAMINATED
HOLDOUT ROLE != UNBIASED EVIDENCE
P3-R3 ALL-METRICS-COMPARABLE != BETTER POLICY
PER-METRIC FAVORED RELATION != WINNER
BENCHMARK EVIDENCE != BENCHMARK EXECUTION AUTHORITY
P3-R4 CLOSED != P3 OVERALL CLOSED
P3-R4 CLOSED != P3-R5+ AUTHORIZED
P3-R4 CLOSED != REPOSITORY DEFAULT / PROMOTION
P3-R4 CLOSED != PUBLIC QUALITY CLAIM
P3-R4 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
WAIVER = NO
```