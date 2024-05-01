export * as crypto from './crypto/index.js'
export * as localStorage from './local-storage/index.js'
export * as strings from './strings/index.js'
export * as web from './web/index.js'
export * from './m3u8/index.js'
export * from './load-script/index.js'
export * from './request/index.js'
export * from './zip/index.js'

import * as crypto from './crypto/index.js'
import * as localStorage from './local-storage/index.js'
import * as strings from './strings/index.js'
import * as web from './web/index.js'
import * as scripts from './load-script/index.js'
import * as request from './request/index.js'
import { M3U8 } from './m3u8/index.js'
import { JSZip } from './zip/index.js'
import FileSaver from 'file-saver'
import * as path from 'path-browserify'

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
// @ts-expect-error
globalThis.alshx['M3U8'] = M3U8
// @ts-expect-error
globalThis.alshx['JSZip'] = JSZip
// @ts-expect-error
globalThis.alshx['FileSaver'] = FileSaver
// @ts-expect-error
globalThis.alshx['path'] = path
