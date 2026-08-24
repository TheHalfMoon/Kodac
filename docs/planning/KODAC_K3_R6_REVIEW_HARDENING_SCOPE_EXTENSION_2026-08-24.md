# Kodac K3-R6 Review-Hardening Scope Extension

## Record identity

- Date: 2026-08-24
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-24`
- Authority class: DOCUMENTATION / IMPLEMENTATION SCOPE EXTENSION
- Canonical base commit: `eb69566d09454a976cfc204529187ae00f676f2b`
- Canonical base tree: `e312752f85232dd74a1ac4741a6b08052d1909e4`
- Original K3-R6 authorization: `docs/planning/KODAC_K3_R6_SNAPSHOT_RELATION_GRAPH_AUTHORIZATION_2026-08-24.md`
- In-progress implementation PR: `#167`
- Reviewed implementation head: `90d4789dc2226d424e3f5fc15d31896582805403`
- Reviewed implementation tree: `1c50822f5e82f7a7295ee4189974a3f07834609f`
- Current remediation head at this gate: `7f7dc0e72651e5f8d635e881f6c4d89871975a6b`
- Current remediation tree at this gate: `a5933d85df98781a81ed0ef44cfad3d45d76df5e`

## Decision

Extend the exact K3-R6 implementation gate only enough to repair valid review findings in PR #167:

```text
NODE:UTIL TYPES.ISPROXY FOR STRUCTURAL INPUT REJECTION: AUTHORIZED
PLAIN-RECORD / DENSE-ARRAY / ACCESSOR / CYCLE HARDENING: AUTHORIZED
PER-QUERY IN-MEMORY ADJACENCY INDEX: AUTHORIZED
SERIALIZED GRAPH-ENTITY QUERY SEEDS: AUTHORIZED

K3-R6 IMPLEMENTATION: STILL NOT YET CANONICAL
K3: STILL NOT CLOSED
K3-R7+: NOT AUTHORIZED
```

This record is a narrow extension to the original K3-R6 authorization. Every original boundary remains controlling except where this record explicitly replaces it.

## Review evidence and necessity

Normal included review of PR #167 found:

1. the dedicated purity gate recognized static imports but did not reject every dynamic `import(...)` expression;
2. query traversal rescanned the entire bounded edge collection for each visited node, producing an avoidable `O(E × visited)` worst case at the published 4,096-node / 16,384-edge limits;
3. arbitrary caller objects could reach reflective enumeration, property access, canonicalization, or freezing before Proxy/accessor/cycle rejection;
4. the graph's own serialized file entity, which carries explicit `null` symbol fields, could not be reused as a query seed even though it names the same exact graph entity.

The dynamic-import gap was repaired on the in-progress implementation head without expanding the original import allowlist. The remaining structural hardening cannot reliably reject a JavaScript `Proxy` before its traps execute using ECMAScript reflection alone. Kodac's existing fail-closed runtime pattern uses Node's built-in `util.types.isProxy` for that exact purpose.

`node:util` is a Node platform builtin, not a package dependency, donor intake, provider, network client, persistence surface, or execution authority. Its admission here is limited to the non-mutating `types.isProxy` predicate.

## Exact supersession

The original required proof:

```text
production source imports only deterministic crypto plus local relation/repository contracts
```

is replaced only for the K3-R6 relation-graph production surface by:

```text
production source imports only:
- node:crypto for deterministic SHA-256 identities;
- node:util solely for types.isProxy structural rejection;
- the existing local repository contracts;
- the existing local relation-graph contracts.
```

No other Node builtin, package, local runtime module, donor module, dynamic module, or dependency is admitted.

The original six-path implementation allowlist remains exact and unchanged:

```text
.github/workflows/k3-r6-relation-graph.yml
schema/k3-r6-relation-graph.schema.json
packages/kodac-runtime/src/relation-graph/contracts.ts
packages/kodac-runtime/src/relation-graph/relation-graph.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k3-r6-relation-graph.test.ts
```

## Authorized structural hardening

Within the existing relation-graph production and test paths, K3-R6 may:

- reject Proxy-wrapped records and arrays with `util.types.isProxy` before other reflective operations;
- require plain object or plain array prototypes as appropriate;
- reject symbol fields, non-enumerable record fields, accessors, sparse arrays, accessor array elements, and unexpected array properties before reading caller-owned values;
- materialize validated data-property values into ordinary local records and arrays before canonicalization;
- reject cyclic or multiply-entered hostile input structures with bounded iterative or cycle-aware validation;
- canonicalize and deep-freeze only locally constructed normalized values after structural validation.

Proxy traps and accessor getters must not execute during rejection tests.

This hardening does not turn K3-R6 into a general serializer or validator service and does not authorize arbitrary object-graph traversal.

## Authorized traversal hardening

Within one query invocation, K3-R6 may build a bounded ephemeral adjacency index derived solely from the already-validated immutable graph:

- `impact`: resolved or ambiguous incoming transitions keyed by target node, filtered to the exact impact relation allowlist;
- `related_files`: resolved or ambiguous transitions in both directions for every authorized relation kind;
- each per-node transition list sorted once by the existing deterministic edge and next-node ordering;
- ambiguous-edge identities recorded when the corresponding node's transitions are consumed;
- no index field in graph/query/result identity;
- no index persistence, cache, watcher, filesystem access, database, global state, or cross-query reuse.

The graph, query, evidence-chain, result, completeness, and traversal semantics from the original authorization remain unchanged.

## Authorized query-seed normalization

K3-R6 queries may accept either:

1. the original `RelationEntityInput` seed shape; or
2. the exact serialized `RelationEntity` shape already emitted by a graph node.

Both shapes must normalize to the same canonical selector and query identity. For file seeds, explicit `null` values are allowed only for `symbol`, `qualifiedName`, and `sourceSpan`. For symbol seeds, optional fields may be absent or explicitly `null` only where the serialized contract already permits `null`. Unknown fields, non-null file symbol fields, malformed spans, and non-canonical values still fail closed.

This normalization does not create fuzzy, name-only, or partial entity resolution.

## Required remediation proofs

The reconciled implementation must add or preserve tests proving at least:

1. every dynamic `import(...)` expression is rejected by the CI and production-purity regression surface;
2. `node:util` is admitted only for `types.isProxy` and no other additional import is allowed;
3. Proxy-wrapped top-level and nested records/arrays fail before traps execute;
4. accessor record fields and array elements fail before getters execute;
5. non-plain prototypes, symbol fields, hidden fields, sparse arrays, unexpected array properties, and cyclic inputs fail closed;
6. ordinary current inputs preserve all prior deterministic identities and results;
7. traversal uses one bounded per-query adjacency build and preserves deterministic chains, ambiguity, cycle safety, depth bounds, and result bounds;
8. a graph node's serialized entity and its equivalent input-form seed produce the same query identity and result;
9. full runtime tests, strict TypeScript, Python tests, Ruff, schema parity, scope, purity, and checkout-unchanged proofs remain green.

## Reconciliation rule for PR #167

PR #167 must not merge on the historical base after this extension becomes canonical. Its final implementation head must:

- descend from or be cleanly replayed onto this extension's canonical merge;
- update the dedicated workflow's one-time canonical implementation baseline to that merge identity;
- remain limited to the original six implementation paths;
- contain the dynamic-import rejection plus all valid current review remediations;
- receive fresh exact-head CI and normal included review with zero unresolved actionable findings;
- merge with expected-head semantics and preserve its exact qualified tree.

## Explicit non-grants

```text
NEW PACKAGE OR DEPENDENCY: NOT AUTHORIZED
NODE:UTIL USE BEYOND TYPES.ISPROXY: NOT AUTHORIZED
OTHER NODE BUILTINS: NOT AUTHORIZED
DYNAMIC IMPORT OR REQUIRE: NOT AUTHORIZED
GENERAL SERIALIZER / OBJECT-GRAPH SERVICE: NOT AUTHORIZED
PERSISTENT OR CROSS-QUERY GRAPH INDEX: NOT AUTHORIZED

DONOR SOURCE OR DEPENDENCY INTAKE: NOT AUTHORIZED
SOURCE CRAWLING / RUNTIME TRACING / MODEL CALLS: NOT AUTHORIZED
DATABASE / CACHE / WATCHER / FILE WRITE: NOT AUTHORIZED
K2 OR DONE-GATE AUTHORITY CHANGE: NOT AUTHORIZED
K3 CLOSEOUT BY THIS EXTENSION: NOT AUTHORIZED
K3-R7+: NOT AUTHORIZED
RULESET / RELEASE / PACKAGE PUBLICATION / BRAND AUTHORITY: NOT AUTHORIZED
```

PR #163, all Z0-family work, zrok, paid review/provider spend, secrets, GitHub Apps, webhooks, and trust-root establishment remain outside this gate and untouched.

## Merge gate

This scope extension may become canonical only if:

- the final diff is exactly this record plus the four current-authority surfaces;
- canonical `main` remains the exact expected base or the candidate is explicitly reconciled without scope expansion;
- full repository validation and docs-only CI are green on the exact head;
- normal included review is terminal with zero current material findings and zero unresolved actionable threads;
- no source, test, schema, workflow, fixture, dependency, lockfile, provenance-policy, ruleset, or protected-lane path changes;
- merge uses exact expected-head semantics and the merge commit preserves the intended five-path tree.

Canonical adoption authorizes only the review-hardening extension above. It does not itself implement or canonically adopt K3-R6.
