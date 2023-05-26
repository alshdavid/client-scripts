import * as child_process from 'node:child_process'
import * as fs from 'node:fs'
import * as webpack from 'webpack'
import { Directories } from '../../platform/directores'

void (async function main() {
  if (fs.existsSync(Directories['~/release'])) {
    fs.rmSync(Directories['~/release'], { recursive: true })
  }

  console.log('Building Types')
  child_process.execSync(
    'npx tsc --outDir release/types --declaration true --emitDeclarationOnly true',
    {
      cwd: Directories['~'],
      stdio: 'inherit'
    }
  )

  console.log('Building ESM')
  child_process.execSync('npx tsc --outDir release/esm', {
    cwd: Directories['~'],
    stdio: 'inherit'
  })
  fs.writeFileSync(Directories['~/release/esm']('package.json'), JSON.stringify({ type: 'module' }, null, 2), 'utf8')

  console.log('Building CommonJS')
  child_process.execSync('npx tsc --outDir release/cjs --module CommonJS', {
    cwd: Directories['~'],
    stdio: 'inherit'
  })
  fs.writeFileSync(Directories['~/release/cjs']('package.json'), JSON.stringify({ type: 'commonjs' }, null, 2), 'utf8')

  console.log('Building UMD')
  fs.mkdirSync(Directories['~/release/umd'], { recursive: true })

  const compiler = webpack({
    mode: 'production',
    devtool: false,
    entry: Directories['~/lib/index.ts'],
    output: {
      filename: 'index.js',
      path: Directories['~/release/umd'],
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
      extensionAlias: {
        '.js': ['.ts', '.js'],
        '.mjs': ['.mts', '.mjs'],
      },
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
