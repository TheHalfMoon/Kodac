# Kodac O4-J Agent-Executed Live Publication Proof Authorization — 2026-09-13

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / BOUNDED LIVE PUBLICATION PROOF AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
CANONICAL_BASE = c00a96a330b1af7de7f67b7367927cc831a833dc
CANONICAL_BASE_TREE = c6c553c2f710ccccddab387f83433a2fa3fcc6a2
POST_O4I_RECONCILIATION = PR #620 / merge c00a96a330b1af7de7f67b7367927cc831a833dc / external proof on PR #620 / CLOSED_CANONICAL
CURRENT_BLOCKER = O4_LIVE_PUBLICATION_RECEIPT
FOUNDER_DECISION = EXPLICIT AGENT EXECUTION AUTHORIZATION / 2026-09-13
WAIVER = NO
PROJECT_COMPLETION = NOT_ESTABLISHED
```

This candidate records a new explicit founder decision. It does not itself execute a live write. No live proof may occur until this authorization independently qualifies, receives substantive exact-head review, merges through protected `main` with an expected-head guard, passes post-merge verification, and receives external proof.

## Exact authorization-candidate scope

This candidate may modify exactly:

```text
docs/planning/KODAC_O4J_AGENT_EXECUTED_LIVE_PUBLICATION_PROOF_AUTHORIZATION_2026-09-13.md
```

No second path may change.

## Governance reason

The canonical post-O4-I reconciliation establishes `O4_LIVE_PUBLICATION_RECEIPT` as the earliest remaining blocker. O4-I production wiring is merged and synthetically qualified, but no live GitHub write receipt exists. The predecessor O4-I authorization restricted the live-proof executor to the founder locally and prohibited agent credential handling.

On 2026-09-13 the founder explicitly authorized the agent to perform this bounded live proof. This record narrows and canonicalizes that new founder decision without expanding any other side-effect authority.

## Supersession boundary

Only the following predecessor restriction is superseded for this one proof:

```text
PREDECESSOR_LIVE_PROOF_EXECUTOR = founder local only
PREDECESSOR_AGENT_CREDENTIAL_HANDLING = not authorized
```

After this authorization becomes externally proven `CLOSED_CANONICAL`, the following replacement applies only to the O4-J proof described here:

```text
O4J_LIVE_PROOF_EXECUTOR = authorized agent
O4J_CREDENTIAL_CAPABILITY_USE = authorized through the exact ephemeral mechanism below
```

All other O4-I bounds and non-grants remain in force.

## Exact target binding

The proof is authorized only if live preflight still matches all of the following immediately before execution:

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

If any target identity moves, closes, or becomes ambiguous, the proof is denied and a fresh authorization is required before any write.

## Credential capability mechanism

The agent may use the founder's already-authorized local GitHub CLI authentication state only through this exact non-printing capability bridge:

```text
gh auth token -> ephemeral process file descriptor -> one local Node proof process
```

Required properties:

```text
TOKEN_STDOUT_TO_AGENT = FORBIDDEN
TOKEN_STDERR_TO_AGENT = FORBIDDEN
TOKEN_COMMAND_ARGUMENT = FORBIDDEN
TOKEN_ENVIRONMENT_VARIABLE = FORBIDDEN
TOKEN_FILE_PERSISTENCE = FORBIDDEN
TOKEN_REPOSITORY_PERSISTENCE = FORBIDDEN
TOKEN_LOGGING = FORBIDDEN
TOKEN_HASHING = FORBIDDEN
TOKEN_RECEIPT_SERIALIZATION = FORBIDDEN
TOKEN_ERROR_SERIALIZATION = FORBIDDEN
TOKEN_GITHUB_COMMENT_SERIALIZATION = FORBIDDEN
TOKEN_SCREEN_OUTPUT = FORBIDDEN
```

The proof process may read the credential once from inherited file descriptor `3`, strip one trailing newline, pass the resulting string only as the caller-injected O4-I `credential` capability, and discard the reference after both bounded runs finish.

`gh auth status` may be executed before the proof because it does not reveal the token. `gh auth token` may be invoked only as the producer side of the private file descriptor and must never be invoked as a standalone command whose output is returned to the agent.

No keychain inspection, Git credential-helper inspection, shell-history inspection, credential-file reading, or unrelated ambient secret discovery is authorized.

## Proof harness boundary

The agent may create one ephemeral untracked proof harness outside the repository, under `/private/tmp`, solely to call the already-canonical O4-I entrypoint. The harness must be deleted after evidence extraction.

It may import only canonical repository code and Node standard-library modules required to construct the caller input and format non-secret evidence.

The harness may define a deterministic proof-only `ModelProvider` implementation that returns the canonical empty-claims envelope:

```json
{"claims":[]}
```

This proof-only provider is not a production provider, is not a new provider/model admission, and proves only live transport/publication wiring, receipt identity, and idempotency. It may not make network calls or read secrets.

The proof model identity must be:

```text
kodac-o4j-live-proof-deterministic-v1
```

The proof provider identity must be reported as:

```text
kodac-o4j-live-proof-provider-v1
```

## Exact O4-I input binding

The proof must call `runO4iBoundedProductionPublication` from canonical `main` and bind:

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
taskId = o4j-live-publication-receipt-pr-163
objective = Prove bounded live COMMENT publication and idempotent recovery for the exact authorized PR head.
policyIdentity = kodac-o4j-live-publication-receipt-v1
instructions = Return evidence-grounded material defects only; for this transport proof return no claims.
model = kodac-o4j-live-proof-deterministic-v1
credentialPolicyIdentity = SHA-256 of the literal UTF-8 string `kodac-o4j-gh-cli-fd3-capability-v1`
```

No input field may be changed between run 1 and run 2.

## Production transport and POST counting

The O4-I call must use a thin `fetchImpl` wrapper around the Node process's real `globalThis.fetch`.

The wrapper may do only the following:

1. increment an in-memory counter when the outbound HTTP method is `POST`;
2. delegate the request unchanged to the captured real `globalThis.fetch`;
3. never inspect, print, persist, hash, or return the `Authorization` header or credential;
4. never modify URL, body, headers, redirect mode, timeout behavior, or response bytes.

No mock transport is authorized for the live proof.

## Required two-run behavior

The harness must execute two sequential O4-I calls using identical bound input and deterministic proof clock values.

Run 1 must prove:

```text
STATUS = COMPLETED_PUBLISHED
TRANSPORT_POST_COUNT = 1
TERMINAL_REVIEW_STATE = COMMENTED
```

Run 2 must prove:

```text
STATUS = COMPLETED_ALREADY_PRESENT
TRANSPORT_POST_COUNT = 0
ADDITIONAL_GITHUB_REVIEW_CREATED = NO
```

Both runs must return the same:

```text
reviewId
reviewNodeId
reviewReceiptIdentity
```

The second run must discover the exact publication by the canonical O4-F/O4-G marker and perform no publication POST.

If run 1 returns any other status, stop. Do not issue a second publication attempt under a modified input.

If run 1 has an ambiguous POST outcome, follow only the already-canonical O4-G read-only recovery behavior. No blind retry is authorized.

## Side-effect envelope

Authorized network mutation is exactly:

```text
MAXIMUM_LIVE_REVIEW_POSTS_ACROSS_THE_PROOF = 1
METHOD = POST
ROUTE = /repos/TheHalfMoon/Kodac/pulls/163/reviews
EVENT = COMMENT
COMMIT_ID = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
```

No other write is authorized by O4-J.

Explicitly forbidden:

```text
APPROVE = FORBIDDEN
REQUEST_CHANGES = FORBIDDEN
MERGE = FORBIDDEN
LABEL_MUTATION = FORBIDDEN
ISSUE_STATE_MUTATION = FORBIDDEN
BRANCH_MUTATION = FORBIDDEN
RULESET_MUTATION = FORBIDDEN
REPOSITORY_ADMINISTRATION = FORBIDDEN
ARBITRARY_GITHUB_WRITE = FORBIDDEN
SECOND_PUBLICATION_POST = FORBIDDEN
AUTOMATIC_POST_RETRY = FORBIDDEN
BACKGROUND_WRITE = FORBIDDEN
```

## Required non-secret evidence

The proof process may print and persist outside the repository only the following non-secret evidence:

```text
repository full name and repository id
PR number and PR id
reviewed head before and after
proof provider identity
model identity
policy identity
credential policy identity
timeout configuration
run 1 status
run 1 wiringExecutionIdentity
run 1 reviewId
run 1 reviewNodeId
run 1 reviewReceiptIdentity
run 1 transport POST count
run 1 O4-G publicationRequestCount
run 2 status
run 2 wiringExecutionIdentity
run 2 reviewId
run 2 reviewNodeId
run 2 reviewReceiptIdentity
run 2 transport POST count
run 2 O4-G publicationRequestCount
receipt equality result
composed terminal publication evidence excluding credentials
secret-hygiene confirmation
failure evidence if any, with secrets redacted by construction
```

The raw credential and raw request authorization header must never be recorded.

## Agent verification after execution

After the two runs, the agent must independently use read-only GitHub access to verify:

```text
PR #163 remains bound to the exact reviewed head
exact review object exists
review state is COMMENTED
review commit_id matches the exact reviewed head
review ID matches the O4-I result
review node ID matches where observable
canonical Kodac publication marker is present
inline comment IDs and anchors match if any exist
no duplicate exact Kodac review publication exists
```

Synthetic O4-I requalification at current canonical `main` must also remain green.

## Qualification of this authorization candidate

Before merge this one-path authorization candidate must prove:

```text
EXACT_CHANGED_PATHS = 1
ROOT_UV_SYNC_FROZEN_DEV = PASS
ROOT_PROVENANCE = PASS
ROOT_PYTEST = PASS
ROOT_RUFF = PASS
GIT_DIFF_CHECK = PASS
SECRET_LITERAL_SCAN = PASS
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

## After the proof

The O4-J proof itself creates no repository mutation authority beyond the one live COMMENT review. The resulting non-secret evidence must be canonicalized through a separate documentation-only authorization/evidence cycle if required by current governance, followed by project-wide reconciliation and a fresh 25-criterion re-audit.

No project criterion may be promoted merely because this authorization merges. Promotion requires the completed live proof plus its canonical evidence record.

## Explicit non-grants

```text
NEW_PROVIDER_OR_MODEL_ADMISSION = NOT_AUTHORIZED
PROVIDER_NETWORK_CALLS = NOT_AUTHORIZED
PERSISTENCE_DATABASE_QUEUE_SCHEDULER = NOT_AUTHORIZED
TELEMETRY_OR_GLITCHTIP = NOT_AUTHORIZED
K2_MUTATION = NOT_AUTHORIZED
O5_IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC_RELEASE = NOT_AUTHORIZED
PACKAGE_PUBLICATION = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PRODUCTION_READINESS_CLAIM = NOT_AUTHORIZED
BRAND_OR_LEGAL_CLAIM = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

## Founder decision record

The founder's 2026-09-13 decision is explicit: the agent is authorized to perform the bounded O4 live publication proof described in this record. The decision does not waive repository governance and becomes executable only after this record is externally proven `CLOSED_CANONICAL`.
