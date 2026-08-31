# Kodac P3-R4 Context Policy Benchmark Provenance Authorization — 2026-08-30

## Status

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

This record is deny-by-default. It prepares one bounded future P3-R4 implementation authorization only. It does not implement P3-R4 and creates no effective implementation authority while it exists only on a branch or pull request.

The authority below becomes effective only if this exact authorization candidate qualifies on one frozen exact head, merges normally into protected `main` with the exact expected-head guard, and completes mandatory post-merge proof.

---

## 1. Exact canonical baseline

```text
CANONICAL_MAIN = 0d26a7b7225c4ccc48a52b137ca526684a37d974
CANONICAL_TREE = e3bc89d9b536ee6dc9060a8b68e80eaeac2bb09f
P3_R3_AUTHORIZATION_PR = #258
P3_R3_AUTHORIZATION_MERGE = 70553fef18c992b1ec819720e051258372af75d8
P3_R3_IMPLEMENTATION_PR = #260
P3_R3_QUALIFIED_HEAD = 2071014a9e8761a84167e2fa7a44ba40b4df36da
P3_R3_QUALIFIED_TREE = 46c2c5ff7af396ffa1377d0c597b398547c5087c
P3_R3_IMPLEMENTATION_MERGE = cd7c28b4f823e9570daf73448c5f3b9b9b540d2e
P3_R3_POST_MERGE_GOVERNANCE = 33302704761 / SUCCESS
P3_R3_POST_MERGE_K2 = 33302704758 / SUCCESS
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

Governing records include `AGENTS.md`, `docs/roadmap/NEXT.md`, ADR-0010, the durable intelligence-improvement master plan, canonical P2-R1 through P2-R5 authorization/evidence/contracts, and canonical P3-R1 through P3-R3 authorization/evidence/contracts. Live GitHub and any more-specific canonical authority override this candidate if they change before qualification.

---

## 2. Accepted exact-head review findings and forward repair

PR #262 predecessor head `b46af0f62e308191c73e4dcc00358f874a957af6` received Codex review `5060562246` with three material P1 findings:

```text
3889123766 = bind report metrics to the manifest definitions
3889123768 = specify the exact P2-R2 manifest ordering
3889123769 = close the declaration and output schemas exactly
```

All three findings are accepted without waiver.

The predecessor candidate left three material gaps:

1. report cases were bound to manifest records by case/result identity but their complete metric-ID/unit topology was not required to equal the bound manifest `metric_definitions`;
2. the R1 manifest-set digest was described as using canonical ordering without closing the exact private P2-R2 comparator; and
3. the R4 declaration/output contract was described as exact-key without an exhaustive declaration schema, exhaustive output schema, or complete field grammars.

Forward repair history:

```text
PREDECESSOR_HEAD = b46af0f62e308191c73e4dcc00358f874a957af6
PREDECESSOR_TREE = bf1b2205b68ad5ba15f645692555804446a125e7
PREDECESSOR_AUTHORIZATION_BLOB = a96f1d23b1d41d8b5bac527a2e9fa19d83c82de5
INTERMEDIATE_REPAIR_HEAD = 0cb67e70ec3c801756e5d18864ab3c32f0b3980f
INTERMEDIATE_REPAIR_TREE = 67b5e6058825ba641cba4b0b84dc3ca91ed79ebb
INTERMEDIATE_REPAIR_BLOB = 48a3d9442e4f10e9ddc1a7024510e4fd4c881d66
VALID_FINDINGS = ACCEPTED
REPAIR = FORWARD_ONLY
ALLOWLIST_EXPANSION = NONE
WAIVER = NO
```

This revision completes the forward repair by closing the exact predecessor comparator, the independent report-to-manifest metric topology on both sides, the P3-R4 declaration, the top-level output, every case-provenance element, and nested anchor/source-provenance shapes and grammars.

All CI and semantic-review evidence on `b46af0f62e308191c73e4dcc00358f874a957af6` and `0cb67e70ec3c801756e5d18864ab3c32f0b3980f` is stale after repository-byte movement and MUST NOT be reused. The final exact head must qualify from scratch.

---

## 3. Exact authorization-candidate path

This authorization PR may change exactly one path:

```text
docs/planning/KODAC_P3_R4_CONTEXT_POLICY_BENCHMARK_PROVENANCE_AUTHORIZATION_2026-08-30.md
```

No second path is authorized. Runtime source, tests, fixtures, benchmark corpora, workflows, package manifests, lockfiles, dependencies, providers/models, persistence, telemetry, product/release files, historical canonical evidence, and rulesets are out of scope.

Any byte movement after qualification invalidates every prior exact-head CI and semantic-review result.

---

## 4. Objective and bounded gap

P3-R3 closes deterministic pairwise seven-metric evidence binding and a comparability-only state. It intentionally cannot prove chronology, contamination, or holdout provenance because those facts exist in canonical P2-R1 evidence but are not retained in the P2-R4/P2-R5 pairwise output.

Canonical P2-R1 validates evidence including:

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
metric_definitions
result_identity
```

ADR-0010 requires leakage/contamination awareness and held-out or time-based evidence where possible before benchmark-backed selection or superiority claims.

The smallest safe next slice is a pure deterministic **benchmark provenance evidence binding**. It reconnects one trusted P3-R3 evidence record to the exact canonical P2-R1 manifest evidence underlying the same validated P2-R2/P2-R4 comparison topology.

P3-R4 preserves source facts only. It is not a policy decision, promotion gate, benchmark runner, quality verdict, or release gate.

---

## 5. Exact future public function boundary

If and only if this authorization becomes canonical and post-merge proven, the future P3-R4 public function must be semantically equivalent to:

```text
buildContextPolicyBenchmarkProvenanceEvidence(
  planRequestValue: unknown,
  leftPolicyValue: unknown,
  rightPolicyValue: unknown,
  leftR2ReportValue: unknown,
  leftR3SummaryValue: unknown,
  rightR2ReportValue: unknown,
  rightR3SummaryValue: unknown,
  sharedEvaluationContextValue: unknown,
  leftSubjectValue: unknown,
  rightSubjectValue: unknown,
  comparisonPolicyValue: unknown,
  p3R3DeclarationValue: unknown,
  manifestValue: unknown,
  developmentFixtureValue: unknown,
  holdoutFixtureValue: unknown,
  provenanceDeclarationValue: unknown,
) -> ContextPolicyBenchmarkProvenanceEvidence
```

Mandatory procedure order:

1. capture hardened canonical JSON snapshots of every untrusted value before any later semantic reuse;
2. invoke canonical `compareP2R4(...)` with the hardened left/right P2-R2 report, P2-R3 summary, shared-context, subject, and comparison-policy snapshots;
3. retain only the returned trusted P2-R4 comparison as pairwise comparison truth;
4. invoke the canonical P3-R3 builder using the hardened plan request, left/right policy, trusted P2-R4 comparison, and hardened P3-R3 declaration snapshots;
5. retain only the returned trusted P3-R3 evidence record as P3-R3 truth;
6. invoke canonical `validateManifestSet(...)` using the hardened manifest/development/holdout snapshots;
7. derive the exact P2-R2-compatible ordered validated manifest sequence and digest from Section 7;
8. require that digest to equal both validated P2-R2 report `r1_manifest_set_digest` values;
9. require trusted P2-R4 `left_r2_report_identity` and `right_r2_report_identity` to equal the exact identities in the same hardened report snapshots that successfully participated in `compareP2R4(...)`;
10. cross-bind every relevant `context-selection` report case to exactly one validated P2-R1 manifest record by `case_id` and `r1_result_identity`;
11. independently bind the complete metric-ID/unit topology of BOTH left and right report cases to the corresponding validated manifest `metric_definitions` using Section 8;
12. require benchmark ID, benchmark protocol version, and task family to equal trusted P3-R3 evidence;
13. validate the exact P3-R4 declaration in Section 9;
14. derive `caseProvenance` only from validated P2-R1 records after every binding succeeds;
15. derive only the exact output in Section 10;
16. compute `provenanceEvidenceIdentity` from the closed semantic projection excluding only that field itself; and
17. detach and deeply freeze the returned output.

Failure of any step fails closed. No fallback, inferred binding, default, partial evidence object, or automatic repair is authorized.

```text
SUCCESSFUL PREDECESSOR VALIDATION != AUTHORITY TO READ A DIFFERENT MUTATED CALLER VALUE
```

---

## 6. Canonical predecessor boundaries

P3-R4 must reuse canonical predecessor logic without weakening it:

```text
compareP2R4(...)
canonical P3-R3 builder
validateManifestSet(...)
canonicalize(...)
sha256Canonical(...)
```

P3-R4 may not modify P2-R1 through P2-R5 or P3-R1 through P3-R3 bytes.

No caller-claimed serialized P3-R3 output, P2-R4 comparison, P2-R5 relation set, P2-R1 provenance summary, or derived R1 manifest-set digest is accepted as derivation truth.

---

## 7. Exact P2-R2 manifest ordering and digest binding

`validateManifestSet(...)` does not itself define P2-R2 report digest order. P3-R4 must reproduce the exact `runP2R2Report(...)` predecessor ordering.

The exact comparator is:

```text
compareStrings(left, right):
  if left < right: return -1
  if left > right: return 1
  return 0
```

This is JavaScript lexical string comparison using `<` and `>` only. Locale-sensitive comparison, case folding, insertion order, filesystem order, and alternate comparators are forbidden.

The exact manifest ordering is:

```text
orderedManifest(records):
  sort ascending by task_family using compareStrings;
  if equal, sort ascending by case_id using compareStrings;
  if equal, sort ascending by result_identity using compareStrings.
```

The exact digest derivation is:

```text
validatedManifest = validateManifestSet(
  manifestSnapshot,
  developmentFixtureSnapshot,
  holdoutFixtureSnapshot,
)

orderedManifestRecords = orderedManifest(validatedManifest)
r1ManifestSetDigest = sha256Canonical(orderedManifestRecords)
```

`r1ManifestSetDigest` MUST match exact canonical SHA-256 grammar:

```text
^sha256:[0-9a-f]{64}$
```

and MUST equal both successfully validated report values exactly:

```text
leftR2ReportSnapshot.r1_manifest_set_digest
rightR2ReportSnapshot.r1_manifest_set_digest
```

No other deterministic order is equivalent authority. The comparator and tuple order are identity-bearing. P3-R4 may duplicate only this tiny private P2-R2 comparator locally to reproduce predecessor behavior; it may not modify P2-R2 or broaden the semantics.

---

## 8. Exact report/manifest/case/metric topology cross-binding

P3-R4 must prove that the P2-R1 provenance evidence is the provenance evidence underlying the same complete comparison used to derive P3-R3.

Mandatory bindings:

1. canonical `compareP2R4(...)` successfully validates both hardened P2-R2 report snapshots, both P2-R3 summaries, shared evaluation context, subjects, and comparison policy;
2. both reports satisfy canonical P2-R4 same-benchmark/protocol/manifest-digest/case-topology/R1-result/task-family/metric/unit requirements;
3. the exact digest in Section 7 equals both validated report `r1_manifest_set_digest` values;
4. trusted P2-R4 `left_r2_report_identity` and `right_r2_report_identity` equal the corresponding exact report identities in the hardened validated report snapshots;
5. the relevant task family is exactly `context-selection`;
6. every relevant report case has exactly one corresponding validated P2-R1 manifest record with equal `case_id` and `r1_result_identity == manifestRecord.result_identity`;
7. every relevant validated P2-R1 manifest record has exactly one corresponding left report case and exactly one corresponding right report case;
8. no duplicate, missing, extra, stale, malformed, cross-family, or cross-bound relevant case is ignored.

Report-to-report equality is not sufficient for metric provenance.

For each exactly bound `context-selection` manifest record, every `metric_definitions` item must have `task_family = context-selection`, and duplicate manifest metric IDs fail closed.

Expected topology is exactly:

```text
expectedMetricTopology = manifestRecord.metric_definitions
  .map(({ metric_id, unit }) => ({ metric_id, unit }))
  .sort((left, right) => compareStrings(left.metric_id, right.metric_id))
```

For EACH side independently:

```text
reportMetricTopology = reportCase.metrics
  .map(({ metric_id, unit }) => ({ metric_id, unit }))
  .sort((left, right) => compareStrings(left.metric_id, right.metric_id))
```

Before equality comparison, each relevant report case MUST have unique `metric_id` values.

Each side's topology MUST equal `expectedMetricTopology` element-for-element:

```text
exact cardinality
no duplicate metric IDs
no missing metric
no extra metric
exact metric_id equality
exact unit equality for every metric
```

A self-consistent left/right report pair with a metric added, removed, renamed, duplicated, or unit-changed relative to the validated manifest MUST fail closed even if both reports agree with each other and retain a genuine manifest digest and R1 result identity.

Measurement status and value do not participate in this topology equality; those remain predecessor measurement evidence and cannot create an undeclared metric slot.

---

## 9. Exact P3-R4 declaration contract

The P3-R4 declaration is one exact-key plain JSON-compatible object containing EXACTLY:

```text
version
kind
qualificationId
```

No fourth key is authorized. Missing or unknown keys fail closed.

Exact constants:

```text
version = p3-r4-context-policy-benchmark-provenance-declaration-v1
kind = build_context_policy_benchmark_provenance_evidence
```

`qualificationId` is mandatory and MUST:

```text
be a string
be non-empty
be trimmed/canonical
contain no NUL
be <= 512 UTF-8 bytes
match ^[A-Za-z0-9][A-Za-z0-9._:/-]*$
```

Benchmark, protocol, report, manifest, task-family, chronology, contamination, and P3-R3 evidence bindings are derived from trusted predecessor state rather than caller declaration fields.

---

## 10. Exhaustive closed output contract

The returned P3-R4 value is one exact-key deeply immutable plain object containing EXACTLY:

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

No additional top-level key is authorized.

Exact constants:

```text
version = p3-r4-context-policy-benchmark-provenance-v1
kind = context_policy_benchmark_provenance_evidence
p3R3ImplementationMerge = cd7c28b4f823e9570daf73448c5f3b9b9b540d2e
taskFamily = context-selection
```

Exact SHA-256 grammar:

```text
provenanceEvidenceIdentity ^sha256:[0-9a-f]{64}$
p3R3EvidenceIdentity       ^sha256:[0-9a-f]{64}$
leftR2ReportIdentity       ^sha256:[0-9a-f]{64}$
rightR2ReportIdentity      ^sha256:[0-9a-f]{64}$
r1ManifestSetDigest        ^sha256:[0-9a-f]{64}$
```

`qualificationId` is copied exactly from the validated declaration.

`benchmarkId` and `benchmarkProtocolVersion` are non-empty canonical strings copied only after exact trusted predecessor equality is proven.

`caseProvenance` is a dense array. Each element is an exact-key plain object containing EXACTLY:

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

No additional case-level key is authorized.

Exact case-level domains:

```text
r1ResultIdentity   ^sha256:[0-9a-f]{64}$
corpusDigest       ^sha256:[0-9a-f]{64}$
holdoutDigest      ^sha256:[0-9a-f]{64}$
corpusRole          development | holdout
chronologyStatus    later-in-time | not-later-in-time | chronology-unproven
contaminationStatus none-known | known | unknown
```

`caseId`, `corpusId`, `holdoutId`, and `chronologyScheme` are copied only from successfully validated P2-R1 records and retain the inherited non-empty canonical-string contract; P3-R4 may not weaken them.

`developmentFreezeAnchor` and `holdoutChronologyAnchor` each retain exact P2-R1 shape:

```text
{
  scheme,
  ordinal,
}
```

with EXACTLY those two keys. `scheme` is the inherited non-empty canonical string. `ordinal` is a non-negative safe integer or `null`.

`sourceProvenance` retains exact P2-R1 shape:

```text
{
  kind,
  path,
}
```

with EXACTLY those two keys, exact constant:

```text
kind = repository-authored-synthetic
```

and `path` copied from the successfully validated P2-R1 canonical fixture-path boundary. P3-R4 may not synthesize, normalize differently, or broaden it.

`strategy_id`, `strategy_version`, evaluator/model/provider/environment fields, `metric_definitions`, arbitrary metadata, extension objects, scores, verdicts, recommendations, thresholds, significance fields, winner/default/promotion fields, release fields, and product-decision fields are NOT output keys.

`caseProvenance` ordering is exact and identity-bearing:

```text
sort ascending by caseId using compareStrings;
if equal, sort ascending by r1ResultIdentity using compareStrings.
```

Duplicate case bindings fail before output construction.

---

## 11. Identity semantics

`provenanceEvidenceIdentity` is exactly:

```text
sha256Canonical(exact normalized P3-R4 output projection excluding only provenanceEvidenceIdentity)
```

Every other output field is identity-bearing, including the exact ordered `caseProvenance` array and every nested anchor/source-provenance field.

Object insertion order must not alter identity. The exact semantic case-array order in Section 10 must be preserved.

No timestamp, locale, random value, hostname, process environment, workspace path, GitHub API state, provider state, network state, benchmark execution time, or other external mutable state may contribute to identity.

---

## 12. Literal provenance semantics only

P3-R4 is evidence binding, not decision policy.

Exact validated P2-R1 values retain only their literal inherited meanings:

```text
later-in-time = chronology relation recorded by canonical P2-R1
not-later-in-time = chronology relation recorded by canonical P2-R1
chronology-unproven = chronology relation not proven by canonical P2-R1
none-known = no known contamination recorded by canonical P2-R1
known = known contamination recorded by canonical P2-R1
unknown = contamination status unknown in canonical P2-R1
development | holdout = canonical corpus role only
```

P3-R4 MUST NOT reinterpret:

```text
none-known AS proven-uncontaminated
later-in-time AS sufficient holdout
holdout AS unbiased
all-required-metrics-comparable AS acceptable
any favored metric AS policy winner
```

No case-level or aggregate `PASS`, `FAIL`, `ACCEPT`, `REJECT`, `READY`, `PROMOTE`, `DEFAULT`, `WINNER`, `SUPERIOR`, or equivalent decision vocabulary is authorized.

If required provenance cross-binding cannot be established, the implementation fails closed rather than emitting incomplete evidence.

---

## 13. Hostile-input and immutability requirements

P3-R4 must preserve the repository's hardened fail-closed semantics. At minimum it must reject:

- Proxy values;
- getters/setters/accessor properties;
- symbol keys;
- non-enumerable semantic fields;
- non-plain object prototypes where plain JSON is required;
- sparse or extended arrays;
- cycles;
- `undefined`, functions, symbols, bigint, and non-finite numbers;
- unknown or missing declaration fields;
- unsupported declaration version/kind;
- malformed `qualificationId`;
- malformed inherited SHA-256 identities;
- duplicate cases or metric IDs;
- missing/extra relevant manifest/report cases;
- missing/extra report metrics relative to manifest `metric_definitions`;
- report/manifest metric unit mismatch;
- manifest-set digest mismatch;
- report identity mismatch;
- benchmark/protocol mismatch;
- task-family mismatch;
- P3-R3 evidence mismatch; and
- caller mutation capable of changing returned output.

Returned output and every nested object/array must be detached from caller-owned mutable objects and deeply frozen.

---

## 14. Explicitly forbidden semantics and external non-grants

P3-R4 may not materialize, infer, claim, execute, or authorize:

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
REAL BENCHMARK TASK EXECUTION
BENCHMARK CORPUS / FIXTURE / MANIFEST MUTATION
NEW GOLD LABELS OR METRIC FORMULAS
BENCHMARK CORPUS COMPLETION
GENERAL / PUBLIC KODACBENCH COMPLETION
PROVIDER / MODEL / REVIEWER / EVALUATOR / AGENT INVOCATION
NETWORK / SECRET ACCESS
SUBPROCESS / SHELL / SANDBOX EXECUTION
REPOSITORY CRAWLING / NEW FILESYSTEM ACQUISITION
FILESYSTEM RESULT PERSISTENCE
DATABASE / CACHE / TELEMETRY / ANALYTICS / UPLOAD
TRAINING / FINE-TUNING / ONLINE LEARNING
CROSS-REPOSITORY AGGREGATION / LEARNING
EMBEDDINGS / VECTOR DATABASE / LEARNED RERANKER
NEW DEPENDENCIES
DONOR / EXTERNAL CODE INTAKE
ROUTING / FALLBACK / RETRY DECISION
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION
PACKAGE PUBLICATION
PUBLIC RELEASE / VERSION DECLARATION / BRAND LAUNCH
PUBLIC QUALITY / SUPERIORITY CLAIM
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

## 15. Exact conditional future implementation allowlist

If and only if this authorization record becomes canonical and post-merge proven, exactly one future P3-R4 implementation PR becomes eligible within this exact four-path allowlist:

```text
packages/kodac-runtime/bench/p3-r4/contracts.ts
packages/kodac-runtime/bench/p3-r4/context-policy-provenance.ts
packages/kodac-runtime/test/p3-r4-context-policy-provenance.test.ts
docs/planning/KODAC_P3_R4_CONTEXT_POLICY_BENCHMARK_PROVENANCE_EVIDENCE_2026-08-30.md
```

No fifth path is implied.

Read-only imports/calls from canonical P2-R1/P2-R2/P2-R3/P2-R4/P2-R5 and P3-R1/P3-R2/P3-R3 surfaces are authorized only as described by this record. P2-R1 through P2-R5 and P3-R1 through P3-R3 bytes may not be modified.

No fixture, corpus, manifest, package manifest, lockfile, workflow, export barrel, CLI, product surface, dependency, persistence, telemetry, release, or ruleset path is authorized.

If implementation cannot satisfy this contract without a fifth path or predecessor mutation, stop and create a separate authorization candidate. Do not expand scope by implication.

---

## 16. Minimum focused test obligations

The future P3-R4 implementation must provide focused tests collectively proving at least:

1. all public untrusted inputs are hardened before semantic reuse;
2. canonical `compareP2R4(...)` reconstruction occurs before R4-owned provenance semantics;
3. canonical P3-R3 reconstruction is used and caller-claimed serialized P3-R3 evidence is not trusted;
4. canonical `validateManifestSet(...)` is used for manifest/development/holdout evidence;
5. malformed P2/P3 predecessor input fails through canonical predecessor validation;
6. malformed P2-R1 manifest/development/holdout input fails through canonical P2-R1 validation;
7. exact P2-R2 manifest comparator is `task_family`, then `case_id`, then `result_identity`, all via plain lexical `<` / `>` comparison;
8. manifest input permutations yield the same exact P2-R2-compatible digest after mandated ordering;
9. a different deterministic ordering cannot satisfy a genuine multi-family P2-R2 report digest;
10. both validated P2-R2 reports carry the same R1 manifest-set digest;
11. validated ordered manifest digest equals both report digests;
12. left/right report identities bind exactly to trusted P2-R4 comparison identities;
13. every relevant `context-selection` report case binds exactly to one validated P2-R1 manifest record by `case_id` and `r1_result_identity`;
14. missing or extra relevant manifest/report case fails closed;
15. duplicate relevant case fails closed;
16. left report extra metric relative to manifest fails closed;
17. left report missing metric fails closed;
18. left report unit mismatch fails closed;
19. left report duplicate metric ID fails closed;
20. right report extra metric relative to manifest fails closed;
21. right report missing metric fails closed;
22. right report unit mismatch fails closed;
23. right report duplicate metric ID fails closed;
24. report-to-report metric agreement without manifest-topology agreement fails closed;
25. benchmark ID mismatch fails closed;
26. benchmark protocol mismatch fails closed;
27. wrong task family fails closed;
28. exact declaration keys are only `version`, `kind`, `qualificationId`;
29. missing or unknown declaration key fails closed;
30. declaration constants and `qualificationId` grammar/bounds are enforced;
31. exact output keys are exactly the thirteen keys in Section 10 and no additional key exists;
32. each `caseProvenance` object has exactly the thirteen case keys in Section 10 and no additional key exists;
33. anchor objects use exactly `scheme` / `ordinal` and source-provenance objects exactly `kind` / `path`;
34. `caseProvenance` ordering is exact `caseId`, then `r1ResultIdentity`, using `compareStrings`;
35. development/holdout roles remain literal;
36. chronology status is copied exactly without reinterpretation;
37. contamination status is copied exactly without reinterpretation;
38. `none-known` is not relabeled as proven uncontaminated;
39. `later-in-time` is not relabeled as sufficient holdout;
40. P3-R3 comparability is not converted into acceptance or promotion;
41. no winner/default/promotion/score/threshold/significance/verdict field exists;
42. object insertion order does not alter output identity;
43. exact semantic case-array order is identity-bearing;
44. output identity is deterministic and self-reference-free;
45. hostile Proxy/accessor/symbol/non-enumerable/non-plain/sparse/extended declaration inputs fail closed;
46. invalid/non-JSON declaration inputs fail closed;
47. returned output is detached from caller mutation and deeply frozen;
48. no repository/filesystem/network/provider/model/subprocess/persistence/telemetry side effect occurs;
49. no P2/P3 predecessor byte is modified; and
50. canonical runtime typecheck/test participation remains green on every applicable K2 matrix platform.

Tests may use in-memory synthetic canonical objects and already-committed fixtures through read-only use only. This authorization does not permit creating or mutating benchmark fixture/corpus/manifest data merely to test P3-R4.

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

Any head movement invalidates prior machine/review evidence. Repairs must be forward-only within the exact four-path allowlist, and the new head must be requalified from scratch.

Service errors, billing notices, skipped reviews, summaries without substantive semantic assessment, stale reviews, same-provider duplicates, self-review, and human review do not count toward the required two-channel external semantic quorum.

---

## 18. Authorization-candidate adoption gate

This authorization candidate remains non-authority until its exact final head proves:

1. base ref is protected `main`;
2. canonical main remains `0d26a7b7225c4ccc48a52b137ca526684a37d974`, or this record is reconciled forward to newer canonical truth before qualification;
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
- all focused R4 proof obligations;
- exact-head Governance and K2 run/job results;
- applicable Ubuntu/macOS/Windows runtime results;
- exact-head two-channel external semantic-review quorum;
- zero unresolved actionable threads/material findings;
- active ruleset/no-bypass snapshot;
- any forward-only repair history and stale-evidence invalidation; and
- `WAIVER=NO`.

Candidate-time evidence must not fabricate future merge/post-merge facts recursively.

---

## 20. Post-implementation closure boundary

Even after a future P3-R4 implementation merge and complete post-merge proof, only the bounded benchmark-provenance evidence-binding mechanism may become `CLOSED_CANONICAL`.

A separate current-view roadmap/status reconciliation remains required before advancing the canonical P3 frontier.

P3-R4 closure alone does not authorize P3-R5+, holdout acceptance policy, statistical acceptance/significance, policy winner/default/promotion, real benchmark execution, provider/model execution, product integration, persistence/telemetry/learning, public quality/superiority claims, public release/package publication, or P4-P8 implementation.

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