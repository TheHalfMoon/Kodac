# Kodac P3-R3 Context Policy Pairwise Metric Evidence — 2026-08-29

## Record identity

- Date: 2026-08-29
- Authority class: `P3-R3 BOUNDED IMPLEMENTATION EVIDENCE CANDIDATE`
- Canonical authorization: `docs/planning/KODAC_P3_R3_CONTEXT_POLICY_PAIRWISE_METRIC_EVIDENCE_AUTHORIZATION_2026-08-29.md`
- Authorization PR: `#258`
- Authorization qualified head: `9afe9a879319e22f6db53585115c6d47883ff066`
- Authorization qualified tree: `22c42cc939564a3569e7032a4fead57c60a7308f`
- Authorization document blob: `34b86510c5b37998fd3bb94fdb507cf599d34288`
- Canonical authorization merge / implementation base: `70553fef18c992b1ec819720e051258372af75d8`
- Authorization post-merge Governance: `33251819170 / SUCCESS`
- Authorization K2 push: `NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER`
- Protected-main ruleset: `20707483` (`Kodac canonical main protection v1`)
- `WAIVER=NO`

## Candidate state

```text
P3-R3 AUTHORIZATION = CANONICAL / EFFECTIVE
P3-R3 IMPLEMENTATION = CANDIDATE / NOT CLOSED_CANONICAL
P3-R4+ = NOT_AUTHORIZED
P4-P8 = NOT_AUTHORIZED
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT ESTABLISHED
PUBLIC QUALITY / WINNER / SUPERIORITY CLAIM = NOT ESTABLISHED
WAIVER = NO
```

This record is candidate-time evidence. It does not claim a future implementation merge, post-merge result, `CLOSED_CANONICAL`, benchmark execution, strategy promotion, repository-owned default policy, quality improvement, product integration, release state, or P3-R4+ authority.

## Exact implementation realization before this evidence file

Relative to canonical implementation base `70553fef18c992b1ec819720e051258372af75d8`, evidence-materialization parent `ef999697e385acd1dc4b816bb0e7e650e09407b6` changes exactly these three authorized implementation/test paths:

```text
packages/kodac-runtime/bench/p3-r3/contracts.ts
packages/kodac-runtime/bench/p3-r3/context-policy-evidence.ts
packages/kodac-runtime/test/p3-r3-context-policy-evidence.test.ts
```

Evidence-materialization parent tree:

```text
e03a75bc289cb07be0a2e487e7bc481ee5429110
```

Exact pre-evidence blobs:

```text
packages/kodac-runtime/bench/p3-r3/contracts.ts
  7383bca3962b054f8b3798f0e8c1a26ccd675c6a
packages/kodac-runtime/bench/p3-r3/context-policy-evidence.ts
  8c01bf5e4c41103ae491cea701f0b9b3fe9dffb1
packages/kodac-runtime/test/p3-r3-context-policy-evidence.test.ts
  aa413f0310224dea5abb64946cf0e8705d114f9c
```

This evidence record is the fourth and final path in the canonical P3-R3 implementation allowlist:

```text
packages/kodac-runtime/bench/p3-r3/contracts.ts
packages/kodac-runtime/bench/p3-r3/context-policy-evidence.ts
packages/kodac-runtime/test/p3-r3-context-policy-evidence.test.ts
docs/planning/KODAC_P3_R3_CONTEXT_POLICY_PAIRWISE_METRIC_EVIDENCE_2026-08-29.md
```

No fifth path is authorized. No P3-R1/P3-R2 source or test path, P2 R1-R5 source/test path, package manifest, lockfile, workflow, dependency, fixture corpus, benchmark manifest, roadmap, status, provider/model configuration, persistence, telemetry, product, release, or ruleset path is modified.

## Self-reference-safe exact-head binding rule

This evidence file cannot embed the blob or commit identity produced by materializing itself without recursive identity dependence. It therefore binds the exact parent and three pre-evidence implementation/test blobs above, then records later forward repairs by their already-existing parent commit and non-self-referential path blobs.

Final qualification must externally capture from one frozen exact final PR head:

1. exact final head SHA;
2. exact final tree SHA;
3. exact blob SHA for this evidence record;
4. exact final blobs for both P3-R3 source files and the focused test file;
5. exact four-path changed-file set;
6. exact-head required Governance and K2 workflow/check identities and platform results;
7. exact-head independent semantic-review quorum evidence;
8. zero unresolved material findings and zero unresolved actionable review threads;
9. active ruleset/no-bypass evidence.

Any repository-byte change after that capture makes prior exact-head checks and review evidence stale and requires fresh qualification.

## Accepted exact-head review finding and forward repair

Exact head `4ba75a4eada44fe83f570592254c5f050d7ef240` received a material automated Codex review finding in review thread `PRRT_kwDOTVTeS86daaBO`, review comment database ID `3886803666`.

The finding correctly identified that the implementation contained several authorization-required invariants but the focused test file did not yet prove all of the explicit Section 20 merge-gate obligations. The missing direct proofs included malformed left/right policy rejection, duplicate metric IDs, right-subject binding, left/right system-version binding, raw-artifact identity preservation, relation-label independence of the comparability-only state, and caller-mutation detachment.

The finding is accepted without waiver. A forward-only test repair was committed as:

```text
REPAIR_COMMIT = 753a1b0cb2aae13c2998738c1ccc4a9128ffbbd5
REPAIR_PARENT = 4ba75a4eada44fe83f570592254c5f050d7ef240
REPAIRED_TEST_BLOB = 8afd1a80a0adca146f8d5c85ff40581920309d4f
SOURCE_BLOB_CHANGE = NONE
AUTHORIZATION_ALLOWLIST_EXPANSION = NONE
WAIVER = NO
```

The repair changes only the already-authorized focused test path. It adds direct negative/positive proofs for the accepted finding and strengthens adjacent declaration-binding and hostile-value coverage. No runtime source, dependency, workflow, fixture/corpus, benchmark execution, product, release, ruleset, or predecessor byte was changed.

All CI and semantic-review evidence bound to `4ba75a4eada44fe83f570592254c5f050d7ef240` or any earlier head is stale for final qualification after this repair. The prior exact-head Cubic clean assessment and prior CodeRabbit/Codex evidence may remain historical evidence only; they do not count toward the final-head quorum. Final qualification must restart on the exact head produced after this evidence update.

```text
VALID_FINDING = ACCEPTED
REPAIR = FORWARD_ONLY
STALE_PRIOR_HEAD_CI_REVIEW = YES
WAIVER = NO
```

## Implemented bounded contract

The implementation is a pure deterministic in-memory evidence-binding mechanism. The public function is:

```text
buildContextPolicyPairwiseMetricEvidence(
  planRequestValue: unknown,
  leftPolicyValue: unknown,
  rightPolicyValue: unknown,
  p2R4ComparisonValue: unknown,
  evidenceDeclarationValue: unknown,
) -> ContextPolicyPairwiseMetricEvidence
```

The implementation:

- invokes canonical P3-R2 `applyDeclaredContextSelectionPolicy(...)` for the left declared policy;
- invokes canonical P3-R2 `applyDeclaredContextSelectionPolicy(...)` for the right declared policy;
- accepts no caller-claimed serialized P3-R2 application as derivation truth;
- validates trusted P3-R2 `policyIdentity` and `applicationIdentity` values as canonical bare lowercase 64-hex digests;
- requires both applications to bind the same plan/request/candidate-set/repository/snapshot/content/task identities;
- requires distinct policy identities and distinct application identities;
- invokes canonical P2-R5 `deriveP2R5Relations(...)` over the complete caller-materialized P2-R4 comparison;
- accepts no caller-claimed P2-R5 relation set as derivation truth;
- validates one exact-key P3-R3 evidence declaration after the canonical P2-R5 derivation succeeds;
- binds declaration benchmark/protocol/shared-evaluation-context/comparison-policy facts to trusted P2-R5 evidence;
- derives P2 subject IDs only from trusted P3-R2 application identities;
- derives each P2 `system_version_commit_identity` through canonical `sha256Canonical(...)` over the authorization-defined P3-R2 implementation-merge/policy/application projection;
- requires exact left/right P2 subject binding to those derived identities;
- requires exactly one `context-selection` task family;
- requires exactly seven P2 metrics and an exact dense semantic-order mapping for:
  - `recall-at-k`;
  - `precision-at-k`;
  - `file-f1`;
  - `token-budgeted-evidence-yield`;
  - `no-gold-abstention`;
  - `explored-vs-utilized-context`;
  - `context-dilution`;
- preserves all seven trusted P2-R5 metric-relation records exactly and in canonical P2-R5 order;
- derives only the closed structural evidence state `all-required-metrics-comparable` or `one-or-more-required-metrics-insufficient` from P2 comparison status;
- does not use relation labels to derive the evidence state;
- derives `evidenceIdentity` only with canonical P2-R1 `sha256Canonical(...)` over every exact output field except `evidenceIdentity` itself;
- rejects Proxy/accessor/symbol/non-plain/sparse/extended/unknown/missing declaration structures fail-closed;
- returns deeply frozen evidence;
- adds no dependency and introduces no side effect, repository acquisition, benchmark execution, provider/model invocation, persistence, telemetry, learning, product integration, or release behavior.

The implementation deliberately materializes no favored-count, majority, score, rank, normalized value, weighting, threshold, p-value, confidence interval, winner, better/worse verdict, acceptance verdict, repository-owned default, promotion decision, benchmark-completion claim, chronology conclusion, contamination conclusion, holdout-sufficiency conclusion, or public quality claim.

## Identity grammar boundary

The implementation preserves the repaired canonical distinction proven by authorization PR #258:

```text
P3-R2 policyIdentity      = ^[0-9a-f]{64}$
P3-R2 applicationIdentity = ^[0-9a-f]{64}$
P2 inherited identities   = ^sha256:[0-9a-f]{64}$
P3-R3 evidenceIdentity    = ^sha256:[0-9a-f]{64}$
```

The derived subject ID is:

```text
context-policy-application:<bare P3-R2 applicationIdentity>
```

The derived P2 `system_version_commit_identity` remains a canonical `sha256Canonical(...)` identity and therefore retains the `sha256:` prefix.

## Focused test contract

Focused file:

```text
packages/kodac-runtime/test/p3-r3-context-policy-evidence.test.ts
```

Direct focused command under the repository Node 24 model:

```text
node --experimental-strip-types --test test/p3-r3-context-policy-evidence.test.ts
```

Repository runtime command:

```text
npm test
```

Focused coverage now includes:

- canonical all-comparable R3 evidence realization;
- exact output constants and top-level key set;
- canonical bare P3-R2 identity grammar and prefixed P2/P3-R3 identity grammar;
- exact `evidenceIdentity` projection;
- insufficient-evidence preservation with no aggregate verdict;
- malformed P3-R1 request rejection through canonical P3-R2 before later evidence access;
- malformed left and right P3-R2 policy rejection through canonical P3-R2;
- canonical P2-R5 validation before the R3 declaration is touched;
- distinct P3-R2 policy/application requirements;
- negative left and right P2 subject-ID cross-binding proofs;
- negative left and right `system_version_commit_identity` cross-binding proofs;
- positive left/right subject identity and raw-artifact-log identity preservation;
- declaration exact keys/constants and benchmark/protocol/shared-context/comparison-policy binding;
- bounded qualification and metric stable-ID grammars;
- exact dense seven-dimension semantic order and exact closed dimension set;
- sparse/extended-array rejection;
- duplicate declaration metric-ID rejection;
- exact declared/trusted metric-set equality;
- Proxy/accessor/symbol/non-plain declaration rejection;
- invalid non-JSON declaration value rejection;
- declaration object-property insertion-order independence;
- explicit relation-label independence of `metricEvidenceState`;
- caller-mutation detachment after return;
- deep immutability;
- canonical P2 metric order preservation;
- absence of winner/score/rank/threshold/promotion/default-policy output fields.

At evidence materialization time no trusted PR-event machine qualification is claimed. Final machine facts must come from GitHub Actions on the exact frozen PR head.

## Required exact-head machine qualification

Before merge, one frozen final PR head must prove:

- `behind_by=0` against protected canonical `main`;
- exact changed-file set equals the four authorized P3-R3 paths;
- Governance succeeds, including required `provenance` and `legacy-tests` contexts;
- K2 classifies the PR as runtime-sensitive because `packages/kodac-runtime/**` changes;
- Ubuntu, Windows, and macOS runtime matrix jobs all succeed;
- each runtime matrix job completes Typecheck, Test (`npm test`), and Patch benchmark hook successfully;
- stable `k2-runtime-gate` succeeds;
- the focused P3-R3 test participates through the canonical deterministic test runner;
- no package/dependency mutation is introduced.

Any implementation or evidence repair creates a new exact head and invalidates prior exact-head qualification evidence.

## Required independent semantic review

The frozen final head requires at least two distinct independently operated external substantive terminal-clean semantic reviewer/model-system channels under the canonical provider-neutral review-evidence contract.

Each qualifying channel must inspect the exact final four-path diff and assess at least:

- canonical #258 authorization and exact allowlist compliance;
- P3-R2-twice then P2-R5 trust-boundary integrity;
- repaired P3-R2 bare-digest versus P2 `sha256:` identity grammar;
- left/right application shared-identity and distinct-policy/application invariants;
- exact P2 subject cross-binding;
- exact seven-dimension declaration and trusted metric-set equality;
- comparability-only state derivation without relation aggregation;
- exact output and identity projection;
- hostile-input fail-closed behavior and deep immutability;
- absence of chronology/contamination/significance/promotion inference;
- absence of benchmark execution, provider/model execution, dependencies, persistence, telemetry, product/release integration, P3-R4+, P4-P8, or ruleset authority.

Status-only, summary-only, service-error, skipped, billing-blocked, same-provider duplicate, or stale-head responses do not satisfy the quorum.

## Required guarded merge and post-merge proof

Merge is permitted only after the exact frozen head satisfies all required machine and semantic-review gates with `WAIVER=NO`.

The merge must use normal history-preserving merge semantics with the exact expected-head precondition. Squash, rebase, force-push, destructive history rewriting, ruleset bypass, and silent waiver are not authorized.

Before `P3-R3 CONTEXT POLICY PAIRWISE METRIC EVIDENCE = CLOSED_CANONICAL`, post-merge proof must establish:

- canonical `main` equals the merge SHA;
- merge parent 1 equals the exact pre-merge canonical main;
- merge parent 2 equals the exact qualified PR head;
- merge tree equals the exact qualified candidate tree;
- all four canonical path blobs equal the final qualified candidate blobs;
- merge signature is verified/valid;
- post-merge Governance succeeds;
- post-merge K2 runtime-sensitive push runs and succeeds across the applicable full platform matrix plus stable gate;
- ruleset `20707483` remains active with no bypass;
- the PR is merged/closed.

Only then may the bounded P3-R3 implementation be called `CLOSED_CANONICAL`.

## Preserved non-grants

```text
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / FIXTURE / MANIFEST MUTATION = NOT_AUTHORIZED
WINNER / LOSER / BETTER / WORSE VERDICT = NOT_AUTHORIZED
FAVORED-COUNT / MAJORITY / AGGREGATE SCORE = NOT_AUTHORIZED
WEIGHT / RANK / THRESHOLD / SIGNIFICANCE RULE = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT POLICY = NOT_AUTHORIZED
POLICY PROMOTION / ACCEPTANCE = NOT_AUTHORIZED
CHRONOLOGY / CONTAMINATION / HOLDOUT SUFFICIENCY INFERENCE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DATABASE / LEARNED RERANKING = NOT_AUTHORIZED
NETWORK / SECRETS / SUBPROCESS / SANDBOX EXPANSION = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
P2-R6+ = NOT_AUTHORIZED
P3-R4+ = NOT_AUTHORIZED
P4-P8 = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
PUBLIC QUALITY / WINNER / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```
