# Kodac P2-R2 Local Runner and Immutable Report Evidence — 2026-08-28

## Record identity

- Date: 2026-08-28
- Authority class: P2-R2 BOUNDED IMPLEMENTATION EVIDENCE CANDIDATE
- Canonical P2-R2 authorization merge: `f2b8d452e93ec207ebe04c9db7d47dc032df20de` (PR #239)
- Implementation base: `f2b8d452e93ec207ebe04c9db7d47dc032df20de`
- Evidence-materialization parent head: `efacbaa4e64bb5922bdf2a6e77711cdb25e6da80`
- Evidence-materialization parent tree: `c5d8afd348ffee804cec2f8f4d159b598dab2150`
- Protected-main ruleset: `20707483` (`Kodac canonical main protection v1`)
- `WAIVER=NO`

## Candidate state

```text
P2-R2 = AUTHORIZED / NOT COMPLETE
P2-R3+ = NOT AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL EXECUTION = NOT AUTHORIZED
NETWORK / SECRET / SUBPROCESS / SANDBOX / PERSISTENCE / TELEMETRY AUTHORITY = NOT AUTHORIZED
REDUCER / RANKING / WINNER / SUPERIORITY SEMANTICS = NOT AUTHORIZED
```

This record is candidate-time evidence. It does not claim a future merge, post-merge result, or `CLOSED_CANONICAL` state.

## Exact authorized implementation realization before this evidence update

Relative to the canonical implementation base, the evidence-materialization parent changes exactly these two implementation/test paths:

```text
packages/kodac-runtime/bench/p2-r2/runner.ts
packages/kodac-runtime/test/p2-r2-runner.test.ts
```

Both are inside the canonical P2-R2 implementation allowlist. The third authorized changed path is this evidence record itself.

Exact pre-evidence implementation blobs:

```text
packages/kodac-runtime/bench/p2-r2/runner.ts
  b1e1442e40fda192415c3dd320845d85a5eb61f3
packages/kodac-runtime/test/p2-r2-runner.test.ts
  f444bc9aa0757b2494144a02b64da6b2332f6b8c
```

No package manifest, lockfile, workflow, CLI, product-runtime source outside the authorized benchmark path, P2-R1 byte, provider/model adapter, storage, telemetry, release, or ruleset path is modified.

## Self-reference-safe exact-head binding rule

A repository evidence file cannot embed the blob or commit identity created by materializing that same file without recursive identity dependence. This record therefore binds its exact parent and all pre-existing implementation blobs above. Final qualification must externally capture from one frozen exact final head:

1. exact final PR head SHA;
2. exact final tree SHA;
3. exact blob SHA for this evidence record;
4. exact blobs for `runner.ts` and `p2-r2-runner.test.ts`;
5. exact final three-path changed-file set;
6. exact-head required CI/check identities;
7. exact-head independent semantic-review quorum evidence;
8. zero unresolved material findings/actionable threads;
9. active ruleset/no-bypass evidence.

Any repository-byte change after that capture makes the prior head/tree/blob/check/review evidence stale.

## Implemented bounded contract

The implementation is a pure in-memory P2-R2 runner/report spine. It:

- revalidates caller-supplied P2-R1 manifest/development/holdout values with the canonical P2-R1 validator;
- requires a uniform benchmark ID and protocol version across the validated manifest set;
- accepts only exact-key, versioned caller-materialized observations;
- binds each observation to exact canonical `case_id`, R1 `result_identity`, task family, metric ID, and unit;
- fails closed on unknown cases/metrics, result-identity mismatch, task-family drift, unit drift, duplicate observation slots, unsupported statuses, and non-finite/non-canonical values;
- preserves `observed`, `missing`, and `unavailable` as distinct states;
- materializes omitted expected metric slots explicitly as `missing` with `value=null`;
- deterministically orders manifest records, observations, task families, cases, and metrics;
- preserves task-family separation and case-level metric evidence;
- derives deterministic R1-manifest, observation-set, and report SHA-256 identities from canonical evidence-bearing values only;
- excludes the report identity from its own identity input;
- deep-freezes the returned report so caller mutation cannot change returned semantics;
- reuses the hardened P2-R1 canonical JSON boundary so hostile Proxies, accessors, symbols, non-plain prototypes, sparse/accessor/extended arrays, cycles, functions, bigint, non-finite numbers, and other non-JSON structures fail closed before report identity construction;
- performs no provider/model/reviewer/evaluator/tool invocation, network access, secret access, subprocess/sandbox execution, file/database output, telemetry, upload, or analytics egress;
- introduces no dependency and changes no P2-R1 bytes.

The report intentionally materializes no reducer, arithmetic mean, weighting, normalization, threshold, blended/universal score, ranking, `best`, `winner`, or superiority semantic.

## Focused test coverage

`packages/kodac-runtime/test/p2-r2-runner.test.ts` covers the authorization-required invariants, including:

- canonical R1 revalidation before R2 reporting;
- R1 and observation input-order independence;
- repeated-input byte/identity determinism;
- legitimate evidence changes changing report identity;
- unknown case, result identity, task family, metric, unit, duplicate, and non-finite fail-closed behavior;
- explicit missing/unavailable semantics and deterministic completeness counts;
- task-family separation and absence of universal score/ranking/reducer fields;
- caller-mutation safety and deep freezing;
- hostile object/array/non-JSON rejection without getter/proxy execution;
- safe handling of `__proto__` as data at canonicalization boundaries while exact observation keys remain enforced;
- host timestamp/path/process noise exclusion from identity;
- mixed benchmark identity rejection.

## Pre-evidence CI proof

The evidence-materialization parent `efacbaa4e64bb5922bdf2a6e77711cdb25e6da80` completed the applicable push governance workflow successfully:

```text
workflow run 33176612802
provenance   job 98866771363   SUCCESS   app=15368
legacy-tests job 98866771534   SUCCESS   app=15368
```

These checks prove the implementation/test bytes at the evidence parent. They do not substitute for final-head pull-request qualification after this evidence file changes the head.

The protected `k2-runtime-gate` and its runtime matrix must be established on the exact final PR head when the pull-request workflow classifies this runtime-path change. No PASS is claimed for that future exact head here.

## Required final qualification

Before merge, the final exact head must prove all canonical gates from the P2-R2 authorization, including:

- base is current protected `main` and `behind_by=0`;
- changed files are exactly the three authorized paths listed above;
- exact head/tree and all three blobs are captured;
- required GitHub Actions contexts succeed from app `15368`, including `provenance`, `legacy-tests`, and applicable `k2-runtime-gate`;
- at least two distinct independent external reviewer channels provide substantive terminal-clean semantic assessments on that exact head;
- stale/status-only/summary-only/error/outage/rate-limit/billing/self-review/duplicate-provider outputs do not count;
- unresolved material findings and actionable review threads = 0;
- ruleset `20707483` remains active with `bypass_actors=[]`, `current_user_can_bypass=never`, strict required checks, and required thread resolution;
- PR is open, non-draft, mergeable, and not behind protected `main`;
- merge uses normal history-preserving `merge` semantics with the exact expected-head precondition.

## Required post-merge proof

P2-R2 may be called `CLOSED_CANONICAL` only after live GitHub proves:

- protected `main` equals the returned merge SHA;
- ordered merge parents are canonical base then exact qualified implementation head;
- merge tree equals the qualified candidate tree;
- all three canonical path blobs equal the qualified candidate blobs;
- GitHub verification/signature is valid where emitted;
- protected applicable post-merge checks succeed or exact workflow non-applicability is proven;
- ruleset/no-bypass state remains unchanged.

Even successful canonical P2-R2 does not authorize P2-R3, external benchmark execution, reducers/rankings, provider/model/reviewer/evaluator invocation, persistence/telemetry, product integration, release, or superiority claims.
