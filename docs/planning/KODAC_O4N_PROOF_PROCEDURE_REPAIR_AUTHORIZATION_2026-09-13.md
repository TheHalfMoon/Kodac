# Kodac O4-N Proof Procedure Repair Authorization — 2026-09-13

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / BOUNDED O4-N PROCEDURE REPAIR ONLY
DECISION_OWNER = KODAC FOUNDER
CANONICAL_BASE = 62d53e6e2848f8bbd7379e8fef82299c411a5c34
CANONICAL_BASE_TREE = c2aae01f151764a31da2cad4f89b2d6390da3be3
O4N_AUTHORIZATION = PR #628 / merge 62d53e6e2848f8bbd7379e8fef82299c411a5c34 / proof 5651366430 / CLOSED_CANONICAL
O4N_QUALIFIED_HEAD = 692c1a25309e5426ed58c2ed7cc9e5dfdfd46c70
O4N_QUALIFIED_TREE = c2aae01f151764a31da2cad4f89b2d6390da3be3
O4N_AUTHORIZATION_BLOB = a2c25e422a6b827fdaa1ddcdbe65dd0931847a79
O4N_AUTHORIZATION_PATH = docs/planning/KODAC_O4N_CALLER_INJECTED_CREDENTIAL_PATH_GENERALITY_PROOF_AUTHORIZATION_2026-09-13.md
POST_MERGE_PROCEDURE_FINDING = PR #628 / comment 5651404487 / ANALYSIS_ONLY
POST_MERGE_FINDING_HEAD = 62d53e6e2848f8bbd7379e8fef82299c411a5c34
O4N_SECRET_BEARING_POSTS_EXECUTED = 0
O4N_POST_BUDGET_CONSUMED = 0
CURRENT_AUDIT = PROVEN 10 / PARTIAL 13 / MISSING 0 / NOT_APPLICABLE 2 / TOTAL 25
CURRENT_MINIMUM_BLOCKER = O4_PRODUCTION_COMPLETENESS_WITH_CREDENTIAL_GENERALITY
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This candidate repairs the founder-local proof procedure only. It authorizes no live
write while this candidate is open. Every live operation described below remains denied
until this repair independently qualifies at its exact head, receives substantive
exact-head review with zero material findings, merges through protected `main` with an
expected-head guard, passes original-attempt post-merge checks, and receives external
`CLOSED_CANONICAL` proof. A later separate evidence candidate must canonicalize any live
outcome. This message alone authorizes no live publication and grants no new POST budget
beyond the single O4-N POST already authorized.

## Exact candidate scope

This candidate may modify exactly:

```text
docs/planning/KODAC_O4N_PROOF_PROCEDURE_REPAIR_AUTHORIZATION_2026-09-13.md
```

No second repository path may change.

## Governance reason

Root `AGENTS.md` requires `LIVE GITHUB TRUTH -> AGENTS.md -> NEXT.md -> EXACT ACTIVE
AUTHORIZATION` before any bounded implementation. Live truth at `CANONICAL_BASE` establishes:

```text
O4N_AUTHORIZATION = CLOSED_CANONICAL
O4N_LIVE_EXECUTION = NOT_STARTED / ZERO SECRET-BEARING POSTS
POST_MERGE_FINDING_5651404487 = ANALYSIS_ONLY / MATERIAL CONFORMANCE MISMATCH BEFORE ANY SECRET RUN
PREPARED_HARNESS = /tmp/kodac-o4n-harness.ts / EPHEMERAL / NOT_COMMITTED / NOT_CANONICAL
PREPARED_HARNESS_TRANSPORT = fetchImpl: countingFetch for secret-bearing runs
O4N_REQUIRED_TRANSPORT = PRODUCTION_GLOBAL_FETCH_ONLY with optional fetch override omitted
HARNESS_CONFORMANCE = NOT_CONFORMANT / MUST NOT BE EXECUTED WITH REAL PAT AS WRITTEN
MINIMUM_BLOCKER = O4_PRODUCTION_COMPLETENESS_WITH_CREDENTIAL_GENERALITY
SUCCESSOR_IMPLEMENTATION = NOT_AUTHORIZED_EXCEPT_THIS_REPAIR
PROJECT_COMPLETION = NOT_ESTABLISHED
```

The post-merge finding explicitly requires a fresh successor analysis and the smallest
lawful fix-forward that satisfies both the canonical production-global-fetch requirement
and the required non-secret diagnostic obligations, without reinterpreting the current
harness as compliant and without consuming the single authorized publication POST budget.
The minimum governance-valid next unit is therefore this bounded procedure-repair
authorization, not execution, not evidence, not reconciliation, not implementation, not
persistence, not provider/model admission, and not release.

## Internal unsatisfiability declaration (explicit, no silent weakening)

Direct global fetch plus the currently mandated O4-N diagnostic evidence cannot both be
proven under the existing interfaces. This is stated explicitly:

```text
DIRECT_GLOBAL_FETCH_PLUS_CURRENTLY_MANDATED_DIAGNOSTIC_EVIDENCE = UNSATISFIABLE_UNDER_EXISTING_INTERFACES
```

Evidence, reverified at `CANONICAL_BASE` on 2026-09-13:

```text
O4I_SOURCE = packages/kodac-runtime/src/github-review/o4i-bounded-production-publication-wiring.ts
O4I_NORMALIZE_OPTIONS = when fetchImpl is supplied O4-I uses the supplied function; only when no override is supplied does it resolve to global fetch
O4I_RESULT_KEYS = version / wiringExecutionIdentity / status / credentialPolicyIdentity / composedResult / reviewId / reviewNodeId / reviewReceiptIdentity / failureCode / continuationDecision
O4I_RESULT_CONTAINS = NO broker get count / NO broker post count / NO HTTP status / NO request bytes / NO request hash / NO response bytes / NO response hash / NO content-type
O4H_SOURCE = packages/kodac-runtime/src/github-review/o4h-end-to-end-review-to-publication.ts
O4H_RESULT_KEYS = version / compositionExecutionIdentity / status / credentialPolicyIdentity / taskId / policyIdentity / repositoryId / repositoryFullName / pullRequestNumber / pullRequestId / reviewedHead / stage identities / terminalPublication / failureStage / failureCode / continuationDecision
O4H_RESULT_CONTAINS = NO transport counts / NO HTTP status / NO request or response bytes
O4G_SOURCE = packages/kodac-runtime/src/github-review/o4g-bounded-github-review-publication.ts
O4G_RESULT_KEYS = version / publicationExecutionIdentity / status / credentialPolicyIdentity / publicationAdmissionIdentity / repositoryId / repositoryFullName / pullRequestNumber / pullRequestId / reviewedHead / evaluatedHead / o4eExecutionIdentity / reviewId / reviewNodeId / reviewReceiptIdentity / slotReceipts / publicationRequestCount / failureCode / continuationDecision
O4G_RESULT_CONTAINS = publicationRequestCount and slot/body identities only; NO broker counts, NO HTTP status, NO request/response byte counts or hashes, NO content-type
O4G_HTTP_STATE = type HttpState { requests: number; posts: number; readBytes: number } / strictly internal local variable in publishO4gBoundedGithubReview / never returned in any result object
O4G_REQUEST_BODY = function requestBody(admission) / private, not exported / exact POST JSON construction not exposed
O4G_HEADERS = function headers(input) / private, not exported / sole Authorization header constructor under test / not observable except through live GitHub acceptance
REPOSITORY_AUTHORIZED_DIAGNOSTIC_SURFACE_FOR_SECRET_RUNS = NONE / no committed telemetry, log, or receipt exposes transport counts, HTTP status, or request/response bytes without a fetch replacement
GH_API_BROKER_HISTORY = O4-K and O4-L explicitly authorized an ephemeral fetchImpl broker delegating to gh api; O4-N explicitly forbids that broker for secret-bearing runs
WRAPPER_HISTORY = prepared /tmp/kodac-o4n-harness.ts countingFetch delegates to production fetch after recording; O4-N forbids ARBITRARY_FETCH_WRAPPER for secret runs; finding 5651404487 rules it NOT_CONFORMANT
READ_ONLY_GH_VERIFICATION_CAPABILITY = PROVEN / gh api GETs prove PR state/head, review COMMENTED/head/body-length/marker/duplicates, prior slot preserved, stray absent; they do NOT prove POST JSON bytes/hash, POST response status/bytes/hash, or broker GET/POST counts
```

Therefore the O4-N `Required diagnostic evidence` list as written (POST_REQUEST_UTF8_BYTES,
POST_REQUEST_SHA256, ACTUAL_HTTP_STATUS from production Response.status,
RESPONSE_CONTENT_TYPE, RESPONSE_UTF8_BYTES, RESPONSE_BODY_SHA256, RUN_1_BROKER_GET_COUNT,
RUN_1_BROKER_POST_COUNT, RUN_2_BROKER_GET_COUNT, RUN_2_BROKER_POST_COUNT, GLOBAL_POST_COUNT
as observed counts) is unobtainable with `FETCH_IMPL_FOR_SECRET_RUNS =
PRODUCTION_GLOBAL_FETCH_ONLY` plus `ARBITRARY_FETCH_WRAPPER = FORBIDDEN` under current
O4-I/O4-H/O4-G surfaces. This repair does not weaken that requirement silently; it replaces
unobtainable transport observations with explicitly defined derivable equivalents below.
No O4-N secret-bearing POST has been executed, so no budget has been consumed and no
adverse outcome must be preserved beyond the finding itself.

## Preserved O4-N security objective

This repair preserves O4-N's exact security objective without expansion:

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
TRANSPORT_EVIDENCE = PRESERVED EXACT UNDER REPAIRED DEFINITION BELOW
ADVERSE_ATTEMPTS = PRESERVED ALL
```

Agent prohibitions from O4-N remain binding without expansion or narrowing:

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

Secret-locality rule from O4-N remains binding:

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

## Exact target binding (reaffirmed, unchanged)

The live proof remains authorized only if all values remain exact immediately before
execution:

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

The repaired procedure must not delete, submit, approve, request changes, merge, label, or
otherwise mutate PR 163 or review 5189105929. The only permitted mutation remains the single
new COMMENT review POST from O4-N plus read-only GETs.

## Minimum credential scope (reaffirmed, unchanged)

```text
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

## Deterministic proof binding (reaffirmed, unchanged)

The repaired harness must call the canonical `runO4iBoundedProductionPublication` from the
live canonical `main` checkout and bind exactly the O4-N values:

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
provider = deterministic proof-only provider defined in O4-N
model = kodac-o4n-caller-injected-credential-proof-deterministic-v1
credentialPolicyIdentity = 397d2c78ff08322d7d27bf3afc1940af1075360916405244e5926df37a64f30d
credential = founder-held fine-grained PAT described above (real secret, founder-local only)
```

The `credentialPolicyIdentity` above remains SHA-256 over the literal UTF-8 string
`kodac-o4n-caller-injected-credential-capability-v1`. That label is not secret material. The
credential value itself must never appear in any repository file, log, hash preimage, error,
receipt, comment, or evidence record.

Required proof-only deterministic provider remains (temporary proof infrastructure, not a
provider/model admission):

```text
PROVIDER_IDENTITY = kodac-o4n-caller-injected-credential-proof-provider-v1
MODEL_IDENTITY = kodac-o4n-caller-injected-credential-proof-deterministic-v1
PROVIDER_OUTPUT = {"claims":[]}
PROVIDER_NETWORK = NONE
```

No bound input may change between run 1 and run 2. No other provider, model, task, policy,
or credential-policy identity is authorized for this proof.

## Production transport requirement (repaired, strictest conformance)

The secret-bearing runs must invoke production `fetch` with no `fetchImpl` replacement.
To remove every ambiguity that produced the prepared-harness mismatch, the repaired
procedure requires the single-argument form with no options object at all:

```text
SECRET_RUN_INVOCATION = runO4iBoundedProductionPublication(input) / NO second argument
FETCH_IMPL_KEY_FOR_SECRET_RUNS = MUST_BE_ABSENT (no fetchImpl property may appear)
OPTIONS_OBJECT_FOR_SECRET_RUNS = MUST_BE_ABSENT (no { fetchImpl, timeoutMs, now, maxClaims } object)
TIMEOUT_FOR_SECRET_RUNS = O4I default maxTimeoutMs 30000 via omitted options
FETCH_IMPL_FOR_SECRET_RUNS = PRODUCTION_GLOBAL_FETCH_ONLY
GH_API_BROKER_FOR_SECRET_RUNS = FORBIDDEN
SYNTHETIC_FETCH_FOR_SECRET_RUNS = FORBIDDEN
ARBITRARY_FETCH_WRAPPER = FORBIDDEN
CANONICAL_COUNTING_WRAPPER = FORBIDDEN_FOR_SECRET_RUNS (even when delegating to production fetch)
GLOBAL_FETCH_MONKEY_PATCH = FORBIDDEN
PROXY_MITM_TRANSPORT = FORBIDDEN
```

The O4-G `headers()` construction (`Accept`, `Authorization: Bearer <credential>`,
`X-GitHub-Api-Version: 2026-03-10`, `User-Agent: Kodac-O4G/1`) remains the unit under test.
The repaired harness must not strip, replace, supplement, observe, log, hash, or persist the
`Authorization` header value, length, or hash. It must not pass the credential through any
other channel. The only permitted observation about that header is the repaired boolean
defined below, derived without touching header bytes.

The prepared `/tmp/kodac-o4n-harness.ts` countingFetch form
`runO4iBoundedProductionPublication(input, { fetchImpl: countingFetch, timeoutMs: 30000 })`
remains explicitly NOT_CONFORMANT for secret-bearing runs and must not be executed with a
real PAT. A repaired founder-local harness must be prepared under this repair before any
secret run.

## Exact fresh-write budget (reaffirmed, no new budget)

This repair grants no new POST. It clarifies procedure for the single O4-N POST only:

```text
O4N_NEW_PUBLICATION_POST_BUDGET = 1 (already authorized, zero consumed, zero remaining after success)
THIS_REPAIR_NEW_POST_BUDGET = 0
COMBINED_NEW_PUBLICATION_POST_BUDGET = 1
BLIND_RETRY = FORBIDDEN
SECOND_PUBLICATION_POST = FORBIDDEN
RUN_1_EXPECTED_O4I_STATUS = COMPLETED_PUBLISHED
RUN_2_EXPECTED_O4I_STATUS = COMPLETED_ALREADY_PRESENT
```

Run 1 must establish `COMPLETED_PUBLISHED` for the new slot. Run 2 must use identical bound
input and establish `COMPLETED_ALREADY_PRESENT` with zero additional POSTs. Both runs must
agree on `reviewId`, `reviewNodeId`, and `reviewReceiptIdentity` for the new slot. If run 1
does not return `COMPLETED_PUBLISHED`, run 2 must not attempt a modified publication. If any
POST outcome is ambiguous, only read-only recovery scans are permitted. No automatic second
POST is authorized. If O4-N fails, preserve the failure exactly; no additional publication
POST is authorized without a new explicit founder decision and a new canonical authorization.

## Required successful behavior (reaffirmed)

Run 1 must establish:

```text
O4I_STATUS = COMPLETED_PUBLISHED
O4G_REVIEW_STATE = COMMENTED (proven via independent read-only GET, not via POST response parsing by agent)
NEW_SLOT_MARKER = PRESENT exactly once in the new review body
REVIEW_COMMIT_ID = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
```

Run 2 must establish:

```text
O4I_STATUS = COMPLETED_ALREADY_PRESENT
ADDITIONAL_REVIEW = NO
```

Independent read-only GitHub verification must prove for the new slot that the review is
`COMMENTED`, bound to the authorized head, contains the exact new marker exactly once, and
has no duplicate exact publication for that slot. It must also prove the prior slot review
5189105929 remains `COMMENTED` with its marker and that no stray review was created.

## Required diagnostic evidence (repaired, explicitly defined)

No token, `Authorization` header value, credential bytes, environment secret, keychain
material, CLI credential state, shell history, or hash whose input includes secret bytes may
be retained. Request/response body hashes cover body bytes only where the body is available
without touching headers; no header bytes are ever hashed.

The repaired evidence set is the maximum provable without replacing production fetch. Each
field defines its exact lawful source. Fields marked DROPPED_AS_UNOBSERVABLE are explicitly
not required for the repaired proof; their absence must not be treated as a gap.

```text
REPAIRED_EVIDENCE_SOURCE_A = O4-I result objects returned to founder-local harness (non-secret fields only)
REPAIRED_EVIDENCE_SOURCE_B = independent read-only GitHub GET verification (agent-executable, Pull requests read only)
REPAIRED_EVIDENCE_SOURCE_C = canonical source audit proving O4-G headers() is the sole Authorization constructor for the bound route
REPAIRED_EVIDENCE_SOURCE_D = synthetic requalification with fake transport and synthetic credentials only (no live PAT)
```

Repaired field mapping:

```text
POST_REQUEST_JSON_EVENT = PRESERVED / value COMMENT / source: O4-G canonical requestBody contract plus independent GET review event/state COMMENTED
POST_REQUEST_JSON_COMMIT_ID = PRESERVED / value e5b9ea66ca47b6956f8928055ea10f2cbe3447b1 / source A (reviewedHead) plus source B (live review commit_id)
POST_REQUEST_MARKER = PRESERVED / new slot marker <!-- kodac-publication-slot:<publicationSlotIdentity> --> / source A (slotReceipts[0].publicationSlotIdentity) plus source B (exact marker present exactly once in live review body)
POST_REQUEST_UTF8_BYTES = DROPPED_AS_UNOBSERVABLE_WITHOUT_WRAPPER / not required / replaced by MARKER plus BODY_LENGTH via source B plus bodyIdentity in source A
POST_REQUEST_SHA256 = DROPPED_AS_UNOBSERVABLE_WITHOUT_WRAPPER / not required / replaced by bodyIdentity (SHA-256 of review bodyText) in source A plus live body verification in source B
AUTHORIZATION_HEADER_PRESENT = PRESERVED_AS_INDIRECT_BOOLEAN_ONLY / value YES iff run1 COMPLETED_PUBLISHED plus source B proves new COMMENTED review with correct marker/head plus source C proves headers() is sole constructor plus founder attests PAT was supplied ONLY as O4-I credential input and never via gh api session / boolean only, no value, no length, no hash, no header observation
ACTUAL_HTTP_STATUS = DROPPED_AS_UNOBSERVABLE_WITHOUT_WRAPPER / not required / replaced by O4I_STATUS COMPLETED_PUBLISHED in source A plus source B live COMMENTED proof; no synthetic 200 may be claimed
RESPONSE_CONTENT_TYPE = DROPPED_AS_UNOBSERVABLE_WITHOUT_WRAPPER / not required
RESPONSE_UTF8_BYTES = DROPPED_AS_UNOBSERVABLE_WITHOUT_WRAPPER / not required / replaced by live review BODY_LENGTH via source B
RESPONSE_BODY_SHA256 = DROPPED_AS_UNOBSERVABLE_WITHOUT_WRAPPER / not required / no POST response hash may be claimed; live body verified via source B marker and length
RESPONSE_REVIEW_ID_IF_ANY = PRESERVED / source A (reviewId) cross-checked with source B (live review id)
RESPONSE_REVIEW_NODE_ID_IF_ANY = PRESERVED / source A (reviewNodeId) cross-checked with source B (live node_id)
RESPONSE_REVIEW_STATE_IF_ANY = PRESERVED / source B (live review state COMMENTED); O4-I result does not carry state so GET is authoritative
RESPONSE_REVIEW_BODY_LENGTH_IF_ANY = PRESERVED / source B (live review body UTF-8 length)
RESPONSE_REVIEW_COMMIT_ID_IF_ANY = PRESERVED / source A (reviewedHead via slot commitId) cross-checked with source B (live commit_id)
RUN_1_BROKER_GET_COUNT = DROPPED_AS_UNOBSERVABLE_WITHOUT_WRAPPER / not required / replaced by RUN_1_O4G_PUBLICATION_REQUEST_COUNT plus source B duplicate/exhaustion checks
RUN_1_BROKER_POST_COUNT = DROPPED_AS_UNOBSERVABLE_AS_COUNT / not required as observed count / replaced by POST_BUDGET_COMPLIANCE inference: run1 COMPLETED_PUBLISHED plus run2 COMPLETED_ALREADY_PRESENT with identical receipt plus source B exactly-one-marker proof entails exactly one new publication for the slot with zero blind retry
RUN_1_O4G_PUBLICATION_REQUEST_COUNT = PRESERVED / source A (composedResult.terminalPublication.publicationRequestCount, expected 1)
RUN_1_WIRING_EXECUTION_IDENTITY = PRESERVED / source A
RUN_1_PUBLICATION_EXECUTION_IDENTITY = PRESERVED / source A (composedResult.terminalPublication.publicationExecutionIdentity)
RUN_2_BROKER_GET_COUNT = DROPPED_AS_UNOBSERVABLE_WITHOUT_WRAPPER / not required
RUN_2_BROKER_POST_COUNT = DROPPED_AS_UNOBSERVABLE_AS_COUNT / not required / replaced by run2 COMPLETED_ALREADY_PRESENT in source A plus source B no-duplicate proof
RUN_2_O4G_PUBLICATION_REQUEST_COUNT = PRESERVED / source A
RUN_2_WIRING_EXECUTION_IDENTITY = PRESERVED / source A
RECEIPT_MATCH_FIRST_SECOND = PRESERVED / source A (reviewId, reviewNodeId, reviewReceiptIdentity equal across runs)
GLOBAL_POST_COUNT = PRESERVED_AS_INFERENCE_ONLY / value 1 inferred from run1/run2 statuses plus receipt match plus source B exactly-one-marker proof; must be labeled INFERRED_NOT_OBSERVED
SECOND_RUN_ADDITIONAL_POST = PRESERVED_AS_INFERENCE_ONLY / value NO inferred from run2 COMPLETED_ALREADY_PRESENT plus source B no-duplicate proof; must be labeled INFERRED_NOT_OBSERVED
DUPLICATE_EXACT_PUBLICATION_FOR_NEW_SLOT = PRESERVED / source B (exact marker review count must be 1)
PRIOR_SLOT_RECEIPT_PRESERVED = PRESERVED / source B (review 5189105929 remains COMMENTED with its marker, exact count 1 for that slot)
```

A later evidence candidate must label every `INFERRED_NOT_OBSERVED` field exactly as inferred
and must not relabel it as directly observed transport. It must list every
`DROPPED_AS_UNOBSERVABLE` field explicitly and must not claim it. Synthetic reconstruction of
expected POST bytes without the live secret run is not evidence of the live POST and must not
be substituted for source A or B.

## Credential and subprocess boundary (reaffirmed plus repair clarifications)

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
FETCH_WRAPPER_BY_AGENT_OR_FOUNDER_FOR_SECRET_RUNS = FORBIDDEN (includes countingFetch and any function passed as fetchImpl)
GLOBAL_FETCH_MONKEY_PATCH_FOR_SECRET_RUNS = FORBIDDEN
PROXY_MITM_TRANSPORT_FOR_SECRET_RUNS = FORBIDDEN
HEADER_VALUE_LENGTH_HASH_OBSERVATION = FORBIDDEN
SYNTHETIC_FETCH_FOR_SECRET_RUNS = FORBIDDEN
GH_API_BROKER_FOR_SECRET_RUNS = FORBIDDEN
```

The repaired founder-local secret-bearing harness may invoke only the canonical O4-I
entrypoint in single-argument form for the exact bound target. It must return only the
repaired non-secret fields above, retain no secret material after evidence extraction, and
persist any founder-local temporary evidence file with mode `0600`. The harness source itself
must contain no credential and must not be committed to the repository unless a later
canonical authorization explicitly permits a redacted harness path. The agent must never read,
hash, log, or serialize the PAT file, even to verify its mode beyond the founder-attested
`0600` precondition in the prepared command.

## Agent-executable versus founder-local split (reaffirmed)

```text
AGENT_EXECUTABLE = this repair candidate plus later redacted evidence canonicalization plus synthetic requalification plus read-only live verification plus reconciliation drafting
FOUNDER_LOCAL_ONLY = the two repaired single-argument secret-bearing O4-I runs plus PAT file creation plus PAT revocation or expiry plus handing back only the repaired non-secret evidence block
FOUNDER_COMMAND_MUST_BE_MINIMUM_EXACT = YES (single copy-pasteable command sequence prepared by the agent, with the PAT filename as the only founder-supplied variable, invoking the repaired single-argument harness)
AGENT_CONTINUES_AUTOMATICALLY_ONCE_NON_SECRET_EVIDENCE_AVAILABLE = YES (only after this repair is CLOSED_CANONICAL and the corrected procedure is independently proven)
```

The agent must prepare the exact smallest founder-side command so the secret remains opaque
to the agent. The founder pastes no token into chat at any point.

## Re-audit requirement

The later evidence candidate must explicitly preserve:

```text
O4K_ADVERSE_OUTCOME_PRESERVED = YES
O4L_BOUNDED_RECEIPT_PRESERVED = YES (review 5189105929, prior slot, marker count 1 for that slot)
O4N_PROCEDURE_FINDING_PRESERVED = YES (comment 5651404487, harness NOT_CONFORMANT, zero secret POSTs executed)
O4N_SECURITY_OBJECTIVE_PRESERVED = YES
O4G_AUTHORIZATION_HEADER_BYTES_AUTHENTICATED_GITHUB = PROVEN_BOUNDED_FOR_O4N_SLOT_ONLY_IF_DIRECT_EVIDENCE_UNDER_REPAIRED_DEFINITION
CALLER_INJECTED_SECRET_BYTES_ACCEPTED_BY_GITHUB = PROVEN_BOUNDED_FOR_O4N_SLOT_ONLY_IF_DIRECT_EVIDENCE_UNDER_REPAIRED_DEFINITION
PRIOR_NOT_PROVEN_FLAGS_NOT_REINTERPRETED = YES
INFERRED_NOT_OBSERVED_FIELDS_LABELED = YES
DROPPED_FIELDS_LISTED = YES
```

No project-wide criterion may be upgraded by hiding the new-slot boundary or by relabeling
inferred counts as observed transport. Multi-head production authority, new provider/model
admission, persistence, skill execution, sandbox, telemetry, release, deployment, and project
completion remain unproven by this unit.

## Candidate qualification

Before merge this one-path candidate must prove:

```text
EXACT_CHANGED_PATHS = 1
FOUNDER_DECISION_RECORDED = YES (repair direction recorded via finding 5651404487; content approval via substantive exact-head review)
O4K_O4L_O4M_HISTORY_PRESERVED = YES
O4N_OBJECTIVE_PRESERVED = YES
NEW_POST_BUDGET_BY_THIS_REPAIR = 0
COMBINED_NEW_POST_BUDGET = 1 (O4-N only)
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
authorized for qualification evidence of this repair candidate itself.

## Explicit non-grants

```text
MORE_THAN_ONE_NEW_PUBLICATION_POST = FORBIDDEN
SECOND_PUBLICATION_POST = FORBIDDEN
BLIND_RETRY = FORBIDDEN
NEW_POST_BUDGET_BY_THIS_REPAIR = 0
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
O4I_O4G_O4H_SOURCE_MUTATION = NOT_AUTHORIZED_BY_THIS_REPAIR
TELEMETRY_SURFACE_ADDITION = NOT_AUTHORIZED_BY_THIS_REPAIR
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

A successful repaired O4-N live proof does not directly rewrite current-view status. The O4-K
adverse outcome, O4-L bounded receipt, O4-M canonical receipt evidence, O4-N finding,
repaired O4-N disposition evidence, repaired O4-N request/response evidence under the
repaired definition, successful receipt if any, and the remaining multi-head/admission/release
boundary must be canonicalized through the next documentation-only evidence and
reconciliation lifecycle required by live governance.

If the repaired O4-N fails, preserve the failure exactly. No additional publication POST is
authorized without a new explicit founder decision and a new canonical authorization.

(End of file - total lines as committed.)
