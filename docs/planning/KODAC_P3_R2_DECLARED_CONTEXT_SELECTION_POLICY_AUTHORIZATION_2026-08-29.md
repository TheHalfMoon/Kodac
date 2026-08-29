# Kodac P3-R2 Declared Context Selection Policy Application Authorization — 2026-08-29

## Status

```text
DOCUMENT TYPE: FOUNDER-AUTHORIZED IMPLEMENTATION GATE CANDIDATE
P3-R1 DETERMINISTIC CONTEXT SELECTION PLAN FOUNDATION = CLOSED_CANONICAL
P3-R1 ROADMAP / STATUS RECONCILIATION = CLOSED_CANONICAL
P3-R2 IMPLEMENTATION = AUTHORIZED ONLY AFTER THIS RECORD IS CANONICAL AND POST-MERGE PROVEN
P3-R3+ = NOT AUTHORIZED
P4-P8 = NOT AUTHORIZED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
PUBLIC QUALITY / WINNER / SUPERIORITY CLAIMS = NOT AUTHORIZED
WAIVER = NO
```

This record is deny-by-default. It creates no effective P3-R2 implementation authority while it is only a branch or pull-request candidate.

## Exact canonical baseline

```text
CANONICAL_MAIN = f0b18b3d6be10818195e2aef9f3d4123a2b9d3a2
CANONICAL_TREE = 8aef76890f7bc787ad9b5bb7be649290d498d0bc
P3_R1_AUTHORIZATION_PR = #251
P3_R1_AUTHORIZATION_MERGE = 2b3ce25fe4b8e108840208cdf7a7018ba6262fd6
P3_R1_IMPLEMENTATION_PR = #252
P3_R1_QUALIFIED_HEAD = feee83d214bb2ed47e25b730e8c6840538d57882
P3_R1_IMPLEMENTATION_MERGE = ba3caabef0b36649a1d556ff287237ca2a455ab2
P3_R1_RECONCILIATION_PR = #253
P3_R1_RECONCILIATION_QUALIFIED_HEAD = f0d348eea162fd1150c135c772aacef93b9860a1
P3_R1_RECONCILIATION_MERGE = f0b18b3d6be10818195e2aef9f3d4123a2b9d3a2
P3_R1_RECONCILIATION_TREE = 8aef76890f7bc787ad9b5bb7be649290d498d0bc
P3_R1_RECONCILIATION_POST_MERGE_GOVERNANCE = 33246366794 / SUCCESS
P3_R1_RECONCILIATION_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
RULESET = 20707483 / Kodac canonical main protection v1 / active
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
WAIVER = NO
```

Governing sources include `AGENTS.md`, current roadmap/status views, `KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`, ADR-0010, the provider-neutral review quorum amendment, canonical P3-R1 authorization/evidence, and canonical P3-R1/K3 contracts and source.

If protected `main`, repository governance, or a more-specific canonical authority conflicts with this candidate before merge, this candidate is stale and must be reconciled forward without rebase, force-push, destructive history rewriting, stale evidence reuse, bypass, or silent waiver.

## Superseded non-authority predecessor

PR #254 / head `e82ac8b459d0e0081091c5fb3a1ce654e56353f4` is closed-unmerged non-authority.

CodeRabbit comment `5461676857` identified a valid material contract defect: the prior candidate required P3-R2 to independently prove a serialized `ContextSelectionPlan` from the plan alone, but canonical P3-R1 does not retain every request-identity preimage field in the plan. In particular, caller completeness is combined with relation completeness before the plan is emitted, so a plan-only consumer cannot reconstruct the original P3-R1 request identity fail-closed.

This replacement does not waive or reinterpret that defect. It removes the ambiguous trust boundary entirely.

```text
PR #254 = CLOSED_UNMERGED / NON_AUTHORITY HISTORY
PR #254 CI / REVIEW = STALE FOR THIS REPLACEMENT
VALID FINDING = ACCEPTED
WAIVER = NO
```

## Exact authorization-candidate changed path

This replacement authorization candidate may change exactly one path:

```text
docs/planning/KODAC_P3_R2_DECLARED_CONTEXT_SELECTION_POLICY_AUTHORIZATION_2026-08-29.md
```

No source, test, workflow, dependency, lockfile, roadmap, status, fixture, benchmark corpus, provider/model, persistence, telemetry, package, release, ruleset, or historical canonical record is in this candidate allowlist.

## P3-R2 trust boundary

P3-R2 MUST NOT accept a caller-claimed serialized P3-R1 plan as derivation truth.

The only authorized derivation input is:

```text
UNTRUSTED COMPLETE P3-R1 ContextSelectionPlanRequest
+ UNTRUSTED EXACT-KEY P3-R2 DECLARED POLICY
-> canonical buildContextSelectionPlan(planRequest)
-> TRUSTED REBUILT P3-R1 PLAN
-> STRICT POLICY BINDING TO REBUILT PLAN
-> DETERMINISTIC POLICY APPLICATION
-> IMMUTABLE P3-R2 RESULT
```

The future P3-R2 implementation is explicitly authorized to import and invoke the already-canonical pure function:

```text
packages/kodac-runtime/src/context-selection-plan/context-selection-plan.ts
  buildContextSelectionPlan(inputValue: unknown)
```

It is also authorized to import P3-R1 contract constants/types read-only.

This is not authority to modify P3-R1, execute K3-R5, query K3-R6, acquire repository data, or add any side effect. `buildContextSelectionPlan` is used solely as the canonical P3-R1 derivation and validation boundary over caller-supplied in-memory request data.

After reconstruction, policy application MUST use the returned canonical P3-R1 plan object. It MUST NOT use unvalidated semantic fields read from a caller-claimed plan object, because no caller-claimed plan object is part of the P3-R2 contract.

## Why this boundary is contract-closed

Canonical P3-R1 `buildContextSelectionPlan` already validates and derives from the complete request:

- request version and kind;
- task identity;
- repository/snapshot/content identities;
- candidates and candidate identities;
- candidate-set identity;
- optional full K3-R6 relation results and their bindings;
- request item/byte budgets;
- caller completeness;
- aggregated plan completeness;
- abstention;
- request identity;
- plan identity.

P3-R2 therefore does not need to reverse an irreversible projection from a serialized plan. It reconstructs the exact canonical P3-R1 plan from the full request preimage and binds all later policy semantics to that rebuilt plan.

## Exact future P3-R2 function boundary

The implementation may choose internal helper names, but the public module function must be semantically equivalent to:

```text
applyDeclaredContextSelectionPolicy(
  planRequestValue: unknown,
  policyValue: unknown,
) -> ContextSelectionPolicyApplication
```

Procedure order is mandatory:

1. call canonical `buildContextSelectionPlan(planRequestValue)`;
2. obtain the trusted rebuilt P3-R1 plan;
3. validate the exact-key P3-R2 policy against that rebuilt plan;
4. derive the canonical policy identity;
5. if the rebuilt plan is `insufficient-evidence`, preserve abstention and emit no selected/omitted candidate invention;
6. otherwise derive the deterministic declared candidate traversal order;
7. apply group/item/byte constraints with the closed precedence below;
8. build selected and omitted records from the rebuilt P3-R1 candidates only;
9. preserve source plan completeness, abstention, identities, and relation evidence;
10. derive the application identity from the exact result semantic projection excluding its own identity field;
11. deep-freeze the result.

No semantic policy decision may occur before step 1 succeeds.

## Exact policy contract

A valid policy is an exact-key plain JSON-compatible object with exactly these semantic fields:

```text
version
kind
policyId
planIdentity
repositoryIdentity
snapshotIdentity
contentIdentity
taskIdentity
lanePriority
maxSelectedItems
maxSelectedUtf8Bytes
maxPerGroupingKey
```

Exact constants:

```text
version = p3-r2-declared-context-selection-policy-v1
kind = apply_declared_context_selection_policy
```

`policyId` is mandatory and must:

```text
be non-empty
contain no NUL
be <= 512 UTF-8 bytes
match ^[A-Za-z0-9][A-Za-z0-9._:/-]*$
```

This intentionally reuses the canonical P3-R1 stable-id alphabet/bound.

The policy bindings MUST equal the rebuilt plan exactly:

```text
planIdentity       == rebuiltPlan.planIdentity
repositoryIdentity == rebuiltPlan.repositoryIdentity
snapshotIdentity   == rebuiltPlan.snapshotIdentity
contentIdentity    == rebuiltPlan.contentIdentity
taskIdentity       == rebuiltPlan.taskIdentity
```

A mismatch fails closed. There is no cross-plan, cross-repository, cross-snapshot, cross-content, or cross-task policy reuse.

## Closed lane policy

`lanePriority` is mandatory semantic input and must be a dense exact permutation containing each canonical P3-R1 lane exactly once:

```text
explicit-target
structural-symbol
relation-impact
working-tree
architecture-spec
lexical-fallback
```

No omission, duplicate, unknown lane, wildcard, default permutation, repository-chosen fallback, or inferred order is authorized.

Changing lane priority changes policy identity and may change output order/selection. That is caller-declared policy behavior, not a quality claim.

## Closed budget and grouping policy

All three limits are mandatory positive safe integers:

```text
1 <= maxSelectedItems <= rebuiltPlan.budget.maxItems
1 <= maxSelectedUtf8Bytes <= rebuiltPlan.budget.maxUtf8Bytes
1 <= maxPerGroupingKey <= maxSelectedItems
```

P3-R2 may narrow P3-R1 request budgets but may never expand them.

No hidden budget, adaptive budget, learned cap, per-lane score threshold, or repository-owned default is authorized.

## Deterministic candidate traversal order

For a non-abstained rebuilt plan, derive one total order using only:

1. index of `candidate.lane` in caller-declared `lanePriority`;
2. lowercase canonical P3-R1 `candidateIdentity` lexical order inside one lane.

The candidate identity tie-break is a deterministic serialization/selection tie-break only. It is not relevance, confidence, utility, reward, correctness, preference, priority quality, or superiority.

P3-R2 must not inspect or acquire candidate text. It must not compute lexical overlap, graph centrality, structural importance, historical success, model/provider scores, embeddings, learned relevance, or any other new ranking feature.

## Closed selection and omission procedure

Traverse candidates in the declared total order.

For each candidate, evaluate exactly this precedence:

```text
1. GROUP CAP
2. ITEM BUDGET
3. UTF-8 BYTE BUDGET
4. SELECT
```

Closed omission reasons:

```text
group-cap
item-budget
byte-budget
```

Rules:

- if the candidate grouping key already has `maxPerGroupingKey` selected candidates, omit with `group-cap`;
- else if selected item count already equals `maxSelectedItems`, omit with `item-budget`;
- else if selecting the candidate would make selected UTF-8 bytes exceed `maxSelectedUtf8Bytes`, omit with `byte-budget`;
- else select it and increment selected item, byte, and grouping-key counters;
- after `byte-budget` omission, continue traversal so a later smaller candidate may fit;
- no candidate may be silently truncated, merged, rewritten, replaced, dropped, or evaluated twice;
- selected plus omitted candidates MUST partition every rebuilt-plan candidate exactly once.

Arithmetic must use safe-integer checked addition and fail closed on overflow or impossible source values.

## Exact result contract

Exact constants:

```text
version = p3-r2-context-selection-policy-application-v1
kind = context_selection_policy_application
```

The result must preserve semantic equivalents of exactly these core fields, with helper subobjects allowed only when their keys are closed by the implementation contract:

```text
version
kind
applicationIdentity
policyIdentity
policyId
planIdentity
requestIdentity
candidateSetIdentity
repositoryIdentity
snapshotIdentity
contentIdentity
taskIdentity
state
lanePriority
maxSelectedItems
maxSelectedUtf8Bytes
maxPerGroupingKey
usedSelectedItems
usedSelectedUtf8Bytes
selectedCandidates
omittedCandidates
sourcePlanState
sourceCompleteness
sourceAbstention
relationEvidence
```

Each selected candidate is the complete normalized canonical P3-R1 candidate record from the rebuilt plan.

Each omitted record contains exactly:

```text
candidate = complete normalized canonical P3-R1 candidate
reason = group-cap | item-budget | byte-budget
```

Selected candidate array and omitted record array preserve traversal order. They are semantic ordered arrays and must not be independently resorted afterward.

The result must preserve rebuilt-plan relation evidence exactly as read-only semantic data. It may not execute or expand relation evidence.

## Exact result states

Closed vocabulary:

```text
selected-all-candidates
selected-subset
budget-constrained-empty
insufficient-evidence
```

Meanings:

- `insufficient-evidence`: rebuilt P3-R1 plan has `state=insufficient-evidence` and canonical abstention; selected and omitted arrays are empty because no source candidates exist;
- `budget-constrained-empty`: rebuilt plan has candidates but explicit R2 constraints select none; all source candidates appear in omitted records;
- `selected-subset`: at least one candidate selected and at least one omitted;
- `selected-all-candidates`: every rebuilt-plan candidate selected and omitted array empty.

P3-R1 completeness and abstention remain separate source metadata. R2 deterministic policy application never upgrades incomplete source evidence to complete.

## Identity semantics

`policyIdentity` is SHA-256 over the canonical normalized policy semantic projection containing all policy fields above except no derived identity field is part of the policy input.

`applicationIdentity` is SHA-256 over the canonical result semantic projection containing every result field except `applicationIdentity` itself.

Canonicalization must be deterministic sorted-key JSON semantics for unordered object properties, preserve semantic array order, reject unsupported/non-JSON structures, reject cycles, and remain independent of wall-clock time, local absolute path, environment, process state, locale, network state, provider state, randomness, and caller property insertion order.

## Hostile-input requirements

Before unsafe evaluation, P3-R2 policy/result helpers must fail closed on:

```text
Proxy objects
accessor/getter/setter properties
symbol fields
non-enumerable semantic fields
non-plain object prototypes
sparse/accessor/extended arrays
unknown object fields
missing required fields
unsupported versions/kinds
cycles
undefined / bigint / function / symbol values
non-finite numbers
unsafe or impossible integers
oversized policyId
invalid stable-id alphabet
lane duplicates/omissions/extras
identity mismatches
resource-bound violations
```

The P3-R1 request itself is validated by canonical `buildContextSelectionPlan`; P3-R2 must not weaken or bypass that validation.

## Authorized implementation allowlist

After and only after this authorization becomes canonical and post-merge proven, exactly one P3-R2 implementation PR may modify only:

```text
packages/kodac-runtime/src/context-selection-policy/contracts.ts
packages/kodac-runtime/src/context-selection-policy/context-selection-policy.ts
packages/kodac-runtime/test/p3-r2-context-selection-policy.test.ts
docs/planning/KODAC_P3_R2_DECLARED_CONTEXT_SELECTION_POLICY_EVIDENCE_2026-08-29.md
```

No fifth path is authorized.

Read-only direct imports from canonical P3-R1 source/contracts are authorized. Mutation of P3-R1/K3 bytes is not.

No export barrel, package manifest, CLI, application integration, workflow, dependency, lockfile, fixture, benchmark corpus, roadmap, status, persistence, telemetry, provider/model configuration, release, or ruleset path is authorized.

If implementation needs any additional path or P3-R1/K3 contract change, stop and create separate canonical authority.

## Purity and side-effect invariants

```text
DETERMINISTIC = YES
PURE / IN-MEMORY = YES
P3-R1 PURE BUILDER INVOCATION = YES / EXACTLY buildContextSelectionPlan(planRequestValue)
P3-R1 MUTATION = NO
K3-R5 EXECUTION / MUTATION = NO
K3-R6 GRAPH EXECUTION / MUTATION = NO
AST-GREP EXECUTION = NO
REPOSITORY / FILESYSTEM ACQUISITION = NO
NETWORK / SECRETS = NO
SUBPROCESS / SANDBOX = NO
PROVIDER / MODEL / REVIEWER / EVALUATOR = NO
PERSISTENCE / FILE OUTPUT / DATABASE = NO
TELEMETRY / UPLOAD / ANALYTICS = NO
TRAINING / FINE-TUNING / ONLINE LEARNING = NO
CROSS-REPOSITORY RETRIEVAL / LEARNING = NO
NEW DEPENDENCIES = NO
DONOR CODE / DATA INTAKE = NO
```

Ordinary repository test-runner and CI behavior already present in canonical tooling is not new P3 authority.

## Explicit non-grants

This authorization does not grant:

- P3-R3 or later P3 implementation;
- caller-claimed plan trust or plan-only derivation validation;
- repository-owned default/winning policy;
- automatic policy choice, mutation, optimization, adaptation, or promotion;
- numeric relevance/quality weights, blended scores, thresholds, confidence, rewards, utility, or hidden ranking features;
- benchmark execution, result generation, policy comparison, winner, best, superior, SOTA, or quality-improvement claims;
- embeddings, vector databases, ANN indexes, learned rerankers/classifiers, or semantic-model retrieval;
- K3-R5 context-engine invocation;
- K3-R6 graph construction/query execution;
- repository crawling/scanning/indexing/file/history reads or context-text acquisition;
- provider/model/reviewer/evaluator/tool/agent execution;
- network/secrets/subprocess/sandbox/external-service authority;
- persistence/database/telemetry/upload/analytics/training/online learning/repository-local experience retrieval;
- cross-repository retrieval/aggregation/learning/policy transfer;
- new dependencies or donor intake/replacement;
- CLI/API/product/agent-loop/reviewer/gateway/routing/retry/autofix/release integration;
- P3-R1 or K3 source/contract/test/evidence mutation;
- K2/K5/Done Gate/PROVEN_READY expansion;
- P2-R6+ or P4-P8 implementation;
- general/public KodacBench completion;
- package publication/public release/version/production/security/support/brand claims;
- ruleset mutation or bypass.

## Required implementation tests

The later implementation PR must prove at least:

1. P3-R2 calls canonical `buildContextSelectionPlan` on the complete untrusted request before policy semantics are read/applied;
2. malformed/tampered P3-R1 request identities, candidates, relation results, completeness, budgets, and hostile structures fail through canonical P3-R1 validation;
3. no caller-claimed serialized plan object is accepted as derivation truth;
4. policy exact keys, version, kind, `policyId` byte/alphabet bounds, and all bindings validate fail-closed;
5. cross-plan/repository/snapshot/content/task policy reuse fails;
6. lanePriority contains all six lanes exactly once and has no default;
7. changing lane priority changes policy identity and observable order where applicable;
8. same-lane candidate identity lexical tie-break is deterministic and never materializes a score;
9. item/byte/group limits are positive safe integers and cannot exceed rebuilt-plan authority;
10. group-cap omission and reason;
11. item-budget omission and reason;
12. byte-budget omission and reason;
13. omission precedence group -> item -> byte;
14. traversal continues after byte omission and later smaller candidate may fit;
15. selected + omitted partition every source candidate exactly once;
16. selected/omitted records preserve complete rebuilt P3-R1 candidate semantics/provenance without trust upgrade;
17. relation evidence is preserved exactly and never executed;
18. source incompleteness remains incomplete;
19. source P3-R1 insufficient-evidence produces R2 insufficient-evidence without invention;
20. all-budget-omitted candidates produce budget-constrained-empty, distinct from insufficient-evidence;
21. all selected -> selected-all-candidates;
22. strict non-empty subset -> selected-subset;
23. identical semantic inputs produce identical policy/application identities;
24. object insertion order is non-semantic while policy/result array order remains semantic;
25. identity projections exclude their own derived identity field and reject tampering where applicable;
26. hostile Proxy/accessor/symbol/sparse/cyclic/non-plain/unknown/unsupported/non-finite/oversized inputs fail closed;
27. arithmetic overflow fails closed;
28. nested returned structures are deeply frozen and detached from caller mutation;
29. exact result version/kind and closed states/reasons are enforced;
30. no quality score/weight/threshold/winner/promotion/default policy is materialized;
31. no repository acquisition/K3 execution/network/subprocess/provider/persistence/telemetry/training/side effect occurs;
32. focused tests pass on every repository-supported runtime CI platform;
33. all repository-required CI remains green.

Tests use in-memory/repository-authored values inside the one authorized test path; no new fixture path or network access.

## Required implementation evidence record

The later implementation PR must create exactly:

```text
docs/planning/KODAC_P3_R2_DECLARED_CONTEXT_SELECTION_POLICY_EVIDENCE_2026-08-29.md
```

It must bind the canonical authorization merge/blob, implementation base/head/tree, four final blobs, unchanged canonical P3-R1 blobs, focused/full CI results, runtime matrix, two distinct external substantive terminal-clean exact-head semantic review channels, zero unresolved findings/threads, active no-bypass ruleset, forward-only repair history, purity/non-grants, guarded merge conditions, and required post-merge proof.

Candidate-time evidence must not fabricate future merge facts. If evidence materialization moves the implementation head, all earlier exact-head CI/review is pre-final evidence only and the evidence-bearing final head must be requalified.

## Authorization-candidate qualification gate

This replacement one-path authorization candidate may merge only when one frozen exact head proves:

1. canonical `main` is the expected baseline above or the candidate is forward-reconciled without destructive history rewrite;
2. `behind_by=0`;
3. changed-file set is exactly this one authorization path;
4. exact candidate head/tree/document blob are captured;
5. required exact-head `provenance`, `legacy-tests`, and `k2-runtime-gate` contexts succeed as applicable;
6. at least two distinct independent external substantive semantic reviewer channels are terminal-clean on this exact head under the provider-neutral quorum;
7. skipped, billing, outage, status-only, summary-only, self-review, stale-head, or duplicate-provider output does not count;
8. unresolved material correctness/security/governance/authority/evidence/contract/testability/scope findings = 0;
9. unresolved actionable review threads = 0;
10. PR is open, non-draft, mergeable, and not behind protected main;
11. ruleset `20707483` remains active with required contexts/thread resolution, `bypass_actors=[]`, and `current_user_can_bypass=never`;
12. `WAIVER=NO`;
13. merge uses normal history-preserving `merge` semantics guarded by exact `expected_head_sha`;
14. no force-push, rebase, stale evidence reuse, bypass, or silent waiver occurs.

Any candidate head change invalidates prior exact-head CI and review qualification.

## Mandatory authorization post-merge proof

P3-R2 implementation authority becomes effective only after proving:

1. protected main equals the authorization merge SHA;
2. ordered parent 1 equals exact pre-merge main;
3. ordered parent 2 equals exact qualified authorization head;
4. merge tree equals qualified candidate tree;
5. canonical authorization blob equals candidate blob;
6. GitHub merge verification/signature is valid where supplied;
7. applicable post-merge Governance is terminal success;
8. path-filtered absence of K2 push is only `NOT_APPLICABLE`, never mislabeled success;
9. ruleset remains active/no-bypass;
10. PR merged/closed and no material post-merge invalidation exists;
11. `WAIVER=NO`.

Only then may repository work state:

```text
P3-R2 DECLARED CONTEXT SELECTION POLICY APPLICATION = AUTHORIZED / NOT YET CLOSED_CANONICAL
```

## P3-R2 completion boundary

The later implementation is `CLOSED_CANONICAL` only after exact four-path scope, final-head Governance and full K2 runtime matrix, focused tests, two distinct terminal-clean external semantic reviewer channels, zero unresolved material findings/threads, exact head/tree/four blobs, active no-bypass ruleset, guarded normal merge, and post-merge main/parents/tree/blobs/signature/Governance/K2/ruleset proof.

Successful P3-R2 closure establishes only the deterministic caller-declared policy application primitive. It does not establish that any policy is better.

## Next-stage boundary

No P3-R3 implementation is authorized here. After P3-R2 closure and roadmap/status reconciliation, the next P3 unit must be separately defined from live repository truth. Any repository-owned policy comparison, promotion, or context-quality improvement claim must be benchmark-backed under ADR-0010 before canonicalization.

```text
P3-R2 CLOSED != P3 OVERALL CLOSED
P3-R2 CLOSED != BETTER CONTEXT PROVEN
P3-R2 CLOSED != REPOSITORY-OWNED POLICY CHOSEN
P3-R2 CLOSED != EMBEDDINGS AUTHORIZED
P3-R2 CLOSED != MODEL RERANKING AUTHORIZED
P3-R2 CLOSED != PRODUCT INTEGRATION AUTHORIZED
P3-R2 CLOSED != P3-R3 AUTHORIZED
```

`WAIVER=NO`
