import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

import {
  P4_R1_CLAIM_ENVELOPE_VERSION,
  validateP4ReviewerClaimEnvelope,
  type P4ReviewerClaimEnvelope,
} from "./p4-claim-envelope.ts"

export const P4_R2_CRITIC_DISPOSITION_VERSION = "p4-r2-critic-disposition-v1" as const

export const P4_R2_DISPOSITIONS = [
  "SUPPORTED",
  "CONTRADICTED",
  "UNVERIFIED_CONCERN",
  "DUPLICATE_OR_SUPERSEDED",
] as const

export type P4CriticDispositionState = (typeof P4_R2_DISPOSITIONS)[number]

export interface P4CriticDispositionDeclaration {
  p4R1EnvelopeIdentity: string
  criticId: string
  criticVersion: string
  criticPolicyIdentity: string
  evaluatedHead: string
  disposition: P4CriticDispositionState
  rationale: string
  evidenceRefs: string[]
}

export interface P4CriticDisposition {
  version: typeof P4_R2_CRITIC_DISPOSITION_VERSION
  dispositionIdentity: string
  p4R1EnvelopeIdentity: string
  p4R1EnvelopeVersion: typeof P4_R1_CLAIM_ENVELOPE_VERSION
  sourceFindingIdentity: string
  sourceReviewedHead: string
  sourceEvaluatedHead: string
  criticId: string
  criticVersion: string
  criticPolicyIdentity: string
  evaluatedHead: string
  disposition: P4CriticDispositionState
  rationale: string
  evidenceRefs: string[]
}

export interface P4CriticDispositionBuildInput {
  envelope: P4ReviewerClaimEnvelope
  declaration: P4CriticDispositionDeclaration
}

type UnknownRecord = Record<string, unknown>

const SHA1_RE = /^[0-9a-f]{40}$/
const SHA256_RE = /^[0-9a-f]{64}$/
const MAX_SHORT = 128
const MAX_TEXT = 4096
const MAX_REFS = 32
const MAX_REF = 1024
const MAX_GRAPH_DEPTH = 32
const MAX_GRAPH_CONTAINERS = 4096
const MAX_ARRAY_LENGTH = 256
const MAX_OBJECT_KEYS = 128

const DISPOSITIONS = new Set<P4CriticDispositionState>(P4_R2_DISPOSITIONS)

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function fail(message: string): never {
  throw new Error(message)
}

function ownKeys(value: object, label: string): (string | symbol)[] {
  try {
    return Reflect.ownKeys(value)
  } catch {
    return fail(`${label} must expose a stable own-key set`)
  }
}

function ownDescriptor(value: object, key: string | symbol, label: string): PropertyDescriptor {
  try {
    const descriptor = Object.getOwnPropertyDescriptor(value, key)
    if (!descriptor) fail(`${label} has an unstable property descriptor`)
    return descriptor
  } catch {
    return fail(`${label} must expose stable data-property descriptors`)
  }
}

function prototypeOf(value: object, label: string): object | null {
  try {
    return Object.getPrototypeOf(value)
  } catch {
    return fail(`${label} must expose a stable prototype`)
  }
}

function assertJsonDataGraph(
  value: unknown,
  label: string,
  seen: WeakSet<object>,
  depth: number,
  budget: { containers: number },
): void {
  if (value === null || typeof value === "boolean") return
  if (typeof value === "string") {
    if (!hasAtMostCodePoints(value, MAX_TEXT)) fail(`${label} exceeds maximum string length ${MAX_TEXT} Unicode code points`)
    return
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) fail(`${label} must not contain non-finite numbers`)
    return
  }
  if (typeof value !== "object") fail(`${label} must contain JSON data only`)
  if (nodeTypes.isProxy(value)) fail(`${label} must not contain Proxy objects`)
  if (depth > MAX_GRAPH_DEPTH) fail(`${label} exceeds maximum object depth ${MAX_GRAPH_DEPTH}`)
  if (seen.has(value)) fail(`${label} must be an acyclic non-aliased JSON data graph`)
  seen.add(value)
  budget.containers += 1
  if (budget.containers > MAX_GRAPH_CONTAINERS) fail(`${label} exceeds maximum container count ${MAX_GRAPH_CONTAINERS}`)

  const proto = prototypeOf(value, label)

  if (Array.isArray(value)) {
    if (proto !== Array.prototype) fail(`${label} must use the ordinary Array prototype`)
    if (value.length > MAX_ARRAY_LENGTH) fail(`${label} exceeds maximum array length ${MAX_ARRAY_LENGTH}`)
    const keys = ownKeys(value, label)
    const expected = new Set<string>(["length"])
    for (let index = 0; index < value.length; index += 1) expected.add(String(index))
    for (const key of keys) {
      if (typeof key !== "string" || !expected.has(key)) fail(`${label} must not contain symbol, accessor, or extra array properties`)
    }
    if (keys.length !== expected.size) fail(`${label} must not contain sparse array slots`)
    for (let index = 0; index < value.length; index += 1) {
      const key = String(index)
      const descriptor = ownDescriptor(value, key, `${label}[${index}]`)
      if (!("value" in descriptor) || descriptor.enumerable !== true) fail(`${label}[${index}] must be an enumerable data property`)
      assertJsonDataGraph(descriptor.value, `${label}[${index}]`, seen, depth + 1, budget)
    }
    return
  }

  if (proto !== Object.prototype && proto !== null) fail(`${label} must be a plain object`)
  const keys = ownKeys(value, label)
  if (keys.length > MAX_OBJECT_KEYS) fail(`${label} exceeds maximum own-key count ${MAX_OBJECT_KEYS}`)
  for (const key of keys) {
    if (typeof key !== "string") fail(`${label} must not contain symbol properties`)
    if (!hasAtMostCodePoints(key, MAX_SHORT)) fail(`${label} has an over-limit property name`)
    const descriptor = ownDescriptor(value, key, `${label}.${key}`)
    if (!("value" in descriptor) || descriptor.enumerable !== true) {
      fail(`${label}.${key} must be an enumerable data property; accessors and non-enumerable properties are rejected`)
    }
    assertJsonDataGraph(descriptor.value, `${label}.${key}`, seen, depth + 1, budget)
  }
}

function snapshotJsonData<T>(value: T, label: string): T {
  assertJsonDataGraph(value, label, new WeakSet<object>(), 0, { containers: 0 })
  try {
    return structuredClone(value)
  } catch {
    return fail(`${label} must be structured-cloneable JSON data`)
  }
}

function plainObject(value: unknown, label: string): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) fail(`${label} must be a plain object`)
  const proto = Object.getPrototypeOf(value)
  if (proto !== Object.prototype && proto !== null) fail(`${label} must be a plain object`)
  return value as UnknownRecord
}

function exactKeys(record: UnknownRecord, required: readonly string[], label: string): void {
  const allowed = new Set(required)
  for (const key of Object.keys(record)) if (!allowed.has(key)) fail(`${label} has unknown property: ${key}`)
  for (const key of required) if (!Object.hasOwn(record, key)) fail(`${label} missing required property: ${key}`)
}

function hasAtMostCodePoints(value: string, max: number): boolean {
  let count = 0
  for (const _codePoint of value) {
    count += 1
    if (count > max) return false
  }
  return true
}

function boundedString(value: unknown, label: string, max: number): string {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    !hasAtMostCodePoints(value, max) ||
    !/\S/u.test(value)
  ) {
    fail(`${label} must be a non-blank string <= ${max} Unicode code points`)
  }
  return value
}

function gitSha(value: unknown, label: string): string {
  const text = boundedString(value, label, 40)
  if (!SHA1_RE.test(text)) fail(`${label} must be a lowercase 40-hex git commit identity`)
  return text
}

function sha256(value: unknown, label: string): string {
  const text = boundedString(value, label, 64)
  if (!SHA256_RE.test(text)) fail(`${label} must be a lowercase 64-hex sha256 identity`)
  return text
}

function stringSet(value: unknown, label: string): string[] {
  if (!Array.isArray(value) || value.length < 1 || value.length > MAX_REFS) {
    fail(`${label} must contain 1..${MAX_REFS} entries`)
  }
  const values = value.map((item, index) => boundedString(item, `${label}[${index}]`, MAX_REF))
  if (new Set(values).size !== values.length) fail(`${label} must not contain duplicate entries`)
  return [...values].sort(compareStrings)
}

function dispositionState(value: unknown, label: string): P4CriticDispositionState {
  const text = boundedString(value, label, 64) as P4CriticDispositionState
  if (!DISPOSITIONS.has(text)) fail(`${label} is unsupported`)
  return text
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

function canonicalText(value: unknown): string {
  return JSON.stringify(canonicalize(value))
}

function identity(value: unknown): string {
  return createHash("sha256").update(canonicalText(value), "utf8").digest("hex")
}

function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value)
    for (const child of Object.values(value as UnknownRecord)) deepFreeze(child)
  }
  return value
}

function declarationValue(value: unknown): P4CriticDispositionDeclaration {
  const record = plainObject(value, "declaration")
  exactKeys(
    record,
    [
      "p4R1EnvelopeIdentity",
      "criticId",
      "criticVersion",
      "criticPolicyIdentity",
      "evaluatedHead",
      "disposition",
      "rationale",
      "evidenceRefs",
    ],
    "declaration",
  )
  return {
    p4R1EnvelopeIdentity: sha256(record.p4R1EnvelopeIdentity, "declaration.p4R1EnvelopeIdentity"),
    criticId: boundedString(record.criticId, "declaration.criticId", MAX_SHORT),
    criticVersion: boundedString(record.criticVersion, "declaration.criticVersion", MAX_SHORT),
    criticPolicyIdentity: boundedString(record.criticPolicyIdentity, "declaration.criticPolicyIdentity", MAX_SHORT),
    evaluatedHead: gitSha(record.evaluatedHead, "declaration.evaluatedHead"),
    disposition: dispositionState(record.disposition, "declaration.disposition"),
    rationale: boundedString(record.rationale, "declaration.rationale", MAX_TEXT),
    evidenceRefs: stringSet(record.evidenceRefs, "declaration.evidenceRefs"),
  }
}

function withoutIdentityValue(record: UnknownRecord): Omit<P4CriticDisposition, "dispositionIdentity"> {
  if (record.version !== P4_R2_CRITIC_DISPOSITION_VERSION) fail("unsupported P4-R2 critic disposition version")
  if (record.p4R1EnvelopeVersion !== P4_R1_CLAIM_ENVELOPE_VERSION) fail("unsupported P4-R1 envelope version binding")
  return {
    version: P4_R2_CRITIC_DISPOSITION_VERSION,
    p4R1EnvelopeIdentity: sha256(record.p4R1EnvelopeIdentity, "criticDisposition.p4R1EnvelopeIdentity"),
    p4R1EnvelopeVersion: P4_R1_CLAIM_ENVELOPE_VERSION,
    sourceFindingIdentity: sha256(record.sourceFindingIdentity, "criticDisposition.sourceFindingIdentity"),
    sourceReviewedHead: gitSha(record.sourceReviewedHead, "criticDisposition.sourceReviewedHead"),
    sourceEvaluatedHead: gitSha(record.sourceEvaluatedHead, "criticDisposition.sourceEvaluatedHead"),
    criticId: boundedString(record.criticId, "criticDisposition.criticId", MAX_SHORT),
    criticVersion: boundedString(record.criticVersion, "criticDisposition.criticVersion", MAX_SHORT),
    criticPolicyIdentity: boundedString(record.criticPolicyIdentity, "criticDisposition.criticPolicyIdentity", MAX_SHORT),
    evaluatedHead: gitSha(record.evaluatedHead, "criticDisposition.evaluatedHead"),
    disposition: dispositionState(record.disposition, "criticDisposition.disposition"),
    rationale: boundedString(record.rationale, "criticDisposition.rationale", MAX_TEXT),
    evidenceRefs: stringSet(record.evidenceRefs, "criticDisposition.evidenceRefs"),
  }
}

function assertEnvelopeBindings(
  disposition: Omit<P4CriticDisposition, "dispositionIdentity">,
  envelope: P4ReviewerClaimEnvelope,
): void {
  if (disposition.p4R1EnvelopeIdentity !== envelope.envelopeIdentity) fail("critic disposition must bind the exact P4-R1 envelope identity")
  if (disposition.p4R1EnvelopeVersion !== envelope.version) fail("critic disposition must preserve the P4-R1 envelope version")
  if (disposition.sourceFindingIdentity !== envelope.sourceFinding.findingIdentity) fail("critic disposition must preserve the source finding identity")
  if (disposition.sourceReviewedHead !== envelope.sourceFinding.review.reviewedHead) fail("critic disposition must preserve the source reviewed head")
  if (disposition.sourceEvaluatedHead !== envelope.sourceFinding.evaluatedHead) fail("critic disposition must preserve the source evaluated head")
  if (disposition.evaluatedHead !== envelope.sourceFinding.evaluatedHead) {
    fail("critic disposition evaluatedHead must equal the exact P4-R1 source evaluated head")
  }
}

export function buildP4CriticDisposition(input: unknown): P4CriticDisposition {
  const snapshot = snapshotJsonData(input, "input")
  const record = plainObject(snapshot, "input")
  exactKeys(record, ["envelope", "declaration"], "input")

  const envelope = validateP4ReviewerClaimEnvelope(record.envelope)
  const declaration = declarationValue(record.declaration)
  if (declaration.p4R1EnvelopeIdentity !== envelope.envelopeIdentity) {
    fail("declaration.p4R1EnvelopeIdentity must equal the exact validated P4-R1 envelope identity")
  }
  if (declaration.evaluatedHead !== envelope.sourceFinding.evaluatedHead) {
    fail("declaration.evaluatedHead must equal the exact P4-R1 source evaluated head")
  }

  const withoutIdentity: Omit<P4CriticDisposition, "dispositionIdentity"> = {
    version: P4_R2_CRITIC_DISPOSITION_VERSION,
    p4R1EnvelopeIdentity: envelope.envelopeIdentity,
    p4R1EnvelopeVersion: envelope.version,
    sourceFindingIdentity: envelope.sourceFinding.findingIdentity,
    sourceReviewedHead: envelope.sourceFinding.review.reviewedHead,
    sourceEvaluatedHead: envelope.sourceFinding.evaluatedHead,
    criticId: declaration.criticId,
    criticVersion: declaration.criticVersion,
    criticPolicyIdentity: declaration.criticPolicyIdentity,
    evaluatedHead: declaration.evaluatedHead,
    disposition: declaration.disposition,
    rationale: declaration.rationale,
    evidenceRefs: declaration.evidenceRefs,
  }

  const candidate: P4CriticDisposition = {
    ...withoutIdentity,
    dispositionIdentity: identity(withoutIdentity),
  }
  return validateP4CriticDisposition(candidate, envelope)
}

export function validateP4CriticDisposition(input: unknown, expectedEnvelope: unknown): P4CriticDisposition {
  const snapshot = snapshotJsonData(input, "criticDisposition")
  const record = plainObject(snapshot, "criticDisposition")
  exactKeys(
    record,
    [
      "version",
      "dispositionIdentity",
      "p4R1EnvelopeIdentity",
      "p4R1EnvelopeVersion",
      "sourceFindingIdentity",
      "sourceReviewedHead",
      "sourceEvaluatedHead",
      "criticId",
      "criticVersion",
      "criticPolicyIdentity",
      "evaluatedHead",
      "disposition",
      "rationale",
      "evidenceRefs",
    ],
    "criticDisposition",
  )

  const envelopeSnapshot = snapshotJsonData(expectedEnvelope, "expectedEnvelope")
  const envelope = validateP4ReviewerClaimEnvelope(envelopeSnapshot)
  const withoutIdentity = withoutIdentityValue(record)
  if (withoutIdentity.evaluatedHead !== withoutIdentity.sourceEvaluatedHead) {
    fail("criticDisposition.evaluatedHead must equal criticDisposition.sourceEvaluatedHead")
  }
  assertEnvelopeBindings(withoutIdentity, envelope)

  const expectedIdentity = identity(withoutIdentity)
  if (sha256(record.dispositionIdentity, "criticDisposition.dispositionIdentity") !== expectedIdentity) {
    fail("criticDisposition.dispositionIdentity does not match canonical content")
  }

  return deepFreeze(structuredClone({ ...withoutIdentity, dispositionIdentity: expectedIdentity }))
}
