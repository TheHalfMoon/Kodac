import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import test from "node:test"

import {
  P5_R1_EVIDENCE_PROVENANCE_LIMITS,
  buildP5EvidenceProvenanceBinding,
  type P5EvidenceProvenanceBinding,
  type P5EvidenceProvenanceInput,
} from "../src/verification/p5-evidence-provenance.ts"
import {
  P5_R2_EVIDENCE_RELATIONS,
  P5_R2_EVIDENCE_RELATION_VERSION,
  buildP5EvidenceRelationEdge,
  p5EvidenceRelationIdentity,
  validateP5EvidenceRelationEdge,
  type P5EvidenceRelationEdge,
  type P5EvidenceRelationInput,
  type P5EvidenceRelationKind,
} from "../src/verification/p5-evidence-relation.ts"

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
const SHA_2 = "2".repeat(64)
const SHA_3 = "3".repeat(64)

function provenanceInput(seed: "source" | "target"): P5EvidenceProvenanceInput {
  const source = seed === "source"
  return {
    source: {
      sourceKind: "VERIFICATION_REPORT",
      evidenceIdentity: source ? SHA_A : SHA_B,
      sourceRef: source ? "artifact://verification/source.json" : "artifact://verification/target.json",
      sourceDigest: source ? SHA_C : SHA_D,
    },
    revision: {
      repositoryId: "github.com/TheHalfMoon/Kodac",
      canonicalBase: BASE,
      candidateHead: HEAD,
    },
    producer: {
      producerId: "kodac-runtime",
      producerVersion: "1.0.0",
      configurationIdentity: source ? SHA_E : SHA_F,
    },
    policyIdentity: SHA_0,
    scopeIdentity: SHA_1,
    inputIdentity: source ? SHA_2 : SHA_3,
    environmentIdentity: SHA_E,
    freshness: {
      state: "CURRENT",
      basisIdentity: SHA_F,
    },
  }
}

function bindings(): { source: P5EvidenceProvenanceBinding; target: P5EvidenceProvenanceBinding } {
  return {
    source: buildP5EvidenceProvenanceBinding(provenanceInput("source")),
    target: buildP5EvidenceProvenanceBinding(provenanceInput("target")),
  }
}

function relationInput(relation: P5EvidenceRelationKind = "SUPPORTS"): P5EvidenceRelationInput {
  const pair = bindings()
  return { source: pair.source, relation, target: pair.target }
}

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
}

function expectedIdentity(input: P5EvidenceRelationInput): string {
  return sha256(JSON.stringify({
    version: P5_R2_EVIDENCE_RELATION_VERSION,
    revision: input.source.revision,
    sourceBindingIdentity: input.source.bindingIdentity,
    relation: input.relation,
    targetBindingIdentity: input.target.bindingIdentity,
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
  const schemaNode = asSchema(schemaValue, path)

  if (Array.isArray(schemaNode.allOf)) {
    for (const child of schemaNode.allOf) validateSchema(child, value, root, path)
  }
  if (typeof schemaNode.$ref === "string") {
    validateSchema(resolveRef(root, schemaNode.$ref), value, root, path)
    return
  }
  if ("const" in schemaNode) assert.ok(schemaEqual(value, schemaNode.const), `${path} violates const`)
  if (Array.isArray(schemaNode.enum)) {
    assert.ok(schemaNode.enum.some((item) => schemaEqual(item, value)), `${path} violates enum`)
  }

  if (schemaNode.type === "object") {
    assert.ok(value && typeof value === "object" && !Array.isArray(value), `${path} must be object`)
    const record = value as UnknownRecord
    const properties = schemaNode.properties === undefined ? {} : asSchema(schemaNode.properties, `${path}.properties`)
    if (Array.isArray(schemaNode.required)) {
      for (const key of schemaNode.required) {
        assert.equal(typeof key, "string")
        assert.ok(Object.hasOwn(record, key), `${path} missing ${key}`)
      }
    }
    if (schemaNode.additionalProperties === false) {
      for (const key of Object.keys(record)) assert.ok(Object.hasOwn(properties, key), `${path} has additional property ${key}`)
    }
    for (const [key, childSchema] of Object.entries(properties)) {
      if (Object.hasOwn(record, key)) validateSchema(childSchema, record[key], root, `${path}.${key}`)
    }
  }

  if (schemaNode.type === "string") {
    assert.equal(typeof value, "string", `${path} must be string`)
    const text = value as string
    const codePointLength = [...text].length
    if (typeof schemaNode.minLength === "number") assert.ok(codePointLength >= schemaNode.minLength, `${path} violates minLength`)
    if (typeof schemaNode.maxLength === "number") assert.ok(codePointLength <= schemaNode.maxLength, `${path} violates maxLength`)
    if (typeof schemaNode.pattern === "string") assert.match(text, new RegExp(schemaNode.pattern), `${path} violates pattern`)
  } else if (
    typeof schemaNode.minLength === "number"
    || typeof schemaNode.maxLength === "number"
    || typeof schemaNode.pattern === "string"
  ) {
    assert.equal(typeof value, "string", `${path} must be string`)
    const text = value as string
    const codePointLength = [...text].length
    if (typeof schemaNode.minLength === "number") assert.ok(codePointLength >= schemaNode.minLength, `${path} violates minLength`)
    if (typeof schemaNode.maxLength === "number") assert.ok(codePointLength <= schemaNode.maxLength, `${path} violates maxLength`)
    if (typeof schemaNode.pattern === "string") assert.match(text, new RegExp(schemaNode.pattern), `${path} violates pattern`)
  }
}

function schemaAccepts(schemaValue: UnknownRecord, value: unknown): boolean {
  try {
    validateSchema(schemaValue, value, schemaValue)
    return true
  } catch {
    return false
  }
}

const schema = JSON.parse(
  readFileSync(new URL("../../../schema/p5-evidence-relation.schema.json", import.meta.url), "utf8"),
) as UnknownRecord

test("P5-R2 builds one deterministic content-addressed directed relation edge", () => {
  const input = relationInput("SUPPORTS")
  const edge = buildP5EvidenceRelationEdge(input)

  assert.equal(edge.version, P5_R2_EVIDENCE_RELATION_VERSION)
  assert.equal(edge.relationIdentity, expectedIdentity(input))
  assert.equal(p5EvidenceRelationIdentity(input), edge.relationIdentity)
  assert.equal(edge.sourceBindingIdentity, input.source.bindingIdentity)
  assert.equal(edge.targetBindingIdentity, input.target.bindingIdentity)
  assert.equal(edge.relation, "SUPPORTS")
  assert.deepEqual(edge.revision, input.source.revision)
  assert.deepEqual(validateP5EvidenceRelationEdge(edge), edge)

  const reordered = {
    target: input.target,
    relation: input.relation,
    source: input.source,
  } as P5EvidenceRelationInput
  assert.equal(buildP5EvidenceRelationEdge(reordered).relationIdentity, edge.relationIdentity)
})

test("P5-R2 preserves exact caller-supplied directional relation vocabulary without inference", () => {
  assert.deepEqual([...P5_R2_EVIDENCE_RELATIONS], ["SUPPORTS", "CONTRADICTS", "SUPERSEDES"])

  for (const relation of P5_R2_EVIDENCE_RELATIONS) {
    const input = relationInput(relation)
    const edge = buildP5EvidenceRelationEdge(input)
    assert.equal(edge.relation, relation)
    assert.equal(edge.sourceBindingIdentity, input.source.bindingIdentity)
    assert.equal(edge.targetBindingIdentity, input.target.bindingIdentity)
    assert.equal(Object.keys(edge).length, 6)
    assert.equal("inverse" in (edge as unknown as UnknownRecord), false)
    assert.equal("edges" in (edge as unknown as UnknownRecord), false)
    assert.equal("nodes" in (edge as unknown as UnknownRecord), false)
  }
})

test("P5-R2 relation identity binds source, relation, target, and exact common revision", () => {
  const baselineInput = relationInput("SUPPORTS")
  const baseline = buildP5EvidenceRelationEdge(baselineInput)

  const contradicted = relationInput("CONTRADICTS")
  assert.notEqual(buildP5EvidenceRelationEdge(contradicted).relationIdentity, baseline.relationIdentity)

  const reversed = {
    source: baselineInput.target,
    relation: baselineInput.relation,
    target: baselineInput.source,
  } satisfies P5EvidenceRelationInput
  assert.notEqual(buildP5EvidenceRelationEdge(reversed).relationIdentity, baseline.relationIdentity)

  const otherSourceInput = provenanceInput("source")
  ;(otherSourceInput.source as { evidenceIdentity: string }).evidenceIdentity = SHA_D
  const otherSource = buildP5EvidenceProvenanceBinding(otherSourceInput)
  const changedSource = { ...baselineInput, source: otherSource }
  assert.notEqual(buildP5EvidenceRelationEdge(changedSource).relationIdentity, baseline.relationIdentity)

  const changedRevisionSourceInput = provenanceInput("source")
  const changedRevisionTargetInput = provenanceInput("target")
  ;(changedRevisionSourceInput.revision as { candidateHead: string }).candidateHead = "3".repeat(40)
  ;(changedRevisionTargetInput.revision as { candidateHead: string }).candidateHead = "3".repeat(40)
  const changedRevision = {
    source: buildP5EvidenceProvenanceBinding(changedRevisionSourceInput),
    relation: "SUPPORTS",
    target: buildP5EvidenceProvenanceBinding(changedRevisionTargetInput),
  } satisfies P5EvidenceRelationInput
  assert.notEqual(buildP5EvidenceRelationEdge(changedRevision).relationIdentity, baseline.relationIdentity)
})

test("P5-R2 requires valid P5-R1 source and target bindings", () => {
  const input = relationInput()
  const badSource = structuredClone(input.source) as unknown as UnknownRecord
  badSource.bindingIdentity = SHA_F
  assert.throws(
    () => buildP5EvidenceRelationEdge({ ...input, source: badSource as unknown as P5EvidenceProvenanceBinding }),
    /bindingIdentity/,
  )

  const badTarget = structuredClone(input.target) as unknown as UnknownRecord
  badTarget.bindingIdentity = "A".repeat(64)
  assert.throws(
    () => buildP5EvidenceRelationEdge({ ...input, target: badTarget as unknown as P5EvidenceProvenanceBinding }),
    /bindingIdentity/,
  )
})

test("P5-R2 rejects self-relations and cross-repository or cross-revision relations", () => {
  const pair = bindings()
  assert.throws(
    () => buildP5EvidenceRelationEdge({ source: pair.source, relation: "SUPPORTS", target: pair.source }),
    /must be distinct/,
  )

  const crossRepositoryInput = provenanceInput("target")
  ;(crossRepositoryInput.revision as { repositoryId: string }).repositoryId = "github.com/TheHalfMoon/Other"
  const crossRepository = buildP5EvidenceProvenanceBinding(crossRepositoryInput)
  assert.throws(
    () => buildP5EvidenceRelationEdge({ source: pair.source, relation: "SUPPORTS", target: crossRepository }),
    /same repositoryId, canonicalBase, and candidateHead/,
  )

  const crossBaseInput = provenanceInput("target")
  ;(crossBaseInput.revision as { canonicalBase: string }).canonicalBase = "3".repeat(40)
  const crossBase = buildP5EvidenceProvenanceBinding(crossBaseInput)
  assert.throws(
    () => buildP5EvidenceRelationEdge({ source: pair.source, relation: "SUPPORTS", target: crossBase }),
    /same repositoryId, canonicalBase, and candidateHead/,
  )

  const crossHeadInput = provenanceInput("target")
  ;(crossHeadInput.revision as { candidateHead: string }).candidateHead = "4".repeat(40)
  const crossHead = buildP5EvidenceProvenanceBinding(crossHeadInput)
  assert.throws(
    () => buildP5EvidenceRelationEdge({ source: pair.source, relation: "SUPPORTS", target: crossHead }),
    /same repositoryId, canonicalBase, and candidateHead/,
  )
})

test("P5-R2 returns detached frozen output and never mutates validated predecessor bindings", () => {
  const input = relationInput("SUPERSEDES")
  const sourceSnapshot = structuredClone(input.source)
  const targetSnapshot = structuredClone(input.target)
  const edge = buildP5EvidenceRelationEdge(input)
  const snapshot = structuredClone(edge)

  assert.deepEqual(input.source, sourceSnapshot)
  assert.deepEqual(input.target, targetSnapshot)
  assert.deepEqual(edge, snapshot)
  assert.ok(Object.isFrozen(edge))
  assert.ok(Object.isFrozen(edge.revision))
})

test("P5-R2 rejects malformed output identities, unsupported relations, and tampered relation identity", () => {
  const edge = structuredClone(buildP5EvidenceRelationEdge(relationInput())) as unknown as UnknownRecord

  const malformedRelationIdentity = structuredClone(edge) as UnknownRecord
  malformedRelationIdentity.relationIdentity = "A".repeat(64)
  assert.throws(() => validateP5EvidenceRelationEdge(malformedRelationIdentity), /relationIdentity/)

  const malformedSource = structuredClone(edge) as UnknownRecord
  malformedSource.sourceBindingIdentity = "a".repeat(63)
  assert.throws(() => validateP5EvidenceRelationEdge(malformedSource), /sourceBindingIdentity/)

  const unsupported = structuredClone(edge) as UnknownRecord
  unsupported.relation = "VERIFIES"
  assert.throws(() => validateP5EvidenceRelationEdge(unsupported), /relation/)

  const tampered = structuredClone(edge) as UnknownRecord
  tampered.relation = "CONTRADICTS"
  assert.throws(() => validateP5EvidenceRelationEdge(tampered), /does not match the canonical semantic content/)
})

test("P5-R2 rejects unknown, missing, array, symbol, cycle, and hostile-prototype structure", () => {
  const input = relationInput()

  const unknown = { ...input, extra: true } as unknown as P5EvidenceRelationInput
  assert.throws(() => buildP5EvidenceRelationEdge(unknown), /invalid key set|unknown field/)

  const missing = { source: input.source, relation: input.relation } as unknown as P5EvidenceRelationInput
  assert.throws(() => buildP5EvidenceRelationEdge(missing), /invalid key set|missing required field/)

  assert.throws(() => buildP5EvidenceRelationEdge([] as unknown as P5EvidenceRelationInput), /plain object/)

  const symbol = { ...input } as unknown as Record<PropertyKey, unknown>
  symbol[Symbol("hidden")] = true
  assert.throws(() => buildP5EvidenceRelationEdge(symbol as unknown as P5EvidenceRelationInput), /symbol fields/)

  const cycle = { ...input } as unknown as UnknownRecord
  cycle.source = cycle
  assert.throws(() => buildP5EvidenceRelationEdge(cycle as unknown as P5EvidenceRelationInput), /invalid key set|binding/)

  const hostile = Object.create({ inherited: true }) as UnknownRecord
  Object.assign(hostile, input)
  assert.throws(() => buildP5EvidenceRelationEdge(hostile as unknown as P5EvidenceRelationInput), /plain object/)
})

test("P5-R2 rejects proxies and accessors without invoking caller-owned traps or getters", () => {
  const input = relationInput()
  let traps = 0
  const proxy = new Proxy(input as object, {
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
  assert.throws(() => buildP5EvidenceRelationEdge(proxy as P5EvidenceRelationInput), /Proxy/)
  assert.equal(traps, 0)

  const revoked = Proxy.revocable(input as object, {})
  revoked.revoke()
  assert.throws(() => buildP5EvidenceRelationEdge(revoked.proxy as P5EvidenceRelationInput), /Proxy/)

  let getterCalls = 0
  const accessor = { ...input } as unknown as UnknownRecord
  Object.defineProperty(accessor, "source", {
    enumerable: true,
    configurable: true,
    get() {
      getterCalls += 1
      throw new Error("getter invoked")
    },
  })
  assert.throws(() => buildP5EvidenceRelationEdge(accessor as unknown as P5EvidenceRelationInput), /enumerable data property/)
  assert.equal(getterCalls, 0)

  let nestedTraps = 0
  const nestedProxy = new Proxy(input.source as object, {
    getPrototypeOf() {
      nestedTraps += 1
      throw new Error("nested getPrototypeOf trap invoked")
    },
  })
  assert.throws(
    () => buildP5EvidenceRelationEdge({ ...input, source: nestedProxy as P5EvidenceProvenanceBinding }),
    /Proxy/,
  )
  assert.equal(nestedTraps, 0)
})

test("P5-R2 output validator rejects hostile structural values without invoking traps or getters", () => {
  const edge = buildP5EvidenceRelationEdge(relationInput())
  let traps = 0
  const proxy = new Proxy(edge as object, {
    getPrototypeOf() {
      traps += 1
      throw new Error("getPrototypeOf trap invoked")
    },
  })
  assert.throws(() => validateP5EvidenceRelationEdge(proxy), /Proxy/)
  assert.equal(traps, 0)

  const revoked = Proxy.revocable(edge as object, {})
  revoked.revoke()
  assert.throws(() => validateP5EvidenceRelationEdge(revoked.proxy), /Proxy/)

  let getterCalls = 0
  const accessor = structuredClone(edge) as unknown as UnknownRecord
  Object.defineProperty(accessor, "revision", {
    enumerable: true,
    configurable: true,
    get() {
      getterCalls += 1
      throw new Error("getter invoked")
    },
  })
  assert.throws(() => validateP5EvidenceRelationEdge(accessor), /enumerable data property/)
  assert.equal(getterCalls, 0)

  const symbol = structuredClone(edge) as unknown as Record<PropertyKey, unknown>
  symbol[Symbol("hidden")] = true
  assert.throws(() => validateP5EvidenceRelationEdge(symbol), /symbol fields/)
})

test("P5-R2 runtime and schema agree on structural boundaries including astral Unicode", () => {
  const sourceInput = provenanceInput("source")
  const targetInput = provenanceInput("target")
  ;(sourceInput.revision as { repositoryId: string }).repositoryId = "🧪".repeat(
    P5_R1_EVIDENCE_PROVENANCE_LIMITS.maxRepositoryIdCodePoints,
  )
  ;(targetInput.revision as { repositoryId: string }).repositoryId = "🧪".repeat(
    P5_R1_EVIDENCE_PROVENANCE_LIMITS.maxRepositoryIdCodePoints,
  )
  const valid = buildP5EvidenceRelationEdge({
    source: buildP5EvidenceProvenanceBinding(sourceInput),
    relation: "CONTRADICTS",
    target: buildP5EvidenceProvenanceBinding(targetInput),
  })
  assert.ok(schemaAccepts(schema, valid))
  assert.deepEqual(validateP5EvidenceRelationEdge(valid), valid)

  const tooLong = structuredClone(valid) as unknown as UnknownRecord
  const tooLongRevision = tooLong.revision as UnknownRecord
  tooLongRevision.repositoryId = "🧪".repeat(P5_R1_EVIDENCE_PROVENANCE_LIMITS.maxRepositoryIdCodePoints + 1)
  assert.equal(schemaAccepts(schema, tooLong), false)
  assert.throws(() => validateP5EvidenceRelationEdge(tooLong), /repositoryId/)

  const nul = structuredClone(valid) as unknown as UnknownRecord
  const nulRevision = nul.revision as UnknownRecord
  nulRevision.repositoryId = "repo\0id"
  assert.equal(schemaAccepts(schema, nul), false)
  assert.throws(() => validateP5EvidenceRelationEdge(nul), /repositoryId/)

  const loneSurrogate = structuredClone(valid) as unknown as UnknownRecord
  const surrogateRevision = loneSurrogate.revision as UnknownRecord
  surrogateRevision.repositoryId = "repo\ud800"
  assert.equal(schemaAccepts(schema, loneSurrogate), false)
  assert.throws(() => validateP5EvidenceRelationEdge(loneSurrogate), /valid Unicode scalar values/)

  const badRelation = structuredClone(valid) as unknown as UnknownRecord
  badRelation.relation = "VERIFIES"
  assert.equal(schemaAccepts(schema, badRelation), false)
  assert.throws(() => validateP5EvidenceRelationEdge(badRelation), /relation/)

  const additional = structuredClone(valid) as unknown as UnknownRecord
  additional.graph = []
  assert.equal(schemaAccepts(schema, additional), false)
  assert.throws(() => validateP5EvidenceRelationEdge(additional), /invalid key set|unknown field/)
})

test("P5-R2 keeps semantic cross-field invariants runtime-only rather than claiming schema inference", () => {
  const edge = structuredClone(buildP5EvidenceRelationEdge(relationInput())) as unknown as UnknownRecord
  edge.targetBindingIdentity = edge.sourceBindingIdentity
  assert.equal(schemaAccepts(schema, edge), true)
  assert.throws(() => validateP5EvidenceRelationEdge(edge), /must be distinct/)

  const tamperedIdentity = structuredClone(buildP5EvidenceRelationEdge(relationInput())) as unknown as UnknownRecord
  tamperedIdentity.relationIdentity = SHA_F
  assert.equal(schemaAccepts(schema, tamperedIdentity), true)
  assert.throws(() => validateP5EvidenceRelationEdge(tamperedIdentity), /does not match the canonical semantic content/)
})

test("P5-R2 preserves every pinned predecessor blob named by canonical authorization", () => {
  const predecessors = [
    ["../src/verification/planner.ts", "af6732d996853ac0480991e4f1f4419de6a80a62"],
    ["../src/verification/types.ts", "5c7006e6904f97791378a4a4367d569a6971c6af"],
    ["../src/proof-review/contracts.ts", "ef0ae26c2a44157fb20ad33145788ba1255239f5"],
    ["../src/proof-review/linkage-contracts.ts", "59d87c73d829c4cd1d57dba134f79839f13b9722"],
    ["../src/proof-review/reconciliation-contracts.ts", "acf758a6f17180448c1c46b0397bfe6742b4f04b"],
    ["../src/relation-graph/contracts.ts", "dd2caff61c2f6cf82d357002902fa2e5edd1a3da"],
    ["../src/reviewer-intelligence/p4-claim-envelope.ts", "e9a59acf25c05276dddf80e269be4ae03e5e6775"],
    ["../src/reviewer-intelligence/p4-critic-disposition.ts", "11b49b715fa5991deb6d2154d11c3cacbf310f92"],
    ["../src/verification/p5-evidence-provenance.ts", "4c8d708070e950d2902308ca1977ce5267acec29"],
  ] as const

  for (const [path, expected] of predecessors) {
    assert.equal(gitBlobSha1(readFileSync(new URL(path, import.meta.url))), expected, path)
  }
})
