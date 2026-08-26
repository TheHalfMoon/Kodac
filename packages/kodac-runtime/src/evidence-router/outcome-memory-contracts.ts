export const K6_R4_OUTCOME_RECORD_VERSION = "kodac-k6-r4-outcome-record-v1" as const
export const K6_R4_TOMBSTONE_VERSION = "kodac-k6-r4-outcome-tombstone-v1" as const
export const K6_R4_MEMORY_VERSION = "kodac-k6-r4-outcome-memory-v1" as const
export const K6_R4_OPERATION_VERSION = "kodac-k6-r4-outcome-memory-operation-v1" as const

export const K6_R4_PRIVACY_CLASSES = Object.freeze(["PUBLIC", "REPOSITORY_PRIVATE", "SENSITIVE"] as const)
export const K6_R4_K5_STATUSES = Object.freeze(["NOT_APPLICABLE", "VALID", "INCOMPLETE", "CONTRADICTORY", "STALE", "INVALID"] as const)
export const K6_R4_DONE_GATE_STATUSES = Object.freeze(["PROVEN_READY", "NOT_READY"] as const)
export const K6_R4_EXECUTION_RESULT_STATUSES = Object.freeze(["success", "blocked", "failure"] as const)
export const K6_R4_STEP_ROLES = Object.freeze(["PRIMARY", "FALLBACK"] as const)
export const K6_R4_TOMBSTONE_TRANSITIONS = Object.freeze(["DELETED", "EXPIRED", "SUPERSEDED"] as const)
export const K6_R4_OPERATION_KINDS = Object.freeze(["APPEND", "SUPERSEDE", "DELETE", "EXPIRE", "PURGE_TOMBSTONE"] as const)

export const K6_R4_LIMITS = Object.freeze({
  maxDepth: 32,
  maxNodes: 100_000,
  maxTotalStringChars: 4_000_000,
  maxActiveRecords: 4_096,
  maxTombstones: 8_192,
  maxExecutionOutcomesPerRecord: 4_096,
  maxOwnerScopeIdBytes: 64,
  maxIdentityBytes: 64,
} as const)

export type K6R4PrivacyClass = typeof K6_R4_PRIVACY_CLASSES[number]
export type K6R4K5Status = typeof K6_R4_K5_STATUSES[number]
export type K6R4DoneGateStatus = typeof K6_R4_DONE_GATE_STATUSES[number]
export type K6R4ExecutionResultStatus = typeof K6_R4_EXECUTION_RESULT_STATUSES[number]
export type K6R4StepRole = typeof K6_R4_STEP_ROLES[number]
export type K6R4TombstoneTransition = typeof K6_R4_TOMBSTONE_TRANSITIONS[number]
export type K6R4OperationKind = typeof K6_R4_OPERATION_KINDS[number]

export interface K6R4OutcomeMemoryScope {
  readonly repositoryIdentity: string
  readonly ownerScopeId: string
  readonly privacyClass: K6R4PrivacyClass
}

export interface K6R4OutcomeRecordSource {
  readonly routeOutcomeLinkageIdentity: string
  readonly routePlanIdentity: string
  readonly requestIdentity: string
  readonly revisionIdentity: string
  readonly taskIdentity: string
}

export interface K6R4ExecutionOutcome {
  readonly planStepIndex: number
  readonly candidateIdentity: string
  readonly role: K6R4StepRole
  readonly executionResultStatus: K6R4ExecutionResultStatus
}

export interface K6R4OutcomeProjection {
  readonly verificationPassed: boolean
  readonly k5ReconciliationIdentity: string
  readonly k5Status: K6R4K5Status
  readonly doneGateOutcomeIdentity: string
  readonly doneGateStatus: K6R4DoneGateStatus
  readonly executionOutcomes: readonly K6R4ExecutionOutcome[]
}

export interface K6R4OutcomeRecordLifecycle {
  readonly observedAtUnixMs: number
  readonly expiresAtUnixMs: number
  readonly supersedesRecordIdentity: string | null
}

export interface K6R4OutcomeRecord {
  readonly version: typeof K6_R4_OUTCOME_RECORD_VERSION
  readonly recordIdentity: string
  readonly scope: K6R4OutcomeMemoryScope
  readonly source: K6R4OutcomeRecordSource
  readonly outcome: K6R4OutcomeProjection
  readonly lifecycle: K6R4OutcomeRecordLifecycle
}

export interface K6R4OutcomeTombstone {
  readonly version: typeof K6_R4_TOMBSTONE_VERSION
  readonly tombstoneIdentity: string
  readonly scope: K6R4OutcomeMemoryScope
  readonly recordIdentity: string
  readonly taskIdentity: string
  readonly transition: K6R4TombstoneTransition
  readonly transitionAtUnixMs: number
  readonly expiresAtUnixMs: number
  readonly replacementRecordIdentity: string | null
}

export interface K6R4OutcomeMemory {
  readonly version: typeof K6_R4_MEMORY_VERSION
  readonly memoryIdentity: string
  readonly scope: K6R4OutcomeMemoryScope
  readonly records: readonly K6R4OutcomeRecord[]
  readonly tombstones: readonly K6R4OutcomeTombstone[]
}

export interface K6R4CandidateIdentityProjection {
  readonly candidateId: string
  readonly candidateKind: "MODEL_PROVIDER"
  readonly provider: string
  readonly model: string
}

export interface K6R4AppendOperation {
  readonly version: typeof K6_R4_OPERATION_VERSION
  readonly kind: "APPEND"
  readonly ownerScopeId: string
  readonly observedAtUnixMs: number
  readonly expiresAtUnixMs: number
  readonly routeRequest: unknown
  readonly routeOutcomeLinkageEnvelope: unknown
}

export interface K6R4SupersedeOperation {
  readonly version: typeof K6_R4_OPERATION_VERSION
  readonly kind: "SUPERSEDE"
  readonly targetRecordIdentity: string
  readonly ownerScopeId: string
  readonly observedAtUnixMs: number
  readonly expiresAtUnixMs: number
  readonly tombstoneExpiresAtUnixMs: number
  readonly routeRequest: unknown
  readonly routeOutcomeLinkageEnvelope: unknown
}

export interface K6R4DeleteOperation {
  readonly version: typeof K6_R4_OPERATION_VERSION
  readonly kind: "DELETE"
  readonly targetRecordIdentity: string
  readonly transitionAtUnixMs: number
  readonly tombstoneExpiresAtUnixMs: number
}

export interface K6R4ExpireOperation {
  readonly version: typeof K6_R4_OPERATION_VERSION
  readonly kind: "EXPIRE"
  readonly targetRecordIdentity: string
  readonly transitionAtUnixMs: number
  readonly tombstoneExpiresAtUnixMs: number
}

export interface K6R4PurgeTombstoneOperation {
  readonly version: typeof K6_R4_OPERATION_VERSION
  readonly kind: "PURGE_TOMBSTONE"
  readonly targetTombstoneIdentity: string
  readonly transitionAtUnixMs: number
}

export type K6R4OutcomeMemoryOperation =
  | K6R4AppendOperation
  | K6R4SupersedeOperation
  | K6R4DeleteOperation
  | K6R4ExpireOperation
  | K6R4PurgeTombstoneOperation
