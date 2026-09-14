# Kodac O4-O Deterministic Publication Idempotency Fix Authorization — 2026-09-14

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / BOUNDED SOURCE-FIX AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
CANONICAL_BASE = 3150da7659b20cabf1b33492c118edd138337c26
CANONICAL_BASE_TREE = 9b4787e54f3e1f5aadf1b838c232628b7b4a73ff
O4N_ADVERSE_OUTCOME_EVIDENCE = PR #630 / merge 3150da7659b20cabf1b33492c118edd138337c26 / proof comment 5656388868 / CLOSED_CANONICAL
CURRENT_AUDIT = PROVEN 10 / PARTIAL 13 / MISSING 0 / NOT_APPLICABLE 2 / TOTAL 25
CURRENT_MINIMUM_BLOCKER = O4_PRODUCTION_COMPLETENESS_WITH_CREDENTIAL_GENERALITY (IDEMPOTENCY NOT PROVEN)
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This candidate authorizes only a later bounded deterministic-idempotency source fix after this authorization itself independently qualifies, merges with the exact qualified head, and receives external post-merge CLOSED_CANONICAL proof. It performs no source mutation while open and grants no live GitHub publication budget.

## Exact authorization-candidate scope

This authorization candidate may modify exactly one repository path:

```text
docs/planning/KODAC_O4O_DETERMINISTIC_PUBLICATION_IDEMPOTENCY_FIX_AUTHORIZATION_2026-09-14.md
```

No second path may change in this authorization candidate.

## Proven predecessor defect

PR #630 canonically preserves the adverse O4-N live result and proves the source-level causal chain:

```text
ROOT_CAUSE = TIME_DERIVED_O4B_OBSERVATION_TIMESTAMPS_FLOW_THROUGH_O4C_O4D_O4E_INTO_O4F_PUBLICATION_SLOT_IDENTITY
DEFECT_LOCATION = O4-F publicationSlotIdentity includes o4eExecutionIdentity, which transitively includes wall-clock observation timestamps
EFFECT = same logical review/publication task and reviewed head can resolve to different logical publication slots at different observation times
OBSERVED_LIVE_EFFECT = second execution published a second distinct COMMENTED review instead of recovering the first exact publication
```

Fresh source inspection at `CANONICAL_BASE` also establishes a second identity-boundary defect relevant to the required recovery proof:

```text
O4G_SLOT_RECEIPT_IDENTITY_CURRENTLY_HASHES = publicationRequestIdentity + logical/external receipt fields
O4G_REVIEW_RECEIPT_IDENTITY_CURRENTLY_HASHES = publicationAdmissionIdentity + external review identity + slotReceiptIdentities
PUBLICATION_REQUEST_IDENTITY = EXECUTION-SPECIFIC / transitively includes o4eExecutionIdentity
PUBLICATION_ADMISSION_IDENTITY = EXECUTION-SPECIFIC / includes o4eExecutionIdentity
EFFECT = even after stabilizing the O4-F slot, a repeated time-only execution can recover the same GitHub object but still derive a different receipt identity
```

Therefore the smallest complete fix must repair both the logical publication-slot identity boundary and the logical external-receipt identity boundary. Fixing only the O4-F marker is insufficient for the canonical requirement that the second execution recover the first receipt identically.

## Later implementation authority created only after canonical closure

After this exact authorization becomes CLOSED_CANONICAL, one later bounded implementation unit is authorized to modify only these four paths:

```text
packages/kodac-runtime/src/github-review/o4f-safe-github-publication-admission.ts
packages/kodac-runtime/test/o4f-safe-github-publication-admission.test.ts
packages/kodac-runtime/src/github-review/o4g-bounded-github-review-publication.ts
packages/kodac-runtime/test/o4g-bounded-github-review-publication.test.ts
```

No schema path, workflow, dependency, lockfile, package metadata, provider contract, O4-B/O4-C/O4-D/O4-E/O4-H/O4-I source, CLI, persistence, telemetry, release, or deployment path is authorized by this unit.

## Required O4-F identity repair

The later implementation must preserve all existing result/request fields and external schema shapes. It must change only the logical slot digest boundary so that `publicationSlotIdentity` is independent of execution-time evidence.

The logical slot preimage must bind, at minimum:

```text
publicationClass
repositoryId
pullRequestNumber
reviewedHead
taskId
policyIdentity
claimIdentity (null for summary; normalized claim identity for inline)
path (null for summary; exact repository path for inline)
lineAnchor (null for summary; exact validated line for inline)
```

The logical slot preimage must NOT include:

```text
o4eExecutionIdentity
o4dAdmissionIdentity
o4cContextIdentity
O4-B readContextEvidenceIdentity
observation timestamps
request/acquisition timestamps
ephemeral execution identifiers
```

`o4eExecutionIdentity` must remain present in the O4-F request/result lineage and may continue to participate in `publicationRequestIdentity` and `publicationAdmissionIdentity`. This authorization removes execution identity only from the logical idempotency slot, not from execution accountability.

## Required O4-G receipt repair

The later implementation must preserve all existing O4-G result and slot-receipt fields and external schema shapes.

`slotReceiptIdentity` must identify the exact logical slot plus the exact observed GitHub object/body/anchor receipt. Its digest preimage must preserve:

```text
publicationSlotIdentity
publicationClass
bodyIdentity
githubObjectKind
githubObjectId
githubNodeId
pullRequestReviewId
commitId
path
line
side
```

`publicationRequestIdentity` must remain present in the slot-receipt object for current-execution lineage but must not participate in `slotReceiptIdentity`, because it is execution-specific.

`reviewReceiptIdentity` must identify the exact observed COMMENT publication and its stable slot receipts. Its digest preimage must preserve:

```text
reviewId
reviewNodeId
reviewState
commitId
slotReceiptIdentities
```

`publicationAdmissionIdentity` must remain present in the O4-G result for current-execution lineage but must not participate in `reviewReceiptIdentity`, because it is execution-specific.

This change must not weaken exact body matching, exact marker matching, exact reviewed-head binding, live PR identity checks, diff-anchor checks, duplicate-slot detection, one-POST maximum, read-back verification, recovery scanning, or fail-closed behavior.

## Mandatory regression proof

The later implementation must prove at minimum:

```text
TIME_ONLY_O4B_DIFFERENCE_SAME_LOGICAL_INPUTS => SAME publicationSlotIdentity
TIME_ONLY_O4B_DIFFERENCE => DIFFERENT o4eExecutionIdentity
TIME_ONLY_O4B_DIFFERENCE => DIFFERENT publicationRequestIdentity / publicationAdmissionIdentity permitted
SAME_LOGICAL_PUBLICATION_ALREADY_PRESENT => COMPLETED_ALREADY_PRESENT
SAME_LOGICAL_PUBLICATION_ALREADY_PRESENT => ZERO additional POSTs
SAME_LOGICAL_PUBLICATION_ALREADY_PRESENT => SAME reviewId
SAME_LOGICAL_PUBLICATION_ALREADY_PRESENT => SAME reviewNodeId
SAME_LOGICAL_PUBLICATION_ALREADY_PRESENT => SAME reviewReceiptIdentity
CHANGED_REVIEWED_HEAD => DIFFERENT publicationSlotIdentity
CHANGED_TASK_ID => DIFFERENT publicationSlotIdentity
CHANGED_POLICY_IDENTITY => DIFFERENT publicationSlotIdentity
CHANGED_INLINE_CLAIM_IDENTITY => DIFFERENT inline publicationSlotIdentity
CHANGED_INLINE_PATH_OR_LINE => DIFFERENT inline publicationSlotIdentity
BODY_MISMATCH_AT_EXISTING_SLOT => FAIL_CLOSED / NO POST
DUPLICATE_EXISTING_SLOT => FAIL_CLOSED / NO POST
```

The focused O4-F and O4-G test matrices must pass. The full `@kodac/runtime-internal` test suite must pass under the repository-supported Node runtime. Existing schema-validation tests must remain green without schema mutation.

## Qualification requirements for the later implementation

Before merge, the implementation must prove all of the following on the exact head:

```text
EXACT_CHANGED_PATHS = the four authorized O4-F/O4-G source/test paths only
NODE_RUNTIME = satisfies packages/kodac-runtime/package.json engines (>=24)
O4F_FOCUSED_TESTS = PASS
O4G_FOCUSED_TESTS = PASS
FULL_RUNTIME_TESTS = PASS
ROOT_UV_SYNC_FROZEN_DEV = PASS
ROOT_PROVENANCE = PASS
ROOT_PYTEST = PASS
ROOT_RUFF = PASS
GIT_DIFF_CHECK = PASS
WORKTREE = CLEAN
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

A Node 22 diagnostic run is not canonical qualification because the runtime package declares `node >=24`.

## Explicit non-grants

```text
LIVE_GITHUB_PUBLICATION_POST = NOT_AUTHORIZED
NEW_POST_BUDGET = 0
SECRET_ACCESS = NOT_AUTHORIZED
SECRET_CREDENTIAL_ACCESS = NOT_AUTHORIZED
DELETE_OR_EDIT_EXISTING_REVIEWS = NOT_AUTHORIZED
MERGE_PR_163 = NOT_AUTHORIZED
O4B_O4C_O4D_O4E_MUTATION = NOT_AUTHORIZED
O4H_O4I_MUTATION = NOT_AUTHORIZED
SCHEMA_MUTATION = NOT_AUTHORIZED
WORKFLOW_MUTATION = NOT_AUTHORIZED
DEPENDENCY_OR_LOCKFILE_MUTATION = NOT_AUTHORIZED
PROVIDER_OR_MODEL_ADMISSION = NOT_AUTHORIZED
PERSISTENCE_DATABASE_QUEUE_SCHEDULER = NOT_AUTHORIZED
TELEMETRY = NOT_AUTHORIZED
K2_AUTHORITY_CHANGE = NOT_AUTHORIZED
PUBLIC_RELEASE = NOT_AUTHORIZED
PACKAGE_PUBLICATION = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PHASE_OVERALL_STATUS_MUTATION = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

## Authorization-candidate qualification

This docs-only candidate must independently prove:

```text
EXACT_CHANGED_PATHS = 1
CANONICAL_BASE = 3150da7659b20cabf1b33492c118edd138337c26
PREDECESSOR_PR_630_PROOF = comment 5656388868 / CLOSED_CANONICAL
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

While this authorization remains a candidate, the source fix remains NOT_AUTHORIZED.

## After canonical closure

Only after this exact authorization independently qualifies, merges with the exact expected head, and receives external post-merge CLOSED_CANONICAL proof may the four-path bounded source-fix implementation begin from then-current live `main`.

Successful synthetic/fake-transport qualification of that implementation will not by itself establish O4 production completeness. A later separately authorized live proof with a fresh explicit POST budget and safe founder-held credential injection remains required before upgrading the O4 production-completeness criterion.
