import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

import {
  P5_R1_EVIDENCE_PROVENANCE_LIMITS,
  validateP5EvidenceProvenanceBinding,
  type P5EvidenceProvenanceBinding,
  type P5EvidenceRevisionBinding,
} from "./p5-evidence-provenance.ts"

export const P5_R2_EVIDENCE_RELATION_VERSION = "p5-r2-evidence-relation-v1" as const
export const P5_R2_EVIDENCE_RELATIONS = Object.freeze(["SUPPORTS", "CONTRADICTS", "SUPERSEDES"] as const)

export type P5EvidenceRelationKind = (typeof P5_R2_EVIDENCE_RELATIONS)[number]

export interface P5EvidenceRelationInput {
  readonly source: P5EvidenceProvenanceBinding
  readonly relation: P5EvidenceRelationKind
  readonly target: P5EvidenceProvenanceBinding
}

export interface P5EvidenceRelationEdge {
  readonly version: typeof P5_R2_EVIDENCE_RELATION_VERSION
  readonly relationIdentity: string
  readonly revision: P5EvidenceRevisionBinding
  readonly sourceBindingIdentity: string
  readonly relation: P5EvidenceRelationKind
  readonly targetBindingIdentity: string
}

type UnknownRecord = Record<string, unknown>

const GIT_SHA40 = /^[0-9a-f]{40}$/
const SHA256 = /^[0-9a-f]{64}$/
const RELATIONS = new Set<string>(P5_R2_EVIDENCE_RELATIONS)
const INPUT_KEYS = ["source", "relation", "target"] as const
const EDGE_KEYS = [
  "version",
  "relationIdentity",
  "revision",
  "sourceBindingIdentity",
  "relation",
  "targetBindingIdentity",
] as const
const REVISION_KEYS = ["repositoryId", "canonicalBase", "candidateHead"] as const

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

function relationKind(value: unknown, label: string): P5EvidenceRelationKind {
  if (typeof value !== "string" || !RELATIONS.has(value)) fail(label, "is unsupported")
  return value as P5EvidenceRelationKind
}

function normalizeRevision(value: unknown, label: string): P5EvidenceRevisionBinding {
  const input = record(value, REVISION_KEYS, label)
  return Object.freeze({
    repositoryId: boundedText(
      input.repositoryId,
      `${label}.repositoryId`,
      P5_R1_EVIDENCE_PROVENANCE_LIMITS.maxRepositoryIdCodePoints,
    ),
    canonicalBase: gitSha(input.canonicalBase, `${label}.canonicalBase`),
    candidateHead: gitSha(input.candidateHead, `${label}.candidateHead`),
  })
}

function sameRevision(left: P5EvidenceRevisionBinding, right: P5EvidenceRevisionBinding): boolean {
  return left.repositoryId === right.repositoryId
    && left.canonicalBase === right.canonicalBase
    && left.candidateHead === right.candidateHead
}

interface P5EvidenceRelationPreimage {
  readonly version: typeof P5_R2_EVIDENCE_RELATION_VERSION
  readonly revision: P5EvidenceRevisionBinding
  readonly sourceBindingIdentity: string
  readonly relation: P5EvidenceRelationKind
  readonly targetBindingIdentity: string
}

function hashPreimage(preimage: P5EvidenceRelationPreimage): string {
  return createHash("sha256").update(JSON.stringify(preimage), "utf8").digest("hex")
}

function normalizeBuilderInput(value: unknown, label: string): P5EvidenceRelationPreimage {
  const input = record(value, INPUT_KEYS, label)
  const source = validateP5EvidenceProvenanceBinding(input.source)
  const target = validateP5EvidenceProvenanceBinding(input.target)

  if (!sameRevision(source.revision, target.revision)) {
    fail(label, "source and target must bind the same repositoryId, canonicalBase, and candidateHead")
  }
  if (source.bindingIdentity === target.bindingIdentity) fail(label, "source and target binding identities must be distinct")

  return Object.freeze({
    version: P5_R2_EVIDENCE_RELATION_VERSION,
    revision: Object.freeze({ ...source.revision }),
    sourceBindingIdentity: source.bindingIdentity,
    relation: relationKind(input.relation, `${label}.relation`),
    targetBindingIdentity: target.bindingIdentity,
  })
}

function normalizeEdgeContent(value: unknown, label: string): P5EvidenceRelationPreimage {
  const input = record(value, EDGE_KEYS, label)
  if (input.version !== P5_R2_EVIDENCE_RELATION_VERSION) {
    fail(`${label}.version`, `must equal ${P5_R2_EVIDENCE_RELATION_VERSION}`)
  }

  const revision = normalizeRevision(input.revision, `${label}.revision`)
  const sourceBindingIdentity = sha256(input.sourceBindingIdentity, `${label}.sourceBindingIdentity`)
  const targetBindingIdentity = sha256(input.targetBindingIdentity, `${label}.targetBindingIdentity`)
  if (sourceBindingIdentity === targetBindingIdentity) {
    fail(label, "source and target binding identities must be distinct")
  }

  return Object.freeze({
    version: P5_R2_EVIDENCE_RELATION_VERSION,
    revision,
    sourceBindingIdentity,
    relation: relationKind(input.relation, `${label}.relation`),
    targetBindingIdentity,
  })
}

export function p5EvidenceRelationIdentity(input: P5EvidenceRelationInput): string {
  return hashPreimage(normalizeBuilderInput(input, "input"))
}

export function buildP5EvidenceRelationEdge(input: P5EvidenceRelationInput): P5EvidenceRelationEdge {
  const preimage = normalizeBuilderInput(input, "input")
  return Object.freeze({
    version: P5_R2_EVIDENCE_RELATION_VERSION,
    relationIdentity: hashPreimage(preimage),
    revision: preimage.revision,
    sourceBindingIdentity: preimage.sourceBindingIdentity,
    relation: preimage.relation,
    targetBindingIdentity: preimage.targetBindingIdentity,
  })
}

export function validateP5EvidenceRelationEdge(value: unknown): P5EvidenceRelationEdge {
  const input = record(value, EDGE_KEYS, "edge")
  const preimage = normalizeEdgeContent(input, "edge")
  const actualIdentity = sha256(input.relationIdentity, "edge.relationIdentity")
  const expectedIdentity = hashPreimage(preimage)
  if (actualIdentity !== expectedIdentity) fail("edge.relationIdentity", "does not match the canonical semantic content")

  return Object.freeze({
    version: P5_R2_EVIDENCE_RELATION_VERSION,
    relationIdentity: actualIdentity,
    revision: preimage.revision,
    sourceBindingIdentity: preimage.sourceBindingIdentity,
    relation: preimage.relation,
    targetBindingIdentity: preimage.targetBindingIdentity,
  })
}
