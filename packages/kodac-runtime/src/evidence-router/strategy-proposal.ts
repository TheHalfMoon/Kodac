import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

import {
  K6_R1_LIMITS,
  canonicalK6R1Json,
  validateK6R1RouteRequest,
} from "./contracts.ts"
import {
  K6_R5_LIMITS,
  K6_R5_PRIVACY_CLASSES,
  K6_R5_QUALIFICATION_OUTCOMES,
  K6_R5_QUALIFICATION_RESULT_VERSION,
  K6_R5_STRATEGY_EVIDENCE_VERSION,
  K6_R5_STRATEGY_KIND,
  K6_R5_STRATEGY_VERSION,
  type K6R5PrivacyClass,
  type K6R5QualificationOutcome,
  type K6R5QualificationResult,
  type K6R5QualificationResultIdentityInput,
  type K6R5Strategy,
  type K6R5StrategyEvidence,
  type K6R5StrategyEvidenceIdentityInput,
  type K6R5StrategyIdentityInput,
  type K6R5StrategyScope,
} from "./strategy-proposal-contracts.ts"

const SHA256 = /^[0-9a-f]{64}$/
const PRIVACY_CLASS_SET = new Set<string>(K6_R5_PRIVACY_CLASSES)
const OUTCOME_SET = new Set<string>(K6_R5_QUALIFICATION_OUTCOMES)

type UnknownRecord = Record<string, unknown>

interface GraphBudget {
  readonly active: WeakSet<object>
  nodes: number
}

const SCOPE_KEYS = [
  "repositoryIdentity",
  "revisionIdentity",
  "ownerScopeId",
  "privacyClass",
  "taskFamilyIdentity",
] as const
const STRATEGY_IDENTITY_INPUT_KEYS = ["version", "kind", "scope", "orderedCandidateIdentities"] as const
const STRATEGY_KEYS = ["version", "strategyIdentity", "kind", "scope", "orderedCandidateIdentities"] as const
const EVIDENCE_IDENTITY_INPUT_KEYS = [
  "version",
  "strategyIdentity",
  "scope",
  "qualificationCorpusIdentity",
  "trialSetIdentity",
  "trialCaseIdentities",
  "trialCount",
  "verifiedPassCount",
  "k5ValidCount",
  "doneReadyCount",
  "latencyTotalMs",
  "computeUnitsTotal",
  "privacyViolationCount",
  "securityViolationCount",
  "verificationEvidenceIdentity",
  "k5EvidenceIdentity",
  "doneGateEvidenceIdentity",
  "latencyEvidenceIdentity",
  "computeEvidenceIdentity",
  "privacyEvidenceIdentity",
  "securityEvidenceIdentity",
] as const
const EVIDENCE_KEYS = ["version", "evidenceIdentity", ...EVIDENCE_IDENTITY_INPUT_KEYS.slice(1)] as const
const RESULT_IDENTITY_INPUT_KEYS = [
  "version",
  "incumbentStrategyIdentity",
  "candidateStrategyIdentity",
  "incumbentEvidenceIdentity",
  "candidateEvidenceIdentity",
  "qualificationCorpusIdentity",
  "trialSetIdentity",
  "trialCount",
  "outcome",
] as const
const RESULT_KEYS = ["version", "resultIdentity", ...RESULT_IDENTITY_INPUT_KEYS.slice(1)] as const

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

function inspectGraph(value: unknown, label: string, budget: GraphBudget, depth = 1): void {
  if (depth > K6_R5_LIMITS.maxCanonicalDepth) {
    tooLarge(label, `exceeds canonical depth ${K6_R5_LIMITS.maxCanonicalDepth}`)
  }
  budget.nodes += 1
  if (budget.nodes > K6_R5_LIMITS.maxCanonicalNodes) {
    tooLarge(label, `exceeds canonical node count ${K6_R5_LIMITS.maxCanonicalNodes}`)
  }
  if (value === null || typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
    if (typeof value === "string") validUnicodeScalars(value, label)
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
      const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length")
      const length = lengthDescriptor && "value" in lengthDescriptor ? lengthDescriptor.value : undefined
      if (typeof length !== "number" || !Number.isSafeInteger(length) || Object.is(length, -0) || length < 0) {
        bad(label, "must have a valid data length")
      }
      for (let index = 0; index < length; index += 1) {
        const descriptor = Object.getOwnPropertyDescriptor(value, String(index))
        if (descriptor === undefined) bad(label, "must be dense")
        if (!("value" in descriptor) || !descriptor.enumerable || descriptor.value === undefined) {
          bad(`${label}[${index}]`, "must be an enumerable defined data property")
        }
        inspectGraph(descriptor.value, `${label}[${index}]`, budget, depth + 1)
      }
      if (Object.getOwnPropertyNames(value).length !== length + 1) bad(label, "contains unexpected array fields")
      return
    }
    const prototype = Object.getPrototypeOf(value)
    if (prototype !== Object.prototype && prototype !== null) bad(label, "must be a plain object")
    if (Object.getOwnPropertySymbols(value).length !== 0) bad(label, "must not contain symbol fields")
    for (const key of Object.getOwnPropertyNames(value)) {
      validUnicodeScalars(key, `${label} property name`)
      const descriptor = Object.getOwnPropertyDescriptor(value, key)
      if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable || descriptor.value === undefined) {
        bad(`${label}.${key}`, "must be an enumerable defined data property")
      }
      inspectGraph(descriptor.value, `${label}.${key}`, budget, depth + 1)
    }
  } finally {
    budget.active.delete(value)
  }
}

function assertSafeGraph(value: unknown, label: string): void {
  inspectGraph(value, label, { active: new WeakSet<object>(), nodes: 0 })
}

function plainRecord(value: unknown, keys: readonly string[], label: string): UnknownRecord {
  noProxy(value, label)
  if (value === null || typeof value !== "object" || Array.isArray(value)) bad(label, "must be a plain object")
  const prototype = Object.getPrototypeOf(value)
  if (prototype !== Object.prototype && prototype !== null) bad(label, "must be a plain object")
  if (Object.getOwnPropertySymbols(value).length !== 0) bad(label, "must not contain symbol fields")
  const names = Object.getOwnPropertyNames(value)
  if (names.length !== keys.length) bad(label, "has an invalid key set")
  const allowed = new Set<string>(keys)
  const output = Object.create(null) as UnknownRecord
  for (const key of names) {
    if (!allowed.has(key)) bad(label, `contains unknown field: ${key}`)
    const descriptor = Object.getOwnPropertyDescriptor(value, key)
    if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable || descriptor.value === undefined) {
      bad(`${label}.${key}`, "must be an enumerable defined data property")
    }
    output[key] = descriptor.value
  }
  for (const key of keys) if (!Object.hasOwn(output, key)) bad(label, `is missing required field: ${key}`)
  return output
}

function denseArray(value: unknown, label: string, min: number, max: number): readonly unknown[] {
  noProxy(value, label)
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) bad(label, "must be a plain array")
  if (Object.getOwnPropertySymbols(value).length !== 0) bad(label, "must not contain symbol fields")
  const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length")
  const length = lengthDescriptor && "value" in lengthDescriptor ? lengthDescriptor.value : undefined
  if (typeof length !== "number" || !Number.isSafeInteger(length) || Object.is(length, -0) || length < min || length > max) {
    tooLarge(label, `must contain ${min} through ${max} entries`)
  }
  const output: unknown[] = []
  for (let index = 0; index < length; index += 1) {
    const descriptor = Object.getOwnPropertyDescriptor(value, String(index))
    if (descriptor === undefined) bad(label, "must be dense")
    if (!("value" in descriptor) || !descriptor.enumerable || descriptor.value === undefined) {
      bad(`${label}[${index}]`, "must be an enumerable defined data property")
    }
    output.push(descriptor.value)
  }
  if (Object.getOwnPropertyNames(value).length !== length + 1) bad(label, "contains unexpected array fields")
  return output
}

function exactString<T extends string>(value: unknown, expected: T, label: string): T {
  if (value !== expected) bad(label, `must equal ${expected}`)
  return expected
}

function enumString<T extends string>(value: unknown, allowed: ReadonlySet<string>, label: string): T {
  if (typeof value !== "string" || !allowed.has(value)) bad(label, "is unsupported")
  return value as T
}

function sha256(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) bad(label, "must be 64 lowercase hexadecimal characters")
  return value
}

function nonNegativeSafeInteger(value: unknown, label: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || Object.is(value, -0) || value < 0) {
    bad(label, "must be a non-negative safe integer")
  }
  return value
}

function digest(value: unknown): string {
  return createHash("sha256").update(canonicalK6R1Json(value), "utf8").digest("hex")
}

function parseScope(value: unknown, label: string): K6R5StrategyScope {
  const record = plainRecord(value, SCOPE_KEYS, label)
  return Object.freeze({
    repositoryIdentity: sha256(record.repositoryIdentity, `${label}.repositoryIdentity`),
    revisionIdentity: sha256(record.revisionIdentity, `${label}.revisionIdentity`),
    ownerScopeId: sha256(record.ownerScopeId, `${label}.ownerScopeId`),
    privacyClass: enumString<K6R5PrivacyClass>(record.privacyClass, PRIVACY_CLASS_SET, `${label}.privacyClass`),
    taskFamilyIdentity: sha256(record.taskFamilyIdentity, `${label}.taskFamilyIdentity`),
  })
}

function parseIdentityArray(value: unknown, label: string, max: number): readonly string[] {
  const values = denseArray(value, label, 1, max)
  const parsed = values.map((item, index) => sha256(item, `${label}[${index}]`))
  if (new Set(parsed).size !== parsed.length) bad(label, "must not contain duplicate identities")
  return Object.freeze(parsed.slice())
}

function parseStrategyIdentityInput(value: unknown, label = "R5 strategy"): K6R5StrategyIdentityInput {
  assertSafeGraph(value, label)
  const record = plainRecord(value, STRATEGY_IDENTITY_INPUT_KEYS, label)
  return Object.freeze({
    version: exactString(record.version, K6_R5_STRATEGY_VERSION, `${label}.version`),
    kind: exactString(record.kind, K6_R5_STRATEGY_KIND, `${label}.kind`),
    scope: parseScope(record.scope, `${label}.scope`),
    orderedCandidateIdentities: parseIdentityArray(
      record.orderedCandidateIdentities,
      `${label}.orderedCandidateIdentities`,
      K6_R5_LIMITS.maxOrderedCandidateIdentities,
    ),
  })
}

function parseStrategy(value: unknown, label = "R5 strategy"): K6R5Strategy {
  assertSafeGraph(value, label)
  const record = plainRecord(value, STRATEGY_KEYS, label)
  const input = parseStrategyIdentityInput({
    version: record.version,
    kind: record.kind,
    scope: record.scope,
    orderedCandidateIdentities: record.orderedCandidateIdentities,
  }, label)
  const strategyIdentity = sha256(record.strategyIdentity, `${label}.strategyIdentity`)
  if (strategyIdentity !== digest(input)) bad(`${label}.strategyIdentity`, "does not match deterministic recomputation")
  return Object.freeze({
    version: input.version,
    strategyIdentity,
    kind: input.kind,
    scope: input.scope,
    orderedCandidateIdentities: input.orderedCandidateIdentities,
  })
}

function trialSetIdentityFromParsed(qualificationCorpusIdentity: string, trialCaseIdentities: readonly string[]): string {
  return digest({ kind: "K6_R5_TRIAL_SET", qualificationCorpusIdentity, trialCaseIdentities })
}

function parseEvidenceIdentityInput(value: unknown, label = "R5 strategy evidence"): K6R5StrategyEvidenceIdentityInput {
  assertSafeGraph(value, label)
  const record = plainRecord(value, EVIDENCE_IDENTITY_INPUT_KEYS, label)
  const qualificationCorpusIdentity = sha256(record.qualificationCorpusIdentity, `${label}.qualificationCorpusIdentity`)
  const trialCaseIdentities = parseIdentityArray(
    record.trialCaseIdentities,
    `${label}.trialCaseIdentities`,
    K6_R5_LIMITS.maxTrialCaseIdentities,
  )
  const trialCount = nonNegativeSafeInteger(record.trialCount, `${label}.trialCount`)
  if (trialCount < 1 || trialCount !== trialCaseIdentities.length) {
    bad(`${label}.trialCount`, "must equal the non-zero trialCaseIdentities length")
  }
  const trialSetIdentity = sha256(record.trialSetIdentity, `${label}.trialSetIdentity`)
  if (trialSetIdentity !== trialSetIdentityFromParsed(qualificationCorpusIdentity, trialCaseIdentities)) {
    bad(`${label}.trialSetIdentity`, "does not match deterministic recomputation")
  }
  const verifiedPassCount = nonNegativeSafeInteger(record.verifiedPassCount, `${label}.verifiedPassCount`)
  const k5ValidCount = nonNegativeSafeInteger(record.k5ValidCount, `${label}.k5ValidCount`)
  const doneReadyCount = nonNegativeSafeInteger(record.doneReadyCount, `${label}.doneReadyCount`)
  const privacyViolationCount = nonNegativeSafeInteger(record.privacyViolationCount, `${label}.privacyViolationCount`)
  const securityViolationCount = nonNegativeSafeInteger(record.securityViolationCount, `${label}.securityViolationCount`)
  for (const [field, count] of [
    ["verifiedPassCount", verifiedPassCount],
    ["k5ValidCount", k5ValidCount],
    ["doneReadyCount", doneReadyCount],
    ["privacyViolationCount", privacyViolationCount],
    ["securityViolationCount", securityViolationCount],
  ] as const) {
    if (count > trialCount) bad(`${label}.${field}`, "must not exceed trialCount")
  }
  return Object.freeze({
    version: exactString(record.version, K6_R5_STRATEGY_EVIDENCE_VERSION, `${label}.version`),
    strategyIdentity: sha256(record.strategyIdentity, `${label}.strategyIdentity`),
    scope: parseScope(record.scope, `${label}.scope`),
    qualificationCorpusIdentity,
    trialSetIdentity,
    trialCaseIdentities,
    trialCount,
    verifiedPassCount,
    k5ValidCount,
    doneReadyCount,
    latencyTotalMs: nonNegativeSafeInteger(record.latencyTotalMs, `${label}.latencyTotalMs`),
    computeUnitsTotal: nonNegativeSafeInteger(record.computeUnitsTotal, `${label}.computeUnitsTotal`),
    privacyViolationCount,
    securityViolationCount,
    verificationEvidenceIdentity: sha256(record.verificationEvidenceIdentity, `${label}.verificationEvidenceIdentity`),
    k5EvidenceIdentity: sha256(record.k5EvidenceIdentity, `${label}.k5EvidenceIdentity`),
    doneGateEvidenceIdentity: sha256(record.doneGateEvidenceIdentity, `${label}.doneGateEvidenceIdentity`),
    latencyEvidenceIdentity: sha256(record.latencyEvidenceIdentity, `${label}.latencyEvidenceIdentity`),
    computeEvidenceIdentity: sha256(record.computeEvidenceIdentity, `${label}.computeEvidenceIdentity`),
    privacyEvidenceIdentity: sha256(record.privacyEvidenceIdentity, `${label}.privacyEvidenceIdentity`),
    securityEvidenceIdentity: sha256(record.securityEvidenceIdentity, `${label}.securityEvidenceIdentity`),
  })
}

function parseEvidence(value: unknown, label = "R5 strategy evidence"): K6R5StrategyEvidence {
  assertSafeGraph(value, label)
  const record = plainRecord(value, EVIDENCE_KEYS, label)
  const input = parseEvidenceIdentityInput({
    version: record.version,
    strategyIdentity: record.strategyIdentity,
    scope: record.scope,
    qualificationCorpusIdentity: record.qualificationCorpusIdentity,
    trialSetIdentity: record.trialSetIdentity,
    trialCaseIdentities: record.trialCaseIdentities,
    trialCount: record.trialCount,
    verifiedPassCount: record.verifiedPassCount,
    k5ValidCount: record.k5ValidCount,
    doneReadyCount: record.doneReadyCount,
    latencyTotalMs: record.latencyTotalMs,
    computeUnitsTotal: record.computeUnitsTotal,
    privacyViolationCount: record.privacyViolationCount,
    securityViolationCount: record.securityViolationCount,
    verificationEvidenceIdentity: record.verificationEvidenceIdentity,
    k5EvidenceIdentity: record.k5EvidenceIdentity,
    doneGateEvidenceIdentity: record.doneGateEvidenceIdentity,
    latencyEvidenceIdentity: record.latencyEvidenceIdentity,
    computeEvidenceIdentity: record.computeEvidenceIdentity,
    privacyEvidenceIdentity: record.privacyEvidenceIdentity,
    securityEvidenceIdentity: record.securityEvidenceIdentity,
  }, label)
  const evidenceIdentity = sha256(record.evidenceIdentity, `${label}.evidenceIdentity`)
  if (evidenceIdentity !== digest(input)) bad(`${label}.evidenceIdentity`, "does not match deterministic recomputation")
  return Object.freeze({ version: input.version, evidenceIdentity, ...input })
}

function parseResultIdentityInput(value: unknown, label = "R5 qualification result"): K6R5QualificationResultIdentityInput {
  assertSafeGraph(value, label)
  const record = plainRecord(value, RESULT_IDENTITY_INPUT_KEYS, label)
  const trialCount = nonNegativeSafeInteger(record.trialCount, `${label}.trialCount`)
  if (trialCount < 1) bad(`${label}.trialCount`, "must be at least one")
  return Object.freeze({
    version: exactString(record.version, K6_R5_QUALIFICATION_RESULT_VERSION, `${label}.version`),
    incumbentStrategyIdentity: sha256(record.incumbentStrategyIdentity, `${label}.incumbentStrategyIdentity`),
    candidateStrategyIdentity: sha256(record.candidateStrategyIdentity, `${label}.candidateStrategyIdentity`),
    incumbentEvidenceIdentity: sha256(record.incumbentEvidenceIdentity, `${label}.incumbentEvidenceIdentity`),
    candidateEvidenceIdentity: sha256(record.candidateEvidenceIdentity, `${label}.candidateEvidenceIdentity`),
    qualificationCorpusIdentity: sha256(record.qualificationCorpusIdentity, `${label}.qualificationCorpusIdentity`),
    trialSetIdentity: sha256(record.trialSetIdentity, `${label}.trialSetIdentity`),
    trialCount,
    outcome: enumString<K6R5QualificationOutcome>(record.outcome, OUTCOME_SET, `${label}.outcome`),
  })
}

function scopeEqual(left: K6R5StrategyScope, right: K6R5StrategyScope): boolean {
  return left.repositoryIdentity === right.repositoryIdentity
    && left.revisionIdentity === right.revisionIdentity
    && left.ownerScopeId === right.ownerScopeId
    && left.privacyClass === right.privacyClass
    && left.taskFamilyIdentity === right.taskFamilyIdentity
}

function exactCandidateSet(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) return false
  const rightSet = new Set(right)
  return left.every((identity) => rightSet.has(identity))
}

function exactArray(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

function unsafeEvidence(value: K6R5StrategyEvidence): boolean {
  return value.privacyViolationCount > 0 || value.securityViolationCount > 0
}

function dominates(candidate: K6R5StrategyEvidence, incumbent: K6R5StrategyEvidence): boolean {
  const nonWorse = candidate.verifiedPassCount >= incumbent.verifiedPassCount
    && candidate.k5ValidCount >= incumbent.k5ValidCount
    && candidate.doneReadyCount >= incumbent.doneReadyCount
    && candidate.latencyTotalMs <= incumbent.latencyTotalMs
    && candidate.computeUnitsTotal <= incumbent.computeUnitsTotal
  const strict = candidate.verifiedPassCount > incumbent.verifiedPassCount
    || candidate.k5ValidCount > incumbent.k5ValidCount
    || candidate.doneReadyCount > incumbent.doneReadyCount
    || candidate.latencyTotalMs < incumbent.latencyTotalMs
    || candidate.computeUnitsTotal < incumbent.computeUnitsTotal
  return nonWorse && strict
}

function qualificationOutcome(incumbent: K6R5StrategyEvidence, candidate: K6R5StrategyEvidence): K6R5QualificationOutcome {
  const incumbentUnsafe = unsafeEvidence(incumbent)
  const candidateUnsafe = unsafeEvidence(candidate)
  if (incumbentUnsafe && candidateUnsafe) return "BOTH_INVALID"
  if (candidateUnsafe) return "CANDIDATE_INVALID"
  if (incumbentUnsafe) return "INCUMBENT_INVALID"
  if (
    incumbent.verifiedPassCount === candidate.verifiedPassCount
    && incumbent.k5ValidCount === candidate.k5ValidCount
    && incumbent.doneReadyCount === candidate.doneReadyCount
    && incumbent.latencyTotalMs === candidate.latencyTotalMs
    && incumbent.computeUnitsTotal === candidate.computeUnitsTotal
  ) return "TIE"
  if (dominates(candidate, incumbent)) return "CANDIDATE_DOMINATES"
  if (dominates(incumbent, candidate)) return "INCUMBENT_DOMINATES"
  return "INCOMPARABLE"
}

if (
  K6_R5_LIMITS.maxCanonicalDepth !== K6_R1_LIMITS.maxCanonicalDepth
  || K6_R5_LIMITS.maxCanonicalNodes !== K6_R1_LIMITS.maxCanonicalNodes
  || K6_R5_LIMITS.maxOrderedCandidateIdentities !== K6_R1_LIMITS.maxCandidates
  || K6_R5_LIMITS.maxTrialCaseIdentities !== K6_R1_LIMITS.maxCandidates
) {
  throw new Error("K6-R5 safety limit parity drift")
}

export function deriveK6R5TaskFamilyIdentity(routeRequest: unknown): string {
  const validated = validateK6R1RouteRequest(routeRequest)
  return digest({
    kind: "K6_R5_TASK_FAMILY",
    riskClass: validated.riskClass,
    privacyClass: validated.privacyClass,
    requiredCapabilities: validated.requiredCapabilities,
  })
}

export function k6R5StrategyIdentity(value: unknown): string {
  return digest(parseStrategyIdentityInput(value))
}

export function createK6R5Strategy(value: unknown): K6R5Strategy {
  const input = parseStrategyIdentityInput(value)
  return Object.freeze({
    version: input.version,
    strategyIdentity: digest(input),
    kind: input.kind,
    scope: input.scope,
    orderedCandidateIdentities: input.orderedCandidateIdentities,
  })
}

export function validateK6R5Strategy(value: unknown): K6R5Strategy {
  return parseStrategy(value)
}

export function k6R5TrialSetIdentity(qualificationCorpusIdentity: unknown, trialCaseIdentities: unknown): string {
  assertSafeGraph(trialCaseIdentities, "R5 trialCaseIdentities")
  const corpus = sha256(qualificationCorpusIdentity, "R5 qualificationCorpusIdentity")
  const trials = parseIdentityArray(trialCaseIdentities, "R5 trialCaseIdentities", K6_R5_LIMITS.maxTrialCaseIdentities)
  return trialSetIdentityFromParsed(corpus, trials)
}

export function k6R5StrategyEvidenceIdentity(value: unknown): string {
  return digest(parseEvidenceIdentityInput(value))
}

export function createK6R5StrategyEvidence(value: unknown): K6R5StrategyEvidence {
  const input = parseEvidenceIdentityInput(value)
  return Object.freeze({ version: input.version, evidenceIdentity: digest(input), ...input })
}

export function validateK6R5StrategyEvidence(value: unknown): K6R5StrategyEvidence {
  return parseEvidence(value)
}

export function k6R5QualificationResultIdentity(value: unknown): string {
  return digest(parseResultIdentityInput(value))
}

export function validateK6R5QualificationResult(value: unknown): K6R5QualificationResult {
  assertSafeGraph(value, "R5 qualification result")
  const record = plainRecord(value, RESULT_KEYS, "R5 qualification result")
  const input = parseResultIdentityInput({
    version: record.version,
    incumbentStrategyIdentity: record.incumbentStrategyIdentity,
    candidateStrategyIdentity: record.candidateStrategyIdentity,
    incumbentEvidenceIdentity: record.incumbentEvidenceIdentity,
    candidateEvidenceIdentity: record.candidateEvidenceIdentity,
    qualificationCorpusIdentity: record.qualificationCorpusIdentity,
    trialSetIdentity: record.trialSetIdentity,
    trialCount: record.trialCount,
    outcome: record.outcome,
  })
  const resultIdentity = sha256(record.resultIdentity, "R5 qualification result.resultIdentity")
  if (resultIdentity !== digest(input)) bad("R5 qualification result.resultIdentity", "does not match deterministic recomputation")
  return Object.freeze({ version: input.version, resultIdentity, ...input })
}

export function compareK6R5Strategies(
  incumbentStrategyValue: unknown,
  candidateStrategyValue: unknown,
  incumbentEvidenceValue: unknown,
  candidateEvidenceValue: unknown,
): K6R5QualificationResult {
  const incumbentStrategy = validateK6R5Strategy(incumbentStrategyValue)
  const candidateStrategy = validateK6R5Strategy(candidateStrategyValue)
  const incumbentEvidence = validateK6R5StrategyEvidence(incumbentEvidenceValue)
  const candidateEvidence = validateK6R5StrategyEvidence(candidateEvidenceValue)

  if (!scopeEqual(incumbentStrategy.scope, candidateStrategy.scope)) bad("R5 comparison", "requires identical strategy scopes")
  if (!exactCandidateSet(incumbentStrategy.orderedCandidateIdentities, candidateStrategy.orderedCandidateIdentities)) {
    bad("R5 comparison", "requires identical candidate identity sets")
  }
  if (incumbentEvidence.strategyIdentity !== incumbentStrategy.strategyIdentity || !scopeEqual(incumbentEvidence.scope, incumbentStrategy.scope)) {
    bad("R5 incumbent evidence", "is not bound to the exact incumbent strategy and scope")
  }
  if (candidateEvidence.strategyIdentity !== candidateStrategy.strategyIdentity || !scopeEqual(candidateEvidence.scope, candidateStrategy.scope)) {
    bad("R5 candidate evidence", "is not bound to the exact candidate strategy and scope")
  }
  if (!scopeEqual(incumbentEvidence.scope, candidateEvidence.scope)) bad("R5 comparison", "requires identical evidence scopes")
  if (incumbentEvidence.qualificationCorpusIdentity !== candidateEvidence.qualificationCorpusIdentity) {
    bad("R5 comparison", "requires identical qualification corpus identities")
  }
  if (incumbentEvidence.trialSetIdentity !== candidateEvidence.trialSetIdentity) {
    bad("R5 comparison", "requires identical trial-set identities")
  }
  if (!exactArray(incumbentEvidence.trialCaseIdentities, candidateEvidence.trialCaseIdentities)) {
    bad("R5 comparison", "requires identical ordered trial-case identities")
  }
  if (incumbentEvidence.trialCount !== candidateEvidence.trialCount) bad("R5 comparison", "requires identical trial counts")

  const input: K6R5QualificationResultIdentityInput = Object.freeze({
    version: K6_R5_QUALIFICATION_RESULT_VERSION,
    incumbentStrategyIdentity: incumbentStrategy.strategyIdentity,
    candidateStrategyIdentity: candidateStrategy.strategyIdentity,
    incumbentEvidenceIdentity: incumbentEvidence.evidenceIdentity,
    candidateEvidenceIdentity: candidateEvidence.evidenceIdentity,
    qualificationCorpusIdentity: incumbentEvidence.qualificationCorpusIdentity,
    trialSetIdentity: incumbentEvidence.trialSetIdentity,
    trialCount: incumbentEvidence.trialCount,
    outcome: qualificationOutcome(incumbentEvidence, candidateEvidence),
  })
  return Object.freeze({ version: input.version, resultIdentity: digest(input), ...input })
}
