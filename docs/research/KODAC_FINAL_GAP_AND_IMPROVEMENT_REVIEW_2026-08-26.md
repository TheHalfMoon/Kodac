# Kodac Final Gap and Improvement Review — 2026-08-26

## Status

```text
CLASS: RESEARCH / GAP REVIEW / PLANNING INPUT ONLY
IMPLEMENTATION AUTHORITY: NONE
CODE IMPORT AUTHORITY: NONE
DEPENDENCY ADMISSION: NONE
EXTERNAL SERVICE AUTHORITY: NONE
```

This record is a final research and architecture review before a new improvement plan is adopted. It does not authorize implementation, dependency intake, provider calls, persistent learning, repository writes by Reviewer Intelligence, autofix execution, public release, or any expansion of K2 / K5 / Done Gate authority.

Live GitHub and canonical authorization records remain authoritative if any state below moves.

## 1. Review scope

The review covered four evidence classes:

1. current Kodac repository architecture and roadmap truth;
2. current K3 / KRI / K5 / K6 contracts and trust boundaries;
3. recent 2026 research on repository context retrieval, code review, verification, end-to-end coding-agent evaluation, multi-agent disagreement, and self-evolving coding agents;
4. current product patterns from GitHub Copilot, CodeRabbit, Qodo, and Greptile as product/research references only.

External product claims are treated as vendor-reported evidence, not benchmark truth. Research papers are treated as research evidence, not automatic product requirements.

## 2. Current live-state finding

At the time this record was prepared:

```text
CANONICAL_MAIN = 13348e3efa1cfa5a71eda692e1f1ea428882c763
ACTIVE_K6_R3_PR = #208
ACTIVE_K6_R3_HEAD = 3e84a6a831206d2f2f7364cc46024fb6e160575e
ACTIVE_K6_R3_TREE = 38cc441d60ba11749fe290e3ec9570267a05ddbd
```

The K6-R3 candidate has exact-head dedicated CI, governance, and K2 cross-platform runtime success. Qodo's fresh exact-head review reports no remaining material correctness, security, or governance findings. A fresh CodeRabbit review raised one remaining governance finding about binding qualification to the final reviewed head from inside the candidate workflow. That finding is under explicit adjudication because the proposed literal self-SHA fix is self-referential, while the canonical merge protocol separately captures the qualified head and uses a server-enforced expected-head precondition.

Therefore:

```text
K6-R3 = NOT YET CLOSED_CANONICAL
PR #208 = DO NOT MERGE WHILE MATERIAL REVIEW DISPOSITION IS UNSETTLED
WAIVER = NO
```

## 3. What Kodac already does unusually well

The review did **not** find a need to restart the architecture. Kodac already has several foundations that should be preserved as competitive advantages.

### 3.1 Proof-oriented authority separation

Kodac separates information from authority:

- K2 owns side-effect execution authority;
- K3 owns bounded repository/context evidence;
- KRI treats reviewer output as a claim rather than truth;
- K5 owns bounded proof review / reconciliation semantics;
- Done Gate retains completion truth;
- K6 routing evidence does not become execution or completion authority.

This is stronger than a conventional review bot architecture and should not be weakened to copy competitor convenience features.

### 3.2 Exact-revision and evidence identity

Kodac already treats one reviewed head as different from another head and binds evidence to exact repository identities. Recent PR qualification work has also exposed why CI/reviewer self-bypass must itself be reviewed.

### 3.3 Context Engine and relation graph foundation

K3 already provides deterministic Context Bundle and snapshot-bound relation evidence. The next opportunity is not simply “add embeddings”; it is to measure whether context is selected correctly for the task and whether the consumer actually uses it.

### 3.4 Finding adjudication instead of blind reviewer trust

KRI's principle remains correct:

> Reviewer output is an evidence-backed claim to adjudicate, not completion truth.

This principle should become more operational through verifiers, disagreement protocols, and benchmarked disposition quality.

### 3.5 Self-improving is already separated from self-authorizing

The K6 direction and future-intelligence research already preserve the correct safety invariant:

```text
SELF-IMPROVING != SELF-AUTHORIZING
```

The gap is now measurement, controlled outcome memory, and promotion gates — not permission for an agent to rewrite its own authority.

## 4. Material gaps

### GAP-01 — Roadmap truth drift

**Priority: P0**

`docs/roadmap/ROADMAP.md`, `MILESTONES.md`, and `VERSION_PLAN.md` still describe K6 primarily as proposed/not authorized even though K6 definition is canonical, K6-R1/R2 are canonical, and K6-R3 is an active bounded implementation PR.

Risk:

- new agents can start from stale ordering;
- humans must reconstruct state across many planning records;
- roadmap status and live GitHub truth can diverge silently.

Required improvement:

- establish one easy execution index (`docs/roadmap/NEXT.md`);
- treat it as a navigation/status view, never as a substitute for exact authorization records;
- reconcile the larger roadmap documents after K6-R3 reaches a canonical disposition;
- define a single rule for where milestone status is updated first.

### GAP-02 — No unified KodacBench measurement spine

**Priority: P0**

KRI-P0 lists useful future benchmark metrics, but Kodac does not yet have one benchmark architecture spanning context retrieval, review findings, adjudication, patch verification, security, routing, and full-cycle behavior.

Without this, “better reviewer”, “better context”, “better routing”, or “better autofix” cannot be proven consistently.

Required improvement:

- frozen reproducible benchmark corpus;
- temporal/live holdout to reduce contamination and memorization;
- task-family metrics rather than one blended score;
- per-stage measurements plus end-to-end outcome measurements;
- deterministic evidence manifests and exact revision identity;
- benchmark provenance and rights ledger;
- no public superiority claim without accepted evidence.

### GAP-03 — Context quality is not measured as a process

**Priority: P0**

Recent retrieval research shows that context acquisition itself is a major failure surface.

Required improvement:

- task taxonomy: `code2test`, `comment2context`, `trace2code`, `edit2ripple`, issue-to-edit localization, broader-context retrieval;
- no-gold / abstention cases;
- context recall, precision, and budgeted context yield;
- explored-context vs utilized-context distinction;
- context dilution measurement;
- task-specific retrieval strategies rather than a universal ranking method;
- vector/embedding infrastructure only if benchmark evidence justifies it.

### GAP-04 — More context can make review worse

**Priority: P0**

SWE-PRBench reports monotonic degradation as more context was added across its evaluated models, with a structured compact context outperforming richer full-context configurations.

Required improvement:

- Context Engine v2 must optimize **selective evidence packaging**, not context volume;
- context budgets must be observable;
- every context item should have a reason for inclusion;
- benchmark `diff-only`, `selective-context`, and richer-context configurations;
- high recall is not sufficient if attention dilution destroys precision.

### GAP-05 — Reviewer disagreement is under-specified

**Priority: P0/P1**

KRI correctly says majority vote is not truth, but does not yet define a concrete evidence-grounded disagreement protocol.

Recent Adversarial Review research shows that naive multi-agent agreement can create false consensus and that a small structured reviewer/critic protocol can outperform a larger agent team.

Required improvement:

- reviewer produces findings with evidence;
- critic must classify each material finding as `SUPPORTED`, `CONTRADICTED`, or `UNVERIFIED_CONCERN` (names remain contract decisions);
- disagreement must cite repository/evidence artifacts;
- the reviewed artifact is frozen for the review round;
- adjudication remains separate from reviewer/critic voting;
- large swarms are risk-triggered experiments, not a default architecture.

### GAP-06 — Findings lack a first-class verifier contract

**Priority: P0**

A finding today can be well-argued but still lack a direct way to prove or falsify the claimed defect.

Required improvement:

Each material finding should be able to reference a verifier proposal where applicable:

- deterministic static check;
- focused test;
- generated regression test;
- sandbox execution;
- schema/contract proof;
- dependency/security evidence;
- context-grounded rubric when execution is unavailable.

A verifier result is evidence, not automatic completion truth.

### GAP-07 — Patch correctness cannot equal “tests pass”

**Priority: P0**

SWE-Cycle and patch-correctness research reinforce that isolated task success and test success do not establish full correctness. Generated tests can help but can also be incomplete.

Required improvement:

- original tests + finding-specific regression;
- negative/edge-case tests where applicable;
- static review after fix;
- verification of unchanged contracts;
- K5 evidence reconciliation;
- exact-head re-review;
- optional mutation/fault injection for benchmark tasks;
- regression-survival measurement over later commits where possible.

### GAP-08 — Bounded autofix architecture is not yet defined

**Priority: P1**

Autofix is explicitly unauthorized today, which is correct. Before it is ever authorized, Kodac needs a proof-preserving design.

Required improvement:

```text
finding claim
-> adjudicated finding
-> patch proposal
-> exact write-scope proposal
-> K2-authorized execution only
-> verifier execution
-> independent re-review / critic
-> K5 reconciliation
-> Done Gate remains unchanged
```

A failed verifier must leave the patch untrusted. “Patch generated” and “finding fixed” must never be equivalent states.

### GAP-09 — Review instruction trust-root poisoning needs an explicit benchmark lane

**Priority: P1**

Current coding/review products increasingly consume repository instruction files, agent skills, MCP context, and path-specific rules. Some current GitHub documentation describes code review consuming instructions from the PR head branch. That creates an important general class of candidate-controlled-review-policy risk.

Kodac already states that repository content is data, not instructions. This must become an executable benchmark/security property.

Required improvement:

- explicit trusted instruction-source identity;
- base/canonical policy pinning where required;
- tests for malicious candidate changes to `AGENTS.md`, review instructions, skills, config, workflows, wrappers, and test entrypoints;
- fail-closed policy conflict handling;
- reviewer policy evidence included in review-run identity.

### GAP-10 — Rule health and governance are not yet a first-class data product

**Priority: P1**

Qodo's current product work highlights useful product patterns: central rule identity, duplicate/conflict/outdated-rule detection, scoped rules, and adoption/violation analytics.

Kodac should implement only Kodac-owned semantics if separately authorized.

Required improvement:

- immutable rule source/provenance identity;
- scope and precedence;
- conflict / duplicate / superseded / stale state;
- rule evidence vs trust authority separation;
- measured false-positive and adoption outcomes;
- no automatic promotion of inferred rules into canonical policy.

### GAP-11 — Outcome memory lacks an implemented privacy contract

**Priority: P1**

K6-R4 is already the correct planned boundary, but is not authorized/implemented.

Required improvement before persistence:

- exact record schema and provenance;
- privacy classification;
- allowed fields / forbidden raw content;
- retention and deletion;
- repository isolation;
- conflict and supersession;
- no cross-repository learning by default;
- no telemetry by implication;
- explicit user/team policy and authority boundaries.

### GAP-12 — Strategy improvement lacks a temporal promotion protocol

**Priority: P1**

K6-R5 is planned but not implemented.

Required improvement:

- strategy proposals are immutable candidates;
- qualify on frozen historical corpus and temporal holdout;
- compare against incumbent using accepted metrics;
- reject benchmark regressions even if one aggregate metric improves;
- record compute, latency, cost, privacy, and failure behavior;
- no automatic production promotion;
- rollback identity must be preserved.

### GAP-13 — Security validation should combine deterministic and agentic evidence

**Priority: P1**

Modern review products are converging on hybrid approaches: pattern/SAST/SCA/secret scanning plus AI reasoning for exploit chains and contextual false-positive reduction.

Required improvement:

- deterministic scanner evidence remains independently visible;
- AI security findings cannot erase scanner evidence;
- dependency / supply-chain evidence lane;
- secret detection lane;
- authorization and trust-boundary review lane;
- CI self-bypass / workflow integrity lane;
- exploitability reasoning as a claim with evidence;
- high-risk security findings require stronger verification than ordinary style findings.

### GAP-14 — Full-cycle engineering evaluation is missing

**Priority: P1**

SWE-Cycle shows a sharp performance drop when environment reconstruction, implementation, and verification generation are combined.

Required improvement:

KodacBench must separately score:

1. environment/readiness reconstruction;
2. issue/spec understanding;
3. localization/context acquisition;
4. plan/task decomposition;
5. implementation;
6. verification generation;
7. review/adjudication;
8. final proof/Done Gate inputs;
9. integrated full-cycle outcome.

### GAP-15 — Reviewer/model independence is a promising experiment, not a rule

**Priority: P2**

Greptile reports improved review when a different model family reviews agent-authored code. This is useful experimental evidence but currently vendor-reported and should not become trust policy without KodacBench evidence.

Required improvement:

- record authoring-agent/model identity when caller-materialized and permitted;
- benchmark same-family vs cross-family reviewers;
- control for model capability and context;
- never treat diversity alone as correctness evidence.

### GAP-16 — Formal verification should be a high-risk optional lane

**Priority: P2 / RESEARCH**

Repository-level formal-verification benchmarks such as Vero show both value and current limitations. Kodac should not impose formal proof on ordinary code, but may later evaluate it for cryptographic, authorization, serialization, or protocol invariants where proof tooling already exists.

## 5. Research evidence that changes the design

### 5.1 Context / retrieval

- Agent Retrieval Bench — https://arxiv.org/abs/2607.24882
  - 427 samples across 25 repositories;
  - no single retrieval family dominates;
  - includes natural no-gold and wrong-repository controls;
  - logged trajectories miss all gold files on a material fraction of tasks.

- ContextBench — https://arxiv.org/abs/2602.05892
  - 1,136 tasks / 66 repositories / eight languages;
  - measures context recall, precision, and efficiency throughout trajectories;
  - reports a substantial explored-vs-utilized context gap.

- SWE Context Bench — https://arxiv.org/abs/2602.08316
  - experience reuse helps when correctly selected and summarized;
  - unfiltered or incorrect prior experience can hurt.

### 5.2 Code review

- SWE-PRBench — https://arxiv.org/abs/2603.26130
  - 350 PRs with human-annotated review ground truth;
  - evaluated models detect only a minority of human issues;
  - richer context can reduce review quality through attention dilution.

- Code Review Agent Benchmark / c-CRAB — https://arxiv.org/abs/2603.23448
  - benchmark generated from human reviews plus held-out tests;
  - evaluated review agents collectively solve only about 40% of tasks;
  - human and agent reviews often catch different aspects.

- Adversarial Review — https://arxiv.org/abs/2608.18167
  - reviewer + critic structured disagreement;
  - naive agreement can create false consensus;
  - evidence-grounded disagreement can outperform larger agent teams.

### 5.3 End-to-end and verification

- SWE-Cycle — https://arxiv.org/abs/2605.13139
  - 489 instances;
  - environment reconstruction, implementation, verification generation, and FullCycle;
  - full-cycle performance drops materially versus isolated tasks.

- RACE-Bench — https://arxiv.org/abs/2603.26337
  - 528 repository-level feature-addition instances;
  - executable patch verification plus structured intermediate reference artifacts;
  - supports measuring localization/decomposition failures rather than only final patch success.

- Agentic Rubrics as Contextual Verifiers — https://arxiv.org/abs/2601.04171
  - repository-interacting expert builds contextual rubrics;
  - useful as scalable supplemental verification when execution is unavailable;
  - should not replace executable evidence when executable evidence is available.

### 5.4 Self-evolving coding agents

- Self-Evolving Coding Agents — https://arxiv.org/abs/2608.03392
  - survey highlights executable feedback and trajectories as useful evolution signals;
  - also identifies feedback reliability, benchmark overfitting, safety, maintainability, cost, and generalization as major risks.

This supports K6-R5's controlled proposal/qualification direction and argues against silent self-modification.

## 6. Product-pattern evidence — reference only

### CodeRabbit

References:

- https://docs.coderabbit.ai/issues/planner
- https://docs.coderabbit.ai/plan/plan-refinement
- https://docs.coderabbit.ai/guides/commands

Useful patterns:

- plans consistently structured as Summary / Research / Design Choices / Phases / Tasks / Agent Prompt;
- explicit full vs incremental review modes;
- agent-ready handoff;
- version history for plans.

Kodac improvement:

Use the navigability pattern, but retain Kodac's stronger proof and authority model.

### Qodo

References:

- https://docs.qodo.ai/code-review
- https://docs.qodo.ai/whats-new

Useful patterns:

- specialized review agents;
- centralized rule identity and scoped enforcement;
- duplicate/conflict/outdated rule health;
- PR-history relevance and findings analytics;
- local pre-commit review.

Kodac improvement:

Treat learned/inferred rules as proposals until separately qualified; do not let reviewer history silently become authority.

### Greptile

References:

- https://www.greptile.com/changelog
- https://www.greptile.com/blog/automating-code-validation
- https://www.greptile.com/blog/trex-code-execution

Useful patterns:

- hypothesis-scoped narrow parallel reviewers;
- deterministic security scanning + AI exploit reasoning;
- targeted test generation in a sandbox;
- local/CLI review;
- read-only related-repository context;
- outcome-driven review personalization;
- experimental author/reviewer model diversity.

Kodac improvement:

Benchmark each idea under Kodac-owned contracts before adoption. Do not copy auto-approval or opaque learning semantics into Kodac's trust model.

### GitHub Copilot / CodeQL Autofix

References:

- https://docs.github.com/en/code-security/concepts/code-scanning/autofix-for-code-scanning
- https://docs.github.com/en/copilot/concepts/agents/code-review

Useful lessons:

- agentic autofix explores the repository and re-runs CodeQL where supported;
- GitHub explicitly describes autofix as best-effort and documents validation limits;
- code review can consume repository instructions, skills, and MCP context;
- instruction source identity must therefore be treated as a security property in Kodac.

## 7. Recommended architecture direction

Do **not** turn Kodac into a larger swarm review bot.

The recommended long-term flow is:

```text
Task / PR / spec
      |
      v
K3 Context Engine v2
selective, task-specific, evidence-labeled context
      |
      v
KRI Reviewer Intelligence v2
hypothesis-focused reviewer lanes
      |
      v
evidence-grounded critic / disagreement
      |
      v
finding adjudication
      |
      v
Finding Verifier Fabric
static | generated test | sandbox | rubric | security evidence
      |
      v
K5 proof linkage / reconciliation
      |
      +------------------------------+
      |                              |
      v                              v
Done Gate (unchanged)         bounded patch proposal
                                     |
                                     v
                           K2-only authorized execution
                                     |
                                     v
                              exact-head re-proof
                                     |
                                     v
                         K6 outcome record / strategy data
                                     |
                                     v
                      benchmarked strategy proposal only
```

The key product claim should become:

> Kodac does not merely comment on code. Kodac builds an evidence chain that tries to prove whether a software change is safe, correct, intentional, and ready — without allowing the reviewer to become its own authority.

## 8. What should not be built yet

Do not authorize by implication:

- persistent cross-repository memory;
- hidden telemetry;
- vector infrastructure without benchmark need;
- autonomous rule promotion;
- autonomous model/provider admission;
- default large swarms;
- reviewer auto-approval;
- direct merge authority;
- unverified autofix;
- training on repository data;
- public superiority claims;
- release/package publication.

## 9. Final review conclusion

Kodac's core architecture is directionally strong. The biggest current risk is not missing another framework; it is **failing to turn strong contracts into a measurable, navigable, proof-producing product loop**.

The highest-value improvements are therefore, in order:

1. repair roadmap truth and execution navigation;
2. close K6-R3 without waiving the remaining review disposition;
3. finish K6 privacy-governed outcome memory and bounded strategy qualification through separate gates;
4. define KodacBench before claiming intelligence improvements;
5. make context selective and measurable;
6. make reviewer disagreement explicit and evidence-grounded;
7. attach verifiers to material findings;
8. only then define bounded autofix through K2;
9. add hybrid security validation and temporal outcome learning under explicit authority;
10. productize through local/CLI/CI surfaces only after benchmark evidence supports the behavior.
