# KDO-H2 Evidence-Store Access and Retention Hardening

Date: 2026-08-24

Status: IMPLEMENTATION CANDIDATE — EXACT-HEAD CI AND REVIEW REQUIRED

## Identity and authority

Repository: `TheHalfMoon/Kodac`

Tracking issue: `#47` — `security(kdo): harden evidence-store access and retention for lossless request snapshots`

Founder authorization: `KODAC-FOUNDER-REPO-LOCAL-CONTINUATION-2026-08-24`

Authorized branch base: `9079673a574815db8ae5986cb997c46e3164283f`

Authorized base tree: `97242c91e9408806d32d4d754516bcc63489a2ef`

Candidate branch: `codex/h2-evidence-store-hardening`

This work implements the safe repo-local H2 evidence-store hardening explicitly named by the founder authorization. It creates no Z0 or Z0L authority, performs no zrok action, spends no money, persists no real secret, installs no GitHub App or webhook, and does not change provider or K2 execution semantics.

## Preserved canonical invariant

The merged H2-R1 invariant remains authoritative:

`logged canonical request snapshot == model/messages/tools passed to ModelProvider.generate()`

Lossless request snapshot content, ordering, serialization, and `requestIdentity` remain unchanged. This track protects the store around that payload; it does not weaken the payload.

## Implemented contract

1. New sessions receive `session.json` metadata under schema `kdo-evidence-session.schema.json`.
2. Retention defaults to 30 days and accepts an explicit 1-to-3,650-day command option.
3. Maintenance runs before a new session is created in the same root.
4. Automatic deletion is limited to expired UUID sessions with valid self-binding metadata and an exact closed set of regular Kodac artifacts.
5. Unknown entries, links, subdirectories, invalid metadata, and legacy sessions are retained.
6. Legacy UUID sessions receive byte-preserving POSIX mode hardening only; no timestamp is inferred and no legacy session is automatically deleted.
7. POSIX roots/session directories are mode `0700`; evidence artifacts are mode `0600`.
8. Final artifact opens use no-follow behavior on POSIX and validate the opened descriptor as a single-link regular file.
9. Windows metadata honestly records inherited ACL status as unverified; no owner-only mode claim is made.
10. Main CLI, provider smoke, provider qualification, and controlled live-solve evidence writers share the hardening primitives.

## Threat boundary

The implementation addresses permissive local modes, known-artifact symbolic-link and hard-link replacement, conservative expiration, and legacy mode migration. It does not claim encryption, defense against the same compromised user, root/administrator resistance, backup deletion, remote deletion guarantees, or exact-deadline cleanup without a later maintenance invocation.

Operational details and storage locations are documented in `docs/engineering/EVIDENCE_STORE.md`.

## Candidate validation obligations

The exact PR head must prove:

- exact lossless snapshot JSON and request identity survive hardened persistence;
- POSIX root, directory, metadata, event, receipt, plan, proof, and report modes are restrictive;
- symbolic-link and hard-link artifact replacement are rejected without modifying the link target;
- valid expired sessions with only admitted artifacts are deleted;
- invalid, unknown, or ambiguous sessions are retained;
- legacy evidence bytes and request identity are unchanged during mode migration;
- Windows and POSIX runtime test jobs pass;
- full runtime tests, typecheck, governance, provenance, and the K2 runtime gate pass;
- K3-R4 and K3-R5 exact-scope paths remain unchanged, so their historical feature workflows are not spuriously entered;
- unresolved review threads are zero.

Until those exact-head gates pass, this document records only an implementation candidate. It does not self-certify issue `#47` as closed or grant merge authority beyond the founder authorization's exact normal-PR gate conditions.
