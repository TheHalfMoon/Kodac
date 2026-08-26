# Kodac — NEXT

> **Start here before doing repository work.**

## Authority

This file is a **navigation and status index only**. It does not grant implementation authority.

If it conflicts with live GitHub, `AGENTS.md`, governing ADRs, or a canonical authorization record, the live/more authoritative source wins.

Always re-read live GitHub before mutation.

---

# Current canonical snapshot — 2026-08-26

```text
CANONICAL_MAIN = 4ed9bed6fdb23643c722298adfba4ae8e72097b2
CANONICAL_TREE = 38cc441d60ba11749fe290e3ec9570267a05ddbd

K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL

K6-R3_MERGE = 4ed9bed6fdb23643c722298adfba4ae8e72097b2
K6-R4+ IMPLEMENTATION = NOT AUTHORIZED
WAIVER = NO
```

K6-R3 post-merge proof on the exact canonical merge established:

```text
ordered parent 1 = 13348e3efa1cfa5a71eda692e1f1ea428882c763
ordered parent 2 = 3e84a6a831206d2f2f7364cc46024fb6e160575e
merge tree = exact qualified candidate tree
GitHub signature = VERIFIED / VALID
post-merge governance = SUCCESS
post-merge provenance = SUCCESS
post-merge legacy-tests = SUCCESS
post-merge K2 Ubuntu = SUCCESS
post-merge K2 macOS = SUCCESS
post-merge K2 Windows = SUCCESS
post-merge k2-runtime-gate = SUCCESS
```

---

# NOW

## N0 — Qualify and canonically adopt the intelligence improvement plan

Active planning PR:

```text
PR = #209
TITLE = docs(kodac): add intelligence improvement master plan
STATE = DRAFT UNTIL ITS OWN EXACT-HEAD PLANNING GATES ARE SATISFIED
```

Do **not** trust a head SHA copied into this file. Read the live PR #209 head immediately before qualification or mutation.

PR #209 should contain only the intended documentation/planning scope unless a later explicit roadmap-reconciliation extension is separately reviewed.

Core documents:

1. `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`
2. `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
3. `docs/roadmap/NEXT.md`

### N0 qualification rules

- current PR head/base/scope must be re-read;
- `main` must be an ancestor or be merged into the planning branch by normal non-destructive history;
- governance and applicable shared checks must pass on the exact candidate;
- fresh CodeRabbit/Qodo material findings must be adjudicated;
- no unresolved actionable review threads;
- no implementation/dependency/provider/persistence/autofix/release authority may leak from planning prose;
- no circular dependency in P0-P8 ordering;
- external research/vendor claims must remain evidence/reference claims, not automatic requirements;
- no review waiver.

### N0 exit

```text
INTELLIGENCE_IMPROVEMENT_PLAN = CLOSED_CANONICAL
```

or an explicit evidence-backed planning blocker.

---

# NEXT

Only after the plan itself is canonically adopted.

## N1 — Reconcile legacy roadmap views

The older roadmap views still contain stale historical K5/K6 wording and must be reconciled to live canonical truth without rewriting historical authorization.

Target views:

- `docs/roadmap/ROADMAP.md`
- `docs/roadmap/MILESTONES.md`
- `docs/roadmap/VERSION_PLAN.md`
- this file if state changes during the reconciliation

Required resulting truth:

```text
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4+ = NOT AUTHORIZED UNTIL A SEPARATE CANONICAL GATE EXISTS
K6 AS A WHOLE = NOT YET CLOSED UNTIL ITS EXPLICITLY AUTHORIZED BOUNDED REMAINDER / CLOSEOUT IS PROVEN
K7 / FULL KODACBENCH = NOT AUTHORIZED BY K6 OR THIS NAVIGATION FILE
```

## N2 — Prepare K6-R4 authorization candidate

Planning target:

```text
PRIVACY-GOVERNED BOUNDED OUTCOME RECORD / MEMORY
```

Before any R4 implementation, a separate canonical authorization must define at least:

- exact allowed stored fields;
- forbidden raw/sensitive fields;
- exact provenance identities;
- repository/user isolation;
- retention/deletion/expiration;
- conflict/supersession;
- local-first behavior;
- no telemetry/upload by implication;
- no cross-repository learning by default.

### R4 non-grants remain explicit

```text
STRATEGY PROMOTION = NOT AUTHORIZED
MODEL TRAINING = NOT AUTHORIZED
CROSS-REPOSITORY AGGREGATION = NOT AUTHORIZED
NEW PROVIDER INVOCATION = NOT AUTHORIZED BY R4 PLANNING
NEW K2 AUTHORITY = NOT AUTHORIZED
```

## N3 — Prepare K6-R5 authorization candidate

Only after R4 becomes canonical for its separately authorized scope.

Planning target:

```text
BOUNDED STRATEGY-IMPROVEMENT PROPOSAL + QUALIFICATION
```

A strategy may propose better context/reviewer/model/tool routing, but may not promote itself.

### Critical boundary: K6-R5 qualification != KodacBench

R5 may define only the **minimum bounded qualification corpus/fixtures explicitly authorized for R5** to compare a candidate strategy against an incumbent.

If R5 uses a temporal holdout, that holdout is R5-specific.

R5 evidence is **not** automatically:

```text
FULL KODACBENCH
GENERAL REVIEWER BENCHMARK
GENERAL CONTEXT BENCHMARK
PUBLIC SUPERIORITY EVIDENCE
PRODUCTION-READINESS EVIDENCE
```

## N4 — K6 bounded closeout

After the explicitly authorized R1-R5 bounded scopes are proven, perform a separate closeout gate.

Expected meaning:

```text
K6 = CLOSED FOR ITS EXPLICITLY AUTHORIZED BOUNDED SCOPE
```

That still does not authorize public release or broad intelligence claims.

---

# THEN — Improvement program after K6 closeout

## T1 — KodacBench

Purpose:

```text
GENERAL MEASUREMENT SPINE FOR LATER INTELLIGENCE IMPROVEMENTS
```

Required families:

```text
CONTEXT RETRIEVAL
CODE REVIEW
FINDING ADJUDICATION
VERIFICATION / PATCH CORRECTNESS
SECURITY
ROUTING
FULL-CYCLE ENGINEERING
```

Required design:

- frozen reproducible corpus;
- later-in-time temporal/live reality-check lane;
- exact repository snapshots;
- provenance/license records;
- contamination controls;
- task-family metrics rather than one misleading score;
- latency/compute/cost/privacy metrics;
- immutable evaluation reports.

No broad “best” claim without accepted evidence.

## T2 — Context Engine v2

Target:

```text
MINIMUM SUFFICIENT EVIDENCE, NOT MAXIMUM CONTEXT
```

Measure:

- task-specific retrieval quality;
- no-gold/abstention;
- recall/precision;
- explored vs utilized context;
- token-budgeted context yield;
- context dilution.

Embeddings/vector infrastructure is admitted only if benchmark evidence and a separate authority gate justify it.

## T3 — Reviewer Intelligence v2

Target:

```text
HYPOTHESIS-FOCUSED REVIEW + EVIDENCE-GROUNDED DISAGREEMENT
```

Direction:

- narrow risk hypotheses rather than generic large swarms;
- reviewer + critic protocol;
- structured supported/contradicted/unverified-like states;
- majority vote is not truth;
- rule provenance/conflict/staleness;
- explicit incremental vs cumulative review;
- candidate-controlled instructions cannot redefine reviewer authority.

## T4 — Finding Verifier Fabric

Future verifier families may include:

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

Combine deterministic security evidence with agentic exploit reasoning while keeping both independently visible.

High-risk benchmark lanes include:

- auth/authz;
- secrets;
- CI/trust policy;
- candidate-controlled instructions;
- dependency/supply chain;
- provenance substitution;
- workflow/test self-bypass.

AI cannot erase scanner evidence by assertion.

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

Potential later surfaces:

- local/pre-commit review;
- CLI review;
- stable machine-readable findings/evidence;
- agent-ready handoffs;
- transparent benchmark reports;
- distribution/release hardening.

Public release remains separately authorized.

---

# RESEARCH LATER

Do not execute by default:

- author/reviewer model-family diversity;
- cross-repository context;
- formal-verification lane;
- repository world model / engineering surprise;
- learned high-level engineering policy;
- cross-repository learning.

---

# Global stop conditions

Stop and report the exact blocker when:

- `main` moved and exact-base evidence matters;
- active PR head moved;
- a material review finding has unsettled disposition;
- next implementation authorization does not exist;
- predecessor identities drift;
- a dependency/source/provider/tool requires new authority;
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

# One-line rule

```text
LIVE TRUTH -> ACTIVE AUTHORIZATION -> IMPLEMENT -> EXACT-HEAD PROOF -> GUARDED MERGE -> POST-MERGE PROOF -> UPDATE NEXT -> CONTINUE
```
