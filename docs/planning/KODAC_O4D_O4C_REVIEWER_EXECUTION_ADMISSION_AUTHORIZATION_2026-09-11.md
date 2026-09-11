# Kodac O4-D O4-C Reviewer-Execution Admission Authorization — 2026-09-11

## Status

```text
RECORD_CLASS = O4D_O4C_REVIEWER_EXECUTION_ADMISSION_AUTHORIZATION_CANDIDATE
STATUS = CANDIDATE / NOT_CANONICAL
DECISION_OWNER = KODAC_FOUNDER
CANONICAL_BASE_MAIN = 46306f1b02ab3c32c15c26a1dba38d04683c14d0
CANONICAL_BASE_TREE = 44a8ccd0d31f6bdab406aab6c12ae98c7b53f75a
POST_O4C_RECONCILIATION = CLOSED_CANONICAL / PR #596 / proof 5638640497
SUPERSEDED_SUCCESSOR_ANALYSIS = PR #596 / comment 5638660043 / ANALYSIS_ONLY
CORRECTED_SUCCESSOR_ANALYSIS = PR #596 / comment 5639027777 / ANALYSIS_ONLY
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This document is an authorization candidate only. It does not authorize O4-D implementation until this document itself is independently qualified, reviewed, merged through canonical governance, and externally post-merge proven.

## Exact authorization-candidate path

This candidate may modify exactly one path:

```text
docs/planning/KODAC_O4D_O4C_REVIEWER_EXECUTION_ADMISSION_AUTHORIZATION_2026-09-11.md
```

No second path may change in this authorization candidate.

## Why O4-D is the next dependency

Fresh canonical inspection establishes:

```text
O4B_BOUNDED_READ_ONLY_GITHUB_CONTEXT = CLOSED_CANONICAL
O4C_EXACT_GITHUB_REVIEWER_CONTEXT = CLOSED_CANONICAL
O4C_PROTOCOL = kodac-o4c-github-reviewer-context-v1
O4C_SELECTION_STRATEGY = kodac.o4c.exact-github-context-v1
O4C_POSITIVE_DECISION = READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_EXECUTION
K3_R5_CONTEXT_BUNDLE_VERSION = k3-r5-context-bundle-v1
K3_R5_SELECTION_STRATEGY = kodac.context.lexical-evidence-v1
KRI_R3_REVIEWER_EXECUTION_INPUT = K3_R5_CONTEXT_BUNDLE_ONLY
O4C_IS_K3_CONTEXT_BUNDLE = NO
PRODUCTION_O4C_CONSUMER = NOT_ESTABLISHED
PRODUCTION_MODEL_BACKED_REVIEWER_PROVIDER = NOT_ESTABLISHED
GITHUB_REVIEW_OR_COMMENT_PUBLICATION = NOT_ESTABLISHED
```

The canonical O4-C authorization explicitly forbids impersonating K3-R5 and explicitly requires separate authority for any later wiring into reviewer execution. Therefore a model-backed provider adapter cannot be the next implementation unit yet.

The corrected dependency order is:

```text
AUTHENTICATED_TRIGGER
-> O4B_BOUNDED_READ_ONLY_GITHUB_CONTEXT
-> O4C_EXACT_GITHUB_REVIEWER_CONTEXT
-> O4D_O4C_REVIEWER_EXECUTION_ADMISSION
-> SEPARATELY_AUTHORIZED_MODEL_BACKED_REVIEWER_PROVIDER_EXECUTION
-> O4A_REVIEW_COMPLETENESS_AND_PUBLICATION_INTENTS
-> SEPARATELY_AUTHORIZED_GITHUB_REVIEW_OR_COMMENT_PUBLICATION
```

## Conditional future implementation authority

Only after this authorization becomes externally post-merge proven `CLOSED_CANONICAL` may one future O4-D implementation candidate modify exactly these three paths:

```text
packages/kodac-runtime/src/github-review/o4d-o4c-reviewer-execution-admission.ts
packages/kodac-runtime/test/o4d-o4c-reviewer-execution-admission.test.ts
schema/o4d-o4c-reviewer-execution-admission.schema.json
```

No fourth path is authorized by this document.

The future implementation must not modify:

```text
packages/kodac-runtime/src/context-engine/contracts.ts
packages/kodac-runtime/src/context-engine/context-engine.ts
packages/kodac-runtime/src/reviewer-intelligence/provider-contracts.ts
packages/kodac-runtime/src/reviewer-intelligence/executor.ts
packages/kodac-runtime/src/reviewer-intelligence/runtime.ts
packages/kodac-runtime/src/model/*
packages/kodac-runtime/src/github-review/o4c-github-context-to-reviewer-context.ts
package.json
uv.lock
.github/workflows/*
docs/roadmap/*
docs/product/STATUS.md
```

## Implementation class

O4-D is a pure-data admission boundary only.

```text
NETWORK = NO
FILESYSTEM_IO = NO
PROCESS_OR_SHELL = NO
ENVIRONMENT_OR_SECRET_LOOKUP = NO
PROVIDER_OR_MODEL_CONSTRUCTION = NO
PROVIDER_OR_MODEL_INVOCATION = NO
GITHUB_REQUEST = NO
GITHUB_WRITE_OR_PUBLICATION = NO
K2_MUTATION = NO
SANDBOX_EXECUTION = NO
PERSISTENCE_OR_QUEUE = NO
TELEMETRY = NO
GLITCHTIP_ADOPTION = NO
NEW_DEPENDENCY = NO
PACKAGE_OR_LOCKFILE_CHANGE = NO
CURRENT_VIEW_MUTATION = NO
RELEASE_OR_DEPLOYMENT = NO
PROJECT_COMPLETION = NO
```

## Required input contract

The future implementation must accept one explicit pure-data input containing at minimum:

```text
taskId
policyIdentity
instructions
o4cContext
```

Where:

- `taskId` is bounded caller-controlled control text and must exactly equal the validated O4-C `taskId`;
- `policyIdentity` is bounded caller-controlled policy identity text;
- `instructions` is bounded caller-controlled reviewer instruction text and is not repository authority;
- `o4cContext` is the complete unmodified `O4cGithubReviewerContextResult` supplied by the caller.

No environment variable, secret, provider name, model name, credential, endpoint, GitHub token, publication target, persistence handle, or side-effect capability may be accepted by O4-D.

## Required predecessor validation

O4-D must call the canonical O4-C runtime validator and fail closed unless all of the following are true:

```text
O4C_VERSION = kodac-o4c-github-reviewer-context-v1
O4C_SELECTION_STRATEGY = kodac.o4c.exact-github-context-v1
O4C_TRUST = untrusted-repository-data
O4C_CONTINUATION_DECISION = READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_EXECUTION
TASK_ID = EXACT_MATCH
CANONICAL_BASE = LOWERCASE_40_HEX
REVIEWED_HEAD = LOWERCASE_40_HEX
CONTEXT_IDENTITY = VALIDATED_O4C_CONTEXT_IDENTITY
CHANGED_PATHS = VALIDATED_O4C_CHANGED_PATHS
ITEM_IDENTITIES = VALIDATED_O4C_ITEM_IDENTITIES
ITEM_COUNT = VALIDATED_O4C_ITEM_COUNT
TOTAL_UTF8_BYTES = VALIDATED_O4C_TOTAL_UTF8_BYTES
```

A blocked O4-C result must never become execution-ready through O4-D.

## O4-D protocol

The future implementation must define a separate exact protocol:

```text
version = kodac-o4d-o4c-reviewer-execution-admission-v1
contextProtocol = kodac-o4c-github-reviewer-context-v1
contextSelectionStrategy = kodac.o4c.exact-github-context-v1
trust = untrusted-repository-data
```

The protocol must not reuse these K3-owned values:

```text
k3-r5-context-bundle-v1
kodac.context.lexical-evidence-v1
bundleIdentity
repositoryIdentity = workspace-root-sha256-v1
snapshotIdentity = sha256-k3-r2-snapshot-v1
```

O4-D must never synthesize a `ContextBundle` or claim that GitHub review context passed through K3-R5 lexical selection.

## Required output contract

A positive result must include at minimum:

```text
version
admissionIdentity
taskId
policyIdentity
canonicalBase
reviewedHead
instructions
instructionsIdentity
contextProtocol
contextIdentity
contextSelectionStrategy
changedPathSetIdentity
changedPaths[]
items[]
itemIdentities[]
itemCount
totalUtf8Bytes
omittedSupportingPaths[]
omittedSupportingPathCount
trust
continuationDecision
```

The positive continuation decision must be exactly:

```text
READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_PROVIDER_EXECUTION
```

A non-positive result must expose zero execution-ready items and must use a closed decision vocabulary.

## Execution-ready item projection

O4-D may project only the already validated O4-C items. For each item it must preserve at minimum:

```text
itemId
subjectPath
readRole
changedFileStatus
previousPath
contentRevisionSha
contentRevisionKind
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

No repository byte may be summarized, normalized, decoded into executable authority, re-ranked, or silently omitted by O4-D.

The item sequence must equal the validated O4-C item sequence exactly.

## Identity requirements

`instructionsIdentity` must be a deterministic SHA-256 identity over the exact bounded caller instructions.

`admissionIdentity` must deterministically bind at least:

```text
protocol version
taskId
policyIdentity
canonicalBase
reviewedHead
instructionsIdentity
O4-C context protocol
O4-C contextIdentity
O4-C selection strategy
changedPathSetIdentity
changedPaths
ordered itemIdentities
itemCount
totalUtf8Bytes
omittedSupportingPaths
omittedSupportingPathCount
trust
continuationDecision
```

The output identity must change if any semantically material field changes.

## Provenance requirements

O4-D must preserve O4-C provenance exactly. It may add an O4-D aggregate admission identity, but it must not replace, weaken, reinterpret, or fabricate predecessor identities.

Repository-controlled text remains data. It may not mutate:

```text
policyIdentity
instructions
protocol version
selection strategy
continuation decision
budget
identity algorithm
changed-path completeness
provider or model choice
publication authority
```

## Bounds

O4-D must not widen predecessor or reviewer execution bounds.

```text
MAX_CONTEXT_ITEMS = 64
MAX_TOTAL_CONTEXT_UTF8_BYTES = 65536
MAX_CONTEXT_ITEM_UTF8_BYTES = 65536
MAX_PATH_UTF8_BYTES = 1024
MAX_TASK_ID_UTF8_BYTES = 128
MAX_POLICY_IDENTITY_UTF8_BYTES = 128
MAX_INSTRUCTIONS_UTF8_BYTES = 8192
MAX_PROVENANCE_REFS_PER_ITEM = 32
MAX_PROVENANCE_REF_UTF8_BYTES = 1024
```

Because O4-C already enforces context item/byte limits, any O4-D disagreement with predecessor accounting is a fail-closed lineage error, not permission to recompute looser limits.

## Closed continuation vocabulary

The future implementation must support at least:

```text
READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_PROVIDER_EXECUTION
BLOCK_O4C_NOT_READY
BLOCK_O4C_LINEAGE_OR_IDENTITY_MISMATCH
BLOCK_TASK_ID_MISMATCH
BLOCK_EXECUTION_ADMISSION_INPUT
```

Only the READY decision is positive.

## Schema requirements

The future JSON schema must:

1. close all objects with `additionalProperties: false` where applicable;
2. bind the exact O4-D and O4-C protocol constants;
3. require lowercase canonical SHA identities where applicable;
4. preserve bounded repository-relative POSIX paths;
5. preserve exact O4-C item ordering and identities at runtime validation;
6. preserve `trust = untrusted-repository-data`;
7. expose no credential, endpoint, provider, model, GitHub write, persistence, telemetry, or deployment fields;
8. use bounded string and array limits consistent with this authorization.

Schema validation does not replace runtime predecessor validation.

## Required focused future test matrix

The implementation candidate must include independently named tests covering at least:

### Positive

- one changed path;
- multiple changed paths;
- same-repository O4-C context;
- fork-repository O4-C context;
- removed `BASE_REMOVED` path;
- renamed path metadata;
- supporting context preservation;
- deterministic repeat admission;
- CRLF and LF exact-byte preservation;
- zero supporting-context case;
- instruction identity determinism;
- schema-valid positive result.

### Fail closed

- O4-C blocked decision;
- invalid O4-C context identity;
- invalid O4-C item identity;
- task mismatch;
- canonical-base mutation;
- reviewed-head mutation;
- changed-path mutation;
- changed-path reordering;
- item omission;
- item reordering;
- item text mutation;
- item byte-length mutation;
- content identity mutation;
- predecessor provenance mutation;
- unknown property;
- proxy object;
- accessor property;
- symbol key;
- unexpected prototype;
- cyclic graph;
- aliased mutable graph where forbidden;
- NUL text;
- invalid Unicode scalar text;
- over-bound task;
- over-bound policy identity;
- over-bound instructions;
- attempted provider/model field injection;
- attempted credential field injection;
- attempted publication field injection;
- attempted persistence/telemetry field injection.

The focused suite must contain at least 30 independently named cases.

## Existing-contract preservation

The implementation candidate must prove:

```text
O4C_CONTRACT = UNCHANGED
K3_R5_CONTEXT_CONTRACT = UNCHANGED
K3_R5_SELECTION_STRATEGY = UNCHANGED
KRI_R3_PROVIDER_CONTRACT = UNCHANGED
KRI_R3_REVIEWER_EXECUTION_RUNTIME = UNCHANGED
MODEL_PROVIDER_CONTRACT = UNCHANGED
O4A_CONTRACT = UNCHANGED
O4B_CONTRACT = UNCHANGED
```

O4-D is additive. It must not silently broaden or reinterpret an older contract.

## Required implementation qualification

On the exact implementation head, qualification must prove:

```text
EXACT_CHANGED_PATHS = 3
FOCUSED_O4D_TEST_MATRIX = PASS
FOCUSED_TEST_COUNT >= 30
SCHEMA_VALIDATION = PASS
DETERMINISM = PASS
O4C_TO_O4D_IDENTITY_BINDING = PASS
O4C_ITEM_SEQUENCE_PRESERVATION = PASS
O4C_PROVENANCE_PRESERVATION = PASS
UNTRUSTED_REPOSITORY_DATA_MARKING = PASS
K3_IMPERSONATION = 0
PROVIDER_MODEL_EXECUTION = 0
NETWORK_EXECUTION = 0
ENVIRONMENT_OR_SECRET_READ = 0
GITHUB_WRITE = 0
PERSISTENCE = 0
TELEMETRY = 0
DEPENDENCY_DELTA = 0
LOCKFILE_DELTA = 0
UV_SYNC_FROZEN_DEV = PASS
PROVENANCE = PASS
FULL_PYTEST = PASS
RUFF = PASS
DIFF_CHECK = PASS
WORKTREE = CLEAN
```

Failed first attempts must remain disclosed. No rerun may erase materially adverse original-attempt evidence.

## Merge discipline

This authorization candidate and the future implementation candidate each require:

1. exact allowed changed-path set;
2. successful applicable original-attempt CI;
3. substantive exact-head review;
4. zero unresolved actionable review threads;
5. active ruleset `20707483` with no bypass;
6. exact-head qualification proof;
7. fresh pre-merge race guard;
8. normal merge using the exact expected head;
9. external post-merge proof binding merge/main/tree/parents/blobs/signature/applicable push checks.

No squash, rebase, force-push, shared-history rewrite, stale-evidence reuse, bypass, or waiver is authorized.

## Non-grants

Even after this authorization becomes canonical, it grants only the exact three-path pure-data O4-D implementation described above. It does not grant:

```text
K3_CONTRACT_MUTATION
KRI_R3_CONTRACT_MUTATION
REVIEWER_EXECUTOR_MUTATION
REVIEWER_PROVIDER_IMPLEMENTATION
MODEL_PROVIDER_ADAPTER
PROVIDER_OR_MODEL_INVOCATION
PROVIDER_OR_MODEL_CREDENTIAL_USE
NETWORK_EGRESS
PROVIDER_FALLBACK_OR_RETRY_POLICY
GITHUB_REVIEW_OR_COMMENT_PUBLICATION
GITHUB_APP_OR_WEBHOOK_DEPLOYMENT
PERSISTENCE_OR_QUEUE
TELEMETRY_OR_GLITCHTIP_ADOPTION
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

The next successor after O4-D closure must be selected by fresh evidence. A model-backed reviewer-provider execution unit is only a candidate and remains separately unauthorized until then.

## Closure rule

This authorization becomes effective only after guarded merge and complete external post-merge proof.

Until then:

```text
O4D_IMPLEMENTATION_AUTHORITY = ABSENT
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
