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

The canonical R4 authorization intentionally includes the dedicated workflow inside the six-path implementation surface. That workflow is still useful as implementation-owned regression evidence, but it is not an immutable external qualification root.

The existing required `governance` and `k2-runtime` workflows are outside the R4 implementation diff and are trusted producers, but they do not independently enforce R4-specific six-path admission, predecessor binding, schema/runtime parity, production-authority restrictions, and R4 regression execution.

Therefore the R4 implementation must stop before merge and add one separately canonical, base-controlled trusted qualification workflow before R4 can resume.

This is a hardening correction, not a waiver and not an expansion of R4 product/runtime authority.

```text
WAIVER = NO
R4 IMPLEMENTATION MERGE = BLOCKED UNTIL TRUSTED GATE IS CANONICAL
R4 PRODUCT SCOPE = UNCHANGED
R4 SIX-PATH IMPLEMENTATION ALLOWLIST = UNCHANGED
```

## Decision

After and only after canonical adoption and post-merge proof of this exact record, authorize one later one-path workflow-hardening PR that may add exactly:

```text
.github/workflows/k6-r4-trusted-qualification.yml
```

No other path is authorized by the workflow-hardening PR.

The trusted workflow becomes a canonical preimplementation prerequisite. It is not part of the later R4 six-path implementation diff.

After that trusted workflow itself is canonically merged and post-merge proven, authorize preparation of one later documentation-only replacement R4 authorization candidate at exactly:

```text
docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_REPLACEMENT_AUTHORIZATION_2026-08-27.md
```

That replacement authorization must pin the exact trusted-workflow merge SHA, tree, and blob; set the exact then-current canonical `main` as the new R4 implementation base; preserve the R4 v1 product/runtime contract unless an independently justified correction is explicitly documented; preserve the original six implementation paths; and require the trusted gate as exact-head qualification evidence.

The replacement authorization is required because the original R4 implementation authorization pins the old authorization merge as the implementation base and explicitly requires replacement authorization after base/governance prerequisite drift.

## Security model for the trusted workflow

The workflow must be controlled by protected `main`, not by the R4 implementation candidate being qualified.

It must use:

```text
pull_request_target
```

for the R4 implementation qualification event so the workflow definition and qualification commands come from protected base history rather than the PR head.

Because `pull_request_target` has a stronger security context, the workflow must be aggressively least privilege:

```text
permissions:
  contents: read
```

It must not request or receive:

- repository write;
- pull-request write;
- Actions write;
- checks write;
- administration;
- ruleset write;
- packages write;
- id-token;
- secrets;
- environment secrets;
- deployment credentials.

The workflow may check out the exact PR head only with:

```text
persist-credentials: false
```

No `GH_TOKEN`, `GITHUB_TOKEN`, secret, credential, cloud identity, deployment identity, package-publish token, or writable cache credential may be passed to code executed from the PR head.

The workflow may execute the R4 TypeScript/Python test surface only because the R4 implementation allowlist cannot mutate package manifests, lockfiles, repository dependency definitions, or the trusted workflow itself. Any future change to those assumptions requires replacement hardening authority.

## Trusted workflow trigger boundary

The workflow must run only for pull requests targeting `main` and must fail closed unless all of the following are true:

```text
repository = TheHalfMoon/Kodac
head repository = TheHalfMoon/Kodac
head branch = feat/k6-r4-privacy-governed-outcome-memory
base ref = main
```

Its path trigger may name the six R4 implementation paths, but trigger filtering is not sufficient admission proof. The job itself must independently compute the exact base-to-head changed-file set and require exact equality with the six-path allowlist.

The trusted workflow path itself must not appear in the R4 implementation diff.

## Exact six-path R4 implementation allowlist preserved

The later R4 implementation remains limited to exactly:

```text
.github/workflows/k6-r4-privacy-governed-outcome-memory.yml
schema/k6-r4-privacy-governed-outcome-memory.schema.json
packages/kodac-runtime/src/evidence-router/outcome-memory-contracts.ts
packages/kodac-runtime/src/evidence-router/outcome-memory.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k6-r4-privacy-governed-outcome-memory.test.ts
```

The trusted workflow is a canonical prerequisite already present on `main`; it is not a seventh implementation path.

## Required trusted qualification checks

The base-controlled workflow must independently perform at least the following checks against the exact PR head.

### Admission and repository identity

- checkout exact `github.event.pull_request.head.sha` with credentials disabled;
- require exact repository/head repository/base ref/head branch;
- require base SHA to be the exact canonical replacement-R4 authorization merge recorded by the later replacement authorization;
- require `behind_by = 0` semantics by proving the base SHA is the exact merge base for the candidate;
- require exact six-path diff and `git diff --check`;
- prove the trusted workflow itself is not changed by the candidate.

### Canonical prerequisite binding

The later replacement authorization must provide immutable pins that the trusted workflow can validate from protected base state and PR head state as appropriate, including:

- trusted-workflow hardening authorization document blob;
- trusted workflow blob;
- replacement R4 authorization document blob;
- canonical R1/R3 predecessor blobs needed by R4;
- pre-R4 `index.ts` bytes or blob;
- canonical provenance validator blob;
- protected ruleset identity/snapshot information when readable under least privilege.

No candidate-controlled value may be accepted as a substitute for a required protected-base pin.

### R4 production-authority restrictions

Independently reject:

- unauthorized production imports;
- filesystem/database/network/TLS/process/child-process imports;
- provider/model/reviewer/evaluator invocation;
- K2 execution-capability registration;
- durable persistence;
- telemetry/upload;
- training/learning mutation;
- strategy scoring/ranking/promotion;
- dynamic import or unsupported import forms where the accepted R4 contract forbids them.

### Schema and contract checks

Independently validate:

- Draft 2020-12 schema validity;
- exact R4 schema `$id` and root;
- R1/R3 schema references;
- runtime/schema enum parity;
- runtime/schema expressible bound parity;
- `index.ts` additive-only exports.

### Runtime and regression evidence

Using locked repository dependencies and no writable credentials, independently run at least:

- strict TypeScript validation;
- focused K6-R4 tests;
- canonical focused K6-R3/R2/R1 regressions;
- full `packages/kodac-runtime` test suite;
- canonical Python tests;
- Ruff;
- provenance validation;
- checkout-integrity proof.

The workflow must not rely on the candidate-controlled dedicated R4 workflow having run successfully before performing these checks.

## Toolchain integrity

The trusted workflow must use immutable full-SHA action references.

Node and uv versions must be explicitly pinned to the repository-accepted R4 qualification versions unless a later canonical replacement authorization changes them.

Temporary validation environments must live outside the checkout where practical.

Dependency installation must use the canonical lockfile and disable package install scripts where the existing R4 qualification contract requires that behavior.

No new dependency is authorized.

## Relationship to the candidate-controlled dedicated R4 workflow

The existing authorized path:

```text
.github/workflows/k6-r4-privacy-governed-outcome-memory.yml
```

remains part of the R4 implementation surface and may continue to provide implementation-owned regression evidence.

However:

```text
DEDICATED R4 WORKFLOW SUCCESS != INDEPENDENT QUALIFICATION BY ITSELF
```

The later replacement R4 authorization must require both:

1. the implementation-owned dedicated R4 workflow terminal success; and
2. the separately canonical trusted R4 qualification workflow terminal success on the exact same candidate head.

The trusted workflow is the independent workflow-definition root for R4-specific qualification.

## Ruleset relationship

This hardening authorization does not authorize mutation of ruleset `20707483`.

The trusted R4 workflow does not become a repository ruleset-required status check by implication. Instead, the later replacement R4 authorization must explicitly require its exact-head terminal success as part of the R4 canonical qualification gate alongside the existing repository-required trusted checks:

```text
provenance
legacy-tests
k2-runtime-gate
```

A future decision to add the trusted R4 context to branch protection/rulesets requires separate ruleset-governance authority.

The existing independent pre/post-merge authorized control-plane reads for:

```text
bypass_actors = []
current_user_can_bypass = never
```

remain mandatory and unchanged.

## Workflow-hardening PR scope

After this authorization is canonical, the workflow-hardening PR may change exactly one path:

```text
.github/workflows/k6-r4-trusted-qualification.yml
```

It must not modify:

- R4 production source;
- R4 implementation-owned workflow;
- tests;
- schemas;
- `index.ts`;
- dependencies/lockfiles/manifests;
- documentation;
- rulesets;
- K2/K3/K4/K5/KRI/K6 runtime;
- Done Gate;
- provider/model/reviewer integrations;
- storage/telemetry/autofix/release surfaces.

## Workflow-hardening qualification gate

The one-path trusted-workflow candidate is not canonical unless its exact final head proves:

1. base ref is `main` and base SHA/tree equal the exact canonical base recorded in the canonical version of this authorization or a separately canonical replacement base;
2. changed-file set is exactly `.github/workflows/k6-r4-trusted-qualification.yml`;
3. workflow uses `pull_request_target` only for the intended R4 qualification boundary and `permissions: contents: read`;
4. no secrets/write/admin/id-token permissions exist;
5. checkout of PR head uses exact event head SHA and `persist-credentials: false`;
6. action references are immutable full SHAs;
7. workflow contains an in-job exact six-path admission check rather than relying only on path filters;
8. workflow does not mutate repository/ruleset/PR/check state;
9. applicable repository-required CI is terminal success;
10. fresh exact-head CodeRabbit and Qodo reviews report zero unresolved material correctness/security/governance findings;
11. zero unresolved actionable threads;
12. candidate is open, non-draft, mergeable and `behind_by = 0`;
13. final head/tree/workflow blob are captured;
14. `WAIVER=NO`.

Merge only by normal GitHub merge commit guarded with the exact qualified `expected_head_sha`.

Post-merge prove ordered parents, merge tree, trusted-workflow blob, protected main, valid GitHub signature, applicable post-merge required checks, ruleset control-plane evidence, and `WAIVER=NO`.

## Replacement R4 authorization after trusted workflow lands

Only after the trusted workflow is canonical may the next documentation-only candidate be prepared at:

```text
docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_REPLACEMENT_AUTHORIZATION_2026-08-27.md
```

That record must:

- use the exact trusted-workflow merge as predecessor evidence;
- pin the trusted workflow blob;
- pin the original R4 authorization as historical governing scope evidence;
- record why PR #212 was paused rather than waived;
- set a fresh exact implementation base;
- preserve the six implementation paths;
- require trusted-workflow exact-head success;
- preserve dedicated-workflow success as complementary evidence;
- preserve fresh exact-head CodeRabbit/Qodo and zero-thread requirements;
- preserve ruleset/control-plane proof;
- preserve all R4 privacy, retention, minimization, lifecycle and non-authority constraints;
- preserve `WAIVER=NO`.

No R4 implementation commit may be merged before that replacement authorization is itself canonical and post-merge proven.

## Current PR #212 disposition

PR #212 may remain open while the hardening lifecycle is completed, but it is not merge-qualified.

Its current implementation evidence may be used only as historical/debugging input. Once canonical `main` moves, all prior exact-head qualification/review evidence is stale.

After the trusted workflow and replacement authorization become canonical, PR #212 must be reconciled forward by a normal merge from exact live `main`; no rebase or force-push is allowed. The resulting new exact head must be requalified from scratch against the replacement authorization and trusted gate.

## Preserved non-grants

This hardening lifecycle does not authorize:

```text
R4 PRODUCT SCOPE EXPANSION
SEVENTH R4 IMPLEMENTATION PATH
DURABLE PERSISTENCE
DATABASE / FILESYSTEM STORAGE
TELEMETRY / UPLOAD
NETWORK FALLBACK
MODEL / PROVIDER / REVIEWER EXECUTION
TRAINING / FINETUNING
LEARNING MUTATION
STRATEGY SCORING / RANKING / PROMOTION
CROSS-REPOSITORY OR CROSS-USER LEARNING
AUTOFIX
NEW DEPENDENCIES
NEW EXTERNAL SERVICES
K2 / K5 / DONE GATE AUTHORITY CHANGE
RULESET MUTATION
REPOSITORY / PR / CHECK WRITE AUTHORITY FROM THE TRUSTED WORKFLOW
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH
K6-R5 IMPLEMENTATION OR AUTHORIZATION
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
8. ruleset `20707483` remains active with the accepted trusted identity/check producers and independent control-plane proof still exposes `bypass_actors = []` and `current_user_can_bypass = never`;
9. final head/tree/document blob are captured;
10. guarded normal merge uses exact qualified `expected_head_sha`;
11. post-merge ordered-parent/tree/blob/protected-main/signature proof succeeds;
12. applicable post-merge repository-required checks are terminal success;
13. `WAIVER=NO`.

If live `main` moves before merge, stop and amend this record to the exact replacement live `main` SHA/tree, reconcile forward non-destructively, and requalify from scratch.

## Stop boundary

Until this record, the trusted workflow, and the replacement R4 authorization are each canonical in order:

```text
DO NOT MERGE PR #212
DO NOT ADD A SEVENTH PATH TO PR #212
DO NOT MUTATE RULESET 20707483
DO NOT BYPASS OR RESOLVE THE MATERIAL CODERABBIT FINDING AS A WAIVER
DO NOT BEGIN K6-R5
```

The purpose of this gate is to strengthen proof independence while preserving the already-authorized R4 product/runtime boundary.