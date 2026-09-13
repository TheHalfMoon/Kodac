# Kodac O4-N Adverse-Outcome Evidence Canonicalization Authorization — 2026-09-13

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / BOUNDED ADVERSE-OUTCOME EVIDENCE CANONICALIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
CANONICAL_BASE = 6d69674ccd7ff88234765ccd753d4482391fce04
O4N_AUTHORIZATION = PR #628 / merge 62d53e6e2848f8bbd7379e8fef82299c411a5c34 / CLOSED_CANONICAL
O4N_PROCEDURE_REPAIR = PR #629 / merge 6d69674ccd7ff88234765ccd753d4482391fce04 / CLOSED_CANONICAL
O4N_LIVE_EXECUTION = EXECUTED_FOUNDER_LOCAL / ADVERSE / SECOND_POST_CREATED
O4N_POST_BUDGET_BEFORE = 1 NEW PUBLICATION POST / ZERO CONSUMED
O4N_POSTS_OBSERVED = 2 DISTINCT COMMENTED REVIEWS FOR 2 DISTINCT SLOTS
ANALYSIS_ONLY_RECORD = PR #629 / comment 5651700845
CURRENT_AUDIT = PROVEN 10 / PARTIAL 13 / MISSING 0 / NOT_APPLICABLE 2 / TOTAL 25
CURRENT_MINIMUM_BLOCKER = O4_PRODUCTION_COMPLETENESS_WITH_CREDENTIAL_GENERALITY (IDEMPOTENCY NOT PROVEN)
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This candidate canonicalizes the adverse live outcome only. It authorizes no live
write while open, no source/test/schema mutation, no retry, no cleanup mutation,
and no new POST budget. Every live operation described below already happened
under the prior single-POST authority and is preserved here as history; the
second POST was not separately authorized and must be recorded as an adverse
over-post, not as compliant evidence. A later separate source-fix authorization
must repair the deterministic-idempotency defect before any further live proof.

## Exact candidate scope

This candidate may modify exactly:

```text
docs/planning/KODAC_O4N_ADVERSE_OUTCOME_EVIDENCE_AUTHORIZATION_2026-09-13.md
```

No second repository path may change.

## Governance reason

Root `AGENTS.md` requires `LIVE GITHUB TRUTH -> AGENTS.md -> NEXT.md -> EXACT ACTIVE
AUTHORIZATION` before any bounded unit. Live truth at `CANONICAL_BASE` establishes:

```text
O4N_AUTHORIZATION = CLOSED_CANONICAL
O4N_PROCEDURE_REPAIR = CLOSED_CANONICAL
SECRET_RUN_INVOCATION_USED = runO4iBoundedProductionPublication(input) / single argument / production global fetch
O4N_LIVE_EXECUTION = 2 secret-bearing runs executed founder-local / both returned COMPLETED_PUBLISHED
IDEMPOTENT_RECOVERY = NOT_PROVEN / FAILED_FOR_THIS_ATTEMPT
PRIOR_O4L_RECEIPT = PRESERVED (review 5189105929 COMMENTED at e5b9ea66ca47b6956f8928055ea10f2cbe3447b1)
NEW_REVIEWS = 5189850526 + 5189850685 / both COMMENTED at e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
ANALYSIS_ONLY_COMMENT_5651700845 = PRESENT on PR #629
SUCCESSOR_SOURCE_FIX = NOT_AUTHORIZED
NEXT_LIVE_PROOF = NOT_AUTHORIZED / NEW POST BUDGET REQUIRED
MINIMUM_BLOCKER = O4_PRODUCTION_COMPLETENESS_WITH_CREDENTIAL_GENERALITY
PROJECT_COMPLETION = NOT_ESTABLISHED
```

The repaired procedure's required successful behavior (run 2
`COMPLETED_ALREADY_PRESENT` with zero additional POSTs and identical receipt)
did not occur. The minimum governance-valid next unit is therefore this bounded
adverse-evidence canonicalization, not execution, not reconciliation, not
implementation, not persistence, not provider/model admission, and not release.

## Preserved adverse evidence (exact, non-secret only)

Founder-local non-secret evidence (`/tmp/kodac-o4n-evidence-repaired.json`,
repaired procedure, single-argument canonical production global fetch):

```text
TARGET_REPOSITORY = TheHalfMoon/Kodac / 1297407563
TARGET_PR = 163 / 4340591287
TARGET_HEAD = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
TARGET_EVENT = COMMENT
TASK = o4n-caller-injected-credential-generality-pr-163
POLICY = kodac-o4n-caller-injected-credential-generality-v1
PROVIDER = kodac-o4n-caller-injected-credential-proof-provider-v1 / {"claims":[]} / NETWORK NONE
MODEL = kodac-o4n-caller-injected-credential-proof-deterministic-v1
CREDENTIAL_POLICY = 397d2c78ff08322d7d27bf3afc1940af1075360916405244e5926df37a64f30d
CREDENTIAL_VALUE = NEVER RECORDED (founder-local opaque)
RUN1_STATUS = COMPLETED_PUBLISHED
RUN1_REVIEW_ID = 5189850526
RUN1_NODE_ID = PRR_kwDOTVTeS88AAAABNVbVng
RUN1_RECEIPT = afe74a4fba857dcd0efa3c46bcdc49efdbbded0d4e180ef96bd36f3cb7c3ee48
RUN1_SLOT = a144b98bc9b0824647c3e9d285cfc59b383df0f54732f11f36e74daad502f9f5
RUN1_REQUEST = 4b3a11ec9efac76e45af8ee3ffbb2ee92f63178a49f55c4df96a58b868924e74
RUN1_BODY = dbdadb7592a06ce2390ccd404702ace1b0c0e9a9dd4cef6d1afad5289435b409
RUN2_STATUS = COMPLETED_PUBLISHED / UNEXPECTED (EXPECTED COMPLETED_ALREADY_PRESENT)
RUN2_REVIEW_ID = 5189850685
RUN2_NODE_ID = PRR_kwDOTVTeS88AAAABNVbWPQ
RUN2_RECEIPT = d79bbef7a24cb4f6006858505007269e2b1012c59b126f9b1763de64a3ecf7ec
RUN2_SLOT = e31b3bd8177c1fa14bb283ffa5d440ffd7e0c43f58ce1b0f6db2a2cbde6d9364
RUN2_REQUEST = fc85afaeec115f03b1336c8d4ad5b2d9c34e1a9d7d3cf1df8cf3a3f0b1ff97cd
RUN2_BODY = 8ef65e6a9766695d6bd7c7956640c29919666ce3ffcc7b7af5ef4cf858560a28
RECEIPT_MATCH_FIRST_SECOND = false
WIRING_EXECUTION_RUN1 = 4b6e0d20505692320cddda5959cd4c22a4f99391a20ed7af47e96ea06a3b781a
WIRING_EXECUTION_RUN2 = 3d2bfdd8bfb34701c19447b8dc5262a58dce55d41bec36846b3097cfe4d94fcd
SECRET_HYGIENE = TOKEN_PRINTED false / TOKEN_LOGGED false / TOKEN_HASHED false / TOKEN_SERIALIZED false / HEADER_VALUE_RECORDED false
```

Independent read-only GitHub verification (agent-executable, GETs only):

```text
REVIEW_5189850526_STATE = COMMENTED
REVIEW_5189850526_COMMIT = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
REVIEW_5189850526_MARKER = <!-- kodac-publication-slot:a144b98bc9b0824647c3e9d285cfc59b383df0f54732f11f36e74daad502f9f5 -->
REVIEW_5189850526_SUBMITTED = 2026-09-13T06:31:13Z
REVIEW_5189850685_STATE = COMMENTED
REVIEW_5189850685_COMMIT = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
REVIEW_5189850685_MARKER = <!-- kodac-publication-slot:e31b3bd8177c1fa14bb283ffa5d440ffd7e0c43f58ce1b0f6db2a2cbde6d9364 -->
REVIEW_5189850685_SUBMITTED = 2026-09-13T06:31:20Z
PRIOR_O4L_5189105929 = COMMENTED at e5b9ea66ca47b6956f8928055ea10f2cbe3447b1 / marker c3070a2d678cc1d1519ca487859854157a06a39a7a1eab4c2fcb0d63702c116b preserved
PR163_MARKER_COUNT = 3 distinct kodac-publication-slot markers (O4-L + 2 O4-N)
```

Material adverse facts established (directly observed, not inferred):

```text
SECOND_RUN_CREATED_SECOND_DISTINCT_COMMENTED_REVIEW = TRUE
IDEMPOTENT_ALREADY_PRESENT_RECOVERY = NOT_PROVEN / FAILED_FOR_THIS_LIVE_ATTEMPT
RUN2_SLOT_DISTINCT_FROM_RUN1_SLOT = TRUE (a144... != e31b...)
RUN2_RECEIPT_DISTINCT_FROM_RUN1_RECEIPT = TRUE
O4N_POST_BUDGET_EXCEEDED_BY_OBSERVATION = 2 posts observed vs 1 authorized (second POST adverse, preserved, not retro-authorized)
```

Repaired evidence semantics preserved:

```text
DROPPED_AS_UNOBSERVABLE = POST_REQUEST_UTF8_BYTES / POST_REQUEST_SHA256 / ACTUAL_HTTP_STATUS / RESPONSE_CONTENT_TYPE / RESPONSE_UTF8_BYTES / RESPONSE_BODY_SHA256 / RUN_1_BROKER_GET_COUNT / RUN_1_BROKER_POST_COUNT / RUN_2_BROKER_GET_COUNT / RUN_2_BROKER_POST_COUNT
INFERRED_NOT_OBSERVED = GLOBAL_POST_COUNT / SECOND_RUN_ADDITIONAL_POST (superseded for this attempt by direct live-review proof of 2 distinct reviews)
CREDENTIAL_TRANSPORT_ACCEPTANCE = Run 1 COMPLETED_PUBLISHED through production global fetch with founder-held credential is preserved as bounded transport-acceptance evidence; it does NOT prove idempotency
```

## Proven root cause (source-level identity chain, verified at CANONICAL_BASE)

All paths below are `packages/kodac-runtime/src/github-review/` at `6d69674`.

1. O4-B defaults `now` to wall-clock time when no override is supplied
(`o4b-bounded-read-only-github-context.ts:452`):
`now: () => new Date().toISOString()`. The repaired single-argument form
therefore takes two distinct timestamps per proof (snapshot + terminal).

2. O4-B stamps and hashes both timestamps
(`o4b-bounded-read-only-github-context.ts:893,918,881`):
`snapshotObservedAt = canonicalTimestamp(options.now(), ...)` and
`terminalObservedAt = canonicalTimestamp(options.now(), ...)` are stored in the
evidence base and digested into
`readContextEvidenceIdentity = digest("read-context-evidence-identity", ...)`.
Identical logical inputs at different times therefore yield different
`readContextEvidenceIdentity`.

3. O4-C folds the O4-B identity into its own
(`o4c-github-context-to-reviewer-context.ts:337,385`):
`contextIdentityPreimage` includes `readContextEvidenceIdentity`, and
`contextIdentity = digest("github-reviewer-context-identity", preimage)`.
Different O4-B identities therefore yield different `contextIdentity`.

4. O4-D folds O4-C identity into admission
(`o4d-o4c-reviewer-execution-admission.ts:229,236`):
`resultFrom` stores `contextIdentity: context.contextIdentity`, and
`admissionIdentity = digest("o4d-reviewer-execution-admission-identity", result)`.
Different O4-C identities therefore yield different `admissionIdentity`.

5. O4-E folds admission into execution identity
(`o4e-model-backed-reviewer-provider-execution.ts:228,249-265`):
`base.admissionIdentity = input.admission.admissionIdentity`, and
`executionIdentity = digest("o4e-model-backed-reviewer-provider-execution-identity", base)`.
Different O4-D identities therefore yield different `o4eExecutionIdentity`.
Observed: run 1 and run 2 produced different execution chains ending in
different wiring/publication identities.

6. O4-F folds execution identity into the logical publication slot
(`o4f-safe-github-publication-admission.ts:217-220,253,263,341`):
`slotIdentity({ publicationClass, repositoryId, pullRequestNumber, reviewedHead,
o4eExecutionIdentity, claimIdentity, path, lineAnchor })` returns
`digest("o4f-publication-slot-identity", input)`, and `makeRequest` passes
`o4eExecutionIdentity: input.e.executionIdentity` / `e.executionIdentity`.
Different O4-E identities therefore yield different `publicationSlotIdentity`
even when `repositoryId`, `pullRequestNumber`, `reviewedHead`, class, claim,
path, and line are identical. Observed: `a144...` vs `e31b...`.

7. O4-G/O4-H/O4-I pass the slot through without re-stabilizing it: O4-G marks
the body with the O4-F slot marker and recovers only on exact marker match;
O4-H/O4-I mirror `reviewId`/`reviewNodeId`/`reviewReceiptIdentity`. A changed
slot therefore misses already-present recovery and publishes again.

Root cause recorded:

```text
ROOT_CAUSE = TIME_DERIVED_O4B_OBSERVATION_TIMESTAMPS_FLOW_THROUGH_O4C_O4D_O4E_INTO_O4F_PUBLICATION_SLOT_IDENTITY
DEFECT_LOCATION = o4f slotIdentity includes o4eExecutionIdentity while o4eExecutionIdentity transitively includes wall-clock observation timestamps
EFFECT = SAME logical publication task/head at different times resolves to DIFFERENT slots; second run cannot recover first run; duplicate COMMENTED publication
OTHER_NONDETERMINISM = NONE PROVEN / content/claim/head bindings deterministic for this attempt; timestamps are the material difference
```

## Design requirement for the separate fix (not implemented here)

Idempotency slot identity must represent the SAME logical publication slot
across repeated executions of the same bound review task/head. Observation
time, acquisition timestamps, request timing, and ephemeral execution evidence
must NOT change the logical slot unless governance explicitly intends it.

The fix belongs at the correct identity boundary. Injecting a fixed `now` in a
live harness is NOT the canonical product fix. The candidate fix direction to
prove under the separate authorization is to remove execution/evidence identity
(`o4eExecutionIdentity` and anything transitively time-derived) from
`publicationSlotIdentity` and bind the slot only to logical fields
(publication class, repository, PR, reviewed head, logical task/policy where
appropriate, normalized claim/path/line where appropriate), while keeping
existing head/repository/PR/provider-policy/claim protections intact.

Do not implement that fix in this candidate.

## Regression tests required under the separate fix authorization (minimum)

- same repo / PR / reviewed head / task / policy / normalized claims with
  different O4-B observation timestamps => same `publicationSlotIdentity`;
- repeated execution against a previously published slot =>
  `COMPLETED_ALREADY_PRESENT`, zero additional POSTs, first receipt recovered
  (`reviewId`/`reviewNodeId`/`reviewReceiptIdentity` equal);
- changed reviewed head => different slot identity;
- changed logical task/policy where appropriate => different slot identity;
- changed claim identity where appropriate => different inline slot identity;
- time-only / read-evidence-only execution differences => NO new logical slot;
- no weakening of head, repository, PR, provider-policy, or claim binding.

## Candidate qualification

Before merge this one-path candidate must prove:

```text
EXACT_CHANGED_PATHS = 1
ADVERSE_EVIDENCE_PRESERVED_EXACT = YES (run1/run2 statuses, IDs, slots, receipts, receiptMatch false, hygiene)
LIVE_GITHUB_CROSS_CHECK = YES (5189850526 + 5189850685 COMMENTED at authorized head with exact distinct markers; O4-L 5189105929 preserved)
ROOT_CAUSE_EACH_LINK_PROVEN_FROM_SOURCE = YES (O4B->O4C->O4D->O4E->O4F with file:line refs above)
NO_NEW_POST_BUDGET = YES (this repair grants 0; combined budget unchanged; second POST recorded adverse, not authorized)
NO_SOURCE_TEST_SCHEMA_MUTATION = YES
NO_LIVE_WRITE_BY_AGENT = YES
SECRET_HANDLING_BY_AGENT = FORBIDDEN (no PAT requested, read, printed, logged, hashed, serialized)
ROOT_UV_SYNC_FROZEN_DEV = PASS
ROOT_PROVENANCE = PASS
ROOT_PYTEST = PASS
ROOT_RUFF = PASS
GIT_DIFF_CHECK = PASS
WORKTREE = CLEAN
SUBSTANTIVE_EXACT_HEAD_REVIEW = CLEAN
ORIGINAL_ATTEMPT_REQUIRED_CI = PASS
UNRESOLVED_MATERIAL_THREADS = 0
ACTIVE_RULESET = VERIFIED
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = NEVER
EXPECTED_HEAD_NORMAL_MERGE = REQUIRED
POST_MERGE_PROOF = REQUIRED
EXTERNAL_CLOSED_CANONICAL_PROOF = REQUIRED
```

TypeScript, focused O4-G/O4-I, full runtime, patch benchmark, and provenance
checks follow the canonical validation recipe used for prior O4 authorizations.
Tests must use injected fake transport and synthetic credentials only. No live
GitHub write credential is required or authorized for qualification of this
authorization candidate itself.

## Explicit non-grants

```text
NEW_LIVE_PUBLICATION_POST = FORBIDDEN (no third O4-N POST)
BLIND_RETRY = FORBIDDEN
SECOND_PUBLICATION_POST = FORBIDDEN (the observed second POST is adverse history, not new authority)
DELETE_ANY_REVIEW = FORBIDDEN (5189105929, 5189850526, 5189850685 must remain)
SUBMIT_APPROVE_REQUEST_CHANGES = FORBIDDEN
MERGE_PR_163 = FORBIDDEN
LABEL_ISSUE_BRANCH_RULESET_ADMIN = FORBIDDEN
SOURCE_TEST_SCHEMA_WORKFLOW_DEPENDENCY_MUTATION = FORBIDDEN_BY_THIS_CANDIDATE
O4I_O4G_O4H_SOURCE_MUTATION = NOT_AUTHORIZED_BY_THIS_CANDIDATE
TELEMETRY_SURFACE_ADDITION = NOT_AUTHORIZED_BY_THIS_CANDIDATE
NEW_PROVIDER_OR_MODEL_ADMISSION = NOT_AUTHORIZED
PROOF_ONLY_PROVIDER_IS_NOT_ADMISSION = YES
PERSISTENCE_DATABASE_QUEUE_SCHEDULER = NOT_AUTHORIZED
TELEMETRY_OR_GLITCHTIP = NOT_AUTHORIZED
K2_MUTATION = NOT_AUTHORIZED
O5_IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC_RELEASE = NOT_AUTHORIZED
PACKAGE_PUBLICATION = NOT_AUTHORIZED
DEPLOYMENT = NOT_AUTHORIZED
PRODUCTION_READINESS_CLAIM = NOT_AUTHORIZED
O4_IDEMPOTENT_COMPLETENESS_UPGRADE = FORBIDDEN (remains NOT_PROVEN until fix + re-proof)
REINTERPRET_ADVERSE_RUN_AS_SUCCESS = FORBIDDEN
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

## After execution

Canonicalizing this adverse outcome does not rewrite current-view status by
itself. The O4-K adverse outcome, O4-L bounded receipt, O4-M receipt evidence,
O4-N finding, repaired O4-N adverse disposition, successful transport-acceptance
bound, remaining multi-head/admission/release boundary, and the required
deterministic-idempotency source fix must go through the next
documentation-only evidence and reconciliation lifecycle required by live
governance.

If the later source fix fails, preserve that failure exactly. No additional
publication POST is authorized without a new explicit founder decision, a new
canonical authorization, post-fix reconciliation, and a fresh bounded POST
budget.

(End of file - total lines as committed.)
