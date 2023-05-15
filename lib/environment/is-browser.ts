import { isNode } from './is-node'

export function isBrowser() {
  return !isNode()
}
