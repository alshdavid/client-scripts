export * as crypto from './crypto/index.js'
export * as localStorage from './local-storage/index.js'
export * as strings from './strings/index.js'
export * as web from './web/index.js'
export * from './load-script/index.js'
export * from './request/index.js'

import * as crypto from './crypto/index.js'
import * as localStorage from './local-storage/index.js'
import * as strings from './strings/index.js'
import * as web from './web/index.js'
import * as scripts from './load-script/index.js'
import * as request from './request/index.js'

// @ts-expect-error
globalThis.alshx = globalThis.alshx || {}
// @ts-expect-error
globalThis.alshx['crypto'] = crypto
// @ts-expect-error
globalThis.alshx['localStorage'] = localStorage
// @ts-expect-error
globalThis.alshx['strings'] = strings
// @ts-expect-error
globalThis.alshx['web'] = web
// @ts-expect-error
globalThis.alshx['scripts'] = scripts
// @ts-expect-error
globalThis.alshx['request'] = request
