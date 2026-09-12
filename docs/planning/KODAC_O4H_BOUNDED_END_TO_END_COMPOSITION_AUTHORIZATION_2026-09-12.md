# Kodac O4-H Bounded End-to-End Review-to-Publication Composition Authorization — 2026-09-12

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / BOUNDED END-TO-END COMPOSITION AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
CANONICAL_BASE = a8e6238d97d1b0a203baf35c5e788abd1eb0e5e0
CANONICAL_BASE_TREE = a5233c66832aa83c908c2d952580c7d06235e031
POST_O4G_RECONCILIATION = PR #612 / proof 5642450104 / CLOSED_CANONICAL
SUCCESSOR_ANALYSIS = PR #612 / comment 5642458176 / ANALYSIS_ONLY
WAIVER = NO
PROJECT_COMPLETION = NOT_ESTABLISHED
```

This one-path record authorizes no source mutation until it independently qualifies, receives substantive exact-head review, merges through protected `main` with an expected-head guard, passes applicable original-attempt post-merge checks, and receives external proof.

## Exact authorization-candidate scope

This candidate may modify exactly:

```text
docs/planning/KODAC_O4H_BOUNDED_END_TO_END_COMPOSITION_AUTHORIZATION_2026-09-12.md
```

No second path may change.

## Canonical predecessor chain

```text
O4F_IMPLEMENTATION = PR #606 / proof 5641815211 / CLOSED_CANONICAL
O4G_IMPLEMENTATION = PR #610 / proof 5642260884 / CLOSED_CANONICAL
POST_O4G_RECONCILIATION_AUTHORIZATION = PR #611 / proof 5642326218 / CLOSED_CANONICAL
POST_O4G_RECONCILIATION = PR #612 / proof 5642450104 / CLOSED_CANONICAL
```

## Governance reason

The reconciled current views derive `O4_LIVE_PUBLICATION_RECEIPT_AND_END_TO_END_PRODUCT_PATH` as the minimum next partial blocker and allow only fresh successor analysis. That analysis (PR #612 / comment `5642458176`) evaluated four candidate directions: live publication receipt is blocked by absent token authority and no designated target; O5 does not follow by numbering while the O4 path is unresolved; release scoping is premature with thirteen partial criteria and no release authority. The minimum dependency-ordered completable unit is therefore a bounded end-to-end composition of the already-canonical O4 stages, not live-write, production wiring, O5, or release work.

## Conditional future implementation authority

Only after this authorization itself becomes externally proven `CLOSED_CANONICAL` may one later O4-H implementation candidate modify exactly:

```text
packages/kodac-runtime/src/github-review/o4h-end-to-end-review-to-publication.ts
packages/kodac-runtime/test/o4h-end-to-end-review-to-publication.test.ts
schema/o4h-end-to-end-review-to-publication.schema.json
```

No fourth path is authorized. No workflow, dependency, lockfile, package metadata, documentation current view, provenance ledger, release, ruleset, or other runtime path may change in that implementation candidate.

## Purpose

O4-H is a deterministic async composition of the canonical O4 chain for one review task: O4-B bounded live context acquisition, O4-C reviewer-context bridging, O4-D execution admission, O4-E model-backed reviewer execution through a caller-provided provider, O4-F publication admission, and O4-G bounded publication. It proves the complete trigger-to-publication-result path executes in dependency order with every stage's standalone validator applied and every intermediate identity preserved.

The composition must call each stage's canonical entrypoint in order and must not reconstruct, mutate, reinterpret, or relabel any stage's inputs, evidence, or results.

## Stage order and fail-closed semantics

The composition must execute exactly:

```text
O4-B acquire -> O4-C build -> O4-D admit -> O4-E execute -> O4-F admit -> O4-G publish
```

Before invoking each stage, the composition must validate the predecessor result with that predecessor's standalone validator. At the first non-ready, non-admitted, or invalid predecessor, the composition must stop and return a deterministic blocked result naming the failed stage, with zero further stage invocations and zero side effects beyond the reads already performed.

No stage may be skipped, reordered, retried with different inputs, or executed twice within one call.

## Side-effect envelope

The composition introduces no new side-effect class. Its total envelope is at most the reads the composed stages already perform plus at most the single O4-G publication POST, all through caller-injected transport:

```text
NEW_NETWORK_ORIGINS = NONE
NEW_ROUTES_OR_METHODS = NONE
MAXIMUM_PUBLICATION_POSTS_PER_CALL = 1 (inherited from O4-G)
AUTOMATIC_RETRY_WITH_NEW_INPUTS = FORBIDDEN
```

Live reads use the O4-B allowlist; the single write uses the O4-G allowlist. No redirect, ambient credential, shell, persistence, telemetry, or K2 mutation is authorized.

## Input and capability boundary

The composition runtime may receive only:

```text
O4-B bounded context input (expected identities, supporting paths)
review task descriptor (taskId, objective, policy identity, instructions)
caller-provided model provider (ModelProvider interface, no tools)
caller-provided model identifier
caller-injected GitHub credential
caller-declared credentialPolicyIdentity
optional injected fetch implementation for deterministic testing
optional bounded timeout configuration
```

The GitHub credential and any provider secret material are capability material, not evidence. They must never appear in a result, receipt, identity preimage, error string, log message, thrown error detail, serialized object, test snapshot, or persisted state.

The implementation must not read environment, credential files, git helpers, keychains, shell state, or CLI authentication. No ambient credential or provider discovery is authorized. No new provider or model is admitted; only the caller-injected `ModelProvider` interface already used by O4-E qualification may be consumed.

## Result contract

A completed or blocked composed result must expose deterministic, deeply immutable evidence containing at minimum:

```text
version = kodac-o4h-end-to-end-review-to-publication-v1
compositionExecutionIdentity
status (closed vocabulary distinguishing per-stage blocked outcomes and O4-G terminal outcomes)
credentialPolicyIdentity
stage identities (o4b context, o4c context, o4d admission, o4e execution, o4f admission)
terminal O4-G result (embedded verbatim, never reinterpreted)
failureStage (null on completion)
failureCode
continuationDecision
```

Every identity must use domain-separated canonical-JSON SHA-256. Unknown input/result fields must fail closed under the local protocol validators.

## Required implementation tests

The focused suite must contain at least 40 independently named cases and cover at minimum:

1. full-chain READY path reaches the O4-G terminal result with one POST;
2. each stage's non-ready predecessor blocks with zero further invocations;
3. malformed stage input fails before network;
4. stage order is fixed and observable through transport call sequencing;
5. no stage executes twice per call;
6. O4-G terminal blocked outcomes propagate verbatim;
7. maximum POST count is one across the whole composition;
8. credential and provider secrets never appear in results, errors, or identities;
9. composed result is deeply frozen;
10. standalone result validator accepts canonical results and rejects identity mutation and unknown fields;
11. representative results validate against the published schema;
12. static source scan forbids env, filesystem, child process, shell, persistence, telemetry/GlitchTip, new provider/model admission, K2, merge, approve, request-changes, labels, and issue-state mutation;
13. exact implementation surface is the authorized three paths;
14. full runtime suite remains green.

Tests must use injected fake transport, a fixture provider, and synthetic credentials only. No live GitHub write credential is required or authorized for qualification evidence.

## Required implementation qualification

A future O4-H implementation candidate must prove at its exact head:

```text
focused O4-H test matrix PASS
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

## Explicit non-grants

This authorization grants none of the following beyond the conditional three-path O4-H implementation described above:

```text
GITHUB_WRITE_TOKEN_AUTHORITY = NOT_GRANTED
LIVE_GITHUB_WRITE_EXECUTION = NOT_AUTHORIZED
PRODUCTION_WIRING_OR_NEW_CALLERS = NOT_AUTHORIZED
NEW_PROVIDER_MODEL_ADMISSION = NOT_AUTHORIZED
ENVIRONMENT_CREDENTIAL_LOOKUP = NOT_AUTHORIZED
SHELL_OR_GH_CLI_AUTHORITY = NOT_AUTHORIZED
PERSISTENCE_DATABASE_QUEUE_SCHEDULER = NOT_AUTHORIZED
TELEMETRY_OR_GLITCHTIP = NOT_AUTHORIZED
K2_MUTATION = NOT_AUTHORIZED
APPROVE_OR_REQUEST_CHANGES_REVIEW = NOT_AUTHORIZED
MERGE_LABEL_ISSUE_STATE_REPOSITORY_MUTATION = NOT_AUTHORIZED
O5_IMPLEMENTATION = NOT_AUTHORIZED
RELEASE_VERSION_TAG_PACKAGE_DEPLOYMENT = NOT_AUTHORIZED
PHASE_OVERALL_CLOSURE = NOT_AUTHORIZED
PRODUCTION_READINESS_CLAIM = NOT_AUTHORIZED
BRAND_OR_LEGAL_CLAIM = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

O4-H implementation closure, if later proven, will still require project-wide reconciliation before any next successor unit.
