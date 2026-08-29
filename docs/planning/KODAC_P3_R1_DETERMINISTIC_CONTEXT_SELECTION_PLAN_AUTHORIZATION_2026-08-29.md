# Kodac P3-R1 Deterministic Context Selection Plan Foundation Authorization — 2026-08-29

## Status

```text
DOCUMENT TYPE: FOUNDER-AUTHORIZED IMPLEMENTATION GATE CANDIDATE
P2 BOUNDED R1-R5 ENGINEERING SCOPE: CLOSED_CANONICAL
P3-R1 IMPLEMENTATION: AUTHORIZED ONLY AFTER THIS RECORD IS CANONICAL AND POST-MERGE PROVEN
P3-R2+: NOT AUTHORIZED
P4-P8: NOT AUTHORIZED
GENERAL / PUBLIC KODACBENCH: NOT CLOSED
PUBLIC SUPERIORITY / WINNER CLAIMS: NOT AUTHORIZED
WAIVER: NO
```

This record is deny-by-default. It creates no effective P3 implementation authority while it is only a branch or pull-request candidate. The exact P3-R1 implementation authority below becomes effective only after this exact authorization unit qualifies on one frozen head, merges normally into protected `main`, and completes the mandatory post-merge proof in this record.

## Exact canonical baseline

This candidate was prepared from protected canonical `main`:

```text
CANONICAL_MAIN = 0e48553f00618706955b11db795643ee710fe04a
CANONICAL_TREE = 854555e552be7769ab06fb8a57ab19dec0a4e103
P2_CLOSEOUT_PR = #250
P2_CLOSEOUT_QUALIFIED_HEAD = 00c44d9ffbbc4b5ba1fadf213c3c2f56a05c5b6f
P2_CLOSEOUT_MERGE = 0e48553f00618706955b11db795643ee710fe04a
P2_CLOSEOUT_TREE = 854555e552be7769ab06fb8a57ab19dec0a4e103
P2_CLOSEOUT_POST_MERGE_GOVERNANCE = 33234873791 / SUCCESS
RULESET = 20707483 / Kodac canonical main protection v1 / active
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
WAIVER = NO
```

The P2 closeout establishes only the bounded deterministic R1-R5 engineering measurement/evidence spine. It does not close general/public KodacBench and does not itself authorize P3 implementation.

Governing sources include:

- `AGENTS.md`;
- `docs/roadmap/NEXT.md`;
- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`;
- `docs/adr/ADR-0010-benchmark-first-donor-selection.md`;
- `docs/planning/KODAC_REVIEW_PROVIDER_NEUTRALITY_AND_EVIDENCE_QUORUM_AMENDMENT_2026-08-27.md`;
- `docs/planning/KODAC_P2_BOUNDED_R1_R5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`;
- the canonical K3-R5 context-engine and K3-R6 relation-graph contracts and tests.

If protected `main`, repository governance, or a more-specific canonical authority conflicts with this candidate before merge, this candidate is stale and must be reconciled forward. No rebase, force-push, destructive history rewrite, stale evidence reuse, or silent waiver is authorized.

## Exact authorization-candidate changed path

This authorization PR may change exactly one repository path:

```text
docs/planning/KODAC_P3_R1_DETERMINISTIC_CONTEXT_SELECTION_PLAN_AUTHORIZATION_2026-08-29.md
```

No source, test, workflow, dependency, lockfile, roadmap, product-status, benchmark fixture, provider/model, persistence, telemetry, package, release, ruleset, or historical authorization/evidence path is in this candidate allowlist.

## Why P3-R1 is a foundation instead of a replacement K3

Canonical K3 already contains a substantial repository-intelligence base.

K3-R5 already provides a deterministic bounded `ContextBundle` contract and implementation with repository/snapshot/content identity binding, provenance, evidence classes, relevance reasons, stable ordering, item/byte budgets, completeness metadata, K3-R2 snapshot validation, K3-R4 structural-result validation, and the existing strategy identity:

```text
kodac.context.lexical-evidence-v1
```

K3-R6 already provides a deterministic relation graph and bounded `impact` / `related_files` query result contract with repository/snapshot/content/graph/query identities, relation evidence, provenance chains, completeness, deterministic identities, and fail-closed validation.

Therefore P3-R1 must not create another repository scanner, another relation graph, another K3 context engine, or another acquisition/execution path. P3-R1 is only a new pure planning boundary over caller-materialized evidence.

## P3-R1 objective

Implement the smallest deterministic **context selection plan foundation** that can normalize and bind caller-materialized candidate evidence into one immutable, canonical, budget-aware plan without claiming that any new ranking policy is better.

P3-R1 establishes the contract and validation surface required for later benchmark-backed ranking experiments. It deliberately separates evidence normalization and plan identity from later ranking/selection policy.

Required bounded capabilities:

1. validate a versioned caller-materialized selection-plan request and candidate set;
2. bind every candidate and output to one repository identity, snapshot identity, and content identity;
3. preserve evidence class, source identity, source kind, subject path, provenance references, and caller-declared evidence lane;
4. optionally validate and admit already-materialized K3-R6 `RelationGraphQueryResult` evidence supplied by the caller without executing a graph query;
5. represent explicit evidence lanes for `explicit-target`, `structural-symbol`, `relation-impact`, `working-tree`, `architecture-spec`, and `lexical-fallback`;
6. represent deterministic item and UTF-8 byte budgets without inventing an unmeasured ranking policy;
7. represent deterministic redundancy/grouping keys so later policies can reason about duplicate or overlapping candidates without erasing source evidence;
8. represent explicit deterministic selection-plan reasons and preserved provenance;
9. represent completeness, omitted-at-least counts, and omission reasons;
10. represent an explicit `insufficient-evidence` abstention state when no admissible candidate evidence remains;
11. derive canonical request, candidate-set, and plan identities from semantic inputs only;
12. return deeply immutable/frozen structures consistent with existing K3 conventions;
13. remain stable under semantically irrelevant caller object-property insertion order and input-array ordering where the contract defines order as non-semantic;
14. fail closed on malformed, non-canonical, unknown-field, identity-inconsistent, cross-snapshot, duplicate-conflicting, accessor/proxy/hostile, or untrusted structural input.

P3-R1 may define canonical deterministic ordering for normalized plan material solely to make identities and serialization stable. That ordering must not be described as quality ranking, preference, winner selection, or promotion.

## Required P3-R1 contract boundary

The implementation must expose an explicit versioned contract for a caller-materialized plan request and result. Exact TypeScript names may be chosen during implementation, but the semantic boundary must preserve at least:

```text
request version / kind
request identity
task identity
repository identity
snapshot identity
content identity
candidate-set identity
plan identity
candidate evidence lane
candidate source kind
candidate source identity
candidate evidence class
candidate subject path
candidate provenance refs
candidate UTF-8 byte size
candidate deterministic grouping/redundancy key
candidate plan reasons
item budget
UTF-8 byte budget
completeness state
completeness reasons
omitted-at-least
abstention state
optional supplied K3-R6 relation-result identity bindings
```

Unknown fields must not be silently accepted into canonical inputs. Identity material must not depend on wall-clock time, local absolute paths, object insertion order, process state, locale, network state, provider state, or random values.

## Evidence-lane semantics

P3-R1 lanes are descriptive evidence classes for later policy design, not ranking weights:

```text
explicit-target
structural-symbol
relation-impact
working-tree
architecture-spec
lexical-fallback
```

A candidate may carry only contract-valid lane metadata. Lane membership must not mutate or upgrade the underlying evidence class. `heuristic-inference` does not become `precise-static` because it is placed in an architecture lane. Relation evidence does not become authoritative merely because a K3-R6 query reached it.

P3-R1 must not embed numeric quality weights, learned parameters, hidden tie-break preferences presented as quality, or a universal score.

## Optional K3-R6 relation evidence

P3-R1 may accept caller-supplied serialized K3-R6 relation-query results only when they are fully validated against the same repository/snapshot/content binding as the P3-R1 request.

It may:

- preserve result/query/graph identities;
- materialize deterministic descriptive plan evidence from validated hits;
- preserve completeness and omitted evidence;
- preserve relation chains and source identities required for provenance.

It may not:

- construct a relation graph;
- execute `queryRelationGraph` or any equivalent graph traversal;
- acquire new repository evidence;
- infer missing graph evidence;
- silently treat incomplete relation results as complete.

## Authorized implementation allowlist

After and only after this authorization becomes canonical and post-merge proven, exactly one P3-R1 implementation PR may modify only these four paths:

```text
packages/kodac-runtime/src/context-selection-plan/contracts.ts
packages/kodac-runtime/src/context-selection-plan/context-selection-plan.ts
packages/kodac-runtime/test/p3-r1-context-selection-plan.test.ts
docs/planning/KODAC_P3_R1_DETERMINISTIC_CONTEXT_SELECTION_PLAN_EVIDENCE_2026-08-29.md
```

The two source paths are a new standalone pure module. The test path is its focused qualification surface. The evidence path records exact qualification and post-merge facts.

No existing K3-R5 or K3-R6 source/test path may be modified for convenience. No package manifest, export barrel, CLI, application integration, workflow, dependency, fixture, lockfile, persistence, telemetry, release, roadmap, status, ruleset, or other path is authorized in the P3-R1 implementation PR.

If implementation needs a fifth path or a modification to an existing K3 contract, stop. A separate authorization is required.

## Purity and side-effect invariants

P3-R1 implementation logic must remain:

```text
DETERMINISTIC = YES
PURE / IN-MEMORY = YES
SIDE EFFECTS = 0
NETWORK = 0
FILESYSTEM ACQUISITION = 0
SUBPROCESS EXECUTION = 0
RELATION-GRAPH EXECUTION = 0
AST-GREP EXECUTION = 0
PROVIDER / MODEL / LLM EXECUTION = 0
PERSISTENCE / DATABASE = 0
TELEMETRY / UPLOAD / ANALYTICS = 0
TRAINING / ONLINE LEARNING = 0
NEW DEPENDENCIES = 0
DONOR CODE / DATA INTAKE = 0
```

Ordinary test-runner behavior already present in repository tooling is not new P3 authority. P3-R1 logic itself must not read the repository, environment, clock, network, process metadata, or external services.

## Explicit non-grants

This authorization does not grant:

- P3-R2 or later P3 implementation;
- a new context ranking algorithm or weighted ranking policy;
- any claim that P3-R1 improves K3-R5 quality;
- benchmark execution or benchmark result generation;
- embeddings, vector databases, ANN indexes, learned rerankers, classifiers, or model-scored retrieval;
- LLM/model/provider/reviewer/evaluator/tool/agent invocation;
- repository crawling, scanning, indexing, file reads, history reads, or new filesystem acquisition;
- ast-grep execution or new structural acquisition;
- relation-graph construction or query execution;
- network, secret, sandbox, or subprocess authority;
- persistence, database, telemetry, upload, analytics, training, fine-tuning, online learning, or repository-local experience retrieval;
- cross-repository retrieval, aggregation, or learning;
- new npm/Rust/Python/system/GitHub Action/other dependencies;
- donor intake or donor replacement;
- CLI, API, product, agent-loop, reviewer, gateway, routing, retry, autofix, or release integration;
- strategy promotion, automatic policy selection, trust mutation, or eligibility advancement;
- a universal score, threshold/tolerance/statistical significance rule, N-way ranking, leaderboard, winner, `best`, `superior`, SOTA, production-readiness, security, compatibility, or support claim;
- P2-R6+ implementation;
- P4-P8 implementation;
- K2, K5, Done Gate, or `PROVEN_READY` authority expansion;
- GitHub review/comment/approval/write/merge authority from P3 evidence;
- package publication, public release, public version declaration, or brand launch;
- ruleset mutation or bypass.

## Required P3-R1 tests

The implementation PR must include focused tests proving at least:

1. identical semantic inputs produce identical request, candidate-set, and plan identities;
2. semantically irrelevant object-property insertion order does not change canonical identities;
3. caller input ordering does not change identities where ordering is contract-declared non-semantic;
4. repository/snapshot/content identity mismatches fail closed;
5. cross-snapshot or cross-content candidate mixing fails closed;
6. malformed, unknown-field, unsupported-version, missing-required-field, sparse-array, symbol-field, accessor/getter, Proxy, cyclic, and non-plain structural inputs fail closed before unsafe evaluation;
7. duplicate-identical candidates canonicalize deterministically while duplicate-conflicting identities fail closed;
8. evidence class, source identity, source kind, subject path, lane, and provenance survive normalization without trust upgrading;
9. all six authorized evidence lanes are contract-valid and unknown lanes fail closed;
10. grouping/redundancy keys are deterministic and do not erase distinct evidence identities;
11. item/byte budgets validate deterministic bounded values and cannot overflow contract limits;
12. completeness and omitted-at-least semantics remain explicit and deterministic;
13. zero admissible evidence produces explicit `insufficient-evidence` rather than invented context;
14. validated K3-R6 relation results must bind the same repository/snapshot/content identities;
15. incomplete K3-R6 relation evidence remains distinguishable from complete evidence;
16. P3-R1 never executes relation traversal, repository acquisition, filesystem, network, subprocess, provider/model, persistence, telemetry, or learning behavior;
17. returned nested structures are deeply frozen/immutable;
18. no numeric ranking weight, universal score, winner, or superiority verdict is materialized by the foundation;
19. focused tests pass on all repository-supported CI platforms exercised by the existing K2 runtime gate;
20. existing repository-required CI remains green.

Tests must use in-memory/repository-authored fixtures encoded in the test file or already-canonical contract data that require no new fixture path and no network access.

## Required implementation evidence record

The P3-R1 implementation PR must create:

```text
docs/planning/KODAC_P3_R1_DETERMINISTIC_CONTEXT_SELECTION_PLAN_EVIDENCE_2026-08-29.md
```

The evidence record must bind at least:

- canonical authorization merge identity and authorization blob;
- implementation base SHA/tree and exact final candidate head/tree;
- exact four-path implementation allowlist realization and final blobs;
- focused test commands and exact results;
- exact required CI workflow/check identities;
- applicable trusted machine qualification evidence under existing repository workflows;
- two distinct independent substantive terminal-clean exact-head semantic reviewer channels;
- zero unresolved actionable findings/threads;
- active ruleset/no-bypass evidence;
- preserved purity/non-grants;
- guarded normal merge conditions;
- post-merge protected-main/ordered-parent/tree/blob/signature/applicable-check proof before P3-R1 may be called canonical or complete.

Candidate-time evidence must not claim a future merge result as fact.

## Authorization-candidate qualification gate

This one-path authorization candidate may merge only when one frozen exact head proves all of the following:

1. protected `main` remains the exact canonical base above or this candidate has been reconciled forward without destructive history rewriting;
2. `behind_by=0`;
3. changed-file set is exactly the one authorization path and no rename/copy source is present;
4. no runtime source, test, workflow, dependency, lockfile, fixture, roadmap, status, package, release, or ruleset change is present;
5. exact final candidate head, tree, and authorization-document blob are captured;
6. required exact-head repository CI is terminal success, including required `provenance`, `legacy-tests`, and `k2-runtime-gate` contexts as applicable to the PR event;
7. at least two distinct independent external semantic reviewer channels each provide a substantive terminal-clean assessment on the exact final head under the canonical provider-neutral review evidence contract;
8. rate-limit, billing, skipped-review, outage, status-only, summary-only, self-review, stale-head, or duplicate-channel output does not count toward the two-channel quorum;
9. unresolved material correctness/security/governance/authority/scope findings = 0;
10. unresolved actionable review threads = 0;
11. PR is open, non-draft, mergeable, and not behind protected `main`;
12. ruleset `20707483` remains active with required thread resolution and status contexts `provenance`, `legacy-tests`, and `k2-runtime-gate`;
13. ruleset bypass actors remain empty and the current user cannot bypass;
14. `WAIVER=NO`;
15. merge is a normal history-preserving guarded merge using the exact qualified `expected_head_sha`;
16. no force-push, rebase, destructive history rewrite, stale-head evidence reuse, governance bypass, or silent waiver occurs.

Any head change invalidates exact-head CI/review qualification and requires fresh qualification on the new head.

## Mandatory authorization post-merge proof

The four-path P3-R1 implementation authority becomes effective only after the authorization merge proves:

- protected `main` equals the authorization merge SHA;
- ordered merge parents are pre-merge canonical `main` followed by the exact qualified authorization candidate head;
- merge tree equals the qualified candidate tree;
- the authorization document blob on canonical `main` equals the qualified candidate blob;
- GitHub merge signature is `verified / valid`;
- applicable post-merge Governance checks succeed;
- K2 push applicability is determined from canonical workflow conditions and changed paths; non-applicable is recorded as non-applicable rather than relabeled green;
- ruleset `20707483` remains active with no bypass;
- PR is canonically merged;
- `WAIVER=NO`.

Only then:

```text
P3-R1 IMPLEMENTATION AUTHORITY = EFFECTIVE FOR THE EXACT FOUR-PATH ALLOWLIST
```

This does not itself implement or complete P3-R1.

## P3-R1 implementation qualification and closeout rule

The later implementation candidate must re-read canonical `main` and this exact authorization before mutation. It must use only the four authorized paths, qualify one frozen exact head with required machine evidence and two independent terminal-clean semantic reviewer channels, resolve all actionable findings forward, requalify after every head change, and use a guarded normal merge with the exact qualified head.

Only after mandatory post-merge main/parent/tree/blob/signature/check proof may repository evidence say:

```text
P3-R1 DETERMINISTIC CONTEXT SELECTION PLAN FOUNDATION = CLOSED_CANONICAL
```

That statement remains bounded and must preserve:

```text
NEW RANKING POLICY = NOT AUTHORIZED BY R1
BENCHMARK-BACKED QUALITY IMPROVEMENT = NOT ESTABLISHED BY R1
P3-R2+ = NOT AUTHORIZED
P4-P8 = NOT AUTHORIZED
WAIVER = NO
```

Roadmap/status reconciliation after canonical P3-R1 closure is documentation work only and must not silently create P3-R2 implementation authority. The next P3 slice, if justified, requires its own exact canonical authorization.

## Stop rules

Stop rather than improvise if:

- this authorization candidate needs a second path;
- the later implementation needs a fifth path;
- an existing K3-R5/K3-R6 byte must change;
- repository scanning, graph execution, ast-grep execution, filesystem acquisition, provider/model execution, network, subprocess, persistence, telemetry, learning, or a new dependency becomes necessary;
- a ranking weight, threshold, statistical rule, superiority claim, donor decision, promotion, product integration, release action, or P3-R2+ authority is required;
- canonical `main` or exact candidate head moves after qualification;
- required CI or independent review evidence is stale, missing, or failing;
- a material finding remains unresolved;
- merge would require rebase, force-push, destructive history rewrite, bypass, or waiver.

`DONE = evidence-backed completion` remains binding.

`WAIVER=NO`
