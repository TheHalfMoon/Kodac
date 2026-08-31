# Kodac Engineering Milestones

## Authority

This file is a current milestone ledger. It does not authorize implementation, execution, release, provider/model access, persistence, learning, dependencies, benchmark execution, public claims, or side effects. Live GitHub, root `AGENTS.md`, governing ADRs, and exact canonical authorization/evidence records remain authoritative.

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
| P3-R1 | **CLOSED_CANONICAL** | Deterministic context-selection-plan foundation only |
| P3-R2 | **CLOSED_CANONICAL** | Deterministic caller-declared policy application only |
| P3-R3 | **CLOSED_CANONICAL** | Pairwise seven-metric evidence / comparability only |
| P3-R4 | **CLOSED_CANONICAL** | Literal benchmark-provenance evidence binding only |
| P3-R5 | **CLOSED_CANONICAL** | Caller-declared criterion-match evidence only |
| P3 bounded R1-R5 engineering closeout | **CONDITIONAL ON THIS EXACT SIX-PATH MERGE + POST-MERGE PROOF** | Authorized by PR #269 / `cce6b1aab6d5c2909728ad80133718cfd97b4897` |
| P3 overall | **OPEN** | No repository policy/default/promotion, benchmark execution, or public quality claim established |
| P3-R6+ | **NOT_AUTHORIZED** | No R6 requirement or authority is inferred from R1-R5 closure |
| P4-P8 | **NOT_AUTHORIZED** | Later stages require ordered dependencies and separate authority |

Engineering milestone state is separate from public release status.

## P3 bounded closeout authority

```text
CLOSEOUT_AUTHORIZATION_PR = #269
CLOSEOUT_AUTHORIZATION_QUALIFIED_HEAD = 6e0d5c94aca116a6904bef458209fed931d870c3
CLOSEOUT_AUTHORIZATION_QUALIFIED_TREE = 4b4fc143cecf5d754494aa1748135b7f4a2693c7
CLOSEOUT_AUTHORIZATION_BLOB = f5894f1a8ec3af39e54f2997865f534e196e30e8
CLOSEOUT_AUTHORIZATION_MERGE = cce6b1aab6d5c2909728ad80133718cfd97b4897
CLOSEOUT_AUTHORIZATION_VERIFICATION = verified / valid
PRE_MERGE_GOVERNANCE = 33360478597 / SUCCESS
PRE_MERGE_K2 = 33360478582 / classifier + stable gate SUCCESS / runtime SKIPPED AS DOCS-ONLY
POST_MERGE_GOVERNANCE = 33360736529 / SUCCESS
POST_MERGE_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
SEMANTIC_REVIEW_QUORUM = CodeRabbit + Codex / exact-head clean
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Exact current closeout allowlist:

```text
docs/planning/KODAC_P3_BOUNDED_R1_R5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-31.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/ROADMAP.md
docs/roadmap/VERSION_PLAN.md
docs/roadmap/NEXT.md
```

No seventh path is authorized.

## Canonical P3 R1-R5 ledger

```text
R1: #251 authorization -> #252 implementation -> #253 reconciliation
R2: #255 authorization -> #256 implementation -> #257 reconciliation
R3: #258 authorization -> #260 implementation -> #261 reconciliation
R4: #262 authorization -> #264 implementation -> #265 reconciliation
R5: #266 authorization -> #267 implementation -> #268 reconciliation
```

The complete canonical heads, trees, blobs, check evidence, bounded meanings, and material repair/failure/service history are bound in the closeout evidence record. Closed-unmerged/superseded candidates are preserved as non-authority rather than folded into the canonical chain.

## Bounded R1-R5 exit meaning

```text
R1 = deterministic context-selection-plan foundation
R2 = deterministic caller-declared policy application
R3 = pairwise seven-metric evidence binding / comparability-only state
R4 = literal benchmark-provenance evidence binding
R5 = caller-declared criterion-match evidence
```

The five mechanisms remain evidence-only boundaries:

```text
P3 BOUNDED R1-R5 CLOSED != P3 OVERALL CLOSED
P3 BOUNDED R1-R5 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P3 BOUNDED R1-R5 CLOSED != REAL BENCHMARK TASK EXECUTION
P3 BOUNDED R1-R5 CLOSED != REPOSITORY DEFAULT / WINNER / PROMOTION
P3 BOUNDED R1-R5 CLOSED != HOLDOUT SUFFICIENCY / CONTAMINATION FREEDOM
P3 BOUNDED R1-R5 CLOSED != STATISTICAL SIGNIFICANCE / ACCEPTANCE
P3 BOUNDED R1-R5 CLOSED != PROVIDER / MODEL EXECUTION
P3 BOUNDED R1-R5 CLOSED != PRODUCT / RELEASE / PACKAGE READY
P3 BOUNDED R1-R5 CLOSED != P3-R6+ AUTHORITY
P3 BOUNDED R1-R5 CLOSED != P4 AUTHORITY
```

## Material-history requirement

Closeout evidence preserves rather than rewrites:

- R1 semantic edge-order and canonical entity-order repairs plus identical-head H4 timing retry;
- R2 closed-unmerged PR #254, replacement authorization repairs, same-head/same-merge H4 retries, and topology-over-narrative handling of the merge-message typo;
- R3 closed-unmerged PR #259, direct focused-test repair, hosted-runner/public-visibility history, and identical-head H4 retries;
- R4 three material Codex P1 authorization repairs, implementation type/test/proof repairs, and Draft PR #263 administrative non-authority;
- R5 provenance-state and aggregate-precedence repairs plus the identical-merge-SHA post-merge K2 retry.

## Closeout qualification state

The current branch is a documentation/evidence candidate only. It may be called `CLOSED_CANONICAL` only after one frozen exact head proves the exact six paths, `behind_by=0`, Governance, docs-only K2 classifier/stable gate, two distinct substantive external semantic reviewer channels, zero actionable findings/threads, active no-bypass ruleset, guarded merge with exact expected head, and mandatory post-merge main/parents/tree/six-blobs/signature/check/ruleset proof.

## Next boundary after successful closeout

No P3-R6 requirement is inferred by sequence alone. After a successful bounded closeout, later P3 work remains definition/planning/authorization-candidate preparation only unless a more-specific canonical authority exists then.

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

Any future measured-context execution, benchmark execution/corpus mutation, statistical/holdout acceptance, repository policy promotion, embeddings/learned reranking, provider/model execution, persistence, product integration, public claim, or release requires its own exact authority.

## Preserved non-grants

```text
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT EXECUTION = NOT_AUTHORIZED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST MUTATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT ESTABLISHED
N-WAY RANKING / LEADERBOARD / GLOBAL WINNER = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / STRATEGY PROMOTION = NOT_AUTHORIZED
HIDDEN SCORE / WEIGHT / THRESHOLD / TOLERANCE = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
HOLDOUT SUFFICIENCY / UNBIASEDNESS / CONTAMINATION-FREE CLAIM = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Repository visibility is currently public, but engineering milestone closure remains separate from public versioning, package publication, production readiness, support, compatibility, benchmark claims, security claims, quality claims, and brand launch.
