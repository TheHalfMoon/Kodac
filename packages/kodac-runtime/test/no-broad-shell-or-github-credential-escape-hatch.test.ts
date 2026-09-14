import assert from "node:assert/strict"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const here = dirname(fileURLToPath(import.meta.url))
const packageRoot = dirname(here)
const repoRoot = dirname(dirname(packageRoot))

function failClosed(message: string): never {
  throw new Error(`escape-hatch proof fail closed: ${message}`)
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
    let entries: ReturnType<typeof readdirSync>
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

const productRoots = [join(packageRoot, "src"), join(repoRoot, "agents"), join(repoRoot, "tools")]
const productFiles = productRoots.flatMap((root) => listFiles(root, [".ts", ".mts", ".mjs", ".js", ".py"]))
assert.ok(productFiles.length > 50, `expected a real product surface to scan, found ${productFiles.length}`)

const CHILD_PROCESS_ALLOWLIST = new Set([
  "src/live-solve-fixture.ts",
  "src/execution/gateway.ts",
  "src/execution/gateway-gvisor-ttl-runtime.ts",
  "src/trust/sandbox-observer-gvisor-network-runtime.ts",
  "scripts/run-tests.mjs",
])

const CI_TOKEN_ALLOWLIST = new Set([
  ".github/workflows/k6-r4-trusted-qualification.yml",
  ".github/workflows/k6-r5-trusted-qualification.yml",
  ".github/workflows/k6-r3-route-outcome-linkage.yml",
  ".github/workflows/k6-r4-privacy-governed-outcome-memory.yml",
  ".github/workflows/k6-r5-bounded-strategy-qualification.yml",
])

const CI_TOKEN_ORIGIN_PATTERNS = [
  /READ_ONLY_GITHUB_TOKEN:\s*\$\{\{\s*github\.token\s*\}\}/,
  /GH_TOKEN:\s*\$\{\{\s*github\.token\s*\}\}/,
  /"GH_TOKEN:\s*"\s*\+\s*github_expression\("github\.token"\)/,
]

await test("no shell:true anywhere in product runtime surface", () => {
  const offenders = productFiles.filter((file) => /shell\s*:\s*true/.test(read(file)) || /shell\s*=\s*True/.test(read(file)))
  assert.deepEqual(offenders.map((file) => relative(repoRoot, file)), [])
})

await test("child_process use is limited to an exact allowlist without exec", () => {
  const users = productFiles.filter((file) => /from\s+["']node:child_process["']|require\(\s*["']child_process["']\s*\)/.test(read(file)))
  const rel = (file: string): string => relative(packageRoot, file).replace(/\\/g, "/")
  const unexpected = users.map(rel).filter((name) => !CHILD_PROCESS_ALLOWLIST.has(name) && !name.startsWith("test/"))
  assert.deepEqual(unexpected, [])
  for (const file of users) {
    const body = read(file)
    assert.ok(!/(?<![A-Za-z0-9_$])exec\s*\(/.test(body), `child_process exec( forbidden in ${relative(repoRoot, file)}`)
    assert.ok(!body.includes("execSync("), `child_process execSync forbidden in ${relative(repoRoot, file)}`)
  }
})

await test("no dynamic code execution in product runtime", () => {
  const offenders = productFiles.filter((file) => {
    const body = read(file)
    return /(?<![A-Za-z0-9_$])eval\s*\(/.test(body) || /new\s+Function\s*\(/.test(body)
  })
  assert.deepEqual(offenders.map((file) => relative(repoRoot, file)), [])
})

await test("no GitHub credential in product runtime source", () => {
  const offenders = productFiles
    .filter((file) => relative(packageRoot, file).startsWith("src/"))
    .filter((file) => /GITHUB_TOKEN|github\.token|getOctokit|secrets\./.test(read(file)))
  assert.deepEqual(offenders.map((file) => relative(repoRoot, file)), [])
})

await test("CI token use is enumerated and read-only scoped", () => {
  const workflowFiles = listFiles(join(repoRoot, ".github", "workflows"), [".yml", ".yaml"])
  assert.ok(workflowFiles.length > 0, "expected workflow files to audit")
  const offendingFiles: string[] = []
  const unscopedOrigins: string[] = []
  const writeVerbs: string[] = []
  for (const file of workflowFiles) {
    const lines = read(file).split("\n")
    lines.forEach((line, index) => {
      const tag = `${relative(repoRoot, file)}:${index + 1}`
      if (/github\.token|GITHUB_TOKEN|GH_TOKEN/.test(line)) {
        const name = relative(repoRoot, file)
        if (!CI_TOKEN_ALLOWLIST.has(name)) offendingFiles.push(tag)
        const isOrigin = /github\.token/.test(line)
        if (isOrigin && !CI_TOKEN_ORIGIN_PATTERNS.some((pattern) => pattern.test(line))) unscopedOrigins.push(tag)
      }
      if (/--method\s+(POST|PUT|PATCH|DELETE)/.test(line)) writeVerbs.push(tag)
      if (/(opener\.open|urlopen)\([^)]*data\s*=/.test(line)) writeVerbs.push(tag)
    })
  }
  assert.deepEqual(offendingFiles, [])
  assert.deepEqual(unscopedOrigins, [])
  assert.deepEqual(writeVerbs, [])
})

await test("K2/H4 confinement gates remain present", () => {
  const gateway = read(join(packageRoot, "src", "execution", "gateway.ts"))
  assert.ok(gateway.includes("shell: false"), "gateway must keep shell:false")
  assert.ok(gateway.includes("approval"), "gateway must keep approval gating")
  assert.ok(gateway.includes("sandbox-observer-gvisor"), "gateway must keep gVisor sandbox observation")
})
