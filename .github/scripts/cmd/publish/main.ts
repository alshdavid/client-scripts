import * as child_process from 'node:child_process'
import * as fs from 'node:fs'
import * as semver from 'semver'
import { Directories } from '../../platform/directores.ts'

type PackageInfo = {
  version: string
}

void (async function main() {
  const currentPackageVersion: string = child_process
    .execSync('npm info @alshdavid/kit version')
    .toString()
  
  let newVersion = semver.parse(currentPackageVersion)
  if (!newVersion) {
    newVersion = semver.parse('0.0.1')!
  } else {
    newVersion.inc("patch", '1')
  }

  const localPackageInfo: PackageInfo = JSON.parse(
    fs.readFileSync(Directories['~/']('release', 'package.json'), { encoding: 'utf-8' })
  )

  localPackageInfo.version = newVersion.toString()
  fs.writeFileSync(Directories['~/']('release', 'package.json'), JSON.stringify(localPackageInfo, null, 2), { encoding: 'utf-8' })

  console.log('Publishing:', newVersion.toString())
  if (process.env.AD_DRY === 'true') {
    return
  }

  child_process.execSync('pnpm publish --access public --no-git-checks', {
    stdio: 'inherit',
    cwd: Directories['~/']('release')
  })
})()
