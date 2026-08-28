# Product Document Authority Status

The pre-existing files in `docs/product/` are preserved **Kernux-era historical planning inputs**.

They remain in the repository for historical integrity and research context, but they are not current Kodac product authority and do not override accepted Kodac ADRs, current Kodac planning/closeout records, the README current architecture summary, or reconstituted `docs/roadmap/*`.

This status notice does not delete, rewrite, validate, or re-adopt those historical product documents. Future Kodac product-document reconstitution requires a separate founder-reviewed gate.

## Canonical closed milestones

K3, K4, K5, the bounded K6 R1-R5 milestone, and P2-R1 are canonically closed for their exact scopes.

```text
K3 = CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
K3-R7+ = NOT REQUIRED FOR K3 CLOSEOUT / NOT AUTHORIZED

K4 = CLOSED FOR THE CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K4-R6+ = NOT REQUIRED FOR K4 CLOSEOUT / NOT AUTHORIZED

K5 = CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K5-R6+ = NOT REQUIRED FOR K5 CLOSEOUT / NOT AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED

K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = CLOSED_CANONICAL
K6-R5 = CLOSED_CANONICAL
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE
K6-R6+ = NOT REQUIRED FOR THIS BOUNDED CLOSEOUT / NOT AUTHORIZED

P2-R1 = CLOSED_CANONICAL
P2-R2 = AUTHORIZATION CANDIDATE
P2-R3+ = NOT AUTHORIZED
P2 = OPEN
```

Canonical anchors:

- K6 bounded closeout: PR #236 / `ed4fb16e8bbaf960812285671062c9b2abf597a8`
- P2-R1 authorization: PR #237 / `1cd2fc4de1eb5849cbe2519ae1699bc2acc56397`
- P2-R1 implementation: PR #238 / `c499c8ac098cca9719eaad3cacadd2af7d1c0a1f`

P2-R1 evidence layering is explicit:

- historical candidate-time implementation evidence record: `docs/planning/KODAC_P2_R1_BENCHMARK_CONTRACT_FIXTURE_MANIFEST_EVIDENCE_2026-08-28.md`;
- qualified exact head: `f3ab68cc74f391ae460b82a8697c7e319cb4ed3b`;
- qualified tree: `a01997cffe5848dd91ac12a6639134648bbe2f89`;
- merge: PR #238 / `c499c8ac098cca9719eaad3cacadd2af7d1c0a1f`;
- post-merge governance run: `33173090203` / SUCCESS;
- post-merge K2 runtime run: `33173090251` / SUCCESS;
- merge signature: verified / valid;
- canonical six P2-R1 blobs matched the qualified candidate after merge;
- ruleset `20707483` remained active with no bypass.

The committed P2-R1 evidence file intentionally retains candidate-time wording because it was frozen before its own merge and cannot self-record a future merge result. The later immutable GitHub merge/object/check proof above establishes `P2-R1 = CLOSED_CANONICAL`; the historical candidate-time wording is not a current-state claim.

P2-R1 established only the local deterministic contract plus frozen development/holdout fixture and manifest spine. It did not authorize a provider/model/evaluator runner, external benchmark execution, public leaderboard, aggregate winner score, product integration, persistence, telemetry, learning, release, or superiority claim.

## P2-R2 authorization candidate

The next proposed bounded KodacBench slice is:

```text
P2-R2 = LOCAL DETERMINISTIC RUNNER + IMMUTABLE REPORT SPINE
P2-R2 IMPLEMENTATION = AUTHORIZED ONLY AFTER THE EXACT P2-R2 AUTHORIZATION RECORD IS CANONICAL
P2-R3+ = NOT AUTHORIZED
GENERAL KODACBENCH = NOT CLOSED
```

Candidate authority:

- `docs/planning/KODAC_P2_R2_LOCAL_RUNNER_REPORT_AUTHORIZATION_2026-08-28.md`

The proposed R2 implementation consumes validated P2-R1 fixtures/manifests plus caller-materialized in-memory case observations, binds those observations to R1 case/result/metric identities, preserves task-family separation, and emits a deterministic immutable machine-readable report identity.

P2-R2 explicitly does **not** infer aggregation/reducer policy. No average, blended score, cross-task normalization, global ranking, `best`, `winner`, or `superior` semantic may be invented merely because observations are numeric.

The proposed slice is pure/in-memory and denies provider/model/reviewer/evaluator invocation, network/secrets, subprocess/tool/sandbox execution, new dependencies, CLI/product integration, P2-R1 byte changes, persistence/file output, telemetry, training/learning, strategy execution/promotion, Done Gate expansion, ruleset bypass, and release authority.

Candidate text does not itself grant implementation authority. Until the exact five-path authorization unit qualifies, merges normally into protected `main`, and passes required post-merge proof, P2-R2 implementation remains not yet effective.

## Preserved non-grants

```text
KRI-R5+ IMPLEMENTATION = NOT AUTHORIZED
K3-R7+ = NOT AUTHORIZED
K4-R6+ = NOT AUTHORIZED
K5-R6+ = NOT AUTHORIZED
K6-R6+ = NOT AUTHORIZED
P2-R3+ = NOT AUTHORIZED
P3-P8 IMPLEMENTATION = NOT AUTHORIZED

PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT AUTHORIZED
ROUTE / FALLBACK / RETRY / STRATEGY EXECUTION = NOT AUTHORIZED
AUTOMATIC ROUTING ADVANCEMENT / STRATEGY PROMOTION = NOT AUTHORIZED
TRUST-POLICY MUTATION = NOT AUTHORIZED

PERSISTENT STORAGE / DATABASE / BENCHMARK FILE OUTPUT = NOT AUTHORIZED
TELEMETRY / UPLOAD / ANALYTICS EGRESS = NOT AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT AUTHORIZED
CROSS-REPOSITORY AGGREGATION / LEARNING = NOT AUTHORIZED

K2 EXECUTION-AUTHORITY EXPANSION = NOT AUTHORIZED
K5 PROOF-AUTHORITY EXPANSION = NOT AUTHORIZED
DONE GATE MODIFICATION = NOT AUTHORIZED
PROVEN_READY AUTHORITY TRANSFER = NOT AUTHORIZED
AUTOFIX EXECUTION = NOT AUTHORIZED

NEW KODAC DEPENDENCIES = NOT AUTHORIZED
CODE / DONOR / EXTERNAL DATA INTAKE = NOT AUTHORIZED
PUBLIC LEADERBOARD / GENERAL SUPERIORITY CLAIM = NOT AUTHORIZED
RULESET CHANGE / BYPASS = NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / PUBLIC VERSION / BRAND LAUNCH = NOT AUTHORIZED
```

## Next engineering boundary

If and only if the exact P2-R2 authorization candidate becomes canonical and its post-merge proof succeeds, the next eligible repository unit is the one bounded P2-R2 implementation PR described by that authorization.

Engineering milestone closure and benchmark infrastructure remain separate from public release, packaging, production-readiness, support, compatibility, and superiority claims.
