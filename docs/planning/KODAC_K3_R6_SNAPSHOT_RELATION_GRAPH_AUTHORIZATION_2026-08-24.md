# Kodac K3-R6 Snapshot Relation-Graph Authorization

## Record identity

- Date: 2026-08-24
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-24`
- Authority class: DOCUMENTATION / IMPLEMENTATION AUTHORIZATION
- Canonical base commit: `7157844c12e688143c86889bf4950e33c60d9028`
- Canonical base tree: `4f12e6b21355c01d091a5c031d82082d7c047976`
- Canonical donor-audit merge: `ccf08bbf007eae0794332c691838d5c96ce8f77b` (PR #131)
- Donor-audit source commit: `3137e42f74711730c3876cb8d5f227d0a2f01626`
- K3-R5 implementation merge: `708e822ffbb4440712296d499ceba79f5586adfc`

## Decision

Authorize K3-R6 as the first bounded implementation slice selected from the canonical code-graph donor differential audit:

```text
K3-R6 — IMMUTABLE SNAPSHOT-BOUND RELATION GRAPH
        + BOUNDED IMPACT QUERY
        + BOUNDED RELATED-FILES QUERY
        + KODAC-OWNED GOLD BENCHMARK
```

After canonical adoption of this authorization record:

```text
K3-R6 IMPLEMENTATION: AUTHORIZED WITHIN THE EXACT SURFACE BELOW
K3-R6 IMPLEMENTATION: NOT YET IMPLEMENTED / NOT YET CANONICAL
K3: NOT CLOSED
K3-R7+: NOT AUTHORIZED
```

This record is not the implementation and does not itself close K3.

## Canonical basis and founder reclassification

The founder authorization explicitly grants repo-local future-gate authority for `K3-R6+` and requires previously blocked roadmap items to be re-evaluated rather than left globally idle behind an independent operational lane.

The canonical PR #131 audit identifies the smallest high-value future K3 graph slice as an immutable, in-memory relation graph bound to one exact K3-R2 snapshot, with deterministic impact/related-file queries and no donor runtime intake. All named prerequisite commits above are ancestors of the canonical base.

K3-R6 therefore selects that bounded candidate. It does not select either audited donor as a dependency or permanent backend.

## Core trust invariant

```text
RELATION INPUT IS MATERIALIZED EVIDENCE, NOT REPOSITORY TRUTH.
GRAPH REACHABILITY IS ENGINEERING EVIDENCE, NOT CAUSAL PROOF.
K3-R6 CAN INFORM CONTEXT; IT CANNOT AUTHORIZE SIDE EFFECTS.
```

K2 remains the sole trusted side-effect execution authority. The Done Gate remains the sole current `PROVEN_READY` authority under accepted contracts.

## Authorized implementation shape

K3-R6 may implement a pure TypeScript contract and engine that:

1. accepts one exact current and complete K3-R2 `RepositorySnapshot`;
2. accepts bounded caller-materialized node and edge claims already bound to that snapshot/content identity;
3. validates and canonicalizes producer, provenance, evidence-class, entity, relation, resolution, and relation-site fields;
4. computes node, edge, producer-set, graph, query, and result identities deterministically;
5. produces one immutable in-memory graph for one snapshot;
6. performs bounded reverse impact traversal;
7. performs bounded related-file traversal;
8. returns one deterministic evidence chain per result without relabeling graph paths as causal proof;
9. reports depth/result/ambiguity truncation or exclusion explicitly;
10. uses the existing Kodac-owned K3-R1 fixture manifest as gold benchmark input without modifying that fixture.

Production K3-R6 receives materialized claims from its caller. It does not read repository source files, invoke a parser, execute a tool, or crawl the workspace.

## Authorized relation vocabulary

The first graph slice may recognize only:

```text
contains
imports
exports
defines
references
calls
inherits
implements
instantiates
```

`reads_from`, `writes_to`, `flows_to`, runtime-observed relations, and any other relation require a later gate.

Every edge must retain a canonical existing `RepositoryEvidenceClass` value plus a bounded producer identity, source evidence/result identity, provenance references, resolution state, and optional relation-site span.

No confidence number may promote evidence class or resolution state.

## Authorized entity and resolution scope

The first slice may represent only file and symbol entities with canonical workspace-relative paths and optional bounded symbol/qualified-name/source-span fields.

Resolution states are limited to:

```text
resolved
ambiguous
```

Ambiguous edges remain visible as excluded/incomplete evidence and must not be traversed as resolved impact truth.

## Snapshot, freshness, and identity requirements

The engine must fail closed unless:

- the snapshot uses the canonical K3-R2 contract and identity schemes;
- repository, content, and snapshot identities are valid lowercase SHA-256 identities;
- Git HEAD is a canonical full Git object ID;
- freshness is exactly `current`;
- completeness is exactly `complete` with no reasons or omissions;
- inventory and working-tree structures are canonical and identity-recomputable;
- every node and edge claim binds the same repository/content/snapshot identities;
- every producer reference resolves into the bounded producer set;
- every edge endpoint resolves to exactly one canonical node;
- caller-supplied input order cannot change any output identity or ordering.

No timestamp, random value, absolute path, database ID, machine identity, or insertion order may enter identity.

## Query semantics

### Impact

`impact` starts from one exact seed entity and traverses resolved edges in reverse dependency direction through an explicit allowed relation set. Results are ordered deterministically by depth, canonical path/entity identity, and evidence-chain identity.

### Related files

`related_files` traverses resolved relations in both directions, returns file entities only, excludes the seed file, and ranks deterministically by shortest depth followed by canonical path and evidence-chain identity.

Both queries must:

- carry exact graph/repository/snapshot/content identities;
- carry exact query/result identities;
- enforce strict depth and result budgets;
- remain cycle-safe;
- expose deterministic evidence chains;
- make result-budget, depth-bound, or ambiguous-edge incompleteness explicit;
- reject unsupported relation/evidence/entity values and hidden fields.

K3-R6 does not authorize `related_tests` as a production query. The K3-R1 test relation may be used only as benchmark truth until a later gate proves test-relation production semantics.

## Required hard bounds

The implementation must publish fixed hard maxima no greater than:

```text
producers: 64
nodes: 4,096
edges: 16,384
provenance refs per record: 64
UTF-8 bytes per bounded string: field-specific and <= 1,024
query max depth: 16
query max results: 1,024
evidence-chain edges per hit: 16
```

Limit-plus-one cases must fail closed or produce explicitly bounded/truncated query results according to the published contract. No unbounded recursion is permitted.

## Authorized implementation paths

The K3-R6 implementation PR may change exactly:

```text
.github/workflows/k3-r6-relation-graph.yml
schema/k3-r6-relation-graph.schema.json
packages/kodac-runtime/src/relation-graph/contracts.ts
packages/kodac-runtime/src/relation-graph/relation-graph.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k3-r6-relation-graph.test.ts
```

No other path is authorized without an explicit scope extension.

The workflow is authorized only as a read-only CI proof surface using the repository's existing pinned major-version Actions patterns. It must not use secrets, writes, artifact publication, external downloads beyond normal existing Node/toolchain setup, or a privileged runner.

## Published schema requirement

The JSON Schema must describe the produced graph and query-result envelopes, their exact versions, closed field sets, bounded arrays/strings/integers, relation vocabulary, entity vocabulary, evidence classes, resolution states, identity formats, and completeness reasons.

Tests must validate representative produced records against the published schema structure and prove runtime/schema parity for all enumerations and required fields without adding a schema-validation dependency.

## Required benchmark and tests

The implementation gate must prove at least:

1. exact K3-R2 current/complete snapshot validation and identity recomputation;
2. stale, partial, truncated, cross-snapshot, and identity-tampered inputs fail closed;
3. input reordering preserves node/edge/graph/query/result identities and ordering;
4. duplicate producer, node selector, node identity, edge identity, or relation claim fails closed;
5. missing producer or edge endpoint fails closed;
6. unknown fields, relation kinds, entity kinds, evidence classes, and resolution states fail closed at serialized boundaries;
7. one-hop and multi-hop reverse impact are exact;
8. cycles terminate deterministically without duplicate hits;
9. maximum depth and result bounds report explicit incompleteness;
10. related-file traversal is deterministic and excludes unrelated siblings;
11. every hit carries a deterministic evidence chain whose edges bind the graph;
12. ambiguous edges are not traversed and are reported as excluded/incomplete evidence;
13. source spans and provenance survive canonicalization;
14. the K3-R1 `src/math.ts`, `src/consumer.ts`, and `tests/math.test.ts` gold relations reproduce the expected impact/related-file sets;
15. name-only similarity never becomes a verified relation;
16. prompt-injection-shaped relation text remains inert bounded data;
17. producer/node/edge/query limit-plus-one cases are covered;
18. the published schema and runtime contract remain in parity;
19. production source imports only deterministic crypto plus local relation/repository contracts;
20. production source contains no filesystem, network, process, worker, dynamic module, model, timer, random, ExecutionGateway, repository-write, or persistence surface;
21. full runtime tests, strict TypeScript, Python tests, Ruff, provenance, and required CI remain green;
22. tests leave the checkout byte-identical.

## Dedicated CI gate

The implementation PR must add a dedicated reusable check named:

```text
k3-r6-relation-graph
```

For the canonical implementation branch `codex/k3-r6-snapshot-relation-graph`, the gate must attest the exact authorization base and six-path allowlist. After canonical adoption, it remains a reusable regression gate without permanently pinning unrelated later work to the historical base.

## Explicit non-grants

```text
DONOR SOURCE COPY OR PORT: NOT AUTHORIZED
DONOR DEPENDENCY OR BACKEND: NOT AUTHORIZED
NEW KODAC DEPENDENCIES: NOT AUTHORIZED
SOURCE-FILE CRAWLING OR ARBITRARY REPOSITORY READS: NOT AUTHORIZED
TREE-SITTER / SCIP / LSP / ADDITIONAL AST-GREP INTAKE: NOT AUTHORIZED

PERSISTENT GRAPH OR CACHE: NOT AUTHORIZED
DATABASE / WATCHER / FILE WRITE: NOT AUTHORIZED
VECTOR / EMBEDDING / SEMANTIC SEARCH: NOT AUTHORIZED
MODEL CALL OR MODEL-DERIVED EDGE: NOT AUTHORIZED
RUNTIME TRACING OR REPOSITORY-CODE EXECUTION: NOT AUTHORIZED
READS_FROM / WRITES_TO / FLOWS_TO RELATIONS: NOT AUTHORIZED
PRODUCTION RELATED_TESTS QUERY: NOT AUTHORIZED

MCP / ACP / AGENT SKILLS IMPLEMENTATION: NOT AUTHORIZED
AUTOFIX / REPOSITORY MUTATION AUTHORITY: NOT AUTHORIZED
K2 EXECUTION-AUTHORITY EXPANSION: NOT AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY: NOT AUTHORIZED
APPROVAL / REVIEW / MERGE AUTHORITY FROM K3-R6: NOT AUTHORIZED

K3 CLOSEOUT BY THIS AUTHORIZATION: NOT AUTHORIZED
K3-R7+: NOT AUTHORIZED
KRI / K4 / K5 / K6 / K7 AUTHORITY CHANGE: NOT AUTHORIZED
RULESET CHANGE: NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH: NOT AUTHORIZED
```

PR #163, all Z0-family work, zrok, paid review/provider spend, secrets, GitHub Apps, webhooks, and trust-root changes are outside this gate and untouched.

## Local candidate validation

The complete repository validation set passed on the five-document authorization candidate:

| Check | Result |
| --- | --- |
| named prerequisite and donor-audit ancestry | PASS |
| `npm test --prefix packages/kodac-runtime` | PASS — 826 tests; 724 passed; 102 intentionally skipped; 0 failed |
| `uv run pytest` | PASS — 395 passed |
| `uv run ruff check .` | PASS |
| strict TypeScript `tsc --noEmit` for `packages/kodac-runtime` | PASS |
| `git diff --check` | PASS |

These results establish candidate cleanliness only. Canonical authorization still requires exact-head CI, included review, and merge.

## Merge gate

This authorization may become canonical only if:

- the final diff is exactly this record plus the four current-authority surfaces;
- canonical `main` remains the expected base or the PR is cleanly reconciled without scope expansion;
- all named prerequisite and donor-audit merge commits remain ancestors of the PR base;
- full repository validation and docs-only CI are green on the exact head;
- normal included review is terminal with zero current material findings and zero unresolved actionable threads;
- no source, dependency, workflow, schema, runtime, fixture, lockfile, provenance-policy, ruleset, or protected-lane path changes in this authorization PR;
- merge uses exact expected-head semantics and the merge commit preserves the intended five-path tree.

Canonical adoption authorizes only the six-path implementation slice above. The implementation remains non-canonical until its own exact-head CI, review, evidence, and merge gates pass.
