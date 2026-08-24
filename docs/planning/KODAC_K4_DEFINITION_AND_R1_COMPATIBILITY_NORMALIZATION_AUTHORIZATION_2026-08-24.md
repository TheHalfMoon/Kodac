# Kodac K4 Definition and R1 Compatibility Normalization Authorization

## Record identity

- Date: 2026-08-24
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-24`
- Authority class: DOCUMENTATION / MILESTONE DEFINITION / BOUNDED IMPLEMENTATION AUTHORIZATION
- Canonical base commit: `67141074fb649b449ca18dbab92872884e7cad58`
- Canonical base tree: `cb7ea052200ece8d608b1ad3c53090ba43de9a27`
- K3 canonical closeout merge: `67141074fb649b449ca18dbab92872884e7cad58` (PR #169)
- Accepted compatibility architecture: `docs/adr/ADR-0007-native-mcp-acp-agent-skills-compatibility.md`
- Canonical H1 descriptor-registry merge: `ec2558129fc69e8586fffb8d36dfe42e6a333573` (PR #41)
- Canonical Agent Skills donor-audit merge: `29a20b710edafa520d5eb18b59f7614589229829` (PR #114)

## Decision

Define K4 and authorize only its first data-only foundation:

```text
K4 — ECOSYSTEM COMPATIBILITY & CAPABILITY REGISTRY
K4: DEFINED / IN PROGRESS AFTER CANONICAL ADOPTION OF THIS RECORD
K4-R1: STANDARD-PIN + EXTERNAL-CAPABILITY NORMALIZATION CONTRACT AUTHORIZED
K4-R1 IMPLEMENTATION: NOT YET CANONICAL
K4-R2+: NOT AUTHORIZED
```

K4-R1 does not implement MCP, ACP, or Agent Skills transport/runtime behavior. It establishes deterministic records that preserve exact external-standard identity and bind external names to existing Kodac semantic capability identifiers without turning discovery, normalization, or registry membership into authority.

## Governing invariant

```text
EXTERNAL DECLARATION != NORMALIZED SEMANTIC MAPPING
NORMALIZED SEMANTIC MAPPING != TRUST
REGISTRY MEMBERSHIP != EXECUTION AUTHORITY
PORTABLE ALLOWED-TOOLS METADATA != KODAC APPROVAL
```

Every later compatibility adapter must continue through the accepted ADR-0007 direction:

```text
external standard
-> Kodac adapter
-> Kodac canonical protocol / capability registry
-> ExecutionGateway / Trust Kernel when effects occur
```

K4-R1 stops before the final line. It contains no executable adapter and cannot call the ExecutionGateway.

## Canonical dependency basis

K3 is canonically closed for its bounded R1-R6 surface, so K4 no longer has an incomplete engineering-milestone predecessor.

KDO-H1 already provides:

- bounded versioned extension descriptors;
- namespaced semantic capability identifiers;
- descriptive `DEFINITION`, `PROVIDER`, and `CONSUMER` roles;
- provenance and deterministic descriptor identities;
- a pure in-memory descriptor registry;
- immutable discovery results and ownership-safe disposal;
- the invariant that extension declaration and registration grant no executable authority.

K4-R1 must reuse that boundary. It must not create a competing executable registry or modify the H1 descriptor/registry implementation.

The canonical Agent Skills audit supplies read-only architecture, security, provenance, qualification, and materialization evidence. No donor source, dependency, script, hook, workflow, or binary is admitted by this record.

## Primary-standard baseline pins

The following are research/reference pins only. They are not dependency or source-intake grants.

| Standard | Repository and exact revision | Exact specification evidence | Licensing evidence |
| --- | --- | --- | --- |
| MCP | `modelcontextprotocol/modelcontextprotocol@57ac4a2ec742e0cb7622d899b0f5d3bcf769fd69` / tree `164f5cb7a4a9b72a0b1c81aa0d9eeae5a21688e5` | published revision `2026-07-28`; `docs/specification/2026-07-28/index.mdx` blob `452d78601b135b95bbe45287e756c0579534096b` | `LICENSE` blob `4a93985763241755401a10678395303de4e720ba`; upstream records an MIT-to-Apache-2.0 transition and CC-BY-4.0 for non-specification docs |
| ACP | `agentclientprotocol/agent-client-protocol@62c74ac119ec3296809496482440afca69926ce9` / tree `130153620c8e8a7d2934b19bd3442566bee7a6ea` | v2 overview at `docs/protocol/v2/overview.mdx` blob `4d5e4012f9ccd6b9a3e8ad3e2d3dab55cdbe2b44` | Apache-2.0 `LICENSE` blob `1de02305f81f6dc087b6229a1d86a31774d2fa31` |
| Agent Skills | `agentskills/agentskills@69ef37e9424c0a7ea9dd2293b559e43ec8176379` / tree `65e11c9faad14a022055ce0ff3ebf99f2b55142f` | `docs/specification.mdx` blob `d9a2db099d905da8b879a5c6f996728073985279` | code Apache-2.0 via `LICENSE` blob `a20f4476df158a57a68409015ea607c738856f57`; documentation CC-BY-4.0 via `README.md` blob `247e4a18e908d3bf27092f886f25c2515d84ecbc` |

Relevant official primary-source URLs:

- `https://modelcontextprotocol.io/specification/2026-07-28`
- `https://github.com/agentclientprotocol/agent-client-protocol/tree/62c74ac119ec3296809496482440afca69926ce9/docs/protocol/v2`
- `https://agentskills.io/specification`

The MCP baseline is materially stateless compared with older revisions, ACP v2 is a JSON-RPC agent/client protocol, and Agent Skills packages may contain instructions, references, scripts, and assets. Those facts reinforce the need for exact revision pins and a data-only first gate.

Agent Skills `allowed-tools` is experimental external metadata. K4-R1 may preserve evidence that the field exists in the pinned specification, but it must never interpret the field as Kodac approval or a capability grant.

## Authorized K4-R1 contract

K4-R1 may implement a pure TypeScript contract and deterministic in-memory registry containing only immutable data records.

### Standard pins

The runtime contract may expose the three exact primary-standard pins above as immutable constants. Each pin must bind at least:

- standard identifier;
- upstream repository;
- exact source commit and tree;
- specification revision label where one exists;
- exact specification path and blob;
- exact licensing-evidence path and blob;
- a deterministic pin identity.

No default branch or floating version is accepted at runtime.

### External object vocabulary

The first closed external-object vocabulary is:

```text
MCP_TOOL
MCP_RESOURCE
MCP_PROMPT
ACP_AGENT_METHOD
ACP_CLIENT_METHOD
ACP_NOTIFICATION
AGENT_SKILL
```

This vocabulary classifies declarations only. It does not parse wire messages, invoke methods, load skill content, read assets, or execute scripts.

### Capability binding

An external-capability binding may contain only bounded data fields that establish:

- the exact standard-pin identity;
- the external-object kind and opaque external name;
- an external metadata SHA-256 digest without embedding or trusting the metadata;
- the owning H1 adapter `extensionId` and `descriptorIdentity`;
- one explicit normalization disposition;
- a canonical sorted set of zero or more H1-format semantic capability identifiers;
- a deterministic binding identity.

The exact disposition vocabulary is:

```text
UNRESOLVED
SINGLE
COMPOSITE
```

Rules:

- `UNRESOLVED` requires zero normalized capability identifiers;
- `SINGLE` requires exactly one normalized capability identifier;
- `COMPOSITE` requires between two and sixteen unique normalized capability identifiers;
- identifiers must use the existing H1 lowercase namespaced grammar;
- the external name is preserved as evidence and is never used for authorization;
- mapping must not infer capabilities from natural-language descriptions;
- an adapter descriptor referenced at registration must be canonical in the H1 registry and must declare every mapped capability with the `PROVIDER` role;
- an unresolved binding remains discoverable as unresolved evidence and never falls back to the external name as authority.

### In-memory binding registry

The K4-R1 registry may:

- register validated bindings against an existing H1 descriptor registry;
- reject duplicate identities and conflicting bindings for the same standard pin / object kind / external name / adapter descriptor;
- return immutable deterministic snapshots;
- list/filter by standard, object kind, external name, adapter, normalized capability, or disposition;
- remove only the exact registration named by an ownership-safe receipt;
- remain ephemeral and in-memory.

Registration does not install, load, connect to, invoke, authorize, approve, or trust an external object or adapter.

## Exact implementation allowlist

After canonical adoption of this authorization, the K4-R1 implementation PR may change exactly:

```text
.github/workflows/k4-r1-compatibility-normalization.yml
schema/k4-r1-compatibility-normalization.schema.json
packages/kodac-runtime/src/compatibility/contracts.ts
packages/kodac-runtime/src/compatibility/registry.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k4-r1-compatibility-normalization.test.ts
```

Production compatibility source may import only deterministic `node:crypto`, the canonical H1 extension contracts/registry, and local K4-R1 contracts. No new package or dependency is admitted.

## Required implementation proofs

The implementation must prove at least:

1. every standard repository, commit, tree, specification path/blob, revision label, and licensing-evidence blob is exact;
2. standard-pin and binding identities are deterministic and order-independent where the contract declares sets;
3. unknown standards, object kinds, dispositions, fields, malformed digests, duplicate capabilities, and bound violations fail closed;
4. `UNRESOLVED`, `SINGLE`, and `COMPOSITE` cardinality rules are exact;
5. opaque external names and metadata digests remain evidence and do not become authority;
6. Agent Skills `allowed-tools` cannot become a normalized capability grant by implication;
7. referenced H1 adapter descriptors must be registered, identity-exact, and declare every mapped capability as `PROVIDER`;
8. duplicate/conflicting binding registration fails closed;
9. registry discovery and disposal are deterministic, immutable, ownership-safe, and idempotent;
10. schema vocabulary, bounds, and conditional disposition rules match runtime behavior;
11. production code contains no transport, HTTP, network, filesystem, process, dynamic import, code loader, skill parser, YAML/Markdown parser, secret, ExecutionGateway, Trust Kernel, tool registry, provider registry, receipt, verification, or Done-Gate surface;
12. full runtime, strict TypeScript, Python, Ruff, scope, purity, provenance, and checkout-unchanged gates are green.

## Explicit non-grants

```text
MCP CLIENT OR SERVER IMPLEMENTATION: NOT AUTHORIZED
MCP DISCOVERY OR INVOCATION: NOT AUTHORIZED
ACP CLIENT OR AGENT IMPLEMENTATION: NOT AUTHORIZED
ACP SESSION / PERMISSION / FILESYSTEM BEHAVIOR: NOT AUTHORIZED
AGENT SKILLS PARSING / INSTALLATION / ACTIVATION: NOT AUTHORIZED
SKILL INSTRUCTION LOADING: NOT AUTHORIZED
SKILL SCRIPT / HOOK / WORKFLOW / BINARY EXECUTION: NOT AUTHORIZED
ALLOWED-TOOLS AS KODAC AUTHORITY: NOT AUTHORIZED

DONOR SOURCE OR DEPENDENCY INTAKE: NOT AUTHORIZED
NEW PACKAGE OR DEPENDENCY: NOT AUTHORIZED
DYNAMIC IMPORT / REQUIRE / EVAL / FUNCTION / VM / WORKER: NOT AUTHORIZED
NETWORK / FILESYSTEM / PROCESS / SECRET AUTHORITY: NOT AUTHORIZED
PERSISTENCE OR EXTERNAL REGISTRY: NOT AUTHORIZED
EXECUTIONGATEWAY / TRUST KERNEL / POLICY CHANGE: NOT AUTHORIZED
TOOL / MODEL PROVIDER REGISTRY CHANGE: NOT AUTHORIZED
REPOSITORY WRITE / REVIEW / APPROVAL / MERGE AUTHORITY: NOT AUTHORIZED
PROVEN_READY AUTHORITY: NOT AUTHORIZED

K4-R2+: NOT AUTHORIZED
K5 / K6 / K7 IMPLEMENTATION: NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH: NOT AUTHORIZED
```

PR #163, all Z0-family work, zrok, paid review/provider spend, real secrets, GitHub Apps, webhooks, and founder-process trust-root establishment remain outside this gate and untouched.

## Documentation scope and merge gate

This authorization candidate may change exactly:

```text
docs/planning/KODAC_K4_DEFINITION_AND_R1_COMPATIBILITY_NORMALIZATION_AUTHORIZATION_2026-08-24.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/ROADMAP.md
docs/roadmap/VERSION_PLAN.md
```

## Local candidate validation

The complete repository and primary-source validation set passed on the five-document authorization candidate:

| Check | Result |
| --- | --- |
| canonical K3 closeout, H1 registry, and Agent Skills audit ancestry | PASS |
| official MCP branch/source capture | PASS — commit `57ac4a2ec742e0cb7622d899b0f5d3bcf769fd69`; specification and license blobs exact |
| official ACP branch/source capture | PASS — commit `62c74ac119ec3296809496482440afca69926ce9`; v2 overview and license blobs exact |
| official Agent Skills branch/source capture | PASS — commit `69ef37e9424c0a7ea9dd2293b559e43ec8176379`; specification, license, and README blobs exact |
| exact documentation scope | PASS — exactly five paths |
| `npm test --prefix packages/kodac-runtime` | PASS — 852 tests; 750 passed; 102 intentionally skipped; 0 failed |
| `uv run pytest` | PASS — 395 passed |
| `uv run ruff check .` | PASS |
| strict TypeScript `tsc --noEmit` for `packages/kodac-runtime` | PASS |
| `uv run python tools/validate_provenance.py` | PASS |
| `git diff --check` | PASS |

These results establish local candidate cleanliness only. Canonical definition/authorization still requires exact-head CI, included review, merge, and post-merge proof.

It may become canonical only if:

- the final diff is exactly this record plus the four current-authority surfaces;
- canonical `main` remains the exact expected base or the candidate is explicitly reconciled without scope expansion;
- the K3 closeout, H1 registry, and Agent Skills audit merges remain ancestors of the candidate;
- all external pins are reverified from official primary sources on the final candidate;
- full repository validation and docs-only CI are green on the exact head;
- normal included review is terminal with zero current material findings and zero unresolved actionable threads;
- no source, test, schema, workflow, fixture, dependency, lockfile, provenance-policy, ruleset, or protected-lane change occurs;
- merge uses exact expected-head semantics and preserves the intended five-path tree;
- post-merge proof verifies ordered parents and tree equality.

Canonical adoption defines K4 and authorizes only the exact K4-R1 implementation slice above. The implementation remains non-canonical until its own exact-head CI, review, evidence, and merge gates pass.
