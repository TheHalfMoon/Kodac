# Kodac O4-F Safe GitHub Publication Admission Authorization — 2026-09-12

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / PURE-DATA PUBLICATION-ADMISSION AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
CANONICAL_BASE = 103cb7e26fcc1a0cfe7152c0af2b0e7602a928c5
CANONICAL_BASE_TREE = b735f2b4e80608432a2ab2a98dae8ab9e3850617
PREDECESSOR_RECONCILIATION = PR #604 / CLOSED_CANONICAL / proof 5641368272
SUCCESSOR_ANALYSIS = PR #604 / comment 5641395165 / ANALYSIS_ONLY
WAIVER = NO
PROJECT_COMPLETION = NOT_ESTABLISHED
```

This record is a one-path authorization candidate. It creates no source/runtime authority until it independently qualifies, receives substantive exact-head review, merges through protected `main` with an exact expected-head guard, passes applicable original-attempt post-merge checks, and receives external post-merge proof.

## Exact authorization-candidate scope

This authorization candidate may modify exactly one path:

```text
docs/planning/KODAC_O4F_SAFE_GITHUB_PUBLICATION_ADMISSION_AUTHORIZATION_2026-09-12.md
```

No second path may change in this candidate.

## Problem statement

Canonical O4-E closes bounded model-backed reviewer execution, but it intentionally does not contain sufficient GitHub subject identity for a write boundary. O4-C still carries the canonical repository and pull-request subject, O4-D binds O4-C into execution admission, and O4-E binds the resulting completed model execution.

The minimum safe subunit before any GitHub write capability is therefore a pure-data publication admission that independently validates and cross-binds O4-C, O4-D, and O4-E and produces a secret-free, network-free publication request protocol.

Directly giving a network-write component the complete O4-A source input is not authorized because canonical O4-A validation can require O1 raw webhook and HMAC-secret material. Publication egress must not gain unnecessary access to that material.

## Canonical predecessor chain

```text
O4C_IMPLEMENTATION = PR #594 / merge 8cf4cc357e378d673521c488c317301c6b157ece / proof 5637965527 / CLOSED_CANONICAL
O4D_IMPLEMENTATION = PR #598 / merge cc0f5cb793e6e136f7192c71ebb29d7bb1d53c8a / proof 5640392166 / CLOSED_CANONICAL
POST_O4D_RECONCILIATION = PR #600 / merge 62e49779a92f13428d0343974e38e16bf957dd58 / proof 5640666949 / CLOSED_CANONICAL
O4E_AUTHORIZATION = PR #601 / merge d422ccf5a5587b4b96e9a68722e45a148b495fc4 / proof 5640754422 / CLOSED_CANONICAL
O4E_IMPLEMENTATION = PR #602 / merge 8874a91916c6f9b5a2100254583bd4c9d2ee9d55 / proof 5641093369 / CLOSED_CANONICAL
POST_O4E_RECONCILIATION = PR #604 / merge 103cb7e26fcc1a0cfe7152c0af2b0e7602a928c5 / proof 5641368272 / CLOSED_CANONICAL
```

## Conditional future implementation authority

Only after this authorization itself becomes externally proven `CLOSED_CANONICAL` may one later O4-F implementation candidate modify exactly these three paths:

```text
packages/kodac-runtime/src/github-review/o4f-safe-github-publication-admission.ts
packages/kodac-runtime/test/o4f-safe-github-publication-admission.test.ts
schema/o4f-safe-github-publication-admission.schema.json
```

No fourth path is authorized.

## O4-F purpose

O4-F is a pure-data bridge from already-canonical review context and completed model execution into a safe future GitHub-publication request envelope.

It must:

1. independently validate the complete O4-C result using the canonical O4-C validator;
2. independently validate the complete O4-D result using the canonical O4-D validator;
3. independently validate the complete O4-E result using the canonical O4-E validator;
4. prove exact cross-lineage consistency among O4-C `contextIdentity`, O4-D `contextIdentity`/`admissionIdentity`, and O4-E `admissionIdentity`/`executionIdentity`;
5. bind exact repository id/full name, pull-request number/id, canonical base, reviewed head, changed-path set, task identity, policy identity, and execution identity;
6. require O4-E `status == COMPLETED`, `failureCode == null`, and `evaluatedHead == reviewedHead`;
7. convert normalized O4-E claims into deterministic secret-free publication request evidence;
8. create exactly one top-level summary publication request and zero or more inline finding publication requests for claims having a validated line range;
9. mark every inline request as requiring a later live GitHub diff-anchor preflight before any write;
10. produce no network call, credential access, GitHub API write, persistence, telemetry, shell, filesystem, provider call, model call, K2 mutation, or external side effect.

## Input boundary

The O4-F constructor/build function may accept only one closed input object containing:

```text
o4cContext
o4dAdmission
o4eExecution
```

No credential, token, endpoint, fetch implementation, filesystem path, environment variable name, O1 raw webhook body, O1 HMAC secret, O4-A trigger source input, persistence handle, queue, cache, database handle, telemetry client, model provider, or tool capability may appear in the O4-F input surface.

## Required cross-lineage checks

O4-F must fail closed or emit a blocked result unless all required predecessor relationships hold exactly.

At minimum:

```text
O4D.contextIdentity == O4C.contextIdentity
O4D.taskId == O4C.taskId
O4D.canonicalBase == O4C.canonicalBase
O4D.reviewedHead == O4C.reviewedHead
O4D.changedPathSetIdentity == O4C.changedPathSetIdentity
O4D.changedPaths == O4C.changedPaths / exact canonical order
O4E.admissionIdentity == O4D.admissionIdentity
O4E.taskId == O4D.taskId
O4E.policyIdentity == O4D.policyIdentity
O4E.canonicalBase == O4D.canonicalBase
O4E.reviewedHead == O4D.reviewedHead
O4E.evaluatedHead == O4E.reviewedHead
O4E.status == COMPLETED
O4E.failureCode == null
```

Every O4-E claim path must still belong to O4-D/O4-C changed paths. Every claim evidence item id must still belong to O4-D admitted item identities.

## Protocol

The implementation must define a distinct protocol version:

```text
version = kodac-o4f-safe-github-publication-admission-v1
```

The result must bind at minimum:

```text
version
publicationAdmissionIdentity
status
repositoryId
repositoryFullName
pullRequestNumber
pullRequestId
canonicalBase
reviewedHead
o4cContextIdentity
o4dAdmissionIdentity
o4eExecutionIdentity
taskId
policyIdentity
changedPathSetIdentity
publicationRequestCount
publicationRequests
continuationDecision
```

The result must be closed, deterministic, deeply immutable, and independently validateable.

## Closed statuses and continuation

At minimum, status must use a closed vocabulary containing:

```text
READY
BLOCK_PREDECESSOR_NOT_READY
BLOCK_LINEAGE_OR_IDENTITY_MISMATCH
BLOCK_PUBLICATION_BODY_BUDGET
BLOCK_PUBLICATION_REQUEST_CONSTRUCTION
```

The only positive continuation value is:

```text
READY_FOR_SEPARATELY_AUTHORIZED_GITHUB_PUBLICATION
```

Every non-ready status must map to a closed negative continuation value and must never be interpretable as write authority.

## Claim identity

O4-F must derive a deterministic claim identity for each normalized O4-E claim using a domain-separated canonical-JSON SHA-256 preimage over the complete normalized claim fields.

No caller-supplied claim identity is accepted as authority.

## Publication slot identity

Each future publication occupies one deterministic logical slot. O4-F must derive a non-circular `publicationSlotIdentity` before body identity derivation.

The slot identity preimage must bind at minimum:

```text
publicationClass
repositoryId
pullRequestNumber
reviewedHead
o4eExecutionIdentity
claimIdentity / null for top-level summary
path / null
lineAnchor / null
```

This identity is an idempotency correlation key for a later publisher. It is not itself a GitHub receipt or write capability.

## Idempotency marker

Every generated publication body must contain exactly one deterministic inert HTML comment marker using its slot identity:

```text
<!-- kodac-publication-slot:<64-lowercase-hex> -->
```

The marker must be included in the exact body text before body identity, body byte length, and publication request identity are derived.

A later writer may search for this marker to detect or recover an already-created publication without requiring a persistence database. O4-F itself performs no search and no network request.

## Publication request classes

O4-F must define exactly:

```text
TOP_LEVEL_REVIEW_SUMMARY
INLINE_FINDING_COMMENT
```

There must be exactly one top-level summary request in every READY result.

An inline request may be generated only from an O4-E claim with a non-null validated range. Claims without a range must remain represented in the top-level summary and must not invent a line anchor.

## Inline anchor semantics

For an eligible ranged claim, O4-F may deterministically select one line anchor from the validated O4-E range and set:

```text
path = exact claim path
lineAnchor = deterministic in-range line
sideHint = RIGHT
requiresDiffAnchorPreflight = true
```

`sideHint = RIGHT` is only a future-write hint because O4-E review evidence is based on materialized reviewed-head content. It is not proof that GitHub's pull-request diff currently exposes that exact line as a commentable RIGHT-side anchor.

A later network writer must independently prove the diff anchor before posting. O4-F must never claim that the anchor has been accepted by GitHub.

## Deterministic body rendering

Publication bodies must be rendered entirely from validated canonical fields. Repository content remains untrusted evidence and must not become control text.

The top-level summary must bind at least:

```text
reviewedHead
providerName
model
acceptedClaimCount
deterministically ordered claim summaries
publication slot marker
```

Each inline body must bind at least:

```text
severity
category
summary
contractClaim
path
lineAnchor
claim identity
publication slot marker
```

Body rendering must preserve Unicode scalar validity, reject NUL, and enforce explicit UTF-8 byte limits. No truncation that changes claim meaning is authorized; an over-budget result blocks publication admission.

## Publication request identity

Each publication request identity must be a domain-separated canonical-JSON SHA-256 over its complete normalized identity-bearing fields, including:

```text
publicationSlotIdentity
publicationClass
repositoryId
pullRequestNumber
reviewedHead
o4eExecutionIdentity
bodyIdentity
bodyByteLength
claimIdentity
path
lineAnchor
sideHint
requiresDiffAnchorPreflight
```

The final `publicationAdmissionIdentity` must bind the complete normalized result except only itself.

## Deterministic ordering

Publication requests must be in one canonical order:

1. top-level summary first;
2. inline requests ordered deterministically by path, line anchor, claim identity, then publication request identity.

Duplicate claim identities, slot identities, or publication request identities must fail closed.

## Bounds

The implementation must define explicit conservative limits for at least:

```text
maximum publication requests
maximum top-level body UTF-8 bytes
maximum inline body UTF-8 bytes
maximum path UTF-8 bytes
maximum claim rendering bytes
maximum graph depth
maximum graph node count
```

The total request count must be bounded by O4-E's maximum claim count plus one summary request.

## Exact predecessor preservation

O4-F must not mutate or reinterpret:

```text
O4C_GITHUB_REVIEWER_CONTEXT_VERSION
O4D_REVIEWER_EXECUTION_ADMISSION_VERSION
O4E_MODEL_BACKED_REVIEWER_PROVIDER_EXECUTION_VERSION
O4C trust markers
O4D context item identities
O4E claim evidence references
O4E provider/model identity
O4E execution identity
```

O4-F is additive only.

## Required implementation test matrix

The future focused suite must contain at least 40 independently named cases and cover at minimum:

1. valid zero-claim completed execution produces exactly one summary request;
2. valid one-claim no-range execution produces summary only;
3. valid one ranged claim produces summary plus one inline request;
4. multiple claims produce canonical deterministic ordering;
5. repeated identical inputs produce identical admission identity;
6. changed execution identity changes slot/request/admission identities;
7. changed reviewed head changes identities;
8. changed body-bearing claim text changes request identity;
9. O4-C validator rejection fails closed;
10. O4-D validator rejection fails closed;
11. O4-E validator rejection fails closed;
12. O4-D/O4-C context identity mismatch blocks;
13. O4-D/O4-C task mismatch blocks;
14. O4-D/O4-C base mismatch blocks;
15. O4-D/O4-C head mismatch blocks;
16. O4-D/O4-C changed-path ordering mismatch blocks;
17. O4-E/O4-D admission identity mismatch blocks;
18. O4-E/O4-D task mismatch blocks;
19. O4-E/O4-D policy mismatch blocks;
20. O4-E/O4-D base mismatch blocks;
21. O4-E/O4-D reviewed-head mismatch blocks;
22. O4-E STALE blocks publication admission;
23. O4-E PROVIDER_FAILED blocks publication admission;
24. O4-E TIMED_OUT blocks publication admission;
25. O4-E INVALID_PROVIDER_OUTPUT blocks publication admission;
26. completed status with moved evaluated head is rejected by predecessor validation;
27. claim path outside changed paths is rejected;
28. fabricated evidence item reference is rejected;
29. duplicate semantic claim identity is rejected;
30. summary marker appears exactly once;
31. inline marker appears exactly once;
32. markers are deterministic and distinct by logical slot;
33. marker is included before body identity derivation;
34. no-range claim never invents an inline anchor;
35. ranged claim line anchor remains inside range;
36. inline request always requires future diff-anchor preflight;
37. body NUL is rejected through predecessor/renderer boundary;
38. body budget overflow blocks without truncation;
39. Unicode scalar text remains deterministic;
40. result is deeply frozen;
41. standalone validator accepts canonical result;
42. standalone validator rejects unknown fields;
43. standalone validator rejects identity mutation;
44. schema constants/statuses match runtime;
45. representative READY result validates against published schema;
46. representative blocked result validates against published schema;
47. source static scan proves no network, fetch, credential, env, filesystem, process, GitHub write route, persistence, telemetry, model/provider invocation, K2, or GlitchTip capability;
48. exact implementation surface is the authorized three paths;
49. full runtime suite remains green.

## Required static non-capability proof

The O4-F implementation source must contain no capability for:

```text
fetch / HTTP client
api.github.com
Authorization header
credential/token/secret input
process.env
filesystem read/write
child_process / shell / gh
GitHub POST/PATCH/PUT/DELETE route
persistence/database/cache/queue
telemetry/GlitchTip
ModelProvider / reviewer provider invocation
K2 / patch / repository mutation
release/package/deployment action
```

Imports needed only for deterministic hashing, safe object inspection, and predecessor validators/types are allowed.

## O4-G boundary reserved for later authority

This authorization deliberately does not authorize a GitHub writer.

A later separately authorized O4-G unit may be considered only after O4-F itself closes canonical and any required reconciliation/successor analysis occurs. That later unit must independently specify at minimum:

```text
caller-injected least-privilege credential boundary
exact api.github.com origin/route allowlist
live repository/PR/head preflight
bounded existing-publication slot scan
idempotency conflict handling
inline diff-anchor preflight
one write attempt / no blind POST retry
post-error recovery scan
response schema validation
provider comment/review receipt identity
rate-limit/failure behavior
no broad authenticated shell
no merge/approval/repository mutation
```

Current GitHub API documentation indicates that top-level pull-request timeline comments use the issue-comment endpoint and inline review comments use the pull-request review-comment endpoint, with inline writes requiring commit/path/line/side semantics. O4-F does not call either endpoint.

## Non-grants

This authorization does not grant:

```text
GITHUB_NETWORK_ACCESS
GITHUB_WRITE
GITHUB_TOKEN_OR_CREDENTIAL_USE
ENVIRONMENT_SECRET_LOOKUP
FILESYSTEM_SECRET_LOOKUP
BROAD_AUTHENTICATED_GITHUB_SHELL
PUBLICATION_RECEIPT_CLAIM
PUBLICATION_SIDE_EFFECT_RETRY
PERSISTENCE_OR_IDEMPOTENCY_DATABASE
QUEUE_OR_WORKER
TELEMETRY_OR_GLITCHTIP_ADOPTION
MODEL_OR_PROVIDER_INVOCATION
K2_MUTATION
AUTOFIX
MERGE_OR_APPROVAL
O4_OVERALL_CLOSURE
O5_WORK
RELEASE_VERSION_SELECTION
TAG_OR_GITHUB_RELEASE
PACKAGE_PUBLICATION
DEPLOYMENT
PRODUCTION_READINESS_CLAIM
BRAND_OR_LEGAL_CLAIM
PROJECT_COMPLETION
WAIVER
```

## Qualification requirements

This authorization candidate requires:

```text
BASE = THEN-CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
LOCAL_PROVENANCE = PASS
LOCAL_LEGACY_TESTS = PASS
LOCAL_RUFF = PASS
DIFF_CHECK = PASS
SUBSTANTIVE_EXACT_HEAD_REVIEW = CLEAN
PR_TRIGGERED_REQUIRED_CI = TERMINAL SUCCESS OR TRUTHFUL DOCS-ONLY NON-APPLICABILITY
UNRESOLVED_ACTIONABLE_THREADS = 0
RULESET_20707483 = ACTIVE / NO_BYPASS
MERGE = NORMAL / EXPECTED_HEAD_GUARD
POST_MERGE_GOVERNANCE = ORIGINAL_ATTEMPT SUCCESS
EXTERNAL_POST_MERGE_PROOF = REQUIRED
WAIVER = NO
```

The later three-path implementation must independently qualify on its own exact head, including the focused suite, published-schema validation, TypeScript typecheck using the canonical workflow recipe, full runtime suite, patch benchmark, root governance, substantive exact-head review, original applicable CI, guarded merge, and post-merge proof.

## Closure semantics

Only complete external post-merge proof may establish:

```text
O4F_SAFE_GITHUB_PUBLICATION_ADMISSION_AUTHORIZATION = CLOSED_CANONICAL
```

Even then, only the exact three-path pure-data implementation becomes eligible. GitHub network/write/token authority remains ungranted until a later explicit canonical authorization.

```text
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
