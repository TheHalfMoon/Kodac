import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

import {
  K3_R2_SNAPSHOT_CONTRACT_VERSION,
  isFullGitObjectId,
  type RepositoryEvidenceClass,
  type RepositorySnapshot,
} from "../repository/contracts.ts"
import {
  K3_R6_COMPLETENESS_REASONS,
  K3_R6_ENTITY_KINDS,
  K3_R6_EVIDENCE_CLASSES,
  K3_R6_IMPACT_RELATION_KINDS,
  K3_R6_LIMITS,
  K3_R6_QUERY_KINDS,
  K3_R6_RELATION_GRAPH_VERSION,
  K3_R6_RELATION_KINDS,
  K3_R6_RELATION_QUERY_VERSION,
  K3_R6_RELATION_RESULT_VERSION,
  K3_R6_RESOLUTION_STATES,
  type RelationCompletenessReason,
  type RelationEdge,
  type RelationEntity,
  type RelationGraph,
  type RelationGraphInput,
  type RelationGraphQueryInput,
  type RelationGraphQueryResult,
  type RelationKind,
  type RelationNode,
  type RelationProducer,
  type RelationQueryHit,
  type RelationQueryKind,
  type RelationResolutionState,
  type RelationSourceSpan,
} from "./contracts.ts"

const SHA256 = /^[0-9a-f]{64}$/
const PRODUCER_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]*$/
const RELATION_SET = new Set<string>(K3_R6_RELATION_KINDS)
const IMPACT_RELATION_SET = new Set<string>(K3_R6_IMPACT_RELATION_KINDS)
const ENTITY_SET = new Set<string>(K3_R6_ENTITY_KINDS)
const RESOLUTION_SET = new Set<string>(K3_R6_RESOLUTION_STATES)
const QUERY_SET = new Set<string>(K3_R6_QUERY_KINDS)
const EVIDENCE_SET = new Set<string>(K3_R6_EVIDENCE_CLASSES)

const GRAPH_INPUT_KEYS = ["snapshot", "producers", "nodes", "edges"] as const
const SNAPSHOT_KEYS = [
  "version", "repositoryIdentity", "contentIdentity", "snapshotIdentity", "gitHead", "freshness",
  "completeness", "workingTree", "inventory", "sources", "evidence",
] as const
const PRODUCER_KEYS = ["producerId", "repositoryIdentity", "snapshotIdentity", "contentIdentity", "provenanceRefs"] as const
const NODE_CLAIM_KEYS = [
  "producerId", "repositoryIdentity", "snapshotIdentity", "contentIdentity", "evidenceClass",
  "sourceEvidenceIdentity", "provenanceRefs", "entity",
] as const
const EDGE_CLAIM_KEYS = [
  "producerId", "repositoryIdentity", "snapshotIdentity", "contentIdentity", "evidenceClass",
  "sourceEvidenceIdentity", "provenanceRefs", "relation", "resolution", "source", "target", "relationSite",
] as const
const ENTITY_INPUT_KEYS = ["kind", "path", "symbol", "qualifiedName", "sourceSpan"] as const
const ENTITY_KEYS = ["kind", "path", "symbol", "qualifiedName", "sourceSpan"] as const
const SPAN_KEYS = ["path", "startLine", "startColumn", "endLine", "endColumn"] as const
const GRAPH_KEYS = [
  "version", "graphIdentity", "producerSetIdentity", "repositoryIdentity", "snapshotIdentity",
  "contentIdentity", "gitHead", "freshness", "producers", "nodes", "edges",
] as const
const NODE_KEYS = [
  "nodeIdentity", "producerId", "evidenceClass", "sourceEvidenceIdentity", "provenanceRefs", "entity",
] as const
const EDGE_KEYS = [
  "edgeIdentity", "producerId", "evidenceClass", "sourceEvidenceIdentity", "provenanceRefs", "relation",
  "resolution", "sourceNodeIdentity", "targetNodeIdentity", "relationSite",
] as const
const QUERY_KEYS = [
  "version", "kind", "graphIdentity", "repositoryIdentity", "snapshotIdentity", "contentIdentity", "seed",
  "maxDepth", "maxResults",
] as const

type UnknownRecord = Record<string, unknown>

interface SnapshotBinding {
  repositoryIdentity: string
  snapshotIdentity: string
  contentIdentity: string
}

interface CanonicalSnapshot {
  binding: SnapshotBinding
  gitHead: string
  inventoryFiles: ReadonlySet<string>
}

interface TraversalState {
  nodeIdentity: string
  edgeIdentities: readonly string[]
}

interface Transition {
  edge: RelationEdge
  nextNodeIdentity: string
}

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
  const lengthDescriptor = descriptors["length"]
  if (lengthDescriptor === undefined || !("value" in lengthDescriptor) || typeof lengthDescriptor.value !== "number" || !Number.isSafeInteger(lengthDescriptor.value) || lengthDescriptor.value < 0) {
    throw new TypeError(`${label}.length is invalid`)
  }
  const length: number = lengthDescriptor.value
  if (length > maximum) throw new RangeError(`${label} exceeds ${maximum} entries`)
  const expectedKeys = new Set(["length", ...Array.from({ length }, (_, index) => String(index))])
  for (const [key, descriptor] of Object.entries(descriptors)) {
    if (!expectedKeys.has(key)) throw new TypeError(`${label} contains unexpected array field: ${key}`)
    if (key !== "length" && (!("value" in descriptor) || !descriptor.enumerable)) {
      throw new TypeError(`${label}[${key}] must be an enumerable data property`)
    }
  }
  const result: unknown[] = []
  for (let index = 0; index < length; index++) {
    const descriptor = descriptors[String(index)]
    if (descriptor === undefined || !("value" in descriptor)) throw new TypeError(`${label} must be dense`)
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
    return `{${Object.keys(record)
      .sort(compareStrings)
      .map((key) => `${JSON.stringify(key)}:${canonicalize(record[key], ancestors)}`)
      .join(",")}}`
  } finally {
    ancestors.delete(value)
  }
}

function sha256(value: unknown): string {
  return createHash("sha256").update(canonicalize(value), "utf8").digest("hex")
}

function exactKeys(record: UnknownRecord, allowed: readonly string[], required: readonly string[], label: string): void {
  const allowedSet = new Set(allowed)
  for (const key of Object.keys(record)) {
    if (!allowedSet.has(key)) throw new TypeError(`${label} contains unknown field: ${key}`)
  }
  for (const key of required) {
    if (!Object.hasOwn(record, key)) throw new TypeError(`${label} is missing required field: ${key}`)
  }
}

function boundedString(value: unknown, label: string, maxBytes: number): string {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) {
    throw new TypeError(`${label} must be a non-empty NUL-free string`)
  }
  if (Buffer.byteLength(value, "utf8") > maxBytes) throw new RangeError(`${label} exceeds ${maxBytes} UTF-8 bytes`)
  return value
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

function canonicalPath(value: unknown, label: string): string {
  const path = boundedString(value, label, K3_R6_LIMITS.maxPathBytes)
  if (path.includes("\\") || path.startsWith("/") || /^[A-Za-z]:\//.test(path)) {
    throw new TypeError(`${label} must be a workspace-relative slash path`)
  }
  const segments = path.split("/")
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) {
    throw new TypeError(`${label} contains an unsafe or ambiguous segment`)
  }
  return path
}

function canonicalStringArray(value: unknown, label: string, maximum: number, maximumBytes: number): readonly string[] {
  const values = denseArrayValues(value, label, maximum)
  const items = values.map((item, index) => boundedString(item, `${label}[${index}]`, maximumBytes))
  if (new Set(items).size !== items.length) throw new TypeError(`${label} contains duplicate values`)
  return Object.freeze(items.sort(compareStrings))
}

function enumValue<T extends string>(value: unknown, allowed: ReadonlySet<string>, label: string): T {
  if (typeof value !== "string" || !allowed.has(value)) throw new TypeError(`${label} is unsupported`)
  return value as T
}

function deepFreeze<T>(value: T, ancestors = new WeakSet<object>()): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    if (ancestors.has(value)) throw new TypeError("normalized relation graph must not be cyclic")
    ancestors.add(value)
    for (const nested of Object.values(value as UnknownRecord)) deepFreeze(nested, ancestors)
    ancestors.delete(value)
    Object.freeze(value)
  }
  return value
}

function sourceSpan(value: unknown, label: string, inventoryFiles?: ReadonlySet<string>): RelationSourceSpan {
  const record = asRecord(value, label)
  exactKeys(record, SPAN_KEYS, SPAN_KEYS, label)
  const path = canonicalPath(record.path, `${label}.path`)
  if (inventoryFiles && !inventoryFiles.has(path)) throw new TypeError(`${label}.path is not a canonical snapshot file`)
  const startLine = positiveInteger(record.startLine, `${label}.startLine`, Number.MAX_SAFE_INTEGER)
  const startColumn = positiveInteger(record.startColumn, `${label}.startColumn`, Number.MAX_SAFE_INTEGER)
  const endLine = positiveInteger(record.endLine, `${label}.endLine`, Number.MAX_SAFE_INTEGER)
  const endColumn = positiveInteger(record.endColumn, `${label}.endColumn`, Number.MAX_SAFE_INTEGER)
  if (endLine < startLine || (endLine === startLine && endColumn < startColumn)) {
    throw new RangeError(`${label} must end at or after its start`)
  }
  return Object.freeze({ path, startLine, startColumn, endLine, endColumn })
}

function entityInput(value: unknown, label: string, inventoryFiles?: ReadonlySet<string>): RelationEntity {
  const record = asRecord(value, label)
  exactKeys(record, ENTITY_INPUT_KEYS, ["kind", "path"], label)
  const kind = enumValue<RelationEntity["kind"]>(record.kind, ENTITY_SET, `${label}.kind`)
  const path = canonicalPath(record.path, `${label}.path`)
  if (inventoryFiles && !inventoryFiles.has(path)) throw new TypeError(`${label}.path is not a canonical snapshot file`)
  if (kind === "file") {
    if (record.symbol !== undefined || record.qualifiedName !== undefined || record.sourceSpan !== undefined) {
      throw new TypeError(`${label} file entities cannot carry symbol-only fields`)
    }
    return Object.freeze({ kind, path, symbol: null, qualifiedName: null, sourceSpan: null })
  }
  const symbol = boundedString(record.symbol, `${label}.symbol`, K3_R6_LIMITS.maxSymbolBytes)
  const qualifiedName = record.qualifiedName === undefined
    ? null
    : boundedString(record.qualifiedName, `${label}.qualifiedName`, K3_R6_LIMITS.maxQualifiedNameBytes)
  const span = record.sourceSpan === undefined ? null : sourceSpan(record.sourceSpan, `${label}.sourceSpan`, inventoryFiles)
  if (span && span.path !== path) throw new TypeError(`${label}.sourceSpan.path must equal the symbol containing-file path`)
  return Object.freeze({ kind, path, symbol, qualifiedName, sourceSpan: span })
}

function querySeed(value: unknown, label: string): RelationEntity {
  const record = asRecord(value, label)
  exactKeys(record, ENTITY_INPUT_KEYS, ["kind", "path"], label)
  const kind = enumValue<RelationEntity["kind"]>(record.kind, ENTITY_SET, `${label}.kind`)
  const path = canonicalPath(record.path, `${label}.path`)
  if (kind === "file") {
    if (
      (record.symbol !== undefined && record.symbol !== null)
      || (record.qualifiedName !== undefined && record.qualifiedName !== null)
      || (record.sourceSpan !== undefined && record.sourceSpan !== null)
    ) throw new TypeError(`${label} file entities cannot carry non-null symbol-only fields`)
    return Object.freeze({ kind, path, symbol: null, qualifiedName: null, sourceSpan: null })
  }
  const symbol = boundedString(record.symbol, `${label}.symbol`, K3_R6_LIMITS.maxSymbolBytes)
  const qualifiedName = record.qualifiedName === undefined || record.qualifiedName === null
    ? null
    : boundedString(record.qualifiedName, `${label}.qualifiedName`, K3_R6_LIMITS.maxQualifiedNameBytes)
  const span = record.sourceSpan === undefined || record.sourceSpan === null
    ? null
    : sourceSpan(record.sourceSpan, `${label}.sourceSpan`)
  if (span && span.path !== path) throw new TypeError(`${label}.sourceSpan.path must equal the symbol containing-file path`)
  return Object.freeze({ kind, path, symbol, qualifiedName, sourceSpan: span })
}

function serializedEntity(value: unknown, label: string): RelationEntity {
  const record = asRecord(value, label)
  exactKeys(record, ENTITY_KEYS, ENTITY_KEYS, label)
  const kind = enumValue<RelationEntity["kind"]>(record.kind, ENTITY_SET, `${label}.kind`)
  const path = canonicalPath(record.path, `${label}.path`)
  if (kind === "file") {
    if (record.symbol !== null || record.qualifiedName !== null || record.sourceSpan !== null) {
      throw new TypeError(`${label} file entity has non-null symbol-only fields`)
    }
    return Object.freeze({ kind, path, symbol: null, qualifiedName: null, sourceSpan: null })
  }
  const symbol = boundedString(record.symbol, `${label}.symbol`, K3_R6_LIMITS.maxSymbolBytes)
  const qualifiedName = record.qualifiedName === null
    ? null
    : boundedString(record.qualifiedName, `${label}.qualifiedName`, K3_R6_LIMITS.maxQualifiedNameBytes)
  const span = record.sourceSpan === null ? null : sourceSpan(record.sourceSpan, `${label}.sourceSpan`)
  if (span && span.path !== path) throw new TypeError(`${label}.sourceSpan.path must equal the symbol containing-file path`)
  return Object.freeze({ kind, path, symbol, qualifiedName, sourceSpan: span })
}

function entitySelector(entity: RelationEntity): string {
  return canonicalize(entity)
}

function claimBinding(record: UnknownRecord, snapshot: SnapshotBinding, label: string): SnapshotBinding {
  const binding = {
    repositoryIdentity: digest(record.repositoryIdentity, `${label}.repositoryIdentity`),
    snapshotIdentity: digest(record.snapshotIdentity, `${label}.snapshotIdentity`),
    contentIdentity: digest(record.contentIdentity, `${label}.contentIdentity`),
  }
  if (
    binding.repositoryIdentity !== snapshot.repositoryIdentity
    || binding.snapshotIdentity !== snapshot.snapshotIdentity
    || binding.contentIdentity !== snapshot.contentIdentity
  ) throw new TypeError(`${label} belongs to a different repository snapshot`)
  return binding
}

function evidenceClass(value: unknown, label: string): RepositoryEvidenceClass {
  return enumValue<RepositoryEvidenceClass>(value, EVIDENCE_SET, label)
}

function producerId(value: unknown, label: string): string {
  const id = boundedString(value, label, K3_R6_LIMITS.maxProducerIdBytes)
  if (!PRODUCER_ID.test(id)) throw new TypeError(`${label} must use the stable producer-id alphabet`)
  return id
}

function architectureCandidate(path: string): boolean {
  const normalized = path.toLowerCase()
  const base = normalized.split("/").at(-1) ?? normalized
  return /^adr-.*\.md$/.test(base)
    || normalized.startsWith("specs/")
    || normalized.startsWith("spec/")
    || normalized.includes("/architecture/")
    || normalized.startsWith("docs/architecture/")
}

function validateSnapshot(value: unknown): CanonicalSnapshot {
  const snapshot = asRecord(value, "relationGraph.snapshot")
  exactKeys(snapshot, SNAPSHOT_KEYS, SNAPSHOT_KEYS, "relationGraph.snapshot")
  if (snapshot.version !== K3_R2_SNAPSHOT_CONTRACT_VERSION) throw new TypeError("K3-R6 requires the canonical K3-R2 snapshot version")

  const repositoryIdentity = asRecord(snapshot.repositoryIdentity, "relationGraph.snapshot.repositoryIdentity")
  exactKeys(repositoryIdentity, ["scheme", "scope", "value"], ["scheme", "scope", "value"], "relationGraph.snapshot.repositoryIdentity")
  if (repositoryIdentity.scheme !== "workspace-root-sha256-v1" || repositoryIdentity.scope !== "workspace-local") {
    throw new TypeError("K3-R6 requires the canonical K3-R2 repository identity scheme")
  }
  const repositoryIdentityValue = digest(repositoryIdentity.value, "relationGraph.snapshot.repositoryIdentity.value")

  const contentIdentity = asRecord(snapshot.contentIdentity, "relationGraph.snapshot.contentIdentity")
  exactKeys(contentIdentity, ["scheme", "value"], ["scheme", "value"], "relationGraph.snapshot.contentIdentity")
  if (contentIdentity.scheme !== "sha256-canonical-repository-content-v1") {
    throw new TypeError("K3-R6 requires the canonical K3-R2 content identity scheme")
  }
  const contentIdentityValue = digest(contentIdentity.value, "relationGraph.snapshot.contentIdentity.value")

  const snapshotIdentity = asRecord(snapshot.snapshotIdentity, "relationGraph.snapshot.snapshotIdentity")
  exactKeys(snapshotIdentity, ["scheme", "value"], ["scheme", "value"], "relationGraph.snapshot.snapshotIdentity")
  if (snapshotIdentity.scheme !== "sha256-k3-r2-snapshot-v1") {
    throw new TypeError("K3-R6 requires the canonical K3-R2 snapshot identity scheme")
  }
  const snapshotIdentityValue = digest(snapshotIdentity.value, "relationGraph.snapshot.snapshotIdentity.value")

  const gitHead = boundedString(snapshot.gitHead, "relationGraph.snapshot.gitHead", 64)
  if (!isFullGitObjectId(gitHead) || gitHead !== gitHead.toLowerCase()) {
    throw new TypeError("K3-R6 requires a canonical lowercase full Git HEAD object id")
  }
  if (snapshot.freshness !== "current") throw new TypeError("K3-R6 refuses a stale repository snapshot")

  const completeness = asRecord(snapshot.completeness, "relationGraph.snapshot.completeness")
  exactKeys(completeness, ["state", "reasons", "omittedAtLeast"], ["state", "reasons", "omittedAtLeast"], "relationGraph.snapshot.completeness")
  const completenessReasons = denseArrayValues(completeness.reasons, "relationGraph.snapshot.completeness.reasons", K3_R6_LIMITS.maxProvenanceRefs)
  if (completeness.state !== "complete" || completenessReasons.length !== 0 || completeness.omittedAtLeast !== 0) {
    throw new TypeError("K3-R6 requires a complete snapshot with no reasons or omissions")
  }

  const workingTreeValues = denseArrayValues(snapshot.workingTree, "relationGraph.snapshot.workingTree", K3_R6_LIMITS.maxNodes)
  const workingTreeKeys = new Set<string>()
  const workingTree = workingTreeValues.map((item, index) => {
    const label = `relationGraph.snapshot.workingTree[${index}]`
    const record = asRecord(item, label)
    exactKeys(record, ["path", "state", "indexStatus", "worktreeStatus", "sourcePath"], ["path", "state", "indexStatus", "worktreeStatus"], label)
    const path = canonicalPath(record.path, `${label}.path`)
    const state = enumValue<string>(record.state, new Set(["modified", "added", "deleted", "untracked", "renamed"]), `${label}.state`)
    if (typeof record.indexStatus !== "string" || record.indexStatus.length !== 1 || record.indexStatus.includes("\0")) throw new TypeError(`${label}.indexStatus must be one NUL-free character`)
    if (typeof record.worktreeStatus !== "string" || record.worktreeStatus.length !== 1 || record.worktreeStatus.includes("\0")) throw new TypeError(`${label}.worktreeStatus must be one NUL-free character`)
    const sourcePathValue = record.sourcePath === undefined ? null : canonicalPath(record.sourcePath, `${label}.sourcePath`)
    const expectedState = record.indexStatus === "?" && record.worktreeStatus === "?" ? "untracked"
      : record.indexStatus === "R" || record.worktreeStatus === "R" ? "renamed"
      : record.indexStatus === "A" ? "added"
      : record.indexStatus === "D" || record.worktreeStatus === "D" ? "deleted"
      : "modified"
    if (state !== expectedState) throw new TypeError(`${label}.state does not match its canonical porcelain status`)
    if (state === "renamed" && sourcePathValue === null) throw new TypeError(`${label} renamed change requires sourcePath`)
    if (state !== "renamed" && sourcePathValue !== null) throw new TypeError(`${label} non-renamed change cannot carry sourcePath`)
    const result = { path, state, indexStatus: record.indexStatus, worktreeStatus: record.worktreeStatus, sourcePath: sourcePathValue }
    const key = canonicalize(result)
    if (workingTreeKeys.has(key)) throw new TypeError(`${label} duplicates a working-tree change`)
    workingTreeKeys.add(key)
    return result
  })
  for (let index = 1; index < workingTree.length; index++) {
    const prior = workingTree[index - 1]
    const current = workingTree[index]
    const order = compareStrings(prior.path, current.path) || compareStrings(prior.sourcePath ?? "", current.sourcePath ?? "")
    if (order > 0) throw new TypeError("K3-R6 requires canonical K3-R2 working-tree ordering")
  }

  const inventoryValues = denseArrayValues(snapshot.inventory, "relationGraph.snapshot.inventory", 20_000)
  const inventoryPaths = new Set<string>()
  const inventoryFiles = new Set<string>()
  const inventory = inventoryValues.map((item, index) => {
    const label = `relationGraph.snapshot.inventory[${index}]`
    const record = asRecord(item, label)
    exactKeys(record, ["path", "type", "gitObjectId", "contentSourceRef"], ["path", "type"], label)
    const path = canonicalPath(record.path, `${label}.path`)
    if (inventoryPaths.has(path)) throw new TypeError(`duplicate snapshot inventory path: ${path}`)
    inventoryPaths.add(path)
    const type = enumValue<"file" | "directory" | "symlink">(record.type, new Set(["file", "directory", "symlink"]), `${label}.type`)
    let gitObjectId: string | null = null
    if (type === "file") {
      const candidate = boundedString(record.gitObjectId, `${label}.gitObjectId`, 64)
      if (!isFullGitObjectId(candidate) || candidate !== candidate.toLowerCase()) throw new TypeError(`${label}.gitObjectId is invalid`)
      gitObjectId = candidate
      inventoryFiles.add(path)
    } else if (record.gitObjectId !== undefined) {
      throw new TypeError(`${label} non-file cannot carry gitObjectId`)
    }
    if (record.contentSourceRef !== undefined) boundedString(record.contentSourceRef, `${label}.contentSourceRef`, K3_R6_LIMITS.maxProvenanceRefBytes)
    return { path, type, gitObjectId }
  })
  for (let index = 1; index < inventory.length; index++) {
    const prior = inventory[index - 1]
    const current = inventory[index]
    const order = compareStrings(prior.path, current.path) || compareStrings(prior.type, current.type)
    if (order > 0) throw new TypeError("K3-R6 requires canonical K3-R2 inventory ordering")
  }

  const canonicalCompleteness = { state: "complete", reasons: [] as string[], omittedAtLeast: 0 }
  const expectedContentIdentity = createHash("sha256").update(JSON.stringify({
    version: K3_R2_SNAPSHOT_CONTRACT_VERSION,
    gitHead,
    workingTree,
    inventory,
    completeness: canonicalCompleteness,
  }), "utf8").digest("hex")
  if (expectedContentIdentity !== contentIdentityValue) throw new TypeError("K3-R6 snapshot content identity mismatch")
  const expectedSnapshotIdentity = createHash("sha256").update(JSON.stringify({
    version: K3_R2_SNAPSHOT_CONTRACT_VERSION,
    repositoryIdentity: { scheme: "workspace-root-sha256-v1", scope: "workspace-local", value: repositoryIdentityValue },
    contentIdentity: { scheme: "sha256-canonical-repository-content-v1", value: contentIdentityValue },
    freshness: "current",
    completeness: canonicalCompleteness,
  }), "utf8").digest("hex")
  if (expectedSnapshotIdentity !== snapshotIdentityValue) throw new TypeError("K3-R6 snapshot identity mismatch")

  const sourceValues = denseArrayValues(snapshot.sources, "relationGraph.snapshot.sources", K3_R6_LIMITS.maxProducers)
  const sourceIds = new Set<string>()
  for (const [index, item] of sourceValues.entries()) {
    const label = `relationGraph.snapshot.sources[${index}]`
    const record = asRecord(item, label)
    exactKeys(record, ["id", "kind", "provenanceRefs"], ["id", "kind", "provenanceRefs"], label)
    const id = boundedString(record.id, `${label}.id`, K3_R6_LIMITS.maxProducerIdBytes)
    if (sourceIds.has(id)) throw new TypeError(`duplicate snapshot source id: ${id}`)
    sourceIds.add(id)
    if (record.kind !== "builtin") throw new TypeError(`${label}.kind is unsupported`)
    canonicalStringArray(record.provenanceRefs, `${label}.provenanceRefs`, K3_R6_LIMITS.maxProvenanceRefs, K3_R6_LIMITS.maxProvenanceRefBytes)
  }

  const evidenceValues = denseArrayValues(snapshot.evidence, "relationGraph.snapshot.evidence", K3_R6_LIMITS.maxNodes)
  const evidenceIds = new Set<string>()
  for (const [index, item] of evidenceValues.entries()) {
    const label = `relationGraph.snapshot.evidence[${index}]`
    const record = asRecord(item, label)
    exactKeys(record, ["evidenceId", "contentIdentity", "evidenceClass", "source", "subjectPath", "claim"], ["evidenceId", "contentIdentity", "evidenceClass", "source", "subjectPath", "claim"], label)
    const evidenceId = digest(record.evidenceId, `${label}.evidenceId`)
    if (evidenceIds.has(evidenceId)) throw new TypeError(`duplicate snapshot evidence id: ${evidenceId}`)
    evidenceIds.add(evidenceId)
    if (record.contentIdentity !== contentIdentityValue) throw new TypeError(`${label} content identity mismatch`)
    const subjectPath = canonicalPath(record.subjectPath, `${label}.subjectPath`)
    evidenceClass(record.evidenceClass, `${label}.evidenceClass`)
    const source = asRecord(record.source, `${label}.source`)
    exactKeys(source, ["id", "kind", "provenanceRefs"], ["id", "kind", "provenanceRefs"], `${label}.source`)
    const sourceId = boundedString(source.id, `${label}.source.id`, K3_R6_LIMITS.maxProducerIdBytes)
    if (!sourceIds.has(sourceId) || source.kind !== "builtin") throw new TypeError(`${label} has an unknown source`)
    canonicalStringArray(source.provenanceRefs, `${label}.source.provenanceRefs`, K3_R6_LIMITS.maxProvenanceRefs, K3_R6_LIMITS.maxProvenanceRefBytes)
    const claim = asRecord(record.claim, `${label}.claim`)
    exactKeys(claim, ["kind", "value", "sourcePath"], ["kind", "value"], `${label}.claim`)
    const claimValue = boundedString(claim.value, `${label}.claim.value`, K3_R6_LIMITS.maxPathBytes)
    const claimSourcePath = claim.sourcePath === undefined ? undefined : canonicalPath(claim.sourcePath, `${label}.claim.sourcePath`)
    let expectedEvidenceId: string
    if (claim.kind === "working-tree-change") {
      if (record.evidenceClass !== "git-derived" || sourceId !== "builtin.git.status-porcelain-v1-z.v1") throw new TypeError(`${label} has a noncanonical working-tree evidence mapping`)
      const matches = workingTree.filter((change) => change.path === subjectPath && change.state === claimValue && (change.sourcePath ?? undefined) === claimSourcePath)
      if (matches.length !== 1) throw new TypeError(`${label} is not bound to one working-tree change`)
      expectedEvidenceId = createHash("sha256").update(`${contentIdentityValue}\0git-derived\0${JSON.stringify(matches[0])}`, "utf8").digest("hex")
    } else if (claim.kind === "architecture-candidate") {
      if (record.evidenceClass !== "heuristic-inference" || sourceId !== "builtin.inventory-path-heuristic.v1" || claimValue !== "candidate" || claimSourcePath !== undefined || !inventoryPaths.has(subjectPath) || !architectureCandidate(subjectPath)) {
        throw new TypeError(`${label} has a noncanonical architecture evidence mapping`)
      }
      expectedEvidenceId = createHash("sha256").update(`${contentIdentityValue}\0heuristic-inference\0architecture-candidate\0${subjectPath}`, "utf8").digest("hex")
    } else {
      throw new TypeError(`${label}.claim.kind is unsupported`)
    }
    if (expectedEvidenceId !== evidenceId) throw new TypeError(`${label} evidence identity mismatch`)
  }
  const orderedEvidenceIds = [...evidenceIds]
  for (let index = 1; index < orderedEvidenceIds.length; index++) {
    if (compareStrings(orderedEvidenceIds[index - 1], orderedEvidenceIds[index]) > 0) {
      throw new TypeError("K3-R6 requires canonical K3-R2 evidence ordering")
    }
  }

  return {
    binding: {
      repositoryIdentity: repositoryIdentityValue,
      snapshotIdentity: snapshotIdentityValue,
      contentIdentity: contentIdentityValue,
    },
    gitHead,
    inventoryFiles,
  }
}

function normalizeProducer(value: unknown, snapshot: SnapshotBinding, index: number): RelationProducer {
  const label = `relationGraph.producers[${index}]`
  const record = asRecord(value, label)
  exactKeys(record, PRODUCER_KEYS, PRODUCER_KEYS, label)
  const binding = claimBinding(record, snapshot, label)
  return Object.freeze({
    producerId: producerId(record.producerId, `${label}.producerId`),
    ...binding,
    provenanceRefs: canonicalStringArray(record.provenanceRefs, `${label}.provenanceRefs`, K3_R6_LIMITS.maxProvenanceRefs, K3_R6_LIMITS.maxProvenanceRefBytes),
  })
}

function normalizeNode(
  value: unknown,
  snapshot: CanonicalSnapshot,
  producerIds: ReadonlySet<string>,
  index: number,
): RelationNode {
  const label = `relationGraph.nodes[${index}]`
  const record = asRecord(value, label)
  exactKeys(record, NODE_CLAIM_KEYS, NODE_CLAIM_KEYS, label)
  claimBinding(record, snapshot.binding, label)
  const producer = producerId(record.producerId, `${label}.producerId`)
  if (!producerIds.has(producer)) throw new TypeError(`${label} references an unknown producer`)
  const entity = entityInput(record.entity, `${label}.entity`, snapshot.inventoryFiles)
  const base = {
    producerId: producer,
    evidenceClass: evidenceClass(record.evidenceClass, `${label}.evidenceClass`),
    sourceEvidenceIdentity: digest(record.sourceEvidenceIdentity, `${label}.sourceEvidenceIdentity`),
    provenanceRefs: canonicalStringArray(record.provenanceRefs, `${label}.provenanceRefs`, K3_R6_LIMITS.maxProvenanceRefs, K3_R6_LIMITS.maxProvenanceRefBytes),
    entity,
  }
  const nodeIdentity = sha256({ version: K3_R6_RELATION_GRAPH_VERSION, ...snapshot.binding, entity })
  return Object.freeze({ nodeIdentity, ...base })
}

function normalizeEdge(
  value: unknown,
  snapshot: CanonicalSnapshot,
  producerIds: ReadonlySet<string>,
  nodesBySelector: ReadonlyMap<string, RelationNode>,
  index: number,
): RelationEdge {
  const label = `relationGraph.edges[${index}]`
  const record = asRecord(value, label)
  exactKeys(record, EDGE_CLAIM_KEYS, EDGE_CLAIM_KEYS.filter((key) => key !== "relationSite"), label)
  claimBinding(record, snapshot.binding, label)
  const producer = producerId(record.producerId, `${label}.producerId`)
  if (!producerIds.has(producer)) throw new TypeError(`${label} references an unknown producer`)
  const source = entityInput(record.source, `${label}.source`, snapshot.inventoryFiles)
  const target = entityInput(record.target, `${label}.target`, snapshot.inventoryFiles)
  const sourceNode = nodesBySelector.get(entitySelector(source))
  const targetNode = nodesBySelector.get(entitySelector(target))
  if (!sourceNode || !targetNode) throw new TypeError(`${label} endpoint does not resolve to exactly one node`)
  const relation = enumValue<RelationKind>(record.relation, RELATION_SET, `${label}.relation`)
  const resolution = enumValue<RelationResolutionState>(record.resolution, RESOLUTION_SET, `${label}.resolution`)
  const relationSite = record.relationSite === undefined ? null : sourceSpan(record.relationSite, `${label}.relationSite`, snapshot.inventoryFiles)
  const base = {
    producerId: producer,
    evidenceClass: evidenceClass(record.evidenceClass, `${label}.evidenceClass`),
    sourceEvidenceIdentity: digest(record.sourceEvidenceIdentity, `${label}.sourceEvidenceIdentity`),
    provenanceRefs: canonicalStringArray(record.provenanceRefs, `${label}.provenanceRefs`, K3_R6_LIMITS.maxProvenanceRefs, K3_R6_LIMITS.maxProvenanceRefBytes),
    relation,
    resolution,
    sourceNodeIdentity: sourceNode.nodeIdentity,
    targetNodeIdentity: targetNode.nodeIdentity,
    relationSite,
  }
  const edgeIdentity = sha256({ version: K3_R6_RELATION_GRAPH_VERSION, ...snapshot.binding, ...base })
  return Object.freeze({ edgeIdentity, ...base })
}

export function createRelationGraph(input: RelationGraphInput): RelationGraph {
  const record = asRecord(input, "relationGraph")
  exactKeys(record, GRAPH_INPUT_KEYS, GRAPH_INPUT_KEYS, "relationGraph")
  const snapshot = validateSnapshot(record.snapshot)
  const producerValues = denseArrayValues(record.producers, "relationGraph.producers", K3_R6_LIMITS.maxProducers)
  const nodeValues = denseArrayValues(record.nodes, "relationGraph.nodes", K3_R6_LIMITS.maxNodes)
  const edgeValues = denseArrayValues(record.edges, "relationGraph.edges", K3_R6_LIMITS.maxEdges)

  const producers = producerValues.map((producer, index) => normalizeProducer(producer, snapshot.binding, index))
    .sort((left, right) => compareStrings(left.producerId, right.producerId))
  const producerIds = new Set<string>()
  for (const producer of producers) {
    if (producerIds.has(producer.producerId)) throw new TypeError(`duplicate relation producer: ${producer.producerId}`)
    producerIds.add(producer.producerId)
  }
  const producerSetIdentity = sha256({ version: K3_R6_RELATION_GRAPH_VERSION, ...snapshot.binding, producers })

  const nodes = nodeValues.map((node, index) => normalizeNode(node, snapshot, producerIds, index))
    .sort((left, right) => compareStrings(left.nodeIdentity, right.nodeIdentity))
  const nodeIdentities = new Set<string>()
  const nodesBySelector = new Map<string, RelationNode>()
  for (const node of nodes) {
    const selector = entitySelector(node.entity)
    if (nodesBySelector.has(selector)) throw new TypeError(`duplicate relation node selector: ${selector}`)
    if (nodeIdentities.has(node.nodeIdentity)) throw new TypeError(`duplicate relation node identity: ${node.nodeIdentity}`)
    nodesBySelector.set(selector, node)
    nodeIdentities.add(node.nodeIdentity)
  }

  const edges = edgeValues.map((edge, index) => normalizeEdge(edge, snapshot, producerIds, nodesBySelector, index))
    .sort((left, right) => compareStrings(left.edgeIdentity, right.edgeIdentity))
  const edgeIdentities = new Set<string>()
  const relationClaims = new Set<string>()
  for (const edge of edges) {
    if (edgeIdentities.has(edge.edgeIdentity)) throw new TypeError(`duplicate relation edge identity: ${edge.edgeIdentity}`)
    edgeIdentities.add(edge.edgeIdentity)
    const claim = canonicalize({ sourceNodeIdentity: edge.sourceNodeIdentity, targetNodeIdentity: edge.targetNodeIdentity, relation: edge.relation })
    if (relationClaims.has(claim)) throw new TypeError(`duplicate relation claim: ${claim}`)
    relationClaims.add(claim)
  }

  const base = {
    version: K3_R6_RELATION_GRAPH_VERSION,
    producerSetIdentity,
    ...snapshot.binding,
    gitHead: snapshot.gitHead,
    freshness: "current" as const,
    producers,
    nodes,
    edges,
  }
  return deepFreeze({ ...base, graphIdentity: sha256(base) })
}

export function validateRelationGraph(value: unknown): RelationGraph {
  const record = asRecord(value, "relationGraphRecord")
  exactKeys(record, GRAPH_KEYS, GRAPH_KEYS, "relationGraphRecord")
  if (record.version !== K3_R6_RELATION_GRAPH_VERSION || record.freshness !== "current") throw new TypeError("unsupported K3-R6 relation graph record")
  const binding = {
    repositoryIdentity: digest(record.repositoryIdentity, "relationGraphRecord.repositoryIdentity"),
    snapshotIdentity: digest(record.snapshotIdentity, "relationGraphRecord.snapshotIdentity"),
    contentIdentity: digest(record.contentIdentity, "relationGraphRecord.contentIdentity"),
  }
  const gitHead = boundedString(record.gitHead, "relationGraphRecord.gitHead", 64)
  if (!isFullGitObjectId(gitHead) || gitHead !== gitHead.toLowerCase()) throw new TypeError("relationGraphRecord.gitHead is invalid")
  const producerValues = denseArrayValues(record.producers, "relationGraphRecord.producers", K3_R6_LIMITS.maxProducers)
  const producers = producerValues.map((item, index) => normalizeProducer(item, binding, index)).sort((left, right) => compareStrings(left.producerId, right.producerId))
  const producerIds = new Set<string>()
  for (const producer of producers) {
    if (producerIds.has(producer.producerId)) throw new TypeError(`duplicate relation producer: ${producer.producerId}`)
    producerIds.add(producer.producerId)
  }
  const producerSetIdentity = digest(record.producerSetIdentity, "relationGraphRecord.producerSetIdentity")
  if (producerSetIdentity !== sha256({ version: K3_R6_RELATION_GRAPH_VERSION, ...binding, producers })) throw new TypeError("relationGraphRecord.producerSetIdentity mismatch")

  const nodeValues = denseArrayValues(record.nodes, "relationGraphRecord.nodes", K3_R6_LIMITS.maxNodes)
  const nodes: RelationNode[] = nodeValues.map((item, index) => {
    const label = `relationGraphRecord.nodes[${index}]`
    const node = asRecord(item, label)
    exactKeys(node, NODE_KEYS, NODE_KEYS, label)
    const entity = serializedEntity(node.entity, `${label}.entity`)
    const normalized = {
      nodeIdentity: digest(node.nodeIdentity, `${label}.nodeIdentity`),
      producerId: producerId(node.producerId, `${label}.producerId`),
      evidenceClass: evidenceClass(node.evidenceClass, `${label}.evidenceClass`),
      sourceEvidenceIdentity: digest(node.sourceEvidenceIdentity, `${label}.sourceEvidenceIdentity`),
      provenanceRefs: canonicalStringArray(node.provenanceRefs, `${label}.provenanceRefs`, K3_R6_LIMITS.maxProvenanceRefs, K3_R6_LIMITS.maxProvenanceRefBytes),
      entity,
    }
    if (!producerIds.has(normalized.producerId)) throw new TypeError(`${label} references an unknown producer`)
    if (normalized.nodeIdentity !== sha256({ version: K3_R6_RELATION_GRAPH_VERSION, ...binding, entity })) throw new TypeError(`${label}.nodeIdentity mismatch`)
    return Object.freeze(normalized)
  }).sort((left, right) => compareStrings(left.nodeIdentity, right.nodeIdentity))
  const nodeIds = new Set<string>()
  const selectors = new Set<string>()
  for (const node of nodes) {
    if (nodeIds.has(node.nodeIdentity) || selectors.has(entitySelector(node.entity))) throw new TypeError("relationGraphRecord contains duplicate nodes")
    nodeIds.add(node.nodeIdentity)
    selectors.add(entitySelector(node.entity))
  }

  const edgeValues = denseArrayValues(record.edges, "relationGraphRecord.edges", K3_R6_LIMITS.maxEdges)
  const edges: RelationEdge[] = edgeValues.map((item, index) => {
    const label = `relationGraphRecord.edges[${index}]`
    const edge = asRecord(item, label)
    exactKeys(edge, EDGE_KEYS, EDGE_KEYS, label)
    const normalizedBase = {
      producerId: producerId(edge.producerId, `${label}.producerId`),
      evidenceClass: evidenceClass(edge.evidenceClass, `${label}.evidenceClass`),
      sourceEvidenceIdentity: digest(edge.sourceEvidenceIdentity, `${label}.sourceEvidenceIdentity`),
      provenanceRefs: canonicalStringArray(edge.provenanceRefs, `${label}.provenanceRefs`, K3_R6_LIMITS.maxProvenanceRefs, K3_R6_LIMITS.maxProvenanceRefBytes),
      relation: enumValue<RelationKind>(edge.relation, RELATION_SET, `${label}.relation`),
      resolution: enumValue<RelationResolutionState>(edge.resolution, RESOLUTION_SET, `${label}.resolution`),
      sourceNodeIdentity: digest(edge.sourceNodeIdentity, `${label}.sourceNodeIdentity`),
      targetNodeIdentity: digest(edge.targetNodeIdentity, `${label}.targetNodeIdentity`),
      relationSite: edge.relationSite === null ? null : sourceSpan(edge.relationSite, `${label}.relationSite`),
    }
    if (!producerIds.has(normalizedBase.producerId)) throw new TypeError(`${label} references an unknown producer`)
    if (!nodeIds.has(normalizedBase.sourceNodeIdentity) || !nodeIds.has(normalizedBase.targetNodeIdentity)) throw new TypeError(`${label} endpoint is missing`)
    const edgeIdentity = digest(edge.edgeIdentity, `${label}.edgeIdentity`)
    if (edgeIdentity !== sha256({ version: K3_R6_RELATION_GRAPH_VERSION, ...binding, ...normalizedBase })) throw new TypeError(`${label}.edgeIdentity mismatch`)
    return Object.freeze({ edgeIdentity, ...normalizedBase })
  }).sort((left, right) => compareStrings(left.edgeIdentity, right.edgeIdentity))
  const edgeIds = new Set<string>()
  const relationClaims = new Set<string>()
  for (const edge of edges) {
    const claim = canonicalize({ sourceNodeIdentity: edge.sourceNodeIdentity, targetNodeIdentity: edge.targetNodeIdentity, relation: edge.relation })
    if (edgeIds.has(edge.edgeIdentity) || relationClaims.has(claim)) throw new TypeError("relationGraphRecord contains duplicate edges or relation claims")
    edgeIds.add(edge.edgeIdentity)
    relationClaims.add(claim)
  }

  const base = {
    version: K3_R6_RELATION_GRAPH_VERSION,
    producerSetIdentity,
    ...binding,
    gitHead,
    freshness: "current" as const,
    producers,
    nodes,
    edges,
  }
  const graphIdentity = digest(record.graphIdentity, "relationGraphRecord.graphIdentity")
  if (graphIdentity !== sha256(base)) throw new TypeError("relationGraphRecord.graphIdentity mismatch")
  return deepFreeze({ ...base, graphIdentity })
}

function queryKind(value: unknown, label: string): RelationQueryKind {
  return enumValue<RelationQueryKind>(value, QUERY_SET, label)
}

function buildTransitionIndex(
  graph: RelationGraph,
  kind: RelationQueryKind,
): ReadonlyMap<string, readonly Transition[]> {
  const index = new Map<string, Transition[]>()
  const add = (nodeIdentity: string, transition: Transition): void => {
    const bucket = index.get(nodeIdentity)
    if (bucket) bucket.push(transition)
    else index.set(nodeIdentity, [transition])
  }
  for (const edge of graph.edges) {
    if (kind === "impact") {
      if (IMPACT_RELATION_SET.has(edge.relation)) {
        add(edge.targetNodeIdentity, { edge, nextNodeIdentity: edge.sourceNodeIdentity })
      }
      continue
    }
    add(edge.sourceNodeIdentity, { edge, nextNodeIdentity: edge.targetNodeIdentity })
    if (edge.targetNodeIdentity !== edge.sourceNodeIdentity) {
      add(edge.targetNodeIdentity, { edge, nextNodeIdentity: edge.sourceNodeIdentity })
    }
  }
  for (const transitions of index.values()) {
    transitions.sort((left, right) => compareStrings(left.edge.edgeIdentity, right.edge.edgeIdentity) || compareStrings(left.nextNodeIdentity, right.nextNodeIdentity))
  }
  return index
}

function transitionsFor(
  index: ReadonlyMap<string, readonly Transition[]>,
  nodeIdentity: string,
  ambiguous: Set<string>,
): readonly Transition[] {
  const resolved: Transition[] = []
  for (const transition of index.get(nodeIdentity) ?? []) {
    if (transition.edge.resolution === "ambiguous") ambiguous.add(transition.edge.edgeIdentity)
    else resolved.push(transition)
  }
  return resolved
}

function chainOrder(left: readonly string[], right: readonly string[]): number {
  return compareStrings(left.join("\0"), right.join("\0"))
}

function hitOrder(left: RelationQueryHit, right: RelationQueryHit): number {
  return left.depth - right.depth
    || compareStrings(left.entity.path, right.entity.path)
    || compareStrings(entitySelector(left.entity), entitySelector(right.entity))
    || compareStrings(left.chainIdentity, right.chainIdentity)
}

export function queryRelationGraph(graphValue: unknown, queryValue: RelationGraphQueryInput): RelationGraphQueryResult {
  const graph = validateRelationGraph(graphValue)
  const query = asRecord(queryValue, "relationGraphQuery")
  exactKeys(query, QUERY_KEYS, QUERY_KEYS, "relationGraphQuery")
  if (query.version !== K3_R6_RELATION_QUERY_VERSION) throw new TypeError("unsupported K3-R6 relation query version")
  const kind = queryKind(query.kind, "relationGraphQuery.kind")
  const graphIdentity = digest(query.graphIdentity, "relationGraphQuery.graphIdentity")
  const repositoryIdentity = digest(query.repositoryIdentity, "relationGraphQuery.repositoryIdentity")
  const snapshotIdentity = digest(query.snapshotIdentity, "relationGraphQuery.snapshotIdentity")
  const contentIdentity = digest(query.contentIdentity, "relationGraphQuery.contentIdentity")
  if (
    graphIdentity !== graph.graphIdentity
    || repositoryIdentity !== graph.repositoryIdentity
    || snapshotIdentity !== graph.snapshotIdentity
    || contentIdentity !== graph.contentIdentity
  ) throw new TypeError("relationGraphQuery binding does not match the graph")
  const seed = querySeed(query.seed, "relationGraphQuery.seed")
  const seedNode = graph.nodes.find((node) => entitySelector(node.entity) === entitySelector(seed))
  if (!seedNode) throw new TypeError("relationGraphQuery.seed does not resolve to exactly one graph node")
  const maxDepth = positiveInteger(query.maxDepth, "relationGraphQuery.maxDepth", K3_R6_LIMITS.maxQueryDepth)
  const maxResults = positiveInteger(query.maxResults, "relationGraphQuery.maxResults", K3_R6_LIMITS.maxQueryResults)
  const relations: readonly RelationKind[] = kind === "impact" ? K3_R6_IMPACT_RELATION_KINDS : K3_R6_RELATION_KINDS
  const queryIdentity = sha256({
    version: K3_R6_RELATION_QUERY_VERSION,
    kind,
    graphIdentity,
    repositoryIdentity,
    snapshotIdentity,
    contentIdentity,
    seedNodeIdentity: seedNode.nodeIdentity,
    relations,
    maxDepth,
    maxResults,
  })

  const nodesById = new Map(graph.nodes.map((node) => [node.nodeIdentity, node] as const))
  const transitionIndex = buildTransitionIndex(graph, kind)
  const visited = new Set<string>([seedNode.nodeIdentity])
  const ambiguous = new Set<string>()
  const allHits: RelationQueryHit[] = []
  let frontier: TraversalState[] = [{ nodeIdentity: seedNode.nodeIdentity, edgeIdentities: [] }]

  for (let depth = 1; depth <= maxDepth && frontier.length > 0; depth++) {
    const next = new Map<string, readonly string[]>()
    for (const state of frontier.sort((left, right) => compareStrings(left.nodeIdentity, right.nodeIdentity) || chainOrder(left.edgeIdentities, right.edgeIdentities))) {
      for (const transition of transitionsFor(transitionIndex, state.nodeIdentity, ambiguous)) {
        if (visited.has(transition.nextNodeIdentity)) continue
        const chain = Object.freeze([...state.edgeIdentities, transition.edge.edgeIdentity])
        const prior = next.get(transition.nextNodeIdentity)
        if (!prior || chainOrder(chain, prior) < 0) next.set(transition.nextNodeIdentity, chain)
      }
    }
    frontier = [...next.entries()].map(([nodeIdentity, edgeIdentities]) => ({ nodeIdentity, edgeIdentities }))
    for (const state of frontier) visited.add(state.nodeIdentity)
    for (const state of frontier) {
      const node = nodesById.get(state.nodeIdentity)
      if (!node) throw new TypeError("relation graph traversal reached an unknown node")
      const include = kind === "impact" || (node.entity.kind === "file" && node.entity.path !== seedNode.entity.path)
      if (!include) continue
      const chainIdentity = sha256({ version: K3_R6_RELATION_RESULT_VERSION, graphIdentity, edgeIdentities: state.edgeIdentities })
      allHits.push(Object.freeze({
        nodeIdentity: node.nodeIdentity,
        entity: node.entity,
        depth,
        chainIdentity,
        edgeIdentities: state.edgeIdentities,
      }))
    }
  }

  let depthBound = false
  if (frontier.length > 0) {
    for (const state of frontier) {
      for (const transition of transitionsFor(transitionIndex, state.nodeIdentity, ambiguous)) {
        if (!visited.has(transition.nextNodeIdentity)) depthBound = true
      }
    }
  }

  allHits.sort(hitOrder)
  const resultBudgetOmissions = Math.max(0, allHits.length - maxResults)
  const hits = Object.freeze(allHits.slice(0, maxResults))
  const reasons: RelationCompletenessReason[] = []
  if (ambiguous.size > 0) reasons.push("ambiguous-edges-excluded")
  if (depthBound) reasons.push("depth-bound")
  if (resultBudgetOmissions > 0) reasons.push("result-budget")
  reasons.sort(compareStrings)
  for (const reason of reasons) {
    if (!(K3_R6_COMPLETENESS_REASONS as readonly string[]).includes(reason)) throw new TypeError("internal K3-R6 completeness reason mismatch")
  }
  const completeness = Object.freeze({
    state: reasons.length === 0 ? "complete" as const : "incomplete" as const,
    reasons: Object.freeze(reasons),
    omittedAtLeast: resultBudgetOmissions + (depthBound ? 1 : 0),
    excludedAmbiguousEdgeIdentities: Object.freeze([...ambiguous].sort(compareStrings)),
  })
  const base = {
    version: K3_R6_RELATION_RESULT_VERSION,
    queryIdentity,
    kind,
    graphIdentity,
    repositoryIdentity,
    snapshotIdentity,
    contentIdentity,
    seedNodeIdentity: seedNode.nodeIdentity,
    relations,
    maxDepth,
    maxResults,
    completeness,
    hits,
  }
  return deepFreeze({ ...base, resultIdentity: sha256(base) })
}
