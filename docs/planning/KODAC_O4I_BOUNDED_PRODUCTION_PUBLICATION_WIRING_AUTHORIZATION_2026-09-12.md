# Kodac O4-I Bounded Production Publication Wiring Authorization — 2026-09-12

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / BOUNDED PRODUCTION PUBLICATION WIRING AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
CANONICAL_BASE = afa86610f9b364c84677c38082f98ce793fd4533
CANONICAL_BASE_TREE = f586d796a4f03e2145bfe25bad80381e652fe0b3
POST_O4H_RECONCILIATION_AUTHORIZATION = PR #615 / proof 5642708851 / CLOSED_CANONICAL
POST_O4H_RECONCILIATION = PR #616 / merge afa86610f9b364c84677c38082f98ce793fd4533 / push proof 34667120406
SUCCESSOR_ANALYSIS = PR #616 merged record plus fresh successor inspection at CANONICAL_BASE / ANALYSIS_ONLY
FOUNDER_GRANT = BOUNDED LIVE-WRITE TOKEN AUTHORITY PLUS PRODUCTION WIRING AUTHORITY / 2026-09-12 / SCOPE RECORDED BELOW
WAIVER = NO
PROJECT_COMPLETION = NOT_ESTABLISHED
```

This one-path record authorizes no source mutation until it independently qualifies, receives substantive exact-head review, merges through protected `main` with an expected-head guard, passes applicable original-attempt post-merge checks, and receives external proof.

## Exact authorization-candidate scope

This candidate may modify exactly:

```text
docs/planning/KODAC_O4I_BOUNDED_PRODUCTION_PUBLICATION_WIRING_AUTHORIZATION_2026-09-12.md
```

No second path may change.

## Canonical predecessor chain

```text
O4G_IMPLEMENTATION = PR #610 / proof 5642260884 / CLOSED_CANONICAL
O4H_AUTHORIZATION = PR #613 / proof 5642495454 / CLOSED_CANONICAL
O4H_IMPLEMENTATION = PR #614 / proof 5642667756 / CLOSED_CANONICAL
POST_O4H_RECONCILIATION_AUTHORIZATION = PR #615 / proof 5642708851 / CLOSED_CANONICAL
POST_O4H_RECONCILIATION = PR #616 / merge afa86610f9b364c84677c38082f98ce793fd4533 / push proof 34667120406
```

PR #616 merged with ordered parents `87b7846` plus `31ccefd`, exactly the six authorized reconciliation paths, required checks green on the exact head, zero review threads, verified GitHub merge signature, and a successful post-merge governance push run. Its `CLOSED_CANONICAL` declaration belongs to a later reconciliation record, but its merge and external push evidence are the canonical successor-analysis basis used here.

## Governance reason

The project-wide audit derives `O4_LIVE_PUBLICATION_RECEIPT_AND_PRODUCTION_WIRING` as the minimum next partial blocker and allows only fresh successor analysis. Fresh inspection at `CANONICAL_BASE` confirms the O4-H composition module exists with no production caller invoking it, no live GitHub write receipt exists anywhere in the repository, and no new provider or model has been admitted. O5 sandbox work does not follow by numbering while the O4 product path is unresolved, and release scoping remains premature with thirteen partial criteria and no release authority.

The founder has now explicitly granted the bounded live-write token authority and production-wiring authority recorded below, decision-owned by the founder and limited to the COMMENT-only review-publication scope. That grant removes the token-authority blocker but grants no source mutation by itself. The minimum governance-valid next unit is therefore this bounded production-wiring authorization, not implementation.

## Founder grant record

On 2026-09-12 the founder explicitly granted, as a founder decision, bounded authority to design, authorize, implement, qualify, and prove a production wiring path for the already-canonical O4 publication pipeline, strictly through the canonical authorization and evidence process and with no bypass of repository governance. The granted scope is:

```text
OBJECTIVE = connect the canonical O4 publication path to a real GitHub pull-request review publication capability using the already-designed bounded O4-G publication contract
WRITE_SCOPE = POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews with event COMMENT only
FORBIDDEN_WRITES = APPROVE, REQUEST_CHANGES, merge, labels, issue-state mutations, repository administration, arbitrary GitHub writes
CREDENTIAL = caller-supplied GitHub credential at runtime, capability material only
```

Token and credential hygiene from the grant, binding on every later candidate:

```text
NEVER_COMMIT_TOKEN = YES
NEVER_STORE_TOKEN_IN_REPOSITORY_FILES = YES
NEVER_PRINT_TOKEN = YES
NEVER_INCLUDE_TOKEN_IN_LOGS = YES
NEVER_INCLUDE_TOKEN_IN_TESTS = YES
NEVER_INCLUDE_TOKEN_IN_RECEIPTS = YES
NEVER_INCLUDE_TOKEN_IN_HASHES_OR_IDENTITY_PREIMAGES = YES
NEVER_INCLUDE_TOKEN_IN_ERRORS = YES
NEVER_INCLUDE_TOKEN_IN_GITHUB_COMMENTS_OR_PR_DESCRIPTIONS = YES
NEVER_EXPOSE_TOKEN_IN_GENERATED_EVIDENCE = YES
TESTS_USE_SYNTHETIC_CREDENTIALS_ONLY = YES
AMBIENT_CREDENTIAL_DISCOVERY = NOT_GRANTED (no environment, credential-file, shell-history, git-helper, keychain, or unrelated-auth reads unless a later canonical authorization explicitly permits a specific mechanism)
AGENT_TOKEN_SOLICITATION = FORBIDDEN (never ask the founder to paste a token into chat)
```

Production-wiring bounds from the grant:

```text
WIRING_MAY = receive already-required canonical inputs; receive the credential through the approved caller boundary; invoke the canonical O4 review/publication path; publish the bounded COMMENT review; return or persist only explicitly authorized canonical evidence
WIRING_MUST_NOT = introduce broad shell execution, arbitrary network access, unrelated repository mutation, new provider/model authority, hidden credential discovery, generic GitHub write primitives, unbounded retries, background mutation loops, merge capability, APPROVE or REQUEST_CHANGES capability, issue or label mutation, release authority, extra deployment authority, or telemetry/GlitchTip without separate authority
```

Live-proof bounds from the grant:

```text
LIVE_PROOF_ALLOWED = ONLY_IF_CANONICAL_GOVERNANCE_DETERMINES_IT_NECESSARY
LIVE_PROOF_TARGET = founder-controlled Kodac repository and PR only
LIVE_PROOF_EVENT = COMMENT review only, bound to the exact tested PR and head
LIVE_PROOF_CREDENTIAL = minimum required permissions, founder-executed locally, never handled by the agent
LIVE_PROOF_DESTRUCTIVE_ACTIONS = NONE (no merge, approve, request-changes)
LIVE_PROOF_MUST_PRESERVE = resulting GitHub object IDs and receipt evidence
LIVE_PROOF_MUST_PROVE = idempotency, no duplicate publication on retry or recovery, secret hygiene
LIVE_PROOF_RECORDING = exact live evidence recorded honestly, including failures
NO_DEMONSTRATION_WRITES = if live proof is not required by the canonical Done Gate, no live write is performed
```

This authorization records the grant. It does not expand it.

## Conditional future implementation authority

Only after this authorization itself becomes externally proven `CLOSED_CANONICAL` may one later O4-I implementation candidate modify exactly:

```text
packages/kodac-runtime/src/github-review/o4i-bounded-production-publication-wiring.ts
packages/kodac-runtime/test/o4i-bounded-production-publication-wiring.test.ts
schema/o4i-bounded-production-publication-wiring.schema.json
```

No fourth path is authorized. No workflow, dependency, lockfile, package metadata, documentation current view, provenance ledger, release, ruleset, CLI wiring, event-ingress wiring, or other runtime path may change in that implementation candidate.

## Purpose

O4-I is the minimum production caller for the canonical O4 review-to-publication path. It accepts the same review task inputs the O4-H composition already requires, forwards them unchanged to the canonical `executeO4hEndToEndReviewToPublication` entrypoint with a production `fetch` implementation, and returns the terminal O4-G result verbatim inside a thin wiring envelope. It proves that the canonical chain executes end to end over production transport with a caller-injected credential and that its evidence contract survives the production boundary intact.

The wiring must call the canonical O4-H entrypoint exactly once per call and must not reconstruct, mutate, reinterpret, relabel, or re-render any stage input, evidence, or result.

## Side-effect envelope

The wiring introduces no new side-effect class beyond what O4-H already proves. Its total envelope is at most the O4-H envelope executed over a production fetch implementation:

```text
NEW_NETWORK_ORIGINS = NONE (https://api.github.com only, inherited from O4-G)
NEW_ROUTES_OR_METHODS = NONE (O4-G closed route and method allowlist only)
MAXIMUM_PUBLICATION_POSTS_PER_CALL = 1 (inherited from O4-G through O4-H)
AUTOMATIC_RETRY_WITH_NEW_INPUTS = FORBIDDEN
BACKGROUND_OR_DEFERRED_WRITES = FORBIDDEN
```

No redirect to another origin, ambient credential, shell, persistence, telemetry, or K2 mutation is authorized.

## Input and capability boundary

The wiring runtime may receive only:

```text
O4-H end-to-end input (O4-B context input, review task descriptor, caller-provided model provider interface, caller-provided model identifier, caller-injected GitHub credential, caller-declared credentialPolicyIdentity)
optional injected fetch implementation (defaults to the production global fetch only when the caller omits it)
optional bounded timeout configuration
```

The GitHub credential and any provider secret material are capability material, not evidence. They must never appear in a result, receipt, identity preimage, error string, log message, thrown error detail, serialized object, test snapshot, schema example, or persisted state.

The implementation must not read:

```text
process.env
GITHUB_TOKEN
GH_TOKEN
filesystem credential files
Git config credential helpers
keychains
shell environment or history
CLI authentication state
```

No ambient credential discovery is authorized. No new provider or model is admitted; the caller-supplied `ModelProvider` interface already used by O4-E qualification is forwarded, never constructed or selected by the wiring.

## Result contract

A wiring result must expose deterministic, deeply immutable evidence containing at minimum:

```text
version = kodac-o4i-bounded-production-publication-wiring-v1
wiringExecutionIdentity
status (closed vocabulary: wiring misuse distinct from composed O4-H terminal outcomes)
credentialPolicyIdentity
composed O4-H result (embedded verbatim, never reinterpreted)
reviewId (mirrored from the terminal O4-G result, null unless completed)
reviewNodeId (mirrored from the terminal O4-G result, null unless completed)
reviewReceiptIdentity (mirrored from the terminal O4-G result, null unless completed)
failureCode
continuationDecision
```

Every identity must use domain-separated canonical-JSON SHA-256. Unknown input/result fields must fail closed under the local protocol validators.

## Required implementation tests

The focused suite must contain at least 25 independently named cases and cover at minimum:

1. READY composition over injected fake transport reaches the O4-G terminal result with at most one POST;
2. omitted fetch implementation resolves to the production global fetch reference without reading credentials;
3. each O4-H blocked outcome propagates verbatim with zero additional side effects;
4. malformed wiring input fails before any network access;
5. maximum POST count is one across the whole wiring call;
6. credential and provider secrets never appear in results, errors, identities, snapshots, or schema examples;
7. wiring result is deeply frozen;
8. standalone result validator accepts canonical wiring results and rejects identity mutation and unknown fields;
9. representative wiring results validate against the published schema;
10. static source scan forbids env, filesystem, child process, shell, GH CLI, keychain and credential-helper access, persistence, telemetry/GlitchTip, new provider/model admission or invocation, K2, merge, approve/request-changes request construction, label, issue-state, and repository-administration request construction;
11. exact implementation surface is the authorized three paths;
12. full runtime suite remains green.

Tests must use injected fake transport, a fixture provider, and synthetic credentials only. No live GitHub write credential is required or authorized for qualification evidence.

## Required implementation qualification

A future O4-I implementation candidate must prove at its exact head:

```text
focused O4-I test matrix PASS
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

## Conditional bounded live-proof procedure

A live GitHub write proof may occur only after the O4-I implementation is itself externally proven `CLOSED_CANONICAL`, only if canonical governance determines it necessary to prove the production path, and only as a founder-executed bounded procedure:

```text
EXECUTOR = founder, local execution only; the agent never handles the credential
TARGET = founder-controlled Kodac repository and PR, named exactly in the reconciliation record
EVENT = COMMENT review only
BINDING = exact PR identity plus exact reviewed head, verified before and after
CREDENTIAL_SCOPE = minimum required permissions for posting a PR review comment
SECOND_RUN = founder re-executes once; the wiring must return the already-present receipt path with zero additional POSTs
RECORDING = GitHub review and comment object IDs, both run outcomes, transport POST counts, and any failure evidence recorded honestly in the post-implementation reconciliation
AGENT_VERIFICATION = read-only GETs of the recorded review objects plus synthetic-transport re-qualification only
```

If no live proof is executed, the wiring unit may still close canonical on synthetic-transport plus boundary evidence, with live receipt evidence remaining unproven and the wider read-only-review criterion remaining partial.

## Explicit non-grants

This authorization grants none of the following beyond the conditional three-path O4-I implementation described above:

```text
TOKEN_IN_REPOSITORY_LOGS_TESTS_RECEIPTS_HASHES_ERRORS_OR_COMMENTS = FORBIDDEN
AMBIENT_CREDENTIAL_DISCOVERY = NOT_AUTHORIZED
AGENT_CREDENTIAL_HANDLING = NOT_AUTHORIZED
SHELL_OR_GH_CLI_AUTHORITY = NOT_AUTHORIZED
MORE_THAN_ONE_PUBLICATION_POST_PER_CALL = NOT_AUTHORIZED
AUTOMATIC_POST_RETRY = NOT_AUTHORIZED
BACKGROUND_OR_DEFERRED_PUBLICATION = NOT_AUTHORIZED
GENERIC_GITHUB_WRITE_PRIMITIVES = NOT_AUTHORIZED
ISSUE_COMMENT_PUBLICATION = NOT_AUTHORIZED
APPROVE_OR_REQUEST_CHANGES_REVIEW = NOT_AUTHORIZED
MERGE_LABEL_ISSUE_STATE_REPOSITORY_ADMINISTRATION = NOT_AUTHORIZED
PROVIDER_MODEL_SELECTION_INVOCATION_OR_ADMISSION = NOT_AUTHORIZED
PERSISTENCE_DATABASE_QUEUE_SCHEDULER = NOT_AUTHORIZED
TELEMETRY_OR_GLITCHTIP = NOT_AUTHORIZED
K2_MUTATION = NOT_AUTHORIZED
CLI_OR_EVENT_INGRESS_WIRING = NOT_AUTHORIZED
O5_IMPLEMENTATION = NOT_AUTHORIZED
RELEASE_VERSION_TAG_PACKAGE_DEPLOYMENT = NOT_AUTHORIZED
PHASE_OVERALL_CLOSURE = NOT_AUTHORIZED
PRODUCTION_READINESS_CLAIM = NOT_AUTHORIZED
BRAND_OR_LEGAL_CLAIM = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

O4-I implementation closure, if later proven, will still require project-wide reconciliation before any next successor unit.

(End of file - total 226 lines)
