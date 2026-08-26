# Kodac — NEXT

> Start here before doing repository work.

## Authority

This file is a **navigation and status index only**. It does not grant implementation authority.

If this file conflicts with live GitHub, `AGENTS.md`, governing ADRs, or a canonical authorization record, the live/more authoritative source wins.

## Current snapshot — 2026-08-26

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

Always re-read live GitHub before relying on this snapshot.

---

# NOW

## N0 — Finish the exact K6-R3 disposition

Read:

1. `AGENTS.md`
2. governing ADRs
3. `docs/planning/KODAC_K6_DEFINITION_AND_PLANNING_AUTHORIZATION_2026-08-26.md`
4. `docs/planning/KODAC_K6_R3_ROUTE_OUTCOME_LINKAGE_AUTHORIZATION_2026-08-26.md`
5. PR #208 live state

Current evidence snapshot:

```text
Dedicated K6-R3 exact-head CI = SUCCESS
Governance = SUCCESS
K2 Ubuntu = SUCCESS
K2 macOS = SUCCESS
K2 Windows = SUCCESS
k2-runtime-gate = SUCCESS
Qodo fresh exact-head review = NO MATERIAL FINDINGS
Inline actionable review threads = RESOLVED
```

Current blocker:

```text
CODERABBIT_FRESH_REVIEW_DISPOSITION = UNSETTLED
```

CodeRabbit raised a material governance concern about binding workflow qualification to the final reviewed candidate SHA. The concern is being adjudicated against the complete canonical merge protocol because a literal candidate SHA embedded in the same candidate commit is self-referential, while the authorization separately requires captured exact-head evidence and a server-enforced expected-head merge precondition.

### N0 rule

```text
DO NOT MERGE #208 WHILE A MATERIAL REVIEW FINDING HAS UNSETTLED DISPOSITION.
DO NOT WAIVE IT.
DO NOT CHANGE THE CANDIDATE ONLY TO SILENCE A REVIEWER WITHOUT PROVING THE REVIEWER IS CORRECT.
```

If #208 changes, all earlier exact-head CI/review evidence becomes stale.

### N0 exit

Exactly one state:

```text
K6-R3 = CLOSED_CANONICAL
```

or:

```text
K6-R3 = EXPLICITLY_BLOCKED_WITH_EVIDENCE
```

---

# NEXT

Only after N0 reaches a canonical disposition.

## N1 — Reconcile roadmap truth

Update the roadmap views so they match live canonical engineering state:

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

Before implementation, define:

- exact stored fields;
- forbidden raw/sensitive fields;
- provenance;
- repository isolation;
- retention/deletion;
- conflict/supersession;
- local-first behavior;
- no telemetry by implication;
- no cross-repository learning by default.

Implementation requires a separate canonical authorization.

## N3 — K6-R5 authorization candidate

Planning target:

```text
bounded strategy-improvement proposal + qualification
```

The strategy may propose better context/reviewer/model/tool routing, but may not promote itself.

Required future qualification:

- frozen benchmark;
- temporal holdout;
- incumbent comparison;
- task-family guardrails;
- latency/cost/privacy/security evidence;
- explicit promotion decision outside the strategy itself.

## N4 — K6 closeout

Separate canonical closeout after the explicitly authorized R1-R5 scope is proven.

---

# THEN

## T1 — Define KodacBench before major intelligence claims

Read:

- `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`
- `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`

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

Required benchmark properties:

- frozen reproducible corpus;
- temporal/live holdout;
- exact repository snapshots;
- provenance/license records;
- task-family metrics;
- no single misleading aggregate score;
- latency/compute/cost/privacy metrics;
- contamination controls.

## T2 — Context Engine v2

Target:

```text
minimum sufficient evidence, not maximum context
```

Key work:

- task-specific retrieval;
- no-gold/abstention;
- context recall/precision;
- explored vs utilized context;
- token-budgeted context yield;
- dilution measurement;
- embeddings only if benchmark evidence justifies them.

## T3 — Reviewer Intelligence v2

Target:

```text
hypothesis-focused review + evidence-grounded disagreement
```

Key work:

- narrow risk hypotheses;
- reviewer + critic protocol;
- `SUPPORTED / CONTRADICTED / UNVERIFIED_CONCERN`-like states;
- no majority-vote truth;
- finding verifier proposals;
- rule provenance/conflict/staleness;
- explicit incremental vs cumulative review.

## T4 — Finding Verifier Fabric

Potential verifier families:

```text
static rule
schema/type validation
focused regression
AI-generated regression
sandbox execution
security scan
contextual rubric
formal proof where appropriate
```

Execution authority remains separate.

## T5 — Security Validation

Combine deterministic evidence with AI exploit reasoning.

Required special cases:

- auth/authz;
- secrets;
- CI/trust policy;
- candidate-controlled instructions;
- dependency/supply-chain;
- provenance substitution;
- workflow/test self-bypass.

## T6 — Bounded Autofix

Only after review + verifier foundations are proven.

Required flow:

```text
adjudicated finding
-> patch proposal
-> exact write scope
-> K2 execution
-> verifier rerun
-> exact-head re-review
-> K5 reconciliation
-> Done Gate remains completion authority
```

Never equate `PATCH_APPLIED` with `FIXED`.

## T7 — Product / distribution hardening

Later surfaces may include:

- local/pre-commit review;
- CLI review;
- machine-readable findings/evidence;
- agent-ready handoffs;
- benchmark reports;
- release/distribution hardening.

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
- privacy rules for persistence are undefined;
- verifier evidence is insufficient;
- a strategy tries to promote itself;
- any reviewer tries to become Done Gate / merge authority.

No force-push. No rebase. No destructive history rewrite. No review waiver.

---

# One-line execution rule

```text
LIVE TRUTH -> ACTIVE AUTHORIZATION -> IMPLEMENT -> EXACT-HEAD PROOF -> GUARDED MERGE -> POST-MERGE PROOF -> UPDATE NEXT -> CONTINUE
```
