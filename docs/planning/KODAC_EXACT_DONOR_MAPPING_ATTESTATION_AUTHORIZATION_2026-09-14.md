# Kodac Exact Donor Mapping Attestation Authorization — 2026-09-14

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / BOUNDED TEST-ONLY ATTESTATION AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
RESEQUENCING_AUTHORITY = CLOSED_CANONICAL / PR #637 / merge 51f634b5226ca67b8229dc2f8c27209ec7506db1
CANONICAL_BASE = 8362059e7ea723bf3cc4b821e9caac58eecf49da
TARGET_CRITERION = EXACT_DONOR_MAPPING_FOR_COPIED_OR_DERIVED_CODE / PARTIAL_CANONICAL
O4_LIVE_PROOF = DEFERRED_EXTERNAL_EDGE / NOT_REQUIRED_FOR_THIS_UNIT
CURRENT_AUDIT = PROVEN 10 / PARTIAL 13 / MISSING 0 / NOT_APPLICABLE 2 / TOTAL 25
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This candidate authorizes only a later bounded test-only attestation unit after this authorization itself independently qualifies, merges with the exact qualified head, and receives external post-merge CLOSED_CANONICAL proof. It performs no source mutation while open, creates no live GitHub publication budget, and requires no founder secret, provider invocation, network egress, persistence, release, or deployment.

## Exact authorization-candidate scope

This authorization candidate may modify exactly one repository path:

```text
docs/planning/KODAC_EXACT_DONOR_MAPPING_ATTESTATION_AUTHORIZATION_2026-09-14.md
```

No second path may change in this authorization candidate.

## Live-source grounding (read-only observations at CANONICAL_BASE)

```text
PROVENANCE_IMPORTS_RECORDS = provenance/imports/opencode-patch-v1.yaml only
PROVENANCE_AUTHORIZATIONS = provenance/authorizations/g8-k2-runtime-spine-opencode-patch-v1.yaml only
PROVENANCE_MAIN_ADOPTIONS = provenance/main-adoptions/k2-opencode-patch-v1.yaml only
THIRD_PARTY_NOTICES = packages/kodac-runtime/THIRD_PARTY_NOTICES.md (OpenCode/MIT adaptation notice for src/edit/patch.ts)
IN_SOURCE_DONOR_MARKERS = KDO_*_DONOR_PROVENANCE constants, DONOR_PORT source-type vocabulary,
  "Adapted from" header (src/edit/patch.ts), "studied from" references, pinned donor commits/blobs
DONOR_STUDIES_AUDIT_ONLY = per canonical audit, multiple donor studies are planning-only (idea-level, no copied bytes)
ATTESTATION_GAP = no project-wide machine-checked proof that every copied/derived production byte is ledger-covered
```

These observations are scoping evidence, not the proof. The later unit must re-verify them live.

## Later implementation authority created only after canonical closure

After this exact authorization becomes CLOSED_CANONICAL, one later bounded test-only unit is authorized to create only this path:

```text
packages/kodac-runtime/test/exact-donor-mapping-attestation.test.ts
```

No source, schema, workflow, dependency, lockfile, package metadata, provider contract, persistence, telemetry, release, or deployment path is authorized by this unit. If the attestation requires a static helper, the helper must live inside the same test file.

## Required attestation content

The later test must deterministically assert, at minimum:

```text
LEDGER_RECORDS_PARSE = every provenance/imports/*.yaml parses and carries record_id, upstream pin, destination_paths
LEDGER_DESTINATIONS_EXIST = every destination_path resolves to an existing tracked file
STRONG_DERIVATION_COVERED = every product file containing strong derivation markers
  ("Adapted from", "Ported from", DONOR_PORT applied to self, "substantial portions")
  is covered by a ledger destination_path
STUDY_VS_PORT_DECLARED = every KDO_*_DONOR_PROVENANCE constant declares an explicit disposition
  in {STUDY, PORT}; every PORT disposition has a matching ledger record; STUDY dispositions
  assert no copied-byte markers in the same file
THIRD_PARTY_NOTICES_CONSISTENT = every ledger record with notice_required has its notice text present
NO_SILENT_DONOR = no file references a pinned upstream commit/blob without a disposition declaration
```

The test must read repository files relative to the package root, fail closed on unreadable paths, contain no network access, no secret access, no shell spawn, and no ambient-state dependence. All assertions must pass under the repository-supported Node runtime (>=24) and in CI on all matrix platforms (path separators normalized; no platform-conditional expectations).

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

A Node 22 diagnostic run is not canonical qualification because the runtime package declares `node >=24`. Path-separator and typecheck discipline from the escape-hatch proof unit (explicit Dirent annotation, separator normalization) applies.

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
NEW_LEDGER_RECORDS = NOT_AUTHORIZED (attestation only; missing mappings are reported as test failures for later authorized remediation, not silently added)
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

If live re-verification finds a copied-byte file without ledger coverage, the test must fail (recording the gap) rather than the implementation adding ledger records: new import records require their own donor-intake authorization.

## Authorization-candidate qualification

This docs-only candidate must independently prove:

```text
EXACT_CHANGED_PATHS = 1
CANONICAL_BASE = 8362059e7ea723bf3cc4b821e9caac58eecf49da
PREDECESSOR_PR_641_MERGE = 8362059e7ea723bf3cc4b821e9caac58eecf49da / MERGED
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

While this authorization remains a candidate, the donor attestation test remains NOT_AUTHORIZED.

(End of file)
