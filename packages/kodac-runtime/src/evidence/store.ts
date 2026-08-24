import { constants } from "node:fs"
import { chmod, lstat, mkdir, open, opendir, rmdir, unlink } from "node:fs/promises"
import { dirname, join } from "node:path"

export const DEFAULT_EVIDENCE_RETENTION_DAYS = 30
export const MAX_EVIDENCE_RETENTION_DAYS = 3_650

const DAY_MS = 24 * 60 * 60 * 1_000
const MAX_ROOT_ENTRIES_PER_MAINTENANCE = 10_000
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const SESSION_ARTIFACTS = new Set([
  "active-session.json",
  "authorization.json",
  "controlled-live-solve-report.json",
  "events.jsonl",
  "proof.json",
  "qualification-report.json",
  "receipts.jsonl",
  "session.json",
  "verification-plan.json",
])

export type EvidenceAccessControl = "POSIX_OWNER_ONLY" | "WINDOWS_INHERITED_ACL_UNVERIFIED"

export interface EvidenceSessionMetadata {
  protocol: "kodac.evidence-session"
  version: 1
  sessionId: string
  createdAt: string
  expiresAt: string
  retentionDays: number
  mayContainLosslessModelRequestSnapshots: true
  accessControlAtCreation: EvidenceAccessControl
}

export interface EvidenceMaintenanceResult {
  activeExpiredSessionsRetained: number
  expiredSessionsRemoved: number
  legacySessionsHardened: number
  retainedUnsafeOrInvalidSessions: number
  rootScanLimitReached: boolean
}

export interface PreparedEvidenceSession {
  root: string
  sessionDir: string
  metadataPath: string
  metadata: EvidenceSessionMetadata
  maintenance: EvidenceMaintenanceResult
  release(): Promise<void>
}

interface EvidenceSessionLease {
  protocol: "kodac.evidence-session-active"
  version: 1
  sessionId: string
  pid: number
  createdAt: string
}

function isPosix(): boolean {
  return process.platform !== "win32"
}

function noFollowFlag(): number {
  return isPosix() ? constants.O_NOFOLLOW : 0
}

function validateSessionId(sessionId: string): void {
  if (!UUID.test(sessionId)) throw new Error("Evidence session id must be a UUID")
}

export function validateEvidenceRetentionDays(value: number): number {
  if (!Number.isInteger(value) || value < 1 || value > MAX_EVIDENCE_RETENTION_DAYS) {
    throw new Error(`Evidence retention must be an integer from 1 to ${MAX_EVIDENCE_RETENTION_DAYS} days`)
  }
  return value
}

export async function ensurePrivateDirectory(path: string): Promise<void> {
  await mkdir(path, { recursive: true, mode: 0o700 })
  const observed = await lstat(path)
  if (!observed.isDirectory() || observed.isSymbolicLink()) {
    throw new Error(`Evidence directory is not a real directory: ${path}`)
  }
  if (isPosix()) await chmod(path, 0o700)
}

async function validatePrivateFile(handle: Awaited<ReturnType<typeof open>>, path: string): Promise<void> {
  const observed = await handle.stat()
  if (!observed.isFile()) throw new Error(`Evidence artifact is not a regular file: ${path}`)
  if (observed.nlink !== 1) throw new Error(`Evidence artifact must have exactly one filesystem link: ${path}`)
  const current = await lstat(path)
  if (current.isSymbolicLink() || !current.isFile() || current.dev !== observed.dev || current.ino !== observed.ino) {
    throw new Error(`Evidence artifact path changed while it was being opened: ${path}`)
  }
  if (isPosix()) await handle.chmod(0o600)
}

async function rejectExistingLinkedArtifact(path: string): Promise<void> {
  try {
    const observed = await lstat(path)
    if (observed.isSymbolicLink()) throw new Error(`Evidence artifact must not be a symbolic link: ${path}`)
    if (observed.isFile() && observed.nlink !== 1) {
      throw new Error(`Evidence artifact must have exactly one filesystem link: ${path}`)
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error
  }
}

export async function appendPrivateUtf8File(path: string, value: string): Promise<void> {
  await ensurePrivateDirectory(dirname(path))
  await rejectExistingLinkedArtifact(path)
  const handle = await open(
    path,
    constants.O_WRONLY | constants.O_APPEND | constants.O_CREAT | noFollowFlag(),
    0o600,
  )
  try {
    await validatePrivateFile(handle, path)
    await handle.appendFile(value, "utf8")
  } finally {
    await handle.close()
  }
}

export async function writePrivateUtf8File(
  path: string,
  value: string,
  options: { exclusive?: boolean } = {},
): Promise<void> {
  await ensurePrivateDirectory(dirname(path))
  await rejectExistingLinkedArtifact(path)
  const handle = await open(
    path,
    constants.O_WRONLY | constants.O_CREAT | (options.exclusive ? constants.O_EXCL : 0) | noFollowFlag(),
    0o600,
  )
  try {
    await validatePrivateFile(handle, path)
    if (!options.exclusive) await handle.truncate(0)
    await handle.writeFile(value, "utf8")
  } finally {
    await handle.close()
  }
}

export async function readPrivateUtf8File(path: string): Promise<string> {
  await rejectExistingLinkedArtifact(path)
  const handle = await open(path, constants.O_RDONLY | noFollowFlag())
  try {
    await validatePrivateFile(handle, path)
    return await handle.readFile("utf8")
  } finally {
    await handle.close()
  }
}

function parseMetadata(raw: string, directorySessionId: string): EvidenceSessionMetadata | undefined {
  let value: unknown
  try {
    value = JSON.parse(raw) as unknown
  } catch {
    return undefined
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined
  const metadata = value as Record<string, unknown>
  const expectedKeys = [
    "accessControlAtCreation",
    "createdAt",
    "expiresAt",
    "mayContainLosslessModelRequestSnapshots",
    "protocol",
    "retentionDays",
    "sessionId",
    "version",
  ]
  if (Object.keys(metadata).sort().join("\n") !== expectedKeys.join("\n")) return undefined
  if (metadata.protocol !== "kodac.evidence-session" || metadata.version !== 1) return undefined
  if (metadata.sessionId !== directorySessionId || metadata.mayContainLosslessModelRequestSnapshots !== true) return undefined
  if (metadata.accessControlAtCreation !== "POSIX_OWNER_ONLY" && metadata.accessControlAtCreation !== "WINDOWS_INHERITED_ACL_UNVERIFIED") return undefined
  if (typeof metadata.retentionDays !== "number") return undefined
  try {
    validateEvidenceRetentionDays(metadata.retentionDays)
  } catch {
    return undefined
  }
  if (typeof metadata.createdAt !== "string" || typeof metadata.expiresAt !== "string") return undefined
  const createdMs = Date.parse(metadata.createdAt)
  const expiresMs = Date.parse(metadata.expiresAt)
  if (!Number.isFinite(createdMs) || !Number.isFinite(expiresMs)) return undefined
  if (new Date(createdMs).toISOString() !== metadata.createdAt || new Date(expiresMs).toISOString() !== metadata.expiresAt) return undefined
  if (expiresMs !== createdMs + metadata.retentionDays * DAY_MS) return undefined
  return metadata as unknown as EvidenceSessionMetadata
}

function parseLease(raw: string, directorySessionId: string): EvidenceSessionLease | undefined {
  let value: unknown
  try {
    value = JSON.parse(raw) as unknown
  } catch {
    return undefined
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined
  const lease = value as Record<string, unknown>
  const expectedKeys = ["createdAt", "pid", "protocol", "sessionId", "version"]
  if (Object.keys(lease).sort().join("\n") !== expectedKeys.join("\n")) return undefined
  if (lease.protocol !== "kodac.evidence-session-active" || lease.version !== 1) return undefined
  if (lease.sessionId !== directorySessionId || !Number.isSafeInteger(lease.pid) || (lease.pid as number) <= 0) return undefined
  if (typeof lease.createdAt !== "string") return undefined
  const createdMs = Date.parse(lease.createdAt)
  if (!Number.isFinite(createdMs) || new Date(createdMs).toISOString() !== lease.createdAt) return undefined
  return lease as unknown as EvidenceSessionLease
}

async function activeLeaseState(path: string, sessionId: string): Promise<"absent" | "active" | "stale" | "unsafe"> {
  let raw: string
  try {
    raw = await readPrivateUtf8File(path)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return "absent"
    return "unsafe"
  }
  const lease = parseLease(raw, sessionId)
  if (!lease) return "unsafe"
  try {
    process.kill(lease.pid, 0)
    return "active"
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    if (code === "ESRCH") return "stale"
    return code === "EPERM" ? "active" : "unsafe"
  }
}

async function hardenKnownArtifacts(sessionDir: string): Promise<void> {
  if (!isPosix()) return
  for (const name of SESSION_ARTIFACTS) {
    const path = join(sessionDir, name)
    try {
      const observed = await lstat(path)
      if (observed.isFile() && !observed.isSymbolicLink() && observed.nlink === 1) await chmod(path, 0o600)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error
    }
  }
}

async function boundedSessionEntries(sessionDir: string): Promise<string[] | undefined> {
  const entries: string[] = []
  const directory = await opendir(sessionDir)
  for await (const entry of directory) {
    entries.push(entry.name)
    if (entries.length > SESSION_ARTIFACTS.size) return undefined
  }
  return entries
}

async function removeExpiredSession(sessionDir: string, entries: readonly string[]): Promise<boolean> {
  if (entries.some((name) => !SESSION_ARTIFACTS.has(name))) return false
  for (const name of entries) {
    const observed = await lstat(join(sessionDir, name))
    if (!observed.isFile() || observed.isSymbolicLink() || observed.nlink !== 1) return false
  }
  for (const name of entries) await unlink(join(sessionDir, name))
  await rmdir(sessionDir)
  return true
}

export async function maintainEvidenceRoot(root: string, now = new Date()): Promise<EvidenceMaintenanceResult> {
  await ensurePrivateDirectory(root)
  const result: EvidenceMaintenanceResult = {
    activeExpiredSessionsRetained: 0,
    expiredSessionsRemoved: 0,
    legacySessionsHardened: 0,
    retainedUnsafeOrInvalidSessions: 0,
    rootScanLimitReached: false,
  }
  const directory = await opendir(root)
  let rootEntryCount = 0
  for await (const entry of directory) {
    rootEntryCount += 1
    if (rootEntryCount > MAX_ROOT_ENTRIES_PER_MAINTENANCE) {
      result.rootScanLimitReached = true
      break
    }
    if (!UUID.test(entry.name) || !entry.isDirectory() || entry.isSymbolicLink()) continue
    const sessionDir = join(root, entry.name)
    await ensurePrivateDirectory(sessionDir)
    await hardenKnownArtifacts(sessionDir)
    const metadataPath = join(sessionDir, "session.json")
    try {
      await lstat(metadataPath)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error
      result.legacySessionsHardened += 1
      continue
    }
    const entries = await boundedSessionEntries(sessionDir)
    if (!entries) {
      result.retainedUnsafeOrInvalidSessions += 1
      continue
    }
    let metadata: EvidenceSessionMetadata | undefined
    try {
      metadata = parseMetadata(await readPrivateUtf8File(metadataPath), entry.name)
    } catch {
      metadata = undefined
    }
    if (!metadata) {
      result.retainedUnsafeOrInvalidSessions += 1
      continue
    }
    if (Date.parse(metadata.expiresAt) > now.getTime()) continue
    const leasePath = join(sessionDir, "active-session.json")
    const leaseState = await activeLeaseState(leasePath, entry.name)
    if (leaseState === "active") {
      result.activeExpiredSessionsRetained += 1
      continue
    }
    if (leaseState === "unsafe") {
      result.retainedUnsafeOrInvalidSessions += 1
      continue
    }
    if (leaseState === "stale") {
      try {
        await unlink(leasePath)
        const leaseIndex = entries.indexOf("active-session.json")
        if (leaseIndex >= 0) entries.splice(leaseIndex, 1)
      } catch {
        result.retainedUnsafeOrInvalidSessions += 1
        continue
      }
    }
    try {
      if (await removeExpiredSession(sessionDir, entries)) result.expiredSessionsRemoved += 1
      else result.retainedUnsafeOrInvalidSessions += 1
    } catch {
      result.retainedUnsafeOrInvalidSessions += 1
    }
  }
  return result
}

export async function prepareEvidenceSession(input: {
  root: string
  sessionId: string
  retentionDays?: number
  now?: Date
}): Promise<PreparedEvidenceSession> {
  validateSessionId(input.sessionId)
  const retentionDays = validateEvidenceRetentionDays(input.retentionDays ?? DEFAULT_EVIDENCE_RETENTION_DAYS)
  const now = input.now ?? new Date()
  if (!Number.isFinite(now.getTime())) throw new Error("Evidence session time must be valid")
  const maintenance = await maintainEvidenceRoot(input.root, now)
  const sessionDir = join(input.root, input.sessionId)
  await mkdir(sessionDir, { mode: 0o700 })
  await ensurePrivateDirectory(sessionDir)
  const metadata: EvidenceSessionMetadata = {
    protocol: "kodac.evidence-session",
    version: 1,
    sessionId: input.sessionId,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + retentionDays * DAY_MS).toISOString(),
    retentionDays,
    mayContainLosslessModelRequestSnapshots: true,
    accessControlAtCreation: isPosix() ? "POSIX_OWNER_ONLY" : "WINDOWS_INHERITED_ACL_UNVERIFIED",
  }
  const metadataPath = join(sessionDir, "session.json")
  await writePrivateUtf8File(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`, { exclusive: true })
  const leasePath = join(sessionDir, "active-session.json")
  const lease: EvidenceSessionLease = {
    protocol: "kodac.evidence-session-active",
    version: 1,
    sessionId: input.sessionId,
    pid: process.pid,
    createdAt: now.toISOString(),
  }
  await writePrivateUtf8File(leasePath, `${JSON.stringify(lease, null, 2)}\n`, { exclusive: true })
  let released = false
  return {
    root: input.root,
    sessionDir,
    metadataPath,
    metadata,
    maintenance,
    async release(): Promise<void> {
      if (released) return
      await rejectExistingLinkedArtifact(leasePath)
      try {
        await unlink(leasePath)
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error
      }
      released = true
    },
  }
}
