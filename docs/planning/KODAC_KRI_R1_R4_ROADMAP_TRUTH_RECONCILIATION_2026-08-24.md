# Kodac KRI-R1 through KRI-R4 Roadmap-Truth Reconciliation

## Record identity

- Date: 2026-08-24
- Authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-24`
- Record class: DOCUMENTATION / CURRENT-TRUTH RECONCILIATION
- Implementation authority created by this record: NONE
- Reconciliation base commit: `8e6525716d7128fd2d328bafa6fb8dc499100d97`
- Reconciliation base tree: `0716226827eadc6df0287655e2208d8e9da1fbef`

## Decision

Reconcile the canonical roadmap and product-status surfaces to repository history: KRI-P0 is canonical planning authority, and KRI-R1 through KRI-R4 are canonical only for their separately authorized, bounded implementation scopes.

The prior blanket statements `KRI IMPLEMENTATION: NOT AUTHORIZED` became historically stale after those separate gates merged. Replacing them with exact R1-through-R4 truth does not authorize new implementation.

```text
KRI-P0: CANONICAL PLANNING AUTHORITY
KRI-R1 THROUGH KRI-R4: CANONICAL / COMPLETE FOR THEIR SEPARATELY AUTHORIZED BOUNDED SCOPES
KRI-R5+: NOT AUTHORIZED
KRI TRACK: NOT CLOSED BY THIS RECORD
```

## Canonical ancestry proof

Each commit below was verified with `git merge-base --is-ancestor <commit> 8e6525716d7128fd2d328bafa6fb8dc499100d97` before this reconciliation was authored.

| Gate | Canonical merge commit | Role |
| --- | --- | --- |
| KRI-P0 | `37baeeb188ec1b214ceb1ba4d5b2a25bf2978356` | Planning and contract-design authority |
| KRI-R1 authorization | `a6649626fd0c91f8326311ce532ca3ed16dba068` | Bounded corpus implementation authorization |
| KRI-R1 implementation | `a72a2308d03d7e07184df4d565ec4a2164280ca3` | Canonical corpus implementation |
| KRI-R2 authorization | `efb3944a5638096fe845d49c3b1edf4ff91ea0c9` | Bounded finding/adjudication runtime authorization |
| KRI-R2 implementation | `6c1bf238e151f396191336f3a9902f21770bddf7` | Canonical R2 implementation |
| KRI-R3 authorization | `63b39e32266eb85ee05d73ea0ebe1ba6a2ab39a2` | Provider-neutral execution authorization |
| KRI-R3 implementation | `43a8f6f1b4497ac52bdb1c6f9a4e77e93ba5bc12` | Canonical R3 implementation |
| KRI-R4 authorization | `b29a99d7c6743aa0f3ea271b16e59be362fec9a9` | Qualification/benchmark authorization |
| KRI-R4 implementation | `ad5af49978a1d7befed1425f02a64474d3dc4ca7` | Canonical R4 implementation |

## Exact bounded scope retained

| Slice | Canonical scope | Boundary retained |
| --- | --- | --- |
| KRI-P0 | Reviewer Intelligence planning, contracts, principles, benchmark families, and gate decomposition | No implementation authority from P0 alone |
| KRI-R1 | Deterministic offline test/evidence-only gold reviewer-evidence corpus with four adjudicated historical cases | No runtime engine, model call, network fetch, persistence, or write authority |
| KRI-R2 | Deterministic finding/adjudication schemas, contracts, and bounded read-only runtime for materialized claims and adjudications | No provider integration, persistence, writes, merge, or `PROVEN_READY` authority |
| KRI-R3 | Provider-neutral bounded reviewer executor and R2 handoff through a caller-injected provider interface | No concrete adapter/SDK/transport/network/secrets/persistence; timeout bounds waiting and does not prove forcible provider termination |
| KRI-R4 | Pure/in-memory historical-claim-disposition qualification engine | The four-case R1 corpus yields `INSUFFICIENT_EVIDENCE` under the default policy; qualification is not general trust, finding truth, default routing, approval, merge, or `PROVEN_READY` |

## Stale authority surfaces corrected

The following current-authority documents named KRI-P0 but still denied all KRI implementation after KRI-R1 through KRI-R4 had merged:

- `docs/roadmap/ROADMAP.md`;
- `docs/roadmap/MILESTONES.md`;
- `docs/roadmap/VERSION_PLAN.md`;
- `docs/product/STATUS.md`.

This gate changes those documents only enough to distinguish:

1. KRI-P0 planning authority;
2. canonical, bounded KRI-R1 through KRI-R4 implementation truth;
3. the absence of KRI-R5+ authority;
4. the continued separation of KRI from K2 side-effect and Done Gate authority.

## Preserved non-grants

```text
KRI-R5+ IMPLEMENTATION: NOT AUTHORIZED
K5 IMPLEMENTATION: NOT AUTHORIZED
K3-R6+: NOT AUTHORIZED
K4 / K6 / K7 IMPLEMENTATION: NOT AUTHORIZED BY THIS RECORD

CUBIC SOURCE INTAKE OR INTEGRATION: NOT AUTHORIZED
CODERABBIT SOURCE INTAKE OR INTEGRATION: NOT AUTHORIZED
EXTERNAL REVIEW SERVICE INTEGRATION: NOT AUTHORIZED
CONCRETE EXTERNAL REVIEWER ADAPTER: NOT AUTHORIZED
PROVIDER NETWORK / SECRET HANDLING: NOT AUTHORIZED

NEW KODAC DEPENDENCIES: NOT AUTHORIZED
CODE IMPORT: NOT AUTHORIZED
PERSISTENT REVIEW STORAGE OR LEARNING: NOT AUTHORIZED
VECTOR / EMBEDDING INFRASTRUCTURE: NOT AUTHORIZED
PRODUCTION REVIEWER ROUTING / DEFAULT SELECTION: NOT AUTHORIZED

AUTOFIX OR REPOSITORY WRITE AUTHORITY: NOT AUTHORIZED
GITHUB COMMENT / REVIEW WRITE AUTHORITY: NOT AUTHORIZED
PR APPROVAL OR MERGE AUTHORITY FROM KRI: NOT AUTHORIZED
PROVEN_READY AUTHORITY FROM KRI: NOT AUTHORIZED
RULESET CHANGE: NOT AUTHORIZED
K2 EXECUTION-AUTHORITY EXPANSION: NOT AUTHORIZED

PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH: NOT AUTHORIZED
```

PR #163, all Z0-family work, zrok, paid review/provider spend, secrets, GitHub Apps, webhooks, and trust-root changes remain outside this record and untouched.

## Review-driven consistency correction

Exact-head review of the first candidate identified that the centralized preserved non-grants were stricter than the repeated non-grant blocks in the four authority surfaces. The `K2 EXECUTION-AUTHORITY EXPANSION` prohibition was already present in every block. The exact `CONCRETE EXTERNAL REVIEWER ADAPTER` and `PROVIDER NETWORK / SECRET HANDLING` prohibitions are now repeated in all four blocks so no authority surface depends on a weaker synonym or an indirect cross-reference.

This correction repeats existing prohibitions. It grants no new authority and changes no KRI behavior or implementation scope.

## Local validation before candidate commit

The complete repository validation set passed on the five-document candidate working tree:

| Check | Result |
| --- | --- |
| `npm test --prefix packages/kodac-runtime` | PASS — 826 tests; 724 passed; 102 intentionally skipped; 0 failed |
| `uv run pytest` | PASS — 395 passed |
| `uv run ruff check .` | PASS |
| strict TypeScript `tsc --noEmit` for `packages/kodac-runtime` | PASS |
| `git diff --check` | PASS |

These local results establish candidate cleanliness only. Canonical status still requires exact-head CI, included review, and merge.

## Validation and merge gate

This record is eligible for canonical adoption only if:

- the diff remains confined to this record and the four named authority surfaces;
- no runtime, schema, fixture, workflow, dependency, manifest, lockfile, ruleset, or source-intake path changes;
- all canonical KRI merge identities remain ancestors of the PR base;
- repository tests, lint, strict typecheck, documentation/diff classification, and normal included review are green for the exact final head;
- all preserved non-grants remain explicit;
- no activity targets PR #163 or any Z0-family path.

This documentation reconciliation does not modify `code_import_authorized`, admit external source, close KRI, or authorize a next implementation slice.
