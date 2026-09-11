# Kodac O4-G Bounded GitHub Review Publication Authorization — 2026-09-12

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / BOUNDED GITHUB REVIEW PUBLICATION AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
CANONICAL_BASE = 25af0c8e8d5c26caabb81a0e01b499fc6c83d86a
CANONICAL_BASE_TREE = d212c351d78599e5b831888df35a9199def30d35
POST_O4F_RECONCILIATION = PR #608 / proof 5641920585 / CLOSED_CANONICAL
SUCCESSOR_ANALYSIS = PR #608 / comment 5641928093 / ANALYSIS_ONLY
WAIVER = NO
PROJECT_COMPLETION = NOT_ESTABLISHED
```

This one-path record authorizes no source mutation until it independently qualifies, receives substantive exact-head review, merges through protected `main` with an expected-head guard, passes applicable original-attempt post-merge checks, and receives external proof.

## Exact authorization-candidate scope

This candidate may modify exactly:

```text
docs/planning/KODAC_O4G_BOUNDED_GITHUB_REVIEW_PUBLICATION_AUTHORIZATION_2026-09-12.md
```

No second path may change.

## Canonical predecessor chain

```text
O4C_IMPLEMENTATION = PR #594 / proof 5637965527 / CLOSED_CANONICAL
O4D_IMPLEMENTATION = PR #598 / proof 5640392166 / CLOSED_CANONICAL
O4E_IMPLEMENTATION = PR #602 / proof 5641093369 / CLOSED_CANONICAL
O4F_AUTHORIZATION = PR #605 / proof 5641554945 / CLOSED_CANONICAL
O4F_IMPLEMENTATION = PR #606 / proof 5641815211 / CLOSED_CANONICAL
POST_O4F_RECONCILIATION_AUTHORIZATION = PR #607 / proof 5641857464 / CLOSED_CANONICAL
POST_O4F_RECONCILIATION = PR #608 / proof 5641920585 / CLOSED_CANONICAL
```

## Conditional future implementation authority

Only after this authorization itself becomes externally proven `CLOSED_CANONICAL` may one later O4-G implementation candidate modify exactly:

```text
packages/kodac-runtime/src/github-review/o4g-bounded-github-review-publication.ts
packages/kodac-runtime/test/o4g-bounded-github-review-publication.test.ts
schema/o4g-bounded-github-review-publication.schema.json
```

No fourth path is authorized. No workflow, dependency, lockfile, package metadata, documentation current view, provenance ledger, release, ruleset, or other runtime path may change in that implementation candidate.

## Purpose

O4-G is the first bounded GitHub publication side-effect boundary for the canonical O4 review path. It consumes one independently validated O4-F publication admission and may create exactly one GitHub pull-request review transaction for that admission.

The implementation must use one GitHub review transaction rather than independent POSTs per finding:

```text
POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews
```

The request must use:

```text
event = COMMENT
commit_id = exact O4-F reviewedHead
body = exact O4-F TOP_LEVEL_REVIEW_SUMMARY bodyText
comments = zero or more exact O4-F INLINE_FINDING_COMMENT bodies with path + line + side=RIGHT
```

This authorization does not allow `APPROVE`, `REQUEST_CHANGES`, pending reviews, issue comments, labels, merges, issue-state changes, repository mutations, or any second publication POST for the same execution call.

## Input and capability boundary

The publication runtime may receive only:

```text
O4-F publication admission
caller-injected GitHub credential
caller-declared credentialPolicyIdentity
optional injected fetch implementation for deterministic testing
optional bounded timeout configuration
```

The GitHub credential is capability material, not evidence. It must never be included in a result, receipt, identity preimage, error string, log message, thrown error detail, serialized object, test snapshot, or persisted state.

The implementation must not read:

```text
process.env
GITHUB_TOKEN
GH_TOKEN
filesystem credential files
Git config credential helpers
keychains
shell environment
CLI authentication state
```

No ambient credential discovery is authorized.

## Fixed GitHub API boundary

The only network origin is:

```text
https://api.github.com
```

The implementation must use a closed route/method allowlist containing only:

```text
GET  /repos/{owner}/{repo}/pulls/{pull_number}
GET  /repos/{owner}/{repo}/pulls/{pull_number}/files?per_page=100&page={bounded_page}
GET  /repos/{owner}/{repo}/pulls/{pull_number}/reviews?per_page=100&page={bounded_page}
GET  /repos/{owner}/{repo}/pulls/{pull_number}/comments?per_page=100&page={bounded_page}
POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews
```

No redirect to another origin is authorized. Every response URL, if exposed by the injected fetch implementation, must remain on the exact origin or fail closed.

Requests must use deterministic GitHub REST headers, including:

```text
Accept: application/vnd.github+json
Authorization: Bearer <caller-injected credential>
X-GitHub-Api-Version: 2026-03-10
User-Agent: Kodac-O4G/1
```

The authorization header must be created only at the final request boundary and must not escape into evidence.

## Standalone O4-F validation

Before any network request, the implementation must call the canonical O4-F standalone validator.

If O4-F is malformed, reject before network access.

If O4-F status is not `READY` or its continuation is not `READY_FOR_SEPARATELY_AUTHORIZED_GITHUB_PUBLICATION`, return a deterministic blocked result with zero network calls and zero side effects.

The implementation must not reconstruct, mutate, reinterpret, or relabel O4-C/O4-D/O4-E data.

## Publication transaction mapping

A READY O4-F result must contain exactly one top-level summary request. O4-G must reject any contradictory request set.

Each inline O4-F request must map exactly to one review-comment request object:

```text
body = O4-F bodyText
path = O4-F path
line = O4-F lineAnchor
side = RIGHT
```

No caller may override body, path, line, side, reviewed head, repository, PR, slot identity, request identity, or ordering.

No O4-F request body may be rendered again or modified by O4-G.

## Required live pull-request subject preflight

Before a new POST, O4-G must fetch the pull request and verify at minimum:

```text
live pull request id == O4-F pullRequestId
live pull request number == O4-F pullRequestNumber
live base repository id == O4-F repositoryId
live base repository full name == O4-F repositoryFullName
live head SHA == O4-F reviewedHead
```

A moved head blocks a new publication. No stale publication POST is authorized after the preflight detects movement.

## Existing-publication idempotency scan

Before any POST, O4-G must perform bounded scans of both pull-request reviews and pull-request review comments.

The scan must use each exact O4-F publication-slot marker as the correlation key.

The scan must classify the complete request set into exactly one of these conditions:

```text
NONE_PRESENT
COMPLETE_EXACT_PUBLICATION_PRESENT
PARTIAL_PRESENT
DUPLICATE_SLOT_PRESENT
MARKER_OR_BODY_MISMATCH
SCAN_BOUND_EXHAUSTED
INVALID_GITHUB_RESPONSE
```

`COMPLETE_EXACT_PUBLICATION_PRESENT` requires one exact matching review carrying the summary marker/body and every expected inline marker/body/path/line/side to belong to that same review identity and reviewed commit.

If the complete exact publication already exists, return a verified already-present receipt and perform no POST.

Any partial set, duplicate slot, marker/body mismatch, exhausted scan bound, or invalid response blocks publication with no POST.

## Diff-anchor preflight

When no prior publication exists, every inline request must be proven commentable on the live reviewed-head diff before the POST.

O4-G may read only the bounded pull-request-files route above. It must:

1. find the exact O4-F path;
2. require a usable bounded patch representation;
3. parse unified hunk ranges deterministically;
4. prove the requested `lineAnchor` corresponds to a RIGHT-side addition or context line in the live PR diff;
5. fail closed for deleted-only/LEFT-side lines, missing paths, missing/omitted/truncated patches, malformed hunk syntax, ambiguous duplicate paths, pagination bound exhaustion, or any unprovable anchor.

O4-G must never infer that an arbitrary HEAD line is commentable merely because it exists in repository content.

## All preflights before the write

For a new publication, these must all complete before the single POST:

```text
O4-F validation
existing-publication scan
live PR identity/head preflight
all inline diff-anchor preflights
request/body/count bounds
credential-policy validation
```

Immediately before the POST, O4-G must perform one final live PR head read and require the exact reviewed head again.

The unavoidable network race after that final GET does not authorize hidden retries or a false claim of atomic head locking. The submitted review remains explicitly bound to `commit_id = reviewedHead`.

## One-POST maximum and no blind retry

Within one `publish()` call:

```text
MAXIMUM_PUBLICATION_POSTS = 1
AUTOMATIC_POST_RETRY = FORBIDDEN
```

The single POST may occur only if no publication slot is already present and every preflight passed.

After any timeout, transport exception, abort race, malformed success response, 5xx, 429, 403, 422, or other non-confirmed POST outcome, O4-G must never issue another publication POST in that call.

It may perform only bounded read-only recovery scans.

## Post-error recovery

After a non-confirmed POST outcome, O4-G must run the same exact-marker recovery scan once within the bounded read budget.

If and only if the scan proves the complete exact review and inline-comment set exists, return `COMPLETED_RECOVERED_AFTER_UNCONFIRMED_POST` with verified receipt evidence.

If the scan proves none, only part, duplicates, mismatches, or cannot complete, return a closed failure/ambiguous result and stop. No second POST is authorized.

## Confirmed-success verification

A 2xx POST response alone is not final receipt proof.

After a confirmed create-review response, O4-G must perform bounded read-back scans and prove that:

```text
one exact review has the summary slot/body
review commit id == reviewedHead
all expected inline review comments exist
all inline comments belong to that same review id
all inline bodies/markers/path/line/side match O4-F exactly
no duplicate expected slot exists
```

Only then may publication be `COMPLETED_CREATED`.

## Closed status vocabulary

The implementation must define a closed protocol:

```text
version = kodac-o4g-bounded-github-review-publication-v1
```

At minimum the result status vocabulary must distinguish:

```text
COMPLETED_CREATED
COMPLETED_ALREADY_PRESENT
COMPLETED_RECOVERED_AFTER_UNCONFIRMED_POST
BLOCKED_O4F_NOT_READY
BLOCKED_HEAD_MISMATCH
BLOCKED_DIFF_ANCHOR
BLOCKED_EXISTING_PUBLICATION
READ_FAILED
POST_REJECTED
AMBIGUOUS_POST_OUTCOME
INVALID_GITHUB_RESPONSE
```

No failure status may be interpreted as safe-to-retry-with-POST automatically.

## Receipt contract

A completed result must expose deterministic, deeply immutable evidence containing at minimum:

```text
version
publicationExecutionIdentity
status
credentialPolicyIdentity
publicationAdmissionIdentity
repositoryId
repositoryFullName
pullRequestNumber
pullRequestId
reviewedHead
evaluatedHead
o4eExecutionIdentity
reviewId
reviewNodeId
reviewReceiptIdentity
slotReceipts
publicationRequestCount
failureCode
continuationDecision
```

Each slot receipt must bind at minimum:

```text
publicationSlotIdentity
publicationRequestIdentity
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

The top-level summary maps to `PULL_REQUEST_REVIEW`. Inline slots map to `PULL_REQUEST_REVIEW_COMMENT` and must bind the same pull-request review id.

No receipt identity may include the secret credential.

## Identity rules

Every receipt/result identity must use domain-separated canonical-JSON SHA-256 over all normalized identity-bearing fields except only the identity being derived.

IDs returned by GitHub must be normalized without lossy number coercion. Numeric GitHub IDs must be accepted only in safe integer range and serialized canonically as decimal strings.

Unknown response fields must not become authority. Unknown input/result fields must fail closed under the local protocol validators.

## Bounded scanning and response parsing

The implementation must set explicit hard bounds for:

```text
review scan pages
review-comment scan pages
pull-request-files pages
items per page
response UTF-8 bytes per request
aggregate read bytes per publish call
request body UTF-8 bytes
timeout milliseconds
graph depth
graph node count
```

Pagination must fail closed if the configured hard bound is reached without proving end-of-list or without locating all required data.

Response JSON must be read as bounded text before `JSON.parse`; unbounded `response.json()` is not authorized.

## Error handling and secret hygiene

Thrown or returned errors must use closed local failure codes and generic messages. Raw fetch error messages, request headers, authorization values, provider response bodies, and arbitrary GitHub error bodies must not be reflected into result evidence.

No logging is required or authorized.

Abort signals and timeout controllers must remain live and must not be frozen in a way that prevents cancellation.

## Required implementation tests

The focused suite must contain at least 60 independently named cases and cover at minimum:

1. malformed O4-F fails before network;
2. non-ready O4-F produces zero network calls;
3. zero-inline READY admission creates one COMMENT review;
4. multiple inline requests create one review POST containing all comments;
5. POST uses exact reviewed head as commit_id;
6. POST body is exact O4-F summary body;
7. inline body/path/line/RIGHT side are exact O4-F values;
8. credential is caller-injected only;
9. credential-policy identity is receipt-bound but credential is absent from result;
10. exact API origin only;
11. unexpected redirect/origin blocks;
12. unexpected route blocks;
13. unexpected method blocks;
14. live PR id mismatch blocks;
15. live PR number mismatch blocks;
16. live repository id mismatch blocks;
17. live repository full-name mismatch blocks;
18. moved head blocks before POST;
19. final pre-POST head movement blocks;
20. exact prior zero-inline review is recovered without POST;
21. exact prior review plus all inline comments is recovered without POST;
22. prior summary only with expected inline comments missing blocks;
23. prior inline marker without summary blocks;
24. duplicate summary slot blocks;
25. duplicate inline slot blocks;
26. summary marker/body mismatch blocks;
27. inline marker/body mismatch blocks;
28. inline path mismatch blocks;
29. inline line mismatch blocks;
30. inline side mismatch blocks;
31. inline review-id mismatch blocks;
32. inline commit mismatch blocks;
33. scan page bound exhaustion blocks;
34. malformed review list blocks;
35. malformed review-comment list blocks;
36. missing inline path in files scan blocks;
37. missing patch blocks;
38. malformed hunk blocks;
39. RIGHT addition line is accepted;
40. RIGHT context line is accepted;
41. deletion-only LEFT line is rejected;
42. line outside emitted hunks is rejected;
43. duplicate filename entry blocks;
44. files pagination bound exhaustion blocks;
45. all anchor preflights occur before POST;
46. maximum POST count is one;
47. timeout after POST triggers recovery scan but no second POST;
48. transport exception after POST triggers recovery scan but no second POST;
49. 5xx triggers recovery scan but no second POST;
50. 429 triggers recovery scan but no second POST;
51. 403 triggers recovery scan but no second POST;
52. 422 triggers recovery scan but no second POST;
53. exact recovery after unconfirmed POST yields recovered completion;
54. absent recovery after unconfirmed POST yields ambiguous/failure status;
55. partial recovery after unconfirmed POST does not claim completion;
56. 2xx create response requires read-back verification;
57. read-back complete exact publication yields COMPLETED_CREATED;
58. read-back mismatch after 2xx does not claim completion;
59. completed receipt is deeply frozen;
60. standalone result validator accepts canonical completed result;
61. standalone result validator rejects identity mutation;
62. standalone result validator rejects unknown fields;
63. schema constants and status vocabulary match runtime;
64. representative created/already-present/recovered/blocked results validate against schema;
65. response-byte overflow blocks before JSON parse;
66. aggregate-read-byte bound blocks;
67. credential never appears in serialization, errors, identities, or fixtures;
68. static source scan forbids env, filesystem, child process, shell, persistence, telemetry/GlitchTip, provider/model, K2, merge, approve, request-changes, labels, and issue-state mutation;
69. exact implementation surface is the authorized three paths;
70. full runtime suite remains green.

## Required implementation qualification

A future O4-G implementation candidate must prove at its exact head:

```text
focused O4-G test matrix PASS
TypeScript 5.9.3 compile PASS using the repository canonical validation recipe
published JSON schema meta-validation PASS
full Kodac runtime suite PASS
patch benchmark hook PASS
root uv sync --frozen --dev PASS
root provenance validator PASS
root pytest PASS
root ruff PASS
git diff --check PASS
exact three-path implementation surface PASS
worktree CLEAN
substantive exact-head review CLEAN
original-attempt GitHub governance PASS
original-attempt Linux/macOS/Windows runtime matrix PASS
active no-bypass ruleset reverified
expected-head normal merge
post-merge tree/parent/blob/signature verification
original-attempt post-merge checks PASS
external post-merge proof
```

Tests must use injected fake transport and synthetic credentials only. No live GitHub write credential is required or authorized for qualification evidence.

## Explicit non-grants

This authorization grants none of the following beyond the conditional three-path O4-G implementation described above:

```text
ENVIRONMENT_CREDENTIAL_LOOKUP = NOT_AUTHORIZED
SHELL_OR_GH_CLI_AUTHORITY = NOT_AUTHORIZED
MORE_THAN_ONE_PUBLICATION_POST_PER_CALL = NOT_AUTHORIZED
AUTOMATIC_POST_RETRY = NOT_AUTHORIZED
ISSUE_COMMENT_PUBLICATION = NOT_AUTHORIZED
APPROVE_OR_REQUEST_CHANGES_REVIEW = NOT_AUTHORIZED
MERGE_LABEL_ISSUE_STATE_REPOSITORY_MUTATION = NOT_AUTHORIZED
PERSISTENCE_DATABASE_QUEUE_SCHEDULER = NOT_AUTHORIZED
TELEMETRY_OR_GLITCHTIP = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
K2_MUTATION = NOT_AUTHORIZED
O5_IMPLEMENTATION = NOT_AUTHORIZED
RELEASE_VERSION_TAG_PACKAGE_DEPLOYMENT = NOT_AUTHORIZED
PHASE_OVERALL_CLOSURE = NOT_AUTHORIZED
PRODUCTION_READINESS_CLAIM = NOT_AUTHORIZED
BRAND_OR_LEGAL_CLAIM = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

O4-G implementation closure, if later proven, will still require project-wide reconciliation before any next successor unit.
