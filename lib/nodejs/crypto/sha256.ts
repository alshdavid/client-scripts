import { isNode } from '../environment/index.js'

async function sha256Node(input: string): Promise<string> {
  const crypto = require('node:crypto')
  return crypto.createHash('sha256').update(JSON.stringify(input)).digest('hex')
}

async function sha256Browser(input: string): Promise<string> {
  const utf8 = new TextEncoder().encode(input)
  return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('')
    return hashHex
  })
}

export function sha256(input: string): Promise<string> {
  if (isNode()) {
    return sha256Node(input)
  }
  return sha256Browser(input)
}
