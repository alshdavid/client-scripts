import { isNode } from './is-node.js'

export function isBrowser() {
  return !isNode()
}
