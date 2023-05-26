import { isNode } from '../environment/index.js'
import { RequestOptions } from './interface/request-options.js'
import * as browser from './browser/request.js'

export async function request(
  input: RequestInfo,
  init: RequestOptions = {}
): Promise<Response> {
  if (!input) {
    throw new Error('No input provided')
  }
  if (isNode()) {
    const { request } = require('./node/request')
    return request(input, init)
  }
  return browser.request(input, init)
}
