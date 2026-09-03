import { types as utilTypes } from "node:util"

import { canonicalize, sha256Canonical } from "../p2-r1/contract.ts"
import { compareP2R4 } from "../p2-r4/comparison.ts"
import { buildContextPolicyPairwiseMetricEvidence } from "../p3-r3/context-policy-evidence.ts"
import type { ContextPolicyPairwiseMetricEvidence } from "../p3-r3/contracts.ts"
import { buildContextPolicyBenchmarkProvenanceEvidence } from "../p3-r4/context-policy-provenance.ts"
import type { ContextPolicyBenchmarkProvenanceEvidence } from "../p3-r4/contracts.ts"
import {
  P3_R5_CHRONOLOGY_STATUSES,
  P3_R5_CONTAMINATION_STATUSES,
  P3_R5_CORPUS_ROLES,
  type P3R5ChronologyStatus,
  type P3R5ContaminationStatus,
  type P3R5CorpusRole,
} from "../p3-r5/contracts.ts"
import { buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence } from "../p3-r16/declared-directional-relation-criterion-match.ts"
import type { DeclaredStrategyDirectionalRelationCriterionMatchEvidence } from "../p3-r16/contracts.ts"
import {
  P3_R17_QUALIFICATION_DECLARATION_KIND,
  P3_R17_QUALIFICATION_DECLARATION_VERSION,
  P3_R17_SUBSTRATE_QUALIFICATION_EVIDENCE_KIND,
  P3_R17_SUBSTRATE_QUALIFICATION_EVIDENCE_VERSION,
  P3_R17_TASK_FAMILY,
  type LateChainBenchmarkProvenanceSubstrateQualificationEvidence,
  type P3R17CaseTuple,
  type P3R17ProvenanceCriteria,
  type P3R17ProvenanceCriterionResult,
  type P3R17QualificationDeclaration,
  type P3R17SubstrateBinding,
  type P3R17SubstrateQualificationEvidenceState,
} from "./contracts.ts"

type UnknownRecord = Record<string, unknown>

type ProvenanceReconstructionBundle = {
  readonly planRequest: unknown
  readonly leftPolicy: unknown
  readonly rightPolicy: unknown
  readonly leftR2Report: unknown
  readonly leftR3Summary: unknown
  readonly rightR2Report: unknown
  readonly rightR3Summary: unknown
  readonly sharedEvaluationContext: unknown
  readonly leftSubject: unknown
  readonly rightSubject: unknown
  readonly comparisonPolicy: unknown
  readonly p3R3Declaration: unknown
  readonly manifest: unknown
  readonly developmentFixture: unknown
  readonly holdoutFixture: unknown
  readonly provenanceDeclaration: unknown
}

const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const SHA256 = /^sha256:[0-9a-f]{64}$/
const BARE_SHA256 = /^[0-9a-f]{64}$/
const MAX_STABLE_ID_BYTES = 512

const PROVENANCE_BUNDLE_KEYS = [
  "planRequest",
  "leftPolicy",
  "rightPolicy",
  "leftR2Report",
  "leftR3Summary",
  "rightR2Report",
  "rightR3Summary",
  "sharedEvaluationContext",
  "leftSubject",
  "rightSubject",
  "comparisonPolicy",
  "p3R3Declaration",
  "manifest",
  "developmentFixture",
  "holdoutFixture",
  "provenanceDeclaration",
] as const

const QUALIFICATION_DECLARATION_KEYS = [
  "version",
  "kind",
  "qualificationId",
  "qualificationPolicyIdentity",
  "criterionMatchEvidenceIdentity",
  "provenanceEvidenceIdentity",
  "provenanceCriteria",
] as const

const PROVENANCE_CRITERIA_KEYS = [
  "requiredCorpusRoles",
  "allowedChronologyStatuses",
  "allowedContaminationStatuses",
] as const

function fail(message: string): never {
  throw new TypeError(`P3-R17 contract violation: ${message}`)
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function hardenJson(value: unknown, label: string, ancestors = new WeakSet<object>()): unknown {
  if (value === null || typeof value === "string" || typeof value === "boolean") return value
  if (typeof value === "number") {
    if (!Number.isFinite(value)) fail(`${label} must contain only finite JSON numbers`)
    return value
  }
  if (typeof value !== "object") fail(`${label} must contain only JSON data`)
  if (utilTypes.isProxy(value)) fail(`${label} must not contain Proxy values`)
  if (ancestors.has(value)) fail(`${label} must not contain cycles`)

  ancestors.add(value)
  try {
    if (Array.isArray(value)) {
      if (Object.getPrototypeOf(value) !== Array.prototype) fail(`${label} must use a plain array`)
      const ownKeys = Reflect.ownKeys(value)
      if (ownKeys.some((key) => typeof key !== "string")) fail(`${label} must not contain symbol fields`)
      const descriptors = Object.getOwnPropertyDescriptors(value) as Record<string, PropertyDescriptor>
      const lengthDescriptor = descriptors.length
      if (!lengthDescriptor || !("value" in lengthDescriptor) || lengthDescriptor.value !== value.length) {
        fail(`${label}.length descriptor is not canonical`)
      }
      const allowed = new Set(["length", ...Array.from({ length: value.length }, (_, index) => String(index))])
      for (const [key, descriptor] of Object.entries(descriptors)) {
        if (!allowed.has(key)) fail(`${label} contains an extended array field: ${key}`)
        if (key !== "length" && (!("value" in descriptor) || descriptor.enumerable !== true)) {
          fail(`${label}[${key}] must be an enumerable own data property`)
        }
      }
      const result: unknown[] = []
      for (let index = 0; index < value.length; index += 1) {
        const descriptor = descriptors[String(index)]
        if (!descriptor || !("value" in descriptor)) fail(`${label} must be dense`)
        result.push(hardenJson(descriptor.value, `${label}[${index}]`, ancestors))
      }
      return result
    }

    const prototype = Object.getPrototypeOf(value)
    if (prototype !== Object.prototype && prototype !== null) fail(`${label} must use a plain object`)
    const ownKeys = Reflect.ownKeys(value)
    if (ownKeys.some((key) => typeof key !== "string")) fail(`${label} must not contain symbol fields`)
    const descriptors = Object.getOwnPropertyDescriptors(value) as Record<string, PropertyDescriptor>
    const result = Object.create(null) as UnknownRecord
    for (const key of ownKeys as string[]) {
      const descriptor = descriptors[key]
      if (!descriptor || !("value" in descriptor) || descriptor.enumerable !== true) {
        fail(`${label}.${key} must be an enumerable own data property`)
      }
      result[key] = hardenJson(descriptor.value, `${label}.${key}`, ancestors)
    }
    return result
  } finally {
    ancestors.delete(value)
  }
}

function hardenSnapshot<T>(value: unknown, label: string): T {
  try {
    return JSON.parse(canonicalize(hardenJson(value, label))) as T
  } catch (error) {
    if (error instanceof TypeError && error.message.startsWith("P3-R17 contract violation:")) throw error
    const detail = error instanceof Error ? error.message : String(error)
    fail(`${label} is not canonical JSON: ${detail}`)
  }
}

function record(value: unknown, label: string): UnknownRecord {
  if (value === null || typeof value !== "object" || Array.isArray(value)) fail(`${label} must be an object`)
  return value as UnknownRecord
}

function exactKeys(value: object, expected: readonly string[], label: string): void {
  const ownKeys = Reflect.ownKeys(value)
  if (ownKeys.some((key) => typeof key !== "string")) fail(`${label} keys drifted from the canonical contract`)
  const actual = (ownKeys as string[]).sort(compareStrings)
  const required = [...expected].sort(compareStrings)
  if (actual.length !== required.length || actual.some((key, index) => key !== required[index])) {
    fail(`${label} keys drifted from the canonical contract`)
  }
  for (const key of actual) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key)
    if (!descriptor || descriptor.enumerable !== true || !("value" in descriptor)) {
      fail(`${label}.${key} must be an enumerable own data property`)
    }
  }
}

function stableId(value: unknown, label: string): string {
  if (typeof value !== "string" || value.length === 0 || value.trim() !== value || value.includes("\0")) {
    fail(`${label} must be a non-empty canonical NUL-free string`)
  }
  if (Buffer.byteLength(value, "utf8") > MAX_STABLE_ID_BYTES) {
    fail(`${label} exceeds ${MAX_STABLE_ID_BYTES} UTF-8 bytes`)
  }
  if (!STABLE_ID.test(value)) fail(`${label} must use the stable-id alphabet`)
  return value
}

function sha256Identity(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256.test(value)) fail(`${label} must be a lowercase sha256 identity`)
  return value
}

function bareSha256Identity(value: unknown, label: string): string {
  if (typeof value !== "string" || !BARE_SHA256.test(value)) fail(`${label} must be a bare lowercase SHA-256 identity`)
  return value
}

function strictClosedSet<T extends string>(
  value: unknown,
  label: string,
  allowed: readonly T[],
): readonly T[] {
  if (!Array.isArray(value) || value.length === 0) fail(`${label} must be a non-empty array`)
  const result = value.map((entry, index) => {
    if (typeof entry !== "string" || !allowed.includes(entry as T)) fail(`${label}[${index}] is unsupported`)
    return entry as T
  })
  for (let index = 1; index < result.length; index += 1) {
    if (compareStrings(result[index - 1]!, result[index]!) >= 0) {
      fail(`${label} must already be strictly ordered and duplicate-free`)
    }
  }
  return Object.freeze(result)
}

function normalizeQualificationDeclaration(
  value: unknown,
  trustedR16: DeclaredStrategyDirectionalRelationCriterionMatchEvidence,
  trustedR4: ContextPolicyBenchmarkProvenanceEvidence,
): P3R17QualificationDeclaration {
  const declaration = record(value, "qualificationDeclaration")
  exactKeys(declaration, QUALIFICATION_DECLARATION_KEYS, "qualificationDeclaration")
  if (
    declaration.version !== P3_R17_QUALIFICATION_DECLARATION_VERSION ||
    declaration.kind !== P3_R17_QUALIFICATION_DECLARATION_KIND
  ) {
    fail("unsupported P3-R17 qualification declaration contract")
  }
  const criteria = record(declaration.provenanceCriteria, "qualificationDeclaration.provenanceCriteria")
  exactKeys(criteria, PROVENANCE_CRITERIA_KEYS, "qualificationDeclaration.provenanceCriteria")

  const qualificationId = stableId(declaration.qualificationId, "qualificationDeclaration.qualificationId")
  if (qualificationId !== trustedR4.qualificationId) {
    fail("qualificationDeclaration.qualificationId does not match trusted P3-R4 evidence")
  }
  const criterionMatchEvidenceIdentity = sha256Identity(
    declaration.criterionMatchEvidenceIdentity,
    "qualificationDeclaration.criterionMatchEvidenceIdentity",
  )
  if (criterionMatchEvidenceIdentity !== trustedR16.criterionMatchEvidenceIdentity) {
    fail("qualificationDeclaration.criterionMatchEvidenceIdentity does not match trusted P3-R16 evidence")
  }
  const provenanceEvidenceIdentity = sha256Identity(
    declaration.provenanceEvidenceIdentity,
    "qualificationDeclaration.provenanceEvidenceIdentity",
  )
  if (provenanceEvidenceIdentity !== trustedR4.provenanceEvidenceIdentity) {
    fail("qualificationDeclaration.provenanceEvidenceIdentity does not match trusted P3-R4 evidence")
  }

  const provenanceCriteria: P3R17ProvenanceCriteria = Object.freeze({
    requiredCorpusRoles: strictClosedSet(
      criteria.requiredCorpusRoles,
      "qualificationDeclaration.provenanceCriteria.requiredCorpusRoles",
      P3_R5_CORPUS_ROLES,
    ),
    allowedChronologyStatuses: strictClosedSet(
      criteria.allowedChronologyStatuses,
      "qualificationDeclaration.provenanceCriteria.allowedChronologyStatuses",
      P3_R5_CHRONOLOGY_STATUSES,
    ),
    allowedContaminationStatuses: strictClosedSet(
      criteria.allowedContaminationStatuses,
      "qualificationDeclaration.provenanceCriteria.allowedContaminationStatuses",
      P3_R5_CONTAMINATION_STATUSES,
    ),
  })

  return deepFreeze({
    version: P3_R17_QUALIFICATION_DECLARATION_VERSION,
    kind: P3_R17_QUALIFICATION_DECLARATION_KIND,
    qualificationId,
    qualificationPolicyIdentity: sha256Identity(
      declaration.qualificationPolicyIdentity,
      "qualificationDeclaration.qualificationPolicyIdentity",
    ),
    criterionMatchEvidenceIdentity,
    provenanceEvidenceIdentity,
    provenanceCriteria,
  })
}

function deepFreeze<T>(value: T, seen = new WeakSet<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value
  seen.add(value)
  for (const nested of Object.values(value as UnknownRecord)) deepFreeze(nested, seen)
  if (!Object.isFrozen(value)) Object.freeze(value)
  return value
}

function uniqueSorted<T extends string>(values: readonly T[]): readonly T[] {
  return Object.freeze([...new Set(values)].sort(compareStrings))
}

function provenanceResult(
  evidence: ContextPolicyBenchmarkProvenanceEvidence,
  criteria: P3R17ProvenanceCriteria,
): P3R17ProvenanceCriterionResult {
  const roles = uniqueSorted(evidence.caseProvenance.map((entry) => entry.corpusRole as P3R5CorpusRole))
  const chronology = uniqueSorted(
    evidence.caseProvenance.map((entry) => entry.chronologyStatus as P3R5ChronologyStatus),
  )
  const contamination = uniqueSorted(
    evidence.caseProvenance.map((entry) => entry.contaminationStatus as P3R5ContaminationStatus),
  )
  for (const value of roles) if (!P3_R5_CORPUS_ROLES.includes(value)) fail(`trusted P3-R4 corpus role is unsupported: ${value}`)
  for (const value of chronology) {
    if (!P3_R5_CHRONOLOGY_STATUSES.includes(value)) fail(`trusted P3-R4 chronology status is unsupported: ${value}`)
  }
  for (const value of contamination) {
    if (!P3_R5_CONTAMINATION_STATUSES.includes(value)) fail(`trusted P3-R4 contamination status is unsupported: ${value}`)
  }

  return deepFreeze({
    requiredCorpusRoles: criteria.requiredCorpusRoles,
    observedCorpusRoles: roles,
    allowedChronologyStatuses: criteria.allowedChronologyStatuses,
    observedChronologyStatuses: chronology,
    allowedContaminationStatuses: criteria.allowedContaminationStatuses,
    observedContaminationStatuses: contamination,
    corpusRoleCriterionState: criteria.requiredCorpusRoles.every((entry) => roles.includes(entry))
      ? "SATISFIED"
      : "NOT_SATISFIED",
    chronologyCriterionState: chronology.every((entry) => criteria.allowedChronologyStatuses.includes(entry))
      ? "SATISFIED"
      : "NOT_SATISFIED",
    contaminationCriterionState: contamination.every((entry) => criteria.allowedContaminationStatuses.includes(entry))
      ? "SATISFIED"
      : "NOT_SATISFIED",
  })
}

function caseTuple(caseId: unknown, r1ResultIdentity: unknown, label: string): P3R17CaseTuple {
  return Object.freeze({
    caseId: stableId(caseId, `${label}.caseId`),
    r1ResultIdentity: sha256Identity(r1ResultIdentity, `${label}.r1ResultIdentity`),
  })
}

function tupleKey(value: P3R17CaseTuple): string {
  return canonicalize([value.caseId, value.r1ResultIdentity])
}

function substrateBinding(
  trustedR16: DeclaredStrategyDirectionalRelationCriterionMatchEvidence,
  trustedR4: ContextPolicyBenchmarkProvenanceEvidence,
  trustedR3: ContextPolicyPairwiseMetricEvidence,
): P3R17SubstrateBinding {
  sha256Identity(trustedR16.criterionMatchEvidenceIdentity, "trusted P3-R16 criterionMatchEvidenceIdentity")
  sha256Identity(trustedR4.provenanceEvidenceIdentity, "trusted P3-R4 provenanceEvidenceIdentity")
  sha256Identity(trustedR3.evidenceIdentity, "trusted P3-R3 evidenceIdentity")
  if (trustedR4.p3R3EvidenceIdentity !== trustedR3.evidenceIdentity) {
    fail("trusted P3-R4 p3R3EvidenceIdentity does not match same-bundle canonical P3-R3 evidence")
  }
  if (
    trustedR16.benchmarkId !== trustedR4.benchmarkId ||
    trustedR16.benchmarkId !== trustedR3.benchmarkId
  ) {
    fail("trusted P3-R16/P3-R4/P3-R3 benchmarkId values do not match")
  }
  if (
    trustedR16.benchmarkProtocolVersion !== trustedR4.benchmarkProtocolVersion ||
    trustedR16.benchmarkProtocolVersion !== trustedR3.benchmarkProtocolVersion
  ) {
    fail("trusted P3-R16/P3-R4/P3-R3 benchmarkProtocolVersion values do not match")
  }
  if (trustedR4.taskFamily !== P3_R17_TASK_FAMILY || trustedR3.taskFamily !== P3_R17_TASK_FAMILY) {
    fail(`trusted P3-R4/P3-R3 task family must be ${P3_R17_TASK_FAMILY}`)
  }

  const pairwise = trustedR16.directionalRelationEvidence.pairwiseComparisonEvidence
  const leftReduction = pairwise.leftDirectionBindingEvidence.reductionEvidence
  const rightReduction = pairwise.rightDirectionBindingEvidence.reductionEvidence
  const lateTaskFamilies = uniqueSorted([
    ...leftReduction.dimensionReductions.flatMap((entry) => [
      entry.memberAObservation.task_family,
      entry.memberBObservation.task_family,
    ]),
    ...rightReduction.dimensionReductions.flatMap((entry) => [
      entry.memberAObservation.task_family,
      entry.memberBObservation.task_family,
    ]),
  ])
  if (lateTaskFamilies.length !== 1 || lateTaskFamilies[0] !== P3_R17_TASK_FAMILY) {
    fail(`trusted P3-R16 late-chain task family must be ${P3_R17_TASK_FAMILY}`)
  }
  const leftA = leftReduction.memberAReference
  const leftB = leftReduction.memberBReference
  const rightA = rightReduction.memberAReference
  const rightB = rightReduction.memberBReference

  const leftPolicyIdentity = bareSha256Identity(trustedR3.leftPolicyIdentity, "trusted P3-R3 leftPolicyIdentity")
  const rightPolicyIdentity = bareSha256Identity(trustedR3.rightPolicyIdentity, "trusted P3-R3 rightPolicyIdentity")
  if (leftPolicyIdentity === rightPolicyIdentity) fail("trusted P3-R3 left/right policy identities must remain distinct")
  if (leftA.policyIdentity !== leftPolicyIdentity || leftB.policyIdentity !== leftPolicyIdentity) {
    fail("trusted late-chain left member policy identities do not bind trusted P3-R3 left policy orientation")
  }
  if (rightA.policyIdentity !== rightPolicyIdentity || rightB.policyIdentity !== rightPolicyIdentity) {
    fail("trusted late-chain right member policy identities do not bind trusted P3-R3 right policy orientation")
  }

  const memberA = caseTuple(leftA.caseId, leftA.r1ResultIdentity, "trusted late-chain memberA")
  const memberB = caseTuple(leftB.caseId, leftB.r1ResultIdentity, "trusted late-chain memberB")
  const rightMemberA = caseTuple(rightA.caseId, rightA.r1ResultIdentity, "trusted late-chain right memberA")
  const rightMemberB = caseTuple(rightB.caseId, rightB.r1ResultIdentity, "trusted late-chain right memberB")
  if (tupleKey(memberA) !== tupleKey(rightMemberA) || tupleKey(memberB) !== tupleKey(rightMemberB)) {
    fail("trusted late-chain strategy sides do not preserve the same member A/B R1 substrate")
  }
  if (tupleKey(memberA) === tupleKey(memberB)) fail("trusted late-chain member A/B R1 substrate must contain exactly two distinct tuples")

  if (trustedR4.caseProvenance.length !== 2) {
    fail("trusted P3-R4 caseProvenance must contain exactly two cases")
  }
  const provenanceTuples = trustedR4.caseProvenance.map((entry, index) =>
    caseTuple(entry.caseId, entry.r1ResultIdentity, `trusted P3-R4 caseProvenance[${index}]`),
  )
  if (new Set(provenanceTuples.map(tupleKey)).size !== 2) {
    fail("trusted P3-R4 caseProvenance must contain two distinct case/R1 tuples")
  }
  const lateKeys = new Set([tupleKey(memberA), tupleKey(memberB)])
  if (provenanceTuples.some((entry) => !lateKeys.has(tupleKey(entry)))) {
    fail("trusted P3-R4 case provenance does not match the exact late-chain two-case R1 substrate")
  }
  const matchingProvenanceCaseTuples = Object.freeze(
    [...provenanceTuples].sort(
      (left, right) => compareStrings(left.caseId, right.caseId) || compareStrings(left.r1ResultIdentity, right.r1ResultIdentity),
    ),
  )

  return deepFreeze({
    p3R3EvidenceIdentity: trustedR3.evidenceIdentity,
    leftPolicyIdentity,
    rightPolicyIdentity,
    memberA,
    memberB,
    matchingProvenanceCaseTuples,
  })
}

function rootState(
  trustedR16: DeclaredStrategyDirectionalRelationCriterionMatchEvidence,
  provenance: P3R17ProvenanceCriterionResult,
): P3R17SubstrateQualificationEvidenceState {
  if (trustedR16.criterionMatchEvidenceState === "INSUFFICIENT_DIRECTIONAL_EVIDENCE") {
    return "INSUFFICIENT_DIRECTIONAL_EVIDENCE"
  }
  if (
    trustedR16.criterionMatchEvidenceState === "ONE_OR_MORE_DECLARED_RELATION_CRITERIA_NOT_SATISFIED" ||
    provenance.corpusRoleCriterionState === "NOT_SATISFIED" ||
    provenance.chronologyCriterionState === "NOT_SATISFIED" ||
    provenance.contaminationCriterionState === "NOT_SATISFIED"
  ) {
    return "ONE_OR_MORE_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_NOT_SATISFIED"
  }
  if (trustedR16.criterionMatchEvidenceState !== "ALL_DECLARED_RELATION_CRITERIA_SATISFIED") {
    fail("trusted P3-R16 criterionMatchEvidenceState is outside the canonical closed domain")
  }
  return "ALL_DECLARED_SUBSTRATE_QUALIFICATION_CRITERIA_SATISFIED"
}

export function buildLateChainBenchmarkProvenanceSubstrateQualificationEvidence(
  leftReconstructionValue: unknown,
  rightReconstructionValue: unknown,
  comparisonDeclarationValue: unknown,
  criterionDeclarationValue: unknown,
  provenanceReconstructionValue: unknown,
  qualificationDeclarationValue: unknown,
): LateChainBenchmarkProvenanceSubstrateQualificationEvidence {
  if (arguments.length !== 6) {
    fail("buildLateChainBenchmarkProvenanceSubstrateQualificationEvidence requires exactly six arguments")
  }

  const trustedR16 = buildDeclaredStrategyDirectionalRelationCriterionMatchEvidence(
    leftReconstructionValue,
    rightReconstructionValue,
    comparisonDeclarationValue,
    criterionDeclarationValue,
  )

  const bundle = hardenSnapshot<ProvenanceReconstructionBundle>(
    provenanceReconstructionValue,
    "provenanceReconstruction",
  )
  exactKeys(bundle, PROVENANCE_BUNDLE_KEYS, "provenanceReconstruction")

  const trustedR4 = buildContextPolicyBenchmarkProvenanceEvidence(
    bundle.planRequest,
    bundle.leftPolicy,
    bundle.rightPolicy,
    bundle.leftR2Report,
    bundle.leftR3Summary,
    bundle.rightR2Report,
    bundle.rightR3Summary,
    bundle.sharedEvaluationContext,
    bundle.leftSubject,
    bundle.rightSubject,
    bundle.comparisonPolicy,
    bundle.p3R3Declaration,
    bundle.manifest,
    bundle.developmentFixture,
    bundle.holdoutFixture,
    bundle.provenanceDeclaration,
  )

  const trustedComparison = compareP2R4(
    bundle.leftR2Report,
    bundle.leftR3Summary,
    bundle.rightR2Report,
    bundle.rightR3Summary,
    bundle.sharedEvaluationContext,
    bundle.leftSubject,
    bundle.rightSubject,
    bundle.comparisonPolicy,
  )
  const trustedR3 = buildContextPolicyPairwiseMetricEvidence(
    bundle.planRequest,
    bundle.leftPolicy,
    bundle.rightPolicy,
    trustedComparison,
    bundle.p3R3Declaration,
  )

  const binding = substrateBinding(trustedR16, trustedR4, trustedR3)
  const declarationSnapshot = hardenSnapshot<unknown>(
    qualificationDeclarationValue,
    "qualificationDeclaration",
  )
  const qualificationDeclaration = normalizeQualificationDeclaration(
    declarationSnapshot,
    trustedR16,
    trustedR4,
  )
  const provenanceCriterionResult = provenanceResult(
    trustedR4,
    qualificationDeclaration.provenanceCriteria,
  )
  const substrateQualificationEvidenceState = rootState(trustedR16, provenanceCriterionResult)

  const projection = {
    version: P3_R17_SUBSTRATE_QUALIFICATION_EVIDENCE_VERSION,
    kind: P3_R17_SUBSTRATE_QUALIFICATION_EVIDENCE_KIND,
    qualificationId: qualificationDeclaration.qualificationId,
    qualificationPolicyIdentity: qualificationDeclaration.qualificationPolicyIdentity,
    criterionMatchEvidenceIdentity: trustedR16.criterionMatchEvidenceIdentity,
    provenanceEvidenceIdentity: trustedR4.provenanceEvidenceIdentity,
    comparisonId: trustedR16.comparisonId,
    criterionSetId: trustedR16.criterionSetId,
    criterionPolicyIdentity: trustedR16.criterionPolicyIdentity,
    leftStrategySubjectIdentity: trustedR16.leftStrategySubjectIdentity,
    rightStrategySubjectIdentity: trustedR16.rightStrategySubjectIdentity,
    benchmarkId: trustedR16.benchmarkId,
    benchmarkProtocolVersion: trustedR16.benchmarkProtocolVersion,
    qualificationDeclaration,
    criterionMatchEvidence: trustedR16,
    benchmarkProvenanceEvidence: trustedR4,
    substrateBinding: binding,
    provenanceCriterionResult,
    substrateQualificationEvidenceState,
  }
  const result: LateChainBenchmarkProvenanceSubstrateQualificationEvidence = {
    ...projection,
    substrateQualificationEvidenceIdentity: sha256Canonical(projection),
  }
  return deepFreeze(result)
}
