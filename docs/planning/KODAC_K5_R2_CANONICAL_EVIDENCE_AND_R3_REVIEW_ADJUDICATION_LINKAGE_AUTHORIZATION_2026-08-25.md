# Kodac K5-R2 Canonical Evidence and R3 Review-Adjudication Linkage Authorization

## Record identity

- Date: 2026-08-25
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-25`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION CANONICAL EVIDENCE / NEXT-SLICE AUTHORIZATION
- Canonical authorization base commit: `73246f28abc9abea89c5eb62996d11a857946e29`
- Canonical authorization base tree: `8094a4cf4d32e00c68e872a7d444c03b8315c7ea`
- Repository: `TheHalfMoon/Kodac`
- K5 definition / R1 authority: `docs/planning/KODAC_K5_DEFINITION_AND_R1_PROOF_PACKAGE_JUDGMENT_AUTHORIZATION_2026-08-25.md`
- K5-R1 canonical evidence / R2 authority: `docs/planning/KODAC_K5_R1_CANONICAL_EVIDENCE_AND_R2_EXACT_LINKAGE_AUTHORIZATION_2026-08-25.md`
- K5-R1 canonical evidence / R2 authority blob at this base: `eac470653c1fe57f521fd68173f6589ed6fd1e8d`
- KRI-R1 through KRI-R4 truth reconciliation: `docs/planning/KODAC_KRI_R1_R4_ROADMAP_TRUTH_RECONCILIATION_2026-08-24.md`
- KRI-R2 authorization: `docs/planning/KODAC_KRI_R2_FINDING_ADJUDICATION_RUNTIME_AUTHORIZATION_2026-08-13.md`
- KRI-R2 implementation evidence: `docs/planning/KODAC_KRI_R2_FINDING_ADJUDICATION_RUNTIME_EVIDENCE_2026-08-13.md`
- Governing constitution: `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`
- Canonical event/evidence linkage direction: `docs/adr/ADR-0005-canonical-session-event-tool-protocol.md`
- Mandatory side-effect trust boundary: `docs/adr/ADR-0006-mandatory-trust-hook-side-effects.md`

## Decision

Record the exact K5-R2 implementation and landing evidence as canonical repository truth, and authorize only the next bounded K5-R3 pure caller-materialized review-adjudication linkage slice after this exact record is itself canonically adopted and post-merge verified.

The state created by canonical adoption of this record is exactly:

```text
K5: DEFINED / IN PROGRESS — CANONICAL
K5-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED PURE PROOF-PACKAGE JUDGMENT SCOPE
K5-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED PURE EXACT EVIDENCE-LINKAGE SCOPE
K5-R3: AUTHORIZED ONLY FOR THE EXACT PURE CALLER-MATERIALIZED KRI REVIEW-ADJUDICATION LINKAGE SCOPE IN THIS RECORD
K5-R3 IMPLEMENTATION: NOT YET CANONICAL
K5-R4+: NOT AUTHORIZED
K5 CLOSEOUT: NOT AUTHORIZED BY THIS RECORD

KRI FINDING / ADJUDICATION AUTHORITY: UNCHANGED
KRI PROVIDER / QUALIFICATION AUTHORITY: UNCHANGED
K2 SIDE-EFFECT AUTHORITY: UNCHANGED
DONE GATE / PROVEN_READY AUTHORITY: UNCHANGED
```

Before canonical adoption and required post-merge proof of this document, K5-R3 implementation remains `NOT AUTHORIZED`.

This gate does not reinterpret K5-R2 or KRI. K5-R3 is a pure integrity-and-linkage layer over already-materialized KRI-R2 records. It does not execute a reviewer, create a finding, issue an adjudication, authenticate KRI runtime authority, qualify a reviewer, or convert a KRI lifecycle disposition into completion truth.

## Governing invariants

```text
REVIEWER OUTPUT = CLAIM DATA, NOT COMPLETION TRUTH
KRI FINDING IDENTITY = STRUCTURAL INTEGRITY, NOT AUTHORITY AUTHENTICATION
KRI ADJUDICATION IDENTITY = STRUCTURAL INTEGRITY, NOT TRANSFERABLE ADJUDICATOR AUTHORITY
KRI TERMINAL LIFECYCLE STATE != K5 EVIDENCE STATUS
KRI TERMINAL LIFECYCLE STATE != DONE GATE VERDICT
K5-R3 LINKED != SATISFIED
K5-R3 LINKED != PROVEN_READY
K5-R3 LINKAGE != KRI ADJUDICATION
K5-R3 LINKAGE != K2 EXECUTION AUTHORITY
K5-R3 LINKAGE != REPOSITORY WRITE / REVIEW / APPROVAL / MERGE AUTHORITY
```

Authority does not follow information flow.

The authorized information flow is only:

```text
caller-materialized K5-R1 proof package
+ caller-materialized KRI-R2 FindingRecord
+ caller-materialized KRI-R2 AdjudicationRecord
                |
                v
strict structural + identity revalidation
                |
                v
exact REVIEW_ADJUDICATION evidence linkage
                |
                v
immutable K5-R3 linkage data
```

K5-R3 stops there. K5-R4 is the separately gated layer for cross-class stale, contradictory, incomplete, and invalid proof handling. Done Gate integration remains separately gated beyond this record.

## K5-R2 canonical evidence ledger

### Qualified implementation identity

K5-R2 was qualified and merged through PR #193.

```text
K5-R2 AUTHORIZATION BASE:
fa0522488a48c9b2b945044979aa8918460e54e1

K5-R2 QUALIFIED CANDIDATE HEAD:
7ff9b25a5f9ce6de842067a122481aacdf4982eb

K5-R2 QUALIFIED CANDIDATE TREE:
8094a4cf4d32e00c68e872a7d444c03b8315c7ea

K5-R2 CANONICAL MERGE:
73246f28abc9abea89c5eb62996d11a857946e29

K5-R2 CANONICAL MERGE TREE:
8094a4cf4d32e00c68e872a7d444c03b8315c7ea
```

The canonical merge has the required ordered parents:

```text
parent 1 = fa0522488a48c9b2b945044979aa8918460e54e1
parent 2 = 7ff9b25a5f9ce6de842067a122481aacdf4982eb
```

The merge tree exactly equals the qualified candidate tree. The canonical authorization record remained byte-identical across landing.

### Exact K5-R2 canonical blobs

| Path | Canonical blob |
| --- | --- |
| `.github/workflows/k5-r2-evidence-linkage.yml` | `3fe731e333b766d2a762d57e0fc075bedfb91933` |
| `schema/k5-r2-evidence-linkage.schema.json` | `85ee0070895bbc5b4eef16c3cd1760b92e4dccb2` |
| `packages/kodac-runtime/src/proof-review/linkage-contracts.ts` | `59d87c73d829c4cd1d57dba134f79839f13b9722` |
| `packages/kodac-runtime/src/proof-review/linkage.ts` | `2ef2f786ee84dbcb2e937b710ee570963c50adc0` |
| `packages/kodac-runtime/src/index.ts` | `c6ba6ac132b69da989d37eb4f4ae238186a51026` |
| `packages/kodac-runtime/test/k5-r2-evidence-linkage.test.ts` | `4529c8c665dabcee3e2a0606113f7614e0139452` |

### Exact-head K5-R2 qualification

The dedicated exact-head workflow on `7ff9b25a5f9ce6de842067a122481aacdf4982eb` was:

```text
workflow run: 32820747790
job: 97718096182
result: PASS
```

The final qualification proved:

- exact PR head, authorization base, authorization tree, authorization-document blob, branch, repository, and six-path scope;
- immutable action commit pins;
- exact Node.js `24.18.0` and uv `0.12.1` validation toolchains;
- JSON Schema 2020-12 validity and hostile schema fixtures;
- fail-closed production purity scanning;
- exact production import boundaries;
- integrity-locked TypeScript validation tooling;
- strict TypeScript compilation;
- focused K5-R2 tests: 12 passed, 0 failed;
- focused K5-R1 regression: 17 passed, 0 failed;
- full TypeScript runtime: 950 tests, 946 passed, 4 intentionally skipped, 0 failed;
- Python: 395 passed;
- Ruff: PASS;
- provenance validation: PASS;
- unchanged checkout after validation.

A transient K3-R6 full-runtime failure on the same candidate was rerun without byte changes and passed on attempt 2, job `97718593270`. K2 runtime and the applicable shared qualification workflows were green on the same candidate. The historical K5-R1 workflow remained deliberately inapplicable to the R2 branch because its own first gate is pinned to the R1 branch/base; K5-R2 independently ran the canonical K5-R1 focused regression successfully.

### Exact-head review evidence

The final independent Qodo exact-head review on `7ff9b25a5f9ce6de842067a122481aacdf4982eb` reported:

```text
Zero material findings on the supplied exact-head K5-R2 diff.
```

The earlier Qodo fail-open grep finding was repaired and resolved. The earlier CodeRabbit protected-workflow observation was adjudicated as a future trust-root hardening proposal outside the six-path K5-R2 authority; CodeRabbit accepted that adjudication and resolved the thread. CodeRabbit's reproducibility finding was then repaired by pinning Node and uv exactly. The final CodeRabbit commit status was successful; no material review thread remained unresolved.

### K5-R2 canonical meaning

K5-R2 canonically links only these R1 evidence classes:

```text
VERIFICATION       -> VERIFICATION_REPORT
EXECUTION_RECEIPT  -> EXECUTION_RECEIPT
REPOSITORY_STATE   -> REPOSITORY_REVISION
```

It deliberately leaves `REVIEW_ADJUDICATION`, `ARTIFACT`, and `CUSTOM` outside its linkage authority. It preserves R1 evidence status unchanged and never grants Done Gate, KRI, K2, Git/GitHub, reviewer, persistence, or provider authority.

The K5-R2 dedicated artifacts are immutable dependencies for R3: the R2 workflow, schema, `linkage-contracts.ts`, `linkage.ts`, and focused R2 test must retain the exact blobs above. `packages/kodac-runtime/src/index.ts` is a shared public-export surface and is the only R2-ledger path whose bytes are authorized to change during R3. That change is additive-only: the R3 candidate may append its reviewed R3 export block, but it must not remove, rewrite, reorder, or alter any pre-existing export line. The implementation workflow must attest pre-R3 index blob `c6ba6ac132b69da989d37eb4f4ae238186a51026` and prove the diff contains additions only for R3 exports.

### Current K5-R1 dependency blobs

K5-R3 directly consumes the K5-R1 package contract and must preserve its exact semantics. At this authorization base:

| Path | Blob |
| --- | --- |
| `packages/kodac-runtime/src/proof-review/contracts.ts` | `ef0ae26c2a44157fb20ad33145788ba1255239f5` |
| `packages/kodac-runtime/src/proof-review/judge.ts` | `1b6093d6ec9239427e5f50a1dd9483d2c5603e36` |
| `schema/k5-r1-proof-package.schema.json` | `abe0a39158d57d1ae668e18914f567548015b092` |
| `schema/k5-r1-proof-judgment.schema.json` | `0cb015938744ec989e3bd34eabe24c436b4d0b18` |

R3 must not modify those paths.

## Canonical KRI dependency basis for K5-R3

K5-R3 consumes only already-canonical KRI-R2 data contracts. It does not consume KRI execution authority.

Canonical KRI lineage recorded by the reconciliation authority includes:

| Gate | Canonical merge |
| --- | --- |
| KRI-P0 | `37baeeb188ec1b214ceb1ba4d5b2a25bf2978356` |
| KRI-R1 authorization | `a6649626fd0c91f8326311ce532ca3ed16dba068` |
| KRI-R1 implementation | `a72a2308d03d7e07184df4d565ec4a2164280ca3` |
| KRI-R2 authorization | `efb3944a5638096fe845d49c3b1edf4ff91ea0c9` |
| KRI-R2 implementation | `6c1bf238e151f396191336f3a9902f21770bddf7` |
| KRI-R3 authorization | `63b39e32266eb85ee05d73ea0ebe1ba6a2ab39a2` |
| KRI-R3 implementation | `43a8f6f1b4497ac52bdb1c6f9a4e77e93ba5bc12` |
| KRI-R4 authorization | `b29a99d7c6743aa0f3ea271b16e59be362fec9a9` |
| KRI-R4 implementation | `ad5af49978a1d7befed1425f02a64474d3dc4ca7` |

Current KRI dependency blobs at this authorization base are:

| Path | Blob |
| --- | --- |
| `packages/kodac-runtime/src/reviewer-intelligence/contracts.ts` | `5ebe91c3d98f626651230989564d367d0600863c` |
| `packages/kodac-runtime/src/reviewer-intelligence/runtime.ts` | `4c5d01293d37b14ad4b017ec1e7dd17055393113` |
| `packages/kodac-runtime/src/reviewer-intelligence/provider-contracts.ts` | `97e95f3cd19aebf63c86dba254bc8e55f919c031` |
| `packages/kodac-runtime/src/reviewer-intelligence/executor.ts` | `1ff5d7273512af2f6ccb5c1d70ccb54369bac5e4` |
| `packages/kodac-runtime/src/reviewer-intelligence/qualification-contracts.ts` | `732667dee8cf2c31fbe225f5dea72d938f0e38a9` |
| `packages/kodac-runtime/src/reviewer-intelligence/qualification.ts` | `63ef7ed4acae1c80860b7f11436486be1829a073` |
| `schema/kri-finding.schema.json` | `ca74ebe040ed217d7696b9ae8cf612e21b462b07` |
| `schema/kri-adjudication.schema.json` | `814cfe0eeef170d51536df91366a22c42e10dcb8` |

K5-R3 must not modify any of those paths.

## Canonical KRI-R2 semantics retained

K5-R3 must consume KRI-R2 exactly as data and must preserve these canonical semantics:

```text
FindingRecord version:      kri-r2-finding-v1
AdjudicationRecord version: kri-r2-adjudication-v1
```

Finding freshness and initial state are:

```text
evaluatedHead == review.reviewedHead -> CURRENT / NEW
evaluatedHead != review.reviewedHead -> STALE / STALE
```

Canonical adjudication transitions are only:

```text
NEW + CONFIRM          -> CONFIRMED
NEW + REJECT           -> REJECTED
NEW + MARK_DUPLICATE   -> DUPLICATE
CONFIRMED + MARK_FIXED -> FIXED
FIXED + REVERIFY       -> REVERIFIED
```

All other transitions are structurally invalid. `STALE` has no adjudication transition.

Action-specific requirements remain canonical:

```text
MARK_DUPLICATE requires duplicateOf
MARK_FIXED requires correctionRef
REVERIFY requires reverificationRef
CONFIRM and REJECT allow none of those action-specific fields
```

And adjudication history syntax remains:

```text
previousState == NEW  -> previousAdjudicationIdentity == null
previousState != NEW  -> previousAdjudicationIdentity is a full SHA-256 identity
```

K5-R3 may revalidate those structural relationships. It may not prove that a reconstructed record was issued by a particular live KRI runtime, restore runtime-owned authority state, prove a prior adjudication chain exists, or mutate KRI state.

## KRI identity domain versus K5 identity domain

K5-R3 has two distinct identity domains and must never silently substitute one for the other.

### KRI-R2 identity domain

For accepted caller-materialized `FindingRecord` and `AdjudicationRecord` inputs, K5-R3 must reproduce the existing canonical KRI-R2 identity algorithm exactly.

The current KRI-R2 runtime recursively canonicalizes ordinary JSON-compatible object members by sorting object keys using its existing deterministic JavaScript string comparison, preserves array order, serializes with `JSON.stringify`, encodes the resulting text as UTF-8, and computes SHA-256. The KRI finding identity uses the historical finding preimage defined by canonical KRI-R2; the adjudication identity uses the adjudication preimage defined by canonical KRI-R2.

K5-R3 must not replace this legacy canonical KRI identity algorithm with RFC 8785 JCS. Revalidation must reproduce KRI-R2 identity bytes exactly for every R3-admitted record.

### K5-R3 identity domain

K5-R3's own source-descriptor and linkage identities use the canonical K5 JSON contract already established by K5-R1/R2:

```text
strict validated plain non-proxy JSON data
-> Kodac set normalization where specified
-> RFC 8785 JCS
-> UTF-8 without BOM
-> SHA-256
```

This separation is mandatory.

### Representation-admission rule

K5-R3 intentionally applies a stricter JavaScript representation boundary than the historical KRI-R2 runtime. This is a K5 consumer-side admission rule, not a mutation or reinterpretation of KRI-R2.

The ordering is mandatory:

```text
1. reject unsafe/ambiguous JavaScript representations at the K5-R3 boundary
2. normalize only admitted plain JSON data under exact KRI-R2 field semantics
3. prove the admitted semantic record is valid under the preserved KRI-R2 contract
4. recompute KRI identities using the exact legacy KRI-R2 algorithm
5. only then construct the K5-R3 source preimage and K5 JCS identity
```

Therefore R3 may reject a representation that the historical KRI parser could technically read—for example a Proxy, accessor-bearing object, symbol-bearing object, custom prototype, sparse/custom array, invalid Unicode scalar representation, or negative-zero numeric representation—even though R3 must never broaden KRI semantics or accept a semantic KRI record KRI-R2 would reject. For every record admitted by R3, the normalized KRI fields and KRI identity must be exactly those produced by the canonical KRI-R2 contract.

Embedded KRI string bounds retain the historical KRI-R2 JavaScript string-length semantics where that contract uses `.length`; R3 must not silently reinterpret those historical bounds as UTF-8 byte limits. R3's own outer descriptor fields use the explicit UTF-8 byte limits defined below. Because JSON Schema cannot express every JavaScript UTF-16-code-unit or UTF-8-byte constraint exactly, runtime validation is authoritative for those representation/byte relations and the schema must remain a compatible structural superset rather than claim a contradictory length rule.

## Authorized K5-R3 source descriptor

After canonical adoption of this exact record, K5-R3 may define one source descriptor version:

```text
kodac-k5-r3-review-adjudication-source-v1
```

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
finding
adjudication
```

The only authorized `sourceKind` is:

```text
KRI_ADJUDICATION
```

A K5-R3 source descriptor may target only an existing K5-R1 evidence record whose `kind` is exactly:

```text
REVIEW_ADJUDICATION
```

No descriptor may target any other R1 evidence kind.

### Descriptor bounds

The first R3 contract is bounded as follows:

```text
source descriptors per invocation: 0 through 4096
evidenceId: non-empty, NUL-free, <= 128 UTF-8 bytes
canonicalBase: exact lowercase 40-hex Git commit identity
candidateHead: exact lowercase 40-hex Git commit identity
sourceRef: non-empty, NUL-free, <= 1024 UTF-8 bytes
sourceDigest: exact lowercase 64-hex SHA-256 identity
```

Duplicate descriptor `evidenceId` values fail structurally. Descriptor ordering is not semantically significant; the implementation canonicalizes by `evidenceId` after validation.

### Embedded KRI record rules

The descriptor contains the complete caller-materialized KRI-R2 `FindingRecord` and `AdjudicationRecord` required for independent structural and identity inspection.

K5-R3 must validate at least:

- exact KRI versions;
- exact object shapes and historical KRI bounds;
- exact review identity grammar;
- exact Git/SHA-256 grammar;
- affected path/range grammar;
- exact severity, freshness, finding-state, action, previous-state, and resulting-state vocabularies;
- canonical evidence-reference normalization retained by KRI-R2;
- recomputed `findingIdentity` equals the claimed identity;
- recomputed `adjudicationIdentity` equals the claimed identity;
- `adjudication.findingIdentity == finding.findingIdentity`;
- finding freshness/state relation is internally valid;
- adjudication transition and action-specific fields are internally valid;
- previous-adjudication identity nullability is internally valid.

Because canonical KRI-R2 cannot adjudicate a stale finding, an R3 source descriptor must contain an embedded finding that is structurally:

```text
freshness = CURRENT
state = NEW
review.reviewedHead = evaluatedHead
```

The embedded adjudication must have one of the canonical resulting states:

```text
CONFIRMED
REJECTED
DUPLICATE
FIXED
REVERIFIED
```

Those values remain KRI lifecycle data only. K5-R3 must not map any of them automatically to `SATISFIED`, `FAILED`, `CONTRADICTORY`, `INVALID`, `PROVEN_READY`, approval, mergeability, or completion truth.

### Exact revision binding

K5-R3 must prevent a caller from relabeling an old KRI record as evidence for a different revision.

Therefore the descriptor's outer revision is bound to the embedded KRI finding exactly:

```text
descriptor.canonicalBase == finding.review.canonicalBase
descriptor.candidateHead == finding.evaluatedHead
descriptor.candidateHead == finding.review.reviewedHead
```

The descriptor's outer revision is then compared independently to the validated K5-R1 package revision:

```text
descriptor.canonicalBase == proofPackage.revision.canonicalBase
descriptor.candidateHead == proofPackage.revision.candidateHead
```

A structurally valid source representing an adjudication for an older head remains historical KRI data, but cannot be relabeled as current K5 package evidence. It produces R3 `REVISION_MISMATCH` when its outer, embedded-bound revision differs from the current K5 package revision.

As in canonical K5-R2, R3 does **not** use the target R1 evidence record's own `canonicalBase` / `candidateHead` fields as the semantic linkage revision comparator. Those R1 evidence fields and its pre-existing `status` remain package data to be preserved, not rejudged by R3. The validated R1 **package revision** is the linkage revision root. Any inconsistency between an R1 evidence record's embedded revision/status and the package/source relationship belongs to separately authorized K5-R4 handling.

K5-R3 does not contact Git and does not prove ancestry.

### Exact source digest semantics

For this first R3 contract, `sourceDigest` is not an arbitrary caller-selected digest. It is exactly the embedded KRI-R2 adjudication identity:

```text
sourceDigest == adjudication.adjudicationIdentity
```

The target R1 `REVIEW_ADJUDICATION` evidence record is linked only when its `digest` equals this exact `sourceDigest`.

This makes the R1 digest comparison an exact KRI adjudication semantic-identity binding. It does not convert that identity into a signature or authenticated runtime authority.

`sourceRef` remains an opaque bounded caller-materialized locator and must match the target R1 evidence `ref` exactly for `LINKED` status. It is never interpreted as a URL, path, instruction, command, Git reference, or authority token.

### Source identity

`sourceIdentity` is SHA-256 over the exact normalized descriptor excluding `sourceIdentity`, using K5 canonical JSON v1 / RFC 8785 JCS / UTF-8.

Every embedded KRI field therefore participates indirectly in the K5-R3 source identity after its own KRI identity has first been independently validated.

## Authorized K5-R3 linkage result

After canonical adoption, K5-R3 may define one linkage version:

```text
kodac-k5-r3-review-adjudication-linkage-v1
```

The linkage result contains exactly:

```text
version
packageIdentity
revision
links
outOfScopeEvidenceIds
sourceIdentities
linkageIdentity
```

`revision` is an immutable copy of the validated K5-R1 package revision.

`links` contains exactly one result for every R1 evidence record whose kind is `REVIEW_ADJUDICATION`, sorted by `evidenceId`.

Every link result contains exactly:

```text
evidenceId
evidenceKind
sourceKind
status
codes
sourceIdentity
```

with:

```text
evidenceKind = REVIEW_ADJUDICATION
sourceKind = KRI_ADJUDICATION | null
sourceIdentity = lowercase SHA-256 | null
```

Every other R1 evidence ID appears exactly once in `outOfScopeEvidenceIds`, canonically sorted. R3 does not mutate or reinterpret those other evidence classes.

`sourceIdentities` is the duplicate-free canonical sorted set of all validated supplied R3 source identities.

The linkage identity uses K5 canonical JSON v1 / JCS / UTF-8 / SHA-256 over the full normalized result excluding `linkageIdentity`.

### Link vocabulary

The only statuses are:

```text
LINKED
UNLINKED
MISMATCH
```

The only mismatch codes, in fixed rank order, are:

```text
1. NO_SOURCE
2. REVISION_MISMATCH
3. REF_MISMATCH
4. DIGEST_MISMATCH
```

There is no `KIND_MISMATCH` in this first R3 contract because both sides are structurally closed before semantic linkage:

```text
descriptor sourceKind must be KRI_ADJUDICATION
R1 target kind must be REVIEW_ADJUDICATION
```

Wrong kinds are structural `TypeError`, not semantic mismatch.

### Link semantics

For one target R1 `REVIEW_ADJUDICATION` evidence record:

- no descriptor with its `evidenceId` -> `UNLINKED` with exactly `[NO_SOURCE]`, null source kind, and null source identity;
- exact package revision + exact ref + exact digest -> `LINKED` with no codes and the exact source identity;
- one or more outer/package revision, ref, or digest mismatches -> `MISMATCH` with every applicable code emitted once in fixed rank order and the exact source identity.

The following are structural errors and must fail the whole R3 operation before output:

- malformed or tampered K5-R1 package;
- malformed/tampered source descriptor;
- malformed/tampered embedded KRI finding or adjudication;
- duplicate descriptor `evidenceId`;
- descriptor `evidenceId` absent from the validated R1 package;
- descriptor targeting an R1 evidence record that is not `REVIEW_ADJUDICATION`;
- descriptor source kind other than `KRI_ADJUDICATION`;
- KRI finding/adjudication identity mismatch;
- adjudication referring to a different finding identity;
- impossible KRI transition or action-specific field combination;
- embedded stale/non-NEW finding;
- descriptor outer revision not equal to its embedded KRI revision;
- `sourceDigest` not equal to `adjudication.adjudicationIdentity`;
- source identity mismatch;
- unsupported version/vocabulary/unknown field;
- hostile JavaScript structure rejected by the structural boundary.

K5-R3 must validate the entire K5-R1 package before inspecting any source descriptor.

## R1/R2 status preservation

K5-R3 must never mutate the K5-R1 package or rewrite its evidence status.

For example, a caller may present an R1 `REVIEW_ADJUDICATION` evidence record with `status: STALE`, `FAILED`, `CONTRADICTORY`, or `INVALID`. If its separately supplied R3 KRI source exactly matches the package revision/ref/digest, the R3 source may still be structurally `LINKED`; the original R1 status remains unchanged.

Conversely, `LINKED` does not upgrade any R1 status to `SATISFIED`.

K5-R4, if separately authorized later, owns explicit cross-class stale/contradictory/incomplete/invalid handling. R3 must not smuggle R4 judgment semantics into linkage.

K5-R2 linkage behavior and dedicated bytes must remain unchanged. K5-R3 is a separate result surface and must not add `KRI_ADJUDICATION` to the K5-R2 source-kind vocabulary. The shared root `index.ts` may change only under the additive-only rule above.

## Hostile-input and determinism boundary

K5-R3 production code must be pure, deterministic, synchronous, in-memory, and fail closed.

Before prototype inspection, enumeration, descriptor inspection, traversal, canonicalization, or identity construction, every object and array encountered at the K5-R3 structural boundary must be checked with `node:util` `types.isProxy` and rejected if proxied.

The implementation must also reject:

- accessors;
- symbol keys;
- non-plain object prototypes;
- sparse arrays;
- array custom own fields;
- cyclic structures;
- explicit `undefined`;
- functions, bigint, symbol primitive values, or non-JSON values;
- invalid Unicode scalar sequences / unpaired surrogates;
- NUL where a field is declared NUL-free;
- unsafe integers, non-integers, infinities, NaN, and negative zero where numbers are accepted;
- unknown keys and unknown vocabulary values.

Returned normalized source descriptors, embedded copies, links, arrays, and linkage records must be deeply immutable copies with no alias back to caller-owned mutable objects.

No locale-sensitive sorting is authorized.

## Authorized implementation paths after canonical adoption

Only after this exact record is merged to protected `main` and its required post-merge proof succeeds, K5-R3 implementation is authorized on a fresh branch from that canonical merge and only for these exact six paths:

```text
.github/workflows/k5-r3-review-adjudication-linkage.yml
schema/k5-r3-review-adjudication-linkage.schema.json
packages/kodac-runtime/src/proof-review/review-adjudication-contracts.ts
packages/kodac-runtime/src/proof-review/review-adjudication.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k5-r3-review-adjudication-linkage.test.ts
```

No seventh path is authorized without a separate canonical scope extension.

The implementation PR must not modify this authorization document.

## Authorized production API/export surface

The public R3 orchestrator is:

```text
linkK5R3ReviewAdjudicationEvidence
```

The contract module may expose only the constants, readonly data types, source builder/validator, and linkage validator needed by that pure API. The intended source helpers are:

```text
createK5R3ReviewAdjudicationSource
validateK5R3ReviewAdjudicationSource
validateK5R3ReviewAdjudicationLinkage
```

The exact reviewed export block is qualified as part of the candidate. It must be appended to the existing root index without editing existing export lines.

## Authorized production import surface

The production K5-R3 source may use only deterministic local validation/identity support.

Permitted static runtime imports are limited to:

```text
node:crypto
node:util
./contracts.ts
./review-adjudication-contracts.ts
```

`node:util` authority is limited to `types.isProxy`.

A TypeScript `import type` from `../reviewer-intelligence/contracts.ts` may be used only if the emitted/runtime import surface remains empty and the exact KRI dependency blob is attested by the implementation workflow. No runtime import from KRI `runtime.ts`, `executor.ts`, `provider-contracts.ts`, `qualification.ts`, or any KRI stateful class is authorized.

No dynamic `import()`, `require`, loader, eval, Function construction, filesystem, process, child process, network, worker, timer, clock, random, environment, Git/GitHub, provider, or persistence surface is authorized in K5-R3 production code.

## Schema requirements

The R3 JSON Schema must use JSON Schema 2020-12 and represent both the source descriptor and linkage result as closed exact structures.

It must at minimum encode:

- exact R3 versions;
- exact source kind;
- exact link statuses and mismatch codes;
- lowercase Git/SHA-256 grammar;
- KRI finding/adjudication closed vocabularies and object shapes;
- action-specific adjudication branches where JSON Schema can express them;
- current/NEW embedded finding representation;
- target linkage nullability rules;
- collection bounds where JSON Schema expresses the same semantic unit;
- exact link `REVIEW_ADJUDICATION` kind;
- additional-properties denial throughout.

Runtime validation remains authoritative for security-relevant relations JSON Schema cannot express exactly, including identity recomputation, embedded/outside revision equality, KRI finding/adjudication identity recomputation, target-package correlation, UTF-8 byte limits, historical JavaScript string-length semantics, and representation-level hostile-input rejection. Schema/runtime parity means the schema must not contradict runtime vocabulary, required/optional shape, nullability, or representable branches; it need not pretend to encode a byte/code-unit relation JSON Schema does not natively model.

The workflow must include hostile schema mutations so schema acceptance cannot silently drift from runtime semantics.

## Required implementation proofs

The exact-head K5-R3 candidate must prove at least all of the following:

1. K5-R1 package validation happens before source inspection.
2. Only `REVIEW_ADJUDICATION` R1 evidence may be targeted.
3. Only `KRI_ADJUDICATION` source descriptors are representable.
4. Complete embedded KRI-R2 finding/adjudication records are structurally validated.
5. R3's stricter representation admission runs before embedded KRI traversal/canonicalization and does not broaden KRI semantics.
6. KRI finding identity is recomputed under the exact canonical KRI-R2 identity algorithm.
7. KRI adjudication identity is recomputed under the exact canonical KRI-R2 identity algorithm.
8. KRI identity recomputation is not accidentally replaced by K5 JCS.
9. `adjudication.findingIdentity` must equal the embedded finding identity.
10. Embedded finding must be `CURRENT / NEW` with `evaluatedHead == reviewedHead`.
11. Adjudication action/previous/resulting state semantics are exact.
12. Action-specific duplicate/correction/reverification fields are exact.
13. Previous-adjudication identity nullability is exact.
14. Outer descriptor revision is exactly bound to embedded KRI revision.
15. Outer descriptor revision is compared exactly to K5 package revision.
16. R1 target evidence `canonicalBase` / `candidateHead` / `status` are preserved data, not linkage-revision comparators or R3 judgment inputs.
17. `sourceDigest` must equal `adjudicationIdentity` before target comparison.
18. `sourceRef` and digest correlate only by exact string equality to the R1 target record.
19. Missing source derives only `UNLINKED + NO_SOURCE`.
20. Revision/ref/digest mismatches are cumulative and emitted in fixed rank order.
21. Orphan targets, non-R3 targets, duplicate descriptors, malformed descriptors, and identity tampering fail structurally.
22. KRI terminal lifecycle values remain data only and never map automatically to R1 status.
23. R1 evidence status remains byte-for-byte/semantically unchanged by R3.
24. K5-R2 dedicated workflow/schema/contracts/linkage/test blobs remain exact.
25. The shared pre-R3 `index.ts` changes only by additive R3 export lines; all pre-existing export lines remain unchanged.
26. Canonical K5-R1 contract/judge/schema bytes remain unchanged.
27. Canonical KRI-R2/R3/R4 production source and schema bytes remain unchanged.
28. Direct and nested proxies are rejected before traps execute.
29. Accessors, symbols, sparse arrays, custom prototypes, cycles, non-JSON values, invalid Unicode, and unsafe/negative-zero numbers fail closed at R3 admission.
30. Embedded KRI historical string-length semantics are preserved for admitted semantic records; R3 outer fields use their explicit UTF-8 byte bounds.
31. Source and linkage outputs are deeply immutable detached copies.
32. K5 source/linkage identities use K5 JCS; KRI identities use the preserved KRI algorithm.
33. Published schema and runtime vocabularies/nullability/branches remain compatible under the schema/runtime rule above.
34. Production imports remain inside the exact allowed pure surface.
35. No Done Gate, `PROVEN_READY`, KRI runtime, KRI executor, KRI qualification, K2, Git/GitHub, provider, network, filesystem, process, persistence, review, approval, merge, or write authority is introduced.
36. Strict TypeScript passes.
37. Focused K5-R3 tests pass.
38. Focused K5-R2 and K5-R1 regression tests pass on the exact head.
39. Full runtime tests pass on the exact head across applicable existing CI lanes.
40. Python, Ruff, and provenance gates pass.
41. Exact-head independent review reports zero unresolved material findings.
42. Changed paths are exactly the six authorized implementation paths.
43. Checkout remains unchanged after qualification.
44. Main remains the exact authorization merge used as implementation base until landing or the candidate is requalified against any canonically authorized replacement.
45. Post-merge ordered-parent/tree/blob proof completes before K5-R3 is called canonical.

## K5-R3 implementation workflow requirements

The authorized workflow path is itself one of the six implementation artifacts under review, not a newly granted protected trust root.

At minimum the workflow must fail closed on:

- wrong implementation branch;
- wrong repository;
- wrong PR base;
- wrong authorization merge/tree/document blob;
- any path outside the exact six-path allowlist;
- mutable or unexpected Action references;
- unexpected production imports;
- purity/determinism forbidden surfaces;
- schema hostile mutations;
- KRI dependency blob drift;
- K5-R1 dependency blob drift;
- K5-R2 dedicated dependency blob drift;
- any root-index edit other than additive reviewed R3 exports from pre-R3 blob `c6ba6ac132b69da989d37eb4f4ae238186a51026`;
- TypeScript/runtime/Python/Ruff/provenance failure;
- dirty checkout after validation.

Action references must be immutable commit pins. Validation runtime/toolchain versions must be exact rather than floating.

Any protected reusable workflow or repository trust-root hardening remains a separately authorizable protected-lane change and must not be smuggled into this six-path implementation gate.

## K5-R3 non-grants

Canonical adoption of this record does **not** authorize any of the following:

```text
K5-R4+ IMPLEMENTATION: NOT AUTHORIZED
K5 CLOSEOUT: NOT AUTHORIZED
DONE GATE MODIFICATION: NOT AUTHORIZED
PROVEN_READY EMISSION OR AUTHORITY FROM K5: NOT AUTHORIZED

KRI FINDING CREATION OR MUTATION BY K5: NOT AUTHORIZED
KRI ADJUDICATION CREATION OR MUTATION BY K5: NOT AUTHORIZED
KRI RUNTIME AUTHORITY RECONSTRUCTION: NOT AUTHORIZED
KRI PROVIDER EXECUTION BY K5: NOT AUTHORIZED
KRI REVIEWER QUALIFICATION OR ROUTING BY K5: NOT AUTHORIZED
KRI-R5+ IMPLEMENTATION: NOT AUTHORIZED

K2 EXECUTION-AUTHORITY EXPANSION: NOT AUTHORIZED
ExecutionGateway CALLS FROM K5-R3: NOT AUTHORIZED
FILESYSTEM / PROCESS / CHILD-PROCESS AUTHORITY: NOT AUTHORIZED
NETWORK / PROVIDER / SECRET AUTHORITY: NOT AUTHORIZED
GIT / GITHUB READ OR WRITE AUTHORITY FROM K5-R3: NOT AUTHORIZED
PERSISTENT REVIEW / PROOF STORAGE: NOT AUTHORIZED
PERSISTENT REVIEW / PROOF LEARNING: NOT AUTHORIZED
VECTOR / EMBEDDING INFRASTRUCTURE: NOT AUTHORIZED

AUTOFIX EXECUTION: NOT AUTHORIZED
REPOSITORY WRITE AUTHORITY FROM K5-R3: NOT AUTHORIZED
GITHUB COMMENT / REVIEW WRITE AUTHORITY FROM K5-R3: NOT AUTHORIZED
PR APPROVAL AUTHORITY FROM K5-R3: NOT AUTHORIZED
MERGE AUTHORITY FROM K5-R3: NOT AUTHORIZED
RULESET CHANGE: NOT AUTHORIZED

EXTERNAL REVIEW SERVICE INTEGRATION: NOT AUTHORIZED
CONCRETE EXTERNAL REVIEWER ADAPTER: NOT AUTHORIZED
NEW KODAC DEPENDENCIES: NOT AUTHORIZED
CODE IMPORT: NOT AUTHORIZED

PUBLIC RELEASE: NOT AUTHORIZED
PACKAGE PUBLICATION: NOT AUTHORIZED
BRAND LAUNCH: NOT AUTHORIZED
TRADEMARK / NAME CLEARANCE: NOT ESTABLISHED BY THIS RECORD
```

This record does not modify `code_import_authorized` and admits no external source.

## Documentation-gate qualification

This authorization candidate is a one-path documentation gate. It is eligible for canonical adoption only when all of the following are true on the exact final head:

- PR base ref is exactly `main` and PR base SHA is exactly `73246f28abc9abea89c5eb62996d11a857946e29` unless canonical `main` moves first, in which case the candidate branch must be brought forward by a non-destructive merge from canonical `main` or the record must be re-authored/requalified against live canonical truth rather than merged stale;
- changed paths contain exactly this file and no other path;
- the K5-R2 merge, ordered parents, tree, dedicated canonical implementation blobs, shared-index preimage, authorization blob, CI evidence, and review evidence above remain exact;
- the current K5-R1 dependency blobs above remain exact;
- canonical KRI-R2/R3/R4 lineage and dependency blobs above remain ancestors/current where claimed;
- K5-R3 scope remains pure caller-materialized linkage only;
- R4+ remains unauthorized;
- all preserved non-grants remain explicit;
- normal documentation/governance checks are green;
- exact-head independent review has zero unresolved material findings;
- unresolved material review threads are zero;
- protected `main` remains protected;
- landing uses an expected-head guard rather than an unqualified moving branch tip.

## Required post-merge proof for this record

Canonical adoption and K5-R3 implementation authority are effective only after this documentation PR is merged and all of the following are proven against live GitHub truth:

1. merge commit parent 1 is exactly the pre-merge canonical `main` head;
2. merge commit parent 2 is exactly the qualified documentation candidate head;
3. merge commit tree exactly equals the qualified candidate tree;
4. this document's blob on canonical `main` exactly equals its qualified candidate blob;
5. no unauthorized path is introduced by the merge;
6. the PR is `MERGED`;
7. protected `main` remains protected;
8. applicable post-merge governance/qualification evidence is green or any non-applicable historical gate is explicitly proven non-applicable rather than treated as success;
9. the canonical merge identity is recorded before any K5-R3 source branch is created.

Only after all nine conditions pass may K5-R3 source implementation begin under the exact six-path allowlist above.

## Stop condition

This record authorizes one bounded next step only.

If the documentation gate becomes canonical and post-merge proof succeeds, begin K5-R3 implementation from that exact canonical merge. Do not begin K5-R4, Done Gate integration, K5 closeout, KRI mutation, reviewer execution, provider integration, persistence, or release work without a separate canonical authorization.