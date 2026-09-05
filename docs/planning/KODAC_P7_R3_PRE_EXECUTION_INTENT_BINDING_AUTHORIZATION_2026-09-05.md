# Kodac P7-R3 — Pre-Execution Intent Binding Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL_MERGED_AND_POST_PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Canonical basis

```text
CANONICAL_MAIN_AT_CANDIDATE_START = d74cf1379316ee9d5b121fbb7b536772ec7cea00
P7_R1 = CLOSED_CANONICAL
P7_R2 = CLOSED_CANONICAL
P7_R2_CURRENT_VIEW_RECONCILIATION = CLOSED_CANONICAL / PR #359 / proof 5552811852
P7_SUCCESSOR_ANALYSIS = PR #359 / comment 5552837458 / ANALYSIS_ONLY
P7_R3_IMPLEMENTATION = NOT_AUTHORIZED UNTIL THIS RECORD QUALIFIES_MERGES_AND_POST_PROVES
PATCH_APPLICATION = NOT_AUTHORIZED
K2_INVOCATION = NOT_AUTHORIZED
AUTOFIX = NOT_AUTHORIZED
P8_P9_IMPLEMENTATION = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The label `P7-R3` is descriptive only. Authority comes only from this exact record after exact-head qualification, guarded merge, and complete post-merge proof.

This record is documentation-only. While unmerged or unproven it creates no runtime, filesystem, Git, K2, patch-application, provider/model, persistence, product, release, or project-completion authority.

---

## 2. Why this is the minimum non-duplicative successor

Fresh live-code and canonical-planning inspection proves:

```text
P7_R1_PROPOSAL = EXISTS
P7_R2_AUTHORIZED_TO_APPLY_RECORD = EXISTS
P7_R2_AUTHORIZATION_IDENTITY = EXISTS
P7_R2_EXACT_WRITE_ALLOWLIST = EXISTS
P7_R2_PATCH_ARTIFACT_DIGEST = EXISTS
CANONICAL_PURE_PATCH_PARSER = EXISTS
K2_REPO_APPLY_PATCH = EXISTS
K2_EXECUTION_INTENT = capability + paths + inputDigest
K2_EXECUTION_INTENT_AUTHORIZATION_IDENTITY = ABSENT
P7_AUTHORIZATION_TO_K2_INTENT_BINDING = ABSENT
P7_AUTHORIZATION_TO_PATCH_BYTES_DIGEST_VALIDATION = ABSENT
P7_AUTHORIZATION_TO_PARSED_OPERATION_PATH_SHAPE_BINDING = ABSENT
K2_EXECUTION_RECEIPT = EXISTS
KRI_FIXED_REVERIFIED_LIFECYCLE = EXISTS
K5_EXECUTION_RECEIPT_EVIDENCE_LINKAGE = EXISTS
```

Canonical Trust and Verification v2 preserves:

```text
AUTHORITY != EXECUTION
EXECUTION != COMPLETION
```

and requires `PROPOSED`, `AUTHORIZED_TO_APPLY`, `APPLIED`, `VERIFICATION_FAILED`, `VERIFIED`, `REJECTED`, and `SUPERSEDED` to remain distinct. It also states that future execution requests should bind authorization identity and exact scope where applicable.

The existing K2 `repo.apply_patch` intent is created from raw patch text as:

```text
capability = repo.apply_patch
paths = unique parsed patch paths
inputDigest = sha256(patchText)
```

It does not carry or validate P7-R2 `authorizationIdentity`, P7-R1 `proposalIdentity`, repository identity, canonical base, target head, patch artifact identity, or the exact P7 write allowlist.

Direct K2 mutation before establishing a deterministic P7-to-K2 contract would cross the trusted side-effect boundary prematurely. The minimum successor is therefore one pure/data-only immutable pre-execution binding contract. It may validate and bind inert patch text but may not invoke or modify K2.

---

## 3. Exact future implementation allowlist

Only after this authorization becomes canonical and post-merge proven may one later implementation candidate modify exactly:

```text
packages/kodac-runtime/src/remediation/p7-patch-execution-intent-binding.ts
schema/p7-patch-execution-intent-binding.schema.json
packages/kodac-runtime/test/p7-r3-patch-execution-intent-binding.test.ts
```

No fourth path is authorized.

The later implementation must not modify:

```text
P7-R1 bytes
P7-R2 bytes
packages/kodac-runtime/src/edit/patch.ts
packages/kodac-runtime/src/execution/gateway.ts
packages/kodac-runtime/src/trust/policy.ts
packages/kodac-runtime/src/evidence/receipt.ts
packages/kodac-runtime/src/tools/apply-patch.ts
package-root exports
workflows
dependencies / lockfiles
current-view files
accepted ADRs
historical authorization / evidence
KRI / K5 / K2 authority
provider / model configuration
persistence / telemetry / learning
product / release configuration
rulesets / branch protection
```

---

## 4. Required future contract semantics

The future implementation must remain pure/data-only and purpose-equivalent to:

```text
P7PatchExecutionIntentBinding {
  version
  bindingIdentity
  authorizationIdentity
  authorizationVersion
  proposalIdentity
  proposalVersion
  repositoryIdentity
  canonicalBase
  targetHead
  patchArtifactDigest
  capability = repo.apply_patch
  inputDigest
  paths[]
  operations[] {
    path
    operation = ADD | MODIFY | DELETE
  }
  patchByteLength
}
```

Construction must take:

```text
sourceProposal
sourceAuthorization
patchText
```

and must:

1. validate the complete source P7-R1 proposal using the canonical P7-R1 validator;
2. validate the complete source P7-R2 authorization against that exact source proposal using the canonical P7-R2 validator;
3. treat `patchText` as inert caller data only;
4. enforce an explicit UTF-8 patch artifact bound of `1_048_576` bytes before parsing or identity construction;
5. compute `sha256(patchText)` and require exact equality with `sourceAuthorization.patchArtifactDigest`;
6. parse the exact patch text using the existing canonical pure `parsePatch` parser;
7. reject move semantics because P7-R1 has no `MOVE` operation;
8. require exactly one parsed file operation per P7-R1 declared change path;
9. map parsed `add/update/delete` to P7-R1 `ADD/MODIFY/DELETE` and require exact path+operation equality with the complete canonical P7-R1 change projection;
10. derive all output fields from validated predecessors and exact patch text rather than trusting caller duplicates.

Required derived bindings:

```text
authorizationIdentity = validated sourceAuthorization.authorizationIdentity
authorizationVersion = validated sourceAuthorization.version
proposalIdentity = validated sourceProposal.proposalIdentity
proposalVersion = validated sourceProposal.version
repositoryIdentity = validated sourceAuthorization.repositoryIdentity
canonicalBase = validated sourceAuthorization.canonicalBase
targetHead = validated sourceAuthorization.targetHead
patchArtifactDigest = validated sourceAuthorization.patchArtifactDigest
capability = repo.apply_patch
inputDigest = sha256(patchText) = patchArtifactDigest
paths = validated sourceAuthorization.writeAllowlist EXACTLY
operations = validated sourceProposal.changes projected to { path, operation } EXACTLY
patchByteLength = exact UTF-8 byte length of patchText
```

The binding identity must be deterministic SHA-256 content addressing over the canonical normalized output projection excluding only `bindingIdentity` itself.

Returned records must be detached and deeply immutable. Caller-owned mutable values must not be retained by reference.

---

## 5. Required parsing and fail-closed semantics

At minimum the future builder/validator must reject:

```text
invalid or tampered P7-R1 proposal
invalid or tampered P7-R2 authorization
P7-R2 authorization not bound to the exact P7-R1 proposal
empty patchText
patchText over 1_048_576 UTF-8 bytes
patch digest mismatch
malformed patch syntax
zero patch operations
move operation / movePath
parsed path outside authorization.writeAllowlist
parsed path missing from authorization.writeAllowlist
parsed path duplication / repeated file operation
parsed operation mismatch against P7-R1 declared change operation
parsed operation/path count mismatch
caller-supplied output/binding fields
unknown fields
output bindingIdentity mismatch
proxy/accessor/custom-prototype/symbol/sparse/cyclic/aliased/non-JSON predecessor structures
mutation-after-call influence
```

The parser may be reused only as a pure parser. The future contract must not call `applyHunks` or any filesystem-backed patch application surface.

---

## 6. Freshness and proof boundaries

The future binding records the already-authorized `targetHead`; it does **not** prove that target head is still live at application time.

```text
BOUND_TARGET_HEAD != LIVE_HEAD_PROOF
PATCH_DIGEST_MATCH != SAFE_PATCH
PARSED_OPERATION_MATCH != FILESYSTEM_STATE_MATCH
PRE_EXECUTION_BINDING != K2_AUTHORITY
PRE_EXECUTION_BINDING != PATCH_APPLICATION
```

Any future side-effect mechanism must independently prove immediately before mutation that repository state, target head, write scope, predecessor state, authorization, and all execution prerequisites remain current and valid.

This authorization does not define or authorize that future mechanism.

---

## 7. Required safety and non-equivalence boundaries

```text
P7_R3_BINDING != PATCH_APPLICATION
P7_R3_BINDING != K2_EXECUTION
P7_R3_BINDING != GENERIC_K2_ONE_SHOT_APPROVAL
P7_R3_BINDING != APPLIED
P7_R3_BINDING != VERIFICATION_FAILED
P7_R3_BINDING != VERIFIED
P7_R3_BINDING != FIXED
P7_R3_BINDING != REVERIFIED
P7_R3_BINDING != DONE_GATE
P7_R3_BINDING != AUTOFIX
P7_R3_BINDING != PROJECT_COMPLETION
PATCH_ARTIFACT_DIGEST_MATCH != PATCH_SEMANTIC_CORRECTNESS
WRITE_ALLOWLIST_MATCH != EXECUTED_WRITE_SET
P7_R3 != P7_R4_PLUS_AUTHORITY
P7_R3 != P8_AUTHORITY
```

No implementation may read or write repository files for remediation, invoke Git/shell/process/K2/network/providers/models/secrets, install packages, persist/upload telemetry, modify policy/approval behavior, emit an execution receipt, claim a live repository head, mark a finding fixed/reverified, invoke verification, or integrate a CLI/API/package-root/product/release surface.

---

## 8. Required adversarial qualification

The later implementation tests must cover at least:

```text
valid R1 + valid R2 + exact patch text -> deterministic binding
binding identity independent of caller object-key insertion order
complete R1 and R2 canonical validators are reused
R1/R2 mismatch rejection
patch digest exact match requirement
UTF-8 byte boundary acceptance and limit+1 rejection
canonical parser reuse
ADD / MODIFY / DELETE exact operation mapping
move operation rejection
extra / missing / duplicate / reordered parsed path rejection where semantically applicable
operation mismatch rejection
exact paths == R2 writeAllowlist
exact inputDigest == patchArtifactDigest
no caller-controlled capability / paths / inputDigest / authorization identity
mutation-after-call isolation
deeply frozen output
unknown-field rejection
proxy/accessor/custom-prototype/alias/non-JSON failure
schema/runtime/test semantic agreement
explicit no applyHunks / filesystem / Git / process / K2 / network / provider / persistence execution surface
```

Focused tests and all repository-required CI must be terminal success on one unchanged exact head.

---

## 9. Qualification gate for this authorization candidate

Do not merge this authorization record unless one unchanged exact head proves:

```text
BASE == CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P7_R3_PRE_EXECUTION_INTENT_BINDING_AUTHORIZATION_2026-09-05.md
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

## 10. Candidate boundary

Until this exact one-path record qualifies, merges guarded, and passes mandatory post-merge proof:

```text
P7_R3_IMPLEMENTATION = NOT_AUTHORIZED
PATCH_APPLICATION = NOT_AUTHORIZED
K2_INVOCATION = NOT_AUTHORIZED
AUTOFIX = NOT_AUTHORIZED
P7_R4_PLUS = NOT_AUTHORIZED_BY_NUMBERING
P8_P9_IMPLEMENTATION = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
