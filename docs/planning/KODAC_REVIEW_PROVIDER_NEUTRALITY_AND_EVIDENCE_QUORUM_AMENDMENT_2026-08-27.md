# Kodac Review Provider Neutrality and Evidence Quorum Amendment

## Record identity

- Date: 2026-08-27
- Decision owner: Kodac founder
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-27`
- Authority class: DOCUMENTATION / GOVERNANCE CORRECTION / REVIEW QUALIFICATION SEMANTICS
- Canonical base commit: `87f9a3dbe9d15d0b1573b50fe74487ca83562ba2`
- Canonical base tree: `36a7e9f279b1fb9828d61a16c476963cf311dde3`
- Governing constitution: `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`
- Protected-main ruleset: `20707483`
- `WAIVER=NO`

This record corrects a provider-locking governance defect. It does not weaken exact-head qualification, protected-machine evidence, required CI, review-thread resolution, no-bypass requirements, guarded merge semantics, or post-merge proof.

## Constitutional defect being corrected

ADR-0001 requires Kodac to remain open and model-agnostic by architecture and says canonical Kodac contracts must remain vendor-neutral. It also requires reversibility so models, providers, reviewers, and other replaceable infrastructure can be changed behind Kodac-owned boundaries.

Several later planning records, including the canonical K6 definition and K6-R4 qualification records, accidentally encoded `CodeRabbit` and `Qodo` by name as mandatory merge-gate providers.

That provider-specific wording creates an external availability and quota dependency in canonical repository progress. A provider can therefore block an otherwise fully qualified repository state because of its commercial review quota, outage, account state, or product policy rather than because Kodac evidence is incomplete.

That is a governance defect, not a security property.

```text
REVIEW_PROVIDER_NAME != REVIEW_AUTHORITY
PROVIDER_AVAILABILITY != REPOSITORY_TRUTH
PROVIDER_QUOTA != SECURITY_GATE
EXACT_HEAD + EVIDENCE + INDEPENDENT REVIEW == QUALIFICATION INPUT
```

## Decision

From canonical adoption of this amendment forward, any Kodac planning, authorization, qualification, closeout, or implementation record that requires `CodeRabbit`, `Qodo`, or another external reviewer by provider name is interpreted and, when next amended, rewritten according to the provider-neutral evidence quorum below.

This amendment supersedes provider-name requirements only. It does not supersede scope, CI, trusted-workflow, exact-head, thread-resolution, ruleset, no-bypass, merge, or post-merge requirements.

## Provider-neutral review evidence contract

A review counts only when all of the following are true:

1. it is bound to the exact candidate head SHA being qualified;
2. it is produced by an independent reviewer channel outside the authoring agent/user's own self-review;
3. it contains substantive semantic assessment, not merely a status context, skipped-review marker, rate-limit response, summary, or billing notice;
4. it explicitly reports no unresolved material correctness, security, governance, authority, or scope defect, or all identified material defects are fixed and the reviewer re-adjudicates the exact final head as clean;
5. any actionable inline review threads created by that reviewer are resolved only after the underlying defect is genuinely corrected;
6. head movement invalidates the review for merge qualification.

Provider identity is evidence metadata, not authority.

Acceptable external reviewer channels may include CodeRabbit, Qodo, Cubic, another independently operated review service, or a later Kodac-qualified reviewer adapter. No single provider is mandatory by name.

The PR author, branch author, or executing automation may inspect and validate the candidate, but that self-review does not satisfy the independent external semantic-review slot.

## Evidence quorum by change class

### A. Documentation-only governance / authorization candidates

The exact final head must prove:

```text
EXTERNAL_SEMANTIC_REVIEW_COUNT >= 1
REQUIRED_REPOSITORY_CI = SUCCESS
UNRESOLVED_ACTIONABLE_THREADS = 0
EXACT_HEAD_CAPTURED = YES
EXACT_TREE_CAPTURED = YES
EXACT_DOCUMENT_BLOB_CAPTURED = YES
BEHIND_BY = 0
RULESET_ACTIVE = YES
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
WAIVER = NO
```

A second external reviewer is welcome and may strengthen evidence, but is not a canonical liveness dependency for a documentation-only governance record.

### B. Implementation / executable workflow / source / schema candidates

The exact final head must prove both a machine-evidence channel and an independent semantic-review channel.

```text
APPLICABLE_TRUSTED_MACHINE_QUALIFICATION = SUCCESS
APPLICABLE_DEDICATED_EXECUTION = SUCCESS
REQUIRED_REPOSITORY_CI = SUCCESS
EXTERNAL_SEMANTIC_REVIEW_COUNT >= 1
UNRESOLVED_ACTIONABLE_THREADS = 0
EXACT_HEAD / TREE / REQUIRED_BLOBS = CAPTURED
BEHIND_BY = 0
RULESET_ACTIVE = YES
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
WAIVER = NO
```

When no base-controlled trusted machine qualifier exists for an implementation slice, its governing authorization must define an equivalent independent second evidence channel before merge. The absence of a trusted qualifier is not permission to silently reduce evidence.

For K6-R4 specifically, the canonical base-controlled `k6-r4-trusted-qualification` inspector plus the candidate-owned dedicated R4 execution workflow and required repository CI constitute the machine-evidence side of the quorum. One fresh independent external semantic terminal-clean review on the exact final head then satisfies the semantic-review side.

## Fail-closed provider unavailability semantics

External provider unavailability is handled as follows:

```text
PROVIDER_RATE_LIMIT -> PROVIDER_RESULT_NOT_COUNTED
PROVIDER_SKIPPED_REVIEW -> PROVIDER_RESULT_NOT_COUNTED
PROVIDER_OUTAGE -> PROVIDER_RESULT_NOT_COUNTED
STALE_PROVIDER_REVIEW -> PROVIDER_RESULT_NOT_COUNTED
STATUS_SUCCESS_WITHOUT_SUBSTANTIVE_TERMINAL_REVIEW -> PROVIDER_RESULT_NOT_COUNTED
```

Kodac may use another independent reviewer channel without creating a waiver.

Changing reviewer provider does not waive review; it preserves review while avoiding vendor lock-in.

If no independent external reviewer channel is available at all, the semantic-review slot remains unsatisfied and merge remains blocked.

## K6 correction

The canonical K6 definition currently requires later K6 authorization candidates to define exact-head `CodeRabbit/Qodo` review requirements. From adoption of this amendment, that requirement is superseded by the provider-neutral evidence quorum in this record.

Existing K6 records do not need historical rewrite merely to rename providers. When a live candidate governed by those records is next amended or reconciled, its active gate must cite or reproduce this provider-neutral semantics.

## K6-R4 correction

For the active K6-R4 replacement-authorization candidate and subsequent PR #212 qualification:

- a CodeRabbit rate-limit response is not clean review evidence;
- CodeRabbit is not mandatory by name after this amendment becomes canonical;
- Qodo may satisfy the external semantic-review slot if it gives a fresh terminal-clean exact-head assessment and no unresolved material findings remain;
- the trusted K6-R4 base-controlled inspector, dedicated R4 workflow, required repository CI, exact scope/blob pins, ruleset, no-bypass proof, and post-merge proof remain mandatory and unchanged;
- `WAIVER=NO` remains mandatory.

This amendment does not itself authorize reconciliation or merge of PR #212. The active replacement authorization must first be forward-amended to the new canonical main and requalified under this policy.

## Exact scope of this amendment candidate

This PR may change exactly one path:

```text
docs/planning/KODAC_REVIEW_PROVIDER_NEUTRALITY_AND_EVIDENCE_QUORUM_AMENDMENT_2026-08-27.md
```

No source, schema, workflow, runtime, dependency, ruleset, protected branch configuration, PR #212 implementation path, or other planning document is modified by this candidate.

## Adoption gate

This amendment remains non-canonical until its exact final candidate proves:

1. base ref is exactly `main`;
2. live protected main remains the stated canonical base or this record is forward-amended to a new exact canonical base before qualification;
3. changed-file set is exactly the one documentation path above;
4. applicable repository-required exact-head CI is terminal success;
5. at least one independent external semantic reviewer gives a terminal-clean review on the exact final head with zero unresolved material correctness/security/governance/authority findings;
6. zero unresolved actionable review threads remain;
7. candidate is open, non-draft, mergeable, and `behind_by=0`;
8. ruleset `20707483` remains active with strict required status checks and required review-thread resolution;
9. independent control-plane proof exposes `bypass_actors=[]` and `current_user_can_bypass=never`;
10. exact final head, tree, and document blob are captured;
11. guarded normal merge uses the exact qualified `expected_head_sha`;
12. post-merge ordered-parent/tree/blob/protected-main/signature proof succeeds;
13. applicable post-merge required checks are terminal success;
14. `WAIVER=NO`.

This adoption gate is intentionally provider-neutral. It is not a self-waiver: it requires an independent external semantic review plus the same repository CI, exact-head, ruleset, no-bypass, guarded merge, and post-merge evidence disciplines.

## Non-grants

This amendment does not authorize:

```text
REVIEW BYPASS
SELF-REVIEW AS THE INDEPENDENT SLOT
STALE REVIEW REUSE
STATUS-ONLY REVIEW EVIDENCE
RULESET MUTATION
BYPASS ACTOR ADDITION
CI REDUCTION
TRUSTED WORKFLOW REDUCTION
SCOPE EXPANSION
PR #212 RECONCILIATION BEFORE THIS AMENDMENT AND THE R4 REPLACEMENT AUTHORIZATION ARE CANONICAL
K6-R5 IMPLEMENTATION
```

`DONE = evidence-backed completion` remains binding.

`WAIVER=NO`
