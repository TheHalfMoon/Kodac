import { createHash } from "node:crypto"

export const P2_R1_FIXTURE_ROOT = "packages/kodac-runtime/test/fixtures/p2-r1"
export const P2_R1_MANIFEST_SCHEMA = "p2-r1-manifest/v1"
export const P2_R1_FIXTURE_SCHEMA = "p2-r1-fixture/v1"
export const NOT_APPLICABLE = "not-applicable"

export type ContaminationStatus = "none-known" | "known" | "unknown"
export type ChronologyStatus =
  | "later-in-time"
  | "not-later-in-time"
  | "chronology-unproven"
export type CorpusRole = "development" | "holdout"

export interface ChronologyAnchor {
  scheme: string
  ordinal: number | null
}

export interface SourceProvenance {
  kind: "repository-authored-synthetic"
  path: string
}

export interface FixtureCase {
  case_id: string
  task_family: string
  payload: Record<string, unknown>
}

export interface FixtureDocument {
  schema_version: string
  corpus_id: string
  corpus_role: CorpusRole
  chronology_scheme: string
  chronology_anchor: ChronologyAnchor
  source_provenance: SourceProvenance
  contamination_status: ContaminationStatus
  cases: FixtureCase[]
}

export interface MetricDefinition {
  task_family: string
  metric_id: string
  unit: string
}

export interface P2R1ManifestRecord {
  schema_version: string
  benchmark_id: string
  benchmark_protocol_version: string
  corpus_id: string
  corpus_digest: string
  corpus_role: CorpusRole
  development_freeze_anchor: ChronologyAnchor
  holdout_id: string
  holdout_digest: string
  holdout_chronology_anchor: ChronologyAnchor
  chronology_scheme: string
  chronology_status: ChronologyStatus
  task_family: string
  case_id: string
  case_digest: string
  strategy_id: string
  strategy_version: string
  evaluator_id: string
  evaluator_version: string
  model_id: string
  model_version: string
  provider_id: string
  provider_version: string
  execution_environment_id: string
  source_provenance: SourceProvenance
  contamination_status: ContaminationStatus
  metric_definitions: MetricDefinition[]
  result_identity: string
}

type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue }

const FIXTURE_KEYS = [
  "schema_version",
  "corpus_id",
  "corpus_role",
  "chronology_scheme",
  "chronology_anchor",
  "source_provenance",
  "contamination_status",
  "cases",
] as const

const CASE_KEYS = ["case_id", "task_family", "payload"] as const
const ANCHOR_KEYS = ["scheme", "ordinal"] as const
const PROVENANCE_KEYS = ["kind", "path"] as const
const METRIC_KEYS = ["task_family", "metric_id", "unit"] as const
const MANIFEST_KEYS = [
  "schema_version",
  "benchmark_id",
  "benchmark_protocol_version",
  "corpus_id",
  "corpus_digest",
  "corpus_role",
  "development_freeze_anchor",
  "holdout_id",
  "holdout_digest",
  "holdout_chronology_anchor",
  "chronology_scheme",
  "chronology_status",
  "task_family",
  "case_id",
  "case_digest",
  "strategy_id",
  "strategy_version",
  "evaluator_id",
  "evaluator_version",
  "model_id",
  "model_version",
  "provider_id",
  "provider_version",
  "execution_environment_id",
  "source_provenance",
  "contamination_status",
  "metric_definitions",
  "result_identity",
] as const

const FORBIDDEN_UNIVERSAL_METRICS = new Set([
  "best",
  "winner",
  "overall_score",
  "blended_score",
  "universal_score",
])

function fail(message: string): never {
  throw new Error(`P2-R1 contract violation: ${message}`)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function assertRecord(value: unknown, label: string): asserts value is Record<string, unknown> {
  if (!isRecord(value)) {
    fail(`${label} must be an object`)
  }
}

function assertExactKeys(
  value: Record<string, unknown>,
  expected: readonly string[],
  label: string,
): void {
  const actual = Object.keys(value).sort()
  const required = [...expected].sort()
  const unknown = actual.filter((key) => !required.includes(key))
  const missing = required.filter((key) => !actual.includes(key))
  if (unknown.length > 0 || missing.length > 0) {
    fail(
      `${label} keys are not canonical; unknown=[${unknown.join(",")}] missing=[${missing.join(",")}]`,
    )
  }
}

function assertNonEmptyString(value: unknown, label: string): asserts value is string {
  if (typeof value !== "string" || value.length === 0 || value.trim() !== value) {
    fail(`${label} must be a non-empty canonical string`)
  }
}

function assertSha256(value: unknown, label: string): asserts value is string {
  if (typeof value !== "string" || !/^sha256:[0-9a-f]{64}$/.test(value)) {
    fail(`${label} must be a lowercase sha256 identity`)
  }
}

function assertContaminationStatus(
  value: unknown,
  label: string,
): asserts value is ContaminationStatus {
  if (value !== "none-known" && value !== "known" && value !== "unknown") {
    fail(`${label} must be none-known, known, or unknown`)
  }
}

function assertCorpusRole(value: unknown, label: string): asserts value is CorpusRole {
  if (value !== "development" && value !== "holdout") {
    fail(`${label} must be development or holdout`)
  }
}

function assertChronologyStatus(
  value: unknown,
  label: string,
): asserts value is ChronologyStatus {
  if (
    value !== "later-in-time" &&
    value !== "not-later-in-time" &&
    value !== "chronology-unproven"
  ) {
    fail(`${label} is unsupported`)
  }
}

function toJsonValue(value: unknown, label = "value"): JsonValue {
  if (value === null || typeof value === "boolean" || typeof value === "string") {
    return value
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      fail(`${label} contains a non-finite number`)
    }
    return value
  }
  if (Array.isArray(value)) {
    return value.map((entry, index) => toJsonValue(entry, `${label}[${index}]`))
  }
  if (isRecord(value)) {
    const result: { [key: string]: JsonValue } = {}
    for (const key of Object.keys(value)) {
      const child = value[key]
      if (child === undefined) {
        fail(`${label}.${key} is undefined`)
      }
      result[key] = toJsonValue(child, `${label}.${key}`)
    }
    return result
  }
  fail(`${label} contains a non-JSON value`)
}

export function canonicalize(value: unknown): string {
  const canonical = (entry: JsonValue): string => {
    if (entry === null || typeof entry !== "object") {
      return JSON.stringify(entry)
    }
    if (Array.isArray(entry)) {
      return `[${entry.map(canonical).join(",")}]`
    }
    return `{${Object.keys(entry)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonical(entry[key])}`)
      .join(",")}}`
  }
  return canonical(toJsonValue(value))
}

export function sha256Canonical(value: unknown): string {
  return `sha256:${createHash("sha256").update(canonicalize(value), "utf8").digest("hex")}`
}

export function assertCanonicalFixturePath(path: unknown): asserts path is string {
  assertNonEmptyString(path, "fixture path")
  if (
    path.includes("\\") ||
    path.startsWith("/") ||
    /^[A-Za-z]:/.test(path) ||
    path.includes("://")
  ) {
    fail(`fixture path is non-canonical: ${path}`)
  }
  const segments = path.split("/")
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    fail(`fixture path contains an empty/current/parent segment: ${path}`)
  }
  if (!path.startsWith(`${P2_R1_FIXTURE_ROOT}/`)) {
    fail(`fixture path escapes the authorized P2-R1 root: ${path}`)
  }
}

function parseAnchor(value: unknown, label: string): ChronologyAnchor {
  assertRecord(value, label)
  assertExactKeys(value, ANCHOR_KEYS, label)
  assertNonEmptyString(value.scheme, `${label}.scheme`)
  const ordinal = value.ordinal
  if (ordinal !== null && (!Number.isSafeInteger(ordinal) || (ordinal as number) < 0)) {
    fail(`${label}.ordinal must be a non-negative safe integer or null`)
  }
  return { scheme: value.scheme, ordinal: ordinal as number | null }
}

function parseProvenance(value: unknown, label: string): SourceProvenance {
  assertRecord(value, label)
  assertExactKeys(value, PROVENANCE_KEYS, label)
  if (value.kind !== "repository-authored-synthetic") {
    fail(`${label}.kind is not permitted for P2-R1`)
  }
  assertCanonicalFixturePath(value.path)
  return {
    kind: "repository-authored-synthetic",
    path: value.path,
  }
}

function parseCase(value: unknown, label: string): FixtureCase {
  assertRecord(value, label)
  assertExactKeys(value, CASE_KEYS, label)
  assertNonEmptyString(value.case_id, `${label}.case_id`)
  assertNonEmptyString(value.task_family, `${label}.task_family`)
  assertRecord(value.payload, `${label}.payload`)
  toJsonValue(value.payload, `${label}.payload`)
  return {
    case_id: value.case_id,
    task_family: value.task_family,
    payload: value.payload,
  }
}

export function validateFixtureDocument(
  value: unknown,
  expectedRole?: CorpusRole,
): FixtureDocument {
  assertRecord(value, "fixture document")
  assertExactKeys(value, FIXTURE_KEYS, "fixture document")
  if (value.schema_version !== P2_R1_FIXTURE_SCHEMA) {
    fail(`unsupported fixture schema: ${String(value.schema_version)}`)
  }
  assertNonEmptyString(value.corpus_id, "fixture corpus_id")
  assertCorpusRole(value.corpus_role, "fixture corpus_role")
  if (expectedRole !== undefined && value.corpus_role !== expectedRole) {
    fail(`fixture role ${value.corpus_role} does not match expected role ${expectedRole}`)
  }
  assertNonEmptyString(value.chronology_scheme, "fixture chronology_scheme")
  const chronologyAnchor = parseAnchor(value.chronology_anchor, "fixture chronology_anchor")
  if (chronologyAnchor.scheme !== value.chronology_scheme) {
    fail("fixture chronology anchor scheme does not match chronology_scheme")
  }
  const sourceProvenance = parseProvenance(value.source_provenance, "fixture source_provenance")
  assertContaminationStatus(value.contamination_status, "fixture contamination_status")
  if (!Array.isArray(value.cases) || value.cases.length === 0) {
    fail("fixture cases must be a non-empty array")
  }
  const cases = value.cases.map((entry, index) => parseCase(entry, `fixture cases[${index}]`))
  const ids = new Set<string>()
  for (const fixtureCase of cases) {
    if (ids.has(fixtureCase.case_id)) {
      fail(`duplicate case identity: ${fixtureCase.case_id}`)
    }
    ids.add(fixtureCase.case_id)
  }
  return {
    schema_version: P2_R1_FIXTURE_SCHEMA,
    corpus_id: value.corpus_id,
    corpus_role: value.corpus_role,
    chronology_scheme: value.chronology_scheme,
    chronology_anchor: chronologyAnchor,
    source_provenance: sourceProvenance,
    contamination_status: value.contamination_status,
    cases,
  }
}

export function deriveChronologyStatus(
  development: ChronologyAnchor,
  holdout: ChronologyAnchor,
  chronologyScheme: string,
): ChronologyStatus {
  if (
    development.scheme !== chronologyScheme ||
    holdout.scheme !== chronologyScheme ||
    development.scheme !== holdout.scheme ||
    development.ordinal === null ||
    holdout.ordinal === null
  ) {
    return "chronology-unproven"
  }
  return holdout.ordinal > development.ordinal ? "later-in-time" : "not-later-in-time"
}

export function fixtureCaseDigest(fixtureCase: FixtureCase): string {
  return sha256Canonical(fixtureCase)
}

export function validateCorpusPair(
  developmentInput: unknown,
  holdoutInput: unknown,
): { development: FixtureDocument; holdout: FixtureDocument } {
  const development = validateFixtureDocument(developmentInput, "development")
  const holdout = validateFixtureDocument(holdoutInput, "holdout")
  if (development.corpus_id === holdout.corpus_id) {
    fail("development corpus_id and holdout_id must be distinct")
  }
  const developmentIds = new Set(development.cases.map((entry) => entry.case_id))
  for (const fixtureCase of holdout.cases) {
    if (developmentIds.has(fixtureCase.case_id)) {
      fail(`development and holdout case identities overlap: ${fixtureCase.case_id}`)
    }
  }
  return { development, holdout }
}

function parseMetricDefinitions(value: unknown, taskFamily: string): MetricDefinition[] {
  if (!Array.isArray(value) || value.length === 0) {
    fail("metric_definitions must be a non-empty array")
  }
  const metrics = value.map((entry, index) => {
    const label = `metric_definitions[${index}]`
    assertRecord(entry, label)
    assertExactKeys(entry, METRIC_KEYS, label)
    assertNonEmptyString(entry.task_family, `${label}.task_family`)
    assertNonEmptyString(entry.metric_id, `${label}.metric_id`)
    assertNonEmptyString(entry.unit, `${label}.unit`)
    if (entry.task_family !== taskFamily) {
      fail(`${label} crosses task-family boundary`)
    }
    if (FORBIDDEN_UNIVERSAL_METRICS.has(entry.metric_id)) {
      fail(`${label} attempts to materialize a universal/blended winner metric`)
    }
    return {
      task_family: entry.task_family,
      metric_id: entry.metric_id,
      unit: entry.unit,
    }
  })
  if (new Set(metrics.map((entry) => entry.metric_id)).size !== metrics.length) {
    fail("metric_definitions contains duplicate metric_id values")
  }
  return metrics
}

function assertNotApplicablePair(
  identifier: unknown,
  version: unknown,
  label: string,
): void {
  if (identifier !== NOT_APPLICABLE || version !== NOT_APPLICABLE) {
    fail(`${label} identity must be explicitly not-applicable in P2-R1`)
  }
}

function anchorsEqual(left: ChronologyAnchor, right: ChronologyAnchor): boolean {
  return left.scheme === right.scheme && left.ordinal === right.ordinal
}

export function deriveResultIdentity(
  record: Omit<P2R1ManifestRecord, "result_identity"> | P2R1ManifestRecord,
): string {
  const { result_identity: _ignored, ...identityInput } = record as P2R1ManifestRecord
  return sha256Canonical(identityInput)
}

export function validateManifestRecord(
  value: unknown,
  developmentInput: unknown,
  holdoutInput: unknown,
): P2R1ManifestRecord {
  const { development, holdout } = validateCorpusPair(developmentInput, holdoutInput)
  assertRecord(value, "manifest record")
  assertExactKeys(value, MANIFEST_KEYS, "manifest record")
  if (value.schema_version !== P2_R1_MANIFEST_SCHEMA) {
    fail(`unsupported manifest schema: ${String(value.schema_version)}`)
  }
  for (const key of [
    "benchmark_id",
    "benchmark_protocol_version",
    "corpus_id",
    "holdout_id",
    "chronology_scheme",
    "task_family",
    "case_id",
  ] as const) {
    assertNonEmptyString(value[key], `manifest ${key}`)
  }
  assertSha256(value.corpus_digest, "manifest corpus_digest")
  assertSha256(value.holdout_digest, "manifest holdout_digest")
  assertSha256(value.case_digest, "manifest case_digest")
  assertSha256(value.result_identity, "manifest result_identity")
  assertCorpusRole(value.corpus_role, "manifest corpus_role")
  assertChronologyStatus(value.chronology_status, "manifest chronology_status")
  assertContaminationStatus(value.contamination_status, "manifest contamination_status")

  const developmentFreezeAnchor = parseAnchor(
    value.development_freeze_anchor,
    "manifest development_freeze_anchor",
  )
  const holdoutChronologyAnchor = parseAnchor(
    value.holdout_chronology_anchor,
    "manifest holdout_chronology_anchor",
  )
  const sourceProvenance = parseProvenance(value.source_provenance, "manifest source_provenance")

  if (value.corpus_id !== development.corpus_id) {
    fail("manifest corpus_id does not bind the frozen development corpus")
  }
  if (value.holdout_id !== holdout.corpus_id) {
    fail("manifest holdout_id does not bind the separate holdout")
  }
  if (value.corpus_digest !== sha256Canonical(development)) {
    fail("manifest corpus_digest does not match frozen development content")
  }
  if (value.holdout_digest !== sha256Canonical(holdout)) {
    fail("manifest holdout_digest does not match frozen holdout content")
  }
  if (value.chronology_scheme !== development.chronology_scheme || value.chronology_scheme !== holdout.chronology_scheme) {
    fail("manifest chronology_scheme is not shared by development and holdout")
  }
  if (!anchorsEqual(developmentFreezeAnchor, development.chronology_anchor)) {
    fail("manifest development_freeze_anchor does not match the frozen corpus")
  }
  if (!anchorsEqual(holdoutChronologyAnchor, holdout.chronology_anchor)) {
    fail("manifest holdout_chronology_anchor does not match the holdout")
  }
  const derivedChronology = deriveChronologyStatus(
    developmentFreezeAnchor,
    holdoutChronologyAnchor,
    value.chronology_scheme,
  )
  if (value.chronology_status !== derivedChronology) {
    fail(
      `manifest chronology_status=${value.chronology_status} does not match proven status=${derivedChronology}`,
    )
  }

  const roleDocument = value.corpus_role === "development" ? development : holdout
  const fixtureCase = roleDocument.cases.find((entry) => entry.case_id === value.case_id)
  if (fixtureCase === undefined) {
    fail(`manifest case_id=${value.case_id} is not present in declared corpus_role`)
  }
  if (fixtureCase.task_family !== value.task_family) {
    fail("manifest task_family does not match fixture case")
  }
  if (value.case_digest !== fixtureCaseDigest(fixtureCase)) {
    fail("manifest case_digest does not match fixture case content")
  }
  if (canonicalize(sourceProvenance) !== canonicalize(roleDocument.source_provenance)) {
    fail("manifest source_provenance does not match declared corpus_role")
  }
  if (value.contamination_status !== roleDocument.contamination_status) {
    fail("manifest contamination_status does not match declared corpus_role")
  }

  assertNotApplicablePair(value.strategy_id, value.strategy_version, "strategy")
  assertNotApplicablePair(value.evaluator_id, value.evaluator_version, "evaluator")
  assertNotApplicablePair(value.model_id, value.model_version, "model")
  assertNotApplicablePair(value.provider_id, value.provider_version, "provider")
  if (value.execution_environment_id !== NOT_APPLICABLE) {
    fail("execution_environment_id must be explicitly not-applicable in P2-R1")
  }

  const metrics = parseMetricDefinitions(value.metric_definitions, value.task_family)
  const record: P2R1ManifestRecord = {
    schema_version: P2_R1_MANIFEST_SCHEMA,
    benchmark_id: value.benchmark_id as string,
    benchmark_protocol_version: value.benchmark_protocol_version as string,
    corpus_id: value.corpus_id,
    corpus_digest: value.corpus_digest,
    corpus_role: value.corpus_role,
    development_freeze_anchor: developmentFreezeAnchor,
    holdout_id: value.holdout_id,
    holdout_digest: value.holdout_digest,
    holdout_chronology_anchor: holdoutChronologyAnchor,
    chronology_scheme: value.chronology_scheme,
    chronology_status: value.chronology_status,
    task_family: value.task_family,
    case_id: value.case_id,
    case_digest: value.case_digest,
    strategy_id: value.strategy_id as string,
    strategy_version: value.strategy_version as string,
    evaluator_id: value.evaluator_id as string,
    evaluator_version: value.evaluator_version as string,
    model_id: value.model_id as string,
    model_version: value.model_version as string,
    provider_id: value.provider_id as string,
    provider_version: value.provider_version as string,
    execution_environment_id: value.execution_environment_id as string,
    source_provenance: sourceProvenance,
    contamination_status: value.contamination_status,
    metric_definitions: metrics,
    result_identity: value.result_identity as string,
  }
  if (record.result_identity !== deriveResultIdentity(record)) {
    fail("manifest result_identity does not match canonical evidence-bearing inputs")
  }
  return record
}

export function validateManifestSet(
  value: unknown,
  developmentInput: unknown,
  holdoutInput: unknown,
): P2R1ManifestRecord[] {
  if (!Array.isArray(value) || value.length === 0) {
    fail("manifest must be a non-empty array")
  }
  const records = value.map((entry) =>
    validateManifestRecord(entry, developmentInput, holdoutInput),
  )
  const caseIds = new Set<string>()
  const resultIds = new Set<string>()
  for (const record of records) {
    if (caseIds.has(record.case_id)) {
      fail(`manifest duplicates case_id=${record.case_id}`)
    }
    if (resultIds.has(record.result_identity)) {
      fail(`manifest duplicates result_identity=${record.result_identity}`)
    }
    caseIds.add(record.case_id)
    resultIds.add(record.result_identity)
  }
  return records
}
