# Kodac P7-R2 — Patch Application Authorization Record Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL MERGED_AND_POST_PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 8bf95e90e42a1c27193942b336a3bc744b7cd7d8
P7_R1_AUTHORIZATION = CLOSED_CANONICAL / PR #352 / proof 5552233040
P7_R1_IMPLEMENTATION = CLOSED_CANONICAL / PR #353 / proof 5552429216
P7_R1_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #355 / proof 5552575380
P7_SUCCESSOR_ANALYSIS = PR #355 / comment 5552596379 / ANALYSIS_ONLY
P7_R2_IMPLEMENTATION = NOT_AUTHORIZED UNTIL THIS RECORD QUALIFIES_MERGES_AND_POST_PROVES
PATCH_APPLICATION = NOT_AUTHORIZED
K2_INVOCATION = NOT_AUTHORIZED
AUTOFIX = NOT_AUTHORIZED
P7_R3_PLUS = NOT_AUTHORIZED_BY_NUMBERING
P8_P9_IMPLEMENTATION = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This record is one documentation-only authorization candidate. It creates no runtime, filesystem, Git, K2, patch-application, provider/model, persistence, product, release, or project-completion authority while unmerged or unproven.

---

## 2. Why this is the minimum non-duplicative successor

Fresh live-code inspection proved:

```text
P7_R1_PROPOSED_PATCH_RECORD = EXISTS
P7_AUTHORIZED_TO_APPLY_RECORD = NOT_FOUND
P7_PROPOSAL_TO_APPLICATION_AUTHORITY_BINDING = NOT_FOUND
P7_PROPOSAL_TO_K2_INTENT_BINDING = NOT_FOUND
K2_REPO_APPLY_PATCH = EXISTS
K2_GENERIC_ONE_SHOT_APPROVAL = EXISTS
K2_POLICY_GATE = EXISTS
K2_EXECUTION_RECEIPT = EXISTS
```

The existing K2 path accepts raw patch text, parses it, derives an execution intent over capability/paths/input digest, evaluates policy, may obtain one-shot approval, and can apply the patch. That generic K2 approval does not bind the canonical P7-R1 proposal identity, source finding/adjudication lineage, canonicalBase/targetHead, immutable patch-artifact identity, or P7 lifecycle state.

Canonical P7-R1 explicitly establishes:

```text
PROPOSAL != AUTHORIZATION_TO_APPLY
PROPOSAL != APPLIED
DECLARED_CHANGE_SET != EXECUTED_WRITE_SET
```

Canonical planning also requires `PROPOSED`, `AUTHORIZED_TO_APPLY`, `APPLIED`, `VERIFICATION_FAILED`, `VERIFIED`, `REJECTED`, and `SUPERSEDED` to remain distinct.

Therefore the minimum next P7 mechanism is not execution. It is one pure/data-only immutable authorization record that binds one exact valid P7-R1 proposal to an explicit bounded decision to permit a future application attempt without performing that attempt.

The label `P7-R2` is descriptive only. Authority comes only from this exact record after qualification, guarded merge, and post-merge proof.

---

## 3. Exact future implementation allowlist

Only after this authorization becomes canonical and post-merge proven may one later implementation candidate modify exactly:

```text
packages/kodac-runtime/src/remediation/p7-patch-application-authorization.ts
schema/p7-patch-application-authorization.schema.json
packages/kodac-runtime/test/p7-r2-patch-application-authorization.test.ts
```

No fourth path is authorized.

The later implementation must not modify P7-R1 bytes, K2, `repo.apply_patch`, generic approval/policy code, package-root exports, workflows, dependencies/lockfiles, current-view files, accepted ADRs, historical authorization/evidence, provider/model configuration, persistence/telemetry/learning, release configuration, rulesets, or any other path.

---

## 4. Required future contract semantics

The future implementation must remain pure/data-only and purpose-equivalent to:

```text
P7PatchApplicationAuthorization {
  version
  authorizationIdentity
  state = AUTHORIZED_TO_APPLY
  proposalIdentity
  proposalVersion
  repositoryIdentity
  canonicalBase
  targetHead
  patchArtifactDigest
  authorizerIdentity
  riskDisposition = ACCEPT_RISK
  rationale
  evidenceRefs[]
  writeAllowlist[]
}
```

Construction must take the full source P7-R1 proposal as input, validate it using the canonical P7-R1 validator, and derive all source-bound fields from that validated proposal rather than trusting caller-supplied duplicates.

Required source bindings:

```text
sourceProposal.version = p7-r1-immutable-patch-proposal-v1
sourceProposal.state = PROPOSED
proposalIdentity = sourceProposal.proposalIdentity
proposalVersion = sourceProposal.version
repositoryIdentity = sourceProposal.repositoryIdentity
canonicalBase = sourceProposal.canonicalBase
targetHead = sourceProposal.targetHead
patchArtifactDigest = sourceProposal.patchArtifactDigest
writeAllowlist = sourceProposal.changes[].path EXACTLY
```

The write allowlist must be non-empty, unique, deterministic, and in the exact canonical ascending order already proven by the source proposal. No path may be added, dropped, renamed, broadened, normalized into a different path, or supplied independently by the caller.

The authorization is a decision record, not a patch artifact or execution request. `riskDisposition` is fixed to `ACCEPT_RISK` for this contract; rejection, more-evidence, supersession, execution, verification, and completion states are not silently encoded as successful application authority.

`rationale`, `authorizerIdentity`, and `evidenceRefs` must be inert bounded deterministic data. Evidence references must be non-empty, unique, canonically ordered, and bounded. The authorization identity must be deterministic SHA-256 content addressing over the canonical validated preimage excluding only `authorizationIdentity` itself.

Returned records must be detached and deeply immutable. Caller-owned mutable input must not be retained by reference.

---

## 5. Required freshness and fail-closed semantics

This record authorizes only the exact source proposal state it binds. The future builder/validator must fail closed when any authority-relevant source fact is malformed, stale, inconsistent, or tampered.

At minimum it must reject:

```text
invalid P7-R1 proposal identity
non-PROPOSED source state
malformed repository/base/head/artifact identities inherited from source
source proposal tampering
caller-supplied source-field shadowing or unknown fields
empty/duplicate/non-canonical evidenceRefs
blank/over-limit authorizer or rationale
write allowlist divergence from source proposal changes
output authorizationIdentity mismatch
accessor/proxy/custom-prototype/aliased/non-JSON input graphs
mutation-after-call influence
```

The record does not establish that `targetHead` is still the live repository head at a later application time. Any future execution mechanism must independently prove freshness immediately before side effects.

---

## 6. Required safety and non-equivalence boundaries

```text
AUTHORIZED_TO_APPLY != PATCH_APPLICATION
AUTHORIZED_TO_APPLY != K2_EXECUTION
AUTHORIZED_TO_APPLY != GENERIC_K2_ONE_SHOT_APPROVAL
AUTHORIZED_TO_APPLY != APPLIED
AUTHORIZED_TO_APPLY != VERIFIED
AUTHORIZED_TO_APPLY != FIXED
AUTHORIZED_TO_APPLY != DONE_GATE
AUTHORIZED_TO_APPLY != PROJECT_COMPLETION
RISK_ACCEPTANCE != PROOF_OF_SAFETY
EVIDENCE_REFS != VERIFIED_EVIDENCE
WRITE_ALLOWLIST != EXECUTED_WRITE_SET
PATCH_ARTIFACT_DIGEST != PATCH_BYTES_VALIDATION
P7_R2 != K2_AUTHORITY_EXPANSION
P7_R2 != AUTOFIX
P7_R2 != P7_R3_PLUS_AUTHORITY
P7_R2 != P8_AUTHORITY
```

No implementation may fetch/parse/store/trust/apply patch bytes, read or write repository files for remediation, invoke Git/shell/process/K2/network/providers/models/secrets, install packages, persist/upload telemetry, or integrate a product/API/CLI surface.

---

## 7. Required adversarial qualification

The later implementation tests must cover at least:

```text
valid exact P7-R1 proposal -> deterministic AUTHORIZED_TO_APPLY record
identity independent of caller object-key insertion order
identity binds every authority-relevant field
source proposal validation is reused rather than reimplemented loosely
source proposal tamper / proposalIdentity mismatch rejection
source state must be PROPOSED
writeAllowlist exactly equals source proposal change paths
no caller-controlled write-scope expansion or reduction
bounded authorizerIdentity / rationale / evidenceRefs
evidenceRefs unique + canonical order
unknown-field rejection
malformed SHA/Git identities rejected through source validation
mutation-after-call does not affect output
returned nested data deeply frozen
proxy/accessor/custom-prototype/alias/non-JSON inputs fail closed
schema/runtime/test semantic agreement
explicit no filesystem / Git / process / K2 / network / provider / persistence execution surface
```

Focused tests and all repository-required CI must be terminal success on one unchanged exact head.

---

## 8. Qualification gate for this authorization candidate

Do not merge this authorization record unless one unchanged exact head proves:

```text
BASE == CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P7_R2_PATCH_APPLICATION_AUTHORIZATION_2026-09-05.md
REQUIRED_CI = TERMINAL_SUCCESS_OR_CANONICALLY_PROVEN_NON_APPLICABLE
INTERNAL_SUBSTANTIVE_SEMANTIC_SECURITY_INSPECTION = CLEAN
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
EXTERNAL_REVIEW = OPTIONAL_ADVISORY_EVIDENCE
RULESET_20707483 = active / bypass_actors=[] / current_user_can_bypass=never
MERGE = GUARDED_NORMAL_MERGE_USING_EXACT_EXPECTED_HEAD_SHA
POST_MERGE_PROOF = main + ordered parents + tree + authorization blob + verified/valid signature + applicable push checks + merged PR state + ruleset
WAIVER = NO
```

Any byte/head/base/qualification-relevant movement invalidates exact-head qualification evidence.

---

## 9. Candidate boundary

Until this exact one-path record qualifies, merges guarded, and passes mandatory post-merge proof:

```text
P7_R2_IMPLEMENTATION = NOT_AUTHORIZED
PATCH_APPLICATION = NOT_AUTHORIZED
K2_INVOCATION = NOT_AUTHORIZED
AUTOFIX = NOT_AUTHORIZED
P7_R3_PLUS = NOT_AUTHORIZED_BY_NUMBERING
P8_P9_IMPLEMENTATION = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
