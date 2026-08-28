# Kodac P2-R1 Benchmark Contract, Fixture, and Manifest Evidence — 2026-08-28

## Record identity

- Date: 2026-08-28
- Authority class: P2-R1 BOUNDED IMPLEMENTATION EVIDENCE CANDIDATE
- Canonical authorization merge: `1cd2fc4de1eb5849cbe2519ae1699bc2acc56397` (PR #237)
- Canonical authorization candidate head: `aec23bc436fc0b57c77ecfe8b1d9743d43736bdc`
- Implementation base: `1cd2fc4de1eb5849cbe2519ae1699bc2acc56397`
- Evidence-materialization parent head: `8becb40f53babc58a6223fd653ffa57bf2fd80fe`
- Evidence-materialization parent tree: `e581f7e9b9bb7c15b3583eac592dbd3135c32490`
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

## Exact authorized implementation realization before this evidence update

The evidence-materialization parent changes exactly these five implementation paths relative to the canonical implementation base:

```text
packages/kodac-runtime/bench/p2-r1/contract.ts
packages/kodac-runtime/test/fixtures/p2-r1/development.json
packages/kodac-runtime/test/fixtures/p2-r1/holdout.json
packages/kodac-runtime/test/fixtures/p2-r1/manifest.json
packages/kodac-runtime/test/p2-r1-contract.test.ts
```

All five paths are inside the canonical P2-R1 implementation allowlist. No package manifest, lockfile, workflow, existing product-runtime source, provider/model adapter, storage, telemetry, release, or ruleset path is modified.

Exact implementation blobs at evidence-materialization parent `8becb40f53babc58a6223fd653ffa57bf2fd80fe`:

```text
packages/kodac-runtime/bench/p2-r1/contract.ts
  573aaf45f285902c9acda19759d912f16e9ccd8e
packages/kodac-runtime/test/fixtures/p2-r1/development.json
  bb91e3288875ccb17f3bacd1e9975e2baa6433cf
packages/kodac-runtime/test/fixtures/p2-r1/holdout.json
  b1330354b15e4d853493b844ebe09678409e6c5b
packages/kodac-runtime/test/fixtures/p2-r1/manifest.json
  6da44a7e2ac8226c3638e99e2f7471651cd79ca1
packages/kodac-runtime/test/p2-r1-contract.test.ts
  30ff43127b535f83d8b555cb52147c33fd3b76e7
```

The sixth authorized path is this evidence record itself.

## Self-reference-safe exact-head binding rule

A repository file cannot truthfully embed the Git blob identity or Git commit identity created by the act of materializing that same file without creating a recursive identity dependency. Therefore this record binds the exact evidence-materialization parent and all pre-existing implementation blobs above, and requires the following GitHub object evidence to be captured after this file is materialized and before final review or merge qualification:

1. exact final PR head SHA;
2. exact final PR tree SHA;
3. exact blob SHA for this evidence file;
4. exact blobs for every other changed path on that final head;
5. exact final changed-file set;
6. exact-head CI/check identities;
7. exact-head semantic-review quorum evidence.

Those external GitHub object bindings are part of this evidence record's qualification package. They must refer to one frozen final head. Any repository-byte change after that capture makes the prior head, tree, blobs, CI, and semantic reviews stale.

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
- uninvoked strategy/evaluator/model/provider/execution identities explicitly represented as `not-applicable`;
- canonical JSON structure validation that rejects Proxies, accessors/getters, symbol fields, non-plain object prototypes, sparse/accessor/extended/non-canonical arrays, cycles, non-finite values, undefined values, and other unsupported non-JSON values before semantic identity construction;
- null-prototype intermediate records so a legitimate own JSON key such as `__proto__` is preserved as an ordinary data property rather than interacting with the legacy prototype setter.

The contract does not invoke a provider, model, reviewer, evaluator, tool, network endpoint, secret, persistence backend, telemetry system, or external dataset.

## Hostile-structure hardening adjudication

A manual exact-head review after the earlier evidence materialization identified a real canonicalization defect in the former implementation: generic objects were copied into an ordinary `{}` intermediate object, so an own enumerable `__proto__` key could interact with the legacy prototype setter instead of remaining an ordinary canonical data property. The same boundary did not fail closed on several hostile or non-JSON JavaScript structures before identity construction.

The defect was fixed forward without rewriting history in commit:

```text
8becb40f53babc58a6223fd653ffa57bf2fd80fe
fix(p2): harden R1 canonical JSON structure validation
```

That commit modified only the already authorized `contract.ts` and `p2-r1-contract.test.ts` paths. It introduced no dependency, workflow, product-runtime, provider/model, persistence, telemetry, release, or ruleset change.

The former exact head `4409317aa19bb252d74c532b0a90ca2e84cf4263` and every CI/reviewer assertion tied to it are stale for final qualification and must not be reused.

## Focused P2-R1 proof at the evidence-materialization parent

The committed focused test file now contains 29 P2-R1 cases. The original 25 cases remain, and four hostile-structure cases were added to prove:

- `__proto__` is preserved as an ordinary own JSON data key and changes canonical identity;
- object accessors/getters, symbols, non-plain prototypes, and Proxies fail closed without accessor/proxy getter execution;
- sparse arrays, accessor arrays, extended arrays, arrays with non-canonical prototypes, and cyclic values fail closed;
- hostile nested fixture payloads fail closed before identity construction and without getter execution.

The existing tests continue to cover committed fixture/manifest validation, key-order-independent serialization, deterministic/distinct corpus and holdout digests, identity alias/overlap rejection, chronology proof semantics, contamination-state separation, digest mismatch rejection, schema/key/path rejection, task-family metric confinement, explicit `not-applicable` identities, host-metadata exclusion, and repeated-input result-identity stability.

## CI evidence on the evidence-materialization parent

The exact evidence-materialization parent `8becb40f53babc58a6223fd653ffa57bf2fd80fe` completed the full applicable repository CI successfully before this evidence record was updated.

### Governance

Workflow run `33172351610`:

```text
provenance   job 98852329380   SUCCESS
  uv sync --frozen --dev       SUCCESS
  provenance validation        SUCCESS
legacy-tests job 98852329596   SUCCESS
  uv sync --frozen --dev       SUCCESS
  uv run pytest                SUCCESS
  uv run ruff check .          SUCCESS
```

### K2 runtime qualification

Workflow run `33172351609`:

```text
runtime-change-classifier      job 98852329396   SUCCESS
runtime (windows-latest)       job 98852368244   SUCCESS
runtime (ubuntu-latest)        job 98852368263   SUCCESS
runtime (macos-latest)         job 98852368266   SUCCESS
k2-runtime-gate                job 98852660574   SUCCESS
```

Each runtime matrix job completed strict TypeScript typecheck, runtime tests, and the existing patch benchmark hook successfully.

No aggregate runtime test count is asserted here because the exact parent-head job metadata used for this record proves step outcomes but does not expose a trustworthy aggregate test-count log. The historical `1101 / 1097 / 0 / 4` count from an earlier head is intentionally not reused as proof for this head.

The existing patch benchmark hook is CI health evidence only; it is not a P2-R1 benchmark result, ranking, public leaderboard datum, or product-superiority claim.

## Fix-forward history

No stale or failed-head evidence is reused as final qualification evidence.

- Head `f3daa8a5c0960afd1d756fd54d6bc31217e27544` exposed three strict TypeScript `TS2322` diagnostics and is stale/failed history.
- Head `458a6bd6fbaf96c5326aedc03f0db8046fccf83f` reduced that defect set to one remaining validated-string narrowing diagnostic and is stale/failed history.
- Head `010515bd48a90ddc37b21b14bace4fed62bcd910` fixed the type-level narrowing defect and passed its applicable CI; it is now precursor history only.
- Head `4409317aa19bb252d74c532b0a90ca2e84cf4263` materialized the former evidence record and passed its applicable CI, but subsequent manual review found the hostile-structure canonicalization defect; all qualification evidence on that head is stale.
- Head `8becb40f53babc58a6223fd653ffa57bf2fd80fe` fixes the defect inside the P2-R1 allowlist and passed the complete applicable CI listed above. It is the evidence-materialization parent, not the final head after this record changes.

The new final head created by updating this evidence file must independently re-pass required CI and receive fresh semantic review. The successful `8bec...` runs prove the implementation bytes before evidence rebinding; they do not substitute for final-head CI or reviews.

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

Ruleset `20707483` was re-read before this evidence update. It remains active for `refs/heads/main`, requires protected PR flow and review-thread resolution, and requires the exact status contexts `provenance`, `legacy-tests`, and `k2-runtime-gate` with strict required-status-check policy.

At that re-read:

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
5. at least two distinct independent external semantic reviewer channels each give a substantive terminal-clean assessment on that exact final head under the provider-neutral quorum policy;
6. rate-limit, billing, skipped, status-only, summary-only, self-review, stale-head, error, and duplicate-channel outputs do not count;
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
