import { types as utilTypes } from "node:util"

import {
  type ContextSelectionPolicyApplication,
} from "../../src/context-selection-policy/contracts.ts"
import { applyDeclaredContextSelectionPolicy } from "../../src/context-selection-policy/context-selection-policy.ts"
import { sha256Canonical } from "../p2-r1/contract.ts"
import {
  P2_R5_RELATION_SET_SCHEMA,
  deriveP2R5Relations,
  type P2R5MetricRelation,
  type P2R5RelationSet,
} from "../p2-r5/relation.ts"
import {
  P3_R3_CONTEXT_EVIDENCE_DIMENSIONS,
  P3_R3_EVIDENCE_DECLARATION_KIND,
  P3_R3_EVIDENCE_DECLARATION_VERSION,
  P3_R3_METRIC_EVIDENCE_KIND,
  P3_R3_METRIC_EVIDENCE_VERSION,
  P3_R3_P3_R2_IMPLEMENTATION_MERGE,
  P3_R3_TASK_FAMILY,
  type ContextPolicyPairwiseMetricEvidence,
  type P3R3ContextEvidenceDimension,
  type P3R3DimensionMetricBinding,
  type P3R3EvidenceDeclaration,
  type P3R3MetricEvidenceState,
} from "./contracts.ts"

const BARE_SHA256 = /^[0-9a-f]{64}$/
const P2_SHA256 = /^sha256:[0-9a-f]{64}$/
const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const MAX_STABLE_ID_BYTES = 512

type UnknownRecord = Record<string, unknown>

const DECLARATION_KEYS = [
  "version",
  "kind",
  "qualificationId",
  "benchmarkId",
  "benchmarkProtocolVersion",
  "sharedEvaluationContextIdentity",
  "comparisonPolicyIdentity",
  "taskFamily",
  "dimensionMetricBindings",
] as const

const DIMENSION_BINDING_KEYS = ["dimension", "metricId"] as const

const SHARED_APPLICATION_FIELDS = [
  "planIdentity",
  "requestIdentity",
  "candidateSetIdentity",
  "repositoryIdentity",
  "snapshotIdentity",
  "contentIdentity",
  "taskIdentity",
] as const

function fail(message: string): never {
  throw new TypeError(`P3-R3 contract violation: ${message}`)
}

function asRecord(value: unknown, label: string): UnknownRecord {
  if (value === null || typeof value !== "object" || Array.isArray(value) || utilTypes.isProxy(value)) {
    fail(`${label} must be a non-Proxy plain object`)
  }
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) fail(`${label} must be a plain object`)
  if (Object.getOwnPropertySymbols(value).length !== 0) fail(`${label} must not contain symbol fields`)

  const result = Object.create(null) as UnknownRecord
  for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(value))) {
    if (!("value" in descriptor)) fail(`${label}.${key} must be a data property`)
    if (!descriptor.enumerable) fail(`${label}.${key} must be enumerable`)
    result[key] = descriptor.value
  }
  return result
}

function denseArrayValues(value: unknown, label: string, expectedLength: number): unknown[] {
  if (!Array.isArray(value) || utilTypes.isProxy(value) || Object.getPrototypeOf(value) !== Array.prototype) {
    fail(`${label} must be a non-Proxy plain array`)
  }
  if (Object.getOwnPropertySymbols(value).length !== 0) fail(`${label} must not contain symbol fields`)

  const descriptors = Object.getOwnPropertyDescriptors(value) as Record<string, PropertyDescriptor>
  const lengthDescriptor = descriptors.length
  if (!lengthDescriptor || !("value" in lengthDescriptor) || lengthDescriptor.value !== expectedLength) {
    fail(`${label} must contain exactly ${expectedLength} entries`)
  }

  const allowed = new Set(["length", ...Array.from({ length: expectedLength }, (_, index) => String(index))])
  for (const [key, descriptor] of Object.entries(descriptors)) {
    if (!allowed.has(key)) fail(`${label} contains unexpected array field: ${key}`)
    if (key !== "length" && (!("value" in descriptor) || !descriptor.enumerable)) {
      fail(`${label}[${key}] must be an enumerable data property`)
    }
  }

  const result: unknown[] = []
  for (let index = 0; index < expectedLength; index += 1) {
    const descriptor = descriptors[String(index)]
    if (!descriptor || !("value" in descriptor)) fail(`${label} must be dense`)
    result.push(descriptor.value)
  }
  return result
}

function exactKeys(record: UnknownRecord, expected: readonly string[], label: string): void {
  const expectedSet = new Set(expected)
  for (const key of Object.keys(record)) {
    if (!expectedSet.has(key)) fail(`${label} contains unknown field: ${key}`)
  }
  for (const key of expected) {
    if (!Object.hasOwn(record, key)) fail(`${label} is missing required field: ${key}`)
  }
}

function stableId(value: unknown, label: string): string {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) {
    fail(`${label} must be a non-empty NUL-free string`)
  }
  if (Buffer.byteLength(value, "utf8") > MAX_STABLE_ID_BYTES) {
    fail(`${label} exceeds ${MAX_STABLE_ID_BYTES} UTF-8 bytes`)
  }
  if (!STABLE_ID.test(value)) fail(`${label} must use the stable-id alphabet`)
  return value
}

function canonicalString(value: unknown, label: string): string {
  if (typeof value !== "string" || value.length === 0 || value.trim() !== value || value.includes("\0")) {
    fail(`${label} must be a non-empty canonical NUL-free string`)
  }
  return value
}

function bareDigest(value: unknown, label: string): string {
  if (typeof value !== "string" || !BARE_SHA256.test(value)) {
    fail(`${label} must be a bare lowercase 64-hex P3-R2 identity`)
  }
  return value
}

function p2Identity(value: unknown, label: string): string {
  if (typeof value !== "string" || !P2_SHA256.test(value)) {
    fail(`${label} must be a lowercase sha256: P2 identity`)
  }
  return value
}

function deepFreeze<T>(value: T, ancestors = new WeakSet<object>()): T {
  if (value === null || typeof value !== "object") return value
  if (ancestors.has(value)) fail("normalized P3-R3 evidence must not be cyclic")
  ancestors.add(value)
  for (const nested of Object.values(value as UnknownRecord)) deepFreeze(nested, ancestors)
  ancestors.delete(value)
  if (!Object.isFrozen(value)) Object.freeze(value)
  return value
}

function validateApplicationIdentities(application: ContextSelectionPolicyApplication, label: string): void {
  bareDigest(application.policyIdentity, `${label}.policyIdentity`)
  bareDigest(application.applicationIdentity, `${label}.applicationIdentity`)
}

function validateApplicationPair(
  left: ContextSelectionPolicyApplication,
  right: ContextSelectionPolicyApplication,
): void {
  validateApplicationIdentities(left, "leftApplication")
  validateApplicationIdentities(right, "rightApplication")

  for (const field of SHARED_APPLICATION_FIELDS) {
    if (left[field] !== right[field]) fail(`left/right applications do not share ${field}`)
  }
  if (left.policyIdentity === right.policyIdentity) fail("left/right policyIdentity values must be distinct")
  if (left.applicationIdentity === right.applicationIdentity) {
    fail("left/right applicationIdentity values must be distinct")
  }
}

function normalizeDimensionBindings(value: unknown): readonly P3R3DimensionMetricBinding[] {
  const entries = denseArrayValues(
    value,
    "evidenceDeclaration.dimensionMetricBindings",
    P3_R3_CONTEXT_EVIDENCE_DIMENSIONS.length,
  )
  const metricIds = new Set<string>()
  const normalized = entries.map((entry, index) => {
    const record = asRecord(entry, `evidenceDeclaration.dimensionMetricBindings[${index}]`)
    exactKeys(record, DIMENSION_BINDING_KEYS, `evidenceDeclaration.dimensionMetricBindings[${index}]`)
    const expectedDimension = P3_R3_CONTEXT_EVIDENCE_DIMENSIONS[index]!
    if (record.dimension !== expectedDimension) {
      fail(`evidenceDeclaration.dimensionMetricBindings[${index}].dimension must be ${expectedDimension}`)
    }
    const metricId = stableId(
      record.metricId,
      `evidenceDeclaration.dimensionMetricBindings[${index}].metricId`,
    )
    if (metricIds.has(metricId)) fail(`duplicate dimension metricId: ${metricId}`)
    metricIds.add(metricId)
    return Object.freeze({ dimension: expectedDimension, metricId })
  })
  return Object.freeze(normalized)
}

function normalizeDeclaration(
  value: unknown,
  relationSet: P2R5RelationSet,
): P3R3EvidenceDeclaration {
  const record = asRecord(value, "evidenceDeclaration")
  exactKeys(record, DECLARATION_KEYS, "evidenceDeclaration")
  if (
    record.version !== P3_R3_EVIDENCE_DECLARATION_VERSION ||
    record.kind !== P3_R3_EVIDENCE_DECLARATION_KIND
  ) {
    fail("unsupported P3-R3 evidence declaration contract")
  }

  const qualificationId = stableId(record.qualificationId, "evidenceDeclaration.qualificationId")
  const benchmarkId = canonicalString(record.benchmarkId, "evidenceDeclaration.benchmarkId")
  const benchmarkProtocolVersion = canonicalString(
    record.benchmarkProtocolVersion,
    "evidenceDeclaration.benchmarkProtocolVersion",
  )
  const sharedEvaluationContextIdentity = p2Identity(
    record.sharedEvaluationContextIdentity,
    "evidenceDeclaration.sharedEvaluationContextIdentity",
  )
  const comparisonPolicyIdentity = p2Identity(
    record.comparisonPolicyIdentity,
    "evidenceDeclaration.comparisonPolicyIdentity",
  )
  if (record.taskFamily !== P3_R3_TASK_FAMILY) {
    fail(`evidenceDeclaration.taskFamily must be ${P3_R3_TASK_FAMILY}`)
  }

  if (benchmarkId !== relationSet.benchmark_id) {
    fail("evidenceDeclaration.benchmarkId does not match trusted P2-R5 evidence")
  }
  if (benchmarkProtocolVersion !== relationSet.benchmark_protocol_version) {
    fail("evidenceDeclaration.benchmarkProtocolVersion does not match trusted P2-R5 evidence")
  }
  if (sharedEvaluationContextIdentity !== relationSet.shared_evaluation_context_identity) {
    fail("evidenceDeclaration.sharedEvaluationContextIdentity does not match trusted P2-R5 evidence")
  }
  if (comparisonPolicyIdentity !== relationSet.comparison_policy_identity) {
    fail("evidenceDeclaration.comparisonPolicyIdentity does not match trusted P2-R5 evidence")
  }

  return Object.freeze({
    version: P3_R3_EVIDENCE_DECLARATION_VERSION,
    kind: P3_R3_EVIDENCE_DECLARATION_KIND,
    qualificationId,
    benchmarkId,
    benchmarkProtocolVersion,
    sharedEvaluationContextIdentity,
    comparisonPolicyIdentity,
    taskFamily: P3_R3_TASK_FAMILY,
    dimensionMetricBindings: normalizeDimensionBindings(record.dimensionMetricBindings),
  })
}

function validateMetricCoverage(
  relationSet: P2R5RelationSet,
  declaration: P3R3EvidenceDeclaration,
): readonly P2R5MetricRelation[] {
  if (relationSet.schema_version !== P2_R5_RELATION_SET_SCHEMA) {
    fail("trusted P2-R5 relation set uses an unsupported schema")
  }
  if (relationSet.task_family_relations.length !== 1) {
    fail("trusted P2-R5 relation set must contain exactly one task family")
  }
  const family = relationSet.task_family_relations[0]!
  if (family.task_family !== P3_R3_TASK_FAMILY) {
    fail(`trusted P2-R5 task family must be ${P3_R3_TASK_FAMILY}`)
  }
  if (family.metrics.length !== P3_R3_CONTEXT_EVIDENCE_DIMENSIONS.length) {
    fail(`trusted P2-R5 task family must contain exactly ${P3_R3_CONTEXT_EVIDENCE_DIMENSIONS.length} metrics`)
  }

  const relationMetricIds = family.metrics.map((metric) => metric.metric_id)
  if (new Set(relationMetricIds).size !== relationMetricIds.length) {
    fail("trusted P2-R5 metric identities must be distinct")
  }
  const declaredMetricIds = declaration.dimensionMetricBindings.map((binding) => binding.metricId)
  const declaredSet = new Set(declaredMetricIds)
  for (const metricId of relationMetricIds) {
    if (!declaredSet.has(metricId)) fail(`trusted P2-R5 metric is not mapped by declaration: ${metricId}`)
  }
  for (const metricId of declaredMetricIds) {
    if (!relationMetricIds.includes(metricId)) fail(`declared metric is absent from trusted P2-R5 evidence: ${metricId}`)
  }

  return family.metrics
}

function derivedSubjectBinding(application: ContextSelectionPolicyApplication): {
  subjectId: string
  systemVersionCommitIdentity: string
} {
  return {
    subjectId: `context-policy-application:${application.applicationIdentity}`,
    systemVersionCommitIdentity: sha256Canonical({
      version: "p3-r3-context-policy-benchmark-subject-v1",
      p3R2ImplementationMerge: P3_R3_P3_R2_IMPLEMENTATION_MERGE,
      policyIdentity: application.policyIdentity,
      applicationIdentity: application.applicationIdentity,
    }),
  }
}

function validateSubjectBindings(
  relationSet: P2R5RelationSet,
  leftApplication: ContextSelectionPolicyApplication,
  rightApplication: ContextSelectionPolicyApplication,
): void {
  const left = derivedSubjectBinding(leftApplication)
  const right = derivedSubjectBinding(rightApplication)

  if (relationSet.left_subject.subject_id !== left.subjectId) {
    fail("trusted P2 left subject_id does not bind the trusted left P3-R2 application")
  }
  if (relationSet.right_subject.subject_id !== right.subjectId) {
    fail("trusted P2 right subject_id does not bind the trusted right P3-R2 application")
  }
  if (relationSet.left_subject.system_version_commit_identity !== left.systemVersionCommitIdentity) {
    fail("trusted P2 left system_version_commit_identity does not bind the trusted left P3-R2 application")
  }
  if (relationSet.right_subject.system_version_commit_identity !== right.systemVersionCommitIdentity) {
    fail("trusted P2 right system_version_commit_identity does not bind the trusted right P3-R2 application")
  }
}

function metricEvidenceState(metrics: readonly P2R5MetricRelation[]): P3R3MetricEvidenceState {
  if (metrics.every((metric) => metric.status === "COMPARABLE")) {
    return "all-required-metrics-comparable"
  }
  if (!metrics.some((metric) => metric.status === "INSUFFICIENT_EVIDENCE")) {
    fail("trusted P2-R5 metric statuses are outside the closed comparability state machine")
  }
  return "one-or-more-required-metrics-insufficient"
}

export function buildContextPolicyPairwiseMetricEvidence(
  planRequestValue: unknown,
  leftPolicyValue: unknown,
  rightPolicyValue: unknown,
  p2R4ComparisonValue: unknown,
  evidenceDeclarationValue: unknown,
): ContextPolicyPairwiseMetricEvidence {
  const leftApplication = applyDeclaredContextSelectionPolicy(planRequestValue, leftPolicyValue)
  const rightApplication = applyDeclaredContextSelectionPolicy(planRequestValue, rightPolicyValue)
  validateApplicationPair(leftApplication, rightApplication)

  const relationSet = deriveP2R5Relations(p2R4ComparisonValue)
  const declaration = normalizeDeclaration(evidenceDeclarationValue, relationSet)
  validateSubjectBindings(relationSet, leftApplication, rightApplication)
  const metricRelations = validateMetricCoverage(relationSet, declaration)
  const state = metricEvidenceState(metricRelations)

  p2Identity(relationSet.r4_comparison_identity, "trusted P2-R5 r4_comparison_identity")
  p2Identity(relationSet.relation_set_identity, "trusted P2-R5 relation_set_identity")
  p2Identity(
    relationSet.shared_evaluation_context_identity,
    "trusted P2-R5 shared_evaluation_context_identity",
  )
  p2Identity(relationSet.comparison_policy_identity, "trusted P2-R5 comparison_policy_identity")

  const base = {
    version: P3_R3_METRIC_EVIDENCE_VERSION,
    kind: P3_R3_METRIC_EVIDENCE_KIND,
    qualificationId: declaration.qualificationId,
    p3R2ImplementationMerge: P3_R3_P3_R2_IMPLEMENTATION_MERGE,
    planIdentity: leftApplication.planIdentity,
    requestIdentity: leftApplication.requestIdentity,
    candidateSetIdentity: leftApplication.candidateSetIdentity,
    repositoryIdentity: leftApplication.repositoryIdentity,
    snapshotIdentity: leftApplication.snapshotIdentity,
    contentIdentity: leftApplication.contentIdentity,
    taskIdentity: leftApplication.taskIdentity,
    leftPolicyId: leftApplication.policyId,
    leftPolicyIdentity: leftApplication.policyIdentity,
    leftApplicationIdentity: leftApplication.applicationIdentity,
    leftApplicationState: leftApplication.state,
    rightPolicyId: rightApplication.policyId,
    rightPolicyIdentity: rightApplication.policyIdentity,
    rightApplicationIdentity: rightApplication.applicationIdentity,
    rightApplicationState: rightApplication.state,
    benchmarkId: relationSet.benchmark_id,
    benchmarkProtocolVersion: relationSet.benchmark_protocol_version,
    r4ComparisonIdentity: relationSet.r4_comparison_identity,
    r5RelationSetIdentity: relationSet.relation_set_identity,
    sharedEvaluationContextIdentity: relationSet.shared_evaluation_context_identity,
    comparisonPolicyIdentity: relationSet.comparison_policy_identity,
    leftSubject: relationSet.left_subject,
    rightSubject: relationSet.right_subject,
    taskFamily: P3_R3_TASK_FAMILY,
    dimensionMetricBindings: declaration.dimensionMetricBindings,
    metricRelations,
    metricEvidenceState: state,
  }
  const evidenceIdentity = sha256Canonical(base)

  return deepFreeze({
    version: base.version,
    kind: base.kind,
    evidenceIdentity,
    qualificationId: base.qualificationId,
    p3R2ImplementationMerge: base.p3R2ImplementationMerge,
    planIdentity: base.planIdentity,
    requestIdentity: base.requestIdentity,
    candidateSetIdentity: base.candidateSetIdentity,
    repositoryIdentity: base.repositoryIdentity,
    snapshotIdentity: base.snapshotIdentity,
    contentIdentity: base.contentIdentity,
    taskIdentity: base.taskIdentity,
    leftPolicyId: base.leftPolicyId,
    leftPolicyIdentity: base.leftPolicyIdentity,
    leftApplicationIdentity: base.leftApplicationIdentity,
    leftApplicationState: base.leftApplicationState,
    rightPolicyId: base.rightPolicyId,
    rightPolicyIdentity: base.rightPolicyIdentity,
    rightApplicationIdentity: base.rightApplicationIdentity,
    rightApplicationState: base.rightApplicationState,
    benchmarkId: base.benchmarkId,
    benchmarkProtocolVersion: base.benchmarkProtocolVersion,
    r4ComparisonIdentity: base.r4ComparisonIdentity,
    r5RelationSetIdentity: base.r5RelationSetIdentity,
    sharedEvaluationContextIdentity: base.sharedEvaluationContextIdentity,
    comparisonPolicyIdentity: base.comparisonPolicyIdentity,
    leftSubject: base.leftSubject,
    rightSubject: base.rightSubject,
    taskFamily: base.taskFamily,
    dimensionMetricBindings: base.dimensionMetricBindings,
    metricRelations: base.metricRelations,
    metricEvidenceState: base.metricEvidenceState,
  })
}
