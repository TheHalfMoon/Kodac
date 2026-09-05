import { createHash } from "node:crypto"
import { types as nodeTypes } from "node:util"

import {
  validateP7PostApplyVerificationReportBinding,
  type P7VerificationReportEvidence,
} from "./p7-post-apply-verification-report-binding.ts"
import {
  validateP7VerificationCommandSuccessEvidenceBinding,
  type P7VerificationCommandSuccessEvidenceBinding,
  type P7VerificationCommandSuccessEvidenceBindingBuildInput,
} from "./p7-verification-command-success-evidence-binding.ts"

export const P7_R9_AGENT_COMPLETION_EVIDENCE_BINDING_VERSION =
  "p7-r9-agent-completion-evidence-binding-v1" as const
export const P7_R9_AGENT_COMPLETION_EVIDENCE_BOUND_STATE = "AGENT_COMPLETION_EVIDENCE_BOUND" as const
export const P7_R9_AGENT_COMPLETION_EVENT_PROTOCOL = "kodac.event" as const
export const P7_R9_AGENT_COMPLETION_EVENT_VERSION = 1 as const
export const P7_R9_AGENT_COMPLETION_EVENT_TYPE = "agent.loop.completed" as const

export const P7_R9_AGENT_COMPLETION_EVIDENCE_LIMITS = Object.freeze({
  maxSessionIdCodePoints: 256,
  maxSummaryCodePoints: 4_096,
  maxEvidenceRefCodePoints: 1_024,
  maxJsonNodes: 16_384,
  maxJsonDepth: 24,
} as const)

export interface P7AgentCompletionEvidenceBindingBuildInput {
  readonly sourceCommandSuccessEvidenceBinding: P7VerificationCommandSuccessEvidenceBinding
  readonly sourceCommandSuccessEvidenceBindingInput: P7VerificationCommandSuccessEvidenceBindingBuildInput
  readonly agentCompletionEvent: unknown
}

export interface P7AgentCompletionBudget {
  readonly turnsUsed: number
  readonly toolCallsUsed: number
  readonly failuresUsed: number
  readonly elapsedMs: number
}

export interface P7AgentCompletionEvidenceBinding {
  readonly version: typeof P7_R9_AGENT_COMPLETION_EVIDENCE_BINDING_VERSION
  readonly evidenceIdentity: string
  readonly state: typeof P7_R9_AGENT_COMPLETION_EVIDENCE_BOUND_STATE
  readonly sourceCommandSuccessEvidenceIdentity: string
  readonly sourceVerificationReportBindingIdentity: string
  readonly proposalIdentity: string
  readonly authorizationIdentity: string
  readonly intentBindingIdentity: string
  readonly appliedEvidenceIdentity: string
  readonly verificationPlanBindingIdentity: string
  readonly repositoryIdentity: string
  readonly canonicalBase: string
  readonly targetHead: string
  readonly postStateDigest: string
  readonly verificationPlanDigest: string
  readonly verificationReportIdentity: string
  readonly verificationSessionId: string
  readonly verificationStartedAt: string
  readonly verificationCompletedAt: string
  readonly agentCompletionCheckSummary: string
  readonly agentCompletionCheckEvidence: readonly P7VerificationReportEvidence[]
  readonly agentCompletionEventIdentity: string
  readonly agentCompletionEventProtocol: typeof P7_R9_AGENT_COMPLETION_EVENT_PROTOCOL
  readonly agentCompletionEventVersion: typeof P7_R9_AGENT_COMPLETION_EVENT_VERSION
  readonly agentCompletionEventId: string
  readonly agentCompletionEventSequence: number
  readonly agentCompletionEventEmittedAt: string
  readonly agentCompletionEventType: typeof P7_R9_AGENT_COMPLETION_EVENT_TYPE
  readonly agentCompletionReason: "completed"
  readonly agentCompletionBudget: P7AgentCompletionBudget
}

type UnknownRecord = Record<string, unknown>
type EvidenceCore = Omit<P7AgentCompletionEvidenceBinding, "evidenceIdentity">

type NormalizedCompletionEvent = Readonly<{
  protocol: typeof P7_R9_AGENT_COMPLETION_EVENT_PROTOCOL
  version: typeof P7_R9_AGENT_COMPLETION_EVENT_VERSION
  eventId: string
  sessionId: string
  sequence: number
  emittedAt: string
  type: typeof P7_R9_AGENT_COMPLETION_EVENT_TYPE
  payload: Readonly<{
    reason: "completed"
    budget: P7AgentCompletionBudget
  }>
}>

const SHA256 = /^[0-9a-f]{64}$/
const GIT_OBJECT = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const CANONICAL_TIMESTAMP = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$/
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/u

const BUILD_KEYS = [
  "sourceCommandSuccessEvidenceBinding",
  "sourceCommandSuccessEvidenceBindingInput",
  "agentCompletionEvent",
] as const
const EVENT_KEYS = ["protocol", "version", "eventId", "sessionId", "sequence", "emittedAt", "type", "payload"] as const
const PAYLOAD_KEYS = ["reason", "budget"] as const
const BUDGET_KEYS = ["turnsUsed", "toolCallsUsed", "failuresUsed", "elapsedMs"] as const
const EVIDENCE_KEYS = ["kind", "ref"] as const
const OUTPUT_KEYS = [
  "version",
  "evidenceIdentity",
  "state",
  "sourceCommandSuccessEvidenceIdentity",
  "sourceVerificationReportBindingIdentity",
  "proposalIdentity",
  "authorizationIdentity",
  "intentBindingIdentity",
  "appliedEvidenceIdentity",
  "verificationPlanBindingIdentity",
  "repositoryIdentity",
  "canonicalBase",
  "targetHead",
  "postStateDigest",
  "verificationPlanDigest",
  "verificationReportIdentity",
  "verificationSessionId",
  "verificationStartedAt",
  "verificationCompletedAt",
  "agentCompletionCheckSummary",
  "agentCompletionCheckEvidence",
  "agentCompletionEventIdentity",
  "agentCompletionEventProtocol",
  "agentCompletionEventVersion",
  "agentCompletionEventId",
  "agentCompletionEventSequence",
  "agentCompletionEventEmittedAt",
  "agentCompletionEventType",
  "agentCompletionReason",
  "agentCompletionBudget",
] as const

function fail(label: string, detail: string): never {
  throw new TypeError(`${label} ${detail}`)
}

function hashText(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
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
      const next = value.charCodeAt(index + 1)
      if (!(next >= 0xdc00 && next <= 0xdfff)) fail(label, "must contain only valid Unicode scalar values")
      index += 1
      continue
    }
    if (code >= 0xdc00 && code <= 0xdfff) fail(label, "must contain only valid Unicode scalar values")
  }
}

function unicodeText(value: unknown, label: string, maxCodePoints: number, allowControls = false): string {
  if (typeof value !== "string") fail(label, "must be a string")
  if (value.length === 0) fail(label, "must not be empty")
  assertUnicodeScalars(value, label)
  if (!allowControls && CONTROL_CHARACTERS.test(value)) fail(label, "must not contain control characters")
  if (codePointLength(value) > maxCodePoints) fail(label, `must contain at most ${maxCodePoints} code points`)
  return value
}

function sha256(value: unknown, label: string): string {
  const text = unicodeText(value, label, 64)
  if (!SHA256.test(text)) fail(label, "must be a lowercase SHA-256 digest")
  return text
}

function gitObject(value: unknown, label: string): string {
  const text = unicodeText(value, label, 64)
  if (!GIT_OBJECT.test(text)) fail(label, "must be a lowercase 40- or 64-hex Git object identity")
  return text
}

function canonicalTimestamp(value: unknown, label: string): string {
  const text = unicodeText(value, label, 24)
  if (!CANONICAL_TIMESTAMP.test(text)) fail(label, "must be a canonical UTC millisecond timestamp")
  const epoch = Date.parse(text)
  if (!Number.isFinite(epoch) || new Date(epoch).toISOString() !== text) {
    fail(label, "must be a valid canonical UTC millisecond timestamp")
  }
  return text
}

function uuidV4(value: unknown, label: string): string {
  const text = unicodeText(value, label, 36)
  if (!UUID_V4.test(text)) fail(label, "must be a canonical lowercase UUID v4")
  return text
}

function safeInteger(value: unknown, label: string, minimum: number): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < minimum) {
    fail(label, `must be a safe integer >= ${minimum}`)
  }
  return value
}

function ownDataRecord(
  value: unknown,
  allowedKeys: readonly string[],
  requiredKeys: readonly string[],
  label: string,
): UnknownRecord {
  if (value === null || typeof value !== "object" || Array.isArray(value) || nodeTypes.isProxy(value)) {
    fail(label, "must be a non-Proxy plain object")
  }
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) fail(label, "must be a plain object")
  if (Object.getOwnPropertySymbols(value).length !== 0) fail(label, "must not contain symbol fields")
  const record = value as UnknownRecord
  const keys = Object.keys(record)
  const allowed = new Set(allowedKeys)
  for (const key of keys) {
    if (!allowed.has(key)) fail(label, `contains unknown field: ${key}`)
    const descriptor = Object.getOwnPropertyDescriptor(record, key)
    if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
      fail(`${label}.${key}`, "must be an enumerable data property")
    }
  }
  for (const key of requiredKeys) {
    if (!Object.prototype.hasOwnProperty.call(record, key)) fail(label, `is missing required field: ${key}`)
  }
  return record
}

function denseArray(value: unknown, label: string, maximum: number): readonly unknown[] {
  if (!Array.isArray(value) || nodeTypes.isProxy(value)) fail(label, "must be a non-Proxy array")
  if (value.length > maximum) fail(label, `must contain at most ${maximum} items`)
  for (let index = 0; index < value.length; index += 1) {
    if (!Object.prototype.hasOwnProperty.call(value, index)) fail(label, "must not be sparse")
  }
  if (Object.getOwnPropertySymbols(value).length !== 0) fail(label, "must not contain symbol fields")
  return value
}

function assertSafeJsonGraph(value: unknown, label: string): void {
  const seen = new Set<object>()
  let nodes = 0

  const visit = (current: unknown, path: string, depth: number): void => {
    nodes += 1
    if (nodes > P7_R9_AGENT_COMPLETION_EVIDENCE_LIMITS.maxJsonNodes) fail(label, "exceeds the maximum JSON node count")
    if (depth > P7_R9_AGENT_COMPLETION_EVIDENCE_LIMITS.maxJsonDepth) fail(label, "exceeds the maximum JSON depth")
    if (current === null || typeof current === "boolean" || typeof current === "string") {
      if (typeof current === "string") assertUnicodeScalars(current, path)
      return
    }
    if (typeof current === "number") {
      if (!Number.isFinite(current)) fail(path, "must be a finite JSON number")
      return
    }
    if (typeof current !== "object") fail(path, "must be JSON-compatible data")
    if (nodeTypes.isProxy(current)) fail(path, "must not be a Proxy")
    if (seen.has(current)) fail(path, "must not contain aliases or cycles")
    seen.add(current)

    if (Array.isArray(current)) {
      denseArray(current, path, P7_R9_AGENT_COMPLETION_EVIDENCE_LIMITS.maxJsonNodes)
      for (let index = 0; index < current.length; index += 1) visit(current[index], `${path}[${index}]`, depth + 1)
      return
    }

    const prototype = Object.getPrototypeOf(current)
    if (prototype !== Object.prototype && prototype !== null) fail(path, "must be a plain object")
    if (Object.getOwnPropertySymbols(current).length !== 0) fail(path, "must not contain symbol fields")
    for (const key of Object.keys(current as UnknownRecord)) {
      const descriptor = Object.getOwnPropertyDescriptor(current, key)
      if (descriptor === undefined || !("value" in descriptor) || descriptor.enumerable !== true) {
        fail(`${path}.${key}`, "must be an enumerable data property")
      }
      visit(descriptor.value, `${path}.${key}`, depth + 1)
    }
  }

  visit(value, label, 0)
}

function canonicalize(value: unknown): unknown {
  if (value === null || typeof value !== "object") return value
  if (Array.isArray(value)) return value.map((item) => canonicalize(item))
  const record = value as UnknownRecord
  return Object.fromEntries(Object.keys(record).sort().map((key) => [key, canonicalize(record[key])]))
}

function canonicalJson(value: unknown): string {
  const serialized = JSON.stringify(canonicalize(value))
  if (serialized === undefined) fail("canonical value", "must be JSON serializable")
  return serialized
}

function deepFreeze<T>(value: T): T {
  if (value === null || typeof value !== "object" || Object.isFrozen(value)) return value
  for (const key of Object.keys(value as UnknownRecord)) {
    deepFreeze((value as UnknownRecord)[key])
  }
  return Object.freeze(value)
}

function normalizedAgentCheckEvidence(value: readonly P7VerificationReportEvidence[], expectedRef: string): readonly P7VerificationReportEvidence[] {
  const evidence = denseArray(value, "agent.completed.evidence", 1)
  if (evidence.length !== 1) fail("agent.completed.evidence", "must contain exactly one event evidence reference")
  const item = ownDataRecord(evidence[0], EVIDENCE_KEYS, EVIDENCE_KEYS, "agent.completed.evidence[0]")
  if (item.kind !== "event") fail("agent.completed.evidence[0].kind", "must equal event")
  const ref = unicodeText(
    item.ref,
    "agent.completed.evidence[0].ref",
    P7_R9_AGENT_COMPLETION_EVIDENCE_LIMITS.maxEvidenceRefCodePoints,
  )
  if (ref !== expectedRef) fail("agent.completed.evidence[0].ref", "must match the exact verification-session completion event reference")
  return Object.freeze([deepFreeze({ kind: "event" as const, ref })])
}

function normalizedCompletionEvent(value: unknown, expectedSessionId: string, verificationStartedAt: string): NormalizedCompletionEvent {
  assertSafeJsonGraph(value, "agentCompletionEvent")
  const event = ownDataRecord(value, EVENT_KEYS, EVENT_KEYS, "agentCompletionEvent")
  if (event.protocol !== P7_R9_AGENT_COMPLETION_EVENT_PROTOCOL) fail("agentCompletionEvent.protocol", "must equal kodac.event")
  if (event.version !== P7_R9_AGENT_COMPLETION_EVENT_VERSION) fail("agentCompletionEvent.version", "must equal 1")
  const eventId = uuidV4(event.eventId, "agentCompletionEvent.eventId")
  const sessionId = unicodeText(
    event.sessionId,
    "agentCompletionEvent.sessionId",
    P7_R9_AGENT_COMPLETION_EVIDENCE_LIMITS.maxSessionIdCodePoints,
  )
  if (sessionId !== expectedSessionId) fail("agentCompletionEvent.sessionId", "must equal the exact verification session id")
  const sequence = safeInteger(event.sequence, "agentCompletionEvent.sequence", 1)
  const emittedAt = canonicalTimestamp(event.emittedAt, "agentCompletionEvent.emittedAt")
  if (Date.parse(emittedAt) > Date.parse(verificationStartedAt)) {
    fail("agentCompletionEvent.emittedAt", "must not be later than the exact verification start")
  }
  if (event.type !== P7_R9_AGENT_COMPLETION_EVENT_TYPE) {
    fail("agentCompletionEvent.type", "must equal agent.loop.completed")
  }

  const payload = ownDataRecord(event.payload, PAYLOAD_KEYS, PAYLOAD_KEYS, "agentCompletionEvent.payload")
  if (payload.reason !== "completed") fail("agentCompletionEvent.payload.reason", "must equal completed")
  const budget = ownDataRecord(payload.budget, BUDGET_KEYS, BUDGET_KEYS, "agentCompletionEvent.payload.budget")
  const normalizedBudget = deepFreeze({
    turnsUsed: safeInteger(budget.turnsUsed, "agentCompletionEvent.payload.budget.turnsUsed", 1),
    toolCallsUsed: safeInteger(budget.toolCallsUsed, "agentCompletionEvent.payload.budget.toolCallsUsed", 0),
    failuresUsed: safeInteger(budget.failuresUsed, "agentCompletionEvent.payload.budget.failuresUsed", 0),
    elapsedMs: safeInteger(budget.elapsedMs, "agentCompletionEvent.payload.budget.elapsedMs", 0),
  })

  return deepFreeze({
    protocol: P7_R9_AGENT_COMPLETION_EVENT_PROTOCOL,
    version: P7_R9_AGENT_COMPLETION_EVENT_VERSION,
    eventId,
    sessionId,
    sequence,
    emittedAt,
    type: P7_R9_AGENT_COMPLETION_EVENT_TYPE,
    payload: deepFreeze({ reason: "completed" as const, budget: normalizedBudget }),
  })
}

function evidenceIdentity(core: EvidenceCore): string {
  return hashText(canonicalJson(core))
}

function normalizedBuildCore(value: unknown): EvidenceCore {
  const input = ownDataRecord(value, BUILD_KEYS, BUILD_KEYS, "agent-completion evidence build input")
  const sourceInput = input.sourceCommandSuccessEvidenceBindingInput as P7VerificationCommandSuccessEvidenceBindingBuildInput
  const source = validateP7VerificationCommandSuccessEvidenceBinding(
    input.sourceCommandSuccessEvidenceBinding,
    sourceInput,
  )

  const r6Input = sourceInput.sourceVerificationReportBindingInput
  const r6 = validateP7PostApplyVerificationReportBinding(sourceInput.sourceVerificationReportBinding, r6Input)
  if (r6.bindingIdentity !== source.sourceVerificationReportBindingIdentity) {
    fail("sourceCommandSuccessEvidenceBinding.sourceVerificationReportBindingIdentity", "must match the exact revalidated P7-R6 binding")
  }
  if (r6.verificationSessionId !== source.verificationSessionId) {
    fail("sourceCommandSuccessEvidenceBinding.verificationSessionId", "must match the exact revalidated P7-R6 verification session")
  }
  if (r6.verificationStartedAt !== source.verificationStartedAt || r6.verificationCompletedAt !== source.verificationCompletedAt) {
    fail("sourceCommandSuccessEvidenceBinding.verification interval", "must match the exact revalidated P7-R6 verification interval")
  }
  if (r6.verificationReportPassed !== true || r6.verificationReport.passed !== true) {
    fail("sourceVerificationReportBinding.verificationReportPassed", "must equal true")
  }

  const checks = r6.verificationReport.checks.filter((candidate) => candidate.id === "agent.completed")
  if (checks.length !== 1) fail("sourceVerificationReportBinding.verificationReport", "must contain exactly one agent.completed check")
  const check = checks[0]!
  if (check.category !== "agent") fail("agent.completed.category", "must equal agent")
  if (check.status !== "pass") fail("agent.completed.status", "must equal pass")
  const expectedRef = `session:${source.verificationSessionId}:agent.loop.completed`
  const checkEvidence = normalizedAgentCheckEvidence(check.evidence, expectedRef)
  const event = normalizedCompletionEvent(input.agentCompletionEvent, source.verificationSessionId, source.verificationStartedAt)

  return deepFreeze({
    version: P7_R9_AGENT_COMPLETION_EVIDENCE_BINDING_VERSION,
    state: P7_R9_AGENT_COMPLETION_EVIDENCE_BOUND_STATE,
    sourceCommandSuccessEvidenceIdentity: sha256(source.evidenceIdentity, "source.evidenceIdentity"),
    sourceVerificationReportBindingIdentity: sha256(source.sourceVerificationReportBindingIdentity, "source.sourceVerificationReportBindingIdentity"),
    proposalIdentity: sha256(source.proposalIdentity, "source.proposalIdentity"),
    authorizationIdentity: sha256(source.authorizationIdentity, "source.authorizationIdentity"),
    intentBindingIdentity: sha256(source.intentBindingIdentity, "source.intentBindingIdentity"),
    appliedEvidenceIdentity: sha256(source.appliedEvidenceIdentity, "source.appliedEvidenceIdentity"),
    verificationPlanBindingIdentity: sha256(source.verificationPlanBindingIdentity, "source.verificationPlanBindingIdentity"),
    repositoryIdentity: unicodeText(source.repositoryIdentity, "source.repositoryIdentity", 1_024),
    canonicalBase: gitObject(source.canonicalBase, "source.canonicalBase"),
    targetHead: gitObject(source.targetHead, "source.targetHead"),
    postStateDigest: sha256(source.postStateDigest, "source.postStateDigest"),
    verificationPlanDigest: sha256(source.verificationPlanDigest, "source.verificationPlanDigest"),
    verificationReportIdentity: sha256(source.verificationReportIdentity, "source.verificationReportIdentity"),
    verificationSessionId: unicodeText(
      source.verificationSessionId,
      "source.verificationSessionId",
      P7_R9_AGENT_COMPLETION_EVIDENCE_LIMITS.maxSessionIdCodePoints,
    ),
    verificationStartedAt: canonicalTimestamp(source.verificationStartedAt, "source.verificationStartedAt"),
    verificationCompletedAt: canonicalTimestamp(source.verificationCompletedAt, "source.verificationCompletedAt"),
    agentCompletionCheckSummary: unicodeText(
      check.summary,
      "agent.completed.summary",
      P7_R9_AGENT_COMPLETION_EVIDENCE_LIMITS.maxSummaryCodePoints,
    ),
    agentCompletionCheckEvidence: checkEvidence,
    agentCompletionEventIdentity: hashText(canonicalJson(event)),
    agentCompletionEventProtocol: event.protocol,
    agentCompletionEventVersion: event.version,
    agentCompletionEventId: event.eventId,
    agentCompletionEventSequence: event.sequence,
    agentCompletionEventEmittedAt: event.emittedAt,
    agentCompletionEventType: event.type,
    agentCompletionReason: event.payload.reason,
    agentCompletionBudget: event.payload.budget,
  })
}

export function p7AgentCompletionEvidenceBindingIdentity(input: P7AgentCompletionEvidenceBindingBuildInput): string {
  return evidenceIdentity(normalizedBuildCore(input))
}

export function buildP7AgentCompletionEvidenceBinding(
  input: P7AgentCompletionEvidenceBindingBuildInput,
): P7AgentCompletionEvidenceBinding {
  const core = normalizedBuildCore(input)
  return deepFreeze({ ...core, evidenceIdentity: evidenceIdentity(core) })
}

export function validateP7AgentCompletionEvidenceBinding(
  value: unknown,
  input: P7AgentCompletionEvidenceBindingBuildInput,
): P7AgentCompletionEvidenceBinding {
  assertSafeJsonGraph(value, "agent-completion evidence binding")
  const record = ownDataRecord(value, OUTPUT_KEYS, OUTPUT_KEYS, "agent-completion evidence binding")
  const expected = buildP7AgentCompletionEvidenceBinding(input)
  const claimedIdentity = sha256(record.evidenceIdentity, "agent-completion evidence binding.evidenceIdentity")
  if (claimedIdentity !== expected.evidenceIdentity) {
    fail("agent-completion evidence binding.evidenceIdentity", "does not match the canonical source-derived preimage")
  }

  const withoutIdentity: UnknownRecord = {}
  const expectedWithoutIdentity: UnknownRecord = {}
  for (const key of OUTPUT_KEYS) {
    if (key === "evidenceIdentity") continue
    withoutIdentity[key] = record[key]
    expectedWithoutIdentity[key] = expected[key]
  }
  if (canonicalJson(withoutIdentity) !== canonicalJson(expectedWithoutIdentity)) {
    fail("agent-completion evidence binding", "does not match canonical source-derived semantics")
  }
  return expected
}
