# Kodac K6-R4 Trusted Qualification Post-Merge Repair Authorization

## Record identity

- Date: `2026-08-27`
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

## Why this gate exists

PR #214 passed its pre-merge one-path scope, repository-required CI, exact-head Qodo review, exact-head CodeRabbit terminal review, review-thread resolution, ruleset preflight, expected-head merge, ordered-parent proof, merge-tree proof and GitHub signature proof.

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

Mandatory post-merge proof then exposed a base-controlled GitHub Actions registration failure before any job could be created:

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

Therefore the merge is present on protected `main`, but the trusted workflow has **not** satisfied its mandatory post-merge proof and is not a canonical trusted prerequisite.

```text
K6_R4_TRUSTED_WORKFLOW_MERGED=YES
K6_R4_TRUSTED_WORKFLOW_CLOSED_CANONICAL=NO
K6_R4_REPLACEMENT_AUTHORIZATION=BLOCKED
PR_212_MERGE=BLOCKED
WAIVER=NO
```

## Proven root cause: YAML block-scalar escape

The exact canonical trusted-workflow blob contains the Python assignment:

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

Those physical continuation lines begin at YAML column zero. They therefore escape the surrounding `run: |` block scalar before GitHub Actions can compile the workflow. The zero-job, non-rerequestable Actions failure is consistent with this exact structural defect.

A repair must remove that class entirely. The candidate preamble value must be represented in a YAML-safe form whose physical source lines remain inside the `run: |` indentation, such as adjacent escaped Python string literals or an equivalent base-controlled representation.

## Additional repair required: literal GitHub-expression preservation

The canonical inspector also contains a comparison constant for the candidate-owned checkout action with literal text equivalent to:

```text
ref: ${{ github.event.pull_request.head.sha }}
```

That candidate-workflow literal currently appears directly inside the trusted workflow's own executable `run:` scalar. GitHub Actions expression processing occurs before the shell/Python program receives that scalar, so the inspector must not depend on the complete literal expression token surviving unchanged.

The repair must construct that candidate-workflow literal at Python runtime without embedding the complete `${{ ... }}` token in the executable inspector source. A base-controlled construction such as concatenating `"$"` with the brace/expression text is permitted. The resulting Python value must equal the exact candidate-workflow line and must not introduce `eval`, dynamic shell evaluation, candidate execution or any new authority.

## Review repair: positive registration proof is mandatory

Fresh review of the first version of this record correctly identified that merely proving the **absence** of another zero-job failure is insufficient. A repaired `pull_request_target` workflow could remain unregistered or otherwise unable to instantiate its job while the lifecycle incorrectly proceeds.

Therefore this record now requires **positive GitHub registration and job-instantiation evidence** before the repaired workflow may be classified canonical.

```text
NEGATIVE_ONLY_REGISTRATION_PROOF=REJECTED
POSITIVE_PULL_REQUEST_TARGET_JOB_CREATION_PROOF=REQUIRED
WAIVER=NO
```

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
3. preserve literal candidate GitHub-expression text without trusting expression interpolation inside inspector constants;
4. add a deterministic fail-closed diagnostic for the intentionally absent replacement R4 authorization during the registration probe described below;
5. preserve all previously accepted trust-boundary checks and reviewed fail-closed hardening;
6. add no product/runtime authority.

The deterministic diagnostic in item 4 may distinguish an HTTP `404` for the **exact** protected-base path:

```text
docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_REPLACEMENT_AUTHORIZATION_2026-08-27.md
```

and fail with the exact base-controlled label:

```text
K6-R4 trusted qualification failed: replacement authorization unavailable
```

All other API/transport/status/shape failures must remain fail-closed. The diagnostic must not make the replacement authorization optional for actual R4 qualification; it exists only so the staged registration probe can prove that the registered job executed through all predecessor checks and stopped at the intentional missing-authorization boundary.

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
- no checks/comments/reviews/repository/ruleset writes from the trusted inspector;
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
- no unnamed executable-step bypass;
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

## Positive workflow-registration probe

The repaired workflow is **not** canonical merely because its repair PR merges and is **not** canonical merely because no invalid-workflow check suite appears on the merge push.

After the repair merge has become protected `main`, but before the replacement R4 authorization is created, one bounded external PR-state probe is authorized solely to exercise the canonical `pull_request_target` workflow definition.

The probe must use PR `#212`, whose six R4 implementation paths already satisfy the workflow path filter, and must not alter its branch, commit, tree, changed-file set or implementation bytes.

### Pre-probe fence

Immediately before the probe, independently read and capture:

```text
PR_NUMBER=212
STATE=open
BASE_REF=main
BASE_SHA=<exact repaired-trusted-workflow merge on protected main>
HEAD_REF=feat/k6-r4-privacy-governed-outcome-memory
HEAD_SHA=<exact pre-probe PR #212 head>
HEAD_REPOSITORY=TheHalfMoon/Kodac
CHANGED_PATHS=<exact six authorized R4 implementation paths>
```

If any field is different, STOP. Do not substitute a newer mutable ref silently.

### Sole authorized external state transition

For registration proof only, the external governance operator may perform exactly this state-only cycle:

```text
PR #212: READY -> DRAFT -> READY
```

The transition must use normal GitHub PR-state operations. It grants no authority to the trusted workflow itself and no authority to modify PR #212 code, branch history, review findings, labels, base branch, merge state, or implementation scope.

The `READY` transition is expected to emit the already-authorized `ready_for_review` event and exercise the protected-base `pull_request_target` workflow.

### Required positive evidence

The repaired trusted workflow is not canonical unless the state-only probe produces all of the following:

1. a new GitHub Actions workflow run whose workflow path is exactly `.github/workflows/k6-r4-trusted-qualification.yml`;
2. event exactly `pull_request_target`;
3. protected-base revision corresponding to the exact repaired-workflow merge on `main`;
4. at least one actual check run/job rather than a zero-job workflow-validation suite;
5. an instantiated job named exactly `k6-r4-trusted-qualification` / `trusted-r4-qualification` according to the canonical workflow metadata;
6. the inspector step actually starts and executes base-controlled Python;
7. the run reaches the exact deterministic staging barrier and emits:

```text
K6-R4 trusted qualification failed: replacement authorization unavailable
```

8. the failure occurs before any candidate code/action/script/module execution, which remains forbidden;
9. no unexpected workflow-compilation, expression-interpolation, YAML, Python syntax, event-identity, predecessor, token, API, or control-flow error appears before the staging barrier;
10. post-probe PR #212 is again open/non-draft and its head SHA, head tree, branch, repository and six changed implementation paths are byte-for-byte/identity-equal to the pre-probe snapshot;
11. protected `main` remains the repaired-workflow merge throughout the probe;
12. `WAIVER=NO`.

A run that is absent, has zero jobs, is associated with the wrong workflow/event/base, fails before the exact staging barrier, or reaches candidate execution is a registration-proof failure.

The expected run conclusion at this stage is therefore `failure`, but only the exact **positive job-created / inspector-executed / missing-replacement-authorization barrier** failure is acceptable. This is staging evidence, not R4 qualification success.

```text
EXPECTED_REGISTRATION_PROBE_RESULT=JOB_CREATED_AND_FAIL_CLOSED_AT_MISSING_REPLACEMENT_AUTHORIZATION
R4_QUALIFICATION_RESULT=NOT_YET_APPLICABLE
```

## Repair post-merge proof

Post-merge proof for the later workflow repair must require, in order:

1. protected `main` equals the returned repair merge commit;
2. ordered parent 1 equals the repair-authorization canonical merge base;
3. ordered parent 2 equals the exact qualified repair head;
4. merge tree equals the exact qualified repair-head tree;
5. canonical trusted-workflow blob equals the qualified repair blob;
6. GitHub merge signature is verified and valid;
7. applicable repository-required post-merge checks succeed;
8. no zero-job/non-rerequestable workflow-validation failure exists for the repaired canonical bytes;
9. the positive state-only PR #212 registration probe above succeeds exactly;
10. the canonical workflow remains present at its exact path/blob after the probe;
11. ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never` when externally observable;
12. `WAIVER=NO`.

Only after **all** twelve checks succeed may the repaired trusted workflow be classified `CLOSED_CANONICAL` for its bounded preimplementation prerequisite role.

## Repair qualification gate

The later one-path workflow repair candidate is not merge-qualified unless its exact final head proves:

1. base ref is exactly `main` and base SHA/tree equal the canonical merge of this repair authorization;
2. changed-file set is exactly `.github/workflows/k6-r4-trusted-qualification.yml`;
3. `behind_by=0`;
4. candidate is open, non-draft and mergeable;
5. the workflow is structurally valid YAML and preserves the intended `run: |` block without physical dedent;
6. the complete candidate-literal `${{ github.event.pull_request.head.sha }}` comparison token is not embedded in executable inspector source in a way GitHub expression processing can rewrite before Python receives it;
7. the exact missing-replacement-authorization diagnostic is limited to an HTTP `404` for the exact protected replacement path and remains fail-closed;
8. all trust-boundary and exact-inspection invariants above remain fail-closed;
9. applicable repository-required exact-head CI is terminal success;
10. fresh exact-head CodeRabbit and Qodo report zero unresolved material correctness/security/governance/authority findings;
11. zero unresolved actionable threads;
12. final head/tree/workflow blob are captured;
13. final protected-main/ruleset preflight remains unchanged;
14. merge uses normal GitHub merge-commit semantics with exact `expected_head_sha`;
15. mandatory post-merge positive registration/ordered-parent/tree/blob/signature/control-plane proof succeeds;
16. `WAIVER=NO`.

Any head movement invalidates prior exact-head CI/review evidence.

## Replacement R4 authorization remains later

Do **not** prepare or merge:

```text
docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_REPLACEMENT_AUTHORIZATION_2026-08-27.md
```

until the repaired trusted workflow is itself canonically adopted and passes the positive registration proof above.

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

The single `READY -> DRAFT -> READY` registration probe defined above is a state-only governance proof and is the sole additional PR #212 mutation authorized before the replacement R4 authorization. It must not alter implementation content or grant merge authority.

No merge, rebase, force-push, implementation commit, branch rewrite or R4 implementation mutation is authorized until the repaired trusted workflow and then the replacement R4 authorization are canonical in order.

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

The external state-only registration probe does not grant any of those authorities to the trusted workflow or to R4.

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

If `main` or the ruleset changes before merge, stop, reconcile this docs-only candidate forward non-destructively, update exact base evidence if required, and requalify from scratch.

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
