# Kodac P7-R5 Serialized Preimage Repair Authorization

Date: 2026-09-05
Status: `AUTHORIZATION_CANDIDATE / DOCUMENTATION_ONLY / NOT_EFFECTIVE_UNTIL_CANONICAL_POST_MERGE_PROOF`

## Purpose

Authorize one later bounded forward-only repair for a material P7-R5 content-addressed identity validation defect discovered after the original P7-R5 merge and still present when canonical P7-R6 was built on top of that predecessor.

This document is an authorization candidate only. While unmerged or not post-merge proven it grants no implementation authority.

## Exact canonical basis

```text
CANONICAL_MAIN = 807bd28e131c1f929f8ba9f86c69dbdda3b79866
CANONICAL_MAIN_TREE = 62d5fdbb68ffa166ba601937acd9abb2697d6a50
P7_R5_IMPLEMENTATION_PR = #369
P7_R5_QUALIFIED_HEAD = 65e69bf8177526bd161aefac29185a783f41bab6
P7_R5_MERGE = b0ee0485e7b58d0583f86c16b34ebe5214467ae7
P7_R6_IMPLEMENTATION_PR = #373
P7_R6_QUALIFIED_HEAD = 709ed2c73d43ebf24d56865b9e77bc6bf2ae939e
P7_R6_MERGE = 807bd28e131c1f929f8ba9f86c69dbdda3b79866
POST_MERGE_DEFECT_ANALYSIS = PR #373 / comment 5554227350 / ANALYSIS_ONLY
WAIVER = NO
```

Live GitHub and later canonical state override these observations if they move before qualification or merge.

## Preserved audit truth

The material defect was first surfaced by CodeRabbit on PR #369 after P7-R5 had already merged. That timing does not erase the finding, and no retroactive claim is made that the original merge had reviewed this exact defect.

P7-R6 subsequently became canonical and explicitly revalidates an exact P7-R5 `VERIFICATION_PLAN_BOUND` predecessor. Therefore the unresolved R5 validator defect is transitively relevant to R6 trust and blocks further P7 successor advancement until repaired canonically.

No historical commit, review, proof, or identity is rewritten by this repair path.

## Exact defect

Canonical P7-R5 currently defines its binding identity as:

```text
bindingIdentity = sha256(JSON.stringify(core))
```

JavaScript object property order is therefore part of the identity preimage.

The current validator separately:

1. derives the expected binding from trusted predecessor/build input;
2. requires the supplied `bindingIdentity` to equal that expected identity; and
3. compares the supplied non-identity fields to expected semantics using a sorted-key canonical JSON comparison.

The sorted semantic comparison erases supplied object-order differences. A hostile or malformed serialized record can therefore keep exactly the expected field values and expected `bindingIdentity` while changing root or nested property order, yet still pass semantic validation even though its actual `JSON.stringify` preimage does not reproduce the claimed content-addressed identity.

This is a content-addressed consistency defect, not authority to change the identity definition.

## Conditional future implementation allowlist

Only after this exact authorization candidate independently qualifies, merges guarded, and receives complete post-merge proof may one later repair candidate modify exactly:

```text
packages/kodac-runtime/src/remediation/p7-post-apply-verification-plan-binding.ts
packages/kodac-runtime/test/p7-r5-post-apply-verification-plan-binding.test.ts
```

No third implementation path is authorized.

The P7-R5 JSON Schema is intentionally excluded because the defect is validator/preimage consistency, not representational schema shape.

## Required repair semantics

The later implementation must satisfy all of the following:

1. **Preserve the existing identity algorithm exactly.**

   ```text
   bindingIdentity(core) = sha256(JSON.stringify(core))
   ```

   The algorithm, field meanings, and valid builder-produced identity bytes must not change.

2. **Preserve historical identities.** No canonical P7-R5/R6 record is rewritten, migrated, rehashed, relabeled, or silently invalidated.

3. **Validate the supplied serialized preimage.** The validator must derive the supplied record's own non-identity core while preserving the record's actual property ordering, omitting only the `bindingIdentity` field, and require:

   ```text
   sha256(JSON.stringify(actual_supplied_core_preimage)) == claimed_binding_identity
   ```

4. **Retain source-derived semantic revalidation.** The new preimage check is additional. It must not replace the existing trusted-source reconstruction and semantic equality checks.

5. **Fail closed on ordering drift.** Focused regressions must demonstrate rejection of at least:
   - root-field reordering with otherwise identical values and the old expected identity;
   - nested `verificationPlan` field reordering with otherwise identical values and the old expected identity.

6. **Preserve valid builder output.** Existing canonical builder-produced order and identity must still validate unchanged.

7. **Remain pure/data-only.** No filesystem, Git, process, network, provider/model, K2, Done Gate, verification-engine, planner, patch-application, persistence, telemetry, dependency, or release behavior may be added.

## Explicit non-authority

This authorization does not authorize:

```text
R5_IDENTITY_ALGORITHM_CHANGE = NO
R5_HISTORICAL_RECORD_REWRITE = NO
R6_IDENTITY_ALGORITHM_CHANGE = NO
R6_IMPLEMENTATION_CHANGE = NO
P7_R7_PLUS = NO
VERIFICATION_ENGINE_INVOCATION = NO
VERIFICATION_EXECUTION = NO
VERIFICATION_REPORT_CREATION = NO
VERIFICATION_FAILED_OR_VERIFIED_STATE = NO
FIXED_OR_REVERIFIED_OR_DONE_GATE = NO
PATCH_APPLICATION_OR_AUTOFIX = NO
K2_INVOCATION_OR_APPROVAL_CREATION = NO
FILESYSTEM_OR_GIT_WRITE_RUNTIME = NO
NETWORK_OR_PROVIDER_MODEL_ACCESS = NO
NEW_DEPENDENCY_OR_DONOR_ADMISSION = NO
PERSISTENCE_TELEMETRY_UPLOAD_LEARNING = NO
PUBLIC_RELEASE_OR_DEPLOYMENT = NO
PROJECT_COMPLETION = NO
WAIVER = NO
```

## Successor freeze

Until the repair itself is canonical and post-merge proven:

```text
P7_R5_SERIALIZED_PREIMAGE_DEFECT = MATERIAL / UNRESOLVED
P7_R7_PLUS_SUCCESSOR_WORK = BLOCKED
```

A planning number, roadmap phrase, merged R6 implementation, or successful unrelated CI does not bypass this freeze.

## Qualification and merge gate for this authorization

Before this authorization candidate may merge, one unchanged exact head must prove:

- current canonical base freshness or explicit forward reconciliation;
- exactly one changed documentation path — this file;
- applicable CI terminal success or canonical docs-only non-applicability, without relabeling skipped/unavailable evidence as PASS;
- substantive semantic/security/governance inspection of the exact head confirming the defect characterization and two-path repair envelope are correct and non-expanding;
- zero unresolved actionable review findings/threads;
- live ruleset `20707483` active with no bypass relevant to the guarded merge;
- no waiver;
- guarded merge using the exact expected head SHA.

After merge, prove canonical `main`, ordered parents, merge tree/document blob identity, valid merge signature, and required applicable post-merge checks before this authorization becomes effective.

Only then may the exact two-path implementation begin from then-live canonical main.
