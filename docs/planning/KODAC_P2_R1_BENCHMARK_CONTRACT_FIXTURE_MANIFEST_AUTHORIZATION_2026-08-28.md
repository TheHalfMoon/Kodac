# Kodac P2-R1 Benchmark Contract, Fixture, and Manifest Authorization — 2026-08-28

## Status

```text
DOCUMENT TYPE: FOUNDER-AUTHORIZED IMPLEMENTATION GATE CANDIDATE
P2-R1 IMPLEMENTATION: AUTHORIZED ONLY AFTER THIS RECORD IS CANONICAL
P2-R2+: NOT AUTHORIZED
GENERAL KODACBENCH: NOT CLOSED
PUBLIC SUPERIORITY CLAIMS: NOT AUTHORIZED
WAIVER: NO
```

This record is deny-by-default. It creates no effective implementation authority while it is only a branch/PR candidate. The implementation authority below becomes effective only after this exact authorization unit is qualified, merged normally into protected `main`, and its required post-merge proof succeeds.

## Exact baseline

This candidate was prepared from canonical protected `main`:

```text
ed4fb16e8bbaf960812285671062c9b2abf597a8
```

That merge closed K6 for the canonical K6-R1 through K6-R5 bounded scope after exact merge/post-merge proof. K6 closure did not itself authorize P2 implementation.

Governing records include:

- `AGENTS.md`;
- `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`;
- `docs/adr/ADR-0010-benchmark-first-donor-selection.md`;
- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`;
- `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`;
- `docs/planning/KODAC_K3_BENCHMARK_AND_EVIDENCE_PROTOCOL_2026-08-12.md` as benchmark/evidence precedent;
- `docs/planning/KODAC_K6_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md` as the preceding milestone evidence record.

If live protected `main`, repository governance, or any more-specific canonical authority conflicts with this candidate before merge, this candidate is stale and must be reconciled forward. No rebase, force-push, destructive history rewrite, or silent waiver is authorized.

## P2 purpose and slice decomposition

P2 establishes KodacBench as a reproducible measurement and proof spine before later P3-P8 claims or optimization decisions.

P2 is intentionally decomposed. This record authorizes only the first slice after it becomes canonical:

```text
P2-R1 = BENCHMARK CONTRACT + FROZEN FIXTURE / MANIFEST SPINE
P2-R2+ = SEPARATELY AUTHORIZED LATER SLICES
```

P2-R1 is local, deterministic, data/contract oriented, and must be executable without provider/model/reviewer/evaluator network access.

P2-R1 does not authorize a broad benchmark runner, provider comparison, model invocation, public leaderboard, automatic winner selection, or product superiority claim.

## P2-R1 objective

Implement the smallest Kodac-owned contract and fixture spine that can later support reproducible KodacBench runs without changing product/runtime behavior.

The slice must establish:

1. a versioned benchmark manifest contract;
2. a frozen local corpus/fixture identity;
3. a separately identified later-in-time holdout fixture/manifest boundary;
4. deterministic canonical serialization and digest/identity derivation;
5. task-family-separated metric declarations rather than one blended score;
6. provenance and contamination declarations sufficient to distinguish corpus origin, fixture role, and known overlap state;
7. immutable run/report identity fields for later consumers without actually invoking providers/models;
8. validation that fails closed on malformed, ambiguous, non-canonical, duplicate, or identity-inconsistent records.

## Authorized implementation allowlist

After this authorization becomes canonical, exactly one P2-R1 implementation PR may modify only:

```text
packages/kodac-runtime/bench/p2-r1/**
packages/kodac-runtime/test/p2-r1-*.test.ts
packages/kodac-runtime/test/fixtures/p2-r1/**
docs/planning/KODAC_P2_R1_BENCHMARK_CONTRACT_FIXTURE_MANIFEST_EVIDENCE_2026-08-28.md
```

The implementation may create new files under those paths. It may not modify existing K3 benchmark fixtures/harnesses merely for convenience.

No package manifest, lockfile, workflow, runtime product source, adapter, provider, model, reviewer, evaluator, storage, telemetry, release, or ruleset path is in the allowlist.

If a necessary change falls outside this allowlist, stop. A separate authorization is required before that path may be changed.

## Required benchmark contract

The P2-R1 manifest/report contracts must make the following concepts explicit and machine-validatable where applicable:

```text
schema_version
benchmark_id
benchmark_protocol_version
corpus_id
corpus_digest
corpus_role
holdout_id
holdout_digest
task_family
case_id
case_digest
strategy_id
strategy_version
evaluator_id
evaluator_version
model_id
model_version
provider_id
provider_version
execution_environment_id
source_provenance
contamination_status
metric_definitions
result_identity
```

Identity fields for participants that were not invoked in P2-R1 must be represented as explicitly absent/not-applicable according to the contract. P2-R1 must not invent model, provider, evaluator, strategy, or execution evidence that does not exist.

A later report identity must be derivable from canonical evidence-bearing inputs, not wall-clock timestamps, local absolute paths, unordered object iteration, or incidental process state.

Timestamps may be recorded only as non-identity metadata if the implementation includes them at all.

## Frozen corpus and holdout rules

P2-R1 must distinguish at least:

```text
DEVELOPMENT / PRIMARY FROZEN CORPUS
LATER-IN-TIME HOLDOUT
```

The holdout must have a separate identity and must not be silently folded into the development corpus.

The local fixture package must be small, deterministic, synthetic or repository-owned/permitted, and committed directly under the P2-R1 fixture allowlist. No PHI, private user data, secrets, proprietary third-party benchmark dataset, or unapproved donor source may be added.

Each fixture/case must have stable content identity. Duplicate case identities or conflicting case digests must fail closed.

The P2-R1 contract must leave room for later immutable corpus versioning; mutation of a frozen corpus under the same identity is forbidden.

## Task-family metric rules

Metrics must remain separated by task family. The contract may define or validate metric declarations such as:

- correctness / exactness;
- precision / recall where meaningful;
- latency/resource observations where meaningful;
- evidence/provenance completeness;
- security/trust invariant violations;
- reproducibility / identity stability.

P2-R1 must not create a single weighted/blended score that silently converts distinct task families into a system-wide ranking.

```text
TASK-SPECIFIC RESULT != GENERAL WINNER
PER-FAMILY METRIC != PRODUCT SUPERIORITY
LOWER LATENCY != HIGHER CORRECTNESS
MODEL/REVIEWER OPINION != CANONICAL BENCHMARK TRUTH
```

## Provenance and contamination rules

Every benchmark case must preserve enough provenance to determine at least:

- whether it is repository-authored/synthetic/permitted;
- its fixture/corpus role;
- its immutable content identity;
- whether known overlap/contamination exists between development and holdout material;
- whether contamination status is `none-known`, `known`, or `unknown` rather than silently assumed clean.

`unknown` contamination status must not be normalized to `none-known`.

P2-R1 may validate declarations; it does not authorize remote contamination research, model memorization probing, external dataset ingestion, or internet/network access.

## Determinism and canonicalization invariants

For identical canonical inputs:

```text
same schema version
+ same benchmark protocol version
+ same frozen corpus / holdout identities
+ same ordered semantic contents
+ same declared task/strategy/evaluator/model/provider identities
-> same canonical result identity
```

Canonicalization must be deterministic across repeated local runs. Object-key order, absolute workspace paths, timestamps, locale, and other incidental host state must not affect semantic identity.

Malformed or unknown required fields, duplicate identities, digest mismatches, forbidden path forms, conflicting corpus roles, and unsupported schema versions must fail closed.

## Security and privacy invariants

P2-R1 must preserve all existing execution-authority boundaries.

Required values:

```text
UNAUTHORIZED WORKSPACE MUTATIONS BY BENCHMARK LOGIC = 0
NETWORK / PROVIDER / MODEL / REVIEWER / EVALUATOR INVOCATIONS = 0
PERSISTENT DATABASE / TELEMETRY / UPLOAD / ANALYTICS EGRESS = 0
SECRET ACCESS = 0
PATH ESCAPES FROM AUTHORIZED FIXTURE ROOT = 0
NEW DEPENDENCIES = 0
DONOR CODE / DATA INTAKE = 0
```

The tests may create ordinary test-runner temporary values already permitted by existing repository tooling, but P2-R1 benchmark logic itself must not become a new side-effect authority.

K2 remains Kodac's trusted side-effect execution boundary. P2-R1 does not expand it.

## Explicit non-grants

This record does not authorize:

- P2-R2 or later P2 slices;
- provider/model/reviewer/evaluator/tool/agent invocation;
- network access or secret handling;
- external benchmark/dataset download or source intake;
- new npm, Rust, Python, system, action, or other dependencies;
- package/lockfile changes;
- changes to existing K3/K4/K5/K6 runtime semantics;
- route, fallback, retry, reviewer, strategy, or autofix execution;
- persistent database/storage, telemetry, upload, analytics, training, fine-tuning, online learning, or cross-repository learning;
- automatic strategy selection, promotion, trust mutation, or eligibility advancement;
- K2, K5, Done Gate, or `PROVEN_READY` authority expansion;
- GitHub comment/review/approval/merge authority from benchmark results;
- a public leaderboard;
- a blended universal score;
- `best`, `winner`, `superior`, SOTA, production-readiness, security, support, or compatibility claims;
- public release, package publication, public version declaration, or brand launch;
- ruleset mutation or bypass.

## Required P2-R1 tests

The later implementation PR must include focused tests proving at least:

1. canonical serialization is stable under semantically irrelevant object-key ordering;
2. corpus and holdout digests are deterministic;
3. corpus and holdout identities cannot alias or silently overlap under contradictory declarations;
4. duplicate case identities fail closed;
5. case-content digest mismatch fails closed;
6. unsupported schema versions fail closed;
7. unknown required fields or missing required fields fail closed according to the contract;
8. non-canonical/escaping fixture paths fail closed;
9. contamination `unknown` remains distinguishable from `none-known`;
10. task-family metric definitions remain separated and no universal blended score is materialized;
11. absent provider/model/evaluator identities cannot be presented as executed evidence;
12. timestamps/absolute paths do not alter canonical identity;
13. repeated identical inputs produce identical result identities;
14. existing repository tests and required CI remain green.

Tests must use only committed P2-R1 local fixtures or in-memory/safe temporary test values. They must not require internet access.

## P2-R1 evidence record

The implementation PR must create:

`docs/planning/KODAC_P2_R1_BENCHMARK_CONTRACT_FIXTURE_MANIFEST_EVIDENCE_2026-08-28.md`

The evidence record must bind at least:

- exact canonical authorization merge identity;
- implementation base and exact candidate head;
- exact changed-file allowlist realization;
- final blobs for contract/harness/tests/fixture manifests/evidence as applicable;
- focused test commands and exact results;
- required CI run/check identities;
- semantic-review evidence required by live governance;
- active ruleset / no-bypass evidence;
- known limitations and preserved non-grants;
- guarded normal merge conditions;
- post-merge parents/tree/blob/signature/applicable-check proof required before P2-R1 may be called canonical/complete.

Candidate-time evidence must not claim a future merge result as fact.

## Authorization-unit qualification gate

This authorization candidate itself may be merged only if all of the following hold on one exact head:

- live protected `main` has not moved without forward reconciliation;
- changed files are exactly this planning record plus the explicitly intended current-front-door reconciliation documents;
- no runtime source, workflow, dependency, lockfile, fixture, or benchmark implementation changes are present;
- all required exact-head CI/check contexts succeed or are proven non-applicable from canonical workflow conditions;
- required semantic review quorum under live governance is terminal and clean on the exact head;
- unresolved material review threads/findings = 0;
- the PR is open, non-draft, mergeable, and not behind protected `main`;
- the active ruleset remains in force with no silent bypass/waiver;
- merge uses ordinary guarded history-preserving behavior only.

## P2-R1 implementation exit gate

After this authorization is canonical, P2-R1 becomes `CLOSED_CANONICAL` only after its separate implementation PR satisfies all authorized tests/evidence, merges from the exact qualified head, and passes required post-merge proof.

Until then:

```text
P2-R1 = AUTHORIZED / NOT COMPLETE
P2 = OPEN
P2-R2+ = NOT AUTHORIZED
```

A P2-R1 result is benchmark infrastructure evidence, not authorization to proceed to P2-R2. The next slice requires a separate canonical authorization record.

## Founder authorization represented by this candidate

The founder has directed Kodac work to continue through the canonical repository plan without stopping for routine approval. Subject to the deny-by-default boundaries above, that standing direction authorizes this P2-R1 gate candidate to be qualified and merged, and—only after it is canonical—to execute the exact P2-R1 implementation allowlist.

It does not override repository governance, branch protection, required checks/reviews, exact-head evidence, or any explicit non-grant in this record.