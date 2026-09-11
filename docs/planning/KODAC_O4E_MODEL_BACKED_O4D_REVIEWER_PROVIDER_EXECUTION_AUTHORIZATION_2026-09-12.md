# Kodac O4-E Model-Backed O4-D Reviewer Provider Execution Authorization — 2026-09-12

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / IMPLEMENTATION AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
CANONICAL_BASE = 62e49779a92f13428d0343974e38e16bf957dd58
PREDECESSOR = POST_O4D_PROJECT_COMPLETION_AUDIT_AND_CURRENT_VIEW_RECONCILIATION / CLOSED_CANONICAL
PREDECESSOR_PROOF = PR #600 / comment 5640666949
WAIVER = NO
PROJECT_COMPLETION = NOT_ESTABLISHED
```

This record authorizes no source mutation by itself. It becomes implementation authority only after exact-head qualification, substantive review, protected-main merge, and external post-merge proof.

## Why O4-E is next

Fresh canonical inspection after PR #600 proves:

```text
O4C_EXACT_GITHUB_REVIEWER_CONTEXT = CLOSED_CANONICAL
O4D_O4C_REVIEWER_EXECUTION_ADMISSION = CLOSED_CANONICAL
O4D_POSITIVE_DECISION = READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_PROVIDER_EXECUTION
KRI_R3_REVIEWER_EXECUTION_RUNTIME = CANONICAL / K3_CONTEXTBUNDLE_ONLY
O4D_IS_K3_CONTEXTBUNDLE = NO
MODEL_PROVIDER_ABSTRACTION = PRESENT
OPENAI_AND_OPENAI_COMPATIBLE_MODEL_PROVIDERS = PRESENT
PRODUCTION_O4D_NATIVE_MODEL_BACKED_REVIEWER_EXECUTION = NOT_ESTABLISHED
GITHUB_REVIEW_OR_COMMENT_PUBLICATION = NOT_ESTABLISHED
```

O4-D must not impersonate K3. Therefore O4-E is a separate O4-D-native provider-execution path rather than a synthetic K3 `ContextBundle` bridge.

## Conditional future implementation authority

Only after this authorization is externally proven `CLOSED_CANONICAL` may one O4-E implementation candidate modify exactly:

```text
packages/kodac-runtime/src/github-review/o4e-model-backed-reviewer-provider-execution.ts
packages/kodac-runtime/test/o4e-model-backed-reviewer-provider-execution.test.ts
schema/o4e-model-backed-reviewer-provider-execution.schema.json
```

No fourth path is authorized.

The implementation must not modify K3, KRI-R3, O4-C, O4-D, model-provider implementations, package manifests, lockfiles, workflows, current views, provenance ledgers, release state, or deployment state.

## Required execution shape

O4-E must accept only explicit injected runtime dependencies and pure-data control values:

```text
admission = complete O4dO4cReviewerExecutionAdmissionResult
provider = already-constructed ModelProvider
model = bounded explicit model identifier
readCurrentHead = caller-injected read-only head supplier
optional timeoutMs within a fixed hard bound
```

O4-E may invoke only the injected `ModelProvider.generate` method. It must not read environment variables, credentials, config files, process state, provider registries, secret stores, or construct concrete OpenAI/OpenAI-compatible providers.

O4-E must not implement fallback routing, provider selection, provider construction, credential lookup, retry policy, or billing policy. Those remain caller/provider concerns under separate authority.

## Predecessor and revision requirements

Before provider execution O4-E must:

1. validate the complete O4-D result with the canonical O4-D validator;
2. require `continuationDecision == READY_FOR_SEPARATELY_AUTHORIZED_REVIEWER_PROVIDER_EXECUTION`;
3. preserve `taskId`, `policyIdentity`, `canonicalBase`, `reviewedHead`, `instructions`, `admissionIdentity`, item identities/order, exact text bytes, provenance, changed-path completeness, and trust markers;
4. read the current head immediately before provider execution and fail closed without invoking the provider if it differs from `reviewedHead`.

After provider completion/failure/timeout O4-E must read current head again and bind the execution result to that evaluated head.

## Model request boundary

The generated `ModelProviderRequest` must be deterministic and bounded. It must:

- use the explicit caller-supplied model string;
- contain no tools (`tools = []`);
- pass the O4-E AbortSignal through `signal`;
- preserve reviewer instructions as caller-controlled control text;
- serialize repository context as explicitly untrusted data, never as authority or executable instructions;
- identify every context item by O4-D `itemId` and `subjectPath`;
- include the exact repository text without truncation or rewriting;
- contain no GitHub token, provider credential, endpoint secret, persistence handle, telemetry destination, or publication capability.

The provider response must finish without tool calls. Tool-call output is invalid provider output.

## Strict provider output

Only one strict JSON object is accepted from model text:

```text
{ "claims": [...] }
```

Each claim may contain only:

```text
claimKey
path
optional range { startLine, endLine }
summary
contractClaim
category
severity
confidenceBps
evidenceItemIds
```

Unknown fields fail closed. Provider output cannot define or override task identity, policy identity, base/head truth, admission identity, provider/model identity, evaluated head, GitHub publication state, finding lifecycle state, adjudication, merge approval, release state, or project completion.

Every evidence item reference must resolve to an admitted O4-D item. At least one cited item must exactly match the claim path. Claim count, strings, ranges, and evidence-reference counts must be bounded.

## Result protocol

O4-E must define a separate protocol:

```text
version = kodac-o4e-model-backed-o4d-reviewer-provider-execution-v1
```

The result must bind at minimum:

```text
executionIdentity
status
providerName
model
admissionIdentity
taskId
policyIdentity
canonicalBase
reviewedHead
evaluatedHead
instructionsIdentity
acceptedClaimCount
claims
failureCode
```

Allowed statuses must be closed and include:

```text
COMPLETED
STALE
PROVIDER_FAILED
TIMED_OUT
INVALID_PROVIDER_OUTPUT
BLOCKED_ADMISSION
BLOCKED_PRE_EXECUTION_HEAD_MISMATCH
```

Blocked/provider-failed/timeout/invalid-output results expose zero accepted claims. A `STALE` result may preserve normalized claims only as stale review evidence; it grants no publication/current-head authority.

Execution identity must deterministically bind the identity-bearing normalized result. It is an integrity fingerprint, not a signature or capability.

## Failure and timeout behavior

Provider exceptions must normalize to `PROVIDER_FAILED`; timeout must abort the signal and normalize to `TIMED_OUT`; malformed JSON, tool calls, invalid finish reason, unknown fields, fabricated evidence references, path/evidence mismatch, over-bound claims, and authority-field injection must normalize to `INVALID_PROVIDER_OUTPUT` with zero accepted claims.

No provider failure may create GitHub publication intent, repository mutation, adjudication, `PROVEN_READY`, release truth, or project-completion truth.

## Existing-contract preservation

```text
O4C_CONTRACT = UNCHANGED
O4D_CONTRACT = UNCHANGED
K3_R5_CONTEXT_CONTRACT = UNCHANGED
KRI_R3_REVIEWER_PROVIDER_CONTRACT = UNCHANGED
KRI_R3_REVIEWER_EXECUTION_RUNTIME = UNCHANGED
MODEL_PROVIDER_CONTRACT = UNCHANGED
OPENAI_PROVIDER_IMPLEMENTATIONS = UNCHANGED
```

O4-E is additive and O4-D-native. It must never synthesize or label any value as a K3 `ContextBundle` or `bundleIdentity`.

## Required focused test matrix

The implementation must include independently named tests covering at least:

- positive single changed path;
- positive multiple changed paths and canonical order;
- supporting-context preservation;
- deterministic request generation;
- deterministic repeated execution identity for identical normalized evidence;
- explicit provider/model binding;
- exact text byte preservation including CRLF;
- repository prompt-injection text remains untrusted data;
- no tools in model request;
- AbortSignal passed to provider;
- blocked O4-D admission never invokes provider;
- pre-execution head mismatch never invokes provider;
- post-execution head movement yields `STALE`;
- provider exception -> zero-claim `PROVIDER_FAILED`;
- timeout -> zero-claim `TIMED_OUT`;
- malformed JSON -> `INVALID_PROVIDER_OUTPUT`;
- tool calls -> `INVALID_PROVIDER_OUTPUT`;
- non-stop finish reason -> `INVALID_PROVIDER_OUTPUT`;
- unknown top-level provider field rejected;
- unknown claim field rejected;
- claim count/string/range bounds rejected;
- fabricated evidence item rejected;
- unrelated-path evidence rejected;
- duplicate evidence reference rejected;
- invalid severity/confidence rejected;
- authority-field injection rejected;
- O4-D identity mutation rejected by predecessor validator;
- no env/secret/provider-construction imports;
- no network client import in O4-E itself;
- no filesystem/process/GitHub-write/persistence/telemetry imports;
- schema meta-validation;
- representative canonical result validates against schema;
- exact three-path allowlist;
- full runtime suite remains green.

Focused suite must contain at least 32 independently named cases.

## Non-grants

This authorization does not grant:

```text
ENV_OR_SECRET_READ
PROVIDER_CONSTRUCTION
PROVIDER_REGISTRY_SELECTION
CREDENTIAL_OR_ENDPOINT_CONFIGURATION
FALLBACK_OR_RETRY_POLICY
GITHUB_REVIEW_OR_COMMENT_PUBLICATION
GITHUB_WRITE_TOKEN_USE
PERSISTENCE_OR_QUEUE
TELEMETRY_OR_GLITCHTIP_ADOPTION
K3_IMPERSONATION
KRI_R3_CONTRACT_MUTATION
K2_MUTATION
AUTOFIX
O5_SANDBOX_WORK
RELEASE_VERSION_SELECTION
TAG_OR_GITHUB_RELEASE
PACKAGE_PUBLICATION
DEPLOYMENT
PRODUCTION_READINESS_CLAIM
PROJECT_COMPLETION
```

## Qualification and closure

Authorization candidate qualification requires exact one-path scope, local governance checks, substantive exact-head review, original applicable PR CI, zero unresolved actionable threads, active no-bypass ruleset, normal expected-head-guarded merge, original applicable post-merge checks, exact tree/blob preservation, and external post-merge proof.

Only then may `O4E_MODEL_BACKED_O4D_REVIEWER_PROVIDER_EXECUTION_AUTHORIZATION = CLOSED_CANONICAL` be asserted. The implementation itself requires its own exact-head qualification and post-merge proof.
