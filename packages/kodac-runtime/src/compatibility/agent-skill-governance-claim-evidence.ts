import { createHash } from "node:crypto"
import { types as utilTypes } from "node:util"

import {
  K4_R4_AGENT_SKILL_OBJECT_KIND,
  K4_R4_AGENT_SKILL_PACKAGE_EVIDENCE_VERSION,
  K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY,
  validateAgentSkillPackageEvidence,
  type AgentSkillPackageEvidence,
} from "./agent-skill-package-evidence.ts"
import {
  K4_R1_LIMITS,
  validateCompatibilityCapabilityId,
  validateCompatibilitySha256,
} from "./contracts.ts"

export const K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_VERSION =
  "k4-r5-agent-skill-governance-claim-evidence-v1" as const
export const K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_STATUS = "CALLER_ASSERTED" as const
export const K4_R5_AGENT_SKILL_GOVERNANCE_TRUST_STATUS = "UNASSESSED" as const
export const K4_R5_AGENT_SKILL_GOVERNANCE_AUTHORITY_STATE = "NONE" as const
export const K4_R5_AGENT_SKILL_REQUIREMENT_KINDS = Object.freeze([
  "FILESYSTEM",
  "NETWORK",
  "PROCESS",
  "SECRET",
] as const)
export const K4_R5_AGENT_SKILL_ASSERTED_OUTCOMES = Object.freeze([
  "PASS",
  "FAIL",
  "INCONCLUSIVE",
] as const)
export const K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS = Object.freeze({
  maxRequestedCapabilityClaims: 16,
  maxRequirementClaims: 4,
  maxEvaluationClaims: 32,
  maxEvidenceByteLength: 16 * 1024 * 1024,
  maxPackageVersionEvidenceByteLength: 4_096,
  maxCompatibilityClaimEvidenceByteLength: 65_536,
} as const)

export type AgentSkillRequirementKind = typeof K4_R5_AGENT_SKILL_REQUIREMENT_KINDS[number]
export type AgentSkillAssertedOutcome = typeof K4_R5_AGENT_SKILL_ASSERTED_OUTCOMES[number]

export interface AgentSkillGovernanceDigestEvidence {
  readonly sha256: string
  readonly byteLength: number
}

export interface AgentSkillRequestedCapabilityClaimInput {
  readonly capabilityId: string
}

export interface AgentSkillRequirementClaimInput {
  readonly requirementKind: AgentSkillRequirementKind
  readonly evidenceSha256: string
  readonly evidenceByteLength: number
}

export interface AgentSkillEvaluationClaimInput {
  readonly evaluatorIdentity: string
  readonly artifactIdentity: string
  readonly artifactByteLength: number
  readonly assertedOutcome: AgentSkillAssertedOutcome
}

export interface AgentSkillGovernanceClaimEvidenceInput {
  readonly version: typeof K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_VERSION
  readonly packageEvidence: AgentSkillPackageEvidence
  readonly packageVersionEvidence: AgentSkillGovernanceDigestEvidence
  readonly governanceRevisionIdentity: string
  readonly requestedCapabilityClaims: readonly AgentSkillRequestedCapabilityClaimInput[]
  readonly requirementClaims: readonly AgentSkillRequirementClaimInput[]
  readonly compatibilityClaimEvidence: AgentSkillGovernanceDigestEvidence | null
  readonly evaluationClaims: readonly AgentSkillEvaluationClaimInput[]
}

export interface AgentSkillRequestedCapabilityClaim extends AgentSkillRequestedCapabilityClaimInput {
  readonly claimStatus: typeof K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_STATUS
}

export interface AgentSkillRequirementClaim extends AgentSkillRequirementClaimInput {
  readonly claimStatus: typeof K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_STATUS
}

export interface AgentSkillCompatibilityClaimEvidence extends AgentSkillGovernanceDigestEvidence {
  readonly claimStatus: typeof K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_STATUS
}

export interface AgentSkillEvaluationClaim extends AgentSkillEvaluationClaimInput {
  readonly claimStatus: typeof K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_STATUS
}

export interface AgentSkillGovernanceClaimEvidence {
  readonly version: typeof K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_VERSION
  readonly packageEvidenceIdentity: string
  readonly packageEvidenceVersion: typeof K4_R4_AGENT_SKILL_PACKAGE_EVIDENCE_VERSION
  readonly standardPinIdentity: typeof K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY
  readonly objectKind: typeof K4_R4_AGENT_SKILL_OBJECT_KIND
  readonly extensionId: string
  readonly descriptorIdentity: string
  readonly bindingSnapshotIdentity: string
  readonly bindingState: AgentSkillPackageEvidence["bindingState"]
  readonly directoryName: string
  readonly name: string
  readonly externalMetadataSha256: string
  readonly sourceProvenanceIdentity: string
  readonly packageManifestEvidence: Readonly<{
    sha256: string
    fileCount: number
    totalByteLength: number
  }>
  readonly licenseEvidence: AgentSkillGovernanceDigestEvidence | null
  readonly compatibilityEvidence: AgentSkillGovernanceDigestEvidence | null
  readonly packageVersionEvidence: AgentSkillGovernanceDigestEvidence
  readonly governanceRevisionIdentity: string
  readonly requestedCapabilityClaims: readonly AgentSkillRequestedCapabilityClaim[]
  readonly requirementClaims: readonly AgentSkillRequirementClaim[]
  readonly compatibilityClaimEvidence: AgentSkillCompatibilityClaimEvidence | null
  readonly evaluationClaims: readonly AgentSkillEvaluationClaim[]
  readonly trustStatus: typeof K4_R5_AGENT_SKILL_GOVERNANCE_TRUST_STATUS
  readonly authorityState: typeof K4_R5_AGENT_SKILL_GOVERNANCE_AUTHORITY_STATE
  readonly governanceEvidenceIdentity: string
}

type UnknownRecord = Record<string, unknown>
type GovernanceEvidenceWithoutIdentity = Omit<AgentSkillGovernanceClaimEvidence, "governanceEvidenceIdentity">

const INPUT_KEYS = [
  "version",
  "packageEvidence",
  "packageVersionEvidence",
  "governanceRevisionIdentity",
  "requestedCapabilityClaims",
  "requirementClaims",
  "compatibilityClaimEvidence",
  "evaluationClaims",
] as const
const DIGEST_EVIDENCE_KEYS = ["sha256", "byteLength"] as const
const REQUESTED_CAPABILITY_KEYS = ["capabilityId"] as const
const REQUIREMENT_CLAIM_KEYS = ["requirementKind", "evidenceSha256", "evidenceByteLength"] as const
const EVALUATION_CLAIM_KEYS = [
  "evaluatorIdentity",
  "artifactIdentity",
  "artifactByteLength",
  "assertedOutcome",
] as const
const OUTPUT_REQUESTED_CAPABILITY_KEYS = [...REQUESTED_CAPABILITY_KEYS, "claimStatus"] as const
const OUTPUT_REQUIREMENT_CLAIM_KEYS = [...REQUIREMENT_CLAIM_KEYS, "claimStatus"] as const
const OUTPUT_COMPATIBILITY_CLAIM_KEYS = [...DIGEST_EVIDENCE_KEYS, "claimStatus"] as const
const OUTPUT_EVALUATION_CLAIM_KEYS = [...EVALUATION_CLAIM_KEYS, "claimStatus"] as const
const OUTPUT_KEYS = [
  "version",
  "packageEvidenceIdentity",
  "packageEvidenceVersion",
  "standardPinIdentity",
  "objectKind",
  "extensionId",
  "descriptorIdentity",
  "bindingSnapshotIdentity",
  "bindingState",
  "directoryName",
  "name",
  "externalMetadataSha256",
  "sourceProvenanceIdentity",
  "packageManifestEvidence",
  "licenseEvidence",
  "compatibilityEvidence",
  "packageVersionEvidence",
  "governanceRevisionIdentity",
  "requestedCapabilityClaims",
  "requirementClaims",
  "compatibilityClaimEvidence",
  "evaluationClaims",
  "trustStatus",
  "authorityState",
  "governanceEvidenceIdentity",
] as const

const REQUIREMENT_KIND_ORDER = new Map<AgentSkillRequirementKind, number>(
  K4_R5_AGENT_SKILL_REQUIREMENT_KINDS.map((kind, index) => [kind, index]),
)

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function copyDataTree(
  value: unknown,
  label: string,
  state = { depth: 0, nodes: 0, ancestors: new WeakSet<object>() },
): unknown {
  if (value === null || typeof value === "string" || typeof value === "boolean") return value
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new TypeError(`${label} contains a non-finite number`)
    return value
  }
  if (typeof value !== "object") throw new TypeError(`${label} must contain only JSON data`)
  if (utilTypes.isProxy(value)) throw new TypeError(`${label} must not contain Proxy values`)
  if (state.depth >= K4_R1_LIMITS.maxCanonicalDepth) throw new RangeError(`${label} exceeds the canonical depth bound`)
  state.nodes += 1
  if (state.nodes > K4_R1_LIMITS.maxCanonicalNodes) throw new RangeError(`${label} exceeds the canonical node bound`)
  if (state.ancestors.has(value)) throw new TypeError(`${label} must not be cyclic`)
  state.ancestors.add(value)
  state.depth += 1
  try {
    if (Object.getOwnPropertySymbols(value).length !== 0) throw new TypeError(`${label} must not contain symbol fields`)
    if (Array.isArray(value)) {
      if (Object.getPrototypeOf(value) !== Array.prototype) throw new TypeError(`${label} must be a plain array`)
      const lengthDescriptor = Object.getOwnPropertyDescriptor(value, "length")
      if (
        lengthDescriptor === undefined
        || !("value" in lengthDescriptor)
        || !Number.isSafeInteger(lengthDescriptor.value)
        || lengthDescriptor.value < 0
      ) throw new TypeError(`${label}.length is invalid`)
      const length = lengthDescriptor.value as number
      if (length > K4_R1_LIMITS.maxCanonicalNodes) throw new RangeError(`${label} exceeds the pre-validation array bound`)
      const descriptors = Object.getOwnPropertyDescriptors(value)
      const allowed = new Set<string>(["length"])
      for (let index = 0; index < length; index += 1) allowed.add(String(index))
      for (const [key, descriptor] of Object.entries(descriptors)) {
        if (!allowed.has(key)) throw new TypeError(`${label} contains unexpected array field: ${key}`)
        if (key !== "length" && (!("value" in descriptor) || !descriptor.enumerable)) {
          throw new TypeError(`${label}[${key}] must be an enumerable data property`)
        }
      }
      const result: unknown[] = []
      for (let index = 0; index < length; index += 1) {
        const descriptor = descriptors[String(index)]
        if (descriptor === undefined || !("value" in descriptor)) throw new TypeError(`${label} must be dense`)
        result.push(copyDataTree(descriptor.value, `${label}[${index}]`, state))
      }
      return result
    }
    const prototype = Object.getPrototypeOf(value)
    if (prototype !== Object.prototype && prototype !== null) throw new TypeError(`${label} must be a plain object`)
    if (Reflect.ownKeys(value).length > K4_R1_LIMITS.maxCanonicalNodes) {
      throw new RangeError(`${label} exceeds the pre-validation object-field bound`)
    }
    const descriptors = Object.getOwnPropertyDescriptors(value)
    const result = Object.create(null) as UnknownRecord
    for (const [key, descriptor] of Object.entries(descriptors)) {
      if (!("value" in descriptor) || !descriptor.enumerable) {
        throw new TypeError(`${label}.${key} must be an enumerable data property`)
      }
      result[key] = copyDataTree(descriptor.value, `${label}.${key}`, state)
    }
    return result
  } finally {
    state.depth -= 1
    state.ancestors.delete(value)
  }
}

function canonicalize(value: unknown): string {
  if (value === null || typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
    const serialized = JSON.stringify(value)
    if (serialized === undefined) throw new TypeError("canonical value is not JSON data")
    return serialized
  }
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`
  if (typeof value !== "object") throw new TypeError("canonical value is not JSON data")
  const record = value as UnknownRecord
  return `{${Object.keys(record).sort(compareStrings).map((key) => `${JSON.stringify(key)}:${canonicalize(record[key])}`).join(",")}}`
}

function sha256(value: unknown): string {
  return createHash("sha256").update(canonicalize(value), "utf8").digest("hex")
}

function asRecord(value: unknown, label: string): UnknownRecord {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new TypeError(`${label} must be an object`)
  return value as UnknownRecord
}

function exactKeys(record: UnknownRecord, allowed: readonly string[], label: string): void {
  const allowedSet = new Set(allowed)
  for (const key of Object.keys(record)) {
    if (!allowedSet.has(key)) throw new TypeError(`${label} contains unknown field: ${key}`)
  }
  for (const key of allowed) {
    if (!Object.hasOwn(record, key)) throw new TypeError(`${label} is missing required field: ${key}`)
  }
}

function safeInteger(value: unknown, label: string, minimum: number, maximum: number): number {
  if (!Number.isSafeInteger(value) || (value as number) < minimum || (value as number) > maximum) {
    throw new RangeError(`${label} must be a safe integer from ${minimum} through ${maximum}`)
  }
  return value as number
}

function digestEvidence(
  value: unknown,
  label: string,
  minimumBytes: number,
  maximumBytes: number,
): AgentSkillGovernanceDigestEvidence {
  const record = asRecord(value, label)
  exactKeys(record, DIGEST_EVIDENCE_KEYS, label)
  return Object.freeze({
    sha256: validateCompatibilitySha256(record.sha256, `${label}.sha256`),
    byteLength: safeInteger(record.byteLength, `${label}.byteLength`, minimumBytes, maximumBytes),
  })
}

function requestedCapabilityClaims(value: unknown): readonly AgentSkillRequestedCapabilityClaimInput[] {
  if (!Array.isArray(value) || value.length > K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS.maxRequestedCapabilityClaims) {
    throw new RangeError(
      `requestedCapabilityClaims must contain zero through ${K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS.maxRequestedCapabilityClaims} entries`,
    )
  }
  const claims = value.map((entry, index) => {
    const label = `requestedCapabilityClaims[${index}]`
    const record = asRecord(entry, label)
    exactKeys(record, REQUESTED_CAPABILITY_KEYS, label)
    return Object.freeze({ capabilityId: validateCompatibilityCapabilityId(record.capabilityId, `${label}.capabilityId`) })
  })
  if (new Set(claims.map((claim) => claim.capabilityId)).size !== claims.length) {
    throw new TypeError("requestedCapabilityClaims contains duplicate capabilityId values")
  }
  claims.sort((left, right) => compareStrings(left.capabilityId, right.capabilityId))
  return Object.freeze(claims)
}

function requirementKind(value: unknown, label: string): AgentSkillRequirementKind {
  if (
    typeof value !== "string"
    || !K4_R5_AGENT_SKILL_REQUIREMENT_KINDS.includes(value as AgentSkillRequirementKind)
  ) throw new TypeError(`${label} is unsupported`)
  return value as AgentSkillRequirementKind
}

function requirementClaims(value: unknown): readonly AgentSkillRequirementClaimInput[] {
  if (!Array.isArray(value) || value.length > K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS.maxRequirementClaims) {
    throw new RangeError(
      `requirementClaims must contain zero through ${K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS.maxRequirementClaims} entries`,
    )
  }
  const claims = value.map((entry, index) => {
    const label = `requirementClaims[${index}]`
    const record = asRecord(entry, label)
    exactKeys(record, REQUIREMENT_CLAIM_KEYS, label)
    return Object.freeze({
      requirementKind: requirementKind(record.requirementKind, `${label}.requirementKind`),
      evidenceSha256: validateCompatibilitySha256(record.evidenceSha256, `${label}.evidenceSha256`),
      evidenceByteLength: safeInteger(
        record.evidenceByteLength,
        `${label}.evidenceByteLength`,
        1,
        K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS.maxEvidenceByteLength,
      ),
    })
  })
  if (new Set(claims.map((claim) => claim.requirementKind)).size !== claims.length) {
    throw new TypeError("requirementClaims contains duplicate requirementKind values")
  }
  claims.sort((left, right) => (
    REQUIREMENT_KIND_ORDER.get(left.requirementKind)! - REQUIREMENT_KIND_ORDER.get(right.requirementKind)!
  ))
  return Object.freeze(claims)
}

function assertedOutcome(value: unknown, label: string): AgentSkillAssertedOutcome {
  if (
    typeof value !== "string"
    || !K4_R5_AGENT_SKILL_ASSERTED_OUTCOMES.includes(value as AgentSkillAssertedOutcome)
  ) throw new TypeError(`${label} is unsupported`)
  return value as AgentSkillAssertedOutcome
}

function evaluationClaims(value: unknown): readonly AgentSkillEvaluationClaimInput[] {
  if (!Array.isArray(value) || value.length > K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS.maxEvaluationClaims) {
    throw new RangeError(
      `evaluationClaims must contain zero through ${K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS.maxEvaluationClaims} entries`,
    )
  }
  const claims = value.map((entry, index) => {
    const label = `evaluationClaims[${index}]`
    const record = asRecord(entry, label)
    exactKeys(record, EVALUATION_CLAIM_KEYS, label)
    return Object.freeze({
      evaluatorIdentity: validateCompatibilitySha256(record.evaluatorIdentity, `${label}.evaluatorIdentity`),
      artifactIdentity: validateCompatibilitySha256(record.artifactIdentity, `${label}.artifactIdentity`),
      artifactByteLength: safeInteger(
        record.artifactByteLength,
        `${label}.artifactByteLength`,
        1,
        K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS.maxEvidenceByteLength,
      ),
      assertedOutcome: assertedOutcome(record.assertedOutcome, `${label}.assertedOutcome`),
    })
  })
  const tuples = claims.map((claim) => `${claim.evaluatorIdentity}:${claim.artifactIdentity}`)
  if (new Set(tuples).size !== tuples.length) {
    throw new TypeError("evaluationClaims contains duplicate evaluatorIdentity/artifactIdentity tuples")
  }
  claims.sort((left, right) => (
    compareStrings(left.evaluatorIdentity, right.evaluatorIdentity)
    || compareStrings(left.artifactIdentity, right.artifactIdentity)
    || compareStrings(left.assertedOutcome, right.assertedOutcome)
    || left.artifactByteLength - right.artifactByteLength
  ))
  return Object.freeze(claims)
}

export function validateAgentSkillGovernanceClaimEvidenceInput(
  value: unknown,
): AgentSkillGovernanceClaimEvidenceInput {
  const label = "Agent Skill governance-claim evidence input"
  const record = asRecord(copyDataTree(value, label), label)
  exactKeys(record, INPUT_KEYS, label)
  if (record.version !== K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_VERSION) {
    throw new TypeError("unsupported Agent Skill governance-claim evidence version")
  }
  return Object.freeze({
    version: K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_VERSION,
    packageEvidence: validateAgentSkillPackageEvidence(record.packageEvidence),
    packageVersionEvidence: digestEvidence(
      record.packageVersionEvidence,
      "packageVersionEvidence",
      1,
      K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS.maxPackageVersionEvidenceByteLength,
    ),
    governanceRevisionIdentity: validateCompatibilitySha256(
      record.governanceRevisionIdentity,
      "governanceRevisionIdentity",
    ),
    requestedCapabilityClaims: requestedCapabilityClaims(record.requestedCapabilityClaims),
    requirementClaims: requirementClaims(record.requirementClaims),
    compatibilityClaimEvidence: record.compatibilityClaimEvidence === null
      ? null
      : digestEvidence(
        record.compatibilityClaimEvidence,
        "compatibilityClaimEvidence",
        1,
        K4_R5_AGENT_SKILL_GOVERNANCE_LIMITS.maxCompatibilityClaimEvidenceByteLength,
      ),
    evaluationClaims: evaluationClaims(record.evaluationClaims),
  })
}

function governanceEvidenceFromValidated(
  input: AgentSkillGovernanceClaimEvidenceInput,
): AgentSkillGovernanceClaimEvidence {
  const packageEvidence = input.packageEvidence
  const requestedClaims = Object.freeze(input.requestedCapabilityClaims.map((claim) => Object.freeze({
    capabilityId: claim.capabilityId,
    claimStatus: K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_STATUS,
  })))
  const requiredClaims = Object.freeze(input.requirementClaims.map((claim) => Object.freeze({
    requirementKind: claim.requirementKind,
    evidenceSha256: claim.evidenceSha256,
    evidenceByteLength: claim.evidenceByteLength,
    claimStatus: K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_STATUS,
  })))
  const compatibilityClaimEvidence = input.compatibilityClaimEvidence === null
    ? null
    : Object.freeze({
      sha256: input.compatibilityClaimEvidence.sha256,
      byteLength: input.compatibilityClaimEvidence.byteLength,
      claimStatus: K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_STATUS,
    })
  const evaluations = Object.freeze(input.evaluationClaims.map((claim) => Object.freeze({
    evaluatorIdentity: claim.evaluatorIdentity,
    artifactIdentity: claim.artifactIdentity,
    artifactByteLength: claim.artifactByteLength,
    assertedOutcome: claim.assertedOutcome,
    claimStatus: K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_STATUS,
  })))
  const base = Object.freeze({
    version: K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_VERSION,
    packageEvidenceIdentity: packageEvidence.evidenceIdentity,
    packageEvidenceVersion: K4_R4_AGENT_SKILL_PACKAGE_EVIDENCE_VERSION,
    standardPinIdentity: K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY,
    objectKind: K4_R4_AGENT_SKILL_OBJECT_KIND,
    extensionId: packageEvidence.extensionId,
    descriptorIdentity: packageEvidence.descriptorIdentity,
    bindingSnapshotIdentity: packageEvidence.bindingSnapshotIdentity,
    bindingState: packageEvidence.bindingState,
    directoryName: packageEvidence.directoryName,
    name: packageEvidence.name,
    externalMetadataSha256: packageEvidence.externalMetadataSha256,
    sourceProvenanceIdentity: packageEvidence.sourceProvenanceIdentity,
    packageManifestEvidence: Object.freeze({
      sha256: packageEvidence.packageManifestEvidence.sha256,
      fileCount: packageEvidence.packageManifestEvidence.fileCount,
      totalByteLength: packageEvidence.packageManifestEvidence.totalByteLength,
    }),
    licenseEvidence: packageEvidence.licenseEvidence === null
      ? null
      : Object.freeze({ ...packageEvidence.licenseEvidence }),
    compatibilityEvidence: packageEvidence.compatibilityEvidence === null
      ? null
      : Object.freeze({ ...packageEvidence.compatibilityEvidence }),
    packageVersionEvidence: Object.freeze({ ...input.packageVersionEvidence }),
    governanceRevisionIdentity: input.governanceRevisionIdentity,
    requestedCapabilityClaims: requestedClaims,
    requirementClaims: requiredClaims,
    compatibilityClaimEvidence,
    evaluationClaims: evaluations,
    trustStatus: K4_R5_AGENT_SKILL_GOVERNANCE_TRUST_STATUS,
    authorityState: K4_R5_AGENT_SKILL_GOVERNANCE_AUTHORITY_STATE,
  }) satisfies GovernanceEvidenceWithoutIdentity
  return Object.freeze({ ...base, governanceEvidenceIdentity: sha256(base) })
}

export function materializeAgentSkillGovernanceClaimEvidence(value: unknown): AgentSkillGovernanceClaimEvidence {
  return governanceEvidenceFromValidated(validateAgentSkillGovernanceClaimEvidenceInput(value))
}

function claimsWithoutStatus(
  value: unknown,
  expectedKeys: readonly string[],
  label: string,
): readonly UnknownRecord[] {
  if (!Array.isArray(value)) throw new TypeError(`${label} must be an array`)
  return Object.freeze(value.map((entry, index) => {
    const entryLabel = `${label}[${index}]`
    const record = asRecord(entry, entryLabel)
    exactKeys(record, expectedKeys, entryLabel)
    if (record.claimStatus !== K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_STATUS) {
      throw new TypeError(`${entryLabel}.claimStatus must equal CALLER_ASSERTED`)
    }
    const copy = Object.create(null) as UnknownRecord
    for (const key of expectedKeys) {
      if (key !== "claimStatus") copy[key] = record[key]
    }
    return copy
  }))
}

export function validateAgentSkillGovernanceClaimEvidence(
  value: unknown,
  packageEvidenceValue: unknown,
): AgentSkillGovernanceClaimEvidence {
  const label = "Agent Skill governance-claim evidence"
  const record = asRecord(copyDataTree(value, label), label)
  exactKeys(record, OUTPUT_KEYS, label)
  if (record.version !== K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_VERSION) {
    throw new TypeError("unsupported Agent Skill governance-claim evidence version")
  }
  if (record.packageEvidenceVersion !== K4_R4_AGENT_SKILL_PACKAGE_EVIDENCE_VERSION) {
    throw new TypeError("packageEvidenceVersion must equal the canonical K4-R4 version")
  }
  if (record.standardPinIdentity !== K4_R4_AGENT_SKILLS_STANDARD_PIN_IDENTITY) {
    throw new TypeError("standardPinIdentity must equal the canonical Agent Skills pin")
  }
  if (record.objectKind !== K4_R4_AGENT_SKILL_OBJECT_KIND) {
    throw new TypeError("objectKind must equal AGENT_SKILL")
  }
  if (record.trustStatus !== K4_R5_AGENT_SKILL_GOVERNANCE_TRUST_STATUS) {
    throw new TypeError("trustStatus must equal UNASSESSED")
  }
  if (record.authorityState !== K4_R5_AGENT_SKILL_GOVERNANCE_AUTHORITY_STATE) {
    throw new TypeError("authorityState must equal NONE")
  }
  const packageEvidence = validateAgentSkillPackageEvidence(packageEvidenceValue)
  const compatibilityClaim = record.compatibilityClaimEvidence === null
    ? null
    : asRecord(record.compatibilityClaimEvidence, "compatibilityClaimEvidence")
  if (compatibilityClaim !== null) {
    exactKeys(compatibilityClaim, OUTPUT_COMPATIBILITY_CLAIM_KEYS, "compatibilityClaimEvidence")
    if (compatibilityClaim.claimStatus !== K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_STATUS) {
      throw new TypeError("compatibilityClaimEvidence.claimStatus must equal CALLER_ASSERTED")
    }
  }
  const rebuilt = materializeAgentSkillGovernanceClaimEvidence({
    version: K4_R5_AGENT_SKILL_GOVERNANCE_CLAIM_EVIDENCE_VERSION,
    packageEvidence,
    packageVersionEvidence: record.packageVersionEvidence,
    governanceRevisionIdentity: record.governanceRevisionIdentity,
    requestedCapabilityClaims: claimsWithoutStatus(
      record.requestedCapabilityClaims,
      OUTPUT_REQUESTED_CAPABILITY_KEYS,
      "requestedCapabilityClaims",
    ),
    requirementClaims: claimsWithoutStatus(
      record.requirementClaims,
      OUTPUT_REQUIREMENT_CLAIM_KEYS,
      "requirementClaims",
    ),
    compatibilityClaimEvidence: compatibilityClaim === null
      ? null
      : { sha256: compatibilityClaim.sha256, byteLength: compatibilityClaim.byteLength },
    evaluationClaims: claimsWithoutStatus(
      record.evaluationClaims,
      OUTPUT_EVALUATION_CLAIM_KEYS,
      "evaluationClaims",
    ),
  })
  const claimedIdentity = validateCompatibilitySha256(
    record.governanceEvidenceIdentity,
    "governanceEvidenceIdentity",
  )
  if (claimedIdentity !== rebuilt.governanceEvidenceIdentity || canonicalize(record) !== canonicalize(rebuilt)) {
    throw new TypeError("Agent Skill governance-claim evidence derived fields mismatch")
  }
  return rebuilt
}
