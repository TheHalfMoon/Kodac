# Kodac K5-R3 Canonical Evidence and R4 Proof-State Reconciliation Authorization

## Record identity

- Date: 2026-08-25
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-25`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION CANONICAL EVIDENCE / NEXT-SLICE AUTHORIZATION
- Canonical base commit: `24139e1a20acf31dd674a30b0c2f271789f60955`
- Canonical base tree: `85901a39e9dcfea708e27d001d3113d9014a90ae`
- K5-R3 authorization merge: `4c483cb04f619a518469f9823ebc43a67a317a77` (PR #194)
- K5-R3 qualified implementation head: `894ecb43a6c7f4a3afdf47381cafb7bd7b3f7fcb`
- K5-R3 qualified implementation tree: `85901a39e9dcfea708e27d001d3113d9014a90ae`
- K5-R3 implementation merge: `24139e1a20acf31dd674a30b0c2f271789f60955` (PR #195)
- Governing K5-R3 authorization record: `docs/planning/KODAC_K5_R2_CANONICAL_EVIDENCE_AND_R3_REVIEW_ADJUDICATION_LINKAGE_AUTHORIZATION_2026-08-25.md`
- K5 roadmap authority: `docs/roadmap/ROADMAP.md`
- Governing constitution: `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`
- Canonical event/evidence linkage direction: `docs/adr/ADR-0005-canonical-session-event-tool-protocol.md`
- Mandatory side-effect trust boundary: `docs/adr/ADR-0006-mandatory-trust-hook-side-effects.md`

## Decision

Conditionally adopt the exact K5-R3 implementation evidence as canonical repository truth and authorize only the next bounded K5-R4 pure proof-state reconciliation slice if and only if this one-path documentation record itself is canonically adopted and post-merge verified.

The resulting state after canonical adoption and required post-merge proof of this exact record is:

```text
K5: DEFINED / IN PROGRESS — CANONICAL
K5-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED PURE PROOF-PACKAGE JUDGMENT SCOPE
K5-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED PURE EXACT EVIDENCE-LINKAGE SCOPE
K5-R3: CANONICAL / COMPLETE FOR ITS AUTHORIZED PURE REVIEW-ADJUDICATION LINKAGE SCOPE
K5-R4: AUTHORIZED ONLY FOR THE EXACT PURE PROOF-STATE RECONCILIATION SCOPE IN THIS RECORD
K5-R4 IMPLEMENTATION: NOT YET CANONICAL
K5-R5+: NOT AUTHORIZED
K5 CLOSEOUT: NOT AUTHORIZED

DONE GATE / PROVEN_READY AUTHORITY: UNCHANGED
KRI FINDING / ADJUDICATION AUTHORITY: UNCHANGED
KRI PROVIDER / QUALIFICATION AUTHORITY: UNCHANGED
K2 SIDE-EFFECT AUTHORITY: UNCHANGED
```

Until this record is canonically adopted and post-merge verified, K5-R4 source implementation remains unauthorized.

This gate does not reinterpret R1 evidence truth, R1 package judgment, R2 source metadata, R3 KRI lifecycle state, or any existing Done Gate result. It authorizes one deterministic reconciliation layer over already-materialized and independently validated K5 records only.

## Governing invariants

```text
K5-R4 RECONCILIATION != K5-R1 PACKAGE JUDGMENT
K5-R4 RECONCILIATION != DONE GATE VERDICT
K5-R4 VALID != PROVEN_READY
K5-R4 INCOMPLETE != EXECUTION FAILURE AUTHORITY
K5-R4 STALE != REPOSITORY MUTATION AUTHORITY
K5-R4 CONTRADICTORY != REVIEWER ADJUDICATION
K5-R4 INVALID != KRI AUTHORITY REVOCATION
K5-R4 OUTPUT != APPROVAL / MERGE / WRITE AUTHORITY
AUTHORITY DOES NOT FOLLOW INFORMATION FLOW
```

K5-R4 may only normalize already-existing structural facts. It may never strengthen an evidence status, repair a missing source, authenticate a reviewer, execute a producer, infer a Git ancestry relationship, or turn structural consistency into completion truth.

## K5-R3 canonical implementation ledger

K5-R3 was qualified and merged through PR #195.

```text
K5-R3 AUTHORIZATION BASE:
4c483cb04f619a518469f9823ebc43a67a317a77

K5-R3 QUALIFIED CANDIDATE HEAD:
894ecb43a6c7f4a3afdf47381cafb7bd7b3f7fcb

K5-R3 QUALIFIED CANDIDATE TREE:
85901a39e9dcfea708e27d001d3113d9014a90ae

K5-R3 CANONICAL MERGE:
24139e1a20acf31dd674a30b0c2f271789f60955

K5-R3 CANONICAL MERGE TREE:
85901a39e9dcfea708e27d001d3113d9014a90ae
```

The canonical merge has the required ordered parents:

```text
parent 1 = 4c483cb04f619a518469f9823ebc43a67a317a77
parent 2 = 894ecb43a6c7f4a3afdf47381cafb7bd7b3f7fcb
```

The merge tree exactly equals the qualified candidate tree.

### Exact K5-R3 canonical blobs

| Path | Canonical blob |
| --- | --- |
| `.github/workflows/k5-r3-review-adjudication-linkage.yml` | `594207a4e9b6275f1f2d083308ef0cb92ed5b499` |
| `schema/k5-r3-review-adjudication-linkage.schema.json` | `51d557c93d6b7f09721ddcfccef857e418fdcc1e` |
| `packages/kodac-runtime/src/proof-review/review-adjudication-contracts.ts` | `d738c50de8f33e82f21f9392e9194f9499156f09` |
| `packages/kodac-runtime/src/proof-review/review-adjudication.ts` | `b8cdfc74b6ff786770a4097995696f9bea722daf` |
| `packages/kodac-runtime/src/index.ts` | `cb4bc58d757d212201ab037295f93bf504808939` |
| `packages/kodac-runtime/test/k5-r3-review-adjudication-linkage.test.ts` | `ef8cffde60f72e85e825834c431c81b500159ab4` |

The predecessor authorization record remains byte-identical on canonical `main`:

```text
docs/planning/KODAC_K5_R2_CANONICAL_EVIDENCE_AND_R3_REVIEW_ADJUDICATION_LINKAGE_AUTHORIZATION_2026-08-25.md
blob = ed21c4c7dcebeaecfad840c282e1d1ed1c916801
```

## K5-R3 qualification and review evidence

The final dedicated exact-head K5-R3 qualification was:

```text
workflow run = 32841658947
job          = 97782299031
head         = 894ecb43a6c7f4a3afdf47381cafb7bd7b3f7fcb
result       = PASS
```

That exact-head job passed all of the following:

- exact PR head, authorization base, branch, repository, six-path scope, and dependency-blob attestation;
- immutable GitHub Action commit pins;
- JSON Schema validation and hostile schema fixtures;
- production purity and import-boundary enforcement;
- strict TypeScript compilation;
- focused K5-R3 tests;
- focused K5-R2 and K5-R1 regressions;
- full TypeScript runtime tests;
- Python tests;
- Ruff;
- provenance validation;
- unchanged checkout after qualification.

Applicable shared exact-head lanes were green at landing, including:

```text
governance                         32841658972 PASS
k2-runtime                         32841658960 PASS
k3-r4-adapter                      32841658986 PASS on final same-byte rerun
k3-r5-context-engine               32841658951 PASS
k3-r6-relation-graph               32841658958 PASS
k4-r1-compatibility-normalization  32841659020 PASS
k4-r2-mcp-catalog-evidence         32841658950 PASS
k4-r3-acp-method-catalog-evidence  32841658979 PASS
k4-r4-agent-skill-package-evidence 32841658953 PASS
k4-r5-agent-skill-governance-claim-evidence 32841659081 PASS
```

The reusable K3-R4 lane initially exposed one timing-sensitive H4-R3G-B global-deadline/reaping regression. The exact failing test blob was byte-identical between the K5-R3 authorization base and K5-R3 candidate (`c37aba5c1a217a2ba5d367258d1aa7443639cf48`). No K5-R3 byte touched that path. A final rerun on the exact unchanged K5-R3 head passed completely at job `97784128273`, including full runtime and unchanged-checkout attestation. No waiver was taken.

The historical K5-R1 and K5-R2 implementation workflows remained branch/base-pinned historical gates and were therefore non-applicable to the R3 branch; the dedicated R3 workflow independently executed the canonical focused R2/R1 regression suites successfully.

Independent exact-head Qodo review on the final candidate reported:

```text
Bugs: 0
Rule violations: 0
```

The two earlier Qodo High findings were repaired before landing:

1. the K5-R3 workflow import guard was changed to fail closed on side-effect or unsupported static import forms;
2. hostile JSON pre-scan traversal was changed from unbounded recursion to bounded iterative traversal with focused deep/wide regression coverage.

Both material review threads were resolved. Exact-head CodeRabbit commit status was `success`, and no unresolved material CodeRabbit review thread existed at landing.

## Required K5-R4 dependency basis

K5-R4 is a pure reconciliation layer over canonical K5-R1, K5-R2, and K5-R3 data. The following predecessor production blobs are immutable dependencies for the R4 source slice:

| Path | Required blob |
| --- | --- |
| `packages/kodac-runtime/src/proof-review/contracts.ts` | `ef0ae26c2a44157fb20ad33145788ba1255239f5` |
| `packages/kodac-runtime/src/proof-review/judge.ts` | `1b6093d6ec9239427e5f50a1dd9483d2c5603e36` |
| `packages/kodac-runtime/src/proof-review/linkage-contracts.ts` | `59d87c73d829c4cd1d57dba134f79839f13b9722` |
| `packages/kodac-runtime/src/proof-review/linkage.ts` | `2ef2f786ee84dbcb2e937b710ee570963c50adc0` |
| `packages/kodac-runtime/src/proof-review/review-adjudication-contracts.ts` | `d738c50de8f33e82f21f9392e9194f9499156f09` |
| `packages/kodac-runtime/src/proof-review/review-adjudication.ts` | `b8cdfc74b6ff786770a4097995696f9bea722daf` |

K5-R4 must not modify those predecessor files.

The shared public-export surface `packages/kodac-runtime/src/index.ts` is the only predecessor-ledger source path authorized to change during R4, and only by additive append of the reviewed R4 export block. Every pre-R4 export line must remain byte-for-byte and order-identical.

## K5-R4 purpose

The roadmap defines K5-R4 as:

> explicit stale / contradictory / incomplete / invalid proof handling across linked evidence classes

R1 already owns evidence status and deterministic package judgment. R2 already owns exact typed linkage for `VERIFICATION`, `EXECUTION_RECEIPT`, and `REPOSITORY_STATE`. R3 already owns exact KRI adjudication linkage for `REVIEW_ADJUDICATION` without reviewer-authority transfer.

R4 therefore answers only:

> Given one already-valid R1 package plus its canonical R2 and R3 linkage records, what is the deterministic reconciliation state of each linked evidence record and of the linked-evidence subset as a whole?

R4 must not rerun R1 evidence producers, reinterpret R1 status truth, reconstruct R2/R3 source descriptors, authenticate KRI runtime issuance, or make Done Gate decisions.

## Authorized K5-R4 contract

### Inputs

The public R4 reconciliation function accepts exactly:

1. one caller-materialized K5-R1 `K5R1ProofPackage`;
2. one caller-materialized canonical K5-R2 `K5R2EvidenceLinkage`;
3. one caller-materialized canonical K5-R3 `K5R3ReviewAdjudicationLinkage`.

Before any cross-record reconciliation, R4 must independently invoke the canonical predecessor validators for all three structures. The full R1 package must be validated before R2/R3 linkage inspection so a malformed package cannot cause later untrusted linkage traversal or hooks to execute first.

R4 must then prove all cross-record bindings exactly:

```text
r2.packageIdentity == package.packageIdentity
r3.packageIdentity == package.packageIdentity
r2.revision == package.revision
r3.revision == package.revision
```

Revision equality is exact field equality over:

```text
repositoryId
canonicalBase
candidateHead
```

R4 must also prove that each linkage's `links` set exactly covers the corresponding package evidence subset and that each linkage's `outOfScopeEvidenceIds` is the exact canonical complement required by its predecessor contract. Missing, duplicated, orphaned, substituted, or cross-package linkage membership is structural `TypeError`, not a reconciliation status.

### Linked evidence classes

R4 reconciles exactly these four R1 evidence kinds:

```text
VERIFICATION       -> K5-R2
EXECUTION_RECEIPT  -> K5-R2
REPOSITORY_STATE   -> K5-R2
REVIEW_ADJUDICATION -> K5-R3
```

R1 `ARTIFACT` and `CUSTOM` remain outside R4. They must be preserved in a canonical `outOfScopeEvidenceIds` set and must not silently become `VALID`, `INCOMPLETE`, `STALE`, `CONTRADICTORY`, or `INVALID` evidence under R4.

### Reconciliation vocabulary

The closed R4 linked-evidence state vocabulary is:

```text
VALID
INCOMPLETE
STALE
CONTRADICTORY
INVALID
```

The closed aggregate reconciliation vocabulary is:

```text
NOT_APPLICABLE
VALID
INCOMPLETE
STALE
CONTRADICTORY
INVALID
```

`NOT_APPLICABLE` is legal only when the package contains zero evidence records in the four linked R4 evidence classes. It is not a success claim and must never be converted to `VALID`.

For non-empty linked evidence, aggregate precedence is exactly:

```text
INVALID > STALE > CONTRADICTORY > INCOMPLETE > VALID
```

This intentionally mirrors the safety direction of K5-R1 package precedence without replacing or mutating the canonical R1 package judgment.

### Fixed cause vocabulary and order

The closed R4 cause vocabulary is, in this exact canonical order:

```text
R1_EXPLICIT_INVALID
R2_KIND_MISMATCH
R2_REF_MISMATCH
R2_DIGEST_MISMATCH
R3_REF_MISMATCH
R3_DIGEST_MISMATCH
R1_EXPLICIT_STALE
R2_REVISION_MISMATCH
R3_REVISION_MISMATCH
R1_EXPLICIT_CONTRADICTORY
R1_EXPLICIT_FAILED
R2_NO_SOURCE
R3_NO_SOURCE
```

Causes are cumulative, duplicate-free, and emitted only in the fixed order above. R4 must never invent a generic or caller-supplied cause string.

The evidence-state contribution rules are exactly:

```text
R1 status INVALID        -> INVALID + R1_EXPLICIT_INVALID
R1 status STALE          -> STALE + R1_EXPLICIT_STALE
R1 status CONTRADICTORY  -> CONTRADICTORY + R1_EXPLICIT_CONTRADICTORY
R1 status FAILED         -> INCOMPLETE + R1_EXPLICIT_FAILED
R1 status SATISFIED      -> no R1 defect contribution
```

For a K5-R2 linkage result:

```text
LINKED                    -> no linkage defect contribution
UNLINKED + NO_SOURCE      -> INCOMPLETE + R2_NO_SOURCE
MISMATCH + REVISION_MISMATCH -> STALE + R2_REVISION_MISMATCH
MISMATCH + KIND_MISMATCH     -> INVALID + R2_KIND_MISMATCH
MISMATCH + REF_MISMATCH      -> INVALID + R2_REF_MISMATCH
MISMATCH + DIGEST_MISMATCH   -> INVALID + R2_DIGEST_MISMATCH
```

For a K5-R3 linkage result:

```text
LINKED                    -> no linkage defect contribution
UNLINKED + NO_SOURCE      -> INCOMPLETE + R3_NO_SOURCE
MISMATCH + REVISION_MISMATCH -> STALE + R3_REVISION_MISMATCH
MISMATCH + REF_MISMATCH      -> INVALID + R3_REF_MISMATCH
MISMATCH + DIGEST_MISMATCH   -> INVALID + R3_DIGEST_MISMATCH
```

Predecessor validators remain authoritative for whether a linkage status/code combination is itself structurally valid. R4 does not repair or normalize malformed predecessor combinations.

For one linked evidence record, its final R4 state is the worst applicable contribution using:

```text
INVALID > STALE > CONTRADICTORY > INCOMPLETE > VALID
```

Examples that must remain canonical:

```text
SATISFIED + LINKED = VALID
FAILED + LINKED = INCOMPLETE
STALE + LINKED = STALE
CONTRADICTORY + LINKED = CONTRADICTORY
INVALID + LINKED = INVALID
SATISFIED + NO_SOURCE = INCOMPLETE
SATISFIED + REVISION_MISMATCH = STALE
SATISFIED + REF_MISMATCH = INVALID
CONTRADICTORY + REF_MISMATCH = INVALID
STALE + NO_SOURCE = STALE with both causes retained
FAILED + NO_SOURCE = INCOMPLETE with both causes retained
```

### R4 output record

The R4 result is one immutable record with exactly this structural direction:

```text
version
packageIdentity
r2LinkageIdentity
r3LinkageIdentity
revision
status
results[]
outOfScopeEvidenceIds[]
reconciliationIdentity
```

Version is fixed to:

```text
kodac-k5-r4-proof-state-reconciliation-v1
```

Each `results[]` entry contains exactly:

```text
evidenceId
evidenceKind
r1Status
linkageLayer
linkStatus
sourceIdentity
state
causes[]
```

where:

```text
linkageLayer = K5_R2 | K5_R3
```

`sourceIdentity` preserves the predecessor linkage value and is nullable only where the predecessor linkage permits null. R4 does not reconstruct a source identity.

`results[]` must contain exactly one entry per linked package evidence record, canonicalized by the existing K5 scalar-string ordering over `evidenceId`. Duplicate evidence ids are impossible after R1 validation and must never be silently deduplicated.

`outOfScopeEvidenceIds[]` contains exactly the canonical set of package evidence ids whose kinds are `ARTIFACT` or `CUSTOM`.

`reconciliationIdentity` is SHA-256 over the complete normalized record excluding `reconciliationIdentity`, using the existing K5 RFC 8785/JCS-compatible canonical JSON, valid-Unicode, no-normalization, UTF-8 byte contract.

Returned records and nested arrays/objects must be defensive immutable copies with no caller aliases.

### Structural failure versus reconciled state

The following are structural input failures and must throw `TypeError`; they are never represented as R4 `INVALID`:

- malformed or unsupported predecessor record version;
- malformed predecessor identity;
- package/linkage packageIdentity mismatch;
- package/linkage revision mismatch at the outer record level;
- missing, duplicate, orphaned, or substituted linkage result membership;
- incorrect predecessor `outOfScopeEvidenceIds` complement;
- malformed linkage status/code combinations;
- unknown fields, enums, versions, states, causes, or linkage layers;
- non-canonical ordering in serialized R4 output;
- identity tampering;
- hostile JavaScript representations forbidden by the predecessor or R4 validators.

R4 `INVALID` means a structurally valid R1/R2/R3 evidence combination carries an explicit invalid/mismatch fact under the fixed rules above. It never means the outer input structure itself was malformed.

### Hostile representation and resource bounds

R4 must preserve fail-closed representation safety. The public serialized R4 validator must reject before caller hooks can execute:

- Proxy objects, with Proxy rejection before prototype inspection, enumeration, descriptor reads, or traversal;
- accessors/getters/setters;
- symbol fields;
- custom prototypes;
- sparse arrays;
- cycles;
- explicit `undefined`;
- functions;
- bigint and symbol primitives;
- invalid Unicode scalar sequences;
- NaN, infinities, `-0`, non-integers, or unsafe integers;
- unknown fields or vocabulary.

Any generic pre-scan used by R4 must be iterative and explicitly depth/node/aggregate-string bounded from its first implementation. Unbounded recursive hostile-input traversal is forbidden.

R4 collection limits must not exceed existing predecessor maxima:

```text
linked results <= 4096
out-of-scope evidence ids <= 4096
causes per result <= 13
```

No new ambient allocation, persistence, filesystem, process, network, provider, or repository-read authority is authorized by those bounds.

## Authorized implementation paths after canonical adoption

Only after this exact documentation record is merged to protected `main` and its required post-merge proof succeeds may K5-R4 implementation begin on a fresh branch from that canonical merge.

Exactly these six paths are authorized:

```text
.github/workflows/k5-r4-proof-state-reconciliation.yml
schema/k5-r4-proof-state-reconciliation.schema.json
packages/kodac-runtime/src/proof-review/reconciliation-contracts.ts
packages/kodac-runtime/src/proof-review/reconciliation.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k5-r4-proof-state-reconciliation.test.ts
```

No other source, test, workflow, schema, documentation, configuration, lockfile, dependency, or generated path is authorized in the R4 implementation PR.

`packages/kodac-runtime/src/index.ts` is additive-only. All pre-R4 export lines must remain byte-identical and in the same order; only the reviewed R4 export block may be appended.

## Authorized production dependency/import surface

R4 production code may depend only on deterministic local K5 predecessor contracts plus standard deterministic hashing/representation helpers required for canonical identity and Proxy-safe validation.

The allowed production import direction is limited to:

```text
node:crypto
node:util            # only util.types.isProxy
./contracts.ts
./linkage-contracts.ts
./review-adjudication-contracts.ts
./reconciliation-contracts.ts
```

`./reconciliation-contracts.ts` is the only R4-local production import authorized between the two new R4 source files. The R4 qualification workflow must explicitly permit this local import while continuing to fail closed on every other unlisted static or dynamic import form.

If the implementation can remain simpler without importing `judge.ts`, it must do so. R4 is not authorized to invoke or replace Done Gate and does not need a new R1 judgment engine. Dynamic imports are forbidden.

Any additional production import requires a separately canonicalized scope extension before use.

## Required implementation behavior

The R4 source slice must prove at minimum:

1. full R1 package validation occurs before R2/R3 linkage inspection;
2. canonical R2 linkage validation and canonical R3 linkage validation occur before reconciliation;
3. packageIdentity and full revision binding are exact across all three records;
4. linkage member coverage and out-of-scope complements exactly match the R1 package;
5. all four linked evidence kinds route to the correct predecessor linkage layer;
6. `ARTIFACT` and `CUSTOM` remain explicitly out of scope;
7. every R1 status contribution is mapped exactly as authorized;
8. every R2/R3 linkage contribution is mapped exactly as authorized;
9. causes are cumulative, duplicate-free, and fixed-order;
10. state precedence is exactly `INVALID > STALE > CONTRADICTORY > INCOMPLETE > VALID`;
11. zero linked evidence produces only `NOT_APPLICABLE`, never `VALID`;
12. equivalent input ordering produces identical canonical output and identity;
13. any identity-bearing mutation changes `reconciliationIdentity` or fails validation;
14. returned output is deeply immutable and caller-alias independent;
15. hostile representation rejection executes no Proxy/accessor hooks;
16. any R4 hostile-input traversal is bounded and non-recursive;
17. serialized R4 validation rejects non-canonical order, unknown vocabulary, and identity tampering;
18. R1, R2, R3, KRI, K2, Done Gate, and all unrelated production blobs remain byte-identical;
19. production source has no filesystem/process/network/provider/Git/GitHub/persistence/dynamic-execution surface;
20. no R4 output vocabulary can be confused with `PROVEN_READY` or repository approval/merge authority.

## Required focused regression matrix

The focused R4 test must include deterministic positive and negative coverage for at least:

- all five non-empty linked-evidence states;
- `NOT_APPLICABLE` with only `ARTIFACT`/`CUSTOM` evidence;
- all five R1 evidence statuses;
- every R2 link code;
- every R3 link code;
- cumulative multi-cause precedence and fixed cause order;
- mixed R2/R3 evidence in one package;
- stale plus missing-source combination;
- contradictory plus invalid-link combination;
- failed plus missing-source combination;
- exact packageIdentity mismatch;
- repositoryId/canonicalBase/candidateHead outer revision mismatches;
- missing/orphaned/duplicate/substituted linkage result membership;
- wrong out-of-scope complement;
- out-of-scope `ARTIFACT`/`CUSTOM` non-influence;
- result/input ordering invariance;
- reconciliation identity mutation rejection;
- deep immutability/no aliases;
- root and nested Proxy trap non-execution;
- accessors, symbols, custom prototypes, sparse arrays, cycles, invalid Unicode, invalid numbers, explicit undefined, function, bigint, and symbol primitives;
- depth/node/string resource-bound regression;
- predecessor R1/R2/R3 focused regressions;
- full runtime regression.

## Required exact-head qualification workflow

The authorized R4 workflow must fail closed unless all of the following are true on the exact PR head:

- repository is `TheHalfMoon/Kodac`;
- base ref is `main`;
- base SHA is the canonical R4 authorization merge produced by this documentation gate;
- head ref is the exact authorized R4 implementation branch recorded by the gate after canonical adoption;
- changed paths are exactly the six authorized R4 implementation paths;
- this authorization document blob matches its canonical post-merge blob;
- all predecessor dependency blobs listed above remain exact;
- the pre-R4 `src/index.ts` blob is attested and the R4 index diff is additions-only;
- all GitHub Actions uses are immutable commit-pinned;
- production import surface is exactly within the allowed list;
- dynamic imports, `require`, filesystem, process, network, provider, Git/GitHub, persistence, sandbox, shell, and execution authority are absent from R4 production files;
- JSON Schema is Draft 2020-12 valid and hostile schema fixtures fail closed;
- TypeScript tooling is integrity-locked and does not mutate the checkout;
- strict TypeScript passes;
- focused R4 tests pass;
- focused R3, R2, and R1 regressions pass;
- full runtime passes;
- Python passes;
- Ruff passes;
- provenance validation passes;
- checkout is unchanged after qualification.

Applicable shared workflows must also pass on the exact final head. Historical predecessor implementation workflows whose own first branch/base gate is intentionally non-applicable must be explicitly classified as non-applicable rather than treated as success; the R4 dedicated workflow must independently run the predecessor focused regressions.

Any head change invalidates all prior CI and review evidence.

## Exact-head independent review gate

Before landing, the final exact R4 head requires fresh independent review of the complete six-path base-to-head diff.

At minimum the review must explicitly examine:

- structural-failure versus reconciled-`INVALID` separation;
- package-first validation ordering;
- exact package/revision/cross-linkage binding;
- exact linkage coverage/complement checks;
- fixed evidence-kind routing;
- state precedence and cumulative cause order;
- `NOT_APPLICABLE` non-vacuity;
- out-of-scope non-influence;
- predecessor authority preservation;
- identity/canonicalization behavior;
- hostile representation and bounded traversal behavior;
- deep immutability;
- schema/runtime parity;
- production import/purity boundary;
- absence of Done Gate, `PROVEN_READY`, KRI, K2, Git/GitHub, provider, persistence, or side-effect authority expansion.

All material findings must be repaired or explicitly and canonically adjudicated within the authorized scope. Unresolved material review threads must be zero. No PASS may be inferred from a rate-limit notice, invocation acknowledgment, stale review, or generic successful bot status that does not bind the exact final head.

## Pre-merge gate

K5-R4 implementation may land only when all of the following are true simultaneously on one exact final head:

1. canonical `main` is still the exact authorization merge produced by this record;
2. PR base is `main` and base SHA is that exact authorization merge;
3. PR head is the exact qualified R4 candidate head;
4. changed paths are exactly the six authorized R4 paths;
5. the dedicated R4 exact-head workflow is PASS;
6. applicable shared full-runtime/governance qualification workflows are PASS;
7. focused R1/R2/R3 predecessor regressions are PASS;
8. exact-head independent reviews report zero unresolved material findings;
9. unresolved material review threads are zero;
10. no waiver is taken;
11. protected `main` remains protected;
12. merge uses `expected_head_sha` and real merge-commit semantics rather than squash/rebase/destructive history rewriting.

## Required post-merge proof for K5-R4 implementation

K5-R4 may be called canonical only after live GitHub proof establishes:

1. PR state is `MERGED`;
2. merge parent 1 is exactly the pre-merge canonical authorization `main`;
3. merge parent 2 is exactly the qualified R4 candidate head;
4. merge tree exactly equals the qualified candidate tree;
5. all six canonical R4 artifact blobs equal the qualified candidate blobs byte-for-byte;
6. this authorization record remains byte-identical;
7. predecessor R1/R2/R3 production dependency blobs remain exact;
8. protected `main` remains protected;
9. no unauthorized path was introduced;
10. applicable post-merge governance evidence is green or explicitly proven non-applicable.

Only after all ten conditions pass may R4 be described as canonical for this bounded scope.

## Documentation-gate qualification and landing requirements

This authorization candidate itself is a one-path documentation gate. It is eligible for canonical adoption only when all of the following are true on the exact final documentation head:

- PR base ref is exactly `main` and PR base SHA is exactly `24139e1a20acf31dd674a30b0c2f271789f60955` unless canonical `main` moves first, in which case this candidate must be non-destructively brought forward and fully requalified against the new live canonical truth;
- changed paths contain exactly this file and no other path;
- the K5-R3 merge identity, ordered parents, tree, six canonical blobs, predecessor authorization blob, exact-head CI evidence, review evidence, and final same-byte K3-R4 rerun evidence above remain exact;
- the required R1/R2/R3 dependency blobs above remain exact;
- K5-R4 scope remains pure proof-state reconciliation only;
- K5-R5+, K5 closeout, and Done Gate integration remain unauthorized;
- all preserved non-grants remain explicit;
- normal documentation/governance checks are green;
- fresh exact-head independent review reports zero unresolved material findings;
- unresolved material review threads are zero;
- protected `main` remains protected;
- landing uses an expected-head guard and real merge commit;
- required post-merge ordered-parent/tree/blob/path/protected-main proof completes before any R4 source branch is created.

## Required post-merge proof for this authorization record

Canonical adoption and K5-R4 implementation authority are effective only after this documentation PR is merged and all of the following are proven against live GitHub truth:

1. merge commit parent 1 is exactly `24139e1a20acf31dd674a30b0c2f271789f60955`;
2. merge commit parent 2 is exactly the qualified documentation candidate head;
3. merge commit tree exactly equals the qualified documentation candidate tree;
4. this document's canonical blob exactly equals the qualified candidate blob;
5. no unauthorized path is introduced by the merge;
6. the PR is `MERGED`;
7. protected `main` remains protected;
8. applicable post-merge governance/qualification evidence is green or explicitly proven non-applicable;
9. the canonical authorization merge identity is recorded before any K5-R4 source branch is created.

Only after all nine conditions pass may the R4 implementation branch be created from that exact canonical authorization merge.

## Preserved non-grants

```text
K5-R5+ IMPLEMENTATION: NOT AUTHORIZED
K5 CLOSEOUT: NOT AUTHORIZED
DONE GATE MODIFICATION: NOT AUTHORIZED
PROVEN_READY AUTHORITY FROM K5-R4: NOT AUTHORIZED
KRI FINDING / ADJUDICATION MUTATION: NOT AUTHORIZED
KRI PROVIDER / QUALIFICATION EXPANSION: NOT AUTHORIZED
K2 EXECUTION-AUTHORITY EXPANSION: NOT AUTHORIZED

FILESYSTEM READ/WRITE AUTHORITY FROM R4: NOT AUTHORIZED
PROCESS / SHELL / EXEC AUTHORITY FROM R4: NOT AUTHORIZED
NETWORK AUTHORITY FROM R4: NOT AUTHORIZED
GIT / GITHUB AUTHORITY FROM R4: NOT AUTHORIZED
PROVIDER / MODEL / REVIEWER EXECUTION FROM R4: NOT AUTHORIZED
PERSISTENCE FROM R4: NOT AUTHORIZED
SANDBOX / CONTAINER AUTHORITY FROM R4: NOT AUTHORIZED
SECRET / CREDENTIAL AUTHORITY FROM R4: NOT AUTHORIZED

NEW KODAC DEPENDENCIES: NOT AUTHORIZED
CODE IMPORT: NOT AUTHORIZED
AUTOFIX EXECUTION: NOT AUTHORIZED
REPOSITORY WRITE AUTHORITY: NOT AUTHORIZED
GITHUB COMMENT / REVIEW AUTHORITY FROM K5: NOT AUTHORIZED
PR APPROVAL AUTHORITY FROM K5: NOT AUTHORIZED
MERGE AUTHORITY FROM K5: NOT AUTHORIZED

PUBLIC RELEASE: NOT AUTHORIZED
PACKAGE PUBLICATION: NOT AUTHORIZED
BRAND LAUNCH: NOT AUTHORIZED
```

## Stop condition

This record authorizes exactly one bounded next implementation slice after its own canonical adoption and post-merge proof.

Do not begin K5-R5, K5 closeout, Done Gate integration, KRI mutation, provider integration, persistence, release work, or any source path outside the six-path R4 allowlist without a separate canonical authorization.
