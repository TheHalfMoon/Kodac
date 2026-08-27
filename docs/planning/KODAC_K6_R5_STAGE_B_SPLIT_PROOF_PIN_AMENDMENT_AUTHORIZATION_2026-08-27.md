# Kodac K6-R5 Stage B Split-Proof Pin Amendment Authorization

## Record identity

- Date: `2026-08-27`
- Founder authority: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-27`
- Authority class: DOCUMENTATION / GOVERNANCE-REPAIR AUTHORIZATION CANDIDATE
- Authorization candidate PR: `#232`
- Authorization candidate branch: `docs/k6-r5-stage-b-split-proof-pin-amendment`
- Canonical base commit: `0c151b3db8ab1487c5fcf1553060b4743ede155d`
- Canonical base tree: `dbd3a571ebc4e4adaf91c911dfa5763fd7636039`
- Canonical trusted-repair PR: `#228`
- Canonical trusted-repair head: `e7c0c09d8f053b38b97b5570c15fecbc0bbff052`
- Canonical trusted-repair merge: `0c151b3db8ab1487c5fcf1553060b4743ede155d`
- Canonical trusted-workflow blob: `9abba1ba237609908ad33afa2e9968e32c64a65c`
- Governing repair authorization: `docs/planning/KODAC_K6_R5_TRUSTED_QUALIFICATION_RULESET_OBSERVABILITY_REPAIR_AUTHORIZATION_2026-08-27.md`
- Governing repair authorization blob: `e01639b284a9788d0cd1118c0ffd998271a087f0`
- Active Stage B implementation PR: `#226`
- Stage B reconciliation checkpoint head: `b950d8a4a04eac25ab4b213ad8a529d2efed1d00`
- Protected-main ruleset: `20707483` (`Kodac canonical main protection v1`)
- Existing unrecoverable Stage B proof-body pin: `ea87cea4795f910e95c84beaffe3184c38ec1926289358225aaca276768a1d2c`
- Replacement exact Stage B proof-body pin: `f06ab03cdca4df294ea72735790f60ddca04b4cba8bb38c31fe12e55f1f89e43`
- `WAIVER=NO`

This record is candidate authority only until it is merged to protected `main` through normal repository governance and its post-merge proof succeeds. It grants no trusted-workflow or Stage B implementation authority before that point.

## Incident and blocker

PR #227 correctly authorized split ruleset proof semantics for K6-R5 and required the canonical trusted inspector to pin the exact replacement run-body SHA-256 for the Stage B step:

```text
Prove forbidden R5 authority surfaces and live ruleset
```

The canonical trusted workflow now requires:

```text
ea87cea4795f910e95c84beaffe3184c38ec1926289358225aaca276768a1d2c
```

The Stage B branch was intentionally paused while PR #228 repaired and canonicalized the trusted inspector. After PR #228 became `CLOSED_CANONICAL`, PR #226 was reconciled forward without rebase or force-push. The reconciliation checkpoint is:

```text
HEAD=b950d8a4a04eac25ab4b213ad8a529d2efed1d00
BASE=0c151b3db8ab1487c5fcf1553060b4743ede155d
BEHIND_BY=0
CHANGED_PATHS=6
```

The six-path scope remains exact.

However, the literal run-body bytes that originally produced the pinned digest `ea87cea...` are not present in any canonical repository artifact, branch commit, authorization record, review record, or retained handoff/source available to the repository executor. The canonical records preserve the digest and required semantics, but not the digest preimage.

This creates a fail-closed reproducibility blocker:

```text
KNOWN_REQUIRED_SEMANTICS = YES
KNOWN_REQUIRED_SHA256 = YES
RECOVERABLE_EXACT_BODY_FOR_EA87 = NO
SAFE_TO_GUESS_PREIMAGE = NO
SAFE_TO_CHANGE_CANONICAL_PIN_WITHOUT_AUTHORITY = NO
STAGE_B_MERGE = BLOCKED
WAIVER = NO
```

A cryptographic digest is not a specification from which the original body can be reconstructed. Guessing a replacement body and silently changing the trusted pin would violate the current authorization and exact-head trust contract.

## Decision

Authorize a bounded governance repair that makes the split-proof body itself canonical evidence instead of preserving a hash without recoverable bytes.

The repair has three strictly ordered units:

```text
A. THIS DOCS-ONLY AUTHORIZATION
-> B. ONE-PATH TRUSTED PIN/LIFECYCLE REPAIR
-> C. PR #226 FORWARD RECONCILIATION + EXACT STAGE B BODY
```

No unit self-authorizes the next before its own canonical merge and post-merge proof.

The lifecycle is exact, not merely descendant-based:

```text
PR #228 MERGE 0c151b3db8ab1487c5fcf1553060b4743ede155d
-> PR #232 AUTHORIZATION MERGE
-> REGISTERED ONE-PATH PIN-REPAIR MERGE
```

PR #232 MUST have base SHA exactly `0c151b3db8ab1487c5fcf1553060b4743ede155d`. Its merge commit MUST have ordered parent 1 equal to `0c151b3db8ab1487c5fcf1553060b4743ede155d` and ordered parent 2 equal to the exact qualified final PR #232 head. No intermediate protected-main merge is authorized between PR #228 and PR #232.

## Exact replacement Stage B run body

The following text is the complete canonical run body for the Stage B step `Prove forbidden R5 authority surfaces and live ruleset`.

Hashing contract:

- encoding: UTF-8;
- line endings: LF;
- hash input starts with `set -euo pipefail`;
- hash input contains no YAML indentation;
- hash input ends with exactly one terminal LF after the final `PY`;
- SHA-256 of the exact bytes below MUST equal `f06ab03cdca4df294ea72735790f60ddca04b4cba8bb38c31fe12e55f1f89e43`.

```text
set -euo pipefail
node --input-type=module <<'NODE'
import fs from "node:fs"
const contracts = fs.readFileSync("packages/kodac-runtime/src/evidence-router/strategy-proposal-contracts.ts", "utf8")
const runtime = fs.readFileSync("packages/kodac-runtime/src/evidence-router/strategy-proposal.ts", "utf8")
const imports = [...runtime.matchAll(/\bimport(?:\s+type)?[\s\S]*?\sfrom\s+["']([^"']+)["']/g)].map((match) => match[1])
if ((contracts.match(/\bimport\b/g) ?? []).length !== 0) throw new Error("R5 contracts gained imports")
if (JSON.stringify(imports) !== JSON.stringify(["node:crypto", "node:util", "./contracts.ts", "./strategy-proposal-contracts.ts"])) throw new Error("R5 runtime import allowlist drift")
if (/\bimport\s*\(/.test(runtime)) throw new Error("dynamic import forbidden")
const combined = `${contracts}\n${runtime}`
for (const pattern of [
  /\bExecutionGateway\b/i, /child_process/i, /node:fs/i, /node:path/i, /node:http/i, /node:https/i,
  /node:net/i, /node:tls/i, /\bfetch\s*\(/, /\bprocess\.(?:env|cwd|chdir)/, /Math\.random/,
  /Date\.now/, /new\s+Date\s*\(/, /\b(?:exec|spawn|fork)\s*\(/, /localeCompare/, /Intl\./,
  /telemetry/i, /database/i, /automatic.?promotion/i
]) {
  if (pattern.test(combined)) throw new Error(`forbidden R5 authority surface: ${pattern}`)
}
NODE

python3 - <<'PY'
from datetime import datetime
import json
import os
import urllib.request

token = os.environ["GH_TOKEN"]
request = urllib.request.Request(
    "https://api.github.com/repos/TheHalfMoon/Kodac/rulesets/20707483",
    headers={
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {token}",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "kodac-k6-r5-bounded-strategy-qualification",
    },
)
with urllib.request.urlopen(request, timeout=20) as response:
    ruleset = json.load(response)

def instant(value):
    normalized = value[:-1] + "+00:00" if value.endswith("Z") else value
    return datetime.fromisoformat(normalized)

assert ruleset["id"] == 20707483
if "node_id" in ruleset:
    assert ruleset["node_id"] == "RRS_lACqUmVwb3NpdG9yec5NVN5LzgE7-Js"
assert instant(ruleset["updated_at"]) == instant("2026-08-11T21:30:21.316+03:00")
assert ruleset["name"] == "Kodac canonical main protection v1"
assert ruleset["target"] == "branch"
assert ruleset["enforcement"] == "active"
if "source_type" in ruleset:
    assert ruleset["source_type"] == "Repository"
if "source" in ruleset:
    assert ruleset["source"] == "TheHalfMoon/Kodac"
assert ruleset["conditions"]["ref_name"] == {"exclude": [], "include": ["refs/heads/main"]}

bypass_actors_visible = "bypass_actors" in ruleset
current_user_bypass_visible = "current_user_can_bypass" in ruleset
if bypass_actors_visible:
    assert ruleset["bypass_actors"] == []
if current_user_bypass_visible:
    assert ruleset["current_user_can_bypass"] == "never"

assert [rule["type"] for rule in ruleset["rules"]] == [
    "deletion",
    "non_fast_forward",
    "pull_request",
    "required_status_checks",
]
pr_params = ruleset["rules"][2]["parameters"]
assert pr_params == {
    "required_approving_review_count": 0,
    "dismiss_stale_reviews_on_push": False,
    "required_reviewers": [],
    "require_code_owner_review": False,
    "require_last_push_approval": False,
    "required_review_thread_resolution": True,
    "require_extra_approval_for_unattributed_changes": True,
    "allowed_merge_methods": ["merge", "squash", "rebase"],
}
status_params = ruleset["rules"][3]["parameters"]
assert status_params["strict_required_status_checks_policy"] is True
assert status_params["do_not_enforce_on_create"] is False
assert status_params["required_status_checks"] == [
    {"context": "provenance", "integration_id": 15368},
    {"context": "legacy-tests", "integration_id": 15368},
    {"context": "k2-runtime-gate", "integration_id": 15368},
]

visibility = (
    "AVAILABLE"
    if bypass_actors_visible and current_user_bypass_visible
    else "UNAVAILABLE_UNDER_ACTIONS_TOKEN"
)
print(
    json.dumps(
        {
            "bypass_state_visibility": visibility,
            "external_owner_no_bypass_proof_required": True,
            "ruleset_id": 20707483,
        },
        sort_keys=True,
        separators=(",", ":"),
    )
)
PY
```

The body preserves the existing runtime authority negative-space scan. The ruleset portion implements the split-proof model already adopted by PR #227:

- every visible pinned ruleset field is validated;
- each visible bypass field must equal its canonical fail-closed value;
- if either bypass field is absent, the body records only `UNAVAILABLE_UNDER_ACTIONS_TOKEN`;
- it never fabricates absent owner-level evidence;
- external owner-level no-bypass proof remains mandatory.

## Authorized Unit B — one-path trusted pin/lifecycle repair

After and only after this authorization is canonical and post-merge proven, authorize one additional PR on branch:

```text
ci/k6-r5-stage-b-split-proof-pin-repair
```

That PR may modify exactly one path:

```text
.github/workflows/k6-r5-trusted-qualification.yml
```

It may only:

1. replace the expected SHA-256 for `Prove forbidden R5 authority surfaces and live ruleset` from `ea87cea4795f910e95c84beaffe3184c38ec1926289358225aaca276768a1d2c` to `f06ab03cdca4df294ea72735790f60ddca04b4cba8bb38c31fe12e55f1f89e43`;
2. extend protected-base evolution by exactly one authorization merge and one registered one-path pin-repair merge;
3. preserve the complete immutable chain:
   - original R5 authorization;
   - Stage A PR #225/head/merge/tree/workflow blob;
   - PR #227 authorization/head/merge/document blob;
   - PR #228 repair/head/merge/tree/workflow blob;
   - this PR #232 authorization exact qualified head/merge/tree/document blob;
   - the registered one-path pin-repair PR/head/merge/tree/workflow blob;
4. require current protected `main` to equal exactly the registered pin-repair merge before qualifying PR #226;
5. verify before accepting the pin-repair merge that the PR #232 authorization merge has ordered parent 1 exactly `0c151b3db8ab1487c5fcf1553060b4743ede155d` and ordered parent 2 exactly the final qualified PR #232 head, with no intermediate merge;
6. require ordered merge parents, merge-tree=head-tree equality, valid GitHub merge verification, exact one-path scope and exact branch/PR identity for both the authorization merge and pin-repair merge;
7. preserve `pull_request_target` protected-base execution and `permissions: contents: read`;
8. preserve no candidate-head checkout or candidate-head execution;
9. preserve the exact Stage B six-path/status allowlist;
10. preserve every other Stage B run-body fingerprint unchanged;
11. preserve every action pin, candidate job/step/env/control-surface check and predecessor blob check;
12. preserve the split ruleset visibility semantics and external owner-level proof requirement;
13. add no product/runtime/persistence/network/provider/model/training/autofix/release authority.

No generic descendant-main acceptance is authorized.

The pin-repair PR must use a fail-closed registration placeholder until GitHub assigns its PR number, followed by a forward-only registration commit. Any head movement invalidates prior exact-head evidence.

## Authorized Unit C — PR #226 re-reconciliation and Stage B repair

Only after Unit B is merged and post-merge proven may PR #226 move again.

PR #226 must incorporate the then-current protected `main` with a normal forward merge:

```text
NO REBASE
NO FORCE-PUSH
NO HISTORY REWRITE
```

The compare from that new protected main to the resulting PR #226 head must still contain exactly the original six Stage B paths and no seventh path.

No source/runtime/schema/test behavior is authorized to change merely because of this governance repair.

Within the existing Stage B workflow path only:

```text
.github/workflows/k6-r5-bounded-strategy-qualification.yml
```

authorize exactly two changes relative to the pre-amendment Stage B workflow:

1. `K6_R5_TRUSTED_WORKFLOW_BLOB` must become the exact canonical trusted-workflow blob produced by Unit B;
2. the complete run body for `Prove forbidden R5 authority surfaces and live ruleset` must equal byte-for-byte the body specified in this record and therefore hash to `f06ab03cdca4df294ea72735790f60ddca04b4cba8bb38c31fe12e55f1f89e43`.

No other job-level environment key/value, trigger, permission, action metadata, step metadata or run body may drift.

## Authorization-candidate qualification gate

This documentation authorization is not canonical unless its exact final head proves:

1. base SHA is exactly `0c151b3db8ab1487c5fcf1553060b4743ede155d`; descendant-but-not-equal bases are forbidden;
2. changed-file set is exactly this one documentation path;
3. `behind_by=0`;
4. PR is open, non-draft and mergeable;
5. applicable repository-required checks are terminal success from the required GitHub Actions integration;
6. fresh substantive exact-head Qodo review is terminal clean;
7. fresh substantive exact-head CodeRabbit review is terminal clean;
8. zero unresolved actionable review threads;
9. owner-level ruleset proof confirms active/no-bypass/exact required checks;
10. merge uses normal GitHub merge-commit semantics with exact expected-head precondition;
11. the authorization merge has ordered parent 1 exactly `0c151b3db8ab1487c5fcf1553060b4743ede155d` and ordered parent 2 exactly the exact qualified final PR #232 head;
12. post-merge main/tree/blob/signature/check/ruleset proof succeeds;
13. `WAIVER=NO`.

## Unit B qualification gate

The trusted pin/lifecycle repair is not merge-qualified unless its exact final head proves:

1. base is exactly the canonical merge of PR #232 and that merge itself proves parent 1=`0c151b3db8ab1487c5fcf1553060b4743ede155d`, parent 2=the exact qualified PR #232 head, and no intermediate merge;
2. changed-file set is exactly `.github/workflows/k6-r5-trusted-qualification.yml`;
3. `behind_by=0`;
4. PR is open, non-draft and mergeable;
5. trigger remains the intended `pull_request_target` R5 boundary;
6. permissions remain exactly `contents: read`;
7. candidate head is never checked out or executed;
8. current/future protected-base evolution is restricted to the exact chain authorized above;
9. only the dedicated Stage B proof hash changes and every other Stage B fingerprint remains exact;
10. Qodo and CodeRabbit fresh exact-head substantive review are terminal clean;
11. repository-required exact-head checks succeed;
12. zero unresolved actionable review threads;
13. owner-level ruleset proof is active/no-bypass/exact-checks;
14. guarded normal merge uses exact expected head;
15. post-merge parent/tree/blob/signature/check/ruleset proof succeeds;
16. `WAIVER=NO`.

## PR #226 final requalification gate

After Unit B and forward reconciliation, PR #226 must satisfy the original R5 Stage B acceptance gate plus:

- base is exactly the canonical Unit B merge;
- compare contains exactly six authorized Stage B paths;
- `behind_by=0`;
- the base-controlled `k6-r5-trusted-qualification` succeeds;
- the dedicated `k6-r5-bounded-strategy-qualification` succeeds;
- `provenance`, `legacy-tests` and `k2-runtime-gate` succeed from integration `15368`;
- all applicable R5 corpus/identity/adversarial/predecessor/runtime/Python/Ruff/provenance gates succeed;
- fresh exact-head Qodo and CodeRabbit reviews are terminal clean;
- zero unresolved actionable review threads;
- owner-level ruleset proof is active/no-bypass/exact-checks on the exact final head and immediately before merge;
- guarded normal merge uses the exact final head SHA;
- `WAIVER=NO`.

Historical predecessor workflows that intentionally reject later R5 surfaces remain historical/non-applicable and must not be mislabeled as green.

## Mandatory post-merge proof for PR #226

After Stage B merge, require at minimum:

1. protected `main` equals the returned Stage B merge SHA;
2. ordered parent 1 equals the canonical Unit B trusted pin-repair merge;
3. ordered parent 2 equals the exact qualified Stage B head;
4. merge tree equals the exact qualified-head tree;
5. all six canonical Stage B blobs equal the qualified head;
6. GitHub merge signature is verified and valid;
7. applicable post-merge required checks succeed;
8. ruleset remains active;
9. owner-level `bypass_actors=[]`;
10. owner-level `current_user_can_bypass=never`;
11. exact required checks remain unchanged;
12. `WAIVER=NO`.

Only then may PR #226 be treated as canonically merged.

## K6-R5 closeout remains separate

Neither this authorization, Unit B, nor the PR #226 merge itself declares:

```text
K6-R5=CLOSED_CANONICAL
```

After Stage B post-merge proof, the separately required roadmap/ledger reconciliation remains mandatory. Only canonical roadmap/ledger evidence may close R5 and identify the next eligible unit. K6 bounded closeout remains before general KodacBench unless a later canonical authority explicitly changes the dependency order.

## Preserved non-grants

This amendment does not grant:

```text
RULESET MUTATION
BYPASS
PERMISSION WIDENING
SECRET OR PAT USE
ID-TOKEN / OIDC ESCALATION
SEVENTH STAGE B PATH
MODEL / PROVIDER / REVIEWER INVOCATION
MODEL TRAINING / FINETUNING
PERSISTENCE / DATABASE / STORAGE
TELEMETRY / UPLOAD
NETWORK FALLBACK
CROSS-REPOSITORY LEARNING
AUTOMATIC STRATEGY PROMOTION
TRUST-POLICY MUTATION
AUTOFIX
K2 AUTHORITY EXPANSION
K5 AUTHORITY EXPANSION
DONE GATE / PROVEN_READY AUTHORITY CHANGE
GENERAL KODACBENCH CLAIMS
PUBLIC RELEASE
```

The core boundary remains:

```text
STRATEGY_COMPARISON != PROMOTION
DOMINANCE_RESULT != PROVEN_READY
SELF-IMPROVING != SELF-AUTHORIZING
WAIVER=NO
```

## Decision state

Until this record is canonical and post-merge proven:

```text
PR_226=OPEN_PAUSED_AT_FORWARD_RECONCILIATION_CHECKPOINT
STAGE_B_SPLIT_PROOF_BODY_RECOVERABLE_FOR_EA87=NO
PIN_AMENDMENT_AUTHORIZED=NO
STAGE_B_MERGE=BLOCKED
WAIVER=NO
```

After this record becomes canonical and post-merge proven:

```text
PIN_AMENDMENT_AUTHORIZED=YES_ONE_PATH
PR_226_FORWARD_RECONCILIATION=AUTHORIZED_AFTER_PIN_REPAIR_CLOSEOUT
STAGE_B_MERGE=STILL_REQUIRES_FRESH_EXACT_HEAD_PROOF
WAIVER=NO
```
