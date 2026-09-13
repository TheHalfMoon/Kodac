# Kodac O4-M Live Publication Receipt Canonical Evidence — 2026-09-13

## Record identity

```text
STATUS = EVIDENCE_CANDIDATE / NOT_CANONICAL / NOT_YET_CLOSED_CANONICAL
CLASS = DOCUMENTATION / LIVE RECEIPT EVIDENCE ONLY
CANONICAL_BASE = 56e60ef4d75bdb09f60ff1086a5e3cd6b0736be2
AUTHORIZATION = PR #624 / merge 56e60ef4d75bdb09f60ff1086a5e3cd6b0736be2 / proof 5650376641 / CLOSED_CANONICAL
AUTHORIZATION_PATH = docs/planning/KODAC_O4M_LIVE_PUBLICATION_RECEIPT_EVIDENCE_CANONICALIZATION_AUTHORIZATION_2026-09-13.md
AUTHORIZATION_BLOB = 7a76d01f3fdffdcdaeee4e04c63d8043e62f8130
THIS_RECORD_PATH = docs/planning/KODAC_O4M_LIVE_PUBLICATION_RECEIPT_CANONICAL_EVIDENCE_2026-09-13.md
O4_LIVE_PUBLICATION_RECEIPT_EVIDENCE = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This candidate canonicalizes the already-completed O4-L live execution as repository evidence.
It performs no live GitHub write, no review disposition, no second live proof, no current-view
mutation, no criterion upgrade, no successor implementation, no release, no deployment, and no
project-completion claim. It must not self-certify its own canonical closure. Only complete
external post-merge proof may establish `CLOSED_CANONICAL`.

## Authority

```text
O4M_AUTHORIZATION = CLOSED_CANONICAL / PR #624
O4M_QUALIFIED_HEAD = bbe38bf00dabbf065c9a6db9f72c90354ed73097
O4M_QUALIFIED_TREE = c2baa94e1961c17b2c2d10d8a8b64284539c6538
O4M_MERGE = 56e60ef4d75bdb09f60ff1086a5e3cd6b0736be2
O4M_MERGE_TREE = c2baa94e1961c17b2c2d10d8a8b64284539c6538
O4M_PARENT_1 = 8b014b1307bb22f59dff49e543718393227e5861
O4M_PARENT_2 = bbe38bf00dabbf065c9a6db9f72c90354ed73097
O4M_GITHUB_SIGNATURE = VERIFIED / VALID
O4M_AUTHORIZATION_EXACT_HEAD_REVIEW = 5189194382 / CLEAN / 0 MATERIAL FINDINGS
O4M_AUTHORIZATION_QUALIFICATION_PROOF = 5650356200
O4M_AUTHORIZATION_PREMERGE_GUARD = 5650358041
O4M_POST_MERGE_GOVERNANCE_RUN = 34733829229
O4M_EXTERNAL_CLOSED_CANONICAL_PROOF = 5650376641
O4L_AUTHORIZATION = PR #623 / merge 8b014b1307bb22f59dff49e543718393227e5861 / proof 5650195160 / CLOSED_CANONICAL
O4L_QUALIFIED_HEAD = 667645c6bbffe300b2890e9f899848ab254b51c4
O4L_MERGE = 8b014b1307bb22f59dff49e543718393227e5861
O4L_EXTERNAL_PROOF = 5650195160
```

This authorization grants exactly one future repository path: this record. No second path is
authorized, and no current-view file is modified by this record.

## O4-K adverse history (preserved)

```text
O4K_LIVE_PROOF = BLOCKED_AFTER_ONE_POST
O4K_RUN_1_STATUS = BLOCKED_COMPOSITION_NOT_COMPLETED
O4K_RUN_1_BROKER_GET_COUNT = 10
O4K_RUN_1_BROKER_POST_COUNT = 1
O4K_RUN_1_PUBLICATION_REQUEST_COUNT = 1
O4K_RUN_2 = NOT_ATTEMPTED
O4K_STRAY_REVIEW_ID = 5188963531
O4K_STRAY_REVIEW_STATE = PENDING
O4K_STRAY_REVIEW_BODY = EMPTY
O4K_EXACT_CAUSAL_MECHANISM = NOT_PROVEN
```

The O4-K adverse outcome is preserved exactly as observed. It is not rewritten, omitted,
relabeled, or normalized into successful evidence.

The later investigation reconstructed a valid canonical O4-G request, disproving the hypotheses
that canonical O4-G request generation omitted the COMMENT event or generated an empty body.

The proven O4-K defect was insufficient live transport observability: the broker did not retain
the actual outbound bytes or the actual HTTP status. No more specific O4-K root cause is claimed
than the evidence proves.

## O4-L stray review disposition (bound)

Preflight proved before deletion:

```text
PR = 163
PR_STATE = OPEN
PR_HEAD = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
STRAY_REVIEW_ID = 5188963531
STRAY_REVIEW_STATE = PENDING
STRAY_REVIEW_BODY = EMPTY
STRAY_REVIEW_COMMIT = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
CANONICAL_MARKER_COUNT_BEFORE = 0
```

The bounded disposition executed:

```text
DELETE /repos/TheHalfMoon/Kodac/pulls/163/reviews/5188963531
GH_EXIT_CODE = 0
HTTP_STATUS = 200
DELETE_RESPONSE_SHA256 = 83a21b3c260853620ea702b723dbf83ad9859dc35744f3e0b2792fd99acbd553
POST_DELETE_READ_ONLY_GITHUB_RESULT = 404 / REVIEW_ABSENT
```

The disposition local source was `/private/tmp/kodac-o4l-disposition-evidence.json` with previously
observed `BYTES = 889` and `SHA256 =
4d6314b8f6b3dc9e5c84ebea0c441f3c84a15f90d15e901e938ed52fae2e4bef`.
At this record's construction time that local file was absent (temporary directory no longer
retained it), so the byte count and hash above are bound from the canonical O4-M authorization
record, not from a fresh local rehash. The live GitHub absence below was freshly reverified.

## O4-L live proof — successful (bound)

Exact target:

```text
REPOSITORY = TheHalfMoon/Kodac
REPOSITORY_ID = 1297407563
PR_NUMBER = 163
PR_ID = 4340591287
PR_HEAD = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
EVENT = COMMENT
PROVIDER_IDENTITY = kodac-o4j-live-proof-provider-v1
MODEL_IDENTITY = kodac-o4j-live-proof-deterministic-v1
POLICY_IDENTITY = kodac-o4l-live-publication-recovery-v1
CREDENTIAL_POLICY_IDENTITY = db94c4aa51be569021c16e59c18d5b3fb94657f82fbfad17a10c2370948100f3
TIMEOUT_MS = 30000
```

Run 1:

```text
STATUS = COMPLETED_PUBLISHED
BROKER_GET_COUNT = 10
BROKER_POST_COUNT = 1
PUBLICATION_REQUEST_COUNT = 1
WIRING_EXECUTION_IDENTITY = 1fc19ac3115fd1f0c0ce22f386a3994d1fc52be3201bdd467f24b30ec7b2199f
PUBLICATION_EXECUTION_IDENTITY = 1a5b7a6d4a41cc42353439adc91d82a23dbad9a2ace0c0ee1e9701cf181ac369
PUBLICATION_ADMISSION_IDENTITY = 957ab88640f8c9332035edfaf9cf22c56595fc535481bd7244bf009017da1a12
REVIEW_ID = 5189105929
REVIEW_NODE_ID = PRR_kwDOTVTeS88AAAABNUt5CQ
REVIEW_RECEIPT_IDENTITY = 51c9b549891ee90977cff2e5f367a9b0230a94f6084457dcf46e194d128a15a6
REVIEWED_HEAD = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
CONTINUATION_DECISION = PRODUCTION_PUBLICATION_COMPLETE
```

Run 2:

```text
STATUS = COMPLETED_ALREADY_PRESENT
BROKER_GET_COUNT = 7
BROKER_POST_COUNT = 0
PUBLICATION_REQUEST_COUNT = 1
WIRING_EXECUTION_IDENTITY = 633f672790a51d9366ef6fc08dc5798aa3f7ee757eb3dcd6b45c26a17a33f5eb
PUBLICATION_EXECUTION_IDENTITY = b4dc31a9115f42a71a6e792bdcec4f6e388b94d2b74e4aea288f90e1a037b04b
PUBLICATION_ADMISSION_IDENTITY = 957ab88640f8c9332035edfaf9cf22c56595fc535481bd7244bf009017da1a12
REVIEW_ID = 5189105929
REVIEW_NODE_ID = PRR_kwDOTVTeS88AAAABNUt5CQ
REVIEW_RECEIPT_IDENTITY = 51c9b549891ee90977cff2e5f367a9b0230a94f6084457dcf46e194d128a15a6
REVIEWED_HEAD = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
CONTINUATION_DECISION = PRODUCTION_PUBLICATION_COMPLETE
```

Cross-run result:

```text
RECEIPT_MATCH_FIRST_SECOND = TRUE
GLOBAL_BROKER_POST_COUNT = 1
SECOND_RUN_ADDITIONAL_POST = NO
DUPLICATE_EXACT_PUBLICATION = NO
```

## O4-L live HTTP evidence (bound)

Exact publication request and response diagnostics:

```text
POST_REQUEST_BYTES = 462
POST_REQUEST_SHA256 = 44a27e4edfea1af91964c92af6dbae52652df7875b5f5812615ec4a2d0060cbd
EVENT = COMMENT
COMMIT_ID = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
MARKER = <!-- kodac-publication-slot:c3070a2d678cc1d1519ca487859854157a06a39a7a1eab4c2fcb0d63702c116b -->
GH_API_EXIT_CODE = 0
ACTUAL_HTTP_STATUS = 200
RESPONSE_CONTENT_TYPE = application/json; charset=utf-8
RESPONSE_BYTES = 1896
RESPONSE_SHA256 = e1d90967251ec531e9a824fe1a81e7fb42cb4195116bafc346eef928dae908ab
RESPONSE_REVIEW_ID = 5189105929
RESPONSE_REVIEW_NODE_ID = PRR_kwDOTVTeS88AAAABNUt5CQ
RESPONSE_STATE = COMMENTED
RESPONSE_BODY_LENGTH = 353
RESPONSE_COMMIT_ID = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
```

The live-proof summary local source was `/private/tmp/kodac-o4l-live-proof-summary.json` with
previously observed `BYTES = 4340` and `SHA256 =
f843b20b89fc00c6241c0662f0976a9346cb3ff7d70c6a923f9237626a10fc06`.
At this record's construction time that local file was absent (temporary directory no longer
retained it), so the byte count and hash above are bound from the canonical O4-M authorization
record. Request/response byte counts, hashes, review identity, and body length were freshly
reverified against live GitHub as documented below.

## Independent live GitHub verification (fresh, read-only)

At this record's construction time, the following were independently re-read from live GitHub
using read-only `gh api` calls. No live write was performed for this record.

```text
MAIN = 56e60ef4d75bdb09f60ff1086a5e3cd6b0736be2
MAIN_PARENTS = [8b014b1307bb22f59dff49e543718393227e5861, bbe38bf00dabbf065c9a6db9f72c90354ed73097]
MAIN_SIGNATURE = VERIFIED / VALID
OPEN_PRS = [163]
PR_163_STATE = OPEN
PR_163_ID = 4340591287
PR_163_HEAD = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
REVIEW_5189105929_STATE = COMMENTED
REVIEW_5189105929_NODE_ID = PRR_kwDOTVTeS88AAAABNUt5CQ
REVIEW_5189105929_COMMIT_ID = e5b9ea66ca47b6956f8928055ea10f2cbe3447b1
REVIEW_5189105929_BODY_CONTAINS_EXACT_MARKER = YES
REVIEW_5189105929_BODY_LENGTH = 353
REVIEW_COUNT_ON_PR_163 = 15
EXACT_MARKER_REVIEW_COUNT = 1
EXACT_MARKER_MATCH_IDS = [5189105929]
STRAY_REVIEW_5188963531 = ABSENT (fresh read returns HTTP 404)
```

The review body contains the exact Kodac publication marker
`<!-- kodac-publication-slot:c3070a2d678cc1d1519ca487859854157a06a39a7a1eab4c2fcb0d63702c116b -->`.
Exactly one review on PR #163 contains that marker, and it is review 5189105929.

## Required credential limitation (preserved)

```text
AUTHENTICATION_OWNER = ALREADY_AUTHENTICATED_GH_API_INTERNAL_SESSION
O4I_CREDENTIAL_VALUE = NON_SECRET_SENTINEL
O4G_AUTHORIZATION_HEADER_BYTES_AUTHENTICATED_GITHUB = NOT_PROVEN_BY_THIS_LIVE_RUN
CALLER_INJECTED_SECRET_BYTES_ACCEPTED_BY_GITHUB = NOT_PROVEN_BY_THIS_LIVE_RUN
TOKEN_EXTRACTED_BY_AGENT = NO
TOKEN_READ_BY_AGENT = NO
TOKEN_PRINTED_BY_AGENT = NO
TOKEN_STORED_BY_AGENT = NO
TOKEN_HASHED_BY_AGENT = NO
```

The live proof authenticated through the already-authenticated local `gh api` session. The O4-I
input used a non-secret sentinel credential. These limitations are not upgraded by this record.
No credential was asked for or extracted.

## Secret hygiene

This record contains no credential or credential-derived material. In particular it contains no
GitHub token bytes, no Authorization header value, no shell history containing credentials, no
keychain contents, no `gh` credential-store contents, no environment secret values, and no hash
whose input includes secret bytes. The only credential-related identity present is the already
non-secret `credentialPolicyIdentity` listed above.

## Synthetic requalification (fresh, canonical tooling)

The repository's canonical Node setup is: engines `node >= 24`; CI (`k2-runtime.yml`) provisions
Node 24 and installs typecheck tooling via `npm install --prefix packages/kodac-runtime --no-save
--package-lock=false --ignore-scripts --no-audit --no-fund typescript@5.9.3 @types/node@24.3.0`,
then runs `node ./node_modules/typescript/bin/tsc -p tsconfig.json --noEmit`. That install form
changes no tracked dependency or lockfile bytes.

A prior handoff attempt ran `node --test` on a fresh worktree with no installed Node type
definitions and failed with `TS2688: Cannot find type definition file for 'node'`. That failure
is preserved here as an environment/dependency-setup failure, not evidence of a source defect,
and no typecheck PASS is claimed from that attempt.

Fresh requalification on the clean canonical base `56e60ef4d75bdb09f60ff1086a5e3cd6b0736be2`
used a local Node satisfying the `>= 24` engine bound with `typescript@5.9.3` and
`@types/node@24.3.0` installed via the exact canonical no-save form above:

```text
TSC_TYPECHECK = PASS (exit 0)
FOCUSED_O4G_O4I_TESTS = 126 / 126 PASS (test/o4g-bounded-github-review-publication.test.ts + test/o4i-bounded-production-publication-wiring.test.ts)
FULL_RUNTIME_SUITE = TOTAL 2703 / PASS 2601 / SKIPPED 102 / FAIL 0
PATCH_BENCHMARK = PASS (patch-parse-v1 hook executed)
ROOT_UV_SYNC_FROZEN_DEV = PASS
ROOT_PROVENANCE = PASS
ROOT_PYTEST = PASS (395 passed)
ROOT_RUFF = PASS (All checks passed)
```

No full runtime or benchmark result is claimed beyond what was actually executed above. The exact
committed head of this record requires its own exact-head qualification before merge.

## Explicit non-equivalences

```text
LIVE_COMMENT_PROOF != GENERIC_GITHUB_WRITE_AUTHORITY
LIVE_COMMENT_PROOF != APPROVE_AUTHORITY
LIVE_COMMENT_PROOF != REQUEST_CHANGES_AUTHORITY
LIVE_COMMENT_PROOF != MERGE_AUTHORITY
LIVE_COMMENT_PROOF != ARBITRARY_CREDENTIAL_PATH_PROOF
LIVE_COMMENT_PROOF != RELEASE_READINESS
LIVE_COMMENT_PROOF != DEPLOYMENT_READINESS
LIVE_COMMENT_PROOF != PROJECT_COMPLETION
```

## Explicit non-grants

```text
LIVE_GITHUB_WRITE = NOT_AUTHORIZED_BY_THIS_RECORD
DELETE_REVIEW = NOT_AUTHORIZED_BY_THIS_RECORD
POST_REVIEW = NOT_AUTHORIZED_BY_THIS_RECORD
SECOND_LIVE_PROOF = NOT_PERFORMED_FOR_THIS_RECORD
CURRENT_VIEW_MUTATION = NOT_PERFORMED_BY_THIS_RECORD
CRITERION_UPGRADE = NOT_PERFORMED_BY_THIS_RECORD
SUCCESSOR_IMPLEMENTATION = NOT_AUTHORIZED_BY_THIS_RECORD
NEW_PROVIDER_OR_MODEL = NOT_AUTHORIZED_BY_THIS_RECORD
PERSISTENCE = NOT_AUTHORIZED_BY_THIS_RECORD
TELEMETRY = NOT_AUTHORIZED_BY_THIS_RECORD
GLITCHTIP_ADOPTION = NOT_AUTHORIZED_BY_THIS_RECORD
PUBLIC_RELEASE = NOT_AUTHORIZED_BY_THIS_RECORD
PACKAGE_PUBLICATION = NOT_AUTHORIZED_BY_THIS_RECORD
DEPLOYMENT = NOT_AUTHORIZED_BY_THIS_RECORD
PRODUCTION_READINESS_CLAIM = NOT_AUTHORIZED_BY_THIS_RECORD
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

No current-view file (`docs/roadmap/NEXT.md`, `docs/roadmap/ROADMAP.md`,
`docs/roadmap/MILESTONES.md`, `docs/roadmap/VERSION_PLAN.md`, `docs/product/STATUS.md`, or the
project-wide completion gap audit) is modified by this record. No project-completion mutation is
made by this record.

## Candidate meaning and closure condition

While a candidate, this record's maximum eligible meaning — not yet established — is:

```text
O4_LIVE_PUBLICATION_RECEIPT_EVIDENCE = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
O4_BOUNDED_LIVE_COMMENT_PUBLICATION = CANDIDATE_FOR_EXACT_PR_163_HEAD / NOT_YET_CLOSED
O4_BOUNDED_IDEMPOTENT_ALREADY_PRESENT_RECOVERY = CANDIDATE_FOR_EXACT_PR_163_HEAD / NOT_YET_CLOSED
```

This record becomes `CLOSED_CANONICAL` only after it independently qualifies at its exact
committed head, opens as an evidence PR, passes original-attempt required CI, receives a
substantive exact-head review with zero material findings and zero unresolved threads, passes the
active ruleset / no-bypass verification and the live premerge race guard, merges with the exact
expected head, and receives complete post-merge tree / ordered-parent / blob / signature / CI
proof plus external closed-canonical proof.

(End of record — total lines as committed.)
