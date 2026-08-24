import assert from "node:assert/strict"
import { access, chmod, link, lstat, mkdir, mkdtemp, readFile, rm, symlink, unlink, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import {
  maintainEvidenceRoot,
  prepareEvidenceSession,
  writePrivateUtf8File,
} from "../src/evidence/store.ts"
import { createEvent, JsonlEventSink } from "../src/protocol/event.ts"
import { createModelVisibleRequestSnapshot } from "../src/session/model-visible-request.ts"

const SESSION = "11111111-1111-4111-a111-111111111111"
const LEGACY_SESSION = "22222222-2222-4222-a222-222222222222"
const EXPIRED_SESSION = "33333333-3333-4333-a333-333333333333"
const TAINTED_SESSION = "44444444-4444-4444-a444-444444444444"
const INVALID_SESSION = "55555555-5555-4555-a555-555555555555"
const CREATED_AT = new Date("2026-08-01T00:00:00.000Z")

function mode(value: number): number {
  return value & 0o777
}

function snapshotEvent(sessionId: string) {
  const snapshot = createModelVisibleRequestSnapshot({
    provider: "fixture",
    model: "fixture/private",
    messages: [{ role: "user", content: "lossless private prompt\nwith exact bytes: \u{1F512}" }],
    tools: [{
      name: "repo.read",
      capability: "repo.read",
      description: "Read a bounded repository file.",
      inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] },
    }],
  })
  const event = createEvent({
    sessionId,
    sequence: 1,
    type: "model.request.snapshot",
    payload: snapshot,
    emittedAt: "2026-08-01T00:00:01.000Z",
  })
  return { event, snapshot }
}

test("evidence sessions persist the exact lossless request snapshot under private POSIX modes", async () => {
  const root = await mkdtemp(join(tmpdir(), "kodac-evidence-store-"))
  try {
    if (process.platform !== "win32") await chmod(root, 0o777)
    const prepared = await prepareEvidenceSession({ root, sessionId: SESSION, retentionDays: 7, now: CREATED_AT })
    const eventPath = join(prepared.sessionDir, "events.jsonl")
    const { event, snapshot } = snapshotEvent(SESSION)
    await new JsonlEventSink(eventPath).append(event)
    const otherArtifacts = [
      "receipts.jsonl",
      "verification-plan.json",
      "proof.json",
      "qualification-report.json",
    ]
    for (const name of otherArtifacts) await writePrivateUtf8File(join(prepared.sessionDir, name), "{}\n")

    const raw = await readFile(eventPath, "utf8")
    assert.equal(raw, `${JSON.stringify(event)}\n`)
    const durable = JSON.parse(raw) as { payload: unknown }
    assert.deepEqual(durable.payload, snapshot)
    assert.equal((durable.payload as { requestIdentity: string }).requestIdentity, snapshot.requestIdentity)
    assert.equal(prepared.metadata.createdAt, "2026-08-01T00:00:00.000Z")
    assert.equal(prepared.metadata.expiresAt, "2026-08-08T00:00:00.000Z")
    assert.equal(prepared.metadata.mayContainLosslessModelRequestSnapshots, true)

    if (process.platform !== "win32") {
      assert.equal(mode((await lstat(root)).mode), 0o700)
      assert.equal(mode((await lstat(prepared.sessionDir)).mode), 0o700)
      assert.equal(mode((await lstat(prepared.metadataPath)).mode), 0o600)
      assert.equal(mode((await lstat(eventPath)).mode), 0o600)
      for (const name of otherArtifacts) {
        assert.equal(mode((await lstat(join(prepared.sessionDir, name))).mode), 0o600)
      }
      assert.equal(prepared.metadata.accessControlAtCreation, "POSIX_OWNER_ONLY")
    } else {
      assert.equal(prepared.metadata.accessControlAtCreation, "WINDOWS_INHERITED_ACL_UNVERIFIED")
    }
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test("evidence writers refuse symbolic-link and hard-link artifact replacement", { skip: process.platform === "win32" }, async () => {
  const root = await mkdtemp(join(tmpdir(), "kodac-evidence-symlink-"))
  const target = join(root, "outside.txt")
  try {
    const prepared = await prepareEvidenceSession({ root, sessionId: SESSION, now: CREATED_AT })
    await writeFile(target, "unchanged\n", "utf8")
    const eventPath = join(prepared.sessionDir, "events.jsonl")
    await symlink(target, eventPath)
    const { event } = snapshotEvent(SESSION)
    await assert.rejects(() => new JsonlEventSink(eventPath).append(event))
    assert.equal(await readFile(target, "utf8"), "unchanged\n")
    await unlink(eventPath)
    await link(target, eventPath)
    await assert.rejects(() => new JsonlEventSink(eventPath).append(event))
    assert.equal(await readFile(target, "utf8"), "unchanged\n")
    await assert.rejects(() => writePrivateUtf8File(eventPath, "replacement\n"))
    assert.equal(await readFile(target, "utf8"), "unchanged\n")
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test("published session schema mirrors the bounded metadata contract", async () => {
  const schema = JSON.parse(
    await readFile(new URL("../../../schema/kdo-evidence-session.schema.json", import.meta.url), "utf8"),
  ) as {
    additionalProperties: boolean
    required: string[]
    properties: Record<string, { const?: unknown; minimum?: number; maximum?: number }>
  }
  assert.equal(schema.additionalProperties, false)
  assert.deepEqual(new Set(schema.required), new Set([
    "protocol",
    "version",
    "sessionId",
    "createdAt",
    "expiresAt",
    "retentionDays",
    "mayContainLosslessModelRequestSnapshots",
    "accessControlAtCreation",
  ]))
  assert.equal(schema.properties.protocol.const, "kodac.evidence-session")
  assert.equal(schema.properties.version.const, 1)
  assert.equal(schema.properties.retentionDays.minimum, 1)
  assert.equal(schema.properties.retentionDays.maximum, 3_650)
})

test("maintenance deletes only expired owned sessions and byte-preserves conservative legacy migration", async () => {
  const root = await mkdtemp(join(tmpdir(), "kodac-evidence-retention-"))
  try {
    const legacyDir = join(root, LEGACY_SESSION)
    await mkdir(legacyDir, { mode: 0o777 })
    const legacyPath = join(legacyDir, "events.jsonl")
    const { event, snapshot } = snapshotEvent(LEGACY_SESSION)
    const exactLegacyBytes = `${JSON.stringify(event)}\n`
    await writeFile(legacyPath, exactLegacyBytes, { encoding: "utf8", mode: 0o666 })

    const expired = await prepareEvidenceSession({ root, sessionId: EXPIRED_SESSION, retentionDays: 1, now: CREATED_AT })
    await new JsonlEventSink(join(expired.sessionDir, "events.jsonl")).append(snapshotEvent(EXPIRED_SESSION).event)
    const tainted = await prepareEvidenceSession({ root, sessionId: TAINTED_SESSION, retentionDays: 1, now: CREATED_AT })
    await writeFile(join(tainted.sessionDir, "unknown.txt"), "retain me\n", "utf8")
    const invalid = await prepareEvidenceSession({ root, sessionId: INVALID_SESSION, retentionDays: 1, now: CREATED_AT })
    await writePrivateUtf8File(invalid.metadataPath, "{}\n")

    const result = await maintainEvidenceRoot(root, new Date("2026-08-03T00:00:00.000Z"))
    assert.equal(result.expiredSessionsRemoved, 1)
    assert.equal(result.legacySessionsHardened, 1)
    assert.equal(result.retainedUnsafeOrInvalidSessions, 2)
    assert.equal(result.rootScanLimitReached, false)
    await assert.rejects(() => access(expired.sessionDir), { code: "ENOENT" })
    await access(tainted.sessionDir)
    await access(invalid.sessionDir)

    const migratedBytes = await readFile(legacyPath, "utf8")
    assert.equal(migratedBytes, exactLegacyBytes)
    const migrated = JSON.parse(migratedBytes) as { payload: { requestIdentity: string } }
    assert.equal(migrated.payload.requestIdentity, snapshot.requestIdentity)
    if (process.platform !== "win32") {
      assert.equal(mode((await lstat(legacyDir)).mode), 0o700)
      assert.equal(mode((await lstat(legacyPath)).mode), 0o600)
    }
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
