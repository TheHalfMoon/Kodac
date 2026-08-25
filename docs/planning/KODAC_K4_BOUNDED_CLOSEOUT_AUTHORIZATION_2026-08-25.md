# Kodac K4 Bounded Closeout Authorization

## Record identity

- Date: 2026-08-25
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-25`
- Authority class: DOCUMENTATION / ENGINEERING MILESTONE CLOSEOUT AUTHORIZATION
- Canonical base commit: `61a7794082a14796a7a1913e2eddf3d067954f7a`
- Canonical base tree: `92b35aaa534b0209a56232b78443254eb686ef4d`
- K4-R5 canonical-evidence merge: `61a7794082a14796a7a1913e2eddf3d067954f7a` (PR #187)
- Governing architecture: `docs/adr/ADR-0007-native-mcp-acp-agent-skills-compatibility.md`

## Decision

Authorize only a bounded K4 engineering-milestone closeout evidence lifecycle for the exact K4-R1 through K4-R5 surface that is already canonical.

```text
K4-R1 THROUGH K4-R5: CANONICAL / COMPLETE FOR THEIR SEPARATELY AUTHORIZED BOUNDED SCOPES
K4: CLOSEOUT EVIDENCE AUTHORIZED / NOT YET CLOSED
K4-R6+: NOT REQUIRED FOR THIS BOUNDED CLOSEOUT / NOT AUTHORIZED
K5 IMPLEMENTATION: NOT AUTHORIZED BY THIS RECORD
```

This record does not itself close K4. K4 becomes closed only if a later dedicated closeout-evidence candidate proves the exact ledger and exit matrix below, passes exact-head CI/review, merges with expected-head protection, and passes post-merge parent/tree/main proof.

## Why K4-R6 is not invented

The current engineering roadmap deliberately defines the accepted K4 surface as a bounded, data-only compatibility and capability-registry milestone. Its canonical slices now provide:

1. exact external-standard pins, semantic capability normalization, deterministic identities, and an ephemeral compatibility registry (K4-R1);
2. caller-materialized MCP catalog evidence without transport/discovery/invocation (K4-R2);
3. pinned ACP v2 method-catalog evidence without client/agent/session behavior (K4-R3);
4. caller-materialized Agent Skill package evidence without package reading/parsing/install/activation (K4-R4); and
5. caller-materialized Agent Skill governance-claim evidence with fixed `CALLER_ASSERTED` / `UNASSESSED` / `NONE` states (K4-R5).

No current canonical roadmap record defines a distinct K4-R6 contract or an unsatisfied bounded K4 exit requirement that requires another implementation slice. Creating a transport/runtime slice merely because `R6` is the next number would be scope invention.

ADR-0007 remains accepted broader architecture. It describes future MCP client/server compatibility, ACP client/editor interoperability, Agent Skills capability-source behavior, and mandatory routing of effects through Kodac-owned policy/ExecutionGateway boundaries. Those executable/runtime directions are intentionally **not** claimed by this bounded closeout and remain separately authorizable future work. Closing this bounded K4 milestone therefore does not repeal or satisfy every future executable direction in ADR-0007.

## Canonical K4 ledger to prove in closeout

The later closeout evidence must verify every named merge is an ancestor of its exact base and preserve its recorded bounded meaning.

| Gate | Canonical identity | Accepted bounded outcome |
| --- | --- | --- |
| K4 definition / K4-R1 authorization | `f64a5f1ddbe57970d214c2f7b042fa421a0562fa` (PR #170) | defines K4 and authorizes data-only standard pins and capability normalization |
| K4-R1 implementation | `034da7bfeee9439828ea0f639c7ce63ee0b3b9da` (PR #171) | standard pins, normalized capability bindings, deterministic in-memory registry |
| K4-R1 canonical evidence | `f8ad3faab690487f2e9490664c539c281e8fde44` (PR #172) | canonical adoption of bounded R1 surface |
| K4-R2 authorization | `52aa0256456edcaefe3800cc0b4855a95d0acf64` (PR #173) | bounded caller-materialized MCP catalog-evidence gate |
| K4-R2 prerequisite authorization | `8f7e7f6faf6478edb08dfbf4ade97cc71b6e35d2` (PR #174) | one-path K4-R1 regression-hardening authority |
| K4-R1 regression hardening | `78d71717e14d51c6efc49b5b0906a564d2459d7a` (PR #175) | canonical continuing K4-R1 regression gate |
| K4-R2 implementation | `153b30b5187804c9eb31a25759d0646e4235ddfc` (PR #176) | bounded MCP catalog evidence |
| K4-R2 canonical evidence | `61afa9c7abb5a9d155e8a83143302853564346ff` (PR #177) | canonical adoption of bounded R2 surface |
| K4-R3 authorization | `17bbd953d0cd9860a8fdabbe3346b52ca20b359c` (PR #178) | pinned ACP v2 method-catalog evidence and prerequisite hardening |
| K4-R2 regression hardening | `073505d8dce35439f9cf9d7d402c98eec34ac682` (PR #179) | canonical continuing K4-R2 regression gate |
| K4-R3 implementation | `46ad98180af290081a914f1c78e5c7519d6f5749` (PR #180) | pinned data-only ACP v2 method catalog evidence |
| K4-R3 canonical evidence | `99abc697219048bbbf6164abfc157b30a83dc9eb` (PR #181) | canonical adoption of bounded R3 surface |
| K4-R4 authorization | `8aac41ec871446f138f8502b1224e947aa67ed95` (PR #182) | caller-materialized Agent Skill package-evidence gate |
| K4-R4 implementation | `21cb4478c00089fd0c9500a437fb46d5bae5d588` (PR #183) | bounded redacted Agent Skill package evidence |
| K4-R4 canonical evidence | `7ec38dba8232084dbc1a35ead2faec70cf413403` (PR #184) | canonical adoption of bounded R4 surface |
| K4-R5 authorization | `f52085bf5de47887d05e3349bde23a2822cd41a5` (PR #185) | bounded Agent Skill governance-claim evidence gate |
| K4-R5 implementation | `cbba059ffdc55c06adf4213833960df9e63d9e95` (PR #186) | bounded caller-asserted governance-claim evidence |
| K4-R5 canonical evidence | `61a7794082a14796a7a1913e2eddf3d067954f7a` (PR #187) | canonical adoption of bounded R5 surface |

## Required K4 closeout exit matrix

A later closeout candidate must prove at least:

| Bounded K4 exit requirement | Required canonical evidence |
| --- | --- |
| exact external-standard baselines | K4-R1 pins exact MCP, ACP, and Agent Skills revisions plus specification/license evidence |
| semantic capability normalization | K4-R1 closed external-object vocabulary, explicit normalization dispositions, H1 semantic identifiers, deterministic identities and snapshots |
| capability-registry boundary | K4-R1 pure in-memory registry, ownership-safe disposal, bounded capacity, no executable authority |
| MCP compatibility evidence | K4-R2 exact caller-materialized tools/resources/prompts catalog evidence and current/stale/unbound correlation |
| ACP compatibility evidence | K4-R3 exact pinned 16-method ACP v2 catalog and deterministic binding evidence |
| Agent Skills package evidence | K4-R4 portable metadata plus redacted content/provenance identity evidence |
| Agent Skills governance metadata | K4-R5 package-version, requested-capability, effect-requirement, compatibility, and evaluation claims with fixed non-authority states |
| provenance / version / digest discipline | exact standard pins plus content-addressed immutable evidence across R1-R5 |
| trust and authority separation | discovery, names, metadata, package evidence, governance claims, and registry membership never become trust, approval, routing, or execution authority |
| K2 side-effect boundary preserved | no K4-R1-R5 path creates a second ExecutionGateway, policy authority, `PROVEN_READY`, repository-write, approval, or merge authority |
| repository qualification | canonical implementation/evidence records, exact-head CI/review, runtime/typecheck/Python/Ruff/provenance evidence remain internally consistent |
| dedicated K4 closeout evidence | one closeout record plus reconciliation of the four current authority surfaces |

## Closeout meaning

If the later closeout gate passes, it may establish only:

```text
K4: CLOSED FOR THE CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K4-R1 THROUGH K4-R5: CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K4-R6+: NOT REQUIRED FOR THIS BOUNDED CLOSEOUT / NOT AUTHORIZED
```

That closure means the accepted data-only ecosystem-compatibility evidence foundation is complete. It does **not** establish:

- an MCP client or server;
- MCP network discovery, resource/prompt retrieval, or tool invocation;
- an ACP client/agent transport, session, authentication, permission, filesystem, terminal, or custom-method runtime;
- Agent Skill package discovery/read, YAML/Markdown parsing, installation, activation, routing, instruction loading, script/hook/command execution, or `allowed-tools` approval;
- capability approval, trust qualification, policy decisions, effect grants, or executable registry membership;
- persistent marketplace/registry/storage;
- donor source or new dependency admission;
- K5, K6, K7, KRI-R5+, release, publication, or brand authority;
- any Z0/Z0L/zrok, secret, GitHub App, webhook, public-endpoint, payment, or founder trust-root authority.

These are explicit preserved non-grants, not hidden closeout defects. Future executable compatibility may be separately defined and authorized while continuing to obey ADR-0007 and the K2 Trust Kernel / ExecutionGateway path.

## Authorized future closeout evidence scope

After this authorization becomes canonical, the dedicated K4 closeout candidate may change exactly:

```text
docs/planning/KODAC_K4_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-25.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/ROADMAP.md
docs/roadmap/VERSION_PLAN.md
```

No source, test, schema, fixture, workflow, dependency, lockfile, provenance-policy, ruleset, protected-lane, PR #163, or Z0-family artifact change is authorized by this closeout lifecycle.

## Qualification and merge gate for this authorization

This authorization is canonical only if:

1. its base remains exact canonical `main` at `61a7794082a14796a7a1913e2eddf3d067954f7a`, or any reconciliation is explicit and does not expand scope;
2. the diff is exactly this one new planning document;
3. repository-required documentation/governance checks pass on the exact head;
4. terminal independent review reports zero current material findings and zero unresolved actionable threads;
5. merge uses exact expected-head protection and normal merge-commit semantics; and
6. post-merge proof verifies ordered parents, merge tree, and protected `main`.

This authorization does not itself close K4 and does not authorize K5 implementation.

## Preserved hard boundaries

```text
PROVIDER / REVIEWER SPEND: $0
REAL SECRET ACCESS: NOT AUTHORIZED
Z0L / ZROK EXECUTION: NOT AUTHORIZED
PUBLIC ENDPOINT: NOT AUTHORIZED
GITHUB APP / WEBHOOK MUTATION: NOT AUTHORIZED
PAYMENT METHOD: NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH: NOT AUTHORIZED
```

PR #163 and every Z0-family surface remain separate and untouched.
