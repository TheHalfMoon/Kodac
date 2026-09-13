# Kodac O4-K gh-api-Brokered Live Publication Proof Authorization — 2026-09-13

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / BOUNDED LIVE PUBLICATION PROOF TRANSPORT AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
CANONICAL_BASE = 3449a51d90f7a2561e91e284411981325cf45ba4
CANONICAL_BASE_TREE = 421a28c9183a5fa6c9ac7c4540f488c8d2cd6318
O4J_AUTHORIZATION = PR #621 / merge 3449a51d90f7a2561e91e284411981325cf45ba4 / proof 5649935879 / CLOSED_CANONICAL
O4J_LIVE_PROOF_ATTEMPT = BLOCKED_BEFORE_PROCESS_START / TOOL_SAFETY_DENIED_SECRET_EXTRACTION / ZERO_LIVE_WRITES
CURRENT_BLOCKER = O4_LIVE_PUBLICATION_RECEIPT
FOUNDER_DECISION = AGENT MAY COMPLETE THE BOUNDED LIVE PROOF WITHOUT SECRET EXTRACTION
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This candidate exists because the O4-J authorized `gh auth token -> fd3` capability bridge was blocked by the execution platform before the Node proof process started. No GitHub POST occurred and no credential was exposed. The project must preserve that failed attempt honestly rather than bypassing the platform's secret-access control.

## Exact candidate scope

This authorization candidate may modify exactly:

```text
docs/planning/KODAC_O4K_GH_API_BROKERED_LIVE_PUBLICATION_PROOF_AUTHORIZATION_2026-09-13.md
```

No second path may change.

## Purpose

O4-K authorizes one alternative credential-preserving live-proof transport for the already-canonical O4-I entrypoint. It permits an ephemeral proof harness to inject a `fetchImpl` that delegates the exact O4-I/O4-H/O4-G GitHub requests to the already-authenticated local `gh api` client.

The GitHub CLI owns authentication internally. The agent never requests, extracts, reads, prints, stores, hashes, serializes, or forwards a token.

The O4-I runtime remains the authority that determines request order, target URLs, methods, bodies, exact-head checks, duplicate detection, one-POST maximum, and idempotent second-run recovery.

## Supersession boundary

For this proof only, O4-K supersedes the O4-J requirement that authentication be supplied to O4-I through the extracted credential bytes.

The replacement is:

```text
AUTHENTICATION_CAPABILITY = pre-existing authenticated `gh api` session
O4I_CREDENTIAL_FIELD = fixed non-secret sentinel required by the existing O4-I input shape
O4I_FETCH_IMPL = bounded gh-api broker defined below
TOKEN_EXTRACTION = FORBIDDEN
```

This does not alter O4-I source, O4-G source, any repository runtime contract, or any production credential policy. It is a proof harness boundary only.

## What this proof establishes

If successful, O4-K may establish only:

```text
LIVE_GITHUB_COMMENT_REVIEW_CREATED_BY_CANONICAL_O4_PIPELINE = YES
EXACT_PR_AND_HEAD_BINDING = PROVEN
O4I_TO_O4G_LIVE_REQUEST_SEQUENCE = PROVEN
O4G_ONE_POST_MAXIMUM = PROVEN
SECOND_RUN_ALREADY_PRESENT_WITH_ZERO_ADDITIONAL_POSTS = PROVEN
LIVE_REVIEW_AND_RECEIPT_IDS = PROVEN
LIVE_PUBLICATION_MARKER = PROVEN
SECRET_NOT_EXTRACTED_BY_AGENT = PROVEN
```

## What this proof does not establish

Because `gh api` performs authentication outside the Fetch `Authorization` header created by O4-G, O4-K must not claim:

```text
O4G_AUTHORIZATION_HEADER_BYTES_AUTHENTICATED_GITHUB = NOT_PROVEN_BY_THIS_LIVE_RUN
CALLER_INJECTED_SECRET_BYTES_ACCEPTED_BY_GITHUB = NOT_PROVEN_BY_THIS_LIVE_RUN
```

Those behaviors remain covered only by the existing canonical synthetic transport, secret-hygiene, and request-construction qualification evidence. The later project-wide re-audit must decide whether this distinction leaves any criterion partial.

## Exact target binding

The live proof is authorized only if all values remain exact immediately before execution:

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

Any target movement or closure denies the proof before the first live POST.

## Non-secret O4-I credential sentinel

The proof harness must pass this exact non-secret string as O4-I's `credential` field:

```text
kodac-o4k-gh-api-broker-nonsecret-sentinel
```

The credential policy identity must be SHA-256 over the literal UTF-8 string:

```text
kodac-o4k-gh-api-broker-capability-v1
```

The sentinel is not authentication material. The harness must never represent it as a real credential or claim that GitHub accepted it.

## gh-api broker authority

The ephemeral proof harness may use Node `child_process.spawn` or `spawnSync` with `shell = false` only to invoke the `gh` executable for `gh api` requests produced by O4-I.

No other subprocess command is authorized.

The broker must reject before process creation unless the requested URL has:

```text
ORIGIN = https://api.github.com
OWNER = TheHalfMoon
REPOSITORY = Kodac
PULL_REQUEST_NUMBER = 163
```

Allowed methods and routes are exactly the read/write surface already used by O4-B and O4-G for this PR:

```text
GET /repos/TheHalfMoon/Kodac/pulls/163
GET /repos/TheHalfMoon/Kodac/pulls/163/files
GET /repos/TheHalfMoon/Kodac/contents/{path}
GET /repos/TheHalfMoon/Kodac/pulls/163/reviews
GET /repos/TheHalfMoon/Kodac/pulls/163/comments
POST /repos/TheHalfMoon/Kodac/pulls/163/reviews
```

No other route or method may reach `gh api`.

## gh-api invocation rules

Every broker invocation must use an argv array, not a shell command string.

Required constraints:

```text
SHELL = false
GH_AUTH_TOKEN_COMMAND = FORBIDDEN
GH_AUTH_STATUS_TOKEN_OUTPUT = FORBIDDEN
ENVIRONMENT_SECRET_READ = FORBIDDEN
ARBITRARY_GH_SUBCOMMAND = FORBIDDEN
GH_API_ONLY = REQUIRED
```

For GET requests the broker may call conceptually:

```text
gh api <relative endpoint with query>
```

For the one authorized POST it may call conceptually:

```text
gh api --method POST <relative endpoint> --input -
```

The POST JSON bytes must be passed through stdin exactly from the O4-G request body. The broker must not reconstruct, reinterpret, add, remove, or reorder request fields.

The broker must not pass the synthetic O4-I `Authorization` header to `gh`; `gh` performs its own internal authentication.

Other non-secret request headers required for API semantics may be forwarded using `-H` only if they originated from O4-I/O4-G. No header value may be logged.

## Response adapter

The broker may construct a standards-compatible `Response` object from `gh api` output solely so O4-B/O4-G can consume the live GitHub response through their existing fetch interfaces.

For successful requests it must preserve the exact UTF-8 JSON body returned by `gh api`.

The adapter must set:

```text
response.url = exact requested https://api.github.com URL
response.status = actual HTTP status when observable; otherwise the method-specific successful status documented by the GitHub endpoint
content-type = application/json
```

If `gh api` exits nonzero, the broker must fail closed. It must not issue a retry automatically.

The broker is not authorized to reinterpret an error as success.

## POST counting

The harness must count broker calls by HTTP method before invocation.

Across both proof runs:

```text
MAXIMUM_POST_CALLS = 1
RUN_1_EXPECTED_POST_COUNT = 1
RUN_2_EXPECTED_POST_COUNT = 0
```

If a second POST is requested by O4-I/O4-G, the broker must reject it before invoking `gh`.

## Required proof provider

The proof-only deterministic provider remains:

```text
PROVIDER_IDENTITY = kodac-o4j-live-proof-provider-v1
MODEL_IDENTITY = kodac-o4j-live-proof-deterministic-v1
PROVIDER_OUTPUT = {"claims":[]}
PROVIDER_NETWORK = NONE
```

This provider is temporary proof infrastructure only and is not a provider/model admission.

## Exact O4-I binding

The harness must call the canonical `runO4iBoundedProductionPublication` from the live canonical `main` checkout and bind:

```text
repositoryId = 1297407563
repositoryFullName = TheHalfMoon/Kodac
pullRequestNumber = 163
pullRequestId = 4340591287
baseRepositoryId = 1297407563
headRepositoryId = 1297407563
headRepositoryFullName = TheHalfMoon/Kodac
expectedHeadSha = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
supportingPaths = []
taskId = o4k-gh-api-live-publication-receipt-pr-163
objective = Prove bounded live COMMENT publication and idempotent recovery for the exact authorized PR head without extracting authentication secrets.
policyIdentity = kodac-o4k-gh-api-live-publication-receipt-v1
instructions = Return evidence-grounded material defects only; for this transport proof return no claims.
provider = deterministic proof-only provider defined above
model = kodac-o4j-live-proof-deterministic-v1
credentialPolicyIdentity = SHA-256(`kodac-o4k-gh-api-broker-capability-v1`)
credential = kodac-o4k-gh-api-broker-nonsecret-sentinel
```

No bound input may change between run 1 and run 2.

## Required live behavior

Run 1 must return:

```text
O4I_STATUS = COMPLETED_PUBLISHED
BROKER_POST_COUNT = 1
O4G_REVIEW_STATE = COMMENTED
```

Run 2 must return:

```text
O4I_STATUS = COMPLETED_ALREADY_PRESENT
BROKER_POST_COUNT = 0
ADDITIONAL_REVIEW = NO
```

Both runs must agree on:

```text
reviewId
reviewNodeId
reviewReceiptIdentity
```

If run 1 does not return `COMPLETED_PUBLISHED`, run 2 must not attempt a modified publication.

If the POST outcome is ambiguous, only the already-canonical O4-G read-only recovery flow may continue. No blind POST retry is authorized.

## Independent read-only verification

After the local harness completes, the agent must independently verify through the GitHub connector:

```text
PR #163 is still open at the authorized head
review exists
review state = COMMENTED
review commit_id = authorized head
review ID = recorded reviewId
review node ID = recorded reviewNodeId where exposed
publication marker exists
inline comment receipts match if any exist
no duplicate exact publication exists
```

## Required evidence

Non-secret evidence must include:

```text
canonical main used for proof
O4-K authorization merge/proof identity
target repository/PR/ids/head
provider/model/policy identities
credential policy identity
explicit statement that O4-I credential was a non-secret sentinel
explicit statement that authentication was owned internally by gh api
run 1 O4-I status
run 1 wiringExecutionIdentity
run 1 reviewId/reviewNodeId/reviewReceiptIdentity
run 1 broker GET/POST counts
run 1 O4-G publicationRequestCount
run 2 O4-I status
run 2 wiringExecutionIdentity
run 2 reviewId/reviewNodeId/reviewReceiptIdentity
run 2 broker GET/POST counts
run 2 O4-G publicationRequestCount
receipt equality
independent GitHub read-back verification
no duplicate exact publication
O4-J secret-extraction attempt = blocked before process start / zero writes
```

## Qualification of this authorization candidate

Before merge this one-path authorization candidate must prove:

```text
EXACT_CHANGED_PATHS = 1
SEMANTIC_NON_GRANT_SCAN = PASS
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
POST_MERGE_TREE_PARENT_BLOB_SIGNATURE_CHECK = REQUIRED
POST_MERGE_REQUIRED_CHECKS = PASS
EXTERNAL_CLOSED_CANONICAL_PROOF = REQUIRED
```

## Explicit non-grants

```text
TOKEN_EXTRACTION = FORBIDDEN
GH_AUTH_TOKEN = FORBIDDEN
KEYCHAIN_ACCESS = FORBIDDEN
CREDENTIAL_FILE_ACCESS = FORBIDDEN
SHELL = FORBIDDEN
ARBITRARY_CHILD_PROCESS = FORBIDDEN
ARBITRARY_GH_COMMAND = FORBIDDEN
MORE_THAN_ONE_POST = FORBIDDEN
SECOND_PUBLICATION_POST = FORBIDDEN
APPROVE = FORBIDDEN
REQUEST_CHANGES = FORBIDDEN
MERGE = FORBIDDEN
LABEL_MUTATION = FORBIDDEN
ISSUE_STATE_MUTATION = FORBIDDEN
BRANCH_MUTATION = FORBIDDEN
RULESET_MUTATION = FORBIDDEN
REPOSITORY_ADMINISTRATION = FORBIDDEN
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

A successful O4-K proof does not directly mutate current-view status. The live receipt must be canonicalized through the next documentation-only evidence/reconciliation sequence required by live governance. The project-wide audit must explicitly preserve the limitation that actual O4-G Authorization-header credential bytes were not the mechanism used by this proof.
