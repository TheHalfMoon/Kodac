# Kodac K4-R2 Preimplementation Review-Hardening Scope Extension

## Record identity

- Date: 2026-08-24
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-24`
- Authority class: DOCUMENTATION / PREIMPLEMENTATION CI-GATE SCOPE EXTENSION
- Canonical base commit: `52aa0256456edcaefe3800cc0b4855a95d0acf64`
- Canonical base tree: `11f0b5cecef4c4ef794dc8933a63c0de611eb651`
- Original K4-R2 authorization: `docs/planning/KODAC_K4_R2_CALLER_MATERIALIZED_MCP_CATALOG_EVIDENCE_AUTHORIZATION_2026-08-24.md`
- Original K4-R2 authorization merge: `52aa0256456edcaefe3800cc0b4855a95d0acf64` (PR #173)
- Canonical K4-R1 implementation merge: `034da7bfeee9439828ea0f639c7ce63ee0b3b9da` (PR #171)
- Canonical K4-R1 qualified tree: `490e057252bda42243471a6b755bfc7bb79966cd`
- Workflow requiring hardening: `.github/workflows/k4-r1-compatibility-normalization.yml`

## Decision

Authorize one separate, exact one-path workflow-hardening implementation before K4-R2 source work begins:

```text
K4-R2 IMPLEMENTATION: AUTHORIZED / NOT YET CANONICAL
K4-R1 SHARED-EXPORT CANONICAL-REGRESSION WORKFLOW HARDENING: EXACT ONE-PATH IMPLEMENTATION AUTHORIZED
K4-R2 SOURCE PR BEFORE THAT HARDENING IS CANONICALLY MERGED: NOT ADMISSIBLE
K4-R2 ORIGINAL FIVE-PATH IMPLEMENTATION ALLOWLIST: UNCHANGED
K4-R3+: NOT AUTHORIZED
```

This extension repairs only an inherited CI-gate conflict. It grants no product behavior, source-contract expansion, protocol capability, authority, effect, dependency, or additional K4-R2 implementation path.

## Preimplementation evidence and necessity

The canonical K4-R1 workflow is intentionally bound to the historical one-time K4-R1 implementation branch and base. Its trigger also owns the shared package export aggregator:

```text
packages/kodac-runtime/src/index.ts
```

The exact authorized K4-R2 implementation must change that same shared export aggregator so the new bounded module is available from the package surface. GitHub therefore must trigger the K4-R1 workflow on the K4-R2 PR. The current K4-R1 workflow would then reject the K4-R2 PR before testing because:

- the K4-R2 branch is not `codex/k4-r1-compatibility-normalization`;
- the K4-R2 base is not the historical K4-R1 authorization merge;
- the K4-R2 five-path diff is not the historical K4-R1 six-path diff; and
- the canonical compatibility directory would contain the separately authorized sibling `mcp-catalog.ts` module.

Removing `src/index.ts` from the K4-R1 trigger would avoid the immediate false failure but would also stop protecting the canonical K4-R1 exports. The safe repair is a canonical-regression mode that continues to trigger on the shared export and fails if the accepted K4-R1 artifacts or exports regress, while allowing separately authorized sibling compatibility modules to be tested by their own exact gate.

## Exact hardening implementation scope

After canonical adoption of this extension, the hardening PR may change exactly one path:

```text
.github/workflows/k4-r1-compatibility-normalization.yml
```

The hardening branch must be exactly:

```text
codex/k4-r1-canonical-regression-hardening
```

No production source, test, schema, fixture, package manifest, dependency, lockfile, provenance policy, ruleset, protected-lane record, or other workflow may change.

## Authorized workflow transformation

The K4-R1 workflow may be changed only to perform both of these closed modes:

### One-time hardening admission mode

On the exact hardening branch, the workflow must:

- require its pull-request base to equal this extension's canonical merge;
- require the diff to contain exactly the one workflow path above;
- attest the exact checked-out pull-request head and a clean checkout;
- use only the already-verified immutable Action commits;
- run the full K4-R1 schema, purity, runtime, provenance, and checkout-unchanged proofs.

The baseline placeholder in the workflow must be replaced with the exact canonical merge of this extension before the hardening candidate is committed.

### Continuing canonical-regression mode

On every later pull request that triggers the workflow, it must:

- attest the exact checked-out pull-request head and a clean checkout;
- compare the K4-R1 schema, production contracts, binding registry, and focused test against the canonical K4-R1 implementation merge and fail on any byte change;
- require `packages/kodac-runtime/src/index.ts` to retain exactly one export for `./compatibility/contracts.ts` and exactly one export for `./compatibility/registry.ts`;
- scan only the two canonical K4-R1 production modules for their exact import and purity contract rather than treating the entire compatibility directory as K4-R1-owned;
- validate the canonical Draft 2020-12 K4-R1 schema and representative instances;
- run the full runtime test set, including every separately authorized compatibility sibling present in the candidate;
- run provenance validation; and
- prove the checkout remains byte-clean after all checks.

This mode does not authorize a later K4-R1 artifact change. Any byte change to a protected K4-R1 artifact must fail and requires a separate explicit maintenance authorization.

## Immutable Actions and exact runtime surface

The hardening may continue to use only:

```text
actions/checkout@11d5960a326750d5838078e36cf38b85af677262
actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020
astral-sh/setup-uv@d0cc045d04ccac9d8b7881df0226f9e82c39688e
```

No additional Action, package, download, generated source, script, hook, binary, credential, token scope, cache, artifact, or external service is admitted.

## Required hardening proofs

The one-path workflow candidate must prove at least:

1. exact branch, base, head, one-path scope, and clean checkout in hardening-admission mode;
2. the canonical K4-R1 schema, contracts, registry, and focused test are byte-identical to merge `034da7bfeee9439828ea0f639c7ce63ee0b3b9da`;
3. both canonical K4-R1 package exports occur exactly once;
4. separately authorized sibling files in `src/compatibility/` do not cause a false K4-R1 closed-directory failure;
5. any mutation of a protected K4-R1 artifact fails the canonical-regression check;
6. removing or duplicating either K4-R1 shared export fails;
7. K4-R1 production imports remain limited to their exact canonical deterministic surface;
8. dynamic import, global/network escape, filesystem/process authority, and unauthorized Node APIs remain rejected;
9. the Draft 2020-12 K4-R1 schema and representative valid/invalid instances pass;
10. full runtime, Python, Ruff, provenance, immutable-action, and checkout-unchanged gates are green.

## K4-R2 reconciliation rule

The original K4-R2 five-path implementation allowlist remains exact and unchanged:

```text
.github/workflows/k4-r2-mcp-catalog-evidence.yml
schema/k4-r2-mcp-catalog-evidence.schema.json
packages/kodac-runtime/src/compatibility/mcp-catalog.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k4-r2-mcp-catalog-evidence.test.ts
```

K4-R2 source work may resume only after the hardening PR:

- descends directly from this extension's canonical merge;
- changes exactly the one authorized workflow path;
- passes exact-head CI and normal included review with zero unresolved actionable findings;
- merges with exact expected-head semantics;
- has ordered parents and tree equality proven after merge; and
- thereby canonically establishes the continuing K4-R1 regression gate.

The later K4-R2 workflow must bind its one-time implementation baseline to that canonical hardening merge. The K4-R2 PR must remain limited to its original five paths and must pass both its dedicated exact gate and the continuing K4-R1 canonical-regression gate.

## Canonicalization rule

No separate evidence PR is required for this one-path CI repair. The hardening becomes canonical only when its exact implementation PR satisfies every gate above and post-merge proof confirms:

```text
ordered parents = [this extension's canonical merge, exact reviewed hardening head]
merge tree = exact reviewed hardening tree
main = exact hardening merge
```

PR-body qualification evidence and the immutable Git/GitHub objects provide the implementation ledger. Until that exact merge proof passes, K4-R2 source work remains inadmissible.

## Explicit non-grants

```text
K4-R1 SCHEMA / CONTRACT / REGISTRY / TEST CHANGE: NOT AUTHORIZED
K4-R1 BEHAVIOR OR IDENTITY CHANGE: NOT AUTHORIZED
REMOVAL OF K4-R1 SHARED-EXPORT PROTECTION: NOT AUTHORIZED
K4-R2 IMPLEMENTATION ALLOWLIST EXPANSION: NOT AUTHORIZED
K4-R2 SOURCE PR BEFORE CANONICAL WORKFLOW HARDENING: NOT AUTHORIZED

NEW ACTION / PACKAGE / DEPENDENCY / DOWNLOAD: NOT AUTHORIZED
NETWORK / FILESYSTEM / PROCESS / SECRET AUTHORITY: NOT AUTHORIZED
WORKFLOW WRITE PERMISSION OR CREDENTIAL PERSISTENCE: NOT AUTHORIZED
RULESET / PROVENANCE POLICY / PROTECTED-LANE CHANGE: NOT AUTHORIZED

MCP CLIENT / SERVER / JSON-RPC / TRANSPORT / DISCOVERY / INVOCATION: NOT AUTHORIZED
CURSOR TRAVERSAL / CACHE / RESOURCE READ / PROMPT GET / TOOL CALL: NOT AUTHORIZED
K4-R3+ / K5 / K6 / K7 / KRI-R5+ IMPLEMENTATION: NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH: NOT AUTHORIZED
```

PR #163, all Z0-family work, zrok, paid review/provider spend, real secrets, GitHub Apps, webhooks, and founder-process trust-root establishment remain outside this gate and untouched.

## Exact documentation scope

This extension candidate may change exactly:

```text
docs/planning/KODAC_K4_R2_REVIEW_HARDENING_SCOPE_EXTENSION_2026-08-24.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/ROADMAP.md
docs/roadmap/VERSION_PLAN.md
```

No source, test, schema, fixture, workflow, dependency, lockfile, provenance-policy, ruleset, protected-lane, or PR #163 artifact changes in this authorization candidate.

## Merge gate

This extension becomes canonical only if:

- the final diff is exactly this record plus the four current-authority surfaces;
- canonical `main` remains the exact expected base or the candidate is explicitly reconciled without scope expansion;
- full repository validation and docs-only CI are green on the exact head;
- normal included review is terminal with zero current material findings and zero unresolved actionable threads;
- no source, test, schema, workflow, fixture, dependency, lockfile, provenance-policy, ruleset, or protected-lane path changes;
- merge uses exact expected-head semantics and preserves the intended five-path tree; and
- post-merge proof verifies ordered parents and tree equality.

Canonical adoption authorizes only the exact one-path workflow hardening above. It does not itself repair the workflow, implement K4-R2, close K4, or authorize any later milestone.
