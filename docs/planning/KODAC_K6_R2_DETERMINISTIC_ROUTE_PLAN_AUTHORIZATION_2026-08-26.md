# Kodac K6-R2 Deterministic Route-Plan Authorization

## Record identity

- Date: 2026-08-26
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-26`
- Authority class: DOCUMENTATION / BOUNDED IMPLEMENTATION AUTHORIZATION
- Canonical base commit: `7bc163b9ec0d5d451950542f1feb15e444fbdc6c`
- Canonical base tree: `68ed4838497debd9e7969b2a13d893d3d8ed9cff`
- K6-R1 canonical implementation merge: `7bc163b9ec0d5d451950542f1feb15e444fbdc6c` (PR #204)
- K6 definition/planning authority: `docs/planning/KODAC_K6_DEFINITION_AND_PLANNING_AUTHORIZATION_2026-08-26.md` blob `0ff1e097edf5112ff01da3e54f27ddfc0ceb0526`
- K6-R1 authorization: `docs/planning/KODAC_K6_R1_MODEL_PROVIDER_ROUTE_ELIGIBILITY_AUTHORIZATION_2026-08-26.md` blob `59ad23a302dc55ab02c4a875d529c569514471b0`
- K6-R1 contracts: `packages/kodac-runtime/src/evidence-router/contracts.ts` blob `dc29c4ce85340312f28b67604cac01c1d775e370`
- K6-R1 eligibility: `packages/kodac-runtime/src/evidence-router/eligibility.ts` blob `c6f987626168b76cedffb949b16d878c243a2715`
- K6-R1 schema: `schema/k6-r1-model-provider-route-eligibility.schema.json` blob `336b5477b16f1bba5c4173874d819091cea9495d`
- K6-R1 focused test: `packages/kodac-runtime/test/k6-r1-model-provider-route-eligibility.test.ts` blob `974137a513f16c93336d5bcda38c351326c53255`
- K6-R1 dedicated workflow: `.github/workflows/k6-r1-model-provider-route-eligibility.yml` blob `c26a4de329d0cb0c4b28f07c97a4162642ef7cbb`
- Shared runtime export index: `packages/kodac-runtime/src/index.ts` blob `7b6f2ddc6347801dc38df4ceb0cd2f0c548dbc71`
- ExecutionGateway boundary: `packages/kodac-runtime/src/execution/gateway.ts` blob `1732dae059fc878c04e6b1bb6a117385efe9ed6a`
- Done Gate: `packages/kodac-runtime/src/verification/done-gate.ts` blob `067e147569fa52cc2b04c5df26fbe20a01e958e9`
- Verification types: `packages/kodac-runtime/src/verification/types.ts` blob `5c7006e6904f97791378a4a4367d569a6971c6af`
- Execution receipt contract: `packages/kodac-runtime/src/evidence/receipt.ts` blob `214403398751c9d22bf695786c7fd7c6fd7e35e1`
- Governing constitution: `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`
- Mandatory side-effect trust boundary: `docs/adr/ADR-0006-mandatory-trust-hook-side-effects.md`

## Authority reconciliation

K6 planning/contract design is canonical. K6-R1 is now canonically implemented and post-merge proven at PR #204 / merge `7bc163b9ec0d5d451950542f1feb15e444fbdc6c`.

The next K6 planning decomposition item is:

```text
K6-R2 — deterministic route-plan ordering / fallback semantics over already-eligible candidates
```

This record is the separate bounded R2 implementation-authorization candidate. It does not treat R1 eligibility as execution authority and does not authorize K6-R3 or later work.

## Decision

After and only after canonical adoption and post-merge proof of this exact record, authorize one pure deterministic R2 implementation slice:

```text
K6 — EVIDENCE ROUTER & OUTCOME LEARNING
K6-R1: CLOSED_CANONICAL FOR ITS BOUNDED ELIGIBILITY SCOPE
K6-R2: PURE CALLER-ORDERED ROUTE-PLAN MATERIALIZATION AUTHORIZED
K6-R2 IMPLEMENTATION: NOT YET CANONICAL
K6-R3+: NOT AUTHORIZED
ROUTE EXECUTION: NOT AUTHORIZED
AUTOMATIC FALLBACK EXECUTION: NOT AUTHORIZED
OUTCOME PERSISTENCE / LEARNING: NOT AUTHORIZED
DONE GATE / PROVEN_READY AUTHORITY: UNCHANGED
K2 SIDE-EFFECT AUTHORITY: UNCHANGED
```

K6-R2 answers exactly one question:

> Given one exact validated K6-R1 route-eligibility result and one caller-materialized explicit ordering of every candidate that R1 marked `ELIGIBLE`, what immutable deterministic primary/fallback route plan corresponds to that caller order?

R2 does not infer the order. It validates and materializes a caller-declared order. R2 does not execute any step.

## Governing invariants

```text
R1 ELIGIBLE != R2 PRIMARY
R2 ORDER != MODEL SCORE
R2 ORDER != LEARNED PREFERENCE
R2 PRIMARY != EXECUTION AUTHORITY
R2 FALLBACK != AUTOMATIC RETRY AUTHORITY
ROUTE PLAN != EXECUTION REQUEST
ROUTE PLAN != EXECUTION RECEIPT
ROUTE PLAN != DONE GATE VERDICT
ROUTE PLAN != PROVEN_READY
CALLER ORDER != KODAC TRUST POLICY
SELF-IMPROVING != SELF-AUTHORIZING
```

K2 remains the sole side-effect execution authority. Done Gate remains the completion authority. R2 is data-only and cannot call either authority path.

## Why v1 uses caller-explicit ordering only

R2 deliberately does not introduce inferred ranking, provider preference, cost scoring, latency scoring, reward models, historical-success weighting, learned routing, or hidden heuristics.

The only v1 ordering basis is:

```text
CALLER_EXPLICIT_ORDER
```

The caller must provide a complete permutation of all and only candidates already marked `ELIGIBLE` by the supplied exact K6-R1 result.

This keeps R2 deterministic and auditable while reserving evidence-backed strategy improvement for later separately authorized K6 work.

## Pure-data boundary

K6-R2 is pure, deterministic, in-memory TypeScript. Every input is caller-materialized.

Production R2 code may not:

- read files or directories;
- access Git or GitHub;
- access environment variables or secrets;
- access network sockets or HTTP clients;
- invoke models, providers, reviewers, evaluators, tools, agents, MCP, or ACP;
- call `ExecutionGateway`;
- spawn processes or shells;
- read clocks or generate randomness;
- persist route requests or plans;
- observe provider failures;
- advance automatically to a fallback;
- mutate caller input;
- load configuration implicitly;
- inspect registries, qualification files, proof files, or receipts directly.

The only Node built-ins authorized in R2 production source are static imports from:

```text
node:crypto
node:util
```

`node:crypto` is limited to SHA-256 identity derivation. `node:util` is limited to `types.isProxy` for fail-closed hostile-input rejection.

R2 may import only the exact K6-R1 contract/validation/canonicalization surface needed to validate the embedded R1 result and reuse its canonical JSON profile. R2 must not duplicate or fork the canonical serializer.

## Contract versions

```text
K6_R2_ROUTE_PLAN_REQUEST_VERSION = "kodac-k6-r2-route-plan-request-v1"
K6_R2_ROUTE_PLAN_VERSION = "kodac-k6-r2-route-plan-v1"
K6_R2_ORDERING_BASIS = "CALLER_EXPLICIT_ORDER"
```

No alias, floating version, or implicit upgrade is accepted.

## Route-plan request

A validated R2 request contains exactly:

```text
version
planRequestIdentity
orderingBasis
eligibilityResult
orderedEligibleCandidateIds[]
```

Rules:

- `orderingBasis` must equal `CALLER_EXPLICIT_ORDER`;
- `eligibilityResult` must pass the canonical K6-R1 route-eligibility-result validator, including exact `resultIdentity` recomputation;
- `orderedEligibleCandidateIds[]` is an ordered sequence, not a set for canonicalization purposes;
- candidate IDs remain bounded by the R1 1..256 UTF-8-byte rule;
- the sequence contains no duplicate ID;
- the sequence must be an exact permutation of every and only `candidateId` whose R1 candidate result has `status === "ELIGIBLE"`;
- an `INELIGIBLE` or unknown ID in the sequence fails closed;
- omission of any `ELIGIBLE` candidate fails closed;
- if the R1 result has zero eligible candidates, and only then, the sequence is exactly empty;
- maximum sequence length is 128 because the pinned R1 result already bounds candidates to 128.

The ordering is caller policy input only. It is not provider qualification, trust evidence, or proof that the first candidate is better.

## Route plan

A validated R2 route plan contains exactly:

```text
version
planIdentity
planRequestIdentity
orderingBasis
eligibilityResultIdentity
requestIdentity
repositoryId
canonicalBase
candidateHead
taskId
status
steps[]
```

The closed plan-status vocabulary is:

```text
ROUTABLE
NO_ELIGIBLE_CANDIDATE
```

Each `steps[]` entry contains exactly:

```text
candidateId
candidateKind
provider
model
role
qualificationReportDigest
```

The closed role vocabulary is:

```text
PRIMARY
FALLBACK
```

### Exact projection rules

For a non-empty eligible ordering:

- `status = ROUTABLE`;
- `steps.length === orderedEligibleCandidateIds.length`;
- step order exactly equals caller `orderedEligibleCandidateIds[]` order;
- `steps[0].role = PRIMARY`;
- every later step role is `FALLBACK`;
- each step copies `candidateId`, `candidateKind`, `provider`, `model`, and `qualificationReportDigest` exactly from the matching R1 `ELIGIBLE` candidate result;
- no `INELIGIBLE` candidate can appear.

For zero eligible candidates:

- the route-plan request has `orderedEligibleCandidateIds = []`;
- the emitted route plan has `status = NO_ELIGIBLE_CANDIDATE`;
- the emitted route plan has `steps = []`;
- the emitted route plan contains no `orderedEligibleCandidateIds` or other request-only fields.

A plan with `ROUTABLE` and zero steps, or `NO_ELIGIBLE_CANDIDATE` with any step, fails closed.

## Fallback semantics

R2 fallback is declarative succession order only.

```text
steps[0] = PRIMARY
steps[1] = first FALLBACK
steps[2] = second FALLBACK
...
```

R2 does not define, observe, or infer a runtime failure trigger. It does not decide whether a failure is retryable. It does not advance the chain. It does not call the next candidate.

Any later execution or fallback advancement requires a separate canonical authorization and must remain behind K2 `ExecutionGateway` and applicable policy/approval/sandbox boundaries.

Thus:

```text
FALLBACK POSITION != FALLBACK EXECUTION
```

## Revision and evidence linkage

The route plan copies these exact values from the validated embedded R1 result:

```text
eligibilityResultIdentity = eligibilityResult.resultIdentity
requestIdentity = eligibilityResult.requestIdentity
repositoryId = eligibilityResult.repositoryId
canonicalBase = eligibilityResult.canonicalBase
candidateHead = eligibilityResult.candidateHead
taskId = eligibilityResult.taskId
```

R2 may not rewrite, reinterpret, or re-resolve them.

R2 does not contact Git and does not prove ancestry, freshness, provider availability, provider health, or artifact existence.

## Structural validation

Malformed input throws deterministic `TypeError` or `RangeError` before a plan identity is emitted.

Structural invalidity includes at least:

- unknown or missing fields;
- unsupported versions/status/role/ordering basis;
- forged or invalid embedded R1 result identity;
- proxies at any nesting depth;
- accessors/getters/setters;
- symbol keys;
- sparse arrays;
- cyclic structures;
- non-plain object prototypes;
- `undefined` values;
- invalid Unicode or NUL-bearing identifiers;
- bound violations;
- duplicate ordered candidate IDs;
- unknown candidate IDs;
- any `INELIGIBLE` candidate in the order;
- omission of any `ELIGIBLE` candidate;
- non-empty order when zero candidates are eligible;
- route-plan status/step projection inconsistent with the request and embedded R1 result;
- a claimed `planRequestIdentity` or `planIdentity` that does not equal deterministic recomputation.

The implementation must preserve R1's hostile-input-before-traversal posture and must not intentionally invoke proxy traps.

## Canonical identities

R2 reuses the exact canonical JSON implementation and normative UTF-16/string/number profile exported by pinned K6-R1. It must not introduce a second serializer.

`planRequestIdentity` is SHA-256 over the complete validated request excluding `planRequestIdentity` itself.

`planIdentity` is SHA-256 over the complete validated plan excluding `planIdentity` itself.

Important ordering rule:

```text
orderedEligibleCandidateIds[] and steps[] are semantically ORDERED arrays.
```

They must never be sorted during canonicalization. Changing only caller order changes both request and plan identities and changes primary/fallback roles.

The embedded R1 result retains its own already-canonical candidate-result ordering and identity.

## Resource bounds

R2 inherits or narrows the R1 structural ceilings:

```text
max canonical depth: 32
max canonical nodes: 50,000
max eligible ordered candidates: 128
max candidateId: 256 UTF-8 bytes
max provider: 256 UTF-8 bytes
max model: 512 UTF-8 bytes
```

No artificial product quota is introduced; these are deterministic safety/resource bounds and R1 compatibility limits.

## JSON Schema contract

The R2 schema must use Draft 2020-12 and reference the pinned R1 `routeEligibilityResult` schema definition rather than copy/fork it.

Core JSON Schema cannot fully express the cross-field exact eligible permutation and route-plan projection. The dedicated R2 workflow must therefore use explicit project validator keywords or an equivalent deterministic custom validation layer for at least:

- exact permutation of R1 `ELIGIBLE` candidate IDs;
- rejection of `INELIGIBLE`/unknown/duplicate/omitted IDs;
- exact step projection and order;
- exact first-primary/rest-fallback roles;
- zero-eligible `NO_ELIGIBLE_CANDIDATE` iff semantics;
- UTF-8 byte limits where JSON Schema `maxLength` is insufficient.

The schema and runtime contract must agree. Hostile fixtures must prove both directions of every cross-field invariant.

## Exact implementation allowlist

After and only after canonical adoption and post-merge proof of this authorization, K6-R2 implementation may change exactly:

```text
.github/workflows/k6-r2-deterministic-route-plan.yml
schema/k6-r2-deterministic-route-plan.schema.json
packages/kodac-runtime/src/evidence-router/route-plan-contracts.ts
packages/kodac-runtime/src/evidence-router/route-plan.ts
packages/kodac-runtime/src/index.ts
packages/kodac-runtime/test/k6-r2-deterministic-route-plan.test.ts
```

No seventh path is authorized.

No new dependency, lockfile, package manifest, provider configuration, provenance policy, ruleset, K2 runtime, KRI runtime, K5 runtime, Done Gate, PR #163, Z0-family, public endpoint, secret, deployment, release, persistence, telemetry, or outcome-learning path is authorized.

## Shared export constraint

`packages/kodac-runtime/src/index.ts` may change only to append the exact two R2 exports:

```text
export * from "./evidence-router/route-plan-contracts.ts"
export * from "./evidence-router/route-plan.ts"
```

No existing export may be removed, renamed, redirected, or reordered for semantic effect.

The dedicated workflow must prove the base-to-candidate shared-index diff is exactly those two appended lines.

## Immutable predecessor drift pins

Before an R2 candidate may qualify, the dedicated workflow must prove these exact predecessor blobs remain unchanged from this authorization baseline:

```text
packages/kodac-runtime/src/evidence-router/contracts.ts
dc29c4ce85340312f28b67604cac01c1d775e370

packages/kodac-runtime/src/evidence-router/eligibility.ts
c6f987626168b76cedffb949b16d878c243a2715

schema/k6-r1-model-provider-route-eligibility.schema.json
336b5477b16f1bba5c4173874d819091cea9495d

packages/kodac-runtime/test/k6-r1-model-provider-route-eligibility.test.ts
974137a513f16c93336d5bcda38c351326c53255

.github/workflows/k6-r1-model-provider-route-eligibility.yml
c26a4de329d0cb0c4b28f07c97a4162642ef7cbb

packages/kodac-runtime/src/execution/gateway.ts
1732dae059fc878c04e6b1bb6a117385efe9ed6a

packages/kodac-runtime/src/verification/done-gate.ts
067e147569fa52cc2b04c5df26fbe20a01e958e9

packages/kodac-runtime/src/verification/types.ts
5c7006e6904f97791378a4a4367d569a6971c6af

packages/kodac-runtime/src/evidence/receipt.ts
214403398751c9d22bf695786c7fd7c6fd7e35e1
```

The shared index is allowlisted and must instead be proven by its exact append-only diff from base blob `7b6f2ddc6347801dc38df4ceb0cd2f0c548dbc71`.

Any predecessor drift requires a separate reconciliation decision before R2 source changes continue.

## Required implementation proofs

A future R2 implementation candidate must prove at least:

1. the diff is exactly the six allowlisted paths;
2. all predecessor pins above match the implementation base;
3. the embedded R1 result is validated by the canonical R1 validator and forged identities fail closed;
4. caller ordering is an exact permutation of every and only R1 `ELIGIBLE` candidate ID;
5. duplicates, omissions, unknown IDs, and ineligible IDs fail closed;
6. zero eligible candidates require an empty order and produce only `NO_ELIGIBLE_CANDIDATE` with zero steps;
7. any non-empty valid order produces `ROUTABLE`;
8. step order exactly preserves caller order;
9. first step is exactly `PRIMARY` and later steps exactly `FALLBACK`;
10. every step is an exact projection of the matching R1 eligible candidate result;
11. reordering caller order changes deterministic identities and primary/fallback roles;
12. identical input produces byte-for-byte identical plan and identities;
13. no scoring, ranking inference, provider weighting, cost/latency heuristic, history, reward, or learning logic exists;
14. no automatic fallback advancement exists;
15. no provider/model/reviewer/evaluator/tool/agent invocation path exists;
16. no filesystem/network/process/secret/Git/GitHub/persistence path exists;
17. R2 never calls `ExecutionGateway` and never emits an execution receipt;
18. R2 cannot emit or imply `PROVEN_READY`;
19. caller objects are never mutated and returned objects are immutable;
20. proxy/accessor/symbol/sparse/cycle/non-plain/invalid-Unicode/resource-bound hostile inputs fail closed;
21. R2 reuses pinned R1 canonical JSON semantics rather than duplicating them;
22. R2 schema references the pinned R1 result definition and executable schema validation enforces cross-field invariants;
23. the shared export diff is exactly the two authorized appended lines;
24. focused R2 tests pass;
25. package strict TypeScript and full runtime tests pass;
26. repository-wide applicable regression checks, Python, Ruff, and provenance validation pass;
27. production-source side-effect/import scanning proves the pure-data boundary;
28. exact candidate head/tree and all six final blob identities are captured;
29. fresh exact-head CodeRabbit and Qodo reviews finish with zero unresolved material findings;
30. zero unresolved actionable review threads remain;
31. merge uses normal merge-commit semantics guarded by the exact expected head SHA; and
32. applicable post-merge governance/shared/runtime checks reach terminal success.

## Required deterministic corpus

The focused corpus must include inert cases for at least:

- one eligible candidate -> one `PRIMARY` step;
- multiple eligible candidates -> caller order preserved with one primary and ordered fallbacks;
- zero eligible candidates -> `NO_ELIGIBLE_CANDIDATE` and empty steps;
- mixed R1 eligible/ineligible candidate results with order containing exactly eligible IDs -> valid;
- duplicate ordered ID -> reject;
- omitted eligible ID -> reject;
- included ineligible ID -> reject;
- unknown ID -> reject;
- forged R1 result identity -> reject;
- forged R2 request identity -> reject;
- forged plan identity -> reject;
- reordered caller order -> distinct request/plan identities and changed roles/order;
- proxy at each R2-specific container layer -> reject;
- accessor/symbol/sparse/cycle/non-plain object inputs -> reject;
- unpaired surrogate/NUL/over-bound candidate ID -> reject;
- canonical depth and node exhaustion -> reject;
- schema/runtime parity for all cross-field conditions;
- no caller mutation and frozen returned structures.

No fixture may contain credentials, live provider requests, executable commands, or real side-effect instructions.

## Explicit non-grants

```text
K6-R3+: NOT AUTHORIZED
MODEL / PROVIDER INVOCATION: NOT AUTHORIZED
REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION: NOT AUTHORIZED
ROUTE EXECUTION: NOT AUTHORIZED
AUTOMATIC FALLBACK / RETRY EXECUTION: NOT AUTHORIZED
FAILURE OBSERVATION / RETRYABILITY CLASSIFICATION: NOT AUTHORIZED
EXECUTIONGATEWAY CALL: NOT AUTHORIZED
NETWORK / SECRET ACCESS: NOT AUTHORIZED
FILESYSTEM / PROCESS / SHELL ACCESS: NOT AUTHORIZED
GIT / GITHUB ACCESS: NOT AUTHORIZED
REPOSITORY WRITE / REVIEW / APPROVAL / MERGE AUTHORITY FROM K6: NOT AUTHORIZED
PERSISTENT ROUTE / OUTCOME STORAGE: NOT AUTHORIZED
TELEMETRY: NOT AUTHORIZED
ONLINE OR OFFLINE LEARNING: NOT AUTHORIZED
COST / LATENCY / REWARD / SUCCESS-RATE SCORING: NOT AUTHORIZED
HIDDEN OR INFERRED PROVIDER RANKING: NOT AUTHORIZED
VECTOR / EMBEDDING INFRASTRUCTURE: NOT AUTHORIZED
CROSS-REPOSITORY LEARNING: NOT AUTHORIZED
AUTOMATIC STRATEGY PROMOTION: NOT AUTHORIZED
DONE GATE MODIFICATION: NOT AUTHORIZED
NEW DEPENDENCIES / DONOR SOURCE: NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH: NOT AUTHORIZED
Z0 / Z0L / ZROK / PUBLIC ENDPOINT / PAYMENT / SECRET / GITHUB APP AUTHORITY: NOT AUTHORIZED
```

## Authorization PR scope

This authorization candidate itself may change exactly one path:

```text
docs/planning/KODAC_K6_R2_DETERMINISTIC_ROUTE_PLAN_AUTHORIZATION_2026-08-26.md
```

It may not change source, tests, schemas, workflows, roadmap/status files, dependencies, lockfiles, manifests, provenance policy, rulesets, protected lanes, provider configuration, K2/K3/K4/K5/KRI runtime, Done Gate, PR #163, Z0-family, secrets, deployment, or release artifacts.

## Canonical adoption gate for this authorization

K6-R2 implementation authority becomes effective only if this exact authorization record is canonically adopted with all of the following proven:

1. PR base ref is exactly `main`;
2. live protected `main` remains exactly `7bc163b9ec0d5d451950542f1feb15e444fbdc6c` with tree `68ed4838497debd9e7969b2a13d893d3d8ed9cff` before merge;
3. the PR diff is exactly the one authorization-document path;
4. all applicable exact-head CI is terminal green;
5. fresh exact-head CodeRabbit and Qodo reviews have zero unresolved material correctness, security, or governance findings;
6. zero unresolved actionable review threads remain;
7. final candidate head/tree/document blob are captured;
8. merge uses normal merge-commit semantics guarded by exact expected head SHA;
9. ordered merge parent 1 equals pre-merge canonical main and parent 2 equals the exact qualified candidate head;
10. merge tree equals the qualified candidate tree and the authorization document blob equals the qualified candidate blob;
11. protected `main` equals the merge commit/tree and introduces exactly the authorized one path; and
12. applicable post-merge governance/shared/runtime checks reach terminal success.

If `main` advances before merge: STOP. Amend this authorization to the replacement canonical base SHA/tree, perform only non-destructive forward reconciliation, and requalify the new exact head from scratch. No rebase, force-push, destructive history rewrite, stale-base exception, or review waiver is permitted.

## Post-canonical stop boundary

Even after this authorization becomes canonical:

```text
AUTHORIZED NEXT UNIT: K6-R2 IMPLEMENTATION ON THE EXACT SIX-PATH ALLOWLIST
K6-R3+: NOT AUTHORIZED
DO NOT EXECUTE ROUTES OR FALLBACKS
DO NOT INVOKE PROVIDERS / MODELS / REVIEWERS / EVALUATORS / TOOLS / AGENTS
DO NOT ADD PERSISTENCE / TELEMETRY / LEARNING
DO NOT MODIFY K2 OR DONE GATE AUTHORITY
```

R2 implementation must stop after its own guarded merge and post-merge proof. The next K6 slice requires a separate canonical authorization.