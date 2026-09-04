# Kodac P4-R1 Reviewer Claim Evidence Envelope Foundation Authorization

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
DATE = 2026-09-04
CANONICAL_BASE = 77e8eff9364e572bd593ded77734c21760c380a6
PREDECESSOR_RECONCILIATION = PR #322 / 77e8eff9364e572bd593ded77734c21760c380a6 / CLOSED_CANONICAL
PREDECESSOR_RECONCILIATION_PROOF = PR #322 / comment 5539189792
SUCCESSOR_ANALYSIS = PR #322 / comment 5539263136
TRUST_VERIFICATION_V2_AMENDMENT = PR #320 / f806a82e12302fe4925c022b5f9332e6f883541e / CLOSED_CANONICAL / PLANNING_DIRECTION_ONLY
TRUST_VERIFICATION_V2_AMENDMENT_PROOF = PR #320 / comment 5538367862
WAIVER = NO
```

This record is a documentation-only authorization candidate. It does not itself
implement P4-R1 or modify any runtime, schema, test, public interface, provider,
model, reviewer, critic, verifier, product, release, dependency, persistence, or
ruleset surface.

The bounded implementation authority described below becomes effective only if
this exact one-path authorization candidate separately qualifies on one frozen
exact head, receives the required independent substantive semantic review,
merges normally into protected `main` with an exact expected-head guard, and
passes mandatory post-merge proof.

Live GitHub truth, root `AGENTS.md`, accepted ADRs, canonical predecessor proof,
the provider-neutral review-quorum amendment, and active protected-main rules
remain controlling.

---

## 1. Why P4-R1 is evidence-driven rather than inferred by numbering

Canonical PR #322 and proof `5539189792` close the Trust v2 post-adoption
current-view reconciliation. They create no successor implementation authority.
Fresh analysis `5539263136` therefore re-read the current canonical reviewer
substrate and the adopted Trust v2 planning direction before naming any unit.

The repository already contains canonical Reviewer Intelligence mechanisms:

```text
KRI-R1 THROUGH KRI-R4 = CANONICAL / COMPLETE FOR THEIR AUTHORIZED SCOPES
```

KRI-R2 already defines:

```text
ReviewIdentity
ReviewClaim
FindingRecord
finding freshness
finding/adjudication state
```

KRI-R3 already defines a provider-neutral reviewer execution envelope and review
run record. P4-R1 must not duplicate either layer.

The canonical KRI-R4 test also pins the exact historical KRI-R2/R3 source bytes:

```text
packages/kodac-runtime/src/reviewer-intelligence/contracts.ts
  = 5ebe91c3d98f626651230989564d367d0600863c
packages/kodac-runtime/src/reviewer-intelligence/runtime.ts
  = 4c5d01293d37b14ad4b017ec1e7dd17055393113
packages/kodac-runtime/src/reviewer-intelligence/provider-contracts.ts
  = 97e95f3cd19aebf63c86dba254bc8e55f919c031
packages/kodac-runtime/src/reviewer-intelligence/executor.ts
  = 1ff5d7273512af2f6ccb5c1d70ccb54369bac5e4
```

Those canonical bytes remain immutable historical evidence and are explicitly
outside the P4-R1 implementation allowlist.

The concrete missing semantic layer identified by fresh analysis is narrower:

```text
ONE EXISTING KRI-R2 FINDING
+ ONE EXPLICIT CALLER-DECLARED RISK HYPOTHESIS
+ EXACT SOURCE SCOPE / FRESHNESS / ADJUDICATION STATE
+ EXPLICIT EVIDENCE REFERENCES
+ BOUNDED VERIFIER PROPOSALS
+ EXPLICIT NON-CLAIMING CRITIC STATE
-> ONE DETERMINISTIC P4 REVIEWER-CLAIM EVIDENCE ENVELOPE
```

No canonical current source or schema provides that binding. Repository search
found no current P4-v2 `riskHypothesis`, `verifierProposal`, or `criticState`
contract.

That observed gap, not sequence alone, defines P4-R1.

---

## 2. Authorization-unit changed-file set

This authorization PR may change exactly one path and no second path:

```text
docs/planning/KODAC_P4_R1_REVIEWER_CLAIM_EVIDENCE_ENVELOPE_AUTHORIZATION_2026-09-04.md
```

This PR may not implement P4-R1, edit current roadmap/status views, mutate any
historical authorization/evidence record, modify KRI source/tests/schemas,
change workflows, dependencies, lockfiles, benchmark data, public interfaces,
release configuration, or rulesets.

---

## 3. Exact later P4-R1 implementation allowlist

Only after this authorization becomes `CLOSED_CANONICAL` and post-merge proven,
one separate P4-R1 implementation candidate may change exactly these three new
paths:

```text
packages/kodac-runtime/src/reviewer-intelligence/p4-claim-envelope.ts
schema/p4-reviewer-claim-envelope.schema.json
packages/kodac-runtime/test/p4-r1-reviewer-claim-envelope.test.ts
```

No fourth path is authorized.

In particular, the implementation may not modify:

```text
packages/kodac-runtime/src/reviewer-intelligence/contracts.ts
packages/kodac-runtime/src/reviewer-intelligence/runtime.ts
packages/kodac-runtime/src/reviewer-intelligence/provider-contracts.ts
packages/kodac-runtime/src/reviewer-intelligence/executor.ts
packages/kodac-runtime/src/reviewer-intelligence/qualification-contracts.ts
packages/kodac-runtime/src/reviewer-intelligence/qualification.ts
packages/kodac-runtime/src/index.ts
```

No package-root export or other public API surface is required for this bounded
foundation.

---

## 4. P4-R1 purpose

P4-R1 may implement one pure deterministic in-memory data contract, builder, and
validator for a reviewer-claim evidence envelope.

The envelope exists to make the future P4 trust semantics explicit without
pretending that a reviewer claim is proof, that a risk hypothesis is repository
policy, that a verifier proposal is a verification result, or that an unevaluated
critic has rendered a verdict.

The intended bounded flow is:

```text
ONE KRI-R2 FindingRecord
+ ONE EXPLICIT P4-R1 DECLARATION
-> VALIDATE / SNAPSHOT SOURCE AND DECLARATION
-> BIND EXACT FINDING / REVIEW / HEAD / PATH / RANGE IDENTITY
-> BIND SOURCE FRESHNESS AND CURRENT FINDING STATE
-> BIND ONE EXPLICIT RISK HYPOTHESIS
-> BIND EXPLICIT EVIDENCE REFERENCES
-> BIND ZERO-OR-MORE BOUNDED VERIFIER PROPOSALS
-> RECORD CRITIC_STATE = NOT_EVALUATED
-> EMIT ONE CONTENT-DERIVED IMMUTABLE ENVELOPE IDENTITY
```

No provider call, reviewer call, critic call, verifier execution, process spawn,
network access, filesystem write, persistence operation, remediation action, or
side effect appears in this flow.

---

## 5. Required source-finding binding

The implementation must take one KRI-R2 `FindingRecord` as the source substrate
and must preserve/bind the source truth needed by P4-R1, including at minimum:

```text
findingIdentity
claimKey
review.reviewRunId
review.reviewerId
review.reviewerVersion
review.policyIdentity
review.canonicalBase
review.reviewedHead
evaluatedHead
path
optional range
freshness
state
```

P4-R1 may not rewrite source severity, confidence, category, claim text,
review identity, scope, freshness, or adjudication state.

A P4 envelope must not silently turn a stale source finding into a current one or
a rejected/fixed/duplicate source into a new finding.

---

## 6. Explicit risk-hypothesis boundary

P4-R1 must require an explicit caller declaration for one bounded risk
hypothesis. It may not infer repository policy from KRI severity, category,
confidence, reviewer identity, model identity, provider identity, or agreement.

The declaration may carry only bounded descriptive evidence such as:

```text
riskHypothesisId
riskClass
statement
evidenceRefs
```

The implementation may define a closed versioned risk-class vocabulary derived
from the canonical Trust v2 planning direction, limited to bounded classes such
as authorization drift, security boundary, concurrency, data loss, business
logic, dependency risk, CI bypass, agent-policy poisoning, resource bounds,
compatibility, and specification intent.

That vocabulary is a classification contract only. It is not an ordered risk
score, repository priority policy, exploitability claim, severity override, or
release gate.

---

## 7. Verifier-proposal boundary

P4-R1 may carry zero or more explicit verifier proposals. A verifier proposal is
only a falsification/testing suggestion and never a result.

Each proposal must have one deterministic local identity and bounded descriptive
fields sufficient to identify what could test or falsify the claim, such as:

```text
proposalId
verifierClass
objective
evidenceRefs
```

The verifier-class vocabulary may reuse only names already present as planning
direction in the canonical Trust v2 proof/verification plane. No verifier is
selected as repository policy and no verifier executes in P4-R1.

The implementation must reject duplicate proposal identities and malformed or
unbounded proposal data.

---

## 8. Critic and adjudication boundary

P4-R1 does not authorize structured-critic execution.

Therefore the only critic state P4-R1 may materialize is:

```text
CRITIC_STATE = NOT_EVALUATED
```

It must not emit `SUPPORTED`, `REJECTED`, `AGREED`, `DISAGREED`, or any other
semantic critic verdict in this slice.

The envelope may carry the existing KRI-R2 finding state as the source
adjudication state. It may not adjudicate, mutate, reopen, confirm, reject, fix,
duplicate, or reverify the finding.

```text
CRITIC STATE != FINDING ADJUDICATION
CRITIC NOT_EVALUATED != CLAIM CLEAN
REVIEW AGREEMENT != TRUTH
```

---

## 9. Determinism and fail-closed requirements

The implementation must be deterministic for semantically identical bounded
inputs and must produce a content-derived envelope identity.

At minimum it must:

- canonicalize object-key ordering before identity derivation;
- preserve semantically meaningful array ordering where the contract declares
  order meaningful, or explicitly canonicalize order where it declares set
  semantics;
- detach returned data from caller-owned mutable inputs;
- deeply freeze the returned envelope;
- reject unknown top-level or nested fields at runtime/schema boundaries;
- reject empty, duplicate, malformed, or over-limit identifiers/references;
- reject invalid Git SHA, content identity, path, and line-range shapes;
- reject `startLine > endLine`;
- reject authority injection such as merge approval, release approval,
  `PROVEN_READY`, provider execution, remediation authorization, ranking,
  promotion, or completion fields;
- keep schema and runtime validation aligned for all constraints representable in
  JSON Schema 2020-12.

Tests must include deterministic repeatability, key-order invariance where
applicable, semantic-change identity sensitivity, deep detachment/freeze,
unknown-field rejection, source-binding preservation, stale/current source
preservation, non-NEW adjudication-state preservation, duplicate/empty verifier
proposal rejection, malformed scope/head/identity rejection, and authority-field
injection rejection.

---

## 10. Pure import and dependency boundary

P4-R1 must add no dependency and must not import provider/executor/runtime
side-effect surfaces.

Permitted imports are limited to deterministic platform primitives and type-only
reuse from canonical KRI contracts as needed.

Production source must contain no:

```text
fetch
XMLHttpRequest
WebSocket
child_process
ExecutionGateway
filesystem write
network client
provider.review
model invocation
critic invocation
verifier execution
```

No donor intake is authorized.

---

## 11. Explicit non-grants

Neither this authorization candidate nor a later authorized P4-R1
implementation grants any of the following:

```text
P4-R2+ IMPLEMENTATION = NOT_AUTHORIZED
P4 OVERALL CLOSURE = NOT_ESTABLISHED
P5-P9 IMPLEMENTATION = NOT_AUTHORIZED
P2 OVERALL CLOSURE = NOT_ESTABLISHED
P3 OVERALL CLOSURE = NOT_ESTABLISHED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK / PARTICIPANT EXECUTION = NOT_AUTHORIZED
REVIEWER / MODEL / PROVIDER EXECUTION = NOT_AUTHORIZED
CRITIC EXECUTION = NOT_AUTHORIZED
VERIFIER EXECUTION = NOT_AUTHORIZED
REVIEW AGREEMENT = NOT PROOF
RISK HYPOTHESIS = NOT REPOSITORY POLICY
VERIFIER PROPOSAL = NOT VERIFICATION RESULT
CRITIC STATE = NOT ADJUDICATION AUTHORITY
GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR = NOT_AUTHORIZED
RANKING / LEADERBOARD / PROMOTION / DEFAULT / WINNER = NOT_AUTHORIZED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

External semantic reviewer services remain permitted only as independent
governance qualification evidence under the canonical provider-neutral review
quorum amendment. That use does not grant product/runtime reviewer or model
execution authority.

---

## 12. Qualification contract for this authorization candidate

This one-path authorization becomes canonical only if one unchanged exact head
proves all of the following:

```text
BASE = CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P4_R1_REVIEWER_CLAIM_EVIDENCE_ENVELOPE_AUTHORIZATION_2026-09-04.md
AUTHORIZATION_BLOB = FROZEN EXACT IDENTITY
REQUIRED CI = TERMINAL SUCCESS OR CANONICALLY PROVEN NON_APPLICABLE
INDEPENDENT SUBSTANTIVE EXACT_HEAD SEMANTIC REVIEW = 2 / 2 TERMINAL CLEAN
UNRESOLVED MATERIAL / MINOR ACTIONABLE FINDINGS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET 20707483 = active / bypass_actors=[] / current_user_can_bypass=never
MERGE = GUARDED NORMAL MERGE USING exact expected_head_sha
POST_MERGE_PROOF = main + ordered parents + tree + authorization blob + verified/valid signature + applicable push checks + merged PR state + ruleset
WAIVER = NO
```

Any repository-byte, head, base, or qualification-relevant metadata movement
invalidates prior exact-head evidence as required by canonical governance.

---

## 13. Qualification contract for the later P4-R1 implementation

Canonical adoption of this authorization does not itself implement P4-R1.

The later three-path implementation candidate must independently prove:

```text
BASE = CURRENT CANONICAL MAIN AFTER THIS AUTHORIZATION IS POST_MERGE_PROVEN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 3
CHANGED_PATHS = EXACTLY THE THREE AUTHORIZED NEW PATHS
THREE BLOBS = FROZEN EXACT IDENTITIES
HISTORICAL KRI-R2/R3 PINNED BLOBS = UNCHANGED
NO NEW DEPENDENCY = PROVEN
FOCUSED TESTS = PASS
FULL APPLICABLE TESTS = PASS
TYPECHECK / REQUIRED STATIC CHECKS = PASS WHERE APPLICABLE
REQUIRED CI = TERMINAL SUCCESS OR CANONICALLY PROVEN NON_APPLICABLE
INDEPENDENT SUBSTANTIVE EXACT_HEAD SEMANTIC REVIEW = 2 / 2 TERMINAL CLEAN
UNRESOLVED MATERIAL / MINOR ACTIONABLE FINDINGS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET 20707483 = active / bypass_actors=[] / current_user_can_bypass=never
MERGE = GUARDED NORMAL MERGE USING exact expected_head_sha
POST_MERGE_PROOF = main + ordered parents + tree + three blobs + pinned predecessor blobs + verified/valid signature + applicable push checks + merged PR state + ruleset
WAIVER = NO
```

Only after that separate post-merge proof may P4-R1 itself be recorded as
`CLOSED_CANONICAL` for its exact bounded scope.

---

## 14. Successor boundary

After P4-R1 is separately canonical and post-merge proven, fresh evidence-driven
successor analysis is required before any P4-R2 or other unit.

Do not infer by numbering or composition:

```text
P4-R2
P4 OVERALL CLOSURE
STRUCTURED CRITIC EXECUTION
VERIFIER EXECUTION
P5
P6
P7
P8
P9
REAL BENCHMARK EXECUTION
PROVIDER / MODEL EXECUTION
AUTOFIX
PRODUCT INTEGRATION
PUBLIC RELEASE
PROJECT COMPLETION
```

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
INTELLIGENCE != EVIDENCE
EVIDENCE != PROOF
PROOF != AUTHORITY
AUTHORITY != EXECUTION
EXECUTION != COMPLETION
PLANNING DIRECTION != IMPLEMENTATION AUTHORITY
WAIVER = NO
```
