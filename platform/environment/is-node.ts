export function isNode() {
  return typeof process !== 'undefined' && process.release.name === 'node'
}
