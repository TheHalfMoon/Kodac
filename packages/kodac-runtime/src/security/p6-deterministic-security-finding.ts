import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

import {
  validateP5EvidenceProvenanceBinding,
  type P5EvidenceProvenanceBinding,
} from "../verification/p5-evidence-provenance.ts"

export const P6_R1_DETERMINISTIC_SECURITY_FINDING_VERSION =
  "p6-r1-deterministic-security-finding-v1" as const
export const P6_R1_DETERMINISTIC_SECURITY_FINDING_ORIGIN = "DETERMINISTIC_ANALYZER" as const
export const P6_R1_SECURITY_LANES = Object.freeze([
  "STATIC_ANALYSIS",
  "DEPENDENCY_ANALYSIS",
  "SECRET_DETECTION",
  "SUPPLY_CHAIN_PROVENANCE",
  "CI_WORKFLOW_INTEGRITY",
] as const)
export const P6_R1_SECURITY_SEVERITIES = Object.freeze([
  "BLOCKER",
  "CRITICAL",
  "HIGH",
  "MEDIUM",
  "LOW",
  "INFO",
] as const)

export const P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS = Object.freeze({
  maxRuleIdCodePoints: 128,
  maxPathCodePoints: 1_024,
  maxReferenceIdCodePoints: 256,
  maxReferenceIds: 64,
  maxLine: 2_147_483_647,
  maxGraphDepth: 32,
  maxGraphContainers: 4_096,
  maxGraphArrayLength: 256,
  maxGraphObjectKeys: 128,
  maxGraphStringCodePoints: 4_096,
} as const)

export type P6SecurityLane = (typeof P6_R1_SECURITY_LANES)[number]
export type P6SecuritySeverity = (typeof P6_R1_SECURITY_SEVERITIES)[number]

export interface P6SecurityLocation {
  readonly path: string
  readonly startLine?: number
  readonly endLine?: number
}

export interface P6DeterministicSecurityFinding {
  readonly version: typeof P6_R1_DETERMINISTIC_SECURITY_FINDING_VERSION
  readonly findingIdentity: string
  readonly origin: typeof P6_R1_DETERMINISTIC_SECURITY_FINDING_ORIGIN
  readonly provenanceBinding: P5EvidenceProvenanceBinding
  readonly lane: P6SecurityLane
  readonly ruleId: string
  readonly severity: P6SecuritySeverity
  readonly location: P6SecurityLocation
  readonly nativeRecordDigest: string
  readonly fingerprint: string
  readonly referenceIds: readonly string[]
}

export type P6DeterministicSecurityFindingInput = Omit<
  P6DeterministicSecurityFinding,
  "version" | "findingIdentity"
>

type UnknownRecord = Record<string, unknown>

const SHA256 = /^[0-9a-f]{64}$/
const RULE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$/
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/u
const WINDOWS_DRIVE_PREFIX = /^[A-Za-z]:\//
const LANES = new Set<string>(P6_R1_SECURITY_LANES)
const SEVERITIES = new Set<string>(P6_R1_SECURITY_SEVERITIES)

const INPUT_KEYS = [
  "origin",
  "provenanceBinding",
  "lane",
  "ruleId",
  "severity",
  "location",
  "nativeRecordDigest",
  "fingerprint",
  "referenceIds",
] as const
const FINDING_KEYS = ["version", "findingIdentity", ...INPUT_KEYS] as const
const LOCATION_KEYS = ["path", "startLine", "endLine"] as const

function fail(label: string, detail: string): never {
  throw new TypeError(`${label} ${detail}`)
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
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

function ownKeys(value: object, label: string): (string | symbol)[] {
  try {
    return Reflect.ownKeys(value)
  } catch {
    return fail(label, "must expose a stable own-key set")
  }
}

function ownDescriptor(value: object, key: string | symbol, label: string): PropertyDescriptor {
  try {
    const descriptor = Object.getOwnPropertyDescriptor(value, key)
    if (descriptor === undefined) fail(label, "has an unstable property descriptor")
    return descriptor
  } catch {
    return fail(label, "must expose stable data-property descriptors")
  }
}

function prototypeOf(value: object, label: string): object | null {
  try {
    return Object.getPrototypeOf(value)
  } catch {
    return fail(label, "must expose a stable prototype")
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
    assertUnicodeScalars(value, label)
    if (codePointLength(value) > P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxGraphStringCodePoints) {
      fail(
        label,
        `exceeds ${P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxGraphStringCodePoints} Unicode code points`,
      )
    }
    return
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) fail(label, "must not contain non-finite numbers")
    return
  }

  if (typeof value !== "object") fail(label, "must contain JSON data only")
  if (nodeTypes.isProxy(value)) fail(label, "must not contain Proxy objects")
  if (depth > P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxGraphDepth) {
    fail(label, `exceeds maximum object depth ${P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxGraphDepth}`)
  }
  if (seen.has(value)) fail(label, "must be an acyclic non-aliased JSON data graph")
  seen.add(value)
  budget.containers += 1
  if (budget.containers > P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxGraphContainers) {
    fail(
      label,
      `exceeds maximum container count ${P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxGraphContainers}`,
    )
  }

  const prototype = prototypeOf(value, label)

  if (Array.isArray(value)) {
    if (prototype !== Array.prototype) fail(label, "must use the ordinary Array prototype")
    const lengthDescriptor = ownDescriptor(value, "length", `${label}.length`)
    if (!("value" in lengthDescriptor) || !Number.isSafeInteger(lengthDescriptor.value)) {
      fail(label, "must expose an ordinary array length")
    }
    const length = lengthDescriptor.value as number
    if (length > P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxGraphArrayLength) {
      fail(label, `exceeds maximum array length ${P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxGraphArrayLength}`)
    }

    const keys = ownKeys(value, label)
    const expected = new Set<string>(["length"])
    for (let index = 0; index < length; index += 1) expected.add(String(index))

    for (const key of keys) {
      if (typeof key !== "string" || !expected.has(key)) {
        fail(label, "must not contain symbol, accessor, or extra array properties")
      }
    }
    if (keys.length !== expected.size) fail(label, "must not contain sparse array slots")

    for (let index = 0; index < length; index += 1) {
      const descriptor = ownDescriptor(value, String(index), `${label}[${index}]`)
      if (!("value" in descriptor) || descriptor.enumerable !== true) {
        fail(`${label}[${index}]`, "must be an enumerable data property")
      }
      assertJsonDataGraph(descriptor.value, `${label}[${index}]`, seen, depth + 1, budget)
    }
    return
  }

  if (prototype !== Object.prototype && prototype !== null) fail(label, "must be a plain object")

  const keys = ownKeys(value, label)
  if (keys.length > P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxGraphObjectKeys) {
    fail(label, `exceeds maximum own-key count ${P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxGraphObjectKeys}`)
  }

  for (const key of keys) {
    if (typeof key !== "string") fail(label, "must not contain symbol properties")
    assertUnicodeScalars(key, `${label} property name`)
    if (codePointLength(key) > P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxRuleIdCodePoints) {
      fail(label, "contains an over-limit property name")
    }
    const descriptor = ownDescriptor(value, key, `${label}.${key}`)
    if (!("value" in descriptor) || descriptor.enumerable !== true) {
      fail(`${label}.${key}`, "must be an enumerable data property")
    }
    assertJsonDataGraph(descriptor.value, `${label}.${key}`, seen, depth + 1, budget)
  }
}

function snapshotJsonData<T>(value: T, label: string): T {
  assertJsonDataGraph(value, label, new WeakSet<object>(), 0, { containers: 0 })
  try {
    return structuredClone(value)
  } catch {
    return fail(label, "must be structured-cloneable JSON data")
  }
}

function record(
  value: unknown,
  allowedKeys: readonly string[],
  requiredKeys: readonly string[],
  label: string,
): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) fail(label, "must be a plain object")
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) fail(label, "must be a plain object")

  const allowed = new Set<string>(allowedKeys)
  const names = Object.keys(value)
  for (const name of names) if (!allowed.has(name)) fail(label, `contains unknown field: ${name}`)
  for (const name of requiredKeys) if (!Object.hasOwn(value, name)) fail(label, `is missing required field: ${name}`)
  return value as UnknownRecord
}

function boundedText(value: unknown, label: string, maxCodePoints: number): string {
  if (typeof value !== "string" || value.length === 0) fail(label, "must be a non-empty string")
  assertUnicodeScalars(value, label)
  if (codePointLength(value) > maxCodePoints) fail(label, `exceeds ${maxCodePoints} Unicode code points`)
  return value
}

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) {
    fail(label, "must be 64 lowercase hexadecimal characters")
  }
  return value
}

function origin(value: unknown, label: string): typeof P6_R1_DETERMINISTIC_SECURITY_FINDING_ORIGIN {
  if (value !== P6_R1_DETERMINISTIC_SECURITY_FINDING_ORIGIN) {
    fail(label, `must equal ${P6_R1_DETERMINISTIC_SECURITY_FINDING_ORIGIN}`)
  }
  return P6_R1_DETERMINISTIC_SECURITY_FINDING_ORIGIN
}

function lane(value: unknown, label: string): P6SecurityLane {
  if (typeof value !== "string" || !LANES.has(value)) fail(label, "is unsupported")
  return value as P6SecurityLane
}

function severity(value: unknown, label: string): P6SecuritySeverity {
  if (typeof value !== "string" || !SEVERITIES.has(value)) fail(label, "is unsupported")
  return value as P6SecuritySeverity
}

function ruleId(value: unknown, label: string): string {
  const result = boundedText(value, label, P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxRuleIdCodePoints)
  if (!RULE_ID.test(result)) fail(label, "must be a bounded inert ASCII identifier")
  return result
}

function repositoryPath(value: unknown, label: string): string {
  const result = boundedText(value, label, P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxPathCodePoints)
  if (CONTROL_CHARACTERS.test(result)) fail(label, "must not contain control characters")
  if (result.startsWith("/") || WINDOWS_DRIVE_PREFIX.test(result)) fail(label, "must be repository-relative")
  if (result.includes("\\")) fail(label, "must use POSIX separators")
  const segments = result.split("/")
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    fail(label, "must not contain empty, dot, or dot-dot path segments")
  }
  return result
}

function lineNumber(value: unknown, label: string): number {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < 1 ||
    value > P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxLine
  ) {
    fail(label, `must be an integer in 1..${P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxLine}`)
  }
  return value
}

function normalizeLocation(value: unknown, label: string): P6SecurityLocation {
  const input = record(value, LOCATION_KEYS, ["path"], label)
  const path = repositoryPath(input.path, `${label}.path`)
  const hasStartLine = Object.hasOwn(input, "startLine")
  const hasEndLine = Object.hasOwn(input, "endLine")
  if (hasStartLine !== hasEndLine) fail(label, "must contain both startLine and endLine when either is present")

  if (!hasStartLine) return Object.freeze({ path })

  const startLine = lineNumber(input.startLine, `${label}.startLine`)
  const endLine = lineNumber(input.endLine, `${label}.endLine`)
  if (startLine > endLine) fail(label, "must satisfy startLine <= endLine")
  return Object.freeze({ path, startLine, endLine })
}

function referenceId(value: unknown, label: string): string {
  const result = boundedText(
    value,
    label,
    P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxReferenceIdCodePoints,
  )
  if (CONTROL_CHARACTERS.test(result) || !/\S/u.test(result)) {
    fail(label, "must be a non-blank inert identifier without control characters")
  }
  return result
}

function normalizeReferenceIds(
  value: unknown,
  label: string,
  requireCanonicalOrder: boolean,
): readonly string[] {
  if (!Array.isArray(value)) fail(label, "must be an array")
  if (value.length > P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxReferenceIds) {
    fail(label, `must contain at most ${P6_R1_DETERMINISTIC_SECURITY_FINDING_LIMITS.maxReferenceIds} entries`)
  }

  const values = value.map((item, index) => referenceId(item, `${label}[${index}]`))
  if (new Set(values).size !== values.length) fail(label, "must not contain duplicate entries")
  const sorted = [...values].sort(compareStrings)

  if (requireCanonicalOrder && values.some((item, index) => item !== sorted[index])) {
    fail(label, "must be in canonical ascending order")
  }

  return Object.freeze(sorted)
}

interface P6DeterministicSecurityFindingPreimage {
  readonly version: typeof P6_R1_DETERMINISTIC_SECURITY_FINDING_VERSION
  readonly origin: typeof P6_R1_DETERMINISTIC_SECURITY_FINDING_ORIGIN
  readonly provenanceBinding: P5EvidenceProvenanceBinding
  readonly lane: P6SecurityLane
  readonly ruleId: string
  readonly severity: P6SecuritySeverity
  readonly location: P6SecurityLocation
  readonly nativeRecordDigest: string
  readonly fingerprint: string
  readonly referenceIds: readonly string[]
}

function normalizeInputFromSafeValue(
  value: unknown,
  label: string,
  requireCanonicalReferenceOrder: boolean,
): P6DeterministicSecurityFindingPreimage {
  const input = record(value, INPUT_KEYS, INPUT_KEYS, label)
  return Object.freeze({
    version: P6_R1_DETERMINISTIC_SECURITY_FINDING_VERSION,
    origin: origin(input.origin, `${label}.origin`),
    provenanceBinding: validateP5EvidenceProvenanceBinding(input.provenanceBinding),
    lane: lane(input.lane, `${label}.lane`),
    ruleId: ruleId(input.ruleId, `${label}.ruleId`),
    severity: severity(input.severity, `${label}.severity`),
    location: normalizeLocation(input.location, `${label}.location`),
    nativeRecordDigest: sha256(input.nativeRecordDigest, `${label}.nativeRecordDigest`),
    fingerprint: sha256(input.fingerprint, `${label}.fingerprint`),
    referenceIds: normalizeReferenceIds(
      input.referenceIds,
      `${label}.referenceIds`,
      requireCanonicalReferenceOrder,
    ),
  })
}

function normalizeInput(
  value: unknown,
  label: string,
  requireCanonicalReferenceOrder: boolean,
): P6DeterministicSecurityFindingPreimage {
  const snapshot = snapshotJsonData(value, label)
  return normalizeInputFromSafeValue(snapshot, label, requireCanonicalReferenceOrder)
}

function hashPreimage(preimage: P6DeterministicSecurityFindingPreimage): string {
  return createHash("sha256").update(JSON.stringify(preimage), "utf8").digest("hex")
}

export function p6DeterministicSecurityFindingIdentity(input: P6DeterministicSecurityFindingInput): string {
  return hashPreimage(normalizeInput(input, "input", false))
}

export function buildP6DeterministicSecurityFinding(
  input: P6DeterministicSecurityFindingInput,
): P6DeterministicSecurityFinding {
  const normalized = normalizeInput(input, "input", false)
  return Object.freeze({
    version: P6_R1_DETERMINISTIC_SECURITY_FINDING_VERSION,
    findingIdentity: hashPreimage(normalized),
    origin: normalized.origin,
    provenanceBinding: normalized.provenanceBinding,
    lane: normalized.lane,
    ruleId: normalized.ruleId,
    severity: normalized.severity,
    location: normalized.location,
    nativeRecordDigest: normalized.nativeRecordDigest,
    fingerprint: normalized.fingerprint,
    referenceIds: normalized.referenceIds,
  })
}

export function validateP6DeterministicSecurityFinding(value: unknown): P6DeterministicSecurityFinding {
  const snapshot = snapshotJsonData(value, "finding")
  const input = record(snapshot, FINDING_KEYS, FINDING_KEYS, "finding")
  if (input.version !== P6_R1_DETERMINISTIC_SECURITY_FINDING_VERSION) {
    fail("finding.version", `must equal ${P6_R1_DETERMINISTIC_SECURITY_FINDING_VERSION}`)
  }

  const normalized = normalizeInputFromSafeValue(
    {
      origin: input.origin,
      provenanceBinding: input.provenanceBinding,
      lane: input.lane,
      ruleId: input.ruleId,
      severity: input.severity,
      location: input.location,
      nativeRecordDigest: input.nativeRecordDigest,
      fingerprint: input.fingerprint,
      referenceIds: input.referenceIds,
    },
    "finding",
    true,
  )
  const actualIdentity = sha256(input.findingIdentity, "finding.findingIdentity")
  const expectedIdentity = hashPreimage(normalized)
  if (actualIdentity !== expectedIdentity) {
    fail("finding.findingIdentity", "does not match the canonical semantic content")
  }

  return Object.freeze({
    version: P6_R1_DETERMINISTIC_SECURITY_FINDING_VERSION,
    findingIdentity: actualIdentity,
    origin: normalized.origin,
    provenanceBinding: normalized.provenanceBinding,
    lane: normalized.lane,
    ruleId: normalized.ruleId,
    severity: normalized.severity,
    location: normalized.location,
    nativeRecordDigest: normalized.nativeRecordDigest,
    fingerprint: normalized.fingerprint,
    referenceIds: normalized.referenceIds,
  })
}
