# Kodac K4-R4 Caller-Materialized Agent Skill Package Evidence Authorization

## Record identity

- Date: 2026-08-24
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-24`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION AUTHORIZATION
- Canonical base commit: `99abc697219048bbbf6164abfc157b30a83dc9eb`
- Canonical base tree: `cf9da51992244a70bcefbc9e4ed3c666a288feb7`
- K4-R3 implementation merge: `46ad98180af290081a914f1c78e5c7519d6f5749` (PR #180)
- K4-R3 canonical evidence merge: `99abc697219048bbbf6164abfc157b30a83dc9eb` (PR #181)
- Accepted compatibility architecture: `docs/adr/ADR-0007-native-mcp-acp-agent-skills-compatibility.md`
- Canonical Agent Skills donor-audit merge: `29a20b710edafa520d5eb18b59f7614589229829` (PR #114)

## Decision

Authorize only the fourth bounded K4 slice:

```text
K4: DEFINED / IN PROGRESS / NOT CLOSED
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY MCP SCOPE
K4-R3: CANONICAL / COMPLETE FOR ITS AUTHORIZED PINNED DATA-ONLY ACP V2 METHOD-CATALOG SCOPE
K4-R4: CALLER-MATERIALIZED DATA-ONLY AGENT SKILL PACKAGE EVIDENCE IMPLEMENTATION AUTHORIZED
K4-R4 IMPLEMENTATION: NOT YET CANONICAL
K4-R5+: NOT AUTHORIZED
```

K4-R4 may validate caller-materialized portable frontmatter fields and caller-supplied content/provenance digests, derive a deterministic redacted package-evidence record, and correlate its exact metadata identity with one immutable K4-R1 `AGENT_SKILL` binding snapshot. It does not locate or read a `SKILL.md`, parse YAML or Markdown, enumerate a directory, resolve a reference, load instructions, install or activate a skill, interpret `allowed-tools`, or access or execute scripts, references, assets, hooks, commands, or binaries.

## Why this is the next bounded gate

ADR-0007 orders compatibility work through MCP, ACP, then Agent Skills and requires portable skills to remain behind Kodac-owned provenance, capability, policy, and trust boundaries. K4-R1 already pins the Agent Skills standard and reserves the exact `AGENT_SKILL` object kind. K4-R2 and K4-R3 establish inert evidence projections for the other two standards without transport or execution.

The smallest useful Agent Skills successor is therefore not a skill parser, loader, installer, activation path, router, qualification runner, materializer, or registry. It is a redacted caller-materialized evidence projection that answers only:

```text
For portable Agent Skills metadata and content identities already materialized by a caller,
does the bounded metadata shape satisfy the pinned portable field contract,
what is its deterministic redacted evidence identity,
and is that identity unbound, current, or stale
relative to one exact K4-R1 adapter binding snapshot?
```

This makes package identity and normalization drift observable while preserving the rule that a skill name, description, compatibility statement, metadata entry, content digest, `allowed-tools` declaration, package presence, or normalized binding is not authority.

## Exact primary-source basis

K4-R4 remains pinned to the canonical Agent Skills standard identity from K4-R1:

- repository: `agentskills/agentskills`;
- commit: `69ef37e9424c0a7ea9dd2293b559e43ec8176379`;
- tree: `65e11c9faad14a022055ce0ff3ebf99f2b55142f`;
- K4-R1 Agent Skills standard-pin identity: `c82752ee60cfa019caaddda9d0230fbeb6f3b9051346135879bbc40563590819`;
- specification path: `docs/specification.mdx`;
- specification blob: `d9a2db099d905da8b879a5c6f996728073985279`;
- code licensing-evidence blob: `a20f4476df158a57a68409015ea607c738856f57` (`LICENSE`, Apache-2.0);
- documentation licensing-evidence blob: `4ea99c213c5c0c005ae4e80df8e52169d06896ec` (`docs/LICENSE`, CC-BY-4.0);
- repository README licensing/context blob: `247e4a18e908d3bf27092f886f25c2515d84ecbc`.

The pinned specification establishes:

- a skill directory contains at minimum `SKILL.md`;
- `SKILL.md` contains YAML frontmatter followed by unrestricted Markdown instructions;
- required `name` is 1-64 characters, lowercase ASCII letters/digits/hyphens only, may not start/end with a hyphen, may not contain consecutive hyphens, and must equal the parent directory name;
- required `description` is 1-1,024 characters;
- optional `license` is a license name or bundled-license reference;
- optional `compatibility` is 1-500 characters;
- optional `metadata` maps string keys to string values;
- optional `allowed-tools` is an experimental space-separated string whose support may vary;
- scripts, references, assets, and arbitrary additional files/directories may be present;
- the instruction body has no format restrictions and may cause clients to load further resources after activation.

These upstream files are read-only evidence. No Agent Skills source expression, schema, reference validator, SDK, dependency, fixture, workflow, hook, script, or binary is admitted.

The canonical donor audit is architectural and security evidence only. Its donor repository, skills, scripts, evaluators, prompts, hooks, commands, and rules remain untrusted data and are not imported by K4-R4.

## Governing invariants

```text
CALLER-MATERIALIZED PACKAGE EVIDENCE != FILESYSTEM DISCOVERY OR PACKAGE TRUTH
PORTABLE FRONTMATTER VALIDITY != PROVENANCE, SAFETY, QUALITY, OR TRUST
DESCRIPTION OR COMPATIBILITY TEXT != ROUTING OR POLICY AUTHORITY
METADATA OR CONTENT DIGEST != CONTENT REVIEW OR QUALIFICATION
ALLOWED-TOOLS PRESENCE OR DIGEST != KODAC CAPABILITY APPROVAL
CURRENT NORMALIZATION != INSTALLATION, ACTIVATION, OR EXECUTION AUTHORITY
UNBOUND OR STALE SKILL != FALLBACK PERMISSION
```

All instructions, descriptions, compatibility claims, metadata, tool declarations, referenced content, scripts, assets, hooks, commands, binaries, and external package/provenance claims remain untrusted caller evidence.

## Authorized K4-R4 contract

K4-R4 may add one pure TypeScript module that accepts only a closed caller-materialized data record, captures one canonical K4-R1 registry snapshot, and returns immutable content-addressed redacted evidence.

### Version and closed vocabularies

The exact contract version is:

```text
k4-r4-agent-skill-package-evidence-v1
```

The only emitted external-object kind is:

```text
AGENT_SKILL
```

The exact derived binding-state vocabulary is:

```text
UNBOUND
CURRENT
STALE
```

No trust, qualification, installation, activation, routing, execution, verification, or readiness state may be emitted.

### Closed caller input

The caller input may contain only:

- the exact canonical Agent Skills `standardPinIdentity`;
- one H1/K4 adapter `extensionId`;
- that adapter's exact `descriptorIdentity`;
- exact portable metadata fields defined below;
- exact redacted content/provenance evidence fields defined below.

The supplied second argument must be a canonical, non-Proxy `CompatibilityBindingRegistry`. K4-R4 accepts no path to open, file bytes, YAML, Markdown body, instruction text, script, reference, asset, hook, command, binary, raw `allowed-tools` string, requested-capability set, policy, trust claim, qualification result, execution receipt, or loader callback.

### Portable metadata fields

The input must contain:

- `directoryName`, validated by the exact portable name grammar and required to equal `name`;
- `name`, validated as 1-64 ASCII code units matching `^[a-z0-9]+(?:-[a-z0-9]+)*$`;
- `description`, validated as 1-1,024 Unicode code points and at most 4,096 UTF-8 bytes;
- `license`, either `null` or 1-1,024 Unicode code points, at most 4,096 UTF-8 bytes, and NUL-free;
- `compatibility`, either `null` or 1-500 Unicode code points, at most 2,000 UTF-8 bytes, and NUL-free;
- `metadataEntries`, a dense array of zero to 64 `{ key, value }` records.

Each metadata key must be 1-128 Unicode code points, at most 512 UTF-8 bytes, and NUL-free. Each metadata value may be empty but must be at most 1,024 Unicode code points, at most 4,096 UTF-8 bytes, and NUL-free. Duplicate keys fail closed. The canonical record sorts entries by exact key and then value using code-unit ordering. The total UTF-8 bytes of all keys and values may not exceed 65,536.

These bounds are local fail-closed evidence bounds where the pinned portable standard intentionally leaves a field unbounded. They do not redefine the external standard or claim that a package exceeding a Kodac evidence bound is invalid for every other implementation.

### Redacted content and provenance evidence

The input must contain only these content/provenance facts:

- `allowedToolsEvidence`: `null` when absent, or `{ sha256, byteLength }` for the exact raw experimental field when present;
- `instructionBodyEvidence`: `{ sha256, byteLength }` for the Markdown body without providing its bytes;
- `skillFileEvidence`: `{ sha256, byteLength }` for the complete `SKILL.md` without providing its bytes;
- `packageManifestEvidence`: `{ sha256, fileCount, totalByteLength }` for a caller-defined complete package manifest without providing paths or file content;
- `sourceProvenanceIdentity`: one 64-character lowercase SHA-256 identity supplied by the caller.

Every SHA-256 value must be exactly 64 lowercase hexadecimal characters. Every byte length and file count must be a non-negative safe integer; package `fileCount` must be at least one and no more than 65,536. `allowedToolsEvidence`, when present, must have a positive byte length no greater than 16,384. `instructionBodyEvidence.byteLength` may be zero. `skillFileEvidence.byteLength` and `packageManifestEvidence.totalByteLength` must be positive.

K4-R4 does not recompute or verify any caller-supplied content, manifest, or provenance digest because it receives no corresponding bytes or package tree. It records bounded evidence of those caller assertions only. Completeness, reference closure, path safety, symlink safety, digest verification, license verification, source authenticity, and provenance truth require later separately authorized qualification gates.

### Redacted deterministic output

The output may preserve only:

- exact source-standard pin evidence;
- adapter extension and descriptor identities;
- exact `directoryName` and `name`;
- `descriptionEvidence: { sha256, byteLength }`;
- `licenseEvidence` and `compatibilityEvidence`, each either `null` or `{ sha256, byteLength }`;
- `metadataEvidence: { sha256, entryCount, totalByteLength }`, where the digest binds the complete canonically sorted metadata-entry array;
- the exact redacted content/provenance evidence above;
- `externalMetadataSha256` derived from the complete canonical redacted portable/content/provenance record;
- the exact immutable K4-R1 binding `snapshotIdentity`;
- exact derived `UNBOUND`, `CURRENT`, or `STALE` evidence;
- content-addressed entry and package-evidence identities.

Raw description, license, compatibility, metadata keys/values, instruction text, `allowed-tools`, paths, or file content must not be emitted. Presence is represented only by the required/non-null evidence records above.

### Exact binding correlation

Materialization must capture one immutable `CompatibilityBindingSnapshot` from the supplied K4-R1 registry before correlation. The output binds to that snapshot's `snapshotIdentity`.

K4-R4 selects only a binding whose exact tuple matches:

```text
canonical Agent Skills standardPinIdentity
AGENT_SKILL
exact portable name
adapter extensionId
adapter descriptorIdentity
```

The derived state is:

- `UNBOUND` when no exact tuple match exists;
- `CURRENT` when one exact tuple match exists and its `externalMetadataSha256` equals the derived redacted package metadata digest;
- `STALE` when one exact tuple match exists but its metadata digest differs.

`CURRENT` preserves the exact K4-R1 `bindingIdentity`, disposition, and sorted normalized capability identifiers as evidence. `UNBOUND` and `STALE` expose no normalized capability identifiers and no disposition. `STALE` may preserve only the stale matched `bindingIdentity` as drift evidence.

K4-R4 never registers, replaces, refreshes, removes, or otherwise mutates a K4-R1 binding. It never derives capabilities from a name, description, compatibility string, metadata, `allowed-tools`, instruction/body digest, package digest, source identity, or caller assertion.

### Deterministic identities and snapshot lifetime

Every redacted text digest is derived with the canonical K4-R1 UTF-8/SHA-256 rules after exact validation. `externalMetadataSha256` hashes the complete canonical redacted package metadata record. The final evidence identity hashes the complete immutable output, including exact source evidence, adapter identity, binding snapshot identity, redacted evidence, and derived binding evidence, excluding only its own identity.

The returned record and every nested value are immutable. Later registry registration or disposal does not mutate or silently refresh prior evidence. No clock, randomness, cache, global state, network, filesystem, process, environment variable, dynamic loader, YAML parser, Markdown parser, or package reader is used.

## Exact K4-R4 implementation allowlist

After canonical adoption of this authorization, the K4-R4 implementation PR may change exactly:

```text
.github/workflows/k4-r4-agent-skill-package-evidence.yml
schema/k4-r4-agent-skill-package-evidence.schema.json
packages/kodac-runtime/src/compatibility/agent-skill-package-evidence.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k4-r4-agent-skill-package-evidence.test.ts
```

The implementation branch must be exactly:

```text
codex/k4-r4-agent-skill-package-evidence
```

The dedicated workflow must bind implementation admission to the exact canonical authorization merge, exact branch, exact PR identity, exact head, clean checkout, and exact five-path diff. From its first canonical implementation it must also contain a closed continuing canonical-regression mode: on every other triggering PR the workflow itself and canonical K4-R4 artifacts remain byte-exact while the required export remains present. Existing K4-R1, K4-R2, and K4-R3 workflows must pass in their canonical-regression modes without modification.

Only immutable verified Action commits already admitted in the repository may be used. Production code may import only deterministic `node:crypto`, hook-free Proxy detection from `node:util`, and canonical local K4-R1 contracts/registry. No package or dependency is admitted.

## Required K4-R4 implementation proofs

The implementation must prove at least:

1. the exact Agent Skills standard pin and every official evidence blob above remain unchanged;
2. only the exact closed input fields and redacted output fields above are accepted or emitted;
3. the exact portable name, directory equality, description, compatibility, metadata, UTF-8, count, and digest bounds fail closed;
4. caller-supplied content/provenance digests are never misrepresented as recomputed, verified, complete, safe, licensed, authentic, or trusted;
5. raw description, license, compatibility, metadata, instructions, `allowed-tools`, paths, and file bytes never appear in output;
6. experimental `allowed-tools` is never tokenized, resolved, normalized, approved, registered, or treated as a capability grant;
7. metadata ordering, text digests, external metadata identity, and final evidence identity are deterministic and stable across input key order and metadata-entry order;
8. one canonical immutable K4-R1 binding snapshot is captured before correlation and its identity is bound into the evidence;
9. `UNBOUND`, `CURRENT`, and `STALE` are derived from the exact tuple and metadata-digest rules;
10. `UNBOUND` and `STALE` never expose normalized capability identifiers or disposition and never fall back to external evidence;
11. materialization does not mutate registry content, size, serials, receipts, or prior snapshots;
12. direct and nested proxies execute zero caller traps, while accessors, symbols, custom prototypes, sparse arrays, duplicate metadata keys, unknown fields, malformed identities, and non-JSON values fail closed before identity construction;
13. every result and nested value is frozen and independent of later registry mutation;
14. schema conditions, closed vocabularies, identity formats, nullability, safe-integer bounds, state-dependent fields, and redaction rules match runtime behavior;
15. production code has no skill parser, YAML/Markdown parser, filesystem/package reader, path resolver, symlink handling, installer, loader, activation, routing, qualification, materialization, script/hook/command execution, network, process, secret, dynamic import, cache, timer, polling, subscription, provider registry, ExecutionGateway, Trust Kernel, policy, receipt, verification, or Done-Gate surface;
16. the dedicated workflow's implementation and continuing-regression modes fail closed with exact immutable Action references and unchanged checkout;
17. full runtime, focused K4-R4, strict TypeScript, Python, Ruff, scope, purity, provenance, Draft 2020-12 schema, branch, exact-head, and checkout-unchanged gates are green.

## Explicit non-grants

```text
SKILL FILESYSTEM DISCOVERY OR DIRECTORY ENUMERATION: NOT AUTHORIZED
SKILL.MD READ OR BYTE INTAKE: NOT AUTHORIZED
YAML FRONTMATTER OR MARKDOWN PARSING: NOT AUTHORIZED
INSTRUCTION / REFERENCE / ASSET LOADING: NOT AUTHORIZED
REFERENCE-CLOSURE OR PATH / SYMLINK RESOLUTION: NOT AUTHORIZED
PACKAGE DIGEST OR PROVENANCE VERIFICATION: NOT AUTHORIZED
SKILL INSTALLATION / REGISTRATION / ACTIVATION / ROUTING: NOT AUTHORIZED
SKILL QUALIFICATION OR TRUST ADMISSION: NOT AUTHORIZED
SKILL SCRIPT / HOOK / COMMAND / WORKFLOW / BINARY EXECUTION: NOT AUTHORIZED
ALLOWED-TOOLS TOKENIZATION / NORMALIZATION / APPROVAL: NOT AUTHORIZED
DESCRIPTION / COMPATIBILITY / METADATA AS POLICY OR AUTHORITY: NOT AUTHORIZED

DONOR SOURCE / SCHEMA / VALIDATOR / SDK / DEPENDENCY INTAKE: NOT AUTHORIZED
NEW PACKAGE OR DEPENDENCY: NOT AUTHORIZED
NETWORK / FILESYSTEM / PROCESS / SECRET AUTHORITY: NOT AUTHORIZED
PERSISTENCE OR EXTERNAL REGISTRY: NOT AUTHORIZED
EXECUTIONGATEWAY / TRUST KERNEL / POLICY / K2 AUTHORITY CHANGE: NOT AUTHORIZED
REPOSITORY WRITE / REVIEW / APPROVAL / MERGE / PROVEN_READY AUTHORITY FROM K4-R4: NOT AUTHORIZED

K4-R4 SCOPE EXPANSION: NOT AUTHORIZED
K4-R5+: NOT AUTHORIZED
K5 / K6 / K7 / KRI-R5+ IMPLEMENTATION: NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH: NOT AUTHORIZED
```

PR #163, all Z0-family work, Z0L execution, zrok download/install/execute, paid review/provider spend, real secrets, GitHub Apps, webhooks, public endpoints, external account setup, and founder-process trust-root establishment remain outside this gate and untouched.

## Exact documentation scope

This authorization candidate may change exactly:

```text
docs/planning/KODAC_K4_R4_CALLER_MATERIALIZED_AGENT_SKILL_PACKAGE_EVIDENCE_AUTHORIZATION_2026-08-24.md
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
| canonical K4-R1/R2/R3 evidence and Agent Skills audit ancestry | PASS |
| K4-R3 evidence ordered-parent and tree proof | PASS — merge `99abc697219048bbbf6164abfc157b30a83dc9eb`; tree `cf9da51992244a70bcefbc9e4ed3c666a288feb7` |
| official Agent Skills commit/tree/specification/license/README identities | PASS |
| exact portable field semantics and experimental `allowed-tools` status | PASS |
| exact documentation scope | PASS — exactly five paths |
| `npm test --prefix packages/kodac-runtime` | PASS — 898 tests; 796 passed; 102 intentionally skipped; 0 failed |
| `uv run pytest -p no:cacheprovider` | PASS — 395 passed |
| `uv run ruff check --no-cache .` | PASS |
| strict TypeScript `tsc --noEmit` for `packages/kodac-runtime` | PASS |
| `uv run python tools/validate_provenance.py` | PASS |
| `git diff --check` | PASS |

These results establish local candidate cleanliness only. Canonical authorization still requires exact-head CI, included review, merge, and post-merge proof.

## Merge gate

This K4-R4 authorization becomes canonical only if:

- the final diff is exactly this record plus the four current-authority surfaces;
- canonical `main` remains the exact expected base or the candidate is explicitly reconciled without scope expansion;
- K4-R1, K4-R2, and K4-R3 canonical evidence merges and the canonical Agent Skills audit remain ancestors of the candidate;
- all external Agent Skills pins and field semantics are reverified from official primary sources on the final candidate;
- full repository validation and docs-only CI are green on the exact head;
- normal included review is terminal with zero current material findings and zero unresolved actionable threads;
- no source, test, schema, workflow, fixture, dependency, lockfile, provenance-policy, ruleset, or protected-lane change occurs;
- merge uses exact expected-head semantics and preserves the intended five-path tree;
- post-merge proof verifies ordered parents, tree equality, and exact `main`.

Canonical adoption authorizes only the exact five-path K4-R4 implementation slice above. K4-R4 remains non-canonical until its own exact-head CI, included review, evidence, merge, and post-merge gates pass. K4 remains open and K4-R5+ remains unauthorized.
