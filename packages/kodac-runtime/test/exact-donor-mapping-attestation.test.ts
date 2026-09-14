import assert from "node:assert/strict"
import { readdirSync, readFileSync, statSync, type Dirent } from "node:fs"
import { dirname, join, relative } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const packageRoot = dirname(here)
const repoRoot = dirname(dirname(packageRoot))
const rel = (file: string): string => relative(repoRoot, file).replace(/\\/g, "/")

function failClosed(message: string): never {
  throw new Error(`donor attestation fail closed: ${message}`)
}

function listFiles(root: string, extensions: readonly string[]): string[] {
  let rootStat: ReturnType<typeof statSync>
  try {
    rootStat = statSync(root)
  } catch {
    failClosed(`unreadable scan root ${root}`)
  }
  if (!rootStat.isDirectory()) failClosed(`scan root is not a directory: ${root}`)
  const out: string[] = []
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      failClosed(`unreadable directory ${dir}`)
    }
    for (const entry of entries) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".git") continue
        walk(full)
      } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
        out.push(full)
      }
    }
  }
  walk(root)
  return out.sort()
}

function read(path: string): string {
  try {
    return readFileSync(path, "utf8")
  } catch {
    failClosed(`unreadable file ${path}`)
    throw new Error("unreachable")
  }
}

type LedgerRecord = { record_id: string; destination_paths: string[]; license_review?: { notice_required?: boolean }; upstream_repo: string }

function loadLedger(): LedgerRecord[] {
  const dir = join(repoRoot, "provenance", "imports")
  const files = listFiles(dir, [".yaml", ".yml"])
  assert.ok(files.length > 0, "expected at least one provenance import record")
  return files.map((file) => {
    const body = read(file)
    const recordId = body.match(/^record_id:\s*(\S+)/m)?.[1]
    assert.ok(recordId !== undefined && recordId.length > 0, `ledger record missing record_id: ${rel(file)}`)
    const destinations: string[] = []
    const block = body.match(/^destination_paths:\s*\n((?:\s+-\s+.*\n?)+)/m)?.[1] ?? ""
    for (const line of block.split("\n")) {
      const item = line.match(/^\s+-\s+(\S+)\s*$/)?.[1]
      if (item !== undefined) destinations.push(item)
    }
    assert.ok(destinations.length > 0, `ledger record missing destination_paths: ${rel(file)}`)
    const notice = body.match(/^\s+notice_required:\s*(true|false)\s*$/m)?.[1]
    const upstreamRepo = body.match(/^\s+repository:\s*(\S+)\s*$/m)?.[1] ?? ""
    return { record_id: recordId, destination_paths: destinations, license_review: { notice_required: notice === "true" }, upstream_repo: upstreamRepo }
  })
}

const DERIVATION = /(^|[^a-zA-Z])(adapted from|ported from)|donor|studied from|opencode|anomalyco/i
const DERIVATION_DECLARED = /(^|[^a-zA-Z])(adapted from)|KDO_[A-Z0-9_]*DONOR[A-Z0-9_]*|DONOR_[A-Z_]+|Third-Party Notices/i
const KNOWN_UNMAPPED_PORTS = new Set([
  "packages/kodac-runtime/src/agent/tool-result-pruning.ts",
  "packages/kodac-runtime/src/agent/repeat-call-signal.ts",
  "packages/kodac-runtime/src/agent/guarded-tool-pipeline.ts",
  "packages/kodac-runtime/src/specification/contracts.ts",
  "packages/kodac-runtime/src/extensions/contracts.ts",
  "packages/kodac-runtime/src/model/capabilities.ts",
  "packages/kodac-runtime/src/semantic/contracts.ts",
  "packages/kodac-runtime/src/context-connectors/contracts.ts",
  "packages/kodac-runtime/src/context-connectors/indexer-state-machine.ts",
  "packages/kodac-runtime/src/session/model-visible-request.ts",
  "packages/kodac-runtime/src/session/model-visible-history.ts",
])

const KNOWN_INTAKE_MODES = new Set(["PORT", "PORT_SELECTED_CONTRACT_IDEAS", "STUDY_ONLY", "STUDY_REIMPLEMENT"])

function intakeModes(body: string): string[] {
  const modes: string[] = []
  for (const match of body.matchAll(/intakeMode:\s*"([A-Z_]+)"/g)) modes.push(match[1]!)
  return modes
}

await test("ledger records parse and destinations exist", () => {
  const records = loadLedger()
  for (const record of records) {
    for (const destination of record.destination_paths) {
      const full = join(repoRoot, destination)
      let found = false
      try {
        found = statSync(full).isFile()
      } catch {
        failClosed(`ledger destination missing: ${destination} (record ${record.record_id})`)
      }
      assert.ok(found, `ledger destination is not a file: ${destination}`)
    }
  }
})

await test("strong derivation headers are ledger covered", () => {
  const records = loadLedger()
  const covered = new Set(records.flatMap((record) => record.destination_paths))
  const srcFiles = listFiles(join(packageRoot, "src"), [".ts"])
  const offenders: string[] = []
  for (const file of srcFiles) {
    const body = read(file)
    if ((/(^|[^a-zA-Z])(adapted from|ported from)/i.test(body) || /substantial portions/.test(body)) && !covered.has(rel(file))) offenders.push(rel(file))
  }
  assert.deepEqual(offenders, [])
})

await test("PORT dispositions are either ledger covered or explicitly pinned gaps", () => {
  const records = loadLedger()
  const covered = new Set(records.flatMap((record) => record.destination_paths))
  const srcFiles = listFiles(join(packageRoot, "src"), [".ts"])
  const portFiles: string[] = []
  const unknownModes: string[] = []
  for (const file of srcFiles) {
    for (const mode of intakeModes(read(file))) {
      if (!KNOWN_INTAKE_MODES.has(mode)) unknownModes.push(`${rel(file)}:${mode}`)
      if (mode === "PORT" || mode === "PORT_SELECTED_CONTRACT_IDEAS") portFiles.push(rel(file))
    }
  }
  assert.deepEqual(unknownModes, [])
  const unmapped = portFiles.filter((name) => !covered.has(name))
  assert.deepEqual([...unmapped].sort(), [...KNOWN_UNMAPPED_PORTS].sort())
  for (const name of KNOWN_UNMAPPED_PORTS) {
    assert.ok(portFiles.includes(name), `pinned gap no longer declares PORT: ${name} (gap silently changed shape)`)
  }
})

await test("study dispositions are declared and carry no copied-byte markers", () => {
  const srcFiles = listFiles(join(packageRoot, "src"), [".ts"])
  const studyFiles = srcFiles.filter((file) => intakeModes(read(file)).some((mode) => mode.startsWith("STUDY")))
  assert.ok(studyFiles.length > 0, "expected declared study dispositions")
  const offenders = studyFiles.filter((file) => /(^|[^a-zA-Z])(adapted from|ported from)/i.test(read(file)) || /substantial portions/.test(read(file)))
  assert.deepEqual(offenders.map(rel), [])
})

await test("pinned upstream references carry donor declarations", () => {
  const srcFiles = listFiles(join(packageRoot, "src"), [".ts"])
  const offenders: string[] = []
  for (const file of srcFiles) {
    const body = read(file)
    const derives = DERIVATION.test(body)
    const declares = DERIVATION_DECLARED.test(body)
    if (derives && !declares) offenders.push(rel(file))
  }
  assert.deepEqual(offenders, [])
})

const KNOWN_TOOL_PIN_FILES = new Set([
  "packages/kodac-runtime/src/context-engine/context-engine.ts",
  "packages/kodac-runtime/src/repository-intelligence/ast-grep-cli.ts",
  "packages/kodac-runtime/src/repository-intelligence/contracts.ts",
])

await test("external tool pins are a closed explicitly listed set", () => {
  const srcFiles = listFiles(join(packageRoot, "src"), [".ts"])
  const pinners = srcFiles.filter((file) => /upstreamRepository/.test(read(file))).map(rel)
  assert.deepEqual([...pinners].sort(), [...KNOWN_TOOL_PIN_FILES].sort())
  for (const name of KNOWN_TOOL_PIN_FILES) {
    assert.ok(read(join(repoRoot, name)).includes("ast-grep/ast-grep"), `tool pin changed shape: ${name}`)
  }
})

await test("third-party notices cover notice-required ledger records", () => {
  const records = loadLedger()
  const notices = read(join(packageRoot, "THIRD_PARTY_NOTICES.md"))
  for (const record of records) {
    if (record.license_review?.notice_required === true) {
      const segments = record.upstream_repo.split("/").filter((part) => part.length > 0)
      const anchor = segments.slice(-2).join("/")
      assert.ok(anchor.length > 1 && notices.includes(anchor), `notices missing upstream ${anchor} (record ${record.record_id})`)
    }
  }
})
