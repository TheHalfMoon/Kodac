# Kodac K6-R5 Bounded Strategy Proposal and Qualification Authorization

## Record identity

- Date: 2026-08-27
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-27`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION AUTHORIZATION CANDIDATE
- Canonical base commit: `1db9fef23df0961d76b1fdd1b0e558fba180cad8`
- Canonical base tree: `150442b8f59b23b9e4d625fb156f67db7ab7678d`
- K6-R4 canonical implementation merge: `7af698feae73f46df06bf6084a7d0d0317d5560a` (PR #212)
- K6-R4 roadmap reconciliation merge: `1db9fef23df0961d76b1fdd1b0e558fba180cad8` (PR #222)
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

K6-R1 through K6-R4 are `CLOSED_CANONICAL` for their separately authorized bounded scopes. PR #222 canonically reconciled the roadmap and made only **K6-R5 authorization-candidate preparation** eligible. K6-R5 implementation remains `NOT_AUTHORIZED` until this exact record itself is canonically adopted and post-merge proven.

This candidate does not authorize model/provider/reviewer invocation, learning, persistence, network egress, telemetry, automatic promotion, trust-policy mutation, K2 expansion, Done Gate mutation, general KodacBench claims, release, dependencies, or external services.

## Decision

After and only after canonical adoption and complete post-merge proof of this exact record, authorize a staged K6-R5 implementation for a **pure deterministic bounded strategy proposal and comparison surface**.

R5 v1 may represent one immutable incumbent ordering strategy and one immutable candidate ordering strategy over already-eligible opaque candidate identities, bind both to one exact repository/revision/owner/privacy/task-family scope, consume caller-materialized bounded evidence, and return a deterministic comparison result.

R5 v1 may not execute either strategy, invoke any candidate, promote the candidate, mutate R2 ordering, persist data, learn from data, contact a provider, or claim general benchmark superiority.

```text
K6-R5 = BOUNDED STRATEGY PROPOSAL + DETERMINISTIC COMPARISON
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
```

## Exact bounded question

R5 v1 answers exactly one question:

> Given two exact validated immutable strategy values with the same exact bounded scope, and two exact caller-materialized evidence bundles cryptographically bound to those strategy identities and that same scope, does one strategy deterministically dominate the other under the closed R5 v1 quality/resource/safety comparison rules, or are the results tied, incomparable, or invalid?

R5 does not decide whether any strategy should be deployed, whether any provider should execute, whether a task is complete, or whether a result is safe for production.

## Contract versions

```text
K6_R5_STRATEGY_VERSION = "kodac-k6-r5-strategy-v1"
K6_R5_STRATEGY_EVIDENCE_VERSION = "kodac-k6-r5-strategy-evidence-v1"
K6_R5_QUALIFICATION_RESULT_VERSION = "kodac-k6-r5-qualification-result-v1"
K6_R5_QUALIFICATION_CORPUS_VERSION = "kodac-k6-r5-qualification-corpus-v1"
K6_R5_STRATEGY_KIND = "EXPLICIT_ELIGIBLE_CANDIDATE_ORDER"
```

No floating alias or implicit migration is authorized.

## Strategy scope

Every strategy has one exact closed scope:

```text
repositoryIdentity
revisionIdentity
ownerScopeId
privacyClass
taskFamilyIdentity
```

All identity fields are exactly 64 lowercase hexadecimal characters.

- `repositoryIdentity` reuses the minimized repository identity semantics already established by K6-R4.
- `revisionIdentity` reuses the minimized exact-revision identity semantics established by K6-R4.
- `ownerScopeId` remains opaque isolation data only and grants no authentication or authorization.
- `privacyClass` reuses the exact closed R1/R4 vocabulary: `PUBLIC`, `REPOSITORY_PRIVATE`, `SENSITIVE`.
- `taskFamilyIdentity` is a deterministic domain-separated SHA-256 identity derived only from a validated canonical K6-R1 route request:

```text
taskFamilyIdentity = SHA256(canonicalK6R1Json({
  kind: "K6_R5_TASK_FAMILY",
  riskClass: validatedRouteRequest.riskClass,
  privacyClass: validatedRouteRequest.privacyClass,
  requiredCapabilities: validatedRouteRequest.requiredCapabilities
}))
```

The helper deriving this value must first validate the complete R1 request through `validateK6R1RouteRequest()` and must not retain raw repository ID, task ID, Git SHAs, provider/model names, prompts, source, diffs, or other free-form content.

No cross-repository, cross-revision, cross-owner, cross-privacy, or cross-task-family comparison is valid.

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
orderedCandidateIdentities = 1..128 unique SHA-256 candidate identities
```

`orderedCandidateIdentities` contains only already-eligible opaque candidate identities. R5 does not make an ineligible candidate eligible and does not perform provider qualification.

The incumbent and candidate strategies being compared must have exactly the same scope and exactly the same candidate-identity set. They may differ only in order. Duplicate identities, missing identities, added identities, or unequal candidate sets fail structurally.

`strategyIdentity` is:

```text
SHA256(canonicalK6R1Json({
  version,
  kind,
  scope,
  orderedCandidateIdentities
}))
```

The identity excludes `strategyIdentity` itself.

R5 may create, validate, compare, freeze, and serialize strategy values. It may not apply an ordering to live orchestration or mutate K6-R2.

## Exact evidence value

A strategy evidence value has exactly:

```text
version
evidenceIdentity
strategyIdentity
scope
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

All count/resource fields are non-negative safe integers. `trialCount` must be at least 1. The three quality counts and the two violation counts must each be `<= trialCount`.

Each evidence identity field is a 64-character lowercase hexadecimal digest that makes the corresponding evidence channel independently visible. R5 v1 does not fetch, execute, reinterpret, or silently manufacture the underlying evidence.

The evidence value is caller-materialized evidence, not self-reported reward truth. Its metrics remain explicitly visible and independently attributable. A future caller that cannot establish those evidence identities must fail closed rather than substitute a model confidence, reviewer vote, or opaque scalar reward.

`evidenceIdentity` is the SHA-256 digest of the exact canonical evidence value with `evidenceIdentity` omitted.

## Exact comparison metrics

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

A violation count greater than zero invalidates that side before any quality/resource dominance decision.

Quality/resource values remain independently visible in the evidence bundle. R5 must not collapse them into one opaque reward.

## Exact outcome vocabulary and precedence

```text
BOTH_INVALID
CANDIDATE_INVALID
INCUMBENT_INVALID
CANDIDATE_DOMINATES
INCUMBENT_DOMINATES
TIE
INCOMPARABLE
```

Precedence is exact:

1. structural/identity/scope/candidate-set validation failures throw and produce no qualification result;
2. if both sides have any privacy/security violation, outcome = `BOTH_INVALID`;
3. otherwise if candidate has any privacy/security violation, outcome = `CANDIDATE_INVALID`;
4. otherwise if incumbent has any privacy/security violation, outcome = `INCUMBENT_INVALID`;
5. if all five quality/resource metrics are exactly equal, outcome = `TIE`;
6. candidate dominates only if all quality metrics are `>=` incumbent, all resource metrics are `<=` incumbent, and at least one of those five inequalities is strict;
7. incumbent dominates under the exact symmetric rule;
8. all remaining mixed tradeoffs are `INCOMPARABLE`.

No tie-breaker based on provider name, model name, candidate ID lexical order, wall clock, randomness, cost estimate, reviewer vote, self-reported confidence, or historical popularity is authorized.

The comparison result has exactly:

```text
version
resultIdentity
incumbentStrategyIdentity
candidateStrategyIdentity
incumbentEvidenceIdentity
candidateEvidenceIdentity
outcome
```

`resultIdentity` is the SHA-256 digest of the exact canonical result value with `resultIdentity` omitted.

No result field named or semantically equivalent to `promote`, `winnerForProduction`, `approved`, `PROVEN_READY`, `DONE`, or automatic policy mutation is authorized.

## Rollback and incumbent retention

R5 never replaces or deletes the incumbent strategy.

Every comparison result retains both exact strategy identities and both exact evidence identities. A later separately authorized human/canonical promotion process, if one is ever created, must retain the previous incumbent identity as rollback evidence.

```text
CANDIDATE_DOMINATES != PROMOTED
INCUMBENT_DOMINATES != POLICY LOCK
TIE != RANDOM CHOICE
INCOMPARABLE != PERMISSION TO PICK AUTOMATICALLY
```

## Bounded R5-specific qualification corpus

This corpus exists only to qualify the R5 comparator and hostile-input behavior for this bounded slice. It is **not** general KodacBench and supports no broad product/model/provider superiority claim.

Canonical corpus identity:

```text
K6_R5_QUALIFICATION_CORPUS_ID = 6fa8c732fcec4f6bdfaae4c199f1b640363916246c2ea7d0a10e168d04b174a1
```

It is computed as:

```text
SHA256(canonicalK6R1Json(<exact JSON object below>))
```

The two synthetic strategy fixture identities are:

```text
INCUMBENT_STRATEGY_ID = bb947465960dafd5774d0bde679cfb96ec9dbba5e8f02cfe750e160227bf89cf
CANDIDATE_STRATEGY_ID = b65be214400b10d1e3e633ad142f7f4fe6199d2a9b4a97ef465cbcbe61e3cf21
```

Exact canonical corpus JSON:

```json
{"candidateStrategy":{"kind":"EXPLICIT_ELIGIBLE_CANDIDATE_ORDER","orderedCandidateIdentities":["bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],"scope":{"ownerScopeId":"3333333333333333333333333333333333333333333333333333333333333333","privacyClass":"REPOSITORY_PRIVATE","repositoryIdentity":"1111111111111111111111111111111111111111111111111111111111111111","revisionIdentity":"2222222222222222222222222222222222222222222222222222222222222222","taskFamilyIdentity":"4444444444444444444444444444444444444444444444444444444444444444"},"strategyIdentity":"b65be214400b10d1e3e633ad142f7f4fe6199d2a9b4a97ef465cbcbe61e3cf21","version":"kodac-k6-r5-strategy-v1"},"cases":[{"candidate":{"computeUnitsTotal":40,"doneReadyCount":2,"k5ValidCount":3,"latencyTotalMs":400,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4},"caseId":"quality-dominance","expected":"CANDIDATE_DOMINATES","incumbent":{"computeUnitsTotal":40,"doneReadyCount":2,"k5ValidCount":3,"latencyTotalMs":400,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":3}},{"candidate":{"computeUnitsTotal":36,"doneReadyCount":4,"k5ValidCount":4,"latencyTotalMs":360,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4},"caseId":"resource-dominance","expected":"CANDIDATE_DOMINATES","incumbent":{"computeUnitsTotal":40,"doneReadyCount":4,"k5ValidCount":4,"latencyTotalMs":400,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4}},{"candidate":{"computeUnitsTotal":39,"doneReadyCount":3,"k5ValidCount":3,"latencyTotalMs":390,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":3},"caseId":"incumbent-dominance","expected":"INCUMBENT_DOMINATES","incumbent":{"computeUnitsTotal":38,"doneReadyCount":3,"k5ValidCount":4,"latencyTotalMs":380,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4}},{"candidate":{"computeUnitsTotal":38,"doneReadyCount":3,"k5ValidCount":3,"latencyTotalMs":380,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4},"caseId":"exact-tie","expected":"TIE","incumbent":{"computeUnitsTotal":38,"doneReadyCount":3,"k5ValidCount":3,"latencyTotalMs":380,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4}},{"candidate":{"computeUnitsTotal":40,"doneReadyCount":3,"k5ValidCount":3,"latencyTotalMs":400,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4},"caseId":"mixed-tradeoff","expected":"INCOMPARABLE","incumbent":{"computeUnitsTotal":36,"doneReadyCount":3,"k5ValidCount":3,"latencyTotalMs":360,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":3}},{"candidate":{"computeUnitsTotal":35,"doneReadyCount":4,"k5ValidCount":4,"latencyTotalMs":350,"privacyViolationCount":1,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4},"caseId":"candidate-privacy-invalid","expected":"CANDIDATE_INVALID","incumbent":{"computeUnitsTotal":40,"doneReadyCount":4,"k5ValidCount":4,"latencyTotalMs":400,"privacyViolationCount":0,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4}},{"candidate":{"computeUnitsTotal":35,"doneReadyCount":4,"k5ValidCount":4,"latencyTotalMs":350,"privacyViolationCount":1,"securityViolationCount":0,"trialCount":4,"verifiedPassCount":4},"caseId":"both-invalid","expected":"BOTH_INVALID","incumbent":{"computeUnitsTotal":40,"doneReadyCount":4,"k5ValidCount":4,"latencyTotalMs":400,"privacyViolationCount":0,"securityViolationCount":1,"trialCount":4,"verifiedPassCount":4}}],"incumbentStrategy":{"kind":"EXPLICIT_ELIGIBLE_CANDIDATE_ORDER","orderedCandidateIdentities":["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"],"scope":{"ownerScopeId":"3333333333333333333333333333333333333333333333333333333333333333","privacyClass":"REPOSITORY_PRIVATE","repositoryIdentity":"1111111111111111111111111111111111111111111111111111111111111111","revisionIdentity":"2222222222222222222222222222222222222222222222222222222222222222","taskFamilyIdentity":"4444444444444444444444444444444444444444444444444444444444444444"},"strategyIdentity":"bb947465960dafd5774d0bde679cfb96ec9dbba5e8f02cfe750e160227bf89cf","version":"kodac-k6-r5-strategy-v1"},"version":"kodac-k6-r5-qualification-corpus-v1"}
```

The implementation test must parse this exact object, recompute the corpus identity and both strategy identities, and fail if any byte-level semantic content drifts.

The corpus covers exactly:

- quality-only candidate dominance;
- resource-only candidate dominance;
- incumbent dominance;
- exact tie;
- mixed tradeoff / incomparable;
- candidate privacy invalidation;
- both-sides safety invalidation.

Separate adversarial tests remain mandatory and are not part of the seven-case corpus identity.

## Hostile input, resource bounds and mutation semantics

R5 validators must fail closed for:

- Proxy objects;
- accessors/getters/setters instead of enumerable data properties;
- symbols;
- unexpected keys;
- sparse arrays;
- non-plain arrays/objects;
- cycles;
- `undefined`;
- invalid Unicode scalar strings;
- invalid SHA-256 identities;
- duplicate candidate identities;
- unequal candidate sets between incumbent and candidate;
- unequal scopes;
- evidence bound to the wrong strategy or scope;
- zero trials;
- count values greater than `trialCount`;
- negative values, `-0`, non-integers or unsafe integers;
- caller mutation after construction.

Resource bounds reuse existing K6 safety limits where applicable:

```text
maxCanonicalDepth = K6_R1_LIMITS.maxCanonicalDepth
maxCanonicalNodes = K6_R1_LIMITS.maxCanonicalNodes
maxOrderedCandidateIdentities = K6_R1_LIMITS.maxCandidates
```

Outputs must be deeply immutable/frozen and must not retain caller-owned mutable arrays or objects by alias.

No arbitrary free-form rationale, metadata bag, notes, labels, prompt text, source text, patch, provider/model name, secret, stdout/stderr, or extension map is authorized in R5 values.

## Exact staged implementation authority after adoption

Canonical adoption of this authorization permits only the following staged future work.

### Stage A — base-controlled trusted R5 qualifier bootstrap

One separate PR may add exactly one path:

```text
.github/workflows/k6-r5-trusted-qualification.yml
```

That workflow must be canonical on protected `main` before the R5 implementation PR can qualify. It must run from base-controlled/trusted bytes and inspect the implementation PR without executing PR-controlled code before scope/blob/workflow trust checks succeed.

It must pin and fail closed on drift of at least these predecessor blobs:

```text
packages/kodac-runtime/src/evidence-router/contracts.ts = dc29c4ce85340312f28b67604cac01c1d775e370
packages/kodac-runtime/src/evidence-router/route-plan-contracts.ts = 4ee85d8c0163d5318d0d900d733ba75afa814f7c
packages/kodac-runtime/src/evidence-router/outcome-memory-contracts.ts = 6411a42e6fc0074e60edc10eaa27e00b3b197fca
packages/kodac-runtime/src/evidence-router/outcome-memory.ts = 9f9d0769c5ffab2d482574ea59418144d6dc49a6
```

The trusted qualifier must reject any implementation changed-file set outside the exact Stage B allowlist below, reject mutable/unpinned third-party Actions, verify the authorization document identity, verify dedicated-workflow named-step fingerprints, and enforce the active ruleset identity/strict required-check semantics available to least-privilege metadata reads.

Stage A grants no R5 source/schema/test implementation authority beyond creating the trusted qualifier itself.

### Stage B — bounded R5 implementation PR

Only after Stage A is canonical and post-merge proven, one implementation PR may change exactly these six paths:

```text
.github/workflows/k6-r5-bounded-strategy-qualification.yml
schema/k6-r5-bounded-strategy-proposal.schema.json
packages/kodac-runtime/src/evidence-router/strategy-proposal-contracts.ts
packages/kodac-runtime/src/evidence-router/strategy-proposal.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k6-r5-bounded-strategy-proposal.test.ts
```

No seventh path is authorized.

The implementation may add only the exact R5 v1 pure-data contracts, validators, identity helpers, deterministic comparator, schema registration/parity, exports, tests and dedicated qualification workflow required by this record.

No dependency, package manifest, lockfile, provider adapter, persistence surface, network code, CLI, service, daemon, telemetry, training, benchmark framework, K2/K5/Done Gate mutation, trust-policy mutation, autofix, or release file may change.

## Required implementation tests

At minimum, Stage B must prove:

1. exact version/kind/outcome vocabularies;
2. deterministic strategy/evidence/result identities using `canonicalK6R1Json()`;
3. exact task-family identity derivation from a fully validated R1 request;
4. candidate/incumbent exact scope equality;
5. candidate/incumbent exact candidate-set equality and order-only difference allowance;
6. duplicate/missing/additional candidate rejection;
7. structural evidence-to-strategy and evidence-to-scope binding;
8. all seven corpus cases and exact corpus identity;
9. no weighted/hidden reward path;
10. safety invalidation precedence;
11. exact tie behavior;
12. mixed-tradeoff `INCOMPARABLE` behavior;
13. no automatic promotion/output authority field;
14. rollback/incumbent identity retention in results;
15. hostile proxy/accessor/symbol/sparse/non-plain/cycle/undefined rejection;
16. negative/unsafe/`-0` metric rejection and count-vs-trial bounds;
17. resource-bound failures;
18. caller-mutation resistance and deep freeze;
19. schema/runtime parity and additional-properties closure;
20. strict TypeScript;
21. focused R1/R2/R4/R5 predecessor regressions;
22. full runtime suite;
23. Python tests and Ruff where repository-required;
24. provenance;
25. checkout unchanged after qualification.

Tests may use synthetic evidence only. No provider/model/reviewer/tool invocation is authorized.

## Dedicated workflow constraints

`.github/workflows/k6-r5-bounded-strategy-qualification.yml` must be read-only and use immutable full-length Action SHAs only.

Its named steps must be exact and fingerprinted by the Stage A trusted qualifier. At minimum it must:

1. attest exact head, authorization identity, six-path scope, predecessor pins and immutable Actions;
2. validate R5 schema/runtime parity and closed vocabularies;
3. recompute strategy fixture and corpus identities;
4. run strict TypeScript, focused R5/adversarial/predecessor tests and full runtime tests;
5. run repository Python/Ruff/provenance gates where applicable;
6. prove no forbidden import/surface for network, persistence, provider execution, learning, automatic promotion or trust-policy mutation;
7. attest checkout unchanged.

The candidate workflow does not satisfy the independent-machine slot by itself. The canonical Stage A trusted qualifier is mandatory.

## Review and machine-evidence quorum

Provider names hold no authority. The provider-neutral amendment is binding.

For both this authorization candidate and each later R5 Stage A/Stage B candidate, a historical two-review K6 gate means:

```text
EXTERNAL_SEMANTIC_REVIEW_COUNT >= 2
EXTERNAL_SEMANTIC_REVIEW_CHANNELS_DISTINCT = YES
STALE / SKIPPED / RATE-LIMITED / STATUS-ONLY / FAILED-TO-START = NOT COUNTED
UNRESOLVED_ACTIONABLE_THREADS = 0
WAIVER = NO
```

For Stage B, machine evidence additionally requires:

```text
CANONICAL_BASE_CONTROLLED_K6_R5_TRUSTED_QUALIFICATION = SUCCESS
DEDICATED_R5_QUALIFICATION = SUCCESS
REQUIRED_REPOSITORY_CI = SUCCESS
```

No self-review satisfies an independent semantic slot.

## Protected-main ruleset requirement

Ruleset `20707483` must remain active, strict, targeted to `refs/heads/main`, with required review-thread resolution and exact required checks/trusted producer identities:

```text
provenance      / integration_id 15368
legacy-tests    / integration_id 15368
k2-runtime-gate / integration_id 15368
```

Immediately before guarded merge and again after merge, an authorized control-plane read must expose:

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

No roadmap, source, test, schema, workflow, dependency, ruleset, PR #163, Z0-family artifact, provider configuration, release artifact or other planning path is modified by this candidate.

## Adoption gate for this authorization candidate

This record remains non-canonical unless the exact final candidate proves all of the following:

1. base ref is exactly `main`;
2. candidate base SHA is exactly `1db9fef23df0961d76b1fdd1b0e558fba180cad8`;
3. candidate base tree is exactly `150442b8f59b23b9e4d625fb156f67db7ab7678d`;
4. live protected `main` remains exactly that SHA/tree through guarded merge qualification;
5. changed-file set is exactly the one documentation path above;
6. `behind_by=0` and candidate is open, non-draft and mergeable;
7. all required exact-head repository CI is terminal success;
8. at least two distinct independent external substantive semantic reviewer channels each give terminal-clean review on the exact final head;
9. zero unresolved actionable review threads remain;
10. ruleset `20707483` remains active with strict required checks and required thread resolution;
11. control-plane evidence exposes `bypass_actors=[]` and `current_user_can_bypass=never`;
12. exact candidate head, tree and document blob are captured;
13. guarded normal merge uses the exact qualified `expected_head_sha`;
14. ordered merge parent 1 equals the pre-merge canonical main and parent 2 equals the exact qualified candidate head;
15. merge tree equals the qualified candidate tree and the canonical document blob equals the qualified candidate blob;
16. GitHub merge verification/signature state is valid where GitHub supplies it;
17. applicable post-merge required checks reach terminal success;
18. ruleset/no-bypass state remains unchanged post-merge;
19. `WAIVER=NO`.

If `main` advances before merge, STOP. Forward-merge the new canonical `main` into this branch without rebase or force-push, amend this record to bind the replacement canonical base SHA/tree, and requalify the new exact head from scratch.

## Post-adoption stop boundary

Even after this authorization becomes canonical and post-merge proven:

```text
DO NOT IMPLEMENT STAGE B BEFORE STAGE A TRUSTED QUALIFIER IS CANONICAL
DO NOT INVOKE PROVIDERS / MODELS / REVIEWERS AS R5 RUNTIME WORK
DO NOT TRAIN OR LEARN
DO NOT PERSIST OR UPLOAD
DO NOT AUTO-PROMOTE
DO NOT MUTATE K2 / K5 / DONE GATE / TRUST POLICY
DO NOT CLAIM GENERAL KODACBENCH RESULTS
```

The immediate next eligible unit after canonical adoption is only the Stage A trusted R5 qualifier bootstrap defined above.

After Stage A becomes canonical and post-merge proven, Stage B becomes eligible under the exact six-path allowlist. After Stage B is canonically merged and proven, K6-R5 still requires a separate roadmap/closeout reconciliation before `K6-R5=CLOSED_CANONICAL` may be claimed.

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
