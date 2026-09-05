import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import test from "node:test"

import {
  buildP5EvidenceProvenanceBinding,
  type P5EvidenceProvenanceBinding,
  type P5EvidenceProvenanceInput,
} from "../src/verification/p5-evidence-provenance.ts"
import {
  P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS,
  P6_R1_DETERMINISTIC_SECURITY_FINDING_ORIGIN,
  P6_R1_DETERMINISTIC_SECURITY_FINDING_VERSION,
  P6_R1_SECURITY_LANES,
  P6_R1_SECURITY_SEVERITIES,
  buildP6DeterministicSecurityFinding,
  p6DeterministicSecurityFindingIdentity,
  validateP6DeterministicSecurityFinding,
  type P6DeterministicSecurityFinding,
  type P6DeterministicSecurityFindingInput,
} from "../src/security/p6-deterministic-security-finding.ts"

type UnknownRecord = Record<string, unknown>

const BASE = "1".repeat(40)
const HEAD = "2".repeat(40)
const SHA_A = "a".repeat(64)
const SHA_B = "b".repeat(64)
const SHA_C = "c".repeat(64)
const SHA_D = "d".repeat(64)
const SHA_E = "e".repeat(64)
const SHA_F = "f".repeat(64)
const SHA_0 = "0".repeat(64)
const SHA_1 = "1".repeat(64)

function provenanceInput(state: "CURRENT" | "STALE" = "CURRENT"): P5EvidenceProvenanceInput {
  return {
    source: {
      sourceKind: "SECURITY_SCAN_RESULT",
      evidenceIdentity: SHA_A,
      sourceRef: "artifact://security/scan-result.json",
      sourceDigest: SHA_B,
    },
    revision: {
      repositoryId: "github.com/TheHalfMoon/Kodac",
      canonicalBase: BASE,
      candidateHead: HEAD,
    },
    producer: {
      producerId: "deterministic-analyzer",
      producerVersion: "1.0.0",
      configurationIdentity: SHA_C,
    },
    policyIdentity: SHA_D,
    scopeIdentity: SHA_E,
    inputIdentity: SHA_F,
    environmentIdentity: SHA_0,
    freshness: {
      state,
      basisIdentity: SHA_1,
    },
  }
}

function provenanceBinding(state: "CURRENT" | "STALE" = "CURRENT"): P5EvidenceProvenanceBinding {
  return buildP5EvidenceProvenanceBinding(provenanceInput(state))
}

function fixtureInput(state: "CURRENT" | "STALE" = "CURRENT"): P6DeterministicSecurityFindingInput {
  return {
    origin: P6_R1_DETERMINISTIC_SECURITY_FINDING_ORIGIN,
    provenanceBinding: provenanceBinding(state),
    lane: "STATIC_ANALYSIS",
    ruleId: "semgrep.security.sql-injection",
    severity: "HIGH",
    location: {
      path: "src/db/query.ts",
      startLine: 12,
      endLine: 18,
    },
    nativeRecordDigest: SHA_C,
    fingerprint: SHA_D,
    referenceIds: ["GHSA-abcd-efgh-ijkl", "CVE-2026-12345"],
  }
}

function cloneInput(): P6DeterministicSecurityFindingInput {
  return structuredClone(fixtureInput())
}

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
}

function expectedIdentity(finding: Omit<P6DeterministicSecurityFinding, "findingIdentity">): string {
  return sha256(JSON.stringify(finding))
}

function asSchema(value: unknown, label: string): UnknownRecord {
  assert.ok(value && typeof value === "object" && !Array.isArray(value), `${label} must be a schema object`)
  return value as UnknownRecord
}

function schemaEqual(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right)
}

const p6Schema = JSON.parse(
  readFileSync(new URL("../../../schema/p6-deterministic-security-finding.schema.json", import.meta.url), "utf8"),
) as UnknownRecord
const p5Schema = JSON.parse(
  readFileSync(new URL("../../../schema/p5-evidence-provenance.schema.json", import.meta.url), "utf8"),
) as UnknownRecord

function resolveRef(root: UnknownRecord, ref: string): { schema: unknown; root: UnknownRecord } {
  if (ref === p5Schema.$id) return { schema: p5Schema, root: p5Schema }
  assert.ok(ref.startsWith("#/$defs/"), `unsupported schema ref ${ref}`)
  const defs = asSchema(root.$defs, "$root.$defs")
  const name = ref.slice("#/$defs/".length)
  assert.ok(Object.hasOwn(defs, name), `missing schema definition ${name}`)
  return { schema: defs[name], root }
}

function validateSchema(schemaValue: unknown, value: unknown, root: UnknownRecord, path = "$root"): void {
  const schema = asSchema(schemaValue, path)

  if (Array.isArray(schema.allOf)) {
    for (const child of schema.allOf) validateSchema(child, value, root, path)
  }
  if (typeof schema.$ref === "string") {
    const resolved = resolveRef(root, schema.$ref)
    validateSchema(resolved.schema, value, resolved.root, path)
    return
  }
  if ("const" in schema) assert.ok(schemaEqual(value, schema.const), `${path} violates const`)
  if (Array.isArray(schema.enum)) assert.ok(schema.enum.some((item) => schemaEqual(item, value)), `${path} violates enum`)

  if (schema.type === "object") {
    assert.ok(value && typeof value === "object" && !Array.isArray(value), `${path} must be object`)
    const record = value as UnknownRecord
    const properties = schema.properties === undefined ? {} : asSchema(schema.properties, `${path}.properties`)

    if (Array.isArray(schema.required)) {
      for (const key of schema.required) {
        assert.equal(typeof key, "string")
        assert.ok(Object.hasOwn(record, key), `${path} missing ${key}`)
      }
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(record)) assert.ok(Object.hasOwn(properties, key), `${path} has additional property ${key}`)
    }
    if (schema.dependentRequired !== undefined) {
      const dependencies = asSchema(schema.dependentRequired, `${path}.dependentRequired`)
      for (const [key, required] of Object.entries(dependencies)) {
        if (!Object.hasOwn(record, key)) continue
        assert.ok(Array.isArray(required), `${path}.dependentRequired.${key} must be an array`)
        for (const dependent of required) {
          assert.equal(typeof dependent, "string")
          assert.ok(Object.hasOwn(record, dependent), `${path} missing dependent property ${dependent}`)
        }
      }
    }
    for (const [key, childSchema] of Object.entries(properties)) {
      if (Object.hasOwn(record, key)) validateSchema(childSchema, record[key], root, `${path}.${key}`)
    }
  }

  if (schema.type === "array") {
    assert.ok(Array.isArray(value), `${path} must be array`)
    const array = value as unknown[]
    if (typeof schema.minItems === "number") assert.ok(array.length >= schema.minItems, `${path} violates minItems`)
    if (typeof schema.maxItems === "number") assert.ok(array.length <= schema.maxItems, `${path} violates maxItems`)
    if (schema.uniqueItems === true) {
      const serialized = array.map((item) => JSON.stringify(item))
      assert.equal(new Set(serialized).size, serialized.length, `${path} violates uniqueItems`)
    }
    if (schema.items !== undefined) {
      for (let index = 0; index < array.length; index += 1) {
        validateSchema(schema.items, array[index], root, `${path}[${index}]`)
      }
    }
  }

  if (schema.type === "string") {
    assert.equal(typeof value, "string", `${path} must be string`)
  }
  if (typeof schema.minLength === "number" || typeof schema.maxLength === "number" || typeof schema.pattern === "string") {
    assert.equal(typeof value, "string", `${path} must be string`)
    const text = value as string
    const codePointLength = [...text].length
    if (typeof schema.minLength === "number") assert.ok(codePointLength >= schema.minLength, `${path} violates minLength`)
    if (typeof schema.maxLength === "number") assert.ok(codePointLength <= schema.maxLength, `${path} violates maxLength`)
    if (typeof schema.pattern === "string") assert.match(text, new RegExp(schema.pattern), `${path} violates pattern`)
  }

  if (schema.type === "integer") assert.ok(Number.isInteger(value), `${path} must be integer`)
  if (typeof schema.minimum === "number") {
    assert.equal(typeof value, "number", `${path} must be number`)
    assert.ok((value as number) >= schema.minimum, `${path} violates minimum`)
  }
  if (typeof schema.maximum === "number") {
    assert.equal(typeof value, "number", `${path} must be number`)
    assert.ok((value as number) <= schema.maximum, `${path} violates maximum`)
  }
}

function schemaAccepts(value: unknown): boolean {
  try {
    validateSchema(p6Schema, value, p6Schema)
    return true
  } catch {
    return false
  }
}

test("P6-R1 builds one deterministic content-addressed security finding", () => {
  const input = fixtureInput()
  const built = buildP6DeterministicSecurityFinding(input)
  const withoutIdentity = {
    version: built.version,
    origin: built.origin,
    provenanceBinding: built.provenanceBinding,
    lane: built.lane,
    ruleId: built.ruleId,
    severity: built.severity,
    location: built.location,
    nativeRecordDigest: built.nativeRecordDigest,
    fingerprint: built.fingerprint,
    referenceIds: built.referenceIds,
  }

  assert.equal(built.version, P6_R1_DETERMINISTIC_SECURITY_FINDING_VERSION)
  assert.equal(built.origin, P6_R1_DETERMINISTIC_SECURITY_FINDING_ORIGIN)
  assert.deepEqual(built.referenceIds, ["CVE-2026-12345", "GHSA-abcd-efgh-ijkl"])
  assert.equal(built.findingIdentity, expectedIdentity(withoutIdentity))
  assert.equal(p6DeterministicSecurityFindingIdentity(input), built.findingIdentity)
  assert.deepEqual(validateP6DeterministicSecurityFinding(built), built)
})

test("P6-R1 normalizes property and reference ordering deterministically", () => {
  const baselineInput = fixtureInput()
  const baseline = buildP6DeterministicSecurityFinding(baselineInput)
  const reordered = {
    referenceIds: [...baselineInput.referenceIds].reverse(),
    fingerprint: baselineInput.fingerprint,
    nativeRecordDigest: baselineInput.nativeRecordDigest,
    location: {
      endLine: baselineInput.location.endLine,
      path: baselineInput.location.path,
      startLine: baselineInput.location.startLine,
    },
    severity: baselineInput.severity,
    ruleId: baselineInput.ruleId,
    lane: baselineInput.lane,
    provenanceBinding: structuredClone(baselineInput.provenanceBinding),
    origin: baselineInput.origin,
  } as P6DeterministicSecurityFindingInput

  const rebuilt = buildP6DeterministicSecurityFinding(reordered)
  assert.equal(rebuilt.findingIdentity, baseline.findingIdentity)
  assert.deepEqual(rebuilt.referenceIds, baseline.referenceIds)
})

test("P6-R1 identity binds every security field and the exact P5 provenance binding", () => {
  const baseline = buildP6DeterministicSecurityFinding(fixtureInput())
  const cases: Array<[string, (input: P6DeterministicSecurityFindingInput) => void]> = [
    ["provenance", (input) => { (input as { provenanceBinding: P5EvidenceProvenanceBinding }).provenanceBinding = provenanceBinding("STALE") }],
    ["lane", (input) => { (input as { lane: "DEPENDENCY_ANALYSIS" }).lane = "DEPENDENCY_ANALYSIS" }],
    ["rule", (input) => { (input as { ruleId: string }).ruleId = "semgrep.security.other" }],
    ["severity", (input) => { (input as { severity: "CRITICAL" }).severity = "CRITICAL" }],
    ["path", (input) => { (input.location as { path: string }).path = "src/db/other.ts" }],
    ["start line", (input) => { (input.location as { startLine: number }).startLine = 13 }],
    ["end line", (input) => { (input.location as { endLine: number }).endLine = 19 }],
    ["native digest", (input) => { (input as { nativeRecordDigest: string }).nativeRecordDigest = SHA_E }],
    ["fingerprint", (input) => { (input as { fingerprint: string }).fingerprint = SHA_F }],
    ["references", (input) => { (input as { referenceIds: string[] }).referenceIds = ["CVE-2026-99999"] }],
  ]

  for (const [label, mutate] of cases) {
    const input = cloneInput()
    mutate(input)
    assert.notEqual(buildP6DeterministicSecurityFinding(input).findingIdentity, baseline.findingIdentity, label)
  }
})

test("P6-R1 preserves caller-supplied CURRENT and STALE provenance without computing freshness", () => {
  const current = buildP6DeterministicSecurityFinding(fixtureInput("CURRENT"))
  const stale = buildP6DeterministicSecurityFinding(fixtureInput("STALE"))

  assert.equal(current.provenanceBinding.freshness.state, "CURRENT")
  assert.equal(stale.provenanceBinding.freshness.state, "STALE")
  assert.notEqual(current.findingIdentity, stale.findingIdentity)
})

test("P6-R1 returns a detached deeply frozen finding", () => {
  const mutableProvenance = structuredClone(provenanceBinding()) as unknown as P5EvidenceProvenanceBinding
  const input = fixtureInput()
  ;(input as { provenanceBinding: P5EvidenceProvenanceBinding }).provenanceBinding = mutableProvenance
  const mutableLocation = input.location as { path: string; startLine?: number; endLine?: number }
  const mutableReferences = input.referenceIds as string[]

  const built = buildP6DeterministicSecurityFinding(input)
  const snapshot = structuredClone(built)

  mutableLocation.path = "mutated.ts"
  mutableReferences[0] = "MUTATED"
  ;(mutableProvenance.source as { sourceRef: string }).sourceRef = "mutated"

  assert.deepEqual(built, snapshot)
  assert.ok(Object.isFrozen(built))
  assert.ok(Object.isFrozen(built.provenanceBinding))
  assert.ok(Object.isFrozen(built.provenanceBinding.source))
  assert.ok(Object.isFrozen(built.provenanceBinding.revision))
  assert.ok(Object.isFrozen(built.provenanceBinding.producer))
  assert.ok(Object.isFrozen(built.provenanceBinding.freshness))
  assert.ok(Object.isFrozen(built.location))
  assert.ok(Object.isFrozen(built.referenceIds))
})

test("P6-R1 rejects a tampered P5-R1 provenance binding", () => {
  const input = cloneInput()
  const tampered = structuredClone(input.provenanceBinding) as unknown as UnknownRecord
  tampered.bindingIdentity = SHA_F
  ;(input as { provenanceBinding: P5EvidenceProvenanceBinding }).provenanceBinding = tampered as unknown as P5EvidenceProvenanceBinding

  assert.throws(() => buildP6DeterministicSecurityFinding(input), /bindingIdentity/)
})

test("P6-R1 enforces fixed origin, lane, severity, rule, and digest vocabularies", () => {
  const wrongOrigin = cloneInput() as unknown as UnknownRecord
  wrongOrigin.origin = "REVIEWER"
  assert.throws(() => buildP6DeterministicSecurityFinding(wrongOrigin as unknown as P6DeterministicSecurityFindingInput), /origin/)

  const wrongLane = cloneInput() as unknown as UnknownRecord
  wrongLane.lane = "DYNAMIC_ATTACK"
  assert.throws(() => buildP6DeterministicSecurityFinding(wrongLane as unknown as P6DeterministicSecurityFindingInput), /lane/)

  const wrongSeverity = cloneInput() as unknown as UnknownRecord
  wrongSeverity.severity = "SEVERE"
  assert.throws(() => buildP6DeterministicSecurityFinding(wrongSeverity as unknown as P6DeterministicSecurityFindingInput), /severity/)

  for (const invalidRule of ["", " rule", "rüle", "a".repeat(129), "$(touch-owned)"]) {
    const input = cloneInput() as unknown as UnknownRecord
    input.ruleId = invalidRule
    assert.throws(() => buildP6DeterministicSecurityFinding(input as unknown as P6DeterministicSecurityFindingInput), /ruleId/)
  }

  for (const [field, value] of [["nativeRecordDigest", "A".repeat(64)], ["fingerprint", "f".repeat(63)]]) {
    const input = cloneInput() as unknown as UnknownRecord
    input[field] = value
    assert.throws(() => buildP6DeterministicSecurityFinding(input as unknown as P6DeterministicSecurityFindingInput), new RegExp(field))
  }
})

test("P6-R1 enforces repository-relative inert paths and bounded complete line ranges", () => {
  const astralBoundary = cloneInput()
  ;(astralBoundary.location as { path: string }).path = `${"a".repeat(1023)}😀`
  assert.doesNotThrow(() => buildP6DeterministicSecurityFinding(astralBoundary))

  const astralOverflow = cloneInput()
  ;(astralOverflow.location as { path: string }).path = `${"a".repeat(1024)}😀`
  assert.throws(() => buildP6DeterministicSecurityFinding(astralOverflow), /path/)

  for (const invalidPath of [
    "/etc/passwd",
    "C:/Windows/system.ini",
    "src\\file.ts",
    "src//file.ts",
    ".",
    "..",
    "./src.ts",
    "../src.ts",
    "src/./file.ts",
    "src/../file.ts",
    "src/file.ts/..",
    "src/\nfile.ts",
    "\ud800",
  ]) {
    const input = cloneInput()
    ;(input.location as { path: string }).path = invalidPath
    assert.throws(() => buildP6DeterministicSecurityFinding(input), /location.path|Unicode/)
  }

  const startOnly = cloneInput()
  delete (startOnly.location as { endLine?: number }).endLine
  assert.throws(() => buildP6DeterministicSecurityFinding(startOnly), /both startLine and endLine/)

  const endOnly = cloneInput()
  delete (endOnly.location as { startLine?: number }).startLine
  assert.throws(() => buildP6DeterministicSecurityFinding(endOnly), /both startLine and endLine/)

  for (const [startLine, endLine] of [
    [0, 1],
    [2, 1],
    [1.5, 2],
    [1, P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxLine + 1],
  ]) {
    const input = cloneInput()
    ;(input.location as { startLine: number }).startLine = startLine
    ;(input.location as { endLine: number }).endLine = endLine
    assert.throws(() => buildP6DeterministicSecurityFinding(input), /startLine|endLine|startLine <= endLine/)
  }
})

test("P6-R1 bounds, de-duplicates, and canonically orders inert reference identities", () => {
  const empty = cloneInput()
  ;(empty as { referenceIds: string[] }).referenceIds = []
  assert.deepEqual(buildP6DeterministicSecurityFinding(empty).referenceIds, [])

  const max = cloneInput()
  ;(max as { referenceIds: string[] }).referenceIds = Array.from(
    { length: P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxReferenceIds },
    (_, index) => `REF-${String(index).padStart(2, "0")}`,
  ).reverse()
  assert.equal(buildP6DeterministicSecurityFinding(max).referenceIds.length, P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxReferenceIds)

  const overflow = cloneInput()
  ;(overflow as { referenceIds: string[] }).referenceIds = Array.from(
    { length: P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxReferenceIds + 1 },
    (_, index) => `REF-${index}`,
  )
  assert.throws(() => buildP6DeterministicSecurityFinding(overflow), /at most/)

  for (const references of [
    ["CVE-1", "CVE-1"],
    ["   "],
    ["REF\nINJECT"],
    ["\ud800"],
    ["x".repeat(P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxReferenceIdCodePoints + 1)],
  ]) {
    const input = cloneInput()
    ;(input as { referenceIds: string[] }).referenceIds = references
    assert.throws(() => buildP6DeterministicSecurityFinding(input), /referenceIds|Unicode/)
  }

  const built = buildP6DeterministicSecurityFinding(fixtureInput())
  const nonCanonical = structuredClone(built) as unknown as UnknownRecord
  ;(nonCanonical.referenceIds as string[]).reverse()
  assert.throws(() => validateP6DeterministicSecurityFinding(nonCanonical), /canonical ascending order/)
})

test("P6-R1 rejects raw secret and provider-payload field attempts", () => {
  for (const field of ["secret", "match", "rawPayload", "rawRecord", "capturedText", "stdout", "stderr"]) {
    const input = cloneInput() as unknown as UnknownRecord
    input[field] = "must-not-be-stored"
    assert.throws(
      () => buildP6DeterministicSecurityFinding(input as unknown as P6DeterministicSecurityFindingInput),
      /unknown field/,
      field,
    )
  }

  const nested = cloneInput()
  ;(nested.location as unknown as UnknownRecord).rawPayload = "must-not-be-stored"
  assert.throws(() => buildP6DeterministicSecurityFinding(nested), /unknown field/)
})

test("P6-R1 rejects proxies and accessors without invoking caller-owned traps or getters", () => {
  let traps = 0
  const proxy = new Proxy(cloneInput() as object, {
    getPrototypeOf() {
      traps += 1
      throw new Error("getPrototypeOf trap invoked")
    },
    ownKeys() {
      traps += 1
      throw new Error("ownKeys trap invoked")
    },
    getOwnPropertyDescriptor() {
      traps += 1
      throw new Error("getOwnPropertyDescriptor trap invoked")
    },
  })
  assert.throws(() => buildP6DeterministicSecurityFinding(proxy as P6DeterministicSecurityFindingInput), /Proxy/)
  assert.equal(traps, 0)

  const revoked = Proxy.revocable(cloneInput() as object, {})
  revoked.revoke()
  assert.throws(() => buildP6DeterministicSecurityFinding(revoked.proxy as P6DeterministicSecurityFindingInput), /Proxy/)

  let getterCalls = 0
  const accessor = cloneInput() as unknown as UnknownRecord
  Object.defineProperty(accessor, "ruleId", {
    enumerable: true,
    configurable: true,
    get() {
      getterCalls += 1
      throw new Error("getter invoked")
    },
  })
  assert.throws(() => buildP6DeterministicSecurityFinding(accessor as unknown as P6DeterministicSecurityFindingInput), /data property/)
  assert.equal(getterCalls, 0)
})

test("P6-R1 rejects symbol fields, custom prototypes, sparse arrays, cycles, and non-JSON values", () => {
  const symbol = cloneInput() as unknown as Record<PropertyKey, unknown>
  symbol[Symbol("hidden")] = true
  assert.throws(() => buildP6DeterministicSecurityFinding(symbol as unknown as P6DeterministicSecurityFindingInput), /symbol/)

  const normal = cloneInput() as unknown as UnknownRecord
  const custom = Object.create({ inherited: true }) as UnknownRecord
  for (const [key, value] of Object.entries(normal)) custom[key] = value
  assert.throws(() => buildP6DeterministicSecurityFinding(custom as unknown as P6DeterministicSecurityFindingInput), /plain object/)

  const customArray = cloneInput()
  const references = customArray.referenceIds as string[]
  Object.setPrototypeOf(references, { custom: true })
  assert.throws(() => buildP6DeterministicSecurityFinding(customArray), /ordinary Array prototype/)

  const sparse = cloneInput()
  const sparseReferences = [] as string[]
  sparseReferences.length = 2
  sparseReferences[0] = "CVE-1"
  ;(sparse as { referenceIds: string[] }).referenceIds = sparseReferences
  assert.throws(() => buildP6DeterministicSecurityFinding(sparse), /sparse array/)

  const cycle = cloneInput() as unknown as UnknownRecord
  cycle.location = cycle
  assert.throws(() => buildP6DeterministicSecurityFinding(cycle as unknown as P6DeterministicSecurityFindingInput), /acyclic/)

  const nonFinite = cloneInput()
  ;(nonFinite.location as { startLine: number }).startLine = Number.POSITIVE_INFINITY
  assert.throws(() => buildP6DeterministicSecurityFinding(nonFinite), /non-finite|startLine/)

  const bigint = cloneInput() as unknown as UnknownRecord
  bigint.ruleId = 1n
  assert.throws(() => buildP6DeterministicSecurityFinding(bigint as unknown as P6DeterministicSecurityFindingInput), /JSON data only/)
})

test("P6-R1 runtime and Draft 2020-12 schema agree on the bounded contract", () => {
  const built = buildP6DeterministicSecurityFinding(fixtureInput())
  assert.equal(p6Schema.$schema, "https://json-schema.org/draft/2020-12/schema")
  assert.equal(p6Schema.$id, "https://kodac.dev/schema/p6-deterministic-security-finding.schema.json")

  const properties = asSchema(p6Schema.properties, "p6.properties")
  const provenanceSchema = asSchema(properties.provenanceBinding, "p6.properties.provenanceBinding")
  assert.equal(provenanceSchema.$ref, p5Schema.$id)
  assert.deepEqual(asSchema(properties.lane, "lane").enum, [...P6_R1_SECURITY_LANES])
  assert.deepEqual(asSchema(properties.severity, "severity").enum, [...P6_R1_SECURITY_SEVERITIES])
  assert.ok(schemaAccepts(built))

  const extra = structuredClone(built) as unknown as UnknownRecord
  extra.secret = "forbidden"
  assert.equal(schemaAccepts(extra), false)

  const badPath = structuredClone(built) as unknown as UnknownRecord
  ;(badPath.location as UnknownRecord).path = "../escape.ts"
  assert.equal(schemaAccepts(badPath), false)

  const incompleteLines = structuredClone(built) as unknown as UnknownRecord
  delete (incompleteLines.location as UnknownRecord).endLine
  assert.equal(schemaAccepts(incompleteLines), false)

  const badProvenance = structuredClone(built) as unknown as UnknownRecord
  ;((badProvenance.provenanceBinding as UnknownRecord).revision as UnknownRecord).candidateHead = "A".repeat(40)
  assert.equal(schemaAccepts(badProvenance), false)
})

test("P6-R1 source remains pure/data-only and reuses the P5-R1 validator", () => {
  const source = readFileSync(
    new URL("../src/security/p6-deterministic-security-finding.ts", import.meta.url),
    "utf8",
  )

  assert.match(source, /validateP5EvidenceProvenanceBinding/)
  assert.doesNotMatch(source, /node:(?:fs|child_process|net|http|https|tls|dgram|worker_threads)/)
  assert.doesNotMatch(source, /\bfetch\s*\(/)
  assert.doesNotMatch(source, /process\.env/)
  assert.doesNotMatch(source, /exec(?:File|Sync)?\s*\(/)
  assert.doesNotMatch(source, /spawn(?:Sync)?\s*\(/)
})
