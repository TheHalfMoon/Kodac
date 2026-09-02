# Kodac Engineering Milestones

## Authority

This file is a current milestone ledger. It does not authorize implementation, execution, release, provider/model access, persistence, learning, dependencies, benchmark execution, donor intake, public claims, successor work, or side effects. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records remain authoritative.

## Current milestone ledger

| Milestone / gate | Status | Current boundary |
| --- | --- | --- |
| K0/K1 | **CLOSED** | Architecture/governance foundation complete |
| K2 | **CLOSED** | Trusted Runtime Spine remains the side-effect execution boundary |
| K3 | **CLOSED for K3-R1 through K3-R6 bounded scope** | K3-R7+ not authorized |
| KRI-R1 through KRI-R4 | **CANONICAL / COMPLETE** | KRI-R5+ not authorized |
| K4 | **CLOSED for canonical K4-R1 through K4-R5 bounded data-only scope** | K4-R6+ not authorized |
| K5 | **CLOSED for canonical K5-R1 through K5-R5 bounded proof-review scope** | Done Gate unchanged |
| K6 bounded closeout | **CLOSED_CANONICAL** | PR #236 / `ed4fb16e8bbaf960812285671062c9b2abf597a8` |
| P2-R1 through P2-R5 | **CLOSED_CANONICAL** | Deterministic bounded measurement/evidence spine |
| P2 bounded R1-R5 engineering closeout | **CLOSED_CANONICAL** | PR #250 / `0e48553f00618706955b11db795643ee710fe04a` |
| P2 overall | **OPEN** | General/public KodacBench is not closed |
| P2-R6+ | **NOT_AUTHORIZED** | Separate authority required if broader semantics are justified |
| P3-R1 through P3-R16 | **CLOSED_CANONICAL** | Bounded deterministic context/evidence mechanisms only |
| P3-R16 | **CLOSED_CANONICAL** | Caller-declared relation-criterion evidence over trusted R15 only |
| P3-R16 current-view reconciliation | **CURRENT DOCS-ONLY UNIT / CANDIDATE** | Five current roadmap/status/version views only |
| P3 overall | **OPEN** | No repository-owned aggregate, ranking/promotion/default, statistics, real benchmark execution, or public quality claim established |
| P3-R17+ | **NOT_AUTHORIZED** | No later implementation authority is inferred from R16 closure |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |
| Project completion | **NOT_ESTABLISHED** | No configured project-completion proof exists |

Engineering milestone state is separate from public release status.

## Canonical P3-R16 proof

```text
P3_R15_CURRENT_VIEW_RECONCILIATION_PR = #304
P3_R15_CURRENT_VIEW_RECONCILIATION_MERGE = f6270d62ffcd06cbf780e24d37173d0d575665fe
P3_R15_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #304 / 5514505520
P3_R16_SUCCESSOR_ANALYSIS = #304 / 5514563852

P3_R16_AUTHORIZATION_PR = #305
P3_R16_AUTHORIZATION_BLOB = 3a931f3c1d733d5540954784d7fb414981c4a8b1
P3_R16_AUTHORIZATION_MERGE = da59d2a46d4eff5c12a60f2057a57d3572ba0e5d
P3_R16_AUTHORIZATION_POST_MERGE_PROOF = #305 / 5514986947

P3_R16_IMPLEMENTATION_PR = #307
P3_R16_QUALIFIED_HEAD = 390f0dd5b26445aa710e37573152e637230fe129
P3_R16_QUALIFIED_TREE = 33420ca4cb95721bb08903fb0e30ef4d0312c45c
P3_R16_SEMANTIC_REVIEW = CodeRabbit 5517148710 + Cubic 5517242418
P3_R16_UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
P3_R16_IMPLEMENTATION_MERGE = 0fb9f47db144619c580c69052aa98d79c4f71dc6
P3_R16_MERGE_TREE = 33420ca4cb95721bb08903fb0e30ef4d0312c45c
P3_R16_MERGE_VERIFICATION = verified / valid
P3_R16_POST_MERGE_GOVERNANCE = 33690090072 / SUCCESS
P3_R16_POST_MERGE_PROVENANCE = 100446602052 / SUCCESS
P3_R16_POST_MERGE_LEGACY_TESTS = 100446601874 / SUCCESS
P3_R16_POST_MERGE_K2 = 33690090070 / SUCCESS
P3_R16_POST_MERGE_CLASSIFIER = 100446601906 / SUCCESS
P3_R16_POST_MERGE_UBUNTU = 100446638831 / SUCCESS
P3_R16_POST_MERGE_MACOS = 100446638872 / SUCCESS
P3_R16_POST_MERGE_WINDOWS = 100446638917 / SUCCESS
P3_R16_POST_MERGE_K2_GATE = 100447140433 / SUCCESS
P3_R16_POST_MERGE_PROOF_COMMENT = #307 / 5517289297
P3_R16_RECONCILIATION_BOUNDARY_COMMENT = #307 / 5517293280
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical P3-R16 implementation/evidence blobs:

```text
packages/kodac-runtime/bench/p3-r16/contracts.ts
  ab5918caec73d2e6688d982c2774479b916e50b9
packages/kodac-runtime/bench/p3-r16/declared-directional-relation-criterion-match.ts
  47e46dac9f16824d0368218cf1c0b64c2971628d
packages/kodac-runtime/test/p3-r16-declared-directional-relation-criterion-match.test.ts
  edcff3f6192b7b8389b6dfabad2c15f3e878d1c6
docs/planning/KODAC_P3_R16_DECLARED_DIRECTIONAL_RELATION_CRITERION_MATCH_EVIDENCE_2026-09-02.md
  15ea09e6db3e0c0734979544bc0e71a621c3916a
```

Historical failures and stale-head evidence remain part of the historical record and are not relabeled by later recovery or closure.

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
R11: #288 authorization -> #289 implementation -> #290 reconciliation
R12: #291 authorization -> #293 implementation -> #294 reconciliation
R13: #295 authorization -> #296 implementation -> #297 reconciliation
R14: #298 authorization -> #299 implementation -> #300 reconciliation
R15: #301 authorization -> #302 implementation -> #304 reconciliation
R16: #305 authorization -> #307 implementation -> current-view reconciliation candidate
```

## Bounded P3 R1-R16 meaning

```text
R1  = deterministic context-selection-plan foundation
R2  = deterministic caller-declared policy application
R3  = pairwise seven-metric evidence binding and comparability-only state
R4  = literal benchmark-provenance evidence binding
R5  = caller-declared criterion-match evidence
R6  = deterministic seven-dimension measurement materialization from one reconstructed policy application plus explicit caller evaluation facts
R7  = deterministic single-case binding of reconstructed R6 measurement evidence to one generated P2-R2 report
R8  = deterministic case-invariant strategy-subject identity plus exact single-case binding to canonical P3-R1/P3-R2 identities
R9  = deterministic ordered composition of exactly two independently reconstructed R7 reports under one exact R8 strategy subject
R10 = deterministic seven-dimension metric/unit alignment evidence for the two R9 members without reduction
R11 = deterministic binding of exactly seven explicit P2-R3-compatible reduction policies to the aligned pair, with no reducer execution
R12 = deterministic application of the exact bound policies to the exact two trusted observations, emitting per-dimension REDUCED or INSUFFICIENT_EVIDENCE reduction evidence
R13 = deterministic binding of exactly seven explicit HIGHER_IS_BETTER | LOWER_IS_BETTER directions while preserving complete trusted R12 evidence
R14 = deterministic controlled per-dimension comparison of exactly two distinct trusted reconstructed R13 records under matching corresponding controls, emitting COMPARABLE | INSUFFICIENT_EVIDENCE and raw finite left-minus-right deltas when comparable
R15 = deterministic per-dimension directional relation over the complete trusted R14 result, preserving every R14 comparison field and appending exactly one closed-vocabulary directional relation
R16 = deterministic per-dimension match of each trusted R15 relation against one explicit caller-owned allowed-relations declaration, preserving complete R15 evidence and deriving one closed logical criteria state
```

These compose only as evidence mechanisms:

```text
CALLER-DECLARED R16 CRITERIA != REPOSITORY POLICY
SATISFIED CRITERIA != GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR
SATISFIED CRITERIA != PROMOTION / DEFAULT / WINNER
CRITERION MATCH EVIDENCE != CROSS-DIMENSION NUMERIC SCORE
CRITERION MATCH EVIDENCE != STATISTICAL / PROVENANCE QUALIFICATION
CRITERION MATCH EVIDENCE != REAL BENCHMARK EXECUTION
P3 R1-R16 CLOSED != P3 OVERALL CLOSED
P3 R1-R16 CLOSED != P3-R17+ AUTHORITY
P3 R1-R16 CLOSED != P4 AUTHORITY
```

## Current reconciliation qualification

Root `AGENTS.md` requires roadmap reconciliation after post-merge proof. Canonical P3-R16 post-merge proof `#307 / 5517289297`, the established canonical reconciliation procedure proven by PR #304, and continuation boundary `#307 / 5517293280` identify this docs-only current-view reconciliation as exactly:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path belongs to this unit. It becomes canonical only after one frozen exact head proves exact five-path containment, `behind_by=0`, applicable Governance/K2 checks, two distinct substantive external terminal-clean semantic review channels, zero actionable findings/threads, active no-bypass ruleset, guarded normal merge with exact expected head, and mandatory post-merge main/parents/tree/five-blobs/signature/check/ruleset proof.

## Next boundary after reconciliation

Only after the R16 current-view reconciliation becomes canonical and post-merge proven may later P3 definition/planning/authorization-candidate work be considered, if justified by a concrete canonical gap.

No `P3-R17`, aggregate score, ranking, promotion, winner/default, statistical policy, benchmark execution, P4-P8, or project-completion requirement is inferred by sequence alone.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

## Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE MUTATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT_ESTABLISHED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED
GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR VERDICT = NOT_AUTHORIZED
CROSS-DIMENSION AGGREGATE SCORE / WEIGHTING / MAJORITY / PARETO POLICY = NOT_AUTHORIZED
MULTI-STRATEGY RANKING / LEADERBOARD / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R17+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
