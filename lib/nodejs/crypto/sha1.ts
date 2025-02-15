import * as crypto from 'node:crypto'

export function sha1Sync(input: string): string {
  return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex')
}
