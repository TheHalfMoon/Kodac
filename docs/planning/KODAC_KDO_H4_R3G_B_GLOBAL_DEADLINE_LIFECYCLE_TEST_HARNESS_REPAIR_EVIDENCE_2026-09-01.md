# Kodac KDO H4-R3G-B Global-Deadline Lifecycle Test-Harness Repair Evidence — 2026-09-01

## Status

```text
CLASS = IMPLEMENTATION EVIDENCE CANDIDATE
CANONICAL = NO
QUALIFIED = NO
MERGED = NO
P3_R8_RECOVERY_PROOF = NOT_COMPLETE
WAIVER = NO
```

This candidate records the bounded test-harness repair authorized by the canonical document:

```text
docs/planning/KODAC_KDO_H4_R3G_B_GLOBAL_DEADLINE_LIFECYCLE_TEST_HARNESS_REPAIR_AUTHORIZATION_2026-09-01.md
```

The authorization became canonical through PR #279.

## Canonical base

```text
REPOSITORY = TheHalfMoon/Kodac
BASE_MAIN = eabdef572a2c4823f4f7cd0fc4442d1c818fbff1
BASE_TREE = d88e61fcb0fec698a21d4975cdb84ee07438dd5d
AUTHORIZATION_PR = #279
AUTHORIZATION_QUALIFIED_HEAD = 445d441abe6fcc568ca9758e97a369b3f2dea813
AUTHORIZATION_MERGE = eabdef572a2c4823f4f7cd0fc4442d1c818fbff1
ACTIVE_RULESET = 20707483
RULESET_ENFORCEMENT = active
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = never
WAIVER = NO
```

## Exact repair allowlist

The final repair candidate is limited to exactly these two paths:

```text
packages/kodac-runtime/test/kdo-h4-r3g-b-gvisor-source-lineage.test.ts
docs/planning/KODAC_KDO_H4_R3G_B_GLOBAL_DEADLINE_LIFECYCLE_TEST_HARNESS_REPAIR_EVIDENCE_2026-09-01.md
```

No production runtime, workflow, dependency, roadmap, status, ruleset, P3-R8 implementation, benchmark corpus, provider/model, persistence, product, or release path is authorized.

## Required semantic repair

The test harness must preserve production semantics and repair only the two proven fixture races:

1. PID readiness must require a fully parsed positive safe-integer PID rather than pathname existence alone.
2. The global-deadline case must prove the first termination request issued to the exact fake `ctr` child is `SIGTERM` at the Node `ChildProcess.kill` boundary, while retaining the independent assertion that the exact child is gone before gateway failure returns.

If a later `SIGKILL` request is observed for the exact child, it must occur only after `SIGTERM`.

Temporary instrumentation must restore the exact original property descriptor in `finally` and must not leak across tests.

The existing per-call timeout, TERM-ignored escalation, cancellation, late-output discard, exact-child reap, and zero-evidence-commit semantics must remain intact.

## Required qualification

This evidence candidate must be completed only from exact live results on one frozen final head:

```text
BEHIND_BY = PENDING
CHANGED_PATHS = PENDING
TEST_BLOB = PENDING
EVIDENCE_BLOB = PENDING
TREE = PENDING
TYPECHECK = PENDING
FOCUSED_LINUX_H4_R3G_B = PENDING
FULL_RUNTIME_TEST_SUITE = PENDING
PATCH_BENCHMARK_HOOK = PENDING
GOVERNANCE_PROVENANCE = PENDING
GOVERNANCE_LEGACY_TESTS = PENDING
K2_CLASSIFIER = PENDING
K2_UBUNTU = PENDING
K2_MACOS = PENDING
K2_WINDOWS = PENDING
K2_RUNTIME_GATE = PENDING
SEMANTIC_REVIEW_CHANNEL_1 = PENDING
SEMANTIC_REVIEW_CHANNEL_2 = PENDING
UNRESOLVED_ACTIONABLE_THREADS = PENDING
MATERIAL_FINDINGS = PENDING
RULESET = 20707483 / active / no bypass
WAIVER = NO
```

No pending field may be relabeled as successful without exact-head evidence.

## P3-R8 recovery boundary

Historical post-merge K2 run `33439529693` remains `failure` and must never be reclassified.

Only a later guarded merge of the qualified two-path repair followed by successful mandatory post-merge Governance/K2 proof on canonical `main`, with exact parents/tree/blobs/signature/ruleset evidence, may satisfy the recovery proof required before P3-R8 can become `CLOSED_CANONICAL`.

Until then:

```text
P3_R8 = NOT_CLOSED_CANONICAL
P3_R9+ IMPLEMENTATION = NOT_AUTHORIZED
P4-P8 IMPLEMENTATION = NOT_AUTHORIZED
WAIVER = NO
```
