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
- Replacement exact Stage B proof-body pin: `7216b701d0db142c1a2ac00dc199d67becb605f7a61dcd2a852cba60905ced6c`
- `WAIVER=NO`

This record is candidate authority only until it is merged to protected `main` through normal repository governance and its post-merge proof succeeds. It grants no trusted-workflow or Stage B implementation authority before that point.

## Incident and fail-closed blocker

PR #227 authorized split ruleset proof semantics. PR #228 repaired and canonicalized the trusted protected-base inspector. The canonical inspector now expects the Stage B run body named `Prove forbidden R5 authority surfaces and live ruleset` to hash to `ea87cea4795f910e95c84beaffe3184c38ec1926289358225aaca276768a1d2c`.

The literal bytes that generated that digest are not recoverable from canonical repository artifacts, branch history, retained governance records, or retained execution handoff. A cryptographic digest is not a reversible specification. Therefore:

```text
RECOVERABLE_EXACT_BODY_FOR_EA87=NO
SAFE_TO_GUESS_PREIMAGE=NO
SAFE_TO_CHANGE_TRUSTED_PIN_WITHOUT_CANONICAL_AUTHORITY=NO
STAGE_B_MERGE=BLOCKED
WAIVER=NO
```

After PR #228 became canonical, PR #226 was reconciled forward without rebase or force-push to checkpoint `b950d8a4a04eac25ab4b213ad8a529d2efed1d00`; compare from canonical main remained `behind_by=0` with exactly the six authorized Stage B paths.

## Decision and exact sequence

Authorize a narrowly staged repair:

```text
A. THIS DOCS-ONLY AUTHORIZATION
-> B. ONE-PATH TRUSTED PIN/LIFECYCLE/PR-IDENTITY REPAIR
-> C. PR #226 FORWARD RECONCILIATION + EXACT STAGE B BODY
```

No unit self-authorizes the next. Each unit must first become canonical and pass its own post-merge proof.

The protected-main lifecycle is exact:

```text
PR #228 MERGE 0c151b3db8ab1487c5fcf1553060b4743ede155d
-> PR #232 AUTHORIZATION MERGE
-> REGISTERED ONE-PATH UNIT B MERGE
```

PR #232 MUST have base SHA exactly `0c151b3db8ab1487c5fcf1553060b4743ede155d`. Protected `main` MUST still equal that exact SHA immediately before guarded merge. The PR #232 merge commit MUST have ordered parent 1 equal to `0c151b3db8ab1487c5fcf1553060b4743ede155d` and ordered parent 2 equal to the exact qualified final PR #232 head. No intermediate protected-main merge is authorized.

## Exact replacement Stage B run body

Hashing contract:

- UTF-8 bytes;
- LF line endings;
- no YAML indentation in the hashed body;
- first bytes are `set -euo pipefail`;
- exactly one terminal LF after the final `PY`;
- SHA-256 MUST equal `7216b701d0db142c1a2ac00dc199d67becb605f7a61dcd2a852cba60905ced6c`.

The Stage B workflow already pins `actions/setup-node` and Node `24.18.0` before this step. The body pins the exact import-declaration prefix bytes for each runtime closure member that imports dependencies, then uses Node's TypeScript stripper and module parser to validate the complete bounded runtime dependency closure. The exact-prefix check distinguishes binding imports from side-effect or standalone type-only substitutions even when they resolve to the same module specifier. The body then uses explicit Python failures rather than optimization-removable security assertions.

```text
set -euo pipefail
node --experimental-vm-modules --input-type=module <<'NODE'
import fs from "node:fs"
import path from "node:path"
import vm from "node:vm"
import { stripTypeScriptTypes } from "node:module"

const root = "packages/kodac-runtime/src/evidence-router"
const expectedRuntimeImports = new Map([
  ["strategy-proposal.ts", ["node:crypto", "node:util", "./contracts.ts", "./strategy-proposal-contracts.ts"]],
  ["contracts.ts", ["node:crypto", "node:util"]],
  ["strategy-proposal-contracts.ts", []],
])
const expectedImportPrefixes = new Map([
  ["strategy-proposal.ts", [
    'import { createHash } from "node:crypto"',
    'import { types as utilTypes } from "node:util"',
    "",
    "import {",
    "  K6_R1_LIMITS,",
    "  canonicalK6R1Json,",
    "  validateK6R1RouteRequest,",
    '} from "./contracts.ts"',
    "import {",
    "  K6_R5_LIMITS,",
    "  K6_R5_PRIVACY_CLASSES,",
    "  K6_R5_QUALIFICATION_OUTCOMES,",
    "  K6_R5_QUALIFICATION_RESULT_VERSION,",
    "  K6_R5_STRATEGY_EVIDENCE_VERSION,",
    "  K6_R5_STRATEGY_KIND,",
    "  K6_R5_STRATEGY_VERSION,",
    "  type K6R5PrivacyClass,",
    "  type K6R5QualificationOutcome,",
    "  type K6R5QualificationResult,",
    "  type K6R5QualificationResultIdentityInput,",
    "  type K6R5Strategy,",
    "  type K6R5StrategyEvidence,",
    "  type K6R5StrategyEvidenceIdentityInput,",
    "  type K6R5StrategyIdentityInput,",
    "  type K6R5StrategyScope,",
    '} from "./strategy-proposal-contracts.ts"',
    "",
    "",
  ].join("\n")],
  ["contracts.ts", [
    'import { createHash } from "node:crypto"',
    'import { types as utilTypes } from "node:util"',
    "",
    "",
  ].join("\n")],
  ["strategy-proposal-contracts.ts", ""],
])
const allowedBuiltins = new Set(["node:crypto", "node:util"])
const sources = new Map()

for (const [file, expected] of expectedRuntimeImports) {
  const source = fs.readFileSync(path.join(root, file), "utf8")
  sources.set(file, source)

  const expectedPrefix = expectedImportPrefixes.get(file)
  if (typeof expectedPrefix !== "string" || !source.startsWith(expectedPrefix)) {
    throw new Error(`runtime import declaration form drift: ${file}`)
  }

  let stripped
  try {
    stripped = stripTypeScriptTypes(source, { mode: "strip" })
  } catch {
    throw new Error(`TypeScript stripping failed for ${file}`)
  }

  let parsed
  try {
    parsed = new vm.SourceTextModule(stripped, { identifier: file })
  } catch {
    throw new Error(`module parsing failed for ${file}`)
  }

  const actual = [...parsed.dependencySpecifiers]
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`runtime dependency allowlist drift: ${file}`)
  }

  const importKeywordCount = (source.match(/\bimport\b/g) ?? []).length
  if (importKeywordCount !== actual.length) {
    throw new Error(`dynamic, type-only, side-effect, or unrecognized import form forbidden: ${file}`)
  }

  for (const specifier of actual) {
    if (specifier.startsWith("./")) {
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier))
      if (!expectedRuntimeImports.has(resolved)) {
        throw new Error(`local runtime dependency escaped closure: ${file} -> ${specifier}`)
      }
    } else if (!allowedBuiltins.has(specifier)) {
      throw new Error(`external runtime dependency forbidden: ${file} -> ${specifier}`)
    }
  }
}

const r5Contracts = sources.get("strategy-proposal-contracts.ts")
if ((r5Contracts.match(/\bimport\b/g) ?? []).length !== 0) {
  throw new Error("R5 contracts gained imports")
}

const combined = [...sources.values()].join("\n")
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

def need(condition, label):
    if not condition:
        raise SystemExit(f"K6-R5 Stage B ruleset proof failed: {label}")

def instant(value):
    need(isinstance(value, str) and bool(value), "ruleset timestamp missing")
    normalized = value[:-1] + "+00:00" if value.endswith("Z") else value
    try:
        parsed = datetime.fromisoformat(normalized)
    except ValueError as exc:
        raise SystemExit("K6-R5 Stage B ruleset proof failed: ruleset timestamp invalid") from exc
    need(parsed.tzinfo is not None and parsed.utcoffset() is not None, "ruleset timestamp lacks timezone")
    return parsed

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

need(ruleset["id"] == 20707483, "ruleset id drift")
if "node_id" in ruleset:
    need(ruleset["node_id"] == "RRS_lACqUmVwb3NpdG9yec5NVN5LzgE7-Js", "ruleset node id drift")
need(instant(ruleset["updated_at"]) == instant("2026-08-11T21:30:21.316+03:00"), "ruleset timestamp drift")
need(ruleset["name"] == "Kodac canonical main protection v1", "ruleset name drift")
need(ruleset["target"] == "branch", "ruleset target drift")
need(ruleset["enforcement"] == "active", "ruleset enforcement drift")
if "source_type" in ruleset:
    need(ruleset["source_type"] == "Repository", "ruleset source type drift")
if "source" in ruleset:
    need(ruleset["source"] == "TheHalfMoon/Kodac", "ruleset source drift")
need(
    ruleset["conditions"]["ref_name"] == {"exclude": [], "include": ["refs/heads/main"]},
    "ruleset ref condition drift",
)

bypass_actors_visible = "bypass_actors" in ruleset
current_user_bypass_visible = "current_user_can_bypass" in ruleset
if bypass_actors_visible:
    need(ruleset["bypass_actors"] == [], "visible bypass actors are non-canonical")
if current_user_bypass_visible:
    need(ruleset["current_user_can_bypass"] == "never", "visible current-user bypass is non-canonical")

need(
    [rule["type"] for rule in ruleset["rules"]] == [
        "deletion",
        "non_fast_forward",
        "pull_request",
        "required_status_checks",
    ],
    "ruleset rule ordering drift",
)
pr_params = ruleset["rules"][2]["parameters"]
need(
    pr_params == {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": False,
        "required_reviewers": [],
        "require_code_owner_review": False,
        "require_last_push_approval": False,
        "required_review_thread_resolution": True,
        "require_extra_approval_for_unattributed_changes": True,
        "allowed_merge_methods": ["merge", "squash", "rebase"],
    },
    "pull-request rule parameters drift",
)
status_params = ruleset["rules"][3]["parameters"]
need(status_params["strict_required_status_checks_policy"] is True, "strict status policy disabled")
need(status_params["do_not_enforce_on_create"] is False, "status checks not enforced on create")
need(
    status_params["required_status_checks"] == [
        {"context": "provenance", "integration_id": 15368},
        {"context": "legacy-tests", "integration_id": 15368},
        {"context": "k2-runtime-gate", "integration_id": 15368},
    ],
    "required status checks drift",
)

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

### Security semantics of the replacement body

The Node half is intentionally fail-closed:

- it pins the exact import-declaration prefix bytes for `strategy-proposal.ts` and canonical `contracts.ts` before parser-based dependency validation;
- the prefix pins the binding/import form, names, module specifiers, ordering, spacing, and trailing import-block separator, so an allowlisted side-effect import or standalone type-only substitution cannot reuse the same specifier identity and pass;
- it parses the bounded TypeScript runtime closure rather than trusting regex-derived import specifiers;
- the closure is exactly `strategy-proposal.ts`, `contracts.ts`, and `strategy-proposal-contracts.ts`;
- exact runtime dependencies are fixed for each closure member;
- only `node:crypto` and `node:util` may escape the local closure;
- relative dependencies must resolve to a named closure member;
- dynamic, standalone type-only, side-effect, or otherwise unrecognized import forms fail through the exact-prefix, import-declaration count, or parser/dependency invariants;
- `strategy-proposal-contracts.ts` remains no-import;
- the forbidden authority-surface scan covers all three closure source texts, including the canonical `contracts.ts` dependency.

The Python half contains no security-critical `assert`. Every invariant uses explicit `need(...)` or an explicit exception and therefore remains active under `PYTHONOPTIMIZE` / optimized Python execution. Missing owner-only bypass fields continue to mean only `UNAVAILABLE_UNDER_ACTIONS_TOKEN`; visible non-canonical values fail. External owner-level no-bypass proof remains mandatory.

## Authorized Unit B — one-path trusted pin/lifecycle/PR-identity repair

Only after PR #232 is canonical and post-merge proven, authorize a PR on branch:

```text
ci/k6-r5-stage-b-split-proof-pin-repair
```

It may modify exactly:

```text
.github/workflows/k6-r5-trusted-qualification.yml
```

It may only:

1. change the expected Stage B proof-body SHA from `ea87cea4795f910e95c84beaffe3184c38ec1926289358225aaca276768a1d2c` to `7216b701d0db142c1a2ac00dc199d67becb605f7a61dcd2a852cba60905ced6c`;
2. add immutable Stage B PR identity `226` and require both the event PR number and fetched live PR identity to equal exactly PR #226;
3. extend the protected-base identity chain by exactly the canonical PR #232 authorization merge and the registered Unit B repair merge;
4. prove the immutable chain preserving original R5 authorization, Stage A #225, PR #227 authorization, PR #228 repair, PR #232 authorization, and registered Unit B repair;
5. verify PR #232's merge ordered parents are `[0c151b3db8ab1487c5fcf1553060b4743ede155d, exact-qualified-#232-head]`, its merge tree equals the qualified #232 head tree, its document blob equals the qualified #232 document blob, and its GitHub merge verification is valid;
6. require current protected main for Stage B qualification to equal exactly the registered Unit B merge;
7. verify Unit B exact PR number, branch, head, base, one-path compare, ordered merge parents, merge-tree=head-tree, exact workflow blob and valid GitHub merge verification;
8. preserve `pull_request_target` protected-base execution, the exact six-path Stage B trigger and `permissions: contents: read`;
9. preserve no candidate-head checkout or candidate-head execution by the trusted inspector;
10. preserve every other Stage B run-body fingerprint, action pin, job/step/env control surface and predecessor blob check;
11. preserve split ruleset visibility and external owner no-bypass proof;
12. grant no product/runtime/model/provider/persistence/network/training/autofix/release authority.

No generic descendant-main acceptance is authorized. The Unit B PR must use a fail-closed registration placeholder until GitHub assigns its PR number, then move forward only with a registration commit. Any head movement invalidates exact-head evidence.

### Unit B qualification gate

The exact final Unit B head must prove:

- base equals the canonical PR #232 merge;
- exactly one changed path, the trusted workflow only;
- `behind_by=0`;
- PR open, non-draft and mergeable;
- trigger, permissions and no-head-execution boundary unchanged;
- Stage B PR number is fixed to 226;
- only the dedicated Stage B proof fingerprint changes among Stage B run fingerprints;
- fresh exact-head required GitHub Actions checks succeed;
- fresh substantive Qodo and CodeRabbit reviews are terminal clean;
- zero unresolved actionable review threads;
- owner ruleset proof is active/no-bypass/exact required contexts;
- guarded normal merge uses exact expected head;
- post-merge main/ordered-parents/tree/blob/signature/check/ruleset proof succeeds;
- `WAIVER=NO`.

## Authorized Unit C — PR #226 reconciliation and exact Stage B body

Only after Unit B is canonical and post-merge proven may PR #226 move again.

PR #226 must incorporate then-current protected main through a normal forward merge only:

```text
NO REBASE
NO FORCE-PUSH
NO HISTORY REWRITE
```

Compare from the new protected main to the reconciled PR #226 head must contain exactly the original six authorized Stage B paths and no seventh path.

For this governance repair, no source/runtime/schema/test behavior may change. Within `.github/workflows/k6-r5-bounded-strategy-qualification.yml` only, authorize exactly:

1. `K6_R5_TRUSTED_WORKFLOW_BLOB` becomes the exact canonical Unit B trusted-workflow blob;
2. `Prove forbidden R5 authority surfaces and live ruleset` becomes byte-for-byte the body specified in this record, hashing to `7216b701d0db142c1a2ac00dc199d67becb605f7a61dcd2a852cba60905ced6c`.

No other trigger, permission, job-level environment, action metadata, step metadata, or run body may drift.

### PR #226 final qualification gate

The exact final Stage B head must prove:

- identity is exactly PR #226;
- base equals the canonical Unit B merge;
- compare contains exactly six authorized Stage B paths;
- `behind_by=0`;
- base-controlled `k6-r5-trusted-qualification` succeeds;
- dedicated `k6-r5-bounded-strategy-qualification` succeeds;
- required `provenance`, `legacy-tests`, and `k2-runtime-gate` succeed from integration `15368`;
- all applicable R5 corpus/identity/adversarial/predecessor/runtime/Python/Ruff/provenance gates succeed;
- fresh exact-head Qodo and CodeRabbit reviews are terminal clean;
- zero unresolved actionable threads;
- owner ruleset proof remains active/no-bypass/exact required contexts immediately before merge;
- guarded normal merge uses exact final head;
- `WAIVER=NO`.

Historical predecessor workflows intentionally non-applicable to R5 must not be mislabeled as green.

## PR #232 authorization-candidate qualification gate

This authorization is not canonical unless its exact final head proves:

1. PR number is exactly #232 and base SHA is exactly `0c151b3db8ab1487c5fcf1553060b4743ede155d`;
2. live protected main still equals exactly `0c151b3db8ab1487c5fcf1553060b4743ede155d` immediately before merge;
3. changed-file set is exactly this one documentation path;
4. `behind_by=0`;
5. PR open, non-draft and mergeable;
6. required exact-head GitHub Actions checks are terminal success from the required integration;
7. fresh substantive exact-head Qodo review is terminal clean;
8. fresh substantive exact-head CodeRabbit review is terminal clean;
9. zero unresolved actionable review threads;
10. owner ruleset proof confirms active/no-bypass/exact required contexts;
11. guarded normal merge uses exact expected-head precondition;
12. authorization merge ordered parent 1 equals `0c151b3db8ab1487c5fcf1553060b4743ede155d` and parent 2 equals the exact qualified final #232 head;
13. post-merge main/tree/document-blob/signature/check/ruleset proof succeeds;
14. `WAIVER=NO`.

## Mandatory Stage B post-merge proof

After PR #226 merges, require at minimum:

1. protected main equals the returned Stage B merge SHA;
2. ordered parent 1 equals canonical Unit B merge;
3. ordered parent 2 equals the exact qualified Stage B head;
4. merge tree equals the exact qualified Stage B head tree;
5. all six canonical Stage B blobs equal the qualified head blobs;
6. GitHub merge signature is verified and valid;
7. applicable post-merge required checks succeed;
8. ruleset remains active;
9. owner `bypass_actors=[]`;
10. owner `current_user_can_bypass=never`;
11. exact required contexts/integration identities remain unchanged;
12. `WAIVER=NO`.

Only then may PR #226 be treated as canonically merged.

## K6-R5 closeout remains separate

Neither this authorization, Unit B, nor PR #226 merge itself declares `K6-R5=CLOSED_CANONICAL`. After Stage B post-merge proof, a separately qualified roadmap/ledger reconciliation remains mandatory. K6 bounded closeout remains before general KodacBench unless later canonical authority changes the dependency order.

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

The boundary remains:

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
PIN_AMENDMENT_AUTHORIZED=NO
STAGE_B_MERGE=BLOCKED
WAIVER=NO
```

After this record becomes canonical and post-merge proven:

```text
PIN_AMENDMENT_AUTHORIZED=YES_ONE_PATH_UNIT_B_ONLY
PR_226_FORWARD_RECONCILIATION=AUTHORIZED_ONLY_AFTER_UNIT_B_CLOSEOUT
STAGE_B_MERGE=STILL_REQUIRES_FRESH_EXACT_HEAD_PROOF
WAIVER=NO
```
