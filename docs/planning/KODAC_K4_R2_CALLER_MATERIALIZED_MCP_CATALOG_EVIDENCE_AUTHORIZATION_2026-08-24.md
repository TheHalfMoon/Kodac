# Kodac K4-R2 Caller-Materialized MCP Catalog Evidence Authorization

## Record identity

- Date: 2026-08-24
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-24`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION AUTHORIZATION
- Canonical base commit: `f8ad3faab690487f2e9490664c539c281e8fde44`
- Canonical base tree: `c0d19ae586edd3390e7b778ca560247ca41e7aa0`
- K4 definition and R1 authorization merge: `f64a5f1ddbe57970d214c2f7b042fa421a0562fa` (PR #170)
- K4-R1 implementation merge: `034da7bfeee9439828ea0f639c7ce63ee0b3b9da` (PR #171)
- K4-R1 canonical evidence merge: `f8ad3faab690487f2e9490664c539c281e8fde44` (PR #172)
- Accepted compatibility architecture: `docs/adr/ADR-0007-native-mcp-acp-agent-skills-compatibility.md`

## Decision

Authorize only the second bounded K4 slice:

```text
K4: DEFINED / IN PROGRESS / NOT CLOSED
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY SCOPE
K4-R2: CALLER-MATERIALIZED DATA-ONLY MCP CATALOG EVIDENCE IMPLEMENTATION AUTHORIZED
K4-R2 IMPLEMENTATION: NOT YET CANONICAL
K4-R3+: NOT AUTHORIZED
```

K4-R2 may correlate already-materialized MCP `tools/list`, `resources/list`, or `prompts/list` page evidence with one immutable K4-R1 binding-registry snapshot. It does not send or parse JSON-RPC, discover a server, fetch a page, traverse a cursor, cache a result, read a resource, retrieve a prompt, call a tool, or execute any external object.

## Why this is the next bounded gate

Canonical K4-R1 establishes exact MCP identity, closed MCP object kinds, deterministic external-capability bindings, and an ephemeral binding registry. It intentionally stops before any external catalog is observed.

The accepted ADR requires MCP compatibility behind Kodac-owned adapters and mandatory trust boundaries. The smallest useful successor is therefore an inert evidence projection that answers only:

```text
Given a caller-materialized MCP list page
and one exact K4-R1 binding snapshot,
which declaration names are unbound, current, or stale relative to that snapshot?
```

This makes compatibility drift and missing normalization observable without creating a protocol client or an authority path.

## Exact primary-source basis

K4-R2 remains pinned to the canonical MCP standard identity from K4-R1:

- repository: `modelcontextprotocol/modelcontextprotocol`;
- commit: `57ac4a2ec742e0cb7622d899b0f5d3bcf769fd69`;
- tree: `164f5cb7a4a9b72a0b1c81aa0d9eeae5a21688e5`;
- published revision: `2026-07-28`;
- K4-R1 MCP standard-pin identity: `b8432ed6198f8e25c5b1d0ef50bab01b06909a77f15f831ff64573a7d4fa312a`;
- specification index blob: `452d78601b135b95bbe45287e756c0579534096b`;
- Apache-2.0 licensing-evidence blob: `4a93985763241755401a10678395303de4e720ba`.

The exact additional official evidence inspected for this gate is:

| MCP surface | Pinned path | Blob |
| --- | --- | --- |
| tools list/data type and untrusted annotation rule | `docs/specification/2026-07-28/server/tools.mdx` | `449020f54a6582122607b4869129bec5f1035f37` |
| resources list/data type and opaque URI surface | `docs/specification/2026-07-28/server/resources.mdx` | `f49dd8e6be3fd8f13911788ae5f5d4c87d2c53cd` |
| prompts list/data type and untrusted instruction surface | `docs/specification/2026-07-28/server/prompts.mdx` | `5a6574be3c16715aaafb1c7973025c1bc3669474` |
| opaque cursor semantics and no fixed page size | `docs/specification/2026-07-28/server/utilities/pagination.mdx` | `b9a840468fc10a8fb31301df9a510cca9d0d345f` |
| per-page TTL/cache-scope hints and no cross-page consistency guarantee | `docs/specification/2026-07-28/server/utilities/caching.mdx` | `577c5ff54f46c2fc6bd29c10f6ddd07f81f180f0` |
| normative TypeScript schema | `schema/2026-07-28/schema.ts` | `9b55feeb412bc3ae877f2eac10b5c01ba29a2eed` |
| generated JSON Schema | `schema/2026-07-28/schema.json` | `213c58f6d9a1c2ce6ad055afe90bbdb095a29ee8` |

These upstream files are read-only evidence. No source expression, generated schema, dependency, SDK, fixture, workflow, hook, script, or binary is admitted.

## Governing invariants

```text
CALLER-MATERIALIZED PAGE != LIVE MCP DISCOVERY
PAGE DIGEST != SERVER TRUTH
CACHE HINT != FRESHNESS PROOF
PUBLIC CACHE SCOPE != KODAC SHARING AUTHORITY
CURRENT NORMALIZATION != TRUST OR EXECUTION AUTHORITY
STALE OR UNBOUND DECLARATION != FALLBACK PERMISSION
```

All raw descriptions, annotations, schemas, URIs, server metadata, instructions, cursors, and extension metadata remain untrusted external evidence.

## Authorized K4-R2 contract

K4-R2 may add one pure TypeScript module that accepts caller-materialized bounded data and returns immutable content-addressed evidence.

### Version and closed vocabularies

The exact contract version is:

```text
k4-r2-mcp-catalog-evidence-v1
```

Only these canonical K4-R1 object kinds are accepted:

```text
MCP_TOOL
MCP_RESOURCE
MCP_PROMPT
```

The exact derived binding-state vocabulary is:

```text
UNBOUND
CURRENT
STALE
```

The exact page-shape vocabulary is:

```text
SINGLE_PAGE_COMPLETE
PAGINATED_PAGE
```

`SINGLE_PAGE_COMPLETE` is derived only when both the request-cursor digest and next-cursor digest are `null`. It means that the caller represented one MCP page with no incoming or outgoing cursor. It does not prove server honesty, authorization completeness, or timeless catalog completeness.

Every other cursor combination is `PAGINATED_PAGE`. K4-R2 does not assemble pages or claim cross-page consistency.

### Caller-materialized input

An input page may contain only:

- the exact canonical MCP `standardPinIdentity`;
- one H1/K4 adapter `extensionId` and exact `descriptorIdentity`;
- one of the three allowed MCP object kinds;
- `requestCursorSha256`, either `null` for no cursor or the caller-supplied SHA-256 digest of the exact opaque request cursor;
- `nextCursorSha256`, either `null` for no next cursor or the caller-supplied SHA-256 digest of the exact opaque next cursor;
- a non-negative safe-integer `ttlMs` copied as an untrusted freshness hint;
- the exact external cache-scope value `public` or `private`, copied as an untrusted sharing hint;
- a caller-supplied `responseMetadataSha256` digest for the complete materialized list-result evidence;
- between zero and 4,096 declaration observations.

Each declaration observation may contain only:

- `externalName`, using the canonical K4-R1 512-code-point and 512-UTF-8-byte opaque-name bound;
- `externalMetadataSha256`, the caller-supplied digest of the complete external declaration evidence.

K4-R2 does not accept raw cursors, JSON-RPC envelopes, server instructions, descriptions, annotations, icons, input/output schemas, prompt arguments, resource contents, resource templates, `_meta`, arbitrary extension fields, or transport data.

For an MCP resource, `externalName` may carry the already-materialized resource URI as an opaque string within the K4-R1 bound. K4-R2 must not parse, normalize, resolve, dereference, fetch, decode, authorize, or convert that URI into a filesystem or network operation.

### Hook-free hostile-data validation

Before any structural reflection or traversal, direct and nested Proxy values must be rejected with the canonical hook-free `node:util` `types.isProxy` boundary. Accessors, symbols, custom prototypes, sparse arrays, cycles, non-JSON values, unknown fields, over-depth trees, over-node trees, over-bound arrays, malformed digests, invalid enumerations, and invalid safe integers fail closed before identity construction.

Validation may reuse the K4-R1 numeric depth/node/name bounds. Declared array length must be bounded before any length-sized helper allocation.

### Exact binding correlation

Materialization must capture one immutable `CompatibilityBindingSnapshot` from the supplied canonical K4-R1 registry before correlating entries. The page output binds to that snapshot's `snapshotIdentity`.

For each declaration, K4-R2 selects only a binding whose exact tuple matches:

```text
canonical MCP standardPinIdentity
objectKind
externalName
adapter extensionId
adapter descriptorIdentity
```

Canonical K4-R1 conflict rules permit at most one such binding.

The derived state is:

- `UNBOUND` when no exact tuple match exists;
- `CURRENT` when one exact tuple match exists and its `externalMetadataSha256` equals the declaration digest;
- `STALE` when one exact tuple match exists but its metadata digest differs.

`CURRENT` preserves the exact K4-R1 `bindingIdentity`, disposition, and sorted normalized capability identifiers as evidence. `UNBOUND` and `STALE` expose no normalized capability identifiers and no disposition. `STALE` may preserve only the stale matched `bindingIdentity` as drift evidence.

K4-R2 never registers, replaces, refreshes, removes, or otherwise mutates a K4-R1 binding. It never falls back from `UNBOUND` or `STALE` to an external name, annotation, schema, description, or caller assertion.

### Deterministic entry and page identities

Every derived identity uses the canonical K4-R1 closed canonical-JSON, UTF-8, SHA-256 algorithm.

Declarations are a set and must be sorted by:

```text
externalName
externalMetadataSha256
```

Duplicate `externalName` values in one caller-materialized page fail closed before output. Tool and prompt names remain case-sensitive; no case folding, Unicode normalization, URI normalization, or semantic inference is permitted.

An entry identity hashes exactly the complete derived entry excluding its identity. A page identity hashes exactly the complete immutable page, including the binding snapshot identity, cursor digests, cache hints, page shape, and sorted entries, excluding only the page identity.

The empty page is valid and content-addressed.

### Snapshot-only lifetime

The returned page is immutable evidence of one materialization against one K4-R1 binding snapshot. Later registry registration or disposal does not mutate or silently refresh a prior page.

No clock is read. No freshness state is computed. `ttlMs` is preserved only as an untrusted external hint. No cache is created or consulted, and `cacheScope` never grants cross-user or cross-authorization-context sharing.

## Exact implementation allowlist

After canonical adoption of this authorization, the K4-R2 implementation PR may change exactly:

```text
.github/workflows/k4-r2-mcp-catalog-evidence.yml
schema/k4-r2-mcp-catalog-evidence.schema.json
packages/kodac-runtime/src/compatibility/mcp-catalog.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k4-r2-mcp-catalog-evidence.test.ts
```

The implementation branch must be exactly:

```text
codex/k4-r2-mcp-catalog-evidence
```

The dedicated workflow must bind its exact baseline to the canonical merge of this authorization, reject any other implementation branch or changed path, and use only immutable verified Action commits. Production code may import only deterministic `node:crypto`, hook-free Proxy detection from `node:util`, and canonical local H1/K4-R1 contracts or registries. No package or dependency is admitted.

## Required implementation proofs

The implementation must prove at least:

1. the exact MCP standard pin and every official evidence blob recorded above remain unchanged;
2. only the three authorized MCP list object kinds are accepted;
3. raw cursor values are never accepted or emitted, and null versus digest cursor states preserve the official empty-cursor distinction;
4. `SINGLE_PAGE_COMPLETE` and `PAGINATED_PAGE` are derived exactly and never claim cross-page consistency;
5. `ttlMs` and `cacheScope` are inert evidence and never drive a clock, cache, poll, sharing, transport, or authorization decision;
6. direct and nested proxies execute zero caller traps, and every hostile-data or bound violation fails before identity construction;
7. an exact immutable K4-R1 binding snapshot is captured before correlation and its identity is bound into the page;
8. `UNBOUND`, `CURRENT`, and `STALE` are derived from the exact tuple and metadata-digest rules;
9. `UNBOUND` and `STALE` never expose normalized capability identifiers or a disposition and never fall back to external metadata;
10. materialization does not mutate binding registry content, size, serials, receipts, or prior snapshots;
11. entry and page identities are deterministic, content-addressed, order-independent for declaration sets, and change with every identity-bearing field;
12. duplicate names, malformed digests, unknown fields/vocabularies, non-safe TTLs, oversized names/pages, accessors, custom prototypes, sparse arrays, cycles, and non-JSON data fail closed;
13. schema conditions, bounds, nullability, closed vocabularies, identity formats, and state-dependent fields match runtime behavior;
14. production code has no JSON-RPC, MCP SDK, client/server, transport, network, filesystem, process, secret, dynamic import, parser, loader, cache, timer, polling, subscription, notification, resource read, prompt get, tool call, provider registry, ExecutionGateway, Trust Kernel, policy, receipt, verification, or Done-Gate surface;
15. full runtime, focused K4-R2, strict TypeScript, Python, Ruff, scope, purity, provenance, Draft 2020-12 schema, immutable-action, branch, and checkout-unchanged gates are green.

## Explicit non-grants

```text
MCP JSON-RPC PARSING OR SERIALIZATION: NOT AUTHORIZED
MCP CLIENT OR SERVER: NOT AUTHORIZED
SERVER/DISCOVER CALL OR RESULT MATERIALIZATION: NOT AUTHORIZED
TOOLS/LIST, RESOURCES/LIST, OR PROMPTS/LIST CALL: NOT AUTHORIZED
CURSOR TRAVERSAL OR MULTI-PAGE ASSEMBLY: NOT AUTHORIZED
LIST-CHANGED NOTIFICATION OR SUBSCRIPTION: NOT AUTHORIZED
CACHE STORAGE, LOOKUP, SHARING, POLLING, OR FRESHNESS CLAIM: NOT AUTHORIZED
TOOLS/CALL: NOT AUTHORIZED
RESOURCES/READ OR RESOURCE URI FETCH: NOT AUTHORIZED
RESOURCES/TEMPLATES/LIST: NOT AUTHORIZED
PROMPTS/GET OR COMPLETION: NOT AUTHORIZED

RAW DESCRIPTION / ANNOTATION / SCHEMA / INSTRUCTION INTERPRETATION: NOT AUTHORIZED
MCP TOOL ANNOTATION AS TRUST OR SIDE-EFFECT CLASSIFICATION: NOT AUTHORIZED
X-MCP-HEADER PROCESSING: NOT AUTHORIZED
EXTERNAL NAME, URI, METADATA, OR DIGEST AS AUTHORITY: NOT AUTHORIZED

ACP OR AGENT SKILLS IMPLEMENTATION: NOT AUTHORIZED BY THIS SLICE
DONOR SOURCE / SCHEMA / SDK / DEPENDENCY INTAKE: NOT AUTHORIZED
NEW PACKAGE OR DEPENDENCY: NOT AUTHORIZED
NETWORK / FILESYSTEM / PROCESS / SECRET AUTHORITY: NOT AUTHORIZED
PERSISTENCE OR EXTERNAL REGISTRY: NOT AUTHORIZED
EXECUTIONGATEWAY / TRUST KERNEL / POLICY / K2 AUTHORITY CHANGE: NOT AUTHORIZED
REPOSITORY WRITE / REVIEW / APPROVAL / MERGE / PROVEN_READY AUTHORITY: NOT AUTHORIZED

K4-R2 SCOPE EXPANSION: NOT AUTHORIZED
K4-R3+: NOT AUTHORIZED
K5 / K6 / K7 / KRI-R5+ IMPLEMENTATION: NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH: NOT AUTHORIZED
```

PR #163, all Z0-family work, zrok, paid review/provider spend, real secrets, GitHub Apps, webhooks, and founder-process trust-root establishment remain outside this gate and untouched.

## Exact documentation scope

This authorization candidate may change exactly:

```text
docs/planning/KODAC_K4_R2_CALLER_MATERIALIZED_MCP_CATALOG_EVIDENCE_AUTHORIZATION_2026-08-24.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/ROADMAP.md
docs/roadmap/VERSION_PLAN.md
```

No source, test, schema, fixture, workflow, dependency, lockfile, provenance policy, ruleset, protected-lane document, or PR #163 artifact is changed.

## Local candidate validation

The complete repository and primary-source validation set passed on the five-document authorization candidate:

| Check | Result |
| --- | --- |
| canonical K4-R1 evidence ancestry | PASS |
| official MCP commit/tree/specification/license identity | PASS |
| official tools/resources/prompts/pagination/caching/schema evidence blobs | PASS |
| exact documentation scope | PASS — exactly five paths |
| `npm test --prefix packages/kodac-runtime` | PASS — 865 tests; 763 passed; 102 intentionally skipped; 0 failed |
| `uv run pytest` | PASS — 395 passed |
| `uv run ruff check .` | PASS |
| strict TypeScript `tsc --noEmit` for `packages/kodac-runtime` | PASS |
| `uv run python tools/validate_provenance.py` | PASS |
| `git diff --check` | PASS |

These results establish local candidate cleanliness only. Canonical authorization still requires exact-head CI, included review, merge, and post-merge proof.

## Merge gate

This K4-R2 authorization becomes canonical only if:

- the final diff is exactly this record plus the four current-authority surfaces;
- canonical `main` remains the exact expected base or the candidate is explicitly reconciled without scope expansion;
- the K4-R1 canonical evidence merge remains an ancestor of the candidate;
- all external MCP pins and evidence blobs are reverified from official primary sources on the final candidate;
- full repository validation and docs-only CI are green on the exact head;
- normal included review is available and terminal with zero current material findings and zero unresolved actionable threads;
- no source, test, schema, workflow, fixture, dependency, lockfile, provenance-policy, ruleset, or protected-lane change occurs;
- merge uses exact expected-head semantics and preserves the intended five-path tree;
- post-merge proof verifies ordered parents and tree equality.

Canonical adoption authorizes only the exact five-path K4-R2 implementation slice above. The implementation remains non-canonical until its own exact-head CI, included review, evidence, merge, and post-merge gates pass.
