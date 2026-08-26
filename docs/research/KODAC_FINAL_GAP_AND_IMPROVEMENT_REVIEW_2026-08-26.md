# Kodac Final Gap and Improvement Review — 2026-08-26

## Status and authority

```text
CLASS: RESEARCH / GAP REVIEW / PLANNING INPUT ONLY
IMPLEMENTATION AUTHORITY: NONE
DEPENDENCY ADMISSION: NONE
EXTERNAL SERVICE AUTHORITY: NONE
PERSISTENCE / TELEMETRY / LEARNING AUTHORITY: NONE
AUTOFIX AUTHORITY: NONE
PUBLIC RELEASE AUTHORITY: NONE
```

This is the final reconciled research review supporting the Kodac intelligence improvement master plan. It records evidence, gaps and recommendations. It does not authorize implementation.

Live GitHub, root `AGENTS.md`, governing ADRs and exact canonical authorization records remain controlling.

## Canonical state at final reconciliation

```text
CANONICAL_MAIN = 4ed9bed6fdb23643c722298adfba4ae8e72097b2
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = NOT_AUTHORIZED
K6-R5 = NOT_AUTHORIZED
WAIVER = NO
```

K6-R3 closed through PR #208. The final qualified candidate was `3e84a6a831206d2f2f7364cc46024fb6e160575e`; the guarded GitHub merge is `4ed9bed6fdb23643c722298adfba4ae8e72097b2`. Post-merge proof established the expected parent/tree relationship, valid GitHub merge signature, successful governance/provenance/legacy tests, and successful K2 Ubuntu/macOS/Windows/runtime-gate execution.

Any earlier draft text that described PR #208 as active or K6-R3 as not yet closed is superseded by this reconciled record.

---

# 1. Review question

The review asked:

> What is still missing for Kodac to become a best-in-class proof-oriented software validation system, while preserving its authority separation and making the repository easy for coding agents to continue correctly?

Evidence classes reviewed:

1. current Kodac architecture, ADRs, K3/KRI/K5/K6 contracts and roadmap state;
2. current code-review and coding-agent product patterns;
3. 2026 research on repository retrieval/context, code review, disagreement, verification, full-cycle agent evaluation and self-evolving coding agents;
4. current execution/governance failures observed during Kodac's own exact-head qualification work.

External product claims are treated as vendor-reported evidence. Research papers are evidence, not automatic requirements. Neither grants authority or dependency admission.

---

# 2. What Kodac already does well

## 2.1 Authority separation

Kodac already has a strong constitutional distinction between information and authority:

```text
K2 = bounded side-effect execution authority
K3 = repository/context evidence
KRI = reviewer claims and qualification evidence
K5 = proof review/reconciliation evidence
Done Gate = completion authority
K6 = routing/outcome intelligence without automatic execution authority
```

This should be preserved. Kodac should not become a generic “AI reviewer that can also edit code” by bypassing these boundaries.

## 2.2 Exact revision identity

Kodac treats one reviewed head as different from another head. This is a major advantage for review correctness, stale-evidence detection and merge safety.

## 2.3 Evidence-first review semantics

Reviewer output is already treated as a claim rather than truth. The next improvement is to make more claims directly falsifiable through verifier evidence.

## 2.4 Repository intelligence foundation

K3 already provides deterministic context and snapshot-bound relation evidence. The next step is not simply more context or embeddings; it is measured context quality and task-specific selection.

## 2.5 Self-improvement without self-authorization

The K6 direction preserves the right invariant:

```text
SELF-IMPROVING != SELF-AUTHORIZING
```

The missing pieces are privacy-governed outcome records, bounded qualification, general benchmarking and explicit promotion gates.

---

# 3. Material gaps and required improvements

## GAP-01 — Roadmap truth drift

**Priority: P0**

Current roadmap views can lag behind canonical implementation evidence. This already happened around K6-R1/R2/R3.

Required improvement:

- root `AGENTS.md`;
- one concise `docs/roadmap/NEXT.md` current-action page;
- durable master plan separate from live status;
- explicit reconciliation after each canonical merge;
- current roadmap views must never silently override exact authorization records.

## GAP-02 — No unified KodacBench measurement spine

**Priority: P0/P1**

Kodac lacks one general benchmark architecture spanning context, review, verification, security, routing and full-cycle behavior.

Required improvement:

- immutable benchmark manifests;
- frozen reproducible corpus;
- later-in-time holdout/reality-check lane;
- task-family metrics rather than one blended score;
- exact model/provider/strategy/evaluator identities;
- contamination/provenance controls;
- no broad “best” claim without accepted evidence.

## GAP-03 — Context quality is not measured as a process

**Priority: P1**

Measure:

- Recall@K / Precision@K;
- file F1;
- token-budgeted evidence yield;
- no-gold abstention;
- explored vs actually utilized context;
- duplicate/low-value context;
- quality as context budget grows.

No retrieval method should be assumed universally superior.

## GAP-04 — More context can reduce review quality

**Priority: P1**

Recent repository-review research reports attention dilution as richer context is added.

Required direction:

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

Context Engine v2 should benchmark diff-only, selective-context and richer-context configurations rather than assuming context volume is beneficial.

## GAP-05 — Reviewer disagreement needs a concrete protocol

**Priority: P1**

Majority vote or agent agreement is not truth.

Future reviewer/critic design should require evidence-grounded dispositions such as:

```text
SUPPORTED
CONTRADICTED
UNVERIFIED_CONCERN
DUPLICATE_OR_SUPERSEDED
```

Exact vocabulary requires a future contract gate.

Large swarms should be experiments triggered by risk/benchmark evidence, not the default architecture.

## GAP-06 — Findings need first-class verifier proposals

**Priority: P1**

Material findings should be able to propose a falsification/verification method, for example:

```text
STATIC_RULE
TYPECHECK
SCHEMA_VALIDATION
FOCUSED_TEST
GENERATED_REGRESSION
SANDBOX_EXECUTION
SECURITY_SCAN
DEPENDENCY_EVIDENCE
CONTEXTUAL_RUBRIC
FORMAL_PROOF
```

Verifier output remains evidence, not Done Gate authority.

## GAP-07 — Tests passing is insufficient patch proof

**Priority: P1**

Patch verification should combine, where applicable:

- original tests;
- finding-specific regression;
- negative/edge cases;
- static/type/schema checks;
- exact-head re-review;
- K5 reconciliation;
- held-out or mutation/fault evidence in benchmark settings.

Required invariant:

```text
TESTS GREEN != COMPLETE CORRECTNESS
```

## GAP-08 — Bounded autofix architecture is not defined

**Priority: P2**

Autofix should remain unauthorized until its proof-preserving lifecycle is explicit:

```text
ADJUDICATED FINDING
-> IMMUTABLE PATCH PROPOSAL
-> EXACT WRITE SCOPE
-> K2-BOUNDED EXECUTION
-> VERIFIER RE-RUN
-> EXACT-HEAD RE-REVIEW
-> K5 RECONCILIATION
-> DONE GATE
```

`PROPOSED`, `APPLIED`, `VERIFIED` and `REJECTED` must remain distinct states.

## GAP-09 — Candidate-controlled review-policy poisoning needs a dedicated lane

**Priority: P1**

Modern agents/reviewers consume repository instructions, skills, configs and workflow files. Candidate changes to these surfaces can attempt to redefine the reviewer itself.

Required improvement:

- trusted instruction/policy source identity;
- tests for malicious candidate changes to agent/review instructions, skills, configs, workflows and wrappers;
- policy conflict handling;
- reviewer policy identity included in review-run evidence;
- repository text remains data, not authority.

## GAP-10 — Rule health should become first-class evidence

**Priority: P2**

Future rule governance should capture:

- source/provenance;
- scope/precedence;
- duplicate/conflict/superseded/stale states;
- violation and false-positive evidence;
- inferred proposal vs canonical policy distinction.

No inferred rule should silently become canonical policy.

## GAP-11 — Outcome memory lacks an implemented privacy contract

**Priority: P1 / K6-R4**

Before any persistence, define:

- allowed/forbidden fields;
- privacy classification;
- local-first behavior;
- repository/user isolation;
- provenance;
- retention/deletion/expiry;
- conflict/supersession;
- telemetry/egress rules;
- cross-repository boundaries.

No persistence or telemetry by implication.

## GAP-12 — Strategy improvement needs bounded qualification and external promotion

**Priority: P1 / K6-R5**

K6-R5 should create immutable candidate strategy proposals and compare them to an explicit incumbent using only an R5-authorized bounded corpus/holdout.

Critical sequencing boundary:

```text
K6-R5-SPECIFIC QUALIFICATION CORPUS != GENERAL KODACBENCH
```

Full KodacBench comes after bounded K6 closeout. R5 evidence cannot justify broad reviewer/context/product superiority claims.

No automatic promotion.

## GAP-13 — Security validation needs deterministic + agentic evidence

**Priority: P2**

Future security validation should preserve independently visible lanes for:

- static/SAST evidence;
- dependency/SCA evidence;
- secrets;
- supply-chain/provenance;
- authorization/trust-boundary review;
- CI/workflow self-bypass;
- exploitability reasoning.

AI reasoning may contextualize deterministic findings but cannot erase them.

## GAP-14 — Full-cycle engineering evaluation is missing

**Priority: P2**

Measure separately:

1. environment/readiness reconstruction;
2. issue/spec understanding;
3. localization/context acquisition;
4. planning/decomposition;
5. implementation;
6. verification generation;
7. review/adjudication;
8. proof-chain completion;
9. integrated full-cycle outcome.

This prevents strong isolated scores from hiding poor end-to-end behavior.

## GAP-15 — Reviewer/model independence is an experiment, not a trust rule

**Priority: RESEARCH**

Cross-family reviewers may improve diversity, but this must be benchmarked against same-family reviewers while controlling for capability and context.

Model diversity alone is not correctness evidence.

## GAP-16 — Formal verification is a targeted high-risk lane

**Priority: RESEARCH**

Formal proof may later be valuable for cryptographic, authorization, serialization or protocol invariants where tools/contracts make it practical. It should not become a blanket requirement for ordinary code.

---

# 4. Research evidence that materially changes the plan

## Context and retrieval

### Agent Retrieval Bench

https://arxiv.org/abs/2607.24882

Design implication:

- no single retrieval family dominates;
- natural no-gold/negative cases matter;
- retrieval itself must be evaluated rather than assumed.

### ContextBench

https://arxiv.org/abs/2602.05892

Design implication:

- measure recall, precision and efficiency throughout trajectories;
- distinguish explored context from actually utilized context.

### SWE Context Bench

https://arxiv.org/abs/2602.08316

Design implication:

- correctly selected/summarized prior experience can help;
- unfiltered or incorrect experience can hurt.

## Code review

### SWE-PRBench

https://arxiv.org/abs/2603.26130

Design implication:

- current models detect only a minority of human review issues;
- richer context can reduce review quality through dilution;
- selective context should be benchmarked explicitly.

### Code Review Agent Benchmark / c-CRAB

https://arxiv.org/abs/2603.23448

Design implication:

- current review agents still leave substantial human-review ground truth uncovered;
- human and agent review can catch different defect classes;
- Kodac should optimize validated finding coverage rather than comment volume.

### Adversarial Review

https://arxiv.org/abs/2608.18167

Design implication:

- naive multi-agent agreement can create false consensus;
- structured reviewer/critic disagreement with evidence is a stronger default direction than a large swarm.

## Verification and full-cycle evaluation

### SWE-Cycle

https://arxiv.org/abs/2605.13139

Design implication:

- environment reconstruction, implementation and verification are individually easier than the integrated lifecycle;
- benchmark the full engineering cycle, not only patch success.

### RACE-Bench

https://arxiv.org/abs/2603.26337

Design implication:

- executable patch verification plus structured intermediate artifacts can expose localization/decomposition failure rather than only final outcomes.

### Agentic Rubrics as Contextual Verifiers

https://arxiv.org/abs/2601.04171

Design implication:

- contextual rubrics can supplement verification where execution is unavailable;
- executable evidence remains preferable when available.

## Self-evolving coding agents

### Self-Evolving Coding Agents

https://arxiv.org/abs/2608.03392

Design implication:

- executable feedback and trajectories are useful improvement signals;
- reliability, overfitting, safety, cost and generalization remain major risks;
- supports K6's proposal/qualification model rather than silent self-modification.

---

# 5. Product-pattern evidence — reference only

Product references reviewed include current public materials from:

- CodeRabbit — https://docs.coderabbit.ai/
- Qodo — https://docs.qodo.ai/
- Greptile — https://www.greptile.com/
- GitHub Copilot / code review / code scanning autofix — https://docs.github.com/

Useful patterns include:

- cross-file/context-aware review;
- configurable review rules;
- rule conflict/health concepts;
- security and reliability finding lanes;
- review suggestions and agentic autofix;
- repository instruction consumption;
- different reviewer/model configurations.

These are product references only. Kodac should implement only Kodac-owned semantics that are separately authorized and benchmarked.

---

# 6. Final architecture recommendation

Kodac should not compete by producing the most comments or using the most agents.

Recommended differentiator:

> **Proof-oriented software validation:** retrieve the minimum sufficient context, generate evidence-backed claims, challenge them through structured disagreement, verify material findings where possible, bind every result to the exact revision, reconcile the evidence, and improve strategies only through bounded qualification and explicit promotion.

Target flow:

```text
PR / TASK
-> TASK-AWARE CONTEXT
-> REVIEWER HYPOTHESES
-> EVIDENCE-BACKED FINDINGS
-> STRUCTURED CRITIC
-> ADJUDICATION
-> VERIFIER EVIDENCE
-> K5 RECONCILIATION
-> DONE GATE
```

Future bounded autofix:

```text
ADJUDICATED FINDING
-> PATCH PROPOSAL
-> K2 EXECUTION
-> VERIFICATION
-> RE-REVIEW
-> K5
-> DONE GATE
```

---

# 7. Recommended priority order

```text
P0  agent/navigation + roadmap truth
P1  K6-R4 privacy-governed outcome records
P1  K6-R5 bounded strategy proposal/qualification
P1  K6 bounded closeout
P2  general KodacBench
P3  Context Engine v2
P4  Reviewer Intelligence v2
P5  Finding Verifier Fabric
P6  Security Validation
P7  Bounded Autofix
P8  Product / Distribution Hardening
R   formal proof / cross-repo / world models / learned policies / large swarms
```

Each implementation unit still requires the authority process defined by the repository.

---

# 8. Final decision

```text
RESTART_ARCHITECTURE = NO
PRESERVE_K2_K3_KRI_K5_K6_AUTHORITY_SEPARATION = YES
MAKE_AGENT_NAVIGATION_FIRST_CLASS = YES
MEASURE_BEFORE_BROAD_QUALITY_CLAIMS = YES
CONTEXT_ENGINE_DIRECTION = SELECTIVE / TASK-AWARE / DILUTION-MEASURED
REVIEWER_DIRECTION = EVIDENCE-GROUNDED REVIEWER + CRITIC
VERIFIER_FABRIC = RECOMMENDED
SECURITY = HYBRID DETERMINISTIC + AGENTIC EVIDENCE
AUTOFIX = FUTURE / BOUNDED / K2-EXECUTED / RE-PROVEN
LEARNING = PROPOSAL + QUALIFICATION + EXPLICIT PROMOTION ONLY
SELF_AUTHORIZATION = FORBIDDEN BY DESIGN
```

The next durable source for execution sequencing is `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`; the current-action source is `docs/roadmap/NEXT.md` after live GitHub and `AGENTS.md` are read.
