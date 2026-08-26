# Kodac K6-R3 Route Outcome Linkage Authorization

## Record identity

- Date: 2026-08-26
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-26`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION AUTHORIZATION
- Canonical base commit: `90c00cfc01cb874c08b4f7bde1469ccb298b5648`
- Canonical base tree: `018ec040cb82c1a6c4d8370f69ffbf46fdca8534`
- K6-R2 canonical implementation merge: `90c00cfc01cb874c08b4f7bde1469ccb298b5648` (PR #206)
- K6-R2 qualified implementation head: `4262fb54cd2cf14ac959a8fb986ac152c679c739`
- K6-R2 qualified implementation tree: `018ec040cb82c1a6c4d8370f69ffbf46fdca8534`
- K6 definition/planning authority: `docs/planning/KODAC_K6_DEFINITION_AND_PLANNING_AUTHORIZATION_2026-08-26.md` blob `0ff1e097edf5112ff01da3e54f27ddfc0ceb0526`
- K6-R1 authorization: `docs/planning/KODAC_K6_R1_MODEL_PROVIDER_ROUTE_ELIGIBILITY_AUTHORIZATION_2026-08-26.md` blob `59ad23a302dc55ab02c4a875d529c569514471b0`
- K6-R2 authorization: `docs/planning/KODAC_K6_R2_DETERMINISTIC_ROUTE_PLAN_AUTHORIZATION_2026-08-26.md` blob `389765c1938d1e9f84612da538697ad8b5a270d4`
- K5 canonical closeout evidence: `docs/planning/KODAC_K5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-26.md` blob `d867bef3413dda5118a24c1f6ecff88abedf3812`
- Governing constitution: `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`
- Canonical event/evidence direction: `docs/adr/ADR-0005-canonical-session-event-tool-protocol.md`
- Mandatory side-effect trust boundary: `docs/adr/ADR-0006-mandatory-trust-hook-side-effects.md`

## Authority reconciliation

K6 planning and contract design are canonical. K6-R1 and K6-R2 are closed canonical for their bounded pure-data scopes. The next planning-decomposition item is:

```text
K6-R3 — exact linkage from executed route choices to caller-materialized verification, K5, Done Gate, and execution-receipt outcomes
```

This record is the separate bounded implementation-authorization candidate for that linkage-only slice. It does not authorize K6 to execute a route, observe a provider directly, classify retryability, decide that a fallback should run, persist outcomes, learn from outcomes, or change completion truth.

## Decision

After and only after canonical adoption and post-merge proof of this exact record, authorize one pure deterministic K6-R3 implementation slice:

```text
K6-R1: CLOSED_CANONICAL
K6-R2: CLOSED_CANONICAL
K6-R3: PURE CALLER-MATERIALIZED ROUTE-OUTCOME LINKAGE AUTHORIZED
K6-R3 IMPLEMENTATION: NOT YET CANONICAL
K6-R4+: NOT AUTHORIZED
ROUTE / FALLBACK / RETRY EXECUTION: NOT AUTHORIZED
FAILURE OR RETRYABILITY CLASSIFICATION: NOT AUTHORIZED
OUTCOME PERSISTENCE / TELEMETRY / LEARNING: NOT AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY: UNCHANGED
K2 SIDE-EFFECT AUTHORITY: UNCHANGED
```

R3 answers exactly one question:

> Given one exact validated K6-R2 request+plan, caller-materialized records describing which plan steps were actually executed, caller-materialized K5-R2 source links for the corresponding execution receipts and verification report, one canonical K5-R4 reconciliation record, and one caller-materialized Done Gate outcome snapshot, what immutable deterministic linkage record binds those already-existing facts together?

R3 does not decide what should execute. It only links what the caller says has already happened to already-materialized outcome evidence and validates every cross-record identity that the pinned predecessor contracts make provable.

## Governing invariants

```text
ROUTE OUTCOME LINKAGE != ROUTE EXECUTION
OBSERVED PLAN STEP != AUTHORIZED PLAN STEP
EXECUTION RECEIPT STATUS != RETRY CLASSIFICATION
EXECUTION RECEIPT FAILURE != FALLBACK COMMAND
FALLBACK ROLE != AUTOMATIC FALLBACK AUTHORITY
VERIFICATION PASS != DONE GATE VERDICT
K5 VALID != DONE GATE VERDICT
K5 INVALID != EXECUTION FAILURE AUTHORITY
DONE GATE PROVEN_READY != K6 PROVEN_READY AUTHORITY
R3 LINKAGE VALID != PROVEN_READY
R3 LINKAGE VALID != REVIEW APPROVAL
R3 LINKAGE VALID != MERGE AUTHORITY
R3 LINKAGE VALID != LEARNING SIGNAL AUTHORITY
SELF-IMPROVING != SELF-AUTHORIZING
AUTHORITY DOES NOT FOLLOW INFORMATION FLOW
```

K2 remains the sole side-effect authority. Done Gate remains the sole completion authority. K5 keeps its proof-review semantics. R3 may preserve those records and statuses, but it may not reinterpret or strengthen them.

## K6-R2 canonical implementation ledger

The exact canonical R2 production basis is:

| Path | Required blob |
| --- | --- |
| `.github/workflows/k6-r2-deterministic-route-plan.yml` | `b1c8e207fa10196d66215dd3d2de4984e7741e63` |
| `schema/k6-r2-deterministic-route-plan.schema.json` | `41a96d4efe0a97b4dd418a13d9ba0c5f2488c0a6` |
| `packages/kodac-runtime/src/evidence-router/route-plan-contracts.ts` | `4ee85d8c0163d5318d0d900d733ba75afa814f7c` |
| `packages/kodac-runtime/src/evidence-router/route-plan.ts` | `1653c09a80e8868cf21713708e220c4ca0bd625f` |
| `packages/kodac-runtime/src/index.ts` | `49aa184daebca6464238396c71f7079dbbd96122` |
| `packages/kodac-runtime/test/k6-r2-deterministic-route-plan.test.ts` | `72fce40746e4054eb21d09c67eb7cfe420fea063` |

R3 must validate the full R2 request and plan through the canonical R2 validators. It must not reimplement R1 eligibility, R2 caller-order validation, route-plan identity, primary/fallback projection, or canonicalization.

## Required external predecessor basis

The following already-canonical records are immutable dependencies for the R3 source slice:

| Path | Required blob |
| --- | --- |
| `packages/kodac-runtime/src/proof-review/linkage-contracts.ts` | `59d87c73d829c4cd1d57dba134f79839f13b9722` |
| `packages/kodac-runtime/src/proof-review/reconciliation-contracts.ts` | `acf758a6f17180448c1c46b0397bfe6742b4f04b` |
| `packages/kodac-runtime/src/proof-review/reconciliation.ts` | `ec82ed7f1b941f7c523739ccd2e2663176edc30b` |
| `packages/kodac-runtime/src/evidence/receipt.ts` | `214403398751c9d22bf695786c7fd7c6fd7e35e1` |
| `packages/kodac-runtime/src/verification/types.ts` | `5c7006e6904f97791378a4a4367d569a6971c6af` |
| `packages/kodac-runtime/src/verification/done-gate.ts` | `067e147569fa52cc2b04c5df26fbe20a01e958e9` |
| `schema/k5-r2-evidence-linkage.schema.json` | `85ee0070895bbc5b4eef16c3cd1760b92e4dccb2` |
| `schema/k5-r4-proof-state-reconciliation.schema.json` | `e0f0871f2fc0a73526df3e7676e4f90138621052` |
| `schema/k6-r2-deterministic-route-plan.schema.json` | `41a96d4efe0a97b4dd418a13d9ba0c5f2488c0a6` |

These files may be imported or referenced only where this record explicitly permits it. They are not authorized to change in the R3 implementation slice.

## Pure-data boundary

K6-R3 production code is pure deterministic in-memory TypeScript. Every outcome is caller-materialized before it reaches R3.

R3 production code may not:

- call `ExecutionGateway` or any execution backend;
- invoke a model, provider, reviewer, evaluator, tool, agent, MCP, ACP, shell, process, or network client;
- read files, directories, Git, GitHub, environment variables, credentials, secrets, or configuration;
- create, mutate, or persist an `ExecutionReceipt`;
- call `DoneGate.evaluate()` or construct a new Done Gate verdict;
- rerun verification commands;
- create or mutate K5 proof-review records;
- observe a provider or process directly;
- read a clock or generate randomness;
- classify failure, retryability, transient/permanent error state, or fallback eligibility;
- advance to a primary, fallback, or retry;
- infer execution chronology from timestamps;
- score, rank, reward, prefer, or learn from any outcome;
- persist linkage or outcome data;
- mutate caller input.

The only Node built-ins authorized in R3 production source are static imports from:

```text
node:crypto
node:util
```

`node:crypto` is limited to SHA-256 identity derivation. `node:util` is limited to fail-closed proxy detection.

R3 may import only the canonical predecessor validation/canonicalization surfaces needed for R2 request+plan validation, K5-R2 source-link validation, and K5-R4 reconciliation validation. Type-only imports from Done Gate / verification contracts are permitted. No predecessor evaluator or executor may be called.

## Contract versions

```text
K6_R3_ROUTE_OUTCOME_LINKAGE_VERSION = "kodac-k6-r3-route-outcome-linkage-v1"
K6_R3_DONE_GATE_OUTCOME_VERSION = "kodac-k6-r3-done-gate-outcome-v1"
```

No alias, floating version, migration fallback, or implicit upgrade is accepted.

## R3 input envelope

The public R3 creation function accepts exactly one caller-materialized input object containing:

```text
routePlanRequest
routePlan
executionObservations[]
verificationSource\ nk5Reconciliation
doneGateOutcome
```

The literal field is `k5Reconciliation`; the line break above is formatting only. The implementation and public schema must use exactly these six field names.

Before traversing any downstream outcome object, R3 must validate `routePlanRequest` and `routePlan` through the exact canonical K6-R2 validators. A malformed or forged R2 predecessor therefore fails before any K5 or outcome traversal.

R3 is valid only for an R2 plan whose status is `ROUTABLE` and whose `steps[]` is non-empty. A `NO_ELIGIBLE_CANDIDATE` plan has no executed route choice to link and must be rejected as structurally inapplicable to R3 rather than converted to a success or failure outcome.

## Execution observations

`executionObservations[]` is caller-materialized observation order. The array is ordered data, not a set, and its order participates in the R3 linkage identity exactly as supplied.

Each observation input contains exactly:

```text
planStepIndex
executionReceiptSource
```

Rules:

- the array contains 1 through 4096 observations;
- `planStepIndex` is a non-negative safe integer and must index an existing R2 `steps[]` entry;
- `executionReceiptSource` must pass the canonical K5-R2 source-link validator;
- its `sourceKind` must equal `EXECUTION_RECEIPT`;
- its `canonicalBase` and `candidateHead` must equal the R2 plan revision exactly;
- its source identity must be unique across `executionObservations[]`;
- its receipt metadata `receiptId` must be unique across `executionObservations[]`;
- R3 derives candidate ID, candidate kind, provider, model, and role only from the referenced R2 plan step; the caller does not restate those fields;
- repeated `planStepIndex` values are permitted only as distinct caller-materialized observations with distinct execution-receipt source identities and receipt IDs;
- repeated step indices do not mean retry, and R3 must not classify why a step was observed more than once;
- observation order need not be monotonic by plan index and must not be interpreted as permission to execute or as evidence that fallback policy was followed.

R3 preserves the execution-receipt `resultStatus` (`success`, `blocked`, or `failure`) from canonical K5-R2 receipt metadata but may not derive a retry, fallback, reward, quality, or completion judgment from it.

## Verification source

`verificationSource` must be one canonical K5-R2 source-link record with:

```text
sourceKind = VERIFICATION_REPORT
```

Its `canonicalBase` and `candidateHead` must equal the R2 plan revision exactly. Its metadata is the existing K5-R2 verification metadata:

```text
protocol = kodac.verification
reportVersion = 1
sessionId
passed
checkIds[]
```

R3 preserves the exact validated `sourceIdentity`, `sourceDigest`, `evidenceId`, and `passed` value. It must not rerun verification or infer Done Gate status from `passed`.

## K5 reconciliation input

`k5Reconciliation` must pass `validateK5R4ProofStateReconciliation()` from the pinned K5-R4 contract.

Its revision must equal the R2 plan revision exactly:

```text
k5Reconciliation.revision.repositoryId == routePlan.repositoryId
k5Reconciliation.revision.canonicalBase == routePlan.canonicalBase
k5Reconciliation.revision.candidateHead == routePlan.candidateHead
```

R3 must then prove exact K5 membership for the caller-materialized source links:

1. the verification source must match exactly one K5-R4 result with the same `evidenceId`, `evidenceKind = VERIFICATION`, and the same non-null `sourceIdentity`;
2. every execution-receipt source must match exactly one K5-R4 result with the same `evidenceId`, `evidenceKind = EXECUTION_RECEIPT`, and the same non-null `sourceIdentity`;
3. missing, duplicate, substituted, null, or wrong-kind K5 membership is structural `TypeError`;
4. R3 does not require the matched K5 state to be `VALID`; `VALID`, `INCOMPLETE`, `CONTRADICTORY`, `STALE`, and `INVALID` remain K5-owned caller-materialized outcomes and may all be linked without reinterpretation;
5. `NOT_APPLICABLE` cannot satisfy the required verification/receipt membership and therefore cannot produce a valid R3 linkage for this v1 contract.

R3 preserves the K5 `packageIdentity`, `reconciliationIdentity`, and aggregate `status`. It does not recalculate K5 state or causes.

## Done Gate outcome snapshot

`doneGateOutcome` is a caller-materialized immutable snapshot, not a request to execute Done Gate. It contains exactly:

```text
version
verificationSourceIdentity
status
reasons[]
evidence[]
```

Rules:

- `version` must equal `kodac-k6-r3-done-gate-outcome-v1`;
- `verificationSourceIdentity` must exactly equal `verificationSource.sourceIdentity`;
- `status` is exactly `PROVEN_READY` or `NOT_READY`;
- `reasons[]` preserves caller order and contains 0 through 4096 bounded NUL-free valid-Unicode strings;
- `evidence[]` preserves caller order and contains 0 through 16384 exact `VerificationEvidenceRef` snapshots;
- each evidence snapshot has `kind` in `receipt | artifact | event | workspace`, a bounded non-empty `ref`, and optional lowercase SHA-256 `digest`;
- duplicate `kind:ref` evidence entries are rejected because the pinned Done Gate canonical output de-duplicates that pair;
- `PROVEN_READY` requires zero reasons;
- `NOT_READY` requires at least one reason;
- R3 computes `doneGateOutcomeIdentity` as SHA-256 over the exact normalized snapshot using the pinned K6 canonical JSON profile;
- R3 must not invoke `DoneGate.evaluate()` and must not claim the snapshot is authentic merely because its structure is valid.

The string `PROVEN_READY` may appear only as the preserved caller-materialized Done Gate status inside the R3 record. R3 itself does not emit a K6 completion verdict.

## Exact output linkage record

The created immutable `K6R3RouteOutcomeLinkage` contains exactly:

```text
version
linkageIdentity
routePlanRequestIdentity
routePlanIdentity
eligibilityResultIdentity
requestIdentity
repositoryId
canonicalBase
candidateHead
taskId
executionObservations[]
verificationSourceIdentity
verificationSourceDigest
verificationEvidenceId
verificationPassed
k5PackageIdentity
k5ReconciliationIdentity
k5Status
doneGateOutcomeIdentity
doneGateStatus
```

Each output `executionObservations[]` entry contains exactly:

```text
planStepIndex
candidateId
candidateKind
provider
model
role
executionReceiptSourceIdentity
executionReceiptSourceDigest
executionReceiptEvidenceId
receiptId
executionResultStatus
```

All plan fields are exact projections from the canonical R2 plan step. All receipt fields are exact projections from the validated K5-R2 execution-receipt source link. No caller-supplied restatement may override a predecessor value.

`verification*` fields are exact projections from the validated K5-R2 verification source. `k5*` fields are exact projections from the validated K5-R4 reconciliation. `doneGate*` fields are exact projections from the normalized caller snapshot.

## Deterministic identities

R3 must reuse the pinned K6 canonical JSON profile and SHA-256 discipline. It must not introduce a second serializer.

`doneGateOutcomeIdentity` is computed from the normalized Done Gate snapshot excluding no fields because the snapshot itself contains no claimed identity.

`linkageIdentity` is SHA-256 over the exact normalized R3 linkage record with `linkageIdentity` omitted and every other output field included.

The following are identity-significant and must not be sorted or normalized away:

- execution observation order;
- Done Gate reason order;
- Done Gate evidence order;
- exact Unicode spellings;
- exact source identities/digests;
- exact K5 status;
- exact Done Gate status;
- exact receipt result status;
- repeated plan-step observations when they use distinct receipts.

No clock, UUID, random value, implicit environment value, locale collation, Unicode normalization, or provider-specific serialization may enter an R3 identity.

## Hostile-input and resource bounds

Before property enumeration or traversal, every R3-owned object/array must fail closed on proxies. R3-owned structures must reject:

- accessors/getters/setters;
- symbol-keyed fields;
- non-enumerable unexpected fields;
- unknown fields;
- non-plain object prototypes;
- non-plain arrays;
- sparse arrays;
- cycles;
- invalid Unicode scalar sequences;
- NUL in bounded strings;
- negative zero where a numeric slot is inspected;
- non-safe integers;
- excessive nesting or node count.

The R3-owned safe-JSON traversal budget is:

```text
maxDepth = 32
maxNodes = 100000
maxTotalStringChars = 4000000
maxExecutionObservations = 4096
maxDoneGateReasons = 4096
maxDoneGateEvidenceRefs = 16384
```

Predecessor structures remain subject to their own stricter canonical limits and validators. R3 must not relax them.

## Immutability and caller ownership

R3 must not mutate any input object, array, predecessor record, Done Gate snapshot, or nested field. Returned linkage structures and arrays must be frozen/immutable in the same public style as R1/R2/K5 canonical outputs.

Validation must not trigger a caller getter, proxy trap, custom iterator, `toJSON`, value coercion hook, or prototype method.

## Authorized K6-R3 implementation surface

After canonical adoption and post-merge proof of this authorization record, one implementation PR is authorized to change exactly these six paths and no others:

```text
.github/workflows/k6-r3-route-outcome-linkage.yml
schema/k6-r3-route-outcome-linkage.schema.json
packages/kodac-runtime/src/evidence-router/outcome-linkage-contracts.ts
packages/kodac-runtime/src/evidence-router/outcome-linkage.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k6-r3-route-outcome-linkage.test.ts
```

No seventh path is authorized.

`packages/kodac-runtime/src/index.ts` may change only by appending the exact two reviewed exports for the new R3 contract and linkage modules. Every pre-R3 export line and order must remain byte-for-byte unchanged.

No dependency, package manifest, lockfile, configuration, documentation, K2/K5/KRI/Done Gate source, provider implementation, receipt implementation, verification implementation, or R1/R2 source path is authorized to change.

If this contract cannot be implemented inside the exact six-path surface, implementation must stop and a replacement canonical authorization is required.

## Public JSON Schema requirements

The R3 schema must be Draft 2020-12 with a stable `$id`:

```text
https://kodac.dev/schema/k6-r3-route-outcome-linkage.schema.json
```

The public root must be an invariant-bearing envelope containing both the full R3 input and the produced linkage record. Input/output definitions may be reusable under `$defs`, but a standalone input or standalone linkage object must not be advertised as a fully semantically validated public root.

The schema must reference the pinned predecessor definitions rather than copy them where the predecessor schema provides a reusable shape:

```text
https://kodac.dev/schema/k6-r2-deterministic-route-plan.schema.json
https://kodac.dev/schema/k5-r2-evidence-linkage.schema.json
https://kodac.dev/schema/k5-r4-proof-state-reconciliation.schema.json
```

A dedicated executable validator may extend Draft 2020-12 only for invariants that JSON Schema cannot express, including UTF-8 byte limits, exact predecessor cross-record identity binding, exact K5 source membership, output projection, and deterministic identity recomputation.

The dedicated workflow must prove schema/runtime parity with positive and hostile fixtures. A fixture that fails for multiple unrelated reasons is not sufficient evidence for a specific custom keyword or byte-bound invariant when the workflow claims to prove that invariant.

## Required focused deterministic corpus

The focused R3 tests must include at least:

- one PRIMARY observation linked to one execution receipt, verification source, K5 reconciliation, and Done Gate `NOT_READY` snapshot;
- one FALLBACK observation without any automatic-fallback execution semantics;
- multiple caller-ordered observations with exact order preserved;
- repeated observation of the same plan step using two distinct receipt source identities, proving no retry classification occurs;
- successful, blocked, and failure execution-receipt statuses preserved without derived retry/fallback state;
- K5 aggregate `VALID`, `INCOMPLETE`, `CONTRADICTORY`, `STALE`, and `INVALID` preserved without reinterpretation where structurally linkable;
- Done Gate `PROVEN_READY` and `NOT_READY` preserved only as nested caller outcome status;
- forged R2 request identity rejected;
- forged R2 plan identity rejected;
- `NO_ELIGIBLE_CANDIDATE` plan rejected as inapplicable;
- out-of-range plan step index rejected;
- wrong K5-R2 source kind rejected;
- receipt source revision mismatch rejected;
- verification source revision mismatch rejected;
- duplicate receipt source identity rejected;
- duplicate receipt ID rejected;
- K5 repository/canonical-base/candidate-head mismatch rejected;
- missing verification K5 membership rejected;
- wrong-kind verification K5 membership rejected;
- missing receipt K5 membership rejected;
- wrong-kind receipt K5 membership rejected;
- null/unlinked K5 source membership rejected;
- Done Gate verification-source identity mismatch rejected;
- malformed Done Gate status/reason invariant rejected;
- duplicate Done Gate `kind:ref` evidence rejected;
- forged claimed R3 linkage identity rejected by the validator;
- proxy/accessor/symbol/sparse/cycle/non-plain/invalid-Unicode/NUL/resource-bound hostile inputs rejected without observable hooks;
- caller inputs remain byte/structure unchanged;
- returned structures are immutable;
- semantically identical predecessor canonical inputs produce byte-identical R3 identities;
- observation-order changes produce distinct R3 linkage identities.

No fixture may invoke a provider, model, reviewer, evaluator, tool, agent, shell, network endpoint, filesystem write, Git/GitHub action, receipt producer, Done Gate evaluator, or K5 producer.

## Dedicated K6-R3 workflow requirements

The authorized workflow must fail closed on at least:

1. exact implementation branch name `feat/k6-r3-route-outcome-linkage`;
2. exact repository identity;
3. implementation base equal to the canonical merge commit of this authorization record;
4. the exact six-path allowlist and no seventh path;
5. exact immutable predecessor blobs listed in this record;
6. exact append-only shared-index diff;
7. immutable GitHub Action commit pins;
8. schema registration against the exact pinned predecessor schemas and `$id` values;
9. schema/runtime cross-field parity and isolated hostile fixtures;
10. production imports restricted to the authorized pure validation/canonicalization surface;
11. no `ExecutionGateway`, Done Gate evaluation, provider/reviewer/evaluator/tool/agent invocation, network, filesystem, process, shell, environment, Git/GitHub, persistence, telemetry, learning, scoring, ranking, clock, or randomness path;
12. strict TypeScript compilation;
13. focused K6-R3 tests;
14. focused K6-R2 and K6-R1 regressions;
15. focused canonical K5-R2/K5-R4 validation regressions needed by the new linkage surface;
16. full runtime tests;
17. Python tests;
18. Ruff;
19. provenance validation; and
20. unchanged checkout after qualification.

Historical branch/base-pinned K5/K6 implementation workflows are not automatically applicable to the R3 branch. The dedicated R3 workflow must execute the required focused predecessor regressions directly and must not relabel a historical expected branch/base failure as green.

## Review and merge gate for the future implementation PR

K6-R3 implementation must not merge until all of the following are proven on the exact final head:

1. implementation base is the canonical authorization merge;
2. head/tree are captured exactly;
3. changed paths are exactly the six-path allowlist;
4. all six blob identities are captured;
5. dedicated R3 qualification is terminal success;
6. applicable governance/shared/runtime checks are terminal success;
7. fresh exact-head CodeRabbit review has zero unresolved material correctness/security/governance findings;
8. fresh exact-head Qodo review has zero unresolved material correctness/security/governance findings;
9. zero unresolved actionable review threads remain;
10. no review waiver is taken;
11. protected `main` is re-read immediately before merge and equals the authorized implementation base;
12. PR is open, non-draft, mergeable, and still has exactly six changed files;
13. merge uses normal merge-commit semantics guarded by exact `expected_head_sha`;
14. ordered merge parent 1 equals pre-merge canonical `main` and parent 2 equals the exact qualified candidate head;
15. merge tree equals the qualified candidate tree;
16. GitHub merge signature is valid;
17. `main` points to the merge commit and the six merged blobs equal the qualified blobs; and
18. applicable post-merge governance/shared/runtime gates reach terminal success.

Only then may K6-R3 become `CLOSED_CANONICAL` for this bounded linkage-only scope.

## Explicit non-grants

```text
K6-R4+: NOT AUTHORIZED
ROUTE EXECUTION: NOT AUTHORIZED
AUTOMATIC FALLBACK EXECUTION: NOT AUTHORIZED
RETRY EXECUTION: NOT AUTHORIZED
FAILURE / RETRYABILITY CLASSIFICATION: NOT AUTHORIZED
PROVIDER / MODEL INVOCATION: NOT AUTHORIZED
REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION: NOT AUTHORIZED
EXECUTIONGATEWAY CALL: NOT AUTHORIZED
DONE GATE EVALUATION OR MODIFICATION: NOT AUTHORIZED
VERIFICATION COMMAND EXECUTION: NOT AUTHORIZED
K5 RECORD CREATION OR MUTATION: NOT AUTHORIZED
NETWORK / SECRET ACCESS: NOT AUTHORIZED
FILESYSTEM / PROCESS / SHELL ACCESS: NOT AUTHORIZED
GIT / GITHUB RUNTIME ACCESS: NOT AUTHORIZED
PERSISTENT ROUTE / OUTCOME STORAGE: NOT AUTHORIZED
TELEMETRY: NOT AUTHORIZED
ONLINE OR OFFLINE LEARNING: NOT AUTHORIZED
SCORING / RANKING / REWARD / SUCCESS-RATE POLICY: NOT AUTHORIZED
HIDDEN OR INFERRED PROVIDER PREFERENCE: NOT AUTHORIZED
VECTOR / EMBEDDING INFRASTRUCTURE: NOT AUTHORIZED
CROSS-REPOSITORY LEARNING: NOT AUTHORIZED
AUTOMATIC STRATEGY PROMOTION: NOT AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY TRANSFER: NOT AUTHORIZED
K2 SIDE-EFFECT AUTHORITY EXPANSION: NOT AUTHORIZED
NEW DEPENDENCIES / DONOR SOURCE: NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH: NOT AUTHORIZED
Z0 / Z0L / ZROK / PUBLIC ENDPOINT / PAYMENT / SECRET / GITHUB APP AUTHORITY: NOT AUTHORIZED
PR #163 MUTATION: NOT AUTHORIZED BY THIS RECORD
```

## Authorization PR scope

This authorization candidate itself may change exactly one path:

```text
docs/planning/KODAC_K6_R3_ROUTE_OUTCOME_LINKAGE_AUTHORIZATION_2026-08-26.md
```

It may not change source, tests, schemas, workflows, dependencies, lockfiles, package manifests, roadmap/status files, provenance policy, rulesets, protected lanes, provider configuration, K2/K5/KRI/Done Gate runtime, R1/R2 source, PR #163, Z0-family artifacts, secrets, deployment, or release artifacts.

## Canonical adoption gate for this authorization

K6-R3 implementation authority becomes effective only if this exact one-path authorization record is canonically adopted with all of the following proven:

1. PR base ref is exactly `main`;
2. live protected `main` remains exactly `90c00cfc01cb874c08b4f7bde1469ccb298b5648` with tree `018ec040cb82c1a6c4d8370f69ffbf46fdca8534` before merge;
3. the PR diff is exactly the one authorization-document path;
4. all applicable exact-head CI is terminal green;
5. fresh exact-head CodeRabbit and Qodo reviews have zero unresolved material correctness, security, or governance findings;
6. zero unresolved actionable review threads remain;
7. final candidate head/tree/document blob are captured;
8. no waiver is taken;
9. merge uses normal merge-commit semantics guarded by exact expected head SHA;
10. ordered merge parent 1 equals the pre-merge canonical main and parent 2 equals the exact qualified candidate head;
11. merge tree equals the qualified candidate tree and the authorization document blob equals the qualified candidate blob;
12. protected `main` equals the merge commit/tree and introduces exactly the authorized one path; and
13. applicable post-merge governance/shared/runtime checks reach terminal success.

If `main` advances before merge: STOP. Amend this authorization record to the replacement canonical base SHA/tree, forward-merge that exact `main` into the authorization branch using normal non-destructive history, and requalify the new exact head from scratch for scope, CI, CodeRabbit, Qodo, threads, mergeability, tree, and document blob.

No rebase, force-push, destructive history rewrite, stale-base exception, or review waiver is permitted.

## Post-canonical stop boundary

Even after this authorization becomes canonical:

```text
AUTHORIZED NEXT UNIT: K6-R3 IMPLEMENTATION ON THE EXACT SIX-PATH ALLOWLIST
K6-R4+: NOT AUTHORIZED
DO NOT EXECUTE ROUTES / FALLBACKS / RETRIES
DO NOT INVOKE PROVIDERS / MODELS / REVIEWERS / EVALUATORS / TOOLS / AGENTS
DO NOT CALL DONE GATE
DO NOT ADD PERSISTENCE / TELEMETRY / LEARNING
DO NOT MODIFY K2, K5, KRI, OR DONE GATE AUTHORITY
```

The R3 implementation must be a separate PR and must stop after its own guarded merge and post-merge proof. Any K6-R4 outcome-memory work requires a separate canonical authorization.