import { request as innerRequset } from './node/request.js'
import { RequestOptions } from './interface/request-options.js'

export async function request(
  input: string | URL | globalThis.Request,
  init: RequestOptions = {}
): Promise<Response> {
  if (!input) {
    throw new Error('No input provided')
  }

  return innerRequset(input, init)
}
