import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

import {
  canonicalK6R1Json,
  validateK6R1RouteRequest,
  type K6R1PrivacyClass,
  type K6R1RouteRequest,
} from "./contracts.ts"
import {
  validateK6R3RouteOutcomeLinkageEnvelope,
  type K6R3RouteOutcomeLinkageEnvelope,
} from "./outcome-linkage-contracts.ts"

const RECORD_VERSION = "kodac-k6-r4-outcome-record-v1" as const
const TOMBSTONE_VERSION = "kodac-k6-r4-outcome-tombstone-v1" as const
const MEMORY_VERSION = "kodac-k6-r4-outcome-memory-v1" as const
const OPERATION_VERSION = "kodac-k6-r4-outcome-memory-operation-v1" as const

const LIMITS = Object.freeze({
  maxDepth: 32,
  maxNodes: 100_000,
  maxTotalStringChars: 4_000_000,
  maxActiveRecords: 4_096,
  maxTombstones: 8_192,
  maxExecutionOutcomesPerRecord: 4_096,
  maxOwnerScopeIdBytes: 64,
  maxIdentityBytes: 64,
} as const)

const SHA256_PATTERN = /^[0-9a-f]{64}$/
const SHA256 = Object.freeze({
  test(value: string): boolean {
    validUnicodeScalars(value, "identity")
    if (Buffer.byteLength(value, "utf8") > LIMITS.maxIdentityBytes) {
      tooLarge("identity", `exceeds ${LIMITS.maxIdentityBytes} UTF-8 bytes`)
    }
    return SHA256_PATTERN.test(value)
  },
})
const GIT_SHA = /^[0-9a-f]{40}$/
const PRIVACY = new Set<string>(["PUBLIC", "REPOSITORY_PRIVATE", "SENSITIVE"])
const K5_STATUS = new Set<string>(["NOT_APPLICABLE", "VALID", "INCOMPLETE", "CONTRADICTORY", "STALE", "INVALID"])
const DONE_STATUS = new Set<string>(["PROVEN_READY", "NOT_READY"])
const EXECUTION_STATUS = new Set<string>(["success", "blocked", "failure"])
const STEP_ROLE = new Set<string>(["PRIMARY", "FALLBACK"])
const TOMBSTONE_TRANSITION = new Set<string>(["DELETED", "EXPIRED", "SUPERSEDED"])
const OPERATION_KIND = new Set<string>(["APPEND", "SUPERSEDE", "DELETE", "EXPIRE", "PURGE_TOMBSTONE"])

type K5Status = "NOT_APPLICABLE" | "VALID" | "INCOMPLETE" | "CONTRADICTORY" | "STALE" | "INVALID"
type DoneStatus = "PROVEN_READY" | "NOT_READY"
type ExecutionStatus = "success" | "blocked" | "failure"
type StepRole = "PRIMARY" | "FALLBACK"
type Transition = "DELETED" | "EXPIRED" | "SUPERSEDED"

interface Scope {
  readonly repositoryIdentity: string
  readonly ownerScopeId: string
  readonly privacyClass: K6R1PrivacyClass
}
interface Source {
  readonly routeOutcomeLinkageIdentity: string
  readonly routePlanIdentity: string
  readonly requestIdentity: string
  readonly revisionIdentity: string
  readonly taskIdentity: string
}
interface ExecutionOutcome {
  readonly planStepIndex: number
  readonly candidateIdentity: string
  readonly role: StepRole
  readonly executionResultStatus: ExecutionStatus
}
interface Outcome {
  readonly verificationPassed: boolean
  readonly k5ReconciliationIdentity: string
  readonly k5Status: K5Status
  readonly doneGateOutcomeIdentity: string
  readonly doneGateStatus: DoneStatus
  readonly executionOutcomes: readonly ExecutionOutcome[]
}
interface Lifecycle {
  readonly observedAtUnixMs: number
  readonly expiresAtUnixMs: number
  readonly supersedesRecordIdentity: string | null
}
interface OutcomeRecord {
  readonly version: typeof RECORD_VERSION
  readonly recordIdentity: string
  readonly scope: Scope
  readonly source: Source
  readonly outcome: Outcome
  readonly lifecycle: Lifecycle
}
interface Tombstone {
  readonly version: typeof TOMBSTONE_VERSION
  readonly tombstoneIdentity: string
  readonly scope: Scope
  readonly recordIdentity: string
  readonly taskIdentity: string
  readonly transition: Transition
  readonly transitionAtUnixMs: number
  readonly expiresAtUnixMs: number
  readonly replacementRecordIdentity: string | null
}
interface OutcomeMemory {
  readonly version: typeof MEMORY_VERSION
  readonly memoryIdentity: string
  readonly scope: Scope
  readonly records: readonly OutcomeRecord[]
  readonly tombstones: readonly Tombstone[]
}
interface AppendOperation {
  readonly version: typeof OPERATION_VERSION
  readonly kind: "APPEND"
  readonly ownerScopeId: string
  readonly observedAtUnixMs: number
  readonly expiresAtUnixMs: number
  readonly routeRequest: K6R1RouteRequest
  readonly routeOutcomeLinkageEnvelope: K6R3RouteOutcomeLinkageEnvelope
}
interface SupersedeOperation {
  readonly version: typeof OPERATION_VERSION
  readonly kind: "SUPERSEDE"
  readonly targetRecordIdentity: string
  readonly ownerScopeId: string
  readonly observedAtUnixMs: number
  readonly expiresAtUnixMs: number
  readonly tombstoneExpiresAtUnixMs: number
  readonly routeRequest: K6R1RouteRequest
  readonly routeOutcomeLinkageEnvelope: K6R3RouteOutcomeLinkageEnvelope
}
interface DeleteOperation {
  readonly version: typeof OPERATION_VERSION
  readonly kind: "DELETE"
  readonly targetRecordIdentity: string
  readonly transitionAtUnixMs: number
  readonly tombstoneExpiresAtUnixMs: number
}
interface ExpireOperation {
  readonly version: typeof OPERATION_VERSION
  readonly kind: "EXPIRE"
  readonly targetRecordIdentity: string
  readonly transitionAtUnixMs: number
  readonly tombstoneExpiresAtUnixMs: number
}
interface PurgeOperation {
  readonly version: typeof OPERATION_VERSION
  readonly kind: "PURGE_TOMBSTONE"
  readonly targetTombstoneIdentity: string
  readonly transitionAtUnixMs: number
}
type Operation = AppendOperation | SupersedeOperation | DeleteOperation | ExpireOperation | PurgeOperation
type Rec = Record<string, unknown>

interface GraphBudget {
  readonly active: WeakSet<object>
  nodes: number
  stringChars: number
}

const SCOPE_KEYS = ["repositoryIdentity", "ownerScopeId", "privacyClass"] as const
const SOURCE_KEYS = ["routeOutcomeLinkageIdentity", "routePlanIdentity", "requestIdentity", "revisionIdentity", "taskIdentity"] as const
const EXECUTION_KEYS = ["planStepIndex", "candidateIdentity", "role", "executionResultStatus"] as const
const OUTCOME_KEYS = ["verificationPassed", "k5ReconciliationIdentity", "k5Status", "doneGateOutcomeIdentity", "doneGateStatus", "executionOutcomes"] as const
const LIFECYCLE_KEYS = ["observedAtUnixMs", "expiresAtUnixMs", "supersedesRecordIdentity"] as const
const RECORD_KEYS = ["version", "recordIdentity", "scope", "source", "outcome", "lifecycle"] as const
const TOMBSTONE_KEYS = ["version", "tombstoneIdentity", "scope", "recordIdentity", "taskIdentity", "transition", "transitionAtUnixMs", "expiresAtUnixMs", "replacementRecordIdentity"] as const
const MEMORY_KEYS = ["version", "memoryIdentity", "scope", "records", "tombstones"] as const
const CANDIDATE_KEYS = ["candidateId", "candidateKind", "provider", "model"] as const
const APPEND_KEYS = ["version", "kind", "ownerScopeId", "observedAtUnixMs", "expiresAtUnixMs", "routeRequest", "routeOutcomeLinkageEnvelope"] as const
const SUPERSEDE_KEYS = ["version", "kind", "targetRecordIdentity", "ownerScopeId", "observedAtUnixMs", "expiresAtUnixMs", "tombstoneExpiresAtUnixMs", "routeRequest", "routeOutcomeLinkageEnvelope"] as const
const DELETE_KEYS = ["version", "kind", "targetRecordIdentity", "transitionAtUnixMs", "tombstoneExpiresAtUnixMs"] as const
const EXPIRE_KEYS = DELETE_KEYS
const PURGE_KEYS = ["version", "kind", "targetTombstoneIdentity", "transitionAtUnixMs"] as const

function bad(label: string, detail: string): never {
  throw new TypeError(`${label} ${detail}`)
}
function tooLarge(label: string, detail: string): never {
  throw new RangeError(`${label} ${detail}`)
}
function noProxy(value: unknown, label: string): void {
  if (typeof value === "object" && value !== null && utilTypes.isProxy(value)) bad(label, "must not be a Proxy")
}
function validUnicodeScalars(value: string, label: string): void {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index)
    if (code >= 0xd800 && code <= 0xdbff) {
      if (index + 1 >= value.length) bad(label, "must contain only valid Unicode scalar values")
      const next = value.charCodeAt(index + 1)
      if (next < 0xdc00 || next > 0xdfff) bad(label, "must contain only valid Unicode scalar values")
      index += 1
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      bad(label, "must contain only valid Unicode scalar values")
    }
  }
}
function graphBudget(): GraphBudget {
  return { active: new WeakSet<object>(), nodes: 0, stringChars: 0 }
}
function safeGraph(value: unknown, label: string, budget: GraphBudget, depth = 1): void {
  if (depth > LIMITS.maxDepth) tooLarge(label, `exceeds depth ${LIMITS.maxDepth}`)
  budget.nodes += 1
  if (budget.nodes > LIMITS.maxNodes) tooLarge(label, `exceeds node count ${LIMITS.maxNodes}`)
  if (value === null) return
  if (typeof value === "string") {
    validUnicodeScalars(value, label)
    budget.stringChars += value.length
    if (budget.stringChars > LIMITS.maxTotalStringChars) {
      tooLarge(label, `exceeds string-character budget ${LIMITS.maxTotalStringChars}`)
    }
    return
  }
  if (typeof value === "boolean") return
  if (typeof value === "number") {
    if (!Number.isSafeInteger(value) || Object.is(value, -0) || value < 0) bad(label, "must be a non-negative safe integer")
    return
  }
  if (typeof value !== "object") bad(label, "must contain JSON-compatible data only")
  noProxy(value, label)
  if (budget.active.has(value)) bad(label, "must not be cyclic")
  budget.active.add(value)
  try {
    if (Array.isArray(value)) {
      if (Object.getPrototypeOf(value) !== Array.prototype) bad(label, "must be a plain array")
      if (Object.getOwnPropertySymbols(value).length !== 0) bad(label, "must not contain symbol fields")
      const names = Object.getOwnPropertyNames(value)
      for (const key of names) {
        validUnicodeScalars(key, `${label} property name`)
        budget.stringChars += key.length
        if (budget.stringChars > LIMITS.maxTotalStringChars) {
          tooLarge(label, `exceeds string-character budget ${LIMITS.maxTotalStringChars}`)
        }
      }
      const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length")
      const length = lengthDescriptor && "value" in lengthDescriptor ? lengthDescriptor.value : undefined
      if (typeof length !== "number" || !Number.isSafeInteger(length) || Object.is(length, -0) || length < 0) {
        bad(label, "must have a valid data length")
      }
      for (let index = 0; index < length; index += 1) {
        const descriptor = Object.getOwnPropertyDescriptor(value, String(index))
        if (!descriptor) bad(label, "must be dense")
        if (!("value" in descriptor) || !descriptor.enumerable || descriptor.value === undefined) {
          bad(`${label}[${index}]`, "must be an enumerable defined data property")
        }
        safeGraph(descriptor.value, `${label}[${index}]`, budget, depth + 1)
      }
      if (names.length !== length + 1) bad(label, "contains unexpected array fields")
      return
    }
    const prototype = Object.getPrototypeOf(value)
    if (prototype !== Object.prototype && prototype !== null) bad(label, "must be a plain object")
    if (Object.getOwnPropertySymbols(value).length !== 0) bad(label, "must not contain symbol fields")
    for (const key of Object.getOwnPropertyNames(value)) {
      validUnicodeScalars(key, `${label} property name`)
      budget.stringChars += key.length
      if (budget.stringChars > LIMITS.maxTotalStringChars) {
        tooLarge(label, `exceeds string-character budget ${LIMITS.maxTotalStringChars}`)
      }
      const descriptor = Object.getOwnPropertyDescriptor(value, key)
      if (!descriptor || !("value" in descriptor) || !descriptor.enumerable || descriptor.value === undefined) {
        bad(`${label}.${key}`, "must be an enumerable defined data property")
      }
      safeGraph(descriptor.value, `${label}.${key}`, budget, depth + 1)
    }
  } finally {
    budget.active.delete(value)
  }
}
function data(value: object, key: string, label: string): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(value, key)
  if (!descriptor || !("value" in descriptor) || !descriptor.enumerable || descriptor.value === undefined) {
    bad(`${label}.${key}`, "must be an enumerable defined data property")
  }
  return descriptor.value
}
function plain(value: unknown, keys: readonly string[], label: string): Rec {
  noProxy(value, label)
  if (value === null || typeof value !== "object" || Array.isArray(value)) bad(label, "must be a plain object")
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) bad(label, "must be a plain object")
  if (Object.getOwnPropertySymbols(value).length !== 0) bad(label, "must not contain symbol fields")
  const names = Object.getOwnPropertyNames(value)
  if (names.length !== keys.length) bad(label, "has an invalid key set")
  const allowed = new Set(keys)
  const output = Object.create(null) as Rec
  for (const key of names) {
    if (!allowed.has(key)) bad(label, "contains an unknown field")
    output[key] = data(value, key, label)
  }
  for (const key of keys) if (!Object.hasOwn(output, key)) bad(label, `is missing required field: ${key}`)
  return output
}
function array(value: unknown, label: string, min: number, max: number): readonly unknown[] {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) bad(label, "must be a plain array")
  const length = value.length
  if (length < min || length > max) tooLarge(label, `must contain ${min} through ${max} entries`)
  return value
}
function exact<T extends string>(value: unknown, expected: T, label: string): T {
  if (value !== expected) bad(label, `must equal ${expected}`)
  return expected
}
function enumString<T extends string>(value: unknown, allowed: ReadonlySet<string>, label: string): T {
  if (typeof value !== "string" || !allowed.has(value)) bad(label, "is unsupported")
  return value as T
}
function boolean(value: unknown, label: string): boolean {
  if (typeof value !== "boolean") bad(label, "must be a boolean")
  return value
}
function timestamp(value: unknown, label: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || Object.is(value, -0) || value < 0) {
    bad(label, "must be a non-negative safe integer")
  }
  return value
}
function sha(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value) || Buffer.byteLength(value, "utf8") > LIMITS.maxIdentityBytes) {
    bad(label, "must be 64 lowercase hexadecimal characters")
  }
  return value
}
function ownerScope(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value) || Buffer.byteLength(value, "utf8") > LIMITS.maxOwnerScopeIdBytes) {
    bad(label, "must be 64 lowercase hexadecimal isolation data")
  }
  return value
}
function boundedText(value: unknown, label: string, maxBytes: number): string {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) bad(label, "must be a non-empty NUL-free string")
  validUnicodeScalars(value, label)
  if (Buffer.byteLength(value, "utf8") > maxBytes) tooLarge(label, `exceeds ${maxBytes} UTF-8 bytes`)
  return value
}
function nonNegativeIndex(value: unknown, label: string): number {
  return timestamp(value, label)
}
function digest(value: unknown): string {
  return createHash("sha256").update(canonicalK6R1Json(value), "utf8").digest("hex")
}
function sameScope(left: Scope, right: Scope): boolean {
  return left.repositoryIdentity === right.repositoryIdentity
    && left.ownerScopeId === right.ownerScopeId
    && left.privacyClass === right.privacyClass
}
function freezeDeep<T>(value: T): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    for (const key of Object.getOwnPropertyNames(value)) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key)
      if (descriptor && "value" in descriptor) freezeDeep(descriptor.value)
    }
    Object.freeze(value)
  }
  return value
}
function parseScope(value: unknown, label = "outcome memory scope"): Scope {
  const record = plain(value, SCOPE_KEYS, label)
  return freezeDeep({
    repositoryIdentity: sha(record.repositoryIdentity, `${label}.repositoryIdentity`),
    ownerScopeId: ownerScope(record.ownerScopeId, `${label}.ownerScopeId`),
    privacyClass: enumString<K6R1PrivacyClass>(record.privacyClass, PRIVACY, `${label}.privacyClass`),
  })
}
function parseSource(value: unknown, label: string): Source {
  const record = plain(value, SOURCE_KEYS, label)
  return freezeDeep({
    routeOutcomeLinkageIdentity: sha(record.routeOutcomeLinkageIdentity, `${label}.routeOutcomeLinkageIdentity`),
    routePlanIdentity: sha(record.routePlanIdentity, `${label}.routePlanIdentity`),
    requestIdentity: sha(record.requestIdentity, `${label}.requestIdentity`),
    revisionIdentity: sha(record.revisionIdentity, `${label}.revisionIdentity`),
    taskIdentity: sha(record.taskIdentity, `${label}.taskIdentity`),
  })
}
function parseExecution(value: unknown, label: string): ExecutionOutcome {
  const record = plain(value, EXECUTION_KEYS, label)
  return freezeDeep({
    planStepIndex: nonNegativeIndex(record.planStepIndex, `${label}.planStepIndex`),
    candidateIdentity: sha(record.candidateIdentity, `${label}.candidateIdentity`),
    role: enumString<StepRole>(record.role, STEP_ROLE, `${label}.role`),
    executionResultStatus: enumString<ExecutionStatus>(record.executionResultStatus, EXECUTION_STATUS, `${label}.executionResultStatus`),
  })
}
function parseOutcome(value: unknown, label: string): Outcome {
  const record = plain(value, OUTCOME_KEYS, label)
  const executionOutcomes = array(
    record.executionOutcomes,
    `${label}.executionOutcomes`,
    1,
    LIMITS.maxExecutionOutcomesPerRecord,
  ).map((item, index) => parseExecution(item, `${label}.executionOutcomes[${index}]`))
  return freezeDeep({
    verificationPassed: boolean(record.verificationPassed, `${label}.verificationPassed`),
    k5ReconciliationIdentity: sha(record.k5ReconciliationIdentity, `${label}.k5ReconciliationIdentity`),
    k5Status: enumString<K5Status>(record.k5Status, K5_STATUS, `${label}.k5Status`),
    doneGateOutcomeIdentity: sha(record.doneGateOutcomeIdentity, `${label}.doneGateOutcomeIdentity`),
    doneGateStatus: enumString<DoneStatus>(record.doneGateStatus, DONE_STATUS, `${label}.doneGateStatus`),
    executionOutcomes,
  })
}
function parseLifecycle(value: unknown, label: string): Lifecycle {
  const record = plain(value, LIFECYCLE_KEYS, label)
  const observedAtUnixMs = timestamp(record.observedAtUnixMs, `${label}.observedAtUnixMs`)
  const expiresAtUnixMs = timestamp(record.expiresAtUnixMs, `${label}.expiresAtUnixMs`)
  if (expiresAtUnixMs <= observedAtUnixMs) bad(`${label}.expiresAtUnixMs`, "must be greater than observedAtUnixMs")
  const supersedesRecordIdentity = record.supersedesRecordIdentity === null
    ? null
    : sha(record.supersedesRecordIdentity, `${label}.supersedesRecordIdentity`)
  return freezeDeep({ observedAtUnixMs, expiresAtUnixMs, supersedesRecordIdentity })
}
function recordIdentityInput(value: Omit<OutcomeRecord, "recordIdentity">): unknown {
  return {
    version: value.version,
    scope: value.scope,
    source: value.source,
    outcome: value.outcome,
    lifecycle: value.lifecycle,
  }
}
function parseRecord(value: unknown, label: string): OutcomeRecord {
  const record = plain(value, RECORD_KEYS, label)
  const parsedWithoutIdentity = {
    version: exact(record.version, RECORD_VERSION, `${label}.version`),
    scope: parseScope(record.scope, `${label}.scope`),
    source: parseSource(record.source, `${label}.source`),
    outcome: parseOutcome(record.outcome, `${label}.outcome`),
    lifecycle: parseLifecycle(record.lifecycle, `${label}.lifecycle`),
  } as const
  const recordIdentity = sha(record.recordIdentity, `${label}.recordIdentity`)
  const expected = digest(recordIdentityInput(parsedWithoutIdentity))
  if (recordIdentity !== expected) bad(`${label}.recordIdentity`, "does not match deterministic recomputation")
  return freezeDeep({ recordIdentity, ...parsedWithoutIdentity })
}
function tombstoneIdentityInput(value: Omit<Tombstone, "tombstoneIdentity">): unknown {
  return {
    version: value.version,
    scope: value.scope,
    recordIdentity: value.recordIdentity,
    taskIdentity: value.taskIdentity,
    transition: value.transition,
    transitionAtUnixMs: value.transitionAtUnixMs,
    expiresAtUnixMs: value.expiresAtUnixMs,
    replacementRecordIdentity: value.replacementRecordIdentity,
  }
}
function parseTombstone(value: unknown, label: string): Tombstone {
  const record = plain(value, TOMBSTONE_KEYS, label)
  const transition = enumString<Transition>(record.transition, TOMBSTONE_TRANSITION, `${label}.transition`)
  const transitionAtUnixMs = timestamp(record.transitionAtUnixMs, `${label}.transitionAtUnixMs`)
  const expiresAtUnixMs = timestamp(record.expiresAtUnixMs, `${label}.expiresAtUnixMs`)
  if (expiresAtUnixMs <= transitionAtUnixMs) bad(`${label}.expiresAtUnixMs`, "must be greater than transitionAtUnixMs")
  const replacementRecordIdentity = record.replacementRecordIdentity === null
    ? null
    : sha(record.replacementRecordIdentity, `${label}.replacementRecordIdentity`)
  if ((transition === "SUPERSEDED") !== (replacementRecordIdentity !== null)) {
    bad(`${label}.replacementRecordIdentity`, "must be non-null exactly for SUPERSEDED")
  }
  const withoutIdentity = {
    version: exact(record.version, TOMBSTONE_VERSION, `${label}.version`),
    scope: parseScope(record.scope, `${label}.scope`),
    recordIdentity: sha(record.recordIdentity, `${label}.recordIdentity`),
    taskIdentity: sha(record.taskIdentity, `${label}.taskIdentity`),
    transition,
    transitionAtUnixMs,
    expiresAtUnixMs,
    replacementRecordIdentity,
  } as const
  const tombstoneIdentity = sha(record.tombstoneIdentity, `${label}.tombstoneIdentity`)
  if (tombstoneIdentity !== digest(tombstoneIdentityInput(withoutIdentity))) {
    bad(`${label}.tombstoneIdentity`, "does not match deterministic recomputation")
  }
  return freezeDeep({ tombstoneIdentity, ...withoutIdentity })
}
function memoryIdentityInput(scope: Scope, records: readonly OutcomeRecord[], tombstones: readonly Tombstone[]): unknown {
  return {
    version: MEMORY_VERSION,
    scope,
    recordIdentities: records.map((record) => record.recordIdentity),
    tombstoneIdentities: tombstones.map((tombstone) => tombstone.tombstoneIdentity),
  }
}
function buildMemory(scope: Scope, recordsInput: readonly OutcomeRecord[], tombstonesInput: readonly Tombstone[]): OutcomeMemory {
  if (recordsInput.length > LIMITS.maxActiveRecords) tooLarge("outcome memory.records", `exceeds ${LIMITS.maxActiveRecords} active records`)
  if (tombstonesInput.length > LIMITS.maxTombstones) tooLarge("outcome memory.tombstones", `exceeds ${LIMITS.maxTombstones} tombstones`)
  const records = recordsInput.slice().sort((left, right) => left.recordIdentity < right.recordIdentity ? -1 : left.recordIdentity > right.recordIdentity ? 1 : 0)
  const tombstones = tombstonesInput.slice().sort((left, right) => left.tombstoneIdentity < right.tombstoneIdentity ? -1 : left.tombstoneIdentity > right.tombstoneIdentity ? 1 : 0)
  const memoryIdentity = digest(memoryIdentityInput(scope, records, tombstones))
  return freezeDeep({ version: MEMORY_VERSION, memoryIdentity, scope, records, tombstones })
}
function validateMemorySemantics(scope: Scope, records: readonly OutcomeRecord[], tombstones: readonly Tombstone[]): void {
  const recordIds = new Set<string>()
  const taskIds = new Set<string>()
  for (const record of records) {
    if (!sameScope(scope, record.scope)) bad("outcome memory.records", "contains a foreign scope")
    if (recordIds.has(record.recordIdentity)) bad("outcome memory.records", "contains duplicate recordIdentity")
    if (taskIds.has(record.source.taskIdentity)) bad("outcome memory.records", "contains duplicate active taskIdentity")
    recordIds.add(record.recordIdentity)
    taskIds.add(record.source.taskIdentity)
  }
  const tombstoneIds = new Set<string>()
  const removedRecordIds = new Set<string>()
  for (const tombstone of tombstones) {
    if (!sameScope(scope, tombstone.scope)) bad("outcome memory.tombstones", "contains a foreign scope")
    if (tombstoneIds.has(tombstone.tombstoneIdentity)) bad("outcome memory.tombstones", "contains duplicate tombstoneIdentity")
    if (removedRecordIds.has(tombstone.recordIdentity)) bad("outcome memory.tombstones", "contains duplicate removed recordIdentity")
    if (recordIds.has(tombstone.recordIdentity)) bad("outcome memory", "cannot keep one recordIdentity active and tombstoned")
    tombstoneIds.add(tombstone.tombstoneIdentity)
    removedRecordIds.add(tombstone.recordIdentity)
  }
}
function ensureCanonicalOrder(values: readonly string[], label: string): void {
  for (let index = 1; index < values.length; index += 1) {
    if ((values[index - 1] as string) >= (values[index] as string)) bad(label, "must use strict ascending identity order")
  }
}

export function deriveK6R4RepositoryIdentity(repositoryId: unknown): string {
  const repository = boundedText(repositoryId, "repositoryId", 512)
  return digest({ kind: "K6_R4_REPOSITORY", repositoryId: repository })
}

export function deriveK6R4RevisionIdentity(repositoryId: unknown, canonicalBase: unknown, candidateHead: unknown): string {
  const repository = boundedText(repositoryId, "repositoryId", 512)
  if (typeof canonicalBase !== "string" || !GIT_SHA.test(canonicalBase)) bad("canonicalBase", "must be 40 lowercase hexadecimal characters")
  if (typeof candidateHead !== "string" || !GIT_SHA.test(candidateHead)) bad("candidateHead", "must be 40 lowercase hexadecimal characters")
  return digest({ kind: "K6_R4_REVISION", repositoryId: repository, canonicalBase, candidateHead })
}

export function deriveK6R4TaskIdentity(taskId: unknown): string {
  const task = boundedText(taskId, "taskId", 256)
  return digest({ kind: "K6_R4_TASK", taskId: task })
}

export function deriveK6R4CandidateIdentity(candidateProjection: unknown): string {
  safeGraph(candidateProjection, "candidate projection", graphBudget())
  const record = plain(candidateProjection, CANDIDATE_KEYS, "candidate projection")
  const candidateId = boundedText(record.candidateId, "candidate projection.candidateId", 256)
  const candidateKind = exact(record.candidateKind, "MODEL_PROVIDER", "candidate projection.candidateKind")
  const provider = boundedText(record.provider, "candidate projection.provider", 256)
  const model = boundedText(record.model, "candidate projection.model", 512)
  return digest({ kind: "K6_R4_CANDIDATE", candidateId, candidateKind, provider, model })
}

export function createK6R4EmptyOutcomeMemory(scopeInput: unknown): OutcomeMemory {
  safeGraph(scopeInput, "outcome memory scope", graphBudget())
  return buildMemory(parseScope(scopeInput), [], [])
}

export function validateK6R4OutcomeMemory(value: unknown): OutcomeMemory {
  safeGraph(value, "outcome memory", graphBudget())
  const root = plain(value, MEMORY_KEYS, "outcome memory")
  exact(root.version, MEMORY_VERSION, "outcome memory.version")
  const memoryIdentity = sha(root.memoryIdentity, "outcome memory.memoryIdentity")
  const scope = parseScope(root.scope, "outcome memory.scope")
  const records = array(root.records, "outcome memory.records", 0, LIMITS.maxActiveRecords)
    .map((item, index) => parseRecord(item, `outcome memory.records[${index}]`))
  const tombstones = array(root.tombstones, "outcome memory.tombstones", 0, LIMITS.maxTombstones)
    .map((item, index) => parseTombstone(item, `outcome memory.tombstones[${index}]`))
  ensureCanonicalOrder(records.map((record) => record.recordIdentity), "outcome memory.records")
  ensureCanonicalOrder(tombstones.map((tombstone) => tombstone.tombstoneIdentity), "outcome memory.tombstones")
  validateMemorySemantics(scope, records, tombstones)
  const expected = digest(memoryIdentityInput(scope, records, tombstones))
  if (memoryIdentity !== expected) bad("outcome memory.memoryIdentity", "does not match deterministic recomputation")
  return freezeDeep({ version: MEMORY_VERSION, memoryIdentity, scope, records, tombstones })
}

function bindPredecessors(routeRequestValue: unknown, envelopeValue: unknown): {
  readonly routeRequest: K6R1RouteRequest
  readonly routeOutcomeLinkageEnvelope: K6R3RouteOutcomeLinkageEnvelope
} {
  const routeRequest = validateK6R1RouteRequest(routeRequestValue)
  const routeOutcomeLinkageEnvelope = validateK6R3RouteOutcomeLinkageEnvelope(envelopeValue)
  const linkage = routeOutcomeLinkageEnvelope.linkage
  if (routeRequest.requestIdentity !== linkage.requestIdentity) bad("routeRequest.requestIdentity", "must match route outcome linkage requestIdentity")
  if (routeRequest.repositoryId !== linkage.repositoryId) bad("routeRequest.repositoryId", "must match route outcome linkage repositoryId")
  if (routeRequest.canonicalBase !== linkage.canonicalBase) bad("routeRequest.canonicalBase", "must match route outcome linkage canonicalBase")
  if (routeRequest.candidateHead !== linkage.candidateHead) bad("routeRequest.candidateHead", "must match route outcome linkage candidateHead")
  if (routeRequest.taskId !== linkage.taskId) bad("routeRequest.taskId", "must match route outcome linkage taskId")
  return { routeRequest, routeOutcomeLinkageEnvelope }
}

export function validateK6R4OutcomeMemoryOperation(value: unknown): Operation {
  safeGraph(value, "outcome memory operation", graphBudget())
  noProxy(value, "outcome memory operation")
  if (value === null || typeof value !== "object" || Array.isArray(value)) bad("outcome memory operation", "must be a plain object")
  const kindValue = data(value, "kind", "outcome memory operation")
  const kind = enumString<"APPEND" | "SUPERSEDE" | "DELETE" | "EXPIRE" | "PURGE_TOMBSTONE">(
    kindValue,
    OPERATION_KIND,
    "outcome memory operation.kind",
  )
  if (kind === "APPEND") {
    const record = plain(value, APPEND_KEYS, "outcome memory operation")
    exact(record.version, OPERATION_VERSION, "outcome memory operation.version")
    const ownerScopeId = ownerScope(record.ownerScopeId, "outcome memory operation.ownerScopeId")
    const observedAtUnixMs = timestamp(record.observedAtUnixMs, "outcome memory operation.observedAtUnixMs")
    const expiresAtUnixMs = timestamp(record.expiresAtUnixMs, "outcome memory operation.expiresAtUnixMs")
    if (expiresAtUnixMs <= observedAtUnixMs) bad("outcome memory operation.expiresAtUnixMs", "must be greater than observedAtUnixMs")
    const bound = bindPredecessors(record.routeRequest, record.routeOutcomeLinkageEnvelope)
    return freezeDeep({ version: OPERATION_VERSION, kind, ownerScopeId, observedAtUnixMs, expiresAtUnixMs, ...bound })
  }
  if (kind === "SUPERSEDE") {
    const record = plain(value, SUPERSEDE_KEYS, "outcome memory operation")
    exact(record.version, OPERATION_VERSION, "outcome memory operation.version")
    const targetRecordIdentity = sha(record.targetRecordIdentity, "outcome memory operation.targetRecordIdentity")
    const ownerScopeId = ownerScope(record.ownerScopeId, "outcome memory operation.ownerScopeId")
    const observedAtUnixMs = timestamp(record.observedAtUnixMs, "outcome memory operation.observedAtUnixMs")
    const expiresAtUnixMs = timestamp(record.expiresAtUnixMs, "outcome memory operation.expiresAtUnixMs")
    const tombstoneExpiresAtUnixMs = timestamp(record.tombstoneExpiresAtUnixMs, "outcome memory operation.tombstoneExpiresAtUnixMs")
    if (expiresAtUnixMs <= observedAtUnixMs) bad("outcome memory operation.expiresAtUnixMs", "must be greater than observedAtUnixMs")
    if (tombstoneExpiresAtUnixMs <= observedAtUnixMs) bad("outcome memory operation.tombstoneExpiresAtUnixMs", "must be greater than observedAtUnixMs")
    const bound = bindPredecessors(record.routeRequest, record.routeOutcomeLinkageEnvelope)
    return freezeDeep({
      version: OPERATION_VERSION,
      kind,
      targetRecordIdentity,
      ownerScopeId,
      observedAtUnixMs,
      expiresAtUnixMs,
      tombstoneExpiresAtUnixMs,
      ...bound,
    })
  }
  if (kind === "DELETE" || kind === "EXPIRE") {
    const record = plain(value, kind === "DELETE" ? DELETE_KEYS : EXPIRE_KEYS, "outcome memory operation")
    exact(record.version, OPERATION_VERSION, "outcome memory operation.version")
    const targetRecordIdentity = sha(record.targetRecordIdentity, "outcome memory operation.targetRecordIdentity")
    const transitionAtUnixMs = timestamp(record.transitionAtUnixMs, "outcome memory operation.transitionAtUnixMs")
    const tombstoneExpiresAtUnixMs = timestamp(record.tombstoneExpiresAtUnixMs, "outcome memory operation.tombstoneExpiresAtUnixMs")
    if (tombstoneExpiresAtUnixMs <= transitionAtUnixMs) {
      bad("outcome memory operation.tombstoneExpiresAtUnixMs", "must be greater than transitionAtUnixMs")
    }
    return freezeDeep({ version: OPERATION_VERSION, kind, targetRecordIdentity, transitionAtUnixMs, tombstoneExpiresAtUnixMs })
  }
  const record = plain(value, PURGE_KEYS, "outcome memory operation")
  exact(record.version, OPERATION_VERSION, "outcome memory operation.version")
  return freezeDeep({
    version: OPERATION_VERSION,
    kind,
    targetTombstoneIdentity: sha(record.targetTombstoneIdentity, "outcome memory operation.targetTombstoneIdentity"),
    transitionAtUnixMs: timestamp(record.transitionAtUnixMs, "outcome memory operation.transitionAtUnixMs"),
  })
}

function derivedScope(routeRequest: K6R1RouteRequest, envelope: K6R3RouteOutcomeLinkageEnvelope, ownerScopeId: string): Scope {
  return freezeDeep({
    repositoryIdentity: deriveK6R4RepositoryIdentity(envelope.linkage.repositoryId),
    ownerScopeId,
    privacyClass: routeRequest.privacyClass,
  })
}
function materializeRecord(
  routeRequest: K6R1RouteRequest,
  envelope: K6R3RouteOutcomeLinkageEnvelope,
  ownerScopeId: string,
  observedAtUnixMs: number,
  expiresAtUnixMs: number,
  supersedesRecordIdentity: string | null,
): OutcomeRecord {
  const linkage = envelope.linkage
  const scope = derivedScope(routeRequest, envelope, ownerScopeId)
  const source = freezeDeep({
    routeOutcomeLinkageIdentity: linkage.linkageIdentity,
    routePlanIdentity: linkage.routePlanIdentity,
    requestIdentity: linkage.requestIdentity,
    revisionIdentity: deriveK6R4RevisionIdentity(linkage.repositoryId, linkage.canonicalBase, linkage.candidateHead),
    taskIdentity: deriveK6R4TaskIdentity(linkage.taskId),
  })
  const executionOutcomes = linkage.executionObservations.map((observation) => freezeDeep({
    planStepIndex: observation.planStepIndex,
    candidateIdentity: deriveK6R4CandidateIdentity({
      candidateId: observation.candidateId,
      candidateKind: observation.candidateKind,
      provider: observation.provider,
      model: observation.model,
    }),
    role: observation.role as StepRole,
    executionResultStatus: observation.executionResultStatus as ExecutionStatus,
  }))
  if (executionOutcomes.length > LIMITS.maxExecutionOutcomesPerRecord) {
    tooLarge("outcome record.outcome.executionOutcomes", `exceeds ${LIMITS.maxExecutionOutcomesPerRecord} entries`)
  }
  const outcome = freezeDeep({
    verificationPassed: linkage.verificationPassed,
    k5ReconciliationIdentity: linkage.k5ReconciliationIdentity,
    k5Status: linkage.k5Status as K5Status,
    doneGateOutcomeIdentity: linkage.doneGateOutcomeIdentity,
    doneGateStatus: linkage.doneGateStatus as DoneStatus,
    executionOutcomes,
  })
  const lifecycle = freezeDeep({ observedAtUnixMs, expiresAtUnixMs, supersedesRecordIdentity })
  const withoutIdentity = { version: RECORD_VERSION, scope, source, outcome, lifecycle } as const
  const recordIdentity = digest(recordIdentityInput(withoutIdentity))
  return freezeDeep({ version: RECORD_VERSION, recordIdentity, scope, source, outcome, lifecycle })
}
function createTombstone(
  target: OutcomeRecord,
  transition: Transition,
  transitionAtUnixMs: number,
  expiresAtUnixMs: number,
  replacementRecordIdentity: string | null,
): Tombstone {
  const withoutIdentity = {
    version: TOMBSTONE_VERSION,
    scope: target.scope,
    recordIdentity: target.recordIdentity,
    taskIdentity: target.source.taskIdentity,
    transition,
    transitionAtUnixMs,
    expiresAtUnixMs,
    replacementRecordIdentity,
  } as const
  return freezeDeep({
    tombstoneIdentity: digest(tombstoneIdentityInput(withoutIdentity)),
    ...withoutIdentity,
  })
}
function findRecord(memory: OutcomeMemory, identity: string, label: string): OutcomeRecord {
  const matches = memory.records.filter((record) => record.recordIdentity === identity)
  if (matches.length !== 1 || !matches[0]) bad(label, "must identify exactly one active record")
  return matches[0]
}
function findTombstone(memory: OutcomeMemory, identity: string, label: string): Tombstone {
  const matches = memory.tombstones.filter((tombstone) => tombstone.tombstoneIdentity === identity)
  if (matches.length !== 1 || !matches[0]) bad(label, "must identify exactly one tombstone")
  return matches[0]
}

export function applyK6R4OutcomeMemoryOperation(memoryValue: unknown, operationValue: unknown): OutcomeMemory {
  const memory = validateK6R4OutcomeMemory(memoryValue)
  const operation = validateK6R4OutcomeMemoryOperation(operationValue)

  if (operation.kind === "APPEND") {
    const candidate = materializeRecord(
      operation.routeRequest,
      operation.routeOutcomeLinkageEnvelope,
      operation.ownerScopeId,
      operation.observedAtUnixMs,
      operation.expiresAtUnixMs,
      null,
    )
    if (!sameScope(memory.scope, candidate.scope)) bad("APPEND", "derived repository/owner/privacy scope must equal memory scope")
    const existingIdentity = memory.records.find((record) => record.recordIdentity === candidate.recordIdentity)
    if (existingIdentity) return memory
    if (memory.records.some((record) => record.source.taskIdentity === candidate.source.taskIdentity)) {
      bad("APPEND", "conflicts with the active logical task; use SUPERSEDE")
    }
    if (memory.tombstones.some((tombstone) => tombstone.recordIdentity === candidate.recordIdentity)) {
      bad("APPEND", "exact record identity is protected by a retained tombstone")
    }
    if (memory.records.length >= LIMITS.maxActiveRecords) tooLarge("APPEND", `would exceed ${LIMITS.maxActiveRecords} active records`)
    return buildMemory(memory.scope, [...memory.records, candidate], memory.tombstones)
  }

  if (operation.kind === "SUPERSEDE") {
    const target = findRecord(memory, operation.targetRecordIdentity, "SUPERSEDE.targetRecordIdentity")
    if (operation.observedAtUnixMs < target.lifecycle.observedAtUnixMs) {
      bad("SUPERSEDE.observedAtUnixMs", "must be at or after the target observedAtUnixMs")
    }
    const replacement = materializeRecord(
      operation.routeRequest,
      operation.routeOutcomeLinkageEnvelope,
      operation.ownerScopeId,
      operation.observedAtUnixMs,
      operation.expiresAtUnixMs,
      target.recordIdentity,
    )
    if (!sameScope(target.scope, replacement.scope) || !sameScope(memory.scope, replacement.scope)) {
      bad("SUPERSEDE", "replacement scope must exactly equal target and memory scope")
    }
    if (target.source.taskIdentity !== replacement.source.taskIdentity) bad("SUPERSEDE", "replacement taskIdentity must equal target taskIdentity")
    if (target.recordIdentity === replacement.recordIdentity) bad("SUPERSEDE", "replacement identity must differ from target")
    if (memory.tombstones.some((tombstone) => tombstone.recordIdentity === replacement.recordIdentity)) {
      bad("SUPERSEDE", "replacement record identity is protected by a retained tombstone")
    }
    if (memory.tombstones.length >= LIMITS.maxTombstones) tooLarge("SUPERSEDE", `would exceed ${LIMITS.maxTombstones} tombstones`)
    const tombstone = createTombstone(
      target,
      "SUPERSEDED",
      operation.observedAtUnixMs,
      operation.tombstoneExpiresAtUnixMs,
      replacement.recordIdentity,
    )
    return buildMemory(
      memory.scope,
      [...memory.records.filter((record) => record.recordIdentity !== target.recordIdentity), replacement],
      [...memory.tombstones, tombstone],
    )
  }

  if (operation.kind === "DELETE" || operation.kind === "EXPIRE") {
    const target = findRecord(memory, operation.targetRecordIdentity, `${operation.kind}.targetRecordIdentity`)
    if (operation.kind === "DELETE" && operation.transitionAtUnixMs < target.lifecycle.observedAtUnixMs) {
      bad("DELETE.transitionAtUnixMs", "must be at or after target observedAtUnixMs")
    }
    if (operation.kind === "EXPIRE" && operation.transitionAtUnixMs < target.lifecycle.expiresAtUnixMs) {
      bad("EXPIRE.transitionAtUnixMs", "must be at or after target expiresAtUnixMs")
    }
    if (memory.tombstones.length >= LIMITS.maxTombstones) tooLarge(operation.kind, `would exceed ${LIMITS.maxTombstones} tombstones`)
    const tombstone = createTombstone(
      target,
      operation.kind === "DELETE" ? "DELETED" : "EXPIRED",
      operation.transitionAtUnixMs,
      operation.tombstoneExpiresAtUnixMs,
      null,
    )
    return buildMemory(
      memory.scope,
      memory.records.filter((record) => record.recordIdentity !== target.recordIdentity),
      [...memory.tombstones, tombstone],
    )
  }

  const target = findTombstone(memory, operation.targetTombstoneIdentity, "PURGE_TOMBSTONE.targetTombstoneIdentity")
  if (operation.transitionAtUnixMs < target.expiresAtUnixMs) {
    bad("PURGE_TOMBSTONE.transitionAtUnixMs", "must be at or after tombstone expiresAtUnixMs")
  }
  return buildMemory(
    memory.scope,
    memory.records,
    memory.tombstones.filter((tombstone) => tombstone.tombstoneIdentity !== target.tombstoneIdentity),
  )
}
