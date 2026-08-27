# Kodac K6-R4 Trusted Qualification Hardening Authorization

## Record identity

- Date: 2026-08-27
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-27`
- Authority class: DOCUMENTATION / PREIMPLEMENTATION GOVERNANCE-HARDENING AUTHORIZATION CANDIDATE
- Canonical base commit: `1e8c193ca0aeeb77b56ad1c75d9d7db0ca82b372`
- Canonical base tree: `a75da9d57827e0967319fb5495dc7e6cac9a23f8`
- Canonical K6-R4 authorization merge: `1e8c193ca0aeeb77b56ad1c75d9d7db0ca82b372` (PR #211)
- Active implementation PR at discovery: PR #212
- Governing R4 authorization: `docs/planning/KODAC_K6_R4_PRIVACY_GOVERNED_OUTCOME_MEMORY_AUTHORIZATION_2026-08-26.md`
- Protected-main ruleset: `20707483` (`Kodac canonical main protection v1`)
- Ruleset trusted node ID: `RRS_lACqUmVwb3NpdG9yec5NVN5LzgE7-Js`
- Ruleset trusted snapshot `updated_at`: `2026-08-11T21:30:21.316+03:00`

## Why this gate exists

Fresh review of PR #212 identified a material governance gap in the original R4 qualification design:

```text
A qualification workflow changed by the same implementation PR it qualifies
cannot independently establish that its own admission and validation logic was
not weakened by that PR.
```

The canonical R4 authorization intentionally includes the dedicated workflow inside the six-path implementation surface. That workflow remains useful for runtime/regression evidence, but it is candidate-controlled and therefore cannot independently establish its own integrity.

The repository-required `governance` and `k2-runtime` workflows are outside the R4 implementation diff and are trusted producers, but they do not independently enforce the R4-specific six-path admission, workflow-step/pin requirements, production-authority restrictions, schema contract, or R4 dedicated-workflow integrity.

Therefore PR #212 must stop before merge and add a separately canonical base-controlled qualification inspector before R4 can resume.

```text
WAIVER = NO
R4 IMPLEMENTATION MERGE = BLOCKED
R4 PRODUCT SCOPE = UNCHANGED
R4 SIX-PATH IMPLEMENTATION ALLOWLIST = UNCHANGED
```

This is governance hardening, not an R4 product/runtime expansion.

## Decision

After and only after canonical adoption and post-merge proof of this exact record, authorize one later one-path workflow-hardening PR that may add exactly:

```text
.github/workflows/k6-r4-trusted-qualification.yml
```

No other path is authorized by that PR.

The trusted workflow becomes a canonical preimplementation prerequisite already present on protected `main`. It is not a seventh R4 implementation path.

The workflow-hardening PR must start from the canonical merge of this hardening authorization, not from the pre-authorization base recorded above.

After the trusted workflow itself is canonically merged and post-merge proven, authorize preparation of one later documentation-only replacement R4 authorization candidate at exactly:

```text
docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_REPLACEMENT_AUTHORIZATION_2026-08-27.md
```

That replacement authorization must pin the exact trusted-workflow merge SHA/tree/blob, establish the exact then-current canonical `main` as the fresh R4 implementation base, preserve the R4 v1 product/runtime contract and six implementation paths, and require both the trusted inspector and the candidate-owned dedicated R4 workflow as complementary exact-head evidence.

## Core trust split

The hardening deliberately separates two roles.

### Base-controlled trusted inspector

```text
.github/workflows/k6-r4-trusted-qualification.yml
```

Purpose:

- independently prove exact R4 candidate scope;
- inspect the candidate-owned dedicated R4 workflow as untrusted data;
- prove the dedicated workflow still contains the required immutable actions, permissions, admission checks, schema/static checks and exact test commands;
- inspect R4 production/schema/index blobs as untrusted data for bounded static invariants;
- never execute candidate code.

### Candidate-owned dedicated R4 workflow

```text
.github/workflows/k6-r4-privacy-governed-outcome-memory.yml
```

Purpose:

- execute strict TypeScript;
- execute focused R4 tests;
- execute R3/R2/R1 regressions;
- execute full runtime tests;
- execute Python/Ruff/provenance and checkout-integrity checks.

It remains candidate-controlled, so its success is accepted only when the base-controlled inspector independently proves that its required validation structure was not weakened.

```text
TRUSTED INSPECTION + DEDICATED EXECUTION = R4-SPECIFIC QUALIFICATION EVIDENCE
DEDICATED EXECUTION ALONE != INDEPENDENT QUALIFICATION
```

## Security model for the trusted inspector

The workflow must use:

```text
pull_request_target
```

so its workflow definition and inline inspection logic come only from protected base history.

It must use exactly least-privilege repository read permission:

```text
permissions:
  contents: read
```

It must not request:

- pull-request write;
- contents write;
- Actions write;
- checks write;
- administration;
- ruleset write;
- packages write;
- deployments write;
- id-token;
- environment secrets;
- repository or organization secrets.

### Critical no-execution boundary

The trusted inspector must **not** execute PR-head code.

It must not:

- use `actions/checkout` on the PR head;
- `git checkout` the PR head into an executable working tree;
- source or execute candidate shell scripts;
- run candidate JavaScript/TypeScript/Python;
- run `npm`, `pnpm`, `node`, `tsx`, `tsc`, `pytest`, `ruff`, `uv run`, package scripts, Make targets, repository scripts, or hooks against candidate content;
- invoke candidate-defined local/composite/repository-hosted actions;
- execute a binary, script, hook or command fetched from candidate blobs;
- load candidate code as a module;
- use `eval`, dynamic shell evaluation, or command substitution over candidate text.

The trusted inspector may retrieve the exact candidate file list and exact candidate file/blob bytes through read-only GitHub API calls and process those bytes **only as data** using base-controlled inline inspection logic.

The read token therefore remains confined to base-controlled metadata/blob-inspection steps. No candidate process exists that can read it.

### No cache/artifact/credential side channels

The trusted inspector must not:

- use cache restore/save actions;
- upload artifacts;
- upload SARIF;
- publish test results;
- write checks/comments/reviews;
- expose tokens through outputs, artifacts, logs or candidate-controlled strings;
- pass `${{ github.token }}` or any secret/token value into candidate-derived commands, because candidate commands are forbidden entirely.

The workflow-hardening qualification must statically prove these prohibitions from the exact workflow blob.

## Trusted workflow trigger boundary

The trusted inspector must run only for pull requests targeting `main` and must fail closed unless event metadata proves:

```text
repository = TheHalfMoon/Kodac
head repository = TheHalfMoon/Kodac
head branch = feat/k6-r4-privacy-governed-outcome-memory
base ref = main
```

A path trigger may list the six R4 paths, but trigger filtering is not admission proof. The base-controlled job must use the GitHub API/event identities to compute the exact base-to-head changed-file set and require exact equality with the six implementation paths.

The trusted workflow path itself must not appear in the candidate diff.

## Exact six-path R4 implementation allowlist preserved

```text
.github/workflows/k6-r4-privacy-governed-outcome-memory.yml
schema/k6-r4-privacy-governed-outcome-memory.schema.json
packages/kodac-runtime/src/evidence-router/outcome-memory-contracts.ts
packages/kodac-runtime/src/evidence-router/outcome-memory.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k6-r4-privacy-governed-outcome-memory.test.ts
```

No seventh R4 implementation path is authorized.

## Required trusted inspection

The base-controlled workflow must independently inspect the following properties without executing candidate code.

### Exact repository and scope admission

- exact repository/head repository/base ref/head branch;
- exact event head SHA;
- exact event base SHA;
- event base SHA is the protected candidate base for the run;
- exact six changed paths, no seventh path;
- candidate does not modify the trusted inspector;
- no manifest/lockfile/dependency/script/action helper path changes.

The later replacement authorization and external canonical preflight bind the exact implementation base SHA/tree/document blob. The trusted inspector does not hardcode a future replacement-authorization merge SHA into an earlier workflow commit.

## Dedicated-workflow integrity inspection

The trusted inspector must retrieve the exact candidate blob for:

```text
.github/workflows/k6-r4-privacy-governed-outcome-memory.yml
```

and fail closed unless base-controlled inspection proves the exact required R4 workflow structure, including at minimum:

- PR-to-main trigger and exact R4 path filter;
- least-privilege permissions;
- immutable full-SHA action references;
- pinned Node and uv versions required by the replacement R4 authorization;
- exact repository/base/head/six-path admission logic;
- exact hardening/replacement-authorization and predecessor-pin checks required by the replacement authorization;
- `index.ts` additive-only proof;
- unsupported/side-effect/dynamic production import rejection;
- R1/R3/R4 schema registration/reference/parity checks;
- strict TypeScript command;
- focused R4 test command;
- focused canonical R3/R2/R1 regression commands;
- full runtime test command;
- Python test command;
- Ruff command;
- provenance command;
- checkout-integrity proof;
- absence of write/admin/ruleset mutation behavior.

The trusted inspector must fail if required commands are missing, weakened, replaced by conditional no-ops, hidden behind always-false branches, or otherwise made non-equivalent to the replacement authorization.

The later replacement authorization may provide exact normalized command/step fingerprints or exact required text fragments to make this inspection deterministic. It must not rely on a vague semantic judgment implemented by the PR candidate.

## Production/static inspection

Using exact candidate blob bytes as data only, the trusted inspector must independently fail closed on at least:

- unauthorized imports in `outcome-memory.ts` / `outcome-memory-contracts.ts`;
- filesystem/database/network/TLS/process/child-process imports;
- provider/model/reviewer/evaluator invocation primitives prohibited by R4;
- K2 execution-capability registration;
- durable persistence/telemetry/upload/training/learning/strategy-promotion primitives;
- dynamic or unsupported import forms forbidden by the R4 contract;
- unauthorized changes before the accepted pre-R4 `index.ts` prefix;
- unexpected schema identity/reference/enum/bound drift that can be verified by non-executing JSON/text inspection.

Candidate text is untrusted input. Base-controlled parsers must never turn it into executable code.

## Runtime/regression evidence remains separate

The trusted inspector does not execute runtime tests.

The later R4 qualification still requires terminal success on the exact candidate head from:

1. the candidate-owned dedicated R4 workflow, whose structure is independently validated by the trusted inspector;
2. repository-required `provenance` from trusted producer `integration_id = 15368`;
3. repository-required `legacy-tests` from trusted producer `integration_id = 15368`;
4. repository-required `k2-runtime-gate` from trusted producer `integration_id = 15368`;
5. fresh exact-head CodeRabbit and Qodo reviews;
6. independent authorized ruleset/control-plane reads.

This split avoids running untrusted candidate code inside `pull_request_target` while still removing the original workflow self-qualification gap.

## Toolchain and action integrity

The trusted inspector must use immutable full-SHA GitHub Action references.

Because candidate code is never executed, it must not install candidate dependencies or run candidate package managers.

Any helper logic needed for trusted inspection must be inline in the protected workflow or come from an independently canonical protected-base helper whose exact blob is separately pinned. This authorization does not authorize such a helper path, so the initial trusted workflow must use inline/base-provided platform tooling only.

No new dependency is authorized.

## Ruleset relationship

This hardening authorization does not authorize mutation of ruleset `20707483`.

The trusted inspector does not become a ruleset-required status check by implication. The later replacement R4 authorization must explicitly require its exact-head terminal success alongside the existing protected required checks.

A future ruleset change requires separate ruleset-governance authority.

Independent pre/post-merge control-plane reads must continue to prove:

```text
bypass_actors = []
current_user_can_bypass = never
```

from responses that actually expose those fields.

## Workflow-hardening PR scope

After this authorization is canonical, the workflow-hardening PR may change exactly:

```text
.github/workflows/k6-r4-trusted-qualification.yml
```

It may not modify source, tests, schemas, the candidate-owned R4 workflow, dependencies, lockfiles, manifests, docs, rulesets, K2/K3/K4/K5/KRI/K6 runtime, Done Gate, storage, telemetry, providers, models, reviewers, autofix, or release surfaces.

## Workflow-hardening qualification gate

The one-path trusted-workflow candidate is not canonical unless its exact final head proves:

1. base ref is `main` and base SHA/tree equal the canonical merge of this hardening authorization, or a later separately canonical replacement-hardening base if live main moved;
2. changed-file set is exactly `.github/workflows/k6-r4-trusted-qualification.yml`;
3. `pull_request_target` is restricted to the intended R4 qualification boundary;
4. `permissions: contents: read` and no write/admin/id-token/secrets exist;
5. no PR-head checkout or candidate execution path exists;
6. no cache/artifact/upload/check/comment/review write path exists;
7. candidate blobs are consumed only as data by base-controlled logic;
8. action references are immutable full SHAs;
9. exact six-path admission is enforced in-job;
10. dedicated-workflow integrity and required-command inspection is fail-closed;
11. production/schema/index static inspection is fail-closed;
12. workflow does not mutate repository/ruleset/PR/check state;
13. applicable repository-required CI is terminal success;
14. fresh exact-head CodeRabbit and Qodo report zero unresolved material correctness/security/governance findings;
15. zero unresolved actionable threads;
16. candidate is open, non-draft, mergeable and `behind_by = 0`;
17. final head/tree/workflow blob are captured;
18. `WAIVER=NO`.

Merge only by normal GitHub merge commit guarded with exact qualified `expected_head_sha`.

Post-merge prove ordered parents, merge tree, workflow blob, protected main, valid GitHub signature, applicable required checks, ruleset/control-plane evidence, and `WAIVER=NO`.

## Replacement R4 authorization after trusted workflow lands

Only after the trusted workflow is canonical may a documentation-only candidate be prepared at:

```text
docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_REPLACEMENT_AUTHORIZATION_2026-08-27.md
```

That replacement record must:

- use the exact trusted-workflow merge as predecessor evidence;
- pin the trusted workflow blob;
- pin this hardening authorization and the original R4 authorization as historical scope evidence;
- record why PR #212 was paused rather than waived;
- set the fresh exact implementation base;
- preserve the six implementation paths and R4 v1 product/runtime semantics;
- define deterministic trusted-inspector workflow/command fingerprints or equivalent exact checks;
- require trusted-inspector exact-head success;
- require candidate-owned dedicated R4 workflow exact-head success;
- preserve repository-required trusted checks;
- preserve fresh exact-head CodeRabbit/Qodo and zero-thread requirements;
- preserve independent ruleset/control-plane proof;
- preserve all privacy, minimization, retention, lifecycle, hostile-input and non-authority constraints;
- preserve `WAIVER=NO`.

The replacement authorization cannot self-pin its own future merge SHA/blob. Its candidate blob and canonical merge identity are captured by its external qualification/merge proof. The trusted inspector uses protected-base event identity plus non-self-referential pins from the canonical record.

No R4 implementation may merge before the replacement authorization is canonical and post-merge proven.

## Current PR #212 disposition

PR #212 may remain open, but it is not merge-qualified.

Once canonical `main` moves, all prior #212 exact-head CI/review evidence becomes stale.

After the trusted workflow and replacement authorization are canonical, #212 must be reconciled forward through a normal merge from exact live `main`; no rebase or force-push. The resulting exact head must be requalified from scratch under the replacement authorization and trusted inspector.

## Preserved non-grants

This hardening lifecycle does not authorize:

```text
R4 PRODUCT SCOPE EXPANSION
SEVENTH R4 IMPLEMENTATION PATH
DURABLE PERSISTENCE / DATABASE / FILESYSTEM STORAGE
TELEMETRY / UPLOAD / NETWORK FALLBACK
MODEL / PROVIDER / REVIEWER / EVALUATOR EXECUTION
TRAINING / FINETUNING / LEARNING MUTATION
STRATEGY SCORING / RANKING / PROMOTION
CROSS-REPOSITORY OR CROSS-USER LEARNING
AUTOFIX
NEW DEPENDENCIES OR EXTERNAL SERVICES
K2 / K5 / DONE GATE AUTHORITY CHANGE
RULESET MUTATION
REPOSITORY / PR / CHECK WRITE AUTHORITY FROM THE TRUSTED INSPECTOR
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH
K6-R5 AUTHORIZATION OR IMPLEMENTATION
```

## Exact scope of this authorization candidate

This PR may change exactly one path:

```text
docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_HARDENING_AUTHORIZATION_2026-08-27.md
```

No second path is authorized.

## Adoption gate for this authorization record

This authorization remains non-canonical unless its exact final candidate proves:

1. base ref is exactly `main`;
2. live `main` SHA/tree equal the canonical base SHA/tree recorded above;
3. diff is exactly this one documentation path;
4. applicable repository-required exact-head CI is terminal success;
5. fresh exact-head CodeRabbit and Qodo reviews have zero unresolved material correctness/security/governance/authority findings;
6. zero unresolved actionable threads;
7. candidate is open, non-draft, mergeable and `behind_by = 0`;
8. ruleset `20707483` remains active with the accepted identity/check producers and independent control-plane proof exposes `bypass_actors = []` and `current_user_can_bypass = never`;
9. final head/tree/document blob are captured;
10. guarded normal merge uses exact qualified `expected_head_sha`;
11. post-merge ordered-parent/tree/blob/protected-main/signature proof succeeds;
12. applicable post-merge required checks are terminal success;
13. `WAIVER=NO`.

If live `main` moves before merge, stop and amend this record to the exact replacement live `main` SHA/tree, reconcile forward non-destructively, and requalify from scratch.

## Stop boundary

Until this record, the trusted workflow, and the replacement R4 authorization are each canonical in order:

```text
DO NOT MERGE PR #212
DO NOT ADD A SEVENTH PATH TO PR #212
DO NOT MUTATE RULESET 20707483
DO NOT BYPASS OR SILENTLY RESOLVE THE MATERIAL PR #212 FINDING
DO NOT BEGIN K6-R5
```

The purpose of this gate is to make R4 workflow qualification independently inspectable while keeping untrusted PR code entirely outside the `pull_request_target` security context.