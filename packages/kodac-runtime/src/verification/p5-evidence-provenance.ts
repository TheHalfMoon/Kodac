import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

export const P5_R1_EVIDENCE_PROVENANCE_VERSION = "p5-r1-evidence-provenance-v1" as const
export const P5_R1_FRESHNESS_STATES = Object.freeze(["CURRENT", "STALE"] as const)

export const P5_R1_EVIDENCE_PROVENANCE_LIMITS = Object.freeze({
  maxSourceKindCodePoints: 128,
  maxSourceRefCodePoints: 1_024,
  maxRepositoryIdCodePoints: 512,
  maxProducerIdCodePoints: 512,
  maxProducerVersionCodePoints: 128,
} as const)

export type P5EvidenceFreshnessState = (typeof P5_R1_FRESHNESS_STATES)[number]

export interface P5EvidenceSourceBinding {
  readonly sourceKind: string
  readonly evidenceIdentity: string
  readonly sourceRef: string
  readonly sourceDigest: string
}

export interface P5EvidenceRevisionBinding {
  readonly repositoryId: string
  readonly canonicalBase: string
  readonly candidateHead: string
}

export interface P5EvidenceProducerBinding {
  readonly producerId: string
  readonly producerVersion: string
  readonly configurationIdentity: string
}

export interface P5EvidenceFreshnessBinding {
  readonly state: P5EvidenceFreshnessState
  readonly basisIdentity: string
}

export interface P5EvidenceProvenanceBinding {
  readonly version: typeof P5_R1_EVIDENCE_PROVENANCE_VERSION
  readonly bindingIdentity: string
  readonly source: P5EvidenceSourceBinding
  readonly revision: P5EvidenceRevisionBinding
  readonly producer: P5EvidenceProducerBinding
  readonly policyIdentity: string
  readonly scopeIdentity: string
  readonly inputIdentity: string
  readonly environmentIdentity: string
  readonly freshness: P5EvidenceFreshnessBinding
}

export type P5EvidenceProvenanceInput = Omit<P5EvidenceProvenanceBinding, "version" | "bindingIdentity">

type UnknownRecord = Record<string, unknown>

const GIT_SHA40 = /^[0-9a-f]{40}$/
const SHA256 = /^[0-9a-f]{64}$/
const SOURCE_KIND = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/
const FRESHNESS_STATES = new Set<string>(P5_R1_FRESHNESS_STATES)

const INPUT_KEYS = [
  "source",
  "revision",
  "producer",
  "policyIdentity",
  "scopeIdentity",
  "inputIdentity",
  "environmentIdentity",
  "freshness",
] as const
const BINDING_KEYS = ["version", "bindingIdentity", ...INPUT_KEYS] as const
const SOURCE_KEYS = ["sourceKind", "evidenceIdentity", "sourceRef", "sourceDigest"] as const
const REVISION_KEYS = ["repositoryId", "canonicalBase", "candidateHead"] as const
const PRODUCER_KEYS = ["producerId", "producerVersion", "configurationIdentity"] as const
const FRESHNESS_KEYS = ["state", "basisIdentity"] as const

function fail(label: string, detail: string): never {
  throw new TypeError(`${label} ${detail}`)
}

function codePointLength(value: string): number {
  let length = 0
  for (const _character of value) length += 1
  return length
}

function assertUnicodeScalars(value: string, label: string): void {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index)
    if (code >= 0xd800 && code <= 0xdbff) {
      if (index + 1 >= value.length) fail(label, "must contain only valid Unicode scalar values")
      const next = value.charCodeAt(index + 1)
      if (next < 0xdc00 || next > 0xdfff) fail(label, "must contain only valid Unicode scalar values")
      index += 1
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      fail(label, "must contain only valid Unicode scalar values")
    }
  }
}

function record(value: unknown, keys: readonly string[], label: string): UnknownRecord {
  if (typeof value !== "object" || value === null) fail(label, "must be a plain object")
  if (nodeTypes.isProxy(value)) fail(label, "must not be a Proxy")
  if (Array.isArray(value)) fail(label, "must be a plain object")

  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) fail(label, "must be a plain object")
  if (Object.getOwnPropertySymbols(value).length !== 0) fail(label, "must not contain symbol fields")

  const names = Object.getOwnPropertyNames(value)
  if (names.length !== keys.length) fail(label, "has an invalid key set")
  const allowed = new Set<string>(keys)
  const result = Object.create(null) as UnknownRecord

  for (const name of names) {
    assertUnicodeScalars(name, `${label} property name`)
    if (!allowed.has(name)) fail(label, `contains unknown field: ${name}`)
    const descriptor = Object.getOwnPropertyDescriptor(value, name)
    if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) {
      fail(`${label}.${name}`, "must be an enumerable data property")
    }
    result[name] = descriptor.value
  }

  for (const key of keys) {
    if (!Object.hasOwn(result, key)) fail(label, `is missing required field: ${key}`)
  }

  return result
}

function boundedText(value: unknown, label: string, maxCodePoints: number): string {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) {
    fail(label, "must be a non-empty NUL-free string")
  }
  assertUnicodeScalars(value, label)
  if (codePointLength(value) > maxCodePoints) fail(label, `exceeds ${maxCodePoints} Unicode code points`)
  return value
}

function sourceKind(value: unknown, label: string): string {
  const result = boundedText(value, label, P5_R1_EVIDENCE_PROVENANCE_LIMITS.maxSourceKindCodePoints)
  if (!SOURCE_KIND.test(result)) fail(label, "must be an inert ASCII identifier")
  return result
}

function gitSha(value: unknown, label: string): string {
  if (typeof value !== "string" || !GIT_SHA40.test(value)) {
    fail(label, "must be 40 lowercase hexadecimal characters")
  }
  return value
}

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) {
    fail(label, "must be 64 lowercase hexadecimal characters")
  }
  return value
}

function freshnessState(value: unknown, label: string): P5EvidenceFreshnessState {
  if (typeof value !== "string" || !FRESHNESS_STATES.has(value)) fail(label, "is unsupported")
  return value as P5EvidenceFreshnessState
}

function normalizeSource(value: unknown, label: string): P5EvidenceSourceBinding {
  const input = record(value, SOURCE_KEYS, label)
  return Object.freeze({
    sourceKind: sourceKind(input.sourceKind, `${label}.sourceKind`),
    evidenceIdentity: sha256(input.evidenceIdentity, `${label}.evidenceIdentity`),
    sourceRef: boundedText(input.sourceRef, `${label}.sourceRef`, P5_R1_EVIDENCE_PROVENANCE_LIMITS.maxSourceRefCodePoints),
    sourceDigest: sha256(input.sourceDigest, `${label}.sourceDigest`),
  })
}

function normalizeRevision(value: unknown, label: string): P5EvidenceRevisionBinding {
  const input = record(value, REVISION_KEYS, label)
  return Object.freeze({
    repositoryId: boundedText(input.repositoryId, `${label}.repositoryId`, P5_R1_EVIDENCE_PROVENANCE_LIMITS.maxRepositoryIdCodePoints),
    canonicalBase: gitSha(input.canonicalBase, `${label}.canonicalBase`),
    candidateHead: gitSha(input.candidateHead, `${label}.candidateHead`),
  })
}

function normalizeProducer(value: unknown, label: string): P5EvidenceProducerBinding {
  const input = record(value, PRODUCER_KEYS, label)
  return Object.freeze({
    producerId: boundedText(input.producerId, `${label}.producerId`, P5_R1_EVIDENCE_PROVENANCE_LIMITS.maxProducerIdCodePoints),
    producerVersion: boundedText(input.producerVersion, `${label}.producerVersion`, P5_R1_EVIDENCE_PROVENANCE_LIMITS.maxProducerVersionCodePoints),
    configurationIdentity: sha256(input.configurationIdentity, `${label}.configurationIdentity`),
  })
}

function normalizeFreshness(value: unknown, label: string): P5EvidenceFreshnessBinding {
  const input = record(value, FRESHNESS_KEYS, label)
  return Object.freeze({
    state: freshnessState(input.state, `${label}.state`),
    basisIdentity: sha256(input.basisIdentity, `${label}.basisIdentity`),
  })
}

interface P5EvidenceProvenancePreimage {
  readonly version: typeof P5_R1_EVIDENCE_PROVENANCE_VERSION
  readonly source: P5EvidenceSourceBinding
  readonly revision: P5EvidenceRevisionBinding
  readonly producer: P5EvidenceProducerBinding
  readonly policyIdentity: string
  readonly scopeIdentity: string
  readonly inputIdentity: string
  readonly environmentIdentity: string
  readonly freshness: P5EvidenceFreshnessBinding
}

function normalizeInput(value: unknown, label: string): P5EvidenceProvenancePreimage {
  const input = record(value, INPUT_KEYS, label)
  return Object.freeze({
    version: P5_R1_EVIDENCE_PROVENANCE_VERSION,
    source: normalizeSource(input.source, `${label}.source`),
    revision: normalizeRevision(input.revision, `${label}.revision`),
    producer: normalizeProducer(input.producer, `${label}.producer`),
    policyIdentity: sha256(input.policyIdentity, `${label}.policyIdentity`),
    scopeIdentity: sha256(input.scopeIdentity, `${label}.scopeIdentity`),
    inputIdentity: sha256(input.inputIdentity, `${label}.inputIdentity`),
    environmentIdentity: sha256(input.environmentIdentity, `${label}.environmentIdentity`),
    freshness: normalizeFreshness(input.freshness, `${label}.freshness`),
  })
}

function hashPreimage(preimage: P5EvidenceProvenancePreimage): string {
  return createHash("sha256").update(JSON.stringify(preimage), "utf8").digest("hex")
}

export function p5EvidenceProvenanceIdentity(input: P5EvidenceProvenanceInput): string {
  return hashPreimage(normalizeInput(input, "input"))
}

export function buildP5EvidenceProvenanceBinding(input: P5EvidenceProvenanceInput): P5EvidenceProvenanceBinding {
  const normalized = normalizeInput(input, "input")
  const binding = {
    version: P5_R1_EVIDENCE_PROVENANCE_VERSION,
    bindingIdentity: hashPreimage(normalized),
    source: normalized.source,
    revision: normalized.revision,
    producer: normalized.producer,
    policyIdentity: normalized.policyIdentity,
    scopeIdentity: normalized.scopeIdentity,
    inputIdentity: normalized.inputIdentity,
    environmentIdentity: normalized.environmentIdentity,
    freshness: normalized.freshness,
  } satisfies P5EvidenceProvenanceBinding

  return Object.freeze(binding)
}

export function validateP5EvidenceProvenanceBinding(value: unknown): P5EvidenceProvenanceBinding {
  const input = record(value, BINDING_KEYS, "binding")
  if (input.version !== P5_R1_EVIDENCE_PROVENANCE_VERSION) {
    fail("binding.version", `must equal ${P5_R1_EVIDENCE_PROVENANCE_VERSION}`)
  }

  const preimage = normalizeInput(
    {
      source: input.source,
      revision: input.revision,
      producer: input.producer,
      policyIdentity: input.policyIdentity,
      scopeIdentity: input.scopeIdentity,
      inputIdentity: input.inputIdentity,
      environmentIdentity: input.environmentIdentity,
      freshness: input.freshness,
    },
    "binding",
  )
  const actualIdentity = sha256(input.bindingIdentity, "binding.bindingIdentity")
  const expectedIdentity = hashPreimage(preimage)
  if (actualIdentity !== expectedIdentity) fail("binding.bindingIdentity", "does not match the canonical semantic content")

  return Object.freeze({
    version: P5_R1_EVIDENCE_PROVENANCE_VERSION,
    bindingIdentity: actualIdentity,
    source: preimage.source,
    revision: preimage.revision,
    producer: preimage.producer,
    policyIdentity: preimage.policyIdentity,
    scopeIdentity: preimage.scopeIdentity,
    inputIdentity: preimage.inputIdentity,
    environmentIdentity: preimage.environmentIdentity,
    freshness: preimage.freshness,
  })
}
