import { createHash } from "node:crypto"

import { canonicalize, sha256Canonical } from "../p2-r1/contract.ts"

type UnknownRecord = Record<string, unknown>

export const P2_R6_PROOF_SCHEMA = "p2-r6-git-ancestry-proof/v1"
export const P2_R6_ADMISSION_DECLARATION_SCHEMA = "p2-r6-admission-declaration/v1"
export const P2_R6_ADMISSION_RECORD_SCHEMA = "p2-r6-admission-record/v1"
export const P2_R6_ADMISSION_VERSION = "p2-r6-repository-history-corpus-admission/v1"
export const P2_R6_CHRONOLOGY_SCHEME = "git-commit-ancestry-object-chain/v1"
export const P2_R6_SOURCE_REPOSITORY = "TheHalfMoon/Kodac"
export const P2_R6_DEVELOPMENT_COMMIT = "ad1a66483bd972b1a82a4d32dd833237c3c099e8"
export const P2_R6_REALITY_CHECK_COMMIT = "4598031bef5bfc05219f528f81ed6c653024b476"
export const P2_R6_CANONICAL_ADMISSION_BINDING_IDENTITY =
  "sha256:fdf839d5923765b0149edf33ad679e63039a55e04d5968674a3042985d4a268d"

const MAX_STABLE_ID_BYTES = 512
const STABLE_ID = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/
const SHA1 = /^[0-9a-f]{40}$/
const SHA256_IDENTITY = /^sha256:[0-9a-f]{64}$/
const STANDARD_PADDED_BASE64 =
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

const PROOF_KEYS = [
  "schema_version",
  "canonical_admission_binding_identity",
  "development_anchor_commit",
  "reality_check_anchor_commit",
  "commit_chain",
  "proof_identity",
] as const

const PROOF_PREIMAGE_KEYS = [
  "schema_version",
  "canonical_admission_binding_identity",
  "development_anchor_commit",
  "reality_check_anchor_commit",
  "commit_chain",
] as const

const COMMIT_ENTRY_KEYS = [
  "commit_sha",
  "raw_commit_content_base64",
  "parent_commit_shas",
] as const

const DECLARATION_KEYS = [
  "schema_version",
  "benchmark_id",
  "benchmark_protocol_version",
  "development",
  "reality_check",
] as const

const DECLARATION_ENTRY_KEYS = [
  "corpus_id",
  "case_id",
  "task_family",
  "contamination_status",
  "overlap_status",
] as const

const ADMISSION_RECORD_KEYS = [
  "schema_version",
  "benchmark_id",
  "benchmark_protocol_version",
  "admission_version",
  "canonical_admission_binding_identity",
  "corpus_id",
  "corpus_role",
  "corpus_digest",
  "source_repository",
  "source_repository_commit",
  "source_tree_identity",
  "source_raw_content_sha256",
  "case_id",
  "task_family",
  "case_evidence_identity",
  "chronology_scheme",
  "development_freeze_anchor",
  "reality_check_anchor",
  "chronology_status",
  "chronology_proof_identity",
  "contamination_status",
  "overlap_status",
  "admission_identity",
] as const

export type P2R6ContaminationStatus = "none-known" | "known" | "unknown"
export type P2R6OverlapStatus = "none-known" | "known" | "unknown"
export type P2R6CorpusRole = "development" | "reality-check"
export type P2R6ChronologyStatus = "later-in-time" | "chronology-unproven"

export interface P2R6AdmissionBindingEntry {
  commit_sha: string
  tree_sha: string
  raw_commit_content_sha256: string
}

export interface P2R6CanonicalAdmissionBinding {
  schema_version: "p2-r6-canonical-admission-binding/v1"
  source_repository: typeof P2_R6_SOURCE_REPOSITORY
  repository_object_format: "sha1"
  admitted_git_commits: readonly [
    P2R6AdmissionBindingEntry,
    P2R6AdmissionBindingEntry,
  ]
}

export const P2_R6_CANONICAL_ADMISSION_BINDING: P2R6CanonicalAdmissionBinding =
  deepFreeze<P2R6CanonicalAdmissionBinding>({
    schema_version: "p2-r6-canonical-admission-binding/v1",
    source_repository: P2_R6_SOURCE_REPOSITORY,
    repository_object_format: "sha1",
    admitted_git_commits: [
      {
        commit_sha: P2_R6_DEVELOPMENT_COMMIT,
        tree_sha: "baa62bdefb1ae3c84ad7d27ebeae01b90fbf7cdb",
        raw_commit_content_sha256:
          "sha256:f8420121f479d643dbd25eb3483ca2ec6c38d1de73a186e4640e7e3ebdf2d5d5",
      },
      {
        commit_sha: P2_R6_REALITY_CHECK_COMMIT,
        tree_sha: "baa4625c20d77fae9f4dcbfb421644d856b019c3",
        raw_commit_content_sha256:
          "sha256:0b1aa165dce9304564d0aa34040362d205688ccc0034a80ad40f36c8f55a8d64",
      },
    ],
  })

export interface P2R6CommitProofEntry {
  commit_sha: string
  raw_commit_content_base64: string
  parent_commit_shas: readonly string[]
}

export interface P2R6ProofIdentityPreimage {
  schema_version: typeof P2_R6_PROOF_SCHEMA
  canonical_admission_binding_identity: typeof P2_R6_CANONICAL_ADMISSION_BINDING_IDENTITY
  development_anchor_commit: typeof P2_R6_DEVELOPMENT_COMMIT
  reality_check_anchor_commit: typeof P2_R6_REALITY_CHECK_COMMIT
  commit_chain: readonly [P2R6CommitProofEntry, P2R6CommitProofEntry]
}

export interface P2R6GitAncestryProof extends P2R6ProofIdentityPreimage {
  proof_identity: string
}

export interface P2R6ValidatedProof {
  proof: P2R6GitAncestryProof
  chronology_status: "later-in-time"
}

export interface P2R6AdmissionDeclarationEntry {
  corpus_id: string
  case_id: string
  task_family: string
  contamination_status: P2R6ContaminationStatus
  overlap_status: P2R6OverlapStatus
}

export interface P2R6AdmissionDeclaration {
  schema_version: typeof P2_R6_ADMISSION_DECLARATION_SCHEMA
  benchmark_id: string
  benchmark_protocol_version: string
  development: P2R6AdmissionDeclarationEntry
  reality_check: P2R6AdmissionDeclarationEntry
}

export interface P2R6AdmissionRecord {
  schema_version: typeof P2_R6_ADMISSION_RECORD_SCHEMA
  benchmark_id: string
  benchmark_protocol_version: string
  admission_version: typeof P2_R6_ADMISSION_VERSION
  canonical_admission_binding_identity: typeof P2_R6_CANONICAL_ADMISSION_BINDING_IDENTITY
  corpus_id: string
  corpus_role: P2R6CorpusRole
  corpus_digest: string
  source_repository: typeof P2_R6_SOURCE_REPOSITORY
  source_repository_commit: string
  source_tree_identity: string
  source_raw_content_sha256: string
  case_id: string
  task_family: string
  case_evidence_identity: string
  chronology_scheme: typeof P2_R6_CHRONOLOGY_SCHEME
  development_freeze_anchor: typeof P2_R6_DEVELOPMENT_COMMIT
  reality_check_anchor: typeof P2_R6_REALITY_CHECK_COMMIT
  chronology_status: "later-in-time"
  chronology_proof_identity: string
  contamination_status: P2R6ContaminationStatus
  overlap_status: P2R6OverlapStatus
  admission_identity: string
}

interface ValidatedCommit {
  entry: P2R6CommitProofEntry
  raw_content: Buffer
  parsed_tree: string
  parsed_parents: readonly string[]
  binding: P2R6AdmissionBindingEntry
}

interface InternalValidatedProof {
  proof: P2R6GitAncestryProof
  commits: readonly [ValidatedCommit, ValidatedCommit]
}

function fail(message: string): never {
  throw new Error(`P2-R6 contract violation: ${message}`)
}

function compareStrings(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0
}

function snapshot<T>(value: unknown, label: string): T {
  try {
    return JSON.parse(canonicalize(value)) as T
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    fail(`${label} is not canonical JSON: ${detail}`)
  }
}

function record(value: unknown, label: string): UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    fail(`${label} must be an object`)
  }
  return value as UnknownRecord
}

function exactKeys(value: UnknownRecord, expected: readonly string[], label: string): void {
  const actual = Object.keys(value).sort(compareStrings)
  const required = [...expected].sort(compareStrings)
  if (actual.length !== required.length || actual.some((key, index) => key !== required[index])) {
    fail(`${label} keys are not canonical`)
  }
}

function sha1(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA1.test(value)) {
    fail(`${label} must be a lowercase Git SHA-1`)
  }
  return value
}

function sha256Identity(value: unknown, label: string): string {
  if (typeof value !== "string" || !SHA256_IDENTITY.test(value)) {
    fail(`${label} must be a lowercase SHA-256 identity`)
  }
  return value
}

function stableId(value: unknown, label: string): string {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.trim() !== value ||
    value.includes("\0") ||
    Buffer.byteLength(value, "utf8") > MAX_STABLE_ID_BYTES ||
    !STABLE_ID.test(value)
  ) {
    fail(`${label} must be a bounded canonical stable identifier`)
  }
  return value
}

function contaminationStatus(value: unknown, label: string): P2R6ContaminationStatus {
  if (value !== "none-known" && value !== "known" && value !== "unknown") {
    fail(`${label} is unsupported`)
  }
  return value
}

function overlapStatus(value: unknown, label: string): P2R6OverlapStatus {
  if (value !== "none-known" && value !== "known" && value !== "unknown") {
    fail(`${label} is unsupported`)
  }
  return value
}

function deepFreeze<T>(value: T): T {
  if (typeof value !== "object" || value === null || Object.isFrozen(value)) {
    return value
  }
  if (Array.isArray(value)) {
    for (const entry of value) {
      deepFreeze(entry)
    }
  } else {
    for (const entry of Object.values(value as UnknownRecord)) {
      deepFreeze(entry)
    }
  }
  return Object.freeze(value)
}

function rawSha256(bytes: Buffer): string {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`
}

function gitCommitSha1(bytes: Buffer): string {
  const prefix = Buffer.from(`commit ${bytes.length}\0`, "ascii")
  return createHash("sha1").update(prefix).update(bytes).digest("hex")
}

function canonicalBase64(value: unknown, label: string): { encoded: string; decoded: Buffer } {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.length % 4 !== 0 ||
    !STANDARD_PADDED_BASE64.test(value)
  ) {
    fail(`${label} must be exact standard padded RFC 4648 base64`)
  }
  const decoded = Buffer.from(value, "base64")
  if (decoded.toString("base64") !== value) {
    fail(`${label} must round-trip through standard padded RFC 4648 base64 exactly`)
  }
  return { encoded: value, decoded }
}

function parentList(value: unknown, label: string): readonly string[] {
  if (!Array.isArray(value)) {
    fail(`${label} must be an array`)
  }
  return value.map((entry, index) => sha1(entry, `${label}[${index}]`))
}

function normalizeCommitEntry(value: unknown, label: string): {
  entry: P2R6CommitProofEntry
  decoded: Buffer
} {
  const current = record(value, label)
  exactKeys(current, COMMIT_ENTRY_KEYS, label)
  const commitSha = sha1(current.commit_sha, `${label}.commit_sha`)
  const base64 = canonicalBase64(
    current.raw_commit_content_base64,
    `${label}.raw_commit_content_base64`,
  )
  const parents = parentList(current.parent_commit_shas, `${label}.parent_commit_shas`)
  return {
    entry: {
      commit_sha: commitSha,
      raw_commit_content_base64: base64.encoded,
      parent_commit_shas: [...parents],
    },
    decoded: base64.decoded,
  }
}

function normalizeProofPreimage(value: unknown): {
  preimage: P2R6ProofIdentityPreimage
  decoded: readonly [Buffer, Buffer]
} {
  const current = record(value, "proof identity preimage")
  exactKeys(current, PROOF_PREIMAGE_KEYS, "proof identity preimage")
  if (current.schema_version !== P2_R6_PROOF_SCHEMA) {
    fail("unsupported proof schema")
  }
  if (
    current.canonical_admission_binding_identity !==
    P2_R6_CANONICAL_ADMISSION_BINDING_IDENTITY
  ) {
    fail("proof canonical_admission_binding_identity does not match the canonical binding")
  }
  if (current.development_anchor_commit !== P2_R6_DEVELOPMENT_COMMIT) {
    fail("proof development_anchor_commit is not canonical")
  }
  if (current.reality_check_anchor_commit !== P2_R6_REALITY_CHECK_COMMIT) {
    fail("proof reality_check_anchor_commit is not canonical")
  }
  if (!Array.isArray(current.commit_chain) || current.commit_chain.length !== 2) {
    fail("proof commit_chain must contain exactly two entries")
  }
  const development = normalizeCommitEntry(current.commit_chain[0], "proof commit_chain[0]")
  const reality = normalizeCommitEntry(current.commit_chain[1], "proof commit_chain[1]")
  return {
    preimage: {
      schema_version: P2_R6_PROOF_SCHEMA,
      canonical_admission_binding_identity: P2_R6_CANONICAL_ADMISSION_BINDING_IDENTITY,
      development_anchor_commit: P2_R6_DEVELOPMENT_COMMIT,
      reality_check_anchor_commit: P2_R6_REALITY_CHECK_COMMIT,
      commit_chain: [development.entry, reality.entry],
    },
    decoded: [development.decoded, reality.decoded],
  }
}

export function deriveP2R6ProofIdentity(value: unknown): string {
  const current = snapshot<unknown>(value, "proof identity preimage")
  const { preimage } = normalizeProofPreimage(current)
  return sha256Canonical(preimage)
}

function parseCommitHeaders(raw: Buffer, label: string): {
  tree: string
  parents: readonly string[]
} {
  const boundary = raw.indexOf(Buffer.from("\n\n", "ascii"))
  if (boundary <= 0) {
    fail(`${label} must contain an unambiguous Git header/body boundary`)
  }
  const header = raw.subarray(0, boundary).toString("utf8")
  if (header.includes("\r") || header.includes("\0")) {
    fail(`${label} contains a non-canonical Git header`)
  }
  const lines = header.split("\n")
  let tree: string | null = null
  const parents: string[] = []
  let previousKey: string | null = null

  for (const [index, line] of lines.entries()) {
    if (line.length === 0) {
      fail(`${label} header line ${index} is empty`)
    }
    if (line.startsWith(" ")) {
      if (previousKey === null || previousKey === "tree" || previousKey === "parent") {
        fail(`${label} has an invalid continuation line`)
      }
      continue
    }
    const match = /^([a-z][a-z0-9-]*) (.+)$/.exec(line)
    if (match === null) {
      fail(`${label} header line ${index} is malformed`)
    }
    const [, key, payload] = match
    previousKey = key
    if (key === "tree") {
      if (!SHA1.test(payload) || tree !== null) {
        fail(`${label} must contain exactly one canonical tree header`)
      }
      tree = payload
    } else if (key === "parent") {
      if (!SHA1.test(payload)) {
        fail(`${label} contains a malformed parent header`)
      }
      parents.push(payload)
    }
  }
  if (tree === null) {
    fail(`${label} must contain exactly one canonical tree header`)
  }
  return { tree, parents }
}

function sameStringArray(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((entry, index) => entry === right[index])
}

function assertCanonicalBinding(): void {
  const computed = sha256Canonical(P2_R6_CANONICAL_ADMISSION_BINDING)
  if (computed !== P2_R6_CANONICAL_ADMISSION_BINDING_IDENTITY) {
    fail("embedded canonical admission binding identity mismatch")
  }
}

function validateCommit(
  entry: P2R6CommitProofEntry,
  raw: Buffer,
  index: 0 | 1,
): ValidatedCommit {
  const label = `proof commit_chain[${index}]`
  const parsed = parseCommitHeaders(raw, label)
  const rawDigest = rawSha256(raw)
  const framedSha = gitCommitSha1(raw)

  if (framedSha !== entry.commit_sha) {
    fail(`${label}.commit_sha does not match the framed Git commit object`)
  }
  if (!sameStringArray(parsed.parents, entry.parent_commit_shas)) {
    fail(`${label}.parent_commit_shas does not match parsed Git parent headers`)
  }

  const matches = P2_R6_CANONICAL_ADMISSION_BINDING.admitted_git_commits.filter(
    (candidate) =>
      candidate.commit_sha === entry.commit_sha &&
      candidate.tree_sha === parsed.tree &&
      candidate.raw_commit_content_sha256 === rawDigest,
  )
  if (matches.length !== 1) {
    fail(`${label} does not match exactly one canonically admitted Git object`)
  }
  const binding = matches[0]!
  return {
    entry,
    raw_content: raw,
    parsed_tree: parsed.tree,
    parsed_parents: [...parsed.parents],
    binding,
  }
}

function validateProofInternal(value: unknown): InternalValidatedProof {
  assertCanonicalBinding()
  const current = snapshot<unknown>(value, "Git ancestry proof")
  const root = record(current, "Git ancestry proof")
  exactKeys(root, PROOF_KEYS, "Git ancestry proof")
  sha256Identity(root.proof_identity, "Git ancestry proof.proof_identity")

  const preimageValue = Object.fromEntries(
    PROOF_PREIMAGE_KEYS.map((key) => [key, root[key]]),
  )
  const { preimage, decoded } = normalizeProofPreimage(preimageValue)
  const proofIdentity = sha256Canonical(preimage)
  if (proofIdentity !== root.proof_identity) {
    fail("Git ancestry proof.proof_identity does not match the recomputed closed preimage")
  }

  if (preimage.commit_chain[0].commit_sha !== P2_R6_DEVELOPMENT_COMMIT) {
    fail("proof development commit is not the canonical development anchor")
  }
  if (preimage.commit_chain[1].commit_sha !== P2_R6_REALITY_CHECK_COMMIT) {
    fail("proof reality-check commit is not the canonical reality-check anchor")
  }
  if (new Set(preimage.commit_chain.map((entry) => entry.commit_sha)).size !== 2) {
    fail("proof commit identities must be distinct")
  }

  const development = validateCommit(preimage.commit_chain[0], decoded[0], 0)
  const reality = validateCommit(preimage.commit_chain[1], decoded[1], 1)
  if (!reality.parsed_parents.includes(development.entry.commit_sha)) {
    fail("proof does not establish the exact development-to-reality direct ancestry")
  }

  return {
    proof: {
      ...preimage,
      proof_identity: proofIdentity,
    },
    commits: [development, reality],
  }
}

export function validateP2R6GitAncestryProof(value: unknown): P2R6ValidatedProof {
  const validated = validateProofInternal(value)
  return deepFreeze({
    proof: snapshot<P2R6GitAncestryProof>(validated.proof, "validated Git ancestry proof"),
    chronology_status: "later-in-time" as const,
  })
}

function normalizeDeclarationEntry(
  value: unknown,
  label: string,
): P2R6AdmissionDeclarationEntry {
  const current = record(value, label)
  exactKeys(current, DECLARATION_ENTRY_KEYS, label)
  return {
    corpus_id: stableId(current.corpus_id, `${label}.corpus_id`),
    case_id: stableId(current.case_id, `${label}.case_id`),
    task_family: stableId(current.task_family, `${label}.task_family`),
    contamination_status: contaminationStatus(
      current.contamination_status,
      `${label}.contamination_status`,
    ),
    overlap_status: overlapStatus(current.overlap_status, `${label}.overlap_status`),
  }
}

function normalizeDeclaration(value: unknown): P2R6AdmissionDeclaration {
  const current = snapshot<unknown>(value, "admission declaration")
  const root = record(current, "admission declaration")
  exactKeys(root, DECLARATION_KEYS, "admission declaration")
  if (root.schema_version !== P2_R6_ADMISSION_DECLARATION_SCHEMA) {
    fail("unsupported admission declaration schema")
  }
  const development = normalizeDeclarationEntry(root.development, "admission development")
  const reality = normalizeDeclarationEntry(root.reality_check, "admission reality_check")
  if (development.corpus_id === reality.corpus_id) {
    fail("development and reality-check corpus identities must not alias")
  }
  if (development.case_id === reality.case_id) {
    fail("development and reality-check case identities must not alias")
  }
  return {
    schema_version: P2_R6_ADMISSION_DECLARATION_SCHEMA,
    benchmark_id: stableId(root.benchmark_id, "admission benchmark_id"),
    benchmark_protocol_version: stableId(
      root.benchmark_protocol_version,
      "admission benchmark_protocol_version",
    ),
    development,
    reality_check: reality,
  }
}

function caseEvidencePreimage(
  recordValue: Omit<P2R6AdmissionRecord, "admission_identity">,
): UnknownRecord {
  const { case_evidence_identity: _ignored, ...preimage } = recordValue
  return preimage
}

function admissionIdentityPreimage(
  recordValue: Omit<P2R6AdmissionRecord, "admission_identity">,
): UnknownRecord {
  return { ...recordValue }
}

function buildAdmissionRecord(
  role: P2R6CorpusRole,
  declaration: P2R6AdmissionDeclaration,
  proof: InternalValidatedProof,
): P2R6AdmissionRecord {
  const index = role === "development" ? 0 : 1
  const declared = role === "development" ? declaration.development : declaration.reality_check
  const validatedCommit = proof.commits[index]
  const withoutCaseAndAdmission = {
    schema_version: P2_R6_ADMISSION_RECORD_SCHEMA,
    benchmark_id: declaration.benchmark_id,
    benchmark_protocol_version: declaration.benchmark_protocol_version,
    admission_version: P2_R6_ADMISSION_VERSION,
    canonical_admission_binding_identity: P2_R6_CANONICAL_ADMISSION_BINDING_IDENTITY,
    corpus_id: declared.corpus_id,
    corpus_role: role,
    corpus_digest: rawSha256(validatedCommit.raw_content),
    source_repository: P2_R6_SOURCE_REPOSITORY,
    source_repository_commit: validatedCommit.binding.commit_sha,
    source_tree_identity: validatedCommit.binding.tree_sha,
    source_raw_content_sha256: validatedCommit.binding.raw_commit_content_sha256,
    case_id: declared.case_id,
    task_family: declared.task_family,
    chronology_scheme: P2_R6_CHRONOLOGY_SCHEME,
    development_freeze_anchor: P2_R6_DEVELOPMENT_COMMIT,
    reality_check_anchor: P2_R6_REALITY_CHECK_COMMIT,
    chronology_status: "later-in-time" as const,
    chronology_proof_identity: proof.proof.proof_identity,
    contamination_status: declared.contamination_status,
    overlap_status: declared.overlap_status,
  }

  if (withoutCaseAndAdmission.corpus_digest !== withoutCaseAndAdmission.source_raw_content_sha256) {
    fail(`${role} corpus_digest does not equal the validated raw Git content digest`)
  }

  const caseEvidenceIdentity = sha256Canonical(withoutCaseAndAdmission)
  const withoutAdmission: Omit<P2R6AdmissionRecord, "admission_identity"> = {
    ...withoutCaseAndAdmission,
    case_evidence_identity: caseEvidenceIdentity,
  }
  const admissionIdentity = sha256Canonical(admissionIdentityPreimage(withoutAdmission))
  return {
    ...withoutAdmission,
    admission_identity: admissionIdentity,
  }
}

export function deriveP2R6AdmissionRecords(
  proofValue: unknown,
  declarationValue: unknown,
): readonly [P2R6AdmissionRecord, P2R6AdmissionRecord] {
  const proof = validateProofInternal(proofValue)
  const declaration = normalizeDeclaration(declarationValue)
  const records: [P2R6AdmissionRecord, P2R6AdmissionRecord] = [
    buildAdmissionRecord("development", declaration, proof),
    buildAdmissionRecord("reality-check", declaration, proof),
  ]
  return deepFreeze(snapshot(records, "derived admission records"))
}

function normalizeSerializedRecord(value: unknown, label: string): P2R6AdmissionRecord {
  const current = record(value, label)
  exactKeys(current, ADMISSION_RECORD_KEYS, label)
  sha256Identity(current.case_evidence_identity, `${label}.case_evidence_identity`)
  sha256Identity(current.admission_identity, `${label}.admission_identity`)
  return current as unknown as P2R6AdmissionRecord
}

export function validateP2R6AdmissionRecords(
  value: unknown,
  proofValue: unknown,
  declarationValue: unknown,
): readonly [P2R6AdmissionRecord, P2R6AdmissionRecord] {
  const serialized = snapshot<unknown>(value, "serialized admission records")
  if (!Array.isArray(serialized) || serialized.length !== 2) {
    fail("serialized admission records must contain exactly two records")
  }
  const normalized: [P2R6AdmissionRecord, P2R6AdmissionRecord] = [
    normalizeSerializedRecord(serialized[0], "serialized admission records[0]"),
    normalizeSerializedRecord(serialized[1], "serialized admission records[1]"),
  ]
  const expected = deriveP2R6AdmissionRecords(proofValue, declarationValue)

  for (const [index, recordValue] of normalized.entries()) {
    const label = `serialized admission records[${index}]`
    const expectedRole = index === 0 ? "development" : "reality-check"
    if (recordValue.corpus_role !== expectedRole) {
      fail(`${label}.corpus_role is not in the canonical role order`)
    }
    const { admission_identity: serializedAdmissionIdentity, ...withoutAdmission } = recordValue
    const recomputedCase = sha256Canonical(caseEvidencePreimage(withoutAdmission))
    if (recomputedCase !== recordValue.case_evidence_identity) {
      fail(`${label}.case_evidence_identity does not match its closed preimage`)
    }
    const recomputedAdmission = sha256Canonical(admissionIdentityPreimage(withoutAdmission))
    if (recomputedAdmission !== serializedAdmissionIdentity) {
      fail(`${label}.admission_identity does not match the complete closed record preimage`)
    }
    if (canonicalize(recordValue) !== canonicalize(expected[index])) {
      fail(`${label} does not match the proof-bound derived admission record`)
    }
  }

  return deepFreeze(snapshot(normalized, "validated serialized admission records"))
}
