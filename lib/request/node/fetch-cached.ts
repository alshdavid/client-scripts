import * as localStorage from '../../local-storage/index.js'

export const DATABASE_KEY = 'request'

type CachedMeta = {
  status: number
  statusText: string
  headers: Record<string, string>
}

export async function fetchCached(
  input: string,
  init: RequestInit
): Promise<Response> {
  if (init.method && init.method !== 'GET') {
    return fetch(input, init)
  }

  const CacheKeys = {
    Meta: `fetch/${input}/meta`,
    Body: `fetch/${input}/body`
  }

  const db = localStorage.init(DATABASE_KEY)

  const cachedMeta = await db.getItemJson<CachedMeta>(CacheKeys.Meta)
  const cachedBody = await db.getItem(CacheKeys.Body)

  if (cachedMeta !== null && cachedBody !== null) {
    let buff = Buffer.from(cachedBody, 'base64')
    return new Response(buff, cachedMeta)
  }

  const response = await fetch(input, init)
  if (!(response.status >= 200 && response.status <= 399)) {
    return response
  }

  const cacheEntry: CachedMeta = {
    status: response.status,
    statusText: response.statusText,
    headers: {}
  }

  response.headers.forEach((value, key) => (cacheEntry.headers[key] = value))

  const body = await response.arrayBuffer()

  const buf = Buffer.from(body)
  await db.setItemJson(CacheKeys.Meta, cacheEntry)
  await db.setItem(CacheKeys.Body, buf.toString('base64'))

  return new Response(body, response)
}
