# Kodac K4 Canonical Closeout Evidence

## Record identity

- Date: 2026-08-25
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-25`
- Authority class: DOCUMENTATION / ENGINEERING MILESTONE CLOSEOUT
- Canonical base commit: `5b71b0502de8430ae9fd5cd09327ed12fec13f82`
- Canonical base tree: `5ae877c61955802a1e9df374edd974e97955ff35`
- K4 bounded-closeout authorization merge: `5b71b0502de8430ae9fd5cd09327ed12fec13f82` (PR #188)
- K4-R5 canonical-evidence merge: `61a7794082a14796a7a1913e2eddf3d067954f7a` (PR #187)
- Governing compatibility architecture: `docs/adr/ADR-0007-native-mcp-acp-agent-skills-compatibility.md`

## Decision

Conditionally close the K4 engineering milestone for the exact bounded data-only ecosystem-compatibility surface canonically adopted through K4-R1 through K4-R5:

```text
K4: CLOSED FOR THE CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE IFF THIS CLOSEOUT MERGE GATE PASSES
K4-R1 THROUGH K4-R5: CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K4-R6+: NOT REQUIRED FOR THIS BOUNDED CLOSEOUT / NOT AUTHORIZED
```

This is an engineering-milestone decision, not a claim that every future executable direction in ADR-0007 has been implemented. The accepted K4 surface is deliberately evidence-first and non-executable. Future MCP/ACP/Agent Skills transport, installation, activation, routing, or effectful compatibility remains separately authorizable work behind Kodac-owned policy and ExecutionGateway boundaries.

## Canonical K4 ledger

Every merge below must remain an ancestor of this record's exact canonical base.

| Gate | Canonical identity | Accepted bounded outcome |
| --- | --- | --- |
| K4 definition / K4-R1 authorization | `f64a5f1ddbe57970d214c2f7b042fa421a0562fa` (PR #170) | defines K4 and authorizes data-only standard pins and capability normalization |
| K4-R1 implementation | `034da7bfeee9439828ea0f639c7ce63ee0b3b9da` (PR #171) | standard pins, normalized capability bindings, deterministic in-memory registry |
| K4-R1 canonical evidence | `f8ad3faab690487f2e9490664c539c281e8fde44` (PR #172) | canonical adoption of bounded R1 surface |
| K4-R2 authorization | `52aa0256456edcaefe3800cc0b4855a95d0acf64` (PR #173) | bounded caller-materialized MCP catalog-evidence gate |
| K4-R2 prerequisite authorization | `8f7e7f6faf6478edb08dfbf4ade97cc71b6e35d2` (PR #174) | one-path K4-R1 regression-hardening authority |
| K4-R1 regression hardening | `78d71717e14d51c6efc49b5b0906a564d2459d7a` (PR #175) | continuing canonical K4-R1 regression gate |
| K4-R2 implementation | `153b30b5187804c9eb31a25759d0646e4235ddfc` (PR #176) | bounded MCP catalog evidence |
| K4-R2 canonical evidence | `61afa9c7abb5a9d155e8a83143302853564346ff` (PR #177) | canonical adoption of bounded R2 surface |
| K4-R3 authorization | `17bbd953d0cd9860a8fdabbe3346b52ca20b359c` (PR #178) | pinned ACP v2 method-catalog evidence and prerequisite hardening |
| K4-R2 regression hardening | `073505d8dce35439f9cf9d7d402c98eec34ac682` (PR #179) | continuing canonical K4-R2 regression gate |
| K4-R3 implementation | `46ad98180af290081a914f1c78e5c7519d6f5749` (PR #180) | pinned data-only ACP v2 method-catalog evidence |
| K4-R3 canonical evidence | `99abc697219048bbbf6164abfc157b30a83dc9eb` (PR #181) | canonical adoption of bounded R3 surface |
| K4-R4 authorization | `8aac41ec871446f138f8502b1224e947aa67ed95` (PR #182) | caller-materialized Agent Skill package-evidence gate |
| K4-R4 implementation | `21cb4478c00089fd0c9500a437fb46d5bae5d588` (PR #183) | bounded redacted Agent Skill package evidence |
| K4-R4 canonical evidence | `7ec38dba8232084dbc1a35ead2faec70cf413403` (PR #184) | canonical adoption of bounded R4 surface |
| K4-R5 authorization | `f52085bf5de47887d05e3349bde23a2822cd41a5` (PR #185) | bounded Agent Skill governance-claim evidence gate |
| K4-R5 implementation | `cbba059ffdc55c06adf4213833960df9e63d9e95` (PR #186) | bounded caller-asserted governance-claim evidence |
| K4-R5 canonical evidence | `61a7794082a14796a7a1913e2eddf3d067954f7a` (PR #187) | canonical adoption of bounded R5 surface |
| K4 bounded closeout authorization | `5b71b0502de8430ae9fd5cd09327ed12fec13f82` (PR #188) | authorizes only this five-document closeout lifecycle and records that no R6 is invented |

The K4-R5 canonical-evidence merge has exact ordered parents and tree:

```text
parent 1: cbba059ffdc55c06adf4213833960df9e63d9e95
parent 2: d0d3daf604697208a09fad2da48345ab744fd082
merge:    61a7794082a14796a7a1913e2eddf3d067954f7a
tree:     92b35aaa534b0209a56232b78443254eb686ef4d
```

The K4 closeout-authorization merge has exact ordered parents and tree:

```text
parent 1: 61a7794082a14796a7a1913e2eddf3d067954f7a
parent 2: 117eec156daf6af63a46a04226609fbd27ea8445
merge:    5b71b0502de8430ae9fd5cd09327ed12fec13f82
tree:     5ae877c61955802a1e9df374edd974e97955ff35
```

## Exit-evidence matrix

| Bounded K4 exit requirement | Canonical evidence | Closeout result |
| --- | --- | --- |
| exact external-standard baselines | K4-R1 pins exact MCP, ACP, and Agent Skills revisions plus specification/license evidence | PASS |
| semantic capability normalization | K4-R1 closed external-object vocabulary, explicit `UNRESOLVED` / `SINGLE` / `COMPOSITE` dispositions, H1 semantic identifiers, deterministic identities and snapshots | PASS |
| capability-registry boundary | K4-R1 pure in-memory registry, bounded capacity, ownership-safe disposal, no executable authority | PASS |
| MCP compatibility evidence | K4-R2 caller-materialized tools/resources/prompts catalog evidence with deterministic `UNBOUND` / `CURRENT` / `STALE` correlation | PASS for bounded data-only evidence |
| ACP compatibility evidence | K4-R3 exact pinned 16-method ACP v2 catalog with deterministic method metadata and binding evidence | PASS for bounded data-only evidence |
| Agent Skills package evidence | K4-R4 caller-materialized portable metadata plus redacted content/provenance identity evidence | PASS for bounded data-only evidence |
| Agent Skills governance metadata | K4-R5 package-version, requested-capability, requirement, compatibility, and evaluation claims with fixed `CALLER_ASSERTED`, `UNASSESSED`, and `NONE` states | PASS |
| provenance/version/digest discipline | exact standard pins plus content-addressed immutable evidence across R1-R5 | PASS |
| trust/authority separation | names, metadata, package evidence, governance claims, evaluation identities, and registry membership never become trust, approval, routing, or execution authority | PASS |
| K2 side-effect boundary preserved | no K4 path creates a second ExecutionGateway, policy authority, repository-write/approval/merge authority, or `PROVEN_READY` source | PASS |
| no invented R6 requirement | canonical roadmap defines no K4-R6 contract or unsatisfied bounded data-only exit requirement; PR #188 explicitly authorizes closeout without inventing R6 | PASS |
| repository qualification | R1-R5 implementation/evidence gates contain exact-head CI/review/runtime/typecheck/Python/Ruff/provenance evidence; closeout candidate requires fresh exact-head docs/governance qualification | PASS subject to this exact-head merge gate |
| dedicated K4 closeout evidence | this record plus reconciled STATUS / MILESTONES / ROADMAP / VERSION_PLAN | PASS subject to canonical adoption |

## Contract truth and limitations

The closed bounded K4 path is:

```text
pinned external standards
-> deterministic external-object / semantic-capability normalization
-> immutable in-memory compatibility registry
-> caller-materialized MCP catalog evidence
-> pinned ACP v2 method-catalog evidence
-> caller-materialized Agent Skill package evidence
-> caller-materialized Agent Skill governance-claim evidence
```

Mandatory distinctions remain:

- external declaration != normalized semantic mapping;
- normalized semantic mapping != trust;
- registry membership != execution authority;
- caller materialization != Kodac discovery or verification;
- package evidence != installation or activation;
- governance claim != verified fact;
- evaluation artifact identity != reproduced result;
- requested capability != approved capability;
- requirement claim != effect grant;
- `UNASSESSED` != trusted;
- K4 evidence may inform later milestones but cannot authorize a side effect.

## Platform applicability

The accepted K4-R1 through K4-R5 production contracts are deterministic TypeScript data surfaces within the repository's existing Node runtime contract. Their exact implementation gates include repository runtime, strict TypeScript, Python, Ruff, provenance, schema, hostile-input, and checkout-integrity evidence as applicable.

Platform-specific repository tests remain truthfully platform-gated. In particular, K4-R5 evidence records Linux hosted and Windows/local runtime populations separately rather than claiming identical test collection across platforms. This closeout makes no broader platform/runtime compatibility claim than the individual canonical gates already prove.

## Closure meaning

If the exact merge gate below passes, K4 closure establishes:

```text
BOUNDED DATA-ONLY ECOSYSTEM COMPATIBILITY EVIDENCE: CANONICAL
EXACT MCP / ACP / AGENT SKILLS BASELINE PINS: CANONICAL
SEMANTIC CAPABILITY NORMALIZATION + IN-MEMORY REGISTRY: CANONICAL FOR BOUNDED R1 SCOPE
CALLER-MATERIALIZED MCP / ACP / AGENT SKILLS EVIDENCE: CANONICAL FOR R2-R5 SCOPES
K2 SIDE-EFFECT AUTHORITY SEPARATION: PRESERVED
K4: CLOSED FOR THE CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
```

K4 closure does **not** establish:

- MCP client/server transport, network discovery, resource/prompt retrieval, or tool invocation;
- ACP client/agent transport, JSON-RPC execution, session/authentication/permission/filesystem/terminal behavior, or custom-method execution;
- Agent Skill package discovery/read, YAML/Markdown parsing, installation, activation, routing, `allowed-tools` approval, instruction loading, script/hook/command/asset/binary execution;
- capability approval, trust qualification, policy decisions, effect grants, or executable registry membership;
- persistent marketplace/registry/storage;
- donor source or new dependency admission;
- completion of every future executable direction in ADR-0007;
- K4-R6+ implementation authority;
- K5, K6, K7, KRI-R5+, public release, package publication, brand launch, or name/trademark clearance;
- any Z0/Z0L/zrok, secret, GitHub App, webhook, public-endpoint, payment, provider-spend, or founder trust-root authority.

Those are preserved non-grants, not defects hidden by the bounded closeout claim. Future executable compatibility may be separately defined and authorized while preserving ADR-0007 and the K2 Trust Kernel / ExecutionGateway path.

## Exact documentation scope

This closeout candidate may change exactly:

```text
docs/planning/KODAC_K4_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-25.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/ROADMAP.md
docs/roadmap/VERSION_PLAN.md
```

No source, test, schema, fixture, workflow, dependency, lockfile, provenance-policy, ruleset, protected-lane document, PR #163, or Z0-family artifact is changed.

## Candidate qualification

The exact closeout candidate must establish on its final head:

- exact canonical base / ancestry and the complete K4 ledger above;
- exact five-document scope;
- no source/runtime/dependency/protected-boundary mutation;
- repository-required governance and K2 runtime checks green;
- documentation and authority-state consistency;
- terminal independent review with zero current material findings and zero unresolved actionable threads;
- spend `$0` and all protected operational boundaries unchanged.

Earlier R1-R5 implementation test evidence remains historical proof for those exact canonical implementation heads; this documentation-only closeout does not relabel it as tests executed on the closeout head.

## Exact closeout merge gate

K4 becomes closed only if:

1. the closeout PR base is exactly canonical main `5b71b0502de8430ae9fd5cd09327ed12fec13f82` with tree `5ae877c61955802a1e9df374edd974e97955ff35`, or any reconciliation is explicit and scope-preserving;
2. every canonical ledger merge above remains an ancestor of the candidate;
3. the final diff is exactly the five authorized documentation paths;
4. repository-required exact-head Actions and documentation/authority checks are green;
5. terminal independent review is anchored to the exact final head with zero material findings and zero unresolved actionable threads;
6. merge uses `expected_head_sha` protection and normal merge-commit semantics;
7. merge ordered parents are exactly the pre-merge canonical main then the qualified closeout head;
8. merge tree equals the qualified closeout-head tree; and
9. post-merge protected `main` equals that merge commit and tree.

If any condition fails, K4 remains defined/in progress and this record is not canonical closeout authority.

## Post-gate state

After and only after the exact closeout merge gate passes:

```text
K4: CLOSED FOR THE CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K4-R1 THROUGH K4-R5: CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
K4-R6+: NOT REQUIRED FOR K4 CLOSEOUT / NOT AUTHORIZED
K5: PROPOSED / NOT AUTHORIZED
K6: PROPOSED / NOT AUTHORIZED
K7: PROPOSED / NOT AUTHORIZED
```

This closeout grants no later implementation, execution, release, publication, or operational authority by implication.
