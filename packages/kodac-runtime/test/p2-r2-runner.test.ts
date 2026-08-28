import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

import {
  canonicalize,
  deriveResultIdentity,
  validateManifestSet,
  type P2R1ManifestRecord,
} from "../bench/p2-r1/contract.ts"
import {
  P2_R2_OBSERVATION_SCHEMA,
  P2_R2_REPORT_SCHEMA,
  runP2R2Report,
  type P2R2MeasurementStatus,
  type P2R2Observation,
  type P2R2Report,
  type P2R2ReportMetric,
} from "../bench/p2-r2/runner.ts"

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
const manifest = validateManifestSet(manifestRaw, developmentRaw, holdoutRaw)

function observationFor(
  record: P2R1ManifestRecord,
  value: boolean | number | null = true,
  measurementStatus: P2R2MeasurementStatus = "observed",
): P2R2Observation {
  const metric = record.metric_definitions[0]
  if (metric === undefined) {
    throw new Error("fixture record is missing a metric definition")
  }
  return {
    schema_version: P2_R2_OBSERVATION_SCHEMA,
    case_id: record.case_id,
    r1_result_identity: record.result_identity,
    task_family: record.task_family,
    metric_id: metric.metric_id,
    unit: metric.unit,
    measurement_status: measurementStatus,
    value,
  }
}

function completeObservations(): P2R2Observation[] {
  return manifest.map((record) => observationFor(record, true))
}

function metricFrom(
  report: P2R2Report,
  taskFamily: string,
  caseId: string,
  metricId: string,
): P2R2ReportMetric {
  const section = report.task_family_sections.find((entry) => entry.task_family === taskFamily)
  if (section === undefined) {
    throw new Error(`missing task family ${taskFamily}`)
  }
  const reportCase = section.cases.find((entry) => entry.case_id === caseId)
  if (reportCase === undefined) {
    throw new Error(`missing case ${caseId}`)
  }
  const metric = reportCase.metrics.find((entry) => entry.metric_id === metricId)
  if (metric === undefined) {
    throw new Error(`missing metric ${metricId}`)
  }
  return metric
}

function run(observations: unknown = completeObservations(), manifestInput: unknown = manifestRaw) {
  return runP2R2Report(manifestInput, developmentRaw, holdoutRaw, observations)
}

test("P2-R2 committed R1 fixture and manifest spine produces a deterministic report", () => {
  const report = run()
  assert.equal(report.schema_version, P2_R2_REPORT_SCHEMA)
  assert.equal(report.case_count, 4)
  assert.equal(report.observation_count, 4)
  assert.equal(report.missing_observation_count, 0)
  assert.equal(report.task_family_sections.length, 2)
  assert.match(report.r1_manifest_set_digest, /^sha256:[0-9a-f]{64}$/)
  assert.match(report.observation_set_digest, /^sha256:[0-9a-f]{64}$/)
  assert.match(report.report_identity, /^sha256:[0-9a-f]{64}$/)
})

test("P2-R2 revalidates the R1 manifest set before reporting", () => {
  const changed = clone(manifestRaw) as Array<Record<string, unknown>>
  changed[0].result_identity = `sha256:${"0".repeat(64)}`
  assert.throws(() => run(completeObservations(), changed), /P2-R1 contract violation/)
})

test("R1 manifest input order does not change the R2 report identity", () => {
  const forward = run()
  const reversedManifest = [...(clone(manifestRaw) as unknown[])].reverse()
  const reversed = run(completeObservations(), reversedManifest)
  assert.equal(forward.r1_manifest_set_digest, reversed.r1_manifest_set_digest)
  assert.equal(forward.report_identity, reversed.report_identity)
})

test("observation input order does not change canonical report identity", () => {
  const observations = completeObservations()
  const forward = run(observations)
  const reversed = run([...observations].reverse())
  assert.equal(forward.observation_set_digest, reversed.observation_set_digest)
  assert.equal(forward.report_identity, reversed.report_identity)
  assert.equal(canonicalize(forward), canonicalize(reversed))
})

test("repeated identical inputs produce identical report bytes and identity", () => {
  const first = run()
  const second = run()
  assert.equal(first.report_identity, second.report_identity)
  assert.equal(canonicalize(first), canonicalize(second))
})

test("a legitimate evidence-bearing observation change changes report identity", () => {
  const observations = completeObservations()
  const first = run(observations)
  const changed = clone(observations)
  changed[0].value = false
  const second = run(changed)
  assert.notEqual(first.observation_set_digest, second.observation_set_digest)
  assert.notEqual(first.report_identity, second.report_identity)
})

test("unknown case IDs fail closed", () => {
  const observation = observationFor(manifest[0])
  observation.case_id = "unknown-case"
  assert.throws(() => run([observation]), /case_id is not present/)
})

test("R1 result-identity mismatch fails closed", () => {
  const observation = observationFor(manifest[0])
  observation.r1_result_identity = `sha256:${"0".repeat(64)}`
  assert.throws(() => run([observation]), /result identity/)
})

test("task-family mismatch fails closed", () => {
  const observation = observationFor(manifest[0])
  observation.task_family = "other-family"
  assert.throws(() => run([observation]), /task-family boundary/)
})

test("unknown metric IDs fail closed", () => {
  const observation = observationFor(manifest[0])
  observation.metric_id = "unknown_metric"
  assert.throws(() => run([observation]), /metric_id is not declared/)
})

test("metric-unit mismatch fails closed", () => {
  const observation = observationFor(manifest[0])
  observation.unit = "ratio"
  assert.throws(() => run([observation]), /metric unit/)
})

test("duplicate observations fail closed", () => {
  const observation = observationFor(manifest[0])
  assert.throws(() => run([observation, clone(observation)]), /duplicate observation/)
})

test("non-finite observed values fail closed before report identity construction", () => {
  const observation = observationFor(manifest[0], Number.NaN)
  assert.throws(() => run([observation]), /contract violation/)
})

test("observed values must be boolean or finite numeric evidence", () => {
  const observation = observationFor(manifest[0]) as unknown as Record<string, unknown>
  observation.value = "yes"
  assert.throws(() => run([observation]), /boolean or finite number/)
})

test("missing and unavailable states stay explicit and never become zero or success", () => {
  const observed = observationFor(manifest[0], true)
  const unavailable = observationFor(manifest[1], null, "unavailable")
  const report = run([observed, unavailable])

  assert.equal(report.observation_count, 1)
  assert.equal(report.missing_observation_count, 3)

  const unavailableMetric = metricFrom(
    report,
    manifest[1].task_family,
    manifest[1].case_id,
    manifest[1].metric_definitions[0].metric_id,
  )
  assert.equal(unavailableMetric.measurement_status, "unavailable")
  assert.equal(unavailableMetric.value, null)

  const omittedMetric = metricFrom(
    report,
    manifest[2].task_family,
    manifest[2].case_id,
    manifest[2].metric_definitions[0].metric_id,
  )
  assert.equal(omittedMetric.measurement_status, "missing")
  assert.equal(omittedMetric.value, null)
})

test("missing or unavailable caller observations require a null value", () => {
  assert.throws(
    () => run([observationFor(manifest[0], true, "missing")]),
    /value must be null/,
  )
  assert.throws(
    () => run([observationFor(manifest[0], false, "unavailable")]),
    /value must be null/,
  )
})

test("task-family sections remain separate and deterministically ordered", () => {
  const report = run()
  assert.deepEqual(
    report.task_family_sections.map((entry) => entry.task_family),
    ["finding-verification", "patch-analysis"],
  )
  for (const section of report.task_family_sections) {
    assert.ok(section.cases.every((entry) => manifest.find((record) => record.case_id === entry.case_id)?.task_family === section.task_family))
  }
})

test("R2 materializes no universal score, ranking, winner, or inferred reducer field", () => {
  const report = run()
  assert.deepEqual(Object.keys(report).sort(), [
    "benchmark_id",
    "benchmark_protocol_version",
    "case_count",
    "missing_observation_count",
    "observation_count",
    "observation_set_digest",
    "r1_manifest_set_digest",
    "report_identity",
    "schema_version",
    "task_family_sections",
  ])
  const serialized = canonicalize(report)
  for (const forbidden of [
    "overall_score",
    "blended_score",
    "universal_score",
    "ranking",
    "winner",
    "superior",
    "mean",
    "threshold",
  ]) {
    assert.equal(serialized.includes(`\"${forbidden}\"`), false)
  }
})

test("deterministic completeness counts match the observed and missing slot set", () => {
  const observations = [observationFor(manifest[0]), observationFor(manifest[2])]
  const report = run(observations)
  assert.equal(report.case_count, 4)
  assert.equal(report.observation_count, 2)
  assert.equal(report.missing_observation_count, 2)
})

test("caller input mutation after return cannot mutate report semantics", () => {
  const observations = completeObservations()
  const report = run(observations)
  const identity = report.report_identity
  const firstMetric = metricFrom(
    report,
    manifest[0].task_family,
    manifest[0].case_id,
    manifest[0].metric_definitions[0].metric_id,
  )
  assert.equal(firstMetric.value, true)

  observations[0].value = false
  observations[0].metric_id = "mutated-after-return"

  assert.equal(report.report_identity, identity)
  assert.equal(firstMetric.value, true)
  assert.equal(Object.isFrozen(report), true)
  assert.equal(Object.isFrozen(report.task_family_sections), true)
  assert.equal(Object.isFrozen(report.task_family_sections[0].cases), true)
  assert.equal(Object.isFrozen(report.task_family_sections[0].cases[0].metrics), true)
})

test("hostile observation objects fail closed without invoking accessors or proxies", () => {
  let getterInvoked = false
  const accessor = clone(observationFor(manifest[0])) as Record<string, unknown>
  Object.defineProperty(accessor, "value", {
    enumerable: true,
    configurable: true,
    get() {
      getterInvoked = true
      return true
    },
  })

  const symbolRecord = clone(observationFor(manifest[0])) as unknown as Record<string, unknown>
  Object.defineProperty(symbolRecord, Symbol("hidden"), {
    enumerable: true,
    value: "hidden",
  })

  const nonPlain = Object.create({ inherited: true }) as Record<string, unknown>
  Object.assign(nonPlain, observationFor(manifest[0]))

  const proxy = new Proxy(observationFor(manifest[0]) as unknown as Record<string, unknown>, {
    get() {
      throw new Error("proxy getter must not execute")
    },
  })

  for (const candidate of [accessor, symbolRecord, nonPlain, proxy]) {
    assert.throws(() => run([candidate]), /contract violation/)
  }
  assert.equal(getterInvoked, false)
})

test("hostile observation arrays and non-JSON values fail closed", () => {
  const sparse = new Array<unknown>(2)
  sparse[1] = observationFor(manifest[0])

  let arrayGetterInvoked = false
  const accessorArray: unknown[] = [observationFor(manifest[0])]
  Object.defineProperty(accessorArray, "0", {
    enumerable: true,
    configurable: true,
    get() {
      arrayGetterInvoked = true
      return observationFor(manifest[0])
    },
  })

  const extendedArray: unknown[] = [observationFor(manifest[0])]
  Object.defineProperty(extendedArray, "extra", {
    enumerable: false,
    value: true,
  })

  const cyclic: unknown[] = []
  cyclic.push(cyclic)

  const functionValue = observationFor(manifest[0]) as unknown as Record<string, unknown>
  functionValue.value = () => true

  const bigintValue = observationFor(manifest[0]) as unknown as Record<string, unknown>
  bigintValue.value = 1n

  for (const candidate of [sparse, accessorArray, extendedArray, cyclic, [functionValue], [bigintValue]]) {
    assert.throws(() => run(candidate), /contract violation/)
  }
  assert.equal(arrayGetterInvoked, false)
})

test("__proto__ remains ordinary canonical data and cannot pollute an intermediate prototype", () => {
  const observation = Object.create(null) as Record<string, unknown>
  Object.assign(observation, observationFor(manifest[0]))
  Object.defineProperty(observation, "__proto__", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { polluted: true },
  })

  const serialized = canonicalize(observation)
  assert.match(serialized, /"__proto__"/)
  assert.equal((Object.prototype as Record<string, unknown>).polluted, undefined)
  assert.throws(() => run([observation]), /keys are not canonical/)
  assert.equal((Object.prototype as Record<string, unknown>).polluted, undefined)
})

test("timestamps, absolute paths, and process state are not report identity inputs", () => {
  const observations = completeObservations()
  const before = run(observations)
  const oldNoise = process.env.KODAC_P2_R2_IDENTITY_NOISE
  process.env.KODAC_P2_R2_IDENTITY_NOISE = "/tmp/host-specific/path/2026-08-28T13:00:00Z"
  try {
    const after = run(observations)
    assert.equal(before.report_identity, after.report_identity)
  } finally {
    if (oldNoise === undefined) {
      delete process.env.KODAC_P2_R2_IDENTITY_NOISE
    } else {
      process.env.KODAC_P2_R2_IDENTITY_NOISE = oldNoise
    }
  }

  const withTimestamp = observationFor(manifest[0]) as unknown as Record<string, unknown>
  withTimestamp.timestamp = "2026-08-28T13:00:00Z"
  assert.throws(() => run([withTimestamp]), /keys are not canonical/)

  const withPath = observationFor(manifest[0]) as unknown as Record<string, unknown>
  withPath.absolute_path = "/tmp/machine-specific"
  assert.throws(() => run([withPath]), /keys are not canonical/)
})

test("R2 rejects a validated R1 set that mixes benchmark identities", () => {
  const changed = clone(manifest) as P2R1ManifestRecord[]
  changed[0].benchmark_id = "other-benchmark"
  changed[0].result_identity = deriveResultIdentity(changed[0])
  assert.throws(
    () => runP2R2Report(changed, developmentRaw, holdoutRaw, [],),
    /multiple benchmark_id values/,
  )
})
