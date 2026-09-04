# Kodac Trust and Verification Master Plan v2 Amendment

## Record identity

```text
STATUS = PLANNING_AMENDMENT_CANDIDATE / NOT_CANONICAL
ISSUE_INPUT_DATE = 2026-09-02
CANDIDATE_DATE = 2026-09-04
DECISION_OWNER = KODAC FOUNDER
CANONICAL_BASE = 2c5b8d747bdd0b8bceefb2261c8513bc16e1ec2d
P2_R6_CURRENT_VIEW_RECONCILIATION = PR #319 / CLOSED_CANONICAL
P2_R6_CURRENT_VIEW_RECONCILIATION_PROOF = PR #319 / comment 5538190559
SUCCESSOR_ANALYSIS = PR #319 / comment 5538202729
SOURCE_PLANNING_INPUT = issue #303
WAIVER = NO
```

This record is an additive planning amendment candidate. It supplements rather
than rewrites:

```text
docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md
```

The historical master plan, final gap review, accepted ADRs, authorization
records, evidence records, and post-merge proofs remain preserved as historical
and governing evidence according to their own scope.

Issue #303 is planning input only. Neither the issue nor this unmerged candidate
creates implementation authority.

---

## 1. Authority and deny-by-default boundary

```text
CLASS = DOCUMENTATION / MASTER PLANNING AMENDMENT
IMPLEMENTATION AUTHORITY = NONE
BENCHMARK PARTICIPANT EXECUTION AUTHORITY = NONE
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT PRODUCT INVOCATION AUTHORITY = NONE
DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / TELEMETRY / LEARNING AUTHORITY = NONE
AUTOFIX / REMEDIATION EXECUTION AUTHORITY = NONE
CLI / API / PRODUCT INTEGRATION AUTHORITY = NONE
PUBLIC RELEASE / PACKAGE PUBLICATION AUTHORITY = NONE
RULESET CHANGE / BYPASS AUTHORITY = NONE
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

External semantic review services may be used only as independent governance
qualification evidence under the canonical provider-neutral review-quorum
amendment. That use does not grant product, benchmark, or runtime invocation
authority.

This amendment uses future-facing words such as `should`, `target`, `proposed`,
and `potential`. They describe design direction only. No stage, provider,
dependency, runtime, side effect, release, or successor becomes authorized merely
because it appears here.

Live GitHub truth, root `AGENTS.md`, accepted ADRs, exact canonical
authorization/evidence records, and active protected-branch rules remain
controlling.

---

## 2. Canonical state at candidate start

```text
K0 / K1 = CLOSED
K2 = CLOSED / TRUSTED SIDE-EFFECT EXECUTION BOUNDARY
K3-R1 THROUGH K3-R6 BOUNDED SCOPE = CLOSED
KRI-R1 THROUGH KRI-R4 = CLOSED_CANONICAL
K4-R1 THROUGH K4-R5 BOUNDED DATA-ONLY SCOPE = CLOSED_CANONICAL
K5-R1 THROUGH K5-R5 BOUNDED PROOF-REVIEW SCOPE = CLOSED_CANONICAL
K6 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL

P2-R1 THROUGH P2-R6 = CLOSED_CANONICAL
P2-R6 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R7+ IMPLEMENTATION = NOT_AUTHORIZED BY NUMBERING

P3-R1 THROUGH P3-R17 = CLOSED_CANONICAL
P3 BOUNDED R1-R17 ENGINEERING SCOPE = CLOSED_CANONICAL
P3 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P3 OVERALL = OPEN
P3-R18+ IMPLEMENTATION = NOT_AUTHORIZED

P4-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

Bounded closure proves the exact bounded mechanisms and evidence named by their
canonical records. It does not establish broad product quality, general benchmark
coverage, public readiness, superiority, safety, or project completion.

---

## 3. Why this amendment is the minimum planning unit

The canonical 2026-08-26 master plan correctly establishes an evidence-first,
dependency-ordered program. Later repository work has now closed additional
bounded P2 and P3 mechanisms and exposed a need to state the longer-term trust
architecture more precisely.

The unresolved planning gap is not another numbered implementation slice. It is
the absence of one canonical additive plan connecting:

```text
PROOF PROTOCOL
+ PROVENANCE-ADDRESSABLE EVIDENCE
+ EVIDENCE FRESHNESS
+ TRUST POLICY
+ MINIMUM SUFFICIENT CONTEXT
+ INDEPENDENT VERIFICATION
+ BOUNDED EXECUTION
+ POST-ACTION RE-PROOF
+ CONTINUOUS ASSURANCE
```

Direct P2-R7, P3-R18, P4, benchmark execution, provider/model execution,
autofix, product integration, and release remain unsupported. A one-path
planning amendment is smaller, reversible, and sufficient to clarify future
sequencing without granting implementation.

---

## 4. Product thesis

Kodac should be designed as a software trust and verification system for
agent-written and human-written changes, not as a generic coding agent that
equates model output, review agreement, or green tests with truth.

The intended differentiator is:

```text
WHAT EVIDENCE EXISTS
+ WHERE IT CAME FROM
+ WHICH EXACT STATE IT APPLIES TO
+ WHICH CLAIM IT SUPPORTS OR CONTRADICTS
+ WHICH VERIFIER TESTED IT
+ WHETHER IT IS STILL FRESH
+ WHICH POLICY AUTHORIZES THE NEXT ACTION
+ WHICH BOUNDED ACTION ACTUALLY OCCURRED
+ WHAT MUST BE RE-PROVEN AFTER CHANGE
```

External tools may provide signals. Kodac should own the evidence, identity,
freshness, authority, qualification, and bounded-execution contracts.

```text
BEST TOOL FOR SIGNAL
+ KODAC FOR TRUST
```

---

## 5. Non-equivalence invariants

```text
INTELLIGENCE != EVIDENCE
EVIDENCE != PROOF
PROOF != AUTHORITY
AUTHORITY != EXECUTION
EXECUTION != COMPLETION

EXTERNAL TOOL OUTPUT != KODAC AUTHORITY
MODEL CONFIDENCE != CALIBRATED PROBABILITY
REVIEW AGREEMENT != TRUTH
SCANNER CLEAN != SAFE
EXPLOIT NOT FOUND != SECURE
TESTS GREEN != COMPLETE CORRECTNESS
AUTOFIX APPLIED != VERIFIED
MERGED != DONE
POST-MERGE PROOF != FOREVER VALID
MORE AGENTS != BETTER
MORE CONTEXT != BETTER
PLUGIN / MCP / DEPENDENCY AVAILABILITY != ADMISSION
```

These invariants refine the existing constitution; they do not replace any
canonical authority boundary.

---

## 6. Target architectural planes

### Plane A — Evidence Plane / ProofGraph

Material results should eventually be expressible as provenance-addressable
evidence rather than unstructured comments or mutable status prose.

Potential evidence families, subject to later exact authorization and schema
design, include:

```text
STATIC_FINDING
DEPENDENCY_FINDING
SECRET_FINDING
SUPPLY_CHAIN_FINDING
TEST_RESULT
TYPECHECK_RESULT
SCHEMA_RESULT
REVIEWER_CLAIM
CRITIC_DISPOSITION
EXPLOIT_TRACE
REGRESSION_RESULT
AUTHORIZATION_RECORD
POLICY_DECISION
QUALIFICATION_RESULT
MERGE_PROOF
POST_MERGE_RESULT
```

A future evidence envelope may bind identities for the evidence, subject,
producer, producer version, configuration, policy, scope, inputs, environment,
verification, freshness, and support/contradiction/supersession edges.

No schema is authorized by this amendment.

### Plane B — Evidence Freshness

Exact Git revision identity remains necessary but may not be sufficient for all
future evidence. Relevant evidence may become stale when any bound identity
changes:

```text
CODE
POLICY
REVIEWER CONFIGURATION
SCANNER VERSION
DEPENDENCY
WORKFLOW
ENVIRONMENT
THREAT INTELLIGENCE
VULNERABILITY KNOWLEDGE
```

The future target is deterministic, dependency-aware invalidation:

```text
UPSTREAM IDENTITY CHANGED
-> AFFECTED EVIDENCE = STALE
-> TARGETED REQUALIFICATION REQUIRED
```

No external feed, scheduled process, persistence layer, or requalification
runtime is authorized here.

### Plane C — Trust Policy Plane

Prompts and repository prose are not capability boundaries. Future sensitive
actions should be evaluated using explicit principal, action, resource, context,
evidence, and policy identities.

Potential actions include:

```text
READ_PATH
WRITE_PATH
RUN_PROCESS
OPEN_NETWORK
INSTALL_PACKAGE
CALL_MCP_TOOL
ACCESS_SECRET
CREATE_BRANCH
CREATE_PR
RESOLVE_THREAD
MERGE
PUBLISH
DEPLOY
```

Target decision shape:

```text
REQUEST
-> POLICY DECISION
-> ALLOW | DENY | REQUIRE_MORE_EVIDENCE
```

Default-deny should remain the preferred posture for sensitive actions. No
policy engine or dependency is selected or admitted by this amendment.

### Plane D — Intelligence Plane

The intelligence plane may search, reason, explain, challenge, and propose. It
must not self-authorize, silently widen scope, erase deterministic evidence,
grant execution authority, or promote its own policy.

Preferred future composition:

```text
PRIMARY REVIEWER
+ RISK-TRIGGERED SPECIALIST
+ STRUCTURED CRITIC
+ VERIFIER
```

Large swarms and model-family diversity remain benchmark-driven experiments,
not default trust rules.

### Plane E — Proof and Verification Plane

The P5 direction should evolve from a finding-specific verifier fabric into the
architectural proof and verification center.

Potential verifier classes include:

```text
STATIC_RULE
TYPECHECK
LINTER
SCHEMA_VALIDATION
UNIT_TEST
FOCUSED_TEST
GENERATED_REGRESSION
PROPERTY_TEST
MUTATION_TEST
SANDBOX_EXECUTION
SECURITY_SCAN
DEPENDENCY_ANALYSIS
PROVENANCE_CHECK
EXPLOIT_REPRODUCTION
NETWORK_POLICY_TEST
CONTEXTUAL_RUBRIC
FORMAL_PROOF
MANUAL_EXTERNAL_ATTESTATION
```

Every material claim should identify how it could be falsified. A concern that
has not been verified may remain an explicit concern; it must not silently become
completion truth.

No verifier implementation or execution is authorized here.

### Plane F — Execution and Enforcement

K2 remains the unique trusted side-effect execution boundary unless a later
canonical record explicitly changes it.

Target direction:

```text
REASONING / CONTROL PLANE
-> TYPED BOUNDED REQUEST
-> K2 / CAPABILITY BROKER
-> ISOLATED EXECUTION
-> EVIDENCE CAPTURE
```

Future execution requests should bind, where applicable:

```text
principal identity
requested action
exact scope
write allowlist
network allowlist
process allowlist
resource limits
environment identity
authorization identity
evidence prerequisites
```

This amendment does not expand K2 or authorize any side effect.

---

## 7. Lifecycle enforcement targets

Future separately authorized work should eventually make trust semantics
consistent across the software lifecycle.

### Before code exists

```text
agent / tool admission
MCP server admission
skill / plugin admission
dependency selection
package provenance
capability review
```

### While code is generated

```text
agent / MCP verification
secret detection
scope validation
dependency admission
policy feedback
```

### Before commit

```text
local deterministic checks
evidence generation
policy checks
```

### Pull request

```text
review
security
verification
authority
scope
CI integrity
qualification
```

### Merge and post-merge

```text
ruleset
exact-head qualification
expected-head merge
ordered-parent proof
tree / blob proof
signature verification
push checks
freshness state
```

### Continuous assurance

```text
NEW EXTERNAL OR ENVIRONMENT STATE
-> AFFECTED EVIDENCE IDENTIFIED
-> EVIDENCE MARKED STALE
-> TARGETED RE-VERIFICATION
-> UPDATED ASSURANCE STATE
```

These are lifecycle targets only, not action or monitoring authority.

---

## 8. Proposed future program sequence

The following is a dependency map. Every stage and every implementation slice
still requires its own fresh evidence-driven analysis, exact canonical
authorization, bounded path allowlist, qualification, independent review,
guarded merge, post-merge proof, and any required current-view reconciliation.

```text
P2  KodacBench 2.0
P3  Context Engine v2
P4  Reviewer Intelligence v2
P5  Proof and Verification Fabric
P6  Security, Supply-Chain, and Attack Validation
P7  Bounded Remediation
P8  Agent Trust Gateway and Developer Distribution
P9  Continuous Assurance
R   Advanced Research
```

Current bounded P2/P3 closures remain exactly as canonical records define them.
This map does not reopen those bytes or authorize the next number.

### P2 — KodacBench 2.0

Future benchmark work should measure validated signal rather than output volume.
Candidate dimensions include review precision/recall, false-positive and
false-negative behavior, reproduction, verification closure, agent-boundary
enforcement, supply-chain interception, time/cost-to-proof, proof completeness,
freshness accuracy, and local/offline reproducibility.

A candidate north-star review metric may be:

```text
SIGNAL_DENSITY = VERIFIED_ACTIONABLE_FINDINGS / TOTAL_REVIEW_OUTPUT
```

That metric is not adopted as repository policy by this amendment. General
KodacBench, real tasks, participants, providers, evaluators, and executions remain
unauthorized.

### P3 — Context Engine v2

Preserve:

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

Future context evidence should explain why an item was selected, which risk
hypothesis it supports, its provenance, and whether it was actually used.
Bounded R1-R17 closure does not prove context quality, dilution resistance,
promotion, or P3 overall closure.

### P4 — Reviewer Intelligence v2

Future reviewer intelligence should prefer bounded, evidence-triggered risk
hypotheses such as authorization drift, security boundaries, concurrency, data
loss, business logic, dependency risk, CI bypass, agent-policy poisoning,
resource bounds, compatibility, and specification intent.

Reviewer output should remain a claim carrying evidence, scope, freshness,
verifier proposals, critic state, and adjudication state. Agreement is not proof.

### P5 — Proof and Verification Fabric

Potential bounded components include:

```text
Evidence Envelope
ProofGraph
Verifier Registry
Verification Plan
Verification Result
Evidence Freshness Graph
Adjudication Binding
Qualification Report
```

Target relation:

```text
CHANGE
-> CLAIMS
-> EVIDENCE / COUNTER-EVIDENCE
-> VERIFIERS
-> RESULTS
-> POLICY DECISIONS
-> QUALIFICATION
```

### P6 — Security, Supply-Chain, and Attack Validation

Kodac should not recreate every scanner. Future work should define
provider-neutral evidence adapters and preserve deterministic findings alongside
contextual reasoning.

Dependencies, actions, MCP servers, skills, plugins, workflow actions,
extensions, and downloaded binaries should be treated as executable supply
chain. Bounded attack validation, if ever authorized, must use explicit target,
scope, isolation, reproduction evidence, and independent verification.

No real target, exploit execution, credential use, network access, scanner
provider, or dependency is authorized here.

### P7 — Bounded Remediation

Potential future lifecycle:

```text
VERIFIED / ADJUDICATED FINDING
-> PATCH HYPOTHESIS
-> PATCH RISK ANALYSIS
-> IMMUTABLE PATCH IDENTITY
-> EXACT WRITE ALLOWLIST
-> K2 EXECUTION
-> ORIGINAL TESTS
-> FINDING-SPECIFIC REGRESSION
-> NEGATIVE CASES
-> STATIC / SECURITY RE-RUN
-> EXPLOIT RE-TEST WHEN APPLICABLE
-> EXACT-HEAD RE-REVIEW
-> PROOFGRAPH RECONCILIATION
-> QUALIFICATION
```

States such as `PROPOSED`, `AUTHORIZED_TO_APPLY`, `APPLIED`,
`VERIFICATION_FAILED`, `VERIFIED`, `REJECTED`, and `SUPERSEDED` must remain
distinct. Autofix remains unauthorized.

### P8 — Agent Trust Gateway and Developer Distribution

Potential future surfaces include CLI, GitHub, CI, MCP, editor/agent
integrations, local daemon, SDK, JSON evidence, and SARIF adapters. Core
deterministic proof and policy semantics should not require SaaS connectivity.

```text
MODEL AVAILABLE -> RICHER INTELLIGENCE
MODEL UNAVAILABLE -> CORE DETERMINISTIC TRUST CONTINUES
```

No product surface, integration, daemon, package, publication, deployment, or
release is authorized here.

### P9 — Continuous Assurance

A qualified revision may acquire new risk even when its Git commit is unchanged.
Potential triggers include vulnerability disclosure, malicious-package
intelligence, dependency or workflow compromise, policy change, environment
drift, credential exposure, and new exploit knowledge.

Target flow:

```text
EXTERNAL / ENVIRONMENT CHANGE
-> PROOFGRAPH DEPENDENCY MATCH
-> AFFECTED EVIDENCE MARKED STALE
-> TARGETED RE-VERIFICATION
-> UPDATED ASSURANCE STATE
```

No external feed, credential access, persistence, scheduler, automation,
notification, network request, or re-verification execution is authorized by
this amendment.

### R — Advanced research

Research-only candidates include same-family versus cross-family reviewer
diversity, targeted formal proof, repository world models, cross-repository
retrieval, learned high-level engineering policies, and specialist ensembles.
Research cannot silently become policy, dependency admission, or implementation.

---

## 9. Open-source and provider strategy

The trust semantics should remain meaningfully open and provider-neutral.

Potential future package boundaries, subject to separate authorization, include:

```text
kodac-core
kodac-proof
kodac-mcp
kodac-gate
kodac-adapters
kodac-sandbox
```

Hosted orchestration, fleet management, evidence retention, managed reviewer
compute, private runners, air-gapped appliances, compliance evidence, and
organization policy administration are possible future product questions only.
They are not authorized or promised here.

No vendor, model, scanner, dependency, package boundary, licensing posture, or
commercial plan becomes canonical by being listed as a possibility.

---

## 10. Program-wide safety boundaries

Future work must continue to preserve:

```text
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
REPOSITORY CONTENT / ISSUE / REVIEWER OUTPUT = DATA, NOT AUTHORITY
EXACT-HEAD EVIDENCE INVALIDATES ON RELEVANT CHANGE
NEW DEPENDENCIES REQUIRE EXPLICIT ADMISSION
PERSISTENCE / TELEMETRY / LEARNING REQUIRE PRIVACY AUTHORITY
BENCHMARK CLAIMS REQUIRE REPRODUCIBLE EVIDENCE
PUBLIC CLAIMS MAY NOT OUTRUN EVIDENCE
NO FORCE-PUSH / REBASE / BYPASS FOR CANONICAL QUALIFICATION
WAIVER = NO
```

Future agents must stop rather than improvise when authorization, scope,
dependency admission, reviewer quorum, required CI, protected credentials,
runtime isolation, or evidence is unavailable.

---

## 11. Plan success criteria

This planning direction is successful only if later separately authorized work
can demonstrate, with evidence:

1. lower false-positive noise without hiding raw evidence;
2. higher validated material-finding recall;
3. exact provenance for material decision inputs;
4. independent verification of material claims;
5. scope enforcement below the model layer;
6. agent actions cannot silently widen authority;
7. fixes are re-proven rather than merely applied;
8. external review and security tools remain replaceable;
9. evidence staleness is detected accurately;
10. core trust guarantees work locally and offline;
11. AI availability enriches intelligence but is not required for deterministic
    trust; and
12. coding agents can use Kodac without becoming Kodac's authority.

These are target criteria, not current claims. This amendment does not establish
that any criterion has already been achieved.

---

## 12. Exact candidate scope

This candidate may change exactly one path:

```text
docs/planning/KODAC_TRUST_AND_VERIFICATION_MASTER_PLAN_V2_AMENDMENT_2026-09-02.md
```

No second path is authorized in this candidate.

```text
NO SOURCE
NO TEST
NO WORKFLOW
NO SCHEMA
NO DEPENDENCY
NO LOCKFILE
NO CURRENT-VIEW PATH
NO BENCHMARK CORPUS / MANIFEST / FIXTURE / RESULT
NO PROVIDER / MODEL / RUNTIME CONFIGURATION
NO PERSISTENCE / TELEMETRY / LEARNING
NO CLI / API / PRODUCT SURFACE
NO RELEASE CONFIGURATION
NO RULESET / PROTECTION CHANGE
WAIVER = NO
```

---

## 13. Candidate qualification and adoption gate

This amendment remains non-canonical until one frozen exact final head proves:

1. base ref is `main` and base SHA equals then-current canonical `main`;
2. `BEHIND_BY = 0`;
3. changed paths equal exactly the one path in section 12;
4. exact head, tree, and document blob identities are frozen;
5. the record is additive and leaves the 2026-08-26 master plan unchanged;
6. it creates no implementation, dependency, provider/model, persistence,
   benchmark-execution, product, release, ruleset, bypass, or completion authority;
7. all required repository CI is terminal success or canonically proven
   non-applicable;
8. at least two distinct independent external substantive semantic reviewer
   channels adjudicate the same exact final head/current metadata as terminal
   clean under the provider-neutral review-quorum amendment;
9. zero unresolved material/minor actionable findings and zero unresolved
   actionable review threads remain;
10. ruleset `20707483` remains active with strict required status checks,
    required review-thread resolution, `bypass_actors=[]`, and
    `current_user_can_bypass=never`;
11. `WAIVER=NO`;
12. a guarded normal merge uses the exact qualified expected head; and
13. mandatory post-merge proof verifies canonical `main`, ordered parents, tree,
    exact document blob, verified/valid signature, applicable push checks,
    merged PR state, and unchanged ruleset.

Any repository-byte, head, base, or qualification-relevant metadata movement
invalidates prior exact-head qualification evidence.

---

## 14. Post-adoption boundary

Only after this exact amendment qualifies, merges normally, and passes mandatory
post-merge proof may the repository record:

```text
TRUST_AND_VERIFICATION_MASTER_PLAN_V2_AMENDMENT = CLOSED_CANONICAL
```

Canonical adoption would establish planning direction only.

It would not authorize P2-R7, P3-R18, P4-P9, benchmark execution, provider/model
execution, persistence, remediation, product integration, release, or project
completion.

After adoption, a fresh canonical analysis may determine whether a separate
bounded authorization/reconciliation unit is required to update current roadmap
and product-status views. No current-view mutation or successor implementation
authority is granted in advance by this amendment.

```text
P2 OVERALL = OPEN
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R7+ IMPLEMENTATION = NOT_AUTHORIZED BY NUMBERING
P3-R18+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

Final principle:

> Kodac should not be the AI that writes the most code. Kodac should be the
> system that makes agent-written software provably harder to trust incorrectly.
