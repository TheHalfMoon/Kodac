# Kodac K4-R3 Pinned ACP v2 Method Catalog Evidence Authorization

## Record identity

- Date: 2026-08-24
- Founder authority: `KODAC-FOUNDER-CONTINUOUS-REPO-LOCAL-PLAN-EXECUTION-2026-08-24`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION AUTHORIZATION / ORDERED CI PREREQUISITE
- Canonical base commit: `61afa9c7abb5a9d155e8a83143302853564346ff`
- Canonical base tree: `b0bf2633aa830e7ccebd8b3a0cb82524dc62e1e3`
- K4-R1 implementation merge: `034da7bfeee9439828ea0f639c7ce63ee0b3b9da` (PR #171)
- K4-R1 canonical evidence merge: `f8ad3faab690487f2e9490664c539c281e8fde44` (PR #172)
- K4-R2 implementation merge: `153b30b5187804c9eb31a25759d0646e4235ddfc` (PR #176)
- K4-R2 canonical evidence merge: `61afa9c7abb5a9d155e8a83143302853564346ff` (PR #177)
- Accepted compatibility architecture: `docs/adr/ADR-0007-native-mcp-acp-agent-skills-compatibility.md`

## Decision

Authorize only the third bounded K4 slice and its ordered, one-path CI prerequisite:

```text
K4: DEFINED / IN PROGRESS / NOT CLOSED
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY SCOPE
K4-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY SCOPE
K4-R2 CANONICAL-REGRESSION WORKFLOW HARDENING: EXACT ONE-PATH IMPLEMENTATION AUTHORIZED
K4-R3 SOURCE PR BEFORE THAT HARDENING IS CANONICALLY MERGED: NOT ADMISSIBLE
K4-R3: PINNED DATA-ONLY ACP V2 METHOD CATALOG EVIDENCE IMPLEMENTATION AUTHORIZED
K4-R3 IMPLEMENTATION: NOT YET CANONICAL
K4-R4+: NOT AUTHORIZED
```

K4-R3 may materialize the exact 16 method names defined by the already-canonical ACP v2 pin and correlate their deterministic metadata digests with one immutable K4-R1 binding-registry snapshot. It does not send or parse JSON-RPC, connect an ACP client or agent, initialize a protocol session, advertise or negotiate capabilities, authenticate, prompt, cancel work, request permission, access a filesystem or terminal, update a session, elicit data, or execute any method.

## Why this is the next bounded gate

ADR-0007 orders the compatibility direction as MCP, ACP, then Agent Skills. Canonical K4-R2 establishes inert MCP catalog evidence without transport or execution. Canonical K4-R1 already reserves the exact ACP object kinds:

```text
ACP_AGENT_METHOD
ACP_CLIENT_METHOD
ACP_NOTIFICATION
```

The smallest useful ACP successor is therefore not a client, agent, session, or JSON-RPC parser. It is a fixed evidence projection that answers only:

```text
For the exact method inventory in the pinned ACP v2 schema,
what is each method's request/notification direction,
and is its deterministic metadata record unbound, current, or stale
relative to one exact K4-R1 adapter binding snapshot?
```

This exposes compatibility coverage and drift while preserving the rule that protocol names, advertised capabilities, catalog membership, and normalized bindings are not authority.

## Exact primary-source basis

K4-R3 remains pinned to the canonical ACP standard identity from K4-R1:

- repository: `agentclientprotocol/agent-client-protocol`;
- commit: `62c74ac119ec3296809496482440afca69926ce9`;
- tree: `130153620c8e8a7d2934b19bd3442566bee7a6ea`;
- specification revision: `v2`;
- K4-R1 ACP standard-pin identity: `b75626aa97bed5c4208200c9b4469d5ebc0ca35cb2a9fa1b0a7341ec4dadfdec`;
- v2 overview blob: `4d5e4012f9ccd6b9a3e8ad3e2d3dab55cdbe2b44`;
- Apache-2.0 licensing-evidence blob: `1de02305f81f6dc087b6229a1d86a31774d2fa31`.

The exact additional official evidence inspected for this gate is:

| ACP v2 surface | Pinned path | Blob |
| --- | --- | --- |
| exact method-name map | `schema/v2/meta.json` | `ad2cfd937a0722893fa577e4ff96df5c79cdc23c` |
| normative request/notification unions and directions | `schema/v2/schema.json` | `021d16481f3d833eff017e5128b9fe8927d45b05` |
| protocol overview and request/notification semantics | `docs/protocol/v2/overview.mdx` | `4d5e4012f9ccd6b9a3e8ad3e2d3dab55cdbe2b44` |
| capability advertisement and conditional support | `docs/protocol/v2/initialization.mdx` | `b124fdfeed5292b98fa2cd16b22624c3bcd67680` |
| bidirectional cancellation notification | `docs/protocol/v2/cancellation.mdx` | `00795cbfb29b1bf9407541ed817f2bca392fbb5f` |
| custom-method and `_meta` extension boundary | `docs/protocol/v2/extensibility.mdx` | `370909fd5ce0d30503ce32451c943ae0aa3e2a9a` |

These upstream files are read-only evidence. No ACP source expression, generated schema, SDK, dependency, fixture, workflow, hook, script, or binary is admitted.

## Governing invariants

```text
PINNED METHOD INVENTORY != LIVE ACP DISCOVERY
METHOD DEFINITION != PEER CAPABILITY ADVERTISEMENT
CAPABILITY ADVERTISEMENT != SUPPORT PROOF OR AUTHORITY
CURRENT NORMALIZATION != SESSION, PERMISSION, OR EXECUTION AUTHORITY
NOTIFICATION NAME != SUBSCRIPTION OR DELIVERY AUTHORITY
UNBOUND OR STALE METHOD != FALLBACK PERMISSION
CUSTOM METHOD OR _META DATA != CANONICAL STANDARD METHOD
```

All peer-supplied JSON-RPC envelopes, capability objects, auth methods, session data, prompts, permission requests, updates, elicitation data, `_meta`, custom methods, and extension fields remain untrusted external evidence and are outside this gate.

## Exact pinned method inventory

The catalog contains exactly these immutable records:

| External method name | K4-R1 object kind | Message kind | Direction |
| --- | --- | --- | --- |
| `$/cancel_request` | `ACP_NOTIFICATION` | `NOTIFICATION` | `BIDIRECTIONAL` |
| `auth/login` | `ACP_AGENT_METHOD` | `REQUEST` | `CLIENT_TO_AGENT` |
| `auth/logout` | `ACP_AGENT_METHOD` | `REQUEST` | `CLIENT_TO_AGENT` |
| `elicitation/complete` | `ACP_NOTIFICATION` | `NOTIFICATION` | `AGENT_TO_CLIENT` |
| `elicitation/create` | `ACP_CLIENT_METHOD` | `REQUEST` | `AGENT_TO_CLIENT` |
| `initialize` | `ACP_AGENT_METHOD` | `REQUEST` | `CLIENT_TO_AGENT` |
| `session/cancel` | `ACP_NOTIFICATION` | `NOTIFICATION` | `CLIENT_TO_AGENT` |
| `session/close` | `ACP_AGENT_METHOD` | `REQUEST` | `CLIENT_TO_AGENT` |
| `session/delete` | `ACP_AGENT_METHOD` | `REQUEST` | `CLIENT_TO_AGENT` |
| `session/list` | `ACP_AGENT_METHOD` | `REQUEST` | `CLIENT_TO_AGENT` |
| `session/new` | `ACP_AGENT_METHOD` | `REQUEST` | `CLIENT_TO_AGENT` |
| `session/prompt` | `ACP_AGENT_METHOD` | `REQUEST` | `CLIENT_TO_AGENT` |
| `session/request_permission` | `ACP_CLIENT_METHOD` | `REQUEST` | `AGENT_TO_CLIENT` |
| `session/resume` | `ACP_AGENT_METHOD` | `REQUEST` | `CLIENT_TO_AGENT` |
| `session/set_config_option` | `ACP_AGENT_METHOD` | `REQUEST` | `CLIENT_TO_AGENT` |
| `session/update` | `ACP_NOTIFICATION` | `NOTIFICATION` | `AGENT_TO_CLIENT` |

The catalog is sorted by exact external method name using code-unit ordering. No method is inferred from prose, capability data, a live peer, or an extension namespace. `_`-prefixed custom methods are excluded.

## Authorized K4-R3 contract

K4-R3 may add one pure TypeScript module that accepts only an adapter identity, captures one canonical registry snapshot, and returns immutable content-addressed evidence for the fixed catalog above.

### Version and closed vocabularies

The exact contract version is:

```text
k4-r3-acp-method-catalog-evidence-v1
```

Only these canonical K4-R1 object kinds are emitted:

```text
ACP_AGENT_METHOD
ACP_CLIENT_METHOD
ACP_NOTIFICATION
```

The exact message-kind vocabulary is:

```text
REQUEST
NOTIFICATION
```

The exact direction vocabulary is:

```text
CLIENT_TO_AGENT
AGENT_TO_CLIENT
BIDIRECTIONAL
```

The exact derived binding-state vocabulary is:

```text
UNBOUND
CURRENT
STALE
```

### Closed caller input

The caller input may contain only:

- the exact canonical ACP `standardPinIdentity`;
- one H1/K4 adapter `extensionId`; and
- that adapter's exact `descriptorIdentity`.

The supplied second argument must be a canonical, non-Proxy `CompatibilityBindingRegistry`. K4-R3 accepts no method name, method list, raw schema, JSON-RPC envelope, capability map, auth method, session identifier, prompt, permission request, update, elicitation payload, cancellation token, `_meta`, custom method, transport data, or caller-supplied method metadata.

### Deterministic method metadata

For each fixed method, `externalMetadataSha256` is derived with the canonical K4-R1 closed canonical-JSON, UTF-8, SHA-256 algorithm from exactly:

```text
version
standardPinIdentity
externalName
objectKind
messageKind
direction
```

The digest is evidence of the exact pinned catalog record. It is not a digest of a peer implementation, runtime capability object, request, response, or live server/agent state.

### Exact binding correlation

Materialization must capture one immutable `CompatibilityBindingSnapshot` from the supplied K4-R1 registry before correlating any method. The catalog output binds to that snapshot's `snapshotIdentity`.

For each method, K4-R3 selects only a binding whose exact tuple matches:

```text
canonical ACP standardPinIdentity
derived ACP objectKind
exact externalName
adapter extensionId
adapter descriptorIdentity
```

The derived state is:

- `UNBOUND` when no exact tuple match exists;
- `CURRENT` when one exact tuple match exists and its `externalMetadataSha256` equals the derived method metadata digest;
- `STALE` when one exact tuple match exists but its metadata digest differs.

`CURRENT` preserves the exact K4-R1 `bindingIdentity`, disposition, and sorted normalized capability identifiers as evidence. `UNBOUND` and `STALE` expose no normalized capability identifiers and no disposition. `STALE` may preserve only the stale matched `bindingIdentity` as drift evidence.

K4-R3 never registers, replaces, refreshes, removes, or otherwise mutates a K4-R1 binding. It never falls back from `UNBOUND` or `STALE` to a method name, peer capability, schema field, `_meta`, custom method, or caller assertion.

### Deterministic identities and snapshot lifetime

Each entry identity hashes the complete derived entry excluding its identity. The catalog identity hashes the complete immutable output, including exact source evidence, adapter identity, binding snapshot identity, and all 16 sorted entries, excluding only the catalog identity.

The returned catalog and every nested record/array are immutable. Later registry registration or disposal does not mutate or silently refresh prior evidence. No clock, randomness, cache, global state, network, filesystem, process, environment variable, or dynamic loader is read.

## Ordered one-path K4-R2 workflow prerequisite

The canonical K4-R2 workflow still admits only its historical implementation PR #176. Because it triggers on the shared `packages/kodac-runtime/src/index.ts`, it would reject the exact K4-R3 implementation before evaluating the new slice.

After canonical adoption of this authorization, one separate prerequisite PR may change exactly:

```text
.github/workflows/k4-r2-mcp-catalog-evidence.yml
```

The hardening branch must be exactly:

```text
codex/k4-r2-canonical-regression-hardening
```

The hardening must preserve the historical one-time K4-R2 implementation evidence while converting the workflow to two closed modes:

1. exact one-time hardening admission on the branch above, bound to this authorization's canonical merge, exact PR identity, exact head, clean checkout, and exact one-path diff; and
2. continuing canonical-regression mode on every other triggering PR, where the workflow itself may not change and the canonical K4-R2 schema, production module, test, K4-R1 dependencies, and required shared exports remain byte-exact.

The continuing gate must pin at least:

```text
K4-R2 qualified implementation head = ae68279bbbc5abc545575b4c8cc44928e483eec5
K4-R2 qualified implementation tree = efd1f763294cf03da5dec5339a0855af2861263e
schema blob = b2122d8486190ace7816a37caa0c09f6b1351db7
production module blob = b56f3de677bf2415eb6505056003ef03de3d3682
test blob = 1e9e3976ef2b000bc398df99c12cf4de76447f3b
```

It must preserve exact K4-R1 and K4-R2 exports while allowing separately authorized sibling exports. It must retain immutable Action pins, structural Action-reference validation, full runtime/Python/Ruff/provenance/schema checks, K4-R2 purity checks, and checkout-unchanged attestation.

This one-path repair becomes canonical without a separate evidence PR only if its final exact head passes local and GitHub qualification, included review is terminal with zero current material findings and zero unresolved actionable threads, expected-head merge succeeds, and ordered-parent/tree/main post-merge proof passes. K4-R3 source work is inadmissible until then.

## Exact K4-R3 implementation allowlist

After the prerequisite hardening is canonically merged, the K4-R3 implementation PR may change exactly:

```text
.github/workflows/k4-r3-acp-method-catalog-evidence.yml
schema/k4-r3-acp-method-catalog-evidence.schema.json
packages/kodac-runtime/src/compatibility/acp-method-catalog.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k4-r3-acp-method-catalog-evidence.test.ts
```

The implementation branch must be exactly:

```text
codex/k4-r3-acp-method-catalog-evidence
```

The dedicated workflow must bind its implementation-admission mode to the exact canonical hardening merge, exact branch, exact PR identity, exact head, and exact five-path diff. From its first canonical implementation it must also contain a closed continuing canonical-regression mode: on every other triggering PR the workflow itself and canonical K4-R3 artifacts remain byte-exact while the exact required export remains present. This prevents the one-time gate from obstructing later separately authorized siblings.

Only immutable verified Action commits already admitted in the repository may be used. Production code may import only deterministic `node:crypto`, hook-free Proxy detection from `node:util`, and canonical local K4-R1 contracts/registry. No package or dependency is admitted.

## Required K4-R3 implementation proofs

The implementation must prove at least:

1. the exact ACP standard pin and every official evidence blob above remain unchanged;
2. the catalog contains exactly the 16 authorized names and exact object-kind/message-kind/direction records;
3. no caller can add, remove, rename, reorder, or redefine a method;
4. custom methods, `_meta`, raw JSON-RPC, capabilities, auth/session/prompt/permission/update/elicitation/cancellation payloads, and unknown fields are never accepted or emitted;
5. method metadata digests are deterministic, content-addressed, and change with every identity-bearing field;
6. a canonical immutable K4-R1 binding snapshot is captured before correlation and its identity is bound into the catalog;
7. `UNBOUND`, `CURRENT`, and `STALE` are derived from the exact tuple and metadata-digest rules;
8. `UNBOUND` and `STALE` never expose normalized capability identifiers or disposition and never fall back to external evidence;
9. materialization does not mutate registry content, size, serials, receipts, or prior snapshots;
10. direct and nested proxies execute zero caller traps, while accessors, symbols, custom prototypes, unknown fields, malformed identities, and non-JSON values fail closed before identity construction;
11. every result and nested value is frozen, stable across input key order, and independent of later registry mutation;
12. schema conditions, exact array length, closed vocabularies, identity formats, nullability, and state-dependent fields match runtime behavior;
13. production code has no ACP SDK, client/agent, JSON-RPC parser/serializer, transport, connection, initialization, capability negotiation, auth, session behavior, prompt, permission, filesystem, terminal, update delivery, elicitation behavior, cancellation behavior, network, process, secret, dynamic import, cache, timer, polling, subscription, provider registry, ExecutionGateway, Trust Kernel, policy, receipt, verification, or Done-Gate surface;
14. the dedicated workflow's implementation and continuing-regression modes fail closed with exact immutable Action references and unchanged checkout;
15. full runtime, focused K4-R3, strict TypeScript, Python, Ruff, scope, purity, provenance, Draft 2020-12 schema, branch, exact-head, and checkout-unchanged gates are green.

## Explicit non-grants

```text
ACP JSON-RPC PARSING OR SERIALIZATION: NOT AUTHORIZED
ACP CLIENT OR AGENT: NOT AUTHORIZED
ACP TRANSPORT OR CONNECTION: NOT AUTHORIZED
INITIALIZE CALL OR CAPABILITY NEGOTIATION: NOT AUTHORIZED
AUTH LOGIN / LOGOUT BEHAVIOR: NOT AUTHORIZED
SESSION NEW / LIST / RESUME / DELETE / CLOSE / CONFIG / PROMPT / CANCEL: NOT AUTHORIZED
SESSION UPDATE DELIVERY OR SUBSCRIPTION: NOT AUTHORIZED
PERMISSION REQUEST OR DECISION: NOT AUTHORIZED
FILESYSTEM / TERMINAL / EDITOR / RESOURCE BEHAVIOR: NOT AUTHORIZED
ELICITATION CREATE / COMPLETE BEHAVIOR: NOT AUTHORIZED
CANCELLATION DELIVERY OR PROCESSING: NOT AUTHORIZED
CUSTOM METHOD OR _META INTERPRETATION: NOT AUTHORIZED
PEER CAPABILITY OR METHOD NAME AS AUTHORITY: NOT AUTHORIZED

MCP SCOPE EXPANSION: NOT AUTHORIZED
AGENT SKILLS IMPLEMENTATION: NOT AUTHORIZED BY THIS SLICE
DONOR SOURCE / SCHEMA / SDK / DEPENDENCY INTAKE: NOT AUTHORIZED
NEW PACKAGE OR DEPENDENCY: NOT AUTHORIZED
NETWORK / FILESYSTEM / PROCESS / SECRET AUTHORITY: NOT AUTHORIZED
PERSISTENCE OR EXTERNAL REGISTRY: NOT AUTHORIZED
EXECUTIONGATEWAY / TRUST KERNEL / POLICY / K2 AUTHORITY CHANGE: NOT AUTHORIZED
REPOSITORY WRITE / REVIEW / APPROVAL / MERGE / PROVEN_READY AUTHORITY FROM K4-R3: NOT AUTHORIZED

K4-R3 SCOPE EXPANSION: NOT AUTHORIZED
K4-R4+: NOT AUTHORIZED
K5 / K6 / K7 / KRI-R5+ IMPLEMENTATION: NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH: NOT AUTHORIZED
```

PR #163, all Z0-family work, Z0L execution, zrok download/install/execute, paid review/provider spend, real secrets, GitHub Apps, webhooks, public endpoints, external account setup, and founder-process trust-root establishment remain outside this gate and untouched.

## Exact documentation scope

This authorization candidate may change exactly:

```text
docs/planning/KODAC_K4_R3_PINNED_ACP_V2_METHOD_CATALOG_EVIDENCE_AUTHORIZATION_2026-08-24.md
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
| canonical K4-R1 and K4-R2 evidence ancestry | PASS |
| official ACP commit/tree/overview/license identity | PASS |
| official meta/schema/initialization/cancellation/extensibility blobs | PASS |
| exact 16-method inventory | PASS |
| exact documentation scope | PASS — exactly five paths |
| `npm test --prefix packages/kodac-runtime` | PASS — 887 tests; 785 passed; 102 intentionally skipped; 0 failed |
| `uv run pytest -p no:cacheprovider` | PASS — 395 passed |
| `uv run ruff check --no-cache .` | PASS |
| strict TypeScript `tsc --noEmit` for `packages/kodac-runtime` | PASS |
| `uv run python tools/validate_provenance.py` | PASS |
| `git diff --check` | PASS |

These results establish local candidate cleanliness only. Canonical authorization still requires exact-head CI, included review, merge, and post-merge proof.

## Merge gate

This K4-R3 authorization becomes canonical only if:

- the final diff is exactly this record plus the four current-authority surfaces;
- canonical `main` remains the exact expected base or the candidate is explicitly reconciled without scope expansion;
- K4-R1 and K4-R2 canonical evidence merges remain ancestors of the candidate;
- all external ACP pins, exact method records, and evidence blobs are reverified from official primary sources on the final candidate;
- full repository validation and docs-only CI are green on the exact head;
- normal included review is available and terminal with zero current material findings and zero unresolved actionable threads;
- no source, test, schema, workflow, fixture, dependency, lockfile, provenance-policy, ruleset, or protected-lane change occurs;
- merge uses exact expected-head semantics and preserves the intended five-path tree;
- post-merge proof verifies ordered parents, tree equality, and exact `main`.

Canonical adoption authorizes only the ordered one-path K4-R2 workflow hardening and, after that prerequisite becomes canonical, the exact five-path K4-R3 implementation slice above. K4-R3 remains non-canonical until its own exact-head CI, included review, evidence, merge, and post-merge gates pass.
