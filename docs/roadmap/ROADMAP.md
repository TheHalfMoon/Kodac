# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and the exact canonical authorization/evidence record for the active unit always win.

## Canonical truth anchors

```text
K6 bounded closeout       = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout       = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3-R1 implementation      = PR #252 / ba3caabef0b36649a1d556ff287237ca2a455ab2
P3-R1 reconciliation      = PR #253 / f0b18b3d6be10818195e2aef9f3d4123a2b9d3a2
P3-R2 authorization       = PR #255 / 69f74cef1f9cc36ed8db123cc30b65e881aa147e
P3-R2 implementation      = PR #256 / 458f62e85f4af2e13bfd78f5a6c3582d9330c911
P3-R2 reconciliation      = PR #257 / ecee96c1a0d4bf73c5d41b369edfa9950ae1ea0c
P3-R3 authorization       = PR #258 / 70553fef18c992b1ec819720e051258372af75d8
P3-R3 implementation      = PR #260 / cd7c28b4f823e9570daf73448c5f3b9b9b540d2e
P3-R3 reconciliation      = PR #261 / 0d26a7b7225c4ccc48a52b137ca526684a37d974
P3-R4 authorization       = PR #262 / 954455a3dce6e1d0663501504265abd4194addce
P3-R4 implementation      = PR #264 / ad63bab64512f8ac24c0f849b58b64ecf41a8709
Improvement master plan   = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

P3-R4 exact implementation proof:

```text
AUTHORIZATION_QUALIFIED_HEAD = d68d7b0e13c7099db4a3c9bb8c6b4283a916550a
AUTHORIZATION_QUALIFIED_TREE = fdfa7498641496ae82cf77d5ce3560b0327a129b
AUTHORIZATION_BLOB = d7827c154182b037f91f1addb8ca44f1798e02aa
QUALIFIED_HEAD = 8faa95a3157ccfaf1cc8723e10f95b10880f35e5
QUALIFIED_TREE = 6bf4dc29f6061713a35a03a2b8d7b11c30fa5072
MERGE = ad63bab64512f8ac24c0f849b58b64ecf41a8709
POST_MERGE_GOVERNANCE = 33355453287 / SUCCESS
POST_MERGE_K2_RUNTIME = 33355453262 / SUCCESS
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The P3-R4 merge is GitHub-signed and valid. Its ordered parents are authorization merge `954455a3dce6e1d0663501504265abd4194addce` followed by exact qualified implementation head `8faa95a3157ccfaf1cc8723e10f95b10880f35e5`; its merge tree equals the qualified tree.

## Current milestone state

| Milestone / gate | Current state | Authority boundary |
| --- | --- | --- |
| K0/K1 | **CLOSED** | Historical completed foundation |
| K2 | **CLOSED** | Trusted side-effect execution boundary remains unchanged |
| K3 | **CLOSED for canonical K3-R1 through K3-R6 bounded scope** | K3-R7+ not authorized |
| KRI-R1 through KRI-R4 | **CANONICAL / COMPLETE** | KRI-R5+ not authorized |
| K4 | **CLOSED for canonical K4-R1 through K4-R5 bounded data-only scope** | K4-R6+ not authorized |
| K5 | **CLOSED for canonical K5-R1 through K5-R5 bounded proof-review scope** | Done Gate unchanged |
| K6 | **CLOSED_CANONICAL for bounded R1-R5 scope** | No execution/persistence/learning/promotion authority by composition |
| P2-R1 through P2-R5 | **CLOSED_CANONICAL** | Deterministic bounded measurement/evidence spine |
| P2 bounded R1-R5 closeout | **CLOSED_CANONICAL** | General/public KodacBench remains open |
| P2 overall | **OPEN** | General/public KodacBench is not closed |
| P2-R6+ | **NOT_AUTHORIZED** | Separate justified authorization required if broader semantics are later needed |
| P3-R1 | **CLOSED_CANONICAL** | Deterministic context-selection-plan foundation only |
| P3-R2 | **CLOSED_CANONICAL** | Caller-declared deterministic policy-application mechanism only |
| P3-R3 | **CLOSED_CANONICAL** | Pairwise seven-metric evidence binding and comparability state only |
| P3-R4 | **CLOSED_CANONICAL** | Literal benchmark-provenance evidence binding only |
| P3 overall | **OPEN** | No repository-owned default, promotion, benchmark execution, or quality-improvement claim established |
| P3-R5+ | **NOT_AUTHORIZED** | Separate exact canonical authorization required |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

Engineering milestone state is separate from public release status.

## P3-R4 bounded result

P3-R4 adds deterministic provenance binding on top of canonical P3-R3 and P2 evidence. It:

- hardens all untrusted public inputs before semantic reuse;
- reconstructs canonical P2-R4 comparison truth through `compareP2R4(...)`;
- reconstructs canonical P3-R3 truth through `buildContextPolicyPairwiseMetricEvidence(...)`;
- validates canonical P2-R1 manifest/development/holdout evidence through `validateManifestSet(...)`;
- reproduces exact P2-R2 manifest ordering by `task_family`, then `case_id`, then `result_identity`, using lexical comparison;
- binds both report identities and both report manifest digests to the reconstructed comparison;
- binds every relevant case by `case_id` and `r1_result_identity` and independently binds left/right metric ID+unit topology to manifest definitions;
- preserves chronology, contamination, corpus role, anchors, and source provenance as literal evidence only;
- returns a deterministic, detached, deeply frozen evidence record;
- performs no repository/filesystem/network/provider/model/persistence side effect.

P3-R4 does not decide holdout sufficiency, contamination freedom, significance, acceptance, superiority, winner/default/promotion, release, or product integration.

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1 deterministic context selection plan foundation [CLOSED_CANONICAL]
   -> R1 roadmap/status reconciliation [CLOSED_CANONICAL]
   -> R2 declared context-selection policy application [CLOSED_CANONICAL]
   -> R2 roadmap/status reconciliation [CLOSED_CANONICAL]
   -> R3 pairwise metric-evidence binding [CLOSED_CANONICAL]
   -> R3 roadmap/status reconciliation [CLOSED_CANONICAL]
   -> R4 benchmark-provenance evidence binding authorization [CLOSED_CANONICAL]
   -> R4 implementation [CLOSED_CANONICAL]
   -> R4 roadmap/status reconciliation [CURRENT DOCS-ONLY CANDIDATE]
   -> next bounded P3 definition / planning / authorization-candidate work [ONLY AFTER RECONCILIATION]
   -> P3-R5+ implementation [NOT_AUTHORIZED]
-> P4 Reviewer Intelligence v2 [NOT_AUTHORIZED]
-> P5 Finding Verifier Fabric [NOT_AUTHORIZED]
-> P6 Security Validation [NOT_AUTHORIZED]
-> P7 Bounded Autofix [NOT_AUTHORIZED]
-> P8 Product / Distribution Hardening [NOT_AUTHORIZED]
```

## Next P3 planning boundary

After this reconciliation becomes canonical and post-merge proven, later P3 work remains definition/planning/authorization-candidate preparation only until a separate exact canonical authorization becomes effective.

The durable P3 goal remains minimum sufficient evidence rather than maximum context volume. A future bounded slice may define the next missing qualification dimension, but it must not infer execution, promotion, release, or implementation authority from planning text.

Explicitly postponed unless separately authorized:

- real benchmark task execution or corpus mutation;
- repository-owned default/winner/promotion;
- aggregate scoring, hidden weights, significance or acceptance thresholds;
- holdout-sufficiency or contamination-free conclusions not present as trusted literal facts;
- embeddings/vector retrieval or learned/model reranking;
- provider/model execution;
- repository acquisition or new indexing;
- persistence/telemetry/learning;
- product/CLI/agent-loop integration;
- public release, package publication, or superiority claims.

## Preserved authority boundaries

```text
INTELLIGENCE != AUTHORITY
BENCHMARK EVIDENCE != EXECUTION OR PROMOTION AUTHORITY
MORE CONTEXT != BETTER CONTEXT
P3-R1 PLAN FOUNDATION != BETTER CONTEXT POLICY
P3-R2 DECLARED POLICY APPLICATION != WINNING CONTEXT POLICY
P3-R3 PAIRWISE METRIC EVIDENCE != POLICY PROMOTION QUALIFICATION
P3-R4 BENCHMARK PROVENANCE EVIDENCE != HOLDOUT ACCEPTANCE OR POLICY PROMOTION
LATER-IN-TIME != SUFFICIENT HOLDOUT
NONE-KNOWN != PROVEN UNCONTAMINATED
P3-R4 CLOSED != P3 OVERALL CLOSED
P3-R4 CLOSED != P3-R5+ AUTHORIZED
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R5+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED BY THIS RECONCILIATION
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Repository visibility is currently public. Public repository visibility does not itself establish a public product release, package publication, benchmark completion, quality claim, production readiness, support commitment, or brand launch.

Every later unit remains fail-closed until its own exact authorization, qualification, guarded merge, and required post-merge proof succeed.
