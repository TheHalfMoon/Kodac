# Kodac P4-R2 Structured Critic Disposition Authorization

## Record identity

```text
DATE = 2026-09-04
DECISION_OWNER = KODAC FOUNDER
AUTHORITY_CLASS = DOCUMENTATION / BOUNDED SUCCESSOR AUTHORIZATION
CANONICAL_BASE = d166e5305e2b9a400e9240ee7064bdf3c65f54aa
CANONICAL_BASE_TREE = 19337e181278ce55e791294b4c2be0db7fb81bd1
P4_R1 = PR #324 / d166e5305e2b9a400e9240ee7064bdf3c65f54aa / CLOSED_CANONICAL
FOUNDER_EXTERNAL_REVIEW_POLICY = PR #325 / 94a62f8d794f7845dd2d999608fbb6fdd77ce7ab / CLOSED_CANONICAL
RULESET = 20707483
WAIVER = NO
```

This record is the minimum bounded authorization supported by fresh canonical evidence after P4-R1 closure. It does not infer authority by numbering.

## 1. Evidence-driven successor gap

Canonical P4-R1 now provides one deterministic reviewer-claim evidence envelope containing:

```text
EXACT KRI-R2 SOURCE FINDING SNAPSHOT
+ EXPLICIT RISK HYPOTHESIS
+ EXPLICIT EVIDENCE REFERENCES
+ ZERO-OR-MORE VERIFIER PROPOSALS
+ CRITIC_STATE = NOT_EVALUATED
```

The canonical final gap review identifies `GAP-05 — Reviewer disagreement needs a concrete protocol` as P1 and states that future reviewer/critic design should require evidence-grounded dispositions such as:

```text
SUPPORTED
CONTRADICTED
UNVERIFIED_CONCERN
DUPLICATE_OR_SUPERSEDED
```

The historical intelligence master plan makes the same direction explicit: material findings need a structured critic/disagreement contract with evidence references, and exact vocabulary requires a future contract gate.

Repository search after P4-R1 found no source or schema implementing a critic-disposition contract. P4-R1 deliberately forbids any semantic critic verdict and materializes only `NOT_EVALUATED`.

Therefore the minimum concrete successor gap is one bounded, pure, data-only structured critic disposition contract. This conclusion comes from canonical gap evidence and current repository absence, not from the label `P4-R2`.

## 2. Authorization-unit scope

This authorization candidate may change exactly one path:

```text
docs/planning/KODAC_P4_R2_STRUCTURED_CRITIC_DISPOSITION_AUTHORIZATION_2026-09-04.md
```

No source, schema, test, workflow, dependency, lockfile, runtime, product surface, roadmap/status view, historical evidence record, ruleset, provider/model integration, persistence, telemetry, release, or benchmark artifact may change in this authorization candidate.

## 3. Later implementation allowlist

Only after this authorization becomes `CLOSED_CANONICAL` with complete post-merge proof, one separate implementation candidate may change exactly these three new paths:

```text
packages/kodac-runtime/src/reviewer-intelligence/p4-critic-disposition.ts
schema/p4-critic-disposition.schema.json
packages/kodac-runtime/test/p4-r2-critic-disposition.test.ts
```

No fourth path is authorized.

The implementation may not modify P4-R1 or historical KRI source bytes, including:

```text
packages/kodac-runtime/src/reviewer-intelligence/p4-claim-envelope.ts
packages/kodac-runtime/src/reviewer-intelligence/contracts.ts
packages/kodac-runtime/src/reviewer-intelligence/runtime.ts
packages/kodac-runtime/src/reviewer-intelligence/provider-contracts.ts
packages/kodac-runtime/src/reviewer-intelligence/executor.ts
packages/kodac-runtime/src/index.ts
```

No package-root export is required by this bounded foundation.

## 4. Authorized P4-R2 purpose

P4-R2 may implement one deterministic in-memory data contract, builder, and validator that binds one already-built P4-R1 reviewer-claim envelope to one explicit caller-supplied critic disposition declaration.

The bounded flow is:

```text
ONE VALID P4-R1 REVIEWER-CLAIM ENVELOPE
+ ONE EXPLICIT CRITIC DECLARATION
-> VALIDATE AND SNAPSHOT EXACT P4-R1 IDENTITY
-> BIND CRITIC IDENTITY / VERSION / POLICY IDENTITY
-> BIND EXACT EVALUATED HEAD
-> BIND ONE CLOSED DISPOSITION
-> BIND EXPLICIT EVIDENCE REFERENCES
-> BIND EXPLICIT RATIONALE
-> EMIT ONE CONTENT-DERIVED IMMUTABLE CRITIC DISPOSITION IDENTITY
```

No critic, reviewer, provider, model, verifier, process, network request, filesystem write, persistence operation, remediation action, or product integration executes in P4-R2.

This slice records a supplied critic disposition as evidence. It does not generate the disposition.

## 5. Closed disposition vocabulary

The implementation may define exactly this v1 vocabulary:

```text
SUPPORTED
CONTRADICTED
UNVERIFIED_CONCERN
DUPLICATE_OR_SUPERSEDED
```

Semantics are deliberately bounded:

- `SUPPORTED`: the supplied critic evidence supports the reviewer claim; it does not prove the claim true.
- `CONTRADICTED`: the supplied critic evidence contradicts the reviewer claim; it does not independently adjudicate the source finding.
- `UNVERIFIED_CONCERN`: a concern remains without sufficient verification evidence; it is neither proof nor rejection.
- `DUPLICATE_OR_SUPERSEDED`: the supplied critic identifies evidence that the reviewer claim is duplicate or superseded at the critic-evidence layer; it must not mutate KRI adjudication state.

Required invariants:

```text
CRITIC DISPOSITION != TRUTH
CRITIC DISPOSITION != KRI ADJUDICATION
CRITIC DISPOSITION != MERGE AUTHORITY
CRITIC DISPOSITION != RELEASE AUTHORITY
SUPPORTED != PROVEN
CONTRADICTED != SOURCE FINDING REJECTED
UNVERIFIED_CONCERN != VERIFIED DEFECT
DUPLICATE_OR_SUPERSEDED != KRI DUPLICATE STATE
```

## 6. Required exact bindings

The critic disposition must preserve and bind at minimum:

```text
p4R1EnvelopeIdentity
p4R1EnvelopeVersion
sourceFindingIdentity
sourceReviewedHead
sourceEvaluatedHead
criticId
criticVersion
criticPolicyIdentity
evaluatedHead
disposition
rationale
evidenceRefs
```

`p4R1EnvelopeIdentity` must equal the exact validated P4-R1 envelope identity.

`evaluatedHead` must bind the head the critic evidence applies to. The contract must fail closed if the supplied evaluated head is inconsistent with the exact P4-R1 source/review head semantics defined by the implementation contract.

P4-R2 may snapshot source identities needed for provenance, but it must not rewrite the P4-R1 envelope, KRI source finding, KRI finding state, KRI adjudication state, severity, confidence, category, scope, review identity, risk hypothesis, verifier proposals, or evidence references.

## 7. Evidence and rationale boundary

The declaration must carry:

```text
criticId
criticVersion
criticPolicyIdentity
evaluatedHead
disposition
rationale
evidenceRefs
```

All identifiers/text/references must be bounded and non-empty where required. Evidence references are set semantics and must be canonicalized deterministically with duplicates rejected.

The contract must not infer a critic disposition from reviewer agreement, severity, confidence, provider/model identity, number of reviewers, or verifier proposals. The caller must explicitly declare the disposition.

## 8. Determinism and fail-closed requirements

The implementation must:

- derive the disposition identity from canonicalized content;
- canonicalize object-key order before identity derivation;
- canonicalize declared set-semantics arrays;
- detach returned data from caller-owned mutable input;
- deeply freeze returned data;
- reject unknown top-level and nested JSON-object fields;
- reject malformed/empty/duplicate/over-limit identities, text, references, and Git SHAs;
- reject unsupported disposition states;
- reject mismatch between the declaration and exact P4-R1 envelope identity;
- reject mutation or authority-injection fields such as `PROVEN`, `PROVEN_READY`, merge/release approval, ranking, promotion, remediation authorization, execution authorization, completion, or KRI adjudication mutation;
- keep runtime and JSON Schema 2020-12 validation aligned for representable constraints;
- produce identical identity for semantically equivalent bounded inputs and a different identity for material semantic changes.

Tests must cover at minimum:

```text
DETERMINISTIC REPEATABILITY
OBJECT KEY INVARIANCE
EVIDENCE REF SET INVARIANCE
SEMANTIC CHANGE IDENTITY SENSITIVITY
DEEP DETACHMENT / FREEZE
EXACT P4-R1 IDENTITY BINDING
SOURCE HEAD / FINDING IDENTITY PRESERVATION
ALL FOUR DISPOSITION STATES
UNSUPPORTED DISPOSITION REJECTION
UNKNOWN FIELD REJECTION
AUTHORITY INJECTION REJECTION
MALFORMED HEAD / IDENTITY / TEXT / REF REJECTION
DUPLICATE / EMPTY EVIDENCE REF REJECTION
RUNTIME / SCHEMA PARITY
PURE IMPORT SURFACE
IMMUTABLE P4-R1 AND KRI PREDECESSOR BYTE PINS
```

## 9. Pure import and dependency boundary

P4-R2 must add no dependency.

Permitted production imports are limited to deterministic platform primitives and type-only or pure deterministic data-contract reuse from the canonical P4-R1 source as needed.

Production source must contain no provider/model/critic/verifier invocation, process spawn, network access, filesystem write, persistence, telemetry, K2 execution, or remediation action.

## 10. Explicit non-grants

This authorization does not grant:

```text
CRITIC EXECUTION = NOT_AUTHORIZED
REVIEWER / MODEL / PROVIDER EXECUTION = NOT_AUTHORIZED
VERIFIER EXECUTION = NOT_AUTHORIZED
KRI ADJUDICATION MUTATION = NOT_AUTHORIZED
P4-R3+ IMPLEMENTATION = NOT_AUTHORIZED
P4 OVERALL CLOSURE = NOT_ESTABLISHED
P5-P9 IMPLEMENTATION = NOT_AUTHORIZED
P2 / P3 OVERALL CLOSURE = NOT_ESTABLISHED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
NEW DEPENDENCY / DONOR ADMISSION = NONE
CLI / API / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
```

`DONE = evidence-backed completion` remains binding.

## 11. Authorization candidate adoption gate

This authorization remains non-canonical until one unchanged exact candidate proves:

```text
BASE_REF = main
BASE_SHA = d166e5305e2b9a400e9240ee7064bdf3c65f54aa
BASE_TREE = 19337e181278ce55e791294b4c2be0db7fb81bd1
CHANGED_PATHS = EXACTLY 1
REQUIRED_REPOSITORY_CI = TERMINAL SUCCESS
KNOWN_ACTIONABLE_DEFECTS = 0
UNRESOLVED_ACTIONABLE_REVIEW_THREADS = 0
RULESET_20707483 = active
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
EXTERNAL_SEMANTIC_REVIEW = OPTIONAL / NON_GATING UNDER CANONICAL PR #325
MERGE = GUARDED NORMAL MERGE USING exact expected_head_sha
POST_MERGE_PROOF = REQUIRED
WAIVER = NO
```

If canonical `main` moves, the candidate must be forward-reconciled and requalified. No force-push, rebase, direct protected-main write, stale CI reuse, ruleset mutation, or bypass is authorized.

Only successful post-merge proof may mark this P4-R2 authorization `CLOSED_CANONICAL`.

## 12. After authorization closure

After this authorization is canonical and post-merge proven, implement only the exact three-path P4-R2 allowlist above, qualify it on one unchanged exact head, merge guarded, and perform complete post-merge proof.

After P4-R2 itself is `CLOSED_CANONICAL`, run fresh evidence-driven successor analysis. Do not infer P4-R3 or any later stage by numbering.

`WAIVER=NO`
