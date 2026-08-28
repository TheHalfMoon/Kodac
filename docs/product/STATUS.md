# Product Document Authority Status

The pre-existing files in `docs/product/` are preserved **Kernux-era historical planning inputs**.

They remain in the repository for historical integrity and research context, but they are not current Kodac product authority and do not override:

- accepted Kodac ADRs;
- current Kodac planning and closeout records;
- the README current architecture summary;
- reconstituted `docs/roadmap/*`.

This status notice does not delete, rewrite, validate, or re-adopt those historical product documents. Future Kodac product-document reconstitution requires a separate founder-reviewed gate.

## Canonical closed milestones

K3, K4, and K5 are already canonically closed for their exact bounded scopes. Historical candidate-time `IFF THIS CLOSEOUT MERGE GATE PASSES` language inside immutable historical closeout records remains historical evidence; it is not current state.

```text
K3 = CLOSED FOR THE CANONICAL K3-R1 THROUGH K3-R6 BOUNDED SCOPE
K3-R7+ = NOT REQUIRED FOR K3 CLOSEOUT / NOT AUTHORIZED

K4 = CLOSED FOR THE CANONICAL K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE
K4-R6+ = NOT REQUIRED FOR K4 CLOSEOUT / NOT AUTHORIZED

K5 = CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
K5-R6+ = NOT REQUIRED FOR K5 CLOSEOUT / NOT AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
```

Canonical bounded closeout evidence remains:

- `docs/planning/KODAC_K3_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-24.md`
- `docs/planning/KODAC_K4_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-25.md`
- `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md`

The K5 R5 post-merge record remains truthful: one first-attempt Ubuntu H4-R3G-B failure occurred on unchanged pre-existing code, followed by exactly one controlled same-SHA/no-drift rerun that passed. That anomaly is not rewritten as an all-green first attempt.

## K6 closeout-candidate rule

K6-R1 through K6-R5 are already separately `CLOSED_CANONICAL`. K6 bounded-closeout authorization is canonical at merge `748706683a0102f1743c1797950272bbd41d8a3c` (PR #235).

This closeout candidate may introduce `K6 = CLOSED` wording only as conditional candidate state. Until its exact-head qualification, guarded normal merge, ordered-parent/tree/blob/signature proof, applicable post-merge checks, and ruleset/no-bypass proof all pass, K6 itself is **not yet closed by this candidate**.

```text
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = CLOSED_CANONICAL
K6-R5 = CLOSED_CANONICAL
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE IFF THIS CLOSEOUT MERGE GATE PASSES
K6-R6+ = NOT REQUIRED FOR THIS BOUNDED CLOSEOUT / NOT AUTHORIZED
P2 KODACBENCH IMPLEMENTATION = NOT AUTHORIZED BY K6 CLOSEOUT
K2 / K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
WAIVER = NO
```

The exact candidate evidence, implementation ledger, repair history, exit matrix, non-grants, and merge/post-merge conditions are in:

- `docs/planning/KODAC_K6_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-28.md`
- `docs/planning/KODAC_K6_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`

## Bounded K6 meaning

The accepted R1-R5 path is data/evidence only:

```text
caller-materialized candidate evidence
-> deterministic R1 eligibility values
-> caller-explicit deterministic R2 route-plan values
-> caller-materialized deterministic R3 route/outcome linkage
-> privacy-governed caller-managed in-process R4 outcome-memory values
-> caller-materialized comparable R5 strategy evidence and deterministic comparison
```

Mandatory distinctions remain:

```text
ELIGIBILITY EVIDENCE != EXECUTION AUTHORITY
ELIGIBLE != SELECTED
ROUTE PLAN != ROUTE EXECUTION
OUTCOME LINKAGE != DONE GATE EVALUATION
OUTCOME MEMORY != DURABLE PERSISTENCE AUTHORITY
STRATEGY PROPOSAL != STRATEGY EXECUTION
STRATEGY COMPARISON != PROMOTION
CANDIDATE_DOMINATES != PROVEN_READY
R5 BOUNDED QUALIFICATION CORPUS != GENERAL KODACBENCH
SELF-IMPROVING != SELF-AUTHORIZING
```

K6 repair history remains part of canonical evidence rather than being normalized away. It includes R1 canonicalization hardening, R3 qualification fixes, R4 trusted-machine/registration/protected-base/provider-neutral/resource-budget repairs, and R5 comparability/ruleset-observability/split-proof/hostile-input/import-closure repairs. PR #223 and PRs #229-#231 remain closed-unmerged non-authority history.

## Preserved non-grants

This documentation closeout does not grant or modify any of the following:

```text
KRI-R5+ IMPLEMENTATION = NOT AUTHORIZED
K3-R7+ = NOT AUTHORIZED
K4-R6+ = NOT AUTHORIZED
K5-R6+ = NOT AUTHORIZED
K6-R6+ = NOT AUTHORIZED
P2 KODACBENCH IMPLEMENTATION = NOT AUTHORIZED BY THIS CLOSEOUT
P3-P8 IMPLEMENTATION = NOT AUTHORIZED

PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT AUTHORIZED
ROUTE / FALLBACK / RETRY / STRATEGY EXECUTION = NOT AUTHORIZED
AUTOMATIC ROUTING ADVANCEMENT = NOT AUTHORIZED
AUTOMATIC STRATEGY PROMOTION = NOT AUTHORIZED
TRUST-POLICY MUTATION FROM K6 = NOT AUTHORIZED

PERSISTENT REVIEW / PROOF / ROUTE / OUTCOME STORAGE = NOT AUTHORIZED
FILESYSTEM / DATABASE PERSISTENCE FROM K6 = NOT AUTHORIZED
TELEMETRY / UPLOAD / ANALYTICS EGRESS = NOT AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT AUTHORIZED
CROSS-REPOSITORY AGGREGATION / LEARNING = NOT AUTHORIZED
VECTOR / EMBEDDING INFRASTRUCTURE = NOT AUTHORIZED BY THIS CLOSEOUT

K2 EXECUTION-AUTHORITY EXPANSION = NOT AUTHORIZED
K5 PROOF-AUTHORITY EXPANSION = NOT AUTHORIZED
DONE GATE MODIFICATION = NOT AUTHORIZED
PROVEN_READY AUTHORITY FROM KRI / K5 / K6 = NOT AUTHORIZED

REPOSITORY WRITE AUTHORITY FROM KRI / K5 / K6 = NOT AUTHORIZED
GITHUB COMMENT / REVIEW / APPROVAL / MERGE AUTHORITY FROM KRI / K5 / K6 = NOT AUTHORIZED
AUTOFIX EXECUTION = NOT AUTHORIZED
RULESET CHANGE / BYPASS = NOT AUTHORIZED

NEW KODAC DEPENDENCIES = NOT AUTHORIZED BY THIS CLOSEOUT
CODE / DONOR IMPORT = NOT AUTHORIZED BY THIS CLOSEOUT
CONCRETE EXTERNAL REVIEWER / PROVIDER / MODEL ADAPTER = NOT AUTHORIZED
PROVIDER NETWORK / SECRET HANDLING = NOT AUTHORIZED

PUBLIC RELEASE = NOT AUTHORIZED
PACKAGE PUBLICATION = NOT AUTHORIZED
PUBLIC VERSION DECLARATION = NOT AUTHORIZED
SUPPORT / COMPATIBILITY PROMISE = NOT AUTHORIZED
BRAND LAUNCH = NOT AUTHORIZED
KODAC NAME / TRADEMARK CLEARANCE = NOT ESTABLISHED

Z0 / Z0L / ZROK EXECUTION = NOT AUTHORIZED BY K6 CLOSEOUT
PAYMENT / PUBLIC ENDPOINT / GITHUB APP / WEBHOOK / SECRET MUTATION = NOT AUTHORIZED
```

This documentation gate does not modify `code_import_authorized` and admits no external source.

## Next engineering boundary

After and only after this K6 closeout candidate becomes canonical and its required post-merge proof succeeds:

```text
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED SCOPE
P2 KODACBENCH AUTHORIZATION-CANDIDATE PREPARATION = NEXT ELIGIBLE DOCUMENTATION / PLANNING UNIT
P2 KODACBENCH IMPLEMENTATION = NOT AUTHORIZED UNTIL SEPARATELY AUTHORIZED AND CANONICAL
P3-P8 IMPLEMENTATION = NOT AUTHORIZED
```

Engineering milestone closure remains separate from public release, packaging, support, production-readiness, and brand claims.