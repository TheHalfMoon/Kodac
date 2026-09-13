# Kodac O4-N Caller-Injected Credential-Path Generality Proof Authorization — 2026-09-13

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / BOUNDED CREDENTIAL-PATH GENERALITY PROOF AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
CANONICAL_BASE = 93eb44e08f61fb94a61f0737061b27be8156079e
CANONICAL_BASE_TREE = 9a8cb60d2fa4f3f183cdfedcab26a9d14b09c9c2
POST_O4M_RECONCILIATION_AUTHORIZATION = PR #626 / merge c4ba21ae24cf4a0ac078010dee6f6fe2816eed22 / proof 5650877230 / CLOSED_CANONICAL
POST_O4M_RECONCILIATION = PR #627 / merge 93eb44e08f61fb94a61f0737061b27be8156079e / proof 5651022654 / CLOSED_CANONICAL
POST_O4M_SUCCESSOR_ANALYSIS = PR #627 / comment 5651025521 / ANALYSIS_ONLY
CURRENT_AUDIT = PROVEN 10 / PARTIAL 13 / MISSING 0 / NOT_APPLICABLE 2 / TOTAL 25
CURRENT_MINIMUM_BLOCKER = O4_PRODUCTION_COMPLETENESS_WITH_CREDENTIAL_GENERALITY
FOUNDER_DECISION_1 = APPROVED 2026-09-13 / BOUNDED CREDENTIAL-PATH GENERALITY PROCEDURE ONLY
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This candidate records the founder's explicit bounded decision for the earliest remaining
dependency and authorizes no live write while this candidate is open. Every live operation
described below is denied until this authorization independently qualifies at its exact head,
receives substantive exact-head review with zero material findings, merges through protected
`main` with an expected-head guard, passes original-attempt post-merge checks, and receives
external `CLOSED_CANONICAL` proof. A later separate evidence candidate must canonicalize any
live outcome. This message alone authorizes no live publication.

## Exact candidate scope

This candidate may modify exactly:

```text
docs/planning/KODAC_O4N_CALLER_INJECTED_CREDENTIAL_PATH_GENERALITY_PROOF_AUTHORIZATION_2026-09-13.md
```

No second repository path may change.

## Governance reason

Root `AGENTS.md` requires `LIVE GITHUB TRUTH -> AGENTS.md -> NEXT.md -> EXACT ACTIVE
AUTHORIZATION` before any bounded implementation. Live truth at `CANONICAL_BASE` establishes:

```text
POST_O4M_RECONCILIATION = CLOSED_CANONICAL
AUTHORIZED_UNEXECUTED_WORK = NONE
SUCCESSOR_IMPLEMENTATION = NOT_AUTHORIZED_BY_SUCCESSOR_ANALYSIS
MINIMUM_BLOCKER = O4_PRODUCTION_COMPLETENESS_WITH_CREDENTIAL_GENERALITY
O4_RECEIPT = CLOSED_BOUNDED for exact PR 163 head through already-authenticated gh api session
O4_REMAINDER = credential-general live write authority NOT_PROVEN plus multi-head authority plus admission plus release
```

The successor analysis explicitly requires a founder product/authority decision before any
forward path and grants no implementation authority. The founder has now approved, in
Decision 1 dated 2026-09-13, the next bounded canonical procedure required to prove O4
production credential-path generality, with the objective of closing the exact remaining
credential-generality gap and not creating arbitrary credential access. The minimum
governance-valid next unit is therefore this bounded proof authorization, not implementation,
not evidence, not reconciliation, not persistence, not skill runtime, not sandbox, not
provider/model admission, and not release.

## Founder grant record (Decision 1, bounded)

On 2026-09-13 the founder, as decision owner, approved the credential pathway with these
binding constraints, recorded here without expansion:

```text
OBJECTIVE = close the exact remaining credential-generality gap, not arbitrary credential access
PATH = canonical O4-G / O4-I production publication path where applicable
CRITERION = prove a real caller-injected credential pathway accepted by GitHub
EVENT = COMMENT only
BINDING = exact founder-controlled repository / PR / reviewed head
SCOPE = minimum GitHub permission scope
FAIL_CLOSED = YES
IDEMPOTENCY = PROVEN (second run zero additional POSTs)
BLIND_POST_RETRY = FORBIDDEN
DUPLICATE_PUBLICATION = FORBIDDEN
RECEIPT_IDENTITY = PRESERVED EXACT
TRANSPORT_EVIDENCE = PRESERVED EXACT
ADVERSE_ATTEMPTS = PRESERVED ALL
```

Agent prohibitions from the grant, binding on every later candidate:

```text
ASK_FOUNDER_TO_PASTE_TOKEN_INTO_CHAT = FORBIDDEN
PRINT_CREDENTIAL = FORBIDDEN
LOG_CREDENTIAL = FORBIDDEN
COMMIT_CREDENTIAL = FORBIDDEN
SERIALIZE_CREDENTIAL = FORBIDDEN
HASH_CREDENTIAL_BYTES = FORBIDDEN
INSPECT_SHELL_HISTORY_FOR_CREDENTIALS = FORBIDDEN
INSPECT_KEYCHAIN_CONTENTS = FORBIDDEN
INSPECT_UNRELATED_CREDENTIAL_STORES = FORBIDDEN
BROADEN_CREDENTIAL_INTO_ARBITRARY_GITHUB_AUTHORITY = FORBIDDEN
REINTERPRET_O4L_GH_API_PROOF_AS_CALLER_INJECTED_SECRET_PROOF = FORBIDDEN
```

Secret-locality rule from the grant:

```text
REAL_CREDENTIAL_REMAINS_FOUNDER_LOCAL_WHERE_GOVERNANCE_REQUIRES = YES
AGENT_PREPARES_SMALLEST_FOUNDER_SIDE_COMMAND_OR_HARNESS = YES
SECRET_REMAINS_OPAQUE_TO_AGENT = YES
EVERYTHING_EXCEPT_UNAVOIDABLE_SECRET_BEARING_OPERATION_REMAINS_AGENT_EXECUTABLE = YES
FOUNDER_INTERVENTION_REDUCED_TO_MINIMUM_EXACT_COMMAND = YES
```

Preserved limitations until new direct evidence proves otherwise:

```text
O4G_AUTHORIZATION_HEADER_BYTES_AUTHENTICATED_GITHUB = NOT_PROVEN_BY_O4L
CALLER_INJECTED_SECRET_BYTES_ACCEPTED_BY_GITHUB = NOT_PROVEN_BY_O4L
```

Founder Decisions 2 and 3 and the release decision from the same message are recorded as
separate product tracks. They grant no authority to this O4-N unit and this O4-N unit grants
no authority to them.

## Purpose

O4-N proves, for one new deterministic publication slot on the exact bound target, that the
already-canonical O4-G request construction plus O4-I production wiring authenticates GitHub
through the caller-injected `Authorization: Bearer <credential>` header bytes produced at the
final request boundary, using production `fetch` and a real founder-held credential with
minimum scope. It preserves the O4-L bounded receipt for the prior slot without relabeling it
and without reusing the `gh api` internal session as the authentication mechanism.

If successful, O4-N may establish only:

```text
O4G_AUTHORIZATION_HEADER_BYTES_AUTHENTICATED_GITHUB = PROVEN_BOUNDED_FOR_O4N_SLOT
CALLER_INJECTED_SECRET_BYTES_ACCEPTED_BY_GITHUB = PROVEN_BOUNDED_FOR_O4N_SLOT
O4N_LIVE_COMMENT_PUBLICATION_FOR_NEW_SLOT = PROVEN_BOUNDED
O4N_IDEMPOTENT_ALREADY_PRESENT_RECOVERY_FOR_NEW_SLOT = PROVEN_BOUNDED
SECRET_NOT_HANDLED_BY_AGENT = PROVEN
```

If the live outcome is adverse or ambiguous, the evidence candidate must preserve it exactly
and must not upgrade any criterion.

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

Any target movement, closure, ambiguity, or head change denies the proof before any live POST.
The prior O4-L receipt remains bound:

```text
PRIOR_SLOT_REVIEW_ID = 5189105929
PRIOR_SLOT_STATE = COMMENTED
PRIOR_SLOT_COMMIT = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
```

The O4-N procedure must not delete, submit, approve, request changes, merge, label, or
otherwise mutate PR 163 or review 5189105929. The only permitted mutation is the single new
COMMENT review POST described below plus read-only GETs.

## Minimum credential scope

The founder-held credential must be a GitHub fine-grained personal access token with the
minimum scope required for the exact bound target and nothing more:

```text
CONTENTS = Read-only (bounded pull-request files reads for anchor preflight where applicable)
PULL_REQUESTS = Read and write (bounded review reads plus exactly one COMMENT review creation)
METADATA = Read-only (implicit)
ADMINISTRATION = NO
WORKFLOWS = NO
PACKAGES = NO
SECRETS = NO
VARIABLES = NO
ENVIRONMENTS = NO
ISSUES = NO (no issue-state mutation authorized)
```

A classic token with broader scope must not be used where a fine-grained token satisfies the
bound. The token must expire or be revoked after evidence extraction completes, per founder
handling outside the repository.

## Deterministic proof binding (new slot)

The harness must call the canonical `runO4iBoundedProductionPublication` from the live
canonical `main` checkout and bind exactly:

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
taskId = o4n-caller-injected-credential-generality-pr-163
objective = Prove bounded live COMMENT publication and idempotent recovery for the exact authorized PR head through caller-injected Authorization header bytes.
policyIdentity = kodac-o4n-caller-injected-credential-generality-v1
instructions = Return evidence-grounded material defects only; for this transport proof return no claims.
provider = deterministic proof-only provider defined below
model = kodac-o4n-caller-injected-credential-proof-deterministic-v1
credentialPolicyIdentity = 397d2c78ff08322d7d27bf3afc1940af1075360916405244e5926df37a64f30d
credential = founder-held fine-grained PAT described above (real secret, founder-local only)
```

The `credentialPolicyIdentity` above is SHA-256 over the literal UTF-8 string
`kodac-o4n-caller-injected-credential-capability-v1`. That label is not secret material. The
credential value itself must never appear in any repository file, log, hash preimage, error,
receipt, comment, or evidence record.

Required proof-only deterministic provider (temporary proof infrastructure, not a
provider/model admission):

```text
PROVIDER_IDENTITY = kodac-o4n-caller-injected-credential-proof-provider-v1
MODEL_IDENTITY = kodac-o4n-caller-injected-credential-proof-deterministic-v1
PROVIDER_OUTPUT = {"claims":[]}
PROVIDER_NETWORK = NONE
```

No bound input may change between run 1 and run 2. No other provider, model, task, policy,
or credential-policy identity is authorized for this proof.

## Production transport requirement

The secret-bearing runs must use production `fetch` as the O4-I `fetchImpl` (by omitting the
optional override so the wiring resolves to the production global fetch reference). The
`gh api` broker path used by O4-K and O4-L is forbidden for the secret-bearing runs because
it would bypass the `Authorization` header under test.

```text
FETCH_IMPL_FOR_SECRET_RUNS = PRODUCTION_GLOBAL_FETCH_ONLY
GH_API_BROKER_FOR_SECRET_RUNS = FORBIDDEN
SYNTHETIC_FETCH_FOR_SECRET_RUNS = FORBIDDEN
ARBITRARY_FETCH_WRAPPER = FORBIDDEN
```

The O4-G `headers()` construction (`Accept`, `Authorization: Bearer <credential>`,
`X-GitHub-Api-Version: 2026-03-10`, `User-Agent: Kodac-O4G/1`) is the unit under test. The
harness must not strip, replace, or supplement the `Authorization` header and must not pass
the credential through any other channel.

## Exact fresh-write budget

```text
NEW_PUBLICATION_POST_BUDGET = 1
BLIND_RETRY = FORBIDDEN
SECOND_PUBLICATION_POST = FORBIDDEN
RUN_1_EXPECTED_POST_COUNT = 1
RUN_2_EXPECTED_POST_COUNT = 0
```

Run 1 must establish `COMPLETED_PUBLISHED` with one POST for the new slot. Run 2 must use
identical bound input and establish `COMPLETED_ALREADY_PRESENT` with zero additional POSTs.
Both runs must agree on `reviewId`, `reviewNodeId`, and `reviewReceiptIdentity` for the new
slot. If run 1 does not return `COMPLETED_PUBLISHED`, run 2 must not attempt a modified
publication. If any POST outcome is ambiguous, only read-only recovery scans are permitted.
No automatic second POST is authorized.

## Required successful behavior

Run 1 must establish:

```text
O4I_STATUS = COMPLETED_PUBLISHED
O4G_REVIEW_STATE = COMMENTED
BROKER_POST_COUNT = 1
NEW_SLOT_MARKER = PRESENT exactly once in the new review body
REVIEW_COMMIT_ID = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
```

Run 2 must establish:

```text
O4I_STATUS = COMPLETED_ALREADY_PRESENT
BROKER_POST_COUNT = 0
ADDITIONAL_REVIEW = NO
```

Independent read-only GitHub verification must prove for the new slot that the review is
`COMMENTED`, bound to the authorized head, contains the exact new marker exactly once, and
has no duplicate exact publication for that slot. It must also prove the prior slot review
5189105929 remains `COMMENTED` with its marker and that no stray review was created.

## Required diagnostic evidence (non-secret only)

```text
POST_REQUEST_UTF8_BYTES (body bytes only, never headers)
POST_REQUEST_SHA256 (body bytes only, never headers)
POST_REQUEST_JSON_EVENT
POST_REQUEST_JSON_COMMIT_ID
POST_REQUEST_MARKER (new slot marker)
AUTHORIZATION_HEADER_PRESENT = YES (boolean only, no value, no length, no hash)
ACTUAL_HTTP_STATUS (from production fetch Response.status, not synthetic)
RESPONSE_CONTENT_TYPE
RESPONSE_UTF8_BYTES
RESPONSE_BODY_SHA256
RESPONSE_REVIEW_ID_IF_ANY
RESPONSE_REVIEW_NODE_ID_IF_ANY
RESPONSE_REVIEW_STATE_IF_ANY
RESPONSE_REVIEW_BODY_LENGTH_IF_ANY
RESPONSE_REVIEW_COMMIT_ID_IF_ANY
RUN_1_BROKER_GET_COUNT
RUN_1_BROKER_POST_COUNT
RUN_1_O4G_PUBLICATION_REQUEST_COUNT
RUN_1_WIRING_EXECUTION_IDENTITY
RUN_1_PUBLICATION_EXECUTION_IDENTITY
RUN_2_BROKER_GET_COUNT
RUN_2_BROKER_POST_COUNT
RUN_2_O4G_PUBLICATION_REQUEST_COUNT
RUN_2_WIRING_EXECUTION_IDENTITY
RECEIPT_MATCH_FIRST_SECOND
GLOBAL_POST_COUNT
SECOND_RUN_ADDITIONAL_POST
DUPLICATE_EXACT_PUBLICATION_FOR_NEW_SLOT
PRIOR_SLOT_RECEIPT_PRESERVED
```

No token, `Authorization` header value, credential bytes, environment secret, keychain
material, CLI credential state, shell history, or hash whose input includes secret bytes may
be retained. Request/response body hashes cover body bytes only.

## Credential and subprocess boundary

```text
TOKEN_EXTRACTION_BY_AGENT = FORBIDDEN
AGENT_HANDLES_PAT = FORBIDDEN
AGENT_READS_PAT_FILE = FORBIDDEN
AGENT_LOGS_PAT = FORBIDDEN
GH_AUTH_TOKEN_BY_AGENT = FORBIDDEN
KEYCHAIN_ACCESS_BY_AGENT = FORBIDDEN
CREDENTIAL_FILE_ACCESS_BY_AGENT = FORBIDDEN
ENVIRONMENT_SECRET_READ_BY_AGENT = FORBIDDEN
SHELL_HISTORY_INSPECTION = FORBIDDEN
AUTHENTICATION_OWNER_FOR_SECRET_RUNS = FOUNDER_LOCAL_PRODUCTION_FETCH
AGENT_VERIFICATION_TRANSPORT = READ_ONLY_GH_API_GETS_ONLY PLUS SYNTHETIC_REQUALIFICATION
SHELL = FALSE for any agent-executed harness step
ARBITRARY_GH_SUBCOMMAND_BY_AGENT_FOR_WRITES = FORBIDDEN
AGENT_LIVE_POST = FORBIDDEN
```

The founder-local secret-bearing harness may invoke only the canonical O4-I entrypoint with
production fetch for the exact bound target. It must persist exact non-secret request body
bytes under a founder-local temporary path with mode `0600`, record exact byte length and
SHA-256 of the body only, parse and retain the actual HTTP status line and bounded response
body separately, and retain no secret material after evidence extraction. The harness source
itself must contain no credential and must not be committed to the repository unless a later
canonical authorization explicitly permits a redacted harness path.

## Agent-executable versus founder-local split

```text
AGENT_EXECUTABLE = this authorization candidate plus later redacted evidence canonicalization plus synthetic requalification plus read-only live verification plus reconciliation drafting
FOUNDER_LOCAL_ONLY = the two secret-bearing O4-I runs plus PAT file creation plus PAT revocation or expiry plus handing back only the non-secret evidence block
FOUNDER_COMMAND_MUST_BE_MINIMUM_EXACT = YES (single copy-pasteable command sequence prepared by the agent, with the PAT filename as the only founder-supplied variable)
AGENT_CONTINUES_AUTOMATICALLY_ONCE_NON_SECRET_EVIDENCE_AVAILABLE = YES
```

The agent must prepare the exact smallest founder-side command so the secret remains opaque
to the agent. The founder pastes no token into chat at any point.

## Re-audit requirement

The later evidence candidate must explicitly preserve:

```text
O4K_ADVERSE_OUTCOME_PRESERVED = YES
O4L_BOUNDED_RECEIPT_PRESERVED = YES (review 5189105929, prior slot, marker count 1 for that slot)
O4G_AUTHORIZATION_HEADER_BYTES_AUTHENTICATED_GITHUB = PROVEN_BOUNDED_FOR_O4N_SLOT_ONLY_IF_DIRECT_EVIDENCE
CALLER_INJECTED_SECRET_BYTES_ACCEPTED_BY_GITHUB = PROVEN_BOUNDED_FOR_O4N_SLOT_ONLY_IF_DIRECT_EVIDENCE
PRIOR_NOT_PROVEN_FLAGS_NOT_REINTERPRETED = YES
```

No project-wide criterion may be upgraded by hiding the new-slot boundary. Multi-head
production authority, new provider/model admission, persistence, skill execution, sandbox,
telemetry, release, deployment, and project completion remain unproven by this unit.

## Candidate qualification

Before merge this one-path candidate must prove:

```text
EXACT_CHANGED_PATHS = 1
FOUNDER_DECISION_RECORDED = YES
O4K_O4L_ADVERSE_AND_BOUNDED_HISTORY_PRESERVED = YES
ROOT_CAUSE_OVERCLAIM = NO
NEW_POST_BUDGET = 1
SECOND_POST = FORBIDDEN
SECRET_HANDLING_BY_AGENT = FORBIDDEN
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

TypeScript, focused O4-G/O4-I, full runtime, patch benchmark, and provenance checks follow the
canonical validation recipe used for prior O4 authorizations. Tests must use injected fake
transport and synthetic credentials only. No live GitHub write credential is required or
authorized for qualification evidence of this authorization candidate itself.

## Explicit non-grants

```text
MORE_THAN_ONE_NEW_PUBLICATION_POST = FORBIDDEN
SECOND_PUBLICATION_POST = FORBIDDEN
BLIND_RETRY = FORBIDDEN
DELETE_ANY_REVIEW = FORBIDDEN
SUBMIT_ANY_PENDING_REVIEW = FORBIDDEN
APPROVE = FORBIDDEN
REQUEST_CHANGES = FORBIDDEN
MERGE_PR_163 = FORBIDDEN
LABEL_MUTATION = FORBIDDEN
ISSUE_STATE_MUTATION = FORBIDDEN
BRANCH_MUTATION = FORBIDDEN
RULESET_MUTATION = FORBIDDEN
REPOSITORY_ADMINISTRATION = FORBIDDEN
TOKEN_HANDLING_BY_AGENT = FORBIDDEN
AMBIENT_CREDENTIAL_DISCOVERY = NOT_AUTHORIZED
SHELL_OR_GH_CLI_WRITE_AUTHORITY_FOR_AGENT = NOT_AUTHORIZED
NEW_PROVIDER_OR_MODEL_ADMISSION = NOT_AUTHORIZED
PROOF_ONLY_PROVIDER_IS_NOT_ADMISSION = YES
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

A successful O4-N live proof does not directly rewrite current-view status. The O4-K adverse
outcome, O4-L bounded receipt, O4-N disposition evidence, O4-N request/response evidence,
successful receipt if any, and the remaining multi-head/admission/release boundary must be
canonicalized through the next documentation-only evidence and reconciliation lifecycle
required by live governance.

If O4-N fails, preserve the failure exactly. No additional publication POST is authorized
without a new explicit founder decision and a new canonical authorization.

(End of file - total lines as committed.)
