# Kodac P3 — Bounded R1-R5 Closeout Authorization Candidate

Date: 2026-08-31
Decision owner: Kodac founder

```text
DOCUMENT TYPE = DOCUMENTATION / ENGINEERING MILESTONE CLOSEOUT AUTHORIZATION CANDIDATE
P3-R1 = CLOSED_CANONICAL
P3-R2 = CLOSED_CANONICAL
P3-R3 = CLOSED_CANONICAL
P3-R4 = CLOSED_CANONICAL
P3-R5 = CLOSED_CANONICAL
P3 BOUNDED R1-R5 CLOSEOUT = AUTHORIZATION CANDIDATE ONLY / NOT YET CANONICAL
P3 OVERALL = OPEN
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
PUBLIC QUALITY / SUPERIORITY CLAIM = NOT_AUTHORIZED
WAIVER = NO
```

This record is deny-by-default. It does not close P3. It authorizes only one later documentation/evidence closeout candidate after this exact authorization record itself qualifies, merges normally into protected `main`, and passes applicable post-merge proof.

---

## 1. Canonical base and authority chain

Canonical repository state at candidate creation:

```text
CANONICAL_MAIN = f5be14e44abe1d9d3c85f77c36c1af0fa557e2cc
CANONICAL_TREE = a313d4ccabdba37b4ea775492a4bdb291c290911
P3_R5_CLOSEOUT_RECONCILIATION = PR #268 / f5be14e44abe1d9d3c85f77c36c1af0fa557e2cc
P3_R5_RECONCILIATION_PARENT_1 = ae8a8d46f529a6782e39e3ae1787220cef603b8f
P3_R5_RECONCILIATION_PARENT_2 = 392b26dc74e43aa0b78982bb55a8eee370e7d960
P3_R5_RECONCILIATION_TREE = a313d4ccabdba37b4ea775492a4bdb291c290911
P3_R5_RECONCILIATION_VERIFICATION = verified / valid
P3_R5_RECONCILIATION_POST_MERGE_GOVERNANCE = 33360005514 / SUCCESS
P3_R5_RECONCILIATION_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Governing repository sources include:

```text
AGENTS.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md
docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md
docs/adr/ADR-0010-benchmark-first-donor-selection.md
docs/planning/KODAC_REVIEW_PROVIDER_NEUTRALITY_AND_EVIDENCE_QUORUM_AMENDMENT_2026-08-27.md
```

Live GitHub truth and exact canonical authorization/evidence records override summaries in this document.

---

## 2. Decision

Authorize only a later **documentation/evidence-only bounded P3 R1-R5 closeout candidate**.

After and only after this authorization record becomes canonical and post-merge proven, that later closeout candidate may independently prove that the exact already-canonical P3 R1-R5 deterministic Context Engine v2 engineering/evidence surface is closed for its bounded scope.

The later closeout may conditionally establish:

```text
P3 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
```

It may not establish any stronger statement by composition.

In particular:

```text
P3 BOUNDED R1-R5 CLOSED_CANONICAL
!= P3 OVERALL CLOSED
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL BENCHMARK TASK EXECUTION
!= REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION
!= STATISTICAL ACCEPTANCE / SIGNIFICANCE
!= HOLDOUT SUFFICIENCY / UNBIASEDNESS
!= PROVEN CONTAMINATION FREEDOM
!= PROVIDER / MODEL EXECUTION
!= PRODUCT / PACKAGE / RELEASE READY
!= P3-R6+ AUTHORITY
!= P4 AUTHORITY
```

No R6 implementation is invented merely to create another slice. If later work actually requires a new bounded P3 semantic beyond R1-R5, a separate P3-R6+ authorization candidate must define the exact need, contract, allowlist, proof obligations, and non-grants before any implementation authority exists.

---

## 3. Canonical bounded P3 ledger

The later closeout evidence must independently re-read GitHub and bind the exact canonical chain. At authorization-candidate creation, the core authorization/implementation/reconciliation anchors are:

```text
P3-R1 authorization
  PR #251 / merge 2b3ce25fe4b8e108840208cdf7a7018ba6262fd6
P3-R1 implementation
  PR #252 / merge ba3caabef0b36649a1d556ff287237ca2a455ab2
P3-R1 canonical closeout reconciliation
  PR #253 / merge f0b18b3d6be10818195e2aef9f3d4123a2b9d3a2

P3-R2 authorization
  PR #255 / merge 69f74cef1f9cc36ed8db123cc30b65e881aa147e
P3-R2 implementation
  PR #256 / merge 458f62e85f4af2e13bfd78f5a6c3582d9330c911
P3-R2 canonical closeout reconciliation
  PR #257 / merge ecee96c1a0d4bf73c5d41b369edfa9950ae1ea0c

P3-R3 authorization
  PR #258 / merge 70553fef18c992b1ec819720e051258372af75d8
P3-R3 implementation
  PR #260 / merge cd7c28b4f823e9570daf73448c5f3b9b9b540d2e
P3-R3 canonical closeout reconciliation
  PR #261 / merge 0d26a7b7225c4ccc48a52b137ca526684a37d974

P3-R4 authorization
  PR #262 / merge 954455a3dce6e1d0663501504265abd4194addce
P3-R4 implementation
  PR #264 / merge ad63bab64512f8ac24c0f849b58b64ecf41a8709
P3-R4 canonical closeout reconciliation
  PR #265 / merge ff6682d0266b44dcc25c7d1100a7af9519ad26e6

P3-R5 authorization
  PR #266 / merge 41599d88d2b18f2714848452d20fc8ff00232f31
P3-R5 implementation
  PR #267 / merge ae8a8d46f529a6782e39e3ae1787220cef603b8f
P3-R5 canonical closeout reconciliation
  PR #268 / merge f5be14e44abe1d9d3c85f77c36c1af0fa557e2cc
```

The later closeout evidence must not treat PR numbering as canonical ordering. It must bind actual merge ancestry, exact authorization dependencies, qualified heads/trees, authorization blobs, implementation blobs, evidence blobs, applicable workflow runs, reconciliation records, and ruleset state directly from live GitHub.

Closed-unmerged or superseded candidates such as the earlier P3-R2 and P3-R3 attempts remain non-authority and must not be promoted into the canonical chain merely because they exist in history.

---

## 4. Bounded R1-R5 exit-evidence matrix

The later closeout must prove these exact bounded meanings rather than infer a stronger Context Engine v2 product or benchmark decision system.

| Slice | Canonical bounded result | Must remain explicitly outside the slice |
| --- | --- | --- |
| P3-R1 | Deterministic context-selection-plan foundation over caller-materialized, identity-bound evidence | repository-owned ranking/default, benchmark execution, embeddings, provider/model execution, persistence, product integration |
| P3-R2 | Deterministic application of one exact caller-declared selection policy over canonically rebuilt P3-R1 truth | winning/default policy, hidden score/weights, benchmark-backed quality claim, automatic promotion |
| P3-R3 | Pairwise seven-metric evidence binding and comparability-only state over trusted P3-R2/P2 evidence | chronology/contamination inference, aggregate winner, threshold/significance, acceptance/promotion |
| P3-R4 | Deterministic literal benchmark-provenance evidence binding to trusted report/corpus identities | holdout sufficiency, contamination freedom, unbiasedness, significance, quality acceptance |
| P3-R5 | Deterministic caller-declared criterion-match evidence over canonical metric relations and literal provenance | repository-owned winner/default/promotion, statistical policy, real benchmark execution, public superiority |

The closeout must prove that composition does not create authority:

```text
DETERMINISTIC PLAN != BETTER CONTEXT STRATEGY
CALLER-DECLARED POLICY != REPOSITORY POLICY
PAIRWISE METRIC EVIDENCE != GLOBAL WINNER
LITERAL PROVENANCE != HOLDOUT SUFFICIENCY
LATER-IN-TIME != SUFFICIENT HOLDOUT
NONE-KNOWN != PROVEN UNCONTAMINATED
COMPARABLE != STATISTICALLY SIGNIFICANT
CALLER-DECLARED CRITERIA MATCH != REPOSITORY WINNER / DEFAULT / PROMOTION
BOUNDED R1-R5 ENGINEERING CLOSEOUT != P3 OVERALL CLOSED
BOUNDED R1-R5 ENGINEERING CLOSEOUT != GENERAL / PUBLIC KODACBENCH COMPLETE
BOUNDED R1-R5 ENGINEERING CLOSEOUT != REAL BENCHMARK TASK EXECUTION
BOUNDED R1-R5 ENGINEERING CLOSEOUT != P4 IMPLEMENTATION AUTHORITY
```

---

## 5. Material repair and failure history that must remain visible

The later closeout must not rewrite P3 as a clean first-attempt sequence. It must preserve material repair/failure/service history that affected canonical qualification.

At minimum:

### R1 review repair and runtime qualification history

P3-R1 received a valid review finding that its K3-R6 entity ordering key was narrower than canonical K3-R6 ordering. The implementation was repaired forward to match canonical entity ordering, including `qualifiedName` and `sourceSpan`, and regression coverage was added. Earlier-head qualification evidence was not reused.

The final R1 qualification also encountered an unrelated pre-existing H4-R3G-B Ubuntu timing assertion before an identical-head retry passed. No P3-R1 or H4 byte moved and no waiver was used.

### R2 authorization replacement and retry history

The initial P3-R2 authorization attempt in PR #254 was closed unmerged and remained non-authority after a valid derivation-boundary finding. The replacement authorization in PR #255 repaired that issue and additional source-state/result-schema ambiguities forward-only before canonicalization.

R2 qualification/post-merge history includes unrelated pre-existing H4 timing failures followed by same-head/same-merge retries without P3-R2 or H4 byte mutation. The R2 reconciliation also records an immutable merge-message narrative typo separately from topology-proven canonical identity; narrative text is not promoted over Git topology.

### R3 superseded implementation, review repair, and hosted-runner history

P3-R3 implementation PR #259 was closed unmerged and remained non-authority. PR #260 replaced it under the same canonical authorization.

A material Codex finding identified missing direct focused-test proof for authorization obligations. That finding was accepted, repaired forward within the existing allowlist, and all earlier exact-head CI/review evidence became stale.

Hosted-runner service-start failures and the repository-visibility transition remain operational history rather than proof of repository correctness. Subsequent required exact-head Governance/K2 evidence was established after hosted execution became available. Repeated unchanged pre-existing H4-R3G-B timing assertions were resolved only by identical-head retries, without repository mutation or waiver.

### R4 exact authorization/implementation qualification history

The later closeout must independently inspect P3-R4 authorization PR #262, implementation PR #264, reconciliation PR #265, their review threads/comments, workflow attempts, exact qualified heads/trees/blobs, and post-merge proof. Any accepted material repair or failed qualification attempt present in canonical history must be preserved rather than summarized away.

### R5 authorization repairs and identical-merge retry history

P3-R5 authorization accepted and repaired material semantic findings around provenance criterion-state closure and aggregate precedence. Earlier-head evidence was invalidated after each forward repair.

The first post-merge Ubuntu K2 attempt for canonical P3-R5 encountered one unchanged pre-existing H4-R3G-B timing assertion. The H4 path was byte-identical across the P3-R5 base and merge. An identical-merge-SHA retry completed Ubuntu/macOS/Windows Typecheck + Test + Patch benchmark hook and stable `k2-runtime-gate` successfully without repository mutation. The failed first attempt remains historical evidence and is not relabeled green.

The later closeout must independently discover and preserve any additional material canonical P3 repair/failure/service history present in live GitHub rather than assuming this list is exhaustive.

---

## 6. Exact future closeout-candidate allowlist

After and only after this authorization record becomes canonical and post-merge proven, one later bounded P3 closeout candidate may change exactly these six documentation paths:

1. `docs/planning/KODAC_P3_BOUNDED_R1_R5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-31.md`
2. `docs/product/STATUS.md`
3. `docs/roadmap/MILESTONES.md`
4. `docs/roadmap/ROADMAP.md`
5. `docs/roadmap/VERSION_PLAN.md`
6. `docs/roadmap/NEXT.md`

No seventh path is authorized by this record.

No runtime, source, test, fixture, schema, workflow, manifest, dependency, lockfile, provider/model configuration, provenance substrate, persistence, telemetry, package, release, ruleset, or historical R1-R5 authorization/evidence path may change in the closeout candidate.

The five current-state views are included only so the later closeout can reconcile the bounded engineering milestone if and only if its evidence qualifies and merges. They may not create stronger benchmark, promotion, product, release, or public-claim authority.

---

## 7. Required later closeout evidence

The later closeout evidence must independently prove at minimum:

1. exact canonical R1-R5 authorization merges and authorization-document blobs;
2. exact final implementation qualified heads, trees, merge commits, ordered merge parents, verified/valid signatures, and authorized implementation/evidence blobs for R1-R5;
3. exact applicable machine qualification and post-merge workflow runs for each slice;
4. exact current-state reconciliations required to support each closed-canonical slice state;
5. all material repair/failure/service history required by Section 5 plus any additional material live-GitHub history found during verification;
6. each slice stayed within its exact authorization allowlist;
7. the bounded meanings in Section 4 remain distinct and no metric/provenance/qualification boundary is silently collapsed into a promotion decision;
8. no provider/model/reviewer/evaluator/agent invocation or benchmark task execution was authorized by R1-R5;
9. no repository crawling/new acquisition, network, secrets, subprocess, sandbox, or external side-effect authority was created by R1-R5;
10. no durable persistence, database, telemetry, upload, training, fine-tuning, online learning, or cross-repository aggregation authority was created;
11. no hidden weighting, aggregate score, threshold, tolerance, statistical-significance, confidence-interval, p-value, effect-size, Pareto, N-way-ranking, or leaderboard authority was created;
12. no holdout-sufficiency, unbiasedness, contamination-free, or universal-corpus conclusion was created from literal provenance alone;
13. no repository-owned default/winner, strategy promotion, routing, retry, donor replacement, product readiness, release, package publication, or public superiority decision was created;
14. no K2/K5/Done Gate/`PROVEN_READY`/ruleset/review/approval/repository-write/merge authority expansion occurred by composition;
15. general/public KodacBench remains explicitly not closed;
16. P3 overall remains explicitly open unless separately and exactly authorized otherwise;
17. P3-R6+ implementation remains not authorized;
18. P4-P8 implementation remains not authorized;
19. exact active protected-main ruleset/no-bypass state;
20. exact-head required repository CI and provider-neutral semantic review quorum for the closeout candidate;
21. `WAIVER=NO`;
22. normal guarded merge and mandatory post-merge proof for the closeout candidate itself.

---

## 8. Conditional bounded closeout state

Only after the later six-path closeout candidate itself qualifies, merges normally, and passes mandatory post-merge proof may current-state documentation say:

```text
P3 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
P3-R1 THROUGH P3-R5 = CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
STATISTICAL ACCEPTANCE / SIGNIFICANCE POLICY = NOT_AUTHORIZED
HOLDOUT SUFFICIENCY / CONTAMINATION-FREE CLAIM = NOT_AUTHORIZED
PROVIDER / MODEL EXECUTION = NOT_AUTHORIZED
PERSISTENCE / TELEMETRY / LEARNING = NOT_AUTHORIZED
PRODUCT / CLI / API / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION = NOT_AUTHORIZED
WAIVER = NO
```

Whether the generic shorthand `P3 = CLOSED` is used at all must remain explicitly qualified as **bounded R1-R5 engineering scope only**. The safer canonical wording is `P3 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL` while `P3 OVERALL = OPEN` remains explicit.

---

## 9. Next planning boundary after bounded closeout

If the bounded closeout becomes canonical and post-merge proven, the next eligible P3 action remains **definition/planning/authorization-candidate preparation only** unless a more-specific canonical record exists at that future time.

The durable research direction remains:

```text
MINIMUM SUFFICIENT EVIDENCE > MAXIMUM CONTEXT VOLUME
```

A future bounded slice may define a missing measured-context, benchmark-execution, decision, or promotion boundary only if the need is justified from canonical sequencing and the slice receives its own exact authorization.

This closeout does not pre-select that future slice and does not imply that P3-R6 is required merely because R1-R5 are closed.

---

## 10. Authorization-candidate qualification gate

Do not merge this authorization record until one frozen exact head proves all of the following:

1. protected `main` is the expected canonical base or the candidate has been forward-reconciled non-destructively;
2. `behind_by=0`;
3. changed-file scope is exactly this one authorization path;
4. final authorization blob and candidate tree are captured exactly;
5. PR is open, non-draft, and mergeable;
6. exact-head required CI is terminal success, including `provenance`, `legacy-tests`, and `k2-runtime-gate` for the PR event;
7. at least two distinct independently operated external substantive semantic reviewer/model-system channels evaluate the exact frozen head and reach terminal-clean conclusions;
8. summary-only, billing-blocked, rate-limited, service-error, stale-head, self-review, human-only, and non-substantive outputs do not count toward automated external quorum;
9. zero unresolved material correctness/security/governance/authority/scope findings remain;
10. zero unresolved actionable review threads remain;
11. ruleset `20707483` is active with required contexts/thread resolution, `bypass_actors=[]`, and `current_user_can_bypass=never`;
12. `WAIVER=NO`;
13. merge is a normal history-preserving guarded merge with exact `expected_head_sha`;
14. no force-push, rebase, destructive history rewrite, stale-head evidence reuse, governance bypass, review waiver, or silent waiver occurs.

If canonical `main` moves before merge, forward-reconcile only and requalify from scratch on the new exact head.

---

## 11. Mandatory authorization post-merge proof

The future six-path closeout authority becomes effective only after this authorization merge proves:

- protected `main` equals the authorization merge SHA;
- ordered merge parents are pre-merge canonical `main` then the exact qualified authorization candidate head;
- merge tree equals the qualified candidate tree;
- the authorization blob on canonical `main` equals the qualified candidate blob;
- GitHub merge signature is `verified / valid`;
- applicable post-merge Governance checks succeed;
- K2 push applicability is determined from the canonical workflow trigger and changed paths; non-applicable remains non-applicable rather than relabeled green;
- ruleset `20707483` remains active with no bypass;
- PR is canonically merged.

Only then:

```text
P3 BOUNDED R1-R5 CLOSEOUT AUTHORITY = EFFECTIVE FOR THE EXACT SECTION 6 ALLOWLIST
```

This does not itself close P3.

---

## 12. Preserved non-grants

```text
P3 OVERALL CLOSURE = NOT_AUTHORIZED
P3-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT_ESTABLISHED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST MUTATION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / PROMOTION = NOT_AUTHORIZED
GLOBAL / N-WAY RANKING / LEADERBOARD = NOT_AUTHORIZED
HIDDEN SCORE / WEIGHT / THRESHOLD / TOLERANCE = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
HOLDOUT SUFFICIENCY / UNBIASEDNESS = NOT_AUTHORIZED
CONTAMINATION-FREE CLAIM = NOT_AUTHORIZED
EMBEDDINGS / VECTOR DB / LEARNED RERANKER = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR / AGENT INVOCATION = NOT_AUTHORIZED
REPOSITORY CRAWLING / NEW FILESYSTEM ACQUISITION = NOT_AUTHORIZED
NETWORK / SECRETS / SUBPROCESS / SANDBOX EXPANSION = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
DONOR REPLACEMENT / STRATEGY PROMOTION = NOT_AUTHORIZED
K2 / K5 / DONE GATE / PROVEN_READY EXPANSION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```

Repository visibility being public does not itself establish a public product release, package publication, benchmark completion, quality claim, production readiness, support commitment, or brand launch.

---

## 13. Stop rules

Stop rather than improvise if:

- the closeout needs a seventh path;
- any runtime/source/test/historical R1-R5 byte would need modification;
- the evidence cannot bind a claimed canonical identity directly from live GitHub;
- a material failed/repair/service history cannot be reconciled honestly;
- stronger Context Engine v2 semantics are required to make the bounded closeout statement true;
- real benchmark execution or corpus mutation would be required;
- repository-owned winner/default/promotion would be required;
- a statistical/threshold/holdout-sufficiency/contamination-free decision would be required;
- provider/model execution or a new dependency/tool/provider/model would be required;
- persistence/telemetry/network/subprocess/learning/product/release authority would be required;
- P3-R6+ or P4 authority would be needed to make the closeout statement true;
- exact-head CI/review evidence becomes stale;
- protected `main` moves and the candidate is not forward-reconciled;
- a material semantic reviewer finding remains unresolved;
- the active ruleset or no-bypass truth changes.

In every such case:

```text
FAIL_CLOSED
NO IMPLIED AUTHORITY
NO SILENT WAIVER
```
