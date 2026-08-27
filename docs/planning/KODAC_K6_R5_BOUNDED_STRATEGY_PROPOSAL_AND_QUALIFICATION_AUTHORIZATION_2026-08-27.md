# Kodac K6-R5 Bounded Strategy Proposal and Qualification Authorization

## Record identity

- Date: 2026-08-27
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-27`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION AUTHORIZATION CANDIDATE
- Canonical base commit: `1db9fef23df0961d76b1fdd1b0e558fba180cad8`
- Canonical base tree: `150442b8f59b23b9e4d625fb156f67db7ab7678d`
- K6-R4 canonical implementation merge: `7af698feae73f46df06bf6084a7d0d0317d5560a` (PR #212)
- K6-R4 roadmap reconciliation merge: `1db9fef23df0961d76b1fdd1b0e558fba180cad8` (PR #222)
- Superseded non-canonical draft: PR #223; closed without merge after a self-review comparability defect was found
- Protected-main ruleset: `20707483` (`Kodac canonical main protection v1`)
- Review-quorum amendment: `docs/planning/KODAC_REVIEW_PROVIDER_NEUTRALITY_AND_EVIDENCE_QUORUM_AMENDMENT_2026-08-27.md`
- Governing K6 definition: `docs/planning/KODAC_K6_DEFINITION_AND_PLANNING_AUTHORIZATION_2026-08-26.md`
- Governing improvement plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Governing constitution: `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`
- Canonical side-effect boundary: `docs/adr/ADR-0006-mandatory-trust-hook-side-effects.md`
- Canonical K6-R1 contract blob: `dc29c4ce85340312f28b67604cac01c1d775e370`
- Canonical K6-R2 route-plan contract blob: `4ee85d8c0163d5318d0d900d733ba75afa814f7c`
- Canonical K6-R4 outcome-memory contract blob: `6411a42e6fc0074e60edc10eaa27e00b3b197fca`
- Canonical K6-R4 outcome-memory runtime blob: `9f9d0769c5ffab2d482574ea59418144d6dc49a6`
- Canonical runtime index blob at this base: `74b9d62501ffce8f2cb053e3b72827de11c203d9`
- `WAIVER=NO`

## Authority reconciliation

K6-R1 through K6-R4 are `CLOSED_CANONICAL` for their separately authorized bounded scopes. PR #222 made only **K6-R5 authorization-candidate preparation** eligible. K6-R5 implementation remains `NOT_AUTHORIZED` until this exact record is canonically adopted and post-merge proven.

PR #223 is not authority. It was closed unmerged because its draft evidence contract did not require incumbent and candidate evidence to use the same exact qualification corpus/trial set and equal trial count. This record corrects that defect before any implementation is authorized.

## Decision

After and only after canonical adoption and complete post-merge proof of this exact record, authorize a staged K6-R5 implementation for a **pure deterministic bounded strategy proposal and comparison surface**.

R5 v1 may represent one immutable incumbent ordering strategy and one immutable candidate ordering strategy over opaque candidate identities whose eligibility provenance is caller-held canonical evidence. It may bind them to one exact scope, consume two caller-materialized bounded evidence bundles that are proven structurally comparable, and return a deterministic comparison result.

R5 does not execute either strategy, invoke a candidate, grant eligibility, collect evidence, promote a candidate, mutate R2 ordering, persist data, learn from data, contact a provider, or claim general benchmark superiority.

```text
K6-R5 = BOUNDED STRATEGY PROPOSAL + DETERMINISTIC COMPARISON
R5 ELIGIBILITY AUTHORITY = NONE
R5 EXECUTION AUTHORITY = NONE
R5 PROVIDER / MODEL / REVIEWER INVOCATION = NONE
R5 PERSISTENCE = NONE
R5 NETWORK / TELEMETRY = NONE
R5 TRAINING / LEARNING MUTATION = NONE
R5 AUTOMATIC PROMOTION = FORBIDDEN
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 AUTHORITY = UNCHANGED
DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
GENERAL KODACBENCH = NOT AUTHORIZED
```

The governing invariants remain:

```text
SELF-IMPROVING != SELF-AUTHORIZING
ROUTING EVIDENCE != EXECUTION AUTHORITY
OUTCOME DATA != PERMISSION TO LEARN OR PERSIST
STRATEGY COMPARISON != PROMOTION
DOMINANCE RESULT != PROVEN_READY
OPAQUE CANDIDATE IDENTITY != ELIGIBILITY PROOF
CALLER-MATERIALIZED METRIC != SELF-REPORTED REWARD
```

## Exact bounded question

R5 v1 answers exactly one question:

> Given two exact validated immutable strategy values with the same exact scope and the same exact candidate-identity set, plus two exact caller-materialized evidence bundles bound to those strategy identities, the same exact qualification corpus, the same exact ordered trial set, the same exact trial count and the same exact scope, does one strategy deterministically dominate the other under the closed R5 v1 quality/resource/safety rules, or are the results tied, incomparable or invalid?

Structural comparability is mandatory. A comparison over different corpora, different trial sets, different trial counts, different scopes or different candidate sets is not an R5 result; it fails closed.

## Contract versions and closed vocabularies

```text
K6_R5_STRATEGY_VERSION = "kodac-k6-r5-strategy-v1"
K6_R5_STRATEGY_EVIDENCE_VERSION = "kodac-k6-r5-strategy-evidence-v1"
K6_R5_QUALIFICATION_RESULT_VERSION = "kodac-k6-r5-qualification-result-v1"
K6_R5_QUALIFICATION_CORPUS_VERSION = "kodac-k6-r5-qualification-corpus-v1"
K6_R5_STRATEGY_KIND = "EXPLICIT_ELIGIBLE_CANDIDATE_ORDER"
```

Outcomes are exactly:

```text
BOTH_INVALID
CANDIDATE_INVALID
INCUMBENT_INVALID
CANDIDATE_DOMINATES
INCUMBENT_DOMINATES
TIE
INCOMPARABLE
```

No floating alias, extension bag or implicit migration is authorized.

## Strategy scope

Every strategy has exactly this closed scope:

```text
repositoryIdentity
revisionIdentity
ownerScopeId
privacyClass
taskFamilyIdentity
```

All identity fields are 64 lowercase hexadecimal characters.

- `repositoryIdentity` and `revisionIdentity` reuse the minimized R4 identity semantics.
- `ownerScopeId` is opaque isolation data only and grants no authentication, authorization or capability.
- `privacyClass` reuses the closed R1/R4 vocabulary: `PUBLIC`, `REPOSITORY_PRIVATE`, `SENSITIVE`.
- `taskFamilyIdentity` is derived only from a fully validated canonical K6-R1 route request:

```text
taskFamilyIdentity = SHA256(canonicalK6R1Json({
  kind: "K6_R5_TASK_FAMILY",
  riskClass: validatedRouteRequest.riskClass,
  privacyClass: validatedRouteRequest.privacyClass,
  requiredCapabilities: validatedRouteRequest.requiredCapabilities
}))
```

The derivation helper must first call `validateK6R1RouteRequest()` and must not retain raw repository ID, task ID, Git SHAs, provider/model names, prompts, source, diffs or free-form content.

No cross-repository, cross-revision, cross-owner, cross-privacy or cross-task-family comparison is valid.

## Exact strategy value

A strategy has exactly:

```text
version
strategyIdentity
kind
scope
orderedCandidateIdentities
```

Where:

```text
version = "kodac-k6-r5-strategy-v1"
kind = "EXPLICIT_ELIGIBLE_CANDIDATE_ORDER"
orderedCandidateIdentities = 1..128 unique SHA-256 identities
```

R5 validates only identity shape, uniqueness and comparison invariants. It does **not** prove that an opaque candidate identity is eligible. Eligibility provenance remains owned by canonical R1/R2 caller evidence and no R5 function may upgrade an identity to `ELIGIBLE`.

The incumbent and candidate strategies must have exactly equal scopes and exactly equal candidate-identity sets. They may differ only in ordering. Duplicate, missing or added identities fail structurally.

`strategyIdentity` is:

```text
SHA256(canonicalK6R1Json({
  version,
  kind,
  scope,
  orderedCandidateIdentities
}))
```

R5 may create, validate, freeze and serialize strategy values. It may not apply an order to live orchestration or mutate K6-R2.

## Exact evidence value and fair-comparison binding

A strategy evidence value has exactly:

```text
version
evidenceIdentity
strategyIdentity
scope
qualificationCorpusIdentity
trialSetIdentity
trialCaseIdentities
trialCount
verifiedPassCount
k5ValidCount
doneReadyCount
latencyTotalMs
computeUnitsTotal
privacyViolationCount
securityViolationCount
verificationEvidenceIdentity
k5EvidenceIdentity
doneGateEvidenceIdentity
latencyEvidenceIdentity
computeEvidenceIdentity
privacyEvidenceIdentity
securityEvidenceIdentity
```

`qualificationCorpusIdentity`, every `trialCaseIdentities[]` element and every source-evidence identity are 64 lowercase hexadecimal characters.

`trialCaseIdentities` is a dense ordered array of 1..128 unique identities. `trialCount` must equal `trialCaseIdentities.length` exactly.

`trialSetIdentity` is recomputed as:

```text
SHA256(canonicalK6R1Json({
  kind: "K6_R5_TRIAL_SET",
  qualificationCorpusIdentity,
  trialCaseIdentities
}))
```

The comparator must reject unless incumbent and candidate evidence have exact equality of:

```text
scope
qualificationCorpusIdentity
trialSetIdentity
trialCaseIdentities
trialCount
```

This equality is checked before any safety/quality/resource outcome. Therefore raw aggregate totals from different sample sets can never produce an R5 dominance result.

All metric fields are non-negative safe integers. `trialCount >= 1`. Each of:

```text
verifiedPassCount
k5ValidCount
doneReadyCount
privacyViolationCount
securityViolationCount
```

must be `<= trialCount`.

Evidence must bind to the exact strategy identity and exact strategy scope. A wrong strategy identity, wrong scope, wrong corpus, wrong trial-set digest, unequal trial array or unequal trial count is structural `TypeError` and produces no qualification result.

Each source-evidence identity makes its evidence channel independently visible. R5 does not fetch or manufacture the underlying evidence. Missing evidence is not replaced by model confidence, reviewer vote, popularity or an opaque scalar reward.

`evidenceIdentity` is SHA-256 over the exact canonical evidence value with only `evidenceIdentity` omitted.

## Comparison metrics

R5 v1 has no weighted reward and no hidden score.

Quality metrics, higher is better:

```text
verifiedPassCount
k5ValidCount
doneReadyCount
```

Resource metrics, lower is better:

```text
latencyTotalMs
computeUnitsTotal
```

Safety-invalidating metrics:

```text
privacyViolationCount
securityViolationCount
```

A safety violation count greater than zero invalidates that side before quality/resource comparison.

## Exact outcome precedence

1. any structural/identity/scope/candidate-set/corpus/trial comparability failure throws and produces no result;
2. if both sides have any privacy/security violation, `BOTH_INVALID`;
3. otherwise if candidate has any privacy/security violation, `CANDIDATE_INVALID`;
4. otherwise if incumbent has any privacy/security violation, `INCUMBENT_INVALID`;
5. if all five quality/resource metrics are exactly equal, `TIE`;
6. candidate dominates only when all quality metrics are `>=` incumbent, both resource metrics are `<=` incumbent, and at least one of those five inequalities is strict;
7. incumbent dominance is exactly symmetric;
8. every remaining mixed tradeoff is `INCOMPARABLE`.

No tie-breaker based on provider/model/candidate names, lexical order, wall clock, randomness, cost estimate, reviewer vote, model self-report or historical popularity is authorized.

The result has exactly:

```text
version
resultIdentity
incumbentStrategyIdentity
candidateStrategyIdentity
incumbentEvidenceIdentity
candidateEvidenceIdentity
qualificationCorpusIdentity
trialSetIdentity
trialCount
outcome
```

The result repeats the shared corpus/trial binding so a downstream reader cannot detach the comparison outcome from its qualification population.

`resultIdentity` is SHA-256 over the exact canonical result with only `resultIdentity` omitted.

No result field named or semantically equivalent to `promote`, `winnerForProduction`, `approved`, `DONE` or `PROVEN_READY` is authorized.

## Incumbent retention and promotion boundary

R5 never replaces, deletes or activates a strategy. Every result retains both strategy and evidence identities plus the common corpus/trial binding.

```text
CANDIDATE_DOMINATES != PROMOTED
INCUMBENT_DOMINATES != POLICY LOCK
TIE != RANDOM CHOICE
INCOMPARABLE != PERMISSION TO PICK AUTOMATICALLY
```

Any later promotion process requires separate canonical authorization and must retain the prior incumbent identity as rollback evidence.

## Exact bounded R5 qualification corpus

This fixed synthetic corpus qualifies the **R5 comparator implementation only**. It is repository-local conformance evidence, not a production strategy benchmark and not general KodacBench.

```text
K6_R5_QUALIFICATION_CORPUS_ID = 6fa8c732fcec4f6bdfaae4c199f1b640363916246c2ea7d0a10e168d04b174a1
INCUMBENT_STRATEGY_ID = bb947465960dafd5774d0bde679cfb96ec9dbba5e8f02cfe750e160227bf89cf
CANDIDATE_STRATEGY_ID = b65be214400b10d1e3e633ad142f7f4fe6199d2a9b4a97ef465cbcbe61e3cf21
PROVENANCE = SYNTHETIC / REPOSITORY-LOCAL / CONTRACT-CONFORMANCE ONLY
```

The fixed corpus identity is defined exactly as:

```text
K6_R5_QUALIFICATION_CORPUS_ID = SHA256(canonicalK6R1Json(<the exact corpus JSON object embedded below>))
```

No field is omitted from the corpus identity input. The complete object beginning with `candidateStrategy` and ending with `version` in the JSON block below is the hash input after parsing and validation, and `canonicalK6R1Json()` provides the only canonical key ordering/serialization. The surrounding Markdown, code fence, whitespace outside the JSON value, and the separately printed digest/provenance lines above are not hash input.

The identities are independently recomputable with `canonicalK6R1Json()` and SHA-256.

Exact corpus JSON:

```json
{"candidateStrategy":{"kind":"EXPLICIT_ELIGIBLE_CANDIDATE_ORDER","orderedCandidateIdentities":["bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],"scope":{"ownerScopeId":"3333333333333333333333333333333333333333333333333333333333333333","privacyClass":"REPOSITORY_PRIVATE","repositoryIdentity":"1111111111111111111111111111111111111111111111111111111111111111","revisionIdentity":"2222222222222222222222222222222222222222222222222222222222222222","taskFamilyIdentity":"4444444444444444444444444444444444444444444444444444444444444444"},"strategyIdentity":"b65be214400b10d1e3e633ad142f7f4fe6199d2a9b4a97ef465cbcbe61e3cf21","version":"kodac-k6-r5-strategy-v1"},"cases":[{"candidate":{"computeUnitsTotal":40,"doneReadyCount":2,"k5ValidCount":3,"latencyTotalMs":400,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4},"caseId":"quality-dominance","expected":"CANDIDATE_DOMINATES","incumbent":{"computeUnitsTotal":40,"doneReadyCount":2,"k5ValidCount":3,"latencyTotalMs":400,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":3}},{"candidate":{"computeUnitsTotal":36,"doneReadyCount":4,"k5ValidCount":4,"latencyTotalMs":360,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4},"caseId":"resource-dominance","expected":"CANDIDATE_DOMINATES","incumbent":{"computeUnitsTotal":40,"doneReadyCount":4,"k5ValidCount":4,"latencyTotalMs":400,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4}},{"candidate":{"computeUnitsTotal":39,"doneReadyCount":3,"k5ValidCount":3,"latencyTotalMs":390,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":3},"caseId":"incumbent-dominance","expected":"INCUMBENT_DOMINATES","incumbent":{"computeUnitsTotal":38,"doneReadyCount":3,"k5ValidCount":4,"latencyTotalMs":380,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4}},{"candidate":{"computeUnitsTotal":38,"doneReadyCount":3,"k5ValidCount":3,"latencyTotalMs":380,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4},"caseId":"exact-tie","expected":"TIE","incumbent":{"computeUnitsTotal":38,"doneReadyCount":3,"k5ValidCount":3,"latencyTotalMs":380,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4}},{"candidate":{"computeUnitsTotal":40,"doneReadyCount":3,"k5ValidCount":3,"latencyTotalMs":400,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4},"caseId":"mixed-tradeoff","expected":"INCOMPARABLE","incumbent":{"computeUnitsTotal":36,"doneReadyCount":3,"k5ValidCount":3,"latencyTotalMs":360,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":3}},{"candidate":{"computeUnitsTotal":35,"doneReadyCount":4,"k5ValidCount":4,"latencyTotalMs":350,"privacyViolationCount":1,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4},"caseId":"candidate-privacy-invalid","expected":"CANDIDATE_INVALID","incumbent":{"computeUnitsTotal":40,"doneReadyCount":4,"k5ValidCount":4,"latencyTotalMs":400,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4}},{"candidate":{"computeUnitsTotal":35,"doneReadyCount":4,"k5ValidCount":4,"latencyTotalMs":350,"privacyViolationCount":1,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4},"caseId":"both-invalid","expected":"BOTH_INVALID","incumbent":{"computeUnitsTotal":40,"doneReadyCount":4,"k5ValidCount":4,"latencyTotalMs":400,"privacyViolationCount":0,"securityViolationCount":1,"trialCount":4,"verifiedPassCount":4}}],"incumbentStrategy":{"kind":"EXPLICIT_ELIGIBLE_CANDIDATE_ORDER","orderedCandidateIdentities":["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"],"scope":{"ownerScopeId":"3333333333333333333333333333333333333333333333333333333333333333","privacyClass":"REPOSITORY_PRIVATE","repositoryIdentity":"1111111111111111111111111111111111111111111111111111111111111111","revisionIdentity":"2222222222222222222222222222222222222222222222222222222222222222","taskFamilyIdentity":"4444444444444444444444444444444444444444444444444444444444444444"},"strategyIdentity":"bb947465960dafd5774d0bde679cfb96ec9dbba5e8f02cfe750e160227bf89cf","version":"kodac-k6-r5-strategy-v1"},"version":"kodac-k6-r5-qualification-corpus-v1"}
```

The implementation test must recompute the corpus and fixture strategy identities exactly. Separate tests must cover `INCUMBENT_INVALID` plus corpus/trial-set mismatch failures; those are mandatory even though they are not additional corpus cases.

The fixed corpus validates comparator semantics. Runtime strategy evidence may name another caller-materialized `qualificationCorpusIdentity`, but comparison is valid only when both sides bind to the exact same corpus and exact same recomputed ordered trial set. R5 grants no authority to create, execute, upload or promote such an external corpus.

## Hostile input and resource bounds

R5 validators fail closed for:

- Proxy objects;
- accessors/getters/setters instead of enumerable data properties;
- symbols and unexpected keys;
- sparse arrays and non-plain arrays/objects;
- cycles and `undefined`;
- invalid Unicode scalars;
- invalid SHA-256 identities;
- duplicate candidate or trial-case identities;
- unequal candidate sets or scopes;
- wrong strategy/evidence bindings;
- unequal corpus identities, trial sets or trial counts;
- invalid `trialSetIdentity` recomputation;
- zero trials;
- count values greater than `trialCount`;
- negative values, `-0`, non-integers or unsafe integers;
- caller mutation after construction.

Resource bounds reuse canonical K6 safety limits:

```text
maxCanonicalDepth = K6_R1_LIMITS.maxCanonicalDepth
maxCanonicalNodes = K6_R1_LIMITS.maxCanonicalNodes
maxOrderedCandidateIdentities = K6_R1_LIMITS.maxCandidates
maxTrialCaseIdentities = K6_R1_LIMITS.maxCandidates
```

Outputs are deeply immutable and must not retain caller-owned mutable arrays/objects by alias.

No arbitrary rationale, metadata bag, notes, labels, prompt/source/patch text, provider/model name, secret, stdout/stderr or extension map is authorized.

## Staged implementation authority after adoption

Canonical adoption of this authorization permits only the following stages.

### Stage A — trusted R5 qualifier bootstrap

One separate PR may add exactly one path:

```text
.github/workflows/k6-r5-trusted-qualification.yml
```

Stage A creates the future base-controlled independent-machine root for Stage B. It grants no R5 source/schema/test implementation authority.

Because no R5 trusted qualifier exists before this bootstrap, Stage A itself must be fail-closed under the existing canonical control plane:

- exact one-path diff only;
- `behind_by=0`;
- existing base-controlled required repository checks `provenance`, `legacy-tests`, and `k2-runtime-gate` from integration `15368` all terminal success on the exact head;
- exact workflow blob SHA captured through GitHub Git data;
- workflow permissions must be read-only and must not request administration/ruleset write authority;
- every third-party `uses:` reference must be a full immutable commit SHA;
- the workflow must not execute PR-controlled code before exact PR number/head/base/scope/authorization/predecessor/workflow-fingerprint checks succeed;
- two distinct independent external substantive semantic reviewer channels must inspect the exact workflow bytes and return terminal clean;
- zero unresolved actionable threads;
- active ruleset/no-bypass proof;
- guarded normal merge and full post-merge proof.

This exact Git-data + base-controlled required-CI + independent exact-byte review bundle is the equivalent bootstrap evidence channel required by the provider-neutral governance amendment. The candidate workflow is not counted as its own proof and does not run as the independent Stage A qualification authority before canonical adoption.

After Stage A is canonical, its bytes become the base-controlled trusted qualifier for Stage B.

Stage A must pin and fail closed on drift of at least:

```text
packages/kodac-runtime/src/evidence-router/contracts.ts = dc29c4ce85340312f28b67604cac01c1d775e370
packages/kodac-runtime/src/evidence-router/route-plan-contracts.ts = 4ee85d8c0163d5318d0d900d733ba75afa814f7c
packages/kodac-runtime/src/evidence-router/outcome-memory-contracts.ts = 6411a42e6fc0074e60edc10eaa27e00b3b197fca
packages/kodac-runtime/src/evidence-router/outcome-memory.ts = 9f9d0769c5ffab2d482574ea59418144d6dc49a6
```

It must verify the canonical authorization identity, exact Stage B six-path scope, immutable Actions, dedicated-workflow named-step fingerprints and active ruleset semantics before any PR-controlled test execution.

### Stage B — bounded R5 implementation

Only after Stage A is canonical and post-merge proven, one implementation PR may change exactly:

```text
.github/workflows/k6-r5-bounded-strategy-qualification.yml
schema/k6-r5-bounded-strategy-proposal.schema.json
packages/kodac-runtime/src/evidence-router/strategy-proposal-contracts.ts
packages/kodac-runtime/src/evidence-router/strategy-proposal.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k6-r5-bounded-strategy-proposal.test.ts
```

No seventh path is authorized.

Stage B may add only the exact pure-data contracts, validators, deterministic identities/comparator, schema parity, exports, tests and dedicated qualification workflow required by this record.

No dependency, lockfile, package manifest, provider adapter, persistence surface, network code, CLI, service, daemon, telemetry, training, general benchmark framework, K2/K5/Done Gate mutation, trust-policy mutation, autofix or release file may change.

## Required Stage B tests

At minimum:

1. exact version/kind/outcome vocabularies;
2. deterministic strategy/evidence/trial-set/result identities using `canonicalK6R1Json()`;
3. exact task-family derivation from a fully validated R1 request;
4. exact same-scope and same-candidate-set enforcement;
5. explicit proof that R5 does not grant candidate eligibility;
6. duplicate/missing/additional candidate rejection;
7. evidence-to-strategy/scope binding;
8. exact same `qualificationCorpusIdentity` enforcement;
9. exact same ordered `trialCaseIdentities` and recomputed `trialSetIdentity` enforcement;
10. equal trial-count enforcement;
11. all seven fixed corpus cases and exact corpus identity;
12. separate `INCUMBENT_INVALID` coverage;
13. no weighted/hidden reward path;
14. safety invalidation precedence;
15. exact tie behavior and mixed-tradeoff `INCOMPARABLE`;
16. no automatic promotion/output authority field;
17. incumbent/rollback identity retention;
18. hostile proxy/accessor/symbol/sparse/non-plain/cycle/undefined rejection;
19. negative/unsafe/`-0` metric rejection and count-vs-trial bounds;
20. resource-bound failures;
21. caller-mutation resistance and deep freeze;
22. schema/runtime parity and additional-properties closure;
23. strict TypeScript;
24. focused R1/R2/R4/R5 regressions;
25. full runtime suite;
26. repository Python tests and Ruff where applicable;
27. provenance and checkout-unchanged attestation.

Tests use synthetic evidence only. No provider/model/reviewer/tool invocation is authorized.

## Dedicated Stage B workflow

`.github/workflows/k6-r5-bounded-strategy-qualification.yml` must be read-only and use immutable full-length Action SHAs only.

Its named steps are fingerprinted by the canonical Stage A trusted qualifier and must at minimum:

1. attest exact head, authorization identity, six-path scope, predecessor pins and immutable Actions;
2. validate schema/runtime parity and closed vocabularies;
3. recompute fixture strategy, trial-set and fixed corpus identities;
4. run strict TypeScript, focused R5/adversarial/predecessor tests and full runtime tests;
5. run repository Python/Ruff/provenance gates where applicable;
6. prove no forbidden network/persistence/provider-execution/learning/automatic-promotion/trust-policy surface;
7. attest checkout unchanged.

The candidate-owned dedicated workflow never satisfies the independent-machine slot by itself. Canonical Stage A trusted qualification is mandatory.

## Review and machine-evidence quorum

Provider names hold no authority. The provider-neutral amendment is binding.

For this authorization, Stage A and Stage B:

```text
EXTERNAL_SEMANTIC_REVIEW_COUNT >= 2
EXTERNAL_SEMANTIC_REVIEW_CHANNELS_DISTINCT = YES
STALE / SKIPPED / RATE-LIMITED / STATUS-ONLY / FAILED-TO-START = NOT COUNTED
UNRESOLVED_ACTIONABLE_THREADS = 0
WAIVER = NO
```

Stage B additionally requires:

```text
CANONICAL_BASE_CONTROLLED_K6_R5_TRUSTED_QUALIFICATION = SUCCESS
DEDICATED_R5_QUALIFICATION = SUCCESS
REQUIRED_REPOSITORY_CI = SUCCESS
```

No self-review satisfies an independent semantic slot.

## Protected-main ruleset requirement

Ruleset `20707483` must remain active and strict on `refs/heads/main`, with required review-thread resolution and exact required checks:

```text
provenance      / integration_id 15368
legacy-tests    / integration_id 15368
k2-runtime-gate / integration_id 15368
```

Immediately before guarded merge and again after merge, control-plane evidence must expose:

```text
bypass_actors = []
current_user_can_bypass = never
```

Unknown/omitted bypass state is not PASS. No ruleset mutation is authorized.

## Exact scope of this authorization candidate

This authorization PR may change exactly one path:

```text
docs/planning/KODAC_K6_R5_BOUNDED_STRATEGY_PROPOSAL_AND_QUALIFICATION_AUTHORIZATION_2026-08-27.md
```

No roadmap, source, test, schema, workflow, dependency, ruleset, PR #163, Z0-family artifact, provider configuration, release artifact or other planning path is modified.

## Adoption gate

This record remains non-canonical unless the exact final candidate proves:

1. base ref exactly `main`;
2. candidate base/live main exactly `1db9fef23df0961d76b1fdd1b0e558fba180cad8` with tree `150442b8f59b23b9e4d625fb156f67db7ab7678d`;
3. exact one documentation path and no rename/copy;
4. `behind_by=0`, open, non-draft, mergeable;
5. required exact-head repository CI terminal success;
6. two distinct independent external substantive terminal-clean semantic reviews on the exact final head;
7. zero unresolved actionable review threads;
8. ruleset `20707483` active with strict checks and thread resolution;
9. control-plane proof exposes `bypass_actors=[]` and `current_user_can_bypass=never`;
10. exact candidate head/tree/document blob captured;
11. guarded normal merge uses exact qualified `expected_head_sha`;
12. ordered parent 1 equals pre-merge main and parent 2 equals exact qualified candidate head;
13. merge tree equals qualified candidate tree and document blob remains exact;
14. GitHub merge verification/signature is valid where supplied;
15. applicable post-merge required checks terminal success;
16. ruleset/no-bypass state unchanged post-merge;
17. `WAIVER=NO`.

If `main` advances before merge, STOP. Forward-merge the new canonical main without rebase/force, amend this record to the replacement base SHA/tree, and requalify the new exact head from scratch.

## Post-adoption stop boundary

Even after this authorization becomes canonical and post-merge proven:

```text
DO NOT IMPLEMENT STAGE B BEFORE STAGE A IS CANONICAL
DO NOT INVOKE PROVIDERS / MODELS / REVIEWERS AS R5 RUNTIME WORK
DO NOT TRAIN OR LEARN
DO NOT PERSIST OR UPLOAD
DO NOT AUTO-PROMOTE
DO NOT MUTATE K2 / K5 / DONE GATE / TRUST POLICY
DO NOT CLAIM GENERAL KODACBENCH RESULTS
```

Immediate next eligible work after adoption is Stage A only. After Stage A is canonical/post-merge proven, Stage B becomes eligible within its exact six-path scope. After Stage B is canonically merged and proven, K6-R5 still requires a separate roadmap/closeout reconciliation before `K6-R5=CLOSED_CANONICAL` may be claimed.

## Preserved non-grants

```text
MODEL / PROVIDER / REVIEWER / EVALUATOR INVOCATION = NOT AUTHORIZED
MODEL TRAINING = NOT AUTHORIZED
PERSISTENCE = NOT AUTHORIZED
TELEMETRY / UPLOAD = NOT AUTHORIZED
NETWORK EGRESS = NOT AUTHORIZED
CROSS-REPOSITORY LEARNING = NOT AUTHORIZED
AUTOMATIC STRATEGY PROMOTION = NOT AUTHORIZED
TRUST-POLICY MUTATION = NOT AUTHORIZED
AUTOFIX = NOT AUTHORIZED
EXTERNAL SERVICES = NOT AUTHORIZED
NEW DEPENDENCIES = NOT AUTHORIZED
K2 AUTHORITY EXPANSION = NOT AUTHORIZED
K5 AUTHORITY EXPANSION = NOT AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY CHANGE = NOT AUTHORIZED
GENERAL KODACBENCH = NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION = NOT AUTHORIZED
PR #163 / Z0 FAMILY = UNCHANGED / NOT AUTHORIZED BY THIS RECORD
```

`DONE = evidence-backed completion` remains binding.

`WAIVER=NO`
