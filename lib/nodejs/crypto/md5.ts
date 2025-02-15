import * as crypto from 'node:crypto'

export function md5Sync(input: string): string {
  return crypto.createHash('md5').update(JSON.stringify(input)).digest('hex')
}
