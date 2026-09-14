# O4 Credential-Generality Live Proof Procedure (Preparation Record — No Execution)

## Status

```text
RECORD_CLASS = LIVE_PROOF_PROCEDURE_PREPARATION / NOT_EXECUTED
AUTHORITY = CLOSED_CANONICAL / PR #640 / merge e68b68e40e4bdf2ecb54edd5ff7bc45b2aa2ff8d
O4_LIVE_PROOF = DEFERRED_EXTERNAL_EDGE
POST_BUDGET_CONSUMED_BY_THIS_RECORD = 0
SECRET_BYTES_RECORDED = NONE
CREDENTIAL_GENERALITY = NOT_PROVEN
PROJECT_COMPLETION = NOT_ESTABLISHED
```

This record prepares the future separately authorized founder-local run. It executes nothing, posts nothing, and proves nothing live. Synthetic/fixture qualification of the O4-O identities does not imply live proof.

## Objective

Prove credential-generality: the O4 bounded publication path produces the same logical publication slot and stable external receipt identities when the GitHub credential arrives through a founder-injected caller path rather than the previously used `gh api` session, for one reviewed head, within a maximum one-POST budget.

## Target selection rule

```text
TARGET = one open pull request in TheHalfMoon/Kodac with reviewable code changes
PREFERRED_TARGET = PR #163 only if still open and its head is reviewable at run time
HEAD = bound at run time from live `gh api repos/TheHalfMoon/Kodac/pulls/<N>` (never pre-bound here)
REFUSE_IF = target closed/merged, headull, or head unreviewable
```

## Exact head binding rule

```text
1. Read live head H0 via read-only API before any write.
2. Run idempotency scan at H0; if COMPLETED_ALREADY_PRESENT with exact slot/body/marker match, stop with zero POSTs and record recovery.
3. If a POST is required, re-read live head H1 immediately before POST; refuse unless H1 == H0.
4. After POST, read back review + comments; refuse unless commitId == H1 and marker count == 1 and no stray review.
```

## POST budget

```text
MAX_PUBLICATION_POST = 1
READ_BACK_CALLS = read-only, unbounded but logged
SECOND_POST = FORBIDDEN under any circumstance
EDIT_OR_DELETE_EXISTING_REVIEWS = FORBIDDEN
MERGE_PR = FORBIDDEN
```

## Expected identities (O4-O fixed behavior under test)

```text
TIME_ONLY_RERUN => SAME publicationSlotIdentity (taskId/policy/reviewedHead/claim/path/line bound; o4eExecutionIdentity excluded)
TIME_ONLY_RERUN => SAME slotReceiptIdentity (slot + object/body/anchor; request identity excluded)
TIME_ONLY_RERUN => SAME reviewReceiptIdentity (review object + slot receipts; admission identity excluded)
TIME_ONLY_RERUN => DIFFERENT o4eExecutionIdentity/publicationRequestIdentity/publicationAdmissionIdentity permitted
CHANGED_HEAD_OR_TASK_OR_POLICY => DIFFERENT slot (must not collide)
```

## Adverse result handling

```text
MARKER_OR_BODY_MISMATCH_AT_EXISTING_SLOT => fail closed, zero further writes, preserve scan output
HEAD_MOVEMENT_BEFORE_POST => abort, zero writes
HEAD_MOVEMENT_AFTER_POST => record as adverse with full read-back, zero further writes
SECOND_DISTINCT_REVIEW_OBSERVED => record as adverse (O4K recurrence), zero further writes
ANY_UNEXPECTED_ERROR => abort, zero further writes, preserve logs
```

## Evidence capture (exact fields, no secret bytes)

```text
review id, node id, state, commitId
comment ids, node ids, paths, lines, sides, bodies (marker-verified)
marker count at reviewed head (must equal 1)
stray review presence/absence
slotReceiptIdentities, reviewReceiptIdentity
publicationExecutionIdentity (lineage only)
live head before/after, timestamps of reads
POST request/response status (status code only; no credential bytes)
```

## Verification commands (read-only)

```text
gh api repos/TheHalfMoon/Kodac/pulls/<N> --jq '{head: .head.sha, state}'
gh api repos/TheHalfMoon/Kodac/pulls/<N>/reviews --jq '.[] | {id, node_id, state, commit_id}'
gh api repos/TheHalfMoon/Kodac/pulls/<N>/comments --jq '.[] | {id, path, line, side}'
gh api repos/TheHalfMoon/Kodac/commits/<MERGE> --jq '.commit.verification'
gh api repos/TheHalfMoon/Kodac/commits/<MERGE>/check-runs --jq '.check_runs[] | {name, conclusion}'
```

Every command above performs GET reads only. No command in this record writes, and no command accepts a secret argument.

## Post-run canonicalization

A later O4M-style receipt record must bind: target PR, reviewed head, review/comment identities, marker count 1, stray absent, slot + receipt identities, POST count (0 for recovery, 1 for creation), adverse flag if any, and the exact verification outputs. Secret bytes must never be recorded. The receipt record requires its own canonical authorization before merge.

## Founder-local handoff (minimal secret-bearing step)

```text
FOUNDER_PROVIDES = caller-injected GitHub credential via an explicitly authorized founder-local procedure (not defined here)
AGENT_MAY_NOT = obtain, print, persist, or transmit the credential; use ambient secrets as substitute evidence
SEPARATE_AUTHORIZATION_REQUIRED = yes, with explicit POST budget restated and this procedure referenced
```

(End of file)
