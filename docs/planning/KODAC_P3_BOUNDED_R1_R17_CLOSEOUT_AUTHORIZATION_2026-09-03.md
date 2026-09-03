# Kodac P3 — Bounded R1-R17 Engineering Closeout Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_CLOSEOUT_AUTHORITY UNTIL MERGED AND PROVEN**  
Date: 2026-09-03  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Deny-by-default state

This record authorizes only one future documentation/evidence closeout unit after this exact authorization record itself qualifies, merges normally into protected `main`, and passes mandatory post-merge proof.

```text
P2-R1 THROUGH P2-R5 = CLOSED_CANONICAL
P2 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED

P3-R1 THROUGH P3-R17 = CLOSED_CANONICAL
P3 BOUNDED R1-R17 ENGINEERING SCOPE = NOT_YET_CLOSED
P3-R17 CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 BOUNDED R1-R17 ENGINEERING CLOSEOUT = AUTHORIZATION_CANDIDATE ONLY
P3 OVERALL = OPEN
P3-R18+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This record does not close P3, authorize R18, authorize real benchmark execution, create a repository-owned context policy, authorize P4, authorize release, or establish project completion.

---

## 2. Canonical baseline and procedural authority

```text
CANONICAL_MAIN_AT_CANDIDATE_START = b1ab1a16067e7d8a2bc720ccba475c6556d0525c
P3_R17_IMPLEMENTATION_PR = #310
P3_R17_IMPLEMENTATION_MERGE = 598808fb611721fd8163b79c36676eded457ba91
P3_R17_IMPLEMENTATION_POST_MERGE_PROOF = #310 / 5527154469
P3_R17_CURRENT_VIEW_RECONCILIATION_PR = #311
P3_R17_CURRENT_VIEW_RECONCILIATION_MERGE = b1ab1a16067e7d8a2bc720ccba475c6556d0525c
P3_R17_CURRENT_VIEW_RECONCILIATION_POST_MERGE_PROOF = #311 / 5527606835
P3_R1_R17_CLOSEOUT_SUCCESSOR_ANALYSIS = #311 / 5527641999
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Root `AGENTS.md` requires exact active authority, bounded work, exact-head proof, guarded merge, post-merge proof, roadmap reconciliation, and only then the next authorized unit. The canonical `NEXT.md` permits a bounded P3 closeout candidate only after R17 reconciliation becomes canonical and post-merge proven; that prerequisite is now satisfied.

Live GitHub and more-specific canonical records override this snapshot if repository state moves before qualification.

---

## 3. Decision and minimum sufficient boundary

Fresh successor analysis established that another numbered deterministic mechanism is not presently required to close the already-canonical R1-R17 engineering lineage.

The current gap is only:

```text
P3-R1 THROUGH P3-R17 INDIVIDUALLY CLOSED_CANONICAL
!=
P3 BOUNDED R1-R17 ENGINEERING SCOPE CLOSED_CANONICAL
```

The authorized future unit may therefore prove only:

```text
P3 BOUNDED R1-R17 ENGINEERING SCOPE = CLOSED_CANONICAL
```

if and only if that future closeout candidate independently verifies the complete canonical R1-R17 lineage, preserves material qualification/repair history and all authority boundaries, qualifies on one frozen exact head, merges normally with exact expected-head protection, and passes complete post-merge proof.

This is an engineering/evidence closeout only.

---

## 4. Why this does not authorize P3 overall closure

The durable improvement plan states:

```text
P3 promotion requires KodacBench evidence that selective context improves or matches accepted quality without unacceptable dilution/regression.
```

Canonical repository truth simultaneously states:

```text
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
```

ADR-0010 requires benchmark-first contested selection and evidence-gated superiority claims, with reproducible benchmark/configuration/model/environment identities and leakage/held-out awareness.

The final gap review also preserves unresolved general gaps around unified KodacBench, measured context quality, context dilution, and full-cycle evaluation.

Therefore this closeout authority cannot establish any of the following:

```text
P3 OVERALL = CLOSED
P3 PROMOTION = PROVEN
GENERAL / PUBLIC KODACBENCH = COMPLETE
SELECTIVE CONTEXT = SUPERIOR
CONTEXT DILUTION = ACCEPTABLY BOUNDED IN REAL EXECUTION
REAL BENCHMARK PARTICIPANT EXECUTION = AUTHORIZED
```

---

## 5. Canonical P3 lineage that the future closeout must independently prove

The future closeout must re-read live GitHub rather than trust this ledger as proof. The descriptive PR chain to verify is:

```text
R1:  #251 authorization -> #252 implementation -> #253 reconciliation
R2:  #255 authorization -> #256 implementation -> #257 reconciliation
R3:  #258 authorization -> #260 implementation -> #261 reconciliation
R4:  #262 authorization -> #264 implementation -> #265 reconciliation
R5:  #266 authorization -> #267 implementation -> #268 reconciliation
R1-R5 bounded closeout: #269 authorization -> #270 closeout
R6:  #271 authorization -> #272 implementation -> #273 reconciliation
R7:  #274 authorization -> #275 implementation -> #276 reconciliation
R8:  #277 authorization -> #278 implementation -> #279/#280 recovery history -> #281 reconciliation
R9:  #282 authorization -> #283 implementation -> #284 reconciliation
R10: #285 authorization -> #286 implementation -> #287 reconciliation
R11: #288 authorization -> #289 implementation -> #290 reconciliation
R12: #291 authorization -> #293 implementation -> #294 reconciliation
R13: #295 authorization -> #296 implementation -> #297 reconciliation
R14: #298 authorization -> #299 implementation -> #300 reconciliation
R15: #301 authorization -> #302 implementation -> #304 reconciliation
R16: #305 authorization -> #307 implementation -> #308 reconciliation
R17: #309 authorization -> #310 implementation -> #311 reconciliation
```

PR numbering is descriptive only. The closeout must bind actual canonical merge ancestry, qualified heads/trees, canonical blobs, reviews, workflow evidence, post-merge proof, reconciliation proof, and superseded/failed attempt history where material.

Closed-unmerged, superseded, stale-head, service-failed, or otherwise non-canonical candidates remain non-authority.

---

## 6. Bounded R1-R17 meaning that must remain separate

The future closeout must preserve each slice as evidence/mechanism rather than silently compose them into a decision system:

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
R10 = deterministic seven-dimension metric/unit alignment evidence for the two R9 members without arithmetic or directional semantics
R11 = deterministic binding of exactly seven explicit P2-R3-compatible reduction policies to the aligned pair without reducer execution
R12 = deterministic application of those exact policies to the exact trusted observations, emitting per-dimension reduction evidence
R13 = deterministic binding of explicit per-dimension HIGHER_IS_BETTER | LOWER_IS_BETTER directions
R14 = deterministic controlled pairwise comparison of exactly two independently reconstructed R13 records under matching controls
R15 = deterministic per-dimension direction-aware relation over trusted R14 evidence
R16 = deterministic match of trusted R15 relations against one explicit caller-owned allowed-relations declaration
R17 = deterministic bounded qualification of trusted R16 criterion-match evidence against canonical P3-R4 provenance on the same benchmark/protocol, policy orientation, and exact two-case R1 substrate
```

Required non-equivalences include at minimum:

```text
DETERMINISTIC PLAN != BETTER CONTEXT STRATEGY
CALLER POLICY / CRITERIA != REPOSITORY POLICY
PAIRWISE OR DIRECTIONAL EVIDENCE != GLOBAL WINNER / SUPERIORITY
LITERAL PROVENANCE != HOLDOUT SUFFICIENCY / UNBIASEDNESS / CONTAMINATION FREEDOM
EXACTLY TWO CASES != GENERAL / UNBOUNDED COMPOSITION
RAW DELTA / FAVORED-BY-DIRECTION != STATISTICAL SIGNIFICANCE / PRACTICAL EQUIVALENCE
R17 SUBSTRATE BINDING != SAME EXACT EARLY/LATE PLAN / REQUEST / SHARED-EVALUATION / COMPARISON-POLICY CONTEXT
CRITERIA SATISFIED != PROMOTION / DEFAULT / RELEASE
BOUNDED R1-R17 CLOSEOUT != P3 OVERALL CLOSED
BOUNDED R1-R17 CLOSEOUT != GENERAL / PUBLIC KODACBENCH COMPLETE
BOUNDED R1-R17 CLOSEOUT != P3-R18+ AUTHORITY
BOUNDED R1-R17 CLOSEOUT != P4 AUTHORITY
```

---

## 7. Exact future closeout allowlist

Only after this authorization record becomes canonical and post-merge proven may one later closeout candidate modify exactly these six paths:

```text
docs/planning/KODAC_P3_BOUNDED_R1_R17_CANONICAL_CLOSEOUT_EVIDENCE_2026-09-03.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No seventh path is authorized.

No runtime source/test, historical R1-R17 authorization/evidence/reconciliation record, benchmark corpus/manifest/fixture/result, workflow, schema, dependency, lockfile, provenance substrate, donor code, provider/model configuration, persistence, telemetry, learning, CLI/API/product integration, package/release configuration, ruleset, or repository protection path may change.

The five current views are included solely to reconcile the bounded engineering milestone if and only if the closeout evidence itself qualifies and merges.

---

## 8. Mandatory future closeout evidence

The later closeout must independently prove, at minimum:

1. the actual canonical authorization/implementation/reconciliation topology for R1-R17;
2. exact final qualified implementation heads and trees, implementation merges, ordered parents and verified/valid signatures;
3. canonical authorization/evidence/runtime/test blobs needed to identify each bounded slice;
4. exact applicable machine qualification and post-merge workflow evidence for each slice, preserving failed/retried/service-blocked history honestly;
5. final substantive review evidence and resolution of material findings for each slice where applicable;
6. current-view reconciliation proof supporting each current closed-canonical state;
7. superseded/closed-unmerged candidates remain non-authority;
8. all R1-R17 work remained inside its respective exact authorization boundary;
9. no composition created benchmark execution, statistics, ranking, promotion, winner/default, release, persistence, learning, provider/model execution, or broader side-effect authority;
10. canonical P2 and general/public KodacBench limitations remain visible;
11. P3 overall remains open;
12. P3-R18+ remains unauthorized;
13. P4-P8 remain unauthorized;
14. project completion remains unestablished;
15. active protected-main ruleset/no-bypass state;
16. exact-head required repository CI and two distinct independent substantive terminal-clean semantic review channels for the closeout candidate itself;
17. zero unresolved actionable findings and review threads;
18. `WAIVER=NO`;
19. guarded normal merge using the exact qualified expected head;
20. complete post-merge proof of main, ordered parents, tree, six blobs, signature, applicable checks, ruleset and merged PR state.

The closeout evidence must preserve additional material live-GitHub repair/failure history it discovers; this authorization list is a minimum, not permission to omit evidence.

---

## 9. Preserved non-grants

The authorization and future closeout grant none of the following:

```text
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R18+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
P3 OVERALL CLOSURE = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT_ESTABLISHED
REAL BENCHMARK TASK / PARTICIPANT EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE / RESULT MUTATION = NOT_AUTHORIZED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED
GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR = NOT_AUTHORIZED
CROSS-DIMENSION AGGREGATE SCORE / WEIGHTING / MAJORITY / PARETO POLICY = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
MULTI-STRATEGY RANKING / LEADERBOARD / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION = NOT_AUTHORIZED
HOLDOUT SUFFICIENCY / UNBIASEDNESS / CONTAMINATION-FREE CLAIM = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT_AUTHORIZED
REPOSITORY CRAWLING / NEW FILESYSTEM ACQUISITION = NOT_AUTHORIZED
NETWORK / SECRET / SUBPROCESS / SANDBOX EXPANSION = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
CROSS-REPOSITORY AGGREGATION / LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## 10. Authorization-candidate qualification

This authorization candidate itself is one-path documentation/governance work only:

```text
docs/planning/KODAC_P3_BOUNDED_R1_R17_CLOSEOUT_AUTHORIZATION_2026-09-03.md
```

It is not canonical until one frozen exact head proves:

```text
BASE = current canonical main
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
APPLICABLE GOVERNANCE / K2 CHECKS = TERMINAL SUCCESS OR CANONICALLY PROVEN NON-APPLICABLE
INDEPENDENT SUBSTANTIVE SEMANTIC REVIEW CHANNELS = 2 / 2 TERMINAL CLEAN
UNRESOLVED ACTIONABLE FINDINGS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET 20707483 = active / bypass_actors=[] / current_user_can_bypass=never
MERGE = guarded normal merge / exact expected head
POST_MERGE PROOF = REQUIRED
WAIVER = NO
```

Any repository-byte or canonical-base movement invalidates prior exact-head qualification evidence.

Only after successful post-merge proof does the six-path closeout authority in Section 7 become effective.