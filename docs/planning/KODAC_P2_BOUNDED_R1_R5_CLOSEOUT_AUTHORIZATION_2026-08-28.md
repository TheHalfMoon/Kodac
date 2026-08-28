# Kodac P2 — Bounded R1-R5 Closeout Authorization Candidate

Date: 2026-08-28
Decision owner: Kodac founder

```text
DOCUMENT TYPE = DOCUMENTATION / ENGINEERING MILESTONE CLOSEOUT AUTHORIZATION CANDIDATE
P2-R1 = CLOSED_CANONICAL
P2-R2 = CLOSED_CANONICAL
P2-R3 = CLOSED_CANONICAL
P2-R4 = CLOSED_CANONICAL
P2-R5 = CLOSED_CANONICAL
P2 BOUNDED R1-R5 CLOSEOUT = AUTHORIZATION CANDIDATE ONLY / NOT YET CANONICAL
P2 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P2-R6+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
WAIVER = NO
```

This record is deny-by-default. It does not close P2. It authorizes only one later documentation/evidence closeout candidate after this exact authorization record itself qualifies, merges normally into protected `main`, and passes applicable post-merge proof.

---

## 1. Canonical base and authority chain

Canonical repository state at candidate creation:

```text
CANONICAL_MAIN = e911bd68988163d9b4cbfab9f7f2c99b6067c3fd
CANONICAL_TREE = 6e9a943c60d8eb91acab959d15e7301ea1854407
P2_R5_CLOSEOUT_RECONCILIATION = PR #248 / e911bd68988163d9b4cbfab9f7f2c99b6067c3fd
P2_R5_RECONCILIATION_PARENT_1 = 7e92fece64807c03981091cd825f2c5e848356ce
P2_R5_RECONCILIATION_PARENT_2 = 9ee202ad82e43ceeb3d4d8c2fc409602700fd1ea
P2_R5_RECONCILIATION_TREE = 6e9a943c60d8eb91acab959d15e7301ea1854407
P2_R5_RECONCILIATION_VERIFICATION = verified / valid
P2_R5_RECONCILIATION_POST_MERGE_GOVERNANCE = 33200378548 / SUCCESS
P2_R5_RECONCILIATION_K2_PUSH = NOT_APPLICABLE_BY_WORKFLOW_PUSH_PATH_FILTER
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Governing repository sources include:

```text
AGENTS.md
docs/roadmap/NEXT.md
docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md
docs/adr/ADR-0010-benchmark-first-donor-selection.md
docs/planning/KODAC_REVIEW_PROVIDER_NEUTRALITY_AND_EVIDENCE_QUORUM_AMENDMENT_2026-08-27.md
```

Live GitHub truth and exact canonical authorization/evidence records override summaries in this document.

---

## 2. Decision

Authorize only a later **documentation/evidence-only bounded P2 R1-R5 closeout candidate**.

After and only after this authorization record becomes canonical and post-merge proven, that later closeout candidate may independently prove that the exact already-canonical R1-R5 deterministic engineering surface is closed for its bounded scope.

The later closeout may conditionally establish:

```text
P2 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
```

It may not establish any stronger statement by composition.

In particular:

```text
P2 BOUNDED R1-R5 CLOSED_CANONICAL
!= GENERAL / PUBLIC KODACBENCH COMPLETE
!= REAL PROVIDER / MODEL BENCHMARK EXECUTION
!= UNIVERSAL BENCHMARK CORPUS
!= GLOBAL WINNER / RANKING / SUPERIORITY
!= DONOR REPLACEMENT / PROMOTION DECISION
!= PRODUCT / PACKAGE / RELEASE READY
!= P2-R6+ AUTHORITY
!= P3 AUTHORITY
```

No R6 implementation is invented merely to create another slice. If later work actually requires benchmark semantics broader than R1-R5, the canonical R5 authorization requires a separate P2-R6+ authorization candidate.

---

## 3. Canonical bounded P2 ledger

The later closeout evidence must independently re-read GitHub and bind the exact canonical chain. At authorization-candidate creation, the core authorization/implementation anchors are:

```text
P2-R1 authorization
  PR #237 / merge 1cd2fc4de1eb5849cbe2519ae1699bc2acc56397
P2-R1 implementation
  PR #238 / merge c499c8ac098cca9719eaad3cacadd2af7d1c0a1f

P2-R2 authorization
  PR #239 / merge f2b8d452e93ec207ebe04c9db7d47dc032df20de
P2-R2 implementation
  PR #240 / merge 4a0b2c67dbd707c18395b0898752c111ca6b16a9

P2-R3 authorization
  PR #241 / merge d398983a457060dff0b700714d3eebbc4dce8e23
P2-R3 implementation
  PR #242 / merge 20cb3d2e277513fc3cefa71fe9fda03f25fd418a

P2-R4 authorization
  PR #243 / merge 6f5bba88fcb9b646ed6b66bfd67b4a8c81fd3a26
P2-R4 implementation
  PR #244 / merge a97436df6008e37baf544345893b414d70b40c19
P2-R4 canonical closeout reconciliation
  PR #245 / merge 16c2e410fe3e62eb0c5bed6f0640dffd9c5e1f4f

P2-R5 authorization
  PR #246 / merge f1f33a01a3d5c764ac59a292464322c3c7c7b3de
P2-R5 implementation
  PR #247 / merge 7e92fece64807c03981091cd825f2c5e848356ce
P2-R5 canonical closeout reconciliation
  PR #248 / merge e911bd68988163d9b4cbfab9f7f2c99b6067c3fd
```

The later closeout evidence must not treat PR numbering as canonical ordering. It must bind actual merge ancestry, exact authorization dependencies, qualified heads/trees, implementation blobs, evidence blobs, applicable workflow runs, reconciliation records, and ruleset state directly from GitHub.

---

## 4. Bounded R1-R5 exit-evidence matrix

The later closeout must prove these exact bounded meanings rather than infer a stronger composed benchmark product.

| Slice | Canonical bounded result | Must remain explicitly outside the slice |
| --- | --- | --- |
| P2-R1 | Deterministic benchmark contract plus repository-authored frozen fixture/manifest spine | provider/model execution, universal corpus, winner/ranking, public benchmark claims |
| P2-R2 | Deterministic caller-observation report materialization over R1-bound topology | benchmark task execution, network/provider invocation, persistence/telemetry, scoring verdict |
| P2-R3 | Explicit metric reducer/missingness policy and task-family summaries over validated R2 evidence | hidden aggregation, cross-family winner, threshold/statistics, execution, promotion |
| P2-R4 | Controlled pairwise raw comparison under exact shared evaluation context and explicit metric direction | winner/loser verdict, ranking/leaderboard, threshold, statistics, donor replacement, release decision |
| P2-R5 | Metric-local direction-aware relation over independently revalidated serialized R4 evidence | global superiority, N-way ranking, tolerance bands, statistics, promotion, execution, persistence, public claim |

The closeout must prove that composition does not create authority:

```text
FIXTURE / MANIFEST EVIDENCE != PROVIDER EXECUTION AUTHORITY
CALLER OBSERVATION REPORT != BENCHMARK TASK EXECUTION
TASK-FAMILY SUMMARY != GLOBAL SCORE
RAW PAIRWISE DELTA != GLOBAL WINNER
METRIC-LOCAL DIRECTIONAL RELATION != SYSTEM SUPERIORITY
BOUNDED R1-R5 ENGINEERING CLOSEOUT != GENERAL / PUBLIC KODACBENCH COMPLETE
BENCHMARK EVIDENCE != DONOR REPLACEMENT / PROMOTION AUTHORITY
P2 CLOSEOUT != P3 IMPLEMENTATION AUTHORITY
```

---

## 5. Material repair and failure history that must remain visible

The later closeout must not rewrite P2 as a clean first-attempt sequence. It must preserve material repair/failure history that affected canonical qualification.

At minimum:

### R4 authorization contract repair

The initial R4 authorization candidate contained a real contradiction around `expected_count`: the exact caller direction-policy schema omitted `expected_count` while candidate wording could be read as requiring it in a policy entry. The authorization was fixed forward so `expected_count` remains derived from validated R2/R3 evidence, left/right summaries must match it, and a caller-supplied policy `expected_count` is rejected as an unknown field. Earlier exact-head qualification evidence was invalidated rather than reused.

### R4 post-merge runtime history

The first post-merge K2 attempt for the canonical R4 implementation exposed one unrelated pre-existing Linux H4-R3G-B deadline timing assertion. P2-R4 tests passed in that attempt. No repository byte changed and no waiver was used. A same-SHA Ubuntu retry passed and the dependent K2 runtime gate passed; macOS and Windows remained successful. The failed first attempt remains historical failure evidence and is not relabeled as green.

### R5 WIP TypeScript failure

WIP head `9169883db3239289f76886a75cb5563a8d65c099` failed K2 run `33198255234` at Typecheck on Ubuntu, macOS, and Windows. Tests did not run on that head. The implementation-local TypeScript narrowing defect was fixed forward; no force-push, rebase, waiver, or destructive history rewrite occurred. The failed WIP run remains historical failure evidence.

The later closeout must independently discover and preserve any additional material canonical P2 repair/failure history present in live GitHub rather than assuming this list is exhaustive.

---

## 6. Exact future closeout-candidate allowlist

After and only after this authorization record becomes canonical and post-merge proven, one later bounded P2 closeout candidate may change exactly these six documentation paths:

1. `docs/planning/KODAC_P2_BOUNDED_R1_R5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-28.md`
2. `docs/product/STATUS.md`
3. `docs/roadmap/MILESTONES.md`
4. `docs/roadmap/ROADMAP.md`
5. `docs/roadmap/VERSION_PLAN.md`
6. `docs/roadmap/NEXT.md`

No seventh path is authorized by this record.

No runtime, source, test, fixture, schema, workflow, manifest, dependency, lockfile, provider/model configuration, provenance, persistence, telemetry, package, release, ruleset, or historical R1-R5 authorization/evidence path may change in the closeout candidate.

The five current-state views are included only so the later closeout can reconcile the bounded engineering milestone if and only if its evidence qualifies and merges. They may not create stronger public/product authority.

---

## 7. Required later closeout evidence

The later closeout evidence must independently prove at minimum:

1. exact canonical R1-R5 authorization merges and authorization-document blobs;
2. exact final implementation qualified heads, trees, merge commits, ordered merge parents, verified/valid signatures, and authorized implementation/evidence blobs for R1-R5;
3. exact applicable machine qualification and post-merge workflow runs for each slice;
4. exact current-state reconciliations required to support each closed-canonical slice state;
5. all material repair/failure history required by Section 5 plus any additional material live-GitHub history found during verification;
6. each slice stayed within its exact authorization allowlist;
7. the bounded meanings in Section 4 remain distinct and task-family/metric boundaries are not silently collapsed;
8. no provider/model/reviewer/evaluator/agent invocation or benchmark task execution was authorized by R1-R5;
9. no network/secrets/subprocess/sandbox authority was created by R1-R5;
10. no durable persistence, telemetry, upload, training, learning, or cross-repository aggregation authority was created;
11. no threshold/tolerance/statistics/significance/Pareto/global-score/N-way-ranking authority was created;
12. no donor replacement, strategy promotion, routing, retry, release, package publication, or public superiority decision was created;
13. no K2/K5/Done Gate/`PROVEN_READY`/ruleset/review/approval/repository-write/merge authority expansion occurred by composition;
14. general/public KodacBench remains explicitly not closed;
15. P2-R6+ remains not authorized;
16. P3-P8 remain not authorized;
17. exact active protected-main ruleset/no-bypass state;
18. exact-head required repository CI and provider-neutral semantic review quorum for the closeout candidate;
19. `WAIVER=NO`;
20. normal guarded merge and mandatory post-merge proof for the closeout candidate itself.

---

## 8. Conditional bounded closeout state

Only after the later six-path closeout candidate itself qualifies, merges normally, and passes mandatory post-merge proof may current-state documentation say:

```text
P2 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL
P2-R1 THROUGH P2-R5 = CLOSED_CANONICAL
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL PROVIDER / MODEL BENCHMARK EXECUTION = NOT AUTHORIZED
GLOBAL WINNER / RANKING / SUPERIORITY = NOT AUTHORIZED
P2-R6+ = NOT AUTHORIZED
P3-P8 = NOT AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION = NOT AUTHORIZED
WAIVER = NO
```

Whether the generic shorthand `P2 = CLOSED` is used at all must remain explicitly qualified as **bounded R1-R5 engineering scope only**. The safer canonical wording is `P2 BOUNDED R1-R5 ENGINEERING SCOPE = CLOSED_CANONICAL`.

---

## 9. Authorization-candidate qualification gate

Do not merge this authorization record until one frozen exact head proves all of the following:

1. protected `main` is the expected canonical base or the candidate has been forward-reconciled non-destructively;
2. `behind_by=0`;
3. changed-file scope is exactly this one authorization path;
4. final authorization blob and candidate tree are captured exactly;
5. PR is open, non-draft, and mergeable;
6. exact-head required CI is terminal success, including `provenance`, `legacy-tests`, and `k2-runtime-gate` for the PR event;
7. at least two distinct independent external substantive semantic reviewer channels evaluate the exact frozen head and reach terminal-clean conclusions;
8. summary-only, billing-blocked, rate-limited, service-error, stale-head, self-review, and non-substantive outputs do not count toward quorum;
9. zero unresolved material correctness/security/governance/authority/scope findings remain;
10. zero unresolved actionable review threads remain;
11. ruleset `20707483` is active with required contexts/thread resolution, `bypass_actors=[]`, and `current_user_can_bypass=never`;
12. `WAIVER=NO`;
13. merge is a normal history-preserving guarded merge with exact `expected_head_sha`;
14. no force-push, rebase, destructive history rewrite, stale-head evidence reuse, or silent waiver occurs.

If canonical `main` moves before merge, forward-reconcile only and requalify from scratch on the new exact head.

---

## 10. Mandatory authorization post-merge proof

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
P2 BOUNDED R1-R5 CLOSEOUT AUTHORITY = EFFECTIVE FOR THE EXACT SECTION 6 ALLOWLIST
```

This does not itself close P2.

---

## 11. Stop rules

Stop rather than improvise if:

- the closeout needs a seventh path;
- any runtime/source/test/historical R1-R5 byte would need modification;
- the evidence cannot bind a claimed canonical identity directly from live GitHub;
- a material failed/repair history cannot be reconciled honestly;
- broader benchmark semantics are required;
- provider/model execution or a real benchmark run would be required;
- a universal corpus/global-score/ranking/threshold/statistical policy would be required;
- a new dependency/tool/provider/model is required;
- persistence/telemetry/network/subprocess/learning/release authority would be required;
- P2-R6+ or P3 authority would be needed to make the closeout statement true;
- exact-head CI/review evidence becomes stale;
- merge would require force-push, rebase, destructive rewrite, bypass, or stale evidence.

A need for broader benchmark semantics is a new P2-R6+ authorization problem, not a closeout repair.

---

## 12. Decision summary

Subject to exact qualification, guarded canonical merge, and mandatory post-merge proof, the founder authorizes one later documentation/evidence-only closeout unit that may prove the exact already-canonical P2 R1-R5 deterministic engineering surface closed for its bounded scope while preserving all execution, aggregation, promotion, persistence, public-claim, release, P2-R6+, and P3 authority boundaries.
