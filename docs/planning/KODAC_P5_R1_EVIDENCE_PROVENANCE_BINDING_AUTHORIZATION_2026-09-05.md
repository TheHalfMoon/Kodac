# Kodac P5-R1 — Evidence Provenance Binding Foundation Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL MERGED_AND_POST_PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Deny-by-default state

```text
CANONICAL_MAIN_AT_CANDIDATE_START = af6a225e5151ed5717d112ee9281f440f32d4693
CANONICAL_TREE_AT_CANDIDATE_START = d6cc8aca0b12ffe82e14f10b58e8d9f044868ed2
P4-R1 = CLOSED_CANONICAL
P4-R2 = CLOSED_CANONICAL
P4 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL
P4 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P4 OVERALL = OPEN
P4-R3+ = NOT_AUTHORIZED
P5-R1 = AUTHORIZATION_CANDIDATE ONLY
P5-R2+ = NOT_AUTHORIZED
P5 OVERALL = NOT_CLOSED
P6-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This record creates no P5 implementation authority until this exact one-path candidate itself qualifies on one unchanged exact head, merges normally into protected `main` with the exact expected-head precondition, and passes mandatory post-merge proof.

This record does not close P4 overall, P5 overall, or any later program. It does not authorize execution, persistence, network, provider/model/reviewer/critic/verifier invocation, KRI adjudication mutation, K2 expansion, package-root/CLI/API/product integration, release, publication, deployment, ruleset change, or project completion.

---

## 2. Evidence-driven successor basis

Fresh post-P4 reconciliation analysis is recorded at:

```text
PR #331 / comment 5550850246 / ANALYSIS_ONLY
```

That analysis creates no authority by itself.

The canonical Trust and Verification Master Plan v2 amendment is planning direction only. It identifies a future Evidence Plane / ProofGraph and potential P5 components, but explicitly grants no implementation authority.

The first P5 unit must therefore be selected from a concrete residual gap rather than from numbering or component names.

---

## 3. Canonical duplication check

The following canonical runtime mechanisms already exist and must not be reimplemented or semantically replaced by this unit:

```text
packages/kodac-runtime/src/verification/planner.ts
  = af6732d996853ac0480991e4f1f4419de6a80a62
  existing VerificationPlan / deterministic command planning

packages/kodac-runtime/src/verification/types.ts
  = 5c7006e6904f97791378a4a4367d569a6971c6af
  existing VerificationReport / VerificationCheckResult / VerifierRegistry

packages/kodac-runtime/src/proof-review/contracts.ts
  = ef0ae26c2a44157fb20ad33145788ba1255239f5
  existing K5 proof package / evidence requirements / proof judgment

packages/kodac-runtime/src/proof-review/linkage-contracts.ts
  = 59d87c73d829c4cd1d57dba134f79839f13b9722
  existing K5 exact source linkage

packages/kodac-runtime/src/proof-review/reconciliation-contracts.ts
  = acf758a6f17180448c1c46b0397bfe6742b4f04b
  existing K5 stale / contradictory / incomplete / invalid proof reconciliation

packages/kodac-runtime/src/reviewer-intelligence/p4-claim-envelope.ts
  = e9a59acf25c05276dddf80e269be4ae03e5e6775
  existing reviewer-specific P4 claim envelope

packages/kodac-runtime/src/reviewer-intelligence/p4-critic-disposition.ts
  = 11b49b715fa5991deb6d2154d11c3cacbf310f92
  existing structured P4 critic disposition
```

Required non-duplication invariants:

```text
P5-R1 != NEW VERIFICATION PLANNER
P5-R1 != NEW VERIFICATION REPORT / RESULT EXECUTION
P5-R1 != NEW VERIFIER REGISTRY
P5-R1 != REPLACEMENT K5 PROOF PACKAGE
P5-R1 != REPLACEMENT K5 STALE / CONTRADICTORY RECONCILIATION
P5-R1 != REPLACEMENT P4 REVIEWER CLAIM ENVELOPE
P5-R1 != PROOFGRAPH
```

---

## 4. Concrete residual gap

Current K5 evidence records and source links bind evidence kind/id, revision, ref/digest and selected source metadata. P4-R1 binds richer evidence/scope/freshness state only for one reviewer finding.

The canonical runtime does not provide one generic, provider-neutral, pure/data-only provenance sidecar that binds an already-existing evidence identity/ref/digest to all of these exact caller-supplied identities:

```text
repository base / candidate head
producer id / producer version
configuration identity
policy identity
scope identity
input identity
environment identity
freshness state / freshness-basis identity
```

That absence is narrower than a ProofGraph and does not require verifier execution, persistence, graph storage, policy evaluation, automatic freshness computation, or product integration.

The minimum sufficient P5 foundation is therefore one deterministic provenance binding over already-existing evidence.

---

## 5. Exact future implementation allowlist

Only after this authorization record becomes canonical and post-merge proven may one later P5-R1 implementation candidate modify exactly these three paths:

```text
packages/kodac-runtime/src/verification/p5-evidence-provenance.ts
schema/p5-evidence-provenance.schema.json
packages/kodac-runtime/test/p5-r1-evidence-provenance.test.ts
```

No fourth path is authorized.

The implementation may not modify:

```text
packages/kodac-runtime/src/verification/types.ts
packages/kodac-runtime/src/verification/planner.ts
packages/kodac-runtime/src/verification/engine.ts
packages/kodac-runtime/src/verification/done-gate.ts
packages/kodac-runtime/src/proof-review/**
packages/kodac-runtime/src/reviewer-intelligence/**
packages/kodac-runtime/src/index.ts
package.json
any lockfile
any workflow
any K2 / trust / execution path
any roadmap/current-view path
any historical authorization/evidence path
```

No dependency is admitted.

---

## 6. Bounded P5-R1 contract semantics

The implementation may define exactly one pure/data-only provenance binding protocol with deterministic content-addressed identity.

Minimum semantic shape:

```text
version
bindingIdentity
source
  sourceKind
  evidenceIdentity
  sourceRef
  sourceDigest
revision
  repositoryId
  canonicalBase
  candidateHead
producer
  producerId
  producerVersion
  configurationIdentity
policyIdentity
scopeIdentity
inputIdentity
environmentIdentity
freshness
  state = CURRENT | STALE
  basisIdentity
```

Required identity rules:

1. `canonicalBase` and `candidateHead` are lowercase 40-hex Git identities.
2. `evidenceIdentity`, `sourceDigest`, `configurationIdentity`, `policyIdentity`, `scopeIdentity`, `inputIdentity`, `environmentIdentity`, `freshness.basisIdentity`, and `bindingIdentity` are lowercase 64-hex SHA-256 identities.
3. `sourceKind` is a bounded inert identifier. It does not define trust policy or grant authority.
4. `sourceRef`, `repositoryId`, `producerId`, and `producerVersion` are bounded inert strings.
5. `freshness.state` is caller-supplied `CURRENT | STALE`; P5-R1 does not compute freshness.
6. `bindingIdentity` is derived deterministically from the canonical semantic content excluding `bindingIdentity` itself.
7. Equivalent semantic input must produce one equivalent frozen result regardless of caller object/array mutation after construction.
8. Validation must reject malformed identities, unsupported freshness state, unknown/missing fields, proxies/accessors/symbol fields/cycles or other hostile structured input before it can create hidden side effects through reflection.
9. JSON Schema and TypeScript/runtime validation must agree on the contract, including Unicode/code-point length behavior where limits are expressed as JSON Schema string lengths.

The implementation may expose pure builder/validator/identity helpers only inside the authorized source file. It may not export through the package root or CLI/API surface.

---

## 7. Explicit non-grants

```text
SOURCE EVIDENCE REFERENCE != SOURCE EVIDENCE VALIDATION
PROVENANCE BINDING != PROOF
PROVENANCE BINDING != AUTHORITY
CALLER-SUPPLIED FRESHNESS != AUTOMATIC FRESHNESS DETERMINATION
P5-R1 != PROOFGRAPH
P5-R1 != VERIFIER EXECUTION
P5-R1 != VERIFICATION RESULT GENERATION
P5-R1 != POLICY DECISION
P5-R1 != KRI ADJUDICATION
P5-R1 != K5 DONE-GATE AUTHORITY
P5-R1 != K2 EXECUTION AUTHORITY
```

Also not authorized:

```text
NETWORK = NO
PERSISTENCE / DATABASE = NO
TELEMETRY / UPLOAD = NO
TRAINING / FINE-TUNING / ONLINE LEARNING = NO
PROVIDER / MODEL / REVIEWER / CRITIC / VERIFIER INVOCATION = NO
AUTOFIX / REMEDIATION EXECUTION = NO
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NO
NEW DEPENDENCY / DONOR ADMISSION = NO
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NO
RULESET CHANGE / BYPASS = NO
P5-R2+ AUTHORITY BY NUMBERING = NO
P5 OVERALL CLOSURE = NO
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## 8. Mandatory future implementation tests

The later three-path implementation candidate must include focused tests proving at minimum:

1. deterministic identity for equivalent semantic input;
2. exact binding of source evidence identity/ref/digest;
3. exact Git base/head binding;
4. exact producer/configuration/policy/scope/input/environment binding;
5. `CURRENT` and `STALE` remain explicit distinct caller-supplied states;
6. any changed bound identity changes `bindingIdentity`;
7. malformed SHA/Git identities are rejected;
8. unknown/missing fields are rejected;
9. duplicate/unexpected structural fields cannot be smuggled through arrays/objects;
10. proxies, revoked proxies, accessors, symbol fields, cycles and hostile prototypes are rejected without invoking caller-owned traps/getters where platform primitives permit fail-closed pre-detection;
11. structured output is detached/frozen and caller mutation cannot alter it;
12. runtime validation and JSON Schema accept/reject the same canonical positive/negative boundary fixtures, including astral-Unicode length boundaries;
13. canonical predecessor blobs named in section 3 remain unchanged.

Focused tests are not sufficient merge authority. The exact implementation head must also pass all repository-required CI applicable to that head.

---

## 9. Qualification gate for this authorization candidate

This one-path authorization candidate must not merge unless one unchanged exact head proves:

```text
BASE == CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P5_R1_EVIDENCE_PROVENANCE_BINDING_AUTHORIZATION_2026-09-05.md
REQUIRED CI = TERMINAL SUCCESS OR CANONICALLY PROVEN NON_APPLICABLE
INTERNAL SUBSTANTIVE SEMANTIC INSPECTION = CLEAN
KNOWN ACTIONABLE DEFECTS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
EXTERNAL_REVIEW = OPTIONAL_ADVISORY_EVIDENCE
RULESET 20707483 = active / bypass_actors=[] / current_user_can_bypass=never
MERGE = GUARDED NORMAL MERGE USING exact expected_head_sha
POST_MERGE_PROOF = main + ordered parents + tree + authorization blob + verified/valid signature + applicable push checks + merged PR state + ruleset
WAIVER = NO
```

Any head/base/byte movement invalidates exact-head qualification evidence.

---

## 10. Conditional result only

Only after this exact authorization candidate qualifies, merges normally, and passes mandatory post-merge proof may the repository state:

```text
P5-R1 EVIDENCE PROVENANCE BINDING IMPLEMENTATION = AUTHORIZED
IMPLEMENTATION_PATHS = EXACTLY 3
```

Even then:

```text
P5-R1 = NOT YET CLOSED_CANONICAL
P5-R2+ = NOT_AUTHORIZED
P5 OVERALL = NOT_CLOSED
P4 OVERALL = OPEN
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
