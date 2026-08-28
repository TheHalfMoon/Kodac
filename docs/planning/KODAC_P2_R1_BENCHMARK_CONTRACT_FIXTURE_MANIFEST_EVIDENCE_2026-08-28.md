# Kodac P2-R1 Benchmark Contract, Fixture, and Manifest Evidence — 2026-08-28

## Record identity

- Date: 2026-08-28
- Authority class: P2-R1 BOUNDED IMPLEMENTATION EVIDENCE CANDIDATE
- Canonical authorization merge: `1cd2fc4de1eb5849cbe2519ae1699bc2acc56397` (PR #237)
- Canonical authorization candidate head: `aec23bc436fc0b57c77ecfe8b1d9743d43736bdc`
- Implementation base: `1cd2fc4de1eb5849cbe2519ae1699bc2acc56397`
- Evidence-materialization parent head: `010515bd48a90ddc37b21b14bace4fed62bcd910`
- Evidence-materialization parent tree: `a7b16c773677fd8b57f3487847f53c5faed07c33`
- Pull request: #238
- Protected-main ruleset: `20707483` (`Kodac canonical main protection v1`)
- `WAIVER=NO`

## Candidate state

```text
P2-R1 = AUTHORIZED / NOT COMPLETE
P2 = OPEN
P2-R2+ = NOT AUTHORIZED
PUBLIC LEADERBOARD / BLENDED UNIVERSAL SCORE / SUPERIORITY CLAIM = NOT AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT AUTHORIZED
NETWORK / SECRET / PERSISTENCE / TELEMETRY AUTHORITY = NOT AUTHORIZED
```

This record is candidate-time evidence. It does not claim a future merge, post-merge result, or `CLOSED_CANONICAL` state.

## Exact authorized implementation realization before evidence materialization

The evidence-materialization parent changes exactly these five implementation paths relative to the canonical implementation base:

```text
packages/kodac-runtime/bench/p2-r1/contract.ts
packages/kodac-runtime/test/fixtures/p2-r1/development.json
packages/kodac-runtime/test/fixtures/p2-r1/holdout.json
packages/kodac-runtime/test/fixtures/p2-r1/manifest.json
packages/kodac-runtime/test/p2-r1-contract.test.ts
```

All five paths are inside the canonical P2-R1 implementation allowlist. No package manifest, lockfile, workflow, existing product-runtime source, provider/model adapter, storage, telemetry, release, or ruleset path is modified.

Exact blobs at evidence-materialization parent `010515bd48a90ddc37b21b14bace4fed62bcd910`:

```text
packages/kodac-runtime/bench/p2-r1/contract.ts
  bcc63c4bedbcd472d7d5341785369fac30d89f87
packages/kodac-runtime/test/fixtures/p2-r1/development.json
  bb91e3288875ccb17f3bacd1e9975e2baa6433cf
packages/kodac-runtime/test/fixtures/p2-r1/holdout.json
  b1330354b15e4d853493b844ebe09678409e6c5b
packages/kodac-runtime/test/fixtures/p2-r1/manifest.json
  6da44a7e2ac8226c3638e99e2f7471651cd79ca1
packages/kodac-runtime/test/p2-r1-contract.test.ts
  202bd62304b55a56007e0fb48e8c4b6f6d791f15
```

The sixth authorized path is this evidence record itself.

## Self-reference-safe exact-head binding rule

A repository file cannot truthfully embed the Git blob identity or Git commit identity that is created by the act of materializing that same file without creating a recursive identity dependency. Therefore this record binds the exact evidence-materialization parent and all pre-existing implementation blobs above, and requires the following GitHub object evidence to be captured *after* this file is materialized and before any final review or merge qualification:

1. exact final PR head SHA;
2. exact final PR tree SHA;
3. exact blob SHA for this evidence file;
4. exact blobs for every other changed path on that final head;
5. exact final changed-file set;
6. exact-head CI/check identities;
7. exact-head semantic-review quorum evidence.

Those external GitHub object bindings are part of this evidence record's qualification package. They must refer to one frozen final head. Any content change after that capture makes the prior head, tree, blobs, CI, and semantic reviews stale.

## Implemented bounded contract

P2-R1 implements only a local deterministic contract/fixture spine:

- strict versioned fixture and manifest contracts;
- deterministic sorted-key canonical serialization and SHA-256 identities;
- separately identified frozen development and holdout fixture corpora;
- explicit `fixture-epoch-v1` synthetic chronology used only to test ordering semantics;
- strict proof before `later-in-time` classification;
- deterministic case, corpus, holdout, and result identities;
- fail-closed unknown/missing fields, unsupported versions, duplicate identities, digest mismatches, and fixture-path escapes;
- contamination states preserving `unknown != none-known`;
- chronology states preserving `chronology-unproven != later-in-time`;
- task-family-local metric declarations with universal/blended winner metrics rejected;
- uninvoked strategy/evaluator/model/provider/execution identities explicitly represented as `not-applicable`.

The contract does not invoke a provider, model, reviewer, evaluator, tool, network endpoint, secret, persistence backend, telemetry system, or external dataset.

## Focused P2-R1 proof

The committed focused test file exercises 25 P2-R1 cases, covering and exceeding the 18 minimum tests in the canonical authorization. On evidence-materialization parent `010515bd48a90ddc37b21b14bace4fed62bcd910`, the Ubuntu runtime job executed the repository test runner and all focused P2-R1 cases passed, including:

- committed fixture/manifest validation;
- object-key-order-independent canonical serialization;
- deterministic/distinct corpus and holdout digests;
- corpus/holdout identity alias and case-overlap rejection;
- synthetic ordered fixture-epoch semantics;
- equal, earlier, incomparable, and missing chronology rejection for `later-in-time` claims;
- preservation of `chronology-unproven`;
- duplicate case rejection and case-digest mismatch rejection;
- deterministic case digests;
- unsupported-schema, unknown-field, and missing-field rejection;
- non-canonical/escaping fixture-path rejection;
- contamination-state separation;
- task-family metric confinement and universal/blended metric rejection;
- explicit `not-applicable` identities for uninvoked participants/environment;
- exclusion of timestamps/absolute workspace metadata from semantic result identity;
- repeated-input result-identity stability.

## CI evidence on the evidence-materialization parent

The exact evidence-materialization parent `010515bd48a90ddc37b21b14bace4fed62bcd910` passed the full applicable repository CI before this record was added.

### Governance

Workflow run `33170404523`:

```text
provenance   job 98845869336   SUCCESS
legacy-tests job 98845869204   SUCCESS
  uv sync --frozen --dev       SUCCESS
  uv run pytest                SUCCESS
  uv run ruff check .          SUCCESS
```

### K2 runtime qualification

Workflow run `33170404482`:

```text
runtime-change-classifier      job 98845869036   SUCCESS
runtime (ubuntu-latest)        job 98845903202   SUCCESS
runtime (windows-latest)       job 98845903180   SUCCESS
runtime (macos-latest)         job 98845903118   SUCCESS
k2-runtime-gate                job 98846306266   SUCCESS
```

Each runtime matrix job passed strict TypeScript typecheck, the repository runtime test command, and the existing patch benchmark hook.

Ubuntu exact output:

```text
tests     1101
pass      1097
fail      0
cancelled 0
skipped   4
todo      0
```

The four skips are existing platform/conditional tests and are not P2-R1 failures. All 25 P2-R1 focused tests passed.

The existing patch benchmark hook also completed successfully. Its throughput observation is CI health evidence only; it is not a P2-R1 benchmark result, ranking, public leaderboard datum, or product-superiority claim.

## Fix-forward history

No failed-head evidence is reused as qualification evidence.

- Head `f3daa8a5c0960afd1d756fd54d6bc31217e27544` exposed three strict TypeScript `TS2322` diagnostics in the new contract and is stale/failed qualification history.
- Head `458a6bd6fbaf96c5326aedc03f0db8046fccf83f` reduced that defect set to one remaining validated-string narrowing diagnostic and is stale/failed qualification history.
- Head `010515bd48a90ddc37b21b14bace4fed62bcd910` fixed the remaining type-level narrowing defect without widening runtime acceptance and passed the complete applicable CI listed above.

The final head created after this evidence file is added must independently re-pass required CI. The successful parent-head runs above prove the implementation bytes before evidence materialization; they do not substitute for final-head CI.

## Security and authority preservation

Required P2-R1 authority values remain:

```text
UNAUTHORIZED WORKSPACE MUTATIONS BY BENCHMARK LOGIC = 0
NETWORK / PROVIDER / MODEL / REVIEWER / EVALUATOR INVOCATIONS = 0
PERSISTENT DATABASE / TELEMETRY / UPLOAD / ANALYTICS EGRESS = 0
SECRET ACCESS = 0
PATH ESCAPES FROM AUTHORIZED FIXTURE ROOT = 0
NEW DEPENDENCIES = 0
DONOR CODE / DATA INTAKE = 0
```

K2 remains Kodac's trusted side-effect execution boundary. P2-R1 does not modify K2, K5, Done Gate, `PROVEN_READY`, routing, strategy execution, autofix, promotion, persistence, learning, release, or ruleset authority.

## Ruleset evidence before final-head materialization

Ruleset `20707483` is active for `refs/heads/main` and requires protected PR flow, review-thread resolution, and required checks including `provenance`, `legacy-tests`, and `k2-runtime-gate`.

At evidence preparation:

```text
bypass_actors = []
current_user_can_bypass = never
```

This is not a waiver. The ruleset must be re-read again immediately before merge.

## Final implementation qualification gate

PR #238 must not merge unless one frozen exact final head proves all of the following:

1. protected `main` is still the expected canonical base or the candidate has been explicitly reconciled forward without unauthorized scope expansion;
2. the final changed-file set is exactly the five implementation paths above plus this one evidence path and no others;
3. final tree and all six individual final blob identities are captured after evidence materialization;
4. required exact-head CI succeeds, including governance and K2 runtime qualification as applicable;
5. at least two distinct independent external semantic reviewer channels each give substantive terminal-clean assessment on that exact final head under the provider-neutral quorum policy;
6. rate-limit, billing, skipped, status-only, summary-only, self-review, stale-head, and duplicate-channel outputs do not count;
7. unresolved material review threads/findings = 0;
8. PR is open, non-draft, mergeable, and not behind protected `main`;
9. ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never`;
10. guarded normal history-preserving merge uses the exact qualified final `expected_head_sha`.

## Required post-merge proof

P2-R1 may be called `CLOSED_CANONICAL` only after the implementation PR merges and all of the following are proven from live GitHub objects:

- protected `main` equals the returned implementation merge SHA;
- ordered merge parents are the then-canonical base followed by the exact qualified implementation head;
- merge tree matches the qualified candidate tree;
- all six canonical path blobs match the qualified candidate blobs;
- GitHub merge signature/verification is valid where emitted;
- ruleset/no-bypass state remains intact;
- applicable post-merge push checks succeed or non-applicability is proven from canonical workflow conditions.

Until that proof completes:

```text
P2-R1 = AUTHORIZED / NOT COMPLETE
P2-R2+ = NOT AUTHORIZED
WAIVER = NO
```
