# Kodac P3-R2 Declared Context Selection Policy Application Evidence — 2026-08-29

## Record identity

- Date: 2026-08-29
- Authority class: `P3-R2 BOUNDED IMPLEMENTATION EVIDENCE CANDIDATE`
- Canonical authorization: `docs/planning/KODAC_P3_R2_DECLARED_CONTEXT_SELECTION_POLICY_AUTHORIZATION_2026-08-29.md`
- Authorization PR: `#255`
- Authorization qualified head: `25136158d1a0fead0f086a9bb907faf75f663604`
- Authorization qualified tree: `ed8826e2e4bfcf55d9dca1781c67b108656764bf`
- Authorization document blob: `cff65ced6162a4b871f9ee0958f74592887af99a`
- Canonical authorization merge / implementation base: `69f74cef1f9cc36ed8db123cc30b65e881aa147e`
- Authorization post-merge Governance: `33247742550 / SUCCESS`
- Authorization K2 push: `NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER`
- Evidence-materialization parent head: `9947016862d34c26b61799afd4ae7e943d3c0d69`
- Evidence-materialization parent tree: `0f8ebc2fc1317c272ccb5856b7f02539c256383b`
- Protected-main ruleset: `20707483` (`Kodac canonical main protection v1`)
- `WAIVER=NO`

## Candidate state

```text
P3-R2 AUTHORIZATION = CANONICAL / EFFECTIVE
P3-R2 IMPLEMENTATION = CANDIDATE / NOT CLOSED_CANONICAL
P3-R3+ = NOT_AUTHORIZED
P4-P8 = NOT_AUTHORIZED
REPOSITORY-OWNED WINNING POLICY = NOT ESTABLISHED
BENCHMARK-BACKED QUALITY IMPROVEMENT = NOT ESTABLISHED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
WAIVER = NO
```

This record is candidate-time evidence. It does not claim a future implementation merge, post-merge result, `CLOSED_CANONICAL`, quality improvement, strategy promotion, public benchmark result, product integration, or release state.

## Exact authorized implementation realization before this evidence file

Relative to canonical implementation base `69f74cef1f9cc36ed8db123cc30b65e881aa147e`, evidence-materialization parent `9947016862d34c26b61799afd4ae7e943d3c0d69` changes exactly these three authorized implementation/test paths:

```text
packages/kodac-runtime/src/context-selection-policy/contracts.ts
packages/kodac-runtime/src/context-selection-policy/context-selection-policy.ts
packages/kodac-runtime/test/p3-r2-context-selection-policy.test.ts
```

Exact pre-evidence blobs:

```text
packages/kodac-runtime/src/context-selection-policy/contracts.ts
  1b5bf19868214fd202ede209d5976dfa9d17677d
packages/kodac-runtime/src/context-selection-policy/context-selection-policy.ts
  9bb0a3ba619f10fedaedba6f9559bdc6dffbeaa7
packages/kodac-runtime/test/p3-r2-context-selection-policy.test.ts
  af6e7b91518fc841cb6c53ed7e0bc73b358d054f
```

This evidence record is the fourth and final path in the canonical P3-R2 implementation allowlist:

```text
packages/kodac-runtime/src/context-selection-policy/contracts.ts
packages/kodac-runtime/src/context-selection-policy/context-selection-policy.ts
packages/kodac-runtime/test/p3-r2-context-selection-policy.test.ts
docs/planning/KODAC_P3_R2_DECLARED_CONTEXT_SELECTION_POLICY_EVIDENCE_2026-08-29.md
```

No P3-R1/K3 source or test path, export barrel, package manifest, lockfile, workflow, dependency, fixture, benchmark corpus, roadmap, status, provider/model configuration, persistence, telemetry, product, release, ruleset, or fifth path is modified.

## Self-reference-safe exact-head binding rule

This evidence file cannot embed the blob or commit identity produced by materializing itself without recursive identity dependence. It therefore binds the exact parent and the three pre-evidence implementation/test blobs above.

Final qualification must externally capture from one frozen exact final PR head:

1. exact final head SHA;
2. exact final tree SHA;
3. exact blob SHA for this evidence record;
4. exact final blobs for both P3-R2 source files and the focused test file;
5. exact four-path changed-file set;
6. exact-head required Governance and K2 workflow/check identities and platform results;
7. exact-head independent semantic-review quorum evidence;
8. zero unresolved material findings and zero unresolved actionable review threads;
9. active ruleset/no-bypass evidence.

Any repository-byte change after that capture makes prior exact-head checks and review evidence stale and requires fresh qualification.

## Implemented bounded contract

The implementation is a pure deterministic in-memory mechanism over canonical P3-R1 request semantics.

The public function is:

```text
applyDeclaredContextSelectionPolicy(
  planRequestValue: unknown,
  policyValue: unknown,
) -> ContextSelectionPolicyApplication
```

The implementation:

- invokes canonical P3-R1 `buildContextSelectionPlan(planRequestValue)` before any P3-R2 policy semantics;
- accepts no caller-claimed serialized P3-R1 plan as derivation truth;
- uses only the trusted P3-R1 plan rebuilt by the canonical builder;
- supports exactly `ready-for-policy`, `budget-exceeded`, and `insufficient-evidence` source-plan states;
- applies the caller-declared R2 policy to both `ready-for-policy` and `budget-exceeded` and preserves the original `sourcePlanState`;
- preserves P3-R1 `insufficient-evidence` abstention with zero selected and omitted candidates;
- validates one exact-key versioned declared policy bound to exact plan/repository/snapshot/content/task identities;
- validates a bounded stable `policyId`;
- requires one dense exact permutation of all six P3-R1 evidence lanes with no default/inferred repository policy;
- requires explicit positive item/UTF-8/group limits that cannot exceed the rebuilt P3-R1 plan budgets;
- derives traversal order only from caller-declared lane priority and canonical `candidateIdentity` lexical order within a lane;
- applies closed omission precedence `group-cap` -> `item-budget` -> `byte-budget` -> select;
- continues traversal after a byte-budget omission so a later smaller candidate may fit;
- requires selected plus omitted records to partition every non-abstained rebuilt P3-R1 candidate exactly once;
- preserves selected candidates as exact canonical P3-R1 candidate records;
- emits omitted records with exactly `candidate` and `reason`;
- preserves source completeness, source abstention, and relation evidence from the rebuilt P3-R1 plan without P3-R2 extensions;
- emits exactly the authorization-defined top-level result keys and closed four-state result machine;
- derives deterministic SHA-256 `policyIdentity` and `applicationIdentity` from the exact authorization-defined nonrecursive semantic projections;
- rejects malformed, unknown-field, missing-field, sparse/extended-array, symbol-field, accessor, Proxy, non-plain, invalid identity, invalid lane permutation, impossible limit, cyclic/non-JSON canonicalization, and other hostile P3-R2 policy structures fail-closed;
- returns deeply frozen result structures;
- adds no dependency and introduces no side effect, repository acquisition, K3 execution, provider/model invocation, persistence, telemetry, or learning.

The implementation deliberately materializes no quality score, ranking weight, threshold, confidence, reward, winner, superiority verdict, repository-owned default policy, strategy promotion, or benchmark result.

## Authorization findings incorporated before implementation

The canonical authorization was repaired forward before implementation authority became effective. Its history records three accepted material review findings:

1. plan-only P3-R1 derivation validation was impossible because the serialized plan does not retain every request-identity preimage;
2. `budget-exceeded` required an explicit P3-R2 transition;
3. result helper/nested schemas required exact closure.

The canonical authorization resolves these by requiring full P3-R1 request reconstruction through `buildContextSelectionPlan`, explicit policy application to `budget-exceeded`, and exact top-level/nested result schemas and identity projections.

This implementation follows that repaired authorization rather than the closed-unmerged predecessor semantics.

## Focused test contract

Focused file:

```text
packages/kodac-runtime/test/p3-r2-context-selection-policy.test.ts
```

Direct focused command under the repository's Node 24 test model:

```text
node --experimental-strip-types --test test/p3-r2-context-selection-policy.test.ts
```

Repository runtime command:

```text
npm test
```

The canonical runtime test runner discovers sorted `test/*.test.ts` files, so the focused P3-R2 test file is expected to participate in each applicable K2 runtime matrix `npm test` step.

Focused coverage includes:

- canonical P3-R1 builder-before-policy ordering;
- ready-for-policy behavior;
- budget-exceeded application and source-state preservation;
- insufficient-evidence abstention;
- exact policy keys/version/kind;
- bounded stable policy IDs;
- exact plan/repository/snapshot/content/task binding;
- exact dense six-lane permutation and absence of a default;
- source-plan-bounded item/byte/group limits;
- declared lane priority and canonical candidate-identity traversal ordering;
- group/item/byte omission precedence;
- continued traversal after byte-budget omission;
- exact selected/omitted partition accounting;
- exact top-level and omission-record schemas;
- source completeness/abstention/relation-evidence preservation;
- exact four-state result derivation;
- selected counter and UTF-8 byte facts;
- exact policy-identity projection;
- exact application-identity projection;
- object-property insertion-order independence while lane array order remains semantic;
- Proxy/accessor/symbol/non-plain/sparse/extended/non-enumerable hostile policy rejection;
- non-finite/unsafe/impossible numeric policy rejection;
- deep immutability;
- absence of materialized quality/ranking/benchmark verdict fields.

At evidence materialization time no trusted PR-event machine qualification is claimed. Branch push K2 execution is not a substitute for the required pull-request exact-head matrix. Final machine facts must come from GitHub Actions on the exact frozen PR head.

## Required exact-head machine qualification

Before merge, one frozen final PR head must prove:

- `behind_by=0` against protected canonical `main`;
- exact changed-file set equals the four authorized P3-R2 paths;
- Governance succeeds, including required `provenance` and `legacy-tests` contexts;
- K2 classifies the PR as runtime-sensitive;
- Ubuntu, Windows, and macOS runtime matrix jobs all succeed;
- each runtime matrix job completes the canonical Typecheck, Test (`npm test`), and Patch benchmark hook steps successfully;
- stable `k2-runtime-gate` succeeds;
- the P3-R2 focused file participates through the canonical deterministic test runner;
- no package/dependency mutation is introduced.

Exact workflow run IDs, job results, final head/tree, and all four final blobs must be captured externally on the frozen final head.

Any implementation or evidence repair creates a new exact head and invalidates prior exact-head qualification evidence.

## Required independent semantic review

The frozen final head requires at least two distinct independently operated external substantive terminal-clean semantic reviewer/model-system channels under the canonical provider-neutral review-evidence contract.

Each qualifying channel must inspect the exact final four-path diff and assess at least:

- authorization/allowlist compliance;
- canonical P3-R1 builder-before-policy trust boundary;
- source-state transitions, especially `budget-exceeded` and `insufficient-evidence`;
- hostile-input fail-closed behavior;
- exact policy and result schemas;
- deterministic ordering, group/item/byte precedence, partition accounting, and identity semantics;
- source evidence/provenance/completeness/abstention/relation-binding preservation;
- absence of hidden ranking/scoring/quality claims or repository-owned winning policy;
- absence of K3 execution/mutation, P3-R1 mutation, repository acquisition, provider/model execution, persistence, telemetry, learning, new dependencies, product integration, P3-R3+, P4-P8, release authority, or ruleset bypass.

Status-only, summary-only, skipped, billing/rate-limit/outage, stale-head, self-review, or duplicate-provider output does not count. Unresolved material findings and actionable review threads must equal zero.

## Preserved non-grants

```text
CALLER-CLAIMED SERIALIZED P3-R1 PLAN TRUST = NO
P3-R1 MUTATION = NO
K3-R5 / K3-R6 EXECUTION OR MUTATION = NO
REPOSITORY-OWNED DEFAULT / WINNING POLICY = NO
QUALITY SCORE / WEIGHT / THRESHOLD / CONFIDENCE / REWARD = NO
BENCHMARK EXECUTION / QUALITY CLAIM = NO
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NO
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NO
REPOSITORY / FILESYSTEM ACQUISITION = NO
NETWORK / SECRETS / SUBPROCESS / SANDBOX = NO
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / ANALYTICS = NO
TRAINING / FINE-TUNING / ONLINE LEARNING = NO
CROSS-REPOSITORY RETRIEVAL / LEARNING = NO
NEW DEPENDENCIES / DONOR INTAKE = NO
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NO
STRATEGY PROMOTION / AUTOMATIC POLICY CHOICE = NO
P3-R3+ = NOT_AUTHORIZED
P4-P8 = NOT_AUTHORIZED
PUBLIC WINNER / SUPERIORITY / RELEASE / PACKAGE PUBLICATION = NO
RULESET MUTATION / BYPASS = NO
WAIVER = NO
```

## Guarded merge requirement

The implementation PR may merge only when one exact frozen final head proves all authorization qualification gates, including machine qualification, two independent substantive terminal-clean reviewer channels, zero material findings/threads, active no-bypass ruleset, current protected main alignment, and exact four-path scope.

The merge must use normal history-preserving merge semantics with exact `expected_head_sha`.

No force-push, rebase, destructive history rewrite, stale-head evidence reuse, governance bypass, reviewer substitution by summary/status output, or silent waiver is allowed.

## Mandatory implementation post-merge proof

P3-R2 may be called `CLOSED_CANONICAL` only after all of:

```text
IMPLEMENTATION PR = MERGED NORMALLY
PROTECTED main = EXACT IMPLEMENTATION MERGE SHA
MERGE PARENT 1 = EXACT PRE-MERGE CANONICAL main
MERGE PARENT 2 = EXACT QUALIFIED IMPLEMENTATION HEAD
MERGE TREE = EXACT QUALIFIED IMPLEMENTATION TREE
FOUR CANONICAL PATH BLOBS = EXACT QUALIFIED CANDIDATE BLOBS
MERGE SIGNATURE = verified / valid
POST-MERGE GOVERNANCE = SUCCESS
POST-MERGE K2 RUNTIME = SUCCESS FOR RUNTIME-SENSITIVE MAIN PUSH
RULESET 20707483 = active / no bypass
WAIVER = NO
```

Only then may the bounded P3-R2 declared-policy application mechanism be called canonical/closed.

## Exit meaning

Even a future canonical P3-R2 closure establishes only this deterministic declared-policy application mechanism.

```text
P3-R2 CLOSED != BETTER CONTEXT
P3-R2 CLOSED != REPOSITORY-OWNED DEFAULT POLICY
P3-R2 CLOSED != BENCHMARK-BACKED IMPROVEMENT
P3-R2 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P3-R2 CLOSED != P3 OVERALL CLOSED
P3-R2 CLOSED != P3-R3 AUTHORIZED
P3-R2 CLOSED != PRODUCT / RELEASE READY
```

Any repository-owned policy choice, comparison, promotion, benchmark-backed quality claim, or P3-R3+ implementation requires a later separate exact canonical authorization under ADR-0010.

Roadmap/status reconciliation after canonical P3-R2 closure is documentation work only and creates no later implementation authority by implication.
