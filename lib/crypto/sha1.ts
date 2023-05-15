import { isNode } from '../environment'

async function sha1Node(input: string): Promise<string> {
  const crypto = require('node:crypto')
  return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex')
}

async function sha1Browser(input: string): Promise<string> {
  const utf8 = new TextEncoder().encode(input)
  return crypto.subtle.digest('SHA-1', utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('')
    return hashHex
  })
}

export function sha1(input: string): Promise<string> {
  if (isNode()) {
    return sha1Node(input)
  }
  return sha1Browser(input)
}
