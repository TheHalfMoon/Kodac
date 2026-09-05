import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import test from "node:test"

import {
  buildP5EvidenceProvenanceBinding,
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
type MutableRecord = Record<string, any>

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

function fixtureInput(state: "CURRENT" | "STALE" = "CURRENT"): P6DeterministicSecurityFindingInput {
  return {
    origin: P6_R1_DETERMINISTIC_SECURITY_FINDING_ORIGIN,
    provenanceBinding: buildP5EvidenceProvenanceBinding(provenanceInput(state)),
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

function mutableInput(state: "CURRENT" | "STALE" = "CURRENT"): MutableRecord {
  return structuredClone(fixtureInput(state)) as unknown as MutableRecord
}

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
}

function expectedIdentity(finding: Omit<P6DeterministicSecurityFinding, "findingIdentity">): string {
  return sha256(JSON.stringify(finding))
}

const p6Schema = JSON.parse(
  readFileSync(new URL("../../../schema/p6-deterministic-security-finding.schema.json", import.meta.url), "utf8"),
) as UnknownRecord
const p5Schema = JSON.parse(
  readFileSync(new URL("../../../schema/p5-evidence-provenance.schema.json", import.meta.url), "utf8"),
) as UnknownRecord

test("P6-R1 builds and validates one deterministic content-addressed finding", () => {
  const input = fixtureInput()
  const built = buildP6DeterministicSecurityFinding(input)
  const preimage = {
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
  assert.equal(built.findingIdentity, expectedIdentity(preimage))
  assert.equal(p6DeterministicSecurityFindingIdentity(input), built.findingIdentity)
  assert.deepEqual(validateP6DeterministicSecurityFinding(built), built)
})

test("P6-R1 normalizes semantic input ordering deterministically", () => {
  const baseline = buildP6DeterministicSecurityFinding(fixtureInput())
  const reordered = mutableInput()
  reordered.referenceIds.reverse()
  reordered.location = {
    endLine: reordered.location.endLine,
    path: reordered.location.path,
    startLine: reordered.location.startLine,
  }

  const rebuilt = buildP6DeterministicSecurityFinding(reordered as P6DeterministicSecurityFindingInput)
  assert.equal(rebuilt.findingIdentity, baseline.findingIdentity)
  assert.deepEqual(rebuilt.referenceIds, baseline.referenceIds)
})

test("P6-R1 identity binds provenance, classification, location, digests, and references", () => {
  const baseline = buildP6DeterministicSecurityFinding(fixtureInput())
  const mutations: Array<(input: MutableRecord) => void> = [
    (input) => { input.provenanceBinding = buildP5EvidenceProvenanceBinding(provenanceInput("STALE")) },
    (input) => { input.lane = "DEPENDENCY_ANALYSIS" },
    (input) => { input.ruleId = "semgrep.security.other" },
    (input) => { input.severity = "CRITICAL" },
    (input) => { input.location.path = "src/db/other.ts" },
    (input) => { input.location.startLine = 13 },
    (input) => { input.location.endLine = 19 },
    (input) => { input.nativeRecordDigest = SHA_E },
    (input) => { input.fingerprint = SHA_F },
    (input) => { input.referenceIds = ["CVE-2026-99999"] },
  ]

  for (const mutate of mutations) {
    const input = mutableInput()
    mutate(input)
    assert.notEqual(
      buildP6DeterministicSecurityFinding(input as P6DeterministicSecurityFindingInput).findingIdentity,
      baseline.findingIdentity,
    )
  }
})

test("P6-R1 preserves caller-supplied CURRENT and STALE provenance", () => {
  const current = buildP6DeterministicSecurityFinding(fixtureInput("CURRENT"))
  const stale = buildP6DeterministicSecurityFinding(fixtureInput("STALE"))

  assert.equal(current.provenanceBinding.freshness.state, "CURRENT")
  assert.equal(stale.provenanceBinding.freshness.state, "STALE")
  assert.notEqual(current.findingIdentity, stale.findingIdentity)
})

test("P6-R1 returns detached deeply immutable data", () => {
  const input = mutableInput()
  const built = buildP6DeterministicSecurityFinding(input as P6DeterministicSecurityFindingInput)
  const snapshot = structuredClone(built)

  input.location.path = "mutated.ts"
  input.referenceIds[0] = "MUTATED"
  input.provenanceBinding.source.sourceRef = "mutated"

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

test("P6-R1 rejects tampered P5-R1 provenance identity", () => {
  const input = mutableInput()
  input.provenanceBinding.bindingIdentity = SHA_F
  assert.throws(
    () => buildP6DeterministicSecurityFinding(input as P6DeterministicSecurityFindingInput),
    /bindingIdentity/,
  )
})

test("P6-R1 enforces origin, lanes, severities, rule ids, and SHA-256 identities", () => {
  for (const [field, value] of [
    ["origin", "REVIEWER"],
    ["lane", "DYNAMIC_ATTACK"],
    ["severity", "SEVERE"],
    ["ruleId", "$(touch-owned)"],
    ["nativeRecordDigest", "A".repeat(64)],
    ["fingerprint", "f".repeat(63)],
  ]) {
    const input = mutableInput()
    input[field] = value
    assert.throws(
      () => buildP6DeterministicSecurityFinding(input as P6DeterministicSecurityFindingInput),
      new RegExp(field),
    )
  }

  for (const invalidRule of ["", " rule", "rüle", "a".repeat(129)]) {
    const input = mutableInput()
    input.ruleId = invalidRule
    assert.throws(() => buildP6DeterministicSecurityFinding(input as P6DeterministicSecurityFindingInput), /ruleId/)
  }
})

test("P6-R1 enforces repository-relative inert path and complete bounded line ranges", () => {
  const astralBoundary = mutableInput()
  astralBoundary.location.path = `${"a".repeat(1023)}😀`
  assert.doesNotThrow(() => buildP6DeterministicSecurityFinding(astralBoundary as P6DeterministicSecurityFindingInput))

  const astralOverflow = mutableInput()
  astralOverflow.location.path = `${"a".repeat(1024)}😀`
  assert.throws(() => buildP6DeterministicSecurityFinding(astralOverflow as P6DeterministicSecurityFindingInput), /path/)

  for (const path of [
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
    const input = mutableInput()
    input.location.path = path
    assert.throws(
      () => buildP6DeterministicSecurityFinding(input as P6DeterministicSecurityFindingInput),
      /location.path|Unicode/,
    )
  }

  const incomplete = mutableInput()
  delete incomplete.location.endLine
  assert.throws(
    () => buildP6DeterministicSecurityFinding(incomplete as P6DeterministicSecurityFindingInput),
    /both startLine and endLine/,
  )

  for (const [startLine, endLine] of [
    [0, 1],
    [2, 1],
    [1.5, 2],
    [1, P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxLine + 1],
  ]) {
    const input = mutableInput()
    input.location.startLine = startLine
    input.location.endLine = endLine
    assert.throws(
      () => buildP6DeterministicSecurityFinding(input as P6DeterministicSecurityFindingInput),
      /startLine|endLine|startLine <= endLine/,
    )
  }
})

test("P6-R1 bounds, de-duplicates, and canonically orders reference identities", () => {
  const empty = mutableInput()
  empty.referenceIds = []
  assert.deepEqual(
    buildP6DeterministicSecurityFinding(empty as P6DeterministicSecurityFindingInput).referenceIds,
    [],
  )

  const max = mutableInput()
  max.referenceIds = Array.from(
    { length: P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxReferenceIds },
    (_, index) => `REF-${String(index).padStart(2, "0")}`,
  ).reverse()
  assert.equal(
    buildP6DeterministicSecurityFinding(max as P6DeterministicSecurityFindingInput).referenceIds.length,
    P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxReferenceIds,
  )

  for (const references of [
    Array.from({ length: P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxReferenceIds + 1 }, (_, index) => `REF-${index}`),
    ["CVE-1", "CVE-1"],
    ["   "],
    ["REF\nINJECT"],
    ["\ud800"],
    ["x".repeat(P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxReferenceIdCodePoints + 1)],
  ]) {
    const input = mutableInput()
    input.referenceIds = references
    assert.throws(
      () => buildP6DeterministicSecurityFinding(input as P6DeterministicSecurityFindingInput),
      /referenceIds|Unicode|at most/,
    )
  }

  const nonCanonical = structuredClone(
    buildP6DeterministicSecurityFinding(fixtureInput()),
  ) as unknown as MutableRecord
  nonCanonical.referenceIds.reverse()
  assert.throws(() => validateP6DeterministicSecurityFinding(nonCanonical), /canonical ascending order/)
})

test("P6-R1 rejects raw secret and provider-payload fields", () => {
  for (const field of ["secret", "match", "rawPayload", "rawRecord", "capturedText", "stdout", "stderr"]) {
    const input = mutableInput()
    input[field] = "must-not-be-stored"
    assert.throws(
      () => buildP6DeterministicSecurityFinding(input as P6DeterministicSecurityFindingInput),
      /unknown field/,
      field,
    )
  }

  const nested = mutableInput()
  nested.location.rawPayload = "must-not-be-stored"
  assert.throws(
    () => buildP6DeterministicSecurityFinding(nested as P6DeterministicSecurityFindingInput),
    /unknown field/,
  )
})

test("P6-R1 rejects proxies and accessors without executing caller-owned hooks", () => {
  let traps = 0
  const proxy = new Proxy(mutableInput(), {
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
  assert.throws(
    () => buildP6DeterministicSecurityFinding(proxy as P6DeterministicSecurityFindingInput),
    /Proxy/,
  )
  assert.equal(traps, 0)

  const revoked = Proxy.revocable(mutableInput(), {})
  revoked.revoke()
  assert.throws(
    () => buildP6DeterministicSecurityFinding(revoked.proxy as P6DeterministicSecurityFindingInput),
    /Proxy/,
  )

  let getterCalls = 0
  const accessor = mutableInput()
  Object.defineProperty(accessor, "ruleId", {
    enumerable: true,
    configurable: true,
    get() {
      getterCalls += 1
      throw new Error("getter invoked")
    },
  })
  assert.throws(
    () => buildP6DeterministicSecurityFinding(accessor as P6DeterministicSecurityFindingInput),
    /data property/,
  )
  assert.equal(getterCalls, 0)
})

test("P6-R1 rejects symbols, custom prototypes, sparse arrays, cycles, invalid Unicode, and non-JSON values", () => {
  const symbol = mutableInput() as Record<PropertyKey, unknown>
  symbol[Symbol("hidden")] = true
  assert.throws(
    () => buildP6DeterministicSecurityFinding(symbol as P6DeterministicSecurityFindingInput),
    /symbol/,
  )

  const normal = mutableInput()
  const custom = Object.create({ inherited: true }) as MutableRecord
  for (const [key, value] of Object.entries(normal)) custom[key] = value
  assert.throws(
    () => buildP6DeterministicSecurityFinding(custom as P6DeterministicSecurityFindingInput),
    /plain object/,
  )

  const customArray = mutableInput()
  Object.setPrototypeOf(customArray.referenceIds, { custom: true })
  assert.throws(
    () => buildP6DeterministicSecurityFinding(customArray as P6DeterministicSecurityFindingInput),
    /ordinary Array prototype/,
  )

  const sparse = mutableInput()
  const sparseReferences: string[] = []
  sparseReferences.length = 2
  sparseReferences[0] = "CVE-1"
  sparse.referenceIds = sparseReferences
  assert.throws(
    () => buildP6DeterministicSecurityFinding(sparse as P6DeterministicSecurityFindingInput),
    /sparse array/,
  )

  const cycle = mutableInput()
  cycle.location = cycle
  assert.throws(
    () => buildP6DeterministicSecurityFinding(cycle as P6DeterministicSecurityFindingInput),
    /acyclic/,
  )

  const nonFinite = mutableInput()
  nonFinite.location.startLine = Number.POSITIVE_INFINITY
  assert.throws(
    () => buildP6DeterministicSecurityFinding(nonFinite as P6DeterministicSecurityFindingInput),
    /non-finite|startLine/,
  )

  const bigint = mutableInput()
  bigint.ruleId = 1n
  assert.throws(
    () => buildP6DeterministicSecurityFinding(bigint as P6DeterministicSecurityFindingInput),
    /JSON data only/,
  )
})

test("P6-R1 Draft 2020-12 schema mirrors the bounded public shape", () => {
  assert.equal(p6Schema.$schema, "https://json-schema.org/draft/2020-12/schema")
  assert.equal(p6Schema.$id, "https://kodac.dev/schema/p6-deterministic-security-finding.schema.json")

  const properties = p6Schema.properties as UnknownRecord
  assert.equal((properties.provenanceBinding as UnknownRecord).$ref, p5Schema.$id)
  assert.deepEqual((properties.lane as UnknownRecord).enum, [...P6_R1_SECURITY_LANES])
  assert.deepEqual((properties.severity as UnknownRecord).enum, [...P6_R1_SECURITY_SEVERITIES])
  assert.equal((p6Schema as UnknownRecord).additionalProperties, false)
  assert.equal((properties.referenceIds as UnknownRecord).maxItems, P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxReferenceIds)

  for (const forbidden of ["secret", "match", "rawPayload", "rawRecord", "capturedText", "stdout", "stderr"]) {
    assert.equal(Object.hasOwn(properties, forbidden), false)
  }
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
