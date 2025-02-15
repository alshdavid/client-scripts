import { RequestOptions } from '../interface/request-options.js'
import { fetchCached } from './fetch-cached.js'

export async function request(
  input: RequestInfo,
  init: RequestOptions = {}
): Promise<Response> {
  let fetchFunc: typeof globalThis.fetch | typeof fetchCached

  if (init.storeInCache === undefined || init.storeInCache === true) {
    fetchFunc = fetchCached
  } else {
    fetchFunc = globalThis.fetch
  }

  for (let i = 0; i < (init.retries || 500); i++) {
    const response = await fetchFunc(input, init)

    if (response.status >= 200 && response.status <= 399) {
      return response
    }

    await new Promise((res) => setTimeout(res, 5000))
  }

  throw new Error(`Too many retries: ${input}`)
}
