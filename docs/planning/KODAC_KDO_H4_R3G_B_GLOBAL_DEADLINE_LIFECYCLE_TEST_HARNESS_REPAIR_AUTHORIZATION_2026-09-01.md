# Kodac KDO H4-R3G-B Global-Deadline Lifecycle Test-Harness Repair Authorization — 2026-09-01

## 1. Authority status

```text
CLASS = DOCUMENTATION / POST-MERGE TEST-HARNESS REPAIR AUTHORIZATION CANDIDATE
ACTIVE REPAIR IMPLEMENTATION AUTHORITY = NONE UNTIL THIS EXACT RECORD BECOMES CANONICAL
PRODUCTION RUNTIME MUTATION = NONE
TIMEOUT / DEADLINE WIDENING = NONE
WORKFLOW / RULESET MUTATION = NONE
P3-R9+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

This record proposes one test-only repair for two independently proven races in the historical H4-R3G-B Linux lifecycle fixture. It is not effective repair authority while it exists only on a branch or pull request. It becomes effective only after its own exact-head qualification, guarded normal merge, and complete post-merge adoption proof.

This record does not reclassify any failed workflow attempt as successful. It preserves the failed P3-R8 post-merge K2 evidence and defines the narrow later recovery proof required before P3-R8 may close.

---

## 2. Exact live canonical baseline

```text
REPOSITORY = TheHalfMoon/Kodac
CANONICAL_MAIN = 576ac5d2b317fb90d1f0c6079d78cd3d899ca62d
CANONICAL_TREE = 9e668ba63f2ab24843aa3a12657441b164d426bd

P3_R8_IMPLEMENTATION_PR = #278
P3_R8_QUALIFIED_HEAD = 55bee850de7e38cba2c54c13000dd6f8447f7f4c
P3_R8_MERGE = 576ac5d2b317fb90d1f0c6079d78cd3d899ca62d
P3_R8_IMPLEMENTATION = MERGED
P3_R8_POST_MERGE_PROOF = BLOCKED
P3_R8 = NOT_CLOSED_CANONICAL

ACTIVE_RULESET = 20707483
RULESET_ENFORCEMENT = active
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
WAIVER = NO
```

Live GitHub also contains one unrelated open PR, `#163`, at head `e5b9ea66ca47b6956f8928055ea10f2cbe3447b1`. It is behind current `main`, changes one unrelated H4-R4B review-reconciliation document, and grants no authority to this repair.

---

## 3. Governing canonical records and exact bytes

The H4-R3G-B implementation authority was exercised and merged through PR `#109`. It is historical bounded authority, not an open-ended grant for later mutation.

```text
H4_R3G_B_IMPLEMENTATION_PR = #109
H4_R3G_B_IMPLEMENTATION_HEAD = 1faa84f8a3c00b5fe1803d5f49b1fc84403a26b1
H4_R3G_B_IMPLEMENTATION_MERGE = 2197bc9fa98ff236c2d3d0aa3f5614dfafdfdd29
```

Canonical governing document blobs at the current baseline are:

```text
docs/planning/KODAC_KDO_H4_R3G_B_IMMUTABLE_SOURCE_ROOTFS_PHYSICAL_LINEAGE_AUTHORIZATION_2026-08-16.md
  0d3cd1591eccb89b2c44a548ee5ac2d91d2955a1

docs/planning/KODAC_KDO_H4_R3G_B_R3G_A_R3F_PROTECTED_BLOB_PIN_ALLOWLIST_CORRECTION_2026-08-16.md
  798ff659b12e84b9395b44b34e66b190b24dc857

docs/planning/KODAC_KDO_H4_R3G_B_REPLAY_SAFE_DURABLE_PUT_FRESH_OBSERVATION_SEMANTICS_CORRECTION_2026-08-16.md
  010b8bde5c3f89718f3f8e259bf4ffba22a9bf29

docs/planning/KODAC_KDO_H4_R3G_B_IMMUTABLE_SOURCE_ROOTFS_PHYSICAL_LINEAGE_EVIDENCE_2026-08-16.md
  0d085a593be02fd79924240cd032ff4c3b2b97d5
```

Relevant canonical implementation and workflow blobs are:

```text
packages/kodac-runtime/src/execution/gateway.ts
  1732dae059fc878c04e6b1bb6a117385efe9ed6a

packages/kodac-runtime/src/trust/sandbox-observer-gvisor-source-lineage.ts
  2421da43286bdeb254a86ab2e8b4f02fce0afb6c

packages/kodac-runtime/test/kdo-h4-r3g-b-gvisor-source-lineage.test.ts
  c37aba5c1a217a2ba5d367258d1aa7443639cf48

.github/workflows/k2-runtime.yml
  f8d39b5f0e660de513976c5e58b6730e789fad20
```

The P3-R8 authorization and implementation-evidence blobs are unchanged and remain controlling for P3-R8:

```text
P3_R8_AUTHORIZATION_BLOB = 0aca958a000b195313d9c4f88c4d036bcda7c030
P3_R8_IMPLEMENTATION_EVIDENCE_BLOB = 65ea4dbeb8f976b6639e4cb61699741e226093b4
```

---

## 4. Preserved H4-R3G-B cleanup theorem

The canonical theorem remains:

```text
GLOBAL DEADLINE / PER-CALL TIMEOUT / CANCELLATION
-> STOP ACCEPTING STDOUT / STDERR AS EVIDENCE
-> REQUEST SIGTERM
-> WAIT ONLY WITHIN THE CANONICAL EFFECTIVE GRACE BOUND
-> REQUEST SIGKILL IF STILL LIVE
-> AWAIT CHILD CLOSE / REAP
-> DISCARD PARTIAL OUTPUT
-> RETURN FAILURE ONLY AFTER REAP
```

The gateway must not return from the child-operation boundary while the child remains unreaped. No late output may become evidence. No failed invocation may commit evidence or become success.

This repair does not alter the production interpretation canonically adopted during PR `#109`: the TERM grace itself is bounded by the remaining global monotonic deadline. Exact commit `5bc7a945ac13bcb92602e26e50aa0b85ae855cfb` introduced that behavior after manual review required:

```text
effective TERM grace = min(ctrTerminateGraceMs, remaining global deadline)
```

At exact global expiry the effective grace may therefore be zero. The gateway must still request SIGTERM first, may immediately request SIGKILL if the child remains live, and must await close/reap before returning failure.

---

## 5. Exact failed post-merge evidence

Mandatory P3-R8 post-merge K2 run:

```text
RUN_ID = 33439529693
HEAD_SHA = 576ac5d2b317fb90d1f0c6079d78cd3d899ca62d
RUN_ATTEMPTS = 2
FINAL_CONCLUSION = failure
```

Attempt 1:

```text
UBUNTU_JOB = 99644102782 / failure
MACOS = success
WINDOWS = success
RUNTIME_CHANGE_CLASSIFIER = success
K2_RUNTIME_GATE = failure
TESTS = 1354
PASS = 1349
FAIL = 1
SKIPPED = 4
```

The only failed test was:

```text
H4-R3G-B global deadline expiry during ctr reaps the child before returning failure
```

The exact assertion stack ended at test line `1285`, which is:

```text
assert.equal(result.termObserved, true)
```

The common helper's later `processAlive(ctrPid) == false` assertion did not fail in this attempt. The evidence therefore does not show an unreaped child.

Attempt 2 reran the failed Ubuntu job on the same merge SHA:

```text
UBUNTU_JOB = 99645645364 / failure
K2_RUNTIME_GATE = 99645901112 / failure
```

It failed earlier in the same test at line `1108`:

```text
assert.equal(Number.isSafeInteger(sandboxPid) && sandboxPid > 0, true)
```

This second failure occurred before the global-deadline `ctr` cleanup assertion was reached. It is a distinct fixture-readiness race, not a repeated observation that a `ctr` child remained live.

All P3-R8 tests passed in both failed Ubuntu attempts. The P3-R8 paths do not modify the H4-R3G-B gateway, source-lineage contract, or lifecycle test.

---

## 6. Proven root cause A — child-side marker is not the request boundary

The global-deadline test forces the monotonic clock beyond `deadlineNs` and invokes the captured global deadline callback while the fake `ctr` child is active.

Production cleanup then performs:

```text
child.kill("SIGTERM")
remainingGlobalMs = 0
effectiveMilliseconds = min(ctrTerminateGraceMs, 0) = 0
zero-delay escalation timer
child.kill("SIGKILL") if Node still reports the child live
await closePromise
```

The test currently treats a file written by the fake child's SIGTERM handler as proof that the gateway requested SIGTERM. That is not equivalent at zero remaining grace. Scheduler ordering may allow SIGKILL to terminate the child before its user-space SIGTERM handler writes the marker even though the gateway invoked `child.kill("SIGTERM")` first.

This exact timing-sensitive assertion previously failed at line `1285` in K2 run `32921916659` attempt 1 and then passed on the unchanged SHA in attempt 2. It passed again in PR `#278` pre-merge Ubuntu job `99642474163`, then failed in post-merge run `33439529693` attempt 1. The repeated history proves that the marker is scheduling-sensitive under unchanged canonical bytes.

The correct proof boundary for canonical step `request termination with SIGTERM` is the exact `ChildProcess.kill("SIGTERM")` request on the exact fake `ctr` child. Child absence after gateway failure remains the independent reap proof.

---

## 7. Proven root cause B — existence is weaker than complete PID publication

The fixture helper currently waits only for:

```text
fs.existsSync(pidFile) == true
```

The generated C fixtures publish a PID through a sequence equivalent to:

```text
fopen(path, "w")
fprintf(file, "%ld\n", getpid())
fclose(file)
```

`fopen(..., "w")` creates the file before `fprintf` completes. The JavaScript helper may therefore observe existence and immediately read empty or incomplete bytes. Attempt 2's exact line `1108` failure is consistent with and directly explained by that publication gap.

The correct readiness condition is a completely parsed canonical positive safe-integer PID, not pathname existence.

---

## 8. Exact authorization-candidate path

This documentation-only authorization candidate may add exactly one path:

```text
docs/planning/KODAC_KDO_H4_R3G_B_GLOBAL_DEADLINE_LIFECYCLE_TEST_HARNESS_REPAIR_AUTHORIZATION_2026-09-01.md
```

No source, test, workflow, dependency, roadmap, status, evidence-ledger, or ruleset path may change in this authorization-adoption PR.

---

## 9. Exact future repair allowlist

If and only if this record becomes canonical and post-merge proven, one future test-harness repair candidate may modify exactly:

```text
packages/kodac-runtime/test/kdo-h4-r3g-b-gvisor-source-lineage.test.ts
docs/planning/KODAC_KDO_H4_R3G_B_GLOBAL_DEADLINE_LIFECYCLE_TEST_HARNESS_REPAIR_EVIDENCE_2026-09-01.md
```

No third path is authorized.

In particular, this repair does not authorize modification of:

```text
packages/kodac-runtime/src/execution/gateway.ts
packages/kodac-runtime/src/trust/sandbox-observer-gvisor-source-lineage.ts
.github/workflows/*
package.json / lockfiles / dependencies
historical H4 authorization or evidence records
P3-R8 implementation or evidence paths
roadmap / milestone / status paths
rulesets
```

If implementation proves that a production path is required, stop and return to a new authorization candidate. Do not expand this allowlist by implication.

---

## 10. Required test-harness repair

The future repair must do both and only both of the following semantic repairs.

### 10.1 Complete PID readiness

For both the sandbox PID file and `ctr` PID file, readiness must require successful parsing of complete content into a positive safe integer. Missing, empty, partial, malformed, zero, negative, or unsafe-integer content is not ready and must continue bounded polling.

The polling loop must retain a finite bound and fail if a complete valid PID is never published. It must not widen production timeouts or alter generated process behavior.

### 10.2 Direct exact-child termination-request proof

For the global-deadline lifecycle case, the fixture must directly record termination requests made through the Node `ChildProcess.kill` boundary and bind the observation to the exact fake `ctr` PID.

The proof must require:

```text
first recorded termination request for exact ctr PID = SIGTERM
gateway failure message matches total monotonic observation deadline expired
exact ctr PID is not alive before gateway failure returns
durable source evidence commit count = 0
```

If a later `SIGKILL` request is observed for the same PID, it must occur only after the recorded SIGTERM request.

Any temporary method/prototype instrumentation must preserve and restore the exact original property descriptor in `finally`, must be scoped to the single helper invocation, and must not leak across tests or alter production repository code.

The existing child-side TERM marker remains valid evidence in the per-call-timeout, cancellation, and late-output cases where nonzero grace exists. The global-deadline case must not use user-space handler scheduling as a substitute for direct proof of the gateway's termination request.

The existing common helper assertion that the exact `ctr` PID is gone before gateway failure returns must remain. It may not be deleted, skipped, delayed until fixture teardown, or replaced with a weaker assertion.

---

## 11. Required repair tests and gates

The future exact-head repair must prove at least:

```text
SANDBOX_PID_READINESS_REJECTS_EMPTY_OR_PARTIAL_PUBLICATION
CTR_PID_READINESS_REJECTS_EMPTY_OR_PARTIAL_PUBLICATION
GLOBAL_DEADLINE_RECORDS_EXACT_CTR_SIGTERM_REQUEST_FIRST
GLOBAL_DEADLINE_REAPS_EXACT_CTR_BEFORE_FAILURE_RETURNS
GLOBAL_DEADLINE_DISCARDS_PARTIAL_OUTPUT
GLOBAL_DEADLINE_COMMITS_ZERO_EVIDENCE
PER_CALL_TIMEOUT_TERM_AND_REAP = PRESERVED
TERM_IGNORED_KILL_AND_REAP = PRESERVED
CANCELLATION_TERM_AND_REAP = PRESERVED
LATE_OUTPUT_DISCARD = PRESERVED
TEMPORARY_INSTRUMENTATION_RESTORED = PROVEN
```

Qualification must include:

```text
Node 24 TypeScript typecheck
focused Linux H4-R3G-B test file
full runtime test suite
patch benchmark hook
Governance provenance + legacy-tests
K2 classifier + Ubuntu/macOS/Windows runtime matrix + stable gate
```

A green non-Linux skip is not sufficient for the focused lifecycle proof. Ubuntu must execute and pass the Linux cases.

---

## 12. Preserved semantics and explicit non-grants

The repair must not:

```text
delete, skip, rename away, or conditionally bypass the failing test
remove the exact-child absence assertion
remove SIGTERM-before-SIGKILL ordering proof
increase totalObservationTimeoutMs, ctrTimeoutMs, or ctrTerminateGraceMs
change production gateway cleanup ordering
accept late stdout/stderr as evidence
allow a child to outlive gateway failure return
convert failure into success
permit any evidence commit in hostile cleanup cases
add sleep-only stabilization as a substitute for an observable readiness predicate
add a dependency
change Node, workflow, K2, ruleset, or bypass configuration
modify P3-R8 bytes
claim the failed K2 attempts passed
authorize P3-R9+ or P4-P8 implementation
take a waiver
```

No provider/model/evaluator execution, network authority, secret access, persistence expansion, telemetry, upload, benchmark execution, corpus mutation, ranking, promotion, product integration, package publication, or public superiority claim is granted.

---

## 13. P3-R8 post-merge recovery proof

Run `33439529693` remains permanently recorded as `failure`. It must never be relabeled or summarized as successful.

Because a canonical repair necessarily creates a later `main` SHA, the repair merge's mandatory post-merge K2 run is the only acceptable recovery proof under this record. It may unblock P3-R8 only if all of the following are proven together:

1. the repair authorization is canonical and post-merge proven;
2. the repair implementation changed exactly the two Section 9 paths;
3. canonical `main` equals the exact repair merge;
4. the repair merge has correct ordered parents, qualified tree, exact two blobs, and verified/valid GitHub signature;
5. the four canonical P3-R8 implementation blobs at the repair merge are byte-identical to PR `#278`'s qualified blobs;
6. post-repair Governance succeeds where applicable;
7. post-repair K2 on the exact repair merge succeeds for classifier, Ubuntu, macOS, Windows, and stable gate;
8. Ubuntu logs show the repaired H4-R3G-B lifecycle test and all P3-R8 tests passing;
9. no contradictory open review thread, check, PR state, or ruleset state exists;
10. ruleset `20707483` remains active with no bypass;
11. `WAIVER=NO`.

Only that conjunction may be recorded as:

```text
P3_R8_POST_MERGE_K2_RECOVERY_PROOF = SUCCESS_ON_CANONICAL_REPAIR_MERGE
```

It does not make run `33439529693` successful and does not erase either failed attempt.

Only after this recovery proof and the remaining PR `#278` post-merge identity/signature/Governance/ruleset facts are reverified may P3-R8 be declared `CLOSED_CANONICAL` and its five-path current-view roadmap reconciliation begin.

This record itself does not authorize that roadmap reconciliation before the recovery proof succeeds.

---

## 14. Authorization adoption gate

This one-path documentation candidate must not merge until one frozen exact head proves:

1. canonical `main` remains the exact Section 2 baseline or the branch is forward-reconciled and fully requalified;
2. `behind_by=0`;
3. exactly one changed path: this authorization record;
4. exact candidate head, tree, and document blob are captured;
5. `git diff --check` succeeds;
6. Governance `provenance` and `legacy-tests` are terminal success;
7. K2 classifier and stable gate are terminal success, with the runtime matrix truthfully recorded as skipped/non-applicable for the docs-only PR when observed;
8. at least two distinct independently operated external substantive semantic review channels are terminal-clean on the exact head and current PR metadata;
9. billing errors, service errors, invocation acknowledgments, status-only replies, summaries without substantive audit, stale-head reviews, rate-limit messages, or silent reviewers do not count;
10. zero unresolved actionable material findings and zero unresolved actionable review threads;
11. ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never`;
12. guarded normal merge uses the exact expected head;
13. mandatory post-merge canonical main, ordered parents, tree, authorization blob, verified signature, applicable checks, merged PR state, and ruleset proof completes;
14. `WAIVER=NO`.

Any repository-byte movement invalidates prior exact-head CI and semantic review evidence. Any material PR metadata movement requires fresh semantic review against the current metadata.

---

## 15. Future repair qualification and merge gate

The later two-path repair must not merge until one frozen exact head proves:

1. its base is the exact canonical merge of this authorization;
2. `behind_by=0`;
3. changed-file containment is exactly the two Section 9 paths;
4. no production, workflow, dependency, lockfile, roadmap, status, ruleset, P3-R8, or unrelated test byte changed;
5. the Section 10 behavior is implemented exactly;
6. every Section 11 test/gate is terminal success;
7. exact head, tree, and two blobs are captured;
8. at least two distinct independent substantive semantic review channels are terminal-clean on exact head/current metadata;
9. zero unresolved actionable material findings and review threads;
10. active no-bypass ruleset preflight succeeds;
11. guarded normal merge uses the exact expected head;
12. mandatory post-merge identity, parents, tree, blobs, signature, Governance, full K2, P3-R8 blob preservation, PR state, and ruleset proof succeeds;
13. `WAIVER=NO`.

No force-push, rebase, destructive history rewrite, stale evidence reuse, silent waiver, or merge bypass is permitted.

---

## 16. Canonical effect if fully adopted

Only after this exact record is merged and completely post-merge proven may the following become true:

```text
H4_R3G_B_GLOBAL_DEADLINE_LIFECYCLE_TEST_HARNESS_REPAIR = AUTHORIZED
REPAIR_ALLOWLIST = EXACTLY TWO PATHS IN SECTION 9
PRODUCTION_GATEWAY_MUTATION = NOT_AUTHORIZED
TIMEOUT_WIDENING = NOT_AUTHORIZED
P3_R8 = STILL_NOT_CLOSED_CANONICAL UNTIL SECTION 13 RECOVERY PROOF SUCCEEDS
P3_R9+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

Until then:

```text
H4_R3G_B_GLOBAL_DEADLINE_LIFECYCLE_TEST_HARNESS_REPAIR = NOT_AUTHORIZED
```
