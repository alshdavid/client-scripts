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

  ['~/release/umd/index.js']: j('release/umd/index.js'),

  ['~/lib']: j('lib'),
  ['~/lib/']: s('lib'),

  ['~/platform']: j('platform'),
  ['~/platform/']: s('platform')
})
