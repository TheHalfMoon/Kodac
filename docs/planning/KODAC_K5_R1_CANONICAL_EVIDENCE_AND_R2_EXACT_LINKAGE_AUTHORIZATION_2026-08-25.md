# Kodac K5-R1 Canonical Evidence and R2 Exact Linkage Authorization

## Record identity

- Date: 2026-08-25
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-25`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION CANONICAL EVIDENCE / NEXT-SLICE AUTHORIZATION
- Canonical base commit: `24286e130bc4278df1fc9d27874d8f854064a85a`
- Canonical base tree: `6a7747e9e73b030d3fc92156aac55dd8dabe2464`
- K5 definition and R1 authorization merge: `faba5ebbbd8d7b2d4c83605a98dd4d56ab2b5856` (PR #190)
- K5-R1 qualified implementation head: `18bff8efcdaa0acfc5c0e7c24acd1b3135b2f30a`
- K5-R1 qualified implementation tree: `6a7747e9e73b030d3fc92156aac55dd8dabe2464`
- K5-R1 implementation merge: `24286e130bc4278df1fc9d27874d8f854064a85a` (PR #191)
- Governing K5 definition/R1 record: `docs/planning/KODAC_K5_DEFINITION_AND_R1_PROOF_PACKAGE_JUDGMENT_AUTHORIZATION_2026-08-25.md`
- Governing constitution: `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`
- Canonical event/evidence linkage direction: `docs/adr/ADR-0005-canonical-session-event-tool-protocol.md`
- Mandatory side-effect trust boundary: `docs/adr/ADR-0006-mandatory-trust-hook-side-effects.md`

## Decision

Conditionally adopt the exact K5-R1 implementation as canonical evidence and authorize only the next bounded K5-R2 pure exact-linkage slice if and only if this documentation record itself is canonically adopted through the exact-content gate below.

The resulting state after canonical adoption and post-merge proof of this exact record is:

```text
K5: DEFINED / IN PROGRESS — CANONICAL
K5-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED PURE PROOF-PACKAGE + DETERMINISTIC JUDGMENT SCOPE
K5-R2: AUTHORIZED FOR THE EXACT PURE CALLER-MATERIALIZED EVIDENCE-LINKAGE SCOPE IN THIS RECORD
K5-R2 IMPLEMENTATION: NOT YET CANONICAL
K5-R3+: NOT AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY: UNCHANGED
KRI AUTHORITY: UNCHANGED
K2 SIDE-EFFECT AUTHORITY: UNCHANGED
```

Until this record is canonically adopted and post-merge verified, K5-R2 implementation remains unauthorized. K5-R1 is already canonical by PR #191 and its recorded post-merge proof; this record does not retroactively create that truth, it preserves it as the dependency basis for R2.

Any older K5 candidate-state wording in `docs/product/STATUS.md` or `docs/roadmap/*` that still says the R1 implementation is not canonical is stale after canonical merge `24286e130bc4278df1fc9d27874d8f854064a85a`. After this record is canonical, this record is the controlling K5 state authority until a separate reconciliation-only documentation change updates those summary files. That later reconciliation may not widen the R2 contract.

## K5-R1 canonical implementation ledger

The K5-R1 implementation was qualified at exact head:

```text
head = 18bff8efcdaa0acfc5c0e7c24acd1b3135b2f30a
tree = 6a7747e9e73b030d3fc92156aac55dd8dabe2464
base = faba5ebbbd8d7b2d4c83605a98dd4d56ab2b5856
base tree = 03f76f69402d15eed5d5a33570ead4b301b3551c
ahead = 5
behind = 0
```

It changed exactly the seven authorized paths:

```text
.github/workflows/k5-r1-proof-package-judgment.yml
schema/k5-r1-proof-package.schema.json
schema/k5-r1-proof-judgment.schema.json
packages/kodac-runtime/src/proof-review/contracts.ts
packages/kodac-runtime/src/proof-review/judge.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k5-r1-proof-package-judgment.test.ts
```

Qualified and post-merge canonical blobs are exactly:

```text
workflow        = a0a68121c5a0d861f35390e84981126eecc8fde3
package schema  = abe0a39158d57d1ae668e18914f567548015b092
judgment schema = 0cb015938744ec989e3bd34eabe24c436b4d0b18
contracts.ts    = ef0ae26c2a44157fb20ad33145788ba1255239f5
judge.ts        = 1b6093d6ec9239427e5f50a1dd9483d2c5603e36
index.ts        = cc6eaf1b043b44b9ced97640e92585998c6fbb15
test            = 6d775f15b2fd6181a47bb82205bd1c21fea3dd96
```

The merge used exact-head guarded `merge` semantics and produced real merge commit:

```text
merge = 24286e130bc4278df1fc9d27874d8f854064a85a
parent 1 = faba5ebbbd8d7b2d4c83605a98dd4d56ab2b5856
parent 2 = 18bff8efcdaa0acfc5c0e7c24acd1b3135b2f30a
merge tree = 6a7747e9e73b030d3fc92156aac55dd8dabe2464
qualified tree = 6a7747e9e73b030d3fc92156aac55dd8dabe2464
```

Protected `main` was independently re-read at that exact merge and all seven blobs matched the qualified head byte-for-byte.

## K5-R1 qualification evidence

On terminal exact head `18bff8efcdaa0acfc5c0e7c24acd1b3135b2f30a`, every applicable GitHub Actions gate passed:

```text
governance = 32813009199 PASS
k2-runtime = 32813009206 PASS
k5-r1-proof-package-judgment = 32813009287 PASS
k3-r4-adapter = 32813009218 PASS
k3-r5-context-engine = 32813009239 PASS
k3-r6-relation-graph = 32813009221 PASS
k4-r1-compatibility-normalization = 32813009209 PASS
k4-r2-mcp-catalog-evidence = 32813009212 PASS
k4-r3-acp-method-catalog-evidence = 32813009203 PASS
k4-r4-agent-skill-package-evidence = 32813009286 PASS
k4-r5-agent-skill-governance-claim-evidence = 32813009240 PASS
```

The implementation incorporated strict TypeScript repairs, bounded descriptor-inspection hardening, and explicit JSON Schema documentation that Draft 2020-12 `uniqueItems` is deep-equality only while package-wide requirement/evidence identifier uniqueness remains runtime-enforced.

Independent exact-head review was performed. Repeated stale or non-applicable reviewer claims were adjudicated against the exact current bytes, all valid material findings were repaired, and unresolved actionable review threads were zero at landing. No waiver was taken.

The R1 normative identity vector remains exactly:

```text
evidenceFingerprint = 58a93fed3381f2982f3b0cb5d334afe3a157d81b816c119fb7958273848e1342
packageIdentity      = 10bc549943799a92365f9c2b8394f84e8804068f7f19192ec32a8387ce0d24b5
judgmentIdentity     = 20d9ad8a2aaf868823358ce9eb36b558daf1df8f03dd41c1acdc244618c07492
```

## Canonical R2 dependency basis

K5-R2 is a pure linkage layer over existing canonical evidence contracts. It must not create a second evidence producer or execution authority.

The exact dependency basis at canonical base `24286e130bc4278df1fc9d27874d8f854064a85a` is:

```text
K5-R1 contracts                           ef0ae26c2a44157fb20ad33145788ba1255239f5
K5-R1 judge                               1b6093d6ec9239427e5f50a1dd9483d2c5603e36
verification/types.ts                     5c7006e6904f97791378a4a4367d569a6971c6af
evidence/receipt.ts                       214403398751c9d22bf695786c7fd7c6fd7e35e1
repository/contracts.ts                   140cf13d6d726a56ff190ef368dd31b19657f251
repository/snapshot.ts                    202332d706959c43d0bdb9e03134629a18749681
verification/done-gate.ts                 067e147569fa52cc2b04c5df26fbe20a01e958e9
reviewer-intelligence/contracts.ts         5ebe91c3d98f626651230989564d367d0600863c
```

The canonical source contracts establish, respectively:

- `VerificationReport` / `VerificationCheckResult` / `VerificationEvidenceRef` as already-produced verification evidence;
- `ExecutionReceipt` as already-produced side-effect evidence with K2-owned policy/confinement semantics;
- K3-R2 `RepositorySnapshot` identities, exact observed `gitHead`, freshness, completeness, repository/content/snapshot identities;
- the current Done Gate as the sole owner of `PROVEN_READY` / `NOT_READY` under its accepted verification checks; and
- KRI as the owner of finding/adjudication semantics, which remains outside R2 and is deferred to separately authorized K5-R3.

R2 may link to those identities and bounded caller-materialized projections. It may not execute their producers, strengthen their truth class, or mutate their state.

## K5-R2 purpose

K5-R1 intentionally treats `ref` and `digest` as opaque evidence locators. K5-R2 adds a deterministic typed linkage layer so an R1 evidence record can be bound to one caller-materialized description of an already-existing verification report, execution receipt, or repository-revision artifact.

R2 answers only:

> Does this exact R1 evidence record point, by exact kind/revision/ref/digest binding, to this exact typed caller-materialized source descriptor?

R2 does **not** answer:

- whether the verification report is globally sufficient;
- whether an execution receipt proves safe behavior;
- whether the canonical base is an ancestor of the candidate head;
- whether a repository snapshot is semantically complete enough for Done Gate;
- whether a reviewer finding is true or adjudicated;
- whether the package is `PROVEN_READY`, mergeable, approved, or complete.

## Authorized K5-R2 contract

K5-R2 must be pure, deterministic, in-memory, and caller-materialized. No R2 input may cause I/O.

### R2 source-link descriptor

Each source descriptor contains exactly:

```text
version
sourceIdentity
evidenceId
sourceKind
canonicalBase
candidateHead
sourceRef
sourceDigest
metadata
```

where:

```text
version = "kodac-k5-r2-source-link-v1"
```

`sourceIdentity` is the SHA-256 identity of the complete normalized descriptor excluding `sourceIdentity`, using the same RFC 8785/JCS + valid-Unicode + no-normalization + UTF-8 byte contract as K5-R1.

Collection bounds:

```text
source descriptors: 0 through 4096
one descriptor maximum per evidenceId
duplicate evidenceId descriptors: structural TypeError
```

Opaque string bounds:

```text
evidenceId:       1..128 UTF-8 bytes, NUL-free
sourceRef:        1..1024 UTF-8 bytes, NUL-free
sourceDigest:     exactly 64 lowercase hexadecimal SHA-256 characters
canonicalBase:    exactly 40 lowercase hexadecimal characters
candidateHead:    exactly 40 lowercase hexadecimal characters
```

`sourceKind` is closed to:

```text
VERIFICATION_REPORT
EXECUTION_RECEIPT
REPOSITORY_REVISION
```

The exact kind mapping to R1 evidence is:

```text
R1 VERIFICATION       <-> R2 VERIFICATION_REPORT
R1 EXECUTION_RECEIPT  <-> R2 EXECUTION_RECEIPT
R1 REPOSITORY_STATE   <-> R2 REPOSITORY_REVISION
```

R1 `REVIEW_ADJUDICATION`, `ARTIFACT`, and `CUSTOM` evidence are explicitly outside R2. `REVIEW_ADJUDICATION` is reserved for separately authorized K5-R3. R2 must not silently treat out-of-scope evidence as missing or invalid.

### Verification-report metadata

For `sourceKind = VERIFICATION_REPORT`, `metadata` contains exactly:

```text
protocol
reportVersion
sessionId
passed
checkIds[]
```

with:

```text
protocol = "kodac.verification"
reportVersion = 1
sessionId: non-empty NUL-free, <=256 UTF-8 bytes
passed: boolean
checkIds: 0..256 unique non-empty NUL-free strings, each <=128 UTF-8 bytes
```

`checkIds` are canonicalized as a set for linkage identity only. R2 does not run checks, inspect command output, reproduce the report, or invoke Done Gate.

### Execution-receipt metadata

For `sourceKind = EXECUTION_RECEIPT`, `metadata` contains exactly:

```text
receiptId
capability
inputDigest
policyDecision
resultStatus
```

with:

```text
receiptId: non-empty NUL-free, <=128 UTF-8 bytes
capability: non-empty NUL-free, <=256 UTF-8 bytes
inputDigest: exactly 64 lowercase hexadecimal SHA-256 characters
policyDecision: allow | ask | deny
resultStatus: success | blocked | failure
```

This is a redacted linkage projection only. R2 does not reconstruct an `ExecutionReceipt`, validate K2 policy/confinement semantics, consume an approval, grant an effect, execute a capability, or strengthen receipt truth. `sourceDigest` remains the caller-materialized digest of the upstream receipt artifact under the upstream producer's accepted evidence contract.

### Repository-revision metadata

For `sourceKind = REPOSITORY_REVISION`, `metadata` contains exactly:

```text
snapshotVersion
repositoryIdentity
contentIdentity
snapshotIdentity
observedGitHead
freshness
completeness
omittedAtLeast
```

with:

```text
snapshotVersion = "k3-r2-snapshot-v1"
repositoryIdentity: exactly 64 lowercase hexadecimal SHA-256 characters
contentIdentity: exactly 64 lowercase hexadecimal SHA-256 characters
snapshotIdentity: exactly 64 lowercase hexadecimal SHA-256 characters
observedGitHead: exactly 40 or 64 lowercase hexadecimal Git object characters
freshness: current | stale
completeness: complete | partial | truncated
omittedAtLeast: non-negative safe integer
```

These fields are a bounded caller-materialized projection of canonical K3-R2 repository snapshot evidence. R2 preserves `freshness`, `completeness`, and `observedGitHead` as typed evidence; it does not reinterpret them into package status. Cross-class stale/incomplete handling remains for separately authorized K5-R4.

R2 does not execute Git, prove ancestry, compare trees, capture a snapshot, hash repository files, or convert a workspace-local K3 repository identity into a globally stable repository identity.

### Linkage result

R2 validates one exact K5-R1 package first and then emits a linkage record containing exactly:

```text
version
packageIdentity
revision
links[]
outOfScopeEvidenceIds[]
sourceIdentities[]
linkageIdentity
```

where:

```text
version = "kodac-k5-r2-evidence-linkage-v1"
```

There is exactly one `links[]` result for every R1 evidence record whose kind is `VERIFICATION`, `EXECUTION_RECEIPT`, or `REPOSITORY_STATE`. Results sort by R1 `evidenceId` using the K5 scalar-value ordering.

Each link result contains exactly:

```text
evidenceId
evidenceKind
sourceKind
status
codes[]
sourceIdentity
```

The closed linkage status vocabulary is:

```text
LINKED
UNLINKED
MISMATCH
```

The fixed code vocabulary and rank is:

```text
NO_SOURCE
KIND_MISMATCH
REVISION_MISMATCH
REF_MISMATCH
DIGEST_MISMATCH
```

Rules:

- no descriptor for an in-scope R1 evidence ID -> `UNLINKED` with exactly `NO_SOURCE`, `sourceKind = null`, `sourceIdentity = null`;
- a descriptor exists and every kind/revision/ref/digest condition matches -> `LINKED` with empty `codes[]`;
- a descriptor exists and one or more exact conditions mismatch -> `MISMATCH` with every applicable mismatch code in fixed rank order;
- source descriptors with an evidenceId absent from the R1 package are structural TypeError rather than orphan evidence;
- a source descriptor targeting an R1 out-of-scope evidence kind is structural TypeError;
- a malformed or sourceIdentity-tampered descriptor is structural TypeError before linkage output;
- R2 never mutates the R1 package or R1 evidence `status`;
- R2 never upgrades R1 evidence to `SATISFIED` and never creates an R1 judgment.

`outOfScopeEvidenceIds[]` contains exactly all R1 evidence IDs with kinds `REVIEW_ADJUDICATION`, `ARTIFACT`, or `CUSTOM`, sorted and unique.

`sourceIdentities[]` contains exactly all validated source descriptor identities, sorted and unique.

`linkageIdentity` is the SHA-256 identity of the complete normalized linkage result excluding `linkageIdentity`, using the same K5 RFC 8785/JCS/UTF-8 contract.

### Exact revision semantics

A source descriptor is revision-matched only when both its `canonicalBase` and `candidateHead` exactly equal the R1 package revision strings. R2 does not infer ancestry or accept abbreviated/uppercase Git identities.

Repository metadata `observedGitHead`, `freshness`, and `completeness` are preserved independently from descriptor revision matching. For example, a descriptor can be exact-string revision-matched while its source metadata says `freshness: stale`; R2 records the exact link and leaves stale semantics to K5-R4.

### Canonicalization and hostile input

R2 reuses the R1 canonicalization rules as a semantic contract:

- proxy rejection through Node.js 24 `node:util.types.isProxy` before structural inspection at every object/array nesting level;
- plain non-proxy JSON data only;
- accessors, symbol fields, sparse arrays, custom prototypes, cycles, unsupported JSON values, unknown properties, invalid Unicode scalar values, NUL where forbidden, unsafe integers, fractions, negative zero, and non-finite numbers fail closed;
- no Unicode normalization;
- declared sets reject duplicates before canonical scalar sorting;
- RFC 8785 JCS object member ordering and JSON serialization;
- UTF-8 without BOM then SHA-256;
- no locale-sensitive sort, delimiter-concatenated identity, or platform-native serialization.

## Exact K5-R2 implementation allowlist

Only after this record is canonically adopted and post-merge verified, K5-R2 may change exactly:

```text
.github/workflows/k5-r2-evidence-linkage.yml
schema/k5-r2-evidence-linkage.schema.json
packages/kodac-runtime/src/proof-review/linkage-contracts.ts
packages/kodac-runtime/src/proof-review/linkage.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k5-r2-evidence-linkage.test.ts
```

No other path is authorized.

Production static imports are limited to:

```text
node:crypto
node:util
./contracts.ts
./linkage-contracts.ts
```

Type-only imports from canonical Kodac source contracts may be used only if erased at runtime and if the exact implementation gate proves the emitted runtime dependency surface remains limited to the list above. No new dependency is admitted.

No dynamic `import()`, runtime `require()`, `eval()`, `Function`, `node:vm`, Worker, filesystem, process, network, provider, reviewer, Git, GitHub, persistence, ExecutionGateway, Trust Kernel, Done Gate, K2 side-effect, or KRI mutation path is authorized.

## Required K5-R2 implementation proofs

The exact R2 implementation must prove at least:

1. the canonical K5-R1 package validator is invoked before any package field is used for linkage;
2. all source descriptors are recursively fail-closed plain non-proxy data and `sourceIdentity` is recomputed before semantic use;
3. descriptor collections are bounded to 0..4096 and duplicate evidence IDs fail before linkage;
4. orphan descriptors and descriptors targeting R1 out-of-scope evidence kinds fail structurally;
5. the three exact source-kind to R1-kind mappings are closed and exhaustive;
6. exact base/head, ref, digest, and kind matches produce only `LINKED`;
7. absent sources produce only `UNLINKED` + `NO_SOURCE`;
8. every applicable mismatch code is emitted deterministically in rank order for a descriptor with multiple mismatches;
9. repository `freshness`, `completeness`, and observed head remain data and are never converted into R1 or Done Gate status;
10. verification `passed` remains source metadata and never emits `PROVEN_READY`;
11. receipt policy/result metadata never grants capability or K2 authority;
12. R1 `REVIEW_ADJUDICATION`, `ARTIFACT`, and `CUSTOM` evidence is preserved only in `outOfScopeEvidenceIds` and never falsely classified as missing;
13. R2 does not mutate, re-hash, replace, or re-judge the R1 package;
14. equivalent set ordering yields identical source/linkage identities;
15. identity-bearing metadata/ref/digest/revision mutations change source/linkage identities as defined;
16. hostile proxy/accessor/symbol/sparse/custom-prototype/cycle/Unicode/numeric inputs fail closed without executing caller hooks;
17. all returned records are deeply immutable copies and later caller mutation cannot alter them;
18. the published Draft 2020-12 schema mirrors the closed discriminated metadata unions, bounds, nullability, statuses, and codes, with runtime-only byte/identity constraints documented where standard JSON Schema cannot express them;
19. production purity scanner proves only the exact authorized static runtime imports and no ambient authority;
20. existing R1 normative vectors remain byte-identical and green;
21. existing Done Gate source/tests remain unchanged and green;
22. existing KRI contracts/tests remain unchanged and green;
23. existing K2 receipt and K3 repository snapshot source remain unchanged and green;
24. strict TypeScript, focused R2 tests, full runtime tests, Python tests, Ruff, provenance validation, schema hostile fixtures, scope checks, `git diff --check`, and checkout-unchanged gates pass on exact head;
25. fresh exact-head independent review reports no unresolved material contract, authority, linkage, identity, mutability, hostile-input, stale-semantics, or fail-open defect.

## Explicit R2 non-goals and non-grants

```text
K5-R3+ IMPLEMENTATION: NOT AUTHORIZED
DONE GATE MODIFICATION: NOT AUTHORIZED
PROVEN_READY / NOT_READY EMISSION FROM K5-R2: NOT AUTHORIZED
K5-R1 STATUS MUTATION OR RE-JUDGMENT: NOT AUTHORIZED
KRI FINDING / ADJUDICATION CONSUMPTION OR MUTATION: NOT AUTHORIZED
REVIEWER EXECUTION / QUALIFICATION / ROUTING: NOT AUTHORIZED

VERIFICATION EXECUTION: NOT AUTHORIZED
EXECUTION RECEIPT CREATION / CONSUMPTION AS AUTHORITY: NOT AUTHORIZED
REPOSITORY SNAPSHOT CAPTURE: NOT AUTHORIZED
GIT ANCESTRY / TREE / DIFF PROOF: NOT AUTHORIZED

K2 EXECUTION-AUTHORITY EXPANSION: NOT AUTHORIZED
EXECUTIONGATEWAY / TRUST KERNEL / POLICY CHANGE: NOT AUTHORIZED
FILESYSTEM / PROCESS / NETWORK / SECRET ACCESS: NOT AUTHORIZED
GIT / GITHUB READ OR WRITE: NOT AUTHORIZED
MODEL / PROVIDER / EXTERNAL REVIEW SERVICE CALLS: NOT AUTHORIZED
PERSISTENCE / DATABASE / VECTOR / EMBEDDING INFRASTRUCTURE: NOT AUTHORIZED

NEW KODAC DEPENDENCIES: NOT AUTHORIZED
CODE IMPORT / DONOR SOURCE INTAKE: NOT AUTHORIZED
DYNAMIC import() / RUNTIME require() / eval() / Function / node:vm / Worker: NOT AUTHORIZED

REPOSITORY WRITE / GITHUB COMMENT / REVIEW / APPROVAL / MERGE AUTHORITY FROM K5: NOT AUTHORIZED
RULESET CHANGE: NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH: NOT AUTHORIZED
```

PR #163, Z0-family work, zrok, paid spend, real secrets, GitHub Apps/webhooks, trust-root/protected-lane changes, and public release decisions remain outside this gate and untouched.

## Documentation adoption gate for this record

This documentation PR may change exactly this one file:

```text
docs/planning/KODAC_K5_R1_CANONICAL_EVIDENCE_AND_R2_EXACT_LINKAGE_AUTHORIZATION_2026-08-25.md
```

No source, schema, workflow, test, dependency, lockfile, provenance, roadmap-summary, ruleset, PR #163, Z0-family, trust-root, or protected-lane path is authorized by this documentation PR.

Canonical adoption requires:

- `main` remains exact canonical K5-R1 merge `24286e130bc4278df1fc9d27874d8f854064a85a` or this record is reconciled before mutation/merge;
- the PR contains exactly this one new planning path;
- the record preserves exact K5-R1 merge/tree/blob truth;
- R2 remains pure/caller-materialized linkage only and the six-path implementation allowlist remains closed;
- no text grants Done Gate, `PROVEN_READY`, K2 execution, KRI mutation, repository write, GitHub review/approval/merge, provider, persistence, trust-root, or public-release authority;
- normal applicable GitHub Actions pass on the exact final head;
- fresh independent exact-head review reports no unresolved material finding;
- all actionable review threads are adjudicated and resolved legitimately;
- qualification records the exact final head SHA, exact tree SHA, and exact blob SHA for this record;
- merge uses that exact final head through `expected_head_sha` and produces a real merge commit;
- any conflict resolution or content-changing merge path invalidates qualification and requires fresh review;
- post-merge proof verifies canonical `main`, ordered parents, merge tree equality with the qualified candidate tree, and exact document blob equality;
- only after all post-merge checks pass does K5-R2 implementation become authorized.

## Immediate next gate after canonical adoption

If and only if this exact record is canonically adopted and post-merge proven:

```text
NEXT_GATE = K5-R2 EXACT EVIDENCE LINKAGE IMPLEMENTATION
IMPLEMENTATION_BASE = this record's canonical merge
IMPLEMENTATION_SCOPE = exact six-path allowlist above
K5-R3+ = NOT AUTHORIZED
```

No separate founder confirmation is required for ordinary repo-local continuation under the named founder authority, but every exact-content governance condition remains mandatory.