# Kodac P3 — Bounded R1-R17 Canonical Closeout Evidence

Date: 2026-09-03

```text
DOCUMENT TYPE = DOCUMENTATION / ENGINEERING MILESTONE CLOSEOUT EVIDENCE CANDIDATE
GOVERNING CLOSEOUT AUTHORIZATION = PR #312 / 7686adfd4cf5a21a2c658e6c211d9c0509b730c8
GOVERNING_AUTHORIZATION_POST_MERGE_PROOF = #312 / 5528344277
P3-R1 THROUGH P3-R17 INDIVIDUAL NUMBERED SLICES = CLOSED_CANONICAL / PRE-EXISTING CANONICAL STATE
P3 BOUNDED R1-R17 ENGINEERING SCOPE = NOT_YET_CLOSED_CANONICAL / CLOSEOUT_CANDIDATE
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R18+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This candidate would close only the aggregate bounded deterministic P3 R1-R17 engineering/evidence scope over already-canonical individual R1-R17 slices if its own exact qualification, guarded merge, and post-merge proof gates succeed. It does not convert those mechanisms into benchmark execution, a repository-owned context policy, a global quality verdict, statistics, promotion, product or release authority, P3-overall closure, P4 authority, or project completion.

---

## 1. Exact closeout authority

The closeout authorization is canonical and post-merge proven:

```text
AUTHORIZATION_PR = #312
AUTHORIZATION_BASE = b1ab1a16067e7d8a2bc720ccba475c6556d0525c
AUTHORIZATION_QUALIFIED_HEAD = b38552d203a65536cccbe7af0c254c9d24573030
AUTHORIZATION_QUALIFIED_TREE = 5b51f4d955840b014ee23b4d829b1082dda8ac6b
AUTHORIZATION_BLOB = ecd52c27008b7755687cd7a6f6649d4cc7b5899f
AUTHORIZATION_QUALIFICATION_PROOF = #312 / 5528228918
AUTHORIZATION_SEMANTIC_REVIEW = Cubic 5527868516 + CodeRabbit 5528180027
AUTHORIZATION_MERGE = 7686adfd4cf5a21a2c658e6c211d9c0509b730c8
AUTHORIZATION_MERGE_PARENT_1 = b1ab1a16067e7d8a2bc720ccba475c6556d0525c
AUTHORIZATION_MERGE_PARENT_2 = b38552d203a65536cccbe7af0c254c9d24573030
AUTHORIZATION_MERGE_TREE = 5b51f4d955840b014ee23b4d829b1082dda8ac6b
AUTHORIZATION_MERGE_VERIFICATION = verified / valid
AUTHORIZATION_POST_MERGE_GOVERNANCE = 33774359901 / SUCCESS
AUTHORIZATION_POST_MERGE_PROVENANCE = 100712237301 / SUCCESS
AUTHORIZATION_POST_MERGE_LEGACY_TESTS = 100712237713 / SUCCESS
AUTHORIZATION_POST_MERGE_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
AUTHORIZATION_POST_MERGE_PROOF = #312 / 5528344277
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

The authorization permits exactly this closeout candidate path set and no seventh path:

```text
docs/planning/KODAC_P3_BOUNDED_R1_R17_CANONICAL_CLOSEOUT_EVIDENCE_2026-09-03.md
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No runtime source/test, historical authorization/evidence, benchmark corpus/manifest/fixture/result, workflow, dependency, lockfile, provider/model configuration, persistence, learning, product/release, ruleset or repository-protection path is authorized to change.

---

## 2. Canonical R1-R17 topology

The live canonical lineage is:

```text
R1:  #251 authorization -> #252 implementation -> #253 reconciliation
R2:  #255 authorization -> #256 implementation -> #257 reconciliation
R3:  #258 authorization -> #260 implementation -> #261 reconciliation
R4:  #262 authorization -> #264 implementation -> #265 reconciliation
R5:  #266 authorization -> #267 implementation -> #268 reconciliation
R1-R5 bounded closeout: #269 authorization -> #270 closeout
R6:  #271 authorization -> #272 implementation -> #273 reconciliation
R7:  #274 authorization -> #275 implementation -> #276 reconciliation
R8:  #277 authorization -> #278 implementation -> #279/#280 H4 recovery -> #281 reconciliation
R9:  #282 authorization -> #283 implementation -> #284 reconciliation
R10: #285 authorization -> #286 implementation -> #287 reconciliation
R11: #288 authorization -> #289 implementation -> #290 reconciliation
R12: #291 authorization -> #293 implementation -> #294 reconciliation
R13: #295 authorization -> #296 implementation -> #297 reconciliation
R14: #298 authorization -> #299 implementation -> #300 reconciliation
R15: #301 authorization -> #302 implementation -> #304 reconciliation
R16: #305 authorization -> #307 implementation -> #308 reconciliation
R17: #309 authorization -> #310 implementation -> #311 reconciliation
R1-R17 bounded closeout authorization: #312
```

PR numbering is descriptive only. Closed-unmerged, superseded, stale-head, service-failed or otherwise non-canonical candidates are not promoted into authority by their existence.

Material non-authority/history preserved includes at least PR #254, #259, #292 and #306 as closed-unmerged/superseded candidates, the R8 H4 recovery sequence #279/#280, and every stale-head/review/CI retry described by the canonical implementation and reconciliation timelines.

---

## 3. R1-R5 nested canonical closeout proof

R1-R5 are not reconstructed from memory. Their canonical proof is the already-qualified, merged and post-merge-proven bounded closeout in PR #270 and the live canonical ledger `docs/planning/KODAC_P3_BOUNDED_R1_R5_CANONICAL_CLOSEOUT_EVIDENCE_2026-08-31.md`.

The live ledger proves the exact authorization/implementation/reconciliation topology, qualified heads/trees, implementation merges, ordered parents, canonical blobs, machine qualification, post-merge workflows and material repair/retry history for R1-R5. Its canonical topological anchors are:

```text
R1 authorization = 2b3ce25fe4b8e108840208cdf7a7018ba6262fd6
R1 implementation = ba3caabef0b36649a1d556ff287237ca2a455ab2
R1 reconciliation = f0b18b3d6be10818195e2aef9f3d4123a2b9d3a2

R2 authorization = 69f74cef1f9cc36ed8db123cc30b65e881aa147e
R2 implementation = 458f62e85f4af2e13bfd78f5a6c3582d9330c911
R2 reconciliation = ecee96c1a0d4bf73c5d41b369edfa9950ae1ea0c

R3 authorization = 70553fef18c992b1ec819720e051258372af75d8
R3 implementation = cd7c28b4f823e9570daf73448c5f3b9b9b540d2e
R3 reconciliation = 0d26a7b7225c4ccc48a52b137ca526684a37d974

R4 authorization = 954455a3dce6e1d0663501504265abd4194addce
R4 implementation = ad63bab64512f8ac24c0f849b58b64ecf41a8709
R4 reconciliation = ff6682d0266b44dcc25c7d1100a7af9519ad26e6

R5 authorization = 41599d88d2b18f2714848452d20fc8ff00232f31
R5 implementation = ae8a8d46f529a6782e39e3ae1787220cef603b8f
R5 reconciliation = f5be14e44abe1d9d3c85f77c36c1af0fa557e2cc

R1-R5 closeout authorization = cce6b1aab6d5c2909728ad80133718cfd97b4897
R1-R5 closeout merge = 9d75115f66f34ef8ee1e1a093705a5cba21f8f49
```

Material history remains part of the closeout evidence rather than being rewritten as first-attempt success: R1 semantic edge/entity-order repairs and identical-head H4 timing retry; R2 closed-unmerged PR #254, derivation repairs, H4 retries and topology-over-narrative handling of a merge-message typo; R3 closed-unmerged PR #259, review-driven focused-proof repair, push Governance run `33263307351` attempt-2 same-head success and hosted-runner service failures; plus the R4/R5 qualification history recorded in the canonical R1-R5 ledger. `WAIVER=NO` throughout.

---

## 4. R6-R10 canonical implementation proofs

### R6

```text
AUTHORIZATION_PR = #271
AUTHORIZATION_MERGE = 2441cf9b6006859a4bc05cfe196a033fe31b56c9
IMPLEMENTATION_PR = #272
QUALIFIED_HEAD = 202cbf2b8082ddde52738e07373ba24322a5265c
QUALIFIED_TREE = 85d3cb932fc477525a05eed6a5ee1e4ffe43e4a1
IMPLEMENTATION_MERGE = c045ae50f42fcfeede37bbd3290b1d3a7cb5bb91
MERGE_PARENT_1 = 2441cf9b6006859a4bc05cfe196a033fe31b56c9
MERGE_PARENT_2 = 202cbf2b8082ddde52738e07373ba24322a5265c
MERGE_TREE = 85d3cb932fc477525a05eed6a5ee1e4ffe43e4a1
MERGE_VERIFICATION = verified / valid
POST_MERGE_PROOF = #272 / 5482394464
POST_MERGE_GOVERNANCE = 33419477062 / SUCCESS
POST_MERGE_K2 = 33419477059 / SUCCESS
RECONCILIATION_PR = #273
WAIVER = NO
```

Canonical R6 blobs pinned in post-merge proof `5482394464`:

```text
packages/kodac-runtime/bench/p3-r6/contracts.ts = 6b12541182cc0c28072efcb3966e570d3cdeefbe
packages/kodac-runtime/bench/p3-r6/context-measurement-observation.ts = f31bb7f1cc89ddc6a6eacf1be546c54f135cffca
packages/kodac-runtime/test/p3-r6-context-measurement-observation.test.ts = 0ef67ed8249a03f79bac6ccf132a8dade56a79d4
docs/planning/KODAC_P3_R6_CONTEXT_MEASUREMENT_OBSERVATION_EVIDENCE_2026-08-31.md = c8c156947f17aef62625acb5ea93c6bc9c0018a8
```

### R7

```text
AUTHORIZATION_PR = #274
AUTHORIZATION_MERGE = bbe7825579e388a3a9be7dd64b56f2406425d930
IMPLEMENTATION_PR = #275
QUALIFIED_HEAD = 6d5ddae20f71767523c52378c468757749aa1520
QUALIFIED_TREE = 9481bab0ece031fa8fe7f77a2395247a10e5a463
IMPLEMENTATION_MERGE = e3933fdc9932b43b4864a0d608845acbc4ad7f08
MERGE_PARENT_1 = bbe7825579e388a3a9be7dd64b56f2406425d930
MERGE_PARENT_2 = 6d5ddae20f71767523c52378c468757749aa1520
MERGE_TREE = 9481bab0ece031fa8fe7f77a2395247a10e5a463
MERGE_VERIFICATION = verified / valid
POST_MERGE_PROOF = #275 / 5483365785
POST_MERGE_GOVERNANCE = 33430224046 / SUCCESS
POST_MERGE_K2 = 33430224234 / SUCCESS
RECONCILIATION_PR = #276
WAIVER = NO
```

Canonical R7 blobs pinned in post-merge proof `5483365785`:

```text
packages/kodac-runtime/bench/p3-r7/contracts.ts = 18357e81a3e135b7f407dd0dcc06646c4d079b19
packages/kodac-runtime/bench/p3-r7/context-measurement-report-binding.ts = d4cc9ed3998a08315ed7adaa93f318a77d9076ec
packages/kodac-runtime/test/p3-r7-context-measurement-report-binding.test.ts = 3d156331133ba4bb67fd55b2ce28481b0cdff792
docs/planning/KODAC_P3_R7_CONTEXT_MEASUREMENT_REPORT_BINDING_EVIDENCE_2026-08-31.md = ee6ce38b82a517de4b5d0c71ea46eeb8507736ea
```

### R8

```text
AUTHORIZATION_PR = #277
AUTHORIZATION_MERGE = e6890265c11fa3adbd14671d09b2c04b76f78954
IMPLEMENTATION_PR = #278
QUALIFIED_HEAD = 55bee850de7e38cba2c54c13000dd6f8447f7f4c
QUALIFIED_TREE = 9e668ba63f2ab24843aa3a12657441b164d426bd
IMPLEMENTATION_MERGE = 576ac5d2b317fb90d1f0c6079d78cd3d899ca62d
MERGE_PARENT_1 = e6890265c11fa3adbd14671d09b2c04b76f78954
MERGE_PARENT_2 = 55bee850de7e38cba2c54c13000dd6f8447f7f4c
MERGE_TREE = 9e668ba63f2ab24843aa3a12657441b164d426bd
MERGE_VERIFICATION = verified / valid
CONTRACTS_BLOB = d5f8d18b9e1b61378283c489c355fdd293880349
IMPLEMENTATION_BLOB = f066b65fd44c7e6aac76b041a5336247c9f7dc2d
TEST_BLOB = 35fd7e59f7916fa1ba4ca6dd3077489dfa95c2e4
EVIDENCE_BLOB = 65ea4dbeb8f976b6639e4cb61699741e226093b4
RECOVERY_HISTORY = #279/#280 H4 recovery; R8 blobs preserved byte-identically
RECOVERY_CANONICAL_MAIN = 89d294035923c3c8682e5a94360cb4e01d271a9c
REPAIR_POST_MERGE_GOVERNANCE = 33484688495 / SUCCESS
REPAIR_POST_MERGE_K2 = 33484688399 / SUCCESS
RECONCILIATION_PR = #281
WAIVER = NO
```

The initial R8 implementation head `273a929b9e7cd390fdf001da92ac94bb99b1db38` is stale. A forward-only test-assertion repair produced the final qualified head. Later H4 recovery is preserved as recovery history, not relabeled as R8 implementation work.

### R9

```text
AUTHORIZATION_PR = #282
AUTHORIZATION_MERGE = ba9553de3384e683a54469ac7aa05545d20c0c1b
IMPLEMENTATION_PR = #283
QUALIFIED_HEAD = 457d12f27ededa4b60cd39b2aa946e2692b3d2f7
QUALIFIED_TREE = adb808338c6ea1e802811728fdf2c6d3c6de373a
IMPLEMENTATION_MERGE = 8d89875cf71715945f81b05853adeddebcb60284
MERGE_PARENT_1 = ba9553de3384e683a54469ac7aa05545d20c0c1b
MERGE_PARENT_2 = 457d12f27ededa4b60cd39b2aa946e2692b3d2f7
MERGE_TREE = adb808338c6ea1e802811728fdf2c6d3c6de373a
MERGE_VERIFICATION = verified / valid
POST_MERGE_PROOF = #283 / 5492583969
RECONCILIATION_PR = #284
WAIVER = NO
```

R9 preserves its forward repair chain `31346b245107f345b6ce5344954d669ee47839f9 -> a8af4864a686dd186fbbb68e05d506d9565f1769 -> 99fca24b99d1ac097b59881a0cf8fe074656f06b -> 457d12f27ededa4b60cd39b2aa946e2692b3d2f7`; predecessor-head CI/review is stale for final qualification.

Canonical R9 blobs at the final head:

```text
packages/kodac-runtime/bench/p3-r9/contracts.ts = b7064806e681983b386ed59123578da1bea384e3
packages/kodac-runtime/bench/p3-r9/single-strategy-two-case-report-composition.ts = fa4fd9af2938221ab8b463efa7de0e81cd81054a
packages/kodac-runtime/test/p3-r9-single-strategy-two-case-report-composition.test.ts = cab8c74c82bf09b6f5c911e05c4a53756529e2bb
docs/planning/KODAC_P3_R9_SINGLE_STRATEGY_TWO_CASE_REPORT_COMPOSITION_EVIDENCE_2026-09-01.md = 08b828fa11455929596cb0e5247f32e885e73168
```

### R10

```text
AUTHORIZATION_PR = #285
AUTHORIZATION_MERGE = 3b4d75133ca350ca147802fb53cc4716ab6ee2e0
IMPLEMENTATION_PR = #286
QUALIFIED_HEAD = 1cfc0bd74d40278ad26184ad5d48675a788d97fb
QUALIFIED_TREE = 2d300653b6afacf21e10c755aaeb0fe4070a8925
IMPLEMENTATION_MERGE = e22019883dca10ac1ed66edff2d56d0fc2570961
MERGE_PARENT_1 = 3b4d75133ca350ca147802fb53cc4716ab6ee2e0
MERGE_PARENT_2 = 1cfc0bd74d40278ad26184ad5d48675a788d97fb
MERGE_TREE = 2d300653b6afacf21e10c755aaeb0fe4070a8925
MERGE_VERIFICATION = verified / valid
RECONCILIATION_PR = #287
WAIVER = NO
```

R10 includes a forward-only Cubic-driven repair making R6->R7->R9 and R6->R8->R9 provenance continuity explicit and replacing a meaningless detachment assertion.

Canonical R10 blobs at the final head:

```text
packages/kodac-runtime/bench/p3-r10/contracts.ts = 0ec5df5255604aea2b3f11a22ff4313b0b87d0ea
packages/kodac-runtime/bench/p3-r10/single-strategy-two-case-metric-alignment.ts = 74085c6094ef7de5b34f351ba79b92ae0a758756
packages/kodac-runtime/test/p3-r10-single-strategy-two-case-metric-alignment.test.ts = e701e76a2c5f6594389fd438b1e7ab8040347cf2
docs/planning/KODAC_P3_R10_SINGLE_STRATEGY_TWO_CASE_METRIC_ALIGNMENT_EVIDENCE_2026-09-01.md = e3d5a1e66593b1162c48dbae40ace7ccb2131fc3
```

---

## 5. R11-R17 canonical proof anchors

The later chain was independently re-read from the live implementation/reconciliation timelines. Final implementation identities are:

```text
R11: PR #289
  qualified head = c9db09e80c27610b5f34afbcaee462bd2d9fb613
  qualified tree = 57725483a8517fc61710016849a524c0ac79fdba
  merge = 0842ed7dac95bad879cc55d720ba5646ae021f24
  merge parent 1 = cb2362c4e0cdf651b949fe851575a123d77a9d32
  merge parent 2 = c9db09e80c27610b5f34afbcaee462bd2d9fb613
  merge tree = 57725483a8517fc61710016849a524c0ac79fdba
  merge verification = verified / valid
  qualification proof = #289 / 5495132359
  review = Cubic 5495078519 + CodeRabbit 5495098393
  reconciliation = #290

R12: PR #293
  qualified head = 1e3741573b3bfd20f5746c8bda91c98c7f06206b
  qualified tree = 1d6302fb267d45a01f87538f171465a4a29256b2
  merge = 7d9de3e1ea544677eac93a455b9ab06a5ef35903
  merge parent 1 = 0aad292ebf3e5f84804b5f731e888da43cb8e883
  merge parent 2 = 1e3741573b3bfd20f5746c8bda91c98c7f06206b
  merge tree = 1d6302fb267d45a01f87538f171465a4a29256b2
  merge verification = verified / valid
  qualification proof = #293 / 5497667401
  post-merge proof = #293 / 5497699790
  superseded PR #292 remains non-authority
  reconciliation = #294

R13: PR #296
  qualified head = 74d07c3ad64fb5b9d7a2dd17e357260a7120489b
  qualified tree = db206d23e70cb1dda9daeda37922264ce2dfd5bf
  merge = 931c750681494895da046f4ba9c8406d77fcfddf
  merge parent 1 = 2a67a91c6d5eef829872823f5fa6441f7a644d67
  merge parent 2 = 74d07c3ad64fb5b9d7a2dd17e357260a7120489b
  merge tree = db206d23e70cb1dda9daeda37922264ce2dfd5bf
  merge verification = verified / valid
  post-merge proof = #296 / 5499792485
  reconciliation = #297

R14: PR #299
  qualified head = cbb5e1d8b11d15c35479856d8e79fd5dafb4ac9d
  qualified tree = 59dc74a3700129a9f34b0453fd8bc6c75362f6ad
  qualification proof = #299 / 5509427079
  merge = 6aa3e35418f95a2e198e3b8431297ab277eec6d3
  merge parent 1 = fbbbcf13bdb281f0fe4296045ec2e2fa7311acdb
  merge parent 2 = cbb5e1d8b11d15c35479856d8e79fd5dafb4ac9d
  merge tree = 59dc74a3700129a9f34b0453fd8bc6c75362f6ad
  merge verification = verified / valid
  post-merge proof = #299 / 5509458721
  reconciliation = #300

R15: PR #302
  qualified head = 697739cd2b21e0e3fe4bf4bfbd6f5bbc792c3619
  qualified tree = af28fd6dd4e67c3a37fb18b330abfe07177b9fa2
  review = CodeRabbit 5513591270 + Cubic 5513811826
  merge = ffc9fae7f3bbb309fa5318e8747e7969726d8a1e
  merge parent 1 = 53c9bde577783aef672504f9a463be30bcc8c657
  merge parent 2 = 697739cd2b21e0e3fe4bf4bfbd6f5bbc792c3619
  merge tree = af28fd6dd4e67c3a37fb18b330abfe07177b9fa2
  merge verification = verified / valid
  post-merge proof = #302 / 5513965094
  reconciliation = #304

R16: PR #307
  qualified head = 390f0dd5b26445aa710e37573152e637230fe129
  qualified tree = 33420ca4cb95721bb08903fb0e30ef4d0312c45c
  review = CodeRabbit 5517148710 + Cubic 5517242418
  merge = 0fb9f47db144619c580c69052aa98d79c4f71dc6
  merge parent 1 = da59d2a46d4eff5c12a60f2057a57d3572ba0e5d
  merge parent 2 = 390f0dd5b26445aa710e37573152e637230fe129
  merge tree = 33420ca4cb95721bb08903fb0e30ef4d0312c45c
  merge verification = verified / valid
  post-merge proof = #307 / 5517289297
  reconciliation = #308
  superseded PR #306 remains non-authority

R17: PR #310
  authorization = #309 / a224a0ad7c7adbf9dd879e1c4ac1ddfaceed6a38
  authorization post-merge proof = #309 / 5525500115
  qualified head = d93204f2bbc619d39f29bb13eccc2e680cb8fbd1
  qualified tree = 68e58b5aaab0cfd7fefebc2618d0aef47e351c99
  review = CodeRabbit 5527057254 + Cubic 5527076985
  merge = 598808fb611721fd8163b79c36676eded457ba91
  merge parent 1 = a224a0ad7c7adbf9dd879e1c4ac1ddfaceed6a38
  merge parent 2 = d93204f2bbc619d39f29bb13eccc2e680cb8fbd1
  merge tree = 68e58b5aaab0cfd7fefebc2618d0aef47e351c99
  merge verification = verified / valid
  post-merge Governance = 33765617586 / SUCCESS
  post-merge K2 = 33765617553 / SUCCESS
  post-merge proof = #310 / 5527154469
  reconciliation = #311 / b1ab1a16067e7d8a2bc720ccba475c6556d0525c
  reconciliation post-merge proof = #311 / 5527606835
```

The current canonical R17 blobs remain:

```text
packages/kodac-runtime/bench/p3-r17/contracts.ts = f425199ba3c1f097a7b1b12bea4c125c46592f95
packages/kodac-runtime/bench/p3-r17/late-chain-benchmark-provenance-substrate-qualification.ts = 150f4db6e438b3c35a06f2089c321f759073c207
packages/kodac-runtime/test/p3-r17-late-chain-benchmark-provenance-substrate-qualification.test.ts = 82139f2f12cf5a05f4e6b6f88a3ca5d8a22705f5
docs/planning/KODAC_P3_R17_LATE_CHAIN_BENCHMARK_PROVENANCE_SUBSTRATE_QUALIFICATION_EVIDENCE_2026-09-03.md = 14b5d7539043b67d037d3cbd4ec26da7a951f86d
```

Every implementation closure depended on exact-head machine qualification, independent substantive semantic review, zero unresolved actionable findings/threads, guarded normal merge and post-merge proof. Where a repair moved bytes, predecessor-head evidence remained stale. Where a workflow was canonically non-applicable, it remained non-applicable rather than being relabeled PASS.

---

## 6. Bounded R1-R17 meaning

```text
R1  = deterministic context-selection-plan foundation
R2  = deterministic caller-declared policy application
R3  = pairwise seven-metric evidence binding and comparability-only state
R4  = literal benchmark-provenance evidence binding
R5  = caller-declared criterion-match evidence
R6  = deterministic seven-dimension measurement materialization from one reconstructed policy application plus explicit caller evaluation facts
R7  = deterministic single-case binding of reconstructed R6 measurement evidence to one generated P2-R2 report
R8  = deterministic case-invariant strategy-subject identity plus exact single-case binding to canonical P3-R1/P3-R2 identities
R9  = deterministic ordered composition of exactly two independently reconstructed R7 reports under one exact R8 strategy subject
R10 = deterministic seven-dimension metric/unit alignment evidence for the two R9 members without arithmetic or directional semantics
R11 = deterministic binding of exactly seven explicit P2-R3-compatible reduction policies to that exact aligned pair without reducer execution
R12 = deterministic application of those exact policies to the exact trusted observations, emitting only per-dimension REDUCED or INSUFFICIENT_EVIDENCE reduction evidence
R13 = deterministic binding of exactly seven explicit HIGHER_IS_BETTER | LOWER_IS_BETTER directions while preserving complete trusted R12 evidence
R14 = deterministic controlled per-dimension comparison of exactly two distinct trusted reconstructed R13 records under matching controls, emitting COMPARABLE | INSUFFICIENT_EVIDENCE and raw finite unnormalized left-minus-right deltas only when comparable
R15 = deterministic derivation of one closed direction-aware relation per trusted R14 dimension while preserving complete R14 evidence
R16 = deterministic evaluation of exactly seven caller-declared allowed-relation criteria against trusted R15 relations, preserving complete R15 evidence and deriving only per-dimension criterion states plus one closed logical root state
R17 = deterministic qualification of trusted R16 criterion-match evidence against canonical R4 provenance on the same benchmark/protocol/context-selection task family, policy orientation and exactly two distinct case/R1 tuples using literal caller-owned provenance criteria
```

These are evidence mechanisms, not repository decisions.

---

## 7. Mandatory non-equivalences and preserved non-grants

```text
DETERMINISTIC PLAN != BETTER CONTEXT STRATEGY
CALLER POLICY / CRITERIA != REPOSITORY POLICY
PAIRWISE METRIC / DELTA / DIRECTIONAL EVIDENCE != GLOBAL WINNER / SUPERIORITY
LITERAL PROVENANCE != HOLDOUT SUFFICIENCY / UNBIASEDNESS / CONTAMINATION FREEDOM
EXACTLY TWO CASES != GENERAL / UNBOUNDED COMPOSITION
EXACT RAW EQUALITY != STATISTICAL OR PRACTICAL EQUIVALENCE
R17 SUBSTRATE BINDING != SAME EXACT EARLY/LATE PLAN / REQUEST / SHARED-EVALUATION / COMPARISON-POLICY CONTEXT
CRITERIA SATISFIED != PROMOTION / RECOMMENDATION / DEFAULT / RELEASE
P3 R1-R17 CLOSED != P3 OVERALL CLOSED
P3 R1-R17 CLOSED != GENERAL / PUBLIC KODACBENCH COMPLETE
P3 R1-R17 CLOSED != P3-R18+ AUTHORITY
P3 R1-R17 CLOSED != P4 AUTHORITY
P3 BOUNDED R1-R17 ENGINEERING CLOSEOUT != PROJECT COMPLETION
```

The closeout grants none of the following:

```text
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R18+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
P3 OVERALL CLOSURE = NOT_AUTHORIZED
GENERAL / PUBLIC KODACBENCH COMPLETION = NOT_ESTABLISHED
REAL BENCHMARK TASK / PARTICIPANT EXECUTION = NOT_AUTHORIZED
BENCHMARK CORPUS / MANIFEST / FIXTURE / RESULT MUTATION = NOT_AUTHORIZED
THREE-OR-MORE-CASE / UNBOUNDED COMPOSITION OR REDUCTION = NOT_AUTHORIZED
THREE-OR-MORE-STRATEGY / UNBOUNDED COMPARISON = NOT_AUTHORIZED
GLOBAL BETTER / WORSE / SUPERIOR / INFERIOR = NOT_AUTHORIZED
CROSS-DIMENSION AGGREGATE SCORE / WEIGHTING / MAJORITY / PARETO POLICY = NOT_AUTHORIZED
STATISTICS / SIGNIFICANCE / CONFIDENCE / P-VALUE / EFFECT-SIZE POLICY = NOT_AUTHORIZED
MULTI-STRATEGY RANKING / LEADERBOARD / PROMOTION = NOT_AUTHORIZED
REPOSITORY-OWNED DEFAULT / WINNER / STRATEGY PROMOTION = NOT_AUTHORIZED
HOLDOUT SUFFICIENCY / UNBIASEDNESS / CONTAMINATION-FREE CLAIM = NOT_AUTHORIZED
PROVIDER / MODEL / REVIEWER / EVALUATOR / TOOL / AGENT INVOCATION = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD = NOT_AUTHORIZED
TRAINING / FINE-TUNING / ONLINE LEARNING = NOT_AUTHORIZED
NEW DEPENDENCIES / DONOR INTAKE = NOT_AUTHORIZED
CLI / API / PRODUCT / AGENT-LOOP INTEGRATION = NOT_AUTHORIZED
PUBLIC SUPERIORITY CLAIM / RELEASE / PACKAGE PUBLICATION / BRAND LAUNCH = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## 8. Candidate-time qualification state

This file does not self-assert its own final Git identity, machine qualification, semantic-review verdicts, merge or post-merge results. Those must be captured from immutable live GitHub objects after repository-byte movement stops.

The exact closeout candidate must prove:

```text
BASE = current canonical main
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 6
FINAL_HEAD = LIVE GITHUB FACT / NOT SELF-ASSERTED HERE
FINAL_TREE = LIVE GITHUB FACT / NOT SELF-ASSERTED HERE
FINAL_SIX_BLOBS = LIVE GITHUB FACT / NOT SELF-ASSERTED HERE
APPLICABLE GOVERNANCE / K2 = TERMINAL SUCCESS OR CANONICALLY PROVEN NON-APPLICABLE
INDEPENDENT SUBSTANTIVE SEMANTIC REVIEW = 2 / 2 TERMINAL CLEAN
UNRESOLVED ACTIONABLE FINDINGS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET 20707483 = active / bypass_actors=[] / current_user_can_bypass=never
GUARDED NORMAL MERGE = exact expected_head_sha
POST_MERGE PROOF = main + ordered parents + tree + six blobs + signature + applicable checks + ruleset + merged PR state
WAIVER = NO
```

Any repository-byte or canonical-base movement invalidates prior exact-head qualification evidence.

Only after that full gate succeeds may the bounded closeout become canonical:

```text
P3-R1 THROUGH P3-R17 INDIVIDUAL NUMBERED SLICES = CLOSED_CANONICAL
P3 BOUNDED R1-R17 ENGINEERING SCOPE = CLOSED_CANONICAL
P3 OVERALL = OPEN
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
REAL BENCHMARK TASK EXECUTION = NOT_AUTHORIZED
P2-R6+ IMPLEMENTATION = NOT_AUTHORIZED
P3-R18+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
