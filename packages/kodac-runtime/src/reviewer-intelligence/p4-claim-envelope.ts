import { createHash } from "node:crypto"

import type {
  AdjudicationAction,
  AdjudicationRecord,
  AdjudicationResult,
  AffectedRange,
  FindingFreshness,
  FindingRecord,
  FindingSeverity,
  FindingState,
  InitialFindingState,
  ReviewIdentity,
} from "./contracts.ts"

export const P4_R1_CLAIM_ENVELOPE_VERSION = "p4-r1-reviewer-claim-envelope-v1" as const
export const P4_R1_DECLARATION_VERSION = "p4-r1-reviewer-claim-declaration-v1" as const
export const P4_R1_CRITIC_STATE = "NOT_EVALUATED" as const

export const P4_R1_RISK_CLASSES = [
  "AUTHORIZATION_DRIFT",
  "SECURITY_BOUNDARY",
  "CONCURRENCY",
  "DATA_LOSS",
  "BUSINESS_LOGIC",
  "DEPENDENCY_RISK",
  "CI_BYPASS",
  "AGENT_POLICY_POISONING",
  "RESOURCE_BOUND",
  "COMPATIBILITY",
  "SPEC_INTENT",
] as const

export const P4_R1_VERIFIER_CLASSES = [
  "STATIC_RULE",
  "TYPECHECK",
  "LINTER",
  "SCHEMA_VALIDATION",
  "UNIT_TEST",
  "FOCUSED_TEST",
  "GENERATED_REGRESSION",
  "PROPERTY_TEST",
  "MUTATION_TEST",
  "SANDBOX_EXECUTION",
  "SECURITY_SCAN",
  "DEPENDENCY_ANALYSIS",
  "PROVENANCE_CHECK",
  "EXPLOIT_REPRODUCTION",
  "NETWORK_POLICY_TEST",
  "CONTEXTUAL_RUBRIC",
  "FORMAL_PROOF",
  "MANUAL_EXTERNAL_ATTESTATION",
] as const

export type P4RiskClass = (typeof P4_R1_RISK_CLASSES)[number]
export type P4VerifierClass = (typeof P4_R1_VERIFIER_CLASSES)[number]
export type P4CriticState = typeof P4_R1_CRITIC_STATE

export interface P4RiskHypothesis {
  riskHypothesisId: string
  riskClass: P4RiskClass
  statement: string
  evidenceRefs: string[]
}

export interface P4VerifierProposal {
  proposalId: string
  verifierClass: P4VerifierClass
  objective: string
  evidenceRefs: string[]
}

export interface P4ClaimEnvelopeDeclaration {
  version: typeof P4_R1_DECLARATION_VERSION
  sourceFindingIdentity: string
  riskHypothesis: P4RiskHypothesis
  evidenceRefs: string[]
  verifierProposals: P4VerifierProposal[]
  criticState: P4CriticState
}

export interface P4SourceFindingSnapshot {
  version: "kri-r2-finding-v1"
  findingIdentity: string
  claimKey: string
  review: ReviewIdentity
  evaluatedHead: string
  path: string
  range?: AffectedRange
  summary: string
  contractClaim: string
  category: string
  severity: FindingSeverity
  confidenceBps: number
  evidenceRefs: string[]
  freshness: FindingFreshness
  state: InitialFindingState
  adjudicationState: FindingState
  adjudicationIdentity: string | null
}

export interface P4ReviewerClaimEnvelope {
  version: typeof P4_R1_CLAIM_ENVELOPE_VERSION
  envelopeIdentity: string
  sourceFinding: P4SourceFindingSnapshot
  riskHypothesis: P4RiskHypothesis
  evidenceRefs: string[]
  verifierProposals: P4VerifierProposal[]
  criticState: P4CriticState
}

export interface P4ClaimEnvelopeBuildInput {
  finding: FindingRecord
  declaration: P4ClaimEnvelopeDeclaration
  adjudication?: AdjudicationResult
}

type UnknownRecord = Record<string, unknown>

const SHA1_RE = /^[0-9a-f]{40}$/
const SHA256_RE = /^[0-9a-f]{64}$/
const MAX_SHORT = 128
const MAX_TEXT = 4096
const MAX_PATH = 1024
const MAX_REFS = 32
const MAX_REF = 1024
const MAX_PROPOSALS = 16

const SEVERITIES = new Set<FindingSeverity>(["blocker", "critical", "high", "medium", "low", "info"])
const FINDING_STATES = new Set<FindingState>(["NEW", "CONFIRMED", "REJECTED", "DUPLICATE", "STALE", "FIXED", "REVERIFIED"])
const ADJUDICATION_ACTIONS = new Set<AdjudicationAction>(["CONFIRM", "REJECT", "MARK_DUPLICATE", "MARK_FIXED", "REVERIFY"])
const RISK_CLASSES = new Set<P4RiskClass>(P4_R1_RISK_CLASSES)
const VERIFIER_CLASSES = new Set<P4VerifierClass>(P4_R1_VERIFIER_CLASSES)

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function fail(message: string): never {
  throw new Error(message)
}

function plainObject(value: unknown, label: string): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) fail(`${label} must be a plain object`)
  const proto = Object.getPrototypeOf(value)
  if (proto !== Object.prototype && proto !== null) fail(`${label} must be a plain object`)
  return value as UnknownRecord
}

function exactKeys(record: UnknownRecord, required: readonly string[], optional: readonly string[], label: string): void {
  const allowed = new Set([...required, ...optional])
  for (const key of Object.keys(record)) if (!allowed.has(key)) fail(`${label} has unknown property: ${key}`)
  for (const key of required) if (!Object.hasOwn(record, key)) fail(`${label} missing required property: ${key}`)
}

function boundedString(value: unknown, label: string, max = MAX_TEXT): string {
  if (typeof value !== "string" || value.length === 0 || value.length > max) fail(`${label} must be a non-empty string <= ${max} chars`)
  return value
}

function gitSha(value: unknown, label: string): string {
  const text = boundedString(value, label, 40)
  if (!SHA1_RE.test(text)) fail(`${label} must be a lowercase 40-hex git commit identity`)
  return text
}

function sha256(value: unknown, label: string): string {
  const text = boundedString(value, label, 64)
  if (!SHA256_RE.test(text)) fail(`${label} must be a lowercase 64-hex sha256 identity`)
  return text
}

function repositoryPath(value: unknown, label = "path"): string {
  const path = boundedString(value, label, MAX_PATH)
  if (path.startsWith("/") || path.includes("\\") || path.includes("\0")) fail(`${label} must be repository-relative POSIX text`)
  const segments = path.split("/")
  if (segments.some((segment) => segment.length === 0 || segment === "." || segment === "..")) {
    fail(`${label} must not contain empty, dot, or parent segments`)
  }
  return path
}

function rangeValue(value: unknown, label = "range"): AffectedRange {
  const record = plainObject(value, label)
  exactKeys(record, ["startLine", "endLine"], [], label)
  if (!Number.isSafeInteger(record.startLine) || !Number.isSafeInteger(record.endLine)) fail(`${label} lines must be safe integers`)
  const startLine = record.startLine as number
  const endLine = record.endLine as number
  if (startLine < 1 || endLine < startLine || endLine > 10_000_000) fail(`${label} must satisfy 1 <= startLine <= endLine <= 10000000`)
  return { startLine, endLine }
}

function stringSet(value: unknown, label: string, min: number, max: number): string[] {
  if (!Array.isArray(value) || value.length < min || value.length > max) fail(`${label} must contain ${min}..${max} entries`)
  const values = value.map((item, index) => boundedString(item, `${label}[${index}]`, MAX_REF))
  if (new Set(values).size !== values.length) fail(`${label} must not contain duplicate entries`)
  return [...values].sort(compareStrings)
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize)
  if (typeof value === "object" && value !== null) {
    const record = value as UnknownRecord
    const ordered: UnknownRecord = {}
    for (const key of Object.keys(record).sort(compareStrings)) ordered[key] = canonicalize(record[key])
    return ordered
  }
  return value
}

function canonicalText(value: unknown): string {
  return JSON.stringify(canonicalize(value))
}

function identity(value: unknown): string {
  return createHash("sha256").update(canonicalText(value), "utf8").digest("hex")
}

function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value)
    for (const child of Object.values(value as UnknownRecord)) deepFreeze(child)
  }
  return value
}

function sameCanonical(left: unknown, right: unknown): boolean {
  return canonicalText(left) === canonicalText(right)
}

function reviewIdentity(value: unknown, label = "review"): ReviewIdentity {
  const record = plainObject(value, label)
  exactKeys(record, ["reviewRunId", "reviewerId", "reviewerVersion", "policyIdentity", "canonicalBase", "reviewedHead"], [], label)
  return {
    reviewRunId: boundedString(record.reviewRunId, `${label}.reviewRunId`, MAX_SHORT),
    reviewerId: boundedString(record.reviewerId, `${label}.reviewerId`, MAX_SHORT),
    reviewerVersion: boundedString(record.reviewerVersion, `${label}.reviewerVersion`, MAX_SHORT),
    policyIdentity: boundedString(record.policyIdentity, `${label}.policyIdentity`, MAX_SHORT),
    canonicalBase: gitSha(record.canonicalBase, `${label}.canonicalBase`),
    reviewedHead: gitSha(record.reviewedHead, `${label}.reviewedHead`),
  }
}

function normalizedFinding(value: unknown, label = "finding"): FindingRecord {
  const record = plainObject(value, label)
  exactKeys(
    record,
    ["version", "findingIdentity", "claimKey", "review", "evaluatedHead", "path", "summary", "contractClaim", "category", "severity", "confidenceBps", "evidenceRefs", "freshness", "state"],
    ["range"],
    label,
  )
  if (record.version !== "kri-r2-finding-v1") fail(`${label}.version is unsupported`)
  const review = reviewIdentity(record.review, `${label}.review`)
  const evaluatedHead = gitSha(record.evaluatedHead, `${label}.evaluatedHead`)
  const freshness: FindingFreshness = evaluatedHead === review.reviewedHead ? "CURRENT" : "STALE"
  if (record.freshness !== freshness) fail(`${label}.freshness does not match exact-head identity`)
  const state: InitialFindingState = freshness === "CURRENT" ? "NEW" : "STALE"
  if (record.state !== state) fail(`${label}.state must remain the KRI-R2 initial state derived from freshness`)
  const severity = boundedString(record.severity, `${label}.severity`, 16) as FindingSeverity
  if (!SEVERITIES.has(severity)) fail(`${label}.severity is unsupported`)
  if (!Number.isSafeInteger(record.confidenceBps) || (record.confidenceBps as number) < 0 || (record.confidenceBps as number) > 10_000) {
    fail(`${label}.confidenceBps must be an integer between 0 and 10000`)
  }
  const historical = {
    version: "kri-r2-finding-v1" as const,
    claimKey: boundedString(record.claimKey, `${label}.claimKey`, MAX_SHORT),
    review,
    path: repositoryPath(record.path, `${label}.path`),
    ...(record.range === undefined ? {} : { range: rangeValue(record.range, `${label}.range`) }),
    summary: boundedString(record.summary, `${label}.summary`),
    contractClaim: boundedString(record.contractClaim, `${label}.contractClaim`),
    category: boundedString(record.category, `${label}.category`, MAX_SHORT),
    severity,
    confidenceBps: record.confidenceBps as number,
    evidenceRefs: stringSet(record.evidenceRefs, `${label}.evidenceRefs`, 1, MAX_REFS),
  }
  const expectedIdentity = identity(historical)
  if (sha256(record.findingIdentity, `${label}.findingIdentity`) !== expectedIdentity) fail(`${label}.findingIdentity does not match canonical KRI-R2 content`)
  return {
    ...historical,
    findingIdentity: expectedIdentity,
    evaluatedHead,
    freshness,
    state,
  }
}

function nextFindingState(previous: FindingState, action: AdjudicationAction): FindingState {
  if (previous === "STALE") fail("stale finding cannot be adjudicated")
  if (previous === "NEW") {
    if (action === "CONFIRM") return "CONFIRMED"
    if (action === "REJECT") return "REJECTED"
    if (action === "MARK_DUPLICATE") return "DUPLICATE"
  }
  if (previous === "CONFIRMED" && action === "MARK_FIXED") return "FIXED"
  if (previous === "FIXED" && action === "REVERIFY") return "REVERIFIED"
  fail(`invalid finding transition: ${previous} -> ${action}`)
}

function normalizedAdjudication(value: unknown, label = "adjudication"): AdjudicationRecord {
  const record = plainObject(value, label)
  exactKeys(
    record,
    ["version", "adjudicationIdentity", "findingIdentity", "previousAdjudicationIdentity", "action", "previousState", "resultingState", "adjudicatorId", "evidenceRefs"],
    ["duplicateOf", "correctionRef", "reverificationRef"],
    label,
  )
  if (record.version !== "kri-r2-adjudication-v1") fail(`${label}.version is unsupported`)
  const action = boundedString(record.action, `${label}.action`, 32) as AdjudicationAction
  if (!ADJUDICATION_ACTIONS.has(action)) fail(`${label}.action is unsupported`)
  const previousState = boundedString(record.previousState, `${label}.previousState`, 16) as FindingState
  if (!FINDING_STATES.has(previousState)) fail(`${label}.previousState is unsupported`)
  const resultingState = nextFindingState(previousState, action)
  if (record.resultingState !== resultingState) fail(`${label}.resultingState does not match the KRI-R2 transition`)
  const previousAdjudicationIdentity = record.previousAdjudicationIdentity === null
    ? null
    : sha256(record.previousAdjudicationIdentity, `${label}.previousAdjudicationIdentity`)
  if (previousState === "NEW" && previousAdjudicationIdentity !== null) fail(`${label} from NEW must not reference a previous adjudication`)
  if (previousState !== "NEW" && previousAdjudicationIdentity === null) fail(`${label} from non-NEW requires a previous adjudication identity`)

  const normalized: Omit<AdjudicationRecord, "adjudicationIdentity"> = {
    version: "kri-r2-adjudication-v1",
    findingIdentity: sha256(record.findingIdentity, `${label}.findingIdentity`),
    previousAdjudicationIdentity,
    action,
    previousState,
    resultingState,
    adjudicatorId: boundedString(record.adjudicatorId, `${label}.adjudicatorId`, MAX_SHORT),
    evidenceRefs: stringSet(record.evidenceRefs, `${label}.evidenceRefs`, 1, MAX_REFS),
    ...(record.duplicateOf === undefined ? {} : { duplicateOf: sha256(record.duplicateOf, `${label}.duplicateOf`) }),
    ...(record.correctionRef === undefined ? {} : { correctionRef: boundedString(record.correctionRef, `${label}.correctionRef`, MAX_REF) }),
    ...(record.reverificationRef === undefined ? {} : { reverificationRef: boundedString(record.reverificationRef, `${label}.reverificationRef`, MAX_REF) }),
  }

  const optionalPresent = [normalized.duplicateOf !== undefined, normalized.correctionRef !== undefined, normalized.reverificationRef !== undefined].filter(Boolean).length
  if (action === "MARK_DUPLICATE") {
    if (!normalized.duplicateOf || optionalPresent !== 1) fail(`${label}.MARK_DUPLICATE requires only duplicateOf`)
    if (normalized.duplicateOf === normalized.findingIdentity) fail(`${label}.duplicateOf must not equal findingIdentity`)
  } else if (action === "MARK_FIXED") {
    if (!normalized.correctionRef || optionalPresent !== 1) fail(`${label}.MARK_FIXED requires only correctionRef`)
  } else if (action === "REVERIFY") {
    if (!normalized.reverificationRef || optionalPresent !== 1) fail(`${label}.REVERIFY requires only reverificationRef`)
  } else if (optionalPresent !== 0) {
    fail(`${label}.${action} does not allow action-specific references`)
  }

  const expectedIdentity = identity(normalized)
  if (sha256(record.adjudicationIdentity, `${label}.adjudicationIdentity`) !== expectedIdentity) {
    fail(`${label}.adjudicationIdentity does not match canonical KRI-R2 content`)
  }
  return { ...normalized, adjudicationIdentity: expectedIdentity }
}

function normalizedAdjudicationResult(value: unknown, sourceFinding: FindingRecord): AdjudicationResult {
  const record = plainObject(value, "adjudicationResult")
  exactKeys(record, ["finding", "adjudication", "state"], [], "adjudicationResult")
  const finding = normalizedFinding(record.finding, "adjudicationResult.finding")
  if (!sameCanonical(finding, sourceFinding)) fail("adjudicationResult.finding must equal the exact source finding")
  if (sourceFinding.freshness !== "CURRENT" || sourceFinding.state !== "NEW") fail("only a current NEW source finding can carry an adjudication result")
  const adjudication = normalizedAdjudication(record.adjudication, "adjudicationResult.adjudication")
  if (adjudication.findingIdentity !== sourceFinding.findingIdentity) fail("adjudicationResult.adjudication must bind the source finding identity")
  if (record.state !== adjudication.resultingState) fail("adjudicationResult.state must equal adjudication.resultingState")
  return { finding, adjudication, state: adjudication.resultingState }
}

function riskHypothesis(value: unknown, label = "riskHypothesis"): P4RiskHypothesis {
  const record = plainObject(value, label)
  exactKeys(record, ["riskHypothesisId", "riskClass", "statement", "evidenceRefs"], [], label)
  const riskClass = boundedString(record.riskClass, `${label}.riskClass`, 64) as P4RiskClass
  if (!RISK_CLASSES.has(riskClass)) fail(`${label}.riskClass is unsupported`)
  const normalizedWithoutIdentity = {
    riskClass,
    statement: boundedString(record.statement, `${label}.statement`),
    evidenceRefs: stringSet(record.evidenceRefs, `${label}.evidenceRefs`, 1, MAX_REFS),
  }
  const expectedIdentity = identity(normalizedWithoutIdentity)
  if (sha256(record.riskHypothesisId, `${label}.riskHypothesisId`) !== expectedIdentity) fail(`${label}.riskHypothesisId does not match canonical content`)
  return { riskHypothesisId: expectedIdentity, ...normalizedWithoutIdentity }
}

function verifierProposal(value: unknown, label: string): P4VerifierProposal {
  const record = plainObject(value, label)
  exactKeys(record, ["proposalId", "verifierClass", "objective", "evidenceRefs"], [], label)
  const verifierClass = boundedString(record.verifierClass, `${label}.verifierClass`, 64) as P4VerifierClass
  if (!VERIFIER_CLASSES.has(verifierClass)) fail(`${label}.verifierClass is unsupported`)
  const normalizedWithoutIdentity = {
    verifierClass,
    objective: boundedString(record.objective, `${label}.objective`),
    evidenceRefs: stringSet(record.evidenceRefs, `${label}.evidenceRefs`, 1, MAX_REFS),
  }
  const expectedIdentity = identity(normalizedWithoutIdentity)
  if (sha256(record.proposalId, `${label}.proposalId`) !== expectedIdentity) fail(`${label}.proposalId does not match canonical content`)
  return { proposalId: expectedIdentity, ...normalizedWithoutIdentity }
}

function verifierProposals(value: unknown): P4VerifierProposal[] {
  if (!Array.isArray(value) || value.length > MAX_PROPOSALS) fail(`verifierProposals must contain 0..${MAX_PROPOSALS} proposals`)
  const normalized = value.map((item, index) => verifierProposal(item, `verifierProposals[${index}]`))
  const ids = normalized.map((item) => item.proposalId)
  if (new Set(ids).size !== ids.length) fail("verifierProposals must not contain duplicate proposal identities")
  return normalized.sort((left, right) => compareStrings(left.proposalId, right.proposalId))
}

function declarationValue(value: unknown): P4ClaimEnvelopeDeclaration {
  const record = plainObject(value, "declaration")
  exactKeys(record, ["version", "sourceFindingIdentity", "riskHypothesis", "evidenceRefs", "verifierProposals", "criticState"], [], "declaration")
  if (record.version !== P4_R1_DECLARATION_VERSION) fail("unsupported P4-R1 declaration version")
  if (record.criticState !== P4_R1_CRITIC_STATE) fail("P4-R1 criticState must be NOT_EVALUATED")
  return {
    version: P4_R1_DECLARATION_VERSION,
    sourceFindingIdentity: sha256(record.sourceFindingIdentity, "declaration.sourceFindingIdentity"),
    riskHypothesis: riskHypothesis(record.riskHypothesis, "declaration.riskHypothesis"),
    evidenceRefs: stringSet(record.evidenceRefs, "declaration.evidenceRefs", 1, MAX_REFS),
    verifierProposals: verifierProposals(record.verifierProposals),
    criticState: P4_R1_CRITIC_STATE,
  }
}

function sourceSnapshot(finding: FindingRecord, adjudication?: AdjudicationResult): P4SourceFindingSnapshot {
  const currentState = adjudication?.state ?? finding.state
  const adjudicationIdentity = adjudication?.adjudication.adjudicationIdentity ?? null
  return {
    version: "kri-r2-finding-v1",
    findingIdentity: finding.findingIdentity,
    claimKey: finding.claimKey,
    review: finding.review,
    evaluatedHead: finding.evaluatedHead,
    path: finding.path,
    ...(finding.range === undefined ? {} : { range: finding.range }),
    summary: finding.summary,
    contractClaim: finding.contractClaim,
    category: finding.category,
    severity: finding.severity,
    confidenceBps: finding.confidenceBps,
    evidenceRefs: [...finding.evidenceRefs],
    freshness: finding.freshness,
    state: finding.state,
    adjudicationState: currentState,
    adjudicationIdentity,
  }
}

function sourceSnapshotValue(value: unknown): P4SourceFindingSnapshot {
  const record = plainObject(value, "sourceFinding")
  exactKeys(
    record,
    ["version", "findingIdentity", "claimKey", "review", "evaluatedHead", "path", "summary", "contractClaim", "category", "severity", "confidenceBps", "evidenceRefs", "freshness", "state", "adjudicationState", "adjudicationIdentity"],
    ["range"],
    "sourceFinding",
  )
  const finding = normalizedFinding({
    version: record.version,
    findingIdentity: record.findingIdentity,
    claimKey: record.claimKey,
    review: record.review,
    evaluatedHead: record.evaluatedHead,
    path: record.path,
    ...(record.range === undefined ? {} : { range: record.range }),
    summary: record.summary,
    contractClaim: record.contractClaim,
    category: record.category,
    severity: record.severity,
    confidenceBps: record.confidenceBps,
    evidenceRefs: record.evidenceRefs,
    freshness: record.freshness,
    state: record.state,
  }, "sourceFinding")
  const adjudicationState = boundedString(record.adjudicationState, "sourceFinding.adjudicationState", 16) as FindingState
  if (!FINDING_STATES.has(adjudicationState)) fail("sourceFinding.adjudicationState is unsupported")
  const adjudicationIdentity = record.adjudicationIdentity === null ? null : sha256(record.adjudicationIdentity, "sourceFinding.adjudicationIdentity")
  if (adjudicationIdentity === null && adjudicationState !== finding.state) {
    fail("sourceFinding without adjudicationIdentity must preserve the initial finding state")
  }
  if (adjudicationIdentity !== null && (finding.freshness !== "CURRENT" || finding.state !== "NEW" || adjudicationState === "NEW" || adjudicationState === "STALE")) {
    fail("sourceFinding adjudication state is inconsistent with the KRI-R2 source finding")
  }
  return { ...sourceSnapshot(finding), adjudicationState, adjudicationIdentity }
}

function envelopePreimage(value: Omit<P4ReviewerClaimEnvelope, "envelopeIdentity">): unknown {
  return value
}

export function riskHypothesisIdentity(input: Omit<P4RiskHypothesis, "riskHypothesisId">): string {
  const record = plainObject(input, "riskHypothesisIdentity.input")
  exactKeys(record, ["riskClass", "statement", "evidenceRefs"], [], "riskHypothesisIdentity.input")
  const riskClass = boundedString(record.riskClass, "riskHypothesisIdentity.input.riskClass", 64) as P4RiskClass
  if (!RISK_CLASSES.has(riskClass)) fail("riskHypothesisIdentity.input.riskClass is unsupported")
  return identity({
    riskClass,
    statement: boundedString(record.statement, "riskHypothesisIdentity.input.statement"),
    evidenceRefs: stringSet(record.evidenceRefs, "riskHypothesisIdentity.input.evidenceRefs", 1, MAX_REFS),
  })
}

export function verifierProposalIdentity(input: Omit<P4VerifierProposal, "proposalId">): string {
  const record = plainObject(input, "verifierProposalIdentity.input")
  exactKeys(record, ["verifierClass", "objective", "evidenceRefs"], [], "verifierProposalIdentity.input")
  const verifierClass = boundedString(record.verifierClass, "verifierProposalIdentity.input.verifierClass", 64) as P4VerifierClass
  if (!VERIFIER_CLASSES.has(verifierClass)) fail("verifierProposalIdentity.input.verifierClass is unsupported")
  return identity({
    verifierClass,
    objective: boundedString(record.objective, "verifierProposalIdentity.input.objective"),
    evidenceRefs: stringSet(record.evidenceRefs, "verifierProposalIdentity.input.evidenceRefs", 1, MAX_REFS),
  })
}

export function buildP4ReviewerClaimEnvelope(input: unknown): P4ReviewerClaimEnvelope {
  const record = plainObject(input, "input")
  exactKeys(record, ["finding", "declaration"], ["adjudication"], "input")
  const finding = normalizedFinding(record.finding)
  const declaration = declarationValue(record.declaration)
  if (declaration.sourceFindingIdentity !== finding.findingIdentity) fail("declaration.sourceFindingIdentity must equal the exact source finding identity")
  const adjudication = record.adjudication === undefined ? undefined : normalizedAdjudicationResult(record.adjudication, finding)
  const withoutIdentity: Omit<P4ReviewerClaimEnvelope, "envelopeIdentity"> = {
    version: P4_R1_CLAIM_ENVELOPE_VERSION,
    sourceFinding: sourceSnapshot(finding, adjudication),
    riskHypothesis: declaration.riskHypothesis,
    evidenceRefs: declaration.evidenceRefs,
    verifierProposals: declaration.verifierProposals,
    criticState: P4_R1_CRITIC_STATE,
  }
  const envelope = {
    ...withoutIdentity,
    envelopeIdentity: identity(envelopePreimage(withoutIdentity)),
  }
  return deepFreeze(structuredClone(envelope))
}

export function validateP4ReviewerClaimEnvelope(input: unknown): P4ReviewerClaimEnvelope {
  const record = plainObject(input, "envelope")
  exactKeys(record, ["version", "envelopeIdentity", "sourceFinding", "riskHypothesis", "evidenceRefs", "verifierProposals", "criticState"], [], "envelope")
  if (record.version !== P4_R1_CLAIM_ENVELOPE_VERSION) fail("unsupported P4-R1 envelope version")
  if (record.criticState !== P4_R1_CRITIC_STATE) fail("P4-R1 criticState must be NOT_EVALUATED")
  const withoutIdentity: Omit<P4ReviewerClaimEnvelope, "envelopeIdentity"> = {
    version: P4_R1_CLAIM_ENVELOPE_VERSION,
    sourceFinding: sourceSnapshotValue(record.sourceFinding),
    riskHypothesis: riskHypothesis(record.riskHypothesis),
    evidenceRefs: stringSet(record.evidenceRefs, "envelope.evidenceRefs", 1, MAX_REFS),
    verifierProposals: verifierProposals(record.verifierProposals),
    criticState: P4_R1_CRITIC_STATE,
  }
  const expectedIdentity = identity(envelopePreimage(withoutIdentity))
  if (sha256(record.envelopeIdentity, "envelope.envelopeIdentity") !== expectedIdentity) fail("envelope.envelopeIdentity does not match canonical content")
  return deepFreeze(structuredClone({ ...withoutIdentity, envelopeIdentity: expectedIdentity }))
}
