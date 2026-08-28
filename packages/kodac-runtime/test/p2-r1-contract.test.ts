import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

import {
  NOT_APPLICABLE,
  assertCanonicalFixturePath,
  canonicalize,
  deriveChronologyStatus,
  deriveResultIdentity,
  fixtureCaseDigest,
  sha256Canonical,
  validateCorpusPair,
  validateFixtureDocument,
  validateManifestRecord,
  validateManifestSet,
  type FixtureDocument,
  type P2R1ManifestRecord,
} from "../bench/p2-r1/contract.ts"

function loadFixture(name: string): unknown {
  return JSON.parse(
    readFileSync(new URL(`./fixtures/p2-r1/${name}`, import.meta.url), "utf8"),
  )
}

function clone<T>(value: T): T {
  return structuredClone(value)
}

const developmentRaw = loadFixture("development.json")
const holdoutRaw = loadFixture("holdout.json")
const manifestRaw = loadFixture("manifest.json")

const development = validateFixtureDocument(developmentRaw, "development")
const holdout = validateFixtureDocument(holdoutRaw, "holdout")
const manifest = validateManifestSet(manifestRaw, developmentRaw, holdoutRaw)

function reboundRecord(
  source: P2R1ManifestRecord,
  developmentDocument: FixtureDocument,
  holdoutDocument: FixtureDocument,
): P2R1ManifestRecord {
  const record = clone(source)
  record.corpus_id = developmentDocument.corpus_id
  record.corpus_digest = sha256Canonical(developmentDocument)
  record.development_freeze_anchor = clone(developmentDocument.chronology_anchor)
  record.holdout_id = holdoutDocument.corpus_id
  record.holdout_digest = sha256Canonical(holdoutDocument)
  record.holdout_chronology_anchor = clone(holdoutDocument.chronology_anchor)
  record.chronology_scheme = developmentDocument.chronology_scheme
  record.result_identity = deriveResultIdentity(record)
  return record
}

test("P2-R1 committed fixture and manifest spine validates", () => {
  assert.equal(manifest.length, 4)
  assert.equal(new Set(manifest.map((entry) => entry.case_id)).size, 4)
  assert.equal(new Set(manifest.map((entry) => entry.result_identity)).size, 4)
})

test("canonical serialization is stable under object-key reordering", () => {
  const left = { z: 1, nested: { b: true, a: "same" }, a: [2, 1] }
  const right = { a: [2, 1], nested: { a: "same", b: true }, z: 1 }
  assert.equal(canonicalize(left), canonicalize(right))
  assert.equal(sha256Canonical(left), sha256Canonical(right))
})

test("canonical serialization preserves __proto__ as an ordinary data key", () => {
  const withProtoKey = Object.create(null) as Record<string, unknown>
  withProtoKey.safe = 1
  Object.defineProperty(withProtoKey, "__proto__", {
    value: { injected: true },
    enumerable: true,
    configurable: true,
    writable: true,
  })
  const withoutProtoKey = Object.create(null) as Record<string, unknown>
  withoutProtoKey.safe = 1

  assert.match(canonicalize(withProtoKey), /"__proto__"/)
  assert.notEqual(canonicalize(withProtoKey), canonicalize(withoutProtoKey))
  assert.notEqual(sha256Canonical(withProtoKey), sha256Canonical(withoutProtoKey))
})

test("canonicalization rejects hostile object structures without invoking accessors", () => {
  let getterInvoked = false
  const accessorRecord: Record<string, unknown> = {}
  Object.defineProperty(accessorRecord, "value", {
    enumerable: true,
    configurable: true,
    get() {
      getterInvoked = true
      return 1
    },
  })

  const symbolRecord: Record<string, unknown> = { value: 1 }
  Object.defineProperty(symbolRecord, Symbol("hidden"), {
    value: 2,
    enumerable: true,
  })

  const nonPlainRecord = Object.create({ inherited: true }) as Record<string, unknown>
  nonPlainRecord.value = 1

  const proxyRecord = new Proxy<Record<string, unknown>>(
    { value: 1 },
    {
      get() {
        throw new Error("proxy getter must not execute")
      },
    },
  )

  for (const candidate of [accessorRecord, symbolRecord, nonPlainRecord, proxyRecord]) {
    assert.throws(() => canonicalize(candidate), /P2-R1 contract violation/)
  }
  assert.equal(getterInvoked, false)
})

test("canonicalization rejects sparse, accessor, extended, non-canonical arrays and cycles", () => {
  const sparse = new Array<unknown>(2)
  sparse[1] = "present"

  let arrayGetterInvoked = false
  const accessorArray: unknown[] = [0]
  Object.defineProperty(accessorArray, "0", {
    enumerable: true,
    configurable: true,
    get() {
      arrayGetterInvoked = true
      return 1
    },
  })

  const extendedArray: unknown[] = [1]
  Object.defineProperty(extendedArray, "extra", {
    value: 2,
    enumerable: false,
  })

  const nonCanonicalArray: unknown[] = [1]
  Object.setPrototypeOf(nonCanonicalArray, null)

  const cyclic: Record<string, unknown> = {}
  cyclic.self = cyclic

  for (const candidate of [sparse, accessorArray, extendedArray, nonCanonicalArray, cyclic]) {
    assert.throws(() => canonicalize(candidate), /P2-R1 contract violation/)
  }
  assert.equal(arrayGetterInvoked, false)
})

test("fixture validation rejects hostile nested payloads before identity construction", () => {
  let getterInvoked = false
  const changed = clone(development) as FixtureDocument
  const payload: Record<string, unknown> = {}
  Object.defineProperty(payload, "hidden", {
    enumerable: true,
    configurable: true,
    get() {
      getterInvoked = true
      return "must-not-run"
    },
  })
  changed.cases[0].payload = payload

  assert.throws(() => validateFixtureDocument(changed), /P2-R1 contract violation/)
  assert.equal(getterInvoked, false)
})

test("frozen development and holdout digests are deterministic and distinct", () => {
  assert.equal(
    sha256Canonical(development),
    "sha256:440e4e69c1a4cd70d90a1c7a419fc20becd16e4234c78068a11931dd7c881d96",
  )
  assert.equal(
    sha256Canonical(holdout),
    "sha256:32b5d96f9fbe62d21d1b2a168bffdbb253dfcf1339a10bc62502e7caf5f62398",
  )
  assert.notEqual(sha256Canonical(development), sha256Canonical(holdout))
})

test("development corpus and holdout identities cannot alias", () => {
  const aliased = clone(holdout)
  aliased.corpus_id = development.corpus_id
  assert.throws(() => validateCorpusPair(development, aliased), /must be distinct/)
})

test("development and holdout case identities cannot silently overlap", () => {
  const overlapping = clone(holdout)
  overlapping.cases[0].case_id = development.cases[0].case_id
  assert.throws(() => validateCorpusPair(development, overlapping), /overlap/)
})

test("ordered synthetic fixture epochs prove only contract ordering", () => {
  assert.equal(development.source_provenance.kind, "repository-authored-synthetic")
  assert.equal(holdout.source_provenance.kind, "repository-authored-synthetic")
  assert.equal(
    deriveChronologyStatus(
      development.chronology_anchor,
      holdout.chronology_anchor,
      "fixture-epoch-v1",
    ),
    "later-in-time",
  )
})

test("equal chronology cannot validate a later-in-time claim", () => {
  const changedHoldout = clone(holdout)
  changedHoldout.chronology_anchor.ordinal = development.chronology_anchor.ordinal
  const record = reboundRecord(manifest[2], development, changedHoldout)
  assert.throws(
    () => validateManifestRecord(record, development, changedHoldout),
    /does not match proven status=not-later-in-time/,
  )
})

test("earlier chronology cannot validate a later-in-time claim", () => {
  const changedDevelopment = clone(development)
  changedDevelopment.chronology_anchor.ordinal = 2
  const changedHoldout = clone(holdout)
  changedHoldout.chronology_anchor.ordinal = 1
  const record = reboundRecord(manifest[2], changedDevelopment, changedHoldout)
  assert.throws(
    () => validateManifestRecord(record, changedDevelopment, changedHoldout),
    /does not match proven status=not-later-in-time/,
  )
})

test("incomparable chronology fails closed for a later-in-time claim", () => {
  const changedHoldout = clone(holdout)
  changedHoldout.chronology_scheme = "fixture-epoch-v2"
  changedHoldout.chronology_anchor.scheme = "fixture-epoch-v2"
  const record = reboundRecord(manifest[2], development, changedHoldout)
  assert.throws(
    () => validateManifestRecord(record, development, changedHoldout),
    /chronology_scheme is not shared/,
  )
})

test("missing chronology proof fails closed for a later-in-time claim", () => {
  const changedHoldout = clone(holdout)
  changedHoldout.chronology_anchor.ordinal = null
  const record = reboundRecord(manifest[2], development, changedHoldout)
  assert.throws(
    () => validateManifestRecord(record, development, changedHoldout),
    /does not match proven status=chronology-unproven/,
  )
})

test("chronology-unproven remains distinct from later-in-time", () => {
  assert.equal(
    deriveChronologyStatus(
      { scheme: "fixture-epoch-v1", ordinal: 1 },
      { scheme: "fixture-epoch-v1", ordinal: null },
      "fixture-epoch-v1",
    ),
    "chronology-unproven",
  )
  assert.notEqual("chronology-unproven", "later-in-time")
})

test("duplicate case identities inside a fixture fail closed", () => {
  const duplicated = clone(development)
  duplicated.cases.push(clone(duplicated.cases[0]))
  assert.throws(() => validateFixtureDocument(duplicated), /duplicate case identity/)
})

test("case-content digest mismatch fails closed", () => {
  const changed = clone(manifest[0])
  changed.case_digest = `sha256:${"0".repeat(64)}`
  changed.result_identity = deriveResultIdentity(changed)
  assert.throws(
    () => validateManifestRecord(changed, development, holdout),
    /case_digest does not match/,
  )
})

test("case digests are deterministic", () => {
  assert.equal(
    fixtureCaseDigest(development.cases[0]),
    "sha256:894846e1436e7a498853cc2ca46799225b29a1e6e4c4f499863e53d61b5c5e66",
  )
  assert.equal(fixtureCaseDigest(development.cases[0]), fixtureCaseDigest(clone(development.cases[0])))
})

test("unsupported schema versions fail closed", () => {
  const changed = clone(manifest[0])
  changed.schema_version = "p2-r1-manifest/v999"
  changed.result_identity = deriveResultIdentity(changed)
  assert.throws(
    () => validateManifestRecord(changed, development, holdout),
    /unsupported manifest schema/,
  )
})

test("unknown manifest fields fail closed", () => {
  const changed = { ...clone(manifest[0]), surprise_field: "forbidden" }
  assert.throws(
    () => validateManifestRecord(changed, development, holdout),
    /keys are not canonical/,
  )
})

test("missing required manifest fields fail closed", () => {
  const changed = clone(manifest[0]) as Partial<P2R1ManifestRecord>
  delete changed.benchmark_id
  assert.throws(
    () => validateManifestRecord(changed, development, holdout),
    /keys are not canonical/,
  )
})

test("unknown fixture fields fail closed", () => {
  const changed = { ...clone(development), local_timestamp: "2026-08-28T00:00:00Z" }
  assert.throws(() => validateFixtureDocument(changed), /keys are not canonical/)
})

test("non-canonical and escaping fixture paths fail closed", () => {
  for (const path of [
    "/tmp/p2-r1.json",
    "C:/tmp/p2-r1.json",
    "packages/kodac-runtime/test/fixtures/p2-r1/../secret.json",
    "packages\\kodac-runtime\\test\\fixtures\\p2-r1\\case.json",
    "packages/kodac-runtime/test/fixtures/other/case.json",
  ]) {
    assert.throws(() => assertCanonicalFixturePath(path), /P2-R1 contract violation/)
  }
})

test("contamination unknown remains distinct from none-known", () => {
  assert.equal(development.contamination_status, "none-known")
  assert.equal(holdout.contamination_status, "unknown")
  assert.notEqual(holdout.contamination_status, development.contamination_status)
})

test("metric declarations remain inside their task family", () => {
  for (const record of manifest) {
    assert.ok(record.metric_definitions.length > 0)
    assert.ok(record.metric_definitions.every((metric) => metric.task_family === record.task_family))
  }
  const changed = clone(manifest[0])
  changed.metric_definitions[0].task_family = "finding-verification"
  changed.result_identity = deriveResultIdentity(changed)
  assert.throws(
    () => validateManifestRecord(changed, development, holdout),
    /crosses task-family boundary/,
  )
})

test("universal or blended winner metrics are rejected", () => {
  for (const metricId of ["best", "winner", "overall_score", "blended_score", "universal_score"]) {
    const changed = clone(manifest[0])
    changed.metric_definitions[0].metric_id = metricId
    changed.result_identity = deriveResultIdentity(changed)
    assert.throws(
      () => validateManifestRecord(changed, development, holdout),
      /universal\/blended winner metric/,
    )
  }
})

test("uninvoked participant and environment identities stay explicitly not-applicable", () => {
  for (const record of manifest) {
    assert.equal(record.strategy_id, NOT_APPLICABLE)
    assert.equal(record.evaluator_id, NOT_APPLICABLE)
    assert.equal(record.model_id, NOT_APPLICABLE)
    assert.equal(record.provider_id, NOT_APPLICABLE)
    assert.equal(record.execution_environment_id, NOT_APPLICABLE)
  }
  const changed = clone(manifest[0])
  changed.provider_id = "invented-provider"
  changed.provider_version = "invented-version"
  changed.result_identity = deriveResultIdentity(changed)
  assert.throws(
    () => validateManifestRecord(changed, development, holdout),
    /provider identity must be explicitly not-applicable/,
  )
})

test("timestamps and absolute workspace metadata stay outside semantic identity", () => {
  const baseline = deriveResultIdentity(manifest[0])
  const presentation = {
    record: clone(manifest[0]),
    observed_at: "2099-01-01T00:00:00Z",
    absolute_workspace_path: "/tmp/arbitrary/worktree",
  }
  assert.equal(deriveResultIdentity(presentation.record), baseline)
  assert.throws(
    () => validateManifestRecord({ ...presentation.record, observed_at: presentation.observed_at }, development, holdout),
    /keys are not canonical/,
  )
  assert.throws(
    () => validateManifestRecord({ ...presentation.record, absolute_workspace_path: presentation.absolute_workspace_path }, development, holdout),
    /keys are not canonical/,
  )
})

test("repeated identical evidence-bearing inputs produce identical result identities", () => {
  for (const record of manifest) {
    assert.equal(deriveResultIdentity(record), record.result_identity)
    assert.equal(deriveResultIdentity(clone(record)), record.result_identity)
  }
})
