# Kodac P3-R4 Context Policy Benchmark Provenance Authorization — 2026-08-30

## 1. Status and authority

```text
DOCUMENT_TYPE = FOUNDER-AUTHORIZED AUTHORIZATION-CANDIDATE PREPARATION
EFFECTIVE_IMPLEMENTATION_AUTHORITY_WHILE_NON_CANONICAL = NONE
P3_R1 = CLOSED_CANONICAL
P3_R2 = CLOSED_CANONICAL
P3_R3 = CLOSED_CANONICAL
P3_R3_RECONCILIATION = CLOSED_CANONICAL
P3_R4_IMPLEMENTATION = NOT_AUTHORIZED UNTIL THIS EXACT RECORD IS CANONICAL AND POST-MERGE PROVEN
P3_R5_PLUS = NOT_AUTHORIZED
P4_P8 = NOT_AUTHORIZED
WAIVER = NO
```

This record is deny-by-default. It authorizes no runtime change while it remains non-canonical. It may become effective only after exact-head qualification, guarded normal merge, and post-merge proof.

Repository visibility is public only as an access fact. Public visibility does not establish package publication, public release, benchmark completion, production readiness, or quality/superiority authority.

## 2. Canonical baseline

```text
CANONICAL_MAIN = 0d26a7b7225c4ccc48a52b137ca526684a37d974
CANONICAL_TREE = e3bc89d9b536ee6dc9060a8b68e80eaeac2bb09f
P3_R3_IMPLEMENTATION_MERGE = cd7c28b4f823e9570daf73448c5f3b9b9b540d2e
P3_R3_RECONCILIATION_MERGE = 0d26a7b7225c4ccc48a52b137ca526684a37d974
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Governing records include `AGENTS.md`, `docs/roadmap/NEXT.md`, `docs/adr/ADR-0010-benchmark-first-donor-selection.md`, canonical P2-R1 through P2-R5 records, and canonical P3-R1 through P3-R3 records. Live GitHub and any more-specific canonical authority override this candidate.

## 3. Authorization-candidate scope

This authorization PR may change exactly one path:

```text
docs/planning/KODAC_P3_R4_CONTEXT_POLICY_BENCHMARK_PROVENANCE_AUTHORIZATION_2026-08-30.md
```

No second path is authorized. Runtime source, tests, fixtures, workflows, package manifests, lockfiles, dependencies, providers/models, persistence, telemetry, product/release files, historical evidence, and rulesets are out of scope.

## 4. Bounded purpose

P3-R3 proves only deterministic pairwise seven-metric evidence and comparability state. It intentionally does not establish chronology, contamination, holdout sufficiency, acceptance, significance, winner, default, or promotion semantics.

P3-R4 is therefore limited to a pure deterministic provenance evidence binding that reconnects one trusted P3-R3 evidence record to the exact validated P2-R1 manifest evidence underlying the same validated P2-R2/P2-R4 topology.

Literal predecessor facts only are preserved:

```text
later-in-time != sufficient holdout
none-known != proven uncontaminated
holdout != unbiased
all-required-metrics-comparable != acceptable
favored relation != winner
```

## 5. Conditional future implementation allowlist

Only after this authorization is canonical and post-merge proven may one future P3-R4 implementation PR change exactly:

```text
packages/kodac-runtime/bench/p3-r4/contracts.ts
packages/kodac-runtime/bench/p3-r4/context-policy-provenance.ts
packages/kodac-runtime/test/p3-r4-context-policy-provenance.test.ts
docs/planning/KODAC_P3_R4_CONTEXT_POLICY_BENCHMARK_PROVENANCE_EVIDENCE_2026-08-30.md
```

No fifth path is implied. P2-R1 through P2-R5 and P3-R1 through P3-R3 bytes are read-only.

## 6. Future trust boundary

The future implementation may accept only the complete untrusted predecessor inputs needed to reconstruct:

- the complete P3-R1 request;
- left and right P3-R2 policies;
- left and right P2-R2 reports and P2-R3 summaries;
- P2-R4 shared evaluation context, subjects, and comparison policy;
- the P3-R3 declaration;
- the P2-R1 manifest set plus development and holdout fixtures;
- one exact-key P3-R4 declaration defined in Section 10.

All caller-owned structures needed after validation must first cross the repository's hardened canonical JSON snapshot boundary. Successful validation of one snapshot never authorizes later semantic reads from a mutable caller value.

The implementation must reconstruct trusted predecessor truth through canonical boundaries:

```text
compareP2R4(...)
canonical P3-R3 builder
validateManifestSet(...)
canonicalize(...)
sha256Canonical(...)
```

Caller-claimed serialized P3-R3 output, P2-R4 comparison, P2-R5 relation set, P2-R1 provenance summary, or digest narrative is never derivation truth.

## 7. Exact P2-R1 manifest-set digest reproduction

The future implementation must reproduce the exact canonical P2-R2 predecessor digest, not an implementation-defined deterministic order.

After `validateManifestSet(...)`, validated manifest records MUST be copied and sorted with the exact P2-R2 `orderedManifest(...)` comparator:

```text
1. task_family ascending by canonical repository string comparison
2. case_id ascending by canonical repository string comparison
3. result_identity ascending by canonical repository string comparison
```

The string comparison semantics are the existing P2-R2 `compareStrings(left, right)` semantics: `left < right ? -1 : left > right ? 1 : 0`. No locale-aware comparison, insertion order, filesystem order, case folding, or alternate comparator is authorized.

The required digest is exactly:

```text
sha256Canonical(orderedValidatedManifestRecords)
```

That digest MUST equal `r1_manifest_set_digest` in both validated P2-R2 reports. Any mismatch fails closed.

P3-R4 may duplicate this tiny comparator locally only to reproduce the canonical predecessor digest because the canonical P2-R2 helper is private. It may not modify P2-R2 or broaden the comparator semantics. If a future canonical exported predecessor digest boundary exists before implementation, that exact boundary may be reused instead, but no behavior change is implied.

## 8. Exact report/manifest topology cross-binding

Canonical `compareP2R4(...)` remains required and proves the left/right report relationship. P3-R4 adds the missing independent cross-binding from each validated report case back to the validated P2-R1 manifest definition.

For every `context-selection` P2-R2 report case on each side, the future implementation MUST prove exactly one corresponding validated P2-R1 manifest record with equal:

```text
task_family = context-selection
case_id
result_identity == r1_result_identity
benchmark_id
benchmark_protocol_version
```

No extra or missing `context-selection` case may be ignored.

For each bound case, the complete report metric topology MUST equal the complete metric topology declared by that manifest record, with no additions, omissions, substitutions, duplicate metric IDs, or unit changes.

Manifest-side topology is derived from the complete `metric_definitions` array for the bound record and must first prove every definition has `task_family = context-selection`. It is normalized as the exact sorted sequence:

```text
(metric_id, unit)
```

sorted by `metric_id` using the same canonical repository string comparison, then by `unit` only as a deterministic tie-breaker. Duplicate `metric_id` values are forbidden.

Report-side topology is the complete case `metrics` sequence normalized to the same `(metric_id, unit)` projection and comparator. Duplicate `metric_id` values are forbidden.

The two normalized sequences MUST be element-for-element equal. Measurement status and value do not participate in topology equality, but no metric slot may exist unless declared by the bound manifest record.

This topology requirement applies independently to both validated P2-R2 reports even when `compareP2R4(...)` has already proven the two reports mutually agree. Self-consistency between reports is not sufficient evidence of consistency with P2-R1 declarations.

The trusted P2-R4 comparison's `left_r2_report_identity` and `right_r2_report_identity` MUST equal the identities of the two validated canonical report snapshots.

## 9. Other mandatory cross-bindings

The future implementation must additionally prove:

1. benchmark ID and benchmark protocol version equal the trusted P3-R3 evidence values;
2. task family is exactly `context-selection`;
3. the supplied P3-R3 declaration reconstructs the trusted P3-R3 evidence used by this record;
4. declaration `qualificationId` equals trusted P3-R3 evidence `qualificationId`;
5. declaration `p3R3EvidenceIdentity` equals trusted P3-R3 evidence `evidenceIdentity`;
6. declaration report identities equal the validated report identities and trusted P2-R4 comparison report identities;
7. declaration `r1ManifestSetDigest` equals the exact reproduced digest from Section 7 and both validated P2-R2 report digests;
8. declaration benchmark/protocol/task-family values equal all trusted predecessor values;
9. every context-selection case is bound exactly once and case ordering is deterministic and identity-bearing;
10. duplicate, stale, cross-bound, malformed, or identity-mismatched evidence fails closed.

No provenance fact may be inferred from subject labels, policy names, metric direction, repository paths, timestamps, or caller narrative.

## 10. Exact-key P3-R4 declaration contract

The future P3-R4 declaration is one plain exact-key object with exactly these keys and no others:

```text
version
kind
qualificationId
p3R3EvidenceIdentity
benchmarkId
benchmarkProtocolVersion
leftR2ReportIdentity
rightR2ReportIdentity
r1ManifestSetDigest
taskFamily
```

Exact constants:

```text
version = p3-r4-context-policy-benchmark-provenance-declaration-v1
kind = build_context_policy_benchmark_provenance_evidence
taskFamily = context-selection
```

Field grammars:

```text
qualificationId = non-empty canonical string, trimmed, exact equality to trusted P3-R3 qualificationId
p3R3EvidenceIdentity = ^sha256:[0-9a-f]{64}$
benchmarkId = non-empty canonical string, trimmed
benchmarkProtocolVersion = non-empty canonical string, trimmed
leftR2ReportIdentity = ^sha256:[0-9a-f]{64}$
rightR2ReportIdentity = ^sha256:[0-9a-f]{64}$
r1ManifestSetDigest = ^sha256:[0-9a-f]{64}$
taskFamily = literal context-selection
```

Unknown fields, missing fields, alternate constants, malformed identities, and cross-binding mismatch fail closed.

## 11. Exact case provenance schema

Each output `caseProvenance` element is one exact-key plain object with exactly these keys:

```text
caseId
r1ResultIdentity
corpusRole
corpusId
corpusDigest
holdoutId
holdoutDigest
chronologyScheme
developmentFreezeAnchor
holdoutChronologyAnchor
chronologyStatus
contaminationStatus
sourceProvenance
```

Nested exact-key schemas are:

```text
developmentFreezeAnchor = { scheme, ordinal }
holdoutChronologyAnchor = { scheme, ordinal }
sourceProvenance = { kind, path }
```

Nested field semantics and grammars MUST be the already-validated P2-R1 values. No arbitrary metadata, strategy/provider/model/evaluator/environment fields, extension object, or undeclared scalar is authorized.

`caseProvenance` MUST be sorted by `caseId` using canonical repository string comparison, then `r1ResultIdentity` as a deterministic tie-breaker. Duplicate case IDs are forbidden.

## 12. Exact future output contract

The P3-R4 output is one deeply immutable exact-key plain object with exactly these keys and no others:

```text
version
kind
provenanceEvidenceIdentity
qualificationId
p3R3ImplementationMerge
p3R3EvidenceIdentity
benchmarkId
benchmarkProtocolVersion
leftR2ReportIdentity
rightR2ReportIdentity
r1ManifestSetDigest
taskFamily
caseProvenance
```

Exact constants:

```text
version = p3-r4-context-policy-benchmark-provenance-v1
kind = context_policy_benchmark_provenance_evidence
p3R3ImplementationMerge = cd7c28b4f823e9570daf73448c5f3b9b9b540d2e
taskFamily = context-selection
```

All non-constant scalar fields are copied only from already cross-bound trusted values defined above. `caseProvenance` uses the exact schema and order from Section 11.

The output contains no arbitrary metadata bag, extension field, score, verdict, recommendation, threshold, significance, ranking, winner, default, promotion, release, or product decision field.

## 13. Identity and immutability

`provenanceEvidenceIdentity` is exactly `sha256Canonical(...)` over the normalized exact output projection from Section 12 excluding only `provenanceEvidenceIdentity` itself.

Identity grammar:

```text
^sha256:[0-9a-f]{64}$
```

Every evidence-bearing field participates in identity, including ordered case provenance, qualification ID, predecessor identities, benchmark/protocol, manifest-set digest, task family, and fixed P3-R3 implementation merge.

No timestamp, locale, random value, hostname, workspace path, GitHub API state, provider state, network state, or other external mutable state may contribute.

Returned output and every nested object/array must be detached from caller-owned mutable values and deeply frozen.

## 14. Hostile-input requirements

P3-R4 remains fail-closed and must preserve existing hardened repository semantics. P3-R4-owned structures must reject at minimum:

- Proxy values;
- getters/setters/accessors;
- symbol keys;
- non-enumerable semantic fields;
- non-plain object prototypes where plain JSON is required;
- sparse or extended arrays;
- cycles;
- undefined, functions, symbols, bigint, and non-finite numbers;
- unknown or missing fields;
- unsupported versions or kinds;
- malformed strings and identities;
- duplicate cases or metrics;
- missing or extra case/metric bindings;
- manifest-set digest mismatch;
- report identity mismatch;
- benchmark/protocol/task-family mismatch;
- P3-R3 evidence mismatch;
- caller mutation capable of changing returned output.

## 15. Explicit non-grants

P3-R4 does not authorize or establish:

```text
PASS / FAIL / ACCEPT / REJECT
POLICY WINNER / LOSER
BETTER / WORSE / SUPERIOR / INFERIOR
REPOSITORY-OWNED DEFAULT POLICY
STRATEGY PROMOTION
RANKING / LEADERBOARD / TOP-K
FAVORED-METRIC COUNT / MAJORITY
WEIGHTED / BLENDED / UNIVERSAL SCORE
CROSS-METRIC NORMALIZATION
THRESHOLD / TARGET / TOLERANCE / EPSILON
STATISTICAL SIGNIFICANCE
CONFIDENCE INTERVAL / BOOTSTRAP / HYPOTHESIS TEST / P-VALUE
HOLDOUT SUFFICIENCY DECISION
CONTAMINATION-FREE CLAIM
CHRONOLOGY SUFFICIENCY DECISION
REAL BENCHMARK EXECUTION OR CORPUS MUTATION
BENCHMARK COMPLETION
DONOR REPLACEMENT
PROVIDER / MODEL / REVIEWER / EVALUATOR EXECUTION
NETWORK / SECRETS / SUBPROCESS EXPANSION
NEW DEPENDENCIES
PERSISTENCE / DATABASE / TELEMETRY / LEARNING
CLI / API / PRODUCT INTEGRATION
RELEASE / PACKAGE PUBLICATION / PUBLIC QUALITY CLAIM
P3-R5+
P4-P8
K2 / K5 / DONE-GATE / PROVEN_READY EXPANSION
RULESET CHANGE / BYPASS
AUTOFIX
```

ADR-0010 benchmark discipline remains a future decision gate; this provenance binding does not satisfy a benchmark-backed selection or superiority claim by itself.

## 16. Required future tests

The future four-path implementation must include deterministic tests proving at minimum:

1. valid exact-key declaration and exact output keys;
2. unknown and missing declaration fields fail closed;
3. unknown or extra output construction is impossible by contract;
4. exact P2-R2 manifest ordering/digest reproduction matches canonical P2-R2 behavior for multi-task-family manifests;
5. alternate deterministic manifest orders are rejected when their digest differs;
6. both reports' complete context-selection metric ID/unit topology exactly equals bound manifest definitions;
7. added, removed, duplicated, or unit-changed report metrics fail closed even when left/right reports are mutually self-consistent;
8. extra or missing context-selection cases fail closed;
9. report identity, manifest digest, benchmark, protocol, task family, qualification, and P3-R3 evidence cross-binding mismatches fail closed;
10. literal chronology/contamination/holdout values are preserved without semantic promotion;
11. case ordering is stable across caller insertion order;
12. identity is deterministic and changes when any evidence-bearing field changes;
13. hostile proxies/accessors/symbols/sparse arrays/non-plain structures/cycles fail closed;
14. successful predecessor validation cannot be followed by a semantic read from a mutated caller value;
15. result and nested values are detached and deeply frozen;
16. no forbidden decision vocabulary or derived score exists in the output.

No test may execute a real benchmark, provider/model, network service, billing path, or corpus mutation.

## 17. Qualification and merge gate for this authorization candidate

This candidate may merge only when one frozen exact head proves all of:

```text
base = current canonical main
behind_by = 0
changed_paths = exactly the one authorization document
head/tree/blob = exact and current
Governance required contexts = SUCCESS
K2 classifier = SUCCESS
k2-runtime-gate = SUCCESS
runtime matrix = honestly classified by path applicability; docs-only skip is not green
external substantive semantic channels = at least 2 distinct independently operated terminal-clean exact-head channels
material findings = 0
unresolved actionable review threads = 0
PR = open / non-draft / mergeable
ruleset 20707483 = active / no bypass
WAIVER = NO
```

Any head movement invalidates all previous exact-head machine and semantic evidence. Requalification starts from scratch.

A material reviewer finding must be repaired forward-only within this exact one-document scope. No waiver, stale review reuse, billing purchase, or service-error substitution is permitted.

Merge, if eligible, must be a normal history-preserving merge guarded with the exact expected head SHA. No squash, rebase, force-push, bypass, or auto-merge substitution.

## 18. Mandatory post-merge proof

Before P3-R4 implementation becomes authorized, prove:

- canonical `main` equals the merge commit;
- ordered parents are pre-merge canonical main then exact qualified authorization head;
- merge tree equals the qualified tree;
- this authorization document blob equals the qualified blob;
- GitHub commit signature is verified/valid;
- PR is merged/closed;
- applicable post-merge Governance succeeds;
- K2 push-path applicability is recorded honestly if docs-only produces no push run;
- ruleset `20707483` remains active with no bypass.

Only then may status become:

```text
P3_R4_IMPLEMENTATION = AUTHORIZED
P3_R4_IMPLEMENTATION = NOT_YET_CLOSED_CANONICAL
```

## 19. Boundary after authorization adoption

After canonical adoption, implementation may proceed only on the four-path allowlist in Section 5. It must receive full runtime-sensitive exact-head qualification, including Governance, K2 classifier, applicable Ubuntu/Windows/macOS Typecheck/Test/Patch-hook jobs, stable `k2-runtime-gate`, at least two independent substantive exact-head semantic channels, zero unresolved material findings/threads, guarded normal merge, and full post-merge proof.

After P3-R4 implementation closes canonically, a separate roadmap/status reconciliation is required before any P3-R5 candidate work.

P3-R5+, benchmark execution, statistics, winner/default/promotion, provider/model execution, dependencies, persistence, product/release, and ruleset changes remain not authorized.

`WAIVER=NO`.
