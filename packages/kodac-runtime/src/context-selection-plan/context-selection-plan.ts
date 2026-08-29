import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

import {
  K3_R6_COMPLETENESS_REASONS,
  K3_R6_EVIDENCE_CLASSES,
  K3_R6_ENTITY_KINDS,
  K3_R6_IMPACT_RELATION_KINDS,
  K3_R6_LIMITS,
  K3_R6_QUERY_KINDS,
  K3_R6_RELATION_KINDS,
  K3_R6_RELATION_QUERY_VERSION,
  K3_R6_RELATION_RESULT_VERSION,
  type RelationEntity,
  type RelationGraphQueryResult,
  type RelationKind,
  type RelationQueryHit,
  type RelationQueryKind,
} from "../relation-graph/contracts.ts"
import {
  P3_R1_COMPLETENESS_REASONS,
  P3_R1_CONTEXT_SELECTION_PLAN_KIND,
  P3_R1_CONTEXT_SELECTION_PLAN_VERSION,
  P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
  P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
  P3_R1_EVIDENCE_LANES,
  P3_R1_LIMITS,
  P3_R1_SOURCE_KINDS,
  type ContextCandidateSourceKind,
  type ContextEvidenceLane,
  type ContextSelectionCandidate,
  type ContextSelectionCompleteness,
  type ContextSelectionCompletenessReason,
  type ContextSelectionPlan,
  type ContextSelectionRelationBinding,
} from "./contracts.ts"

const SHA256 = /^[0-9a-f]{64}$/
const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const LANE_SET = new Set<string>(P3_R1_EVIDENCE_LANES)
const SOURCE_KIND_SET = new Set<string>(P3_R1_SOURCE_KINDS)
const COMPLETENESS_REASON_SET = new Set<string>(P3_R1_COMPLETENESS_REASONS)
const EVIDENCE_CLASS_SET = new Set<string>(K3_R6_EVIDENCE_CLASSES)
const QUERY_KIND_SET = new Set<string>(K3_R6_QUERY_KINDS)
const ENTITY_KIND_SET = new Set<string>(K3_R6_ENTITY_KINDS)
const RELATION_KIND_SET = new Set<string>(K3_R6_RELATION_KINDS)
const K3_COMPLETENESS_REASON_SET = new Set<string>(K3_R6_COMPLETENESS_REASONS)

type UnknownRecord = Record<string, unknown>

const REQUEST_KEYS = [
  "version", "kind", "taskIdentity", "repositoryIdentity", "snapshotIdentity", "contentIdentity",
  "candidates", "relationResults", "maxItems", "maxUtf8Bytes", "completeness",
] as const
const CANDIDATE_KEYS = [
  "candidateId", "repositoryIdentity", "snapshotIdentity", "contentIdentity", "lane", "sourceKind",
  "sourceIdentity", "evidenceClass", "subjectPath", "utf8Bytes", "groupingKey", "planReasons",
  "provenanceRefs", "relationResultIdentity",
] as const
const COMPLETENESS_KEYS = ["state", "reasons", "omittedAtLeast"] as const
const RESULT_KEYS = [
  "version", "resultIdentity", "queryIdentity", "kind", "graphIdentity", "repositoryIdentity",
  "snapshotIdentity", "contentIdentity", "seedNodeIdentity", "relations", "maxDepth", "maxResults",
  "completeness", "hits",
] as const
const K3_COMPLETENESS_KEYS = ["state", "reasons", "omittedAtLeast", "excludedAmbiguousEdgeIdentities"] as const
const HIT_KEYS = ["nodeIdentity", "entity", "depth", "chainIdentity", "edgeIdentities"] as const
const ENTITY_KEYS = ["kind", "path", "symbol", "qualifiedName", "sourceSpan"] as const
const SPAN_KEYS = ["path", "startLine", "startColumn", "endLine", "endColumn"] as const

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

function canonicalize(value: unknown, ancestors = new WeakSet<object>()): string {
  if (value === null || typeof value !== "object") {
    const serialized = JSON.stringify(value)
    if (serialized === undefined) throw new TypeError("canonical value is not JSON-serializable")
    return serialized
  }
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

function exactKeys(record: UnknownRecord, allowed: readonly string[], required: readonly string[], label: string): void {
  const allowedSet = new Set(allowed)
  for (const key of Object.keys(record)) if (!allowedSet.has(key)) throw new TypeError(`${label} contains unknown field: ${key}`)
  for (const key of required) if (!Object.hasOwn(record, key)) throw new TypeError(`${label} is missing required field: ${key}`)
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

function nonNegativeInteger(value: unknown, label: string, maximum: number): number {
  if (!Number.isSafeInteger(value) || (value as number) < 0 || (value as number) > maximum) {
    throw new RangeError(`${label} must be an integer between 0 and ${maximum}`)
  }
  return value as number
}

function canonicalPath(value: unknown, label: string): string {
  const path = boundedString(value, label, P3_R1_LIMITS.maxPathBytes)
  if (path.includes("\\") || path.startsWith("/") || /^[A-Za-z]:\//.test(path)) throw new TypeError(`${label} must be a workspace-relative slash path`)
  const segments = path.split("/")
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) throw new TypeError(`${label} contains an unsafe or ambiguous segment`)
  return path
}

function enumValue<T extends string>(value: unknown, allowed: ReadonlySet<string>, label: string): T {
  if (typeof value !== "string" || !allowed.has(value)) throw new TypeError(`${label} is unsupported`)
  return value as T
}

function canonicalStringArray(value: unknown, label: string, maximum: number, maximumBytes: number): readonly string[] {
  const values = denseArrayValues(value, label, maximum)
  const normalized = values.map((item, index) => boundedString(item, `${label}[${index}]`, maximumBytes))
  if (new Set(normalized).size !== normalized.length) throw new TypeError(`${label} contains duplicate values`)
  return Object.freeze(normalized.sort(compareStrings))
}

function orderedDigestArray(value: unknown, label: string, maximum: number): readonly string[] {
  const values = denseArrayValues(value, label, maximum)
  const normalized = values.map((item, index) => digest(item, `${label}[${index}]`))
  if (new Set(normalized).size !== normalized.length) throw new TypeError(`${label} contains duplicate identities`)
  return Object.freeze(normalized)
}

function deepFreeze<T>(value: T, ancestors = new WeakSet<object>()): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    if (ancestors.has(value)) throw new TypeError("normalized context selection plan must not be cyclic")
    ancestors.add(value)
    for (const nested of Object.values(value as UnknownRecord)) deepFreeze(nested, ancestors)
    ancestors.delete(value)
    Object.freeze(value)
  }
  return value
}

function p3Completeness(value: unknown, label: string): ContextSelectionCompleteness {
  const record = asRecord(value, label)
  exactKeys(record, COMPLETENESS_KEYS, COMPLETENESS_KEYS, label)
  if (record.state !== "complete" && record.state !== "incomplete") throw new TypeError(`${label}.state is unsupported`)
  const reasons = denseArrayValues(record.reasons, `${label}.reasons`, P3_R1_COMPLETENESS_REASONS.length)
    .map((item, index) => enumValue<ContextSelectionCompletenessReason>(item, COMPLETENESS_REASON_SET, `${label}.reasons[${index}]`))
    .sort(compareStrings)
  if (new Set(reasons).size !== reasons.length) throw new TypeError(`${label}.reasons contains duplicates`)
  const omittedAtLeast = nonNegativeInteger(record.omittedAtLeast, `${label}.omittedAtLeast`, P3_R1_LIMITS.maxOmittedAtLeast)
  if (record.state === "complete" && (reasons.length !== 0 || omittedAtLeast !== 0)) throw new TypeError(`${label} complete metadata is inconsistent`)
  if (record.state === "incomplete" && reasons.length === 0 && omittedAtLeast === 0) throw new TypeError(`${label} incomplete metadata must explain incompleteness`)
  return Object.freeze({ state: record.state, reasons: Object.freeze(reasons), omittedAtLeast })
}

function sourceSpan(value: unknown, label: string): RelationEntity["sourceSpan"] {
  if (value === null) return null
  const record = asRecord(value, label)
  exactKeys(record, SPAN_KEYS, SPAN_KEYS, label)
  const path = canonicalPath(record.path, `${label}.path`)
  const startLine = positiveInteger(record.startLine, `${label}.startLine`, Number.MAX_SAFE_INTEGER)
  const startColumn = positiveInteger(record.startColumn, `${label}.startColumn`, Number.MAX_SAFE_INTEGER)
  const endLine = positiveInteger(record.endLine, `${label}.endLine`, Number.MAX_SAFE_INTEGER)
  const endColumn = positiveInteger(record.endColumn, `${label}.endColumn`, Number.MAX_SAFE_INTEGER)
  if (endLine < startLine || (endLine === startLine && endColumn < startColumn)) throw new RangeError(`${label} must end at or after its start`)
  return Object.freeze({ path, startLine, startColumn, endLine, endColumn })
}

function entity(value: unknown, label: string): RelationEntity {
  const record = asRecord(value, label)
  exactKeys(record, ENTITY_KEYS, ENTITY_KEYS, label)
  const kind = enumValue<RelationEntity["kind"]>(record.kind, ENTITY_KIND_SET, `${label}.kind`)
  const path = canonicalPath(record.path, `${label}.path`)
  if (kind === "file") {
    if (record.symbol !== null || record.qualifiedName !== null || record.sourceSpan !== null) throw new TypeError(`${label} file entity has non-null symbol fields`)
    return Object.freeze({ kind, path, symbol: null, qualifiedName: null, sourceSpan: null })
  }
  const symbol = boundedString(record.symbol, `${label}.symbol`, K3_R6_LIMITS.maxSymbolBytes)
  const qualifiedName = record.qualifiedName === null ? null : boundedString(record.qualifiedName, `${label}.qualifiedName`, K3_R6_LIMITS.maxQualifiedNameBytes)
  const span = sourceSpan(record.sourceSpan, `${label}.sourceSpan`)
  if (span && span.path !== path) throw new TypeError(`${label}.sourceSpan.path must equal entity.path`)
  return Object.freeze({ kind, path, symbol, qualifiedName, sourceSpan: span })
}

function entitySelector(value: RelationEntity): string {
  return canonicalize(value)
}

function relationHit(value: unknown, graphIdentity: string, label: string): RelationQueryHit {
  const record = asRecord(value, label)
  exactKeys(record, HIT_KEYS, HIT_KEYS, label)
  const normalizedEntity = entity(record.entity, `${label}.entity`)
  const nodeIdentity = digest(record.nodeIdentity, `${label}.nodeIdentity`)
  const depth = positiveInteger(record.depth, `${label}.depth`, K3_R6_LIMITS.maxQueryDepth)
  const edgeIdentities = orderedDigestArray(record.edgeIdentities, `${label}.edgeIdentities`, K3_R6_LIMITS.maxEvidenceChainEdges)
  if (edgeIdentities.length !== depth) throw new TypeError(`${label}.edgeIdentities length must equal depth`)
  const chainIdentity = digest(record.chainIdentity, `${label}.chainIdentity`)
  const expectedChain = sha256({ version: K3_R6_RELATION_RESULT_VERSION, graphIdentity, edgeIdentities })
  if (chainIdentity !== expectedChain) throw new TypeError(`${label}.chainIdentity mismatch`)
  return Object.freeze({ nodeIdentity, entity: normalizedEntity, depth, chainIdentity, edgeIdentities })
}

function hitOrder(left: RelationQueryHit, right: RelationQueryHit): number {
  return left.depth - right.depth || compareStrings(left.entity.path, right.entity.path) || compareStrings(entitySelector(left.entity), entitySelector(right.entity)) || compareStrings(left.chainIdentity, right.chainIdentity)
}

function relationResult(value: unknown, binding: { repositoryIdentity: string, snapshotIdentity: string, contentIdentity: string }, label: string): RelationGraphQueryResult {
  const record = asRecord(value, label)
  exactKeys(record, RESULT_KEYS, RESULT_KEYS, label)
  if (record.version !== K3_R6_RELATION_RESULT_VERSION) throw new TypeError(`${label}.version is unsupported`)
  const kind = enumValue<RelationQueryKind>(record.kind, QUERY_KIND_SET, `${label}.kind`)
  const graphIdentity = digest(record.graphIdentity, `${label}.graphIdentity`)
  const repositoryIdentity = digest(record.repositoryIdentity, `${label}.repositoryIdentity`)
  const snapshotIdentity = digest(record.snapshotIdentity, `${label}.snapshotIdentity`)
  const contentIdentity = digest(record.contentIdentity, `${label}.contentIdentity`)
  if (repositoryIdentity !== binding.repositoryIdentity || snapshotIdentity !== binding.snapshotIdentity || contentIdentity !== binding.contentIdentity) {
    throw new TypeError(`${label} binding does not match the P3-R1 request`)
  }
  const seedNodeIdentity = digest(record.seedNodeIdentity, `${label}.seedNodeIdentity`)
  const relationValues = denseArrayValues(record.relations, `${label}.relations`, K3_R6_RELATION_KINDS.length)
  const relations = Object.freeze(relationValues.map((item, index) => enumValue<RelationKind>(item, RELATION_KIND_SET, `${label}.relations[${index}]`)))
  const expectedRelations: readonly RelationKind[] = kind === "impact" ? K3_R6_IMPACT_RELATION_KINDS : K3_R6_RELATION_KINDS
  if (relations.length !== expectedRelations.length || relations.some((relation, index) => relation !== expectedRelations[index])) throw new TypeError(`${label}.relations is not canonical for query kind`)
  const maxDepth = positiveInteger(record.maxDepth, `${label}.maxDepth`, K3_R6_LIMITS.maxQueryDepth)
  const maxResults = positiveInteger(record.maxResults, `${label}.maxResults`, K3_R6_LIMITS.maxQueryResults)
  const queryIdentity = digest(record.queryIdentity, `${label}.queryIdentity`)
  const expectedQuery = sha256({
    version: K3_R6_RELATION_QUERY_VERSION, kind, graphIdentity, repositoryIdentity, snapshotIdentity, contentIdentity,
    seedNodeIdentity, relations, maxDepth, maxResults,
  })
  if (queryIdentity !== expectedQuery) throw new TypeError(`${label}.queryIdentity mismatch`)

  const completenessRecord = asRecord(record.completeness, `${label}.completeness`)
  exactKeys(completenessRecord, K3_COMPLETENESS_KEYS, K3_COMPLETENESS_KEYS, `${label}.completeness`)
  if (completenessRecord.state !== "complete" && completenessRecord.state !== "incomplete") throw new TypeError(`${label}.completeness.state is unsupported`)
  const reasons = denseArrayValues(completenessRecord.reasons, `${label}.completeness.reasons`, K3_R6_COMPLETENESS_REASONS.length)
    .map((item, index) => enumValue<RelationGraphQueryResult["completeness"]["reasons"][number]>(item, K3_COMPLETENESS_REASON_SET, `${label}.completeness.reasons[${index}]`))
    .sort(compareStrings)
  if (new Set(reasons).size !== reasons.length) throw new TypeError(`${label}.completeness.reasons contains duplicates`)
  const omittedAtLeast = nonNegativeInteger(completenessRecord.omittedAtLeast, `${label}.completeness.omittedAtLeast`, P3_R1_LIMITS.maxOmittedAtLeast)
  const excludedAmbiguousEdgeIdentities = canonicalStringArray(completenessRecord.excludedAmbiguousEdgeIdentities, `${label}.completeness.excludedAmbiguousEdgeIdentities`, K3_R6_LIMITS.maxEdges, 64)
  for (const edgeIdentity of excludedAmbiguousEdgeIdentities) if (!SHA256.test(edgeIdentity)) throw new TypeError(`${label}.completeness excluded edge identity is invalid`)
  if (completenessRecord.state === "complete" && (reasons.length !== 0 || omittedAtLeast !== 0 || excludedAmbiguousEdgeIdentities.length !== 0)) throw new TypeError(`${label}.completeness complete metadata is inconsistent`)
  if (completenessRecord.state === "incomplete" && reasons.length === 0) throw new TypeError(`${label}.completeness incomplete metadata must contain a reason`)
  const completeness = Object.freeze({ state: completenessRecord.state, reasons: Object.freeze(reasons), omittedAtLeast, excludedAmbiguousEdgeIdentities })

  const hits = denseArrayValues(record.hits, `${label}.hits`, K3_R6_LIMITS.maxQueryResults).map((item, index) => relationHit(item, graphIdentity, `${label}.hits[${index}]`))
  for (let index = 1; index < hits.length; index++) if (hitOrder(hits[index - 1], hits[index]) > 0) throw new TypeError(`${label}.hits is not in canonical K3-R6 order`)
  if (new Set(hits.map((hit) => hit.nodeIdentity)).size !== hits.length) throw new TypeError(`${label}.hits contains duplicate nodes`)
  const frozenHits = Object.freeze(hits)
  const base = {
    version: K3_R6_RELATION_RESULT_VERSION,
    queryIdentity, kind, graphIdentity, repositoryIdentity, snapshotIdentity, contentIdentity, seedNodeIdentity,
    relations, maxDepth, maxResults, completeness, hits: frozenHits,
  }
  const resultIdentity = digest(record.resultIdentity, `${label}.resultIdentity`)
  if (resultIdentity !== sha256(base)) throw new TypeError(`${label}.resultIdentity mismatch`)
  return deepFreeze({ ...base, resultIdentity })
}

function normalizeCandidate(value: unknown, binding: { repositoryIdentity: string, snapshotIdentity: string, contentIdentity: string }, relationIds: ReadonlySet<string>, label: string): ContextSelectionCandidate {
  const record = asRecord(value, label)
  exactKeys(record, CANDIDATE_KEYS, CANDIDATE_KEYS.filter((key) => key !== "relationResultIdentity"), label)
  const repositoryIdentity = digest(record.repositoryIdentity, `${label}.repositoryIdentity`)
  const snapshotIdentity = digest(record.snapshotIdentity, `${label}.snapshotIdentity`)
  const contentIdentity = digest(record.contentIdentity, `${label}.contentIdentity`)
  if (repositoryIdentity !== binding.repositoryIdentity || snapshotIdentity !== binding.snapshotIdentity || contentIdentity !== binding.contentIdentity) throw new TypeError(`${label} binding does not match the request`)
  const candidateId = stableId(record.candidateId, `${label}.candidateId`)
  const lane = enumValue<ContextEvidenceLane>(record.lane, LANE_SET, `${label}.lane`)
  const sourceKind = enumValue<ContextCandidateSourceKind>(record.sourceKind, SOURCE_KIND_SET, `${label}.sourceKind`)
  const sourceIdentity = digest(record.sourceIdentity, `${label}.sourceIdentity`)
  const evidenceClass = enumValue<ContextSelectionCandidate["evidenceClass"]>(record.evidenceClass, EVIDENCE_CLASS_SET, `${label}.evidenceClass`)
  const subjectPath = canonicalPath(record.subjectPath, `${label}.subjectPath`)
  const utf8Bytes = positiveInteger(record.utf8Bytes, `${label}.utf8Bytes`, P3_R1_LIMITS.maxCandidateUtf8Bytes)
  const groupingKey = stableId(record.groupingKey, `${label}.groupingKey`)
  const planReasons = canonicalStringArray(record.planReasons, `${label}.planReasons`, P3_R1_LIMITS.maxPlanReasons, P3_R1_LIMITS.maxPlanReasonBytes)
  const provenanceRefs = canonicalStringArray(record.provenanceRefs, `${label}.provenanceRefs`, P3_R1_LIMITS.maxProvenanceRefs, P3_R1_LIMITS.maxProvenanceRefBytes)
  const relationResultIdentity = record.relationResultIdentity === undefined ? null : digest(record.relationResultIdentity, `${label}.relationResultIdentity`)
  if (sourceKind === "relation-query-hit") {
    if (relationResultIdentity === null || !relationIds.has(relationResultIdentity)) throw new TypeError(`${label} relation-query-hit must reference a supplied validated relation result`)
    if (lane !== "relation-impact") throw new TypeError(`${label} relation-query-hit must use relation-impact lane`)
  } else if (relationResultIdentity !== null) {
    throw new TypeError(`${label} only relation-query-hit candidates may bind relationResultIdentity`)
  }
  const normalizedBase = {
    candidateId, repositoryIdentity, snapshotIdentity, contentIdentity, lane, sourceKind, sourceIdentity,
    evidenceClass, subjectPath, utf8Bytes, groupingKey, planReasons, provenanceRefs, relationResultIdentity,
  }
  return deepFreeze({ candidateIdentity: sha256({ version: P3_R1_CONTEXT_SELECTION_PLAN_VERSION, ...normalizedBase }), ...normalizedBase })
}

function safeAdd(left: number, right: number, label: string): number {
  const result = left + right
  if (!Number.isSafeInteger(result) || result > P3_R1_LIMITS.maxOmittedAtLeast) throw new RangeError(`${label} exceeds the supported deterministic bound`)
  return result
}

export function buildContextSelectionPlan(inputValue: unknown): ContextSelectionPlan {
  const request = asRecord(inputValue, "contextSelectionRequest")
  exactKeys(request, REQUEST_KEYS, REQUEST_KEYS.filter((key) => key !== "relationResults"), "contextSelectionRequest")
  if (request.version !== P3_R1_CONTEXT_SELECTION_REQUEST_VERSION || request.kind !== P3_R1_CONTEXT_SELECTION_REQUEST_KIND) throw new TypeError("unsupported P3-R1 context selection request contract")
  const taskIdentity = boundedString(request.taskIdentity, "contextSelectionRequest.taskIdentity", P3_R1_LIMITS.maxTaskIdentityBytes)
  if (!STABLE_ID.test(taskIdentity)) throw new TypeError("contextSelectionRequest.taskIdentity must use the stable-id alphabet")
  const binding = {
    repositoryIdentity: digest(request.repositoryIdentity, "contextSelectionRequest.repositoryIdentity"),
    snapshotIdentity: digest(request.snapshotIdentity, "contextSelectionRequest.snapshotIdentity"),
    contentIdentity: digest(request.contentIdentity, "contextSelectionRequest.contentIdentity"),
  }
  const maxItems = positiveInteger(request.maxItems, "contextSelectionRequest.maxItems", P3_R1_LIMITS.maxItems)
  const maxUtf8Bytes = positiveInteger(request.maxUtf8Bytes, "contextSelectionRequest.maxUtf8Bytes", P3_R1_LIMITS.maxUtf8Bytes)
  const callerCompleteness = p3Completeness(request.completeness, "contextSelectionRequest.completeness")

  const relationValues = request.relationResults === undefined ? [] : denseArrayValues(request.relationResults, "contextSelectionRequest.relationResults", P3_R1_LIMITS.maxRelationResults)
  const relationResults = relationValues.map((item, index) => relationResult(item, binding, `contextSelectionRequest.relationResults[${index}]`)).sort((left, right) => compareStrings(left.resultIdentity, right.resultIdentity))
  if (new Set(relationResults.map((result) => result.resultIdentity)).size !== relationResults.length) throw new TypeError("contextSelectionRequest.relationResults contains duplicate results")
  const relationIds = new Set(relationResults.map((result) => result.resultIdentity))
  const relationEvidence: ContextSelectionRelationBinding[] = relationResults.map((result) => Object.freeze({
    resultIdentity: result.resultIdentity,
    queryIdentity: result.queryIdentity,
    graphIdentity: result.graphIdentity,
    kind: result.kind,
    repositoryIdentity: result.repositoryIdentity,
    snapshotIdentity: result.snapshotIdentity,
    contentIdentity: result.contentIdentity,
    completeness: Object.freeze({
      state: result.completeness.state,
      reasons: Object.freeze(result.completeness.state === "complete" ? [] : ["relation-evidence-incomplete"] as ContextSelectionCompletenessReason[]),
      omittedAtLeast: result.completeness.omittedAtLeast,
    }),
  }))

  const candidateValues = denseArrayValues(request.candidates, "contextSelectionRequest.candidates", P3_R1_LIMITS.maxCandidates)
  const byCandidateId = new Map<string, ContextSelectionCandidate>()
  for (const [index, item] of candidateValues.entries()) {
    const candidate = normalizeCandidate(item, binding, relationIds, `contextSelectionRequest.candidates[${index}]`)
    const prior = byCandidateId.get(candidate.candidateId)
    if (prior && prior.candidateIdentity !== candidate.candidateIdentity) throw new TypeError(`conflicting duplicate candidateId: ${candidate.candidateId}`)
    if (!prior) byCandidateId.set(candidate.candidateId, candidate)
  }
  const candidates = Object.freeze([...byCandidateId.values()].sort((left, right) => compareStrings(left.candidateIdentity, right.candidateIdentity)))
  const candidateSetIdentity = sha256({ version: P3_R1_CONTEXT_SELECTION_PLAN_VERSION, ...binding, candidateIdentities: candidates.map((candidate) => candidate.candidateIdentity) })

  let candidateUtf8Bytes = 0
  for (const candidate of candidates) candidateUtf8Bytes = safeAdd(candidateUtf8Bytes, candidate.utf8Bytes, "candidate UTF-8 byte total")
  const withinBudget = candidates.length <= maxItems && candidateUtf8Bytes <= maxUtf8Bytes
  const budget = Object.freeze({ maxItems, maxUtf8Bytes, candidateCount: candidates.length, candidateUtf8Bytes, withinBudget })

  const completenessReasons = new Set<ContextSelectionCompletenessReason>(callerCompleteness.reasons)
  let omittedAtLeast = callerCompleteness.omittedAtLeast
  for (const result of relationResults) {
    if (result.completeness.state === "incomplete") completenessReasons.add("relation-evidence-incomplete")
    omittedAtLeast = safeAdd(omittedAtLeast, result.completeness.omittedAtLeast, "combined omittedAtLeast")
  }
  const reasons = Object.freeze([...completenessReasons].sort(compareStrings))
  const completeness = Object.freeze({
    state: reasons.length === 0 && omittedAtLeast === 0 ? "complete" as const : "incomplete" as const,
    reasons,
    omittedAtLeast,
  })
  const abstention = candidates.length === 0
    ? Object.freeze({ state: "insufficient-evidence" as const, reason: "insufficient-evidence" as const })
    : Object.freeze({ state: "not-abstained" as const, reason: null })
  const state = candidates.length === 0 ? "insufficient-evidence" as const : withinBudget ? "ready-for-policy" as const : "budget-exceeded" as const
  const frozenRelationEvidence = Object.freeze(relationEvidence)
  const requestIdentity = sha256({
    version: P3_R1_CONTEXT_SELECTION_REQUEST_VERSION,
    kind: P3_R1_CONTEXT_SELECTION_REQUEST_KIND,
    taskIdentity,
    ...binding,
    candidateSetIdentity,
    relationResultIdentities: relationResults.map((result) => result.resultIdentity),
    maxItems,
    maxUtf8Bytes,
    completeness: callerCompleteness,
  })
  const base = {
    version: P3_R1_CONTEXT_SELECTION_PLAN_VERSION,
    kind: P3_R1_CONTEXT_SELECTION_PLAN_KIND,
    requestIdentity,
    candidateSetIdentity,
    taskIdentity,
    ...binding,
    state,
    candidates,
    relationEvidence: frozenRelationEvidence,
    budget,
    completeness,
    abstention,
  }
  return deepFreeze({ ...base, planIdentity: sha256(base) })
}
