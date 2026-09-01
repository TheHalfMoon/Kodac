# Kodac KDO H4-R3G-B Global-Deadline Lifecycle Test-Harness Repair Evidence — 2026-09-01

## 1. Evidence status

```text
DOCUMENT TYPE = TEST-HARNESS REPAIR / QUALIFICATION EVIDENCE CANDIDATE
H4-R3G-B PRODUCTION SEMANTICS = UNCHANGED
PRODUCTION RUNTIME MUTATION = NONE
TIMEOUT / DEADLINE WIDENING = NONE
WORKFLOW / RULESET MUTATION = NONE
P3-R8 POST-MERGE RECOVERY = PENDING EXACT REPAIR-MERGE PROOF
P3-R8 = NOT CLOSED_CANONICAL BY THIS CANDIDATE ALONE
P3-R9+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```

This record accompanies only the bounded H4-R3G-B Linux lifecycle test-harness repair authorized by canonical PR `#279`. The repair removes two fixture races without changing the production gateway, source-lineage contract, timeout values, generated child behavior, workflow, dependency set, or ruleset.

This candidate does not relabel either failed attempt of P3-R8 post-merge K2 run `33439529693`. A later successful full K2 run on the exact canonical repair merge is required before P3-R8 recovery may be recorded.

---

## 2. Canonical repair authority

The implementation candidate is based on exact canonical `main` after adoption of the repair authorization:

```text
AUTHORIZATION_PR = #279
AUTHORIZATION_QUALIFIED_HEAD = 445d441abe6fcc568ca9758e97a369b3f2dea813
AUTHORIZATION_QUALIFIED_TREE = d88e61fcb0fec698a21d4975cdb84ee07438dd5d
AUTHORIZATION_BLOB = 2973ee742bd34acc405cbc85b178777927254c40
AUTHORIZATION_MERGE / IMPLEMENTATION_BASE = eabdef572a2c4823f4f7cd0fc4442d1c818fbff1
AUTHORIZATION_MERGE_TREE = d88e61fcb0fec698a21d4975cdb84ee07438dd5d
AUTHORIZATION_MERGE_PARENT_1 = 576ac5d2b317fb90d1f0c6079d78cd3d899ca62d
AUTHORIZATION_MERGE_PARENT_2 = 445d441abe6fcc568ca9758e97a369b3f2dea813
AUTHORIZATION_MERGE_VERIFICATION = verified / valid
AUTHORIZATION_POST_MERGE_GOVERNANCE = 33442475291 / SUCCESS
AUTHORIZATION_POST_MERGE_PROVENANCE = 99653717429 / SUCCESS
AUTHORIZATION_POST_MERGE_LEGACY_TESTS = 99653717660 / SUCCESS
AUTHORIZATION_POST_MERGE_K2_PUSH = NOT_APPLICABLE_BY_DOCS_ONLY_PUSH_PATH_FILTER
AUTHORIZATION_POST_MERGE_PROOF_COMMENT = #279 / 5485020963
RULESET = 20707483 / active / bypass_actors=[] / current_user_can_bypass=never
WAIVER = NO
```

Canonical authorization permits exactly the two paths in Section 3 and no third path.

---

## 3. Exact authorized repair scope

```text
packages/kodac-runtime/test/kdo-h4-r3g-b-gvisor-source-lineage.test.ts
docs/planning/KODAC_KDO_H4_R3G_B_GLOBAL_DEADLINE_LIFECYCLE_TEST_HARNESS_REPAIR_EVIDENCE_2026-09-01.md
```

No production source, workflow, dependency, lockfile, historical authorization/evidence, P3-R8 implementation/evidence, roadmap, milestone, status, ruleset, or unrelated test path is authorized to change.

---

## 4. Preserved production cleanup theorem

The canonical production theorem remains unchanged:

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

The TERM grace remains bounded by the remaining global monotonic deadline:

```text
effective TERM grace = min(ctrTerminateGraceMs, remaining global deadline)
```

At exact global expiry the effective grace may be zero. The production gateway still requests SIGTERM first, may immediately request SIGKILL if the child remains live, and awaits close/reap before returning failure. This repair changes only how the fixture observes that behavior.

---

## 5. Repair A — complete canonical PID readiness

The prior helper treated pathname existence as PID readiness. The generated C fixture creates the file before its PID bytes are necessarily complete, so an immediate JavaScript read could observe empty or partial content.

The repaired helper uses one shared bounded readiness predicate for both the sandbox PID and exact fake `ctr` PID:

```text
read complete UTF-8 content
-> require exactly /^[1-9][0-9]*\n$/
-> remove the terminal newline
-> convert to Number
-> require positive Number.isSafeInteger(...)
-> return the PID
```

Missing (`ENOENT`), empty, partial, malformed, zero, negative, noncanonical, or unsafe-integer content remains not ready and continues the existing bounded polling loop. Any other filesystem error fails immediately. Exhausting the finite bound fails the test fixture.

The same helper is used at both publication boundaries, so neither the sandbox identity nor the `ctr` lifecycle identity may be consumed from an existence-only file.

The pure readiness test rejects at least:

```text
empty content
newline only
positive digits without the publication newline
zero
negative and explicitly signed values
leading-zero forms
embedded whitespace
trailing content
values outside the JavaScript safe-integer range
```

It accepts canonical positive safe-integer publications including `1\n` and `12345\n`.

---

## 6. Repair B — direct exact-child termination-request proof

The global-deadline case no longer treats execution of the child process's user-space SIGTERM handler as proof that the gateway requested SIGTERM. At zero remaining grace, SIGKILL may terminate the child before that handler writes its marker even when the gateway invoked `ChildProcess.kill("SIGTERM")` first.

For only the global-deadline helper invocation, the fixture now:

1. captures the exact `ChildProcess.prototype.kill` property descriptor;
2. installs a descriptor-preserving wrapper;
3. records each requested signal with the receiver's PID;
4. delegates to the exact original method;
5. filters observations to the published exact fake `ctr` PID; and
6. restores the exact original property descriptor in the helper's `finally` block.

The global-deadline proof requires:

```text
failure message = total monotonic observation deadline expired
first recorded termination request for exact ctr PID = SIGTERM
if SIGKILL is recorded for exact ctr PID, its index is after SIGTERM
exact ctr PID is absent before gateway failure returns
durable source evidence commit count = 0
ChildProcess.prototype.kill descriptor = exactly restored
```

The common exact-child absence assertion remains inside the helper before it returns the gateway failure. It is not deferred to fixture teardown.

---

## 7. Partial-output discard boundary

The global-deadline case uses the existing `late-output` fixture mode. That mode writes an incomplete JSON prefix to stdout before the deadline is forced, then pauses. Its SIGTERM handler would write the suffix only if user-space scheduling permits.

The test does not require that handler to run at zero remaining grace. It instead requires the global-deadline failure and zero evidence commits after an already-emitted partial prefix. Therefore the prefix cannot become source-lineage evidence whether cleanup ends through SIGTERM handling or immediate SIGKILL escalation.

The separate nonzero-grace late-output timeout case continues to require the child-side TERM and late-output markers, failure, exact-child reap, and zero commits.

---

## 8. Preserved lifecycle cases

The repair retains the existing Linux lifecycle cases and their common exact-child reap assertion:

```text
PER-CALL TIMEOUT
  -> child-side TERM marker observed
  -> exact ctr child absent before failure returns
  -> commit count = 0

TERM-IGNORING CHILD
  -> child-side TERM marker observed
  -> SIGKILL cleanup remains exercised
  -> exact ctr child absent before failure returns
  -> commit count = 0

CANCELLATION
  -> child-side TERM marker observed
  -> exact ctr child absent before failure returns
  -> commit count = 0

LATE PARTIAL OUTPUT
  -> child-side TERM and late-output markers observed
  -> exact ctr child absent before failure returns
  -> commit count = 0

GLOBAL DEADLINE
  -> direct exact-child SIGTERM request observed first
  -> optional SIGKILL only after SIGTERM
  -> exact ctr child absent before failure returns
  -> incomplete stdout cannot commit
  -> commit count = 0
```

No lifecycle test is deleted, skipped on Linux, renamed away, or conditionally bypassed.

---

## 9. Local candidate validation

Local validation on the implementation worktree records:

```text
git diff --check = SUCCESS
TypeScript 5.9.3 + @types/node 24.3.0 strict no-emit typecheck = SUCCESS
focused H4-R3G-B test file = SUCCESS
focused tests = 29
focused pass = 19
focused fail = 0
focused skipped = 10
full local runtime test suite = SUCCESS
full local runtime tests = 1354
full local runtime pass = 1252
full local runtime fail = 0
full local runtime skipped = 102
patch benchmark hook = SUCCESS
provenance validation = SUCCESS / imports=1 / authorizations=1 / main_adoptions=1
legacy pytest = SUCCESS / 395 passed
legacy ruff = SUCCESS
```

The local host uses Node `22.22.3` on macOS while the repository contract requires Node 24. The typecheck succeeds against Node 24 types, and the pure PID readiness case executes locally. Linux-only lifecycle cases are truthfully skipped locally. This evidence therefore does not substitute for exact-head GitHub Ubuntu/Node 24 execution.

These local results are supporting evidence only. Exact-head GitHub Governance and the complete K2 Node 24 matrix remain required before merge and must be recorded from their actual terminal results.

---

## 10. Required exact-head qualification

Do not merge this candidate until one frozen exact head proves all of the following:

- canonical `main` remains the exact Section 2 implementation base or the branch is forward-reconciled and fully requalified;
- `behind_by=0`;
- changed-file set is exactly the two Section 3 paths;
- no production, workflow, dependency, lockfile, roadmap, status, ruleset, P3-R8, or unrelated test byte changed;
- exact candidate head, tree, and two Git blobs are captured;
- Node 24 strict TypeScript typecheck succeeds;
- the focused H4-R3G-B file executes its Linux lifecycle cases successfully on Ubuntu;
- the full runtime test suite succeeds on Ubuntu, macOS, and Windows;
- the patch benchmark hook succeeds;
- Governance `provenance` and `legacy-tests` are terminal success on the exact head;
- K2 classifier, Ubuntu/macOS/Windows runtime matrix, and stable `k2-runtime-gate` are terminal success on the exact head;
- Ubuntu logs show the repaired H4-R3G-B lifecycle test and all P3-R8 tests passing;
- at least two distinct independently operated external substantive semantic reviewer/model-system channels are terminal-clean on the exact head and current PR metadata;
- status-only, summary-only, billing-blocked, rate-limited, service-error, stale-head, invocation-only, self-review, human-only, or non-substantive output does not count;
- unresolved material findings = 0;
- unresolved actionable review threads = 0;
- ruleset `20707483` remains active with `bypass_actors=[]` and `current_user_can_bypass=never`;
- guarded normal merge uses the exact expected head; and
- `WAIVER=NO`.

Any repository-byte or base movement invalidates earlier exact-head CI and semantic-review evidence.

---

## 11. Mandatory post-merge repair and P3-R8 recovery proof

After guarded merge, do not declare this repair or P3-R8 closed until all of the following are rederived from live GitHub truth:

1. canonical `main` equals the exact repair merge;
2. the merge has the correct ordered parents and qualified tree;
3. the exact test and evidence blobs match the qualified candidate;
4. the GitHub merge signature is verified and valid;
5. PR state is merged and no contradictory open review thread or check exists;
6. post-merge Governance succeeds where applicable;
7. post-merge K2 succeeds for classifier, Ubuntu, macOS, Windows, and stable gate on the exact repair merge;
8. Ubuntu logs show all repaired H4-R3G-B lifecycle cases and all P3-R8 tests passing;
9. the four P3-R8 implementation blobs are byte-identical to PR `#278`'s qualified blobs;
10. ruleset `20707483` remains active with no bypass; and
11. `WAIVER=NO`.

Only that conjunction may establish:

```text
H4_R3G_B_GLOBAL_DEADLINE_LIFECYCLE_TEST_HARNESS_REPAIR = CLOSED_CANONICAL
P3_R8_POST_MERGE_K2_RECOVERY_PROOF = SUCCESS_ON_CANONICAL_REPAIR_MERGE
```

Run `33439529693` remains `failure`, including both failed Ubuntu attempts. Recovery evidence neither erases nor reclassifies it.

Only after the remaining PR `#278` merge identity, signature, Governance, unchanged blobs, review/check state, and ruleset facts are also reverified may P3-R8 be declared `CLOSED_CANONICAL` and the five-path current-view roadmap reconciliation begin.

---

## 12. Preserved non-grants

```text
PRODUCTION GATEWAY / SOURCE-LINEAGE MUTATION = NOT_AUTHORIZED
TIMEOUT / DEADLINE / TERMINATION-GRACE WIDENING = NOT_AUTHORIZED
LATE STDOUT / STDERR ACCEPTANCE AS EVIDENCE = NOT_AUTHORIZED
CHILD SURVIVAL AFTER GATEWAY FAILURE RETURN = NOT_AUTHORIZED
FAILED INVOCATION SUCCESS OR EVIDENCE COMMIT = NOT_AUTHORIZED
SLEEP-ONLY STABILIZATION = NOT_AUTHORIZED
WORKFLOW / NODE / DEPENDENCY / LOCKFILE MUTATION = NOT_AUTHORIZED
HISTORICAL FAILURE RELABELING = NOT_AUTHORIZED
P3-R8 IMPLEMENTATION-BYTE MUTATION = NOT_AUTHORIZED
ROADMAP / MILESTONE / STATUS MUTATION BEFORE RECOVERY = NOT_AUTHORIZED
PROVIDER / MODEL / EVALUATOR EXECUTION = NOT_AUTHORIZED
NETWORK / SECRET / PERSISTENCE / TELEMETRY / UPLOAD EXPANSION = NOT_AUTHORIZED
BENCHMARK CORPUS / RESULT / SCORE / RANKING / PROMOTION MUTATION = NOT_AUTHORIZED
PRODUCT / RELEASE / PACKAGE / PUBLIC SUPERIORITY CLAIM = NOT_AUTHORIZED
P3-R9+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
WAIVER = NO
```
