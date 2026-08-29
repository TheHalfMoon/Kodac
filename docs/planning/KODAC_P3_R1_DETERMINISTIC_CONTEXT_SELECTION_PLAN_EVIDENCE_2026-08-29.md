# Kodac P3-R1 Deterministic Context Selection Plan Foundation Evidence — 2026-08-29

## Record identity

- Date: 2026-08-29
- Authority class: `P3-R1 BOUNDED IMPLEMENTATION EVIDENCE CANDIDATE`
- Canonical authorization: `docs/planning/KODAC_P3_R1_DETERMINISTIC_CONTEXT_SELECTION_PLAN_AUTHORIZATION_2026-08-29.md`
- Authorization PR: `#251`
- Authorization candidate head: `e64e6228f1c74f8b56fab63623cfa2a953700f41`
- Authorization candidate tree: `ad4a1355c971f80f89f2476eac8e0c4170ca8659`
- Authorization document blob: `efd4ff29ae6660b4e1d9a2c9e75d45537bfd3a35`
- Canonical authorization merge / implementation base: `2b3ce25fe4b8e108840208cdf7a7018ba6262fd6`
- Authorization post-merge Governance: `33235675288 / SUCCESS`
- Evidence-materialization parent head: `4db2c302d640c1c84e5beda702282ffe6b2c1865`
- Evidence-materialization parent tree: `d27670a3328c26eefdeedd3deb7248db26c651da`
- Protected-main ruleset: `20707483` (`Kodac canonical main protection v1`)
- `WAIVER=NO`

## Candidate state

```text
P3-R1 = AUTHORIZED / IMPLEMENTATION CANDIDATE / NOT CLOSED_CANONICAL
P3-R2+ = NOT AUTHORIZED
P4-P8 = NOT AUTHORIZED
NEW CONTEXT RANKING / WEIGHTING POLICY = NOT AUTHORIZED
BENCHMARK-BACKED QUALITY IMPROVEMENT = NOT ESTABLISHED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
WAIVER = NO
```

This is candidate-time evidence. It does not claim a future merge, post-merge result, `CLOSED_CANONICAL`, quality improvement, winner, superiority, donor promotion, product integration, or release state.

## Exact authorized implementation realization before this evidence file

Relative to canonical implementation base `2b3ce25fe4b8e108840208cdf7a7018ba6262fd6`, evidence-materialization parent `4db2c302d640c1c84e5beda702282ffe6b2c1865` changes exactly these three pre-existing authorized paths:

```text
packages/kodac-runtime/src/context-selection-plan/contracts.ts
packages/kodac-runtime/src/context-selection-plan/context-selection-plan.ts
packages/kodac-runtime/test/p3-r1-context-selection-plan.test.ts
```

Exact pre-evidence blobs:

```text
packages/kodac-runtime/src/context-selection-plan/contracts.ts
  f8d4123a14cc52a8307c3294fd4302b819a91390
packages/kodac-runtime/src/context-selection-plan/context-selection-plan.ts
  b868d5c2085cb62d3be1e9495e39f959310e4844
packages/kodac-runtime/test/p3-r1-context-selection-plan.test.ts
  48b912b7237e3a7df8ca0a02c69b49b5e2442880
```

This evidence file is the fourth and final path in the canonical P3-R1 implementation allowlist. No existing K3-R5/K3-R6 source/test path, package manifest, lockfile, export barrel, CLI, workflow, dependency, fixture, roadmap, product-status, persistence, telemetry, release, ruleset, or other path is modified.

## Self-reference-safe exact-head binding rule

A repository evidence file cannot embed the blob or commit identity produced by materializing that same file without recursive identity dependence. This record therefore binds the exact parent and the three pre-existing implementation/test blobs above.

Final qualification must externally capture from one frozen exact final PR head:

1. exact final head SHA;
2. exact final tree SHA;
3. exact blob SHA for this evidence record;
4. exact blobs for both P3-R1 source files and the focused test file;
5. exact four-path changed-file set;
6. exact-head required CI/check identities and per-platform runtime-matrix results;
7. exact-head independent semantic-review quorum evidence;
8. zero unresolved material findings and zero unresolved actionable review threads;
9. active ruleset/no-bypass evidence.

Any repository-byte change after that capture makes prior head/tree/blob/check/review evidence stale and requires fresh exact-head qualification.

## Implemented bounded contract

The implementation is a pure, deterministic, in-memory context-selection-plan foundation over caller-materialized evidence. It:

- validates an exact-key versioned `build_context_selection_plan` request;
- binds all candidates and outputs to one repository, snapshot, and content identity;
- preserves candidate evidence lane, source kind, source identity, evidence class, subject path, deterministic grouping key, reasons, UTF-8 byte count, and provenance references;
- supports exactly the descriptive lanes `explicit-target`, `structural-symbol`, `relation-impact`, `working-tree`, `architecture-spec`, and `lexical-fallback`;
- derives deterministic candidate, candidate-set, request, and plan SHA-256 identities from canonical semantic material only;
- treats caller candidate input ordering and object-property insertion ordering as non-semantic where the contract declares them non-semantic;
- canonicalizes duplicate-identical candidate IDs and fails closed on conflicting duplicate IDs;
- validates deterministic item/UTF-8 byte budgets without selecting, truncating, dropping, scoring, or ranking candidates;
- produces explicit `budget-exceeded` rather than silently changing the candidate set;
- produces explicit `insufficient-evidence` abstention when no admissible candidate remains;
- preserves caller completeness and lower-bound omission facts;
- may validate already-materialized K3-R6 relation-query results supplied by the caller;
- validates K3-R6 repository/snapshot/content/query/result identities, result completeness, hit ordering, relation sets, semantic traversal-chain edge ordering, and chain identities without executing a graph query;
- requires `relation-query-hit` candidates to reference a validated supplied relation result and use the `relation-impact` lane;
- preserves incomplete relation evidence as incomplete rather than upgrading it to complete;
- rejects malformed, unknown-field, unsupported-version, missing-field, sparse/extended-array, symbol-field, accessor/getter, Proxy, non-plain, cyclic/non-canonical, identity-inconsistent, cross-snapshot, and other hostile structural inputs before canonical output construction;
- deep-freezes returned structures;
- introduces no dependency and changes no K3-R5/K3-R6 byte.

The implementation deliberately materializes no numeric ranking weight, quality score, universal score, threshold, winner, `best`, superiority verdict, donor selection, strategy promotion, or benchmark result.

## Forward-only repair history

During pre-qualification self-review, a valid semantic issue was found before any final exact-head claim: K3-R6 traversal-chain `edgeIdentities` are semantically ordered, while an earlier draft normalization path would have sorted them.

The issue was repaired forward in commit:

```text
198f4cb618ce89af30e8d69d3ba1720911e442e2
fix(p3): preserve relation evidence chain order
```

The focused test was then extended forward in:

```text
4db2c302d640c1c84e5beda702282ffe6b2c1865
test(p3): cover ordered multi-edge relation evidence
```

The regression test uses a depth-two chain whose semantic edge order differs from lexical sort order and proves that reversing the supplied chain without recomputing the canonical chain identity fails closed.

No stale qualification evidence is reused from any earlier head.

## Focused test contract

Focused file:

```text
packages/kodac-runtime/test/p3-r1-context-selection-plan.test.ts
```

Direct focused command supported by the repository's Node 24 test model:

```text
node --experimental-strip-types --test test/p3-r1-context-selection-plan.test.ts
```

Repository K2 runtime command:

```text
npm test
```

`packages/kodac-runtime/scripts/run-tests.mjs` deterministically discovers every `test/*.test.ts` file, sorts the file list, and invokes Node's test runner with `--experimental-strip-types --test`. Therefore the focused P3-R1 file is included in each K2 runtime matrix `npm test` step.

Focused coverage includes:

- repeated semantic input identity determinism;
- object property insertion-order independence;
- candidate-array order independence;
- repository/snapshot/content mismatch rejection;
- hostile structural input rejection;
- duplicate-identical normalization and duplicate-conflict rejection;
- all six authorized evidence lanes without trust upgrading;
- deterministic grouping/reason/provenance facts;
- bounded budget assessment without candidate selection/ranking;
- explicit insufficient-evidence abstention;
- validated K3-R6 query/result binding and identity checks without graph execution;
- depth-two semantic edge-chain ordering and reversed-chain rejection;
- incomplete relation evidence preservation;
- relation candidate/result binding constraints;
- deep-freeze behavior;
- absence of ranking-weight/universal-score/winner/superiority materialization.

At evidence materialization time there is no qualifying branch-push K2 runtime run because `.github/workflows/k2-runtime.yml` restricts push execution to `feat/kodac-k2-runtime-spine` and `main`. No branch-push PASS is claimed. The first trusted execution evidence for this candidate must therefore come from the pull-request event on the exact candidate head.

## Required exact-head machine qualification

Before merge, one frozen final PR head must prove:

- `behind_by=0` against protected canonical `main`;
- exact changed-file set equals the four authorized P3-R1 paths;
- `governance` succeeds, including required `provenance` and `legacy-tests` contexts from the required GitHub Actions integration;
- `k2-runtime` classifies the PR as runtime-sensitive;
- Ubuntu, Windows, and macOS runtime matrix jobs all succeed;
- each matrix job's Typecheck, Test (`npm test`), and Patch benchmark hook steps succeed;
- stable `k2-runtime-gate` succeeds;
- the P3-R1 focused file is included by the canonical deterministic test runner;
- no package/dependency mutation is introduced.

Exact workflow run IDs, job results, final head/tree, and all four final blobs must be captured externally on the frozen final head. A later evidence-only forward update may cite a prior exact-head machine run as parent evidence, but that update itself creates a new head that must rerun every required final check.

## Required independent semantic review

The frozen final head requires at least two distinct independent external substantive terminal-clean semantic reviewer channels under the canonical provider-neutral review-evidence contract.

A qualifying review must inspect the exact final four-path diff and specifically evaluate:

- authorization/allowlist compliance;
- K3-R5/K3-R6 non-duplication and non-mutation;
- hostile-input fail-closed behavior;
- deterministic identity semantics;
- semantic K3-R6 traversal-chain ordering;
- candidate/completeness/budget semantics;
- absence of hidden ranking, scoring, trust upgrading, graph execution, repository acquisition, provider/model execution, persistence, telemetry, learning, dependency addition, product integration, P3-R2+, P4-P8, promotion, superiority, or release authority.

Status-only, summary-only, skipped, billing/rate-limit/outage, stale-head, self-review, or duplicate-channel output does not count. Unresolved material findings and actionable review threads must equal zero.

## Preserved non-grants

```text
NEW RANKING / WEIGHTING POLICY = NO
BENCHMARK EXECUTION / QUALITY CLAIM = NO
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NO
PROVIDER / MODEL / LLM EXECUTION = NO
REPOSITORY CRAWLING / FILESYSTEM ACQUISITION = NO
AST-GREP EXECUTION = NO
RELATION-GRAPH CONSTRUCTION / QUERY EXECUTION = NO
NETWORK / SECRETS / SUBPROCESS = NO
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NO
TRAINING / ONLINE LEARNING = NO
NEW DEPENDENCIES / DONOR INTAKE = NO
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NO
STRATEGY PROMOTION / DONOR REPLACEMENT = NO
PUBLIC WINNER / SUPERIORITY / RELEASE / PACKAGE PUBLICATION = NO
P3-R2+ = NOT AUTHORIZED
P4-P8 = NOT AUTHORIZED
RULESET MUTATION / BYPASS = NO
WAIVER = NO
```

## Guarded merge requirement

Only after one frozen exact head satisfies all machine/review/thread/ruleset gates may the implementation PR merge normally with the exact qualified `expected_head_sha`. No force-push, rebase, destructive history rewrite, stale evidence reuse, governance bypass, or silent waiver is permitted.

## Required post-merge proof

P3-R1 may be called `CLOSED_CANONICAL` only after live GitHub proves:

- protected `main` equals the returned implementation merge SHA;
- ordered merge parents are pre-merge canonical `main` then the exact qualified implementation head;
- merge tree equals the qualified candidate tree;
- all four canonical blobs equal the qualified candidate blobs;
- GitHub merge verification/signature is `verified / valid` where emitted;
- applicable post-merge Governance and K2 push checks succeed, or exact workflow non-applicability is recorded as non-applicable rather than relabeled green;
- ruleset `20707483` remains active with required thread resolution, required contexts, `bypass_actors=[]`, and `current_user_can_bypass=never`;
- `WAIVER=NO`.

Even successful P3-R1 canonical closure establishes only the deterministic context-selection-plan foundation. It does not establish a new ranking policy, benchmark-backed quality improvement, P3-R2+ authority, P4-P8 authority, product integration, donor promotion, public superiority, or release readiness.
