# Kodac K4-R3 Pinned ACP v2 Method Catalog Evidence Canonical Evidence

## Record identity

- Date: 2026-08-24
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-24`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION CANONICALIZATION
- Canonical base commit: `46ad98180af290081a914f1c78e5c7519d6f5749`
- Canonical base tree: `6ac1427d23984b292672dc4c5f2389b7b25d7a59`
- K4-R3 authorization merge: `17bbd953d0cd9860a8fdabbe3346b52ca20b359c` (PR #178)
- K4-R2 workflow-hardening qualified head: `3f6080c8eb4e5be60a69d493707e53efbd463c01`
- K4-R2 workflow-hardening qualified tree: `f05de1ec77ceb042fc829f81e51443a33c759177`
- K4-R2 workflow-hardening merge: `073505d8dce35439f9cf9d7d402c98eec34ac682` (PR #179)
- K4-R3 qualified implementation head: `fac784d9978ca8a5774b7dc9d2ac0225d24e752c`
- K4-R3 qualified implementation tree: `6ac1427d23984b292672dc4c5f2389b7b25d7a59`
- K4-R3 implementation merge: `46ad98180af290081a914f1c78e5c7519d6f5749` (PR #180)

## Decision

Conditionally adopt the exact bounded K4-R3 implementation only if this evidence candidate passes the exact merge gate below:

```text
K4: DEFINED / IN PROGRESS / NOT CLOSED
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY SCOPE
K4-R2 PREIMPLEMENTATION K4-R1 WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH SCOPE
K4-R2 CANONICAL-REGRESSION WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH PREREQUISITE SCOPE
K4-R3: CANONICAL / COMPLETE IFF THIS EVIDENCE MERGE GATE PASSES; OTHERWISE CANONICALIZATION CANDIDATE
K4-R4+: NOT AUTHORIZED
```

Only after every condition in the merge gate passes does this decision make the inert, pinned ACP v2 method-catalog evidence surface canonical. It does not close K4, authorize K4-R4, create an ACP client or agent, parse or send JSON-RPC, connect to a peer, advertise or negotiate capabilities, operate an ACP method, or turn a standard pin, method name, metadata digest, normalized binding, or registry membership into authority.

## Canonical implementation ledger

| Gate | Canonical identity | Accepted bounded outcome |
| --- | --- | --- |
| K4-R3 authorization | `17bbd953d0cd9860a8fdabbe3346b52ca20b359c` (PR #178) | exact official ACP v2 evidence, fixed 16-method data-only contract, ordered prerequisite, five-path implementation allowlist, and preserved non-grants |
| K4-R2 canonical-regression workflow hardening | `073505d8dce35439f9cf9d7d402c98eec34ac682` (PR #179) | exact one-path prerequisite preserving canonical K4-R2 artifacts and exports while admitting separately authorized sibling modules through their own gates |
| K4-R3 implementation | `46ad98180af290081a914f1c78e5c7519d6f5749` (PR #180) | immutable pinned ACP v2 method-catalog evidence, exact binding-state correlation, closed Draft 2020-12 schema, and dedicated implementation/regression workflow |

All three records descend from canonical K4-R2 evidence merge `61afa9c7abb5a9d155e8a83143302853564346ff`, K4-R2 implementation merge `153b30b5187804c9eb31a25759d0646e4235ddfc`, canonical K4-R1 evidence merge `f8ad3faab690487f2e9490664c539c281e8fde44`, canonical H1 descriptor-registry merge `ec2558129fc69e8586fffb8d36dfe42e6a333573`, and canonical K3 closeout merge `67141074fb649b449ca18dbab92872884e7cad58`.

The prerequisite workflow-hardening merge has the exact ordered parents:

```text
parent 1: 17bbd953d0cd9860a8fdabbe3346b52ca20b359c
parent 2: 3f6080c8eb4e5be60a69d493707e53efbd463c01
```

Its merge tree is exactly the qualified hardening tree:

```text
merge tree:     f05de1ec77ceb042fc829f81e51443a33c759177
qualified tree: f05de1ec77ceb042fc829f81e51443a33c759177
```

The K4-R3 implementation merge has the exact ordered parents:

```text
parent 1: 073505d8dce35439f9cf9d7d402c98eec34ac682
parent 2: fac784d9978ca8a5774b7dc9d2ac0225d24e752c
```

Its merge tree is exactly the qualified implementation tree and current canonical `main` tree:

```text
merge tree:     6ac1427d23984b292672dc4c5f2389b7b25d7a59
qualified tree: 6ac1427d23984b292672dc4c5f2389b7b25d7a59
main tree:      6ac1427d23984b292672dc4c5f2389b7b25d7a59
```

## Exact primary-standard evidence

The canonical implementation preserves the ACP standard pin and every official evidence identity recorded by the authorization:

- repository `agentclientprotocol/agent-client-protocol`;
- upstream commit `62c74ac119ec3296809496482440afca69926ce9`;
- upstream tree `130153620c8e8a7d2934b19bd3442566bee7a6ea`;
- specification revision `v2`;
- K4-R1 ACP standard-pin identity `b75626aa97bed5c4208200c9b4469d5ebc0ca35cb2a9fa1b0a7341ec4dadfdec`;
- exact method-map blob `ad2cfd937a0722893fa577e4ff96df5c79cdc23c`;
- normative schema blob `021d16481f3d833eff017e5128b9fe8927d45b05`;
- overview, initialization, cancellation, extensibility, and Apache-2.0 evidence blobs `4d5e4012f9ccd6b9a3e8ad3e2d3dab55cdbe2b44`, `b124fdfeed5292b98fa2cd16b22624c3bcd67680`, `00795cbfb29b1bf9407541ed817f2bca392fbb5f`, `370909fd5ce0d30503ce32451c943ae0aa3e2a9a`, and `1de02305f81f6dc087b6229a1d86a31774d2fa31`.

These are read-only evidence pins. They admit no upstream source expression, generated schema, SDK, package, executable, hook, workflow, binary, or dependency.

## Exact canonical artifact evidence

The final implementation head preserves the reviewed canonical artifact candidate `fa5356ec8300d09011b5b0f772a92ab2aedabd05` and its tree `80651754d206c7bec7d334501ec6edbb85d7fd0e` through workflow-only repairs. The canonical artifact blobs are:

| Artifact | Blob |
| --- | --- |
| closed Draft 2020-12 schema | `0d33a03fb2bca61c678a6b8e2d09019c67fb3916` |
| production method-catalog module | `ff8e4572ecb803401ee9f096f6f3ac32a4792baf` |
| K4-R3 evidence test | `625bc3eeb305893d0a66f89e0af737594ea752fc` |

The implementation merge preserves the exact five authorized paths and no dependency or lockfile change:

```text
.github/workflows/k4-r3-acp-method-catalog-evidence.yml
schema/k4-r3-acp-method-catalog-evidence.schema.json
packages/kodac-runtime/src/compatibility/acp-method-catalog.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k4-r3-acp-method-catalog-evidence.test.ts
```

## Canonical pinned method inventory

The canonical catalog contains exactly these 16 immutable records, sorted by exact external method name:

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

No method is accepted from a caller, inferred from prose, discovered from a peer, or admitted from a custom namespace or `_meta` field.

## Required-proof matrix

| Authorized K4-R3 proof | Canonical evidence | Result |
| --- | --- | --- |
| exact ACP pin and official evidence blobs | immutable constants plus exact runtime assertions for every recorded identity | PASS |
| exact fixed inventory | exactly 16 authorized names with exact object-kind, message-kind, and direction records | PASS |
| closed caller input | only ACP pin, adapter extension identity, and descriptor identity; unknown or protocol-bearing fields fail closed | PASS |
| deterministic method metadata | canonical closed JSON, UTF-8, and SHA-256 over every identity-bearing catalog field | PASS |
| one immutable registry snapshot | one canonical non-Proxy K4-R1 registry snapshot captured before correlation and bound into the catalog identity | PASS |
| exact tuple correlation | pin, object kind, external name, extension identity, and descriptor identity match exactly | PASS |
| exact state-dependent evidence | only `UNBOUND`, `CURRENT`, or `STALE`; capabilities/disposition only for `CURRENT`; stale identity only for `STALE` | PASS |
| hook-free hostile-data rejection | direct and nested Proxy rejection before caller reflection plus accessor, symbol, prototype, unknown-field, non-JSON, and malformed-identity failures | PASS |
| immutable lifetime | catalog, source evidence, adapter evidence, entries, and capability arrays are frozen and do not refresh after registry mutation | PASS |
| schema/runtime agreement | Draft 2020-12 exact length, vocabularies, identity formats, nullability, and state-dependent fields | PASS |
| data-only purity | production imports limited to deterministic `node:crypto`, hook-free `node:util`, and canonical local K4-R1 contracts/registry | PASS |
| no authority-bearing integration | no ACP SDK, JSON-RPC, client/agent, transport, capability negotiation, auth, session, prompt, permission, filesystem, terminal, update, elicitation, cancellation, provider, policy, receipt, verification, or Done-Gate surface | PASS |
| repository qualification | runtime, focused K4-R3, Python, Ruff, strict TypeScript, provenance, scope, purity, schema, immutable-action, branch, exact-head, and checkout-unchanged gates | PASS |

## Review and qualification evidence

The qualified implementation head incorporated every verified actionable finding:

- the package-export assertion accepts both LF and CRLF checkouts while preserving the exact required export text;
- the workflow purity scan no longer contains the malformed grep expression introduced during repair and retains the authorized fail-closed import and forbidden-surface checks;
- the final commit chain remains a strict one-parent chain from the canonical K4-R2 hardening merge, so an extra normal commit cannot bypass exact-head admission;
- every Action reference is structurally attested and pinned to an immutable upstream commit;
- the provenance validator is byte-bound before execution.

Final exact-head evidence on `fac784d9978ca8a5774b7dc9d2ac0225d24e752c`:

| Evidence | Result |
| --- | --- |
| required GitHub Actions | PASS — K2 runtime run #979, governance #2300, K4-R1 #21, K4-R2 #12, K4-R3 #5, K3-R4 #485, K3-R5 #458, and K3-R6 #18 |
| Qodo final exact-head review | PASS — exact-head report linked to `fac784d9978ca8a5774b7dc9d2ac0225d24e752c`; zero bugs and zero rule violations |
| CodeRabbit findings | PASS — CRLF and workflow-grep findings repaired; no CodeRabbit result was relied upon as the terminal exact-head review |
| review threads | PASS — all three actionable threads resolved; zero unresolved actionable threads |
| implementation scope | PASS — exactly five authorized paths |
| local runtime | PASS — 898 tests; 796 passed; 102 intentionally skipped; 0 failed |
| Python / Ruff / strict TypeScript / provenance | PASS |
| pristine exact-head workflow replay | PASS — admission, scope, schema, purity, Python, Ruff, provenance, full runtime, and checkout-unchanged gates |
| spend and protected boundaries | PASS — spend `$0`; PR #163 and every Z0-family surface untouched |

The exact final implementation chain is:

```text
fac784d9978ca8a5774b7dc9d2ac0225d24e752c
  -> b51f2e88fb1426ed72127100bd84566724bbd925
  -> fa5356ec8300d09011b5b0f772a92ab2aedabd05
  -> 3755a653dbb66bd77ee18fa9084f3e06a7e9821d
  -> 9a48306feb010211ae1a4e1eaacaa1bfa5ba2949
  -> 073505d8dce35439f9cf9d7d402c98eec34ac682
```

Every link is an exact one-parent link. The qualified head, canonical artifact candidate, prerequisite merge, trees, and blobs above are the canonical full identities.

## Canonical K4-R3 surface

Canonical adoption establishes only:

- the exact `k4-r3-acp-method-catalog-evidence-v1` contract;
- a fixed catalog of the 16 pinned ACP v2 method records above;
- derived deterministic method-metadata identities;
- one immutable canonical K4-R1 binding snapshot per materialization;
- exact `UNBOUND`, `CURRENT`, or `STALE` correlation evidence;
- content-addressed immutable entries and catalog output;
- a closed Draft 2020-12 schema;
- a dedicated implementation and continuing canonical-regression workflow;
- continuing byte-exact K4-R2 artifact/export protection through the separately canonicalized prerequisite gate.

The governing invariant remains:

```text
PINNED METHOD INVENTORY != LIVE ACP DISCOVERY
METHOD DEFINITION != PEER CAPABILITY ADVERTISEMENT
CAPABILITY ADVERTISEMENT != SUPPORT PROOF OR AUTHORITY
CURRENT NORMALIZATION != SESSION, PERMISSION, OR EXECUTION AUTHORITY
NOTIFICATION NAME != SUBSCRIPTION OR DELIVERY AUTHORITY
UNBOUND OR STALE METHOD != FALLBACK PERMISSION
CUSTOM METHOD OR _META DATA != CANONICAL STANDARD METHOD
```

## Preserved non-grants

Canonical K4-R3 does not establish or authorize:

- ACP JSON-RPC parsing/serialization, client/agent behavior, transport, connection, initialization, capability negotiation, authentication, or session behavior;
- auth login/logout, session operations, prompt, permission, filesystem, terminal, editor, resource, update, elicitation, or cancellation behavior;
- custom-method or `_meta` interpretation, peer capability interpretation, discovery, delivery, subscription, invocation, fallback, or execution;
- MCP scope expansion or Agent Skills implementation;
- donor source/schema/SDK/dependency intake, a new Kodac package or dependency, or dynamic code loading;
- network, filesystem, process, secret, persistence, external-registry, ExecutionGateway, Trust Kernel, policy, K2 authority, or `PROVEN_READY` change;
- repository write, external reviewer integration, GitHub comment/review, approval, or merge authority from K4-R3 itself;
- K4 closure, K4-R4+, K5, K6, K7, KRI-R5+, public release, package publication, or brand launch.

PR #163, all Z0-family work, Z0L execution, zrok, paid review/provider spend, real secrets, GitHub Apps, webhooks, public endpoints, external account setup, and founder-process trust-root establishment remain outside this gate and untouched.

## Exact documentation scope

This canonicalization candidate may change exactly:

```text
docs/planning/KODAC_K4_R3_PINNED_ACP_V2_METHOD_CATALOG_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md
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
| K4-R2 evidence and K4-R3 authorization ancestry | PASS |
| K4-R2 workflow-hardening ordered-parent proof | PASS — `17bbd953d0cd9860a8fdabbe3346b52ca20b359c`, then `3f6080c8eb4e5be60a69d493707e53efbd463c01` |
| K4-R2 workflow-hardening merge-tree equality | PASS — `f05de1ec77ceb042fc829f81e51443a33c759177` |
| K4-R3 ordered-parent proof | PASS — `073505d8dce35439f9cf9d7d402c98eec34ac682`, then `fac784d9978ca8a5774b7dc9d2ac0225d24e752c` |
| K4-R3 merge-tree equality | PASS — `6ac1427d23984b292672dc4c5f2389b7b25d7a59` |
| exact documentation scope | PASS — exactly five paths |
| `npm test --prefix packages/kodac-runtime` | PASS — 898 tests; 796 passed; 102 intentionally skipped; 0 failed |
| `uv run pytest -p no:cacheprovider` | PASS — 395 passed |
| `uv run ruff check --no-cache .` | PASS |
| strict TypeScript `tsc --noEmit` for `packages/kodac-runtime` | PASS |
| `uv run python tools/validate_provenance.py` | PASS |
| `git diff --check` | PASS |

These results establish local candidate cleanliness. Canonical adoption still requires the exact-head CI, review, merge, and post-merge proof below.

## Merge gate

This evidence becomes canonical and K4-R3 becomes complete for its bounded authorized scope only if:

- the final diff is exactly this record plus the four current-authority surfaces;
- canonical `main` remains the exact expected base or the candidate is explicitly reconciled without scope expansion;
- the K4-R2 evidence, K4-R3 authorization, prerequisite-hardening, and K4-R3 implementation merges remain ancestors of the candidate;
- both implementation merges retain the exact ordered parents and qualified-tree equality recorded above;
- full repository validation and docs-only CI are green on the exact head;
- normal included review is terminal with zero current material findings and zero unresolved actionable threads;
- merge uses exact expected-head semantics and preserves the intended five-path tree;
- post-merge canonical proof re-verifies the merge parent order and tree equality.

Until every condition above passes, this record is a canonicalization candidate and K4-R3 remains implemented and qualified but not canonically adopted.

Canonical adoption does not close K4 or authorize K4-R4, a protected operation, provider spend, Z0-family action, trust-root establishment, public release, or PR #163 work.
