# Kodac K4-R1 Compatibility Normalization Canonical Evidence

## Record identity

- Date: 2026-08-24
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-24`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION CANONICALIZATION
- Canonical base commit: `034da7bfeee9439828ea0f639c7ce63ee0b3b9da`
- Canonical base tree: `490e057252bda42243471a6b755bfc7bb79966cd`
- K4 definition and R1 authorization merge: `f64a5f1ddbe57970d214c2f7b042fa421a0562fa` (PR #170)
- K4-R1 qualified implementation head: `e2f3cee99663816706d5b3ad142b0e84d6dac7da`
- K4-R1 qualified implementation tree: `490e057252bda42243471a6b755bfc7bb79966cd`
- K4-R1 implementation merge: `034da7bfeee9439828ea0f639c7ce63ee0b3b9da` (PR #171)

## Decision

Canonically adopt the exact bounded K4-R1 implementation that passed its authorized six-path implementation, qualification, review, and merge gates:

```text
K4: DEFINED / IN PROGRESS / NOT CLOSED
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2+: NOT AUTHORIZED
```

This decision makes the implemented standard-pin, normalization, and ephemeral binding-registry surface canonical. It does not close K4, authorize K4-R2, or turn an external declaration, normalized binding, or registry membership into execution authority.

## Canonical implementation ledger

| Gate | Canonical identity | Accepted bounded outcome |
| --- | --- | --- |
| K4 definition and R1 authorization | `f64a5f1ddbe57970d214c2f7b042fa421a0562fa` (PR #170) | exact primary-standard pins, six-path implementation allowlist, deterministic contract, and preserved non-grants |
| K4-R1 implementation | `034da7bfeee9439828ea0f639c7ce63ee0b3b9da` (PR #171) | data-only standard pins, external-capability normalization contracts, closed JSON Schema, and deterministic in-memory binding registry |

Both records descend from canonical K3 closeout `67141074fb649b449ca18dbab92872884e7cad58`, canonical H1 descriptor-registry merge `ec2558129fc69e8586fffb8d36dfe42e6a333573`, and canonical Agent Skills audit merge `29a20b710edafa520d5eb18b59f7614589229829`.

The K4-R1 implementation merge has the exact ordered parents:

```text
parent 1: f64a5f1ddbe57970d214c2f7b042fa421a0562fa
parent 2: e2f3cee99663816706d5b3ad142b0e84d6dac7da
```

Its merge tree is exactly the qualified candidate tree:

```text
merge tree:     490e057252bda42243471a6b755bfc7bb79966cd
qualified tree: 490e057252bda42243471a6b755bfc7bb79966cd
```

## Exact primary-standard identities

The canonical implementation preserves the official primary-source identities recorded by the authorization:

| Standard | Upstream source identity | Runtime pin identity |
| --- | --- | --- |
| MCP | commit `57ac4a2ec742e0cb7622d899b0f5d3bcf769fd69`; tree `164f5cb7a4a9b72a0b1c81aa0d9eeae5a21688e5`; revision `2026-07-28`; specification blob `452d78601b135b95bbe45287e756c0579534096b`; license blob `4a93985763241755401a10678395303de4e720ba` | `b8432ed6198f8e25c5b1d0ef50bab01b06909a77f15f831ff64573a7d4fa312a` |
| ACP | commit `62c74ac119ec3296809496482440afca69926ce9`; tree `130153620c8e8a7d2934b19bd3442566bee7a6ea`; specification blob `4d5e4012f9ccd6b9a3e8ad3e2d3dab55cdbe2b44`; license blob `1de02305f81f6dc087b6229a1d86a31774d2fa31` | `b75626aa97bed5c4208200c9b4469d5ebc0ca35cb2a9fa1b0a7341ec4dadfdec` |
| Agent Skills | commit `69ef37e9424c0a7ea9dd2293b559e43ec8176379`; tree `65e11c9faad14a022055ce0ff3ebf99f2b55142f`; specification blob `d9a2db099d905da8b879a5c6f996728073985279`; license blob `a20f4476df158a57a68409015ea607c738856f57`; README licensing-evidence blob `247e4a18e908d3bf27092f886f25c2515d84ecbc` | `c82752ee60cfa019caaddda9d0230fbeb6f3b9051346135879bbc40563590819` |

These are evidence/reference pins. They admit no upstream source, package, executable, hook, workflow, binary, or dependency.

## Required-proof matrix

| Authorized K4-R1 proof | Canonical evidence | Result |
| --- | --- | --- |
| exact source/specification/license pins | immutable constants and exact pin-identity assertions for MCP, ACP, and Agent Skills | PASS |
| canonical pin, binding, and snapshot identity | closed canonical JSON, UTF-8, SHA-256 construction; sorted set and exact tuple-order tests | PASS |
| hostile or malformed data fails closed | unknown-field, proxy, accessor, non-JSON, cycle, depth, node, sparse-array, digest, name, and vocabulary regressions | PASS |
| exact disposition cardinality | `UNRESOLVED` zero, `SINGLE` one, and `COMPOSITE` two through sixteen unique capabilities | PASS |
| external evidence does not become authority | opaque external names plus digest-only metadata; no natural-language or `allowed-tools` inference | PASS |
| H1 descriptor ownership and provider role | exact registered descriptor identity and `PROVIDER` capability-role validation | PASS |
| bounded mutation semantics | duplicate/conflict rejection, 4,096-binding cap, and serial-preserving failure tests | PASS |
| deterministic immutable discovery/disposal | content-addressed filtered snapshots, exact tuple ordering, and stale-safe idempotent ownership receipts | PASS |
| schema/runtime agreement | Draft 2020-12 meta-schema check plus representative valid and invalid bindings/receipts | PASS |
| data-only purity | positive builtin-API allowlist and regressions for indirect global fetch and nondeterministic crypto APIs | PASS |
| no authority-bearing integration | no transport, session, discovery, invocation, loader, provider registry, persistence, ExecutionGateway, Trust Kernel, policy, or Done-Gate surface | PASS |
| repository qualification | runtime, focused K4-R1, Python, Ruff, strict TypeScript, provenance, scope, purity, schema, workflow, and checkout-unchanged gates | PASS |

## Review and qualification evidence

The qualified head incorporated every verified actionable finding:

- sparse-array declared length is bounded before index-set allocation;
- direct and nested proxies are rejected through hook-free `node:util` `types.isProxy` checks before structural reflection;
- every GitHub Action reference is pinned to a verified immutable upstream commit;
- the dedicated workflow rejects non-target branches, uses a positive builtin-API allowlist, and independently validates the Draft 2020-12 schema and representative instances;
- the locked schema-validator virtual environment is scoped to runner shell steps, allowing the workflow to instantiate and execute.

Final exact-head evidence on `e2f3cee99663816706d5b3ad142b0e84d6dac7da`:

| Evidence | Result |
| --- | --- |
| required GitHub Actions | PASS — governance, K2 runtime, K3-R4, K3-R5, K3-R6, and dedicated K4-R1 workflows all completed successfully |
| CodeRabbit exact incremental review | PASS — included run `6e17d944-a851-41e5-b077-49374f0adf78` reviewed `d95148d59b3c3050ff2c78a4e9c73e8eb92a31ee` through `e2f3cee99663816706d5b3ad142b0e84d6dac7da`; zero actionable comments |
| Qodo review | PASS — zero bugs and zero rule violations after reconciliation |
| review threads | PASS — zero unresolved threads |
| implementation scope | PASS — exactly six authorized paths, 1,593 additions and zero deletions from the canonical authorization base |
| local runtime | PASS — 865 tests; 763 passed; 102 intentionally skipped; 0 failed |
| focused K4-R1 tests | PASS — 13 passed, including zero-trap hostile-proxy regressions |
| Python / Ruff / strict TypeScript / provenance | PASS |
| spend and protected boundaries | PASS — spend `$0`; PR #163 and every Z0-family surface untouched |

## Canonical K4-R1 surface

Canonical adoption establishes only:

- exact immutable standard and licensing-evidence pins;
- the closed MCP, ACP, and Agent Skills object-kind vocabulary;
- explicit `UNRESOLVED`, `SINGLE`, and `COMPOSITE` normalization dispositions;
- deterministic content-addressed pin, binding, and snapshot identities;
- an ephemeral data-only registry bound to canonical H1 adapter descriptors;
- exact provider-role, conflict, capacity, discovery, and ownership-safe disposal semantics;
- a closed Draft 2020-12 schema and dedicated implementation workflow.

The governing invariant remains:

```text
EXTERNAL DECLARATION != NORMALIZED SEMANTIC MAPPING
NORMALIZED SEMANTIC MAPPING != TRUST
REGISTRY MEMBERSHIP != EXECUTION AUTHORITY
PORTABLE ALLOWED-TOOLS METADATA != KODAC APPROVAL
```

## Preserved non-grants

Canonical K4-R1 does not establish or authorize:

- MCP client/server transport, discovery, session, or invocation;
- ACP agent/client transport, session, permission, or filesystem behavior;
- Agent Skills parsing, installation, activation, instruction loading, or script/hook/workflow/binary execution;
- network, filesystem, process, secret, persistence, or external-registry authority;
- donor source or dependency intake, a new Kodac dependency, or dynamic code loading;
- a tool/model provider registry, ExecutionGateway or Trust Kernel change, policy change, or K2 authority expansion;
- repository write, GitHub review/comment, approval, merge, verification, or `PROVEN_READY` authority;
- K4 closure, K4-R2+, K5, K6, K7, KRI-R5+, public release, package publication, or brand launch.

PR #163, all Z0-family work, zrok, paid review/provider spend, real secrets, GitHub Apps, webhooks, and founder-process trust-root establishment remain outside this gate and untouched.

## Exact documentation scope

This canonicalization candidate may change exactly:

```text
docs/planning/KODAC_K4_R1_COMPATIBILITY_NORMALIZATION_CANONICAL_EVIDENCE_2026-08-24.md
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
| K4 authorization and implementation ancestry | PASS |
| K4-R1 ordered-parent proof | PASS — `f64a5f1ddbe57970d214c2f7b042fa421a0562fa`, then `e2f3cee99663816706d5b3ad142b0e84d6dac7da` |
| K4-R1 merge-tree equality | PASS — `490e057252bda42243471a6b755bfc7bb79966cd` |
| exact documentation scope | PASS — exactly five paths |
| `npm test --prefix packages/kodac-runtime` | PASS — 865 tests; 763 passed; 102 intentionally skipped; 0 failed |
| `uv run pytest` | PASS — 395 passed |
| `uv run ruff check .` | PASS |
| strict TypeScript `tsc --noEmit` for `packages/kodac-runtime` | PASS |
| `uv run python tools/validate_provenance.py` | PASS |
| `git diff --check` | PASS |

These results establish local candidate cleanliness. Canonical adoption still requires the exact-head CI, review, merge, and post-merge proof below.

## Merge gate

This evidence becomes canonical and K4-R1 becomes complete for its bounded authorized scope only if:

- the final diff is exactly this record plus the four current-authority surfaces;
- canonical `main` remains the exact expected base or the candidate is explicitly reconciled without scope expansion;
- the K4 authorization and implementation merges remain ancestors of the candidate;
- the K4-R1 merge retains the exact ordered parents and qualified-tree equality recorded above;
- full repository validation and docs-only CI are green on the exact head;
- normal included review is terminal with zero current material findings and zero unresolved actionable threads;
- merge uses exact expected-head semantics and preserves the intended five-path tree;
- post-merge canonical proof re-verifies the merge parent order and tree equality.

Canonical adoption does not close K4 or authorize a later implementation gate, protected operation, provider spend, Z0-family action, trust-root establishment, or PR #163 work.
