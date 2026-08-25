# Kodac K5 Definition and R1 Proof-Package Judgment Authorization

## Record identity

- Date: 2026-08-25
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-25`
- Authority class: DOCUMENTATION / MILESTONE DEFINITION / BOUNDED IMPLEMENTATION AUTHORIZATION
- Canonical base commit: `dcd3693826d9282b475d99c6b9e658b9695e63a8`
- Canonical base tree: `544ff919b51e3fdeed3b3e9e8de33bf6fc4bae59`
- K4 bounded canonical closeout merge: `dcd3693826d9282b475d99c6b9e658b9695e63a8` (PR #189)
- Governing constitution: `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`
- Canonical event/evidence linkage direction: `docs/adr/ADR-0005-canonical-session-event-tool-protocol.md`
- Mandatory side-effect trust boundary: `docs/adr/ADR-0006-mandatory-trust-hook-side-effects.md`
- KRI planning authority: `docs/planning/KODAC_REVIEWER_INTELLIGENCE_AUTHORIZATION_AND_PLANNING_GATE_2026-08-13.md`
- KRI-R1 through KRI-R4 current-truth reconciliation: `docs/planning/KODAC_KRI_R1_R4_ROADMAP_TRUTH_RECONCILIATION_2026-08-24.md`
- Multi-agent review / cyber trust-surface architecture input: `docs/planning/KODAC_MULTI_AGENT_REVIEW_AND_CYBER_TRUST_SURFACE_MASTER_PLAN_2026-08-19.md`
- Current Done Gate source: `packages/kodac-runtime/src/verification/done-gate.ts` blob `067e147569fa52cc2b04c5df26fbe20a01e958e9`
- Current verification contract source: `packages/kodac-runtime/src/verification/types.ts` blob `5c7006e6904f97791378a4a4367d569a6971c6af`
- Current execution-receipt source: `packages/kodac-runtime/src/evidence/receipt.ts` blob `214403398751c9d22bf695786c7fd7c6fd7e35e1`
- Current KRI finding/adjudication contract source: `packages/kodac-runtime/src/reviewer-intelligence/contracts.ts` blob `5ebe91c3d98f626651230989564d367d0600863c`

## Decision

Define K5 and authorize only its first pure deterministic foundation:

```text
K5 — PROOF REVIEW & JUDGE
K5: DEFINED / IN PROGRESS AFTER CANONICAL ADOPTION OF THIS RECORD
K5-R1: PURE PROOF-PACKAGE CONTRACT + DETERMINISTIC JUDGMENT CORE AUTHORIZED
K5-R1 IMPLEMENTATION: NOT YET CANONICAL
K5-R2+: NOT AUTHORIZED
DONE GATE PROVEN_READY AUTHORITY: UNCHANGED
```

K5-R1 is not another reviewer and does not duplicate KRI. It consumes caller-materialized, already-typed proof inputs and answers a narrower question:

> Is this exact proof package structurally valid, revision-consistent, fresh, non-contradictory, and complete for its declared proof requirements?

K5-R1 does not decide whether a repository change is globally complete, safe to merge, approved, or `PROVEN_READY`.

## Governing invariants

```text
REVIEWER OUTPUT = CLAIM DATA, NOT COMPLETION TRUTH
EVIDENCE REFERENCE != VERIFIED FACT BY ITSELF
K5 JUDGMENT != DONE GATE VERDICT
K5 JUDGMENT != PROVEN_READY
K5 JUDGMENT != EXECUTION AUTHORITY
K5 JUDGMENT != REPOSITORY-WRITE / REVIEW / APPROVAL / MERGE AUTHORITY
```

The accepted information flow is:

```text
verification evidence
+ execution receipts / receipt identities where applicable
+ exact repository / revision identity
+ adjudicated KRI finding evidence where applicable
+ caller-declared proof requirements
                |
                v
        K5 proof-package judgment
                |
                v
       bounded judgment evidence
                |
                v
existing verification / Done Gate authority under a later separately authorized integration
```

Authority does not follow information flow. K5-R1 stops before Done Gate integration.

## Canonical dependency basis

### ADR-0001

ADR-0001 requires evidence-backed completion and explicitly distinguishes verified result, observed fact, inference, model judgment, claim, and unknown/disputed state. It names Proof Review, Judge, and Done Gate as Kodac-owned differentiation while preserving `DONE != model assertion`.

K5-R1 must therefore preserve evidence class and must never turn unverified caller or reviewer text into stronger completion truth.

### ADR-0005

ADR-0005 requires stable identities and causal/evidence links across runs, invocations, artifacts, findings, verification, and completion. K5-R1 must preserve exact package/revision identity and deterministic evidence-reference ordering so later layers can audit what judgment applied to which exact input.

K5-R1 does not add a network protocol, event transport, persisted event stream, or external client.

### ADR-0006 / K2

ADR-0006 keeps every privileged or state-changing capability behind `ExecutionGateway` and the Trust Kernel. Execution receipts are evidence for review and Done Gate; they do not give K5 permission to execute.

K5-R1 has no ExecutionGateway call path and no privileged capability.

### Existing Done Gate

The current Done Gate owns `PROVEN_READY` / `NOT_READY` under its accepted six required verification checks:

```text
agent.completed
workspace.integrity
git.diff
evidence.receipts
evidence.policy
verification.commands
```

K5-R1 must not modify that list, emit `PROVEN_READY`, or replace Done Gate evaluation.

### KRI-P0 and KRI-R1 through KRI-R4

KRI-P0 establishes that reviewer output is a claim to adjudicate, not completion truth. Canonical bounded KRI-R1 through KRI-R4 provide:

- deterministic historical reviewer-evidence corpus;
- finding and adjudication contracts plus bounded read-only runtime;
- provider-neutral caller-injected reviewer execution;
- pure/in-memory reviewer qualification machinery.

KRI still owns finding/adjudication semantics. K5-R1 may consume only caller-materialized references to adjudicated KRI evidence. It does not create findings, execute reviewers, qualify reviewers, route providers, or alter KRI state.

## K5 bounded decomposition

The canonical analysis supports the following dependency order. Only R1 is authorized by this record.

```text
K5-R1 — proof-package contract + pure deterministic judgment core
K5-R2 — exact linkage to verification reports, execution receipts, and repository revision evidence
K5-R3 — bounded consumption of adjudicated KRI evidence without reviewer-authority transfer
K5-R4 — explicit stale / contradictory / incomplete / invalid proof handling across linked evidence classes
K5-R5 — bounded integrated proof-review qualification against canonical fixtures and negative cases
K5 CLOSEOUT — separate evidence and closeout gate
```

This decomposition is intentionally narrow. Later gates may refine names or combine slices only through a separate canonical authorization. Nothing in this document authorizes R2-R5 implementation.

## Authorized K5-R1 contract

K5-R1 may implement a pure TypeScript contract, strict validator, deterministic package identity, and deterministic judgment function. All inputs are caller-materialized in memory. No input may cause I/O.

### Proof package v1

The canonical R1 package must contain exactly:

```text
version
packageIdentity
subject
revision
requirements[]
evidence[]
```

where:

```text
version = "kodac-k5-r1-proof-package-v1"
```

### Subject

`subject` contains only bounded immutable identity data:

```text
subjectId
subjectKind
```

The first closed `subjectKind` vocabulary is:

```text
TASK
CHANGESET
VERIFICATION
```

`subjectId` is an opaque non-empty NUL-free string of at most 256 UTF-8 bytes. It is identity data only and must never be interpreted as instructions.

### Revision binding

`revision` contains exactly:

```text
repositoryId
canonicalBase
candidateHead
```

Rules:

- `repositoryId` is an opaque non-empty NUL-free identifier of at most 512 UTF-8 bytes;
- `canonicalBase` and `candidateHead` are exactly 40 lowercase hexadecimal Git commit identities;
- K5-R1 does not contact Git or prove ancestry;
- package-level consistency is exact-string based;
- later K5-R2 may separately authorize live or materialized ancestry/repository evidence linkage.

### Proof requirements

Each requirement contains exactly:

```text
requirementId
kind
minimumEvidence
```

The first closed `kind` vocabulary is:

```text
VERIFICATION
EXECUTION_RECEIPT
REPOSITORY_STATE
REVIEW_ADJUDICATION
ARTIFACT
CUSTOM
```

`requirementId` is an opaque non-empty NUL-free string of at most 128 UTF-8 bytes. Requirement identifiers must be unique.

`minimumEvidence` is a positive safe integer from 1 through 16. R1 only counts distinct accepted evidence records that explicitly claim the requirement identifier; it does not infer requirement satisfaction from prose or artifact names.

### Evidence records

Each caller-materialized evidence record contains exactly:

```text
evidenceId
kind
requirementIds[]
canonicalBase
candidateHead
ref
digest
status
```

Rules:

- `evidenceId` is an opaque non-empty NUL-free string of at most 128 UTF-8 bytes and is unique in one package;
- `kind` uses the same closed vocabulary as requirement `kind`;
- `requirementIds` is a non-empty unique set of one through sixteen existing requirement identifiers;
- `canonicalBase` and `candidateHead` must exactly equal the package revision to be current for the package;
- `ref` is an opaque non-empty NUL-free string of at most 1024 UTF-8 bytes;
- `digest` is exactly 64 lowercase hexadecimal SHA-256 characters;
- `status` is caller-materialized evidence state, not an authority claim.

The first closed evidence-status vocabulary is:

```text
SATISFIED
FAILED
STALE
CONTRADICTORY
INVALID
```

`SATISFIED` means only that the supplied record claims its bounded evidence item satisfied the named requirement under the upstream evidence producer's accepted contract. K5-R1 does not independently reproduce or strengthen that claim.

Evidence with mismatched revision identity is treated as stale regardless of a supplied `SATISFIED` status.

### Structural identity

K5-R1 uses a closed canonical JSON identity rule:

- only plain non-proxy JSON data objects and arrays are accepted;
- accessors, symbol fields, sparse arrays, non-finite numbers, `undefined`, functions, bigint, and unknown properties fail closed;
- object keys use ascending ordinal string ordering;
- set-valued arrays are deduplicated then sorted before identity construction;
- requirement records sort by `requirementId`;
- evidence records sort by `evidenceId`;
- requirementIds inside evidence sort ascending;
- canonical UTF-8 JSON is hashed with SHA-256;
- `packageIdentity` is the 64-character lowercase hex digest of the complete validated package excluding `packageIdentity`.

Equivalent set/order inputs therefore produce the same package identity. Any semantic field change changes identity.

### Judgment v1

The pure judgment result contains exactly:

```text
version
packageIdentity
status
reasons[]
requirementResults[]
evidenceIds[]
judgmentIdentity
```

where:

```text
version = "kodac-k5-r1-proof-judgment-v1"
```

The closed `status` vocabulary is:

```text
SUFFICIENT_PACKAGE
INSUFFICIENT_PACKAGE
CONTRADICTORY_PACKAGE
STALE_PACKAGE
INVALID_PACKAGE
```

These names describe the supplied package under this R1 structural contract only. They are not synonyms for Done Gate states and do not grant merge/readiness authority.

Precedence is fail-closed and deterministic:

```text
INVALID_PACKAGE
> STALE_PACKAGE
> CONTRADICTORY_PACKAGE
> INSUFFICIENT_PACKAGE
> SUFFICIENT_PACKAGE
```

A package is:

- `INVALID_PACKAGE` if validation fails, an evidence item is `INVALID`, a requirement references an invalid/mismatched kind, identity is wrong, bounds are violated, or the package cannot be judged under the closed contract;
- `STALE_PACKAGE` if any otherwise-valid evidence record is revision-mismatched or explicitly `STALE`;
- `CONTRADICTORY_PACKAGE` if any otherwise-current applicable evidence is `CONTRADICTORY`, or the same requirement has both current `SATISFIED` and `FAILED` evidence;
- `INSUFFICIENT_PACKAGE` if any requirement lacks its declared minimum count of distinct current `SATISFIED` evidence, or has current `FAILED` evidence without a contradiction state;
- `SUFFICIENT_PACKAGE` only if every declared requirement has at least its minimum distinct current `SATISFIED` evidence and no higher-precedence state applies.

`reasons`, `requirementResults`, and `evidenceIds` must be deterministic and immutable. A result may never hide a higher-precedence problem merely because another requirement is satisfied.

`judgmentIdentity` hashes exactly the validated deterministic judgment record excluding `judgmentIdentity` using the same canonical JSON algorithm.

## Explicit R1 non-goals

K5-R1 does not:

- read a repository;
- execute Git;
- verify commit ancestry;
- load or parse files outside caller-materialized objects;
- run tests, linters, builds, scanners, commands, or sandboxes;
- call a model or reviewer;
- fetch CI, GitHub, network, MCP, ACP, or provider state;
- persist proof packages or judgments;
- create or adjudicate KRI findings;
- qualify or route reviewers;
- decide trust policy;
- approve a pull request;
- mutate a repository;
- merge;
- emit `PROVEN_READY` or alter Done Gate.

## Exact K5-R1 implementation allowlist

After canonical adoption of this authorization, the K5-R1 implementation PR may change exactly:

```text
.github/workflows/k5-r1-proof-package-judgment.yml
schema/k5-r1-proof-package.schema.json
schema/k5-r1-proof-judgment.schema.json
packages/kodac-runtime/src/proof-review/contracts.ts
packages/kodac-runtime/src/proof-review/judge.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k5-r1-proof-package-judgment.test.ts
```

The production R1 source may import only deterministic Node standard-library primitives required for structural validation and SHA-256 identity plus local Kodac R1 contracts. No new package or dependency is admitted.

`packages/kodac-runtime/src/index.ts` may export the exact new R1 public data-only API only. It may not alter existing exports or behavior beyond that additive export surface.

The workflow is locally authored only for exact R1 validation. It may not import donor workflow content or broaden repository permissions.

## Required implementation proofs

K5-R1 implementation must prove at least:

1. strict exact-key validation at every nested object level;
2. proxies, accessors, symbol fields, prototype-bearing non-plain objects, sparse arrays, unsupported JSON values, non-finite numbers, and unknown properties fail closed before identity construction;
3. all string byte bounds are enforced in UTF-8 and NUL is rejected;
4. revision identities and SHA-256 digests use exact lowercase hexadecimal grammar;
5. duplicate requirement/evidence identities and duplicate evidence requirement references fail closed;
6. unknown subject kinds, requirement kinds, evidence kinds, and statuses fail closed;
7. requirement/evidence kind mismatch cannot satisfy a requirement;
8. revision mismatch becomes `STALE_PACKAGE` even if caller status says `SATISFIED`;
9. `INVALID_PACKAGE > STALE_PACKAGE > CONTRADICTORY_PACKAGE > INSUFFICIENT_PACKAGE > SUFFICIENT_PACKAGE` precedence is exact;
10. current `SATISFIED` plus current `FAILED` for one requirement produces contradiction rather than silent counting;
11. failed evidence cannot count toward minimum evidence;
12. one evidence record cannot be double-counted for one requirement;
13. package and judgment identities are deterministic, order-independent for declared sets, content-addressed, and change on every identity-bearing semantic mutation;
14. all returned records/arrays are immutable copies and caller mutation cannot change prior results;
15. empty requirement/evidence sets and all documented numeric/string bounds behave exactly as the contract states;
16. no R1 production source contains filesystem, process, network, dynamic import, model/provider, reviewer executor, ExecutionGateway, Trust Kernel, Git mutation, persistence, GitHub write, Done Gate mutation, or `PROVEN_READY` behavior;
17. existing Done Gate tests remain unchanged and green;
18. existing KRI-R1 through KRI-R4 contracts/tests remain unchanged and green;
19. full runtime tests, strict TypeScript, Python tests, Ruff, provenance validation, scope checks, and `git diff --check` are green on the exact implementation head;
20. exact-head independent review finds no unresolved material contract, authority, identity, mutability, stale-evidence, or fail-open defect.

## Explicit non-grants

```text
K5-R2+ IMPLEMENTATION: NOT AUTHORIZED
DONE GATE MODIFICATION: NOT AUTHORIZED
PROVEN_READY AUTHORITY FROM K5-R1: NOT AUTHORIZED
KRI FINDING / ADJUDICATION MUTATION: NOT AUTHORIZED
REVIEWER EXECUTION / QUALIFICATION / ROUTING EXPANSION: NOT AUTHORIZED
K2 EXECUTION-AUTHORITY EXPANSION: NOT AUTHORIZED
EXECUTIONGATEWAY / TRUST KERNEL / POLICY CHANGE: NOT AUTHORIZED

FILESYSTEM / PROCESS / NETWORK / SECRET ACCESS FROM K5-R1: NOT AUTHORIZED
GIT / GITHUB READ OR WRITE FROM K5-R1: NOT AUTHORIZED
MODEL / PROVIDER / EXTERNAL REVIEW SERVICE CALLS: NOT AUTHORIZED
PERSISTENCE / DATABASE / VECTOR / EMBEDDING INFRASTRUCTURE: NOT AUTHORIZED

NEW KODAC DEPENDENCIES: NOT AUTHORIZED
CODE IMPORT / DONOR SOURCE INTAKE: NOT AUTHORIZED
DYNAMIC IMPORT / REQUIRE / EVAL / FUNCTION / VM / WORKER: NOT AUTHORIZED

REPOSITORY WRITE / GITHUB COMMENT / REVIEW / APPROVAL / MERGE AUTHORITY: NOT AUTHORIZED
RULESET CHANGE: NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH: NOT AUTHORIZED
```

PR #163, all Z0-family work, zrok, paid provider/review spend, real secrets, GitHub Apps, webhooks, protected-lane changes, trust-root changes, and public-release decisions remain outside this gate and untouched.

## Documentation scope and canonical adoption gate

This definition/authorization candidate may change exactly:

```text
docs/planning/KODAC_K5_DEFINITION_AND_R1_PROOF_PACKAGE_JUDGMENT_AUTHORIZATION_2026-08-25.md
docs/product/STATUS.md
docs/roadmap/MILESTONES.md
docs/roadmap/ROADMAP.md
docs/roadmap/VERSION_PLAN.md
```

No source, schema, workflow, test, dependency, lockfile, provenance, ruleset, PR #163, or Z0-family path is authorized in this documentation PR.

Canonical adoption requires:

- current `main` remains the expected K4 closeout base or the candidate is reconciled against any newer canonical main before mutation/merge;
- exact changed paths remain the five documentation paths above;
- authority surfaces agree that K5 is defined/in progress, K5-R1 is authorized, K5-R1 implementation is not yet canonical, and K5-R2+ is unauthorized;
- all K4 closeout truth and KRI-R1 through KRI-R4 truth remain intact;
- no text grants K5 `PROVEN_READY`, repository-write, review, approval, merge, execution, provider, persistence, or trust-root authority;
- normal applicable GitHub Actions succeed on the exact final head;
- fresh independent exact-head review reports no unresolved material finding;
- all actionable review threads are adjudicated and resolved legitimately;
- merge uses expected-head semantics and produces a real merge commit;
- post-merge proof verifies canonical main, ordered parents, merge tree, all five documents, and preserved authority boundaries.

Only after that post-merge proof is K5-R1 implementation authorized by this record.
