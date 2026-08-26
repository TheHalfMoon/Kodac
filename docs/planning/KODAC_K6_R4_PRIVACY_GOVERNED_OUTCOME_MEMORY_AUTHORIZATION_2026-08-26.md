# Kodac K6-R4 Privacy-Governed Outcome Memory Authorization

## Record identity

- Date: 2026-08-26
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-26`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION AUTHORIZATION CANDIDATE
- Canonical base commit: `84c6a97a02d6e0478a6dbe681e24349cf79df9e7`
- Canonical base tree: `7c3dd9ca1969833a289b4446e9e3a0a38fce59c4`
- P0 roadmap-truth reconciliation merge: `84c6a97a02d6e0478a6dbe681e24349cf79df9e7` (PR #210)
- K6-R3 canonical merge: `4ed9bed6fdb23643c722298adfba4ae8e72097b2` (PR #208)
- Canonical protected-main ruleset: `20707483` (`Kodac canonical main protection v1`)
- Ruleset trusted node ID: `RRS_lACqUmVwb3NpdG9yec5NVN5LzgE7-Js`
- Ruleset trusted snapshot `updated_at`: `2026-08-11T21:30:21.316+03:00`
- Governing K6 planning authorization: `docs/planning/KODAC_K6_DEFINITION_AND_PLANNING_AUTHORIZATION_2026-08-26.md`
- Governing improvement plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Governing constitution: `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`
- Canonical event/evidence direction: `docs/adr/ADR-0005-canonical-session-event-tool-protocol.md`
- Mandatory side-effect trust boundary: `docs/adr/ADR-0006-mandatory-trust-hook-side-effects.md`
- Canonical K6-R1 contract: `packages/kodac-runtime/src/evidence-router/contracts.ts`
- Canonical K6-R3 contract: `packages/kodac-runtime/src/evidence-router/outcome-linkage-contracts.ts`

## Protected-main ruleset requirement

This record does not authorize any repository ruleset or branch-protection mutation.

For this authorization adoption, the later R4 implementation qualification, guarded merge and post-merge proof, ruleset `20707483` must remain exactly the trusted Kodac main-protection ruleset with:

```text
id = 20707483
name = Kodac canonical main protection v1
target = branch
source_type = Repository
source = TheHalfMoon/Kodac
enforcement = active
conditions.ref_name.include = ["refs/heads/main"]
conditions.ref_name.exclude = []
bypass_actors = []
current_user_can_bypass = never
strict_required_status_checks_policy = true
required_status_checks =
  provenance      / integration_id 15368
  legacy-tests    / integration_id 15368
  k2-runtime-gate / integration_id 15368
```

The pull-request rule must continue to require review-thread resolution. A different ruleset ID, changed trusted node/snapshot identity, bypass actor, disabled enforcement, changed target, non-strict status policy, missing required check, or different trusted producer is a material governance drift and fails qualification closed.

### Least-privilege ruleset proof

The dedicated R4 implementation workflow must remain read-only. It must **not** receive repository-administration or ruleset-write permission merely to inspect protection state.

GitHub's repository-ruleset API may omit sensitive control-plane fields such as `bypass_actors` when the caller lacks ruleset write authority. Therefore:

```text
MISSING bypass_actors IN A READ-ONLY RESPONSE != []
MISSING current_user_can_bypass IN A READ-ONLY RESPONSE != never
UNKNOWN CONTROL-PLANE FIELD != PASS
```

The dedicated workflow proves only ruleset fields available to its least-privilege repository metadata/read context: exact ruleset identity/name/node/snapshot, repository source, target/ref conditions, enforcement, pull-request/thread-resolution rule where exposed, strict required-status policy, and exact required checks/trusted producers.

The mandatory `bypass_actors = []` and `current_user_can_bypass = never` evidence is proven separately immediately before guarded merge and again after merge by an authorized GitHub repository-control-plane read whose response actually exposes those fields. This external proof is evidence only; it grants no implementation authority and may not mutate the ruleset.

No workflow or implementation may request administration/write permission solely to convert an unreadable ruleset field into a passing result.

## Authority reconciliation

K6-R1, K6-R2 and K6-R3 are closed canonical for their separately authorized pure-data scopes. P0 roadmap reconciliation is closed canonical. `docs/roadmap/NEXT.md` therefore authorizes preparation of this R4 authorization candidate only.

This candidate remains non-canonical until its exact final head passes the adoption gate below.

## Decision

After and only after canonical adoption and post-merge proof of this exact record, authorize one later K6-R4 implementation PR for a **pure deterministic privacy-governed outcome-record and in-memory snapshot/lifecycle contract**.

R4 v1 consumes caller-materialized canonical K6-R1 and K6-R3 records. It produces only minimized immutable in-memory values. It does not read or write durable storage and does not execute any side effect.

```text
K6-R4 = PRIVACY-GOVERNED BOUNDED OUTCOME RECORD / IN-MEMORY MEMORY CONTRACT
R4 RUNTIME I/O = NONE
R4 FILESYSTEM / DATABASE PERSISTENCE = NOT AUTHORIZED
R4 NETWORK / UPLOAD / TELEMETRY = NOT AUTHORIZED
R4 TRAINING / LEARNING MUTATION = NOT AUTHORIZED
R4 STRATEGY PROMOTION = NOT AUTHORIZED
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 AUTHORITY = UNCHANGED
DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
```

The governing invariant remains:

```text
OUTCOME DATA != PERMISSION TO LEARN OR PERSIST
SELF-IMPROVING != SELF-AUTHORIZING
ROUTING EVIDENCE != EXECUTION AUTHORITY
```

Any future act that durably stores an R4 value is a separately authorized side effect and must traverse the canonical K2 `ExecutionGateway` / Trust Kernel path.

## Exact bounded question

R4 v1 answers exactly one question:

> Given one exact validated K6-R1 route request, one exact validated K6-R3 route-outcome linkage envelope cryptographically bound to that R1 request, one caller-materialized opaque owner isolation scope, explicit caller-materialized lifecycle times, and one validated R4 memory snapshot, what minimized immutable outcome record and deterministic next snapshot are valid under exact repository/owner/privacy isolation, retention, deletion, expiry, conflict and supersession rules?

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
OWNER_SCOPE_ID != AUTHENTICATION
OWNER_SCOPE_ID != AUTHORIZATION
OWNER_SCOPE_ID != CAPABILITY OR SECRET
PSEUDONYMOUS DIGEST != ANONYMOUS DATA
DELETION != HIDDEN ARCHIVAL RETENTION
EXPIRED != ACTIVE
SUPERSEDED != CONCURRENT WINNER
CALLER CLOCK != TRUSTED WALL-CLOCK PROOF
```

Information may be linked or minimized; authority never follows information flow.

## Canonical predecessor binding

### Why R1 is supplied explicitly

The canonical K6-R1 route request contains `privacyClass`. The canonical K6-R1 eligibility result intentionally does not repeat it, and the K6-R2 request / K6-R3 envelope therefore do not independently expose `privacyClass`.

R4 must not infer or invent privacy classification. R4 therefore requires the caller to supply the original canonical K6-R1 route request alongside the canonical K6-R3 envelope.

This is not a predecessor mutation. Both records already exist under canonical contracts.

### Required validation and binding

For every APPEND or SUPERSEDE operation, before projecting any R4 field:

1. validate `routeRequest` through canonical `validateK6R1RouteRequest()`;
2. validate `routeOutcomeLinkageEnvelope` through canonical `validateK6R3RouteOutcomeLinkageEnvelope()`;
3. require exact equality of:

```text
routeRequest.requestIdentity == routeOutcomeLinkageEnvelope.linkage.requestIdentity
routeRequest.repositoryId   == routeOutcomeLinkageEnvelope.linkage.repositoryId
routeRequest.canonicalBase  == routeOutcomeLinkageEnvelope.linkage.canonicalBase
routeRequest.candidateHead  == routeOutcomeLinkageEnvelope.linkage.candidateHead
routeRequest.taskId         == routeOutcomeLinkageEnvelope.linkage.taskId
```

The R1 validator recomputes `requestIdentity` from the complete closed R1 request. Matching that identity to the validated R3 linkage cryptographically binds the supplied R1 privacy class and all other R1 request fields to the R3 outcome lineage.

Any mismatch is structural `TypeError`. R4 may not choose one predecessor as “more authoritative,” repair a mismatch, or infer a privacy value.

The validated R1 request is input evidence only. R4 does not retain the raw request in memory output.

## Privacy classification and isolation

R4 reuses the closed K6-R1 privacy vocabulary exactly:

```text
PUBLIC
REPOSITORY_PRIVATE
SENSITIVE
```

For every admitted operation:

```text
privacyClass = validatedRouteRequest.privacyClass
```

R4 must not infer, downgrade, upgrade, remap or merge privacy classes.

Every R4 memory snapshot is isolated by the exact triple:

```text
repositoryIdentity
ownerScopeId
privacyClass
```

Where:

- `repositoryIdentity` is a deterministic domain-separated SHA-256 digest derived from the validated R3/R1 repository identity;
- `ownerScopeId` is caller-materialized opaque 64-character lowercase hexadecimal **isolation data only**;
- `privacyClass` is the exact validated R1 privacy class.

`ownerScopeId` is not an authentication result, permission, capability, credential, secret, approver identity or proof of human ownership. Possession or equality of an `ownerScopeId` grants no authority.

One snapshot may contain only records and tombstones for one exact scope triple. Cross-repository, cross-owner and cross-privacy admission fail closed. `PUBLIC` does not weaken repository/owner isolation.

## Pseudonymity and correlation boundary

R4 uses deterministic digests for minimization and stable in-scope provenance. They are **pseudonymous identifiers, not anonymous identifiers**.

Equal source identities may be correlatable if an external caller later colocates multiple snapshots. R4 does not claim to prevent such correlation cryptographically.

However:

- R4 itself has no storage, aggregation, network or telemetry authority;
- one memory value is restricted to one exact scope triple;
- cross-repository and cross-user aggregation/learning remain explicitly unauthorized;
- no caller may treat digest equality as permission to join, upload, learn from or share records across scopes.

A later persistence or cross-scope design must separately address unlinkability, encryption/keying and retention as appropriate. This record does not authorize HMAC keys, secrets, encryption services or cross-scope aggregation.

## Local-first and persistence boundary

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

A caller may hold the returned value in process. R4 itself performs no persistence side effect.

A deserialized or caller-supplied R4 memory is untrusted input and must pass the full R4 validator before use. Failure is terminal; no partial/permissive load is allowed.

## Prohibited retained content

R4 memory uses exact-key closed records. No extension bag, metadata map, note field, arbitrary labels or free-form payload field is authorized.

R4 memory output must not retain raw:

- repository IDs or task IDs;
- candidate IDs, provider names or model names;
- R1 required-capability strings or candidate declarations;
- source code, file contents, diffs or patches;
- prompts, chat/model messages or arbitrary user notes;
- secrets, tokens, credentials or environment values;
- shell commands or arguments;
- stdout/stderr bodies;
- execution-receipt or verification-report bodies;
- K5 proof/reconciliation payload bodies;
- Done Gate reason strings or evidence-reference bodies;
- reviewer finding text;
- provider/model/reviewer response content;
- raw user names, emails, account IDs or display names.

Implementation tests must plant unique sentinels into relevant R1/R3 raw fields and prove those sentinels are absent from canonical serialized R4 memory output.

## Exact identity derivations

R4 reuses `canonicalK6R1Json()` and SHA-256 from `node:crypto`.

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

For every validated R3 linked execution observation:

```text
candidateIdentity = SHA256(canonicalK6R1Json({
  kind: "K6_R4_CANDIDATE",
  candidateId,
  candidateKind,
  provider,
  model
}))
```

Raw candidate/provider/model strings are transient derivation inputs only and are not retained.

### Record, tombstone and memory identities

`recordIdentity`, `tombstoneIdentity` and `memoryIdentity` are SHA-256 digests over exact closed canonical identity-input objects with their own identity field omitted and exact version included.

No identity may depend on object insertion order, host locale, wall clock, filesystem/process state, randomness, `Set`/`Map` iteration, or live provider/model output.

## Contract versions

```text
K6_R4_OUTCOME_RECORD_VERSION = "kodac-k6-r4-outcome-record-v1"
K6_R4_TOMBSTONE_VERSION = "kodac-k6-r4-outcome-tombstone-v1"
K6_R4_MEMORY_VERSION = "kodac-k6-r4-outcome-memory-v1"
K6_R4_OPERATION_VERSION = "kodac-k6-r4-outcome-memory-operation-v1"
```

No floating alias or implicit migration is accepted.

## Exact minimized active record

An active record has exactly:

```text
version
recordIdentity
scope
source
outcome
lifecycle
```

### `scope`

```text
repositoryIdentity
ownerScopeId
privacyClass
```

### `source`

```text
routeOutcomeLinkageIdentity
routePlanIdentity
requestIdentity
canonicalBase
candidateHead
taskIdentity
```

Every source field is projected from the validated R3 linkage except `taskIdentity`, which is the digest defined above. R1 raw request fields are not retained.

### `outcome`

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

The array preserves validated R3 execution-observation order. R4 does not reinterpret verification, K5, execution or Done Gate state.

### `lifecycle`

```text
observedAtUnixMs
expiresAtUnixMs
supersedesRecordIdentity
```

`observedAtUnixMs` and `expiresAtUnixMs` are caller-materialized non-negative safe integers. R4 never calls a host clock.

```text
expiresAtUnixMs > observedAtUnixMs
supersedesRecordIdentity = null for APPEND
supersedesRecordIdentity = exact replaced record identity for SUPERSEDE
```

No implicit infinite retention or default TTL exists.

## Logical subject and uniqueness

Within one exact scope triple, `taskIdentity` is the v1 logical outcome subject. At most one active record may exist for a task.

A different outcome for an already-active task is a conflict unless introduced by explicit `SUPERSEDE` against the current record. No last-write-wins behavior exists.

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

Closed transitions:

```text
DELETED
EXPIRED
SUPERSEDED
```

Rules:

- no outcome payload is retained;
- `replacementRecordIdentity` is non-null only for `SUPERSEDED`;
- tombstone scope equals memory scope;
- `recordIdentity` and `taskIdentity` identify the removed active record;
- `expiresAtUnixMs > transitionAtUnixMs`;
- a retained tombstone blocks exact-record resurrection;
- tombstones are anti-resurrection/conflict evidence, not archival outcome storage.

## Exact memory snapshot

A memory has exactly:

```text
version
memoryIdentity
scope
records
tombstones
```

Rules:

- every record/tombstone matches the exact memory scope;
- records sort ascending by `recordIdentity`;
- tombstones sort ascending by `tombstoneIdentity`;
- duplicate identities are rejected;
- duplicate active `taskIdentity` values are rejected;
- one `recordIdentity` cannot be both active and tombstoned;
- every record/tombstone/memory identity is recomputed during validation;
- previously emitted objects are never trusted merely because R4 emitted them;
- returned memory and nested values are deeply frozen.

## Operation vocabulary

Only these pure value-to-value operations exist:

```text
APPEND
SUPERSEDE
DELETE
EXPIRE
PURGE_TOMBSTONE
```

Every operation has exact closed keys and `version = kodac-k6-r4-outcome-memory-operation-v1`.

### APPEND

Exact input:

```text
version
kind = "APPEND"
ownerScopeId
observedAtUnixMs
expiresAtUnixMs
routeRequest
routeOutcomeLinkageEnvelope
```

Requirements:

1. validate and bind R1+R3 exactly as specified above;
2. derive privacy class from validated R1 request only;
3. derive repository/task/candidate identities;
4. require derived scope to equal memory scope;
5. reject a different active record with the same `taskIdentity`;
6. reject an exact record identity protected by a retained tombstone;
7. an exact already-active semantically identical record is idempotent;
8. otherwise append, canonicalize and recompute memory identity.

### SUPERSEDE

Exact input:

```text
version
kind = "SUPERSEDE"
targetRecordIdentity
ownerScopeId
observedAtUnixMs
expiresAtUnixMs
tombstoneExpiresAtUnixMs
routeRequest
routeOutcomeLinkageEnvelope
```

Requirements:

1. target identifies exactly one active record;
2. validate and bind R1+R3 as above;
3. replacement scope and task equal target scope/task;
4. replacement identity differs from target;
5. replacement `supersedesRecordIdentity` equals target;
6. `observedAtUnixMs >= target.lifecycle.observedAtUnixMs`;
7. create one minimal `SUPERSEDED` tombstone whose replacement identity is the new record;
8. `tombstoneExpiresAtUnixMs > observedAtUnixMs`;
9. atomically remove target payload, add tombstone and replacement, canonicalize and recompute memory identity.

No implicit conflict resolution or “newer wins” rule exists.

### DELETE

Exact input:

```text
version
kind = "DELETE"
targetRecordIdentity
transitionAtUnixMs
tombstoneExpiresAtUnixMs
```

Requirements:

1. target identifies exactly one active record;
2. `transitionAtUnixMs >= target.lifecycle.observedAtUnixMs`;
3. `tombstoneExpiresAtUnixMs > transitionAtUnixMs`;
4. remove the complete active payload;
5. add one minimal `DELETED` tombstone;
6. canonicalize and recompute memory identity.

Deletion is not permission to retain removed payload elsewhere.

### EXPIRE

Exact input:

```text
version
kind = "EXPIRE"
targetRecordIdentity
transitionAtUnixMs
tombstoneExpiresAtUnixMs
```

Requirements:

1. target identifies exactly one active record;
2. `transitionAtUnixMs >= target.lifecycle.expiresAtUnixMs`;
3. `tombstoneExpiresAtUnixMs > transitionAtUnixMs`;
4. remove the complete active payload;
5. add one minimal `EXPIRED` tombstone;
6. canonicalize and recompute memory identity.

R4 never consults a host clock. Consumers that care about freshness must provide a caller-materialized `asOf` and fail closed when `asOf >= expiresAtUnixMs`; absence of an EXPIRE operation is not proof of freshness.

### PURGE_TOMBSTONE

Exact input:

```text
version
kind = "PURGE_TOMBSTONE"
targetTombstoneIdentity
transitionAtUnixMs
```

Requirements:

1. target identifies exactly one tombstone;
2. `transitionAtUnixMs >= tombstone.expiresAtUnixMs`;
3. remove the tombstone completely;
4. canonicalize and recompute memory identity.

After purge, R4 retains no hidden anti-resurrection history. Privacy retention wins over indefinite hidden history.

## Conflict and replay semantics

Fail closed with structural `TypeError`, except explicit resource-bound `RangeError`, for:

- invalid or mismatched R1/R3 predecessor binding;
- foreign repository/owner/privacy scope;
- duplicate active task;
- forged/duplicate record, tombstone or memory identity;
- conflicting APPEND;
- APPEND of an exact still-tombstoned record;
- missing/non-active SUPERSEDE/DELETE/EXPIRE target;
- cross-task or cross-scope supersession;
- early EXPIRE or early tombstone purge;
- contradictory replacement identity;
- unknown fields/enums;
- accessors/getters, proxies, symbols, sparse arrays, cycles or unexpected prototypes;
- invalid Unicode scalar values;
- canonical identity mismatch.

The only idempotent no-op is exact semantically identical APPEND of the current active record.

A retained tombstone blocks exact removed-record replay. After explicit tombstone expiry and purge, R4 retains no hidden history and later admission is judged only from the then-current memory.

## Resource-safety bounds

R4 implementation must define and enforce at least:

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

R1 and R3 predecessor values remain subject to their own canonical limits.

These are hostile-input/value bounds, not product usage quotas. Exceeding a bound fails closed with `RangeError`; no hidden truncation is authorized.

## Hostile-input and immutability rules

Validation/materialization must not trigger caller getters/setters, custom iterators, `toJSON`, coercion hooks, prototype methods or filesystem/network/process effects.

Only plain objects, plain dense arrays and exact enumerable data properties are accepted. Proxies, symbols, custom prototypes, sparse arrays, cycles and invalid Unicode scalars fail closed.

Inputs are not mutated. Outputs are deeply frozen.

## Exact allowed production imports

R4 production source may import only:

```text
node:crypto
node:util
packages/kodac-runtime/src/evidence-router/contracts.ts
packages/kodac-runtime/src/evidence-router/outcome-linkage-contracts.ts
```

`node:crypto` is limited to SHA-256 identity derivation. `node:util` is limited to fail-closed proxy detection.

The R1 import is limited to canonical JSON, privacy vocabulary/types and `validateK6R1RouteRequest()`.

The R3 import is limited to `validateK6R3RouteOutcomeLinkageEnvelope()` and required types/projections.

R4 production source must not import filesystem, path, HTTP/network/TLS, child-process/process-execution, database, telemetry, provider/model/reviewer/evaluator, K2 executor or any new package.

## Immutable predecessor pins for future R4 implementation

The later dedicated R4 workflow must prove these canonical blobs remain unchanged unless a replacement R4 authorization is canonically adopted:

| Path | Required blob |
| --- | --- |
| `docs/planning/KODAC_K6_R3_ROUTE_OUTCOME_LINKAGE_AUTHORIZATION_2026-08-26.md` | `b7c68a4e963a0d082fd966b2cfdab44095d107dd` |
| `.github/workflows/k6-r3-route-outcome-linkage.yml` | `7fdf087cab22719485b9aadd98568f9669cf3be1` |
| `schema/k6-r1-model-provider-route-eligibility.schema.json` | `336b5477b16f1bba5c4173874d819091cea9495d` |
| `schema/k6-r3-route-outcome-linkage.schema.json` | `70125dfeead8fa18ae7bddc909d611e92b5b1873` |
| `packages/kodac-runtime/src/evidence-router/contracts.ts` | `dc29c4ce85340312f28b67604cac01c1d775e370` |
| `packages/kodac-runtime/src/evidence-router/outcome-linkage-contracts.ts` | `eb49af7282ba9c60ac2d874dd71798867e39284e` |
| `packages/kodac-runtime/src/evidence-router/outcome-linkage.ts` | `7349d8d84f698aced133d5932dae910bc01deb9b` |
| `packages/kodac-runtime/test/k6-r1-model-provider-route-eligibility.test.ts` | `974137a513f16c93336d5bcda38c351326c53255` |
| `packages/kodac-runtime/test/k6-r3-route-outcome-linkage.test.ts` | `9f79a44d8def5f04b943f9d4e7c87deba15bf61f` |
| `packages/kodac-runtime/src/index.ts` | `f5f5c68de90e23ad07af4a0489cf85e57fe46cfe` |
| `tools/validate_provenance.py` | `e312be037d5a7e4d6645b7056cb948486d035848` |

The future workflow must also pin this R4 authorization document to the exact canonical blob created by its adoption merge.

Any predecessor drift stops implementation qualification and requires replacement authorization; R4 must not silently reinterpret a drifted predecessor.

## Authorized K6-R4 implementation surface

After and only after canonical adoption and post-merge proof of this authorization, one implementation PR may change exactly:

```text
.github/workflows/k6-r4-privacy-governed-outcome-memory.yml
schema/k6-r4-privacy-governed-outcome-memory.schema.json
packages/kodac-runtime/src/evidence-router/outcome-memory-contracts.ts
packages/kodac-runtime/src/evidence-router/outcome-memory.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k6-r4-privacy-governed-outcome-memory.test.ts
```

No seventh path is authorized.

`packages/kodac-runtime/src/index.ts` may change only by appending exactly:

```text
export * from "./evidence-router/outcome-memory-contracts.ts"
export * from "./evidence-router/outcome-memory.ts"
```

to the complete canonical pre-R4 bytes. Every earlier export line/order remains byte-for-byte unchanged.

No dependency, lockfile, package manifest, documentation, K2/K5/KRI/Done Gate source, R1/R2/R3 source, provider/model/reviewer implementation, storage adapter, database, telemetry, secret, PR #163, Z0-family path or release artifact may change.

If implementation cannot fit this six-path surface, stop and replace the authorization; do not widen scope implicitly.

## Public JSON Schema requirements

The new schema uses Draft 2020-12 and exact `$id`:

```text
https://kodac.dev/schema/k6-r4-privacy-governed-outcome-memory.schema.json
```

The public root is the validated R4 `outcomeMemory` representation. Operation shapes may live under `$defs`; they are input contracts, not persisted-memory fields.

The schema must:

- use closed-object semantics at every R4-owned object layer;
- expose reusable `$defs` for scope, active record, source, outcome, execution outcome, lifecycle, tombstone, memory and each operation;
- reference `https://kodac.dev/schema/k6-r1-model-provider-route-eligibility.schema.json#/$defs/routeRequest` for APPEND/SUPERSEDE `routeRequest`;
- reference `https://kodac.dev/schema/k6-r3-route-outcome-linkage.schema.json#/$defs/routeOutcomeLinkageEnvelope` for APPEND/SUPERSEDE `routeOutcomeLinkageEnvelope`;
- carry exact runtime parity for privacy, K5, Done Gate, execution-result, role, tombstone-transition and operation enums;
- carry expressible structural array/string bounds;
- state that JSON Schema alone does not prove R1/R3 cross-record binding, identity recomputation, lifecycle ordering, scope derivation, supersession or anti-resurrection.

Executable TypeScript validation remains authoritative for those semantic invariants and UTF-8 byte bounds.

## Future implementation API surface

The implementation may expose only pure helpers equivalent to:

```text
deriveK6R4RepositoryIdentity(repositoryId)
deriveK6R4TaskIdentity(taskId)
deriveK6R4CandidateIdentity(candidateProjection)
createK6R4EmptyOutcomeMemory(scopeInput)
validateK6R4OutcomeMemory(value)
validateK6R4OutcomeMemoryOperation(value)
applyK6R4OutcomeMemoryOperation(memory, operation)
```

Names may be refined only without semantic or authority expansion.

No API may open/read/write a file, connect to network/database, spawn process, inspect secrets, invoke providers/models/reviewers, or register an execution capability.

## Dedicated workflow requirements

The sole new workflow path must:

1. run only on PRs to `main` touching the exact six implementation paths;
2. use immutable full-SHA GitHub Action references;
3. use least-privilege read-only repository permissions and must not request repository-administration/ruleset-write permission;
4. attest exact repo/base/head and six-path scope;
5. pin canonical R4 authorization merge SHA/tree/document blob;
6. pin every predecessor above, including R1 schema/contract and R3 schema/contract;
7. prove pre-R4 `index.ts` is an exact prefix and only the two authorized exports are appended;
8. fail on unauthorized production imports;
9. validate Draft 2020-12 registration and R1/R3/R4 schema references plus schema/runtime enum/bound parity;
10. run strict TypeScript validation using integrity-locked temporary tooling outside the checkout with install scripts disabled;
11. run focused R4 tests;
12. run canonical R3, R2 and R1 focused regressions;
13. run full runtime tests;
14. run canonical Python tests, Ruff and provenance validation;
15. fetch ruleset `20707483` read-only and prove only the exact fields actually exposed to that least-privilege context: trusted ID/name/node/snapshot, repository source, active target/ref conditions, strict required-status policy, exact required checks/trusted producers, and pull-request/thread-resolution rule where exposed; omitted sensitive fields are `UNKNOWN`, never an inferred pass;
16. prove checkout cleanliness before and after;
17. fail closed on any predecessor, authorization, scope, action-pin, readable-ruleset, schema/runtime or workspace drift.

No repository dependency, lockfile, administration permission or ruleset-write authority is authorized.

## Required focused tests

### Canonical predecessor/privacy binding

- valid R1 route request + matching valid R3 envelope for each privacy class;
- forged R1 request identity rejection;
- forged R3 envelope rejection;
- valid R1 request whose `requestIdentity` differs from R3 rejection;
- repository/base/head/task mismatch rejection even if other identities look valid;
- prove privacy is projected from validated R1 only and never inferred from R3 status or candidate capabilities;
- prove R1 raw request fields are absent from serialized R4 memory.

### Positive/determinism

- exact minimized R3-to-R4 projection;
- repository/task/candidate digest derivation;
- deterministic record/tombstone/memory identities;
- canonical sorting;
- exact APPEND idempotency;
- deep output immutability;
- caller input immutability.

### Isolation/minimization

- cross-repository admission rejection;
- cross-owner admission rejection;
- cross-privacy admission rejection;
- duplicate active task rejection;
- raw repository/task/candidate/provider/model sentinel absence;
- prompt/code/diff/secret/command/stdout/stderr/reason/finding/output sentinel absence;
- unknown-field rejection at every R4-owned object layer;
- explicit proof that `ownerScopeId` equality grants no execution/authorization behavior;
- documentation/schema parity that deterministic digests are pseudonymous, not anonymous.

### Lifecycle

- DELETE removes active payload and creates minimal tombstone;
- EXPIRE before expiry rejects and at/after succeeds;
- SUPERSEDE requires exact active target and same task/scope;
- SUPERSEDE atomically creates replacement + minimal tombstone;
- no last-write-wins;
- retained tombstone blocks exact-record resurrection;
- purge before tombstone expiry rejects; at/after succeeds;
- after purge no hidden history remains in returned memory.

### Hostile input/bounds

- getter/accessor rejection without execution;
- proxy/symbol/custom-prototype/sparse-array/cycle/invalid-Unicode rejection;
- negative/unsafe/`-0` timestamp rejection;
- every configured resource bound at boundary and over boundary;
- forged record/tombstone/memory identity rejection;
- serialization/canonicalization parity.

### No side effects

- static import proof of no filesystem/network/database/process/provider/reviewer/telemetry import;
- tests require no network credentials, provider account, database or persistent directory.

## Exact-head implementation qualification

A later R4 implementation PR is not qualified unless the exact final head proves:

1. base is the canonical R4 authorization merge or separately canonical replacement base;
2. exactly six authorized paths changed;
3. authorization and every pinned predecessor match exactly;
4. dedicated R4 workflow terminal success;
5. repository-required `provenance`, `legacy-tests`, `k2-runtime-gate` terminal success from trusted producer `integration_id = 15368`;
6. fresh exact-head CodeRabbit review has zero unresolved material correctness/security/privacy/retention/authority findings;
7. fresh exact-head Qodo review has zero unresolved material correctness/security/privacy/retention/authority findings;
8. zero unresolved actionable review threads;
9. open, non-draft, mergeable and `behind_by = 0`;
10. the dedicated workflow proves all readable ruleset fields required above from a least-privilege response;
11. an independent authorized GitHub repository-control-plane pre-merge read proves `bypass_actors = []` and `current_user_can_bypass = never` from a response that actually exposes those fields;
12. final head/tree/six blobs captured;
13. `WAIVER=NO`.

Any new commit invalidates all prior exact-head evidence.

## Guarded implementation merge and post-merge proof

Merge only by normal GitHub merge commit with:

```text
expected_head_sha = exact qualified implementation head
```

No squash, rebase, force-push, destructive history rewrite, stale-head reuse or review waiver.

Post-merge prove canonical main, ordered parents, candidate/merge tree equality where applicable, all six blobs, valid GitHub signature, readable ruleset fields, independent authorized `bypass_actors = []` / `current_user_can_bypass = never` control-plane evidence, applicable post-merge governance/R4 gates, no unauthorized path, and `WAIVER=NO` before declaring R4 implementation canonical.

## R4 bounded closeout meaning

After implementation is merged and post-merge proven, R4 may be closed only for:

```text
PURE PRIVACY-GOVERNED MINIMIZED OUTCOME RECORD = PROVEN
CANONICAL R1 PRIVACY BINDING TO R3 OUTCOME LINEAGE = PROVEN
PURE DETERMINISTIC IN-MEMORY SNAPSHOT / LIFECYCLE TRANSITIONS = PROVEN
REPOSITORY / OWNER / PRIVACY ISOLATION = PROVEN FOR V1
RETENTION / DELETE / EXPIRE / SUPERSEDE / TOMBSTONE PURGE = PROVEN FOR V1
R4 DURABLE PERSISTENCE = NOT IMPLEMENTED / NOT AUTHORIZED
R4 TELEMETRY / UPLOAD = NOT IMPLEMENTED / NOT AUTHORIZED
R4 TRAINING / LEARNING MUTATION = NOT IMPLEMENTED / NOT AUTHORIZED
R4 STRATEGY PROMOTION = NOT IMPLEMENTED / NOT AUTHORIZED
```

This is sufficient privacy groundwork before K6-R5 authorization planning. It is not durable-storage authority and supports no broad product superiority claim.

## What becomes authorized after canonical adoption

Only after this exact record is merged and post-merge proven:

```text
K6-R4 IMPLEMENTATION = AUTHORIZED FOR EXACT SIX-PATH PURE V1 SURFACE
K6-R4 DURABLE PERSISTENCE = NOT AUTHORIZED
K6-R5 AUTHORIZATION-CANDIDATE PREPARATION = NOT AUTHORIZED UNTIL R4 IMPLEMENTATION/CLOSEOUT IS CANONICAL
K6-R5 IMPLEMENTATION = NOT AUTHORIZED
K6 BOUNDED CLOSEOUT = NOT AUTHORIZED
P2 KODACBENCH = NOT AUTHORIZED
```

## Preserved non-grants

```text
FILESYSTEM / DATABASE PERSISTENCE = NOT AUTHORIZED
REMOTE STORAGE / UPLOAD / TELEMETRY = NOT AUTHORIZED
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
K2 / K5 AUTHORITY EXPANSION = NOT AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY CHANGE = NOT AUTHORIZED
GIT / GITHUB / REVIEW / APPROVAL / MERGE AUTHORITY FROM R4 = NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT AUTHORIZED
PR #163 / Z0-FAMILY MUTATION = NOT AUTHORIZED
RULESET / BRANCH-PROTECTION MUTATION = NOT AUTHORIZED
ADMINISTRATION / RULESET-WRITE PERMISSION FOR R4 WORKFLOW = NOT AUTHORIZED
```

## Exact scope of this authorization-candidate gate

This PR may change exactly one path:

```text
docs/planning/KODAC_K6_R4_PRIVACY_GOVERNED_OUTCOME_MEMORY_AUTHORIZATION_2026-08-26.md
```

No second path is authorized. No source, test, schema, fixture, workflow, dependency, lockfile, package manifest, roadmap, ADR, ruleset, protected lane, K2/K3/K4/K5/KRI/K6-R1/R2/R3 runtime, Done Gate, storage, secret, provider config, PR #163, Z0-family artifact or release artifact changes.

## Canonical adoption gate for this record

This authorization remains non-canonical unless its exact final candidate proves:

1. PR base ref is exactly `main`;
2. live protected `main` and PR base remain `84c6a97a02d6e0478a6dbe681e24349cf79df9e7` tree `7c3dd9ca1969833a289b4446e9e3a0a38fce59c4`, unless explicitly reconciled by a normal forward commit and requalified;
3. diff is exactly the one authorized documentation path;
4. all applicable exact-head repository CI terminal success;
5. fresh exact-head CodeRabbit and Qodo reviews have zero unresolved material correctness/security/privacy/retention/governance/authority findings;
6. zero unresolved actionable threads;
7. PR open, non-draft, mergeable and `behind_by = 0`;
8. a least-privilege/readable ruleset proof matches the exact trusted identity, source, main target, active enforcement, strict required-status configuration and trusted check producers stated above;
9. an independent authorized GitHub repository-control-plane read proves `bypass_actors = []` and `current_user_can_bypass = never` from a response that actually exposes those fields;
10. final candidate head/tree/document blob captured;
11. guarded normal merge uses exact qualified `expected_head_sha`;
12. ordered merge parent 1 equals pre-merge canonical main and parent 2 equals qualified candidate head;
13. merge tree equals qualified candidate tree and document blob equals qualified blob;
14. protected main equals merge commit/tree and introduces exactly the one path;
15. applicable post-merge governance/shared checks terminal success;
16. post-merge readable ruleset fields still match exactly;
17. a post-merge authorized GitHub control-plane read again proves `bypass_actors = []` and `current_user_can_bypass = never`;
18. `WAIVER=NO`.

If live main moves, stop stale merge. Reconcile with a normal non-destructive forward commit, update recorded base as required, and requalify the new exact head from scratch.

## Stop boundary

Even after this authorization becomes canonical:

```text
DO NOT CHANGE ANY PATH OUTSIDE THE SIX-PATH R4 IMPLEMENTATION ALLOWLIST
DO NOT ADD STORAGE ADAPTERS OR DURABLE I/O
DO NOT ADD TELEMETRY OR REMOTE FALLBACK
DO NOT INVOKE PROVIDERS / MODELS / REVIEWERS
DO NOT TRAIN OR LEARN FROM R4 RECORDS
DO NOT PROMOTE STRATEGIES
DO NOT GRANT ADMINISTRATION / RULESET-WRITE PERMISSION TO THE R4 WORKFLOW
DO NOT BEGIN K6-R5 UNTIL R4 IMPLEMENTATION IS MERGED, QUALIFIED AND POST-MERGE PROVEN
```

This record grants no later implementation, execution, persistence, learning, release or completion authority by implication.