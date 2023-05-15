import * as child_process from 'node:child_process'
import * as path from 'node:path'
import * as fs from 'node:fs'
import * as url from 'node:url'
// import * as rspack from '@rspack/core'
import webpack from 'webpack'

/** @type {(v?: string) => string} */
function rootPath(filepath = '') {
  return path.join(__dirname, '../../../', filepath)
}

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

void (async function main() {
  if (fs.existsSync(rootPath('release'))) {
    fs.rmSync(rootPath('release'), { recursive: true })
  }

  // child_process.execSync(
  //   'npx tsc --outDir release/types --declaration true --emitDeclarationOnly true',
  //   {
  //     cwd: rootPath(),
  //     stdio: 'inherit'
  //   }
  // )

  // child_process.execSync('npx tsc --outDir release/esm', {
  //   cwd: rootPath(),
  //   stdio: 'inherit'
  // })

  child_process.execSync('npx tsc --outDir release/cjs --module CommonJS', {
    cwd: rootPath(),
    stdio: 'inherit'
  })

  fs.mkdirSync(rootPath(`release/umd`), { recursive: true })

  const snakeToCamel = (/** @type {string}*/ str) =>
    str
      .toLowerCase()
      .replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace('-', '').replace('_', '')
      )

  for (const foldernameRaw of fs.readdirSync(rootPath('lib'))) {
    const foldername = snakeToCamel(foldernameRaw)

    // const compiler = rspack.rspack({
    const compiler = webpack({
      mode: 'production',
      devtool: false,
      entry: {
        [foldername]: rootPath(`lib/${foldernameRaw}/index.ts`)
      },
      output: {
        filename: 'index.js',
        path: rootPath(`release/umd/${foldernameRaw}`),
        publicPath: '',
        library: {
          type: 'umd',
          name: ['acs', foldername]
        }
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'swc-loader'
          },
          {
            test: /\.jsx?$/,
            use: 'swc-loader'
          }
        ]
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js', '.mjs'],
        alias: {}
      },
      externals: [/^node:.*/i]
    })

    const stat = await new Promise((resolve, reject) =>
      compiler.run((err, stats) =>
        err ? reject(err) : stats ? resolve(stats) : reject()
      )
    )

    console.log(stat.toString())
  }
})()
