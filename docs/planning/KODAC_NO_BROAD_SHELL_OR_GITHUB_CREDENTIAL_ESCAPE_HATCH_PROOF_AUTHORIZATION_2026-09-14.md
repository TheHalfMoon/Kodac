# Kodac No-Broad-Shell-Or-GitHub-Credential-Escape-Hatch Proof Authorization — 2026-09-14

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / BOUNDED TEST-ONLY PROOF AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
RESEQUENCING_AUTHORITY = CLOSED_CANONICAL / PR #637 / merge 51f634b5226ca67b8229dc2f8c27209ec7506db1
CANONICAL_BASE = 51f634b5226ca67b8229dc2f8c27209ec7506db1
TARGET_CRITERION = NO_BROAD_SHELL_OR_GITHUB_CREDENTIAL_ESCAPE_HATCH / PARTIAL_CANONICAL
CURRENT_AUDIT = PROVEN 10 / PARTIAL 13 / MISSING 0 / NOT_APPLICABLE 2 / TOTAL 25
O4_LIVE_PROOF = DEFERRED_EXTERNAL_EDGE / NOT_REQUIRED_FOR_THIS_UNIT
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This candidate authorizes only a later bounded test-only proof unit after this authorization itself independently qualifies, merges with the exact qualified head, and receives external post-merge CLOSED_CANONICAL proof. It performs no source mutation while open, creates no live GitHub publication budget, and requires no founder secret, provider invocation, network egress, persistence, release, or deployment.

## Exact authorization-candidate scope

This authorization candidate may modify exactly one repository path:

```text
docs/planning/KODAC_NO_BROAD_SHELL_OR_GITHUB_CREDENTIAL_ESCAPE_HATCH_PROOF_AUTHORIZATION_2026-09-14.md
```

No second path may change in this authorization candidate.

## Live-source grounding (read-only observations at CANONICAL_BASE)

```text
PRODUCT_RUNTIME_SHELL_TRUE = NOT_FOUND in packages/kodac-runtime/src, agents, tools
PRODUCT_CHILD_PROCESS_SURFACE = spawnSync/execFile/spawn only, each with shell:false
  (live-solve-fixture.ts:43, execution/gateway.ts:159/290/291)
PRODUCT_DYNAMIC_CODE_EXECUTION = NOT_FOUND (no eval/Function constructor; .exec hits are RegExp.prototype.exec only)
PRODUCT_GITHUB_TOKEN_OR_SECRETS = NOT_FOUND in packages/kodac-runtime/src
TRUSTED_CI_TOKEN_USE = READ_ONLY_GITHUB_TOKEN from github.token in
  k6-r5-trusted-qualification.yml and k6-r4-trusted-qualification.yml only
TRUSTED_CI_SHELL_STEPS = shell:bash run steps (GitHub Actions step semantics, not product shell escape)
```

These observations are scoping evidence, not the proof. The later unit must re-verify them live and encode them as failing-closed regression assertions.

## Later implementation authority created only after canonical closure

After this exact authorization becomes CLOSED_CANONICAL, one later bounded test-only proof unit is authorized to create only this path:

```text
packages/kodac-runtime/test/no-broad-shell-or-github-credential-escape-hatch.test.ts
```

No source, schema, workflow, dependency, lockfile, package metadata, provider contract, persistence, telemetry, release, or deployment path is authorized by this unit. If the proof requires a static helper, the helper must live inside the same test file.

## Required proof content

The later test must deterministically assert, at minimum:

```text
NO_SHELL_TRUE_IN_PRODUCT_RUNTIME = scan packages/kodac-runtime/src, agents, tools for shell:true (allow shell:false)
NO_CHILD_PROCESS_EXEC = forbid exec/execSync (execFile/spawn/spawnSync permitted only with shell:false present at call)
NO_DYNAMIC_CODE_EXECUTION = forbid eval( and new Function( in product runtime (RegExp .exec allowed)
NO_GITHUB_TOKEN_IN_PRODUCT_SRC = forbid GITHUB_TOKEN, github.token, getOctokit, secrets. in packages/kodac-runtime/src
CI_TOKEN_USE_ENUMERATED = every github.token/secrets.GITHUB_TOKEN reference under .github/workflows listed; each must resolve to a read-only/scoped binding
K2_H4_CONFINEMENT_PRESENT = typed policy, bounded argv, exact sandbox admission references intact (import-surface check, not behavior re-proof)
```

The test must read repository files relative to the package root, fail closed on unreadable paths, contain no network access, no secret access, no shell spawn, and no ambient-state dependence. All assertions must pass under the repository-supported Node runtime (>=24) and in CI.

## Mandatory regression proof

```text
FOCUSED_NEW_TEST = PASS
FULL_RUNTIME_TESTS = PASS (no regressions)
ROOT_UV_SYNC_FROZEN_DEV = PASS
ROOT_PROVENANCE = PASS
ROOT_PYTEST = PASS
ROOT_RUFF = PASS
GIT_DIFF_CHECK = PASS
```

A Node 22 diagnostic run is not canonical qualification because the runtime package declares `node >=24`.

## Qualification requirements for the later implementation

```text
EXACT_CHANGED_PATHS = the one authorized test path only
CRITERION_UPGRADE = NOT_GRANTED_BY_THIS_UNIT (closure of the project-wide row requires a later six-path reconciliation recording this proof)
SUBSTANTIVE_EXACT_HEAD_REVIEW = CLEAN
REQUIRED_GITHUB_CHECKS = PASS
UNRESOLVED_MATERIAL_THREADS = 0
ACTIVE_RULESET = VERIFIED
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = NEVER
EXPECTED_HEAD_NORMAL_MERGE = REQUIRED
POST_MERGE_PROOF = REQUIRED
EXTERNAL_CLOSED_CANONICAL_PROOF = REQUIRED
```

## Explicit non-grants

```text
LIVE_GITHUB_PUBLICATION_POST = NOT_AUTHORIZED
NEW_POST_BUDGET = 0
SECRET_ACCESS = NOT_AUTHORIZED
SECRET_CREDENTIAL_ACCESS = NOT_AUTHORIZED
SOURCE_SCHEMA_WORKFLOW_DEPENDENCY_MUTATION = NOT_AUTHORIZED
PROVIDER_OR_MODEL_ADMISSION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
PERSISTENCE_DATABASE_QUEUE_SCHEDULER = NOT_AUTHORIZED
TELEMETRY = NOT_AUTHORIZED
K2_AUTHORITY_CHANGE = NOT_AUTHORIZED
CRITERION_ROW_CLOSURE = NOT_AUTHORIZED (requires later reconciliation)
O4_LIVE_PROOF_EXECUTION = NOT_AUTHORIZED
PUBLIC_RELEASE = NOT_AUTHORIZED
PACKAGE_PUBLICATION = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PHASE_OVERALL_STATUS_MUTATION = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
REBASE = NOT_AUTHORIZED
FORCE_PUSH = NOT_AUTHORIZED
HISTORY_REWRITE = NOT_AUTHORIZED
WAIVER = NO
```

## Authorization-candidate qualification

This docs-only candidate must independently prove:

```text
EXACT_CHANGED_PATHS = 1
CANONICAL_BASE = 51f634b5226ca67b8229dc2f8c27209ec7506db1
PREDECESSOR_PR_637_MERGE = 51f634b5226ca67b8229dc2f8c27209ec7506db1 / MERGED
NO_SOURCE_TEST_SCHEMA_WORKFLOW_DEPENDENCY_MUTATION = YES
ROOT_GOVERNANCE_CHECKS = PASS
SUBSTANTIVE_EXACT_HEAD_REVIEW = CLEAN
UNRESOLVED_MATERIAL_THREADS = 0
ACTIVE_RULESET = VERIFIED
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = NEVER
EXPECTED_HEAD_NORMAL_MERGE = REQUIRED
POST_MERGE_PROOF = REQUIRED
EXTERNAL_CLOSED_CANONICAL_PROOF = REQUIRED
```

While this authorization remains a candidate, the escape-hatch proof test remains NOT_AUTHORIZED.

(End of file)
