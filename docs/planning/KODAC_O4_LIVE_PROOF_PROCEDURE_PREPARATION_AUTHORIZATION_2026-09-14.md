# Kodac O4 Live-Proof Procedure Preparation Authorization — 2026-09-14

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / LIVE-PROOF PROCEDURE PREPARATION AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
RESEQUENCING_AUTHORITY = CLOSED_CANONICAL / PR #637 / merge 51f634b5226ca67b8229dc2f8c27209ec7506db1
CANONICAL_BASE = 0ba91ded877a2d62ced96e7093c5a66ab32b450c
TARGET_CRITERION = PROVIDER_NEUTRAL_READ_ONLY_REVIEW / PARTIAL_CANONICAL
O4_LIVE_PROOF = DEFERRED_EXTERNAL_EDGE / NOT_EXECUTED_BY_THIS_UNIT
CURRENT_AUDIT = PROVEN 10 / PARTIAL 13 / MISSING 0 / NOT_APPLICABLE 2 / TOTAL 25
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This candidate authorizes only a later bounded docs-only procedure record that prepares everything executable without the founder credential for a future O4 credential-generality live proof. It performs no live GitHub POST, reads no secret, and grants no execution authority: the irreducible secret-bearing run still requires a separate authorization with an explicit POST budget and a founder-local procedure.

## Exact authorization-candidate scope

This authorization candidate may modify exactly one repository path:

```text
docs/planning/KODAC_O4_LIVE_PROOF_PROCEDURE_PREPARATION_AUTHORIZATION_2026-09-14.md
```

No second path may change in this authorization candidate.

## Live grounding (read-only observations at CANONICAL_BASE)

```text
O4J_ATTEMPT = BLOCKED_BEFORE_PROCESS_START / ZERO_LIVE_WRITES / PR #621
O4K_PROOF = BLOCKED_AFTER_ONE_POST / ADVERSE / EXACT_CAUSAL_MECHANISM_NOT_PROVEN / PR #622
O4L_EXECUTION = SUCCESSFULLY_OBSERVED / review 5189105929 COMMENTED at exact PR 163 head / PR #623
O4M_RECEIPT = CLOSED_CANONICAL_BOUNDED / exact PR 163 head / marker count 1 / stray absent / PR #625
O4N_ROOT_CAUSE = TIME_DERIVED_O4B_TIMESTAMPS_INTO_O4F_SLOT_IDENTITY / PR #630
O4O_FIX = DETERMINISTIC_SLOT_AND_RECEIPT_IDENTITIES / synthetic-transport proof only / PR #632
CREDENTIAL_GENERALITY = NOT_PROVEN (existing gh-session path only)
OPEN_PRS = #163 only (historical docs PR; live-proof target to be bound at run time, not here)
```

## Later implementation authority created only after canonical closure

After this exact authorization becomes CLOSED_CANONICAL, one later bounded docs-only unit is authorized to create only this path:

```text
docs/evidence/O4_LIVE_PROOF_PROCEDURE.md
```

No source, schema, workflow, dependency, lockfile, package metadata, provider contract, persistence, telemetry, release, or deployment path is authorized by this unit.

## Required procedure content

The later record must define, at minimum:

```text
TARGET_SELECTION_RULE (which PR/head qualifies; PR 163 head bound at run time, never pre-bound here)
EXACT_HEAD_BINDING_RULE (refuse on head movement before and after POST)
POST_BUDGET = maximum 1 publication POST + read-only read-back (no second POST, no edit, no delete)
EXPECTED_IDENTITIES (time-only rerun must reproduce publicationSlotIdentity, slotReceiptIdentity, reviewReceiptIdentity per O4-O fix)
ADVERSE_RESULT_HANDLING (marker/body/head mismatch => fail closed, zero further writes, preserve all evidence)
EVIDENCE_CAPTURE (review id/node id/state/commit, comment ids/paths/lines/sides, marker count, stray-review check)
VERIFICATION_COMMANDS (read-only gh api calls only; exact commands listed)
POST_RUN_CANONICALIZATION (O4M-style receipt record shape; secret bytes never recorded)
FOUNDER_LOCAL_HANDOFF (exact minimal secret-bearing step isolated for separate authorization)
```

The record must state that synthetic/fixture qualification of the O4-O identities does not imply live proof, and that credential-generality remains NOT_PROVEN until the separately authorized run.

## Mandatory checks for the later record

```text
PROCEDURE_CONTRADICTS_NO_CANONICAL_RECORD = YES (verified by review)
POST_BUDGET_EXCEEDED_NOWHERE = YES (budget is a bound, not an execution)
SECRET_BYTES_ABSENT = YES
COMMANDS_READ_ONLY = YES (every listed command audited)
ROOT_GOVERNANCE_CHECKS = PASS
```

## Qualification requirements for the later implementation

```text
EXACT_CHANGED_PATHS = the one authorized evidence path only
CRITERION_UPGRADE = NOT_GRANTED_BY_THIS_UNIT
SUBSTANTIVE_EXACT_HEAD_REVIEW = CLEAN
REQUIRED_GITHUB_CHECKS = PASS
UNRESOLVED_MATERIAL_THREADS = 0
ACTIVE_RULESET = VERIFIED
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = NEVER
EXPECTED_HEAD_NORMAL_MERGE = REQUIRED
POST_MERGE_PROOF = REQUIRED
EXTERNAL_CLOSED_CANONICAL_PROOF = REQUIRED
```

## Explicit non-grants

```text
LIVE_GITHUB_PUBLICATION_POST = NOT_AUTHORIZED
NEW_POST_BUDGET = 0
SECRET_ACCESS = NOT_AUTHORIZED
SECRET_CREDENTIAL_ACCESS = NOT_AUTHORIZED
LIVE_PROOF_EXECUTION = NOT_AUTHORIZED
CREDENTIAL_GENERALITY_CLAIM = NOT_ESTABLISHED
SOURCE_SCHEMA_WORKFLOW_DEPENDENCY_MUTATION = NOT_AUTHORIZED
PROVIDER_OR_MODEL_ADMISSION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
PERSISTENCE_DATABASE_QUEUE_SCHEDULER = NOT_AUTHORIZED
TELEMETRY = NOT_AUTHORIZED
K2_AUTHORITY_CHANGE = NOT_AUTHORIZED
CRITERION_ROW_CLOSURE = NOT_AUTHORIZED (requires later reconciliation)
PUBLIC_RELEASE = NOT_AUTHORIZED
PACKAGE_PUBLICATION = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
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
CANONICAL_BASE = 0ba91ded877a2d62ced96e7093c5a66ab32b450c
PREDECESSOR_PR_639_MERGE = 0ba91ded877a2d62ced96e7093c5a66ab32b450c / MERGED
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

While this authorization remains a candidate, the procedure record remains NOT_AUTHORIZED.

(End of file)
