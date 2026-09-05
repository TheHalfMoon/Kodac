# Kodac P6-R1 — Deterministic Security Finding Foundation Authorization Candidate

Status: **AUTHORIZATION_CANDIDATE / NOT_CANONICAL / NO_IMPLEMENTATION_AUTHORITY UNTIL MERGED AND PROVEN**  
Date: 2026-09-05  
Decision owner: Kodac founder  
Waiver: **NO**

---

## 1. Deny-by-default state

This record authorizes only one future pure/data-only deterministic security-finding contract after this exact authorization record itself qualifies, merges normally into protected `main`, and passes mandatory post-merge proof.

```text
CANONICAL_MAIN_AT_CANDIDATE_START = 48a4d0944c620a8cca7f25ea7eb24e794be8768f
CANONICAL_TREE_AT_CANDIDATE_START = 93f2efa575dd24a4aa0775f13aed65416ffc9208
P5 BOUNDED R1-R2 ENGINEERING SCOPE = CLOSED_CANONICAL
P5 POST-CLOSEOUT CURRENT-VIEW RECONCILIATION = CLOSED_CANONICAL / PR #343 / proof 5551673149
P5 OVERALL = NOT_CLOSED
P5-R3+ = NOT_AUTHORIZED
P6-R1 DETERMINISTIC SECURITY FINDING = AUTHORIZATION_CANDIDATE ONLY
P6 OVERALL = NOT_CLOSED
P6-R2+ = NOT_AUTHORIZED
P7-P9 IMPLEMENTATION = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

This record does not authorize scanner/analyzer execution, SARIF ingestion, provider/model invocation, secret access, network access, exploit execution, dependency admission, persistence, product/API/CLI integration, release, or project completion.

---

## 2. Canonical basis and non-duplication evidence

Fresh post-P5 successor analysis is recorded at:

```text
PR #343 / comment 5551702980
CLASS = ANALYSIS_ONLY
AUTHORITY_CREATED = NO
CONCLUSION = MINIMUM NON-DUPLICATIVE UNIT IS P6 DETERMINISTIC SECURITY FINDING FOUNDATION
```

The analysis re-read the Trust and Verification v2 planning direction and GAP-13 and performed a live-code duplication audit.

Existing canonical mechanisms that must remain separate and unchanged:

```text
P4 REVIEWER / AGENTIC SECURITY CLAIM SUBSTRATE
packages/kodac-runtime/src/reviewer-intelligence/p4-claim-envelope.ts
  blob = e9a59acf25c05276dddf80e269be4ae03e5e6775

P5 EVIDENCE PROVENANCE
packages/kodac-runtime/src/verification/p5-evidence-provenance.ts
  blob = 4c8d708070e950d2902308ca1977ce5267acec29

P5 EVIDENCE RELATION
packages/kodac-runtime/src/verification/p5-evidence-relation.ts
  blob = d33fb119ee8cbeda6e7c8e445cad6cee4b242e86

K5 PROOF / LINKAGE / RECONCILIATION
packages/kodac-runtime/src/proof-review/*

K2
UNIQUE TRUSTED SIDE-EFFECT EXECUTION BOUNDARY
```

Fresh live repository inspection found no canonical runtime `security/` module and no runtime implementation of `STATIC_FINDING`, `ProviderArtifactType`, `AnalyzerExecutionManifest`, SARIF ingestion, or provider-specific scanner normalization.

The concrete gap is therefore a first-class pure/data-only security finding identity for deterministic analyzer output, not another reviewer claim, provenance system, evidence relation, proof package, or execution mechanism.

---

## 3. Exact future implementation allowlist

Only after this authorization record becomes canonical and post-merge proven may one later P6-R1 implementation candidate modify exactly these three paths:

```text
packages/kodac-runtime/src/security/p6-deterministic-security-finding.ts
schema/p6-deterministic-security-finding.schema.json
packages/kodac-runtime/test/p6-r1-deterministic-security-finding.test.ts
```

No fourth path is authorized.

In particular, this authorization does **not** permit changes to package-root exports, `index.ts`, CLI/API surfaces, workflows, dependencies/lockfiles, P4/KRI/P5/K5/K2 source, evidence persistence, current roadmap views, product surfaces, or release configuration.

---

## 4. Required bounded P6-R1 semantics

The implementation must define one versioned deterministic contract purpose-equivalent to:

```text
P6DeterministicSecurityFinding {
  version = "p6-r1-deterministic-security-finding-v1"
  findingIdentity
  origin = "DETERMINISTIC_ANALYZER"
  provenanceBinding
  lane
  ruleId
  severity
  location
  nativeRecordDigest
  fingerprint
  referenceIds
}
```

### Provenance binding

`provenanceBinding` must be a fully validated canonical P5-R1 `P5EvidenceProvenanceBinding`. P6-R1 must reuse P5-R1 validation/identity semantics rather than duplicating repository revision, producer, configuration, policy, scope, input, environment, or freshness fields.

P6-R1 may accept both P5-R1 `CURRENT` and `STALE` historical provenance. It must not compute or promote freshness itself.

### Origin

```text
origin = DETERMINISTIC_ANALYZER
```

is fixed. Reviewer/model/agentic claims remain P4/KRI territory and must not be silently normalized through this deterministic lane.

### Security lane

The exact closed P6-R1 lane vocabulary is:

```text
STATIC_ANALYSIS
DEPENDENCY_ANALYSIS
SECRET_DETECTION
SUPPLY_CHAIN_PROVENANCE
CI_WORKFLOW_INTEGRITY
```

These values classify deterministic finding source semantics only. They do not imply successful execution or proof.

### Rule identity

`ruleId` must be a bounded non-empty inert ASCII identifier. It may identify a scanner rule/query/check but must not execute or interpolate anything.

### Severity

The exact closed P6-R1 severity vocabulary is:

```text
BLOCKER
CRITICAL
HIGH
MEDIUM
LOW
INFO
```

Severity is caller-supplied finding metadata, not Done Gate authority.

### Location

`location` is inert logical repository metadata only:

```text
{
  path,
  startLine?,
  endLine?
}
```

`path` must be repository-relative POSIX text. Absolute paths, backslashes, NUL, empty segments, `.` segments, and `..` segments must fail closed. If either line is present, both must be present and satisfy a bounded `1 <= startLine <= endLine` rule.

P6-R1 must not access the filesystem, resolve symlinks, dereference the path, inspect Git, or claim physical containment.

### Provider-native evidence identity

```text
nativeRecordDigest = lowercase SHA-256
fingerprint = lowercase SHA-256
```

P6-R1 must not store provider-native raw payload bytes. The digest/fingerprint are identities only.

### Reference identities

`referenceIds` must be a bounded sorted/deterministically normalized unique list of bounded inert text identifiers. They may represent CVE/GHSA/rule/advisory/reference identities but do not establish their truth.

---

## 5. Secret-safety and raw-payload boundary

The P6-R1 normalized finding schema must contain **no field for raw secret material or raw analyzer match payload**.

At minimum, unknown fields such as the following must fail closed:

```text
secret
match
rawPayload
rawRecord
capturedText
stdout
stderr
```

For `SECRET_DETECTION`, captured secret bytes must never be stored in the P6-R1 finding. Only digest/fingerprint/reference identity metadata is permitted.

This contract does not authorize secret retrieval, credential access, redaction execution, or provider artifact storage.

---

## 6. Determinism and hostile-input requirements

The future implementation must be pure/data-only and fail closed. It must provide deterministic content addressing over canonical semantic content and return a detached deeply immutable result.

Required hostile-input behavior includes:

```text
Proxy input = rejected before caller-owned reflective traps execute
revoked Proxy = rejected
accessor/getter property = rejected without executing getter
symbol fields = rejected
custom object/array prototype = rejected
sparse arrays = rejected where arrays are accepted
cycles = rejected
invalid Unicode scalar strings = rejected
unknown fields = rejected
missing required fields = rejected
invalid SHA / path / line / enum / duplicate reference = rejected
caller mutation after build/validation = cannot alter returned record
```

All string/resource collection limits must be explicit and bounded. Code/schema/test semantics must agree, including Unicode length semantics.

---

## 7. Explicit non-equivalences and non-grants

```text
DETERMINISTIC SECURITY FINDING != PROOF
DETERMINISTIC SECURITY FINDING != TRUTH
DETERMINISTIC SECURITY FINDING != ADJUDICATION
DETERMINISTIC SECURITY FINDING != EXPLOITABILITY ESTABLISHED
DETERMINISTIC SECURITY FINDING != CLEAN-SCAN / SAFE CLAIM
DETERMINISTIC SECURITY FINDING != REVIEWER CLAIM
DETERMINISTIC SECURITY FINDING != VERIFIER EXECUTION
DETERMINISTIC SECURITY FINDING != SCANNER / ANALYZER EXECUTION
DETERMINISTIC SECURITY FINDING != SARIF PARSER / INGESTION
DETERMINISTIC SECURITY FINDING != ANALYZER EXECUTION MANIFEST
DETERMINISTIC SECURITY FINDING != EFFECTIVE SANDBOX POLICY RECEIPT
DETERMINISTIC SECURITY FINDING != SECRET ACCESS
DETERMINISTIC SECURITY FINDING != NETWORK ACCESS
DETERMINISTIC SECURITY FINDING != DEPENDENCY ADMISSION
DETERMINISTIC SECURITY FINDING != K2 / K5 / DONE GATE AUTHORITY
P6-R1 CLOSED != P6-R2+ AUTHORITY
P6-R1 CLOSED != P6 OVERALL CLOSED
P6-R1 CLOSED != P7 AUTHORITY
```

Also preserved:

```text
NEW DEPENDENCY / DONOR ADMISSION = NONE
PROVIDER / MODEL / SCANNER INVOCATION = NOT_AUTHORIZED
NETWORK = NOT_AUTHORIZED
REAL SECRET / CREDENTIAL ACCESS = NOT_AUTHORIZED
EXPLOIT / ATTACK EXECUTION = NOT_AUTHORIZED
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

---

## 8. Required implementation tests

The later three-path implementation must include adversarial tests proving at least:

1. deterministic build/validate identity;
2. equivalent semantic input yields the same identity;
3. returned record is detached/deeply frozen;
4. tampered P5-R1 provenance identity is rejected;
5. fixed origin is enforced;
6. every lane and severity boundary is enforced;
7. repository-relative inert path rules are enforced;
8. optional line-range completeness/order/bounds are enforced;
9. SHA-256 native digest/fingerprint are enforced;
10. reference identities are bounded, unique and deterministic;
11. unknown/missing fields fail closed;
12. Proxy traps and getters are not executed;
13. revoked Proxy/custom prototype/symbol/cycle/invalid Unicode inputs fail closed;
14. raw-secret/raw-match/raw-payload field attempts fail closed;
15. no filesystem, Git, process, scanner, provider, model, network, secret, persistence, or other side effect occurs.

---

## 9. Qualification gate for this authorization candidate

Do not merge this one-path authorization unless one unchanged exact head/current metadata proves:

```text
BASE == CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY 1
CHANGED_PATH = docs/planning/KODAC_P6_R1_DETERMINISTIC_SECURITY_FINDING_AUTHORIZATION_2026-09-05.md
REQUIRED CI = TERMINAL SUCCESS OR CANONICALLY PROVEN NON_APPLICABLE
INTERNAL SUBSTANTIVE SEMANTIC INSPECTION = CLEAN
KNOWN ACTIONABLE DEFECTS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
REQUIRED_EXTERNAL_SEMANTIC_REVIEW_COUNT = 0
EXTERNAL_REVIEW = OPTIONAL_ADVISORY_EVIDENCE
RULESET 20707483 = active / bypass_actors=[] / current_user_can_bypass=never
MERGE = GUARDED NORMAL MERGE USING exact expected_head_sha
POST_MERGE_PROOF = main + ordered parents + tree + authorization blob + verified/valid signature + applicable push checks + merged PR state + ruleset
WAIVER = NO
```

Any base/head/byte/qualification-relevant movement invalidates exact-head qualification evidence.

---

## 10. Candidate boundary

Until this authorization itself qualifies, merges, and passes mandatory post-merge proof:

```text
P6_R1_IMPLEMENTATION = NOT_AUTHORIZED
P6_R2_PLUS = NOT_AUTHORIZED
SCANNER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_EXECUTION = NOT_AUTHORIZED
NEW_DEPENDENCIES = NONE
P7_P9_IMPLEMENTATION = NOT_AUTHORIZED
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```
