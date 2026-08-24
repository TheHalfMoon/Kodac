# Kodac K4-R2 Caller-Materialized MCP Catalog Evidence Canonical Evidence

## Record identity

- Date: 2026-08-24
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-24`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION CANONICALIZATION
- Canonical base commit: `153b30b5187804c9eb31a25759d0646e4235ddfc`
- Canonical base tree: `efd1f763294cf03da5dec5339a0855af2861263e`
- K4-R2 authorization merge: `52aa0256456edcaefe3800cc0b4855a95d0acf64` (PR #173)
- K4-R2 prerequisite-hardening authorization merge: `8f7e7f6faf6478edb08dfbf4ade97cc71b6e35d2` (PR #174)
- K4-R1 workflow-hardening qualified head: `92e70c57b045db053f1be73727449b06440ff6ae`
- K4-R1 workflow-hardening qualified tree: `7a7f06d7859bf5325568e21260282c39d702fcd8`
- K4-R1 workflow-hardening merge: `78d71717e14d51c6efc49b5b0906a564d2459d7a` (PR #175)
- K4-R2 qualified implementation head: `ae68279bbbc5abc545575b4c8cc44928e483eec5`
- K4-R2 qualified implementation tree: `efd1f763294cf03da5dec5339a0855af2861263e`
- K4-R2 implementation merge: `153b30b5187804c9eb31a25759d0646e4235ddfc` (PR #176)

## Decision

Conditionally adopt the exact bounded K4-R2 implementation only if this evidence candidate passes the exact merge gate below. Its prerequisite K4-R1 canonical-regression workflow hardening is already canonical under the separate self-canonicalizing rule in `KODAC_K4_R2_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md` after PR #175 passed its own authorized implementation, qualification, review, merge, and post-merge gates:

```text
K4: DEFINED / IN PROGRESS / NOT CLOSED
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2: CANONICAL / COMPLETE IFF THIS EVIDENCE MERGE GATE PASSES; OTHERWISE CANONICALIZATION CANDIDATE
K4-R2 PREIMPLEMENTATION K4-R1 WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH SCOPE
K4-R3+: NOT AUTHORIZED
```

Only after every condition in the merge gate passes does this decision make the inert, caller-materialized MCP catalog-evidence surface canonical. It does not close K4, authorize K4-R3, create an MCP client or server, perform discovery or invocation, or turn an external declaration, metadata digest, cache hint, normalized binding, or registry membership into authority.

## Canonical implementation ledger

| Gate | Canonical identity | Accepted bounded outcome |
| --- | --- | --- |
| K4-R2 authorization | `52aa0256456edcaefe3800cc0b4855a95d0acf64` (PR #173) | exact official MCP evidence, caller-materialized data-only contract, five-path implementation allowlist, and preserved non-grants |
| prerequisite-hardening authorization | `8f7e7f6faf6478edb08dfbf4ade97cc71b6e35d2` (PR #174) | exact one-path repair authority for the inherited shared-export gate conflict |
| K4-R1 canonical-regression workflow hardening | `78d71717e14d51c6efc49b5b0906a564d2459d7a` (PR #175) | continuing byte-exact protection for canonical K4-R1 artifacts and exports while separately authorized sibling modules use their own gates |
| K4-R2 implementation | `153b30b5187804c9eb31a25759d0646e4235ddfc` (PR #176) | immutable caller-materialized MCP catalog evidence, exact binding-state correlation, closed Draft 2020-12 schema, and dedicated one-time implementation gate |

All four records descend from canonical K4-R1 evidence merge `f8ad3faab690487f2e9490664c539c281e8fde44`, K4-R1 implementation merge `034da7bfeee9439828ea0f639c7ce63ee0b3b9da`, canonical H1 descriptor-registry merge `ec2558129fc69e8586fffb8d36dfe42e6a333573`, and canonical K3 closeout merge `67141074fb649b449ca18dbab92872884e7cad58`.

The prerequisite workflow-hardening merge has the exact ordered parents:

```text
parent 1: 8f7e7f6faf6478edb08dfbf4ade97cc71b6e35d2
parent 2: 92e70c57b045db053f1be73727449b06440ff6ae
```

Its merge tree is exactly the qualified hardening tree:

```text
merge tree:     7a7f06d7859bf5325568e21260282c39d702fcd8
qualified tree: 7a7f06d7859bf5325568e21260282c39d702fcd8
```

The K4-R2 implementation merge has the exact ordered parents:

```text
parent 1: 78d71717e14d51c6efc49b5b0906a564d2459d7a
parent 2: ae68279bbbc5abc545575b4c8cc44928e483eec5
```

Its merge tree is exactly the qualified implementation tree:

```text
merge tree:     efd1f763294cf03da5dec5339a0855af2861263e
qualified tree: efd1f763294cf03da5dec5339a0855af2861263e
```

## Exact primary-standard evidence

The canonical implementation preserves the MCP standard pin and every official evidence identity recorded by the authorization:

- upstream commit `57ac4a2ec742e0cb7622d899b0f5d3bcf769fd69`;
- upstream tree `164f5cb7a4a9b72a0b1c81aa0d9eeae5a21688e5`;
- published revision `2026-07-28`;
- K4-R1 MCP standard-pin identity `b8432ed6198f8e25c5b1d0ef50bab01b06909a77f15f831ff64573a7d4fa312a`;
- specification-index blob `452d78601b135b95bbe45287e756c0579534096b`;
- Apache-2.0 licensing-evidence blob `4a93985763241755401a10678395303de4e720ba`;
- tools, resources, prompts, pagination, caching, TypeScript-schema, and JSON-schema blobs `449020f54a6582122607b4869129bec5f1035f37`, `f49dd8e6be3fd8f13911788ae5f5d4c87d2c53cd`, `5a6574be3c16715aaafb1c7973025c1bc3669474`, `b9a840468fc10a8fb31301df9a510cca9d0d345f`, `577c5ff54f46c2fc6bd29c10f6ddd07f81f180f0`, `9b55feeb412bc3ae877f2eac10b5c01ba29a2eed`, and `213c58f6d9a1c2ce6ad055afe90bbdb095a29ee8`.

These are read-only evidence pins. They admit no upstream source, generated schema, SDK, package, executable, hook, workflow, binary, or dependency.

## Required-proof matrix

| Authorized K4-R2 proof | Canonical evidence | Result |
| --- | --- | --- |
| exact MCP pin and official evidence blobs | immutable constants plus exact runtime assertions for every recorded identity | PASS |
| caller-materialized input only | closed page/declaration fields; digest-only cursors, response metadata, and declaration metadata | PASS |
| exact page-shape derivation | `SINGLE_PAGE_COMPLETE` only for two null cursor digests; every other combination is `PAGINATED_PAGE` | PASS |
| inert cache hints | TTL and cache scope are identity-bearing evidence only; no clock, cache, sharing, transport, poll, or authorization path | PASS |
| hook-free hostile-data rejection | direct and nested Proxy rejection before reflection plus accessor, symbol, prototype, sparse-array, cycle, non-JSON, depth, node, and bound failures | PASS |
| exact immutable registry snapshot | one canonical K4-R1 `list` snapshot captured only after full input validation and bound into the page identity | PASS |
| exact tuple correlation | one linear snapshot index over standard pin, kind, adapter identity, descriptor identity, and case-sensitive external name | PASS |
| exact state-dependent evidence | only `UNBOUND`, `CURRENT`, or `STALE`; capability/disposition evidence appears only for `CURRENT` | PASS |
| deterministic identities | closed canonical JSON, UTF-8, SHA-256 entry/page identities and canonical declaration ordering | PASS |
| exact maximum behavior | 4,096 declarations and 4,096 bindings correlate through one snapshot index without nested scans | PASS |
| immutable snapshot lifetime | later registry registration or disposal cannot mutate or refresh prior evidence pages | PASS |
| schema/runtime agreement | Draft 2020-12 validation plus representative valid, invalid, cursor, state, identity, and bound cases | PASS |
| data-only purity | exact import surface limited to `node:crypto`, hook-free `node:util`, and canonical local K4-R1 contracts/registry | PASS |
| no authority-bearing integration | no JSON-RPC, transport, discovery, cursor traversal, cache, resource read, prompt get, tool call, provider, policy, receipt, verification, or Done-Gate surface | PASS |
| repository qualification | runtime, focused K4-R2, Python, Ruff, strict TypeScript, provenance, scope, purity, schema, immutable-action, branch, and checkout-unchanged gates | PASS |

## Review and qualification evidence

The qualified implementation head incorporated every verified actionable finding:

- the K4-R1 canonical-regression workflow PR identity is bound to PR #175;
- the package-export assertion accepts both LF and CRLF checkouts while preserving exact export text;
- exact binding correlation is linear rather than declaration-by-binding quadratic and is tested at the exact 4,096-by-4,096 maximum;
- the one-time branch/base/scope admission remains fail-closed as required by the controlling authorization;
- every Action reference is structurally attested and pinned to an immutable upstream commit;
- the provenance validator is byte-bound before execution.

Final exact-head evidence on `ae68279bbbc5abc545575b4c8cc44928e483eec5`:

| Evidence | Result |
| --- | --- |
| required GitHub Actions | PASS — governance, K2 runtime, K3-R4, K3-R5, K3-R6, K4-R1 canonical-regression, and dedicated K4-R2 workflows all completed successfully |
| CodeRabbit final exact incremental review | PASS — included run `c6c5992d-22c8-4b35-87e8-96c50b78c7f9` reviewed `5d64a41ccbb611db250acd6ba9fe3ca278ee76fa` through `ae68279bbbc5abc545575b4c8cc44928e483eec5`; zero actionable comments |
| Qodo review | PASS — zero bugs and zero rule violations after reconciliation |
| review threads | PASS — zero unresolved threads |
| implementation scope | PASS — exactly five authorized paths, 1,640 additions and zero deletions from the canonical implementation base |
| local runtime | PASS — 887 tests; 785 passed; 102 intentionally skipped; 0 failed |
| focused K4-R2 tests | PASS — 22 passed, including exact-maximum linear correlation and zero-trap hostile-data regressions |
| Python / Ruff / strict TypeScript / provenance | PASS |
| pristine exact-head workflow replay | PASS — admission, schema, purity, Python, Ruff, provenance, full runtime, and checkout-unchanged gates |
| spend and protected boundaries | PASS — spend `$0`; PR #163 and every Z0-family surface untouched |

## Canonical K4-R2 surface

Canonical adoption establishes only:

- the exact `k4-r2-mcp-catalog-evidence-v1` contract;
- caller-materialized evidence for MCP tool, resource, or prompt list declarations;
- digest-only cursor, response-metadata, and declaration-metadata evidence;
- deterministic `SINGLE_PAGE_COMPLETE` or `PAGINATED_PAGE` derivation without cross-page claims;
- one immutable canonical K4-R1 binding snapshot per materialization;
- exact `UNBOUND`, `CURRENT`, or `STALE` correlation evidence;
- content-addressed immutable entries and pages;
- a closed Draft 2020-12 schema and one-time implementation workflow;
- continuing byte-exact K4-R1 artifact/export protection through the separately canonicalized regression gate.

The governing invariant remains:

```text
CALLER-MATERIALIZED PAGE != LIVE MCP DISCOVERY
PAGE DIGEST != SERVER TRUTH
CACHE HINT != FRESHNESS OR SHARING AUTHORITY
CURRENT NORMALIZATION != TRUST OR EXECUTION AUTHORITY
STALE OR UNBOUND != FALLBACK PERMISSION
```

## Preserved non-grants

Canonical K4-R2 does not establish or authorize:

- MCP JSON-RPC parsing/serialization, client/server behavior, transport, discovery, sessions, list calls, cursor traversal, notifications, subscriptions, multi-page assembly, or invocation;
- cache storage, lookup, sharing, polling, refresh, or freshness claims;
- resource-template listing, resource reads or URI fetches, prompt retrieval/completion, or tool calls;
- interpretation of raw descriptions, annotations, schemas, instructions, URIs, headers, metadata, or digests as trust or authority;
- ACP or Agent Skills implementation;
- donor source/schema/SDK/dependency intake, a new Kodac package or dependency, or dynamic code loading;
- network, filesystem, process, secret, persistence, external-registry, ExecutionGateway, Trust Kernel, policy, K2 authority, or `PROVEN_READY` change;
- repository write, external reviewer integration, GitHub comment/review, approval, or merge authority from K4-R2 itself;
- K4 closure, K4-R3+, K5, K6, K7, KRI-R5+, public release, package publication, or brand launch.

PR #163, all Z0-family work, zrok, paid review/provider spend, real secrets, GitHub Apps, webhooks, and founder-process trust-root establishment remain outside this gate and untouched.

## Exact documentation scope

This canonicalization candidate may change exactly:

```text
docs/planning/KODAC_K4_R2_CALLER_MATERIALIZED_MCP_CATALOG_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/ROADMAP.md
docs/roadmap/VERSION_PLAN.md
```

No source, test, schema, fixture, workflow, dependency, lockfile, provenance policy, ruleset, protected-lane document, or PR #163 artifact is changed.

## Local candidate validation

The complete repository validation set passed on the five-document canonicalization candidate:

| Check | Result |
| --- | --- |
| K4-R1 evidence and K4-R2 authorization ancestry | PASS |
| K4-R1 workflow-hardening ordered-parent proof | PASS — `8f7e7f6faf6478edb08dfbf4ade97cc71b6e35d2`, then `92e70c57b045db053f1be73727449b06440ff6ae` |
| K4-R1 workflow-hardening merge-tree equality | PASS — `7a7f06d7859bf5325568e21260282c39d702fcd8` |
| K4-R2 ordered-parent proof | PASS — `78d71717e14d51c6efc49b5b0906a564d2459d7a`, then `ae68279bbbc5abc545575b4c8cc44928e483eec5` |
| K4-R2 merge-tree equality | PASS — `efd1f763294cf03da5dec5339a0855af2861263e` |
| exact documentation scope | PASS — exactly five paths |
| `npm test --prefix packages/kodac-runtime` | PASS — 887 tests; 785 passed; 102 intentionally skipped; 0 failed |
| `uv run pytest` | PASS — 395 passed |
| `uv run ruff check .` | PASS |
| strict TypeScript `tsc --noEmit` for `packages/kodac-runtime` | PASS |
| `uv run python tools/validate_provenance.py` | PASS |
| `git diff --check` | PASS |

These results establish local candidate cleanliness. Canonical adoption still requires the exact-head CI, review, merge, and post-merge proof below.

## Merge gate

This evidence becomes canonical and K4-R2 becomes complete for its bounded authorized scope only if:

- the final diff is exactly this record plus the four current-authority surfaces;
- canonical `main` remains the exact expected base or the candidate is explicitly reconciled without scope expansion;
- the K4-R1 evidence, K4-R2 authorization, hardening authorization, hardening implementation, and K4-R2 implementation merges remain ancestors of the candidate;
- both implementation merges retain the exact ordered parents and qualified-tree equality recorded above;
- full repository validation and docs-only CI are green on the exact head;
- normal included review is terminal with zero current material findings and zero unresolved actionable threads;
- merge uses exact expected-head semantics and preserves the intended five-path tree;
- post-merge canonical proof re-verifies the merge parent order and tree equality.

Until every condition above passes, this record is a canonicalization candidate and K4-R2 remains implemented and qualified but not canonically adopted.

Canonical adoption does not close K4 or authorize K4-R3, a protected operation, provider spend, Z0-family action, trust-root establishment, public release, or PR #163 work.
