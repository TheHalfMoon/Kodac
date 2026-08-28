# Kodac P2-R2 Local Runner and Immutable Report Authorization — 2026-08-28

## Status

```text
DOCUMENT TYPE: FOUNDER-AUTHORIZED IMPLEMENTATION GATE CANDIDATE
P2-R1 = CLOSED_CANONICAL
P2-R2 IMPLEMENTATION = AUTHORIZED ONLY AFTER THIS RECORD IS CANONICAL
P2-R3+ = NOT AUTHORIZED
GENERAL KODACBENCH = NOT CLOSED
PUBLIC SUPERIORITY CLAIMS = NOT AUTHORIZED
WAIVER = NO
```

This record is deny-by-default. It creates no effective P2-R2 implementation authority while it is only a branch or pull-request candidate. The implementation authority below becomes effective only after this exact authorization unit is qualified on one exact head, merged normally into protected `main`, and its required post-merge proof succeeds.

## Exact canonical baseline

This candidate is prepared from protected canonical `main`:

```text
c499c8ac098cca9719eaad3cacadd2af7d1c0a1f
```

That commit is the merge of PR #238 and closes P2-R1 for its exact bounded contract, frozen fixture/manifest, and evidence scope after exact-head review, guarded merge, ordered-parent/tree/blob/signature proof, successful post-merge governance checks, and successful post-merge K2 runtime matrix/gate qualification.

Canonical P2-R1 implementation evidence:

- `docs/planning/KODAC_P2_R1_BENCHMARK_CONTRACT_FIXTURE_MANIFEST_EVIDENCE_2026-08-28.md`

Governing records include:

- `AGENTS.md`;
- `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`;
- `docs/adr/ADR-0010-benchmark-first-donor-selection.md`;
- `docs/planning/KODAC_REVIEW_PROVIDER_NEUTRALITY_AND_EVIDENCE_QUORUM_AMENDMENT_2026-08-27.md`;
- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`;
- `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`;
- `docs/planning/KODAC_K3_BENCHMARK_AND_EVIDENCE_PROTOCOL_2026-08-12.md` as benchmark/evidence precedent;
- the canonical P2-R1 authorization and evidence records.

If live protected `main`, repository governance, or any more-specific canonical authority conflicts with this candidate before merge, reconcile forward without force-push, rebase, destructive history rewrite, or silent waiver.

## Exact authorization-unit changed-file set

This authorization/gate PR may change exactly these five paths and no others:

```text
docs/planning/KODAC_P2_R2_LOCAL_RUNNER_REPORT_AUTHORIZATION_2026-08-28.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
```

This unit is documentation/governance only. It may not implement P2-R2.

The exact five-path set above governs changed-file qualification and the required individual candidate blob capture. Missing any one of the five candidate blobs makes authorization qualification incomplete.

## P2-R2 purpose

P2-R1 established a deterministic benchmark contract and frozen local fixture/manifest spine. P2-R2 establishes the smallest executable KodacBench measurement/report layer that can consume those canonical R1 values without granting any external execution authority.

The intended flow is:

```text
CANONICAL P2-R1 FIXTURES + MANIFEST
+ CALLER-MATERIALIZED CASE OBSERVATIONS
-> STRICT LOCAL VALIDATION
-> DETERMINISTIC ORDERING / BINDING
-> IMMUTABLE MACHINE-READABLE REPORT
-> CANONICAL REPORT IDENTITY
```

P2-R2 is intentionally not a general provider/model/evaluator runner. It does not call an agent, model, provider, reviewer, evaluator, network endpoint, tool adapter, sandbox, compiler, test runner, or external benchmark suite.

## Authorized implementation allowlist

After this authorization becomes canonical, exactly one P2-R2 implementation PR may modify only:

```text
packages/kodac-runtime/bench/p2-r2/**
packages/kodac-runtime/test/p2-r2-*.test.ts
docs/planning/KODAC_P2_R2_LOCAL_RUNNER_REPORT_EVIDENCE_2026-08-28.md
```

P2-R2 may import and use the already-canonical P2-R1 contract. It may read committed P2-R1 fixtures in tests. It may not modify P2-R1 implementation or fixture bytes.

No package manifest, lockfile, workflow, CLI, product-runtime source, K2/K3/K4/K5/K6 source, adapter, provider, model, reviewer, evaluator, persistence, telemetry, release, or ruleset path is in the allowlist.

If a necessary change falls outside this allowlist, stop. A separate authorization is required.

## Required observation contract

P2-R2 may accept only caller-materialized in-memory observations. The implementation must define a versioned exact-key observation contract that binds every observation to canonical P2-R1 evidence.

Each observation must identify at least:

```text
schema_version
case_id
r1_result_identity
task_family
metric_id
unit
measurement_status
value
```

Required semantics:

- `case_id` must exist exactly once in the validated R1 manifest set;
- `r1_result_identity` must equal that case's canonical R1 `result_identity`;
- `task_family`, `metric_id`, and `unit` must match a metric definition already declared by that R1 manifest record;
- unknown cases, unknown metrics, unit drift, cross-task-family observations, duplicate observations, or identity mismatch fail closed;
- a numeric observed value must be finite and canonical;
- missing/unavailable observations must remain explicit rather than silently becoming zero, success, failure, or clean evidence;
- caller timestamps, local absolute paths, process state, object iteration order, locale, host names, and wall-clock time must not affect report identity.

P2-R2 must not pretend that caller-materialized values were produced by an evaluator, provider, model, reviewer, or strategy that P2-R1 explicitly recorded as `not-applicable`.

## Required report contract

P2-R2 must materialize an immutable machine-readable report with exact versioned semantics and a deterministic canonical identity.

The report must bind at least:

```text
schema_version
benchmark_id
benchmark_protocol_version
r1_manifest_set_digest
observation_set_digest
case_count
observation_count
missing_observation_count
task_family_sections
report_identity
```

Each task-family section must preserve case-level metric observations without silently collapsing distinct task families into a universal score.

The runner must produce deterministic canonical ordering independent of caller input order. Identical canonical inputs must produce identical report bytes/semantic identity.

The report identity must be derived only from canonical evidence-bearing values. `report_identity` itself must be excluded from its own identity input.

## No inferred aggregation

P2-R1 metric definitions do not declare a reducer or aggregation policy. Therefore P2-R2 is not authorized to invent one.

P2-R2 must not infer or materialize:

- arithmetic means merely because values are numeric;
- weighted/blended scores;
- cross-task-family normalization;
- global rankings;
- `best`, `winner`, `superior`, or equivalent semantics;
- pass/fail thresholds that were not canonically declared by an authorized contract.

P2-R2 may materialize exact deterministic coverage/count metadata such as the number of expected, observed, and explicitly missing metric observations. Those counts are completeness evidence, not quality scores.

Any future reducer, evaluator, threshold, ranking, comparison, or promotion semantics require a later separate P2 authorization.

## Canonicalization and hostile-structure boundary

P2-R2 must use or preserve the hardened P2-R1 canonical JSON boundary rather than accepting arbitrary JavaScript object semantics.

Before report identity construction, fail closed on unsupported or hostile values including, where applicable:

- Proxies;
- accessors/getters;
- symbol properties;
- non-plain object prototypes;
- sparse, accessor, extended, or non-canonical arrays;
- cycles;
- `undefined`, functions, bigint, symbols, non-finite numbers, or other non-JSON values;
- unknown or missing exact contract fields.

A legitimate own JSON key such as `__proto__` must remain ordinary data and must not mutate an intermediate object's prototype.

Do not mechanically duplicate P2-R1 internals if a small exported canonical primitive already supplies the required invariant.

## Determinism and mutation safety

Required identity invariant:

```text
same validated P2-R1 manifest set
+ same canonical caller observations
+ same P2-R2 schema/protocol semantics
-> same report identity
```

The implementation must not derive identity from mutable caller object references after validation. Mutating caller inputs after the runner returns must not retroactively alter the returned report's semantic contents.

Input order must not change report identity.

## Security and privacy invariants

Required P2-R2 authority values:

```text
UNAUTHORIZED WORKSPACE MUTATIONS BY P2-R2 LOGIC = 0
NETWORK / PROVIDER / MODEL / REVIEWER / EVALUATOR INVOCATIONS = 0
SUBPROCESS / TOOL / SANDBOX EXECUTION = 0
PERSISTENT DATABASE / FILE OUTPUT / TELEMETRY / UPLOAD / ANALYTICS EGRESS = 0
SECRET ACCESS = 0
NEW DEPENDENCIES = 0
DONOR CODE / DATA INTAKE = 0
P2-R1 BYTE MUTATIONS = 0
```

P2-R2 runtime logic must be pure/in-memory for this slice. Existing test-runner temporary behavior remains ordinary repository tooling and does not grant P2-R2 product logic new side-effect authority.

K2 remains Kodac's trusted side-effect execution boundary. P2-R2 does not expand it.

## Explicit non-grants

This record does not authorize:

- P2-R3 or any later P2 slice;
- provider/model/reviewer/evaluator/tool/agent invocation;
- network access or secret handling;
- subprocess, compiler, test-runner, sandbox, or external benchmark execution by P2-R2 logic;
- external dataset or donor-source intake;
- new dependencies or package/lockfile changes;
- CLI/product integration;
- mutation of P2-R1 fixtures/contracts;
- persistent database, file output, telemetry, upload, analytics, training, fine-tuning, online learning, or cross-repository learning;
- strategy execution, automatic selection, promotion, trust mutation, or eligibility advancement;
- K2, K5, Done Gate, or `PROVEN_READY` authority expansion;
- reducer/threshold/evaluator semantics not already canonically declared;
- public leaderboard or competitive benchmark execution;
- universal/blended score, global ranking, `best`, `winner`, `superior`, SOTA, production-readiness, security, support, or compatibility claims;
- public release, package publication, public version declaration, or brand launch;
- ruleset mutation or bypass.

## Required P2-R2 tests

The implementation PR must include focused tests proving at least:

1. the R1 manifest set is revalidated before R2 reporting;
2. observation order does not affect canonical report identity;
3. repeated identical inputs produce identical report identity;
4. report identity changes when a legitimate evidence-bearing observation changes;
5. unknown case IDs fail closed;
6. R1 result-identity mismatch fails closed;
7. task-family mismatch fails closed;
8. unknown metric IDs fail closed;
9. metric-unit mismatch fails closed;
10. duplicate observations fail closed;
11. non-finite observed values fail closed;
12. missing/unavailable observation state remains explicit and is not normalized to zero or success;
13. report task-family sections remain separated;
14. no universal/blended score, ranking, winner, or undeclared reducer is materialized;
15. deterministic completeness counts match the exact expected/observed/missing observation set;
16. caller input mutation after return does not mutate the returned report semantics;
17. hostile/non-JSON JavaScript structures fail closed before identity construction;
18. `__proto__` remains ordinary canonical data where generic JSON payloads are permitted;
19. timestamps/absolute paths/process state are not identity inputs;
20. existing repository tests and required CI remain green.

Tests must use committed R1 fixtures and/or in-memory safe values only. They must not require internet access.

## P2-R2 evidence record

The implementation PR must create:

`docs/planning/KODAC_P2_R2_LOCAL_RUNNER_REPORT_EVIDENCE_2026-08-28.md`

The evidence record must bind at least:

- exact canonical P2-R2 authorization merge identity;
- implementation base and exact candidate head;
- exact changed-file allowlist realization;
- exact final blobs for all changed implementation/test/evidence paths;
- focused test commands and exact results;
- required CI run/check identities;
- semantic-review evidence required by live governance;
- active ruleset/no-bypass evidence;
- known limitations and preserved non-grants;
- guarded normal merge conditions;
- post-merge parents/tree/blob/signature/applicable-check proof required before P2-R2 may be called canonical/complete.

Candidate-time evidence must not claim a future merge result as fact.

## Authorization-unit qualification gate

This authorization candidate may merge only if all of the following hold on one frozen exact head:

- live protected `main` has not moved without explicit forward reconciliation;
- changed files are exactly the five named authorization-unit paths and no others;
- no runtime source, workflow, dependency, lockfile, benchmark implementation, fixture, or product change is present;
- all required exact-head CI/check contexts succeed or are proven non-applicable from canonical workflow conditions;
- at least two distinct independent external semantic reviewer channels each give a substantive terminal-clean assessment on the exact final head under the provider-neutral review evidence contract;
- rate-limit, billing, skipped-review, outage, status-only, summary-only, self-review, stale-head, error, or duplicate-channel output does not count;
- unresolved material findings and actionable review threads = 0;
- the final candidate head and tree are captured;
- each of the five changed paths has an individually captured final blob identity;
- PR is open, non-draft, mergeable, and not behind protected `main`;
- ruleset `20707483` remains active with `bypass_actors=[]`, `current_user_can_bypass=never`, required review-thread resolution, and required checks `provenance`, `legacy-tests`, and `k2-runtime-gate`;
- merge is a normal history-preserving merge guarded by exact `expected_head_sha` semantics.

## Required post-merge proof

P2-R2 implementation authority becomes effective only after this authorization PR merges and all of the following are proven from live GitHub objects:

- protected `main` equals the returned authorization merge SHA;
- ordered merge parents are the then-canonical base followed by the exact qualified authorization head;
- merge tree matches the qualified candidate tree;
- all five canonical path blobs match the qualified candidate blobs;
- GitHub merge signature/verification is valid where emitted;
- ruleset/no-bypass state remains intact;
- applicable post-merge push checks succeed or non-applicability is proven from canonical workflow conditions.

Only after that proof may the one bounded P2-R2 implementation PR described above begin.

Even successful P2-R2 does not authorize P2-R3.
