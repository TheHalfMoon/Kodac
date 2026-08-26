# Kodac K6 Definition and Planning Authorization

## Record identity

- Date: 2026-08-26
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-26`
- Authority class: DOCUMENTATION / MILESTONE DEFINITION / PLANNING AUTHORIZATION ONLY
- Canonical base commit: `06a6e33ca78bc4d0bd68449292161e1e4dc96385`
- Canonical base tree: `e5fd53511f1730bcd6c2dd171899cd4f531b68c8`
- K5 bounded canonical closeout merge: `06a6e33ca78bc4d0bd68449292161e1e4dc96385` (PR #201)
- Governing roadmap: `docs/roadmap/ROADMAP.md`
- Governing constitution: `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`
- Canonical event/evidence direction: `docs/adr/ADR-0005-canonical-session-event-tool-protocol.md`
- Mandatory side-effect trust boundary: `docs/adr/ADR-0006-mandatory-trust-hook-side-effects.md`
- Future-intelligence research input: `docs/research/KODAC_FUTURE_INTELLIGENCE_RESEARCH_2026-08-16.md`
- Existing provider abstraction: `packages/kodac-runtime/src/model/provider.ts`
- Existing provider qualification: `packages/kodac-runtime/src/provider-qualification.ts`
- Existing KRI provider-neutral contracts: `packages/kodac-runtime/src/reviewer-intelligence/provider-contracts.ts`
- Canonical K5 closeout evidence: `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md`

## Decision

Define K6 as the next Kodac engineering milestone and authorize **planning and contract design only** after canonical adoption and post-merge proof of this exact record.

```text
K6 — EVIDENCE ROUTER & OUTCOME LEARNING
K6: DEFINED / PLANNING AUTHORIZED ONLY AFTER CANONICAL ADOPTION AND POST-MERGE PROOF OF THIS RECORD
K6-R1 IMPLEMENTATION: NOT AUTHORIZED BY THIS RECORD
K6-R2+: NOT AUTHORIZED
K7 IMPLEMENTATION: NOT AUTHORIZED
K5: CLOSED FOR THE CANONICAL K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE
DONE GATE / PROVEN_READY AUTHORITY: UNCHANGED
K2 SIDE-EFFECT AUTHORITY: UNCHANGED
```

Until this record itself is canonically adopted and post-merge proven, canonical K6 remains `PROPOSED / NOT AUTHORIZED`.

After canonical adoption, this record authorizes only repository-local, documentation-only K6 planning needed to produce a later exact K6-R1 implementation-authorization candidate. It does not authorize production source, tests, schemas, workflows, dependencies, provider calls, routing execution, persistence, learning mutation, or side effects.

## Why K6 exists

The canonical roadmap names K6 as **Evidence Router & Outcome Learning** with four bounded directions:

- evidence-backed capability/model/evaluator routing;
- task/risk/context-aware routing decisions;
- privacy-governed outcome learning;
- measurable feedback from verified engineering outcomes.

The accepted future-intelligence research adds a compatible long-term direction: a higher-level engineering policy may eventually choose which model, reviewer, evaluator, tool, or agent composition is worth invoking, observe verified outcomes, and improve strategy over time.

The constitutional boundary is equally important:

```text
SELF-IMPROVING != SELF-AUTHORIZING
ROUTING EVIDENCE != EXECUTION AUTHORITY
OUTCOME DATA != PERMISSION TO LEARN OR PERSIST
LEARNED PREFERENCE != TRUST POLICY
CANDIDATE ELIGIBILITY != PROVIDER QUALIFICATION
ROUTE DECISION != DONE GATE VERDICT
ROUTE DECISION != PROVEN_READY
```

K6 must therefore improve *decision quality* without creating a second execution authority, a second completion authority, or a hidden trust-policy mutation path.

## Governing invariants

### K2 remains the side-effect authority

Any later K6 route plan may at most become input to separately authorized orchestration. It cannot itself execute a provider, reviewer, model, tool, shell, process, filesystem operation, Git/GitHub mutation, network request, secret access, repository write, approval, or merge.

Every privileged or state-changing action remains behind the canonical K2 Trust Kernel / `ExecutionGateway` boundary.

### Done Gate remains completion authority

K6 cannot emit, infer, or promote `PROVEN_READY`. Routing success, evaluator preference, historical success rate, learned score, candidate eligibility, or route-plan confidence are not completion truth.

K5 and Done Gate evidence may inform later K6 planning only as caller-materialized evidence under a separately authorized contract. Authority does not follow that information flow.

### Existing provider and reviewer contracts are not duplicated

K6 planning must reuse or reference existing Kodac-owned abstractions where appropriate rather than silently creating competing provider/reviewer trust systems.

In particular:

- provider abstraction remains owned by the existing model/provider boundary;
- provider qualification remains separate from route eligibility or route preference;
- KRI retains reviewer finding/adjudication and reviewer-qualification semantics;
- K5 retains bounded proof-package/linkage/reconciliation semantics;
- K6 must not reinterpret any of those states as stronger authority.

### Self-improvement remains proposal/evidence driven

A future K6 learning surface may discover or propose better routing strategies only through explicit evidence and separately authorized promotion gates.

It may not silently:

- change trust policy;
- add a provider or tool;
- grant a capability;
- change repository governance;
- weaken evidence requirements;
- promote its own model or strategy into production;
- mutate Done Gate;
- expand network, secret, process, filesystem, Git/GitHub, or repository-write authority.

## K6 planning decomposition

The following is the bounded planning decomposition to be validated and made exact by later authorization records. This record does **not** authorize implementation of any slice.

```text
K6-R1 — caller-materialized route request + candidate-evidence contract and pure deterministic eligibility
K6-R2 — deterministic route-plan ordering / fallback semantics over already-eligible candidates
K6-R3 — exact linkage from executed route choices to caller-materialized verification, K5, Done Gate, and execution-receipt outcomes
K6-R4 — privacy-governed bounded outcome-record / memory contract with explicit retention and authority boundaries
K6-R5 — bounded strategy-improvement proposal and qualification without self-promotion or self-authorization
K6 CLOSEOUT — separate evidence and closeout gate
```

This decomposition is a planning constraint, not implementation authority. A later gate may refine names or combine slices only through explicit canonical authorization while preserving the same authority boundaries.

## K6-R1 planning target

The next authorized planning task after this record becomes canonical is to produce an exact K6-R1 authorization candidate for a **pure deterministic eligibility foundation**.

The R1 planning target must remain narrower than routing execution or learned selection:

```text
caller-materialized route request
+ caller-materialized candidate descriptors
+ caller-materialized evidence references / qualification states
+ explicit task / risk / context / privacy constraints
                     |
                     v
      pure deterministic eligibility evaluation
                     |
                     v
 eligible / ineligible candidate evidence + exact reasons
```

R1 planning must answer only whether a candidate is structurally and evidentially eligible to participate in a later route plan under exact caller-materialized constraints.

R1 planning must **not** authorize:

- invoking a candidate;
- selecting a winner based on learned history;
- contacting a provider;
- reviewer execution;
- model inference;
- tool execution;
- repository reads or writes at runtime;
- network access;
- secret access;
- filesystem/process/shell authority;
- Git/GitHub authority;
- persistent storage;
- vector/embedding infrastructure;
- online learning;
- background daemons;
- queues, RPC, MCP, ACP, webhooks, or public endpoints;
- automatic promotion of a candidate or policy.

## Required questions for the later K6-R1 authorization candidate

Before any K6-R1 source work can be authorized, the later R1 authorization must make the following exact and reviewable:

1. the closed route-request vocabulary and structural bounds;
2. the closed candidate-kind vocabulary;
3. which existing Kodac identities and qualification states may be referenced and which remain opaque;
4. the exact distinction between capability declaration, qualification evidence, route eligibility, route preference, and execution authority;
5. deterministic eligibility causes and their precedence;
6. exact identity/canonicalization rules;
7. handling of duplicate candidate/evidence identities;
8. stale, contradictory, missing, foreign-revision, and not-applicable evidence behavior;
9. task/risk/context/privacy constraint semantics;
10. order invariance and caller-mutation prohibitions;
11. proxy/hostile-input rejection and resource bounds;
12. the exact production/test/schema/workflow allowlist;
13. immutable predecessor blobs whose drift must fail the dedicated gate;
14. focused and full-regression test requirements;
15. exact-head CodeRabbit/Qodo review requirements;
16. post-merge proof and the stop boundary before K6-R2.

No ambiguity in these questions is permission to choose a permissive runtime default.

## Privacy and outcome-learning planning boundary

K6 is explicitly privacy-governed. Planning must distinguish at least:

- data already present in caller-materialized repository/runtime evidence;
- provider or reviewer outputs;
- execution receipts;
- K5 proof/reconciliation evidence;
- Done Gate outcomes;
- potentially sensitive repository or user data;
- aggregate or derived outcome metrics.

No persistent collection, telemetry, upload, retention, vectorization, embedding, model training, or cross-repository learning is authorized by this record.

A later K6-R4 gate must define retention, deletion, identity, provenance, conflict, privacy, and authority semantics before any persistent outcome memory can exist.

## No artificial product limits

Preserve the accepted product invariant:

```text
NO_KODAC_IMPOSED_ARTIFICIAL_LIMITS
```

This does not forbid bounded data structures, caller-configured safety/resource budgets, provider rate-limit handling, deterministic resource guards, or trust/security constraints.

K6 planning may reason about real compute cost, latency, availability, privacy, task value, and user-configured budgets. It must not turn those into arbitrary vendor-style daily/file/review quotas.

## Evidence and promotion discipline

A future K6 strategy must be evaluated using verified engineering outcomes, not model self-report or popularity alone.

Planning should preserve an evidence ladder such as:

```text
candidate declaration
< qualification evidence
< route eligibility evidence
< executed route receipt
< verification outcome
< K5 proof-review evidence where applicable
< Done Gate outcome where applicable
< controlled comparative strategy evidence
```

The exact ladder and any scoring semantics remain unapproved until later bounded gates.

No future K6 component may promote itself merely because it predicts that it is better.

## Exact scope of this gate

This candidate may change exactly one path:

```text
docs/planning/KODAC_K6_DEFINITION_AND_PLANNING_AUTHORIZATION_2026-08-26.md
```

No other documentation path is modified by this gate.

No source, test, schema, fixture, workflow, dependency, lockfile, package manifest, provenance policy, ruleset, protected lane, K2/K3/K4/K5/KRI runtime, Done Gate, PR #163, Z0-family artifact, secret, provider configuration, or release artifact is changed.

## What becomes authorized after canonical adoption

After and only after this exact record is merged and post-merge proven:

```text
K6 DEFINITION: CANONICAL
K6 PLANNING / CONTRACT DESIGN: AUTHORIZED
K6-R1 AUTHORIZATION-CANDIDATE PREPARATION: AUTHORIZED
K6-R1 SOURCE / TEST / SCHEMA / WORKFLOW IMPLEMENTATION: NOT AUTHORIZED
K6-R2+: NOT AUTHORIZED
K7: PROPOSED / NOT AUTHORIZED
```

The next mutation may therefore be a separate documentation-only K6-R1 authorization candidate. That later record must carry its own exact scope, contract, allowlist, CI/review gate, merge proof, and post-merge stop boundary.

## Preserved non-grants

```text
K6-R1 IMPLEMENTATION: NOT AUTHORIZED BY THIS RECORD
K6-R2+: NOT AUTHORIZED
K7 IMPLEMENTATION: NOT AUTHORIZED
DONE GATE MODIFICATION: NOT AUTHORIZED
PROVEN_READY AUTHORITY FROM K6: NOT AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION: NOT AUTHORIZED
ROUTING EXECUTION / AUTOMATIC FALLBACK EXECUTION: NOT AUTHORIZED
NETWORK / SECRET / PROCESS / FILESYSTEM-RUNTIME AUTHORITY: NOT AUTHORIZED
GIT / GITHUB / REPOSITORY WRITE / REVIEW / APPROVAL / MERGE AUTHORITY FROM K6: NOT AUTHORIZED
PERSISTENT OUTCOME / REVIEW / PROOF STORAGE: NOT AUTHORIZED
ONLINE / OFFLINE MODEL TRAINING FROM OUTCOMES: NOT AUTHORIZED
VECTOR / EMBEDDING INFRASTRUCTURE: NOT AUTHORIZED
CROSS-REPOSITORY LEARNING: NOT AUTHORIZED
AUTOMATIC STRATEGY PROMOTION: NOT AUTHORIZED
NEW DEPENDENCIES / DONOR SOURCE INTAKE: NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH: NOT AUTHORIZED
Z0 / Z0L / ZROK / PUBLIC ENDPOINT / PAYMENT / SECRET / GITHUB APP AUTHORITY: NOT AUTHORIZED
```

## Canonical adoption gate

This record remains non-canonical unless the exact final candidate proves all of the following:

1. PR base ref is exactly `main`;
2. PR base SHA and live protected `main` are exactly `06a6e33ca78bc4d0bd68449292161e1e4dc96385` with tree `e5fd53511f1730bcd6c2dd171899cd4f531b68c8`;
3. the diff is exactly the one authorized documentation path;
4. all applicable exact-head repository CI is terminal green;
5. fresh exact-head CodeRabbit and Qodo reviews have zero unresolved material correctness, security, or governance findings;
6. there are zero unresolved actionable review threads;
7. the final candidate head, tree, and document blob are captured;
8. merge uses normal merge-commit semantics guarded by the exact expected head SHA;
9. ordered merge parent 1 equals the pre-merge canonical main and parent 2 equals the exact qualified candidate head;
10. merge tree equals the qualified candidate tree and the document blob equals the qualified candidate blob;
11. protected `main` equals the merge commit/tree and the merge introduces exactly the authorized one path; and
12. applicable post-merge governance/shared checks reach terminal success.

If live `main` advances before merge, STOP. This record must be amended to record the replacement canonical base SHA/tree, the branch must receive a normal non-destructive forward merge from that exact `main`, and the resulting new head must be requalified from scratch for scope, CI, CodeRabbit, Qodo, review threads, mergeability, candidate tree, and document blob.

No rebase, force-push, destructive history rewrite, silent stale-base exception, or review waiver is permitted.

## Stop boundary

Even after this gate becomes canonical:

```text
DO NOT IMPLEMENT K6-R1
DO NOT ADD K6 SOURCE
DO NOT ADD K6 SCHEMAS OR WORKFLOWS
DO NOT ADD PERSISTENCE OR LEARNING
DO NOT INVOKE PROVIDERS / MODELS / REVIEWERS / EVALUATORS
```

First produce and canonically adopt a separate K6-R1 authorization record with an exact contract and implementation allowlist.

This planning gate grants no later implementation, execution, persistence, release, or operational authority by implication.