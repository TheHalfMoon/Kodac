# Kodac K6-R4 Trusted Qualification Protected-Base Binding Repair Authorization

## Record identity

- Date: `2026-08-27`
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-27`
- Authority class: DOCUMENTATION / POST-MERGE GOVERNANCE-REPAIR AUTHORIZATION CANDIDATE
- Canonical base commit: `2450101ab94beb98ce9a857510feec2d5ba8489b`
- Canonical base tree: `9e4afe1f769fd4484073425fe83a8deb927af1d3`
- Original R4 authorization: `docs/planning/KODAC_K6_R4_PRIVACY_GOVERNED_OUTCOME_MEMORY_AUTHORIZATION_2026-08-26.md`
- Original R4 authorization blob: `db0cd6f5484494c1fcacb37570465059a0484c63`
- Trusted-workflow hardening authorization: `docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_HARDENING_AUTHORIZATION_2026-08-27.md`
- Trusted-workflow hardening authorization blob: `9e21684993b8ef3940434560787b63c00d55866b`
- Registration-repair authorization: `docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_POST_MERGE_REPAIR_AUTHORIZATION_2026-08-27.md`
- Registration-repair authorization blob: `777a17fece090174ae4a7553c508d51de10080dd`
- Registration-repair authorization merge: `bd0394edd5b79d6185795f0eaed3f7064bc05249`
- Registered trusted-workflow repair PR: `#216`
- Registered trusted-workflow qualified head: `ef539aadb8d9ceac256dd041b145908062b37062`
- Registered trusted-workflow merge: `2450101ab94beb98ce9a857510feec2d5ba8489b`
- Registered trusted-workflow blob: `b145f74779d548ddec431ee995a52af91ab04087`
- Active R4 implementation PR: `#212`
- Protected-main ruleset: `20707483` (`Kodac canonical main protection v1`)
- Ruleset trusted node ID: `RRS_lACqUmVwb3NpdG9yec5NVN5LzgE7-Js`
- Ruleset trusted snapshot `updated_at`: `2026-08-11T21:30:21.316+03:00`

## Why this gate exists

PR #216 repaired the YAML block-scalar and GitHub-expression defects in the trusted R4 qualification workflow. Its merge is structurally valid and its canonical bytes are present on protected `main`:

```text
MERGE_SHA=2450101ab94beb98ce9a857510feec2d5ba8489b
PARENT_1=bd0394edd5b79d6185795f0eaed3f7064bc05249
PARENT_2=ef539aadb8d9ceac256dd041b145908062b37062
MERGE_TREE=9e4afe1f769fd4484073425fe83a8deb927af1d3
QUALIFIED_HEAD_TREE=9e4afe1f769fd4484073425fe83a8deb927af1d3
CANONICAL_WORKFLOW_BLOB=b145f74779d548ddec431ee995a52af91ab04087
QUALIFIED_WORKFLOW_BLOB=b145f74779d548ddec431ee995a52af91ab04087
GITHUB_SIGNATURE_VERIFIED=true
GITHUB_SIGNATURE_REASON=valid
POST_MERGE_GOVERNANCE_RUN=33038546947
POST_MERGE_GOVERNANCE_CONCLUSION=success
```

The mandatory state-only PR #212 probe then proved that GitHub registered the workflow and instantiated its protected-base job:

```text
PROBE_RUN_ID=33038618512
PROBE_CHECK_SUITE_ID=89509383681
PROBE_WORKFLOW_ID=343409669
PROBE_EVENT=pull_request_target
PROBE_HEAD_SHA=19a76ac90f5a753656e7c7703a3c8f01a690a62f
PROBE_JOB_COUNT=1
PROBE_JOB_ID=98406915934
PROBE_JOB_NAME=k6-r4-trusted-qualification
INSPECTOR_STEP_STARTED=true
INSPECTOR_STEP_CONCLUSION=failure
```

This is positive registration and job-instantiation evidence, but it is not the required terminal staging proof. The inspector failed before the intentional missing-replacement-authorization boundary:

```text
EVENT_BASE_SHA=1e8c193ca0aeeb77b56ad1c75d9d7db0ca82b372
LIVE_PROTECTED_MAIN=2450101ab94beb98ce9a857510feec2d5ba8489b
ACTUAL_FAILURE=K6-R4 trusted qualification failed: protected main moved after event
REQUIRED_STAGING_FAILURE=K6-R4 trusted qualification failed: replacement authorization unavailable
```

Therefore the registered workflow remains merged but not canonical for the R4 qualification prerequisite:

```text
WORKFLOW_REGISTERED=YES
JOB_INSTANTIATED=YES
INSPECTOR_STARTED=YES
REQUIRED_STAGING_BARRIER_REACHED=NO
K6_R4_TRUSTED_WORKFLOW_CLOSED_CANONICAL=NO
K6_R4_REPLACEMENT_AUTHORIZATION=BLOCKED
PR_212_MERGE=BLOCKED
WAIVER=NO
```

## Proven root cause: historical pull-request base snapshot

The trusted workflow currently binds `EVENT_BASE_SHA` to:

```text
github.event.pull_request.base.sha
```

For the authorized long-lived PR #212, the `ready_for_review` event retained the historical pull-request base snapshot:

```text
github.event.pull_request.base.sha=1e8c193ca0aeeb77b56ad1c75d9d7db0ca82b372
```

That value is the original R4 authorization merge from which PR #212 was created. It is not the current protected `main` revision that supplied and executed the trusted `pull_request_target` workflow.

The inspector correctly failed when its live protected-main read disagreed with that historical snapshot. The defect is therefore not a fail-open path. It is an incorrect trusted-base identity source that prevents a stale-but-authorized PR from reaching the intentionally missing replacement-authorization boundary.

PR #212 cannot be forward-reconciled merely to make this probe pass because the canonical sequencing forbids implementation-branch mutation until the trusted workflow is canonical and the replacement R4 authorization is adopted.

## Decision

After and only after this record is canonically adopted and post-merge proven, authorize exactly one additional one-path trusted-workflow repair PR that may modify exactly:

```text
.github/workflows/k6-r4-trusted-qualification.yml
```

No second path is authorized by that repair PR.

The repair PR must start from the canonical merge of this authorization record. It may only:

1. bind the protected-base revision used by the trusted inspector to the protected `pull_request_target` workflow revision exposed as `github.sha`;
2. retain an exact base-ref check that the authorized PR targets `main`;
3. retain the independent live protected-main equality check against the protected-base revision;
4. stop treating `github.event.pull_request.base.sha` as the current protected-main identity for the long-lived PR;
5. preserve all previously accepted registration, expression-safety, fail-closed, candidate-as-data and authority-boundary checks;
6. add no product/runtime authority.

The intended bounded source repair is:

```text
EVENT_BASE_SHA: ${{ github.sha }}
```

and the current-PR base check must require exact `base.ref == main` without requiring the historical pull-request `base.sha` field to equal the protected-base workflow revision. The separate protected-main API equality check remains mandatory:

```text
live protected main == EVENT_BASE_SHA
```

The repair may rename the environment variable and associated base-controlled diagnostic labels only if fresh review proves the rename is complete, exact and does not broaden authority. A minimal direct substitution is preferred.

## Preserved trust boundary

The repair must preserve all of the following:

- trigger remains `pull_request_target` for the intended R4 qualification boundary;
- protected-base workflow definition only;
- `permissions: contents: read` only;
- exact repository `TheHalfMoon/Kodac`;
- exact authorized PR `#212`;
- exact head repository and branch `TheHalfMoon/Kodac` / `feat/k6-r4-privacy-governed-outcome-memory`;
- exact base ref `main`;
- immutable event head SHA binding;
- current PR #212 head equality to the immutable event head before candidate inspection;
- protected-main equality to the exact protected workflow revision used by the inspector;
- every compare and protected-base file read addressed by the exact protected workflow revision;
- every candidate file read addressed by the immutable event head SHA;
- exact six R4 implementation paths, exact statuses, no seventh path and no rename/copy source;
- candidate trusted-workflow mutation forbidden;
- no PR-head checkout by the trusted inspector;
- no candidate JavaScript, TypeScript, Python, shell, script, module or action execution;
- no `eval`, dynamic shell evaluation or candidate-controlled command substitution;
- no cache restore/save;
- no artifact, SARIF or test-result upload;
- no repository, PR, review, check or ruleset write;
- no secrets or id-token;
- bounded API, file and manifest inputs;
- duplicate-key rejecting JSON parsing;
- manifest-pinned candidate blobs;
- protected named-step SHA-256 fingerprints;
- exact action SHAs, step order and environment/control surface;
- runtime production import and authority-surface scanners;
- additive-only `index.ts` projection;
- exact schema identity, reference, enum, bound and closed-object constraints;
- predecessor authorization and blob bindings;
- ruleset identity and external no-bypass proof;
- `WAIVER=NO`.

The historical PR base snapshot may be observed as diagnostic data, but it must not become execution authority, a substitute for protected `main`, or a reason to weaken the exact candidate-head and six-path checks.

## Second positive workflow-registration probe

The first probe was consumed and failed before the required staging boundary. After the additional workflow repair is canonically merged structurally, but before the replacement R4 authorization is created, this record authorizes one new state-only probe:

```text
PR #212: READY -> DRAFT -> READY
```

Immediately before that probe, independently capture:

```text
PR_NUMBER=212
STATE=open
DRAFT=false
BASE_REF=main
PROTECTED_BASE_SHA=<exact additional workflow-repair merge on protected main>
HEAD_REF=feat/k6-r4-privacy-governed-outcome-memory
HEAD_SHA=<exact pre-probe PR #212 head>
HEAD_TREE=<exact pre-probe PR #212 tree>
HEAD_REPOSITORY=TheHalfMoon/Kodac
CHANGED_PATHS=<exact six authorized R4 implementation paths>
```

The state cycle must not intentionally change PR #212 code, head SHA, tree, branch, repository, base ref, labels, six-path scope, implementation, review-thread resolution or merge state. Automated reviewer metadata caused solely by the GitHub state event must be captured rather than hidden or treated as product qualification.

The probe is accepted only if it produces all of the following:

1. a new run for `.github/workflows/k6-r4-trusted-qualification.yml`;
2. event exactly `pull_request_target`;
3. an active protected-base workflow identity and exact additional repair merge as the live protected base;
4. at least one real check run/job;
5. job exactly `k6-r4-trusted-qualification` / `trusted-r4-qualification` according to canonical metadata;
6. the base-controlled Python inspector actually starts;
7. `EVENT_BASE_SHA` or its reviewed replacement equals the exact additional repair merge on protected `main`;
8. the run reaches exactly:

```text
K6-R4 trusted qualification failed: replacement authorization unavailable
```

9. no workflow-compilation, expression, YAML, Python, event identity, historical-base, predecessor, token, API or control-flow failure occurs first;
10. no candidate code/action/script/module executes;
11. post-probe PR #212 remains open/non-draft with exact pre/post head, tree, branch, repository, base ref and six-path equality;
12. protected `main` remains the additional workflow-repair merge throughout;
13. `WAIVER=NO`.

The expected run conclusion remains `failure`. That expected failure is only evidence of workflow registration, job instantiation, inspector start and fail-closed staging. It is not a general PASS and not R4 implementation qualification.

## Additional repair qualification gate

The additional one-path workflow repair is not merge-qualified unless its exact final head proves:

1. base ref is exactly `main` and base SHA/tree equal the canonical merge of this authorization;
2. changed-file set is exactly `.github/workflows/k6-r4-trusted-qualification.yml`;
3. `behind_by=0`;
4. candidate is open, non-draft and mergeable;
5. protected-base identity uses `github.sha` and remains externally checked against live protected `main`;
6. historical PR base snapshot is not used as current protected-main authority;
7. base ref remains exactly `main` and head/repository/PR/six-path bindings remain exact;
8. workflow remains structurally valid YAML and Python;
9. candidate expression reconstruction remains safe from outer GitHub expression preprocessing;
10. the missing-replacement-authorization diagnostic remains limited to the exact protected path and fail-closed HTTP `404` behavior;
11. all other trust-boundary invariants remain fail-closed;
12. applicable repository-required exact-head CI is terminal success;
13. fresh exact-head CodeRabbit and Qodo report zero unresolved material correctness/security/governance/authority findings;
14. zero unresolved actionable threads;
15. final head/tree/workflow blob are captured;
16. ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never`;
17. merge uses normal GitHub merge-commit semantics with exact `expected_head_sha`;
18. mandatory post-merge ordered-parent/tree/blob/signature/check/control-plane proof succeeds;
19. the second positive state-only PR #212 probe succeeds exactly;
20. `WAIVER=NO`.

Any head movement invalidates prior exact-head CI and review evidence.

## Additional repair post-merge proof

Post-merge proof must require, in order:

1. protected `main` equals the returned additional repair merge;
2. ordered parent 1 equals the canonical merge of this authorization;
3. ordered parent 2 equals the exact qualified additional repair head;
4. merge tree equals the exact qualified-head tree;
5. canonical trusted-workflow blob equals the exact qualified workflow blob;
6. GitHub merge signature is verified and valid;
7. applicable repository-required post-merge checks succeed;
8. no zero-job/non-rerequestable workflow-validation failure exists for the additional repaired bytes;
9. the second positive registration/staging probe succeeds exactly;
10. canonical workflow path/blob remain unchanged after the probe;
11. PR #212 pre/post head/tree/branch/repository/base-ref/six-path identity is exact;
12. ruleset `20707483` remains active with no bypass;
13. `WAIVER=NO`.

Only after all thirteen checks succeed may:

```text
K6_R4_TRUSTED_WORKFLOW=CLOSED_CANONICAL
```

## Replacement R4 authorization remains later

Do not prepare or merge:

```text
docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_REPLACEMENT_AUTHORIZATION_2026-08-27.md
```

until the additional repaired trusted workflow is structurally canonical and passes the second positive probe exactly.

Only then may the existing lifecycle resume:

```text
CANONICAL_REPAIRED_TRUSTED_WORKFLOW
  -> DOCUMENTATION-ONLY REPLACEMENT R4 AUTHORIZATION
  -> FORWARD RECONCILIATION OF PR #212
  -> FRESH TRUSTED + DEDICATED EXACT-HEAD QUALIFICATION
  -> GUARDED R4 MERGE IF CLEAN
```

## PR #212 disposition

PR #212 remains open, paused and not merge-qualified. The completed failed probe changed only its draft/ready state and did not change its exact implementation identity:

```text
POST_PROBE_STATE=open
POST_PROBE_DRAFT=false
POST_PROBE_HEAD_SHA=19a76ac90f5a753656e7c7703a3c8f01a690a62f
POST_PROBE_HEAD_TREE=a895354eb08e6d156a214597c3b681eb7b0f7de4
POST_PROBE_HEAD_REF=feat/k6-r4-privacy-governed-outcome-memory
POST_PROBE_HEAD_REPOSITORY=TheHalfMoon/Kodac
POST_PROBE_CHANGED_PATH_COUNT=6
POST_PROBE_LABELS=[]
```

No merge, rebase, force-push, implementation commit, branch rewrite or R4 implementation mutation is authorized until the trusted workflow and replacement R4 authorization are canonical in order.

## Preserved non-grants

This authorization does not grant:

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
docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_PROTECTED_BASE_BINDING_REPAIR_AUTHORIZATION_2026-08-27.md
```

No source, test, schema, workflow, dependency, lockfile, candidate-owned R4 workflow, existing canonical governance record, ruleset, K2/K5/Done Gate, provider/model/reviewer, persistence, telemetry, learning, autofix, release or K6-R5 path is authorized in this candidate.

## Adoption gate for this record

This record remains non-canonical unless its exact final candidate proves:

1. base ref is exactly `main`;
2. live protected `main` SHA/tree remain exactly `2450101ab94beb98ce9a857510feec2d5ba8489b` / `9e4afe1f769fd4484073425fe83a8deb927af1d3` at final preflight;
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

If `main` or the ruleset changes before merge, stop, reconcile this documentation-only candidate forward non-destructively, update exact base evidence if required and requalify from scratch.

## Stop boundary

Until this authorization and then the additional protected-base binding workflow repair are each canonical in order:

```text
DO NOT PREPARE THE REPLACEMENT R4 AUTHORIZATION
DO NOT FORWARD-RECONCILE OR MERGE PR #212
DO NOT ADD A SEVENTH R4 IMPLEMENTATION PATH
DO NOT MUTATE RULESET 20707483
DO NOT CLAIM THE TRUSTED WORKFLOW CLOSED_CANONICAL
DO NOT BEGIN K6-R5
```

`WAIVER=NO`.
