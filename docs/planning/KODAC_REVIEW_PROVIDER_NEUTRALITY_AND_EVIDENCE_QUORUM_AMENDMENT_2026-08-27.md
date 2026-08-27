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

This record corrects a provider-locking governance defect. It does not weaken exact-head qualification, review-quorum cardinality, protected-machine evidence, required CI, review-thread resolution, no-bypass requirements, guarded merge semantics, or post-merge proof.

## Constitutional defect being corrected

ADR-0001 requires Kodac to remain open and model-agnostic by architecture and says canonical Kodac contracts must remain vendor-neutral. It also requires reversibility so models, providers, reviewers, and other replaceable infrastructure can be changed behind Kodac-owned boundaries.

Several later planning records, including the canonical K6 definition and K6-R4 qualification records, accidentally encoded `CodeRabbit` and `Qodo` by name as mandatory merge-gate providers.

That provider-specific wording creates an external availability and quota dependency in canonical repository progress. A provider can therefore block an otherwise fully qualified repository state because of its commercial review quota, outage, account state, or product policy rather than because Kodac evidence is incomplete.

That is a governance defect, not a security property.

```text
REVIEW_PROVIDER_NAME != REVIEW_AUTHORITY
PROVIDER_AVAILABILITY != REPOSITORY_TRUTH
PROVIDER_QUOTA != SECURITY_GATE
REVIEW_QUORUM_CARDINALITY = PRESERVED
EXACT_HEAD + EVIDENCE + INDEPENDENT REVIEW QUORUM == QUALIFICATION INPUT
```

## Decision

From canonical adoption of this amendment forward, any Kodac planning, authorization, qualification, closeout, or implementation record that requires `CodeRabbit`, `Qodo`, or another external reviewer by provider name is interpreted and, when next amended, rewritten according to the provider-neutral evidence quorum below.

This amendment supersedes provider names only. It preserves the number of independent semantic reviews required by the governing record. A gate that historically required two named reviewers continues to require two distinct independent external semantic reviewer channels on the exact final head.

This amendment does not supersede scope, CI, trusted-workflow, exact-head, thread-resolution, ruleset, no-bypass, merge, or post-merge requirements.

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

Two reviews count as two only when they are produced by distinct independent external reviewer channels. Multiple comments, passes, models, or agents from the same reviewer service do not inflate the quorum unless a later canonical contract proves they are operationally independent channels.

The PR author, branch author, or executing automation may inspect and validate the candidate, but that self-review does not satisfy an independent external semantic-review slot.

## Review-quorum preservation rule

For any pre-existing governing record superseded by this amendment:

```text
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT
  = number of distinct external reviewer providers explicitly required by that governing gate
```

Therefore:

```text
historical CodeRabbit + Qodo requirement -> >= 2 distinct independent external semantic reviewer channels
historical single named reviewer requirement -> >= 1 distinct independent external semantic reviewer channel
```

Provider substitution is allowed. Cardinality reduction is not.

## Evidence quorum by change class

### A. Documentation-only governance / authorization candidates governed by a historical two-review gate

The exact final head must prove:

```text
EXTERNAL_SEMANTIC_REVIEW_COUNT >= 2
EXTERNAL_SEMANTIC_REVIEW_CHANNELS_DISTINCT = YES
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

This preserves the historical K6 two-review semantic quorum without granting either historical provider permanent authority.

### B. Implementation / executable workflow / source / schema candidates governed by a historical two-review gate

The exact final head must prove both machine evidence and the preserved semantic-review quorum:

```text
APPLICABLE_TRUSTED_MACHINE_QUALIFICATION = SUCCESS
APPLICABLE_DEDICATED_EXECUTION = SUCCESS
REQUIRED_REPOSITORY_CI = SUCCESS
EXTERNAL_SEMANTIC_REVIEW_COUNT >= 2
EXTERNAL_SEMANTIC_REVIEW_CHANNELS_DISTINCT = YES
UNRESOLVED_ACTIONABLE_THREADS = 0
EXACT_HEAD / TREE / REQUIRED_BLOBS = CAPTURED
BEHIND_BY = 0
RULESET_ACTIVE = YES
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
WAIVER = NO
```

When no base-controlled trusted machine qualifier exists for an implementation slice, its governing authorization must define an equivalent independent machine/evidence channel before merge. The absence of a trusted qualifier is not permission to silently reduce evidence.

For K6-R4 specifically, the canonical base-controlled `k6-r4-trusted-qualification` inspector plus the candidate-owned dedicated R4 execution workflow and required repository CI constitute the machine-evidence side. Because the governing K6/K6-R4 gates historically required both CodeRabbit and Qodo, two distinct fresh independent external semantic terminal-clean reviews on the exact final head remain mandatory.

## Fail-closed provider unavailability semantics

External provider unavailability is handled as follows:

```text
PROVIDER_RATE_LIMIT -> PROVIDER_RESULT_NOT_COUNTED
PROVIDER_SKIPPED_REVIEW -> PROVIDER_RESULT_NOT_COUNTED
PROVIDER_OUTAGE -> PROVIDER_RESULT_NOT_COUNTED
STALE_PROVIDER_REVIEW -> PROVIDER_RESULT_NOT_COUNTED
STATUS_SUCCESS_WITHOUT_SUBSTANTIVE_TERMINAL_REVIEW -> PROVIDER_RESULT_NOT_COUNTED
DUPLICATE_CHANNEL_REVIEW -> DOES_NOT_INCREASE_DISTINCT_CHANNEL_COUNT
```

Kodac may use another independent reviewer channel without creating a waiver.

Changing reviewer provider does not waive review; it preserves review while avoiding vendor lock-in. It also does not reduce the required number of independent review channels.

If the required number of distinct independent external reviewer channels is not available, the semantic-review quorum remains unsatisfied and merge remains blocked.

## K6 correction

The canonical K6 definition currently requires later K6 authorization candidates to define exact-head `CodeRabbit/Qodo` review requirements. From adoption of this amendment, that requirement is interpreted as two distinct independent external semantic reviewer channels on the exact final head, not permanent authority for those two vendors.

Existing K6 records do not need historical rewrite merely to rename providers. When a live candidate governed by those records is next amended or reconciled, its active gate must cite or reproduce this provider-neutral semantics while preserving review cardinality.

## K6-R4 correction

For the active K6-R4 replacement-authorization candidate and subsequent PR #212 qualification:

- a CodeRabbit rate-limit response is not clean review evidence;
- CodeRabbit is not mandatory by name after this amendment becomes canonical;
- Qodo is not mandatory by name after this amendment becomes canonical;
- two distinct qualifying independent external reviewer channels must each provide a fresh terminal-clean exact-head semantic assessment;
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
2. candidate PR base SHA is exactly `87f9a3dbe9d15d0b1573b50fe74487ca83562ba2`;
3. candidate PR base tree is exactly `36a7e9f279b1fb9828d61a16c476963cf311dde3`;
4. live protected `main` SHA is exactly `87f9a3dbe9d15d0b1573b50fe74487ca83562ba2` with tree exactly `36a7e9f279b1fb9828d61a16c476963cf311dde3`;
5. if either candidate-base or live-main identity drifts, this record is forward-amended/reconciled to the new exact canonical base and the entire candidate is requalified from scratch;
6. changed-file set is exactly the one documentation path above with no rename/copy source;
7. applicable repository-required exact-head CI is terminal success;
8. at least two distinct independent external semantic reviewer channels each give a terminal-clean review on the exact final head with zero unresolved material correctness/security/governance/authority findings;
9. zero unresolved actionable review threads remain;
10. candidate is open, non-draft, mergeable, and `behind_by=0`;
11. ruleset `20707483` remains active with strict required status checks and required review-thread resolution;
12. independent control-plane proof exposes `bypass_actors=[]` and `current_user_can_bypass=never`;
13. exact final head, tree, and document blob are captured;
14. guarded normal merge uses the exact qualified `expected_head_sha`;
15. post-merge ordered-parent/tree/blob/protected-main/signature proof succeeds;
16. applicable post-merge required checks are terminal success;
17. `WAIVER=NO`.

This adoption gate is intentionally provider-neutral and cardinality-preserving. It is not a self-waiver: it requires the same two-review semantic quorum that historical K6 gates required, plus the same repository CI, exact-head/base, ruleset, no-bypass, guarded merge, and post-merge evidence disciplines.

## Non-grants

This amendment does not authorize:

```text
REVIEW BYPASS
REVIEW QUORUM CARDINALITY REDUCTION
SELF-REVIEW AS AN INDEPENDENT SLOT
STALE REVIEW REUSE
STATUS-ONLY REVIEW EVIDENCE
DUPLICATE CHANNEL COUNT INFLATION
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
