import { sha256 } from '../crypto/index.js'
import { ArrayBufferToBase64, base64ToArrayBuffer } from '../bytes/index.js'
import * as localStorage from '../local-storage/index.js'
import { RequestOptions } from './request-options.js'

export const DATABASE_KEY = 'request'

export type CacheEntry = {
  status: number
  statusText: string
  headers: Record<string, string>
}

export async function fetchCached(input: RequestInfo, init: RequestOptions) {
  if (init.method && init.method !== 'GET') {
    return window.fetch(input, init)
  }

  let hashedKey = ''
  if (typeof input === 'string') {
    hashedKey = await sha256(input)
  } else {
    hashedKey = await sha256(input.url)
  }

  const CacheKeys = {
    Meta: `${hashedKey}_meta`,
    Body: `${hashedKey}_body`
  }

  const cachedMeta = await localStorage.getItemJson(CacheKeys.Meta)
  const cachedBody = await localStorage.getItem<ArrayBuffer>(CacheKeys.Body)

  if (cachedMeta !== null && cachedBody !== null) {
    return new Response(cachedBody, cachedMeta)
  }

  const response = await fetch(input, init)
  if (!(response.status >= 200 && response.status <= 399)) {
    return response
  }

  const cacheEntry: CacheEntry = {
    status: response.status,
    statusText: response.statusText,
    headers: {}
  }

  response.headers.forEach((value, key) => (cacheEntry.headers[key] = value))
  const ab = await response.arrayBuffer()

  await localStorage.setItemJson(CacheKeys.Meta, cacheEntry)
  await localStorage.setItem(CacheKeys.Body, ab)

  return new Response(ab, response)
}
