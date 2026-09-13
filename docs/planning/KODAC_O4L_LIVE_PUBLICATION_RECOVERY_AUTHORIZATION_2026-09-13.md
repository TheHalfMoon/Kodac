# Kodac O4-L Live Publication Recovery Authorization — 2026-09-13

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / BOUNDED ADVERSE-OUTCOME RECOVERY AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
CANONICAL_BASE = ce60779a123e4069955baac497d2b7d4ccab9940
CANONICAL_BASE_TREE = e3f8c82219d3191b466b925b2b74444ff5ed0d1f
O4J_AUTHORIZATION = PR #621 / merge 3449a51d90f7a2561e91e284411981325cf45ba4 / proof 5649935879 / CLOSED_CANONICAL
O4K_AUTHORIZATION = PR #622 / merge ce60779a123e4069955baac497d2b7d4ccab9940 / proof 5649996263 / CLOSED_CANONICAL
O4K_LIVE_PROOF = BLOCKED_AFTER_ONE_POST / NOT_CANONICAL
CURRENT_BLOCKER = O4_LIVE_PUBLICATION_RECEIPT
FOUNDER_DECISION = EXPLICIT O4-L RECOVERY AUTHORIZATION / 2026-09-13
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This candidate records the founder's explicit bounded recovery decision after the O4-K live proof consumed its one allowed publication POST without producing a canonical publication receipt. It authorizes no write while this candidate is open. Every write described below is denied until this authorization independently qualifies, receives substantive exact-head review, merges through protected `main` with an expected-head guard, passes post-merge verification, and receives external `CLOSED_CANONICAL` proof.

## Exact candidate scope

This candidate may modify exactly:

```text
docs/planning/KODAC_O4L_LIVE_PUBLICATION_RECOVERY_AUTHORIZATION_2026-09-13.md
```

No second repository path may change.

## Preserved O4-K adverse outcome

```text
O4K_RUN_1_STATUS = BLOCKED_COMPOSITION_NOT_COMPLETED
O4K_RUN_1_CONTINUATION = STOP_AT_COMPOSITION
O4K_RUN_1_FAILURE_CODE = COMPOSITION_NOT_COMPLETED
O4K_RUN_1_BROKER_GET_COUNT = 10
O4K_RUN_1_BROKER_POST_COUNT = 1
O4K_RUN_1_PUBLICATION_REQUEST_COUNT = 1
O4K_RUN_2 = NOT_ATTEMPTED
O4K_GLOBAL_POST_BUDGET = CONSUMED
LIVE_CANONICAL_PUBLICATION_MARKER = ABSENT
```

The live GitHub object produced during that attempt is:

```text
STRAY_REVIEW_ID = 5188963531
STRAY_REVIEW_NODE_ID = PRR_kwDOTVTeS88AAAABNUlMyw
STRAY_REVIEW_AUTHOR = TheHalfMoon
STRAY_REVIEW_AUTHOR_ID = 285091250
STRAY_REVIEW_STATE = PENDING
STRAY_REVIEW_BODY = EMPTY
STRAY_REVIEW_COMMIT_ID = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
STRAY_REVIEW_SUBMITTED_AT = ABSENT
```

The stray review is not a canonical receipt and must never be relabeled as one.

## Root-cause findings

Fresh capture-only analysis reran canonical O4-I/O4-G with the POST blocked before process creation and reproduced the publication request:

```text
RECONSTRUCTED_CANONICAL_POST_UTF8_BYTES = 462
RECONSTRUCTED_CANONICAL_POST_SHA256 = ee3cbce843a225becadeaac2941d47af30b51294fef09963903b3fccd193a96b
RECONSTRUCTED_EVENT = COMMENT
RECONSTRUCTED_COMMIT_ID = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
RECONSTRUCTED_BODY_UTF8_LENGTH = 353
RECONSTRUCTED_COMMENTS_COUNT = 0
```

The reconstructed JSON contains a non-empty summary body and the canonical Kodac publication-slot marker. Therefore:

```text
O4G_CANONICAL_REQUEST_GENERATION_MISSING_EVENT = DISPROVEN_BY_RECONSTRUCTION
O4G_CANONICAL_REQUEST_GENERATION_EMPTY_BODY = DISPROVEN_BY_RECONSTRUCTION
O4K_TRANSPORT_OBSERVABILITY_DEFECT = PROVEN
O4K_ACTUAL_OUTBOUND_REQUEST_BYTES_RETAINED_AT_EXECUTION_TIME = NO
O4K_ACTUAL_HTTP_STATUS_RETAINED_AT_EXECUTION_TIME = NO
O4K_EXACT_CAUSAL_MECHANISM_FOR_PENDING_REVIEW = NOT_PROVEN
```

O4-K used `gh api --input -` and converted every successful `gh` process exit to synthetic HTTP status `200`. It did not retain the exact outbound request bytes or actual HTTP status. Any more precise causal claim would be speculation and is forbidden.

## Bounded pending-review disposition

GitHub's official pull-request review API provides a dedicated delete operation for a review that has not been submitted. O4-L may use it only for the exact stray review above.

Before deletion, read-only preflight must prove:

```text
PR_NUMBER = 163
PR_STATE = OPEN
PR_HEAD = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
STRAY_REVIEW_ID = 5188963531
STRAY_REVIEW_STATE = PENDING
STRAY_REVIEW_AUTHOR = TheHalfMoon
STRAY_REVIEW_AUTHOR_ID = 285091250
STRAY_REVIEW_BODY = EMPTY
STRAY_REVIEW_COMMIT_ID = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
CANONICAL_PUBLICATION_MARKER_PRESENT = NO
```

If any field differs, deletion is denied and a fresh authorization is required. If all match, exactly one disposition request is authorized:

```text
DELETE /repos/TheHalfMoon/Kodac/pulls/163/reviews/5188963531
```

No other review may be deleted. Submitted reviews may not be deleted. After deletion, read-only verification must prove review `5188963531` is absent before any fresh publication POST. If the review is already absent, record `DISPOSITION_NOT_REQUIRED_ALREADY_ABSENT` and continue only after proving no exact Kodac publication marker exists.

## Exact recovery target binding

```text
REPOSITORY_FULL_NAME = TheHalfMoon/Kodac
REPOSITORY_ID = 1297407563
PULL_REQUEST_NUMBER = 163
PULL_REQUEST_ID = 4340591287
PULL_REQUEST_STATE = OPEN
PULL_REQUEST_HEAD = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
HEAD_REPOSITORY_FULL_NAME = TheHalfMoon/Kodac
HEAD_REPOSITORY_ID = 1297407563
EVENT = COMMENT
```

Target movement, closure, ambiguity, or a newly observed canonical publication marker denies the fresh write.

## Recovery transport amendment

O4-L may reuse canonical O4-I with one ephemeral proof-only `fetchImpl`. Authentication remains owned internally by the already-authenticated local `gh api` session. Token extraction remains forbidden.

For the single publication POST, the broker must:

1. receive the exact string body produced by canonical O4-G;
2. verify JSON parsing succeeds;
3. verify `event === "COMMENT"`;
4. verify `commit_id` equals the authorized PR head;
5. verify the review body is non-empty and contains exactly one Kodac publication-slot marker;
6. verify `comments` is an empty array for this deterministic empty-claims proof;
7. persist the exact non-secret UTF-8 request bytes under `/private/tmp` with mode `0600`;
8. record exact byte length and SHA-256;
9. invoke only `gh api --include --method POST <exact endpoint> --input <exact request file>` using argv and `shell=false`;
10. parse and retain the actual HTTP status line and bounded response body separately;
11. adapt that actual status/body into the `Response` consumed by O4-G;
12. retain the non-secret request bytes until evidence extraction completes.

The broker must not reconstruct, normalize, reorder, or semantically transform the request JSON.

## Required diagnostic evidence

```text
POST_REQUEST_UTF8_BYTES
POST_REQUEST_SHA256
POST_REQUEST_JSON_EVENT
POST_REQUEST_JSON_COMMIT_ID
POST_REQUEST_MARKER
GH_API_EXIT_CODE
ACTUAL_HTTP_STATUS
RESPONSE_CONTENT_TYPE
RESPONSE_UTF8_BYTES
RESPONSE_BODY_SHA256
RESPONSE_REVIEW_ID_IF_ANY
RESPONSE_REVIEW_NODE_ID_IF_ANY
RESPONSE_REVIEW_STATE_IF_ANY
RESPONSE_REVIEW_BODY_LENGTH_IF_ANY
RESPONSE_REVIEW_COMMIT_ID_IF_ANY
BROKER_GET_COUNT
BROKER_POST_COUNT
O4G_PUBLICATION_REQUEST_COUNT
```

No token, Authorization header, credential bytes, environment secret, keychain material, or CLI credential state may be retained.

## Exact fresh-write budget

```text
NEW_PUBLICATION_POST_BUDGET = 1
BLIND_RETRY = FORBIDDEN
SECOND_PUBLICATION_POST = FORBIDDEN
RUN_1_EXPECTED_POST_COUNT = 1
RUN_2_EXPECTED_POST_COUNT = 0
```

If the fresh POST outcome is ambiguous, only read-only recovery is permitted. No automatic second POST is authorized.

## Required successful behavior

Run 1 must establish:

```text
O4I_STATUS = COMPLETED_PUBLISHED
O4G_REVIEW_STATE = COMMENTED
BROKER_POST_COUNT = 1
CANONICAL_PUBLICATION_MARKER = PRESENT
REVIEW_COMMIT_ID = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
```

Run 2 must use identical bound input and establish:

```text
O4I_STATUS = COMPLETED_ALREADY_PRESENT
BROKER_POST_COUNT = 0
ADDITIONAL_REVIEW = NO
```

Both runs must agree on `reviewId`, `reviewNodeId`, and `reviewReceiptIdentity`. Independent read-only GitHub verification must prove the review is `COMMENTED`, bound to the authorized head, contains the exact marker, and has no duplicate exact publication.

## Deterministic proof binding

```text
PROVIDER_IDENTITY = kodac-o4j-live-proof-provider-v1
MODEL_IDENTITY = kodac-o4j-live-proof-deterministic-v1
PROVIDER_OUTPUT = {"claims":[]}
PROVIDER_NETWORK = NONE
repositoryId = 1297407563
repositoryFullName = TheHalfMoon/Kodac
pullRequestNumber = 163
pullRequestId = 4340591287
baseRepositoryId = 1297407563
headRepositoryId = 1297407563
headRepositoryFullName = TheHalfMoon/Kodac
expectedHeadSha = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
supportingPaths = []
taskId = o4l-live-publication-recovery-pr-163
policyIdentity = kodac-o4l-live-publication-recovery-v1
credentialPolicyIdentity = SHA-256(`kodac-o4k-gh-api-broker-capability-v1`)
credential = kodac-o4k-gh-api-broker-nonsecret-sentinel
```

No bound input may change between run 1 and run 2.

## Credential and subprocess boundary

```text
TOKEN_EXTRACTION = FORBIDDEN
GH_AUTH_TOKEN = FORBIDDEN
KEYCHAIN_ACCESS = FORBIDDEN
CREDENTIAL_FILE_ACCESS = FORBIDDEN
ENVIRONMENT_SECRET_READ = FORBIDDEN
AUTHENTICATION_OWNER = GH_API_INTERNAL_SESSION
SHELL = FALSE
GH_API_ONLY = REQUIRED
ARBITRARY_GH_SUBCOMMAND = FORBIDDEN
```

The harness may invoke `gh api` only for canonical O4-I/O4-G read routes, the exact pending-review DELETE above, and the single exact publication POST above.

## Re-audit requirement

The O4-K PENDING empty-review outcome is a material transport finding. O4-L evidence must explicitly preserve:

```text
CANONICAL_REQUEST_CONSTRUCTION = SYNTHETICALLY_PROVEN
LIVE_GH_API_AUTHENTICATION_BY_INTERNAL_CLI_SESSION = SUBJECT_TO_O4L_EVIDENCE
O4G_AUTHORIZATION_HEADER_BYTES_AUTHENTICATED_GITHUB = NOT_PROVEN_BY_O4K_OR_O4L
CALLER_INJECTED_SECRET_BYTES_ACCEPTED_BY_GITHUB = NOT_PROVEN_BY_O4K_OR_O4L
```

No project-wide criterion may be upgraded by hiding this distinction.

## Candidate qualification

Before merge this one-path candidate must prove:

```text
EXACT_CHANGED_PATHS = 1
FOUNDER_DECISION_RECORDED = YES
O4K_ADVERSE_OUTCOME_PRESERVED = YES
ROOT_CAUSE_OVERCLAIM = NO
PENDING_REVIEW_DISPOSITION_BOUNDED = YES
NEW_POST_BUDGET = 1
SECOND_POST = FORBIDDEN
SECRET_EXTRACTION = FORBIDDEN
ROOT_UV_SYNC_FROZEN_DEV = PASS
ROOT_PROVENANCE = PASS
ROOT_PYTEST = PASS
ROOT_RUFF = PASS
GIT_DIFF_CHECK = PASS
WORKTREE = CLEAN
SUBSTANTIVE_EXACT_HEAD_REVIEW = CLEAN
ORIGINAL_ATTEMPT_REQUIRED_CI = PASS
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
MORE_THAN_ONE_NEW_PUBLICATION_POST = FORBIDDEN
SECOND_PUBLICATION_POST = FORBIDDEN
BLIND_RETRY = FORBIDDEN
DELETE_ANY_REVIEW_OTHER_THAN_5188963531 = FORBIDDEN
DELETE_SUBMITTED_REVIEW = FORBIDDEN
SUBMIT_STRAY_PENDING_REVIEW_AS_CANONICAL = FORBIDDEN
APPROVE = FORBIDDEN
REQUEST_CHANGES = FORBIDDEN
MERGE_PR_163 = FORBIDDEN
LABEL_MUTATION = FORBIDDEN
ISSUE_STATE_MUTATION = FORBIDDEN
BRANCH_MUTATION = FORBIDDEN
RULESET_MUTATION = FORBIDDEN
REPOSITORY_ADMINISTRATION = FORBIDDEN
TOKEN_EXTRACTION = FORBIDDEN
SECRET_DISCLOSURE = FORBIDDEN
ARBITRARY_NETWORK = FORBIDDEN
ARBITRARY_CHILD_PROCESS = FORBIDDEN
NEW_PROVIDER_OR_MODEL_ADMISSION = NOT_AUTHORIZED
PERSISTENCE_DATABASE_QUEUE_SCHEDULER = NOT_AUTHORIZED
TELEMETRY_OR_GLITCHTIP = NOT_AUTHORIZED
K2_MUTATION = NOT_AUTHORIZED
O5_IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC_RELEASE = NOT_AUTHORIZED
PACKAGE_PUBLICATION = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PRODUCTION_READINESS_CLAIM = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

## After execution

A successful O4-L live proof does not directly rewrite current-view status. The O4-K adverse outcome, O4-L disposition evidence, O4-L request/response evidence, successful receipt if any, and the remaining credential-boundary limitation must be canonicalized through the next documentation-only evidence and reconciliation lifecycle required by live governance.

If O4-L fails, preserve the failure exactly. No additional publication POST is authorized without a new explicit founder decision and a new canonical authorization.
