# Kodac K6-R5 Trusted Qualification Ruleset Observability Repair Authorization

## Record identity

- Date: `2026-08-27`
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-27`
- Authority class: DOCUMENTATION / GOVERNANCE-REPAIR AUTHORIZATION CANDIDATE
- Canonical base commit: `76f8639a329d9f168fea9d71f78711d612075619`
- Canonical base tree: `03041afd20e677992e57b7210cd20bd804539ab0`
- Original R5 authorization: `docs/planning/KODAC_K6_R5_BOUNDED_STRATEGY_PROPOSAL_AND_QUALIFICATION_AUTHORIZATION_2026-08-27.md`
- Original R5 authorization blob: `8747754cc8563f2506869393221a4dac084e4805`
- Stage A adoption PR: `#225`
- Stage A qualified head: `0d004e51732ca10c67eae7305bd291898257053e`
- Stage A merge: `76f8639a329d9f168fea9d71f78711d612075619`
- Stage A trusted-workflow blob: `fbbb2a6f61d2b6e1d7390eebb85338bc467df6fb`
- Active Stage B implementation PR: `#226`
- Current observed Stage B head at incident capture: `a4bceb0b2cbb589c69433e39fde5e9efd307317d`
- Protected-main ruleset: `20707483` (`Kodac canonical main protection v1`)
- Ruleset trusted node ID: `RRS_lACqUmVwb3NpdG9yec5NVN5LzgE7-Js`
- Ruleset trusted snapshot `updated_at`: `2026-08-11T21:30:21.316+03:00`

This record is candidate authority only until merged to protected `main` through normal repository governance and post-merge proof. It grants no implementation authority before that point.

## Incident evidence

The R5 implementation candidate reached a state where ordinary repository-required exact-head checks succeeded:

```text
STAGE_B_HEAD=a4bceb0b2cbb589c69433e39fde5e9efd307317d
provenance=success
legacy-tests=success
k2-runtime-gate=success
```

The R5-specific qualification gates remained fail-closed:

```text
TRUSTED_RUN_ID=33076820743
TRUSTED_JOB=k6-r5-trusted-qualification
TRUSTED_CONCLUSION=failure

DEDICATED_RUN_ID=33076823905
DEDICATED_JOB=k6-r5-bounded-strategy-qualification
DEDICATED_CONCLUSION=failure
```

The base-controlled trusted inspector reached the live ruleset assertion after validating the protected base, Stage A adoption identity, authorization identity, predecessor blobs, exact six-path Stage B scope, candidate workflow control surface, immutable action pins, step order, and protected run-body fingerprints.

The failure was:

```text
K6-R5 trusted qualification failed: ruleset bypass state is not fail-closed
```

The Actions job token exposed only:

```text
Contents: read
Metadata: read
```

Under that token, the repository ruleset response does not expose the owner-level bypass metadata required by the existing assertion. Independently, an owner-level control-plane read at the same repository state proves:

```text
RULESET_ID=20707483
ENFORCEMENT=active
BYPASS_ACTORS=[]
CURRENT_USER_CAN_BYPASS=never
STRICT_REQUIRED_STATUS_CHECKS_POLICY=true
REQUIRED_STATUS_CHECKS=
  provenance / integration 15368
  legacy-tests / integration 15368
  k2-runtime-gate / integration 15368
```

Therefore the observed defect is not ruleset weakening and not a Stage B runtime failure. It is a mismatch between the proof demanded inside GitHub Actions and the fields visible to that least-privilege Actions token.

## Security decision

The repair MUST NOT make the unavailable fields appear by granting additional authority.

The following are forbidden repair strategies:

```text
WORKFLOW PERMISSION WIDENING
ADMINISTRATION PERMISSION
PERSONAL ACCESS TOKEN
REPOSITORY OR ORGANIZATION SECRET
ID-TOKEN / OIDC ESCALATION
RULESET MUTATION
BYPASS ACTOR MUTATION
REQUIRED-CHECK MUTATION
BRANCH-PROTECTION WEAKENING
FAIL-OPEN INTERPRETATION OF MISSING FIELDS
WAIVER
```

`permissions: contents: read` remains the trusted-workflow ceiling.

Absence of `bypass_actors` or `current_user_can_bypass` from an Actions-token response MUST mean only:

```text
BYPASS_STATE_VISIBILITY=UNAVAILABLE_UNDER_ACTIONS_TOKEN
```

It MUST NOT mean:

```text
BYPASS_ACTORS=[]
CURRENT_USER_CAN_BYPASS=never
```

No workflow may fabricate unobserved no-bypass evidence.

## Split-proof model

After and only after this authorization is canonical, R5 qualification may use a split proof:

### In-workflow observable proof

The trusted and dedicated R5 workflows may validate only the ruleset fields actually visible under their least-privilege token, while requiring exact equality for every visible control-plane field used by R5:

- ruleset ID;
- node ID when visible;
- exact `updated_at` instant;
- name;
- target;
- enforcement;
- source/source type when visible;
- exact `refs/heads/main` condition;
- exact rule type/order;
- exact pull-request rule semantics;
- strict required-status-check policy;
- exact three required contexts and integration IDs.

If `bypass_actors` or `current_user_can_bypass` is present in the workflow response, its value MUST still equal the canonical fail-closed value or the workflow MUST fail.

If either field is absent, the workflow MUST record visibility as unavailable and MUST NOT emit an internal no-bypass claim.

### External owner-level proof

The following remain mandatory external control-plane evidence and cannot be replaced by the workflow:

```text
RULESET_ID=20707483
RULESET_ENFORCEMENT=active
BYPASS_ACTORS=[]
CURRENT_USER_CAN_BYPASS=never
REQUIRED_STATUS_CHECKS_EXACT=true
```

This owner-level proof is required:

1. immediately before merging the trusted-workflow repair;
2. immediately after that repair merge;
3. on the final exact head of PR #226 before Stage B merge;
4. immediately before the guarded Stage B merge;
5. immediately after the Stage B merge;
6. during K6 bounded closeout reconciliation.

Any observed bypass actor, bypass capability, ruleset update, required-check drift, or inability to obtain the owner-level proof blocks progress. `WAIVER=NO`.

## Authorized Phase R5-QA — one-path trusted-workflow repair

After and only after this record is canonical and post-merge proven, authorize exactly one additional trusted-workflow repair PR that may modify exactly:

```text
.github/workflows/k6-r5-trusted-qualification.yml
```

No second path is authorized in that PR.

The repair may only:

1. replace the impossible in-workflow no-bypass assertion with the split-proof semantics above;
2. fail if a visible bypass field is non-canonical;
3. distinguish unavailable visibility from an empty/never value;
4. preserve `permissions: contents: read`;
5. preserve candidate-as-untrusted-data treatment and prohibit PR-head execution;
6. preserve exact Stage B six-path/status checks;
7. preserve immutable action pins and candidate workflow structural checks;
8. preserve all predecessor authorization/blob checks;
9. preserve all schema/runtime/authority negative-space checks;
10. update the protected expected SHA-256 only for the one dedicated Stage B run body whose ruleset assertion must adopt the same split-proof semantics;
11. bind protected-base evolution to the canonical repair lifecycle instead of requiring protected `main` to remain forever equal to the historical Stage A merge;
12. preserve Stage A adoption as an immutable ancestor and exact trust root;
13. add no product/runtime/persistence/network/provider/model/training/autofix/release authority.

The trusted repair MUST NOT accept arbitrary post-Stage-A protected bases. Its post-repair inspector must prove the canonical repair ancestry and exact registered repair PR/merge identity before treating the protected base as the current R5 trust root.

## Protected-base evolution requirement

The original trusted inspector assumes:

```text
STAGE_A_PR.merge_commit_sha == current protected base
```

That cannot remain true once this documentation authorization and the trusted repair itself are canonically merged.

The repair is therefore explicitly authorized to replace that historical equality with bounded canonical ancestry:

```text
STAGE_A_MERGE
  -> THIS AUTHORIZATION MERGE
  -> REGISTERED ONE-PATH TRUSTED REPAIR MERGE
```

The repaired workflow must still independently prove:

- the original Stage A PR/head/merge/tree/blob identity;
- this authorization document and canonical merge identity;
- the registered one-path repair PR is merged from the authorization merge;
- the current protected base is exactly that registered repair merge;
- ordered repair merge parents are the authorization merge and exact repair head;
- repair merge tree equals exact repair-head tree;
- the canonical trusted-workflow blob equals the registered repair-head blob;
- GitHub merge verification is valid;
- live protected `main` equals the protected workflow revision;
- ruleset visible fields match the pinned snapshot;
- external owner-level no-bypass proof remains separately mandatory.

No generic “descendant of Stage A” acceptance is authorized.

## Authorized Phase R5-QB — forward reconciliation of PR #226

Only after the one-path trusted repair is merged and post-merge proven may PR #226 move again.

PR #226 must be reconciled forward without rebase or force-push by incorporating canonical protected `main`.

The resulting compare from new protected `main` to PR #226 must still contain exactly the original six Stage B implementation paths and no seventh path.

Within those six paths, only the following qualification repair is newly authorized beyond the original R5 authorization:

```text
.github/workflows/k6-r5-bounded-strategy-qualification.yml
```

may update the existing live-ruleset proof step to the same split-proof semantics, with no permission widening and no other control-surface expansion.

The repaired trusted workflow must pin the exact new run-body SHA-256 for that dedicated proof step. All other protected Stage B run-body fingerprints remain unchanged unless a later canonical authorization explicitly says otherwise.

The dedicated workflow may report that bypass visibility is unavailable under the Actions token, but Stage B cannot merge until the separate owner-level no-bypass proof is captured at its exact final head and again immediately before merge.

No source/runtime/schema/test behavior is authorized to change merely to support this governance repair.

## Trusted repair qualification gate

The one-path trusted repair is not merge-qualified unless its exact final head proves:

1. base is exactly the canonical merge of this authorization;
2. changed-file set is exactly `.github/workflows/k6-r5-trusted-qualification.yml`;
3. `behind_by=0`;
4. PR is open, non-draft and mergeable;
5. workflow YAML/Python is structurally valid;
6. trigger remains the intended `pull_request_target` R5 boundary;
7. permissions remain exactly least privilege;
8. candidate head is never checked out or executed;
9. protected-base evolution is limited to the exact registered repair lifecycle above;
10. missing bypass fields are represented as unavailable visibility, never as empty/never proof;
11. visible non-canonical bypass fields fail closed;
12. all other Stage A trust-boundary invariants remain fail-closed;
13. applicable repository-required exact-head checks are terminal success;
14. fresh substantive exact-head CodeRabbit and Qodo review report no unresolved material correctness/security/governance/authority findings;
15. zero unresolved actionable review threads;
16. external owner-level ruleset proof confirms active/no-bypass/exact required checks;
17. final head/tree/workflow blob are captured;
18. merge uses normal GitHub merge-commit semantics with exact expected-head precondition;
19. mandatory post-merge parent/tree/blob/signature/check/control-plane proof succeeds;
20. `WAIVER=NO`.

Any head movement invalidates prior exact-head CI and review evidence.

## Stage B requalification gate after repair

After forward reconciliation, PR #226 must satisfy the original R5 Stage B acceptance gate plus all of the following on one exact final head:

- current protected base is the canonical trusted-repair merge;
- compare from protected base is still exactly six authorized Stage B paths;
- trusted R5 qualification succeeds using the repaired base-controlled inspector;
- dedicated R5 qualification succeeds using the authorized split-proof body;
- `provenance`, `legacy-tests`, and `k2-runtime-gate` succeed from integration `15368`;
- full R5 corpus/identity/adversarial/predecessor/runtime/Python/Ruff/provenance gates succeed where applicable;
- fresh substantive exact-head CodeRabbit and Qodo reviews are terminal clean;
- zero unresolved actionable review threads;
- owner-level ruleset proof is exact and fail-closed;
- no waiver is used;
- normal guarded merge uses the exact final head SHA.

Predecessor workflows whose canonical negative-space contracts intentionally reject later R5 surfaces are historical/non-applicable evidence and MUST NOT be mislabeled as green. Their failures do not replace the three active required contexts or the R5-specific gates.

## Post-merge proof

After Stage B merge, require at minimum:

1. protected `main` equals the returned Stage B merge;
2. ordered parent 1 equals the canonical trusted-repair merge;
3. ordered parent 2 equals the exact qualified Stage B head;
4. merge tree equals the exact qualified-head tree;
5. all six canonical Stage B blobs equal the qualified head;
6. GitHub merge signature is verified and valid;
7. applicable post-merge required checks succeed;
8. ruleset remains active;
9. owner-level `bypass_actors=[]`;
10. owner-level `current_user_can_bypass=never`;
11. exact required checks remain unchanged;
12. `WAIVER=NO`.

Only then may Stage B implementation be treated as canonically merged.

## R5 and K6 closeout remain separate

This repair does not itself close R5.

After Stage B post-merge proof, a separate roadmap/ledger reconciliation remains mandatory before declaring:

```text
K6-R5=CLOSED_CANONICAL
```

That reconciliation must update the repository’s canonical roadmap/ledger truth and then identify the next separately authorized unit. Per the current dependency order, K6 bounded closeout remains before general KodacBench.

## Preserved non-grants

This authorization does not grant:

```text
RULESET MUTATION
BYPASS
PERMISSION WIDENING
SECRET OR PAT USE
SEVENTH STAGE B PATH
MODEL / PROVIDER / REVIEWER INVOCATION
MODEL TRAINING / FINETUNING
PERSISTENCE / DATABASE / FILESYSTEM STORAGE
TELEMETRY / UPLOAD
NETWORK EGRESS OR FALLBACK
CROSS-REPOSITORY LEARNING
AUTOMATIC STRATEGY PROMOTION
TRUST-POLICY MUTATION
AUTOFIX
K2 AUTHORITY EXPANSION
K5 AUTHORITY EXPANSION
DONE GATE / PROVEN_READY AUTHORITY CHANGE
GENERAL KODACBENCH CLAIMS
PUBLIC RELEASE
```

## Decision

Until this record is canonical:

```text
PR_226=OPEN_PAUSED
STAGE_B_RUNTIME_REGRESSION_BLOCKER=NO
TRUSTED_RULESET_OBSERVABILITY_BLOCKER=YES
TRUSTED_REPAIR_AUTHORIZED=NO
STAGE_B_MERGE=BLOCKED
WAIVER=NO
```

After this record is canonical and post-merge proven:

```text
TRUSTED_REPAIR_AUTHORIZED=YES_ONE_PATH
PR_226_FORWARD_RECONCILIATION=AUTHORIZED_AFTER_TRUSTED_REPAIR_CLOSEOUT
STAGE_B_MERGE=STILL_REQUIRES_FRESH_EXACT_HEAD_PROOF
WAIVER=NO
```
