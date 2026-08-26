# Kodac — NEXT

> Start here before doing repository work.

## Authority

This file is a **navigation and status index only**. It does not grant implementation authority.

If it conflicts with live GitHub, `AGENTS.md`, governing ADRs, or a canonical authorization record, the live/more authoritative source wins.

---

# Current snapshot — 2026-08-26

Planning snapshot when this file was authored:

```text
CANONICAL_MAIN = 13348e3efa1cfa5a71eda692e1f1ea428882c763

K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = ACTIVE / NOT YET CLOSED_CANONICAL

ACTIVE_PR = #208
ACTIVE_HEAD = 3e84a6a831206d2f2f7364cc46024fb6e160575e
ACTIVE_TREE = 38cc441d60ba11749fe290e3ec9570267a05ddbd

K6-R4+ IMPLEMENTATION = NOT AUTHORIZED
WAIVER = NO
```

**Always re-read live GitHub before relying on this snapshot.**

---

# NOW

## N0 — Finish the exact K6-R3 disposition

Read in order:

1. `AGENTS.md`
2. governing ADRs
3. `docs/planning/KODAC_K6_DEFINITION_AND_PLANNING_AUTHORIZATION_2026-08-26.md`
4. `docs/planning/KODAC_K6_R3_ROUTE_OUTCOME_LINKAGE_AUTHORIZATION_2026-08-26.md`
5. PR #208 live state

Current evidence snapshot:

```text
DEDICATED K6-R3 EXACT-HEAD CI = SUCCESS
GOVERNANCE = SUCCESS
K2 UBUNTU = SUCCESS
K2 MACOS = SUCCESS
K2 WINDOWS = SUCCESS
K2 RUNTIME GATE = SUCCESS
QODO FRESH EXACT-HEAD REVIEW = NO MATERIAL FINDINGS
ACTIONABLE INLINE THREADS = RESOLVED
```

Current blocker at authoring time:

```text
CODERABBIT_FRESH_REVIEW_DISPOSITION = UNSETTLED
```

CodeRabbit raised a material governance concern about binding workflow qualification to the final reviewed candidate SHA. That finding is being adjudicated against the complete canonical merge protocol because a literal final SHA embedded in the same candidate commit is self-referential, while the canonical authorization separately requires captured exact-head evidence plus a server-enforced expected-head merge precondition.

### N0 rule

```text
DO NOT MERGE #208 WHILE A MATERIAL REVIEW FINDING HAS UNSETTLED DISPOSITION.
DO NOT WAIVE IT.
DO NOT CHANGE THE CANDIDATE ONLY TO SILENCE A REVIEWER WITHOUT PROVING THE REVIEWER IS CORRECT.
```

If #208 changes, all earlier exact-head CI/review evidence is stale.

### N0 exit

Exactly one:

```text
K6-R3 = CLOSED_CANONICAL
```

or

```text
K6-R3 = EXPLICITLY_BLOCKED_WITH_EVIDENCE
```

---

# NEXT

Only after N0 reaches an explicit canonical disposition.

## N1 — Reconcile roadmap truth

Update current roadmap views so they match canonical engineering state:

- `docs/roadmap/ROADMAP.md`
- `docs/roadmap/MILESTONES.md`
- `docs/roadmap/VERSION_PLAN.md`
- this file

Do not retroactively rewrite historical authorization.

## N2 — K6-R4 authorization candidate

Planning target:

```text
privacy-governed bounded outcome record / memory
```

Before implementation, define at least:

- exact stored fields;
- forbidden raw/sensitive fields;
- provenance identities;
- repository/user isolation;
- retention/deletion/expiration;
- conflict/supersession;
- local-first behavior;
- no telemetry/upload by implication;
- no cross-repository learning by default.

K6-R4 implementation requires a separate canonical authorization.

## N3 — K6-R5 authorization candidate

Planning target:

```text
bounded strategy-improvement proposal + qualification
```

A strategy may propose better context/reviewer/model/tool routing, but may not promote itself.

### Important: K6-R5 qualification is not KodacBench

K6-R5 may define only the **minimum bounded qualification corpus/fixtures required by its exact authorization** to compare a candidate strategy with an incumbent.

If R5 uses a temporal holdout, it is an R5-specific qualification artifact only.

It must not be treated as:

```text
FULL KODACBENCH
GENERAL REVIEWER BENCHMARK
GENERAL CONTEXT BENCHMARK
PUBLIC SUPERIORITY EVIDENCE
PRODUCTION-READINESS EVIDENCE
```

Full KodacBench comes **after K6 closeout** below.

Required R5 safeguards:

- immutable strategy proposal;
- explicit incumbent;
- bounded reproducible qualification evidence;
- no self-reported reward as truth;
- no automatic promotion;
- relevant regression guardrails;
- latency/compute/privacy/security kept visible;
- rollback identity preserved.

## N4 — K6 closeout

After the explicitly authorized R1-R5 bounded scopes are proven, perform a separate closeout gate.

Expected bounded outcome:

```text
K6 = CLOSED FOR ITS EXPLICITLY AUTHORIZED SCOPE
```

This does **not** mean public release or general intelligence superiority.

---

# THEN

## T1 — Define KodacBench

Read:

- `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`
- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`

Purpose:

```text
GENERAL MEASUREMENT SPINE FOR LATER INTELLIGENCE IMPROVEMENTS
```

Benchmark families:

```text
CONTEXT RETRIEVAL
CODE REVIEW
FINDING ADJUDICATION
VERIFICATION / PATCH CORRECTNESS
SECURITY
ROUTING
FULL-CYCLE ENGINEERING
```

Required properties:

- frozen reproducible corpus;
- temporal/live reality-check lane;
- exact repository snapshots;
- provenance/license records;
- task-family metrics;
- contamination controls;
- no single misleading aggregate score;
- latency/compute/cost/privacy metrics.

No broad “best” claim without accepted evidence.

## T2 — Context Engine v2

Target:

```text
MINIMUM SUFFICIENT EVIDENCE, NOT MAXIMUM CONTEXT
```

Key work:

- task-specific retrieval;
- no-gold/abstention;
- context recall/precision;
- explored vs utilized context;
- token-budgeted context yield;
- context dilution measurement;
- embeddings only if benchmark evidence justifies them.

## T3 — Reviewer Intelligence v2

Target:

```text
HYPOTHESIS-FOCUSED REVIEW + EVIDENCE-GROUNDED DISAGREEMENT
```

Key work:

- narrow risk hypotheses;
- reviewer + critic protocol;
- structured `SUPPORTED / CONTRADICTED / UNVERIFIED_CONCERN`-like states;
- no majority-vote truth;
- rule provenance/conflict/staleness;
- explicit incremental vs cumulative review;
- candidate-controlled instructions cannot redefine reviewer authority.

## T4 — Finding Verifier Fabric

Potential verifier families:

```text
STATIC RULE
TYPE / SCHEMA VALIDATION
FOCUSED REGRESSION
GENERATED REGRESSION
SANDBOX EXECUTION
SECURITY SCAN
DEPENDENCY EVIDENCE
CONTEXTUAL RUBRIC
FORMAL PROOF WHERE APPROPRIATE
```

Verifier execution authority remains separate from Reviewer Intelligence.

## T5 — Security Validation

Combine deterministic evidence with agentic exploit reasoning.

Required high-risk cases include:

- auth/authz;
- secrets;
- CI/trust policy;
- candidate-controlled instructions;
- dependency/supply-chain;
- provenance substitution;
- workflow/test self-bypass.

AI findings cannot erase deterministic scanner evidence by assertion.

## T6 — Bounded Autofix

Only after review + verifier foundations are benchmark-proven.

Required flow:

```text
ADJUDICATED FINDING
-> PATCH PROPOSAL
-> EXACT WRITE SCOPE
-> K2 EXECUTION
-> VERIFIER RERUN
-> EXACT-HEAD RE-REVIEW
-> K5 RECONCILIATION
-> DONE GATE REMAINS COMPLETION AUTHORITY
```

Never equate `PATCH_APPLIED` with `FIXED`.

## T7 — Product / Distribution Hardening

Later surfaces may include:

- local/pre-commit review;
- CLI review;
- machine-readable findings/evidence;
- agent-ready handoffs;
- transparent benchmark reports;
- distribution/release hardening.

Public release still requires separate authority.

---

# RESEARCH LATER

Do not execute by default:

- author/reviewer model-family diversity;
- cross-repository context;
- formal-verification lane;
- repository world model / engineering surprise;
- learned high-level engineering policy;
- cross-repository learning.

These require evidence and separate gates.

---

# Global stop conditions

Stop and report the exact blocker when:

- `main` moved and exact-base evidence matters;
- active PR head moved;
- a material review finding is unresolved;
- next implementation authorization does not exist;
- predecessor identities drift;
- a dependency/source/provider/tool would need new authority;
- provider/network/secret access is needed without authority;
- privacy rules for persistence are undefined;
- benchmark evidence is insufficient or contaminated;
- verifier evidence is insufficient;
- a strategy tries to promote itself;
- a reviewer tries to become execution, approval, merge, K5, or Done Gate authority.

```text
NO FORCE-PUSH
NO REBASE
NO DESTRUCTIVE HISTORY REWRITE
NO REVIEW WAIVER
NO SILENT SCOPE EXPANSION
```

---

# One-line execution rule

```text
LIVE TRUTH -> ACTIVE AUTHORIZATION -> IMPLEMENT -> EXACT-HEAD PROOF -> GUARDED MERGE -> POST-MERGE PROOF -> UPDATE NEXT -> CONTINUE
```
