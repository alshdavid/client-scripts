import * as crypto from 'node:crypto'

export function sha256Sync(input: string): string {
  return crypto.createHash('sha256').update(JSON.stringify(input)).digest('hex')
}
