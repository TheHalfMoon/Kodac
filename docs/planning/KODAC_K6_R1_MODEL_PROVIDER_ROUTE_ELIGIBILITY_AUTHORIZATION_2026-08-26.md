# Kodac K6-R1 Model-Provider Route Eligibility Authorization

## Record identity

- Date: 2026-08-26
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-26`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION AUTHORIZATION
- Canonical base commit: `2f167794a375bc913c377746419acf3bcc5ee0ab`
- Canonical base tree: `478e1768b7a3a1012faca5c95dded7cb2a983603`
- K6 definition / planning authorization merge: `2f167794a375bc913c377746419acf3bcc5ee0ab` (PR #202)
- K6 planning record blob: `0ff1e097edf5112ff01da3e54f27ddfc0ceb0526`
- Governing constitution: `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`
- Mandatory side-effect trust boundary: `docs/adr/ADR-0006-mandatory-trust-hook-side-effects.md`
- Existing model-provider contract: `packages/kodac-runtime/src/model/provider.ts` blob `a15f1d86ceab88ab6fa1be787719d222e354e0c4`
- Existing provider-qualification implementation: `packages/kodac-runtime/src/provider-qualification.ts` blob `2aeb08dac153b7044ba3ea7951ffc3ad4452d590`
- Existing KRI provider-neutral reviewer contract: `packages/kodac-runtime/src/reviewer-intelligence/provider-contracts.ts` blob `97e95f3cd19aebf63c86dba254bc8e55f919c031`
- Existing H1 extension/capability contract: `packages/kodac-runtime/src/extensions/contracts.ts` blob `8d022b6b0b26115aacbf4dfe7a0711c6868ee92c`
- Existing K4 compatibility contract: `packages/kodac-runtime/src/compatibility/contracts.ts` blob `5a1ba557c89c2c312789f94a9a495e262f411057`
- Existing K5 proof-package contract: `packages/kodac-runtime/src/proof-review/contracts.ts` blob `ef0ae26c2a44157fb20ad33145788ba1255239f5`
- Existing K5 proof-state reconciliation contract: `packages/kodac-runtime/src/proof-review/reconciliation-contracts.ts` blob `acf758a6f17180448c1c46b0397bfe6742b4f04b`
- Existing Done Gate: `packages/kodac-runtime/src/verification/done-gate.ts` blob `067e147569fa52cc2b04c5df26fbe20a01e958e9`
- Existing verification contract: `packages/kodac-runtime/src/verification/types.ts` blob `5c7006e6904f97791378a4a4367d569a6971c6af`
- Existing execution-receipt contract: `packages/kodac-runtime/src/evidence/receipt.ts` blob `214403398751c9d22bf695786c7fd7c6fd7e35e1`
- Shared runtime export index: `packages/kodac-runtime/src/index.ts` blob `824f6aaaa1d7c47a82e772a46dd6597b1819881d`

## Authority reconciliation

PR #202 is the latest canonical K6 authority. After its guarded merge and successful post-merge governance proof, it established:

```text
K6 DEFINITION: CANONICAL
K6 PLANNING / CONTRACT DESIGN: AUTHORIZED
K6-R1 AUTHORIZATION-CANDIDATE PREPARATION: AUTHORIZED
K6-R1 IMPLEMENTATION: NOT AUTHORIZED UNTIL A SEPARATE R1 AUTHORIZATION IS CANONICAL
```

Any older roadmap/status sentence that still says only `K6: PROPOSED / NOT AUTHORIZED` is stale with respect to K6 planning authority and does not override canonical merge `2f167794a375bc913c377746419acf3bcc5ee0ab`. It also does not independently authorize implementation. This record is the separate R1 authorization candidate required by PR #202.

## Decision

Authorize only the first bounded K6 implementation slice after canonical adoption and post-merge proof of this exact record:

```text
K6 — EVIDENCE ROUTER & OUTCOME LEARNING
K6: DEFINED / IN PROGRESS
K6-R1: PURE CALLER-MATERIALIZED MODEL-PROVIDER ROUTE ELIGIBILITY AUTHORIZED
K6-R1 IMPLEMENTATION: NOT YET CANONICAL
K6-R2+: NOT AUTHORIZED
ROUTE EXECUTION: NOT AUTHORIZED
OUTCOME PERSISTENCE / LEARNING: NOT AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY: UNCHANGED
K2 SIDE-EFFECT AUTHORITY: UNCHANGED
```

Until this record itself is canonically merged and passes the required post-merge proof, K6-R1 source/test/schema/workflow implementation remains unauthorized.

K6-R1 answers exactly one question:

> Given one exact caller-materialized route request and a bounded caller-materialized set of model-provider candidates with explicit provider-qualification evidence and caller-declared constraints, which candidates are structurally eligible to participate in a later route plan?

K6-R1 does **not** answer which candidate should win, does not score or rank candidates, does not invoke a provider, and does not create a route plan.

## Governing invariants

```text
CANDIDATE DECLARATION != QUALIFICATION EVIDENCE
QUALIFICATION PASS != ROUTE EXECUTION AUTHORITY
ROUTE ELIGIBILITY != ROUTE PREFERENCE
ROUTE ELIGIBILITY != PROVIDER INVOCATION
ROUTE ELIGIBILITY != REVIEWER TRUST
ROUTE ELIGIBILITY != DONE GATE VERDICT
ROUTE ELIGIBILITY != PROVEN_READY
SELF-IMPROVING != SELF-AUTHORIZING
```

K2 remains the sole trusted side-effect execution boundary. The existing Done Gate remains the only accepted `PROVEN_READY` / `NOT_READY` authority under its canonical contracts.

## Why R1 is model-provider-only

The K6 planning record deliberately requires a closed candidate-kind vocabulary. R1 uses the narrowest first vocabulary:

```text
MODEL_PROVIDER
```

No `REVIEWER`, `EVALUATOR`, `TOOL`, `AGENT`, `MCP`, `ACP`, or `AGENT_SKILL` candidate kind is admitted by R1.

This prevents K6-R1 from:

- treating one KRI reviewer run as reviewer qualification;
- inventing evaluator qualification semantics that do not yet exist;
- treating K4 registry membership as executable authority;
- routing executable tools or external protocol objects before a later explicit gate.

Later candidate kinds require separate canonical authorization.

## Pure-data boundary

K6-R1 is pure, deterministic, in-memory TypeScript. Every input is already materialized by the caller.

Production K6-R1 code may not:

- read files or directories;
- access Git or GitHub;
- access environment variables or secrets;
- access network sockets or HTTP clients;
- invoke models/providers/reviewers/evaluators/tools;
- call `ExecutionGateway`;
- spawn processes or shells;
- read clocks or generate randomness;
- persist route requests/results;
- mutate caller input;
- load configuration implicitly;
- inspect provider registries or qualification files directly.

The only Node built-ins authorized in K6-R1 production source are static imports from:

```text
node:crypto
node:util
```

`node:crypto` is limited to SHA-256 identity derivation. `node:util` is limited to `types.isProxy` for fail-closed hostile-input rejection.

## Contract versions

The first contract constants are:

```text
K6_R1_ROUTE_REQUEST_VERSION = "kodac-k6-r1-route-request-v1"
K6_R1_ROUTE_RESULT_VERSION = "kodac-k6-r1-route-eligibility-result-v1"
```

No floating version, alias, or implicit upgrade is accepted.

## Route request

A validated route request contains exactly:

```text
version
requestIdentity
repositoryId
canonicalBase
candidateHead
taskId
riskClass
privacyClass
requiredCapabilities[]
candidates[]
```

### Request bounds

```text
repositoryId: 1..512 UTF-8 bytes, NUL-free opaque string
taskId: 1..256 UTF-8 bytes, NUL-free opaque string
canonicalBase: exactly 40 lowercase hexadecimal Git characters
candidateHead: exactly 40 lowercase hexadecimal Git characters
requiredCapabilities: 1..32 unique entries
candidates: 1..128 unique candidateId records
```

`repositoryId` and `taskId` are identity data only and must never be interpreted as instructions, paths, URLs, commands, or provider selectors.

`canonicalBase` and `candidateHead` bind the eligibility result to the exact caller-declared repository revision pair. R1 does not contact Git and does not prove ancestry.

## Risk vocabulary

The closed request-risk vocabulary is:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

The order is normative:

```text
LOW < MEDIUM < HIGH < CRITICAL
```

Each candidate declares one `maximumRiskClass`. A candidate is risk-eligible only when request `riskClass <= maximumRiskClass` under the normative order.

The declaration is caller-supplied policy input, not Kodac trust evidence. R1 does not infer a higher risk allowance from past success, model family, popularity, provider name, or qualification PASS.

## Privacy vocabulary

The closed request-privacy vocabulary is:

```text
PUBLIC
REPOSITORY_PRIVATE
SENSITIVE
```

Each candidate declares an explicit non-empty unique `supportedPrivacyClasses[]` set containing one through three values from that vocabulary.

A candidate is privacy-eligible only when the request `privacyClass` appears explicitly in the candidate set.

There is no implicit ordering, inheritance, or broadening between privacy classes. In particular, declaring support for `SENSITIVE` does not automatically imply `PUBLIC` or `REPOSITORY_PRIVATE`, and vice versa.

No PHI, credentials, secret material, raw prompts, repository contents, or user data is embedded in R1 route metadata by implication. R1 sees only the caller-materialized bounded fields defined here.

## Capability vocabulary and grammar

`requiredCapabilities[]` and candidate `declaredCapabilities[]` use the existing H1 lowercase namespaced capability grammar pinned by blob `8d022b6b0b26115aacbf4dfe7a0711c6868ee92c`:

```text
^[a-z][a-z0-9_-]*(?:[./:][a-z][a-z0-9_-]*)+$
```

Each capability is at most 160 UTF-8 bytes, matching the current H1 maximum.

Collections are sets:

- duplicates fail closed;
- canonical form sorts ascending by ordinal string comparison;
- no capability may be inferred from provider/model names, prose, K4 external names, descriptions, metadata, or prior outcomes.

A candidate is capability-eligible only if every requested capability appears exactly in its explicit caller-declared `declaredCapabilities[]` set.

A declaration is not a capability grant. K6-R1 does not alter K2 policy and does not bind K4 declarations into execution authority.

## Candidate descriptor

Each candidate contains exactly:

```text
candidateId
candidateKind
provider
model
declaredCapabilities[]
maximumRiskClass
supportedPrivacyClasses[]
qualification
```

Rules:

```text
candidateKind = "MODEL_PROVIDER"
candidateId: 1..256 UTF-8 bytes, NUL-free opaque string
provider: 1..256 UTF-8 bytes, NUL-free opaque string
model: 1..512 UTF-8 bytes, NUL-free opaque string
declaredCapabilities: 0..64 unique H1-grammar capability identifiers
maximumRiskClass: one closed risk value
supportedPrivacyClasses: 1..3 unique closed privacy values
```

Candidate identifiers must be unique within one request.

`provider`, `model`, and `candidateId` are identity fields only. R1 must not open provider registries, resolve aliases, inspect environment configuration, or perform inference.

## Provider-qualification evidence projection

R1 does not ingest the full provider qualification report because that report contains operational evidence and artifact paths outside R1's pure-data scope.

Each candidate instead carries an exact caller-materialized projection with exactly:

```text
protocol
version
provider
model
workspaceDigest
status
reportDigest
```

Required values:

```text
protocol = "kodac.provider-qualification"
version = 1
status = PASS | FAIL | PENDING
workspaceDigest = 64 lowercase hexadecimal SHA-256 characters
reportDigest = 64 lowercase hexadecimal SHA-256 characters
```

The projection is evidence metadata only. R1 does not open or verify the report artifact.

Candidate qualification is accepted as current for R1 only when:

1. `qualification.provider === candidate.provider`;
2. `qualification.model === candidate.model`;
3. `qualification.status === "PASS"`;
4. `workspaceDigest` and `reportDigest` are structurally valid SHA-256 digests.

`FAIL` and `PENDING` are ineligible. An identity mismatch is ineligible, not silently rewritten.

Qualification PASS means only that the caller presented a PASS projection matching the current canonical provider-qualification protocol. It does not prove security, correctness, privacy suitability, capability support, task success, or execution authority.

## Structural validation versus eligibility

K6-R1 uses two explicit phases.

### Phase 1 — structural validation

Malformed contract input throws deterministic `TypeError` or `RangeError` before any eligibility result or identity is emitted.

Structural invalidity includes at least:

- unknown fields;
- missing required fields;
- unsupported versions/enums;
- proxies at any nesting depth;
- accessors/getters/setters;
- symbol keys;
- sparse arrays;
- cyclic structures;
- non-plain object prototypes;
- `undefined` values;
- non-finite numbers;
- unsafe integers;
- malformed Git/SHA-256 identities;
- malformed capability identifiers;
- NUL-bearing strings;
- invalid Unicode including unpaired surrogate code units;
- bound violations;
- duplicate candidate IDs, capabilities, or privacy values;
- a claimed `requestIdentity` that does not equal the deterministic recomputation.

A structurally invalid request has no valid route-eligibility result.

### Phase 2 — deterministic eligibility

Only after structural validation succeeds does R1 evaluate each candidate.

The result vocabulary is exactly:

```text
ELIGIBLE
INELIGIBLE
```

There is no `UNKNOWN`, `BEST`, `PREFERRED`, `SELECTED`, `READY`, `APPROVED`, or `PROVEN_READY` state in R1.

## Ineligibility reason codes

The closed reason-code vocabulary is:

```text
QUALIFICATION_NOT_PASS
QUALIFICATION_IDENTITY_MISMATCH
MISSING_REQUIRED_CAPABILITY
RISK_CLASS_UNSUPPORTED
PRIVACY_CLASS_UNSUPPORTED
```

Reasons are cumulative. R1 must report every applicable reason for a structurally valid candidate rather than stopping after the first failure.

A candidate is `ELIGIBLE` iff its reason set is empty.

## Deterministic reason ordering

When multiple reasons apply, output ordering is exactly:

```text
1. QUALIFICATION_IDENTITY_MISMATCH
2. QUALIFICATION_NOT_PASS
3. MISSING_REQUIRED_CAPABILITY
4. RISK_CLASS_UNSUPPORTED
5. PRIVACY_CLASS_UNSUPPORTED
```

`MISSING_REQUIRED_CAPABILITY` is emitted once per candidate, with `missingCapabilities[]` carrying the complete canonical sorted set of missing capability identifiers. No reason is duplicated.

## Eligibility result

A validated result contains exactly:

```text
version
resultIdentity
requestIdentity
repositoryId
canonicalBase
candidateHead
taskId
candidateResults[]
```

Each candidate result contains exactly:

```text
candidateId
candidateKind
provider
model
status
reasons[]
missingCapabilities[]
qualificationReportDigest
```

Candidate results are sorted by ascending ordinal `candidateId` regardless of caller input order.

The result does not contain a winner, ranking, score, probability, reward, historical success rate, price, latency preference, provider priority, fallback order, execution request, prompt, secret, tool call, or side-effect instruction.

## Canonical identities

R1 uses deterministic canonical JSON and SHA-256.

Requirements:

- input objects must already satisfy structural validation before canonicalization;
- object keys sort ascending by ordinal string comparison;
- arrays that represent sets are first canonicalized and sorted using the contract-specific order above;
- candidate results sort by `candidateId`;
- JSON strings retain exact valid Unicode scalar content with no Unicode normalization;
- numbers, where present, must be safe integers and use JSON numeric serialization;
- canonical UTF-8 bytes are SHA-256 hashed;
- derived identities are 64 lowercase hexadecimal characters.

`requestIdentity` hashes the complete validated request excluding `requestIdentity` itself.

`resultIdentity` hashes the complete validated result excluding `resultIdentity` itself.

Changing caller ordering of any set-valued input without changing its members must not change either identity.

Changing only `candidateId` changes request/result identity but cannot change whether the same candidate facts satisfy qualification/capability/risk/privacy predicates.

## Hostile-input and resource bounds

Before prototype inspection, key enumeration, descriptor inspection, array traversal, canonicalization, or identity construction, every object/array encountered recursively must first be checked using `node:util` `types.isProxy(value)`.

A proxy at any nesting depth fails closed without intentionally invoking proxy traps first.

The implementation must also enforce at least:

```text
max canonical depth: 32
max canonical nodes: 50,000
max candidates: 128
max required capabilities: 32
max declared capabilities per candidate: 64
max privacy classes per candidate: 3
max string field size: field-specific bounds above
```

Validation failure must not mutate caller objects or any previously returned result.

## Exact implementation allowlist

After and only after canonical adoption and post-merge proof of this authorization, K6-R1 implementation may change exactly:

```text
.github/workflows/k6-r1-model-provider-route-eligibility.yml
schema/k6-r1-model-provider-route-eligibility.schema.json
packages/kodac-runtime/src/evidence-router/contracts.ts
packages/kodac-runtime/src/evidence-router/eligibility.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k6-r1-model-provider-route-eligibility.test.ts
```

No seventh path is authorized.

No new dependency, lockfile, package manifest, provider configuration, provenance policy, ruleset, protected lane, K2 runtime, KRI runtime, K5 runtime, Done Gate, PR #163, Z0-family, public endpoint, secret, deployment, release, or persistence path is authorized.

## Shared export constraint

`packages/kodac-runtime/src/index.ts` may change only to export the new K6-R1 pure contracts/eligibility surface.

No existing export may be removed, renamed, redirected, reordered for semantic effect, or modified by R1.

The dedicated workflow must fail if the shared index changes beyond the exact K6-R1 export addition.

## Immutable predecessor drift pins

The dedicated K6-R1 workflow must fail closed if any of these exact predecessor blobs differ from the authorization baseline before the R1 candidate merges:

```text
packages/kodac-runtime/src/model/provider.ts
a15f1d86ceab88ab6fa1be787719d222e354e0c4

packages/kodac-runtime/src/provider-qualification.ts
2aeb08dac153b7044ba3ea7951ffc3ad4452d590

packages/kodac-runtime/src/reviewer-intelligence/provider-contracts.ts
97e95f3cd19aebf63c86dba254bc8e55f919c031

packages/kodac-runtime/src/extensions/contracts.ts
8d022b6b0b26115aacbf4dfe7a0711c6868ee92c

packages/kodac-runtime/src/compatibility/contracts.ts
5a1ba557c89c2c312789f94a9a495e262f411057

packages/kodac-runtime/src/proof-review/contracts.ts
ef0ae26c2a44157fb20ad33145788ba1255239f5

packages/kodac-runtime/src/proof-review/reconciliation-contracts.ts
acf758a6f17180448c1c46b0397bfe6742b4f04b

packages/kodac-runtime/src/verification/done-gate.ts
067e147569fa52cc2b04c5df26fbe20a01e958e9

packages/kodac-runtime/src/verification/types.ts
5c7006e6904f97791378a4a4367d569a6971c6af

packages/kodac-runtime/src/evidence/receipt.ts
214403398751c9d22bf695786c7fd7c6fd7e35e1
```

This pinning does not make those modules runtime imports. It prevents R1 from silently relying on changed predecessor semantics without a separate reconciliation gate.

The shared `src/index.ts` is intentionally not a fixed preimplementation blob after R1 begins because its one exact export addition is allowlisted; the workflow must instead compare its exact base-to-candidate diff.

## Required implementation proofs

A future K6-R1 implementation candidate must prove at least:

1. the diff is exactly the six allowlisted paths;
2. all predecessor drift pins above still match canonical main at the implementation base;
3. all route-request, candidate, qualification projection, risk, privacy, and capability structural bounds fail closed;
4. proxies/accessors/symbol keys/sparse arrays/cycles/non-plain prototypes fail before canonicalization or identity construction;
5. every H1 capability identifier obeys the exact pinned grammar and size bound;
6. qualification `FAIL` and `PENDING` are always ineligible;
7. provider/model qualification identity mismatches are always ineligible;
8. missing required capabilities are complete, unique, and canonically sorted;
9. risk comparison uses only the exact four-level order;
10. privacy support uses exact set membership with no implicit inheritance;
11. all applicable ineligibility reasons are cumulative and emitted in exact order;
12. structurally valid candidates with no reasons are `ELIGIBLE` and only those candidates are eligible;
13. candidate input ordering and set input ordering cannot change semantic result or identities;
14. caller objects are never mutated;
15. request/result identities are deterministic and fail on a forged claimed request identity;
16. exact positive and hostile fixtures pin expected SHA-256 identities;
17. no output contains winner/ranking/score/fallback/execution semantics;
18. no provider/reviewer/model/evaluator/tool invocation path exists;
19. no filesystem/network/process/secret/Git/GitHub/persistence path exists;
20. no K6 state can emit or imply Done Gate `PROVEN_READY`;
21. the shared export diff is the exact K6-R1 export addition only;
22. focused K6-R1 tests pass;
23. package typecheck/test gates pass;
24. repository-wide applicable regression gates pass;
25. exact-head CodeRabbit and Qodo reviews finish with zero unresolved material findings;
26. zero unresolved actionable review threads remain;
27. exact candidate head/tree and all six blob identities are captured before merge;
28. merge is guarded by the exact expected head SHA; and
29. applicable post-merge governance/shared/runtime gates reach terminal success.

## Required negative corpus

The implementation tests must contain inert deterministic negative cases for at least:

- zero candidates;
- more than 128 candidates;
- duplicate candidate IDs;
- zero required capabilities;
- duplicate required capabilities;
- malformed H1 capability identifiers;
- over-bound strings;
- unknown fields at every contract layer;
- unsupported versions;
- unsupported candidate kinds;
- unsupported risk/privacy values;
- qualification FAIL;
- qualification PENDING;
- qualification provider mismatch;
- qualification model mismatch;
- malformed report/workspace digests;
- missing required capabilities;
- unsupported request risk;
- unsupported request privacy;
- simultaneous qualification/capability/risk/privacy failures;
- forged request identity;
- reordered candidates and reordered set-valued inputs;
- nested proxy input;
- accessor property input;
- symbol-keyed input;
- sparse arrays;
- cyclic input;
- non-plain object prototype;
- unpaired surrogate input;
- canonical depth exhaustion;
- canonical node-count exhaustion.

No negative fixture may contain a credential, live provider request, network endpoint requiring access, executable command, or real side-effect instruction.

## Explicit non-grants

```text
K6-R2+: NOT AUTHORIZED
MODEL / PROVIDER INVOCATION: NOT AUTHORIZED
REVIEWER / EVALUATOR INVOCATION: NOT AUTHORIZED
ROUTE WINNER SELECTION: NOT AUTHORIZED
RANKING / SCORING / REWARD MODEL: NOT AUTHORIZED
AUTOMATIC FALLBACK: NOT AUTHORIZED
EXECUTIONGATEWAY CALL: NOT AUTHORIZED
NETWORK / SECRET ACCESS: NOT AUTHORIZED
FILESYSTEM / PROCESS / SHELL ACCESS: NOT AUTHORIZED
GIT / GITHUB ACCESS: NOT AUTHORIZED
REPOSITORY WRITE / REVIEW / APPROVAL / MERGE AUTHORITY FROM K6: NOT AUTHORIZED
PERSISTENT ROUTE / OUTCOME STORAGE: NOT AUTHORIZED
TELEMETRY: NOT AUTHORIZED
ONLINE OR OFFLINE LEARNING: NOT AUTHORIZED
VECTOR / EMBEDDING INFRASTRUCTURE: NOT AUTHORIZED
CROSS-REPOSITORY LEARNING: NOT AUTHORIZED
AUTOMATIC STRATEGY PROMOTION: NOT AUTHORIZED
KRI REVIEWER QUALIFICATION REINTERPRETATION: NOT AUTHORIZED
K4 REGISTRY MEMBERSHIP AS EXECUTION AUTHORITY: NOT AUTHORIZED
K5 JUDGMENT AS PROVEN_READY: NOT AUTHORIZED
DONE GATE MODIFICATION: NOT AUTHORIZED
NEW DEPENDENCIES / DONOR SOURCE: NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH: NOT AUTHORIZED
Z0 / Z0L / ZROK / PUBLIC ENDPOINT / PAYMENT / SECRET / GITHUB APP AUTHORITY: NOT AUTHORIZED
```

## Authorization PR scope

This authorization candidate itself may change exactly one path:

```text
docs/planning/KODAC_K6_R1_MODEL_PROVIDER_ROUTE_ELIGIBILITY_AUTHORIZATION_2026-08-26.md
```

It may not change source, tests, schemas, workflows, roadmap/status files, dependencies, lockfiles, package manifests, provenance policy, rulesets, protected lanes, provider configuration, K2/K3/K4/K5/KRI runtime, Done Gate, PR #163, Z0-family, secrets, deployment, or release artifacts.

## Canonical adoption gate for this authorization

K6-R1 implementation authority becomes effective only if this exact authorization record is canonically adopted with all of the following proven:

1. PR base ref is exactly `main`;
2. live protected `main` remains exactly `2f167794a375bc913c377746419acf3bcc5ee0ab` with tree `478e1768b7a3a1012faca5c95dded7cb2a983603` before merge;
3. the PR diff is exactly the one authorization-document path;
4. all applicable exact-head CI is terminal green;
5. fresh exact-head CodeRabbit and Qodo reviews have zero unresolved material findings;
6. zero unresolved actionable review threads remain;
7. final candidate head/tree/document blob are captured;
8. merge uses normal merge-commit semantics guarded by exact expected head SHA;
9. ordered merge parent 1 equals the pre-merge canonical main and parent 2 equals the exact qualified candidate head;
10. merge tree equals the qualified candidate tree and the authorization document blob equals the qualified candidate blob;
11. protected `main` equals the merge commit/tree and introduces exactly the authorized one path; and
12. applicable post-merge governance/shared checks reach terminal success.

If `main` advances before merge: STOP. Amend this authorization to record the replacement canonical base SHA/tree, forward-merge that exact `main` into the branch using normal non-destructive history, and requalify the new head from scratch for scope, CI, CodeRabbit, Qodo, threads, mergeability, tree, and blob.

No rebase, force-push, destructive history rewrite, stale-base exception, or review waiver is permitted.

## Post-canonical stop boundary

Even after this authorization becomes canonical:

```text
AUTHORIZED NEXT UNIT: K6-R1 IMPLEMENTATION ON THE EXACT SIX-PATH ALLOWLIST
K6-R2+: NOT AUTHORIZED
DO NOT INVOKE PROVIDERS
DO NOT ADD PERSISTENCE OR LEARNING
DO NOT MODIFY DONE GATE OR K2 AUTHORITY
```

The implementation must be a separate PR and must prove the contract above before any K6-R1 source can become canonical.