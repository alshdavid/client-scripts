import * as path from 'node:path'

const rootPath = path.resolve(__dirname, '../../../')

const s =
  (...rs: string[]) =>
  (...ns: string[]) =>
    path.join(rootPath, ...rs, ...ns)
const j = (...s: string[]) => path.join(rootPath, ...s)

export const Directories = Object.freeze({
  ['~']: j(),
  ['~/']: s(),

  ['~/release']: j('release'),
  ['~/release/']: s('release'),

  ['~/release/cjs']: s('release', 'cjs'),
  ['~/release/esm']: s('release', 'esm'),

  ['~/release/umd']: j('release/umd'),
  ['~/release/umd/index.js']: j('release/umd/index.js'),

  ['~/lib']: j('lib'),
  ['~/lib/index.ts']: j('lib/index.ts'),
  ['~/lib/']: s('lib'),

  ['~/platform']: j('platform'),
  ['~/platform/']: s('platform')
})
