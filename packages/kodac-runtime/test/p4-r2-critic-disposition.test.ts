import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import test from "node:test"

import type { FindingRecord } from "../src/reviewer-intelligence/contracts.ts"
import {
  P4_R1_CRITIC_STATE,
  P4_R1_DECLARATION_VERSION,
  buildP4ReviewerClaimEnvelope,
  riskHypothesisIdentity,
  verifierProposalIdentity,
  type P4ClaimEnvelopeDeclaration,
  type P4ReviewerClaimEnvelope,
  type P4RiskHypothesis,
  type P4VerifierProposal,
} from "../src/reviewer-intelligence/p4-claim-envelope.ts"
import {
  P4_R2_CRITIC_DISPOSITION_VERSION,
  P4_R2_DISPOSITIONS,
  buildP4CriticDisposition,
  validateP4CriticDisposition,
  type P4CriticDisposition,
  type P4CriticDispositionDeclaration,
  type P4CriticDispositionState,
} from "../src/reviewer-intelligence/p4-critic-disposition.ts"

type UnknownRecord = Record<string, unknown>

const HEAD = "1".repeat(40)
const BASE = "2".repeat(40)
const OTHER_HEAD = "3".repeat(40)

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize)
  if (typeof value === "object" && value !== null) {
    const record = value as UnknownRecord
    const ordered: UnknownRecord = {}
    for (const key of Object.keys(record).sort(compareStrings)) ordered[key] = canonicalize(record[key])
    return ordered
  }
  return value
}

function identity(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(canonicalize(value)), "utf8").digest("hex")
}

function gitBlobSha1(raw: Buffer): string {
  const canonical = Buffer.from(raw.toString("utf8").replace(/\r\n/g, "\n"), "utf8")
  const header = Buffer.from(`blob ${canonical.byteLength}\0`, "utf8")
  return createHash("sha1").update(header).update(canonical).digest("hex")
}

function finding(): FindingRecord {
  const review = {
    reviewRunId: "review-run-1",
    reviewerId: "fixture-reviewer",
    reviewerVersion: "1.0.0",
    policyIdentity: "fixture-policy-v1",
    canonicalBase: BASE,
    reviewedHead: HEAD,
  }
  const historical = {
    version: "kri-r2-finding-v1" as const,
    claimKey: "claim-1",
    review,
    path: "src/example.ts",
    range: { startLine: 10, endLine: 12 },
    summary: "An authorization boundary may be bypassed.",
    contractClaim: "All protected mutations require explicit authority.",
    category: "authorization",
    severity: "high" as const,
    confidenceBps: 9200,
    evidenceRefs: ["finding:evidence:a", "finding:evidence:b"],
  }
  return {
    ...historical,
    findingIdentity: identity(historical),
    evaluatedHead: HEAD,
    freshness: "CURRENT",
    state: "NEW",
  }
}

function risk(): P4RiskHypothesis {
  const withoutIdentity = {
    riskClass: "AUTHORIZATION_DRIFT" as const,
    statement: "The change may weaken an explicit authorization boundary.",
    evidenceRefs: ["risk:evidence:b", "risk:evidence:a"],
  }
  return {
    riskHypothesisId: riskHypothesisIdentity(withoutIdentity),
    ...withoutIdentity,
  }
}

function proposal(): P4VerifierProposal {
  const withoutIdentity = {
    verifierClass: "FOCUSED_TEST" as const,
    objective: "Attempt the mutation without the required authorization and require rejection.",
    evidenceRefs: ["proposal:evidence:b", "proposal:evidence:a"],
  }
  return {
    proposalId: verifierProposalIdentity(withoutIdentity),
    ...withoutIdentity,
  }
}

function p4R1Envelope(): P4ReviewerClaimEnvelope {
  const source = finding()
  const declaration: P4ClaimEnvelopeDeclaration = {
    version: P4_R1_DECLARATION_VERSION,
    sourceFindingIdentity: source.findingIdentity,
    riskHypothesis: risk(),
    evidenceRefs: ["envelope:evidence:b", "envelope:evidence:a"],
    verifierProposals: [proposal()],
    criticState: P4_R1_CRITIC_STATE,
  }
  return buildP4ReviewerClaimEnvelope({ finding: source, declaration })
}

function declaration(
  envelope: P4ReviewerClaimEnvelope,
  overrides: Partial<P4CriticDispositionDeclaration> = {},
): P4CriticDispositionDeclaration {
  return {
    p4R1EnvelopeIdentity: envelope.envelopeIdentity,
    criticId: "fixture-critic",
    criticVersion: "1.0.0",
    criticPolicyIdentity: "fixture-critic-policy-v1",
    evaluatedHead: HEAD,
    disposition: "SUPPORTED",
    rationale: "The cited exact-head evidence supports the bounded reviewer claim.",
    evidenceRefs: ["critic:evidence:b", "critic:evidence:a"],
    ...overrides,
  }
}

function build(
  overrides: Partial<P4CriticDispositionDeclaration> = {},
  envelope = p4R1Envelope(),
): P4CriticDisposition {
  return buildP4CriticDisposition({
    envelope,
    declaration: declaration(envelope, overrides),
  })
}

function clone<T>(value: T): T {
  return structuredClone(value)
}

function withoutDispositionIdentity(value: P4CriticDisposition): Omit<P4CriticDisposition, "dispositionIdentity"> {
  const { dispositionIdentity: _identity, ...withoutIdentity } = value
  return withoutIdentity
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
    if (typeof schema.minLength === "number") assert.ok(text.length >= schema.minLength, `${path} violates minLength`)
    if (typeof schema.maxLength === "number") assert.ok(text.length <= schema.maxLength, `${path} violates maxLength`)
    if (typeof schema.pattern === "string") assert.match(text, new RegExp(schema.pattern), `${path} violates pattern`)
  }

  if (schema.type === "array") {
    assert.ok(Array.isArray(value), `${path} must be array`)
    const items = value as unknown[]
    if (typeof schema.minItems === "number") assert.ok(items.length >= schema.minItems, `${path} violates minItems`)
    if (typeof schema.maxItems === "number") assert.ok(items.length <= schema.maxItems, `${path} violates maxItems`)
    if (schema.uniqueItems === true) {
      const encoded = items.map((item) => JSON.stringify(item))
      assert.equal(new Set(encoded).size, encoded.length, `${path} violates uniqueItems`)
    }
    if (schema.items !== undefined) {
      items.forEach((item, index) => validateSchema(schema.items, item, root, `${path}[${index}]`))
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

test("P4-R2 builds a deterministic critic disposition with canonical evidence-ref set semantics", () => {
  const envelope = p4R1Envelope()
  const first = buildP4CriticDisposition({
    declaration: declaration(envelope, { evidenceRefs: ["critic:evidence:b", "critic:evidence:a"] }),
    envelope,
  })
  const secondInput = {
    declaration: {
      evidenceRefs: ["critic:evidence:a", "critic:evidence:b"],
      rationale: "The cited exact-head evidence supports the bounded reviewer claim.",
      disposition: "SUPPORTED" as const,
      evaluatedHead: HEAD,
      criticPolicyIdentity: "fixture-critic-policy-v1",
      criticVersion: "1.0.0",
      criticId: "fixture-critic",
      p4R1EnvelopeIdentity: envelope.envelopeIdentity,
    },
    envelope,
  }
  const second = buildP4CriticDisposition(secondInput)

  assert.deepEqual(first, second)
  assert.equal(first.dispositionIdentity, second.dispositionIdentity)
  assert.deepEqual(first.evidenceRefs, ["critic:evidence:a", "critic:evidence:b"])
  assert.equal(first.p4R1EnvelopeIdentity, envelope.envelopeIdentity)
  assert.equal(first.p4R1EnvelopeVersion, envelope.version)
  assert.equal(first.sourceFindingIdentity, envelope.sourceFinding.findingIdentity)
  assert.equal(first.sourceReviewedHead, envelope.sourceFinding.review.reviewedHead)
  assert.equal(first.sourceEvaluatedHead, envelope.sourceFinding.evaluatedHead)
  assert.equal(first.evaluatedHead, envelope.sourceFinding.evaluatedHead)
})

test("P4-R2 accepts exactly the four authorized closed disposition states", () => {
  const envelope = p4R1Envelope()
  const seen = new Set<string>()
  for (const disposition of P4_R2_DISPOSITIONS) {
    const result = build({ disposition }, envelope)
    assert.equal(result.disposition, disposition)
    seen.add(result.dispositionIdentity)
  }
  assert.equal(seen.size, P4_R2_DISPOSITIONS.length)
  assert.throws(() => build({ disposition: "PROVEN" as P4CriticDispositionState }, envelope), /unsupported/)
})

test("P4-R2 identity changes for material semantic changes but not object-key or set order", () => {
  const envelope = p4R1Envelope()
  const baseline = build({}, envelope)
  assert.notEqual(build({ criticId: "different-critic" }, envelope).dispositionIdentity, baseline.dispositionIdentity)
  assert.notEqual(build({ criticVersion: "2.0.0" }, envelope).dispositionIdentity, baseline.dispositionIdentity)
  assert.notEqual(build({ criticPolicyIdentity: "other-policy" }, envelope).dispositionIdentity, baseline.dispositionIdentity)
  assert.notEqual(build({ disposition: "CONTRADICTED" }, envelope).dispositionIdentity, baseline.dispositionIdentity)
  assert.notEqual(build({ rationale: "A materially different rationale." }, envelope).dispositionIdentity, baseline.dispositionIdentity)
  assert.notEqual(build({ evidenceRefs: ["critic:evidence:c"] }, envelope).dispositionIdentity, baseline.dispositionIdentity)
})

test("P4-R2 detaches caller-owned data and deeply freezes the returned record", () => {
  const envelope = p4R1Envelope()
  const mutableDeclaration = declaration(envelope)
  const input = { envelope, declaration: mutableDeclaration }
  const result = buildP4CriticDisposition(input)
  const identityBeforeMutation = result.dispositionIdentity

  mutableDeclaration.rationale = "Caller mutation after build."
  mutableDeclaration.evidenceRefs[0] = "caller:mutated"

  assert.equal(result.rationale, "The cited exact-head evidence supports the bounded reviewer claim.")
  assert.deepEqual(result.evidenceRefs, ["critic:evidence:a", "critic:evidence:b"])
  assert.equal(result.dispositionIdentity, identityBeforeMutation)
  assert.ok(Object.isFrozen(result))
  assert.ok(Object.isFrozen(result.evidenceRefs))
  assert.throws(() => {
    ;(result.evidenceRefs as string[]).push("mutation")
  }, TypeError)
})

test("P4-R2 fails closed on exact P4-R1 envelope and evaluated-head mismatches", () => {
  const envelope = p4R1Envelope()
  assert.throws(
    () => build({ p4R1EnvelopeIdentity: "a".repeat(64) }, envelope),
    /must equal the exact validated P4-R1 envelope identity/,
  )
  assert.throws(() => build({ evaluatedHead: OTHER_HEAD }, envelope), /must equal the exact P4-R1 source evaluated head/)

  const valid = build({}, envelope)
  const tamperedBinding = { ...clone(valid), sourceReviewedHead: OTHER_HEAD }
  assert.throws(() => validateP4CriticDisposition(tamperedBinding, envelope), /must preserve the source reviewed head/)

  const otherEnvelope = p4R1Envelope()
  const otherAsRecord = clone(otherEnvelope) as unknown as UnknownRecord
  otherAsRecord.envelopeIdentity = "b".repeat(64)
  assert.throws(() => validateP4CriticDisposition(valid, otherAsRecord), /envelopeIdentity does not match canonical content/)
})

test("P4-R2 rejects unknown fields and authority-injection properties at every owned surface", () => {
  const envelope = p4R1Envelope()
  assert.throws(
    () => buildP4CriticDisposition({ envelope, declaration: declaration(envelope), mergeApproval: true }),
    /unknown property: mergeApproval/,
  )

  const injectedDeclaration = { ...declaration(envelope), PROVEN_READY: true }
  assert.throws(
    () => buildP4CriticDisposition({ envelope, declaration: injectedDeclaration }),
    /unknown property: PROVEN_READY/,
  )

  const valid = build({}, envelope)
  const injectedOutput = { ...clone(valid), remediationAuthorization: true }
  assert.throws(
    () => validateP4CriticDisposition(injectedOutput, envelope),
    /unknown property: remediationAuthorization/,
  )
})

test("P4-R2 rejects malformed, blank, duplicate, and over-limit declaration values", () => {
  const envelope = p4R1Envelope()
  assert.throws(() => build({ p4R1EnvelopeIdentity: "ABC" }, envelope), /sha256 identity/)
  assert.throws(() => build({ evaluatedHead: "ABC" }, envelope), /git commit identity/)
  assert.throws(() => build({ criticId: " " }, envelope), /non-blank/)
  assert.throws(() => build({ criticVersion: "" }, envelope), /non-blank/)
  assert.throws(() => build({ criticPolicyIdentity: " " }, envelope), /non-blank/)
  assert.throws(() => build({ rationale: "\n\t" }, envelope), /non-blank/)
  assert.throws(() => build({ evidenceRefs: [] }, envelope), /1\.\.32/)
  assert.throws(() => build({ evidenceRefs: ["duplicate", "duplicate"] }, envelope), /duplicate/)
  assert.throws(() => build({ evidenceRefs: Array.from({ length: 33 }, (_, index) => `ref:${index}`) }, envelope), /1\.\.32/)
  assert.throws(() => build({ rationale: "x".repeat(4097) }, envelope), /4096/)
  assert.throws(() => build({ evidenceRefs: ["x".repeat(1025)] }, envelope), /1024/)
})

test("P4-R2 hostile-structure checks reject accessors, symbols, non-enumerables, sparse arrays, cycles, and Proxy objects", () => {
  const envelope = p4R1Envelope()

  const accessorDeclaration = declaration(envelope) as unknown as UnknownRecord
  Object.defineProperty(accessorDeclaration, "rationale", {
    enumerable: true,
    configurable: true,
    get() {
      throw new Error("getter must not execute")
    },
  })
  assert.throws(
    () => buildP4CriticDisposition({ envelope, declaration: accessorDeclaration }),
    /enumerable data property/,
  )

  const symbolDeclaration = declaration(envelope) as unknown as Record<PropertyKey, unknown>
  symbolDeclaration[Symbol("mergeAuthority")] = true
  assert.throws(
    () => buildP4CriticDisposition({ envelope, declaration: symbolDeclaration }),
    /symbol properties/,
  )

  const hiddenDeclaration = declaration(envelope) as unknown as UnknownRecord
  Object.defineProperty(hiddenDeclaration, "hiddenAuthority", { value: true, enumerable: false })
  assert.throws(
    () => buildP4CriticDisposition({ envelope, declaration: hiddenDeclaration }),
    /enumerable data property/,
  )

  const sparseDeclaration = declaration(envelope)
  const sparseRefs = new Array<string>(2)
  sparseRefs[0] = "critic:evidence:a"
  sparseDeclaration.evidenceRefs = sparseRefs
  assert.throws(
    () => buildP4CriticDisposition({ envelope, declaration: sparseDeclaration }),
    /sparse array slots/,
  )

  const cyclicDeclaration = declaration(envelope) as unknown as UnknownRecord
  cyclicDeclaration.self = cyclicDeclaration
  assert.throws(
    () => buildP4CriticDisposition({ envelope, declaration: cyclicDeclaration }),
    /acyclic non-aliased/,
  )

  let proxyTrapExecutions = 0
  const proxyInput = new Proxy(
    { envelope, declaration: declaration(envelope) },
    {
      getPrototypeOf() {
        proxyTrapExecutions += 1
        throw new Error("Proxy trap must not execute")
      },
      ownKeys() {
        proxyTrapExecutions += 1
        throw new Error("Proxy trap must not execute")
      },
      getOwnPropertyDescriptor() {
        proxyTrapExecutions += 1
        throw new Error("Proxy trap must not execute")
      },
    },
  )
  assert.throws(
    () => buildP4CriticDisposition(proxyInput),
    /must not contain Proxy objects/,
  )
  assert.equal(proxyTrapExecutions, 0)

  const revoked = Proxy.revocable({ envelope, declaration: declaration(envelope) }, {})
  revoked.revoke()
  assert.throws(
    () => buildP4CriticDisposition(revoked.proxy),
    /must not contain Proxy objects/,
  )
})

test("P4-R2 validation rejects disposition identity drift and preserves exact canonical identity", () => {
  const envelope = p4R1Envelope()
  const valid = build({}, envelope)
  const rebuiltIdentity = identity(withoutDispositionIdentity(valid))
  assert.equal(valid.dispositionIdentity, rebuiltIdentity)
  assert.deepEqual(validateP4CriticDisposition(valid, envelope), valid)

  const tampered = clone(valid)
  tampered.rationale = "Changed after identity creation."
  assert.throws(() => validateP4CriticDisposition(tampered, envelope), /does not match canonical content/)
})

test("P4-R2 runtime and JSON Schema stay aligned for representable constraints", () => {
  const schema = JSON.parse(
    readFileSync(new URL("../../../schema/p4-critic-disposition.schema.json", import.meta.url), "utf8"),
  ) as UnknownRecord
  const envelope = p4R1Envelope()
  const valid = build({}, envelope)

  assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema")
  assert.equal(schema.additionalProperties, false)
  assert.equal(schemaAccepts(schema, valid), true)

  const extra = { ...clone(valid), mergeApproval: true }
  assert.equal(schemaAccepts(schema, extra), false)
  assert.throws(() => validateP4CriticDisposition(extra, envelope), /unknown property/)

  const unsupported = { ...clone(valid), disposition: "PROVEN" }
  assert.equal(schemaAccepts(schema, unsupported), false)
  assert.throws(() => validateP4CriticDisposition(unsupported, envelope), /unsupported/)

  const blankRationale = { ...clone(valid), rationale: " " }
  assert.equal(schemaAccepts(schema, blankRationale), false)
  assert.throws(() => validateP4CriticDisposition(blankRationale, envelope), /non-blank/)

  const duplicateRefs = { ...clone(valid), evidenceRefs: ["same", "same"] }
  assert.equal(schemaAccepts(schema, duplicateRefs), false)
  assert.throws(() => validateP4CriticDisposition(duplicateRefs, envelope), /duplicate/)

  const malformedSha = { ...clone(valid), sourceEvaluatedHead: "ABC" }
  assert.equal(schemaAccepts(schema, malformedSha), false)
  assert.throws(() => validateP4CriticDisposition(malformedSha, envelope), /git commit identity/)

  const crossFieldMismatch = { ...clone(valid), evaluatedHead: OTHER_HEAD }
  assert.equal(schemaAccepts(schema, crossFieldMismatch), true)
  assert.throws(
    () => validateP4CriticDisposition(crossFieldMismatch, envelope),
    /must equal criticDisposition.sourceEvaluatedHead/,
  )
})

test("P4-R2 production source has a pure deterministic import and authority surface", () => {
  const source = readFileSync(new URL("../src/reviewer-intelligence/p4-critic-disposition.ts", import.meta.url), "utf8")
  const imports = [...source.matchAll(/from\s+["']([^"']+)["']/g)].map((match) => match[1]).sort(compareStrings)
  assert.deepEqual(imports, ["./p4-claim-envelope.ts", "node:crypto", "node:util"])
  assert.doesNotMatch(source, /node:fs|node:child_process|node:http|node:https/)
  assert.doesNotMatch(source, /\bfetch\s*\(|\bprocess\.(?:spawn|exec)|\btelemetry\b|\bdatabase\b/i)
})

test("P4-R2 pins immutable P4-R1 and KRI predecessor bytes", () => {
  const pins = [
    {
      path: "../src/reviewer-intelligence/p4-claim-envelope.ts",
      sha: "e9a59acf25c05276dddf80e269be4ae03e5e6775",
    },
    {
      path: "../../../schema/p4-reviewer-claim-envelope.schema.json",
      sha: "121b2b7b0286a4b7dea0e92bb2642218fbb1a50e",
    },
    {
      path: "../src/reviewer-intelligence/contracts.ts",
      sha: "5ebe91c3d98f626651230989564d367d0600863c",
    },
  ] as const

  for (const pin of pins) {
    const bytes = readFileSync(new URL(pin.path, import.meta.url))
    assert.equal(gitBlobSha1(bytes), pin.sha, `${pin.path} predecessor bytes moved`)
  }
})

test("P4-R2 version and vocabulary are closed and do not imply truth or merge authority", () => {
  assert.equal(P4_R2_CRITIC_DISPOSITION_VERSION, "p4-r2-critic-disposition-v1")
  assert.deepEqual(P4_R2_DISPOSITIONS, [
    "SUPPORTED",
    "CONTRADICTED",
    "UNVERIFIED_CONCERN",
    "DUPLICATE_OR_SUPERSEDED",
  ])
})
