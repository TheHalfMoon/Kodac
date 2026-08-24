# Kodac K4-R5 Caller-Materialized Agent Skill Governance-Claim Evidence Authorization

## Record identity

- Date: 2026-08-24
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-24`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION AUTHORIZATION
- Canonical base commit: `7ec38dba8232084dbc1a35ead2faec70cf413403`
- Canonical base tree: `e0227ab699847cdbcb70134037215b668be264a0`
- Canonical K4-R4 authorization merge: `8aac41ec871446f138f8502b1224e947aa67ed95` (PR #182)
- Canonical K4-R4 implementation merge: `21cb4478c00089fd0c9500a437fb46d5bae5d588` (PR #183)
- Canonical K4-R4 evidence merge: `7ec38dba8232084dbc1a35ead2faec70cf413403` (PR #184)
- Accepted compatibility architecture: `docs/adr/ADR-0007-native-mcp-acp-agent-skills-compatibility.md`

## Decision

Authorize only the next bounded K4 slice after canonical K4-R4:

```text
K4: DEFINED / IN PROGRESS / NOT CLOSED
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY SCOPE
K4-R3: CANONICAL / COMPLETE FOR ITS AUTHORIZED PINNED DATA-ONLY ACP V2 METHOD-CATALOG EVIDENCE SCOPE
K4-R4: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY AGENT SKILL PACKAGE EVIDENCE SCOPE
K4-R5: CALLER-MATERIALIZED DATA-ONLY AGENT SKILL GOVERNANCE-CLAIM EVIDENCE IMPLEMENTATION AUTHORIZED
K4-R5 IMPLEMENTATION: NOT YET CANONICAL
K4-R6+: NOT AUTHORIZED
```

K4-R5 may bind bounded caller assertions about package version, requested semantic capabilities, effect requirements, compatibility requirements, and evaluation artifacts to one already-valid canonical K4-R4 Agent Skill package-evidence record. It emits immutable content-addressed governance-claim evidence with fixed `UNASSESSED` trust and `NONE` authority states.

K4-R5 does not inspect a package or artifact, parse metadata or instructions, verify any caller-supplied digest, decide whether a claim is true, qualify trust, approve a capability, grant an effect, activate or route a skill, or execute anything.

The `K4-R5+: NOT AUTHORIZED` statements in the earlier K4-R4 authorization and canonical-evidence records remain correct as historical, base-scoped gate decisions. They do not prospectively prohibit a later separately reviewed authorization. This record supersedes that current boundary only if its own exact authorization merge gate passes; before then K4-R5 remains unauthorized. The earlier records remain immutable evidence of what their gates did and did not authorize.

## Derivation from accepted architecture

ADR-0007 says Agent Skills governance metadata may include:

- source/provenance;
- version/digest;
- license;
- requested capabilities;
- network/secret requirements;
- compatibility requirements;
- benchmark/evaluation results;
- trust status.

Canonical K4-R4 already supplies immutable redacted source/provenance, package-manifest, license, compatibility, `allowed-tools`, instruction, skill-file, and K4-R1 binding evidence. It explicitly leaves completeness, digest verification, license verification, authenticity, safety, and trust to later separately authorized gates.

K4-R5 fills only the next data-model gap: it binds additional caller-materialized governance claims to the exact K4-R4 evidence identity. It intentionally fixes trust to `UNASSESSED` and authority to `NONE`. Therefore:

```text
CALLER GOVERNANCE CLAIM != VERIFIED FACT
EVALUATION ARTIFACT IDENTITY != REPRODUCED RESULT
REQUESTED CAPABILITY != APPROVED CAPABILITY
EFFECT REQUIREMENT != EFFECT GRANT
UNASSESSED TRUST != TRUSTED
GOVERNANCE EVIDENCE != INSTALLATION, ACTIVATION, ROUTING, OR EXECUTION AUTHORITY
```

## Canonical dependency basis

K4-R5 must depend only on:

1. the exact canonical K4-R4 package-evidence contract and validator;
2. the canonical K4-R1 semantic capability identifier grammar already used by compatibility bindings; and
3. deterministic local JSON, UTF-8, SHA-256, hook-free validation, and immutable-data patterns.

It must not query or mutate the K4-R1 registry. The K4-R4 record already binds one immutable registry snapshot and exact package binding state. K4-R5 consumes that evidence as data and may not refresh, reinterpret, repair, or upgrade it.

The implementation must byte-pin the canonical K4-R4 source, schema, test, workflow, shared export, implementation merge/tree, evidence record, and evidence merge/tree before qualification.

No donor source, package, SDK, dependency, script, hook, workflow, binary, external service, or live artifact is admitted by this authorization.

## Authorized K4-R5 contract

K4-R5 may implement one pure TypeScript module, one closed Draft 2020-12 schema, one dedicated admission/regression workflow, one shared export, and one adversarial test file.

### Contract version and fixed vocabularies

```text
version: k4-r5-agent-skill-governance-claim-evidence-v1

requirementKind:
  FILESYSTEM
  NETWORK
  PROCESS
  SECRET

assertedOutcome:
  PASS
  FAIL
  INCONCLUSIVE

claimStatus:
  CALLER_ASSERTED

trustStatus:
  UNASSESSED

authorityState:
  NONE
```

`claimStatus`, `trustStatus`, and `authorityState` are fixed output values. Callers may not supply or override them.

### Exact input

The input may contain only:

- `version`, exactly the K4-R5 contract version;
- `packageEvidence`, one exact record accepted by `validateAgentSkillPackageEvidence`;
- `packageVersionEvidence: { sha256, byteLength }`, where the digest is caller-supplied evidence of an external version string or version record and the raw version is not accepted;
- `governanceRevisionIdentity`, one caller-supplied 64-character lowercase SHA-256 identity for the governance assertion revision;
- `requestedCapabilityClaims`, a dense array of zero to sixteen records containing only one canonical H1-format semantic `capabilityId`;
- `requirementClaims`, a dense array of zero to four records containing exactly `requirementKind`, `evidenceSha256`, and `evidenceByteLength`;
- `compatibilityClaimEvidence`, either `null` or one `{ sha256, byteLength }` caller-asserted evidence record; and
- `evaluationClaims`, a dense array of zero to thirty-two records containing exactly `evaluatorIdentity`, `artifactIdentity`, `artifactByteLength`, and `assertedOutcome`.

Every digest or identity is exactly 64 lowercase hexadecimal characters. Every byte length is a non-negative safe integer no greater than 16 MiB. `packageVersionEvidence.byteLength` must be from 1 through 4,096. Every requirement-claim byte length must be positive. Non-null `compatibilityClaimEvidence.byteLength` must be from 1 through 65,536. Every evaluation artifact byte length must be positive.

Requested capability identifiers use the existing H1 lowercase namespaced grammar, are unique, and are canonicalized in ascending ordinal order. Requirement kinds are unique and canonicalized in the fixed vocabulary order. Evaluation claims are unique by the exact `evaluatorIdentity` / `artifactIdentity` tuple and are canonicalized by evaluator identity, artifact identity, asserted outcome, then byte length.

Raw version text, requirement descriptions, compatibility text, benchmark output, evaluation output, evidence bytes, paths, URLs, credentials, policy expressions, instructions, and arbitrary metadata are not accepted.

### Exact output

The immutable output may contain only:

- the exact K4-R5 version;
- `packageEvidenceIdentity` and the exact K4-R4 package-evidence version;
- the exact Agent Skills standard-pin identity and `AGENT_SKILL` object kind;
- exact package evidence lineage: adapter extension identity, descriptor identity, binding snapshot identity, binding state, directory name, skill name, external metadata identity, source-provenance identity, and package-manifest digest/count/length evidence;
- the redacted K4-R4 license and compatibility evidence records;
- validated `packageVersionEvidence` and `governanceRevisionIdentity`;
- canonical requested-capability claim records, each with fixed `claimStatus: CALLER_ASSERTED`;
- canonical effect-requirement claim records, each with fixed `claimStatus: CALLER_ASSERTED`;
- optional compatibility-claim evidence with fixed `claimStatus: CALLER_ASSERTED`;
- canonical evaluation-claim records, each with fixed `claimStatus: CALLER_ASSERTED`;
- fixed `trustStatus: UNASSESSED`;
- fixed `authorityState: NONE`; and
- one deterministic `governanceEvidenceIdentity`.

The output must not copy the entire K4-R4 record. It selects only the exact lineage and redacted evidence listed above, validates those facts through the canonical K4-R4 validator, and binds them into the final identity.

### Canonical identity

The governance evidence identity is SHA-256 over the UTF-8 encoding of closed canonical JSON for the entire validated output excluding only `governanceEvidenceIdentity`.

Canonical JSON follows the existing K4 rules:

- object keys sort by ascending ordinal string comparison;
- arrays retain only their declared canonical order;
- set-valued inputs are validated, deduplicated, and sorted before hashing;
- `undefined`, non-finite numbers, accessors, symbols, proxies, cycles, sparse arrays, custom prototypes, and all non-JSON values fail closed;
- no locale-sensitive comparison, time, randomness, environment, global state, or mutable cache participates.

### Existing K4-R4 state is evidence only

`UNBOUND`, `CURRENT`, or `STALE` is copied only as validated K4-R4 lineage evidence. K4-R5:

- does not query the registry;
- does not convert `UNBOUND` or `STALE` to a fallback;
- does not treat `CURRENT` as trust or authority;
- does not compare requested capability claims to normalized binding capabilities;
- does not synthesize an approval, denial, policy decision, or qualification verdict.

### Immutability and fail-closed behavior

The input and nested values must be copied through hook-free hostile-data validation before any caller property access that could execute code. Direct or nested proxies must be rejected without executing traps. Accessors, symbols, sparse arrays, custom prototypes, cycles, duplicate records, unknown fields, malformed identities, out-of-range counts/lengths, and noncanonical fixed values fail closed.

The returned record and every nested value are deeply frozen. Later mutation of caller inputs or any registry state does not change prior evidence.

## Exact implementation allowlist

After canonical adoption of this authorization, the K4-R5 implementation PR may change exactly:

```text
.github/workflows/k4-r5-agent-skill-governance-claim-evidence.yml
schema/k4-r5-agent-skill-governance-claim-evidence.schema.json
packages/kodac-runtime/src/compatibility/agent-skill-governance-claim-evidence.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k4-r5-agent-skill-governance-claim-evidence.test.ts
```

Production K4-R5 source may import only deterministic `node:crypto`, hook-free Proxy detection from `node:util`, the canonical K4-R4 Agent Skill package-evidence module, and canonical local H1/K4 capability grammar if required. No new package or dependency is admitted.

The K4-R5 workflow must:

- run only for the exact implementation branch/PR during admission and in a separate continuing regression mode afterward;
- require the exact authorization base, exact five-path diff, strict one-parent fast-forward admission chain, and workflow-only final admission commit;
- pin every Action to an immutable upstream commit;
- pin the authorization record and every canonical K4-R4 dependency identity;
- structurally reject hidden Action or reusable-workflow references;
- enforce the exact source import and forbidden-surface boundary;
- validate the schema against actual outputs and hostile state/claim mutations;
- run focused tests, the full runtime, Python, Ruff, strict TypeScript, provenance, and checkout-unchanged gates;
- use only integrity-locked ephemeral validation tooling outside the checkout.

## Required implementation proofs

The implementation must prove at least:

1. only a record accepted by the canonical K4-R4 validator can supply package lineage;
2. the complete package-evidence object is never copied into output and no raw K4-R4-forbidden text appears;
3. exact K4-R4 version, pin, object kind, evidence identity, binding snapshot/state, package identity, redacted license/compatibility, manifest, and provenance facts are bound into the final identity;
4. requested capability identifiers use the canonical H1 grammar, are unique, sorted, bounded to sixteen, and remain caller assertions only;
5. effect requirement kinds are unique, fixed, sorted, bounded to four, and never become grants;
6. package version, compatibility, requirement, and evaluation content remains digest/count/length evidence only;
7. evaluation claims are unique, canonically sorted, bounded to thirty-two, and never become reproduced benchmark or qualification truth;
8. callers cannot supply `claimStatus`, `trustStatus`, `authorityState`, a policy result, approval, denial, score, routing choice, or execution disposition;
9. `claimStatus` is always `CALLER_ASSERTED`, `trustStatus` is always `UNASSESSED`, and `authorityState` is always `NONE`;
10. `UNBOUND`, `CURRENT`, and `STALE` package evidence remains lineage only and causes no fallback, trust upgrade, or capability comparison;
11. identity recomputation detects every selected lineage, claim, outcome, count, length, order, and fixed-state mutation;
12. direct/nested proxies execute zero traps, and accessors, symbols, custom prototypes, sparse arrays, cycles, unknown fields, non-JSON values, duplicates, and malformed bounds fail closed;
13. all outputs and nested arrays/records are deeply immutable and independent of later caller or registry mutation;
14. schema vocabulary, union shape, fixed statuses, bounds, nullability, and closed field sets match runtime behavior;
15. production code has no package reader, parser, path resolver, installer, loader, activation, routing, trust qualification, policy, benchmark runner, evaluator execution, network, filesystem, process, secret, dynamic loader, cache, timer, provider registry, ExecutionGateway, Trust Kernel, receipt, verification, or Done-Gate surface; and
16. full runtime, focused K4-R5, strict TypeScript, Python, Ruff, scope, purity, provenance, exact-head review, and checkout-unchanged gates are green.

## Explicit non-grants

```text
PACKAGE / ARTIFACT READING OR DIGEST VERIFICATION: NOT AUTHORIZED
LICENSE / PROVENANCE / AUTHENTICITY VERIFICATION: NOT AUTHORIZED
BENCHMARK OR EVALUATOR EXECUTION: NOT AUTHORIZED
TRUST QUALIFICATION OR TRUST UPGRADE: NOT AUTHORIZED
POLICY DECISION OR CAPABILITY APPROVAL: NOT AUTHORIZED
FILESYSTEM / NETWORK / PROCESS / SECRET GRANT: NOT AUTHORIZED
SKILL INSTALLATION / ACTIVATION / ROUTING / EXECUTION: NOT AUTHORIZED
ALLOWED-TOOLS INTERPRETATION: NOT AUTHORIZED

MCP / ACP BEHAVIOR OR SCOPE EXPANSION: NOT AUTHORIZED
DONOR SOURCE OR DEPENDENCY INTAKE: NOT AUTHORIZED
NEW PACKAGE OR DEPENDENCY: NOT AUTHORIZED
DYNAMIC IMPORT / REQUIRE / EVAL / FUNCTION / VM / WORKER: NOT AUTHORIZED
NETWORK / FILESYSTEM / PROCESS / SECRET AUTHORITY: NOT AUTHORIZED
PERSISTENCE OR EXTERNAL REGISTRY: NOT AUTHORIZED
EXECUTIONGATEWAY / TRUST KERNEL / POLICY CHANGE: NOT AUTHORIZED
REPOSITORY WRITE / REVIEW / APPROVAL / MERGE AUTHORITY: NOT AUTHORIZED
PROVEN_READY AUTHORITY: NOT AUTHORIZED

K4 CLOSURE: NOT AUTHORIZED
K4-R6+: NOT AUTHORIZED
K5 / K6 / K7 IMPLEMENTATION: NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH: NOT AUTHORIZED
```

PR #163, all Z0-family work, Z0L execution, zrok download/install/execute, paid review/provider spend, real secrets, GitHub Apps, webhooks, public endpoints, external account setup, and founder-process trust-root establishment remain outside this gate and untouched.

## Documentation scope

This authorization candidate may change exactly:

```text
docs/planning/KODAC_K4_R5_CALLER_MATERIALIZED_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_AUTHORIZATION_2026-08-24.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/ROADMAP.md
docs/roadmap/VERSION_PLAN.md
```

No source, test, schema, fixture, workflow, dependency, lockfile, provenance policy, ruleset, protected-lane document, or PR #163 artifact is changed.

## Local candidate validation

The complete repository validation set passed on the five-document authorization candidate:

| Check | Result |
| --- | --- |
| K4-R4 evidence merge ordered-parent/tree/main proof | PASS — merge `7ec38dba8232084dbc1a35ead2faec70cf413403`; parents `21cb4478c00089fd0c9500a437fb46d5bae5d588`, then `be4e27d8ee0bff7ae07e4de64e32197b0881d1cd`; tree `e0227ab699847cdbcb70134037215b668be264a0` |
| exact documentation scope | PASS — exactly five paths |
| full runtime | PASS — 909 tests; 807 passed; 102 intentionally skipped; 0 failed |
| Python | PASS — 395 passed |
| Ruff / strict TypeScript / provenance | PASS |
| authority-state consistency and preserved non-grant assertions | PASS |
| `git diff --check` | PASS |

## Exact authorization merge gate

K4-R5 implementation authority becomes canonical only if:

1. the authorization PR base is exactly `7ec38dba8232084dbc1a35ead2faec70cf413403` with tree `e0227ab699847cdbcb70134037215b668be264a0`;
2. the PR changes exactly the five documentation paths above;
3. all repository, governance, provenance, strict TypeScript, Python, Ruff, runtime, and documentation checks pass on the exact authorization head;
4. terminal review is anchored to that exact head with no unresolved material finding or actionable thread;
5. the merge uses expected-head protection and creates a merge commit whose ordered parents are exactly the canonical base then the qualified authorization head;
6. the merge tree equals the qualified authorization-head tree; and
7. post-merge `main` equals that merge commit and tree.

If any condition fails, K4-R5 remains unauthorized.

## Post-gate state

After the exact authorization merge gate passes:

```text
K4: DEFINED / IN PROGRESS / NOT CLOSED
K4-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED DATA-ONLY COMPATIBILITY-NORMALIZATION SCOPE
K4-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY SCOPE
K4-R3: CANONICAL / COMPLETE FOR ITS AUTHORIZED PINNED DATA-ONLY ACP V2 METHOD-CATALOG EVIDENCE SCOPE
K4-R4: CANONICAL / COMPLETE FOR ITS AUTHORIZED CALLER-MATERIALIZED DATA-ONLY AGENT SKILL PACKAGE EVIDENCE SCOPE
K4-R5: CALLER-MATERIALIZED DATA-ONLY AGENT SKILL GOVERNANCE-CLAIM EVIDENCE IMPLEMENTATION AUTHORIZED / NOT YET CANONICAL
K4-R6+: NOT AUTHORIZED
```

This authorization grants no authority by implication beyond the exact bounded K4-R5 implementation lifecycle above.
