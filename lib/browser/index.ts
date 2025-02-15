import * as exports from './index.barrel.js'
export * from './index.barrel.js'

const globalRef = globalThis as any

globalRef.alshx = globalRef.alshx || {}

for (const [key, value] of Object.entries(exports)) {
  globalRef.alshx[key] = value
}

import './custom-elements/test/test.js'
