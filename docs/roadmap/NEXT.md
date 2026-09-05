# Kodac — NEXT

> **Start here before doing repository work.**

## Authority

This file is navigation/status only. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, successor, merge, or project-completion authority.

Before any mutation:

1. re-read live GitHub `main`, open PRs, exact heads, changed paths, checks, comments/reviews/threads, mergeability, and ruleset `20707483`;
2. read root `AGENTS.md`;
3. read this file;
4. read the exact canonical authorization/evidence record for the active unit;
5. execute only that unit and its explicit allowlist.

Live GitHub and exact canonical authorization/evidence records override this page.

---

## Current canonical truth

```text
K0 / K1 = CLOSED
K2 = CLOSED / TRUSTED SIDE-EFFECT EXECUTION BOUNDARY
K3 BOUNDED R1-R6 = CLOSED
KRI-R1 THROUGH KRI-R4 = CLOSED_CANONICAL
K4 BOUNDED R1-R5 = CLOSED_CANONICAL
K5 BOUNDED R1-R5 = CLOSED_CANONICAL
K6 BOUNDED CLOSEOUT = CLOSED_CANONICAL

P2-R1 THROUGH P2-R6 = CLOSED_CANONICAL
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R7+ = NOT_AUTHORIZED_BY_NUMBERING

P3 BOUNDED R1-R17 ENGINEERING SCOPE = CLOSED_CANONICAL
P3 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R18+ = NOT_AUTHORIZED

TRUST_AND_VERIFICATION_MASTER_PLAN_V2_AMENDMENT = CLOSED_CANONICAL / PLANNING_DIRECTION_ONLY

P4 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL
P4 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P4 OVERALL = OPEN
P4-R3+ = NOT_AUTHORIZED

P5-R1 EVIDENCE PROVENANCE BINDING = CLOSED_CANONICAL
P5-R2 EVIDENCE RELATION EDGE = CLOSED_CANONICAL
P5 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL / PR #341 / proof 5551577054
P5 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL / PR #343 / proof 5551673149
P5-R3+ = NOT_AUTHORIZED
P5 OVERALL = NOT_CLOSED

P6-R1 DETERMINISTIC SECURITY FINDING FOUNDATION = CLOSED_CANONICAL / PR #345 / proof 5551884329
P6 BOUNDED R1 ENGINEERING SCOPE = CLOSED_CANONICAL / PR #349 / proof 5552035602
P6 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL / PR #351 / proof 5552175515
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P6 OVERALL = NOT_CLOSED

P7-R1 AUTHORIZATION = CLOSED_CANONICAL / PR #352 / proof 5552233040
P7-R1 IMMUTABLE PATCH PROPOSAL FOUNDATION = CLOSED_CANONICAL / PR #353 / proof 5552429216
P7-R1 POST-MERGE CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL / PR #355 / proof 5552575380
P7-R2 PATCH-APPLICATION AUTHORIZATION = CLOSED_CANONICAL / PR #356 / proof 5552630320
P7-R2 PATCH-APPLICATION AUTHORIZATION IMPLEMENTATION = CLOSED_CANONICAL / PR #357 / proof 5552730805
P7-R2 POST-MERGE CURRENT-VIEW RECONCILIATION AUTHORIZATION = CLOSED_CANONICAL / PR #358 / proof 5552762029
P7-R2 POST-MERGE CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
P7-R3+ = NOT_AUTHORIZED_BY_NUMBERING
P7 OVERALL = NOT_CLOSED

PATCH_APPLICATION = NOT_AUTHORIZED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
FILESYSTEM / GIT WRITE = NOT_AUTHORIZED
REPOSITORY_WRITE_AUTHORITY = NONE
K2_INVOCATION = NOT_AUTHORIZED
K2 AUTHORITY EXPANSION = NONE
APPLIED / VERIFIED / FIXED / DONE = NOT_ESTABLISHED
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
PROVIDER_MODEL_INVOCATION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
P8-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## NOW — authorized P7-R2 five-current-view reconciliation

Canonical PR #358 and post-merge proof `5552762029` authorize exactly this documentation-only candidate:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized.

This candidate may record only already-proven canonical P7 truth. It changes no runtime, schema, tests, workflows, dependencies, historical authorization/evidence, KRI/K5/K2 authority, benchmark data, provider/model configuration, persistence, product implementation, release configuration, ruleset, or repository protection.

It cannot certify its own closure. Until guarded merge and complete external post-merge proof exist:

```text
P7-R2 POST-MERGE CURRENT-VIEW RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
```

---

## Canonical P7 lineage

```text
#355 P7-R1 post-merge current-view reconciliation
  merge 8bf95e90e42a1c27193942b336a3bc744b7cd7d8 / proof 5552575380

#355 comment 5552596379
  fresh successor analysis / ANALYSIS_ONLY

#356 P7-R2 patch-application authorization
  merge 0bd5aa263df07057b99bdf408a4b0cdab2636063 / proof 5552630320

#357 P7-R2 patch-application authorization implementation
  qualified head 39497ed25fac7ae7870b10c5b8f87eac73a6eb4d
  merge 7bf6af800c0fa2b6413d3284a4f97db2b8683547 / proof 5552730805

#357 comment 5552739213
  post-P7-R2 current-view reconciliation analysis / ANALYSIS_ONLY

#358 P7-R2 current-view reconciliation authorization
  qualified head 3cb314d513c2c41baad9f9d654e4961a3507d8bb
  merge 91f442a889ac825bca6a944830e64995be931da8 / proof 5552762029

CURRENT
  exact five-current-view reconciliation candidate
```

---

## Bounded P7-R1 / P7-R2 meaning

P7-R1 is a pure/data-only immutable `PROPOSED` record. P7-R2 is a separate pure/data-only immutable `AUTHORIZED_TO_APPLY` decision record derived from one exact validated P7-R1 proposal.

Canonical P7-R2 implementation blobs:

```text
packages/kodac-runtime/src/remediation/p7-patch-application-authorization.ts
  = a8740b04e650c3317b65584ecdac6c8a4b764d10
schema/p7-patch-application-authorization.schema.json
  = fec866d048a1d4fc93d712fbd676030bbd93d24f
packages/kodac-runtime/test/p7-r2-patch-application-authorization.test.ts
  = 6764094e259ef5b22d5899ab5104f969e9f27fd2
```

Required non-equivalences:

```text
PATCH_PROPOSAL != AUTHORIZATION_TO_APPLY
AUTHORIZED_TO_APPLY != PATCH_APPLICATION
AUTHORIZED_TO_APPLY != K2_EXECUTION
AUTHORIZED_TO_APPLY != GENERIC_K2_ONE_SHOT_APPROVAL
AUTHORIZED_TO_APPLY != APPLIED_PATCH
AUTHORIZED_TO_APPLY != VERIFIED_REMEDIATION
AUTHORIZED_TO_APPLY != FIXED_FINDING
AUTHORIZED_TO_APPLY != DONE_GATE
WRITE_ALLOWLIST != EXECUTED_WRITE_SET
P7-R2 CLOSED != P7-R3+ AUTHORITY
P7-R2 CLOSED != P7 OVERALL CLOSED
P7-R2 CLOSED != P8 AUTHORITY
P7-R2 CLOSED != PROJECT COMPLETION
```

---

## THEN — proof and fresh successor-authority analysis

Only after this exact five-path reconciliation qualifies, merges guarded, and passes complete post-merge proof may fresh successor-authority analysis run from live code and canonical planning.

Do not infer P7-R3, patch application, K2 execution, autofix, P8/P9, product/release work, or project completion by numbering or composition.

## Navigation

- Working rules: `AGENTS.md`
- P7-R1 authorization: `docs/planning/KODAC_P7_R1_IMMUTABLE_PATCH_PROPOSAL_AUTHORIZATION_2026-09-05.md`
- P7-R2 authorization: `docs/planning/KODAC_P7_R2_PATCH_APPLICATION_AUTHORIZATION_2026-09-05.md`
- P7-R2 reconciliation authorization: `docs/planning/KODAC_P7_R2_POST_MERGE_CURRENT_VIEW_RECONCILIATION_AUTHORIZATION_2026-09-05.md`
- Trust v2 direction: `docs/planning/KODAC_TRUST_AND_VERIFICATION_MASTER_PLAN_V2_AMENDMENT_2026-09-02.md`
- Final gap review: `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`
