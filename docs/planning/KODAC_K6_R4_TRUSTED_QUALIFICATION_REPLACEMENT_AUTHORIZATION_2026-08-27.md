# Kodac K6-R4 Trusted Qualification Replacement Authorization

## Record identity

- Date: 2026-08-27
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-27`
- Authority class: DOCUMENTATION / REPLACEMENT K6-R4 AUTHORIZATION CANDIDATE
- Canonical candidate base commit: `87f9a3dbe9d15d0b1573b50fe74487ca83562ba2`
- Canonical candidate base tree: `36a7e9f279b1fb9828d61a16c476963cf311dde3`
- Protected-main ruleset: `20707483` (`Kodac canonical main protection v1`)
- Ruleset trusted node ID: `RRS_lACqUmVwb3NpdG9yec5NVN5LzgE7-Js`
- Ruleset trusted snapshot `updated_at`: `2026-08-11T21:30:21.316+03:00`
- Active implementation PR: `#212`
- Active implementation branch: `feat/k6-r4-privacy-governed-outcome-memory`
- Pre-reconciliation PR #212 head: `19a76ac90f5a753656e7c7703a3c8f01a690a62f`
- Pre-reconciliation dedicated workflow blob: `868271fdca52f67d91e967a694ded6bd93cd466b`
- `WAIVER=NO`

This record is a candidate until its exact final head satisfies the adoption gate below, is merged by a guarded normal merge commit, and its canonical post-merge proof succeeds.

## Canonical predecessor chain

The governing R4 product/runtime scope remains the original bounded authorization:

```text
Original R4 authorization merge:
1e8c193ca0aeeb77b56ad1c75d9d7db0ca82b372

Original R4 authorization document blob:
db0cd6f5484494c1fcacb37570465059a0484c63
```

The independent trusted-inspector hardening authorization is canonical:

```text
Hardening authorization merge:
34aa910bb72856ee138e64e47354d8d93072052d

Hardening authorization document blob:
9e21684993b8ef3940434560787b63c00d55866b
```

The final protected-base binding repair is canonical at the current trusted-workflow merge:

```text
Trusted workflow canonical merge:
87f9a3dbe9d15d0b1573b50fe74487ca83562ba2

Trusted workflow canonical tree:
36a7e9f279b1fb9828d61a16c476963cf311dde3

Trusted workflow canonical blob:
c5c005aaa9e77ea177020e6ee4033feda5b29520

Trusted workflow path:
.github/workflows/k6-r4-trusted-qualification.yml
```

The protected-base binding repair was separately authorized by PR #217 / merge `5440c32f06148f5ec7f3d2880321323176546546`; PR #218 then merged the exact one-path workflow repair as `87f9a3dbe9d15d0b1573b50fe74487ca83562ba2`.

## Positive trusted-workflow registration proof

The mandatory post-merge state-only probe on PR #212 proved that the final trusted workflow is registered and instantiates its protected-base inspector job.

```text
PROBE_RUN_ID=33039466613
PROBE_JOB_ID=98409535479
EVENT=pull_request_target
EVENT_BASE_SHA=87f9a3dbe9d15d0b1573b50fe74487ca83562ba2
EVENT_HEAD_SHA=19a76ac90f5a753656e7c7703a3c8f01a690a62f
JOB_COUNT=1
JOB_NAME=k6-r4-trusted-qualification
INSPECTOR_STEP=Inspect exact R4 candidate as untrusted data
INSPECTOR_STARTED=true
ACTUAL_TERMINAL_DIAGNOSTIC=K6-R4 trusted qualification failed: replacement authorization unavailable
WAIVER=NO
```

That failure is intentionally not an R4 qualification PASS. It is positive control-plane proof of exactly:

```text
WORKFLOW_REGISTERED
JOB_INSTANTIATED
INSPECTOR_STARTED
FAIL_CLOSED_AT_INTENTIONAL_STAGING_BOUNDARY
```

The prior zero-job workflow-registration defect and the later historical pull-request base-SHA binding defect are therefore no longer the active blockers. The intentionally absent replacement authorization is now the exact staging boundary.

## Why PR #212 was paused instead of waived

PR #212 changes the dedicated R4 workflow as one of its six authorized implementation paths. A workflow controlled by the candidate cannot independently prove that the candidate did not weaken that workflow's own admission and validation logic.

The repository therefore paused PR #212 and canonically introduced a protected-base, read-only `pull_request_target` inspector that treats all candidate bytes as untrusted data and does not execute candidate code.

This replacement authorization preserves that trust split:

```text
BASE-CONTROLLED TRUSTED INSPECTION
+
CANDIDATE-OWNED DEDICATED EXECUTION
+
REPOSITORY REQUIRED TRUSTED CHECKS
+
FRESH EXACT-HEAD REVIEW / THREAD PROOF
=
R4-SPECIFIC QUALIFICATION EVIDENCE
```

Neither the candidate-owned workflow nor model/reviewer output can establish readiness by itself.

## Decision after canonical adoption only

After and only after this exact replacement authorization becomes canonical and post-merge proven, authorize forward reconciliation and requalification of PR #212 under the preserved six-path K6-R4 v1 implementation scope.

The reconciliation must be non-destructive:

```text
NO REBASE
NO FORCE-PUSH
NO HISTORY REWRITE
NORMAL FORWARD MERGE FROM EXACT LIVE main
```

The reconciled PR #212 candidate must descend from the canonical merge of this replacement authorization and must then be qualified from scratch on its exact final head.

This record does not authorize a seventh R4 implementation path.

## Fresh implementation-base contract

This candidate cannot self-pin its own future canonical merge SHA, merge tree, or document blob.

External exact-head qualification and post-merge proof must capture those identities. Once this document is canonically merged, that exact canonical merge becomes the fresh K6-R4 implementation base.

The reconciled dedicated workflow must set:

```text
K6_R4_AUTHORIZATION_MERGE_SHA=<exact canonical merge of this replacement authorization>
K6_R4_AUTHORIZATION_MERGE_TREE=<tree of that canonical merge>
K6_R4_AUTHORIZATION_DOCUMENT_BLOB=<canonical blob of this replacement authorization>
```

It must also change its authorization document lookup from the historical original R4 authorization path to exactly:

```text
docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_REPLACEMENT_AUTHORIZATION_2026-08-27.md
```

Those corrections occur only inside the already-authorized candidate-owned R4 workflow path.

All other protected named-step blocks must remain byte-identical to the fingerprints in the manifest below unless a separately canonical authorization explicitly supersedes this record.

## Exact R4 implementation allowlist preserved

PR #212 may change exactly these six implementation paths relative to the fresh implementation base:

```text
.github/workflows/k6-r4-privacy-governed-outcome-memory.yml
schema/k6-r4-privacy-governed-outcome-memory.schema.json
packages/kodac-runtime/src/evidence-router/outcome-memory-contracts.ts
packages/kodac-runtime/src/evidence-router/outcome-memory.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k6-r4-privacy-governed-outcome-memory.test.ts
```

No seventh implementation path is authorized.

The trusted inspector itself is already canonical on protected `main` and must not appear in the PR #212 candidate diff.

## Pinned non-workflow candidate blobs

The five non-workflow R4 implementation blobs from the accepted PR #212 candidate are pinned exactly:

```text
schema/k6-r4-privacy-governed-outcome-memory.schema.json
e38479681a1df5787caae8b4baf4153dc2205d96

packages/kodac-runtime/src/evidence-router/outcome-memory-contracts.ts
6411a42e6fc0074e60edc10eaa27e00b3b197fca

packages/kodac-runtime/src/evidence-router/outcome-memory.ts
ec8ccae0bd7ede40ebef4060e104da79e7d5f90a

packages/kodac-runtime/src/index.ts
74b9d62501ffce8f2cb053e3b72827de11c203d9

packages/kodac-runtime/test/k6-r4-privacy-governed-outcome-memory.test.ts
2b793a0ef18df035892d7bd97c39be9ba0c44cfe
```

Forward reconciliation may not silently alter any of these five blobs. A required change to any one of them invalidates this replacement authorization and requires separately canonical replacement authority.

The candidate-owned dedicated workflow blob is intentionally not pinned as one whole blob because the fresh authorization SHA/tree/document blob and replacement authorization path must be updated after this record's canonical merge. Its protected structure is instead pinned by exact step fingerprints, required fragments, forbidden fragments, immutable actions, and the trusted inspector's additional static checks.

## Trusted inspector manifest

The following machine-readable manifest is the exact contract consumed by the protected-base trusted inspector.

K6_R4_TRUSTED_INSPECTOR_MANIFEST_JSON_BEGIN
```json
{
  "version": "kodac-k6-r4-trusted-inspector-manifest-v2",
  "authorized_pr": 212,
  "trusted_workflow_path": ".github/workflows/k6-r4-trusted-qualification.yml",
  "trusted_workflow_merge_sha": "87f9a3dbe9d15d0b1573b50fe74487ca83562ba2",
  "trusted_workflow_blob": "c5c005aaa9e77ea177020e6ee4033feda5b29520",
  "required_candidate_blobs": {
    "packages/kodac-runtime/src/evidence-router/outcome-memory-contracts.ts": "6411a42e6fc0074e60edc10eaa27e00b3b197fca",
    "packages/kodac-runtime/src/evidence-router/outcome-memory.ts": "ec8ccae0bd7ede40ebef4060e104da79e7d5f90a",
    "packages/kodac-runtime/src/index.ts": "74b9d62501ffce8f2cb053e3b72827de11c203d9",
    "packages/kodac-runtime/test/k6-r4-privacy-governed-outcome-memory.test.ts": "2b793a0ef18df035892d7bd97c39be9ba0c44cfe",
    "schema/k6-r4-privacy-governed-outcome-memory.schema.json": "e38479681a1df5787caae8b4baf4153dc2205d96"
  },
  "required_named_step_sha256": {
    "Attest exact head, authorization, six-path scope, predecessor pins, and immutable Actions": "d4b500880154c575d7ec7ab29bfff46da532f41eac3fbe1f331d315e53618f33",
    "Sync locked validation environment outside the checkout": "43b37d114c8c31f1b6d9cd0c83145aad98f0e8e0c14c182733148e9b33ea4a20",
    "Validate R4 schema registration, predecessor references, and runtime parity": "f53c88170e2c46ffd32aa343c9604f0c206823b0b10a5de8b483d1fab46277f7",
    "Prove pure authority-bounded production surface and live ruleset": "2741ea4fe326183f67285f0dc2016e526f8eac8b7cf577826ea0f37e6b591f0a",
    "Install integrity-locked TypeScript validation tooling outside the checkout": "f0d1c8234253145dcacd62a01b61c56582f98f087554830926a0f573ff21627b",
    "Run strict TypeScript, focused R4 and predecessor regressions, full runtime, Python, Ruff, and provenance gates": "f56fb089561528da1ac5272bd2316968b9dc1e0b6e5443ceb3b84004e4c5ea4d",
    "Remove ephemeral TypeScript validation tooling": "9e268615d1572a7a2726042c0bf70c0d7a164e92d4bd6d7fd2a401d2bde42e6c",
    "Attest checkout unchanged after K6-R4 validation": "219ec8db8e9421d805f68dd53fd6fa3ef3ea114a5f3a832bc251e1bef9d11bb9"
  },
  "required_workflow_fragments": [
    "permissions:\n  contents: read",
    "K6_R4_IMPLEMENTATION_BRANCH: \"feat/k6-r4-privacy-governed-outcome-memory\"",
    "persist-credentials: false",
    "fetch-depth: 0",
    "docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_REPLACEMENT_AUTHORIZATION_2026-08-27.md",
    "test \"$PR_BASE_SHA\" = \"$K6_R4_AUTHORIZATION_MERGE_SHA\"",
    "git merge-base --is-ancestor \"$K6_R4_AUTHORIZATION_MERGE_SHA\" HEAD",
    "node --experimental-strip-types --test packages/kodac-runtime/test/k6-r4-privacy-governed-outcome-memory.test.ts",
    "uv run --frozen --no-sync python tools/validate_provenance.py"
  ],
  "forbidden_workflow_fragments": [
    "continue-on-error:",
    "workflow_dispatch:",
    "schedule:",
    "contents: write",
    "pull-requests: write",
    "actions: write",
    "checks: write",
    "id-token:",
    "actions/cache",
    "actions/upload-artifact",
    "github/codeql-action/upload-sarif",
    "secrets."
  ]
}
```
K6_R4_TRUSTED_INSPECTOR_MANIFEST_JSON_END

The JSON object between the markers, after trimming surrounding whitespace, must parse with duplicate-key rejection and exactly the key set required by the trusted inspector.

## Named-step fingerprint interpretation

The first named-step hash above intentionally describes the reconciled form, not the stale pre-reconciliation PR #212 form.

The exact allowed transformation inside that named block is:

```diff
- authorization_path="docs/planning/KODAC_K6_R4_PRIVACY_GOVERNED_OUTCOME_MEMORY_AUTHORIZATION_2026-08-26.md"
+ authorization_path="docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_REPLACEMENT_AUTHORIZATION_2026-08-27.md"
```

No other line in that named-step block is authorized to change.

The three fresh authorization identity values are job-level environment values outside the named-step hash blocks and are bound dynamically to the canonical replacement-authorization merge/tree/blob by the trusted inspector.

## R4 v1 product/runtime contract preserved

This replacement authorization does not broaden the R4 implementation contract.

The outcome-memory surface remains a pure, caller-managed, in-process value transformation with privacy-governed scope and lifecycle semantics.

```text
R4_RUNTIME_STORAGE=CALLER_MANAGED_IN_PROCESS_VALUE_ONLY
DURABLE_PERSISTENCE=NO
FILESYSTEM_IO=NO
DATABASE_IO=NO
NETWORK_EGRESS=NO
TELEMETRY_UPLOAD=NO
PROVIDER_MODEL_REVIEWER_INVOCATION=NO
TRAINING_LEARNING_MUTATION=NO
CROSS_REPOSITORY_OR_USER_LEARNING=NO
STRATEGY_PROMOTION=NO
AUTOFIX=NO
NEW_DEPENDENCIES=NO
NEW_EXTERNAL_SERVICES=NO
K2_AUTHORITY_EXPANSION=NO
K5_AUTHORITY_EXPANSION=NO
DONE_GATE_AUTHORITY_CHANGE=NO
RULESET_MUTATION=NO
ADMIN_OR_RULESET_WRITE_PERMISSION=NO
```

The implementation must continue to validate canonical R1 and R3 predecessors, bind exact request/repository/base/head/task identities, project privacy only from validated R1, retain minimized pseudonymous identities only, enforce repository/owner/privacy isolation, and preserve deterministic `APPEND`, `SUPERSEDE`, `DELETE`, `EXPIRE`, and `PURGE_TOMBSTONE` value-to-value transitions.

Deterministic digests remain pseudonymous identifiers, not anonymous data. `ownerScopeId` remains an isolation field only and grants no authentication, authorization, capability, approval, credential, secret, execution, persistence, learning, promotion, or Done Gate authority.

## Trusted-inspector boundary preserved

The base-controlled trusted workflow must remain:

```text
EVENT=pull_request_target
PERMISSIONS=contents: read
AUTHORIZED_REPOSITORY=TheHalfMoon/Kodac
AUTHORIZED_PR=212
AUTHORIZED_HEAD_REPOSITORY=TheHalfMoon/Kodac
AUTHORIZED_HEAD_BRANCH=feat/k6-r4-privacy-governed-outcome-memory
AUTHORIZED_BASE_REF=main
```

It must continue to:

- bind the protected workflow revision to the protected-base `github.sha` identity;
- independently require live protected `main` equality to that protected revision;
- require current PR #212 head equality with the event head before candidate inspection;
- compute candidate scope from immutable exact SHAs;
- retrieve candidate blobs by immutable revision;
- require the exact six-path allowlist;
- reject rename/copy-source drift;
- reject mutation of the trusted inspector by PR #212;
- inspect candidate bytes only as untrusted data;
- reject candidate checkout or candidate execution;
- reject candidate scripts, actions, dynamic evaluation, cache, artifacts, write permissions, secrets and id-token authority;
- enforce bounded API responses and duplicate-key-rejecting JSON parsing;
- verify the replacement manifest, non-workflow candidate blobs, named-step SHA-256 fingerprints, required fragments, forbidden fragments, immutable actions, action metadata, exact step order, exact environment/control surface, production import restrictions, additive-only index projection and schema bounds;
- fail closed on any authorization or identity drift.

The trusted inspector is qualification evidence only. It does not become K2, K5 or Done Gate authority.

## Candidate-owned dedicated execution boundary preserved

After reconciliation, `.github/workflows/k6-r4-privacy-governed-outcome-memory.yml` remains responsible for executing the runtime/regression qualification workload on the exact PR #212 head.

It must retain exactly the required immutable action pins and versions already inspected by the trusted gate, including:

```text
actions/checkout@11d5960a326750d5838078e36cf38b85af677262
actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020
astral-sh/setup-uv@d0cc045d04ccac9d8b7881df0226f9e82c39688e
Node 24.18.0
uv 0.12.1
```

Required execution evidence includes at minimum:

```text
strict TypeScript
focused K6-R4 tests
K6-R3 regression
K6-R2 regression
K6-R1 regression
full kodac-runtime test suite
Python test suite
Ruff
provenance validation
checkout-integrity proof
live ruleset identity validation
```

A dedicated-workflow success is insufficient unless the base-controlled trusted inspector independently passes on the same exact candidate head.

## Forward reconciliation contract for PR #212

After this replacement authorization is canonical and post-merge proven:

1. re-read exact live protected `main`;
2. prove it equals the canonical replacement-authorization merge expected for reconciliation;
3. verify PR #212 remains open, non-draft, on the exact authorized repository/branch and exact six implementation paths;
4. create a normal forward merge of exact live `main` into `feat/k6-r4-privacy-governed-outcome-memory`;
5. do not rebase and do not force-push;
6. update only the already-authorized dedicated workflow path as required to bind the fresh replacement authorization SHA/tree/document blob and replacement authorization path;
7. preserve all five non-workflow blobs pinned above;
8. prove the resulting diff against fresh `main` is still exactly the six-path R4 allowlist;
9. capture the exact final head/tree/workflow blob;
10. discard all prior PR #212 exact-head qualification evidence as stale;
11. qualify the exact reconciled head from scratch.

If protected `main` moves during this sequence, stop stale qualification, forward-reconcile again, and recompute the exact base before continuing.

## PR #212 exact-head qualification gate

Before PR #212 may merge, prove on one exact final head:

- PR state is open;
- PR is non-draft;
- base ref is exactly `main`;
- head repository is exactly `TheHalfMoon/Kodac`;
- head branch is exactly `feat/k6-r4-privacy-governed-outcome-memory`;
- exact live protected-main ancestry is present;
- `behind_by=0`;
- changed-file set is exactly the six authorized R4 paths;
- no rename/copy source exists;
- five non-workflow blobs equal this record's exact pins;
- candidate dedicated workflow satisfies the exact manifest/fingerprint contract;
- `k6-r4-trusted-qualification` is terminal `SUCCESS` for the exact final head;
- `k6-r4-privacy-governed-outcome-memory` is terminal `SUCCESS` for the exact final head;
- repository-required `provenance` from trusted integration `15368` is terminal `SUCCESS`;
- repository-required `legacy-tests` from trusted integration `15368` is terminal `SUCCESS`;
- repository-required `k2-runtime-gate` from trusted integration `15368` is terminal `SUCCESS`;
- fresh exact-head CodeRabbit review is terminal clean with zero unresolved material findings;
- fresh exact-head Qodo review is terminal clean with zero unresolved material findings;
- zero unresolved actionable review threads remain;
- ruleset `20707483` is active and unchanged in accepted identity/required-check semantics;
- independent control-plane reads expose `bypass_actors=[]` and `current_user_can_bypass=never`;
- no waiver exists;
- exact final `HEAD_SHA`, `HEAD_TREE` and candidate workflow blob are captured.

Any head movement invalidates the entire exact-head qualification set.

## Guarded R4 merge and post-merge proof

If and only if the exact final PR #212 head satisfies every qualification requirement above, merge by normal GitHub merge commit using exact `expected_head_sha`.

Do not squash or rebase the canonical R4 merge.

After merge, prove at minimum:

```text
returned merge SHA
protected main == returned merge SHA
ordered parent 1 == exact qualified canonical base
ordered parent 2 == exact qualified PR #212 head
merge tree == exact qualified head tree
canonical six R4 blobs == exact qualified blobs
GitHub signature verified=true / reason=valid
applicable post-merge required checks terminal success
ruleset 20707483 unchanged
bypass_actors=[]
current_user_can_bypass=never
WAIVER=NO
```

Only after those facts are directly proven may K6-R4 be recorded as `CLOSED_CANONICAL`.

## K6-R5 boundary

This replacement authorization does not authorize K6-R5.

```text
K6-R5=NOT_AUTHORIZED
```

After K6-R4 is genuinely `CLOSED_CANONICAL`, re-read live roadmap/governance. Prepare a separately bounded K6-R5 authorization candidate only if canonical repository authority permits that preparation.

## Preserved non-grants

This record does not authorize:

```text
SEVENTH R4 IMPLEMENTATION PATH
R4 PRODUCT SCOPE EXPANSION
DURABLE PERSISTENCE
FILESYSTEM OR DATABASE STORAGE
NETWORK FALLBACK OR EGRESS
TELEMETRY OR UPLOAD
MODEL / PROVIDER / REVIEWER / EVALUATOR EXECUTION
MODEL TRAINING OR FINETUNING
CROSS-REPOSITORY OR CROSS-USER LEARNING
STRATEGY SCORING / RANKING / PROMOTION
AUTOFIX
NEW DEPENDENCIES
NEW EXTERNAL SERVICES
K2 AUTHORITY EXPANSION
K5 AUTHORITY EXPANSION
DONE GATE AUTHORITY CHANGE
RULESET MUTATION
TRUSTED-INSPECTOR WRITE AUTHORITY
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND CLAIMS
K6-R5 IMPLEMENTATION
```

`SELF-IMPROVING != SELF-AUTHORIZING` remains binding.

## Exact scope of this replacement-authorization candidate

This authorization PR may change exactly one path:

```text
docs/planning/KODAC_K6_R4_TRUSTED_QUALIFICATION_REPLACEMENT_AUTHORIZATION_2026-08-27.md
```

No second path is authorized.

## Adoption gate for this replacement authorization

This record remains non-canonical unless its exact final candidate proves all of the following:

1. base ref is exactly `main`;
2. live protected `main` SHA is exactly `87f9a3dbe9d15d0b1573b50fe74487ca83562ba2` unless a later canonical forward update amends this record before qualification;
3. live protected `main` tree is exactly `36a7e9f279b1fb9828d61a16c476963cf311dde3` under the same condition;
4. changed-file set is exactly this one documentation path;
5. the record pins the exact canonical trusted-workflow merge/tree/blob and the governing original/hardening authorization identities;
6. the record contains one valid duplicate-key-free trusted-inspector manifest with exact required key set;
7. applicable repository-required exact-head CI is terminal success;
8. fresh exact-head CodeRabbit review has zero unresolved material correctness/security/governance/authority findings;
9. fresh exact-head Qodo review has zero unresolved material correctness/security/governance/authority findings;
10. zero unresolved actionable review threads remain;
11. candidate is open, non-draft, mergeable and `behind_by=0`;
12. ruleset `20707483` remains active with strict required status checks and required review-thread resolution;
13. independent control-plane proof exposes `bypass_actors=[]` and `current_user_can_bypass=never`;
14. exact final head/tree/document blob are captured;
15. guarded normal merge uses exact qualified `expected_head_sha`;
16. post-merge ordered-parent/tree/blob/protected-main/signature proof succeeds;
17. applicable post-merge required checks are terminal success;
18. `WAIVER=NO`.

If live protected `main` moves before merge, do not merge stale authority. Amend this record to the new exact canonical base through a forward commit, re-run all exact-head evidence, and requalify from scratch.

## Stop boundary

Until this replacement authorization is canonical and post-merge proven:

```text
DO NOT RECONCILE OR MERGE PR #212
DO NOT ADD A SEVENTH R4 PATH
DO NOT MUTATE RULESET 20707483
DO NOT BEGIN K6-R5
DO NOT CLAIM K6-R4 CLOSED_CANONICAL
```

After canonical adoption, proceed immediately to the bounded PR #212 forward reconciliation and exact-head qualification described by this record.

`WAIVER=NO`
