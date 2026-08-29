# Kodac P3-R2 Declared Context Selection Policy Application Authorization — 2026-08-29

## Status

```text
DOCUMENT TYPE: FOUNDER-AUTHORIZED IMPLEMENTATION GATE CANDIDATE
P3-R1 DETERMINISTIC CONTEXT SELECTION PLAN FOUNDATION: CLOSED_CANONICAL
P3-R1 ROADMAP / STATUS RECONCILIATION: CLOSED_CANONICAL
P3-R2 IMPLEMENTATION: AUTHORIZED ONLY AFTER THIS RECORD IS CANONICAL AND POST-MERGE PROVEN
P3-R3+: NOT AUTHORIZED
P4-P8: NOT AUTHORIZED
GENERAL / PUBLIC KODACBENCH: NOT CLOSED
PUBLIC QUALITY / WINNER / SUPERIORITY CLAIMS: NOT AUTHORIZED
WAIVER: NO
```

This record is deny-by-default. It creates no effective P3-R2 implementation authority while it is only a branch or pull-request candidate. The exact bounded P3-R2 implementation authority below becomes effective only after this exact authorization unit qualifies on one frozen head, merges normally into protected `main`, and completes the mandatory post-merge proof defined here.

## Exact canonical baseline

This candidate was prepared from protected canonical `main` after the P3-R1 implementation and its current-view reconciliation were both proven:

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

The P3-R1 reconciliation is documentation/navigation only. Its successful canonicalization makes P3-R2 definition/planning and authorization-candidate preparation eligible; it does not itself authorize P3-R2 implementation.

Governing sources include:

- `AGENTS.md`;
- `docs/roadmap/NEXT.md`;
- `docs/roadmap/ROADMAP.md`;
- `docs/roadmap/MILESTONES.md`;
- `docs/product/STATUS.md`;
- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`;
- `docs/adr/ADR-0010-benchmark-first-donor-selection.md`;
- `docs/planning/KODAC_REVIEW_PROVIDER_NEUTRALITY_AND_EVIDENCE_QUORUM_AMENDMENT_2026-08-27.md`;
- `docs/planning/KODAC_P3_R1_DETERMINISTIC_CONTEXT_SELECTION_PLAN_AUTHORIZATION_2026-08-29.md`;
- `docs/planning/KODAC_P3_R1_DETERMINISTIC_CONTEXT_SELECTION_PLAN_EVIDENCE_2026-08-29.md`;
- canonical K3-R5 context-engine contracts/source and K3-R6 relation-graph contracts/source.

If protected `main`, repository governance, or a more-specific canonical authority conflicts with this candidate before merge, this candidate is stale and must be reconciled forward. No rebase, force-push, destructive history rewrite, stale evidence reuse, governance bypass, or silent waiver is authorized.

## Exact authorization-candidate changed path

This authorization PR may change exactly one repository path:

```text
docs/planning/KODAC_P3_R2_DECLARED_CONTEXT_SELECTION_POLICY_AUTHORIZATION_2026-08-29.md
```

No source, test, workflow, dependency, lockfile, roadmap, product-status, benchmark fixture, provider/model, persistence, telemetry, package, release, ruleset, or historical authorization/evidence path is in this candidate allowlist.

## Why P3-R2 is policy application instead of another context engine

Canonical K3-R5 already owns an executable deterministic context-bundle strategy:

```text
K3_R5_SELECTION_STRATEGY_ID = kodac.context.lexical-evidence-v1
```

K3-R5 materializes context text, computes relevance scores/reasons, orders candidates, applies budgets, and emits a bounded context bundle. It must not be duplicated or silently replaced by P3-R2.

Canonical P3-R1 deliberately established a different boundary. It validates and identity-binds caller-materialized candidate evidence into an immutable context-selection plan with descriptive lanes, grouping keys, provenance, budget facts, completeness, abstention, and optional already-materialized K3-R6 relation evidence. P3-R1 intentionally does not contain a quality ranking or selection policy.

P3-R2 therefore adds only the smallest missing pure boundary between a validated P3-R1 plan and a deterministic selected/omitted plan realization:

```text
VALIDATED P3-R1 PLAN
+ EXPLICIT CALLER-DECLARED POLICY
-> STRICT PLAN / POLICY BINDING
-> DETERMINISTIC DECLARED ORDER
-> EXPLICIT GROUP CAP
-> EXPLICIT ITEM / BYTE BUDGET APPLICATION
-> SELECTED + OMITTED EVIDENCE WITH REASONS
-> IMMUTABLE APPLICATION IDENTITY
```

P3-R2 does not choose a repository-owned winning policy. It does not claim that one lane order, group cap, budget, or resulting selection is better than another. Any such claim or promotion requires later reproducible benchmark evidence under ADR-0010 and separate canonical authority.

## P3-R2 objective

Implement one pure deterministic **declared context selection policy application** module over canonical P3-R1 plans.

The module must:

1. accept an untrusted serialized/caller-materialized P3-R1 plan and independently revalidate its exact version, structure, identities, canonical ordering, candidate semantics, relation-evidence bindings, budget facts, completeness, abstention, and plan identity before policy application;
2. accept an exact-key versioned caller-declared policy bound to that one exact P3-R1 plan and its repository/snapshot/content/task identities;
3. require an explicit complete permutation of the six canonical P3-R1 evidence lanes with no default or inferred lane priority;
4. require explicit selected-item and selected-UTF-8-byte budgets bounded by, and never greater than, the corresponding P3-R1 plan budgets;
5. require an explicit positive `maxPerGroupingKey` bounded by the selected-item budget;
6. derive one deterministic total candidate order from caller-declared lane priority followed only by a canonical non-quality tie-break;
7. apply group, item, and byte constraints deterministically without mutating or acquiring source evidence;
8. preserve the complete selected candidate evidence records;
9. preserve the complete omitted candidate evidence records plus one explicit closed-vocabulary omission reason per omission;
10. preserve P3-R1 relation-evidence bindings, source completeness, source abstention, provenance, evidence class, lanes, grouping keys, reasons, and source identities without trust upgrading;
11. derive canonical policy and application identities from semantic inputs only;
12. return deeply immutable/frozen result structures;
13. remain stable under semantically irrelevant caller object-property insertion order;
14. fail closed on malformed, hostile, non-canonical, unknown-field, identity-inconsistent, cross-plan, cross-snapshot, cross-content, duplicate-conflicting, Proxy/accessor/symbol/sparse/cyclic/non-plain, or unsupported input;
15. perform zero repository acquisition, K3 execution, graph execution, provider/model execution, persistence, telemetry, network, subprocess, training, or external side effects.

## Closed P3-R2 policy vocabulary

P3-R2 policy semantics are intentionally narrow and fully declared by the caller.

A valid policy must carry semantic equivalents of:

```text
version = p3-r2-declared-context-selection-policy-v1
kind = apply_declared_context_selection_policy
policy_id = bounded caller-declared stable identifier
plan_identity = exact validated P3-R1 plan identity
repository_identity = exact P3-R1 repository identity
snapshot_identity = exact P3-R1 snapshot identity
content_identity = exact P3-R1 content identity
task_identity = exact P3-R1 task identity
lane_priority = exact permutation of all six P3-R1 lanes
max_selected_items = explicit positive integer <= P3-R1 plan maxItems
max_selected_utf8_bytes = explicit positive integer <= P3-R1 plan maxUtf8Bytes
max_per_grouping_key = explicit positive integer <= max_selected_items
```

The six lane values are exactly:

```text
explicit-target
structural-symbol
relation-impact
working-tree
architecture-spec
lexical-fallback
```

`lane_priority` is semantic input. Changing it changes the policy identity and may change the deterministic result. The repository must not supply a hidden or default permutation when the caller omits or corrupts this field.

No additional lane, wildcard lane, score, numeric weight, threshold, learned coefficient, provider/model score, quality label, or implicit preference is authorized.

## Deterministic order semantics

After independent validation of the P3-R1 plan and declared policy, candidate order is determined only by:

1. the caller-declared `lane_priority` position; then
2. lowercase canonical P3-R1 `candidateIdentity` lexical order as a stable serialization/selection tie-break inside a lane.

The candidate-identity tie-break is not a quality signal and must not be described as relevance, confidence, preference, correctness, superiority, utility, reward, or score.

P3-R2 must not inspect candidate text because P3-R1 candidates do not authorize or require text acquisition. It must not compute lexical overlap, graph centrality, structural importance, model scores, learned relevance, historical success, provider feedback, or any other new ranking feature.

## Deterministic selection and omission semantics

Traverse candidates in the declared deterministic order. For each candidate, apply the following closed precedence:

```text
1. GROUP CAP
2. ITEM BUDGET
3. UTF-8 BYTE BUDGET
4. SELECT
```

A candidate is omitted with exactly one of these reasons:

```text
group-cap
item-budget
byte-budget
```

Rules:

- if the candidate's `groupingKey` already has `maxPerGroupingKey` selected candidates, omit it as `group-cap`;
- else if `maxSelectedItems` selected candidates already exist, omit it as `item-budget`;
- else if selecting the candidate would make selected UTF-8 bytes exceed `maxSelectedUtf8Bytes`, omit it as `byte-budget`;
- else select it, increment the selected item/byte counters, and increment that grouping-key count;
- evaluation continues after a `byte-budget` omission so a later smaller candidate may still fit under the declared order and remaining byte budget;
- no candidate is silently dropped, truncated, rewritten, merged, or replaced;
- selected and omitted sets together must account for every validated P3-R1 candidate exactly once.

The implementation may use a different internal function decomposition, but it may not alter these semantics without a new canonical authorization.

## Result-state semantics

The application result must distinguish at least:

```text
selected-all-candidates
selected-subset
budget-constrained-empty
insufficient-evidence
```

Required meaning:

- `insufficient-evidence`: the validated P3-R1 plan itself abstains for insufficient evidence; P3-R2 preserves that abstention and must not invent a selection;
- `budget-constrained-empty`: admissible P3-R1 candidates exist, but none fit the explicit caller-declared policy/budget constraints;
- `selected-subset`: at least one candidate is selected and at least one candidate is explicitly omitted;
- `selected-all-candidates`: every validated P3-R1 candidate is selected.

P3-R1 source completeness and abstention metadata remain separate immutable fields in the P3-R2 result. P3-R2 must never relabel incomplete source evidence as complete merely because policy application itself was deterministic.

## Required P3-R2 output boundary

The result must preserve semantic equivalents of at least:

```text
result version / kind
application identity
policy identity
caller policy id
P3-R1 plan identity
P3-R1 request identity
P3-R1 candidate-set identity
repository identity
snapshot identity
content identity
task identity
result state
exact declared lane priority
max selected items
max selected UTF-8 bytes
max per grouping key
used selected items
used selected UTF-8 bytes
selected candidates in deterministic policy order
omitted candidates in deterministic policy order
one closed omission reason per omitted candidate
source plan state
source completeness
source abstention
preserved P3-R1 relation-evidence bindings
```

Selected and omitted records must preserve the complete normalized P3-R1 candidate fields, including candidate identity, lane, source kind, source identity, evidence class, subject path, UTF-8 bytes, grouping key, plan reasons, provenance references, repository/snapshot/content identities, and optional relation-result identity.

Unknown policy/result fields must not be silently accepted into canonical semantic inputs. Identity material must not depend on wall-clock time, local absolute paths, environment variables, process state, locale, filesystem state, network state, provider state, random values, object insertion order, or mutable caller aliases.

## Canonical identity semantics

P3-R2 must derive at least:

```text
policyIdentity = SHA-256(canonical normalized policy semantic projection)
applicationIdentity = SHA-256(canonical validated plan binding + policy identity + result semantic projection)
```

The exact projection must be explicit in implementation and tests and must exclude the identity field being derived from its own input.

Candidate arrays in selected/omitted output are semantically ordered by the declared policy application and therefore must not be independently re-sorted after selection. Object-property insertion order remains non-semantic and must canonicalize deterministically.

## Existing K3 and P3-R1 bytes are immutable inputs

The later P3-R2 implementation must consume existing canonical contracts without modifying them for convenience.

```text
K3-R5 CONTEXT ENGINE SOURCE / CONTRACT MUTATION = NO
K3-R6 RELATION GRAPH SOURCE / CONTRACT MUTATION = NO
P3-R1 SOURCE / CONTRACT / TEST / EVIDENCE MUTATION = NO
NEW REPOSITORY SCANNER = NO
NEW CONTEXT TEXT ACQUISITION = NO
NEW RELATION GRAPH = NO
NEW AST-GREP EXECUTION = NO
```

If implementation discovers that an existing K3/P3-R1 contract must change, stop. A separate explicit authorization is required before any such mutation.

## Authorized implementation allowlist

After and only after this authorization becomes canonical and post-merge proven, exactly one P3-R2 implementation PR may modify only these four paths:

```text
packages/kodac-runtime/src/context-selection-policy/contracts.ts
packages/kodac-runtime/src/context-selection-policy/context-selection-policy.ts
packages/kodac-runtime/test/p3-r2-context-selection-policy.test.ts
docs/planning/KODAC_P3_R2_DECLARED_CONTEXT_SELECTION_POLICY_EVIDENCE_2026-08-29.md
```

The source paths must be a new standalone pure module. The test path is its focused qualification surface. The evidence path records candidate-time implementation evidence and exact qualification anchors without fabricating future merge facts.

No export barrel, package manifest, CLI, agent loop, product surface, workflow, dependency, lockfile, fixture, benchmark corpus, roadmap, product status, provider/model configuration, persistence, telemetry, release, ruleset, K3 source/test, P3-R1 source/test/evidence, or fifth implementation path is authorized.

If implementation needs a fifth path, stop. A separate authorization is required.

## Purity and side-effect invariants

P3-R2 implementation logic must remain:

```text
DETERMINISTIC = YES
PURE / IN-MEMORY = YES
SIDE EFFECTS = 0
NETWORK = 0
FILESYSTEM ACQUISITION = 0
REPOSITORY CRAWLING / INDEXING = 0
SUBPROCESS / SANDBOX EXECUTION = 0
K3-R5 CONTEXT ENGINE EXECUTION = 0
RELATION-GRAPH CONSTRUCTION / EXECUTION = 0
AST-GREP EXECUTION = 0
PROVIDER / MODEL / LLM / REVIEWER / EVALUATOR EXECUTION = 0
PERSISTENCE / DATABASE / FILE OUTPUT = 0
TELEMETRY / UPLOAD / ANALYTICS = 0
TRAINING / FINE-TUNING / ONLINE LEARNING = 0
CROSS-REPOSITORY RETRIEVAL / LEARNING = 0
NEW DEPENDENCIES = 0
DONOR CODE / DATA INTAKE = 0
```

Ordinary repository test-runner and CI behavior already present in canonical tooling is not new P3 authority. P3-R2 logic itself must not read the repository, environment, clock, network, process metadata, providers, models, or external services.

## Explicit non-grants

This authorization does not grant:

- P3-R3 or any later P3 implementation;
- a repository-owned default context policy;
- automatic policy choice, promotion, mutation, optimization, learning, or adaptation;
- numeric relevance/quality weights, blended scores, hidden ranking features, thresholds, confidence scores, rewards, utility functions, or model-scored reranking;
- any claim that one lane order, budget, grouping cap, policy, or result is better than another;
- benchmark execution, benchmark-result generation, strategy comparison, promotion, winner, `best`, `superior`, SOTA, or quality-improvement claims;
- embeddings, vector databases, ANN indexes, learned rerankers, classifiers, or semantic-model retrieval;
- LLM/model/provider/reviewer/evaluator/tool/agent invocation;
- K3-R5 context-engine invocation from P3-R2;
- repository crawling, scanning, indexing, file reads, history reads, context-text acquisition, or new filesystem acquisition;
- ast-grep execution or new structural acquisition;
- relation-graph construction or query execution;
- network, secrets, sandbox, subprocess, or external-service authority;
- persistence, database, telemetry, upload, analytics, training, fine-tuning, online learning, or repository-local experience retrieval;
- cross-repository retrieval, aggregation, learning, or policy transfer;
- new npm/Rust/Python/system/GitHub Action/other dependencies;
- donor intake or donor replacement;
- CLI, API, product, agent-loop, reviewer, gateway, routing, fallback, retry, autofix, or release integration;
- K3-R5, K3-R6, or P3-R1 mutation;
- K2, K5, Done Gate, or `PROVEN_READY` authority expansion;
- general/public KodacBench completion or P2-R6+ implementation;
- P4-P8 implementation;
- public package publication, release, version declaration, production-readiness, security, compatibility, support, or brand-launch claims;
- GitHub review/comment/approval/write/merge authority from P3 evidence;
- ruleset mutation or bypass.

## Required P3-R2 tests

The implementation PR must include focused tests proving at least:

1. a canonical P3-R1 plan is independently revalidated before policy application rather than trusted by TypeScript shape alone;
2. malformed P3-R1 plan version/kind/request/candidate-set/plan identities fail closed;
3. tampered candidate fields, candidate order, budget facts, relation bindings, completeness, or abstention that no longer match the P3-R1 identity contract fail closed;
4. the policy must bind exactly the validated plan identity plus repository/snapshot/content/task identities;
5. cross-plan, cross-repository, cross-snapshot, cross-content, and cross-task policy binding fails closed;
6. `lanePriority` contains exactly all six authorized lanes once each; duplicates, omissions, extras, unknown lanes, and malformed arrays fail closed;
7. there is no default lane priority when the caller omits or corrupts the field;
8. changing caller-declared lane priority changes policy identity and deterministically changes order where lane membership makes the change observable;
9. within one lane, canonical candidate-identity lexical order is deterministic and is never represented as a quality score;
10. `maxSelectedItems`, `maxSelectedUtf8Bytes`, and `maxPerGroupingKey` are explicit positive safe integers within authorized hard bounds and within the source-plan budgets;
11. caller policy cannot expand P3-R1 item or byte authority;
12. grouping-cap omission is deterministic and uses `group-cap`;
13. item-budget omission is deterministic and uses `item-budget`;
14. byte-budget omission is deterministic and uses `byte-budget`;
15. omission-reason precedence is exactly group cap, then item budget, then byte budget;
16. evaluation continues after a byte-budget omission and may select a later smaller candidate if it fits;
17. every source candidate appears exactly once across selected plus omitted output;
18. selected and omitted records preserve full normalized candidate evidence, provenance, evidence class, lane, grouping key, plan reasons, and relation-result identity without trust upgrading;
19. supplied P3-R1 relation-evidence bindings are preserved exactly and are not executed or expanded;
20. incomplete P3-R1 source completeness remains incomplete in the result;
21. P3-R1 `insufficient-evidence` abstention produces P3-R2 `insufficient-evidence` with no invented candidate;
22. admissible candidates that all fail explicit budget constraints produce `budget-constrained-empty`, not `insufficient-evidence`;
23. selecting all candidates produces `selected-all-candidates`;
24. selecting a strict non-empty subset produces `selected-subset`;
25. identical semantic inputs produce identical policy and application identities;
26. semantically irrelevant object-property insertion order does not change identities;
27. policy/result identity projections exclude their own derived identity fields and reject tampering;
28. sparse arrays, accessors/getters, symbol fields, Proxy objects, cycles, non-plain objects, unknown fields, unsupported versions, malformed strings, unsafe paths, non-finite numbers, and resource-bound violations fail closed before unsafe evaluation;
29. returned nested policy/result/candidate/omission/relation structures are deeply frozen and detached from later caller mutation;
30. no quality score, weight, threshold, winner, superiority verdict, automatic policy choice, or promotion state is materialized;
31. no filesystem, repository acquisition, K3 execution, relation traversal, ast-grep execution, network, subprocess, provider/model, persistence, telemetry, training, or external side effect occurs;
32. focused tests pass on all repository-supported CI platforms exercised by the existing K2 runtime gate;
33. existing repository-required CI remains green.

Tests must use in-memory/repository-authored data encoded inside the one authorized test file or immutable already-canonical contract values that require no new fixture path and no network access.

## Required implementation evidence record

The later P3-R2 implementation PR must create exactly this evidence path within its four-path allowlist:

```text
docs/planning/KODAC_P3_R2_DECLARED_CONTEXT_SELECTION_POLICY_EVIDENCE_2026-08-29.md
```

The evidence record must bind at least:

- canonical P3-R2 authorization merge identity and authorization-document blob;
- implementation base SHA/tree and exact candidate head/tree;
- exact four-path implementation allowlist realization and final blobs;
- canonical P3-R1 source/input identities consumed without mutation;
- focused test command(s) and exact results;
- exact required CI workflow/check identities;
- applicable K2 runtime machine qualification across supported matrices;
- two distinct independent external substantive terminal-clean exact-head semantic reviewer channels;
- zero unresolved actionable material findings/threads;
- active ruleset/no-bypass evidence;
- preserved purity/non-grants and exact absence of K3/P3-R1 mutation;
- forward-only repair history for any material defect found before merge;
- guarded normal merge conditions;
- post-merge protected-main/ordered-parent/tree/blob/signature/applicable-check/ruleset proof before P3-R2 may be called canonical or complete.

Candidate-time evidence must not claim a future merge result as fact. If the evidence file is materialized after implementation/test qualification, every earlier exact-head run or review becomes pre-final evidence and the final evidence-bearing head must be independently requalified before merge.

## Authorization-candidate qualification gate

This one-path authorization candidate may merge only when one frozen exact head proves all of the following:

1. protected `main` remains `f0b18b3d6be10818195e2aef9f3d4123a2b9d3a2` or this candidate is reconciled forward without destructive history rewriting;
2. `behind_by=0`;
3. changed-file set is exactly the one authorization path and no rename/copy source is present;
4. no runtime source, test, workflow, dependency, lockfile, fixture, roadmap, status, package, release, provider/model, persistence, telemetry, or ruleset change is present;
5. exact final candidate head, tree, and authorization-document blob are captured;
6. required exact-head repository CI is terminal success, including required `provenance`, `legacy-tests`, and `k2-runtime-gate` contexts as applicable to the pull-request event;
7. at least two distinct independent external semantic reviewer channels each provide a substantive terminal-clean assessment on the exact final head under the canonical provider-neutral review evidence contract;
8. rate-limit, billing, skipped-review, outage, status-only, summary-only, self-review, stale-head, or duplicate-channel output does not count toward the two-channel quorum;
9. unresolved material correctness/security/governance/authority/evidence/scope findings = 0;
10. unresolved actionable review threads = 0;
11. PR is open, non-draft, mergeable, and not behind protected `main`;
12. ruleset `20707483` remains active with required thread resolution and status contexts `provenance`, `legacy-tests`, and `k2-runtime-gate`;
13. ruleset bypass actors remain empty and the current user cannot bypass;
14. `WAIVER=NO`;
15. merge is a normal history-preserving guarded merge using the exact qualified `expected_head_sha`;
16. no force-push, rebase, destructive history rewrite, stale-head evidence reuse, governance bypass, or silent waiver occurs.

Any candidate head change invalidates exact-head CI/review qualification and requires fresh qualification on the new head.

## Mandatory authorization post-merge proof

P3-R2 implementation authority becomes effective only after all of the following are proven for the authorization merge:

1. protected `main` equals the authorization merge SHA;
2. ordered merge parent 1 equals the exact pre-merge canonical `main`;
3. ordered merge parent 2 equals the exact qualified authorization candidate head;
4. merge tree equals the qualified authorization candidate tree;
5. the canonical authorization-document blob equals the qualified candidate blob;
6. GitHub merge verification/signature is valid where supplied;
7. applicable post-merge Governance checks are terminal success;
8. absence of a path-filtered K2 push workflow is recorded only as proven non-applicability, never relabeled as success;
9. ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never`;
10. PR is merged/closed and no material post-merge finding invalidates the authority;
11. `WAIVER=NO`.

Only then may repository work state:

```text
P3-R2 DECLARED CONTEXT SELECTION POLICY APPLICATION = AUTHORIZED / NOT YET CLOSED_CANONICAL
```

That statement authorizes only the exact four implementation paths and semantics in this record. It does not authorize P3-R3+, P4-P8, product integration, benchmark claims, policy promotion, or release.

## P3-R2 completion boundary

The later implementation may be called `CLOSED_CANONICAL` only after its exact authorized implementation candidate independently satisfies:

- exact four-path allowlist;
- exact-head Governance and K2 runtime qualification with the runtime matrix applicable to its source/test changes;
- exact focused tests and full repository-required tests;
- two distinct independent external substantive semantic reviewer channels terminal-clean on the same exact final head;
- zero unresolved material findings/actionable threads;
- exact head/tree/four final blobs;
- active no-bypass ruleset;
- guarded normal merge using exact expected head;
- post-merge protected-main/ordered-parent/tree/four-blob/signature/Governance/K2/ruleset proof;
- no stale evidence reuse and `WAIVER=NO`.

Even successful P3-R2 closure establishes only a deterministic declared-policy application primitive. It does not establish that any declared policy improves context quality.

## Next-stage boundary

No P3-R3 implementation is authorized by this record.

After and only after P3-R2 implementation becomes canonically closed and current roadmap/status views are reconciled, the next P3 unit must be separately defined and authorized from live repository truth. Any later repository-owned strategy comparison, policy promotion, or context-quality improvement claim must be benchmark-backed under ADR-0010 before it can become canonical.

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
