import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import test from "node:test"

import {
  P5_R1_EVIDENCE_PROVENANCE_LIMITS,
  P5_R1_EVIDENCE_PROVENANCE_VERSION,
  buildP5EvidenceProvenanceBinding,
  p5EvidenceProvenanceIdentity,
  validateP5EvidenceProvenanceBinding,
  type P5EvidenceProvenanceBinding,
  type P5EvidenceProvenanceInput,
} from "../src/verification/p5-evidence-provenance.ts"

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

function fixtureInput(): P5EvidenceProvenanceInput {
  return {
    source: {
      sourceKind: "VERIFICATION_REPORT",
      evidenceIdentity: SHA_A,
      sourceRef: "artifact://verification/report.json",
      sourceDigest: SHA_B,
    },
    revision: {
      repositoryId: "github.com/TheHalfMoon/Kodac",
      canonicalBase: BASE,
      candidateHead: HEAD,
    },
    producer: {
      producerId: "kodac-runtime",
      producerVersion: "1.0.0",
      configurationIdentity: SHA_C,
    },
    policyIdentity: SHA_D,
    scopeIdentity: SHA_E,
    inputIdentity: SHA_F,
    environmentIdentity: SHA_0,
    freshness: {
      state: "CURRENT",
      basisIdentity: SHA_1,
    },
  }
}

function cloneInput(): P5EvidenceProvenanceInput {
  return structuredClone(fixtureInput())
}

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
}

function expectedIdentity(input: P5EvidenceProvenanceInput): string {
  return sha256(JSON.stringify({
    version: P5_R1_EVIDENCE_PROVENANCE_VERSION,
    source: input.source,
    revision: input.revision,
    producer: input.producer,
    policyIdentity: input.policyIdentity,
    scopeIdentity: input.scopeIdentity,
    inputIdentity: input.inputIdentity,
    environmentIdentity: input.environmentIdentity,
    freshness: input.freshness,
  }))
}

function gitBlobSha1(raw: Buffer): string {
  const canonical = Buffer.from(raw.toString("utf8").replace(/\r\n/g, "\n"), "utf8")
  const header = Buffer.from(`blob ${canonical.byteLength}\0`, "utf8")
  return createHash("sha1").update(header).update(canonical).digest("hex")
}

function asSchema(value: unknown, label: string): UnknownRecord {
  assert.ok(value && typeof value === "object" && !Array.isArray(value), `${label} must be a schema object`)
  return value as UnknownRecord
}

function schemaEqual(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right)
}

function resolveRef(root: UnknownRecord, ref: string): unknown {
  assert.ok(ref.startsWith("#/$defs/"), `unsupported schema ref ${ref}`)
  const defs = asSchema(root.$defs, "$root.$defs")
  const name = ref.slice("#/$defs/".length)
  assert.ok(Object.hasOwn(defs, name), `missing schema definition ${name}`)
  return defs[name]
}

function validateSchema(schemaValue: unknown, value: unknown, root: UnknownRecord, path = "$root"): void {
  const schema = asSchema(schemaValue, path)

  if (Array.isArray(schema.allOf)) {
    for (const child of schema.allOf) validateSchema(child, value, root, path)
  }
  if (typeof schema.$ref === "string") {
    validateSchema(resolveRef(root, schema.$ref), value, root, path)
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
    for (const [key, childSchema] of Object.entries(properties)) {
      if (Object.hasOwn(record, key)) validateSchema(childSchema, record[key], root, `${path}.${key}`)
    }
  }

  if (schema.type === "string") {
    assert.equal(typeof value, "string", `${path} must be string`)
    const text = value as string
    const codePointLength = [...text].length
    if (typeof schema.minLength === "number") assert.ok(codePointLength >= schema.minLength, `${path} violates minLength`)
    if (typeof schema.maxLength === "number") assert.ok(codePointLength <= schema.maxLength, `${path} violates maxLength`)
    if (typeof schema.pattern === "string") assert.match(text, new RegExp(schema.pattern), `${path} violates pattern`)
  } else {
    if (typeof schema.minLength === "number" || typeof schema.maxLength === "number" || typeof schema.pattern === "string") {
      assert.equal(typeof value, "string", `${path} must be string`)
      const text = value as string
      const codePointLength = [...text].length
      if (typeof schema.minLength === "number") assert.ok(codePointLength >= schema.minLength, `${path} violates minLength`)
      if (typeof schema.maxLength === "number") assert.ok(codePointLength <= schema.maxLength, `${path} violates maxLength`)
      if (typeof schema.pattern === "string") assert.match(text, new RegExp(schema.pattern), `${path} violates pattern`)
    }
  }
}

function schemaAccepts(schema: UnknownRecord, value: unknown): boolean {
  try {
    validateSchema(schema, value, schema)
    return true
  } catch {
    return false
  }
}

const schema = JSON.parse(
  readFileSync(new URL("../../../schema/p5-evidence-provenance.schema.json", import.meta.url), "utf8"),
) as UnknownRecord

test("P5-R1 builds one deterministic content-addressed provenance binding", () => {
  const input = fixtureInput()
  const built = buildP5EvidenceProvenanceBinding(input)

  assert.equal(built.version, P5_R1_EVIDENCE_PROVENANCE_VERSION)
  assert.equal(built.bindingIdentity, expectedIdentity(input))
  assert.equal(p5EvidenceProvenanceIdentity(input), built.bindingIdentity)
  assert.deepEqual(validateP5EvidenceProvenanceBinding(built), built)

  const reordered = {
    freshness: structuredClone(input.freshness),
    environmentIdentity: input.environmentIdentity,
    inputIdentity: input.inputIdentity,
    scopeIdentity: input.scopeIdentity,
    policyIdentity: input.policyIdentity,
    producer: structuredClone(input.producer),
    revision: structuredClone(input.revision),
    source: structuredClone(input.source),
  } as P5EvidenceProvenanceInput

  assert.equal(buildP5EvidenceProvenanceBinding(reordered).bindingIdentity, built.bindingIdentity)
})

test("P5-R1 binds exact source, revision, producer, policy, scope, input, environment, and freshness identities", () => {
  const baseline = buildP5EvidenceProvenanceBinding(fixtureInput())
  const cases: Array<[string, (input: P5EvidenceProvenanceInput) => void]> = [
    ["source evidence identity", (input) => { (input.source as { evidenceIdentity: string }).evidenceIdentity = SHA_B }],
    ["source ref", (input) => { (input.source as { sourceRef: string }).sourceRef = "artifact://verification/other.json" }],
    ["source digest", (input) => { (input.source as { sourceDigest: string }).sourceDigest = SHA_C }],
    ["canonical base", (input) => { (input.revision as { canonicalBase: string }).canonicalBase = "3".repeat(40) }],
    ["candidate head", (input) => { (input.revision as { candidateHead: string }).candidateHead = "4".repeat(40) }],
    ["repository id", (input) => { (input.revision as { repositoryId: string }).repositoryId = "github.com/TheHalfMoon/Kodac-fork" }],
    ["producer id", (input) => { (input.producer as { producerId: string }).producerId = "other-runtime" }],
    ["producer version", (input) => { (input.producer as { producerVersion: string }).producerVersion = "2.0.0" }],
    ["configuration identity", (input) => { (input.producer as { configurationIdentity: string }).configurationIdentity = SHA_D }],
    ["policy identity", (input) => { (input as { policyIdentity: string }).policyIdentity = SHA_E }],
    ["scope identity", (input) => { (input as { scopeIdentity: string }).scopeIdentity = SHA_F }],
    ["input identity", (input) => { (input as { inputIdentity: string }).inputIdentity = SHA_0 }],
    ["environment identity", (input) => { (input as { environmentIdentity: string }).environmentIdentity = SHA_1 }],
    ["freshness state", (input) => { (input.freshness as { state: "CURRENT" | "STALE" }).state = "STALE" }],
    ["freshness basis", (input) => { (input.freshness as { basisIdentity: string }).basisIdentity = SHA_A }],
  ]

  for (const [label, mutate] of cases) {
    const input = cloneInput()
    mutate(input)
    assert.notEqual(buildP5EvidenceProvenanceBinding(input).bindingIdentity, baseline.bindingIdentity, label)
  }
})

test("P5-R1 keeps caller-supplied CURRENT and STALE distinct without computing freshness", () => {
  const current = cloneInput()
  const stale = cloneInput()
  ;(stale.freshness as { state: "CURRENT" | "STALE" }).state = "STALE"

  const currentBinding = buildP5EvidenceProvenanceBinding(current)
  const staleBinding = buildP5EvidenceProvenanceBinding(stale)

  assert.equal(currentBinding.freshness.state, "CURRENT")
  assert.equal(staleBinding.freshness.state, "STALE")
  assert.notEqual(currentBinding.bindingIdentity, staleBinding.bindingIdentity)
})

test("P5-R1 returns detached frozen structure that caller mutation cannot alter", () => {
  const input = cloneInput()
  const binding = buildP5EvidenceProvenanceBinding(input)
  const snapshot = structuredClone(binding)

  ;(input.source as { sourceRef: string }).sourceRef = "mutated"
  ;(input.revision as { repositoryId: string }).repositoryId = "mutated"
  ;(input.producer as { producerId: string }).producerId = "mutated"
  ;(input.freshness as { state: "CURRENT" | "STALE" }).state = "STALE"

  assert.deepEqual(binding, snapshot)
  assert.ok(Object.isFrozen(binding))
  assert.ok(Object.isFrozen(binding.source))
  assert.ok(Object.isFrozen(binding.revision))
  assert.ok(Object.isFrozen(binding.producer))
  assert.ok(Object.isFrozen(binding.freshness))
})

test("P5-R1 rejects malformed identities, unsupported freshness, and tampered content identity", () => {
  const malformedSha = cloneInput()
  ;(malformedSha as { policyIdentity: string }).policyIdentity = "A".repeat(64)
  assert.throws(() => buildP5EvidenceProvenanceBinding(malformedSha), /policyIdentity/)

  const malformedGit = cloneInput()
  ;(malformedGit.revision as { candidateHead: string }).candidateHead = "1".repeat(39)
  assert.throws(() => buildP5EvidenceProvenanceBinding(malformedGit), /candidateHead/)

  const unsupportedFreshness = cloneInput()
  ;(unsupportedFreshness.freshness as { state: string }).state = "UNKNOWN"
  assert.throws(() => buildP5EvidenceProvenanceBinding(unsupportedFreshness), /freshness.state/)

  const tampered = structuredClone(buildP5EvidenceProvenanceBinding(fixtureInput())) as unknown as UnknownRecord
  tampered.bindingIdentity = SHA_F
  assert.throws(() => validateP5EvidenceProvenanceBinding(tampered), /does not match the canonical semantic content/)
})

test("P5-R1 rejects unknown, missing, array, symbol, cycle, and hostile-prototype structure", () => {
  const unknown = cloneInput() as unknown as UnknownRecord
  unknown.extra = true
  assert.throws(() => buildP5EvidenceProvenanceBinding(unknown as P5EvidenceProvenanceInput), /invalid key set|unknown field/)

  const missing = cloneInput() as unknown as UnknownRecord
  delete missing.scopeIdentity
  assert.throws(() => buildP5EvidenceProvenanceBinding(missing as P5EvidenceProvenanceInput), /invalid key set|missing required field/)

  const arraySource = cloneInput() as unknown as UnknownRecord
  arraySource.source = []
  assert.throws(() => buildP5EvidenceProvenanceBinding(arraySource as P5EvidenceProvenanceInput), /plain object/)

  const symbol = cloneInput() as unknown as Record<PropertyKey, unknown>
  symbol[Symbol("hidden")] = true
  assert.throws(() => buildP5EvidenceProvenanceBinding(symbol as unknown as P5EvidenceProvenanceInput), /symbol fields/)

  const cycle = cloneInput() as unknown as UnknownRecord
  cycle.source = cycle
  assert.throws(() => buildP5EvidenceProvenanceBinding(cycle as P5EvidenceProvenanceInput), /invalid key set/)

  const normal = cloneInput() as unknown as UnknownRecord
  const hostile = Object.create({ inherited: true }) as UnknownRecord
  for (const [key, value] of Object.entries(normal)) hostile[key] = value
  assert.throws(() => buildP5EvidenceProvenanceBinding(hostile as P5EvidenceProvenanceInput), /plain object/)
})

test("P5-R1 rejects proxies and accessors without invoking caller-owned traps or getters", () => {
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
  assert.throws(() => buildP5EvidenceProvenanceBinding(proxy as P5EvidenceProvenanceInput), /Proxy/)
  assert.equal(traps, 0)

  const revoked = Proxy.revocable(cloneInput() as object, {})
  revoked.revoke()
  assert.throws(() => buildP5EvidenceProvenanceBinding(revoked.proxy as P5EvidenceProvenanceInput), /Proxy/)

  let getterCalls = 0
  const accessor = cloneInput() as unknown as UnknownRecord
  Object.defineProperty(accessor, "source", {
    enumerable: true,
    configurable: true,
    get() {
      getterCalls += 1
      throw new Error("getter invoked")
    },
  })
  assert.throws(() => buildP5EvidenceProvenanceBinding(accessor as P5EvidenceProvenanceInput), /enumerable data property/)
  assert.equal(getterCalls, 0)
})

test("P5-R1 runtime and schema agree on canonical structural boundaries including astral Unicode", () => {
  const astralBoundary = cloneInput()
  ;(astralBoundary.source as { sourceRef: string }).sourceRef = "😀".repeat(P5_R1_EVIDENCE_PROVENANCE_LIMITS.maxSourceRefCodePoints)
  ;(astralBoundary.revision as { repositoryId: string }).repositoryId = "🧪".repeat(P5_R1_EVIDENCE_PROVENANCE_LIMITS.maxRepositoryIdCodePoints)
  ;(astralBoundary.producer as { producerId: string }).producerId = "🚀".repeat(P5_R1_EVIDENCE_PROVENANCE_LIMITS.maxProducerIdCodePoints)
  ;(astralBoundary.producer as { producerVersion: string }).producerVersion = "✨".repeat(P5_R1_EVIDENCE_PROVENANCE_LIMITS.maxProducerVersionCodePoints)

  const valid = buildP5EvidenceProvenanceBinding(astralBoundary)
  assert.ok(schemaAccepts(schema, valid))
  assert.deepEqual(validateP5EvidenceProvenanceBinding(valid), valid)

  const tooLong = structuredClone(valid) as unknown as UnknownRecord
  const tooLongSource = tooLong.source as UnknownRecord
  tooLongSource.sourceRef = "😀".repeat(P5_R1_EVIDENCE_PROVENANCE_LIMITS.maxSourceRefCodePoints + 1)
  assert.equal(schemaAccepts(schema, tooLong), false)
  assert.throws(() => validateP5EvidenceProvenanceBinding(tooLong), /sourceRef/)

  const nul = structuredClone(valid) as unknown as UnknownRecord
  const nulRevision = nul.revision as UnknownRecord
  nulRevision.repositoryId = "repo\0id"
  assert.equal(schemaAccepts(schema, nul), false)
  assert.throws(() => validateP5EvidenceProvenanceBinding(nul), /repositoryId/)

  const loneSurrogate = structuredClone(valid) as unknown as UnknownRecord
  const surrogateProducer = loneSurrogate.producer as UnknownRecord
  surrogateProducer.producerVersion = "v\ud800"
  assert.equal(schemaAccepts(schema, loneSurrogate), false)
  assert.throws(() => validateP5EvidenceProvenanceBinding(loneSurrogate), /valid Unicode scalar values/)

  const badEnum = structuredClone(valid) as unknown as UnknownRecord
  const badFreshness = badEnum.freshness as UnknownRecord
  badFreshness.state = "UNKNOWN"
  assert.equal(schemaAccepts(schema, badEnum), false)
  assert.throws(() => validateP5EvidenceProvenanceBinding(badEnum), /freshness.state/)
})

test("P5-R1 preserves every pinned predecessor blob named by canonical authorization", () => {
  const predecessors = [
    ["../src/verification/planner.ts", "af6732d996853ac0480991e4f1f4419de6a80a62"],
    ["../src/verification/types.ts", "5c7006e6904f97791378a4a4367d569a6971c6af"],
    ["../src/proof-review/contracts.ts", "ef0ae26c2a44157fb20ad33145788ba1255239f5"],
    ["../src/proof-review/linkage-contracts.ts", "59d87c73d829c4cd1d57dba134f79839f13b9722"],
    ["../src/proof-review/reconciliation-contracts.ts", "acf758a6f17180448c1c46b0397bfe6742b4f04b"],
    ["../src/reviewer-intelligence/p4-claim-envelope.ts", "e9a59acf25c05276dddf80e269be4ae03e5e6775"],
    ["../src/reviewer-intelligence/p4-critic-disposition.ts", "11b49b715fa5991deb6d2154d11c3cacbf310f92"],
  ] as const

  for (const [path, expected] of predecessors) {
    assert.equal(gitBlobSha1(readFileSync(new URL(path, import.meta.url))), expected, path)
  }
})
