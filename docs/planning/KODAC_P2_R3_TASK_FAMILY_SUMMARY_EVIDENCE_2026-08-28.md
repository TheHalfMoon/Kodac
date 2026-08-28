# Kodac P2-R3 Task-Family Summary Evidence — 2026-08-28

**Status:** CANDIDATE-TIME EVIDENCE / NOT CLOSED_CANONICAL  
**Authority:** `docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_AUTHORIZATION_2026-08-28.md`  
**Canonical authorization merge:** `d398983a457060dff0b700714d3eebbc4dce8e23` (PR #241)  
**Ruleset:** `20707483` — `Kodac canonical main protection v1`  
**WAIVER:** `NO`

## 1. Claim boundary

This record documents the bounded P2-R3 implementation candidate for the explicit reducer-policy and deterministic task-family summary spine.

It does **not** claim:

- `P2-R3 = CLOSED_CANONICAL`,
- comparison, ranking, winner, best, superiority, promotion, or benchmark-execution authority,
- provider, model, reviewer, evaluator, tool, or agent execution,
- CLI or product integration,
- persistence, telemetry, network, secret, subprocess, sandbox, release, or ruleset authority,
- authorization for P2-R4 or any later P2 slice.

P2-R4+ remains unauthorized.

## 2. Authorized changed-file boundary

The canonical P2-R3 authorization permits exactly:

```text
packages/kodac-runtime/bench/p2-r3/**
packages/kodac-runtime/test/p2-r3-*.test.ts
docs/planning/KODAC_P2_R3_TASK_FAMILY_SUMMARY_EVIDENCE_2026-08-28.md
```

The implementation candidate materialized before this evidence record changed exactly:

```text
packages/kodac-runtime/bench/p2-r3/summary.ts
packages/kodac-runtime/test/p2-r3-summary.test.ts
```

This evidence record is the third and final authorized path used by the candidate.

No P2-R1 or P2-R2 byte was modified. No package, lockfile, workflow, CLI, product, provider, model, persistence, telemetry, release, or ruleset path was modified.

## 3. Self-reference-safe candidate binding

This evidence file cannot bind its own future Git blob or the future commit that first contains this file without creating a recursive identity dependency. Therefore this record binds the exact implementation/test parent immediately before evidence materialization.

**Evidence-materialization parent commit:**

```text
fed30d01ee08d3993f26264e4f88a9d773fe1bc9
```

**Evidence-materialization parent tree:**

```text
4cda1682601bf20595ad73e7ee56ea69d526a604
```

**Exact implementation blob:**

```text
packages/kodac-runtime/bench/p2-r3/summary.ts
1c0c79381ad89ca9051e0d37243a17f85ea19285
```

**Exact test blob:**

```text
packages/kodac-runtime/test/p2-r3-summary.test.ts
7abf8b25a90079928d441c376581357f69a9ec7d
```

Final qualification must bind, outside this self-referential record, the exact final PR head, final tree, this evidence file's final blob, the implementation blob, and the test blob. Any final-head movement invalidates prior exact-head CI or semantic-review evidence.

## 4. Implemented bounded contract

The candidate implements only the authorized P2-R3 surface:

1. Caller-supplied P2-R2 report data crosses the hardened P2-R1 canonical JSON boundary before semantic reads.
2. P2-R2 report, task-family section, case, and metric shapes are exact-key validated.
3. P2-R2 report SHA-256 identities, canonical ordering, measurement states, uniqueness, and derived case/observation counts are revalidated.
4. Policy documents are exact-key, versioned, and bound to the exact benchmark ID, benchmark protocol version, and R2 report identity.
5. Policy input order is normalized before policy identity construction.
6. At most one policy exists per `(task_family, metric_id)`; unknown task families, metrics, cross-task bindings, or unit mismatches fail closed.
7. The value-kind vocabulary is closed to `NUMBER` and `BOOLEAN`.
8. The reducer vocabulary is closed to `ARITHMETIC_MEAN` and `BOOLEAN_TRUE_RATE` with exact value-kind compatibility.
9. The missingness vocabulary is closed to `REQUIRE_COMPLETE` and `OBSERVED_ONLY_WITH_COVERAGE`.
10. `minimum_observed_count` is a positive safe integer, cannot exceed expected count, and must equal expected count under `REQUIRE_COMPLETE`.
11. Incomplete `REQUIRE_COMPLETE` evidence emits per-metric `INSUFFICIENT_EVIDENCE` without aborting independent metrics.
12. `OBSERVED_ONLY_WITH_COVERAGE` reduces only when its explicit minimum is met; zero observed values are always insufficient.
13. Arithmetic mean uses only observed finite numeric values, preserves the input unit, and fails closed if the reduction becomes non-finite.
14. Boolean true rate uses only observed booleans, emits `ratio_0_1`, and exposes exact `true_count` and `denominator_count`; missing and unavailable values are never treated as false.
15. Expected, observed, missing, and unavailable counts remain explicit and reconciled.
16. Task families remain separate and deterministically sorted; metrics remain deterministically sorted.
17. Metrics without an explicit policy remain unsummarized.
18. Summary identity binds all evidence-bearing summary fields except its own identity, including exact R2 report identity and derived policy identity.
19. Returned summary graphs are recursively frozen and caller mutation after return cannot alter report semantics.
20. Hostile JavaScript structures fail closed through the canonical P2-R1 boundary without executing Proxy or accessor hooks.
21. `__proto__` remains ordinary canonical data and does not pollute prototypes.
22. Timestamps, paths, locale, host, and process state are excluded from semantic identity.
23. The output contains no direction, threshold, universal/blended score, comparison, ranking, leaderboard, winner, best, superior, promotion, or product-claim field.
24. The implementation performs no I/O, network access, secret access, subprocess/sandbox execution, persistence, telemetry, dependency addition, provider/model/reviewer/evaluator execution, CLI/product integration, release action, or ruleset mutation.

## 5. Focused test proof

`packages/kodac-runtime/test/p2-r3-summary.test.ts` contains 37 focused P2-R3 tests covering the canonical authorization contract, including:

- canonical R1 fixture -> canonical R2 report -> R3 summary interoperability,
- numeric and boolean reducers,
- exact R2 structural and identity revalidation,
- stale identity rejection,
- deterministic policy ordering and repeated-output identity,
- evidence-bearing identity changes,
- unknown task family / metric / unit rejection,
- duplicate policy rejection,
- unsupported value kind / reducer rejection,
- reducer-kind mismatch and mixed observed kinds,
- all required `minimum_observed_count` failures,
- `REQUIRE_COMPLETE` semantics,
- observed-only coverage semantics,
- zero-observed insufficiency,
- non-finite input and reducer-result failures,
- arithmetic-mean unit preservation,
- boolean true-rate exact numerator/denominator semantics,
- report-count reconciliation,
- deterministic family/metric separation,
- negative-space checks for comparison/ranking/promotion vocabulary,
- deep freeze and caller-mutation independence,
- hostile Proxy/accessor/sparse/non-JSON inputs,
- `__proto__` no-pollution behavior,
- timestamp/path/locale/host/process-state identity exclusion,
- exact schema/key and benchmark/protocol/R2 identity binding,
- noncanonical reordered R2 arrays rejected even when caller recomputes a plausible report identity,
- unsummarized metrics without explicit policy.

## 6. Pre-evidence machine proof

The evidence-materialization parent was exercised by GitHub Actions with workflow metadata bound to exact candidate head:

```text
fed30d01ee08d3993f26264e4f88a9d773fe1bc9
```

GitHub's pull-request checkout materialized synthetic merge ref:

```text
a11ba6c929ce91f3691ca749c5821190bd37221b
```

which integrated the unchanged canonical base:

```text
d398983a457060dff0b700714d3eebbc4dce8e23
```

with the exact implementation/test head above.

### Governance

Workflow run:

```text
33186037158 — SUCCESS
```

Jobs:

```text
provenance   98899165989 — SUCCESS
legacy-tests 98899166175 — SUCCESS
```

### K2 runtime

Workflow run:

```text
33186037156 — SUCCESS
```

Jobs:

```text
runtime-change-classifier   98899166011 — SUCCESS
runtime (ubuntu-latest)     98899219785 — SUCCESS
runtime (windows-latest)    98899219859 — SUCCESS
runtime (macos-latest)      98899219948 — SUCCESS
k2-runtime-gate             98899490374 — SUCCESS
```

Ubuntu exact proof included:

```text
Typecheck             — SUCCESS
Test                  — SUCCESS
Patch benchmark hook  — SUCCESS
```

Full Node test summary:

```text
tests    1167
pass     1163
fail     0
cancelled 0
skipped  4
todo     0
```

All 37 P2-R3 focused tests executed in that suite and passed.

## 7. Governance proof at evidence-materialization time

Protected canonical `main` remained:

```text
d398983a457060dff0b700714d3eebbc4dce8e23
```

Ruleset `20707483` remained:

```text
enforcement = active
bypass_actors = []
current_user_can_bypass = never
required_status_checks = provenance, legacy-tests, k2-runtime-gate
required_review_thread_resolution = true
```

No waiver exists.

## 8. Final candidate qualification still required

This record does not qualify its own containing head. After this evidence file is committed, the new final candidate head must be independently re-proven from scratch.

Before merge, the exact unchanged final head must prove all of the following:

1. PR open, non-draft, mergeable, and based on the current protected `main`.
2. `behind_by = 0` against protected `main`.
3. Changed files are exactly the three authorized paths and no others.
4. Exact final tree and all three final blobs are bound.
5. Exact-head `provenance`, `legacy-tests`, and `k2-runtime-gate` succeed.
6. Applicable K2 runtime classifier, typecheck, tests, platform matrix, and benchmark hook succeed.
7. No unresolved review thread remains.
8. The active no-bypass ruleset remains unchanged in its required protections.
9. At least two distinct independent external semantic-review services provide substantive terminal-clean verdicts bound to the exact final head, with no unresolved material correctness, security, governance, authority, or scope finding.
10. The merge is a normal guarded merge using the exact final `expected_head_sha`.

## 9. Post-merge proof required for canonical closure

Even after a successful merge endpoint response, P2-R3 remains unclosed until post-merge proof establishes:

1. protected `main` equals the returned merge SHA,
2. PR #242 is merged and binds that exact merge commit,
3. ordered merge parents are the pre-merge protected `main` followed by the exact qualified candidate head,
4. merge tree equals the exact qualified candidate tree,
5. GitHub commit verification is valid,
6. canonical `main` contains the exact qualified blobs for implementation, tests, and this evidence record,
7. applicable post-merge governance push checks succeed,
8. applicable post-merge K2 runtime push checks succeed,
9. ruleset `20707483` remains active with no bypass.

Only after all of those facts are re-read from live GitHub truth may the repository state be described as:

```text
P2-R3 = CLOSED_CANONICAL
```

Until then:

```text
P2-R3 = AUTHORIZED / IMPLEMENTATION CANDIDATE / NOT CLOSED_CANONICAL
P2-R4+ = NOT AUTHORIZED
WAIVER = NO
```
