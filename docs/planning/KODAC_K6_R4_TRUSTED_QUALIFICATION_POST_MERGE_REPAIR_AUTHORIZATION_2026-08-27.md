# Kodac K6-R4 Trusted Qualification Post-Merge Repair Authorization

## Record identity

- Date: 2026-08-27
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-27`
- Authority class: DOCUMENTATION / POST-MERGE GOVERNANCE-REPAIR AUTHORIZATION CANDIDATE
- Canonical base commit: `47a2ac5e53d68c3fe6427fc1bb0e42195e09f365`
- Canonical base tree: `9c9852edd0e6f2aace663330360dccb14e411e8a`
- Original trusted-workflow hardening authorization: `docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_HARDENING_AUTHORIZATION_2026-08-27.md`
- Original hardening authorization blob: `9e21684993b8ef3940434560787b63c00d55866b`
- Original trusted-workflow PR: `#214`
- Original trusted-workflow qualified head: `9482a042610cb681303687959808b05fb7d11a0c`
- Original trusted-workflow merge: `47a2ac5e53d68c3fe6427fc1bb0e42195e09f365`
- Original trusted-workflow blob: `3de6bfa19e0f72e96c588682fd4a70053ee0c382`
- Active R4 implementation PR: `#212`
- Protected-main ruleset: `20707483` (`Kodac canonical main protection v1`)
- Ruleset trusted node ID: `RRS_lACqUmVwb3NpdG9yec5NVN5LzgE7-Js`
- Ruleset trusted snapshot `updated_at`: `2026-08-11T21:30:21.316+03:00`

## Why this repair gate exists

PR #214 passed its pre-merge one-path scope, repository-required CI, exact-head Qodo review, exact-head CodeRabbit terminal review, thread-resolution, ruleset, expected-head merge, ordered-parent, merge-tree and signature checks.

Its merge itself is structurally valid:

```text
MERGE_SHA=47a2ac5e53d68c3fe6427fc1bb0e42195e09f365
PARENT_1=34aa910bb72856ee138e64e47354d8d93072052d
PARENT_2=9482a042610cb681303687959808b05fb7d11a0c
MERGE_TREE=9c9852edd0e6f2aace663330360dccb14e411e8a
QUALIFIED_HEAD_TREE=9c9852edd0e6f2aace663330360dccb14e411e8a
GITHUB_SIGNATURE_VERIFIED=true
GITHUB_SIGNATURE_REASON=valid
```

However the mandatory post-merge proof found a base-controlled GitHub Actions registration failure before any job could be created:

```text
TRUSTED_WORKFLOW_POST_MERGE_RUN_ID=33035724433
TRUSTED_WORKFLOW_POST_MERGE_CHECK_SUITE=89501287668
EVENT=push
CONCLUSION=failure
JOB_COUNT=0
LATEST_CHECK_RUNS_COUNT=0
REREQUESTABLE=false
RUNS_REREQUESTABLE=false
```

The repository governance push run on the same merge succeeded:

```text
GOVERNANCE_POST_MERGE_RUN_ID=33035725055
GOVERNANCE_POST_MERGE_CONCLUSION=success
```

Therefore the merge is present on protected `main`, but the trusted workflow has **not** satisfied its own mandatory post-merge proof and is not a canonical trusted prerequisite.

```text
K6_R4_TRUSTED_WORKFLOW_MERGED=YES
K6_R4_TRUSTED_WORKFLOW_CLOSED_CANONICAL=NO
K6_R4_REPLACEMENT_AUTHORIZATION=BLOCKED
PR_212_MERGE=BLOCKED
WAIVER=NO
```

## Proven root cause

The exact canonical workflow blob contains the Python assignment:

```text
EXPECTED_WORKFLOW_PREAMBLE = """name: k6-r4-privacy-governed-outcome-memory

on:
  pull_request:
...
permissions:
  contents: read

jobs:
  privacy-governed-outcome-memory:
"""
```

Those physical continuation lines begin at YAML column zero. They therefore escape the `run: |` block scalar before GitHub Actions can compile the workflow. The post-merge zero-job failure is consistent with this exact structural defect: validation fails before a runnable job exists.

This repair must eliminate that class entirely. A repaired workflow must not place unindented physical multiline Python-string content inside the YAML block scalar. The candidate preamble value must instead be represented in a YAML-safe form, for example adjacent escaped Python string literals or another equivalent base-controlled representation whose physical source lines remain inside the `run: |` indentation.

## Additional exact repair required: literal GitHub-expression preservation

The canonical workflow also contains an inspector comparison constant for the candidate-owned checkout action with literal text equivalent to:

```text
ref: ${{ github.event.pull_request.head.sha }}
```

That literal currently appears directly inside the trusted workflow's own `run:` scalar. GitHub Actions expression interpolation occurs before the shell/Python program receives that scalar, so the inspector must not depend on a literal `${{ ... }}` token surviving unchanged inside its own executable script.

The repair must construct the candidate-workflow literal at Python runtime without embedding the complete `${{ ... }}` expression token in the trusted workflow's `run:` source. For example, a base-controlled concatenation of `"$"` with the brace/expression text is permitted. The resulting Python value must still equal the exact literal candidate workflow line and must not introduce `eval`, dynamic shell evaluation, candidate execution, or any new authority.

This is a correctness repair to the already-authorized data-only inspector, not a new product/runtime capability.

## Decision

After and only after this record is canonically adopted and post-merge proven, authorize exactly one later one-path trusted-workflow repair PR that may modify exactly:

```text
.github/workflows/k6-r4-trusted-qualification.yml
```

No second path is authorized by that repair PR.

The repair PR must start from the canonical merge of this repair authorization record. That merge is the separately canonical replacement-hardening base required by the original hardening authorization after protected `main` moved.

The repair may only:

1. restore valid GitHub Actions/YAML registration of the already-authorized trusted workflow;
2. preserve the intended candidate-workflow preamble as data without physical YAML dedent;
3. preserve literal candidate GitHub-expression text without trusting GitHub expression interpolation inside inspector constants;
4. preserve all previously accepted trust-boundary checks and reviewed fail-closed hardening;
5. add no product/runtime authority.

## Exact repair-preservation requirements

The repaired workflow must continue to preserve all of the following:

- workflow trigger: `pull_request_target` only for the intended R4 qualification boundary;
- base-controlled workflow definition from protected `main`;
- global `permissions: contents: read` only;
- no PR-head checkout or execution;
- no candidate JavaScript/TypeScript/Python/shell execution;
- no candidate action execution;
- no `npm`, `pnpm`, `node`, `tsx`, `tsc`, `pytest`, `ruff`, or repository-script execution against candidate content;
- no `eval`, dynamic shell evaluation, or command substitution over candidate text;
- no cache restore/save;
- no artifact/SARIF/test-result upload;
- no checks/comments/reviews/repository/ruleset writes;
- no id-token, environment secrets, repository secrets, or organization secrets;
- exact repository `TheHalfMoon/Kodac`;
- exact authorized PR `#212`;
- exact head repository and branch `TheHalfMoon/Kodac` / `feat/k6-r4-privacy-governed-outcome-memory`;
- base ref `main`;
- immutable event base/head SHA binding;
- current PR #212 head equality to immutable event head before candidate inspection;
- every candidate compare/blob read addressed by immutable event SHA;
- exact six R4 implementation paths, exact statuses, no seventh path, no rename/copy source;
- candidate trusted-workflow mutation forbidden;
- exact non-workflow candidate blob pins from the later protected replacement manifest;
- exact candidate-workflow start-of-file preamble and job identity;
- exactly one candidate job;
- exact candidate job metadata/control surface;
- exact candidate job env key/value set;
- exact complete top-level step count and order;
- exact immutable action step metadata;
- complete protected named-step SHA-256 fingerprints from the later manifest;
- mandatory strict TypeScript/focused R4/R3/R2/R1/full runtime/Python/Ruff/provenance commands;
- no unnamed executable step bypass;
- no job-level always-false/no-op bypass;
- no trigger/comment-spoofing bypass;
- no `GITHUB_ENV` / `GITHUB_PATH` mutation path;
- fail-closed production import and authority scanner;
- additive-only R4 `index.ts` projection;
- fail-closed R4 schema identity/reference/enum/bound/closed-object checks;
- duplicate-key fail-closed manifest/API JSON parsing;
- bounded API/file/manifest inputs;
- protected ruleset identity and independent external no-bypass proof;
- `WAIVER=NO`.

## Workflow registration proof

The previous pre-merge review cycle was insufficient because GitHub's actual workflow compiler was not exercised successfully on protected `main`.

The repaired workflow is not canonical merely because its PR merges.

Post-merge proof for the repair must require:

1. protected `main` equals the returned repair merge commit;
2. ordered parent 1 equals the repair-authorization canonical merge base;
3. ordered parent 2 equals the exact qualified repair head;
4. merge tree equals the exact qualified repair-head tree;
5. canonical trusted-workflow blob equals the qualified repair blob;
6. GitHub merge signature is verified and valid;
7. applicable repository-required post-merge checks succeed;
8. the repair merge does **not** produce a zero-job, non-rerequestable GitHub Actions workflow-validation failure for `.github/workflows/k6-r4-trusted-qualification.yml`;
9. the canonical workflow remains present at its exact path and byte identity after the merge;
10. ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never` when externally observable;
11. `WAIVER=NO`.

A missing ordinary `pull_request_target` execution on the repair merge's `push` event is expected and is not itself failure. The prohibited condition is another GitHub workflow-validation/check-suite failure before jobs exist.

## Repair qualification gate

The later one-path repair candidate is not merge-qualified unless its exact final head proves:

1. base ref is exactly `main` and base SHA/tree equal the canonical merge of this repair authorization;
2. changed-file set is exactly `.github/workflows/k6-r4-trusted-qualification.yml`;
3. `behind_by=0`;
4. candidate is open, non-draft and mergeable;
5. the workflow is structurally valid YAML and preserves the intended `run: |` block without unindented escaped content;
6. no complete `${{ github.event.pull_request.head.sha }}` candidate-literal comparison token is embedded in the executable inspector source in a way GitHub expression interpolation can rewrite before Python receives it;
7. all trust-boundary and exact-inspection invariants above remain fail-closed;
8. applicable repository-required exact-head CI is terminal success;
9. fresh exact-head CodeRabbit and Qodo report zero unresolved material correctness/security/governance/authority findings;
10. zero unresolved actionable threads;
11. final head/tree/workflow blob are captured;
12. final protected-main/ruleset preflight remains unchanged;
13. merge uses normal GitHub merge-commit semantics with exact `expected_head_sha`;
14. mandatory post-merge registration/ordered-parent/tree/blob/signature/control-plane proof succeeds;
15. `WAIVER=NO`.

Any head movement invalidates prior exact-head CI/review evidence.

## Replacement R4 authorization remains later

Do **not** prepare or merge:

```text
docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_REPLACEMENT_AUTHORIZATION_2026-08-27.md
```

until the repaired trusted workflow is itself canonically adopted and passes the registration proof above.

Only after that may the existing hardening lifecycle resume:

```text
CANONICAL_REPAIRED_TRUSTED_WORKFLOW
  -> DOCUMENTATION-ONLY REPLACEMENT R4 AUTHORIZATION
  -> FORWARD RECONCILIATION OF PR #212
  -> FRESH TRUSTED + DEDICATED EXACT-HEAD QUALIFICATION
  -> GUARDED R4 MERGE IF CLEAN
```

## PR #212 disposition

PR #212 may remain open but is paused and is not merge-qualified.

Its current base and all previous exact-head CI/review evidence are stale after protected `main` moved.

No merge, rebase, force-push or R4 implementation mutation is authorized until the repaired trusted workflow and then the replacement R4 authorization are canonical in order.

## Preserved non-grants

This repair authorization does not authorize:

```text
R4 PRODUCT SCOPE EXPANSION
SEVENTH R4 IMPLEMENTATION PATH
DURABLE PERSISTENCE / DATABASE / FILESYSTEM STORAGE
TELEMETRY / UPLOAD / NETWORK FALLBACK
MODEL / PROVIDER / REVIEWER / EVALUATOR EXECUTION
TRAINING / FINETUNING / LEARNING MUTATION
STRATEGY SCORING / RANKING / PROMOTION
CROSS_REPOSITORY OR CROSS-USER LEARNING
AUTOFIX
NEW DEPENDENCIES OR EXTERNAL SERVICES
K2 / K5 / DONE GATE AUTHORITY CHANGE
RULESET MUTATION
REPOSITORY / PR / CHECK WRITE AUTHORITY FROM THE TRUSTED INSPECTOR
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH
K6-R5 AUTHORIZATION OR IMPLEMENTATION
```

## Exact scope of this authorization candidate

This authorization PR may change exactly one path:

```text
docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_POST_MERGE_REPAIR_AUTHORIZATION_2026-08-27.md
```

No source, test, schema, workflow, dependency, lockfile, candidate-owned R4 workflow, existing canonical governance document, ruleset, K2/K5/Done Gate, provider/model/reviewer, persistence, telemetry, learning, autofix, release, or K6-R5 path is authorized in this candidate.

## Adoption gate for this record

This record remains non-canonical unless its exact final candidate proves:

1. base ref is exactly `main`;
2. live protected `main` SHA/tree remain exactly `47a2ac5e53d68c3fe6427fc1bb0e42195e09f365` / `9c9852edd0e6f2aace663330360dccb14e411e8a` at final preflight;
3. changed-file set is exactly this one documentation path;
4. applicable repository-required exact-head CI is terminal success;
5. fresh exact-head CodeRabbit and Qodo reviews report zero unresolved material correctness/security/governance/authority findings;
6. zero unresolved actionable threads;
7. candidate is open, non-draft, mergeable and `behind_by=0`;
8. ruleset `20707483` remains active and external proof exposes `bypass_actors=[]` and `current_user_can_bypass=never`;
9. final candidate head/tree/document blob are captured;
10. merge uses normal GitHub merge-commit semantics guarded by exact `expected_head_sha`;
11. post-merge protected-main/ordered-parent/tree/document-blob/signature proof succeeds;
12. applicable post-merge required checks succeed;
13. `WAIVER=NO`.

If `main` or the ruleset changes before merge, stop, reconcile this docs-only candidate forward non-destructively, update the exact base evidence if required, and requalify from scratch.

## Stop boundary

Until this repair authorization and then the repaired trusted workflow are each canonical in order:

```text
DO NOT PREPARE THE REPLACEMENT R4 AUTHORIZATION
DO NOT MERGE PR #212
DO NOT ADD A SEVENTH R4 IMPLEMENTATION PATH
DO NOT MUTATE RULESET 20707483
DO NOT CLAIM THE TRUSTED WORKFLOW CLOSED_CANONICAL
DO NOT BEGIN K6-R5
```

`WAIVER=NO`.
