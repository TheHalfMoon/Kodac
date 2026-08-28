# Kodac K6 Bounded Closeout Authorization

## Record identity

- Date: 2026-08-28
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-28`
- Authority class: DOCUMENTATION / ENGINEERING MILESTONE CLOSEOUT AUTHORIZATION CANDIDATE
- Canonical base commit: `74868b75d0e531fdff8255e3827c4ecbce7dc4ac`
- Canonical base tree: `610b245340fb3175d23d0a977b5abfc5f6c63d68`
- K6-R5 roadmap reconciliation: PR #234 / `74868b75d0e531fdff8255e3827c4ecbce7dc4ac`
- Protected-main ruleset: `20707483` (`Kodac canonical main protection v1`)
- Review-quorum policy: `docs/planning/KODAC_REVIEW_PROVIDER_NEUTRALITY_AND_EVIDENCE_QUORUM_AMENDMENT_2026-08-27.md`
- Governing K6 definition: `docs/planning/KODAC_K6_DEFINITION_AND_PLANNING_AUTHORIZATION_2026-08-26.md`
- Governing improvement plan: `docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md`
- Governing constitution: `docs/adr/ADR-0001-kodac-product-constitution-done-means-proven.md`
- Canonical event/evidence direction: `docs/adr/ADR-0005-canonical-session-event-tool-protocol.md`
- Mandatory side-effect boundary: `docs/adr/ADR-0006-mandatory-trust-hook-side-effects.md`
- `WAIVER=NO`

## Decision

Authorize only a later **documentation/evidence-only bounded K6 closeout candidate** after this exact authorization record is itself canonically adopted and post-merge proven.

This record does **not** close K6.

```text
K6-R1 = CLOSED_CANONICAL
K6-R2 = CLOSED_CANONICAL
K6-R3 = CLOSED_CANONICAL
K6-R4 = CLOSED_CANONICAL
K6-R5 = CLOSED_CANONICAL
K6 BOUNDED CLOSEOUT = AUTHORIZATION CANDIDATE ONLY / NOT YET CANONICAL
K6 = NOT YET CLOSED BY THIS RECORD
K6-R6+ = NOT REQUIRED FOR THIS BOUNDED CLOSEOUT / NOT AUTHORIZED
P2 KODACBENCH = NOT AUTHORIZED
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 PROOF AUTHORITY = UNCHANGED
DONE GATE / PROVEN_READY AUTHORITY = UNCHANGED
```

After and only after this exact record is canonically merged and its required post-merge proof succeeds, one later bounded closeout candidate may reconcile the already-canonical K6-R1 through K6-R5 ledger and conditionally claim K6 closure for that exact bounded surface.

No runtime, source, schema, workflow, dependency, provider, model, reviewer, evaluator, persistence, telemetry, training, learning, promotion, trust-policy, release, or ruleset authority is granted here.

## Why a separate K6 closeout gate is required

The canonical K6 definition deliberately ends its implementation decomposition at R5 and names:

```text
K6 CLOSEOUT — separate evidence and closeout gate
```

The canonical improvement plan preserves the ordered dependency:

```text
K6-R4
-> K6-R5
-> K6 bounded closeout
-> P2 KodacBench
```

The canonical PR #234 roadmap reconciliation records R1 through R5 as separately `CLOSED_CANONICAL` while explicitly keeping both K6 bounded closeout and P2 KodacBench unauthorized.

Therefore:

```text
R1-R5 CLOSED_CANONICAL != K6 CLOSED
K6 CLOSED != PUBLIC RELEASE
K6 CLOSED != GENERAL KODACBENCH COMPLETE
K6 CLOSED != DONE GATE AUTHORITY EXPANSION
```

No K6-R6 contract is invented merely to create another implementation slice. Closure is an evidence question over the already-canonical R1-R5 bounded surface.

## Canonical K6 ledger that the later closeout must bind

The later closeout evidence must independently re-read GitHub and bind the exact canonical identities. At authorization time, the canonical chain is:

### K6 definition, R1, R2, and R3

```text
K6 definition / planning authorization
  PR #202 / merge 2f167794a375bc913c377746419acf3bcc5ee0ab

K6-R1 implementation authorization
  PR #203 / merge c1ae8202b3abfe9445d86ff687a8d36931372c2f
K6-R1 implementation
  PR #204 / merge 7bc163b9ec0d5d451950542f1feb15e444fbdc6c

K6-R2 implementation authorization
  PR #205 / merge ed7f3a022ccdf6e7c93ba3278e354ded3e9245bc
K6-R2 implementation
  PR #206 / merge 90c00cfc01cb874c08b4f7bde1469ccb298b5648

K6-R3 implementation authorization
  PR #207 / merge 13348e3efa1cfa5a71eda692e1f1ea428882c763
K6-R3 implementation
  PR #208 / merge 4ed9bed6fdb23643c722298adfba4ae8e72097b2

Improvement-plan adoption
  PR #209 / merge 3650b81ea926a066fcc7029b5b1e2f186d2ed616
R1-R3 / P0 roadmap reconciliation
  PR #210 / merge 84c6a97a02d6e0478a6dbe681e24349cf79df9e7
```

### K6-R4 authority, trusted qualification, repair, implementation, and reconciliation

R4 required an explicit hardening lifecycle rather than a clean first-attempt narrative:

```text
R4 authorization root
  PR #211 / merge 1e8c193ca0aeeb77b56ad1c75d9d7db0ca82b372
R4 trusted-qualification hardening authorization
  PR #213 / merge 34aa910bb72856ee138e64e47354d8d93072052d
R4 trusted inspector bootstrap
  PR #214 / merge 47a2ac5e53d68c3fe6427fc1bb0e42195e09f365
R4 trusted-inspector post-merge repair authorization
  PR #215 / merge bd0394edd5b79d6185795f0eaed3f7064bc05249
R4 trusted-inspector registration repair
  PR #216 / merge 2450101ab94beb98ce9a857510feec2d5ba8489b
R4 protected-base binding repair authorization
  PR #217 / merge 5440c32f06148f5ec7f3d2880321323176546546
R4 protected-base binding repair
  PR #218 / merge 87f9a3dbe9d15d0b1573b50fe74487ca83562ba2
Review-provider-neutrality amendment
  PR #220 / merge ab737bb95459f2c68069009e686b2f3805f3e6d3
R4 trusted-qualification replacement authorization
  PR #219 / merge b09ad8498759c93807c853e5f24bd401f3a66da2
R4 final authorization amendment / array-key budget repair
  PR #221 / merge 93c197cb6f88409dd406694fe4614ecf0fb6ba00
R4 implementation
  PR #212 / merge 7af698feae73f46df06bf6084a7d0d0317d5560a
R4 roadmap reconciliation
  PR #222 / merge 1db9fef23df0961d76b1fdd1b0e558fba180cad8
```

The PR numbering is not the canonical ordering rule. The later closeout record must bind the actual canonical merge ancestry and the exact authorization dependencies above.

### K6-R5 authority, trusted qualification, repair, implementation, and reconciliation

```text
Superseded R5 draft with comparability defect
  PR #223 / CLOSED UNMERGED / NON-AUTHORITY

Corrected R5 implementation authorization
  PR #224 / merge 31f5f9f3e05dd0feeda2b96b3221374c4bfe0032
R5 trusted Stage A
  PR #225 / merge 76f8639a329d9f168fea9d71f78711d612075619
R5 ruleset-observability repair authorization
  PR #227 / merge 06f2dc2df5eb432107313932a16079edc4912a38
R5 trusted ruleset-observability repair
  PR #228 / merge 0c151b3db8ab1487c5fcf1553060b4743ede155d
R5 split-proof pin amendment authorization
  PR #232 / merge 2d4393fd08329507385fe06d90c3ddedff77bad9
R5 Unit B trusted-workflow repair
  PR #233 / merge 99aa00db6265b33ebffb2a7653e23a8db4b70c31
R5 Stage B implementation
  PR #226 / merge 91d817741d1c55195d26ef8e8f5be98e04d1977d
R5 roadmap reconciliation
  PR #234 / merge 74868b75d0e531fdff8255e3827c4ecbce7dc4ac
```

PRs #229, #230, and #231 were temporary scratch-validation drafts over an R5 trusted-workflow candidate. They were closed unmerged and are **not canonical authority**. The closeout evidence must not promote them into the authority chain, but it should disclose them as non-canonical validation history rather than silently implying they never existed.

## Material repair and anomaly history that must remain visible

The later closeout record must not rewrite K6 as a clean first-attempt sequence. At minimum it must preserve these material facts and independently verify their final dispositions.

### R1 canonicalization repair

The initial R1 authorization candidate had a material deterministic-identity specification gap: equivalent inputs could receive different canonical identities because escaping and ordering rules were incomplete. The final authorization fixed this forward by pinning exact UTF-16 ordering, JSON escaping, integer serialization, object/property order, set order, Unicode behavior, and canonical preimage/SHA-256 vectors. Earlier exact-head evidence was invalidated rather than reused.

### R3 qualification repairs

R3 qualification required forward fixes including the canonical `canonicalK6R1Json` import surface, ruleset-attestation semantics compatible with least-privilege visibility, and strongly typed caller-materialized K5-R4 fixtures. Historical branch/base-pinned workflows that intentionally failed outside their own scope were not relabeled as green.

### R4 trusted-machine and hostile-input repairs

R4 implementation was paused when review found that a candidate-owned workflow could not independently prove itself. The repository introduced a base-controlled trusted `pull_request_target` inspector and then had to repair the trusted proof lifecycle itself:

- PR #214 merged structurally but its required post-merge workflow registration proof failed before job creation because Python continuation lines escaped the YAML `run: |` block;
- the registration repair then exposed that a long-lived pull request's historical `base.sha` snapshot could not be equated with current protected main;
- the trusted inspector was repaired to bind the protected workflow revision correctly while preserving live-main equality;
- reviewer-vendor names were replaced by the canonical provider-neutral evidence quorum without reducing the historical two-review cardinality;
- a later exact-head semantic review found an R4 hostile-array own-property-name resource-budget defect, producing the final authorization amendment before PR #212 could qualify and merge.

No R4 finding above was silently waived.

### R5 comparability, observability, trust-pin, and hostile-input repairs

R5 likewise had material fix-forward history:

- PR #223 was closed unmerged after self-review found that incumbent and candidate totals could be compared across different qualification/trial populations;
- corrected PR #224 requires exact equality of scope, corpus, trial-set identity, ordered trial identities, and trial count before comparison;
- a later review required the fixed corpus digest derivation to state the exact canonical hash input rather than only printing the digest;
- Stage A trusted-workflow review found multiple self-attestation and expression-expansion hazards, all fixed before canonical adoption;
- Stage B then exposed a least-privilege ruleset-observability defect: Actions could not prove owner-only bypass fields, so PRs #227/#228 established split proof rather than fabricating visibility or widening permissions;
- a later Stage B split-proof fingerprint blocker required PRs #232/#233 and a new exact protected proof-body pin;
- PR #226's final Stage B qualification fixed a material hostile-input text/property-name resource bound and strengthened import/dependency closure proof before final qualification;
- provider outage/rate-limit/billing/start failures were not counted as semantic-review evidence under the provider-neutral quorum;
- PRs #229-#231 remained closed unmerged scratch validation only.

The closeout must record final successful evidence **and** the repaired failures that motivated it.

## Bounded K6 exit-evidence matrix

The later closeout record must prove the following bounded meanings rather than infer a stronger composed system.

| Slice | Canonical bounded result | Must remain explicitly outside the slice |
| --- | --- | --- |
| K6-R1 | Pure deterministic eligibility over caller-materialized model/provider candidate evidence and exact constraints | winner selection, ranking/scoring, invocation, routing execution, persistence, learning |
| K6-R2 | Pure deterministic caller-explicit route-plan materialization over already-eligible candidates | route/fallback execution, failure observation, automatic advancement, hidden scoring, learning |
| K6-R3 | Pure deterministic caller-materialized linkage between route-plan facts and verification/K5/Done-Gate outcome evidence | execution, retries, Done-Gate evaluation, K5 mutation, persistence, telemetry, learning |
| K6-R4 | Privacy-governed bounded caller-managed in-process outcome-memory lifecycle with minimized identities | durable filesystem/database persistence, upload, telemetry, cross-repository aggregation/learning, strategy promotion |
| K6-R5 | Pure deterministic immutable strategy proposal/comparison against one exact R5-specific bounded qualification corpus/trial set | strategy execution, eligibility grant, evidence collection, automatic promotion, general benchmark claims, training |

The closeout must prove that composing R1 through R5 does not convert data or evidence into authority.

```text
ELIGIBILITY EVIDENCE != EXECUTION AUTHORITY
ROUTE PLAN != ROUTE EXECUTION
OUTCOME LINKAGE != DONE GATE EVALUATION
OUTCOME MEMORY != DURABLE PERSISTENCE AUTHORITY
STRATEGY COMPARISON != PROMOTION
R5 DOMINANCE RESULT != PROVEN_READY
R5 BOUNDED QUALIFICATION CORPUS != GENERAL KODACBENCH
SELF-IMPROVING != SELF-AUTHORIZING
```

## Exact future closeout-candidate allowlist

After and only after this authorization record becomes canonical and completes its own post-merge proof, one later K6 closeout candidate may change exactly these six documentation paths:

1. `docs/planning/KODAC_K6_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`
2. `docs/product/STATUS.md`
3. `docs/roadmap/MILESTONES.md`
4. `docs/roadmap/ROADMAP.md`
5. `docs/roadmap/VERSION_PLAN.md`
6. `docs/roadmap/NEXT.md`

No seventh path is authorized by this record.

The inclusion of `docs/product/STATUS.md` is limited to reconciling its existing Kodac authority/status notice with the already-canonical K6 ledger and the conditional closeout state. It does not re-adopt or reconstitute the preserved Kernux-era historical product documents.

The inclusion of `docs/roadmap/NEXT.md` is required so the repository's canonical execution front door can move from K6 bounded closeout to **P2 KodacBench authorization-candidate preparation only** after and only after the closeout itself becomes canonical and post-merge proven.

## Required later closeout evidence

The later closeout candidate must contain a canonical evidence record that independently proves, at minimum:

1. the exact canonical K6 definition/planning authority;
2. each R1-R5 authorization merge and authorization-document blob;
3. each final implementation exact qualified head, tree, merge, and authorized implementation blobs;
4. each applicable dedicated/trusted machine qualification run and final required repository CI evidence;
5. each roadmap reconciliation identity required to support the current closed-canonical slice status;
6. the R4 and R5 repair/hardening lineage above, including closed-unmerged/non-authority records where material to truthful history;
7. exact preservation of every slice's authorized changed-file scope;
8. zero authority by composition across R1-R5;
9. no unauthorized provider/model/reviewer/evaluator invocation or route/strategy execution;
10. no durable persistence, telemetry, upload, training, cross-repository learning, or automatic promotion;
11. no K2, K5, Done Gate, `PROVEN_READY`, ruleset, review, approval, repository-write, or merge authority expansion;
12. exact separation of the R5-specific bounded conformance corpus from general KodacBench;
13. active protected-main ruleset/no-bypass state for the closeout candidate;
14. exact-head required repository CI;
15. at least two distinct independent external substantive terminal-clean semantic reviews on the exact final closeout head;
16. zero unresolved actionable review threads;
17. guarded normal merge with the exact qualified `expected_head_sha`;
18. post-merge ordered parents, candidate/merge tree equality, all six closeout-document blobs, valid GitHub merge verification/signature where supplied, canonical protected main, ruleset/no-bypass state, and applicable post-merge checks;
19. explicit classification of any path-filtered post-merge workflow as non-applicable from its canonical trigger definition rather than relabeling absence as success; and
20. `WAIVER=NO`.

## Conditional closure meaning

Only the later closeout candidate may introduce a conditional state equivalent to:

```text
K6 = CLOSED FOR THE CANONICAL K6-R1 THROUGH K6-R5 BOUNDED EVIDENCE-ROUTER / OUTCOME-LEARNING SCOPE IFF THE EXACT CLOSEOUT MERGE AND POST-MERGE GATE PASSES
K6-R1 THROUGH K6-R5 = CANONICAL / COMPLETE FOR THEIR SEPARATELY AUTHORIZED BOUNDED SCOPES
K6-R6+ = NOT REQUIRED FOR THIS BOUNDED CLOSEOUT / NOT AUTHORIZED
P2 KODACBENCH IMPLEMENTATION = NOT AUTHORIZED BY K6 CLOSEOUT
```

If any required closeout condition fails, K6 remains defined/in progress despite R1-R5 being separately canonical.

Once the exact later closeout merge and post-merge proof succeed, the next eligible unit may become **P2 KodacBench authorization-candidate preparation**. P2 source/schema/workflow/benchmark implementation still requires a separate exact canonical authorization record.

## Preserved non-grants

This authorization and the later bounded closeout it permits do not authorize or establish:

```text
K6-R6+ IMPLEMENTATION
P2 KODACBENCH IMPLEMENTATION OR GENERAL SUPERIORITY CLAIMS
P3+ IMPLEMENTATION
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION FROM K6
ROUTE / FALLBACK / RETRY / STRATEGY EXECUTION
CANDIDATE ELIGIBILITY GRANT FROM R5
AUTOMATIC STRATEGY OR POLICY PROMOTION
TRUST-POLICY MUTATION
DONE GATE MODIFICATION
PROVEN_READY AUTHORITY FROM K6
K2 EXECUTION-AUTHORITY EXPANSION
K5 PROOF-AUTHORITY EXPANSION
REPOSITORY WRITE / GITHUB COMMENT / REVIEW / APPROVAL / MERGE AUTHORITY FROM K6
RULESET / BRANCH-PROTECTION MUTATION
DURABLE OUTCOME / ROUTE / REVIEW / PROOF PERSISTENCE
TELEMETRY / UPLOAD / HIDDEN EGRESS
MODEL TRAINING / ONLINE OR OFFLINE LEARNING MUTATION
VECTOR / EMBEDDING INFRASTRUCTURE
CROSS-REPOSITORY LEARNING OR AGGREGATION
NEW DEPENDENCIES / DONOR SOURCE INTAKE / EXTERNAL SERVICE INTEGRATION
AUTOFIX EXECUTION
PUBLIC RELEASE
PACKAGE PUBLICATION
SUPPORT OR COMPATIBILITY GUARANTEES
BRAND LAUNCH / TRADEMARK CLEARANCE
PR #163 / Z0-FAMILY AUTHORITY
```

`DONE = evidence-backed completion` remains binding.

## Exact scope of this authorization candidate

This candidate may add exactly one path:

```text
docs/planning/KODAC_K6_BOUNDED_CLOSEOUT_AUTHORIZATION_2026-08-28.md
```

No other documentation path is modified by this authorization candidate.

No source, test, fixture, schema, workflow, dependency, lockfile, package manifest, runtime export, provenance policy, ruleset, branch protection, K2/K3/K4/K5/K6 implementation, provider/model configuration, PR #163, Z0-family path, release artifact, or historical product document is changed.

## Adoption gate for this authorization record

This authorization remains non-canonical unless its exact final candidate proves all of the following:

1. PR base ref is exactly `main`;
2. candidate PR base SHA and live protected `main` are exactly `74868b75d0e531fdff8255e3827c4ecbce7dc4ac` with tree `610b245340fb3175d23d0a977b5abfc5f6c63d68`;
3. the base includes canonical PR #234 K6-R5 roadmap reconciliation and its completed post-merge proof;
4. changed-file set is exactly the one authorization-document path above, with no rename/copy source;
5. `behind_by=0` against unchanged live protected `main`;
6. candidate is open, non-draft, and mergeable;
7. required exact-head repository CI is terminal success, including `provenance`, `legacy-tests`, and `k2-runtime-gate` from trusted integration `15368` where emitted for the pull-request event;
8. at least two distinct independent external substantive semantic reviewer channels each give a terminal-clean assessment bound to the exact final head under the canonical provider-neutral quorum;
9. status-only, skipped, stale, rate-limited, billing-only, service-start-failed, duplicate-channel, or self-review output does not count toward that quorum;
10. zero unresolved actionable review threads remain;
11. ruleset `20707483` remains active, targets `refs/heads/main`, preserves strict required checks and required review-thread resolution;
12. owner-level control-plane evidence exposes `bypass_actors=[]` and `current_user_can_bypass=never`;
13. exact final candidate head, tree, and authorization-document blob are captured;
14. guarded merge uses normal GitHub merge-commit semantics with the exact qualified `expected_head_sha`;
15. ordered merge parent 1 equals the pre-merge canonical main and parent 2 equals the exact qualified candidate head;
16. merge tree equals the qualified candidate tree and the authorization-document blob remains exact;
17. GitHub merge verification/signature is valid where supplied;
18. protected `main` equals the merge commit/tree after merge;
19. applicable post-merge checks are terminal success; a workflow absent because its canonical `push.paths` filter excludes this one documentation path must be recorded as **non-applicable**, not green;
20. ruleset/no-bypass state remains fail-closed post-merge; and
21. `WAIVER=NO`.

If live `main` advances before merge, STOP. Amend this record to the exact replacement canonical main SHA/tree, perform only a normal non-destructive forward merge from that exact main, and requalify the resulting new head from scratch for scope, CI, semantic-review quorum, threads, mergeability, tree, document blob, ruleset, no-bypass state, and merge preconditions.

No rebase, force-push, destructive history rewrite, stale-head reuse, stale-base exception, or silent review waiver is permitted.

## Stop boundary

Even after this authorization becomes canonical and post-merge proven:

```text
DO NOT CLAIM K6 CLOSED YET
DO NOT IMPLEMENT K6-R6+
DO NOT IMPLEMENT P2 KODACBENCH
DO NOT MODIFY SOURCE / TEST / SCHEMA / WORKFLOW / DEPENDENCIES
DO NOT ADD PERSISTENCE / TELEMETRY / TRAINING / LEARNING
DO NOT INVOKE PROVIDERS / MODELS / REVIEWERS / EVALUATORS
DO NOT AUTO-PROMOTE A STRATEGY
DO NOT EXPAND K2 / K5 / DONE GATE / PROVEN_READY AUTHORITY
```

The only next mutation authorized by canonical adoption of this record is the exact six-document K6 closeout candidate defined above. That candidate must prove closure; it may not assume it.
