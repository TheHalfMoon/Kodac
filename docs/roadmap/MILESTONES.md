# Kodac Engineering Milestones

## Authority

This file is a current milestone ledger. It does not authorize implementation, execution, release, provider/model access, persistence, learning, dependencies, benchmark execution, donor intake, public claims, successor work, merge, or project completion. Live GitHub, root `AGENTS.md`, accepted ADRs, and exact canonical authorization/evidence records remain authoritative.

---

## Current milestone ledger

| Milestone / gate | Status | Current boundary |
| --- | --- | --- |
| K0 / K1 | **CLOSED** | Architecture/governance foundation |
| K2 | **CLOSED** | Trusted side-effect execution boundary |
| K3 bounded R1-R6 | **CLOSED** | K3-R7+ not authorized by numbering |
| KRI-R1 through KRI-R4 | **CLOSED_CANONICAL** | Existing reviewer-intelligence substrate |
| K4 bounded R1-R5 | **CLOSED_CANONICAL** | Data-only bounded scope |
| K5 bounded R1-R5 | **CLOSED_CANONICAL** | Proof-review bounded scope; Done Gate unchanged |
| K6 bounded closeout | **CLOSED_CANONICAL** | No later authority by composition |
| P2-R1 through P2-R6 | **CLOSED_CANONICAL** | Bounded benchmark/evidence mechanisms |
| P2 overall | **OPEN** | General/public KodacBench not closed |
| P2-R7+ | **NOT_AUTHORIZED BY NUMBERING** | Fresh analysis required |
| P3-R1 through P3-R17 | **CLOSED_CANONICAL individually** | Bounded context/evidence mechanisms |
| P3 bounded R1-R17 engineering scope | **CLOSED_CANONICAL** | Aggregate bounded engineering closeout only |
| P3 post-closeout current-view reconciliation | **CLOSED_CANONICAL** | Canonical current-view state |
| P3 overall | **OPEN** | No general benchmark-backed promotion/superiority/default established |
| P3-R18+ | **NOT_AUTHORIZED** | No later slice by numbering |
| Trust and Verification Master Plan v2 amendment | **CLOSED_CANONICAL / PLANNING_DIRECTION_ONLY** | P4-P9 dependency direction only |
| Trust v2 post-adoption current-view reconciliation | **CLOSED_CANONICAL** | Predecessor current views reconciled before P4 work |
| P4-R1 | **CLOSED_CANONICAL** | PR #324 / `d166e5305e2b9a400e9240ee7064bdf3c65f54aa` / proof `5541190141` |
| Founder external-review policy supersession | **CLOSED_CANONICAL** | PR #325 / proof `5541068578`; external semantic review cardinality = 0 |
| P4-R2 | **CLOSED_CANONICAL** | PR #327 / `2641eb7493b6b6747f3cb56fa69e853305d54692` / proof `5547377851` |
| P4 bounded R1-R2 closeout authorization | **CLOSED_CANONICAL** | PR #328 / `f8641ec272301c991fe47cc879a45f10d48d3587` / proof `5547478904` |
| P4 bounded R1-R2 engineering scope | **CLOSED_CANONICAL** | PR #329 / `6f65503fa4abdcf5c20c15d2e54265ab01c929d3` / proof `5547554548` |
| P4 post-closeout current-view reconciliation authorization | **CLOSED_CANONICAL** | PR #330 / `fa74f7653a2105152fc48aacc293e98142fea7fa` / proof `5547581664` |
| P4 post-closeout current-view reconciliation | **CLOSED_CANONICAL** | PR #331 / `af6a225e5151ed5717d112ee9281f440f32d4693` / proof `5550826662` |
| P4 overall | **OPEN** | Bounded R1-R2 closeout is not overall closure |
| P4-R3+ | **NOT_AUTHORIZED** | Fresh concrete gap + separate authority required |
| P5-R1 authorization | **CLOSED_CANONICAL** | PR #332 / `39a732aecee8ebd69c5f294d2aa135288edc6d97` / proof `5550880869` |
| P5-R1 Evidence Provenance Binding | **CLOSED_CANONICAL** | PR #333 / `cef7a375e366795913879bed82f3d2bffe7647aa` / proof `5550968215` |
| P5-R1 post-merge current-view reconciliation authorization | **CLOSED_CANONICAL** | PR #334 / `3ef17af23c686b18aa0f383c681b72c672137d51` / proof `5550995814` |
| P5-R2+ | **NOT_AUTHORIZED** | Fresh non-duplicative gap + separate authority required |
| P5 overall | **NOT_CLOSED** | P5-R1 bounded closure is not P5 overall closure |
| P6-P9 | **PLANNING DIRECTION ONLY / IMPLEMENTATION NOT_AUTHORIZED** | No implementation authority by sequence |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

Engineering milestone state is separate from public release status.

---

## Canonical P4 anchors

```text
P4_R1_AUTHORIZATION = #323 / e59e2402333798e12f934f7b25c3cba5224bd651 / proof 5539462647
P4_R1_IMPLEMENTATION = #324 / d166e5305e2b9a400e9240ee7064bdf3c65f54aa / proof 5541190141
FOUNDER_EXTERNAL_REVIEW_POLICY = #325 / 94a62f8d794f7845dd2d999608fbb6fdd77ce7ab / proof 5541068578
P4_R2_AUTHORIZATION = #326 / 9443d15c02c143e4c4acc64b79817476b912ba1e / proof 5547225344
P4_R2_IMPLEMENTATION = #327 / 2641eb7493b6b6747f3cb56fa69e853305d54692 / proof 5547377851
P4_POST_R2_SUCCESSOR_ANALYSIS = #327 / comment 5547425939 / ANALYSIS_ONLY
P4_R1_R2_CLOSEOUT_AUTHORIZATION = #328 / f8641ec272301c991fe47cc879a45f10d48d3587 / proof 5547478904
P4_R1_R2_CLOSEOUT = #329 / 6f65503fa4abdcf5c20c15d2e54265ab01c929d3 / proof 5547554548
P4_POST_CLOSEOUT_RECONCILIATION_ANALYSIS = #329 / comment 5547558110 / ANALYSIS_ONLY
P4_POST_CLOSEOUT_RECONCILIATION_AUTHORIZATION = #330 / fa74f7653a2105152fc48aacc293e98142fea7fa / proof 5547581664
P4_POST_CLOSEOUT_RECONCILIATION = #331 / af6a225e5151ed5717d112ee9281f440f32d4693 / proof 5550826662
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

---

## Canonical P4 implementation identities

P4-R1:

```text
packages/kodac-runtime/src/reviewer-intelligence/p4-claim-envelope.ts
  = e9a59acf25c05276dddf80e269be4ae03e5e6775
schema/p4-reviewer-claim-envelope.schema.json
  = 121b2b7b0286a4b7dea0e92bb2642218fbb1a50e
packages/kodac-runtime/test/p4-r1-reviewer-claim-envelope.test.ts
  = 93ff960800363e036c25948aa4fa19617540814d
```

P4-R2:

```text
packages/kodac-runtime/src/reviewer-intelligence/p4-critic-disposition.ts
  = 11b49b715fa5991deb6d2154d11c3cacbf310f92
schema/p4-critic-disposition.schema.json
  = 796bb3e5cd49994f2f7cfa477812ef5b0d291e99
packages/kodac-runtime/test/p4-r2-critic-disposition.test.ts
  = 7877e865b66a99763dab477938dc4e7b8b9d77a8
```

The current reconciliation may not modify those bytes.

---

## Bounded P4 meaning

```text
P4-R1
= deterministic reviewer-claim evidence envelope over one existing KRI finding
+ explicit caller-owned risk hypothesis
+ evidence refs
+ bounded verifier proposals as proposals only
+ exact source/head/scope/freshness/adjudication binding
+ CRITIC_STATE = NOT_EVALUATED

P4-R2
= deterministic structured critic disposition over one exact validated P4-R1 envelope
+ disposition vocabulary SUPPORTED | CONTRADICTED | UNVERIFIED_CONCERN | DUPLICATE_OR_SUPERSEDED
+ exact predecessor/head/evidence binding
+ no critic execution
+ no KRI adjudication mutation
```

Required non-equivalences:

```text
VERIFIER PROPOSAL != VERIFICATION RESULT
CRITIC DISPOSITION != KRI ADJUDICATION AUTHORITY
REVIEW AGREEMENT != PROOF
P4 R1-R2 CLOSED != P4 OVERALL CLOSED
P4 R1-R2 CLOSED != P4-R3+ AUTHORITY
P4 R1-R2 CLOSED != P5 AUTHORITY BY COMPOSITION
P4 R1-R2 CLOSED != P5 SUCCESSOR AUTHORITY
P4 R1-R2 CLOSED != PROJECT COMPLETION
```

---

## Material P4 qualification history

P4-R1 required a forward-only JSON Schema conditional-object parity repair. Later Founder-governance movement of canonical `main` was reconciled forward-only without rebase/force-push and without changing frozen implementation blobs. Exact-head qualification was rerun.

P4-R2 internal semantic inspection found and repaired two genuine defects before qualification: Proxy trap exposure before rejection, and UTF-16/code-point length drift against JSON Schema. Every byte-moving repair invalidated predecessor-head evidence.

These repairs are canonical history and must not be rewritten as first-attempt success.

---

## Canonical P5-R1 anchors

```text
P5_R1_AUTHORIZATION = #332 / 39a732aecee8ebd69c5f294d2aa135288edc6d97 / proof 5550880869
P5_R1_IMPLEMENTATION = #333 / cef7a375e366795913879bed82f3d2bffe7647aa / proof 5550968215
P5_R1_QUALIFIED_HEAD = 7ccc8516938be0578d7648c4b7f07e89af86b306
P5_R1_POST_MERGE_RECONCILIATION_ANALYSIS = #333 / comment 5550978486 / ANALYSIS_ONLY
P5_R1_POST_MERGE_RECONCILIATION_AUTHORIZATION = #334 / 3ef17af23c686b18aa0f383c681b72c672137d51 / proof 5550995814
```

---

## Canonical P5-R1 implementation identities

```text
packages/kodac-runtime/src/verification/p5-evidence-provenance.ts
  = 4c8d708070e950d2902308ca1977ce5267acec29
schema/p5-evidence-provenance.schema.json
  = b7c1d2573a1dbe3b34c5a1e5dc0a5c2fceb1418e
packages/kodac-runtime/test/p5-r1-evidence-provenance.test.ts
  = 512ab506898d945aed8381352906c4e03bcbd487
```

The current reconciliation may not modify those bytes.

---

## Bounded P5-R1 meaning

```text
P5-R1
= deterministic provider-neutral provenance sidecar over already-existing evidence identity/ref/digest
+ exact repository base/head + repository identity
+ producer id/version/configuration identity
+ policy/scope/input/environment identities
+ caller-supplied CURRENT | STALE freshness + basis identity
+ content-addressed detached/frozen result
+ no source-evidence validation
+ no automatic freshness computation
+ no verifier execution
+ no ProofGraph
+ no KRI/K5/K2 authority mutation
```

Required non-equivalences:

```text
PROVENANCE BINDING != SOURCE EVIDENCE VALIDATION
PROVENANCE BINDING != PROOF
PROVENANCE BINDING != AUTHORITY
CALLER-SUPPLIED FRESHNESS != AUTOMATIC FRESHNESS DETERMINATION
P5-R1 CLOSED != P5-R2+ AUTHORITY
P5-R1 CLOSED != P5 OVERALL CLOSED
P5-R1 CLOSED != PROJECT COMPLETION
```

---

## Material P5-R1 qualification history

The first P5-R1 implementation PR head `35dd6b2434a3586f320f378dd5aa30428fcc3ed2` failed exact-head TypeScript qualification with TS2352 errors in the authorized test file. The branch was repaired forward-only at `7ccc8516938be0578d7648c4b7f07e89af86b306` without force-push or rebase. The full required exact-head matrix then passed before guarded merge.

This repair is canonical history and must not be rewritten as first-attempt success.

---

## Current reconciliation gate

Canonical PR #334 authorizes exactly five paths:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path is authorized.

The reconciliation only updates current navigation/status to already-proven P4/P5-R1 canonical truth. It does not change historical evidence or implementation.

It must still prove on one frozen exact head:

```text
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 5
FIVE BLOBS = FROZEN
REQUIRED CI = TERMINAL SUCCESS OR PROVEN NON_APPLICABLE
INTERNAL SUBSTANTIVE SEMANTIC INSPECTION = CLEAN
KNOWN ACTIONABLE DEFECTS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
RULESET 20707483 = active / no bypass
GUARDED NORMAL MERGE WITH exact expected_head_sha = REQUIRED
COMPLETE POST_MERGE_PROOF = REQUIRED
WAIVER = NO
```

---

## Preserved non-grants

```text
P2 OVERALL = OPEN
P3 OVERALL = OPEN
P4 OVERALL = OPEN
P5 OVERALL = NOT_CLOSED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK EXECUTION = NOT_AUTHORIZED
P2-R7+ = NOT_AUTHORIZED BY NUMBERING
P3-R18+ = NOT_AUTHORIZED
P4-R3+ = NOT_AUTHORIZED
P5-R2+ = NOT_AUTHORIZED
P6-P9 IMPLEMENTATION = NOT_AUTHORIZED
REVIEWER / CRITIC / VERIFIER / PROVIDER / MODEL EXECUTION = NOT_AUTHORIZED
KRI ADJUDICATION MUTATION = NOT_AUTHORIZED
PROVENANCE BINDING != SOURCE EVIDENCE VALIDATION
PROVENANCE BINDING != PROOF
PROVENANCE BINDING != AUTHORITY
CALLER-SUPPLIED FRESHNESS != AUTOMATIC FRESHNESS DETERMINATION
VERIFIER PROPOSAL != VERIFICATION RESULT
CRITIC DISPOSITION != KRI ADJUDICATION AUTHORITY
REVIEW AGREEMENT != PROOF
PROOFGRAPH = NOT_AUTHORIZED
KRI / K5 / K2 AUTHORITY MUTATION = NOT_AUTHORIZED
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

After this five-current-view reconciliation itself is post-merge proven, run fresh evidence-driven successor analysis. Do not infer P5-R2 by numbering or planning order.
