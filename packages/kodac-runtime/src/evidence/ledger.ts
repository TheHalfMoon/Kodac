import type { ExecutionReceipt } from "./receipt.ts"
import { appendPrivateUtf8File, readPrivateUtf8File } from "./store.ts"

export interface ReceiptLedger {
  append(receipt: ExecutionReceipt): Promise<void> | void
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

export async function readReceiptLedger(filePath: string): Promise<ExecutionReceipt[]> {
  let raw: string
  try {
    raw = await readPrivateUtf8File(filePath)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return []
    throw error
  }

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
