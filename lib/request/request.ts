import { isNode } from '../../platform/environment'
import { RequestOptions } from './interface/request-options'
import * as browser from './browser/request'

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
