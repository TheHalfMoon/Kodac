# Kodac Runtime Evidence Store

Kodac runtime evidence can contain exact model-visible request snapshots. Those snapshots may include repository prompts, tool descriptions, tool arguments, and other sensitive text. They are intentionally lossless: do not redact, digest, or truncate them in storage, because doing so would break the H2-R1 reconstruction identity.

## Storage locations

The main `apply-patch`, `ask`, and `solve` commands store sessions at:

`~/.kodac/evidence/<workspace-key>/<session-uuid>/`

The workspace key is the first 16 hexadecimal characters of SHA-256 over the resolved workspace path. `provider-smoke`, `provider-qualify`, and controlled `live-solve` use `~/.kodac/provider-smoke/`, `~/.kodac/provider-qualification/`, and `~/.kodac/live-solve/` respectively. `--evidence-dir <path>` selects an explicit root instead. Controlled live-solve authorization and report files live in their own UUID session rather than an unversioned subtree.

Each new UUID session directory contains `session.json` plus the artifacts produced by that command. `session.json` records the creation time, expiry time, configured retention, and access-control classification observed at creation. It explicitly marks the store as capable of containing lossless model request snapshots.

## Retention and cleanup

The default retention is 30 days. Set `--evidence-retention-days <n>` on runtime, provider-smoke, provider-qualify, or controlled live-solve commands to choose 1 through 3,650 days.

Cleanup runs when a new session is prepared; there is no background deletion service. Therefore, an expired session can remain on disk until a later command uses the same evidence root. The local system clock is authoritative for that comparison, and each maintenance pass is bounded to 10,000 root entries. Operators who require deletion at an exact deadline must schedule an authorized process that invokes `maintainEvidenceRoot`, inspect its `rootScanLimitReached` result, or remove inspected session directories through their platform controls.

Each prepared session holds an `active-session.json` cross-process lease until its command finishes all evidence writes. Its closed v1 contract is published at `schema/kdo-evidence-session-active.schema.json`. Cleanup retains an expired session while the recorded process is alive. A definitely dead PID is treated as a stale lease and removed before normal conservative cleanup; an invalid lease, an indeterminate process check, or a PID that may have been reused causes retention rather than deletion.

Automatic cleanup deletes a UUID session only when all of these conditions hold:

- `session.json` is valid and binds to that directory's UUID;
- its canonical expiry time has passed;
- it has no live or indeterminate active-session lease;
- every child is a regular file from the closed Kodac session-artifact allowlist;
- there are no symbolic links, subdirectories, or unknown files.

Invalid, ambiguous, or extended sessions are retained for inspection. The cleanup routine does not traverse or delete non-UUID directories. This makes deletion deliberately fail conservative.

## Access controls

On POSIX platforms, Kodac tightens evidence roots and session directories to mode `0700`, and known evidence files to `0600`. Artifact writers open the final file with no-follow behavior, validate the opened object as a single-link regular file, verify that the opened descriptor still matches the final path, and apply the private mode to existing files before reading or appending. Windows lacks Node's POSIX no-follow flag, so writers perform both a pre-open link check and the same post-open descriptor-to-path identity check before any append or truncate.

On Windows, Node file modes do not establish an owner-only ACL. `accessControlAtCreation` therefore records `WINDOWS_INHERITED_ACL_UNVERIFIED`, not a private-access claim. Put the evidence root on an NTFS location with an operator-reviewed restrictive inherited ACL; use device encryption where required. Windows administrators and principals already authorized by the inherited ACL may still read the evidence. If a session is copied between platforms or filesystems, re-evaluate the destination controls; creation metadata is historical, not a live ACL attestation.

## Legacy migration

The next maintenance pass recognizes legacy UUID session directories that have no `session.json`. On POSIX it tightens the directory and known regular artifact modes without reading, rewriting, or changing artifact bytes. It does not synthesize creation or expiry timestamps and never automatically deletes a legacy session.

Review legacy contents, establish any required retention disposition, and remove them through an operator-controlled process. Moving a legacy directory into a new metadata-bearing session is not supported because it could misrepresent its creation and expiry identity.

## Threat model and limits

This hardening reduces accidental same-host disclosure on POSIX, permissive-mode persistence, final-artifact symbolic-link or hard-link replacement, and indefinite accumulation when the runtime continues to use the store. It preserves the exact `model.request.snapshot` JSON bytes and `requestIdentity` semantics.

It does not protect evidence from a compromised account running Kodac, root/administrator access, malware acting as the same user, already-authorized Windows ACL principals, filesystem snapshots, backups, copied artifacts, or storage media without encryption. It is not an encrypted vault, secret manager, remote retention service, or tamper-evident audit log.

Do not point `--evidence-dir` at a shared or repository-visible directory. Treat backups and exported evidence under the same sensitivity and deletion policy as the live store.
