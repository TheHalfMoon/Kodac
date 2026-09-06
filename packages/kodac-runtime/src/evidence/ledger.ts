import { createHash } from "node:crypto"
import type { ExecutionReceipt } from "./receipt.ts"
import { appendPrivateUtf8File, readPrivateUtf8File } from "./store.ts"

export interface ReceiptLedger {
  append(receipt: ExecutionReceipt): Promise<void> | void
}

export interface ReceiptLedgerReadObservation {
  receiptLedgerPathSha256: string
  receiptLedgerPresent: boolean
  receiptLedgerReadUtf8Bytes: number
  receiptLedgerReadSha256: string | null
  parsedReceiptCount: number
}

export interface ObservedReceiptLedgerRead {
  receipts: ExecutionReceipt[]
  observation: ReceiptLedgerReadObservation
}

export class InMemoryReceiptLedger implements ReceiptLedger {
  readonly receipts: ExecutionReceipt[] = []

  append(receipt: ExecutionReceipt): void {
    this.receipts.push(receipt)
  }
}

export class JsonlReceiptLedger implements ReceiptLedger {
  readonly filePath: string

  constructor(filePath: string) {
    this.filePath = filePath
  }

  async append(receipt: ExecutionReceipt): Promise<void> {
    await appendPrivateUtf8File(this.filePath, `${JSON.stringify(receipt)}\n`)
  }
}

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex")
}

function parseReceiptLedgerRaw(raw: string): ExecutionReceipt[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line) as ExecutionReceipt
      } catch (error) {
        throw new Error(`Invalid receipt JSON at line ${index + 1}`, { cause: error })
      }
    })
}

export async function readReceiptLedgerObserved(filePath: string): Promise<ObservedReceiptLedgerRead> {
  const receiptLedgerPathSha256 = sha256(filePath)
  let raw: string
  try {
    raw = await readPrivateUtf8File(filePath)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return {
        receipts: [],
        observation: {
          receiptLedgerPathSha256,
          receiptLedgerPresent: false,
          receiptLedgerReadUtf8Bytes: 0,
          receiptLedgerReadSha256: null,
          parsedReceiptCount: 0,
        },
      }
    }
    throw error
  }

  const receipts = parseReceiptLedgerRaw(raw)
  return {
    receipts,
    observation: {
      receiptLedgerPathSha256,
      receiptLedgerPresent: true,
      receiptLedgerReadUtf8Bytes: Buffer.byteLength(raw, "utf8"),
      receiptLedgerReadSha256: sha256(raw),
      parsedReceiptCount: receipts.length,
    },
  }
}

export async function readReceiptLedger(filePath: string): Promise<ExecutionReceipt[]> {
  return (await readReceiptLedgerObserved(filePath)).receipts
}
