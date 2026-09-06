import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import { NodeWorkspaceFileSystem } from "../src/edit/filesystem.ts"
import {
  InMemoryReceiptLedger,
  JsonlReceiptLedger,
  readReceiptLedger,
  readReceiptLedgerObserved,
} from "../src/evidence/ledger.ts"
import { ExecutionGateway } from "../src/execution/gateway.ts"
import { InMemoryEventSink, type EventSink, type KodacEvent } from "../src/protocol/event.ts"
import { RuntimeSession } from "../src/session/session.ts"
import { fixedPolicy } from "../src/trust/policy.ts"
import { DoneGate } from "../src/verification/done-gate.ts"
import { runVerificationEngine } from "../src/verification/engine.ts"

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
}

async function gitWorkspace(): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), "kodac-s6-core-"))
  execFileSync("git", ["init", "-q"], { cwd: root })
  execFileSync("git", ["config", "user.email", "kodac-test@example.com"], { cwd: root })
  execFileSync("git", ["config", "user.name", "Kodac Test"], { cwd: root })
  await writeFile(join(root, "note.txt"), "alpha\n", "utf8")
  await writeFile(join(root, "verify.test.js"), "import assert from 'node:assert/strict'; import { readFile } from 'node:fs/promises'; import test from 'node:test'; test('note', async () => assert.equal(await readFile('note.txt','utf8'), 'ALPHA\\n'));\n", "utf8")
  execFileSync("git", ["add", "note.txt", "verify.test.js"], { cwd: root })
  execFileSync("git", ["commit", "-qm", "fixture"], { cwd: root })
  return root
}

async function applyFixturePatch(workspace: string, receiptsPath: string): Promise<void> {
  const fs = new NodeWorkspaceFileSystem(workspace)
  const mutationLedger = new JsonlReceiptLedger(receiptsPath)
  const gateway = new ExecutionGateway(fs, fixedPolicy("allow", "fixture write approval"))
  await gateway.applyPatch(
    "*** Begin Patch\n*** Update File: note.txt\n@@\n-alpha\n+ALPHA\n*** End Patch",
    { onReceipt: (receipt) => mutationLedger.append(receipt) },
  )
}

class MutatingEventSink implements EventSink {
  readonly events: KodacEvent[] = []
  private mutated = false

  constructor(private readonly receiptsPath: string) {}

  async append(event: KodacEvent): Promise<void> {
    this.events.push(event)
    if (this.mutated || event.type !== "verification.check.completed") return
    const payload = event.payload as { id?: unknown }
    if (payload.id !== "evidence.receipts") return
    this.mutated = true
    await writeFile(this.receiptsPath, "{mutated-invalid-json}\n", "utf8")
  }
}

test("DoneGate refuses a report with missing evidence", () => {
  const gate = new DoneGate().evaluate({
    protocol: "kodac.verification",
    version: 1,
    sessionId: "s",
    startedAt: new Date(0).toISOString(),
    completedAt: new Date(0).toISOString(),
    passed: false,
    checks: [],
  })
  assert.equal(gate.status, "NOT_READY")
  assert.ok(gate.reasons.some((reason) => reason.includes("missing required verification check")))
})

test("observed receipt ledger preserves missing, empty, raw-text, and invalid JSON semantics", async () => {
  const evidence = await mkdtemp(join(tmpdir(), "kodac-r17-ledger-"))
  try {
    const missingPath = join(evidence, "missing.jsonl")
    const missing = await readReceiptLedgerObserved(missingPath)
    assert.deepEqual(missing.receipts, [])
    assert.deepEqual(missing.observation, {
      receiptLedgerPathSha256: sha256(missingPath),
      receiptLedgerPresent: false,
      receiptLedgerReadUtf8Bytes: 0,
      receiptLedgerReadSha256: null,
      parsedReceiptCount: 0,
    })
    assert.deepEqual(await readReceiptLedger(missingPath), [])

    const emptyPath = join(evidence, "empty.jsonl")
    await writeFile(emptyPath, "", "utf8")
    const empty = await readReceiptLedgerObserved(emptyPath)
    assert.deepEqual(empty.receipts, [])
    assert.equal(empty.observation.receiptLedgerPresent, true)
    assert.equal(empty.observation.receiptLedgerReadUtf8Bytes, 0)
    assert.equal(empty.observation.receiptLedgerReadSha256, sha256(""))
    assert.equal(empty.observation.parsedReceiptCount, 0)

    const rawPath = join(evidence, "raw.jsonl")
    const raw = "  {\"receiptId\":\"a\"}  \r\n\r\n\t{\"receiptId\":\"b\"}\r\n"
    await writeFile(rawPath, raw, "utf8")
    const observed = await readReceiptLedgerObserved(rawPath)
    assert.equal(observed.receipts.length, 2)
    assert.equal(observed.observation.receiptLedgerPathSha256, sha256(rawPath))
    assert.equal(observed.observation.receiptLedgerReadUtf8Bytes, Buffer.byteLength(raw, "utf8"))
    assert.equal(observed.observation.receiptLedgerReadSha256, sha256(raw))
    assert.equal(observed.observation.parsedReceiptCount, 2)
    assert.equal(JSON.stringify(observed.observation).includes(rawPath), false)
    assert.equal(JSON.stringify(observed.observation).includes(raw), false)

    const invalidPath = join(evidence, "invalid.jsonl")
    await writeFile(invalidPath, "{invalid-json}\n", "utf8")
    await assert.rejects(readReceiptLedgerObserved(invalidPath), /Invalid receipt JSON at line 1/)
    await assert.rejects(readReceiptLedger(invalidPath), /Invalid receipt JSON at line 1/)
  } finally {
    await rm(evidence, { recursive: true, force: true })
  }
})

test("verification engine can prove an attested mutation with explicit tests", async () => {
  const workspace = await gitWorkspace()
  const evidence = await mkdtemp(join(tmpdir(), "kodac-s6-evidence-"))
  try {
    const receiptsPath = join(evidence, "receipts.jsonl")
    await applyFixturePatch(workspace, receiptsPath)
    const sink = new InMemoryEventSink()
    const session = new RuntimeSession(sink, "s6-session")
    await session.start({ command: "solve", workspace })
    await session.emit("agent.loop.completed", { fixture: true })
    const report = await runVerificationEngine({
      workspace,
      sessionId: "s6-session",
      receiptPath: receiptsPath,
      session,
      agentCompleted: true,
      approveVerification: true,
      commands: [{ id: "tests", category: "tests", executable: "node", args: ["--test", "verify.test.js"] }],
    })
    const gate = new DoneGate().evaluate(report)
    assert.equal(report.passed, true)
    assert.equal(gate.status, "PROVEN_READY")
    assert.ok(gate.evidence.length > 0)
    assert.deepEqual(Object.keys(report).sort(), ["checks", "completedAt", "passed", "protocol", "sessionId", "startedAt", "version"])

    const rawLedger = await readFile(receiptsPath, "utf8")
    const readEvents = sink.events.filter((event) => event.type === "verification.receipt_ledger.read")
    assert.equal(readEvents.length, 1)
    const readEvent = readEvents[0]!
    const payload = readEvent.payload as {
      receiptLedgerPathSha256: string
      receiptLedgerPresent: boolean
      receiptLedgerReadUtf8Bytes: number
      receiptLedgerReadSha256: string | null
      parsedReceiptCount: number
    }
    assert.equal(readEvent.sessionId, "s6-session")
    assert.equal(payload.receiptLedgerPathSha256, sha256(receiptsPath))
    assert.equal(payload.receiptLedgerPresent, true)
    assert.equal(payload.receiptLedgerReadUtf8Bytes, Buffer.byteLength(rawLedger, "utf8"))
    assert.equal(payload.receiptLedgerReadSha256, sha256(rawLedger))
    assert.equal(payload.parsedReceiptCount, (await readReceiptLedger(receiptsPath)).length)
    assert.equal(JSON.stringify(payload).includes(receiptsPath), false)
    assert.equal(JSON.stringify(payload).includes(rawLedger), false)

    const readEventIndex = sink.events.indexOf(readEvent)
    const receiptEventIndexes = sink.events
      .map((event, index) => event.type === "receipt.recorded" ? index : -1)
      .filter((index) => index >= 0)
    assert.ok(receiptEventIndexes.length > 0)
    assert.ok(receiptEventIndexes.every((index) => index < readEventIndex))
    const receiptCheckIndex = sink.events.findIndex((event) => {
      if (event.type !== "verification.check.completed") return false
      return (event.payload as { id?: unknown }).id === "evidence.receipts"
    })
    assert.ok(readEventIndex >= 0 && receiptCheckIndex > readEventIndex)

    const receipts = new InMemoryReceiptLedger()
    assert.equal(receipts.receipts.length, 0)
  } finally {
    await rm(workspace, { recursive: true, force: true })
    await rm(evidence, { recursive: true, force: true })
  }
})

test("ledger-dependent verification checks reuse one snapshot after the first ledger read", async () => {
  const workspace = await gitWorkspace()
  const evidence = await mkdtemp(join(tmpdir(), "kodac-r17-cache-"))
  try {
    const receiptsPath = join(evidence, "receipts.jsonl")
    await applyFixturePatch(workspace, receiptsPath)
    const sink = new MutatingEventSink(receiptsPath)
    const session = new RuntimeSession(sink, "r17-cache-session")
    await session.start({ command: "solve", workspace })
    await session.emit("agent.loop.completed", { fixture: true })

    const report = await runVerificationEngine({
      workspace,
      sessionId: "r17-cache-session",
      receiptPath: receiptsPath,
      session,
      agentCompleted: true,
      approveVerification: true,
      commands: [{ id: "tests", category: "tests", executable: "node", args: ["--test", "verify.test.js"] }],
    })

    assert.equal(report.passed, true)
    assert.equal(new DoneGate().evaluate(report).status, "PROVEN_READY")
    assert.equal(sink.events.filter((event) => event.type === "verification.receipt_ledger.read").length, 1)
    assert.equal(report.checks.find((check) => check.id === "evidence.receipts")?.status, "pass")
    assert.equal(report.checks.find((check) => check.id === "evidence.policy")?.status, "pass")
    assert.equal(report.checks.find((check) => check.id === "verification.commands")?.status, "pass")
    await assert.rejects(readReceiptLedger(receiptsPath), /Invalid receipt JSON at line 1/)
  } finally {
    await rm(workspace, { recursive: true, force: true })
    await rm(evidence, { recursive: true, force: true })
  }
})
