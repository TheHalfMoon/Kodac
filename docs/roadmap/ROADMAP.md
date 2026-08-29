# Kodac Engineering Roadmap

## Authority

This file is a current engineering roadmap view. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, or merge authority. Live GitHub, root `AGENTS.md`, governing ADRs, and the exact canonical authorization for the active unit always win.

## Canonical truth anchors

```text
K6 bounded closeout       = PR #236 / ed4fb16e8bbaf960812285671062c9b2abf597a8
P2 bounded closeout       = PR #250 / 0e48553f00618706955b11db795643ee710fe04a
P3-R1 authorization       = PR #251 / 2b3ce25fe4b8e108840208cdf7a7018ba6262fd6
P3-R1 implementation      = PR #252 / ba3caabef0b36649a1d556ff287237ca2a455ab2
Improvement master plan   = PR #209 / 3650b81ea926a066fcc7029b5b1e2f186d2ed616
```

P3-R1 exact implementation proof:

```text
QUALIFIED_HEAD = feee83d214bb2ed47e25b730e8c6840538d57882
QUALIFIED_TREE = 027f0f3258e17cef6f0f8df8164853f206d42afb
MERGE = ba3caabef0b36649a1d556ff287237ca2a455ab2
POST_MERGE_GOVERNANCE = 33237323000 / SUCCESS
POST_MERGE_K2_RUNTIME = 33237323003 / SUCCESS
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

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
| P3-R2+ | **NOT_AUTHORIZED** | Requires separate exact canonical authorization |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

Engineering milestone state is separate from public release status.

## P3-R1 bounded result

P3-R1 adds a pure deterministic planning boundary over caller-materialized repository evidence. It provides:

- repository/snapshot/content identity binding;
- six descriptive evidence lanes;
- deterministic candidate, candidate-set, request, and plan identities;
- preserved evidence class, provenance, reasons, and grouping metadata;
- explicit item/UTF-8 budget facts;
- completeness and omitted-evidence metadata;
- explicit `insufficient-evidence` abstention;
- validation of already-materialized K3-R6 relation-query results without graph execution;
- deep immutability and fail-closed hostile-input validation.

P3-R1 deliberately does **not** implement a context ranking or selection-quality policy. It does not execute a benchmark and does not establish improvement over K3-R5.

## Ordered improvement program

```text
K6 bounded closeout [CLOSED_CANONICAL]
-> P2 bounded deterministic measurement spine [R1-R5 CLOSED_CANONICAL]
-> P3 Context Engine v2
   -> R1 deterministic context selection plan foundation [CLOSED_CANONICAL]
   -> R1 roadmap/status reconciliation [CURRENT DOCS-ONLY CANDIDATE]
   -> R2 authorization-candidate preparation [NEXT ONLY AFTER RECONCILIATION]
   -> R2 implementation [NOT_AUTHORIZED]
   -> later P3 slices [NOT_AUTHORIZED]
-> P4 Reviewer Intelligence v2 [NOT_AUTHORIZED]
-> P5 Finding Verifier Fabric [NOT_AUTHORIZED]
-> P6 Security Validation [NOT_AUTHORIZED]
-> P7 Bounded Autofix [NOT_AUTHORIZED]
-> P8 Product / Distribution Hardening [NOT_AUTHORIZED]
```

## P3-R2 conservative planning direction

After this reconciliation becomes canonical, the next eligible work is P3-R2 definition/planning and authorization-candidate preparation only.

The smallest useful direction is a pure deterministic declared selection-policy application boundary over canonical P3-R1 plans. A later R2 authorization may define how a caller-declared policy is validated and applied under explicit item/byte budgets while preserving evidence and omission reasons. The implementation must not silently choose a repository-owned winning policy or claim quality improvement.

This direction intentionally postpones:

- repository-owned strategy promotion;
- benchmark-backed comparison claims;
- embeddings/vector retrieval;
- learned/model reranking;
- provider/model execution;
- repository acquisition or new indexing;
- persistence/telemetry/learning;
- product/CLI/agent-loop integration.

Those capabilities require later separate authority and, where quality is contested, benchmark evidence under ADR-0010.

## Preserved authority boundaries

```text
INTELLIGENCE != AUTHORITY
BENCHMARK EVIDENCE != EXECUTION AUTHORITY
MORE CONTEXT != BETTER CONTEXT
P3-R1 PLAN FOUNDATION != BETTER CONTEXT POLICY
P3-R1 CLOSED != P3 OVERALL CLOSED
P3-R1 CLOSED != P3-R2 AUTHORIZED
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R2+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PUBLIC RELEASE / SUPERIORITY CLAIM = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Every later unit remains fail-closed until its own exact authorization, qualification, guarded merge, and required post-merge proof succeed.
