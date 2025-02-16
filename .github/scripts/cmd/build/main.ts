import * as child_process from 'node:child_process'
import * as fs from 'node:fs'
import * as esbuild from 'esbuild'
import { Directories } from '../../platform/directores.ts'

void (async function main() {
  if (fs.existsSync(Directories['~/release'])) {
    fs.rmSync(Directories['~/release'], { recursive: true })
  }

  console.log('Building Web (Types)')
  child_process.execSync(
    'npx tsc --outDir ../../release/browser/types --declaration true --emitDeclarationOnly true',
    {
      cwd: Directories['~/']('lib', 'browser'),
      stdio: 'inherit'
    }
  )

  console.log('Building Web (ESM)')
  await esbuild.build({
    entryPoints: [Directories['~/']('lib', 'browser', 'index.ts')],
    bundle: true,
    outfile: Directories['~/']('release', 'browser', 'esm', 'index.js'),
    loader: { '.css': 'text' },
    format: 'esm'
  })

  for (const dir of fs.readdirSync(Directories['~/lib/']('browser'))) {
    if (dir === 'node_modules') continue
    if (!fs.existsSync(Directories['~/lib/']('browser', dir, 'index.ts'))) continue
    await esbuild.build({
      entryPoints: [Directories['~/']('lib', 'browser', dir, 'index.ts')],
      bundle: true,
      outfile: Directories['~/']('release', 'browser', 'esm', dir + '.js'),
      loader: { '.css': 'text' },
      format: 'esm'
    })
  }

  console.log('Building Web (IIFE)')
  await esbuild.build({
    entryPoints: [Directories['~/']('lib', 'browser', 'index.ts')],
    bundle: true,
    outfile: Directories['~/']('release', 'browser', 'iife', 'index.js'),
    loader: { '.css': 'text' },
    format: 'iife'
  })

  for (const dir of fs.readdirSync(Directories['~/lib/']('browser'))) {
    if (dir === 'node_modules') continue
    if (!fs.existsSync(Directories['~/lib/']('browser', dir, 'index.ts'))) continue
    await esbuild.build({
      entryPoints: [Directories['~/']('lib', 'browser', dir, 'index.ts')],
      bundle: true,
      outfile: Directories['~/']('release', 'browser', 'iife', dir + '.js'),
      loader: { '.css': 'text' },
      format: 'esm'
    })
  }

  console.log('Building Nodejs (Types)')
  child_process.execSync(
    'npx tsc --outDir ../../release/nodejs/types --declaration true --emitDeclarationOnly true',
    {
      cwd: Directories['~/']('lib', 'nodejs'),
      stdio: 'inherit'
    }
  )

  console.log('Building Nodejs (ESM)')
  child_process.execSync('npx tsc --outDir ../../release/nodejs/esm', {
    cwd: Directories['~/']('lib', 'nodejs'),
    stdio: 'inherit'
  })

  fs.writeFileSync(
    Directories['~/release/']('nodejs', 'esm', 'package.json'),
    JSON.stringify({ type: 'module' }, null, 2),
    'utf8'
  )

  console.log('Building Nodejs (Commonjs)')
  child_process.execSync(
    'npx tsc --outDir ../../release/nodejs/commonjs --module Commonjs --moduleResolution Node10',
    {
      cwd: Directories['~/']('lib', 'nodejs'),
      stdio: 'inherit'
    }
  )

  fs.writeFileSync(
    Directories['~/release/']('nodejs', 'commonjs', 'package.json'),
    JSON.stringify({ type: 'commonjs' }, null, 2),
    'utf8'
  )

  console.log('Package.json')

  const copy = [['package.json'], ['README.md'], ['LICENSE']]

  for (const target of copy) {
    fs.cpSync(
      Directories['~/'](...target),
      Directories['~/release/'](...target)
    )
  }

  const packageJson = JSON.parse(
    fs.readFileSync(Directories['~/release/']('package.json'), 'utf8')
  )
  delete packageJson.workspaces
  delete packageJson.scripts
  delete packageJson.type
  delete packageJson.private

  packageJson.exports = {
    '.': {
      types: './nodejs/types/index.d.ts',
      import: './nodejs/esm/index.js',
      require: './nodejs/commonjs/index.js'
    },
    './*': {
      types: './nodejs/types/*/index.d.ts',
      import: './nodejs/esm/*/index.js',
      require: './nodejs/commonjs/*/index.js'
    },
    './nodejs': {
      types: './nodejs/types/index.d.ts',
      import: './nodejs/esm/index.js',
      require: './nodejs/commonjs/index.js'
    },
    './nodejs/*': {
      types: './nodejs/types/*/index.d.ts',
      import: './nodejs/esm/*/index.js',
      require: './nodejs/commonjs/*/index.js'
    },
    './browser': {
      types: './browser/types/index.d.ts',
      import: './browser/esm/index.js',
      require: './browser/commonjs/index.js'
    },
    './browser/*': {
      types: './browser/types/*/index.d.ts',
      import: './browser/esm/*/index.js'
    }
  }

  fs.writeFileSync(
    Directories['~/release/']('package.json'),
    JSON.stringify(packageJson, null, 2),
    'utf8'
  )
})()
