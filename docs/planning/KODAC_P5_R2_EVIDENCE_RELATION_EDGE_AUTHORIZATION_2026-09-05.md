# Kodac P5-R2 — Evidence Relation Edge Foundation Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL MERGED_AND_POST_PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Deny-by-default state

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 64f468a8cee37e07d252e32cd97b1a229856b65b
CANONICAL_TREE_AT_CANDIDATE_START = 7744183eb13162125f19e29555e7ece7d018bf40
P5-R1 EVIDENCE PROVENANCE BINDING = CLOSED_CANONICAL
P5-R1 POST-MERGE CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL
P5-R2 = AUTHORIZATION_CANDIDATE ONLY
P5-R3+ = NOT_AUTHORIZED
P5 OVERALL = NOT_CLOSED
P6-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This record creates no P5-R2 implementation authority until this exact one-path candidate qualifies on one unchanged exact head, merges normally into protected `main` using the exact expected-head precondition, and passes mandatory post-merge proof.

This record does not authorize ProofGraph aggregation, graph traversal, transitive or inverse inference, verifier execution, source-evidence validation, automatic freshness computation, persistence, network access, provider/model/reviewer/critic/verifier invocation, KRI adjudication mutation, K5 or Done-Gate mutation, K2 expansion, package-root/CLI/API/product integration, dependency admission, release, publication, deployment, ruleset change, or project completion.

---

## 2. Evidence-driven successor basis

Fresh post-P5-R1 successor analysis is recorded at:

```text
PR #335 / comment 5551117643 / ANALYSIS_ONLY
```

That analysis creates no authority by itself.

The canonical Trust and Verification Master Plan v2 amendment remains planning direction only. It identifies future provenance-addressable evidence and support/contradiction/supersession edges as part of the Evidence Plane / ProofGraph direction, but explicitly grants no implementation authority.

The next bounded unit is therefore selected from the concrete residual gap proved by live code inspection, not from P5 numbering or plan component names.

---

## 3. Canonical duplication check

The following canonical mechanisms already exist and must not be reimplemented or semantically replaced by this unit:

```text
packages/kodac-runtime/src/verification/planner.ts
  = af6732d996853ac0480991e4f1f4419de6a80a62
  existing VerificationPlan / deterministic command planning

packages/kodac-runtime/src/verification/types.ts
  = 5c7006e6904f97791378a4a4367d569a6971c6af
  existing VerificationCheckResult / VerificationReport / VerifierRegistry

packages/kodac-runtime/src/proof-review/contracts.ts
  = ef0ae26c2a44157fb20ad33145788ba1255239f5
  existing K5 proof package / evidence requirements / proof judgment

packages/kodac-runtime/src/proof-review/linkage-contracts.ts
  = 59d87c73d829c4cd1d57dba134f79839f13b9722
  existing K5 exact source linkage, including VerificationReport metadata

packages/kodac-runtime/src/proof-review/reconciliation-contracts.ts
  = acf758a6f17180448c1c46b0397bfe6742b4f04b
  existing K5 stale / contradictory / incomplete / invalid proof reconciliation

packages/kodac-runtime/src/relation-graph/contracts.ts
  = dd2caff61c2f6cf82d357002902fa2e5edd1a3da
  existing K3 repository file/symbol relation graph with repository-entity relations only

packages/kodac-runtime/src/reviewer-intelligence/p4-claim-envelope.ts
  = e9a59acf25c05276dddf80e269be4ae03e5e6775
  existing reviewer-specific claim envelope

packages/kodac-runtime/src/reviewer-intelligence/p4-critic-disposition.ts
  = 11b49b715fa5991deb6d2154d11c3cacbf310f92
  existing reviewer-specific structured critic disposition

packages/kodac-runtime/src/verification/p5-evidence-provenance.ts
  = 4c8d708070e950d2902308ca1977ce5267acec29
  existing P5-R1 generic evidence provenance binding
```

Required non-duplication invariants:

```text
P5-R2 != NEW VERIFICATION PLANNER
P5-R2 != NEW VERIFICATION REPORT / RESULT EXECUTION
P5-R2 != NEW VERIFIER REGISTRY
P5-R2 != REPLACEMENT K5 PROOF PACKAGE
P5-R2 != REPLACEMENT K5 SOURCE LINKAGE
P5-R2 != REPLACEMENT K5 PROOF RECONCILIATION
P5-R2 != K3 REPOSITORY RELATION GRAPH
P5-R2 != P4 CRITIC DISPOSITION
P5-R2 != REPLACEMENT P5-R1 PROVENANCE BINDING
P5-R2 != PROOFGRAPH
```

---

## 4. Concrete residual gap

P5-R1 can provenance-bind one already-existing evidence artifact. K5 can judge proof requirements and link selected evidence to concrete source artifacts. P4 can bind one reviewer claim and one critic disposition. K3 can represent snapshot-bound repository entity relations.

The canonical runtime does not provide one generic, provider-neutral, pure/data-only directed trust-evidence relation edge that connects two exact validated P5-R1 provenance bindings with the planning vocabulary:

```text
SUPPORTS
CONTRADICTS
SUPERSEDES
```

The absence is narrower than a ProofGraph. It does not require graph storage, traversal, transitive closure, inverse-edge inference, verifier execution, policy evaluation, adjudication, automatic freshness computation, persistence, or product integration.

The minimum sufficient successor foundation is therefore one deterministic single-edge evidence relation contract over two exact P5-R1 provenance bindings.

---

## 5. Exact future implementation allowlist

Only after this authorization record becomes canonical and post-merge proven may one later P5-R2 implementation candidate modify exactly these three paths:

```text
packages/kodac-runtime/src/verification/p5-evidence-relation.ts
schema/p5-evidence-relation.schema.json
packages/kodac-runtime/test/p5-r2-evidence-relation.test.ts
```

No fourth path is authorized.

The implementation may import and validate against the existing canonical P5-R1 contract, but may not modify it.

The implementation may not modify:

```text
packages/kodac-runtime/src/verification/p5-evidence-provenance.ts
packages/kodac-runtime/src/verification/types.ts
packages/kodac-runtime/src/verification/planner.ts
packages/kodac-runtime/src/verification/engine.ts
packages/kodac-runtime/src/verification/done-gate.ts
packages/kodac-runtime/src/proof-review/**
packages/kodac-runtime/src/relation-graph/**
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

## 6. Bounded P5-R2 contract semantics

The implementation may define exactly one pure/data-only directed relation-edge protocol with deterministic content-addressed identity.

The builder input must contain:

```text
source = one exact P5EvidenceProvenanceBinding
relation = SUPPORTS | CONTRADICTS | SUPERSEDES
target = one exact P5EvidenceProvenanceBinding
```

Both source and target must first pass the existing canonical `validateP5EvidenceProvenanceBinding` validation.

The relation may be constructed only when both bindings have exactly equal:

```text
revision.repositoryId
revision.canonicalBase
revision.candidateHead
```

The source and target `bindingIdentity` values must be distinct.

The canonical relation-edge output may contain exactly:

```text
version = p5-r2-evidence-relation-v1
relationIdentity
revision
  repositoryId
  canonicalBase
  candidateHead
sourceBindingIdentity
relation = SUPPORTS | CONTRADICTS | SUPERSEDES
targetBindingIdentity
```

Required directional meaning:

```text
SOURCE SUPPORTS TARGET
SOURCE CONTRADICTS TARGET
SOURCE SUPERSEDES TARGET
```

No inverse edge is implied or generated.

Required identity rules:

1. `sourceBindingIdentity`, `targetBindingIdentity`, and `relationIdentity` are lowercase 64-hex SHA-256 identities.
2. `canonicalBase` and `candidateHead` remain lowercase 40-hex Git identities inherited from validated P5-R1 bindings.
3. `repositoryId` is copied from the exact common P5-R1 revision and remains a bounded inert identifier; P5-R2 does not resolve a repository.
4. `relationIdentity` is derived deterministically from the canonical semantic output content excluding `relationIdentity` itself.
5. Equivalent validated source/relation/target input must produce one equivalent frozen result.
6. Any change to source binding identity, relation kind, target binding identity, repository identity, canonical base, or candidate head must change `relationIdentity`.
7. Self-relations are rejected.
8. Cross-repository or cross-revision relations are rejected rather than weakened into a partial relation.
9. Unknown/missing fields, proxies, revoked proxies, accessors, symbol fields, hostile prototypes, malformed identities, and unsupported relation kinds must fail closed without invoking caller-owned traps/getters where platform primitives permit fail-closed pre-detection.
10. Runtime validation and JSON Schema must agree on the output contract, including Unicode/code-point behavior for any string-length limit.
11. Output must be detached/frozen so caller mutation cannot alter canonical content.

The implementation may expose pure builder/validator/identity helpers only inside the authorized source file. It may not export through package root, CLI, API, or product surfaces.

---

## 7. Composition boundary with P5-R1

P5-R2 must not duplicate P5-R1 producer/configuration/policy/scope/input/environment/freshness fields inside the edge.

A P5-R2 relation edge is itself an inert content-addressed artifact. If a later caller needs provenance for the relation assertion itself, that edge may be treated as already-existing evidence and separately provenance-bound through P5-R1 using its `relationIdentity` as the evidence identity/digest according to a separately valid caller construction.

This composition does not make the relation true and does not create graph, proof, adjudication, or authority semantics.

---

## 8. Explicit non-grants

```text
CALLER-SUPPLIED RELATION != TRUTH
RELATION EDGE != PROOF
RELATION EDGE != AUTHORITY
RELATION EDGE != ADJUDICATION
RELATION EDGE != CRITIC DISPOSITION
RELATION EDGE != VERIFICATION RESULT
RELATION EDGE != VERIFIER EXECUTION
RELATION EDGE != AUTOMATIC FRESHNESS DETERMINATION
RELATION EDGE != PROOFGRAPH
RELATION EDGE != GRAPH STORAGE
RELATION EDGE != GRAPH TRAVERSAL
RELATION EDGE != TRANSITIVE CLOSURE
RELATION EDGE != INVERSE-EDGE INFERENCE
RELATION EDGE != K5 PROOF PACKAGE
RELATION EDGE != K3 REPOSITORY RELATION GRAPH
PROVENANCE OF RELATION != VALIDITY OF RELATION
```

Also not authorized:

```text
NETWORK = NO
PERSISTENCE / DATABASE = NO
TELEMETRY / UPLOAD = NO
TRAINING / FINE-TUNING / ONLINE LEARNING = NO
PROVIDER / MODEL / REVIEWER / CRITIC / VERIFIER INVOCATION = NO
SOURCE EVIDENCE VALIDATION = NO
AUTOMATIC FRESHNESS COMPUTATION = NO
AUTOFIX / REMEDIATION EXECUTION = NO
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NO
NEW DEPENDENCY / DONOR ADMISSION = NO
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NO
RULESET CHANGE / BYPASS = NO
P5-R3+ AUTHORITY BY NUMBERING = NO
P5 OVERALL CLOSURE = NO
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## 9. Mandatory future implementation tests

The later three-path implementation candidate must include focused tests proving at minimum:

1. deterministic relation identity for equivalent semantic input;
2. exact directional `SUPPORTS`, `CONTRADICTS`, and `SUPERSEDES` semantics;
3. source and target must each be valid exact P5-R1 provenance bindings;
4. exact same `repositoryId`, `canonicalBase`, and `candidateHead` are required;
5. self-relations are rejected;
6. cross-repository and cross-revision relations are rejected;
7. changing source binding, relation kind, target binding, or common revision changes `relationIdentity`;
8. no inverse edge, transitive relation, graph node, graph query, or aggregation is created;
9. malformed SHA/Git identities and unsupported relation kinds are rejected;
10. unknown/missing fields are rejected;
11. proxies, revoked proxies, accessors, symbol fields, hostile prototypes, cycles or hostile structured inputs fail closed without invoking caller-owned traps/getters where platform primitives permit fail-closed pre-detection;
12. output is detached/frozen and caller mutation cannot alter it;
13. runtime validation and JSON Schema accept/reject the same canonical positive/negative boundary fixtures;
14. canonical predecessor blobs named in section 3 remain unchanged, including the P5-R1 source blob.

Focused tests are not merge authority. The exact implementation head must also pass all repository-required CI applicable to that head.

---

## 10. Qualification gate for this authorization candidate

This one-path authorization candidate must not merge unless one unchanged exact head proves:

```text
BASE == CURRENT CANONICAL MAIN == 64f468a8cee37e07d252e32cd97b1a229856b65b
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P5_R2_EVIDENCE_RELATION_EDGE_AUTHORIZATION_2026-09-05.md
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

## 11. Conditional result only

Only after this exact authorization candidate qualifies, merges normally, and passes mandatory post-merge proof may the repository state:

```text
P5-R2 EVIDENCE RELATION EDGE IMPLEMENTATION = AUTHORIZED
IMPLEMENTATION_PATHS = EXACTLY 3
```

Even then:

```text
P5-R2 = NOT YET CLOSED_CANONICAL
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
P5 OVERALL = NOT_CLOSED
P4 OVERALL = OPEN
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
