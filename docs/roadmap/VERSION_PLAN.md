# Kodac Version Plan

## Purpose

This file summarizes current version/program sequencing. It is not an authorization record. Live GitHub, root `AGENTS.md`, accepted ADRs, and exact canonical authorization/evidence records control implementation and merge authority.

---

## Current bounded program state

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
P2-R7+ = NOT_AUTHORIZED BY NUMBERING
GENERAL / PUBLIC KODACBENCH = NOT CLOSED

P3-R1 THROUGH P3-R17 = CLOSED_CANONICAL INDIVIDUALLY
P3 BOUNDED R1-R17 ENGINEERING SCOPE = CLOSED_CANONICAL
P3 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R18+ = NOT_AUTHORIZED

P4-R1 = CLOSED_CANONICAL
P4-R2 = CLOSED_CANONICAL
P4 BOUNDED R1-R2 CLOSEOUT AUTHORIZATION = CLOSED_CANONICAL
P4 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL
P4 BOUNDED R1-R2 CLOSEOUT = PR #329 / 6f65503fa4abdcf5c20c15d2e54265ab01c929d3 / proof 5547554548
P4 POST-CLOSEOUT RECONCILIATION AUTHORIZATION = CLOSED_CANONICAL / PR #330 / proof 5547581664
P4 OVERALL = OPEN
P4-R3+ = NOT_AUTHORIZED

P5-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Canonical P4 sequence

```text
#323  P4-R1 authorization
  -> #324  P4-R1 Reviewer Claim Evidence Envelope implementation
  -> #325  Founder external semantic-review gate supersession
  -> #326  P4-R2 authorization
  -> #327  P4-R2 Structured Critic Disposition implementation
  -> #327 comment 5547425939 fresh analysis: no justified P4-R3 mechanism
  -> #328  bounded R1-R2 engineering closeout authorization
  -> #329  bounded R1-R2 canonical closeout
  -> #329 comment 5547558110 post-closeout reconciliation analysis
  -> #330  post-closeout five-current-view reconciliation authorization
  -> CURRENT: five-current-view reconciliation
```

Canonical merge/proof anchors:

```text
#323 = e59e2402333798e12f934f7b25c3cba5224bd651 / proof 5539462647
#324 = d166e5305e2b9a400e9240ee7064bdf3c65f54aa / proof 5541190141
#325 = 94a62f8d794f7845dd2d999608fbb6fdd77ce7ab / proof 5541068578
#326 = 9443d15c02c143e4c4acc64b79817476b912ba1e / proof 5547225344
#327 = 2641eb7493b6b6747f3cb56fa69e853305d54692 / proof 5547377851
#328 = f8641ec272301c991fe47cc879a45f10d48d3587 / proof 5547478904
#329 = 6f65503fa4abdcf5c20c15d2e54265ab01c929d3 / proof 5547554548
#330 = fa74f7653a2105152fc48aacc293e98142fea7fa / proof 5547581664
```

---

## P4 R1-R2 release-independent meaning

P4-R1 and P4-R2 are internal bounded deterministic trust/evidence contracts. Their canonical closure does not imply package publication, API stability, product readiness, provider/model availability, or release authority.

P4-R1 provides:

```text
KRI finding
-> reviewer-claim evidence envelope
-> explicit risk hypothesis
-> evidence refs
-> bounded verifier proposals as proposals only
-> critic state NOT_EVALUATED
-> exact head/scope/freshness/adjudication binding
```

P4-R2 provides:

```text
exact P4-R1 envelope
-> explicit critic disposition
-> SUPPORTED | CONTRADICTED | UNVERIFIED_CONCERN | DUPLICATE_OR_SUPERSEDED
-> evidence refs
-> deterministic identity
```

Neither executes a reviewer, critic, verifier, provider, or model. Neither mutates KRI adjudication.

---

## Current reconciliation

Canonical PR #330 authorizes exactly these five current views and no sixth path:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

The reconciliation records already-proven bounded P4 closure. It does not create implementation authority.

It must still pass exact-head CI, internal substantive semantic inspection, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact `expected_head_sha`, and mandatory post-merge proof.

---

## Future dependency map

The canonical Trust and Verification v2 amendment preserves this planning direction:

```text
P2  KodacBench 2.0
P3  Context Engine v2
P4  Reviewer Intelligence v2
P5  Proof and Verification Fabric
P6  Security, Supply-Chain, and Attack Validation
P7  Bounded Remediation
P8  Agent Trust Gateway and Developer Distribution
P9  Continuous Assurance
R   Advanced Research
```

This map does not grant implementation authority.

After this P4 current-view reconciliation is post-merge proven, fresh repository evidence must determine any later minimum bounded unit. No P4-R3 or P5 unit advances by numbering.

---

## Founder review policy

Canonical PR #325 establishes:

```text
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
EXTERNAL_REVIEW = OPTIONAL_ADVISORY_EVIDENCE
EXTERNAL_REVIEW_AVAILABILITY != MERGE_AUTHORITY
DONE = EVIDENCE_BACKED_COMPLETION
```

All other qualification requirements remain effective: exact-head identity, required CI, internal substantive semantic inspection, zero known actionable defects, zero unresolved actionable threads, active protected-main rules, guarded merge, and mandatory post-merge proof.

---

## Preserved non-grants

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
CRITIC DISPOSITION != KRI ADJUDICATION AUTHORITY
REVIEW AGREEMENT != PROOF
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Version/release boundary

No version bump, package publication, release tag, deployment, public benchmark claim, or product availability change is authorized by this reconciliation. Version/release work requires its own exact canonical authority.
