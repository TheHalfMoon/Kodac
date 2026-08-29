# Kodac P3-R2 Declared Context Selection Policy Application Authorization — 2026-08-29

## Status

```text
DOCUMENT TYPE = FOUNDER-AUTHORIZED IMPLEMENTATION GATE CANDIDATE
P3-R1 DETERMINISTIC CONTEXT SELECTION PLAN FOUNDATION = CLOSED_CANONICAL
P3-R1 ROADMAP / STATUS RECONCILIATION = CLOSED_CANONICAL
P3-R2 IMPLEMENTATION = AUTHORIZED ONLY AFTER THIS RECORD IS CANONICAL AND POST-MERGE PROVEN
P3-R3+ = NOT_AUTHORIZED
P4-P8 = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
PUBLIC QUALITY / WINNER / SUPERIORITY CLAIMS = NOT_AUTHORIZED
WAIVER = NO
```

This record is deny-by-default. While it is only a branch or pull-request candidate it creates no effective P3-R2 implementation authority.

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

Governing sources are live GitHub truth, `AGENTS.md`, current roadmap/status views, `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`, ADR-0010, the provider-neutral review quorum amendment, canonical P3-R1 authorization/evidence, and canonical P3-R1/K3 contracts and source.

If protected `main`, repository governance, or a more-specific canonical authority conflicts with this candidate before merge, this candidate is stale and must be reconciled forward. No rebase, force-push, destructive history rewriting, stale evidence reuse, bypass, or silent waiver is authorized.

## Superseded non-authority predecessor

PR #254 / head `e82ac8b459d0e0081091c5fb3a1ce654e56353f4` is closed-unmerged non-authority.

CodeRabbit comment `5461676857` identified a valid material defect: a serialized P3-R1 `ContextSelectionPlan` does not retain every preimage field needed to prove canonical `requestIdentity` from the plan alone. This replacement accepts that finding and removes plan-only derivation trust entirely.

PR #255 exact head `538ca184f84696ad07d19df052e2af95949eb608` then received CodeRabbit comment `5461752885`, which correctly identified two additional material ambiguities:

1. P3-R1 `budget-exceeded` lacked an explicit P3-R2 transition;
2. the P3-R2 result contract allowed unspecified helper subobjects.

This revision accepts both findings. It explicitly defines `budget-exceeded` behavior and closes every P3-R2 result key and nested record shape. All CI/review evidence from earlier PR #255 heads is stale after this revision.

```text
PR #254 = CLOSED_UNMERGED / NON_AUTHORITY HISTORY
PR #254 CI / REVIEW = STALE
PR #255 EARLIER HEAD CI / REVIEW = STALE AFTER HEAD MOVEMENT
VALID FINDINGS = ACCEPTED
WAIVER = NO
```

## Exact authorization-candidate changed path

This authorization candidate may change exactly one path:

```text
docs/planning/KODAC_P3_R2_DECLARED_CONTEXT_SELECTION_POLICY_AUTHORIZATION_2026-08-29.md
```

No source, test, workflow, dependency, lockfile, roadmap, status, fixture, benchmark corpus, provider/model, persistence, telemetry, package, release, ruleset, or historical canonical record is in this candidate allowlist.

## Objective

Authorize, only after this record becomes canonical and post-merge proven, one pure deterministic P3-R2 module that applies one explicit caller-declared context-selection policy to one canonical P3-R1 plan reconstructed from its complete request preimage.

P3-R2 is policy application, not policy discovery, quality ranking, strategy promotion, or another context engine.

## Closed trust boundary

P3-R2 MUST NOT accept a caller-claimed serialized P3-R1 plan as derivation truth.

The only authorized derivation input is:

```text
UNTRUSTED COMPLETE P3-R1 ContextSelectionPlanRequest
+ UNTRUSTED EXACT-KEY P3-R2 DECLARED POLICY
-> canonical buildContextSelectionPlan(planRequestValue)
-> TRUSTED REBUILT P3-R1 PLAN
-> STRICT POLICY BINDING TO REBUILT PLAN
-> DETERMINISTIC POLICY APPLICATION
-> CLOSED IMMUTABLE P3-R2 RESULT
```

The future implementation is explicitly authorized to import and invoke the already-canonical pure function:

```text
packages/kodac-runtime/src/context-selection-plan/context-selection-plan.ts
  buildContextSelectionPlan(inputValue: unknown)
```

It may import P3-R1 contract constants/types read-only. It may not modify P3-R1 or K3 bytes.

`buildContextSelectionPlan(planRequestValue)` is the sole canonical P3-R1 derivation/validation boundary. No semantic policy decision may occur before it succeeds.

No caller-claimed plan object is part of the P3-R2 public contract.

## Exact future public function boundary

The public module function must be semantically equivalent to:

```text
applyDeclaredContextSelectionPolicy(
  planRequestValue: unknown,
  policyValue: unknown,
) -> ContextSelectionPolicyApplication
```

Mandatory procedure order:

1. invoke canonical `buildContextSelectionPlan(planRequestValue)`;
2. retain only the returned trusted rebuilt P3-R1 plan as source-plan truth;
3. require `rebuiltPlan.state` to be exactly one of `ready-for-policy`, `budget-exceeded`, or `insufficient-evidence`;
4. validate the exact-key P3-R2 policy against that rebuilt plan;
5. derive `policyIdentity` from the exact normalized policy projection;
6. if `rebuiltPlan.state == insufficient-evidence`, require zero rebuilt candidates, preserve canonical abstention, and emit the closed `insufficient-evidence` result without inventing selected or omitted candidates;
7. if `rebuiltPlan.state == ready-for-policy`, traverse every rebuilt candidate under the declared policy;
8. if `rebuiltPlan.state == budget-exceeded`, ALSO traverse every rebuilt candidate under the declared P3-R2 policy; do not reject the source plan merely because P3-R1 reported its complete candidate set exceeded P3-R1 budget facts;
9. for both non-abstained source states, apply the exact group/item/byte precedence defined below, and preserve the original source state unchanged as `sourcePlanState`;
10. build selected/omitted arrays only from rebuilt P3-R1 candidates;
11. derive the closed result state from selected/omitted counts;
12. copy source completeness, source abstention, and relation evidence exactly from the rebuilt plan;
13. derive `applicationIdentity` from the exact result projection defined below, excluding only `applicationIdentity` itself;
14. deep-freeze the full result.

### Explicit `budget-exceeded` semantics

Canonical P3-R1 may return `budget-exceeded` when its complete candidate set exceeds the P3-R1 request budget facts. P3-R2 does not reinterpret or erase that fact.

For `budget-exceeded`:

```text
POLICY APPLICATION = REQUIRED
SOURCE PLAN REJECTION SOLELY DUE TO budget-exceeded = FORBIDDEN
sourcePlanState = budget-exceeded
source completeness / abstention / relation evidence = PRESERVED
R2 maxSelectedItems <= rebuiltPlan.budget.maxItems
R2 maxSelectedUtf8Bytes <= rebuiltPlan.budget.maxUtf8Bytes
ALL rebuilt candidates = traversed exactly once
```

The purpose of R2 is precisely to realize a deterministic declared bounded subset. A `budget-exceeded` source plan therefore remains usable as policy input while its source-state fact stays visible in the result.

Any source-plan state outside the three closed P3-R1 states above fails closed as an implementation invariant violation.

## Exact policy contract

A valid policy is an exact-key plain JSON-compatible object with exactly these fields and no others:

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

Policy bindings MUST equal the rebuilt plan exactly:

```text
planIdentity       == rebuiltPlan.planIdentity
repositoryIdentity == rebuiltPlan.repositoryIdentity
snapshotIdentity   == rebuiltPlan.snapshotIdentity
contentIdentity    == rebuiltPlan.contentIdentity
taskIdentity       == rebuiltPlan.taskIdentity
```

A mismatch fails closed. Cross-plan, cross-repository, cross-snapshot, cross-content, and cross-task policy reuse are forbidden.

## Closed lane policy

`lanePriority` is mandatory and must be a dense exact permutation containing each canonical P3-R1 lane exactly once:

```text
explicit-target
structural-symbol
relation-impact
working-tree
architecture-spec
lexical-fallback
```

No omission, duplicate, unknown lane, wildcard, default permutation, repository-chosen fallback, or inferred order is authorized.

Changing lane priority changes policy identity and may change deterministic selection. This is caller-declared mechanism behavior, not a quality claim.

## Closed budget and grouping policy

All three limits are mandatory positive safe integers:

```text
1 <= maxSelectedItems <= rebuiltPlan.budget.maxItems
1 <= maxSelectedUtf8Bytes <= rebuiltPlan.budget.maxUtf8Bytes
1 <= maxPerGroupingKey <= maxSelectedItems
```

P3-R2 may narrow P3-R1 request budgets but may never expand them.

No hidden/adaptive budget, learned cap, per-lane score threshold, or repository-owned default is authorized.

## Deterministic candidate traversal order

For `ready-for-policy` and `budget-exceeded`, derive one total order using only:

1. the index of `candidate.lane` in caller-declared `lanePriority`;
2. lowercase canonical P3-R1 `candidateIdentity` lexical order within one lane.

The identity tie-break is a deterministic serialization/selection tie-break only. It is not relevance, confidence, utility, reward, correctness, preference, priority quality, or superiority.

P3-R2 must not inspect/acquire candidate text or compute lexical overlap, graph centrality, structural importance, historical success, provider/model scores, embeddings, learned relevance, or any other new ranking feature.

## Closed selection and omission procedure

Traverse every rebuilt candidate exactly once in the declared total order.

For each candidate evaluate exactly this precedence:

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
- else if selected item count equals `maxSelectedItems`, omit with `item-budget`;
- else if checked addition of candidate `utf8Bytes` would exceed `maxSelectedUtf8Bytes`, omit with `byte-budget`;
- else select it and increment selected item, selected byte, and grouping-key counters;
- after `byte-budget` omission continue traversal so a later smaller candidate may fit;
- never truncate, merge, rewrite, replace, silently drop, or evaluate a candidate twice;
- for each non-abstained source plan, `selectedCandidates` plus the candidate contained in every `omittedCandidates` record MUST partition the rebuilt candidate array exactly once by `candidateIdentity`;
- arithmetic uses safe-integer checked addition and fails closed on overflow/impossible source values.

## Closed result contract

No unspecified helper object, extension object, metadata bag, arbitrary semantic field, or implementation-defined key is authorized anywhere in the P3-R2 result.

### Exact top-level keys

A result is an exact-key plain object containing exactly these keys and no others:

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

Exact constants:

```text
version = p3-r2-context-selection-policy-application-v1
kind = context_selection_policy_application
```

### Exact selected candidate schema

Each `selectedCandidates[i]` is exactly one canonical normalized P3-R1 `ContextSelectionCandidate` object returned in `rebuiltPlan.candidates`.

P3-R2 MUST copy/preserve that canonical candidate semantic record without adding, removing, renaming, rewriting, or recomputing any candidate field. The selected record therefore has exactly the canonical P3-R1 candidate keys and values present in the rebuilt plan; no P3-R2 candidate extension key is authorized.

`selectedCandidates` preserves R2 traversal order.

### Exact omitted record schema

Each `omittedCandidates[i]` is an exact-key plain object with exactly:

```text
candidate
reason
```

`candidate` is exactly the canonical normalized P3-R1 candidate object from the rebuilt plan, with no added/removed/rewritten candidate key.

`reason` is exactly one of:

```text
group-cap
item-budget
byte-budget
```

No other omission field or reason is authorized.

`omittedCandidates` preserves R2 traversal order among omitted candidates.

### Exact source metadata schemas

`sourceCompleteness` is exactly the canonical `rebuiltPlan.completeness` object, with identical keys and values and no P3-R2 extension.

`sourceAbstention` is exactly the canonical `rebuiltPlan.abstention` object, with identical keys and values and no P3-R2 extension.

`relationEvidence` is exactly the canonical `rebuiltPlan.relationEvidence` ordered array, with each canonical relation-binding object preserved identically and no P3-R2 extension.

`sourcePlanState` is exactly the rebuilt plan state: `ready-for-policy`, `budget-exceeded`, or `insufficient-evidence`.

### Derived counters

```text
usedSelectedItems = selectedCandidates.length
usedSelectedUtf8Bytes = safe checked sum of candidate.utf8Bytes across selectedCandidates
```

These counters are facts, not inputs or ranking scores.

## Closed result state machine

Result `state` is exactly one of:

```text
selected-all-candidates
selected-subset
budget-constrained-empty
insufficient-evidence
```

Derivation is mandatory and exclusive:

```text
if sourcePlanState == insufficient-evidence:
  require rebuilt candidate count == 0
  require selectedCandidates.length == 0
  require omittedCandidates.length == 0
  state = insufficient-evidence

else if selectedCandidates.length == rebuilt candidate count:
  require omittedCandidates.length == 0
  state = selected-all-candidates

else if selectedCandidates.length == 0:
  require omittedCandidates.length == rebuilt candidate count
  state = budget-constrained-empty

else:
  require selectedCandidates.length > 0
  require omittedCandidates.length > 0
  require selected + omitted == rebuilt candidate count
  state = selected-subset
```

A non-abstained rebuilt plan cannot produce `insufficient-evidence`. An abstained rebuilt plan cannot produce any selected/omitted candidate.

P3-R1 completeness and source state remain independent source facts. P3-R2 never upgrades incomplete source evidence to complete and never rewrites `budget-exceeded` to `ready-for-policy`.

## Closed identity semantics

### Policy identity

`policyIdentity` is lowercase SHA-256 over deterministic canonical sorted-key JSON of exactly this normalized projection and no other value:

```text
{
  version,
  kind,
  policyId,
  planIdentity,
  repositoryIdentity,
  snapshotIdentity,
  contentIdentity,
  taskIdentity,
  lanePriority,
  maxSelectedItems,
  maxSelectedUtf8Bytes,
  maxPerGroupingKey
}
```

No derived identity field is part of the policy input.

### Application identity

`applicationIdentity` is lowercase SHA-256 over deterministic canonical sorted-key JSON of exactly the complete result top-level projection below, excluding only `applicationIdentity` itself:

```text
{
  version,
  kind,
  policyIdentity,
  policyId,
  planIdentity,
  requestIdentity,
  candidateSetIdentity,
  repositoryIdentity,
  snapshotIdentity,
  contentIdentity,
  taskIdentity,
  state,
  lanePriority,
  maxSelectedItems,
  maxSelectedUtf8Bytes,
  maxPerGroupingKey,
  usedSelectedItems,
  usedSelectedUtf8Bytes,
  selectedCandidates,
  omittedCandidates,
  sourcePlanState,
  sourceCompleteness,
  sourceAbstention,
  relationEvidence
}
```

Because every nested record shape above is closed, this projection cannot acquire implementation-defined semantic fields.

Canonicalization preserves semantic array order, sorts unordered object keys, rejects unsupported/non-JSON structures and cycles, and is independent of clock, absolute path, environment, process state, locale, network, provider state, randomness, and caller property insertion order.

## Hostile-input and structural validation requirements

Before unsafe evaluation, P3-R2 policy/result helpers fail closed on:

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
unsafe/impossible integers
oversized/invalid policyId
lane duplicates/omissions/extras
identity mismatches
resource-bound violations
unexpected source plan state
```

The complete P3-R1 request itself is validated only by canonical `buildContextSelectionPlan`; P3-R2 must not weaken, bypass, or recreate a looser P3-R1 validator.

## Authorized implementation allowlist

After and only after this authorization becomes canonical and post-merge proven, exactly one P3-R2 implementation PR may modify only:

```text
packages/kodac-runtime/src/context-selection-policy/contracts.ts
packages/kodac-runtime/src/context-selection-policy/context-selection-policy.ts
packages/kodac-runtime/test/p3-r2-context-selection-policy.test.ts
docs/planning/KODAC_P3_R2_DECLARED_CONTEXT_SELECTION_POLICY_EVIDENCE_2026-08-29.md
```

No fifth path is authorized.

Read-only imports from canonical P3-R1 source/contracts are authorized. Mutation of P3-R1/K3 bytes is not.

No export barrel, package manifest, CLI, application integration, workflow, dependency, lockfile, fixture, benchmark corpus, roadmap, status, persistence, telemetry, provider/model configuration, release, or ruleset path is authorized.

If implementation needs an additional path or P3-R1/K3 contract change, stop and create separate canonical authority.

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
- automatic policy choice, mutation, optimization, promotion, or learning;
- numeric quality score, ranking weight, threshold, confidence, reward, significance rule, or universal score;
- benchmark execution, benchmark corpus mutation, benchmark result generation, or any quality/superiority claim;
- embeddings, vector databases, ANN, learned rerankers/classifiers, model-scored retrieval, or provider/model invocation;
- K3-R5 context-engine execution or mutation;
- K3-R6 relation-graph construction/query execution or mutation;
- repository crawling, scanning, indexing, history reads, new filesystem acquisition, or ast-grep execution;
- network, secrets, sandbox, subprocess, persistence, database, telemetry, upload, analytics, training, fine-tuning, online learning, or cross-repository retrieval/learning;
- new dependencies, donor intake, or donor replacement;
- CLI, API, product, agent-loop, reviewer, gateway, routing, retry, autofix, or release integration;
- P2-R6+ implementation;
- P4-P8 implementation;
- K2/K5/Done Gate/`PROVEN_READY` authority expansion;
- package publication, public release/version declaration, production-readiness, compatibility/support/security, benchmark, winner, best, superior, or brand-launch claims;
- GitHub ruleset mutation or bypass.

## Required focused implementation tests

The future implementation PR must prove at least:

1. canonical `buildContextSelectionPlan` is invoked before policy semantics;
2. malformed P3-R1 requests fail through the canonical builder;
3. no caller-claimed serialized plan is accepted by the public R2 function;
4. `ready-for-policy` is accepted and applied deterministically;
5. `budget-exceeded` is accepted, every source candidate is traversed exactly once, the result preserves `sourcePlanState=budget-exceeded`, and R2 limits do not exceed P3-R1 budgets;
6. `insufficient-evidence` preserves source abstention and produces zero selected/omitted candidates;
7. unexpected source state fails closed as an invariant violation;
8. exact policy key set is enforced; unknown/missing keys fail;
9. `policyId` alphabet and 512-byte bound are enforced;
10. policy identities must match rebuilt plan/repository/snapshot/content/task identities;
11. lane priority is an exact dense six-lane permutation;
12. no default lane priority exists;
13. item/byte/group limits are positive safe integers and cannot expand rebuilt-plan budgets;
14. traversal is lane priority then canonical candidateIdentity only;
15. semantically irrelevant caller object insertion order does not affect identities/results;
16. group-cap precedes item-budget, which precedes byte-budget;
17. traversal continues after a byte-budget omission;
18. selected plus omitted exactly partition every non-abstained rebuilt candidate once;
19. selected records equal canonical rebuilt candidates without added/removed/rewritten keys;
20. omitted records have exactly `candidate` and `reason` keys;
21. source completeness equals rebuilt plan completeness exactly;
22. source abstention equals rebuilt plan abstention exactly;
23. relation evidence equals rebuilt plan relation evidence exactly;
24. result top-level exact-key enforcement rejects any added helper/metadata/extension key;
25. every nested P3-R2-owned object has exactly its authorized key set;
26. result state derivation follows the closed state machine exactly;
27. used counters equal selected length and checked selected byte sum;
28. `policyIdentity` projection is exactly the authorized policy projection;
29. `applicationIdentity` projection includes every authorized result field except itself and no unspecified field;
30. candidate/relation/source trust metadata is never upgraded or rewritten;
31. hostile Proxy/accessor/symbol/sparse/cyclic/non-plain/unknown-field structures fail closed;
32. nested returned structures are deeply frozen;
33. no repository/filesystem/network/subprocess/provider/model/persistence/telemetry/learning behavior exists;
34. no quality score, weight, threshold, winner, benchmark result, or superiority verdict is materialized;
35. focused tests and all existing required repository CI pass on the exact final head.

Fixtures must be in-memory in the authorized test path or reuse canonical data without adding a fixture path or network access.

## Required implementation evidence record

The future implementation PR must create exactly:

```text
docs/planning/KODAC_P3_R2_DECLARED_CONTEXT_SELECTION_POLICY_EVIDENCE_2026-08-29.md
```

It must bind at least:

- canonical authorization merge identity and authorization blob;
- implementation base SHA/tree;
- exact final implementation head/tree;
- exact four changed paths and final blobs;
- focused commands/results;
- required exact-head Governance and K2 qualification;
- applicable supported-platform runtime qualification;
- at least two distinct independent external substantive terminal-clean exact-head semantic reviewer channels;
- zero unresolved material findings/actionable threads;
- active no-bypass ruleset proof;
- preserved purity/non-grants;
- guarded normal merge conditions;
- post-merge protected-main/ordered-parent/tree/blob/signature/applicable-check proof before P3-R2 may be called canonical or complete.

Candidate-time evidence must not claim future merge/post-merge facts as completed.

## Authorization-candidate qualification gate

This one-path authorization candidate may merge only when one frozen exact head proves all of:

1. protected `main` remains the exact canonical base above or the candidate is reconciled forward without destructive history rewriting;
2. `behind_by=0`;
3. changed-file set is exactly the one authorization path with no rename/copy source;
4. no runtime source/test/workflow/dependency/lockfile/fixture/roadmap/status/package/release/ruleset path changes;
5. exact final candidate head/tree/document blob are captured;
6. required exact-head CI is terminal success, including `provenance`, `legacy-tests`, and `k2-runtime-gate` as applicable;
7. at least two distinct independently operated external semantic reviewer/model-system channels each provide a substantive terminal-clean assessment bound to the exact final head;
8. rate-limit, billing, outage, skipped review, status-only, summary-only, self-review, stale-head, or duplicate-provider output does not count;
9. unresolved material correctness/security/governance/authority/evidence/contract/testability/scope findings = 0;
10. unresolved actionable review threads = 0;
11. PR is open, non-draft, mergeable, and not behind protected `main`;
12. ruleset `20707483` remains active with required thread resolution and required contexts `provenance`, `legacy-tests`, and `k2-runtime-gate`;
13. bypass actors remain empty and current user cannot bypass;
14. `WAIVER=NO`;
15. merge is a normal history-preserving guarded merge using exact qualified `expected_head_sha`;
16. no force-push, rebase, destructive history rewrite, stale evidence reuse, bypass, or silent waiver occurs.

Any head change invalidates all prior exact-head CI/reviewer qualification.

## Mandatory authorization post-merge proof

P3-R2 implementation authority becomes effective only after all of:

```text
PR = MERGED NORMALLY
PROTECTED main = EXACT MERGE SHA
MERGE PARENT 1 = EXACT PRE-MERGE CANONICAL main
MERGE PARENT 2 = EXACT QUALIFIED AUTHORIZATION HEAD
MERGE TREE = EXACT QUALIFIED AUTHORIZATION TREE
AUTHORIZATION BLOB ON main = EXACT QUALIFIED BLOB
MERGE SIGNATURE = verified / valid
POST-MERGE GOVERNANCE = SUCCESS
K2 PUSH APPLICABILITY = RECORDED TRUTHFULLY; DOCS-ONLY PATH FILTER MAY MAKE RUNTIME PUSH NOT_APPLICABLE
RULESET 20707483 = active / no bypass
WAIVER = NO
```

Only then may one implementation branch start from that canonical authorization merge and touch the exact four implementation paths.

## After P3-R2 implementation closure

P3-R2 closure, if later achieved, establishes only the bounded deterministic declared-policy application mechanism.

It does not prove that any lane order, grouping cap, budget, policy, context set, or resulting selection is better than K3-R5 or any alternative.

Any repository-owned default policy, policy comparison, benchmark-backed promotion, quality claim, or P3-R3+ work requires a separate later exact canonical authorization under ADR-0010.

Roadmap/status reconciliation after canonical P3-R2 implementation closure is documentation work only and must not silently create P3-R3 implementation authority.

```text
P3-R2 MECHANISM != BETTER CONTEXT
DECLARED POLICY != REPOSITORY-OWNED WINNING POLICY
DETERMINISTIC SELECTION != QUALITY RANKING
P3-R2 CLOSED != P3 OVERALL CLOSED
P3-R2 CLOSED != P3-R3 AUTHORIZED
WAIVER = NO
```
