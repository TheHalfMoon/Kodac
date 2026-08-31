# KODAC P3-R4 Context Policy Benchmark Provenance Evidence — 2026-08-30

Status: `IMPLEMENTATION_CANDIDATE / FINAL_EXACT_HEAD_QUALIFICATION_REQUIRED`

`WAIVER=NO`

## 1. Authority

This record is governed by the canonical authorization:

`docs/planning/KODAC_P3_R4_CONTEXT_POLICY_BENCHMARK_PROVENANCE_AUTHORIZATION_2026-08-30.md`

Canonical authorization merge:

`954455a3dce6e1d0663501504265abd4194addce`

Canonical authorization blob:

`d7827c154182b037f91f1addb8ca44f1798e02aa`

Implementation base:

`954455a3dce6e1d0663501504265abd4194addce`

The implementation is limited to the exact four-path allowlist authorized by Section 15. No fifth path is authorized or implied.

## 2. Candidate mechanism

The candidate implements one pure deterministic local in-memory P3-R4 context-policy benchmark-provenance evidence-binding mechanism.

The mechanism:

- snapshots untrusted public inputs through the repository canonical JSON boundary before semantic reuse;
- reconstructs the trusted P2-R4 comparison with canonical `compareP2R4(...)`;
- reconstructs trusted P3-R3 pairwise metric evidence with canonical `buildContextPolicyPairwiseMetricEvidence(...)` rather than trusting caller-claimed serialized P3-R3 evidence;
- validates P2-R1 manifest/development/holdout evidence with canonical `validateManifestSet(...)`;
- derives the P2-R2-compatible manifest-set digest using the exact lexical comparator `task_family`, then `case_id`, then `result_identity`;
- binds both P2-R2 report identities and the shared R1 manifest-set digest;
- binds each relevant `context-selection` report case to exactly one validated P2-R1 manifest record by `case_id` and `r1_result_identity`;
- independently binds complete report metric topology and units to P2-R1 `metric_definitions`;
- copies corpus role, chronology, contamination, anchors, and repository-authored synthetic source provenance literally without reinterpretation;
- derives a self-reference-free deterministic `provenanceEvidenceIdentity` over the exact normalized output projection;
- returns detached deeply frozen evidence; and
- exposes no execution, provider, model, network, filesystem mutation, persistence, telemetry, promotion, default-selection, winner, threshold, significance, or public-quality authority.

## 3. Authorized implementation blobs before this evidence-file commit

The code/test-qualified predecessor head immediately before adding this evidence path was:

`beb4d48870b63eb33631854ac75b67a7d07c0d66`

Its authorized implementation blobs were:

```text
packages/kodac-runtime/bench/p3-r4/contracts.ts
90965256d7f8aeeef5f88698c6fe2d2c53433b85

packages/kodac-runtime/bench/p3-r4/context-policy-provenance.ts
2ab4d6ac0c538da4678e1119f599b8dbfde07d8d

packages/kodac-runtime/test/p3-r4-context-policy-provenance.test.ts
52621ace5e3c880d443ec9169035f70ac29c2ba1
```

The final fourth blob, exact final head, and exact final tree cannot be embedded recursively in this file. They MUST be captured externally in the PR qualification evidence after this file is committed, and all final-head CI/review evidence MUST use that same exact final head.

## 4. Predecessor-byte preservation

The candidate branch is based on the exact canonical authorization merge and changes only the P3-R4 allowlisted paths. No P2-R1/P2-R2/P2-R3/P2-R4/P2-R5 or P3-R1/P3-R2/P3-R3 path is modified.

Therefore the final four-path diff against the canonical base is the controlling proof that all canonical predecessor blobs remain byte-identical. Final qualification MUST re-confirm the exact changed-file set before merge.

Direct canonical predecessor surfaces used read-only by the production mechanism are limited to:

```text
../p2-r1/contract.ts
../p2-r2/runner.ts
../p2-r4/comparison.ts
../p3-r3/context-policy-evidence.ts
```

No predecessor mutation is authorized.

## 5. Focused proof obligations

The focused test suite at:

`packages/kodac-runtime/test/p3-r4-context-policy-provenance.test.ts`

covers the Section 16 obligations, including:

- hardening of all sixteen public untrusted inputs before semantic reuse;
- canonical P2-R4 and P3-R3 reconstruction;
- canonical P2-R1 manifest-set validation;
- malformed P2/P3 and P2-R1 predecessor rejection;
- exact P2-R2 manifest comparator and permutation invariance;
- proof that a different deterministic multi-family ordering yields a different digest;
- shared R1 manifest-set digest binding across both reports;
- exact left/right report identity binding;
- relevant case membership, missing/extra/duplicate case rejection;
- left and right extra/missing/unit/duplicate metric topology rejection;
- report-to-report metric agreement being insufficient without manifest-topology agreement;
- benchmark ID, benchmark protocol, and task-family mismatch rejection;
- exact three-key declaration shape, constants, stable-ID grammar and UTF-8 bound;
- exact thirteen-key output and thirteen-key case-provenance shape;
- exact two-key anchor and source-provenance shapes;
- deterministic case ordering by `caseId` then `r1ResultIdentity`;
- literal development/holdout, chronology, and contamination semantics;
- explicit non-upgrade of `none-known`, `later-in-time`, and P3-R3 comparability;
- absence of winner/default/promotion/score/threshold/significance/verdict fields;
- object insertion-order neutrality with semantic case-array order remaining identity-bearing;
- deterministic self-reference-free output identity;
- hostile Proxy/accessor/symbol/non-enumerable/non-plain/sparse/extended/non-JSON declaration rejection;
- detached deeply frozen output;
- absence of ambient repository/filesystem/network/provider/model/subprocess/persistence/telemetry surfaces; and
- canonical runtime typecheck/test/patch-hook participation.

## 6. Code/test qualification before evidence-file commit

Exact pre-evidence head:

`beb4d48870b63eb33631854ac75b67a7d07c0d66`

Governance run:

`33354574961`

Results:

```text
provenance        99374157001  SUCCESS
legacy-tests      99374157165  SUCCESS
```

K2 runtime-sensitive run:

`33354574993`

Results:

```text
runtime-change-classifier  99374156998  SUCCESS
runtime (ubuntu-latest)    99374171822  SUCCESS
runtime (macos-latest)     99374171864  SUCCESS
runtime (windows-latest)   99374171878  SUCCESS
k2-runtime-gate            99374348844  SUCCESS
```

Each applicable runtime matrix job completed Typecheck, Test, and Patch benchmark hook successfully.

These results prove the code/test state immediately before this evidence-file commit. They are intentionally **STALE_FOR_FINAL_MERGE_QUALIFICATION** after the evidence-file commit moves the PR head. The final exact head MUST be requalified from scratch.

## 7. Forward-only repair history and evidence invalidation

All repairs were forward-only inside the authorized P3-R4 paths. No force push, rebase, destructive rewrite, workflow mutation, predecessor mutation, or waiver was used.

Relevant repair sequence:

```text
1e092290cbdbc15abd1d9db8593f8c13be7bad6b  initial focused tests
570f4b4787eb5af59a7c676a5c2ac7d4667104f9  repair readonly/typecheck test defect
4140b33c130517bf0af58b8b08344056b696ae64  clone mutable negative fixtures
cfe7ffc58dd90d00adf5701470fe6d214492c021  keep topology fixture internally self-consistent
a839442d4a22ca13a2b53802b1a70290a2f72509  expand Section 16 proof coverage
84af9842249e1f11b86a61fe9102ef8082f35da8  repair expanded-proof TypeScript diagnostics
beb4d48870b63eb33631854ac75b67a7d07c0d66  exercise the actual P3-R4 boundary in expanded negatives
```

Every head movement invalidated prior exact-head machine/review evidence. No stale PASS is reused as final qualification proof.

## 8. Final exact-head qualification contract

After this evidence file is committed, the resulting final candidate head MUST remain frozen and prove all of the following before merge:

```text
BASE = 954455a3dce6e1d0663501504265abd4194addce
BEHIND_BY = 0
CHANGED_PATHS = exactly the four authorized P3-R4 paths
P2/P3 PREDECESSOR BLOBS = unchanged
GOVERNANCE = SUCCESS
K2 runtime-sensitive classifier = SUCCESS
Ubuntu runtime matrix = SUCCESS
Windows runtime matrix = SUCCESS
macOS runtime matrix = SUCCESS
k2-runtime-gate = SUCCESS
EXTERNAL_SEMANTIC_REVIEW_COUNT >= 2
EXTERNAL_SEMANTIC_REVIEW_CHANNELS_DISTINCT = YES
UNRESOLVED_ACTIONABLE_THREADS = 0
EXACT_HEAD / TREE / FOUR BLOBS = CAPTURED
RULESET 20707483 = active
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
WAIVER = NO
```

The exact final head/tree/four blobs, final exact-head CI run/job IDs, exact-head semantic-review quorum, review-thread state, and ruleset snapshot are PR/GitHub evidence and MUST be captured only after this file establishes the final fourth path.

## 9. Non-grants

This candidate does not authorize or claim:

```text
policy winner / loser
better / worse / superior / inferior
repository-owned default policy
strategy promotion / accept / reject
ranking / leaderboard / top-k
favored-metric majority
weighted / blended / universal score
cross-metric normalization
threshold / target / tolerance / epsilon
statistical significance
confidence intervals / bootstrap / hypothesis tests / p-values
holdout sufficiency
contamination-free status
chronology sufficiency
real benchmark execution
provider / model / reviewer / evaluator / agent invocation
network / secret / subprocess / shell / sandbox authority
filesystem result persistence
telemetry / analytics / upload / learning
new dependencies or donor intake
routing / fallback / retry decisions
CLI / API / product / agent-loop integration
package publication or public release
public quality or superiority claims
K2 execution-authority expansion
K5 / Done Gate / PROVEN_READY authority changes
P2-R6+
P3-R5+
P4-P8
```

`P3-R4 provenance evidence != policy acceptance or promotion.`

`P3-R4 CLOSED != P3-R5+ AUTHORIZED.`

`WAIVER=NO`
