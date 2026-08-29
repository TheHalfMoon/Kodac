import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

import {
  P3_R1_EVIDENCE_LANES,
  P3_R1_LIMITS,
  type ContextEvidenceLane,
  type ContextSelectionCandidate,
  type ContextSelectionPlan,
} from "../context-selection-plan/contracts.ts"
import { buildContextSelectionPlan } from "../context-selection-plan/context-selection-plan.ts"
import {
  P3_R2_DECLARED_POLICY_KIND,
  P3_R2_DECLARED_POLICY_VERSION,
  P3_R2_POLICY_APPLICATION_KIND,
  P3_R2_POLICY_APPLICATION_VERSION,
  type ContextSelectionOmissionReason,
  type ContextSelectionPolicyApplication,
  type ContextSelectionPolicyApplicationState,
  type DeclaredContextSelectionPolicy,
  type OmittedContextSelectionCandidate,
} from "./contracts.ts"

const SHA256 = /^[0-9a-f]{64}$/
const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const LANE_SET = new Set<string>(P3_R1_EVIDENCE_LANES)

type UnknownRecord = Record<string, unknown>

const POLICY_KEYS = [
  "version",
  "kind",
  "policyId",
  "planIdentity",
  "repositoryIdentity",
  "snapshotIdentity",
  "contentIdentity",
  "taskIdentity",
  "lanePriority",
  "maxSelectedItems",
  "maxSelectedUtf8Bytes",
  "maxPerGroupingKey",
] as const

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function asRecord(value: unknown, label: string): UnknownRecord {
  if (value === null || typeof value !== "object" || utilTypes.isProxy(value) || Array.isArray(value)) {
    throw new TypeError(`${label} must be a non-Proxy plain object`)
  }
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) throw new TypeError(`${label} must be a plain object`)
  if (Object.getOwnPropertySymbols(value).length !== 0) throw new TypeError(`${label} must not contain symbol fields`)
  const result = Object.create(null) as UnknownRecord
  for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(value))) {
    if (!("value" in descriptor)) throw new TypeError(`${label}.${key} must be a data property`)
    if (!descriptor.enumerable) throw new TypeError(`${label}.${key} must be enumerable`)
    result[key] = descriptor.value
  }
  return result
}

function denseArrayValues(value: unknown, label: string, maximum: number): unknown[] {
  if (!Array.isArray(value) || utilTypes.isProxy(value) || Object.getPrototypeOf(value) !== Array.prototype) {
    throw new TypeError(`${label} must be a non-Proxy plain array`)
  }
  if (Object.getOwnPropertySymbols(value).length !== 0) throw new TypeError(`${label} must not contain symbol fields`)
  const descriptors = Object.getOwnPropertyDescriptors(value) as Record<string, PropertyDescriptor>
  const lengthDescriptor = descriptors.length
  if (!lengthDescriptor || !("value" in lengthDescriptor) || !Number.isSafeInteger(lengthDescriptor.value) || lengthDescriptor.value < 0) {
    throw new TypeError(`${label}.length is invalid`)
  }
  const length = lengthDescriptor.value as number
  if (length > maximum) throw new RangeError(`${label} exceeds ${maximum} entries`)
  const expected = new Set(["length", ...Array.from({ length }, (_, index) => String(index))])
  for (const [key, descriptor] of Object.entries(descriptors)) {
    if (!expected.has(key)) throw new TypeError(`${label} contains unexpected array field: ${key}`)
    if (key !== "length" && (!("value" in descriptor) || !descriptor.enumerable)) {
      throw new TypeError(`${label}[${key}] must be an enumerable data property`)
    }
  }
  const result: unknown[] = []
  for (let index = 0; index < length; index++) {
    const descriptor = descriptors[String(index)]
    if (!descriptor || !("value" in descriptor)) throw new TypeError(`${label} must be dense`)
    result.push(descriptor.value)
  }
  return result
}

function exactKeys(record: UnknownRecord, allowed: readonly string[], label: string): void {
  const allowedSet = new Set(allowed)
  for (const key of Object.keys(record)) if (!allowedSet.has(key)) throw new TypeError(`${label} contains unknown field: ${key}`)
  for (const key of allowed) if (!Object.hasOwn(record, key)) throw new TypeError(`${label} is missing required field: ${key}`)
}

function boundedString(value: unknown, label: string, maximumBytes: number): string {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) throw new TypeError(`${label} must be a non-empty NUL-free string`)
  if (Buffer.byteLength(value, "utf8") > maximumBytes) throw new RangeError(`${label} exceeds ${maximumBytes} UTF-8 bytes`)
  return value
}

function stableId(value: unknown, label: string): string {
  const result = boundedString(value, label, P3_R1_LIMITS.maxStableIdBytes)
  if (!STABLE_ID.test(result)) throw new TypeError(`${label} must use the stable-id alphabet`)
  return result
}

function digest(value: unknown, label: string): string {
  const result = boundedString(value, label, 64)
  if (!SHA256.test(result)) throw new TypeError(`${label} must be a lowercase SHA-256 identity`)
  return result
}

function positiveInteger(value: unknown, label: string, maximum: number): number {
  if (!Number.isSafeInteger(value) || (value as number) <= 0 || (value as number) > maximum) {
    throw new RangeError(`${label} must be a positive integer <= ${maximum}`)
  }
  return value as number
}

function canonicalize(value: unknown, ancestors = new WeakSet<object>()): string {
  if (value === null) return "null"
  if (typeof value === "string" || typeof value === "boolean") return JSON.stringify(value)
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError("canonical number must be finite")
    return JSON.stringify(value)
  }
  if (typeof value !== "object") throw new TypeError("canonical value is not JSON-compatible")
  if (ancestors.has(value)) throw new TypeError("canonical value must not be cyclic")
  ancestors.add(value)
  try {
    if (Array.isArray(value)) {
      return `[${denseArrayValues(value, "canonical array", Number.MAX_SAFE_INTEGER).map((item) => canonicalize(item, ancestors)).join(",")}]`
    }
    const record = asRecord(value, "canonical record")
    return `{${Object.keys(record).sort(compareStrings).map((key) => `${JSON.stringify(key)}:${canonicalize(record[key], ancestors)}`).join(",")}}`
  } finally {
    ancestors.delete(value)
  }
}

function sha256(value: unknown): string {
  return createHash("sha256").update(canonicalize(value), "utf8").digest("hex")
}

function deepFreeze<T>(value: T, ancestors = new WeakSet<object>()): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    if (ancestors.has(value)) throw new TypeError("normalized P3-R2 application must not be cyclic")
    ancestors.add(value)
    for (const nested of Object.values(value as UnknownRecord)) deepFreeze(nested, ancestors)
    ancestors.delete(value)
    Object.freeze(value)
  }
  return value
}

function lanePriority(value: unknown): readonly ContextEvidenceLane[] {
  const values = denseArrayValues(value, "declaredPolicy.lanePriority", P3_R1_EVIDENCE_LANES.length)
  if (values.length !== P3_R1_EVIDENCE_LANES.length) {
    throw new TypeError(`declaredPolicy.lanePriority must contain exactly ${P3_R1_EVIDENCE_LANES.length} lanes`)
  }
  const normalized = values.map((item, index) => {
    if (typeof item !== "string" || !LANE_SET.has(item)) throw new TypeError(`declaredPolicy.lanePriority[${index}] is unsupported`)
    return item as ContextEvidenceLane
  })
  if (new Set(normalized).size !== P3_R1_EVIDENCE_LANES.length) throw new TypeError("declaredPolicy.lanePriority must be an exact lane permutation")
  return Object.freeze(normalized)
}

function normalizePolicy(value: unknown, plan: ContextSelectionPlan): DeclaredContextSelectionPolicy {
  const record = asRecord(value, "declaredPolicy")
  exactKeys(record, POLICY_KEYS, "declaredPolicy")
  if (record.version !== P3_R2_DECLARED_POLICY_VERSION || record.kind !== P3_R2_DECLARED_POLICY_KIND) {
    throw new TypeError("unsupported P3-R2 declared policy contract")
  }
  const policyId = stableId(record.policyId, "declaredPolicy.policyId")
  const planIdentity = digest(record.planIdentity, "declaredPolicy.planIdentity")
  const repositoryIdentity = digest(record.repositoryIdentity, "declaredPolicy.repositoryIdentity")
  const snapshotIdentity = digest(record.snapshotIdentity, "declaredPolicy.snapshotIdentity")
  const contentIdentity = digest(record.contentIdentity, "declaredPolicy.contentIdentity")
  const taskIdentity = stableId(record.taskIdentity, "declaredPolicy.taskIdentity")
  const priority = lanePriority(record.lanePriority)
  const maxSelectedItems = positiveInteger(record.maxSelectedItems, "declaredPolicy.maxSelectedItems", plan.budget.maxItems)
  const maxSelectedUtf8Bytes = positiveInteger(record.maxSelectedUtf8Bytes, "declaredPolicy.maxSelectedUtf8Bytes", plan.budget.maxUtf8Bytes)
  const maxPerGroupingKey = positiveInteger(record.maxPerGroupingKey, "declaredPolicy.maxPerGroupingKey", maxSelectedItems)

  if (planIdentity !== plan.planIdentity) throw new TypeError("declaredPolicy.planIdentity does not match rebuilt plan")
  if (repositoryIdentity !== plan.repositoryIdentity) throw new TypeError("declaredPolicy.repositoryIdentity does not match rebuilt plan")
  if (snapshotIdentity !== plan.snapshotIdentity) throw new TypeError("declaredPolicy.snapshotIdentity does not match rebuilt plan")
  if (contentIdentity !== plan.contentIdentity) throw new TypeError("declaredPolicy.contentIdentity does not match rebuilt plan")
  if (taskIdentity !== plan.taskIdentity) throw new TypeError("declaredPolicy.taskIdentity does not match rebuilt plan")

  return Object.freeze({
    version: P3_R2_DECLARED_POLICY_VERSION,
    kind: P3_R2_DECLARED_POLICY_KIND,
    policyId,
    planIdentity,
    repositoryIdentity,
    snapshotIdentity,
    contentIdentity,
    taskIdentity,
    lanePriority: priority,
    maxSelectedItems,
    maxSelectedUtf8Bytes,
    maxPerGroupingKey,
  })
}

function policyProjection(policy: DeclaredContextSelectionPolicy): DeclaredContextSelectionPolicy {
  return {
    version: policy.version,
    kind: policy.kind,
    policyId: policy.policyId,
    planIdentity: policy.planIdentity,
    repositoryIdentity: policy.repositoryIdentity,
    snapshotIdentity: policy.snapshotIdentity,
    contentIdentity: policy.contentIdentity,
    taskIdentity: policy.taskIdentity,
    lanePriority: policy.lanePriority,
    maxSelectedItems: policy.maxSelectedItems,
    maxSelectedUtf8Bytes: policy.maxSelectedUtf8Bytes,
    maxPerGroupingKey: policy.maxPerGroupingKey,
  }
}

function candidateOrder(priority: readonly ContextEvidenceLane[]): (left: ContextSelectionCandidate, right: ContextSelectionCandidate) => number {
  const laneIndex = new Map(priority.map((lane, index) => [lane, index]))
  return (left, right) => (laneIndex.get(left.lane)! - laneIndex.get(right.lane)!) || compareStrings(left.candidateIdentity, right.candidateIdentity)
}

function applicationState(plan: ContextSelectionPlan, selected: number, omitted: number): ContextSelectionPolicyApplicationState {
  if (plan.state === "insufficient-evidence") {
    if (plan.candidates.length !== 0 || selected !== 0 || omitted !== 0) throw new TypeError("insufficient-evidence source plan must contain no candidate realization")
    return "insufficient-evidence"
  }
  if (selected + omitted !== plan.candidates.length) throw new TypeError("P3-R2 candidate partition mismatch")
  if (selected === plan.candidates.length) {
    if (omitted !== 0) throw new TypeError("selected-all-candidates requires zero omissions")
    return "selected-all-candidates"
  }
  if (selected === 0) {
    if (omitted !== plan.candidates.length) throw new TypeError("budget-constrained-empty requires all candidates omitted")
    return "budget-constrained-empty"
  }
  if (omitted === 0) throw new TypeError("selected-subset requires at least one omission")
  return "selected-subset"
}

export function applyDeclaredContextSelectionPolicy(planRequestValue: unknown, policyValue: unknown): ContextSelectionPolicyApplication {
  const plan = buildContextSelectionPlan(planRequestValue)
  if (plan.state !== "ready-for-policy" && plan.state !== "budget-exceeded" && plan.state !== "insufficient-evidence") {
    throw new TypeError("unsupported P3-R1 source plan state")
  }

  const policy = normalizePolicy(policyValue, plan)
  const policyIdentity = sha256(policyProjection(policy))
  const selectedCandidates: ContextSelectionCandidate[] = []
  const omittedCandidates: OmittedContextSelectionCandidate[] = []
  let usedSelectedUtf8Bytes = 0

  if (plan.state !== "insufficient-evidence") {
    const ordered = [...plan.candidates].sort(candidateOrder(policy.lanePriority))
    const selectedByGroupingKey = new Map<string, number>()
    for (const candidate of ordered) {
      let reason: ContextSelectionOmissionReason | null = null
      const groupCount = selectedByGroupingKey.get(candidate.groupingKey) ?? 0
      if (groupCount >= policy.maxPerGroupingKey) reason = "group-cap"
      else if (selectedCandidates.length >= policy.maxSelectedItems) reason = "item-budget"
      else if (candidate.utf8Bytes > policy.maxSelectedUtf8Bytes - usedSelectedUtf8Bytes) reason = "byte-budget"

      if (reason !== null) {
        omittedCandidates.push(Object.freeze({ candidate, reason }))
        continue
      }

      const nextBytes = usedSelectedUtf8Bytes + candidate.utf8Bytes
      if (!Number.isSafeInteger(nextBytes) || nextBytes > policy.maxSelectedUtf8Bytes) throw new RangeError("selected UTF-8 byte total exceeds deterministic bounds")
      selectedCandidates.push(candidate)
      usedSelectedUtf8Bytes = nextBytes
      selectedByGroupingKey.set(candidate.groupingKey, groupCount + 1)
    }
  }

  const frozenSelected = Object.freeze(selectedCandidates)
  const frozenOmitted = Object.freeze(omittedCandidates)
  const state = applicationState(plan, frozenSelected.length, frozenOmitted.length)
  const base = {
    version: P3_R2_POLICY_APPLICATION_VERSION,
    kind: P3_R2_POLICY_APPLICATION_KIND,
    policyIdentity,
    policyId: policy.policyId,
    planIdentity: plan.planIdentity,
    requestIdentity: plan.requestIdentity,
    candidateSetIdentity: plan.candidateSetIdentity,
    repositoryIdentity: plan.repositoryIdentity,
    snapshotIdentity: plan.snapshotIdentity,
    contentIdentity: plan.contentIdentity,
    taskIdentity: plan.taskIdentity,
    state,
    lanePriority: policy.lanePriority,
    maxSelectedItems: policy.maxSelectedItems,
    maxSelectedUtf8Bytes: policy.maxSelectedUtf8Bytes,
    maxPerGroupingKey: policy.maxPerGroupingKey,
    usedSelectedItems: frozenSelected.length,
    usedSelectedUtf8Bytes,
    selectedCandidates: frozenSelected,
    omittedCandidates: frozenOmitted,
    sourcePlanState: plan.state,
    sourceCompleteness: plan.completeness,
    sourceAbstention: plan.abstention,
    relationEvidence: plan.relationEvidence,
  }
  const applicationIdentity = sha256(base)
  return deepFreeze({
    version: base.version,
    kind: base.kind,
    applicationIdentity,
    policyIdentity: base.policyIdentity,
    policyId: base.policyId,
    planIdentity: base.planIdentity,
    requestIdentity: base.requestIdentity,
    candidateSetIdentity: base.candidateSetIdentity,
    repositoryIdentity: base.repositoryIdentity,
    snapshotIdentity: base.snapshotIdentity,
    contentIdentity: base.contentIdentity,
    taskIdentity: base.taskIdentity,
    state: base.state,
    lanePriority: base.lanePriority,
    maxSelectedItems: base.maxSelectedItems,
    maxSelectedUtf8Bytes: base.maxSelectedUtf8Bytes,
    maxPerGroupingKey: base.maxPerGroupingKey,
    usedSelectedItems: base.usedSelectedItems,
    usedSelectedUtf8Bytes: base.usedSelectedUtf8Bytes,
    selectedCandidates: base.selectedCandidates,
    omittedCandidates: base.omittedCandidates,
    sourcePlanState: base.sourcePlanState,
    sourceCompleteness: base.sourceCompleteness,
    sourceAbstention: base.sourceAbstention,
    relationEvidence: base.relationEvidence,
  })
}
