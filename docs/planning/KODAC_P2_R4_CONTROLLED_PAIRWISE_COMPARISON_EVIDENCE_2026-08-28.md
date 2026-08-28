# Kodac P2-R4 Controlled Pairwise Comparison Evidence — 2026-08-28

## Status

```text
DOCUMENT TYPE: CANDIDATE-TIME IMPLEMENTATION EVIDENCE
P2-R4 IMPLEMENTATION = CANDIDATE / NOT CLOSED_CANONICAL
P2-R5+ = NOT AUTHORIZED
GENERAL KODACBENCH = NOT CLOSED
PUBLIC SUPERIORITY CLAIMS = NOT AUTHORIZED
WAIVER = NO
```

This record binds the authorized P2-R4 implementation/test parent and its observed machine evidence. It does not self-certify its own future commit, tree, or blob identity, and it does not claim canonical closure before exact-final-head qualification, guarded merge, and post-merge proof.

## Canonical authority

P2-R4 implementation authority became effective only after the exact authorization unit was qualified, merged normally, and post-merge proven.

```text
AUTHORIZATION_RECORD = docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_AUTHORIZATION_2026-08-28.md
AUTHORIZATION_PR = #243
AUTHORIZATION_MERGE = 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

The implementation remains limited to the canonical authorization and cannot create P2-R5 or broader comparison authority by implication.

## Exact authorized implementation path set

The P2-R4 implementation PR may change exactly these paths and no others:

```text
packages/kodac-runtime/bench/p2-r4/comparison.ts
packages/kodac-runtime/test/p2-r4-comparison.test.ts
docs/planning/KODAC_P2_R4_CONTROLLED_PAIRWISE_COMPARISON_EVIDENCE_2026-08-28.md
```

No P2-R1, P2-R2, or P2-R3 bytes are modified by the implementation unit.

## Self-reference-safe implementation/test parent

The implementation and focused tests were materialized before this evidence record so their exact bytes and machine proof could be bound without making the evidence file recursively claim its own future identity.

```text
CANONICAL_BASE = 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26
IMPLEMENTATION_COMMIT = 6f3ee3d1cec49234de5ad9a0db6b9206ff6c9bda
IMPLEMENTATION_TEST_PARENT = 7046d374470c331fb740d9d66860512ba6790589
IMPLEMENTATION_TEST_PARENT_TREE = 23a037ce82904aa98693123b364f99e80386495d
IMPLEMENTATION_BLOB = 78c1417e51f1c36989ec7ec700a3424df3b58944
TEST_BLOB = 844eba6eb456752925f914c732ccfccf2778b050
PARENT_AHEAD_BY = 2
PARENT_BEHIND_BY = 0
```

At that parent, the base-to-head diff contained exactly the implementation and test paths above. The parent is historical evidence after this file is committed; it is not the final qualification head.

This evidence file intentionally does not encode its own future blob or the future three-path final head/tree. Those values must be captured independently from live GitHub after this commit. Any later repository-byte change invalidates exact-head qualification and requires fresh proof.

## Implemented bounded contract

The P2-R4 implementation is a pure in-memory controlled pairwise comparison over two already-materialized P2-R2 reports and P2-R3 summaries.

The implementation:

- crosses the hardened P2-R1 canonical JSON boundary before semantic reads of caller-controlled structures;
- revalidates both P2-R2 reports, including exact-key shape, canonical ordering, identities, counts, measurement states, and finite boolean/numeric value rules;
- revalidates both P2-R3 summaries, including exact-key shape, canonical ordering, report binding, coverage reconciliation, reducer/value-kind/missingness compatibility, status/value semantics, and summary identity;
- requires each P2-R3 summary to bind exactly to its corresponding revalidated P2-R2 report;
- requires exact equality of benchmark ID, benchmark protocol, R1 manifest-set digest, task families, case ordering, case IDs, R1 result identities, metric ordering, metric IDs, and units across the two R2 reports;
- performs no intersection, union, imputation, alignment, dropping, renaming, or normalization of mismatched task material;
- validates one exact shared ADR-0010 evaluation-context object whose controlled identities apply to both sides;
- requires exact-key subject descriptors and distinct pair-local subject IDs plus distinct system/version/commit identities;
- accepts only explicit `HIGHER_IS_BETTER` or `LOWER_IS_BETTER` direction policy and never infers direction;
- treats `expected_count` as derived R2/R3 evidence only, requires left/right equality, and rejects caller-supplied `expected_count` in direction policy;
- compares only metrics with explicit direction entries and leaves other metrics uncompared;
- emits `COMPARABLE` only when both corresponding R3 summaries are `REDUCED` with finite reduced values;
- exposes only `left_value`, `right_value`, and finite `raw_delta_left_minus_right = left_value - right_value` for comparable metrics;
- emits `INSUFFICIENT_EVIDENCE` with null pairwise numeric fields otherwise while preserving both complete R3 metric summaries and coverage evidence;
- keeps task families separate and emits no cross-task aggregate;
- derives deterministic canonical policy/context/comparison identities and returns a recursively frozen result independent from later caller mutation;
- performs no provider, model, reviewer, evaluator, benchmark, network, subprocess, persistence, telemetry, learning, CLI, product, release, or ruleset side effect.

## Explicit negative space

P2-R4 does not materialize winner, loser, better, worse, superiority, advantage, tie, pass/fail, accept/reject, promotion, threshold, target-band, N-way ranking, leaderboard, universal score, weighted/blended/global score, percentage-change utility, Pareto dominance, statistical significance, confidence interval, bootstrap, uncertainty-model, or hypothesis-test semantics.

It does not authorize unequal model/provider/configuration/prompt/environment/budget/tool comparison, external execution, public superiority claims, release/package publication, P2-R5+, or any K2/K5/Done Gate/`PROVEN_READY` expansion.

## Focused test evidence

The focused Node test file contains 26 named tests that collectively exercise the authorization's 28 required coverage bullets. Individual test functions intentionally combine closely related hostile-input or negative-space requirements rather than manufacturing one test function per numbered authorization bullet.

The focused coverage includes:

- canonical P2-R1 fixture interoperability through P2-R2 and P2-R3;
- deterministic numeric and boolean per-family raw deltas;
- independent R2 and R3 revalidation and exact report/summary cross-binding;
- benchmark/manifest/case/R1-result/metric/unit topology mismatch rejection;
- exact shared-context and subject-descriptor validation and identity binding;
- explicit closed direction vocabulary and exact per-metric semantic matching;
- derived-only `expected_count` and rejection of caller-supplied `expected_count`;
- duplicate/unknown direction rejection and policy-order determinism;
- uncompared metrics without explicit direction;
- insufficient-evidence null pairwise values with preserved side summaries;
- finite-subtraction overflow rejection;
- repeated-input identity determinism and evidence-bearing identity sensitivity;
- deep immutability and caller-alias independence;
- fail-closed hostile accessors, proxies, sparse arrays, BigInt/non-JSON values, `__proto__`, noncanonical ordering, and environment-noise attempts;
- absence of winner/ranking/threshold/statistical/promotion semantics;
- exact benchmark/protocol/summary/context policy binding;
- fixed left-minus-right subtraction orientation independent of declared direction;
- production negative space excluding forbidden provider/model/reviewer/evaluator execution and forbidden network/dependency/subprocess/persistence/telemetry/learning/CLI/product/release/ruleset authority.

## Pre-evidence parent machine proof

The implementation/test parent `7046d374470c331fb740d9d66860512ba6790589` was exercised through PR #244 before this evidence file was added.

Governance:

```text
RUN = 33194125448 / SUCCESS
provenance = 98926797032 / SUCCESS
legacy-tests = 98926796816 / SUCCESS
```

The governance jobs checked the PR merge candidate built from parent head `7046d374470c331fb740d9d66860512ba6790589` against canonical base `6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26`.

K2 runtime:

```text
RUN = 33194125518 / SUCCESS
runtime-change-classifier = 98926797315 / SUCCESS
runtime (ubuntu-latest) = 98926843435 / SUCCESS
runtime (windows-latest) = 98926843264 / SUCCESS
runtime (macos-latest) = 98926843360 / SUCCESS
k2-runtime-gate = 98927114612 / SUCCESS
```

The Ubuntu job used Node 24, completed TypeScript typecheck, ran the full runtime test suite, and completed the benchmark patch hook successfully. Its exact test summary was:

```text
tests = 1193
pass = 1189
fail = 0
cancelled = 0
skipped = 4
todo = 0
```

All 26 named P2-R4 focused tests passed in that run.

The exact synthetic PR merge ref observed by the runtime job was:

```text
7ec27f898c67ddc8530f8179288044867f8ed89d
```

with log description:

```text
Merge 7046d374470c331fb740d9d66860512ba6790589 into 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26
```

This parent proof establishes that the implementation/test bytes were machine-exercised before evidence materialization. It does not satisfy final exact-head qualification after this evidence commit.

## Final qualification still required

After this record is committed, PR #244 must be qualified again on one frozen exact final head. Before merge, live GitHub must prove all of the following on that same head:

1. exactly the three authorized changed paths and all three final blobs;
2. `behind_by=0` against protected canonical `main`;
3. open, non-draft, mergeable PR state;
4. exact-head governance success with trusted `provenance` and `legacy-tests`;
5. exact-head K2 runtime success with classifier, Ubuntu, Windows, macOS, and `k2-runtime-gate`;
6. at least two distinct independent external substantive terminal-clean semantic reviewer channels under the provider-neutral quorum policy;
7. zero unresolved material findings and zero unresolved actionable review threads;
8. ruleset `20707483` active with required contexts/thread resolution, `bypass_actors=[]`, and `current_user_can_bypass=never`;
9. `WAIVER=NO`;
10. normal history-preserving guarded merge using the exact qualified `expected_head_sha`;
11. post-merge protected-main, ordered-parent, tree, blob, verified-signature, applicable-check, and ruleset/no-bypass proof before any canonical-closure claim.

If the final head or canonical base moves, all stale exact-head qualification evidence must be discarded and the unit must be reconciled forward non-destructively and requalified. No force-push, rebase, destructive history rewrite, stale-evidence reuse, silent waiver, or governance bypass is permitted.

## Candidate conclusion

The bounded P2-R4 implementation and focused tests exist inside the exact canonical allowlist and have successful pre-evidence parent machine proof. This record itself is only candidate-time evidence. It does not make P2-R4 `CLOSED_CANONICAL`, does not authorize P2-R5, and does not support public superiority claims.
