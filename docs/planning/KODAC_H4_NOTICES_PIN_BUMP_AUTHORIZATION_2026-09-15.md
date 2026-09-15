# Kodac H4 Notices-Blob Pin Bump Authorization — 2026-09-15

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / TEST-PIN-BUMP AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
RESEQUENCING_AUTHORITY = CLOSED_CANONICAL / PR #637 / merge 51f634b5226ca67b8229dc2f8c27209ec7506db1
CANONICAL_BASE = 3050afbf8c2b3775da5d80b7f1c4ae7c6cf8bdb6
DONOR_PORT_INTAKE_CANDIDATE = OPEN / PR #649 / head 7d578e636c974fe0655e2e48c6b133c80e7242b8
ADVERSE_EVIDENCE = PR #649 runtime matrix Test failure: H4 pin tests expect THIRD_PARTY_NOTICES.md blob aaa1ce56d27f5b7dd185f9aaa257d978c2a56c76, intake notices edit yields 5900f9b2da3041e1507b6fc132d749ef4deda32e
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This is a one-path authorization candidate only. It grants no test mutation until it independently qualifies, receives substantive exact-head review, merges through protected `main` with an expected-head guard, and receives external post-merge proof.

## Exact authorization-candidate scope

This authorization candidate may modify exactly one repository path:

```text
docs/planning/KODAC_H4_NOTICES_PIN_BUMP_AUTHORIZATION_2026-09-15.md
```

No second path may change in this authorization candidate.

## Governance reason

PR #649 (donor PORT intake, PR #646 authority) is red on the runtime matrix for a known, owned reason: three H4 tests pin `THIRD_PARTY_NOTICES.md` byte-identical by git blob, and the intake's spec-kit notice section changes that blob from `aaa1ce56d27f5b7dd185f9aaa257d978c2a56c76` to `5900f9b2da3041e1507b6fc132d749ef4deda32e` (new blob computed locally from the candidate content and independently corroborated by the CI failure's actual value). The notices edit itself is authorized (PR #646 conditional notices delta); only the consequential pin updates fall outside the PR #646 13-path allowlist. Failing forward by weakening the pins or the notices entry is forbidden; silently merging past the red matrix is forbidden. Therefore the minimum governance-valid next unit is this pin-bump authorization.

## Conditional future implementation authority

Only after this authorization becomes externally proven `CLOSED_CANONICAL` may the open PR #649 candidate branch be amended with exactly the following hash-only edits and no others:

```text
packages/kodac-runtime/test/kdo-h4-r3a-attested-sandbox-workload.test.ts (ONE_LINE: notices blob aaa1ce5... -> 5900f9b...)
packages/kodac-runtime/test/kdo-h4-r3b-sandbox-backend-evidence.test.ts (ONE_LINE: notices blob aaa1ce5... -> 5900f9b...)
packages/kodac-runtime/test/kdo-h4-r3d-gvisor-observer.test.ts (ONE_LINE: notices blob aaa1ce5... -> 5900f9b...)
```

## Binding implementation rules

```text
HASH_VALUES_ONLY = REQUIRED / no assertion, name, map-key, or logic change
OLD_HASH = aaa1ce56d27f5b7dd185f9aaa257d978c2a56c76 / must be absent from the three files after the edit
NEW_HASH = 5900f9b2da3041e1507b6fc132d749ef4deda32e / must equal git hash-object of the candidate THIRD_PARTY_NOTICES.md
NO_OTHER_FILE_MAY_CHANGE = REQUIRED
MATRIX_MUST_GO_GREEN = REQUIRED before any merge of PR #649
```

If the notices content changes again before PR #649 merges, the new hash must be recomputed from candidate content; copying a hash from any other source is forbidden.

## Explicit non-grants

```text
NOTICES_CONTENT_CHANGE = NOT_AUTHORIZED
PIN_MAP_STRUCTURE_CHANGE = NOT_AUTHORIZED
ASSERTION_WEAKENING = NOT_AUTHORIZED
NEW_BASELINE_NORMALIZATION = NOT_AUTHORIZED
SOURCE_RUNTIME_SCHEMA_MUTATION = NOT_AUTHORIZED
WORKFLOW_DEPENDENCY_LOCKFILE_MUTATION = NOT_AUTHORIZED
PROVIDER_MODEL_PERSISTENCE_TELEMETRY = NOT_AUTHORIZED
O4_LIVE_PROOF_EXECUTION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
LIVE_GITHUB_PUBLICATION_POST = NOT_AUTHORIZED
NEW_POST_BUDGET = 0
PUBLIC_RELEASE_PACKAGE_DEPLOYMENT = NOT_AUTHORIZED
CRITERION_ROW_UPGRADE = NOT_AUTHORIZED
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
CANONICAL_BASE = 3050afbf8c2b3775da5d80b7f1c4ae7c6cf8bdb6
PREDECESSOR_PR_648_MERGE = 3050afbf8c2b3775da5d80b7f1c4ae7c6cf8bdb6 / MERGED
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

While this authorization remains a candidate, the H4 pin amendment remains NOT_AUTHORIZED and PR #649 remains unmergeable on its red matrix.

(End of file)
