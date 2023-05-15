import * as child_process from 'node:child_process'
import * as path from 'node:path'
import * as fs from 'node:fs'
import * as url from 'node:url'
import * as rspack from '@rspack/core'

/** @type {(v?: string) => string} */
function rootPath(filepath = '') {
  return path.join(__dirname, '../../../', filepath)
}

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

void (async function main() {
  if (fs.existsSync(rootPath('release'))) {
    fs.rmSync(rootPath('release'), { recursive: true })
  }

  child_process.execSync(
    'npx tsc --outDir release/types --declaration true --emitDeclarationOnly true',
    {
      cwd: rootPath(),
      stdio: 'inherit'
    }
  )

  child_process.execSync('npx tsc --outDir release/esm', {
    cwd: rootPath(),
    stdio: 'inherit'
  })

  child_process.execSync('npx tsc --outDir release/cjs --module CommonJS', {
    cwd: rootPath(),
    stdio: 'inherit'
  })

  fs.mkdirSync(rootPath(`release/umd`))

  for (const foldername of fs.readdirSync(rootPath('lib'))) {
    const compiler = rspack.rspack({
      mode: 'production',
      devtool: false,
      entry: rootPath(`lib/${foldername}/index.ts`),
      output: {
        filename: 'index.js',
        path: rootPath(`release/umd/${foldername}`),
        library: {
          type: 'umd',
          name: 'alshdavid_client_scripts'
        }
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'swc-loader'
          }
        ]
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js', '.mjs'],
        alias: {}
      }
    })

    const stat =
      await new Promise((resolve, reject) =>
        compiler.run((err, stats) =>
          err ? reject(err) : stats ? resolve(stats) : reject()
        ))

    console.log(stat.toString())
  }
})()
