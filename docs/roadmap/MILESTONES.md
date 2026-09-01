# Kodac Engineering Milestones

## Authority

This file is a current milestone ledger. It does not authorize implementation, execution, release, provider/model access, persistence, learning, dependencies, benchmark execution, donor intake, public claims, or side effects. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records remain authoritative.

## Current milestone ledger

| Milestone / gate | Status | Current boundary |
| --- | --- | --- |
| K0/K1 | **CLOSED** | Architecture/governance foundation complete |
| K2 | **CLOSED** | Trusted Runtime Spine remains the side-effect execution boundary |
| K3 | **CLOSED for K3-R1 through K3-R6 bounded scope** | K3-R7+ not authorized |
| KRI-R1 through KRI-R4 | **CANONICAL / COMPLETE** | KRI-R5+ not authorized |
| K4 | **CLOSED for K4-R1 through K4-R5 bounded data-only scope** | K4-R6+ not authorized |
| K5 | **CLOSED for K5-R1 through K5-R5 bounded proof-review scope** | Done Gate unchanged |
| K6 bounded closeout | **CLOSED_CANONICAL** | PR #236 / `ed4fb16e8bbaf960812285671062c9b2abf597a8` |
| P2-R1 through P2-R5 | **CLOSED_CANONICAL** | Deterministic bounded measurement/evidence spine |
| P2 bounded R1-R5 engineering closeout | **CLOSED_CANONICAL** | PR #250 / `0e48553f00618706955b11db795643ee710fe04a` |
| P2 overall | **OPEN** | General/public KodacBench is not closed |
| P2-R6+ | **NOT_AUTHORIZED** | Separate authority required if broader semantics are justified |
| P3-R1 through P3-R11 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms only |
| P3-R11 | **CLOSED_CANONICAL** | Exact two-case reduction-policy binding evidence without reducer execution |
| P3-R11 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / CANDIDATE** | Five current roadmap/status/version views only |
| P3 overall | **OPEN** | No repository policy/default/promotion, real benchmark execution, reduction result, aggregate scoring, or public quality claim established |
| P3-R12+ | **NOT_AUTHORIZED** | No later implementation authority is inferred from R11 closure |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

Engineering milestone state is separate from public release status.

## Canonical P3-R11 proof

```text
P3_R10_CURRENT_VIEW_RECONCILIATION_PR = #287
P3_R10_CURRENT_VIEW_RECONCILIATION_MERGE = f9636474877c142dc8849094c1856f5b1a92cf6f
P3_R10_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #287 / 5494419703

P3_R11_AUTHORIZATION_PR = #288
P3_R11_AUTHORIZATION_QUALIFIED_HEAD = 75780d9af8df236a319f4624f5dc74c8b5ea353c
P3_R11_AUTHORIZATION_BLOB = 5bddd4deb1bcda9a5fe60a5b5df9c3ccbd4d019a
P3_R11_AUTHORIZATION_MERGE = cb2362c4e0cdf651b949fe851575a123d77a9d32
P3_R11_AUTHORIZATION_POST_MERGE_PROOF = #288 / 5494754462

P3_R11_IMPLEMENTATION_PR = #289
P3_R11_QUALIFIED_HEAD = c9db09e80c27610b5f34afbcaee462bd2d9fb613
P3_R11_QUALIFIED_TREE = 57725483a8517fc61710016849a524c0ac79fdba
P3_R11_QUALIFICATION_PROOF = #289 / 5495132359
P3_R11_SEMANTIC_REVIEW = Cubic 5495078519 + CodeRabbit 5495098393
P3_R11_MERGE = 0842ed7dac95bad879cc55d720ba5646ae021f24
P3_R11_MERGE_TREE = 57725483a8517fc61710016849a524c0ac79fdba
P3_R11_MERGE_VERIFICATION = verified / valid
P3_R11_POST_MERGE_GOVERNANCE = 33516950190 / SUCCESS
P3_R11_POST_MERGE_PROVENANCE = 99886253718 / SUCCESS
P3_R11_POST_MERGE_LEGACY_TESTS = 99886254131 / SUCCESS
P3_R11_POST_MERGE_K2 = 33516950175 / SUCCESS
P3_R11_POST_MERGE_CLASSIFIER = 99886253163 / SUCCESS
P3_R11_POST_MERGE_UBUNTU = 99886306919 / SUCCESS
P3_R11_POST_MERGE_WINDOWS = 99886306894 / SUCCESS
P3_R11_POST_MERGE_MACOS = 99886306868 / SUCCESS
P3_R11_POST_MERGE_K2_GATE = 99890072448 / SUCCESS
P3_R11_UNRESOLVED_REVIEW_THREADS = 0
P3_R11_POST_MERGE_PROOF_COMMENT = #289 / 5495387091
P3_R11_RECONCILIATION_BOUNDARY_COMMENT = #289 / 5495390306
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R11 implementation/evidence blobs:

```text
packages/kodac-runtime/bench/p3-r11/contracts.ts
  7e12f871095eaec6855f606aa1e360adcc48f8c7
packages/kodac-runtime/bench/p3-r11/single-strategy-two-case-reduction-policy-binding.ts
  f2ecbefb9638aa6867a388b827d75dbdba6b1cc6
packages/kodac-runtime/test/p3-r11-single-strategy-two-case-reduction-policy-binding.test.ts
  91c0c459e8acab4a64f213e474394a27bdb0c676
docs/planning/KODAC_P3_R11_TWO_CASE_REDUCTION_POLICY_BINDING_EVIDENCE_2026-09-01.md
  a47b31c44a1504dba0cac42f73d6dab5136ddfcb
```

Historical P3-R8 K2 run `33439529693` remains failed evidence and is not relabeled by later H4 recovery.

## Canonical P3 ledger

```text
R1: #251 authorization -> #252 implementation -> #253 reconciliation
R2: #255 authorization -> #256 implementation -> #257 reconciliation
R3: #258 authorization -> #260 implementation -> #261 reconciliation
R4: #262 authorization -> #264 implementation -> #265 reconciliation
R5: #266 authorization -> #267 implementation -> #268 reconciliation
R1-R5 closeout: #269 authorization -> #270 closeout
R6: #271 authorization -> #272 implementation -> #273 reconciliation
R7: #274 authorization -> #275 implementation -> #276 reconciliation
R8: #277 authorization -> #278 implementation -> #279/#280 H4 recovery -> #281 reconciliation
R9: #282 authorization -> #283 implementation -> #284 reconciliation
R10: #285 authorization -> #286 implementation -> #287 reconciliation
R11: #288 authorization -> #289 implementation -> current-view reconciliation pending
```

## Bounded P3 R1-R11 meaning

```text
R1 = deterministic context-selection-plan foundation
R2 = deterministic caller-declared policy application
R3 = pairwise seven-metric evidence binding / comparability-only state
R4 = literal benchmark-provenance evidence binding
R5 = caller-declared criterion-match evidence
R6 = deterministic seven-dimension measurement materialization from one reconstructed policy application plus explicit caller evaluation facts
R7 = deterministic single-case binding of reconstructed R6 measurement evidence to one generated P2-R2 report
R8 = deterministic case-invariant strategy-subject identity plus exact single-case binding to canonical P3-R1/P3-R2 identities
R9 = deterministic ordered composition of exactly two independently reconstructed R7 reports under one exact R8 strategy subject
R10 = deterministic seven-dimension metric/unit alignment evidence for the two R9 members, preserving both observations without arithmetic or directional semantics
R11 = deterministic binding of exactly seven explicit P2-R3-compatible reduction policies to the aligned pair, validating benchmark/protocol/value-kind continuity without executing reduction
```

These remain evidence-only boundaries:

```text
P3 R1-R11 CLOSED != P3 OVERALL CLOSED
P3 R1-R11 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P3 R1-R11 CLOSED != REAL BENCHMARK TASK / PARTICIPANT EXECUTION
P3 R1-R11 CLOSED != REDUCER EXECUTION
P3 R1-R11 CLOSED != REDUCED / INSUFFICIENT_EVIDENCE SUMMARY RESULT
P3 R1-R11 CLOSED != DIRECTION / DELTA / BETTER-WORSE SEMANTICS
P3 R1-R11 CLOSED != MULTI-STRATEGY COMPARISON / RANKING / PROMOTION
P3 R1-R11 CLOSED != REPOSITORY DEFAULT / WINNER
P3 R1-R11 CLOSED != P3-R12+ AUTHORITY
P3 R1-R11 CLOSED != P4 AUTHORITY
```

## Current reconciliation qualification

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. Canonical P3-R11 post-merge proof `#289 / 5495387091` and continuation boundary `#289 / 5495390306` permit this docs-only current-view reconciliation to change exactly:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path belongs to this unit. It becomes canonical only after one frozen exact head proves exact five-path containment, `behind_by=0`, applicable Governance/K2 checks, two distinct substantive external terminal-clean semantic review channels, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact expected head, and mandatory post-merge main/parents/tree/five-blobs/signature/check/ruleset proof.

## Next boundary after reconciliation

Only after the R11 current-view reconciliation becomes canonical and post-merge proven may later P3 definition/planning/authorization-candidate work be considered, if justified by a concrete canonical gap. No `P3-R12` requirement is inferred by sequence alone.

Current internal evidence may justify investigating one bounded two-case reduction-evidence mechanism that reuses canonical P2-R3 semantics, but this is analysis only. Direction, delta, comparison, ranking, winner, default, and promotion remain separate later semantics requiring separate evidence and authority.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

## Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION = NOT_AUTHORIZED
REDUCER EXECUTION / MEAN / TRUE-RATE = NOT_AUTHORIZED
DIRECTION / DELTA / BETTER-WORSE = NOT_AUTHORIZED
MULTI-STRATEGY COMPARISON / RANKING / LEADERBOARD / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R12+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```
