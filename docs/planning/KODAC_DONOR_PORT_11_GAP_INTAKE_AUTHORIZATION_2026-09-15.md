# Kodac Donor PORT 11-Gap Intake Authorization — 2026-09-15

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / DONOR-INTAKE AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
RESEQUENCING_AUTHORITY = CLOSED_CANONICAL / PR #637 / merge 51f634b5226ca67b8229dc2f8c27209ec7506db1
CANONICAL_BASE = 47e74f6db8698470698100b43b05cc5f019b7303
POST_PROOF_CYCLE_RECONCILIATION = CLOSED_CANONICAL / PR #645 / merge 47e74f6db8698470698100b43b05cc5f019b7303 / push run 34934944706 SUCCESS
CURRENT_REAUDIT = PROVEN 11 / PARTIAL 12 / MISSING 0 / NOT_APPLICABLE 2 / TOTAL 25
TARGET_ROW = EXACT_DONOR_MAPPING_FOR_COPIED_OR_DERIVED_CODE / PARTIAL_CANONICAL / 11_PINNED_PORT_GAPS
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This is a one-path authorization candidate only. It grants no ledger, notice, or test mutation until it independently qualifies, receives substantive exact-head review, merges through protected `main` with an expected-head guard, and receives external post-merge proof.

## Exact authorization-candidate scope

This authorization candidate may modify exactly one repository path:

```text
docs/planning/KODAC_DONOR_PORT_11_GAP_INTAKE_AUTHORIZATION_2026-09-15.md
```

No second path may change in this authorization candidate.

## Governance reason

Root `AGENTS.md` requires explicit authority for each implementation unit, and the post-proof-cycle re-audit (PR #645) leaves `EXACT_DONOR_MAPPING_FOR_COPIED_OR_DERIVED_CODE` PARTIAL with exactly 11 pinned unmapped PORT files requiring later donor-intake authorization. The attestation test (`packages/kodac-runtime/test/exact-donor-mapping-attestation.test.ts`, PR #643) fail-closes unless every PORT-declaring file is either ledger-covered or an explicitly pinned gap, and each of the 11 files already carries a structured in-source `DONOR_PROVENANCE` declaration (repository, source commit/tree, license, intakeMode, donor source paths). Intake therefore mirrors declared in-source evidence into provenance ledger records; it invents no new donor relationship. Under the founder-authorized re-sequencing (PR #637) this intake has no technical, governance, or external dependency on the deferred O4 founder-secret live proof. Therefore the minimum governance-valid next unit is this intake authorization.

## The 11 in-scope PORT files

```text
packages/kodac-runtime/src/agent/tool-result-pruning.ts (PORT / HKUDS/DeepCode)
packages/kodac-runtime/src/agent/repeat-call-signal.ts (PORT / HKUDS/DeepCode)
packages/kodac-runtime/src/agent/guarded-tool-pipeline.ts (PORT_SELECTED_CONTRACT_IDEAS / HKUDS/DeepCode)
packages/kodac-runtime/src/specification/contracts.ts (PORT)
packages/kodac-runtime/src/extensions/contracts.ts (PORT)
packages/kodac-runtime/src/model/capabilities.ts (PORT)
packages/kodac-runtime/src/semantic/contracts.ts (PORT / JetBrains/intellij-community)
packages/kodac-runtime/src/context-connectors/contracts.ts (PORT)
packages/kodac-runtime/src/context-connectors/indexer-state-machine.ts (PORT)
packages/kodac-runtime/src/session/model-visible-request.ts (PORT)
packages/kodac-runtime/src/session/model-visible-history.ts (PORT)
```

No twelfth file is in scope. Files declaring `STUDY_ONLY` or `STUDY_REIMPLEMENT` are not PORT files and are excluded.

## Conditional future implementation authority

Only after this authorization becomes externally proven `CLOSED_CANONICAL` may one later implementation candidate modify exactly the following paths and no others:

```text
provenance/imports/donor-port-h5-r1a-tool-result-pruning-v1.yaml (NEW)
provenance/imports/donor-port-h5-r2a-repeat-call-signal-v1.yaml (NEW)
provenance/imports/donor-port-h5-r3a-guarded-tool-pipeline-v1.yaml (NEW)
provenance/imports/donor-port-s1-specification-contracts-v1.yaml (NEW)
provenance/imports/donor-port-h1-extensions-contracts-v1.yaml (NEW)
provenance/imports/donor-port-c6-model-capabilities-v1.yaml (NEW)
provenance/imports/donor-port-c1-semantic-contracts-v1.yaml (NEW)
provenance/imports/donor-port-c11-context-connectors-contracts-v1.yaml (NEW)
provenance/imports/donor-port-c12-indexer-state-machine-v1.yaml (NEW)
provenance/imports/donor-port-h2-r1-model-visible-request-v1.yaml (NEW)
provenance/imports/donor-port-h2-r2-model-visible-history-v1.yaml (NEW)
packages/kodac-runtime/THIRD_PARTY_NOTICES.md (ONLY_IF a new notice-required upstream appears)
packages/kodac-runtime/test/exact-donor-mapping-attestation.test.ts (PIN_SHRINK_ONLY, see rules)
```

No fourteenth path is authorized. In particular, no `src/` product file may change: intake mirrors declarations, it does not edit them.

## Binding implementation rules

The later candidate must satisfy every rule below; violation fail-closes that candidate:

```text
ONE_RECORD_PER_PORT_FILE = REQUIRED / record destination_paths MUST equal the PORT file
RECORD_MIRRORS_IN_SOURCE_DECLARATION = REQUIRED / repository, commit, tree, sources, license, intakeMode copied from the file's DONOR_PROVENANCE block, never invented
NO_NEW_UPSTREAM_BEYOND_DECLARED_DONORS = REQUIRED
NO_LIVE_DONOR_NETWORK_RETRIEVAL = REQUIRED / ledger evidence cites in-source declarations and existing repository notices only
NO_SOURCE_PRODUCT_MUTATION = REQUIRED
PIN_SHRINK_RULE = KNOWN_UNMAPPED_PORTS may drop exactly the files covered by new records in the same candidate, and no others
ATTESTATION_MUST_PASS = YES / unmapped set MUST equal the remaining pin set exactly
PROVENANCE_VALIDATOR_MUST_PASS = YES / tools/validate_provenance.py
NOTICES_RULE = THIRD_PARTY_NOTICES.md changes if and only if a new record sets notice_required true, and then MUST contain the upstream anchor
PARTIAL_INTAKE_ALLOWED = YES / fewer than 11 records permitted, pins shrink accordingly, row stays PARTIAL
ROW_UPGRADE = NOT_GRANTED_BY_THIS_AUTHORIZATION / a later re-audit decides PROVEN only if every copied/derived byte is covered
```

## Explicit non-grants

```text
SOURCE_RUNTIME_TEST_SCHEMA_MUTATION = NOT_AUTHORIZED_BY_THIS_UNIT (except the single PIN_SHRINK test edit above)
WORKFLOW_DEPENDENCY_LOCKFILE_MUTATION = NOT_AUTHORIZED
NEW_DONOR_BEYOND_THE_11_FILES = NOT_AUTHORIZED
LIVE_NETWORK_RETRIEVAL = NOT_AUTHORIZED
PROVIDER_OR_MODEL_ADMISSION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
PERSISTENCE_DATABASE_QUEUE_SCHEDULER = NOT_AUTHORIZED
TELEMETRY = NOT_AUTHORIZED
O4_LIVE_PROOF_EXECUTION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
LIVE_GITHUB_PUBLICATION_POST = NOT_AUTHORIZED
NEW_POST_BUDGET = 0
PUBLIC_RELEASE = NOT_AUTHORIZED
PACKAGE_PUBLICATION = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
CRITERION_ROW_UPGRADE = NOT_AUTHORIZED
PHASE_OVERALL_STATUS_MUTATION = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
REBASE = NOT_AUTHORIZED
FORCE_PUSH = NOT_AUTHORIZED
HISTORY_REWRITE = NOT_AUTHORIZED
WAIVER = NO
```

## Authorization-candidate qualification

This docs-only candidate must independently prove:

```text
EXACT_CHANGED_PATHS = 1
CANONICAL_BASE = 47e74f6db8698470698100b43b05cc5f019b7303
PREDECESSOR_PR_645_MERGE = 47e74f6db8698470698100b43b05cc5f019b7303 / MERGED
NO_SOURCE_TEST_SCHEMA_WORKFLOW_DEPENDENCY_MUTATION = YES
ROOT_GOVERNANCE_CHECKS = PASS
SUBSTANTIVE_EXACT_HEAD_REVIEW = CLEAN
UNRESOLVED_MATERIAL_THREADS = 0
ACTIVE_RULESET = VERIFIED
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = NEVER
EXPECTED_HEAD_NORMAL_MERGE = REQUIRED
POST_MERGE_PROOF = REQUIRED
EXTERNAL_CLOSED_CANONICAL_PROOF = REQUIRED
```

While this authorization remains a candidate, donor PORT intake implementation remains NOT_AUTHORIZED.

(End of file)
