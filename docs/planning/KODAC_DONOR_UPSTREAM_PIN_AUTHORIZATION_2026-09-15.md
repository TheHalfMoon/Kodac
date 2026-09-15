# Kodac Donor Upstream Pin Authorization (6 PORT Donors) — 2026-09-15

## Record identity

```text
STATUS = AUTHORIZATION_CANDIDATE / NOT_CANONICAL
CLASS = DOCUMENTATION / UPSTREAM-PIN AUTHORIZATION ONLY
DECISION_OWNER = KODAC FOUNDER
RESEQUENCING_AUTHORITY = CLOSED_CANONICAL / PR #637 / merge 51f634b5226ca67b8229dc2f8c27209ec7506db1
CANONICAL_BASE = 6bc62b52ebfb3f4f7404b027293d7fc2d716ba55
DONOR_PORT_INTAKE_AUTHORIZATION = CLOSED_CANONICAL / PR #646 / merge 6bc62b52ebfb3f4f7404b027293d7fc2d716ba55
BLOCKER_RESOLVED = PR_646_IMPLEMENTATION_MISSING_UPSTREAM_PINS / tools/validate_provenance.py rejects unknown upstream ids
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This is a one-path authorization candidate only. It grants no `upstreams.yaml` mutation until it independently qualifies, receives substantive exact-head review, merges through protected `main` with an expected-head guard, and receives external post-merge proof.

## Exact authorization-candidate scope

This authorization candidate may modify exactly one repository path:

```text
docs/planning/KODAC_DONOR_UPSTREAM_PIN_AUTHORIZATION_2026-09-15.md
```

No second path may change in this authorization candidate.

## Governance reason

The donor PORT 11-gap intake authorized by PR #646 cannot execute: `tools/validate_provenance.py` rejects every new import record whose `upstream.id` is absent from `provenance/upstreams.yaml`, and none of the six PORT donors is pinned there (only opencode, kilo, codex, cline, aider, tabby, pr-agent are). `provenance/upstreams.yaml` is outside the PR #646 13-path allowlist, so intake implementation is BLOCKED_DEPENDENCY, not merely unstarted. Per the repo's own policy notes, upstream entries are discovery baselines, not import authorization — pinning them grants no code-import authority and changes no import lifecycle state. The six pins below mirror the exact repository paths and 40-char commits already declared in the 11 files' in-source `DONOR_PROVENANCE` blocks; no live donor-network retrieval is required or permitted. Therefore the minimum governance-valid next unit is this pin authorization, after which the PR #646 intake implementation may proceed.

## Exact pins (all six, no seventh)

```text
deepcode | https://github.com/HKUDS/DeepCode | 287510fbf6820147a48adf79f7fd86b0ed1afe92
spec-kit | https://github.com/github/spec-kit | e79fa25f3f465b1ce779f570ccacef7b379e9166
deepseek-harness | https://github.com/deepseek-ai/deepseek-harness | 47f943859bef60e4160492346772ded9b24f765a
continue | https://github.com/continuedev/continue | 5522c6f44ca0ac3528b37244818fbfa39b5af470
intellij-community | https://github.com/JetBrains/intellij-community | bfca8a6815c70221a574383fc23542afb0af5bf7
context-connectors | https://github.com/augmentcode/context-connectors | f7d6472ae626c98fd768f64cdfd6160145eefa77
```

Repository URLs are the `https://github.com/` expansion of the short paths declared in-source, following existing pin convention. Commits are copied verbatim from the in-source declarations and must each remain exact 40-char lowercase hex.

## Conditional future implementation authority

Only after this authorization becomes externally proven `CLOSED_CANONICAL` may one later implementation candidate modify exactly:

```text
provenance/upstreams.yaml (APPEND six entries above + as_of bump ONLY)
```

Frozen in that candidate: `policy`, `source_rights`, `admission_lifecycle`, `canonical_base`, and every existing entry. In particular `policy.code_import_authorized` must remain `false`. No record is imported, authorized, or adopted by pinning; lifecycle state of every existing record is unchanged.

## Binding implementation rules

```text
EXACT_SIX_PINS = REQUIRED / ids, repositories, commits verbatim as above
COMMIT_FORMAT = exact 40-char lowercase hex (validator-enforced)
NO_POLICY_RIGHTS_LIFECYCLE_MUTATION = REQUIRED
NO_OTHER_UPSTREAMS = REQUIRED
NO_LIVE_NETWORK_RETRIEVAL = REQUIRED
PROVENANCE_VALIDATOR_MUST_PASS = YES
PINNING_GRANTS_NO_IMPORT_AUTHORITY = RECORDED
```

## Explicit non-grants

```text
IMPORT_RECORD_CREATION = NOT_AUTHORIZED_BY_THIS_UNIT
SCOPED_AUTHORIZATION_CREATION = NOT_AUTHORIZED
MAIN_ADOPTION_CREATION = NOT_AUTHORIZED
SOURCE_RUNTIME_TEST_SCHEMA_MUTATION = NOT_AUTHORIZED
WORKFLOW_DEPENDENCY_LOCKFILE_MUTATION = NOT_AUTHORIZED
PROVIDER_MODEL_PERSISTENCE_TELEMETRY = NOT_AUTHORIZED
O4_LIVE_PROOF_EXECUTION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
LIVE_GITHUB_PUBLICATION_POST = NOT_AUTHORIZED
NEW_POST_BUDGET = 0
PUBLIC_RELEASE_PACKAGE_DEPLOYMENT = NOT_AUTHORIZED
CRITERION_ROW_UPGRADE = NOT_AUTHORIZED
PHASE_OVERALL_STATUS_MUTATION = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
REBASE = NOT_AUTHORIZED
FORCE_PUSH = NOT_AUTHORIZED
HISTORY_REWRITE = NOT_AUTHORIZED
WAIVER = NO
```

## Authorization-candidate qualification

This docs-only candidate must independently prove:

```text
EXACT_CHANGED_PATHS = 1
CANONICAL_BASE = 6bc62b52ebfb3f4f7404b027293d7fc2d716ba55
PREDECESSOR_PR_646_MERGE = 6bc62b52ebfb3f4f7404b027293d7fc2d716ba55 / MERGED
NO_SOURCE_TEST_SCHEMA_WORKFLOW_DEPENDENCY_MUTATION = YES
ROOT_GOVERNANCE_CHECKS = PASS
SUBSTANTIVE_EXACT_HEAD_REVIEW = CLEAN
UNRESOLVED_MATERIAL_THREADS = 0
ACTIVE_RULESET = VERIFIED
BYPASS_ACTORS = []
CURRENT_USER_CAN_BYPASS = NEVER
EXPECTED_HEAD_NORMAL_MERGE = REQUIRED
POST_MERGE_PROOF = REQUIRED
EXTERNAL_CLOSED_CANONICAL_PROOF = REQUIRED
```

While this authorization remains a candidate, upstream pin mutation remains NOT_AUTHORIZED, and the PR #646 intake implementation remains BLOCKED_DEPENDENCY.

(End of file)
