# Kodac K6-R4 Privacy-Governed Outcome Memory Authorization

## Record identity

- Date: 2026-08-26
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-26`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION AUTHORIZATION CANDIDATE
- Canonical base commit: `84c6a97a02d6e0478a6dbe681e24349cf79df9e7`
- Canonical base tree: `7c3dd9ca1969833a289b4446e9e3a0a38fce59c4`
- P0 roadmap-truth reconciliation merge: `84c6a97a02d6e0478a6dbe681e24349cf79df9e7` (PR #210)
- K6-R3 canonical merge: `4ed9bed6fdb23643c722298adfba4ae8e72097b2` (PR #208)
- Governing K6 planning authorization: `docs/planning/KODAC_K6_DEFINITION_AND_PLANNING_AUTHORIZATION_2026-08-26.md`
- Governing improvement plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Governing constitution: `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`
- Canonical event/evidence direction: `docs/adr/ADR-0005-canonical-session-event-tool-protocol.md`
- Mandatory side-effect trust boundary: `docs/adr/ADR-0006-mandatory-trust-hook-side-effects.md`
- Canonical K6-R3 authorization: `docs/planning/KODAC_K6_R3_ROUTE_OUTCOME_LINKAGE_AUTHORIZATION_2026-08-26.md`
- Canonical K6-R3 runtime contract: `packages/kodac-runtime/src/evidence-router/outcome-linkage-contracts.ts`
- Canonical K6-R3 materializer: `packages/kodac-runtime/src/evidence-router/outcome-linkage.ts`

## Decision

Authorize one later bounded K6-R4 implementation PR, and only that implementation PR, after this exact authorization record is canonically adopted and post-merge proven.

K6-R4 v1 is a **pure deterministic privacy-governed outcome-record and in-memory snapshot contract** over already-materialized K6-R3 route-outcome linkage evidence.

It deliberately does **not** authorize a filesystem store, database, network service, daemon, cache service, telemetry pipeline, vector store, training loop, strategy promoter, or any other side-effecting persistence implementation.

```text
K6-R4 = PRIVACY-GOVERNED BOUNDED OUTCOME RECORD / MEMORY CONTRACT
R4 RUNTIME I/O = NONE
R4 PERSISTENCE EXECUTOR = NOT AUTHORIZED
R4 NETWORK / UPLOAD / TELEMETRY = NOT AUTHORIZED
R4 TRAINING / LEARNING MUTATION = NOT AUTHORIZED
R4 STRATEGY PROMOTION = NOT AUTHORIZED
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
```

This is intentional. The K6 constitution already establishes:

```text
OUTCOME DATA != PERMISSION TO LEARN OR PERSIST
SELF-IMPROVING != SELF-AUTHORIZING
ROUTING EVIDENCE != EXECUTION AUTHORITY
```

R4 therefore establishes exact privacy, minimization, identity, isolation, lifecycle and conflict semantics first. Any future act that actually writes a snapshot to durable storage remains a separately authorized side effect and must traverse the canonical K2 `ExecutionGateway` / Trust Kernel path.

## Exact bounded question

R4 v1 answers exactly one question:

> Given one exact canonical K6-R3 route-outcome linkage envelope, one caller-materialized opaque owner scope, explicit caller-materialized lifecycle times, and one already-materialized R4 memory snapshot, what minimized immutable outcome record and deterministic next snapshot are valid under exact repository/owner/privacy isolation, retention, deletion, expiry, conflict and supersession rules?

R4 does not decide what should execute, which provider is better, whether a strategy should be promoted, whether a task is complete, or whether any data should be durably stored.

## Governing invariants

```text
OUTCOME MEMORY != DURABLE STORAGE AUTHORITY
OUTCOME MEMORY != TELEMETRY
OUTCOME MEMORY != TRAINING DATA
OUTCOME MEMORY != CROSS-REPOSITORY LEARNING
OUTCOME MEMORY != ROUTE PREFERENCE
OUTCOME MEMORY != STRATEGY PROMOTION
OUTCOME MEMORY != PROVIDER QUALIFICATION
OUTCOME MEMORY != DONE GATE
OUTCOME MEMORY != PROVEN_READY
DELETION != HIDDEN ARCHIVAL RETENTION
EXPIRED != ACTIVE
SUPERSEDED != CONCURRENT WINNER
CALLER CLOCK != TRUSTED WALL-CLOCK PROOF
```

R4 must preserve K6-R1/R2/R3, K5, KRI, K2 and Done Gate ownership. Information may be linked or minimized; authority never follows that information flow.

## Privacy classification and isolation

R4 reuses the closed K6-R1 privacy vocabulary exactly:

```text
PUBLIC
REPOSITORY_PRIVATE
SENSITIVE
```

For every admitted R3 envelope, the R4 privacy class is an exact projection of:

```text
routePlanRequest.privacyClass
```

R4 must not infer, downgrade, upgrade, remap or merge privacy classes.

Every R4 memory snapshot is isolated by the exact triple:

```text
repositoryIdentity
ownerScopeId
privacyClass
```

Where:

- `repositoryIdentity` is a deterministic SHA-256 digest derived from the validated R3 `repositoryId`; the raw repository identifier is not retained in R4 memory;
- `ownerScopeId` is a caller-materialized opaque 64-character lowercase hexadecimal authority-scope identity; R4 never accepts or stores a raw user name, email, account name or other human-readable owner identity;
- `privacyClass` is the exact R1/R3 privacy class.

One memory snapshot may contain only records and tombstones for one exact scope triple. Cross-repository, cross-owner and cross-privacy admission fail closed.

`PUBLIC` does not disable owner/repository isolation. It only preserves the upstream privacy classification.

## Local-first and persistence authority

The exact R4 v1 persistence posture is:

```text
R4_MEMORY_REPRESENTATION = JSON-COMPATIBLE IMMUTABLE VALUE
R4_RUNTIME_STORAGE_MODE = CALLER-MANAGED / IN-PROCESS VALUE ONLY
R4_FILESYSTEM_READ = NO
R4_FILESYSTEM_WRITE = NO
R4_DATABASE_READ = NO
R4_DATABASE_WRITE = NO
R4_NETWORK = NO
R4_REMOTE_FALLBACK = NO
R4_BACKGROUND_SERVICE = NO
R4_TELEMETRY = NO
R4_UPLOAD = NO
```

A caller may hold the returned memory value in process. R4 itself performs no persistence side effect.

If a future canonical slice chooses to durably store an R4 snapshot, that storage operation must be separately authorized, locally scoped by default, fail closed on unauthorized remote fallback, and execute through K2. This R4 authorization does not register or grant such a capability.

A deserialized or caller-supplied R4 memory is always untrusted input and must pass the full R4 validator before use. Failure is terminal validation failure; no permissive partial load is allowed.

## Prohibited raw or sensitive content

R4 uses exact-key closed records. There is no extension bag, metadata map, note field, arbitrary label map or free-form payload field.

The persisted/returned R4 memory representation must not contain any of the following raw content:

- source-code text;
- file contents;
- diff or patch text;
- prompt text;
- chat/model messages;
- secrets, tokens, credentials or environment values;
- shell commands or command arguments;
- stdout or stderr bodies;
- execution-receipt bodies;
- verification-report bodies;
- K5 proof-package or reconciliation payload bodies;
- Done Gate reason strings or evidence-reference bodies;
- reviewer finding text;
- reviewer/model/provider response content;
- arbitrary user notes;
- raw user names, emails, account identifiers or display names;
- raw repository identifiers;
- raw task identifiers;
- raw candidate identifiers;
- raw provider names;
- raw model names.

The implementation tests must plant unique sentinel values into every relevant upstream raw field and prove those sentinels are absent from canonical serialized R4 memory output.

## Exact identity derivations

R4 uses the canonical K6 JSON serialization helper already owned by the R1 contract and SHA-256 from `node:crypto`.

All identity inputs are domain-separated closed objects.

### Repository identity

```text
repositoryIdentity = SHA256(canonicalK6R1Json({
  kind: "K6_R4_REPOSITORY",
  repositoryId: validatedR3.linkage.repositoryId
}))
```

### Task identity

```text
taskIdentity = SHA256(canonicalK6R1Json({
  kind: "K6_R4_TASK",
  taskId: validatedR3.linkage.taskId
}))
```

### Candidate identity

For every linked execution observation:

```text
candidateIdentity = SHA256(canonicalK6R1Json({
  kind: "K6_R4_CANDIDATE",
  candidateId,
  candidateKind,
  provider,
  model
}))
```

The raw candidate/provider/model strings are used only transiently for this derivation and are not retained in the R4 record.

### Record, tombstone and memory identities

`recordIdentity`, `tombstoneIdentity` and `memoryIdentity` are SHA-256 digests over their exact canonical identity-input objects with their own identity field omitted and with an exact version field included.

No identity may depend on object insertion order, host locale, wall clock, filesystem state, process state, random values, iteration over a `Set`/`Map`, or provider/model output beyond the already-materialized validated R3 fields.

## Contract versions

The implementation must expose exactly these version constants:

```text
K6_R4_OUTCOME_RECORD_VERSION = "kodac-k6-r4-outcome-record-v1"
K6_R4_TOMBSTONE_VERSION = "kodac-k6-r4-outcome-tombstone-v1"
K6_R4_MEMORY_VERSION = "kodac-k6-r4-outcome-memory-v1"
K6_R4_OPERATION_VERSION = "kodac-k6-r4-outcome-memory-operation-v1"
```

## Exact minimized active record

An active R4 outcome record has exactly these top-level fields:

```text
version
recordIdentity
scope
source
outcome
lifecycle
```

### `scope`

Exactly:

```text
repositoryIdentity
ownerScopeId
privacyClass
```

### `source`

Exactly:

```text
routeOutcomeLinkageIdentity
routePlanIdentity
requestIdentity
canonicalBase
candidateHead
taskIdentity
```

Every source field except `taskIdentity` is an exact projection from the validated R3 linkage. `taskIdentity` is the exact digest defined above.

### `outcome`

Exactly:

```text
verificationPassed
k5ReconciliationIdentity
k5Status
doneGateOutcomeIdentity
doneGateStatus
executionOutcomes
```

Each `executionOutcomes[]` element has exactly:

```text
planStepIndex
candidateIdentity
role
executionResultStatus
```

The array preserves the validated R3 execution-observation order. The only candidate data retained is the digest `candidateIdentity`.

R4 does not recalculate or reinterpret verification, K5, execution or Done Gate states.

### `lifecycle`

Exactly:

```text
observedAtUnixMs
expiresAtUnixMs
supersedesRecordIdentity
```

`observedAtUnixMs` and `expiresAtUnixMs` are caller-materialized non-negative safe integers. R4 does not call `Date.now()` or any host clock.

Requirements:

```text
expiresAtUnixMs > observedAtUnixMs
supersedesRecordIdentity = null for APPEND
supersedesRecordIdentity = exact replaced record identity for SUPERSEDE
```

There is no implicit infinite retention and no hidden default TTL. Every active record carries an explicit expiry selected by the caller/policy outside R4 and included in the record identity.

The timestamps are lifecycle inputs, not verified claims that Kodac observed a trusted wall clock.

## Logical subject and active-record uniqueness

Within one scope triple, `taskIdentity` is the v1 logical outcome subject.

A valid memory may contain at most one active record for a given `taskIdentity`.

A second different active outcome for the same task is a conflict unless it is introduced by the explicit `SUPERSEDE` operation against the current active record.

No last-write-wins behavior exists.

## Exact tombstone

A tombstone has exactly:

```text
version
tombstoneIdentity
scope
recordIdentity
taskIdentity
transition
transitionAtUnixMs
expiresAtUnixMs
replacementRecordIdentity
```

Closed transition vocabulary:

```text
DELETED
EXPIRED
SUPERSEDED
```

Rules:

- tombstones contain no outcome payload;
- `replacementRecordIdentity` is non-null only for `SUPERSEDED`;
- `replacementRecordIdentity` is null for `DELETED` and `EXPIRED`;
- `expiresAtUnixMs > transitionAtUnixMs`;
- tombstone scope must equal the containing memory scope;
- tombstone `recordIdentity` and `taskIdentity` must exactly identify the removed active record;
- a retained tombstone blocks exact-record resurrection until the tombstone itself is explicitly purged after expiry.

Tombstones are deliberately minimal anti-resurrection/conflict evidence, not hidden archival outcome storage.

## Exact memory snapshot

An R4 memory has exactly:

```text
version
memoryIdentity
scope
records
tombstones
```

Rules:

- `scope` is the exact repository/owner/privacy triple;
- all records and tombstones must match that scope exactly;
- `records` are canonicalized in ascending `recordIdentity` order;
- `tombstones` are canonicalized in ascending `tombstoneIdentity` order;
- duplicate identities are rejected;
- duplicate active `taskIdentity` values are rejected;
- an identity may not be simultaneously active and tombstoned;
- every record/tombstone identity and the memory identity must be recomputed during validation;
- no object/array is trusted merely because it was previously emitted by R4.

The returned memory and all nested structures must be frozen/immutable in the same public style as existing R1-R3 outputs.

## Exact operation vocabulary

The only R4 v1 mutations are pure value-to-value transitions:

```text
APPEND
SUPERSEDE
DELETE
EXPIRE
PURGE_TOMBSTONE
```

Every operation has exact closed keys and version `kodac-k6-r4-outcome-memory-operation-v1`.

### APPEND

Input contains:

```text
version
kind = "APPEND"
ownerScopeId
observedAtUnixMs
expiresAtUnixMs
routeOutcomeLinkageEnvelope
```

Requirements:

1. validate the full R3 envelope through the canonical R3 validator before reading R4 projections;
2. derive repository/task/candidate identities exactly as defined above;
3. derive privacy class exactly from the validated R3 route request;
4. require the resulting scope to equal the memory scope;
5. reject a different active record with the same `taskIdentity`;
6. reject a record identity currently protected by a retained tombstone;
7. an already-active byte/semantic-identical record is idempotent and returns the same canonical memory value;
8. otherwise append the new record and recompute canonical ordering and `memoryIdentity`.

### SUPERSEDE

Input contains:

```text
version
kind = "SUPERSEDE"
targetRecordIdentity
ownerScopeId
observedAtUnixMs
expiresAtUnixMs
tombstoneExpiresAtUnixMs
routeOutcomeLinkageEnvelope
```

Requirements:

1. target must identify exactly one current active record;
2. validate and derive the replacement exactly as for APPEND;
3. replacement scope and `taskIdentity` must equal the target scope and `taskIdentity`;
4. replacement `recordIdentity` must differ from target identity;
5. replacement lifecycle `supersedesRecordIdentity` equals the exact target identity;
6. `observedAtUnixMs` must be greater than or equal to the target `observedAtUnixMs`;
7. create one `SUPERSEDED` tombstone for the target with `replacementRecordIdentity` equal to the new record identity;
8. require `tombstoneExpiresAtUnixMs > observedAtUnixMs`;
9. atomically, as one pure return value, remove target payload, add tombstone, add replacement, sort, and recompute memory identity.

No implicit conflict resolution or “newer wins” rule exists.

### DELETE

Input contains:

```text
version
kind = "DELETE"
targetRecordIdentity
transitionAtUnixMs
tombstoneExpiresAtUnixMs
```

Requirements:

1. target must identify exactly one current active record;
2. `transitionAtUnixMs >= target.lifecycle.observedAtUnixMs`;
3. `tombstoneExpiresAtUnixMs > transitionAtUnixMs`;
4. remove the complete active outcome payload;
5. add a minimal `DELETED` tombstone with no replacement identity;
6. sort and recompute memory identity.

A deletion transition is not permission to retain the removed payload elsewhere.

### EXPIRE

Input contains:

```text
version
kind = "EXPIRE"
targetRecordIdentity
transitionAtUnixMs
tombstoneExpiresAtUnixMs
```

Requirements:

1. target must identify exactly one current active record;
2. `transitionAtUnixMs >= target.lifecycle.expiresAtUnixMs`;
3. `tombstoneExpiresAtUnixMs > transitionAtUnixMs`;
4. remove the complete active outcome payload;
5. add a minimal `EXPIRED` tombstone;
6. sort and recompute memory identity.

R4 never consults a host clock. A later consumer must not treat an active record as fresh merely because an EXPIRE operation has not yet been applied; any consumer using time validity must provide its own caller-materialized `asOf` value and fail closed on `asOf >= expiresAtUnixMs`.

### PURGE_TOMBSTONE

Input contains:

```text
version
kind = "PURGE_TOMBSTONE"
targetTombstoneIdentity
transitionAtUnixMs
```

Requirements:

1. target must identify exactly one current tombstone;
2. `transitionAtUnixMs >= tombstone.expiresAtUnixMs`;
3. remove the tombstone completely;
4. sort and recompute memory identity.

After purge, R4 intentionally retains no hidden anti-resurrection history for that tombstone. Privacy retention wins over indefinite hidden history.

## Conflict and idempotency semantics

Fail closed with structural `TypeError` unless otherwise identified as a resource `RangeError` when any of the following occurs:

- foreign repository/owner/privacy scope;
- duplicate active `taskIdentity`;
- duplicate or forged record/tombstone/memory identity;
- APPEND of a different active outcome for an already-active task;
- APPEND of a still-tombstoned exact record identity;
- SUPERSEDE of a missing/non-active target;
- SUPERSEDE across task/scope boundaries;
- DELETE or EXPIRE of a missing/non-active target;
- EXPIRE before record expiry;
- tombstone purge before tombstone expiry;
- contradictory replacement identity;
- malformed or forged R3 predecessor;
- unknown fields, unsupported enum values, non-data properties, getters/accessors, proxies, symbols, sparse arrays, cycles or unexpected prototypes;
- invalid Unicode scalar values;
- identity mismatch after canonical recomputation.

No conflict path may silently choose a winner.

The only idempotent no-op is an exact APPEND whose derived active record is already present byte/semantically identically in the same validated memory.

## No resurrection by implicit replay

While a tombstone remains active, the exact removed `recordIdentity` cannot be appended again.

Superseded records cannot become active again merely because an older operation is replayed.

After a tombstone's explicit expiry and `PURGE_TOMBSTONE`, R4 keeps no hidden history. A later record admission is judged from the then-current memory only.

## Resource-safety bounds

R4 v1 uses closed parser/validation safety bounds. These are not vendor quotas or product usage limits.

The implementation must define and enforce constants for at least:

```text
maxDepth = 32
maxNodes = 100000
maxTotalStringChars = 4000000
maxActiveRecords = 4096
maxTombstones = 8192
maxExecutionOutcomesPerRecord = 4096
maxOwnerScopeIdBytes = 64
maxIdentityBytes = 64
```

R3 predecessor objects remain subject to their own stricter limits and canonical validator.

These limits bound one in-memory contract value and hostile-input traversal. They do not establish a daily/file/review quota and do not authorize hidden truncation. Exceeding a bound fails closed with `RangeError`.

## Hostile-input and immutability rules

Validation and materialization must not trigger:

- caller getters/setters;
- proxy traps beyond the explicit proxy rejection check;
- custom iterators;
- `toJSON`;
- coercion hooks;
- prototype methods;
- filesystem/network/process effects.

Only plain objects, plain dense arrays and exact enumerable data properties are accepted.

Inputs are never mutated. Outputs are deeply frozen/immutable.

## Exact allowed runtime imports

R4 production source may import only:

```text
node:crypto
node:util
packages/kodac-runtime/src/evidence-router/contracts.ts
packages/kodac-runtime/src/evidence-router/outcome-linkage-contracts.ts
```

`node:crypto` is limited to SHA-256 identity derivation.

`node:util` is limited to fail-closed proxy detection.

The R1 contract import is limited to canonical K6 JSON and the canonical privacy vocabulary/types needed for parity.

The R3 contract import is limited to the canonical R3 validator and types/projections required by this R4 contract.

R4 production source must not import `node:fs`, `node:path`, `node:http`, `node:https`, `node:net`, `node:tls`, child-process/process-execution helpers, database clients, telemetry clients, model/provider/reviewer/evaluator implementations, K2 executors, or any package not already present in the repository.

## Immutable predecessor pins for the future implementation gate

The later R4 implementation workflow must prove that these already-canonical predecessor blobs remain unchanged from this authorization basis unless a replacement R4 authorization is canonically adopted:

| Path | Required blob |
| --- | --- |
| `docs/planning/KODAC_K6_R3_ROUTE_OUTCOME_LINKAGE_AUTHORIZATION_2026-08-26.md` | `b7c68a4e963a0d082fd966b2cfdab44095d107dd` |
| `.github/workflows/k6-r3-route-outcome-linkage.yml` | `7fdf087cab22719485b9aadd98568f9669cf3be1` |
| `schema/k6-r3-route-outcome-linkage.schema.json` | `70125dfeead8fa18ae7bddc909d611e92b5b1873` |
| `packages/kodac-runtime/src/evidence-router/contracts.ts` | `dc29c4ce85340312f28b67604cac01c1d775e370` |
| `packages/kodac-runtime/src/evidence-router/outcome-linkage-contracts.ts` | `eb49af7282ba9c60ac2d874dd71798867e39284e` |
| `packages/kodac-runtime/src/evidence-router/outcome-linkage.ts` | `7349d8d84f698aced133d5932dae910bc01deb9b` |
| `packages/kodac-runtime/test/k6-r3-route-outcome-linkage.test.ts` | `9f79a44d8def5f04b943f9d4e7c87deba15bf61f` |
| `packages/kodac-runtime/src/index.ts` | `f5f5c68de90e23ad07af4a0489cf85e57fe46cfe` |
| `tools/validate_provenance.py` | `e312be037d5a7e4d6645b7056cb948486d035848` |

The workflow must also pin this R4 authorization document to the exact blob that becomes canonical when this candidate is adopted.

If any required predecessor drifts before R4 implementation qualification, the implementation must stop and a replacement authorization is required. R4 must not silently reimplement or reinterpret a drifted predecessor.

## Authorized K6-R4 implementation surface

After and only after canonical adoption and post-merge proof of this authorization record, one K6-R4 implementation PR is authorized to change exactly these six paths and no others:

```text
.github/workflows/k6-r4-privacy-governed-outcome-memory.yml
schema/k6-r4-privacy-governed-outcome-memory.schema.json
packages/kodac-runtime/src/evidence-router/outcome-memory-contracts.ts
packages/kodac-runtime/src/evidence-router/outcome-memory.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k6-r4-privacy-governed-outcome-memory.test.ts
```

No seventh path is authorized.

`packages/kodac-runtime/src/index.ts` may change only by appending exactly these two exports after the complete canonical pre-R4 file bytes:

```text
export * from "./evidence-router/outcome-memory-contracts.ts"
export * from "./evidence-router/outcome-memory.ts"
```

Every pre-R4 export line and order must remain byte-for-byte unchanged.

No dependency, lockfile, package manifest, documentation, K2/K5/KRI/Done Gate source, R1/R2/R3 source, provider/model/reviewer implementation, storage adapter, database, telemetry, secret, release artifact, PR #163 or Z0-family path is authorized to change.

If the contract cannot be implemented inside this exact six-path surface, implementation stops and a replacement canonical authorization is required.

## Public JSON Schema requirements

The new schema must use Draft 2020-12 and exact `$id`:

```text
https://kodac.dev/schema/k6-r4-privacy-governed-outcome-memory.schema.json
```

The public root is the validated R4 `outcomeMemory` representation.

The schema must:

- use `additionalProperties: false` / equivalent closed-object semantics at every R4 object layer;
- expose reusable `$defs` for scope, active record, source, outcome, execution outcome, lifecycle, tombstone, memory and each operation shape;
- reference the canonical R3 schema for APPEND/SUPERSEDE operation predecessor envelopes rather than copying the R3 shape;
- carry exact enum parity with runtime privacy, K5, Done Gate, execution-result, role, tombstone-transition and operation-kind vocabularies;
- carry the structural array/string bounds that Draft 2020-12 can express;
- never imply that standalone schema validation proves cross-record identity, expiry, supersession, R3 semantic validity or deterministic hash invariants that JSON Schema cannot express.

A dedicated executable TypeScript validator/materializer must enforce all invariants that JSON Schema alone cannot express, including UTF-8 byte bounds, canonical identity recomputation, scope derivation, R3 semantic validation, active-task uniqueness, lifecycle ordering, tombstone anti-resurrection, explicit supersession, and privacy-minimization projection.

## Future implementation API surface

The implementation may expose only pure helpers needed for this contract, including equivalents of:

```text
deriveK6R4RepositoryIdentity(repositoryId)
deriveK6R4TaskIdentity(taskId)
deriveK6R4CandidateIdentity(candidateProjection)
createK6R4EmptyOutcomeMemory(scopeInput)
validateK6R4OutcomeMemory(value)
validateK6R4OutcomeMemoryOperation(value)
applyK6R4OutcomeMemoryOperation(memory, operation)
```

Names may be refined during implementation only when the semantic surface remains exactly equivalent and reviewers can prove there is no authority expansion.

No API may open/read/write a file, connect to a network/database, spawn a process, inspect environment secrets, invoke a provider/model/reviewer, or register an execution capability.

## Dedicated workflow requirements

The authorized workflow path is the sole new workflow/configuration path for R4.

It must:

1. run only on PRs to `main` touching the six-path R4 implementation surface;
2. use immutable full-SHA GitHub Action references;
3. use read-only repository permissions;
4. attest exact repository/base/head identities and exact six-path scope;
5. pin the canonical R4 authorization merge SHA/tree/document blob after adoption;
6. pin all predecessor blobs listed above;
7. prove the pre-R4 `index.ts` bytes are an exact prefix and the only suffix is the two authorized exports;
8. fail if unauthorized production imports are introduced;
9. validate Draft 2020-12 schema registration and schema/runtime enum/bound parity;
10. run strict TypeScript validation in an isolated temporary tooling directory without mutating repository manifests or lockfiles;
11. run the focused R4 test;
12. run the canonical R3, R2 and R1 focused regressions;
13. run the full runtime test suite;
14. run canonical Python tests, Ruff and provenance validation;
15. prove checkout cleanliness before and after validation;
16. fail closed on any predecessor, authorization, scope, action-pin, schema/runtime or workspace mutation drift.

The workflow may use the same locked temporary TypeScript validation pattern already canonically used by R3; it may not add repository dependencies or execute install lifecycle scripts.

## Required focused tests

The R4 implementation test must include at least:

### Positive / determinism

- exact R3-to-R4 minimized record projection;
- exact repository/task/candidate digest derivation;
- exact privacy projection for each `PUBLIC`, `REPOSITORY_PRIVATE`, `SENSITIVE` class;
- deterministic record/tombstone/memory identities;
- canonical record/tombstone sorting independent of benign input array order where semantics permit;
- exact APPEND idempotency;
- deep output immutability;
- caller input immutability.

### Isolation / minimization

- cross-repository admission rejection;
- cross-owner admission rejection;
- cross-privacy admission rejection;
- duplicate active task rejection;
- sentinel proof that raw repository/task/candidate/provider/model strings are absent from serialized R4 memory;
- sentinel proof that prompt/code/diff/secret/command/stdout/stderr/reason/finding/output text cannot be retained through any exact R4 field;
- unknown-field rejection at every R4 object layer.

### Lifecycle

- DELETE removes complete active payload and creates only minimal tombstone data;
- EXPIRE before expiry rejects;
- EXPIRE at/after expiry succeeds;
- SUPERSEDE requires exact active target and same task/scope;
- SUPERSEDE creates replacement and minimal tombstone atomically;
- no last-write-wins conflict path;
- retained tombstone blocks exact-record resurrection;
- PURGE_TOMBSTONE before tombstone expiry rejects;
- PURGE_TOMBSTONE at/after expiry removes the tombstone completely;
- no hidden history remains in the returned memory after purge.

### Hostile input / bounds

- forged R3 linkage/envelope rejection through the canonical R3 validator;
- getter/accessor rejection without getter execution;
- proxy rejection;
- symbol-field rejection;
- custom-prototype rejection;
- sparse-array rejection;
- cyclic-value rejection;
- invalid Unicode scalar rejection;
- negative/unsafe/`-0` timestamp rejection;
- every configured resource bound at boundary and over boundary;
- forged record/tombstone/memory identity rejection;
- serialization/canonicalization parity.

### No side effects

- static import proof that production R4 source has no filesystem/network/database/process/provider/reviewer/telemetry import;
- focused test must not require network access, credentials, provider accounts, local databases or persistent directories.

## Exact-head implementation qualification requirements

A later R4 implementation PR is not qualified unless the exact final head proves all of the following:

1. its base is the canonical R4 authorization merge required by the dedicated workflow, or a separately canonically reconciled replacement base;
2. exactly the six authorized implementation paths changed and no others;
3. the authorization document, R3 predecessor and all pinned predecessor blobs match exactly;
4. the dedicated `k6-r4-privacy-governed-outcome-memory` workflow is terminal success;
5. repository-required `provenance`, `legacy-tests` and `k2-runtime-gate` checks are terminal success;
6. fresh exact-head CodeRabbit review has zero unresolved material correctness, security, privacy, data-retention, authority-boundary or implementation findings;
7. fresh exact-head Qodo review has zero unresolved material correctness, security, privacy, data-retention, authority-boundary or implementation findings;
8. zero unresolved actionable review threads remain;
9. PR is open, non-draft, mergeable and `behind_by = 0` against the live qualified `main`;
10. active protected-main ruleset/protection is unchanged as required;
11. final head SHA, tree and all six blobs are captured;
12. `WAIVER=NO`.

Any new commit invalidates prior exact-head qualification evidence.

## Guarded implementation merge and post-merge proof

The later implementation merge must use normal GitHub merge-commit semantics with:

```text
expected_head_sha = exact qualified R4 implementation head
```

No squash, rebase, force-push, destructive history rewrite, stale-head reuse or review waiver.

After merge, prove before declaring R4 implementation canonical:

- `main` equals the merge commit;
- ordered parent 1 equals the exact pre-merge canonical main;
- ordered parent 2 equals the exact qualified implementation head;
- merge tree equals the qualified candidate tree where applicable;
- all six implementation blobs equal qualified blobs;
- GitHub merge signature is valid;
- protected-main ruleset remains active;
- applicable post-merge governance and R4 gates are terminal success;
- no unauthorized path was introduced;
- `WAIVER=NO`.

## R4 qualification / closeout meaning

After the implementation is canonically merged and post-merge proven, R4 may be closed only for this exact bounded v1 surface:

```text
PURE PRIVACY-GOVERNED MINIMIZED OUTCOME RECORD = PROVEN
PURE DETERMINISTIC IN-MEMORY SNAPSHOT / LIFECYCLE TRANSITIONS = PROVEN
REPOSITORY / OWNER / PRIVACY ISOLATION = PROVEN FOR CONTRACT V1
RETENTION / DELETE / EXPIRE / SUPERSEDE / TOMBSTONE PURGE SEMANTICS = PROVEN FOR CONTRACT V1
R4 RUNTIME PERSISTENCE = NOT IMPLEMENTED / NOT AUTHORIZED
R4 TELEMETRY / UPLOAD = NOT IMPLEMENTED / NOT AUTHORIZED
R4 TRAINING / LEARNING MUTATION = NOT IMPLEMENTED / NOT AUTHORIZED
R4 STRATEGY PROMOTION = NOT IMPLEMENTED / NOT AUTHORIZED
```

This bounded closeout is sufficient to establish the privacy semantics required before K6-R5 planning. It does not create durable-storage authority or support broad product claims.

## What becomes authorized after canonical adoption of this record

Only after this exact authorization record is merged and post-merge proven:

```text
K6-R4 IMPLEMENTATION = AUTHORIZED FOR THE EXACT SIX-PATH PURE V1 SURFACE
K6-R4 DURABLE PERSISTENCE = NOT AUTHORIZED
K6-R5 AUTHORIZATION-CANDIDATE PREPARATION = NOT YET AUTHORIZED UNTIL R4 IMPLEMENTATION/CLOSEOUT IS CANONICAL
K6-R5 IMPLEMENTATION = NOT AUTHORIZED
K6 BOUNDED CLOSEOUT = NOT AUTHORIZED
P2 KODACBENCH = NOT AUTHORIZED
```

## Preserved non-grants

```text
FILESYSTEM / DATABASE PERSISTENCE FROM R4 = NOT AUTHORIZED
REMOTE STORAGE / UPLOAD = NOT AUTHORIZED
TELEMETRY = NOT AUTHORIZED
MODEL / PROVIDER / REVIEWER / EVALUATOR INVOCATION = NOT AUTHORIZED
MODEL TRAINING / FINETUNING = NOT AUTHORIZED
EMBEDDINGS / VECTOR INFRASTRUCTURE = NOT AUTHORIZED
ONLINE OR OFFLINE LEARNING MUTATION = NOT AUTHORIZED
CROSS-REPOSITORY AGGREGATION / LEARNING = NOT AUTHORIZED
CROSS-USER SHARED LEARNING = NOT AUTHORIZED
STRATEGY SCORING / RANKING / PROMOTION = NOT AUTHORIZED
AUTOFIX = NOT AUTHORIZED
NEW DEPENDENCIES = NOT AUTHORIZED
NEW EXTERNAL SERVICES = NOT AUTHORIZED
K2 EXECUTION AUTHORITY EXPANSION = NOT AUTHORIZED
K5 AUTHORITY EXPANSION = NOT AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY CHANGE = NOT AUTHORIZED
GIT / GITHUB / REVIEW / APPROVAL / MERGE AUTHORITY FROM R4 = NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT AUTHORIZED
PR #163 / Z0-FAMILY MUTATION = NOT AUTHORIZED
```

## Exact scope of this authorization-candidate gate

This candidate may change exactly one path:

```text
docs/planning/KODAC_K6_R4_PRIVACY_GOVERNED_OUTCOME_MEMORY_AUTHORIZATION_2026-08-26.md
```

No second path is authorized in this PR.

No source, test, schema, fixture, workflow, dependency, lockfile, package manifest, roadmap, ADR, provenance policy, ruleset, protected lane, K2/K3/K4/K5/KRI/K6-R1/R2/R3 runtime, Done Gate, provider configuration, storage, secret, PR #163, Z0-family artifact or release artifact is changed.

## Canonical adoption gate for this record

This R4 authorization remains a non-canonical candidate unless the exact final authorization head proves all of the following:

1. PR base ref is exactly `main`;
2. live protected `main` and PR base are exactly `84c6a97a02d6e0478a6dbe681e24349cf79df9e7` with tree `7c3dd9ca1969833a289b4446e9e3a0a38fce59c4`, unless a replacement canonical base is explicitly reconciled by a forward commit and this record is amended/requalified;
3. the diff is exactly the one authorized documentation path;
4. all applicable exact-head repository CI is terminal success;
5. fresh exact-head CodeRabbit and Qodo reviews have zero unresolved material correctness, security, privacy, retention, governance or authority-boundary findings;
6. there are zero unresolved actionable review threads;
7. PR is open, non-draft, mergeable and `behind_by = 0`;
8. active protected-main ruleset/protection remains unchanged as required;
9. final candidate head, tree and document blob are captured;
10. merge uses normal merge-commit semantics guarded by the exact qualified `expected_head_sha`;
11. ordered merge parent 1 equals the pre-merge canonical main and parent 2 equals the exact qualified candidate head;
12. merge tree equals the qualified candidate tree and document blob equals the qualified candidate blob;
13. protected `main` equals the merge commit/tree and introduces exactly the one authorized path;
14. applicable post-merge governance/shared checks reach terminal success; and
15. `WAIVER=NO`.

If live `main` moves before merge, stop the stale merge path. Reconcile with live canonical truth using a normal forward commit/merge, update the candidate's recorded base where required, and requalify the resulting exact head from scratch. No stale-base exception exists.

## Stop boundary

Even after this authorization becomes canonical:

```text
DO NOT ADD ANY PATH OUTSIDE THE SIX-PATH R4 IMPLEMENTATION ALLOWLIST
DO NOT ADD A STORAGE ADAPTER
DO NOT WRITE A DATABASE OR FILE
DO NOT ADD TELEMETRY OR REMOTE FALLBACK
DO NOT INVOKE A PROVIDER / MODEL / REVIEWER
DO NOT TRAIN OR LEARN FROM R4 RECORDS
DO NOT PROMOTE A STRATEGY
DO NOT BEGIN K6-R5 UNTIL R4 IMPLEMENTATION IS MERGED, QUALIFIED AND POST-MERGE PROVEN
```

This record grants no later implementation, execution, persistence, learning, release or completion authority by implication.