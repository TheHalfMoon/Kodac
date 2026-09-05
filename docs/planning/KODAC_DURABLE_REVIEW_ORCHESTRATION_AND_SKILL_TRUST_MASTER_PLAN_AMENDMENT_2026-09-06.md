# Kodac Durable Review Orchestration and Skill Trust Master Plan Amendment

## Record identity

```text
STATUS = PLANNING_AMENDMENT_CANDIDATE / NOT_CANONICAL
CANDIDATE_DATE = 2026-09-06
DECISION_OWNER = KODAC FOUNDER
CANONICAL_BASE_AT_CREATION = 531ac2c869bfba418238aeffbabe672d0ad27620
CANONICAL_BASE_TREE_AT_CREATION = f2a72263f951ab9cdb988ff40fab2230a9297816
P7_R7_IMPLEMENTATION_MERGE = PR #380 / 531ac2c869bfba418238aeffbabe672d0ad27620
P7_R7_POST_MERGE_PROOF_AT_CANDIDATE_CREATION = PENDING_REVERIFICATION
EXTERNAL_REFERENCE = vercel-labs/openreview
EXTERNAL_REFERENCE_HEAD = 672deb21e70e471e0536d5ad7a67c14b8359e97e
REFERENCE_CLASS = PRODUCT_PATTERN / ARCHITECTURE_INPUT / REFERENCE_ONLY
SOURCE_CODE_BORROWING = NO
DEPENDENCY_ADMISSION = NONE
WAIVER = NO
```

This is an additive planning amendment. It supplements, and does not rewrite:

```text
docs/planning/KODAC_INTELLIGENCE_IMPROVEMENT_MASTER_PLAN_2026-08-26.md
docs/planning/KODAC_TRUST_AND_VERIFICATION_MASTER_PLAN_V2_AMENDMENT_2026-09-02.md
docs/research/KODAC_FINAL_GAP_AND_IMPROVEMENT_REVIEW_2026-08-26.md
```

Historical ADRs, authorization records, implementation evidence, current-view reconciliation records, merge proofs, and exact-head qualification evidence remain authoritative according to their own scope.

The founder request to study `vercel-labs/openreview` is planning input only. Neither the external repository nor this amendment creates implementation authority.

---

## 1. Authority and deny-by-default boundary

```text
CLASS = DOCUMENTATION / MASTER PLANNING AMENDMENT
IMPLEMENTATION AUTHORITY = NONE
P7_R8_PLUS AUTHORITY = NONE
P8 IMPLEMENTATION AUTHORITY = NONE
P9 IMPLEMENTATION AUTHORITY = NONE
GITHUB APP CREATION / INSTALLATION AUTHORITY = NONE
WEBHOOK ACTIVATION AUTHORITY = NONE
SANDBOX PROVIDER ADMISSION = NONE
SANDBOX EXECUTION AUTHORITY = NONE
PROVIDER / MODEL / REVIEWER INVOCATION AUTHORITY = NONE
DEPENDENCY / DONOR / SOURCE ADMISSION = NONE
PACKAGE INSTALLATION AUTHORITY = NONE
BINARY DOWNLOAD / EXECUTION AUTHORITY = NONE
NETWORK AUTHORITY = NONE
SECRET / TOKEN ACCESS AUTHORITY = NONE
PERSISTENCE / REDIS / DATABASE AUTHORITY = NONE
TELEMETRY / UPLOAD / LEARNING AUTHORITY = NONE
AUTOFIX / PATCH RETRY / REPAIR EXECUTION AUTHORITY = NONE
CLI / API / PRODUCT INTEGRATION AUTHORITY = NONE
PUBLIC RELEASE / PACKAGE PUBLICATION / DEPLOYMENT AUTHORITY = NONE
RULESET CHANGE / BYPASS AUTHORITY = NONE
PROJECT COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The amendment uses future-facing language such as `should`, `target`, `proposed`, and `candidate`. These words describe design direction only.

Live GitHub truth, root `AGENTS.md`, accepted ADRs, exact canonical authorization/evidence records, the active ruleset, and current protected-main state remain controlling.

---

## 2. Why this amendment exists

The existing Kodac plans already define a proof-oriented trust architecture, bounded execution through K2, exact-revision evidence, verifier separation, post-action re-proof, and future product integration.

The OpenReview reference exposes a narrower planning gap that deserves explicit treatment:

```text
HOW SHOULD A REVIEW AGENT BE ORCHESTRATED OVER TIME
WITHOUT TURNING ORCHESTRATION INTO AUTHORITY?
```

The useful product pattern is not "give an AI reviewer shell access and let it push fixes." The useful pattern is:

```text
EVENT-DRIVEN ENTRY
+ DURABLE / RESUMABLE WORKFLOW
+ EPHEMERAL EXECUTION ENVIRONMENT
+ PROGRESSIVE SPECIALIZED INSTRUCTIONS
+ PR-NATIVE HUMAN INTERACTION
+ CLEAR STEP DECOMPOSITION
```

Kodac should adopt those ideas only after translating them into its stronger trust model:

```text
ORCHESTRATION != AUTHORITY
SANDBOX != AUTHORITY
SKILL != POLICY
MENTION != AUTHORIZATION
REACTION != AUTHORIZATION
MODEL TOOL CALL != EXECUTION AUTHORITY
AGENT FILE EDIT != AUTHORIZED PATCH
AGENT PUSH != GUARDED MERGE
WORKFLOW RESUME != EVIDENCE FRESHNESS
```

This amendment makes that translation explicit.

---

## 3. External reference qualification — `vercel-labs/openreview`

Reference snapshot:

```text
REPOSITORY = vercel-labs/openreview
REFERENCE_HEAD = 672deb21e70e471e0536d5ad7a67c14b8359e97e
DEFAULT_BRANCH = main
LANGUAGE = TypeScript
SELF_DESCRIPTION = open-source self-hosted AI code review bot
PROJECT_STATUS = BETA per README
```

Observed useful patterns at the reference snapshot:

1. A GitHub mention starts a durable workflow.
2. Workflow state is split into explicit steps.
3. Repository work occurs inside an ephemeral sandbox.
4. Specialized skills are discovered and loaded progressively.
5. The agent can inspect the PR, run project tooling, comment inline, and propose/edit code.
6. PR reactions are used as a compact human interaction mechanism.
7. Sandbox cleanup occurs in a `finally` boundary.

Observed trust-model differences that Kodac must not copy directly:

1. The agent receives a general-purpose bash tool.
2. The agent is told an authenticated `gh` CLI is available.
3. The workflow may `git add -A` and `git commit --no-verify` before pushing.
4. Branch-protection reads that return `403` or `404` are treated as non-blocking in the observed push-access check.
5. Dependency installation may download/install tooling dynamically.
6. A repository write-capable GitHub token is used as part of the sandbox/repository workflow.
7. The product binds directly to one model configuration in current code rather than a Kodac-owned provider-neutral trust contract.
8. Optional Redis persistence is a product convenience, not a Kodac privacy/retention contract.
9. Tool-output truncation is used for model-context management without a separate Kodac-style evidence identity layer.
10. Repository-local skills are loaded as agent instructions without the stronger candidate-policy-poisoning separation Kodac requires.

### License/provenance boundary

The OpenReview README states `MIT`, while the GitHub repository metadata observed during this review reports no detected repository license and the root listing inspected for this planning review did not expose a `LICENSE` file.

Therefore:

```text
OPENREVIEW_DESIGN_STUDY = ALLOWED_AS_REFERENCE_INPUT
OPENREVIEW_SOURCE_COPYING = NOT_ADMITTED
OPENREVIEW_DEPENDENCY_ADMISSION = NONE
OPENREVIEW_CODE_DONOR_STATUS = NOT_ESTABLISHED
LICENSE_PROVENANCE_FOR_SOURCE_BORROWING = INSUFFICIENT_AT_THIS REVIEW BOUNDARY
```

Kodac may implement Kodac-owned semantics inspired by public product patterns. Source reuse, vendoring, dependency adoption, or donor import requires a later explicit provenance/license/admission record.

---

## 4. Core planning decision

Add a first-class **Durable Orchestration and Interaction** direction to the Trust v2 architecture while preserving K2 as the trusted side-effect execution boundary.

Target high-level relationship:

```text
GITHUB / CLI / AGENT EVENT
-> EVENT EVIDENCE ENVELOPE
-> EXACT SUBJECT / REVISION BINDING
-> DURABLE WORKFLOW RUN
-> BOUNDED CONTEXT + SKILL SELECTION
-> INTELLIGENCE / REVIEW / PROPOSAL
-> POLICY + AUTHORITY CHECK
-> K2 FOR ANY SIDE EFFECT
-> EXECUTION RECEIPTS
-> RESULT EVIDENCE
-> REVALIDATION
-> PR / USER FEEDBACK
-> K5 / DONE GATE WHERE APPLICABLE
```

The orchestration plane coordinates evidence and requests. It does not perform privileged side effects by implication.

---

## 5. New target Plane G — Durable Orchestration Plane

A future Kodac workflow runtime should model one review/remediation operation as an explicit, resumable state machine rather than one opaque agent session.

Potential workflow step families:

```text
TRIGGER_CAPTURE
SUBJECT_RESOLUTION
REVISION_BINDING
CONTEXT_ACQUISITION
SKILL_SELECTION
REVIEWER_RUN
CRITIC_RUN
VERIFIER_PLAN
POLICY_DECISION
EXECUTION_REQUEST
EXECUTION_RECEIPT_CAPTURE
RESULT_RECONCILIATION
PR_COMMENT_PUBLICATION
USER_INTENT_CAPTURE
REVALIDATION
CLOSEOUT
```

No step family is implemented or authorized by this amendment.

### Future step evidence envelope

Every material durable step should eventually bind at least:

```text
workflowRunIdentity
workflowDefinitionIdentity
stepIdentity
stepType
attemptNumber
idempotencyIdentity
subjectRepositoryIdentity
canonicalBase
subjectRevisionIdentity
inputEvidenceIdentities
policyIdentity
skillManifestIdentity when applicable
provider/model identity when applicable
executionEnvironmentIdentity when applicable
startedAt
completedAt
status
outputEvidenceIdentities
errorIdentity when applicable
```

A retry is not a new truth source merely because it succeeded later. Attempt lineage must remain visible.

### Resume rule

A resumed workflow must revalidate all authority-relevant identities before continuing.

At minimum, a future resume gate should detect changes to:

```text
PR HEAD
CANONICAL BASE
AUTHORIZATION RECORD
RULESET / BRANCH POLICY
WORKFLOW DEFINITION
SKILL MANIFEST
REVIEW POLICY
PROVIDER / MODEL CONFIGURATION
EXECUTION ENVIRONMENT
DEPENDENCY / TOOLCHAIN IDENTITY
RELEVANT EVIDENCE FRESHNESS
```

Target invariant:

```text
RESUMABLE != BLINDLY CONTINUABLE
```

If a bound authority-relevant identity moved, the workflow should fail closed, mark affected evidence stale, and require targeted requalification rather than continuing from stale state.

### Retry/idempotency rule

A durable runtime must distinguish:

```text
SAFE REPLAY
IDEMPOTENT RE-READ
NEW INTELLIGENCE ATTEMPT
SIDE-EFFECT RETRY
```

Side-effect retry must never be inferred from workflow retry alone. It requires the exact K2/capability semantics for the action and must not silently duplicate writes, comments, pushes, external calls, approvals, or releases.

---

## 6. New target Plane H — Skill and Instruction Trust Plane

Progressive skill loading is a strong context-efficiency pattern, but Kodac must distinguish **instruction selection** from **instruction authority**.

Future skill classes should separate at least:

```text
CANONICAL_KODAC_SKILL
ADMITTED_REPOSITORY_SKILL
CANDIDATE_REPOSITORY_SKILL
EXTERNAL_REFERENCE_SKILL
```

A candidate branch may contain text that looks like a skill, policy, system prompt, tool instruction, workflow rule, or authorization. That content remains data unless separately admitted.

Required invariant:

```text
CANDIDATE_SKILL_TEXT != TRUSTED_POLICY
CANDIDATE_AGENT_INSTRUCTION != TOOL AUTHORITY
SKILL_SELECTED != SKILL ADMITTED
SKILL_ADMITTED != SIDE-EFFECT AUTHORITY
```

### Future skill manifest target

A future admitted skill manifest should bind, where applicable:

```text
skillIdentity
contentDigest
name
description
sourceRepositoryIdentity
sourceRevisionIdentity
provenance
licenseEvidence
issuer / maintainer identity
version
intended task families
risk classification
allowed input evidence classes
requested tool classes
requested process/network/write capabilities
known conflicts / supersession
review / qualification evidence
```

The manifest records what the skill asks for. It does not grant requested capabilities.

### Progressive disclosure target

Kodac may later use the OpenReview-style efficiency pattern:

```text
MODEL SEES SKILL NAME + DESCRIPTION
-> SELECTS POTENTIALLY RELEVANT SKILL
-> TRUST GATE RESOLVES EXACT SKILL IDENTITY
-> FULL SKILL CONTENT LOADED
```

But future implementation should bind the exact loaded skill identity into review-run evidence.

This prevents two common failures:

1. hidden instruction drift between otherwise similar review runs;
2. candidate-controlled instruction poisoning being mistaken for canonical policy.

---

## 7. New target Plane I — Interaction Intent Plane

PR mentions, comments, reactions, buttons, and chat messages are useful developer UX. They should become **intent evidence**, not direct privileged authority.

A future interaction record should bind, where applicable:

```text
actorIdentity
repositoryIdentity
prNumber
comment / review / reaction identity
interactionType
exact target suggestion / finding / proposal identity
exact subject head at interaction time
timestamp
provider-authenticated event identity
```

Target invariants:

```text
@KODAC MENTION != EXECUTION AUTHORITY
THUMBS_UP != PATCH AUTHORITY
HEART REACTION != MERGE AUTHORITY
COMMENT "FIX THIS" != UNBOUNDED WRITE AUTHORITY
```

A reaction may support a later authorization decision only when it is bound to the exact proposal/revision and accepted by the governing policy.

If the PR head moves after the interaction, stale intent must not silently authorize action on the new head.

---

## 8. GitHub integration direction

OpenReview demonstrates the value of a native GitHub event loop. Kodac should retain that UX while splitting read, reasoning, and write authority.

Preferred future separation:

```text
GITHUB EVENT INGEST
-> AUTHENTICATED EVENT EVIDENCE

READ-ONLY GITHUB CONTEXT
-> BOUNDED REPOSITORY / PR READ CAPABILITIES

MODEL / REVIEWER
-> CLAIMS / PROPOSALS ONLY

WRITE / COMMENT / BRANCH / PR / MERGE ACTION
-> EXPLICIT POLICY / AUTHORITY
-> K2 OR SEPARATELY CANONICAL CAPABILITY BROKER
-> RECEIPT
```

The intelligence agent should not require a broad authenticated `gh` shell to be useful.

### Fail-closed repository protection

Future mutation eligibility should require positive evidence for relevant branch/ruleset state.

```text
PROTECTION / RULESET STATE READABLE + ACCEPTED -> CONTINUE ELIGIBILITY CHECK
PROTECTION / RULESET STATE UNKNOWN / FORBIDDEN / UNREADABLE -> FAIL CLOSED
```

An inability to read branch-protection or ruleset state must not be interpreted as evidence that no protection exists.

---

## 9. Sandbox direction

An ephemeral sandbox is a useful execution substrate. It is not a trust boundary by itself and it is not execution authority.

Target future relationship:

```text
K2 AUTHORIZED TYPED ACTION
-> ADMITTED EXECUTION BACKEND
-> EPHEMERAL SANDBOX / RUNNER
-> RESOURCE + NETWORK + FILESYSTEM POLICY
-> RECEIPT
-> SANDBOX CLEANUP / LEASE CLOSEOUT EVIDENCE
```

Potential sandbox requirements, subject to later authorization:

```text
immutable sandbox image/toolchain identity
ephemeral lease identity
strict TTL
bounded CPU / memory / output / time
read/write mount declarations
network default deny or exact allowlist
no ambient write-capable GitHub credential
no ambient production secret set
package installation disabled unless separately authorized
full command/process receipts
cleanup result evidence
```

Target invariant:

```text
ISOLATED != TRUSTED
```

---

## 10. Credential and token architecture

A future GitHub integration should prefer capability separation over one broad installation token exposed to the agent environment.

Potential target:

```text
EVENT VERIFICATION CREDENTIAL
READ-ONLY REPOSITORY CREDENTIAL
COMMENT / REVIEW PUBLICATION CAPABILITY
BOUNDED BRANCH WRITE CAPABILITY
MERGE CAPABILITY
```

These may share an underlying provider identity in implementation, but Kodac's trust contracts should distinguish them semantically.

The model should receive no secret value unless a separately authorized tool invocation strictly requires it, and secret material should not become model-visible evidence by default.

---

## 11. Dependency and toolchain acquisition

OpenReview highlights a practical issue that must be explicit in Kodac: a review sandbox often wants to install project dependencies or helper tools.

For Kodac, installation is a supply-chain action.

Future dependency/tool acquisition should bind, where applicable:

```text
package / binary identity
version
source registry / release origin
lockfile identity
integrity digest / signature evidence
license/provenance evidence
requested scripts / postinstall behavior
network destination
sandbox scope
cache identity
admission policy identity
```

Target invariants:

```text
LOCKFILE PRESENT != DEPENDENCY ADMITTED
PACKAGE MANAGER DETECTED != INSTALL AUTHORITY
CURL SUCCEEDED != BINARY TRUSTED
TOOL AVAILABLE != TOOL ADMITTED
```

No package manager, external binary, sandbox image, Vercel service, Redis service, GitHub App, or OpenReview dependency is admitted by this amendment.

---

## 12. Model-context and evidence-volume rule

OpenReview trims large tool results before returning them to the model. Kodac should preserve the efficiency goal while separating **model-visible context** from **authoritative evidence**.

Target pattern:

```text
FULL RAW EVIDENCE
-> CONTENT IDENTITY / PROVENANCE
-> BOUNDED SUMMARY OR SELECTED EXCERPT FOR MODEL
-> MODEL CLAIM REFERENCES FULL EVIDENCE IDENTITY
```

The model context may be truncated or summarized. The evidence used for proof must not become weaker merely because the model saw only a bounded representation.

Target invariant:

```text
CONTEXT TRUNCATION != EVIDENCE DELETION
```

---

## 13. P2 / KodacBench additions

Future KodacBench work should add orchestration and agent-trust test families rather than measuring only final review quality.

Candidate benchmark dimensions:

### Durable workflow correctness

- deterministic workflow identity;
- resume after worker interruption;
- retry lineage accuracy;
- idempotent read-step replay;
- duplicate side-effect prevention;
- stale-head resume rejection;
- workflow-definition drift invalidation;
- policy/skill drift invalidation.

### Event and interaction robustness

- duplicate webhook delivery;
- out-of-order webhook delivery;
- replayed reactions;
- reaction against superseded suggestion;
- PR head movement after approval-like intent;
- actor/repository/PR binding mismatch;
- forged or unauthenticated event rejection.

### Skill/instruction poisoning

- candidate modifies `.agents/skills`;
- candidate modifies reviewer instructions;
- candidate attempts to redefine tool permissions;
- skill name collision;
- stale skill identity;
- admitted vs candidate skill conflict;
- malicious skill requests shell/network/write authority.

### Sandbox and credential safety

- network-deny enforcement;
- ambient secret absence;
- GitHub token exposure attempts;
- path traversal;
- sandbox TTL cleanup;
- process/output/resource exhaustion;
- package-install denial when not authorized;
- failure to read protection state.

### Evidence/context integrity

- large tool output summarized for model while full evidence identity remains stable;
- summary/excerpt mismatch detection;
- evidence identity survives workflow resume;
- stale evidence is not promoted after subject movement.

No benchmark execution, corpus, participant, provider, or sandbox is authorized here.

---

## 14. P4 — Reviewer Intelligence amendment

Future P4 Reviewer Intelligence should support progressive specialist instructions without letting repository-controlled text redefine trust.

Preferred composition:

```text
PRIMARY REVIEWER
-> RISK HYPOTHESES
-> TRUSTED SKILL SELECTION WHEN NEEDED
-> SPECIALIST REVIEW
-> STRUCTURED CRITIC
-> FINDINGS WITH EXACT SKILL / POLICY / REVIEWER IDENTITIES
```

Review output should identify the exact instruction/skill identities that materially influenced the claim.

---

## 15. P5 — Proof and Verification amendment

Future P5 should treat durable workflow steps themselves as evidence-producing processes.

Potential future evidence families:

```text
WORKFLOW_TRIGGER_EVIDENCE
WORKFLOW_STEP_RESULT
WORKFLOW_RESUME_DECISION
SKILL_SELECTION_EVIDENCE
SKILL_LOAD_EVIDENCE
USER_INTENT_EVIDENCE
SANDBOX_LEASE_EVIDENCE
SANDBOX_CLEANUP_EVIDENCE
CAPABILITY_REQUEST
CAPABILITY_RECEIPT
```

These artifacts support proof. They do not automatically authorize later steps.

---

## 16. P6 — Security / supply-chain amendment

Add explicit future threat lanes for agentic review infrastructure:

```text
CANDIDATE POLICY POISONING
CANDIDATE SKILL POISONING
PROMPT / TOOL INSTRUCTION INJECTION
WEBHOOK REPLAY
REACTION REPLAY
STALE USER INTENT
GITHUB APP OVER-PRIVILEGE
WRITE TOKEN EXPOSURE
BRANCH-PROTECTION FAIL-OPEN
DEPENDENCY INSTALLATION TAMPERING
DOWNLOADED BINARY PROVENANCE
SANDBOX ESCAPE / CROSS-TENANT RISK
UNBOUNDED NETWORK EGRESS
SECRET EXFILTRATION
WORKFLOW RETRY DOUBLE-WRITE
WORKFLOW RESUME ON STALE EVIDENCE
```

Security validation should preserve deterministic evidence for these boundaries rather than relying only on model reasoning.

---

## 17. P7 — Bounded remediation amendment

Durable orchestration may coordinate future remediation, but it must not weaken the P7 proof chain.

Target relation:

```text
ADJUDICATED / ELIGIBLE FINDING
-> IMMUTABLE PATCH PROPOSAL
-> USER / POLICY INTENT EVIDENCE WHEN REQUIRED
-> EXACT WRITE AUTHORIZATION
-> K2 ACTION
-> EXECUTION RECEIPT
-> VERIFICATION
-> RE-REVIEW
-> K5 RECONCILIATION
-> DONE GATE
```

Explicit future prohibition:

```text
AGENT EDITED FILES
-> git add -A
-> git commit --no-verify
-> git push
```

is not an acceptable Kodac authority model by itself.

Kodac should preserve exact path allowlists, exact subject/head identities, explicit execution intent, bounded command/write capabilities, and post-action evidence.

This amendment does not authorize any new P7 slice, P7-R8+, retry, verification execution, patch application, or Done Gate transition.

---

## 18. P8 — Agent Trust Gateway and Developer Distribution amendment

P8 is the natural future home for the product ergonomics demonstrated by OpenReview, translated into Kodac trust semantics.

Potential future P8 surfaces:

```text
GITHUB APP ADAPTER
PR MENTION / COMMENT INTERFACE
REACTION / APPROVAL INTENT ADAPTER
DURABLE WORKFLOW RUNTIME
READ-ONLY REPOSITORY CONTEXT ADAPTER
PROGRESSIVE SKILL REGISTRY
SANDBOX BACKEND ADAPTER
K2 CAPABILITY BRIDGE
COMMENT / REVIEW PUBLISHER
LOCAL CLI / CI ADAPTER
MACHINE-READABLE WORKFLOW EVIDENCE
```

Target P8 principle:

```text
OPENREVIEW-LIKE UX
+ KODAC-LIKE TRUST
```

P8 should not require one cloud, one model, one workflow engine, one sandbox provider, one storage backend, or one code-review service.

Core deterministic trust should remain usable when richer providers are absent.

---

## 19. P9 — Continuous Assurance amendment

Durable workflows create long-lived state that can outlive the evidence that originally justified a step.

P9 should therefore include workflow-state freshness.

Potential future triggers:

```text
PR HEAD MOVED
RULESET CHANGED
AUTHORIZATION SUPERSEDED
SKILL UPDATED
WORKFLOW DEFINITION UPDATED
PROVIDER / MODEL CONFIG UPDATED
SANDBOX IMAGE UPDATED
DEPENDENCY LOCKFILE UPDATED
NEW SECURITY INTELLIGENCE
```

Target flow:

```text
BOUND IDENTITY CHANGED
-> IMPACTED WORKFLOW / EVIDENCE FOUND
-> STATE MARKED STALE
-> CONTINUATION BLOCKED
-> TARGETED REQUALIFICATION
```

---

## 20. Updated architecture thesis

The existing thesis remains correct:

```text
BEST TOOL FOR SIGNAL
+ KODAC FOR TRUST
```

This amendment adds:

```text
BEST WORKFLOW FOR ERGONOMICS
+ KODAC FOR AUTHORITY
```

and:

```text
PROGRESSIVE SKILLS FOR CONTEXT EFFICIENCY
+ KODAC FOR INSTRUCTION TRUST
```

The target product is not a generic AI reviewer with a shell. It is a durable, evidence-addressable, policy-governed software trust system whose intelligence can be rich while every side effect remains explicitly authorized and re-provable.

---

## 21. Decision matrix for OpenReview-derived patterns

| Pattern | Planning disposition | Reason |
| --- | --- | --- |
| Durable resumable workflow | ADOPT AS DESIGN DIRECTION | Improves reliability and explicit state transitions |
| Explicit workflow steps | ADOPT AS DESIGN DIRECTION | Maps naturally to evidence-producing contracts |
| Ephemeral sandbox lifecycle | ADOPT AS DESIGN DIRECTION | Useful execution substrate when separately admitted |
| Progressive skill loading | ADOPT WITH STRONGER TRUST BOUNDARY | Good context efficiency; candidate skills must remain untrusted |
| GitHub mention UX | ADOPT AS FUTURE INTENT INPUT | Convenient trigger, not authority |
| Reaction-based UX | ADOPT AS FUTURE INTENT EVIDENCE | Must bind exact actor/proposal/head and revalidate freshness |
| Inline review comments/suggestions | ADOPT AS PRODUCT PATTERN | Output remains claim/proposal |
| General-purpose agent bash | REJECT AS DEFAULT KODAC AUTHORITY MODEL | Too broad; use typed bounded capabilities |
| Authenticated general `gh` in agent shell | REJECT AS DEFAULT | Mixes intelligence and privileged GitHub authority |
| `git add -A` | REJECT FOR GUARDED REMEDIATION | Violates exact write-scope discipline |
| `git commit --no-verify` | REJECT AS TRUST DEFAULT | Bypasses local verification surface |
| Push after generic dirty-tree detection | REJECT AS KODAC PROOF MODEL | Requires exact proposal/write/receipt chain |
| Fail-open on unreadable branch protection | REJECT | Kodac must fail closed on unknown authority state |
| Dynamic package/tool install without prior admission | REJECT AS DEFAULT | Supply-chain action requires provenance/admission |
| Broad write token in sandbox | REJECT AS DEFAULT | Prefer capability-separated least privilege |
| Hard-coded provider/model | REJECT AS ARCHITECTURE REQUIREMENT | Kodac remains provider-neutral |
| Optional Redis persistence without Kodac privacy semantics | REJECT AS IMPLICIT PERSISTENCE MODEL | Requires explicit privacy/retention authority |
| Model-context truncation | ADOPT ONLY WITH EVIDENCE SEPARATION | Full evidence identity must remain intact |
| Source-code borrowing from OpenReview | NOT ADMITTED | Reference-only until provenance/license admission is explicit |

---

## 22. Sequencing impact

This amendment changes **planning detail**, not the currently authorized implementation sequence.

```text
CURRENT P7 AUTHORITY = WHATEVER LIVE CANONICAL P7 RECORDS PROVE
P7_R8_PLUS = NOT AUTHORIZED BY THIS AMENDMENT
P8 = NOT AUTHORIZED BY THIS AMENDMENT
P9 = NOT AUTHORIZED BY THIS AMENDMENT
```

Future dependency ordering should preserve:

```text
PROOF / VERIFICATION SEMANTICS
-> BOUNDED REMEDIATION SEMANTICS
-> PRODUCT ORCHESTRATION / GITHUB UX
-> CONTINUOUS ASSURANCE
```

Durable orchestration design may be researched earlier, but privileged product integration should not leapfrog proof and remediation boundaries.

---

## 23. Canonicalization requirements for this amendment

This candidate must not be treated as canonical merely because it exists on a branch or PR.

Before guarded merge, a future exact candidate head must prove:

```text
BASE = THEN-CURRENT CANONICAL MAIN
BEHIND_BY = 0
CHANGED_PATHS = EXACTLY THIS ONE PLANNING FILE unless separately authorized otherwise
REQUIRED CI = TERMINAL SUCCESS OR TRUTHFUL CANONICAL DOCS-ONLY NON-APPLICABILITY
INTERNAL SUBSTANTIVE SEMANTIC / SECURITY REVIEW = CLEAN
EXTERNAL REFERENCE FACTS = REVERIFIED OR PINNED TO THE STATED SNAPSHOT
KNOWN ACTIONABLE DEFECTS = 0
UNRESOLVED ACTIONABLE REVIEW THREADS = 0
RULESET 20707483 = ACTIVE / NO BYPASS
WAIVER = NO
```

If canonical `main` moves after this candidate is created, qualification must use fresh base/head evidence. No stale exact-head or stale-base evidence may be reused.

Merge must use the exact qualified expected head when required by the active governance record. Post-merge proof is required before the amendment may be called canonical.

---

## 24. Required non-grants

```text
OPENREVIEW REFERENCE != DONOR ADMISSION
OPENREVIEW README LICENSE TEXT != KODAC SOURCE-BORROWING AUTHORITY
WORKFLOW RUNTIME != K2
SANDBOX != K2
SKILL != POLICY
SKILL LOAD != EXECUTION
MENTION != AUTHORIZATION
REACTION != AUTHORIZATION
COMMENT != PATCH AUTHORITY
MODEL TOOL CALL != SIDE-EFFECT AUTHORITY
READ ACCESS != WRITE ACCESS
WRITE ACCESS != MERGE AUTHORITY
MERGE != DONE
PERSISTENT WORKFLOW STATE != OUTCOME-MEMORY AUTHORITY
RETRY != SIDE-EFFECT RETRY AUTHORITY
RESUME != FRESHNESS
P7_R7 MERGED != P7 OVERALL CLOSED
THIS AMENDMENT != P7_R8_PLUS AUTHORITY
THIS AMENDMENT != P8 AUTHORITY
THIS AMENDMENT != P9 AUTHORITY
THIS AMENDMENT != PROJECT COMPLETION
```

---

## 25. Plan success criteria added by this amendment

The durable plan should eventually be considered successful only when Kodac can demonstrate, through separately authorized implementation and benchmark evidence, that:

1. an interrupted review can resume without losing evidence identity;
2. a resumed workflow refuses stale authority/evidence;
3. duplicate webhook/reaction delivery cannot duplicate privileged effects;
4. candidate-controlled skills/instructions cannot redefine canonical policy;
5. the model can use progressive specialized instructions without receiving ambient privileged tools;
6. sandboxed execution remains capability-scoped and evidence-producing;
7. unknown branch/ruleset state fails closed;
8. model-context compression does not erase proof evidence;
9. every write or external side effect remains attributable to a bounded authorization and receipt;
10. GitHub-native UX remains simple despite the stronger trust model.

---

## 26. Final planning decision

```text
RESTART_ARCHITECTURE = NO
PRESERVE_K2_K3_KRI_K5_K6_AUTHORITY_SEPARATION = YES
ADD_DURABLE_ORCHESTRATION_PLANE = YES_AS_PLANNING_DIRECTION
ADD_SKILL_INSTRUCTION_TRUST_PLANE = YES_AS_PLANNING_DIRECTION
ADD_INTERACTION_INTENT_PLANE = YES_AS_PLANNING_DIRECTION
OPENREVIEW_DURABLE_WORKFLOW_PATTERN = RECOMMENDED_REFERENCE
OPENREVIEW_SANDBOX_PATTERN = RECOMMENDED_REFERENCE_WITH_STRONGER_KODAC_BOUNDARY
OPENREVIEW_PROGRESSIVE_SKILL_PATTERN = RECOMMENDED_REFERENCE_WITH_TRUST_GATING
OPENREVIEW_GENERAL_BASH_AND_WRITE_MODEL = REJECT_AS_KODAC_DEFAULT
OPENREVIEW_SOURCE_CODE_IMPORT = NO
GITHUB_NATIVE_REVIEW_UX = RECOMMENDED_FOR_FUTURE_P8
PROVIDER_NEUTRALITY = PRESERVE
FAIL_CLOSED_AUTHORITY_STATE = PRESERVE_AND_STRENGTHEN
EXACT_REVISION_AND_EVIDENCE_IDENTITY = PRESERVE_AND_EXTEND_TO_WORKFLOW_STEPS
PROJECT_COMPLETION = NOT_ESTABLISHED
WAIVER = NO
```

The next implementation unit remains determined only by live GitHub truth, `AGENTS.md`, `docs/roadmap/NEXT.md`, and the exact canonical authorization/evidence chain. This amendment does not replace that process.
