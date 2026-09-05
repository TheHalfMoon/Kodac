# Kodac P7-R1 — Immutable Patch Proposal Foundation Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL MERGED_AND_POST_PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Deny-by-default baseline

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 076bd55d30a6d49409e1d4598ad81f1b643bef44
CANONICAL_TREE_AT_CANDIDATE_START = 6fdd94cdf40910b3c626369fe25ed43910ac6b5f
P6-R1 = CLOSED_CANONICAL
P6 BOUNDED R1 ENGINEERING SCOPE = CLOSED_CANONICAL / PR #349 / proof 5552035602
P6 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL / PR #351 / proof 5552175515
POST-P6 SUCCESSOR ANALYSIS = PR #351 / comment 5552199411 / ANALYSIS_ONLY
P7-R1 IMPLEMENTATION = NOT_AUTHORIZED UNTIL THIS RECORD QUALIFIES_MERGES_AND_POST_PROVES
P7-R2+ = NOT_AUTHORIZED_BY_NUMBERING
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
K2 AUTHORITY EXPANSION = NONE
P8-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This record is a one-path documentation-only authorization candidate. It creates no runtime authority while unmerged or unproven.

---

## 2. Why this is the minimum non-duplicative P7 unit

Canonical planning independently states a future bounded-remediation lifecycle beginning with:

```text
ADJUDICATED FINDING
-> IMMUTABLE PATCH PROPOSAL
-> EXACT WRITE SCOPE
-> K2 EXECUTION
-> VERIFIER RE-RUN
-> TESTS / NEGATIVE CASES
-> EXACT-HEAD RE-REVIEW
-> K5 RECONCILIATION
-> DONE GATE
```

Fresh live-code analysis after canonical P6 closeout found:

```text
P4 REVIEWER CLAIM / VERIFIER PROPOSAL = EXISTS
KRI-R2 FINDING / ADJUDICATION CONTRACTS + VALIDATION = EXISTS
K6-R5 STRATEGY PROPOSAL = EXISTS / EVIDENCE-ROUTER STRATEGY ONLY
P5 PROVENANCE / RELATION = EXISTS
K5 PROOF / RECONCILIATION = EXISTS
K2 SIDE-EFFECT BOUNDARY = EXISTS
REPOSITORY PATCH PROPOSAL IDENTITY = NOT FOUND
REMEDIATION RUNTIME = NOT FOUND
P7 AUTHORIZATION RECORD = NOT FOUND
```

Therefore the first independently useful P7 mechanism is not patch execution. It is one pure/data-only immutable proposal record that binds one already-current, already-confirmed KRI-R2 finding to an immutable patch artifact identity and exact bounded repository-relative write scope.

```text
P4 VERIFIER PROPOSAL != PATCH PROPOSAL
K6 STRATEGY PROPOSAL != PATCH PROPOSAL
PATCH PROPOSAL != PATCH APPLICATION
PATCH PROPOSAL != K2 EXECUTION
PATCH PROPOSAL != VERIFIED REMEDIATION
```

The label `P7-R1` is descriptive only. Authority comes from this exact bounded record after qualification, guarded merge, and post-merge proof; it does not arise from numbering.

---

## 3. Exact future implementation allowlist

Only after this authorization becomes canonical and post-merge proven may one later implementation candidate modify exactly:

```text
packages/kodac-runtime/src/remediation/p7-immutable-patch-proposal.ts
schema/p7-immutable-patch-proposal.schema.json
packages/kodac-runtime/test/p7-r1-immutable-patch-proposal.test.ts
```

No fourth path is authorized.

The later implementation must not modify package-root exports, existing KRI/P4/P5/P6/K2/K5 source, workflows, dependencies/lockfiles, current-view files, historical authorization/evidence records, rulesets, release configuration, provider/model configuration, persistence/telemetry/learning surfaces, or any other path.

---

## 4. Required P7-R1 contract semantics

The future implementation must remain pure/data-only and purpose-equivalent to:

```text
P7ImmutablePatchProposal {
  version
  proposalIdentity
  state = PROPOSED
  repositoryIdentity
  canonicalBase
  targetHead
  sourceFinding
  sourceAdjudication
  proposerIdentity
  patchArtifactDigest
  changes[]
}

P7PatchChange {
  path
  operation = ADD | MODIFY | DELETE
  beforeBlobIdentity
  afterContentDigest
}
```

Required source semantics:

```text
sourceFinding.version = kri-r2-finding-v1
sourceFinding.freshness = CURRENT
sourceFinding.state = NEW
sourceFinding.evaluatedHead = targetHead
sourceFinding.review.reviewedHead = targetHead
sourceAdjudication.version = kri-r2-adjudication-v1
sourceAdjudication.findingIdentity = sourceFinding.findingIdentity
sourceAdjudication.action = CONFIRM
sourceAdjudication.previousState = NEW
sourceAdjudication.resultingState = CONFIRMED
sourceAdjudication.previousAdjudicationIdentity = null
```

The implementation must reuse canonical KRI-R2 finding/adjudication validation semantics rather than invent a parallel finding/adjudication identity algorithm.

Current canonical KRI schema anchors at authorization start:

```text
schema/kri-finding.schema.json = ca74ebe040ed217d7696b9ae8cf612e21b462b07
schema/kri-adjudication.schema.json = 814cfe0eeef170d51536df91366a22c42e10dcb8
packages/kodac-runtime/src/reviewer-intelligence/runtime.ts = 4c5d01293d37b14ad4b017ec1e7dd17055393113
packages/kodac-runtime/src/reviewer-intelligence/contracts.ts = 5ebe91c3d98f626651230989564d367d0600863c
```

Live GitHub wins if any identity moves before implementation qualification.

---

## 5. Patch-change invariants

The future implementation must enforce a non-empty bounded change set with unique paths and canonical ascending path order.

Repository paths must be inert repository-relative POSIX paths and reject absolute paths, Windows separators, NUL/control ambiguity, empty segments, dot segments, and parent traversal.

Purpose-equivalent operation rules:

```text
ADD
  beforeBlobIdentity = null
  afterContentDigest = lowercase SHA-256

MODIFY
  beforeBlobIdentity = lowercase 40-hex Git blob identity
  afterContentDigest = lowercase SHA-256

DELETE
  beforeBlobIdentity = lowercase 40-hex Git blob identity
  afterContentDigest = null
```

`patchArtifactDigest` must be lowercase SHA-256 and is an immutable artifact identity only. P7-R1 does not fetch, store, parse, trust, apply, or execute the artifact. Later execution, if separately authorized, must independently verify that actual patch bytes and actual writes match the proposal and exact write scope.

All strings and collections must have explicit deterministic bounds. The proposal identity must be deterministic content addressing over the canonical validated preimage, excluding only `proposalIdentity` itself.

Returned records must be detached and deeply immutable. Caller-owned mutable input must not be retained by reference.

---

## 6. Required safety/non-equivalence boundaries

```text
PROPOSAL STATE = PROPOSED ONLY
PROPOSAL != AUTHORIZATION_TO_APPLY
PROPOSAL != APPLIED
PROPOSAL != VERIFIED
PROPOSAL != FIXED
PROPOSAL != DONE
PATCH_ARTIFACT_DIGEST != PATCH_VALIDATION
DECLARED_CHANGE_SET != EXECUTED_WRITE_SET
CONFIRMED_KRI_FINDING != UNIVERSAL_TRUTH
P7-R1 != REPOSITORY_WRITE_AUTHORITY
P7-R1 != K2 EXECUTION AUTHORITY
P7-R1 != AUTOFIX EXECUTION
P7-R1 != PROVIDER / MODEL INVOCATION
P7-R1 != SECRET / NETWORK ACCESS
P7-R1 != DEPENDENCY ADMISSION
P7-R1 != PERSISTENCE / TELEMETRY / LEARNING
P7-R1 != PRODUCT / CLI / API INTEGRATION
P7-R1 != RELEASE AUTHORITY
P7-R1 != P7-R2+ AUTHORITY
P7-R1 != P8 AUTHORITY
P7-R1 != PROJECT COMPLETION
```

No implementation may invoke filesystem writes, Git, shell/process execution, K2, network, providers/models, secrets, package installation, persistence, upload, telemetry, or remediation execution.

---

## 7. Required adversarial qualification

The future implementation tests must cover at least:

```text
deterministic identity independent of object key insertion order
canonical sorting / rejection of non-canonical change order
path traversal / absolute / backslash / empty-segment rejection
duplicate change-path rejection
operation-specific null/digest invariants
invalid Git blob / SHA-256 identities
unknown-field rejection
stale finding rejection
finding target-head mismatch rejection
finding/adjudication identity mismatch rejection
non-CONFIRM / non-CONFIRMED adjudication rejection
previous-adjudication chain rejection for the R1 source boundary
mutation-after-call does not affect output
returned nested data is deeply frozen
unsupported object/prototype/accessor/proxy data fails closed where applicable
explicit collection/string/resource bounds
schema/runtime/test semantic agreement
```

Focused tests and full repository-required CI must be terminal success on one unchanged exact head.

---

## 8. Qualification gate for this authorization candidate

Do not merge this authorization record unless one unchanged exact head proves:

```text
BASE == CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P7_R1_IMMUTABLE_PATCH_PROPOSAL_AUTHORIZATION_2026-09-05.md
REQUIRED CI = TERMINAL SUCCESS OR CANONICALLY PROVEN NON_APPLICABLE
INTERNAL_SUBSTANTIVE_SEMANTIC_SECURITY_INSPECTION = CLEAN
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
EXTERNAL_REVIEW = OPTIONAL_ADVISORY_EVIDENCE
RULESET 20707483 = active / bypass_actors=[] / current_user_can_bypass=never
MERGE = GUARDED NORMAL MERGE USING exact expected_head_sha
POST_MERGE_PROOF = main + ordered parents + tree + authorization blob + verified/valid signature + applicable push checks + merged PR state + ruleset
WAIVER = NO
```

Any byte/head/base/qualification-relevant movement invalidates exact-head qualification evidence.

---

## 9. Candidate boundary

Until this exact one-path record qualifies, merges guarded, and passes mandatory post-merge proof:

```text
P7-R1 IMPLEMENTATION = NOT_AUTHORIZED
P7-R2+ = NOT_AUTHORIZED_BY_NUMBERING
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
K2 AUTHORITY EXPANSION = NONE
P8-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
