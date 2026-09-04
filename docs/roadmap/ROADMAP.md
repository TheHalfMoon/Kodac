# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, successor, merge, or project-completion authority. Live GitHub, root `AGENTS.md`, accepted ADRs, and exact canonical authorization/evidence records always win.

---

## Canonical program state

| Program / gate | Current state | Boundary |
| --- | --- | --- |
| K0 / K1 | **CLOSED** | Foundation only |
| K2 | **CLOSED** | Unique trusted side-effect execution boundary remains unchanged |
| K3 bounded R1-R6 | **CLOSED** | No later K3 authority by numbering |
| KRI-R1 through KRI-R4 | **CLOSED_CANONICAL** | Existing reviewer-intelligence substrate |
| K4 bounded R1-R5 | **CLOSED_CANONICAL** | Bounded data-only scope |
| K5 bounded R1-R5 | **CLOSED_CANONICAL** | Proof-review substrate; Done Gate unchanged |
| K6 bounded closeout | **CLOSED_CANONICAL** | No later authority by composition |
| P2-R1 through P2-R6 | **CLOSED_CANONICAL** | Bounded KodacBench mechanisms only |
| P2 overall | **OPEN** | General/public KodacBench not closed |
| P3-R1 through P3-R17 | **CLOSED_CANONICAL individually** | Bounded context/evidence mechanisms |
| P3 bounded R1-R17 engineering scope | **CLOSED_CANONICAL** | Aggregate bounded engineering closeout only |
| P3 overall | **OPEN** | No general benchmark-backed promotion/default/superiority conclusion |
| Trust and Verification Master Plan v2 amendment | **CLOSED_CANONICAL / PLANNING_DIRECTION_ONLY** | Future dependency map only |
| P4-R1 | **CLOSED_CANONICAL** | Reviewer Claim Evidence Envelope Foundation |
| P4-R2 | **CLOSED_CANONICAL** | Structured Critic Disposition |
| P4 bounded R1-R2 closeout authorization | **CLOSED_CANONICAL** | PR #328 / proof `5547478904` |
| P4 bounded R1-R2 engineering scope | **CURRENT CLOSEOUT CANDIDATE / NOT YET CLOSED_CANONICAL** | Requires its own exact-head qualification, guarded merge, and post-merge proof |
| P4 overall | **OPEN** | Bounded R1-R2 closeout is not P4 overall closure |
| P4-R3+ | **NOT_AUTHORIZED** | No authority by numbering |
| P5-P9 | **PLANNING DIRECTION ONLY / IMPLEMENTATION NOT_AUTHORIZED** | Fresh gap + separate authorization required |
| Project completion | **NOT_ESTABLISHED** | No project-completion proof exists |

Engineering milestone state is separate from public release status.

---

## Canonical P4 lineage

```text
P4-R1 authorization
  PR #323
  merge e59e2402333798e12f934f7b25c3cba5224bd651
  post-merge proof 5539462647

P4-R1 implementation
  PR #324
  qualified head 65299351ecaf8523e3da722fe0b691685b60e5ba
  merge d166e5305e2b9a400e9240ee7064bdf3c65f54aa
  post-merge proof 5541190141

Founder external-review policy supersession
  PR #325
  merge 94a62f8d794f7845dd2d999608fbb6fdd77ce7ab
  post-merge proof 5541068578
  REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0

P4-R2 authorization
  PR #326
  merge 9443d15c02c143e4c4acc64b79817476b912ba1e
  post-merge proof 5547225344

P4-R2 implementation
  PR #327
  qualified head 1067c65ee6c6eb70b0904390030cbb67cfaa6ac7
  merge 2641eb7493b6b6747f3cb56fa69e853305d54692
  post-merge proof 5547377851

Post-P4-R2 successor analysis
  PR #327 / comment 5547425939
  analysis-only / no authority created

P4 bounded R1-R2 closeout authorization
  PR #328
  merge f8641ec272301c991fe47cc879a45f10d48d3587
  post-merge proof 5547478904
```

---

## P4 bounded semantics

### P4-R1 — Reviewer Claim Evidence Envelope Foundation

P4-R1 is a deterministic, pure/data-only sidecar over an existing canonical KRI finding. It binds:

```text
existing KRI finding identity
+ exact review/head/scope/freshness state
+ explicit caller-owned risk hypothesis
+ explicit evidence references
+ bounded verifier proposals as proposals only
+ critic state NOT_EVALUATED
+ existing adjudication-state snapshot
-> deterministic content-addressed detached/frozen evidence envelope
```

Canonical implementation blobs:

```text
packages/kodac-runtime/src/reviewer-intelligence/p4-claim-envelope.ts
  e9a59acf25c05276dddf80e269be4ae03e5e6775
schema/p4-reviewer-claim-envelope.schema.json
  121b2b7b0286a4b7dea0e92bb2642218fbb1a50e
packages/kodac-runtime/test/p4-r1-reviewer-claim-envelope.test.ts
  93ff960800363e036c25948aa4fa19617540814d
```

P4-R1 does not execute a reviewer/provider/model/critic/verifier and does not create adjudication authority.

### P4-R2 — Structured Critic Disposition

P4-R2 binds one explicit caller-supplied critic disposition to one exact validated P4-R1 envelope. The closed vocabulary is:

```text
SUPPORTED
CONTRADICTED
UNVERIFIED_CONCERN
DUPLICATE_OR_SUPERSEDED
```

Canonical implementation blobs:

```text
packages/kodac-runtime/src/reviewer-intelligence/p4-critic-disposition.ts
  11b49b715fa5991deb6d2154d11c3cacbf310f92
schema/p4-critic-disposition.schema.json
  796bb3e5cd49994f2f7cfa477812ef5b0d291e99
packages/kodac-runtime/test/p4-r2-critic-disposition.test.ts
  7877e865b66a99763dab477938dc4e7b8b9d77a8
```

P4-R2 does not execute a critic or mutate KRI adjudication.

---

## Material P4 repair history preserved

P4-R1 required a forward-only JSON Schema conditional-object parity repair. Later canonical `main` movement caused by the Founder review-policy supersession was reconciled without rebase/force-push and without changing frozen implementation blobs. Final exact-head CI was rerun before merge.

P4-R2 internal semantic inspection found and repaired two genuine defects before qualification:

1. hostile `Proxy` values could reach reflection traps before rejection;
2. JavaScript UTF-16 length semantics diverged from JSON Schema Unicode-code-point `maxLength` semantics.

Both were repaired inside the three-path allowlist. Prior-head CI/review evidence was treated as stale after each movement.

---

## Why bounded closeout is next instead of P4-R3

Fresh canonical analysis after P4-R2 established:

```text
GAP-05 reviewer disagreement protocol = addressed by P4-R2
first-class verifier proposals = already present in P4-R1
actual verifier execution/results = later P5 planning direction
additional concrete P4 runtime/schema/test gap = none proven
P4-R3+ authority by numbering = rejected
```

The minimum supported current unit is therefore the separately authorized six-path P4 bounded R1-R2 engineering closeout.

---

## Current authorized closeout

Canonical PR #328 authorizes exactly:

```text
docs/planning/KODAC_P4_BOUNDED_R1_R2_CANONICAL_CLOSEOUT_EVIDENCE_2026-09-05.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No seventh path is authorized.

Only after the exact closeout candidate qualifies, merges with exact expected-head protection, and passes complete post-merge proof may it establish:

```text
P4-R1 THROUGH P4-R2 INDIVIDUAL SLICES = CLOSED_CANONICAL
P4 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL
```

It must preserve:

```text
P4 OVERALL = OPEN
P4-R3+ = NOT_AUTHORIZED
P5-P9 = IMPLEMENTATION NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
```

---

## Ordered improvement and trust program

The Trust and Verification v2 amendment defines dependency direction, not implementation authority:

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 KodacBench 2.0
   -> bounded R1-R6 mechanisms [CLOSED_CANONICAL]
   -> P2 overall [OPEN]
-> P3 Context Engine v2
   -> bounded R1-R17 mechanisms [CLOSED_CANONICAL]
   -> bounded engineering closeout [CLOSED_CANONICAL]
   -> P3 overall [OPEN]
-> P4 Reviewer Intelligence v2
   -> R1 Reviewer Claim Evidence Envelope [CLOSED_CANONICAL]
   -> R2 Structured Critic Disposition [CLOSED_CANONICAL]
   -> bounded R1-R2 engineering closeout [CURRENT CANDIDATE]
   -> P4 overall [OPEN]
-> P5 Proof and Verification Fabric [PLANNING DIRECTION ONLY]
-> P6 Security, Supply-Chain, and Attack Validation [PLANNING DIRECTION ONLY]
-> P7 Bounded Remediation [PLANNING DIRECTION ONLY]
-> P8 Agent Trust Gateway and Developer Distribution [PLANNING DIRECTION ONLY]
-> P9 Continuous Assurance [PLANNING DIRECTION ONLY]
-> R Advanced Research [PLANNING DIRECTION ONLY]
```

No later stage becomes authorized by appearing in this map.

---

## Preserved authority boundaries

```text
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE AUTHORITY = UNCHANGED
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
VERIFIER PROPOSAL != VERIFICATION RESULT
CRITIC DISPOSITION != KRI ADJUDICATION AUTHORITY
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## Next boundary

The immediate task is qualification, guarded merge, and mandatory post-merge proof of the authorized P4 bounded R1-R2 closeout candidate.

After that proof, fresh live analysis must determine whether the candidate-safe current views require a separate post-closeout reconciliation authorization and reconciliation. Only after any required reconciliation becomes canonical may fresh successor analysis consider later gaps.

```text
PLANNING DIRECTION != IMPLEMENTATION AUTHORITY
POST_MERGE PROOF != SUCCESSOR AUTHORITY
DONE = EVIDENCE_BACKED COMPLETION
```
