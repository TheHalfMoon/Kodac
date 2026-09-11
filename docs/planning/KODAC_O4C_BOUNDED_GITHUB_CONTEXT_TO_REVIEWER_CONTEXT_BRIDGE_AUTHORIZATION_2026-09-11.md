# Kodac O4-C Bounded GitHub Context-to-Reviewer Context Bridge Authorization — 2026-09-11

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = O4-C BOUNDED GITHUB CONTEXT-TO-REVIEWER CONTEXT BRIDGE AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
CANONICAL_BASE = 76514ae63735fb7ed98d2579404697cc6a6ac22d
PREDECESSOR = PR #592 / POST_O4B_PROJECT_COMPLETION_AUDIT_AND_CURRENT_VIEW_RECONCILIATION / CLOSED_CANONICAL
PREDECESSOR_PROOF = PR #592 / comment 5635622515
SUCCESSOR_ANALYSIS = PR #592 / comment 5635687773 / ANALYSIS_ONLY
WAIVER = NO
```

This record authorizes no runtime mutation by itself. It is a one-path authorization candidate until independently qualified, normally merged into protected `main` under an exact expected-head precondition, and externally post-merge proven.

## Exact authorization-candidate scope

This authorization candidate may modify exactly one path:

```text
docs/planning/KODAC_O4C_BOUNDED_GITHUB_CONTEXT_TO_REVIEWER_CONTEXT_BRIDGE_AUTHORIZATION_2026-09-11.md
```

No second path may change in this authorization candidate. Runtime source/tests/schemas, existing K3-R5 context contracts, reviewer execution contracts, workflows, dependencies, lockfiles, package metadata, current views, prior authorization/evidence records, rulesets, tags, releases, publication state, and deployment state remain frozen.

## Why O4-C is the next dependency

Fresh post-O4-B reconciliation and direct canonical-source inspection establish:

```text
O4B_BOUNDED_READ_ONLY_GITHUB_CONTEXT = CLOSED_CANONICAL
O4B_RESULT_TYPE = O4bBoundedReadOnlyGithubContextResult
O4B_EXACT_CONTENT_AND_READ_EVIDENCE = PRESENT
REVIEWER_EXECUTION_RUNTIME = PRESENT
REVIEWER_EXECUTION_INPUT = K3_R5_CONTEXT_BUNDLE_ONLY
PRODUCTION_O4B_TO_REVIEWER_CONTEXT_BRIDGE = NOT_ESTABLISHED
PRODUCTION_REVIEWER_PROVIDER_IMPLEMENTATION = NOT_ESTABLISHED
GITHUB_REVIEW_OR_COMMENT_PUBLICATION_CLIENT = NOT_ESTABLISHED
```

The controlling dependency order is:

```text
AUTHENTICATED_TRIGGER
-> O4B_BOUNDED_READ_ONLY_GITHUB_CONTEXT
-> O4C_PROVENANCE_PRESERVING_GITHUB_CONTEXT_TO_REVIEWER_CONTEXT_BRIDGE
-> SEPARATELY_AUTHORIZED_PRODUCTION_REVIEWER_PROVIDER_EXECUTION
-> O4A_REVIEW_COMPLETENESS_AND_PUBLICATION_INTENTS
-> SEPARATELY_AUTHORIZED_GITHUB_REVIEW_OR_COMMENT_PUBLICATION
```

O4-B materializes exact-revision content and binds every admitted read to repository, revision, path, content, Git blob, read-evidence, snapshot, and aggregate read-context identities. The current K3-R5 context engine is workspace-snapshot based, and the current reviewer executor accepts only the K3-R5 lexical context-bundle contract. Reclassifying O4-B records as K3-R5 lexical selection would be semantically false. O4-C therefore defines a separate pure-data reviewer-context artifact rather than silently relabeling GitHub context as a workspace lexical bundle.

## Conditional future implementation authority

Only after this authorization itself becomes externally post-merge proven `CLOSED_CANONICAL` may one future implementation candidate modify exactly these three paths:

```text
packages/kodac-runtime/src/github-review/o4c-github-context-to-reviewer-context.ts
packages/kodac-runtime/test/o4c-github-context-to-reviewer-context.test.ts
schema/o4c-github-context-to-reviewer-context.schema.json
```

No fourth implementation path is authorized. In particular, the future O4-C candidate may not modify:

```text
packages/kodac-runtime/src/context-engine/contracts.ts
packages/kodac-runtime/src/context-engine/context-engine.ts
packages/kodac-runtime/src/reviewer-intelligence/provider-contracts.ts
packages/kodac-runtime/src/reviewer-intelligence/executor.ts
packages/kodac-runtime/src/github-review/o4b-bounded-read-only-github-context.ts
packages/kodac-runtime/src/github-review/o4-read-only-review-product-lineage-evidence.ts
```

No root export, CLI wiring, workflow, dependency, lockfile, package metadata, provider adapter, model adapter, GitHub publication adapter, GitHub App/webhook listener, persistence layer, current-view file, release file, or deployment file may change under this authorization.

## Authorized implementation class

```text
IMPLEMENTATION_CLASS = PURE_DATA_ONLY_PROVENANCE_PRESERVING_BRIDGE
PROTOCOL_VERSION = kodac-o4c-github-reviewer-context-v1
NETWORK = NO
CREDENTIAL_ACCESS = NO
FILESYSTEM_READ = NO
FILESYSTEM_WRITE = NO
SHELL_EXECUTION = NO
PROVIDER_MODEL_EXECUTION = NO
GITHUB_READ = NO
GITHUB_WRITE = NO
GITHUB_COMMENT_OR_REVIEW_PUBLICATION = NO
BRANCH_WRITE = NO
MERGE_OR_APPROVAL = NO
K2_MUTATION = NO
SANDBOX_EXECUTION = NO
PERSISTENCE_OR_QUEUE = NO
CURRENT_VIEW_MUTATION = NO
DEPENDENCY_OR_LOCKFILE_CHANGE = NO
RELEASE_OR_DEPLOYMENT = NO
PROJECT_COMPLETION = NO
WAIVER = NO
```

The implementation may consume only caller-materialized O4-B runtime data. It must perform no network acquisition and must never accept or derive a credential.

## Exact bridge input boundary

The future bridge input must be a closed plain-data object containing at minimum:

```text
taskId
objective
o4bContext
```

`o4bContext` must be an exact `O4bBoundedReadOnlyGithubContextResult` produced under the canonical O4-B v1 contract. O4-C must validate the O4-B versioned evidence surface rather than trusting TypeScript typing alone.

The bridge must reject unknown top-level fields, non-plain objects, unsafe graph shapes, malformed UTF-8/Unicode scalar text, malformed repository-relative paths, malformed SHA identities, duplicate records, unsorted canonical sets where the predecessor requires canonical ordering, or any inconsistency between the O4-B transient content items and the O4-B canonical evidence surface.

Repository-controlled text remains untrusted data throughout O4-C.

## Required O4-B lineage gates

Positive continuation is permitted only when all of the following are true:

```text
O4B_VERSION = kodac-o4b-bounded-read-only-github-context-v1
O4B_CONTINUATION_DECISION = READY_FOR_O4A_REVIEW
SNAPSHOT_EVIDENCE_IDENTITY = EXACTLY_BOUND
READ_CONTEXT_EVIDENCE_IDENTITY = EXACTLY_BOUND
CHANGED_PATH_SET_IDENTITY = EXACTLY_BOUND
CHANGED_PATH_ARRAY = EXACTLY_EQUAL_TO_O4B_CHANGED_PATHS_IN_CANONICAL_ORDER
CHANGED_PATH_COUNT = EXACTLY_BOUND
READ_EVIDENCE_SET_IDENTITY = EXACTLY_BOUND
CONTENT_RECORD_SET = EXACTLY_BOUND
CANONICAL_BASE = CONSISTENT_ACROSS_SNAPSHOT_AND_READ_CONTEXT_EVIDENCE
REVIEWED_HEAD = CONSISTENT_ACROSS_SNAPSHOT_AND_READ_CONTEXT_EVIDENCE
REPOSITORY_AND_PR_IDENTITIES = CONSISTENT_ACROSS_ALL_BOUND_SURFACES
ALL_CHANGED_PATHS = FULL_CONTENT_ONLY
ALL_CHANGED_PATH_CONTENT_TEXT = PRESENT
ALL_CHANGED_PATH_READ_EVIDENCE = PRESENT_AND_IDENTITY_MATCHED
ALL_CHANGED_PATH_CONTENT_RECORDS = PRESENT_AND_IDENTITY_MATCHED
```

A supporting-context record may be admitted only when its O4-B content record, read evidence, exact revision, path, identity, and full text all agree. O4-C may never synthesize unseen repository bytes.

The successful O4-C `changedPaths[]` array must be exactly equal, element-for-element and in the same canonical order, to the validated O4-B `readContextEvidence.changedPaths` array. Its length must equal O4-B `changedPathCount`, and the ordered paths of all `CHANGED_PATH` reviewer items must equal that same array. Missing, extra, duplicated, substituted, or reordered changed paths are lineage failures even if aggregate identities or content identities would otherwise validate.

Any O4-B `TRUNCATED` changed path, blocked O4-B continuation decision, identity mismatch, missing content item, missing read evidence, missing content record, duplicate changed path, changed-path array mismatch, stale/moved lineage, or malformed predecessor surface must fail closed before producing reviewer-ready context.

## Exact byte-to-reviewer-item binding

Every reviewer context item must derive from exactly one O4-B `FULL` transient content item. The item must bind at minimum:

```text
itemId
subjectPath
readRole
changedFileStatus | null
previousPath | null
contentRepositoryId
contentRepositoryFullName
contentRevisionSha
contentRevisionKind
providerBlobSha | null
materializedByteLength
contentIdentity
contentRecordIdentity
readEvidenceIdentity
readContextEvidenceIdentity
snapshotEvidenceIdentity
text
contextUtf8Bytes
provenanceRefs[]
trust = untrusted-repository-data
```

`text` must equal the exact O4-B `contentText` string. `contextUtf8Bytes` must equal its exact UTF-8 byte length. The bridge must independently recompute SHA-256 over the exact UTF-8 bytes and require equality with the O4-B full-content `contentIdentity`. No newline normalization, Unicode normalization, trimming, line-ending conversion, JSON escaping reinterpretation, prompt wrapping, summarization, prefix/suffix insertion, or other byte mutation is permitted before the byte-identity check.

`itemId` and every aggregate identity must be deterministic SHA-256 over a versioned canonical identity payload. Canonical serialization must sort object keys, preserve explicitly canonical array order, reject unsafe JSON values, and use exact UTF-8 bytes without locale-dependent behavior.

## Provenance preservation

Every reviewer context item must expose canonical provenance references that include the exact predecessor identities necessary to trace model-visible text back to O4-B evidence. At minimum:

```text
o4b-snapshot:<snapshotEvidenceIdentity>
o4b-read-context:<readContextEvidenceIdentity>
o4b-read-evidence:<readEvidenceIdentity>
o4b-content-record:<contentRecordIdentity>
o4b-content:<contentIdentity>
```

The future schema and runtime validator must require canonical sorted unique provenance references. A reviewer-context identity that cannot be traced back to the exact O4-B read and content identities is nonqualifying.

No raw credential, request header, response body wrapper, GitHub URL, provider URL, or unrelated repository text may be introduced into provenance merely because it existed during O4-B acquisition.

## Reviewer-context protocol

The future implementation must define a separate exact protocol rather than impersonating K3-R5:

```text
version = kodac-o4c-github-reviewer-context-v1
selectionStrategy = kodac.o4c.exact-github-context-v1
trust = untrusted-repository-data
```

The successful pure-data result must include at minimum:

```text
version
contextIdentity
taskId
objectiveIdentity
repositoryId
repositoryFullName
pullRequestNumber
pullRequestId
canonicalBase
reviewedHead
snapshotEvidenceIdentity
readContextEvidenceIdentity
changedPathSetIdentity
changedPaths[]
items[]
itemIdentities[]
itemCount
totalUtf8Bytes
selectionStrategy
continuationDecision
```

The exact O4-C context identity must bind the protocol version, task identity, objective identity, repository/PR/base/head lineage, predecessor O4-B aggregate identities, changed-path identity, canonical ordered reviewer-item identities, item/byte accounting, selection strategy, and continuation decision.

This protocol is reviewer-context preparation only. It is not a `ContextBundle`, `ReviewerExecutionRequest`, `ReviewerProviderRequest`, provider/model request, review run, finding set, publication intent, or GitHub publication action.

## Deterministic selection semantics

O4-C v1 performs no heuristic, lexical, structural, model-driven, or relevance-ranked selection. It uses an exact closed rule:

1. admit every `FULL` O4-B changed-path item;
2. then admit `FULL` O4-B supporting-context items in canonical O4-B path order only if the aggregate reviewer-context budget remains positive;
3. never drop, truncate, summarize, or partially include a changed-path item;
4. if every changed-path item cannot fit exactly, return a non-positive budget decision rather than reviewer-ready context;
5. supporting context may be omitted only through the explicit deterministic budget rule and its omission must be bound into the result identity and accounting;
6. preserve `changedPaths[]` exactly from validated O4-B evidence, including canonical order; the result may neither recompute a differently ordered array nor derive it from a subset of materialized items.

The result must never claim complete reviewer context when any changed-path byte is absent or when the result changed-path array differs from O4-B by value, count, or order.

## Reviewer-context budgets

O4-C must target the already-established reviewer execution envelope without widening it:

```text
MAX_CONTEXT_ITEMS = 64
MAX_TOTAL_CONTEXT_UTF8_BYTES = 65536
MAX_CONTEXT_ITEM_UTF8_BYTES = 65536
MAX_PATH_UTF8_BYTES = 1024
MAX_OBJECTIVE_UTF8_BYTES = 4096
MAX_TASK_ID_UTF8_BYTES = 128
MAX_PROVENANCE_REFS_PER_ITEM = 32
MAX_PROVENANCE_REF_UTF8_BYTES = 1024
```

These are the current default reviewer-execution context limits, not new provider authority. O4-C must not change reviewer executor configuration or hard maxima.

If the exact changed-path content exceeds any applicable reviewer-context budget, O4-C must return a deterministic non-positive decision and zero reviewer-ready items, or fail closed according to the frozen implementation contract. It must not silently increase reviewer limits or split one changed file into semantically unbound fragments under this authorization.

## Continuation decisions

The future implementation must use a closed decision vocabulary with at least:

```text
READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_EXECUTION
BLOCK_O4B_NOT_READY
BLOCK_O4B_LINEAGE_OR_IDENTITY_MISMATCH
BLOCK_CHANGED_PATH_CONTEXT_INCOMPLETE
BLOCK_REVIEWER_CONTEXT_BUDGET
```

Only `READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_EXECUTION` is positive. Its name is deliberately explicit: it means the pure-data context artifact is structurally eligible for a later separately authorized execution unit. It does not itself authorize or perform provider/model execution.

## Objective and task semantics

`taskId` is caller-supplied bounded control text and must not be derived from repository instructions. `objective` is caller-supplied bounded review-objective text and is identity-bound but must not alter byte inclusion or permit repository-controlled instructions to become authority.

The objective may later be used by a separately authorized reviewer-execution unit. O4-C must not combine the objective with repository text into a provider prompt and must not execute prompt templates.

Repository content, PR text, comments, filenames, source code, documentation, generated text, and model-like instructions embedded in repository data remain `untrusted-repository-data` and cannot modify O4-C policy or authority.

## Schema requirements

The future implementation schema must:

1. use a closed top-level object;
2. bind the exact O4-C protocol version;
3. require lowercase canonical SHA identities where applicable;
4. use bounded repository-relative path grammar;
5. require closed decision and read-role vocabularies;
6. require `trust = untrusted-repository-data` for every materialized item;
7. require deterministic item and aggregate accounting;
8. distinguish changed-path and supporting-context roles;
9. preserve O4-B revision kind and predecessor identities;
10. require exact value/count/order equality between result `changedPaths[]` and validated O4-B `changedPaths`;
11. contain no raw credential field, provider/model field, GitHub write field, publication body field, persistence field, or deployment field.

The schema is a validation/documentation boundary only. It does not grant wire transport, persistence, provider, or publication authority.

## Required focused future test matrix

The future implementation candidate must cover at minimum:

### Positive cases

- exact same-repository O4-B result with one changed path;
- exact fork-repository O4-B result;
- removed-path `BASE_REMOVED` content preservation;
- renamed-path metadata preservation;
- multiple changed paths with exact O4-B array equality and deterministic canonical order;
- supporting-context admission within budget;
- deterministic repeat execution producing byte-identical serialized result;
- exact UTF-8 byte identity preservation including LF and CRLF content;
- reviewer-context result accepted by its own runtime validator and JSON schema.

### Fail-closed cases

- O4-B blocked continuation decision;
- truncated changed path;
- missing changed-path content item;
- missing or mismatched read-evidence identity;
- missing or mismatched content-record identity;
- mismatched snapshot/read-context canonical base;
- mismatched snapshot/read-context reviewed head;
- mismatched repository/PR identities;
- changed-path set mismatch;
- output changed-path array missing one O4-B path;
- output changed-path array containing an extra path;
- output changed-path array with the same members in a different order;
- changed-path item sequence differing from the exact O4-B changed-path array;
- duplicate changed path or duplicate item identity;
- full-content SHA-256 mismatch;
- materialized byte-length mismatch;
- non-canonical or unsafe path;
- non-plain/unsafe object graph;
- unknown property;
- over-bound task/objective/path/provenance text;
- changed-path count above reviewer item budget;
- a single changed path above reviewer byte budget;
- aggregate changed-path bytes above reviewer byte budget;
- supporting-context budget overflow without deterministic omission accounting;
- repository-controlled instruction text attempting to influence bridge policy;
- attempted credential/provider/publication field injection.

The focused test matrix must include at least 30 independently named cases before the implementation can qualify.

## Existing-contract preservation

The future O4-C candidate must prove:

```text
K3_R5_CONTEXT_CONTRACT = UNCHANGED
K3_R5_SELECTION_STRATEGY = UNCHANGED
REVIEWER_EXECUTION_RUNTIME = UNCHANGED
REVIEWER_PROVIDER_CONTRACT = UNCHANGED
O4A_CONTRACT = UNCHANGED
O4B_CONTRACT = UNCHANGED
```

This separation is mandatory. O4-C creates a new pure-data artifact for later explicit wiring; it does not silently broaden an older contract to consume a new provenance domain.

## Qualification requirements for the future implementation

The future implementation candidate must independently prove, on its exact head:

```text
EXACT_CHANGED_PATHS = 3
FOCUSED_O4C_TEST_MATRIX = PASS
SCHEMA_VALIDATION = PASS
DETERMINISM = PASS
O4B_BYTE_TO_REVIEWER_ITEM_BINDING = PASS
O4B_LINEAGE_PRESERVATION = PASS
CHANGED_PATH_COMPLETENESS_FAIL_CLOSED = PASS
REVIEWER_CONTEXT_BUDGET_FAIL_CLOSED = PASS
UNTRUSTED_REPOSITORY_DATA_MARKING = PASS
NETWORK_EXECUTION = 0
PROVIDER_MODEL_EXECUTION = 0
GITHUB_WRITE = 0
PERSISTENCE = 0
DEPENDENCY_DELTA = 0
LOCKFILE_DELTA = 0
UV_SYNC_FROZEN_DEV = PASS
PROVENANCE = PASS
FULL_PYTEST = PASS
RUFF = PASS
DIFF_CHECK = PASS
WORKTREE = CLEAN
```

No failed first execution attempt may be silently replaced by a rerun-to-green when the original-attempt evidence is material. Any repair must be forward-only and preserve the failed evidence.

## Merge discipline for this authorization candidate

This authorization candidate must not merge unless its exact head has:

1. successful original-attempt applicable CI;
2. substantive exact-head review;
3. zero unresolved actionable review threads;
4. active ruleset `20707483` with no bypass;
5. exact one-path changed-file allowlist;
6. exact-head qualification proof;
7. fresh pre-merge race guard proving unchanged base/head/tree/blob/CI/review/thread/ruleset state;
8. normal merge with the exact expected head SHA.

No squash, rebase, force-push, shared-history rewrite, stale-evidence reuse, bypass, or waiver is authorized.

Post-merge closure requires ordered merge parents, exact candidate tree/blob/path identity, valid GitHub merge signature, original applicable post-merge workflow success, zero unresolved actionable threads, active no-bypass ruleset, unchanged tag/release posture, and external post-merge proof.

## Non-grants

Even after this authorization becomes canonical, it grants only the exact three-path pure-data O4-C implementation described above. It does not grant:

```text
NETWORK_OR_SECRET_USE
O4B_MUTATION
K3_R5_CONTEXT_CONTRACT_MUTATION
REVIEWER_EXECUTOR_MUTATION
REVIEWER_PROVIDER_IMPLEMENTATION
PROVIDER_MODEL_EXECUTION
PROMPT_EXECUTION
GITHUB_REVIEW_OR_COMMENT_PUBLICATION
GITHUB_APP_OR_WEBHOOK_DEPLOYMENT
PERSISTENCE_OR_QUEUE
K2_MUTATION
O5_SANDBOX_WORK
AUTOFIX
CURRENT_VIEW_RECONCILIATION
PHASE_OVERALL_CLOSURE
RELEASE_VERSION_SELECTION
PACKAGE_PUBLICATION
PUBLIC_RELEASE
DEPLOYMENT
PRODUCTION_READINESS_CLAIM
PROJECT_COMPLETION
```

Any later wiring from the O4-C pure-data artifact into `ReviewerExecutionRuntime`, any production `ReviewerProvider`, any provider/model invocation, and any GitHub publication side effect require fresh successor analysis and separate canonical authority after O4-C implementation closure.

## Closure rule

This authorization document cannot certify its own canonicality. It becomes effective only after guarded merge into canonical `main` and complete external post-merge proof. Until then:

```text
O4C_IMPLEMENTATION_AUTHORITY = ABSENT
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
