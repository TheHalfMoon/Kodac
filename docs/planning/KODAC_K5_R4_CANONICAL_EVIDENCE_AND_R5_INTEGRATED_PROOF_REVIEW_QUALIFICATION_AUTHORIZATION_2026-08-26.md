# Kodac K5-R4 Canonical Evidence and R5 Integrated Proof-Review Qualification Authorization

## Record identity

- Date: 2026-08-26
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-26`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION CANONICAL EVIDENCE / NEXT-SLICE AUTHORIZATION
- Canonical base commit: `6f343072f438c86b4781c29887485f83b491e9aa`
- Canonical base tree: `67f7db35e7d9b91fecf6c9da09972375f52991c4`
- K5-R4 authorization record: `docs/planning/KODAC_K5_R3_CANONICAL_EVIDENCE_AND_R4_PROOF_STATE_RECONCILIATION_AUTHORIZATION_2026-08-25.md`
- K5-R4 qualified implementation head: `ebc0c7143638710a9b6619af239183be520c2c96`
- K5-R4 qualified implementation tree: `67f7db35e7d9b91fecf6c9da09972375f52991c4`
- K5-R4 implementation merge: `6f343072f438c86b4781c29887485f83b491e9aa` (PR #197)
- K5 roadmap authority: `docs/roadmap/ROADMAP.md`
- Governing constitution: `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`
- Canonical event/evidence linkage direction: `docs/adr/ADR-0005-canonical-session-event-tool-protocol.md`
- Mandatory side-effect trust boundary: `docs/adr/ADR-0006-mandatory-trust-hook-side-effects.md`

## Decision

Conditionally adopt the exact K5-R4 implementation evidence recorded below as canonical repository truth and authorize only the next bounded K5-R5 integrated proof-review qualification slice if and only if this one-path documentation record itself is canonically adopted and post-merge verified.

The resulting state after canonical adoption and required post-merge proof of this exact record is:

```text
K5: DEFINED / IN PROGRESS — CANONICAL
K5-R1: CANONICAL / COMPLETE FOR ITS AUTHORIZED PURE PROOF-PACKAGE JUDGMENT SCOPE
K5-R2: CANONICAL / COMPLETE FOR ITS AUTHORIZED PURE EXACT EVIDENCE-LINKAGE SCOPE
K5-R3: CANONICAL / COMPLETE FOR ITS AUTHORIZED PURE REVIEW-ADJUDICATION LINKAGE SCOPE
K5-R4: CANONICAL / COMPLETE FOR ITS AUTHORIZED PURE PROOF-STATE RECONCILIATION SCOPE
K5-R5: AUTHORIZED ONLY FOR THE EXACT QUALIFICATION-ONLY SCOPE IN THIS RECORD
K5-R5 IMPLEMENTATION: NOT YET CANONICAL
K5 CLOSEOUT: NOT AUTHORIZED

DONE GATE / PROVEN_READY AUTHORITY: UNCHANGED
KRI FINDING / ADJUDICATION AUTHORITY: UNCHANGED
KRI PROVIDER / QUALIFICATION AUTHORITY: UNCHANGED
K2 SIDE-EFFECT AUTHORITY: UNCHANGED
REPOSITORY WRITE / REVIEW / APPROVAL / MERGE AUTHORITY: UNCHANGED
```

Until this record is canonically adopted and post-merge verified, K5-R5 implementation remains unauthorized.

K5-R5 is a qualification gate over the already-canonical K5-R1 through K5-R4 public contracts. It does not add a new production API, does not modify the existing proof-review implementation, does not alter Done Gate semantics, and does not transfer provider, reviewer, execution, filesystem, network, process, credential, repository-write, approval, or merge authority.

## Governing invariants

```text
QUALIFICATION EVIDENCE != COMPLETION TRUTH
K5-R5 PASS != PROVEN_READY
K5-R5 PASS != DONE GATE VERDICT
K5-R5 PASS != REVIEW APPROVAL
K5-R5 PASS != MERGE AUTHORITY
K5-R5 PASS != EXECUTION AUTHORITY
K5-R5 FIXTURE != RUNTIME INPUT AUTHORITY
K5-R5 NEGATIVE CASE != NEW PRODUCTION SEMANTIC
K5-R5 MUST NOT MUTATE R1/R2/R3/R4 PRODUCTION BYTES
AUTHORITY DOES NOT FOLLOW INFORMATION FLOW
```

R5 may prove that the published K5 stack behaves coherently on a bounded canonical fixture corpus and explicit negative cases. It may not repair, reinterpret, widen, or replace any predecessor contract.

## K5-R4 canonical implementation ledger

K5-R4 was qualified and merged through PR #197.

```text
K5-R4 AUTHORIZATION BASE:
c7116d64a16d6f98dfc9544a60b77755d338ba66

K5-R4 QUALIFIED CANDIDATE HEAD:
ebc0c7143638710a9b6619af239183be520c2c96

K5-R4 QUALIFIED CANDIDATE TREE:
67f7db35e7d9b91fecf6c9da09972375f52991c4

K5-R4 CANONICAL MERGE:
6f343072f438c86b4781c29887485f83b491e9aa

K5-R4 CANONICAL MERGE TREE:
67f7db35e7d9b91fecf6c9da09972375f52991c4
```

The canonical merge has the required ordered parents:

```text
parent 1 = c7116d64a16d6f98dfc9544a60b77755d338ba66
parent 2 = ebc0c7143638710a9b6619af239183be520c2c96
```

The merge tree exactly equals the qualified candidate tree.

### Exact K5-R4 canonical blobs

| Path | Canonical blob |
| --- | --- |
| `.github/workflows/k5-r4-proof-state-reconciliation.yml` | `a9b5fd620c26b9f95beb79fe5b34497a4bb23d65` |
| `schema/k5-r4-proof-state-reconciliation.schema.json` | `e0f0871f2fc0a7359b55d8d8936a7d2a3d32819b` |
| `packages/kodac-runtime/src/proof-review/reconciliation-contracts.ts` | `acf758a6f17180448c1c46b0397bfe6742b4f04b` |
| `packages/kodac-runtime/src/proof-review/reconciliation.ts` | `ec82ed7f1b941f7c523739ccd2e2663176edc30b` |
| `packages/kodac-runtime/src/index.ts` | `824f6aaaa1d7c47a82e772a46dd6597b1819881d` |
| `packages/kodac-runtime/test/k5-r4-proof-state-reconciliation.test.ts` | `6a2ab41e9c9d65ea3e31ad54dd82c53cb44b9597` |

### Immutable K5 predecessor production blobs

R5 is a qualification-only consumer. The complete predecessor production implementation is immutable for this slice.

| Path | Required blob |
| --- | --- |
| `packages/kodac-runtime/src/proof-review/contracts.ts` | `ef0ae26c2a44157fb20ad33145788ba1255239f5` |
| `packages/kodac-runtime/src/proof-review/judge.ts` | `1b6093d6ec9239427e5f50a1dd9483d2c5603e36` |
| `packages/kodac-runtime/src/proof-review/linkage-contracts.ts` | `59d87c73d829c4cd1d57dba134f79839f13b9722` |
| `packages/kodac-runtime/src/proof-review/linkage.ts` | `2ef2f786ee84dbcb2e937b710ee570963c50adc0` |
| `packages/kodac-runtime/src/proof-review/review-adjudication-contracts.ts` | `d738c50de8f33e82f21f9392e9194f9499156f09` |
| `packages/kodac-runtime/src/proof-review/review-adjudication.ts` | `b8cdfc74b6ff786770a4097995696f9bea722daf` |
| `packages/kodac-runtime/src/proof-review/reconciliation-contracts.ts` | `acf758a6f17180448c1c46b0397bfe6742b4f04b` |
| `packages/kodac-runtime/src/proof-review/reconciliation.ts` | `ec82ed7f1b941f7c523739ccd2e2663176edc30b` |
| `packages/kodac-runtime/src/index.ts` | `824f6aaaa1d7c47a82e772a46dd6597b1819881d` |

Any change to any production path above makes an R5 candidate unauthorized under this record.

## K5-R4 qualification, review, and post-merge evidence

The final dedicated exact-head K5-R4 qualification was:

```text
workflow run = 32854985240
head         = ebc0c7143638710a9b6619af239183be520c2c96
result       = PASS
```

The dedicated R4 lane attested the exact authorization base, exact branch/head, exact six-path scope, immutable predecessor blobs, schema semantics, production purity, focused R4 behavior, focused R3/R2/R1 regressions, full runtime tests, Python tests, Ruff, provenance validation, and unchanged checkout.

Applicable shared exact-head lanes were green on the same final candidate, including `governance` and `k2-runtime`.

The historical K5-R1, K5-R2, and K5-R3 implementation workflows were branch/base-pinned predecessor gates and were non-applicable to the R4 branch. Their focused regression suites were executed successfully inside the dedicated R4 workflow; their historical workflow status is not reinterpreted as an R4 failure or waiver.

Fresh exact-head CodeRabbit review on `ebc0c7143638710a9b6619af239183be520c2c96` had no unresolved material finding after the schema-semantics repair. Fresh exact-head Qodo review on the same final head had no material finding. Material review threads were resolved before merge.

Post-merge evidence on `main@6f343072f438c86b4781c29887485f83b491e9aa` includes:

```text
governance  run 32856962096  PASS
k2-runtime  run 32856961960  PASS
```

The canonical `main` branch remained protected after the merge.

No waiver is created or imported by this record.

## K5-R5 purpose

The roadmap defines K5-R5 as:

> bounded integrated proof-review qualification against canonical fixtures and negative cases

and classifies it as **qualification-only**.

R5 therefore answers only:

> Do the already-canonical K5-R1, K5-R2, K5-R3, and K5-R4 public contracts compose deterministically and fail closed across a bounded, auditable canonical fixture corpus and explicit negative cases without changing production semantics or authority?

R5 does not introduce another proof-review state machine. It does not create a new public production function. It does not add another schema for production records. It does not alter R1 package judgment, R2 evidence linkage, R3 review-adjudication linkage, or R4 reconciliation.

## Authorized K5-R5 implementation surface

After canonical adoption and post-merge proof of this exact authorization record, an R5 implementation PR is authorized to change exactly these three paths and no others:

```text
.github/workflows/k5-r5-integrated-proof-review-qualification.yml
packages/kodac-runtime/test/fixtures/k5-r5/integrated-proof-review-qualification.json
packages/kodac-runtime/test/k5-r5-integrated-proof-review-qualification.test.ts
```

The fixture directory is authorized only through the single exact JSON file named above. Additional files under `packages/kodac-runtime/test/fixtures/k5-r5/` are not authorized.

No production source path is authorized. In particular, the following are forbidden in the R5 implementation candidate:

```text
packages/kodac-runtime/src/**
schema/**
package.json
pnpm-lock.yaml
pyproject.toml
scripts/**
docs/**
```

except that the dedicated workflow path listed above is authorized under `.github/workflows/`.

If the exact qualification surface cannot be implemented within these three paths without changing production code or dependencies, implementation must stop and a new canonical authorization is required.

## Canonical R5 fixture corpus

The R5 fixture file must be inert JSON data only. It must not contain executable code, shell fragments intended for execution, repository paths interpreted as authority, URLs interpreted as fetch instructions, credentials, secrets, provider identifiers that cause runtime invocation, or any field that the test harness executes as code.

The file must be bounded and deterministic. It must contain:

1. at least one complete positive integrated fixture spanning R1 package -> R2 linkage -> R3 linkage -> R4 reconciliation;
2. explicit expected deterministic identities and expected R1/R2/R3/R4 results for every positive fixture;
3. a bounded set of named negative fixtures derived only from canonical predecessor semantics;
4. no hidden network, filesystem-write, process, provider, reviewer, Git, or repository mutation instruction.

The fixture loader may perform test-only read access to this exact fixture file. That test-only fixture read is not production filesystem authority and must not be exported or reachable from production code.

The corpus must remain small enough for ordinary CI and review. R5 is not a fuzzing authorization, benchmark expansion, external corpus intake, or performance campaign.

## Required positive qualification

At minimum, the positive fixture must prove the published stack can perform all of the following using only existing canonical public APIs:

1. validate one canonical R1 package;
2. compute or confirm its deterministic package identity;
3. produce the canonical R1 judgment expected by the fixture;
4. validate the corresponding canonical R2 linkage and exact package/revision binding;
5. validate the corresponding canonical R3 review-adjudication linkage and exact package/revision binding;
6. reconcile the package plus R2/R3 records through canonical R4;
7. match the fixture's expected per-evidence R4 states, aggregate reconciliation status, fixed ordered causes, out-of-scope evidence IDs, and `reconciliationIdentity`;
8. repeat the same qualification with semantically equivalent allowed set-order variation and prove the deterministic identities/results remain byte-identical where predecessor contracts define set normalization;
9. prove the caller-owned inputs are not mutated;
10. prove the returned canonical structures preserve predecessor immutability guarantees.

A positive fixture is qualification evidence only. A positive R5 result must never emit or imply `PROVEN_READY`, approval, mergeability, reviewer trust, execution success, or Done Gate completion.

## Required negative qualification matrix

The R5 test must include explicit bounded negative cases covering at least the following classes. Each case must assert the exact predecessor failure mode or exact R4 result required by the canonical contract; generic "throws" coverage is insufficient where a predecessor contract exposes a specific state/cause.

### Structural / cross-package failures

- malformed R1 package rejected by the canonical R1 validator before linkage traversal;
- foreign R2 `packageIdentity` rejected;
- foreign R3 `packageIdentity` rejected;
- R2 revision not exactly equal to package revision rejected;
- R3 revision not exactly equal to package revision rejected;
- missing R2 linkage membership rejected;
- duplicate R2 linkage membership rejected;
- orphaned R2 linkage membership rejected;
- incorrect R2 out-of-scope complement rejected;
- missing R3 linkage membership rejected;
- duplicate R3 linkage membership rejected;
- orphaned R3 linkage membership rejected;
- incorrect R3 out-of-scope complement rejected.

### R4 state/cause behavior

At least one fixture must prove each reachable R4 aggregate precedence level using canonical predecessor inputs:

```text
INVALID
STALE
CONTRADICTORY
INCOMPLETE
VALID
NOT_APPLICABLE
```

The test must prove aggregate precedence remains exactly:

```text
INVALID > STALE > CONTRADICTORY > INCOMPLETE > VALID
```

and that `NOT_APPLICABLE` is emitted only when no R4-linked evidence exists.

The corpus must exercise the canonical R4 fixed-cause vocabulary sufficiently to prove that R1 explicit invalid/stale/contradictory/failed states and R2/R3 linkage defect classes remain mapped to their canonical R4 outcomes and fixed cause ordering. R5 may not add a new cause string.

### Out-of-scope evidence

The test must prove `ARTIFACT` and `CUSTOM` remain explicit R4 out-of-scope evidence and cannot silently contribute to `VALID`, `INCOMPLETE`, `STALE`, `CONTRADICTORY`, or `INVALID` linked-evidence state.

### Identity and immutability

Negative cases must include at least:

- mutation of an expected package identity;
- mutation of an expected linkage identity where the predecessor contract validates that identity;
- mutation of an expected reconciliation identity;
- caller-input mutation attempts against returned canonical data;
- hostile or malformed values already rejected by predecessor validators, without adding a second R5 validation implementation.

R5 must call the canonical predecessor APIs rather than reimplementing their validators or identity algorithms inside the test.

## Dedicated R5 workflow requirements

The authorized workflow `.github/workflows/k5-r5-integrated-proof-review-qualification.yml` must fail closed and must include all of the following controls:

1. trigger only on `pull_request` changes relevant to the exact three R5 implementation paths and on explicit `workflow_dispatch` if repository policy permits;
2. verify repository identity, PR number context where available, exact branch, exact head, exact canonical authorization base, and merge base before qualification;
3. enforce the exact three-path diff allowlist;
4. attest that the authorization record authorizing R5 exists byte-identically on the canonical base;
5. attest every immutable K5-R1/R2/R3/R4 production blob listed in this record;
6. attest the canonical R4 workflow/schema/test blobs listed in this record where applicable to regression provenance;
7. reject changes to package-manager manifests, lockfiles, production source, schemas, scripts, or unrelated workflows;
8. use only repository-pinned third-party actions already accepted by repository governance, pinned by immutable commit SHA;
9. perform dependency installation using the repository's existing integrity-locked mechanism only; no dependency updates are authorized;
10. run the focused K5-R5 qualification test;
11. run focused canonical K5-R4, K5-R3, K5-R2, and K5-R1 regression tests;
12. run the full TypeScript runtime test suite;
13. run Python tests and Ruff where those are part of the canonical shared qualification baseline;
14. run repository provenance/governance validation where available;
15. verify the checkout is byte-identical before and after the qualification commands except for ignored tool caches already permitted by repository CI policy;
16. upload no secret, credential, production artifact, external reviewer payload, or unbounded corpus;
17. grant no write permission not already strictly required by repository governance.

The workflow itself is qualification machinery, not runtime authority.

## Review and merge gate for the R5 implementation PR

The R5 implementation candidate must not merge unless all of the following are live and proven on one exact candidate head:

- canonical `main` is still the exact authorization merge expected by the candidate workflow, or the candidate is explicitly reconciled through a new authorization if `main` moved materially;
- candidate diff contains exactly the three authorized paths and no others;
- dedicated K5-R5 exact-head workflow is green;
- applicable shared exact-head workflows are green;
- predecessor historical workflows that are branch/base-pinned and therefore non-applicable are explicitly classified as such, while the R5 workflow's focused predecessor regressions are green;
- no unresolved material CodeRabbit finding exists on the exact final head;
- no unresolved material Qodo finding exists on the exact final head;
- all material review threads are resolved;
- candidate is mergeable against the verified canonical base;
- no waiver is used to reinterpret an expected failure as a PASS;
- exact candidate tree and exact three-path blob ledger are captured before merge.

Merge must use a real merge commit. Squash, rebase, force-push, destructive history rewriting, or a merge against an unverified head is not authorized.

The merge operation must be guarded by the exact final candidate head SHA.

## Required R5 post-merge proof

An R5 implementation merge is not canonical merely because GitHub reports the PR merged. Before any later K5 closeout record may treat R5 as canonical implementation evidence, all of the following must be proven live:

1. the R5 implementation PR state is `MERGED`;
2. canonical `main` points to the resulting merge commit;
3. merge parent 1 is the exact verified authorization base and merge parent 2 is the exact qualified candidate head;
4. merge tree equals the exact qualified candidate tree;
5. all three authorized path blobs equal the final candidate blobs;
6. the R5 authorization record remains byte-identical;
7. all immutable K5-R1/R2/R3/R4 production blobs remain byte-identical;
8. no unauthorized path was introduced by the merge;
9. protected `main` remains protected;
10. every applicable post-merge governance/shared workflow on the merge SHA is green, or is explicitly proven non-applicable from its canonical trigger/path rules;
11. no post-merge evidence contradicts the exact-head qualification evidence.

Only after these conditions are evidenced may a later, separately authorized K5 closeout record adopt the R5 implementation as canonical evidence.

## Deliberate exclusions / non-grants

This record does **not** authorize any of the following:

- modification of `packages/kodac-runtime/src/**`;
- modification of `schema/**`;
- modification of Done Gate or its required checks;
- any new `PROVEN_READY` producer or promotion path;
- K5-to-Done-Gate integration;
- provider routing or provider invocation;
- reviewer execution or reviewer trust changes;
- KRI finding/adjudication/qualification semantic changes;
- external model calls;
- network access;
- credentials or secret access;
- runtime filesystem reads or writes;
- process spawning or shell execution from production code;
- repository writes, Git mutation, branch mutation, approval, or merge authority from K5 code;
- package/dependency changes;
- external corpus intake;
- benchmark expansion beyond the bounded fixture corpus;
- fuzzing or load/performance testing authority;
- source auto-repair;
- new persistence, database, cache, daemon, MCP, ACP, HTTP, RPC, queue, webhook, or service surfaces;
- K5 CLOSEOUT;
- any post-K5 milestone implementation.

If any excluded capability becomes necessary, stop and obtain a separate canonical authorization.

## Authorization-record merge gate

This authorization record itself is a one-path documentation/governance candidate. It must not be treated as canonical merely because it exists on a branch.

Before merging this record:

1. re-read live `main` and verify it still points to `6f343072f438c86b4781c29887485f83b491e9aa` with tree `67f7db35e7d9b91fecf6c9da09972375f52991c4`, unless a later canonical commit is explicitly reconciled before merge;
2. verify the PR diff is exactly this one documentation path;
3. verify all applicable exact-head CI is green;
4. obtain fresh exact-head independent review required by current repository governance, including CodeRabbit and Qodo where those integrations are applicable;
5. resolve every material review finding/thread;
6. verify mergeability and branch protection live immediately before mutation;
7. capture the exact authorization candidate head, tree, and document blob;
8. merge with a real merge commit guarded by the exact candidate head SHA;
9. prove ordered parents, tree equality, authorization blob equality, absence of unauthorized paths, protected `main`, and applicable post-merge governance evidence.

Only after that post-merge proof does this record authorize the exact three-path K5-R5 implementation slice above.

## Stop condition

This record deliberately stops before K5 closeout and before any Done Gate integration.

After canonical adoption and post-merge proof of this record, work may proceed only on the exact bounded K5-R5 qualification implementation described here. After that implementation is qualified and merged, stop unless a separate canonical K5 closeout authorization/evidence record is adopted.

No inference from roadmap ordering, a green R5 qualification, or founder continuation language may silently widen the authority described in this record.
