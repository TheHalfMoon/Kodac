# Kodac K4-R4 Caller-Materialized Agent Skill Package Evidence Canonical Evidence

## Record identity

- Date: 2026-08-24
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-24`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION CANONICALIZATION
- Canonical base commit: `21cb4478c00089fd0c9500a437fb46d5bae5d588`
- Canonical base tree: `a63cbf605a12a312aea8789058599ee8c1f90461`
- K4-R4 authorization merge: `8aac41ec871446f138f8502b1224e947aa67ed95` (PR #182)
- K4-R4 qualified implementation head: `e85d07131c71f05ff39ab9aa4337a3ea5639f02d`
- K4-R4 qualified implementation tree: `a63cbf605a12a312aea8789058599ee8c1f90461`
- K4-R4 implementation merge: `21cb4478c00089fd0c9500a437fb46d5bae5d588` (PR #183)

## Decision

Conditionally adopt the exact bounded K4-R4 implementation only if this evidence candidate passes the exact merge gate below:

```text
K4: DEFINED / IN PROGRESS / NOT CLOSED
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY SCOPE
K4-R2 PREIMPLEMENTATION K4-R1 WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH SCOPE
K4-R2 CANONICAL-REGRESSION WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH PREREQUISITE SCOPE
K4-R3: CANONICAL / COMPLETE FOR ITS AUTHORIZED PINNED DATA-ONLY ACP V2 METHOD-CATALOG EVIDENCE SCOPE
K4-R4: CANONICAL / COMPLETE IFF THIS EVIDENCE MERGE GATE PASSES; OTHERWISE CANONICALIZATION CANDIDATE
K4-R5+: NOT AUTHORIZED
```

Only after every condition in the merge gate passes does this decision make the caller-materialized, redacted, data-only Agent Skill package-evidence surface canonical. It does not close K4, authorize K4-R5, discover or read a package, parse YAML or Markdown, verify caller-supplied digests, resolve a path or reference, install or activate a skill, interpret `allowed-tools`, qualify trust, load instructions, route a skill, or execute an instruction, script, hook, command, asset, or binary.

## Canonical implementation ledger

| Gate | Canonical identity | Accepted bounded outcome |
| --- | --- | --- |
| K4-R4 authorization | `8aac41ec871446f138f8502b1224e947aa67ed95` (PR #182) | exact Agent Skills source evidence, closed caller-materialized contract, redaction requirements, five-path implementation allowlist, and preserved non-grants |
| K4-R4 implementation | `21cb4478c00089fd0c9500a437fb46d5bae5d588` (PR #183) | immutable data-only Agent Skill package evidence, exact K4-R1 binding-state correlation, closed Draft 2020-12 schema, dedicated implementation/regression workflow, and review hardening |

Both records descend from canonical K4-R3 evidence merge `99abc697219048bbbf6164abfc157b30a83dc9eb`, K4-R3 implementation merge `46ad98180af290081a914f1c78e5c7519d6f5749`, canonical K4-R2 evidence merge `61afa9c7abb5a9d155e8a83143302853564346ff`, canonical K4-R1 evidence merge `f8ad3faab690487f2e9490664c539c281e8fde44`, canonical H1 descriptor-registry merge `ec2558129fc69e8586fffb8d36dfe42e6a333573`, and canonical K3 closeout merge `67141074fb649b449ca18dbab92872884e7cad58`.

The K4-R4 implementation merge has the exact ordered parents:

```text
parent 1: 8aac41ec871446f138f8502b1224e947aa67ed95
parent 2: e85d07131c71f05ff39ab9aa4337a3ea5639f02d
```

Its merge tree is exactly the qualified implementation tree and the post-merge `main` tree:

```text
merge tree:     a63cbf605a12a312aea8789058599ee8c1f90461
qualified tree: a63cbf605a12a312aea8789058599ee8c1f90461
main tree:      a63cbf605a12a312aea8789058599ee8c1f90461
```

An independent local fetch proved `origin/main` at `21cb4478c00089fd0c9500a437fb46d5bae5d588` with those ordered parents and that exact tree.

## Exact primary-standard evidence

The canonical implementation preserves the exact Agent Skills evidence pin recorded by the authorization:

- repository `agentskills/agentskills`;
- upstream commit `69ef37e9424c0a7ea9dd2293b559e43ec8176379`;
- upstream tree `65e11c9faad14a022055ce0ff3ebf99f2b55142f`;
- specification blob `d9a2db099d905da8b879a5c6f996728073985279`;
- license evidence blobs `a20f4476df158a57a68409015ea607c738856f57` and `4ea99c213c5c0c005ae4e80df8e52169d06896ec`;
- README evidence blob `247e4a18e908d3bf27092f886f25c2515d84ecbc`;
- K4-R1 Agent Skills standard-pin identity `c82752ee60cfa019caaddda9d0230fbeb6f3b9051346135879bbc40563590819`.

These are read-only evidence pins. They admit no upstream source expression, parser, loader, installer, SDK, package, executable, hook, workflow, binary, dependency, or behavioral authority.

## Exact canonical artifact evidence

The final admission head preserves the review-hardened artifact `056cc4c5ab93f4b6df3e685cc032541d3306b7ea` and tree `17591439397f68e088abcd797133f396155a5d56` through one workflow-only admission commit. The exact final identities are:

| Artifact | Blob |
| --- | --- |
| final closed admission/regression workflow | `521b3718a9e25c5bf703dfcaab9afbb0ae80b1e0` |
| closed Draft 2020-12 schema | `fc591ca005c049205965315c9cef01d4e37c0cbd` |
| production Agent Skill package-evidence module | `7484c94b1cc79e5bb14e15718576a910a7c270f2` |
| shared runtime export | `3410e6b415f758aa3597087f78e1a6ff850e0d2c` |
| K4-R4 evidence test | `8ec2722d8c76d12306ef7a70dd5f27f5d3f13241` |

The implementation merge preserves exactly the five authorized paths and no dependency or repository lockfile change:

```text
.github/workflows/k4-r4-agent-skill-package-evidence.yml
schema/k4-r4-agent-skill-package-evidence.schema.json
packages/kodac-runtime/src/compatibility/agent-skill-package-evidence.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k4-r4-agent-skill-package-evidence.test.ts
```

The workflow installs only its exact-version, SHA-512-integrity-locked TypeScript validation graph under `RUNNER_TEMP` with `npm ci --ignore-scripts`, removes it after validation, and proves the checkout unchanged.

## Canonical K4-R4 contract

Canonical adoption establishes only:

- the exact `k4-r4-agent-skill-package-evidence-v1` data contract;
- exact object kind `AGENT_SKILL`;
- exact binding states `UNBOUND`, `CURRENT`, and `STALE`;
- caller-supplied, bounded portable metadata and caller-supplied digests/counts/lengths for description, license, compatibility, metadata entries, experimental `allowed-tools`, instruction body, `SKILL.md`, package manifest, and source provenance;
- deterministic redaction of every untrusted text field into hashes, counts, lengths, or null evidence;
- one immutable canonical K4-R1 registry snapshot per materialization;
- exact correlation by standard pin, object kind, skill name, adapter extension identity, descriptor identity, and derived external metadata identity;
- immutable content-addressed evidence and a closed Draft 2020-12 schema;
- a dedicated exact-head implementation gate and continuing canonical-regression mode.

The governing invariant remains:

```text
CALLER-MATERIALIZED METADATA != PACKAGE DISCOVERY
CALLER-SUPPLIED DIGEST != CONTENT OR PROVENANCE VERIFICATION
AGENT_SKILL BINDING != INSTALLATION, ACTIVATION, ROUTING, OR TRUST
ALLOWED-TOOLS EVIDENCE != TOOL APPROVAL OR EXECUTION AUTHORITY
SKILL.md EVIDENCE != INSTRUCTION LOADING OR EXECUTION
CURRENT NORMALIZATION != K2 AUTHORITY OR PROVEN_READY
UNBOUND OR STALE != FALLBACK PERMISSION
```

## Required-proof matrix

| Authorized K4-R4 proof | Canonical evidence | Result |
| --- | --- | --- |
| exact Agent Skills pin | immutable repository, commit, tree, specification, license, README, and K4-R1 standard-pin identities | PASS |
| closed caller input | exact key sets, plain dense JSON data, bounded names/text/metadata/digests/counts/lengths, and unknown-field rejection | PASS |
| raw-text redaction | output contains only deterministic hashes, counts, lengths, nulls, exact trusted tuple fields, and fixed vocabulary | PASS |
| experimental `allowed-tools` containment | raw declaration is never accepted or emitted; only caller-supplied digest/count/length evidence is admitted | PASS |
| one immutable registry snapshot | canonical non-Proxy K4-R1 snapshot captured once before correlation and bound into the evidence identity | PASS |
| exact tuple correlation | pin, `AGENT_SKILL`, exact name, adapter extension, descriptor, and external metadata identity must match | PASS |
| exact state-dependent evidence | no binding/disposition/capability fields for `UNBOUND`; binding only for `STALE`; disposition/capabilities only for `CURRENT` | PASS |
| hostile-data rejection | direct/nested Proxy rejection without traps plus accessor, symbol, prototype, sparse-array, cycle, non-JSON, duplicate, and malformed-field failures | PASS |
| bounded hostile strings | early UTF-16 rejection and O(1)-space early-exit code-point counting; one-million-character regression coverage | PASS |
| immutable lifetime | source, metadata, digest, snapshot, binding, capability, and final evidence surfaces are deeply frozen | PASS |
| schema/runtime agreement | closed Draft 2020-12 union and hostile mutation matrix agree with runtime state-field rules | PASS |
| data-only purity | production imports remain limited to deterministic crypto, hook-free Proxy detection, and canonical local K4-R1 contracts/registry | PASS |
| no authority-bearing integration | no filesystem, parser, loader, installer, activation, routing, trust, provider, network, process, secret, policy, receipt, verification, or execution surface | PASS |
| repository qualification | runtime, focused K4-R4, Python, Ruff, strict TypeScript, provenance, scope, purity, schema, immutable-action, branch, exact-head, and checkout-unchanged gates | PASS |

## Review, repair, and qualification evidence

The qualified implementation incorporated every verified actionable finding:

1. The first dedicated workflow run exposed schema-valid state-field leaks. The repaired schema explicitly rejects binding, disposition, and capability fields for `UNBOUND`, and rejects disposition/capability fields for `STALE`; the workflow hostile matrix proves those failures.
2. Qodo independently found the stale-head schema issue and allocation-proportional code-point counting. The final source uses an early UTF-16 bound and O(1)-space early-exit loop, with a one-million-character hostile regression.
3. CodeRabbit identified that the registry-shadow test accepted any exception and that transient TypeScript packages were version-pinned but not integrity-pinned. The final test requires the exact canonical `TypeError`, and the final workflow uses an embedded integrity-locked temporary package graph without widening the five-path scope.

Final exact-head evidence on `e85d07131c71f05ff39ab9aa4337a3ea5639f02d`:

| Evidence | Result |
| --- | --- |
| required GitHub Actions | PASS — governance #2315, K2 runtime #986, K3-R4 #489, K3-R5 #462, K3-R6 #22, K4-R1 #25, K4-R2 #16, K4-R3 #9, and dedicated K4-R4 #4 |
| Qodo final exact-head review | PASS — exact-head marker `e85d07131c71f05ff39ab9aa4337a3ea5639f02d`; zero bugs, zero rule violations, and zero skill insights |
| CodeRabbit findings | PASS — both exact findings repaired; CodeRabbit status success; Qodo exact-head review is the terminal review relied upon |
| review threads | PASS — both actionable threads resolved; zero unresolved actionable threads |
| implementation scope | PASS — exactly five authorized paths, 2,010 additions, no deletions, eight strict fast-forward commits from the authorization base |
| local runtime | PASS — 909 tests; 807 passed; 102 intentionally skipped; 0 failed |
| Python | PASS — 395 passed |
| Ruff / strict TypeScript / provenance / schema / diff | PASS |
| pristine exact-head workflow replay | PASS — admission, ancestry, artifact pins, scope, schema, purity, Python, Ruff, provenance, full runtime, integrity-locked TypeScript tooling, cleanup, and checkout-unchanged gates |
| spend and protected boundaries | PASS — spend `$0`; PR #163 and every Z0-family surface untouched |

The exact final implementation chain is:

```text
e85d07131c71f05ff39ab9aa4337a3ea5639f02d
  -> 056cc4c5ab93f4b6df3e685cc032541d3306b7ea
  -> 2ecd9326852b07978216a399b6db8dd4c827fd4b
  -> a41c21e907f4f5911aa8b13fe5df395491f828b6
  -> aac186712d6cea91227fdc29376ebc823746c7a8
  -> 51e5fc15ab276c08672709ede24d052009ffa8df
  -> 4156090cc469aaf055fba9bd6ff63ff6c85128f5
  -> 8f5109ace2f8f2348dd64acaff97c1b583181d8b
  -> 8aac41ec871446f138f8502b1224e947aa67ed95
```

Every link is an exact one-parent fast-forward link. The qualified head, review-hardened artifact, trees, blobs, authorization merge, and implementation merge above are the canonical full identities.

## Preserved non-grants

Canonical K4-R4 does not establish or authorize:

- package discovery, filesystem reading, path/reference resolution, YAML/Markdown/frontmatter parsing, package-manifest parsing, or source-provenance verification;
- raw description, license, compatibility, metadata, `allowed-tools`, instruction, path, manifest, file, asset, or binary output;
- skill installation, registration, activation, routing, trust qualification, instruction loading, tool approval, command execution, script/hook execution, asset loading, binary loading, or sandbox policy;
- MCP or ACP scope expansion, protocol transport, client/server/agent behavior, discovery, invocation, session behavior, or capability negotiation;
- donor code/SDK/dependency intake, a new Kodac dependency, dynamic code loading, or a repository lockfile;
- network, filesystem, process, secret, persistence, external-registry, ExecutionGateway, Trust Kernel, policy, K2 authority, or `PROVEN_READY` change;
- K4 closure, K4-R5+, K5, K6, K7, KRI-R5+, public release, package publication, or brand launch.

PR #163, all Z0-family work, Z0L execution, zrok, paid review/provider spend, real secrets, GitHub Apps, webhooks, public endpoints, external account setup, and founder-process trust-root establishment remain outside this gate and untouched.

## Exact documentation scope

This canonicalization candidate may change exactly:

```text
docs/planning/KODAC_K4_R4_CALLER_MATERIALIZED_AGENT_SKILL_PACKAGE_EVIDENCE_CANONICAL_EVIDENCE_2026-08-24.md
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
| K4-R4 authorization and implementation ancestry | PASS |
| K4-R4 ordered-parent proof | PASS — `8aac41ec871446f138f8502b1224e947aa67ed95`, then `e85d07131c71f05ff39ab9aa4337a3ea5639f02d` |
| K4-R4 merge-tree equality and main adoption | PASS — `a63cbf605a12a312aea8789058599ee8c1f90461`; `origin/main` at `21cb4478c00089fd0c9500a437fb46d5bae5d588` |
| exact documentation scope | PASS — exactly five paths |
| full runtime | PASS — 909 tests; 807 passed; 102 intentionally skipped; 0 failed |
| Python | PASS — 395 passed |
| Ruff / strict TypeScript / provenance | PASS |
| `git diff --check` | PASS |

## Exact evidence merge gate

Canonical adoption is valid only if:

1. the evidence PR base is exactly `21cb4478c00089fd0c9500a437fb46d5bae5d588` with tree `a63cbf605a12a312aea8789058599ee8c1f90461`;
2. the PR changes exactly the five documentation paths above;
3. all repository, scope, governance, provenance, strict TypeScript, Python, Ruff, runtime, and documentation checks pass on the exact evidence head;
4. terminal review is anchored to that exact evidence head with no unresolved material finding or actionable thread;
5. the merge uses expected-head protection and creates a merge commit whose ordered parents are exactly the canonical base then the qualified evidence head;
6. the merge tree equals the qualified evidence-head tree; and
7. post-merge `main` equals that merge commit and tree.

If any condition fails, K4-R4 remains an implementation merged under its authorization but is not canonically adopted by this record.

## Post-gate state

After the exact evidence merge gate passes:

```text
K4: DEFINED / IN PROGRESS / NOT CLOSED
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY SCOPE
K4-R2 PREIMPLEMENTATION K4-R1 WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH SCOPE
K4-R2 CANONICAL-REGRESSION WORKFLOW HARDENING: CANONICAL / COMPLETE FOR ITS AUTHORIZED ONE-PATH PREREQUISITE SCOPE
K4-R3: CANONICAL / COMPLETE FOR ITS AUTHORIZED PINNED DATA-ONLY ACP V2 METHOD-CATALOG EVIDENCE SCOPE
K4-R4: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY AGENT SKILL PACKAGE EVIDENCE SCOPE
K4-R5+: NOT AUTHORIZED
```

This canonicalization grants no authority by implication beyond the exact bounded K4-R4 surface above.
