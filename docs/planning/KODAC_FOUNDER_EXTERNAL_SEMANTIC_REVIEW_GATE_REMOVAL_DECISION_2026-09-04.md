# Kodac Founder External Semantic Review Gate Removal Decision

## Record identity

- Date: 2026-09-04
- Decision owner: Kodac founder
- Founder authority: `KODAC-FOUNDER-EXTERNAL-REVIEW-GATE-REMOVAL-2026-09-04`
- Authority class: DOCUMENTATION / GOVERNANCE POLICY SUPERSESSION
- Canonical base commit: `e59e2402333798e12f934f7b25c3cba5224bd651`
- Canonical base tree: `ea412dbbe47f0b5f8f4bcd747896c8ef4f856fa1`
- Governing constitution: `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`
- Protected-main ruleset: `20707483`
- `WAIVER=NO`

## Founder decision

Kodac no longer requires an external, human, vendor-operated, or independently operated semantic reviewer as a merge-qualification gate.

From canonical adoption of this decision forward, every Kodac planning, authorization, implementation, reconciliation, closeout, or governance record that requires one or more external semantic-review channels is superseded **only with respect to that external-review requirement**.

The new repository-wide rule is:

```text
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
EXTERNAL_REVIEW = OPTIONAL_ADVISORY_EVIDENCE
EXTERNAL_REVIEW_AVAILABILITY != MERGE_AUTHORITY
EXTERNAL_REVIEW_OUTAGE != REPOSITORY_BLOCKER
DONE = EVIDENCE_BACKED_COMPLETION
```

This is a governance-policy change, not a one-PR waiver. `WAIVER=NO` remains true.

## Constitutional basis

ADR-0001 requires evidence-backed completion and says applicable verification evidence may include build, type checks, lint, tests, security checks, architecture/spec compliance, review, policy compliance, and execution receipts depending on task scope. It does not constitutionally require an external reviewer for every change.

ADR-0001 also requires model/provider agnosticism, reversibility, and Kodac-owned canonical truth. Making third-party reviewer availability a mandatory repository-progress dependency is therefore not required by the constitution.

The constitution's prohibition is against silent exceptions. This record makes the policy change explicit and canonical.

## Superseded review policy

This decision supersedes the review-cardinality requirements introduced or preserved by:

```text
docs/planning/KODAC_REVIEW_PROVIDER_NEUTRALITY_AND_EVIDENCE_QUORUM_AMENDMENT_2026-08-27.md
```

and every later canonical record that imported or restated that external-review quorum.

The provider-neutrality amendment remains effective for its non-review-cardinality protections, including the principle that provider identity is not repository authority. Its statements requiring one or more distinct external semantic reviewer channels are no longer merge gates after this decision becomes canonical.

Any historical record containing text such as:

```text
INDEPENDENT SUBSTANTIVE EXACT_HEAD SEMANTIC REVIEW = 2 / 2
EXTERNAL_SEMANTIC_REVIEW_COUNT >= 2
AT LEAST TWO DISTINCT INDEPENDENT EXTERNAL REVIEWER CHANNELS
```

is interpreted after canonical adoption as:

```text
EXTERNAL_SEMANTIC_REVIEW = OPTIONAL / NON_GATING
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
```

No historical document needs a byte rewrite merely to reflect this supersession.

## Preserved mandatory qualification evidence

Removing the external-review gate does **not** weaken machine, identity, scope, or protected-branch evidence.

Every live candidate must still satisfy all applicable non-review gates from its governing authorization, including:

1. exact candidate head identity;
2. exact current canonical base and `behind_by=0` where required;
3. exact authorized changed-path containment;
4. exact required tree/blob identity capture;
5. focused tests required by the governing scope;
6. full applicable tests;
7. applicable type checks, lint, static analysis, security checks, trusted-machine qualification, and dedicated execution evidence;
8. all protected-main required status checks in terminal success, or canonical proof of non-applicability where the governing record explicitly permits it;
9. zero unresolved material correctness, security, governance, authority, or scope defects known from any available evidence;
10. zero unresolved actionable review threads;
11. active ruleset `20707483` with `bypass_actors=[]` and `current_user_can_bypass=never`;
12. no unauthorized scope expansion, dependency admission, workflow mutation, provider execution, persistence, telemetry, release, or other authority-by-composition;
13. guarded normal merge using the exact expected candidate head SHA;
14. complete post-merge main/ordered-parent/tree/blob/signature/applicable-check/ruleset proof before canonical closure.

If an optional external review is present and identifies an actionable defect, the defect remains real evidence and must be reconciled before merge. Removing the requirement to obtain an external review does not permit ignoring an already-known substantive finding.

## Internal semantic inspection

The authoring/executing agent remains responsible for inspecting the complete candidate against its canonical authorization and for reconciling all observed defects before merge. Such inspection is part of normal engineering diligence but is not represented as independent external-review evidence.

Machine checks, deterministic proofs, exact identity binding, protected-main CI, and post-merge proof remain the authoritative completion evidence required by each scope.

## Effect on currently open candidates

After this decision is canonical and its post-merge proof succeeds, currently open candidates may be requalified under this policy without changing their repository bytes solely to remove stale external-review wording from their PR descriptions or historical authorization documents.

For such a candidate:

```text
HEAD MOVEMENT CAUSED BY REVIEW-POLICY REWORDING = NOT REQUIRED
EXTERNAL REVIEW SLOT = NOT A MERGE GATE
ALL NON-REVIEW GATES = MUST BE REVERIFIED LIVE
KNOWN ACTIONABLE FINDINGS = MUST BE ZERO
UNRESOLVED ACTIONABLE THREADS = MUST BE ZERO
```

This provision applies to PR #324 only after this governance decision is itself canonical and post-merge proven. It does not merge, qualify, or close PR #324 by assertion.

## Exact scope of this governance candidate

This candidate may change exactly one path:

```text
docs/planning/KODAC_FOUNDER_EXTERNAL_SEMANTIC_REVIEW_GATE_REMOVAL_DECISION_2026-09-04.md
```

No source, schema, test, workflow, dependency, lockfile, ruleset, runtime, product, benchmark, provider, model, reviewer integration, release, or other planning path is modified.

## Adoption gate

This decision remains non-canonical until one unchanged exact candidate proves:

```text
BASE_REF = main
BASE_SHA = e59e2402333798e12f934f7b25c3cba5224bd651
BASE_TREE = ea412dbbe47f0b5f8f4bcd747896c8ef4f856fa1
CHANGED_PATHS = EXACTLY 1
REQUIRED_REPOSITORY_CI = TERMINAL SUCCESS
UNRESOLVED_ACTIONABLE_THREADS = 0
RULESET 20707483 = active
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
EXTERNAL_SEMANTIC_REVIEW = NOT REQUIRED BY THIS FOUNDER GOVERNANCE DECISION
MERGE = GUARDED NORMAL MERGE USING exact expected_head_sha
POST_MERGE_PROOF = REQUIRED
WAIVER = NO
```

If canonical `main` moves before merge, the candidate must be non-destructively reconciled to the new canonical base and requalified. No force-push, rebase, direct protected-main write, stale evidence reuse, ruleset mutation, or bypass is authorized.

## Explicit non-grants

This decision does not authorize:

```text
CI BYPASS
TEST BYPASS
TRUSTED-MACHINE EVIDENCE REDUCTION
SCOPE EXPANSION
RULESET MUTATION
BYPASS ACTOR ADDITION
DIRECT PROTECTED-MAIN WRITE
IGNORING KNOWN ACTIONABLE FINDINGS
UNRESOLVED REVIEW-THREAD MERGE
STALE HEAD / BASE EVIDENCE REUSE
AUTHORITY BY NUMBERING
PROVIDER / MODEL / REVIEWER PRODUCT-RUNTIME EXECUTION
PERSISTENCE / TELEMETRY / LEARNING
PUBLIC RELEASE / PACKAGE PUBLICATION
PROJECT COMPLETION BY ASSERTION
```

`DONE = evidence-backed completion` remains binding.

`WAIVER=NO`
