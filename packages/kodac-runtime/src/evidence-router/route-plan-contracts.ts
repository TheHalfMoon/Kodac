import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

import {
  K6_R1_LIMITS,
  canonicalK6R1Json,
  validateK6R1RouteEligibilityResult,
  type K6R1CandidateEligibilityResult,
  type K6R1RouteEligibilityResult,
} from "./contracts.ts"

export const K6_R2_ROUTE_PLAN_REQUEST_VERSION = "kodac-k6-r2-route-plan-request-v1" as const
export const K6_R2_ROUTE_PLAN_VERSION = "kodac-k6-r2-route-plan-v1" as const
export const K6_R2_ORDERING_BASIS = "CALLER_EXPLICIT_ORDER" as const

export const K6_R2_PLAN_STATUSES = Object.freeze(["ROUTABLE", "NO_ELIGIBLE_CANDIDATE"] as const)
export const K6_R2_STEP_ROLES = Object.freeze(["PRIMARY", "FALLBACK"] as const)

export const K6_R2_LIMITS = Object.freeze({
  maxCanonicalDepth: K6_R1_LIMITS.maxCanonicalDepth,
  maxCanonicalNodes: K6_R1_LIMITS.maxCanonicalNodes,
  maxOrderedEligibleCandidates: K6_R1_LIMITS.maxCandidates,
  maxCandidateIdBytes: K6_R1_LIMITS.maxCandidateIdBytes,
  maxProviderBytes: K6_R1_LIMITS.maxProviderBytes,
  maxModelBytes: K6_R1_LIMITS.maxModelBytes,
} as const)

export type K6R2PlanStatus = typeof K6_R2_PLAN_STATUSES[number]
export type K6R2StepRole = typeof K6_R2_STEP_ROLES[number]

export interface K6R2RoutePlanRequestIdentityInput {
  readonly version: typeof K6_R2_ROUTE_PLAN_REQUEST_VERSION
  readonly orderingBasis: typeof K6_R2_ORDERING_BASIS
  readonly eligibilityResult: K6R1RouteEligibilityResult
  readonly orderedEligibleCandidateIds: readonly string[]
}

export interface K6R2RoutePlanRequest extends K6R2RoutePlanRequestIdentityInput {
  readonly planRequestIdentity: string
}

export interface K6R2RoutePlanStep {
  readonly candidateId: string
  readonly candidateKind: "MODEL_PROVIDER"
  readonly provider: string
  readonly model: string
  readonly role: K6R2StepRole
  readonly qualificationReportDigest: string
}

export interface K6R2RoutePlanIdentityInput {
  readonly version: typeof K6_R2_ROUTE_PLAN_VERSION
  readonly planRequestIdentity: string
  readonly orderingBasis: typeof K6_R2_ORDERING_BASIS
  readonly eligibilityResultIdentity: string
  readonly requestIdentity: string
  readonly repositoryId: string
  readonly canonicalBase: string
  readonly candidateHead: string
  readonly taskId: string
  readonly status: K6R2PlanStatus
  readonly steps: readonly K6R2RoutePlanStep[]
}

export interface K6R2RoutePlan extends K6R2RoutePlanIdentityInput {
  readonly planIdentity: string
}

type UnknownRecord = Record<string, unknown>

interface ValidationContext {
  readonly active: WeakSet<object>
  nodes: number
}

const SHA256 = /^[0-9a-f]{64}$/
const GIT_SHA = /^[0-9a-f]{40}$/
const PLAN_STATUS_SET = new Set<string>(K6_R2_PLAN_STATUSES)
const STEP_ROLE_SET = new Set<string>(K6_R2_STEP_ROLES)

const REQUEST_IDENTITY_INPUT_KEYS = [
  "version",
  "orderingBasis",
  "eligibilityResult",
  "orderedEligibleCandidateIds",
] as const
const REQUEST_KEYS = [
  "version",
  "planRequestIdentity",
  "orderingBasis",
  "eligibilityResult",
  "orderedEligibleCandidateIds",
] as const
const PLAN_IDENTITY_INPUT_KEYS = [
  "version",
  "planRequestIdentity",
  "orderingBasis",
  "eligibilityResultIdentity",
  "requestIdentity",
  "repositoryId",
  "canonicalBase",
  "candidateHead",
  "taskId",
  "status",
  "steps",
] as const
const PLAN_KEYS = [
  "version",
  "planIdentity",
  "planRequestIdentity",
  "orderingBasis",
  "eligibilityResultIdentity",
  "requestIdentity",
  "repositoryId",
  "canonicalBase",
  "candidateHead",
  "taskId",
  "status",
  "steps",
] as const
const STEP_KEYS = [
  "candidateId",
  "candidateKind",
  "provider",
  "model",
  "role",
  "qualificationReportDigest",
] as const

function typeError(label: string, detail: string): never {
  throw new TypeError(`${label} ${detail}`)
}

function rangeError(label: string, detail: string): never {
  throw new RangeError(`${label} ${detail}`)
}

function assertNoProxy(value: unknown, label: string): void {
  if (typeof value === "object" && value !== null && utilTypes.isProxy(value)) {
    typeError(label, "must not be a Proxy")
  }
}

function newValidationContext(): ValidationContext {
  return { active: new WeakSet<object>(), nodes: 0 }
}

function enterContainer(value: object, label: string, depth: number, context: ValidationContext): () => void {
  assertNoProxy(value, label)
  if (depth > K6_R2_LIMITS.maxCanonicalDepth) {
    rangeError(label, `exceeds canonical depth ${K6_R2_LIMITS.maxCanonicalDepth}`)
  }
  context.nodes += 1
  if (context.nodes > K6_R2_LIMITS.maxCanonicalNodes) {
    rangeError(label, `exceeds canonical node count ${K6_R2_LIMITS.maxCanonicalNodes}`)
  }
  if (context.active.has(value)) typeError(label, "must not be cyclic")
  context.active.add(value)
  return () => context.active.delete(value)
}

function plainRecord(
  value: unknown,
  keys: readonly string[],
  label: string,
  depth: number,
  context: ValidationContext,
): UnknownRecord {
  assertNoProxy(value, label)
  if (value === null || typeof value !== "object" || Array.isArray(value)) typeError(label, "must be a plain object")
  const release = enterContainer(value, label, depth, context)
  try {
    const prototype = Object.getPrototypeOf(value)
    if (prototype !== Object.prototype && prototype !== null) typeError(label, "must be a plain object")
    if (Object.getOwnPropertySymbols(value).length !== 0) typeError(label, "must not contain symbol fields")
    const actual = Object.getOwnPropertyNames(value)
    if (actual.length !== keys.length) typeError(label, "has an invalid key set")
    const allowed = new Set(keys)
    const result = Object.create(null) as UnknownRecord
    for (const key of actual) {
      if (!allowed.has(key)) typeError(label, `contains unknown field: ${key}`)
      const descriptor = Object.getOwnPropertyDescriptor(value, key)
      if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) {
        typeError(`${label}.${key}`, "must be an enumerable data property")
      }
      if (descriptor.value === undefined) typeError(`${label}.${key}`, "must not be undefined")
      result[key] = descriptor.value
    }
    for (const key of keys) {
      if (!Object.hasOwn(result, key)) typeError(label, `is missing required field: ${key}`)
    }
    return result
  } finally {
    release()
  }
}

function denseArray(
  value: unknown,
  label: string,
  min: number,
  max: number,
  depth: number,
  context: ValidationContext,
): readonly unknown[] {
  assertNoProxy(value, label)
  if (!Array.isArray(value)) typeError(label, "must be an array")
  const release = enterContainer(value, label, depth, context)
  try {
    if (Object.getPrototypeOf(value) !== Array.prototype) typeError(label, "must be a plain array")
    if (Object.getOwnPropertySymbols(value).length !== 0) typeError(label, "must not contain symbol fields")
    const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length")
    if (lengthDescriptor === undefined || !("value" in lengthDescriptor)) typeError(label, "must have a data length")
    const length = lengthDescriptor.value
    if (typeof length !== "number" || !Number.isSafeInteger(length) || Object.is(length, -0) || length < min || length > max) {
      rangeError(label, `must contain ${min} through ${max} entries`)
    }
    const parsed: unknown[] = []
    for (let index = 0; index < length; index += 1) {
      const descriptor = Object.getOwnPropertyDescriptor(value, String(index))
      if (descriptor === undefined) typeError(label, "must be dense")
      if (!("value" in descriptor) || !descriptor.enumerable) {
        typeError(`${label}[${index}]`, "must be an enumerable data property")
      }
      if (descriptor.value === undefined) typeError(`${label}[${index}]`, "must not be undefined")
      parsed.push(descriptor.value)
    }
    if (Object.getOwnPropertyNames(value).length !== length + 1) typeError(label, "contains unexpected array fields")
    return parsed
  } finally {
    release()
  }
}

function validUnicodeScalars(value: string, label: string): void {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index)
    if (code >= 0xd800 && code <= 0xdbff) {
      if (index + 1 >= value.length) typeError(label, "must contain only valid Unicode scalar values")
      const next = value.charCodeAt(index + 1)
      if (next < 0xdc00 || next > 0xdfff) typeError(label, "must contain only valid Unicode scalar values")
      index += 1
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      typeError(label, "must contain only valid Unicode scalar values")
    }
  }
}

function boundedString(value: unknown, label: string, maxBytes: number): string {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) {
    typeError(label, "must be a non-empty NUL-free string")
  }
  validUnicodeScalars(value, label)
  if (Buffer.byteLength(value, "utf8") > maxBytes) rangeError(label, `exceeds ${maxBytes} UTF-8 bytes`)
  return value
}

function exactString<T extends string>(value: unknown, expected: T, label: string): T {
  if (value !== expected) typeError(label, `must equal ${expected}`)
  return expected
}

function enumString<T extends string>(value: unknown, allowed: ReadonlySet<string>, label: string): T {
  if (typeof value !== "string" || !allowed.has(value)) typeError(label, "is unsupported")
  return value as T
}

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) typeError(label, "must be 64 lowercase hexadecimal characters")
  return value
}

function gitSha(value: unknown, label: string): string {
  if (typeof value !== "string" || !GIT_SHA.test(value)) typeError(label, "must be 40 lowercase hexadecimal characters")
  return value
}

function parseOrderedEligibleCandidateIds(
  value: unknown,
  label: string,
  depth: number,
  context: ValidationContext,
): readonly string[] {
  const values = denseArray(value, label, 0, K6_R2_LIMITS.maxOrderedEligibleCandidates, depth, context)
  const ids = values.map((item, index) => boundedString(item, `${label}[${index}]`, K6_R2_LIMITS.maxCandidateIdBytes))
  if (new Set(ids).size !== ids.length) typeError(label, "must not contain duplicate candidateId values")
  return Object.freeze(ids)
}

function eligibleCandidates(result: K6R1RouteEligibilityResult): readonly K6R1CandidateEligibilityResult[] {
  return result.candidateResults.filter((candidate) => candidate.status === "ELIGIBLE")
}

function assertExactEligiblePermutation(
  result: K6R1RouteEligibilityResult,
  orderedIds: readonly string[],
  label: string,
): void {
  const eligible = eligibleCandidates(result)
  if (orderedIds.length !== eligible.length) {
    typeError(label, "must contain every and only ELIGIBLE candidateId exactly once")
  }
  const eligibleIds = new Set(eligible.map((candidate) => candidate.candidateId))
  for (const candidateId of orderedIds) {
    if (!eligibleIds.has(candidateId)) {
      typeError(label, "must contain every and only ELIGIBLE candidateId exactly once")
    }
  }
}

function parseRequestIdentityInput(value: unknown, label = "route plan request"): K6R2RoutePlanRequestIdentityInput {
  const context = newValidationContext()
  const record = plainRecord(value, REQUEST_IDENTITY_INPUT_KEYS, label, 1, context)
  const eligibilityResult = validateK6R1RouteEligibilityResult(record.eligibilityResult)
  const orderedEligibleCandidateIds = parseOrderedEligibleCandidateIds(
    record.orderedEligibleCandidateIds,
    `${label}.orderedEligibleCandidateIds`,
    2,
    context,
  )
  assertExactEligiblePermutation(eligibilityResult, orderedEligibleCandidateIds, `${label}.orderedEligibleCandidateIds`)
  return Object.freeze({
    version: exactString(record.version, K6_R2_ROUTE_PLAN_REQUEST_VERSION, `${label}.version`),
    orderingBasis: exactString(record.orderingBasis, K6_R2_ORDERING_BASIS, `${label}.orderingBasis`),
    eligibilityResult,
    orderedEligibleCandidateIds,
  })
}

function parseStep(
  value: unknown,
  label: string,
  depth: number,
  context: ValidationContext,
): K6R2RoutePlanStep {
  const record = plainRecord(value, STEP_KEYS, label, depth, context)
  return Object.freeze({
    candidateId: boundedString(record.candidateId, `${label}.candidateId`, K6_R2_LIMITS.maxCandidateIdBytes),
    candidateKind: exactString(record.candidateKind, "MODEL_PROVIDER", `${label}.candidateKind`),
    provider: boundedString(record.provider, `${label}.provider`, K6_R2_LIMITS.maxProviderBytes),
    model: boundedString(record.model, `${label}.model`, K6_R2_LIMITS.maxModelBytes),
    role: enumString<K6R2StepRole>(record.role, STEP_ROLE_SET, `${label}.role`),
    qualificationReportDigest: sha256(record.qualificationReportDigest, `${label}.qualificationReportDigest`),
  })
}

function parseSteps(
  value: unknown,
  label: string,
  depth: number,
  context: ValidationContext,
): readonly K6R2RoutePlanStep[] {
  const values = denseArray(value, label, 0, K6_R2_LIMITS.maxOrderedEligibleCandidates, depth, context)
  const steps = values.map((item, index) => parseStep(item, `${label}[${index}]`, depth + 1, context))
  const ids = steps.map((step) => step.candidateId)
  if (new Set(ids).size !== ids.length) typeError(label, "must not contain duplicate candidateId values")
  return Object.freeze(steps)
}

function parsePlanIdentityInput(value: unknown, label = "route plan"): K6R2RoutePlanIdentityInput {
  const context = newValidationContext()
  const record = plainRecord(value, PLAN_IDENTITY_INPUT_KEYS, label, 1, context)
  return Object.freeze({
    version: exactString(record.version, K6_R2_ROUTE_PLAN_VERSION, `${label}.version`),
    planRequestIdentity: sha256(record.planRequestIdentity, `${label}.planRequestIdentity`),
    orderingBasis: exactString(record.orderingBasis, K6_R2_ORDERING_BASIS, `${label}.orderingBasis`),
    eligibilityResultIdentity: sha256(record.eligibilityResultIdentity, `${label}.eligibilityResultIdentity`),
    requestIdentity: sha256(record.requestIdentity, `${label}.requestIdentity`),
    repositoryId: boundedString(record.repositoryId, `${label}.repositoryId`, K6_R1_LIMITS.maxRepositoryIdBytes),
    canonicalBase: gitSha(record.canonicalBase, `${label}.canonicalBase`),
    candidateHead: gitSha(record.candidateHead, `${label}.candidateHead`),
    taskId: boundedString(record.taskId, `${label}.taskId`, K6_R1_LIMITS.maxTaskIdBytes),
    status: enumString<K6R2PlanStatus>(record.status, PLAN_STATUS_SET, `${label}.status`),
    steps: parseSteps(record.steps, `${label}.steps`, 2, context),
  })
}

function digest(value: unknown): string {
  return createHash("sha256").update(canonicalK6R1Json(value), "utf8").digest("hex")
}

function exactProjectionCandidate(
  step: K6R2RoutePlanStep,
  candidate: K6R1CandidateEligibilityResult,
  expectedRole: K6R2StepRole,
  label: string,
): void {
  if (candidate.status !== "ELIGIBLE") typeError(label, "must project an ELIGIBLE candidate")
  if (step.candidateId !== candidate.candidateId) typeError(label, "candidateId does not match request order")
  if (step.candidateKind !== candidate.candidateKind) typeError(label, "candidateKind does not match eligibility result")
  if (step.provider !== candidate.provider) typeError(label, "provider does not match eligibility result")
  if (step.model !== candidate.model) typeError(label, "model does not match eligibility result")
  if (step.role !== expectedRole) typeError(label, `role must equal ${expectedRole}`)
  if (step.qualificationReportDigest !== candidate.qualificationReportDigest) {
    typeError(label, "qualificationReportDigest does not match eligibility result")
  }
}

function assertPlanProjection(plan: K6R2RoutePlanIdentityInput, request: K6R2RoutePlanRequest): void {
  const result = request.eligibilityResult
  if (plan.planRequestIdentity !== request.planRequestIdentity) {
    typeError("route plan.planRequestIdentity", "does not match route plan request")
  }
  if (plan.orderingBasis !== request.orderingBasis) typeError("route plan.orderingBasis", "does not match route plan request")
  if (plan.eligibilityResultIdentity !== result.resultIdentity) {
    typeError("route plan.eligibilityResultIdentity", "does not match eligibility result")
  }
  if (plan.requestIdentity !== result.requestIdentity) typeError("route plan.requestIdentity", "does not match eligibility result")
  if (plan.repositoryId !== result.repositoryId) typeError("route plan.repositoryId", "does not match eligibility result")
  if (plan.canonicalBase !== result.canonicalBase) typeError("route plan.canonicalBase", "does not match eligibility result")
  if (plan.candidateHead !== result.candidateHead) typeError("route plan.candidateHead", "does not match eligibility result")
  if (plan.taskId !== result.taskId) typeError("route plan.taskId", "does not match eligibility result")

  if (request.orderedEligibleCandidateIds.length === 0) {
    if (plan.status !== "NO_ELIGIBLE_CANDIDATE") typeError("route plan.status", "must equal NO_ELIGIBLE_CANDIDATE")
    if (plan.steps.length !== 0) typeError("route plan.steps", "must be empty when no eligible candidates exist")
    return
  }

  if (plan.status !== "ROUTABLE") typeError("route plan.status", "must equal ROUTABLE")
  if (plan.steps.length !== request.orderedEligibleCandidateIds.length) {
    typeError("route plan.steps", "must exactly project the caller order")
  }
  const byId = new Map(result.candidateResults.map((candidate) => [candidate.candidateId, candidate] as const))
  for (let index = 0; index < request.orderedEligibleCandidateIds.length; index += 1) {
    const candidateId = request.orderedEligibleCandidateIds[index] as string
    const candidate = byId.get(candidateId)
    if (candidate === undefined) typeError(`route plan.steps[${index}]`, "references an unknown candidate")
    exactProjectionCandidate(plan.steps[index] as K6R2RoutePlanStep, candidate, index === 0 ? "PRIMARY" : "FALLBACK", `route plan.steps[${index}]`)
  }
}

export function createK6R2RoutePlanRequest(value: unknown): K6R2RoutePlanRequest {
  const identityInput = parseRequestIdentityInput(value)
  return Object.freeze({ ...identityInput, planRequestIdentity: digest(identityInput) })
}

export function validateK6R2RoutePlanRequest(value: unknown): K6R2RoutePlanRequest {
  const context = newValidationContext()
  const record = plainRecord(value, REQUEST_KEYS, "route plan request", 1, context)
  const identityInput = parseRequestIdentityInput({
    version: record.version,
    orderingBasis: record.orderingBasis,
    eligibilityResult: record.eligibilityResult,
    orderedEligibleCandidateIds: record.orderedEligibleCandidateIds,
  })
  const planRequestIdentity = sha256(record.planRequestIdentity, "route plan request.planRequestIdentity")
  if (planRequestIdentity !== digest(identityInput)) {
    typeError("route plan request.planRequestIdentity", "does not match deterministic recomputation")
  }
  return Object.freeze({ ...identityInput, planRequestIdentity })
}

export function createK6R2RoutePlan(value: unknown, requestValue: unknown): K6R2RoutePlan {
  const request = validateK6R2RoutePlanRequest(requestValue)
  const identityInput = parsePlanIdentityInput(value)
  assertPlanProjection(identityInput, request)
  return Object.freeze({ ...identityInput, planIdentity: digest(identityInput) })
}

export function validateK6R2RoutePlan(value: unknown, requestValue: unknown): K6R2RoutePlan {
  const request = validateK6R2RoutePlanRequest(requestValue)
  const context = newValidationContext()
  const record = plainRecord(value, PLAN_KEYS, "route plan", 1, context)
  const identityInput = parsePlanIdentityInput({
    version: record.version,
    planRequestIdentity: record.planRequestIdentity,
    orderingBasis: record.orderingBasis,
    eligibilityResultIdentity: record.eligibilityResultIdentity,
    requestIdentity: record.requestIdentity,
    repositoryId: record.repositoryId,
    canonicalBase: record.canonicalBase,
    candidateHead: record.candidateHead,
    taskId: record.taskId,
    status: record.status,
    steps: record.steps,
  })
  assertPlanProjection(identityInput, request)
  const planIdentity = sha256(record.planIdentity, "route plan.planIdentity")
  if (planIdentity !== digest(identityInput)) typeError("route plan.planIdentity", "does not match deterministic recomputation")
  return Object.freeze({ ...identityInput, planIdentity })
}
