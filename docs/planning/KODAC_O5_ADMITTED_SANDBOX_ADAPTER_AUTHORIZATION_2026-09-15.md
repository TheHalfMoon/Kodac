# Kodac O5 Admitted Sandbox Adapter Authorization - 2026-09-15

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / IMPLEMENTATION AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
RESEQUENCING_AUTHORITY = CLOSED_CANONICAL / PR #637 / merge 51f634b5226ca67b8229dc2f8c27209ec7506db1
CANONICAL_BASE = 406b335277f2df1e3dedf24cdb45847dff919d44
CANONICAL_BASE_TREE = 0213c3ffc952336b92ab0fc03f62937396619133
POST_INTAKE_REAUDIT = MERGED / PR #652 / merge 406b335277f2df1e3dedf24cdb45847dff919d44
CURRENT_LEDGER = PROVEN 12 / PARTIAL 11 / MISSING 0 / NOT_APPLICABLE 2 / TOTAL 25
ROW_IN_PLAY = ADMITTED_SANDBOX_CLEANUP_PROOF / PARTIAL_CANONICAL
O4_LIVE_PROOF = DEFERRED_EXTERNAL_EDGE / POST_BUDGET 0 / UNCHANGED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This is a one-path authorization candidate only. It grants no source, test, schema,
workflow, dependency, provider, persistence, release, or deployment mutation until it
independently qualifies, receives substantive exact-head review, merges through
protected `main` with an expected-head guard, and receives external post-merge proof.

## Exact authorization-candidate scope

This authorization candidate may modify exactly one repository path:

```text
docs/planning/KODAC_O5_ADMITTED_SANDBOX_ADAPTER_AUTHORIZATION_2026-09-15.md
```

No second path may change in this authorization candidate.

## Exact unmet criterion

The project-wide audit (`docs/planning/KODAC_PROJECT_WIDE_CANONICAL_COMPLETION_GAP_AUDIT_2026-09-10.md`,
as reconciled through PR #652) records:

```text
ADMITTED_SANDBOX_CLEANUP_PROOF = PARTIAL_CANONICAL
```

with the exact stated boundary: H4 canonically proves bounded gVisor physical
CPU/memory/network/TTL/output conjunction and durable lifecycle cleanup/recovery
primitives, with exact sandbox approval/admission contracts present; the repository
does not have a single OpenReview O5 backend-neutral admitted-sandbox adapter closure
proving the complete current product-path checkout-to-cleanup lifecycle across an
admitted backend.

## Governing contracts inspected

The following closed H4 primitives bound the future implementation. They are
navigation references, not authority, and remain frozen under this authorization:

```text
packages/kodac-runtime/src/trust/sandbox-workload.ts
packages/kodac-runtime/src/trust/sandbox-backend-evidence.ts
packages/kodac-runtime/src/trust/sandbox-execution-approval-binding.ts
packages/kodac-runtime/src/trust/sandbox-admission-permit.ts
packages/kodac-runtime/src/trust/sandbox-admission-dormant-create.ts
packages/kodac-runtime/src/trust/sandbox-admission-prestart-output.ts
packages/kodac-runtime/src/trust/sandbox-lifecycle-gvisor-ttl.ts
packages/kodac-runtime/src/trust/sandbox-lifecycle-gvisor-ttl-recovery.ts
packages/kodac-runtime/src/trust/sandbox-physical-conjunction-gvisor.ts
packages/kodac-runtime/src/execution/sandbox-admission-approval-runtime.ts
packages/kodac-runtime/src/execution/gateway-gvisor-ttl-runtime.ts
```

Admitted semantic runtime classes are exactly those enumerated by
`KDO_H4_R3B_SEMANTIC_RUNTIME_CLASSES` (`gvisor`, `kata-firecracker`, `kata-qemu`).
No new backend family, provider, or runtime class is admitted by this authorization.

## Governance reason

Under the founder-authorized re-sequencing (PR #637), the deferred O4
founder-secret live proof no longer globally blocks independent criteria. The O5
adapter row has no technical, governance, or external dependency on the O4 secret
operation: its inputs are the already-closed H4 pure-data contracts, its proofs run
hermetically under synthetic/fixture transport, and it requires no credential, no
network, no persistence, no provider/model admission, and no release decision.
Fresh successor analysis therefore selects the O5 admitted-sandbox adapter
authorization as the smallest earliest READY unit. A general container platform is
explicitly out of scope; only the bounded adapter closure described below may follow.

## Conditional future implementation authority

Only after this authorization becomes externally proven `CLOSED_CANONICAL` may one
later implementation candidate modify exactly these two repository paths and no
others:

```text
packages/kodac-runtime/src/trust/sandbox-admitted-adapter.ts
packages/kodac-runtime/test/o5-admitted-sandbox-adapter.test.ts
```

No third path is authorized for the implementation candidate. In particular, no
existing H4 source, approval contract, workload limit, backend capability
declaration, workflow, dependency, lockfile, or package metadata may change in that
unit. If qualification exposes a defect outside this allowlist, that mutation stops
and a separate bounded authorization is required.

## Binding implementation rules

The future implementation candidate must satisfy all of the following, proven by
deterministic hermetic tests with synthetic/fixture transport only:

```text
ADAPTER_COMPOSES_CLOSED_H4_PRIMITIVES_ONLY = REQUIRED
ADMISSION_PERMIT_REQUIRED_BEFORE_EXECUTION = REQUIRED
SINGLE_ADMISSION_ATTEMPT_LIMIT_PRESERVED = REQUIRED
BOUNDED_EXECUTION_WITH_TTL_AND_OUTPUT_LIMITS = REQUIRED
EXECUTION_IDENTITY_BOUND_TO_PERMIT_AND_REQUIREMENT = REQUIRED
CLEANUP_INITIATION_RECORDED = REQUIRED
CLEANUP_COMPLETION_RECORDED_WITH_EVIDENCE = REQUIRED
FAILURE_CLEANUP_PATH_PROVEN = REQUIRED
TIMEOUT_TTL_EXPIRY_CLEANUP_PATH_PROVEN = REQUIRED
CANCELLATION_CLEANUP_PATH_PROVEN = REQUIRED
BACKEND_NEUTRAL_ACROSS_ADMITTED_RUNTIME_CLASSES = REQUIRED
DOWNGRADE_FORBIDDEN_PRESERVED = REQUIRED
CREDENTIAL_MODE_NONE_PRESERVED = REQUIRED
DENY_ALL_NETWORK_POLICY_PRESERVED = REQUIRED
NEGATIVE_UNADMITTED_BACKEND_REJECTED = REQUIRED
NEGATIVE_PERMIT_REUSE_REJECTED = REQUIRED
EVIDENCE_THAT_CLEANUP_OCCURRED = REQUIRED / NO_SUCCESS_BY_ASSERTION_ALONE
K2_TRUSTED_SIDE_EFFECT_BOUNDARY = UNCHANGED
NO_NEW_DEPENDENCY_PROVIDER_MODEL_OR_BACKEND = REQUIRED
NO_NETWORK_NO_PRIVILEGED_EXECUTION_IN_TESTS = REQUIRED
SYNTHETIC_QUALIFICATION_NEVER_IMPLIES_LIVE_PROOF = REQUIRED
```

The adapter is a pure-data composition and evidence-closure layer over admitted H4
primitives. It must not introduce process spawning, container control-plane calls,
network access, filesystem mutation outside test-scoped temporary directories with
complete cleanup, dynamic code execution, shell invocation, or credential handling.
Live-backend execution proof, if ever required by a later product posture, needs a
separate explicit authorization and is not granted here.

## Qualification, review, merge, and closure rules

Both this authorization candidate and the later implementation candidate must each,
independently:

```text
EXACT_HEAD_QUALIFICATION = REQUIRED / provenance validator plus repository tests
CHANGED_PATH_ALLOWLIST_VERIFICATION = REQUIRED
SUBSTANTIVE_EXACT_HEAD_COMMENTED_REVIEW = REQUIRED
ZERO_UNRESOLVED_ACTIONABLE_THREADS = REQUIRED
ACTIVE_NO_BYPASS_RULESET_STATE = REQUIRED
EXPECTED_HEAD_GUARDED_NORMAL_MERGE = REQUIRED
POST_MERGE_MAIN_PARENT_TREE_SIGNATURE_VERIFICATION = REQUIRED
EXTERNAL_POST_MERGE_PROOF = REQUIRED_BEFORE_CLOSED_CANONICAL
```

A review on an older head is invalid after head mutation. Requalification is
required after any head change.

## Criterion upgrade rule

`ADMITTED_SANDBOX_CLEANUP_PROOF` moves to `PROVEN_CANONICAL` only when the bounded
implementation candidate above is itself `CLOSED_CANONICAL` and a later separately
authorized 25-criterion re-audit derives the upgrade from rows with zero inherited
credit. Neither this authorization nor the implementation merge upgrades the row by
itself.

## Explicit non-grants

```text
SOURCE_TEST_SCHEMA_MUTATION = NOT_AUTHORIZED_BY_THIS_UNIT
WORKFLOW_DEPENDENCY_LOCKFILE_MUTATION = NOT_AUTHORIZED
PACKAGE_BIN_METADATA_VERSION_MUTATION = NOT_AUTHORIZED
PROVIDER_MODEL_ADMISSION_OR_INVOCATION = NOT_AUTHORIZED
NEW_BACKEND_FAMILY_OR_RUNTIME_CLASS = NOT_AUTHORIZED
PERSISTENCE_DATABASE_QUEUE_SCHEDULER = NOT_AUTHORIZED
TELEMETRY_LEARNING = NOT_AUTHORIZED
O4_LIVE_PROOF_EXECUTION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
LIVE_GITHUB_PUBLICATION_POST = NOT_AUTHORIZED
NEW_POST_BUDGET = 0
PUBLIC_RELEASE_PACKAGE_DEPLOYMENT = NOT_AUTHORIZED
PHASE_OVERALL_STATUS_MUTATION = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
RULESET_CHANGE_OR_BYPASS = NOT_AUTHORIZED
REBASE = NOT_AUTHORIZED
FORCE_PUSH = NOT_AUTHORIZED
HISTORY_REWRITE = NOT_AUTHORIZED
WAIVER = NO
```
