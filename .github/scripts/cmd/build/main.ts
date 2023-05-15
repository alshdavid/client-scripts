import * as child_process from 'node:child_process'
import * as path from 'node:path'
import * as fs from 'node:fs'
import * as webpack from 'webpack'

function rootPath(filepath: string = '') {
  return path.join(__dirname, '../../../../', filepath)
}

void (async function main() {
  if (fs.existsSync(rootPath('release'))) {
    fs.rmSync(rootPath('release'), { recursive: true })
  }

  console.log('Building Types')
  child_process.execSync(
    'npx tsc --outDir release/types --declaration true --emitDeclarationOnly true',
    {
      cwd: rootPath(),
      stdio: 'inherit'
    }
  )

  console.log('Building ESM')
  child_process.execSync('npx tsc --outDir release/esm', {
    cwd: rootPath(),
    stdio: 'inherit'
  })

  console.log('Building CommonJS')
  child_process.execSync('npx tsc --outDir release/cjs --module CommonJS', {
    cwd: rootPath(),
    stdio: 'inherit'
  })

  console.log('Building UMD')
  fs.mkdirSync(rootPath(`release/umd`), { recursive: true })

  const compiler = webpack({
    mode: 'production',
    devtool: false,
    entry: rootPath(`lib/index.ts`),
    output: {
      filename: 'index.js',
      path: rootPath(`release/umd`),
      publicPath: '/scripts',
      library: {
        type: 'umd',
        name: ['acs']
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

  const stat = await new Promise<webpack.Stats>((resolve, reject) =>
    compiler.run((err, stats) =>
      err ? reject(err) : stats ? resolve(stats) : reject()
    )
  )

  console.log(stat.toString())
})()
