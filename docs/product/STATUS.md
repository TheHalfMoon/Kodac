# Product Document Authority Status

The pre-existing files in `docs/product/` remain preserved historical planning inputs. They do not override accepted Kodac ADRs, live GitHub truth, root `AGENTS.md`, current roadmap views, or exact canonical authorization/evidence records.

This file is a current status view only. It grants no implementation, execution, provider/model, persistence, dependency, product, release, merge, or project-completion authority.

---

## Current canonical status

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
P2-R7+ = NOT_AUTHORIZED BY NUMBERING

P3-R1 THROUGH P3-R17 = CLOSED_CANONICAL INDIVIDUALLY
P3 BOUNDED R1-R17 ENGINEERING SCOPE = CLOSED_CANONICAL
P3 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R18+ = NOT_AUTHORIZED

TRUST_AND_VERIFICATION_MASTER_PLAN_V2_AMENDMENT = CLOSED_CANONICAL / PLANNING_DIRECTION_ONLY

P4-R1 = CLOSED_CANONICAL
P4-R2 = CLOSED_CANONICAL
P4 BOUNDED R1-R2 CLOSEOUT AUTHORIZATION = CLOSED_CANONICAL
P4 BOUNDED R1-R2 ENGINEERING SCOPE = CURRENT CLOSEOUT CANDIDATE / NOT YET CLOSED_CANONICAL
P4 OVERALL = OPEN
P4-R3+ = NOT_AUTHORIZED

P5-P9 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Current P4 product-facing meaning

P4-R1 and P4-R2 are internal bounded trust/evidence mechanisms, not product availability claims.

P4-R1 canonically provides one deterministic reviewer-claim evidence envelope over an existing KRI finding. It binds an explicit caller-owned risk hypothesis, evidence references, bounded verifier proposals as proposals only, exact review/head/scope/freshness state, and existing adjudication state. `CRITIC_STATE` remains `NOT_EVALUATED` in that slice.

P4-R2 canonically provides one deterministic structured critic disposition bound to one exact P4-R1 envelope with the closed vocabulary:

```text
SUPPORTED
CONTRADICTED
UNVERIFIED_CONCERN
DUPLICATE_OR_SUPERSEDED
```

Neither slice executes a reviewer, critic, verifier, provider, or model. Neither mutates KRI adjudication. Neither creates a public API/package surface.

---

## Canonical P4 proof anchors

```text
P4_R1_AUTHORIZATION = PR #323 / e59e2402333798e12f934f7b25c3cba5224bd651 / proof 5539462647
P4_R1_IMPLEMENTATION = PR #324 / d166e5305e2b9a400e9240ee7064bdf3c65f54aa / proof 5541190141
FOUNDER_EXTERNAL_REVIEW_POLICY = PR #325 / 94a62f8d794f7845dd2d999608fbb6fdd77ce7ab / proof 5541068578
P4_R2_AUTHORIZATION = PR #326 / 9443d15c02c143e4c4acc64b79817476b912ba1e / proof 5547225344
P4_R2_IMPLEMENTATION = PR #327 / 2641eb7493b6b6747f3cb56fa69e853305d54692 / proof 5547377851
P4_POST_R2_SUCCESSOR_ANALYSIS = PR #327 / comment 5547425939 / ANALYSIS_ONLY
P4_R1_R2_CLOSEOUT_AUTHORIZATION = PR #328 / f8641ec272301c991fe47cc879a45f10d48d3587 / proof 5547478904
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
```

---

## Current authorized unit

The only current P4 unit authorized by canonical PR #328 is a six-path documentation/evidence closeout candidate:

```text
docs/planning/KODAC_P4_BOUNDED_R1_R2_CANONICAL_CLOSEOUT_EVIDENCE_2026-09-05.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No seventh path is authorized.

The closeout remains candidate-state until exact-head qualification, guarded normal merge with exact expected-head protection, and mandatory post-merge proof complete.

Conditional result only:

```text
P4-R1 THROUGH P4-R2 INDIVIDUAL SLICES = CLOSED_CANONICAL
P4 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL
```

This does not establish:

```text
P4 OVERALL = CLOSED
P4-R3+ AUTHORITY
P5 AUTHORITY
REVIEWER / CRITIC / VERIFIER EXECUTION
VERIFICATION RESULT GENERATION
PRODUCT AVAILABILITY
PUBLIC RELEASE
PROJECT COMPLETION
```

---

## Material evidence integrity

P4-R1 and P4-R2 both preserve forward-only repair history rather than rewriting qualification as first-attempt success.

P4-R1 required a schema conditional-object parity repair and later forward-only reconciliation after Founder-governance movement of canonical `main`; frozen implementation blobs were preserved and exact-head CI was rerun.

P4-R2 repaired hostile Proxy trap exposure before validation rejection and Unicode length drift between JavaScript UTF-16 semantics and JSON Schema code-point semantics. Each byte movement invalidated prior-head qualification evidence.

---

## Founder review policy

Canonical PR #325 establishes:

```text
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
EXTERNAL_REVIEW = OPTIONAL_ADVISORY_EVIDENCE
EXTERNAL_REVIEW_OUTAGE != REPOSITORY_BLOCKER
```

Known actionable findings remain binding. Internal substantive semantic inspection, exact-head required CI, zero unresolved actionable threads, active ruleset/no-bypass proof, guarded merge, and post-merge proof remain mandatory.

---

## Product and release non-grants

```text
P2 OVERALL = OPEN
P3 OVERALL = OPEN
P4 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK EXECUTION = NOT_AUTHORIZED
P2-R7+ = NOT_AUTHORIZED BY NUMBERING
P3-R18+ = NOT_AUTHORIZED
P4-R3+ = NOT_AUTHORIZED
P5-P9 IMPLEMENTATION = NOT_AUTHORIZED
REVIEWER / CRITIC / VERIFIER / PROVIDER / MODEL EXECUTION = NOT_AUTHORIZED
KRI ADJUDICATION MUTATION = NOT_AUTHORIZED
VERIFIER PROPOSAL != VERIFICATION RESULT
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
PUBLIC SUPERIORITY / BEST-IN-CLASS CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Next product-status boundary

Do not update this page to state P4 bounded R1-R2 engineering closure until the current six-path closeout is itself post-merge proven.

After that proof, fresh governance analysis must determine whether a separate five-current-view reconciliation is required before any later successor can be authorized.
