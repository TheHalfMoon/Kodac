# Kodac Engineering Roadmap

## Authority

This is a current engineering roadmap view only. It does not create implementation, execution, dependency, release, provider/model, persistence, learning, benchmark, donor, successor, merge, or project-completion authority. Live GitHub, root `AGENTS.md`, accepted ADRs, and exact canonical authorization/evidence records control.

---

## Current program state

| Program / gate | State | Boundary |
| --- | --- | --- |
| K0 / K1 | **CLOSED** | Foundation |
| K2 | **CLOSED** | Trusted side-effect execution boundary unchanged |
| K3 bounded R1-R6 | **CLOSED** | No later K3 authority by numbering |
| KRI-R1 through KRI-R4 | **CLOSED_CANONICAL** | Reviewer-intelligence substrate |
| K4 bounded R1-R5 | **CLOSED_CANONICAL** | Bounded data-only scope |
| K5 bounded R1-R5 | **CLOSED_CANONICAL** | Proof-review substrate; Done Gate unchanged |
| K6 bounded closeout | **CLOSED_CANONICAL** | No later authority by composition |
| P2-R1 through P2-R6 | **CLOSED_CANONICAL** | Bounded benchmark mechanisms |
| P2 overall | **OPEN** | General/public KodacBench not closed |
| P3 bounded R1-R17 engineering scope | **CLOSED_CANONICAL** | Aggregate bounded scope only |
| P3 overall | **OPEN** | No general promotion/default/superiority claim |
| P4 bounded R1-R2 engineering scope | **CLOSED_CANONICAL** | Aggregate bounded scope only |
| P4 overall | **OPEN** | No overall closure |
| P5-R1 Evidence Provenance Binding | **CLOSED_CANONICAL** | PR #333 / proof `5550968215` |
| P5-R2 Evidence Relation Edge | **CLOSED_CANONICAL** | PR #337 / proof `5551261065` |
| P5 bounded R1-R2 engineering scope | **CLOSED_CANONICAL** | PR #341 / proof `5551577054` |
| P5 post-closeout current-view reconciliation | **CLOSED_CANONICAL** | PR #343 / proof `5551673149` |
| P5-R3+ | **NOT_AUTHORIZED** | No authority by numbering/composition |
| ProofGraph | **NOT_AUTHORIZED** | Planning direction only |
| Automatic freshness / dependency invalidation | **NOT_AUTHORIZED** | Separate future authority required |
| P5 overall | **NOT_CLOSED** | Bounded R1-R2 closure is not overall closure |
| P6-R1 authorization | **CLOSED_CANONICAL** | PR #344 / proof `5551754576` |
| P6-R1 Deterministic Security Finding Foundation | **CLOSED_CANONICAL** | PR #345 / proof `5551884329` |
| P6-R1 reconciliation authorization | **CLOSED_CANONICAL** | PR #346 / proof `5551929413` |
| P6-R1 current-view reconciliation | **CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL** | Exactly five current-view paths |
| P6-R2+ | **NOT_AUTHORIZED_BY_NUMBERING** | Fresh successor analysis required after reconciliation |
| P6 overall | **NOT_CLOSED** | P6-R1 closure is bounded only |
| Scanner/analyzer execution | **NOT_AUTHORIZED** | P6-R1 is pure/data-only |
| SARIF ingestion | **NOT_AUTHORIZED** | Separate future authority required |
| Secret/network/exploit access | **NOT_AUTHORIZED** | No side-effect authority created |
| P7-P9 | **IMPLEMENTATION NOT_AUTHORIZED** | Planning direction only |
| Project completion | **NOT_ESTABLISHED** | No canonical completion proof exists |

---

## Canonical P5-to-P6 sequence

```text
#332 P5-R1 authorization
  -> #333 P5-R1 implementation
  -> #334 P5-R1 reconciliation authorization
  -> #335 P5-R1 current-view reconciliation
  -> #336 P5-R2 authorization
  -> #337 P5-R2 implementation
  -> #338 P5-R2 reconciliation authorization
  -> #339 P5-R2 current-view reconciliation
  -> #340 bounded R1-R2 closeout authorization
  -> #341 bounded R1-R2 engineering closeout
  -> #342 post-closeout current-view reconciliation authorization
  -> #343 P5 post-closeout current-view reconciliation
  -> #343 comment 5551702980 fresh successor analysis / ANALYSIS_ONLY
  -> #344 P6-R1 authorization
  -> #345 P6-R1 deterministic security finding implementation
  -> #345 comment 5551909496 current-view reconciliation analysis / ANALYSIS_ONLY
  -> #346 P6-R1 current-view reconciliation authorization
  -> CURRENT: exact five-current-view reconciliation candidate
```

Canonical P6 anchors:

```text
#343 P5 reconciliation = 48a4d0944c620a8cca7f25ea7eb24e794be8768f / proof 5551673149
#344 P6-R1 authorization = 208bfc370c8671bd9b5a71d659355aa08e40d65a / proof 5551754576
#345 P6-R1 implementation = 0f907b6f6e12a15da753e836b124c586ee9fe285 / proof 5551884329
#345 final qualified implementation head = 60bc2e3e157b8eacac145ef22fa7cdaae1428baa
#346 P6-R1 reconciliation authorization = acce1c1644250cc4afd2008175d41d41ca51de87 / proof 5551929413
```

---

## Bounded P6-R1 semantics

P6-R1 is one pure/data-only provider-neutral deterministic security finding record:

```text
validated canonical P5-R1 provenance binding
+ fixed DETERMINISTIC_ANALYZER origin
+ closed security lane vocabulary
+ bounded inert rule identity
+ closed severity vocabulary
+ bounded inert repository-relative logical location
+ lowercase SHA-256 native-record digest
+ lowercase SHA-256 fingerprint
+ bounded unique canonically sorted reference identities
-> deterministic content-addressed detached/frozen finding record
```

Canonical implementation blobs:

```text
packages/kodac-runtime/src/security/p6-deterministic-security-finding.ts = 453166c7f8c5e49f9b0f7cc2cd744c7ec54b38d0
schema/p6-deterministic-security-finding.schema.json = d7586b0d434cca713ea7d112d6d1b0407558cc50
packages/kodac-runtime/test/p6-r1-deterministic-security-finding.test.ts = fa489fafd8cb8ecfc3ff684fa08425b1ed48ab67
```

Required non-equivalences:

```text
DETERMINISTIC_SECURITY_FINDING != PROOF / TRUTH / ADJUDICATION
DETERMINISTIC_SECURITY_FINDING != EXPLOITABILITY_ESTABLISHED
DETERMINISTIC_SECURITY_FINDING != CLEAN_SCAN_OR_SAFE_CLAIM
DETERMINISTIC_SECURITY_FINDING != REVIEWER_CLAIM
DETERMINISTIC_SECURITY_FINDING != VERIFIER_OR_SCANNER_EXECUTION
DETERMINISTIC_SECURITY_FINDING != SARIF_INGESTION
DETERMINISTIC_SECURITY_FINDING != SECRET_OR_NETWORK_ACCESS
DETERMINISTIC_SECURITY_FINDING != K2_K5_DONE_GATE_AUTHORITY
P6-R1 CLOSED != P6-R2+ AUTHORITY
P6-R1 CLOSED != P6 OVERALL CLOSED
P6-R1 CLOSED != P7 AUTHORITY
```

---

## Material qualification history

P6-R1 first failed exact-head TypeScript qualification at `4953d0f3a1fa2f639e494ef74aedc4fb5c83bdea` because of test-only readonly-array mutation-fixture casts. All evidence on that head was discarded. A forward-only repair inside the authorized test path produced final head `60bc2e3e157b8eacac145ef22fa7cdaae1428baa`; source/schema blobs remained unchanged and the final head was requalified from scratch across Ubuntu, Windows, and macOS.

---

## Current reconciliation boundary

Canonical #346 and proof `5551929413` authorize exactly:

```text
docs/roadmap/NEXT.md
docs/roadmap/ROADMAP.md
docs/roadmap/MILESTONES.md
docs/roadmap/VERSION_PLAN.md
docs/product/STATUS.md
```

No sixth path. This candidate may record only already-proven P5 and P6-R1 truth and cannot certify its own future post-merge proof.

Until external proof exists:

```text
P6_R1_POST_MERGE_CURRENT_VIEW_RECONCILIATION = CURRENT_CANDIDATE / NOT_YET_CLOSED_CANONICAL
```

---

## Preserved authority boundaries

```text
K2 SIDE-EFFECT AUTHORITY = UNCHANGED
K5 / DONE GATE AUTHORITY = UNCHANGED
P2 OVERALL = OPEN
P3 OVERALL = OPEN
P4 OVERALL = OPEN
P5 OVERALL = NOT_CLOSED
GENERAL / PUBLIC KODACBENCH = NOT CLOSED
P5-R3+ = NOT_AUTHORIZED
PROOFGRAPH = NOT_AUTHORIZED
AUTOMATIC FRESHNESS / DEPENDENCY INVALIDATION = NOT_AUTHORIZED
P6-R2+ = NOT_AUTHORIZED_BY_NUMBERING
P6 OVERALL = NOT_CLOSED
SCANNER_ANALYZER_EXECUTION = NOT_AUTHORIZED
SARIF_INGESTION = NOT_AUTHORIZED
REVIEWER / CRITIC / VERIFIER / PROVIDER / MODEL EXECUTION EXPANSION = NOT_AUTHORIZED
SECRET_ACCESS = NOT_AUTHORIZED
NETWORK_ACCESS = NOT_AUTHORIZED
EXPLOIT_ATTACK_EXECUTION = NOT_AUTHORIZED
KRI / K5 / K2 AUTHORITY MUTATION = NOT_AUTHORIZED
NEW DEPENDENCY / DONOR ADMISSION = NONE
PERSISTENCE / DATABASE / TELEMETRY / UPLOAD / LEARNING = NOT_AUTHORIZED
AUTOFIX / REMEDIATION EXECUTION = NOT_AUTHORIZED
CLI / API / PACKAGE-ROOT / PRODUCT INTEGRATION = NOT_AUTHORIZED
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT = NOT_AUTHORIZED
P7-P9 IMPLEMENTATION = NOT_AUTHORIZED
RULESET CHANGE / BYPASS = NOT_AUTHORIZED
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

Only after this reconciliation is post-merge proven may fresh P6 successor analysis run. Do not infer P6-R2, scanner execution, SARIF, attack validation, dependency admission, P7, or any later stage by numbering or composition. If no concrete non-duplicative P6 mechanism is proven necessary, analyze bounded P6 closeout instead.
