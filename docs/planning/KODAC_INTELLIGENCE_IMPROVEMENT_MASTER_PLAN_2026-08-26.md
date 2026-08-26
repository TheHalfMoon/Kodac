# Kodac Intelligence Improvement Master Plan — 2026-08-26

## Authority

```text
CLASS: DOCUMENTATION / MASTER PLANNING / EXECUTION SEQUENCING
IMPLEMENTATION AUTHORITY: NONE
DEPENDENCY ADMISSION: NONE
PROVIDER / MODEL / REVIEWER EXECUTION AUTHORITY: NONE
AUTOFIX AUTHORITY: NONE
PERSISTENCE / TELEMETRY / LEARNING AUTHORITY: NONE
PUBLIC RELEASE AUTHORITY: NONE
```

This is the durable execution map for Kodac improvements. It does not authorize an implementation slice by itself. Live GitHub, `AGENTS.md`, governing ADRs, and the exact canonical authorization record for the active unit always win.

Detailed evidence and research rationale live in:

- `docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md`

The short current-state page is:

- `docs/roadmap/NEXT.md`

## Operating rule

Every implementation session follows this sequence:

```text
LIVE GITHUB TRUTH
-> READ AGENTS.md
-> READ docs/roadmap/NEXT.md
-> READ EXACT AUTHORIZATION FOR ONE ACTIVE UNIT
-> EXECUTE ONLY THAT UNIT / ALLOWLIST
-> EXACT-HEAD CI + REVIEW PROOF
-> GUARDED MERGE WITH EXPECTED HEAD
-> POST-MERGE MAIN / TREE / BLOB / CI PROOF
-> RECONCILE ROADMAP TRUTH
-> CONTINUE TO THE NEXT AUTHORIZED UNIT
```

Never infer implementation authority from this roadmap.

---

# Current canonical starting point

At the adoption boundary for this plan:

```text
CANONICAL_MAIN = 4ed9bed6fdb23643c722298adfba4ae8e72097b2
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = NOT_AUTHORIZED
K6-R5 = NOT_AUTHORIZED
WAIVER = NO
```

K6-R3 closed through PR #208. Its merge proof binds candidate head `3e84a6a831206d2f2f7364cc46024fb6e160575e` to merge `4ed9bed6fdb23643c722298adfba4ae8e72097b2`, with the qualified tree, signed GitHub merge, and successful post-merge governance and K2 runtime gates.

If live `main` differs, re-read live state before acting. This snapshot is not a merge precondition for future units.

---

# Product direction

Kodac should become a **proof-oriented software validation intelligence system**:

```text
CHANGE
-> SELECTIVE CONTEXT
-> EVIDENCE-BACKED REVIEW CLAIMS
-> STRUCTURED CRITIC / DISAGREEMENT
-> VERIFIER EVIDENCE
-> K5 PROOF RECONCILIATION
-> DONE GATE
```

Future bounded autofix adds:

```text
ADJUDICATED FINDING
-> IMMUTABLE PATCH PROPOSAL
-> K2-BOUNDED EXECUTION
-> VERIFIER RE-RUN
-> EXACT-HEAD RE-REVIEW
-> K5 RECONCILIATION
-> DONE GATE
```

Non-negotiable invariants:

```text
INTELLIGENCE != AUTHORITY
REVIEW != PROOF
MORE CONTEXT != BETTER CONTEXT
AGENT AGREEMENT != TRUTH
TESTS GREEN != COMPLETE CORRECTNESS
PATCH APPLIED != FIXED
ROUTING EVIDENCE != EXECUTION AUTHORITY
SELF-IMPROVING != SELF-AUTHORIZING
```

---

# Program sequence

| Stage | Name | Purpose | Current status |
| --- | --- | --- | --- |
| P0 | Canonical truth & navigation | Make the repo easy to follow | Plan adoption + roadmap reconciliation |
| P1 | Finish bounded K6 | Privacy-governed outcomes + bounded strategy proposals | R1-R3 closed; R4/R5 not authorized |
| P2 | KodacBench | General measurement spine | Not authorized |
| P3 | Context Engine v2 | Minimum sufficient evidence | Not authorized |
| P4 | Reviewer Intelligence v2 | Evidence-grounded reviewer/critic | Not authorized |
| P5 | Finding Verifier Fabric | Make findings falsifiable | Not authorized |
| P6 | Security Validation | Deterministic + agentic security evidence | Not authorized |
| P7 | Bounded Autofix | Propose, execute through K2, re-prove | Not authorized |
| P8 | Product & Distribution Hardening | CLI/CI/local/agent-friendly product surface | Not authorized |
| R | Advanced research | Formal proof, world models, learned policies, cross-repo | Research only |

Canonical dependency order:

```text
P0
-> K6-R4 authorization + implementation + closeout
-> K6-R5 authorization + bounded qualification + closeout
-> K6 bounded closeout
-> P2 KodacBench
-> P3 Context Engine v2
-> P4 Reviewer Intelligence v2
-> P5 Finding Verifier Fabric
-> P6 Security Validation
-> P7 Bounded Autofix
-> P8 Product / Distribution Hardening
```

Research and design may happen earlier. Implementation may not skip its authorization/dependency boundary.

---

# P0 — Canonical truth and navigation

## Goal

A new human or coding agent can determine the correct next unit in minutes without reconstructing historical PRs.

## P0.1 — Adopt this plan

Canonical adoption requires:

- documentation-only scope;
- no source, workflow, dependency, provider, model, persistence, execution, release, or learning mutation;
- governance and K2 required checks terminal green on the exact candidate;
- fresh review of sequencing, authority boundaries, and navigation;
- zero unresolved material findings;
- normal guarded merge and post-merge proof.

## P0.2 — Reconcile legacy roadmap views

After this plan is canonical, update:

- `docs/roadmap/ROADMAP.md`
- `docs/roadmap/MILESTONES.md`
- `docs/roadmap/VERSION_PLAN.md`
- `docs/roadmap/NEXT.md`

Required truth:

```text
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4/R5 = NOT_AUTHORIZED unless a later canonical record says otherwise
```

Do not rewrite historical authorization records. Reconcile only current roadmap/status views.

## P0 exit

```text
ONE OBVIOUS EXECUTION FRONT DOOR = PASS
ROADMAP STATUS MATCHES CANONICAL MAIN = PASS
NO AUTHORITY INFERRED FROM ROADMAP TEXT = PASS
```

---

# P1 — Finish bounded K6

## K6-R4 — Privacy-governed outcome records

A separate R4 authorization must define before implementation:

- exact allowed record fields;
- prohibited raw/sensitive content;
- repository/user isolation;
- local-first storage behavior;
- provenance identities;
- retention, deletion, expiry, conflict and supersession;
- optional/fail-closed persistence semantics;
- no telemetry/upload by implication;
- no cross-repository learning by default.

Possible future record families may include route, reviewer, finding, verifier and strategy-trial outcomes. Names are not schemas and grant no authority.

R4 non-grants:

```text
NO STRATEGY PROMOTION
NO MODEL TRAINING
NO PROVIDER INVOCATION
NO CROSS-REPOSITORY AGGREGATION
NO NEW K2 AUTHORITY
```

## K6-R5 — Bounded strategy proposal and qualification

A separate R5 authorization may compare one immutable candidate strategy to one explicit incumbent using only a **bounded R5-specific qualification corpus/holdout** authorized for that slice.

This resolves the sequencing boundary:

```text
R5-SPECIFIC QUALIFICATION CORPUS != GENERAL KODACBENCH
```

R5 must not depend on the later full KodacBench implementation. Its bounded evidence cannot support broad claims such as “best reviewer”, “best context engine” or general production readiness.

Required R5 safeguards:

- immutable/versioned candidate and incumbent identities;
- exact qualification corpus identity and provenance;
- explicit task-family guardrails;
- no self-reported reward as truth;
- latency/compute/privacy/security visible independently;
- no automatic promotion;
- rollback identity retained;
- promotion remains a separate human/canonical decision.

## K6 closeout

After R4 and R5 are separately authorized, implemented, qualified, merged and proven, a separate closeout record must prove the bounded R1-R5 surface and preserve all non-grants.

---

# P2 — KodacBench

## Goal

No broad “better” claim without reproducible evidence.

KodacBench is broader than the bounded R5 corpus and should measure:

### Context

- Recall@K / Precision@K;
- file F1;
- token-budgeted evidence yield;
- no-gold abstention;
- explored vs utilized context;
- context dilution as budget grows.

### Review

- material-finding recall;
- precision / false-positive rate;
- severe/security recall;
- duplicate/superseded finding rate;
- stale-finding detection;
- adjudication accuracy;
- false-consensus rate.

### Verification

- defect reproduction;
- verifier precision;
- generated regression usefulness;
- original/held-out test survival;
- false-`FIXED` rate;
- environment reconstruction success.

### System

- latency;
- compute/tokens;
- provider cost when applicable;
- local-only/static fallback coverage;
- privacy/egress behavior;
- cross-platform reproducibility.

Benchmark architecture requires both:

1. a frozen reproducible corpus; and
2. a versioned later-in-time holdout/reality-check lane to reduce contamination and Goodhart effects.

Benchmark reports are immutable evidence with exact benchmark, strategy, model/provider and evaluator identities.

---

# P3 — Context Engine v2

## Goal

Optimize **minimum sufficient evidence**, not maximum context volume.

Planned capabilities:

- task/risk-aware retrieval planning;
- lexical/symbol, relation/dependency, tests, architecture/spec and history evidence lanes;
- optional embeddings only after benchmark proof;
- machine-readable reason for every selected context item;
- explicit context budget and duplicate/dilution controls;
- calibrated abstention when useful evidence is absent;
- later repository-local experience retrieval only after R4 privacy semantics exist.

Cross-repository context remains research-only until separately authorized.

P3 promotion requires KodacBench evidence that selective context improves or matches accepted quality without unacceptable dilution/regression.

---

# P4 — Reviewer Intelligence v2

## Goal

Increase useful recall without noisy consensus swarms.

Prefer narrow, evidence-triggered hypotheses such as:

- authorization drift;
- identity/state mismatch;
- concurrency/race;
- data loss;
- security exploitability;
- compatibility break;
- CI/workflow self-bypass;
- resource bounds;
- spec/intent mismatch.

For material findings, introduce a structured critic/disagreement contract with evidence references. Example semantic states for later contract design:

```text
SUPPORTED
CONTRADICTED
UNVERIFIED_CONCERN
DUPLICATE_OR_SUPERSEDED
```

Agreement is not proof. Adjudication remains separate from reviewer/critic voting.

Finding v2 should carry exact review identity, policy identity, risk hypothesis, evidence references, claimed invariant, confidence/calibration, verifier proposal, critic state, adjudication state, freshness, and duplicate/supersession links.

---

# P5 — Finding Verifier Fabric

## Goal

Make high-value findings falsifiable.

Possible later verifier classes:

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

Reviewer Intelligence proposes verifier work; it does not gain execution authority. Side-effecting verification remains behind K2 or another separately canonical execution boundary.

Verifier output is evidence, not completion truth.

---

# P6 — Security Validation

## Goal

Combine deterministic security evidence with contextual reasoning without hiding either.

Planned lanes:

- SAST/static rule evidence;
- dependency/SCA evidence;
- secret detection;
- supply-chain/provenance checks;
- authorization/trust-boundary review;
- workflow/CI self-bypass checks;
- exploitability reasoning as an evidence-backed claim.

AI security findings cannot erase scanner evidence. High-risk findings require stronger verification than ordinary review findings.

Tool/dependency intake requires separate provenance, license, sandbox, egress and benchmark authorization.

---

# P7 — Bounded Autofix

Autofix remains unauthorized until separately gated.

Required future lifecycle:

```text
ADJUDICATED FINDING
-> IMMUTABLE PATCH PROPOSAL
-> EXACT WRITE SCOPE
-> K2 EXECUTION
-> VERIFIER RE-RUN
-> ORIGINAL TESTS / NEGATIVE CASES
-> EXACT-HEAD RE-REVIEW
-> K5 RECONCILIATION
-> DONE GATE
```

States such as `PROPOSED`, `APPLIED`, `VERIFIED` and `REJECTED` must remain distinct. A patch is never trusted merely because it applied or tests passed.

---

# P8 — Product and Distribution Hardening

Only after core validation quality is proven, harden:

- local-first CLI experience;
- GitHub/CI integration;
- machine-readable evidence output;
- clear agent integration contracts;
- deterministic/static fallback when models/providers are unavailable;
- installation/update integrity;
- privacy/egress controls;
- operational docs and examples;
- release/version separation from engineering milestone status.

Public release, package publication and brand claims require their own authorization.

---

# Advanced research — not implementation authority

Research-only candidates include:

- same-family vs cross-family reviewer diversity;
- formal proof for high-risk invariants;
- repository world models;
- cross-repository retrieval;
- learned high-level engineering policies;
- multi-agent specialist ensembles.

Research may propose later gates. It cannot silently create them.

---

# Global stop rules

Stop rather than improvise when any of these occur:

- no explicit authorization exists for the implementation slice;
- `main`, exact head, ruleset, required checks or review state drift from qualified evidence;
- changed files exceed the authorized allowlist;
- a new dependency/tool/provider/model is required but not admitted;
- a material review/security finding remains unresolved;
- work would expand K2, K5 or Done Gate authority by implication;
- persistence/telemetry/learning is required without its privacy authority;
- benchmark evidence does not support the claimed promotion;
- merge would require force-push, rebase, destructive history rewrite or stale evidence reuse.

`WAIVER=NO` unless a separate explicit canonical process says otherwise.

---

# Agent handoff contract

A continuation handoff should contain only:

```text
REPOSITORY
CANONICAL_MAIN
ACTIVE_UNIT
AUTHORIZATION_RECORD
ACTIVE_PR / EXACT_HEAD if applicable
EXACT_ALLOWED_PATHS
PROVEN_GATES
UNRESOLVED_BLOCKERS
NEXT_ELIGIBLE_UNIT
NON_GRANTS / STOP_RULES
```

The receiving agent must still re-read live GitHub, root `AGENTS.md`, `docs/roadmap/NEXT.md`, and the exact authorization before mutation.

---

# Definition of plan success

This plan is successful when:

1. the repo has one obvious current-action page;
2. roadmap truth stays synchronized with canonical state;
3. improvements are benchmarked before broad quality claims;
4. context becomes selective rather than simply larger;
5. reviewer disagreement becomes evidence-grounded rather than consensus-driven;
6. material findings become verifiable/falsifiable;
7. security evidence combines deterministic and contextual lanes without erasing either;
8. autofix, if ever authorized, remains inside the existing proof chain;
9. learning remains proposal/qualification based rather than self-authorizing;
10. a new agent can continue the project without reconstructing hidden history.
